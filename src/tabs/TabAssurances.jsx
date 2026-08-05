// === Onglet « assurances » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabAssurances(__props) {
  const { $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec, assData, assTab, crmRd, filNom, filiales, filterByFiliale, setAssData, setAssEdit, setAssTab } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const saveAss = d => { setAssData(d); localStorage.setItem('ruches_ass_data', JSON.stringify(d)); };
        const ASS_TYPES = [{id:'rc_pro',label:'RC Professionnelle',color:'#3b82f6'},{id:'decennale',label:'Décennale',color:'#8b5cf6'},{id:'multirisque',label:'Multirisque',color:'#f59e0b'},{id:'auto',label:'Flotte auto',color:'#10b981'},{id:'homme_cle',label:'Homme clé',color:'#ec4899'},{id:'prevoyance',label:'Prévoyance/Mutuelle',color:'#6366f1'},{id:'autre',label:'Autre',color:$textSec}];
        const sampleAss = [
          {id:'ASS-001',type:'rc_pro',assureur:'AXA Entreprises',numPolice:'RC-2025-44521',filialeId:'all',filiale:'Group OY (toutes filiales)',primeAnnuelle:8500,franchise:1500,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',couverture:'RC Professionnelle toutes activités, plafond 2M€',contact:'M. Weber — 03 88 00 11 22',sinistres:0},
          {id:'ASS-002',type:'decennale',assureur:'SMABTP',numPolice:'DEC-2025-78432',filialeId:3,filiale:'Ezel Bâtiment',primeAnnuelle:18500,franchise:2500,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',couverture:'Garantie décennale tous travaux bâtiment, plafond 5M€ par sinistre',contact:'Mme Dupont — 01 42 00 33 44',sinistres:1},
          {id:'ASS-003',type:'multirisque',assureur:'MAIF Pro',numPolice:'MRP-2025-55123',filialeId:'yilmaz',filiale:'YILMAZ SAS',primeAnnuelle:4200,franchise:800,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',couverture:'Locaux 12 rue Industrie, contenu, bris de machines, perte exploitation',contact:'Agence Molsheim — 03 88 49 00 00',sinistres:0},
          {id:'ASS-004',type:'auto',assureur:'Allianz',numPolice:'FLT-2025-92001',filialeId:1,filiale:'La Roulotte',primeAnnuelle:6800,franchise:500,dateDebut:'2025-03-01',dateFin:'2026-02-28',statut:'actif',couverture:'Flotte 4 véhicules : 2 camions + 2 utilitaires',contact:'M. Hartmann — 03 88 50 12 34',sinistres:1},
          {id:'ASS-005',type:'prevoyance',assureur:'AG2R La Mondiale',numPolice:'PREV-2025-10042',filialeId:'all',filiale:'Group OY',primeAnnuelle:14200,franchise:0,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',couverture:'Prévoyance + Mutuelle collective obligatoire. Convention BTP.',contact:'Service entreprise — 0 969 399 399',sinistres:0},
          {id:'ASS-006',type:'decennale',assureur:'SMABTP',numPolice:'DEC-2025-78433',filialeId:2,filiale:"L'Échafaudage",primeAnnuelle:5200,franchise:1000,dateDebut:'2025-01-01',dateFin:'2025-12-31',statut:'actif',couverture:'Montage/démontage échafaudage, plafond 1M€',contact:'Mme Dupont — 01 42 00 33 44',sinistres:0}
        ]
        const sampleSinistres = [
          {id:'SIN-001',police:'ASS-002',date:'2024-11-15',type:'Malfaçon fissuration',montantReclame:45000,montantIndemnise:38000,statut:'indemnise',description:'Fissuration mur porteur chantier Kehl, expertise SMABTP favorable'},
          {id:'SIN-002',police:'ASS-004',date:'2025-01-08',type:'Accident VL',montantReclame:3200,montantIndemnise:0,statut:'en_cours',description:'Accrochage fourgon sur chantier Colmar'},
          {id:'SIN-003',police:'ASS-004',date:'2025-02-12',type:'Vol outillage',montantReclame:5500,montantIndemnise:0,statut:'declare',description:'Vol outillage dans véhicule stationné'}
        ];
        const data = filterByFiliale(assData.length > 0 ? assData : sampleAss);
        const totalPrimes = data.filter(d=>d.statut==='actif').reduce((s,d)=>s+d.primeAnnuelle,0);
        const policesActives = data.filter(d=>d.statut==='actif').length;
        const expirees = data.filter(d=>d.statut==='expire').length;
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                  <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Assurances</h2>
                  <span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#0891b215',color:'#0891b2',fontWeight:700,border:'1px solid #0891b230'}}>{policesActives} actives</span>
                </div>
                <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Budget annuel : {fmt(totalPrimes)}</p>
              </div>
              <button onClick={() => setAssEdit({id:'ASS-'+String(data.length+1).padStart(3,'0'),type:'rc_pro',assureur:'',numPolice:'',filiale:'YILMAZ SAS',primeAnnuelle:0,franchise:0,dateDebut:new Date().toISOString().slice(0,10),dateFin:'',statut:'actif',couverture:'',contact:'',sinistres:0})} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Police</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:14}}>
              {[{l:'Polices actives',v:policesActives,c:'#10b981',bg:'rgba(34,197,94,0.10)'},{l:'Primes annuelles',v:fmt(totalPrimes),c:'#8B6F47',bg:$bgSub},{l:'Sinistres ouverts',v:sampleSinistres.filter(s=>s.statut!=='indemnise').length,c:'#f59e0b',bg:'rgba(212,160,48,0.12)'},{l:'Polices expirées',v:expirees,c: expirees>0?'#ef4444':'#059669',bg: expirees>0?'rgba(239,68,68,0.10)':'rgba(34,197,94,0.10)'}].map((k,i) => (
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
              {[{id:'polices',l:'Polices d\'assurance'},{id:'sinistres',l:'Sinistres ('+sampleSinistres.length+')'}].map(t => (
                <button key={t.id} onClick={()=>setAssTab(t.id)} style={{padding:'6px 14px',borderRadius:crmRd,border: assTab===t.id?`2px solid ${$accent}`:`1px solid ${$border}`,background: assTab===t.id?$bgSub:$bgCard,color: assTab===t.id?'#8B6F47':'#6b5d4d',fontWeight:700,fontSize:'0.85rem',cursor:'pointer'}}>{t.l}</button>
              ))}
            </div>
            {assTab === 'polices' && (
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {data.map(p => {
                  const tp = ASS_TYPES.find(t=>t.id===p.type)||ASS_TYPES[6];
                  const isExpired = p.statut === 'expire';
                  return <div key={p.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'14px 18px',borderLeft:'3px solid '+tp.color, opacity: isExpired?0.6:1}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:'0.92rem',color:$text}}>{tp.label} <span style={{fontWeight:400,fontSize:'0.78rem',color:$textMut}}>— {p.numPolice}</span></div>
                        <div style={{fontSize:'0.82rem',color:$accent,marginTop:2}}>{p.assureur}</div>
                        <div style={{fontSize:'0.72rem',color:$textSec,marginTop:3}}>{p.filialeId === 'all' ? 'Toutes filiales' : filNom(p.filialeId)} — {p.dateDebut} → {p.dateFin} — Franchise: {fmt(p.franchise)}</div>
                        <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>{p.couverture}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <span style={{padding:'3px 10px',borderRadius:crmRd,background: isExpired?'rgba(239,68,68,0.10)':'rgba(34,197,94,0.10)',color: isExpired?'#dc2626':'#059669',fontWeight:700,fontSize:'0.75rem'}}>{isExpired?'Expirée':'Active'}</span>
                        <div style={{fontSize:'1.1rem',fontWeight:800,color:$accent,marginTop:6}}>{fmt(p.primeAnnuelle)}/an</div>
                      </div>
                    </div>
                  </div>;
                })}
              </div>
            )}
            {assTab === 'sinistres' && (
              <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,boxShadow:$shadow}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {['Date','Type','Description','Réclamé','Indemnisé','Statut'].map(h => <th key={h} style={{position:'relative',padding:'10px 10px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{sampleSinistres.map(s => {
                    const sc = s.statut==='indemnise'?'#059669':s.statut==='en_cours'?'#f59e0b':'#3b82f6';
                    const sl = s.statut==='indemnise'?'Indemnisé':s.statut==='en_cours'?'En cours':'Déclaré';
                    return <tr key={s.id} style={{borderBottom:`1px solid ${$border}`}}>
                      <td style={{padding:'8px 10px',fontWeight:600}}>{s.date}</td>
                      <td style={{padding:'8px 10px'}}>{s.type}</td>
                      <td style={{padding:'8px 10px',fontSize:'0.75rem',color:$textSec,maxWidth:250}}>{s.description}</td>
                      <td style={{padding:'8px 10px',fontWeight:700,color:'#dc2626'}}>{fmt(s.montantReclame)}</td>
                      <td style={{padding:'8px 10px',fontWeight:700,color:'#059669'}}>{s.montantIndemnise>0?fmt(s.montantIndemnise):'—'}</td>
                      <td style={{padding:'8px 10px'}}><span style={{padding:'2px 8px',borderRadius:crmRd,background:sc+'15',color:sc,fontWeight:700,fontSize:'0.72rem'}}>{sl}</span></td>
                    </tr>;
                  })}</tbody>
                </table>
              </div>
            )}
          </div>
        );
}
