// === Onglet « dossier_rh » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabDossierRh(__props) {
  const { $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $info, $selBg, $selText, $shadow, $text, $textMut, $textSec, $warn, EmpLink, FilLink, crmRd, filNom, filterByFiliale, getEmploye, isYilmazContext, postes, rhData, rhFilter, rhSelected, rhSettingsOpen, rhTab, setRhData, setRhFilter, setRhSelected, setRhSettingsOpen, setRhTab } = __props;
        const saveRh = d => { setRhData(d); localStorage.setItem('ruches_rh_data', JSON.stringify(d)); };
        const DOC_TYPES = [{id:'contrat',label:'Contrat',color:'#3b82f6',icon:'◇'},{id:'avenant',label:'Avenant',color:'#8b5cf6',icon:'▸'},{id:'identite',label:'Pièce identité',color:'#f59e0b',icon:'●'},{id:'rib',label:'RIB',color:'#10b981',icon:'✓'},{id:'mutuelle',label:'Mutuelle',color:'#6366f1',icon:'◆'},{id:'prevoyance',label:'Prévoyance',color:'#0ea5e9',icon:'◈'},{id:'habilitation',label:'Habilitation',color:'#ef4444',icon:'▲'},{id:'visite_med',label:'Visite médicale',color:'#059669',icon:'+'},{id:'dpae',label:'DPAE',color:'#d97706',icon:'◰'},{id:'carte_btp',label:'Carte BTP',color:'#dc2626',icon:'■'},{id:'diplome',label:'Diplôme/Certificat',color:'#d97706',icon:'★'}];
        const RH_TABS = [{id:'documents',label:'Documents',icon:'◇'},{id:'visite_med',label:'Visites médicales',icon:'+'},{id:'mutuelle_prev',label:'Mutuelle & Prévoyance',icon:'◆'},{id:'dpae_btp',label:'DPAE & Carte BTP',icon:'◰'}];
        const sampleRh = [
          {id:'RH-001',employeId:'EMP008',filialeId:3,contrat:'CDI',matricule:'EZ-2020-003',dateEntree:'2020-03-01',
            documents:[
              {id:'D001',type:'contrat',nom:'CDI David Lemaire.pdf',date:'2020-03-01',expiration:null,statut:'valide'},
              {id:'D002',type:'identite',nom:'CNI Lemaire.pdf',date:'2020-02-20',expiration:'2030-02-20',statut:'valide'},
              {id:'D003',type:'rib',nom:'RIB Crédit Mutuel.pdf',date:'2024-03-01',expiration:null,statut:'valide'},
              {id:'D004',type:'dpae',nom:'DPAE URSSAF.pdf',date:'2020-02-28',expiration:null,statut:'valide'},
              {id:'D005',type:'carte_btp',nom:'Carte BTP n°67-2020-1842.pdf',date:'2020-04-15',expiration:null,statut:'valide'}
            ],
            visiteMedicale:{derniere:'2025-06-15',prochaine:'2027-06-15',type:'SIR',aptitude:'apte',medecin:'Dr. Schmitt — SIST BTP 67'},
            mutuelle:{organisme:'AG2R La Mondiale',formule:'Famille',adhesion:'2020-03-01',cotisation:180,conjoint:true,enfants:2},
            prevoyance:{organisme:'PRO BTP',formule:'Cadre',adhesion:'2020-03-01',cotisation:95}
          },
          {id:'RH-002',employeId:'EMP005',filialeId:3,contrat:'CDI',matricule:'EZ-2019-001',dateEntree:'2019-01-15',
            documents:[
              {id:'D010',type:'contrat',nom:'CDI Pierre Semerci.pdf',date:'2019-01-15',expiration:null,statut:'valide'},
              {id:'D011',type:'habilitation',nom:'CACES R489 Cat 3.pdf',date:'2025-03-17',expiration:'2030-03-15',statut:'valide'},
              {id:'D012',type:'visite_med',nom:'Visite médicale 2025.pdf',date:'2025-02-10',expiration:'2027-02-10',statut:'valide'},
              {id:'D013',type:'mutuelle',nom:'Adhésion mutuelle AG2R.pdf',date:'2019-02-01',expiration:null,statut:'valide'},
              {id:'D014',type:'dpae',nom:'DPAE URSSAF.pdf',date:'2019-01-10',expiration:null,statut:'valide'}
            ],
            visiteMedicale:{derniere:'2025-02-10',prochaine:'2027-02-10',type:'SIR',aptitude:'apte',medecin:'Dr. Schmitt — SIST BTP 67'},
            mutuelle:{organisme:'AG2R La Mondiale',formule:'Isolé',adhesion:'2019-02-01',cotisation:110,conjoint:false,enfants:0},
            prevoyance:{organisme:'PRO BTP',formule:'ETAM',adhesion:'2019-02-01',cotisation:65}
          },
          {id:'RH-003',employeId:'EMP014',filialeId:null,contrat:'CDI',matricule:'YZ-2020-002',dateEntree:'2020-09-01',
            documents:[
              {id:'D020',type:'contrat',nom:'CDI Sarah Ciccolallo.pdf',date:'2020-09-01',expiration:null,statut:'valide'},
              {id:'D021',type:'identite',nom:'CNI Sarah.pdf',date:'2020-08-25',expiration:'2030-08-25',statut:'valide'},
              {id:'D022',type:'diplome',nom:'Licence RH Strasbourg.pdf',date:'2020-09-01',expiration:null,statut:'valide'}
            ],
            visiteMedicale:{derniere:'2025-09-10',prochaine:'2030-09-10',type:'VIP',aptitude:'apte',medecin:'Dr. Keller — AISMT'},
            mutuelle:{organisme:'AG2R La Mondiale',formule:'Isolé',adhesion:'2020-09-15',cotisation:110,conjoint:false,enfants:0},
            prevoyance:{organisme:'PRO BTP',formule:'ETAM',adhesion:'2020-09-15',cotisation:55}
          },
          {id:'RH-004',employeId:'EMP011',filialeId:2,contrat:'CDI',matricule:'EC-2016-002',dateEntree:'2016-11-01',
            documents:[
              {id:'D030',type:'contrat',nom:'CDI Antoine Lefevre.pdf',date:'2016-11-01',expiration:null,statut:'valide'},
              {id:'D031',type:'habilitation',nom:'CACES R486 PEMP.pdf',date:'2024-11-06',expiration:'2029-11-04',statut:'valide'},
              {id:'D032',type:'habilitation',nom:'R408 Échafaudage.pdf',date:'2024-06-12',expiration:'2026-06-10',statut:'expire_bientot'}
            ],
            visiteMedicale:{derniere:'2024-09-20',prochaine:'2026-09-20',type:'SIR',aptitude:'apte',medecin:'Dr. Schmitt — SIST BTP 67'},
            mutuelle:{organisme:'AG2R La Mondiale',formule:'Famille',adhesion:'2016-11-15',cotisation:180,conjoint:true,enfants:1},
            prevoyance:{organisme:'PRO BTP',formule:'Ouvrier',adhesion:'2016-11-15',cotisation:45}
          },
          {id:'RH-005',employeId:'EMP015',filialeId:1,contrat:'CDI',matricule:'RL-2014-001',dateEntree:'2014-01-15',
            documents:[
              {id:'D040',type:'contrat',nom:'CDI Diane Arulsothy.pdf',date:'2014-01-15',expiration:null,statut:'valide'},
              {id:'D041',type:'identite',nom:'CNI Arulsothy.pdf',date:'2020-01-15',expiration:'2030-01-15',statut:'valide'},
              {id:'D042',type:'diplome',nom:'Permis C + FIMO.pdf',date:'2014-01-15',expiration:'2026-04-01',statut:'expire_bientot'}
            ],
            visiteMedicale:{derniere:'2025-01-20',prochaine:'2027-01-20',type:'SIR',aptitude:'apte',medecin:'Dr. Keller — AISMT'},
            mutuelle:{organisme:'AG2R La Mondiale',formule:'Famille',adhesion:'2014-02-01',cotisation:195,conjoint:true,enfants:3},
            prevoyance:{organisme:'PRO BTP',formule:'Cadre',adhesion:'2014-02-01',cotisation:110}
          }
        ];
        const data = filterByFiliale(rhData.length > 0 ? rhData : sampleRh);
        const filteredData = rhFilter === 'all' ? data : data.filter(d => filNom(d.filialeId) === rhFilter || (!d.filialeId && rhFilter === 'YILMAZ SAS'));
        return (
          <div>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:`linear-gradient(90deg,${$accent} 0%,${$accent}80 100%)`}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:$accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>▸</div>
                    <div>
                      <h2 style={{margin:'0 0 2px',fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Dossier du Personnel</h2>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>{data.length} dossiers · Visites médicales · Mutuelle · Prévoyance · DPAE</p>
                    </div>
                  </div>
                  {(()=>{const docsExp=data.flatMap(d=>d.documents||[]).filter(d=>d.statut==='expire');const vm=data.filter(d=>{if(!d.visiteMedicale?.prochaine)return false;const diff=Math.floor((new Date(d.visiteMedicale.prochaine)-new Date())/86400000);return diff<90;}).length;return(<div style={{display:'flex',gap:6}}>
                    {docsExp.length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#ef444415',color:'#ef4444',fontWeight:700,border:'1px solid #ef444430'}}>▲ {docsExp.length} doc expiré{docsExp.length>1?'s':''}</span>}
                    {vm>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#f59e0b15',color:'#d97706',fontWeight:700,border:'1px solid #f59e0b30'}}>{vm} visite{vm>1?'s':''} à planifier</span>}
                  </div>);})()}
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content',flexWrap:'wrap'}}>
                {RH_TABS.map(t => <button key={t.id} onClick={()=>setRhTab(t.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:rhTab===t.id?$selBg:'transparent',color:rhTab===t.id?$selText:$textMut,fontWeight:rhTab===t.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{t.icon} {t.label}</button>)}
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setRhSettingsOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${rhSettingsOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:rhSettingsOpen?$accentSub:'transparent',color:rhSettingsOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ✱ Filtres & Colonnes {rhFilter!=='all'&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {rhFilter!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setRhFilter('all')}>✕ {rhFilter}</span>}
              </div>
            </div>
            {/* ✱ Filtres panel */}
            {rhSettingsOpen&&<><div onClick={()=>setRhSettingsOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              {isYilmazContext&&<div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setRhFilter('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${rhFilter==='all'?$accent:$border}`,background:rhFilter==='all'?$selBg:'transparent',color:rhFilter==='all'?$selText:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Toutes</button>
                  {['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte',"L'Étanchéité"].map(f=>(
                    <button key={f} onClick={()=>setRhFilter(f)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${rhFilter===f?$accent:$border}`,background:rhFilter===f?$accent+'18':'transparent',color:rhFilter===f?$accent:$textSec,fontSize:'0.7rem',fontWeight:rhFilter===f?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{f}</button>
                  ))}
                </div>
              </div>}
            </div></>}
            {/* Layout: Left sidebar + Right content */}
            <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16}}>
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                {filteredData.map(rh => (
                  <div key={rh.id} onClick={() => setRhSelected(rh.id)} style={{padding:'10px 14px', border: rhSelected===rh.id ? `2px solid ${$accent}` : `1px solid ${$border}`, background: rhSelected===rh.id ? $accentSub : $bgCard, cursor:'pointer', borderRadius:crmRd, transition:'all 0.15s', boxShadow:rhSelected===rh.id?$shadow:'none'}}>
                    <div style={{fontWeight:700, fontSize:'0.88rem', color:$text}}><EmpLink id={rh.employeId}/></div>
                    <div style={{fontSize:'0.72rem', color:$accent}}>{rh.employeId ? (getEmploye(rh.employeId)?.posteExterne || getEmploye(rh.employeId)?.poste || '') : ''}</div>
                    <div style={{display:'flex', justifyContent:'space-between', marginTop:3}}>
                      <span style={{fontSize:'0.68rem', color:$textMut}}><FilLink id={rh.filialeId}/></span>
                      <span style={{fontSize:'0.68rem', color:$textMut}}>{rh.matricule||''}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:$bgCard, border:`1px solid ${$border}`, overflow:'hidden', borderRadius:crmRd, boxShadow:$shadow}}>
                {(() => {
                  const sel = data.find(d => d.id === rhSelected) || data[0];
                  if(!sel) return <div style={{padding:30, textAlign:'center', color:$textMut}}>Sélectionnez un collaborateur</div>;
                  return <>
                    <div style={{padding:'14px 18px', borderBottom:`1px solid ${$border}`, background:$bgSub}}>
                      <div style={{fontWeight:800, fontSize:'1rem', color:$text}}><EmpLink id={sel.employeId}/></div>
                      <div style={{display:'flex', gap:16, marginTop:4, fontSize:'0.78rem', color:$textSec, flexWrap:'wrap'}}>
                        <span>Contrat: <b>{sel.contrat||'—'}</b></span><span>Matricule: <b>{sel.matricule||'—'}</b></span><span>Entrée: <b>{sel.dateEntree||'—'}</b></span><span>Filiale: <b><FilLink id={sel.filialeId}/></b></span>
                      </div>
                    </div>
                    <div style={{padding:'12px 18px'}}>
                      {/* Documents tab */}
                      {rhTab === 'documents' && (<>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:$accent, marginBottom:10}}>Documents ({sel.documents.length})</div>
                        {sel.documents.map((doc,i) => {
                          const dt = DOC_TYPES.find(t => t.id === doc.type) || DOC_TYPES[0];
                          const isExpired = doc.expiration && new Date(doc.expiration) < new Date();
                          const isExpiring = doc.expiration && !isExpired && new Date(doc.expiration) < new Date(Date.now()+90*24*3600*1000);
                          return (
                            <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderBottom: i<sel.documents.length-1?`1px solid ${$border}`:'none', background: isExpired?'#fef2f2':isExpiring?'#fefce8':'transparent', marginBottom:2}}>
                              <span style={{width:28,height:28,background:dt.color+'18',display:'flex',alignItems:'center',justifyContent:'center',color:dt.color,fontWeight:700,fontSize:'0.75rem',flexShrink:0}}>{dt.icon}</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:600, fontSize:'0.82rem', color:$text}}>{doc.nom}</div>
                                <div style={{fontSize:'0.7rem', color:$textMut}}>{dt.label} — {doc.date}{doc.expiration ? ' → Exp: '+doc.expiration : ''}</div>
                              </div>
                              {isExpired && <span style={{padding:'2px 8px',background:'#fecaca',color:'#dc2626',fontWeight:700,fontSize:'0.7rem'}}>Expiré</span>}
                              {isExpiring && <span style={{padding:'2px 8px',background:'#fef3c7',color:'#a16207',fontWeight:700,fontSize:'0.7rem'}}>Bientôt</span>}
                              {!isExpired && !isExpiring && <span style={{padding:'2px 8px',background:'#dcfce7',color:'#15803d',fontWeight:700,fontSize:'0.7rem'}}>Valide</span>}
                            </div>
                          );
                        })}
                      </>)}
                      {/* Visite médicale tab */}
                      {rhTab === 'visite_med' && sel.visiteMedicale && (<>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:$accent, marginBottom:10}}>Suivi médical</div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                          {[
                            {l:'Type de suivi',v:sel.visiteMedicale.type === 'SIR' ? 'Suivi Individuel Renforcé (SIR)' : 'Visite d\'Information et Prévention (VIP)',c:sel.visiteMedicale.type==='SIR'?'#ef4444':'#3b82f6'},
                            {l:'Dernière visite',v:sel.visiteMedicale.derniere,c:'#059669'},
                            {l:'Prochaine visite',v:sel.visiteMedicale.prochaine,c: new Date(sel.visiteMedicale.prochaine) < new Date(Date.now()+180*24*3600*1000) ? '#f59e0b' : '#059669'},
                            {l:'Aptitude',v:sel.visiteMedicale.aptitude === 'apte' ? '✓ Apte' : sel.visiteMedicale.aptitude === 'inapte' ? '✕ Inapte' : '? En attente',c:sel.visiteMedicale.aptitude==='apte'?'#059669':'#dc2626'},
                            {l:'Médecin du travail',v:sel.visiteMedicale.medecin,c:'#6b5d4d'}
                          ].map((item,i) => (
                            <div key={i} style={{padding:'10px 12px',border:`1px solid ${$border}`,background:$bgSub}}>
                              <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600}}>{item.l}</div>
                              <div style={{fontSize:'0.88rem',fontWeight:700,color:item.c,marginTop:2}}>{item.v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{marginTop:12,padding:'10px 12px',background:$info+'12',border:'1px solid #bfdbfe',fontSize:'0.75rem',color:'#1e40af'}}>
                          <b>Rappel BTP:</b> Suivi renforcé (SIR) obligatoire pour postes à risques (amiante, bruit, hauteur, port de charges). Renouvellement tous les 4 ans max. VIP pour postes sans risque: renouvellement tous les 5 ans.
                        </div>
                      </>)}
                      {/* Mutuelle & Prévoyance tab */}
                      {rhTab === 'mutuelle_prev' && (<>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:$accent, marginBottom:10}}>Mutuelle & Prévoyance BTP</div>
                        {sel.mutuelle && (
                          <div style={{padding:'12px 14px',border:`1px solid ${$border}`,background:$bgSub,marginBottom:12}}>
                            <div style={{fontWeight:700,color:'#6366f1',fontSize:'0.85rem',marginBottom:6}}>◆ Mutuelle obligatoire</div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,fontSize:'0.78rem'}}>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Organisme</span><div style={{fontWeight:600}}>{sel.mutuelle.organisme}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Formule</span><div style={{fontWeight:600}}>{sel.mutuelle.formule}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Cotisation</span><div style={{fontWeight:700,color:$accent}}>{sel.mutuelle.cotisation}€/mois</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Adhésion</span><div style={{fontWeight:600}}>{sel.mutuelle.adhesion}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Conjoint</span><div style={{fontWeight:600}}>{sel.mutuelle.conjoint?'Oui':'Non'}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Enfants</span><div style={{fontWeight:600}}>{sel.mutuelle.enfants}</div></div>
                            </div>
                          </div>
                        )}
                        {sel.prevoyance && (
                          <div style={{padding:'12px 14px',border:`1px solid ${$border}`,background:$bgSub}}>
                            <div style={{fontWeight:700,color:'#0ea5e9',fontSize:'0.85rem',marginBottom:6}}>◈ Prévoyance BTP</div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,fontSize:'0.78rem'}}>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Organisme</span><div style={{fontWeight:600}}>{sel.prevoyance.organisme}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Formule</span><div style={{fontWeight:600}}>{sel.prevoyance.formule}</div></div>
                              <div><span style={{color:$textMut,fontSize:'0.68rem'}}>Cotisation</span><div style={{fontWeight:700,color:$accent}}>{sel.prevoyance.cotisation}€/mois</div></div>
                            </div>
                          </div>
                        )}
                      </>)}
                      {/* DPAE & Carte BTP tab */}
                      {rhTab === 'dpae_btp' && (<>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:$accent, marginBottom:10}}>DPAE & Carte BTP</div>
                        {(() => {
                          const dpaeDoc = sel.documents.find(d => d.type === 'dpae');
                          const carteBtp = sel.documents.find(d => d.type === 'carte_btp');
                          return (
                            <div style={{display:'flex',flexDirection:'column',gap:10}}>
                              <div style={{padding:'12px 14px',border:`1px solid ${$border}`,background: dpaeDoc ? '#ecfdf5' : '#fef2f2'}}>
                                <div style={{fontWeight:700,color:dpaeDoc?'#059669':'#dc2626',fontSize:'0.85rem'}}>◰ DPAE (Déclaration Préalable à l'Embauche)</div>
                                {dpaeDoc ? (
                                  <div style={{fontSize:'0.78rem',color:$textSec,marginTop:4}}>
                                    <div>Fichier: <b>{dpaeDoc.nom}</b></div>
                                    <div>Date: <b>{dpaeDoc.date}</b></div>
                                    <div style={{color:'#059669',fontWeight:600,marginTop:4}}>✓ DPAE effectuée auprès de l'URSSAF</div>
                                  </div>
                                ) : (
                                  <div style={{fontSize:'0.78rem',color:'#dc2626',fontWeight:600,marginTop:4}}>▲ DPAE manquante — Obligation avant J1</div>
                                )}
                              </div>
                              <div style={{padding:'12px 14px',border:`1px solid ${$border}`,background: carteBtp ? '#ecfdf5' : '#fef2f2'}}>
                                <div style={{fontWeight:700,color:carteBtp?'#059669':'#dc2626',fontSize:'0.85rem'}}>■ Carte BTP (CIBTP)</div>
                                {carteBtp ? (
                                  <div style={{fontSize:'0.78rem',color:$textSec,marginTop:4}}>
                                    <div>Fichier: <b>{carteBtp.nom}</b></div>
                                    <div>Date: <b>{carteBtp.date}</b></div>
                                    <div style={{color:'#059669',fontWeight:600,marginTop:4}}>✓ Carte BTP active</div>
                                  </div>
                                ) : (
                                  <div style={{fontSize:'0.78rem',color:'#dc2626',fontWeight:600,marginTop:4}}>▲ Carte BTP manquante — Obligatoire pour tous les intervenants chantier</div>
                                )}
                              </div>
                              <div style={{marginTop:6,padding:'10px 12px',background:$info+'12',border:'1px solid #bfdbfe',fontSize:'0.75rem',color:'#1e40af'}}>
                                <b>Rappel:</b> La DPAE doit être effectuée au plus tard le jour de l'embauche. La carte BTP est obligatoire pour tout salarié intervenant sur un chantier de bâtiment ou de travaux publics (demande via CIBTP).
                              </div>
                            </div>
                          );
                        })()}
                      </>)}
                    </div>
                  </>;
                })()}
              </div>
            </div>
          </div>
        );
}
