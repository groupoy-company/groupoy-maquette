// === Onglet « bon_commande » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabBonCommande(__props) {
  const { $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $danger, $info, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, bcData, bcEdit, bcFilter, bcSearch, crmRd, filterByFiliale, setBcData, setBcEdit, setBcFilter, setBcSearch } = __props;
        const BC_STATUTS = [{id:'brouillon',label:'Brouillon',color:'#9ca3af',icon:'◇'},{id:'emis',label:'Émis',color:'#3b82f6',icon:'▸'},{id:'valide',label:'Validé',color:'#f59e0b',icon:'●'},{id:'accepte',label:'Accepté',color:'#10b981',icon:'✓'},{id:'livre',label:'Livré',color:'#6366f1',icon:'▣'},{id:'facture',label:'Facturé',color:'#059669',icon:'✓✓'},{id:'annule',label:'Annulé',color:'#ef4444',icon:'✕'}];
        const saveBc = d => { setBcData(d); localStorage.setItem('ruches_bc_data', JSON.stringify(d)); };
        const sampleBc = [
          {id:'BC-001',ref:'BC-2026-001',prestaId:'P003',fournisseur:'WÜRTH France',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH003',chantier:'Rénovation Strasbourg',emetteurId:'EMP005',montantHT:4500,tva:20,statut:'accepte',dateEmission:'2026-01-15',dateLivraison:'2026-01-22',objet:'Visserie inox + chevilles chimiques — Lot Façade',lignes:'Vis inox A4 6×80 (500), Chevilles chimiques M12 (200), Rondelles (1000)',validePar:'EMP001'},
          {id:'BC-002',ref:'BC-2026-002',prestaId:null,fournisseur:'POINT P Molsheim',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH001',chantier:'Résidence Colmar',emetteurId:'EMP005',montantHT:12800,tva:20,statut:'livre',dateEmission:'2026-01-08',dateLivraison:'2026-01-12',objet:'Béton C25/30 — Dalle parking B2',lignes:'Béton C25/30 (35m³), Pompage béton, Adjuvant fibré',validePar:'EMP003'},
          {id:'BC-003',ref:'BC-2026-003',prestaId:'P005',fournisseur:'NOVATECH Informatique',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,chantier:'',emetteurId:'EMP003',montantHT:2890,tva:20,statut:'valide',dateEmission:'2026-02-01',dateLivraison:'2026-02-10',objet:'Renouvellement PC portables × 2',lignes:'Lenovo ThinkPad T14s (2), Station accueil USB-C (2), Sacoche transport (2)',validePar:'EMP001'},
          {id:'BC-004',ref:'BC-2026-004',prestaId:null,fournisseur:'KILOUTOU',filialeId:3,filiale:'Ezel Bâtiment',chantierId:'CH005',chantier:'Extension Obernai',emetteurId:'EMP008',montantHT:3200,tva:20,statut:'emis',dateEmission:'2026-02-20',dateLivraison:'2026-03-03',objet:'Location nacelle 18m — 2 semaines',lignes:'Nacelle articulée 18m (14j), Livraison/reprise, Formation opérateur',validePar:null},
          {id:'BC-005',ref:'BC-2026-005',prestaId:null,fournisseur:'LOXAM',filialeId:1,filiale:'La Roulotte',chantierId:null,chantier:'',emetteurId:'EMP015',montantHT:890,tva:20,statut:'facture',dateEmission:'2026-01-03',dateLivraison:'2026-01-05',objet:'Pièces détachées remorque WC',lignes:'Pompe vidange (1), Joints (lot), Flexible raccord (3)',validePar:'EMP001'},
          {id:'BC-006',ref:'BC-2026-006',prestaId:'P006',fournisseur:'Cabinet MEYER Avocats',filialeId:'yilmaz',filiale:'YILMAZ SAS',chantierId:null,chantier:'',emetteurId:'EMP001',montantHT:1500,tva:20,statut:'brouillon',dateEmission:'2026-02-25',dateLivraison:null,objet:'Conseil droit social — Dossier prud\'hommes',lignes:'6h conseil @ 250€/h',validePar:null}
        ]
        const data = filterByFiliale(bcData.length > 0 ? bcData : sampleBc);
        const filtered = data.filter(b => (bcFilter === 'tous' || b.statut === bcFilter) && (bcSearch === '' || b.objet.toLowerCase().includes(bcSearch.toLowerCase()) || b.fournisseur.toLowerCase().includes(bcSearch.toLowerCase()) || b.id.toLowerCase().includes(bcSearch.toLowerCase())));
        const totalMontant = data.reduce((s,b) => s + (b.statut !== 'annule' ? (b.montantHT ?? b.montant ?? 0) : 0), 0);
        const enCours = data.filter(b => ['emis','valide','accepte'].includes(b.statut)).length;
        const aValider = data.filter(b => b.statut === 'emis').length;
        return (<div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:10}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Bons de Commande</h2>
              </div>
              <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Gestion des commandes fournisseurs et prestataires</p>
            </div>
            <button onClick={() => setBcEdit({id:'BC-'+new Date().getFullYear()+'-'+String(data.length+1).padStart(3,'0'),date:new Date().toISOString().slice(0,10),fournisseur:'',filiale:'YILMAZ SAS',objet:'',montant:0,statut:'brouillon',demandeur:user?.prenom||'',valideur:'',dateLivraison:'',notes:''})} style={{padding:'8px 16px', borderRadius:crmRd, border:'none', background:$accent, color:'#fff', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit'}}>+ Nouveau BC</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20}}>
            {[{l:'Total BC',v:data.length,c:$accent,ic:'◉'},{l:'Montant total',v:totalMontant.toLocaleString('fr-FR')+'€',c:$success,ic:'◫'},{l:'En cours',v:enCours,c:$info,ic:'▸'},{l:'À valider',v:aValider,c:$warn,ic:'◔'}].map((k,i) => (
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
          <div style={{display:'flex', gap:8, marginBottom:14, flexWrap:'wrap', alignItems:'center'}}>
            <input placeholder="Rechercher BC..." value={bcSearch} onChange={e => setBcSearch(e.target.value)} style={{padding:'6px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.82rem', minWidth:180, fontFamily:'inherit', background:$bgCard, color:$text, outline:'none'}} />
            <select value={bcFilter} onChange={e => setBcFilter(e.target.value)} style={{padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.82rem'}}>
              <option value="tous">Tous les statuts</option>
              {BC_STATUTS.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
            </select>
          </div>
          <div style={{overflowX:'auto', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard}}>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.78rem'}}>
              <thead><tr style={{background:$bgSub}}>{['N° BC','Date','Fournisseur','Filiale','Objet','Montant','Statut','Actions'].map(h => <th key={h} style={{position:'relative',padding:'10px 8px', textAlign:'left', fontWeight:600, fontSize:'0.7rem', color:$textMut, borderBottom:`1px solid ${$border}`, letterSpacing:'0.04em', textTransform:'uppercase', whiteSpace:'nowrap', whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
              <tbody>{filtered.map(b => { const st = BC_STATUTS.find(s => s.id === b.statut); return (
                <tr key={b.id} style={{borderBottom:`1px solid ${$border}`}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{padding:'8px 10px', fontWeight:700, color:$accent}}>{b.id}</td>
                  <td style={{padding:'8px 10px', fontSize:'0.75rem', color:$textSec}}>{b.date}</td>
                  <td style={{padding:'8px 10px', fontWeight:600}}>{b.prestaId ? <PrestaLink id={b.prestaId}/> : b.fournisseur}</td>
                  <td style={{padding:'8px 10px', fontSize:'0.75rem'}}><FilLink id={b.filialeId}/></td>
                  <td style={{padding:'8px 10px', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{b.objet}</td>
                  <td style={{padding:'8px 10px', fontWeight:700, color:$text}}>{(b.montantHT ?? b.montant ?? 0).toLocaleString('fr-FR')}€</td>
                  <td style={{padding:'12px 14px'}}><span style={{padding:'3px 10px', borderRadius:crmRd>0?20:2, background:st.color+'18', color:st.color, fontWeight:700, fontSize:'0.72rem', display:'inline-flex', alignItems:'center', gap:3}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>
                  <td style={{padding:'8px 10px'}}><button onClick={() => setBcEdit({...b})} style={{padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, background:$bgCard, fontSize:'0.72rem', cursor:'pointer', color:$accent, fontWeight:600}}>Modifier</button></td>
                </tr>); })}</tbody>
            </table>
            {filtered.length === 0 && <div style={{padding:30, textAlign:'center', color:$textMut, fontSize:'0.85rem'}}>Aucun bon de commande trouvé</div>}
          </div>
          <div style={{display:'flex', gap:6, marginTop:14, flexWrap:'wrap'}}>
            {BC_STATUTS.filter(s=>s.id!=='annule').map(st => { const n=data.filter(b=>b.statut===st.id).length; return <div key={st.id} style={{padding:'4px 10px', borderRadius:crmRd, background:$bgCard, border:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:4}}><span style={{width:6,height:6,borderRadius:'50%',background:st.color}}/><span style={{fontSize:'0.7rem',color:$textSec}}>{st.label}</span><span style={{fontWeight:800,color:st.color,fontSize:'0.78rem'}}>{n}</span></div>; })}
          </div>
          {bcEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setBcEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:600,maxHeight:'88vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(b=>b.id===bcEdit.id)?'✏️ Modifier':'➕ Nouveau'} Bon de Commande</span><button onClick={()=>setBcEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'id',l:'N° BC',disabled:true},{k:'date',l:'Date',type:'date'},{k:'fournisseur',l:'Fournisseur',span:2},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte']},{k:'statut',l:'Statut',type:'select',opts:BC_STATUTS.map(s=>s.id),labels:BC_STATUTS.map(s=>s.label)},{k:'objet',l:'Objet / Désignation',span:2},{k:'montant',l:'Montant HT (€)',type:'number'},{k:'dateLivraison',l:'Date livraison prévue',type:'date'},{k:'demandeur',l:'Demandeur'},{k:'valideur',l:'Valideur'},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f => (
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='select'?<select value={bcEdit[f.k]||''} onChange={e=>setBcEdit({...bcEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={bcEdit[f.k]||''} onChange={e=>setBcEdit({...bcEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='number'?<input type="number" value={bcEdit[f.k]||0} onChange={e=>setBcEdit({...bcEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={bcEdit[f.k]||''} onChange={e=>setBcEdit({...bcEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={bcEdit[f.k]||''} disabled={f.disabled} onChange={e=>setBcEdit({...bcEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box',background:f.disabled?'#f8f6f2':'white'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{data.find(b=>b.id===bcEdit.id)&&<button onClick={()=>{saveBc(data.filter(b=>b.id!==bcEdit.id));setBcEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Supprimer</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setBcEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(b=>b.id===bcEdit.id);if(ex){saveBc(data.map(b=>b.id===bcEdit.id?bcEdit:b));}else{saveBc([...data,bcEdit]);}setBcEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
        </div>);
}
