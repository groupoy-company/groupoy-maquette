// === Onglet « suivi » — extrait de App.jsx (modularisation, forme simple) ===
import { DollarSign, Search, Target, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function TabSuivi(__props) {
  const { $accent, $bgCard, $bgSub, $border, $info, $shadowLg, $success, $text, $textMut, $textSec, $warn, baseVariable, ca, calculerObjectifsLies, calculsCollab, coeffResult, coefficient, collabActuel, collabSelectionne, collaborateurs, crmRd, donneesFiltrees, ebeValeur, filialesDynamiques, filtreAnnee, formatEuro, formatPercent, grille, margeBrute, niveau, remunerationTotale, setCollabOngletId, setCollabSelectionne, setCollaborateurs, setFiltreAnnee, setOngletActif, setSuiviFilialeFilter, setSuiviFiltreOpen, setSuiviSearch, suiviFilialeFilter, suiviFiltreOpen, suiviSearch, updateCollaborateur, updateObjectifs, variableAjustee } = __props;
  return (
          <>
            <div style={{background:$bgCard, borderRadius:crmRd, padding:20, border:`1px solid ${$border}`, marginBottom:20}}>
              {/* Ajouter */}
              <div style={{display:'flex',justifyContent:'flex-end',marginBottom:8}}>
                <button style={{padding:'6px 14px',borderRadius:crmRd,background:$accent,color:'white',border:'none',fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>
                  <span>+</span> Ajouter
                </button>
              </div>
              {/* Filtres */}
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:14,flexWrap:'wrap'}}>
                <button onClick={()=>setSuiviFiltreOpen(v=>!v)} style={{display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${suiviFilialeFilter!=='all'?$accent:$border}`,background:suiviFilialeFilter!=='all'?$accent+'10':$bgSub,color:suiviFilialeFilter!=='all'?$accent:$textSec,fontWeight:500,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit'}}>
                  <span>✱</span> Filtres {suiviFilialeFilter!=='all'&&<span style={{background:$accent,color:'white',borderRadius:crmRd>0?10:2,padding:'1px 6px',fontSize:'0.66rem',fontWeight:700}}>1</span>}
                </button>
                {suiviFiltreOpen&&[{k:'all',l:'Toutes',c:null},...filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE'].includes(f.nom)).map(f=>({k:String(f.id),l:(f.nom||'').replace('Ezel Bâtiment','Ezel'),c:f.couleur}))].map(opt=>(
                  <button key={opt.k} onClick={()=>setSuiviFilialeFilter(opt.k)} style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${suiviFilialeFilter===opt.k?(opt.c||$accent):$border}`,background:suiviFilialeFilter===opt.k?(opt.c||$accent)+'18':'transparent',color:suiviFilialeFilter===opt.k?(opt.c||$accent):$textMut,fontWeight:suiviFilialeFilter===opt.k?700:400,fontSize:'0.73rem',cursor:'pointer',fontFamily:'inherit'}}>{opt.l}</button>
                ))}
              </div>
              {/* Grid: Collaborateur + Niveau */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div>
                  <label style={{display:'block',fontSize:'0.78rem',fontWeight:600,color:$textMut,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.04em'}}>Collaborateur</label>
                  <div style={{display:'flex',alignItems:'center',gap:5,background:$bgSub,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'5px 9px',marginBottom:4}}>
                    <Search style={{width:12,height:12,color:$textMut,flexShrink:0}}/>
                    <input value={suiviSearch} onChange={e=>setSuiviSearch(e.target.value)} placeholder="Rechercher un collaborateur..." style={{border:'none',outline:'none',background:'transparent',fontSize:'0.8rem',color:$text,fontFamily:'inherit',width:'100%'}}/>
                    {suiviSearch&&<button onClick={()=>setSuiviSearch('')} style={{border:'none',background:'none',cursor:'pointer',color:$textMut,lineHeight:1,padding:0,fontSize:'0.85rem'}}>×</button>}
                  </div>
                  <button onClick={()=>{setOngletActif('collaborateurs');setCollabOngletId(collabSelectionne);}} style={{display:'flex',alignItems:'center',gap:3,fontSize:'0.7rem',fontWeight:600,color:$accent,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',padding:'0 0 4px 0'}} onMouseEnter={e=>e.currentTarget.style.textDecoration='underline'} onMouseLeave={e=>e.currentTarget.style.textDecoration='none'}>
                    <Users style={{width:10,height:10}}/> Voir dossier →
                  </button>
                  <select value={collabSelectionne} onChange={e=>{setSuiviSearch('');setCollabSelectionne(Number(e.target.value));}} style={{width:'100%',padding:'9px 12px',border:`1.5px solid ${$border}`,borderRadius:crmRd,outline:'none',fontSize:'0.9rem',fontWeight:600,fontFamily:'inherit',background:$bgCard,color:$text}}>
                    {collaborateurs.filter(c2=>{
                      const ms=!suiviSearch||(c2.nom||'').toLowerCase().includes(suiviSearch.toLowerCase())||(c2.prenom||'').toLowerCase().includes(suiviSearch.toLowerCase());
                      const mf=suiviFilialeFilter==='all'||String(c2.filialeId)===suiviFilialeFilter;
                      return ms&&mf;
                    }).map(c2=>{const niv2=grille.find(g=>g.niveau===c2.niveau);return <option key={c2.id} value={c2.id}>{c2.nom} {c2.prenom||''} — {niv2?niv2.nom:c2.niveau}</option>;})}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'0.78rem',fontWeight:600,color:$textMut,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.04em'}}>Niveau / Métier</label>
                  <select value={collabActuel.niveau} onChange={e=>{const n=e.target.value;const nd=grille.find(g=>g.niveau===n);setCollaborateurs(collaborateurs.map(c=>c.id===collabSelectionne?{...c,niveau:n,caRealise:nd.caMin}:c));}} style={{width:'100%',padding:'9px 12px',border:`1.5px solid ${$border}`,borderRadius:crmRd,outline:'none',fontFamily:'inherit',background:$bgCard,color:$text,fontSize:'0.9rem',marginTop:50}}>
                    {grille.map(g=>(<option key={g.niveau} value={g.niveau}>{g.niveau} — {g.nom}</option>))}
                  </select>
                  <p style={{fontSize:'0.7rem',color:$textMut,marginTop:4}}>Fourchette CA : {grille.find(g=>g.niveau===collabActuel.niveau)?.caCible}</p>
                </div>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28}}>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}><h2 style={{fontSize:"1.2rem",fontWeight:700,color:$accent,marginBottom:16}}>État Actuel - {collabActuel.nom}</h2><div style={{display:'flex', flexDirection:'column', gap:12}}><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Mois écoulés</label><input type="number" value={collabActuel.moisEcoules} onChange={(e) => updateCollaborateur('moisEcoules', Number(e.target.value))} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} min="1" max="12" /></div><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>CA réalisé</label><input type="text" value={collabActuel.caRealise.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} onChange={(e) => { const valeurSansEspaces = e.target.value.replace(/\s/g, ''); if (!isNaN(valeurSansEspaces) && valeurSansEspaces !== '') { updateCollaborateur('caRealise', Number(valeurSansEspaces)); } }} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} /><p style={{fontSize:'0.82rem', color:$textSec, marginTop:4}}>{formatEuro(collabActuel.caRealise)}</p><p style={{fontSize:'0.82rem', color:$textMut}}>Fourchette niveau {collabActuel.niveau} : {formatEuro(calculsCollab.niveau.caMin)} - {formatEuro(calculsCollab.niveau.caMax)}</p></div><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Marge brute (%)</label><input type="number" value={Math.round(collabActuel.margeBrute * 100 * 10) / 10} onChange={(e) => updateCollaborateur('margeBrute', Number(e.target.value) / 100)} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" /><p style={{fontSize:'0.82rem', color:$textSec, marginTop:4}}>{formatEuro(calculsCollab.margeBruteValeur)} ({formatPercent(collabActuel.margeBrute)})</p></div><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>EBE (%)</label><input type="number" value={Math.round(collabActuel.ebeRealise * 100 * 10) / 10} onChange={(e) => updateCollaborateur('ebeRealise', Number(e.target.value) / 100)} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" /><p style={{fontSize:'0.82rem', color:$textSec, marginTop:4}}>{formatEuro(calculsCollab.ebeValeur)} ({formatPercent(collabActuel.ebeRealise)})</p></div><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Marge nette (approx.)</label><div style={{padding:8,background:$bgSub,borderRadius:crmRd}}><p style={{fontSize:"0.85rem",fontWeight:500}}>{formatEuro(calculsCollab.margeNetteValeur)}</p><p style={{fontSize:'0.82rem', color:$textSec}}>{formatPercent(collabActuel.ebeRealise * 0.75)}</p></div></div></div></div>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}><h2 style={{fontSize:'1.2rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><Target style={{width:20, height:20}} />Objectifs</h2><div style={{display:'flex', flexDirection:'column', gap:12}}><div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Durée (années)</label><select value={collabActuel.objectifs.dureeAnnees} onChange={(e) => { const nouvelleDuree = Number(e.target.value); const anciennesObjectifs = collabActuel.objectifs.objectifsAnnuels || []; const nouvellesObjectifs = Array.from({ length: nouvelleDuree }, (_, i) => anciennesObjectifs[i] || 0); setCollaborateurs(collaborateurs.map(c => c.id === collabSelectionne ? { ...c, objectifs: { ...c.objectifs, dureeAnnees: nouvelleDuree, objectifsAnnuels: nouvellesObjectifs } } : c)); }} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}}>{[1,2,3,4,5,6,7,8,9,10].map(n => (<option key={n} value={n}>{n} an{n > 1 ? 's' : ''}</option>))}</select></div>
                <div style={{background:$bgSub, padding:12, borderRadius:crmRd}}><h3 style={{fontSize:'0.95rem', fontWeight:600, color:$textSec, marginBottom:8}}>Objectifs CA par année</h3><div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:256,overflowY:"auto"}}>{Array.from({ length: collabActuel.objectifs.dureeAnnees }).map((_, index) => (<div key={index}><label style={{fontSize:'0.82rem', color:$textSec}}>Année {index + 1}</label><input type="text" value={(collabActuel.objectifs.objectifsAnnuels[index] || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} onChange={(e) => { const valeurSansEspaces = e.target.value.replace(/\s/g, ''); if (!isNaN(valeurSansEspaces) && valeurSansEspaces !== '') { const nouveaux = [...collabActuel.objectifs.objectifsAnnuels]; nouveaux[index] = Number(valeurSansEspaces); updateObjectifs('objectifsAnnuels', nouveaux); } else if (valeurSansEspaces === '') { const nouveaux = [...collabActuel.objectifs.objectifsAnnuels]; nouveaux[index] = 0; updateObjectifs('objectifsAnnuels', nouveaux); } }} style={{width:"100%",padding:"8px",border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:"0.85rem",fontFamily:"inherit",background:$bgCard,color:$text,outline:"none"}} /><p style={{fontSize:'0.82rem', color:$textMut}}>{formatEuro(collabActuel.objectifs.objectifsAnnuels[index] || 0)}</p></div>))}</div></div>
                <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Marge brute objectif (%)</label><input type="number" value={Math.round(collabActuel.objectifs.margeBruteObj * 100 * 10) / 10} onChange={(e) => calculerObjectifsLies('margeBruteObj', Number(e.target.value) / 100)} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" /></div>
                <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>EBE objectif (%)</label><input type="number" value={Math.round(collabActuel.objectifs.ebeObj * 100 * 10) / 10} onChange={(e) => calculerObjectifsLies('ebeObj', Number(e.target.value) / 100)} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" /></div>
                <div><label style={{display:'block', fontSize:'0.92rem', fontWeight:600, color:$textSec, marginBottom:4}}>Marge nette objectif (%)</label><input type="number" value={Math.round(collabActuel.objectifs.margeNetteObj * 100 * 10) / 10} onChange={(e) => calculerObjectifsLies('margeNetteObj', Number(e.target.value) / 100)} style={{width:'100%', padding:'8px 12px', border:'1.5px solid #e5e0d8', borderRadius:crmRd, outline:'none', fontSize:'0.98rem'}} step="0.5" /><p style={{fontSize:'0.82rem', color:$textMut, marginTop:4}}>Auto-calculé : EBE × 75%</p></div>
              </div></div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28}}>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}><h2 style={{fontSize:'1.2rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><DollarSign style={{width:20, height:20}} />Rémunération Actuelle</h2><div style={{display:'flex', flexDirection:'column', gap:12}}><div style={{background:$bgSub, borderRadius:crmRd, padding:12}}><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem', marginBottom:4}}><span style={{color:$textSec}}>Fixe annuel</span><span style={{fontWeight:700}}>{formatEuro(calculsCollab.niveau.fixe)}</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem'}}><span style={{color:$textSec}}>Prime fixe (sur variable CA)</span><span style={{fontWeight:700}}>{formatEuro(calculsCollab.niveau.prime)}</span></div></div><div style={{background:$bgSub, borderRadius:crmRd, padding:12}}><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem', marginBottom:4}}><span style={{color:$textSec}}>Base variable (1% CA)</span><span style={{fontWeight:500}}>{formatEuro(calculsCollab.baseVariable)}</span></div><div style={{margin:"8px 0",padding:8,background:$bgCard,borderRadius:crmRd,border:`1px solid ${$info}30`}}><div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}><div style={{display:'flex', alignItems:'center', gap:8}}><span style={{fontSize:'1.5rem'}}>{calculsCollab.coeffResult.emoji}</span><div style={{fontSize:'0.82rem'}}><div style={{fontWeight:600, color:$textSec}}>{calculsCollab.coeffResult.commentaire}</div><div style={{color:$textSec}}>Coeff: ×{calculsCollab.coefficient.toFixed(2)}</div></div></div></div></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem'}}><span style={{color:$textSec}}>Variable ajustée (réelle)</span><span style={{fontWeight:700}}>{formatEuro(calculsCollab.variableAjustee)}</span></div></div><div style={{background:$accent+"08",borderRadius:crmRd,padding:16,border:`2px solid ${$accent}40`}}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><span style={{fontWeight:700,color:$textSec}}>Rémunération totale</span><span style={{fontSize:"1.2rem",fontWeight:700,color:$accent}}>{formatEuro(calculsCollab.remunerationTotale)}</span></div></div></div></div>
              <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`}}><h2 style={{fontSize:'1.2rem', fontWeight:700, color:$text, marginBottom:16, display:'flex', alignItems:'center', gap:8}}><TrendingUp style={{width:20, height:20}} />Projection Annuelle</h2><div style={{display:'flex', flexDirection:'column', gap:12}}><div style={{background:$success+"08",borderRadius:crmRd,padding:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:8}}><span style={{color:$textSec}}>CA projeté (12 mois)</span><span style={{fontWeight:700, color:$accent}}>{formatEuro(calculsCollab.projectionCA)}</span></div><div style={{fontSize:'0.82rem', color:$textSec}}>Basé sur {formatEuro(collabActuel.caRealise / collabActuel.moisEcoules)}/mois</div></div><div style={{background:"#7C3AED08",borderRadius:crmRd,padding:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:8}}><span style={{color:$textSec}}>Rémunération projetée</span><span style={{fontWeight:700, color:$accent}}>{formatEuro(calculsCollab.projectionRemuneration)}</span></div><div style={{fontSize:'0.82rem', color:$textSec}}>Si maintien des performances</div></div><div style={{background:$bgSub,borderRadius:crmRd,padding:12}}><h3 style={{fontSize:'0.95rem', fontWeight:600, color:$textSec, marginBottom:8}}>Comparaison</h3><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem', marginBottom:4}}><span style={{color:$textSec}}>EBE cible</span><span style={{fontWeight:500}}>{formatPercent(calculsCollab.niveau.ebeCible)}</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem', marginBottom:4}}><span style={{color:$textSec}}>EBE actuel</span><span style={{color:collabActuel.ebeRealise >= calculsCollab.niveau.ebeCible ? $success : $warn, fontWeight:700}}>{formatPercent(collabActuel.ebeRealise)}</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem'}}><span style={{color:$textSec}}>Plafond rémunération</span><span style={{fontWeight:500}}>{formatEuro(calculsCollab.niveau.plafond)}</span></div></div></div></div>
            </div>
            {/* Graphiques — style Évolution */}
            {/* Filtre années */}
            <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:16,flexWrap:'wrap'}}>
              <span style={{fontSize:'0.75rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em',marginRight:4}}>Période</span>
              <button onClick={()=>setFiltreAnnee('toutes')} style={{padding:'4px 12px',borderRadius:crmRd>0?20:2,border:`1px solid ${filtreAnnee==='toutes'?$accent:$border}`,background:filtreAnnee==='toutes'?$accent+'15':'transparent',color:filtreAnnee==='toutes'?$accent:$textMut,fontWeight:filtreAnnee==='toutes'?700:400,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit'}}>Toutes</button>
              {Array.from({length:collabActuel.objectifs.dureeAnnees}).map((_,i)=>(
                <button key={i+1} onClick={()=>setFiltreAnnee(String(i+1))} style={{padding:'4px 12px',borderRadius:crmRd>0?20:2,border:`1px solid ${filtreAnnee===String(i+1)?$accent:$border}`,background:filtreAnnee===String(i+1)?$accent+'15':'transparent',color:filtreAnnee===String(i+1)?$accent:$textMut,fontWeight:filtreAnnee===String(i+1)?700:400,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit'}}>An {i+1}</button>
              ))}
            </div>
            {/* Ligne 1: CA + Marges — 2 cartes côte à côte */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              {/* Carte 1 — CA Réel vs Objectif */}
              <div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 20px 12px',border:`1px solid ${$border}`,boxShadow:'0 1px 8px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <span style={{fontSize:'1rem'}}>↗</span>
                  <span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>CA Réel vs Objectif</span>
                  <span style={{marginLeft:'auto',padding:'2px 10px',borderRadius:crmRd>0?20:2,background:$accent+'15',color:$accent,fontSize:'0.72rem',fontWeight:700}}>{filtreAnnee==='toutes'?'Toutes':'An '+filtreAnnee}</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={donneesFiltrees} margin={{top:4,right:8,left:0,bottom:0}}>
                    <defs>
                      <linearGradient id="suiviGradCA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007ab5" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="#007ab5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="suiviGradCAObj" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.10}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                    <XAxis dataKey="periode" tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false}/>
                    <YAxis tickFormatter={v=>`${(v/1000000).toFixed(1)}M€`} tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false} width={42}/>
                    <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.82rem',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}} formatter={(v,n)=>[formatEuro(v),n]} labelStyle={{fontWeight:700,color:$text,marginBottom:4}}/>
                    <Legend wrapperStyle={{fontSize:'0.75rem',paddingTop:8}}/>
                    <Area type="monotone" dataKey="ca" stroke="#007ab5" strokeWidth={2.5} fill="url(#suiviGradCA)" name="CA Réel" dot={false} activeDot={{r:5,fill:'#007ab5',stroke:'white',strokeWidth:2}}/>
                    <Area type="monotone" dataKey="caObjectif" stroke="#10b981" strokeWidth={2} strokeDasharray="6 3" fill="url(#suiviGradCAObj)" name="CA Objectif" dot={false} activeDot={{r:4,fill:'#10b981',stroke:'white',strokeWidth:2}}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* Carte 2 — Marges & EBE */}
              <div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 20px 12px',border:`1px solid ${$border}`,boxShadow:'0 1px 8px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <span style={{fontSize:'1rem'}}>€</span>
                  <span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>Marges & EBE</span>
                  <span style={{marginLeft:'auto',padding:'2px 10px',borderRadius:crmRd>0?20:2,background:'#22c55e15',color:'#16a34a',fontSize:'0.72rem',fontWeight:700}}>{filtreAnnee==='toutes'?'Toutes':'An '+filtreAnnee}</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={donneesFiltrees} margin={{top:4,right:8,left:0,bottom:0}}>
                    <defs>
                      <linearGradient id="suiviGradMB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="suiviGradEBE" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                    <XAxis dataKey="periode" tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false}/>
                    <YAxis tickFormatter={v=>`${(v/1000).toFixed(0)}K€`} tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false} width={42}/>
                    <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.82rem',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}} formatter={(v,n)=>[formatEuro(v),n]} labelStyle={{fontWeight:700,color:$text,marginBottom:4}}/>
                    <Legend wrapperStyle={{fontSize:'0.75rem',paddingTop:8}}/>
                    <Area type="monotone" dataKey="margeBrute" stroke="#22c55e" strokeWidth={2.5} fill="url(#suiviGradMB)" name="Marge Brute" dot={false} activeDot={{r:5,fill:'#22c55e',stroke:'white',strokeWidth:2}}/>
                    <Area type="monotone" dataKey="ebe" stroke="#f59e0b" strokeWidth={2.5} fill="url(#suiviGradEBE)" name="EBE Actuel" dot={false} activeDot={{r:5,fill:'#f59e0b',stroke:'white',strokeWidth:2}}/>
                    <Area type="monotone" dataKey="ebeObjectif" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 4" fill="none" name="EBE Objectif" dot={false} activeDot={{r:4,fill:'#f59e0b',stroke:'white',strokeWidth:2}}/>
                    <Area type="monotone" dataKey="margeNette" stroke="#8b5cf6" strokeWidth={2} fill="none" name="Marge Nette" dot={false} activeDot={{r:4,fill:'#8b5cf6',stroke:'white',strokeWidth:2}}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Carte 3 — Composition Rémunération */}
            <div style={{background:$bgCard,borderRadius:crmRd,padding:'20px 20px 12px',border:`1px solid ${$border}`,boxShadow:'0 1px 8px rgba(0,0,0,0.04)'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <span style={{fontSize:'1rem'}}>⬡</span>
                <span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>Composition de la Rémunération</span>
                <span style={{marginLeft:'auto',padding:'2px 10px',borderRadius:crmRd>0?20:2,background:'#8b5cf615',color:'#7c3aed',fontSize:'0.72rem',fontWeight:700}}>Annuel</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={donneesFiltrees} margin={{top:4,right:8,left:0,bottom:0}} barCategoryGap="35%">
                  <CartesianGrid strokeDasharray="4 4" stroke={$border} vertical={false}/>
                  <XAxis dataKey="periode" tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:$textMut}} axisLine={false} tickLine={false} width={42}/>
                  <Tooltip contentStyle={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:8,fontSize:'0.82rem',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}} content={({active,payload})=>{
                    if(active&&payload&&payload.length){
                      const total=payload.reduce((s,e)=>s+(e.value||0),0);
                      return <div style={{background:$bgCard,padding:'10px 14px',border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadowLg}}>
                        <p style={{fontWeight:700,color:$text,marginBottom:6,fontSize:'0.82rem'}}>{payload[0].payload.periode}</p>
                        {payload.map((e,i)=><p key={i} style={{color:e.color,fontSize:'0.8rem',margin:'2px 0'}}>{e.name} : {formatEuro(e.value)}</p>)}
                        <p style={{fontWeight:700,color:$accent,marginTop:6,paddingTop:6,borderTop:`1px solid ${$border}`,fontSize:'0.82rem'}}>Total : {formatEuro(total)} <span style={{fontWeight:400,color:$textMut}}>({formatEuro(total/12)}/mois)</span></p>
                      </div>;
                    }
                    return null;
                  }}/>
                  <Legend wrapperStyle={{fontSize:'0.75rem',paddingTop:8}}/>
                  <Bar dataKey="fixe" stackId="a" fill="#007ab5" name="Fixe" radius={[0,0,0,0]}/>
                  <Bar dataKey="primefixe" stackId="a" fill="#64748b" name="Prime fixe"/>
                  <Bar dataKey="variable" stackId="a" fill="#c9b896" name="Variable" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
  );
}
