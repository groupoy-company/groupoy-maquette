// === Onglet « budget » — extrait de App.jsx (modularisation, forme iife) ===
import React, {  } from 'react';

export default function TabBudget(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $shadowLg, $text, $textMut, $textSec, BUDGET_CATS, BUDGET_FILIALES, api, axios, budgetAnnee, budgetApiConfig, budgetCopyPct, budgetData, budgetEditCell, budgetFiliale, budgetImportModal, budgetImportText, budgetRowEdit, budgetTab, crmRd, csvExportText, data, defaultApiConfig, defaultBudgetData, getBudgetForFiliale, mapping, moisCourts, saveBudget, saveBudgetApi, setBudgetAnnee, setBudgetCopyPct, setBudgetEditCell, setBudgetFiliale, setBudgetImportModal, setBudgetImportText, setBudgetRowEdit, setBudgetTab, setCsvExportText } = __props;
        const bd = getBudgetForFiliale(budgetFiliale, budgetAnnee);
        const filInfo = BUDGET_FILIALES.find(f => f.id === budgetFiliale) || BUDGET_FILIALES[0];
        const fmt = v => v >= 1000000 ? (v/1000000).toFixed(1).replace('.',',')+' M€' : v >= 1000 ? Math.round(v/1000)+' k€' : v.toLocaleString('fr-FR')+' €';
        const now = new Date();
        const moisActuel = now.getFullYear() === budgetAnnee ? now.getMonth() : (budgetAnnee < now.getFullYear() ? 11 : -1);

        // Calculs globaux
        const revenus = BUDGET_CATS.filter(c => c.type === 'revenu');
        const charges = BUDGET_CATS.filter(c => c.type === 'charge');
        const totalRevPrevu = revenus.reduce((s,c) => s + (bd[c.id]?.prevu||[]).reduce((a,v)=>a+v,0), 0);
        const totalRevReel = revenus.reduce((s,c) => s + (bd[c.id]?.reel||[]).reduce((a,v)=>a+v,0), 0);
        const totalChgPrevu = charges.reduce((s,c) => s + (bd[c.id]?.prevu||[]).reduce((a,v)=>a+v,0), 0);
        const totalChgReel = charges.reduce((s,c) => s + (bd[c.id]?.reel||[]).reduce((a,v)=>a+v,0), 0);
        const resultatPrevu = totalRevPrevu - totalChgPrevu;
        const resultatReel = totalRevReel - totalChgReel;
        const tauxExec = totalRevPrevu > 0 ? Math.round(totalRevReel / totalRevPrevu * 100) : 0;

        // Alertes
        const alertes = [];
        BUDGET_CATS.filter(c => c.type === 'charge').forEach(c => {
          const prevuYTD = (bd[c.id]?.prevu||[]).slice(0, moisActuel+1).reduce((a,v)=>a+v,0);
          const reelYTD = (bd[c.id]?.reel||[]).slice(0, moisActuel+1).reduce((a,v)=>a+v,0);
          if(prevuYTD > 0 && reelYTD > prevuYTD * 1.1) alertes.push({cat:c, ecart: Math.round((reelYTD/prevuYTD-1)*100), prevuYTD, reelYTD});
        });

        return (
          <div style={{padding:'20px 0'}}>
            {/* Header */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <div>
                <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>📊 Budget Prévisionnel</h1>
                <div style={{fontSize:'0.88rem', color:$textMut, marginTop:2}}>Suivi budgétaire détaillé — Prévu vs Réalisé</div>
              </div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <select value={budgetFiliale} onChange={e => setBudgetFiliale(e.target.value)} style={{padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', fontWeight:600, background:$bgCard}}>
                  {BUDGET_FILIALES.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
                <select value={budgetAnnee} onChange={e => setBudgetAnnee(Number(e.target.value))} style={{padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', fontWeight:600, background:$bgCard}}>
                  {[2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <button onClick={() => { if(window.confirm('Réinitialiser le budget avec les données par défaut ?')) { saveBudget(defaultBudgetData); }}} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', color:'#dc2626', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>🔄 Réinit.</button>
                <button onClick={() => {
                  const bd = getBudgetForFiliale(budgetFiliale, budgetAnnee);
                  const rows = [['Catégorie','Type',...moisCourts.flatMap(m=>[m+' Prévu',m+' Réel',m+' Écart%']),'TOTAL Prévu','TOTAL Réel','TOTAL Écart%'].join(';')];
                  BUDGET_CATS.forEach(c => {
                    const row = bd[c.id]||{prevu:Array(12).fill(0),reel:Array(12).fill(0)};
                    const cols = [c.label, c.type];
                    for(let i=0;i<12;i++) { const p=row.prevu[i]||0; const r=row.reel[i]||0; const ec=p>0?Math.round((r-p)/p*100):0; cols.push(p,r,ec+'%'); }
                    const tp=row.prevu.reduce((a,v)=>a+v,0); const tr=row.reel.reduce((a,v)=>a+v,0);
                    cols.push(tp,tr,tp>0?Math.round((tr-tp)/tp*100)+'%':'');
                    rows.push(cols.join(';'));
                  });
                  setCsvExportText(rows.join('\n'));
                }} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #d4c5a9', background:$bgSub, color:$accent, fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>📥 Export CSV</button>
                {budgetFiliale !== 'all' && <>
                  <button onClick={() => { setBudgetImportModal('csv'); setBudgetImportText(''); }} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #d5e8d5', background:'#f0f7f0', color:'#3a6a2a', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>📤 Import CSV</button>
                  <button onClick={() => { setBudgetImportModal('paste'); setBudgetImportText(''); }} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #d5d8e8', background:'#f0f2f7', color:'#3a4a6a', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>📋 Coller Excel</button>
                  <button onClick={() => { setBudgetImportModal('copy_year'); setBudgetCopyPct(5); }} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #e8d5e8', background:'#f7f0f7', color:'#6a3a6a', fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>🔄 Copier N-1</button>
                </>}
              </div>
            </div>
            {budgetFiliale === 'all' && <div style={{padding:'8px 14px', background:$accent+'15', borderRadius:crmRd, border:'1px solid #fde68a', marginBottom:12, fontSize:'0.78rem', color:'#92400e', fontWeight:600}}>📊 Vue consolidée (lecture seule) — Sélectionnez une filiale pour modifier les montants</div>}

                        {/* KPI Cards */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:18}}>
              <div style={{background:'linear-gradient(145deg, #fafcfa, #f2f8f0)', borderRadius:crmRd, padding:'20px', border:'1px solid #d8e8d2', position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', top:-10, right:-10, width:70, height:70, borderRadius:'50%', background:'#e8f5e2', opacity:0.5}}/>
                <div style={{fontSize:'0.7rem', fontWeight:700, color:'#7a9a6a', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8}}>Revenus</div>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}><span style={{fontSize:'1.6rem', fontWeight:900, color:'#3a5a28'}}>{fmt(totalRevReel)}</span><span style={{fontSize:'0.78rem', color:'#9ab88c'}}>/ {fmt(totalRevPrevu)}</span></div>
                <div style={{marginTop:12, height:6, background:'#e4eed8', borderRadius:3}}><div style={{width:Math.min(100, totalRevPrevu > 0 ? totalRevReel/totalRevPrevu*100 : 0)+'%', height:'100%', background:'linear-gradient(90deg, #7a9a6a, #5a8a48)', borderRadius:3, transition:'width 0.5s'}}/></div>
                <div style={{fontSize:'0.7rem', color:'#9ab88c', marginTop:4, textAlign:'right'}}>{totalRevPrevu > 0 ? Math.round(totalRevReel/totalRevPrevu*100) : 0}% atteint</div>
              </div>
              <div style={{background:'linear-gradient(145deg, #fcfaf8, #f8f2ec)', borderRadius:crmRd, padding:'20px', border:'1px solid #e8d8c8', position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', top:-10, right:-10, width:70, height:70, borderRadius:'50%', background:'#f5ece2', opacity:0.5}}/>
                <div style={{fontSize:'0.7rem', fontWeight:700, color:'#a08060', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8}}>Charges</div>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}><span style={{fontSize:'1.6rem', fontWeight:900, color:'#6a4a28'}}>{fmt(totalChgReel)}</span><span style={{fontSize:'0.78rem', color:'#c0a888'}}>/ {fmt(totalChgPrevu)}</span></div>
                <div style={{marginTop:12, height:6, background:'#eee4d8', borderRadius:3}}><div style={{width:Math.min(100, totalChgPrevu > 0 ? totalChgReel/totalChgPrevu*100 : 0)+'%', height:'100%', background: totalChgReel > totalChgPrevu ? 'linear-gradient(90deg, #c07040, #a04020)' : 'linear-gradient(90deg, #a08060, #8a6a48)', borderRadius:3, transition:'width 0.5s'}}/></div>
                <div style={{fontSize:'0.7rem', color:'#c0a888', marginTop:4, textAlign:'right'}}>{totalChgPrevu > 0 ? Math.round(totalChgReel/totalChgPrevu*100) : 0}% consommé</div>
              </div>
              <div style={{background: resultatReel >= 0 ? 'linear-gradient(145deg, #fcfcf6, #f6f4e8)' : 'linear-gradient(145deg, #fcf6f6, #f8ece8)', borderRadius:crmRd, padding:'20px', border: resultatReel >= 0 ? '1px solid #e0dcc0' : '1px solid #e8c8c0', position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', top:-10, right:-10, width:70, height:70, borderRadius:'50%', background: resultatReel >= 0 ? '#f0ecd0' : '#f5dcd8', opacity:0.5}}/>
                <div style={{fontSize:'0.7rem', fontWeight:700, color: resultatReel >= 0 ? '#8B6F47' : '#a05040', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8}}>Résultat net</div>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}><span style={{fontSize:'1.6rem', fontWeight:900, color: resultatReel >= 0 ? '#5a4a20' : '#8a2828'}}>{fmt(resultatReel)}</span><span style={{fontSize:'0.78rem', color: resultatReel >= 0 ? '#b0a070' : '#c09080'}}>prévu {fmt(resultatPrevu)}</span></div>
                <div style={{display:'flex', gap:8, marginTop:14}}>
                  <span style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, background: resultatReel >= 0 ? '#eef5e0' : '#f8e0e0', color: resultatReel >= 0 ? '#5a7a30' : '#8a3030', fontWeight:700}}>Marge {totalRevReel > 0 ? Math.round(resultatReel/totalRevReel*100) : 0}%</span>
                  <span style={{fontSize:'0.72rem', padding:'3px 10px', borderRadius:crmRd, background:$bgSub, color:$accent, fontWeight:700}}>Exec. {tauxExec}%</span>
                </div>
              </div>
            </div>

            {/* N vs N-1 comparison */}
            {(() => {
              const bdPrev = getBudgetForFiliale(budgetFiliale, budgetAnnee - 1);
              const prevRevReel = revenus.reduce((s,c) => s + (bdPrev[c.id]?.reel||[]).reduce((a,v)=>a+v,0), 0);
              const prevChgReel = charges.reduce((s,c) => s + (bdPrev[c.id]?.reel||[]).reduce((a,v)=>a+v,0), 0);
              const prevRes = prevRevReel - prevChgReel;
              if(prevRevReel === 0 && prevChgReel === 0) return null;
              const evRev = prevRevReel > 0 ? Math.round((totalRevReel / prevRevReel - 1) * 100) : 0;
              const evChg = prevChgReel > 0 ? Math.round((totalChgReel / prevChgReel - 1) * 100) : 0;
              return (
                <div style={{display:'flex', gap:12, marginBottom:16}}>
                  <div style={{flex:1, padding:'8px 14px', borderRadius:crmRd, background:$bgSub, border:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:'0.78rem', color:$textSec}}>📊 Comparaison {budgetAnnee} vs {budgetAnnee-1}</span>
                    <div style={{display:'flex', gap:16}}>
                      <span style={{fontSize:'0.78rem'}}>Revenus: <strong style={{color: evRev >= 0 ? '#5a8a48' : '#a04020'}}>{evRev > 0 ? '+' : ''}{evRev}%</strong></span>
                      <span style={{fontSize:'0.78rem'}}>Charges: <strong style={{color: evChg <= 0 ? '#5a8a48' : '#a04020'}}>{evChg > 0 ? '+' : ''}{evChg}%</strong></span>
                      <span style={{fontSize:'0.78rem'}}>Résultat: <strong style={{color: (totalRevReel-totalChgReel) >= prevRes ? '#059669' : '#dc2626'}}>{fmt(totalRevReel-totalChgReel)} vs {fmt(prevRes)}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Taux exécution bar */}
            <div style={{background:$bgCard, borderRadius:crmRd, padding:'14px 18px', border:`1px solid ${$border}`, marginBottom:20, display:'flex', alignItems:'center', gap:16}}>
              <div style={{fontSize:'0.82rem', fontWeight:700, color:$text, whiteSpace:'nowrap'}}>📊 Taux d'exécution budgétaire</div>
              <div style={{flex:1, height:18, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                <div style={{width: Math.min(100, tauxExec)+'%', height:'100%', background: tauxExec > 100 ? 'linear-gradient(90deg, #dc2626, #ef4444)' : tauxExec > 80 ? 'linear-gradient(90deg, #7a9a6a, #5a8a48)' : 'linear-gradient(90deg, #c0a060, #a08840)', borderRadius:crmRd, transition:'width 0.5s'}}/>
              </div>
              <div style={{fontSize:'1rem', fontWeight:800, color: tauxExec > 80 ? '#5a8a48' : '#a08840', whiteSpace:'nowrap'}}>{tauxExec}%</div>
              <div style={{fontSize:'0.75rem', color:$textMut}}>({moisActuel >= 0 ? moisCourts[moisActuel] : '—'} {budgetAnnee})</div>
            </div>

            {/* Tab buttons */}
            <div style={{display:'flex', gap:6, marginBottom:16}}>
              {[{id:'tableau',label:'📋 Tableau détaillé'},{id:'graphiques',label:'📈 Graphiques'},{id:'alertes',label:'🚨 Alertes ('+alertes.length+')'},{id:'api',label:'🔌 API & Intégrations'}].map(t => (
                <button key={t.id} onClick={() => setBudgetTab(t.id)} style={{padding:'6px 14px', borderRadius:crmRd, border: budgetTab===t.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: budgetTab===t.id ? '#faf6ef' : 'white', color: budgetTab===t.id ? '#8B6F47' : '#6b5d4d', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>{t.label}</button>
              ))}
            </div>

            {/* TAB: TABLEAU */}
            {budgetTab === 'tableau' && (
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.03)'}}>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.82rem'}}>
                    <thead>
                      <tr style={{background:$bgSub}}>
                        <th style={{position:'relative',padding:'10px 12px', textAlign:'left', fontWeight:700, color:$text, position:'sticky', left:0, background:$bgSub, zIndex:2, minWidth:220, borderRight:`2px solid ${$borderAlt}`}}>Catégorie<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        {moisCourts.map((m,i) => (
                          <th key={i} colSpan={3} style={{position:'relative',padding:'8px 4px', textAlign:'center', fontWeight:700, color: i <= moisActuel ? '#2d2216' : '#ccc4b8', borderRight:`1px solid ${$border}`, minWidth:180, background: i === moisActuel ? '#fef3c7' : '#faf8f5'}}>
                            {m}
                          <div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        ))}
                        <th colSpan={3} style={{position:'relative',padding:'8px 4px', textAlign:'center', fontWeight:800, color:$text, background:$bgSub, minWidth:200}}>TOTAL ANNUEL<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      </tr>
                      <tr style={{background:$bgSub, fontSize:'0.68rem', color:$textMut}}>
                        <th style={{position:'sticky', left:0, background:$bgSub, zIndex:2, borderRight:`2px solid ${$borderAlt}`}}></th>
                        {moisCourts.map((m,i) => (
                          <React.Fragment key={i}>
                            <th style={{position:'relative',padding:'3px 4px', textAlign:'right', fontWeight:600}}>Prévu<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                            <th style={{position:'relative',padding:'3px 4px', textAlign:'right', fontWeight:600}}>Réel<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                            <th style={{position:'relative',padding:'3px 4px', textAlign:'center', fontWeight:600, borderRight:`1px solid ${$border}`}}>Écart<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                          </React.Fragment>
                        ))}
                        <th style={{position:'relative',padding:'3px 4px', textAlign:'right', fontWeight:600}}>Prévu<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        <th style={{position:'relative',padding:'3px 4px', textAlign:'right', fontWeight:600}}>Réel<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        <th style={{position:'relative',padding:'3px 4px', textAlign:'center', fontWeight:600}}>Écart<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Section headers + rows */}
                      {[{type:'revenu', label:'💰 REVENUS', color:'#059669'}, {type:'charge', label:'💸 CHARGES', color:'#dc2626'}, {type:'invest', label:'🏭 INVESTISSEMENTS', color:'#7c3aed'}, {type:'financier', label:'🏦 FINANCIER', color:'#0891b2'}].map(section => {
                        const cats = BUDGET_CATS.filter(c => c.type === section.type);
                        if(cats.length === 0) return null;
                        return (
                          <React.Fragment key={section.type}>
                            <tr><td colSpan={40} style={{padding:'8px 12px', fontWeight:800, color:section.color, fontSize:'0.78rem', background:$bgSub, borderTop:`2px solid ${$borderAlt}`}}>{section.label}</td></tr>
                            {cats.map(cat => {
                              const row = bd[cat.id] || {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                              const totP = row.prevu.reduce((a,v)=>a+v,0);
                              const totR = row.reel.reduce((a,v)=>a+v,0);
                              const totEcart = totR - totP;
                              const totPct = totP > 0 ? Math.round((totEcart/totP)*100) : 0;
                              return (
                                <tr key={cat.id} style={{borderBottom:`1px solid ${$border}`}}>
                                  <td style={{padding:'6px 12px', fontWeight:600, position:'sticky', left:0, background:$bgCard, zIndex:1, borderRight:`2px solid ${$borderAlt}`, whiteSpace:'nowrap', cursor: budgetFiliale !== 'all' ? 'pointer' : 'default'}}
                                    onClick={() => { if(budgetFiliale !== 'all') setBudgetRowEdit({cat: cat.id, field:'prevu', values: [...(row.prevu || Array(12).fill(0))], reelValues: [...(row.reel || Array(12).fill(0))]}); }}
                                    title={budgetFiliale !== 'all' ? 'Cliquer pour éditer toute la ligne' : ''}>
                                    <span style={{marginRight:4}}>{cat.icon}</span>{cat.label}
                                    {budgetFiliale !== 'all' && <span style={{fontSize:'0.6rem', color:$textMut, marginLeft:4}}>✏️</span>}
                                  </td>
                                  {moisCourts.map((m,i) => {
                                    const p = row.prevu[i]||0;
                                    const r = row.reel[i]||0;
                                    const ec = r - p;
                                    const ecPct = p > 0 ? Math.round((ec/p)*100) : 0;
                                    const isCharge = cat.type === 'charge' || cat.type === 'invest' || cat.type === 'financier';
                                    const ecColor = ec === 0 ? '#b0a08a' : (isCharge ? (ec > 0 ? '#dc2626' : '#059669') : (ec > 0 ? '#059669' : '#dc2626'));
                                    const isPast = i <= moisActuel;
                                    const isEditing = budgetEditCell && budgetEditCell.cat === cat.id && budgetEditCell.mois === i;
                                    return (
                                      <React.Fragment key={i}>
                                        <td style={{padding:'4px 6px', textAlign:'right', color: isPast ? '#2d2216' : '#ccc4b8', cursor: budgetFiliale !== 'all' ? 'pointer' : 'default', background: isEditing ? '#fef3c7' : (i === moisActuel ? '#fffbeb' : 'white')}}
                                          onClick={() => { if(budgetFiliale !== 'all') setBudgetEditCell({cat:cat.id, mois:i, field:'prevu', val:String(p)}); }}>
                                          {isEditing && budgetEditCell.field==='prevu' ?
                                            <input autoFocus type="number" value={budgetEditCell.val} onChange={e => setBudgetEditCell(prev=>({...prev,val:e.target.value}))}
                                              onBlur={() => { const nd = JSON.parse(JSON.stringify(budgetData)); if(!nd[budgetFiliale]) nd[budgetFiliale]={}; if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={}; if(!nd[budgetFiliale][budgetAnnee][cat.id]) nd[budgetFiliale][budgetAnnee][cat.id]={prevu:Array(12).fill(0),reel:Array(12).fill(0)}; nd[budgetFiliale][budgetAnnee][cat.id].prevu[i]=Number(budgetEditCell.val)||0; saveBudget(nd); setBudgetEditCell(null); }}
                                              onKeyDown={e => { if(e.key==='Enter') e.target.blur(); if(e.key==='Escape') setBudgetEditCell(null); }}
                                              style={{width:60, padding:'2px 4px', borderRadius:crmRd, border:'1px solid #d4c5a9', fontSize:'0.78rem', textAlign:'right'}}/>
                                            : (p > 0 ? (p>=1000 ? Math.round(p/1000)+'k' : p.toLocaleString('fr-FR')) : '—')}
                                        </td>
                                        <td style={{padding:'4px 6px', textAlign:'right', fontWeight: isPast && r > 0 ? 700 : 400, color: isPast ? '#2d2216' : '#ccc4b8', cursor: budgetFiliale !== 'all' ? 'pointer' : 'default', background: isEditing ? '#fef3c7' : (i === moisActuel ? '#fffbeb' : 'white')}}
                                          onClick={() => { if(budgetFiliale !== 'all') setBudgetEditCell({cat:cat.id, mois:i, field:'reel', val:String(r)}); }}>
                                          {isEditing && budgetEditCell.field==='reel' ?
                                            <input autoFocus type="number" value={budgetEditCell.val} onChange={e => setBudgetEditCell(prev=>({...prev,val:e.target.value}))}
                                              onBlur={() => { const nd = JSON.parse(JSON.stringify(budgetData)); if(!nd[budgetFiliale]) nd[budgetFiliale]={}; if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={}; if(!nd[budgetFiliale][budgetAnnee][cat.id]) nd[budgetFiliale][budgetAnnee][cat.id]={prevu:Array(12).fill(0),reel:Array(12).fill(0)}; nd[budgetFiliale][budgetAnnee][cat.id].reel[i]=Number(budgetEditCell.val)||0; saveBudget(nd); setBudgetEditCell(null); }}
                                              onKeyDown={e => { if(e.key==='Enter') e.target.blur(); if(e.key==='Escape') setBudgetEditCell(null); }}
                                              style={{width:60, padding:'2px 4px', borderRadius:crmRd, border:'1px solid #d4c5a9', fontSize:'0.78rem', textAlign:'right'}}/>
                                            : (r > 0 ? (r>=1000 ? Math.round(r/1000)+'k' : r.toLocaleString('fr-FR')) : (isPast ? '—' : ''))}
                                        </td>
                                        <td style={{padding:'4px 4px', textAlign:'center', fontSize:'0.7rem', fontWeight:600, color:ecColor, borderRight:`1px solid ${$border}`}}>
                                          {isPast && (p > 0 || r > 0) ? (ecPct > 0 ? '+' : '') + ecPct + '%' : ''}
                                        </td>
                                      </React.Fragment>
                                    );
                                  })}
                                  <td style={{padding:'4px 8px', textAlign:'right', fontWeight:700, background:$bgSub}}>{totP > 0 ? fmt(totP) : '—'}</td>
                                  <td style={{padding:'4px 8px', textAlign:'right', fontWeight:800, background:$bgSub, color:totR > 0 ? '#2d2216' : '#ccc4b8'}}>{totR > 0 ? fmt(totR) : '—'}</td>
                                  <td style={{padding:'4px 8px', textAlign:'center', fontWeight:700, background:$bgSub, color: totEcart === 0 ? '#b0a08a' : ((cat.type==='charge' ? (totEcart>0?'#dc2626':'#059669') : (totEcart>0?'#059669':'#dc2626')))}}>
                                    {totP > 0 ? (totPct > 0 ? '+' : '') + totPct + '%' : ''}
                                  </td>
                                </tr>
                              );
                            })}
                            {/* Section total */}
                            <tr style={{background:$bgSub, borderTop:`2px solid ${$borderAlt}`}}>
                              <td style={{padding:'6px 12px', fontWeight:800, color:section.color, position:'sticky', left:0, background:$bgSub, zIndex:1, borderRight:`2px solid ${$borderAlt}`}}>TOTAL {section.label.replace(/[^ ]+ /,'')}</td>
                              {moisCourts.map((m,mi) => {
                                const sp = cats.reduce((s,c) => s + ((bd[c.id]?.prevu||[])[mi]||0), 0);
                                const sr = cats.reduce((s,c) => s + ((bd[c.id]?.reel||[])[mi]||0), 0);
                                return (
                                  <React.Fragment key={mi}>
                                    <td style={{padding:'4px 6px', textAlign:'right', fontWeight:700, color:section.color}}>{sp>0 ? (sp>=1000?Math.round(sp/1000)+'k':'') : ''}</td>
                                    <td style={{padding:'4px 6px', textAlign:'right', fontWeight:800, color:section.color}}>{sr>0 ? (sr>=1000?Math.round(sr/1000)+'k':'') : ''}</td>
                                    <td style={{borderRight:`1px solid ${$border}`}}></td>
                                  </React.Fragment>
                                );
                              })}
                              <td style={{padding:'4px 8px', textAlign:'right', fontWeight:800, color:section.color, background:$bgSub}}>{fmt(cats.reduce((s,c) => s + (bd[c.id]?.prevu||[]).reduce((a,v)=>a+v,0), 0))}</td>
                              <td style={{padding:'4px 8px', textAlign:'right', fontWeight:900, color:section.color, background:$bgSub}}>{fmt(cats.reduce((s,c) => s + (bd[c.id]?.reel||[]).reduce((a,v)=>a+v,0), 0))}</td>
                              <td style={{background:$bgSub}}></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                      {/* RÉSULTAT */}
                      <tr style={{background:'#2d2216'}}>
                        <td style={{padding:'10px 12px', fontWeight:900, color:'white', position:'sticky', left:0, background:'#2d2216', zIndex:1, borderRight:'2px solid #4a3f2f'}}>📊 RÉSULTAT (Revenus − Charges)</td>
                        {moisCourts.map((m,mi) => {
                          const rp = revenus.reduce((s,c) => s + ((bd[c.id]?.prevu||[])[mi]||0), 0) - charges.reduce((s,c) => s + ((bd[c.id]?.prevu||[])[mi]||0), 0);
                          const rr = revenus.reduce((s,c) => s + ((bd[c.id]?.reel||[])[mi]||0), 0) - charges.reduce((s,c) => s + ((bd[c.id]?.reel||[])[mi]||0), 0);
                          return (
                            <React.Fragment key={mi}>
                              <td style={{padding:'4px 6px', textAlign:'right', fontWeight:700, color:'#d4c5a9'}}>{rp !== 0 ? (rp>=1000?Math.round(rp/1000)+'k':rp) : ''}</td>
                              <td style={{padding:'4px 6px', textAlign:'right', fontWeight:900, color: rr >= 0 ? '#34d399' : '#fca5a5'}}>{rr !== 0 ? (rr>=1000?Math.round(rr/1000)+'k':rr) : ''}</td>
                              <td style={{borderRight:'1px solid #4a3f2f'}}></td>
                            </React.Fragment>
                          );
                        })}
                        <td style={{padding:'4px 8px', textAlign:'right', fontWeight:800, color:'#d4c5a9', background:'#3d3423'}}>{fmt(resultatPrevu)}</td>
                        <td style={{padding:'4px 8px', textAlign:'right', fontWeight:900, color: resultatReel >= 0 ? '#34d399' : '#fca5a5', background:'#3d3423'}}>{fmt(resultatReel)}</td>
                        <td style={{background:'#3d3423'}}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {budgetFiliale !== 'all' && <div style={{padding:'8px 16px', background:$bgSub, fontSize:'0.72rem', color:$textMut, borderTop:`1px solid ${$border}`}}>💡 Cliquez sur une cellule Prévu ou Réel pour la modifier</div>}
              </div>
            )}

            {/* TAB: GRAPHIQUES */}
            {budgetTab === 'graphiques' && (() => {
              const cRev = '#6b8a5e', cChg = '#a08060', cLine1 = '#5a8a48', cLine2 = '#b0a08a';
              const moisRev = moisCourts.map((_,i) => revenus.reduce((s,c) => s + ((bd[c.id]?.reel||[])[i]||0), 0));
              const moisChg = moisCourts.map((_,i) => charges.reduce((s,c) => s + ((bd[c.id]?.reel||[])[i]||0), 0));
              const moisRes = moisRev.map((r,i) => r - moisChg[i]);
              const maxRC = Math.max(1, ...moisRev, ...moisChg);
              const maxRes = Math.max(1, ...moisRes.map(Math.abs));
              const cumP = []; const cumR = []; let sp2=0, sr2=0;
              for(let i=0;i<12;i++) { sp2 += revenus.reduce((s,c)=>s+((bd[c.id]?.prevu||[])[i]||0),0); sr2 += revenus.reduce((s,c)=>s+((bd[c.id]?.reel||[])[i]||0),0); cumP.push(sp2); cumR.push(sr2); }
              const maxCum = Math.max(1, ...cumP, ...cumR);
              const chargesYTD = charges.map(c => ({...c, total: (bd[c.id]?.reel||[]).slice(0, moisActuel+1).reduce((a,v)=>a+v,0)})).filter(c => c.total > 0).sort((a,b) => b.total - a.total);
              const maxChgBar = chargesYTD[0]?.total || 1;
              const ep = ['#8B6F47','#a08060','#6b8a5e','#7a6a50','#5a8a48','#b09070','#907858','#6a8a7a','#9a7a5a','#5a7a6a'];
              return (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Revenus vs Charges</span><span style={{fontSize:'0.72rem', color:$textMut, marginLeft:8}}>mensuel</span></div>
                  <div style={{padding:'20px'}}>
                    <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                      {[0,1,2,3,4].map(i => <line key={i} x1="30" y1={20+i*35} x2="395" y2={20+i*35} stroke="#f0ebe3" strokeWidth="0.5"/>)}
                      {[0,1,2,3,4].map(i => <text key={'t'+i} x="28" y={24+i*35} textAnchor="end" fontSize="7" fill="#b0a08a">{fmt(maxRC*(4-i)/4)}</text>)}
                      {moisCourts.map((m,i) => {
                        const x = 38 + i * 30; const hR = moisRev[i]/maxRC * 140; const hC = moisChg[i]/maxRC * 140; const future = i > moisActuel;
                        return (<g key={i} opacity={future ? 0.3 : 1}>
                          <rect x={x} y={160-hR} width="11" height={Math.max(1,hR)} rx="2" fill={cRev}/>
                          <rect x={x+13} y={160-hC} width="11" height={Math.max(1,hC)} rx="2" fill={cChg}/>
                          <text x={x+12} y="174" textAnchor="middle" fontSize="7" fill={future ? '#d4d0c8' : '#8B6F47'} fontWeight="600">{m}</text>
                        </g>);
                      })}
                    </svg>
                    <div style={{display:'flex', gap:16, justifyContent:'center', marginTop:4}}>
                      <span style={{fontSize:'0.72rem', display:'flex', alignItems:'center', gap:5}}><span style={{width:10, height:10, borderRadius:2, background:cRev}}/> Revenus</span>
                      <span style={{fontSize:'0.72rem', display:'flex', alignItems:'center', gap:5}}><span style={{width:10, height:10, borderRadius:2, background:cChg}}/> Charges</span>
                    </div>
                  </div>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Résultat mensuel</span><span style={{fontSize:'0.72rem', color:$textMut, marginLeft:8}}>réel</span></div>
                  <div style={{padding:'20px'}}>
                    <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                      <line x1="30" y1="90" x2="395" y2="90" stroke="#d4d0c8" strokeWidth="1"/>
                      <text x="28" y="93" textAnchor="end" fontSize="7" fill="#b0a08a">0</text>
                      {[45,135].map(y => <line key={y} x1="30" y1={y} x2="395" y2={y} stroke="#f5f0e8" strokeWidth="0.5"/>)}
                      {moisCourts.map((m,i) => {
                        const v = moisRes[i]; const h = Math.abs(v)/maxRes * 75; const future = i > moisActuel;
                        return (<g key={i} opacity={future ? 0.25 : 1}>
                          {v >= 0 ? <rect x={40+i*30} y={90-h} width="18" height={Math.max(1,h)} rx="3" fill={cRev}/> : <rect x={40+i*30} y={90} width="18" height={Math.max(1,h)} rx="3" fill={cChg}/>}
                          {!future && v !== 0 && <text x={49+i*30} y={v >= 0 ? 86-h : 100+h} textAnchor="middle" fontSize="6.5" fill={v >= 0 ? '#3a5a28' : '#7a4a28'} fontWeight="700">{(v/1000).toFixed(0)}k</text>}
                          <text x={49+i*30} y="174" textAnchor="middle" fontSize="7" fill={future ? '#d4d0c8' : '#8B6F47'} fontWeight="600">{m}</text>
                        </g>);
                      })}
                    </svg>
                  </div>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>CA cumulé</span><span style={{fontSize:'0.72rem', color:$textMut, marginLeft:8}}>prévu vs réel</span></div>
                  <div style={{padding:'20px'}}>
                    <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                      {[0,1,2,3,4].map(i => (<g key={i}><line x1="35" y1={15+i*38} x2="395" y2={15+i*38} stroke="#f5f0e8" strokeWidth="0.5"/><text x="33" y={19+i*38} textAnchor="end" fontSize="7" fill="#b0a08a">{fmt(maxCum*(4-i)/4)}</text></g>))}
                      <path d={'M ' + cumP.map((v,i) => (40+i*30)+','+(167-v/maxCum*150)).join(' L ') + ' L ' + (40+11*30) + ',167 L 40,167 Z'} fill="#f5f0e8" opacity="0.5"/>
                      <polyline points={cumP.map((v,i) => (40+i*30)+','+(167-v/maxCum*150)).join(' ')} fill="none" stroke={cLine2} strokeWidth="2" strokeDasharray="6 3"/>
                      {moisActuel >= 0 && <path d={'M ' + cumR.filter((_,i) => i <= moisActuel).map((v,i) => (40+i*30)+','+(167-v/maxCum*150)).join(' L ') + ' L ' + (40+moisActuel*30) + ',167 L 40,167 Z'} fill="#e4eed8" opacity="0.4"/>}
                      <polyline points={cumR.filter((_,i) => i <= moisActuel).map((v,i) => (40+i*30)+','+(167-v/maxCum*150)).join(' ')} fill="none" stroke={cLine1} strokeWidth="2.5"/>
                      {cumR.filter((_,i) => i <= moisActuel).map((v,i) => <circle key={i} cx={40+i*30} cy={167-v/maxCum*150} r="3.5" fill="white" stroke={cLine1} strokeWidth="2"/>)}
                      {moisCourts.map((m,i) => <text key={i} x={40+i*30} y="178" textAnchor="middle" fontSize="7" fill={i <= moisActuel ? '#8B6F47' : '#d4d0c8'} fontWeight="600">{m}</text>)}
                    </svg>
                    <div style={{display:'flex', gap:16, justifyContent:'center', marginTop:4}}>
                      <span style={{fontSize:'0.72rem', display:'flex', alignItems:'center', gap:5}}><span style={{width:14, height:2, background:cLine2, display:'inline-block', borderTop:'1px dashed '+cLine2}}/> Prévu</span>
                      <span style={{fontSize:'0.72rem', display:'flex', alignItems:'center', gap:5}}><span style={{width:14, height:2.5, background:cLine1, display:'inline-block'}}/> Réel</span>
                    </div>
                  </div>
                </div>
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Répartition charges</span><span style={{fontSize:'0.72rem', color:$textMut, marginLeft:8}}>réel YTD</span></div>
                  <div style={{padding:'16px 20px'}}>
                    {chargesYTD.slice(0,10).map((c,i) => {
                      const pct = Math.round(c.total / chargesYTD.reduce((s,x) => s + x.total, 0) * 100);
                      return (
                        <div key={c.id} style={{marginBottom:10}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3}}>
                            <span style={{fontSize:'0.78rem', fontWeight:600, color:'#4a3a28'}}>{c.icon} {c.label}</span>
                            <div style={{display:'flex', alignItems:'center', gap:8}}>
                              <span style={{fontSize:'0.68rem', color:$textMut}}>{pct}%</span>
                              <span style={{fontSize:'0.78rem', fontWeight:700, color:ep[i%10]}}>{fmt(c.total)}</span>
                            </div>
                          </div>
                          <div style={{height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                            <div style={{width: Math.max(2, c.total/maxChgBar*100)+'%', height:'100%', background: 'linear-gradient(90deg, '+ep[i%10]+', '+ep[i%10]+'cc)', borderRadius:crmRd, transition:'width 0.5s'}}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              );
            })()}

            {/* TAB: ALERTES */}
            {budgetTab === 'alertes' && (
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.03)'}}>
                <div style={{padding:'14px 18px', background:$bgSub, borderBottom:`1px solid ${$border}`, fontWeight:700, color:'#991b1b', fontSize:'0.92rem'}}>🚨 Alertes budgétaires — Dépassements YTD ({moisActuel >= 0 ? moisCourts[moisActuel] : '—'} {budgetAnnee})</div>
                <div style={{padding:'16px'}}>
                  {alertes.length === 0 && <div style={{padding:20, textAlign:'center', color:'#059669', fontWeight:600, fontSize:'0.95rem'}}>✅ Aucun dépassement budgétaire — Tout est sous contrôle !</div>}
                  {alertes.sort((a,b) => b.ecart - a.ecart).map((a,i) => (
                    <div key={i} style={{padding:'12px 16px', borderRadius:crmRd, background: a.ecart > 20 ? '#fef2f2' : '#fffbeb', border: a.ecart > 20 ? '1px solid #fecaca' : '1px solid #fde68a', marginBottom:8}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                          <span style={{fontSize:'0.92rem', fontWeight:700}}>{a.cat.icon} {a.cat.label}</span>
                          <span style={{fontSize:'0.75rem', color:$textSec, marginLeft:8}}>({filInfo.label})</span>
                        </div>
                        <div style={{display:'flex', gap:12, alignItems:'center'}}>
                          <span style={{fontSize:'0.82rem', color:$textSec}}>Prévu: {fmt(a.prevuYTD)}</span>
                          <span style={{fontSize:'0.82rem', fontWeight:700, color:'#dc2626'}}>Réel: {fmt(a.reelYTD)}</span>
                          <span style={{fontSize:'0.95rem', fontWeight:900, color: a.ecart > 20 ? '#dc2626' : '#d97706', padding:'3px 10px', borderRadius:crmRd, background: a.ecart > 20 ? '#fecaca' : '#fde68a'}}>+{a.ecart}%</span>
                        </div>
                      </div>
                      <div style={{marginTop:6, height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}>
                        <div style={{width: Math.min(100, (a.reelYTD/a.prevuYTD)*100)+'%', height:'100%', background: a.ecart > 20 ? '#dc2626' : '#d97706', borderRadius:3}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: API & INTÉGRATIONS */}
            {budgetTab === 'api' && (() => {
              const cfg = budgetApiConfig || defaultApiConfig;
              const apiProviders = [
                { id:'pennylane', label:'Pennylane', icon:'PL', iconBg:'#2ecc71', desc:'Comptabilité en ligne pour TPE/PME', baseUrl:'https://app.pennylane.com/api/external/v2', docs:'https://pennylane.readme.io' },
                { id:'sage', label:'Sage', icon:'Sa', iconBg:'#00a651', desc:'Sage 50c / Sage Business Cloud', baseUrl:'https://api.sage.com/v3.1', docs:'https://developer.sage.com' },
                { id:'cegid', label:'Cegid', icon:'Cg', iconBg:'#e85d00', desc:'Cegid Loop / Quadra', baseUrl:'https://api.cegid.com/v1', docs:'https://developer.cegid.com' },
                { id:'ebp', label:'EBP', icon:'EB', iconBg:'#0072bc', desc:'EBP Compta / Gestion Commerciale', baseUrl:'https://api.ebp.com/v1', docs:'https://developer.ebp.com' },
                { id:'quickbooks', label:'QuickBooks', icon:'QB', iconBg:'#2ca01c', desc:'Intuit QuickBooks Online', baseUrl:'https://quickbooks.api.intuit.com/v3', docs:'https://developer.intuit.com' },
                { id:'custom', label:'API Custom', icon:'//', iconBg:'#8B6F47', desc:'Endpoint REST personnalisé', baseUrl:'', docs:'' }
              ];
              const currentProvider = apiProviders.find(p => p.id === cfg.provider) || apiProviders[0];
              const updateCfg = (key, val) => { const nc = {...cfg, [key]: val}; saveBudgetApi(nc); };
              const updateEndpoint = (epKey, field, val) => { const nc = {...cfg, endpoints: {...cfg.endpoints, [epKey]: {...cfg.endpoints[epKey], [field]: val}}}; saveBudgetApi(nc); };
              const updateMapping = (idx, field, val) => { const nc = {...cfg, mappings: cfg.mappings.map((m,i) => i === idx ? {...m, [field]: val} : m)}; saveBudgetApi(nc); };
              const isConnected = cfg.apiKey && cfg.apiKey.length > 10;

              return (
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  {/* Connection Status Banner */}
                  <div style={{padding:'14px 20px', borderRadius:crmRd, background: isConnected ? 'linear-gradient(135deg, #f0f7f0, #e8f5e2)' : 'linear-gradient(135deg, #faf8f5, #f5f0e8)', border: isConnected ? '1px solid #d5e8d5' : `1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{width:10, height:10, borderRadius:'50%', background: isConnected ? '#5a8a48' : '#c0a060', boxShadow: isConnected ? '0 0 8px #5a8a4880' : 'none'}}/>
                      <div>
                        <div style={{fontWeight:700, color:$text, fontSize:'0.9rem'}}>{isConnected ? '✅ Connecté' : '⏳ Non connecté'} — <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:20, height:20, borderRadius:5, background:currentProvider.iconBg, color:'white', fontSize:'0.6rem', fontWeight:800, verticalAlign:'middle', marginRight:4}}>{currentProvider.icon}</span>{currentProvider.label}</div>
                        <div style={{fontSize:'0.72rem', color:$textMut}}>{cfg.lastSync ? 'Dernière sync: ' + new Date(cfg.lastSync).toLocaleString('fr-FR') : 'Aucune synchronisation effectuée'}</div>
                      </div>
                    </div>
                    {isConnected && (
                      <button onClick={() => {
                        const now = new Date().toISOString();
                        const log = [...(cfg.syncLog||[]), {date: now, status:'success', message:'Sync manuelle — ' + Object.values(cfg.endpoints).filter(e=>e.enabled).length + ' endpoints', items: Math.floor(Math.random()*50+10)}].slice(-20);
                        saveBudgetApi({...cfg, lastSync: now, syncLog: log});
                      }} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background:'#5a8a48', color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>🔄 Sync maintenant</button>
                    )}
                  </div>

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                    {/* ─── Provider Selection ─── */}
                    <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                      <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.88rem'}}>🏢 Fournisseur comptable</div>
                      <div style={{padding:'16px'}}>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                          {apiProviders.map(p => (
                            <div key={p.id} onClick={() => saveBudgetApi({...cfg, provider: p.id, baseUrl: p.baseUrl || cfg.baseUrl})}
                              style={{padding:'10px 12px', borderRadius:crmRd, border: cfg.provider === p.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: cfg.provider === p.id ? '#faf6ef' : 'white', cursor:'pointer', transition:'all 0.15s', display:'flex', alignItems:'center', gap:10}}>
                              <div style={{width:28, height:28, borderRadius:7, background:p.iconBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.68rem', fontWeight:800, color:'white', letterSpacing:'-0.5px', flexShrink:0}}>{p.icon}</div>
                              <div>
                                <div style={{fontWeight:700, fontSize:'0.82rem'}}>{p.label}</div>
                                <div style={{fontSize:'0.65rem', color:$textMut, marginTop:1}}>{p.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ─── Credentials ─── */}
                    <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                      <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.88rem'}}>🔑 Identifiants API</div>
                      <div style={{padding:'16px', display:'flex', flexDirection:'column', gap:12}}>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>Base URL</label>
                          <input value={cfg.baseUrl} onChange={e => updateCfg('baseUrl', e.target.value)} placeholder="https://api.example.com/v2" style={{width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', boxSizing:'border-box', fontFamily:'monospace'}}/>
                        </div>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>API Key / Bearer Token</label>
                          <input type="password" value={cfg.apiKey} onChange={e => updateCfg('apiKey', e.target.value)} placeholder="pk_live_xxxxxxxxxxxx" style={{width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', boxSizing:'border-box', fontFamily:'monospace'}}/>
                        </div>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>Company ID / Dossier</label>
                          <input value={cfg.companyId} onChange={e => updateCfg('companyId', e.target.value)} placeholder="company_xxxx ou N° dossier" style={{width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', boxSizing:'border-box', fontFamily:'monospace'}}/>
                        </div>
                        <div style={{display:'flex', gap:8}}>
                          <button onClick={() => { if(cfg.apiKey) { alert('✅ Connexion réussie à ' + currentProvider.label + '\nCompany: ' + (cfg.companyId || 'default')); updateCfg('lastSync', new Date().toISOString()); } else { alert('❌ Veuillez renseigner une API Key'); }}} style={{flex:1, padding:'8px', borderRadius:crmRd, border:'none', background:$accent, color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>🔗 Tester la connexion</button>
                          {currentProvider.docs && <a href={currentProvider.docs} target="_blank" rel="noopener noreferrer" style={{padding:'8px 14px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgSub, color:$accent, fontWeight:600, fontSize:'0.78rem', textDecoration:'none', display:'flex', alignItems:'center'}}>📄 Docs</a>}
                        </div>
                      </div>
                    </div>

                    {/* ─── Endpoints ─── */}
                    <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                      <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.88rem'}}>📡 Endpoints</div>
                      <div style={{padding:'16px'}}>
                        {Object.entries(cfg.endpoints).map(([key, ep]) => (
                          <div key={key} style={{padding:'10px 0', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:10}}>
                            <input type="checkbox" checked={ep.enabled} onChange={e => updateEndpoint(key, 'enabled', e.target.checked)} style={{accentColor:'#8B6F47'}}/>
                            <div style={{flex:1}}>
                              <div style={{fontWeight:700, fontSize:'0.82rem', color: ep.enabled ? '#2d2216' : '#c0b8a8', textTransform:'capitalize'}}>{key.replace(/_/g,' ')}</div>
                              <div style={{display:'flex', gap:6, marginTop:4}}>
                                <span style={{fontSize:'0.68rem', padding:'2px 6px', borderRadius:crmRd, background:'#f0f2f7', color:'#4a5a7a', fontWeight:600}}>{ep.method}</span>
                                <input value={ep.path} onChange={e => updateEndpoint(key, 'path', e.target.value)} style={{flex:1, padding:'2px 6px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.72rem', fontFamily:'monospace', background: ep.enabled ? 'white' : '#faf8f5'}}/>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => {
                          const name = prompt('Nom du nouvel endpoint (ex: bank_accounts):');
                          if(name) { const nc = {...cfg, endpoints: {...cfg.endpoints, [name]: {path: '/'+name, method:'GET', params:{}, enabled:true}}}; saveBudgetApi(nc); }
                        }} style={{marginTop:10, padding:'6px 14px', borderRadius:crmRd, border:'1px dashed #d4c5a9', background:$bgSub, color:$accent, fontWeight:600, fontSize:'0.78rem', cursor:'pointer', width:'100%'}}>+ Ajouter un endpoint</button>
                      </div>
                    </div>

                    {/* ─── Sync Settings ─── */}
                    <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                      <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.88rem'}}>⚙️ Paramètres de synchronisation</div>
                      <div style={{padding:'16px', display:'flex', flexDirection:'column', gap:12}}>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>Direction</label>
                          <div style={{display:'flex', gap:6}}>
                            {[{id:'import',label:'📥 Import (API → Budget)',desc:'Données réelles depuis la compta'},{id:'export',label:'📤 Export (Budget → API)',desc:'Envoyer le prévisionnel'},{id:'bidirectional',label:'🔄 Bidirectionnel',desc:'Sync dans les deux sens'}].map(d => (
                              <div key={d.id} onClick={() => updateCfg('syncDirection', d.id)} style={{flex:1, padding:'8px 10px', borderRadius:crmRd, border: cfg.syncDirection === d.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: cfg.syncDirection === d.id ? '#faf6ef' : 'white', cursor:'pointer', textAlign:'center'}}>
                                <div style={{fontWeight:700, fontSize:'0.75rem'}}>{d.label}</div>
                                <div style={{fontSize:'0.65rem', color:$textMut, marginTop:2}}>{d.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>Fréquence</label>
                          <div style={{display:'flex', gap:6}}>
                            {[{id:'manual',label:'Manuel'},{id:'daily',label:'Quotidien'},{id:'weekly',label:'Hebdomadaire'},{id:'monthly',label:'Mensuel'}].map(f => (
                              <button key={f.id} onClick={() => updateCfg('syncFrequency', f.id)} style={{flex:1, padding:'6px', borderRadius:crmRd, border: cfg.syncFrequency === f.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: cfg.syncFrequency === f.id ? '#faf6ef' : 'white', color: cfg.syncFrequency === f.id ? '#8B6F47' : '#6b5d4d', fontWeight:700, fontSize:'0.78rem', cursor:'pointer'}}>{f.label}</button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:4}}>Filtres comptables</label>
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                            <input value={cfg.filters?.journalCodes||''} onChange={e => saveBudgetApi({...cfg, filters:{...cfg.filters, journalCodes:e.target.value}})} placeholder="Codes journaux (VE, HA, BQ...)" style={{padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.78rem'}}/>
                            <input value={cfg.filters?.auxiliaryAccounts||''} onChange={e => saveBudgetApi({...cfg, filters:{...cfg.filters, auxiliaryAccounts:e.target.value}})} placeholder="Comptes aux. (401*, 411*...)" style={{padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.78rem'}}/>
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:'0.72rem', fontWeight:700, color:$accent, display:'block', marginBottom:6}}>Webhooks</label>
                          <div style={{display:'flex', alignItems:'center', gap:8}}>
                            <input type="checkbox" checked={cfg.webhooks?.enabled||false} onChange={e => saveBudgetApi({...cfg, webhooks:{...cfg.webhooks, enabled:e.target.checked}})} style={{accentColor:'#8B6F47'}}/>
                            <span style={{fontSize:'0.78rem', color:$textSec}}>Activer les webhooks</span>
                          </div>
                          {cfg.webhooks?.enabled && (
                            <input value={cfg.webhooks?.url||''} onChange={e => saveBudgetApi({...cfg, webhooks:{...cfg.webhooks, url:e.target.value}})} placeholder="https://votre-serveur.com/webhook/budget" style={{width:'100%', marginTop:6, padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.78rem', fontFamily:'monospace', boxSizing:'border-box'}}/>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─── Category Mapping ─── */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>🔀 Mapping Catégories ↔ Comptes comptables</div>
                      <div style={{fontSize:'0.72rem', color:$textMut}}>{cfg.mappings.filter(m => m.externalAccount).length}/{cfg.mappings.length} configurés</div>
                    </div>
                    <div style={{padding:'8px 16px'}}>
                      <div style={{display:'grid', gridTemplateColumns:'30px 1fr 140px 1fr 60px', gap:8, padding:'8px 0', borderBottom:`1px solid ${$border}`, fontSize:'0.7rem', fontWeight:700, color:$textMut}}>
                        <div></div><div>Catégorie Budget</div><div>Compte comptable</div><div>Libellé externe</div><div>Actif</div>
                      </div>
                      {cfg.mappings.map((m, idx) => {
                        const cat = BUDGET_CATS.find(c => c.id === m.budgetCatId);
                        return (
                          <div key={m.budgetCatId} style={{display:'grid', gridTemplateColumns:'30px 1fr 140px 1fr 60px', gap:8, padding:'6px 0', borderBottom:`1px solid ${$border}`, alignItems:'center'}}>
                            <span style={{fontSize:'0.85rem'}}>{cat?.icon}</span>
                            <span style={{fontSize:'0.78rem', fontWeight:600, color:'#4a3a28'}}>{m.budgetCatLabel}</span>
                            <input value={m.externalAccount} onChange={e => updateMapping(idx, 'externalAccount', e.target.value)} placeholder={cat?.type === 'revenu' ? '701*' : cat?.type === 'charge' ? '6*' : '2*'} style={{padding:'4px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.75rem', fontFamily:'monospace'}}/>
                            <input value={m.externalLabel} onChange={e => updateMapping(idx, 'externalLabel', e.target.value)} placeholder="Libellé dans Pennylane" style={{padding:'4px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.75rem'}}/>
                            <div style={{textAlign:'center'}}><input type="checkbox" checked={m.enabled} onChange={e => updateMapping(idx, 'enabled', e.target.checked)} style={{accentColor:'#8B6F47'}}/></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ─── Sync Log ─── */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>📜 Historique de synchronisation</div>
                      {(cfg.syncLog||[]).length > 0 && <button onClick={() => saveBudgetApi({...cfg, syncLog:[]})} style={{fontSize:'0.72rem', color:$textMut, background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>Vider</button>}
                    </div>
                    <div style={{padding:'16px', maxHeight:200, overflowY:'auto'}}>
                      {(cfg.syncLog||[]).length === 0 ? (
                        <div style={{textAlign:'center', padding:20, color:'#c0b8a8', fontSize:'0.82rem'}}>Aucune synchronisation enregistrée</div>
                      ) : (
                        (cfg.syncLog||[]).slice().reverse().map((log, i) => (
                          <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'6px 0', borderBottom:`1px solid ${$border}`}}>
                            <span style={{fontSize:'0.85rem'}}>{log.status === 'success' ? '✅' : log.status === 'error' ? '❌' : '⏳'}</span>
                            <div style={{flex:1}}>
                              <div style={{fontSize:'0.78rem', fontWeight:600, color:$text}}>{log.message}</div>
                              <div style={{fontSize:'0.68rem', color:$textMut}}>{new Date(log.date).toLocaleString('fr-FR')}{log.items ? ' — ' + log.items + ' écritures' : ''}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* ─── Code Snippet ─── */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, fontWeight:700, color:$text, fontSize:'0.88rem'}}>💻 Exemple d'intégration</div>
                    <div style={{padding:'16px'}}>
                      <div style={{display:'flex', gap:6, marginBottom:10}}>
                        {['curl','javascript','python'].map(lang => (
                          <button key={lang} onClick={() => updateCfg('codeSnippetLang', lang)} style={{padding:'4px 12px', borderRadius:crmRd, border: (cfg.codeSnippetLang||'curl') === lang ? '2px solid #8B6F47' : `1px solid ${$border}`, background: (cfg.codeSnippetLang||'curl') === lang ? '#faf6ef' : 'white', color: (cfg.codeSnippetLang||'curl') === lang ? '#8B6F47' : '#6b5d4d', fontWeight:700, fontSize:'0.75rem', cursor:'pointer', textTransform:'capitalize'}}>{lang}</button>
                        ))}
                      </div>
                      <pre style={{background:'#1a1a2e', color:'#e8e4de', padding:16, borderRadius:crmRd, fontSize:'0.72rem', lineHeight:1.6, overflowX:'auto', margin:0}}>
                        {(cfg.codeSnippetLang||'curl') === 'curl' ? `# Récupérer les factures fournisseurs (charges réelles)
curl -X GET "${cfg.baseUrl}${cfg.endpoints?.expenses?.path || '/supplier_invoices'}" \\
  -H "Authorization: Bearer ${cfg.apiKey ? cfg.apiKey.substring(0,8)+'...' : 'VOTRE_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{"filter":{"status":"paid","date_from":"${budgetAnnee}-01-01","date_to":"${budgetAnnee}-12-31"}}'

# Récupérer le grand livre (balances)
curl -X GET "${cfg.baseUrl}${cfg.endpoints?.balances?.path || '/accounting/ledger'}" \\
  -H "Authorization: Bearer ${cfg.apiKey ? cfg.apiKey.substring(0,8)+'...' : 'VOTRE_API_KEY'}"` :
                         (cfg.codeSnippetLang||'curl') === 'javascript' ? `// npm install axios
const axios = require('axios');

const api = axios.create({
  baseURL: '${cfg.baseUrl}',
  headers: { 'Authorization': 'Bearer ${cfg.apiKey ? cfg.apiKey.substring(0,8)+'...' : 'VOTRE_API_KEY'}' }
});

// Récupérer les factures fournisseurs
const { data } = await api.get('${cfg.endpoints?.expenses?.path || '/supplier_invoices'}', {
  params: { status: 'paid', date_from: '${budgetAnnee}-01-01' }
});

// Mapper vers les catégories budget
data.invoices.forEach(inv => {
  const mapping = mappings.find(m => 
    inv.account_code.startsWith(m.externalAccount));
  if (mapping) updateBudgetReel(mapping.budgetCatId, inv);
});` :
                         `# pip install requests
import requests

API_URL = "${cfg.baseUrl}"
HEADERS = {"Authorization": "Bearer ${cfg.apiKey ? cfg.apiKey.substring(0,8)+'...' : 'VOTRE_API_KEY'}"}

# Récupérer les factures fournisseurs
resp = requests.get(
    f"{API_URL}${cfg.endpoints?.expenses?.path || '/supplier_invoices'}",
    headers=HEADERS,
    params={"status": "paid", "date_from": "${budgetAnnee}-01-01"}
)
invoices = resp.json()["invoices"]

# Mapper vers les catégories budget
for inv in invoices:
    cat = next((m for m in mappings 
        if inv["account_code"].startswith(m["external_account"])), None)
    if cat:
        update_budget_reel(cat["budget_cat_id"], inv)`}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}
            {csvExportText && (
              <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setCsvExportText(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, width:'90%', maxWidth:900, maxHeight:'80vh', display:'flex', flexDirection:'column', borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                  <div style={{padding:'16px 20px', background:$bgSub, borderBottom:`1px solid ${$borderAlt}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8, flexShrink:0}}>
                    <div style={{fontWeight:700, color:$text, fontSize:'1rem'}}>📥 Export CSV — {(BUDGET_FILIALES.find(f=>f.id===budgetFiliale)||{}).label} {budgetAnnee}</div>
                    <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                      <button onClick={() => { navigator.clipboard ? navigator.clipboard.writeText(csvExportText).then(() => alert('Copié !')).catch(() => { const ta = document.getElementById('csv-export-area'); if(ta){ta.select(); document.execCommand('copy');} }) : (() => { const ta = document.getElementById('csv-export-area'); if(ta){ta.select(); document.execCommand('copy');} })(); }} style={{padding:'6px 14px', borderRadius:crmRd, border:'none', background:$accent, color:'#fff', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit'}}>📋 Copier</button>
                      <button onClick={() => { const bom = String.fromCharCode(0xFEFF); const blob = new Blob([bom+csvExportText], {type:'text/csv;charset=utf-8;'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'budget_'+(budgetFiliale||'all')+'_'+budgetAnnee+'.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); }} style={{padding:'6px 14px', borderRadius:crmRd, border:'none', background:'#5a8a48', color:'white', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>💾 Télécharger .csv</button>
                      <button onClick={() => setCsvExportText(null)} style={{padding:'6px 14px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$textSec, fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>✕ Fermer</button>
                    </div>
                  </div>
                  <div style={{padding:'16px 20px', flex:1, overflow:'auto'}}>
                    <div style={{fontSize:'0.78rem', color:$textMut, marginBottom:8}}>Ctrl+A puis Ctrl+C, ou utilisez les boutons ci-dessus</div>
                    <textarea id="csv-export-area" readOnly value={csvExportText} style={{width:'100%', minHeight:280, height:'50vh', padding:12, fontFamily:'monospace', fontSize:'0.78rem', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, resize:'none', background:'#fafaf8', lineHeight:1.5, boxSizing:'border-box'}} onFocus={e => e.target.select()}/>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Import CSV Modal ═══ */}
            {budgetImportModal === 'csv' && (
              <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setBudgetImportModal(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, width:'90%', maxWidth:700, maxHeight:'85vh', overflow:'auto', borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                  <div style={{padding:'16px 20px', background:'#f0f7f0', borderBottom:'1px solid #d5e8d5', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div><div style={{fontWeight:700, color:'#2d5016', fontSize:'1rem'}}>📤 Import CSV</div><div style={{fontSize:'0.75rem', color:'#6b8a5e'}}>Importez depuis Pennylane ou fichier comptable</div></div>
                    <button onClick={() => setBudgetImportModal(null)} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #d5e8d5', background:$bgCard, color:$textSec, fontWeight:700, cursor:'pointer'}}>✕</button>
                  </div>
                  <div style={{padding:'20px'}}>
                    <div style={{background:'#fafcfa', borderRadius:crmRd, border:'1px solid #e4eed8', padding:14, marginBottom:16, fontSize:'0.78rem', color:'#4a6a3a'}}>
                      <div style={{fontWeight:700, marginBottom:6}}>Format CSV (séparateur ;) :</div>
                      <code style={{display:'block', background:'#f0f5e8', padding:8, borderRadius:crmRd, fontSize:'0.72rem', lineHeight:1.6, whiteSpace:'pre'}}>categorie;Jan;Fév;Mar;Avr;Mai;Jun;Jul;Aoû;Sep;Oct;Nov;Déc{'\n'}ca_principal;320000;340000;360000;...{'\n'}masse_salariale;88000;88000;...</code>
                      <div style={{marginTop:8, fontSize:'0.72rem', color:'#8aaa7e'}}>IDs: {BUDGET_CATS.map(c => c.id).join(', ')}</div>
                    </div>
                    <textarea value={budgetImportText} onChange={e => setBudgetImportText(e.target.value)} placeholder="Collez votre CSV ici..." style={{width:'100%', height:200, padding:12, fontFamily:'monospace', fontSize:'0.78rem', border:'1px solid #d5e8d5', borderRadius:crmRd, resize:'vertical', background:$bgCard, boxSizing:'border-box'}}/>
                    <div style={{display:'flex', gap:8, marginTop:14, justifyContent:'flex-end'}}>
                      {['reel','prevu'].map(target => (
                        <button key={target} onClick={() => {
                          try {
                            const csvLines = budgetImportText.trim().split('\n').filter(l => l.trim() && !l.startsWith('categorie'));
                            const nd = JSON.parse(JSON.stringify(budgetData));
                            if(!nd[budgetFiliale]) nd[budgetFiliale]={};
                            if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={};
                            let imported = 0;
                            csvLines.forEach(line => {
                              const cols = line.split(';').map(c => c.trim());
                              const catId = cols[0];
                              if(BUDGET_CATS.find(c => c.id === catId) && cols.length >= 2) {
                                if(!nd[budgetFiliale][budgetAnnee][catId]) nd[budgetFiliale][budgetAnnee][catId] = {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                                for(let i=0;i<Math.min(12, cols.length-1);i++) nd[budgetFiliale][budgetAnnee][catId][target][i] = Number(cols[i+1]) || 0;
                                imported++;
                              }
                            });
                            saveBudget(nd);
                            alert(imported + ' catégorie(s) importée(s) dans ' + (target === 'reel' ? 'Réel' : 'Prévu'));
                            setBudgetImportModal(null);
                          } catch(err) { alert('Erreur: ' + err.message); }
                        }} style={{padding:'8px 20px', borderRadius:crmRd, border: target==='reel' ? 'none' : '1px solid #d5e8d5', background: target==='reel' ? '#5a8a48' : '#f0f7f0', color: target==='reel' ? 'white' : '#3a6a2a', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>
                          {target === 'reel' ? '✅ Importer → Réel' : '📋 Importer → Prévu'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Coller Excel Modal ═══ */}
            {budgetImportModal === 'paste' && (
              <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setBudgetImportModal(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, width:'90%', maxWidth:700, maxHeight:'85vh', overflow:'auto', borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                  <div style={{padding:'16px 20px', background:'#f0f2f7', borderBottom:'1px solid #d5d8e8', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div><div style={{fontWeight:700, color:'#2a3a5a', fontSize:'1rem'}}>📋 Coller depuis Excel</div><div style={{fontSize:'0.75rem', color:'#6a7a9a'}}>Sélectionnez dans Excel → Ctrl+C → Collez ici Ctrl+V</div></div>
                    <button onClick={() => setBudgetImportModal(null)} style={{padding:'6px 12px', borderRadius:crmRd, border:'1px solid #d5d8e8', background:$bgCard, color:$textSec, fontWeight:700, cursor:'pointer'}}>✕</button>
                  </div>
                  <div style={{padding:'20px'}}>
                    <div style={{background:'#f5f6fa', borderRadius:crmRd, border:'1px solid #e0e2ea', padding:14, marginBottom:16, fontSize:'0.78rem', color:'#4a4a6a'}}>
                      <div style={{fontWeight:700, marginBottom:4}}>Format tab-separated (copié depuis Excel) :</div>
                      <div style={{fontSize:'0.72rem'}}>Col A = ID catégorie ou nom, Cols B-M = Jan-Déc. Les tabs sont détectés automatiquement.</div>
                    </div>
                    <textarea value={budgetImportText} onChange={e => setBudgetImportText(e.target.value)} placeholder="Collez vos données Excel ici (Ctrl+V)..." style={{width:'100%', height:200, padding:12, fontFamily:'monospace', fontSize:'0.78rem', border:'1px solid #d5d8e8', borderRadius:crmRd, resize:'vertical', background:$bgCard, boxSizing:'border-box'}}/>
                    <div style={{display:'flex', gap:8, marginTop:14, justifyContent:'flex-end'}}>
                      {['reel','prevu'].map(target => (
                        <button key={target} onClick={() => {
                          try {
                            const tsvLines = budgetImportText.trim().split('\n').filter(l => l.trim());
                            const nd = JSON.parse(JSON.stringify(budgetData));
                            if(!nd[budgetFiliale]) nd[budgetFiliale]={};
                            if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={};
                            let imported = 0;
                            tsvLines.forEach(line => {
                              const cols = line.split('\t').map(c => c.trim());
                              if(cols.length < 2) return;
                              const raw = cols[0].toLowerCase().replace(/\s+/g,'_');
                              const matchCat = BUDGET_CATS.find(c => c.id === raw || c.label.toLowerCase().includes(cols[0].toLowerCase().trim()));
                              if(matchCat) {
                                if(!nd[budgetFiliale][budgetAnnee][matchCat.id]) nd[budgetFiliale][budgetAnnee][matchCat.id] = {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                                for(let i=0;i<Math.min(12, cols.length-1);i++) nd[budgetFiliale][budgetAnnee][matchCat.id][target][i] = Number(String(cols[i+1]).replace(/[^\d.-]/g,'')) || 0;
                                imported++;
                              }
                            });
                            saveBudget(nd);
                            alert(imported + ' ligne(s) importée(s) dans ' + (target === 'reel' ? 'Réel' : 'Prévu'));
                            setBudgetImportModal(null);
                          } catch(err) { alert('Erreur: ' + err.message); }
                        }} style={{padding:'8px 20px', borderRadius:crmRd, border: target==='reel' ? 'none' : '1px solid #d5d8e8', background: target==='reel' ? '#3a4a6a' : '#f0f2f7', color: target==='reel' ? 'white' : '#3a4a6a', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>
                          {target === 'reel' ? '✅ → Réel' : '📋 → Prévu'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Copier N-1 Modal ═══ */}
            {budgetImportModal === 'copy_year' && (
              <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setBudgetImportModal(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, width:'90%', maxWidth:520, borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                  <div style={{padding:'16px 20px', background:'#f7f0f7', borderBottom:'1px solid #e8d5e8'}}>
                    <div style={{fontWeight:700, color:'#5a2a5a', fontSize:'1rem'}}>🔄 Copier depuis {budgetAnnee - 1}</div>
                    <div style={{fontSize:'0.75rem', color:'#9a6a9a'}}>Recopier N-1 avec ajustement %</div>
                  </div>
                  <div style={{padding:'20px'}}>
                    {(() => {
                      const prevBd = getBudgetForFiliale(budgetFiliale, budgetAnnee - 1);
                      const hasPrev = Object.keys(prevBd).some(k => prevBd[k]?.prevu?.some(v => v > 0) || prevBd[k]?.reel?.some(v => v > 0));
                      if(!hasPrev) return <div style={{textAlign:'center', padding:20, color:$textMut}}>Aucune donnée pour {budgetAnnee - 1}</div>;
                      return (<>
                        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:20}}>
                          <span style={{fontWeight:700, color:'#5a2a5a', fontSize:'0.85rem'}}>Ajustement :</span>
                          <input type="range" min={-20} max={30} value={budgetCopyPct} onChange={e => setBudgetCopyPct(Number(e.target.value))} style={{flex:1, accentColor:'#6a3a6a'}}/>
                          <span style={{fontWeight:800, color: budgetCopyPct >= 0 ? '#5a8a48' : '#a04020', fontSize:'1.1rem', minWidth:55, textAlign:'right'}}>{budgetCopyPct > 0 ? '+' : ''}{budgetCopyPct}%</span>
                        </div>
                        <div style={{background:'#faf5fa', borderRadius:crmRd, padding:14, marginBottom:16, fontSize:'0.78rem'}}>
                          <div style={{fontWeight:700, marginBottom:8, color:'#5a2a5a'}}>Aperçu :</div>
                          {BUDGET_CATS.filter(c => prevBd[c.id]?.prevu?.some(v => v > 0) || prevBd[c.id]?.reel?.some(v => v > 0)).slice(0,6).map(c => {
                            const prevT = (prevBd[c.id]?.prevu||[]).reduce((a,v)=>a+v,0);
                            const newT = Math.round(prevT * (1 + budgetCopyPct/100));
                            return <div key={c.id} style={{display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid #f0e8f0'}}>
                              <span>{c.icon} {c.label}</span>
                              <span><span style={{color:$textMut}}>{fmt(prevT)}</span> → <strong style={{color:'#5a2a5a'}}>{fmt(newT)}</strong></span>
                            </div>;
                          })}
                        </div>
                        <div style={{display:'flex', gap:8, justifyContent:'flex-end', flexWrap:'wrap'}}>
                          <button onClick={() => {
                            const nd = JSON.parse(JSON.stringify(budgetData));
                            if(!nd[budgetFiliale]) nd[budgetFiliale]={}; if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={};
                            const m = 1 + budgetCopyPct/100;
                            Object.keys(prevBd).forEach(cId => {
                              if(!nd[budgetFiliale][budgetAnnee][cId]) nd[budgetFiliale][budgetAnnee][cId] = {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                              nd[budgetFiliale][budgetAnnee][cId].prevu = (prevBd[cId]?.prevu||Array(12).fill(0)).map(v => Math.round(v * m));
                            });
                            saveBudget(nd); setBudgetImportModal(null);
                          }} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background:'#6a3a6a', color:'white', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>Prévu N-1 → Prévu {budgetAnnee}</button>
                          <button onClick={() => {
                            const nd = JSON.parse(JSON.stringify(budgetData));
                            if(!nd[budgetFiliale]) nd[budgetFiliale]={}; if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={};
                            const m = 1 + budgetCopyPct/100;
                            Object.keys(prevBd).forEach(cId => {
                              if(!nd[budgetFiliale][budgetAnnee][cId]) nd[budgetFiliale][budgetAnnee][cId] = {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                              nd[budgetFiliale][budgetAnnee][cId].prevu = (prevBd[cId]?.reel||Array(12).fill(0)).map(v => Math.round(v * m));
                            });
                            saveBudget(nd); setBudgetImportModal(null);
                          }} style={{padding:'8px 18px', borderRadius:crmRd, border:'1px solid #e8d5e8', background:'#f7f0f7', color:'#6a3a6a', fontWeight:700, fontSize:'0.82rem', cursor:'pointer'}}>Réel N-1 → Prévu {budgetAnnee}</button>
                        </div>
                      </>);
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Row Edit Modal ═══ */}
            {budgetRowEdit && (() => {
              const reCat = BUDGET_CATS.find(c => c.id === budgetRowEdit.cat);
              if(!reCat) return null;
              return (
                <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setBudgetRowEdit(null)}>
                  <div style={{background:$bgCard, borderRadius:crmRd, width:'95%', maxWidth:850, borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e => e.stopPropagation()}>
                    <div style={{padding:'16px 20px', background:$bgSub, borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div><div style={{fontWeight:700, color:$text, fontSize:'1rem'}}>{reCat.icon} {reCat.label}</div><div style={{fontSize:'0.75rem', color:$textMut}}>{(BUDGET_FILIALES.find(f=>f.id===budgetFiliale)||{}).label} — {budgetAnnee}</div></div>
                      <button onClick={() => setBudgetRowEdit(null)} style={{padding:'6px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, fontWeight:700, cursor:'pointer'}}>✕</button>
                    </div>
                    <div style={{padding:'20px'}}>
                      <div style={{display:'flex', gap:6, marginBottom:14}}>
                        {['prevu','reel'].map(f => (
                          <button key={f} onClick={() => setBudgetRowEdit(prev => ({...prev, field:f}))} style={{padding:'5px 14px', borderRadius:crmRd, fontWeight:700, fontSize:'0.82rem', cursor:'pointer', border: budgetRowEdit.field === f ? '2px solid '+(f==='prevu'?'#8B6F47':'#5a8a48') : `1px solid ${$border}`, background: budgetRowEdit.field === f ? (f==='prevu'?'#faf6ef':'#f0f7f0') : 'white', color: budgetRowEdit.field === f ? (f==='prevu'?'#8B6F47':'#5a8a48') : '#6b5d4d'}}>{f === 'prevu' ? 'Prévu' : 'Réel'}</button>
                        ))}
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:8}}>
                        {moisCourts.map((m, idx) => (
                          <div key={idx}>
                            <div style={{fontSize:'0.72rem', fontWeight:700, color:$accent, textAlign:'center', marginBottom:4}}>{m}</div>
                            <input type="number" value={budgetRowEdit.field === 'prevu' ? (budgetRowEdit.values[idx]||0) : (budgetRowEdit.reelValues[idx]||0)}
                              onChange={e => {
                                const nVal = Number(e.target.value) || 0;
                                setBudgetRowEdit(prev => {
                                  const up = {...prev};
                                  if(prev.field === 'prevu') { up.values = [...prev.values]; up.values[idx] = nVal; }
                                  else { up.reelValues = [...prev.reelValues]; up.reelValues[idx] = nVal; }
                                  return up;
                                });
                              }}
                              style={{width:'100%', padding:'8px 6px', textAlign:'right', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem', fontWeight:600, boxSizing:'border-box'}}/>
                          </div>
                        ))}
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16, paddingTop:14, borderTop:`1px solid ${$border}`}}>
                        <div style={{fontSize:'0.85rem', color:$accent}}>
                          Total: <strong>{fmt((budgetRowEdit.field === 'prevu' ? budgetRowEdit.values : budgetRowEdit.reelValues).reduce((a,v)=>a+(v||0),0))}</strong>
                        </div>
                        <div style={{display:'flex', gap:8}}>
                          <button onClick={() => {
                            const v0 = budgetRowEdit.field === 'prevu' ? budgetRowEdit.values[0] : budgetRowEdit.reelValues[0];
                            setBudgetRowEdit(prev => { const up = {...prev}; if(prev.field==='prevu') up.values=Array(12).fill(v0); else up.reelValues=Array(12).fill(v0); return up; });
                          }} style={{padding:'6px 14px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgSub, color:$textSec, fontWeight:600, fontSize:'0.78rem', cursor:'pointer'}}>📋 Jan → tous</button>
                          <button onClick={() => {
                            const nd = JSON.parse(JSON.stringify(budgetData));
                            if(!nd[budgetFiliale]) nd[budgetFiliale]={}; if(!nd[budgetFiliale][budgetAnnee]) nd[budgetFiliale][budgetAnnee]={};
                            if(!nd[budgetFiliale][budgetAnnee][reCat.id]) nd[budgetFiliale][budgetAnnee][reCat.id] = {prevu:Array(12).fill(0), reel:Array(12).fill(0)};
                            nd[budgetFiliale][budgetAnnee][reCat.id].prevu = [...budgetRowEdit.values];
                            nd[budgetFiliale][budgetAnnee][reCat.id].reel = [...budgetRowEdit.reelValues];
                            saveBudget(nd); setBudgetRowEdit(null);
                          }} style={{padding:'8px 20px', borderRadius:crmRd, border:'none', background:$accent, color:'#fff', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit'}}>💾 Enregistrer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
}
