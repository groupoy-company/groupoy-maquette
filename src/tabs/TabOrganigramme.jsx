// === Onglet « organigramme » — extrait de App.jsx (modularisation, forme iife) ===
import { CRM_FIL_ICONS, CRM_FIL_NAMES } from '../data/theme.js';
import React, {  } from 'react';
import { Legend, Line } from 'recharts';

export default function TabOrganigramme(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, ajouterEmploye, ca, collaborateurs, crmRd, employes, filiales, filialesDynamiques, handleMouseDown, modalAjoutOuvert, niveau, nouvelEmploye, orgArbreDrag, orgArbrePos, orgArbreRef, orgSocieteDrag, orgSocietePan, orgSocietePanning, orgSocietePos, orgSocieteRef, orgSocieteZoom, orgView, setModalAjoutOuvert, setNouvelEmploye, setOrgArbreDrag, setOrgArbrePos, setOrgSocieteDrag, setOrgSocietePan, setOrgSocietePanning, setOrgSocietePos, setOrgSocieteZoom, setOrgView, supprimerEmploye } = __props;
          const ORG_VIEWS = [
            { id: 'liste', label: 'Liste', icon: '📋' },
            { id: 'galaxy', label: 'Galaxy', icon: '🌌' },
            { id: 'bubble', label: 'Bubble', icon: '🫧' },
            { id: 'radial', label: 'Radial', icon: '🎯' },
            { id: 'pappers', label: 'Arbre', icon: '🌳' },
            { id: 'arbre', label: 'Pappers', icon: '📄' },
            { id: 'societe', label: 'Societe.com', icon: '🏛️' },
          ];

          const FILIALE_COLORS = { ezel: '#007ab5', roulotte: '#C49A2A', echafaudage: '#6C3483', etancheite: '#0e6655', yilmaz: '#2d2d2d', groupoy: '#8B6F47' };
          const NIVEAU_ORDER = ['XXXL','XXL','XL','L','M','S','XS','XXS'];
          const NIVEAU_BEE = { XXXL:'Roi/Reine de la Ruche', XXL:'Maître-Apiculteur', XL:'Régisseur de Ruche', L:'Gardien de Ruche', M:'Maître-Bâtisseur', S:'Bâtisseur', XS:'Collecteur', XXS:'Butineur' };
          const NIVEAU_COLORS = { XXXL:'#F8DC00', XXL:'#f59e0b', XL:'#f97316', L:'#22c55e', M:'#3b82f6', S:'#8b5cf6', XS:'#6b7280', XXS:'#9ca3af' };

          const filialeOf = (emp) => {
            if (emp.groupe === '0') return 'groupoy';
            if (emp.groupe === '2') return 'yilmaz';
            if (emp.filialeId === 3 || emp.filiale === '1') return 'ezel';
            if (emp.filialeId === 2 || emp.filiale === '2') return 'echafaudage';
            if (emp.filialeId === 4 || emp.filiale === '3') return 'roulotte';
            return 'yilmaz';
          };

          return (
            <>
              {/* Header */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
                <div>
                  <h2 style={{margin:0, fontSize:'1.25rem', fontWeight:700, color:'#7F6C41', display:'flex', alignItems:'center', gap:8}}>🐝 Organigramme — L'Architecture de la Ruche</h2>
                  <div style={{fontSize:'0.75rem', color:$textMut, marginTop:2}}>{employes.length} collaborateurs · {Object.keys(FILIALE_COLORS).length} entités</div>
                </div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <button onClick={() => setModalAjoutOuvert(true)} style={{background:$success, color:'#fff', padding:'7px 16px', borderRadius:crmRd, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6, fontSize:'0.82rem'}}>➕ Ajouter à l'Essaim</button>
                </div>
              </div>

              {/* View tabs */}
              <div style={{display:'flex', gap:2, background:$bgSub, borderRadius:crmRd, padding:3, border:`1px solid ${$border}`, marginBottom:20, width:'fit-content'}}>
                {ORG_VIEWS.map(v => (
                  <button key={v.id} onClick={() => setOrgView(v.id)} style={{padding:'6px 14px', borderRadius:Math.max(crmRd-2,0), border:'none', background:orgView===v.id?$accent:'transparent', color:orgView===v.id?'#fff':$textMut, fontWeight:orgView===v.id?600:400, fontSize:'0.8rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s', display:'flex', alignItems:'center', gap:5}}>
                    <span>{v.icon}</span><span>{v.label}</span>
                  </button>
                ))}
              </div>

              {/* Modal Ajout */}
              {modalAjoutOuvert && (
                <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}} onClick={() => setModalAjoutOuvert(false)}>
                  <div style={{background:$bgCard, borderRadius:crmRd, padding:24, maxWidth:672, width:'100%', margin:'0 16px', maxHeight:'90vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}><h3 style={{fontSize:'1.3rem', fontWeight:700, color:'#7F6C41'}}>➕ Ajouter à l'Essaim</h3><button onClick={() => setModalAjoutOuvert(false)} style={{color:$textMut, cursor:'pointer', fontSize:'1.5rem', background:'none', border:'none'}}>✕</button></div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                      <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Nom *</label><input type="text" value={nouvelEmploye.nom} onChange={e => setNouvelEmploye({...nouvelEmploye, nom: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}} placeholder="YILMAZ" /></div>
                      <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Prénom *</label><input type="text" value={nouvelEmploye.prenom} onChange={e => setNouvelEmploye({...nouvelEmploye, prenom: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}} placeholder="Özdoğan" /></div>
                      <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Groupe *</label><select value={nouvelEmploye.groupe} onChange={e => setNouvelEmploye({...nouvelEmploye, groupe: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}}><option value="0">Groupe 0 - Direction</option><option value="1">Groupe 1 - Opérationnel</option><option value="2">Groupe 2 - Support</option></select></div>
                      {nouvelEmploye.groupe === '1' && (<div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Filiale *</label><select value={nouvelEmploye.filiale} onChange={e => setNouvelEmploye({...nouvelEmploye, filiale: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}}><option value="1">Ezel Bâtiment</option><option value="2">L'Échafaudage</option><option value="3">La Roulotte</option></select></div>)}
                      <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Niveau *</label><select value={nouvelEmploye.niveau} onChange={e => setNouvelEmploye({...nouvelEmploye, niveau: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}}>{NIVEAU_ORDER.map(n => <option key={n} value={n}>{n} — {NIVEAU_BEE[n]}</option>)}</select></div>
                      <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Poste externe</label><input type="text" value={nouvelEmploye.posteExterne} onChange={e => setNouvelEmploye({...nouvelEmploye, posteExterne: e.target.value})} style={{width:'100%', border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:'8px 14px', outline:'none', fontSize:'0.98rem', background:$bgSub, color:$text}} placeholder="Chef de Chantier" /></div>
                    </div>
                    <div style={{display:'flex', gap:12, marginTop:24}}>
                      <button onClick={ajouterEmploye} disabled={!nouvelEmploye.nom||!nouvelEmploye.prenom} style={{flex:1, background:$success, color:'#fff', padding:'12px 24px', borderRadius:crmRd, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'inherit'}}>✅ Ajouter à l'Essaim</button>
                      <button onClick={() => setModalAjoutOuvert(false)} style={{padding:'12px 24px', border:`2px solid ${$border}`, borderRadius:crmRd, fontWeight:600, cursor:'pointer', fontFamily:'inherit', background:'transparent', color:$textSec}}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== VUE LISTE ===== */}
              {orgView === 'liste' && (() => {
                const byGroupe = {
                  '0': employes.filter(e => e.groupe === '0'),
                  '2': employes.filter(e => e.groupe === '2'),
                  '1': employes.filter(e => e.groupe === '1'),
                };
                const groupeConf = [
                  { id: '0', label: 'Direction (Groupe 0)', color: '#F8DC00', bg: '#F8DC0010', icon: '👑' },
                  { id: '1', label: 'Opérationnel (Groupe 1)', color: '#22c55e', bg: '#22c55e10', icon: '🐝' },
                  { id: '2', label: 'Support Yilmaz (Groupe 2)', color: '#f97316', bg: '#f9731610', icon: '🔄' },
                ];
                return (
                  <div style={{display:'flex', flexDirection:'column', gap:20}}>
                    {groupeConf.map(gc => byGroupe[gc.id].length > 0 && (
                      <div key={gc.id} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                        <div style={{padding:'12px 16px', background:gc.bg, borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8}}>
                          <span>{gc.icon}</span>
                          <span style={{fontWeight:700, color:gc.color, fontSize:'0.88rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>{gc.label}</span>
                          <span style={{background:gc.color+'20', color:gc.color, borderRadius:crmRd>0?99:2, padding:'1px 8px', fontSize:'0.72rem', fontWeight:700}}>{byGroupe[gc.id].length}</span>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:12, padding:16}}>
                          {byGroupe[gc.id].map(emp => {
                            const fc = FILIALE_COLORS[filialeOf(emp)] || $accent;
                            const nc = NIVEAU_COLORS[emp.niveau] || $textMut;
                            return (
                              <div key={emp.id} style={{background:$bgSub, borderRadius:Math.max(crmRd-2,0), border:`1px solid ${$border}`, padding:'12px 14px', borderLeft:`3px solid ${fc}`, position:'relative'}}>
                                <button onClick={() => supprimerEmploye(emp.id)} style={{position:'absolute', top:6, right:6, background:'transparent', border:'none', cursor:'pointer', color:$textMut, fontSize:'0.7rem', opacity:0.5}} onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='0.5'}>🗑️</button>
                                <div style={{fontWeight:700, color:$text, fontSize:'0.88rem', marginBottom:2}}>{emp.prenom} {emp.nom}</div>
                                <div style={{fontSize:'0.75rem', color:$textSec, marginBottom:6}}>{emp.posteExterne || emp.posteInterne}</div>
                                <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                                  <span style={{padding:'1px 7px', borderRadius:crmRd>0?99:2, background:nc+'20', color:nc, fontSize:'0.65rem', fontWeight:700}}>{emp.niveau} — {NIVEAU_BEE[emp.niveau]}</span>
                                  <span style={{padding:'1px 7px', borderRadius:crmRd>0?99:2, background:fc+'15', color:fc, fontSize:'0.65rem', fontWeight:600}}>{CRM_FIL_NAMES[filialeOf(emp)] || filialeOf(emp)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* ===== VUE GALAXY ===== */}
              {orgView === 'galaxy' && (() => {
                const opF = filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ SAS'].includes(f.nom));
                const getE = (fid) => employes.filter(e=>(e.statut||'actif')==='actif'&&(fid==='yilmaz'?(e.filialeId==='yilmaz'||e.filialeId===0||e.filialeId==='0'):e.filialeId===fid));
                const totalActifs = employes.filter(e=>(e.statut||'actif')==='actif').length;
                const planets = [
                  { key:'yilmaz',     label:'YILMAZ',     sub:'Support',    color:'#444444', angle:-Math.PI/2,       r:215,
                    moons: ['FIN','RH','IT','QHSE'].map(s=>({id:s, label:s, color:'#555555', count: getE('yilmaz').length > 0 ? 1 : 0 })) },
                  { key:'invest_exe', label:'INVEST EXE',  sub:'Exécution',  color:'#8b5cf6', angle:Math.PI/6,        r:230,
                    moons: opF.filter(f=>f.holding==='INVEST EXE').map(f=>({id:f.id, label:(f.nom||'').replace("L'","").replace("Ezel Bâtiment","Ezel"), color:f.couleur, count:getE(f.id).length})) },
                  { key:'invest_loc', label:'INVEST LOC',  sub:'Location',   color:'#0ea5e9', angle:Math.PI-Math.PI/6, r:230,
                    moons: opF.filter(f=>f.holding==='INVEST LOC').map(f=>({id:f.id, label:(f.nom||'').replace("L'","").replace("La ",""), color:f.couleur, count:getE(f.id).length})) },
                  { key:'sci_elia',   label:'SCI Elia',    sub:'Immobilier', color:'#d97706', angle:Math.PI*1.25,     r:205,
                    moons: [] },
                ];
                return (
                  <div style={{position:'relative', background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', height:700}}>
                    {/* Header */}
                    <div style={{padding:'12px 20px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8, position:'relative', zIndex:20, background:$bgCard}}>
                      <span style={{fontSize:'1rem'}}>🌌</span>
                      <span style={{fontWeight:700, color:$text, fontSize:'0.9rem'}}>Vue Galaxy — Système Planétaire de la Ruche</span>
                      <span style={{fontSize:'0.7rem', color:$textMut}}>Planètes = holdings · Lunes = filiales</span>
                    </div>

                    {/* Orbit déco rings */}
                    <div style={{position:'absolute', top:'52%', left:'50%', width:440, height:440, borderRadius:'50%', border:'1px dashed rgba(139,111,71,0.12)', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:1}}/>
                    <div style={{position:'absolute', top:'52%', left:'50%', width:580, height:580, borderRadius:'50%', border:'1px dashed rgba(139,111,71,0.07)', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:1}}/>

                    {/* CENTER: GROUP OY */}
                    <div style={{position:'absolute', top:'52%', left:'50%', transform:'translate(-50%,-50%)', zIndex:10}}>
                      <div style={{width:110, height:110, borderRadius:'50%', background:$accent+'10', border:`3px solid ${$accent}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:`0 0 0 12px ${$accent}06, 0 0 0 26px ${$accent}03`, transition:'all 0.25s', cursor:'default'}}
                        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.08)'; e.currentTarget.style.boxShadow=`0 0 0 16px ${$accent}0a, 0 0 0 34px ${$accent}05`;}}
                        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=`0 0 0 12px ${$accent}06, 0 0 0 26px ${$accent}03`;}}>
                        <span style={{fontSize:'2rem'}}>🐝</span>
                        <div style={{fontWeight:800, fontSize:'0.65rem', color:$accent, textAlign:'center', lineHeight:1.2}}>GROUP OY</div>
                        <div style={{fontSize:'0.5rem', color:$textMut, marginTop:2}}>{totalActifs} collaborateurs</div>
                      </div>
                    </div>

                    {/* PLANETS + MOONS */}
                    {planets.map(p => {
                      const px = Math.round(Math.cos(p.angle) * p.r);
                      const py = Math.round(Math.sin(p.angle) * p.r);
                      const mR = p.moons.length > 3 ? 78 : p.moons.length > 1 ? 68 : 55;
                      const mStep = (2 * Math.PI) / Math.max(p.moons.length, 1);
                      const effectif = getE(p.key).length;
                      return (
                        <React.Fragment key={p.key}>
                          {/* Line from center to planet */}
                          <div style={{
                            position:'absolute', top:'52%', left:'50%',
                            width: Math.sqrt(px*px+py*py), height:0,
                            borderTop:`1px dashed ${p.color}20`,
                            transformOrigin:'0 0',
                            transform:`rotate(${Math.atan2(py,px)}rad)`,
                            zIndex:1, pointerEvents:'none'
                          }}/>
                          {/* Moon orbit ring */}
                          {p.moons.length > 0 && (
                            <div style={{
                              position:'absolute', top:'52%', left:'50%',
                              transform:`translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
                              zIndex:2, pointerEvents:'none'
                            }}>
                              <div style={{position:'absolute', top:'50%', left:'50%', width:(mR+18)*2, height:(mR+18)*2, borderRadius:'50%', border:`1px dashed ${p.color}18`, transform:'translate(-50%,-50%)'}}/>
                            </div>
                          )}
                          {/* PLANET */}
                          <div style={{
                            position:'absolute', top:'52%', left:'50%',
                            transform:`translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
                            zIndex:5
                          }}>
                            <div style={{width:64, height:64, borderRadius:'50%', background:p.color+'0c', border:`2.5px solid ${p.color}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', transition:'all 0.25s', cursor:'default', position:'relative'}}
                              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.12)'; e.currentTarget.style.boxShadow=`0 0 0 8px ${p.color}0a`;}}
                              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none';}}>
                              <div style={{fontWeight:800, fontSize:'0.44rem', color:p.color, textAlign:'center', lineHeight:1.3, padding:'0 4px'}}>{p.label}</div>
                              <div style={{fontSize:'0.35rem', color:$textMut}}>{p.sub}</div>
                              {effectif > 0 && <div style={{fontSize:'0.4rem', fontWeight:700, color:p.color, marginTop:1}}>{effectif} pers.</div>}
                            </div>
                          </div>
                          {/* MOONS */}
                          {p.moons.map((m, mi) => {
                            const ma = -Math.PI/2 + mi * mStep;
                            const mx = Math.round(Math.cos(ma) * mR);
                            const my = Math.round(Math.sin(ma) * mR);
                            return (
                              <div key={String(m.id)} style={{
                                position:'absolute', top:'52%', left:'50%',
                                transform:`translate(calc(-50% + ${px+mx}px), calc(-50% + ${py+my}px))`,
                                zIndex:4
                              }}>
                                <div style={{width:42, height:42, borderRadius:'50%', background:m.color+'0a', border:`2px solid ${m.color}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', transition:'all 0.25s', cursor:'default'}}
                                  onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.18)'; e.currentTarget.style.boxShadow=`0 0 0 5px ${m.color}10`;}}
                                  onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none';}}>
                                  <div style={{fontWeight:700, fontSize:'0.36rem', color:m.color, textAlign:'center', padding:'0 3px', lineHeight:1.2}}>{m.label}</div>
                                  {m.count > 0 && <div style={{fontSize:'0.42rem', fontWeight:800, color:m.color}}>{m.count}</div>}
                                </div>
                              </div>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}

                    {/* Legend */}
                    <div style={{position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', display:'flex', gap:16, zIndex:15, background:$bgCard+'f0', padding:'6px 16px', borderRadius:'10px 10px 0 0', border:`1px solid ${$border}`, borderBottom:'none'}}>
                      {[{l:'GROUP OY',c:$accent},{l:'YILMAZ',c:'#444'},{l:'Invest EXE',c:'#8b5cf6'},{l:'Invest LOC',c:'#0ea5e9'},{l:'SCI Elia',c:'#d97706'}].map((x,i)=>(
                        <div key={i} style={{display:'flex', alignItems:'center', gap:4, fontSize:'0.62rem', color:$textMut}}>
                          <span style={{width:8, height:8, borderRadius:'50%', border:`1.5px solid ${x.c}`, background:x.c+'10', display:'inline-block'}}/>
                          {x.l}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ===== VUE BUBBLE ===== */}
              {orgView === 'bubble' && (() => {
                const rings = [
                  { label: 'Direction', emps: employes.filter(e=>e.groupe==='0'), r: 70, color:'#F8DC00', desc:'Groupe 0' },
                  { label: 'Top Management', emps: employes.filter(e=>['XXL','XL'].includes(e.niveau)&&e.groupe!=='0'), r: 150, color:'#f59e0b', desc:'XXL / XL' },
                  { label: 'Management', emps: employes.filter(e=>['L','M'].includes(e.niveau)&&e.groupe!=='0'), r: 240, color:'#3b82f6', desc:'L / M' },
                  { label: "Équipe opérationnelle", emps: employes.filter(e=>['S','XS','XXS'].includes(e.niveau)&&e.groupe!=='0'), r: 340, color:'#22c55e', desc:'S / XS / XXS' },
                ];
                const cx=420, cy=380;
                return (
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8}}>
                      <span>🫧</span><span style={{fontWeight:700, color:$text, fontSize:'0.9rem'}}>Vue Bubble — Cercles Concentriques</span>
                    </div>
                    <div style={{overflowX:'auto', padding:20}}>
                      <svg width={840} height={760} style={{display:'block', margin:'0 auto'}}>
                        {rings.map((ring, ri) => (
                          <circle key={ri} cx={cx} cy={cy} r={ring.r} fill={ring.color+'08'} stroke={ring.color+'30'} strokeWidth={ri===0?2:1} />
                        ))}
                        {rings.map((ring, ri) =>
                          ring.emps.map((emp, ei) => {
                            const angle = (ei / Math.max(ring.emps.length,1)) * 2 * Math.PI - Math.PI/2;
                            const spread = ring.r === 70 ? 0 : ring.r * 0.85;
                            const x = cx + spread * Math.cos(angle);
                            const y = cy + spread * Math.sin(angle);
                            const fc = FILIALE_COLORS[filialeOf(emp)] || ring.color;
                            const bSize = ring.r === 70 ? 22 : ri === 1 ? 16 : ri === 2 ? 13 : 10;
                            return (
                              <g key={emp.id} transform={`translate(${x},${y})`}>
                                <circle r={bSize+3} fill={ring.color} opacity={0.1} />
                                <circle r={bSize} fill={fc} opacity={0.88} stroke={ring.color} strokeWidth={1.5} />
                                <text textAnchor="middle" dominantBaseline="central" fontSize={bSize*0.55} fontWeight={700} fill="#fff">{emp.prenom[0]}{emp.nom[0]}</text>
                                {ri <= 1 && <text textAnchor="middle" y={bSize+11} fontSize={7.5} fill={$textSec} fontWeight={600}>{emp.prenom}</text>}
                              </g>
                            );
                          })
                        )}
                      </svg>
                    </div>
                    {/* Ring legend */}
                    <div style={{padding:'12px 20px', borderTop:`1px solid ${$border}`, display:'flex', gap:20, flexWrap:'wrap'}}>
                      {rings.map(r=><div key={r.label} style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:12,height:12,borderRadius:'50%',background:r.color,opacity:0.8}}/><div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text}}>{r.label}</div><div style={{fontSize:'0.65rem',color:$textMut}}>{r.desc} · {r.emps.length} pers.</div></div></div>)}
                    </div>
                  </div>
                );
              })()}

              {/* ===== VUE RADIAL ===== */}
              {orgView === 'radial' && (() => {
                const filialeGroups = Object.entries(CRM_FIL_NAMES).map(([k,nom]) => ({
                  key: k, nom, color: FILIALE_COLORS[k]||$accent, icon: CRM_FIL_ICONS[k]||'🏢',
                  emps: employes.filter(e => filialeOf(e) === k)
                })).filter(g=>g.emps.length>0);
                const cx=380, cy=360, innerR=60, outerR=280;
                const total = filialeGroups.reduce((s,g)=>s+g.emps.length,0);
                let currentAngle = -Math.PI/2;
                return (
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8}}>
                      <span>🎯</span><span style={{fontWeight:700, color:$text, fontSize:'0.9rem'}}>Vue Radiale — Sunburst par Filiale</span>
                    </div>
                    <div style={{display:'flex', gap:20, padding:20, flexWrap:'wrap', alignItems:'flex-start'}}>
                      <svg width={760} height={720} style={{flex:'0 0 auto'}}>
                        {filialeGroups.map((group, gi) => {
                          const sliceAngle = (group.emps.length / total) * 2 * Math.PI;
                          const midAngle = currentAngle + sliceAngle / 2;
                          const x1i = cx + innerR * Math.cos(currentAngle);
                          const y1i = cy + innerR * Math.sin(currentAngle);
                          const x2i = cx + innerR * Math.cos(currentAngle + sliceAngle);
                          const y2i = cy + innerR * Math.sin(currentAngle + sliceAngle);
                          const x1o = cx + outerR * Math.cos(currentAngle);
                          const y1o = cy + outerR * Math.sin(currentAngle);
                          const x2o = cx + outerR * Math.cos(currentAngle + sliceAngle);
                          const y2o = cy + outerR * Math.sin(currentAngle + sliceAngle);
                          const largeArc = sliceAngle > Math.PI ? 1 : 0;
                          const d = `M${x1i},${y1i} A${innerR},${innerR} 0 ${largeArc} 1 ${x2i},${y2i} L${x2o},${y2o} A${outerR},${outerR} 0 ${largeArc} 0 ${x1o},${y1o} Z`;
                          const lx = cx + (innerR+(outerR-innerR)*0.55) * Math.cos(midAngle);
                          const ly = cy + (innerR+(outerR-innerR)*0.55) * Math.sin(midAngle);
                          currentAngle += sliceAngle;
                          return (
                            <g key={group.key}>
                              <path d={d} fill={group.color} opacity={0.75} stroke={$bgCard} strokeWidth={2} />
                              <text textAnchor="middle" x={lx} y={ly-6} fontSize={9} fontWeight={700} fill="#fff">{group.icon}</text>
                              <text textAnchor="middle" x={lx} y={ly+5} fontSize={8} fontWeight={600} fill="#fff">{group.emps.length}</text>
                            </g>
                          );
                        })}
                        <circle cx={cx} cy={cy} r={innerR-2} fill={$bgCard} />
                        <text textAnchor="middle" x={cx} y={cy-6} fontSize={11} fontWeight={700} fill={$text}>🐝</text>
                        <text textAnchor="middle" x={cx} y={cy+8} fontSize={9} fill={$textMut}>{total} pers.</text>
                      </svg>
                      <div style={{flex:1, minWidth:180}}>
                        {filialeGroups.map(g=>(
                          <div key={g.key} style={{marginBottom:12, padding:'10px 14px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`, borderLeft:`3px solid ${g.color}`}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                              <div style={{fontWeight:700, color:$text, fontSize:'0.85rem'}}>{g.icon} {g.nom}</div>
                              <span style={{background:g.color+'20', color:g.color, borderRadius:crmRd>0?99:2, padding:'1px 8px', fontSize:'0.72rem', fontWeight:700}}>{g.emps.length}</span>
                            </div>
                            {g.emps.slice(0,3).map(e=><div key={e.id} style={{fontSize:'0.72rem', color:$textMut, marginBottom:2}}>· {e.prenom} {e.nom} <span style={{color:NIVEAU_COLORS[e.niveau]||$textMut}}>({e.niveau})</span></div>)}
                            {g.emps.length>3 && <div style={{fontSize:'0.68rem', color:$textMut}}>+{g.emps.length-3} autres</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ===== VUE PAPPERS ===== */}
              {orgView === 'pappers' && (() => {
                const actifs = employes.filter(e => !e.statut || e.statut === 'actif');
                const filialeKeys = ['groupoy','yilmaz','ezel','echafaudage','roulotte','etancheite'];
                const filialeGroups = filialeKeys.map(k => ({
                  key: k,
                  nom: CRM_FIL_NAMES[k],
                  icon: CRM_FIL_ICONS[k],
                  color: FILIALE_COLORS[k] || $accent,
                  emps: actifs.filter(e => filialeOf(e) === k)
                })).filter(g => g.emps.length > 0);

                const NIVEAU_RANK = { XXXL:8, XXL:7, XL:6, L:5, M:4, S:3, XS:2, XXS:1 };
                const sortedEmps = (arr) => [...arr].sort((a,b) => (NIVEAU_RANK[b.niveau]||0)-(NIVEAU_RANK[a.niveau]||0));

                return (
                  <div style={{position:'relative', userSelect:'none'}}>
                    {/* PAGE DE GARDE — même style que presentation */}
                    <div style={{position:'relative', background:`linear-gradient(180deg, ${$bgCard} 0%, ${$bgSub} 100%)`, borderRadius:crmRd, overflow:'hidden', marginBottom:28, border:`1px solid ${$border}`}}>
                      <div style={{position:'absolute', top:'-20%', right:'-10%', width:500, height:500, borderRadius:'50%', background:`radial-gradient(circle, ${$accent}08 0%, transparent 70%)`}}/>
                      <div style={{position:'absolute', bottom:'-15%', left:'-8%', width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, ${$accent}05 0%, transparent 70%)`}}/>
                      <div style={{position:'relative', zIndex:2, padding:'56px 48px', textAlign:'center'}}>
                        <div style={{fontSize:'3.8rem', marginBottom:12, filter:'drop-shadow(0 3px 16px rgba(139,111,71,0.15))'}}>🐝</div>
                        <div style={{fontSize:'2.8rem', fontWeight:800, color:$text, letterSpacing:'-0.05em', lineHeight:1.05, marginBottom:8}}>
                          L'Essaim <span style={{color:$accent}}>Group OY</span>
                        </div>
                        <div style={{fontSize:'0.85rem', color:$textMut, fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:24}}>Organigramme des collaborateurs actifs</div>
                        <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:28}}>
                          {[
                            { n: actifs.length, l: 'Collaborateurs', icon: '👥' },
                            { n: filialeGroups.length, l: 'Entités', icon: '🏢' },
                            { n: actifs.filter(e=>['XXXL','XXL','XL'].includes(e.niveau)).length, l: 'Management', icon: '🎖️' },
                            { n: actifs.filter(e=>e.groupe==='0').length, l: 'Direction', icon: '👑' },
                          ].map((s,i) => (
                            <div key={i} style={{textAlign:'center', minWidth:90, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                              <div style={{fontSize:'0.9rem', marginBottom:4}}>{s.icon}</div>
                              <div style={{fontSize:'1.5rem', fontWeight:800, color:$text}}>{s.n}</div>
                              <div style={{fontSize:'0.62rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginTop:2}}>{s.l}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap'}}>
                          {filialeGroups.map(g => (
                            <span key={g.key} style={{padding:'5px 14px', borderRadius:crmRd>0?20:2, background:g.color+'12', color:g.color, fontSize:'0.8rem', fontWeight:600, border:`1px solid ${g.color}25`}}>
                              {g.icon} {g.nom}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* FILIALES — une par une */}
                    <div style={{display:'flex', flexDirection:'column', gap:24}}>
                      {filialeGroups.map(group => {
                        const sorted = sortedEmps(group.emps);
                        const direction = sorted.filter(e => ['XXXL','XXL'].includes(e.niveau));
                        const management = sorted.filter(e => ['XL','L','M'].includes(e.niveau));
                        const equipe = sorted.filter(e => ['S','XS','XXS'].includes(e.niveau));

                        return (
                          <div key={group.key} style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                            {/* Header filiale */}
                            <div style={{background:`linear-gradient(135deg, ${group.color}18, ${group.color}08)`, borderBottom:`2px solid ${group.color}30`, padding:'18px 24px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                              <div style={{display:'flex', alignItems:'center', gap:12}}>
                                <div style={{width:44, height:44, borderRadius:crmRd, background:group.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', boxShadow:`0 4px 12px ${group.color}40`}}>
                                  {group.icon}
                                </div>
                                <div>
                                  <div style={{fontSize:'1.1rem', fontWeight:800, color:group.color, letterSpacing:'-0.02em'}}>{group.nom}</div>
                                  <div style={{fontSize:'0.72rem', color:$textMut, marginTop:1}}>
                                    {group.key !== 'groupoy' && group.key !== 'yilmaz' ? 'Filiale opérationnelle · ' : 'Entité · '}
                                    {group.emps.length} collaborateur{group.emps.length>1?'s':''}
                                  </div>
                                </div>
                              </div>
                              <div style={{display:'flex', gap:8}}>
                                {direction.length>0 && <span style={{padding:'3px 10px', borderRadius:crmRd>0?99:2, background:NIVEAU_COLORS['XXXL']+'20', color:NIVEAU_COLORS['XXXL'], fontSize:'0.68rem', fontWeight:700}}>👑 {direction.length} dir.</span>}
                                {management.length>0 && <span style={{padding:'3px 10px', borderRadius:crmRd>0?99:2, background:NIVEAU_COLORS['L']+'20', color:NIVEAU_COLORS['L'], fontSize:'0.68rem', fontWeight:700}}>🎖️ {management.length} mgmt</span>}
                                {equipe.length>0 && <span style={{padding:'3px 10px', borderRadius:crmRd>0?99:2, background:NIVEAU_COLORS['S']+'20', color:NIVEAU_COLORS['S'], fontSize:'0.68rem', fontWeight:700}}>🐝 {equipe.length} équipe</span>}
                              </div>
                            </div>

                            <div style={{padding:20}}>
                              {/* Direction */}
                              {direction.length > 0 && (
                                <div style={{marginBottom:management.length>0||equipe.length>0?16:0}}>
                                  <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Direction</div>
                                  <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
                                    {direction.map(emp => {
                                      const nc = NIVEAU_COLORS[emp.niveau] || group.color;
                                      return (
                                        <div key={emp.id} style={{background:`linear-gradient(135deg, ${$bgSub}, ${$bgCard})`, border:`1px solid ${group.color}25`, borderRadius:crmRd, padding:'14px 18px', minWidth:200, position:'relative', overflow:'hidden', flex:'0 0 auto'}}>
                                          <div style={{position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${group.color}, ${nc})`}}/>
                                          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                                            <div style={{width:38, height:38, borderRadius:'50%', background:group.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'0.88rem', boxShadow:`0 2px 8px ${group.color}40`, flexShrink:0}}>
                                              {emp.prenom?emp.prenom[0]:''}{emp.nom?emp.nom[0]:''}
                                            </div>
                                            <div>
                                              <div style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>{emp.prenom} {emp.nom}</div>
                                              <div style={{fontSize:'0.72rem', color:$textSec}}>{emp.posteExterne || emp.posteInterne}</div>
                                            </div>
                                          </div>
                                          <div style={{display:'flex', gap:6}}>
                                            <span style={{padding:'2px 8px', borderRadius:crmRd>0?99:2, background:nc+'20', color:nc, fontSize:'0.62rem', fontWeight:700}}>{emp.niveau}</span>
                                            <span style={{padding:'2px 8px', borderRadius:crmRd>0?99:2, background:group.color+'15', color:group.color, fontSize:'0.62rem', fontWeight:600}}>{NIVEAU_BEE[emp.niveau]||''}</span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Management */}
                              {management.length > 0 && (
                                <div style={{marginBottom:equipe.length>0?16:0}}>
                                  <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Management & Encadrement</div>
                                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))', gap:10}}>
                                    {management.map(emp => {
                                      const nc = NIVEAU_COLORS[emp.niveau] || group.color;
                                      return (
                                        <div key={emp.id} style={{background:$bgSub, border:`1px solid ${$border}`, borderLeft:`3px solid ${nc}`, borderRadius:crmRd, padding:'10px 14px'}}>
                                          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                                            <div style={{width:30, height:30, borderRadius:'50%', background:nc+'20', border:`1.5px solid ${nc}`, display:'flex', alignItems:'center', justifyContent:'center', color:nc, fontWeight:700, fontSize:'0.78rem', flexShrink:0}}>
                                              {emp.prenom?emp.prenom[0]:''}{emp.nom?emp.nom[0]:''}
                                            </div>
                                            <div>
                                              <div style={{fontWeight:700, color:$text, fontSize:'0.82rem', lineHeight:1.2}}>{emp.prenom} {emp.nom}</div>
                                              <div style={{fontSize:'0.68rem', color:$textSec, lineHeight:1.2}}>{emp.posteExterne || emp.posteInterne}</div>
                                            </div>
                                          </div>
                                          <span style={{padding:'1px 7px', borderRadius:crmRd>0?99:2, background:nc+'15', color:nc, fontSize:'0.6rem', fontWeight:700}}>{emp.niveau} — {NIVEAU_BEE[emp.niveau]||''}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Équipe */}
                              {equipe.length > 0 && (
                                <div>
                                  <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10}}>Équipe opérationnelle</div>
                                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                                    {equipe.map(emp => {
                                      const nc = NIVEAU_COLORS[emp.niveau] || $textMut;
                                      return (
                                        <div key={emp.id} style={{background:$bgSub, border:`1px solid ${$border}`, borderRadius:crmRd, padding:'8px 12px', display:'flex', alignItems:'center', gap:8}}>
                                          <div style={{width:26, height:26, borderRadius:'50%', background:nc+'18', border:`1px solid ${nc}30`, display:'flex', alignItems:'center', justifyContent:'center', color:nc, fontWeight:700, fontSize:'0.7rem', flexShrink:0}}>
                                            {emp.prenom?emp.prenom[0]:''}{emp.nom?emp.nom[0]:''}
                                          </div>
                                          <div>
                                            <div style={{fontWeight:600, color:$text, fontSize:'0.78rem'}}>{emp.prenom} {emp.nom}</div>
                                            <div style={{fontSize:'0.65rem', color:$textMut}}>{emp.posteExterne || emp.posteInterne} · <span style={{color:nc}}>{emp.niveau}</span></div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* ===== VUE ARBRE (Pappers) ===== */}
              {orgView === 'arbre' && (() => {
                const pdg = employes.find(e => e.niveau === 'XXXL') || employes[0];
                const opF = filialesDynamiques.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE'].includes(f.nom));
                const exeNodes = opF.filter(f => f.holding === 'INVEST EXE');
                const locNodes = opF.filter(f => f.holding === 'INVEST LOC' || !f.holding);

                const W = 720, H = 500, cx = W/2, cy = H/2;

                const initPos = () => {
                  const p = {};
                  p['pdg'] = { x: cx, y: cy };
                  const mainAngles = [-Math.PI/2, Math.PI/6, Math.PI - Math.PI/6, Math.PI/2 + Math.PI/6];
                  ['groupoy','invest_exe','invest_loc','yilmaz'].forEach((id,i) => {
                    p[id] = { x: cx + Math.cos(mainAngles[i])*168, y: cy + Math.sin(mainAngles[i])*148 };
                  });
                  exeNodes.forEach((n,i) => {
                    const base = mainAngles[1];
                    const a = base + (i - (exeNodes.length-1)/2) * 0.65;
                    p[String(n.id)] = { x: p['invest_exe'].x + Math.cos(a)*118, y: p['invest_exe'].y + Math.sin(a)*105 };
                  });
                  locNodes.forEach((n,i) => {
                    const base = mainAngles[2];
                    const a = base + (i - (locNodes.length-1)/2) * 0.65;
                    p[String(n.id)] = { x: p['invest_loc'].x + Math.cos(a)*118, y: p['invest_loc'].y + Math.sin(a)*105 };
                  });
                  return p;
                };

                const currentPos = orgArbrePos || initPos();

                const allNodes = [
                  { id:'pdg', label: pdg ? (pdg.prenom||'')+' '+(pdg.nom||'') : 'Özdoğan YILMAZ', sub:'PDG', color:'#22c55e', size:36, type:'pdg' },
                  { id:'groupoy', label:'GROUP OY', sub:'Holding mère', color:'#8B6F47', size:30, type:'holding' },
                  { id:'invest_exe', label:'INVEST EXE', sub:'Exécution', color:'#8b5cf6', size:26, type:'holding' },
                  { id:'invest_loc', label:'INVEST LOC', sub:'Location', color:'#0ea5e9', size:26, type:'holding' },
                  { id:'yilmaz', label:'YILMAZ SAS', sub:'Services', color:$textSec, size:22, type:'support' },
                  ...exeNodes.map(f => ({ id:String(f.id), label:(f.nom||''), sub:(f.activite||'').split(' ')[0], color:f.couleur||$accent, size:20, type:'filiale' })),
                  ...locNodes.map(f => ({ id:String(f.id), label:(f.nom||''), sub:(f.activite||'').split(' ')[0], color:f.couleur||$accent, size:20, type:'filiale' })),
                ];

                const edges = [
                  { from:'pdg', to:'groupoy' }, { from:'pdg', to:'invest_exe' },
                  { from:'pdg', to:'invest_loc' }, { from:'pdg', to:'yilmaz' },
                  ...exeNodes.map(n => ({ from:'invest_exe', to:String(n.id) })),
                  ...locNodes.map(n => ({ from:'invest_loc', to:String(n.id) })),
                ];

                const getSVGPt = (e) => {
                  const svg = orgArbreRef.current;
                  if (!svg) return { x:0, y:0 };
                  const r = svg.getBoundingClientRect();
                  return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
                };

                const handleMouseDown = (e, id) => {
                  e.preventDefault();
                  if (!orgArbrePos) setOrgArbrePos(currentPos);
                  const pt = getSVGPt(e);
                  const pos = currentPos[id];
                  if (!pos) return;
                  setOrgArbreDrag({ id, offsetX: pt.x - pos.x, offsetY: pt.y - pos.y });
                };
                const handleMouseMove = (e) => {
                  if (!orgArbreDrag) return;
                  const pt = getSVGPt(e);
                  setOrgArbrePos(prev => ({ ...(prev || currentPos), [orgArbreDrag.id]: { x: pt.x - orgArbreDrag.offsetX, y: pt.y - orgArbreDrag.offsetY } }));
                };
                const handleMouseUp = () => setOrgArbreDrag(null);

                const legend = [{l:'Dirigeant',c:'#22c55e'},{l:'Holding',c:'#8B6F47'},{l:'Exécution',c:'#8b5cf6'},{l:'Location',c:'#0ea5e9'},{l:'Support',c:'#555'}];

                return (
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
                      <div style={{display:'flex', alignItems:'center', gap:10}}>
                        <span style={{fontWeight:800, fontSize:'1rem', color:$text}}>Réseau Pappers</span>
                        <span style={{fontSize:'0.72rem', color:$textMut, background:$bgSub, padding:'2px 8px', borderRadius:crmRd>0?20:2, border:`1px solid ${$border}`}}>Glisser les nœuds</span>
                      </div>
                      <div style={{display:'flex', gap:12, alignItems:'center'}}>
                        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                          {legend.map((x,i) => (
                            <div key={i} style={{display:'flex', alignItems:'center', gap:4, fontSize:'0.68rem', color:$textMut}}>
                              <span style={{width:7, height:7, borderRadius:'50%', background:x.c, display:'inline-block', flexShrink:0}}/>
                              {x.l}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => { setOrgArbrePos(null); setOrgArbreDrag(null); }} style={{padding:'4px 10px', fontSize:'0.72rem', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$textMut, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap'}}>↺ Reset</button>
                      </div>
                    </div>
                    <div style={{background:$bgSub, userSelect:'none', position:'relative'}}>
                      <svg
                        ref={orgArbreRef}
                        width="100%"
                        viewBox={`0 0 ${W} ${H}`}
                        style={{display:'block', maxHeight:500, cursor: orgArbreDrag ? 'grabbing' : 'default'}}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      >
                        <defs>
                          <filter id="arbre-sh" x="-40%" y="-40%" width="180%" height="180%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12"/>
                          </filter>
                          <pattern id="arbre-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke={$border} strokeWidth="0.4" opacity="0.5"/>
                          </pattern>
                        </defs>
                        <rect width={W} height={H} fill="url(#arbre-grid)"/>
                        {edges.map((e,i) => {
                          const f = currentPos[e.from];
                          const t = currentPos[e.to];
                          if (!f || !t) return null;
                          const fn = allNodes.find(n => n.id === e.from);
                          const mx = (f.x+t.x)/2, my = (f.y+t.y)/2;
                          return <path key={i} d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`} fill="none" stroke={(fn?.color||'#ccc')+'40'} strokeWidth={1.5} strokeDasharray="4 3"/>;
                        })}
                        {allNodes.map(n => {
                          const p = currentPos[n.id];
                          if (!p) return null;
                          const isDragged = orgArbreDrag?.id === n.id;
                          const shortLabel = n.id === 'pdg' ? 'PDG' : (n.label.length > 9 ? n.label.substring(0,8)+'…' : n.label);
                          const extLabel = n.label;
                          const labelY = p.y + n.size + 14;
                          return (
                            <g key={n.id} style={{cursor: isDragged ? 'grabbing' : 'grab'}} onMouseDown={e => handleMouseDown(e, n.id)}>
                              {isDragged && <circle cx={p.x} cy={p.y} r={n.size+10} fill={n.color+'12'} stroke={n.color+'40'} strokeWidth={1.5}/>}
                              <circle cx={p.x} cy={p.y} r={n.size} fill={n.color+'18'} stroke={n.color} strokeWidth={n.type==='pdg'?2.5:n.type==='holding'?2:1.5} filter={isDragged ? 'url(#arbre-sh)' : ''}/>
                              <text x={p.x} y={p.y-3} textAnchor="middle" fontSize={n.type==='pdg'?8.5:7.5} fontWeight={700} fill={n.color} fontFamily="inherit" style={{pointerEvents:'none'}}>{shortLabel}</text>
                              {n.sub && <text x={p.x} y={p.y+8} textAnchor="middle" fontSize={6} fill={n.color+'99'} fontFamily="inherit" style={{pointerEvents:'none'}}>{n.sub}</text>}
                              <text x={p.x} y={labelY} textAnchor="middle" fontSize={8.5} fill={$text} fontFamily="inherit" fontWeight={500} style={{pointerEvents:'none'}}>{extLabel}</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                );
              })()}

              {/* ===== VUE SOCIETE.COM ===== */}
              {orgView === 'societe' && (() => {
                const pdg = employes.find(e => e.niveau === 'XXXL') || employes[0];
                const pdgLabel = pdg ? (pdg.prenom||'')+' '+(pdg.nom||'') : 'Ozdogan YILMAZ';
                const opF = filialesDynamiques.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ SAS'].includes(f.nom));
                const exeF = opF.filter(f => f.holding === 'INVEST EXE');
                const locF = opF.filter(f => f.holding === 'INVEST LOC' || !f.holding);

                const W = 900, H = 640, cx = W/2;

                const getEmps = (fid) => employes.filter(e => (e.statut||'actif')==='actif' && (
                  fid === 'yilmaz' ? (e.filialeId==='yilmaz'||e.filialeId===0||e.filialeId==='0') : e.filialeId===fid
                ));

                // Layout logic:
                // Row 0: PDG (center top)
                // Row 1: GROUP OY (center)
                // Row 2: INVEST EXE (center-left), INVEST LOC (center-right) | YILMAZ (far right), SCI ELIA (far left)
                // Row 3: filiales under their holding (center zone)

                const holdingNodes = [
                  { id:'invest_exe', label:'INVEST EXE', sub:'Exécution',  color:'#8b5cf6', icon:'⚡', type:'holding' },
                  { id:'invest_loc', label:'INVEST LOC', sub:'Location',   color:'#0ea5e9', icon:'📦', type:'holding' },
                ];
                const sideNodes = [
                  { id:'yilmaz',   label:'YILMAZ SAS', sub:'Services',   color:$text, icon:'🔧', type:'support', effectif: getEmps('yilmaz').length },
                  { id:'sci_elia', label:'SCI Elia',   sub:'Immobilier', color:'#d97706', icon:'🏠', type:'sci' },
                ];
                const filialeNodes = [
                  ...exeF.map(f => ({ id:String(f.id), label:(f.nom||''), sub:(f.activite||'').slice(0,20), color:f.couleur||'#666', icon:f.icon||'🏗️', type:'filiale', parent:'invest_exe', effectif: getEmps(f.id).length, ca: f.ca })),
                  ...locF.map(f => ({ id:String(f.id), label:(f.nom||''), sub:(f.activite||'').slice(0,20), color:f.couleur||'#666', icon:f.icon||'🏭', type:'filiale', parent:'invest_loc', effectif: getEmps(f.id).length, ca: f.ca })),
                ];
                const groupOyNode = { id:'groupoy', label:'GROUP OY', sub:'Holding mère', color:'#8B6F47', icon:'🐝', type:'group', effectif: employes.filter(e=>(e.statut||'actif')==='actif').length };

                const initPositions = () => {
                  const p = {};
                  // Row 0 — PDG
                  p['pdg']     = { x: cx,       y: 60  };
                  // Row 1 — GROUP OY
                  p['groupoy'] = { x: cx,       y: 168 };

                  // Row 2 — Holdings (center), side nodes (edges)
                  const holdGap = 150; // gap between INVEST EXE and INVEST LOC
                  p['invest_exe'] = { x: cx - holdGap, y: 300 };
                  p['invest_loc'] = { x: cx + holdGap, y: 300 };
                  // Side nodes — far left and far right at same row
                  p['sci_elia'] = { x: cx - holdGap*2.8, y: 300 };
                  p['yilmaz']   = { x: cx + holdGap*2.8, y: 300 };

                  // Row 3 — filiales under their holding
                  exeF.forEach((f, i) => {
                    const n = exeF.length;
                    const spread = n > 1 ? (i - (n-1)/2) * 120 : 0;
                    p[String(f.id)] = { x: p['invest_exe'].x + spread, y: 435 };
                  });
                  locF.forEach((f, i) => {
                    const n = locF.length;
                    const spread = n > 1 ? (i - (n-1)/2) * 120 : 0;
                    p[String(f.id)] = { x: p['invest_loc'].x + spread, y: 435 };
                  });
                  return p;
                };

                const positions = orgSocietePos || initPositions();
                const zoom = orgSocieteZoom;
                const pan  = orgSocietePan;

                const getSVGPt = (e) => {
                  const svg = orgSocieteRef.current;
                  if (!svg) return {x:0,y:0};
                  const r = svg.getBoundingClientRect();
                  const rawX = (e.clientX - r.left) * (W / r.width);
                  const rawY = (e.clientY - r.top)  * (H / r.height);
                  return { x: (rawX - pan.x) / zoom, y: (rawY - pan.y) / zoom };
                };

                const onNodeMD = (e, id) => {
                  e.preventDefault(); e.stopPropagation();
                  const snap = orgSocietePos || initPositions();
                  if (!orgSocietePos) setOrgSocietePos(snap);
                  const pt = getSVGPt(e);
                  const pos = snap[id];
                  if (!pos) return;
                  setOrgSocieteDrag({ id, ox: pt.x - pos.x, oy: pt.y - pos.y, snap });
                };
                const onMM = (e) => {
                  if (orgSocieteDrag) {
                    const pt = getSVGPt(e);
                    setOrgSocietePos(prev => ({
                      ...(prev || orgSocieteDrag.snap),
                      [orgSocieteDrag.id]: { x: pt.x - orgSocieteDrag.ox, y: pt.y - orgSocieteDrag.oy }
                    }));
                  } else if (orgSocietePanning) {
                    const dx = e.clientX - orgSocietePanning.startX;
                    const dy = e.clientY - orgSocietePanning.startY;
                    setOrgSocietePan({ x: orgSocietePanning.panX + dx, y: orgSocietePanning.panY + dy });
                  }
                };
                const onMU = () => { setOrgSocieteDrag(null); setOrgSocietePanning(null); };
                const onBgMD = (e) => {
                  const t = e.target;
                  if (t === orgSocieteRef.current || t.tagName === 'rect' || t.tagName === 'svg') {
                    setOrgSocietePanning({ startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y });
                  }
                };
                const onWheel = (e) => {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? 0.97 : 1.03;
                  setOrgSocieteZoom(z => Math.min(3, Math.max(0.3, z * delta)));
                };

                const pdgPos = positions['pdg'] || {x:cx, y:60};
                const getNodeSize = (n) => n.type==='group'?26 : n.type==='holding'?22 : n.type==='support'||n.type==='sci'?19 : 17;
                const fmtCa = (ca) => !ca||ca===0?'' : ca>=1000000?(ca/1000000).toFixed(1)+'M' : ca>=1000?Math.round(ca/1000)+'k' : String(ca);

                // Edges: GROUP OY → all; holdings → their filiales; side nodes stay lateral
                const edgeDefs = [
                  { from:'pdg',        to:'groupoy',    label:'Président', color:'#8B6F47', w:2,   dash:'none' },
                  { from:'groupoy',    to:'invest_exe', label:'Président', color:'#8b5cf6', w:1.8, dash:'none' },
                  { from:'groupoy',    to:'invest_loc', label:'Président', color:'#0ea5e9', w:1.8, dash:'none' },
                  { from:'groupoy',    to:'yilmaz',     label:'Président', color:$text, w:1.4, dash:'5 3' },
                  { from:'groupoy',    to:'sci_elia',   label:'Associé',   color:'#d97706', w:1.4, dash:'5 3' },
                  ...exeF.map(f => ({ from:'invest_exe', to:String(f.id), label:'100%', color:f.couleur||'#8b5cf6', w:1.2, dash:'5 3' })),
                  ...locF.map(f => ({ from:'invest_loc', to:String(f.id), label:'100%', color:f.couleur||'#0ea5e9', w:1.2, dash:'5 3' })),
                ];

                const renderEdges = () => edgeDefs.map(edge => {
                  const fromPos = edge.from==='pdg' ? pdgPos : positions[edge.from];
                  const toPos   = positions[edge.to];
                  if (!fromPos || !toPos) return null;
                  const midY = (fromPos.y + toPos.y) / 2;
                  const pathD = `M ${fromPos.x} ${fromPos.y} C ${fromPos.x} ${midY}, ${toPos.x} ${midY}, ${toPos.x} ${toPos.y}`;
                  const lx = (fromPos.x + toPos.x) / 2;
                  const ly = midY;
                  const isVert = Math.abs(toPos.x - fromPos.x) < 30;
                  const ang = isVert ? -90 : Math.atan2(toPos.y-fromPos.y, toPos.x-fromPos.x)*180/Math.PI;
                  return (
                    <g key={"e-"+edge.from+"-"+edge.to}>
                      <defs>
                        <marker id={"arr-"+edge.from+"-"+edge.to} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill={edge.color} opacity="0.55"/>
                        </marker>
                      </defs>
                      <path d={pathD} fill="none" stroke={edge.color} strokeWidth={edge.w}
                        strokeOpacity="0.42" strokeDasharray={edge.dash}
                        markerEnd={"url(#arr-"+edge.from+"-"+edge.to+")"}/>
                      <g transform={`translate(${lx},${ly}) rotate(${isVert?-90:(ang>90||ang<-90?ang+180:ang)})`}>
                        <rect x={-24} y={-9} width={48} height={13} rx={3} fill="white" opacity="0.88"/>
                        <text textAnchor="middle" dy={3} fontSize={7.5} fill={edge.color} fontFamily="inherit" fontWeight={600} fontStyle="italic">{edge.label}</text>
                      </g>
                    </g>
                  );
                });

                const renderNode = (node) => {
                  const p = positions[node.id];
                  if (!p) return null;
                  const sz = getNodeSize(node);
                  const isd = orgSocieteDrag?.id === node.id;
                  const isGroup   = node.type==='group';
                  const isHolding = node.type==='holding';
                  return (
                    <g key={node.id} onMouseDown={e => onNodeMD(e, node.id)} style={{cursor:isd?'grabbing':'grab'}}>
                      <defs>
                        <radialGradient id={"rg-"+node.id} cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="white" stopOpacity="0.28"/>
                          <stop offset="100%" stopColor={node.color} stopOpacity="1"/>
                        </radialGradient>
                        <marker id={"arr-nd-"+node.id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill={node.color} opacity="0.5"/>
                        </marker>
                      </defs>
                      <circle cx={p.x} cy={p.y} r={sz+8} fill={node.color} opacity={isd?0.14:0.06}/>
                      <circle cx={p.x+2} cy={p.y+3} r={sz+1} fill="rgba(0,0,0,0.10)" filter="url(#blur-sc)"/>
                      <circle cx={p.x} cy={p.y} r={sz+3} fill="white" stroke={node.color} strokeWidth={isd?2.5:1.5} strokeOpacity={0.55}/>
                      <circle cx={p.x} cy={p.y} r={sz} fill={"url(#rg-"+node.id+")"}/>
                      <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
                        fontSize={isGroup?17:isHolding?15:13} style={{pointerEvents:'none'}}>{node.icon}</text>
                      <text x={p.x} y={p.y+sz+13} textAnchor="middle"
                        fontSize={isGroup?10:isHolding?9:8} fontWeight={700} fill="#1a1a1a"
                        fontFamily="inherit" style={{pointerEvents:'none'}}>{node.label}</text>
                      {node.sub && <text x={p.x} y={p.y+sz+23} textAnchor="middle" fontSize={6.5} fill="#888" fontFamily="inherit" style={{pointerEvents:'none'}}>{node.sub}</text>}
                      {node.effectif !== undefined && (
                        <g style={{pointerEvents:'none'}}>
                          <rect x={p.x+sz-1} y={p.y-sz-1} width={17} height={12} rx={6} fill={node.color}/>
                          <text x={p.x+sz+7} y={p.y-sz+8} textAnchor="middle" fontSize={7} fontWeight={700} fill="white" fontFamily="inherit">{node.effectif}</text>
                        </g>
                      )}
                      {node.ca && node.ca>0 && fmtCa(node.ca) && (
                        <g style={{pointerEvents:'none'}}>
                          <rect x={p.x-14} y={p.y-sz-13} width={28} height={11} rx={4} fill="#f0fdf4" stroke="#22c55e" strokeWidth={0.8}/>
                          <text x={p.x} y={p.y-sz-5} textAnchor="middle" fontSize={7} fontWeight={700} fill="#16a34a" fontFamily="inherit">{fmtCa(node.ca)}</text>
                        </g>
                      )}
                    </g>
                  );
                };

                return (
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'10px 16px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                      <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
                        <span style={{fontWeight:800, fontSize:'0.95rem', color:$text}}>Cartographie Groupe</span>
                        <span style={{fontSize:'0.61rem', color:$textMut, background:$bgSub, padding:'2px 7px', borderRadius:crmRd>0?20:2, border:`1px solid ${$border}`}}>✦ Glisser noeuds</span>
                        <span style={{fontSize:'0.61rem', color:$textMut, background:$bgSub, padding:'2px 7px', borderRadius:crmRd>0?20:2, border:`1px solid ${$border}`}}>🖱️ Molette = zoom</span>
                        <span style={{fontSize:'0.61rem', color:$textMut, background:$bgSub, padding:'2px 7px', borderRadius:crmRd>0?20:2, border:`1px solid ${$border}`}}>Drag fond = pan</span>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:5}}>
                        <button onClick={() => setOrgSocieteZoom(z => Math.min(3, z*1.15))} style={{width:26, height:26, fontSize:'1rem', borderRadius:6, border:`1px solid ${$border}`, background:$bgSub, color:$textMut, cursor:'pointer', lineHeight:1, display:'flex', alignItems:'center', justifyContent:'center'}}>+</button>
                        <span style={{fontSize:'0.72rem', color:$textMut, minWidth:38, textAlign:'center'}}>{Math.round(zoom*100)}%</span>
                        <button onClick={() => setOrgSocieteZoom(z => Math.max(0.3, z*0.87))} style={{width:26, height:26, fontSize:'1rem', borderRadius:6, border:`1px solid ${$border}`, background:$bgSub, color:$textMut, cursor:'pointer', lineHeight:1, display:'flex', alignItems:'center', justifyContent:'center'}}>−</button>
                        <button onClick={() => { setOrgSocietePos(null); setOrgSocieteDrag(null); setOrgSocieteZoom(1); setOrgSocietePan({x:0,y:0}); }} style={{padding:'3px 10px', fontSize:'0.7rem', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$textMut, cursor:'pointer', fontFamily:'inherit', marginLeft:2}}>↺ Reset</button>
                      </div>
                    </div>

                    <div style={{background:'#f9fafb', userSelect:'none'}}>
                      <svg ref={orgSocieteRef} width="100%" viewBox={`0 0 ${W} ${H}`}
                        style={{display:'block', height:590, cursor: orgSocieteDrag?'grabbing':orgSocietePanning?'grabbing':'grab'}}
                        onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
                        onMouseDown={onBgMD} onWheel={onWheel}>
                        <defs>
                          <filter id="blur-sc" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2.5"/>
                          </filter>
                          <pattern id="dots-sc" width="22" height="22" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="0.9" fill="#d1d5db"/>
                          </pattern>
                        </defs>

                        <rect width={W} height={H} fill="url(#dots-sc)"/>

                        {/* Zoom + pan group */}
                        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
                          {renderEdges()}
                          {filialeNodes.map(n => renderNode(n))}
                          {sideNodes.map(n => renderNode(n))}
                          {holdingNodes.map(n => renderNode(n))}
                          {renderNode(groupOyNode)}
                          {(() => {
                            const p = pdgPos;
                            const isd = orgSocieteDrag?.id === 'pdg';
                            return (
                              <g onMouseDown={e => onNodeMD(e, 'pdg')} style={{cursor:isd?'grabbing':'grab'}}>
                                <defs>
                                  <radialGradient id="rg-pdg" cx="35%" cy="25%" r="75%">
                                    <stop offset="0%" stopColor="#a78bfa"/>
                                    <stop offset="100%" stopColor="#6d28d9"/>
                                  </radialGradient>
                                </defs>
                                <ellipse cx={p.x} cy={p.y+33} rx={20} ry={5} fill="rgba(109,40,217,0.15)"/>
                                <path d={`M${p.x-9},${p.y+7} Q${p.x},${p.y+26} ${p.x+9},${p.y+7}`} fill="#6d28d9"/>
                                <circle cx={p.x} cy={p.y} r={isd?31:29} fill="url(#rg-pdg)" stroke="white" strokeWidth={2.5} filter="url(#blur-sc)"/>
                                <circle cx={p.x} cy={p.y-8} r={7.5} fill="white" opacity="0.9"/>
                                <path d={`M${p.x-11},${p.y+5} Q${p.x},${p.y-1} ${p.x+11},${p.y+5}`} fill="white" opacity="0.7"/>
                                <rect x={p.x-50} y={p.y+29} width={100} height={18} rx={5} fill="#6d28d9" opacity="0.92"/>
                                <text x={p.x} y={p.y+42} textAnchor="middle" fontSize={8} fontWeight={700} fill="white" fontFamily="inherit" style={{pointerEvents:'none'}}>{pdgLabel}</text>
                                <text x={p.x} y={p.y+13} textAnchor="middle" fontSize={6.5} fill="white" fontFamily="inherit" fontWeight={600} style={{pointerEvents:'none'}}>PDG</text>
                              </g>
                            );
                          })()}
                        </g>

                        {/* Legend fixed */}
                        <g transform={`translate(${W/2}, ${H-11})`}>
                          {[{l:'PDG',c:'#6d28d9'},{l:'Groupe',c:'#8B6F47'},{l:'Holding EXE',c:'#8b5cf6'},{l:'Holding LOC',c:'#0ea5e9'},{l:'YILMAZ',c:'#374151'},{l:'SCI',c:'#d97706'},{l:'Filiale',c:'#007ab5'}].map((x,i,arr)=>(
                            <g key={x.l} transform={`translate(${(i-(arr.length-1)/2)*82},0)`}>
                              <circle cx={0} cy={0} r={4} fill={x.c} opacity="0.75"/>
                              <text x={7} y={4} fontSize={7} fill="#6b7280" fontFamily="inherit">{x.l}</text>
                            </g>
                          ))}
                        </g>
                      </svg>
                    </div>
                  </div>
                );
              })()}
            </>
          );
}
