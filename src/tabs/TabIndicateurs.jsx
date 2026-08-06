// === Onglet « kpi_dashboard » — Indicateurs ===
// Réunit en UN SEUL écran les deux anciens écrans qui se ressemblaient dans le menu :
//   • « KPI / Tableau de Bord »  → onglet « Vue d'ensemble »
//   • « Statistiques »            → onglet « Détail du service »
// Rien n'a été supprimé : les deux contenus sont conservés, ils ne sont plus
// que deux onglets au lieu de deux entrées de menu.

import React, { useState } from 'react';
import TabKpiDashboard from './TabKpiDashboard.jsx';
import TabSvcKpi from './TabSvcKpi.jsx';

const VUES = [
  { id: 'ensemble', label: "Vue d'ensemble", icon: '📊' },
  { id: 'detail',   label: 'Détail du service', icon: '📈' },
];

export default function TabIndicateurs(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, crmRd } = __props;
  const [vue, setVue] = useState('ensemble');

  return (
    <div>
      {/* Sélecteur de vue */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {VUES.map(v => {
          const actif = vue === v.id;
          return (
            <button key={v.id} type="button" onClick={() => setVue(v.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
                background: actif ? $accent : $bgCard,
                color: actif ? '#fff' : $textMut,
                border: `1px solid ${actif ? $accent : $border}`,
                borderRadius: crmRd, padding: '8px 15px',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'inherit',
                transition: 'all .12s',
              }}>
              <span>{v.icon}</span>{v.label}
            </button>
          );
        })}
      </div>

      {vue === 'ensemble' ? <TabKpiDashboard {...__props} /> : <TabSvcKpi {...__props} />}
    </div>
  );
}
