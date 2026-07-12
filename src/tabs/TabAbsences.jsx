// === Onglet « absences » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabAbsences(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FILIALE_FILTER_OPTIONS, absColWidths, absData, absEdit, absFilter, absSettingsOpen, absView, absViewMonth, absVisibleCols, crmRd, filialeFilter, filialesDynamiques, filterByFiliale, getEmploye, getFiliale, highlightStyle, isYilmazContext, setAbsColWidths, setAbsData, setAbsEdit, setAbsFilter, setAbsSettingsOpen, setAbsView, setAbsViewMonth, setAbsVisibleCols, setFilialeFilter, toggleFilialeFilter } = __props;
        const ABS_TYPES = [{id:'cp',label:'Congé payé',color:'#3b82f6',icon:'☀'},{id:'rtt',label:'RTT',color:'#8b5cf6',icon:'◆'},{id:'maladie',label:'Maladie',color:'#ef4444',icon:'✚'},{id:'accident_travail',label:'Accident travail',color:'#dc2626',icon:'▲'},{id:'sans_solde',label:'Sans solde',color:$textSec,icon:'○'},{id:'formation',label:'Formation',color:'#f59e0b',icon:'▸'},{id:'evenement_familial',label:'Événement familial',color:'#10b981',icon:'♥'},{id:'autre',label:'Autre',color:'#10b981',icon:'◇'}];
        const ABS_STATUTS = [{id:'en_attente',label:'En attente',color:'#f59e0b'},{id:'approuve',label:'Approuvé',color:'#10b981'},{id:'refuse',label:'Refusé',color:'#ef4444'}];
        const saveAbs = d => { setAbsData(d); localStorage.setItem('ruches_abs_data', JSON.stringify(d)); };
        // Soldes CP/RTT par collaborateur
        const SOLDES = [
          {employeId:'EMP001',cp:25,rtt:10,cpPris:8,rttPris:3},
          {employeId:'EMP002',cp:25,rtt:10,cpPris:5,rttPris:2},
          {employeId:'EMP005',cp:25,rtt:8,cpPris:10,rttPris:4},
          {employeId:'EMP006',cp:25,rtt:8,cpPris:5,rttPris:1},
          {employeId:'EMP015',cp:25,rtt:8,cpPris:7,rttPris:3},
          {employeId:'EMP008',cp:25,rtt:8,cpPris:12,rttPris:5},
          {employeId:'EMP009',cp:25,rtt:8,cpPris:6,rttPris:2},
          {employeId:'EMP010',cp:25,rtt:8,cpPris:8,rttPris:4},
          {employeId:'EMP011',cp:25,rtt:8,cpPris:3,rttPris:1},
          {employeId:'EMP013',cp:25,rtt:8,cpPris:5,rttPris:0},
          {employeId:'EMP014',cp:25,rtt:10,cpPris:10,rttPris:6},
          {employeId:'EMP018',cp:25,rtt:8,cpPris:4,rttPris:2},
          {employeId:'EMP019',cp:25,rtt:8,cpPris:9,rttPris:3},
          {employeId:'EMP021',cp:25,rtt:8,cpPris:0,rttPris:0}
        ];
        const sampleAbs = [
          {id:'ABS-001',employeId:'EMP008',filialeId:3,type:'cp',debut:'2026-01-06',fin:'2026-01-17',jours:10,statut:'approuve',motif:'Vacances famille',validePar:'EMP005'},
          {id:'ABS-002',employeId:'EMP006',filialeId:2,type:'cp',debut:'2026-02-17',fin:'2026-02-21',jours:5,statut:'approuve',motif:'Vacances hiver',validePar:'EMP001'},
          {id:'ABS-003',employeId:'EMP015',filialeId:1,type:'rtt',debut:'2026-03-07',fin:'2026-03-07',jours:1,statut:'en_attente',motif:'Personnel',validePar:null},
          {id:'ABS-004',employeId:'EMP009',filialeId:3,type:'maladie',debut:'2026-02-10',fin:'2026-02-14',jours:3,statut:'approuve',motif:'Arrêt médecin — lombalgie',validePar:'EMP005'},
          {id:'ABS-005',employeId:'EMP014',filialeId:null,type:'formation',debut:'2026-03-17',fin:'2026-03-18',jours:2,statut:'approuve',motif:'Formation Factur-X / e-facturation',validePar:'EMP001'},
          {id:'ABS-006',employeId:'EMP010',filialeId:3,type:'cp',debut:'2026-04-21',fin:'2026-04-25',jours:5,statut:'en_attente',motif:'Déménagement',validePar:null},
          {id:'ABS-007',employeId:'EMP005',filialeId:3,type:'cp',debut:'2026-03-24',fin:'2026-03-28',jours:5,statut:'approuve',motif:'Retour famille',validePar:'EMP001'},
          {id:'ABS-008',employeId:'EMP011',filialeId:2,type:'maladie',debut:'2026-02-03',fin:'2026-02-05',jours:3,statut:'approuve',motif:'Grippe',validePar:'EMP006'},
          {id:'ABS-009',employeId:'EMP013',filialeId:1,type:'rtt',debut:'2026-03-14',fin:'2026-03-14',jours:1,statut:'en_attente',motif:'',validePar:null},
          {id:'ABS-010',employeId:'EMP002',filialeId:null,type:'cp',debut:'2026-04-14',fin:'2026-04-18',jours:5,statut:'approuve',motif:'Voyage Italie',validePar:'EMP001'},
          {id:'ABS-011',employeId:'EMP021',filialeId:3,type:'maladie',debut:'2025-11-15',fin:'2026-04-30',jours:120,statut:'approuve',motif:'Arrêt longue durée — maladie',validePar:'EMP001'},
          {id:'ABS-012',employeId:'EMP023',filialeId:3,type:'accident_travail',debut:'2026-01-20',fin:'2026-03-15',jours:40,statut:'approuve',motif:'Accident de travail — chute échafaudage',validePar:'EMP005'}
        ];
        const data = filterByFiliale(absData.length > 0 ? absData : sampleAbs);
        const filtered = data.filter(a => (absFilter === 'tous' || a.type === absFilter || a.statut === absFilter));
        const totalJours = data.filter(a=>a.statut==='approuve').reduce((s,a)=>s+a.jours,0);
        const enAttente = data.filter(a=>a.statut==='en_attente').length;
        const maladieJours = data.filter(a=>a.type==='maladie'&&a.statut==='approuve').reduce((s,a)=>s+a.jours,0);
        const atJours = data.filter(a=>a.type==='accident_travail'&&a.statut==='approuve').reduce((s,a)=>s+a.jours,0);
        const compteurs = ABS_TYPES.map(t => ({...t, jours: data.filter(a=>a.type===t.id&&a.statut==='approuve').reduce((s,a)=>s+a.jours,0)}));
        const moisNoms = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
        return (<div>
          {/* ── HEADER SHOWCASE ── */}
          <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
            <div style={{height:3,background:'linear-gradient(90deg,#3b82f6 0%,#8b5cf6 50%,#3b82f6 100%)'}}/>
            <div style={{padding:'14px 20px'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>🌴</div>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                      <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Absences & Congés</h2>
                      {enAttente>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#f59e0b15',color:'#d97706',fontWeight:700,border:'1px solid #f59e0b30'}}>{enAttente} en attente</span>}
                    </div>
                    <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Soldes CP/RTT · Maladie · Planning · {data.length} demandes</p>
                  </div>
                </div>
                <button onClick={()=>setAbsEdit({id:'ABS-'+String(data.length+1).padStart(3,'0'),collaborateur:'',filiale:'YILMAZ SAS',type:'cp',debut:'',fin:'',jours:1,statut:'en_attente',motif:'',valideur:''})}
                  style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#3b82f6',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  + Demande
                </button>
              </div>
              {/* KPI mini row */}
              <div style={{display:'flex',gap:16,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                {[{l:'Jours approuvés',v:totalJours,c:'#3b82f6'},{l:'En attente',v:enAttente,c:'#f59e0b'},{l:'Maladie',v:maladieJours+'j',c:'#ef4444'},{l:'AT/MP',v:atJours+'j',c:'#dc2626'}].map((k,i)=>(
                  <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}>
                    <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{k.l}</div>
                    <div style={{fontSize:'1.1rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em'}}>{k.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Tabs + Filtres */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
            <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>
              {[{id:'liste',l:'☰ Liste'},{id:'cartes',l:'◧ Cartes'},{id:'soldes',l:'◑ Soldes CP/RTT'},{id:'planning',l:'◫ Planning'}].map(v=>(
                <button key={v.id} onClick={()=>setAbsView(v.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:absView===v.id?$selBg:'transparent',color:absView===v.id?$selText:$textMut,fontWeight:absView===v.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{v.l}</button>
              ))}
            </div>
            {absView==='liste'&&<div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
              <button onClick={()=>setAbsSettingsOpen(!absSettingsOpen)} style={{padding:'6px 14px',border:`1px solid ${absSettingsOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:absSettingsOpen?$accentSub:'transparent',color:absSettingsOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                ✱ Filtres & Colonnes {(absFilter!=='tous'||filialeFilter.length>0)&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
              </button>
              {absFilter!=='tous'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setAbsFilter('tous')}>✕ {ABS_TYPES.find(t=>t.id===absFilter)?.label||ABS_STATUTS.find(s=>s.id===absFilter)?.label||absFilter}</span>}
              {filialeFilter.length>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setFilialeFilter([])}>✕ {filialeFilter.length} filiale{filialeFilter.length>1?'s':''}</span>}
            </div>}
          </div>

          {/* ── KPI CARDS showcase ── */}
          {(()=>{
            const KPIS_ABS=[
              {l:'Jours posés',v:totalJours+'j',c:$accent,bg:$accent+'12',icon:'☀',sub:'tous types confondus'},
              {l:'En attente validation',v:enAttente,c:'#d97706',bg:'#d9770612',icon:'⏳',sub:'à valider',urgent:enAttente>0},
              {l:'Jours maladie',v:maladieJours+'j',c:$danger,bg:$danger+'12',icon:'🏥',sub:'arrêts en cours / passés'},
              {l:'Accident travail',v:atJours+'j',c:'#dc2626',bg:'#dc262612',icon:'▲',sub:'AT/MP déclarés'},
              {l:'Demandes totales',v:data.length,c:$info,bg:$info+'12',icon:'☰',sub:'sur la période filtrée'},
            ];
            return (
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:14}}>
                {KPIS_ABS.map((k,i)=>(
                  <div key={i} style={{background:$bgCard,border:`1px solid ${k.urgent?k.c+'44':$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,cursor:'default',transition:'all 0.18s'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=k.c+'55';}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=k.urgent?k.c+'44':$border;}}
                  >
                    <div style={{height:3,background:k.c}}/>
                    <div style={{padding:'13px 15px'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                        <div style={{fontSize:'0.62rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>{k.l}</div>
                        <div style={{width:26,height:26,borderRadius:6,background:k.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem'}}>{k.icon}</div>
                      </div>
                      <div style={{fontSize:'1.6rem',fontWeight:800,color:k.c,letterSpacing:'-0.03em',lineHeight:1,marginBottom:4}}>{k.v}</div>
                      <div style={{fontSize:'0.65rem',color:k.urgent?k.c:$textMut,fontWeight:k.urgent?700:400}}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* ── FILTRE + SETTINGS ── */}
          {absView==='liste' && (() => {
            const ABS_COLS = [
              {id:'collaborateur',label:'Collaborateur',locked:true},
              {id:'filiale',label:'Filiale'},
              {id:'type',label:'Type'},
              {id:'periode',label:'Période'},
              {id:'jours',label:'Jours'},
              {id:'motif',label:'Motif'},
              {id:'statut',label:'Statut'},
              {id:'valideur',label:'Valideur'}
            ];
            const toggleCol = (id) => setAbsVisibleCols(p=>({...p,[id]:!p[id]}));
            const startResize = (colId, e) => {
              e.preventDefault();
              const startX = e.clientX;
              const th = e.target.closest('th');
              const startW = th.offsetWidth;
              const onMove = (ev) => { const w = Math.max(60, startW + ev.clientX - startX); setAbsColWidths(p=>({...p,[colId]:w})); };
              const onUp = () => { document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp); };
              document.addEventListener('mousemove',onMove);
              document.addEventListener('mouseup',onUp);
            };
            return (<>
            {/* Settings dropdown panel (triggered from header button) */}
            {absSettingsOpen&&<><div onClick={()=>setAbsSettingsOpen(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
                  {isYilmazContext&&<div style={{marginBottom:14}}>
                    <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                      <button onClick={()=>setFilialeFilter([])} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${filialeFilter.length===0?$accent:$border}`,background:filialeFilter.length===0?$selBg:'transparent',color:filialeFilter.length===0?$selText:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Toutes</button>
                      {FILIALE_FILTER_OPTIONS.map(f=>{const active=filialeFilter.includes(f.id);return(
                        <button key={f.id} onClick={()=>toggleFilialeFilter(f.id)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${active?f.couleur:$border}`,background:active?f.couleur+'18':'transparent',color:active?f.couleur:$textSec,fontSize:'0.7rem',fontWeight:active?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{f.icon} {f.nom}</button>
                      );})}
                    </div>
                  </div>}
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par statut</div>
                    <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`}}>
                      {[{id:'tous',l:'Tous'},{id:'en_attente',l:'En attente'},{id:'approuve',l:'Approuv\u00e9'},{id:'refuse',l:'Refus\u00e9'}].map(s=>(
                        <button key={s.id} onClick={()=>setAbsFilter(s.id)} style={{flex:1,padding:'5px 8px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:absFilter===s.id?$selBg:'transparent',color:absFilter===s.id?$selText:$textMut,fontWeight:absFilter===s.id?600:400,fontSize:'0.7rem',transition:'all 0.15s',fontFamily:'inherit'}}>{s.l}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par type</div>
                    <div style={{display:'flex',flexDirection:'column',gap:2}}>
                      <button onClick={()=>setAbsFilter('tous')} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:absFilter==='tous'?$accentSub:'transparent',color:absFilter==='tous'?$accent:$textSec,fontWeight:absFilter==='tous'?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',transition:'all 0.1s'}}>Tous les types</button>
                      {ABS_TYPES.map(t=>(
                        <button key={t.id} onClick={()=>setAbsFilter(t.id)} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:absFilter===t.id?t.color+'15':'transparent',color:absFilter===t.id?t.color:$textSec,fontWeight:absFilter===t.id?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,transition:'all 0.1s'}}><span style={{width:6,height:6,borderRadius:'50%',background:t.color}}/>{t.label}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{borderTop:`1px solid ${$border}`,paddingTop:12}}>
                    <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Colonnes visibles</div>
                    <div style={{display:'flex',flexDirection:'column',gap:2}}>
                      {ABS_COLS.map(c=>(
                        <label key={c.id} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 8px',borderRadius:crmRd,cursor:c.locked?'default':'pointer',opacity:c.locked?0.5:1,fontSize:'0.76rem',color:$textSec,transition:'background 0.1s'}} onMouseEnter={e=>{if(!c.locked)e.currentTarget.style.background=$bgSub;}} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                          <input type="checkbox" checked={absVisibleCols[c.id]!==false} disabled={c.locked} onChange={()=>toggleCol(c.id)} style={{accentColor:$accent}}/>
                          {c.label}
                        </label>
                      ))}
                    </div>
                  </div>
            </div></>}

          {/* ═══ VUE LISTE ═══ */}
            <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,background:$bgCard}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                <thead><tr style={{background:$bgSub}}>
                  {ABS_COLS.filter(c=>absVisibleCols[c.id]!==false).map(c=>(
                    <th key={c.id} style={{padding:'10px 14px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',position:'relative',width:absColWidths[c.id]||'auto',userSelect:'none'}}>
                      {c.label}
                      <div onMouseDown={(e)=>startResize(c.id,e)} style={{position:'absolute',right:0,top:0,bottom:0,width:4,cursor:'col-resize',background:'transparent',transition:'background 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$accent+'40'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}/>
                    </th>
                  ))}
                  <th style={{padding:'10px 14px',width:50}}/>
                </tr></thead>
                <tbody>{filtered.map(a=>{ const tp=ABS_TYPES.find(t=>t.id===a.type)||ABS_TYPES[0]; const st=ABS_STATUTS.find(s=>s.id===a.statut)||ABS_STATUTS[0]; return (
                  <tr key={a.id} style={{borderBottom:`1px solid ${$borderLight}`,transition:'background 0.1s',cursor:'pointer',background:$bgSub+'60',...highlightStyle('absence',a.id)}}
                    onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover}
                    onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                    {absVisibleCols.collaborateur!==false&&<td style={{padding:'12px 14px'}}><div style={{fontWeight:600,fontSize:'0.84rem'}}><EmpLink id={a.employeId}/></div><div style={{fontSize:'0.7rem',color:$textMut}}>{getEmploye(a.employeId)?.posteExterne||getEmploye(a.employeId)?.posteInterne||''}</div></td>}
                    {absVisibleCols.filiale!==false&&<td style={{padding:'12px 14px',fontSize:'0.8rem',color:$textSec}}>{getFiliale(a.filialeId)?.nom||'YILMAZ SAS'}</td>}
                    {absVisibleCols.type!==false&&<td style={{padding:'12px 14px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:tp.color+'18',color:tp.color,display:'inline-flex',alignItems:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:tp.color}}/>{tp.label}</span></td>}
                    {absVisibleCols.periode!==false&&<td style={{padding:'12px 14px',fontSize:'0.8rem',color:$textSec,fontVariantNumeric:'tabular-nums'}}>{a.debut} → {a.fin}</td>}
                    {absVisibleCols.jours!==false&&<td style={{padding:'12px 14px',fontWeight:700,fontSize:'0.88rem',color:a.jours>=30?$danger:a.jours>=10?$warn:$text}}>{a.jours}j</td>}
                    {absVisibleCols.motif!==false&&<td style={{padding:'12px 14px',fontSize:'0.78rem',color:$textSec,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.motif||'—'}</td>}
                    {absVisibleCols.statut!==false&&<td style={{padding:'12px 14px'}}>{a.statut==='approuve'?<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$success+'18',color:$success,display:'inline-flex',alignItems:'center',gap:4}}>✓ Approuvé</span>:a.statut==='refuse'?<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$danger+'18',color:$danger,display:'inline-flex',alignItems:'center',gap:4}}>✕ Refusé</span>:<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$warn+'18',color:$warn,display:'inline-flex',alignItems:'center',gap:4}}>◔ En attente</span>}</td>}
                    {absVisibleCols.valideur!==false&&<td style={{padding:'12px 14px',fontSize:'0.78rem',color:$textSec}}>{a.validePar?<EmpLink id={a.validePar}/>:'—'}</td>}
                    <td style={{padding:'12px 14px'}}><button onClick={()=>setAbsEdit({...a})} style={{padding:'4px 10px',border:`1px solid ${$border}`,background:'transparent',borderRadius:crmRd,fontSize:'0.72rem',cursor:'pointer',color:$textMut,fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$textMut;e.currentTarget.style.borderColor=$border;}}>✎</button></td>
                  </tr>);})}</tbody>
              </table>
            </div>
          </>);})()}

          {/* ═══ VUE CARTES ═══ */}
          {absView === 'cartes' && (() => {
            const groupedByCollab = {};
            data.forEach(abs => {
              const k = abs.collaborateur;
              if (!groupedByCollab[k]) groupedByCollab[k] = { nom: k, filiale: abs.filiale, absences: [], totalJours: 0 };
              groupedByCollab[k].absences.push(abs);
              groupedByCollab[k].totalJours += (abs.jours || 0);
            });
            const collabs = Object.values(groupedByCollab).sort((a,b) => b.totalJours - a.totalJours);
            const getTypeColor = t => {
              const found = (ABS_TYPES || []).find(x => x.id === t);
              return found ? found.color : '#6b7280';
            };
            const getStatutBadge = s => ({
              approuve:  { bg:'#05966920', c:'#059669', l:'Approuvé' },
              en_attente:{ bg:'#d9770620', c:'#d97706', l:'En attente' },
              refuse:    { bg:'#dc262620', c:'#dc2626', l:'Refusé' },
              pris:      { bg:'#3b82f620', c:'#3b82f6', l:'Pris' },
            }[s] || { bg:'#6b728020', c:'#6b7280', l:s });
            return (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
                {collabs.map((collab, ci) => {
                  const ini = collab.nom.split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase();
                  const filCfg = filialesDynamiques.find(f=>f.nom===collab.filiale);
                  const filColor = filCfg?.couleur || $accent;
                  const nbApprouves = collab.absences.filter(a=>a.statut==='approuve'||a.statut==='pris').length;
                  const nbAttente = collab.absences.filter(a=>a.statut==='en_attente').length;
                  const typeDist = {};
                  collab.absences.forEach(a => { typeDist[a.type] = (typeDist[a.type]||0) + (a.jours||0); });
                  return (
                    <div key={ci} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,transition:'all 0.18s'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=filColor+'55';}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=$border;}}
                    >
                      <div style={{height:3,background:filColor}}/>
                      <div style={{padding:'14px 16px'}}>
                        {/* Header */}
                        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                          <div style={{width:36,height:36,borderRadius:8,background:filColor+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:800,color:filColor,flexShrink:0,letterSpacing:'0.02em'}}>{ini}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontWeight:700,fontSize:'0.88rem',color:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{collab.nom}</div>
                            <div style={{fontSize:'0.68rem',color:$textMut,marginTop:1}}>{collab.filiale}</div>
                          </div>
                          <div style={{textAlign:'right',flexShrink:0}}>
                            <div style={{fontSize:'1.3rem',fontWeight:800,color:filColor,lineHeight:1}}>{collab.totalJours}</div>
                            <div style={{fontSize:'0.6rem',color:$textMut,fontWeight:600,textTransform:'uppercase'}}>jours</div>
                          </div>
                        </div>
                        {/* Type distribution bar */}
                        {collab.totalJours > 0 && (
                          <div style={{marginBottom:10}}>
                            <div style={{display:'flex',height:5,borderRadius:3,overflow:'hidden',gap:1,marginBottom:6}}>
                              {Object.entries(typeDist).map(([type, jours], ti) => (
                                <div key={ti} style={{flex:jours,background:getTypeColor(type),transition:'flex 0.4s',minWidth:3}} title={type+': '+jours+'j'}/>
                              ))}
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                              {Object.entries(typeDist).map(([type, jours], ti) => (
                                <span key={ti} style={{fontSize:'0.62rem',padding:'1px 6px',borderRadius:8,background:getTypeColor(type)+'20',color:getTypeColor(type),fontWeight:700}}>{type}: {jours}j</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Footer stats */}
                        <div style={{display:'flex',gap:6,paddingTop:10,borderTop:`1px solid ${$border}`}}>
                          <span style={{flex:1,textAlign:'center',padding:'5px 4px',borderRadius:crmRd,background:'#05966912'}}>
                            <div style={{fontSize:'0.75rem',fontWeight:700,color:'#059669'}}>{nbApprouves}</div>
                            <div style={{fontSize:'0.58rem',color:$textMut,fontWeight:600,textTransform:'uppercase'}}>Approuvé</div>
                          </span>
                          {nbAttente > 0 && (
                            <span style={{flex:1,textAlign:'center',padding:'5px 4px',borderRadius:crmRd,background:'#d9770612'}}>
                              <div style={{fontSize:'0.75rem',fontWeight:700,color:'#d97706'}}>{nbAttente}</div>
                              <div style={{fontSize:'0.58rem',color:$textMut,fontWeight:600,textTransform:'uppercase'}}>Attente</div>
                            </span>
                          )}
                          <span style={{flex:1,textAlign:'center',padding:'5px 4px',borderRadius:crmRd,background:$bgSub}}>
                            <div style={{fontSize:'0.75rem',fontWeight:700,color:$textSec}}>{collab.absences.length}</div>
                            <div style={{fontSize:'0.58rem',color:$textMut,fontWeight:600,textTransform:'uppercase'}}>Demandes</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {collabs.length === 0 && <div style={{gridColumn:'1/-1',padding:40,textAlign:'center',color:$textMut,fontSize:'0.88rem'}}>Aucune absence pour les filtres sélectionnés</div>}
              </div>
            );
          })()}

          {/* ═══ VUE SOLDES ═══ */}
          {absView === 'soldes' && (
            <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{padding:'14px 18px',background:$bgSub,borderBottom:`1px solid ${$border}`,fontWeight:600,fontSize:'0.88rem'}}>◫ Soldes individuels CP / RTT</div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr style={{background:$bgSub}}>
                  {['Collaborateur','Filiale','CP acquis','CP pris','Solde CP','RTT acquis','RTT pris','Solde RTT','Total'].map(h=>(
                    <th key={h} style={{position:'relative',padding:'10px 14px',textAlign:h==='Collaborateur'||h==='Filiale'?'left':'center',fontWeight:600,fontSize:'0.68rem',color:$textMut,borderBottom:`1px solid ${$border}`,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                  ))}
                </tr></thead>
                <tbody>{SOLDES.map(s=>{
                  const sCP=s.cp-s.cpPris; const sRTT=s.rtt-s.rttPris; const tot=sCP+sRTT;
                  const cCP=sCP<=5?$danger:sCP<=12?$warn:$success;
                  const cRTT=sRTT<=2?$danger:sRTT<=4?$warn:$success;
                  const cTot=tot<=10?$danger:tot<=20?$warn:$success;
                  return(
                  <tr key={s.employeId} style={{borderBottom:`1px solid ${$borderLight}`,transition:'background 0.1s'}}
                    onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{padding:'11px 14px',fontWeight:600,fontSize:'0.84rem'}}><div><EmpLink id={s.employeId}/></div><div style={{fontSize:'0.7rem',color:$textMut,fontWeight:400}}>{getEmploye(s.employeId)?.posteExterne||getEmploye(s.employeId)?.posteInterne||''}</div></td>
                    <td style={{padding:'11px 14px',fontSize:'0.8rem',color:$textSec}}>{getFiliale(getEmploye(s.employeId)?.filialeId)?.nom||'YILMAZ SAS'}</td>
                    <td style={{padding:'11px 14px',textAlign:'center',color:$textSec}}>{s.cp}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center',color:$danger}}>{s.cpPris}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center',fontWeight:700,color:cCP}}>{sCP}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center',color:$textSec}}>{s.rtt}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center',color:$danger}}>{s.rttPris}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center',fontWeight:700,color:cRTT}}>{sRTT}j</td>
                    <td style={{padding:'11px 14px',textAlign:'center'}}><span style={{fontWeight:800,color:cTot,padding:'2px 10px',borderRadius:crmRd||2,background:cTot+'15'}}>{tot}j</span></td>
                  </tr>);})}</tbody>
              </table>
            </div>
          )}

          {/* ═══ VUE PLANNING ═══ */}
          {absView === 'planning' && (
            <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{padding:'14px 18px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <button onClick={()=>setAbsViewMonth(m=>m>0?m-1:11)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:$textSec,transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>←</button>
                  <span style={{fontWeight:600,minWidth:120,textAlign:'center'}}>{moisNoms[absViewMonth]} 2026</span>
                  <button onClick={()=>setAbsViewMonth(m=>m<11?m+1:0)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:$textSec,transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>→</button>
                </div>
                <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent}}>Aujourd'hui: 1 mars</span>
              </div>
              {(() => {
                const daysInMonth = new Date(2026, absViewMonth+1, 0).getDate();
                const days = Array.from({length:daysInMonth},(_,i)=>i+1);
                const empIds = [...new Set(data.map(a=>a.employeId))];
                return (
                <div style={{padding:14,overflowX:'auto'}}>
                  <table style={{borderCollapse:'collapse',width:'100%'}}>
                    <thead><tr>
                      <th style={{position:'relative',padding:'6px 10px',position:'sticky',left:0,background:$bgSub,fontWeight:600,fontSize:'0.7rem',color:$textMut,borderBottom:`1px solid ${$border}`,minWidth:130,textAlign:'left',zIndex:2}}>Collaborateur<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      {days.map(d=>{const dow=new Date(2026,absViewMonth,d).getDay();const we=dow===0||dow===6;const today=d===1&&absViewMonth===2;
                        return <th key={d} style={{position:'relative',padding:'5px 2px',textAlign:'center',fontSize:'0.63rem',fontWeight:today?700:we?400:500,color:today?$accent:we?$textMut+'80':$textMut,borderBottom:`1px solid ${$border}`,background:today?$accentSub:we?$bgSub+'80':$bgSub,minWidth:24}}>{d}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>;
                      })}
                    </tr></thead>
                    <tbody>{empIds.map(empId=>{
                      const empAbs=data.filter(a=>a.employeId===empId);
                      return(
                        <tr key={empId}>
                          <td style={{padding:'5px 10px',position:'sticky',left:0,background:$bgCard,fontWeight:600,fontSize:'0.74rem',borderBottom:`1px solid ${$borderLight}`,zIndex:1}}><EmpLink id={empId}/></td>
                          {days.map(d=>{
                            const dateStr=`2026-${String(absViewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
                            const abs=empAbs.find(a=>a.statut!=='refuse'&&dateStr>=a.debut&&dateStr<=a.fin);
                            const dow=new Date(2026,absViewMonth,d).getDay();
                            const tp=abs?ABS_TYPES.find(t=>t.id===abs.type):null;
                            return <td key={d} style={{padding:0,textAlign:'center',borderBottom:`1px solid ${$borderLight}`,background:abs?tp.color+'18':dow===0||dow===6?$bgSub+'40':'transparent',height:26,minWidth:24}} title={abs?`${tp.label} (${abs.debut} → ${abs.fin})`:''}>{abs?<span style={{fontSize:'0.58rem',color:tp.color}}>{tp.icon}</span>:''}</td>;
                          })}
                        </tr>
                      );
                    })}</tbody>
                  </table>
                </div>
              );})()}
            </div>
          )}

          {/* ═══ MODAL ABSENCE ═══ */}
          {absEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setAbsEdit(null)}>
            <div style={{background:$bgCard,width:'90%',maxWidth:520,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(a=>a.id===absEdit.id)?'✎ Modifier':'➕ Nouvelle'} absence</span><button onClick={()=>setAbsEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer',color:$textMut}}>✕</button></div>
              <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[{k:'collaborateur',l:'Collaborateur',span:2},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte']},{k:'type',l:'Type',type:'select',opts:ABS_TYPES.map(t=>t.id),labels:ABS_TYPES.map(t=>t.label)},{k:'debut',l:'Début',type:'date'},{k:'fin',l:'Fin',type:'date'},{k:'jours',l:'Jours',type:'number'},{k:'statut',l:'Statut',type:'select',opts:ABS_STATUTS.map(s=>s.id),labels:ABS_STATUTS.map(s=>s.label)},{k:'motif',l:'Motif',span:2,type:'textarea'}].map(f=>(
                  <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                    {f.type==='select'?<select value={absEdit[f.k]||''} onChange={e=>setAbsEdit({...absEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                    :f.type==='textarea'?<textarea value={absEdit[f.k]||''} onChange={e=>setAbsEdit({...absEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'8px 12px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',resize:'vertical',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>
                    :f.type==='number'?<input type="number" value={absEdit[f.k]||0} onChange={e=>setAbsEdit({...absEdit,[f.k]:parseInt(e.target.value)||0})} style={{width:'100%',padding:'8px 12px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>
                    :f.type==='date'?<input type="date" value={absEdit[f.k]||''} onChange={e=>setAbsEdit({...absEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>
                    :<input value={absEdit[f.k]||''} onChange={e=>setAbsEdit({...absEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>}
                  </div>))}
              </div>
              <div style={{padding:'12px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                <div>{data.find(a=>a.id===absEdit.id)&&<button onClick={()=>{saveAbs(data.filter(a=>a.id!==absEdit.id));setAbsEdit(null);}} style={{padding:'7px 16px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Supprimer</button>}</div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>setAbsEdit(null)} style={{padding:'7px 16px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>Annuler</button>
                  <button onClick={()=>{const ex=data.find(a=>a.id===absEdit.id);if(ex){saveAbs(data.map(a=>a.id===absEdit.id?absEdit:a));}else{saveAbs([...data,absEdit]);}setAbsEdit(null);}} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}>Enregistrer</button>
                </div>
              </div>
            </div>
          </div>)}
        </div>);
}
