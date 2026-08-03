// === Onglet « documents » — coffre-fort documentaire ===
import React, { useState } from 'react';
import PanneauDocuments from '../components/PanneauDocuments.jsx';

const DOSSIERS = [
  { id: 'chantiers',   label: 'Chantiers',       icon: '🏗️', desc: 'Plans, photos, PV de réception, comptes rendus' },
  { id: 'appels_offres', label: "Appels d'offres", icon: '📌', desc: 'DCE, mémoires techniques, DPGF, dépôts' },
  { id: 'contrats',    label: 'Contrats',        icon: '📄', desc: 'Marchés, sous-traitance, baux, avenants' },
  { id: 'assurances',  label: 'Assurances',      icon: '🛡️', desc: 'Polices, attestations, sinistres' },
  { id: 'rh',          label: 'Ressources humaines', icon: '👥', desc: 'Contrats de travail, habilitations, formations' },
  { id: 'vehicules',   label: 'Parc & matériel', icon: '🚗', desc: 'Cartes grises, contrôles techniques, leasings' },
  { id: 'comptabilite',label: 'Comptabilité',    icon: '💰', desc: 'Factures, relevés, liasses fiscales' },
  { id: 'juridique',   label: 'Juridique & société', icon: '⚖️', desc: 'Statuts, Kbis, PV d\'assemblée' },
  { id: 'divers',      label: 'Divers',          icon: '📁', desc: 'Tout le reste' },
];

export default function TabDocuments(__props) {
  const {
    $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec,
    $danger, crmRd, navEntreprise,
  } = __props;

  const [dossier, setDossier] = useState('chantiers');
  const entite = navEntreprise || 'group';
  const actif = DOSSIERS.find(d => d.id === dossier) || DOSSIERS[0];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: $text }}>
          📁 Documents
        </h1>
        <div style={{ fontSize: '0.82rem', color: $textMut, margin: '4px 0 0' }}>
          Coffre-fort documentaire du groupe — accessible uniquement aux personnes connectées.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: 20, alignItems: 'start' }}>
        {/* Dossiers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {DOSSIERS.map(d => {
            const selectionne = d.id === dossier;
            return (
              <button key={d.id} onClick={() => setDossier(d.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                  background: selectionne ? $accent : $bgCard,
                  color: selectionne ? '#fff' : $text,
                  border: `1px solid ${selectionne ? $accent : $border}`,
                  borderRadius: crmRd, padding: '11px 14px', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600,
                  boxShadow: selectionne ? $shadowLg : 'none', transition: 'all .12s',
                }}>
                <span style={{ fontSize: '1.05rem' }}>{d.icon}</span>
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Contenu du dossier */}
        <div>
          <div style={{
            background: $bgSub, border: `1px solid ${$border}`, borderRadius: crmRd,
            padding: '12px 16px', marginBottom: 14,
          }}>
            <div style={{ fontWeight: 700, color: $text, fontSize: '0.95rem' }}>{actif.icon} {actif.label}</div>
            <div style={{ fontSize: '0.78rem', color: $textMut, marginTop: 2 }}>{actif.desc}</div>
          </div>

          <PanneauDocuments
            entite={entite}
            module={actif.id}
            enregistrementId="general"
            titre={`Fichiers — ${actif.label}`}
            {...{ $bgCard, $bgSub, $border, $text, $textMut, $textSec, $accent, $danger, crmRd }}
          />

          <div style={{ fontSize: '0.75rem', color: $textMut, marginTop: 14, paddingLeft: 12, borderLeft: `2px solid ${$border}` }}>
            Les documents sont rangés par entité puis par dossier. Ici : <strong>{entite}</strong> › {actif.label}.
            Chaque fichier s'ouvre par un lien temporaire — jamais d'adresse publique permanente.
          </div>
        </div>
      </div>
    </div>
  );
}
