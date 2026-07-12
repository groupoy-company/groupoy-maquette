// === Onglet « roadmap » — extrait de App.jsx (modularisation, forme iife) ===
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TabRoadmap(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, addRoadmapItem, addRoadmapListItem, ca, crmRd, employes, filiales, filialesEnrichies, getKpiFiliale, removeRoadmapItem, removeRoadmapListItem, resetRoadmap, roadmapData, roadmapEditMode, roadmapEditTab, saveRoadmap, setRoadmapEditMode, setRoadmapEditTab, updateRoadmapField, updateRoadmapListItem } = __props;
        const filialesOp = filialesEnrichies.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom));
        const currentCA = filialesOp.reduce((s, f) => s + (getKpiFiliale(f)?.ca || 0), 0);
        const currentEBE = filialesOp.reduce((s, f) => s + (getKpiFiliale(f)?.ebe || 0), 0);
        const currentEff = filialesOp.reduce((s, f) => s + (f.employes?.length || 0), 0);
        const { jalons, projections, visionCards, objectifs, projectionsFiliale } = roadmapData;
        const cardStyle = {background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', overflow:'hidden'};
        const fmt = v => v >= 1000000 ? (v/1000000).toFixed(1)+'M€' : v >= 1000 ? Math.round(v/1000)+'K€' : v.toFixed(0)+'€';
        const inS = {width:'100%', padding:'7px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.9rem', outline:'none', background:'#fefdfb'};
        const lbS = {display:'block', fontSize:'0.75rem', fontWeight:600, color:$textMut, marginBottom:3, textTransform:'uppercase'};
        const iconOptions = ['◆','↗','🚀','🌍','👑','◎','◆','⭐','💎','🔥','🌱','⚡','🎓','🏆','✧','📍'];
        const colorOptions = ['#8B6F47','#059669','#2563eb','#7c3aed','#dc2626','#d97706','#0891b2','#6366f1','#ec4899'];

        // ══ EDIT PANEL ══
        if (roadmapEditMode) return (
          <div style={{maxWidth:1100, margin:'0 auto'}}>
            {/* Header */}
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <span style={{fontSize:'1.5rem'}}>✱</span>
                <div>
                  <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Configuration Roadmap</h1>
                  <p style={{fontSize:'0.85rem', color:$textMut, margin:0}}>Modifier les jalons, projections et objectifs stratégiques</p>
                </div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={resetRoadmap} style={{padding:'8px 14px', borderRadius:crmRd, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontWeight:600, fontSize:'0.85rem', cursor:'pointer'}} title="Réinitialiser les valeurs par défaut">↻ Réinitialiser</button>
                <button onClick={() => setRoadmapEditMode(false)} style={{padding:'8px 18px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #059669, #047857)', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer'}}>✓ Terminé</button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{display:'flex', gap:6, marginBottom:20, flexWrap:'wrap'}}>
              {[
                {id:'jalons', label:'◫ Jalons', count: jalons.length},
                {id:'projections', label:'▦ Projections', count: projections.length},
                {id:'vision', label:'🗺️ Carte Vision', count: visionCards.length},
                {id:'objectifs', label:'◎ Objectifs', count: objectifs.length},
                {id:'filiales', label:'▪ Par Filiale', count: projectionsFiliale.length}
              ].map(t => (
                <button key={t.id} onClick={() => setRoadmapEditTab(t.id)} style={{padding:'8px 14px', borderRadius:crmRd, border: roadmapEditTab === t.id ? '2px solid #8B6F47' : `1px solid ${$borderAlt}`, background: roadmapEditTab === t.id ? '#faf8f5' : 'white', color: roadmapEditTab === t.id ? '#8B6F47' : '#6b5d4d', fontWeight: roadmapEditTab === t.id ? 700 : 500, fontSize:'0.88rem', cursor:'pointer'}}>
                  {t.label} <span style={{fontSize:'0.75rem', background: roadmapEditTab === t.id ? '#8B6F47' : '#e8e4de', color: roadmapEditTab === t.id ? 'white' : '#6b5d4d', padding:'1px 6px', borderRadius:crmRd, marginLeft:4}}>{t.count}</span>
                </button>
              ))}
            </div>

            {/* ── JALONS TAB ── */}
            {roadmapEditTab === 'jalons' && (
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {jalons.map((j, i) => (
                  <div key={j.id} style={{...cardStyle, padding:16, borderLeft: `4px solid ${j.color}`}}>
                    <div style={{display:'grid', gridTemplateColumns:'80px 1fr 120px 60px 60px 60px auto', gap:10, alignItems:'center', marginBottom:10}}>
                      <div><label style={lbS}>Année</label><input type="number" style={inS} value={j.year} onChange={e => updateRoadmapField('jalons', i, 'year', Number(e.target.value))} /></div>
                      <div><label style={lbS}>Label</label><input style={inS} value={j.label} onChange={e => updateRoadmapField('jalons', i, 'label', e.target.value)} /></div>
                      <div><label style={lbS}>Couleur</label>
                        <div style={{display:'flex', gap:3, flexWrap:'wrap'}}>
                          {colorOptions.map(c => (
                            <div key={c} onClick={() => updateRoadmapField('jalons', i, 'color', c)} style={{width:16, height:16, borderRadius:crmRd, background:c, cursor:'pointer', border: j.color === c ? '2px solid #2d2216' : `1px solid ${$borderAlt}`}} />
                          ))}
                        </div>
                      </div>
                      <div><label style={lbS}>Icône</label>
                        <select style={{...inS, padding:'4px 6px'}} value={j.icon} onChange={e => updateRoadmapField('jalons', i, 'icon', e.target.value)}>
                          {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                      <div style={{textAlign:'center'}}><label style={lbS}>Fait</label><input type="checkbox" checked={!!j.done} onChange={e => { const nd = {...roadmapData}; nd.jalons = nd.jalons.map((jj,ii) => ii===i ? {...jj, done: e.target.checked, active: false} : jj); saveRoadmap(nd); }} style={{width:18, height:18, accentColor:'#059669'}} /></div>
                      <div style={{textAlign:'center'}}><label style={lbS}>Actif</label><input type="checkbox" checked={!!j.active} onChange={e => { const nd = {...roadmapData}; nd.jalons = nd.jalons.map((jj,ii) => ii===i ? {...jj, active: e.target.checked, done: false} : jj); saveRoadmap(nd); }} style={{width:18, height:18, accentColor:'#d97706'}} /></div>
                      <button onClick={() => removeRoadmapItem('jalons', i)} style={{padding:'4px 8px', borderRadius:crmRd, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontSize:'0.85rem', cursor:'pointer', alignSelf:'end'}}>🗑️</button>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:4}}>
                      <label style={lbS}>Objectifs du jalon</label>
                      {j.items.map((item, idx) => (
                        <div key={idx} style={{display:'flex', gap:6, alignItems:'center'}}>
                          <span style={{fontSize:'0.75rem', color:$textMut, width:16, textAlign:'center'}}>{idx+1}</span>
                          <input style={{...inS, flex:1}} value={item} onChange={e => updateRoadmapListItem('jalons', i, idx, e.target.value)} />
                          <button onClick={() => removeRoadmapListItem('jalons', i, idx)} style={{padding:'2px 6px', borderRadius:crmRd, border:'none', background:'#fecaca', color:'#dc2626', fontSize:'0.8rem', cursor:'pointer'}}>×</button>
                        </div>
                      ))}
                      <button onClick={() => addRoadmapListItem('jalons', i)} style={{padding:'4px 10px', borderRadius:crmRd, border:'1px dashed #e8e4de', background:'transparent', color:$textMut, fontSize:'0.8rem', cursor:'pointer', alignSelf:'flex-start'}}>+ Ajouter un objectif</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => addRoadmapItem('jalons', { year: 2033, label: 'Nouveau jalon', icon: '▪', color: '#6366f1', items: ['Objectif 1'], done: false, active: false })} style={{padding:'12px', borderRadius:crmRd, border:'2px dashed #e8e4de', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>+ Ajouter un jalon</button>
              </div>
            )}

            {/* ── PROJECTIONS TAB ── */}
            {roadmapEditTab === 'projections' && (
              <div style={cardStyle}>
                <div style={{padding:16}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.9rem'}}>
                    <thead>
                      <tr style={{background:$bgSub}}>
                        {['Année','CA (M€)','EBE (M€)','Effectifs',''].map(h => (
                          <th key={h} style={{position:'relative',padding:'10px 12px', textAlign:'left', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.8rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {projections.map((p, i) => (
                        <tr key={i}>
                          <td style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`}}><input type="number" style={{...inS, width:80}} value={p.year} onChange={e => updateRoadmapField('projections', i, 'year', Number(e.target.value))} /></td>
                          <td style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`}}><input type="number" step="0.1" style={{...inS, width:80}} value={p.ca} onChange={e => updateRoadmapField('projections', i, 'ca', Number(e.target.value))} /></td>
                          <td style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`}}><input type="number" step="0.01" style={{...inS, width:80}} value={p.ebe} onChange={e => updateRoadmapField('projections', i, 'ebe', Number(e.target.value))} /></td>
                          <td style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`}}><input type="number" style={{...inS, width:80}} value={p.eff} onChange={e => updateRoadmapField('projections', i, 'eff', Number(e.target.value))} /></td>
                          <td style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`}}><button onClick={() => removeRoadmapItem('projections', i)} style={{padding:'2px 6px', borderRadius:crmRd, border:'none', background:'#fecaca', color:'#dc2626', fontSize:'0.8rem', cursor:'pointer'}}>🗑️</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => addRoadmapItem('projections', { year: 2034, ca: 0, ebe: 0, eff: 0 })} style={{marginTop:10, padding:'8px 14px', borderRadius:crmRd, border:'2px dashed #e8e4de', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.88rem', cursor:'pointer'}}>+ Ajouter une année</button>
                </div>
              </div>
            )}

            {/* ── VISION TAB ── */}
            {roadmapEditTab === 'vision' && (
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {visionCards.map((v, i) => (
                  <div key={v.id} style={{...cardStyle, padding:16, borderLeft:`4px solid ${v.color}`}}>
                    <div style={{display:'grid', gridTemplateColumns:'100px 80px 1fr 120px auto', gap:10, alignItems:'end', marginBottom:10}}>
                      <div><label style={lbS}>Horizon</label><input style={inS} value={v.horizon} onChange={e => updateRoadmapField('visionCards', i, 'horizon', e.target.value)} placeholder="1 an" /></div>
                      <div><label style={lbS}>Année</label><input style={inS} value={v.year} onChange={e => updateRoadmapField('visionCards', i, 'year', e.target.value)} /></div>
                      <div><label style={lbS}>Objectif principal</label><input style={inS} value={v.objectif} onChange={e => updateRoadmapField('visionCards', i, 'objectif', e.target.value)} placeholder="CA 6M€" /></div>
                      <div><label style={lbS}>Couleur</label>
                        <div style={{display:'flex', gap:3, flexWrap:'wrap'}}>
                          {colorOptions.map(c => (
                            <div key={c} onClick={() => updateRoadmapField('visionCards', i, 'color', c)} style={{width:16, height:16, borderRadius:crmRd, background:c, cursor:'pointer', border: v.color === c ? '2px solid #2d2216' : `1px solid ${$borderAlt}`}} />
                          ))}
                        </div>
                      </div>
                      <button onClick={() => removeRoadmapItem('visionCards', i)} style={{padding:'4px 8px', borderRadius:crmRd, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontSize:'0.85rem', cursor:'pointer'}}>🗑️</button>
                    </div>
                    <div><label style={lbS}>Détails / Description</label><textarea style={{...inS, minHeight:60, resize:'vertical'}} value={v.details} onChange={e => updateRoadmapField('visionCards', i, 'details', e.target.value)} /></div>
                    <div style={{display:'grid', gridTemplateColumns:'60px 60px', gap:8, marginTop:8}}>
                      <div><label style={lbS}>Icône</label>
                        <select style={{...inS, padding:'4px'}} value={v.icon} onChange={e => updateRoadmapField('visionCards', i, 'icon', e.target.value)}>
                          {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addRoadmapItem('visionCards', { horizon: 'X ans', year: '20XX', icon: '▪', color: '#6366f1', objectif: '', details: '' })} style={{padding:'12px', borderRadius:crmRd, border:'2px dashed #e8e4de', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>+ Ajouter une carte vision</button>
              </div>
            )}

            {/* ── OBJECTIFS TAB ── */}
            {roadmapEditTab === 'objectifs' && (
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {objectifs.map((obj, i) => (
                  <div key={obj.id} style={{...cardStyle, padding:16, borderLeft:`4px solid ${obj.color}`}}>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 60px 120px auto', gap:10, alignItems:'end', marginBottom:10}}>
                      <div><label style={lbS}>Catégorie</label><input style={inS} value={obj.cat} onChange={e => updateRoadmapField('objectifs', i, 'cat', e.target.value)} /></div>
                      <div><label style={lbS}>Icône</label>
                        <select style={{...inS, padding:'4px'}} value={obj.icon} onChange={e => updateRoadmapField('objectifs', i, 'icon', e.target.value)}>
                          {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                      <div><label style={lbS}>Couleur</label>
                        <div style={{display:'flex', gap:3, flexWrap:'wrap'}}>
                          {colorOptions.map(c => (
                            <div key={c} onClick={() => updateRoadmapField('objectifs', i, 'color', c)} style={{width:16, height:16, borderRadius:crmRd, background:c, cursor:'pointer', border: obj.color === c ? '2px solid #2d2216' : `1px solid ${$borderAlt}`}} />
                          ))}
                        </div>
                      </div>
                      <button onClick={() => removeRoadmapItem('objectifs', i)} style={{padding:'4px 8px', borderRadius:crmRd, border:'1px solid #fecaca', background:'#fff5f5', color:'#dc2626', fontSize:'0.85rem', cursor:'pointer'}}>🗑️</button>
                    </div>
                    <label style={lbS}>Actions / Objectifs</label>
                    {obj.items.map((item, idx) => (
                      <div key={idx} style={{display:'flex', gap:6, alignItems:'center', marginBottom:4}}>
                        <span style={{fontSize:'0.75rem', color:$textMut, width:16, textAlign:'center'}}>{idx+1}</span>
                        <input style={{...inS, flex:1}} value={item} onChange={e => updateRoadmapListItem('objectifs', i, idx, e.target.value)} />
                        <button onClick={() => removeRoadmapListItem('objectifs', i, idx)} style={{padding:'2px 6px', borderRadius:crmRd, border:'none', background:'#fecaca', color:'#dc2626', fontSize:'0.8rem', cursor:'pointer'}}>×</button>
                      </div>
                    ))}
                    <button onClick={() => addRoadmapListItem('objectifs', i)} style={{padding:'4px 10px', borderRadius:crmRd, border:'1px dashed #e8e4de', background:'transparent', color:$textMut, fontSize:'0.8rem', cursor:'pointer'}}>+ Ajouter</button>
                  </div>
                ))}
                <button onClick={() => addRoadmapItem('objectifs', { cat: 'Nouvelle catégorie', icon: '▪', color: '#6366f1', items: ['Objectif 1'] })} style={{padding:'12px', borderRadius:crmRd, border:'2px dashed #e8e4de', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>+ Ajouter une catégorie</button>
              </div>
            )}

            {/* ── FILIALES TAB ── */}
            {roadmapEditTab === 'filiales' && (
              <div style={cardStyle}>
                <div style={{padding:16, overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.85rem'}}>
                    <thead>
                      <tr style={{background:$bgSub}}>
                        {['Filiale','2025','2026','2027','2028','2029','2030','2032','2035','Objectif',''].map(h => (
                          <th key={h} style={{position:'relative',padding:'8px 6px', textAlign:'left', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.75rem', whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {projectionsFiliale.map((pf, i) => (
                        <tr key={pf.id}>
                          <td style={{padding:'4px 6px', borderBottom:`1px solid ${$border}`}}><input style={{...inS, width:130, fontSize:'0.85rem'}} value={pf.nom} onChange={e => updateRoadmapField('projectionsFiliale', i, 'nom', e.target.value)} /></td>
                          {['ca25','ca26','ca27','ca28','ca29','ca30','ca32','ca35'].map(key => (
                            <td key={key} style={{padding:'4px 4px', borderBottom:`1px solid ${$border}`}}><input style={{...inS, width:62, fontSize:'0.85rem', textAlign:'center'}} value={pf[key]} onChange={e => updateRoadmapField('projectionsFiliale', i, key, e.target.value)} /></td>
                          ))}
                          <td style={{padding:'4px 6px', borderBottom:`1px solid ${$border}`}}><input style={{...inS, width:120, fontSize:'0.85rem'}} value={pf.obj} onChange={e => updateRoadmapField('projectionsFiliale', i, 'obj', e.target.value)} /></td>
                          <td style={{padding:'4px 6px', borderBottom:`1px solid ${$border}`}}><button onClick={() => removeRoadmapItem('projectionsFiliale', i)} style={{padding:'2px 6px', borderRadius:crmRd, border:'none', background:'#fecaca', color:'#dc2626', fontSize:'0.8rem', cursor:'pointer'}}>🗑️</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => addRoadmapItem('projectionsFiliale', { nom: '🆕 Nouvelle filiale', ca25: '—', ca26: '—', ca27: '—', ca28: '—', ca29: '—', ca30: '—', ca32: '—', ca35: '—', obj: '' })} style={{marginTop:10, padding:'8px 14px', borderRadius:crmRd, border:'2px dashed #e8e4de', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.88rem', cursor:'pointer'}}>+ Ajouter une filiale</button>
                </div>
              </div>
            )}

            <div style={{textAlign:'center', marginTop:20, padding:12, background:$success+'12', borderRadius:crmRd, fontSize:'0.85rem', color:'#059669'}}>
              💾 Sauvegarde automatique — toutes les modifications sont enregistrées instantanément
            </div>
          </div>
        );

        // ══ DISPLAY MODE ══
        return (
          <div style={{maxWidth:1100, margin:'0 auto'}}>
            {/* Header */}
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24}}>
              <div style={{textAlign:'center', flex:1}}>
                <div style={{fontSize:'2.5rem', marginBottom:8}}>🗺️</div>
                <h2 style={{fontSize:'1.6rem', fontWeight:800, color:$text, marginBottom:6}}>Feuille de Route Stratégique</h2>
                <p style={{fontSize:'0.9rem', color:$textMut}}>Group OY — Vision 2025 → 2035</p>
              </div>
              <button onClick={() => { setRoadmapEditMode(true); setRoadmapEditTab('jalons'); }} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, color:$accent, fontWeight:600, fontSize:'0.9rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', flexShrink:0}}>✱ Configurer</button>
            </div>

            {/* ══ CARTE VISION — 1/3/5/10 ans ══ */}
            <div style={{marginBottom:32}}>
              <h3 style={{fontSize:'1rem', fontWeight:700, color:$accent, marginBottom:16, display:'flex', alignItems:'center', gap:8}}>🗺️ Où serons-nous ?</h3>
              <div style={{display:'grid', gridTemplateColumns:`repeat(${Math.min(visionCards.length, 4)}, 1fr)`, gap:12}}>
                {visionCards.map(v => {
                  const bg = v.color + '10';
                  return (
                  <div key={v.id || v.horizon} style={{...cardStyle, borderTop:`4px solid ${v.color}`}}>
                    <div style={{padding:16}}>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                        <span style={{fontSize:'1.5rem'}}>{v.icon}</span>
                        <span style={{fontSize:'0.75rem', fontWeight:700, color: v.color, background: bg, padding:'3px 8px', borderRadius:crmRd}}>{v.horizon}</span>
                      </div>
                      <div style={{fontSize:'0.8rem', color:$textMut, marginBottom:4}}>Horizon {v.year}</div>
                      <div style={{fontSize:'1.3rem', fontWeight:800, color: v.color, marginBottom:8}}>{v.objectif}</div>
                      <p style={{fontSize:'0.85rem', color:$textSec, lineHeight:1.5}}>{v.details}</p>
                    </div>
                  </div>
                );})}
              </div>
            </div>

            {/* ══ SITUATION ACTUELLE ══ */}
            <div style={{...cardStyle, marginBottom:24, padding:20}}>
              <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:16}}>📍 Situation Actuelle — 2026</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
                {[
                  { label: 'CA Group', value: fmt(currentCA), color: '#059669', icon: '€' },
                  { label: 'EBE Group', value: fmt(currentEBE), color: currentEBE >= 0 ? '#2563eb' : '#dc2626', icon: '▦' },
                  { label: 'Collaborateurs', value: currentEff, color: '#7c3aed', icon: '◉' },
                  { label: 'Filiales actives', value: filialesOp.length, color: '#d97706', icon: '▪' }
                ].map(kpi => (
                  <div key={kpi.label} style={{textAlign:'center', padding:12, background:$bgSub, borderRadius:crmRd}}>
                    <div style={{fontSize:'1.2rem', marginBottom:4}}>{kpi.icon}</div>
                    <div style={{fontSize:'1.4rem', fontWeight:800, color: kpi.color}}>{kpi.value}</div>
                    <div style={{fontSize:'0.8rem', color:$textMut, marginTop:2}}>{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ TIMELINE 2025-2035 ══ */}
            <div style={{...cardStyle, marginBottom:24, padding:20}}>
              <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:20}}>◫ Timeline Stratégique {jalons.length > 0 ? `${jalons[0].year} → ${jalons[jalons.length-1].year}` : ''}</h3>
              <div style={{overflowX:'auto', paddingBottom:8}}>
                <div style={{display:'flex', gap:0, minWidth: jalons.length * 150, position:'relative'}}>
                  <div style={{position:'absolute', top:20, left:20, right:20, height:3, background:`linear-gradient(90deg, ${jalons.map(j => j.color).join(', ')})`, borderRadius:2}} />
                  {jalons.map((j, i) => (
                    <div key={j.id || j.year} style={{flex:1, minWidth:140, position:'relative', paddingTop:36, textAlign:'center'}}>
                      <div style={{position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width: j.active ? 20 : 14, height: j.active ? 20 : 14, borderRadius:'50%', background: j.done ? j.color : j.active ? 'white' : '#f0ebe3', border: j.active ? `3px solid ${j.color}` : j.done ? 'none' : `2px solid ${j.color}`, zIndex:2, boxShadow: j.active ? `0 0 12px ${j.color}50` : 'none'}} />
                      <div style={{background: j.active ? `${j.color}08` : 'transparent', borderRadius:crmRd, padding:'12px 8px', border: j.active ? `2px solid ${j.color}30` : '1px solid transparent'}}>
                        <div style={{fontSize:'1.2rem', marginBottom:4}}>{j.icon}</div>
                        <div style={{fontSize:'0.95rem', fontWeight:800, color: j.color}}>{j.year}</div>
                        <div style={{fontSize:'0.8rem', fontWeight:700, color:$text, marginBottom:6}}>{j.label}</div>
                        {j.items.map((item, idx) => (
                          <div key={idx} style={{fontSize:'0.7rem', color: j.done ? '#059669' : '#b0a08a', lineHeight:1.6, display:'flex', alignItems:'center', gap:4, justifyContent:'center'}}>
                            <span>{j.done ? '✓' : j.active ? '↻' : '○'}</span> {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ PROJECTIONS CA/EBE/EFFECTIFS ══ */}
            <div style={{...cardStyle, marginBottom:24, padding:20}}>
              <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:16}}>▦ Projections Financières & Effectifs</h3>
              <div style={{height:280, marginBottom:16}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projections} margin={{top:5, right:20, left:0, bottom:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                    <XAxis dataKey="year" tick={{fontSize:11, fill:'#b0a08a'}} />
                    <YAxis yAxisId="ca" tick={{fontSize:10, fill:'#b0a08a'}} tickFormatter={v => v+'M€'} />
                    <YAxis yAxisId="eff" orientation="right" tick={{fontSize:10, fill:'#b0a08a'}} />
                    <Tooltip contentStyle={{borderRadius:crmRd, border:`1px solid ${$border}`, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', padding:'10px 14px'}} />
                    <Bar yAxisId="ca" dataKey="ca" name="CA (M€)" fill="#8B6F47" radius={[4,4,0,0]} />
                    <Bar yAxisId="ca" dataKey="ebe" name="EBE (M€)" fill="#059669" radius={[4,4,0,0]} />
                    <Bar yAxisId="eff" dataKey="eff" name="Effectifs" fill="#7c3aed" radius={[4,4,0,0]} opacity={0.4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.9rem'}}>
                  <thead>
                    <tr style={{background:$bgSub}}>
                      {['Année','CA','Croissance','EBE','Marge EBE','Effectifs'].map(h => (
                        <th key={h} style={{position:'relative',padding:'10px 14px', textAlign: h==='Année' ? 'left' : 'right', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.82rem'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projections.map((p, i) => {
                      const prev = i > 0 ? projections[i-1].ca : p.ca;
                      const growth = i > 0 ? ((p.ca - prev) / prev * 100).toFixed(0) : '—';
                      const margeEBE = p.ca > 0 ? (p.ebe / p.ca * 100).toFixed(1) : '0.0';
                      const isNow = p.year === 2026;
                      return (
                        <tr key={p.year} style={{background: isNow ? '#fffbeb' : i%2===0 ? 'white' : '#fefdfb'}}>
                          <td style={{padding:'10px 14px', fontWeight: isNow ? 800 : 600, color:$text, borderBottom:`1px solid ${$border}`}}>
                            {p.year} {isNow && <span style={{fontSize:'0.65rem', fontWeight:700, background:'#d97706', color:'white', padding:'1px 6px', borderRadius:crmRd, marginLeft:4}}>ACTUEL</span>}
                          </td>
                          <td style={{padding:'10px 14px', textAlign:'right', fontWeight:700, color:$accent, borderBottom:`1px solid ${$border}`}}>{p.ca.toFixed(1)}M€</td>
                          <td style={{padding:'10px 14px', textAlign:'right', color: growth > 0 ? '#059669' : '#b0a08a', fontWeight:600, borderBottom:`1px solid ${$border}`}}>{growth === '—' ? '—' : `+${growth}%`}</td>
                          <td style={{padding:'10px 14px', textAlign:'right', fontWeight:700, color: p.ebe >= 0 ? '#059669' : '#dc2626', borderBottom:`1px solid ${$border}`}}>{p.ebe.toFixed(2)}M€</td>
                          <td style={{padding:'10px 14px', textAlign:'right', color: parseFloat(margeEBE) >= 8 ? '#059669' : '#d97706', fontWeight:600, borderBottom:`1px solid ${$border}`}}>{margeEBE}%</td>
                          <td style={{padding:'10px 14px', textAlign:'right', fontWeight:600, color:'#7c3aed', borderBottom:`1px solid ${$border}`}}>{p.eff}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ══ OBJECTIFS STRATÉGIQUES ══ */}
            <div style={{marginBottom:24}}>
              <h3 style={{fontSize:'1rem', fontWeight:700, color:$accent, marginBottom:16, display:'flex', alignItems:'center', gap:8}}>◎ Objectifs Stratégiques</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16}}>
                {objectifs.map(obj => (
                  <div key={obj.id || obj.cat} style={{...cardStyle, borderLeft:`4px solid ${obj.color}`}}>
                    <div style={{padding:16}}>
                      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
                        <span style={{fontSize:'1.2rem'}}>{obj.icon}</span>
                        <span style={{fontSize:'0.95rem', fontWeight:700, color: obj.color}}>{obj.cat}</span>
                      </div>
                      {obj.items.map((item, idx) => (
                        <div key={idx} style={{display:'flex', alignItems:'flex-start', gap:8, padding:'5px 0', borderBottom: idx < obj.items.length-1 ? `1px solid ${$border}` : 'none'}}>
                          <div style={{width:18, height:18, borderRadius:crmRd, background:`${obj.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', color: obj.color, fontWeight:700, flexShrink:0, marginTop:1}}>{idx+1}</div>
                          <span style={{fontSize:'0.88rem', color:$text, lineHeight:1.4}}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ PROJECTIONS PAR FILIALE ══ */}
            <div style={{...cardStyle, padding:20}}>
              <h3 style={{fontSize:'0.9rem', fontWeight:700, color:$accent, marginBottom:16}}>▪ Projections par Filiale</h3>
              <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.85rem'}}>
                <thead>
                  <tr style={{background:$bgSub}}>
                    {['Filiale','2025','2026','2027','2028','2029','2030','2032','2035','Objectif'].map(h => (
                      <th key={h} style={{position:'relative',padding:'10px 10px', textAlign: h==='Filiale' || h==='Objectif' ? 'left' : 'right', fontWeight:600, color:$textMut, borderBottom:`1px solid ${$border}`, fontSize:'0.78rem', whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projectionsFiliale.map((f, i) => (
                    <tr key={f.id || f.nom} style={{background: i%2===0 ? 'white' : '#fefdfb'}}>
                      <td style={{padding:'9px 10px', fontWeight:700, color:$text, borderBottom:`1px solid ${$border}`, whiteSpace:'nowrap'}}>{f.nom}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', color:$textMut, borderBottom:`1px solid ${$border}`}}>{f.ca25}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', fontWeight:600, color:$accent, borderBottom:`1px solid ${$border}`}}>{f.ca26}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', color:$text, borderBottom:`1px solid ${$border}`}}>{f.ca27}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', color:$text, borderBottom:`1px solid ${$border}`}}>{f.ca28}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', color:$text, borderBottom:`1px solid ${$border}`}}>{f.ca29}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', fontWeight:600, color:$text, borderBottom:`1px solid ${$border}`}}>{f.ca30}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', fontWeight:600, color:'#7c3aed', borderBottom:`1px solid ${$border}`}}>{f.ca32}</td>
                      <td style={{padding:'9px 10px', textAlign:'right', fontWeight:700, color:'#059669', borderBottom:`1px solid ${$border}`}}>{f.ca35}</td>
                      <td style={{padding:'9px 10px', fontSize:'0.78rem', color:$textMut, fontStyle:'italic', borderBottom:`1px solid ${$border}`}}>{f.obj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        );
}
