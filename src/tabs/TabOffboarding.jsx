// === Onglet « offboarding » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabOffboarding(__props) {
  const { $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FilLink, chantiers, crmRd, currentUser, empNom, filterByFiliale, highlightStyle, obDetailCat, offData, offEdit, offMotifFilter, offPosteDecision, offSettingsOpen, offStatutFilter, postes, setOffData, setOffEdit, setOffMotifFilter, setOffPosteDecision, setOffSettingsOpen, setOffStatutFilter, setPostes } = __props;
        const OFF_MOTIFS = [{id:'demission',label:'Démission',color:'#3b82f6'},{id:'licenciement',label:'Licenciement',color:'#ef4444'},{id:'rupture_conv',label:'Rupture conventionnelle',color:'#f59e0b'},{id:'fin_pe',label:'Fin période essai',color:'#8b5cf6'},{id:'fin_cdd',label:'Fin CDD/Chantier',color:'#6366f1'},{id:'retraite',label:'Départ retraite',color:'#10b981'},{id:'autre',label:'Autre',color:$textSec}];
        const OFF_PHASES = [{id:'notification',l:'Notification',c:'#ef4444'},{id:'preparation',l:'Préparation du départ',c:'#f59e0b'},{id:'jour_depart',l:'Le jour du départ',c:'#3b82f6'},{id:'apres_depart',l:'Après le départ',c:'#10b981'}];
        const OFF_CHECKLISTS = {
          default: [
            {cat:'📋 Administratif & Paie', items:[
              {t:'Notification officielle (lettre RAR / convocation)',obligatoire:true,delai:'notification'},
              {t:'Certificat de travail préparé',obligatoire:true,delai:'preparation'},
              {t:'Attestation Pôle Emploi établie',obligatoire:true,delai:'jour_depart'},
              {t:'Solde de tout compte calculé',obligatoire:true,delai:'preparation'},
              {t:'Solde de tout compte signé par le salarié',obligatoire:true,delai:'jour_depart'},
              {t:'Reçu pour solde de tout compte remis',obligatoire:true,delai:'jour_depart'},
              {t:'Dernière fiche de paie émise',obligatoire:true,delai:'jour_depart'},
              {t:'Indemnités versées (CP, RTT, licenciement, etc.)',obligatoire:true,delai:'jour_depart'},
              {t:'Indemnités de préavis calculées (si dispense)',obligatoire:false,delai:'preparation'},
              {t:'Portabilité mutuelle notifiée',obligatoire:true,delai:'preparation'},
              {t:'Portabilité prévoyance notifiée',obligatoire:true,delai:'preparation'},
              {t:'Lettre de notification remise en main propre / RAR',obligatoire:true,delai:'notification'},
              {t:'PV restitution signé',obligatoire:true,delai:'jour_depart'}
            ]},
            {cat:'🏗️ BTP spécifique', items:[
              {t:'Radiation CIBTP (Caisse Congés Payés BTP)',obligatoire:true,delai:'apres_depart'},
              {t:'Restitution carte BTP',obligatoire:true,delai:'jour_depart'},
              {t:'Radiation mutuelle BTP (AG2R / PRO BTP)',obligatoire:true,delai:'apres_depart'},
              {t:'Radiation prévoyance BTP',obligatoire:true,delai:'apres_depart'},
              {t:'Clôture compte OPPBTP / passeport prévention',obligatoire:true,delai:'apres_depart'},
              {t:'Transfert habilitations si applicable',obligatoire:false,delai:'preparation'},
              {t:'Archivage dossier formation / habilitations',obligatoire:false,delai:'apres_depart'},
              {t:'Radiation registre unique du personnel',obligatoire:true,delai:'jour_depart'}
            ]},
            {cat:'🚗 Véhicule & Déplacements', items:[
              {t:'Véhicule de société / fonction restitué',obligatoire:false,delai:'jour_depart'},
              {t:'État des lieux véhicule réalisé + signé',obligatoire:false,delai:'jour_depart'},
              {t:'Carte carburant restituée',obligatoire:false,delai:'jour_depart'},
              {t:'Badge télépéage restitué',obligatoire:false,delai:'jour_depart'},
              {t:'Assurance véhicule résiliée / transférée',obligatoire:false,delai:'apres_depart'},
              {t:'Contrôle technique si nécessaire',obligatoire:false,delai:'preparation'}
            ]},
            {cat:'👷 EPI & Matériel terrain', items:[
              {t:'EPI restitués (casque, chaussures, gilet)',obligatoire:true,delai:'jour_depart'},
              {t:'Harnais antichute restitué',obligatoire:false,delai:'jour_depart'},
              {t:'Outillage personnel inventorié et restitué',obligatoire:false,delai:'jour_depart'},
              {t:'Clés bureau / dépôt / chantier restituées',obligatoire:true,delai:'jour_depart'},
              {t:'Badge accès restitué',obligatoire:true,delai:'jour_depart'},
              {t:'Vêtements de travail floqués restitués',obligatoire:false,delai:'jour_depart'}
            ]},
            {cat:'💻 IT & Matériel informatique', items:[
              {t:'PC portable / tablette restitué',obligatoire:false,delai:'jour_depart'},
              {t:'Smartphone professionnel restitué',obligatoire:false,delai:'jour_depart'},
              {t:'Chargeurs et accessoires restitués',obligatoire:false,delai:'jour_depart'},
              {t:'Écran externe / clavier restitués',obligatoire:false,delai:'jour_depart'}
            ]},
            {cat:'📧 Désactivation accès & comptes', items:[
              {t:'Compte Google Workspace désactivé',obligatoire:true,delai:'jour_depart'},
              {t:'Email — réponse automatique configurée',obligatoire:true,delai:'jour_depart'},
              {t:'Email — transfert vers remplaçant configuré',obligatoire:true,delai:'preparation'},
              {t:'Compte Monday.com désactivé',obligatoire:true,delai:'jour_depart'},
              {t:'Accès Pennylane retiré',obligatoire:false,delai:'jour_depart'},
              {t:'Accès CRM Group OY retiré',obligatoire:true,delai:'jour_depart'},
              {t:'Accès Google Drive — transfert propriété fichiers',obligatoire:true,delai:'preparation'},
              {t:'Suppression VPN / accès distants',obligatoire:false,delai:'jour_depart'},
              {t:'Accès Yousign retiré',obligatoire:false,delai:'jour_depart'},
              {t:'Signature email supprimée',obligatoire:true,delai:'jour_depart'},
              {t:'Retrait des listes de diffusion',obligatoire:true,delai:'jour_depart'}
            ]},
            {cat:'📁 Dossiers & Archivage', items:[
              {t:'Dossiers Google Drive transférés au successeur',obligatoire:true,delai:'preparation'},
              {t:'Archivage dossier salarié (contrat, avenants, etc.)',obligatoire:true,delai:'apres_depart'},
              {t:'Passation dossiers chantiers en cours',obligatoire:true,delai:'preparation'},
              {t:'Clients / fournisseurs informés du changement',obligatoire:false,delai:'preparation'},
              {t:'Notes de passation rédigées',obligatoire:false,delai:'preparation'}
            ]},
            {cat:'🤝 Entretien & Clôture', items:[
              {t:'Entretien de sortie réalisé (par RH ou direction)',obligatoire:true,delai:'preparation'},
              {t:'Feedback recueilli (questionnaire satisfaction)',obligatoire:false,delai:'preparation'},
              {t:'Clause de non-concurrence rappelée (si applicable)',obligatoire:false,delai:'jour_depart'},
              {t:'Email de départ envoyé aux équipes',obligatoire:false,delai:'jour_depart'},
              {t:'Recommandation LinkedIn proposée (si applicable)',obligatoire:false,delai:'apres_depart'}
            ]}
          ]
        };
        const saveOff = d => { setOffData(d); };
        const sampleOff = [
          {id:'OFF-001',employeId:'EMP021',collaborateur:'Laurent DIES',filialeId:3,filiale:'Ezel Bâtiment',poste:"Chargé d'Affaires",motif:'licenciement',dateSortie:'2026-06-30',statut:'en_cours',checklist:OFF_CHECKLISTS.default.flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,delai:item.delai||''})))},
          {id:'OFF-002',employeId:'EMP022',collaborateur:'Abid MOMAND',filialeId:3,filiale:'Ezel Bâtiment',poste:'Ouvrier Qualifié',motif:'fin_cdd',dateSortie:'2026-03-31',statut:'termine',checklist:OFF_CHECKLISTS.default.flatMap(cat => cat.items.map(item => ({t:item.t,done:true,cat:cat.cat,delai:item.delai||''})))}
        ];
        const data = filterByFiliale(offData.length > 0 ? offData : sampleOff);
        return (
          <div>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:'linear-gradient(90deg, rgba(128,128,128,0.10), rgba(128,128,128,0.04))'}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>👋</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Offboarding</h2>
                        {data.filter(d=>d.statut==='en_cours').length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#ef444415',color:'#ef4444',fontWeight:700,border:'1px solid #ef444430'}}>{data.filter(d=>d.statut==='en_cours').length} en cours</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Solde de tout compte · Restitution matériel · Radiation BTP · {data.length} départ{data.length>1?'s':''}</p>
                    </div>
                  </div>
                  <button onClick={()=>setOffEdit({id:'OFF-'+String(data.length+1).padStart(3,'0'),collaborateur:'',poste:'',filiale:'Ezel Bâtiment',filialeId:3,motif:'demission',dateSortie:new Date().toISOString().slice(0,10),statut:'en_cours',checklist:OFF_CHECKLISTS.default.flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,delai:item.delai||''})))})} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#ef4444',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Nouveau départ
                  </button>
                </div>
              </div>
            </div>

            {/* Offboarding → Poste Decision Modal */}
            {offPosteDecision&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setOffPosteDecision(null)}>
              <div style={{background:$bgCard,width:'94%',maxWidth:500,borderRadius:crmRd,padding:24,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{fontSize:'1.1rem',fontWeight:700,color:$text,marginBottom:4}}>Que faire du poste ?</div>
                <div style={{fontSize:'0.82rem',color:$textMut,marginBottom:16}}>{offPosteDecision.collaborateur} — {offPosteDecision.poste}</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {[
                    {id:'remplacer_cdi',label:'🔄 Remplacer (CDI)',desc:'Ouvrir le poste pour recrutement CDI',color:'#DC2626',action:()=>{const linkedPoste=postes.find(p=>p.titulaire===offPosteDecision.employeId);if(linkedPoste){setPostes(prev=>prev.map(p=>p.id===linkedPoste.id?{...p,statut:'ouvert',titulaire:null,besoinType:'remplacement',sousMotif:offPosteDecision.motif||'demission',urgence:'1_mois',dateBesoin:offPosteDecision.dateSortie||new Date().toISOString().slice(0,10),justification:'Remplacement suite départ '+offPosteDecision.collaborateur,historique:[...(p.historique||[]),{date:new Date().toISOString().slice(0,10),action:'Poste ouvert — remplacement CDI suite départ '+offPosteDecision.collaborateur,par:currentUser?.prenom||''}]}:p));}setOffPosteDecision(null);}},
                    {id:'remplacer_temp',label:'⏱️ Remplacement temporaire (CDD/Intérim)',desc:'Remplacement provisoire — le titulaire reviendra',color:'#F59E0B',action:()=>{const linkedPoste=postes.find(p=>p.titulaire===offPosteDecision.employeId);if(linkedPoste){setPostes(prev=>prev.map(p=>p.id===linkedPoste.id?{...p,statut:'remplacement_temp',besoinType:'remplacement',sousMotif:offPosteDecision.motif||'arret_maladie',typeContrat:'cdd',urgence:'immediate',dateBesoin:new Date().toISOString().slice(0,10),justification:'Remplacement temporaire — '+offPosteDecision.collaborateur+' absent',historique:[...(p.historique||[]),{date:new Date().toISOString().slice(0,10),action:'Remplacement temporaire suite absence '+offPosteDecision.collaborateur,par:currentUser?.prenom||''}]}:p));}setOffPosteDecision(null);}},
                    {id:'geler',label:'⏸️ Geler le poste',desc:'Besoin identifié mais pas de budget ou pas prioritaire',color:'#7C3AED',action:()=>{const linkedPoste=postes.find(p=>p.titulaire===offPosteDecision.employeId);if(linkedPoste){setPostes(prev=>prev.map(p=>p.id===linkedPoste.id?{...p,statut:'gele',titulaire:null,besoinType:'remplacement',sousMotif:offPosteDecision.motif||'demission',justification:'Poste gelé suite départ '+offPosteDecision.collaborateur+' — en attente décision',historique:[...(p.historique||[]),{date:new Date().toISOString().slice(0,10),action:'Poste gelé suite départ '+offPosteDecision.collaborateur,par:currentUser?.prenom||''}]}:p));}setOffPosteDecision(null);}},
                    {id:'supprimer',label:'❌ Supprimer le poste',desc:'Le poste n\'est plus nécessaire',color:'#9CA3AF',action:()=>{setPostes(prev=>prev.filter(p=>p.titulaire!==offPosteDecision.employeId));setOffPosteDecision(null);}},
                    {id:'rien',label:'📌 Ne rien faire pour l\'instant',desc:'Décision reportée — le poste reste Pourvu',color:'#6B7280',action:()=>setOffPosteDecision(null)},
                  ].map(opt=>(
                    <button key={opt.id} onClick={opt.action} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:crmRd,border:`1px solid ${opt.color}30`,background:opt.color+'08',cursor:'pointer',fontFamily:'inherit',textAlign:'left',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=opt.color+'18'} onMouseLeave={e=>e.currentTarget.style.background=opt.color+'08'}>
                      <div><div style={{fontSize:'0.85rem',fontWeight:600,color:opt.color}}>{opt.label}</div><div style={{fontSize:'0.68rem',color:$textMut,marginTop:2}}>{opt.desc}</div></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>}

            {/* Filtres row */}
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:6}}>
              <button onClick={()=>setOffSettingsOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${offSettingsOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:offSettingsOpen?$accentSub:'transparent',color:offSettingsOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                ⚙ Filtres & Colonnes {(offStatutFilter!=='tous'||offMotifFilter!=='tous')&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
              </button>
              {offStatutFilter!=='tous'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setOffStatutFilter('tous')}>✕ {offStatutFilter==='en_cours'?'En cours':'Terminé'}</span>}
              {offMotifFilter!=='tous'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setOffMotifFilter('tous')}>✕ {OFF_MOTIFS.find(m=>m.id===offMotifFilter)?.label||offMotifFilter}</span>}
            </div>
            {/* ⚙ Filtres panel */}
            {offSettingsOpen&&<><div onClick={()=>setOffSettingsOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par statut</div>
                <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`}}>
                  {[{id:'tous',l:'Tous'},{id:'en_cours',l:'En cours'},{id:'termine',l:'Terminé'}].map(s=>(
                    <button key={s.id} onClick={()=>setOffStatutFilter(s.id)} style={{flex:1,padding:'5px 8px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:offStatutFilter===s.id?$selBg:'transparent',color:offStatutFilter===s.id?$selText:$textMut,fontWeight:offStatutFilter===s.id?600:400,fontSize:'0.7rem',transition:'all 0.15s',fontFamily:'inherit'}}>{s.l}</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par motif</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  <button onClick={()=>setOffMotifFilter('tous')} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:offMotifFilter==='tous'?$accentSub:'transparent',color:offMotifFilter==='tous'?$accent:$textSec,fontWeight:offMotifFilter==='tous'?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',transition:'all 0.1s'}}>Tous les motifs</button>
                  {OFF_MOTIFS.map(m=>(
                    <button key={m.id} onClick={()=>setOffMotifFilter(m.id)} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',cursor:'pointer',background:offMotifFilter===m.id?m.color+'15':'transparent',color:offMotifFilter===m.id?m.color:$textSec,fontWeight:offMotifFilter===m.id?600:400,fontSize:'0.74rem',textAlign:'left',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,transition:'all 0.1s'}}><span style={{width:6,height:6,borderRadius:'50%',background:m.color}}/>{m.label}</button>
                  ))}
                </div>
              </div>
            </div></>}
            {/* Compteurs motifs */}
            <div style={{display:'flex', gap:8, marginBottom:14, flexWrap:'wrap'}}>
              {OFF_MOTIFS.map(m => {const n = data.filter(d=>d.motif===m.id).length; return n > 0 ? <div key={m.id} style={{background:$bgCard, padding:'10px 14px', border:`1px solid ${$border}`, borderRadius:crmRd, display:'flex', alignItems:'center', gap:8, transition:'all 0.2s', cursor:'default', boxShadow:$shadow}}><span style={{width:8,height:8,borderRadius:'50%',background:m.color}}/><span style={{fontSize:'0.8rem', color:$textSec}}>{m.label}</span><span style={{fontWeight:800, color:m.color}}>{n}</span></div> : null;})}
            </div>
            {/* Cards */}
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {data.filter(ob=>(offStatutFilter==='tous'||ob.statut===offStatutFilter)&&(offMotifFilter==='tous'||ob.motif===offMotifFilter)).map(ob => {
                const done = ob.checklist.filter(c=>c.done).length; const total = ob.checklist.length; const pct = Math.round(done/total*100);
                const motif = OFF_MOTIFS.find(m=>m.id===ob.motif) || OFF_MOTIFS[6];
                const cats = [...new Set(ob.checklist.map(c => c.cat))];
                return (
                  <div key={ob.id} style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, overflow:'hidden', boxShadow:$shadow, transition:'all 0.2s', ...highlightStyle('offboarding', ob.id)}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=$accent+'30';}} onMouseLeave={e=>{e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=$border;}}>
                    <div style={{padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`1px solid ${$border}`}}>
                      <div>
                        <div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{ob.employeId ? <EmpLink id={ob.employeId}/> : ob.collaborateur} <span style={{padding:'2px 8px',background:motif.color+'15',color:motif.color,fontWeight:600,fontSize:'0.72rem',marginLeft:6,borderRadius:crmRd>0?20:2,display:'inline-flex',alignItems:'center',gap:4}}>{motif.label}</span></div>
                        <div style={{fontSize:'0.78rem', color:$accent, marginTop:2}}>{ob.poste} — {ob.filialeId ? <FilLink id={ob.filialeId}/> : ob.filiale} — Sortie: {ob.dateSortie}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <span style={{padding:'3px 10px', background: pct===100?$success+'15':$warn+'15', color: pct===100?$success:$warn, fontWeight:700, fontSize:'0.75rem', borderRadius:crmRd>0?20:2, display:'inline-flex', alignItems:'center', gap:4}}>{pct===100?'Complété':'En cours'}</span>
                        <div style={{fontSize:'0.78rem', fontWeight:700, color:$accent, marginTop:4}}>{done}/{total}</div>
                      </div>
                    </div>
                    <div style={{padding:'10px 18px'}}>
                      <div style={{height:6, background:$bgSub, borderRadius:crmRd, overflow:'hidden', marginBottom:12}}>
                        <div style={{width:pct+'%', height:'100%', background: pct===100?`linear-gradient(90deg, ${$success}, #34d399)`:`linear-gradient(90deg, ${$warn}, #fbbf24)`, borderRadius:crmRd, transition:'width 0.5s ease-out'}}/>
                      </div>
                      {ob.statut==='en_cours'&&ob.employeId&&<div style={{marginBottom:10}}>
                        <button onClick={(e)=>{e.stopPropagation();setOffPosteDecision({employeId:ob.employeId,collaborateur:ob.employeId?empNom(ob.employeId):ob.collaborateur,poste:ob.poste,motif:ob.motif,dateSortie:ob.dateSortie});}} style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$warn}`,background:$warn+'08',color:$warn,fontSize:'0.72rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$warn+'20'} onMouseLeave={e=>e.currentTarget.style.background=$warn+'08'}>📋 Décision du poste — Que faire après le départ ?</button>
                      </div>}
                      {cats.map(cat => {
                        const catItems = ob.checklist.filter(c => c.cat === cat && (!obDetailCat || c.delai === obDetailCat));
                        const catDone = catItems.filter(c => c.done).length;
                        return (
                          <div key={cat} style={{marginBottom:8}}>
                            <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em',display:'flex',alignItems:'center',gap:8,paddingBottom:4,borderBottom:`1px solid ${$borderLight}`}}>{cat} ({catDone}/{catItems.length})</div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:3}}>
                              {catItems.map((c,i) => {
                                const globalIdx = ob.checklist.indexOf(c);
                                return (
                                  <div key={i} onClick={() => {const updated = data.map(d => d.id===ob.id?{...d, checklist:d.checklist.map((cc,ii)=>ii===globalIdx?{...cc,done:!cc.done}:cc)}:d); saveOff(updated);}} style={{display:'flex', alignItems:'center', gap:7, padding:'4px 8px', cursor:'pointer', borderRadius:Math.max(crmRd-3,2), background: c.done?$success+'08':'transparent', transition:'all 0.15s', border:`1px solid ${c.done?$success+'12':'transparent'}`}}>
                                    <span style={{width:16, height:16, borderRadius:Math.max(crmRd-4,3), border: c.done?'none':`2px solid ${$border}`, background: c.done?$success:'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'0.58rem', flexShrink:0, transition:'all 0.15s', boxShadow: c.done?`0 0 0 2px ${$success}20`:'none'}}>{c.done?'✓':''}</span>
                                    <span style={{fontSize:'0.72rem', color: c.done?$success:$textSec, textDecoration: c.done?'line-through':'none', transition:'color 0.15s'}}>{c.t}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Modal */}
            {offEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setOffEdit(null)}><div style={{background:$bgCard,width:'90%',maxWidth:520,maxHeight:'85vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>➕ Nouveau départ</span><button onClick={()=>setOffEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
              <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[{k:'collaborateur',l:'Collaborateur',span:2},{k:'poste',l:'Poste'},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte',"L'Étanchéité"]},{k:'motif',l:'Motif',type:'select',opts:OFF_MOTIFS.map(m=>m.id),labels:OFF_MOTIFS.map(m=>m.label)},{k:'dateSortie',l:'Date de sortie',type:'date'}].map(f => (
                  <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                    {f.type==='select'?<select value={offEdit[f.k]||''} onChange={e=>setOffEdit({...offEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                    :f.type==='date'?<input type="date" value={offEdit[f.k]||''} onChange={e=>setOffEdit({...offEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                    :<input value={offEdit[f.k]||''} onChange={e=>setOffEdit({...offEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                  </div>
                ))}
              </div>
              <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'flex-end',gap:6}}>
                <button onClick={()=>setOffEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button>
                <button onClick={()=>{saveOff([...data,offEdit]);setOffEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Créer</button>
              </div>
            </div></div>)}
          </div>
        );
}
