// === Onglet « outils » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabOutils(__props) {
  const { $accent, $bgCard, $bgSub, $border, $danger, $shadow, $shadowLg, $text, $textMut, $textSec, chantiers, crmRd, empNom, otData, otEdit, setOtData, setOtEdit } = __props;
        const OT_CATS = [{id:'saas',label:'SaaS',color:'#3b82f6'},{id:'licence',label:'Licence',color:'#8b5cf6'},{id:'materiel',label:'Matériel',color:'#f59e0b'},{id:'interne',label:'Outil interne',color:'#10b981'}];
        const OT_STATUTS = [{id:'actif',label:'Actif',color:'#10b981'},{id:'essai',label:'En essai',color:'#f59e0b'},{id:'suspendu',label:'Suspendu',color:$textSec},{id:'resilie',label:'Résilié',color:'#ef4444'}];
        const saveOt = d => { setOtData(d); localStorage.setItem('ruches_ot_data', JSON.stringify(d)); };
        const sampleOt = [
          {id:'OT-001',nom:'Google Workspace Business',categorie:'saas',statut:'actif',editeur:'Google',nbLicences:16,coutMensuel:192,coutAnnuel:2304,dateRenouvellement:'2026-12-31',responsableId:'EMP013',url:'workspace.google.com',notes:'16 comptes @ezel.fr + @yilmaz-services.fr'},
          {id:'OT-002',nom:'Pennylane',categorie:'saas',statut:'actif',editeur:'Pennylane SAS',nbLicences:3,coutMensuel:149,coutAnnuel:1788,dateRenouvellement:'2026-12-31',responsableId:'EMP003',url:'app.pennylane.com',notes:'Compta multi-sociétés. 3 accès (compta, DAF, DG)'},
          {id:'OT-003',nom:'Sage Paie',categorie:'licence',statut:'actif',editeur:'Sage',nbLicences:2,coutMensuel:0,coutAnnuel:1950,dateRenouvellement:'2026-06-30',responsableId:'EMP014',url:'',notes:'Licence perpétuelle + maintenance annuelle. OST gère.'},
          {id:'OT-004',nom:'AutoCAD LT',categorie:'saas',statut:'actif',editeur:'Autodesk',nbLicences:1,coutMensuel:0,coutAnnuel:480,dateRenouvellement:'2026-09-30',responsableId:'EMP005',url:'',notes:'Pour plans et métrés chantiers'},
          {id:'OT-005',nom:'Microsoft 365',categorie:'saas',statut:'actif',editeur:'Microsoft',nbLicences:4,coutMensuel:48,coutAnnuel:576,dateRenouvellement:'2026-12-31',responsableId:'EMP013',url:'',notes:'4 licences Business Basic pour accès Excel/Teams ponctuel'},
          {id:'OT-006',nom:'Figma',categorie:'saas',statut:'essai',editeur:'Figma',nbLicences:1,coutMensuel:0,coutAnnuel:0,dateRenouvellement:'',responsableId:'EMP013',url:'figma.com',notes:'Test pour maquettes portail. Gratuit starter.'},
          {id:'OT-007',nom:'Simulateur Ruches',categorie:'interne',statut:'actif',editeur:'Interne (KB Dev)',nbLicences:1,coutMensuel:0,coutAnnuel:0,dateRenouvellement:'',responsableId:'EMP001',url:'',notes:'Portail de gestion Group OY — 21 modules'}
        ]
        const data = otData.length > 0 ? otData : sampleOt;
        const totalAnnuel = data.filter(o=>o.statut==='actif').reduce((s,o)=>s+o.coutAnnuel,0);
        const totalLicences = data.filter(o=>o.statut==='actif').reduce((s,o)=>s+o.nbLicences,0);
        return (<div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:10}}>
            <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Outils & Licences</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>Inventaire des logiciels et outils numériques du groupe</div></div>
            <button onClick={()=>setOtEdit({id:'OT-'+String(data.length+1).padStart(3,'0'),nom:'',categorie:'saas',statut:'actif',editeur:'',nbLicences:1,coutMensuel:0,coutAnnuel:0,dateRenouvellement:'',responsable:'',url:'',notes:''})} style={{padding:'8px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Outil</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:8, marginBottom:16}}>
            {[{l:'Coût annuel total',v:totalAnnuel.toLocaleString('fr-FR')+'€',c:'#8B6F47',bg:'#faf6ef'},{l:'Outils actifs',v:data.filter(o=>o.statut==='actif').length,c:'#10b981',bg:'#f0fdf4'},{l:'Licences totales',v:totalLicences,c:'#3b82f6',bg:'#eff6ff'},{l:'Coût/mois moyen',v:Math.round(totalAnnuel/12).toLocaleString('fr-FR')+'€',c:'#f59e0b',bg:'#fffbeb'}].map((k,i)=>(
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
          <div style={{display:'grid', gap:10, gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {data.map(o => { const cat = OT_CATS.find(c=>c.id===o.categorie); const st = OT_STATUTS.find(s=>s.id===o.statut); return (
              <div key={o.id} onClick={()=>setOtEdit({...o})} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'14px 16px',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.03)',borderTop:'3px solid '+cat.color,transition:'all 0.15s'}} onMouseOver={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'} onMouseOut={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)'}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div><div style={{fontWeight:800,fontSize:'0.95rem',color:$text}}>{o.nom}</div><div style={{fontSize:'0.72rem',color:$accent}}>{o.editeur}</div></div>
                  <span style={{padding:'2px 7px',borderRadius:crmRd,background:st.color+'15',color:st.color,fontWeight:700,fontSize:'0.68rem'}}>{st.label}</span>
                </div>
                <div style={{display:'flex',gap:12,fontSize:'0.72rem',color:$textSec,marginBottom:6}}>
                  <span><strong>{o.nbLicences}</strong> licences</span>
                  <span><strong>{o.coutAnnuel.toLocaleString('fr-FR')}€</strong>/an</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{padding:'2px 6px',borderRadius:crmRd,background:cat.color+'12',color:cat.color,fontWeight:600,fontSize:'0.65rem'}}>{cat.label}</span>
                  <span style={{fontSize:'0.65rem',color:$textMut}}>{o.responsableId ? empNom(o.responsableId) : '—'}</span>
                </div>
                {o.dateRenouvellement && <div style={{marginTop:6,fontSize:'0.65rem',color:$textMut}}>Renouvellement : {o.dateRenouvellement}</div>}
              </div>); })}
          </div>
          {otEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setOtEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:580,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(o=>o.id===otEdit.id)?'✎ Modifier':'➕ Nouvel'} outil</span><button onClick={()=>setOtEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'nom',l:"Nom de l'outil",span:2},{k:'editeur',l:'Éditeur'},{k:'categorie',l:'Catégorie',type:'select',opts:OT_CATS.map(c=>c.id),labels:OT_CATS.map(c=>c.label)},{k:'statut',l:'Statut',type:'select',opts:OT_STATUTS.map(s=>s.id),labels:OT_STATUTS.map(s=>s.label)},{k:'nbLicences',l:'Nb licences',type:'number'},{k:'coutMensuel',l:'Coût mensuel (€)',type:'number'},{k:'coutAnnuel',l:'Coût annuel (€)',type:'number'},{k:'dateRenouvellement',l:'Date renouvellement',type:'date'},{k:'responsable',l:'Responsable'},{k:'url',l:'URL',span:2},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f => (
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='select'?<select value={otEdit[f.k]||''} onChange={e=>setOtEdit({...otEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={otEdit[f.k]||''} onChange={e=>setOtEdit({...otEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='number'?<input type="number" value={otEdit[f.k]||0} onChange={e=>setOtEdit({...otEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={otEdit[f.k]||''} onChange={e=>setOtEdit({...otEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={otEdit[f.k]||''} onChange={e=>setOtEdit({...otEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{data.find(o=>o.id===otEdit.id)&&<button onClick={()=>{saveOt(data.filter(o=>o.id!==otEdit.id));setOtEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setOtEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(o=>o.id===otEdit.id);if(ex){saveOt(data.map(o=>o.id===otEdit.id?otEdit:o));}else{saveOt([...data,otEdit]);}setOtEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
        </div>);
}
