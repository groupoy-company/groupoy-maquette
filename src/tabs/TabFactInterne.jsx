// === Onglet « fact_interne » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabFactInterne(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, CONDITIONS_PAIEMENT, ca, crmRd, deleteFacture, factIntData, factIntPreview, factIntStyle, factIntTab, filialesEnrichies, genererFacture, getKpiFiliale, handlePrint, servicesYilmaz, setFactIntPreview, setFactIntStyle, setFactIntTab, toggleFactIntService, updateFactIntConfig, updateFacture } = __props;
        const { config, factures } = factIntData;
        const cardStyle = {background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'};
        const inS = {width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.9rem', outline:'none', background:'#fefdfb'};
        const lbS = {display:'block', fontSize:'0.75rem', fontWeight:600, color:$textMut, marginBottom:3, textTransform:'uppercase'};
        const fmt = v => v >= 1000000 ? (v/1000000).toFixed(2)+'M€' : v >= 1000 ? (v/1000).toFixed(1)+'K€' : v.toFixed(0)+'€';
        const statutColors = { brouillon: {bg:'#fef3c7', color:'#92400e', label:'✎ Brouillon'}, envoyee: {bg:'#dbeafe', color:'#1e40af', label:'↥ Envoyée'}, payee: {bg:'#dcfce7', color:'#166534', label:'✓ Payée'}, retard: {bg:'#fecaca', color:'#991b1b', label:'▲ En retard'} };
        const totalForfaitMensuel = config.filter(c=>c.actif).reduce((s,c) => s + c.forfaitMensuel, 0);
        const totalVariableEstime = config.filter(c=>c.actif).reduce((s,c) => {
          const fil = filialesEnrichies.find(f => f.nom === c.filialeNom);
          return s + Math.round((fil ? getKpiFiliale(fil).ca : 0) * c.tauxVariable / 100 / 12);
        }, 0);
        const facturesPayees = factures.filter(f => f.statut === 'payee');
        const facturesEnCours = factures.filter(f => f.statut !== 'payee');
        const totalEncaisse = facturesPayees.reduce((s,f) => s + f.total, 0);
        const totalEnCours = facturesEnCours.reduce((s,f) => s + f.total, 0);
        const moisActuel = new Date().getMonth() + 1;
        const anneeActuelle = 2026;
        const moisOptions = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

        return (
          <div style={{maxWidth:1100, margin:'0 auto'}}>
            {/* Header */}
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <span style={{fontSize:'1.8rem'}}>🧾</span>
                  <div>
                    <h2 style={{fontSize:'1.4rem', fontWeight:800, color:$text, margin:0}}>Facturation Interne</h2>
                    <p style={{fontSize:'0.9rem', color:$textMut, margin:0}}>Yilmaz → Filiales — Services partagés</p>
                  </div>
                </div>
              </div>
              <div style={{display:'flex', gap:8}}>
                {['dashboard','factures','config'].map(t => (
                  <button key={t} onClick={() => setFactIntTab(t)} style={{padding:'8px 14px', borderRadius:crmRd, border: factIntTab === t ? '2px solid #059669' : `1px solid ${$borderAlt}`, background: factIntTab === t ? '#f0fdf4' : 'white', color: factIntTab === t ? '#059669' : '#6b5d4d', fontWeight: factIntTab === t ? 700 : 500, fontSize:'0.88rem', cursor:'pointer'}}>
                    {t === 'dashboard' ? '▦ Dashboard' : t === 'factures' ? '☰ Factures' : '✱ Config'}
                  </button>
                ))}
              </div>
            </div>

            {/* ══ DASHBOARD TAB ══ */}
            {factIntTab === 'dashboard' && (<>
              {/* KPIs */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:24}}>
                {[
                  { label: 'Forfait mensuel', value: fmt(totalForfaitMensuel), sub: '/mois', icon: '☰', color: '#8B6F47' },
                  { label: 'Variable estimé', value: fmt(totalVariableEstime), sub: '/mois', icon: '↗', color: '#7c3aed' },
                  { label: 'Total encaissé', value: fmt(totalEncaisse), sub: `${facturesPayees.length} factures`, icon: '✓', color: '#059669' },
                  { label: 'En cours / impayé', value: fmt(totalEnCours), sub: `${facturesEnCours.length} factures`, icon: '⏳', color: totalEnCours > 0 ? '#d97706' : '#b0a08a' }
                ].map(kpi => (
                  <div key={kpi.label} style={{...cardStyle, padding:16}}>
                    <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                      <span style={{fontSize:'1.2rem'}}>{kpi.icon}</span>
                      <span style={{fontSize:'0.8rem', color:$textMut, fontWeight:600}}>{kpi.label}</span>
                    </div>
                    <div style={{fontSize:'1.5rem', fontWeight:800, color: kpi.color}}>{kpi.value}</div>
                    <div style={{fontSize:'0.75rem', color:$textMut, marginTop:2}}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Répartition par filiale */}
              <div style={{...cardStyle, padding:20, marginBottom:24}}>
                <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:16}}>▪ Répartition par filiale</h3>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.9rem'}}>
                  <thead>
                    <tr style={{background:$bgSub}}>
                      {['Filiale','Forfait','Taux var.','CA filiale','Variable est.','Total/mois','Services','Statut'].map(h => (
                        <th key={h} style={{position:'relative',padding:'10px 12px', textAlign: h==='Filiale' || h==='Services' || h==='Statut' ? 'left' : 'right', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.8rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.filter(c=>c.actif).map((cfg, i) => {
                      const fil = filialesEnrichies.find(f => f.nom === cfg.filialeNom);
                      const ca = fil ? getKpiFiliale(fil).ca : 0;
                      const varEst = Math.round(ca * cfg.tauxVariable / 100 / 12);
                      return (
                        <tr key={cfg.filialeNom} style={{background: i%2===0 ? 'white' : '#fefdfb'}}>
                          <td style={{padding:'10px 12px', fontWeight:700, color:$text, borderBottom:`1px solid ${$border}`}}>{cfg.filialeNom}</td>
                          <td style={{padding:'10px 12px', textAlign:'right', fontWeight:600, color:$accent, borderBottom:`1px solid ${$border}`}}>{fmt(cfg.forfaitMensuel)}</td>
                          <td style={{padding:'10px 12px', textAlign:'right', color:'#7c3aed', fontWeight:600, borderBottom:`1px solid ${$border}`}}>{cfg.tauxVariable}%</td>
                          <td style={{padding:'10px 12px', textAlign:'right', color:$text, borderBottom:`1px solid ${$border}`}}>{fmt(ca)}</td>
                          <td style={{padding:'10px 12px', textAlign:'right', color:'#7c3aed', fontWeight:600, borderBottom:`1px solid ${$border}`}}>{fmt(varEst)}</td>
                          <td style={{padding:'10px 12px', textAlign:'right', fontWeight:800, color:'#059669', borderBottom:`1px solid ${$border}`}}>{fmt(cfg.forfaitMensuel + varEst)}</td>
                          <td style={{padding:'10px 12px', borderBottom:`1px solid ${$border}`}}>
                            <div style={{display:'flex', gap:3, flexWrap:'wrap'}}>
                              {cfg.services.map(sId => {
                                const svc = servicesYilmaz.find(s => s.id === sId);
                                return svc ? <span key={sId} style={{fontSize:'0.9rem'}} title={svc.label}>{svc.icon}</span> : null;
                              })}
                            </div>
                          </td>
                          <td style={{padding:'10px 12px', borderBottom:`1px solid ${$border}`}}><span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background:'#dcfce7', color:'#166534', fontWeight:600}}>Actif</span></td>
                        </tr>
                      );
                    })}
                    <tr style={{background:$bgSub}}>
                      <td style={{padding:'10px 12px', fontWeight:800, color:$text}}>TOTAL</td>
                      <td style={{padding:'10px 12px', textAlign:'right', fontWeight:800, color:$accent}}>{fmt(totalForfaitMensuel)}</td>
                      <td style={{padding:'10px 12px'}}></td>
                      <td style={{padding:'10px 12px'}}></td>
                      <td style={{padding:'10px 12px', textAlign:'right', fontWeight:800, color:'#7c3aed'}}>{fmt(totalVariableEstime)}</td>
                      <td style={{padding:'10px 12px', textAlign:'right', fontWeight:800, color:'#059669', fontSize:'0.9rem'}}>{fmt(totalForfaitMensuel + totalVariableEstime)}</td>
                      <td colSpan={2} style={{padding:'10px 12px', fontSize:'0.8rem', color:$textMut}}>×12 = {fmt((totalForfaitMensuel + totalVariableEstime) * 12)}/an</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dernières factures */}
              <div style={{...cardStyle, padding:20}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                  <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, margin:0}}>☰ Dernières factures</h3>
                  <button onClick={() => setFactIntTab('factures')} style={{padding:'6px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$accent, fontSize:'0.85rem', fontWeight:600, cursor:'pointer'}}>Voir tout →</button>
                </div>
                {factures.length === 0 ? (
                  <div style={{textAlign:'center', padding:32, color:$textMut}}>
                    <div style={{fontSize:'2rem', marginBottom:8}}>📭</div>
                    <div style={{fontSize:'0.95rem', fontWeight:600}}>Aucune facture générée</div>
                    <div style={{fontSize:'0.85rem', marginTop:4}}>Allez dans l'onglet Factures pour en générer</div>
                  </div>
                ) : (
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.88rem'}}>
                    <thead><tr style={{background:$bgSub}}>
                      {['Réf.','Filiale','Période','Forfait','Variable','Total','Statut'].map(h => (
                        <th key={h} style={{position:'relative',padding:'8px 10px', textAlign: h==='Filiale' || h==='Réf.' || h==='Période' || h==='Statut' ? 'left' : 'right', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.78rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {factures.slice(0, 8).map((f, i) => {
                        const st = statutColors[f.statut] || statutColors.brouillon;
                        return (
                          <tr key={f.id} onClick={() => setFactIntPreview(f)} style={{background: i%2===0 ? 'white' : '#fefdfb', cursor:'pointer', transition:'background 0.15s'}} onMouseOver={e => e.currentTarget.style.background='#fef3c7'} onMouseOut={e => e.currentTarget.style.background= i%2===0 ? 'white' : '#fefdfb'}>
                            <td style={{padding:'8px 10px', fontWeight:600, color:$accent, borderBottom:`1px solid ${$border}`, fontSize:'0.82rem'}}>{f.id}</td>
                            <td style={{padding:'8px 10px', fontWeight:600, color:$text, borderBottom:`1px solid ${$border}`}}>{f.filiale}</td>
                            <td style={{padding:'8px 10px', color:$textSec, borderBottom:`1px solid ${$border}`}}>{f.periode}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', borderBottom:`1px solid ${$border}`}}>{fmt(f.montantForfait)}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', color:'#7c3aed', borderBottom:`1px solid ${$border}`}}>{fmt(f.montantVariable)}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', fontWeight:700, color:'#059669', borderBottom:`1px solid ${$border}`}}>{fmt(f.total)}</td>
                            <td style={{padding:'8px 10px', borderBottom:`1px solid ${$border}`}}><span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background: st.bg, color: st.color, fontWeight:600}}>{st.label}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>)}

            {/* ══ FACTURES TAB ══ */}
            {factIntTab === 'factures' && (<>
              {/* Génération */}
              <div style={{...cardStyle, padding:20, marginBottom:24}}>
                <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:16}}>↻ Générer les factures du mois</h3>
                <div style={{display:'flex', gap:12, alignItems:'end', flexWrap:'wrap'}}>
                  <div>
                    <label style={lbS}>Mois</label>
                    <select id="factint-mois" style={{...inS, width:160}} defaultValue={moisActuel}>
                      {moisOptions.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbS}>Année</label>
                    <select id="factint-annee" style={{...inS, width:100}} defaultValue={anneeActuelle}>
                      {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <button onClick={() => {
                    const m = Number(document.getElementById('factint-mois').value);
                    const a = Number(document.getElementById('factint-annee').value);
                    const count = genererFacture(m, a);
                    alert(`✓ ${count} factures générées pour ${moisOptions[m-1]} ${a}`);
                  }} style={{padding:'8px 20px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #059669, #047857)', color:'white', fontWeight:700, fontSize:'0.95rem', cursor:'pointer', height:38}}>
                    🧾 Générer {config.filter(c=>c.actif).length} factures
                  </button>
                </div>
              </div>

              {/* Liste factures */}
              <div style={{...cardStyle, padding:20}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                  <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, margin:0}}>☰ Toutes les factures ({factures.length})</h3>
                </div>
                {factures.length === 0 ? (
                  <div style={{textAlign:'center', padding:40, color:$textMut}}>
                    <div style={{fontSize:'2.5rem', marginBottom:8}}>📭</div>
                    <div style={{fontSize:'0.9rem', fontWeight:600}}>Aucune facture</div>
                    <div style={{fontSize:'0.88rem', marginTop:4}}>Utilisez le générateur ci-dessus pour créer les factures du mois</div>
                  </div>
                ) : (
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.88rem'}}>
                    <thead><tr style={{background:$bgSub}}>
                      {['Réf.','Filiale','Période','Forfait','Variable','Total','Statut','Actions'].map(h => (
                        <th key={h} style={{position:'relative',padding:'10px 10px', textAlign: ['Forfait','Variable','Total'].includes(h) ? 'right' : 'left', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.78rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {factures.map((f, i) => {
                        const st = statutColors[f.statut] || statutColors.brouillon;
                        return (
                          <tr key={f.id} style={{background: i%2===0 ? 'white' : '#fefdfb'}}>
                            <td onClick={() => setFactIntPreview(f)} style={{padding:'8px 10px', fontWeight:600, color:$accent, borderBottom:`1px solid ${$border}`, fontSize:'0.82rem', cursor:'pointer', textDecoration:'underline'}}>{f.id}</td>
                            <td style={{padding:'8px 10px', fontWeight:600, color:$text, borderBottom:`1px solid ${$border}`}}>{f.filiale}</td>
                            <td style={{padding:'8px 10px', color:$textSec, borderBottom:`1px solid ${$border}`}}>{f.periode}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', borderBottom:`1px solid ${$border}`}}>{fmt(f.montantForfait)}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', color:'#7c3aed', borderBottom:`1px solid ${$border}`}}>{fmt(f.montantVariable)}</td>
                            <td style={{padding:'8px 10px', textAlign:'right', fontWeight:700, color:'#059669', borderBottom:`1px solid ${$border}`}}>{fmt(f.total)}</td>
                            <td style={{padding:'8px 10px', borderBottom:`1px solid ${$border}`}}><span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background: st.bg, color: st.color, fontWeight:600}}>{st.label}</span></td>
                            <td style={{padding:'8px 10px', borderBottom:`1px solid ${$border}`}}>
                              <div style={{display:'flex', gap:4}}>
                                <button onClick={() => setFactIntPreview(f)} style={{padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$accent, fontSize:'0.75rem', cursor:'pointer', fontWeight:600}}>👁️</button>
                                <select value={f.statut} onChange={e => updateFacture(f.id, 'statut', e.target.value)} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.8rem', cursor:'pointer', background:$bgCard}}>
                                  <option value="brouillon">✎ Brouillon</option>
                                  <option value="envoyee">↥ Envoyée</option>
                                  <option value="payee">✓ Payée</option>
                                  <option value="retard">▲ En retard</option>
                                </select>
                                <button onClick={() => deleteFacture(f.id)} style={{padding:'3px 6px', borderRadius:crmRd, border:'none', background:'#fecaca', color:'#dc2626', fontSize:'0.75rem', cursor:'pointer'}}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr style={{background:$bgSub}}>
                        <td colSpan={3} style={{padding:'10px', fontWeight:800, color:$text}}>TOTAL ({factures.length} factures)</td>
                        <td style={{padding:'10px', textAlign:'right', fontWeight:700, color:$accent}}>{fmt(factures.reduce((s,f) => s + f.montantForfait, 0))}</td>
                        <td style={{padding:'10px', textAlign:'right', fontWeight:700, color:'#7c3aed'}}>{fmt(factures.reduce((s,f) => s + f.montantVariable, 0))}</td>
                        <td style={{padding:'10px', textAlign:'right', fontWeight:800, color:'#059669', fontSize:'0.9rem'}}>{fmt(factures.reduce((s,f) => s + f.total, 0))}</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </>)}

            {/* ══ CONFIG TAB ══ */}
            {factIntTab === 'config' && (<>
              <div style={{...cardStyle, padding:20, marginBottom:24}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                  <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, margin:0}}>✱ Configuration par filiale</h3>
                  <div style={{fontSize:'0.8rem', color:$textMut}}>💾 Sauvegarde automatique</div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  {config.map((cfg, i) => (
                    <div key={cfg.filialeNom} style={{border:`1px solid ${$border}`, borderRadius:crmRd, padding:16, background: cfg.actif ? 'white' : '#faf8f5'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                        <div style={{display:'flex', alignItems:'center', gap:10}}>
                          <span style={{fontSize:'1.1rem', fontWeight:800, color:$text}}>{cfg.filialeNom}</span>
                          <span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background: cfg.actif ? '#dcfce7' : '#fef3c7', color: cfg.actif ? '#166534' : '#92400e', fontWeight:600}}>{cfg.actif ? '✓ Actif' : '⏸️ Inactif'}</span>
                        </div>
                        <label style={{display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:'0.85rem', color:$textSec}}>
                          <input type="checkbox" checked={cfg.actif} onChange={e => updateFactIntConfig(i, 'actif', e.target.checked)} style={{width:16, height:16, accentColor:'#059669'}} />
                          Facturation active
                        </label>
                      </div>
                      {cfg.actif && (<>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:16, marginBottom:14}}>
                          <div>
                            <label style={lbS}>Forfait mensuel (€)</label>
                            <input type="number" style={inS} value={cfg.forfaitMensuel} onChange={e => updateFactIntConfig(i, 'forfaitMensuel', Number(e.target.value))} />
                          </div>
                          <div>
                            <label style={lbS}>Taux variable (% CA annuel)</label>
                            <div style={{display:'flex', alignItems:'center', gap:8}}>
                              <input type="number" step="0.5" min="0" max="20" style={{...inS, width:80}} value={cfg.tauxVariable} onChange={e => updateFactIntConfig(i, 'tauxVariable', Number(e.target.value))} />
                              <span style={{fontSize:'0.85rem', color:$textMut}}>%</span>
                            </div>
                          </div>
                          <div>
                            <label style={lbS}>Estimation mensuelle</label>
                            <div style={{padding:'8px 12px', background:$success+'12', borderRadius:crmRd, fontSize:'0.95rem', fontWeight:700, color:'#059669'}}>
                              {(() => {
                                const fil = filialesEnrichies.find(f => f.nom === cfg.filialeNom);
                                const ca = fil ? getKpiFiliale(fil).ca : 0;
                                const varEst = Math.round(ca * cfg.tauxVariable / 100 / 12);
                                return `${fmt(cfg.forfaitMensuel)} + ${fmt(varEst)} = ${fmt(cfg.forfaitMensuel + varEst)}/mois`;
                              })()}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label style={lbS}>Services souscrits</label>
                          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                            {servicesYilmaz.map(svc => {
                              const active = cfg.services.includes(svc.id);
                              return (
                                <button key={svc.id} onClick={() => toggleFactIntService(i, svc.id)} style={{display:'flex', alignItems:'center', gap:5, padding:'6px 10px', borderRadius:crmRd, border: active ? `2px solid ${svc.color}` : `1px solid ${$borderAlt}`, background: active ? `${svc.color}10` : 'white', color: active ? svc.color : '#b0a08a', fontWeight: active ? 600 : 400, fontSize:'0.73rem', cursor:'pointer', transition:'all 0.15s'}}>
                                  <span>{svc.icon}</span> {svc.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Récap annuel */}
              <div style={{...cardStyle, padding:20}}>
                <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:12}}>▦ Récapitulatif annuel estimé</h3>
                <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
                  <div style={{textAlign:'center', padding:16, background:$bgSub, borderRadius:crmRd}}>
                    <div style={{fontSize:'0.8rem', color:$textMut, fontWeight:600, marginBottom:4}}>Forfaits annuels</div>
                    <div style={{fontSize:'1.4rem', fontWeight:800, color:$accent}}>{fmt(totalForfaitMensuel * 12)}</div>
                  </div>
                  <div style={{textAlign:'center', padding:16, background:$bgSub, borderRadius:crmRd}}>
                    <div style={{fontSize:'0.8rem', color:$textMut, fontWeight:600, marginBottom:4}}>Variable annuel estimé</div>
                    <div style={{fontSize:'1.4rem', fontWeight:800, color:'#7c3aed'}}>{fmt(totalVariableEstime * 12)}</div>
                  </div>
                  <div style={{textAlign:'center', padding:16, background:$success+'12', borderRadius:crmRd}}>
                    <div style={{fontSize:'0.8rem', color:'#059669', fontWeight:600, marginBottom:4}}>Total CA YILMAZ estimé</div>
                    <div style={{fontSize:'1.6rem', fontWeight:800, color:'#059669'}}>{fmt((totalForfaitMensuel + totalVariableEstime) * 12)}</div>
                  </div>
                </div>
              </div>
            </>)}

            {/* ══ MODAL PRÉVISUALISATION FACTURE ══ */}
            {factIntPreview && (() => {
              const f = factIntPreview;
              const st = statutColors[f.statut] || statutColors.brouillon;
              const cfg = config.find(c => c.filialeNom === f.filiale);
              const moisNoms = ['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
              const tva = Math.round(f.total * 0.20);
              const ttc = f.total + tva;

              const handlePrint = () => {
                const svcLabels = {direction:'Direction & Stratégie',finance:'Finance & Comptabilité',rh:'Ressources Humaines',achats:'Achats & Prestataires',it:'IT & Digital',juridique:'Juridique & Conformité',marketing:'Marketing & Communication'};
                const svcList = (f.services||[]).map(sId => svcLabels[sId]||sId);
                const isNoir = factIntStyle === 'noir';
                const c = isNoir
                  ? { bar:'#1a1a1a', logo:'#1a1a1a', logoSub:'#888', sep:'#e0e0e0', refLbl:'#999', refNum:'#1a1a1a', refDate:'#666',
                      partyBg:'white', partyBrd:'#e5e5e5', partyTitle:'#999', partyName:'#1a1a1a', partyAddr:'#666',
                      objetBg:'#f7f7f7', objetBrd:'#e5e5e5', objetTxt:'#444', objetStrong:'#1a1a1a',
                      svcTitle:'#999', tagBg:'#f0f0f0', tagBrd:'#e0e0e0', tagTxt:'#444',
                      thBg:'transparent', thBrd:'2px solid #1a1a1a', thTxt:'#999',
                      htBg:'transparent', htBrd:'2px solid #ddd',
                      tvaTxt:'#888',
                      ttcBg:'#1a1a1a', ttcTxt:'white', ttcRadius:'border-radius:6px',
                      condBg:'white', condBrd:'#e5e5e5', condTitle:'#999', condTxt:'#666',
                      ribBg:'#f7f7f7', ribBrd:'#e5e5e5', ribTitle:'#999', ribTxt:'#1a1a1a',
                      footBrd:'#e0e0e0', footBrand:'#1a1a1a', footTxt:'#aaa' }
                  : { bar:'linear-gradient(90deg,#8B6F47,#c9b896,#8B6F47)', logo:'#8B6F47', logoSub:'#9b9590', sep:'linear-gradient(90deg,#f0ebe3,#d4d0c8,#f0ebe3)', refLbl:'#b0a08a', refNum:'#8B6F47', refDate:'#6b5d4d',
                      partyBg:'#faf8f5', partyBrd:'#f0ebe3', partyTitle:'#b0a08a', partyName:'#2d2216', partyAddr:'#6b5d4d',
                      objetBg:'#fef9e7', objetBrd:'#f0e6c0', objetTxt:'#92400e', objetStrong:'#92400e',
                      svcTitle:'#b0a08a', tagBg:'linear-gradient(135deg,#f5f0e8,#ede8df)', tagBrd:'#e8e4de', tagTxt:'#6b5d4d',
                      thBg:'#faf8f5', thBrd:'2px solid #f0ebe3', thTxt:'#b0a08a',
                      htBg:'#f0fdf4', htBrd:'none',
                      tvaTxt:'#6b5d4d',
                      ttcBg:'#dcfce7', ttcTxt:'#059669', ttcRadius:'',
                      condBg:'#faf8f5', condBrd:'#f0ebe3', condTitle:'#b0a08a', condTxt:'#6b5d4d',
                      ribBg:'#eff6ff', ribBrd:'#bfdbfe', ribTitle:'#3b82f6', ribTxt:'#1e40af',
                      footBrd:'#f0ebe3', footBrand:'#8B6F47', footTxt:'#b0a08a' };
                const barStyle = isNoir ? 'background:'+c.bar : 'background:'+c.bar;
                const htmlContent = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Facture ${f.id}</title>
<style>
  @page{size:A4;margin:0}*{margin:0;padding:0;box-sizing:border-box}
  html,body{width:210mm;min-height:297mm;font-family:'Segoe UI',system-ui,sans-serif;color:#1a1a1a;background:white}
  .page{width:210mm;min-height:297mm;padding:20mm 22mm 16mm 22mm;position:relative;display:flex;flex-direction:column}
  .top-bar{height:5px;${barStyle};margin:-20mm -22mm 24px -22mm;width:calc(100% + 44mm)}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px}
  .logo{font-size:26px;font-weight:800;color:${c.logo};letter-spacing:-0.5px}
  .logo-sub{font-size:10px;color:${c.logoSub};margin-top:3px;line-height:1.7}
  .ref-block{text-align:right}
  .facture-label{font-size:10px;text-transform:uppercase;letter-spacing:2.5px;color:${c.refLbl};font-weight:600}
  .facture-num{font-size:20px;font-weight:800;color:${c.refNum};margin:4px 0}
  .facture-date{font-size:10.5px;color:${c.refDate};line-height:1.7}
  .sep{height:1px;background:${c.sep};margin:0 0 28px 0}
  .parties{display:flex;gap:28px;margin-bottom:28px}
  .party{flex:1;padding:18px 20px;background:${c.partyBg};border:1px solid ${c.partyBrd};border-radius:8px}
  .party-title{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:${c.partyTitle};font-weight:700;margin-bottom:10px}
  .party-name{font-size:14px;font-weight:700;color:${c.partyName}}
  .party-detail{font-size:10.5px;color:${c.partyAddr};line-height:1.7;margin-top:5px}
  .objet{background:${c.objetBg};border:1px solid ${c.objetBrd};border-radius:8px;padding:12px 18px;margin-bottom:28px;font-size:11px;color:${c.objetTxt}}
  .objet strong{font-weight:700;color:${c.objetStrong}}
  .svc-section{margin-bottom:28px}.svc-title{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:${c.svcTitle};font-weight:700;margin-bottom:10px}
  .svc-list{display:flex;flex-wrap:wrap;gap:6px}
  .svc-tag{display:inline-block;padding:4px 14px;border-radius:4px;background:${c.tagBg};font-size:9.5px;font-weight:600;color:${c.tagTxt};border:1px solid ${c.tagBrd}}
  table{width:100%;border-collapse:collapse;margin-bottom:8px}
  thead th{padding:12px 16px;font-size:9.5px;text-transform:uppercase;letter-spacing:1.5px;color:${c.thTxt};font-weight:700;border-bottom:${c.thBrd};background:${c.thBg}}
  thead th:first-child{text-align:left}thead th:last-child{text-align:right}
  tbody td{padding:14px 16px;font-size:12px;border-bottom:1px solid #eee;color:#1a1a1a}
  tbody td:last-child{text-align:right;font-variant-numeric:tabular-nums;font-weight:500}
  .row-ht{border-top:${c.htBrd}}.row-ht td{font-weight:700;padding-top:16px;background:${c.htBg}}
  .row-tva td{color:${c.tvaTxt};font-size:11.5px}
  .row-ttc{background:${c.ttcBg}}.row-ttc td{font-weight:800;font-size:14px;color:${c.ttcTxt};padding:16px;border:none;${c.ttcRadius}}
  .conditions{margin-top:28px;padding:16px 20px;background:${c.condBg};border:1px solid ${c.condBrd};border-radius:8px}
  .conditions-title{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:${c.condTitle};font-weight:700;margin-bottom:8px}
  .conditions-text{font-size:10px;color:${c.condTxt};line-height:1.9}
  .rib{margin-top:14px;padding:14px 20px;background:${c.ribBg};border-radius:8px;border:1px solid ${c.ribBrd}}
  .rib-title{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:${c.ribTitle};font-weight:700;margin-bottom:6px}
  .rib-text{font-size:10px;color:${c.ribTxt};font-family:monospace;letter-spacing:0.5px}
  .spacer{flex:1;min-height:30px}
  .footer{padding-top:14px;border-top:1px solid ${c.footBrd};font-size:8.5px;color:${c.footTxt};text-align:center;line-height:2}
  .footer-brand{font-weight:700;color:${c.footBrand};font-size:9.5px;margin-bottom:2px}
  @media print{html,body{width:210mm;height:297mm}.page{width:210mm;height:297mm}}
</style></head><body>
<div class="page">
  <div class="top-bar"></div>
  <div class="header"><div><div class="logo">◆ YILMAZ</div><div class="logo-sub">Services Partagés — Group OY<br/>12 rue de l'Industrie, 67190 Mutzig<br/>SIRET : XXX XXX XXX XXXXX<br/>TVA : FR XX XXX XXX XXX</div></div>
  <div class="ref-block"><div class="facture-label">Facture</div><div class="facture-num">${f.id}</div><div class="facture-date">Date d'émission : ${f.dateCreation}<br/>Période : ${moisNoms[f.mois]} ${f.annee}</div></div></div>
  <div class="sep"></div>
  <div class="parties"><div class="party"><div class="party-title">Émetteur</div><div class="party-name">YILMAZ SAS</div><div class="party-detail">Services Partagés<br/>Group OY<br/>12 rue de l'Industrie<br/>67190 Mutzig</div></div>
  <div class="party"><div class="party-title">Destinataire</div><div class="party-name">${f.filiale}</div><div class="party-detail">Filiale Group OY<br/>67190 Mutzig</div></div></div>
  <div class="objet"><strong>Objet :</strong> Prestations de services partagés YILMAZ pour la période de ${moisNoms[f.mois]} ${f.annee}</div>
  <div class="svc-section"><div class="svc-title">Services fournis</div><div class="svc-list">${svcList.map(s => '<span class="svc-tag">'+s+'</span>').join('')}</div></div>
  <table><thead><tr><th>Désignation</th><th>Montant HT</th></tr></thead><tbody>
  <tr><td>Forfait mensuel — Services partagés YILMAZ</td><td>${f.montantForfait.toLocaleString('fr-FR')} €</td></tr>
  <tr><td>Part variable — ${cfg ? cfg.tauxVariable : 3}% du CA annuel (au prorata mensuel)</td><td>${f.montantVariable.toLocaleString('fr-FR')} €</td></tr>
  <tr class="row-ht"><td>Total HT</td><td>${f.total.toLocaleString('fr-FR')} €</td></tr>
  <tr class="row-tva"><td>TVA (20%)</td><td>${tva.toLocaleString('fr-FR')} €</td></tr>
  <tr class="row-ttc"><td>TOTAL TTC</td><td>${ttc.toLocaleString('fr-FR')} €</td></tr>
  </tbody></table>
  <div class="conditions"><div class="conditions-title">Conditions de paiement</div><div class="conditions-text">Règlement ${(() => { const cp = CONDITIONS_PAIEMENT[f.conditionsPaiement] || CONDITIONS_PAIEMENT['30_jours']; return cp.delai; })()} par virement bancaire.<br/>Pénalités de retard : 3× le taux d'intérêt légal en vigueur.<br/>Pas d'escompte pour paiement anticipé.<br/>Indemnité forfaitaire de recouvrement : 40 €.</div></div>
  <div class="rib"><div class="rib-title">Coordonnées bancaires</div><div class="rib-text">IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX &nbsp;&nbsp;&nbsp; BIC : XXXXXXXX</div></div>
  <div class="spacer"></div>
  <div class="footer"><div class="footer-brand">YILMAZ SAS — Services Partagés du Group OY</div>RCS Saverne — SIRET : XXX XXX XXX XXXXX — TVA Intracommunautaire : FR XX XXX XXX XXX<br/>12 rue de l'Industrie, 67190 Mutzig — contact@yilmaz-services.fr</div>
</div>
<script>window.onload=function(){window.print();}</script>
</body></html>`;
                const blob = new Blob([htmlContent], {type:'text/html;charset=utf-8'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'Facture_' + f.id + '.html'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
                URL.revokeObjectURL(url);
              };

              const handleEmail = () => {
                const subject = encodeURIComponent(`Facture ${f.id} — YILMAZ → ${f.filiale} — ${moisNoms[f.mois]} ${f.annee}`);
                const body = encodeURIComponent(`Bonjour,\n\nVeuillez trouver ci-joint la facture ${f.id} pour la période ${moisNoms[f.mois]} ${f.annee}.\n\n— Forfait mensuel : ${f.montantForfait.toLocaleString('fr-FR')} € HT\n— Part variable : ${f.montantVariable.toLocaleString('fr-FR')} € HT\n— Total HT : ${f.total.toLocaleString('fr-FR')} €\n— TVA (20%) : ${tva.toLocaleString('fr-FR')} €\n— Total TTC : ${ttc.toLocaleString('fr-FR')} €\n\nConditions : paiement à 30 jours.\n\nCordialement,\nYilmaz — Services Partagés\nGroup OY`);
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, '_blank');
              };

              return (
                <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300}} onClick={() => setFactIntPreview(null)}>
                  <div style={{background:$bgCard, borderRadius:crmRd, width:'100%', maxWidth:720, maxHeight:'92vh', overflowY:'auto', boxShadow:'0 24px 80px rgba(0,0,0,0.2)', border:`1px solid ${$border}`}} onClick={e => e.stopPropagation()}>
                    {/* Modal header */}
                    <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:$bgCard, zIndex:2, borderRadius:'20px 20px 0 0'}}>
                      <div>
                        <div style={{fontSize:'1.1rem', fontWeight:800, color: factIntStyle==='noir' ? '#1a1a1a' : '#8B6F47'}}>▫ Facture {f.id}</div>
                        <div style={{fontSize:'0.85rem', color:$textMut, display:'flex', alignItems:'center', gap:8}}>
                          {moisNoms[f.mois]} {f.annee} — {f.filiale}
                          <div style={{display:'flex', borderRadius:crmRd, overflow:'hidden', border:'1px solid #e0e0e0', marginLeft:6}}>
                            <button onClick={() => setFactIntStyle('noir')} style={{padding:'2px 8px', fontSize:'0.72rem', fontWeight:700, border:'none', cursor:'pointer', background: factIntStyle==='noir' ? '#1a1a1a' : '#f5f5f5', color: factIntStyle==='noir' ? 'white' : '#999'}}>NOIR</button>
                            <button onClick={() => setFactIntStyle('groupoy')} style={{padding:'2px 8px', fontSize:'0.72rem', fontWeight:700, border:'none', cursor:'pointer', background: factIntStyle==='groupoy' ? '#8B6F47' : '#f5f5f5', color: factIntStyle==='groupoy' ? 'white' : '#999'}}>OY</button>
                          </div>
                        </div>
                      </div>
                      <div style={{display:'flex', gap:8}}>
                        <button onClick={handleEmail} style={{padding:'8px 14px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:'#2563eb', fontWeight:600, fontSize:'0.88rem', cursor:'pointer'}}>📧 Email</button>
                        <button onClick={handlePrint} style={{padding:'8px 14px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$accent, fontWeight:600, fontSize:'0.88rem', cursor:'pointer'}}>🖨️ Imprimer</button>
                        <button onClick={() => setFactIntPreview(null)} style={{padding:'8px 12px', borderRadius:crmRd, border:'none', background:$bgSub, color:$textSec, fontWeight:700, fontSize:'0.95rem', cursor:'pointer'}}>✕</button>
                      </div>
                    </div>

                    {/* Invoice preview - A4 */}
                    <div id="facture-print-zone" style={{padding:'36px 36px 28px', background:$bgCard, minHeight:500, position:'relative'}}>
                      <div style={{height:5, background: factIntStyle==='noir' ? '#1a1a1a' : 'linear-gradient(90deg,#8B6F47,#c9b896,#8B6F47)', margin:'-36px -36px 24px -36px'}}></div>
                      {/* En-tête */}
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:32}}>
                        <div>
                          <div style={{fontSize:'1.4rem', fontWeight:800, color: factIntStyle==='noir' ? '#1a1a1a' : '#8B6F47'}}>◆ YILMAZ</div>
                          <div style={{fontSize:'0.82rem', color: factIntStyle==='noir' ? '#888' : '#b0a08a', lineHeight:1.8}}>Services Partagés — Group OY<br/>12 rue de l'Industrie, 67190 Mutzig<br/>SIRET : XXX XXX XXX XXXXX</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:2, color: factIntStyle==='noir' ? '#999' : '#b0a08a', fontWeight:600}}>Facture</div>
                          <div style={{fontSize:'1.2rem', fontWeight:800, color: factIntStyle==='noir' ? '#1a1a1a' : '#8B6F47'}}>{f.id}</div>
                          <div style={{fontSize:'0.85rem', color: factIntStyle==='noir' ? '#666' : '#6b5d4d', marginTop:4}}>Date : {f.dateCreation}</div>
                          <div style={{fontSize:'0.85rem', color:$textSec}}>Période : {moisNoms[f.mois]} {f.annee}</div>
                          <div style={{marginTop:6}}><span style={{fontSize:'0.75rem', padding:'3px 10px', borderRadius:crmRd, background: st.bg, color: st.color, fontWeight:600}}>{st.label}</span></div>
                        </div>
                      </div>

                      {/* Parties */}
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:28}}>
                        <div style={{padding:16, background: factIntStyle==='noir' ? 'white' : '#faf8f5', borderRadius:crmRd, border: factIntStyle==='noir' ? '1px solid #e5e5e5' : `1px solid ${$border}`}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:1.5, color: factIntStyle==='noir' ? '#999' : '#b0a08a', fontWeight:700, marginBottom:6}}>Émetteur</div>
                          <div style={{fontSize:'0.9rem', fontWeight:700, color:'#1a1a1a'}}>YILMAZ SAS</div>
                          <div style={{fontSize:'0.85rem', color:'#666', lineHeight:1.6}}>Services Partagés<br/>Group OY<br/>12 rue de l'Industrie<br/>67190 Mutzig</div>
                        </div>
                        <div style={{padding:16, background: factIntStyle==='noir' ? 'white' : '#faf8f5', borderRadius:crmRd, border: factIntStyle==='noir' ? '1px solid #e5e5e5' : `1px solid ${$border}`}}>
                          <div style={{fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:1.5, color: factIntStyle==='noir' ? '#999' : '#b0a08a', fontWeight:700, marginBottom:6}}>Destinataire</div>
                          <div style={{fontSize:'0.9rem', fontWeight:700, color:'#1a1a1a'}}>{f.filiale}</div>
                          <div style={{fontSize:'0.85rem', color:'#666', lineHeight:1.6}}>Filiale Group OY<br/>67190 Mutzig</div>
                        </div>
                      </div>

                      {/* Services */}
                      <div style={{marginBottom:20}}>
                        <div style={{fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:1.5, color: factIntStyle==='noir' ? '#999' : '#b0a08a', fontWeight:700, marginBottom:8}}>Services fournis</div>
                        <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                          {(f.services||[]).map(sId => {
                            const svc = servicesYilmaz.find(s => s.id === sId);
                            if (!svc) return null;
                            return factIntStyle==='noir'
                              ? <span key={sId} style={{padding:'4px 12px', borderRadius:crmRd, background:'#f0f0f0', border:'1px solid #e0e0e0', color:$text, fontSize:'0.8rem', fontWeight:600}}>{svc.label}</span>
                              : <span key={sId} style={{padding:'4px 10px', borderRadius:crmRd, background:`${svc.color}12`, color: svc.color, fontSize:'0.82rem', fontWeight:600}}>{svc.icon} {svc.label}</span>;
                          })}
                        </div>
                      </div>

                      {/* Objet */}
                      <div style={{background: factIntStyle==='noir' ? '#f7f7f7' : '#fef9e7', border: factIntStyle==='noir' ? '1px solid #e5e5e5' : `1px solid ${$border}`, borderRadius:crmRd, padding:'10px 16px', marginBottom:20, fontSize:'0.88rem', color: factIntStyle==='noir' ? '#444' : '#92400e'}}>
                        <strong>Objet :</strong> Prestations de services partagés YILMAZ pour la période de {moisNoms[f.mois]} {f.annee}
                      </div>

                      {/* Tableau montants */}
                      <table style={{width:'100%', borderCollapse:'collapse', marginBottom:24}}>
                        <thead>
                          <tr style={{background: factIntStyle==='noir' ? 'transparent' : '#faf8f5'}}>
                            <th style={{position:'relative',padding:'12px 14px', textAlign:'left', fontSize:'0.82rem', fontWeight:600, color: factIntStyle==='noir' ? '#999' : '#b0a08a', borderBottom: factIntStyle==='noir' ? '2px solid #1a1a1a' : '2px solid #f0ebe3'}}>Désignation<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                            <th style={{position:'relative',padding:'12px 14px', textAlign:'right', fontSize:'0.82rem', fontWeight:600, color: factIntStyle==='noir' ? '#999' : '#b0a08a', borderBottom: factIntStyle==='noir' ? '2px solid #1a1a1a' : '2px solid #f0ebe3'}}>Montant HT<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`, fontSize:'0.92rem'}}>Forfait mensuel — Services partagés YILMAZ</td>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`, textAlign:'right', fontWeight:600, fontSize:'0.95rem'}}>{f.montantForfait.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`, fontSize:'0.92rem'}}>Part variable — {cfg ? cfg.tauxVariable : 3}% du CA annuel (prorata mensuel)</td>
                            <td style={{padding:'12px 14px', borderBottom:`1px solid ${$border}`, textAlign:'right', fontWeight:600, color:'#7c3aed', fontSize:'0.95rem'}}>{f.montantVariable.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr style={{background:$success+'12'}}>
                            <td style={{padding:'12px 14px', fontWeight:700, fontSize:'0.95rem', borderBottom:`1px solid ${$border}`}}>Total HT</td>
                            <td style={{padding:'12px 14px', textAlign:'right', fontWeight:700, fontSize:'0.95rem', borderBottom:`1px solid ${$border}`}}>{f.total.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr>
                            <td style={{padding:'12px 14px', fontSize:'0.92rem', color:$textSec, borderBottom:`1px solid ${$border}`}}>TVA (20%)</td>
                            <td style={{padding:'12px 14px', textAlign:'right', fontSize:'0.95rem', color: factIntStyle==='noir' ? '#888' : '#6b5d4d', borderBottom:'1px solid #eee'}}>{tva.toLocaleString('fr-FR')} €</td>
                          </tr>
                          <tr style={{background:'#dcfce7'}}>
                            <td style={{padding:'14px', fontWeight:800, fontSize:'0.95rem', color: factIntStyle==='noir' ? 'white' : '#059669', background: factIntStyle==='noir' ? '#1a1a1a' : '#dcfce7', borderRadius: factIntStyle==='noir' ? '6px 0 0 6px' : 0}}>TOTAL TTC</td>
                            <td style={{padding:'14px', textAlign:'right', fontWeight:800, fontSize:'1.15rem', color: factIntStyle==='noir' ? 'white' : '#059669', background: factIntStyle==='noir' ? '#1a1a1a' : '#dcfce7', borderRadius: factIntStyle==='noir' ? '0 6px 6px 0' : 0}}>{ttc.toLocaleString('fr-FR')} €</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Conditions de paiement */}
                      <div style={{padding:'12px 16px', background: factIntStyle==='noir' ? 'white' : '#faf8f5', borderRadius:crmRd, border: factIntStyle==='noir' ? '1px solid #e5e5e5' : `1px solid ${$border}`, marginBottom:12}}>
                        <div style={{fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:1.5, color: factIntStyle==='noir' ? '#999' : '#b0a08a', fontWeight:700, marginBottom:6}}>Conditions de paiement</div>
                        <div style={{fontSize:'0.8rem', color: factIntStyle==='noir' ? '#666' : '#6b5d4d', lineHeight:1.8}}>
                          Règlement à 30 jours date de facture par virement bancaire.<br/>
                          Pénalités de retard : 3× le taux d'intérêt légal — Pas d'escompte — Indemnité recouvrement : 40 €
                        </div>
                      </div>

                      {/* RIB */}
                      <div style={{padding:'10px 16px', background: factIntStyle==='noir' ? '#f7f7f7' : '#eff6ff', borderRadius:crmRd, border: factIntStyle==='noir' ? '1px solid #e5e5e5' : '1px solid #bfdbfe', marginBottom:16}}>
                        <div style={{fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:1.5, color: factIntStyle==='noir' ? '#999' : '#3b82f6', fontWeight:700, marginBottom:4}}>Coordonnées bancaires</div>
                        <div style={{fontSize:'0.8rem', color: factIntStyle==='noir' ? '#1a1a1a' : '#1e40af', fontFamily:'monospace'}}>IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX &nbsp;&nbsp; BIC : XXXXXXXX</div>
                      </div>

                      {/* Footer */}
                      <div style={{borderTop: factIntStyle==='noir' ? '1px solid #e0e0e0' : '2px solid #f0ebe3', paddingTop:12, fontSize:'0.7rem', color: factIntStyle==='noir' ? '#aaa' : '#b0a08a', textAlign:'center', lineHeight:2}}>
                        <div style={{fontWeight:700, color: factIntStyle==='noir' ? '#1a1a1a' : '#8B6F47', fontSize:'0.75rem', marginBottom:2}}>YILMAZ SAS — Services Partagés du Group OY</div>
                        RCS Saverne — SIRET : XXX XXX XXX XXXXX — TVA : FR XX XXX XXX XXX<br/>
                        12 rue de l'Industrie, 67190 Mutzig
                      </div>
                    </div>

                    {/* Bottom actions */}
                    <div style={{padding:'16px 24px', borderTop:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center', background:$bgSub, borderRadius:'0 0 20px 20px', flexWrap:'wrap', gap:10}}>
                      <div style={{display:'flex', gap:6, alignItems:'center'}}>
                        <select value={f.statut} onChange={e => { updateFacture(f.id, 'statut', e.target.value); setFactIntPreview({...f, statut: e.target.value}); }} style={{padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', cursor:'pointer', background:$bgCard}}>
                          <option value="brouillon">✎ Brouillon</option>
                          <option value="envoyee">↥ Envoyée</option>
                          <option value="payee">✓ Payée</option>
                          <option value="retard">▲ En retard</option>
                        </select>
                        <div style={{display:'flex', borderRadius:crmRd, overflow:'hidden', border:`1px solid ${$borderAlt}`}}>
                          <button onClick={() => setFactIntStyle('noir')} style={{padding:'5px 12px', border:'none', fontSize:'0.8rem', fontWeight:700, cursor:'pointer', background: factIntStyle==='noir' ? '#1a1a1a' : 'white', color: factIntStyle==='noir' ? 'white' : '#999', transition:'all 0.2s'}}>⬛ Noir</button>
                          <button onClick={() => setFactIntStyle('groupoy')} style={{padding:'5px 12px', border:'none', borderLeft:`1px solid ${$borderAlt}`, fontSize:'0.8rem', fontWeight:700, cursor:'pointer', background: factIntStyle==='groupoy' ? '#8B6F47' : 'white', color: factIntStyle==='groupoy' ? 'white' : '#999', transition:'all 0.2s'}}>◆ Group OY</button>
                        </div>
                      </div>
                      <div style={{display:'flex', gap:8}}>
                        <button onClick={handleEmail} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #2563eb, #1d4ed8)', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>📧 Envoyer par email</button>
                        <button onClick={handlePrint} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background: factIntStyle==='noir' ? 'linear-gradient(135deg, #1a1a1a, #333)' : 'linear-gradient(135deg, #8B6F47, #6b5535)', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>🖨️ Télécharger & Imprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        );
}
