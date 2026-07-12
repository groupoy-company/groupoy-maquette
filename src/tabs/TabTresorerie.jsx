// === Onglet « tresorerie » — extrait de App.jsx (modularisation, forme iife) ===
import { Area, Line } from 'recharts';

export default function TabTresorerie(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, crmRd, setTresoFiliale, setTresoTab, tresoFiliale, tresoTab } = __props;
        const fmt = v => { if (v == null || isNaN(v)) return '—'; return v >= 1000000 ? `${(v/1000000).toFixed(2)}M€` : v <= -1000000 ? `${(v/1000000).toFixed(2)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : v <= -1000 ? `${Math.round(v/1000)}k€` : `${Math.round(v)}€`; };
        const TRESO_FILIALES = [{id:'all',label:'Consolidé Group OY'},{id:'yilmaz',label:'Yilmaz SAS'},{id:'ezel',label:'Ezel Bâtiment'},{id:'echafaudage',label:"L'Échafaudage"},{id:'roulotte',label:'La Roulotte'}];
        const moisN = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
        const moisActuel = new Date().getMonth();

        // Sample treasury data per filiale
        const tresoDataAll = {
          yilmaz: {
            soldeBancaire: 185000, decouvert: -50000,
            encaissements: {
              factures_clients: [120000,135000,140000,125000,150000,160000,145000,130000,155000,170000,140000,180000],
              refacturations: [18000,18000,22000,20000,24000,22000,20000,18000,22000,25000,20000,28000],
              subventions: [0,0,15000,0,0,0,0,0,10000,0,0,0],
              autres_encaiss: [2000,1500,3000,2500,2000,1800,2200,1600,2400,3000,2000,4000],
            },
            decaissements: {
              fournisseurs: [45000,48000,52000,46000,55000,50000,48000,44000,52000,58000,46000,60000],
              salaires: [62000,62000,65000,63000,66000,64000,63000,62000,65000,68000,64000,70000],
              charges_sociales: [28000,28000,30000,29000,30000,29000,29000,28000,30000,31000,29000,32000],
              loyers: [8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500],
              assurances: [4200,4200,4200,4200,4200,4200,4200,4200,4200,4200,4200,4200],
              impots_taxes: [0,0,12000,0,0,15000,0,0,12000,0,0,18000],
              investissements: [0,5000,0,0,8000,0,0,0,15000,0,0,0],
              remboursements_emprunt: [6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500],
              autres_decaiss: [3200,2800,4000,3500,3800,3200,2900,3100,4200,3800,3200,5000],
            }
          },
          ezel: {
            soldeBancaire: 92000, decouvert: -30000,
            encaissements: {
              factures_clients: [85000,90000,95000,88000,100000,105000,98000,92000,102000,110000,95000,120000],
              refacturations: [0,0,0,0,0,0,0,0,0,0,0,0],
              subventions: [0,0,0,0,0,0,0,0,5000,0,0,0],
              autres_encaiss: [1000,800,1200,1000,1500,1200,1000,800,1200,1500,1000,2000],
            },
            decaissements: {
              fournisseurs: [32000,35000,38000,33000,40000,36000,34000,32000,38000,42000,34000,44000],
              salaires: [38000,38000,40000,39000,42000,40000,39000,38000,40000,42000,39000,44000],
              charges_sociales: [17000,17000,18000,17500,19000,18000,17500,17000,18000,19000,17500,20000],
              loyers: [5500,5500,5500,5500,5500,5500,5500,5500,5500,5500,5500,5500],
              assurances: [3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200],
              impots_taxes: [0,0,8000,0,0,10000,0,0,8000,0,0,12000],
              investissements: [0,0,0,0,12000,0,0,0,0,0,0,0],
              remboursements_emprunt: [4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500],
              autres_decaiss: [2000,1800,2500,2200,2400,2000,1800,2000,2800,2400,2000,3200],
            }
          },
          echafaudage: {
            soldeBancaire: 38000, decouvert: -20000,
            encaissements: {
              factures_clients: [42000,45000,48000,44000,52000,55000,50000,46000,53000,58000,48000,62000],
              refacturations: [0,0,0,0,0,0,0,0,0,0,0,0],
              subventions: [0,0,0,0,0,0,0,0,0,0,0,0],
              autres_encaiss: [500,400,600,500,800,600,500,400,600,800,500,1000],
            },
            decaissements: {
              fournisseurs: [15000,16000,18000,15500,20000,18000,16000,15000,18000,20000,16000,22000],
              salaires: [18000,18000,19000,18500,20000,19000,18500,18000,19000,20000,18500,21000],
              charges_sociales: [8100,8100,8600,8300,9000,8600,8300,8100,8600,9000,8300,9500],
              loyers: [3800,3800,3800,3800,3800,3800,3800,3800,3800,3800,3800,3800],
              assurances: [2800,2800,2800,2800,2800,2800,2800,2800,2800,2800,2800,2800],
              impots_taxes: [0,0,4000,0,0,5000,0,0,4000,0,0,6000],
              investissements: [0,0,0,25000,0,0,0,0,0,0,0,0],
              remboursements_emprunt: [3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200],
              autres_decaiss: [1200,1000,1500,1300,1400,1200,1000,1100,1600,1400,1200,1800],
            }
          },
          roulotte: {
            soldeBancaire: 28000, decouvert: -15000,
            encaissements: {
              factures_clients: [22000,24000,26000,23000,28000,30000,27000,24000,28000,32000,26000,35000],
              refacturations: [0,0,0,0,0,0,0,0,0,0,0,0],
              subventions: [0,0,0,0,0,0,0,0,0,0,0,0],
              autres_encaiss: [300,200,400,300,500,400,300,200,400,500,300,600],
            },
            decaissements: {
              fournisseurs: [8000,8500,9500,8200,10000,9000,8500,8000,9500,10500,8500,11000],
              salaires: [9500,9500,10000,9800,10500,10000,9800,9500,10000,10500,9800,11000],
              charges_sociales: [4300,4300,4500,4400,4700,4500,4400,4300,4500,4700,4400,5000],
              loyers: [2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200],
              assurances: [1800,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800],
              impots_taxes: [0,0,3000,0,0,3500,0,0,3000,0,0,4000],
              investissements: [0,0,0,0,0,18000,0,0,0,0,0,0],
              remboursements_emprunt: [2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100,2100],
              autres_decaiss: [800,700,1000,900,1000,800,700,800,1100,900,800,1200],
            }
          }
        };

        // Compute data for selected filiale
        const filiales = tresoFiliale === 'all' ? ['yilmaz','ezel','echafaudage','roulotte'] : [tresoFiliale];
        const soldeBancaireTotal = filiales.reduce((s,f) => s + (tresoDataAll[f]?.soldeBancaire||0), 0);
        const decouvertTotal = filiales.reduce((s,f) => s + (tresoDataAll[f]?.decouvert||0), 0);

        const sumCat = (type, cat, mois) => filiales.reduce((s,f) => s + ((tresoDataAll[f]?.[type]?.[cat]||[])[mois]||0), 0);
        const encCats = [{id:'factures_clients',label:'Factures clients',icon:'▫'},{id:'refacturations',label:'Refacturations internes',icon:'↻'},{id:'subventions',label:'Subventions & aides',icon:'◆'},{id:'autres_encaiss',label:'Autres encaissements',icon:'💎'}];
        const decCats = [{id:'fournisseurs',label:'Fournisseurs & matériaux',icon:'🧱'},{id:'salaires',label:'Salaires nets',icon:'◉'},{id:'charges_sociales',label:'Charges sociales',icon:'▦'},{id:'loyers',label:'Loyers & charges',icon:'▪'},{id:'assurances',label:'Assurances',icon:'🛡️'},{id:'impots_taxes',label:'Impôts & taxes',icon:'🏦'},{id:'investissements',label:'Investissements',icon:'€'},{id:'remboursements_emprunt',label:'Remb. emprunts',icon:'📉'},{id:'autres_decaiss',label:'Autres décaissements',icon:'☰'}];

        const totalEnc = (m) => encCats.reduce((s,c) => s + sumCat('encaissements',c.id,m), 0);
        const totalDec = (m) => decCats.reduce((s,c) => s + sumCat('decaissements',c.id,m), 0);
        const soldeNet = (m) => totalEnc(m) - totalDec(m);

        // Running balance
        const soldesCumul = [];
        let runSolde = soldeBancaireTotal;
        for(let i=0;i<12;i++) { runSolde += soldeNet(i); soldesCumul.push(runSolde); }

        // KPI
        const encMois = totalEnc(moisActuel);
        const decMois = totalDec(moisActuel);
        const soldeFin = soldesCumul[moisActuel];
        const solde3m = soldesCumul[Math.min(moisActuel+2, 11)];
        const seuilAlerte = tresoFiliale === 'all' ? 100000 : 30000;
        const tresoAlertes = [];
        soldesCumul.forEach((s,i) => { if(i >= moisActuel && s < seuilAlerte) tresoAlertes.push({mois:moisN[i], solde:s, type: s < 0 ? 'danger' : 'warning'}); });

        return (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
              <div>
                <h1 style={{fontSize:'1.5rem',fontWeight:700,letterSpacing:'-0.03em',margin:0,color:$text}}>€ Plan de Trésorerie</h1>
                <div style={{fontSize:'0.8rem', color:$textMut}}>Suivi cash-flow et projections — {new Date().getFullYear()}</div>
              </div>
              <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                <select value={tresoFiliale} onChange={e => setTresoFiliale(e.target.value)} style={{padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$borderAlt}`, fontSize:'0.88rem', fontWeight:600}}>
                  {TRESO_FILIALES.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
            </div>

                        {/* KPI Cards */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:18}}>
              {[
                {label:'Solde bancaire actuel', value:soldeBancaireTotal, sub:'Début de période', color:'#5a8a48', bg:'linear-gradient(145deg, #fafcfa, #f2f8f0)', border:'#d8e8d2'},
                {label:'Encaissements ' + moisN[moisActuel], value:encMois, sub:fmt(encMois - totalEnc(Math.max(0,moisActuel-1))) + ' vs mois préc.', color:'#3a6a2a', bg:'linear-gradient(145deg, #f5faf2, #eaf5e4)', border:'#c8e0c0'},
                {label:'Décaissements ' + moisN[moisActuel], value:decMois, sub: Math.round(decMois/encMois*100) + '% des encaissements', color:'#8a6040', bg:'linear-gradient(145deg, #fcfaf8, #f8f2ec)', border:'#e8d8c8'},
                {label:'Projection fin ' + moisN[Math.min(moisActuel+2,11)], value:solde3m, sub: solde3m < seuilAlerte ? '▲ Sous le seuil d\'alerte' : '✓ Au-dessus du seuil', color: solde3m < seuilAlerte ? '#c04030' : '#5a8a48', bg: solde3m < seuilAlerte ? 'linear-gradient(145deg, #fef8f8, #fdf2f0)' : 'linear-gradient(145deg, #fafcfa, #f2f8f0)', border: solde3m < seuilAlerte ? '#e8c8c8' : '#d8e8d2'},
              ].map((k,i) => (
                <div key={i} style={{background:k.bg, borderRadius:crmRd, padding:'16px 18px', border:'1px solid '+k.border}}>
                  <div style={{fontSize:'0.72rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px'}}>{k.label}</div>
                  <div style={{fontSize:'1.5rem', fontWeight:800, color:k.color, marginTop:4}}>{fmt(k.value)}</div>
                  <div style={{fontSize:'0.7rem', color:'#8a8070', marginTop:4}}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{display:'flex', gap:6, marginBottom:14}}>
              {[{id:'tableau',label:'☰ Tableau mensuel'},{id:'graphiques',label:'↗ Graphiques'},{id:'alertes',label:'🚨 Alertes ('+tresoAlertes.length+')'}].map(t => (
                <button key={t.id} onClick={() => setTresoTab(t.id)} style={{padding:'6px 14px', borderRadius:crmRd, border: tresoTab===t.id ? '2px solid #8B6F47' : `1px solid ${$border}`, background: tresoTab===t.id ? '#faf6ef' : 'white', color: tresoTab===t.id ? '#8B6F47' : '#6b5d4d', fontWeight:700, fontSize:'0.85rem', cursor:'pointer'}}>{t.label}</button>
              ))}
            </div>

            {/* TAB: TABLEAU */}
            {tresoTab === 'tableau' && (
              <div style={{overflowX:'auto', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard}}>
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.78rem'}}>
                  <thead>
                    <tr style={{background:$bgSub}}>
                      <th style={{position:'relative',padding:'10px 14px', textAlign:'left', fontWeight:700, color:$accent, position:'sticky', left:0, background:$bgSub, zIndex:2, borderRight:`2px solid ${$borderAlt}`, minWidth:180}}>Catégorie<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      {moisN.map((m,i) => <th key={i} style={{position:'relative',padding:'8px 6px', textAlign:'right', fontWeight:700, color: i <= moisActuel ? '#2d2216' : '#c0b8a8', minWidth:70, background: i === moisActuel ? '#f5f0e8' : 'transparent'}}>{m}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                      <th style={{position:'relative',padding:'8px 10px', textAlign:'right', fontWeight:800, color:$accent, borderLeft:`2px solid ${$borderAlt}`, minWidth:80}}>TOTAL<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Solde initial */}
                    <tr style={{background:'#f0f7f0', fontWeight:700}}>
                      <td style={{padding:'8px 14px', position:'sticky', left:0, background:'#f0f7f0', zIndex:1, borderRight:`2px solid ${$borderAlt}`, color:'#3a6a2a'}}>€ Solde initial</td>
                      {moisN.map((m,i) => <td key={i} style={{padding:'6px', textAlign:'right', color:'#3a6a2a'}}>{fmt(i === 0 ? soldeBancaireTotal : soldesCumul[i-1])}</td>)}
                      <td style={{padding:'6px 10px', textAlign:'right', borderLeft:`2px solid ${$borderAlt}`}}></td>
                    </tr>
                    {/* Encaissements header */}
                    <tr style={{background:'#e8f5e2'}}>
                      <td colSpan={14} style={{padding:'8px 14px', fontWeight:800, color:'#2d5016', fontSize:'0.82rem'}}>↗ ENCAISSEMENTS</td>
                    </tr>
                    {encCats.map(c => (
                      <tr key={c.id} style={{borderBottom:`1px solid ${$border}`}}>
                        <td style={{padding:'6px 14px', position:'sticky', left:0, background:$bgCard, zIndex:1, borderRight:`2px solid ${$borderAlt}`}}><span style={{marginRight:4}}>{c.icon}</span>{c.label}</td>
                        {moisN.map((m,i) => { const v = sumCat('encaissements',c.id,i); return <td key={i} style={{padding:'5px 6px', textAlign:'right', color: v > 0 ? '#2d5016' : '#c0b8a8', opacity: i > moisActuel ? 0.5 : 1, background: i === moisActuel ? '#fafaf5' : 'transparent'}}>{v > 0 ? fmt(v) : '—'}</td>; })}
                        <td style={{padding:'5px 10px', textAlign:'right', fontWeight:700, color:'#3a6a2a', borderLeft:`2px solid ${$borderAlt}`}}>{fmt(Array.from({length:12},(_, i)=>sumCat('encaissements',c.id,i)).reduce((a,v)=>a+v,0))}</td>
                      </tr>
                    ))}
                    {/* Total encaissements */}
                    <tr style={{background:'#f0f7f0', fontWeight:700}}>
                      <td style={{padding:'8px 14px', position:'sticky', left:0, background:'#f0f7f0', zIndex:1, borderRight:`2px solid ${$borderAlt}`, color:'#2d5016'}}>TOTAL Encaissements</td>
                      {moisN.map((m,i) => <td key={i} style={{padding:'6px', textAlign:'right', color:'#2d5016'}}>{fmt(totalEnc(i))}</td>)}
                      <td style={{padding:'6px 10px', textAlign:'right', color:'#2d5016', borderLeft:`2px solid ${$borderAlt}`}}>{fmt(Array.from({length:12},(_,i)=>totalEnc(i)).reduce((a,v)=>a+v,0))}</td>
                    </tr>
                    {/* Décaissements header */}
                    <tr style={{background:'#f8f0e8'}}>
                      <td colSpan={14} style={{padding:'8px 14px', fontWeight:800, color:'#6a4a28', fontSize:'0.82rem'}}>📉 DÉCAISSEMENTS</td>
                    </tr>
                    {decCats.map(c => (
                      <tr key={c.id} style={{borderBottom:`1px solid ${$border}`}}>
                        <td style={{padding:'6px 14px', position:'sticky', left:0, background:$bgCard, zIndex:1, borderRight:`2px solid ${$borderAlt}`}}><span style={{marginRight:4}}>{c.icon}</span>{c.label}</td>
                        {moisN.map((m,i) => { const v = sumCat('decaissements',c.id,i); return <td key={i} style={{padding:'5px 6px', textAlign:'right', color: v > 0 ? '#6a4a28' : '#c0b8a8', opacity: i > moisActuel ? 0.5 : 1, background: i === moisActuel ? '#fafaf5' : 'transparent'}}>{v > 0 ? '-'+fmt(v) : '—'}</td>; })}
                        <td style={{padding:'5px 10px', textAlign:'right', fontWeight:700, color:'#8a6040', borderLeft:`2px solid ${$borderAlt}`}}>-{fmt(Array.from({length:12},(_,i)=>sumCat('decaissements',c.id,i)).reduce((a,v)=>a+v,0))}</td>
                      </tr>
                    ))}
                    {/* Total décaissements */}
                    <tr style={{background:'#faf2ea', fontWeight:700}}>
                      <td style={{padding:'8px 14px', position:'sticky', left:0, background:'#faf2ea', zIndex:1, borderRight:`2px solid ${$borderAlt}`, color:'#6a4a28'}}>TOTAL Décaissements</td>
                      {moisN.map((m,i) => <td key={i} style={{padding:'6px', textAlign:'right', color:'#6a4a28'}}>-{fmt(totalDec(i))}</td>)}
                      <td style={{padding:'6px 10px', textAlign:'right', color:'#6a4a28', borderLeft:`2px solid ${$borderAlt}`}}>-{fmt(Array.from({length:12},(_,i)=>totalDec(i)).reduce((a,v)=>a+v,0))}</td>
                    </tr>
                    {/* Solde net mensuel */}
                    <tr style={{background:$bgSub, fontWeight:800, borderTop:'2px solid #d4c5a9'}}>
                      <td style={{padding:'10px 14px', position:'sticky', left:0, background:$bgSub, zIndex:1, borderRight:`2px solid ${$borderAlt}`, color:$text, fontSize:'0.82rem'}}>⚡ Flux net mensuel</td>
                      {moisN.map((m,i) => { const v = soldeNet(i); return <td key={i} style={{padding:'6px', textAlign:'right', color: v >= 0 ? '#3a6a2a' : '#c04030', fontSize:'0.82rem'}}>{v >= 0 ? '+' : ''}{fmt(v)}</td>; })}
                      <td style={{padding:'6px 10px', textAlign:'right', borderLeft:`2px solid ${$borderAlt}`, color:$text}}>{fmt(Array.from({length:12},(_,i)=>soldeNet(i)).reduce((a,v)=>a+v,0))}</td>
                    </tr>
                    {/* Solde cumulé */}
                    <tr style={{background:'#eae4d8', fontWeight:800, borderTop:'2px solid #c0b098'}}>
                      <td style={{padding:'10px 14px', position:'sticky', left:0, background:'#eae4d8', zIndex:1, borderRight:`2px solid ${$borderAlt}`, color:$text, fontSize:'0.85rem'}}>🏦 Solde cumulé</td>
                      {soldesCumul.map((s,i) => <td key={i} style={{padding:'6px', textAlign:'right', color: s >= 0 ? '#2d5016' : '#c04030', fontSize:'0.82rem', fontWeight:800}}>{fmt(s)}</td>)}
                      <td style={{padding:'6px 10px', textAlign:'right', borderLeft:`2px solid ${$borderAlt}`}}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB: GRAPHIQUES */}
            {tresoTab === 'graphiques' && (() => {
              const maxEnc = Math.max(...Array.from({length:12},(_,i)=>totalEnc(i)));
              const maxDec = Math.max(...Array.from({length:12},(_,i)=>totalDec(i)));
              const maxBar = Math.max(maxEnc, maxDec);
              const maxSolde = Math.max(...soldesCumul);
              const minSolde = Math.min(...soldesCumul, 0);
              const rangeS = maxSolde - minSolde || 1;
              return (
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                  {/* Chart 1: Encaissements vs Décaissements */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Encaissements vs Décaissements</span></div>
                    <div style={{padding:'16px'}}>
                      <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                        {[0,1,2,3,4].map(i => { const y = 20 + i * 35; const val = Math.round(maxBar * (1 - i/4)); return <g key={i}><line x1="40" y1={y} x2="390" y2={y} stroke="#f5f0e8" strokeWidth="0.5"/><text x="36" y={y+3} textAnchor="end" fontSize="6.5" fill="#b0a08a">{(val/1000).toFixed(0)}k</text></g>; })}
                        {moisN.map((m,i) => {
                          const x = 50 + i * 28.5;
                          const hE = maxBar > 0 ? (totalEnc(i)/maxBar) * 140 : 0;
                          const hD = maxBar > 0 ? (totalDec(i)/maxBar) * 140 : 0;
                          const future = i > moisActuel;
                          return <g key={i} opacity={future ? 0.3 : 1}>
                            <rect x={x} y={160-hE} width="11" height={hE} rx="2" fill="#6b8a5e"/>
                            <rect x={x+13} y={160-hD} width="11" height={hD} rx="2" fill="#a08060"/>
                            <text x={x+12} y="172" textAnchor="middle" fontSize="6" fill="#b0a08a">{m}</text>
                          </g>;
                        })}
                        <rect x="50" y="4" width="8" height="8" rx="2" fill="#6b8a5e"/><text x="62" y="11" fontSize="6.5" fill="#6b5d4d">Encaiss.</text>
                        <rect x="110" y="4" width="8" height="8" rx="2" fill="#a08060"/><text x="122" y="11" fontSize="6.5" fill="#6b5d4d">Décaiss.</text>
                      </svg>
                    </div>
                  </div>

                  {/* Chart 2: Solde cumulé (courbe) */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Solde cumulé</span></div>
                    <div style={{padding:'16px'}}>
                      <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                        {[0,1,2,3,4].map(i => { const y = 20 + i * 35; const val = maxSolde - (rangeS * i / 4); return <g key={i}><line x1="45" y1={y} x2="390" y2={y} stroke="#f5f0e8" strokeWidth="0.5"/><text x="42" y={y+3} textAnchor="end" fontSize="6.5" fill="#b0a08a">{(val/1000).toFixed(0)}k</text></g>; })}
                        {/* Zero line */}
                        {minSolde < 0 && <line x1="45" y1={20 + (maxSolde/(rangeS)) * 140} x2="390" y2={20 + (maxSolde/(rangeS)) * 140} stroke="#c04030" strokeWidth="0.5" strokeDasharray="3,2"/>}
                        {/* Seuil alerte */}
                        {(() => { const yS = 20 + ((maxSolde - seuilAlerte) / rangeS) * 140; return yS > 15 && yS < 165 ? <><line x1="45" y1={yS} x2="390" y2={yS} stroke="#d4a030" strokeWidth="0.5" strokeDasharray="4,3"/><text x="392" y={yS+3} fontSize="5.5" fill="#d4a030">Seuil</text></> : null; })()}
                        {/* Area fill */}
                        <path d={`M ${soldesCumul.map((s,i) => `${55 + i * 29},${20 + ((maxSolde - s) / rangeS) * 140}`).join(' L ')} L ${55 + 11*29},160 L 55,160 Z`} fill="#e4eed8" opacity="0.4"/>
                        {/* Line */}
                        <polyline points={soldesCumul.map((s,i) => `${55 + i * 29},${20 + ((maxSolde - s) / rangeS) * 140}`).join(' ')} fill="none" stroke="#5a8a48" strokeWidth="2.5"/>
                        {/* Points */}
                        {soldesCumul.map((s,i) => {
                          const x = 55 + i * 29; const y = 20 + ((maxSolde - s) / rangeS) * 140;
                          return <g key={i} opacity={i > moisActuel ? 0.3 : 1}>
                            <circle cx={x} cy={y} r="3.5" fill="white" stroke={s >= seuilAlerte ? '#5a8a48' : s >= 0 ? '#d4a030' : '#c04030'} strokeWidth="2"/>
                            <text x={x} y={y-6} textAnchor="middle" fontSize="6" fill={s >= 0 ? '#2d5016' : '#c04030'} fontWeight="700">{(s/1000).toFixed(0)}k</text>
                          </g>;
                        })}
                        {moisN.map((m,i) => <text key={i} x={55 + i*29} y="172" textAnchor="middle" fontSize="6" fill="#b0a08a">{m}</text>)}
                      </svg>
                    </div>
                  </div>

                  {/* Chart 3: Flux net mensuel (barres +/-) */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Flux net mensuel</span></div>
                    <div style={{padding:'16px'}}>
                      <svg viewBox="0 0 400 180" style={{width:'100%'}}>
                        {(() => {
                          const vals = Array.from({length:12},(_,i) => soldeNet(i));
                          const maxV = Math.max(...vals.map(Math.abs), 1);
                          const zeroY = 90;
                          return <>
                            <line x1="45" y1={zeroY} x2="390" y2={zeroY} stroke="#d4d0c8" strokeWidth="1"/>
                            <text x="42" y={zeroY+3} textAnchor="end" fontSize="6.5" fill="#b0a08a">0</text>
                            {vals.map((v,i) => {
                              const x = 55 + i * 28;
                              const h = Math.abs(v) / maxV * 70;
                              const isPos = v >= 0;
                              return <g key={i} opacity={i > moisActuel ? 0.3 : 1}>
                                <rect x={x} y={isPos ? zeroY - h : zeroY} width="20" height={h} rx="3" fill={isPos ? '#6b8a5e' : '#a08060'}/>
                                <text x={x+10} y={isPos ? zeroY - h - 4 : zeroY + h + 9} textAnchor="middle" fontSize="6" fill={isPos ? '#3a6a2a' : '#8a5030'} fontWeight="600">{v >= 0 ? '+' : ''}{(v/1000).toFixed(0)}k</text>
                                <text x={x+10} y="172" textAnchor="middle" fontSize="6" fill="#b0a08a">{moisN[i]}</text>
                              </g>;
                            })}
                          </>;
                        })()}
                      </svg>
                    </div>
                  </div>

                  {/* Chart 4: Répartition décaissements */}
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                    <div style={{padding:'14px 20px', borderBottom:`1px solid ${$border}`}}><span style={{fontWeight:700, color:$text, fontSize:'0.88rem'}}>Répartition décaissements YTD</span></div>
                    <div style={{padding:'16px'}}>
                      {(() => {
                        const colors = ['#6b8a5e','#a08060','#8B6F47','#5a8a48','#c0a060','#6a4a28','#b0a08a','#3a5a28','#d4c5a9'];
                        const items = decCats.map((c,idx) => ({...c, total: Array.from({length:moisActuel+1},(_,i)=>sumCat('decaissements',c.id,i)).reduce((a,v)=>a+v,0), color:colors[idx%colors.length]})).sort((a,b)=>b.total-a.total);
                        const maxT = items[0]?.total || 1;
                        return items.map((it,i) => (
                          <div key={it.id} style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                            <span style={{fontSize:'0.75rem', minWidth:140, color:$textSec}}>{it.icon} {it.label}</span>
                            <div style={{flex:1, height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                              <div style={{width:(it.total/maxT*100)+'%', height:'100%', borderRadius:crmRd, background:`linear-gradient(90deg, ${it.color}, ${it.color}cc)`}}/>
                            </div>
                            <span style={{fontSize:'0.72rem', fontWeight:700, color:it.color, minWidth:55, textAlign:'right'}}>{fmt(it.total)}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB: ALERTES */}
            {tresoTab === 'alertes' && (
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                <div style={{padding:'14px 20px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`}}>
                  <div style={{fontWeight:700, color:$accent, marginBottom:8}}>✱ Seuil d'alerte de trésorerie</div>
                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                    <span style={{fontSize:'0.85rem', color:$textSec}}>Solde minimum :</span>
                    <span style={{fontWeight:800, color:'#c04030', fontSize:'1.1rem'}}>{fmt(seuilAlerte)}</span>
                    <span style={{fontSize:'0.75rem', color:$textMut}}>({tresoFiliale === 'all' ? 'consolidé' : 'par filiale'})</span>
                  </div>
                </div>
                {tresoAlertes.length === 0 ? (
                  <div style={{textAlign:'center', padding:40, color:'#5a8a48', fontSize:'0.95rem', fontWeight:600}}>✓ Aucune alerte — trésorerie au-dessus du seuil sur toute la période</div>
                ) : tresoAlertes.map((a,i) => (
                  <div key={i} style={{padding:'14px 20px', borderRadius:crmRd, background: a.type === 'danger' ? '#fef2f2' : '#fefce8', borderLeft: '4px solid ' + (a.type === 'danger' ? '#dc2626' : '#d97706')}}>
                    <div style={{fontWeight:700, color: a.type === 'danger' ? '#991b1b' : '#92400e', fontSize:'0.9rem'}}>{a.type === 'danger' ? '▲' : '●'} {a.mois} — Solde prévu : <span style={{fontWeight:800}}>{fmt(a.solde)}</span></div>
                    <div style={{fontSize:'0.78rem', color: a.type === 'danger' ? '#b91c1c' : '#a16207', marginTop:4}}>
                      {a.type === 'danger' ? 'Solde négatif ! Risque de découvert bancaire.' : 'Solde sous le seuil d\'alerte de ' + fmt(seuilAlerte)}
                      {' '}— Déficit de {fmt(seuilAlerte - a.solde)} par rapport au seuil.
                    </div>
                  </div>
                ))}
                <div style={{padding:'14px 20px', background:'#f0f2f7', borderRadius:crmRd, border:'1px solid #d5d8e8'}}>
                  <div style={{fontWeight:700, color:'#2a3a5a', marginBottom:8}}>✧ Recommandations</div>
                  <div style={{fontSize:'0.82rem', color:'#4a5a7a', lineHeight:1.6}}>
                    {tresoAlertes.length > 0 ? (
                      <>• Anticiper les périodes tendues en décalant certains paiements fournisseurs<br/>• Relancer les impayés clients avant les mois critiques<br/>• Négocier une ligne de crédit de trésorerie avec la banque<br/>• Étudier l'affacturage pour accélérer les encaissements</>
                    ) : (
                      <>• Placer l'excédent de trésorerie sur un DAT ou compte rémunéré<br/>• Profiter de la trésorerie positive pour négocier des escomptes fournisseurs<br/>• Anticiper les investissements prévus au plan stratégique</>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
}
