// === Onglet « analytique » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabAnalytique(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, anaFiliale, anaTab, ca, crmRd, filiales, setAnaFiliale, setAnaTab } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const FILIALES_ANA = [{id:'all',label:'Consolidé Group'},{id:'ezel',label:'Ezel Bâtiment'},{id:'echafaudage',label:"L'Échafaudage"},{id:'roulotte',label:'La Roulotte'},{id:'yilmaz',label:'Yilmaz SAS'}];
        const chantiers = [
          {id:'CH-001',nom:'Résidence Les Tilleuls',filiale:'ezel',client:'Nexity',ca:420000,charges:335000,avancement:75,statut:'en_cours',chefId:'EMP005',debut:'2024-09',fin:'2025-06'},
          {id:'CH-002',nom:'Rénovation École Jean Macé',filiale:'ezel',client:'Ville de Strasbourg',ca:320000,charges:268000,avancement:90,statut:'en_cours',chef:'Ahmed K.',debut:'2024-06',fin:'2025-03'},
          {id:'CH-003',nom:'Échafaudage Tour Athéna',filiale:'echafaudage',client:'Bouygues',ca:85000,charges:62000,avancement:100,statut:'termine',chef:'Laetitia L.',debut:'2024-10',fin:'2025-01'},
          {id:'CH-004',nom:'Location WC Foire aux Vins',filiale:'roulotte',client:'Mairie Colmar',ca:18000,charges:9500,avancement:100,statut:'termine',chef:'Olivier D.',debut:'2024-08',fin:'2024-09'},
          {id:'CH-005',nom:'Immeuble Quai des Bateliers',filiale:'ezel',client:'Particulier',ca:580000,charges:490000,avancement:45,statut:'en_cours',chefId:'EMP008',debut:'2024-11',fin:'2025-10'},
          {id:'CH-006',nom:'Échafaudage Cathédrale',filiale:'echafaudage',client:'DRAC Grand Est',ca:125000,charges:98000,avancement:60,statut:'en_cours',chef:'Laetitia L.',debut:'2025-01',fin:'2025-08'},
          {id:'CH-007',nom:'Barrières Festival Musique',filiale:'roulotte',client:'Assoc. Culture 67',ca:12000,charges:5800,avancement:0,statut:'planifie',chef:'Olivier D.',debut:'2025-06',fin:'2025-07'},
          {id:'CH-008',nom:'Réfection Pont SNCF',filiale:'ezel',client:'SNCF Réseau',ca:750000,charges:620000,avancement:20,statut:'en_cours',chef:'Ahmed K.',debut:'2025-01',fin:'2026-03'},
          {id:'CH-009',nom:'Refacturation services holding',filiale:'yilmaz',client:'Interne',ca:95000,charges:72000,avancement:50,statut:'en_cours',chef:'Direction',debut:'2025-01',fin:'2025-12'},
          {id:'CH-010',nom:'Location sanitaires chantier A35',filiale:'roulotte',client:'Eurovia',ca:28000,charges:14000,avancement:35,statut:'en_cours',chef:'Olivier D.',debut:'2025-02',fin:'2025-09'}
        ];
        const filteredCh = anaFiliale === 'all' ? chantiers : chantiers.filter(c => c.filiale === anaFiliale);
        const totalCA = filteredCh.reduce((s,c) => s + c.ca, 0);
        const totalCharges = filteredCh.reduce((s,c) => s + c.charges, 0);
        const margeBrute = totalCA - totalCharges;
        const margePct = totalCA > 0 ? (margeBrute / totalCA * 100).toFixed(1) : 0;
        const enCours = filteredCh.filter(c => c.statut === 'en_cours').length;
        const termines = filteredCh.filter(c => c.statut === 'termine').length;
        const caParFiliale = FILIALES_ANA.filter(f=>f.id!=='all').map(f => ({...f, ca: chantiers.filter(c=>c.filiale===f.id).reduce((s,c)=>s+c.ca,0), charges: chantiers.filter(c=>c.filiale===f.id).reduce((s,c)=>s+c.charges,0)}));
        const maxCaFil = Math.max(...caParFiliale.map(f=>f.ca), 1);
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:8}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Suivi Analytique</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Rentabilité par chantier, filiale et projet</div></div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <select value={anaFiliale} onChange={e => setAnaFiliale(e.target.value)} style={{padding:'7px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.85rem', fontWeight:600}}>
                  {FILIALES_ANA.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
            </div>
            {/* KPI */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:16}}>
              {[
                {l:'Chiffre d\'affaires',v:fmt(totalCA),c:'#059669',bg:'#f0fdf4'},
                {l:'Charges totales',v:fmt(totalCharges),c:'#8a6040',bg:'#faf6ef'},
                {l:'Marge brute',v:fmt(margeBrute),c: margeBrute>=0?'#2d5016':'#c04030',bg: margeBrute>=0?'#f0f7f0':'#fef2f2'},
                {l:'Taux de marge',v:margePct+'%',c:'#8B6F47',bg:'#faf8f5'},
                {l:'Chantiers actifs',v:enCours+' / '+filteredCh.length,c:'#3b82f6',bg:'#eff6ff'}
              ].map((k,i) => (
                <div key={i} style={{background:k.bg, borderRadius:crmRd, padding:'12px 14px', border:`1px solid ${$border}`}}>
                  <div style={{fontSize:'0.68rem', color:$textMut, fontWeight:600, textTransform:'uppercase'}}>{k.l}</div>
                  <div style={{fontSize:'1.35rem', fontWeight:800, color:k.c, marginTop:4}}>{k.v}</div>
                </div>
              ))}
            </div>
            {/* Tabs */}
            <div style={{display:'flex', gap:6, marginBottom:14}}>
              {[{id:'rentabilite',l:'Rentabilité chantiers'},{id:'filiales',l:'Par filiale'},{id:'budget_vs_reel',l:'Budget vs Réalisé'}].map(t => (
                <button key={t.id} onClick={() => setAnaTab(t.id)} style={{padding:'6px 14px', borderRadius:crmRd, border: anaTab===t.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: anaTab===t.id ? '#faf6ef' : 'white', color: anaTab===t.id ? '#8B6F47' : '#6b5d4d', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>{t.l}</button>
              ))}
            </div>
            {/* Tab: Rentabilité chantiers */}
            {anaTab === 'rentabilite' && (
              <div style={{overflowX:'auto', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.78rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {['Chantier','Client','Filiale','CA','Charges','Marge','%','Avancement','Statut'].map(h => <th key={h} style={{position:'relative',padding:'10px 8px', textAlign:'left', fontWeight:600, fontSize:'0.7rem', color:$textMut, borderBottom:`1px solid ${$border}`, letterSpacing:'0.04em', textTransform:'uppercase', whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{filteredCh.sort((a,b) => (b.ca-b.charges)/(b.ca||1) - (a.ca-a.charges)/(a.ca||1)).map(c => {
                    const m = c.ca - c.charges; const mp = c.ca > 0 ? (m/c.ca*100).toFixed(1) : 0;
                    const statC = c.statut === 'termine' ? '#059669' : c.statut === 'en_cours' ? '#3b82f6' : '#f59e0b';
                    const statL = c.statut === 'termine' ? 'Terminé' : c.statut === 'en_cours' ? 'En cours' : 'Planifié';
                    return <tr key={c.id} style={{borderBottom:`1px solid ${$border}`}}>
                      <td style={{padding:'8px 10px', fontWeight:700}}>{c.nom}</td>
                      <td style={{padding:'8px 10px', fontSize:'0.75rem', color:$textSec}}>{c.client}</td>
                      <td style={{padding:'8px 10px', fontSize:'0.72rem'}}>{FILIALES_ANA.find(f=>f.id===c.filiale)?.label || '—'}</td>
                      <td style={{padding:'8px 10px', fontWeight:600, color:'#059669'}}>{fmt(c.ca)}</td>
                      <td style={{padding:'8px 10px', color:'#8a6040'}}>{fmt(c.charges)}</td>
                      <td style={{padding:'8px 10px', fontWeight:700, color: m>=0?'#2d5016':'#c04030'}}>{fmt(m)}</td>
                      <td style={{padding:'8px 10px', fontWeight:700, color: mp>=15?'#059669':mp>=5?'#d97706':'#dc2626'}}>{mp}%</td>
                      <td style={{padding:'8px 10px'}}><div style={{display:'flex',alignItems:'center',gap:6}}><div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:c.avancement+'%',height:'100%',borderRadius:3,background: c.avancement>=80?'#059669':c.avancement>=40?'#3b82f6':'#f59e0b'}}/></div><span style={{fontSize:'0.7rem',fontWeight:700,color:$textSec}}>{c.avancement}%</span></div></td>
                      <td style={{padding:'8px 10px'}}><span style={{padding:'2px 8px',borderRadius:crmRd,background:statC+'15',color:statC,fontWeight:700,fontSize:'0.72rem'}}>{statL}</span></td>
                    </tr>;
                  })}</tbody>
                  <tfoot><tr style={{background:$bgSub, fontWeight:800}}>
                    <td colSpan={3} style={{padding:'10px', color:$text}}>TOTAL ({filteredCh.length} chantiers)</td>
                    <td style={{padding:'10px', color:'#059669'}}>{fmt(totalCA)}</td>
                    <td style={{padding:'10px', color:'#8a6040'}}>{fmt(totalCharges)}</td>
                    <td style={{padding:'10px', color: margeBrute>=0?'#2d5016':'#c04030'}}>{fmt(margeBrute)}</td>
                    <td style={{padding:'10px', color:$accent}}>{margePct}%</td>
                    <td colSpan={2}></td>
                  </tr></tfoot>
                </table>
              </div>
            )}
            {/* Tab: Par filiale */}
            {anaTab === 'filiales' && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>CA par filiale</span></div>
                  <div style={{padding:'16px'}}>
                    {caParFiliale.sort((a,b)=>b.ca-a.ca).map(f => {
                      const m = f.ca - f.charges; const mp = f.ca > 0 ? (m/f.ca*100).toFixed(1) : 0;
                      return <div key={f.id} style={{marginBottom:12}}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                          <span style={{fontSize:'0.82rem', fontWeight:600, color:$text}}>{f.label}</span>
                          <span style={{fontSize:'0.82rem', fontWeight:700, color:'#059669'}}>{fmt(f.ca)}</span>
                        </div>
                        <div style={{height:10, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                          <div style={{width:(f.ca/maxCaFil*100)+'%', height:'100%', borderRadius:crmRd, background:'linear-gradient(90deg, #6b8a5e, #8B6F47)'}}/>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', marginTop:3}}>
                          <span style={{fontSize:'0.7rem', color:$textMut}}>Marge: {fmt(m)} ({mp}%)</span>
                          <span style={{fontSize:'0.7rem', color:$textSec}}>{chantiers.filter(c=>c.filiale===f.id).length} chantiers</span>
                        </div>
                      </div>;
                    })}
                  </div>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Répartition CA (Donut)</span></div>
                  <div style={{padding:'16px'}}>
                    <svg viewBox="0 0 200 200" style={{width:'100%', maxWidth:250, display:'block', margin:'0 auto'}}>
                      {(() => {
                        const cols = ['#6b8a5e',$accent,'#5a8a48','#d4a030'];
                        const sorted = caParFiliale.filter(f=>f.ca>0).sort((a,b)=>b.ca-a.ca);
                        const total = sorted.reduce((s,f)=>s+f.ca,0);
                        let cumAngle = 0;
                        return sorted.map((f,i) => {
                          const pct = f.ca / total;
                          const startAngle = cumAngle * 2 * Math.PI;
                          cumAngle += pct;
                          const endAngle = cumAngle * 2 * Math.PI;
                          const x1 = 100 + 70 * Math.cos(startAngle - Math.PI/2);
                          const y1 = 100 + 70 * Math.sin(startAngle - Math.PI/2);
                          const x2 = 100 + 70 * Math.cos(endAngle - Math.PI/2);
                          const y2 = 100 + 70 * Math.sin(endAngle - Math.PI/2);
                          const large = pct > 0.5 ? 1 : 0;
                          return <path key={i} d={`M100,100 L${x1},${y1} A70,70 0 ${large},1 ${x2},${y2} Z`} fill={cols[i%cols.length]} opacity="0.85"/>;
                        });
                      })()}
                      <circle cx="100" cy="100" r="35" fill="white"/>
                      <text x="100" y="96" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2d2216">{fmt(totalCA)}</text>
                      <text x="100" y="110" textAnchor="middle" fontSize="6" fill="#b0a08a">CA Total</text>
                    </svg>
                    <div style={{display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginTop:10}}>
                      {caParFiliale.filter(f=>f.ca>0).sort((a,b)=>b.ca-a.ca).map((f,i) => {
                        const cols = ['#6b8a5e',$accent,'#5a8a48','#d4a030'];
                        return <span key={f.id} style={{fontSize:'0.72rem', display:'flex', alignItems:'center', gap:4}}><span style={{width:8,height:8,borderRadius:'50%',background:cols[i%cols.length]}}/>{f.label} ({(f.ca/totalCA*100).toFixed(0)}%)</span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Tab: Budget vs Réalisé */}
            {anaTab === 'budget_vs_reel' && (
              <div style={{overflowX:'auto', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.78rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {['Chantier','Budget CA','Réalisé CA','Écart CA','Budget Charges','Réalisé Charges','Écart Charges','Performance'].map(h => <th key={h} style={{position:'relative',padding:'10px 8px', textAlign:'left', fontWeight:700, color:$accent, borderBottom:`2px solid ${$borderAlt}`, fontSize:'0.74rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{filteredCh.map(c => {
                    const budgetCA = Math.round(c.ca * (100 / Math.max(c.avancement, 10)) * (c.avancement / 100));
                    const budgetCharges = Math.round(c.charges * 1.05);
                    const realCA = Math.round(c.ca * c.avancement / 100);
                    const realCharges = Math.round(c.charges * c.avancement / 100);
                    const ecartCA = realCA - budgetCA;
                    const ecartCh = realCharges - budgetCharges;
                    const perf = budgetCA > 0 ? ((realCA - realCharges) / budgetCA * 100).toFixed(1) : 0;
                    return <tr key={c.id} style={{borderBottom:`1px solid ${$border}`}}>
                      <td style={{padding:'8px 10px', fontWeight:700}}>{c.nom}</td>
                      <td style={{padding:'8px 10px'}}>{fmt(budgetCA)}</td>
                      <td style={{padding:'8px 10px', fontWeight:600}}>{fmt(realCA)}</td>
                      <td style={{padding:'8px 10px', color: ecartCA>=0?'#059669':'#dc2626', fontWeight:600}}>{ecartCA>=0?'+':''}{fmt(ecartCA)}</td>
                      <td style={{padding:'8px 10px'}}>{fmt(budgetCharges)}</td>
                      <td style={{padding:'8px 10px', fontWeight:600}}>{fmt(realCharges)}</td>
                      <td style={{padding:'8px 10px', color: ecartCh<=0?'#059669':'#dc2626', fontWeight:600}}>{ecartCh>=0?'+':''}{fmt(ecartCh)}</td>
                      <td style={{padding:'8px 10px'}}><span style={{padding:'2px 8px',borderRadius:crmRd,fontWeight:700,fontSize:'0.72rem', background: perf>=10?'#dcfce7':perf>=0?'#fef3c7':'#fef2f2', color: perf>=10?'#15803d':perf>=0?'#a16207':'#dc2626'}}>{perf}%</span></td>
                    </tr>;
                  })}</tbody>
                </table>
              </div>
            )}
          </div>
        );
}
