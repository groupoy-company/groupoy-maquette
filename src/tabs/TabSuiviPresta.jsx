// === Onglet « suivi_presta » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabSuiviPresta(__props) {
  const { $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec, PrestaLink, crmRd, empNom, filNom, filterByFiliale, setSpData, setSpEdit, setSpFilter, spData, spFilter } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const saveSp = d => { setSpData(d); localStorage.setItem('ruches_sp_data', JSON.stringify(d)); };
        const SP_STATUTS = [{id:'active',label:'Active',color:'#10b981'},{id:'en_attente',label:'En attente livrable',color:'#f59e0b'},{id:'terminee',label:'Terminée',color:$textSec},{id:'litige',label:'En litige',color:'#ef4444'}];
        const sampleSp = [
          {id:'SP-001',prestaId:'P001',prestataire:'Caroline MULLER',filialeId:'yilmaz',filiale:'YILMAZ SAS',mission:'Clôture annuelle 2025',budget:19500,consomme:6500,statut:'active',dateDebut:'2025-12-01',dateFinPrevue:'2026-03-31',responsableId:'EMP001',notes:'Phase 1 revue analytique en cours'},
          {id:'SP-002',prestaId:'P004',prestataire:'Karim BENALI (KB Dev)',filialeId:'yilmaz',filiale:'YILMAZ SAS',mission:'Portail YILMAZ v2',budget:45000,consomme:28350,statut:'active',dateDebut:'2025-01-15',dateFinPrevue:'2025-06-30',responsableId:'EMP001',notes:'CRM Prestataires terminé, module Trésorerie en cours'},
          {id:'SP-003',prestaId:'P005',prestataire:'NOVATECH',filialeId:'yilmaz',filiale:'YILMAZ SAS',mission:'Infogérance mensuelle',budget:10680,consomme:7120,statut:'active',dateDebut:'2025-01-01',dateFinPrevue:'2025-12-31',responsableId:'EMP013',notes:'Forfait 890€/mois. RAS.'},
          {id:'SP-004',prestaId:'P006',prestataire:'Cabinet MEYER',filialeId:'yilmaz',filiale:'YILMAZ SAS',mission:'Dossier prud\'hommes Durand',budget:7500,consomme:4500,statut:'active',dateDebut:'2025-09-15',dateFinPrevue:'2026-06-30',responsableId:'EMP001',notes:'Audience prévue avril 2026. Voir LIT-003.'},
          {id:'SP-005',prestaId:'P007',prestataire:'Léa Graphisme',filialeId:'yilmaz',filiale:'YILMAZ SAS',mission:'Charte graphique Group OY',budget:2500,consomme:2500,statut:'terminee',dateDebut:'2025-11-01',dateFinPrevue:'2026-02-15',responsableId:'EMP001',notes:'Livré : logo, charte, templates. Très satisfait.'}
        ]
        const data = filterByFiliale(spData.length > 0 ? spData : sampleSp);
        const filtered = spFilter === 'tous' ? data : data.filter(d => d.statut === spFilter);
        const totalMontant = data.filter(d=>d.statut!=='terminee').reduce((s,d)=>s+d.montant,0);
        const totalFacture = data.reduce((s,d)=>s+d.facture,0);
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Suivi Prestataires</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>{data.filter(d=>d.statut==='active').length} missions actives — {fmt(totalMontant)} en cours</div></div>
              <button onClick={() => setSpEdit({id:'SP-'+String(data.length+1).padStart(3,'0'),prestataire:'',mission:'',filiale:'Ezel Bâtiment',statut:'active',debut:new Date().toISOString().slice(0,10),fin:'',montant:0,facture:0,avancement:0,responsable:'',livrables:[]})} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Nouvelle mission</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:14}}>
              {[{l:'Missions actives',v:data.filter(d=>d.statut==='active').length,c:'#10b981',bg:'rgba(34,197,94,0.10)'},{l:'Montant engagé',v:fmt(totalMontant),c:'#3b82f6',bg:'rgba(59,130,246,0.10)'},{l:'Facturé',v:fmt(totalFacture),c:'#8B6F47',bg:$bgSub},{l:'En attente livrable',v:data.filter(d=>d.statut==='en_attente').length,c:'#f59e0b',bg:'rgba(212,160,48,0.12)'}].map((k,i) => (
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
              {[{id:'tous',l:'Tous'},...SP_STATUTS].map(f => <button key={f.id} onClick={()=>setSpFilter(f.id)} style={{padding:'5px 12px',borderRadius:crmRd,border: spFilter===f.id?`2px solid ${$accent}`:`1px solid ${$border}`,background: spFilter===f.id?$bgSub:$bgCard,fontWeight:700,fontSize:'0.8rem',color: spFilter===f.id?'#8B6F47':'#6b5d4d',cursor:'pointer'}}>{f.l || f.label}</button>)}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {filtered.map(sp => {
                const st = SP_STATUTS.find(s=>s.id===sp.statut)||SP_STATUTS[0];
                return <div key={sp.id} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                  <div style={{padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${$border}`}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:'0.92rem',color:$text}}>{sp.prestaId ? <PrestaLink id={sp.prestaId}/> : sp.prestataire}</div>
                      <div style={{fontSize:'0.78rem',color:$accent}}>{sp.mission}</div>
                      <div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>{filNom(sp.filialeId)} — {sp.debut} → {sp.fin} — Resp: {sp.responsableId ? empNom(sp.responsableId) : '—'}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <span style={{padding:'3px 10px',borderRadius:crmRd,background:st.color+'15',color:st.color,fontWeight:700,fontSize:'0.75rem'}}>{st.label}</span>
                      <div style={{fontSize:'0.85rem',fontWeight:700,color:$accent,marginTop:6}}>{fmt(sp.montant)}</div>
                    </div>
                  </div>
                  <div style={{padding:'10px 18px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                      <div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:sp.avancement+'%',height:'100%',borderRadius:3,background:sp.avancement>=80?'#059669':sp.avancement>=40?'#3b82f6':'#f59e0b'}}/></div>
                      <span style={{fontSize:'0.78rem',fontWeight:700,color:$textSec}}>{sp.avancement}%</span>
                      <span style={{fontSize:'0.72rem',color:$textMut}}>Facturé: {fmt(sp.facture)}</span>
                    </div>
                    {(sp.livrables || []).length > 0 && <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {(sp.livrables || []).map((l,i) => {
                        const lc = l.statut==='livre'?'#059669':l.statut==='en_cours'?'#f59e0b':'#6b7280';
                        const ll = l.statut==='livre'?'Livré':l.statut==='en_cours'?'En cours':'Planifié';
                        return <span key={i} style={{padding:'3px 8px',borderRadius:crmRd,background:lc+'12',color:lc,fontSize:'0.7rem',fontWeight:600}}>{l.nom} ({ll})</span>;
                      })}
                    </div>}
                  </div>
                </div>;
              })}
            </div>
          </div>
        );
}
