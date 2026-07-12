// === Onglet « dashboard » — extrait de App.jsx (modularisation, forme iife) ===
import { AO_RAW } from '../data/ao.js';
import { SERVICES } from '../data/constants.js';
import { CRM_FIL_ACC, CRM_FIL_ICONS, CRM_FIL_NAMES } from '../data/theme.js';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TabDashboard(__props) {
  const { $accent, $bg, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $shadow, $success, $text, $textMut, $textSec, $warn, SERVICES_CONFIG, WidgetErrorBoundary, ajouterFiliale, amortissements, appelsOffres, ca, calculsFiliales, chantiers, collaborateurs, crmRd, dashGroupeVue, dashSettingsOpen, dashWidgetOrder, dashWidgetSizes, dashWidgets, dashboardChantierId, dashboardCollabId, dashboardFiliale, dashboardVue, dataEvolutionCA, defaultAnnees, defaultWidgetOrder, donneesAnneeActive, donneesAnneesSupp, donneesDragOverIdx, donneesFilialeOrder, donneesFinancieres, dragOverWidget, dragWidget, employes, emptyChantier, emptyEmploye, filNom, filiales, filialesDynamiques, filialesEnrichies, fraisInternes, getAlerts, getChantiersCollab, getDonnee, getEmployesFiliale, getKpiFiliale, handleDonneesDrop, handleSettingsDrop, handleWidgetDrop, hiddenServicesYilmaz, impots, isDragging, margeBrute, modalFilialeOuvert, navEntreprise, nbFiliales, niveau, nouvelleFiliale, pennylaneApiKey, pennylaneError, pennylaneStatus, resultatExploitation, resultatNet, setChantierForm, setCollabDetailTab, setCollabFiltreFiliale, setCollabOngletId, setConfirmDelete, setDashGroupeVue, setDashSettingsOpen, setDashWidgetOrder, setDashWidgets, setDashboardChantierId, setDashboardCollabId, setDashboardFiliale, setDashboardVue, setDonnee, setDonneesAnneeActive, setDonneesAnneesSupp, setDonneesDragIdx, setDonneesDragOverIdx, setDragOverWidget, setDragWidget, setEmployeForm, setModalChantier, setModalEmploye, setModalFilialeOuvert, setNavService, setNouvelleFiliale, setOngletActif, setPennylaneApiKey, setPennylaneError, setPennylaneStatus, setSettingsDragIdx, setSettingsDragOverIdx, setYilmazVue, settingsDragIdx, settingsDragOverIdx, showBorderAccent, sousTraitance, toggleWidget, toggleWidgetSize, totalEffectif, widgetDescriptions, widgetLabels, yilmazVue } = __props;
          const allFiliales = filialesEnrichies;
          const holdings = allFiliales.filter(f => f.holding === 'GROUP OY');
          const getChildren = (holdingNom) => allFiliales.filter(f => f.holding === holdingNom);
          const activeFiliale = dashboardFiliale ? allFiliales.find(f => f.id === dashboardFiliale) : null;
          const isHolding = activeFiliale && activeFiliale.holding === 'GROUP OY';
          const holdingChildren = isHolding ? getChildren(activeFiliale.nom) : [];
          
          return (
          <div style={{background:$bg, margin:'0 -28px', padding:'1rem 28px', minHeight:'calc(100vh - 120px)', borderRadius:0}}>
          <div style={{maxWidth:1200, margin:'0 auto'}}>

            {isHolding && (() => {
              const children = holdingChildren;
              const hTotalCA = children.reduce((s, f) => s + f.ca, 0);
              const hTotalEffectif = employes.filter(e => children.some(c => c.id === Number(e.filialeId)) && (e.statut||'actif') !== 'ancien' && (e.statut||'actif') !== 'inactif').length;
              const hChantiers = chantiers.filter(ch => children.some(c => c.id === ch.filialeId));
              const getKpiH = (f) => { const k = calculsFiliales.find(c => c.id === f.id); return k || { ebe: 0, margeBrutePct: f.margeBrutePct, beneficeNet: 0 }; };
              const hDataEvolution = children.length > 0 && children[0].historique ? children[0].historique.map((_, i) => ({ annee: children[0].historique[i]?.annee, ca: children.reduce((s, f) => s + (f.historique?.[i]?.ca || 0), 0), ebe: children.reduce((s, f) => s + (f.historique?.[i]?.ebe || 0), 0) })) : [];
              return (<>
                <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,marginBottom:24,color:$text,display:'flex',alignItems:'center',gap:10}}>{activeFiliale.icon} Tableau de Bord — {activeFiliale.nom}</h1>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28}}>
                  <div style={{background:$bgCard, borderRadius:crmRd, padding:28, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                    <h3 style={{fontSize:'1.1rem', fontWeight:700, color:$text, marginBottom:20, display:'flex', alignItems:'center', gap:8}}>▦ Vue d'ensemble</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:12}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}><span style={{color:$textSec}}>Filiales :</span><span style={{fontWeight:700, color:$accent, fontSize:'1.1rem'}}>{children.length}</span></div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}><span style={{color:$textSec}}>Collaborateurs :</span><span style={{fontWeight:700, color:$accent, fontSize:'1.1rem'}}>{hTotalEffectif}</span></div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}><span style={{color:$textSec}}>Chantiers :</span><span style={{fontWeight:700, color:$accent, fontSize:'1.1rem'}}>{hChantiers.length}</span></div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}><span style={{color:$textSec}}>CA Total :</span><span style={{fontWeight:700, color:$accent, fontSize:'1.1rem'}}>{(hTotalCA/1000000).toFixed(1)}M €</span></div>
                    </div>
                  </div>
                  <div style={{background:$bgCard, borderRadius:crmRd, padding:28, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                    <h3 style={{fontSize:'1.1rem', fontWeight:700, color:$text, marginBottom:20, display:'flex', alignItems:'center', gap:8}}>◆ Structure {activeFiliale.nom}</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:12}}>
                      <div style={{background:$bgSub, borderRadius:crmRd, padding:'12px 16px', borderLeft:showBorderAccent?'4px solid #8B6F47':'none'}}><div style={{fontWeight:700, color:$text}}>{activeFiliale.nom} <span style={{fontWeight:400, color:$textMut}}>(Holding)</span></div><div style={{fontSize:'0.92rem', color:$textSec}}>{activeFiliale.activite}</div></div>
                      {children.map(f => (<div key={f.id} onClick={() => setDashboardFiliale(f.id)} style={{background:$bgSub, borderRadius:crmRd, padding:'12px 16px', borderLeft:showBorderAccent?'4px solid #c9b896':'none', marginLeft:16, cursor:'pointer', transition:'all 0.2s'}} onMouseOver={e=>e.currentTarget.style.background=$bgSub} onMouseOut={e=>e.currentTarget.style.background=$bgSub}><div style={{fontWeight:700, color:$text}}>{f.icon} {f.nom}</div><div style={{fontSize:'0.92rem', color:$textSec}}>→ {f.activite}</div></div>))}
                    </div>
                  </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, marginBottom:28}}>
                  {children.map(f => { const kpi = getKpiH(f); return (
                    <div key={f.id} onClick={() => setDashboardFiliale(f.id)} style={{background:$bgCard, borderRadius:crmRd, padding:24, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', cursor:'pointer', transition:'all 0.3s'}} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor='#c9b896';}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.03)';e.currentTarget.style.borderColor=$border;}}>
                      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}><span style={{fontSize:'2rem'}}>{f.icon}</span><div><div style={{fontWeight:700, color:$text}}>{f.nom}</div><div style={{fontSize:'0.82rem', color:$textMut}}>{f.holding}</div></div></div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:'0.95rem'}}>
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'8px 12px'}}><div style={{fontSize:'0.82rem', color:$textMut}}>CA</div><div style={{fontWeight:700, color:$accent}}>{(f.ca/1000000).toFixed(1)}M€</div></div>
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'8px 12px'}}><div style={{fontSize:'0.82rem', color:$textMut}}>EBE</div><div style={{fontWeight:700, color:$textSec}}>{(kpi.ebe/1000000).toFixed(2)}M€</div></div>
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'8px 12px'}}><div style={{fontSize:'0.82rem', color:$textMut}}>Marge brute</div><div style={{fontWeight:700, color:$accent}}>{kpi.margeBrutePct}%</div></div>
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'8px 12px'}}><div style={{fontSize:'0.82rem', color:$textMut}}>Effectif</div><div style={{fontWeight:700, color:$textSec}}>{f.effectif}</div></div>
                      </div>
                      <div style={{fontSize:'0.82rem', textAlign:'center', marginTop:12, color:$accent, fontWeight:600}}>Cliquer pour voir les détails →</div>
                    </div>); })}
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28}}>
                  <div style={{background:$bgCard, borderRadius:crmRd, padding:28, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}><h3 style={{fontSize:'1rem', fontWeight:700, color:$text, marginBottom:20}}>↗ Évolution CA & EBE (M€)</h3><ResponsiveContainer width="100%" height={300}><AreaChart data={hDataEvolution}><defs><linearGradient id="hGradCA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B6F47" stopOpacity={0.15}/><stop offset="95%" stopColor="#8B6F47" stopOpacity={0}/></linearGradient><linearGradient id="hGradEBE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c9b896" stopOpacity={0.15}/><stop offset="95%" stopColor="#c9b896" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" /><XAxis dataKey="annee" tick={{fontSize:11, fill:'#b0a08a'}} axisLine={{stroke:'#f0ebe3'}} tickLine={false} /><YAxis tick={{fontSize:11, fill:'#b0a08a'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', padding:'10px 14px'}} formatter={(v) => `${v.toFixed(1)}M€`} /><Legend wrapperStyle={{fontSize:11, paddingTop:8}} /><Area type="monotone" dataKey="ca" stroke="#8B6F47" strokeWidth={3} fill="url(#hGradCA)" name="CA" dot={{r:5, fill:'#8B6F47', strokeWidth:2, stroke:'white'}} activeDot={{r:8, stroke:'#8B6F47', strokeWidth:2, fill:'white'}} /><Area type="monotone" dataKey="ebe" stroke="#c9b896" strokeWidth={2} strokeDasharray="5 5" fill="url(#hGradEBE)" name="EBE" dot={{r:4, fill:'#c9b896', strokeWidth:2, stroke:'white'}} activeDot={{r:7, stroke:'#c9b896', strokeWidth:2, fill:'white'}} /></AreaChart></ResponsiveContainer></div>
                  <div style={{background:$bgCard, borderRadius:crmRd, padding:28, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}><h3 style={{fontSize:'1rem', fontWeight:700, color:$text, marginBottom:20}}>▪ CA par Filiale (M€)</h3><ResponsiveContainer width="100%" height={300}><BarChart data={children.map(f => ({nom: f.nom, ca: f.ca/1000000}))}><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" /><XAxis dataKey="nom" tick={{fontSize:11, fill:'#b0a08a'}} axisLine={{stroke:'#f0ebe3'}} tickLine={false} /><YAxis tick={{fontSize:11, fill:'#b0a08a'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', padding:'10px 14px'}} formatter={(v) => `${v.toFixed(1)}M€`} /><Bar dataKey="ca" fill="#8B6F47" name="CA" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', background:'#fefdfb'}}><h3 style={{fontSize:'1rem', fontWeight:700, color:$text}}>▪ Filiales de {activeFiliale.nom} ({children.length})</h3></div>
                  <table style={{width:'100%', fontSize:'0.95rem', borderCollapse:'collapse'}}><thead><tr style={{background:$accent, color:'white'}}><th style={{position:'relative',padding:'12px 16px', textAlign:'left', fontSize:'0.92rem', fontWeight:600}}>Nom<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px', textAlign:'left', fontSize:'0.92rem', fontWeight:600}}>CA<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px', textAlign:'center', fontSize:'0.92rem', fontWeight:600}}>Marge Brute<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px', textAlign:'right', fontSize:'0.92rem', fontWeight:600}}>EBE<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px', textAlign:'right', fontSize:'0.92rem', fontWeight:600}}>Rés. Net<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px', textAlign:'right', fontSize:'0.92rem', fontWeight:600}}>Effectif<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></tr></thead>
                  <tbody>
                    {children.map(f => { const kpi = getKpiH(f); return (<tr key={f.id} onClick={() => setDashboardFiliale(f.id)} style={{borderTop:`1px solid ${$border}`, cursor:'pointer', transition:'all 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'12px 16px', fontWeight:600, color:$text}}>{f.icon} {f.nom}</td><td style={{padding:'12px 16px', fontWeight:700, color:'#059669'}}>{(f.ca/1000000).toFixed(1)}M€</td><td style={{padding:'12px 16px', textAlign:'center', fontWeight:600, color:$text}}>{kpi.margeBrutePct}%</td><td style={{padding:'12px 16px', textAlign:'right', fontWeight:700, color:'#2563eb'}}>{(kpi.ebe/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px', textAlign:'right', fontWeight:700, color: kpi.beneficeNet >= 0 ? '#059669' : '#dc2626'}}>{(kpi.beneficeNet/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px', textAlign:'right', fontWeight:600, color:$text}}>{f.effectif}</td></tr>); })}
                    <tr style={{background:$accent, color:'white', fontWeight:700}}><td style={{padding:'12px 14px'}}>TOTAL {activeFiliale.nom.toUpperCase()}</td><td style={{padding:'12px 14px'}}>{(hTotalCA/1000000).toFixed(1)}M€</td><td style={{padding:'12px 16px', textAlign:'center'}}>—</td><td style={{padding:'12px 16px', textAlign:'right'}}>{(children.reduce((s,f) => s + (getKpiH(f).ebe||0), 0)/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px', textAlign:'right'}}>{(children.reduce((s,f) => s + (getKpiH(f).beneficeNet||0), 0)/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px', textAlign:'right'}}>{children.reduce((s,f) => s + f.effectif, 0)}</td></tr>
                  </tbody></table>
                </div>
              </>);
            })()}

            {dashboardFiliale === 'yilmaz' && (() => {
              const filialesOp = filialesEnrichies.filter(f => f.holding !== 'GROUP OY');
              const allKpis = filialesOp.map(f => ({...f, kpi: getKpiFiliale(f)}));
              const totCA = allKpis.reduce((s,f) => s+f.kpi.ca, 0);
              const totMB = allKpis.reduce((s,f) => s+f.kpi.margeBrute, 0);
              const totEBE = allKpis.reduce((s,f) => s+f.kpi.ebe, 0);
              const totRN = allKpis.reduce((s,f) => s+f.kpi.resultatNet, 0);
              const yilmazEmps = employes.filter(e => !e.filialeId || e.service === 'RH' || e.service === 'FIN' || e.service === 'DIR' || e.service === 'IT');
              const totalMasseSalCalc = employes.reduce((s,e) => s + (e.salaireFix||0) + (e.primeFix||0) + (e.variable||0), 0);
              const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
              const gradMap = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};
              const visibleSvcs = SERVICES_CONFIG.yilmaz.services.filter(s => !hiddenServicesYilmaz.includes(s.id));
              const hiddenSvcs = SERVICES_CONFIG.yilmaz.services.filter(s => hiddenServicesYilmaz.includes(s.id));
              return (<>
              {/* YILMAZ HEADER BAR */}
              <div style={{background:'linear-gradient(90deg, #2d2d2d 0%, #b0b0b0 100%)', borderRadius:crmRd, padding:'14px 24px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:48, height:48, borderRadius:crmRd, background:'#2d2d2d', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', boxShadow:'0 4px 12px rgba(0,0,0,0.15)', border:'3px solid white'}}>▪</div>
                  <div>
                    <div style={{fontSize:'1.05rem', fontWeight:800, color:'white', letterSpacing:'-0.3px'}}>Yilmaz — Services Partagés</div>
                    <div style={{fontSize:'0.78rem', color:'rgba(255,255,255,0.6)', marginTop:1}}>Fonctions support mutualisées pour l'ensemble du Group OY</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:6}}>
                  {[{key:'widgets', label:'▦ Widgets'}, {key:'services', label:'▪ Services'}, {key:'groupe', label:'◆ Group'}].map(tab => (
                    <button key={tab.key} onClick={() => { if (tab.key === 'groupe') { setDashboardFiliale(null); return; } setYilmazVue(tab.key); }}
                      style={{padding:'6px 14px', borderRadius:crmRd, fontSize:'0.85rem', fontWeight:700, border:'1px solid rgba(255,255,255,0.2)', background: yilmazVue === tab.key ? 'rgba(255,255,255,0.2)' : 'transparent', color:'white', cursor:'pointer', transition:'all 0.2s'}}
                      onMouseOver={e => { if (yilmazVue !== tab.key) e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
                      onMouseOut={e => { if (yilmazVue !== tab.key) e.currentTarget.style.background='transparent'; }}
                    >{tab.label}</button>
                  ))}
                </div>
              </div>

              {/* KPI SUMMARY CARDS */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, marginBottom:28}}>
                {[
                  {icon:'▪', label:'SERVICES', value: visibleSvcs.length, sub: hiddenSvcs.length > 0 ? `+${hiddenSvcs.length} à venir` : '', color:$text},
                  {icon:'◉', label:'COLLABORATEURS', value: yilmazEmps.length, sub: `sur ${employes.length} total groupe`, color:$accent},
                  {icon:'◆', label:'FILIALES SERVIES', value: filialesDynamiques.filter(f => f.holding !== 'GROUP OY').length, sub:'opérationnelles', color:'#059669'},
                  {icon:'€', label:'MASSE SALARIALE', value: fmt(totalMasseSalCalc), sub: totCA > 0 ? `${(totalMasseSalCalc/totCA*100).toFixed(1)}% du CA` : '', color:'#d97706'}
                ].map((kpi,i) => (
                  <div key={i} style={{background:$bgCard, borderRadius:crmRd, padding:'20px 22px', border:`1px solid ${$border}`, boxShadow:'0 2px 12px rgba(0,0,0,0.03)'}}>
                    <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:10}}>
                      <span style={{fontSize:'1rem'}}>{kpi.icon}</span>
                      <span style={{fontSize:'0.78rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.5px'}}>{kpi.label}</span>
                    </div>
                    <div style={{fontSize:'1.8rem', fontWeight:800, color:kpi.color}}>{kpi.value}</div>
                    {kpi.sub && <div style={{fontSize:'0.8rem', color:$textMut, marginTop:4}}>{kpi.sub}</div>}
                  </div>
                ))}
              </div>

              {yilmazVue === 'widgets' && (<>
              {/* RÉSULTAT FINANCIER GROUPE */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24, overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>💹</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Résultat Financier Group — {donneesAnneeActive}</span>
                  </div>
                  <span style={{fontSize:'0.78rem', color:$textMut}}>Source : Centre de Données</span>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:0}}>
                  {[
                    {icon:'▦', label:'CA GROUPE', value:totCA, sub:donneesAnneeActive, color:'#059669'},
                    {icon:'↗', label:'MARGE BRUTE', value:totMB, sub:totCA>0?`${(totMB/totCA*100).toFixed(1)}% du CA`:'', color:'#7c3aed'},
                    {icon:'💎', label:'EBE GROUPE', value:totEBE, sub:totCA>0?`${(totEBE/totCA*100).toFixed(1)}% du CA`:'', color: totEBE >= 0 ? '#2563eb' : '#dc2626'},
                    {icon:'🏆', label:'RÉSULTAT NET', value:totRN, sub:totCA>0?`${(totRN/totCA*100).toFixed(1)}% du CA`:'', color:totRN>=0?'#059669':'#dc2626'},
                    {icon:'€', label:'MASSE SALARIALE TOTALE', value:totalMasseSalCalc, sub:totCA>0?`${(totalMasseSalCalc/totCA*100).toFixed(1)}% du CA`:'', color:'#d97706'}
                  ].map((item,i) => (
                    <div key={i} style={{padding:'22px 20px', borderRight: i < 4 ? `1px solid ${$border}` : 'none'}}>
                      <div style={{display:'flex', alignItems:'center', gap:5, marginBottom:8}}>
                        <span style={{fontSize:'0.95rem'}}>{item.icon}</span>
                        <span style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>{item.label}</span>
                      </div>
                      <div style={{fontSize:'1.4rem', fontWeight:800, color:item.color}}>{fmt(item.value)}</div>
                      {item.sub && <div style={{fontSize:'0.78rem', color:$textMut, marginTop:4}}>{item.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* FILIALES OPÉRATIONNELLES */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24, overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>◆</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Filiales Opérationnelles</span>
                    <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{allKpis.length} filiales</span>
                  </div>
                </div>
                <div style={{padding:'20px', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16}}>
                  {allKpis.map(f => {
                    const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                    const kpi = f.kpi;
                    return (
                      <div key={f.id} onClick={() => { setDashboardFiliale(f.id); }} style={{borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', cursor:'pointer', transition:'all 0.2s', boxShadow:'0 1px 8px rgba(0,0,0,0.02)'}}
                        onMouseOver={e => { e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.boxShadow='0 1px 8px rgba(0,0,0,0.02)'; e.currentTarget.style.transform='none'; }}
                      >
                        <div style={{height:5, background:`linear-gradient(90deg, ${g[0]}, ${g[1]})`}} />
                        <div style={{padding:'16px 20px'}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                            <div>
                              <div style={{fontWeight:700, color:$text, fontSize:'0.95rem'}}>{f.icon} {f.nom}</div>
                              <div style={{fontSize:'0.8rem', color:$textMut, marginTop:2}}>{f.activite}</div>
                            </div>
                            <button onClick={e => { e.stopPropagation(); setDashboardFiliale(f.id); }} style={{padding:'4px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$accent, fontSize:'0.82rem', fontWeight:600, cursor:'pointer'}}>→ Détail</button>
                          </div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8}}>
                            {[
                              {label:'CA', value:fmt(kpi.ca), color:'#059669'},
                              {label:'EBE', value:fmt(kpi.ebe), color:kpi.ebe>=0?'#2563eb':'#dc2626'},
                              {label:'RN', value:fmt(kpi.resultatNet), color:kpi.resultatNet>=0?'#059669':'#dc2626'},
                              {label:'EFFECTIF', value:kpi.effectif > 0 ? kpi.effectif : '—', color:$accent}
                            ].map((m,mi) => (
                              <div key={mi} style={{textAlign:'center', padding:'8px 4px', background:$bgSub, borderRadius:crmRd}}>
                                <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', marginBottom:4}}>{m.label}</div>
                                <div style={{fontSize:'0.95rem', fontWeight:800, color:m.color}}>{m.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RATIOS COMPARÉS */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24, overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>◺</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Ratios Financiers BTP</span>
                    <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{donneesAnneeActive}</span>
                  </div>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                    <thead><tr style={{background:$bgSub}}>
                      <th style={{position:'relative',padding:'12px 16px', textAlign:'left', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase'}}>Ratio<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      {allKpis.filter(f => f.kpi.ca > 0).map(f => <th key={f.id} style={{position:'relative',padding:'10px 8px', textAlign:'center', fontWeight:700, color:$text, fontSize:'0.82rem', minWidth:100}}>{f.icon} {f.nom}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                      <th style={{position:'relative',padding:'10px 8px', textAlign:'center', fontWeight:600, color:$accent, fontSize:'0.82rem', background:$accent+'15', minWidth:90}}>Cible BTP<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                    </tr></thead>
                    <tbody>
                      {[
                        {label:'Marge Brute %', getValue:f=>f.kpi.margeBrutePct, format:v=>v.toFixed(1)+'%', min:35, max:55},
                        {label:'EBE / CA %', getValue:f=>f.kpi.ebePct, format:v=>v.toFixed(1)+'%', min:6, max:12},
                        {label:'Résultat Net / CA %', getValue:f=>f.kpi.resultatNetPct, format:v=>v.toFixed(1)+'%', min:3, max:8},
                        {label:'CA / Collaborateur', getValue:f=>f.kpi.caParCollab/1000, format:v=>Math.round(v)+'k€', min:120, max:200},
                        {label:'Sous-traitance / CA %', getValue:f=>f.kpi.sousTraitancePct || 0, format:v=>v.toFixed(1)+'%', min:20, max:50},
                        {label:'Masse Sal. / CA %', getValue:f=>null, format:v=>v!==null?v.toFixed(1)+'%':'—', min:20, max:30}
                      ].map((b,bi) => (
                        <tr key={bi} style={{borderBottom:`1px solid ${$border}`, background:bi%2===0?'white':'#fefdfb'}}>
                          <td style={{padding:'8px 14px', fontWeight:600, color:$textSec}}>{b.label}</td>
                          {allKpis.filter(f => f.kpi.ca > 0).map(f => {
                            const val = b.getValue(f);
                            const isGood = val !== null && val >= b.min && val <= b.max;
                            const isBad = val !== null && (val < b.min * 0.7 || val > b.max * 1.3);
                            return <td key={f.id} style={{padding:'8px', textAlign:'center', fontWeight:700, color: val === null ? '#d4d0c8' : isGood ? '#059669' : isBad ? '#dc2626' : '#d97706'}}>{b.format(val)}</td>;
                          })}
                          <td style={{padding:'8px', textAlign:'center', fontSize:'0.82rem', color:$accent, background:$accent+'15', fontWeight:600}}>{b.min}–{b.max}{b.label.includes('€')?'k€':'%'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MARGE PAR CHANTIER */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24, overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>💶</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Marge par Chantier</span>
                    <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{donneesAnneeActive}</span>
                  </div>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                    <thead><tr style={{background:$bgSub}}>
                      {['Chantier','Filiale','Budget HT','Engagé','Avancmt','Budget utilisé','Marge prév.'].map(h => (
                        <th key={h} style={{position:'relative',padding:'12px 14px', textAlign:h==='Chantier'||h==='Filiale'?'left':'right', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {chantiers.filter(c => c.statut === 'En cours').sort((a,b) => b.budgetHT - a.budgetHT).map(c => {
                        const f = filialesEnrichies.find(fl => fl.id === c.filialeId);
                        const budgetPct = c.budgetHT > 0 ? Math.round(c.depense / c.budgetHT * 100) : 0;
                        const margePrevu = c.montantVente > 0 ? Math.round((c.montantVente - c.budgetHT) / c.montantVente * 100) : 0;
                        return (
                          <tr key={c.id} style={{borderBottom:`1px solid ${$border}`, cursor:'pointer'}} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                            <td style={{padding:'12px 14px', fontWeight:600, color:$text}}>{c.nom}</td>
                            <td style={{padding:'12px 14px', color:$textSec, fontSize:'0.88rem'}}>{f ? `${f.icon} ${f.nom}` : '—'}</td>
                            <td style={{padding:'12px 14px', textAlign:'right', fontWeight:600, color:'#059669'}}>{fmt(c.budgetHT)}</td>
                            <td style={{padding:'12px 14px', textAlign:'right', color:'#d97706'}}>{fmt(c.depense)}</td>
                            <td style={{padding:'12px 14px', textAlign:'right'}}>
                              <div style={{display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end'}}>
                                <div style={{width:50, height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}>
                                  <div style={{height:'100%', borderRadius:3, background:c.avancement>=80?'#22c55e':c.avancement>=40?'#f59e0b':'#3b82f6', width:c.avancement+'%'}} />
                                </div>
                                <span style={{fontSize:'0.8rem', fontWeight:600, color:$textSec}}>{c.avancement}%</span>
                              </div>
                            </td>
                            <td style={{padding:'12px 14px', textAlign:'right'}}><span style={{fontSize:'0.88rem', fontWeight:700, color:budgetPct>90?'#dc2626':budgetPct>70?'#d97706':'#059669'}}>{budgetPct}%</span></td>
                            <td style={{padding:'12px 14px', textAlign:'right'}}><span style={{fontWeight:700, color:margePrevu<5?'#dc2626':margePrevu<15?'#d97706':'#059669'}}>{margePrevu}%</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              </>)}

              {yilmazVue === 'services' && (<>
              {/* SERVICES DÉTAIL */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24, overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>📂</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Services YILMAZ — Détail</span>
                    <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{visibleSvcs.length} actifs · {hiddenSvcs.length} à venir</span>
                  </div>
                </div>
                <div style={{padding:'20px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
                  {SERVICES_CONFIG.yilmaz.services.map((svc, i) => {
                    const svcColors = {'direction':'#007ab5','finance':'#8B6F47','rh':'#059669','rh_recrutement':'#0e6655','rh_performance':'#7c3aed','it':'#6366f1','juridique':'#d97706','marketing':'#ec4899'};
                    const col = svcColors[svc.id] || '#8B6F47';
                    return (
                      <div key={svc.id} style={{borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', position:'relative'}}>
                        <div style={{height:5, background:`linear-gradient(90deg, ${col}, ${col}88)`}} />
                        {hiddenServicesYilmaz.includes(svc.id) && <div style={{position:'absolute', top:12, right:12, fontSize:'0.65rem', fontWeight:700, background: svc.hidden ? '#d97706' : '#9ca3af', color:'white', padding:'2px 8px', borderRadius:crmRd}}>{svc.hidden ? 'BIENTÔT' : 'MASQUÉ'}</div>}
                        <div style={{padding:'18px 20px'}}>
                          <div style={{fontSize:'1.5rem', marginBottom:8}}>{svc.icon}</div>
                          <div style={{fontWeight:700, color:$text, fontSize:'0.95rem', marginBottom:4}}>{svc.label}</div>
                          {svc.desc && <div style={{fontSize:'0.82rem', color:$textMut, lineHeight:1.5, marginBottom:10}}>{svc.desc}</div>}
                          <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                            {svc.modules.map(m => (
                              <span key={m} style={{fontSize:'0.7rem', padding:'2px 6px', borderRadius:crmRd, background:$bgSub, color:$accent, border:`1px solid ${$border}`, fontWeight:600}}>{m}</span>
                            ))}
                            {svc.modules.length === 0 && <span style={{fontSize:'0.7rem', color:'#d4d0c8', fontStyle:'italic'}}>En cours de développement</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ÉQUIPE YILMAZ */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'}}>
                <div style={{padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontSize:'1rem'}}>◉</span>
                    <span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Équipe YILMAZ</span>
                    <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{yilmazEmps.length} collaborateurs</span>
                  </div>
                </div>
                <div style={{padding:'16px 20px'}}>
                  {yilmazEmps.length === 0 ? (
                    <div style={{textAlign:'center', padding:40, color:$textMut}}>Aucun collaborateur YILMAZ enregistré</div>
                  ) : (
                    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:12}}>
                      {yilmazEmps.map(emp => (
                        <div key={emp.id} style={{padding:'14px 18px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, display:'flex', alignItems:'center', gap:12, cursor:'pointer'}} onClick={() => { setSelectedCollaborateur(emp); setShowModalCollaborateur(true); }}>
                          <div style={{width:40, height:40, borderRadius:crmRd, background:'linear-gradient(135deg, #8B6F47, #C49A2A)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:'0.92rem'}}>{emp.prenom?.[0]}{emp.nom?.[0]}</div>
                          <div>
                            <div style={{fontWeight:700, color:$text, fontSize:'0.98rem'}}>{emp.prenom} {emp.nom}</div>
                            <div style={{fontSize:'0.82rem', color:$textMut}}>{emp.posteExterne || emp.posteInterne || '—'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </>)}
            </>);
            })()}

            {dashboardFiliale === null && (() => {
              const filialesOp = filialesEnrichies.filter(f => f.holding !== 'GROUP OY');
              const allKpis = filialesOp.map(f => ({...f, kpi: getKpiFiliale(f)}));
              const totCA = allKpis.reduce((s,f) => s+f.kpi.ca, 0);
              const totEBE = allKpis.reduce((s,f) => s+f.kpi.ebe, 0);
              const totRN = allKpis.reduce((s,f) => s+f.kpi.resultatNet, 0);
              const totalMasseSalCalc = employes.reduce((s,e) => s + (e.salaireFix||0) + (e.primeFix||0) + (e.variable||0), 0);
              const totalMasseSal = allKpis.reduce((s,f) => s + (f.kpi.masseSalariale ?? 0), 0) || totalMasseSalCalc;
              const masseSalPct = totCA > 0 ? (totalMasseSal / totCA * 100) : 0;
              const bfrEstime = allKpis.reduce((s,f) => s + (f.kpi.bfr ?? (f.kpi.ca * 0.15)), 0);
              const tresoEstimee = allKpis.reduce((s,f) => s + (f.kpi.tresorerie ?? (f.kpi.resultatNet + f.kpi.ca * 0.02)), 0);
              const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${(v/1000).toFixed(0)}k€` : v <= -1000 ? `${(v/1000).toFixed(0)}k€` : `${v.toFixed(0)}€`; };
              const cardStyle = {background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:$shadow, overflow:'hidden'};
              const headerStyle = {padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:$bgSub};
              const titleStyle = {fontSize:'1rem', fontWeight:700, color:$text};
              const gradMap = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};
              const donutData = allKpis.filter(f => f.kpi.ca > 0).map(f => { const g = gradMap[f.nom] || ['#c9b896','#8B6F47']; return { name: f.nom, value: f.kpi.ca / 1000000, colorLight: g[0], colorDark: g[1] }; });
              const margesData = allKpis.filter(f => f.kpi.ca > 0).map(f => { const g = gradMap[f.nom] || ['#c9b896','#8B6F47']; return { name: f.nom, margeBrute: parseFloat(f.kpi.margeBrutePct.toFixed(1)), ebe: parseFloat(f.kpi.ebePct.toFixed(1)), colorLight: g[0], colorDark: g[1] }; });
              const caCollabData = allKpis.filter(f => f.kpi.effectif > 0 && f.kpi.ca > 0).map(f => { const g = gradMap[f.nom] || ['#c9b896','#8B6F47']; return { name: f.nom, caParCollab: Math.round(f.kpi.ca / f.kpi.effectif / 1000), colorLight: g[0], colorDark: g[1] }; }).sort((a,b) => b.caParCollab - a.caParCollab);
              const topChantiers = [...chantiers].filter(c => c.statut === 'En cours').sort((a,b) => b.montantVente - a.montantVente).slice(0, 5);
              const alertes = [];
              allKpis.forEach(f => { if (f.kpi.resultatNet < 0) alertes.push({type:'danger', msg:`${f.icon} ${f.nom} — Résultat net négatif (${fmt(f.kpi.resultatNet)})`, fId: f.id}); if (f.kpi.ebePct < 5 && f.kpi.ca > 0) alertes.push({type:'warning', msg:`${f.icon} ${f.nom} — EBE faible (${f.kpi.ebePct.toFixed(1)}%)`, fId: f.id}); });
              chantiers.forEach(ch => { if (ch.depense > ch.budgetHT * 0.9 && ch.avancement < 80) alertes.push({type:'danger', msg:`◆ ${ch.nom} — Budget dépassé à ${Math.round(ch.depense/ch.budgetHT*100)}% pour ${ch.avancement}% d'avancement`, fId: ch.filialeId}); if (ch.statut === 'En cours' && ch.avancement < 30) alertes.push({type:'warning', msg:`◆ ${ch.nom} — Avancement faible (${ch.avancement}%)`, fId: ch.filialeId}); });
              if (alertes.length === 0) alertes.push({type:'ok', msg:'✓ Aucune alerte — tout est en ordre !'});
              const objectifs = allKpis.filter(f => f.kpi.ca > 0).map(f => { const objectif = f.kpi.caObjectif ?? (f.kpi.ca * 1.15); return { nom: f.nom, icon: f.icon, objectif, realise: f.kpi.ca, pct: objectif > 0 ? Math.round(f.kpi.ca / objectif * 100) : 0, colorLight: (gradMap[f.nom]||['#c9b896','#8B6F47'])[0], colorDark: (gradMap[f.nom]||['#c9b896','#8B6F47'])[1] }; });
              const evolEffectif = (() => { const annees = dataEvolutionCA.map(d => d.annee); return annees.map(a => { const fin = parseInt(a); const eff = employes.filter(e => { if (!e.dateEntree) return false; return parseInt(e.dateEntree.substring(0, 4)) <= fin; }).length; return { annee: a, effectif: a === donneesAnneeActive ? totalEffectif : eff }; }); })();
              const aoEnCours = (typeof appelsOffres !== 'undefined' ? appelsOffres : []).filter(a => a.statut !== 'gagne' && a.statut !== 'perdu');
              const aoMontantTotal = aoEnCours.reduce((s,a) => s + (a.montant || 0), 0);
              const aoGagnes = (typeof appelsOffres !== 'undefined' ? appelsOffres : []).filter(a => a.statut === 'gagne');
              const aoTotal = typeof appelsOffres !== 'undefined' ? appelsOffres.length : 0;
              const tauxConversion = aoTotal > 0 ? Math.round(aoGagnes.length / aoTotal * 100) : 0;
              const ordreFilWid = ['YILMAZ', 'Ezel Bâtiment', 'La Roulotte', "L'Échafaudage", "L'Étanchéité"];
              const yilmazFees = allKpis.reduce((s,f) => s + f.kpi.ca * 0.03, 0);
              const dataCAParFilialeEnrichi = ordreFilWid.map(nom => { if (nom === 'YILMAZ') return { name: 'YILMAZ (Service Fees)', ca: yilmazFees / 1000000, colorLight: '#b0b0b0', colorDark: '#2d2d2d' }; const f = allKpis.find(fi => fi.nom === nom); if (!f) return null; const g = gradMap[f.nom] || ['#c9b896','#8B6F47']; return { name: f.nom, ca: f.kpi.ca / 1000000, colorLight: g[0], colorDark: g[1] }; }).filter(Boolean);
              const dragWrapStyle = (wKey) => { const sz = dashWidgetSizes[wKey] || 'full'; return {gridColumn: sz === 'half' ? 'span 1' : '1 / -1', position:'relative', borderRadius:crmRd, transition:'opacity 0.2s, outline 0.2s', opacity: dragWidget === wKey ? 0.4 : 1, outline: dragOverWidget === wKey && dragWidget !== wKey ? '2px dashed #8B6F47' : '2px solid transparent', outlineOffset:4}; };
              const dragHandleStyle = {position:'absolute', top:8, left:8, width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', cursor:'grab', color:'#c9b896', fontSize:'0.9rem', zIndex:5, userSelect:'none', borderRadius:crmRd, transition:'all 0.15s', opacity:0.25};
              const dragProps = (wKey) => ({ draggable: true, onDragStart: e => { e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain', wKey); setDragWidget(wKey); }, onDragEnd: () => { setDragWidget(null); setDragOverWidget(null); }, onDragOver: e => { e.preventDefault(); e.dataTransfer.dropEffect='move'; setDragOverWidget(wKey); }, onDragLeave: () => setDragOverWidget(null), onDrop: e => { e.preventDefault(); handleWidgetDrop(wKey); } });
              const yearBadge = <span style={{fontSize:'0.72rem', fontWeight:700, color:$accent, background:$accent+'15', padding:'2px 7px', borderRadius:crmRd, border:`1px solid ${$border}`, marginLeft:8, verticalAlign:'middle'}}>{donneesAnneeActive}</span>;
              const getPrevYearTotal = (field) => { const prevYear = String(Number(donneesAnneeActive) - 1); return filialesOp.reduce((s, f) => { const v = donneesFinancieres?.[f.id]?.[prevYear]?.[field] ?? donneesFinancieres?.[String(f.id)]?.[prevYear]?.[field]; return s + (v != null ? Number(v) : 0); }, 0); };
              const deltaPercent = (current, previous) => { if (!previous || previous === 0) return null; return ((current - previous) / Math.abs(previous)) * 100; };
              const deltaBadge = (current, previous) => { const d = deltaPercent(current, previous); if (d === null) return null; return <span style={{fontSize:'0.78rem', fontWeight:700, color: d > 0 ? '#059669' : d < 0 ? '#dc2626' : '#b0a08a', marginLeft:6}}>{d > 0 ? '↗+' : d < 0 ? '↘' : '→'}{d.toFixed(1)}%</span>; };
              const clickToFiliale = (fNom) => { const f = filialesEnrichies.find(fl => fl.nom === fNom); if (f) { setDashboardFiliale(f.id); } };

              const renderWidget = (key) => {
                if (dashWidgets[key] === false) return null;
                switch(key) {
                  case 'kpiCards': {
                    const prevCA = getPrevYearTotal('ca'); const prevEBE = getPrevYearTotal('ebe');
                    const cs = {background:$bgCard, borderRadius:crmRd, padding:'28px 24px', border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', transition:'all 0.3s'};
                    return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
                      {[{label:'Chiffre d\'Affaires',value:`${(totCA/1000000).toFixed(1)}M€`,icon:'€',prev:prevCA,curr:totCA},{label:'EBE Group',value:`${(totEBE/1000000).toFixed(2)}M€`,icon:'▦',prev:prevEBE,curr:totEBE,sub:totCA>0?`${(totEBE/totCA*100).toFixed(1)}% du CA`:null},{label:'Collaborateurs',value:totalEffectif,icon:'◉',sub:filialesOp.length>0?`~${Math.round(totCA/totalEffectif/1000)}k€/pers`:null},{label:'Filiales',value:nbFiliales,icon:'▪',sub:`${filialesOp.length} opérationnelles`}].map((k,i) => (
                        <div key={i} style={{...cs, cursor:k.action?'pointer':'default'}} onClick={k.action||undefined}>
                          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><div style={{fontSize:'0.88rem',color:$textMut,fontWeight:600,marginBottom:10,textTransform:'uppercase'}}>{k.icon} {k.label}</div>{yearBadge}</div>
                          <div style={{display:'flex',alignItems:'baseline',gap:6}}><div style={{fontSize:'2.2rem',fontWeight:800,color:$text}}>{k.value}</div>{k.prev>0&&deltaBadge(k.curr,k.prev)}</div>
                          {k.sub&&<div style={{fontSize:'0.82rem',color:$textMut,marginTop:6}}>{k.sub}</div>}
                        </div>))}
                    </div></div>);}
                  case 'masseSalariale': { const cs={background:$bgCard,borderRadius:crmRd,padding:'28px 24px',border:`1px solid ${$border}`,boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}; return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}><div style={cs}><div style={{fontSize:'0.88rem',color:$textMut,fontWeight:600,marginBottom:10,textTransform:'uppercase'}}>€ Masse Salariale</div><div style={{fontSize:'2.2rem',fontWeight:800,color:$text}}>{fmt(totalMasseSal)}</div></div><div style={cs}><div style={{fontSize:'0.88rem',color:$textMut,fontWeight:600,marginBottom:10,textTransform:'uppercase'}}>📉 Ratio Masse Sal. / CA</div><div style={{fontSize:'2.2rem',fontWeight:800,color:masseSalPct>30?'#dc2626':masseSalPct>25?'#d97706':'#059669'}}>{masseSalPct.toFixed(1)}%</div><div style={{fontSize:'0.82rem',color:$textMut,marginTop:6}}>Cible BTP : 20-30%</div></div></div></div>);}
                  case 'tresorerieBFR': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}><div style={{background:$bgCard,borderRadius:crmRd,padding:'28px 24px',border:`1px solid ${$border}`,cursor:'pointer'}} onClick={()=>setDashGroupeVue('donnees')}><div style={{fontSize:'0.88rem',color:$textMut,fontWeight:600,marginBottom:10,textTransform:'uppercase'}}>🏦 Trésorerie</div><div style={{fontSize:'2.2rem',fontWeight:800,color:tresoEstimee>=0?'#059669':'#dc2626'}}>{fmt(tresoEstimee)}</div></div><div style={{background:$bgCard,borderRadius:crmRd,padding:'28px 24px',border:`1px solid ${$border}`,cursor:'pointer'}} onClick={()=>setDashGroupeVue('donnees')}><div style={{fontSize:'0.88rem',color:$textMut,fontWeight:600,marginBottom:10,textTransform:'uppercase'}}>▦ BFR</div><div style={{fontSize:'2.2rem',fontWeight:800,color:'#d97706'}}>{fmt(bfrEstime)}</div></div></div></div>);
                  case 'alertes': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={titleStyle}>🚨 Alertes & Points d'attention</div><span style={{fontSize:'0.8rem',fontWeight:700,background:alertes.some(a=>a.type==='danger')?'#fef2f2':'#fffbeb',color:alertes.some(a=>a.type==='danger')?'#dc2626':'#d97706',padding:'2px 8px',borderRadius:crmRd}}>{alertes.length}</span></div></div><div style={{padding:20,display:'flex',flexDirection:'column',gap:8}}>{alertes.map((a,i)=>{const colors=a.type==='danger'?{bg:'#fef2f2',border:'#dc2626',text:'#991b1b',icon:'▲'}:a.type==='warning'?{bg:'#fffbeb',border:'#f59e0b',text:'#92400e',icon:'●'}:{bg:'#f0fdf4',border:'#059669',text:'#166534',icon:'✓'};return(<div key={i} onClick={()=>{if(a.fId)setDashboardFiliale(a.fId);}} style={{padding:'14px 18px',borderRadius:crmRd,background:colors.bg,borderLeft:`4px solid ${colors.border}`,cursor:a.fId?'pointer':'default'}}><span style={{fontSize:'0.84rem',color:colors.text}}>{colors.icon} {a.msg}</span></div>);})}</div></div></div>);
                  case 'compteResultat': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={titleStyle}>☰ Compte de Résultat Consolidé</div>{yearBadge}</div></div><div style={{padding:'12px 20px'}}>{(()=>{const totST=allKpis.reduce((s,f)=>s+f.kpi.sousTraitance,0);const totMB=allKpis.reduce((s,f)=>s+f.kpi.margeBrute,0);const totFI=allKpis.reduce((s,f)=>s+f.kpi.fraisInternes,0);const totFS=allKpis.reduce((s,f)=>s+f.kpi.fraisStructure,0);const totAmort=allKpis.reduce((s,f)=>s+f.kpi.amortissements,0);const totRE=totEBE-totAmort;const cTotImpots=totRE>0?totRE*0.25:0;const line=(label,val,opts={})=>(<div style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:opts.noBorder?'none':`1px solid ${$border}`}}><span style={{fontSize:'0.95rem',color:opts.color||'#6b5d4d',fontWeight:opts.bold?700:400,paddingLeft:opts.indent?16:0}}>{label}</span><span style={{fontSize:'0.95rem',fontWeight:opts.bold?700:600,color:opts.valColor||opts.color||'#2d2216'}}>{val}</span></div>);return <>{line('CA',fmt(totCA),{bold:true,valColor:'#059669'})}{line('− Sous-traitance',`-${fmt(totST)}`,{indent:true,color:$textMut})}{line('= Marge Brute',fmt(totMB),{bold:true,color:'#7c3aed'})}{line('− Frais internes',`-${fmt(totFI)}`,{indent:true,color:$textMut})}{line('− Frais structure',`-${fmt(totFS)}`,{indent:true,color:$textMut})}{line('= EBE',fmt(totEBE),{bold:true,color:'#2563eb'})}{line('− Amortissements',`-${fmt(totAmort)}`,{indent:true,color:$textMut})}{line('= Rés. exploitation',fmt(totRE),{bold:true})}{line('− Impôts (25%)',`-${fmt(cTotImpots)}`,{indent:true,color:$textMut})}<div style={{display:'flex',justifyContent:'space-between',padding:'14px 18px',background:$bgSub,borderRadius:crmRd,marginTop:8}}><span style={{fontWeight:800,color:$text}}>= Résultat Net</span><span style={{fontWeight:800,color:totRN>=0?'#059669':'#dc2626'}}>{fmt(totRN)}</span></div></>;})()}</div></div></div>);
                  case 'evolutionCA': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{...titleStyle,marginBottom:16}}>↗ Évolution CA & EBE (M€)</div><ResponsiveContainer width="100%" height={280}><AreaChart data={dataEvolutionCA}><defs><linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B6F47" stopOpacity={0.15}/><stop offset="95%" stopColor="#8B6F47" stopOpacity={0}/></linearGradient><linearGradient id="gradEBE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.15}/><stop offset="95%" stopColor="#059669" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis dataKey="annee" tick={{fontSize:11,fill:'#b0a08a'}}/><YAxis tick={{fontSize:11,fill:'#b0a08a'}}/><Tooltip formatter={v=>`${v.toFixed(1)}M€`}/><Legend wrapperStyle={{fontSize:11}}/><Area type="monotone" dataKey="ca" stroke="#8B6F47" strokeWidth={2.5} fill="url(#gradCA)" name="CA" dot={{r:4,fill:'#8B6F47',strokeWidth:2,stroke:'white'}}/><Area type="monotone" dataKey="ebe" stroke="#059669" strokeWidth={2} fill="url(#gradEBE)" name="EBE" strokeDasharray="5 5" dot={{r:3,fill:'#059669',strokeWidth:2,stroke:'white'}}/></AreaChart></ResponsiveContainer></div></div>);
                  case 'caParFiliale': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}><div style={titleStyle}>▪ CA par Filiale (M€)</div>{yearBadge}</div><ResponsiveContainer width="100%" height={280}><BarChart data={dataCAParFilialeEnrichi}><defs>{dataCAParFilialeEnrichi.map((entry,i)=>(<linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={entry.colorLight}/><stop offset="100%" stopColor={entry.colorDark}/></linearGradient>))}</defs><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis dataKey="name" tick={{fontSize:10,fill:'#b0a08a'}}/><YAxis tick={{fontSize:11,fill:'#b0a08a'}}/><Tooltip formatter={v=>`${v.toFixed(1)}M€`}/><Bar dataKey="ca" radius={[6,6,0,0]} name="CA" onClick={data=>clickToFiliale(data.name)}>{dataCAParFilialeEnrichi.map((e,i)=><Cell key={i} fill={`url(#barGrad${i})`} style={{cursor:'pointer'}}/>)}</Bar></BarChart></ResponsiveContainer></div></div>);
                  case 'donutCA': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}><div style={titleStyle}>🍩 Répartition CA</div>{yearBadge}</div><ResponsiveContainer width="100%" height={280}><PieChart><defs>{donutData.map((entry,i)=>(<linearGradient key={i} id={`donutGrad${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={entry.colorLight}/><stop offset="100%" stopColor={entry.colorDark}/></linearGradient>))}</defs><Pie data={donutData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} onClick={data=>clickToFiliale(data.name)}>{donutData.map((e,i)=><Cell key={i} fill={`url(#donutGrad${i})`} style={{cursor:'pointer'}}/>)}</Pie><Tooltip formatter={v=>`${v.toFixed(1)}M€`}/></PieChart></ResponsiveContainer></div></div>);
                  case 'comparatifMarges': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{...titleStyle,marginBottom:16}}>▦ Comparatif Marges (%)</div><ResponsiveContainer width="100%" height={280}><BarChart data={margesData} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis type="number" domain={[0,80]}/><YAxis dataKey="name" type="category" width={100} tick={{fontSize:10}}/><Tooltip formatter={v=>`${v}%`}/><Legend wrapperStyle={{fontSize:11}}/><Bar dataKey="margeBrute" radius={[0,4,4,0]} name="Marge Brute %" barSize={14}>{margesData.map((e,i)=><Cell key={i} fill={e.colorLight}/>)}</Bar><Bar dataKey="ebe" radius={[0,4,4,0]} name="EBE %" barSize={14}>{margesData.map((e,i)=><Cell key={i} fill={e.colorDark}/>)}</Bar></BarChart></ResponsiveContainer></div></div>);
                  case 'caParCollab': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{...titleStyle,marginBottom:16}}>◉ CA / Collaborateur (k€)</div><ResponsiveContainer width="100%" height={280}><BarChart data={caCollabData}><defs>{caCollabData.map((entry,i)=>(<linearGradient key={i} id={`collabGrad${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={entry.colorLight}/><stop offset="100%" stopColor={entry.colorDark}/></linearGradient>))}</defs><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis/><Tooltip formatter={v=>`${v}k€/pers`}/><Bar dataKey="caParCollab" radius={[6,6,0,0]} onClick={data=>clickToFiliale(data.name)}>{caCollabData.map((e,i)=><Cell key={i} fill={`url(#collabGrad${i})`} style={{cursor:'pointer'}}/>)}</Bar></BarChart></ResponsiveContainer></div></div>);
                  case 'evolutionEffectif': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={{...cardStyle,padding:'24px 28px'}}><div style={{...titleStyle,marginBottom:16}}>◉ Évolution Effectif</div><ResponsiveContainer width="100%" height={280}><AreaChart data={evolEffectif}><defs><linearGradient id="gradEff" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#d97706" stopOpacity={0.15}/><stop offset="95%" stopColor="#d97706" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis dataKey="annee"/><YAxis/><Tooltip/><Area type="monotone" dataKey="effectif" stroke="#d97706" strokeWidth={2.5} fill="url(#gradEff)" name="Effectif" dot={{r:5,fill:'#d97706',strokeWidth:2,stroke:'white'}}/></AreaChart></ResponsiveContainer></div></div>);
                  case 'pipelineAO': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={titleStyle}>📑 Pipeline Commercial</div></div><div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:14,padding:20}}>{[{label:'AO en cours',value:aoEnCours.length,color:$text},{label:'Montant en jeu',value:fmt(aoMontantTotal),color:'#059669'},{label:'AO gagnés',value:aoGagnes.length,color:'#2563eb'},{label:'Taux conversion',value:`${tauxConversion}%`,color:$accent}].map((item,i)=>(<div key={i} style={{background:$bgSub,borderRadius:crmRd,padding:'18px 16px',textAlign:'center'}}><div style={{fontSize:'0.82rem',color:$textMut,marginBottom:8,textTransform:'uppercase',fontWeight:600}}>{item.label}</div><div style={{fontSize:'1.8rem',fontWeight:800,color:item.color}}>{item.value}</div></div>))}</div></div></div>);
                  case 'topChantiers': return topChantiers.length>0?(<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={titleStyle}>◆ Top 5 Chantiers en cours</div></div><table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.875rem'}}><thead><tr style={{background:$bgSub}}><th style={{position:'relative',padding:'10px 16px',textAlign:'left',fontWeight:600,color:$textMut,fontSize:'0.85rem'}}>Chantier<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'10px 16px',textAlign:'left',fontWeight:600,color:$textMut,fontSize:'0.85rem'}}>Filiale<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'10px 16px',textAlign:'right',fontWeight:600,color:$textMut,fontSize:'0.85rem'}}>Montant<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'10px 16px',textAlign:'center',fontWeight:600,color:$textMut,fontSize:'0.85rem'}}>Avancement<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></tr></thead><tbody>{topChantiers.map((ch,i)=>{const fil=filialesDynamiques.find(f=>f.id===ch.filialeId);return(<tr key={ch.id} style={{borderBottom:`1px solid ${$border}`}}><td style={{padding:'12px 16px',fontWeight:600}}>{ch.nom}</td><td style={{padding:'12px 16px',color:$accent,fontSize:'0.9rem'}}>{fil?`${fil.icon} ${fil.nom}`:'—'}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:'#059669'}}>{fmt(ch.montantVente)}</td><td style={{padding:'12px 16px',textAlign:'center'}}><span style={{fontWeight:700,color:ch.avancement>=80?'#059669':ch.avancement>=40?'#d97706':'#2563eb'}}>{ch.avancement}%</span></td></tr>);})}</tbody></table></div></div>):null;
                  case 'objectifsVsRealise': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={titleStyle}>◎ Objectifs CA vs Réalisé</div>{yearBadge}</div></div><div style={{padding:20,display:'flex',flexDirection:'column',gap:16}}>{objectifs.map((o,i)=>(<div key={i} style={{padding:'14px 18px',background:$bgSub,borderRadius:crmRd}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><div style={{display:'flex',alignItems:'center',gap:8}}><span>{o.icon}</span><span style={{fontSize:'0.95rem',fontWeight:700}}>{o.nom}</span></div><span style={{fontSize:'0.85rem',fontWeight:800,color:o.pct>=100?'#059669':o.pct>=70?'#d97706':'#dc2626',background:o.pct>=100?'#f0fdf4':o.pct>=70?'#fffbeb':'#fef2f2',padding:'3px 10px',borderRadius:crmRd}}>{o.pct}%</span></div><div style={{width:'100%',height:8,background:$bgSub,borderRadius:crmRd}}><div style={{width:`${Math.min(o.pct,100)}%`,height:'100%',borderRadius:crmRd,background:`linear-gradient(135deg, ${o.colorLight}, ${o.colorDark})`}}/></div></div>))}</div></div></div>);
                  case 'tableauFiliales': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={{...headerStyle,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={titleStyle}>▪ Filiales ({nbFiliales})</div>{yearBadge}</div></div><table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.875rem'}}><thead><tr style={{background:$bgSub}}>{['Filiale','CA','Marge','EBE','Rés. Net','Effectif'].map((h,i)=>(<th key={h} style={{position:'relative',padding:'10px 16px',textAlign:i<1?'left':'right',fontWeight:600,color:$textMut,fontSize:'0.85rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>))}</tr></thead><tbody>{filialesEnrichies.map(f=>{const kpi=getKpiFiliale(f);return(<tr key={f.id} onClick={()=>setDashboardFiliale(f.id)} style={{borderBottom:`1px solid ${$border}`,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'12px 16px',fontWeight:600}}>{f.icon} {f.nom}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:'#059669'}}>{(kpi.ca/1000000).toFixed(1)}M€</td><td style={{padding:'12px 16px',textAlign:'right',color:'#7c3aed'}}>{kpi.margeBrutePct.toFixed(0)}%</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:600,color:'#2563eb'}}>{(kpi.ebe/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:600,color:kpi.resultatNet>=0?'#059669':'#dc2626'}}>{(kpi.resultatNet/1000000).toFixed(2)}M€</td><td style={{padding:'12px 16px',textAlign:'right'}}>{kpi.effectif}</td></tr>);})}
                  <tr style={{background:$bgSub}}><td style={{padding:'14px 16px',fontWeight:800}} colSpan="1">◆ TOTAL</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:'#059669'}}>{fmt(totCA)}</td><td style={{padding:'12px 16px',textAlign:'right'}}>—</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:'#2563eb'}}>{fmt(totEBE)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:totRN>=0?'#059669':'#dc2626'}}>{fmt(totRN)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800}}>{totalEffectif}</td></tr></tbody></table></div></div>);
                  case 'structure': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={titleStyle}>◆ Structure du Group</div></div><div style={{padding:20}}><div style={{padding:'16px 20px',background:'linear-gradient(135deg, #8B6F47, #6b5535)',borderRadius:crmRd,marginBottom:14}}><div style={{fontWeight:800,fontSize:'0.95rem',color:'white'}}>◆ GROUP OY</div><div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.7)',marginTop:2}}>Holding mère</div></div><div style={{marginLeft:20,borderLeft:'2px solid #f0ebe3',paddingLeft:16}}>{filialesDynamiques.filter(f=>f.holding==='GROUP OY').map(h=>(<div key={h.id}><div style={{padding:'12px 16px',background:$bgSub,borderRadius:crmRd,marginBottom:10,border:`1px solid ${$border}`}}><div style={{fontWeight:700,fontSize:'0.98rem',color:'#d97706'}}>{h.icon} {h.nom}</div></div><div style={{marginLeft:16,borderLeft:'2px solid #f0ebe3',paddingLeft:14,marginBottom:12}}>{filialesDynamiques.filter(f=>f.holding===h.nom).map(f=>(<div key={f.id} onClick={()=>setDashboardFiliale(f.id)} style={{padding:'10px 14px',background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:6,cursor:'pointer',display:'flex',alignItems:'center',gap:10}}><span>{f.icon}</span><div><div style={{fontWeight:600,fontSize:'0.92rem'}}>{f.nom}</div><div style={{fontSize:'0.72rem',color:$textMut}}>{f.activite}</div></div></div>))}</div></div>))}</div></div></div></div>);
                  case 'sousTraitanceChart': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={titleStyle}>✱ Sous-traitance par Filiale</div></div><div style={{padding:20,height:260}}><ResponsiveContainer width="100%" height="100%"><BarChart data={allKpis.filter(f=>f.kpi.ca>0).map(f=>({name:f.nom,stPct:parseFloat((f.kpi.sousTraitance/f.kpi.ca*100).toFixed(1))}))} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3"/><XAxis type="number" domain={[0,100]} tickFormatter={v=>{return v+"%";}}/><YAxis dataKey="name" type="category" width={100} tick={{fontSize:11}}/><Tooltip formatter={v=>`${v}%`}/><Bar dataKey="stPct" name="Sous-traitance" radius={[0,6,6,0]} barSize={22} fill="#8B6F47"/></BarChart></ResponsiveContainer></div></div></div>);
                  case 'detailFrais': return (<div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} className="drag-grip">⠿</div><div style={cardStyle}><div style={headerStyle}><div style={titleStyle}>📉 Décomposition Charges</div></div><div style={{padding:20,overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}><thead><tr style={{background:$bgSub}}>{['Filiale','CA','ST','MB','Frais Int.','Frais Str.','EBE','RN'].map(h=>(<th key={h} style={{position:'relative',padding:'12px 16px',textAlign:h==='Filiale'?'left':'right',fontWeight:600,color:$textMut,borderBottom:`1px solid ${$border}`}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>))}</tr></thead><tbody>{allKpis.filter(f=>f.kpi.ca>0).map((f,idx)=>{const kpi=f.kpi;return(<tr key={f.id} style={{background:idx%2===0?'white':'#fefdfb'}}><td style={{padding:'12px 16px',fontWeight:700,borderBottom:`1px solid ${$border}`}}>{f.icon} {f.nom}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:'#059669',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.ca)}</td><td style={{padding:'12px 16px',textAlign:'right',color:'#dc2626',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.sousTraitance)}</td><td style={{padding:'12px 16px',textAlign:'right',color:'#2563eb',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.margeBrute)}</td><td style={{padding:'12px 16px',textAlign:'right',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.fraisInternes)}</td><td style={{padding:'12px 16px',textAlign:'right',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.fraisStructure)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:kpi.ebe>=0?'#2563eb':'#dc2626',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.ebe)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:kpi.resultatNet>=0?'#059669':'#dc2626',borderBottom:`1px solid ${$border}`}}>{fmt(kpi.resultatNet)}</td></tr>);})}
                  <tr style={{background:$bgSub}}><td style={{padding:'12px 16px',fontWeight:800}}>TOTAL</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:'#059669'}}>{fmt(totCA)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:'#dc2626'}}>{fmt(allKpis.reduce((s,f)=>s+f.kpi.sousTraitance,0))}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700,color:'#2563eb'}}>{fmt(allKpis.reduce((s,f)=>s+f.kpi.margeBrute,0))}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700}}>{fmt(allKpis.reduce((s,f)=>s+f.kpi.fraisInternes,0))}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:700}}>{fmt(allKpis.reduce((s,f)=>s+f.kpi.fraisStructure,0))}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:'#2563eb'}}>{fmt(totEBE)}</td><td style={{padding:'12px 16px',textAlign:'right',fontWeight:800,color:totRN>=0?'#059669':'#dc2626'}}>{fmt(totRN)}</td></tr></tbody></table></div></div></div>);
                  case 'rentabiliteNette': return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={cardStyle}>
                      <div style={headerStyle}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={titleStyle}>💹 Rentabilité Nette par Filiale</div>{yearBadge}</div></div>
                      <div style={{padding:20, height:260}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={allKpis.filter(f => f.kpi.ca > 0).map(f => {
                            const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                            return { name: f.nom, rnPct: parseFloat(f.kpi.resultatNetPct.toFixed(1)), colorLight: g[0], colorDark: g[1] };
                          })} layout="vertical" margin={{left:10, right:30, top:5, bottom:5}}>
                            <defs>{allKpis.filter(f => f.kpi.ca > 0).map((f, i) => {
                              const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                              return <linearGradient key={i} id={`rnGrad${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={g[0]} /><stop offset="100%" stopColor={g[1]} /></linearGradient>;
                            })}</defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                            <XAxis type="number" tickFormatter={v => `${v}%`} tick={{fontSize:11, fill:'#b0a08a'}} />
                            <YAxis dataKey="name" type="category" width={100} tick={{fontSize:11, fill:'#6b5d4d'}} />
                            <Tooltip formatter={v => `${v}%`} contentStyle={{borderRadius:crmRd, border:"1px solid #f0ebe3", boxShadow:"0 8px 24px rgba(0,0,0,0.08)", padding:"10px 14px"}} />
                            <Bar dataKey="rnPct" name="Rentabilité Nette" radius={[0,6,6,0]} barSize={22}>
                              {allKpis.filter(f => f.kpi.ca > 0).map((e, i) => <Cell key={i} fill={`url(#rnGrad${i})`} />)}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    </div>
                  );

                  case 'objectifsEBE': return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={cardStyle}>
                      <div style={headerStyle}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={titleStyle}>◎ Objectifs EBE vs Réalisé</div>{yearBadge}</div></div>
                      <div style={{padding:20}}>
                        {allKpis.filter(f => f.kpi.ca > 0).map(f => {
                          const kpi = f.kpi;
                          const objectif = kpi.ebeObjectif ?? (kpi.ebe * 1.15);
                          const realise = kpi.ebe;
                          const pct = objectif > 0 ? Math.round(realise / objectif * 100) : 0;
                          const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                          return (
                            <div key={f.id} style={{marginBottom:14}}>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                                <span style={{fontSize:'0.92rem', fontWeight:600, color:$text}}>{f.icon} {f.nom}</span>
                                <span style={{fontSize:'0.85rem', color: pct >= 100 ? '#059669' : pct >= 80 ? '#d97706' : '#dc2626', fontWeight:700}}>{pct}% — {fmt(realise)} / {fmt(objectif)}</span>
                              </div>
                              <div style={{width:'100%', height:12, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                                <div style={{width:`${Math.min(pct, 100)}%`, height:'100%', borderRadius:crmRd, background:`linear-gradient(135deg, ${g[0]}, ${g[1]})`, transition:'width 0.5s'}} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    </div>
                  );

                  case 'radarPerformance': {
                    const radarData = [
                      { axis: 'CA (norm)', fullMark: 100 },
                      { axis: 'Marge %', fullMark: 100 },
                      { axis: 'EBE %', fullMark: 100 },
                      { axis: 'RN %', fullMark: 100 },
                      { axis: 'CA/Collab', fullMark: 100 }
                    ];
                    const maxCA = Math.max(...allKpis.map(f => f.kpi.ca), 1);
                    const maxCollabCA = Math.max(...allKpis.map(f => f.kpi.caParCollab), 1);
                    const radarFiliales = allKpis.filter(f => f.kpi.ca > 0).map(f => {
                      const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                      return {
                        nom: f.nom, color: g[1],
                        data: radarData.map(r => ({
                          ...r,
                          [f.nom]: r.axis === 'CA (norm)' ? Math.round(f.kpi.ca / maxCA * 100)
                            : r.axis === 'Marge %' ? Math.min(100, Math.round(f.kpi.margeBrutePct))
                            : r.axis === 'EBE %' ? Math.min(100, Math.round(f.kpi.ebePct * 3))
                            : r.axis === 'RN %' ? Math.min(100, Math.max(0, Math.round(f.kpi.resultatNetPct * 5)))
                            : Math.min(100, Math.round(f.kpi.caParCollab / maxCollabCA * 100))
                        }))
                      };
                    });
                    const mergedData = radarData.map((r, i) => {
                      const obj = { axis: r.axis, fullMark: 100 };
                      radarFiliales.forEach(rf => { obj[rf.nom] = rf.data[i][rf.nom]; });
                      return obj;
                    });
                    return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={{...cardStyle, padding:'24px 28px'}}>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}><div style={titleStyle}>🕸️ Radar Performance Filiales</div>{yearBadge}</div>
                      <ResponsiveContainer width="100%" height={280}>
                        <RadarChart data={mergedData} cx="50%" cy="50%" outerRadius="70%">
                          <PolarGrid stroke="#f0ebe3" />
                          <PolarAngleAxis dataKey="axis" tick={{fontSize:10, fill:'#6b5d4d'}} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{fontSize:9}} />
                          {radarFiliales.map((rf, i) => (
                            <Radar key={i} name={rf.nom} dataKey={rf.nom} stroke={rf.color} fill={rf.color} fillOpacity={0.15} strokeWidth={2} />
                          ))}
                          <Legend wrapperStyle={{fontSize:11}} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    </div>
                  );}

                  case 'carnetCommandes': {
                    const chantiersActifs = chantiers.filter(c => c.statut === 'En cours' || c.statut === 'Planifié');
                    const montantTotal = chantiersActifs.reduce((s, c) => s + c.montantVente, 0);
                    const montantFacture = chantiersActifs.reduce((s, c) => s + c.depense, 0);
                    const montantRestant = montantTotal - montantFacture;
                    const parFiliale = {};
                    chantiersActifs.forEach(c => {
                      const f = filialesEnrichies.find(fl => fl.id === c.filialeId);
                      const nom = f ? f.nom : 'Autre';
                      if (!parFiliale[nom]) parFiliale[nom] = { total: 0, restant: 0, count: 0 };
                      parFiliale[nom].total += c.montantVente;
                      parFiliale[nom].restant += (c.montantVente - c.depense);
                      parFiliale[nom].count++;
                    });
                    return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={cardStyle}>
                      <div style={headerStyle}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={titleStyle}>📒 Carnet de Commandes</div>{yearBadge}</div></div>
                      <div style={{padding:20}}>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginBottom:16}}>
                          <div style={{background:$success+'12', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                            <div style={{fontSize:'0.8rem', color:'#166534', fontWeight:600}}>Montant total</div>
                            <div style={{fontSize:'1.3rem', fontWeight:800, color:'#059669'}}>{fmt(montantTotal)}</div>
                          </div>
                          <div style={{background:$info+'12', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                            <div style={{fontSize:'0.8rem', color:'#1e40af', fontWeight:600}}>Déjà engagé</div>
                            <div style={{fontSize:'1.3rem', fontWeight:800, color:'#2563eb'}}>{fmt(montantFacture)}</div>
                          </div>
                          <div style={{background:'#fefce8', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                            <div style={{fontSize:'0.8rem', color:'#854d0e', fontWeight:600}}>Restant à facturer</div>
                            <div style={{fontSize:'1.3rem', fontWeight:800, color:'#d97706'}}>{fmt(montantRestant)}</div>
                          </div>
                        </div>
                        {Object.entries(parFiliale).map(([nom, v]) => {
                          const g = gradMap[nom] || ['#c9b896','#8B6F47'];
                          const pct = v.total > 0 ? Math.round((v.total - v.restant) / v.total * 100) : 0;
                          return (
                          <div key={nom} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${$border}`, cursor:'pointer'}} onClick={() => clickToFiliale(nom)}>
                            <span style={{fontSize:'0.92rem', fontWeight:600, color:$text, minWidth:120}}>{nom}</span>
                            <div style={{flex:1, height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                              <div style={{height:'100%', borderRadius:crmRd, background:`linear-gradient(90deg, ${g[0]}, ${g[1]})`, width: pct + '%', transition:'width 0.3s'}} />
                            </div>
                            <span style={{fontSize:'0.82rem', fontWeight:700, color:$textSec, minWidth:50, textAlign:'right'}}>{pct}%</span>
                            <span style={{fontSize:'0.78rem', color:$textMut}}>{v.count} ch.</span>
                          </div>
                          );
                        })}
                      </div>
                    </div>
                    </div>
                  );}

                  case 'repartitionEffectif': {
                    const effData = allKpis.filter(f => f.kpi.effectif > 0).map(f => {
                      const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                      return { name: f.nom, value: f.kpi.effectif, colorLight: g[0], colorDark: g[1] };
                    });
                    return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={{...cardStyle, padding:'24px 28px'}}>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}><div style={titleStyle}>◉ Répartition Effectif par Filiale</div>{yearBadge}</div>
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart><defs>{effData.map((entry, i) => (<linearGradient key={i} id={`effGrad${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={entry.colorLight} /><stop offset="100%" stopColor={entry.colorDark} /></linearGradient>))}</defs>
                          <Pie data={effData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} label={({name, value, percent}) => `${name} ${value} (${(percent*100).toFixed(0)}%)`} style={{fontSize:10, cursor:'pointer'}} onClick={(data) => clickToFiliale(data.name)}>
                            {effData.map((e, i) => <Cell key={i} fill={`url(#effGrad${i})`} style={{cursor:'pointer'}} />)}
                          </Pie>
                          <Tooltip formatter={(v) => `${v} collaborateurs`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    </div>
                  );}

                  case 'ratiosFinanciers': {
                    const benchmarks = [
                      { label:'Marge Brute %', getValue: f => f.kpi.margeBrutePct, format: v => v.toFixed(1)+'%', cibleMin: 35, cibleMax: 55, unit:'%' },
                      { label:'EBE / CA %', getValue: f => f.kpi.ebePct, format: v => v.toFixed(1)+'%', cibleMin: 6, cibleMax: 12, unit:'%' },
                      { label:'Résultat Net / CA %', getValue: f => f.kpi.resultatNetPct, format: v => v.toFixed(1)+'%', cibleMin: 3, cibleMax: 8, unit:'%' },
                      { label:'CA / Collaborateur', getValue: f => f.kpi.caParCollab / 1000, format: v => Math.round(v)+'k€', cibleMin: 120, cibleMax: 200, unit:'k€' },
                      { label:'Sous-traitance / CA %', getValue: f => f.kpi.ca > 0 ? (f.kpi.sousTraitance / f.kpi.ca * 100) : 0, format: v => v.toFixed(1)+'%', cibleMin: 20, cibleMax: 50, unit:'%' },
                      { label:'Masse Sal. / CA %', getValue: f => f.kpi.ca > 0 && f.kpi.masseSalariale ? (f.kpi.masseSalariale / f.kpi.ca * 100) : null, format: v => v !== null ? v.toFixed(1)+'%' : '—', cibleMin: 20, cibleMax: 30, unit:'%' }
                    ];
                    return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={cardStyle}>
                      <div style={headerStyle}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={titleStyle}>◺ Ratios Financiers BTP</div>{yearBadge}</div></div>
                      <div style={{overflowX:'auto'}}>
                        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                          <thead><tr style={{background:$bgSub}}>
                            <th style={{position:'relative',padding:'12px 16px', textAlign:'left', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase', position:'sticky', left:0, background:$bgSub, zIndex:2}}>Ratio<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                            {allKpis.filter(f => f.kpi.ca > 0).map(f => <th key={f.id} style={{position:'relative',padding:'10px 8px', textAlign:'center', fontWeight:700, color:$text, fontSize:'0.82rem', minWidth:100, whiteSpace:'nowrap'}}>{f.icon} {f.nom}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                            <th style={{position:'relative',padding:'10px 8px', textAlign:'center', fontWeight:600, color:$accent, fontSize:'0.82rem', background:$accent+'15', minWidth:90}}>Cible BTP<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                          </tr></thead>
                          <tbody>
                            {benchmarks.map((b, bi) => (
                              <tr key={bi} style={{borderBottom:`1px solid ${$border}`, background: bi % 2 === 0 ? 'white' : '#fefdfb'}}>
                                <td style={{padding:'8px 14px', fontWeight:600, color:$textSec, position:'sticky', left:0, background: bi % 2 === 0 ? 'white' : '#fefdfb', zIndex:1}}>{b.label}</td>
                                {allKpis.filter(f => f.kpi.ca > 0).map(f => {
                                  const val = b.getValue(f);
                                  const isGood = val !== null && val >= b.cibleMin && val <= b.cibleMax;
                                  const isBad = val !== null && (val < b.cibleMin * 0.7 || val > b.cibleMax * 1.3);
                                  return <td key={f.id} style={{padding:'8px', textAlign:'center', fontWeight:700, color: val === null ? '#d4d0c8' : isGood ? '#059669' : isBad ? '#dc2626' : '#d97706'}}>
                                    {b.format(val)}
                                  </td>;
                                })}
                                <td style={{padding:'8px', textAlign:'center', fontSize:'0.82rem', color:$accent, background:$accent+'15', fontWeight:600}}>{b.cibleMin}–{b.cibleMax}{b.unit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    </div>
                  );}

                  case 'margeParChantier': {
                    const chantiersAvecMarge = chantiers.filter(c => c.statut === 'En cours').map(c => {
                      const f = filialesEnrichies.find(fl => fl.id === c.filialeId);
                      const g = f ? (gradMap[f.nom] || ['#c9b896','#8B6F47']) : ['#c9b896','#8B6F47'];
                      const budgetPct = c.budgetHT > 0 ? Math.round(c.depense / c.budgetHT * 100) : 0;
                      const margePrevu = c.montantVente > 0 ? Math.round((c.montantVente - c.budgetHT) / c.montantVente * 100) : 0;
                      return { ...c, filiale: f ? f.nom : '—', fIcon: f ? f.icon : '', g, budgetPct, margePrevu };
                    }).sort((a, b) => b.budgetHT - a.budgetHT);
                    return (
                    <div {...dragProps(key)} style={dragWrapStyle(key)}><div style={dragHandleStyle} onMouseOver={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background="#f0ebe3"}} onMouseOut={e=>{e.currentTarget.style.opacity=0.4;e.currentTarget.style.background="transparent"}} className="drag-grip">⠿</div>
                    <div style={cardStyle}>
                      <div style={headerStyle}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={titleStyle}>💶 Marge par Chantier</div>{yearBadge}</div></div>
                      <div style={{overflowX:'auto'}}>
                        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                          <thead><tr style={{background:$bgSub}}>
                            {['Chantier','Filiale','Budget HT','Engagé','Avancmt','Budget utilisé','Marge prév.'].map(h => (
                              <th key={h} style={{position:'relative',padding:'12px 14px', textAlign: h === 'Chantier' || h === 'Filiale' ? 'left' : 'right', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                            ))}
                          </tr></thead>
                          <tbody>
                            {chantiersAvecMarge.map(c => (
                              <tr key={c.id} onClick={() => { if (c.filialeId) setDashboardFiliale(c.filialeId); setDashboardChantierId(c.id); setDashboardVue('chantier'); }} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'} style={{borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.15s'}}>
                                <td style={{padding:'12px 14px', fontWeight:600, color:$text}}>{c.nom}</td>
                                <td style={{padding:'12px 14px', color:$textSec, fontSize:'0.88rem'}}>{c.fIcon} {c.filiale}</td>
                                <td style={{padding:'12px 14px', textAlign:'right', fontWeight:600, color:'#059669'}}>{fmt(c.budgetHT)}</td>
                                <td style={{padding:'12px 14px', textAlign:'right', color:'#d97706'}}>{fmt(c.depense)}</td>
                                <td style={{padding:'12px 14px', textAlign:'right'}}>
                                  <div style={{display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end'}}>
                                    <div style={{width:50, height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}>
                                      <div style={{height:'100%', borderRadius:3, background: c.avancement >= 80 ? '#22c55e' : c.avancement >= 40 ? '#f59e0b' : '#3b82f6', width: c.avancement + '%'}} />
                                    </div>
                                    <span style={{fontSize:'0.8rem', fontWeight:600, color:$textSec}}>{c.avancement}%</span>
                                  </div>
                                </td>
                                <td style={{padding:'12px 14px', textAlign:'right'}}>
                                  <span style={{fontSize:'0.88rem', fontWeight:700, color: c.budgetPct > 90 ? '#dc2626' : c.budgetPct > 70 ? '#d97706' : '#059669'}}>{c.budgetPct}%</span>
                                </td>
                                <td style={{padding:'12px 14px', textAlign:'right'}}>
                                  <span style={{fontWeight:700, color: c.margePrevu < 5 ? '#dc2626' : c.margePrevu < 15 ? '#d97706' : '#059669'}}>{c.margePrevu}%</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    </div>
                  );}

                  default: return null;
                }
              };

              return (<>
              {/* ── Group Tabs ── */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
                <div style={{display:'flex', gap:8}}>
                  {[{key:'kpi', label:'▦ Tableau de Bord'}, {key:'donnees', label:'☰ Centre de Données'}].map(tab => (
                    <button key={tab.key} onClick={() => setDashGroupeVue(tab.key)}
                      style={{padding:'10px 24px', borderRadius:crmRd, fontSize:'0.98rem', fontWeight:700, border: dashGroupeVue === tab.key ? 'none' : `1px solid ${$border}`, background: dashGroupeVue === tab.key ? '#8B6F47' : 'white', color: dashGroupeVue === tab.key ? 'white' : '#6b5d4d', cursor:'pointer', transition:'all 0.3s', boxShadow: dashGroupeVue === tab.key ? '0 4px 16px rgba(139,111,71,0.2)' : '0 2px 8px rgba(0,0,0,0.02)'}}
                    >{tab.label}</button>
                  ))}
                </div>
                {dashGroupeVue === 'kpi' && (
                <div style={{position:'relative'}}>
                <button onClick={() => setDashSettingsOpen(!dashSettingsOpen)}
                  style={{display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background: dashSettingsOpen ? '#faf8f5' : 'white', color:$textSec, fontSize:'0.92rem', fontWeight:600, cursor:'pointer', transition:'all 0.2s'}}
                  onMouseOver={e => e.currentTarget.style.background=$bgSub}
                  onMouseOut={e => { if (!dashSettingsOpen) e.currentTarget.style.background='transparent'; }}
                >✱ Widgets</button>
                {dashSettingsOpen && (<>
                  <div onClick={() => setDashSettingsOpen(false)} style={{position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:998}} />
                  <div style={{position:'absolute', top:'100%', right:0, marginTop:6, background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 12px 40px rgba(0,0,0,0.12)', padding:'16px 12px', zIndex:999, width:400, maxHeight:520, overflowY:'auto'}}>
                    <div style={{fontSize:'0.88rem', fontWeight:700, color:$textMut, padding:'4px 12px 10px', borderBottom:`1px solid ${$border}`, marginBottom:6}}>Afficher / Masquer / Réordonner</div>
                    {[...dashWidgetOrder, ...defaultWidgetOrder.filter(k => !dashWidgetOrder.includes(k))].map((key, idx) => {
                      const isDragging = settingsDragIdx === idx;
                      const isOver = settingsDragOverIdx === idx;
                      return (
                      <div key={key} draggable
                        onDragStart={(e) => { setSettingsDragIdx(idx); e.dataTransfer.effectAllowed = 'move'; }}
                        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setSettingsDragOverIdx(idx); }}
                        onDragLeave={() => setSettingsDragOverIdx(null)}
                        onDrop={(e) => { e.preventDefault(); handleSettingsDrop(idx); }}
                        onDragEnd={() => { setSettingsDragIdx(null); setSettingsDragOverIdx(null); }}
                        style={{display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:crmRd, cursor:'grab', userSelect:'none', opacity: isDragging ? 0.3 : 1, borderTop: isOver && settingsDragIdx !== null && idx < settingsDragIdx ? '2px solid #8B6F47' : '2px solid transparent', borderBottom: isOver && settingsDragIdx !== null && idx > settingsDragIdx ? '2px solid #8B6F47' : '2px solid transparent', background: isOver ? '#faf8f5' : 'transparent', transition:'background 0.08s'}}
                      >
                        <span style={{color:'#c9b896', fontSize:10, cursor:'grab', flexShrink:0}}>⠿</span>
                        <div onClick={(e) => { e.stopPropagation(); toggleWidget(key); }} style={{display:'flex', alignItems:'center', gap:10, flex:1, cursor:'pointer'}}>
                          <div style={{width:36, height:20, borderRadius:crmRd, background: dashWidgets[key] !== false ? '#8B6F47' : '#d5d0c8', position:'relative', transition:'background 0.2s', flexShrink:0}}>
                            <div style={{width:16, height:16, borderRadius:'50%', background:$bgCard, position:'absolute', top:2, left: dashWidgets[key] !== false ? 18 : 2, transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}} />
                          </div>
                          <span style={{fontSize:'0.88rem', color: dashWidgets[key] !== false ? '#2d2216' : '#b0a08a', fontWeight: dashWidgets[key] !== false ? 600 : 400}}>{widgetLabels[key]}</span>
                        </div>
                        {widgetDescriptions[key] && (
                          <span title={widgetDescriptions[key].short + '\n\n' + widgetDescriptions[key].detail + '\n\nCatégorie : ' + widgetDescriptions[key].categorie + '\nSource : ' + widgetDescriptions[key].source + '\nFréquence : ' + widgetDescriptions[key].frequence}
                            style={{fontSize:'0.8rem', color:'#c9b896', cursor:'help', flexShrink:0, width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%', border:`1px solid ${$border}`, transition:'all 0.15s'}}
                            onMouseOver={e => { e.currentTarget.style.background='#8B6F47'; e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='#8B6F47'; }}
                            onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#c9b896'; e.currentTarget.style.borderColor=$border; }}
                          >ℹ</span>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); toggleWidgetSize(key); }}
                          title={dashWidgetSizes[key] === 'half' ? 'Passer en pleine largeur' : 'Passer en demi-largeur'}
                          style={{border:`1px solid ${$border}`, background: dashWidgetSizes[key] === 'half' ? '#faf8f5' : 'white', borderRadius:crmRd, padding:'2px 6px', cursor:'pointer', fontSize:'0.75rem', color:$accent, fontWeight:700, flexShrink:0}}
                        >{dashWidgetSizes[key] === 'half' ? '½' : '1'}</button>
                      </div>
                      );
                    })}
                    <div style={{borderTop:`1px solid ${$border}`, marginTop:8, paddingTop:8, display:'flex', gap:8, padding:'8px 12px'}}>
                      <button onClick={() => setDashWidgets(Object.fromEntries(Object.keys(widgetLabels).map(k => [k, true])))} style={{flex:1, padding:'6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, fontSize:'0.82rem', fontWeight:600, color:$accent, cursor:'pointer'}}>Tout activer</button>
                      <button onClick={() => setDashWidgets(Object.fromEntries(Object.keys(widgetLabels).map(k => [k, false])))} style={{flex:1, padding:'6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, fontSize:'0.82rem', fontWeight:600, color:$textMut, cursor:'pointer'}}>Tout masquer</button>
                      <button onClick={() => setDashWidgetOrder([...defaultWidgetOrder])} style={{flex:1, padding:'6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, fontSize:'0.82rem', fontWeight:600, color:$textSec, cursor:'pointer'}}>Reset</button>
                    </div>
                  </div>
                </>)}
                </div>
                )}
              </div>

              {/* ── Vue KPI (widgets) ── */}
              {dashGroupeVue === 'kpi' && (
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20}}>
                {(() => {
                  const completeOrder = [...dashWidgetOrder, ...defaultWidgetOrder.filter(k => !dashWidgetOrder.includes(k))];
                  return completeOrder.map(key => {
                    const w = renderWidget(key);
                    return w ? <WidgetErrorBoundary key={key} name={widgetLabels[key] || key}>{w}</WidgetErrorBoundary> : null;
                  });
                })()}
              </div>
              )}

              {/* ── Vue Centre de Données ── */}
              {dashGroupeVue === 'donnees' && (() => {
                const allAnnees = [...new Set([...defaultAnnees, ...donneesAnneesSupp, String(new Date().getFullYear())])].sort();
                const champs = [
                  {key:'ca', label:'CA (€)', format:'money'},
                  {key:'sousTraitance', label:'Sous-traitance (€)', format:'money'},
                  {key:'margeBrute', label:'Marge Brute (€)', format:'money'},
                  {key:'fraisInternes', label:'Frais Internes (€)', format:'money'},
                  {key:'fraisStructure', label:'Frais Structure (€)', format:'money'},
                  {key:'ebe', label:'EBE (€)', format:'money'},
                  {key:'amortissements', label:'Amortissements (€)', format:'money'},
                  {key:'rn', label:'Résultat Net (€)', format:'money'},
                  {key:'tresorerie', label:'Trésorerie (€)', format:'money'},
                  {key:'bfr', label:'BFR (€)', format:'money'},
                  {key:'masseSalariale', label:'Masse Salariale (€)', format:'money'},
                  {key:'effectif', label:'Effectif', format:'number'},
                  {key:'nbChantiers', label:'Nb Chantiers', format:'number'},
                  {key:'caObjectif', label:'Objectif CA (€)', format:'money'},
                  {key:'ebeObjectif', label:'Objectif EBE (€)', format:'money'}
                ];
                const cellStyle = {padding:'6px 10px', border:`1px solid ${$border}`, fontSize:'0.92rem', textAlign:'right'};
                const inputStyle = {width:'100%', padding:'7px 10px', border:`1px solid ${$border}`, borderRadius:crmRd, fontSize:'0.92rem', textAlign:'right', background:'#fefdfb', outline:'none', color:$text, fontWeight:600, fontVariantNumeric:'tabular-nums', transition:'all 0.2s'};
                const fmtCompta = (v, format) => {
                  if (v === null || v === undefined || v === '') return '';
                  const num = typeof v === 'string' ? parseFloat(v) : v;
                  if (isNaN(num)) return '';
                  if (format === 'number') return num % 1 === 0 ? num.toLocaleString('fr-FR') : num.toLocaleString('fr-FR', {minimumFractionDigits:1, maximumFractionDigits:1});
                  return num.toLocaleString('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2});
                };
                const parseCompta = (str) => {
                  if (!str || str === '') return '';
                  const cleaned = str.replace(/\s/g, '').replace(/,/g, '.');
                  const num = parseFloat(cleaned);
                  return isNaN(num) ? '' : num;
                };
                const fmtVal = (v) => v === null || v === undefined ? '' : typeof v === 'number' ? v.toLocaleString('fr-FR', {minimumFractionDigits: v % 1 === 0 && v < 100 ? 0 : 2, maximumFractionDigits:2}) : `${v}`;
                const gradMap = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};

                // Calcul taux de remplissage
                const getFillRate = (dataKey, champsList) => {
                  let total = 0, filled = 0;
                  allAnnees.forEach(a => { champsList.forEach(ch => { total++; const v = getDonnee(dataKey, a, ch.key); if (v !== null && v !== undefined) filled++; }); });
                  return total > 0 ? Math.round(filled / total * 100) : 0;
                };
                // Evolution Y-o-Y
                const getEvolution = (dataKey, champ, annee) => {
                  const idx = allAnnees.indexOf(annee);
                  if (idx <= 0) return null;
                  const prev = getDonnee(dataKey, allAnnees[idx - 1], champ);
                  const curr = getDonnee(dataKey, annee, champ);
                  if (prev === null || curr === null || prev === 0) return null;
                  return ((curr - prev) / Math.abs(prev)) * 100;
                };

                return (
                <div>
                    {/* ═══ ANNÉE SELECTOR ═══ */}
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,flexWrap:'wrap'}}>
                      <span style={{fontSize:'0.88rem',fontWeight:700,color:$text}}>◫ Années :</span>
                      {allAnnees.map(a=><button key={a} onClick={()=>setDonneesAnneeActive(a)} style={{padding:'6px 14px',borderRadius:crmRd,border:'1px solid '+(donneesAnneeActive===a?$accent:$border),background:donneesAnneeActive===a?$selBg:'transparent',color:donneesAnneeActive===a?$selText:$textSec,fontWeight:donneesAnneeActive===a?700:400,fontSize:'0.82rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}>{a}</button>)}
                      <button onClick={()=>{const next=String(Math.max(...allAnnees.map(Number))+1);if(!allAnnees.includes(next))setDonneesAnneesSupp(p=>[...p,next]);}} style={{padding:'6px 12px',borderRadius:crmRd,border:'1px dashed '+$border,background:'transparent',color:$textMut,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>+ Année</button>
                    </div>
                    {/* ═══ FILL RATE ═══ */}
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:10,marginBottom:20}}>
                      {donneesFilialeOrder.map(fId=>{const fil=fId==='yilmaz'?{id:'yilmaz',nom:'Yilmaz',icon:'▪'}:filialesDynamiques.find(f=>f.id===fId);if(!fil)return null;const rate=getFillRate(fil.id,champs);return(<div key={fil.id} style={{background:$bgCard,border:'1px solid '+$border,borderRadius:crmRd,padding:'12px 14px',boxShadow:$shadow}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><span style={{fontSize:'0.82rem',fontWeight:600,color:$text}}>{fil.icon} {fil.nom}</span><span style={{fontSize:'0.75rem',fontWeight:700,color:rate>=80?$success:rate>=40?$warn:$danger}}>{rate}%</span></div><div style={{height:4,background:$bgSub,borderRadius:crmRd,overflow:'hidden'}}><div style={{width:rate+'%',height:'100%',background:rate>=80?$success:rate>=40?$warn:$danger,borderRadius:crmRd,transition:'width 0.3s'}}/></div></div>);})}
                    </div>
                    {/* ═══ FILIALE TABLES ═══ */}
                    {donneesFilialeOrder.map((fId,fIdx)=>{const fil=fId==='yilmaz'?{id:'yilmaz',nom:'Yilmaz',icon:'▪',couleur:'#2d2d2d'}:filialesDynamiques.find(f=>f.id===fId);if(!fil)return null;const filColor=fil.couleur||$accent;const rate=getFillRate(fil.id,champs);return(<div key={fil.id} style={{background:$bgCard,border:'1px solid '+$border,borderRadius:crmRd,marginBottom:16,boxShadow:$shadow,overflow:'hidden'}} draggable onDragStart={()=>setDonneesDragIdx(fIdx)} onDragOver={e=>{e.preventDefault();setDonneesDragOverIdx(fIdx);}} onDragEnd={()=>handleDonneesDrop(donneesDragOverIdx)} onDrop={()=>handleDonneesDrop(fIdx)}>
                      <div style={{padding:'14px 18px',borderBottom:'1px solid '+$border,background:$bgSub,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'grab'}}><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:14,height:14,borderRadius:'50%',background:filColor}}/><span style={{fontSize:'0.92rem',fontWeight:700,color:$text}}>{fil.icon} {fil.nom}</span><span style={{fontSize:'0.7rem',fontWeight:600,color:rate>=80?$success:rate>=40?$warn:$textMut,background:(rate>=80?$success:rate>=40?$warn:$textMut)+'15',padding:'2px 8px',borderRadius:crmRd}}>{rate}% rempli</span></div><span style={{fontSize:'0.7rem',color:$textMut}}>⠿ glisser</span></div>
                      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}><thead><tr style={{background:$bgSub}}><th style={{position:'relative',padding:'8px 12px',textAlign:'left',fontWeight:600,color:$textMut,fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.04em',borderBottom:'1px solid '+$border,minWidth:160,position:'sticky',left:0,background:$bgSub,zIndex:2}}>Indicateur<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>{allAnnees.map(a=><th key={a} style={{position:'relative',padding:'8px 12px',textAlign:'right',fontWeight:donneesAnneeActive===a?700:500,color:donneesAnneeActive===a?$accent:$textMut,fontSize:'0.75rem',borderBottom:'1px solid '+$border,minWidth:130,background:donneesAnneeActive===a?$accent+'08':$bgSub}}>{a}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead><tbody>{champs.map(ch=><tr key={ch.key} style={{borderBottom:'1px solid '+$borderLight}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'6px 12px',fontWeight:600,color:$textSec,fontSize:'0.8rem',position:'sticky',left:0,background:$bgCard,zIndex:1}}>{ch.label}</td>{allAnnees.map(a=>{const val=getDonnee(fil.id,a,ch.key);const evo=getEvolution(fil.id,ch.key,a);return <td key={a} style={{padding:'4px 6px',background:donneesAnneeActive===a?$accent+'05':'transparent'}}><div style={{display:'flex',alignItems:'center',gap:4}}><input value={val!=null?fmtCompta(val,ch.format):''} placeholder="—" onChange={e=>{const parsed=parseCompta(e.target.value);setDonnee(fil.id,a,ch.key,parsed);}} onFocus={e=>{e.currentTarget.style.borderColor=$accent;e.currentTarget.style.boxShadow='0 0 0 2px '+$accent+'20';}} onBlur={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.boxShadow='none';}} style={{...inputStyle,background:donneesAnneeActive===a?$accent+'06':$bgCard}}/>{evo!=null&&<span style={{fontSize:'0.62rem',fontWeight:700,color:evo>0?$success:evo<0?$danger:$textMut,flexShrink:0,minWidth:32,textAlign:'right'}}>{evo>0?'↗+':'↘'}{evo.toFixed(0)}%</span>}</div></td>})}</tr>)}</tbody></table></div>
                    </div>);})}
                    {/* ═══ CSV ═══ */}
                    <div style={{display:'flex',gap:8,marginBottom:28}}>
                      <button onClick={()=>{const rows=[['Filiale','Année',...champs.map(c=>c.label)]];donneesFilialeOrder.forEach(fId=>{const fil=fId==='yilmaz'?{id:'yilmaz',nom:'Yilmaz'}:filialesDynamiques.find(f=>f.id===fId);if(!fil)return;allAnnees.forEach(a=>{rows.push([fil.nom,a,...champs.map(c=>{const v=getDonnee(fil.id,a,c.key);return v!=null?v:'';})]);});});const csv=rows.map(r=>r.join(';')).join('\n');const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='centre_donnees_groupoy.csv';a.click();URL.revokeObjectURL(url);}} style={{padding:'8px 16px',borderRadius:crmRd,border:'1px solid '+$border,background:$bgCard,color:$textSec,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgCard}>↥ Exporter CSV</button>
                      <label style={{padding:'8px 16px',borderRadius:crmRd,border:'1px solid '+$border,background:$bgCard,color:$textSec,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>↧ Importer CSV<input type="file" accept=".csv" style={{display:'none'}} onChange={e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{const lines=ev.target.result.split('\n').map(l=>l.split(';'));if(lines.length<2)return;lines.slice(1).forEach(row=>{if(row.length<3)return;const filNom=row[0]?.trim();const annee=row[1]?.trim();const fil=filialesDynamiques.find(f=>f.nom===filNom)||{id:filNom==='Yilmaz'?'yilmaz':null};if(!fil.id)return;champs.forEach((ch,ci)=>{const val=row[ci+2]?.trim();if(val&&val!==''){const parsed=parseCompta(val);if(parsed!=='')setDonnee(fil.id,annee,ch.key,parsed);}});});};reader.readAsText(file,'UTF-8');e.target.value='';}}/></label>
                    </div>
                    {/* ═══ INTÉGRATIONS ═══ */}
                    <div style={{paddingTop:20,borderTop:'1px solid '+$border}}>
                      <h3 style={{fontSize:'1rem',fontWeight:700,color:$text,marginBottom:16}}>🔗 Intégrations & Import</h3>
                    {/* Step 1: Get API Key */}
                    <div style={{padding:'16px 20px', background:$bgSub, borderRadius:crmRd, marginBottom:16}}>
                      <div style={{fontSize:'0.92rem', fontWeight:700, color:$text, marginBottom:8}}>Étape 1 — Obtenir votre clé API</div>
                      <div style={{fontSize:'0.82rem', color:$textSec, lineHeight:1.6, marginBottom:10}}>
                        Connectez-vous à <strong>Pennylane</strong> → <strong>Paramètres</strong> (roue dentée) → <strong>Intégrations & API</strong> → <strong>Générer un token API</strong>.
                        Copiez le token généré ci-dessous.
                      </div>
                      <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <input
                          type="password"
                          placeholder="Collez votre clé API Pennylane ici..."
                          value={pennylaneApiKey}
                          onChange={e => { setPennylaneApiKey(e.target.value); setPennylaneStatus(null); setPennylaneError(''); }}
                          style={{flex:1, padding:'10px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.92rem', outline:'none', fontFamily:'monospace', background:$bgCard, transition:'all 0.2s'}}
                          onFocus={e => { e.currentTarget.style.borderColor='#6366f1'; e.currentTarget.style.boxShadow='0 0 0 2px rgba(99,102,241,0.15)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor=$border; e.currentTarget.style.boxShadow='none'; }}
                        />
                        {pennylaneApiKey && (
                          <button onClick={() => { setPennylaneApiKey(''); setPennylaneStatus(null); setPennylaneError(''); }}
                            style={{padding:'10px 14px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', fontSize:'0.85rem', fontWeight:600, color:'#dc2626', cursor:'pointer'}}>✕</button>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Test Connection */}
                    <div style={{padding:'16px 20px', background: pennylaneStatus === 'connected' ? '#f0fdf4' : '#faf8f5', borderRadius:crmRd, marginBottom:16, border: pennylaneStatus === 'connected' ? '1px solid #bbf7d0' : '1px solid transparent', transition:'all 0.3s'}}>
                      <div style={{fontSize:'0.92rem', fontWeight:700, color:$text, marginBottom:8}}>Étape 2 — Tester la connexion</div>
                      <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
                        <button
                          disabled={!pennylaneApiKey || pennylaneStatus === 'testing'}
                          onClick={async () => {
                            setPennylaneStatus('testing');
                            setPennylaneError('');
                            try {
                              const resp = await fetch('https://app.pennylane.com/api/external/v2/me', {
                                headers: { 'Authorization': `Bearer ${pennylaneApiKey}`, 'Accept': 'application/json' }
                              });
                              if (resp.ok) {
                                const data = await resp.json();
                                setPennylaneStatus('connected');
                                setPennylaneError(`✓ Connecté en tant que ${data.email || data.name || 'utilisateur vérifié'}`);
                              } else {
                                setPennylaneStatus('error');
                                setPennylaneError(resp.status === 401 ? '✕ Clé API invalide ou expirée' : `✕ Erreur ${resp.status}`);
                              }
                            } catch (err) {
                              // CORS error = API key might be valid but browser blocks it
                              setPennylaneStatus('error');
                              setPennylaneError('▲ Connexion bloquée par le navigateur (CORS). Voir note ci-dessous.');
                            }
                          }}
                          style={{padding:'10px 20px', borderRadius:crmRd, border:'none', background: !pennylaneApiKey ? '#e5e0d8' : 'linear-gradient(135deg, #6366f1, #4f46e5)', color:'white', fontSize:'0.92rem', fontWeight:700, cursor: !pennylaneApiKey ? 'not-allowed' : 'pointer', opacity: pennylaneStatus === 'testing' ? 0.7 : 1, transition:'all 0.2s'}}
                        >{pennylaneStatus === 'testing' ? '⏳ Test en cours...' : '🔗 Tester la connexion'}</button>
                        {pennylaneError && (
                          <span style={{fontSize:'0.88rem', fontWeight:600, color: pennylaneStatus === 'connected' ? '#059669' : '#d97706'}}>{pennylaneError}</span>
                        )}
                      </div>
                    </div>

                    {/* CORS Note */}
                    {pennylaneStatus === 'error' && pennylaneError.includes('CORS') && (
                      <div style={{padding:'14px 18px', background:$warn+'12', borderRadius:crmRd, marginBottom:16, border:'1px solid #fde68a'}}>
                        <div style={{fontSize:'0.88rem', fontWeight:700, color:'#92400e', marginBottom:6}}>ℹ️ Limitation technique</div>
                        <div style={{fontSize:'0.82rem', color:'#78350f', lineHeight:1.6}}>
                          L'API Pennylane ne permet pas les appels directement depuis le navigateur (restriction CORS).
                          <strong> Deux solutions :</strong>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10}}>
                          <div style={{padding:'10px 14px', background:$bgCard, borderRadius:crmRd, border:'1px solid #fde68a'}}>
                            <div style={{fontSize:'0.85rem', fontWeight:700, color:$text, marginBottom:4}}>↻ Solution rapide</div>
                            <div style={{fontSize:'0.78rem', color:$textSec, lineHeight:1.5}}>Exportez vos données depuis Pennylane en CSV, puis utilisez le bouton "↥ Importer CSV" ci-dessus.</div>
                          </div>
                          <div style={{padding:'10px 14px', background:$bgCard, borderRadius:crmRd, border:'1px solid #fde68a'}}>
                            <div style={{fontSize:'0.85rem', fontWeight:700, color:$text, marginBottom:4}}>🚀 Solution pro</div>
                            <div style={{fontSize:'0.78rem', color:$textSec, lineHeight:1.5}}>Déployer un backend proxy (Node.js/Vercel) qui relaie les appels API. Votre clé est sauvegardée pour quand ce sera prêt.</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Connected state - show what can be synced */}
                    {pennylaneStatus === 'connected' && (
                      <div style={{padding:'16px 20px', background:$success+'12', borderRadius:crmRd, marginBottom:16, border:'1px solid #bbf7d0'}}>
                        <div style={{fontSize:'0.92rem', fontWeight:700, color:'#166534', marginBottom:10}}>✓ Données synchronisables</div>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
                          {['Balance générale','Écritures comptables','Factures clients','Factures fournisseurs','Plan comptable','Transactions bancaires'].map((item,i) => (
                            <div key={i} style={{padding:'8px 12px', background:$bgCard, borderRadius:crmRd, fontSize:'0.82rem', color:'#059669', fontWeight:600, textAlign:'center', border:'1px solid #bbf7d0'}}>{item}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other integrations */}
                    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                      {[
                        {name:'Pennylane', icon:'PL', desc:'API REST v2', status: pennylaneStatus === 'connected' ? 'active' : pennylaneApiKey ? 'configured' : 'planned'},
                        {name:'Sage', icon:'📗', desc:'Sage 50 / 100 / X3', status:'planned'},
                        {name:'Excel / CSV', icon:'▦', desc:'Import manuel', status:'active'},
                      ].map((api,i) => (
                        <div key={i} style={{padding:'14px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background: api.status === 'active' ? '#f0fdf4' : api.status === 'configured' ? '#eef2ff' : '#faf8f5', transition:'all 0.2s'}}
                          onMouseOver={e => { e.currentTarget.style.borderColor='#c9b896'; }}
                          onMouseOut={e => { e.currentTarget.style.borderColor=$border; }}>
                          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                            <span style={{fontSize:'1.1rem'}}>{api.icon}</span>
                            <span style={{fontSize:'0.95rem', fontWeight:700, color:$text}}>{api.name}</span>
                            <span style={{fontSize:'0.65rem', fontWeight:700, background: api.status === 'active' ? '#059669' : api.status === 'configured' ? '#6366f1' : '#d97706', color:'white', padding:'1px 6px', borderRadius:crmRd, marginLeft:'auto'}}>
                              {api.status === 'active' ? 'ACTIF' : api.status === 'configured' ? 'CONFIGURÉ' : 'BIENTÔT'}
                            </span>
                          </div>
                          <div style={{fontSize:'0.8rem', color:$textMut}}>{api.desc}</div>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>
                );
              })()}
            </>);
            })()}

            {dashboardFiliale === 'yilmaz' && (<>
              <div style={{background:'linear-gradient(90deg, #2d2d2d 0%, #b0b0b0 100%)', borderRadius:crmRd, padding:'14px 24px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:48, height:48, borderRadius:crmRd, background:'#2d2d2d', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', boxShadow:'0 4px 12px rgba(0,0,0,0.15)', border:'3px solid white'}}>▪</div>
                  <div>
                    <div style={{fontSize:'1.05rem', fontWeight:800, color:'white', letterSpacing:'-0.3px'}}>YILMAZ — Centre de Données</div>
                    <div style={{fontSize:'0.78rem', color:'rgba(255,255,255,0.6)', marginTop:1}}>Saisie et gestion des données financières du groupe</div>
                  </div>
                </div>
              </div>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', marginBottom:24}}>
                <h3 style={{fontWeight:700, color:$text, marginBottom:6, display:'flex', alignItems:'center', gap:8}}>◉ Équipe YILMAZ <span style={{fontSize:'0.75rem', fontWeight:600, color:$accent, background:$accent+'15', padding:'2px 8px', borderRadius:crmRd, border:`1px solid ${$border}`}}>{employes.filter(e => !e.filialeId || e.service === 'RH' || e.service === 'FIN' || e.service === 'DIR' || e.service === 'IT').length} collaborateurs</span></h3>
                <div style={{fontSize:'0.88rem', color:$textMut, marginBottom:16}}>Personnel rattaché aux services partagés du groupe</div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                  {employes.filter(e => !e.filialeId || e.service === 'RH' || e.service === 'FIN' || e.service === 'DIR' || e.service === 'IT').map(e => (
                    <div key={e.id} style={{padding:14, background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`, cursor:'pointer', transition:'all 0.15s'}} onClick={() => { setSelectedCollaborateur(e); setShowModalCollaborateur(true); }} onMouseOver={e2 => e2.currentTarget.style.borderColor='#8B6F47'} onMouseOut={e2 => e2.currentTarget.style.borderColor='#f0ebe3'}>
                      <div style={{display:'flex', alignItems:'center', gap:10}}>
                        <div style={{width:36, height:36, borderRadius:crmRd, background:'linear-gradient(135deg, #8B6F47, #C49A2A)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:'0.85rem'}}>{e.prenom?.[0]}{e.nom?.[0]}</div>
                        <div>
                          <div style={{fontWeight:600, fontSize:'0.95rem', color:$text}}>{e.prenom} {e.nom}</div>
                          <div style={{fontSize:'0.8rem', color:$textMut}}>{e.posteExterne || '—'}</div>
                          <div style={{fontSize:'0.75rem', color:$accent, fontStyle:'italic'}}>{e.posteInterne || ''}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>)}

            {dashboardFiliale !== null && dashboardFiliale !== 'yilmaz' && !isHolding && (() => {
              const fil = filialesEnrichies.find(f => f.id === dashboardFiliale);
              if (!fil) return null;
              const kpi = getKpiFiliale(fil);
              const fk = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${(v/1000).toFixed(0)}k€` : v <= -1000 ? `${(v/1000).toFixed(0)}k€` : `${v.toFixed(0)}€`; };
              const fGrad = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};
              const fG = fGrad[fil.nom] || ['#c9b896','#8B6F47'];
              const fCS = {background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', overflow:'hidden'};
              const fHS = {padding:'20px 24px', borderBottom:`1px solid ${$border}`, background:'#fefdfb'};
              const fTS = {fontSize:'1rem', fontWeight:700, color:$text};
              const fYB = <span style={{fontSize:'0.72rem', fontWeight:700, color:$accent, background:$accent+'15', padding:'2px 7px', borderRadius:crmRd, border:`1px solid ${$border}`, marginLeft:8}}>{donneesAnneeActive}</span>;
              const filChantiers = chantiers.filter(c => c.filialeId === fil.id);
              const filEmps = getEmployesFiliale(fil.id);
              const filChantiersActifs = filChantiers.filter(c => c.statut === 'En cours' || c.statut === 'Planifié');
              const filCarnet = filChantiersActifs.reduce((s,c) => s + c.montantVente, 0);
              const filEngage = filChantiersActifs.reduce((s,c) => s + c.depense, 0);
              // Cibles BTP
              const ratios = [
                {label:'Marge Brute', val: kpi.margeBrutePct, min:25, max:40, unit:'%'},
                {label:'EBE/CA', val: kpi.ebePct, min:5, max:12, unit:'%'},
                {label:'Résultat Net/CA', val: kpi.resultatNetPct, min:2, max:8, unit:'%'},
                {label:'Sous-traitance/CA', val: kpi.ca > 0 ? kpi.sousTraitance/kpi.ca*100 : 0, min:20, max:50, unit:'%'},
                {label:'CA/Collaborateur', val: kpi.caParCollab/1000, min:80, max:200, unit:'k€'}
              ];
              const statutBadge = (st) => { const m = {
                'En cours': {bg:'#fef3c7', color:'#92400e', border:'#fbbf24'},
                'Planifié': {bg:'#dbeafe', color:'#1e40af', border:'#60a5fa'},
                'Terminé': {bg:'#dcfce7', color:'#166534', border:'#4ade80'}
              }; const s = m[st] || m['En cours']; return {display:'inline-block', fontSize:'0.8rem', fontWeight:700, padding:'3px 10px', borderRadius:crmRd, background:s.bg, color:s.color, border:`1px solid ${s.border}`}; };
              // Active tab style
              const tabS = (active) => ({padding:'10px 24px', borderRadius:crmRd, fontSize:'0.98rem', fontWeight:700, border: active ? 'none' : `1px solid ${$border}`, background: active ? `linear-gradient(135deg, ${fG[0]}, ${fG[1]})` : 'white', color: active ? '#fff' : '#6b5d4d', cursor:'pointer', transition:'all 0.3s', boxShadow: active ? `0 4px 16px ${fG[0]}44` : '0 2px 8px rgba(0,0,0,0.02)', textShadow: active ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'});
              const isKpi = dashboardVue === 'kpi';
              const isEff = dashboardVue === 'effectif' || (dashboardVue === 'collaborateur' && !dashboardCollabId);
              const isCh = dashboardVue === 'chantiers' || (dashboardVue === 'chantier' && !dashboardChantierId);
              return (<>
                {/* ══════ OPTION 3 FILIALE KPI HEADER ══════ */}
                {navEntreprise && navEntreprise !== 'groupoy' && navEntreprise !== 'yilmaz' && (() => {
                  const filAcc = CRM_FIL_ACC[navEntreprise] || $accent;
                  const filNom = CRM_FIL_NAMES[navEntreprise] || navEntreprise;
                  const filIcon = CRM_FIL_ICONS[navEntreprise] || '▪';
                  const svcList = SERVICES_CONFIG[navEntreprise]?.services || [];
                  const isEzel = navEntreprise === 'ezel';
                  const isRoulotte = navEntreprise === 'roulotte';
                  const isEchaf = navEntreprise === 'echafaudage';
                  const isEtanch = navEntreprise === 'etancheite';
                  const fmtM = (v) => { if (!v || v === 0) return '—'; if (v >= 1000000) return (v/1000000).toFixed(1).replace('.0','') + 'M€'; if (v >= 1000) return Math.round(v/1000) + 'k€'; return v + '€'; };
                  // Real Ezel data from AO_RAW + AFFAIRES context
                  const ezelExec = isEzel ? AO_RAW.filter(a => ['Accepté 🍾','Projet en Cours de Réalisation'].includes(a.s)).length : 0;
                  const ezelAoActifs = isEzel ? AO_RAW.filter(a => ['À Préparer','En préparation','En attente de Réponse','AO sélectionné','Visite rdv à prendre','Demandes de précisions'].includes(a.s)).length : 0;
                  const ezelGagnes = isEzel ? AO_RAW.filter(a => ['Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].includes(a.s)).length : 0;
                  const ezelPerdus = isEzel ? AO_RAW.filter(a => ['Rejeté  😡','Pas répondu','Reporté'].includes(a.s)).length : 0;
                  const ezelDecides = ezelGagnes + ezelPerdus;
                  const ezelTaux = ezelDecides > 0 ? Math.round(ezelGagnes / ezelDecides * 100) : 0;
                  const KPI_FIL = {
                    ezel: [
                      {l:'CA Portefeuille',v:'29.4M€',i:'€',c:filAcc,sub:'81 affaires board Monday'},
                      {l:'Chantiers Phase 3',v:'14',i:'◆',c:'#10b981',sub:'6.82M€ · exécution'},
                      {l:'AO actifs',v:String(ezelAoActifs),i:'◺',c:'#3b82f6',sub:ezelAoActifs+' dossiers en cours'},
                      {l:'Taux de succès AO',v:ezelTaux+'%',i:'🏆',c:ezelTaux>=10?'#10b981':'#f59e0b',sub:ezelGagnes+' gagnés / '+ezelDecides+' décidés'},
                    ],
                    roulotte: [
                      {l:'Unités en location',v:'45 / 60',i:'▸',c:filAcc,sub:'75% taux occupation'},
                      {l:'CA mensuel',v:'435k€',i:'€',c:'#3b82f6',sub:'objectif 500k€'},
                      {l:'Livraisons / sem.',v:'12',i:'▣',c:'#10b981',sub:'planifiées cette semaine'},
                      {l:'Contrats actifs',v:'45',i:'✎',c:'#8b5cf6',sub:'locations en cours'},
                    ],
                    echafaudage: [
                      {l:'Chantiers montage',v:'8',i:'◆',c:filAcc,sub:'actifs en ce moment'},
                      {l:'CA mensuel',v:'1.25M€',i:'€',c:'#3b82f6',sub:'objectif 1.5M€'},
                      {l:'Parc matériel',v:'450t',i:'▣',c:'#10b981',sub:'stock total'},
                      {l:'Taux utilisation',v:'71%',i:'▦',c:'#8b5cf6',sub:'320t / 450t loués'},
                    ],
                    etancheite: [
                      {l:'Portefeuille',v:'3.2M€',i:'€',c:filAcc,sub:'projets en cours'},
                      {l:'Chantiers actifs',v:'6',i:'◆',c:'#10b981',sub:'exécution en cours'},
                      {l:'Études en cours',v:'9',i:'◺',c:'#3b82f6',sub:'AO et devis'},
                      {l:'Effectif',v:'12',i:'👷',c:'#8b5cf6',sub:'techniciens + chefs'},
                    ],
                    yilmaz: [
                      {l:'Filiales gérées',v:'4',i:'▪',c:filAcc,sub:'Ezel · Roulotte · Échafaudage · Étanchéité'},
                      {l:'CA Groupe estimé',v:'3M€',i:'€',c:'#3b82f6',sub:'exercice 2025'},
                      {l:'Collaborateurs',v:'58',i:'◉',c:'#10b981',sub:'effectif total groupe'},
                      {l:'Missions actives',v:'12',i:'✱',c:'#8b5cf6',sub:'services partagés'},
                    ]
                  };
                  const kpis = KPI_FIL[navEntreprise] || KPI_FIL.yilmaz;
                  const svcStats = [
                    {l:'Services',v:String(svcList.length),i:'🗂️',c:filAcc},
                    ...svcList.slice(0,3).map(s=>({l:s.label,v:String(s.modules?.length||0)+' modules',i:s.icon,c:$textMut}))
                  ];
                  return (
                    <div style={{marginBottom:24}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
                        <div>
                          <h2 style={{fontSize:'1.3rem',fontWeight:800,color:$text,margin:0,letterSpacing:'-0.02em'}}>{filIcon} {filNom}</h2>
                          <div style={{fontSize:'0.74rem',color:$textMut,marginTop:3}}>Dashboard filiale · Vue consolidée</div>
                        </div>
                        <div style={{display:'flex',gap:8}}>
                          {svcList.slice(0,4).map((s,i)=>(
                            <button key={i} onClick={()=>{setNavService(s.id);if(s.modules&&s.modules[0])setOngletActif(s.modules[0]);}}
                              style={{background:$bgSub,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'5px 11px',fontSize:'0.73rem',color:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}
                              onMouseEnter={e=>{e.currentTarget.style.background=filAcc+'18';e.currentTarget.style.borderColor=filAcc;e.currentTarget.style.color=filAcc;}}
                              onMouseLeave={e=>{e.currentTarget.style.background=$bgSub;e.currentTarget.style.borderColor=$border;e.currentTarget.style.color=$textSec;}}>
                              <span style={{fontSize:'0.82rem'}}>{s.icon}</span><span>{s.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',marginBottom:12,margin:'0 8px 12px'}}>
                        {kpis.map((k,idx)=>(
                          <div key={idx} style={{padding:'18px 20px',borderRight:idx<3?`1px solid ${$border}`:'none',borderTop:idx>=4?`1px solid ${$border}`:'none'}}>
                            <div style={{fontSize:'0.67rem',color:$textSec,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>{k.l}</div>
                            <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:4}}>
                              <span style={{fontSize:'1.9rem',fontWeight:800,color:k.c,lineHeight:1,letterSpacing:'-0.03em'}}>{k.v}</span>
                              <span style={{fontSize:'1.1rem'}}>{k.i}</span>
                            </div>
                            {k.sub && <div style={{fontSize:'0.69rem',color:$textMut,lineHeight:1.4}}>{k.sub}</div>}
                          </div>
                        ))}
                      </div>
                      <div style={{height:'1px',background:$border,margin:'20px 0'}}></div>
                    </div>
                  );
                })()}
                {/* ── Filiale Header ── */}
                {(!navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz') && (
                <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:20}}>
              {/* ═══ ALERTS PANEL ═══ */}
              {(() => { const alerts = getAlerts(); return alerts.length > 0 ? (
                <div style={{marginBottom:16,padding:'14px 18px',borderRadius:crmRd,background:'linear-gradient(135deg,#fef2f2,#fefce8)',border:'1px solid #fecaca'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <span style={{fontSize:'1.1rem'}}>◉</span>
                    <span style={{fontWeight:800,color:'#991b1b',fontSize:'0.9rem'}}>Alertes & Notifications</span>
                    <span style={{background:'#dc2626',color:'white',borderRadius:crmRd,padding:'1px 8px',fontSize:'0.7rem',fontWeight:800}}>{alerts.length}</span>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    {alerts.slice(0,8).map((a,i) => (
                      <div key={i} onClick={()=>setOngletActif(a.module)} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:crmRd,background:$bgCard,border:'1px solid '+(a.type==='critical'?'#fecaca':a.type==='warning'?'#fef3c7':'#e0e7ff'),cursor:'pointer',fontSize:'0.78rem'}}
                        onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <span>{a.icon}</span>
                        <span style={{flex:1,color:$text}}>{a.text}</span>
                        <span style={{padding:'1px 6px',borderRadius:crmRd,fontSize:'0.65rem',fontWeight:700,background:a.type==='critical'?'#dc2626':a.type==='warning'?'#f59e0b':'#3b82f6',color:'white'}}>{a.type==='critical'?'URGENT':a.type==='warning'?'Attention':'Info'}</span>
                      </div>
                    ))}
                    {alerts.length > 8 && <div style={{fontSize:'0.72rem',color:$accent,textAlign:'center',fontWeight:600}}>+{alerts.length-8} autres alertes</div>}
                  </div>
                </div>
              ) : null; })()}
                  <button onClick={() => { setDashboardFiliale(null); setDashboardVue('kpi'); }} style={{padding:'8px 18px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.95rem', fontWeight:600, color:$textSec, transition:'all 0.3s', boxShadow:'0 2px 8px rgba(0,0,0,0.02)'}} onMouseOver={e => {e.currentTarget.style.background=$bgSub;e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)';}} onMouseOut={e => {e.currentTarget.style.background='transparent';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';}}>← Group</button>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <span style={{fontSize:'1.6rem'}}>{fil.icon}</span>
                    <div>
                      <div style={{fontSize:'1.2rem', fontWeight:800, color:$text}}>{fil.nom}{fYB}</div>
                      <div style={{fontSize:'0.82rem', color:$textMut}}>{fil.activite} · {fil.holding}</div>
                    </div>
                  </div>
                </div>)}
                {/* ── Tabs ── */}
                <div style={{display:'flex', gap:8, marginBottom:24, flexWrap:'wrap'}}>
                  <button onClick={() => { setDashboardVue('kpi'); setDashboardCollabId(null); setDashboardChantierId(null); }} style={tabS(isKpi)}>▦ KPI & Finances</button>
                  <button onClick={() => { setDashboardVue('effectif'); setDashboardCollabId(null); setDashboardChantierId(null); }} style={tabS(isEff)}>◉ Effectif ({filEmps.length})</button>
                  <button onClick={() => { setDashboardVue('chantiers'); setDashboardCollabId(null); setDashboardChantierId(null); }} style={tabS(isCh)}>◆ Chantiers ({filChantiers.length})</button>
                </div>

                {/* ══════════ KPI TAB ══════════ */}
                {dashboardVue === 'kpi' && (<>
                  {/* ── 6 KPI Cards ── */}
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, marginBottom:24}}>
                    {[
                      {label:'Chiffre d\'Affaires', val: fk(kpi.ca), icon:'€', color:'#059669', sub: kpi.caObjectif ? `Obj: ${fk(kpi.caObjectif)}` : null},
                      {label:'Marge Brute', val: fk(kpi.margeBrute), icon:'▦', color:'#7c3aed', sub:`${kpi.margeBrutePct.toFixed(0)}% du CA`},
                      {label:'EBE', val: fk(kpi.ebe), icon:'↗', color:'#2563eb', sub:`${kpi.ebePct.toFixed(1)}% du CA`},
                      {label:'Résultat Net', val: fk(kpi.resultatNet), icon:'◎', color: kpi.resultatNet >= 0 ? '#059669' : '#dc2626', sub:`${kpi.resultatNetPct.toFixed(1)}% du CA`},
                      {label:'Effectif', val: kpi.effectif, icon:'◉', color:'#d97706', sub:`CA/Collab: ${fk(kpi.caParCollab)}`, action: () => { setDashboardVue('effectif'); setDashboardCollabId(null); }},
                      {label:'Carnet Commandes', val: fk(filCarnet), icon:'📒', color:'#0891b2', sub:`${filChantiersActifs.length} chantiers actifs`, action: () => { setDashboardVue('chantiers'); setDashboardChantierId(null); }},
                    ].map((c,i) => (
                      <div key={i} onClick={c.action} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', padding:'24px 22px', cursor: c.action ? 'pointer' : 'default', transition:'all 0.3s'}} onMouseOver={e => { e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='translateY(-3px)'; }} onMouseOut={e => { e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.03)'; e.currentTarget.style.transform='none'; }}>
                        <div style={{fontSize:'0.82rem', color:$textMut, fontWeight:600, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.03em'}}>{c.icon} {c.label}</div>
                        <div style={{fontSize:'1.8rem', fontWeight:800, color:c.color}}>{c.val}</div>
                        {c.sub && <div style={{fontSize:'0.82rem', color:$textMut, marginTop:6}}>{c.sub}</div>}
                      </div>
                    ))}
                  </div>

                  {/* ── Row: Compte de Résultat + Ratios BTP ── */}
                  <div style={{display:'flex', gap:16, marginBottom:20, flexWrap:'wrap'}}>
                    {/* Compte de Résultat */}
                    <div style={{...fCS, flex:'1 1 48%', boxShadow:'0 2px 16px rgba(0,0,0,0.03)', minWidth:340}}>
                      <div style={fHS}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={fTS}>☰ Compte de Résultat</div>{fYB}</div></div>
                      <div style={{padding:'12px 20px'}}>
                        {(() => {
                          const ln = (label, val, opts={}) => (
                            <div style={{display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom: opts.noBorder ? 'none' : `1px solid ${$border}`}}>
                              <span style={{fontSize:'0.95rem', color: opts.color || '#6b5d4d', fontWeight: opts.bold ? 700 : 400, paddingLeft: opts.indent ? 16 : 0}}>{label}</span>
                              <span style={{fontSize:'0.95rem', fontWeight: opts.bold ? 700 : 600, color: opts.valColor || opts.color || '#2d2216'}}>{val}</span>
                            </div>
                          );
                          return <>
                            {ln('Chiffre d\'Affaires', fk(kpi.ca), {bold:true, valColor:'#059669'})}
                            {ln(`− Sous-traitance (${(kpi.ca > 0 ? kpi.sousTraitance/kpi.ca*100 : 0).toFixed(0)}%)`, `-${fk(kpi.sousTraitance)}`, {indent:true, color:$textMut})}
                            {ln(`= Marge Brute (${kpi.margeBrutePct.toFixed(0)}%)`, fk(kpi.margeBrute), {bold:true, color:'#7c3aed', valColor:'#7c3aed'})}
                            {ln(`− Frais internes`, `-${fk(kpi.fraisInternes)}`, {indent:true, color:$textMut})}
                            {ln(`− Frais structure`, `-${fk(kpi.fraisStructure)}`, {indent:true, color:$textMut})}
                            {ln(`= EBE (${kpi.ebePct.toFixed(1)}%)`, fk(kpi.ebe), {bold:true, color:'#2563eb', valColor:'#2563eb'})}
                            {ln('− Amortissements', `-${fk(kpi.amortissements)}`, {indent:true, color:$textMut})}
                            {ln('= Résultat d\'exploitation', fk(kpi.resultatExploitation), {bold:true, valColor: kpi.resultatExploitation >= 0 ? '#7c3aed' : '#dc2626'})}
                            {ln('− Impôts (25%)', `-${fk(kpi.impots)}`, {indent:true, color:$textMut})}
                            <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px', background:'linear-gradient(135deg, #faf8f5, #fef9e7)', borderRadius:crmRd, marginTop:6}}>
                              <span style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>= Résultat Net</span>
                              <span style={{fontSize:'0.95rem', fontWeight:800, color: kpi.resultatNet >= 0 ? '#059669' : '#dc2626'}}>{fk(kpi.resultatNet)}</span>
                            </div>
                          </>;
                        })()}
                      </div>
                    </div>
                    {/* Ratios vs Cibles BTP */}
                    <div style={{...fCS, flex:'1 1 48%', boxShadow:'0 2px 16px rgba(0,0,0,0.03)', minWidth:340}}>
                      <div style={fHS}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={fTS}>◺ Ratios vs Cibles BTP</div>{fYB}</div></div>
                      <div style={{padding:20}}>
                        {ratios.map((r,i) => {
                          const inRange = r.val >= r.min && r.val <= r.max;
                          const warn = r.val < r.min * 0.8 || r.val > r.max * 1.3;
                          const clr = warn ? '#dc2626' : inRange ? '#059669' : '#d97706';
                          const pct = Math.min(Math.max((r.val - r.min * 0.5) / (r.max * 1.5 - r.min * 0.5) * 100, 0), 100);
                          return (
                          <div key={i} style={{marginBottom:14}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                              <span style={{fontSize:'0.9rem', fontWeight:600, color:$text}}>{r.label}</span>
                              <div style={{display:'flex', alignItems:'center', gap:6}}>
                                <span style={{fontSize:'0.95rem', fontWeight:800, color:clr}}>{r.val.toFixed(1)}{r.unit}</span>
                                <span style={{fontSize:'0.7rem', color:$textMut}}>cible: {r.min}–{r.max}{r.unit}</span>
                              </div>
                            </div>
                            <div style={{position:'relative', height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                              <div style={{position:'absolute', left:`${(r.min - r.min*0.5)/(r.max*1.5-r.min*0.5)*100}%`, width:`${(r.max-r.min)/(r.max*1.5-r.min*0.5)*100}%`, height:'100%', background:'#e8f5e9', borderRadius:crmRd}} />
                              <div style={{position:'absolute', left:0, width:`${pct}%`, height:'100%', background:`linear-gradient(90deg, ${fG[0]}, ${fG[1]})`, borderRadius:crmRd, transition:'width 0.3s'}} />
                            </div>
                          </div>);
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ── Row: Evolution + Chantiers rapide ── */}
                  <div style={{display:'flex', gap:16, marginBottom:20, flexWrap:'wrap'}}>
                    {/* Evolution CA/EBE */}
                    {fil.historique && fil.historique.length > 1 && (
                    <div style={{...fCS, flex:'1 1 48%', boxShadow:'0 2px 16px rgba(0,0,0,0.03)', minWidth:340, padding:20}}>
                      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}><div style={fTS}>↗ Évolution {fil.nom}</div>{fYB}</div>
                      <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={fil.historique}>
                          <defs><linearGradient id="fGradCA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={fG[1]} stopOpacity={0.15}/><stop offset="95%" stopColor={fG[1]} stopOpacity={0}/></linearGradient><linearGradient id="fGradEBE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.15}/><stop offset="95%" stopColor="#059669" stopOpacity={0}/></linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                          <XAxis dataKey="annee" tick={{fontSize:11, fill:'#b0a08a'}} axisLine={{stroke:'#f0ebe3'}} tickLine={false} />
                          <YAxis tick={{fontSize:11, fill:'#b0a08a'}} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', padding:'10px 14px'}} formatter={(v) => `${v.toFixed(2)}M€`} />
                          <Legend wrapperStyle={{fontSize:11, paddingTop:8}} />
                          <Area type="monotone" dataKey="ca" stroke={fG[1]} strokeWidth={2.5} fill="url(#fGradCA)" name="CA" dot={{r:4, fill:fG[1], strokeWidth:2, stroke:'white'}} activeDot={{r:7, stroke:fG[1], strokeWidth:2, fill:'white'}} />
                          <Area type="monotone" dataKey="ebe" stroke="#059669" strokeWidth={2} fill="url(#fGradEBE)" name="EBE" dot={{r:3, fill:'#059669', strokeWidth:2, stroke:'white'}} activeDot={{r:6, stroke:'#059669', strokeWidth:2, fill:'white'}} strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>)}
                    {/* Chantiers rapide */}
                    <div style={{...fCS, flex:'1 1 48%', boxShadow:'0 2px 16px rgba(0,0,0,0.03)', minWidth:340}}>
                      <div style={{...fHS, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{display:'flex', alignItems:'center', gap:8}}><div style={fTS}>◆ Chantiers actifs</div>{fYB}</div>
                        <button onClick={() => { setDashboardVue('chantiers'); setDashboardChantierId(null); }} style={{fontSize:'0.82rem', fontWeight:600, color:fG[1], cursor:'pointer', background:'none', border:'none'}}>Voir tout →</button>
                      </div>
                      <div style={{padding:12}}>
                        {filChantiersActifs.length === 0 ? <div style={{padding:20, textAlign:'center', color:$textMut, fontSize:'0.92rem'}}>Aucun chantier actif</div> :
                        filChantiersActifs.slice(0,5).map(ch => {
                          const mg = ch.montantVente > 0 ? (ch.montantVente - ch.budgetHT)/ch.montantVente*100 : 0;
                          return (
                          <div key={ch.id} onClick={() => { setDashboardChantierId(ch.id); setDashboardVue('chantier'); }} style={{display:'flex', alignItems:'center', gap:10, padding:'10px 8px', borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.15s'}} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{fontSize:'0.92rem', fontWeight:600, color:$text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{ch.nom}</div>
                              <div style={{fontSize:'0.78rem', color:$textMut}}>{ch.client}</div>
                            </div>
                            <div style={{width:60, height:6, borderRadius:3, background:$bgSub, overflow:'hidden', flexShrink:0}}>
                              <div style={{height:'100%', borderRadius:3, background:`linear-gradient(90deg, ${fG[0]}, ${fG[1]})`, width:`${ch.avancement}%`}} />
                            </div>
                            <span style={{fontSize:'0.82rem', fontWeight:700, color:$textSec, minWidth:32, textAlign:'right'}}>{ch.avancement}%</span>
                            <span style={statutBadge(ch.statut)}>{ch.statut}</span>
                          </div>);
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ── Carnet de Commandes mini ── */}
                  <div style={{...fCS, marginBottom:20}}>
                    <div style={fHS}><div style={{display:'flex', alignItems:'center', gap:8}}><div style={fTS}>📒 Carnet de Commandes</div>{fYB}</div></div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, padding:16}}>
                      <div style={{background:$success+'12', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                        <div style={{fontSize:'0.78rem', color:'#166534', fontWeight:600}}>Montant total</div>
                        <div style={{fontSize:'1.2rem', fontWeight:800, color:'#059669'}}>{fk(filCarnet)}</div>
                      </div>
                      <div style={{background:$info+'12', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                        <div style={{fontSize:'0.78rem', color:'#1e40af', fontWeight:600}}>Engagé</div>
                        <div style={{fontSize:'1.2rem', fontWeight:800, color:'#2563eb'}}>{fk(filEngage)}</div>
                      </div>
                      <div style={{background:'#fefce8', borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                        <div style={{fontSize:'0.78rem', color:'#854d0e', fontWeight:600}}>Restant</div>
                        <div style={{fontSize:'1.2rem', fontWeight:800, color:'#d97706'}}>{fk(filCarnet - filEngage)}</div>
                      </div>
                      <div style={{background:$bgSub, borderRadius:crmRd, padding:'14px 12px', textAlign:'center'}}>
                        <div style={{fontSize:'0.78rem', color:$textSec, fontWeight:600}}>Marge moy.</div>
                        <div style={{fontSize:'1.2rem', fontWeight:800, color:fG[1]}}>{filChantiersActifs.length > 0 ? (filChantiersActifs.reduce((s,c) => s + (c.montantVente > 0 ? (c.montantVente-c.budgetHT)/c.montantVente*100 : 0), 0) / filChantiersActifs.length).toFixed(0) : 0}%</div>
                      </div>
                    </div>
                  </div>

                  {/* ── Alertes filiale ── */}
                  {(() => {
                    const al = [];
                    if (kpi.resultatNet < 0) al.push({type:'danger', msg:`Résultat net négatif (${fk(kpi.resultatNet)})`});
                    if (kpi.ebePct < 5 && kpi.ca > 0) al.push({type:'warning', msg:`EBE faible (${kpi.ebePct.toFixed(1)}%)`});
                    filChantiers.forEach(ch => {
                      if (ch.depense > ch.budgetHT * 0.9 && ch.avancement < 80) al.push({type:'danger', msg:`${ch.nom} — Budget dépassé (${Math.round(ch.depense/ch.budgetHT*100)}%) pour ${ch.avancement}% avancement`});
                      if (ch.statut === 'En cours' && ch.avancement < 20) al.push({type:'warning', msg:`${ch.nom} — Avancement faible (${ch.avancement}%)`});
                    });
                    if (al.length === 0) al.push({type:'ok', msg:'Aucune alerte — tout est en ordre !'});
                    const ic = {danger:'▲', warning:'●', ok:'✓'};
                    return (
                    <div style={{...fCS, marginBottom:20}}>
                      <div style={fHS}><div style={fTS}>▲ Alertes</div></div>
                      <div style={{padding:12}}>
                        {al.map((a,i) => (
                          <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderBottom: i < al.length-1 ? `1px solid ${$border}` : 'none'}}>
                            <span>{ic[a.type]}</span>
                            <span style={{fontSize:'0.92rem', color: a.type === 'danger' ? '#dc2626' : a.type === 'warning' ? '#92400e' : '#059669', fontWeight: a.type === 'ok' ? 400 : 600}}>{a.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>);
                  })()}
                </>)}

                {/* ══════════ EFFECTIF TAB ══════════ */}
                {(dashboardVue === 'effectif' || dashboardVue === 'collaborateur') && !dashboardCollabId && (
                <div style={fCS}>
                  <div style={{...fHS, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={fTS}>◉ Collaborateurs — {fil.nom} ({filEmps.length})</div>
                    <div style={{display:'flex', gap:8, alignItems:'center'}}>
                      <button onClick={() => { setEmployeForm({...emptyEmploye, filialeId: fil.id}); setModalEmploye('add'); }} style={{fontSize:'0.85rem', fontWeight:700, padding:'6px 14px', borderRadius:crmRd, border:'1px dashed #c9b896', background:$accent+'15', color:$accent, cursor:'pointer', transition:'all 0.15s'}} onMouseOver={e => {e.currentTarget.style.background='#fdf0c8'; e.currentTarget.style.borderStyle='solid';}} onMouseOut={e => {e.currentTarget.style.background='#fef9e7'; e.currentTarget.style.borderStyle='dashed';}}>+ Ajouter</button>
                      <button onClick={() => { setOngletActif('collaborateurs'); setCollabFiltreFiliale(String(fil.id)); }} style={{fontSize:'0.82rem', fontWeight:600, padding:'6px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:'#2563eb', cursor:'pointer'}}>Ouvrir dans YILMAZ RH →</button>
                    </div>
                  </div>
                  {/* Sync indicator */}
                  <div style={{padding:'6px 16px', background:$accent+'15', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8, fontSize:'0.8rem', color:$accent}}>
                    <span style={{width:6, height:6, borderRadius:3, background:'#059669', display:'inline-block'}}></span>
                    <span style={{fontWeight:600}}>Synchronisé</span> — Source unique : Yilmaz RH Services Partagés
                  </div>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                    <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`}}>
                      {['Nom','Poste Ruche','Poste Externe','Niveau','Resp.','Chantiers'].map((h,i) => (
                        <th key={h} style={{position:'relative',padding:'12px 16px', textAlign: i >= 4 ? 'center' : 'left', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr></thead>
                    <tbody>{filEmps.map((emp, idx) => (
                      <tr key={emp.id} onClick={() => { setDashboardCollabId(emp.id); setDashboardVue('collaborateur'); }} style={{borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.15s'}} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                        <td style={{padding:'12px 16px', fontWeight:600, color:$text}}>{emp.prenom} {emp.nom}</td>
                        <td style={{padding:'12px 16px', color:fG[1], fontWeight:600}}>{emp.posteInterne}</td>
                        <td style={{padding:'12px 16px', color:$textMut, fontSize:'0.88rem'}}>{emp.posteExterne}</td>
                        <td style={{padding:'12px 16px', textAlign:'center'}}><span style={{fontSize:'0.78rem', fontWeight:700, padding:'3px 10px', borderRadius:crmRd, background:$accent+'15', color:$accent, border:`1px solid ${$border}`}}>{emp.niveau}</span></td>
                        <td style={{padding:'12px 16px', textAlign:'center'}}>{emp.isResponsable ? '👑' : ''}</td>
                        <td style={{padding:'12px 16px', textAlign:'center', fontWeight:600, color:$textSec}}>{getChantiersCollab(emp.id).length}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                  {filEmps.length === 0 && (
                    <div style={{padding:30, textAlign:'center', color:$textMut, fontSize:'0.95rem'}}>
                      Aucun collaborateur affecté à {fil.nom}
                      <div style={{marginTop:8}}><button onClick={() => { setEmployeForm({...emptyEmploye, filialeId: fil.id}); setModalEmploye('add'); }} style={{padding:'8px 18px', borderRadius:crmRd, border:'1px dashed #c9b896', background:$accent+'15', color:$accent, cursor:'pointer', fontWeight:700, fontSize:'0.9rem'}}>+ Ajouter un collaborateur</button></div>
                    </div>
                  )}
                </div>)}

                {/* ── Collaborateur Detail ── */}
                {dashboardVue === 'collaborateur' && dashboardCollabId && (() => {
                  const emp = employes.find(e => e.id === dashboardCollabId);
                  if (!emp) return null;
                  const mesChantiers = getChantiersCollab(emp.id);
                  const totalSalaire = (emp.salaireFix || 0) + (emp.primeFix || 0) + (emp.variable || 0);
                  return (<div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                      <button onClick={() => { setDashboardCollabId(null); setDashboardVue('effectif'); }} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.92rem', fontWeight:600, color:$textSec}}>← Retour liste</button>
                      <div style={{display:'flex', gap:8, alignItems:'center'}}>
                        <span style={{fontSize:'0.78rem', color:$textMut, display:'flex', alignItems:'center', gap:4}}><span style={{width:6, height:6, borderRadius:3, background:'#059669', display:'inline-block'}}></span>Sync YILMAZ RH</span>
                        <button onClick={() => { setOngletActif('collaborateurs'); setCollabOngletId(emp.id);setCollabDetailTab('profil'); }} style={{padding:'6px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.85rem', fontWeight:600, color:'#2563eb'}}>✎ Modifier dans YILMAZ RH →</button>
                      </div>
                    </div>
                    <div style={fCS}>
                      <div style={{...fHS, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div><div style={{fontSize:'1.1rem', fontWeight:800, color:$text}}>{emp.prenom} {emp.nom}</div><div style={{fontSize:'0.88rem', color:fG[1], fontWeight:600}}>{emp.posteInterne} <span style={{color:$textMut}}>·</span> <span style={{color:$textMut, fontWeight:400}}>{emp.posteExterne}</span></div></div>
                        <span style={{fontSize:'0.82rem', fontWeight:700, padding:'4px 12px', borderRadius:crmRd, background:$accent+'15', color:$accent, border:`1px solid ${$border}`}}>{emp.niveau}</span>
                      </div>
                      <div style={{padding:20}}>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:16}}>
                          {[
                            {label:'💵 Salaire Fixe', val:`${((emp.salaireFix||0)/1000).toFixed(0)}k€`, color:'#2563eb'},
                            {label:'🎁 Prime Fixe', val:`${((emp.primeFix||0)/1000).toFixed(0)}k€`, color:'#7c3aed'},
                            {label:'↗ Variable', val:`${((emp.variable||0)/1000).toFixed(0)}k€`, color:'#059669'},
                            {label:'€ Total', val:`${(totalSalaire/1000).toFixed(0)}k€`, color:'#d97706'},
                          ].map((c,i) => (
                            <div key={i} style={{background:$bgSub, borderRadius:crmRd, padding:'12px 10px', textAlign:'center'}}>
                              <div style={{fontSize:'0.75rem', color:$textMut, fontWeight:600, marginBottom:4}}>{c.label}</div>
                              <div style={{fontSize:'1.1rem', fontWeight:800, color:c.color}}>{c.val}</div>
                            </div>
                          ))}
                        </div>
                        {emp.isResponsable && emp.caGere && (
                        <div style={{marginBottom:16}}>
                          <div style={{fontSize:'0.92rem', fontWeight:700, color:$text, marginBottom:10}}>👑 KPI Responsable</div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
                            {[
                              {label:'CA Géré', val:`${(emp.caGere/1000000).toFixed(1)}M€`, color:'#059669'},
                              {label:'Marge Brute', val:`${emp.margeBrutePct}%`, sub:fk(emp.caGere * emp.margeBrutePct / 100), color:'#7c3aed'},
                              {label:'EBE', val:`${emp.ebePct}%`, sub:fk(emp.caGere * emp.ebePct / 100), color:'#2563eb'},
                              {label:'Bénéfice est.', val:fk(emp.caGere * emp.ebePct / 100 * 0.75), sub:'après IS 25%', color:'#d97706'},
                            ].map((c,i) => (
                              <div key={i} style={{background:$bgCard, borderRadius:crmRd, padding:'12px 10px', border:`2px solid ${c.color}22`, textAlign:'center'}}>
                                <div style={{fontSize:'0.75rem', color:$textMut, marginBottom:4}}>{c.label}</div>
                                <div style={{fontSize:'1rem', fontWeight:800, color:c.color}}>{c.val}</div>
                                {c.sub && <div style={{fontSize:'0.72rem', color:$textMut}}>{c.sub}</div>}
                              </div>
                            ))}
                          </div>
                        </div>)}
                        <div style={{fontSize:'0.92rem', fontWeight:700, color:$text, marginBottom:10}}>◆ Chantiers ({mesChantiers.length})</div>
                        {mesChantiers.length === 0 ? <div style={{color:$textMut, fontSize:'0.9rem', fontStyle:'italic'}}>Aucun chantier assigné</div> :
                        mesChantiers.map(ch => (
                          <div key={ch.id} onClick={() => { setDashboardChantierId(ch.id); setDashboardVue('chantier'); }} style={{display:'flex', alignItems:'center', gap:10, padding:'10px 8px', borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.15s'}} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                            <div style={{flex:1}}><div style={{fontSize:'0.92rem', fontWeight:600, color:$text}}>{ch.nom}</div><div style={{fontSize:'0.78rem', color:$textMut}}>€ {fk(ch.montantVente)} · {ch.client}</div></div>
                            <div style={{width:50, height:6, borderRadius:3, background:$bgSub}}><div style={{height:'100%', borderRadius:3, background:`linear-gradient(90deg, ${fG[0]}, ${fG[1]})`, width:`${ch.avancement}%`}} /></div>
                            <span style={{fontSize:'0.82rem', fontWeight:700, color:$textSec}}>{ch.avancement}%</span>
                            <span style={statutBadge(ch.statut)}>{ch.statut}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>);
                })()}

                {/* ══════════ CHANTIERS TAB ══════════ */}
                {dashboardVue === 'chantiers' && !dashboardChantierId && (
                <div style={fCS}>
                  <div style={{...fHS, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', gap:8}}><div style={fTS}>◆ Chantiers — {fil.nom}</div>{fYB}</div>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <button onClick={() => { setChantierForm({...emptyChantier, filialeId: fil.id}); setModalChantier('add'); }} style={{fontSize:'0.85rem', fontWeight:700, padding:'6px 14px', borderRadius:crmRd, border:'1px dashed #c9b896', background:$accent+'15', color:$accent, cursor:'pointer', transition:'all 0.15s'}} onMouseOver={e => {e.currentTarget.style.background='#fdf0c8'; e.currentTarget.style.borderStyle='solid';}} onMouseOut={e => {e.currentTarget.style.background='#fef9e7'; e.currentTarget.style.borderStyle='dashed';}}>+ Ajouter</button>
                      {['Tous','En cours','Planifié','Terminé'].map(f => {
                        const cnt = f === 'Tous' ? filChantiers.length : filChantiers.filter(c => c.statut === f).length;
                        return <button key={f} style={{fontSize:'0.8rem', fontWeight:600, padding:'4px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, cursor:'pointer'}}>{f} ({cnt})</button>;
                      })}
                    </div>
                  </div>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                    <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`}}>
                      {['Chantier','Client','Statut','Vente','Budget','Engagé','Marge','Avancement'].map((h,i) => (
                        <th key={h} style={{position:'relative',padding:'12px 14px', textAlign: i < 2 ? 'left' : i === 2 ? 'center' : 'right', fontWeight:600, color:$textMut, fontSize:'0.82rem', textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr></thead>
                    <tbody>{filChantiers.sort((a,b) => b.montantVente - a.montantVente).map(ch => {
                      const mg = ch.montantVente > 0 ? (ch.montantVente - ch.budgetHT)/ch.montantVente*100 : 0;
                      return (
                      <tr key={ch.id} onClick={() => { setDashboardChantierId(ch.id); setDashboardVue('chantier'); }} style={{borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.15s'}} onMouseOver={e => e.currentTarget.style.background=$bgSub} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                        <td style={{padding:'12px 14px', fontWeight:600, color:$text}}>{ch.nom}</td>
                        <td style={{padding:'12px 14px', color:$textMut, fontSize:'0.88rem'}}>{ch.client}</td>
                        <td style={{padding:'12px 14px', textAlign:'center'}}><span style={statutBadge(ch.statut)}>{ch.statut}</span></td>
                        <td style={{padding:'12px 14px', textAlign:'right', fontWeight:700, color:'#059669'}}>{fk(ch.montantVente)}</td>
                        <td style={{padding:'12px 14px', textAlign:'right', color:$textSec}}>{fk(ch.budgetHT)}</td>
                        <td style={{padding:'12px 14px', textAlign:'right', color:'#d97706'}}>{fk(ch.depense)}</td>
                        <td style={{padding:'12px 14px', textAlign:'right', fontWeight:700, color: mg > 15 ? '#059669' : mg > 5 ? '#d97706' : '#dc2626'}}>{mg.toFixed(0)}%</td>
                        <td style={{padding:'12px 14px', textAlign:'right'}}>
                          <div style={{display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end'}}>
                            <div style={{width:50, height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}>
                              <div style={{height:'100%', borderRadius:3, background: ch.avancement >= 80 ? '#22c55e' : ch.avancement >= 40 ? '#f59e0b' : '#3b82f6', width:`${ch.avancement}%`}} />
                            </div>
                            <span style={{fontSize:'0.8rem', fontWeight:700, color:$textSec}}>{ch.avancement}%</span>
                          </div>
                        </td>
                      </tr>);
                    })}</tbody>
                  </table>
                </div>)}

                {/* ══════════ FICHE CHANTIER DÉTAILLÉE ══════════ */}
                {dashboardVue === 'chantier' && dashboardChantierId && (() => {
                  const ch = chantiers.find(c => c.id === dashboardChantierId);
                  if (!ch) return null;
                  const resp = employes.find(e => e.id === ch.responsableId);
                  const marge = ch.montantVente - ch.budgetHT;
                  const margePct = ch.montantVente > 0 ? (marge / ch.montantVente * 100) : 0;
                  const resteADepenser = ch.budgetHT - ch.depense;
                  const depensePct = ch.budgetHT > 0 ? (ch.depense / ch.budgetHT * 100) : 0;
                  const resultatActuel = ch.montantVente - ch.depense;
                  const margeActuelle = ch.montantVente > 0 ? (resultatActuel / ch.montantVente * 100) : 0;
                  // Timeline calculation
                  const deb = ch.dateDebut ? new Date(ch.dateDebut) : null;
                  const fin = ch.dateFin ? new Date(ch.dateFin) : null;
                  const now = new Date();
                  const totalDays = deb && fin ? Math.max((fin - deb) / 86400000, 1) : 0;
                  const elapsedDays = deb ? Math.max((now - deb) / 86400000, 0) : 0;
                  const timePct = totalDays > 0 ? Math.min(elapsedDays / totalDays * 100, 100) : 0;
                  const retard = ch.avancement < timePct - 10;
                  // Phases simulées
                  const phases = [
                    {label:'Études', pct: Math.min(100, ch.avancement * 3), icon:'◺'},
                    {label:'Préparation', pct: Math.min(100, Math.max(0, (ch.avancement - 10) * 2)), icon:'✱'},
                    {label:'Exécution', pct: Math.min(100, Math.max(0, ch.avancement - 20) * 1.5), icon:'◆'},
                    {label:'Finitions', pct: Math.min(100, Math.max(0, (ch.avancement - 60) * 3)), icon:'✨'},
                    {label:'Réception', pct: ch.avancement >= 95 ? 100 : ch.avancement >= 85 ? 50 : 0, icon:'🤝'}
                  ];
                  // Budget waterfall data
                  const wfData = [
                    {name:'Vente', val: ch.montantVente, color:'#059669'},
                    {name:'Budget', val: -ch.budgetHT, color:'#3b82f6'},
                    {name:'Marge prév.', val: marge, color:'#7c3aed'},
                    {name:'Dépensé', val: -ch.depense, color:'#dc2626'},
                    {name:'Reste', val: resteADepenser, color:'#d97706'},
                    {name:'Résultat', val: resultatActuel, color: resultatActuel >= 0 ? '#059669' : '#dc2626'}
                  ];
                  return (<div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                      <button onClick={() => { setDashboardChantierId(null); setDashboardVue(dashboardCollabId ? 'collaborateur' : 'chantiers'); }} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.92rem', fontWeight:600, color:$textSec}}>← Retour</button>
                      <div style={{display:'flex', gap:8}}>
                        <button onClick={() => { setChantierForm({...ch}); setModalChantier('edit'); }} style={{padding:'6px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.85rem', fontWeight:600, color:'#2563eb'}}>✎ Modifier</button>
                        <button onClick={() => setConfirmDelete({type:'chantier', id:ch.id, nom:ch.nom})} style={{padding:'6px 14px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.85rem', fontWeight:600, color:'#dc2626'}}>🗑️ Supprimer</button>
                      </div>
                    </div>

                    {/* Header chantier */}
                    <div style={{...fCS, marginBottom:20}}>
                      <div style={{padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:`1px solid ${$border}`}}>
                        <div>
                          <div style={{fontSize:'1.2rem', fontWeight:800, color:$text}}>◆ {ch.nom}</div>
                          <div style={{fontSize:'0.92rem', color:$textMut, marginTop:4}}>
                            Client: <span style={{fontWeight:600, color:$textSec}}>{ch.client}</span>
                            {resp && <> · Resp: <span style={{fontWeight:600, color:fG[1], cursor:'pointer'}} onClick={() => { setDashboardCollabId(resp.id); setDashboardVue('collaborateur'); }}>{resp.prenom} {resp.nom}</span></>}
                          </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:8}}>
                          {retard && <span style={{fontSize:'0.78rem', fontWeight:700, padding:'3px 10px', borderRadius:crmRd, background:$danger+'12', color:'#dc2626', border:'1px solid #fecaca'}}>▲ Retard</span>}
                          <span style={statutBadge(ch.statut)}>{ch.statut}</span>
                        </div>
                      </div>

                      {/* Avancement global + Timeline */}
                      <div>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                          <span style={{fontSize:'0.92rem', fontWeight:600, color:$text}}>Avancement global</span>
                          <span style={{fontSize:'1rem', fontWeight:800, color: ch.avancement >= 80 ? '#059669' : ch.avancement >= 40 ? '#d97706' : '#2563eb'}}>{ch.avancement}%</span>
                        </div>
                        <div style={{width:'100%', height:12, background:$bgSub, borderRadius:crmRd, overflow:'hidden', marginBottom:6}}>
                          <div style={{height:'100%', borderRadius:crmRd, background:`linear-gradient(90deg, ${fG[0]}, ${fG[1]})`, width:`${ch.avancement}%`, transition:'width 0.5s'}} />
                        </div>
                        {deb && fin && (
                        <div style={{position:'relative', marginTop:12}}>
                          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.78rem', color:$textMut, marginBottom:4}}>
                            <span>◫ {ch.dateDebut}</span>
                            <span style={{fontWeight:600, color: retard ? '#dc2626' : '#059669'}}>{timePct.toFixed(0)}% du temps écoulé</span>
                            <span>◫ {ch.dateFin}</span>
                          </div>
                          <div style={{width:'100%', height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}>
                            <div style={{height:'100%', borderRadius:3, background: retard ? '#fca5a5' : '#bbf7d0', width:`${timePct}%`}} />
                          </div>
                        </div>)}
                      </div>
                    </div>

                    {/* 6 KPI Cards */}
                    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:20}}>
                      {[
                        {label:'€ Montant Vente', val: fk(ch.montantVente), color:'#059669'},
                        {label:'☰ Budget HT', val: fk(ch.budgetHT), color:'#2563eb'},
                        {label:'▦ Marge prévisionnelle', val:`${fk(marge)} (${margePct.toFixed(1)}%)`, color: margePct >= 10 ? '#7c3aed' : '#dc2626'},
                        {label:'🔻 Dépensé', val:`${fk(ch.depense)} (${depensePct.toFixed(0)}%)`, color: depensePct > 90 ? '#dc2626' : '#d97706'},
                        {label:'💶 Reste à dépenser', val: fk(resteADepenser), color: resteADepenser >= 0 ? '#d97706' : '#dc2626'},
                        {label:'↗ Résultat actuel', val:`${fk(resultatActuel)} (${margeActuelle.toFixed(1)}%)`, color: resultatActuel >= 0 ? '#059669' : '#dc2626'},
                      ].map((c,i) => (
                        <div key={i} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:'14px 16px', borderLeft:`4px solid ${c.color}`}}>
                          <div style={{fontSize:'0.78rem', color:$textMut, fontWeight:600, marginBottom:4}}>{c.label}</div>
                          <div style={{fontSize:'1.15rem', fontWeight:800, color:c.color}}>{c.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Row: Phases + Budget Waterfall */}
                    <div style={{display:'flex', gap:16, marginBottom:20, flexWrap:'wrap'}}>
                      {/* Phases du chantier */}
                      <div style={{...fCS, flex:'1 1 45%', minWidth:320}}>
                        <div style={fHS}><div style={fTS}>◺ Phases du chantier</div></div>
                        <div style={{padding:20}}>
                          {phases.map((p,i) => (
                            <div key={i} style={{marginBottom:14}}>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                                <span style={{fontSize:'0.9rem', fontWeight:600, color:$text}}>{p.icon} {p.label}</span>
                                <span style={{fontSize:'0.88rem', fontWeight:700, color: p.pct >= 100 ? '#059669' : p.pct > 0 ? fG[1] : '#b0a08a'}}>{p.pct.toFixed(0)}%</span>
                              </div>
                              <div style={{width:'100%', height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                                <div style={{height:'100%', borderRadius:crmRd, background: p.pct >= 100 ? '#22c55e' : `linear-gradient(90deg, ${fG[0]}, ${fG[1]})`, width:`${p.pct}%`, transition:'width 0.3s'}} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Budget Waterfall */}
                      <div style={{...fCS, flex:'1 1 45%', minWidth:320}}>
                        <div style={fHS}><div style={fTS}>💶 Décomposition Budget</div></div>
                        <div style={{padding:20}}>
                          {wfData.map((w,i) => {
                            const maxVal = Math.max(...wfData.map(d => Math.abs(d.val)));
                            const barW = maxVal > 0 ? Math.abs(w.val) / maxVal * 100 : 0;
                            return (
                            <div key={i} style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
                              <span style={{fontSize:'0.88rem', fontWeight:600, color:$textSec, minWidth:80, textAlign:'right'}}>{w.name}</span>
                              <div style={{flex:1, height:18, background:$bgSub, borderRadius:crmRd, overflow:'hidden', position:'relative'}}>
                                <div style={{position:'absolute', left:0, top:0, height:'100%', width:`${barW}%`, background:w.color, borderRadius:crmRd, opacity:0.85, transition:'width 0.3s'}} />
                              </div>
                              <span style={{fontSize:'0.88rem', fontWeight:700, color:w.color, minWidth:70, textAlign:'right'}}>{w.val >= 0 ? '+' : ''}{fk(w.val)}</span>
                            </div>);
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Indicateurs de risque */}
                    <div style={{...fCS, marginBottom:20}}>
                      <div style={fHS}><div style={fTS}>🚦 Indicateurs de Risque</div></div>
                      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, padding:16}}>
                        {[
                          {label:'Budget', val: depensePct, seuil: depensePct > 90 ? 'danger' : depensePct > 70 ? 'warning' : 'ok'},
                          {label:'Délai', val: timePct, seuil: retard ? 'danger' : timePct > 80 ? 'warning' : 'ok'},
                          {label:'Marge', val: margePct, seuil: margePct < 5 ? 'danger' : margePct < 10 ? 'warning' : 'ok'},
                          {label:'Avancement', val: ch.avancement, seuil: ch.avancement < timePct - 20 ? 'danger' : ch.avancement < timePct - 5 ? 'warning' : 'ok'},
                        ].map((r,i) => {
                          const colors = {danger:{bg:'#fef2f2', border:'#fecaca', text:'#dc2626', icon:'▲'}, warning:{bg:'#fefce8', border:'#fde68a', text:'#92400e', icon:'●'}, ok:{bg:'#f0fdf4', border:'#bbf7d0', text:'#166534', icon:'✓'}};
                          const c = colors[r.seuil];
                          return (
                          <div key={i} style={{background:c.bg, borderRadius:crmRd, padding:'14px 12px', textAlign:'center', border:`1px solid ${c.border}`}}>
                            <div style={{fontSize:'1.2rem', marginBottom:4}}>{c.icon}</div>
                            <div style={{fontSize:'0.82rem', fontWeight:600, color:c.text, marginBottom:2}}>{r.label}</div>
                            <div style={{fontSize:'1rem', fontWeight:800, color:c.text}}>{r.val.toFixed(0)}%</div>
                          </div>);
                        })}
                      </div>
                    </div>

                    {/* Équipe chantier */}
                    {resp && (
                    <div style={{...fCS, marginBottom:20}}>
                      <div style={fHS}><div style={fTS}>◉ Équipe</div></div>
                      <div style={{padding:20}}>
                        <div style={{display:'flex', alignItems:'center', gap:12, padding:'8px 0'}} onClick={() => { setDashboardCollabId(resp.id); setDashboardVue('collaborateur'); }}>
                          <div style={{width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${fG[0]}, ${fG[1]})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'0.9rem'}}>{resp.prenom[0]}{resp.nom[0]}</div>
                          <div style={{cursor:'pointer'}}>
                            <div style={{fontSize:'0.95rem', fontWeight:700, color:$text}}>{resp.prenom} {resp.nom}</div>
                            <div style={{fontSize:'0.8rem', color:$textMut}}>👑 Responsable · {resp.posteInterne}</div>
                          </div>
                        </div>
                      </div>
                    </div>)}
                  </div>);
                })()}
              </>);
            })()}

            {/* Modal Ajouter Filiale */}
            {modalFilialeOuvert && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999}} onClick={() => setModalFilialeOuvert(false)}>
                <div style={{background:$bgCard, borderRadius:crmRd, padding:32, maxWidth:500, width:'100%', margin:'0 16px', boxShadow:'0 24px 80px rgba(0,0,0,0.15)', border:`1px solid ${$border}`, maxHeight:'90vh', overflowY:'auto'}} onClick={(e) => e.stopPropagation()}>
                  <h3 style={{fontSize:'1.3rem', fontWeight:700, color:$accent, marginBottom:24, display:'flex', alignItems:'center', gap:8}}>➕ Ajouter une Filiale</h3>
                  <div style={{display:'flex', flexDirection:'column', gap:16}}>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Nom</label><input type="text" value={nouvelleFiliale.nom} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, nom: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} placeholder="Ex: L'Échafaudage Strasbourg" /></div>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Holding parente</label><select value={nouvelleFiliale.holding} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, holding: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}}><option value="INVEST LOC">INVEST LOC</option><option value="INVEST EXE">INVEST EXE</option></select></div>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Activité</label><input type="text" value={nouvelleFiliale.activite} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, activite: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} placeholder="Échafaudage, Étanchéité..." /></div>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>CA prévisionnel (€)</label><input type="number" value={nouvelleFiliale.ca} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, ca: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} /></div>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Effectif prévu</label><input type="number" value={nouvelleFiliale.effectif} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, effectif: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} /></div>
                    <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Marge brute (%)</label><input type="number" value={nouvelleFiliale.margeBrutePct} onChange={(e) => setNouvelleFiliale({...nouvelleFiliale, margeBrutePct: e.target.value})} style={{width:'100%', padding:'10px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="1" min="0" max="100" /></div>
                  </div>
                  <div style={{display:'flex', gap:12, marginTop:24}}>
                    <button onClick={ajouterFiliale} disabled={!nouvelleFiliale.nom} style={{background:$accent, color:'white', padding:'12px 24px', borderRadius:crmRd, fontWeight:600, border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(139,111,71,0.2)', transition:'all 0.3s', opacity: !nouvelleFiliale.nom ? 0.5 : 1}}>Créer</button>
                    <button onClick={() => setModalFilialeOuvert(false)} style={{background:$bgSub, color:$textSec, padding:'12px 24px', borderRadius:crmRd, fontWeight:600, border:'none', cursor:'pointer', transition:'all 0.3s'}}>Annuler</button>
                  </div>
                </div>
              </div>
            )}
          </div></div>
          );
}
