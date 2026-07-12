// === Onglet « contrats » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabContrats(__props) {
  const { $accent, $bgCard, $bgCardHover, $bgSub, $border, $danger, $info, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, crmRd, ctrData, ctrEdit, ctrFilter, filiales, filterByFiliale, setCtrData, setCtrEdit, setCtrFilter } = __props;
        const CTR_TYPES = [{id:'client',label:'Client',color:'#10b981'},{id:'fournisseur',label:'Fournisseur',color:'#3b82f6'},{id:'sous_traitant',label:'Sous-traitant',color:'#f59e0b'},{id:'bail',label:'Bail',color:'#8b5cf6'},{id:'assurance',label:'Assurance',color:'#6366f1'},{id:'autre',label:'Autre',color:$textSec}];
        const CTR_STATUTS = [{id:'actif',label:'Actif',color:'#10b981'},{id:'expire_bientot',label:'Expire bientôt',color:'#f59e0b'},{id:'expire',label:'Expiré',color:'#ef4444'},{id:'resilie',label:'Résilié',color:$textSec}];
        const saveCtr = d => { setCtrData(d); localStorage.setItem('ruches_ctr_data', JSON.stringify(d)); };
        const sampleCtr = [
          {id:'CTR-001',titre:'Marché Résidence Colmar Centre',type:'client',partenaire:'Mairie de Colmar',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH001',responsableId:'EMP003',montant:850000,dateDebut:'2025-06-01',dateFin:'2026-12-31',statut:'actif',renouvellement:'non',alerteJours:90,notes:'Marché public — Lot Gros Œuvre + Façades'},
          {id:'CTR-002',titre:'Contrat-cadre fournitures',type:'fournisseur',partenaire:'WÜRTH France',filialeId:3,filiale:'Ezel Bâtiment',chantierId:null,responsableId:'EMP003',montant:45000,dateDebut:'2025-01-01',dateFin:'2026-12-31',statut:'actif',renouvellement:'annuel',alerteJours:60,notes:'Remise 18% sur catalogue, livraison J+2'},
          {id:'CTR-003',titre:'Prestation DAF externalisée',type:'fournisseur',partenaire:'CM Finance Conseil (Caroline Muller)',prestaId:'P001',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,responsableId:'EMP001',montant:62400,dateDebut:'2024-09-01',dateFin:'2025-08-31',statut:'actif',renouvellement:'tacite',alerteJours:90,notes:'2j/semaine, 5200€/mois. Renouvellement tacite par périodes de 12 mois'},
          {id:'CTR-004',titre:'Bail commercial — Dépôt Mutzig',type:'bail',partenaire:'SCI Mutzig Industrie',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,responsableId:'EMP001',montant:36000,dateDebut:'2022-01-01',dateFin:'2028-12-31',statut:'actif',renouvellement:'bail 3-6-9',alerteJours:180,notes:'12 rue de l\'Industrie. 3000€/mois charges comprises. Révision indexée ILC'},
          {id:'CTR-005',titre:'RC Pro Group OY',type:'assurance',partenaire:'AXA Entreprises',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,responsableId:'EMP001',montant:8500,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',renouvellement:'annuel',alerteJours:60,notes:'Couvre toutes filiales, franchise 1500€'},
          {id:'CTR-006',titre:'Sous-traitance Électricité',type:'sous_traitant',partenaire:'ELEC PRO 67',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH003',responsableId:'EMP003',montant:95000,dateDebut:'2025-09-01',dateFin:'2026-06-30',statut:'actif',renouvellement:'non',alerteJours:30,notes:'Lot CFA/CFO complet. Paiement 45j fin de mois'},
          {id:'CTR-007',titre:'Maintenance échafaudages',type:'fournisseur',partenaire:'LAYHER France',filialeId:2,filiale:"L'Échafaudage",chantierId:null,responsableId:'EMP012',montant:12000,dateDebut:'2025-03-01',dateFin:'2026-02-28',statut:'expire_bientot',renouvellement:'annuel',alerteJours:60,notes:'Contrôle annuel + remplacement pièces usées'},
          {id:'CTR-008',titre:'Infogérance IT',type:'fournisseur',partenaire:'NOVATECH Informatique',prestaId:'P005',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,responsableId:'EMP013',montant:10680,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',renouvellement:'annuel',alerteJours:60,notes:'890€/mois. Serveur, backup, support N1/N2'}
        ]
        const data = filterByFiliale(ctrData.length > 0 ? ctrData : sampleCtr);
        const filtered = data.filter(c => ctrFilter === 'tous' || c.type === ctrFilter || c.statut === ctrFilter);
        const montantTotal = data.filter(c=>c.statut==='actif').reduce((s,c)=>s+c.montant,0);
        const expirants = data.filter(c=>c.statut==='expire_bientot').length;
        return (<div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:10}}>
            <div>
              <h2 style={{margin:'0 0 2px',fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Suivi Contrats</h2>
              <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Registre centralisé des contrats du groupe</p>
            </div>
            <button onClick={()=>setCtrEdit({id:'CTR-'+String(data.length+1).padStart(3,'0'),titre:'',type:'client',partenaire:'',filiale:'YILMAZ SAS',dateDebut:'',dateFin:'',montant:0,statut:'actif',renouvellement:'annuel',clauses:'',alerteJours:60,notes:''})} style={{padding:'8px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Contrat</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:20}}>
            {[{l:'Contrats actifs',v:data.filter(c=>c.statut==='actif').length,c:$success,ic:'✓'},{l:'Montant engagé',v:montantTotal.toLocaleString('fr-FR')+'€',c:$accent,ic:'◫'},{l:'Expire bientôt',v:expirants,c:$warn,ic:'▲'},{l:'Total',v:data.length,c:$info,ic:'◉'}].map((k,i)=>(
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
          <select value={ctrFilter} onChange={e=>setCtrFilter(e.target.value)} style={{padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.78rem',marginBottom:14,fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
            <option value="tous">Tous</option>
            <optgroup label="Type">{CTR_TYPES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</optgroup>
            <optgroup label="Statut">{CTR_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>
          </select>
          <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,boxShadow:$shadow}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
              <thead><tr style={{background:$bgSub}}>{['Titre','Type','Partenaire','Filiale','Début','Fin','Montant','Statut',''].map(h=><th key={h} style={{position:'relative',padding:'10px 8px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
              <tbody>{filtered.map(c => { const tp = CTR_TYPES.find(t=>t.id===c.type); const st = CTR_STATUTS.find(s=>s.id===c.statut); return (
                <tr key={c.id} style={{borderBottom:`1px solid ${$border}`}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'8px',fontWeight:700,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.titre}</td>
                  <td style={{padding:'8px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:tp.color+'18',color:tp.color,display:'inline-flex',alignItems:'center',gap:4}}>{tp.label}</span></td>
                  <td style={{padding:'8px',fontSize:'0.75rem'}}>{c.prestaId ? <PrestaLink id={c.prestaId}/> : c.partenaire}</td>
                  <td style={{padding:'8px',fontSize:'0.72rem'}}><FilLink id={c.filialeId}/></td>
                  <td style={{padding:'8px',fontSize:'0.72rem'}}>{c.dateDebut}</td>
                  <td style={{padding:'8px',fontSize:'0.72rem',fontWeight:st.id==='expire_bientot'?700:400,color:st.id==='expire_bientot'?'#f59e0b':st.id==='expire'?'#ef4444':'inherit'}}>{c.dateFin}</td>
                  <td style={{padding:'8px',fontWeight:700}}>{c.montant.toLocaleString('fr-FR')}€</td>
                  <td style={{padding:'8px'}}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:st.color+'18',color:st.color,display:'inline-flex',alignItems:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>
                  <td style={{padding:'8px'}}><button onClick={()=>setCtrEdit({...c})} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.7rem',cursor:'pointer',color:$textSec,transition:'all 0.15s',fontFamily:'inherit'}}>✎</button></td>
                </tr>); })}</tbody>
            </table>
          </div>
          {ctrEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setCtrEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:600,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(c=>c.id===ctrEdit.id)?'✎ Modifier':'+ Nouveau'} contrat</span><button onClick={()=>setCtrEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'titre',l:'Titre du contrat',span:2},{k:'type',l:'Type',type:'select',opts:CTR_TYPES.map(t=>t.id),labels:CTR_TYPES.map(t=>t.label)},{k:'statut',l:'Statut',type:'select',opts:CTR_STATUTS.map(s=>s.id),labels:CTR_STATUTS.map(s=>s.label)},{k:'partenaire',l:'Partenaire',span:2},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte']},{k:'renouvellement',l:'Renouvellement',type:'select',opts:['annuel','tacite','3-6-9','non']},{k:'dateDebut',l:'Date début',type:'date'},{k:'dateFin',l:'Date fin',type:'date'},{k:'montant',l:'Montant (€)',type:'number'},{k:'alerteJours',l:'Alerte (j avant)',type:'number'},{k:'clauses',l:'Clauses clés',span:2,type:'textarea'},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f => (
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='select'?<select value={ctrEdit[f.k]||''} onChange={e=>setCtrEdit({...ctrEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={ctrEdit[f.k]||''} onChange={e=>setCtrEdit({...ctrEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='number'?<input type="number" value={ctrEdit[f.k]||0} onChange={e=>setCtrEdit({...ctrEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={ctrEdit[f.k]||''} onChange={e=>setCtrEdit({...ctrEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={ctrEdit[f.k]||''} onChange={e=>setCtrEdit({...ctrEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{data.find(c=>c.id===ctrEdit.id)&&<button onClick={()=>{saveCtr(data.filter(c=>c.id!==ctrEdit.id));setCtrEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setCtrEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(c=>c.id===ctrEdit.id);if(ex){saveCtr(data.map(c=>c.id===ctrEdit.id?ctrEdit:c));}else{saveCtr([...data,ctrEdit]);}setCtrEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
        </div>);
}
