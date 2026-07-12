// === Onglet « postes » — extrait de App.jsx (modularisation, forme frag) ===


export default function TabPostes(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $shadow, $text, $textMut, $textSec, $warn, POSTE_BESOIN_TYPES, POSTE_CONTRAT_TYPES, POSTE_OB_TYPES, POSTE_SOUS_MOTIFS, POSTE_STATUTS, POSTE_URGENCES, canEdit, collaborateurs, crmRd, currentUser, employes, filialesDynamiques, niveau, posteBesoinFilter, posteContratFilter, posteEditData, posteEditMode, posteFilterOpen, posteFiltreFiliale, posteFiltreStatut, posteSelectionne, posteUrgenceFilter, posteVisibleCols, postes, setCollabDetailTab, setCollabOngletId, setConfirmDelete, setOngletActif, setPosteBesoinFilter, setPosteContratFilter, setPosteEditData, setPosteEditMode, setPosteFilterOpen, setPosteFiltreFiliale, setPosteFiltreStatut, setPosteSelectionne, setPosteUrgenceFilter, setPosteVisibleCols, setPostes, setRecruEdit, setRecruNewMode } = __props;
  return (
        <>
          {!posteSelectionne ? (<>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:`linear-gradient(90deg,${$accent} 0%,${$accent}80 100%)`}}/>
              <div style={{padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:10,background:$accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>💼</div>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                      <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Référentiel des Postes</h2>
                      {postes.filter(p=>p.statut==='ouvert'||p.statut==='recrutement').length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:$accent+'15',color:$accent,fontWeight:700,border:`1px solid ${$accent}30`}}>{postes.filter(p=>p.statut==='ouvert'||p.statut==='recrutement').length} ouvert{postes.filter(p=>p.statut==='ouvert'||p.statut==='recrutement').length>1?'s':''}</span>}
                    </div>
                    <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Fiches de poste · GPEC · {postes.length} postes au total</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
              <div style={{fontSize:'0.82rem', color:$textMut}}></div>
              {canEdit('postes') && <button onClick={() => { const newId = 'P' + String(Date.now()).slice(-6); setPostes(prev => [...prev, {id: newId, titre: '', titreRuche: '', niveau: 'S', filialeId: 'yilmaz', service: '', statut: 'ouvert', titulaire: null, besoinType:'creation', sousMotif:null, urgence:'1_3_mois', typeContrat:'cdi', dateBesoin:new Date().toISOString().slice(0,10), justification:'', budgetCharge:null, onboardingType:'ouvrier_btp', salaireMin: 30000, salaireMax: 40000, primeMin: 2000, primeMax: 5000, variableMin: 0, variableMax: 5000, fichePoste: '', missions: '', competences: '', ficheAnnonce: '', historique:[{date:new Date().toISOString().slice(0,10),action:'Poste créé',par:currentUser?.prenom||''}]}]); setPosteSelectionne(newId); setPosteEditMode(true); setPosteEditData({id: newId, titre: '', titreRuche: '', niveau: 'S', filialeId: 'yilmaz', service: '', statut: 'ouvert', titulaire: null, besoinType:'creation', sousMotif:null, urgence:'1_3_mois', typeContrat:'cdi', dateBesoin:new Date().toISOString().slice(0,10), justification:'', budgetCharge:null, onboardingType:'ouvrier_btp', salaireMin: 30000, salaireMax: 40000, primeMin: 2000, primeMax: 5000, variableMin: 0, variableMax: 5000, fichePoste: '', missions: '', competences: '', ficheAnnonce: '', historique:[]}); }} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}} onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}>+ Nouveau Poste</button>}
            </div>
            {/* View toggle + Filtres */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <input value={''} placeholder="Rechercher un poste..." style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',width:200}} onChange={e=>{/* TODO: search */}}/>
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setPosteFilterOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${posteFilterOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:posteFilterOpen?$accentSub:'transparent',color:posteFilterOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ⚙ Filtres & Colonnes {(posteFiltreFiliale!=='all'||posteFiltreStatut!=='all'||posteBesoinFilter!=='all'||posteUrgenceFilter!=='all'||posteContratFilter!=='all')&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {posteFiltreStatut!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:(POSTE_STATUTS.find(s=>s.id===posteFiltreStatut)||{color:$accent}).color+'18',color:(POSTE_STATUTS.find(s=>s.id===posteFiltreStatut)||{color:$accent}).color,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setPosteFiltreStatut('all')}>✕ {(POSTE_STATUTS.find(s=>s.id===posteFiltreStatut)||{}).label||''}</span>}
                {posteFiltreFiliale!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setPosteFiltreFiliale('all')}>✕ Filiale</span>}
                {posteBesoinFilter!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:(POSTE_BESOIN_TYPES.find(b=>b.id===posteBesoinFilter)||{color:$accent}).color+'18',color:(POSTE_BESOIN_TYPES.find(b=>b.id===posteBesoinFilter)||{color:$accent}).color,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setPosteBesoinFilter('all')}>✕ {(POSTE_BESOIN_TYPES.find(b=>b.id===posteBesoinFilter)||{}).label||''}</span>}
                {posteUrgenceFilter!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:(POSTE_URGENCES.find(u=>u.id===posteUrgenceFilter)||{color:$accent}).color+'18',color:(POSTE_URGENCES.find(u=>u.id===posteUrgenceFilter)||{color:$accent}).color,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setPosteUrgenceFilter('all')}>✕ {(POSTE_URGENCES.find(u=>u.id===posteUrgenceFilter)||{}).label||''}</span>}
                {posteContratFilter!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setPosteContratFilter('all')}>✕ {(POSTE_CONTRAT_TYPES.find(c2=>c2.id===posteContratFilter)||{}).label||''}</span>}
              </div>
            </div>
            {/* ⚙ Filtres & Colonnes Panel */}
            {posteFilterOpen&&<><div onClick={()=>setPosteFilterOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:340,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par statut</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setPosteFiltreStatut('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteFiltreStatut==='all'?$accent:$border}`,background:posteFiltreStatut==='all'?$accent+'15':'transparent',color:posteFiltreStatut==='all'?$accent:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tous</button>
                  {POSTE_STATUTS.map(s=><button key={s.id} onClick={()=>setPosteFiltreStatut(s.id)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteFiltreStatut===s.id?s.color:$border}`,background:posteFiltreStatut===s.id?s.color+'15':'transparent',color:posteFiltreStatut===s.id?s.color:$textSec,fontSize:'0.7rem',fontWeight:posteFiltreStatut===s.id?600:400,cursor:'pointer',fontFamily:'inherit'}}>{s.icon} {s.label}</button>)}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setPosteFiltreFiliale('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteFiltreFiliale==='all'?$accent:$border}`,background:posteFiltreFiliale==='all'?$accent+'15':'transparent',color:posteFiltreFiliale==='all'?$accent:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Toutes</button>
                  <button onClick={()=>setPosteFiltreFiliale('dir')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteFiltreFiliale==='dir'?$accent:$border}`,background:posteFiltreFiliale==='dir'?$accent+'15':'transparent',color:posteFiltreFiliale==='dir'?$accent:$textSec,fontSize:'0.7rem',fontWeight:400,cursor:'pointer',fontFamily:'inherit'}}>🏛️ Direction</button>
                  {filialesDynamiques.filter(f=>f.holding!=='GROUP OY').map(f=><button key={f.id} onClick={()=>setPosteFiltreFiliale(String(f.id))} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteFiltreFiliale===String(f.id)?f.couleur||$accent:$border}`,background:posteFiltreFiliale===String(f.id)?(f.couleur||$accent)+'15':'transparent',color:posteFiltreFiliale===String(f.id)?f.couleur||$accent:$textSec,fontSize:'0.7rem',fontWeight:posteFiltreFiliale===String(f.id)?600:400,cursor:'pointer',fontFamily:'inherit'}}>{f.icon} {f.nom}</button>)}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par type de besoin</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setPosteBesoinFilter('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteBesoinFilter==='all'?$accent:$border}`,background:posteBesoinFilter==='all'?$accent+'15':'transparent',color:posteBesoinFilter==='all'?$accent:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tous</button>
                  {POSTE_BESOIN_TYPES.map(b=><button key={b.id} onClick={()=>setPosteBesoinFilter(b.id)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteBesoinFilter===b.id?b.color:$border}`,background:posteBesoinFilter===b.id?b.color+'15':'transparent',color:posteBesoinFilter===b.id?b.color:$textSec,fontSize:'0.7rem',fontWeight:posteBesoinFilter===b.id?600:400,cursor:'pointer',fontFamily:'inherit'}}>{b.label}</button>)}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par urgence</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setPosteUrgenceFilter('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteUrgenceFilter==='all'?$accent:$border}`,background:posteUrgenceFilter==='all'?$accent+'15':'transparent',color:posteUrgenceFilter==='all'?$accent:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Toutes</button>
                  {POSTE_URGENCES.map(u=><button key={u.id} onClick={()=>setPosteUrgenceFilter(u.id)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteUrgenceFilter===u.id?u.color:$border}`,background:posteUrgenceFilter===u.id?u.color+'15':'transparent',color:posteUrgenceFilter===u.id?u.color:$textSec,fontSize:'0.7rem',fontWeight:posteUrgenceFilter===u.id?600:400,cursor:'pointer',fontFamily:'inherit'}}>{u.label}</button>)}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par type contrat</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setPosteContratFilter('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteContratFilter==='all'?$accent:$border}`,background:posteContratFilter==='all'?$accent+'15':'transparent',color:posteContratFilter==='all'?$accent:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tous</button>
                  {POSTE_CONTRAT_TYPES.map(ct2=><button key={ct2.id} onClick={()=>setPosteContratFilter(ct2.id)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${posteContratFilter===ct2.id?$accent:$border}`,background:posteContratFilter===ct2.id?$accent+'15':'transparent',color:posteContratFilter===ct2.id?$accent:$textSec,fontSize:'0.7rem',fontWeight:posteContratFilter===ct2.id?600:400,cursor:'pointer',fontFamily:'inherit'}}>{ct2.label}</button>)}
                </div>
              </div>
              <div style={{borderTop:`1px solid ${$border}`,paddingTop:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Colonnes visibles</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
                  {[
                    {id:'poste',l:'Poste',locked:true},{id:'niveau',l:'Niveau'},{id:'filiale',l:'Filiale'},{id:'statut',l:'Statut'},{id:'besoin',l:'Type besoin'},{id:'urgence',l:'Urgence'},{id:'titulaire',l:'Titulaire'},{id:'budget',l:'Budget'},{id:'contrat',l:'Contrat'},{id:'dateBesoin',l:'Date besoin'},{id:'service',l:'Service'},{id:'onboarding',l:'Type OB'}
                  ].map(col=>(
                    <label key={col.id} style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.72rem',color:$textSec,cursor:col.locked?'default':'pointer',opacity:col.locked?0.5:1}}>
                      <input type="checkbox" checked={posteVisibleCols[col.id]!==false} disabled={col.locked} onChange={()=>setPosteVisibleCols(p=>({...p,[col.id]:!p[col.id]}))} style={{accentColor:$accent}}/>
                      {col.l}
                    </label>
                  ))}
                </div>
              </div>
            </div></>}
            {/* KPI Cards */}
            {(()=>{
              const pourvus=postes.filter(p=>(p.statut==='pourvu'||p.statut==='Pourvu')).length;
              const ouverts=postes.filter(p=>['ouvert','Ouvert','recrutement','proposition'].includes(p.statut)).length;
              const geles=postes.filter(p=>['gele','a_creer'].includes(p.statut)).length;
              const urgents=postes.filter(p=>p.urgence==='immediate'||p.urgence==='1_mois').length;
              const budgetTotal=postes.filter(p=>p.budgetCharge&&p.statut!=='pourvu'&&p.statut!=='Pourvu').reduce((s,p)=>s+(p.budgetCharge||0),0);
              return <div style={{display:'grid',gridTemplateColumns:'repeat(6, 1fr)',gap:10,marginBottom:20}}>
                {[
                  {l:'Total postes',v:postes.length,c:$accent},
                  {l:'Pourvus',v:pourvus,c:'#059669'},
                  {l:'Ouverts / Recrutement',v:ouverts,c:'#D97706'},
                  {l:'Gelés / À créer',v:geles,c:'#7C3AED'},
                  {l:'Urgents (< 1 mois)',v:urgents,c:urgents>0?'#DC2626':'#059669'},
                  {l:'Budget à pourvoir',v:(budgetTotal/1000).toFixed(0)+'k€',c:'#3B82F6'},
                ].map((k,i)=>(
                  <div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px',borderBottom:`3px solid ${k.c}`,boxShadow:$shadow}}>
                    <div style={{fontSize:'0.62rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>{k.l}</div>
                    <div style={{fontSize:'1.3rem',fontWeight:800,color:k.c}}>{k.v}</div>
                  </div>
                ))}
              </div>;
            })()}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,boxShadow:$shadow,overflow:'hidden'}}><div style={{overflowX:'auto'}}><table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.95rem'}}><thead><tr style={{background:$bgSub,borderBottom:`2px solid ${$border}`}}>{[
                    {id:'poste',l:'Poste',a:'left'},{id:'niveau',l:'Niveau',a:'center'},{id:'filiale',l:'Filiale',a:'left'},{id:'statut',l:'Statut',a:'center'},{id:'besoin',l:'Type besoin',a:'center'},{id:'urgence',l:'Urgence',a:'center'},{id:'titulaire',l:'Titulaire',a:'left'},{id:'budget',l:'Budget',a:'right'},{id:'contrat',l:'Contrat',a:'center'},{id:'dateBesoin',l:'Date besoin',a:'center'},{id:'service',l:'Service',a:'left'},{id:'onboarding',l:'Type OB',a:'center'}
                  ].filter(col=>posteVisibleCols[col.id]!==false).map(h=><th key={h.id} style={{position:'relative',padding:'10px 12px',textAlign:h.a,fontSize:'0.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.04em',color:$textMut}}>{h.l}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
            <tbody>{postes.filter(p => { if (posteFiltreFiliale !== 'all') { if (posteFiltreFiliale === 'dir') { if (p.filialeId && p.filialeId !== 'yilmaz') return false; } else { if (p.filialeId !== Number(posteFiltreFiliale) && p.filialeId !== posteFiltreFiliale) return false; } } if (posteFiltreStatut !== 'all' && p.statut !== posteFiltreStatut && !(posteFiltreStatut==='Pourvu'&&p.statut==='pourvu') && !(posteFiltreStatut==='Ouvert'&&p.statut==='ouvert')) return false; if (posteBesoinFilter !== 'all' && p.besoinType !== posteBesoinFilter) return false; if (posteUrgenceFilter !== 'all' && p.urgence !== posteUrgenceFilter) return false; if (posteContratFilter !== 'all' && (p.typeContrat||'cdi') !== posteContratFilter) return false; return true; }).sort((a,b) => { const niveaux = ['XXXL','XXL','XL','L','M','S','XS','XXS']; return niveaux.indexOf(a.niveau) - niveaux.indexOf(b.niveau); }).map((p, idx) => { const fil = filialesDynamiques.find(f => f.id === p.filialeId) || (p.filialeId === 'yilmaz' || !p.filialeId ? {id:'yilmaz',nom:'Yilmaz',icon:'🏢',couleur:'#2d2d2d'} : null); const tit = p.titulaire ? employes.find(e => e.id === p.titulaire) : null; const totalMin = (p.salaireMin||0) + (p.primeMin||0) + (p.variableMin||0); const totalMax = (p.salaireMax||0) + (p.primeMax||0) + (p.variableMax||0); return (<tr key={p.id} onClick={() => setPosteSelectionne(p.id)} style={{borderBottom:`1px solid ${$borderLight}`,cursor:'pointer',transition:'background 0.1s',background:$bgSub+'60'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}><td style={{padding:'10px 12px',borderBottom:`1px solid ${$borderLight}`}}><div style={{fontWeight:600,fontSize:'0.84rem',color:$text}}>{p.titre||<span style={{color:$textMut,fontStyle:'italic'}}>Sans titre</span>}</div>{p.titreRuche&&<div style={{fontSize:'0.7rem',color:$textMut}}>{p.titreRuche}</div>}</td>{(()=>{const st=POSTE_STATUTS.find(s=>s.id===p.statut)||POSTE_STATUTS.find(s=>s.id==='pourvu');const bt=POSTE_BESOIN_TYPES.find(b=>b.id===p.besoinType);const urg=POSTE_URGENCES.find(u=>u.id===p.urgence);const ct=POSTE_CONTRAT_TYPES.find(c2=>c2.id===p.typeContrat);const obt2=POSTE_OB_TYPES.find(o=>o.id===p.onboardingType);const cs={padding:'10px 12px',borderBottom:`1px solid ${$borderLight}`};return <>{
              posteVisibleCols.niveau!==false&&<td style={{...cs,textAlign:'center'}}><span style={{fontSize:'0.72rem',fontWeight:700,padding:'3px 8px',borderRadius:crmRd>0?20:2,background:$accent+'15',color:$accent}}>{p.niveau}</span></td>}{
              posteVisibleCols.filiale!==false&&<td style={{...cs,fontSize:'0.78rem',color:$textSec}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:fil?.couleur||$accent,flexShrink:0}}/>{fil?.nom||'Yilmaz'}</span></td>}{
              posteVisibleCols.statut!==false&&<td style={{...cs,textAlign:'center'}}><span style={{fontSize:'0.62rem',fontWeight:700,padding:'3px 8px',borderRadius:crmRd>0?20:2,background:st.color+'15',color:st.color,display:'inline-flex',alignItems:'center',gap:3}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>}{
              posteVisibleCols.besoin!==false&&<td style={{...cs,textAlign:'center'}}>{bt?<span style={{fontSize:'0.62rem',fontWeight:600,padding:'2px 6px',borderRadius:crmRd>0?12:2,background:bt.color+'15',color:bt.color}}>{bt.label}</span>:<span style={{color:$textMut,fontSize:'0.65rem'}}>—</span>}</td>}{
              posteVisibleCols.urgence!==false&&<td style={{...cs,textAlign:'center'}}>{urg?<span style={{fontSize:'0.62rem',fontWeight:700,padding:'2px 6px',borderRadius:crmRd>0?12:2,background:urg.color+'12',color:urg.color}}>{urg.label}</span>:<span style={{color:$textMut,fontSize:'0.65rem'}}>—</span>}</td>}{
              posteVisibleCols.titulaire!==false&&<td style={{...cs,fontSize:'0.78rem'}}>{tit?<span style={{color:$text,fontWeight:500}}>{tit.prenom} {tit.nom}</span>:<span style={{color:$warn,fontWeight:600,fontSize:'0.72rem'}}>À recruter</span>}</td>}{
              posteVisibleCols.budget!==false&&<td style={{...cs,textAlign:'right',fontSize:'0.72rem'}}>{p.budgetCharge?<span style={{fontWeight:700,color:$info}}>{(p.budgetCharge/1000).toFixed(0)}k€</span>:<span style={{color:$textMut}}>{(totalMin/1000).toFixed(0)}-{(totalMax/1000).toFixed(0)}k€</span>}</td>}{
              posteVisibleCols.contrat!==false&&<td style={{...cs,textAlign:'center',fontSize:'0.65rem',color:$textSec}}>{ct?ct.label:'CDI'}</td>}{
              posteVisibleCols.dateBesoin!==false&&<td style={{...cs,textAlign:'center',fontSize:'0.68rem',color:$textMut}}>{p.dateBesoin?new Date(p.dateBesoin).toLocaleDateString('fr-FR'):'—'}</td>}{
              posteVisibleCols.service!==false&&<td style={{...cs,fontSize:'0.72rem',color:$textMut}}>{p.service||'—'}</td>}{
              posteVisibleCols.onboarding!==false&&<td style={{...cs,textAlign:'center',fontSize:'0.62rem',color:$textSec}}>{obt2?obt2.label:'—'}</td>}{
              }</>;})()}</tr>); })}</tbody></table></div></div>
          </>) : (() => {
            const p = postes.find(x => x.id === posteSelectionne); if (!p) return null;
            const ed = posteEditMode ? posteEditData : p;
            const fil = filialesDynamiques.find(f => f.id === p.filialeId);
            const tit = p.titulaire ? employes.find(e => e.id === p.titulaire) : null;
            const totalMin = (p.salaireMin||0)+(p.primeMin||0)+(p.variableMin||0);
            const totalMax = (p.salaireMax||0)+(p.primeMax||0)+(p.variableMax||0);
            const st = POSTE_STATUTS.find(s=>s.id===p.statut)||POSTE_STATUTS[5];
            const bt = POSTE_BESOIN_TYPES.find(b=>b.id===p.besoinType);
            const sm = POSTE_SOUS_MOTIFS.find(s=>s.id===p.sousMotif);
            const urg = POSTE_URGENCES.find(u=>u.id===p.urgence);
            const ct = POSTE_CONTRAT_TYPES.find(c2=>c2.id===p.typeContrat);
            const obt = POSTE_OB_TYPES.find(o=>o.id===p.onboardingType);
            const inputSt = {width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'};
            const labelSt = {fontSize:'0.68rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4,display:'block'};
            return (<>
              {/* Header */}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <button onClick={() => { setPosteSelectionne(null); setPosteEditMode(false); setPosteEditData(null); }} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontSize:'0.82rem',fontWeight:600,color:$textSec,fontFamily:'inherit'}}>← Retour</button>
                <div style={{display:'flex',gap:6}}>
                  {!posteEditMode ? (canEdit('postes') ? <><button onClick={() => { setPosteEditData({...p}); setPosteEditMode(true); }} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>✏️ Modifier</button><button onClick={() => setConfirmDelete({type:'poste',id:p.id,nom:p.titre||'Sans titre'})} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'08',color:$danger,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>🗑️ Supprimer</button></> : null) : (<>
                    <button onClick={() => { setPostes(prev => prev.map(x => x.id === ed.id ? {...ed} : x)); setPosteEditMode(false); setPosteEditData(null); }} style={{padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#059669',color:'#fff',fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>💾 Enregistrer</button>
                    <button onClick={() => { setPosteEditMode(false); setPosteEditData(null); }} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,color:$textSec,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>✕ Annuler</button>
                  </>)}
                  {!posteEditMode && p.statut!=='pourvu' && p.statut!=='Pourvu' && <button onClick={()=>{
                    const fil2 = filialesDynamiques.find(f2=>f2.id===p.filialeId);
                    setOngletActif('recrutement');
                    // Update poste to recrutement en cours
                    if(p.statut==='ouvert'||p.statut==='a_creer'){
                      setPostes(prev=>prev.map(x=>x.id===p.id?{...x,statut:'recrutement',historique:[...(x.historique||[]),{date:new Date().toISOString().slice(0,10),action:'Recrutement lancé depuis Postes',par:currentUser?.prenom||''}]}:x));
                    }
                    setTimeout(()=>{
                      setRecruNewMode(null);
                      setRecruEdit({
                        id:'C'+String(Date.now()).slice(-6),
                        nom:'',prenom:'',nomFamille:'',
                        poste:p.titre||'',
                        posteId:p.id,
                        posteAProposer:undefined,
                        filiale:fil2?fil2.nom:'Yilmaz',
                        etape:'nouveau',
                        priorite:p.urgence==='immediate'?'Haute':p.urgence==='1_mois'?'Haute':'Moyenne',
                        dateCandidat:new Date().toISOString().slice(0,10),
                        email:'',tel:'',source:'',notes:p.justification?'Poste: '+p.justification:'',
                        evaluation:0,pretentionSalariale:0,disponibilite:'',
                        villeCandidat:'',adresse:'',dateNaissance:'',nationalite:'',permis:'',
                        formations:'',langues:'',linkedin:'',motifRefus:'',photoUrl:'',
                        fichiers:[],scorecard:[],entretiens:[],
                        timeline:[{date:new Date().toISOString().slice(0,10),action:'Candidat créé depuis le poste: '+p.titre}]
                      });
                    },150);
                  }} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$info}`,background:$info+'10',color:$info,fontWeight:600,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>🔍 Lancer Recrutement</button>}
                </div>
              </div>
              {/* Poste Header Card */}
              <div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$border}`,marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:'1.3rem',fontWeight:700,letterSpacing:'-0.03em',color:$text}}>{p.titre}</div>
                    {p.titreRuche&&<div style={{fontSize:'0.88rem',color:$accent,fontWeight:600,marginTop:2}}>🐝 {p.titreRuche}</div>}
                    <div style={{fontSize:'0.82rem',color:$textMut,marginTop:4}}>{fil?`${fil.icon} ${fil.nom}`:'🏛️ Yilmaz'} — {p.service||'—'}</div>
                    <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                      <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:st.color+'15',color:st.color,fontWeight:700,fontSize:'0.72rem'}}>{st.icon} {st.label}</span>
                      <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:$accent+'15',color:$accent,fontWeight:800,fontSize:'0.72rem'}}>{p.niveau}</span>
                      {bt&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:bt.color+'15',color:bt.color,fontWeight:600,fontSize:'0.68rem'}}>{bt.label}{sm?' — '+sm.label:''}</span>}
                      {urg&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:urg.color+'15',color:urg.color,fontWeight:600,fontSize:'0.68rem'}}>{urg.label}</span>}
                      {ct&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:$bgSub,color:$textSec,fontSize:'0.68rem'}}>{ct.label}</span>}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    {tit ? <span style={{padding:'5px 14px',borderRadius:crmRd>0?20:2,background:'#05966915',color:'#059669',fontWeight:600,fontSize:'0.78rem',cursor:'pointer'}} onClick={()=>{setOngletActif('collaborateurs');setCollabOngletId(tit.id);setCollabDetailTab('profil');}}>✅ {tit.prenom} {tit.nom}</span> : <span style={{padding:'5px 14px',borderRadius:crmRd>0?20:2,background:'#D9770615',color:'#D97706',fontWeight:600,fontSize:'0.78rem'}}>○ À recruter</span>}
                    {p.dateBesoin&&<div style={{fontSize:'0.72rem',color:$textMut,marginTop:6}}>Besoin: {new Date(p.dateBesoin).toLocaleDateString('fr-FR')}</div>}
                    {p.budgetCharge&&<div style={{fontSize:'0.82rem',fontWeight:700,color:$info,marginTop:4}}>{(p.budgetCharge/1000).toFixed(0)}k€ chargé</div>}
                  </div>
                </div>
                {p.justification&&<div style={{marginTop:12,padding:'8px 12px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`,fontSize:'0.78rem',color:$textSec}}><span style={{fontWeight:600,color:$textMut}}>Justification:</span> {p.justification}</div>}
              </div>
              {/* Edit Form */}
              {posteEditMode&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$accent}30`,marginBottom:16}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$accent,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:14}}>✏️ Modifier le poste</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:14}}>
                  <div style={{gridColumn:'span 2'}}><label style={labelSt}>Titre du poste</label><input style={inputSt} value={ed.titre||''} onChange={e=>setPosteEditData({...ed,titre:e.target.value})}/></div>
                  <div><label style={labelSt}>Titre Ruche</label><input style={inputSt} value={ed.titreRuche||''} onChange={e=>setPosteEditData({...ed,titreRuche:e.target.value})}/></div>
                  <div><label style={labelSt}>Niveau</label><select style={inputSt} value={ed.niveau} onChange={e=>setPosteEditData({...ed,niveau:e.target.value})}>{['XXXL','XXL','XL','L','M','S','XS','XXS'].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
                  <div><label style={labelSt}>Filiale</label><select style={inputSt} value={ed.filialeId||''} onChange={e=>setPosteEditData({...ed,filialeId:e.target.value==='yilmaz'?'yilmaz':e.target.value?Number(e.target.value):'yilmaz'})}><option value="yilmaz">🏛️ Yilmaz</option>{filialesDynamiques.map(f=><option key={f.id} value={f.id}>{f.nom}</option>)}</select></div>
                  <div><label style={labelSt}>Service</label><input style={inputSt} value={ed.service||''} onChange={e=>setPosteEditData({...ed,service:e.target.value})}/></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10,marginBottom:14}}>
                  <div><label style={labelSt}>Statut</label><select style={inputSt} value={ed.statut} onChange={e=>setPosteEditData({...ed,statut:e.target.value})}>{POSTE_STATUTS.map(s=><option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}</select></div>
                  <div><label style={labelSt}>Type de besoin</label><select style={inputSt} value={ed.besoinType||''} onChange={e=>setPosteEditData({...ed,besoinType:e.target.value||null})}><option value="">— Aucun —</option>{POSTE_BESOIN_TYPES.map(b=><option key={b.id} value={b.id}>{b.label}</option>)}</select></div>
                  <div><label style={labelSt}>Sous-motif</label><select style={inputSt} value={ed.sousMotif||''} onChange={e=>setPosteEditData({...ed,sousMotif:e.target.value||null})}><option value="">—</option>{POSTE_SOUS_MOTIFS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
                  <div><label style={labelSt}>Urgence</label><select style={inputSt} value={ed.urgence||''} onChange={e=>setPosteEditData({...ed,urgence:e.target.value||null})}><option value="">—</option>{POSTE_URGENCES.map(u=><option key={u.id} value={u.id}>{u.label}</option>)}</select></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10,marginBottom:14}}>
                  <div><label style={labelSt}>Type de contrat</label><select style={inputSt} value={ed.typeContrat||'cdi'} onChange={e=>setPosteEditData({...ed,typeContrat:e.target.value})}>{POSTE_CONTRAT_TYPES.map(c2=><option key={c2.id} value={c2.id}>{c2.label}</option>)}</select></div>
                  <div><label style={labelSt}>Date de besoin</label><input type="date" style={inputSt} value={ed.dateBesoin||''} onChange={e=>setPosteEditData({...ed,dateBesoin:e.target.value})}/></div>
                  <div><label style={labelSt}>Budget chargé (€/an)</label><input type="number" style={inputSt} value={ed.budgetCharge||''} onChange={e=>setPosteEditData({...ed,budgetCharge:e.target.value?Number(e.target.value):null})}/></div>
                  <div><label style={labelSt}>Type onboarding</label><select style={inputSt} value={ed.onboardingType||'ouvrier_btp'} onChange={e=>setPosteEditData({...ed,onboardingType:e.target.value})}>{POSTE_OB_TYPES.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                  <div><label style={labelSt}>Titulaire</label><select style={inputSt} value={ed.titulaire||''} onChange={e=>setPosteEditData({...ed,titulaire:e.target.value||null})}><option value="">— Vacant —</option>{employes.filter(emp=>emp.statut==='actif').map(emp=><option key={emp.id} value={emp.id}>{emp.prenom} {emp.nom}</option>)}</select></div>
                  <div><label style={labelSt}>Justification</label><input style={inputSt} value={ed.justification||''} onChange={e=>setPosteEditData({...ed,justification:e.target.value})} placeholder="Pourquoi ce recrutement ?"/></div>
                </div>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginTop:16,marginBottom:10}}>💰 Fourchette de rémunération</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',gap:8}}>
                  <div><label style={labelSt}>Fixe Min</label><input type="number" style={inputSt} value={ed.salaireMin||0} onChange={e=>setPosteEditData({...ed,salaireMin:Number(e.target.value)})}/></div>
                  <div><label style={labelSt}>Fixe Max</label><input type="number" style={inputSt} value={ed.salaireMax||0} onChange={e=>setPosteEditData({...ed,salaireMax:Number(e.target.value)})}/></div>
                  <div><label style={labelSt}>Prime Min</label><input type="number" style={inputSt} value={ed.primeMin||0} onChange={e=>setPosteEditData({...ed,primeMin:Number(e.target.value)})}/></div>
                  <div><label style={labelSt}>Prime Max</label><input type="number" style={inputSt} value={ed.primeMax||0} onChange={e=>setPosteEditData({...ed,primeMax:Number(e.target.value)})}/></div>
                  <div><label style={labelSt}>Variable Min</label><input type="number" style={inputSt} value={ed.variableMin||0} onChange={e=>setPosteEditData({...ed,variableMin:Number(e.target.value)})}/></div>
                  <div><label style={labelSt}>Variable Max</label><input type="number" style={inputSt} value={ed.variableMax||0} onChange={e=>setPosteEditData({...ed,variableMax:Number(e.target.value)})}/></div>
                </div>
              </div>}
              {/* Rémunération (view mode) */}
              {!posteEditMode&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$border}`,marginBottom:16}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:12}}>💰 Fourchette de rémunération</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:12}}>
                  <div style={{background:$bgSub,borderRadius:crmRd,padding:14,border:`1px solid ${$borderLight}`}}><div style={{fontSize:'0.68rem',color:$textMut}}>💵 Fixe</div><div style={{fontSize:'1.1rem',fontWeight:700,color:$info}}>{(p.salaireMin/1000).toFixed(0)}-{(p.salaireMax/1000).toFixed(0)}k€</div></div>
                  <div style={{background:$bgSub,borderRadius:crmRd,padding:14,border:`1px solid ${$borderLight}`}}><div style={{fontSize:'0.68rem',color:$textMut}}>🎁 Prime</div><div style={{fontSize:'1.1rem',fontWeight:700,color:'#7C3AED'}}>{(p.primeMin/1000).toFixed(0)}-{(p.primeMax/1000).toFixed(0)}k€</div></div>
                  <div style={{background:$bgSub,borderRadius:crmRd,padding:14,border:`1px solid ${$borderLight}`}}><div style={{fontSize:'0.68rem',color:$textMut}}>📈 Variable</div><div style={{fontSize:'1.1rem',fontWeight:700,color:'#059669'}}>{(p.variableMin/1000).toFixed(0)}-{(p.variableMax/1000).toFixed(0)}k€</div></div>
                  <div style={{background:$accent+'08',borderRadius:crmRd,padding:14,border:`1px solid ${$accent}30`}}><div style={{fontSize:'0.68rem',color:$textMut}}>💰 Package Total</div><div style={{fontSize:'1.1rem',fontWeight:800,color:$accent}}>{(totalMin/1000).toFixed(0)}-{(totalMax/1000).toFixed(0)}k€</div>{p.budgetCharge&&<div style={{fontSize:'0.62rem',color:$info,marginTop:2}}>Budget chargé: {(p.budgetCharge/1000).toFixed(0)}k€</div>}</div>
                </div>
              </div>}
              {/* Fiche de Poste + Annonce (view mode) */}
              {!posteEditMode&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$border}`,marginBottom:16}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:12}}>📋 Fiche de Poste</div>
                {p.fichePoste?<div style={{padding:'10px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`,fontSize:'0.85rem',color:$textSec,whiteSpace:'pre-line',marginBottom:12}}>{p.fichePoste}</div>:<div style={{color:$textMut,fontStyle:'italic',fontSize:'0.82rem',marginBottom:12}}>Aucune description — cliquez Modifier</div>}
                {p.missions&&<div style={{padding:'10px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`,marginBottom:10}}><div style={{fontSize:'0.68rem',fontWeight:700,color:$accent,marginBottom:6}}>🎯 Missions principales</div><div style={{fontSize:'0.82rem',color:$textSec,whiteSpace:'pre-line'}}>{p.missions}</div></div>}
                {p.competences&&<div style={{padding:'10px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`,marginBottom:10}}><div style={{fontSize:'0.68rem',fontWeight:700,color:'#7C3AED',marginBottom:6}}>🧠 Compétences requises</div><div style={{fontSize:'0.82rem',color:$textSec,whiteSpace:'pre-line'}}>{p.competences}</div></div>}
              </div>}
              {/* Fiche de Poste (edit mode textareas) */}
              {posteEditMode&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$accent}30`,marginBottom:16}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$accent,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:14}}>📋 Fiche de Poste</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div><label style={labelSt}>Description du poste</label><textarea style={{...inputSt,minHeight:80}} value={ed.fichePoste||''} onChange={e=>setPosteEditData({...ed,fichePoste:e.target.value})} placeholder="Description générale du poste..."/></div>
                  <div><label style={labelSt}>Missions principales</label><textarea style={{...inputSt,minHeight:80}} value={ed.missions||''} onChange={e=>setPosteEditData({...ed,missions:e.target.value})} placeholder="• Mission 1&#10;• Mission 2"/></div>
                  <div><label style={labelSt}>Compétences requises</label><textarea style={{...inputSt,minHeight:80}} value={ed.competences||''} onChange={e=>setPosteEditData({...ed,competences:e.target.value})} placeholder="• Compétence 1&#10;• Compétence 2"/></div>
                  <div><label style={labelSt}>📢 Fiche d'annonce (Indeed, LinkedIn...)</label><textarea style={{...inputSt,minHeight:100,fontFamily:'monospace'}} value={ed.ficheAnnonce||''} onChange={e=>setPosteEditData({...ed,ficheAnnonce:e.target.value})} placeholder="Texte de l'annonce pour les sites de recrutement..."/></div>
                </div>
              </div>}
              {/* Annonce (view mode) */}
              {!posteEditMode&&p.ficheAnnonce&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$info}30`,marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <div style={{fontSize:'0.72rem',fontWeight:600,color:$info,textTransform:'uppercase',letterSpacing:'0.04em'}}>📢 Fiche d'Annonce</div>
                  <button onClick={()=>navigator.clipboard.writeText(p.ficheAnnonce)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${$info}`,background:$info+'08',color:$info,fontSize:'0.68rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>📋 Copier</button>
                </div>
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`,fontSize:'0.82rem',color:$textSec,whiteSpace:'pre-line',fontFamily:'monospace'}}>{p.ficheAnnonce}</div>
              </div>}
              {/* Historique du poste */}
              {!posteEditMode&&(p.historique||[]).length>0&&<div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$border}`,marginBottom:16}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:12}}>📈 Historique du poste</div>
                <div style={{position:'relative'}}>
                  <div style={{position:'absolute',left:8,top:0,bottom:0,width:2,background:$borderLight}}/>
                  {(p.historique||[]).sort((a,b)=>new Date(b.date)-new Date(a.date)).map((evt,idx)=>(
                    <div key={idx} style={{position:'relative',paddingLeft:28,paddingBottom:10}}>
                      <div style={{position:'absolute',left:4,top:5,width:10,height:10,borderRadius:'50%',background:$accent,border:'2px solid white'}}/>
                      <div style={{fontSize:'0.72rem',color:$textMut,fontWeight:600}}>{new Date(evt.date).toLocaleDateString('fr-FR')}{evt.par&&<span style={{marginLeft:6,color:$accent}}>— {evt.par}</span>}</div>
                      <div style={{fontSize:'0.78rem',color:$text}}>{evt.action}</div>
                    </div>
                  ))}
                </div>
              </div>}
            </>);
          })()}
        </>
  );
}
