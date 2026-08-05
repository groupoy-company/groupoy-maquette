// === Onglet « reception_factures » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabReceptionFactures(__props) {
  const { $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, crmRd, filterByFiliale, rfData, rfFilter, setRfData, setRfEdit, setRfFilter } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const saveRf = d => { setRfData(d); localStorage.setItem('ruches_rf_data', JSON.stringify(d)); };
        const RF_STATUTS = [{id:'a_traiter',label:'À traiter',color:'#ef4444'},{id:'rapproche',label:'Rapproché BC',color:'#f59e0b'},{id:'valide',label:'Validé',color:'#10b981'},{id:'exporte',label:'Exporté Pennylane',color:'#059669'},{id:'litige',label:'Litige',color:'#dc2626'}];
        const sampleRf = [
          {id:'RF-001',ref:'FC-2026-CM-001',prestaId:'P001',prestataire:'Caroline MULLER',filialeId:'yilmaz',filiale:'YILMAZ SAS',montantHT:5200,tva:20,montantTTC:6240,dateReception:'2026-02-03',dateEcheance:'2026-03-05',statut:'valide',bcRef:'',objet:'DAF externalisée — Janvier 2026',rapprochement:'OK',exportPennylane:true,notes:'Forfait mensuel 2j/semaine'},
          {id:'RF-002',ref:'FC-2026-OST-012',prestaId:'P002',prestataire:'OST Comptabilité',filialeId:'yilmaz',filiale:'YILMAZ SAS',montantHT:2800,tva:20,montantTTC:3360,dateReception:'2026-02-05',dateEcheance:'2026-03-15',statut:'a_traiter',bcRef:'',objet:'Honoraires comptabilité Janvier',rapprochement:'',exportPennylane:false,notes:''},
          {id:'RF-003',ref:'FC-2026-KB-003',prestaId:'P004',prestataire:'Karim BENALI',filialeId:'yilmaz',filiale:'YILMAZ SAS',montantHT:2250,tva:20,montantTTC:2700,dateReception:'2026-02-17',dateEcheance:'2026-03-17',statut:'rapproche',bcRef:'BC-2026-003',objet:'Dev portail — Sprint février (5j)',rapprochement:'BC-003',exportPennylane:false,notes:'5j × 450€ TJM'},
          {id:'RF-004',ref:'FC-2026-PP-041',prestaId:null,prestataire:'POINT P Molsheim',filialeId:3,filiale:'Ezel Bâtiment',montantHT:12800,tva:20,montantTTC:15360,dateReception:'2026-01-14',dateEcheance:'2026-02-15',statut:'exporte',bcRef:'BC-2026-002',objet:'Béton C25/30 — Chantier Colmar',rapprochement:'BC-002 ✓',exportPennylane:true,notes:''},
          {id:'RF-005',ref:'FC-2026-WURTH-089',prestaId:'P003',prestataire:'WÜRTH France',filialeId:3,filiale:'Ezel Bâtiment',montantHT:4500,tva:20,montantTTC:5400,dateReception:'2026-01-24',dateEcheance:'2026-02-24',statut:'exporte',bcRef:'BC-2026-001',objet:'Visserie + chevilles — Lot Façade',rapprochement:'BC-001 ✓',exportPennylane:true,notes:''},
          {id:'RF-006',ref:'FC-2026-LEA-001',prestaId:'P007',prestataire:'Léa Graphisme',filialeId:'yilmaz',filiale:'YILMAZ SAS',montantHT:2500,tva:0,montantTTC:2500,dateReception:'2026-02-22',dateEcheance:'2026-03-22',statut:'a_traiter',bcRef:'',objet:'Charte graphique Group OY',rapprochement:'',exportPennylane:false,notes:'Auto-entrepreneur non assujettie TVA'}
        ]
        const data = filterByFiliale(rfData.length > 0 ? rfData : sampleRf);
        const filtered = rfFilter === 'tous' ? data : data.filter(d => d.statut === rfFilter);
        const aTraiter = data.filter(d=>d.statut==='a_traiter').length;
        const totalHT = data.reduce((s,d)=>s+d.montantHT,0);
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Réception Factures</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>{aTraiter > 0 ? aTraiter + ' facture(s) à traiter' : 'Toutes les factures sont traitées'}</div></div>
              <button onClick={() => setRfEdit({id:'RF-'+String(data.length+1).padStart(3,'0'),fournisseur:'',numFacture:'',dateFacture:new Date().toISOString().slice(0,10),dateReception:new Date().toISOString().slice(0,10),montantHT:0,tva:0,montantTTC:0,bcRef:'',filiale:'YILMAZ SAS',statut:'a_traiter',notes:''})} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Saisir facture</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:14}}>
              {[{l:'Total HT',v:fmt(totalHT),c:'#8B6F47',bg:$bgSub},{l:'À traiter',v:aTraiter,c:'#ef4444',bg:'rgba(239,68,68,0.10)'},{l:'Rapprochées BC',v:data.filter(d=>d.statut==='rapproche').length,c:'#f59e0b',bg:'rgba(212,160,48,0.12)'},{l:'Exportées Pennylane',v:data.filter(d=>d.statut==='exporte').length,c:'#059669',bg:'rgba(34,197,94,0.10)'}].map((k,i) => (
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
            <div style={{display:'flex', gap:6, marginBottom:14}}>
              {[{id:'tous',label:'Toutes'},...RF_STATUTS].map(f => {const n = f.id==='tous'?data.length:data.filter(d=>d.statut===f.id).length; return <button key={f.id} onClick={()=>setRfFilter(f.id)} style={{padding:'5px 12px',borderRadius:crmRd,border: rfFilter===f.id?'2px solid #8B6F47':`1px solid ${$border}`,background: rfFilter===f.id?$bgSub:$bgCard,fontWeight:700,fontSize:'0.8rem',color: rfFilter===f.id?'#8B6F47':'#6b5d4d',cursor:'pointer'}}>{f.label} ({n})</button>;})}
            </div>
            <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,boxShadow:$shadow}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
                <thead><tr style={{background:$bgSub}}>
                  {['N° Facture','Fournisseur','Date','Filiale','Réf. BC','HT','TTC','Statut',''].map(h => <th key={h} style={{position:'relative',padding:'10px 8px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                </tr></thead>
                <tbody>{filtered.map(f => {
                  const st = RF_STATUTS.find(s=>s.id===f.statut)||RF_STATUTS[0];
                  return <tr key={f.id} style={{borderBottom:`1px solid ${$border}`}}>
                    <td style={{padding:'8px',fontWeight:700}}>{f.numFacture}</td>
                    <td style={{padding:'8px'}}>{f.prestaId ? <PrestaLink id={f.prestaId}/> : (f.fournisseur || f.prestataire)}</td>
                    <td style={{padding:'8px',fontSize:'0.74rem',color:$textSec}}>{f.dateFacture}</td>
                    <td style={{padding:'8px',fontSize:'0.74rem'}}><FilLink id={f.filialeId}/></td>
                    <td style={{padding:'8px',fontSize:'0.74rem',color:f.bcRef?'#3b82f6':'#b0a08a'}}>{f.bcRef||'—'}</td>
                    <td style={{padding:'8px',fontWeight:600}}>{fmt(f.montantHT)}</td>
                    <td style={{padding:'8px',fontWeight:700,color:$text}}>{fmt(f.montantTTC)}</td>
                    <td style={{padding:'8px'}}><span style={{padding:'2px 8px',borderRadius:crmRd,background:st.color+'15',color:st.color,fontWeight:700,fontSize:'0.72rem'}}>{st.label}</span></td>
                    <td style={{padding:'8px'}}>
                      {f.statut==='a_traiter' && <button onClick={()=>{const u=data.map(d=>d.id===f.id?{...d,statut:'rapproche'}:d); saveRf(u);}} style={{padding:'3px 8px',borderRadius:crmRd,border:'1px solid #f59e0b',background:$warn+'12',color:'#a16207',fontSize:'0.7rem',fontWeight:600,cursor:'pointer'}}>Rapprocher</button>}
                      {f.statut==='rapproche' && <button onClick={()=>{const u=data.map(d=>d.id===f.id?{...d,statut:'valide'}:d); saveRf(u);}} style={{padding:'3px 8px',borderRadius:crmRd,border:'1px solid #10b981',background:$success+'12',color:'#059669',fontSize:'0.7rem',fontWeight:600,cursor:'pointer'}}>Valider</button>}
                      {f.statut==='valide' && <button onClick={()=>{const u=data.map(d=>d.id===f.id?{...d,statut:'exporte'}:d); saveRf(u);}} style={{padding:'3px 8px',borderRadius:crmRd,border:'1px solid #059669',background:'rgba(34,197,94,0.14)',color:'#15803d',fontSize:'0.7rem',fontWeight:600,cursor:'pointer'}}>Export PL</button>}
                    </td>
                  </tr>;
                })}</tbody>
              </table>
            </div>
          </div>
        );
}
