// === Onglet « collaborateurs » — extrait de App.jsx (modularisation, forme frag) ===
import { Search } from 'lucide-react';

export default function TabCollaborateurs(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selBorder, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, COLLAB_CONDITIONS, COLLAB_CONTRATS, COLLAB_STATUTS, calcAge, calcAnciennete, cancelEditCollab, chantiers, collabColWidths, collabConditionFilter, collabContratFilter, collabDetailTab, collabDocAdding, collabDocNom, collabDocType, collabDocUrl, collabFilterOpen, collabFiltreFiliale, collabOngletId, collabSearch, collabSort, collabStatutFilter, collabView, collabVisibleCols, collaborateurs, crmRd, employes, emptyEmploye, filialesDynamiques, getChantiersCollab, niveau, postes, setCollabColWidths, setCollabConditionFilter, setCollabContratFilter, setCollabDetailTab, setCollabDocAdding, setCollabDocNom, setCollabDocType, setCollabDocUrl, setCollabFilterOpen, setCollabFiltreFiliale, setCollabOngletId, setCollabSearch, setCollabSort, setCollabStatutFilter, setCollabView, setCollabVisibleCols, setConfirmDelete, setDashboardChantierId, setDashboardFiliale, setDashboardVue, setEmployeForm, setModalEmploye, setNavEntreprise, setNavService, setOngletActif, setPosteSelectionne, showBorderAccent } = __props;
  return (
        <>
          {!collabOngletId && (() => {
            const normFil = (e) => {
              const fid = e.filialeId;
              if (fid === 'yilmaz' || fid == null || fid === '' || fid === 0 || fid === '0' || fid === false) return 'yilmaz';
              return String(fid);
            };
            const countByFil = (fId) => employes.filter(e => normFil(e) === String(fId)).length;
            const searchLower = collabSearch.toLowerCase().trim();
            const filteredEmployes = employes.filter(e => {
              if (collabFiltreFiliale.length > 0 && !collabFiltreFiliale.map(String).includes(normFil(e))) return false;
              const empStatut = e.statut || (e.arretMaladie ? 'actif' : 'actif');
              const empCondition = e.condition || (e.arretMaladie ? 'arret_maladie' : '');
              if (collabStatutFilter.length > 0 && !collabStatutFilter.includes(empStatut)) return false;
              if (collabConditionFilter.length > 0 && !collabConditionFilter.includes(empCondition)) return false;
              if (searchLower && !(
                (e.prenom+' '+e.nom).toLowerCase().includes(searchLower) ||
                (e.nom+' '+e.prenom).toLowerCase().includes(searchLower) ||
                (e.posteInterne||'').toLowerCase().includes(searchLower) ||
                (e.posteExterne||'').toLowerCase().includes(searchLower) ||
                (e.niveau||'').toLowerCase().includes(searchLower) ||
                (e.email||'').toLowerCase().includes(searchLower) ||
                (e.statutContrat||'').toLowerCase().includes(searchLower) ||
                (e.telFixe||'').includes(searchLower) ||
                (e.portable||'').includes(searchLower)
              )) return false;
              return true;
            });
            const niveauxOrd = ['XXXL','XXL','XL','L','M','S','XS','XXS'];
            const sortedEmployes = [...filteredEmployes].sort((a, b) => {
              const sk = collabSort.key;
              const dir = collabSort.dir === 'asc' ? 1 : -1;
              if (sk === 'niveau') return dir * (niveauxOrd.indexOf(a.niveau) - niveauxOrd.indexOf(b.niveau));
              if (sk === 'nom') return dir * ((a.nom||'').localeCompare(b.nom||''));
              if (sk === 'posteR') return dir * ((a.posteInterne||'').localeCompare(b.posteInterne||''));
              if (sk === 'filiale') { const fa=(filialesDynamiques.find(f=>f.id===a.filialeId)||{nom:'Yilmaz'}).nom; const fb=(filialesDynamiques.find(f=>f.id===b.filialeId)||{nom:'Yilmaz'}).nom; return dir*fa.localeCompare(fb); }
              if (sk === 'age') return dir * ((calcAge(a.dateNaissance)||0) - (calcAge(b.dateNaissance)||0));
              if (sk === 'anc') return dir * (new Date(a.dateEntree||0) - new Date(b.dateEntree||0));
              if (sk === 'fixe') return dir * ((a.salaireFix||0) - (b.salaireFix||0));
              if (sk === 'email') return dir * ((a.email||'').localeCompare(b.email||''));
              if (sk === 'contrat') return dir * ((a.statutContrat||'cdi').localeCompare(b.statutContrat||'cdi'));
              if (sk === 'statut') return dir * ((a.statut||'actif').localeCompare(b.statut||'actif'));
              if (sk === 'tel') return dir * ((a.telFixe||'').localeCompare(b.telFixe||''));
              if (sk === 'portable') return dir * ((a.portable||'').localeCompare(b.portable||''));
              if (sk === 'prime') return dir * ((a.primeFix||0) - (b.primeFix||0));
              if (sk === 'var') return dir * ((a.variable||0) - (b.variable||0));
              if (sk === 'total') return dir * (((a.salaireFix||0)+(a.primeFix||0)+(a.variable||0)) - ((b.salaireFix||0)+(b.primeFix||0)+(b.variable||0)));
              if (sk === 'ch') return dir * ((getChantiersCollab(a.id).length) - (getChantiersCollab(b.id).length));
              return 0;
            });
            const toggleSort = (key) => setCollabSort(p => p.key===key ? (p.dir==='asc' ? {key,dir:'desc'} : {key:'niveau',dir:'asc'}) : {key,dir:'asc'});
            const sortIcon = (key) => collabSort.key===key ? (collabSort.dir==='asc'?'↑':'↓') : '';
            const actifsCnt = employes.filter(e=>(!e.statut||e.statut==='actif')).length;
            const arriveesCnt = employes.filter(e=>e.statut==='en_cours_arriver').length;
            const departsCnt = employes.filter(e=>e.statut==='en_cours_depart').length;
            return (<>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:`linear-gradient(90deg,${$accent} 0%,${$accent}80 100%)`}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:$accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>👥</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Collaborateurs</h2>
                        {arriveesCnt>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#10b98115',color:'#059669',fontWeight:700,border:'1px solid #10b98130'}}>+{arriveesCnt} arrivée{arriveesCnt>1?'s':''}</span>}
                        {departsCnt>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#ef444415',color:'#dc2626',fontWeight:700,border:'1px solid #ef444430'}}>{departsCnt} départ{departsCnt>1?'s':''}</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Base RH centralisée · Yilmaz Services Partagés · {employes.length} collaborateurs</p>
                    </div>
                  </div>
                  <button onClick={() => { setEmployeForm({...emptyEmploye}); setModalEmploye('add'); }} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:$accent,fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Ajouter
                  </button>
                </div>
                <div style={{display:'flex',gap:20,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                  {[{l:'Actifs',v:actifsCnt,c:'#10b981'},{l:'Filtrés',v:filteredEmployes.length,c:$accent},{l:'Résultats affichés',v:sortedEmployes.length,c:$textSec}].map((k,i)=>(
                    <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}>
                      <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{k.l}</div>
                      <div style={{fontSize:'1.1rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em'}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* View toggle + Filtres */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>
                {[{id:'liste',l:'Liste'},{id:'cartes',l:'Cartes'},{id:'stats',l:'Statistiques'}].map(v=>(
                  <button key={v.id} onClick={()=>setCollabView(v.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:collabView===v.id?$selBg:'transparent',color:collabView===v.id?$selText:$textMut,border:collabView===v.id?`1px solid ${$selBorder}`:'1px solid transparent',fontWeight:collabView===v.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{v.l}</button>
                ))}
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setCollabFilterOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${collabFilterOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:collabFilterOpen?$accentSub:'transparent',color:collabFilterOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ⚙ Filtres & Colonnes {(collabFiltreFiliale.length>0||collabStatutFilter.length!==3||collabConditionFilter.length>0)&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {collabFiltreFiliale.length>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setCollabFiltreFiliale([])}>✕ {collabFiltreFiliale.length} filiale{collabFiltreFiliale.length>1?'s':''}</span>}
                {collabStatutFilter.length!==3&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$warn+'18',color:$warn,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setCollabStatutFilter(['actif','en_cours_arriver','en_cours_depart'])}>✕ Filtre statut</span>}
                {collabConditionFilter.length>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:'#ff007f18',color:'#ff007f',display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setCollabConditionFilter([])}>✕ {collabConditionFilter.length} condition{collabConditionFilter.length>1?'s':''}</span>}
              </div>
            </div>
            {/* Settings panel */}
            {collabFilterOpen&&<><div onClick={()=>setCollabFilterOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              {/* Filiale filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                {(()=>{
                  const toggle=(id)=>setCollabFiltreFiliale(p=>p.map(String).includes(String(id))?p.filter(x=>String(x)!==String(id)):[...p,id]);
                  const isC=(id)=>collabFiltreFiliale.map(String).includes(String(id));
                  const invLoc=filialesDynamiques.filter(f=>f.holding==='INVEST LOC');
                  const invExe=filialesDynamiques.filter(f=>f.holding==='INVEST EXE');
                  const Chk=({id,label,count,color,indent})=>(<div onClick={()=>toggle(id)} style={{padding:'5px 8px',paddingLeft:indent?20:8,display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC(id)?$accent:$border}`,background:isC(id)?$accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC(id)&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                    {color&&<div style={{width:7,height:7,borderRadius:'50%',background:color,flexShrink:0}}/>}
                    <span style={{fontSize:'0.78rem',fontWeight:isC(id)?600:400,color:isC(id)?$text:$textSec,flex:1}}>{label}</span>
                    <span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut}}>{count}</span>
                  </div>);
                  return(<div style={{display:'flex',flexDirection:'column',gap:2}}>
                    <Chk id="yilmaz" label="🏢 Yilmaz" count={countByFil('yilmaz')} color="#2d2d2d"/>
                    <div style={{padding:'6px 8px 2px',fontSize:'0.65rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Invest Loc</div>
                    {invLoc.map(f=><Chk key={f.id} id={f.id} label={f.icon+' '+f.nom} count={countByFil(f.id)} color={f.couleur} indent/>)}
                    <div style={{padding:'6px 8px 2px',fontSize:'0.65rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Invest Exe</div>
                    {invExe.map(f=><Chk key={f.id} id={f.id} label={f.icon+' '+f.nom} count={countByFil(f.id)} color={f.couleur} indent/>)}
                  </div>);
                })()}
              </div>
              {/* Statut filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Statut</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {COLLAB_STATUTS.map(st=>{const isC=collabStatutFilter.includes(st.id);return(
                    <div key={st.id} onClick={()=>setCollabStatutFilter(p=>p.includes(st.id)?p.filter(x=>x!==st.id):[...p,st.id])} style={{padding:'5px 8px',display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC?st.color:$border}`,background:isC?st.color:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                      <span style={{width:6,height:6,borderRadius:'50%',background:st.color,flexShrink:0}}/>
                      <span style={{fontSize:'0.78rem',fontWeight:isC?600:400,color:isC?$text:$textSec,flex:1}}>{st.label}</span>
                    </div>);
                  })}
                </div>
              </div>
              {/* Condition filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Situation particulière</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  <div onClick={()=>setCollabConditionFilter([])} style={{padding:'5px 8px',display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,fontSize:'0.78rem',fontWeight:collabConditionFilter.length===0?600:400,color:collabConditionFilter.length===0?$text:$textSec}}>Tous</div>
                  {COLLAB_CONDITIONS.map(cd=>{const isC=collabConditionFilter.includes(cd.id);return(
                    <div key={cd.id} onClick={()=>setCollabConditionFilter(p=>p.includes(cd.id)?p.filter(x=>x!==cd.id):[...p,cd.id])} style={{padding:'5px 8px',display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC?cd.color:$border}`,background:isC?cd.color:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                      <span style={{width:6,height:6,borderRadius:'50%',background:cd.color,flexShrink:0}}/>
                      <span style={{fontSize:'0.78rem',fontWeight:isC?600:400,color:isC?$text:$textSec,flex:1}}>{cd.label}</span>
                    </div>);
                  })}
                </div>
              </div>
              {/* Contrat filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Type de contrat</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {COLLAB_CONTRATS.map(ct=>{const isC=collabContratFilter.length===0||collabContratFilter.includes(ct.id);return(
                    <button key={ct.id} onClick={()=>setCollabContratFilter(p=>{if(p.length===0)return COLLAB_CONTRATS.filter(c=>c.id!==ct.id).map(c=>c.id);return p.includes(ct.id)?p.filter(x=>x!==ct.id):[...p,ct.id];})} style={{padding:'3px 8px',borderRadius:crmRd>0?20:2,fontSize:'0.7rem',fontWeight:600,border:'1px solid '+(isC?ct.color:$border),background:isC?ct.color+'18':'transparent',color:isC?ct.color:$textMut,cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}>{ct.label}</button>
                  );})}
                </div>
              </div>
              {/* Column visibility */}
              <div style={{borderTop:`1px solid ${$border}`,paddingTop:12}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Colonnes visibles</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {[{id:'nom',label:'Nom',locked:true},{id:'posteR',label:'Poste Ruche'},{id:'niveau',label:'Niveau'},{id:'filiale',label:'Filiale'},{id:'statut',label:'Statut'},{id:'age',label:'Âge'},{id:'anc',label:'Ancienneté'},{id:'contrat',label:'Contrat'},{id:'email',label:'Email'},{id:'tel',label:'Tél. fixe'},{id:'portable',label:'Portable pro'},{id:'fixe',label:'Fixe'},{id:'prime',label:'Prime'},{id:'var',label:'Variable'},{id:'total',label:'Total'},{id:'resp',label:'Responsable'},{id:'ch',label:'Chantiers'},{id:'act',label:'Actions'}].map(c=>(
                    <label key={c.id} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 8px',borderRadius:crmRd,cursor:c.locked?'default':'pointer',opacity:c.locked?0.5:1,fontSize:'0.76rem',color:$textSec,transition:'background 0.1s'}} onMouseEnter={e=>{if(!c.locked)e.currentTarget.style.background=$bgSub;}} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <input type="checkbox" checked={collabVisibleCols[c.id]!==false} disabled={c.locked} onChange={()=>setCollabVisibleCols(p=>({...p,[c.id]:!p[c.id]}))} style={{accentColor:$accent}}/>
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>
            </div></>}
            <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:20}}>
              {(()=>{
                const actifs=sortedEmployes.filter(e=>(e.statut||'actif')!=='ancien'&&(e.statut||'actif')!=='inactif');
                const anciens=employes.filter(e=>(e.statut||'actif')==='ancien');
                const conds=sortedEmployes.filter(e=>e.condition||e.arretMaladie);
                const masse=actifs.reduce((s,e)=>s+(e.salaireFix||0)+(e.primeFix||0)+(e.variable||0),0);
                const avgAnc=(()=>{const d=actifs.filter(e=>e.dateEntree).map(e=>(Date.now()-new Date(e.dateEntree))/(365.25*24*3600000));return d.length?(d.reduce((a,b)=>a+b,0)/d.length).toFixed(1)+' ans':'—';})();
                const departs12m=anciens.filter(e=>e.dateFin&&new Date(e.dateFin)>new Date(Date.now()-365*24*3600000)).length;
                const turnover=actifs.length>0?((departs12m/(actifs.length+departs12m))*100).toFixed(1)+'%':'0%';
                return [{l:'Effectif actif',v:actifs.length,ic:'👥',c:$accent},{l:'Masse salariale',v:(masse/1000000).toFixed(2)+'M€',ic:'💰',c:$success},{l:'Arrêts / Conditions',v:conds.length,ic:'🏥',c:'#ff007f'},{l:'Ancienneté moy.',v:avgAnc,ic:'📅',c:$info},{l:'Turnover 12 mois',v:turnover,ic:'📊',c:$warn}];
              })().map((c,i) => (
                <div key={i} style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, padding:'16px 18px', boxShadow:$shadow, position:'relative', overflow:'hidden', transition:'all 0.2s', cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=c.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
                >
                  <div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:6}}>{c.l}</div>
                  <div style={{fontSize:'1.5rem', fontWeight:700, color:c.c, letterSpacing:'-0.02em', lineHeight:1}}>{c.v}</div>
                  <div style={{position:'absolute', top:10, right:14, fontSize:'1.2rem', opacity:0.1}}>{c.ic}</div>
                </div>
              ))}
            </div>
            {/* ── Search + Export ── */}
            {collabView==='liste'&&<><div style={{display:'flex',gap:8,marginBottom:14,alignItems:'center'}}>
              <input value={collabSearch} onChange={e=>setCollabSearch(e.target.value)} placeholder="Rechercher un collaborateur..." style={{flex:1,maxWidth:320,padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',transition:'border-color 0.15s'}} onFocus={e=>e.currentTarget.style.borderColor=$accent} onBlur={e=>e.currentTarget.style.borderColor=$border}/>
              {collabSearch&&<button onClick={()=>setCollabSearch('')} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',background:$accent+'15',color:$accent,fontSize:'0.75rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>✕</button>}
              <span style={{fontSize:'0.78rem',color:$textMut,marginLeft:'auto'}}>{sortedEmployes.length}{sortedEmployes.length!==employes.length?' / '+employes.length:''} collaborateur{sortedEmployes.length>1?'s':''}</span>
              <button onClick={()=>{
                try{
                const cols=['Nom','Prénom','Poste Ruche','Poste Externe','Niveau','Filiale','Contrat','Email','Tél. fixe','Portable','Fixe','Prime','Variable'];
                const rows=[cols.join(';')];
                sortedEmployes.forEach(e=>{const fil=filialesDynamiques.find(f=>f.id===e.filialeId);rows.push([e.nom||'',e.prenom||'',e.posteInterne||'',e.posteExterne||'',e.niveau||'',(fil?fil.nom:'Yilmaz'),e.statutContrat||'CDI',e.email||'',e.telFixe||'',e.portable||'',e.salaireFix||0,e.primeFix||0,e.variable||0].join(';'));});
                const csvContent='\uFEFF'+rows.join('\r\n');
                const link=document.createElement('a');
                link.setAttribute('href','data:text/csv;charset=utf-8,'+encodeURIComponent(csvContent));
                link.setAttribute('download','collaborateurs_groupoy.csv');
                document.body.appendChild(link);link.click();document.body.removeChild(link);
                }catch(err){console.error('CSV export error:',err);}
              }} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,color:$textSec,fontWeight:600,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgCard}>📤 CSV</button>
              <button onClick={()=>{window.print();}} style={{padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,color:$textSec,fontWeight:600,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgCard}>🖨 Imprimer</button>
            </div>
            {/* ── Table ── */}
            <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'auto', maxHeight:'70vh'}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem', tableLayout:'fixed'}}>
                  <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`, position:'sticky',top:0,zIndex:3}}>
                    {[{k:'nom',l:'Nom',w:240,a:'left'},{k:'posteR',l:'Poste Ruche',w:160,a:'left'},{k:'niveau',l:'Niveau',w:70,a:'center'},{k:'filiale',l:'Filiale',w:140,a:'left'},{k:'statut',l:'Statut',w:100,a:'center'},{k:'age',l:'Âge',w:55,a:'center'},{k:'anc',l:'Anc.',w:90,a:'center'},{k:'contrat',l:'Contrat',w:80,a:'center'},{k:'email',l:'Email',w:180,a:'left'},{k:'tel',l:'Tél. fixe',w:110,a:'left'},{k:'portable',l:'Portable',w:110,a:'left'},{k:'fixe',l:'Fixe',w:70,a:'right'},{k:'prime',l:'Prime',w:70,a:'right'},{k:'var',l:'Variable',w:75,a:'right'},{k:'total',l:'Total',w:75,a:'right'},{k:'resp',l:'👑',w:40,a:'center'},{k:'ch',l:'Chantiers',w:70,a:'center'},{k:'act',l:'',w:70,a:'center'}].filter(col=>collabVisibleCols[col.k]!==false).map(col => (
                      <th key={col.k} onClick={()=>col.k!=='act'&&toggleSort(col.k)} style={{padding:'12px 10px', textAlign:col.a, fontWeight:700, color:collabSort.key===col.k?$accent:$textMut, fontSize:'0.78rem', textTransform:'uppercase', whiteSpace:'nowrap', width:collabColWidths[col.k]||col.w, minWidth:60, position:'relative', userSelect:'none', cursor:col.k!=='act'?'pointer':'default'}}>
                        {col.l} {sortIcon(col.k)&&<span style={{fontSize:'0.65rem',marginLeft:2}}>{sortIcon(col.k)}</span>}
                        <div onMouseDown={e=>{e.preventDefault();const startX=e.clientX;const th=e.target.closest('th');const startW=th.offsetWidth;const key=col.k;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const onMove=ev=>{const w=Math.max(60,startW+ev.clientX-startX);setCollabColWidths(prev=>({...prev,[key]:w}));};const onUp=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);}} style={{position:'absolute',right:0,top:0,bottom:0,width:6,cursor:'col-resize',background:'transparent',transition:'background 0.15s',zIndex:2}} onMouseEnter={e=>e.currentTarget.style.background=$accent+'40'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}/>
                      </th>
                    ))}
                  </tr></thead>
                  <tbody>{(()=>{
                    // Group by filiale for sticky headers
                    let lastFil = null;
                    return sortedEmployes.flatMap((emp, idx) => {
                      const fil = filialesDynamiques.find(f=>f.id===(emp.filialeId||'yilmaz')) || {id:'yilmaz',nom:'Yilmaz SAS',icon:'🏢',couleur:'#555555'};
                      const filId = fil.id;
                      const showHeader = filId !== lastFil;
                      if(showHeader) lastFil = filId;
                      const col = fil.couleur||'#555555';
                      const header = showHeader ? (<tr key={'grp-'+filId+'-'+idx}><td colSpan={99} style={{padding:'6px 16px 4px',background:$bgCard,position:'sticky',top:38,zIndex:4,borderBottom:`1px solid ${col}25`,borderLeft:`3px solid ${col}`}}>
                        <div style={{display:'flex',alignItems:'center',gap:7}}>
                          <span style={{width:8,height:8,borderRadius:'50%',background:col,flexShrink:0}}/>
                          <span style={{fontSize:'0.75rem',fontWeight:700,color:col}}>{fil.icon} {fil.nom}</span>
                          <span style={{fontSize:'0.68rem',padding:'1px 6px',borderRadius:10,background:col+'18',color:col,fontWeight:700}}>{sortedEmployes.filter(e=>(e.filialeId||'yilmaz')===filId).length}</span>
                        </div>
                      </td></tr>) : null;
                      const row = (()=>{
                        const idx2 = idx;
                    const total = (emp.salaireFix||0) + (emp.primeFix||0) + (emp.variable||0);
                    const fil = filialesDynamiques.find(f => f.id === emp.filialeId) || {id:'yilmaz',nom:'Yilmaz',icon:'🏢',couleur:'#2d2d2d'};
                    const nbCh = getChantiersCollab(emp.id).length;
                    return (<tr key={emp.id} style={{borderBottom:`1px solid ${$borderLight}`, cursor:'pointer', transition:'background 0.1s', background:$bgSub+'60', opacity:(emp.statut||'actif')==='ancien'?0.5:1}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                      {collabVisibleCols.nom!==false&&(()=>{const empCond=emp.condition||(emp.arretMaladie?'arret_maladie':'');const condObj=empCond?COLLAB_CONDITIONS.find(c=>c.id===empCond):null;return <td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px'}}><div style={{fontWeight:600,fontSize:'0.84rem',color:condObj?$textMut:$text}}>{emp.prenom} {emp.nom}{condObj&&<span style={{fontSize:'0.6rem',padding:'1px 6px',background:condObj.color+'18',color:condObj.color,fontWeight:700,marginLeft:5,borderRadius:crmRd>0?20:2}}>{condObj.label}</span>}</div><div style={{fontSize:'0.7rem',color:$textMut}}>{emp.posteExterne||''}{emp.statutContrat==='externe'&&<span style={{fontSize:'0.6rem',padding:'1px 5px',background:$info+'15',color:$info,fontWeight:700,marginLeft:4,borderRadius:crmRd>0?20:2}}>EXTERNE</span>}{emp.statutContrat==='freelance'&&<span style={{fontSize:'0.6rem',padding:'1px 5px',background:$warn+'15',color:$warn,fontWeight:700,marginLeft:4,borderRadius:crmRd>0?20:2}}>FREE-LANCE</span>}</div></td>;})()}
                      {collabVisibleCols.posteR!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px',color:$textSec,fontSize:'0.84rem'}}>{emp.posteInterne}</td>}
                      {collabVisibleCols.niveau!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center'}}><span style={{fontSize:'0.78rem', fontWeight:700, padding:'3px 10px', borderRadius:crmRd>0?20:2, background:$accent+'15', color:$accent}}>{emp.niveau}</span></td>}
                      {collabVisibleCols.filiale!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', fontSize:'0.82rem', color:$textSec}}><span style={{display:'inline-flex', alignItems:'center', gap:5}}><span style={{width:6, height:6, borderRadius:'50%', background: fil?.couleur || $accent, flexShrink:0}}/>{fil?.nom || 'Yilmaz'}</span></td>}
                      {collabVisibleCols.statut!==false&&(()=>{const empSt=emp.statut||'actif';const st=COLLAB_STATUTS.find(s=>s.id===empSt)||COLLAB_STATUTS[0];return <td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center'}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:crmRd>0?20:2,background:st.color+'18',color:st.color,display:'inline-flex',alignItems:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span></td>;})()}
                      {collabVisibleCols.age!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center', fontSize:'0.82rem', color:$textMut}}>{calcAge(emp.dateNaissance)}</td>}
                      {collabVisibleCols.anc!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center', fontSize:'0.82rem', color:$textMut}}>{calcAnciennete(emp.dateEntree)}</td>}
                      {collabVisibleCols.contrat!==false&&(()=>{const ct=COLLAB_CONTRATS.find(c=>c.id===(emp.statutContrat||'cdi'))||COLLAB_CONTRATS[0];return <td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center'}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 8px',borderRadius:crmRd>0?20:2,background:ct.color+'18',color:ct.color}}>{ct.label}</span></td>;})()}
                      {collabVisibleCols.email!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', fontSize:'0.78rem', color:$textSec}}>{emp.email||'—'}</td>}
                      {collabVisibleCols.tel!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', fontSize:'0.78rem', color:$textSec, fontVariantNumeric:'tabular-nums'}}>{emp.telFixe||'—'}</td>}
                      {collabVisibleCols.portable!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', fontSize:'0.78rem', color:$textSec, fontVariantNumeric:'tabular-nums'}}>{emp.portable||'—'}</td>}
                      {collabVisibleCols.fixe!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'right', color:$info, fontVariantNumeric:'tabular-nums'}}>{((emp.salaireFix||0)/1000).toFixed(0)}k€</td>}
                      {collabVisibleCols.prime!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'right', color:$info, fontVariantNumeric:'tabular-nums'}}>{((emp.primeFix||0)/1000).toFixed(0)}k€</td>}
                      {collabVisibleCols.var!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'right', color:$success, fontVariantNumeric:'tabular-nums'}}>{((emp.variable||0)/1000).toFixed(0)}k€</td>}
                      {collabVisibleCols.total!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'right', fontWeight:700, color:$warn, fontVariantNumeric:'tabular-nums'}}>{(total/1000).toFixed(0)}k€</td>}
                      {collabVisibleCols.resp!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center'}}>{emp.isResponsable ? '👑' : ''}</td>}
                      {collabVisibleCols.ch!==false&&<td onClick={() => {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{padding:'12px 14px', textAlign:'center', fontWeight:600, color:$textSec}}>{nbCh > 0 ? nbCh : '-'}</td>}
                      {collabVisibleCols.act!==false&&<td style={{padding:'6px 8px', textAlign:'center', whiteSpace:'nowrap'}}>
                        <button onClick={(e) => { e.stopPropagation(); setEmployeForm({...emp}); setModalEmploye('edit'); }} style={{padding:'4px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:'transparent', cursor:'pointer', fontSize:'0.78rem', color:$accent, marginRight:4}} title="Modifier">✏️</button>
                        <button onClick={(e) => { e.stopPropagation(); setConfirmDelete({type:'employe', id:emp.id, nom:`${emp.prenom} ${emp.nom}`}); }} style={{padding:'4px 8px', borderRadius:crmRd, border:'1px solid '+$danger+'30', background:$danger+'08', cursor:'pointer', fontSize:'0.78rem', color:$danger}} title="Supprimer">🗑️</button>
                      </td>}
                    </tr>);
                      return [header, row].filter(Boolean);
                      })();
                    });
                  })()}</tbody>
                </table>
            </div></>}
            {/* ═══ VUE CARTES ═══ */}
            {collabView==='cartes'&&<>
              <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'center'}}>
                <input value={collabSearch} onChange={e=>setCollabSearch(e.target.value)} placeholder="Rechercher un collaborateur..." style={{flex:1,maxWidth:320,padding:'7px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',transition:'border-color 0.15s'}} onFocus={e=>e.currentTarget.style.borderColor=$accent} onBlur={e=>e.currentTarget.style.borderColor=$border}/>
                {collabSearch&&<button onClick={()=>setCollabSearch('')} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',background:$accent+'15',color:$accent,fontSize:'0.75rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>✕</button>}
                <span style={{fontSize:'0.78rem',color:$textMut,marginLeft:'auto'}}>{sortedEmployes.length} collaborateur{sortedEmployes.length>1?'s':''}</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:12}}>
                {sortedEmployes.map(emp=>{
                  const fil=filialesDynamiques.find(f=>f.id===emp.filialeId)||{id:'yilmaz',nom:'Yilmaz',icon:'🏢',couleur:'#2d2d2d'};
                  const total=(emp.salaireFix||0)+(emp.primeFix||0)+(emp.variable||0);
                  const empSt=emp.statut||'actif';
                  const st=COLLAB_STATUTS.find(s=>s.id===empSt)||COLLAB_STATUTS[0];
                  const ct=COLLAB_CONTRATS.find(c=>c.id===(emp.statutContrat||'cdi'))||COLLAB_CONTRATS[0];
                  const empCond=emp.condition||(emp.arretMaladie?'arret_maladie':'');
                  const condObj=empCond?COLLAB_CONDITIONS.find(c=>c.id===empCond):null;
                  const nbCh=getChantiersCollab(emp.id).length;
                  return <div key={emp.id} onClick={()=> {setCollabOngletId(emp.id);setCollabDetailTab('profil');}} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',cursor:'pointer',boxShadow:$shadow,transition:'all 0.2s',opacity:empSt==='ancien'?0.5:1}} onMouseEnter={e=>{e.currentTarget.style.borderColor=fil.couleur||$accent;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:'0.88rem',color:$text}}>{emp.prenom} {emp.nom}{emp.isResponsable?' 👑':''}{condObj&&<span style={{fontSize:'0.6rem',padding:'1px 6px',background:condObj.color+'18',color:condObj.color,fontWeight:700,marginLeft:5,borderRadius:crmRd>0?20:2}}>{condObj.label}</span>}</div>
                        <div style={{fontSize:'0.76rem',color:$textMut,marginTop:2}}>{emp.posteExterne||emp.posteInterne||''}</div>
                      </div>
                      <span style={{fontSize:'0.68rem',fontWeight:600,padding:'3px 8px',borderRadius:crmRd>0?20:2,background:st.color+'18',color:st.color,display:'inline-flex',alignItems:'center',gap:3,flexShrink:0}}><span style={{width:5,height:5,borderRadius:'50%',background:st.color}}/>{st.label}</span>
                    </div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8}}>
                      <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:'0.72rem',color:$textSec}}><span style={{width:6,height:6,borderRadius:'50%',background:fil.couleur||$accent}}/>{fil.nom}</span>
                      <span style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 6px',borderRadius:crmRd>0?20:2,background:ct.color+'15',color:ct.color}}>{ct.label}</span>
                      {emp.niveau&&<span style={{fontSize:'0.68rem',fontWeight:700,padding:'2px 8px',borderRadius:crmRd>0?20:2,background:$accent+'15',color:$accent}}>N{emp.niveau}</span>}
                    </div>
                    <div style={{display:'flex',gap:12,fontSize:'0.72rem',color:$textMut,borderTop:`1px solid ${$borderLight}`,paddingTop:8}}>
                      {emp.dateEntree&&<span>Anc. {calcAnciennete(emp.dateEntree)}</span>}
                      {emp.dateNaissance&&<span>{calcAge(emp.dateNaissance)} ans</span>}
                      {nbCh>0&&<span>{nbCh} chantier{nbCh>1?'s':''}</span>}
                      <span style={{marginLeft:'auto',fontWeight:600,color:$warn}}>{total>0?`${(total/1000).toFixed(0)}k€`:''}</span>
                    </div>
                  </div>;
                })}
              </div>
            </>}
            {/* ═══ VUE STATISTIQUES ═══ */}
            {collabView==='stats'&&(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:4}}>
                {/* Répartition par filiale */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par filiale</div>
                  {[{id:'yilmaz',nom:'Yilmaz',couleur:'#2d2d2d'},...filialesDynamiques.filter(f=>f.holding!=='GROUP OY')].map(f=>{
                    const n=countByFil(f.id);const pct=employes.length>0?n/employes.length*100:0;
                    return(<div key={f.id||'yilmaz'} style={{marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                        <span style={{fontSize:'0.78rem',color:$textSec}}>{f.icon||'🏢'} {f.nom}</span>
                        <span style={{fontSize:'0.78rem',fontWeight:700,color:f.couleur||$accent}}>{n}</span>
                      </div>
                      <div style={{height:6,background:$bgSub,borderRadius:crmRd,overflow:'hidden'}}>
                        <div style={{width:`${pct}%`,height:'100%',background:f.couleur||$accent,borderRadius:crmRd,transition:'width 0.5s'}}/>
                      </div>
                    </div>);
                  })}
                </div>
                {/* Répartition par statut */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par statut</div>
                  {COLLAB_STATUTS.map(st=>{
                    const n=employes.filter(e=>(e.statut||'actif')===st.id).length;
                    return n>0?(<div key={st.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',borderRadius:crmRd,marginBottom:4,background:st.color+'08',borderLeft:showBorderAccent?`3px solid ${st.color}`:'none'}}>
                      <span style={{fontSize:'0.82rem',color:$text}}>{st.label}</span>
                      <span style={{fontWeight:700,color:st.color}}>{n}</span>
                    </div>):null;
                  })}
                  <div style={{marginTop:12,fontSize:'0.72rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Conditions actives</div>
                  {COLLAB_CONDITIONS.filter(c=>c.id).map(cd=>{
                    const n=employes.filter(e=>(e.condition||(e.arretMaladie?'arret_maladie':''))===cd.id).length;
                    return n>0?(<div key={cd.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 12px',borderRadius:crmRd,marginBottom:3,background:cd.color+'08'}}>
                      <span style={{fontSize:'0.78rem',color:$textSec}}>{cd.label}</span>
                      <span style={{fontWeight:700,fontSize:'0.82rem',color:cd.color}}>{n}</span>
                    </div>):null;
                  })}
                </div>
                {/* Top ancienneté */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Top 10 ancienneté</div>
                  {[...employes].filter(e=>(e.statut||'actif')!=='ancien'&&e.dateEntree).sort((a,b)=>new Date(a.dateEntree)-new Date(b.dateEntree)).slice(0,10).map((e,i)=>{
                    const anc=calcAnciennete(e.dateEntree);
                    return(<div key={e.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:i<9?`1px solid ${$borderLight}`:'none'}}>
                      <span style={{width:20,textAlign:'center',fontSize:'0.75rem',fontWeight:700,color:i<3?$warn:$textMut}}>{i+1}</span>
                      <span style={{fontSize:'0.82rem',fontWeight:600,color:$text,flex:1}}>{e.prenom} {e.nom}</span>
                      <span style={{fontSize:'0.75rem',color:$textMut}}>{anc}</span>
                    </div>);
                  })}
                </div>
                {/* Derniers départs */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Derniers départs</div>
                  {[...employes].filter(e=>(e.statut||'actif')==='ancien'||e.dateFin).sort((a,b)=>new Date(b.dateFin||b.dateEntree||0)-new Date(a.dateFin||a.dateEntree||0)).slice(0,10).map((e,i)=>(
                    <div key={e.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:i<9?`1px solid ${$borderLight}`:'none'}}>
                      <span style={{fontSize:'0.82rem',fontWeight:600,color:$textMut,flex:1}}>{e.prenom} {e.nom}</span>
                      <span style={{fontSize:'0.72rem',color:$textMut}}>{e.posteExterne||''}</span>
                      <span style={{fontSize:'0.72rem',fontWeight:600,color:$danger}}>{e.dateFin||'—'}</span>
                    </div>
                  ))}
                  {employes.filter(e=>(e.statut||'actif')==='ancien').length===0&&<div style={{fontSize:'0.82rem',color:$textMut,fontStyle:'italic'}}>Aucun ancien employé enregistré</div>}
                </div>
              </div>
            )}
          </>); })()}
          {/* === FICHE COLLABORATEUR === */}
          {collabOngletId && (() => {
            const emp = employes.find(e => e.id === collabOngletId); if (!emp) return null;
            const fil = filialesDynamiques.find(f => f.id === emp.filialeId);
            const mesChantiers = getChantiersCollab(emp.id);
            const totalSalaire = (emp.salaireFix||0) + (emp.primeFix||0) + (emp.variable||0);
            const totalChCA = mesChantiers.reduce((s,c) => s + c.montantVente, 0);
            const totalChDepense = mesChantiers.reduce((s,c) => s + c.depense, 0);
            return (<>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                <button onClick={() => { setCollabOngletId(null); cancelEditCollab(); }} style={{padding:'8px 16px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.92rem', fontWeight:600, color:$textSec}}>← Retour</button>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={() => { setEmployeForm({...emp}); setModalEmploye('edit'); }} style={{padding:'7px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, cursor:'pointer', fontSize:'0.88rem', fontWeight:600, color:'#2563eb'}}>✏️ Modifier</button>
                  <button onClick={() => setConfirmDelete({type:'employe', id:emp.id, nom:`${emp.prenom} ${emp.nom}`})} style={{padding:'7px 14px', borderRadius:crmRd, border:'1px solid #fecaca', background:$danger+'12', cursor:'pointer', fontSize:'0.88rem', fontWeight:600, color:'#dc2626'}}>🗑️ Supprimer</button>
                </div>
              </div>
              {/* Header Card */}
              <div style={{background:$bgCard, borderRadius:crmRd, padding:'20px 24px', border:`1px solid ${$border}`, marginBottom:16}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{display:'flex', gap:16, alignItems:'center'}}>
                    <div style={{width:64, height:64, borderRadius:'50%', background:$bgSub, border:`3px solid ${$accent}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', fontWeight:900, color:$accent, flexShrink:0}}>
                      {(emp.prenom||'')[0]||''}{(emp.nom||'')[0]||''}
                    </div>
                    <div>
                      <div style={{fontSize:'1.4rem', fontWeight:700, letterSpacing:'-0.03em', color:$text}}>{emp.prenom} {emp.nom}</div>
                      <div style={{fontSize:'0.88rem', color:$accent, fontWeight:700, marginTop:2}}>{emp.posteExterne} — <span style={{color:$textMut, fontWeight:500}}>{emp.posteInterne}</span></div>
                      <div style={{display:'flex', gap:6, marginTop:6, flexWrap:'wrap'}}>
                        <span style={{padding:'2px 10px', borderRadius:crmRd>0?20:2, background:$accent+'15', color:$accent, fontWeight:800, fontSize:'0.75rem', border:`1px solid ${$border}`}}>{emp.niveau}</span>
                        <span style={{padding:'2px 10px', borderRadius:crmRd>0?20:2, background:$bgSub, color:$textSec, fontSize:'0.72rem', fontWeight:500}}>{fil ? `${fil.icon} ${fil.nom}` : '🏛️ Yilmaz'}</span>
                        <span style={{padding:'2px 10px', borderRadius:crmRd>0?20:2, background:(emp.statut==='actif'?$success:emp.statut==='ancien'?$danger:$warn)+'15', color:emp.statut==='actif'?$success:emp.statut==='ancien'?$danger:$warn, fontSize:'0.72rem', fontWeight:600}}>{emp.statut==='actif'?'✅ Actif':emp.statut==='ancien'?'🔴 Ancien':'🟡 '+emp.statut}</span>
                        {emp.isResponsable && <span style={{padding:'2px 10px', borderRadius:crmRd>0?20:2, background:$warn+'15', color:$warn, fontSize:'0.72rem', fontWeight:600}}>👑 Responsable</span>}
                        <span style={{padding:'2px 10px', borderRadius:crmRd>0?20:2, background:$bgSub, color:$textMut, fontSize:'0.72rem'}}>{emp.statutContrat==='cdi'?'CDI':emp.statutContrat==='cdd'?'CDD':emp.statutContrat||'CDI'} — {calcAnciennete(emp.dateEntree)}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:4, alignItems:'flex-start'}}>
                    {(() => { const posteLink = postes.find(p => p.titulaire === emp.id); return posteLink ? <button onClick={() => { setOngletActif('postes'); setPosteSelectionne(posteLink.id); }} style={{padding:'5px 12px', borderRadius:crmRd, background:$info+'12', border:'1px solid #bfdbfe', color:'#2563eb', fontSize:'0.72rem', fontWeight:600, cursor:'pointer'}}>📋 Fiche de poste</button> : null; })()}
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <div style={{display:'flex',borderBottom:`1px solid ${$border}`,marginBottom:16,gap:0}}>
                {[{id:'profil',l:'👤 Profil',},{id:'contrat',l:'📋 Contrat'},{id:'remuneration',l:'💰 Rémunération'},{id:'documents',l:'📁 Documents'},{id:'chantiers',l:'🏗️ Chantiers'},{id:'historique',l:'📈 Historique'}].map(t=>(
                  <button key={t.id} onClick={()=>setCollabDetailTab(t.id)} style={{padding:'10px 16px',border:'none',borderBottom:collabDetailTab===t.id?`2px solid ${$accent}`:'2px solid transparent',background:'transparent',color:collabDetailTab===t.id?$accent:$textMut,fontWeight:collabDetailTab===t.id?700:400,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{t.l}</button>
                ))}
              </div>
              {/* Tab Content */}
              <div style={{background:$bgCard, borderRadius:crmRd, padding:24, border:`1px solid ${$border}`, marginBottom:20}}>
              {/* PROFIL TAB */}
              {collabDetailTab==='profil'&&(<>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                  {/* Left: Infos personnelles */}
                  <div>
                    <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>Informations personnelles</div>
                    <div style={{display:'flex', flexDirection:'column', gap:8}}>
                      {[
                        {l:'Date de naissance',v:emp.dateNaissance?new Date(emp.dateNaissance).toLocaleDateString('fr-FR')+' ('+calcAge(emp.dateNaissance)+' ans)':'—',icon:'🎂'},
                        {l:'Nationalité',v:emp.nationalite||'Française',icon:'🌍'},
                        {l:'Situation familiale',v:emp.situationFamiliale||'—',icon:'👨‍👩‍👧'},
                        {l:'N° Sécurité sociale',v:emp.numSS||'—',icon:'🆔'},
                        {l:'Matricule',v:emp.matricule||emp.id,icon:'🏷️'},
                      ].filter(f=>f.v&&f.v!=='—').map((f,i)=>(
                        <div key={i} style={{display:'flex', alignItems:'center', gap:10}}>
                          <span style={{fontSize:'0.82rem', width:22, textAlign:'center'}}>{f.icon}</span>
                          <div><div style={{fontSize:'0.62rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em'}}>{f.l}</div><div style={{fontSize:'0.82rem', color:$text, fontWeight:500}}>{f.v}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right: Contact */}
                  <div>
                    <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>Contact</div>
                    <div style={{display:'flex', flexDirection:'column', gap:8}}>
                      {[
                        {l:'Email professionnel',v:emp.email,icon:'📧'},
                        {l:'Email personnel',v:emp.emailPerso,icon:'📬'},
                        {l:'Téléphone fixe',v:emp.telFixe,icon:'📞'},
                        {l:'Portable',v:emp.portable,icon:'📱'},
                        {l:'Téléphone personnel',v:emp.telPerso,icon:'📲'},
                        {l:'Adresse',v:emp.adresse,icon:'🏠'},
                      ].filter(f=>f.v).map((f,i)=>(
                        <div key={i} style={{display:'flex', alignItems:'center', gap:10}}>
                          <span style={{fontSize:'0.82rem', width:22, textAlign:'center'}}>{f.icon}</span>
                          <div><div style={{fontSize:'0.62rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em'}}>{f.l}</div><div style={{fontSize:'0.82rem', color:$text, fontWeight:500}}>{f.v}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Contact d'urgence */}
                {(emp.contactUrgenceNom||emp.contactUrgenceTel)&&<div style={{marginTop:16, padding:'12px 16px', background:$danger+'06', borderRadius:crmRd, border:`1px solid ${$danger}20`}}>
                  <div style={{fontSize:'0.68rem', fontWeight:600, color:$danger, textTransform:'uppercase', marginBottom:6}}>🆘 Contact d'urgence</div>
                  <div style={{fontSize:'0.82rem', color:$text}}>{emp.contactUrgenceNom||'—'} — {emp.contactUrgenceTel||'—'} {emp.contactUrgenceLien?`(${emp.contactUrgenceLien})`:''}</div>
                </div>}
                {/* Quick stats */}
                <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginTop:16}}>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:12, border:`1px solid ${$border}`}}><div style={{fontSize:'0.78rem', color:$textMut, fontWeight:600}}>🎂 Naissance</div><div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{emp.dateNaissance ? new Date(emp.dateNaissance).toLocaleDateString('fr-FR') : '-'}</div><div style={{fontSize:'0.82rem', color:$textMut}}>{calcAge(emp.dateNaissance)} ans</div></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:12, border:`1px solid ${$border}`}}><div style={{fontSize:'0.78rem', color:$textMut, fontWeight:600}}>📅 Entrée</div><div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{emp.dateEntree ? new Date(emp.dateEntree).toLocaleDateString('fr-FR') : '-'}</div><div style={{fontSize:'0.82rem', color:$textMut}}>{calcAnciennete(emp.dateEntree)}</div></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:12, border:`1px solid ${$border}`}}><div style={{fontSize:'0.78rem', color:$textMut, fontWeight:600}}>🏢 Filiale</div><div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{fil ? `${fil.icon} ${fil.nom}` : '🏛️ Yilmaz'}</div></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:12, border:`1px solid ${$border}`}}><div style={{fontSize:'0.78rem', color:$textMut, fontWeight:600}}>📧 Email</div><div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{emp.email || '-'}</div></div>
                </div>
              </>)}
              {/* RÉMUNÉRATION TAB */}
              {collabDetailTab==='remuneration'&&(<>
                <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>💰 Rémunération Annuelle</div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:12}}>
                  <div style={{background:$info+'08', borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>💵 Fixe</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$info}}>{((emp.salaireFix||0)/1000).toFixed(0)}k€</div><div style={{fontSize:'0.68rem', color:$textMut}}>{((emp.salaireFix||0)/12).toFixed(0)}€/mois</div></div>
                  <div style={{background:$info+'08', borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>🎁 Prime</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$info}}>{((emp.primeFix||0)/1000).toFixed(0)}k€</div><div style={{fontSize:'0.68rem', color:$textMut}}>{((emp.primeFix||0)/12).toFixed(0)}€/mois</div></div>
                  <div style={{background:$success+'08', borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>📈 Variable</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$success}}>{((emp.variable||0)/1000).toFixed(0)}k€</div><div style={{fontSize:'0.68rem', color:$textMut}}>{totalSalaire > 0 ? ((emp.variable||0)/totalSalaire*100).toFixed(0) : 0}% du total</div></div>
                  <div style={{background:$warn+'08', borderRadius:crmRd, padding:14, border:`1px solid ${$warn}30`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>💰 Total</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$warn}}>{(totalSalaire/1000).toFixed(0)}k€</div><div style={{fontSize:'0.68rem', color:$textMut}}>{(totalSalaire/12).toFixed(0)}€/mois</div></div>
                </div>
                <div style={{width:'100%', height:8, borderRadius:crmRd, overflow:'hidden', display:'flex', marginBottom:20}}>
                  <div style={{width:`${totalSalaire>0?(emp.salaireFix||0)/totalSalaire*100:0}%`, background:'#2563eb', height:'100%'}}></div>
                  <div style={{width:`${totalSalaire>0?(emp.primeFix||0)/totalSalaire*100:0}%`, background:'#7c3aed', height:'100%'}}></div>
                  <div style={{width:`${totalSalaire>0?(emp.variable||0)/totalSalaire*100:0}%`, background:'#059669', height:'100%'}}></div>
                </div>
                {emp.isResponsable && emp.caGere && (
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>👑 KPI Responsable de Group</div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
                      <div style={{background:$bgCard, borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>📊 CA Géré</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$success}}>{(emp.caGere/1000000).toFixed(1)}M€</div></div>
                      <div style={{background:$bgCard, borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>📈 Marge Brute</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$info}}>{emp.margeBrutePct}%</div><div style={{fontSize:'0.78rem', color:$textMut}}>{(emp.caGere*emp.margeBrutePct/100/1000000).toFixed(2)}M€</div></div>
                      <div style={{background:$bgCard, borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>💎 EBE</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$info}}>{emp.ebePct}%</div><div style={{fontSize:'0.78rem', color:$textMut}}>{(emp.caGere*emp.ebePct/100/1000000).toFixed(2)}M€</div></div>
                      <div style={{background:$bgCard, borderRadius:crmRd, padding:14, border:`1px solid ${$border}`}}><div style={{fontSize:'0.7rem', color:$textMut, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em'}}>🏆 Bénéfice</div><div style={{fontSize:'1.15rem', fontWeight:700, color:$warn}}>{(emp.caGere*emp.ebePct/100*0.75/1000000).toFixed(2)}M€</div><div style={{fontSize:'0.78rem', color:$textMut}}>après IS 25%</div></div>
                    </div>
                  </div>
                )}
              </>)}
              {/* CONTRAT TAB */}
              {collabDetailTab==='contrat'&&(<>
                <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>📋 Informations Contrat</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16}}>
                  {[
                    {l:'Type de contrat',v:emp.statutContrat==='cdi'?'CDI':emp.statutContrat==='cdd'?'CDD':emp.statutContrat==='interim'?'Intérim':emp.statutContrat||'CDI',icon:'📝'},
                    {l:'Date d\'entrée',v:emp.dateEntree?new Date(emp.dateEntree).toLocaleDateString('fr-FR'):'—',icon:'📅'},
                    {l:'Ancienneté',v:calcAnciennete(emp.dateEntree),icon:'⏱️'},
                    {l:'Convention collective',v:'BTP — Bâtiment et Travaux Publics',icon:'📖'},
                    {l:'Période d\'essai',v:emp.periodeEssai||((emp.statutContrat||'cdi')==='cdi'?'2 mois (renouvelable)':'1 mois'),icon:'🔄'},
                    {l:'Qualification',v:emp.qualification||emp.niveau,icon:'🏆'},
                    {l:'Classification',v:emp.classification||'—',icon:'📊'},
                    {l:'Temps de travail',v:emp.tempsPartiel?`Temps partiel (${emp.tempsPartiel}h/sem)`:'Temps plein (35h/sem)',icon:'🕐'},
                  ].map((f,i)=>(
                    <div key={i} style={{padding:'10px 14px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$borderLight}`}}>
                      <div style={{display:'flex', alignItems:'center', gap:6}}>
                        <span style={{fontSize:'0.82rem'}}>{f.icon}</span>
                        <div><div style={{fontSize:'0.62rem', color:$textMut, fontWeight:600, textTransform:'uppercase'}}>{f.l}</div><div style={{fontSize:'0.82rem', color:$text, fontWeight:600, marginTop:2}}>{f.v}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
                {emp.dateFin&&<div style={{padding:'10px 14px', background:$danger+'08', borderRadius:crmRd, border:`1px solid ${$danger}20`, marginBottom:12}}>
                  <div style={{fontSize:'0.72rem', fontWeight:600, color:$danger}}>📌 Date de fin de contrat : {new Date(emp.dateFin).toLocaleDateString('fr-FR')}</div>
                </div>}
                {/* Alertes contrat */}
                {emp.statutContrat==='cdd'&&<div style={{padding:'10px 14px', background:$warn+'08', borderRadius:crmRd, border:`1px solid ${$warn}20`}}>
                  <div style={{fontSize:'0.72rem', fontWeight:600, color:$warn}}>⚠️ CDD — Penser au renouvellement ou à la conversion en CDI</div>
                </div>}
              </>)}
              {/* DOCUMENTS TAB */}
              {collabDetailTab==='documents'&&(<>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, textTransform:'uppercase', letterSpacing:'0.04em'}}>📁 Documents du collaborateur</div>
                  <button onClick={()=>{setCollabDocAdding(true);setCollabDocType('contrat');setCollabDocNom('');setCollabDocUrl('');}} style={{padding:'4px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, fontSize:'0.7rem', fontWeight:600, color:$accent, cursor:'pointer', fontFamily:'inherit'}}>+ Ajouter</button>
                </div>
                {collabDocAdding&&<div style={{padding:'10px 14px', background:$bgCard, borderRadius:crmRd, border:`1px solid ${$accent}30`, marginBottom:12}}>
                  <div style={{display:'flex', gap:4, marginBottom:8, flexWrap:'wrap'}}>
                    {[{v:'contrat',l:'📝 Contrat'},{v:'avenant',l:'📋 Avenant'},{v:'cni',l:'🆔 CNI/Passeport'},{v:'rib',l:'💳 RIB'},{v:'permis',l:'🚗 Permis'},{v:'ss',l:'🏥 Carte vitale'},{v:'diplome',l:'🎓 Diplôme'},{v:'habilitation',l:'⚡ Habilitation'},{v:'visite_medicale',l:'🩺 Visite médicale'},{v:'attestation',l:'📄 Attestation'},{v:'autre',l:'📎 Autre'}].map(t=>(
                      <button key={t.v} onClick={()=>setCollabDocType(t.v)} style={{padding:'3px 8px', borderRadius:crmRd, border:`1px solid ${collabDocType===t.v?$accent:$border}`, background:collabDocType===t.v?$accent+'15':'transparent', color:collabDocType===t.v?$accent:$textSec, fontSize:'0.62rem', fontWeight:collabDocType===t.v?600:400, cursor:'pointer', fontFamily:'inherit'}}>{t.l}</button>
                    ))}
                  </div>
                  <input value={collabDocNom} onChange={e=>setCollabDocNom(e.target.value)} placeholder="Nom du document" style={{width:'100%', padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.75rem', fontFamily:'inherit', background:$bgCard, color:$text, outline:'none', boxSizing:'border-box', marginBottom:4}}/>
                  <input value={collabDocUrl} onChange={e=>setCollabDocUrl(e.target.value)} placeholder="Lien Google Drive / URL (optionnel)" style={{width:'100%', padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$borderLight}`, fontSize:'0.68rem', fontFamily:'inherit', background:$bgSub, color:$textSec, outline:'none', boxSizing:'border-box', marginBottom:6}}/>
                  <div style={{display:'flex', gap:4, justifyContent:'flex-end'}}>
                    <button onClick={()=>setCollabDocAdding(false)} style={{padding:'4px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, background:'transparent', fontSize:'0.68rem', color:$textSec, cursor:'pointer', fontFamily:'inherit'}}>Annuler</button>
                    <button onClick={()=>{if(collabDocNom.trim()){const docs=[...(emp.documents||[]),{id:'D'+Date.now(),type:collabDocType,nom:collabDocNom.trim(),url:collabDocUrl||'',date:new Date().toISOString().slice(0,10)}];saveCands(null);/* Use employes update instead */setCollabDocAdding(false);setCollabDocNom('');setCollabDocUrl('');}}} style={{padding:'4px 12px', borderRadius:crmRd, border:'none', background:$accent, color:'white', fontSize:'0.68rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit', opacity:collabDocNom.trim()?1:0.4}}>Ajouter</button>
                  </div>
                </div>}
                {/* Document list */}
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  {[
                    {type:'contrat',nom:'Contrat de travail',statut:'requis'},
                    {type:'cni',nom:'Pièce d\'identité',statut:'requis'},
                    {type:'rib',nom:'RIB',statut:'requis'},
                    {type:'ss',nom:'Carte vitale',statut:'requis'},
                    {type:'permis',nom:'Permis de conduire',statut:'optionnel'},
                    {type:'visite_medicale',nom:'Visite médicale',statut:'requis'},
                    {type:'diplome',nom:'Diplôme',statut:'optionnel'},
                    {type:'habilitation',nom:'Habilitation électrique',statut:'optionnel'},
                  ].map((doc,i)=>{
                    const typeIcons={contrat:'📝',avenant:'📋',cni:'🆔',rib:'💳',permis:'🚗',ss:'🏥',diplome:'🎓',habilitation:'⚡',visite_medicale:'🩺',attestation:'📄',autre:'📎'};
                    const hasDoc = (emp.documents||[]).some(d=>d.type===doc.type);
                    return (<div key={i} style={{padding:'10px 14px', borderRadius:crmRd, border:`1px solid ${hasDoc?$success+'30':doc.statut==='requis'?$danger+'20':$borderLight}`, background:hasDoc?$success+'05':doc.statut==='requis'?$danger+'03':$bgSub, display:'flex', alignItems:'center', gap:10}}>
                      <span style={{fontSize:'1rem'}}>{typeIcons[doc.type]||'📎'}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:'0.75rem', fontWeight:600, color:$text}}>{doc.nom}</div>
                        <div style={{fontSize:'0.62rem', color:hasDoc?$success:doc.statut==='requis'?$danger:$textMut, fontWeight:500}}>{hasDoc?'✅ Présent':doc.statut==='requis'?'❌ Manquant':'—'}</div>
                      </div>
                    </div>);
                  })}
                </div>
              </>)}
              {/* HISTORIQUE TAB */}
              {collabDetailTab==='historique'&&(<>
                <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>📈 Parcours & Évolution</div>
                <div style={{position:'relative', marginBottom:20}}>
                  <div style={{position:'absolute', left:12, top:0, bottom:0, width:2, background:$borderLight}}></div>
                  {(emp.historique||[]).sort((a,b) => new Date(b.date) - new Date(a.date)).map((evt, idx) => {
                    const tc = evt.type === 'Entrée' ? '#059669' : evt.type === 'Promotion' ? '#d97706' : evt.type === 'Changement' ? '#2563eb' : '#b0a08a';
                    const typeIcon = evt.type === 'Entrée' ? '🚀' : evt.type === 'Promotion' ? '⬆️' : evt.type === 'Changement' ? '🔄' : '📌';
                    return (<div key={idx} style={{position:'relative', paddingLeft:36, paddingBottom:14}}>
                      <div style={{position:'absolute', left:7, top:6, width:12, height:12, borderRadius:crmRd, background:tc, border:'2px solid white'}}></div>
                      <div style={{background:$bgSub, borderRadius:crmRd, padding:12, border:`1px solid ${$border}`}}>
                        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                          <span style={{fontSize:'0.82rem', fontWeight:700, color:$textMut}}>{new Date(evt.date).toLocaleDateString('fr-FR')}</span>
                          <span style={{padding:'2px 8px', borderRadius:crmRd, fontSize:'0.78rem', fontWeight:700, background: evt.type==='Entrée'?'#f0fdf4':evt.type==='Promotion'?'#fffbeb':'#eff6ff', color: tc}}>{typeIcon} {evt.type}</span>
                          <span style={{padding:'2px 8px', borderRadius:crmRd, fontSize:'0.78rem', fontWeight:700, background:$accent+'15', color:$accent}}>{evt.niveau}</span>
                        </div>
                        <div style={{fontWeight:600, fontSize:'0.95rem', color:$text}}>{evt.poste}</div>
                        {evt.note && <div style={{fontSize:'0.82rem', color:$textMut, marginTop:2}}>{evt.note}</div>}
                      </div>
                    </div>);
                  })}
                  {(!emp.historique || emp.historique.length === 0) && <p style={{paddingLeft:36, color:$textMut, fontStyle:'italic', fontSize:'0.92rem'}}>Aucun historique enregistré</p>}
                </div>
              </>)}
              {/* CHANTIERS TAB */}
              {collabDetailTab==='chantiers'&&(<>
                <div style={{fontSize:'0.72rem', fontWeight:600, color:$textMut, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em'}}>🏗️ Chantiers Assignés ({mesChantiers.length})</div>
                {mesChantiers.length === 0 ? (<p style={{color:$textMut, fontStyle:'italic', fontSize:'0.92rem'}}>Aucun chantier assigné</p>) : (<>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginBottom:14}}>
                    <div style={{background:$success+'12', borderRadius:crmRd, padding:12, border:`1px solid ${$success}30`}}><div style={{fontSize:'0.78rem', color:$textMut}}>CA total</div><div style={{fontWeight:800, color:$success}}>{(totalChCA/1000000).toFixed(2)}M€</div></div>
                    <div style={{background:$danger+'12', borderRadius:crmRd, padding:12, border:`1px solid ${$danger}30`}}><div style={{fontSize:'0.78rem', color:$textMut}}>Dépensé</div><div style={{fontWeight:800, color:$danger}}>{(totalChDepense/1000000).toFixed(2)}M€</div></div>
                    <div style={{background: (totalChCA-totalChDepense>=0?$success:$danger)+'12', borderRadius:crmRd, padding:12, border:`1px solid ${totalChCA-totalChDepense>=0?$success:$danger}30`}}><div style={{fontSize:'0.78rem', color:$textMut}}>Résultat</div><div style={{fontWeight:800, color: totalChCA-totalChDepense>=0?$success:$danger}}>{((totalChCA-totalChDepense)/1000000).toFixed(2)}M€</div></div>
                  </div>
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.92rem'}}>
                      <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`}}>
                        {['Chantier','Client','Statut','Avancement','Vente','Budget','Dépensé','Marge'].map(h => (
                          <th key={h} style={{position:'relative',padding:'12px 14px', textAlign: ['Vente','Budget','Dépensé','Marge'].includes(h)?'right':h==='Statut'||h==='Avancement'?'center':'left', fontWeight:700, color:$textMut, fontSize:'0.78rem', textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        ))}
                      </tr></thead>
                      <tbody>{mesChantiers.map((ch, idx) => {
                        const marge = ch.montantVente - ch.budgetHT;
                        const sc = ch.statut==='Terminé'?{bg:'#f0fdf4',c:'#059669'}:ch.statut==='Planifié'?{bg:'#eff6ff',c:'#2563eb'}:{bg:'#fffbeb',c:'#d97706'};
                        return (<tr key={ch.id} onClick={() => {
                          const fId = ch.filialeId;
                          const keyMap = {};
                          filialesDynamiques.forEach(f => {
                            if (f.nom === 'Ezel Bâtiment') keyMap[f.id] = 'ezel';
                            else if (f.nom === 'La Roulotte') keyMap[f.id] = 'roulotte';
                            else if (f.nom === "L'Échafaudage") keyMap[f.id] = 'echafaudage';
                            else if (f.nom === "L'Étanchéité") keyMap[f.id] = 'etancheite';
                          });
                          const entKey = keyMap[fId] || 'ezel';
                          setNavEntreprise(entKey); setNavService(null); setOngletActif('dashboard'); setDashboardFiliale(fId); setDashboardChantierId(ch.id); setDashboardVue('chantier');
                        }} style={{borderBottom:`1px solid ${$borderLight}`, cursor:'pointer', transition:'background 0.1s', background:$bgSub+'60'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                          <td style={{padding:'12px 14px', fontWeight:600, color:$text}}>{ch.nom}</td>
                          <td style={{padding:'12px 14px', color:$textMut}}>{ch.client}</td>
                          <td style={{padding:'12px 14px', textAlign:'center'}}><span style={{padding:'2px 10px', borderRadius:crmRd, fontSize:'0.78rem', fontWeight:700, background:sc.bg, color:sc.c}}>{ch.statut}</span></td>
                          <td style={{padding:'12px 14px', textAlign:'center'}}>
                            <div style={{display:'flex', alignItems:'center', gap:6}}>
                              <div style={{flex:1, height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}>
                                <div style={{height:'100%', borderRadius:3, background: ch.avancement>=80?'#059669':ch.avancement>=40?'#d97706':'#2563eb', width:`${ch.avancement}%`}}></div>
                              </div>
                              <span style={{fontWeight:700, fontSize:'0.82rem', color:$text, minWidth:28, textAlign:'right'}}>{ch.avancement}%</span>
                            </div>
                          </td>
                          <td style={{padding:'12px 14px', textAlign:'right', fontWeight:700, color:$success}}>{(ch.montantVente/1000).toFixed(0)}k€</td>
                          <td style={{padding:'12px 14px', textAlign:'right', color:$textSec}}>{(ch.budgetHT/1000).toFixed(0)}k€</td>
                          <td style={{padding:'12px 14px', textAlign:'right', color:$danger}}>{(ch.depense/1000).toFixed(0)}k€</td>
                          <td style={{padding:'12px 14px', textAlign:'right', fontWeight:700, color: marge>=0?$success:$danger}}>{(marge/1000).toFixed(0)}k€</td>
                        </tr>);
                      })}</tbody>
                    </table>
                  </div>
                </>)}
              </>)}
              </div>
            </>);
          })()}
        </>
  );
}
