// === Onglet « parc_info » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabParcInfo(__props) {
  const { $bgCard, $border, $shadow, $shadowLg, $text, $textMut, $textSec, FILIALE_FILTER_OPTIONS, crmRd, empNom, employes, parcInfoData, parcInfoDetail, parcInfoEdit, parcInfoFilter, setParcInfoData, setParcInfoDetail, setParcInfoEdit, setParcInfoFilter } = __props;
        const savePI = d => { setParcInfoData(d); localStorage.setItem('ruches_parc_info', JSON.stringify(d)); };
        const PI_CATS = [{id:'telephone',label:'Téléphone',color:'#16a34a',icon:'📱'},{id:'portable',label:'PC Portable',color:'#2563eb',icon:'💻'},{id:'fixe',label:'PC Fixe',color:'#0891b2',icon:'▢'},{id:'ecran',label:'Écran',color:'#7c3aed',icon:'▢'},{id:'imprimante',label:'Imprimante',color:'#ea580c',icon:'🖨️'},{id:'tablette',label:'Tablette',color:'#db2777',icon:'📱'},{id:'accessoire',label:'Accessoire',color:$textSec,icon:'⌨️'},{id:'reseau',label:'Réseau / Box',color:'#0f766e',icon:'🌐'}];
        const PI_STATUTS = [{id:'actif',label:'Actif',color:'#16a34a'},{id:'stock',label:'En stock',color:'#ca8a04'},{id:'panne',label:'En panne',color:'#dc2626'},{id:'reforme',label:'Réformé',color:$textSec},{id:'perdu',label:'Perdu / Volé',color:'#be123c'}];
        const PI_ETATS = [{id:'neuf',label:'Neuf',color:'#16a34a'},{id:'bon',label:'Bon',color:'#0891b2'},{id:'usage',label:'Usagé',color:'#ea580c'},{id:'mauvais',label:'Mauvais',color:'#dc2626'}];

        const samplePI = [
          {id:'IT-001',nom:'iPhone 15 Pro',categorie:'telephone',marque:'Apple',modele:'iPhone 15 Pro 256Go',numSerie:'DNXQ4FHGP7',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2024-01-15',dateGarantie:'2026-01-15',etat:'bon',statut:'actif',cout:1299,notes:'Ozdogan — ligne 06.xx.xx.xx.xx'},
          {id:'IT-002',nom:'iPhone 15',categorie:'telephone',marque:'Apple',modele:'iPhone 15 128Go',numSerie:'FNWQ3GHKM2',filialeId:'yilmaz',affecteA:'EMP002',dateAchat:'2024-01-15',dateGarantie:'2026-01-15',etat:'bon',statut:'actif',cout:999,notes:'Ozlem'},
          {id:'IT-003',nom:'iPhone 13',categorie:'telephone',marque:'Apple',modele:'iPhone 13 128Go',numSerie:'',filialeId:3,affecteA:'EMP009',dateAchat:'2022-09-01',dateGarantie:'2024-09-01',etat:'usage',statut:'actif',cout:749,notes:'Sophie DOS SANTOS'},
          {id:'IT-004',nom:'Samsung Galaxy A54',categorie:'telephone',marque:'Samsung',modele:'Galaxy A54 5G',numSerie:'',filialeId:3,affecteA:'EMP018',dateAchat:'2023-06-01',dateGarantie:'2025-06-01',etat:'bon',statut:'actif',cout:449,notes:'Ali AZIYANE'},
          {id:'IT-005',nom:'Samsung Galaxy A34',categorie:'telephone',marque:'Samsung',modele:'Galaxy A34',numSerie:'',filialeId:2,affecteA:'EMP006',dateAchat:'2023-03-01',dateGarantie:'2025-03-01',etat:'bon',statut:'actif',cout:349,notes:'Loetitia'},
          {id:'IT-006',nom:'MacBook Pro 14"',categorie:'portable',marque:'Apple',modele:'MacBook Pro M3 14" 512Go',numSerie:'C02ZM1MDLVDL',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2024-03-01',dateGarantie:'2027-03-01',etat:'neuf',statut:'actif',cout:2399,notes:'Ozdogan — principal'},
          {id:'IT-007',nom:'MacBook Air 13"',categorie:'portable',marque:'Apple',modele:'MacBook Air M2 13" 256Go',numSerie:'C02YK2NDLVDM',filialeId:'yilmaz',affecteA:'EMP002',dateAchat:'2023-11-01',dateGarantie:'2025-11-01',etat:'bon',statut:'actif',cout:1299,notes:'Ozlem'},
          {id:'IT-008',nom:'Lenovo ThinkPad L14',categorie:'portable',marque:'Lenovo',modele:'ThinkPad L14 Gen4 i5/16Go',numSerie:'PF4GHKLM',filialeId:3,affecteA:'EMP009',dateAchat:'2023-06-01',dateGarantie:'2026-06-01',etat:'bon',statut:'actif',cout:899,notes:'Sophie'},
          {id:'IT-009',nom:'Lenovo ThinkPad L14',categorie:'portable',marque:'Lenovo',modele:'ThinkPad L14 Gen3 i5/8Go',numSerie:'PF3JKLNP',filialeId:3,affecteA:'EMP008',dateAchat:'2022-09-01',dateGarantie:'2025-09-01',etat:'usage',statut:'actif',cout:799,notes:'David LEMAIRE'},
          {id:'IT-010',nom:'Lenovo ThinkPad E14',categorie:'portable',marque:'Lenovo',modele:'ThinkPad E14 i5/8Go',numSerie:'',filialeId:3,affecteA:'EMP020',dateAchat:'2024-02-01',dateGarantie:'2027-02-01',etat:'bon',statut:'actif',cout:699,notes:'Priscillia BORDES'},
          {id:'IT-011',nom:'Dell 24" P2422H',categorie:'ecran',marque:'Dell',modele:'P2422H 24" FHD',numSerie:'',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2023-01-01',dateGarantie:'2026-01-01',etat:'bon',statut:'actif',cout:259,notes:'Bureau direction — écran 1'},
          {id:'IT-012',nom:'Dell 27" P2723QE',categorie:'ecran',marque:'Dell',modele:'P2723QE 27" 4K',numSerie:'',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2024-03-01',dateGarantie:'2027-03-01',etat:'neuf',statut:'actif',cout:429,notes:'Bureau direction — écran 2'},
          {id:'IT-013',nom:'HP LaserJet Pro M404dn',categorie:'imprimante',marque:'HP',modele:'LaserJet Pro M404dn',numSerie:'',filialeId:'yilmaz',affecteA:null,dateAchat:'2021-06-01',dateGarantie:'2024-06-01',etat:'usage',statut:'actif',cout:299,notes:'Imprimante partagée bureau Yilmaz'},
          {id:'IT-014',nom:'HP Color LaserJet Pro',categorie:'imprimante',marque:'HP',modele:'Color LaserJet Pro M255dw',numSerie:'',filialeId:3,affecteA:null,dateAchat:'2022-01-01',dateGarantie:'2025-01-01',etat:'bon',statut:'actif',cout:349,notes:'Imprimante bureau Ezel'},
          {id:'IT-015',nom:'Freebox Pro',categorie:'reseau',marque:'Free',modele:'Freebox Pro',numSerie:'',filialeId:'yilmaz',affecteA:null,dateAchat:'2022-06-01',dateGarantie:null,etat:'bon',statut:'actif',cout:0,notes:'Abonnement mensuel — bureau principal'},
          {id:'IT-016',nom:'iPad Air',categorie:'tablette',marque:'Apple',modele:'iPad Air M1 256Go',numSerie:'',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2023-09-01',dateGarantie:'2025-09-01',etat:'bon',statut:'actif',cout:799,notes:'Chantier inspections'},
          {id:'IT-017',nom:'Clavier + Souris Logitech',categorie:'accessoire',marque:'Logitech',modele:'MX Keys + MX Master 3S',numSerie:'',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2024-03-01',dateGarantie:'2026-03-01',etat:'neuf',statut:'actif',cout:199,notes:''},
          {id:'IT-018',nom:'Casque Jabra Evolve2 75',categorie:'accessoire',marque:'Jabra',modele:'Evolve2 75 UC',numSerie:'',filialeId:'yilmaz',affecteA:'EMP001',dateAchat:'2024-01-01',dateGarantie:'2026-01-01',etat:'bon',statut:'actif',cout:249,notes:'Visio / appels'}
        ];

        const data = parcInfoData.length > 0 ? parcInfoData : samplePI;
        const Tag = ({label,color,s}) => <span style={{display:'inline-block',padding:s?'1px 5px':'2px 8px',background:(color||'#64748b')+'12',color:color||'#64748b',fontWeight:700,fontSize:s?'0.7rem':'0.78rem',borderLeft:`2px solid ${color||'#64748b'}`}}>{label}</span>;
        const getLbl = (arr,id) => (arr.find(a=>a.id===id)||{}).label||id||'—';
        const getClr = (arr,id) => (arr.find(a=>a.id===id)||{}).color||'#64748b';
        const getIcon = (arr,id) => (arr.find(a=>a.id===id)||{}).icon||'';
        const daysDiff = d => { if(!d) return 999; return Math.ceil((new Date(d)-new Date())/(1000*3600*24)); };

        const actifs = data.filter(d=>d.statut==='actif');
        const totalCout = data.reduce((s,d)=>s+(d.cout||0),0);
        const garantieExp = actifs.filter(d=>d.dateGarantie && daysDiff(d.dateGarantie)<90 && daysDiff(d.dateGarantie)>0).length;
        const garantieDep = actifs.filter(d=>d.dateGarantie && daysDiff(d.dateGarantie)<0).length;
        const filtered = parcInfoFilter==='tous'?data:parcInfoFilter==='actif'?actifs:data.filter(d=>{const f=parcInfoFilter;if(f.startsWith('c_'))return d.categorie===f.slice(2);if(f.startsWith('f_')){const v=f.slice(2);return d.filialeId===v||(v!=='yilmaz'&&d.filialeId===parseInt(v));}return d.statut===f;});

        return (
          <div style={{padding:'20px 28px',fontFamily:'system-ui'}}>
            <div style={{borderBottom:'3px solid #7c3aed',paddingBottom:12,marginBottom:20}}>
              <div style={{fontSize:'0.7rem',fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.12em'}}>YILMAZ — IT / DIGITAL</div>
              <h2 style={{fontSize:'1.5rem',fontWeight:900,color:$text,margin:'2px 0 0'}}>Parc Informatique</h2>
              <div style={{fontSize:'0.85rem',color:$textSec,marginTop:2}}>{data.length} équipements · Valeur totale: {(totalCout/1000).toFixed(1)}k€</div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',gap:1,marginBottom:16,background:'#e2e8f0'}}>
              {[
                {l:'Équipements',v:data.length,c:'#7c3aed'},
                {l:'Actifs',v:actifs.length,c:'#16a34a'},
                {l:'Valeur totale',v:`${(totalCout/1000).toFixed(1)}k€`,c:'#0891b2'},
                {l:'Garantie < 90j',v:garantieExp,c:garantieExp>0?'#ea580c':'#16a34a'},
                {l:'Garantie expirée',v:garantieDep,c:garantieDep>0?'#dc2626':'#16a34a'},
              ].map((k,i)=><div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
              >
                <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                {k.ic&&<div style={{position:'absolute',top:10,right:14,fontSize:'1.2rem',opacity:0.1}}>{k.ic}</div>}
              </div>)}
            </div>

            {/* Répartition par catégorie */}
            <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}>
              {PI_CATS.map(cat=>{const n=actifs.filter(d=>d.categorie===cat.id).length;return n>0?<div key={cat.id} style={{padding:'4px 10px',background:cat.color+'10',borderLeft:`2px solid ${cat.color}`,fontSize:'0.78rem',fontWeight:700,color:cat.color}}>{cat.icon} {cat.label} {n}</div>:null;})}
            </div>

            <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'center',flexWrap:'wrap'}}>
              <select value={parcInfoFilter} onChange={e=>setParcInfoFilter(e.target.value)} style={{padding:'6px 12px',border:'1px solid #cbd5e1',fontSize:'0.85rem',fontWeight:600}}>
                <option value="tous">Tous ({data.length})</option>
                <option value="actif">Actifs ({actifs.length})</option>
                <optgroup label="Catégorie">{PI_CATS.map(c=><option key={c.id} value={'c_'+c.id}>{c.icon} {c.label}</option>)}</optgroup>
                <optgroup label="Statut">{PI_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>
              </select>
              <button onClick={()=>setParcInfoEdit({id:'IT-'+String(data.length+1).padStart(3,'0'),nom:'',categorie:'portable',marque:'',modele:'',numSerie:'',filialeId:'yilmaz',affecteA:null,dateAchat:new Date().toISOString().slice(0,10),dateGarantie:'',etat:'neuf',statut:'actif',cout:0,notes:''})} style={{padding:'6px 16px',border:'2px solid #7c3aed',background:'#7c3aed',color:'white',fontWeight:700,fontSize:'0.82rem',cursor:'pointer'}}>+ ÉQUIPEMENT</button>
              <span style={{fontSize:'0.82rem',color:'#94a3b8',fontWeight:600}}>{filtered.length} résultats</span>
            </div>

            <div style={{border:'1px solid #e2e8f0',overflowX:'auto',minHeight:'50vh'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.85rem'}}>
                <thead><tr style={{background:'#f8fafc'}}>
                  {['ID','Équipement','Catégorie','Marque / Modèle','Affecté à','Filiale','État','Statut','Garantie','Coût'].map(h=><th key={h} style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:800,color:$text,borderBottom:'2px solid #0f172a',borderRight:'1px solid #e2e8f0',fontSize:'0.75rem',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                </tr></thead>
                <tbody>{filtered.map((item,idx)=>{
                  const gd = daysDiff(item.dateGarantie);
                  const fil = item.filialeId==='yilmaz'?{nom:'Yilmaz',icon:'◆',couleur:'#8B6F47'}:(FILIALE_FILTER_OPTIONS.find(f=>f.id===item.filialeId)||{});
                  return <tr key={item.id} onClick={()=>setParcInfoDetail(item)} style={{borderBottom:'1px solid #f1f5f9',background:idx%2===0?'#fff':'#fafbfc',cursor:'pointer',opacity:item.statut!=='actif'?0.5:1}} onMouseOver={e=>e.currentTarget.style.background='#faf5ff'} onMouseOut={e=>e.currentTarget.style.background=idx%2===0?'#fff':'#fafbfc'}>
                    <td style={{padding:'6px 10px',fontFamily:'monospace',fontWeight:700,color:'#7c3aed',fontSize:'0.78rem',borderRight:'1px solid #f1f5f9'}}>{item.id}</td>
                    <td style={{padding:'6px 10px',fontWeight:700,borderRight:'1px solid #f1f5f9'}}>{item.nom}</td>
                    <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={`${getIcon(PI_CATS,item.categorie)} ${getLbl(PI_CATS,item.categorie)}`} color={getClr(PI_CATS,item.categorie)} s/></td>
                    <td style={{padding:'6px 10px',fontSize:'0.82rem',color:$text,borderRight:'1px solid #f1f5f9'}}>{item.marque} {item.modele}</td>
                    <td style={{padding:'6px 10px',fontSize:'0.82rem',borderRight:'1px solid #f1f5f9'}}>{item.affecteA?empNom(item.affecteA):<span style={{color:'#94a3b8'}}>Non affecté</span>}</td>
                    <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={`${fil.icon||''} ${fil.nom||'—'}`} color={fil.couleur||'#64748b'} s/></td>
                    <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={getLbl(PI_ETATS,item.etat)} color={getClr(PI_ETATS,item.etat)} s/></td>
                    <td style={{padding:'6px 10px',borderRight:'1px solid #f1f5f9'}}><Tag label={getLbl(PI_STATUTS,item.statut)} color={getClr(PI_STATUTS,item.statut)} s/></td>
                    <td style={{padding:'6px 10px',fontSize:'0.82rem',borderRight:'1px solid #f1f5f9'}}>{item.dateGarantie?<span style={{fontWeight:700,color:gd<0?'#dc2626':gd<90?'#ea580c':'#16a34a'}}>{item.dateGarantie}</span>:'—'}</td>
                    <td style={{padding:'6px 10px',textAlign:'right',fontWeight:700,color:'#0891b2'}}>{item.cout>0?`${item.cout}€`:'—'}</td>
                  </tr>;})}
                </tbody>
              </table>
            </div>

            {/* DETAIL MODAL */}
            {parcInfoDetail && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(15,23,42,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>{setParcInfoDetail(null);setParcInfoEdit(null);}}>
              <div style={{background:$bgCard,width:'95%',maxWidth:700,maxHeight:'90vh',overflow:'auto',boxShadow:'0 25px 50px rgba(0,0,0,0.25)'}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'16px 20px',borderBottom:'3px solid #7c3aed',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div><div style={{fontWeight:900,fontSize:'1.1rem',color:'#0f172a'}}>{parcInfoDetail.nom}</div><div style={{fontSize:'0.82rem',color:'#7c3aed',fontWeight:700,fontFamily:'monospace'}}>{parcInfoDetail.id} · {parcInfoDetail.marque} {parcInfoDetail.modele}</div></div>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>{setParcInfoEdit({...parcInfoDetail});setParcInfoDetail(null);}} style={{padding:'6px 14px',border:'2px solid #0f172a',background:$bgCard,color:'#0f172a',fontWeight:700,fontSize:'0.78rem',cursor:'pointer'}}>MODIFIER</button>
                    <button onClick={()=>{setParcInfoDetail(null);setParcInfoEdit(null);}} style={{background:'none',border:'none',fontSize:'1.2rem',cursor:'pointer',color:'#94a3b8'}}>✕</button>
                  </div>
                </div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'#e2e8f0'}}>
                  {[{l:'Catégorie',v:`${getIcon(PI_CATS,parcInfoDetail.categorie)} ${getLbl(PI_CATS,parcInfoDetail.categorie)}`},{l:'Marque',v:parcInfoDetail.marque},{l:'Modèle',v:parcInfoDetail.modele},{l:'N° Série',v:parcInfoDetail.numSerie||'—'},{l:'État',v:getLbl(PI_ETATS,parcInfoDetail.etat)},{l:'Statut',v:getLbl(PI_STATUTS,parcInfoDetail.statut)},{l:'Affecté à',v:parcInfoDetail.affecteA?empNom(parcInfoDetail.affecteA):'Non affecté'},{l:'Filiale',v:parcInfoDetail.filialeId==='yilmaz'?'Yilmaz':(FILIALE_FILTER_OPTIONS.find(f=>f.id===parcInfoDetail.filialeId)||{}).nom||'—'},{l:'Date achat',v:parcInfoDetail.dateAchat||'—'},{l:'Garantie',v:parcInfoDetail.dateGarantie||'—'},{l:'Coût',v:parcInfoDetail.cout>0?`${parcInfoDetail.cout}€`:'—'}].map((f,i)=><div key={i} style={{background:'#fff',padding:'8px 12px'}}><div style={{fontSize:'0.7rem',fontWeight:700,color:'#94a3b8',textTransform:'uppercase'}}>{f.l}</div><div style={{fontSize:'0.88rem',fontWeight:700,color:$text}}>{f.v}</div></div>)}
                </div>
                {parcInfoDetail.notes&&<div style={{padding:'12px 20px',fontSize:'0.85rem',color:$text,background:'#f8fafc',borderLeft:'3px solid #7c3aed',margin:'16px 20px'}}>{parcInfoDetail.notes}</div>}
              </div>
            </div>}

            {/* EDIT/CREATE MODAL */}
            {parcInfoEdit && !parcInfoDetail && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(15,23,42,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setParcInfoEdit(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:700,maxHeight:'90vh',overflow:'auto',boxShadow:'0 25px 50px rgba(0,0,0,0.25)'}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'16px 20px',borderBottom:'3px solid #7c3aed',fontWeight:900}}>NOUVEL ÉQUIPEMENT</div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                  {[{l:'Nom',k:'nom'},{l:'Catégorie',k:'categorie',t:'s',o:PI_CATS},{l:'Marque',k:'marque'},{l:'Modèle',k:'modele'},{l:'N° Série',k:'numSerie'},{l:'État',k:'etat',t:'s',o:PI_ETATS},{l:'Statut',k:'statut',t:'s',o:PI_STATUTS},{l:'Date achat',k:'dateAchat',t:'d'},{l:'Fin garantie',k:'dateGarantie',t:'d'},{l:'Coût (€)',k:'cout',t:'n'}].map((f,i)=><div key={i}>
                    <label style={{fontSize:'0.72rem',fontWeight:800,color:'#94a3b8',textTransform:'uppercase'}}>{f.l}</label>
                    {f.t==='s'?<select value={parcInfoEdit[f.k]||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem'}}>{f.o.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select>:
                    f.t==='d'?<input type="date" value={parcInfoEdit[f.k]||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem',boxSizing:'border-box'}}/>:
                    f.t==='n'?<input type="number" value={parcInfoEdit[f.k]??''} onChange={e=>setParcInfoEdit({...parcInfoEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem',boxSizing:'border-box'}}/>:
                    <input value={parcInfoEdit[f.k]||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem',boxSizing:'border-box'}}/>}
                  </div>)}
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:'#94a3b8',textTransform:'uppercase'}}>Filiale</label><select value={parcInfoEdit.filialeId||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,filialeId:isNaN(e.target.value)?e.target.value:parseInt(e.target.value)})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem'}}><option value="yilmaz">◆ Yilmaz</option>{FILIALE_FILTER_OPTIONS.map(f=><option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}</select></div>
                  <div><label style={{fontSize:'0.72rem',fontWeight:800,color:'#94a3b8',textTransform:'uppercase'}}>Affecté à</label><select value={parcInfoEdit.affecteA||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,affecteA:e.target.value||null})} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem'}}><option value="">— Non affecté —</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>)}</select></div>
                  <div style={{gridColumn:'span 3'}}><label style={{fontSize:'0.72rem',fontWeight:800,color:'#94a3b8',textTransform:'uppercase'}}>Notes</label><textarea value={parcInfoEdit.notes||''} onChange={e=>setParcInfoEdit({...parcInfoEdit,notes:e.target.value})} rows={2} style={{width:'100%',padding:'6px 8px',border:'1px solid #cbd5e1',fontSize:'0.88rem',resize:'vertical',boxSizing:'border-box'}}/></div>
                </div>
                <div style={{padding:'12px 20px',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'flex-end',gap:8}}>
                  <button onClick={()=>setParcInfoEdit(null)} style={{padding:'6px 16px',border:'1px solid #cbd5e1',background:$bgCard,fontWeight:600,cursor:'pointer'}}>ANNULER</button>
                  <button onClick={()=>{const exists=data.find(d=>d.id===parcInfoEdit.id);if(exists){savePI(data.map(d=>d.id===parcInfoEdit.id?parcInfoEdit:d));}else{savePI([...data,parcInfoEdit]);}setParcInfoEdit(null);}} style={{padding:'6px 16px',border:'none',background:'#7c3aed',color:'white',fontWeight:700,cursor:'pointer'}}>ENREGISTRER</button>
                </div>
              </div>
            </div>}

          </div>
        );
}
