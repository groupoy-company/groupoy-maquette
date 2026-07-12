// === Onglet « catalogue_presta » — extrait de App.jsx (modularisation, forme iife) ===
import React, {  } from 'react';

export default function TabCataloguePresta(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $shadowLg, $text, $textMut, $textSec, PrestaLink, cpData, cpEdit, cpFilter, cpSearch, crmRd, filiales, filterByFiliale, setCpData, setCpEdit, setCpFilter, setCpSearch } = __props;
        const saveCp = d => { setCpData(d); localStorage.setItem('ruches_cp_data', JSON.stringify(d)); };
        const CP_DOMAINES = [{id:'gros_oeuvre',label:'Gros œuvre',color:$accent},{id:'second_oeuvre',label:'Second œuvre',color:'#3b82f6'},{id:'echafaudage',label:'Échafaudage',color:'#f59e0b'},{id:'transport',label:'Transport',color:'#10b981'},{id:'location',label:'Location matériel',color:'#8b5cf6'},{id:'conseil',label:'Conseil/Juridique',color:'#6366f1'},{id:'it',label:'IT/Digital',color:'#ec4899'},{id:'rh',label:'RH/Formation',color:'#059669'},{id:'autre',label:'Autre',color:$textSec}];
        const CP_STATUTS = [{id:'actif',label:'Actif',color:'#10b981'},{id:'veille',label:'En veille',color:'#f59e0b'},{id:'blackliste',label:'Blacklisté',color:'#ef4444'}];
        const sampleCp = [
          {id:'CP-001',prestaId:'P001',nom:'Caroline MULLER — CM Finance',type:'Freelance',domaine:'conseil',specialite:'DAF externalisée',ville:'Strasbourg',evaluation:5,statut:'actif',contact:'06 12 34 56 78',tarifIndicatif:'650€/j',filiales:['yilmaz','ezel'],notes:'2j/semaine. Connaissance Pennylane, Excel avancé.'},
          {id:'CP-002',prestaId:'P002',nom:'OST Comptabilité',type:'Cabinet',domaine:'conseil',specialite:'Expert-comptable',ville:'Strasbourg',evaluation:4,statut:'actif',contact:'03 88 22 33 44',tarifIndicatif:'2800€/mois',filiales:['yilmaz'],notes:'Cabinet historique du groupe'},
          {id:'CP-003',prestaId:'P003',nom:'WÜRTH France',type:'Fournisseur',domaine:'gros_oeuvre',specialite:'Visserie, fixations, outillage BTP',ville:'Erstein',evaluation:4,statut:'actif',contact:'Agence Erstein',tarifIndicatif:'Catalogue -18%',filiales:['ezel','echafaudage'],notes:'Contrat-cadre remise 18%, livraison J+2'},
          {id:'CP-004',prestaId:'P004',nom:'Karim BENALI — KB Dev',type:'Freelance',domaine:'it',specialite:'Dev full-stack React/Node',ville:'Strasbourg',evaluation:5,statut:'actif',contact:'06 45 67 89 01',tarifIndicatif:'450€/j',filiales:['yilmaz'],notes:'Portail YILMAZ, sites filiales. Ponctuel.'},
          {id:'CP-005',prestaId:'P005',nom:'NOVATECH Informatique',type:'SSII',domaine:'it',specialite:'Infogérance IT',ville:'Schiltigheim',evaluation:3,statut:'actif',contact:'03 88 33 44 55',tarifIndicatif:'890€/mois',filiales:['yilmaz'],notes:'Serveur, backup, support. Réactivité moyenne.'},
          {id:'CP-006',prestaId:'P006',nom:'Cabinet MEYER Avocats',type:'Cabinet',domaine:'conseil',specialite:'Droit social & construction',ville:'Strasbourg',evaluation:5,statut:'actif',contact:'03 88 11 22 33',tarifIndicatif:'250€/h',filiales:['yilmaz','ezel'],notes:'Spécialiste prud\'hommes BTP. Très compétent.'},
          {id:'CP-007',prestaId:'P007',nom:'Léa Graphisme',type:'Freelance',domaine:'autre',specialite:'Identité visuelle, webdesign',ville:'Mulhouse',evaluation:4,statut:'actif',contact:'06 78 90 12 34',tarifIndicatif:'350€/j',filiales:['yilmaz'],notes:'Auto-entrepreneur. Charte livrée en 2025.'},
          {id:'CP-008',prestaId:null,nom:'POINT P',type:'Fournisseur',domaine:'gros_oeuvre',specialite:'Matériaux de construction',ville:'Molsheim',evaluation:3,statut:'actif',contact:'Agence Molsheim',tarifIndicatif:'Catalogue',filiales:['ezel'],notes:'Béton, parpaings, ciment. Livraison chantier possible.'},
          {id:'CP-009',prestaId:null,nom:'KILOUTOU',type:'Fournisseur',domaine:'location',specialite:'Location matériel BTP',ville:'Strasbourg',evaluation:4,statut:'actif',contact:'03 88 55 66 77',tarifIndicatif:'Devis',filiales:['ezel','echafaudage'],notes:'Nacelles, chariots, compresseurs. Bon service.'},
          {id:'CP-010',prestaId:null,nom:'LOXAM',type:'Fournisseur',domaine:'location',specialite:'Location engins & outillage',ville:'Obernai',evaluation:4,statut:'actif',contact:'03 88 77 88 99',tarifIndicatif:'Devis',filiales:['ezel','roulotte'],notes:'Pièces détachées aussi disponibles.'}
        ]
        const data = filterByFiliale(cpData.length > 0 ? cpData : sampleCp);
        const filtered = data.filter(d => (cpFilter==='tous'||d.statut===cpFilter||d.domaine===cpFilter) && (cpSearch===''||d.nom.toLowerCase().includes(cpSearch.toLowerCase())||d.domaine.toLowerCase().includes(cpSearch.toLowerCase())));
        const starsR = (n) => '★'.repeat(n) + '☆'.repeat(5-n);
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Catalogue Prestataires</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>{data.filter(d=>d.statut==='actif').length} actifs — {data.length} au total</div></div>
              <div style={{display:'flex',gap:8}}>
                <input placeholder="Rechercher..." value={cpSearch} onChange={e=>setCpSearch(e.target.value)} style={{padding:'7px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',width:160}}/>
                <button onClick={() => setCpEdit({id:'CP-'+String(data.length+1).padStart(3,'0'),nom:'',siret:'',domaine:'gros_oeuvre',statut:'actif',contact:'',email:'',tel:'',ville:'',rcPro:false,tarifJour:0,conditions:'',evaluation:3,notes:'',missions:0})} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Prestataire</button>
              </div>
            </div>
            <div style={{display:'flex', gap:6, marginBottom:14, flexWrap:'wrap'}}>
              <button onClick={()=>setCpFilter('tous')} style={{padding:'5px 12px',borderRadius:crmRd,border: cpFilter==='tous'?`2px solid ${$accent}`:`1px solid ${$border}`,background: cpFilter==='tous'?'#faf6ef':'white',fontWeight:700,fontSize:'0.8rem',color: cpFilter==='tous'?'#8B6F47':'#6b5d4d',cursor:'pointer'}}>Tous</button>
              {CP_STATUTS.map(s => <button key={s.id} onClick={()=>setCpFilter(s.id)} style={{padding:'5px 12px',borderRadius:crmRd,border: cpFilter===s.id?'2px solid '+s.color:`1px solid ${$border}`,background: cpFilter===s.id?s.color+'12':'white',fontWeight:700,fontSize:'0.8rem',color: cpFilter===s.id?s.color:$textSec,cursor:'pointer'}}>{s.label}</button>)}
              <span style={{borderLeft:`1px solid ${$borderAlt}`, margin:'0 4px'}}/>
              {CP_DOMAINES.slice(0,6).map(d => <button key={d.id} onClick={()=>setCpFilter(cpFilter===d.id?'tous':d.id)} style={{padding:'5px 10px',borderRadius:crmRd,border: cpFilter===d.id?'2px solid '+d.color:`1px solid ${$border}`,background: cpFilter===d.id?d.color+'12':'white',fontWeight:600,fontSize:'0.75rem',color: cpFilter===d.id?d.color:$textSec,cursor:'pointer'}}>{d.label}</button>)}
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:12}}>
              {filtered.map(p => {
                const dom = CP_DOMAINES.find(d=>d.id===p.domaine)||CP_DOMAINES[8];
                const stat = CP_STATUTS.find(s=>s.id===p.statut)||CP_STATUTS[0];
                return <div key={p.id} onClick={()=>setCpEdit({...p})} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'14px 18px',cursor:'pointer',borderLeft:'3px solid '+dom.color, opacity: p.statut==='blackliste'?0.6:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:'0.92rem',color:$text}}>{p.prestaId ? <PrestaLink id={p.prestaId}/> : p.nom}</div>
                      <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>{p.ville} — SIRET: {p.siret}</div>
                    </div>
                    <span style={{padding:'2px 8px',borderRadius:crmRd,background:stat.color+'15',color:stat.color,fontWeight:700,fontSize:'0.7rem'}}>{stat.label}</span>
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
                    <span style={{padding:'2px 8px',borderRadius:crmRd,background:dom.color+'12',color:dom.color,fontWeight:600,fontSize:'0.7rem'}}>{dom.label}</span>
                    {p.rcPro && <span style={{padding:'2px 8px',borderRadius:crmRd,background:'#dcfce7',color:'#15803d',fontWeight:600,fontSize:'0.7rem'}}>RC Pro ✓</span>}
                    {p.tarifJour > 0 && <span style={{padding:'2px 8px',borderRadius:crmRd,background:$info+'12',color:'#3b82f6',fontWeight:600,fontSize:'0.7rem'}}>{p.tarifJour}€/j</span>}
                    <span style={{padding:'2px 8px',borderRadius:crmRd,background:$bgSub,color:$accent,fontWeight:600,fontSize:'0.7rem'}}>{p.missions} missions</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <span style={{fontSize:'0.72rem',color:$textSec}}>{p.contact} — {p.tel}</span>
                    <span style={{color:'#d4a030',fontSize:'0.8rem'}}>{starsR(p.evaluation)}</span>
                  </div>
                </div>;
              })}
            </div>
            {cpEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setCpEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:600,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$borderAlt}`,display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>{data.find(d=>d.id===cpEdit.id)?'✎ Modifier':'+ Nouveau'} prestataire</span><button onClick={()=>setCpEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
              <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[{k:'nom',l:'Raison sociale',span:2},{k:'siret',l:'SIRET'},{k:'ville',l:'Ville'},{k:'domaine',l:'Domaine',type:'select',opts:CP_DOMAINES.map(d=>d.id),labels:CP_DOMAINES.map(d=>d.label)},{k:'statut',l:'Statut',type:'select',opts:CP_STATUTS.map(s=>s.id),labels:CP_STATUTS.map(s=>s.label)},{k:'contact',l:'Contact'},{k:'email',l:'Email'},{k:'tel',l:'Téléphone'},{k:'tarifJour',l:'Tarif jour (€)',type:'number'},{k:'conditions',l:'Conditions paiement',span:2},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f => (
                  <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                    {f.type==='select'?<select value={cpEdit[f.k]||''} onChange={e=>setCpEdit({...cpEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                    :f.type==='textarea'?<textarea value={cpEdit[f.k]||''} onChange={e=>setCpEdit({...cpEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                    :f.type==='number'?<input type="number" value={cpEdit[f.k]||0} onChange={e=>setCpEdit({...cpEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                    :<input value={cpEdit[f.k]||''} onChange={e=>setCpEdit({...cpEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                  </div>
                ))}
                <div style={{gridColumn:'span 2'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>RC Pro</label><label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}><input type="checkbox" checked={cpEdit.rcPro||false} onChange={e=>setCpEdit({...cpEdit,rcPro:e.target.checked})}/><span style={{fontSize:'0.82rem'}}>Attestation RC Pro à jour</span></label></div>
                <div style={{gridColumn:'span 2'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Évaluation</label><div style={{display:'flex',gap:4}}>{[1,2,3,4,5].map(n=><span key={n} onClick={()=>setCpEdit({...cpEdit,evaluation:n})} style={{cursor:'pointer',fontSize:'1.4rem',color:n<=cpEdit.evaluation?'#d4a030':'#e8e4de'}}>★</span>)}</div></div>
              </div>
              <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                <div>{data.find(d=>d.id===cpEdit.id)&&<button onClick={()=>{saveCp(data.filter(d=>d.id!==cpEdit.id));setCpEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
                <div style={{display:'flex',gap:6}}><button onClick={()=>setCpEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(d=>d.id===cpEdit.id);if(ex){saveCp(data.map(d=>d.id===cpEdit.id?cpEdit:d));}else{saveCp([...data,cpEdit]);}setCpEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
              </div>
            </div></div>)}
          </div>
        );
}
