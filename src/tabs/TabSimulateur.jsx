// === Onglet « simulateur » — extrait de App.jsx (modularisation, forme iife) ===
import { Award, DollarSign, TrendingUp } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TabSimulateur(__props) {
  const { $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $success, $text, $textMut, $textSec, $warn, achatsST, amortissements, baremeRelatif, baseVariable, ca, coeffResult, coefficient, collaborateurs, crmRd, data, ebePercent, ebeValeur, ecartEBE, filNom, filialeData, filialeSelectionnee, filiales, formatEuro, formatPercent, fraisGroupOY, fraisHolding, fraisInternes, fraisInternesPercent, fraisYilmaz, getCoefficient, grille, impots, margeBrute, margeBrutePercent, niveau, niveauSelectionne, remunerationAvantPlafond, remunerationTotale, resultatExploitation, resultatNet, resultatNetPercent, setCa, setCollabSelectionne, setFilialeSelectionnee, setFraisInternes, setNiveauSelectionne, setOngletActif, setSimCompare, setSimPrintSel, setSimScenarioNom, setSimScenarios, setSimTab, setSousTraitance, setTauxAmortissements, setTauxFraisGroupOY, setTauxFraisHolding, setTauxFraisYilmaz, simCompare, simPrintSel, simScenarioNom, simScenarios, simTab, sousTraitance, tauxAmortissements, tauxFraisGroupOY, tauxFraisHolding, tauxFraisYilmaz, tauxImpots, totalFraisStructure, variableAjustee, variableModulee } = __props;
          const filialeColor = {'ezel':'#007ab5','echafaudage':'#6C3483','roulotte':'#C49A2A','etancheite':'#0e6655'}[filialeSelectionnee]||$accent;
          // Classement: tous les collaborateurs avec calculs
          const collabsAvecCalc = collaborateurs.filter(c=>c.niveau&&filiales[filialeSelectionnee]?.grille.find(g=>g.niveau===c.niveau)).map(c=>{
            const niv=grille.find(g=>g.niveau===c.niveau); if(!niv)return null;
            const base=c.caRealise*0.01; const coeffR=getCoefficient(c.ebeRealise,niv.ebeCible); const varMod=base*coeffR.coeff;
            const rem=Math.min(niv.fixe+niv.prime+varMod,niv.plafond);
            return {...c,niv,rem,coeffR,ebePercent:c.ebeRealise,scorePct:Math.round(c.ebeRealise/niv.ebeCible*100)};
          }).filter(Boolean);
          const allCollabsCalc = collaborateurs.filter(c=>c.niveau).map(c=>{
            const fd=Object.values(filiales).find(f=>f.grille.find(g=>g.niveau===c.niveau));
            if(!fd)return null; const niv=fd.grille.find(g=>g.niveau===c.niveau);
            const base=c.caRealise*0.01; const coeffR=getCoefficient(c.ebeRealise,niv.ebeCible); const varMod=base*coeffR.coeff;
            const rem=Math.min(niv.fixe+niv.prime+varMod,niv.plafond);
            return {...c,niv,rem,coeffR,filNom:fd.nom};
          }).filter(Boolean).sort((a,b)=>b.rem-a.rem);
          const masseSalTotale=allCollabsCalc.reduce((s,c)=>s+c.rem,0);
          const caTotal=allCollabsCalc.reduce((s,c)=>s+c.caRealise,0);
          // Graphique data — 8 points simulés
          const graphData = grille.map(g=>({
            niveau:g.niveau,
            caCible:Math.round((g.caMin+g.caMax)/2),
            remMax:g.plafond,
            remMin:g.fixe+g.prime,
            ebeCible:Math.round(g.ebeCible*100),
            fixe:g.fixe,
            prime:g.prime,
            variable:Math.round(g.plafond-g.fixe-g.prime),
          }));
          const bilanData=[
            {name:'CA',val:ca,color:'#007ab5'},
            {name:'Achats & ST',val:-achatsST,color:'#dc2626'},
            {name:'Marge Brute',val:margeBrute,color:'#10b981'},
            {name:'Frais',val:-(fraisInternes+totalFraisStructure),color:'#f59e0b'},
            {name:'EBE',val:ebeValeur,color:'#8b5cf6'},
            {name:'Résultat Net',val:resultatNet,color:resultatNet>=0?'#059669':'#dc2626'},
          ];
          const saveScenario=()=>{
            const nom=simScenarioNom.trim()||`Scénario ${simScenarios.length+1}`;
            const sc={id:Date.now(),nom,date:new Date().toISOString().slice(0,10),filiale:filialeSelectionnee,filialeName:filialeData.nom.split(' (')[0],niveau:niveauSelectionne,ca,sousTraitance,fraisInternes,tauxAmortissements,tauxFraisYilmaz,tauxFraisHolding,tauxFraisGroupOY,
              ebePercent,ebeValeur,margeBrute,remunerationTotale,resultatNet,coefficient};
            setSimScenarios(prev=>[...prev,sc]);
            setSimScenarioNom('');
          };
          const nivColor=(n)=>({XXS:'#94a3b8',XS:'#64748b',S:'#22c55e',M:'#10b981',L:'#f59e0b',XL:'#f97316',XXL:'#ef4444',XXXL:'#7c3aed'})[n]||$accent;
          const simAlertes=[];
          collaborateurs.forEach(c=>{
            if(c.contratFin&&new Date(c.contratFin)<new Date(Date.now()+60*24*3600000))simAlertes.push({type:'contrat',nom:c.nom||c.prenom,msg:"Contrat expire le "+c.contratFin});
            if(c.habilitations)c.habilitations.forEach(h=>{if(h.expiry&&new Date(h.expiry)<new Date(Date.now()+90*24*3600000))simAlertes.push({type:'habilitation',nom:c.nom||c.prenom,msg:"Habilitation "+h.type+" expire le "+h.expiry});});
          });
          return (
          <>
          {/* Header */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,paddingBottom:16,borderBottom:`1px solid ${$border}`}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:crmRd,background:filialeColor+'15',border:`1px solid ${filialeColor}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem'}}>🐝</div>
              <div>
                <div style={{fontSize:'1.2rem',fontWeight:800,color:$text,letterSpacing:'-0.02em'}}>Simulateur Ruches</div>
                <div style={{fontSize:'0.75rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600}}>Modélisation rémunération & performance</div>
              </div>
            </div>
            <div style={{display:'flex',gap:6}}>
              {simScenarios.length>0&&<span style={{fontSize:'0.72rem',background:$accent+'15',color:$accent,fontWeight:700,padding:'4px 10px',borderRadius:crmRd>0?20:2,display:'flex',alignItems:'center',gap:4}}>📊 {simScenarios.length} scénario{simScenarios.length>1?'s':''}</span>}
              <button onClick={()=>setSimTab('export')} style={{padding:'6px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontSize:'0.75rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:5}}>📄 Export</button>
            </div>
          </div>
          {/* Tabs */}
          <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,marginBottom:20,width:'fit-content'}}>
            {[{id:'simulateur',l:'🐝 Simulateur'},{id:'graphiques',l:'📈 Graphiques'},{id:'classement',l:'🏆 Classement'},{id:'export',l:'📄 Export'}].map(t=>(
              <button key={t.id} onClick={()=>setSimTab(t.id)} style={{padding:'7px 16px',borderRadius:Math.max(crmRd-2,0),border:'none',background:simTab===t.id?$selBg:'transparent',color:simTab===t.id?$selText:$textMut,fontWeight:simTab===t.id?700:400,fontSize:'0.8rem',transition:'all 0.15s',fontFamily:'inherit',cursor:'pointer',whiteSpace:'nowrap'}}>{t.l}</button>
            ))}
          </div>

          {/* ═══ TAB: SIMULATEUR ═══ */}
          {simTab==='simulateur'&&(<>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28}}>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}>
                <h2 style={{fontSize:'1.3rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><Award style={{width:24, height:24}} />Paramètres</h2>
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🏢 Filiale</label><select value={filialeSelectionnee} onChange={(e) => { setFilialeSelectionnee(e.target.value); const nData = filiales[e.target.value]; if(nData) { const g0 = nData.grille[0]; setNiveauSelectionne(g0.niveau); setCa(g0.caMin); } }} style={{width:"100%",padding:"12px",border:`1.5px solid ${$border}`,borderRadius:crmRd,outline:"none",background:$bgCard,color:$text,fontFamily:"inherit",fontSize:"0.92rem"}}><option value="ezel">🏗️ Ezel Bâtiment</option><option value="echafaudage">⚙️ L'Échafaudage</option><option value="roulotte">🚛 La Roulotte</option><option value="etancheite">💧 L'Étanchéité</option></select><div style={{display:'flex',gap:6,marginTop:6}}>{Object.entries(filiales).map(([k,v])=><span key={k} onClick={()=>{setFilialeSelectionnee(k);const g0=v.grille[0];setNiveauSelectionne(g0.niveau);setCa(g0.caMin);}} style={{padding:'3px 8px',borderRadius:crmRd>0?20:2,fontSize:'0.68rem',fontWeight:filialeSelectionnee===k?700:400,cursor:'pointer',background:filialeSelectionnee===k?({'ezel':'#007ab5','echafaudage':'#6C3483','roulotte':'#C49A2A','etancheite':'#0e6655'}[k]||$accent)+'15':'transparent',color:filialeSelectionnee===k?({'ezel':'#007ab5','echafaudage':'#6C3483','roulotte':'#C49A2A','etancheite':'#0e6655'}[k]||$accent):$textMut,border:`1px solid ${filialeSelectionnee===k?({'ezel':'#007ab5','echafaudage':'#6C3483','roulotte':'#C49A2A','etancheite':'#0e6655'}[k]||$accent)+'40':$border}`,transition:'all 0.15s'}}>{v.icon} {k==='ezel'?'Ezel':k==='echafaudage'?'Échaf.':k==='roulotte'?'Roulotte':'Étanch.'}</span>)}</div></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>📊 Niveau</label><select value={niveauSelectionne} onChange={(e) => { const nouveauNiveau = e.target.value; const niveauData = grille.find(g => g.niveau === nouveauNiveau); setNiveauSelectionne(nouveauNiveau); setCa(niveauData.caMin); }} style={{width:"100%",padding:"12px",border:`1.5px solid ${$border}`,borderRadius:crmRd,outline:"none",background:$bgCard,color:$text,fontFamily:"inherit",fontSize:"0.92rem"}}>{grille.map(g => (<option key={g.niveau} value={g.niveau}>{g.niveau} - {g.nom} ({g.caCible})</option>))}</select></div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
                    <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🐝 Poste Interne (Ruches)</label><div style={{fontWeight:500,color:$accent}}>{niveau.posteInterne}</div></div>
                    <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>💼 Équivalent Externe</label><div style={{fontWeight:500,color:$info,fontSize:"0.85rem"}}>{niveau.posteExterne}</div></div>
                    <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🎯 EBE Cible pour ce niveau</label><div style={{fontWeight:700,color:$success,fontSize:"1.1rem"}}>{formatPercent(niveau.ebeCible)}</div></div>
                  </div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>💰 Chiffre d'affaires (CA)</label><div style={{display:'flex', gap:8}}><input type="text" value={ca.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} onChange={(e) => { const valeurSansEspaces = e.target.value.replace(/\s/g, ''); if (!isNaN(valeurSansEspaces) && valeurSansEspaces !== '') { setCa(Number(valeurSansEspaces)); } }} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setCa(ca + 100000)} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setCa(Math.max(0, ca - 100000))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatEuro(ca)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Fourchette : {formatEuro(niveau.caMin)} - {formatEuro(niveau.caMax)}</p></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>📦 Sous-traitance (% du CA)</label><div style={{display:'flex', gap:8}}><input type="number" value={Math.round(sousTraitance * 100 * 10) / 10} onChange={(e) => setSousTraitance(Number(e.target.value) / 100)} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="1" min="0" max="100" /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setSousTraitance(Math.min(1, sousTraitance + 0.01))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setSousTraitance(Math.max(0, sousTraitance - 0.01))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatPercent(sousTraitance)} = {formatEuro(achatsST)}</p></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>👥 Frais internes</label><div style={{display:'flex', gap:8}}><input type="text" value={fraisInternes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} onChange={(e) => { const valeurSansEspaces = e.target.value.replace(/\s/g, ''); if (!isNaN(valeurSansEspaces) && valeurSansEspaces !== '') { setFraisInternes(Number(valeurSansEspaces)); } }} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setFraisInternes(fraisInternes + 10000)} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setFraisInternes(Math.max(0, fraisInternes - 10000))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatEuro(fraisInternes)} ({(fraisInternesPercent * 100).toFixed(1)}% du CA)</p></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>📉 Amortissements (% du CA)</label><div style={{display:'flex', gap:8}}><input type="number" value={Math.round(tauxAmortissements * 100 * 10) / 10} onChange={(e) => { const newValue = Number(e.target.value) / 100; setTauxAmortissements(Math.max(0.03, Math.min(0.08, newValue))); }} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" min="3" max="8" /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setTauxAmortissements(Math.min(0.08, tauxAmortissements + 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setTauxAmortissements(Math.max(0.03, tauxAmortissements - 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatPercent(tauxAmortissements)} = {formatEuro(amortissements)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Entre 3% et 8% du CA</p></div>
                  <div style={{paddingTop:16}}><h3 style={{fontSize:"1rem",fontWeight:700,color:$accent,marginBottom:12,display:"flex",alignItems:"center",gap:8,borderTop:`2px solid ${$accent}40`,paddingTop:16}}><DollarSign style={{width:20, height:20}} />Structure de Frais Group</h3></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🐝 Frais Yilmaz (Services partagés)</label><div style={{display:'flex', gap:8}}><input type="number" value={Math.round(tauxFraisYilmaz * 100 * 10) / 10} onChange={(e) => setTauxFraisYilmaz(Number(e.target.value) / 100)} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" min="0" max="10" /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setTauxFraisYilmaz(Math.min(0.10, tauxFraisYilmaz + 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setTauxFraisYilmaz(Math.max(0, tauxFraisYilmaz - 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatPercent(tauxFraisYilmaz)} = {formatEuro(fraisYilmaz)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Finance, RH, IT, Marketing</p></div>
                  <div style={{background:$warn+"06",borderRadius:crmRd,padding:16,border:`1px solid ${$warn}30`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🏢 Frais {filialeData.holdingParent}</label><div style={{display:'flex', gap:8}}><input type="number" value={Math.round(tauxFraisHolding * 100 * 10) / 10} onChange={(e) => setTauxFraisHolding(Number(e.target.value) / 100)} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" min="0" max="5" /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setTauxFraisHolding(Math.min(0.05, tauxFraisHolding + 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setTauxFraisHolding(Math.max(0, tauxFraisHolding - 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatPercent(tauxFraisHolding)} = {formatEuro(fraisHolding)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Gouvernance, pilotage</p></div>
                  <div style={{background:$accent+"06",borderRadius:crmRd,padding:16,border:`1px solid ${$accent}30`}}><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:6}}>🏛️ Frais GROUP OY</label><div style={{display:'flex', gap:8}}><input type="number" value={Math.round(tauxFraisGroupOY * 100 * 10) / 10} onChange={(e) => setTauxFraisGroupOY(Number(e.target.value) / 100)} style={{flex:1, padding:'12px 16px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" min="0" max="3" /><div style={{display:'flex', flexDirection:'column', gap:0}}><button onClick={() => setTauxFraisGroupOY(Math.min(0.03, tauxFraisGroupOY + 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'8px 8px 0 0', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▲</button><button onClick={() => setTauxFraisGroupOY(Math.max(0, tauxFraisGroupOY - 0.005))} style={{padding:'4px 12px', background:$accent, color:'white', borderRadius:'0 0 8px 8px', fontWeight:700, fontSize:'1rem', lineHeight:1, border:'none', cursor:'pointer'}}>▼</button></div></div><p style={{fontSize:'0.92rem', color:$textSec, marginTop:4}}>{formatPercent(tauxFraisGroupOY)} = {formatEuro(fraisGroupOY)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Consolidation, supervision</p></div>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}>
                <h2 style={{fontSize:'1.3rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><DollarSign style={{width:24, height:24}} />Rémunération</h2>
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18}}><h3 style={{fontWeight:600,color:$textSec,marginBottom:12}}>Composantes fixes</h3><div style={{display:'flex', flexDirection:'column', gap:8}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:$textSec}}>Fixe annuel</span><span style={{fontWeight:700, color:$text}}>{formatEuro(niveau.fixe)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:$textSec}}>Prime fixe (sur variable CA)</span><span style={{fontWeight:700, color:$text}}>{formatEuro(niveau.prime)}</span></div></div></div>
                  <div style={{background:$bgSub, borderRadius:crmRd, padding:18}}><h3 style={{fontWeight:600,color:$textSec,marginBottom:12}}>Composante variable</h3><div style={{display:'flex', flexDirection:'column', gap:8}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:$textSec}}>EBE calculé</span><span style={{fontWeight:700, color:$textSec}}>{formatPercent(ebePercent)}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:"0.78rem",color:$textMut,marginTop:-4}}><span>EBE cible : {formatPercent(niveau.ebeCible)}</span><span>{formatEuro(ebeValeur)}</span></div>
                    <div style={{margin:"12px 0",padding:12,background:$bgCard,borderRadius:crmRd,border:`2px solid ${$info}40`}}><div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}><div style={{display:'flex', alignItems:'center', gap:8}}><span style={{fontSize:'2rem'}}>{coeffResult.emoji}</span><div><div style={{fontWeight:600, color:$text}}>{coeffResult.commentaire}</div><div style={{fontSize:'0.82rem', color:$textSec}}>Écart: {ecartEBE >= 0 ? '+' : ''}{(ecartEBE * 100).toFixed(1)} points</div></div></div><div style={{textAlign:'right'}}><div style={{fontSize:'0.92rem', color:$textSec}}>Coefficient</div><div style={{fontSize:"1.2rem",fontWeight:700,color:$info}}>×{coefficient.toFixed(2)}</div></div></div></div>
                    <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:`1px solid ${$info}30`}}><span style={{color:$textSec}}>Base (1% CA)</span><span style={{fontWeight:500,color:$text}}>{formatEuro(baseVariable)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:$textSec}}>Variable modulée</span><span style={{fontWeight:700, color:$text}}>{formatEuro(variableModulee)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:$textSec}}>Variable ajustée (réelle)</span><span style={{fontWeight:700, color:$text}}>{formatEuro(variableAjustee)}</span></div></div></div>
                  <div style={{background:$accent+"08",borderRadius:crmRd,padding:16,border:`2px solid ${$accent}40`}}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><span style={{fontSize:'1rem', fontWeight:700, color:$text}}>Rémunération totale</span><span style={{fontSize:"1.5rem",fontWeight:700,color:$accent}}>{formatEuro(remunerationTotale)}</span></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,fontSize:"0.85rem"}}><span style={{color:$textSec}}>Plafond</span><span style={{fontWeight:500,color:$textSec}}>{formatEuro(niveau.plafond)}</span></div>{remunerationAvantPlafond > niveau.plafond && (<p style={{fontSize:"0.78rem",color:$warn,marginTop:8}}>⚠️ Plafond atteint</p>)}</div>

                </div>
              </div>
              {/* Multi-Scénario */}
              <div style={{background:$bgCard,borderRadius:crmRd,padding:20,border:`1px solid ${$border}`}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <div style={{fontWeight:700,fontSize:'1.3rem',color:$text,display:'flex',alignItems:'center',gap:6}}><span>🔀</span> Multi-Scénario</div>
                  {simScenarios.length>0&&<div style={{display:'flex',gap:5}}>
                    <button onClick={()=>setSimCompare(!simCompare)} style={{padding:'3px 9px',borderRadius:crmRd,border:`1px solid ${simCompare?$accent:$border}`,background:simCompare?$accent+'10':'transparent',color:simCompare?$accent:$textSec,fontWeight:600,fontSize:'0.92rem',cursor:'pointer',fontFamily:'inherit'}}>⇄ Comparer{simCompare?' ✓':''}</button>
                    <button onClick={()=>{if(window.confirm('Supprimer tous ?'))setSimScenarios([]);}} style={{padding:'3px 9px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:'transparent',color:$danger,fontWeight:600,fontSize:'0.92rem',cursor:'pointer',fontFamily:'inherit'}}>✕</button>
                  </div>}
                </div>
                <div style={{display:'flex',gap:6,marginBottom:10}}>
                  <input value={simScenarioNom} onChange={e=>setSimScenarioNom(e.target.value)} placeholder={"Scénario "+(simScenarios.length+1)+" — "+niveauSelectionne+" "+filialeSelectionnee} style={{flex:1,padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.92rem',fontFamily:'inherit',background:$bgSub,color:$text,outline:'none'}}/>
                  <button onClick={saveScenario} style={{padding:'7px 14px',borderRadius:crmRd,border:'none',background:$accent,color:'white',fontWeight:700,fontSize:'0.92rem',cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>💾 Sauver</button>
                </div>
                {simScenarios.length===0&&(
                  <div style={{textAlign:'center',padding:'16px 0',color:$textMut}}>
                    <div style={{fontSize:'1.5rem',marginBottom:4}}>📊</div>
                    <div style={{fontSize:'0.92rem'}}>Aucun scénario — ajustez et sauvegardez</div>
                  </div>
                )}
                {simScenarios.length>0&&!simCompare&&(<div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {simScenarios.map((sc,i)=>(
                    <div key={sc.id} style={{background:$bgSub,borderRadius:crmRd,padding:'8px 10px',border:`1px solid ${$borderLight}`,display:'flex',alignItems:'center',gap:8}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,color:$text,fontSize:'0.92rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sc.nom}</div>
                        <div style={{fontSize:'0.82rem',color:$textMut}}>{sc.filialeName} {sc.niveau} — {formatEuro(sc.ca)}</div>
                        <div style={{display:'flex',gap:6,marginTop:2}}>
                          <span style={{fontSize:'0.92rem',fontWeight:700,color:sc.ebePercent>=0.1?$success:$warn}}>{(sc.ebePercent*100).toFixed(1)}% EBE</span>
                          <span style={{fontSize:'0.92rem',fontWeight:700,color:$accent}}>{formatEuro(sc.remunerationTotale)}</span>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:4,flexShrink:0}}>
                        <button onClick={()=>{setFilialeSelectionnee(sc.filiale);setNiveauSelectionne(sc.niveau);setCa(sc.ca);setSousTraitance(sc.sousTraitance);setFraisInternes(sc.fraisInternes);setTauxAmortissements(sc.tauxAmortissements);setTauxFraisYilmaz(sc.tauxFraisYilmaz);setTauxFraisHolding(sc.tauxFraisHolding);setTauxFraisGroupOY(sc.tauxFraisGroupOY);}} style={{padding:'3px 7px',borderRadius:4,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit'}}>↩</button>
                        <button onClick={()=>setSimScenarios(prev=>prev.filter(s=>s.id!==sc.id))} style={{padding:'3px 7px',borderRadius:4,border:'none',background:'transparent',color:$textMut,fontSize:'0.92rem',cursor:'pointer'}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>)}
                {simScenarios.length>0&&simCompare&&(<div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem',minWidth:400}}>
                    <thead><tr style={{background:$bgSub}}>
                      <th style={{position:'relative',padding:'8px 10px',textAlign:'left',fontWeight:700,fontSize:'0.92rem',color:$textMut,borderBottom:`1px solid ${$border}`}}>Critère<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                      {simScenarios.map(sc=><th key={sc.id} style={{position:'relative',padding:'8px 10px',textAlign:'center',fontWeight:700,fontSize:'0.92rem',color:$text,borderBottom:`1px solid ${$border}`}}><div>{sc.nom}</div><div style={{fontSize:'0.92rem',color:$textMut,fontWeight:400}}>{sc.filialeName} {sc.niveau}</div><div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                    </tr></thead>
                    <tbody>
                      {[
                        {l:'CA',f:sc=>formatEuro(sc.ca)},
                        {l:'EBE %',f:sc=><span style={{fontWeight:700,color:sc.ebePercent>=0.12?$success:sc.ebePercent>=0.08?$warn:$danger}}>{(sc.ebePercent*100).toFixed(1)}%</span>},
                        {l:'Coeff.',f:sc=><span style={{fontWeight:700,color:sc.coefficient>=1?$success:sc.coefficient>=0.5?$warn:$danger}}>x{sc.coefficient.toFixed(2)}</span>},
                        {l:'Rémunération',f:sc=><span style={{fontWeight:800,color:$accent}}>{formatEuro(sc.remunerationTotale)}</span>},
                        {l:'Résultat net',f:sc=><span style={{fontWeight:700,color:sc.resultatNet>=0?$success:$danger}}>{formatEuro(sc.resultatNet)}</span>},
                      ].map((row,i)=>(
                        <tr key={i} style={{borderBottom:`1px solid ${$borderLight}`,background:i%2===0?'transparent':$bgSub+'50'}}>
                          <td style={{padding:'7px 10px',fontWeight:600,color:$textSec,fontSize:'0.92rem'}}>{row.l}</td>
                          {simScenarios.map(sc=><td key={sc.id} style={{padding:'7px 10px',textAlign:'center'}}>{row.f(sc)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>)}
              </div>
            </div>
              </div>
            <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}>
              <h2 style={{fontSize:'1.3rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><TrendingUp style={{width:24, height:24}} />Bilan Économique</h2>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
                <div style={{background:$bgSub, borderRadius:crmRd, padding:18}}><h3 style={{fontSize:'0.95rem', fontWeight:600, color:$textSec, marginBottom:12}}>Chiffres bruts</h3><div style={{display:'flex', flexDirection:'column', gap:8, fontSize:'0.95rem'}}><div style={{display:'flex', justifyContent:'space-between'}}><span>CA brut</span><span style={{fontWeight:700}}>{formatEuro(ca)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span>Achats & ST</span><span style={{fontWeight:500}}>-{formatEuro(achatsST)}</span></div><div style={{display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid #e5e0d8'}}><span style={{fontWeight:600}}>Marge brute</span><span style={{fontWeight:700, color:'#059669'}}>{formatEuro(margeBrute)}</span></div><div style={{fontSize:'0.82rem', color:$textMut}}>{(margeBrutePercent * 100).toFixed(1)}% du CA</div></div></div>
                <div style={{background:$bgSub, borderRadius:crmRd, padding:18}}><h3 style={{fontSize:'0.95rem', fontWeight:600, color:$textSec, marginBottom:12}}>Charges d'exploitation</h3><div style={{display:'flex', flexDirection:'column', gap:8, fontSize:'0.95rem'}}><div style={{display:'flex', justifyContent:'space-between'}}><span>Frais internes</span><span style={{fontWeight:500}}>-{formatEuro(fraisInternes)}</span></div><div style={{borderTop:`1px solid ${$borderLight}`,paddingTop:8,marginTop:8}}><div style={{fontSize:'0.82rem', fontWeight:600, color:$textSec, marginBottom:4}}>Frais structure groupe:</div></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.82rem'}}><span style={{paddingLeft:8}}>• YILMAZ ({formatPercent(tauxFraisYilmaz)})</span><span style={{fontWeight:500}}>-{formatEuro(fraisYilmaz)}</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.82rem'}}><span style={{paddingLeft:8}}>• {filialeData.holdingParent} ({formatPercent(tauxFraisHolding)})</span><span style={{fontWeight:500}}>-{formatEuro(fraisHolding)}</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.82rem'}}><span style={{paddingLeft:8}}>• GROUP OY ({formatPercent(tauxFraisGroupOY)})</span><span style={{fontWeight:500}}>-{formatEuro(fraisGroupOY)}</span></div><div style={{display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid #e5e0d8'}}><span style={{fontWeight:600}}>EBE</span><span style={{fontWeight:700,color:$info}}>{formatEuro(ebeValeur)}</span></div><div style={{fontSize:'0.82rem', color:$textMut}}>{(ebePercent * 100).toFixed(1)}% du CA</div></div></div>
                <div style={{background:$bgSub, borderRadius:crmRd, padding:18}}><h3 style={{fontSize:'0.95rem', fontWeight:600, color:$textSec, marginBottom:12}}>Résultat</h3><div style={{display:'flex', flexDirection:'column', gap:8, fontSize:'0.95rem'}}><div style={{display:'flex', justifyContent:'space-between'}}><span>EBE</span><span style={{fontWeight:500}}>{formatEuro(ebeValeur)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span>Amortissements ({formatPercent(tauxAmortissements)})</span><span style={{fontWeight:500}}>-{formatEuro(amortissements)}</span></div><div style={{display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid #e5e0d8'}}><span style={{fontWeight:600}}>Résultat d'exploitation</span><span style={{fontWeight:700, color: resultatExploitation >= 0 ? '#7c3aed' : '#dc2626'}}>{formatEuro(resultatExploitation)}</span></div><div style={{display:'flex', justifyContent:'space-between'}}><span>Impôts ({formatPercent(tauxImpots)})</span><span style={{fontWeight:500}}>-{formatEuro(impots)}</span></div><div style={{display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid #e5e0d8'}}><span style={{fontWeight:600}}>Résultat net</span><span style={{fontWeight:700, color: resultatNet >= 0 ? '#059669' : '#dc2626'}}>{formatEuro(resultatNet)}</span></div><div style={{fontSize:'0.82rem', color:$textMut}}>{(resultatNetPercent * 100).toFixed(1)}% du CA</div></div></div>
              </div>
            </div>
          </>)}

          {/* ═══ TAB: GRAPHIQUES (Phase 2) ═══ */}
          {simTab==='graphiques'&&(<div style={{display:'flex',flexDirection:'column',gap:20}}>
            {/* Grille rémunération par niveau */}
            <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
              <div style={{fontWeight:700,fontSize:'1rem',color:$text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.2rem'}}>💰</span> Rémunération par niveau — {filialeData.nom.split(' (')[0]}</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={graphData} margin={{top:4,right:8,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                  <XAxis dataKey="niveau" tick={{fontSize:11,fill:$textMut}} axisLine={false} tickLine={false}/>
                  <YAxis tickFormatter={v=>{return (v/1000).toFixed(0)+"k€";}} tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false} width={42}/>
                  <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.82rem'}} formatter={(v,n)=>[formatEuro(v),n]} labelStyle={{fontWeight:700,color:$text}}/>
                  <Legend wrapperStyle={{fontSize:'0.75rem',paddingTop:8}}/>
                  <Bar dataKey="fixe" name="Fixe" stackId="a" fill={$accent} radius={[0,0,0,0]}/>
                  <Bar dataKey="prime" name="Prime" stackId="a" fill={$info}/>
                  <Bar dataKey="variable" name="Variable max" stackId="a" fill={$success} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* CA cible vs plafond */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
                <div style={{fontWeight:700,fontSize:'1rem',color:$text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.2rem'}}>📊</span> CA cible vs Plafond rémunération</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={graphData} margin={{top:4,right:8,left:0,bottom:0}}>
                    <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                    <XAxis dataKey="niveau" tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false}/>
                    <YAxis yAxisId="ca" tickFormatter={v=>{return (v/1000000).toFixed(1)+"M";} } tick={{fontSize:9,fill:$textMut}} axisLine={false} tickLine={false} width={36}/>
                    <YAxis yAxisId="rem" orientation="right" tickFormatter={v=>{return (v/1000).toFixed(0)+"k";} } tick={{fontSize:9,fill:$textMut}} axisLine={false} tickLine={false} width={36}/>
                    <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.75rem'}} labelStyle={{fontWeight:700,color:$text}}/>
                    <Legend wrapperStyle={{fontSize:'0.72rem'}}/>
                    <Line yAxisId="ca" type="monotone" dataKey="caCible" name="CA cible" stroke={$accent} strokeWidth={2.5} dot={{r:4,fill:$accent}} activeDot={{r:6}}/>
                    <Line yAxisId="rem" type="monotone" dataKey="remMax" name="Plafond rém." stroke={$success} strokeWidth={2} strokeDasharray="5 3" dot={{r:3,fill:$success}}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
                <div style={{fontWeight:700,fontSize:'1rem',color:$text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.2rem'}}>🎯</span> EBE cible par niveau (%)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={graphData} margin={{top:4,right:8,left:0,bottom:0}}>
                    <defs>
                      <linearGradient id="simGradEbe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={$accent} stopOpacity={0.18}/>
                        <stop offset="95%" stopColor={$accent} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                    <XAxis dataKey="niveau" tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false}/>
                    <YAxis tickFormatter={v=>{return v+"%";}} tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false} width={32}/>
                    <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.75rem'}} formatter={(v)=>[`${v}%`,'EBE cible']} labelStyle={{fontWeight:700,color:$text}}/>
                    <Area type="monotone" dataKey="ebeCible" name="EBE cible %" stroke={$accent} strokeWidth={2.5} fill="url(#simGradEbe)" dot={{r:4,fill:$accent,stroke:'white',strokeWidth:2}} activeDot={{r:6}}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Bilan waterfall */}
            <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
              <div style={{fontWeight:700,fontSize:'1rem',color:$text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.2rem'}}>📉</span> Bilan actuel — cascade CA → Résultat net</div>
              <div style={{display:'flex',alignItems:'flex-end',gap:8,height:160,paddingBottom:8}}>
                {bilanData.map((item,i)=>{
                  const maxVal=ca; const pct=Math.abs(item.val)/maxVal*100;
                  return (
                    <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                      <div style={{fontSize:'0.62rem',fontWeight:700,color:item.color}}>{item.val>=0?'':'-'}{formatEuro(Math.abs(item.val)).replace('€','')}</div>
                      <div style={{width:'100%',height:`${Math.max(pct,4)}%`,background:item.color+'25',border:`2px solid ${item.color}`,borderRadius:`${crmRd}px ${crmRd}px 0 0`,minHeight:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <span style={{fontSize:'0.5rem',color:item.color,fontWeight:800,writingMode:'vertical-rl',textOrientation:'mixed'}}>{item.val>=0?'+':''}{(item.val/ca*100).toFixed(0)}%</span>
                      </div>
                      <div style={{fontSize:'0.6rem',color:$textMut,textAlign:'center',fontWeight:500}}>{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Coefficient EBE — barème visuel */}
            <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
              <div style={{fontWeight:700,fontSize:'1rem',color:$text,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.2rem'}}>⚖️</span> Barème coefficient — EBE réalisé vs cible</div>
              <div style={{display:'flex',gap:4,overflowX:'auto'}}>
                {baremeRelatif.map((b,i)=>{
                  const isActive=coefficient===b.coeff;
                  return (
                    <div key={i} style={{flex:1,minWidth:60,padding:'10px 8px',borderRadius:crmRd,background:isActive?b.coeff>=1?$success+'20':b.coeff>=0.5?$warn+'20':$danger+'20':$bgSub,border:`2px solid ${isActive?b.coeff>=1?$success:b.coeff>=0.5?$warn:$danger:$border}`,textAlign:'center',transition:'all 0.2s'}}>
                      <div style={{fontSize:'1.2rem'}}>{b.emoji}</div>
                      <div style={{fontSize:'0.72rem',fontWeight:800,color:b.coeff>=1?$success:b.coeff>=0.5?$warn:$danger}}>×{b.coeff}</div>
                      <div style={{fontSize:'0.55rem',color:$textMut,marginTop:2}}>{b.label}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:'0.75rem',color:$textMut}}>Coefficient actuel :</span>
                <span style={{fontSize:'1rem',fontWeight:800,color:coefficient>=1?$success:coefficient>=0.5?$warn:$danger}}>×{coefficient.toFixed(2)} {coeffResult.emoji}</span>
                <span style={{fontSize:'0.75rem',color:$textMut}}>— {coeffResult.commentaire}</span>
              </div>
            </div>
          </div>)}

          {/* ═══ TAB: CLASSEMENT (Phase 3) ═══ */}
          {simTab==='classement'&&(<div style={{display:'flex',flexDirection:'column',gap:16}}>
            {/* KPI Cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
              {[
                {icon:'👥',label:'Total collaborateurs',val:allCollabsCalc.length,color:$accent},
                {icon:'💰',label:'Masse salariale totale',val:formatEuro(masseSalTotale),color:$success},
                {icon:'📈',label:'CA total généré',val:formatEuro(caTotal),color:$info},
                {icon:'🎯',label:'CA moyen / collab',val:allCollabsCalc.length>0?formatEuro(Math.round(caTotal/(allCollabsCalc.length||1))):'—',color:'#8b5cf6'},
              ].map((kpi,i)=>(
                <div key={i} style={{background:$bgCard,borderRadius:crmRd,padding:'16px 18px',border:`1px solid ${$border}`,display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:'1.5rem'}}>{kpi.icon}</span>
                  <div><div style={{fontSize:'1.1rem',fontWeight:800,color:kpi.color}}>{kpi.val}</div><div style={{fontSize:'0.68rem',color:$textMut,marginTop:2}}>{kpi.label}</div></div>
                </div>
              ))}
            </div>
            {/* Alertes */}
            {simAlertes.length>0&&(
                <div style={{padding:'12px 16px',borderRadius:crmRd,background:$warn+'10',border:`1px solid ${$warn}30`}}>
                  <div style={{fontWeight:700,fontSize:'0.82rem',color:$warn,marginBottom:8}}>⚠️ {simAlertes.length} alerte{simAlertes.length>1?'s':''}</div>
                  {simAlertes.slice(0,5).map((a,i)=><div key={i} style={{fontSize:'0.75rem',color:$text,marginBottom:3}}>• <strong>{a.nom}</strong> — {a.msg}</div>)}
                </div>
            )}

            {/* Tableau classement */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}>
              <div style={{padding:'14px 18px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{fontWeight:700,color:$text,fontSize:'0.92rem'}}>🏆 Classement tous collaborateurs</div>
                <div style={{fontSize:'0.72rem',color:$textMut}}>{allCollabsCalc.length} collaborateur{allCollabsCalc.length>1?'s':''}</div>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead><tr style={{background:$bgSub}}>
                  {['#','Nom','Niveau','Filiale','CA Réalisé','EBE %','Coeff.','Rémunération'].map(h=><th key={h} style={{position:'relative',padding:'10px 14px',textAlign:'left',fontWeight:700,fontSize:'0.72rem',color:$textMut,borderBottom:`1px solid ${$border}`,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
                </tr></thead>
                <tbody>
                  {allCollabsCalc.map((c,i)=>(
                    <tr key={c.id} style={{borderBottom:`1px solid ${$borderLight}`,background:i%2===0?'transparent':$bgSub+'40',cursor:'pointer'}}
                      onClick={()=>{setCollabSelectionne(c.id);setOngletActif('suivi');}}
                      onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover}
                      onMouseLeave={e=>e.currentTarget.style.background=i%2===0?'transparent':$bgSub+'40'}
                    >
                      <td style={{padding:'10px 14px',fontWeight:800,color:i<3?['#f59e0b','#94a3b8','#cd7f32'][i]:$textMut,fontSize:'0.9rem'}}>{i<3?['🥇','🥈','🥉'][i]:i+1}</td>
                      <td style={{padding:'10px 14px',fontWeight:600,color:$text}}>{c.prenom||''} {c.nom||''}</td>
                      <td style={{padding:'10px 14px'}}><span style={{padding:'2px 8px',borderRadius:crmRd>0?10:2,background:nivColor(c.niv?.niveau||c.niveau)+'20',color:nivColor(c.niv?.niveau||c.niveau),fontWeight:700,fontSize:'0.72rem'}}>{c.niv?.niveau||c.niveau}</span></td>
                      <td style={{padding:'10px 14px',fontSize:'0.75rem',color:$textSec}}>{c.filNom?.split(' (')[0]||'—'}</td>
                      <td style={{padding:'10px 14px',fontWeight:600}}>{formatEuro(c.caRealise)}</td>
                      <td style={{padding:'10px 14px'}}><span style={{fontWeight:700,color:c.ebeRealise>=(c.niv?.ebeCible||0.1)?$success:$warn}}>{(c.ebeRealise*100).toFixed(1)}%</span></td>
                      <td style={{padding:'10px 14px'}}><span style={{fontWeight:800,color:c.coeffR.coeff>=1?$success:c.coeffR.coeff>=0.5?$warn:$danger}}>x{c.coeffR.coeff.toFixed(2)} {c.coeffR.emoji}</span></td>
                      <td style={{padding:'10px 14px',fontWeight:800,color:$accent,fontSize:'0.9rem'}}>{formatEuro(c.rem)}</td>
                    </tr>
                  ))}
                  {allCollabsCalc.length===0&&<tr><td colSpan={8} style={{padding:30,textAlign:'center',color:$textMut,fontSize:'0.82rem'}}>Aucun collaborateur avec niveau défini</td></tr>}
                </tbody>
                {allCollabsCalc.length>0&&<tfoot><tr style={{background:$bgSub,borderTop:`2px solid ${$border}`}}>
                  <td colSpan={4} style={{padding:'10px 14px',fontWeight:700,color:$text,fontSize:'0.82rem'}}>TOTAL</td>
                  <td style={{padding:'10px 14px',fontWeight:700,color:$info}}>{formatEuro(caTotal)}</td>
                  <td style={{padding:'10px 14px',fontWeight:700,color:$textMut}}>{caTotal>0?(allCollabsCalc.reduce((s,c)=>s+c.ebeRealise*c.caRealise,0)/caTotal*100).toFixed(1)+'%':'—'}</td>
                  <td style={{padding:'10px 14px'}}></td>
                  <td style={{padding:'10px 14px',fontWeight:800,color:$accent}}>{formatEuro(masseSalTotale)}</td>
                </tr></tfoot>}
              </table>
            </div>
          </div>)}

          {/* ═══ TAB: EXPORT (Phase 6) ═══ */}
          {simTab==='export'&&(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`}}>
              <div style={{fontWeight:700,fontSize:'0.92rem',color:$text,marginBottom:16}}>Sélectionner les sections</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  {k:'params',l:'Paramètres',desc:'Filiale, niveau, CA, frais structure'},
                  {k:'resultats',l:'Rémunération',desc:'Fixe, variable, coefficient, total'},
                  {k:'bilan',l:'Bilan Économique',desc:'CA, marges, EBE, résultat net'},
                  {k:'classement',l:'Classement',desc:'Tableau de tous les collaborateurs'},
                  {k:'scenarios',l:'Scénarios',desc:simScenarios.length+' scénario(s) sauvegardé(s)'},
                ].map(item=>(
                  <div key={item.k} onClick={()=>setSimPrintSel(prev=>({...prev,[item.k]:!prev[item.k]}))} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${simPrintSel[item.k]?$accent:$borderLight}`,background:simPrintSel[item.k]?$accent+'08':$bgSub,cursor:'pointer',transition:'all 0.15s'}}>
                    <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${simPrintSel[item.k]?$accent:$border}`,background:simPrintSel[item.k]?$accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {simPrintSel[item.k]&&<span style={{color:'white',fontSize:'0.65rem',fontWeight:800}}>✓</span>}
                    </div>
                    <div><div style={{fontSize:'0.82rem',fontWeight:600,color:$text}}>{item.l}</div><div style={{fontSize:'0.68rem',color:$textMut}}>{item.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:$bgCard,borderRadius:crmRd,padding:24,border:`1px solid ${$border}`,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontWeight:700,fontSize:'0.92rem',color:$text,marginBottom:4}}>Actions d'export</div>
              <button onClick={()=>window.print()} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderRadius:crmRd,border:`1px solid ${$accent}40`,background:$accent+'08',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}
                onMouseEnter={e=>e.currentTarget.style.background=$accent+'15'}
                onMouseLeave={e=>e.currentTarget.style.background=$accent+'08'}
              >
                <span style={{fontSize:'1.5rem'}}>🖨️</span>
                <div><div style={{fontSize:'0.88rem',fontWeight:700,color:$accent}}>Exporter en PDF</div><div style={{fontSize:'0.68rem',color:$textMut}}>Impression des sections sélectionnées</div></div>
              </button>
              <button onClick={()=>{const data={filiale:filialeSelectionnee,niveau:niveauSelectionne,ca,ebePercent:(ebePercent*100).toFixed(1)+'%',remunerationTotale,resultatNet,scenarios:simScenarios};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='simulateur_ruches_'+filialeSelectionnee+'_'+niveauSelectionne+'.json';a.click();URL.revokeObjectURL(url);}} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderRadius:crmRd,border:`1px solid ${$info}40`,background:$info+'08',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}
                onMouseEnter={e=>e.currentTarget.style.background=$info+'15'}
                onMouseLeave={e=>e.currentTarget.style.background=$info+'08'}
              >
                <span style={{fontSize:'1.5rem'}}>📦</span>
                <div><div style={{fontSize:'0.88rem',fontWeight:700,color:$info}}>Exporter JSON</div><div style={{fontSize:'0.68rem',color:$textMut}}>Télécharger les données et scénarios</div></div>
              </button>
              <button onClick={()=>{const parts=['Simulateur Ruches — '+filialeData.nom.split(' (')[0],'Niveau : '+niveauSelectionne,'CA : '+formatEuro(ca),'EBE : '+(ebePercent*100).toFixed(1)+'%','Rémunération : '+formatEuro(remunerationTotale),'Résultat net : '+formatEuro(resultatNet)];navigator.clipboard.writeText(parts.join('\n'));}} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderRadius:crmRd,border:`1px solid ${$success}40`,background:$success+'08',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}
                onMouseEnter={e=>e.currentTarget.style.background=$success+'15'}
                onMouseLeave={e=>e.currentTarget.style.background=$success+'08'}
              >
                <span style={{fontSize:'1.5rem'}}>📋</span>
                <div><div style={{fontSize:'0.88rem',fontWeight:700,color:$success}}>Copier résumé</div><div style={{fontSize:'0.68rem',color:$textMut}}>Résumé texte dans le presse-papier</div></div>
              </button>
              <div style={{marginTop:4,padding:'12px 16px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                <div style={{fontSize:'0.72rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Aperçu</div>
                <div style={{fontSize:'0.78rem',color:$text,lineHeight:1.8}}>
                  <div style={{fontWeight:700,marginBottom:4}}>{filialeData.nom.split(' (')[0]} — {niveauSelectionne}</div>
                  {simPrintSel.params&&<div style={{color:$textSec}}>• CA {formatEuro(ca)} — ST {(sousTraitance*100).toFixed(0)}%</div>}
                  {simPrintSel.resultats&&<div style={{color:$accent}}>• Rémunération : {formatEuro(remunerationTotale)} (x{coefficient.toFixed(2)})</div>}
                  {simPrintSel.bilan&&<div style={{color:$info}}>• EBE : {(ebePercent*100).toFixed(1)}% — Net : {formatEuro(resultatNet)}</div>}
                  {simPrintSel.classement&&<div style={{color:$success}}>• Classement : {allCollabsCalc.length} collaborateurs</div>}
                  {simPrintSel.scenarios&&simScenarios.length>0&&<div style={{color:'#8b5cf6'}}>• {simScenarios.length} scénario(s)</div>}
                </div>
              </div>
            </div>
          </div>)}

          </>);
}
