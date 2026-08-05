// === Onglet « aujourdhui » — Aujourd'hui ===
// L'écran d'accueil : il répond à « qu'est-ce qu'on attend de moi maintenant ? »
// Ordre voulu : ce qui coûte le plus cher si on ne le fait pas arrive en premier.
//   1. En retard / échéances proches  → coût réel et croissant
//   2. En attente de ma validation    → je bloque quelqu'un d'autre
//   3. Les chiffres                   → information, repliée
//   4. Dernières activités            → colonne latérale
// Le contenu s'adapte au rôle de la personne connectée.

import React, { useMemo, useState } from 'react';
import { buildEcheances, echeanceStatut } from '../data/echeances.js';

// ── Quels domaines concernent chaque rôle ────────────────────────────────────
// 'tout' = vue groupe (direction). Sinon on ne montre que les domaines utiles.
const DOMAINES_PAR_SERVICE = {
  DIRECTION: 'tout',
  FINANCE:   ['assurance', 'contrat', 'facture'],
  RH:        ['conformite', 'contrat'],
  OPERATIONS:['vehicule_ct', 'vehicule_leasing', 'conformite', 'appel_offre'],
  IT:        ['contrat'],
  COMMERCE:  ['appel_offre', 'contrat'],
};

const LIBELLE_SOURCE = {
  assurance: 'Assurance', contrat: 'Contrat', vehicule_ct: 'Contrôle technique',
  vehicule_leasing: 'Fin de leasing', conformite: 'Conformité', appel_offre: "Appel d'offres",
  facture: 'Facture',
};
const ICONE_SOURCE = {
  assurance: '🛡️', contrat: '📄', vehicule_ct: '🔧', vehicule_leasing: '🚗',
  conformite: '⚖️', appel_offre: '📌', facture: '🧾',
};

// Statuts de facture qui attendent une décision humaine
const ATTENTE_FACTURE = {
  reception:          { label: 'à contrôler',            roles: ['FINANCE', 'DIRECTION'] },
  validation_manager: { label: 'validation manager',     roles: ['DIRECTION', 'OPERATIONS', 'FINANCE'] },
  validation_daf:     { label: 'validation DAF',         roles: ['FINANCE', 'DIRECTION'] },
};

export default function TabAujourdhui(__props) {
  const {
    $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec,
    $danger, $warn, $success, $info, crmRd,
    currentUser, filNom, filterByFiliale, setOngletActif,
    assData, ctrData, autoData, veilleAO, factExtData,
    chantiers, employes, filialesEnrichies,
  } = __props;

  const [chiffresOuverts, setChiffresOuverts] = useState(false);

  const service = (currentUser?.service || 'DIRECTION').toUpperCase();
  const estDirection = (currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN'
                        || DOMAINES_PAR_SERVICE[service] === 'tout');
  const domaines = estDirection ? 'tout' : (DOMAINES_PAR_SERVICE[service] || 'tout');
  const concerne = (source) => domaines === 'tout' || domaines.includes(source);

  const prenom = currentUser?.prenom || currentUser?.login || '';

  // ── 1. Ce qui est en retard ou arrive ────────────────────────────────────
  const urgences = useMemo(() => {
    let liste = buildEcheances({ assData, ctrData, autoData, veilleAO });
    if (filterByFiliale) { try { liste = filterByFiliale(liste); } catch { /* garde tout */ } }
    return liste
      .filter(e => concerne(e.source))
      .map(e => ({ ...e, st: echeanceStatut(e.date, e.seuil) }))
      .filter(e => e.st && (e.st.cle === 'expire' || e.st.jours <= 30))
      // le plus en retard d'abord, puis le plus proche
      .sort((a, b) => a.st.jours - b.st.jours)
      .slice(0, 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assData, ctrData, autoData, veilleAO, filterByFiliale, domaines]);

  const nbRetard = urgences.filter(u => u.st.cle === 'expire').length;

  // ── 2. Ce qui attend ma validation ───────────────────────────────────────
  const validations = useMemo(() => {
    const factures = factExtData?.factures || [];
    return factures
      .filter(f => {
        const att = ATTENTE_FACTURE[f.statut];
        if (!att) return false;
        return estDirection || att.roles.includes(service);
      })
      .map(f => ({
        id: f.id, ref: f.ref, montant: f.montantTTC || f.montantHT || 0,
        etape: ATTENTE_FACTURE[f.statut].label, filialeId: f.filialeId,
        echeance: f.dateEcheance || null,
      }))
      .sort((a, b) => (a.echeance || '9999').localeCompare(b.echeance || '9999'))
      .slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factExtData, service, estDirection]);

  const totalValidations = validations.reduce((s, v) => s + (v.montant || 0), 0);

  // ── 3. Le pouls (bandeau fin) ────────────────────────────────────────────
  const pouls = useMemo(() => {
    const fils = (filialesEnrichies || []).filter(f => f.holding !== 'GROUP OY');
    const ca = fils.reduce((s, f) => s + (f.ca || 0), 0);
    const actifs = (chantiers || []).filter(c => (c.statut || '').toLowerCase().includes('cours')).length
                   || (chantiers || []).length;
    const aoOuverts = (veilleAO || []).filter(a => {
      const s = (a.statut || '').toLowerCase();
      return !s.includes('perdu') && !s.includes('abandon') && !s.includes('gagn');
    }).length;
    const effectif = (employes || []).filter(e => (e.statut || 'actif') === 'actif').length;
    return { ca, actifs, aoOuverts, effectif };
  }, [filialesEnrichies, chantiers, veilleAO, employes]);

  // ── 4. Dernières activités (déduites des dates présentes) ────────────────
  const activites = useMemo(() => {
    const out = [];
    (veilleAO || []).forEach(a => {
      if (a.dateImport) out.push({ date: a.dateImport.slice(0, 10), icone: '📌', texte: `AO ajouté — ${a.titre || a.ref || ''}` });
    });
    (ctrData || []).forEach(c => {
      if (c.dateDebut) out.push({ date: c.dateDebut, icone: '📄', texte: `Contrat démarré — ${c.titre || ''}` });
    });
    (assData || []).forEach(a => {
      if (a.dateDebut) out.push({ date: a.dateDebut, icone: '🛡️', texte: `Police — ${a.assureur || ''}` });
    });
    return out
      .filter(a => a.date)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6);
  }, [veilleAO, ctrData, assData]);

  // ── Rendu ────────────────────────────────────────────────────────────────
  const fmtM = v => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M€'
                  : v >= 1000 ? Math.round(v / 1000) + 'k€' : Math.round(v) + '€';
  const fmtDate = s => { if (!s) return '—'; const [y, m, d] = s.split('-'); return d ? `${d}/${m}/${y}` : s; };
  const filNomSafe = id => {
    if (id === 'all') return 'Toutes filiales';
    if (id === 'yilmaz') return 'YILMAZ SAS';
    try { return filNom ? filNom(id) : String(id); } catch { return String(id); }
  };

  const Bloc = ({ titre, compteur, couleur, children, action }) => (
    <div style={{ background: $bgCard, border: `1px solid ${$border}`, borderRadius: crmRd, padding: '18px 20px', boxShadow: $shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        <span style={{ fontFamily: 'inherit', fontWeight: 700, fontSize: '0.95rem', color: $text }}>{titre}</span>
        {compteur != null && (
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: couleur, background: 'rgba(128,128,128,0.12)', borderRadius: 20, padding: '2px 9px' }}>{compteur}</span>
        )}
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <div>
      {/* En-tête */}
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0, color: $text }}>
          Aujourd'hui{prenom ? `, ${prenom}` : ''}
        </h1>
        <div style={{ fontSize: '0.82rem', color: $textMut, margin: '4px 0 0' }}>
          {nbRetard > 0
            ? `${nbRetard} point${nbRetard > 1 ? 's' : ''} en retard à régulariser.`
            : urgences.length > 0
              ? `${urgences.length} échéance${urgences.length > 1 ? 's' : ''} dans les 30 jours.`
              : 'Rien d\'urgent. Bonne journée.'}
        </div>
      </div>

      {/* Le pouls — bandeau fin */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0 28px',
        background: $bgSub, border: `1px solid ${$border}`, borderRadius: crmRd,
        padding: '11px 18px', marginBottom: 18,
      }}>
        {[
          { l: 'Chiffre d\'affaires', v: fmtM(pouls.ca) },
          { l: 'Chantiers', v: pouls.actifs },
          { l: 'AO en cours', v: pouls.aoOuverts },
          { l: 'Collaborateurs', v: pouls.effectif },
        ].map(k => (
          <div key={k.l} style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: $text, fontVariantNumeric: 'tabular-nums' }}>{k.v}</span>
            <span style={{ fontSize: '0.74rem', color: $textMut }}>{k.l}</span>
          </div>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: $textMut }}>
          {estDirection ? 'Vue groupe' : `Vue ${service.toLowerCase()}`}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(230px,290px)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* 1 — Ce qui attend une action */}
          <Bloc
            titre="⚡ Ce qui vous attend"
            compteur={urgences.length + validations.length}
            couleur={nbRetard > 0 ? $danger : $warn}
            action={
              <button onClick={() => setOngletActif?.('centre_echeances')}
                style={{ marginLeft: 'auto', background: 'transparent', border: `1px solid ${$border}`, borderRadius: crmRd, color: $textSec, padding: '4px 11px', fontSize: '0.74rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Toutes les échéances →
              </button>
            }>
            {urgences.length === 0 && validations.length === 0 ? (
              <div style={{ color: $textMut, fontSize: '0.86rem', padding: '10px 0' }}>
                Rien ne vous attend. 🐝
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {urgences.map(u => {
                  const enRetard = u.st.cle === 'expire';
                  const c = enRetard ? $danger : $warn;
                  return (
                    <div key={u.id} style={{
                      display: 'flex', alignItems: 'center', gap: 11,
                      background: $bgSub, border: `1px solid ${$border}`, borderLeft: `3px solid ${c}`,
                      borderRadius: crmRd, padding: '10px 13px',
                    }}>
                      <span style={{ fontSize: '1rem' }}>{ICONE_SOURCE[u.source] || '•'}</span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: $text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.titre}</div>
                        <div style={{ fontSize: '0.71rem', color: $textMut }}>
                          {LIBELLE_SOURCE[u.source] || u.source} · {filNomSafe(u.filialeId)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: c }}>
                          {enRetard ? `${Math.abs(u.st.jours)} j de retard` : `dans ${u.st.jours} j`}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: $textMut }}>{fmtDate(u.date)}</div>
                      </div>
                    </div>
                  );
                })}

                {validations.length > 0 && (
                  <div style={{ fontSize: '0.7rem', color: $textMut, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '8px 0 2px' }}>
                    En attente de validation — {fmtM(totalValidations)}
                  </div>
                )}
                {validations.map(v => (
                  <div key={v.id} style={{
                    display: 'flex', alignItems: 'center', gap: 11,
                    background: $bgSub, border: `1px solid ${$border}`, borderLeft: `3px solid ${$info}`,
                    borderRadius: crmRd, padding: '10px 13px', cursor: 'pointer',
                  }} onClick={() => setOngletActif?.('reception_factures')}>
                    <span style={{ fontSize: '1rem' }}>🧾</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: $text }}>{v.ref}</div>
                      <div style={{ fontSize: '0.71rem', color: $textMut }}>{v.etape} · {filNomSafe(v.filialeId)}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: $text }}>{fmtM(v.montant)}</div>
                      {v.echeance && <div style={{ fontSize: '0.68rem', color: $textMut }}>éch. {fmtDate(v.echeance)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Bloc>

          {/* 3 — Les chiffres, repliés */}
          <div style={{ background: $bgCard, border: `1px solid ${$border}`, borderRadius: crmRd, boxShadow: $shadow }}>
            <button onClick={() => setChiffresOuverts(o => !o)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9, background: 'transparent',
                border: 'none', padding: '15px 20px', cursor: 'pointer', fontFamily: 'inherit',
                color: $text, fontWeight: 700, fontSize: '0.95rem', textAlign: 'left',
              }}>
              📊 Les chiffres
              <span style={{ marginLeft: 'auto', color: $textMut, fontSize: '0.8rem', fontWeight: 400 }}>
                {chiffresOuverts ? 'Réduire ▴' : 'Détailler ▾'}
              </span>
            </button>
            {chiffresOuverts && (
              <div style={{ padding: '0 20px 18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
                  {(filialesEnrichies || []).filter(f => f.holding !== 'GROUP OY').map(f => (
                    <div key={f.id} style={{ background: $bgSub, border: `1px solid ${$border}`, borderRadius: crmRd, padding: '11px 13px' }}>
                      <div style={{ fontSize: '0.75rem', color: $textMut, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.icon} {f.nom}
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: $accent, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
                        {fmtM(f.ca || 0)}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: $textMut }}>{f.effectif || 0} collaborateur{(f.effectif || 0) > 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setOngletActif?.('dashboard')}
                  style={{ marginTop: 12, background: 'transparent', border: `1px solid ${$border}`, borderRadius: crmRd, color: $textSec, padding: '6px 13px', fontSize: '0.76rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Tableau de bord complet →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 — Dernières activités */}
        <Bloc titre="🔄 Dernières activités">
          {activites.length === 0 ? (
            <div style={{ color: $textMut, fontSize: '0.84rem' }}>Rien à signaler.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {activites.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{a.icone}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.79rem', color: $textSec, lineHeight: 1.4 }}>{a.texte}</div>
                    <div style={{ fontSize: '0.68rem', color: $textMut }}>{fmtDate(a.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Bloc>
      </div>
    </div>
  );
}
