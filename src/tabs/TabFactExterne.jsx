// === Onglet « fact_externe » — extrait de App.jsx (modularisation, forme iife) ===
import React, {  } from 'react';
import { Legend } from 'recharts';

export default function TabFactExterne(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $shadowLg, $success, $text, $textMut, $textSec, $warn, CATS_PRESTA, CGV_DEFAULTS, CONDITIONS_PAIEMENT, CONTRAT_STATUTS, CONTRAT_TYPES, DOC_TYPES, MISSION_STATUTS, MODES_FACT, STATUTS_FACTEXT, TACHE_PRIORITES, TACHE_STATUTS, TYPES_PRESTA, ca, confirmRejet, contratEdit, contratView, crmRd, defaultFactColW, defaultPrestaColW, deleteFactExtEntry, deletePresta, expandedTache, factColW, factExtContratModal, factExtData, factExtFilter, factExtForm, factExtPrestaForm, factExtPreview, factExtTab, factExtView, factResizeRef, filiales, filialesEnrichies, missionViewMode, newComment, prestaColW, prestaDetailTab, prestaFilters, prestaNewCompetence, prestaNewContratRecuForm, prestaNewDocForm, prestaNewMissionForm, prestaNewTacheForm, prestaResizeRef, prestaSort, rejetModal, saveFactExtEntry, savePresta, setContratEdit, setContratView, setExpandedTache, setFactColW, setFactExtContratModal, setFactExtFilter, setFactExtForm, setFactExtPrestaForm, setFactExtPreview, setFactExtTab, setFactExtView, setMissionViewMode, setNewComment, setPrestaColW, setPrestaDetailTab, setPrestaFilters, setPrestaNewCompetence, setPrestaNewContratRecuForm, setPrestaNewDocForm, setPrestaNewMissionForm, setPrestaNewTacheForm, setPrestaSort, setRejetModal, setShowCGVEditor, showCGVEditor, updateFactExtStatut } = __props;
        const { prestataires, factures } = factExtData;
        const cardS = {background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'};
        const inS = {width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.9rem', outline:'none', background:$bgCard};
        const lbS = {display:'block', fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:3, textTransform:'uppercase', letterSpacing:'0.03em'};
        const fmt = v => v >= 1000000 ? (v/1000000).toFixed(2)+'M€' : v >= 1000 ? (v/1000).toFixed(1)+'K€' : v.toFixed(0)+'€';
        const btnP = {padding:'8px 18px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #dc2626, #b91c1c)', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'};
        const btnS = {padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.9rem', cursor:'pointer'};

        // Filtered factures
        const ff = factures.filter(f => {
          if (factExtFilter.statut !== 'all' && f.statut !== factExtFilter.statut) return false;
          if (factExtFilter.prestaId !== 'all' && f.prestaId !== factExtFilter.prestaId) return false;
          if (factExtFilter.filiale !== 'all' && f.filialeId !== factExtFilter.filiale) return false;
          return true;
        });

        const totalHT = factures.reduce((s,f) => s + f.montantHT, 0);
        const totalTTC = factures.reduce((s,f) => s + f.montantTTC, 0);
        const totalPaye = factures.filter(f => f.statut === 'payee').reduce((s,f) => s + f.montantTTC, 0);
        const totalAValider = factures.filter(f => ['reception','validation_manager','validation_daf'].includes(f.statut)).reduce((s,f) => s + f.montantTTC, 0);
        const totalBonAPayer = factures.filter(f => f.statut === 'bon_a_payer').reduce((s,f) => s + f.montantTTC, 0);
        const nbEnCours = factures.filter(f => !['payee','rejetee'].includes(f.statut)).length;

        // Coût mensuel récurrent estimé (prestataires actifs avec forfait)
        const coutMensuelRecurrent = prestataires.filter(p => p.statut === 'actif').reduce((s, p) => {
          if (p.modeFact === 'forfait_mensuel') return s + p.tarifBase;
          if (p.modeFact === 'mixte' && p.joursParSemaine) return s + (p.tarifBase * p.joursParSemaine * 4.33);
          if (p.modeFact === 'tjm' && p.joursParSemaine) return s + (p.tarifBase * p.joursParSemaine * 4.33);
          if (p.modeFact === 'forfait_annuel') return s + (p.tarifBase / 12);
          return s;
        }, 0);

        return (
          <div style={{maxWidth:1200, margin:'0 auto'}}>
            {/* Header */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12}}>
              <div>
                <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>📥 Facturation Externe & CRM Prestataires</h1>
                <div style={{fontSize:'0.88rem', color:$textMut, marginTop:2}}>Gestion des prestataires, freelances et factures reçues</div>
              </div>
              <div style={{display:'flex', gap:6}}>
                {['dashboard','factures','prestataires'].map(t => (
                  <button key={t} onClick={() => setFactExtTab(t)} style={{padding:'6px 14px', borderRadius:crmRd, border: factExtTab===t ? '2px solid #dc2626' : `1px solid ${$border}`, background: factExtTab===t ? 'rgba(239,68,68,0.10)' : $bgCard, color: factExtTab===t ? '#dc2626' : '#6b5d4d', fontWeight:700, fontSize:'0.88rem', cursor:'pointer'}}>
                    {t==='dashboard'?'📊 Dashboard':t==='factures'?'🧾 Factures':'👥 CRM Prestataires'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── DASHBOARD ── */}
            {factExtTab === 'dashboard' && (<>
              {/* ═══ MODERN DASHBOARD ═══ */}

              {/* Row 1 — Elegant KPI Cards */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:18}}>
                {[
                  {label:'Coût mensuel', value:fmt(coutMensuelRecurrent), sub:prestataires.filter(p=>p.statut==='actif').length+' prestataires actifs', icon:'🔄', accent:'#8B6F47'},
                  {label:'En cours', value:String(nbEnCours), sub:fmt(totalAValider)+' à valider', icon:'⏳', accent:'#c5943a'},
                  {label:'Bon à payer', value:fmt(totalBonAPayer), sub:'Prêt pour paiement', icon:'✅', accent:'#6b8a5e'},
                  {label:'Total payé', value:fmt(totalPaye), sub:fmt(totalHT)+' HT cumulé', icon:'💰', accent:'#5a7d8a'},
                ].map((k,i) => (
                  <div key={i} style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'18px 20px'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                        <div>
                          <div style={{fontSize:'0.78rem', fontWeight:600, textTransform:'uppercase', color:$textMut, letterSpacing:0.5}}>{k.label}</div>
                          <div style={{fontSize:'1.6rem', fontWeight:900, color:$text, marginTop:6, lineHeight:1}}>{k.value}</div>
                        </div>
                        <div style={{width:40, height:40, borderRadius:crmRd, background:`${k.accent}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem'}}>{k.icon}</div>
                      </div>
                      <div style={{fontSize:'0.78rem', color:$textSec, marginTop:8}}>{k.sub}</div>
                    </div>
                    <div style={{height:3, background:`linear-gradient(90deg, ${k.accent}, ${k.accent}44)`}}/>
                  </div>
                ))}
              </div>

              {/* Row 2 — Pipeline + Répartition */}
              <div style={{display:'grid', gridTemplateColumns:'3fr 2fr', gap:14, marginBottom:18}}>
                {/* Pipeline visual */}
                <div style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.95rem'}}>🔄 Pipeline de validation</div>
                  <div style={{padding:'18px 16px'}}>
                    <div style={{display:'flex', alignItems:'center', gap:0}}>
                      {['reception','validation_manager','validation_daf','bon_a_payer','payee'].map((st, i) => {
                        const stInfo = STATUTS_FACTEXT[st];
                        const count = factures.filter(f => f.statut === st).length;
                        const total = factures.filter(f => f.statut === st).reduce((s,f) => s + f.montantTTC, 0);
                        const maxCount = Math.max(1, ...['reception','validation_manager','validation_daf','bon_a_payer','payee'].map(s => factures.filter(f => f.statut === s).length));
                        const barH = Math.max(20, (count / maxCount) * 80);
                        return (
                          <div key={st} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
                            {i > 0 && <div style={{position:'absolute', left:-8, top:'50%', width:16, height:2, background:$border, zIndex:1}}/>}
                            <div style={{width:'100%', padding:'0 4px', cursor:'pointer', textAlign:'center'}} onClick={() => { setFactExtFilter({...factExtFilter, statut: st}); setFactExtTab('factures'); }}>
                              <div style={{fontSize:'0.52rem', fontWeight:700, color:stInfo.color, textTransform:'uppercase', marginBottom:6, minHeight:24, lineHeight:'12px'}}>{stInfo.label.replace(/^[^ ]+ /,'')}</div>
                              <div style={{margin:'0 auto', width:'60%', height:barH, background:`linear-gradient(180deg, ${stInfo.color}99, ${stInfo.color}33)`, borderRadius:crmRd, display:'flex', alignItems:'center', justifyContent:'center', transition:'height 0.4s', minHeight:20}}>
                                <span style={{fontSize:'0.95rem', fontWeight:900, color:'white', textShadow:'0 1px 2px rgba(0,0,0,0.3)'}}>{count}</span>
                              </div>
                              <div style={{fontSize:'0.68rem', color:$textMut, marginTop:4, fontWeight:600}}>{count > 0 ? fmt(total) : '—'}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Rejetées / Litige mini badges */}
                    {(factures.filter(f=>f.statut==='rejetee').length > 0 || factures.filter(f=>f.statut==='litige').length > 0) && (
                      <div style={{display:'flex', gap:8, marginTop:12, justifyContent:'center'}}>
                        {factures.filter(f=>f.statut==='rejetee').length > 0 && <span style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, background:'rgba(239,68,68,0.22)', color:'#991b1b', fontWeight:700}}>❌ {factures.filter(f=>f.statut==='rejetee').length} rejetée(s)</span>}
                        {factures.filter(f=>f.statut==='litige').length > 0 && <span style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, background:'rgba(212,160,48,0.18)', color:'#dc2626', fontWeight:700}}>⚠️ {factures.filter(f=>f.statut==='litige').length} litige(s)</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Répartition par catégorie */}
                <div style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.95rem'}}>📊 Dépenses par catégorie</div>
                  <div style={{padding:'14px 16px'}}>
                    {(() => {
                      const catTotals = {};
                      prestataires.forEach(pr => {
                        const ck = pr.categorie || 'autre';
                        const prFact = factures.filter(f => f.prestaId === pr.id);
                        catTotals[ck] = (catTotals[ck] || 0) + prFact.reduce((s,f) => s + f.montantTTC, 0);
                      });
                      const sorted = Object.entries(catTotals).filter(([,v]) => v > 0).sort((a,b) => b[1] - a[1]);
                      const maxVal = sorted.length > 0 ? sorted[0][1] : 1;
                      return sorted.map(([ck, val]) => {
                        const ci = CATS_PRESTA[ck] || CATS_PRESTA.autre;
                        return (
                          <div key={ck} style={{marginBottom:8}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3}}>
                              <span style={{fontSize:'0.8rem', fontWeight:600, color:$text}}>{ci.icon} {ci.label}</span>
                              <span style={{fontSize:'0.8rem', fontWeight:700, color:ci.color}}>{fmt(val)}</span>
                            </div>
                            <div style={{height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                              <div style={{width:Math.max(3, val/maxVal*100)+'%', height:'100%', background:`linear-gradient(90deg, ${ci.color}, ${ci.color}88)`, borderRadius:crmRd, transition:'width 0.5s'}}/>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* Row 3 — Alertes + Quick stats */}
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18}}>
                {/* Alertes */}
                <div style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, fontWeight:700, color:'#991b1b', fontSize:'0.95rem'}}>🚨 Alertes & Actions requises</div>
                  <div style={{padding:'12px 16px', maxHeight:200, overflowY:'auto'}}>
                    {(() => {
                      const alerts = [];
                      // Factures en retard
                      factures.filter(f => f.dateEcheance && new Date(f.dateEcheance) < new Date() && !['payee','rejetee'].includes(f.statut)).forEach(f => {
                        const pr = prestataires.find(p => p.id === f.prestaId);
                        alerts.push({icon:'▲', text:`Facture ${f.ref} en retard — ${pr?.nom || '?'} — ${fmt(f.montantTTC)}`, type:'danger'});
                      });
                      // Documents expirés
                      prestataires.forEach(pr => {
                        (pr.documents || []).filter(d => d.dateExpiration && new Date(d.dateExpiration) < new Date()).forEach(d => {
                          alerts.push({icon:'◆', text:`${(DOC_TYPES[d.type]||{}).label || d.type} expiré — ${pr.nom}`, type:'warn'});
                        });
                      });
                      // Contrats expirés
                      prestataires.filter(pr => pr.contrat && pr.contrat.statut === 'expire').forEach(pr => {
                        alerts.push({icon:'●', text:`Contrat expiré — ${pr.nom} (${pr.contrat.ref||'?'})`, type:'warn'});
                      });
                      // Contrats à préparer
                      prestataires.filter(pr => pr.statut==='actif' && (!pr.contrat || pr.contrat.statut === 'a_preparer')).forEach(pr => {
                        alerts.push({icon:'📝', text:`Contrat à préparer — ${pr.nom}`, type:'info'});
                      });
                      if (alerts.length === 0) return <div style={{padding:16, textAlign:'center', color:'#059669', fontWeight:600}}>✅ Aucune alerte — Tout est en ordre !</div>;
                      return alerts.map((a,i) => (
                        <div key={i} style={{padding:'8px 10px', borderRadius:crmRd, background: a.type==='danger'?'rgba(239,68,68,0.10)':a.type==='warn'?'rgba(212,160,48,0.12)':$bgSub, marginBottom:4, fontSize:'0.84rem', display:'flex', alignItems:'center', gap:6}}>
                          <span>{a.icon}</span>
                          <span style={{color: a.type==='danger'?'#991b1b':a.type==='warn'?'#92400e':'#374151'}}>{a.text}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Quick stats — Donut-like visual */}
                <div style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.95rem'}}>👥 Prestataires par statut</div>
                  <div style={{padding:'16px', display:'flex', alignItems:'center', gap:20}}>
                    {/* Mini donut-like */}
                    <div style={{position:'relative', width:120, height:120, flexShrink:0}}>
                      {(() => {
                        const stats = [
                          {k:'actif', c:'#059669', n:prestataires.filter(p=>p.statut==='actif').length},
                          {k:'en_veille', c:'#d97706', n:prestataires.filter(p=>p.statut==='en_veille').length},
                          {k:'prospect', c:'#2563eb', n:prestataires.filter(p=>p.statut==='prospect').length},
                          {k:'termine', c:'#6b7280', n:prestataires.filter(p=>p.statut==='termine').length}
                        ].filter(s => s.n > 0);
                        const total = stats.reduce((s,x)=>s+x.n, 0) || 1;
                        let cum = 0;
                        const segs = stats.map(s => {
                          const start = cum / total * 360;
                          cum += s.n;
                          const end = cum / total * 360;
                          return {...s, start, end};
                        });
                        const gradParts = segs.map(s => `${s.c} ${s.start}deg ${s.end}deg`).join(', ');
                        return (
                          <>
                            <div style={{width:120, height:120, borderRadius:'50%', background:`conic-gradient(${gradParts})`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <div style={{width:70, height:70, borderRadius:'50%', background:$bgCard, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                                <div style={{fontSize:'1.3rem', fontWeight:900, color:$text}}>{prestataires.length}</div>
                                <div style={{fontSize:'0.6rem', color:$textMut, fontWeight:600}}>TOTAL</div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    {/* Legend */}
                    <div style={{flex:1}}>
                      {[
                        {l:'Actifs', n:prestataires.filter(p=>p.statut==='actif').length, c:'#059669'},
                        {l:'En veille', n:prestataires.filter(p=>p.statut==='en_veille').length, c:'#d97706'},
                        {l:'Prospects', n:prestataires.filter(p=>p.statut==='prospect').length, c:'#2563eb'},
                        {l:'Terminés', n:prestataires.filter(p=>p.statut==='termine').length, c:'#6b7280'}
                      ].filter(x => x.n > 0).map(x => (
                        <div key={x.l} style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                          <span style={{width:8, height:8, borderRadius:'50%', background:x.c, flexShrink:0}}/>
                          <div style={{flex:1, height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}><div style={{width: prestataires.length > 0 ? (x.n/prestataires.length*100)+'%' : '0%', height:'100%', background:x.c, borderRadius:3}}/></div>
                          <span style={{fontSize:'0.82rem', fontWeight:700, color:x.c, minWidth:24, textAlign:'right'}}>{x.n}</span>
                          <span style={{fontSize:'0.75rem', color:$textSec, minWidth:50}}>{x.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4 — Top Prestataires visual */}
              <div style={{background:$bgCard, borderRadius:crmRd, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'}}>
                <div style={{padding:'14px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontWeight:700, color:$text, fontSize:'0.95rem'}}>🏆 Top prestataires par volume</span>
                  <button onClick={() => setFactExtTab('prestataires')} style={{fontSize:'0.78rem', color:'#dc2626', fontWeight:700, background:'none', border:'none', cursor:'pointer'}}>Voir tous →</button>
                </div>
                <div style={{padding:'14px 16px'}}>
                  {prestataires.filter(p => p.statut === 'actif').sort((a,b) => {
                    return factures.filter(f=>f.prestaId===b.id).reduce((s,f)=>s+f.montantTTC,0) - factures.filter(f=>f.prestaId===a.id).reduce((s,f)=>s+f.montantTTC,0);
                  }).slice(0, 6).map((pr, idx) => {
                    const cat2 = CATS_PRESTA[pr.categorie] || CATS_PRESTA.autre;
                    const mode2 = MODES_FACT[pr.modeFact] || {};
                    const prFact = factures.filter(f => f.prestaId === pr.id);
                    const prTotal = prFact.reduce((s,f) => s + f.montantTTC, 0);
                    const maxTotal = Math.max(1, ...prestataires.filter(p=>p.statut==='actif').map(p => factures.filter(f=>f.prestaId===p.id).reduce((s,f)=>s+f.montantTTC,0)));
                    const initials2 = pr.nom.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
                    const pctW = Math.max(3, prTotal/maxTotal*100);
                    return (
                      <div key={pr.id} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: idx < 5 ? `1px solid ${$border}` : 'none', cursor:'pointer'}} onClick={() => { setPrestaDetailTab('fiche'); setFactExtPreview(pr); }}>
                        <div style={{width:10, fontWeight:800, fontSize:'0.82rem', color:$textMut, textAlign:'right'}}>#{idx+1}</div>
                        <div style={{width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${cat2.color}dd, ${cat2.color}66)`, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:'0.8rem', flexShrink:0}}>{initials2}</div>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:3}}>
                            <div>
                              <span style={{fontWeight:700, fontSize:'0.92rem', color:$text}}>{pr.nom}</span>
                              <span style={{fontSize:'0.72rem', color:cat2.color, marginLeft:6}}>{cat2.icon} {cat2.label}</span>
                            </div>
                            <div style={{fontWeight:800, color:'#1e40af', fontSize:'0.95rem'}}>{fmt(prTotal)}</div>
                          </div>
                          <div style={{height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}>
                            <div style={{width:pctW+'%', height:'100%', background:`linear-gradient(90deg, ${cat2.color}, ${cat2.color}66)`, borderRadius:3, transition:'width 0.5s'}}/>
                          </div>
                          <div style={{display:'flex', justifyContent:'space-between', marginTop:3}}>
                            <span style={{fontSize:'0.68rem', color:$textMut}}>{mode2.icon} {mode2.label?.split(' (')[0]} · {pr.tarifBase > 0 ? pr.tarifBase.toLocaleString('fr-FR')+' '+pr.tarifUnite : 'Sur devis'}</span>
                            <span style={{fontSize:'0.68rem', color:$textMut}}>{prFact.length} facture{prFact.length > 1 ? 's' : ''} · {'⭐'.repeat(pr.evaluation||0)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>)}

            {/* ── FACTURES TAB ── */}
            {factExtTab === 'factures' && (<>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, flexWrap:'wrap', gap:10}}>
                <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                  <span style={{fontWeight:700, color:$text}}>🧾 Factures reçues ({ff.length})</span>
                  <select value={factExtFilter.statut} onChange={e => setFactExtFilter({...factExtFilter, statut: e.target.value})} style={{...inS, width:'auto', fontSize:'0.82rem'}}>
                    <option value="all">Tous statuts</option>
                    {Object.entries(STATUTS_FACTEXT).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                  <select value={factExtFilter.prestaId} onChange={e => setFactExtFilter({...factExtFilter, prestaId: e.target.value})} style={{...inS, width:'auto', fontSize:'0.82rem'}}>
                    <option value="all">Tous prestataires</option>
                    {prestataires.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                  </select>
                  {(factExtFilter.statut !== 'all' || factExtFilter.prestaId !== 'all') && (
                    <button onClick={() => setFactExtFilter({statut:'all', prestaId:'all', filiale:'all'})} style={{fontSize:'0.78rem', color:'#dc2626', background:'none', border:'none', cursor:'pointer', fontWeight:600}}>✕ Reset</button>
                  )}
                </div>
                <button onClick={() => setFactExtForm('add')} style={btnP}>+ Nouvelle facture</button>
              </div>

              {/* Add/Edit Form */}
              {factExtForm && (() => {
                const isEdit = factExtForm !== 'add';
                const empty = { ref:'', prestaId:'', filialeId:'yilmaz', dateFacture:'', dateReception: new Date().toISOString().slice(0,10), dateEcheance:'', montantHT:0, tva:20, montantTTC:0, objet:'', periode:'', statut:'reception', chantier:'', notes:'' };
                const fd = isEdit ? factExtForm : empty;
                const setFd = (fn) => setFactExtForm(prev => { const cur = prev === 'add' ? empty : prev; return typeof fn === 'function' ? fn(cur) : fn; });
                const pr = prestataires.find(p => p.id === fd.prestaId);
                const computeTTC = (ht, t) => ht + (ht * t / 100);
                return (
                  <div style={{...cardS, marginBottom:18, padding:20}}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:14}}>
                      <span style={{fontWeight:700, color:'#dc2626'}}>{isEdit ? '✏️ Modifier' : '➕ Nouvelle facture reçue'}</span>
                      <button onClick={() => setFactExtForm(null)} style={{background:'none', border:'none', cursor:'pointer', color:$textMut}}>✕</button>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:10}}>
                      <div><label style={lbS}>N° facture fournisseur *</label><input value={fd.ref} onChange={e => setFd(p=>({...p, ref:e.target.value}))} style={inS} placeholder="FC-2026-XXX"/></div>
                      <div><label style={lbS}>Prestataire *</label><select value={fd.prestaId} onChange={e => setFd(p=>({...p, prestaId:e.target.value}))} style={inS}><option value="">— Choisir —</option>{prestataires.filter(p=>p.statut==='actif'||p.statut==='en_veille').map(p => <option key={p.id} value={p.id}>{p.nom} ({(CATS_PRESTA[p.categorie]||{}).label})</option>)}</select></div>
                      <div><label style={lbS}>Filiale destinataire</label><select value={fd.filialeId} onChange={e => setFd(p=>({...p, filialeId:e.target.value}))} style={inS}><option value="yilmaz">🏢 YILMAZ</option>{filialesEnrichies.filter(f=>f.ca>0).map(f => <option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}</select></div>
                      <div><label style={lbS}>Période</label><input type="month" value={fd.periode} onChange={e => setFd(p=>({...p, periode:e.target.value}))} style={inS}/></div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10, marginBottom:10}}>
                      <div><label style={lbS}>Date facture</label><input type="date" value={fd.dateFacture} onChange={e => setFd(p=>({...p, dateFacture:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Date réception</label><input type="date" value={fd.dateReception} onChange={e => setFd(p=>({...p, dateReception:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Montant HT (€)</label><input type="number" value={fd.montantHT} onChange={e => { const ht=Number(e.target.value); setFd(p=>({...p, montantHT:ht, montantTTC:computeTTC(ht,p.tva)})); }} style={inS}/></div>
                      <div><label style={lbS}>TVA (%)</label><input type="number" value={fd.tva} onChange={e => { const t=Number(e.target.value); setFd(p=>({...p, tva:t, montantTTC:computeTTC(p.montantHT,t)})); }} style={inS}/></div>
                      <div><label style={lbS}>Échéance</label><input type="date" value={fd.dateEcheance} onChange={e => setFd(p=>({...p, dateEcheance:e.target.value}))} style={inS}/></div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:10, marginBottom:14}}>
                      <div><label style={lbS}>Objet / description</label><input value={fd.objet} onChange={e => setFd(p=>({...p, objet:e.target.value}))} style={inS} placeholder="Ex: DAF externalisée — Janvier 2026"/></div>
                      <div><label style={lbS}>Chantier (optionnel)</label><input value={fd.chantier||''} onChange={e => setFd(p=>({...p, chantier:e.target.value}))} style={inS} placeholder="Réf chantier"/></div>
                      <div><label style={lbS}>Total TTC</label><div style={{...inS, background:$success+'12', fontWeight:700, color:'#059669', display:'flex', alignItems:'center'}}>{computeTTC(fd.montantHT||0, fd.tva||20).toLocaleString('fr-FR')} €</div></div>
                    </div>
                    <div style={{marginBottom:14}}><label style={lbS}>Notes</label><input value={fd.notes||''} onChange={e => setFd(p=>({...p, notes:e.target.value}))} style={inS} placeholder="Remarques, détail calcul..."/></div>
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={() => {
                        if (!fd.ref || !fd.prestaId) return;
                        const pr2 = prestataires.find(p => p.id === fd.prestaId);
                        const entry = { ...fd, id: isEdit ? fd.id : 'FE-'+Date.now(), montantHT: Number(fd.montantHT)||0, tva: Number(fd.tva)||20, montantTTC: computeTTC(Number(fd.montantHT)||0, Number(fd.tva)||20), prestaNom: pr2?.nom||'' };
                        saveFactExtEntry(entry, !isEdit);
                        setFactExtForm(null);
                      }} style={btnP}>{isEdit ? '💾 Enregistrer' : '➕ Ajouter'}</button>
                      <button onClick={() => setFactExtForm(null)} style={btnS}>Annuler</button>
                    </div>
                  </div>
                );
              })()}

              {/* Factures table */}
              <div style={cardS}>
                <div style={{overflowX:'auto'}}>
                  <table style={{borderCollapse:'collapse', fontSize:'0.92rem', tableLayout:'auto', width: factColW.reduce((s,w)=>s+w,0)}}>
                    <thead><tr style={{background:$bgSub}}>
                      {['Réf','Prestataire','Objet','Date','Échéance','HT','TTC','Statut',''].map((h,i) => {
                        const aligns = ['left','left','left','left','left','right','right','left','center'];
                        return (
                        <th key={i} style={{width: factColW[i], minWidth:40, padding:'10px 12px', textAlign: aligns[i], fontWeight:600, color:$textMut, fontSize:'0.76rem', textTransform:'uppercase', borderBottom:`2px solid ${$border}`, borderRight: i < 8 ? `1px solid ${$borderAlt}` : 'none', whiteSpace:'nowrap', position:'relative', userSelect:'none'}}>
                          {h}
                          {i < 8 && <div onMouseDown={e => {
                            e.preventDefault(); e.stopPropagation();
                            const startX = e.clientX;
                            const startW = factColW[i];
                            factResizeRef.current = { colIdx: i, startX, startW };
                            const onMove = ev => {
                              if (!factResizeRef.current) return;
                              const diff = ev.clientX - factResizeRef.current.startX;
                              const newW = Math.max(40, factResizeRef.current.startW + diff);
                              setFactColW(prev => prev.map((w,j) => j === factResizeRef.current.colIdx ? newW : w));
                            };
                            const onUp = () => { factResizeRef.current = null; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                            document.addEventListener('mousemove', onMove);
                            document.addEventListener('mouseup', onUp);
                          }} style={{position:'absolute', right:0, top:0, bottom:0, width:5, cursor:'col-resize', background:'transparent'}} onMouseOver={e => e.currentTarget.style.background='#dc2626'} onMouseOut={e => e.currentTarget.style.background='transparent'}/>}
                        </th>);
                      })}
                    </tr></thead>
                    <tbody>
                      {ff.sort((a,b) => (b.dateReception||'').localeCompare(a.dateReception||'')).map((fa, idx) => {
                        const st = STATUTS_FACTEXT[fa.statut] || STATUTS_FACTEXT.reception;
                        const pr2 = prestataires.find(p => p.id === fa.prestaId);
                        const cat = pr2 ? (CATS_PRESTA[pr2.categorie] || CATS_PRESTA.autre) : CATS_PRESTA.autre;
                        const isOverdue = fa.dateEcheance && new Date(fa.dateEcheance) < new Date() && !['payee','rejetee'].includes(fa.statut);
                        return (
                          <tr key={fa.id} style={{borderBottom:`1px solid ${$border}`, background: isOverdue ? 'rgba(239,68,68,0.10)' : idx%2===0?$bgCard:$bgCard}}>
                            <td style={{width:factColW[0], padding:'10px 12px', fontWeight:700, color:'#dc2626', fontSize:'0.86rem', borderRight:'1px solid #eee8e0'}}>{fa.ref}</td>
                            <td style={{width:factColW[1], padding:'10px 12px', borderRight:'1px solid #eee8e0'}}><div style={{fontWeight:600, fontSize:'0.92rem'}}>{pr2?.nom || fa.prestaNom || '?'}</div><div style={{fontSize:'0.72rem', color:cat.color}}>{cat.icon} {cat.label}</div></td>
                            <td style={{width:factColW[2], padding:'10px 12px', fontSize:'0.86rem', color:$textSec, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', borderRight:'1px solid #eee8e0'}}>{fa.objet}</td>
                            <td style={{width:factColW[3], padding:'10px 12px', fontSize:'0.86rem', color:$textSec, whiteSpace:'nowrap', borderRight:'1px solid #eee8e0'}}>{fa.dateReception}</td>
                            <td style={{width:factColW[4], padding:'10px 12px', fontSize:'0.86rem', color: isOverdue?'#dc2626':'#6b5d4d', fontWeight: isOverdue?700:400, whiteSpace:'nowrap', borderRight:'1px solid #eee8e0'}}>{fa.dateEcheance||'—'} {isOverdue&&'⚠️'}</td>
                            <td style={{width:factColW[5], padding:'10px 12px', textAlign:'right', fontWeight:600, borderRight:'1px solid #eee8e0'}}>{fa.montantHT.toLocaleString('fr-FR')} €</td>
                            <td style={{width:factColW[6], padding:'10px 12px', textAlign:'right', fontWeight:700, borderRight:'1px solid #eee8e0'}}>{fa.montantTTC.toLocaleString('fr-FR')} €</td>
                            <td style={{width:factColW[7], padding:'10px 12px', borderRight:'1px solid #eee8e0'}}>
                              <select value={fa.statut} onChange={e => updateFactExtStatut(fa.id, e.target.value)} style={{fontSize:'0.78rem', padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:st.bg, color:st.color, fontWeight:600, cursor:'pointer'}}>
                                {Object.entries(STATUTS_FACTEXT).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                              </select>
                              {fa.motifRejet && <div style={{fontSize:'0.65rem', color:'#991b1b', marginTop:3, lineHeight:1.3, cursor:'help'}} title={'Rejet du ' + (fa.dateRejet||'') + ' : ' + fa.motifRejet}>❌ {fa.motifRejet.length > 35 ? fa.motifRejet.slice(0,35)+'…' : fa.motifRejet}</div>}
                            </td>
                            <td style={{padding:'6px 8px', whiteSpace:'nowrap'}}>
                              <button onClick={() => setFactExtForm({...fa})} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.75rem', color:'#2563eb', marginRight:4}}>✏️</button>
                              <button onClick={() => deleteFactExtEntry(fa.id)} style={{padding:'3px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.75rem', color:'#dc2626'}}>🗑️</button>
                            </td>
                          </tr>
                        );
                      })}
                      {ff.length === 0 && <tr><td colSpan={9} style={{padding:40, textAlign:'center', color:$textMut}}>Aucune facture trouvée.</td></tr>}
                      {ff.length > 0 && (
                        <tr style={{background:$bgSub, fontWeight:700}}>
                          <td colSpan={5} style={{padding:'12px 14px'}}>TOTAL ({ff.length} factures)</td>
                          <td style={{padding:'12px 14px', textAlign:'right', color:'#dc2626'}}>{ff.reduce((s,f)=>s+f.montantHT,0).toLocaleString('fr-FR')} €</td>
                          <td style={{padding:'12px 14px', textAlign:'right', color:'#1e40af'}}>{ff.reduce((s,f)=>s+f.montantTTC,0).toLocaleString('fr-FR')} €</td>
                          <td colSpan={2}></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:'6px 12px', display:'flex', justifyContent:'flex-end', borderTop:`1px solid ${$border}`}}>
                  <button onClick={() => setFactColW([...defaultFactColW])} style={{fontSize:'0.72rem', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:'#dc2626', cursor:'pointer', fontWeight:600}}>↩ Reset colonnes</button>
                </div>
              </div>
            </>)}

            {/* ── CRM PRESTATAIRES TAB ── */}
            {factExtTab === 'prestataires' && (<>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div style={{display:'flex', gap:10, alignItems:'center'}}>
                  <span style={{fontWeight:700, color:$text}}>👥 CRM Prestataires ({prestataires.length})</span>
                  <div style={{display:'flex', border:`1px solid ${$border}`, borderRadius:crmRd, overflow:'hidden'}}>
                    {[{k:'cards',icon:'▦',label:'Cartes'},{k:'list',icon:'☰',label:'Liste'}].map(v => (
                      <button key={v.k} onClick={() => setFactExtView(v.k)} style={{padding:'4px 10px', border:'none', background: factExtView===v.k ? '#dc2626' : $bgCard, color: factExtView===v.k ? 'white' : '#6b5d4d', fontWeight:600, fontSize:'0.8rem', cursor:'pointer'}}>{v.icon} {v.label}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setFactExtPrestaForm('add')} style={btnP}>+ Nouveau prestataire</button>
              </div>

              {/* Filter bar */}
              {(() => {
                const selS = {...inS, width:'auto', fontSize:'0.82rem', padding:'5px 8px', minWidth:0};
                const hasFilters = prestaFilters.type!=='all' || prestaFilters.categorie!=='all' || prestaFilters.statut!=='all' || prestaFilters.modeFact!=='all' || prestaFilters.search;
                return (
                  <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:14, flexWrap:'wrap', padding:'8px 12px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`}}>
                    <span style={{fontSize:'0.75rem', fontWeight:700, color:$textMut}}>🔍</span>
                    <input value={prestaFilters.search} onChange={e => setPrestaFilters(p=>({...p, search:e.target.value}))} placeholder="Rechercher nom, spécialité..." style={{...selS, minWidth:160}}/>
                    <select value={prestaFilters.statut} onChange={e => setPrestaFilters(p=>({...p, statut:e.target.value}))} style={selS}><option value="all">Tous statuts</option><option value="actif">● Actif</option><option value="en_veille">● En veille</option><option value="prospect">● Prospect</option><option value="termine">● Terminé</option></select>
                    <select value={prestaFilters.categorie} onChange={e => setPrestaFilters(p=>({...p, categorie:e.target.value}))} style={selS}><option value="all">Toutes catégories</option>{Object.entries(CATS_PRESTA).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
                    <select value={prestaFilters.type} onChange={e => setPrestaFilters(p=>({...p, type:e.target.value}))} style={selS}><option value="all">Tous types</option>{Object.entries(TYPES_PRESTA).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
                    <select value={prestaFilters.modeFact} onChange={e => setPrestaFilters(p=>({...p, modeFact:e.target.value}))} style={selS}><option value="all">Tous modes</option>{Object.entries(MODES_FACT).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
                    {hasFilters && <button onClick={() => setPrestaFilters({type:'all',categorie:'all',statut:'all',modeFact:'all',search:''})} style={{fontSize:'0.78rem', color:'#dc2626', background:'none', border:'none', cursor:'pointer', fontWeight:700}}>✕ Reset</button>}
                  </div>
                );
              })()}

              {/* Filtered + sorted prestataires */}
              {(() => {
                const search = prestaFilters.search.toLowerCase();
                let fp = prestataires.filter(p => {
                  if (prestaFilters.type !== 'all' && p.type !== prestaFilters.type) return false;
                  if (prestaFilters.categorie !== 'all' && p.categorie !== prestaFilters.categorie) return false;
                  if (prestaFilters.statut !== 'all' && p.statut !== prestaFilters.statut) return false;
                  if (prestaFilters.modeFact !== 'all' && p.modeFact !== prestaFilters.modeFact) return false;
                  if (search && !(p.nom.toLowerCase().includes(search) || (p.specialite||'').toLowerCase().includes(search) || (p.raisonSociale||'').toLowerCase().includes(search) || (p.contactEmail||'').toLowerCase().includes(search) || (p.ville||'').toLowerCase().includes(search))) return false;
                  return true;
                });
                // Sort
                if (prestaSort.col !== null) {
                  const sortKeys = ['nom','specialite','type','categorie','modeFact','tarifBase','frequence','evaluation','_nbFact','_totalTTC','statut','_contrat',''];
                  const key = sortKeys[prestaSort.col];
                  fp = [...fp].sort((a, b) => {
                    let va, vb;
                    if (key === '_nbFact') { va = factures.filter(f=>f.prestaId===a.id).length; vb = factures.filter(f=>f.prestaId===b.id).length; }
                    else if (key === '_totalTTC') { va = factures.filter(f=>f.prestaId===a.id).reduce((s,f)=>s+f.montantTTC,0); vb = factures.filter(f=>f.prestaId===b.id).reduce((s,f)=>s+f.montantTTC,0); }
                    else if (key === '_contrat') { va = a.contrat?.statut||'zzz'; vb = b.contrat?.statut||'zzz'; }
                    else if (key === 'tarifBase' || key === 'evaluation') { va = a[key]||0; vb = b[key]||0; }
                    else { va = (a[key]||'').toString().toLowerCase(); vb = (b[key]||'').toString().toLowerCase(); }
                    if (typeof va === 'number') return prestaSort.dir === 'asc' ? va - vb : vb - va;
                    return prestaSort.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
                  });
                }
                const toggleSort = (colIdx) => {
                  setPrestaSort(prev => prev.col === colIdx ? { col: colIdx, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { col: colIdx, dir: 'asc' });
                };
                const sortArrow = (colIdx) => prestaSort.col === colIdx ? (prestaSort.dir === 'asc' ? ' ▲' : ' ▼') : ' ↕';

                return (<>
                  {fp.length !== prestataires.length && <div style={{fontSize:'0.82rem', color:$textMut, marginBottom:8}}>{fp.length} / {prestataires.length} prestataires affichés</div>}

              {/* Add/Edit Prestataire Form */}
              {factExtPrestaForm && (() => {
                const isEdit = factExtPrestaForm !== 'add';
                const empty = { nom:'', raisonSociale:'', type:'freelance', categorie:'it', specialite:'', siret:'', tvaIntra:'', adresse:'', ville:'', cp:'', contactNom:'', contactEmail:'', contactTel:'', modeFact:'tjm', tarifBase:0, tarifUnite:'€/jour', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz'], statut:'prospect', evaluation:3, dateDebut:'', dateFin:null, notes:'' };
                const fd = isEdit ? factExtPrestaForm : empty;
                const setFd = (fn) => setFactExtPrestaForm(prev => { const cur = prev === 'add' ? empty : prev; return typeof fn === 'function' ? fn(cur) : fn; });
                return (
                  <div style={{...cardS, marginBottom:18, padding:20}}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:14}}>
                      <span style={{fontWeight:700, color:'#dc2626'}}>{isEdit ? '✏️ Modifier prestataire' : '➕ Nouveau prestataire'}</span>
                      <button onClick={() => setFactExtPrestaForm(null)} style={{background:'none', border:'none', cursor:'pointer', color:$textMut}}>✕</button>
                    </div>
                    {/* Identity */}
                    <div style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:6, letterSpacing:'0.05em'}}>🪪 Identité</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:12}}>
                      <div><label style={lbS}>Nom / Personne *</label><input value={fd.nom} onChange={e => setFd(p=>({...p, nom:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Raison sociale</label><input value={fd.raisonSociale||''} onChange={e => setFd(p=>({...p, raisonSociale:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Type structure</label><select value={fd.type} onChange={e => setFd(p=>({...p, type:e.target.value}))} style={inS}>{Object.entries(TYPES_PRESTA).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select></div>
                      <div><label style={lbS}>Catégorie métier</label><select value={fd.categorie} onChange={e => setFd(p=>({...p, categorie:e.target.value}))} style={inS}>{Object.entries(CATS_PRESTA).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select></div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:10, marginBottom:12}}>
                      <div><label style={lbS}>Spécialité / compétence</label><input value={fd.specialite||''} onChange={e => setFd(p=>({...p, specialite:e.target.value}))} style={inS} placeholder="Ex: DAF externalisée, Développeur React, Avocat droit social..."/></div>
                      <div><label style={lbS}>SIRET</label><input value={fd.siret||''} onChange={e => setFd(p=>({...p, siret:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>TVA Intracom</label><input value={fd.tvaIntra||''} onChange={e => setFd(p=>({...p, tvaIntra:e.target.value}))} style={inS}/></div>
                    </div>
                    {/* Contact */}
                    <div style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:6, letterSpacing:'0.05em'}}>📇 Contact</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10, marginBottom:12}}>
                      <div><label style={lbS}>Nom contact</label><input value={fd.contactNom||''} onChange={e => setFd(p=>({...p, contactNom:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Email</label><input value={fd.contactEmail||''} onChange={e => setFd(p=>({...p, contactEmail:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Téléphone</label><input value={fd.contactTel||''} onChange={e => setFd(p=>({...p, contactTel:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Ville</label><input value={fd.ville||''} onChange={e => setFd(p=>({...p, ville:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>CP</label><input value={fd.cp||''} onChange={e => setFd(p=>({...p, cp:e.target.value}))} style={inS}/></div>
                    </div>
                    {/* Facturation */}
                    <div style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:6, letterSpacing:'0.05em'}}>💶 Mode de facturation</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:12}}>
                      <div><label style={lbS}>Mode</label><select value={fd.modeFact} onChange={e => { const m = MODES_FACT[e.target.value]; setFd(p=>({...p, modeFact:e.target.value, tarifUnite: m?.unite||'€'})); }} style={inS}>{Object.entries(MODES_FACT).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select></div>
                      <div><label style={lbS}>Tarif de base</label><input type="number" value={fd.tarifBase||0} onChange={e => setFd(p=>({...p, tarifBase:Number(e.target.value)}))} style={inS}/></div>
                      <div><label style={lbS}>Fréquence</label><select value={fd.frequence||'ponctuel'} onChange={e => setFd(p=>({...p, frequence:e.target.value}))} style={inS}><option value="ponctuel">Ponctuel</option><option value="hebdomadaire">Hebdomadaire</option><option value="mensuel">Mensuel</option><option value="trimestriel">Trimestriel</option><option value="annuel">Annuel</option></select></div>
                      <div><label style={lbS}>Jours/semaine (si applicable)</label><input type="number" value={fd.joursParSemaine||''} onChange={e => setFd(p=>({...p, joursParSemaine: e.target.value ? Number(e.target.value) : null}))} style={inS} placeholder="Ex: 2"/></div>
                    </div>
                    {fd.modeFact && <div style={{padding:8, background:$bgSub, borderRadius:crmRd, fontSize:'0.82rem', color:$textSec, marginBottom:12}}>{MODES_FACT[fd.modeFact]?.icon} <em>{MODES_FACT[fd.modeFact]?.desc}</em></div>}
                    {/* Statut */}
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:14}}>
                      <div><label style={lbS}>Statut</label><select value={fd.statut||'prospect'} onChange={e => setFd(p=>({...p, statut:e.target.value}))} style={inS}><option value="actif">● Actif</option><option value="en_veille">● En veille</option><option value="prospect">● Prospect</option><option value="termine">● Terminé</option></select></div>
                      <div><label style={lbS}>Date début</label><input type="date" value={fd.dateDebut||''} onChange={e => setFd(p=>({...p, dateDebut:e.target.value}))} style={inS}/></div>
                      <div><label style={lbS}>Évaluation (1-5)</label><input type="number" min={1} max={5} value={fd.evaluation||3} onChange={e => setFd(p=>({...p, evaluation:Number(e.target.value)}))} style={inS}/></div>
                      <div><label style={lbS}>Notes</label><input value={fd.notes||''} onChange={e => setFd(p=>({...p, notes:e.target.value}))} style={inS}/></div>
                    </div>
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={() => {
                        if (!fd.nom) return;
                        const entry = { ...fd, id: isEdit ? fd.id : 'P'+String(Date.now()).slice(-6) };
                        savePresta(entry, !isEdit);
                        setFactExtPrestaForm(null);
                      }} style={btnP}>{isEdit ? '💾 Enregistrer' : '➕ Ajouter'}</button>
                      <button onClick={() => setFactExtPrestaForm(null)} style={btnS}>Annuler</button>
                    </div>
                  </div>
                );
              })()}

              {/* Prestataires — Cards View */}
              {factExtView === 'cards' && (
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16}}>
                {fp.map(p => {
                  const tp = TYPES_PRESTA[p.type] || TYPES_PRESTA.freelance;
                  const cat = CATS_PRESTA[p.categorie] || CATS_PRESTA.autre;
                  const mode = MODES_FACT[p.modeFact] || {};
                  const pFact = factures.filter(f => f.prestaId === p.id);
                  const pTotal = pFact.reduce((s,f) => s + f.montantTTC, 0);
                  const statutColor = p.statut==='actif'?'#059669':p.statut==='en_veille'?'#d97706':p.statut==='prospect'?'#2563eb':'#6b7280';
                  const statutLabel = p.statut==='actif'?'Actif':p.statut==='en_veille'?'En veille':p.statut==='prospect'?'Prospect':'Terminé';
                  return (
                    <div key={p.id} style={{...cardS, opacity: p.statut==='termine' ? 0.5 : 1, cursor:'pointer'}} onClick={() => setFactExtPreview(p)}>
                      <div style={{height:4, background:`linear-gradient(90deg, ${cat.color}, ${cat.color}88)`}}></div>
                      <div style={{padding:'16px 18px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
                          <div>
                            <div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{p.nom}</div>
                            {p.raisonSociale && p.raisonSociale !== p.nom && <div style={{fontSize:'0.8rem', color:$textSec}}>{p.raisonSociale}</div>}
                            <div style={{fontSize:'0.82rem', color:cat.color, fontWeight:600, marginTop:2}}>{cat.icon} {p.specialite || cat.label}</div>
                          </div>
                          <div style={{display:'flex', flexDirection:'column', gap:4, alignItems:'flex-end'}}>
                            <span style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:crmRd, background:`${tp.color}15`, color:tp.color, fontWeight:700}}>{tp.icon} {tp.label}</span>
                            <span style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:4, background:`${statutColor}15`, color:statutColor, fontWeight:700, display:'inline-flex', alignItems:'center', gap:4}}><span style={{width:6, height:6, borderRadius:'50%', background:statutColor}}/>{statutLabel}</span>
                          </div>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, marginBottom:8, fontSize:'0.8rem', color:$textSec}}>
                          {p.contactEmail && <div>📧 {p.contactEmail}</div>}
                          {p.contactTel && <div>📞 {p.contactTel}</div>}
                          {p.ville && <div>📍 {p.ville} {p.cp}</div>}
                          {p.siret && <div>🏛️ {p.siret}</div>}
                        </div>
                        <div style={{padding:8, background:$bgSub, borderRadius:crmRd, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <div style={{fontSize:'0.82rem'}}>{mode.icon} <strong>{mode.label?.split(' (')[0]}</strong></div>
                          <div style={{fontWeight:700, color:'#1e40af'}}>
                            {p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : 'Sur devis'}
                            {p.joursParSemaine && <span style={{fontSize:'0.78rem', color:$textSec, fontWeight:400}}> · {p.joursParSemaine}j/sem</span>}
                          </div>
                        </div>
                        {/* Contrat badge */}
                        {(() => { const cc = p.contrat; const ccs = cc ? (CONTRAT_STATUTS[cc.statut] || CONTRAT_STATUTS.a_preparer) : CONTRAT_STATUTS.a_preparer; const cct = cc ? (CONTRAT_TYPES[cc.type] || CONTRAT_TYPES.prestation) : CONTRAT_TYPES.prestation; return (
                          <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8, cursor:'pointer'}} onClick={e => { e.stopPropagation(); setContratEdit({...(cc || {type:'prestation',statut:'a_preparer',dateDebut:'',dateFin:'',renouvellement:'tacite',ref:''})}); setContratView('edit'); setFactExtContratModal({...p}); }}>
                            <span style={{fontSize:'0.72rem', padding:'2px 8px', borderRadius:crmRd, background:ccs.bg, color:ccs.color, fontWeight:700}}>📜 {ccs.icon} {ccs.label}</span>
                            <span style={{fontSize:'0.68rem', color:$textMut}}>{cct.short || cct.label}{cc?.ref ? ' · '+cc.ref : ''}</span>
                          </div>
                        ); })()}
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:8, borderTop:`1px solid ${$border}`}} onClick={e => e.stopPropagation()}>
                          <div style={{display:'flex', gap:8, alignItems:'center'}}>
                            <span style={{fontSize:'0.85rem'}}>{Array.from({length:5}, (_,i) => i < p.evaluation ? '⭐' : '☆').join('')}</span>
                            <span style={{fontSize:'0.8rem', color:$textMut}}>{pFact.length} fact. · {fmt(pTotal)}</span>
                          </div>
                          <div style={{display:'flex', gap:4}}>
                            <button onClick={() => setFactExtPrestaForm({...p})} style={{padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.75rem', color:'#2563eb'}}>✏️</button>
                            <button onClick={() => { setFactExtFilter({...factExtFilter, prestaId:p.id}); setFactExtTab('factures'); }} style={{padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.75rem', color:'#059669'}}>🧾</button>
                            <button onClick={() => deletePresta(p.id)} style={{padding:'3px 8px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.75rem', color:'#dc2626'}}>🗑️</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

              {/* Prestataires — List View (colonnes redimensionnables) */}
              {factExtView === 'list' && (() => {
                const colHeaders = ['Prestataire','Spécialité','Type','Catégorie','Mode','Tarif','Rythme','⭐','Fact.','Total TTC','Statut','Contrat',''];
                const colAlign = ['left','left','left','left','left','right','left','left','right','right','left','left','left'];
                const startResize = (colIdx, e) => {
                  e.preventDefault(); e.stopPropagation();
                  const startX = e.clientX;
                  const startW = prestaColW[colIdx];
                  prestaResizeRef.current = { colIdx, startX, startW };
                  const onMove = (ev) => {
                    if (!prestaResizeRef.current) return;
                    const diff = ev.clientX - prestaResizeRef.current.startX;
                    const newW = Math.max(40, prestaResizeRef.current.startW + diff);
                    setPrestaColW(prev => prev.map((w,i) => i === prestaResizeRef.current.colIdx ? newW : w));
                  };
                  const onUp = () => { prestaResizeRef.current = null; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                  document.addEventListener('mousemove', onMove);
                  document.addEventListener('mouseup', onUp);
                };
                return (
                <div style={cardS}>
                  <div style={{overflowX:'auto'}}>
                    <table style={{borderCollapse:'collapse', fontSize:'0.92rem', tableLayout:'auto', width: prestaColW.reduce((s,w)=>s+w,0)}}>
                      <thead><tr style={{background:$bgSub}}>
                        {colHeaders.map((h,i) => (
                          <th key={i} style={{width: prestaColW[i], minWidth:40, padding:'10px 10px', textAlign: colAlign[i], fontWeight:600, color: prestaSort.col===i ? '#dc2626' : '#b0a08a', fontSize:'0.72rem', textTransform:'uppercase', borderBottom: prestaSort.col===i ? '2px solid #dc2626' : '2px solid #f0ebe3', borderRight: i < colHeaders.length-1 ? `1px solid ${$borderAlt}` : 'none', whiteSpace:'nowrap', position:'relative', userSelect:'none', cursor: i < 12 ? 'pointer' : 'default'}} onClick={() => i < 12 && toggleSort(i)}
                            onMouseOver={e => { const ar = e.currentTarget.querySelector('.sort-arrow'); if(ar) ar.style.opacity='1'; }}
                            onMouseOut={e => { const ar = e.currentTarget.querySelector('.sort-arrow'); if(ar && prestaSort.col !== i) ar.style.opacity='0'; }}>
                            {h}
                            {i < 12 && <span className="sort-arrow" style={{fontSize:'0.65rem', marginLeft:2, color: prestaSort.col===i ? '#dc2626' : '#b0a08a', opacity: prestaSort.col===i ? 1 : 0, transition:'opacity 0.15s'}}>{prestaSort.col===i ? (prestaSort.dir==='asc'?'▲':'▼') : '↕'}</span>}
                            {i < colHeaders.length - 1 && (
                              <div onMouseDown={(e) => startResize(i, e)} style={{position:'absolute', right:-1, top:0, bottom:0, width:6, cursor:'col-resize', background:'transparent', zIndex:2}} onMouseOver={e => {e.stopPropagation(); e.currentTarget.style.background='#dc262640';}} onMouseOut={e => e.currentTarget.style.background='transparent'} />
                            )}
                          </th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {fp.map((p, idx) => {
                          const tp = TYPES_PRESTA[p.type] || TYPES_PRESTA.freelance;
                          const cat = CATS_PRESTA[p.categorie] || CATS_PRESTA.autre;
                          const mode = MODES_FACT[p.modeFact] || {};
                          const pFact = factures.filter(f => f.prestaId === p.id);
                          const pTotal = pFact.reduce((s,f) => s + f.montantTTC, 0);
                          const statutColor = p.statut==='actif'?'#059669':p.statut==='en_veille'?'#d97706':p.statut==='prospect'?'#2563eb':'#6b7280';
                          const statutBg = p.statut==='actif'?'#f0fdf4':p.statut==='en_veille'?'#fffbeb':p.statut==='prospect'?'#eff6ff':'#f3f4f6';
                          const statutTxt = p.statut==='actif'?'Actif':p.statut==='en_veille'?'En veille':p.statut==='prospect'?'Prospect':'Terminé';
                          const bR = '1px solid #eee8e0';
                          return (
                            <tr key={p.id} style={{borderBottom:`1px solid ${$border}`, background: idx%2===0?$bgCard:$bgCard, opacity: p.statut==='termine'?0.5:1, cursor:'pointer'}} onClick={() => setFactExtPreview(p)}>
                              <td style={{padding:'10px 10px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', borderRight:bR}}>
                                <div style={{fontWeight:700, fontSize:'0.92rem', color:$text, overflow:'hidden', textOverflow:'ellipsis'}}>{p.nom}</div>
                                {p.raisonSociale && p.raisonSociale !== p.nom && <div style={{fontSize:'0.72rem', color:$textMut, overflow:'hidden', textOverflow:'ellipsis'}}>{p.raisonSociale}</div>}
                              </td>
                              <td style={{padding:'10px 10px', fontSize:'0.84rem', color:$textSec, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', borderRight:bR}}>{p.specialite}</td>
                              <td style={{padding:'10px 10px', overflow:'hidden', borderRight:bR}}><span style={{fontSize:'0.7rem', padding:'2px 6px', borderRadius:crmRd, background:`${tp.color}12`, color:tp.color, fontWeight:600, whiteSpace:'nowrap'}}>{tp.icon} {tp.label}</span></td>
                              <td style={{padding:'10px 10px', overflow:'hidden', borderRight:bR}}><span style={{fontSize:'0.7rem', padding:'2px 6px', borderRadius:crmRd, background:`${cat.color}12`, color:cat.color, fontWeight:600, whiteSpace:'nowrap'}}>{cat.icon} {cat.label}</span></td>
                              <td style={{padding:'10px 10px', fontSize:'0.84rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', borderRight:bR}}>{mode.icon} {mode.label?.split(' (')[0]}</td>
                              <td style={{padding:'10px 10px', textAlign:'right', fontWeight:700, color:'#1e40af', whiteSpace:'nowrap', borderRight:bR}}>{p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : '—'}</td>
                              <td style={{padding:'10px 10px', fontSize:'0.84rem', color:$textSec, whiteSpace:'nowrap', borderRight:bR}}>{p.joursParSemaine ? p.joursParSemaine+'j/sem' : p.frequence}</td>
                              <td style={{padding:'10px 10px', fontSize:'0.8rem', whiteSpace:'nowrap', borderRight:bR}}>{Array.from({length:5}, (_,i) => i < p.evaluation ? '⭐' : '☆').join('')}</td>
                              <td style={{padding:'10px 10px', textAlign:'right', fontWeight:600, borderRight:bR}}>{pFact.length}</td>
                              <td style={{padding:'10px 10px', textAlign:'right', fontWeight:700, color:'#1e40af', borderRight:bR}}>{fmt(pTotal)}</td>
                              <td style={{padding:'10px 10px', borderRight:bR}}><span style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:crmRd, background:statutBg, color:statutColor, fontWeight:700}}>{statutTxt}</span></td>
                              <td style={{padding:'6px 8px', borderRight:bR}} onClick={e => e.stopPropagation()}>
                                {(() => { const c = p.contrat; const cs = c ? (CONTRAT_STATUTS[c.statut] || CONTRAT_STATUTS.a_preparer) : CONTRAT_STATUTS.a_preparer; return (
                                  <div style={{display:'flex', alignItems:'center', gap:3}}>
                                    <span style={{fontSize:'0.65rem', padding:'2px 6px', borderRadius:crmRd, background:cs.bg, color:cs.color, fontWeight:700, whiteSpace:'nowrap', cursor:'pointer'}} onClick={() => { setContratEdit({...(p.contrat || {type:'prestation',statut:'a_preparer',dateDebut:'',dateFin:'',renouvellement:'tacite',ref:''})}); setContratView('edit'); setFactExtContratModal({...p}); }}>{cs.icon} {cs.label}</span>
                                    {(!c || !c.statut || c.statut === 'a_preparer') && <button onClick={() => { setContratEdit({...(p.contrat || {type:'prestation',statut:'a_preparer',dateDebut:'',dateFin:'',renouvellement:'tacite',ref:''})}); setContratView('edit'); setFactExtContratModal({...p}); }} style={{fontSize:'0.65rem', padding:'1px 4px', borderRadius:3, border:'1px solid #e0e7ff', background:$info+'12', color:'#4338ca', cursor:'pointer', fontWeight:700}} title="Préparer contrat">📝</button>}
                                  </div>
                                ); })()}
                              </td>
                              <td style={{padding:'6px 6px', whiteSpace:'nowrap'}} onClick={e => e.stopPropagation()}>
                                <button onClick={() => setFactExtPrestaForm({...p})} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.72rem', color:'#2563eb', marginRight:2}}>✏️</button>
                                <button onClick={() => { setFactExtFilter({...factExtFilter, prestaId:p.id}); setFactExtTab('factures'); }} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.72rem', color:'#059669', marginRight:2}}>🧾</button>
                                <button onClick={() => deletePresta(p.id)} style={{padding:'3px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.72rem', color:'#dc2626'}}>🗑️</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{padding:'8px 14px', borderTop:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:'0.75rem', color:$textMut}}>↔️ Glissez les bordures des colonnes pour redimensionner</span>
                    <button onClick={() => setPrestaColW([...defaultPrestaColW])} style={{fontSize:'0.72rem', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:'#dc2626', cursor:'pointer', fontWeight:600}}>↩ Reset colonnes</button>
                  </div>
                </div>
                );
              })()}
            </>); })()}
            </>)}

            {/* ── MEGA PREVIEW PANEL v2 — 6 Onglets Complets ── */}
            {factExtPreview && (() => {
              const p = factExtPreview;
              const tp = TYPES_PRESTA[p.type] || TYPES_PRESTA.freelance;
              const cat = CATS_PRESTA[p.categorie] || CATS_PRESTA.autre;
              const mode = MODES_FACT[p.modeFact] || {};
              const pFact = factures.filter(f => f.prestaId === p.id).sort((a,b) => (b.dateReception||'').localeCompare(a.dateReception||''));
              const pTotal = pFact.reduce((s,f) => s + f.montantTTC, 0);
              const comp = p.competences || [];
              const docs = p.documents || [];
              const missions = p.missions || [];
              const contratsRecus = p.contrats_recus || [];
              const c = p.contrat || { type:'prestation', statut:'a_preparer', dateDebut:'', dateFin:'', renouvellement:'tacite', ref:'' };
              const cs = CONTRAT_STATUTS[c.statut] || CONTRAT_STATUTS.a_preparer;
              const ct = CONTRAT_TYPES[c.type] || CONTRAT_TYPES.prestation;
              const evalD = p.evaluationDetail || {qualite:p.evaluation||3,reactivite:3,rapport_qp:3,communication:3};
              const initials = p.nom.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
              const allTaches = missions.flatMap(m => (m.taches||[]).map(t => ({...t, missionNom:m.nom, missionId:m.id})));
              const totalHeures = allTaches.reduce((s,t) => s+(t.heures||0), 0);
              const totalHeuresReelles = allTaches.reduce((s,t) => s+(t.heuresReelles||0), 0);
              const heuresTerminees = allTaches.filter(t => t.statut==='terminee').reduce((s,t) => s+(t.heures||0), 0);
              const totalBudget = missions.reduce((s,m) => s+(m.budget||0), 0);
              const totalConsomme = missions.reduce((s,m) => s+(m.consomme||0), 0);
              const tachesATemps = allTaches.filter(t => t.statut==='terminee' && t.dateFin && t.heuresReelles !== undefined).filter(t => (t.heuresReelles||0) <= (t.heures||999));
              const pctDelais = allTaches.filter(t=>t.statut==='terminee').length > 0 ? Math.round(tachesATemps.length / allTaches.filter(t=>t.statut==='terminee').length * 100) : 0;
              const scoreGlobal = Math.round(((evalD.qualite||0) + (evalD.reactivite||0) + (evalD.rapport_qp||0) + (evalD.communication||0)) / 4 * 20 + (pctDelais > 0 ? pctDelais * 0.3 : 0) + (totalBudget > 0 && totalConsomme <= totalBudget ? 20 : 0)) / 10;

              const tabDef = [
                {k:'fiche', label:'Fiche', icon:'📋'},
                {k:'documents', label:'Documents', icon:'📁', badge: docs.filter(d => d.dateExpiration && new Date(d.dateExpiration) < new Date()).length || null},
                {k:'contrats', label:'Contrats', icon:'📜'},
                {k:'factures', label:'Factures', icon:'🧾', badge: pFact.length || null},
                {k:'missions', label:'Missions', icon:'🎯'},
                {k:'synthese', label:'Synthèse', icon:'📊'}
              ];

              const sLabel = (s,n) => s <= 0 ? '☆'.repeat(n) : '⭐'.repeat(Math.min(s,n)) + '☆'.repeat(Math.max(0,n-s));
              const pctBar = (val,max,color) => (<div style={{display:'flex',alignItems:'center',gap:6}}><div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:max>0?Math.min(100,val/max*100)+'%':'0%',height:'100%',background:color,borderRadius:3}}/></div><span style={{fontSize:'0.75rem',fontWeight:600,color}}>{max>0?Math.round(val/max*100):0}%</span></div>);
              const saveP = (updated) => { savePresta(updated, false); setFactExtPreview(updated); };

              return (
                <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300}} onClick={() => setFactExtPreview(null)}>
                  <div style={{background:$bgCard, borderRadius:crmRd, width:'100%', maxWidth:980, height:'92vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.3)'}} onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div style={{background:`linear-gradient(135deg, ${cat.color}dd, ${cat.color}88)`, padding:'18px 24px', borderRadius:'20px 20px 0 0', display:'flex', alignItems:'center', gap:16}}>
                      <div style={{width:56, height:56, borderRadius:'50%', background:$bgCard, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'1.1rem', color:cat.color, flexShrink:0, boxShadow:'0 2px 8px rgba(0,0,0,0.15)', cursor:'pointer', position:'relative', overflow:'hidden'}} title="Avatar">{p.photo ? <img src={p.photo} style={{width:56,height:56,borderRadius:'50%',objectFit:'cover'}}/> : initials}</div>
                      <div style={{flex:1, color:'white'}}>
                        <div style={{fontSize:'1.15rem', fontWeight:800}}>{p.nom}</div>
                        {p.raisonSociale && p.raisonSociale !== p.nom && <div style={{fontSize:'0.82rem', opacity:0.85}}>{p.raisonSociale}</div>}
                        <div style={{fontSize:'0.84rem', opacity:0.9, marginTop:2}}>{cat.icon} {p.specialite || cat.label}</div>
                      </div>
                      <div style={{display:'flex', gap:6, alignItems:'center', flexShrink:0}}>
                        <span style={{padding:'4px 10px', borderRadius:crmRd, background:'rgba(255,255,255,0.2)', color:'white', fontWeight:700, fontSize:'0.78rem'}}>{tp.icon} {tp.label}</span>
                        <span style={{padding:'4px 10px', borderRadius:6, background:p.statut==='actif'?'rgba(34,197,94,0.14)':p.statut==='en_veille'?'rgba(212,160,48,0.18)':$bgSub, color:p.statut==='actif'?'#166534':p.statut==='en_veille'?'#92400e':'#6b7280', fontWeight:700, fontSize:'0.78rem', display:'inline-flex', alignItems:'center', gap:4}}><span style={{width:6, height:6, borderRadius:'50%', background:p.statut==='actif'?'#059669':p.statut==='en_veille'?'#d97706':p.statut==='prospect'?'#2563eb':'#6b7280'}}/>{p.statut==='actif'?'Actif':p.statut==='en_veille'?'En veille':p.statut==='prospect'?'Prospect':'Terminé'}</span>
                        <button onClick={() => setFactExtPreview(null)} style={{padding:'6px 10px', borderRadius:crmRd, border:'none', background:'rgba(255,255,255,0.25)', color:'white', fontWeight:700, cursor:'pointer', fontSize:'0.9rem'}}>✕</button>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div style={{display:'flex', borderBottom:`2px solid ${$border}`, background:$bgSub, flexShrink:0}}>
                      {tabDef.map(t => (
                        <button key={t.k} onClick={() => setPrestaDetailTab(t.k)} style={{flex:1, padding:'10px 6px', border:'none', borderBottom: prestaDetailTab===t.k ? `3px solid ${cat.color}` : '3px solid transparent', background:'transparent', fontWeight:prestaDetailTab===t.k?700:500, fontSize:'0.82rem', color:prestaDetailTab===t.k?cat.color:$textMut, cursor:'pointer', position:'relative'}}>
                          {t.icon} {t.label}
                          {t.badge && <span style={{position:'absolute', top:4, right:'20%', background:'#dc2626', color:'white', fontSize:'0.6rem', borderRadius:crmRd, padding:'1px 5px', fontWeight:700}}>{t.badge}</span>}
                        </button>
                      ))}
                    </div>

                    {/* Content */}
                    <div style={{flex:1, overflowY:'auto', padding:'20px 24px'}}>

                      {/* ═══ TAB 1: FICHE ═══ */}
                      {prestaDetailTab === 'fiche' && (<>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16}}>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:8}}>Coordonnées</div>
                            <div style={{fontSize:'0.9rem', lineHeight:2}}>
                              {p.contactNom && <div>👤 <strong>{p.contactNom}</strong></div>}
                              {p.contactEmail && <div>📧 <a href={'mailto:'+p.contactEmail} style={{color:cat.color}}>{p.contactEmail}</a></div>}
                              {p.contactTel && <div>📞 {p.contactTel}</div>}
                              {p.ville && <div>📍 {p.adresse ? p.adresse+', ' : ''}{p.cp} {p.ville}</div>}
                              {p.siret && <div>🏛️ SIRET: {p.siret}</div>}
                              {p.tvaIntra && <div>🇪🇺 TVA: {p.tvaIntra}</div>}
                              {p.linkedin && <div>💼 <a href={'https://'+p.linkedin} target="_blank" style={{color:cat.color}}>{p.linkedin}</a></div>}
                              {p.siteWeb && <div>🌐 <a href={'https://'+p.siteWeb} target="_blank" style={{color:cat.color}}>{p.siteWeb}</a></div>}
                            </div>
                            <div style={{marginTop:10, display:'flex', gap:6, flexWrap:'wrap'}}>
                              <input placeholder="LinkedIn URL..." value={p.linkedin||''} onChange={e => saveP({...p, linkedin:e.target.value})} style={{flex:1, padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem', minWidth:100}}/>
                              <input placeholder="Site web..." value={p.siteWeb||''} onChange={e => saveP({...p, siteWeb:e.target.value})} style={{flex:1, padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem', minWidth:100}}/>
                            </div>
                          </div>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:8}}>Facturation</div>
                            <div style={{fontSize:'0.9rem', lineHeight:2}}>
                              <div>{mode.icon} <strong>{mode.label}</strong></div>
                              <div>💶 {p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : 'Sur devis'}</div>
                              {p.joursParSemaine && <div>📅 {p.joursParSemaine}j/semaine</div>}
                              <div>📆 Depuis: {p.dateDebut || '—'}</div>
                              <div>🏢 {(p.filiales||[]).map(f => { const fi = filialesEnrichies.find(x => x.id===f); return fi ? fi.nom : f; }).join(', ')}</div>
                            </div>
                          </div>
                        </div>

                        {/* Évaluation détaillée */}
                        <div style={{padding:14, background:$bgSub, borderRadius:crmRd, marginBottom:16}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>Évaluation détaillée</div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
                            {[{k:'qualite',l:'Qualité',e:'🎯'},{k:'reactivite',l:'Réactivité',e:'⚡'},{k:'rapport_qp',l:'Rapport Q/P',e:'💰'},{k:'communication',l:'Communication',e:'💬'}].map(ev => (
                              <div key={ev.k} style={{textAlign:'center'}}>
                                <div style={{fontSize:'0.72rem', color:$textSec, marginBottom:4}}>{ev.e} {ev.l}</div>
                                <div style={{fontSize:'0.95rem', cursor:'pointer'}} onClick={() => {
                                  const nv = ((evalD[ev.k]||0) % 5) + 1;
                                  const newEval = {...evalD, [ev.k]: nv};
                                  saveP({...p, evaluationDetail: newEval, evaluation: Math.round((newEval.qualite+newEval.reactivite+newEval.rapport_qp+newEval.communication)/4)});
                                }}>{sLabel(evalD[ev.k]||0, 5)}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Compétences */}
                        <div style={{padding:14, background:$bgSub, borderRadius:crmRd, marginBottom:16}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>🏷️ Compétences & Expertises</div>
                          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:8}}>
                            {comp.map((c2,i) => (
                              <span key={i} style={{padding:'4px 10px', borderRadius:crmRd, background:`${cat.color}15`, color:cat.color, fontSize:'0.82rem', fontWeight:600, display:'flex', alignItems:'center', gap:4}}>
                                {c2}
                                <span style={{cursor:'pointer', opacity:0.5, fontSize:'0.75rem'}} onClick={() => { const nc = comp.filter((_,j)=>j!==i); saveP({...p, competences:nc}); }}>✕</span>
                              </span>
                            ))}
                            {comp.length === 0 && <span style={{fontSize:'0.82rem', color:$textMut, fontStyle:'italic'}}>Aucune compétence ajoutée</span>}
                          </div>
                          <div style={{display:'flex', gap:6}}>
                            <input value={prestaNewCompetence} onChange={e => setPrestaNewCompetence(e.target.value)} onKeyDown={e => { if(e.key==='Enter' && prestaNewCompetence.trim()) { saveP({...p, competences:[...comp, prestaNewCompetence.trim()]}); setPrestaNewCompetence(''); }}} placeholder="Ajouter (Entrée pour valider)..." style={{flex:1, padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem'}}/>
                            <button onClick={() => { if(prestaNewCompetence.trim()) { saveP({...p, competences:[...comp, prestaNewCompetence.trim()]}); setPrestaNewCompetence(''); }}} style={{padding:'6px 12px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>+</button>
                          </div>
                        </div>

                        {/* Bio / Notes */}
                        <div style={{padding:14, background:$accent+'15', borderRadius:crmRd}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:'#92400e', fontWeight:700, marginBottom:8}}>📝 Bio / Notes libres</div>
                          <textarea value={p.notes||''} onChange={e => saveP({...p, notes:e.target.value})} rows={4} style={{width:'100%', padding:10, borderRadius:crmRd, border:'1px solid #fde68a', fontSize:'0.88rem', background:$bgCard, resize:'vertical', boxSizing:'border-box', lineHeight:1.6}} placeholder="Notes, historique, informations complémentaires..."/>
                        </div>
                      </>)}

                      {/* ═══ TAB 2: DOCUMENTS ═══ */}
                      {prestaDetailTab === 'documents' && (<>
                        {/* Alertes en haut */}
                        {docs.filter(d => d.dateExpiration && new Date(d.dateExpiration) < new Date(Date.now() + 30*86400000)).length > 0 && (
                          <div style={{marginBottom:16, padding:12, background:$danger+'12', borderRadius:crmRd, border:'1px solid #fca5a5'}}>
                            <div style={{fontSize:'0.75rem', fontWeight:700, color:'#991b1b', marginBottom:6}}>⚠️ Alertes documents</div>
                            {docs.filter(d => d.dateExpiration && new Date(d.dateExpiration) < new Date(Date.now() + 30*86400000)).map(d => {
                              const isExpired = new Date(d.dateExpiration) < new Date();
                              return <div key={d.id} style={{fontSize:'0.82rem', color: isExpired ? '#dc2626' : '#d97706', marginBottom:2}}>{isExpired ? '▲' : '●'} {(DOC_TYPES[d.type]||DOC_TYPES.autre).label} — {isExpired ? 'Expiré le' : 'Expire le'} {d.dateExpiration}</div>;
                            })}
                          </div>
                        )}

                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                          {/* Documents reçus */}
                          <div>
                            <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#1e40af', fontWeight:700, marginBottom:10}}>📥 Documents reçus ({docs.filter(d => DOC_TYPES[d.type]?.category==='recu').length})</div>
                            {docs.filter(d => DOC_TYPES[d.type]?.category==='recu').map(d => {
                              const dt = DOC_TYPES[d.type] || DOC_TYPES.autre;
                              const isExpired = d.dateExpiration && new Date(d.dateExpiration) < new Date();
                              return (
                                <div key={d.id} style={{padding:10, borderRadius:crmRd, border: isExpired ? '1px solid #fca5a5' : `1px solid ${$borderAlt}`, background: isExpired ? 'rgba(239,68,68,0.10)' : $bgCard, marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                  <div>
                                    <div style={{fontSize:'0.88rem', fontWeight:600}}>{dt.icon} {d.nom || dt.label}</div>
                                    <div style={{fontSize:'0.72rem', color:$textSec}}>Ajouté: {d.dateAjout}{d.dateExpiration ? ` · Exp: ${d.dateExpiration}` : ''}</div>
                                  </div>
                                  <div style={{display:'flex', gap:4, alignItems:'center'}}>
                                    <span style={{fontSize:'0.65rem', padding:'2px 6px', borderRadius:crmRd, background: isExpired ? 'rgba(239,68,68,0.22)' : d.statut==='valide' ? 'rgba(34,197,94,0.14)' : $bgSub, color: isExpired ? '#991b1b' : d.statut==='valide' ? '#166534' : '#6b7280', fontWeight:700}}>{isExpired ? '⚠️ Expiré' : d.statut==='valide' ? '✅ Valide' : '📎 Reçu'}</span>
                                    <button onClick={() => saveP({...p, documents:docs.filter(x => x.id !== d.id)})} style={{padding:'2px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.65rem', color:'#dc2626'}}>🗑️</button>
                                  </div>
                                </div>
                              );
                            })}
                            {docs.filter(d => DOC_TYPES[d.type]?.category==='recu').length === 0 && <div style={{padding:20, textAlign:'center', color:$textMut, fontSize:'0.88rem', background:$bgSub, borderRadius:crmRd}}>Aucun document reçu</div>}
                          </div>
                          {/* Documents émis */}
                          <div>
                            <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#059669', fontWeight:700, marginBottom:10}}>📤 Documents émis ({docs.filter(d => DOC_TYPES[d.type]?.category==='emis').length})</div>
                            {docs.filter(d => DOC_TYPES[d.type]?.category==='emis').map(d => {
                              const dt = DOC_TYPES[d.type] || DOC_TYPES.autre;
                              return (
                                <div key={d.id} style={{padding:10, borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                  <div><div style={{fontSize:'0.88rem', fontWeight:600}}>{dt.icon} {d.nom || dt.label}</div><div style={{fontSize:'0.72rem', color:$textSec}}>Ajouté: {d.dateAjout}</div></div>
                                  <button onClick={() => saveP({...p, documents:docs.filter(x => x.id !== d.id)})} style={{padding:'2px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.65rem', color:'#dc2626'}}>🗑️</button>
                                </div>
                              );
                            })}
                            {docs.filter(d => DOC_TYPES[d.type]?.category==='emis').length === 0 && <div style={{padding:20, textAlign:'center', color:$textMut, fontSize:'0.88rem', background:$bgSub, borderRadius:crmRd}}>Aucun document émis</div>}
                          </div>
                        </div>

                        {/* Add document form */}
                        {!prestaNewDocForm && <div style={{marginTop:16, textAlign:'center'}}><button onClick={() => setPrestaNewDocForm({type:'cv',nom:'',dateAjout:new Date().toISOString().slice(0,10),dateExpiration:'',statut:'valide'})} style={{padding:'10px 20px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.88rem', cursor:'pointer'}}>+ Ajouter un document</button></div>}
                        {prestaNewDocForm && (
                          <div style={{marginTop:16, padding:16, background:$bgSub, borderRadius:crmRd, border:`1px solid ${$borderAlt}`}}>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:10}}>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Type</label>
                                <select value={prestaNewDocForm.type} onChange={e => setPrestaNewDocForm({...prestaNewDocForm, type:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem'}}>{Object.entries(DOC_TYPES).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}</select></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Nom fichier</label>
                                <input value={prestaNewDocForm.nom} onChange={e => setPrestaNewDocForm({...prestaNewDocForm, nom:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Expiration</label>
                                <input type="date" value={prestaNewDocForm.dateExpiration||''} onChange={e => setPrestaNewDocForm({...prestaNewDocForm, dateExpiration:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                            </div>
                            <div style={{display:'flex', gap:8}}>
                              <button onClick={() => { saveP({...p, documents:[...docs, {...prestaNewDocForm, id:'D'+Date.now()}]}); setPrestaNewDocForm(null); }} style={{padding:'8px 16px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.86rem', cursor:'pointer'}}>💾 Ajouter</button>
                              <button onClick={() => setPrestaNewDocForm(null)} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.86rem', cursor:'pointer'}}>Annuler</button>
                            </div>
                          </div>
                        )}

                        {/* Conformité obligatoire */}
                        <div style={{marginTop:16, padding:14, background:$bgSub, borderRadius:crmRd}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>📋 Conformité documents obligatoires</div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
                            {['urssaf','rc_pro','kbis','decennale','rib','cv'].map(dt => {
                              const d = docs.find(x => x.type === dt);
                              const dInfo = DOC_TYPES[dt];
                              const isOk = d && d.statut==='valide' && (!d.dateExpiration || new Date(d.dateExpiration) > new Date());
                              const isExpired = d && d.dateExpiration && new Date(d.dateExpiration) < new Date();
                              return (
                                <div key={dt} style={{padding:8, background:$bgCard, borderRadius:crmRd, border: isOk ? '1px solid #bbf7d0' : isExpired ? '1px solid #fecaca' : '1px solid #fed7aa', textAlign:'center'}}>
                                  <div style={{fontSize:'0.78rem', fontWeight:600}}>{dInfo.icon} {dInfo.label}</div>
                                  <div style={{fontSize:'0.68rem', color: isOk ? '#166534' : isExpired ? '#dc2626' : '#d97706', fontWeight:700, marginTop:2}}>{isOk ? '✅ Valide' : isExpired ? '▲ Expiré' : d ? '● À vérifier' : '❌ Manquant'}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>)}

                      {/* ═══ TAB 3: CONTRATS ═══ */}
                      {prestaDetailTab === 'contrats' && (<>
                        {/* Dashboard contrats mini */}
                        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, marginBottom:16}}>
                          <div style={{padding:12, borderRadius:crmRd, background: c.statut==='signe' ? 'rgba(34,197,94,0.10)' : c.statut==='expire' ? 'rgba(239,68,68,0.10)' : 'rgba(212,160,48,0.12)', textAlign:'center', border:`1px solid ${$borderAlt}`}}>
                            <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>Notre contrat</div>
                            <div style={{fontSize:'0.95rem', fontWeight:800, color: c.statut==='signe' ? '#059669' : c.statut==='expire' ? '#dc2626' : '#d97706', marginTop:2}}>{cs.icon} {cs.label}</div>
                          </div>
                          <div style={{padding:12, borderRadius:crmRd, background:$bgSub, textAlign:'center', border:`1px solid ${$borderAlt}`}}>
                            <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>Contrats reçus</div>
                            <div style={{fontSize:'0.95rem', fontWeight:800, color:$text, marginTop:2}}>{contratsRecus.length}</div>
                          </div>
                          <div style={{padding:12, borderRadius:crmRd, background: (c.dateFin && new Date(c.dateFin) < new Date(Date.now() + 60*86400000)) ? 'rgba(239,68,68,0.10)' : 'rgba(34,197,94,0.10)', textAlign:'center', border:`1px solid ${$borderAlt}`}}>
                            <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>Prochaine expiration</div>
                            <div style={{fontSize:'0.85rem', fontWeight:700, color: (c.dateFin && new Date(c.dateFin) < new Date(Date.now() + 60*86400000)) ? '#dc2626' : '#059669', marginTop:2}}>{c.dateFin || 'Indéterminée'}</div>
                          </div>
                        </div>

                        {/* Nos contrats */}
                        <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#1e40af', fontWeight:700, marginBottom:10}}>▸ Nos contrats (YILMAZ → {p.nom.split(' ')[0]})</div>
                        <div style={{padding:14, borderRadius:crmRd, border:'1px solid #dbeafe', background:'rgba(240,247,255,0.14)', marginBottom:16}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                            <div>
                              <div style={{fontWeight:700, fontSize:'0.98rem'}}>{ct.label}</div>
                              <div style={{fontSize:'0.8rem', color:$textSec}}>Réf: {c.ref || '—'} · {cs.icon} {cs.label}</div>
                            </div>
                            <button onClick={() => { setContratEdit({...c}); setContratView('edit'); setFactExtContratModal({...p}); }} style={{padding:'8px 14px', borderRadius:crmRd, border:'none', background:'#1e40af', color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>✏️ Gérer</button>
                            <span style={{fontSize:'0.72rem', padding:'4px 10px', borderRadius:crmRd, background: c.cgv ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)', color: c.cgv ? '#166534' : '#991b1b', fontWeight:600, border: c.cgv ? '1px solid #bbf7d0' : '1px solid #fecaca'}}>{c.cgv ? '📋 CGV ✅' : '📋 CGV ❌'}</span>
                          </div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, fontSize:'0.84rem'}}>
                            <div style={{padding:8, background:$bgCard, borderRadius:crmRd, textAlign:'center'}}><div style={{fontSize:'0.6rem', color:$textMut, fontWeight:600}}>DÉBUT</div><div style={{fontWeight:700}}>{c.dateDebut || '—'}</div></div>
                            <div style={{padding:8, background:$bgCard, borderRadius:crmRd, textAlign:'center'}}><div style={{fontSize:'0.6rem', color:$textMut, fontWeight:600}}>FIN</div><div style={{fontWeight:700, color: c.dateFin && new Date(c.dateFin) < new Date() ? '#dc2626' : '#2d2216'}}>{c.dateFin || 'Indéterminée'}</div></div>
                            <div style={{padding:8, background:$bgCard, borderRadius:crmRd, textAlign:'center'}}><div style={{fontSize:'0.6rem', color:$textMut, fontWeight:600}}>RENOUVELLEMENT</div><div style={{fontWeight:700}}>{c.renouvellement === 'tacite' ? '♻️ Tacite' : c.renouvellement === 'annuel' ? '📅 Annuel' : '🚫 Non'}</div></div>
                            <div style={{padding:8, background:cs.bg, borderRadius:crmRd, textAlign:'center'}}><div style={{fontSize:'0.6rem', color:$textMut, fontWeight:600}}>STATUT</div><div style={{fontWeight:700, color:cs.color}}>{cs.icon} {cs.label}</div></div>
                          </div>
                          <div style={{marginTop:8, padding:8, background:$bgCard, borderRadius:crmRd, display:'flex', alignItems:'center', gap:8}}>
                            <span style={{fontSize:'0.6rem', color:$textMut, fontWeight:600, textTransform:'uppercase'}}>💳 CONDITIONS PAIEMENT</span>
                            <span style={{fontSize:'0.82rem', fontWeight:700, color:$text}}>{(CONDITIONS_PAIEMENT[c.conditionsPaiement] || CONDITIONS_PAIEMENT['30_jours']).label}</span>
                          </div>
                          {c.cgv && (
                            <div style={{marginTop:8, padding:10, background:'rgba(255,251,245,0.14)', borderRadius:crmRd, border:'1px solid #e8dcc8'}}>
                              <div style={{fontSize:'0.65rem', fontWeight:700, color:$accent, textTransform:'uppercase', marginBottom:4}}>📋 CONDITIONS GÉNÉRALES</div>
                              <div style={{fontSize:'0.72rem', color:$textSec, whiteSpace:'pre-line', lineHeight:1.4, maxHeight:80, overflowY:'auto'}}>{c.cgv.split('\n').slice(0,4).join('\n')}{c.cgv.split('\n').length > 4 ? '\n…' : ''}</div>
                            </div>
                          )}
                          <div style={{marginTop:10, display:'flex', gap:6}}>
                            <button onClick={() => { setContratEdit({...c}); setContratView('preview'); setFactExtContratModal({...p}); }} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #dbeafe', background:$bgCard, color:'#1e40af', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>📄 Aperçu A4</button>
                          </div>
                        </div>

                        {/* Leurs contrats */}
                        <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:'#d97706', fontWeight:700, marginBottom:10}}>▸ Leurs contrats ({p.nom.split(' ')[0]} → YILMAZ)</div>
                        {contratsRecus.map(cr => (
                          <div key={cr.id} style={{padding:12, borderRadius:crmRd, border:'1px solid #fde68a', background:$warn+'12', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                              <div style={{fontWeight:700, fontSize:'0.92rem'}}>{cr.nom}</div>
                              <div style={{fontSize:'0.75rem', color:$textSec}}>Signé: {cr.dateSignature || '—'} · Exp: {cr.dateExpiration || '—'}</div>
                            </div>
                            <div style={{display:'flex', gap:4, alignItems:'center'}}>
                              <span style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:crmRd, background: cr.dateExpiration && new Date(cr.dateExpiration) < new Date() ? 'rgba(239,68,68,0.22)' : 'rgba(34,197,94,0.14)', color: cr.dateExpiration && new Date(cr.dateExpiration) < new Date() ? '#991b1b' : '#166534', fontWeight:700}}>{cr.dateExpiration && new Date(cr.dateExpiration) < new Date() ? '⚠️ Expiré' : '✅ Actif'}</span>
                              <button onClick={() => saveP({...p, contrats_recus:contratsRecus.filter(x=>x.id!==cr.id)})} style={{padding:'2px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.65rem', color:'#dc2626'}}>🗑️</button>
                            </div>
                          </div>
                        ))}
                        {contratsRecus.length === 0 && <div style={{padding:16, textAlign:'center', color:$textMut, fontSize:'0.88rem', background:$bgSub, borderRadius:crmRd, marginBottom:12}}>Aucun contrat reçu du prestataire</div>}
                        {!prestaNewContratRecuForm && <button onClick={() => setPrestaNewContratRecuForm({nom:'',dateSignature:'',dateExpiration:'',statut:'actif'})} style={{padding:'8px 16px', borderRadius:crmRd, border:'none', background:'#d97706', color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>+ Ajouter contrat reçu</button>}
                        {prestaNewContratRecuForm && (
                          <div style={{marginTop:8, padding:14, background:$warn+'12', borderRadius:crmRd, border:'1px solid #fde68a'}}>
                            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:8, marginBottom:8}}>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Nom document</label><input value={prestaNewContratRecuForm.nom} onChange={e => setPrestaNewContratRecuForm({...prestaNewContratRecuForm, nom:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:'1px solid #fde68a', fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Signature</label><input type="date" value={prestaNewContratRecuForm.dateSignature} onChange={e => setPrestaNewContratRecuForm({...prestaNewContratRecuForm, dateSignature:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:'1px solid #fde68a', fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Expiration</label><input type="date" value={prestaNewContratRecuForm.dateExpiration} onChange={e => setPrestaNewContratRecuForm({...prestaNewContratRecuForm, dateExpiration:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:'1px solid #fde68a', fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                            </div>
                            <div style={{display:'flex', gap:6}}>
                              <button onClick={() => { saveP({...p, contrats_recus:[...contratsRecus, {...prestaNewContratRecuForm, id:'CR'+Date.now()}]}); setPrestaNewContratRecuForm(null); }} style={{padding:'6px 14px', borderRadius:crmRd, border:'none', background:'#d97706', color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>💾</button>
                              <button onClick={() => setPrestaNewContratRecuForm(null)} style={{padding:'6px 14px', borderRadius:crmRd, border:'1px solid #fde68a', background:$bgCard, color:$textSec, fontSize:'0.82rem', cursor:'pointer'}}>Annuler</button>
                            </div>
                          </div>
                        )}
                      </>)}

                      {/* ═══ TAB 4: FACTURES (enrichi) ═══ */}
                      {prestaDetailTab === 'factures' && (<>
                        {/* Rapprochement contrat */}
                        {c.ref && pFact.length > 0 && (
                          <div style={{padding:12, borderRadius:crmRd, border:'1px solid #dbeafe', background:'rgba(240,247,255,0.14)', marginBottom:16}}>
                            <div style={{fontSize:'0.72rem', fontWeight:700, color:'#1e40af', textTransform:'uppercase', marginBottom:6}}>📊 Rapprochement Contrat ↔ Factures</div>
                            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, textAlign:'center'}}>
                              <div><div style={{fontSize:'0.65rem', color:$textMut}}>Contrat ref</div><div style={{fontWeight:700, fontSize:'0.92rem'}}>{c.ref}</div></div>
                              <div><div style={{fontSize:'0.65rem', color:$textMut}}>Total facturé TTC</div><div style={{fontWeight:700, fontSize:'0.92rem', color:'#1e40af'}}>{fmt(pTotal)}</div></div>
                              <div><div style={{fontSize:'0.65rem', color:$textMut}}>Budget contrat</div><div style={{fontWeight:700, fontSize:'0.92rem', color: totalBudget > 0 && pTotal > totalBudget ? '#dc2626' : '#059669'}}>{totalBudget > 0 ? fmt(totalBudget) : '—'}</div></div>
                            </div>
                          </div>
                        )}
                        <div style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:10}}>🧾 Factures ({pFact.length}) — Total TTC: <span style={{color:'#1e40af'}}>{fmt(pTotal)}</span></div>
                        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.88rem'}}>
                          <thead><tr style={{background:$bgSub}}>
                            {['Réf','Date','Objet','HT','TTC','Statut','Contrat'].map((h,i) => <th key={i} style={{position:'relative',padding:'8px 10px', textAlign:[3,4].includes(i)?'right':'left', fontWeight:600, color:$textMut, fontSize:'0.72rem', borderBottom:`2px solid ${$border}`, borderRight:i<6?`1px solid ${$borderAlt}`:'none'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                          </tr></thead>
                          <tbody>
                            {pFact.map(fa => {
                              const st = STATUTS_FACTEXT[fa.statut] || STATUTS_FACTEXT.reception;
                              return (<tr key={fa.id} style={{borderBottom:`1px solid ${$border}`}}>
                                <td style={{padding:'8px 10px', fontWeight:600, color:'#dc2626', borderRight:'1px solid #eee8e0'}}>{fa.ref}</td>
                                <td style={{padding:'8px 10px', color:$textSec, borderRight:'1px solid #eee8e0'}}>{fa.dateReception}</td>
                                <td style={{padding:'8px 10px', color:$textSec, borderRight:'1px solid #eee8e0'}}>{fa.objet}</td>
                                <td style={{padding:'8px 10px', textAlign:'right', fontWeight:600, borderRight:'1px solid #eee8e0'}}>{fa.montantHT.toLocaleString('fr-FR')} €</td>
                                <td style={{padding:'8px 10px', textAlign:'right', fontWeight:700, borderRight:'1px solid #eee8e0'}}>{fa.montantTTC.toLocaleString('fr-FR')} €</td>
                                <td style={{padding:'8px 10px', borderRight:'1px solid #eee8e0'}}><span style={{fontSize:'0.7rem', padding:'2px 6px', borderRadius:crmRd, background:st.bg, color:st.color, fontWeight:600}}>{st.label}</span></td>
                                <td style={{padding:'8px 10px', fontSize:'0.72rem', color:'#1e40af'}}>{c.ref || '—'}</td>
                              </tr>);
                            })}
                            {pFact.length === 0 && <tr><td colSpan={7} style={{padding:20, textAlign:'center', color:$textMut}}>Aucune facture</td></tr>}
                          </tbody>
                        </table>
                      </>)}

                      {/* ═══ TAB 5: MISSIONS & TÂCHES (complet) ═══ */}
                      {prestaDetailTab === 'missions' && (<>
                        {/* View toggle */}
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
                          <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:$textMut, fontWeight:700}}>🎯 Missions ({missions.length}) · Tâches ({allTaches.length}) · {totalHeuresReelles}h réelles / {totalHeures}h prévues</div>
                          <div style={{display:'flex', gap:4}}>
                            {[{k:'list',l:'📋 Liste'},{k:'kanban',l:'📌 Kanban'},{k:'gantt',l:'📊 Gantt'}].map(v => (
                              <button key={v.k} onClick={() => setMissionViewMode(v.k)} style={{padding:'4px 10px', borderRadius:crmRd, border: missionViewMode===v.k ? `2px solid ${cat.color}` : `1px solid ${$borderAlt}`, background: missionViewMode===v.k ? `${cat.color}10` : $bgCard, color: missionViewMode===v.k ? cat.color : '#6b5d4d', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>{v.l}</button>
                            ))}
                          </div>
                        </div>

                        {/* LIST VIEW */}
                        {missionViewMode === 'list' && missions.map(m => {
                          const ms = MISSION_STATUTS[m.statut] || MISSION_STATUTS.en_attente;
                          const mTaches = m.taches || [];
                          const mDone = mTaches.filter(t => t.statut==='terminee').length;
                          const mBudgetPct = m.budget > 0 ? Math.round(m.consomme/m.budget*100) : 0;
                          return (
                            <div key={m.id} style={{marginBottom:16, borderRadius:crmRd, border:`1px solid ${$borderAlt}`, overflow:'hidden'}}>
                              <div style={{padding:'12px 16px', background:$bgSub, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{flex:1}}>
                                  <div style={{fontWeight:700, fontSize:'0.98rem'}}>{m.nom}</div>
                                  <div style={{fontSize:'0.75rem', color:$textSec}}>{m.description}</div>
                                  <div style={{fontSize:'0.7rem', color:$textMut, marginTop:2}}>📅 {(m.dateDebut||'').slice(0,10)} → {(m.dateFinPrevue||'').slice(0,10)}{m.dateFinReelle ? ` (réel: ${m.dateFinReelle})` : ''} · 🏢 {(filialesEnrichies.find(f=>f.id===m.filiale)||{}).nom || m.filiale}</div>
                                </div>
                                <div style={{display:'flex', gap:6, alignItems:'center'}}>
                                  <select value={m.statut} onChange={e => { const nm = missions.map(x => x.id===m.id ? {...x, statut:e.target.value} : x); saveP({...p, missions:nm}); }} style={{padding:'4px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.76rem', fontWeight:600, background:ms.bg, color:ms.color}}>
                                    {Object.entries(MISSION_STATUTS).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                                  </select>
                                  <button onClick={() => saveP({...p, missions:missions.filter(x=>x.id!==m.id)})} style={{padding:'4px 6px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.7rem', color:'#dc2626'}}>🗑️</button>
                                </div>
                              </div>
                              <div style={{padding:'8px 16px', background:$bgCard, borderBottom:`1px solid ${$border}`}}>
                                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.63rem', color:$textSec, marginBottom:4}}>
                                  <span>Budget: {(m.consomme||0).toLocaleString('fr-FR')} € / {(m.budget||0).toLocaleString('fr-FR')} €</span>
                                  <span>Tâches: {mDone}/{mTaches.length}</span>
                                </div>
                                {pctBar(m.consomme||0, m.budget||0, mBudgetPct > 100 ? '#dc2626' : mBudgetPct > 80 ? '#d97706' : '#059669')}
                              </div>
                              <div style={{padding:'8px 16px'}}>
                                {mTaches.map(t => {
                                  const ts = TACHE_STATUTS[t.statut] || TACHE_STATUTS.a_faire;
                                  const pr = TACHE_PRIORITES[t.priorite] || TACHE_PRIORITES.moyenne;
                                  const isExpanded = expandedTache === t.id;
                                  return (
                                    <div key={t.id} style={{borderBottom:`1px solid ${$border}`}}>
                                      <div style={{display:'flex', alignItems:'center', gap:8, padding:'6px 0', cursor:'pointer'}} onClick={() => setExpandedTache(isExpanded ? null : t.id)}>
                                        <span style={{fontSize:'0.8rem'}}>{pr.icon}</span>
                                        <div style={{flex:1}}>
                                          <div style={{fontSize:'0.88rem', fontWeight:600, textDecoration: t.statut==='terminee' ? 'line-through' : 'none', color: t.statut==='terminee' ? '#b0a08a' : '#2d2216'}}>{t.titre} <span style={{fontSize:'0.65rem', color:$textMut}}>{isExpanded ? '▼' : '▶'}</span></div>
                                          <div style={{fontSize:'0.65rem', color:$textMut}}>{(t.dateDebut||'').slice(0,10)} → {(t.dateFin||'').slice(0,10)} · {t.heures||0}h prévues · {t.heuresReelles||0}h réelles</div>
                                        </div>
                                        <select value={t.statut} onChange={e => { e.stopPropagation(); const nt = mTaches.map(x => x.id===t.id ? {...x, statut:e.target.value} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); }} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.68rem', fontWeight:600, background:ts.bg, color:ts.color}}>
                                          {Object.entries(TACHE_STATUTS).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                                        </select>
                                      </div>
                                      {/* Expanded: description + heures réelles + commentaires */}
                                      {isExpanded && (
                                        <div style={{padding:'8px 0 12px 24px', fontSize:'0.84rem'}}>
                                          {t.description && <div style={{padding:8, background:$bgSub, borderRadius:crmRd, marginBottom:8, color:$textSec}}>{t.description}</div>}
                                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:8}}>
                                            <div><label style={{display:'block', fontSize:'0.65rem', fontWeight:600, color:$textMut}}>Heures prévues</label><input type="number" value={t.heures||0} onChange={e => { const nt = mTaches.map(x => x.id===t.id ? {...x, heures:Number(e.target.value)} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); }} style={{width:'100%', padding:'4px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', boxSizing:'border-box'}}/></div>
                                            <div><label style={{display:'block', fontSize:'0.65rem', fontWeight:600, color:$textMut}}>Heures réelles</label><input type="number" value={t.heuresReelles||0} onChange={e => { const nt = mTaches.map(x => x.id===t.id ? {...x, heuresReelles:Number(e.target.value)} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); }} style={{width:'100%', padding:'4px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', boxSizing:'border-box'}}/></div>
                                            <div><label style={{display:'block', fontSize:'0.65rem', fontWeight:600, color:$textMut}}>Priorité</label><select value={t.priorite} onChange={e => { const nt = mTaches.map(x => x.id===t.id ? {...x, priorite:e.target.value} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); }} style={{width:'100%', padding:'4px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem'}}>{Object.entries(TACHE_PRIORITES).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}</select></div>
                                          </div>
                                          {/* Commentaires */}
                                          <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:4}}>💬 Commentaires ({(t.commentaires||[]).length})</div>
                                          {(t.commentaires||[]).map((cm,ci) => (
                                            <div key={ci} style={{padding:6, background:'rgba(248,246,242,0.14)', borderRadius:crmRd, marginBottom:4, fontSize:'0.8rem'}}>
                                              <span style={{fontWeight:700, color:cat.color}}>{cm.auteur}</span> <span style={{color:$textMut, fontSize:'0.68rem'}}>{cm.date}</span>
                                              <div style={{color:$text, marginTop:2}}>{cm.texte}</div>
                                            </div>
                                          ))}
                                          <div style={{display:'flex', gap:4, marginTop:4}}>
                                            <input value={expandedTache === t.id ? newComment : ''} onChange={e => setNewComment(e.target.value)} placeholder="Ajouter un commentaire..." style={{flex:1, padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem'}} onKeyDown={e => { if(e.key==='Enter' && newComment.trim()) { const nc = [...(t.commentaires||[]), {auteur:'Moi', date:new Date().toISOString().slice(0,10), texte:newComment.trim()}]; const nt = mTaches.map(x => x.id===t.id ? {...x, commentaires:nc} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); setNewComment(''); }}}/>
                                            <button onClick={() => { if(newComment.trim()) { const nc = [...(t.commentaires||[]), {auteur:'Moi', date:new Date().toISOString().slice(0,10), texte:newComment.trim()}]; const nt = mTaches.map(x => x.id===t.id ? {...x, commentaires:nc} : x); const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); setNewComment(''); }}} style={{padding:'5px 10px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.75rem', cursor:'pointer'}}>📤</button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                                {/* Add tache */}
                                {prestaNewTacheForm && prestaNewTacheForm.missionId === m.id ? (
                                  <div style={{marginTop:8, padding:10, background:$bgSub, borderRadius:crmRd}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:6, marginBottom:6}}>
                                      <input value={prestaNewTacheForm.titre||''} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, titre:e.target.value})} placeholder="Titre tâche" style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem'}}/>
                                      <input value={prestaNewTacheForm.description||''} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, description:e.target.value})} placeholder="Description" style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem'}}/>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 80px 80px', gap:6, marginBottom:6}}>
                                      <input type="datetime-local" value={prestaNewTacheForm.dateDebut||''} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, dateDebut:e.target.value})} style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem'}}/>
                                      <input type="datetime-local" value={prestaNewTacheForm.dateFin||''} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, dateFin:e.target.value})} style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem'}}/>
                                      <input type="number" value={prestaNewTacheForm.heures||''} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, heures:Number(e.target.value)})} placeholder="H. prév" style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem'}}/>
                                      <select value={prestaNewTacheForm.priorite||'moyenne'} onChange={e => setPrestaNewTacheForm({...prestaNewTacheForm, priorite:e.target.value})} style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.78rem'}}>{Object.entries(TACHE_PRIORITES).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
                                    </div>
                                    <div style={{display:'flex', gap:6}}>
                                      <button onClick={() => { const nt = [...mTaches, {...prestaNewTacheForm, id:'T'+Date.now(), statut:'a_faire', heuresReelles:0, commentaires:[]}]; const nm = missions.map(x => x.id===m.id ? {...x, taches:nt} : x); saveP({...p, missions:nm}); setPrestaNewTacheForm(null); }} style={{padding:'5px 12px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.8rem', cursor:'pointer'}}>💾</button>
                                      <button onClick={() => setPrestaNewTacheForm(null)} style={{padding:'5px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, fontSize:'0.8rem', cursor:'pointer'}}>✕</button>
                                    </div>
                                  </div>
                                ) : (
                                  <button onClick={() => setPrestaNewTacheForm({missionId:m.id, titre:'', description:'', dateDebut:'', dateFin:'', heures:0, priorite:'moyenne'})} style={{marginTop:6, padding:'4px 10px', borderRadius:crmRd, border:'1px dashed #d4d0c8', background:'transparent', color:$textMut, fontSize:'0.76rem', cursor:'pointer', width:'100%'}}>+ Tâche</button>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* KANBAN VIEW — Drag & Drop */}
                        {missionViewMode === 'kanban' && (
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, minHeight:300}}>
                            {Object.entries(TACHE_STATUTS).map(([sk, sv]) => (
                              <div key={sk} style={{background:$bgSub, borderRadius:crmRd, padding:10, transition:'background 0.2s'}}
                                onDragOver={e => { e.preventDefault(); e.currentTarget.style.background='#f0ebe3'; }}
                                onDragLeave={e => { e.currentTarget.style.background=$bgSub; }}
                                onDrop={e => { e.preventDefault(); e.currentTarget.style.background=$bgSub; try { const d = JSON.parse(e.dataTransfer.getData('text/plain')); if(d.tacheId && d.missionId) { const nm = missions.map(m => m.id===d.missionId ? {...m, taches:(m.taches||[]).map(t => t.id===d.tacheId ? {...t, statut:sk} : t)} : m); saveP({...p, missions:nm}); } } catch(err){} }}>
                                <div style={{fontSize:'0.75rem', fontWeight:700, color:sv.color, textTransform:'uppercase', marginBottom:8, textAlign:'center', padding:'4px 0', background:sv.bg, borderRadius:crmRd}}>{sv.icon} {sv.label} ({allTaches.filter(t=>t.statut===sk).length})</div>
                                {allTaches.filter(t => t.statut === sk).map(t => {
                                  const pr = TACHE_PRIORITES[t.priorite] || TACHE_PRIORITES.moyenne;
                                  return (
                                    <div key={t.id} draggable="true"
                                      onDragStart={e => { e.dataTransfer.setData('text/plain', JSON.stringify({tacheId:t.id, missionId:t.missionId})); e.dataTransfer.effectAllowed='move'; e.currentTarget.style.opacity='0.4'; }}
                                      onDragEnd={e => { e.currentTarget.style.opacity='1'; }}
                                      style={{padding:8, background:$bgCard, borderRadius:crmRd, marginBottom:6, border:'1px solid '+sv.color+'33', boxShadow:'0 1px 3px rgba(0,0,0,0.04)', cursor:'grab', userSelect:'none'}}>
                                      <div style={{fontSize:'0.82rem', fontWeight:600, marginBottom:3}}>{pr.icon} {t.titre}</div>
                                      <div style={{fontSize:'0.65rem', color:$textMut}}>{t.missionNom}</div>
                                      <div style={{fontSize:'0.65rem', color:$textSec, marginTop:2}}>{t.heures||0}h prév · {t.heuresReelles||0}h réel</div>
                                      <div style={{fontSize:'0.6rem', color:$textMut, marginTop:3, fontStyle:'italic'}}>✋ Glisser-déposer pour changer le statut</div>
                                    </div>
                                  );
                                })}
                                {allTaches.filter(t => t.statut === sk).length === 0 && <div style={{padding:16, textAlign:'center', fontSize:'0.75rem', color:'#ccc4b8', fontStyle:'italic', border:'2px dashed #e8e4de', borderRadius:crmRd}}>Déposer ici</div>}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* GANTT VIEW */}
                        {missionViewMode === 'gantt' && (() => {
                          const allDates = allTaches.flatMap(t => [(t.dateDebut||'').slice(0,10), (t.dateFin||'').slice(0,10)]).filter(Boolean).sort();
                          const minD = allDates[0] || '2025-01-01';
                          const maxD = allDates[allDates.length-1] || '2026-12-31';
                          const dayMs = 86400000;
                          const minMs = new Date(minD).getTime();
                          const rangeMs = Math.max(dayMs, new Date(maxD).getTime() - minMs);
                          const months = [];
                          const d0 = new Date(minD); d0.setDate(1);
                          while(d0.getTime() <= new Date(maxD).getTime()) { months.push(new Date(d0)); d0.setMonth(d0.getMonth()+1); }
                          return (
                            <div style={{overflowX:'auto'}}>
                              {/* Month headers */}
                              <div style={{display:'flex', marginBottom:4, position:'relative', height:18}}>
                                {months.map((mo,i) => {
                                  const moStart = Math.max(0, (mo.getTime() - minMs) / rangeMs * 100);
                                  const moEnd = new Date(mo.getFullYear(), mo.getMonth()+1, 0);
                                  const moWidth = Math.min(100 - moStart, (moEnd.getTime() - Math.max(mo.getTime(), minMs)) / rangeMs * 100);
                                  return <div key={i} style={{position:'absolute', left:moStart+'%', width:Math.max(1, moWidth)+'%', fontSize:'0.6rem', fontWeight:600, color:$textMut, textAlign:'center', borderRight:`1px solid ${$border}`, padding:'2px 0'}}>{mo.toLocaleDateString('fr-FR',{month:'short',year:'2-digit'})}</div>;
                                })}
                              </div>
                              {/* Bars */}
                              {missions.map(m => (
                                <div key={m.id}>
                                  <div style={{fontSize:'0.7rem', fontWeight:700, color:$text, padding:'4px 0'}}>{m.nom}</div>
                                  {(m.taches||[]).map(t => {
                                    const ts2 = TACHE_STATUTS[t.statut] || TACHE_STATUTS.a_faire;
                                    const tStart = (t.dateDebut||'').slice(0,10);
                                    const tEnd = (t.dateFin||'').slice(0,10);
                                    if(!tStart || !tEnd) return null;
                                    const left = Math.max(0, (new Date(tStart).getTime() - minMs) / rangeMs * 100);
                                    const width = Math.max(1, (new Date(tEnd).getTime() - new Date(tStart).getTime()) / rangeMs * 100);
                                    return (
                                      <div key={t.id} style={{position:'relative', height:20, marginBottom:2}}>
                                        <div style={{position:'absolute', left:left+'%', width:width+'%', height:16, background:ts2.color+'88', borderRadius:crmRd, display:'flex', alignItems:'center', paddingLeft:4, overflow:'hidden'}}>
                                          <span style={{fontSize:'0.6rem', fontWeight:600, color:'white', whiteSpace:'nowrap', textShadow:'0 0 2px rgba(0,0,0,0.3)'}}>{t.titre}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          );
                        })()}

                        {/* Add mission */}
                        {!prestaNewMissionForm && <button onClick={() => setPrestaNewMissionForm({nom:'',filiale:(p.filiales||['yilmaz'])[0],description:'',dateDebut:new Date().toISOString().slice(0,10),dateFinPrevue:'',budget:0})} style={{padding:'10px 20px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.88rem', cursor:'pointer', marginTop:12}}>+ Nouvelle mission</button>}
                        {prestaNewMissionForm && (
                          <div style={{marginTop:12, padding:16, background:$bgSub, borderRadius:crmRd, border:`1px solid ${$borderAlt}`}}>
                            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:10, marginBottom:10}}>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Nom mission</label><input value={prestaNewMissionForm.nom||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, nom:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Filiale</label><select value={prestaNewMissionForm.filiale||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, filiale:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem'}}>{filialesEnrichies.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}</select></div>
                            </div>
                            <div style={{marginBottom:10}}><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Description</label><input value={prestaNewMissionForm.description||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, description:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:10}}>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Début</label><input type="date" value={prestaNewMissionForm.dateDebut||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, dateDebut:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Fin prévue</label><input type="date" value={prestaNewMissionForm.dateFinPrevue||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, dateFinPrevue:e.target.value})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                              <div><label style={{display:'block', fontSize:'0.7rem', fontWeight:700, color:$textMut, marginBottom:2}}>Budget €</label><input type="number" value={prestaNewMissionForm.budget||''} onChange={e => setPrestaNewMissionForm({...prestaNewMissionForm, budget:Number(e.target.value)})} style={{width:'100%', padding:'6px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.86rem', boxSizing:'border-box'}}/></div>
                            </div>
                            <div style={{display:'flex', gap:6}}>
                              <button onClick={() => { const nm = [...missions, {...prestaNewMissionForm, id:'M'+Date.now(), consomme:0, statut:'en_attente', taches:[], dateFinReelle:null}]; saveP({...p, missions:nm}); setPrestaNewMissionForm(null); }} style={{padding:'8px 16px', borderRadius:crmRd, border:'none', background:cat.color, color:'white', fontWeight:700, fontSize:'0.86rem', cursor:'pointer'}}>💾 Créer</button>
                              <button onClick={() => setPrestaNewMissionForm(null)} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, fontSize:'0.86rem', cursor:'pointer'}}>Annuler</button>
                            </div>
                          </div>
                        )}
                      </>)}

                      {/* ═══ TAB 6: SYNTHÈSE (complet) ═══ */}
                      {prestaDetailTab === 'synthese' && (<>
                                    {/* KPI Cards */}
                        <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10, marginBottom:18}}>
                          {[
                            {label:'Total facturé', value:fmt(pTotal), icon:'💰', color:'#1e40af', grad:'linear-gradient(135deg,#1e40af,#60a5fa)'},
                            {label:'Budget missions', value:fmt(totalBudget), icon:'💶', color:'#7c3aed', grad:'linear-gradient(135deg,#7c3aed,#a78bfa)'},
                            {label:'Heures réelles', value:totalHeuresReelles+'h / '+totalHeures+'h', icon:'⏱️', color:'#059669', grad:'linear-gradient(135deg,#059669,#34d399)'},
                            {label:'Respect délais', value:pctDelais+'%', icon:'📅', color: pctDelais >= 80 ? '#059669' : pctDelais >= 50 ? '#d97706' : '#dc2626', grad: pctDelais >= 80 ? 'linear-gradient(135deg,#059669,#34d399)' : pctDelais >= 50 ? 'linear-gradient(135deg,#d97706,#fbbf24)' : 'linear-gradient(135deg,#dc2626,#f87171)'},
                            {label:'Score global', value:(scoreGlobal||0).toFixed(1)+'/10', icon:'🏆', color: scoreGlobal >= 7 ? '#059669' : scoreGlobal >= 5 ? '#d97706' : '#dc2626', grad: scoreGlobal >= 7 ? 'linear-gradient(135deg,#059669,#34d399)' : scoreGlobal >= 5 ? 'linear-gradient(135deg,#d97706,#fbbf24)' : 'linear-gradient(135deg,#dc2626,#f87171)'}
                          ].map((kpi,i) => (
                            <div key={i} style={{borderRadius:crmRd, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                              <div style={{background:kpi.grad, padding:'12px 10px', color:'white', textAlign:'center'}}>
                                <div style={{fontSize:'1.1rem', marginBottom:2}}>{kpi.icon}</div>
                                <div style={{fontSize:'1rem', fontWeight:900}}>{kpi.value}</div>
                              </div>
                              <div style={{background:$bgSub, padding:'4px 8px', textAlign:'center', fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>{kpi.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Budget + Heures bars */}
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16}}>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:8}}>Budget consommé</div>
                            {pctBar(totalConsomme, totalBudget, totalBudget > 0 && totalConsomme/totalBudget > 1 ? '#dc2626' : '#059669')}
                            <div style={{fontSize:'0.8rem', color:$textSec, marginTop:4}}>{fmt(totalConsomme)} / {fmt(totalBudget)} — Reste: <strong style={{color: totalBudget-totalConsomme < 0 ? '#dc2626' : '#059669'}}>{fmt(totalBudget-totalConsomme)}</strong></div>
                          </div>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:8}}>Heures prévues vs réelles</div>
                            {pctBar(totalHeuresReelles, totalHeures, totalHeuresReelles > totalHeures ? '#dc2626' : '#059669')}
                            <div style={{fontSize:'0.8rem', color:$textSec, marginTop:4}}>{totalHeuresReelles}h réelles / {totalHeures}h prévues — {allTaches.filter(t=>t.statut==='terminee').length}/{allTaches.length} tâches terminées</div>
                          </div>
                        </div>

                        {/* Coût ventilé par mois */}
                        <div style={{padding:14, background:$bgSub, borderRadius:crmRd, marginBottom:16}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>📊 Ventilation factures par mois</div>
                          {(() => {
                            const byMonth = {};
                            pFact.forEach(f => { const m = (f.dateReception||'').slice(0,7); if(m) byMonth[m] = (byMonth[m]||0) + f.montantTTC; });
                            const months2 = Object.entries(byMonth).sort((a,b)=>a[0].localeCompare(b[0]));
                            const maxM = Math.max(1, ...months2.map(([,v])=>v));
                            if(months2.length===0) return <div style={{textAlign:'center', color:$textMut, fontSize:'0.82rem'}}>Aucune donnée</div>;
                            return (
                              <div style={{display:'flex', alignItems:'flex-end', gap:4, height:80}}>
                                {months2.map(([m,v]) => (
                                  <div key={m} style={{flex:1, textAlign:'center'}}>
                                    <div style={{height:Math.max(4, v/maxM*60), background:`linear-gradient(180deg, ${cat.color}, ${cat.color}66)`, borderRadius:'4px 4px 0 0', margin:'0 auto', width:'80%'}}/>
                                    <div style={{fontSize:'0.58rem', color:$textMut, marginTop:2}}>{m.slice(5)}/{m.slice(2,4)}</div>
                                    <div style={{fontSize:'0.6rem', fontWeight:700, color:cat.color}}>{Math.round(v/1000)}k</div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Évaluation + Score */}
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16}}>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>Évaluation détaillée</div>
                            {[{k:'qualite',l:'Qualité',e:'🎯'},{k:'reactivite',l:'Réactivité',e:'⚡'},{k:'rapport_qp',l:'Rapport Q/P',e:'💰'},{k:'communication',l:'Communication',e:'💬'}].map(ev => (
                              <div key={ev.k} style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                                <span style={{fontSize:'0.78rem', color:$textSec}}>{ev.e} {ev.l}</span>
                                <span>{sLabel(evalD[ev.k]||0, 5)}</span>
                              </div>
                            ))}
                            <div style={{borderTop:`1px solid ${$borderAlt}`, paddingTop:6, marginTop:6, textAlign:'center', fontSize:'0.9rem'}}>Moyenne: <strong>{sLabel(p.evaluation||0, 5)}</strong></div>
                          </div>
                          <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>Score global composé</div>
                            <div style={{textAlign:'center', marginBottom:8}}>
                              <div style={{fontSize:'2.2rem', fontWeight:900, color: scoreGlobal >= 7 ? '#059669' : scoreGlobal >= 5 ? '#d97706' : '#dc2626'}}>{(scoreGlobal||0).toFixed(1)}</div>
                              <div style={{fontSize:'0.75rem', color:$textMut}}>/10</div>
                            </div>
                            <div style={{fontSize:'0.7rem', color:$textSec, lineHeight:1.8}}>
                              🎯 Qualité: {evalD.qualite||0}/5<br/>
                              📅 Respect délais: {pctDelais}%<br/>
                              💰 Budget respecté: {totalBudget > 0 && totalConsomme <= totalBudget ? '✅ Oui' : totalBudget > 0 ? '❌ Dépassé' : '—'}
                            </div>
                          </div>
                        </div>

                        {/* Conformité */}
                        <div style={{padding:14, background:$bgSub, borderRadius:crmRd, marginBottom:16}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>📋 Conformité documents</div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6}}>
                            {['urssaf','rc_pro','kbis','decennale'].map(dt => {
                              const d = docs.find(x => x.type === dt);
                              const dInfo = DOC_TYPES[dt];
                              const isOk = d && d.statut==='valide' && (!d.dateExpiration || new Date(d.dateExpiration) > new Date());
                              return (
                                <div key={dt} style={{padding:8, background:$bgCard, borderRadius:crmRd, border: isOk ? '1px solid #bbf7d0' : '1px solid #fecaca', textAlign:'center'}}>
                                  <div style={{fontSize:'0.75rem', fontWeight:600}}>{dInfo.icon}</div>
                                  <div style={{fontSize:'0.6rem', color: isOk ? '#166534' : '#dc2626', fontWeight:700}}>{isOk ? '✅' : d ? '⚠️' : '❌'} {dInfo.label}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div style={{padding:14, background:$bgSub, borderRadius:crmRd}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:$textMut, fontWeight:700, marginBottom:10}}>📅 Historique relation</div>
                          <div style={{borderLeft:`2px solid ${$borderAlt}`, paddingLeft:16}}>
                            {p.dateDebut && <div style={{marginBottom:10, position:'relative'}}><div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'#059669'}}></div><div style={{fontSize:'0.82rem', fontWeight:700}}>▸ Début collaboration</div><div style={{fontSize:'0.7rem', color:$textMut}}>{p.dateDebut}</div></div>}
                            {c.ref && <div style={{marginBottom:10, position:'relative'}}><div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'#1e40af'}}></div><div style={{fontSize:'0.82rem', fontWeight:700}}>📜 Contrat {c.ref}</div><div style={{fontSize:'0.7rem', color:$textMut}}>{c.dateDebut} — {cs.icon} {cs.label}</div></div>}
                            {missions.map(m => <div key={m.id} style={{marginBottom:10, position:'relative'}}><div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'#7c3aed'}}></div><div style={{fontSize:'0.82rem', fontWeight:700}}>📋 {m.nom}</div><div style={{fontSize:'0.7rem', color:$textMut}}>{(m.dateDebut||'').slice(0,10)} — {(MISSION_STATUTS[m.statut]||{}).icon} {(MISSION_STATUTS[m.statut]||{}).label}</div></div>)}
                            {pFact.slice(0,5).map(fa => <div key={fa.id} style={{marginBottom:10, position:'relative'}}><div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'#d97706'}}></div><div style={{fontSize:'0.82rem', fontWeight:700}}>🧾 {fa.ref} — {fa.montantTTC.toLocaleString('fr-FR')} €</div><div style={{fontSize:'0.7rem', color:$textMut}}>{fa.dateReception}</div></div>)}
                          </div>
                        </div>
                      </>)}

                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── REJET FACTURE MODAL ── */}
            {rejetModal && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:400}} onClick={() => setRejetModal(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, width:480, padding:0, borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                  <div style={{background:'linear-gradient(135deg, #991b1b, #dc2626)', padding:'16px 24px', borderRadius:'16px 16px 0 0', color:'white'}}>
                    <div style={{fontSize:'1rem', fontWeight:800}}>❌ Rejet de facture</div>
                    <div style={{fontSize:'0.82rem', opacity:0.85}}>Veuillez indiquer le motif du rejet</div>
                  </div>
                  <div style={{padding:24}}>
                    <div style={{fontSize:'0.78rem', fontWeight:700, color:'#991b1b', marginBottom:4}}>Facture: {(() => { const f = factures.find(x => x.id === rejetModal.factureId); return f ? f.ref + ' — ' + (f.prestaNom||'') + ' — ' + f.montantTTC?.toLocaleString('fr-FR') + ' € TTC' : rejetModal.factureId; })()}</div>
                    <div style={{marginTop:12}}>
                      <label style={{display:'block', fontSize:'0.75rem', fontWeight:700, color:$textSec, marginBottom:4}}>Motif du rejet *</label>
                      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:8}}>
                        {['Montant incorrect','Doublon','Prestation non conforme','Pièces justificatives manquantes','Erreur de TVA','Hors contrat'].map(m => (
                          <button key={m} onClick={() => setRejetModal(prev => ({...prev, motif: prev.motif ? prev.motif + ' — ' + m : m}))} style={{padding:'4px 10px', borderRadius:crmRd, border:'1px solid #fecaca', background: rejetModal.motif?.includes(m) ? 'rgba(239,68,68,0.10)' : $bgCard, color:'#991b1b', fontSize:'0.76rem', fontWeight:600, cursor:'pointer'}}>{m}</button>
                        ))}
                      </div>
                      <textarea value={rejetModal.motif||''} onChange={e => setRejetModal(prev => ({...prev, motif:e.target.value}))} placeholder="Décrivez le motif du rejet en détail..." rows={3} style={{width:'100%', padding:10, borderRadius:crmRd, border:'1px solid #fecaca', fontSize:'0.88rem', resize:'vertical', boxSizing:'border-box', lineHeight:1.6}}/>
                    </div>
                    <div style={{display:'flex', gap:8, marginTop:16, justifyContent:'flex-end'}}>
                      <button onClick={() => setRejetModal(null)} style={{padding:'8px 18px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.88rem', cursor:'pointer'}}>Annuler</button>
                      <button onClick={confirmRejet} disabled={!rejetModal.motif?.trim()} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background: rejetModal.motif?.trim() ? '#dc2626' : $border, color:'white', fontWeight:700, fontSize:'0.88rem', cursor: rejetModal.motif?.trim() ? 'pointer' : 'not-allowed', opacity: rejetModal.motif?.trim() ? 1 : 0.5}}>❌ Confirmer le rejet</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── CONTRAT MODAL — Préparation & Gestion ── */}
            {factExtContratModal && (() => {
              const p = factExtContratModal;
              const c = p.contrat || { type:'prestation', statut:'a_preparer', dateDebut:'', dateFin:'', renouvellement:'tacite', ref:'' };
              const cs = CONTRAT_STATUTS[c.statut] || CONTRAT_STATUTS.a_preparer;
              const ct = CONTRAT_TYPES[c.type] || CONTRAT_TYPES.prestation;
              const cat = CATS_PRESTA[p.categorie] || CATS_PRESTA.autre;
              const mode = MODES_FACT[p.modeFact] || {};
              const tp = TYPES_PRESTA[p.type] || TYPES_PRESTA.freelance;
              const cedit = contratEdit;
              const generateRef = () => 'CTR-'+new Date().getFullYear()+'-'+String(Date.now()).slice(-4);
              const saveContrat = () => {
                const updated = { ...p, contrat: { ...cedit, ref: cedit.ref || generateRef() } };
                savePresta(updated, false);
                setFactExtContratModal(null);
              };

              const printContrat = () => {
                const ref = cedit.ref || generateRef();
                const today = new Date().toLocaleDateString('fr-FR');
                const dd = cedit.dateDebut ? new Date(cedit.dateDebut).toLocaleDateString('fr-FR') : '________________';
                const df = cedit.dateFin ? new Date(cedit.dateFin).toLocaleDateString('fr-FR') : '';
                const duree = df ? 'de'+'́terminee, fin le <strong>'+df+'</strong>' : 'inde'+'́terminee';
                const renouv = cedit.renouvellement === 'tacite' ? 'Tacite reconduction, pre'+'́avis 3 mois.' : cedit.renouvellement === 'annuel' ? 'Renouvellement annuel sur accord.' : 'Sans renouvellement.';
                const tarif = p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : 'Selon devis';
                const rythme = p.joursParSemaine ? ' — '+p.joursParSemaine+'j/semaine' : '';
                const tvaText = p.type === 'auto_entrepreneur' ? 'Non applicable, art. 293 B du CGI' : '20%';
                const oblig = p.categorie === 'btp_sous_traitant' ? ', de'+'́cennale' : '';
                const w = window.open('', '_blank', 'width=800,height=1100');
                const html = [
                  '<!DOCTYPE html><html><head><title>Contrat</title><style>',
                  '@page{size:A4;margin:25mm 20mm}body{font-family:Segoe UI,Arial,sans-serif;font-size:11pt;color:#2d2216;line-height:1.6;padding:40px}',
                  '.hdr{text-align:center;border-bottom:3px solid #2d2216;padding-bottom:20px;margin-bottom:30px}',
                  '.hdr h1{font-size:18pt;margin:0 0 5px;text-transform:uppercase;letter-spacing:2px}.hdr .ref{font-size:9pt;color:#888}',
                  '.pts{display:flex;gap:40px;margin-bottom:30px}.pt{flex:1;padding:15px;border:1px solid #e0d8c8;border-radius:8px;background:#faf8f5}',
                  '.pt h3{margin:0 0 8px;font-size:10pt;color:#b0a08a;text-transform:uppercase}.pt p{margin:3px 0;font-size:10pt}.pt .nm{font-size:12pt;font-weight:700}',
                  'h2{font-size:12pt;border-bottom:1px solid #e0d8c8;padding-bottom:6px;margin-top:25px}.art p{text-align:justify;font-size:10pt}',
                  '.sigs{display:flex;gap:40px;margin-top:50px;padding-top:20px;border-top:2px solid #2d2216}',
                  '.sb{flex:1;text-align:center}.sb .lb{font-size:9pt;color:#888;text-transform:uppercase;margin-bottom:60px}',
                  '.sb .ln{border-bottom:1px solid #2d2216;height:60px;margin-bottom:8px}.sb .hn{font-size:8pt;color:#aaa}',
                  '.ft{margin-top:40px;text-align:center;font-size:8pt;color:#aaa;border-top:1px solid #e0d8c8;padding-top:10px}',
                  '@media print{body{padding:0}}</style></head><body>',
                  '<div class="hdr"><h1>'+ct.label+'</h1><div class="ref">Re'+'́f. '+ref+' — E'+'́tabli le '+today+'</div></div>',
                  '<div class="pts"><div class="pt"><h3>Le Donneur d\'ordre</h3><p class="nm">YILMAZ SAS</p><p>Zone Artisanale, 67190 Mutzig</p><p>SIRET : XXX XXX XXX 00000</p><p>Repre'+'́sente'+'́ par : Ozdogan YILMAZ, Ge'+'́rant</p></div>',
                  '<div class="pt"><h3>Le Prestataire</h3><p class="nm">'+(p.raisonSociale||p.nom)+'</p><p>'+(p.adresse?p.adresse+', ':'')+p.cp+' '+p.ville+'</p><p>SIRET : '+(p.siret||'—')+'</p><p>Repre'+'́sente'+'́ par : '+(p.contactNom||p.nom)+'</p></div></div>',
                  '<h2>Article 1 — Objet</h2><div class="art"><p>Le Prestataire fournit : <strong>'+(p.specialite||cat.label)+'</strong>.</p></div>',
                  '<h2>Article 2 — Dure'+'́e</h2><div class="art"><p>Effet le <strong>'+dd+'</strong>, dure'+'́e '+duree+'.</p><p>Renouvellement : <strong>'+renouv+'</strong></p></div>',
                  '<h2>Article 3 — Conditions financières</h2><div class="art"><p>Mode : <strong>'+(mode.label||'—')+'</strong></p><p>Tarif : <strong>'+tarif+'</strong>'+rythme+'</p><p>TVA : '+tvaText+'</p><p>Paiement : <strong>'+(CONDITIONS_PAIEMENT[cedit.conditionsPaiement] || CONDITIONS_PAIEMENT['30_jours']).label+'</strong>.</p></div>',
                  '<h2>Article 4 — Obligations</h2><div class="art"><p>Diligence, de'+'́lais, attestations (URSSAF, RC Pro'+oblig+'), confidentialite'+'́.</p></div>',
                  '<h2>Article 5 — Re'+'́siliation</h2><div class="art"><p>Pre'+'́avis 30 jours par LRAR. Imme'+'́diate si manquement grave.</p></div>',
                  '<h2>Article 6 — Droit applicable</h2><div class="art"><p>Droit franc'+'̧ais. TC Strasbourg compe'+'́tent.</p></div>',
                  cedit.cgv ? '<div style="margin-top:24px;padding-top:16px;border-top:2px solid #e0d8c8;"><h2 style="font-size:11pt;color:#8B6F47;">Conditions Générales</h2><div class="art" style="white-space:pre-line;font-size:8.5pt;line-height:1.5;">'+cedit.cgv.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div></div>' : '',
                  '<div class="sigs"><div class="sb"><div class="lb">Le Donneur d\'ordre</div><div class="ln"></div><div class="hn">Ozdogan YILMAZ — YILMAZ SAS<br/>Fait à Mutzig, le ___/___/______</div></div>',
                  '<div class="sb"><div class="lb">Le Prestataire</div><div class="ln"></div><div class="hn">'+(p.contactNom||p.nom)+' — '+(p.raisonSociale||p.nom)+'<br/>Fait à '+(p.ville||'________')+', le ___/___/______</div></div></div>',
                  '<div class="ft">'+ct.label+' — Re'+'́f. '+ref+' — YILMAZ SAS, Mutzig, France</div>',
                  '</body></html>'
                ].join('\n');
                w.document.write(html);
                w.document.close();
                setTimeout(() => w.print(), 400);
              };

              return (
                <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:400}} onClick={() => setFactExtContratModal(null)}>
                  <div style={{background:$bgCard, borderRadius:crmRd, width:'100%', maxWidth:740, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 80px rgba(0,0,0,0.25)'}} onClick={e => e.stopPropagation()}>
                    <div style={{background:'linear-gradient(135deg, #1e293b, #334155)', color:'white', padding:'18px 24px', borderRadius:'20px 20px 0 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div>
                        <div style={{fontSize:'1.05rem', fontWeight:800}}>📜 Contrat — {p.nom}</div>
                        <div style={{fontSize:'0.8rem', opacity:0.7, marginTop:2}}>{ct.label} · {cat.icon} {p.specialite || cat.label}</div>
                      </div>
                      <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <span style={{padding:'4px 10px', borderRadius:crmRd, background:cs.bg, color:cs.color, fontWeight:700, fontSize:'0.8rem'}}>{cs.icon} {cs.label}</span>
                        <button onClick={() => setFactExtContratModal(null)} style={{padding:'6px 10px', borderRadius:crmRd, border:'none', background:'rgba(255,255,255,0.2)', color:'white', fontWeight:700, cursor:'pointer'}}>✕</button>
                      </div>
                    </div>
                    <div style={{display:'flex', borderBottom:`1px solid ${$border}`}}>
                      {[{k:'edit',label:'✏️ Détails & Édition'},{k:'preview',label:'📄 Aperçu A4'}].map(t => (
                        <button key={t.k} onClick={() => setContratView(t.k)} style={{flex:1, padding:'10px', border:'none', borderBottom: contratView===t.k ? '2px solid #1e293b' : '2px solid transparent', background: contratView===t.k ? $bgSub : $bgCard, fontWeight:700, fontSize:'0.88rem', color: contratView===t.k ? '#1e293b' : '#b0a08a', cursor:'pointer'}}>{t.label}</button>
                      ))}
                    </div>
                    <div style={{padding:'20px 24px'}}>
                      {contratView === 'edit' && (<>
                        <div style={{display:'flex', gap:4, marginBottom:16, flexWrap:'wrap'}}>
                          {Object.entries(CONTRAT_STATUTS).map(([k,v]) => (
                            <button key={k} onClick={() => setContratEdit(prev => ({...prev, statut:k}))} style={{padding:'5px 10px', borderRadius:crmRd, border: cedit.statut===k ? '2px solid '+v.color : `1px solid ${$border}`, background: cedit.statut===k ? v.bg : $bgCard, color: cedit.statut===k ? v.color : '#6b5d4d', fontWeight: cedit.statut===k ? 700 : 500, fontSize:'0.82rem', cursor:'pointer'}}>{v.icon} {v.label}</button>
                          ))}
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginBottom:14}}>
                          <div><label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>Type de contrat</label>
                            <select value={cedit.type} onChange={e => setContratEdit(prev => ({...prev, type:e.target.value}))} style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard}}>{Object.entries(CONTRAT_TYPES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
                          <div><label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>Référence</label>
                            <input value={cedit.ref||''} onChange={e => setContratEdit(prev => ({...prev, ref:e.target.value}))} placeholder="Auto si vide" style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard, boxSizing:'border-box'}}/></div>
                          <div><label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>Renouvellement</label>
                            <select value={cedit.renouvellement||'tacite'} onChange={e => setContratEdit(prev => ({...prev, renouvellement:e.target.value}))} style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard}}>
                              <option value="tacite">Tacite reconduction</option><option value="annuel">Annuel</option><option value="non">Sans renouvellement</option></select></div>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16}}>
                          <div><label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>Date début</label>
                            <input type="date" value={cedit.dateDebut||''} onChange={e => setContratEdit(prev => ({...prev, dateDebut:e.target.value}))} style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard, boxSizing:'border-box'}}/></div>
                          <div><label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>Date fin (optionnel)</label>
                            <input type="date" value={cedit.dateFin||''} onChange={e => setContratEdit(prev => ({...prev, dateFin:e.target.value}))} style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard, boxSizing:'border-box'}}/></div>
                        </div>
                        <div style={{marginBottom:14}}>
                          <label style={{display:'block', fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:3}}>💳 Conditions de paiement</label>
                          <select value={cedit.conditionsPaiement||'30_jours'} onChange={e => setContratEdit(prev => ({...prev, conditionsPaiement:e.target.value}))} style={{width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', background:$bgCard}}>
                            <option value="immediat">Paiement immédiat (à réception)</option>
                            <option value="15_jours">15 jours net</option>
                            <option value="30_jours">30 jours net (défaut)</option>
                            <option value="30_jours_fin_mois">30 jours fin de mois</option>
                            <option value="45_jours">45 jours fin de mois</option>
                            <option value="60_jours">60 jours net</option>
                            <option value="sur_validation">Sur validation du livrable</option>
                            <option value="echeancier">Échéancier (détail dans le contrat)</option>
                          </select>
                        </div>
                        {/* CGV — Conditions Générales */}
                        <div style={{marginBottom:14, padding:12, background:'rgba(255,251,245,0.14)', borderRadius:crmRd, border:`1px solid ${$border}`}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                            <div style={{fontSize:'0.7rem', fontWeight:700, color:$accent, textTransform:'uppercase'}}>📋 Conditions Générales (CGV)</div>
                            <div style={{display:'flex', gap:6}}>
                              {!showCGVEditor && <button onClick={() => { if(!cedit.cgv) { setContratEdit(prev => ({...prev, cgv: CGV_DEFAULTS[prev.type] || CGV_DEFAULTS._default})); } setShowCGVEditor(true); }} style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$accent, fontWeight:600, cursor:'pointer'}}>{cedit.cgv ? '✏️ Modifier' : '➕ Ajouter CGV'}</button>}
                              {showCGVEditor && <button onClick={() => setShowCGVEditor(false)} style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, fontWeight:600, cursor:'pointer'}}>▲ Réduire</button>}
                            </div>
                          </div>
                          {cedit.cgv && !showCGVEditor && <div style={{fontSize:'0.75rem', color:$textSec, lineHeight:1.4}}>{cedit.cgv.split('\n').slice(0,3).join(' ').slice(0,120)}… <span style={{color:$accent, cursor:'pointer', fontWeight:600}} onClick={() => setShowCGVEditor(true)}>voir tout</span></div>}
                          {!cedit.cgv && !showCGVEditor && <div style={{fontSize:'0.75rem', color:$textMut, fontStyle:'italic'}}>Aucune CGV — cliquez "Ajouter CGV" pour charger les conditions par défaut</div>}
                          {showCGVEditor && (<>
                            <div style={{display:'flex', gap:6, marginBottom:8, flexWrap:'wrap'}}>
                              <button onClick={() => setContratEdit(prev => ({...prev, cgv: CGV_DEFAULTS[prev.type] || CGV_DEFAULTS._default}))} style={{fontSize:'0.68rem', padding:'3px 8px', borderRadius:crmRd, border:'1px solid #d4c5a9', background:$bgSub, color:$accent, cursor:'pointer', fontWeight:600}}>🔄 Recharger défaut ({(CONTRAT_TYPES[cedit.type]||{}).short || 'Standard'})</button>
                              <button onClick={() => setContratEdit(prev => ({...prev, cgv: CGV_DEFAULTS.prestation}))} style={{fontSize:'0.68rem', padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, cursor:'pointer'}}>Prestation</button>
                              <button onClick={() => setContratEdit(prev => ({...prev, cgv: CGV_DEFAULTS.sous_traitance}))} style={{fontSize:'0.68rem', padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, cursor:'pointer'}}>Sous-traitance</button>
                              <button onClick={() => setContratEdit(prev => ({...prev, cgv: CGV_DEFAULTS.lettre_mission}))} style={{fontSize:'0.68rem', padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, cursor:'pointer'}}>Lettre mission</button>
                            </div>
                            <textarea value={cedit.cgv||''} onChange={e => setContratEdit(prev => ({...prev, cgv:e.target.value}))} rows={10} style={{width:'100%', padding:10, borderRadius:crmRd, border:'1px solid #d4c5a9', fontSize:'0.78rem', lineHeight:1.6, resize:'vertical', boxSizing:'border-box', fontFamily:'inherit', background:$bgCard}} placeholder="Saisissez ou modifiez les conditions générales..."/>
                            <div style={{fontSize:'0.65rem', color:$textMut, marginTop:4}}>💡 Ces conditions seront ajoutées à la fin du contrat A4. Personnalisez librement selon le prestataire.</div>
                          </>)}
                        </div>
                        <div style={{padding:12, background:$bgSub, borderRadius:crmRd, border:'1px solid #e2e8f0', marginBottom:16}}>
                          <div style={{fontSize:'0.7rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:6}}>Récapitulatif prestataire</div>
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, fontSize:'0.86rem'}}>
                            <div>{'👤'} <strong>{p.nom}</strong> ({tp.label})</div>
                            <div>{cat.icon} {p.specialite}</div>
                            <div>{'💶'} {mode.icon} {p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : 'Sur devis'}</div>
                            <div>{'📍'} {p.ville} {p.cp}</div>
                            {p.siret && <div>{'🏛️'} {p.siret}</div>}
                            {p.contactEmail && <div>{'📧'} {p.contactEmail}</div>}
                          </div>
                        </div>
                        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                          <button onClick={saveContrat} style={{padding:'10px 20px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #1e293b, #334155)', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>💾 Enregistrer</button>
                          <button onClick={() => setContratView('preview')} style={{padding:'10px 18px', borderRadius:crmRd, border:'1px solid #e2e8f0', background:$bgCard, color:$text, fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>📄 Aperçu A4</button>
                          <button onClick={printContrat} style={{padding:'10px 18px', borderRadius:crmRd, border:'1px solid #e2e8f0', background:$bgCard, color:'#059669', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>🖨️ Imprimer / PDF</button>
                        </div>
                      </>)}
                      {contratView === 'preview' && (<>
                        <div style={{background:$bgCard, border:'1px solid #d4d0c8', borderRadius:crmRd, padding:'45px 40px', maxWidth:580, margin:'0 auto', boxShadow:'0 2px 20px rgba(0,0,0,0.08)', fontSize:'9.5pt', lineHeight:1.65, fontFamily:'Georgia, serif', color:$text}}>
                          <div style={{textAlign:'center', borderBottom:'3px solid #2d2216', paddingBottom:14, marginBottom:22}}>
                            <div style={{fontSize:'15pt', fontWeight:700, textTransform:'uppercase', letterSpacing:2, marginBottom:4}}>{ct.label}</div>
                            <div style={{fontSize:'7.5pt', color:$textMut}}>Réf. {cedit.ref || generateRef()} — {new Date().toLocaleDateString('fr-FR')}</div>
                          </div>
                          <div style={{display:'flex', gap:16, marginBottom:20}}>
                            <div style={{flex:1, padding:10, border:'1px solid #e0d8c8', borderRadius:crmRd, background:$bgSub}}>
                              <div style={{fontSize:'7.5pt', color:$textMut, textTransform:'uppercase', fontWeight:700, marginBottom:4}}>Donneur d'ordre</div>
                              <div style={{fontWeight:700, fontSize:'10pt'}}>YILMAZ SAS</div>
                              <div style={{fontSize:'8.5pt'}}>Zone Artisanale, 67190 Mutzig</div>
                              <div style={{fontSize:'8.5pt'}}>Ozdogan YILMAZ, Gérant</div>
                            </div>
                            <div style={{flex:1, padding:10, border:'1px solid #e0d8c8', borderRadius:crmRd, background:$bgSub}}>
                              <div style={{fontSize:'7.5pt', color:$textMut, textTransform:'uppercase', fontWeight:700, marginBottom:4}}>Prestataire</div>
                              <div style={{fontWeight:700, fontSize:'10pt'}}>{p.raisonSociale || p.nom}</div>
                              <div style={{fontSize:'8.5pt'}}>{p.adresse ? p.adresse+', ' : ''}{p.cp} {p.ville}</div>
                              <div style={{fontSize:'8.5pt'}}>SIRET : {p.siret || '—'}</div>
                              <div style={{fontSize:'8.5pt'}}>{p.contactNom || p.nom}</div>
                            </div>
                          </div>
                          <div style={{fontWeight:700, fontSize:'10pt', borderBottom:'1px solid #e0d8c8', paddingBottom:3, marginBottom:6, marginTop:18}}>Article 1 — Objet</div>
                          <p style={{textAlign:'justify', margin:'0 0 8px'}}>Services : <strong>{p.specialite || cat.label}</strong>.</p>
                          <div style={{fontWeight:700, fontSize:'10pt', borderBottom:'1px solid #e0d8c8', paddingBottom:3, marginBottom:6, marginTop:18}}>Article 2 — Durée</div>
                          <p style={{margin:'0 0 8px'}}>Du <strong>{cedit.dateDebut ? new Date(cedit.dateDebut).toLocaleDateString('fr-FR') : '___/___/______'}</strong> {cedit.dateFin ? 'au '+new Date(cedit.dateFin).toLocaleDateString('fr-FR') : '— indéterminée'}. {cedit.renouvellement === 'tacite' ? 'Tacite reconduction.' : cedit.renouvellement === 'annuel' ? 'Annuel.' : 'Sans renouvellement.'}</p>
                          <div style={{fontWeight:700, fontSize:'10pt', borderBottom:'1px solid #e0d8c8', paddingBottom:3, marginBottom:6, marginTop:18}}>Article 3 — Conditions financières</div>
                          <p style={{margin:'0 0 8px'}}>{mode.label} — <strong>{p.tarifBase > 0 ? p.tarifBase.toLocaleString('fr-FR')+' '+p.tarifUnite : 'Sur devis'}</strong>{p.joursParSemaine ? ' · '+p.joursParSemaine+'j/sem' : ''}. Paiement : <strong>{(CONDITIONS_PAIEMENT[cedit.conditionsPaiement] || CONDITIONS_PAIEMENT['30_jours']).label}</strong>.</p>
                          <div style={{fontWeight:700, fontSize:'10pt', borderBottom:'1px solid #e0d8c8', paddingBottom:3, marginBottom:6, marginTop:18}}>Articles 4-6</div>
                          <p style={{fontSize:'8.5pt', color:$textSec, margin:'0 0 8px'}}>Diligence, confidentialité, attestations obligatoires. Préavis 30j. Droit français, TC Strasbourg.</p>
                          {cedit.cgv && (<>
                            <div style={{fontWeight:700, fontSize:'10pt', borderBottom:'1px solid #d4c5a9', paddingBottom:3, marginBottom:6, marginTop:18, color:$accent}}>Conditions Générales</div>
                            <div style={{fontSize:'7.5pt', color:$textSec, whiteSpace:'pre-line', lineHeight:1.5, maxHeight:120, overflowY:'auto', padding:'4px 0'}}>{cedit.cgv}</div>
                          </>)}
                          <div style={{display:'flex', gap:24, marginTop:35, paddingTop:14, borderTop:'2px solid #2d2216'}}>
                            <div style={{flex:1, textAlign:'center'}}>
                              <div style={{fontSize:'7.5pt', color:$textMut, textTransform:'uppercase', marginBottom:3}}>Donneur d'ordre</div>
                              <div style={{height:45, borderBottom:'1px solid #2d2216', marginBottom:4}}></div>
                              <div style={{fontSize:'6.5pt', color:$textMut}}>Ozdogan YILMAZ · YILMAZ SAS</div>
                            </div>
                            <div style={{flex:1, textAlign:'center'}}>
                              <div style={{fontSize:'7.5pt', color:$textMut, textTransform:'uppercase', marginBottom:3}}>Prestataire</div>
                              <div style={{height:45, borderBottom:'1px solid #2d2216', marginBottom:4}}></div>
                              <div style={{fontSize:'6.5pt', color:$textMut}}>{p.contactNom || p.nom} · {p.raisonSociale || p.nom}</div>
                            </div>
                          </div>
                          <div style={{marginTop:20, textAlign:'center', fontSize:'6.5pt', color:$textMut, borderTop:'1px solid #e0d8c8', paddingTop:6}}>{ct.label} — Réf. {cedit.ref || generateRef()} — YILMAZ SAS, Mutzig</div>
                        </div>
                        <div style={{textAlign:'center', marginTop:14}}>
                          <button onClick={printContrat} style={{padding:'10px 24px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #059669, #047857)', color:'white', fontWeight:700, fontSize:'0.92rem', cursor:'pointer'}}>🖨️ Imprimer / Télécharger PDF</button>
                        </div>
                      </>)}
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        );
}
