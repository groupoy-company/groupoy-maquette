// === Onglet « materiel » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabMateriel(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FILIALE_FILTER_OPTIONS, chantiers, collaborateurs, crmRd, empNom, employes, filialeFilter, matAttest, matData, matDetail, matEdit, matFilialeFilter, matFilter, matFilterOpen, matTab, matVisibleCols, navEntreprise, setMatAttest, setMatData, setMatDetail, setMatEdit, setMatFilialeFilter, setMatFilter, setMatFilterOpen, setMatTab, setMatVisibleCols, showBorderAccent } = __props;
        const saveMat = d => { setMatData(d); localStorage.setItem('ruches_mat_data', JSON.stringify(d)); };
        const MAT_CATS = [{id:'engin',label:'Engin / Machine',color:'#ea580c',icon:'🏗️'},{id:'echafaudage',label:'Échafaudage',color:'#7c3aed',icon:'🪜'},{id:'outillage_lourd',label:'Outillage lourd',color:'#0891b2',icon:'🔧'},{id:'outillage_electro',label:'Outillage électroportatif',color:'#2563eb',icon:'⚡'},{id:'outillage_main',label:'Outillage à main',color:'#16a34a',icon:'🛠️'},{id:'mesure',label:'Mesure / Topographie',color:'#6366f1',icon:'📐'},{id:'securite',label:'Sécurité chantier',color:'#dc2626',icon:'🚧'},{id:'epi',label:'EPI',color:'#be123c',icon:'🦺'},{id:'sanitaire',label:'Sanitaire / Barrière',color:'#db2777',icon:'🚻'},{id:'consommable',label:'Consommable',color:$textSec,icon:'📦'}];
        const MAT_STATUTS = [{id:'disponible',label:'Disponible',color:'#16a34a'},{id:'en_service',label:'En service',color:'#2563eb'},{id:'affecte',label:'Affecté (nominatif)',color:'#7c3aed'},{id:'maintenance',label:'Maintenance',color:'#ea580c'},{id:'panne',label:'En panne',color:'#dc2626'},{id:'reforme',label:'Réformé',color:$textSec}];
        const Tag = ({label,color,s}) => <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:s?'2px 8px':'3px 10px',background:(color||'#64748b')+'15',color:color||'#64748b',fontWeight:600,fontSize:s?'0.72rem':'0.72rem',borderRadius:crmRd>0?20:2}}><span style={{width:5,height:5,borderRadius:'50%',background:color||'#64748b'}}/>{label}</span>;
        const getLbl = (a,id) => (a.find(x=>x.id===id)||{}).label||id||'—';
        const getClr = (a,id) => (a.find(x=>x.id===id)||{}).color||'#64748b';
        const getIcon = (a,id) => (a.find(x=>x.id===id)||{}).icon||'';
        const FIL_MAP = {1:'La Roulotte',2:"L'Échafaudage",3:'Ezel',6:"L'Étanchéité"};
        const daysDiff = d => { if(!d) return 999; return Math.ceil((new Date(d)-new Date())/(1000*3600*24)); };

        const sampleMat = [
          // ── Engins ──
          {id:'MAT-001',nom:'Chariot élévateur STILL RX20',categorie:'engin',filialeId:1,affecteAId:null,statut:'disponible',affectation:'Dépôt',dateAchat:'2019-04-01',valeurAchat:22000,dateVGP:'2027-02-12',notes:'VGP OK.',louable:true,quantite:1},
          {id:'MAT-002',nom:'Mini-pelle Kubota KX016-4',categorie:'engin',filialeId:1,affecteAId:null,statut:'en_service',affectation:'CH010',dateAchat:'2022-06-01',valeurAchat:28000,dateVGP:'2026-06-01',notes:'VGP semestrielle.',louable:true,quantite:1},
          {id:'MAT-003',nom:'Nacelle ciseaux 8m',categorie:'engin',filialeId:1,affecteAId:null,statut:'disponible',affectation:'Dépôt',dateAchat:'2021-09-01',valeurAchat:15000,dateVGP:'2026-09-01',notes:'CACES 3B requis.',louable:true,quantite:1},
          // ── Échafaudages ──
          {id:'MAT-010',nom:'Échafaudage R200 — Lot 1 (200m²)',categorie:'echafaudage',filialeId:2,affecteAId:null,statut:'en_service',affectation:'CH007',dateAchat:'2018-01-15',valeurAchat:35000,dateVGP:'2026-04-01',notes:'200m² façade.',louable:true,quantite:1},
          {id:'MAT-011',nom:'Échafaudage R200 — Lot 2 (150m²)',categorie:'echafaudage',filialeId:2,affecteAId:null,statut:'disponible',affectation:'Dépôt',dateAchat:'2020-05-01',valeurAchat:26000,dateVGP:'2026-04-01',notes:'150m².',louable:true,quantite:1},
          // ── Sanitaire / Barrière ──
          {id:'MAT-020',nom:'WC autonomes (parc 12 unités)',categorie:'sanitaire',filialeId:1,affecteAId:null,statut:'en_service',affectation:'8 en location, 4 stock',dateAchat:'2021-01-01',valeurAchat:18000,notes:'Entretien hebdo.',louable:true,quantite:12},
          {id:'MAT-021',nom:'Barrières Heras (parc 200)',categorie:'sanitaire',filialeId:1,affecteAId:null,statut:'en_service',affectation:'120 louées, 80 stock',dateAchat:'2020-06-01',valeurAchat:8000,notes:'15 à remplacer.',louable:true,quantite:200},
          // ── Outillage lourd ──
          {id:'MAT-030',nom:'Bétonnière 350L',categorie:'outillage_lourd',filialeId:3,affecteAId:null,statut:'maintenance',affectation:'',dateAchat:'2017-03-01',valeurAchat:1800,notes:'Moteur en réparation.',louable:false,quantite:1},
          {id:'MAT-031',nom:'Groupe électrogène 5kVA',categorie:'outillage_lourd',filialeId:3,affecteAId:null,statut:'disponible',affectation:'',dateAchat:'2023-08-01',valeurAchat:2200,notes:'Chantiers sans raccordement.',louable:true,quantite:1},
          {id:'MAT-032',nom:'Compresseur 100L + marteau-piqueur',categorie:'outillage_lourd',filialeId:3,affecteAId:null,statut:'en_service',affectation:'CH001',dateAchat:'2020-11-01',valeurAchat:3500,notes:'Chantier dalle.',louable:false,quantite:1},
          // ── Outillage électroportatif (Ezel) ──
          {id:'MAT-040',nom:'Perforateur Hilti TE 6-A36',categorie:'outillage_electro',filialeId:3,affecteAId:'EMP010',statut:'affecte',affectation:'Équipe Vitor',dateAchat:'2023-01-15',valeurAchat:890,notes:'',louable:false,quantite:1,attestation:{date:'2023-01-20',signe:true}},
          {id:'MAT-041',nom:'Perforateur Hilti TE 6-A36',categorie:'outillage_electro',filialeId:3,affecteAId:'EMP019',statut:'affecte',affectation:'Équipe Mohamed',dateAchat:'2023-01-15',valeurAchat:890,notes:'',louable:false,quantite:1,attestation:{date:'2023-01-20',signe:true}},
          {id:'MAT-042',nom:'Meuleuse Bosch GWS 18V-15',categorie:'outillage_electro',filialeId:3,affecteAId:'EMP010',statut:'affecte',affectation:'Équipe Vitor',dateAchat:'2022-06-01',valeurAchat:350,notes:'+ 3 disques.',louable:false,quantite:1,attestation:{date:'2022-06-05',signe:true}},
          {id:'MAT-043',nom:'Meuleuse Bosch GWS 18V-15',categorie:'outillage_electro',filialeId:3,affecteAId:'EMP019',statut:'affecte',affectation:'Équipe Mohamed',dateAchat:'2022-06-01',valeurAchat:350,notes:'',louable:false,quantite:1,attestation:{date:'2022-06-05',signe:true}},
          {id:'MAT-044',nom:'Visseuse Makita DDF484',categorie:'outillage_electro',filialeId:3,affecteAId:'EMP010',statut:'affecte',affectation:'Équipe Vitor',dateAchat:'2023-03-01',valeurAchat:280,notes:'2 batteries.',louable:false,quantite:1,attestation:{date:'2023-03-05',signe:true}},
          {id:'MAT-045',nom:'Scie circulaire Makita DHS680',categorie:'outillage_electro',filialeId:3,affecteAId:null,statut:'disponible',affectation:'',dateAchat:'2021-09-01',valeurAchat:420,notes:'',louable:false,quantite:1},
          {id:'MAT-046',nom:'Rainureuse Bosch GNF 35CA',categorie:'outillage_electro',filialeId:3,affecteAId:null,statut:'disponible',affectation:'',dateAchat:'2020-04-01',valeurAchat:650,notes:'Pour saignées.',louable:false,quantite:1},
          // ── Outillage à main ──
          {id:'MAT-050',nom:'Caisse à outils complète (x6)',categorie:'outillage_main',filialeId:3,affecteAId:null,statut:'en_service',affectation:'Équipes chantier',dateAchat:'2022-01-01',valeurAchat:1800,notes:'6 caisses distribuées aux équipes.',louable:false,quantite:6},
          {id:'MAT-051',nom:'Niveau laser Bosch GLL 3-80',categorie:'mesure',filialeId:3,affecteAId:'EMP005',statut:'affecte',affectation:'Pierre SEMERCI',dateAchat:'2023-06-01',valeurAchat:450,notes:'',louable:false,quantite:1,attestation:{date:'2023-06-05',signe:true}},
          {id:'MAT-052',nom:'Mètre laser Leica DISTO D2',categorie:'mesure',filialeId:3,affecteAId:'EMP018',statut:'affecte',affectation:'Ali AZIYANE',dateAchat:'2022-09-01',valeurAchat:120,notes:'',louable:false,quantite:1,attestation:{date:'2022-09-05',signe:true}},
          // ── Sécurité chantier ──
          {id:'MAT-060',nom:'Kit signalisation chantier (x4)',categorie:'securite',filialeId:3,affecteAId:null,statut:'en_service',affectation:'Chantiers',dateAchat:'2021-06-01',valeurAchat:2400,notes:'Panneaux, cônes, rubalise.',louable:false,quantite:4},
          // ── EPI ──
          {id:'MAT-070',nom:'Casque chantier (lot 20)',categorie:'epi',filialeId:3,affecteAId:null,statut:'en_service',affectation:'Toutes équipes',dateAchat:'2024-01-01',valeurAchat:600,notes:'Renouvelé annuellement.',louable:false,quantite:20},
          {id:'MAT-071',nom:'Harnais antichute (x6)',categorie:'epi',filialeId:3,affecteAId:null,statut:'en_service',affectation:'Travaux en hauteur',dateAchat:'2023-09-01',valeurAchat:1200,notes:'Vérification annuelle obligatoire.',louable:false,quantite:6},
          {id:'MAT-072',nom:'Chaussures sécurité S3 (lot 15 paires)',categorie:'epi',filialeId:3,affecteAId:null,statut:'en_service',affectation:'Toutes équipes',dateAchat:'2024-06-01',valeurAchat:1500,notes:'Renouvelé chaque année.',louable:false,quantite:15}
        ];

        const data = (() => {
          const raw = matData.length > 0 ? matData : sampleMat;
          const isYilmazView = !navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz';
          if (isYilmazView) return filialeFilter.length > 0 ? raw.filter(d => typeof d.filialeId === 'number' && filialeFilter.includes(d.filialeId)) : raw;
          const ctxMap = { 'roulotte': 1, 'echafaudage': 2, 'ezel': 3, 'etancheite': 6 };
          const ctxId = ctxMap[navEntreprise];
          return raw.filter(d => d.filialeId === ctxId);
        })();
        const preFiltered = matFilter === 'tous' ? data : data.filter(d => d.categorie === matFilter || d.statut === matFilter);
        const filtered = matFilialeFilter.length===0?preFiltered:preFiltered.filter(d=>matFilialeFilter.includes(d.filialeId));
        const valeurTotale = data.reduce((s,d)=>s+(d.valeurAchat||0),0);
        const enPanne = data.filter(d=>d.statut==='panne'||d.statut==='maintenance').length;
        const affectes = data.filter(d=>d.statut==='affecte').length;
        const attestManquantes = data.filter(d=>d.statut==='affecte'&&(!d.attestation||!d.attestation.signe)).length;
        const fmt = v => v >= 1000000 ? `${(v/1000000).toFixed(1)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : `${v}€`;
        const vgpProches = data.filter(d=>d.dateVGP&&daysDiff(d.dateVGP)<180).sort((a,b)=>daysDiff(a.dateVGP)-daysDiff(b.dateVGP));
        const vgpDepasses = data.filter(d=>d.dateVGP&&daysDiff(d.dateVGP)<0);
        const tabs = [{id:'dashboard',label:'Dashboard'},{id:'inventaire',label:'Inventaire'},{id:'attestations',label:`Attestations (${affectes})`},{id:'vgp',label:`VGP${vgpProches.length>0?' ('+vgpProches.length+')':''}`},{id:'mouvements',label:'Mouvements'}];

        return (
          <div style={{padding:0}}>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:'linear-gradient(90deg,#ea580c 0%,#7c3aed 50%,#0891b2 100%)'}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:'#ea580c',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>🛠️</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Parc Matériel & Outillage</h2>
                        {vgpDepasses.length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#dc262615',color:'#dc2626',fontWeight:700,border:'1px solid #dc262630'}}>⚠ {vgpDepasses.length} VGP dépassée{vgpDepasses.length>1?'s':''}</span>}
                        {vgpProches.filter(d=>daysDiff(d.dateVGP)>=0).length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#f59e0b15',color:'#d97706',fontWeight:700,border:'1px solid #f59e0b30'}}>{vgpProches.filter(d=>daysDiff(d.dateVGP)>=0).length} VGP proches</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>{data.length} équipements · Valeur: {fmt(valeurTotale)} · {affectes} affectés nominativement</p>
                    </div>
                  </div>
                  <button onClick={()=>setMatEdit({id:'MAT-'+String(Date.now()).slice(-4),nom:'',categorie:'outillage_electro',filialeId:3,affecteAId:null,statut:'disponible',affectation:'',dateAchat:new Date().toISOString().slice(0,10),valeurAchat:0,notes:'',louable:false,quantite:1})} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#ea580c',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Matériel
                  </button>
                </div>
                <div style={{display:'flex',gap:16,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                  {[{l:'Disponible',v:data.filter(d=>d.statut==='disponible').length,c:'#16a34a'},{l:'En service',v:data.filter(d=>d.statut==='en_service').length,c:'#2563eb'},{l:'Affecté',v:affectes,c:'#7c3aed'},{l:'Maintenance',v:data.filter(d=>d.statut==='maintenance'||d.statut==='panne').length,c:'#ea580c'}].map((k,i)=>(
                    <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}>
                      <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{k.l}</div>
                      <div style={{fontSize:'1.1rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em'}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Tabs + Filtres */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content',flexWrap:'wrap'}}>
                {tabs.map(t=><button key={t.id} onClick={()=>setMatTab(t.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:matTab===t.id?$selBg:'transparent',color:matTab===t.id?$selText:$textMut,fontWeight:matTab===t.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{t.label}</button>)}
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setMatFilterOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${matFilterOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:matFilterOpen?$accentSub:'transparent',color:matFilterOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ⚙ Filtres & Colonnes {matFilialeFilter.length>0&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {matFilialeFilter.length>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setMatFilialeFilter([])}>✕ {matFilialeFilter.length} filiale{matFilialeFilter.length>1?'s':''}</span>}
              </div>
            </div>

            {/* ── Filtres & Colonnes panel ── */}
            {matFilterOpen&&<><div onClick={()=>setMatFilterOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              {/* Filiale filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                {(()=>{
                  const FIL_LIST=[{id:1,label:'🚛 La Roulotte',color:'#ea580c'},{id:2,label:'🪜 L\'Échafaudage',color:'#7c3aed'},{id:3,label:'🏗️ Ezel Bâtiment',color:'#2563eb'},{id:6,label:'💧 L\'Étanchéité',color:'#0891b2'}];
                  const toggle=(id)=>setMatFilialeFilter(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
                  const isC=(id)=>matFilialeFilter.includes(id);
                  const rawData=matData.length>0?matData:sampleMat;
                  const countF=(fid)=>rawData.filter(d=>d.filialeId===fid).length;
                  return(<div style={{display:'flex',flexDirection:'column',gap:2}}>
                    {FIL_LIST.map(f=><div key={f.id} onClick={()=>toggle(f.id)} style={{padding:'5px 8px',display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC(f.id)?$accent:$border}`,background:isC(f.id)?$accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC(f.id)&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                      <div style={{width:7,height:7,borderRadius:'50%',background:f.color,flexShrink:0}}/>
                      <span style={{fontSize:'0.78rem',fontWeight:isC(f.id)?600:400,color:isC(f.id)?$text:$textSec,flex:1}}>{f.label}</span>
                      <span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut}}>{countF(f.id)}</span>
                    </div>)}
                  </div>);
                })()}
              </div>
              {/* Colonnes visibles */}
              <div style={{borderTop:`1px solid ${$border}`,paddingTop:12}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Colonnes visibles</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {[{id:'id',label:'ID'},{id:'nom',label:'Désignation',locked:true},{id:'cat',label:'Catégorie'},{id:'qte',label:'Quantité'},{id:'fil',label:'Filiale'},{id:'affect',label:'Affecté à'},{id:'statut',label:'Statut'},{id:'valeur',label:'Valeur'},{id:'vgp',label:'VGP'},{id:'act',label:'Actions'}].map(col=>(
                    <label key={col.id} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 8px',borderRadius:crmRd,cursor:col.locked?'default':'pointer',opacity:col.locked?0.5:1,fontSize:'0.76rem',color:$textSec,transition:'background 0.1s'}} onMouseEnter={e=>{if(!col.locked)e.currentTarget.style.background=$bgSub;}} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <input type='checkbox' checked={matVisibleCols[col.id]!==false} disabled={col.locked} onChange={()=>setMatVisibleCols(p=>({...p,[col.id]:p[col.id]===false?true:false}))} style={{accentColor:$accent}}/>
                      {col.label}
                    </label>
                  ))}
                </div>
              </div>
            </div></>}

            <div style={{minHeight:'60vh'}}>
            {/* ═══ DASHBOARD ═══ */}
            {matTab === 'dashboard' && <>
                          {/* KPI Cards */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:20}}>
                {[{l:'Total',v:data.length,c:'#0891b2',sub:`${data.reduce((s,d)=>s+(d.quantite||1),0)} unités`},{l:'En service',v:data.filter(d=>d.statut==='en_service').length,c:'#2563eb'},{l:'Affectés',v:affectes,c:'#7c3aed',sub:attestManquantes>0?`${attestManquantes} sans attestation`:''},{l:'Disponibles',v:data.filter(d=>d.statut==='disponible').length,c:'#16a34a'},{l:'Panne / Maint.',v:enPanne,c:enPanne>0?'#dc2626':'#16a34a'},{l:'Valeur totale',v:fmt(valeurTotale),c:'#0891b2'}].map((k,i)=><div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}>
                  <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                  <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                  {k.sub&&<div style={{fontSize:'0.72rem',color:$textMut,marginTop:4}}>{k.sub}</div>}
                </div>)}
              </div>

              {/* Alertes critiques */}
              {(()=>{
                const alertes=[];
                vgpDepasses.forEach(d=>alertes.push({type:'danger',icon:'🔴',text:`VGP DÉPASSÉ — ${d.nom} (${d.id}) · ${Math.abs(daysDiff(d.dateVGP))}j de retard`}));
                data.filter(d=>d.dateVGP&&daysDiff(d.dateVGP)>=0&&daysDiff(d.dateVGP)<90).forEach(d=>alertes.push({type:'warn',icon:'🟠',text:`VGP < 90j — ${d.nom} (${d.id}) · ${daysDiff(d.dateVGP)}j restants`}));
                data.filter(d=>d.statut==='panne').forEach(d=>alertes.push({type:'danger',icon:'🔧',text:`EN PANNE — ${d.nom} (${d.id})`}));
                if(attestManquantes>0) alertes.push({type:'warn',icon:'📋',text:`${attestManquantes} attestation(s) manquante(s) — matériels affectés sans signature`});
                if(alertes.length===0) return null;
                return <div style={{background:$danger+'08',border:`1px solid ${$danger}25`,borderRadius:crmRd,padding:'16px 20px',marginBottom:20,borderLeft:`4px solid ${$danger}`}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$danger,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.04em'}}>Alertes critiques</div>
                  <div style={{display:'flex',flexDirection:'column',gap:4}}>
                    {alertes.map((a,i)=><div key={i} style={{fontSize:'0.78rem',color:a.type==='danger'?$danger:$warn,lineHeight:1.5}}>{a.icon} {a.text}</div>)}
                  </div>
                </div>;
              })()}

              {/* 2 colonnes: Répartition catégorie + Répartition filiale */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
                {/* Par catégorie */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par catégorie</div>
                  {MAT_CATS.map(cat=>{const n=data.filter(d=>d.categorie===cat.id).length;const v=data.filter(d=>d.categorie===cat.id).reduce((s,d)=>s+(d.valeurAchat||0),0);if(n===0)return null;const pct=data.length>0?Math.round(n/data.length*100):0;return <div key={cat.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:`1px solid ${$borderLight}`}}>
                    <span style={{fontSize:'0.78rem',width:140,display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:cat.color,flexShrink:0}}/>{cat.label}</span>
                    <div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:cat.color,borderRadius:3,transition:'width 0.3s'}}/></div>
                    <span style={{fontSize:'0.78rem',fontWeight:700,color:cat.color,minWidth:24,textAlign:'right'}}>{n}</span>
                    <span style={{fontSize:'0.72rem',color:$textMut,minWidth:48,textAlign:'right'}}>{fmt(v)}</span>
                  </div>;})}
                </div>

                {/* Par filiale */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par filiale</div>
                  {[{id:1,nom:'La Roulotte',color:'#ea580c'},{id:2,nom:"L'Échafaudage",color:'#7c3aed'},{id:3,nom:'Ezel Bâtiment',color:'#2563eb'},{id:6,nom:"L'Étanchéité",color:'#0891b2'}].map(f=>{const items=data.filter(d=>d.filialeId===f.id);const n=items.length;const v=items.reduce((s,d)=>s+(d.valeurAchat||0),0);if(n===0)return null;const pct=data.length>0?Math.round(n/data.length*100):0;return <div key={f.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:`1px solid ${$borderLight}`}}>
                    <span style={{fontSize:'0.78rem',width:140,display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:f.color,flexShrink:0}}/>{f.nom}</span>
                    <div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:f.color,borderRadius:3,transition:'width 0.3s'}}/></div>
                    <span style={{fontSize:'0.78rem',fontWeight:700,color:f.color,minWidth:24,textAlign:'right'}}>{n}</span>
                    <span style={{fontSize:'0.72rem',color:$textMut,minWidth:48,textAlign:'right'}}>{fmt(v)}</span>
                  </div>;})}
                </div>
              </div>

              {/* Par statut */}
              <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par statut</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {MAT_STATUTS.map(st=>{const n=data.filter(d=>d.statut===st.id).length;if(n===0)return null;const pct=data.length>0?Math.round(n/data.length*100):0;return <div key={st.id} style={{flex:'1 1 140px',padding:'12px 16px',background:st.color+'08',border:`1px solid ${st.color}20`,borderRadius:crmRd,borderLeft:showBorderAccent?`4px solid ${st.color}`:'none'}}>
                    <div style={{fontSize:'0.68rem',fontWeight:600,color:st.color,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>{st.label}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:6}}>
                      <span style={{fontSize:'1.2rem',fontWeight:700,color:st.color}}>{n}</span>
                      <span style={{fontSize:'0.72rem',color:$textMut}}>{pct}%</span>
                    </div>
                  </div>;})}
                </div>
              </div>
            </>}

            {/* ═══ INVENTAIRE TAB ═══ */}
            {matTab === 'inventaire' && <>
              <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'center',flexWrap:'wrap'}}>
                <select value={matFilter} onChange={e=>setMatFilter(e.target.value)} style={{padding:'6px 14px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontWeight:500,fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
                  <option value="tous">Tous ({data.length})</option>
                  <optgroup label="Catégorie">{MAT_CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</optgroup>
                  <optgroup label="Statut">{MAT_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>
                </select>
                <span style={{fontSize:'0.78rem',color:$textMut}}>{filtered.length} résultats</span>
              </div>

              {/* Répartition catégories */}
              <div style={{display:'flex',gap:4,marginBottom:12,flexWrap:'wrap'}}>
                {MAT_CATS.map(cat=>{const n=data.filter(d=>d.categorie===cat.id).length;return n>0?<div key={cat.id} style={{padding:'4px 10px',background:cat.color+'12',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,color:cat.color,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:4,transition:'all 0.15s'}} onClick={()=>setMatFilter(matFilter===cat.id?'tous':cat.id)}>{cat.icon} {cat.label} {n}</div>:null;})}
              </div>

              <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflowX:'auto',background:$bgCard,boxShadow:$shadow}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {[{k:'id',l:'ID'},{k:'nom',l:'Désignation'},{k:'cat',l:'Catégorie'},{k:'qte',l:'Qté'},{k:'fil',l:'Filiale'},{k:'affect',l:'Affecté à'},{k:'statut',l:'Statut'},{k:'valeur',l:'Valeur'},{k:'vgp',l:'VGP'},{k:'act',l:''}].filter(h=>matVisibleCols[h.k]!==false).map(h=><th key={h.k} style={{position:'relative',padding:'12px 10px',textAlign:'left',fontWeight:700,color:$textMut,borderBottom:`1px solid ${$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h.l}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{filtered.map((m,idx)=>{
                    const gd=daysDiff(m.dateVGP);
                    return <tr key={m.id} onClick={()=>setMatDetail(m)} style={{borderBottom:`1px solid ${$borderLight}`,background:$bgSub+'60',cursor:'pointer',opacity:m.statut==='reforme'?0.4:1,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                      {matVisibleCols.id!==false&&<td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{m.id}</td>}
                      {matVisibleCols.nom!==false&&<td style={{padding:'12px 14px',fontWeight:600,color:$text}}>{m.nom}</td>}
                      {matVisibleCols.cat!==false&&<td style={{padding:'12px 14px'}}><Tag label={`${getIcon(MAT_CATS,m.categorie)} ${getLbl(MAT_CATS,m.categorie)}`} color={getClr(MAT_CATS,m.categorie)} s/></td>}
                      {matVisibleCols.qte!==false&&<td style={{padding:'12px 14px',textAlign:'center',fontWeight:600,color:$text}}>{m.quantite||1}</td>}
                      {matVisibleCols.fil!==false&&<td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:{1:'#ea580c',2:'#7c3aed',3:'#2563eb',6:'#0891b2'}[m.filialeId]||$accent,flexShrink:0}}/>{FIL_MAP[m.filialeId]||'—'}</span></td>}
                      {matVisibleCols.affect!==false&&<td style={{padding:'12px 14px'}}>{m.affecteAId?<span><strong>{empNom(m.affecteAId)}</strong>{m.attestation?.signe&&<span style={{color:'#16a34a',marginLeft:4,fontSize:'0.75rem'}}>✓</span>}</span>:m.affectation||'—'}</td>}
                      {matVisibleCols.statut!==false&&<td style={{padding:'12px 14px'}}><Tag label={getLbl(MAT_STATUTS,m.statut)} color={getClr(MAT_STATUTS,m.statut)} s/></td>}
                      {matVisibleCols.valeur!==false&&<td style={{padding:'12px 14px',textAlign:'right',fontSize:'0.82rem',color:$textSec}}>{m.valeurAchat>0?fmt(m.valeurAchat):'—'}</td>}
                      {matVisibleCols.vgp!==false&&<td style={{padding:'12px 14px'}}>{m.dateVGP?<span style={{color:gd<0?'#dc2626':gd<90?'#ea580c':$textSec,fontSize:'0.82rem'}}>{m.dateVGP}</span>:'—'}</td>}
                      {matVisibleCols.act!==false&&<td style={{padding:'4px 8px',textAlign:'center',whiteSpace:'nowrap'}}>
                        <button onClick={e=>{e.stopPropagation();setMatEdit({...m});}} style={{padding:'4px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',fontSize:'0.78rem',color:$accent,marginRight:3}} title="Modifier">✏️</button>
                        {(m.affecteAId||['outillage_electro','outillage_main','mesure','epi'].includes(m.categorie))&&<button onClick={e=>{e.stopPropagation();setMatAttest({materielId:m.id,salarieId:m.affecteAId||'',date:m.attestation?.date||new Date().toISOString().slice(0,10),observations:m.attestation?.observations||'',signe:m.attestation?.signe||false});}} style={{padding:'2px 6px',border:'1px solid '+(m.attestation?.signe?'#16a34a':'#ea580c'),background:m.attestation?.signe?'rgba(34,197,94,0.10)':'rgba(249,115,22,0.10)',fontSize:'0.75rem',cursor:'pointer',color:m.attestation?.signe?'#16a34a':'#ea580c',fontWeight:700}} title="Attestation">📋{m.attestation?.signe?' ✓':''}</button>}
                      </td>}
                    </tr>;})}
                  </tbody>
                </table>
              </div>
            </>}

            {/* ═══ ATTESTATIONS TAB ═══ */}
            {matTab === 'attestations' && <>
              <div style={{background:$info+'12',border:`1px solid ${$info}30`,color:$info,padding:'14px 18px',marginBottom:16,borderRadius:crmRd,borderLeft:`4px solid ${$info}`}}>
                <div style={{fontWeight:700,fontSize:'0.82rem',marginBottom:4}}>PROCESSUS D'ATTESTATION</div>
                <div style={{fontSize:'0.78rem',lineHeight:1.5,color:$textSec}}>
                  Lorsqu'un outillage ou matériel est confié nominativement à un collaborateur, une <strong style={{color:$success}}>attestation de remise</strong> doit être signée.
                  Le salarié reconnaît avoir reçu le matériel en bon état et s'engage à le restituer. En cas de perte ou casse par négligence, une retenue peut être appliquée.
                </div>
              </div>

              {attestManquantes>0&&<div style={{background:$danger+'12',border:`1px solid ${$danger}30`,color:$danger,padding:'12px 16px',marginBottom:12,borderRadius:crmRd,borderLeft:`4px solid ${$danger}`}}>
                <strong>{attestManquantes} attestation(s) manquante(s)</strong> — des matériels sont affectés sans attestation signée.
              </div>}

              <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
                <button onClick={()=>setMatAttest({materielId:'',salarieId:'',date:new Date().toISOString().slice(0,10),observations:'',signe:false})} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}>+ NOUVELLE ATTESTATION</button>
              </div>

              <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflowX:'auto',background:$bgCard,boxShadow:$shadow}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {['Matériel','Catégorie','Valeur','Affecté à','Date remise','Signé',''].map(h=><th key={h} style={{position:'relative',padding:'12px 10px',textAlign:'left',fontWeight:700,color:$textMut,borderBottom:`1px solid ${$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{data.filter(d=>d.statut==='affecte'||d.affecteAId).map((m,idx)=>
                    <tr key={m.id} style={{borderBottom:`1px solid ${$borderLight}`,background:$bgSub+'60',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                      <td style={{padding:'12px 14px',fontWeight:600,color:$text}}>{m.nom}</td>
                      <td style={{padding:'12px 14px'}}><Tag label={`${getIcon(MAT_CATS,m.categorie)} ${getLbl(MAT_CATS,m.categorie)}`} color={getClr(MAT_CATS,m.categorie)} s/></td>
                      <td style={{padding:'12px 14px',textAlign:'right',fontSize:'0.82rem',color:$textSec}}>{m.valeurAchat>0?fmt(m.valeurAchat):'—'}</td>
                      <td style={{padding:'12px 14px',fontWeight:600,color:$text}}>{m.affecteAId?empNom(m.affecteAId):'—'}</td>
                      <td style={{padding:'12px 14px'}}>{m.attestation?.date||'—'}</td>
                      <td style={{padding:'12px 14px'}}>{m.attestation?.signe?<Tag label="SIGNÉ" color="#16a34a"/>:<Tag label="NON SIGNÉ" color="#dc2626"/>}</td>
                      <td style={{padding:'12px 14px',textAlign:'center'}}>
                        <button onClick={()=>setMatAttest({materielId:m.id,salarieId:m.affecteAId||'',date:m.attestation?.date||new Date().toISOString().slice(0,10),observations:m.attestation?.observations||'',signe:m.attestation?.signe||false})} style={{padding:'4px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,background:'transparent',fontSize:'0.78rem',cursor:'pointer',fontWeight:600,color:$accent,fontFamily:'inherit',transition:'all 0.15s'}}>Voir / Signer</button>
                      </td>
                    </tr>
                  )}
                  {data.filter(d=>d.statut==='affecte'||d.affecteAId).length===0&&<tr><td colSpan={7} style={{padding:20,textAlign:'center',color:$textMut}}>Aucun matériel affecté nominativement.</td></tr>}
                  </tbody>
                </table>
              </div>
            </>}

            {/* ═══ VGP / CONTRÔLES ═══ */}
            {matTab === 'vgp' && <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:20}}>
                {[{l:'Total VGP requis',v:data.filter(d=>d.dateVGP).length,c:'#0891b2'},{l:'Dépassés',v:vgpDepasses.length,c:vgpDepasses.length>0?'#dc2626':'#16a34a'},{l:'< 90 jours',v:data.filter(d=>d.dateVGP&&daysDiff(d.dateVGP)>=0&&daysDiff(d.dateVGP)<90).length,c:'#ea580c'},{l:'< 180 jours',v:data.filter(d=>d.dateVGP&&daysDiff(d.dateVGP)>=0&&daysDiff(d.dateVGP)<180).length,c:'#d97706'}].map((k,i)=><div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}>
                  <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                  <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                </div>)}
              </div>

              <div style={{background:$info+'08',border:`1px solid ${$info}20`,borderRadius:crmRd,padding:'14px 18px',marginBottom:16,borderLeft:`4px solid ${$info}`}}>
                <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:4}}>Qu'est-ce que la VGP ?</div>
                <div style={{fontSize:'0.78rem',lineHeight:1.6,color:$textSec}}>
                  La <strong style={{color:$text}}>Vérification Générale Périodique</strong> (VGP) est un contrôle réglementaire obligatoire (Code du travail, articles R4323-23 à R4323-27) pour certains équipements de travail : engins de levage, nacelles, chariots élévateurs, échafaudages, appareils sous pression, harnais antichute…
                  Elle doit être réalisée tous les <strong style={{color:$text}}>6 ou 12 mois</strong> par un organisme accrédité (APAVE, Bureau Veritas, SOCOTEC, Dekra…).
                  En cas de non-conformité ou de VGP dépassée, l'employeur engage sa <strong style={{color:$danger}}>responsabilité pénale</strong> en cas d'accident, et le chantier peut être arrêté par l'inspection du travail.
                </div>
              </div>

              {vgpDepasses.length>0&&<div style={{background:$danger+'08',border:`1px solid ${$danger}25`,borderRadius:crmRd,padding:'14px 18px',marginBottom:16,borderLeft:`4px solid ${$danger}`}}>
                <div style={{fontWeight:700,fontSize:'0.82rem',color:$danger,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em'}}>VGP dépassés</div>
                {vgpDepasses.map(d=><div key={d.id} style={{fontSize:'0.78rem',color:$danger,lineHeight:1.8}}>🔴 {d.nom} ({d.id}) — <strong>{Math.abs(daysDiff(d.dateVGP))}j de retard</strong> · {FIL_MAP[d.filialeId]||''}</div>)}
              </div>}

              <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadow,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:$bgSub}}>
                    {['Matériel','ID','Catégorie','Filiale','Date VGP','Jours restants','Statut'].map(h=><th key={h} style={{position:'relative',padding:'12px 10px',textAlign:'left',fontWeight:700,color:$textMut,borderBottom:`1px solid ${$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>
                    {data.filter(d=>d.dateVGP).sort((a,b)=>daysDiff(a.dateVGP)-daysDiff(b.dateVGP)).map((m,idx)=>{
                      const gd=daysDiff(m.dateVGP);const urgColor=gd<0?'#dc2626':gd<90?'#ea580c':gd<180?'#d97706':'#16a34a';
                      return <tr key={m.id} onClick={()=>setMatDetail(m)} style={{borderBottom:`1px solid ${$borderLight}`,background:$bgSub+'60',cursor:'pointer',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                        <td style={{padding:'12px 14px',fontWeight:600,color:$text}}>{m.nom}</td>
                        <td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{m.id}</td>
                        <td style={{padding:'12px 14px'}}><Tag label={`${getIcon(MAT_CATS,m.categorie)} ${getLbl(MAT_CATS,m.categorie)}`} color={getClr(MAT_CATS,m.categorie)} s/></td>
                        <td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:{1:'#ea580c',2:'#7c3aed',3:'#2563eb',6:'#0891b2'}[m.filialeId]||$accent}}/>{FIL_MAP[m.filialeId]||'—'}</span></td>
                        <td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{m.dateVGP}</td>
                        <td style={{padding:'12px 14px'}}><span style={{fontWeight:700,color:urgColor,fontSize:'0.82rem'}}>{gd<0?`${Math.abs(gd)}j dépassé`:`${gd}j`}</span></td>
                        <td style={{padding:'12px 14px'}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:crmRd>0?20:2,background:urgColor+'18',color:urgColor,display:'inline-flex',alignItems:'center',gap:3}}><span style={{width:5,height:5,borderRadius:'50%',background:urgColor}}/>{gd<0?'DÉPASSÉ':gd<90?'URGENT':gd<180?'À PLANIFIER':'OK'}</span></td>
                      </tr>;
                    })}
                    {data.filter(d=>d.dateVGP).length===0&&<tr><td colSpan={7} style={{padding:20,textAlign:'center',color:$textMut}}>Aucun équipement avec VGP programmé.</td></tr>}
                  </tbody>
                </table>
              </div>
            </>}

            {/* ═══ MOUVEMENTS ═══ */}
            {matTab === 'mouvements' && <>
              <div style={{background:$info+'12',border:`1px solid ${$info}30`,borderRadius:crmRd,padding:'14px 18px',marginBottom:16,borderLeft:`4px solid ${$info}`}}>
                <div style={{fontWeight:700,fontSize:'0.82rem',marginBottom:4}}>Suivi des mouvements</div>
                <div style={{fontSize:'0.78rem',lineHeight:1.5,color:$textSec}}>
                  Historique des affectations, restitutions et transferts de matériel entre collaborateurs et chantiers. Les mouvements sont générés automatiquement à chaque changement d'affectation.
                </div>
              </div>

              {(()=>{
                const mouvements=[];
                data.forEach(m=>{
                  if(m.affecteAId&&m.attestation?.date) mouvements.push({date:m.attestation.date,type:'affectation',mat:m,to:empNom(m.affecteAId),signe:m.attestation.signe});
                  if(m.dateAchat) mouvements.push({date:m.dateAchat,type:'acquisition',mat:m,to:FIL_MAP[m.filialeId]||'Groupe'});
                });
                mouvements.sort((a,b)=>new Date(b.date)-new Date(a.date));
                if(mouvements.length===0) return <div style={{padding:40,textAlign:'center',color:$textMut}}>Aucun mouvement enregistré.</div>;
                return <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadow,overflow:'hidden'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                    <thead><tr style={{background:$bgSub}}>
                      {['Date','Type','Matériel','Catégorie','Destination','Statut'].map(h=><th key={h} style={{position:'relative',padding:'12px 10px',textAlign:'left',fontWeight:700,color:$textMut,borderBottom:`1px solid ${$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                    </tr></thead>
                    <tbody>
                      {mouvements.slice(0,50).map((mv,idx)=>{
                        const typeColor=mv.type==='affectation'?'#7c3aed':mv.type==='acquisition'?'#16a34a':'#0891b2';
                        const typeLabel=mv.type==='affectation'?'Affectation':mv.type==='acquisition'?'Acquisition':'Restitution';
                        return <tr key={idx} style={{borderBottom:`1px solid ${$borderLight}`,background:$bgSub+'60',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                          <td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{mv.date}</td>
                          <td style={{padding:'12px 14px'}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:crmRd>0?20:2,background:typeColor+'18',color:typeColor,display:'inline-flex',alignItems:'center',gap:3}}><span style={{width:5,height:5,borderRadius:'50%',background:typeColor}}/>{typeLabel}</span></td>
                          <td style={{padding:'12px 14px',fontWeight:600,color:$text}}>{mv.mat.nom}</td>
                          <td style={{padding:'12px 14px'}}><Tag label={`${getIcon(MAT_CATS,mv.mat.categorie)} ${getLbl(MAT_CATS,mv.mat.categorie)}`} color={getClr(MAT_CATS,mv.mat.categorie)} s/></td>
                          <td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{mv.to}</td>
                          <td style={{padding:'12px 14px'}}>{mv.signe!==undefined?<span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 8px',borderRadius:crmRd>0?20:2,background:mv.signe?$success+'18':$danger+'18',color:mv.signe?$success:$danger}}>{mv.signe?'✓ Signé':'✕ Non signé'}</span>:<span style={{fontSize:'0.72rem',color:$textMut}}>—</span>}</td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>;
              })()}
            </>}

            </div>{/* end minHeight */}

            {/* ═══ DETAIL MODAL ═══ */}
            {matDetail && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setMatDetail(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:700,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>
                  <div><div style={{fontWeight:700,fontSize:'1rem',color:$text}}>{matDetail.nom}</div><div style={{fontSize:'0.82rem',color:$accent,fontWeight:600}}>{matDetail.id} · {getIcon(MAT_CATS,matDetail.categorie)} {getLbl(MAT_CATS,matDetail.categorie)}</div></div>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>{setMatEdit({...matDetail});setMatDetail(null);}} style={{padding:'6px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,fontSize:'0.82rem',cursor:'pointer'}}>MODIFIER</button>
                    <button onClick={()=>setMatDetail(null)} style={{background:'none',border:'none',fontSize:'1.2rem',cursor:'pointer',color:$textMut}}>✕</button>
                  </div>
                </div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                  {[
                    {l:'Catégorie',v:`${getIcon(MAT_CATS,matDetail.categorie)} ${getLbl(MAT_CATS,matDetail.categorie)}`},
                    {l:'Statut',v:getLbl(MAT_STATUTS,matDetail.statut)},
                    {l:'Quantité',v:matDetail.quantite||1},
                    {l:'Filiale',v:FIL_MAP[matDetail.filialeId]||'—'},
                    {l:'Affecté à',v:matDetail.affecteAId?empNom(matDetail.affecteAId):(matDetail.affectation||'Non affecté')},
                    {l:'Attestation',v:matDetail.attestation?.signe?'✅ Signé':'❌ Non signé'},
                    {l:'Date achat',v:matDetail.dateAchat||'—'},
                    {l:'Valeur',v:matDetail.valeurAchat>0?fmt(matDetail.valeurAchat):'—'},
                    {l:'Prochain VGP',v:matDetail.dateVGP||'—'},
                  ].map((f,i)=><div key={i} style={{background:$bgCard,padding:'8px 12px'}}><div style={{fontSize:'0.72rem',fontWeight:700,color:$textMut,textTransform:'uppercase'}}>{f.l}</div><div style={{fontSize:'0.88rem',fontWeight:700,color:$text}}>{f.v}</div></div>)}
                </div>
                {matDetail.notes&&<div style={{padding:'12px 20px',fontSize:'0.92rem',color:$textSec,background:$bgSub,borderLeft:showBorderAccent?'3px solid #0891b2':'none',margin:'16px 20px'}}>{matDetail.notes}</div>}
                {/* Quick attestation button */}
                {(matDetail.affecteAId||['outillage_electro','outillage_main','mesure','epi'].includes(matDetail.categorie))&&<div style={{padding:'12px 20px'}}>
                  <button onClick={()=>{setMatAttest({materielId:matDetail.id,salarieId:matDetail.affecteAId||'',date:matDetail.attestation?.date||new Date().toISOString().slice(0,10),observations:matDetail.attestation?.observations||'',signe:matDetail.attestation?.signe||false});setMatDetail(null);}} style={{padding:'8px 16px',border:'2px solid #16a34a',background:'#16a34a',color:'white',fontWeight:700,fontSize:'0.92rem',cursor:'pointer',width:'100%'}}>📋 {matDetail.attestation?.signe?'VOIR ATTESTATION':'CRÉER ATTESTATION'}</button>
                </div>}
              </div>
            </div>}

            {/* ═══ EDIT MODAL ═══ */}
            {matEdit && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setMatEdit(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:700,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'16px 20px',borderBottom:'3px solid #0891b2',fontWeight:900}}>{data.find(d=>d.id===matEdit.id)?'MODIFIER':'NOUVEAU'} MATÉRIEL</div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div style={{gridColumn:'span 2'}}><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Désignation</label><input value={matEdit.nom||''} onChange={e=>setMatEdit({...matEdit,nom:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Catégorie</label><select value={matEdit.categorie} onChange={e=>setMatEdit({...matEdit,categorie:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}>{MAT_CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</select></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Statut</label><select value={matEdit.statut} onChange={e=>setMatEdit({...matEdit,statut:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}>{MAT_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Quantité</label><input type="number" value={matEdit.quantite||1} onChange={e=>setMatEdit({...matEdit,quantite:parseInt(e.target.value)||1})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Filiale</label><select value={matEdit.filialeId||''} onChange={e=>setMatEdit({...matEdit,filialeId:isNaN(e.target.value)?e.target.value:parseInt(e.target.value)})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">—</option>{FILIALE_FILTER_OPTIONS.map(f=><option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}</select></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Affecté à (nominatif)</label><select value={matEdit.affecteAId||''} onChange={e=>{const eid=e.target.value||null;setMatEdit({...matEdit,affecteAId:eid,statut:eid?'affecte':matEdit.statut==='affecte'?'disponible':matEdit.statut});}} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">— Non affecté —</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>)}</select></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Affectation (lieu/chantier)</label><input value={matEdit.affectation||''} onChange={e=>setMatEdit({...matEdit,affectation:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Date achat</label><input type="date" value={matEdit.dateAchat||''} onChange={e=>setMatEdit({...matEdit,dateAchat:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Valeur (€)</label><input type="number" value={matEdit.valeurAchat||0} onChange={e=>setMatEdit({...matEdit,valeurAchat:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Prochain VGP</label><input type="date" value={matEdit.dateVGP||''} onChange={e=>setMatEdit({...matEdit,dateVGP:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                  <div style={{gridColumn:'span 2'}}><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Notes</label><textarea value={matEdit.notes||''} onChange={e=>setMatEdit({...matEdit,notes:e.target.value})} rows={2} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,fontSize:'0.88rem',resize:'vertical',boxSizing:'border-box'}}/></div>
                </div>
                <div style={{padding:'12px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                  <div>{data.find(d=>d.id===matEdit.id)&&<button onClick={()=>{saveMat(data.filter(d=>d.id!==matEdit.id));setMatEdit(null);}} style={{padding:'6px 14px',border:'1px solid #fecaca',background:$danger+'12',color:'#dc2626',fontWeight:600,cursor:'pointer'}}>SUPPRIMER</button>}</div>
                  <div style={{display:'flex',gap:8}}><button onClick={()=>setMatEdit(null)} style={{padding:'6px 14px',border:`1px solid ${$border}`,background:$bgCard,fontWeight:600,cursor:'pointer'}}>ANNULER</button><button onClick={()=>{const ex=data.find(d=>d.id===matEdit.id);if(ex){saveMat(data.map(d=>d.id===matEdit.id?matEdit:d));}else{saveMat([...data,matEdit]);}setMatEdit(null);}} style={{padding:'6px 14px',border:'none',background:'#0891b2',color:'white',fontWeight:700,cursor:'pointer'}}>ENREGISTRER</button></div>
                </div>
              </div>
            </div>}

            {/* ═══ ATTESTATION MODAL ═══ */}
            {matAttest && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setMatAttest(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:650,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,fontWeight:700,color:$text,borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>ATTESTATION DE REMISE DE MATÉRIEL</div>
                <div style={{padding:'16px 20px'}}>
                  {/* Header officiel */}
                  <div style={{background:$bgSub,padding:'14px 18px',borderLeft:showBorderAccent?`3px solid ${$accent}`:'none',marginBottom:16,borderRadius:Math.max(crmRd-4,2)}}>
                    <div style={{fontWeight:800,fontSize:'0.88rem'}}>ATTESTATION DE REMISE D'OUTILLAGE / MATÉRIEL</div>
                    <div style={{fontSize:'0.82rem',color:$textSec,marginTop:4}}>Le salarié reconnaît avoir reçu le matériel ci-dessous en bon état de fonctionnement. Il s'engage à en prendre soin, à l'utiliser conformément à sa destination et à le restituer à première demande de l'employeur.</div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                    <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Matériel</label><select value={matAttest.materielId} onChange={e=>setMatAttest({...matAttest,materielId:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">— Sélectionner —</option>{data.map(m=><option key={m.id} value={m.id}>{m.nom} ({m.id})</option>)}</select></div>
                    <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Collaborateur</label><select value={matAttest.salarieId} onChange={e=>setMatAttest({...matAttest,salarieId:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">— Sélectionner —</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>)}</select></div>
                    <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Date de remise</label><input type="date" value={matAttest.date} onChange={e=>setMatAttest({...matAttest,date:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/></div>
                    <div><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Valeur</label><div style={{padding:'8px',background:$bgSub,border:`1px solid ${$border}`,fontSize:'0.88rem',fontWeight:700,color:'#0891b2'}}>{(()=>{const m=data.find(d=>d.id===matAttest.materielId);return m?fmt(m.valeurAchat):'—';})()}</div></div>
                  </div>

                  <div style={{marginBottom:16}}><label style={{fontSize:'0.72rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Observations / État du matériel à la remise</label><textarea value={matAttest.observations||''} onChange={e=>setMatAttest({...matAttest,observations:e.target.value})} rows={2} placeholder="Bon état, complet avec accessoires, batterie chargée..." style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem',resize:'vertical',boxSizing:'border-box',marginTop:4}}/></div>

                  {/* Clause légale */}
                  <div style={{background:$danger+'12',padding:'10px 14px',borderLeft:'3px solid #dc2626',marginBottom:16,fontSize:'0.78rem',color:'#991b1b'}}>
                    En cas de perte, vol, détérioration par négligence ou non-restitution du matériel, une retenue sur salaire pourra être effectuée conformément aux dispositions légales (Art. L.1331-2 du Code du travail), dans la limite de 10% du salaire net.
                  </div>

                  {/* Signature */}
                  <div style={{background:$bgSub,padding:'14px 18px',borderLeft:showBorderAccent?`3px solid ${$accent}`:'none',borderRadius:Math.max(crmRd-4,2)}}>
                    <div style={{fontWeight:800,fontSize:'0.82rem',marginBottom:8,textTransform:'uppercase'}}>Signature</div>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <span style={{fontSize:'0.92rem'}}>Signataire: <strong>{matAttest.salarieId?empNom(matAttest.salarieId):'—'}</strong></span>
                      <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:'0.92rem'}}><input type="checkbox" checked={matAttest.signe} onChange={e=>setMatAttest({...matAttest,signe:e.target.checked})} style={{width:18,height:18}}/> Document signé</label>
                    </div>
                    <div style={{fontSize:'0.72rem',color:$textMut,marginTop:6}}>En production: signature électronique, génération PDF, envoi par email, archivage GED.</div>
                  </div>
                </div>
                <div style={{padding:'12px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'flex-end',gap:8}}>
                  <button onClick={()=>setMatAttest(null)} style={{padding:'6px 16px',border:`1px solid ${$border}`,background:$bgCard,fontWeight:600,cursor:'pointer'}}>ANNULER</button>
                  <button onClick={()=>{if(matAttest.materielId&&matAttest.salarieId){const updated=data.map(d=>d.id===matAttest.materielId?{...d,affecteAId:matAttest.salarieId,statut:'affecte',attestation:{date:matAttest.date,observations:matAttest.observations,signe:matAttest.signe}}:d);saveMat(updated);}setMatAttest(null);}} style={{padding:'6px 16px',border:'none',background:'#16a34a',color:'white',fontWeight:700,cursor:'pointer'}}>ENREGISTRER ATTESTATION</button>
                </div>
              </div>
            </div>}

          </div>
        );
}
