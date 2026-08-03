// === Palette de commandes (⌘K / Ctrl+K) ===
// Recherche instantanée dans toute l'application : entités, services, modules.
// Évite de naviguer à travers trois niveaux pour atteindre un écran.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MODULES } from '../data/modules.js';

// Retire les accents pour que « échéances » se trouve en tapant « echeances »
const sansAccent = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function PaletteCommandes({
  ouverte, onFermer, servicesConfig,
  setOngletActif, setNavEntreprise, setNavService,
  $bg = '#fff', $bgCard = '#fff', $bgSub = '#f7f7f7', $border = '#e5e5e5',
  $text = '#222', $textMut = '#888', $textSec = '#555', $accent = '#a67c00',
  crmRd = 12, $shadowLg = '0 20px 60px rgba(0,0,0,0.25)',
}) {
  const [requete, setRequete] = useState('');
  const [indexActif, setIndexActif] = useState(0);
  const champRef = useRef(null);
  const listeRef = useRef(null);

  // Construction de l'index de recherche : chaque module, dans chaque entité où il existe
  const entrees = useMemo(() => {
    if (!servicesConfig) return [];
    const out = [];
    const vus = new Set();
    Object.entries(servicesConfig).forEach(([idEntreprise, entreprise]) => {
      (entreprise.services || []).forEach(service => {
        (service.modules || []).forEach(idModule => {
          const cle = `${idEntreprise}|${service.id}|${idModule}`;
          if (vus.has(cle)) return;
          vus.add(cle);
          const meta = MODULES[idModule] || { icon: '•', label: idModule, desc: '' };
          out.push({
            cle,
            idModule,
            idEntreprise,
            idService: service.id,
            icone: meta.icon,
            titre: meta.label,
            description: meta.desc,
            couleur: meta.color,
            chemin: `${entreprise.nom} › ${service.label}`,
            recherche: sansAccent([meta.label, meta.desc, entreprise.nom, service.label, idModule].join(' ')),
          });
        });
      });
    });
    return out;
  }, [servicesConfig]);

  // Filtrage + classement : les correspondances en début de titre remontent
  const resultats = useMemo(() => {
    const q = sansAccent(requete.trim());
    if (!q) {
      // Sans recherche : quelques accès directs utiles
      const favoris = ['dashboard', 'centre_echeances', 'documents', 'crm_commercial', 'veille_ao', 'collaborateurs', 'parc_automobile', 'contrats'];
      return favoris
        .map(id => entrees.find(e => e.idModule === id))
        .filter(Boolean)
        .slice(0, 8);
    }
    const mots = q.split(/\s+/).filter(Boolean);
    return entrees
      .filter(e => mots.every(m => e.recherche.includes(m)))
      .map(e => {
        const titre = sansAccent(e.titre);
        let score = 0;
        if (titre.startsWith(q)) score = 3;
        else if (titre.includes(q)) score = 2;
        else if (e.recherche.includes(q)) score = 1;
        return { ...e, score };
      })
      .sort((a, b) => b.score - a.score || a.titre.localeCompare(b.titre))
      .slice(0, 40);
  }, [requete, entrees]);

  // Ouverture : focus et remise à zéro
  useEffect(() => {
    if (ouverte) {
      setRequete(''); setIndexActif(0);
      const t = setTimeout(() => champRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [ouverte]);

  useEffect(() => { setIndexActif(0); }, [requete]);

  // Garde la ligne sélectionnée visible
  useEffect(() => {
    const el = listeRef.current?.querySelector('[data-actif="1"]');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [indexActif, resultats.length]);

  const aller = (entree) => {
    if (!entree) return;
    setNavEntreprise?.(entree.idEntreprise);
    setNavService?.(entree.idService);
    setOngletActif?.(entree.idModule);
    onFermer?.();
  };

  const auClavier = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndexActif(i => Math.min(i + 1, resultats.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndexActif(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); aller(resultats[indexActif]); }
    else if (e.key === 'Escape') { e.preventDefault(); onFermer?.(); }
  };

  if (!ouverte) return null;

  return (
    <div
      onClick={onFermer}
      onKeyDown={auClavier}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '12vh', paddingLeft: 16, paddingRight: 16,
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 620, background: $bgCard,
          border: `1px solid ${$border}`, borderRadius: 16, boxShadow: $shadowLg,
          overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '70vh',
        }}>

        {/* Champ de recherche */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: `1px solid ${$border}` }}>
          <span style={{ fontSize: '1.05rem', opacity: 0.65 }}>🔍</span>
          <input
            ref={champRef}
            value={requete}
            onChange={e => setRequete(e.target.value)}
            onKeyDown={auClavier}
            placeholder="Rechercher un écran… (échéances, véhicules, contrats, documents)"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              color: $text, fontSize: '1rem', fontFamily: 'inherit',
            }} />
          <kbd style={{
            fontSize: '0.68rem', color: $textMut, border: `1px solid ${$border}`,
            borderRadius: 6, padding: '2px 7px', background: $bgSub, fontFamily: 'inherit',
          }}>esc</kbd>
        </div>

        {/* Résultats */}
        <div ref={listeRef} style={{ overflowY: 'auto', padding: 8 }}>
          {!requete.trim() && (
            <div style={{ fontSize: '0.68rem', color: $textMut, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 10px 8px' }}>
              Accès rapides
            </div>
          )}
          {resultats.length === 0 ? (
            <div style={{ padding: '28px 16px', textAlign: 'center', color: $textMut, fontSize: '0.88rem' }}>
              Aucun écran ne correspond à « {requete} ».
            </div>
          ) : resultats.map((r, i) => {
            const actif = i === indexActif;
            return (
              <button
                type="button"
                key={r.cle}
                data-actif={actif ? '1' : '0'}
                role="option"
                aria-selected={actif}
                onMouseEnter={() => setIndexActif(i)}
                onClick={() => aller(r)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  padding: '10px 12px', borderRadius: crmRd, width: '100%',
                  textAlign: 'left', border: 'none', borderLeft: `3px solid ${actif ? (r.couleur || $accent) : 'transparent'}`,
                  background: actif ? $bgSub : 'transparent', fontFamily: 'inherit',
                }}>
                <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{r.icone}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: $text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.titre}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: $textMut, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.chemin}
                  </div>
                </div>
                {actif && (
                  <kbd style={{
                    fontSize: '0.65rem', color: $textSec, border: `1px solid ${$border}`,
                    borderRadius: 6, padding: '2px 7px', background: $bg, flexShrink: 0, fontFamily: 'inherit',
                  }}>entrée ↵</kbd>
                )}
              </button>
            );
          })}
        </div>

        {/* Pied */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '9px 16px',
          borderTop: `1px solid ${$border}`, background: $bgSub,
          fontSize: '0.7rem', color: $textMut,
        }}>
          <span>↑ ↓ pour naviguer</span>
          <span>↵ pour ouvrir</span>
          <span style={{ marginLeft: 'auto' }}>{resultats.length} écran{resultats.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
