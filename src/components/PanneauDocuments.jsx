// === Panneau Documents — composant réutilisable ===
// À brancher sur n'importe quel enregistrement (chantier, contrat, salarié, AO…) :
//   <PanneauDocuments entite="ezel" module="chantiers" enregistrementId="CH001" {...theme} />
// Il gère l'envoi, la liste, l'ouverture et la suppression des fichiers.
// Il ne sait pas où les fichiers sont stockés — c'est le rôle de src/lib/storage.js.

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  envoyerDocument, listerDocuments, ouvrirDocument, supprimerDocument,
  stockageDisponible, formaterTaille, nomLisible, TAILLE_MAX,
} from '../lib/storage.js';

const ICONES = [
  [/\.pdf$/i, '📕'], [/\.(docx?|odt)$/i, '📘'], [/\.(xlsx?|csv|ods)$/i, '📗'],
  [/\.(pptx?|odp)$/i, '📙'], [/\.(png|jpe?g|gif|webp|heic|svg)$/i, '🖼️'],
  [/\.(zip|rar|7z|tar|gz)$/i, '🗜️'], [/\.(dwg|dxf|ifc|rvt)$/i, '📐'],
  [/\.(mp4|mov|avi|mkv)$/i, '🎬'],
];
const iconePour = nom => (ICONES.find(([re]) => re.test(nom)) || [null, '📄'])[1];

export default function PanneauDocuments({
  entite = 'group', module = 'divers', enregistrementId = 'general',
  titre = 'Documents', compact = false,
  $bgCard = '#fff', $bgSub = '#f7f7f7', $border = '#e5e5e5', $text = '#222',
  $textMut = '#888', $textSec = '#555', $accent = '#a67c00', $danger = '#dc2626',
  crmRd = 12,
}) {
  const [fichiers, setFichiers] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState('');
  const [survol, setSurvol] = useState(false);
  const [aSupprimer, setASupprimer] = useState(null);
  const champFichier = useRef(null);

  const actif = stockageDisponible();

  const recharger = useCallback(async () => {
    if (!actif) { setChargement(false); return; }
    setChargement(true);
    const { fichiers: liste, error } = await listerDocuments({ entite, module, enregistrementId });
    if (error) setMessage('Erreur de lecture : ' + error);
    setFichiers(liste || []);
    setChargement(false);
  }, [actif, entite, module, enregistrementId]);

  useEffect(() => { recharger(); }, [recharger]);

  const envoyer = async (listeFichiers) => {
    const choisis = Array.from(listeFichiers || []);
    if (choisis.length === 0) return;
    setEnCours(true); setMessage('');
    let envoyes = 0; const erreurs = [];
    for (const fichier of choisis) {
      const { error } = await envoyerDocument({ entite, module, enregistrementId, fichier });
      if (error) erreurs.push(`${fichier.name} : ${error}`); else envoyes++;
    }
    setEnCours(false);
    setMessage(erreurs.length
      ? erreurs.join(' · ')
      : `${envoyes} document${envoyes > 1 ? 's' : ''} ajouté${envoyes > 1 ? 's' : ''}`);
    recharger();
  };

  const ouvrir = async (chemin) => {
    const { url, error } = await ouvrirDocument(chemin);
    if (error || !url) { setMessage('Impossible d\'ouvrir : ' + (error || 'lien indisponible')); return; }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const supprimer = async (chemin) => {
    setASupprimer(null); setEnCours(true);
    const { error } = await supprimerDocument(chemin);
    setEnCours(false);
    setMessage(error ? 'Suppression impossible : ' + error : 'Document supprimé');
    recharger();
  };

  const styleCadre = {
    background: $bgCard, border: `1px solid ${$border}`, borderRadius: crmRd,
    padding: compact ? '14px 16px' : '18px 20px',
  };

  if (!actif) {
    return (
      <div style={styleCadre}>
        <div style={{ fontWeight: 700, color: $text, marginBottom: 6 }}>📎 {titre}</div>
        <div style={{ fontSize: '0.82rem', color: $textMut }}>
          Stockage non configuré : les documents seront disponibles une fois la connexion active.
        </div>
      </div>
    );
  }

  return (
    <div style={styleCadre}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ fontWeight: 700, color: $text, fontSize: compact ? '0.92rem' : '1rem' }}>📎 {titre}</div>
        <span style={{
          fontSize: '0.7rem', color: $textMut, background: $bgSub,
          border: `1px solid ${$border}`, borderRadius: 20, padding: '1px 8px',
        }}>{fichiers.length}</span>
        <button
          onClick={() => champFichier.current?.click()}
          disabled={enCours}
          style={{
            marginLeft: 'auto', background: $accent, color: '#fff', border: 'none',
            borderRadius: crmRd, padding: '7px 14px', fontSize: '0.82rem', fontWeight: 600,
            cursor: enCours ? 'wait' : 'pointer', opacity: enCours ? 0.6 : 1, fontFamily: 'inherit',
          }}>{enCours ? 'Envoi…' : '+ Ajouter'}</button>
        <input ref={champFichier} type="file" multiple style={{ display: 'none' }}
          onChange={e => { envoyer(e.target.files); e.target.value = ''; }} />
      </div>

      {/* Zone de dépôt */}
      <div
        onDragOver={e => { e.preventDefault(); setSurvol(true); }}
        onDragLeave={() => setSurvol(false)}
        onDrop={e => { e.preventDefault(); setSurvol(false); envoyer(e.dataTransfer.files); }}
        onClick={() => champFichier.current?.click()}
        style={{
          border: `1.5px dashed ${survol ? $accent : $border}`, borderRadius: crmRd,
          background: survol ? $bgSub : 'transparent', padding: compact ? '14px' : '20px',
          textAlign: 'center', cursor: 'pointer', marginBottom: fichiers.length ? 12 : 0,
          transition: 'all .15s',
        }}>
        <div style={{ fontSize: '0.85rem', color: survol ? $accent : $textSec, fontWeight: 600 }}>
          Glissez vos fichiers ici
        </div>
        <div style={{ fontSize: '0.72rem', color: $textMut, marginTop: 3 }}>
          ou cliquez pour parcourir — {formaterTaille(TAILLE_MAX)} maximum par fichier
        </div>
      </div>

      {message && (
        <div style={{
          fontSize: '0.78rem', color: message.toLowerCase().includes('erreur') || message.toLowerCase().includes('impossible') ? $danger : $textSec,
          marginBottom: 10,
        }}>{message}</div>
      )}

      {chargement ? (
        <div style={{ fontSize: '0.8rem', color: $textMut, padding: '8px 0' }}>Chargement…</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {fichiers.map(f => (
            <div key={f.chemin} style={{
              display: 'flex', alignItems: 'center', gap: 10, background: $bgSub,
              border: `1px solid ${$border}`, borderRadius: crmRd, padding: '9px 12px',
            }}>
              <span style={{ fontSize: '1.05rem' }}>{iconePour(f.nom)}</span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div onClick={() => ouvrir(f.chemin)} title="Ouvrir le document"
                  style={{
                    fontSize: '0.85rem', fontWeight: 600, color: $text, cursor: 'pointer',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{nomLisible(f.nom)}</div>
                <div style={{ fontSize: '0.7rem', color: $textMut }}>
                  {formaterTaille(f.taille)}{f.creeLe ? ' · ' + new Date(f.creeLe).toLocaleDateString('fr-FR') : ''}
                </div>
              </div>
              <button onClick={() => ouvrir(f.chemin)} title="Ouvrir"
                style={{
                  background: 'transparent', border: `1px solid ${$border}`, borderRadius: 8,
                  padding: '4px 10px', fontSize: '0.75rem', color: $textSec, cursor: 'pointer', fontFamily: 'inherit',
                }}>Ouvrir</button>
              {aSupprimer === f.chemin ? (
                <>
                  <button onClick={() => supprimer(f.chemin)}
                    style={{ background: $danger, color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>Confirmer</button>
                  <button onClick={() => setASupprimer(null)}
                    style={{ background: 'transparent', border: `1px solid ${$border}`, borderRadius: 8, padding: '4px 8px', fontSize: '0.75rem', color: $textMut, cursor: 'pointer', fontFamily: 'inherit' }}>Annuler</button>
                </>
              ) : (
                <button onClick={() => setASupprimer(f.chemin)} title="Supprimer"
                  style={{ background: 'transparent', border: 'none', color: $textMut, cursor: 'pointer', fontSize: '0.9rem', padding: '2px 4px' }}>✕</button>
              )}
            </div>
          ))}
          {fichiers.length === 0 && (
            <div style={{ fontSize: '0.8rem', color: $textMut, textAlign: 'center', padding: '6px 0' }}>
              Aucun document pour le moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
