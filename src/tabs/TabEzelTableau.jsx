// === Onglet « ezel_tableau » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabEzelTableau(__props) {
  const { $bg, $bgCard, $bgSub, $border, $borderLight, $text, $textMut, $textSec, crmRd } = __props;
          const ACC = '#007ab5';
          const AFFAIRE_DATA = [
            { label: 'Affaire remportée', count: 1, montant: 586316, color: '#34d399', phase: 'lancement' },
            { label: 'Préparation initiale', count: 1, montant: 0, color: '#cab641', phase: 'lancement' },
            { label: 'Ordre de Service Reçu', count: 4, montant: 227613, color: '#4a90c4', phase: 'lancement' },
            { label: "Dossier transféré à l'exécution", count: 2, montant: 286042, color: '#0284c7', phase: 'lancement' },
            { label: 'Travaux en cours', count: 7, montant: 4300148, color: '#ea580c', phase: 'execution' },
            { label: 'Travaux suspendus', count: 8, montant: 2537485, color: '#d97706', phase: 'execution' },
            { label: 'Levée de Réserves en cours', count: 3, montant: 2089183, color: '#9d50dd', phase: 'reception' },
            { label: 'DGD en préparation', count: 9, montant: 4645740, color: '#74afcc', phase: 'reception' },
            { label: 'DGD envoyée', count: 6, montant: 3274633, color: '#9d99b9', phase: 'reception' },
            { label: 'GPA en cours / RG bloquée', count: 11, montant: 2834702, color: '#94a3b8', phase: 'cloture' },
            { label: 'RG libérée', count: 18, montant: 4781056, color: '#059669', phase: 'cloture' },
            { label: 'Terminé', count: 8, montant: 166533, color: '#757575', phase: 'archive' },
            { label: 'Affaire résilié', count: 2, montant: 1139523, color: '#dc2626', phase: 'archive' },
            { label: 'Projet abandonné', count: 1, montant: 2530000, color: '#bb3354', phase: 'archive' },
          ];
          const ETUDES_DATA = [
            { label: 'À Préparer', count: 4, budget: 21400000, offre: 0, color: '#64748b' },
            { label: 'Visite rdv à prendre', count: 2, budget: 0, offre: 0, color: '#0284c7' },
            { label: 'En préparation', count: 0, budget: 0, offre: 0, color: '#7f5347' },
            { label: 'En attente de Réponse', count: 12, budget: 1888502, offre: 7360045, color: '#ea580c' },
            { label: 'Demandes de précisions', count: 5, budget: 333250, offre: 1873625, color: '#e0f2fe' },
            { label: 'Accepté', count: 3, budget: 350000, offre: 269590, color: '#059669' },
            { label: 'Rejeté', count: 83, budget: 16799310, offre: 59980748, color: '#dc2626' },
            { label: 'Reporté', count: 12, budget: 0, offre: 5999138, color: '#94a3b8' },
            { label: 'Pas répondu', count: 196, budget: 36444893, offre: 0, color: '#d97706' },
            { label: "À Suivre - Sans Suite", count: 6, budget: 2553897, offre: 500000, color: '#007ab5' },
            { label: 'Projet en Cours', count: 10, budget: 351654, offre: 2952222, color: '#10b981' },
            { label: 'Projet Terminé', count: 1, budget: 140000, offre: 169385, color: '#34d399' },
          ];
          const totalAffaires = AFFAIRE_DATA.reduce((s, d) => s + d.count, 0);
          const activeAffaires = AFFAIRE_DATA.filter(d => ['lancement','execution'].includes(d.phase)).reduce((s, d) => s + d.count, 0);
          const caActif = AFFAIRE_DATA.filter(d => ['lancement','execution'].includes(d.phase)).reduce((s, d) => s + d.montant, 0);
          const caTotal = AFFAIRE_DATA.reduce((s, d) => s + d.montant, 0);
          const totalAO = ETUDES_DATA.reduce((s, d) => s + d.count, 0);
          const aoActifs = ETUDES_DATA.filter(d => ['À Préparer','Visite rdv à prendre','En préparation','En attente de Réponse','Demandes de précisions'].includes(d.label)).reduce((s, d) => s + d.count, 0);
          const aoAcceptes = ETUDES_DATA.find(d => d.label === 'Accepté')?.count || 0;
          const aoRejetes = ETUDES_DATA.find(d => d.label === 'Rejeté')?.count || 0;
          const tauxSucces = Math.round(aoAcceptes / (aoAcceptes + aoRejetes) * 100);
          const fmtM = (v) => v >= 1000000 ? (v/1000000).toFixed(1)+'M€' : v >= 1000 ? Math.round(v/1000)+'K€' : v+'€';
          const PHASES = [
            { id:'lancement', label:'Lancement', icon:'➤', color:'#34d399' },
            { id:'execution', label:'Exécution', icon:'◆', color:'#ea580c' },
            { id:'reception', label:'Réception & Clôture', icon:'☰', color:'#9d50dd' },
            { id:'cloture', label:'GPA / RG', icon:'▬', color:'#007ab5' },
            { id:'archive', label:'Archivé / Clôturé', icon:'▸', color:'#757575' },
          ];
          const maxCount = Math.max(...AFFAIRE_DATA.map(d => d.count));
          return (
            <div style={{padding:'28px 32px', minHeight:'calc(100vh - 120px)', background:$bg}}>
              <div style={{maxWidth:1300, margin:'0 auto'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28}}>
                  <div>
                    <div style={{fontSize:'1.5rem', fontWeight:800, color:$text, letterSpacing:'-0.03em'}}>◆ Tableau de Bord — Ezel Bâtiment</div>
                    <div style={{fontSize:'0.8rem', color:$textMut, marginTop:3}}>Données Monday.com en temps réel · Board Affaire-Chantier (4113177037) · Études AO (6470581185)</div>
                  </div>
                  <div style={{fontSize:'0.72rem', color:ACC, fontWeight:600, background:ACC+'12', padding:'4px 12px', borderRadius:crmRd, border:'1px solid '+ACC+'30'}}>MAJ : 12 mars 2026</div>
                </div>

                {/* KPI Row */}
                <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24}}>
                  {[
                    { label:'Chantiers actifs', value: activeAffaires, sub:'affaires en cours + lancement', icon:'◆', color:ACC },
                    { label:'CA actif', value: fmtM(caActif), sub:'Montant marché HT en cours', icon:'€', color:'#10b981' },
                    { label:'CA board total', value: fmtM(caTotal), sub:'81 affaires cumulées', icon:'▦', color:'#8b5cf6' },
                    { label:'AO actifs (études)', value: aoActifs, sub:`sur ${totalAO} AO suivis · Taux succès ${tauxSucces}%`, icon:'◺', color:'#f59e0b' },
                  ].map(kpi => (
                    <div key={kpi.label} style={{background:$bgCard, border:'1px solid '+$border, borderRadius:crmRd, padding:'18px 20px', position:'relative', overflow:'hidden'}}>
                      <div style={{position:'absolute', top:0, left:0, bottom:0, width:4, background:kpi.color, borderRadius:crmRd+' 0 0 '+crmRd}}></div>
                      <div style={{paddingLeft:10}}>
                        <div style={{fontSize:'0.72rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>{kpi.icon} {kpi.label}</div>
                        <div style={{fontSize:'2rem', fontWeight:800, color:kpi.color, letterSpacing:'-0.03em', lineHeight:1}}>{kpi.value}</div>
                        <div style={{fontSize:'0.68rem', color:$textMut, marginTop:5}}>{kpi.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:18, marginBottom:18}}>
                  {/* Affaire pipeline */}
                  <div style={{background:$bgCard, border:'1px solid '+$border, borderRadius:crmRd, padding:'20px 22px'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
                      <div style={{fontSize:'0.88rem', fontWeight:700, color:$text}}>☰ Pipeline Affaires · {totalAffaires} dossiers</div>
                      <div style={{fontSize:'0.68rem', color:$textMut}}>{fmtM(caTotal)} CA total</div>
                    </div>
                    {/* Phase groups */}
                    {PHASES.map(phase => {
                      const items = AFFAIRE_DATA.filter(d => d.phase === phase.id);
                      const pCount = items.reduce((s, d) => s + d.count, 0);
                      const pCA = items.reduce((s, d) => s + d.montant, 0);
                      if (pCount === 0) return null;
                      return (
                        <div key={phase.id} style={{marginBottom:12}}>
                          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                            <div style={{fontSize:'0.68rem', fontWeight:700, color:phase.color, textTransform:'uppercase', letterSpacing:'0.05em'}}>{phase.icon} {phase.label}</div>
                            <div style={{flex:1, height:1, background:$borderLight}}></div>
                            <div style={{fontSize:'0.68rem', color:$textMut, fontWeight:600}}>{pCount} aff. · {pCA > 0 ? fmtM(pCA) : '—'}</div>
                          </div>
                          {items.map(d => (
                            <div key={d.label} style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
                              <div style={{width:10, height:10, borderRadius:'50%', background:d.color, flexShrink:0}}></div>
                              <div style={{fontSize:'0.72rem', color:$textSec, flex:1, minWidth:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{d.label}</div>
                              <div style={{display:'flex', alignItems:'center', gap:8}}>
                                <div style={{width:80, height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}>
                                  <div style={{height:'100%', background:d.color, width:(d.count/maxCount*100)+'%', borderRadius:3, transition:'width 0.4s'}}></div>
                                </div>
                                <div style={{fontSize:'0.72rem', fontWeight:700, color:$text, width:16, textAlign:'right'}}>{d.count}</div>
                                {d.montant > 0 && <div style={{fontSize:'0.65rem', color:$textMut, width:60, textAlign:'right'}}>{fmtM(d.montant)}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* Études AO funnel */}
                  <div style={{background:$bgCard, border:'1px solid '+$border, borderRadius:crmRd, padding:'20px 22px'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
                      <div style={{fontSize:'0.88rem', fontWeight:700, color:$text}}>◺ Études AO · {totalAO} suivis</div>
                      <div style={{fontSize:'0.68rem', color:'#f59e0b', fontWeight:700, background:'#f59e0b18', padding:'2px 8px', borderRadius:20}}>Taux succès {tauxSucces}%</div>
                    </div>

                    {/* Mini KPI études */}
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14}}>
                      {[
                        { l:'AO actifs', v:aoActifs, c:'#f59e0b' },
                        { l:'Acceptés', v:aoAcceptes, c:'#059669' },
                        { l:'Rejetés', v:aoRejetes, c:'#dc2626' },
                        { l:'Pas répondu', v:196, c:'#757575' },
                      ].map(m => (
                        <div key={m.l} style={{background:$bgSub, borderRadius:Math.max(crmRd-2,2), padding:'10px 12px'}}>
                          <div style={{fontSize:'0.65rem', color:$textMut, marginBottom:3}}>{m.l}</div>
                          <div style={{fontSize:'1.4rem', fontWeight:800, color:m.c, letterSpacing:'-0.02em'}}>{m.v}</div>
                        </div>
                      ))}
                    </div>

                    {/* AO status bars */}
                    <div style={{fontSize:'0.72rem', fontWeight:700, color:$text, marginBottom:8}}>Répartition par statut</div>
                    {ETUDES_DATA.filter(d => d.count > 0 && !['Pas répondu','DOUBLON'].includes(d.label)).sort((a,b)=>b.count-a.count).slice(0,8).map(d => (
                      <div key={d.label} style={{display:'flex', alignItems:'center', gap:8, marginBottom:5}}>
                        <div style={{width:8, height:8, borderRadius:'50%', background:d.color, flexShrink:0}}></div>
                        <div style={{fontSize:'0.68rem', color:$textSec, flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{d.label}</div>
                        <div style={{width:60, height:5, background:$bgSub, borderRadius:3, overflow:'hidden'}}>
                          <div style={{height:'100%', background:d.color, width:(d.count/83*100)+'%', borderRadius:3}}></div>
                        </div>
                        <div style={{fontSize:'0.7rem', fontWeight:700, color:$text, width:20, textAlign:'right'}}>{d.count}</div>
                      </div>
                    ))}

                    {/* Budget AO à préparer */}
                    <div style={{marginTop:14, padding:'10px 14px', background:'#f59e0b10', border:'1px solid #f59e0b30', borderRadius:crmRd, display:'flex', alignItems:'center', gap:10}}>
                      <div style={{fontSize:'1.1rem'}}>↯</div>
                      <div>
                        <div style={{fontSize:'0.68rem', color:'#f59e0b', fontWeight:700}}>4 AO à préparer</div>
                        <div style={{fontSize:'0.72rem', color:$textSec}}>Budget estimé : <strong>21.4M€</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Phase résumé bar */}
                <div style={{background:$bgCard, border:'1px solid '+$border, borderRadius:crmRd, padding:'18px 22px'}}>
                  <div style={{fontSize:'0.88rem', fontWeight:700, color:$text, marginBottom:14}}>▦ Répartition des 81 affaires par phase</div>
                  <div style={{display:'flex', gap:4, height:32, borderRadius:crmRd, overflow:'hidden', marginBottom:12}}>
                    {PHASES.map(phase => {
                      const pCount = AFFAIRE_DATA.filter(d => d.phase === phase.id).reduce((s, d) => s + d.count, 0);
                      const pct = Math.round(pCount / totalAffaires * 100);
                      if (pCount === 0) return null;
                      return (
                        <div key={phase.id} title={phase.label+' : '+pCount} style={{background:phase.color, flex:pCount, display:'flex', alignItems:'center', justifyContent:'center', minWidth:30}}>
                          <span style={{fontSize:'0.65rem', fontWeight:700, color:'#fff', textShadow:'0 1px 2px rgba(0,0,0,0.4)'}}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
                    {PHASES.map(phase => {
                      const pCount = AFFAIRE_DATA.filter(d => d.phase === phase.id).reduce((s, d) => s + d.count, 0);
                      const pCA = AFFAIRE_DATA.filter(d => d.phase === phase.id).reduce((s, d) => s + d.montant, 0);
                      if (pCount === 0) return null;
                      return (
                        <div key={phase.id} style={{display:'flex', alignItems:'center', gap:6}}>
                          <div style={{width:10, height:10, borderRadius:2, background:phase.color}}></div>
                          <div style={{fontSize:'0.7rem', color:$textSec}}>{phase.icon} {phase.label}</div>
                          <div style={{fontSize:'0.7rem', fontWeight:700, color:$text}}>{pCount}</div>
                          {pCA > 0 && <div style={{fontSize:'0.65rem', color:$textMut}}>· {fmtM(pCA)}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          );
}
