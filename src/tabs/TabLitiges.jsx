// === Onglet « litiges » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabLitiges(__props) {
  const { $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $danger, $selBg, $selText, $shadow, $shadowLg, $text, $textMut, $textSec, ChLink, FilLink, crmRd, filterByFiliale, highlightStyle, litData, litEdit, litFilter, setLitData, setLitEdit, setLitFilter } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const saveLit = d => { setLitData(d); localStorage.setItem('ruches_lit_data', JSON.stringify(d)); };
        const LIT_TYPES = [{id:'client',label:'Client',color:'#3b82f6'},{id:'fournisseur',label:'Fournisseur',color:'#f59e0b'},{id:'sous_traitant',label:'Sous-traitant',color:'#8b5cf6'},{id:'salarie',label:'Salarié',color:'#ec4899'},{id:'assurance',label:'Assurance',color:'#6366f1'}];
        const LIT_STATUTS = [{id:'ouvert',label:'Ouvert',color:'#ef4444'},{id:'negociation',label:'Négociation',color:'#f59e0b'},{id:'procedure',label:'Procédure judiciaire',color:'#dc2626'},{id:'resolu',label:'Résolu',color:'#10b981'},{id:'classe',label:'Classé',color:$textSec}];
        const sampleLit = [
          {id:'LIT-001',type:'sous_traitant',titre:'Retard livraison béton — Colmar',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH001',chantier:'Résidence Colmar',adversaire:'Béton Express SARL',responsableId:'EMP005',montantEnJeu:15000,statut:'negociation',dateOuverture:'2025-12-15',dateFermeture:null,notes:'3 semaines de retard sur livraison béton C25/30, pénalités contractuelles demandées'},
          {id:'LIT-002',type:'client',titre:'Malfaçon étanchéité signalée',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH004',chantier:'Maison individuelle Obernai',adversaire:'M. et Mme SCHMITT',responsableId:'EMP005',montantEnJeu:8500,statut:'ouvert',dateOuverture:'2026-01-20',dateFermeture:null,notes:'Infiltration signalée 6 mois après réception. Expertise en cours.'},
          {id:'LIT-003',type:'salarie',titre:'Contestation licenciement',filialeId:3,filiale:'Ezel Bâtiment',chantierId:null,chantier:'',adversaire:'Ex-salarié M. DURAND',responsableId:'EMP001',montantEnJeu:25000,statut:'procedure',dateOuverture:'2025-09-01',dateFermeture:null,notes:'Prud\'hommes Strasbourg. Audience prévue avril 2026. Cabinet Meyer mandaté.'},
          {id:'LIT-004',type:'fournisseur',titre:'Facture contestée POINT P',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH003',chantier:'Rénovation Strasbourg',adversaire:'POINT P Molsheim',responsableId:'EMP005',montantEnJeu:3200,statut:'resolu',dateOuverture:'2025-11-05',dateFermeture:'2026-01-15',notes:'Double facturation matériaux. Avoir obtenu.'},
          {id:'LIT-005',type:'assurance',titre:'Sinistre véhicule La Roulotte',filialeId:1,filiale:'La Roulotte',chantierId:null,chantier:'',adversaire:'MAIF (assurance tiers)',responsableId:'EMP015',montantEnJeu:4800,statut:'negociation',dateOuverture:'2026-02-05',dateFermeture:null,notes:'Accrochage camion livraison. Franchise 500€. Expert mandaté.'}
        ]
        const data = filterByFiliale(litData.length > 0 ? litData : sampleLit);
        const filtered = litFilter === 'tous' ? data : data.filter(d => d.statut === litFilter || d.type === litFilter);
        const totalEnJeu = data.filter(d=>d.statut!=='resolu'&&d.statut!=='classe').reduce((s,d)=>s+d.montantEnJeu,0);
        const totalProvision = data.reduce((s,d)=>s+d.provision,0);
        const litGrouper = window.__litGrouper || 'none';
        const setLitGrouper = (v) => { window.__litGrouper = v; setLitFilter(litFilter); };
        const grouped = litGrouper !== 'none'
          ? (litGrouper === 'type'
            ? LIT_TYPES.map(t=>({key:t.id,label:t.label,color:t.color,items:filtered.filter(l=>l.type===t.id)})).filter(g=>g.items.length>0)
            : LIT_STATUTS.map(s=>({key:s.id,label:s.label,color:s.color,items:filtered.filter(l=>l.statut===s.id)})).filter(g=>g.items.length>0))
          : [{key:'all',label:'',color:'',items:filtered}];

        return (
          <div>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:'linear-gradient(90deg,#dc2626 0%,#f59e0b 50%,#10b981 100%)'}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:'#dc2626',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>§</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Suivi Litiges</h2>
                        {data.filter(d=>d.statut==='procedure').length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#dc262615',color:'#dc2626',fontWeight:700,border:'1px solid #dc262630'}}>{data.filter(d=>d.statut==='procedure').length} en procédure</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>{data.filter(d=>!['resolu','classe'].includes(d.statut)).length} litiges actifs · {fmt(totalEnJeu)} en jeu</p>
                    </div>
                  </div>
                  <button onClick={() => setLitEdit({id:'LIT-'+String(data.length+1).padStart(3,'0'),titre:'',type:'client',filiale:'Ezel Bâtiment',statut:'ouvert',montantEnJeu:0,provision:0,dateOuverture:new Date().toISOString().slice(0,10),adversaire:'',avocat:'',description:'',historique:''})} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#dc2626',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Nouveau litige
                  </button>
                </div>
                {/* KPI mini row */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`}}>
                  {LIT_STATUTS.map(st=>{
                    const n=data.filter(d=>d.statut===st.id).length;
                    const m=data.filter(d=>d.statut===st.id).reduce((s,d)=>s+d.montantEnJeu,0);
                    return(<div key={st.id} style={{display:'flex',flexDirection:'column',gap:1,cursor:'pointer',padding:'6px 8px',borderRadius:crmRd,border:`1px solid ${litFilter===st.id?st.color:$border}`,background:litFilter===st.id?st.color+'10':'transparent',transition:'all 0.15s'}} onClick={()=>setLitFilter(p=>p===st.id?'tous':st.id)}>
                      <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:2}}>
                        <span style={{width:6,height:6,borderRadius:'50%',background:st.color,flexShrink:0}}/>
                        <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700}}>{st.label}</div>
                      </div>
                      <div style={{fontSize:'1.2rem',fontWeight:800,color:st.color,letterSpacing:'-0.02em'}}>{n}</div>
                      {m>0&&<div style={{fontSize:'0.66rem',color:$textMut}}>{fmt(m)}</div>}
                    </div>);
                  })}
                </div>
              </div>
            </div>

            {/* ── FILTER BAR ── */}
            <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>
                {[{id:'tous',l:'Tous'},{id:'client',l:'Clients'},{id:'fournisseur',l:'Fournisseurs'},{id:'sous_traitant',l:'Sous-traitants'},{id:'salarie',l:'Salariés'},{id:'assurance',l:'Assurances'}].map(v=>(
                  <button key={v.id} onClick={()=>setLitFilter(v.id)} style={{padding:'5px 12px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:litFilter===v.id?$selBg:'transparent',color:litFilter===v.id?$selText:$textMut,fontWeight:litFilter===v.id?600:400,fontSize:'0.75rem',fontFamily:'inherit'}}>{v.l}</button>
                ))}
              </div>
              <div style={{marginLeft:'auto',display:'flex',gap:6,alignItems:'center'}}>
                <span style={{fontSize:'0.72rem',color:$textMut}}>Grouper&nbsp;:</span>
                {[{id:'none',l:'Aucun'},{id:'statut',l:'Statut'},{id:'type',l:'Type'}].map(v=>(
                  <button key={v.id} onClick={()=>setLitGrouper(v.id)} style={{padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${litGrouper===v.id?$accent:$border}`,cursor:'pointer',background:litGrouper===v.id?$accentSub:'transparent',color:litGrouper===v.id?$accent:$textSec,fontWeight:litGrouper===v.id?600:400,fontSize:'0.72rem',fontFamily:'inherit'}}>{v.l}</button>
                ))}
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:litGrouper==='none'?10:16}}>
              {grouped.map(group=>(
                <div key={group.key}>
                  {litGrouper!=='none'&&<div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,paddingBottom:4,borderBottom:`2px solid ${group.color}30`}}>
                    <span style={{width:8,height:8,borderRadius:'50%',background:group.color}}/>
                    <span style={{fontSize:'0.72rem',fontWeight:800,color:group.color,textTransform:'uppercase',letterSpacing:'0.07em'}}>{group.label}</span>
                    <span style={{fontSize:'0.68rem',color:$textMut,fontWeight:500}}>{group.items.length} litige{group.items.length>1?'s':''}</span>
                  </div>}
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {group.items.map(l => {
                const tp = LIT_TYPES.find(t=>t.id===l.type)||LIT_TYPES[0];
                const st = LIT_STATUTS.find(s=>s.id===l.statut)||LIT_STATUTS[0];
                return <div key={l.id} onClick={()=>setLitEdit({...l})} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'16px 20px',cursor:'pointer',borderLeft:'4px solid '+st.color,boxShadow:$shadow,transition:'all 0.2s', ...highlightStyle('litige', l.id)}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;}} onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>{l.titre}</div>
                      <div style={{fontSize:'0.78rem',color:$textSec,marginTop:3}}>{l.description}</div>
                      <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:tp.color+'15',color:tp.color,fontWeight:600,fontSize:'0.7rem',display:'inline-flex',alignItems:'center',gap:4}}>{tp.label}</span>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:st.color+'15',color:st.color,fontWeight:600,fontSize:'0.7rem',display:'inline-flex',alignItems:'center',gap:4}}>{st.label}</span>
                        <span style={{fontSize:'0.72rem',color:$textMut}}>{l.filialeId ? <FilLink id={l.filialeId}/> : 'YILMAZ SAS'} — {l.chantierId ? <><ChLink id={l.chantierId}/> — </> : ''}Adversaire: {l.adversaire} — Ouvert le {l.dateOuverture}</span>
                      </div>
                    </div>
                    <div style={{textAlign:'right',flexShrink:0}}>
                      <div style={{fontSize:'1.1rem',fontWeight:800,color:'#dc2626'}}>{fmt(l.montantEnJeu)}</div>
                      <div style={{fontSize:'0.72rem',color:'#f59e0b',fontWeight:600}}>Provision: {fmt(l.provision)}</div>
                      {l.avocat && <div style={{fontSize:'0.7rem',color:$textSec,marginTop:4}}>Avocat: {l.avocat}</div>}
                    </div>
                  </div>
                  {l.historique && <div style={{marginTop:10,padding:'10px 14px',background:$bgSub,borderRadius:crmRd,fontSize:'0.75rem',color:$textSec,lineHeight:1.5,border:`1px solid ${$borderLight}`}}>{l.historique}</div>}
                </div>;
              })}
                  </div>
                </div>
              ))}
            </div>
            {litEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setLitEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:600,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$borderAlt}`,display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>{data.find(d=>d.id===litEdit.id)?'✎ Modifier':'+ Nouveau'} litige</span><button onClick={()=>setLitEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
              <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[{k:'titre',l:'Titre',span:2},{k:'type',l:'Type',type:'select',opts:LIT_TYPES.map(t=>t.id),labels:LIT_TYPES.map(t=>t.label)},{k:'statut',l:'Statut',type:'select',opts:LIT_STATUTS.map(s=>s.id),labels:LIT_STATUTS.map(s=>s.label)},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte']},{k:'adversaire',l:'Adversaire'},{k:'montantEnJeu',l:'Montant en jeu (€)',type:'number'},{k:'provision',l:'Provision (€)',type:'number'},{k:'dateOuverture',l:'Date ouverture',type:'date'},{k:'avocat',l:'Avocat'},{k:'description',l:'Description',span:2,type:'textarea'},{k:'historique',l:'Historique / Suivi',span:2,type:'textarea'}].map(f => (
                  <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                    {f.type==='select'?<select value={litEdit[f.k]||''} onChange={e=>setLitEdit({...litEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                    :f.type==='textarea'?<textarea value={litEdit[f.k]||''} onChange={e=>setLitEdit({...litEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                    :f.type==='number'?<input type="number" value={litEdit[f.k]||0} onChange={e=>setLitEdit({...litEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                    :f.type==='date'?<input type="date" value={litEdit[f.k]||''} onChange={e=>setLitEdit({...litEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                    :<input value={litEdit[f.k]||''} onChange={e=>setLitEdit({...litEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                  </div>
                ))}
              </div>
              <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                <div>{data.find(d=>d.id===litEdit.id)&&<button onClick={()=>{saveLit(data.filter(d=>d.id!==litEdit.id));setLitEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
                <div style={{display:'flex',gap:6}}><button onClick={()=>setLitEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(d=>d.id===litEdit.id);if(ex){saveLit(data.map(d=>d.id===litEdit.id?litEdit:d));}else{saveLit([...data,litEdit]);}setLitEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
              </div>
            </div></div>)}
          </div>
        );
}
