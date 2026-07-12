// === Onglet « ordres_travail » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabOrdresTravail(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, ChLink, FilLink, chNom, chantiers, crmRd, empNom, employes, filialesDynamiques, filterByFiliale, highlightStyle, odtData, odtEdit, odtFilter, odtView, setOdtData, setOdtEdit, setOdtFilter, setOdtView, showBorderAccent } = __props;
        const saveOdt = d => { setOdtData(d); localStorage.setItem('ruches_odt_data', JSON.stringify(d)); };
        const ODT_TYPES = [{id:'travaux',label:'Travaux',color:'#3b82f6',icon:'◆'},{id:'securite',label:'Sécurité',color:'#ef4444',icon:'🛡️'},{id:'livraison',label:'Livraison',color:'#f59e0b',icon:'▸'},{id:'maintenance',label:'Maintenance',color:'#8b5cf6',icon:'✱'},{id:'inspection',label:'Inspection/Contrôle',color:'#10b981',icon:'⌕'},{id:'administratif',label:'Administratif',color:$textSec,icon:'☰'}];
        const ODT_STATUTS = [{id:'brouillon',label:'Brouillon',color:$textSec},{id:'emis',label:'Émis',color:'#3b82f6'},{id:'en_cours',label:'En cours',color:'#f59e0b'},{id:'termine',label:'Terminé',color:'#10b981'},{id:'annule',label:'Annulé',color:'#ef4444'}];
        const ODT_PRIORITES = [{id:'urgente',label:'Urgente',color:'#dc2626'},{id:'haute',label:'Haute',color:'#f59e0b'},{id:'normale',label:'Normale',color:'#3b82f6'},{id:'basse',label:'Basse',color:$textSec}];
        const sampleOdt = [
          {id:'ODT-001',titre:'Coulage dalle RDC — Lot 3',type:'travaux',chantierId:'CH001',filialeId:3,priorite:'haute',statut:'en_cours',emetteurId:'EMP005',responsableId:'EMP008',equipeIds:['EMP009','EMP010'],dateEmission:'2026-02-20',dateDebut:'2026-02-24',dateFin:'2026-02-28',heuresEstimees:32,heuresReelles:18,materiel:['Bétonnière','Vibrateur','Règle alu'],consignes:'Béton C25/30 — coffrage validé par BET. Port EPI obligatoire zone 3.',securite:'Casque + gants + lunettes. Balisage périmètre.',observations:'Météo OK pour semaine 9. Pompe béton réservée lundi 8h.'},
          {id:'ODT-002',titre:'Montage échafaudage façade Nord',type:'travaux',chantierId:'CH007',filialeId:2,priorite:'urgente',statut:'emis',emetteurId:'EMP006',responsableId:'EMP011',equipeIds:['EMP012'],dateEmission:'2026-02-25',dateDebut:'2026-03-03',dateFin:'2026-03-07',heuresEstimees:40,heuresReelles:0,materiel:['Échafaudage R200','Garde-corps','Filets'],consignes:'Montage R408 conforme. Vérification quotidienne par chef d\'équipe.',securite:'Harnais obligatoire > 3m. Formation R408 à jour pour tous.',observations:'Livraison matériel prévue vendredi 28/02.'},
          {id:'ODT-003',titre:'Contrôle VGP chariot élévateur',type:'inspection',chantierId:null,filialeId:1,priorite:'normale',statut:'termine',emetteurId:'EMP015',responsableId:'EMP015',equipeIds:[],dateEmission:'2026-02-10',dateDebut:'2026-02-12',dateFin:'2026-02-12',heuresEstimees:2,heuresReelles:2,materiel:['Chariot STILL RX20'],consignes:'VGP annuelle obligatoire. Organisme : APAVE.',securite:'Zone de contrôle balisée.',observations:'Contrôle OK — prochain VGP : 12/02/2027. PV classé.'},
          {id:'ODT-004',titre:'Livraison sanitaires chantier A35',type:'livraison',chantierId:'CH010',filialeId:1,priorite:'haute',statut:'en_cours',emetteurId:'EMP013',responsableId:'EMP015',equipeIds:['EMP015'],dateEmission:'2026-02-22',dateDebut:'2026-02-24',dateFin:'2026-02-24',heuresEstimees:4,heuresReelles:2,materiel:['Camion PL','3x WC autonomes','1x Bloc sanitaire'],consignes:'Accès chantier par entrée Sud. Contact client : M. Favre 06 xx xx.',securite:'Port gilet HV sur zone chantier.',observations:'Facturation location mensuelle. Voir BC-2026-012.'},
          {id:'ODT-005',titre:'Réfection étanchéité terrasse — Bât B',type:'travaux',chantierId:'CH004',filialeId:3,priorite:'urgente',statut:'brouillon',emetteurId:'EMP005',responsableId:'EMP009',equipeIds:['EMP010'],dateEmission:'2026-02-26',dateDebut:'2026-03-10',dateFin:'2026-03-14',heuresEstimees:24,heuresReelles:0,materiel:['Membrane EPDM','Chalumeau','Primaire'],consignes:'Suite expertise infiltration (voir LIT-002). Reprendre raccord terrasse/acrotère.',securite:'Travail en hauteur — protection collective obligatoire.',observations:'Devis client à envoyer avant démarrage. Garantie décennale applicable.'},
          {id:'ODT-006',titre:'Mise en sécurité zone amiante',type:'securite',chantierId:'CH003',filialeId:3,priorite:'urgente',statut:'emis',emetteurId:'EMP001',responsableId:'EMP005',equipeIds:['EMP008','EMP009'],dateEmission:'2026-02-25',dateDebut:'2026-03-01',dateFin:'2026-03-03',heuresEstimees:16,heuresReelles:0,materiel:['EPI amiante SS4','Confinement','Aspiration HEPA'],consignes:'Protocole SS4. Personnel formé uniquement. Plan de retrait validé par DIRECCTE.',securite:'ALERTE MAXIMALE — Combinaison type 5, masque FFP3, sas décontamination.',observations:'Formation SS4 vérifiée pour EMP008 et EMP005 (FORM-006).'}
        ];
        const data = filterByFiliale(odtData.length > 0 ? odtData : sampleOdt);
        const filtered = odtFilter === 'tous' ? data : data.filter(d => d.statut === odtFilter || d.type === odtFilter || d.priorite === odtFilter);
        const enCours = data.filter(d=>['emis','en_cours'].includes(d.statut)).length;
        const urgents = data.filter(d=>d.priorite==='urgente'&&!['termine','annule'].includes(d.statut)).length;
        const heuresTotal = data.filter(d=>d.statut!=='annule').reduce((s,d)=>s+(d.heuresReelles||0),0);
        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:10}}>
              <div><h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>Ordres de Travail</h1><div style={{fontSize:'0.82rem',color:$textMut,margin:'4px 0 0'}}>{enCours} en cours — {urgents > 0 ? <span style={{color:'#dc2626',fontWeight:700}}>{urgents} urgents</span> : 'Aucun urgent'}</div></div>
              <button onClick={() => setOdtEdit({id:'ODT-'+String(data.length+1).padStart(3,'0'),titre:'',type:'travaux',chantierId:null,filialeId:3,priorite:'normale',statut:'brouillon',emetteurId:user?.id||'EMP001',responsableId:'',equipeIds:[],dateEmission:new Date().toISOString().slice(0,10),dateDebut:'',dateFin:'',heuresEstimees:0,heuresReelles:0,materiel:[],consignes:'',securite:'',observations:''})} style={{padding:'7px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}
                onMouseEnter={e=>{e.currentTarget.style.background=$accent;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=$accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=$accent;e.currentTarget.style.borderColor=$accent;}}
              >+ Nouvel OT</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20}}>
              {[{l:'OT actifs',v:enCours,c:$info,ic:'▸'},{l:'Urgents',v:urgents,c:$danger,ic:'🚨'},{l:'Heures réalisées',v:heuresTotal+'h',c:$accent,ic:'◎'},{l:'Terminés ce mois',v:data.filter(d=>d.statut==='termine').length,c:$success,ic:'✓'}].map((k,i)=>(<div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
              >
                <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                {k.ic&&<div style={{position:'absolute',top:10,right:14,fontSize:'1.2rem',opacity:0.1}}>{k.ic}</div>}
              </div>))}
            </div>
            <div style={{display:'flex', gap:6, marginBottom:12, flexWrap:'wrap'}}>
              <select value={odtFilter} onChange={e=>setOdtFilter(e.target.value)} style={{padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${$borderAlt}`,fontSize:'0.8rem'}}>
                <option value="tous">Tous</option>
                <optgroup label="Type">{ODT_TYPES.map(t=><option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}</optgroup>
                <optgroup label="Statut">{ODT_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>
                <optgroup label="Priorité">{ODT_PRIORITES.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</optgroup>
              </select>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>{[{id:'liste',l:'Liste'},{id:'kanban',l:'Kanban'}].map(v => <button key={v.id} onClick={()=>setOdtView(v.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:odtView===v.id?$selBg:'transparent',color:odtView===v.id?$selText:$textMut,fontWeight:odtView===v.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{v.l}</button>)}</div>
            </div>
            {odtView === 'kanban' && (<div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:12}}>
              {ODT_STATUTS.filter(s=>s.id!=='annule').map(st => {
                const cards = filtered.filter(d=>d.statut===st.id);
                return (<div key={st.id} style={{minWidth:220, flex:'1 0 220px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`}}>
                  <div style={{padding:'10px 14px', borderBottom:'2px solid '+st.color, display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:700, fontSize:'0.82rem', color:st.color}}>{st.label}</span><span style={{background:st.color+'20', color:st.color, fontWeight:800, fontSize:'0.72rem', padding:'2px 7px', borderRadius:crmRd}}>{cards.length}</span></div>
                  <div style={{padding:6, display:'flex', flexDirection:'column', gap:6, minHeight:80}}>
                    {cards.map(d => {
                      const tp = ODT_TYPES.find(t=>t.id===d.type)||ODT_TYPES[0];
                      const pr = ODT_PRIORITES.find(p=>p.id===d.priorite)||ODT_PRIORITES[2];
                      return <div key={d.id} onClick={()=>setOdtEdit({...d})} style={{background:$bgCard, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$borderAlt}`, cursor:'pointer', borderLeft:showBorderAccent?'3px solid '+pr.color:'none', ...highlightStyle('ordre_travail', d.id)}}>
                        <div style={{fontWeight:700, fontSize:'0.82rem', color:$text, marginBottom:3}}>{tp.icon} {d.titre}</div>
                        <div style={{fontSize:'0.7rem', color:$accent, marginBottom:2}}>{d.chantierId ? chNom(d.chantierId) : 'Hors chantier'} — <FilLink id={d.filialeId}/></div>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4}}>
                          <span style={{fontSize:'0.65rem', color:$textMut}}>{d.dateDebut} → {d.dateFin}</span>
                          <span style={{padding:'1px 6px',borderRadius:crmRd,background:pr.color+'15',color:pr.color,fontWeight:700,fontSize:'0.62rem'}}>{pr.label}</span>
                        </div>
                        {d.responsableId && <div style={{fontSize:'0.65rem', color:$textSec, marginTop:3}}>Resp: {empNom(d.responsableId)}</div>}
                      </div>;
                    })}
                  </div>
                </div>);
              })}
            </div>)}
            {odtView === 'liste' && (<div style={{display:'flex', flexDirection:'column', gap:10}}>
              {filtered.map(d => {
                const tp = ODT_TYPES.find(t=>t.id===d.type)||ODT_TYPES[0];
                const st = ODT_STATUTS.find(s=>s.id===d.statut)||ODT_STATUTS[0];
                const pr = ODT_PRIORITES.find(p=>p.id===d.priorite)||ODT_PRIORITES[2];
                const pctH = d.heuresEstimees > 0 ? Math.round(d.heuresReelles/d.heuresEstimees*100) : 0;
                return <div key={d.id} onClick={()=>setOdtEdit({...d})} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'16px 20px',cursor:'pointer',borderLeft:showBorderAccent?'4px solid '+pr.color:'none', ...highlightStyle('ordre_travail', d.id)}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontWeight:800,fontSize:'0.95rem',color:$text}}>{tp.icon} {d.titre}</span>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:tp.color+'15',color:tp.color,fontWeight:600,fontSize:'0.7rem',display:'inline-flex',alignItems:'center',gap:4}}>{tp.label}</span>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:st.color+'15',color:st.color,fontWeight:600,fontSize:'0.7rem',display:'inline-flex',alignItems:'center',gap:4}}>{st.label}</span>
                        <span style={{padding:'2px 8px',borderRadius:crmRd,background:pr.color+'12',color:pr.color,fontWeight:700,fontSize:'0.7rem'}}>{pr.label}</span>
                      </div>
                      <div style={{fontSize:'0.78rem',color:$textSec,marginTop:6}}>
                        {d.chantierId ? <><ChLink id={d.chantierId}/> — </> : ''}<FilLink id={d.filialeId}/> — Émis le {d.dateEmission} — Du {d.dateDebut || '?'} au {d.dateFin || '?'}
                      </div>
                      <div style={{display:'flex',gap:16,marginTop:6,fontSize:'0.75rem',color:$textSec}}>
                        <span>Émetteur: <b>{d.emetteurId ? empNom(d.emetteurId) : '—'}</b></span>
                        <span>Responsable: <b>{d.responsableId ? empNom(d.responsableId) : '—'}</b></span>
                        {d.equipeIds?.length > 0 && <span>Équipe: <b>{d.equipeIds.map(id=>empNom(id)).join(', ')}</b></span>}
                      </div>
                      {d.securite && <div style={{marginTop:6,padding:'4px 10px',borderRadius:crmRd,background:$danger+'12',border:'1px solid #fecaca',fontSize:'0.72rem',color:'#991b1b'}}>🛡️ {d.securite}</div>}
                      {d.consignes && <div style={{fontSize:'0.72rem',color:$textMut,marginTop:4,fontStyle:'italic'}}>✎ {d.consignes.substring(0,120)}{d.consignes.length>120?'...':''}</div>}
                    </div>
                    <div style={{textAlign:'right',flexShrink:0,marginLeft:16}}>
                      <div style={{fontSize:'0.82rem',fontWeight:700,color:$accent}}>{d.heuresReelles}h / {d.heuresEstimees}h</div>
                      <div style={{width:80,height:6,background:$bgSub,borderRadius:3,overflow:'hidden',marginTop:4}}><div style={{width:Math.min(pctH,100)+'%',height:'100%',borderRadius:3,background:pctH>=100?'#dc2626':pctH>=70?'#f59e0b':'#3b82f6'}}/></div>
                      <div style={{fontSize:'0.68rem',color:$textMut,marginTop:2}}>{pctH}%</div>
                      {d.materiel?.length > 0 && <div style={{fontSize:'0.65rem',color:$textMut,marginTop:6}}>✱ {d.materiel.length} matériel(s)</div>}
                    </div>
                  </div>
                </div>;
              })}
              {filtered.length === 0 && <div style={{padding:30,textAlign:'center',color:$textMut,fontSize:'0.85rem'}}>Aucun ordre de travail trouvé</div>}
            </div>)}
            {/* Edit modal */}
            {odtEdit && (<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setOdtEdit(null)}>
              <div style={{background:$bgCard,borderRadius:crmRd,width:'95%',maxWidth:700,maxHeight:'90vh',overflow:'auto',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'16px 20px',borderBottom:`2px solid ${$accent}`,fontWeight:800,fontSize:'1rem',color:$text}}>◆ {data.find(d=>d.id===odtEdit.id)?'Modifier':'Nouvel'} Ordre de Travail</div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  {[{k:'titre',l:'Titre',span:2},{k:'type',l:'Type',type:'select',opts:ODT_TYPES},{k:'priorite',l:'Priorité',type:'select',opts:ODT_PRIORITES},{k:'statut',l:'Statut',type:'select',opts:ODT_STATUTS},{k:'dateEmission',l:'Date émission',type:'date'},{k:'dateDebut',l:'Date début',type:'date'},{k:'dateFin',l:'Date fin',type:'date'},{k:'heuresEstimees',l:'Heures estimées',type:'number'},{k:'heuresReelles',l:'Heures réalisées',type:'number'},{k:'consignes',l:'Consignes',type:'textarea',span:2},{k:'securite',l:'Consignes sécurité',type:'textarea',span:2},{k:'observations',l:'Observations',type:'textarea',span:2}].map(f => (
                    <div key={f.k} style={{gridColumn:f.span?'span 2':''}}>
                      <label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                      {f.type==='select'?<select value={odtEdit[f.k]||''} onChange={e=>setOdtEdit({...odtEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}>{f.opts.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select>
                      :f.type==='textarea'?<textarea value={odtEdit[f.k]||''} onChange={e=>setOdtEdit({...odtEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                      :f.type==='number'?<input type="number" value={odtEdit[f.k]||0} onChange={e=>setOdtEdit({...odtEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                      :f.type==='date'?<input type="date" value={odtEdit[f.k]||''} onChange={e=>setOdtEdit({...odtEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                      :<input value={odtEdit[f.k]||''} onChange={e=>setOdtEdit({...odtEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                    </div>
                  ))}
                  <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Filiale</label><select value={odtEdit.filialeId||''} onChange={e=>setOdtEdit({...odtEdit,filialeId:e.target.value?Number(e.target.value):null})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}><option value="">—</option>{filialesDynamiques.map(f=><option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}</select></div>
                  <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Responsable</label><select value={odtEdit.responsableId||''} onChange={e=>setOdtEdit({...odtEdit,responsableId:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}><option value="">—</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>)}</select></div>
                  <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Chantier</label><select value={odtEdit.chantierId||''} onChange={e=>setOdtEdit({...odtEdit,chantierId:e.target.value||null})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}><option value="">Hors chantier</option>{chantiers.map(c=><option key={c.id} value={c.id}>{c.nom}</option>)}</select></div>
                </div>
                <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                  <div>{data.find(d=>d.id===odtEdit.id)&&<button onClick={()=>{saveOdt(data.filter(d=>d.id!==odtEdit.id));setOdtEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Suppr.</button>}</div>
                  <div style={{display:'flex',gap:6}}><button onClick={()=>setOdtEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(d=>d.id===odtEdit.id);if(ex){saveOdt(data.map(d=>d.id===odtEdit.id?odtEdit:d));}else{saveOdt([...data,odtEdit]);}setOdtEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
                </div>
              </div>
            </div>)}
          </div>
        );
}
