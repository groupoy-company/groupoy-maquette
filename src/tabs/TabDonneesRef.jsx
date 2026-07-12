// === Onglet « donnees_ref » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabDonneesRef(__props) {
  const { $accent, $bgCard, $border, $danger, $shadow, $shadowLg, $text, $textMut, $textSec, autoData, ca, chantiers, collaborateurs, crmRd, drTab, employes, filiales, filialesDynamiques, niveau, setCollabDetailTab, setCollabOngletId, setDrTab, setEmployeForm, setModalEmploye, setOngletActif } = __props;
        const drTabs = [{id:'filiales',label:'Filiales',icon:'▪'},{id:'collaborateurs',label:'Collaborateurs',icon:'◉'},{id:'vehicules',label:'Véhicules',icon:'🚗'},{id:'materiel',label:'Matériel',icon:'✱'},{id:'chantiers',label:'Chantiers / Affaires',icon:'◆'},{id:'clients',label:'Clients',icon:'🤝'},{id:'prestataires',label:'Prestataires',icon:'▣'}];
        const Tag = ({label,color}) => <span style={{display:'inline-block',padding:'2px 8px',background:(color||'#64748b')+'12',color:color||'#64748b',fontWeight:700,fontSize:'0.75rem',borderLeft:`2px solid ${color||'#64748b'}`}}>{label}</span>;
        const allChantiers = chantiers || [];
        const allClients = [...new Set(allChantiers.map(c=>c.client).filter(Boolean))].sort();
        const actifVehicules = (autoData.length > 0 ? autoData : []).length > 0 ? autoData : [];

        return (
          <div style={{padding:'20px 28px',fontFamily:'system-ui'}}>
            <div style={{borderBottom:'3px solid #6366f1',paddingBottom:12,marginBottom:20}}>
              <div style={{fontSize:'0.7rem',fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.12em'}}>YILMAZ — IT / DIGITAL</div>
              <h2 style={{fontSize:'1.5rem',fontWeight:900,color:'#0f172a',margin:'2px 0 0'}}>Données de Référence</h2>
              <div style={{fontSize:'0.85rem',color:$textSec,marginTop:2}}>Base de données centralisée — Tables maîtres du groupe</div>
            </div>

            {/* KPIs */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',gap:1,marginBottom:20,background:'#e2e8f0'}}>
              {[
                {l:'Filiales',v:filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE'].includes(f.nom)).length,c:'#6366f1'},
                {l:'Collaborateurs',v:employes.length,c:'#059669'},
                {l:'Véhicules',v:41,c:'#0284c7'},
                {l:'Matériel',v:10,c:'#0891b2'},
                {l:'Chantiers',v:allChantiers.length,c:'#ea580c'},
                {l:'Clients',v:allClients.length,c:'#8b5cf6'},
              ].map((k,i)=><div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
              >
                <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                {k.ic&&<div style={{position:'absolute',top:10,right:14,fontSize:'1.2rem',opacity:0.1}}>{k.ic}</div>}
              </div>)}
            </div>

            {/* Tabs */}
            <div style={{display:'flex',gap:0,marginBottom:20,borderBottom:'1px solid #e2e8f0',position:'sticky',top:0,zIndex:40,background:'#fff',paddingTop:8}}>
              {drTabs.map(t=><button key={t.id} onClick={()=>setDrTab(t.id)} style={{padding:'8px 14px',border:'none',borderBottom:drTab===t.id?'3px solid #6366f1':'3px solid transparent',background:'none',color:drTab===t.id?'#0f172a':'#94a3b8',fontWeight:drTab===t.id?800:500,fontSize:'0.85rem',cursor:'pointer',transition:'all 0.15s'}}>{t.icon} {t.label}</button>)}
            </div>

            <div style={{minHeight:'60vh'}}>

            {/* ═══ FILIALES ═══ */}
            {drTab === 'filiales' && <div>
              <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Filiales du groupe</div>
              <div style={{border:'1px solid #e2e8f0'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.85rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['ID','Nom','Holding','Activité','Couleur','Effectif','CA'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.75rem',textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{filialesDynamiques.map((f,idx)=>{
                    const eff = employes.filter(e=>e.filialeId===f.id).length;
                    return <tr key={f.id} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc'}}>
                      <td style={{padding:'6px 10px',fontFamily:'monospace',fontWeight:700,color:'#6366f1',borderRight:'1px solid #f1f5f9'}}>{f.id}</td>
                      <td style={{padding:'6px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{f.icon} {f.nom}</td>
                      <td style={{padding:'6px 10px',fontSize:'0.8rem',color:$textSec,borderRight:'1px solid #f1f5f9'}}>{f.holding||'—'}</td>
                      <td style={{padding:'6px 10px',fontSize:'0.8rem',color:$textSec,borderRight:'1px solid #f1f5f9'}}>{f.activite||'—'}</td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><span style={{display:'inline-block',width:16,height:16,background:f.couleur||'#ccc'}}></span></td>
                      <td style={{padding:'6px 10px',textAlign:'center',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{eff}</td>
                      <td style={{padding:'6px 10px',textAlign:'right',fontWeight:700,color:'#059669'}}>{f.ca>0?`${(f.ca/1000000).toFixed(1)}M€`:'—'}</td>
                    </tr>;})}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ═══ COLLABORATEURS ═══ */}
            {drTab === 'collaborateurs' && <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Collaborateurs ({employes.length})</div>
                <button onClick={()=>{setEmployeForm({...({nom:'',prenom:'',dateNaissance:'',dateEntree:'',filialeId:'yilmaz',service:'',niveau:'S',posteInterne:'',posteExterne:'',isResponsable:false,caGere:0,margeBrutePct:30,ebePct:8,salaireFix:0,primeFix:0,variable:0,email:'',historique:[]})});setModalEmploye('add');}} style={{padding:'6px 16px',border:'2px solid #059669',background:'#059669',color:'white',fontWeight:700,fontSize:'0.8rem',cursor:'pointer'}}>+ COLLABORATEUR</button>
              </div>
              <div style={{border:'1px solid #e2e8f0',overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['ID','Nom Prénom','Poste','Filiale','Niveau','Statut','Fixe','Total'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.72rem',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{employes.sort((a,b)=>{const n=['XXXL','XXL','XL','L','M','S','XS','XXS'];return n.indexOf(a.niveau)-n.indexOf(b.niveau);}).map((e,idx)=>{
                    const fil = filialesDynamiques.find(f=>f.id===e.filialeId);
                    const filName = fil ? `${fil.icon} ${fil.nom}` : e.filialeId==='yilmaz' ? '◆ Yilmaz' : '—';
                    const total = (e.salaireFix||0)+(e.primeFix||0)+(e.variable||0);
                    return <tr key={e.id} onClick={()=> {setCollabOngletId(e.id);setCollabDetailTab('profil');}} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc',cursor:'pointer'}} onMouseOver={ev=>ev.currentTarget.style.background='#f0f9ff'} onMouseOut={ev=>ev.currentTarget.style.background=idx%2===0?'#fff':'#fafbfc'}>
                      <td style={{padding:'6px 10px',fontFamily:'monospace',fontWeight:700,color:'#6366f1',fontSize:'0.75rem',borderRight:'1px solid #f1f5f9'}}>{e.id}</td>
                      <td style={{padding:'6px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{e.prenom} {e.nom}{e.statutContrat==='externe'&&<span style={{fontSize:'0.62rem',padding:'1px 4px',background:'#dbeafe',color:'#1e40af',fontWeight:700,marginLeft:4}}>EXT</span>}{e.arretMaladie&&<span style={{fontSize:'0.62rem',padding:'1px 4px',background:$danger+'12',color:'#dc2626',fontWeight:700,marginLeft:4}}>ARRÊT</span>}</td>
                      <td style={{padding:'6px 10px',color:$text,borderRight:'1px solid #f1f5f9'}}>{e.posteExterne||'—'}</td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={filName} color={fil?.couleur||'#8B6F47'}/></td>
                      <td style={{padding:'6px 10px',textAlign:'center',borderRight:'1px solid #f1f5f9'}}><span style={{padding:'2px 8px',background:$accent+'15',color:$accent,fontWeight:700,fontSize:'0.75rem',border:`1px solid ${$border}`}}>{e.niveau}</span></td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}>{e.arretMaladie?<Tag label="Arrêt" color="#dc2626"/>:e.statutContrat==='externe'?<Tag label="Externe" color="#2563eb"/>:<Tag label="Actif" color="#16a34a"/>}</td>
                      <td style={{padding:'6px 10px',textAlign:'right',color:'#2563eb',fontWeight:600,borderRight:'1px solid #f1f5f9'}}>{((e.salaireFix||0)/1000).toFixed(0)}k€</td>
                      <td style={{padding:'6px 10px',textAlign:'right',fontWeight:700,color:'#d97706'}}>{(total/1000).toFixed(0)}k€</td>
                    </tr>;})}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ═══ VÉHICULES ═══ */}
            {drTab === 'vehicules' && <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Véhicules (41)</div>
                <button onClick={()=>{setOngletActif('parc_automobile');}} style={{padding:'6px 16px',border:'2px solid #0284c7',background:'#0284c7',color:'white',fontWeight:700,fontSize:'0.8rem',cursor:'pointer'}}>OUVRIR PARC AUTO →</button>
              </div>
              <div style={{border:'1px solid #e2e8f0',overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['ID','Marque / Modèle','Immat','Filiale','Type','Conducteur','Statut','Km'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.72rem',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{(autoData.length>0?autoData:[]).concat(autoData.length===0?(() => {try{return JSON.parse(localStorage.getItem('ruches_auto_data')||'[]');}catch(e) {return [];}})():[]).slice(0,0).length===0 && <tr><td colSpan={8} style={{padding:20,textAlign:'center',color:'#94a3b8'}}>Les véhicules sont gérés dans le module <strong>Parc Automobile</strong>. Cliquez sur le bouton ci-dessus pour y accéder.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div style={{background:'#f0f9ff',padding:'12px 16px',marginTop:8,borderLeft:'3px solid #0284c7'}}>
                <div style={{fontSize:'0.8rem',color:'#0c4a6e'}}>Les données véhicules sont gérées directement dans le module <strong>Parc Automobile</strong> (Logistique & Parc). Ce tableau affiche un aperçu en lecture seule. Pour modifier, ajoutez ou supprimez un véhicule, rendez-vous dans le module dédié.</div>
              </div>
            </div>}

            {/* ═══ MATÉRIEL ═══ */}
            {drTab === 'materiel' && <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Matériel BTP</div>
                <button onClick={()=>{setOngletActif('materiel');}} style={{padding:'6px 16px',border:'2px solid #0891b2',background:'#0891b2',color:'white',fontWeight:700,fontSize:'0.8rem',cursor:'pointer'}}>OUVRIR PARC MATÉRIEL →</button>
              </div>
              <div style={{background:'#f0f9ff',padding:'12px 16px',borderLeft:'3px solid #0891b2'}}>
                <div style={{fontSize:'0.8rem',color:'#0c4a6e'}}>Les données matériel sont gérées dans le module <strong>Parc Matériel</strong> (Logistique & Parc).</div>
              </div>
            </div>}

            {/* ═══ CHANTIERS / AFFAIRES ═══ */}
            {drTab === 'chantiers' && <div>
              <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Chantiers & Affaires ({allChantiers.length})</div>
              <div style={{border:'1px solid #e2e8f0',overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['ID','Nom','Filiale','Client','Statut','Avancement','Budget HT','Vente','Début','Fin'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.72rem',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{allChantiers.sort((a,b)=>new Date(b.dateDebut||0)-new Date(a.dateDebut||0)).map((ch,idx)=>{
                    const fil = filialesDynamiques.find(f=>f.id===ch.filialeId);
                    const statColors = {'En cours':'#ea580c','Terminé':'#16a34a','Planifié':'#64748b','En attente':'#8b5cf6'};
                    return <tr key={ch.id} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc'}}>
                      <td style={{padding:'6px 10px',fontFamily:'monospace',fontWeight:700,color:'#6366f1',fontSize:'0.75rem',borderRight:'1px solid #f1f5f9'}}>{ch.id}</td>
                      <td style={{padding:'6px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{ch.nom}</td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}>{fil?<Tag label={`${fil.icon} ${fil.nom}`} color={fil.couleur}/>:'—'}</td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}>{ch.client||'—'}</td>
                      <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={ch.statut} color={statColors[ch.statut]||'#64748b'}/></td>
                      <td style={{padding:'6px 10px',textAlign:'center',borderRight:'1px solid #f1f5f9'}}><div style={{display:'flex',alignItems:'center',gap:4}}><div style={{flex:1,height:6,background:'#e2e8f0'}}><div style={{height:'100%',width:`${ch.avancement||0}%`,background:ch.avancement>=100?'#16a34a':ch.avancement>=50?'#0284c7':'#ea580c'}}/></div><span style={{fontSize:'0.72rem',fontWeight:700,minWidth:28}}>{ch.avancement||0}%</span></div></td>
                      <td style={{padding:'6px 10px',textAlign:'right',fontWeight:600,borderRight:'1px solid #f1f5f9'}}>{ch.budgetHT?`${(ch.budgetHT/1000).toFixed(0)}k€`:'—'}</td>
                      <td style={{padding:'6px 10px',textAlign:'right',fontWeight:700,color:'#059669',borderRight:'1px solid #f1f5f9'}}>{ch.montantVente?`${(ch.montantVente/1000).toFixed(0)}k€`:'—'}</td>
                      <td style={{padding:'6px 10px',fontSize:'0.78rem',color:$textSec,borderRight:'1px solid #f1f5f9'}}>{ch.dateDebut||'—'}</td>
                      <td style={{padding:'6px 10px',fontSize:'0.78rem',color:$textSec}}>{ch.dateFin||'—'}</td>
                    </tr>;})}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ═══ CLIENTS ═══ */}
            {drTab === 'clients' && <div>
              <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Clients ({allClients.length})</div>
              <div style={{border:'1px solid #e2e8f0'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.85rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['Client','Chantiers','CA total','Dernier chantier'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.72rem',textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>{allClients.map((client,idx)=>{
                    const chs = allChantiers.filter(c=>c.client===client);
                    const ca = chs.reduce((s,c)=>s+(c.montantVente||0),0);
                    const last = chs.sort((a,b)=>new Date(b.dateDebut||0)-new Date(a.dateDebut||0))[0];
                    return <tr key={client} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc'}}>
                      <td style={{padding:'8px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{client}</td>
                      <td style={{padding:'8px 10px',textAlign:'center',fontWeight:700,color:'#6366f1',borderRight:'1px solid #f1f5f9'}}>{chs.length}</td>
                      <td style={{padding:'8px 10px',textAlign:'right',fontWeight:700,color:'#059669',borderRight:'1px solid #f1f5f9'}}>{ca>0?`${(ca/1000).toFixed(0)}k€`:'—'}</td>
                      <td style={{padding:'8px 10px',fontSize:'0.8rem',color:$textSec}}>{last?last.nom:'—'}</td>
                    </tr>;})}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ═══ PRESTATAIRES ═══ */}
            {drTab === 'prestataires' && <div>
              <div style={{fontSize:'0.8rem',fontWeight:800,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,paddingBottom:4,borderBottom:'2px solid #0f172a'}}>Prestataires & Fournisseurs</div>
              <div style={{background:'#faf5ff',padding:'14px 18px',borderLeft:'3px solid #8b5cf6',marginBottom:12}}>
                <div style={{fontSize:'0.82rem',color:'#581c87'}}>Les prestataires sont gérés dans les modules <strong>Catalogue Prestataires</strong> et <strong>Suivi Prestataires</strong> (Achats & Prestataires). Ici vous retrouvez un résumé consolidé.</div>
              </div>
              <div style={{border:'1px solid #e2e8f0'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.85rem'}}>
                  <thead><tr style={{background:'#f8fafc'}}>
                    {['Prestataire','Type','Chantiers liés','Contact'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.72rem',textTransform:'uppercase'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                  </tr></thead>
                  <tbody>
                    {['Garage Kuhn','Carglass','Peugeot Molsheim','Dekra Mutzig','Euromaster','LOXAM','LEASEPLAN','France Cars'].map((p,idx)=>
                      <tr key={p} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc'}}>
                        <td style={{padding:'8px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{p}</td>
                        <td style={{padding:'8px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={['Garage','Garage','Concessionnaire','Contrôle technique','Pneus','Location matériel','Leasing','Location véhicule'][idx]} color={['#ea580c','#ea580c','#2563eb','#16a34a','#6366f1','#dc2626','#0284c7','#334155'][idx]}/></td>
                        <td style={{padding:'8px 10px',textAlign:'center',borderRight:'1px solid #f1f5f9'}}>—</td>
                        <td style={{padding:'8px 10px',fontSize:'0.8rem',color:$textSec}}>—</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>}

            </div>{/* end minHeight wrapper */}
          </div>
        );
}
