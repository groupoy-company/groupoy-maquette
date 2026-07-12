// === Onglet « presentation_groupe » — extrait de App.jsx (modularisation, forme iife) ===
import React, { useEffect, useRef, useState } from 'react';

export default function TabPresentationGroupe(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, ca, chantiers, collaborateurs, crmRd, dirigeantDragRef, employes, filialeDragRef, filialesDynamiques, filialesEnrichies, getKpiFiliale, homFilCardSize, isLoggedIn, niveau, ordreDirigeants, ordreFilialesPresentation, resultatNet, setDashboardFiliale, setNavEntreprise, setNavService, setOngletActif, setOrdreDirigeants, setOrdreFilialesPresentation, setShowLoginModal } = __props;
          const filialesOp = filialesEnrichies.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom));
          const allKpis = filialesOp.map(f => ({...f, kpi: getKpiFiliale(f)}));
          const totCA = allKpis.reduce((s,f) => s+f.kpi.ca, 0);
          const totEffectif = employes.length;
          const totChantiers = chantiers.filter(c => c.statut === 'En cours').length;
          const totFiliales = filialesOp.length;
          const gradMap = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};
          const niveauxData = [
            { niv: 'XXS', label: 'Butineur', ca: '0-0.5M€', color: '#a3e635', emoji: '🌱' },
            { niv: 'XS', label: 'Collecteur', ca: '0.5-1M€', color: '#84cc16', emoji: '🐝' },
            { niv: 'S', label: 'Bâtisseur', ca: '1-1.5M€', color: '#eab308', emoji: '🍯' },
            { niv: 'M', label: 'Maître-Bâtisseur', ca: '1.5-3M€', color: '#f59e0b', emoji: '🏗️' },
            { niv: 'L', label: 'Gardien de Ruche', ca: '3-5M€', color: '#f97316', emoji: '🏰' },
            { niv: 'XL', label: 'Régisseur de Ruche', ca: '5-7.5M€', color: '#ef4444', emoji: '🏰' },
            { niv: 'XXL', label: 'Maître-Apiculteur', ca: '7.5-12M€', color: '#dc2626', emoji: '👑' },
            { niv: 'XXXL', label: 'Roi de la Ruche', ca: '12-15M€', color: '#b91c1c', emoji: '👑' }
          ];
          const responsables = employes.filter(e => e.isResponsable);
          const dirigeantsRows = (() => {
            const filtered = employes.filter(e => ['XXXL','XXL','XL'].includes(e.niveau));
            const allIds = filtered.map(e => e.id);
            const layout = Array.isArray(ordreDirigeants[0]) ? ordreDirigeants : [ordreDirigeants];
            const cleaned = layout.map(row => row.filter(id => allIds.includes(id))).filter(r => r.length > 0);
            const usedIds = cleaned.flat();
            const missing = allIds.filter(id => !usedIds.includes(id));
            if (missing.length > 0) {
              if (cleaned.length > 0) cleaned[cleaned.length - 1].push(...missing);
              else cleaned.push(missing);
            }
            return cleaned.map(row => row.map(id => filtered.find(e => e.id === id)).filter(Boolean));
          })();
          const sectionS = { maxWidth:1100, margin:'0 auto', padding:'120px 32px' };
          const titleS = { fontSize:'2.8rem', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1.1 };
          const subtitleS = { fontSize:'1.15rem', color:$textSec, lineHeight:1.8, maxWidth:640, fontWeight:400 };
          const AnimatedCounter = ({end, suffix='', prefix=''}) => {
            const [val, setVal] = React.useState(0);
            const ref = React.useRef(null);
            React.useEffect(() => {
              const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                  let start = 0; const dur = 2000; const startTime = performance.now();
                  const step = (t) => { const p = Math.min((t - startTime) / dur, 1); const eased = 1 - Math.pow(1 - p, 3); setVal(Math.round(eased * end)); if (p < 1) requestAnimationFrame(step); };
                  requestAnimationFrame(step); obs.disconnect();
                }
              }, {threshold: 0.3});
              if (ref.current) obs.observe(ref.current);
              return () => obs.disconnect();
            }, [end]);
            return <span ref={ref}>{prefix}{val.toLocaleString('fr-FR')}{suffix}</span>;
          };
          const FadeIn = ({children, delay=0}) => {
            const [visible, setVisible] = React.useState(false);
            const ref = React.useRef(null);
            React.useEffect(() => {
              const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
              }, {threshold: 0.15});
              if (ref.current) obs.observe(ref.current);
              return () => obs.disconnect();
            }, []);
            return <div ref={ref} style={{opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(40px)', transition:'all 0.8s cubic-bezier(0.16,1,0.3,1)'}}>{children}</div>;
          };

          return (
          <div style={{background:$bgSub, marginTop:-10}}>

            {/* SECTION 1: HERO */}
            <div style={{minHeight:'65vh', background:'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,184,150,0.08) 0%, transparent 70%)'}}></div>
              <div style={{position:'absolute', bottom:'-15%', left:'-8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,111,71,0.06) 0%, transparent 70%)'}}></div>
              <div style={{position:'relative', zIndex:2, textAlign:'center', padding:'48px 32px', maxWidth:900}}>
                <div style={{fontSize:'5.5rem', marginBottom:20, filter:'drop-shadow(0 3px 16px rgba(139,111,71,0.15))'}}>🐝</div>
                <div style={{fontSize:'5rem', fontWeight:800, color:$text, letterSpacing:'-0.05em', lineHeight:1.05, marginBottom:14}}>
                  Group <span style={{color:$accent}}>OY</span>
                </div>
                <div style={{fontSize:'1.1rem', color:$textMut, fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20}}>Le Grand Rucher</div>
                <div style={{fontSize:'1.05rem', color:$textSec, lineHeight:1.8, maxWidth:520, margin:'0 auto 40px'}}>
                  Un écosystème intégré de services pour le BTP — construction, échafaudage, étanchéité, location et services partagés.
                </div>
                {/* KPIs */}
                <div style={{display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap', marginBottom:40}}>
                  {[{v: `${(totCA/1000000).toFixed(0)}M€`, l:'CA Consolidé'},{v: totEffectif, l:'Collaborateurs'},{v: totFiliales, l:'Filiales'},{v: totChantiers, l:'Chantiers Actifs'}].map((k,i) => (
                    <div key={i} style={{textAlign:'center', minWidth:110}}>
                      <div style={{fontSize:'2.4rem', fontWeight:800, color:$accent}}>{k.v}</div>
                      <div style={{fontSize:'0.8rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4}}>{k.l}</div>
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <button onClick={() => { const el = document.getElementById('section-vision'); if(el) el.scrollIntoView({behavior:'smooth'}); }} style={{padding:'14px 36px', borderRadius:crmRd, border:'none', background:$accent, color:'white', fontWeight:700, fontSize:'0.95rem', cursor:'pointer', transition:'all 0.3s', boxShadow:'0 4px 20px rgba(139,111,71,0.2)'}} onMouseOver={e=>{e.target.style.background='#a68856';e.target.style.transform='translateY(-2px)';}} onMouseOut={e=>{e.target.style.background='#8B6F47';e.target.style.transform='translateY(0)';}}>
                  Découvrir le groupe ↓
                </button>
              </div>
            </div>
            {/* ══════ SECTION 2: VISION & MISSION ══════ */}
            <div id="section-vision" style={{...sectionS, background:$bgCard}}>
              <FadeIn>
                <div style={{textAlign:'center', marginBottom:64}}>
                  <div style={{...titleS, color:$text}}>Notre Vision</div>
                  <div style={{...subtitleS, margin:'16px auto 0'}}>
                    Construire un groupe où chaque collaborateur est acteur de sa réussite, porté par un modèle d'organisation unique inspiré de la ruche.
                  </div>
                </div>
              </FadeIn>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
                {[
                  {icon:'🎯', title:'Performance', desc:'Rémunération liée à la performance réelle, mesurée par l\'EBE de chaque ruche.', color:'#059669'},
                  {icon:'🤝', title:'Autonomie', desc:'Chaque responsable gère sa ruche comme un entrepreneur avec le soutien du groupe.', color:'#2563eb'},
                  {icon:'📈', title:'Croissance', desc:'De 10M€ à 30M€ de CA sur 10 ans, par croissance organique et acquisitions.', color:'#d97706'},
                  {icon:'🐝', title:'Esprit Ruche', desc:'Intelligence collective et services mutualisés via YILMAZ pour chaque filiale.', color:$accent}
                ].map((v, i) => (
                  <FadeIn key={i} delay={i*100}>
                    <div style={{background:$bgCard, borderRadius:crmRd, padding:'32px 28px', border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', height:'100%', transition:'all 0.3s'}} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)';}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.03)';}}>
                      <div style={{width:48, height:48, borderRadius:crmRd, background:`${v.color}10`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', marginBottom:20}}>{v.icon}</div>
                      <div style={{fontSize:'1.05rem', fontWeight:700, color:$text, marginBottom:10}}>{v.title}</div>
                      <div style={{fontSize:'0.95rem', color:$textSec, lineHeight:1.7}}>{v.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* ══════ SECTION 3: CHIFFRES CLÉS ANIMÉS ══════ */}
            <div style={{background:$bgSub, padding:'120px 32px', position:'relative'}}>
              <div style={{maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2}}>
                <FadeIn>
                  <div style={{textAlign:'center', marginBottom:64}}>
                    <div style={{...titleS, color:$text}}>Chiffres Clés</div>
                    <div style={{fontSize:'1rem', color:$textMut, marginTop:12}}>Les indicateurs qui comptent</div>
                  </div>
                </FadeIn>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:20}}>
                  {[
                    {end: Math.round(totCA/1000000*10)/10, suffix:'M€', label:'Chiffre d\'Affaires', icon:'💰', desc:'CA consolidé groupe'},
                    {end: totEffectif, suffix:'', label:'Collaborateurs', icon:'👥', desc:'Effectif total groupe'},
                    {end: totFiliales, suffix:'', label:'Filiales', icon:'🏢', desc:'Entités opérationnelles'},
                    {end: totChantiers, suffix:'', label:'Chantiers en Cours', icon:'🏗️', desc:'Projets actifs'},
                    {end: responsables.length, suffix:'', label:'Responsables', icon:'👑', desc:'Managers de ruches'},
                    {end: 8, suffix:'', label:'Niveaux Ruche', icon:'🐝', desc:'De XXS à XXXL'}
                  ].map((k,i) => (
                    <FadeIn key={i} delay={i*80}>
                      <div style={{background:$bgCard, borderRadius:crmRd, padding:'28px 20px', border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', textAlign:'center', transition:'all 0.3s'}} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)';}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.03)';}}>
                        <div style={{fontSize:'1.5rem', marginBottom:8}}>{k.icon}</div>
                        <div style={{fontSize:'2.4rem', fontWeight:800, color:$accent, lineHeight:1}}><AnimatedCounter end={k.end} suffix={k.suffix} /></div>
                        <div style={{fontSize:'0.88rem', fontWeight:700, color:$text, marginTop:10}}>{k.label}</div>
                        <div style={{fontSize:'0.78rem', color:$textMut, marginTop:4}}>{k.desc}</div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════ SECTION 4: NOS FILIALES ══════ */}
            <div style={{...sectionS, background:$bgCard}}>
              <FadeIn>
                <div style={{textAlign:'center', marginBottom:64}}>
                  <div style={{...titleS, color:$text}}>Nos Filiales</div>
                  <div style={{...subtitleS, margin:'16px auto 0'}}>Un écosystème complet de services pour le BTP et la location</div>
                </div>
              </FadeIn>
              <div style={{display:'flex', flexDirection:'column', gap:24}}>
                {(() => {
                  const allCards = [...filialesOp.map(f => ({type:'filiale', id: String(f.id), data: f})), {type:'yilmaz', id:'yilmaz', data: null}];
                  const filialesRows = (() => {
                    const ids = allCards.map(c => c.id);
                    const layout = Array.isArray(ordreFilialesPresentation) && ordreFilialesPresentation.length > 0 && Array.isArray(ordreFilialesPresentation[0]) ? ordreFilialesPresentation : [];
                    if (layout.length === 0) return [ids];
                    const cleaned = layout.map(row => row.filter(id => ids.includes(id))).filter(r => r.length > 0);
                    const usedIds = cleaned.flat();
                    const missing = ids.filter(id => !usedIds.includes(id));
                    if (missing.length > 0) { if (cleaned.length > 0) cleaned[cleaned.length-1].push(...missing); else cleaned.push(missing); }
                    return cleaned.length > 0 ? cleaned : [ids];
                  })();
                  const saveFLayout = (rows) => setOrdreFilialesPresentation(rows.filter(r => r.length > 0));
                  const renderFilialeCard = (card) => {
                    if (card.type === 'yilmaz') return (
                      <div style={{borderRadius:crmRd, overflow:'hidden', background:$bgCard, border:`1px solid ${$border}`, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', width:'100%', transition:'transform 0.2s, box-shadow 0.2s', pointerEvents:'none', boxSizing:'border-box', display:'flex', flexDirection:'column'}}>
                        <div style={{height: homFilCardSize==='sm'?56:homFilCardSize==='md'?76:100, background:'linear-gradient(135deg, #9e9e9e, #4a4a4a)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                          <span style={{fontSize: homFilCardSize==='sm'?'1.6rem':homFilCardSize==='md'?'2rem':'2.5rem', filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'}}>🏢</span>
                        </div>
                        <div style={{padding: homFilCardSize==='sm'?'10px 14px':homFilCardSize==='md'?'14px 18px':'20px 24px', flex:1, display:'flex', flexDirection:'column'}}>
                          <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.15rem', fontWeight:800, color:$text, marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>YILMAZ</div>
                          {homFilCardSize !== 'sm' && <div style={{fontSize: homFilCardSize==='md'?'0.78rem':'0.88rem', color:$textMut, marginBottom: homFilCardSize==='md'?10:16}}>Services Partagés — Finance, RH, IT, Marketing</div>}
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: homFilCardSize==='sm'?6:10, marginTop:'auto'}}>
                            <div style={{background:$bgSub, borderRadius:crmRd, padding: homFilCardSize==='sm'?'5px 8px':'8px 12px'}}>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.55rem':homFilCardSize==='md'?'0.65rem':'0.72rem', color:$textMut, fontWeight:600}}>Services</div>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.05rem', fontWeight:800, color:$text}}>4</div>
                            </div>
                            <div style={{background:$bgSub, borderRadius:crmRd, padding: homFilCardSize==='sm'?'5px 8px':'8px 12px'}}>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.55rem':homFilCardSize==='md'?'0.65rem':'0.72rem', color:$textMut, fontWeight:600}}>Effectif</div>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.05rem', fontWeight:800, color:$text}}>{employes.filter(e => !e.filialeId).length}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    const f = card.data;
                    const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                    const kpi = getKpiFiliale(f);
                    return (
                      <div style={{borderRadius:crmRd, overflow:'hidden', background:$bgCard, border:`1px solid ${$border}`, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', width:'100%', transition:'transform 0.2s, box-shadow 0.2s', pointerEvents:'none', boxSizing:'border-box', display:'flex', flexDirection:'column'}}>
                        <div style={{height: homFilCardSize==='sm'?56:homFilCardSize==='md'?76:100, background:`linear-gradient(135deg, ${g[0]}, ${g[1]})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                          <span style={{fontSize: homFilCardSize==='sm'?'1.6rem':homFilCardSize==='md'?'2rem':'2.5rem', filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'}}>{f.icon}</span>
                        </div>
                        <div style={{padding: homFilCardSize==='sm'?'10px 14px':homFilCardSize==='md'?'14px 18px':'20px 24px', flex:1, display:'flex', flexDirection:'column'}}>
                          <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.15rem', fontWeight:800, color:$text, marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.nom}</div>
                          {homFilCardSize !== 'sm' && <div style={{fontSize: homFilCardSize==='md'?'0.78rem':'0.88rem', color:$textMut, marginBottom: homFilCardSize==='md'?10:16}}>{f.activite}</div>}
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: homFilCardSize==='sm'?6:10, marginTop:'auto'}}>
                            <div style={{background:$bgSub, borderRadius:crmRd, padding: homFilCardSize==='sm'?'5px 8px':'8px 12px'}}>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.55rem':homFilCardSize==='md'?'0.65rem':'0.72rem', color:$textMut, fontWeight:600}}>CA</div>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.05rem', fontWeight:800, color:g[1]}}>{kpi.ca >= 1000000 ? `${(kpi.ca/1000000).toFixed(1)}M€` : `${(kpi.ca/1000).toFixed(0)}k€`}</div>
                            </div>
                            <div style={{background:$bgSub, borderRadius:crmRd, padding: homFilCardSize==='sm'?'5px 8px':'8px 12px'}}>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.55rem':homFilCardSize==='md'?'0.65rem':'0.72rem', color:$textMut, fontWeight:600}}>Effectif</div>
                              <div style={{fontSize: homFilCardSize==='sm'?'0.75rem':homFilCardSize==='md'?'0.9rem':'1.05rem', fontWeight:800, color:g[1]}}>{employes.filter(e => e.filialeId === f.id).length}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  };
                  return (<>
                    {filialesRows.map((row, rowIdx) => (
                      <div key={rowIdx}
                        onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                        onDrop={e => {
                          e.preventDefault();
                          const fromId = filialeDragRef.current;
                          if (!fromId) return;
                          const rows = filialesRows.map(r => [...r]);
                          let alreadyInRow = rows[rowIdx] && rows[rowIdx].includes(fromId);
                          if (alreadyInRow) return;
                          rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                          if (rows[rowIdx]) rows[rowIdx].push(fromId); else rows.push([fromId]);
                          saveFLayout(rows);
                          filialeDragRef.current = null;
                        }}
                        style={{display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', alignItems:'stretch', minHeight:60, padding:4, borderRadius:crmRd, border:'2px dashed transparent', transition:'border-color 0.2s'}}
                        onDragEnter={e => { e.preventDefault(); e.currentTarget.style.borderColor='#d5cfc5'; }}
                        onDragLeave={e => { if (e.currentTarget.contains(e.relatedTarget)) return; e.currentTarget.style.borderColor='transparent'; }}>
                        {row.map(id => allCards.find(c => c.id === id)).filter(Boolean).map(card => (
                          <div key={card.id}
                            draggable
                            onDragStart={e => { filialeDragRef.current = card.id; e.dataTransfer.effectAllowed = 'move'; }}
                            onDragOver={e => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = 'move'; }}
                            onDrop={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              const fromId = filialeDragRef.current;
                              if (!fromId || fromId === card.id) return;
                              const rows = filialesRows.map(r => [...r]);
                              rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                              const tRow = rows[rowIdx];
                              if (tRow) { const tIdx = tRow.indexOf(card.id); tRow.splice(tIdx === -1 ? tRow.length : tIdx, 0, fromId); }
                              saveFLayout(rows);
                              filialeDragRef.current = null;
                            }}
                            onClick={() => {
                              if (!isLoggedIn) { setShowLoginModal(true); return; }
                              if (card.type === 'yilmaz') { setNavEntreprise('yilmaz'); setNavService(null); setOngletActif('dashboard'); return; }
                              const f = card.data;
                              const keyMap = {}; filialesDynamiques.forEach(fi => { if(fi.nom==='Ezel Bâtiment')keyMap[fi.id]='ezel'; else if(fi.nom==='La Roulotte')keyMap[fi.id]='roulotte'; else if(fi.nom==="L'Échafaudage")keyMap[fi.id]='echafaudage'; else if(fi.nom==="L'Étanchéité")keyMap[fi.id]='etancheite'; });
                              const ek = keyMap[f.id]; if(ek){setNavEntreprise(ek); setNavService(null); setOngletActif('dashboard'); setDashboardFiliale(f.id);}
                            }}
                            onMouseOver={e => { e.currentTarget.firstChild.style.transform='translateY(-8px)'; e.currentTarget.firstChild.style.boxShadow='0 16px 48px rgba(0,0,0,0.12)'; }}
                            onMouseOut={e => { e.currentTarget.firstChild.style.transform='translateY(0)'; e.currentTarget.firstChild.style.boxShadow='0 4px 24px rgba(0,0,0,0.04)'; }}
                            style={{cursor:'grab', userSelect:'none', flex:'1 1 0', minWidth:0, display:'flex'}}
                          >
                            {renderFilialeCard(card)}
                          </div>
                        ))}
                      </div>
                    ))}
                    <div
                      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                      onDrop={e => {
                        e.preventDefault();
                        const fromId = filialeDragRef.current;
                        if (!fromId) return;
                        const rows = filialesRows.map(r => [...r]);
                        rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                        rows.push([fromId]);
                        saveFLayout(rows);
                        filialeDragRef.current = null;
                      }}
                      style={{minHeight:60, borderRadius:crmRd, border:'2px dashed #e0d9cf', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', background:'#faf8f508'}}
                      onDragEnter={e => { e.preventDefault(); e.currentTarget.style.borderColor='#c9b896'; e.currentTarget.style.background='#f5f0e830'; }}
                      onDragLeave={e => { if (e.currentTarget.contains(e.relatedTarget)) return; e.currentTarget.style.borderColor='#e0d9cf'; e.currentTarget.style.background='#faf8f508'; }}>
                      <span style={{fontSize:'0.85rem', color:'#c9b896', fontWeight:600, pointerEvents:'none'}}>⊕ Glisser ici pour créer une nouvelle ligne</span>
                    </div>
                  </>);
                })()}
              </div>
            </div>

            {/* ══════ SECTION 5: STRUCTURE DU GROUPE ══════ */}
            <div style={{background:$bgSub, padding:'120px 32px'}}>
              <div style={{maxWidth:1100, margin:'0 auto'}}>
                <FadeIn>
                  <div style={{textAlign:'center', marginBottom:64}}>
                    <div style={{...titleS, color:$text}}>Structure du Group</div>
                    <div style={{...subtitleS, margin:'16px auto 0'}}>Une architecture juridique optimisée pour la croissance</div>
                  </div>
                </FadeIn>
                <FadeIn delay={200}>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {/* GROUP OY */}
                    <div style={{background:'linear-gradient(135deg, #8B6F47, #c9b896)', borderRadius:crmRd, padding:'24px 40px', textAlign:'center', color:'white', boxShadow:'0 8px 32px rgba(139,111,71,0.3)', zIndex:2}}>
                      <div style={{fontSize:'2rem', lineHeight:1}}>⬡</div>
                      <div style={{fontSize:'1.3rem', fontWeight:900}}>GROUP OY</div>
                      <div style={{fontSize:'0.85rem', opacity:0.7}}>Holding mère</div>
                    </div>
                    <div style={{width:3, height:40, background:'#d5cfc5'}}></div>

                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', width:'100%', maxWidth:1100, position:'relative'}}>
                      <div style={{position:'absolute', top:0, left:'16.66%', right:'16.66%', height:3, background:'#d5cfc5'}}></div>

                      {/* COL 1: INVEST EXE */}
                      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{width:3, height:30, background:'#d5cfc5'}}></div>
                        <div style={{background:$bgCard, borderRadius:crmRd, padding:'16px 24px', textAlign:'center', border:'2px solid #f0ebe3', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', width:170, zIndex:2}}>
                          <div style={{fontSize:'1.4rem', lineHeight:1.2}}>⬡</div>
                          <div style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>INVEST EXE</div>
                          <div style={{fontSize:'0.75rem', color:$textMut}}>Holding Exécution</div>
                        </div>
                        <div style={{width:2, height:24, background:'#d5cfc5'}}></div>
                        <div style={{position:'relative', width:'100%', maxWidth:340}}>
                          <div style={{position:'absolute', top:0, left:70, right:70, height:2, background:'#d5cfc5'}}></div>
                          <div style={{display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap'}}>
                            {filialesDynamiques.filter(f => f.holding === 'INVEST EXE').map((f, fi) => {
                              const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                              return (
                                <div key={fi} style={{display:'flex', flexDirection:'column', alignItems:'center', minWidth:120, maxWidth:150}}>
                                  <div style={{width:2, height:16, background:'#d5cfc5'}}></div>
                                  <div style={{background:`linear-gradient(135deg, ${g[0]}30, ${g[1]}15)`, borderRadius:crmRd, padding:'12px 16px', textAlign:'center', border:`1.5px solid ${g[1]}30`, width:130}}>
                                    <div style={{fontSize:'1.2rem'}}>{f.icon}</div>
                                    <div style={{fontSize:'0.88rem', fontWeight:700, color:g[1]}}>{f.nom}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* COL 2: INVEST LOC */}
                      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{width:3, height:30, background:'#d5cfc5'}}></div>
                        <div style={{background:$bgCard, borderRadius:crmRd, padding:'16px 24px', textAlign:'center', border:'2px solid #f0ebe3', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', width:170, zIndex:2}}>
                          <div style={{fontSize:'1.4rem', lineHeight:1.2}}>⬡</div>
                          <div style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>INVEST LOC</div>
                          <div style={{fontSize:'0.75rem', color:$textMut}}>Holding Location</div>
                        </div>
                        <div style={{width:2, height:24, background:'#d5cfc5'}}></div>
                        <div style={{position:'relative', width:'100%', maxWidth:340}}>
                          <div style={{position:'absolute', top:0, left:70, right:70, height:2, background:'#d5cfc5'}}></div>
                          <div style={{display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap'}}>
                            {filialesDynamiques.filter(f => f.holding === 'INVEST LOC').map((f, fi) => {
                              const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                              return (
                                <div key={fi} style={{display:'flex', flexDirection:'column', alignItems:'center', minWidth:120, maxWidth:150}}>
                                  <div style={{width:2, height:16, background:'#d5cfc5'}}></div>
                                  <div style={{background:`linear-gradient(135deg, ${g[0]}30, ${g[1]}15)`, borderRadius:crmRd, padding:'12px 16px', textAlign:'center', border:`1.5px solid ${g[1]}30`, width:130}}>
                                    <div style={{fontSize:'1.2rem'}}>{f.icon}</div>
                                    <div style={{fontSize:'0.88rem', fontWeight:700, color:g[1]}}>{f.nom}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* COL 3: YILMAZ */}
                      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{width:3, height:30, background:'#d5cfc5'}}></div>
                        <div style={{background:$bgCard, borderRadius:crmRd, padding:'16px 24px', textAlign:'center', border:'2px solid #f0ebe3', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', width:170, zIndex:2}}>
                          <div style={{fontSize:'1.4rem', lineHeight:1.2}}>⬡</div>
                          <div style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>YILMAZ</div>
                          <div style={{fontSize:'0.75rem', color:$textMut}}>Services Partagés</div>
                        </div>
                      </div>

                      {/* COL 4: SCI & AUTRES (direct GROUP OY) */}
                      {filialesDynamiques.filter(f => f.holding === 'GROUP OY' && !['INVEST LOC','INVEST EXE'].includes(f.nom)).map((f, fi) => (
                        <div key={'oy'+fi} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                          <div style={{width:3, height:30, background:'#d5cfc5'}}></div>
                          <div style={{background:$bgCard, borderRadius:crmRd, padding:'16px 24px', textAlign:'center', border:'1.5px solid rgba(201,162,39,0.35)'}}>
                            <div style={{fontSize:'1.4rem', lineHeight:1.2}}>⬡</div>
                            <div style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>{f.nom}</div>
                            <div style={{fontSize:'0.72rem', color:$textMut}}>{f.activite && f.activite.split('—')[0]}</div>
                            {f.siren && <div style={{fontSize:'0.62rem', color:$textMut, opacity:0.7, marginTop:2}}>SIREN {f.siren}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* ══════ SECTION 6: MODÈLE RUCHES ══════ */}
            <div style={{background:$bgCard, padding:'120px 32px'}}>
              <div style={{maxWidth:1100, margin:'0 auto'}}>
                <FadeIn>
                  <div style={{textAlign:'center', marginBottom:64}}>
                    <div style={{...titleS, color:$text}}>Le Modèle des Ruches</div>
                    <div style={{...subtitleS, margin:'16px auto 0'}}>8 niveaux d'évolution, de l'apprenti au dirigeant — chaque ruche est autonome avec ses objectifs</div>
                  </div>
                </FadeIn>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16}}>
                  {niveauxData.map((n, i) => {
                    const empsNiv = employes.filter(e => e.niveau === n.niv);
                    return (
                      <FadeIn key={i} delay={i*80}>
                        <div style={{background:$bgCard, borderRadius:crmRd, overflow:'hidden', border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.04)'}}>
                          <div style={{height:6, background:`linear-gradient(90deg, ${n.color}, ${n.color}88)`}}></div>
                          <div style={{padding:'20px 18px'}}>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
                              <div style={{display:'flex', alignItems:'center', gap:10}}>
                                <span style={{fontSize:'1.5rem'}}>{n.emoji}</span>
                                <div>
                                  <div style={{fontSize:'1.1rem', fontWeight:900, color:n.color}}>{n.niv}</div>
                                  <div style={{fontSize:'0.85rem', fontWeight:600, color:$textSec}}>{n.label}</div>
                                </div>
                              </div>
                              <div style={{background:`${n.color}15`, borderRadius:crmRd, padding:'4px 10px', fontSize:'0.8rem', fontWeight:700, color:n.color}}>{n.ca}</div>
                            </div>
                            <div style={{display:'flex', alignItems:'center', gap:8}}>
                              <div style={{flex:1, height:4, borderRadius:2, background:$bgSub}}>
                                <div style={{height:'100%', borderRadius:2, background:n.color, width:`${Math.min(empsNiv.length / Math.max(totEffectif, 1) * 100 * 8, 100)}%`}}></div>
                              </div>
                              <span style={{fontSize:'0.82rem', fontWeight:700, color:$text}}>{empsNiv.length} collab{empsNiv.length>1?'s':''}</span>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ══════ SECTION 7: PERFORMANCE ══════ */}
            <div style={{background:$bgSub, padding:'120px 32px'}}>
              <div style={{maxWidth:1100, margin:'0 auto'}}>
                <FadeIn>
                  <div style={{textAlign:'center', marginBottom:64}}>
                    <div style={{...titleS, color:$text}}>Performance du Group</div>
                    <div style={{...subtitleS, margin:'16px auto 0'}}>Répartition du chiffre d'affaires et analyse des marges</div>
                  </div>
                </FadeIn>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:28}}>
                  <FadeIn delay={100}>
                    <div style={{background:$bgCard, borderRadius:crmRd, padding:32, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                      <div style={{fontSize:'0.95rem', fontWeight:700, color:$text, marginBottom:24}}>📊 Répartition CA par filiale</div>
                      {allKpis.filter(f => f.kpi.ca > 0).map((f, i) => {
                        const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                        const pct = totCA > 0 ? (f.kpi.ca / totCA * 100) : 0;
                        return (
                          <div key={i} style={{marginBottom:16}}>
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                              <span style={{fontSize:'0.92rem', fontWeight:700, color:$text}}>{f.icon} {f.nom}</span>
                              <span style={{fontSize:'0.92rem', fontWeight:800, color:g[1]}}>{(f.kpi.ca/1000000).toFixed(1)}M€ ({pct.toFixed(0)}%)</span>
                            </div>
                            <div style={{height:10, borderRadius:crmRd, background:$bgSub, overflow:'hidden'}}>
                              <div style={{height:'100%', borderRadius:crmRd, background:`linear-gradient(90deg, ${g[0]}, ${g[1]})`, width:`${pct}%`, transition:'width 1.5s ease'}}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FadeIn>
                  <FadeIn delay={250}>
                    <div style={{background:$bgCard, borderRadius:crmRd, padding:32, border:`1px solid ${$border}`, boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                      <div style={{fontSize:'0.95rem', fontWeight:700, color:$text, marginBottom:24}}>📈 Marges par filiale</div>
                      {allKpis.filter(f => f.kpi.ca > 0).map((f, i) => {
                        const g = gradMap[f.nom] || ['#c9b896','#8B6F47'];
                        return (
                          <div key={i} style={{display:'flex', alignItems:'center', gap:16, marginBottom:18, background:$bgCard, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                            <span style={{fontSize:'1.3rem'}}>{f.icon}</span>
                            <div style={{flex:1}}>
                              <div style={{fontSize:'0.9rem', fontWeight:700, color:$text}}>{f.nom}</div>
                              <div style={{display:'flex', gap:16, marginTop:4}}>
                                <span style={{fontSize:'0.82rem', color:'#059669', fontWeight:700}}>MB {f.kpi.margeBrutePct.toFixed(0)}%</span>
                                <span style={{fontSize:'0.82rem', color:'#2563eb', fontWeight:700}}>EBE {f.kpi.ebePct.toFixed(0)}%</span>
                                <span style={{fontSize:'0.82rem', color: f.kpi.resultatNet >= 0 ? '#059669':'#dc2626', fontWeight:700}}>RN {(f.kpi.resultatNet/1000).toFixed(0)}k€</span>
                              </div>
                            </div>
                            <div style={{width:48, height:48, borderRadius:'50%', background:`conic-gradient(${g[1]} ${f.kpi.margeBrutePct*3.6}deg, #f0ebe3 0)`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <div style={{width:36, height:36, borderRadius:'50%', background:$bgCard, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:900, color:g[1]}}>{f.kpi.margeBrutePct.toFixed(0)}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>

            {/* ══════ SECTION 8: ÉQUIPE DIRIGEANTE ══════ */}
            <div style={{background:$bgCard, padding:'120px 32px'}}>
              <div style={{maxWidth:1100, margin:'0 auto'}}>
                <FadeIn>
                  <div style={{textAlign:'center', marginBottom:64}}>
                    <div style={{...titleS, color:$text}}>Équipe Dirigeante</div>
                    <div style={{...subtitleS, margin:'16px auto 0'}}>Les pilotes du Grand Rucher</div>
                  </div>
                </FadeIn>
                {(() => {
                  const saveDLayout = (rows) => setOrdreDirigeants(rows.filter(r => r.length > 0));
                  const renderCard = (emp) => {
                    const fil = filialesDynamiques.find(f => f.id === emp.filialeId || String(f.id) === String(emp.filialeId));
                    const oyGrad = ['#c9b896','#8B6F47'];
                    const yilmazGrad = ['#9e9e9e','#4a4a4a'];
                    const serviceColorMap = {'EZEL':['#85C1E9','#007ab5'],'ECH':['#C39BD3','#6C3483'],'ROU':['#F5D78E','#C49A2A'],'ETAN':['#82E0AA','#0e6655']};
                    const isDirectionOY = emp.niveau === 'XXXL';
                    const g = isDirectionOY ? oyGrad : fil ? (gradMap[fil.nom] || yilmazGrad) : (serviceColorMap[emp.service] || yilmazGrad);
                    const filLabel = isDirectionOY ? '🐝 Group OY' : fil ? `${fil.icon} ${fil.nom}` : emp.service === 'EZEL' ? '🏢 Ezel Bâtiment' : emp.service === 'ECH' ? '⚙️ L\'Échafaudage' : emp.service === 'ROU' ? '🚛 La Roulotte' : emp.service === 'ETAN' ? '💧 L\'Étanchéité' : '🏢 YILMAZ';
                    const initials = `${(emp.prenom||'')[0]||''}${(emp.nom||'')[0]||''}`;
                    return (
                      <div style={{background:$bgCard, borderRadius:crmRd, overflow:'hidden', border:`1px solid ${$border}`, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', textAlign:'center', width:'100%', pointerEvents:'none'}}>
                        <div style={{height:80, background:`linear-gradient(135deg, ${g[0]}, ${g[1]})`, position:'relative'}}>
                          <div style={{position:'absolute', bottom:-28, left:'50%', transform:'translateX(-50%)', width:56, height:56, borderRadius:'50%', background:$bgCard, border:`3px solid ${g[1]}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', fontWeight:900, color:g[1], boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
                            {initials}
                          </div>
                        </div>
                        <div style={{padding:'36px 16px 20px'}}>
                          <div style={{fontSize:'0.95rem', fontWeight:800, color:$text}}>{emp.prenom} {emp.nom}</div>
                          <div style={{fontSize:'0.88rem', color:$textSec, marginTop:4}}>{emp.posteExterne}</div>
                          <div style={{display:'inline-flex', alignItems:'center', gap:4, background:`${g[1]}12`, borderRadius:crmRd, padding:'3px 10px', marginTop:10}}>
                            <span style={{fontSize:'0.75rem', fontWeight:800, color:g[1]}}>{emp.niveau}</span>
                            <span style={{fontSize:'0.75rem', color:$textMut}}>•</span>
                            <span style={{fontSize:'0.75rem', color:g[1]}}>{emp.posteInterne}</span>
                          </div>
                          <div style={{fontSize:'0.78rem', color:$textMut, marginTop:8}}>{filLabel}</div>
                        </div>
                      </div>
                    );
                  };
                  return (<div style={{display:'flex', flexDirection:'column', gap:20}}>
                    {dirigeantsRows.map((row, rowIdx) => (
                      <div key={rowIdx}
                        onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                        onDrop={e => {
                          e.preventDefault();
                          const fromId = dirigeantDragRef.current;
                          if (!fromId) return;
                          setOrdreDirigeants(prev => {
                            const rows = (Array.isArray(prev[0]) ? prev : [prev]).map(r => [...r]);
                            if (rows[rowIdx] && rows[rowIdx].includes(fromId)) return prev;
                            rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                            if (rows[rowIdx]) rows[rowIdx].push(fromId); else rows.push([fromId]);
                            return rows.filter(r => r.length > 0);
                          });
                          dirigeantDragRef.current = null;
                        }}
                        style={{display:'flex', flexWrap:'wrap', gap:20, justifyContent:'center', minHeight:60, padding:12, borderRadius:crmRd, border:'2px dashed transparent', transition:'border-color 0.2s'}}
                        onDragEnter={e => { e.preventDefault(); e.currentTarget.style.borderColor='#d5cfc5'; }}
                        onDragLeave={e => { if (e.currentTarget.contains(e.relatedTarget)) return; e.currentTarget.style.borderColor='transparent'; }}>
                        {row.map(emp => (
                          <div key={emp.id}
                            draggable
                            onDragStart={e => { dirigeantDragRef.current = emp.id; e.dataTransfer.effectAllowed = 'move'; }}
                            onDragOver={e => { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = 'move'; }}
                            onDrop={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              const fromId = dirigeantDragRef.current;
                              if (!fromId || fromId === emp.id) return;
                              setOrdreDirigeants(prev => {
                                const rows = (Array.isArray(prev[0]) ? prev : [prev]).map(r => [...r]);
                                rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                                const tRow = rows[rowIdx];
                                if (tRow) { const tIdx = tRow.indexOf(emp.id); tRow.splice(tIdx === -1 ? tRow.length : tIdx, 0, fromId); }
                                return rows.filter(r => r.length > 0);
                              });
                              dirigeantDragRef.current = null;
                            }}
                            style={{cursor:'grab', userSelect:'none', width:210, maxWidth:210, flexShrink:0, flexGrow:0}}
                          >
                            {renderCard(emp)}
                          </div>
                        ))}
                      </div>
                    ))}
                    <div
                      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                      onDrop={e => {
                        e.preventDefault();
                        const fromId = dirigeantDragRef.current;
                        if (!fromId) return;
                        setOrdreDirigeants(prev => {
                          const rows = (Array.isArray(prev[0]) ? prev : [prev]).map(r => [...r]);
                          rows.forEach(r => { const idx = r.indexOf(fromId); if (idx !== -1) r.splice(idx, 1); });
                          rows.push([fromId]);
                          return rows.filter(r => r.length > 0);
                        });
                        dirigeantDragRef.current = null;
                      }}
                      style={{minHeight:60, borderRadius:crmRd, border:'2px dashed #e0d9cf', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', background:'#faf8f508'}}
                      onDragEnter={e => { e.preventDefault(); e.currentTarget.style.borderColor='#c9b896'; e.currentTarget.style.background='#f5f0e830'; }}
                      onDragLeave={e => { if (e.currentTarget.contains(e.relatedTarget)) return; e.currentTarget.style.borderColor='#e0d9cf'; e.currentTarget.style.background='#faf8f508'; }}>
                      <span style={{fontSize:'0.85rem', color:'#c9b896', fontWeight:600, pointerEvents:'none'}}>⊕ Glisser ici pour créer une nouvelle ligne</span>
                    </div>
                  </div>);
                })()}
              </div>
            </div>
            {/* ══════ SECTION 9: RÉFÉRENCES ══════ */}
            <div style={{background:$bgSub, padding:'100px 32px'}}>
              <div style={{maxWidth:1100, margin:'0 auto', textAlign:'center'}}>
                <FadeIn>
                  <div style={{fontSize:'0.85rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:32}}>Ils nous font confiance</div>
                  <div style={{display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap'}}>
                    {['Ville de Paris','Nexity','Bouygues Immobilier','Eiffage','Vinci','Altarea','Kaufman & Broad','Icade','Paris Habitat','RIVP','Mairie de Villejuif','Klépierre','EPRND','Île-de-France Mobilités'].map((c,i) => (
                      <div key={i} style={{fontSize:'0.95rem', fontWeight:600, color:'#c5b9a8', letterSpacing:'0.02em'}}>{c}</div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* ══════ SECTION 10: CTA / FOOTER ══════ */}
            <div style={{background:$bgSub, padding:'100px 32px 60px', textAlign:'center'}}>
              <FadeIn>
                <div style={{fontSize:'2.5rem', marginBottom:20}}>🐝</div>
                <div style={{fontSize:'2.2rem', fontWeight:800, color:$text, marginBottom:12, letterSpacing:'-0.03em'}}>Rejoignez le Grand Rucher</div>
                <div style={{fontSize:'1rem', color:$textSec, maxWidth:500, margin:'0 auto 40px', lineHeight:1.7}}>
                  Un groupe en pleine croissance, des opportunités uniques, un modèle innovant.
                </div>
                <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap'}}>
                  <button onClick={() => { if (!isLoggedIn) { setShowLoginModal(true); return; } setOngletActif('collaborateurs'); setNavEntreprise('yilmaz'); setNavService('rh'); setDashboardFiliale('yilmaz'); }} style={{padding:'14px 36px', borderRadius:crmRd, border:'none', background:$accent, color:'white', fontWeight:700, fontSize:'0.95rem', cursor:'pointer', transition:'all 0.3s', boxShadow:'0 4px 20px rgba(139,111,71,0.15)'}} onMouseOver={e=>e.target.style.background='#a68856'} onMouseOut={e=>e.target.style.background='#8B6F47'}>{isLoggedIn ? '👥 Voir nos équipes' : '🔐 Se connecter'}</button>
                  <button onClick={() => { if (!isLoggedIn) setShowLoginModal(true); }} style={{padding:'14px 36px', borderRadius:crmRd, border:'1.5px solid #c9b896', background:'transparent', color:$accent, fontWeight:600, fontSize:'0.95rem', cursor:'pointer', transition:'all 0.3s'}} onMouseOver={e=>{e.target.style.background='#8B6F47';e.target.style.color='white';e.target.style.borderColor='#8B6F47';}} onMouseOut={e=>{e.target.style.background='transparent';e.target.style.color='#8B6F47';e.target.style.borderColor='#c9b896';}}>📧 Nous contacter</button>
                </div>
                <div style={{marginTop:80, paddingTop:32, borderTop:'1px solid #e0d5c5', fontSize:'0.82rem', color:$textMut}}>
                  © {new Date().getFullYear()} Group OY — Le Grand Rucher • Tous droits réservés
                </div>
              </FadeIn>
            </div>

          </div>
          );
}
