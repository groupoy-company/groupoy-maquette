// === Onglet « formation » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabFormation(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $selBg, $selText, $shadow, $shadowLg, $text, $textMut, $textSec, $warn, EmpLink, FilLink, crmRd, filialesDynamiques, filterByFiliale, formAlertView, formData, formEdit, formFilialeFilter, formFilter, formSettingsOpen, highlightStyle, isYilmazContext, setFormAlertView, setFormData, setFormEdit, setFormFilialeFilter, setFormFilter, setFormSettingsOpen, showBorderAccent } = __props;
        const FORM_TYPES = [{id:'securite',label:'Sécurité',color:'#ef4444'},{id:'caces',label:'CACES',color:'#f59e0b'},{id:'sst',label:'SST',color:'#10b981'},{id:'hauteur',label:'Travail en hauteur',color:'#3b82f6'},{id:'electrique',label:'Habilitation élec.',color:'#8b5cf6'},{id:'amiante',label:'Amiante SS3/SS4',color:'#dc2626'},{id:'echafaudage',label:'Échafaudage',color:'#0e7490'},{id:'management',label:'Management',color:'#6366f1'},{id:'autre',label:'Autre',color:$textSec}];
        const FORM_STATUTS = [{id:'valide',label:'Valide',color:'#10b981'},{id:'expire_bientot',label:'Expire ≤90j',color:'#f59e0b'},{id:'expire',label:'Expiré',color:'#ef4444'},{id:'planifie',label:'Planifié',color:'#3b82f6'}];
        const DUREES_VALIDITE = {caces:'5 ans',sst:'24 mois',amiante:'3 ans',electrique:'3 ans',hauteur:'5 ans (recomm.)',echafaudage:'Pas de durée légale',securite:'Variable',management:'N/A',autre:'N/A'};
        const saveFormD = d => { setFormData(d); localStorage.setItem('ruches_form_data', JSON.stringify(d)); };
        const sampleForm = [
          {id:'FORM-001',employeId:'EMP005',filialeId:3,type:'caces',intitule:'CACES R489 Cat. 3',organisme:'AFTRAL Strasbourg',dateObtention:'2025-03-15',dateExpiration:'2030-03-15',cout:1200,statut:'valide',notes:'Renouvellement effectué mars 2025'},
          {id:'FORM-002',employeId:'EMP009',filialeId:3,type:'electrique',intitule:'Habilitation élec. BS-BE',organisme:'APAVE',dateObtention:'2025-01-20',dateExpiration:'2028-01-20',cout:650,statut:'valide',notes:''},
          {id:'FORM-003',employeId:'EMP010',filialeId:3,type:'sst',intitule:'SST — Sauveteur Secouriste',organisme:'Croix-Rouge',dateObtention:'2025-06-10',dateExpiration:'2027-06-10',cout:250,statut:'valide',notes:'MAC prévu juin 2027'},
          {id:'FORM-004',employeId:'EMP011',filialeId:2,type:'caces',intitule:'CACES R486 PEMP Cat. A/B',organisme:'SOCOTEC',dateObtention:'2024-11-06',dateExpiration:'2029-11-04',cout:1400,statut:'valide',notes:''},
          {id:'FORM-005',employeId:'EMP011',filialeId:2,type:'echafaudage',intitule:'R408 Montage/Démontage Échafaudage',organisme:'SOCOTEC',dateObtention:'2024-06-12',dateExpiration:'2026-06-10',cout:800,statut:'expire_bientot',notes:'Recyclage à planifier avant juin 2026'},
          {id:'FORM-006',employeId:'EMP010',filialeId:3,type:'hauteur',intitule:'Travail en hauteur + port du harnais',organisme:'OPPBTP',dateObtention:'2023-09-15',dateExpiration:'2026-03-15',cout:450,statut:'expire',notes:'EXPIRÉ — recyclage urgent'},
          {id:'FORM-007',employeId:'EMP005',filialeId:3,type:'amiante',intitule:'Amiante SS4 — Encadrement',organisme:'AFPA',dateObtention:'2024-02-20',dateExpiration:'2027-02-20',cout:550,statut:'valide',notes:''},
          {id:'FORM-008',employeId:'EMP008',filialeId:3,type:'sst',intitule:'SST — Sauveteur Secouriste',organisme:'Croix-Rouge',dateObtention:'2024-12-05',dateExpiration:'2026-12-05',cout:250,statut:'expire_bientot',notes:'MAC à planifier'},
          {id:'FORM-009',employeId:'EMP019',filialeId:3,type:'amiante',intitule:'Amiante SS4 — Opérateur',organisme:'AFPA',dateObtention:'2023-05-10',dateExpiration:'2026-05-10',cout:350,statut:'expire_bientot',notes:'Recyclage nécessaire'},
          {id:'FORM-010',employeId:'EMP018',filialeId:3,type:'caces',intitule:'CACES R482 Engins de chantier Cat. A',organisme:'AFTRAL',dateObtention:'2022-10-01',dateExpiration:'2032-10-01',cout:1600,statut:'valide',notes:'Durée 10 ans (engins)'},
          {id:'FORM-011',employeId:'EMP017',filialeId:2,type:'hauteur',intitule:'Travail en hauteur — Échafaudeur',organisme:'OPPBTP',dateObtention:'2024-03-20',dateExpiration:'2029-03-20',cout:450,statut:'valide',notes:''},
          {id:'FORM-012',employeId:'EMP012',filialeId:2,type:'echafaudage',intitule:'Montage/vérification/réception échafaudage',organisme:'SOCOTEC',dateObtention:'2023-11-15',dateExpiration:'2026-04-15',cout:750,statut:'expire_bientot',notes:'Recyclage Q1 2026'}
        ];
        const data = filterByFiliale(formData.length > 0 ? formData : sampleForm);
        const filtered = data.filter(f => formFilter === 'tous' || f.type === formFilter || f.statut === formFilter);
        const alertes = data.filter(f => f.statut === 'expire' || f.statut === 'expire_bientot');
        const expires = data.filter(f => f.statut === 'expire');
        const expireBientot = data.filter(f => f.statut === 'expire_bientot');
        return (<div>
          {/* ═══ HEADER SHOWCASE ═══ */}
          <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, marginBottom:14, overflow:'hidden'}}>
            <div style={{height:3, background:'linear-gradient(90deg,#059669 0%,#10b981 60%,#059669 100%)'}}/>
            <div style={{padding:'16px 20px'}}>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:10, background:'#059669', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0}}>🎓</div>
                  <div>
                    <div style={{display:'flex', alignItems:'center', gap:7, marginBottom:2}}>
                      <h2 style={{margin:0, fontSize:'1.05rem', fontWeight:800, color:$text, letterSpacing:'-0.01em'}}>Formations & Habilitations BTP</h2>
                      {alertes.length > 0 && <span style={{fontSize:'0.68rem', padding:'2px 7px', borderRadius:8, background:'#dc262615', color:'#dc2626', fontWeight:700, border:'1px solid #dc262630'}}>⚠ {alertes.length} alerte{alertes.length>1?'s':''}</span>}
                    </div>
                    <p style={{margin:0, fontSize:'0.8rem', color:$textMut}}>Certifications · Habilitations · Alertes expiration · Conformité BTP</p>
                  </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}>
                  <button onClick={()=>setFormSettingsOpen(p=>!p)} style={{display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:crmRd, border:`1px solid ${formSettingsOpen||formFilialeFilter!=='tous'?'#059669':$border}`, background:formSettingsOpen||formFilialeFilter!=='tous'?'#0596690d':$bgSub, fontSize:'0.78rem', fontWeight:600, color:formSettingsOpen||formFilialeFilter!=='tous'?'#059669':$textSec, cursor:'pointer'}}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4 7h6M5 4.5h4M6 9.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Filtres{formFilialeFilter!=='tous'?' ●':''}
                  </button>
                  <button onClick={()=>setFormEdit({id:'FORM-'+String(data.length+1).padStart(3,'0'),collaborateur:'',filiale:'Ezel Batiment',type:'caces',intitule:'',organisme:'',dateObtention:'',dateExpiration:'',cout:0,statut:'planifie',notes:''})} style={{display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:crmRd, border:'none', background:'#059669', fontSize:'0.8rem', fontWeight:700, color:'#fff', cursor:'pointer'}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Formation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ TOOLBAR (Tabs + Filtres) ═══ */}
          <div style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:14, overflow:'hidden'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', borderBottom:`1px solid ${$border}`}}>
              <div style={{display:'flex', gap:2, background:$bgSub, borderRadius:crmRd, padding:3}}>
                {[{id:'alertes',l:'⚠ Alertes',cnt:alertes.length},{id:'liste',l:'☰ Liste complète',cnt:data.length}].map(v => (
                  <button key={v.id} onClick={()=>setFormAlertView(v.id)} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 11px', borderRadius:crmRd, border:formAlertView===v.id?`1px solid ${$border}`:'1px solid transparent', cursor:'pointer', background:formAlertView===v.id?$bgCard:'transparent', color:formAlertView===v.id?$text:$textMut, fontWeight:formAlertView===v.id?700:500, fontSize:'0.78rem', boxShadow:formAlertView===v.id?'0 1px 3px rgba(0,0,0,0.06)':'none'}}>
                    {v.l}
                    <span style={{fontSize:'0.65rem', padding:'1px 5px', borderRadius:8, background:formAlertView===v.id?(v.id==='alertes'?'#dc262520':'#05966920'):'transparent', color:formAlertView===v.id?(v.id==='alertes'?'#dc2626':'#059669'):$textMut, fontWeight:700}}>{v.cnt}</span>
                  </button>
                ))}
              </div>
              <span style={{fontSize:'0.76rem', color:$textMut}}>{filtered.length} habilitation{filtered.length>1?'s':''}</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 14px', flexWrap:'wrap'}}>
              <select value={formFilter} onChange={e=>setFormFilter(e.target.value)} style={{fontSize:'0.8rem', padding:'5px 9px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$textSec, outline:'none', cursor:'pointer'}}>
                <option value="tous">🏷 Tous types</option>
                {FORM_TYPES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
                {FORM_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              {formFilialeFilter!=='tous' && <span style={{fontSize:'0.72rem', padding:'3px 9px', borderRadius:9, background:'#05966920', color:'#059669', fontWeight:700, cursor:'pointer', border:'1px solid #05966930'}} onClick={()=>setFormFilialeFilter('tous')}>✕ Filiale</span>}
            </div>
          </div>

          {/* ⚙ Filtres panel */}
          {formSettingsOpen&&<><div onClick={()=>setFormSettingsOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
            {isYilmazContext&&<div style={{marginBottom:14}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                <button onClick={()=>setFormFilialeFilter('tous')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${formFilialeFilter==='tous'?$accent:$border}`,background:formFilialeFilter==='tous'?$selBg:'transparent',color:formFilialeFilter==='tous'?$selText:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Toutes</button>
                {filialesDynamiques.filter(f=>f.holding!=='GROUP OY').map(f=>(
                  <button key={f.id} onClick={()=>setFormFilialeFilter(String(f.id))} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${formFilialeFilter===String(f.id)?f.couleur||$accent:$border}`,background:formFilialeFilter===String(f.id)?(f.couleur||$accent)+'18':'transparent',color:formFilialeFilter===String(f.id)?f.couleur||$accent:$textSec,fontSize:'0.7rem',fontWeight:formFilialeFilter===String(f.id)?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{f.icon} {f.nom}</button>
                ))}
              </div>
            </div>}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par type</div>
              <div style={{display:'flex',flexDirection:'column',gap:2}}>
                <button onClick={()=>setFormFilter('tous')} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:formFilter==='tous'?$accentSub:'transparent',color:formFilter==='tous'?$accent:$textSec,fontWeight:formFilter==='tous'?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',transition:'all 0.1s'}}>Tous les types</button>
                {FORM_TYPES.map(t=>(
                  <button key={t.id} onClick={()=>setFormFilter(t.id)} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:formFilter===t.id?t.color+'15':'transparent',color:formFilter===t.id?t.color:$textSec,fontWeight:formFilter===t.id?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,transition:'all 0.1s'}}><span style={{width:6,height:6,borderRadius:'50%',background:t.color}}/>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par statut</div>
              <div style={{display:'flex',flexDirection:'column',gap:2}}>
                {FORM_STATUTS.map(s=>(
                  <button key={s.id} onClick={()=>setFormFilter(s.id)} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:formFilter===s.id?s.color+'15':'transparent',color:formFilter===s.id?s.color:$textSec,fontWeight:formFilter===s.id?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,transition:'all 0.1s'}}><span style={{width:6,height:6,borderRadius:'50%',background:s.color}}/>{s.label}</button>
                ))}
              </div>
            </div>
          </div></>}

          {/* KPI SHOWCASE */}
          {(() => {
            const totalCout = data.reduce((s,f)=>s+f.cout,0);
            const fmtCout = v => v>=1000?Math.round(v/1000)+'k€':v+'€';
            const tauxConformite = data.length>0?Math.round(data.filter(f=>f.statut==='valide').length/data.length*100):100;
            const KPIS = [
              {l:'Habilitations valides',v:data.filter(f=>f.statut==='valide').length,sub:'conformes à jour',c:'#059669',bg:'#05966912',icon:'✓',bar:tauxConformite},
              {l:'Expirées',v:expires.length,sub:expires.length>0?'action requise':'RAS',c:'#dc2626',bg:'#dc262612',icon:'🚨',urgent:expires.length>0},
              {l:'Expire ≤90 jours',v:expireBientot.length,sub:'recyclage à planifier',c:'#d97706',bg:'#d9770612',icon:'⏳',urgent:expireBientot.length>0},
              {l:'Planifiées',v:data.filter(f=>f.statut==='planifie').length,sub:'en cours de planif.',c:'#3b82f6',bg:'#3b82f612',icon:'📅'},
              {l:'Budget total',v:fmtCout(totalCout),sub:data.length+' habilitation'+(data.length>1?'s':''),c:'#7c3aed',bg:'#7c3aed12',icon:'💰'},
            ];
            return (
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:14}}>
                {KPIS.map((k,i) => (
                  <div key={i} style={{background:$bgCard,border:`1px solid ${k.urgent?k.c+'44':$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,cursor:'default',transition:'all 0.18s'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=k.c+'66';}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=k.urgent?k.c+'44':$border;}}
                  >
                    <div style={{height:3,background:k.c,opacity:k.urgent?1:0.5}}/>
                    <div style={{padding:'13px 15px'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                        <div style={{fontSize:'0.64rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>{k.l}</div>
                        <div style={{width:26,height:26,borderRadius:6,background:k.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem'}}>{k.icon}</div>
                      </div>
                      <div style={{fontSize:'1.6rem',fontWeight:800,color:k.c,letterSpacing:'-0.03em',lineHeight:1,marginBottom:4}}>{k.v}</div>
                      {k.bar!==undefined&&<div style={{height:3,background:$bgSub,borderRadius:2,marginBottom:5,overflow:'hidden'}}><div style={{height:'100%',width:k.bar+'%',background:k.c,borderRadius:2,transition:'width 0.6s'}}/></div>}
                      <div style={{fontSize:'0.66rem',color:k.urgent?k.c:$textMut,fontWeight:k.urgent?700:400}}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          {/* ─── VUE ALERTES ─── */}
          {formAlertView === 'alertes' && (
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {alertes.length === 0 && <div style={{padding:30,textAlign:'center',color:'#059669',fontWeight:600,fontSize:'0.9rem'}}>✓ Toutes les habilitations sont à jour</div>}
              {alertes.sort((a,b) => a.statut==='expire'?-1:1).map(f => {
                const tp = FORM_TYPES.find(t=>t.id===f.type)||FORM_TYPES[0];
                const isExpired = f.statut === 'expire';
                const daysLeft = f.dateExpiration ? Math.ceil((new Date(f.dateExpiration) - new Date()) / (1000*60*60*24)) : null;
                return (
                  <div key={f.id} style={{background:$bgCard,border:`1px solid ${$border}`,borderLeft:showBorderAccent?`4px solid ${isExpired?$danger:$warn}`:'none',borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,transition:'all 0.15s',cursor:'pointer'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=$accent+'40';}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=$border;}}
                      onClick={()=>setFormEdit({...f})}>
                    <div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:'0.92rem',color:isExpired?'#991b1b':'#92400e'}}>{isExpired ? '🚨' : '⚠️'} {f.intitule}</div>
                        <div style={{fontSize:'0.78rem',color:$textSec,marginTop:2}}><EmpLink id={f.employeId}/> — <FilLink id={f.filialeId}/></div>
                        <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>Type: {tp.label} — Validité: {DUREES_VALIDITE[f.type]} — Organisme: {f.organisme}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <span style={{padding:'5px 14px',borderRadius:crmRd>0?20:2,fontWeight:700,fontSize:'0.78rem',background:isExpired?$danger+'15':$warn+'15',color:isExpired?$danger:$warn,display:'inline-flex',alignItems:'center',gap:5}}>{isExpired ? 'EXPIRÉ' : `${daysLeft}j restants`}</span>
                        <div style={{fontSize:'0.72rem',color:$textMut,marginTop:4}}>Exp: {f.dateExpiration}</div>
                      </div>
                    </div>
                    {f.notes && <div style={{padding:'8px 16px 10px',fontSize:'0.72rem',color:$textSec,background:$bgSub,borderTop:`1px solid ${$borderLight}`}}>📝 {f.notes}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {/* ─── VUE LISTE ─── */}
          {formAlertView === 'liste' && (<>
          <div style={{overflowX:'auto',border:`1px solid ${$border}`,borderRadius:crmRd,background:$bgCard,boxShadow:$shadow}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
              <thead><tr style={{background:$bgSub}}>{['Collaborateur','Filiale','Type','Intitulé','Organisme','Obtention','Expiration','Validité','Coût','Statut',''].map(h=><th key={h} style={{position:'relative',padding:'12px 14px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
              <tbody>{filtered.map(f => { const tp = FORM_TYPES.find(t=>t.id===f.type); const st = FORM_STATUTS.find(s=>s.id===f.statut); return (
                <tr key={f.id} style={{borderBottom:`1px solid ${$borderLight}`, background:$bgSub+'60', transition:'background 0.1s', ...highlightStyle('formation', f.id)}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                  <td style={{padding:'12px 14px',fontWeight:700}}><EmpLink id={f.employeId}/></td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem'}}><FilLink id={f.filialeId}/></td>
                  <td style={{padding:'12px 14px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:tp.color+'18',color:tp.color,display:'inline-flex',alignItems:'center',gap:4}}>{tp.label}</span></td>
                  <td style={{padding:'12px 14px',fontWeight:600,maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.intitule}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem',color:$textSec}}>{f.organisme}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem'}}>{f.dateObtention||'—'}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem',fontWeight:['expire','expire_bientot'].includes(f.statut)?700:400,color:f.statut==='expire'?'#ef4444':f.statut==='expire_bientot'?'#f59e0b':'inherit'}}>{f.dateExpiration||'N/A'}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.68rem',color:$textMut}}>{DUREES_VALIDITE[f.type]}</td>
                  <td style={{padding:'12px 14px',fontWeight:700}}>{f.cout.toLocaleString('fr-FR')}€</td>
                  <td style={{padding:'12px 14px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:st.color+'18',color:st.color,display:'inline-flex',alignItems:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>
                  <td style={{padding:'12px 14px'}}><button onClick={()=>setFormEdit({...f})} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.7rem',cursor:'pointer',color:$textSec,transition:'all 0.15s',fontFamily:'inherit'}}>✎</button></td>
                </tr>); })}</tbody>
            </table>
          </div>
          </>)}
          {/* Modal formation */}
          {formEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setFormEdit(null)}><div style={{background:$bgCard,width:'92%',maxWidth:580,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(f=>f.id===formEdit.id)?'✏️ Modifier':'➕ Nouvelle'} formation</span><button onClick={()=>setFormEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'collaborateur',l:'Collaborateur',span:2},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte',"L'Étanchéité"]},{k:'type',l:'Type',type:'select',opts:FORM_TYPES.map(t=>t.id),labels:FORM_TYPES.map(t=>t.label)},{k:'intitule',l:'Intitulé formation',span:2},{k:'organisme',l:'Organisme'},{k:'cout',l:'Coût (€)',type:'number'},{k:'dateObtention',l:'Date obtention',type:'date'},{k:'dateExpiration',l:'Date expiration',type:'date'},{k:'statut',l:'Statut',type:'select',opts:FORM_STATUTS.map(s=>s.id),labels:FORM_STATUTS.map(s=>s.label)},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f => (
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='select'?<select value={formEdit[f.k]||''} onChange={e=>setFormEdit({...formEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={formEdit[f.k]||''} onChange={e=>setFormEdit({...formEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='number'?<input type="number" value={formEdit[f.k]||0} onChange={e=>setFormEdit({...formEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={formEdit[f.k]||''} onChange={e=>setFormEdit({...formEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={formEdit[f.k]||''} onChange={e=>setFormEdit({...formEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{data.find(f=>f.id===formEdit.id)&&<button onClick={()=>{saveFormD(data.filter(f=>f.id!==formEdit.id));setFormEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setFormEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(f=>f.id===formEdit.id);if(ex){saveFormD(data.map(f=>f.id===formEdit.id?formEdit:f));}else{saveFormD([...data,formEdit]);}setFormEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
        </div>);
}
