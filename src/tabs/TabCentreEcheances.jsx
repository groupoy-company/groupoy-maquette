// === Onglet « centre_echeances » — Centre d'échéances (agrégation multi-sources) ===
import React, { useState, useMemo } from 'react';
import { buildEcheances, echeanceStatut } from '../data/echeances.js';

const SOURCES = [
  { id: 'assurance',        label: 'Assurances',    icon: '🛡️', color: '#6366f1' },
  { id: 'contrat',          label: 'Contrats',      icon: '📄', color: '#3b82f6' },
  { id: 'vehicule_ct',      label: 'Contrôles tech.', icon: '🔧', color: '#0891b2' },
  { id: 'vehicule_leasing', label: 'Leasings',      icon: '🚗', color: '#0d9488' },
  { id: 'conformite',       label: 'Conformité',    icon: '⚖️', color: '#8b5cf6' },
  { id: 'appel_offre',      label: "Appels d'offres", icon: '📌', color: '#d4a030' },
];

export default function TabCentreEcheances(__props) {
  const {
    $accent, $bgCard, $bgSub, $border, $borderLight, $shadow, $shadowLg,
    $text, $textMut, $textSec, $danger, $warn, $success, $info, crmRd,
    filNom, filterByFiliale, assData, ctrData, autoData, veilleAO,
  } = __props;

  const [srcFilter, setSrcFilter] = useState('tous');
  const [horizon, setHorizon] = useState('365'); // jours à afficher (échéances à venir)
  const [q, setQ] = useState('');

  const fmtDate = s => {
    if (!s) return '—';
    const [y, m, d] = s.split('-');
    return d ? `${d}/${m}/${y}` : s;
  };
  const filNomSafe = id => {
    if (id === 'all') return 'Toutes filiales';
    if (id === 'yilmaz') return 'YILMAZ SAS';
    try { return filNom ? filNom(id) : String(id); } catch { return String(id); }
  };

  // Construction + filtrage filiale + statut
  const items = useMemo(() => {
    let list = buildEcheances({ assData, ctrData, autoData, veilleAO });
    if (filterByFiliale) { try { list = filterByFiliale(list); } catch { /* garde tout */ } }
    return list
      .map(it => ({ ...it, st: echeanceStatut(it.date, it.seuil) }))
      .filter(it => it.st)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [assData, ctrData, autoData, veilleAO, filterByFiliale]);

  // Filtres UI
  const horizonN = horizon === 'tous' ? Infinity : parseInt(horizon, 10);
  const filtered = items.filter(it => {
    if (srcFilter !== 'tous' && it.source !== srcFilter) return false;
    // horizon : garder expirés + ceux dans l'horizon
    if (it.st.jours > horizonN) return false;
    if (q) {
      const hay = (it.titre + ' ' + it.sousTitre + ' ' + filNomSafe(it.filialeId)).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  // KPI (sur l'ensemble filtré par source/recherche, tous horizons)
  const scope = items.filter(it => {
    if (srcFilter !== 'tous' && it.source !== srcFilter) return false;
    if (q) {
      const hay = (it.titre + ' ' + it.sousTitre + ' ' + filNomSafe(it.filialeId)).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  const nExpire = scope.filter(i => i.st.cle === 'expire').length;
  const n30 = scope.filter(i => i.st.cle !== 'expire' && i.st.jours <= 30).length;
  const n90 = scope.filter(i => i.st.cle !== 'expire' && i.st.jours > 30 && i.st.jours <= 90).length;
  const nTotal = scope.length;

  const stColor = cle => cle === 'expire' ? $danger : cle === 'bientot' ? $warn : $success;
  const srcMeta = id => SOURCES.find(s => s.id === id) || { label: id, icon: '•', color: $textSec };

  const KPI = ({ label, val, color, sub }) => (
    <div style={{ background: $bgCard, border: `1px solid ${$border}`, borderRadius: crmRd, padding: '16px 18px', boxShadow: $shadow }}>
      <div style={{ fontSize: '0.7rem', color: $textMut, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: '1.7rem', fontWeight: 800, color }}>{val}</div>
      {sub && <div style={{ fontSize: '0.68rem', color: $textMut, marginTop: 2 }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: $text }}>⏰ Centre d'échéances</h1>
          <div style={{ fontSize: '0.82rem', color: $textMut, margin: '4px 0 0' }}>
            Toutes les échéances du groupe : assurances, contrats, contrôles techniques, leasings, conformité, appels d'offres.
          </div>
        </div>
        <input
          value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher…"
          style={{ background: $bgSub, border: `1px solid ${$border}`, borderRadius: crmRd, color: $text, padding: '9px 14px', fontSize: '0.85rem', minWidth: 220, outline: 'none' }}
        />
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 18 }}>
        <KPI label="Expiré" val={nExpire} color={$danger} sub="à régulariser" />
        <KPI label="Sous 30 jours" val={n30} color={$warn} sub="urgent" />
        <KPI label="Sous 90 jours" val={n90} color={$info} sub="à préparer" />
        <KPI label="Total suivi" val={nTotal} color={$text} sub="échéances datées" />
      </div>

      {/* Filtres source */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {[{ id: 'tous', label: 'Toutes', icon: '◆', color: $accent }, ...SOURCES].map(s => {
          const active = srcFilter === s.id;
          const count = s.id === 'tous' ? items.length : items.filter(i => i.source === s.id).length;
          return (
            <button key={s.id} onClick={() => setSrcFilter(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                background: active ? s.color : $bgCard, color: active ? '#fff' : $textSec,
                border: `1px solid ${active ? s.color : $border}`, borderRadius: crmRd,
                padding: '7px 13px', fontSize: '0.8rem', fontWeight: 600, transition: 'all .12s',
              }}>
              <span>{s.icon}</span>{s.label}
              <span style={{ fontSize: '0.7rem', opacity: 0.85, background: active ? 'rgba(255,255,255,0.22)' : $bgSub, borderRadius: 10, padding: '1px 7px' }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Horizon */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: '0.75rem', color: $textMut }}>Horizon :</span>
        {[['90', '3 mois'], ['180', '6 mois'], ['365', '1 an'], ['tous', 'Tout']].map(([v, l]) => (
          <button key={v} onClick={() => setHorizon(v)}
            style={{
              cursor: 'pointer', background: horizon === v ? $accent : 'transparent',
              color: horizon === v ? '#fff' : $textSec, border: `1px solid ${horizon === v ? $accent : $border}`,
              borderRadius: crmRd, padding: '5px 11px', fontSize: '0.75rem', fontWeight: 600,
            }}>{l}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: $textMut }}>{filtered.length} affichée(s)</span>
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div style={{ background: $bgCard, border: `1px solid ${$border}`, borderRadius: crmRd, padding: '40px', textAlign: 'center', color: $textMut }}>
          Aucune échéance pour ce filtre. 🎉
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(it => {
            const meta = srcMeta(it.source);
            const c = stColor(it.st.cle);
            return (
              <div key={it.id}
                style={{
                  background: $bgCard, borderRadius: crmRd, border: `1px solid ${$border}`,
                  borderLeft: `3px solid ${c}`, padding: '12px 16px',
                  display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 14, alignItems: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.borderLeftColor = c; e.currentTarget.style.boxShadow = $shadowLg; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = $border; e.currentTarget.style.borderLeftColor = c; e.currentTarget.style.boxShadow = 'none'; }}>
                {/* source */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                  <span style={{ fontSize: '1rem' }}>{meta.icon}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{meta.label}</span>
                </div>
                {/* titre */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: $text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.titre}</div>
                  <div style={{ fontSize: '0.72rem', color: $textMut, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {filNomSafe(it.filialeId)}{it.sousTitre ? ' — ' + it.sousTitre : ''}
                  </div>
                </div>
                {/* date + statut */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: $text }}>{fmtDate(it.date)}</div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: c }}>
                    {it.st.cle === 'expire' ? `Expiré (${Math.abs(it.st.jours)} j)` : `dans ${it.st.jours} j`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
