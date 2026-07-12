// === Onglet « tickets » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabTickets(__props) {
  const { $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $danger, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, crmRd, filterByFiliale, setTktData, setTktEdit, setTktFilter, setTktView, tktData, tktEdit, tktFilter, tktView } = __props;
        const TKT_PRIOS = [{id:'critique',label:'Critique',color:'#dc2626',icon:'▲▲'},{id:'haute',label:'Haute',color:'#ef4444',icon:'▲'},{id:'moyenne',label:'Moyenne',color:'#f59e0b',icon:'●'},{id:'basse',label:'Basse',color:'#10b981',icon:'▽'}];
        const TKT_STATUTS = [{id:'ouvert',label:'Ouvert',color:'#ef4444'},{id:'en_cours',label:'En cours',color:'#f59e0b'},{id:'resolu',label:'Résolu',color:'#10b981'},{id:'ferme',label:'Fermé',color:$textSec}];
        const TKT_CATS = [{id:'materiel',label:'Matériel'},{id:'logiciel',label:'Logiciel'},{id:'reseau',label:'Réseau'},{id:'acces',label:'Accès/Droits'},{id:'email',label:'Email'},{id:'demande',label:'Demande'},{id:'autre',label:'Autre'}];
        const saveTkt = d => { setTktData(d); localStorage.setItem('ruches_tkt_data', JSON.stringify(d)); };
        const sampleTkt = [
          {id:'TKT-001',titre:'PC portable ne démarre plus',demandeurId:'EMP010',demandeur:'Émilie ROCHE',filialeId:'yilmaz',filiale:'YILMAZ SAS',categorie:'materiel',priorite:'haute',statut:'en_cours',dateOuverture:'2026-02-20',assigneId:'EMP013',assigne:'Thomas MULLER',description:'Écran noir au démarrage, LED power clignote',resolution:'',dateFermeture:null},
          {id:'TKT-002',titre:'Accès Google Drive refusé',demandeurId:'EMP015',demandeur:'Julie MARTINEZ',filialeId:3,filiale:'Ezel Bâtiment',categorie:'acces',priorite:'moyenne',statut:'resolu',dateOuverture:'2026-02-18',assigneId:'EMP013',assigne:'Thomas MULLER',description:'Impossible d\'accéder au dossier Chantiers partagé',resolution:'Droits reconfigurés sur le Drive partagé Ezel',dateFermeture:'2026-02-19'},
          {id:'TKT-003',titre:'Imprimante Mutzig HS',demandeurId:'EMP014',demandeur:'Sarah CICCOLALLO',filialeId:'yilmaz',filiale:'YILMAZ SAS',categorie:'materiel',priorite:'basse',statut:'ouvert',dateOuverture:'2026-02-22',assigneId:null,assigne:'',description:'HP LaserJet — Bourrage papier récurrent, bac 2 bloqué',resolution:'',dateFermeture:null},
          {id:'TKT-004',titre:'Mise à jour Pennylane urgente',demandeurId:'EMP001',demandeur:'Özdoğan YILMAZ',filialeId:'yilmaz',filiale:'YILMAZ SAS',categorie:'logiciel',priorite:'critique',statut:'en_cours',dateOuverture:'2026-02-25',assigneId:'EMP013',assigne:'Thomas MULLER',description:'Nouvelle version API Pennylane v3 — migration nécessaire avant 31/03',resolution:'',dateFermeture:null},
          {id:'TKT-005',titre:'Création comptes email nouveaux',demandeurId:'EMP014',demandeur:'Sarah CICCOLALLO',filialeId:'yilmaz',filiale:'YILMAZ SAS',categorie:'email',priorite:'moyenne',statut:'ouvert',dateOuverture:'2026-02-24',assigneId:'EMP013',assigne:'Thomas MULLER',description:'2 nouveaux salariés Ezel en mars, créer Google Workspace',resolution:'',dateFermeture:null}
        ]
        const data = filterByFiliale(tktData.length > 0 ? tktData : sampleTkt);
        const filtered = data.filter(t => tktFilter === 'tous' || t.statut === tktFilter || t.priorite === tktFilter);
        const ouverts = data.filter(t=>t.statut==='ouvert').length;
        const enCoursTkt = data.filter(t=>t.statut==='en_cours').length;
        const resolus = data.filter(t=>['resolu','ferme'].includes(t.statut)).length;
        return (<div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:10}}>
            <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Tickets Support IT</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Demandes et incidents techniques</div></div>
            <div style={{display:'flex', gap:6}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>{[{id:'liste',l:'Liste'},{id:'kanban',l:'Kanban'}].map(v => <button key={v.id} onClick={()=>setTktView(v.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:tktView===v.id?$selBg:'transparent',color:tktView===v.id?$selText:$textMut,fontWeight:tktView===v.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{v.l}</button>)}</div>
              <button onClick={()=>setTktEdit({id:'TKT-'+String(data.length+1).padStart(3,'0'),titre:'',categorie:'autre',priorite:'moyenne',statut:'ouvert',demandeur:user?.prenom||'',filiale:'YILMAZ SAS',dateCreation:new Date().toISOString().slice(0,10),dateResolution:'',assigneA:'',description:'',resolution:''})} style={{padding:'6px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Ticket</button>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20}}>
            {[{l:'Ouverts',v:ouverts,c:$danger,ic:'🔴'},{l:'En cours',v:enCoursTkt,c:$warn,ic:'▸'},{l:'Résolus',v:resolus,c:$success,ic:'✓'},{l:'Total',v:data.length,c:$accent,ic:'◉'}].map((k,i)=>(
              <div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
              >
                <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                {k.ic&&<div style={{position:'absolute',top:10,right:14,fontSize:'1.2rem',opacity:0.1}}>{k.ic}</div>}
              </div>
            ))}
          </div>
          {tktView === 'kanban' && (<div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:12}}>
            {TKT_STATUTS.map(st => { const cards = filtered.filter(t=>t.statut===st.id); return (
              <div key={st.id} style={{minWidth:200,flex:'1 0 200px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$border}`,display:'flex',flexDirection:'column'}}>
                <div style={{padding:'10px 12px',borderBottom:'2px solid '+st.color,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontWeight:700,fontSize:'0.8rem',color:st.color}}>{st.label}</span><span style={{background:st.color+'20',color:st.color,fontWeight:800,fontSize:'0.72rem',padding:'2px 7px',borderRadius:crmRd}}>{cards.length}</span></div>
                <div style={{padding:6,flex:1,display:'flex',flexDirection:'column',gap:5,minHeight:60}}>
                  {cards.map(t => { const pr = TKT_PRIOS.find(p=>p.id===t.priorite); return (
                    <div key={t.id} onClick={()=>setTktEdit({...t})} style={{background:$bgCard,borderRadius:crmRd,padding:'8px 10px',border:`1px solid ${$borderAlt}`,cursor:'pointer',boxShadow:'0 1px 3px rgba(0,0,0,0.04)',borderLeft:'3px solid '+pr.color}}>
                      <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:2}}>{t.titre}</div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:3}}>
                        <span style={{fontSize:'0.65rem',color:$textMut}}>{t.demandeur}</span>
                        <span style={{fontSize:'0.62rem',padding:'1px 5px',borderRadius:crmRd,background:pr.color+'15',color:pr.color,fontWeight:700}}>{pr.icon} {pr.label}</span>
                      </div>
                    </div>); })}
                </div>
              </div>); })}
          </div>)}
          {tktView === 'liste' && (<>
            <select value={tktFilter} onChange={e=>setTktFilter(e.target.value)} style={{padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.78rem',marginBottom:14,fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
              <option value="tous">Tous</option>
              <optgroup label="Statut">{TKT_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>
              <optgroup label="Priorité">{TKT_PRIOS.map(p=><option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}</optgroup>
            </select>
            <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,boxShadow:$shadow}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
                <thead><tr style={{background:$bgSub}}>{['N°','Titre','Cat.','Priorité','Demandeur','Assigné','Date','Statut',''].map(h=><th key={h} style={{position:'relative',padding:'10px 8px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
                <tbody>{filtered.map(t => { const pr = TKT_PRIOS.find(p=>p.id===t.priorite); const st = TKT_STATUTS.find(s=>s.id===t.statut); const cat = TKT_CATS.find(c=>c.id===t.categorie); return (
                  <tr key={t.id} style={{borderBottom:`1px solid ${$border}`}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{padding:'8px',fontWeight:700,color:$accent,fontSize:'0.72rem'}}>{t.id}</td>
                    <td style={{padding:'8px',fontWeight:600,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.titre}</td>
                    <td style={{padding:'8px',fontSize:'0.72rem'}}>{cat?.label||t.categorie}</td>
                    <td style={{padding:'8px'}}><span style={{padding:'2px 6px',borderRadius:crmRd,background:pr.color+'15',color:pr.color,fontWeight:700,fontSize:'0.68rem'}}>{pr.icon} {pr.label}</span></td>
                    <td style={{padding:'8px',fontSize:'0.72rem'}}>{t.demandeurId ? <EmpLink id={t.demandeurId}/> : t.demandeur}</td>
                    <td style={{padding:'8px',fontSize:'0.72rem',color:t.assigneId||t.assigneExterne?'#2d2216':'#b0a08a'}}>{t.assigneId ? <EmpLink id={t.assigneId}/> : (t.assigneExterne || 'Non assigné')}</td>
                    <td style={{padding:'8px',fontSize:'0.72rem'}}>{t.dateCreation}</td>
                    <td style={{padding:'8px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:st.color+'18',color:st.color,display:'inline-flex',alignItems:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>
                    <td style={{padding:'8px'}}><button onClick={()=>setTktEdit({...t})} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.7rem',cursor:'pointer',color:$textSec,transition:'all 0.15s',fontFamily:'inherit'}}>✎</button></td>
                  </tr>); })}</tbody>
              </table>
            </div>
          </>)}
          {tktEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setTktEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:600,maxHeight:'88vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(t=>t.id===tktEdit.id)?'✎ Modifier':'➕ Nouveau'} ticket</span><button onClick={()=>setTktEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'titre',l:'Titre',span:2},{k:'categorie',l:'Catégorie',type:'select',opts:TKT_CATS.map(c=>c.id),labels:TKT_CATS.map(c=>c.label)},{k:'priorite',l:'Priorité',type:'select',opts:TKT_PRIOS.map(p=>p.id),labels:TKT_PRIOS.map(p=>p.label)},{k:'statut',l:'Statut',type:'select',opts:TKT_STATUTS.map(s=>s.id),labels:TKT_STATUTS.map(s=>s.label)},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte']},{k:'demandeur',l:'Demandeur'},{k:'assigneA',l:'Assigné à'},{k:'dateCreation',l:'Date création',type:'date'},{k:'dateResolution',l:'Date résolution',type:'date'},{k:'description',l:'Description',span:2,type:'textarea'},{k:'resolution',l:'Résolution',span:2,type:'textarea'}].map(f => (
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='select'?<select value={tktEdit[f.k]||''} onChange={e=>setTktEdit({...tktEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={tktEdit[f.k]||''} onChange={e=>setTktEdit({...tktEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={tktEdit[f.k]||''} onChange={e=>setTktEdit({...tktEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={tktEdit[f.k]||''} onChange={e=>setTktEdit({...tktEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{data.find(t=>t.id===tktEdit.id)&&<button onClick={()=>{saveTkt(data.filter(t=>t.id!==tktEdit.id));setTktEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setTktEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(t=>t.id===tktEdit.id);if(ex){saveTkt(data.map(t=>t.id===tktEdit.id?tktEdit:t));}else{saveTkt([...data,tktEdit]);}setTktEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
        </div>);
}
