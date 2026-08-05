// === Onglet « presentation » — extrait de App.jsx (modularisation, forme simple) ===
import { Award } from 'lucide-react';

export default function TabPresentation(__props) {
  const { $accent, $bgCard, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, archiFil, archiModel, baremeRelatif, blocDrag, blocDragPos, blocDropTargetIndex, blocRefs, ca, chantiers, coeffResult, coefficient, colDrag, colDragPos, colDropTargetIndex, colRefs, collaborateurs, configBlocsPresentation, configColonnes, crmRd, ebePercent, ecartEBE, employes, filiales, filialesDynamiques, formatPercent, getCellValue, grille, grilleColWidth, grilleFil, grilleModel, grilleNivSel, handleBlocMouseDown, handleColMouseDown, handlePrint, isBlocDragging, isColDragging, niveau, ordreBlocsPresentation, ordreColonnesGrille, printSelection, setArchiFil, setArchiModel, setCollabDetailTab, setCollabOngletId, setGrilleColWidth, setGrilleFil, setGrilleModel, setGrilleNivSel, setOngletActif, setPrintSelection, setShowPrintModal, showPrintModal } = __props;
  return (
          <div style={{position:"relative",userSelect:"none"}}>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
              <button onClick={() => setShowPrintModal(true)} style={{background:`linear-gradient(135deg, ${$accent}, ${$accent}cc)`, color:'white', padding:'10px 20px', borderRadius:crmRd, fontWeight:600, fontSize:'0.95rem', boxShadow:'0 4px 12px rgba(139,111,71,0.2)', transition:'all 0.3s', display:'flex', alignItems:'center', gap:8, border:'none', cursor:'pointer'}}>🖨️ Imprimer la Présentation</button>
            </div>
            {showPrintModal && (
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}} onClick={() => setShowPrintModal(false)}>
                <div style={{background:$bgCard,borderRadius:crmRd,boxShadow:$shadowLg,padding:24,width:"100%",maxWidth:448,margin:"0 16px"}} onClick={e => e.stopPropagation()}>
                  <h3 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:4,color:$accent}} style={{color:$accent}}>🖨️ Imprimer la Présentation</h3>
                  <p style={{fontSize:"0.85rem",color:$textMut,marginBottom:20}}>Sélectionnez les sections à inclure dans l'impression :</p>
                  <div style={{display:'flex', flexDirection:'column', gap:12, marginBottom:24}}>{Object.entries(configBlocsPresentation).map(([key, cfg]) => (<label key={key} style={{display:"flex",alignItems:"center",gap:12,padding:12,borderRadius:crmRd,border:`2px solid ${printSelection[key]?$accent:$border}`,cursor:"pointer",transition:"all 0.2s",background:printSelection[key]?$accent+"08":$bgSub}}><input type="checkbox" checked={printSelection[key]} onChange={e => setPrintSelection({...printSelection, [key]: e.target.checked})} style={{width:20,height:20,accentColor:$accent}} /><span style={{fontSize:'1.2rem'}}>{cfg.icon}</span><span style={{fontWeight:600,fontSize:"0.85rem",color:printSelection[key]?$accent:$textMut}}>{cfg.label}</span></label>))}</div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}><div style={{fontSize:"0.75rem",color:$textMut}}>{Object.values(printSelection).filter(Boolean).length} section(s) sélectionnée(s)</div><div style={{display:'flex', gap:8}}><button onClick={() => setShowPrintModal(false)} style={{padding:"8px 16px",borderRadius:crmRd,fontSize:"0.85rem",fontWeight:600,color:$textSec,background:$bgSub,border:"none",cursor:"pointer",fontFamily:"inherit"}}>Annuler</button><button onClick={handlePrint} disabled={Object.values(printSelection).every(v => !v)} style={{padding:"8px 20px",borderRadius:crmRd,fontSize:"0.85rem",fontWeight:600,color:"white",background:$accent,border:"none",cursor:"pointer",boxShadow:$shadow,display:"flex",alignItems:"center",gap:8,fontFamily:"inherit"}}>🖨️ Imprimer</button></div></div>
                  <div style={{display:"flex",gap:8,marginTop:12}}><button onClick={() => setPrintSelection(Object.fromEntries(Object.keys(configBlocsPresentation).map(k => [k, true])))} style={{fontSize:"0.75rem",color:$accent,cursor:"pointer"}}>Tout sélectionner</button><span style={{fontSize:"0.75rem",color:$borderLight}}>|</span><button onClick={() => setPrintSelection(Object.fromEntries(Object.keys(configBlocsPresentation).map(k => [k, false])))} style={{fontSize:"0.75rem",color:$textMut,cursor:"pointer"}}>Tout désélectionner</button></div>
                </div>
              </div>
            )}
            {ordreBlocsPresentation.map((blocId, blocIdx) => {
              const blocConfig = configBlocsPresentation[blocId];
              const isBlockDragged = isBlocDragging && blocDrag === blocId;
              const isBlockDropTarget = isBlocDragging && blocDropTargetIndex === blocIdx && blocDrag !== blocId;
              return (
                <div key={blocId} ref={(el) => { blocRefs.current[blocId] = el; }} data-bloc-id={blocId} style={{position:"relative",transition:"all 0.2s",opacity:isBlockDragged?0.3:1,transform:isBlockDragged?"scale(0.98)":"none"}}>
                  {isBlockDropTarget && (<div style={{position:'absolute', left:0, right:0, top:0, height:4, background:$accent, borderRadius:crmRd, zIndex:30, boxShadow:'0 2px 8px rgba(139,111,71,0.3)', transform: 'translateY(-8px)'}} />)}
                  <div style={{position:'absolute', top:8, right:8, zIndex:20, display:'flex', alignItems:'center', gap:4, background:$bgSub, border:`1px solid ${$border}`, borderRadius:crmRd, padding:'4px 8px', cursor:'grab', transition:'all 0.25s', opacity:0.4}} onMouseDown={(e) => handleBlocMouseDown(e, blocId)} onMouseEnter={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.padding='4px 12px';e.currentTarget.querySelector('.dep-txt').style.maxWidth='80px';e.currentTarget.querySelector('.dep-txt').style.opacity='1';}} onMouseLeave={e=>{e.currentTarget.style.opacity='0.4';e.currentTarget.style.padding='4px 8px';e.currentTarget.querySelector('.dep-txt').style.maxWidth='0';e.currentTarget.querySelector('.dep-txt').style.opacity='0';}} title="Glisser pour déplacer ce bloc"><span style={{color:$accent, fontSize:'0.82rem', fontWeight:600}}>⠿</span><span className="dep-txt" style={{color:$accent, fontSize:'0.72rem', fontWeight:600, maxWidth:0, opacity:0, overflow:'hidden', whiteSpace:'nowrap', transition:'all 0.25s'}}>Déplacer</span></div>
              {blocId === 'bareme' && (
            <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`, marginBottom:24}}>
              <h2 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:16,display:'flex',alignItems:'center',gap:8,color:$accent,textShadow:'0 1px 0 rgba(255,255,255,0.3)'}}><Award style={{width:24, height:24}} />Barème de Performance (relatif à l'EBE Cible)</h2>
              <div style={{background:$bgSub, borderRadius:crmRd, padding:18, marginBottom:16, border:`1px solid ${$border}`}}><p style={{fontSize:'0.92rem', color:$textSec}}><strong>Principe :</strong> Le coefficient est calculé en fonction de l'<strong>écart</strong> entre votre EBE réalisé et l'EBE cible de votre niveau. Pour ce niveau, l'EBE cible est <span style={{fontWeight:700, color:$textSec}}>{formatPercent(niveau.ebeCible)}</span>.</p></div>
              <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}><table style={{width:'100%',borderCollapse:'separate',borderSpacing:0}}><thead><tr style={{background:$bgSub,borderBottom:`2px solid ${$border}`}}><th style={{position:'relative',padding:'12px 14px',textAlign:'left',fontWeight:700,color:$accent,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.03em'}}>Écart vs Cible<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px',textAlign:'center',fontWeight:700,color:$accent,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.03em'}}>Emoji<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 16px',textAlign:'center',fontWeight:700,color:$accent,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.03em'}}>Coefficient<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th><th style={{position:'relative',padding:'12px 14px',textAlign:'left',fontWeight:700,color:$accent,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.03em'}}>Niveau de Performance<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></tr></thead>
              <tbody>{baremeRelatif.map((palier, index) => (<tr key={index} style={{borderBottom:`1px solid ${$borderLight}`,background:index%2===0?"transparent":$bgSub+"40",transition:"background 0.1s"}}><td style={{padding:12,fontWeight:500,color:$textSec}}>{palier.label}</td><td style={{padding:12,textAlign:"center",fontSize:"1.8rem"}}>{palier.emoji}</td><td style={{padding:'12px 16px', textAlign:'center', fontSize:'0.92rem', fontWeight:600}}><span style={{fontWeight:700, color:$accent, fontSize:'1.1rem'}}>×{palier.coeff.toFixed(2)}</span></td><td style={{padding:12,color:$textSec}}>{palier.commentaire}</td></tr>))}</tbody></table></div>
              <div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><h4 style={{fontWeight:600,color:$info,marginBottom:8}}>💡 Exemple pour votre niveau actuel :</h4><p style={{fontSize:'0.92rem', color:$textSec}}>EBE Cible : <strong>{formatPercent(niveau.ebeCible)}</strong><br/>Pour atteindre coefficient 1,0 (⭐ Excellent) : <strong>{formatPercent(niveau.ebeCible + 0.08)}</strong><br/>Pour atteindre coefficient 1,3 (🚀 Hors Norme) : <strong>{formatPercent(niveau.ebeCible + 0.15)}</strong></p></div>
                <div style={{background:$bgSub, borderRadius:crmRd, padding:18, border:`1px solid ${$border}`}}><h4 style={{fontWeight:600,color:$success,marginBottom:8}}>🎯 Votre performance actuelle :</h4><p style={{fontSize:'0.92rem', color:$textSec}}>EBE Réalisé : <strong>{formatPercent(ebePercent)}</strong><br/>Écart : <strong>{ecartEBE >= 0 ? '+' : ''}{(ecartEBE * 100).toFixed(1)} points</strong><br/>{coeffResult.emoji} <strong>{coeffResult.commentaire}</strong> (×{coefficient.toFixed(2)})</p></div>
              </div>
            </div>
              )}
              {blocId === 'histoire' && (
            <div style={{marginBottom:24}}>
              {/* PAGE DE GARDE */}
              <div style={{position:'relative',background:`linear-gradient(180deg, ${$bgCard} 0%, ${$bgSub} 100%)`,borderRadius:crmRd,overflow:'hidden',marginBottom:32,border:`1px solid ${$border}`}}>
                <div style={{position:'absolute',top:'-20%',right:'-10%',width:500,height:500,borderRadius:'50%',background:`radial-gradient(circle, ${$accent}08 0%, transparent 70%)`}}/>
                <div style={{position:'absolute',bottom:'-15%',left:'-8%',width:400,height:400,borderRadius:'50%',background:`radial-gradient(circle, ${$accent}05 0%, transparent 70%)`}}/>
                <div style={{position:'relative',zIndex:2,padding:'72px 48px',textAlign:'center'}}>
                  <div style={{fontSize:'4.5rem',marginBottom:16,filter:'drop-shadow(0 3px 16px rgba(139,111,71,0.15))'}}>🐝</div>
                  <div style={{fontSize:'3.2rem',fontWeight:800,color:$text,letterSpacing:'-0.05em',lineHeight:1.05,marginBottom:10}}>Le Modèle <span style={{color:$accent}}>Ruches</span></div>
                  <div style={{fontSize:'0.92rem',color:$textMut,fontWeight:500,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:20}}>Système de Rémunération & Organisation</div>
                  <div style={{fontSize:'1.05rem',color:$textSec,lineHeight:1.8,maxWidth:560,margin:'0 auto 36px'}}>Un système unique inspiré de l'intelligence collective des abeilles — au service de la performance et de l'épanouissement de chaque collaborateur du groupe.</div>
                  <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:36}}>
                    {[{n:filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom)).length,l:'Filiales',icon:'🏢'},{n:employes.filter(e=>e.statut==='actif').length,l:'Collaborateurs',icon:'👥'},{n:8,l:'Niveaux',icon:'📊'},{n:'10-30M€',l:'Trajectoire',icon:'📈'}].map((s,i)=>(<div key={i} style={{textAlign:'center',minWidth:90,background:$bgSub,borderRadius:crmRd,padding:'14px 18px',border:`1px solid ${$border}`}}><div style={{fontSize:'0.82rem',marginBottom:4}}>{s.icon}</div><div style={{fontSize:'1.5rem',fontWeight:800,color:$text}}>{s.n}</div><div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',marginTop:2}}>{s.l}</div></div>))}
                  </div>
                  <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
                    {filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom)).map(f=>(<span key={f.id} style={{padding:'6px 16px',borderRadius:crmRd>0?20:2,background:f.couleur+'10',color:f.couleur,fontSize:'0.82rem',fontWeight:600,display:'flex',alignItems:'center',gap:6,border:`1px solid ${f.couleur}20`}}><span style={{width:8,height:8,borderRadius:'50%',background:f.couleur}}/>{f.icon} {f.nom}</span>))}
                  </div>
                </div>
              </div>
              {/* L'HISTOIRE */}
              <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'48px',boxShadow:'0 2px 16px rgba(0,0,0,0.03)'}}>
                <div style={{maxWidth:760,margin:'0 auto'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}><span style={{fontSize:'1.5rem'}}>📖</span><div style={{fontSize:'1.6rem',fontWeight:800,color:$text,letterSpacing:'-0.03em'}}>L'Histoire de la Ruche</div></div>
                  <div style={{width:50,height:3,background:$accent,borderRadius:2,marginBottom:32}}/>
                  <div style={{fontSize:'1rem',color:$textSec,lineHeight:1.9,marginBottom:28}}>Il était une fois, dans la plaine d'Alsace, un groupe de bâtisseurs passionnés qui rêvaient de construire différemment. Pas seulement des murs et des toits — mais un <span style={{fontWeight:700,color:$accent}}>écosystème vivant</span> où chaque talent trouve sa place, grandit et s'épanouit. Un modèle où la performance individuelle nourrit la réussite collective, et où chaque effort est reconnu à sa juste valeur.</div>
                  <div style={{fontSize:'1rem',color:$textSec,lineHeight:1.9,marginBottom:28}}>Inspirés par la ruche — ce chef-d'œuvre de la nature où chaque abeille a un rôle précis, où l'effort collectif crée quelque chose de plus grand que la somme des individus — ils ont inventé le <span style={{fontWeight:700,color:$accent}}>Modèle Ruches</span>. Un système où la rémunération n'est pas arbitraire, mais directement liée à une réalité mesurable : l'EBE de chaque unité. Chaque collaborateur peut voir, comprendre et influencer sa rémunération.</div>
                  <div style={{fontSize:'1rem',color:$textSec,lineHeight:1.9,marginBottom:28}}>Le fondateur, <span style={{fontWeight:700,color:$text}}>Özdoğan YILMAZ</span>, a posé les bases de ce système en observant que dans le BTP, les meilleurs talents quittent les entreprises qui ne reconnaissent pas leur contribution réelle. Le Modèle Ruches résout ce problème : chaque collaborateur sait exactement comment sa performance se traduit en rémunération. Pas de politique, pas de favoritisme — <span style={{fontWeight:700,color:$accent}}>juste des résultats mesurables et une transparence totale</span>.</div>
                  <div style={{fontSize:'1rem',color:$textSec,lineHeight:1.9,marginBottom:32}}>Au fil des années, le modèle a prouvé sa puissance : les collaborateurs les plus performants sont récompensés avec des coefficients pouvant atteindre <span style={{fontWeight:700,color:$accent}}>1.3x</span>, tandis que ceux en difficulté bénéficient d'un accompagnement ciblé. Le système crée une <span style={{fontWeight:700,color:$text}}>dynamique vertueuse</span> : plus on performe, plus on gagne, plus on veut performer. L'entreprise et le collaborateur grandissent ensemble.</div>
                  <div style={{background:$accent+'06',borderRadius:crmRd,padding:'24px 28px',border:`1px solid ${$accent}15`,marginBottom:32}}>
                    <div style={{fontSize:'0.95rem',color:$accent,fontWeight:700,marginBottom:10}}>🎯 Le Principe Fondamental</div>
                    <div style={{fontSize:'1rem',color:$textSec,lineHeight:1.8}}>Dans le Modèle Ruches, chaque collaborateur est un <strong>entrepreneur dans l'entrepreneur</strong>. Sa rémunération est composée d'un fixe (la sécurité), d'une prime (l'engagement), et d'un variable (la performance) — le tout modulé par un coefficient de 0 à 1.3x basé sur l'écart entre l'EBE réalisé et l'EBE cible.</div>
                  </div>
                  <div style={{fontSize:'1.2rem',fontWeight:700,color:$text,marginBottom:16}}>Les 4 Niveaux de la Ruche</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:32}}>{[
                    {icon:'🌱',title:'ALVÉOLE',sub:'XXS → XS',desc:'Le terrain. L\'apprentissage et les fondations. CA : 0 à 1M€.',color:'#78350f',bg:'rgba(212,160,48,0.18)'},
                    {icon:'🍯',title:'RAYON',sub:'S → M',desc:'L\'encadrement. Pilotage autonome de chantiers. CA : 1 à 3M€.',color:$accent,bg:$accent+'08'},
                    {icon:'🏰',title:'RUCHE',sub:'L → XL',desc:'Le management. Direction d\'équipe et portefeuille. CA : 3 à 7,5M€.',color:'#9a3412',bg:'rgba(249,115,22,0.10)'},
                    {icon:'👑',title:'RUCHER',sub:'XXL → XXXL',desc:'La direction. Pilotage d\'une filiale entière. CA : 7,5 à 15M€.',color:'#b91c1c',bg:'rgba(239,68,68,0.10)'},
                  ].map((b,i)=>(<div key={i} style={{background:b.bg,borderRadius:crmRd,padding:'18px 20px',border:`1px solid ${b.color}20`,transition:'all 0.2s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}><div style={{width:38,height:38,borderRadius:crmRd,background:b.color+'12',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:'1.2rem'}}>{b.icon}</span></div><div><div style={{fontWeight:800,fontSize:'0.92rem',color:b.color,letterSpacing:'0.04em'}}>{b.title}</div><div style={{fontSize:'0.68rem',color:$textMut}}>{b.sub}</div></div></div>
                    <div style={{fontSize:'0.88rem',color:$textSec,lineHeight:1.6}}>{b.desc}</div>
                  </div>))}</div>
                  <div style={{fontSize:'1.2rem',fontWeight:700,color:$text,marginBottom:16}}>Nos Filiales — L'Essaim</div>
                  <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:32}}>{filialesDynamiques.filter(f=>!['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom)).map(f=>(<div key={f.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 18px',borderRadius:crmRd,border:`1px solid ${f.couleur}18`,background:f.couleur+'05',transition:'all 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background=f.couleur+'12'} onMouseLeave={e=>e.currentTarget.style.background=f.couleur+'05'}>
                    <div style={{width:40,height:40,borderRadius:crmRd,background:f.couleur+'12',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{fontSize:'1.2rem'}}>{f.icon}</span></div>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:'0.95rem',color:f.couleur}}>{f.nom}</div><div style={{fontSize:'0.78rem',color:$textMut}}>{f.activite}</div></div>
                    <span style={{width:10,height:10,borderRadius:'50%',background:f.couleur,flexShrink:0}}/>
                  </div>))}</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div style={{background:$success+'06',borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$success}15`}}><div style={{fontSize:'0.95rem',color:$success,fontWeight:700,marginBottom:8}}>🚀 L'Ambition 2026–2034</div><div style={{fontSize:'0.95rem',color:$textSec,lineHeight:1.7}}>De <strong>10M€</strong> à <strong>30M€</strong> — par croissance organique et acquisitions. Chaque nouvelle filiale enrichit l'essaim.</div></div>
                    <div style={{background:$info+'06',borderRadius:crmRd,padding:'20px 24px',border:`1px solid ${$info}15`}}><div style={{fontSize:'0.95rem',color:$info,fontWeight:700,marginBottom:8}}>🐝 Services Partagés YILMAZ</div><div style={{fontSize:'0.95rem',color:$textSec,lineHeight:1.7}}>Finance, RH, IT, Marketing. Chaque filiale verse <strong>5% du CA</strong> pour bénéficier de ces services mutualisés.</div></div>
                  </div>
                </div>
              </div>
            </div>
              )}
                            {blocId === 'architecture' && (
            <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`, marginBottom:24}}>
              <h2 style={{fontSize:'1.5rem', fontWeight:700, marginBottom:20, display:'flex', alignItems:'center', gap:8, color:$accent, textShadow:'0 1px 0 rgba(255,255,255,0.3)'}}>🐝 L'Architecture de la Ruche</h2>
              {/* Model tabs: BTP vs Location */}
              <div style={{display:'flex',gap:4,background:$bgSub,borderRadius:crmRd,padding:4,marginBottom:20,border:`1px solid ${$border}`,width:'fit-content'}}>
                {[{id:'btp',l:'🏗️ Modèle BTP (Exécution)'},{id:'location',l:'🚛 Modèle Location'}].map(m=>(
                  <button key={m.id} onClick={()=>{setArchiModel(m.id);setArchiFil(m.id==='btp'?'ezel':'roulotte');}} style={{padding:'10px 22px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:archiModel===m.id?$selBg:'transparent',color:archiModel===m.id?$selText:$textMut,fontWeight:archiModel===m.id?700:400,fontSize:'0.88rem',transition:'all 0.15s',fontFamily:'inherit'}}>{m.l}</button>
                ))}
              </div>
              {/* Filiale sub-tabs */}
              <div style={{display:'flex',gap:6,marginBottom:20,flexWrap:'wrap'}}>
                {(archiModel==='btp'?[
                  {id:'ezel',l:'Ezel Bâtiment',icon:'🏗️',color:'#007ab5'},
                  {id:'echafaudage',l:"L'Échafaudage",icon:'⚙️',color:'#6C3483'},
                  {id:'etancheite',l:"L'Étanchéité",icon:'💧',color:'#0e6655'},
                ]:[
                  {id:'roulotte',l:'La Roulotte',icon:'🚛',color:'#C49A2A'},
                ]).map(f=>(
                  <button key={f.id} onClick={()=>setArchiFil(f.id)} style={{padding:'6px 14px',borderRadius:crmRd>0?20:2,border:`1px solid ${archiFil===f.id?f.color:$border}`,background:archiFil===f.id?f.color+'12':'transparent',color:archiFil===f.id?f.color:$textMut,fontWeight:archiFil===f.id?600:400,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',display:'flex',alignItems:'center',gap:5}}><span style={{width:8,height:8,borderRadius:'50%',background:f.color}}/>{f.icon} {f.l}</button>
                ))}
              </div>
              {/* Content — 4 blocs based on selected filiale */}
              {(()=>{
                const ARCHI_DATA = {
                  ezel: {color:'#007ab5', blocs:[
                    {title:'ALVÉOLE (Terrain)',icon:'🌱',bg:'#007ab506',border:'#007ab5',items:[
                      {niv:'XXS',nom:'Alvéole Apprenti',ca:'0–0,5M€',int:'Butineur',ext:'Assistant Conducteur de Travaux'},
                      {niv:'XS',nom:'Alvéole',ca:'0,5–1M€',int:'Collecteur',ext:'Conducteur de Travaux / Chef de Chantier'}]},
                    {title:'RAYON (Encadrement)',icon:'🍯',bg:$accent+'06',border:$accent,items:[
                      {niv:'S',nom:'Rayon Junior',ca:'1–1,5M€',int:'Bâtisseur',ext:"Conducteur de Travaux Confirmé / Chargé d'Affaires"},
                      {niv:'M',nom:'Rayon Senior',ca:'1,5–3M€',int:'Maître-Bâtisseur',ext:"Chargé d'Affaires Confirmé / Chef de Groupe"}]},
                    {title:'RUCHE (Management)',icon:'🏰',bg:'#9a341206',border:'#9a3412',items:[
                      {niv:'L',nom:'Ruche Junior',ca:'3–5M€',int:'Gardien de Ruche',ext:'Directeur de Travaux / Chef de Groupe Senior'},
                      {niv:'XL',nom:'Ruche Senior',ca:'5–7,5M€',int:'Régisseur de Ruche',ext:"Responsable d'Agence / Chef d'Agence"}]},
                    {title:'RUCHER (Direction)',icon:'👑',bg:'#dc262606',border:'#dc2626',items:[
                      {niv:'XXL',nom:'Rucher Junior',ca:'7,5–12M€',int:'Maître-Apiculteur',ext:"Directeur d'Agence / Directeur d'Exploitation Junior"},
                      {niv:'XXXL',nom:'Rucher Senior',ca:'12–15M€',int:'Roi / Reine de la Ruche',ext:"Directeur d'Exploitation / Directeur Multi-Sites"}]}
                  ]},
                  echafaudage: {color:'#6C3483', blocs:[
                    {title:'ALVÉOLE (Terrain)',icon:'🌱',bg:'#6C348306',border:'#6C3483',items:[
                      {niv:'XXS',nom:'Alvéole Apprenti',ca:'0–0,5M€',int:'Butineur',ext:'Monteur Échafaudeur / Aide'},
                      {niv:'XS',nom:'Alvéole',ca:'0,5–1M€',int:'Collecteur',ext:'Chef Monteur / Échafaudeur Qualifié'}]},
                    {title:'RAYON (Encadrement)',icon:'🍯',bg:'#6C348306',border:'#8E44AD',items:[
                      {niv:'S',nom:'Rayon Junior',ca:'1–1,5M€',int:'Bâtisseur',ext:'Chef d\'Équipe Échafaudage'},
                      {niv:'M',nom:'Rayon Senior',ca:'1,5–3M€',int:'Maître-Bâtisseur',ext:'Conducteur de Travaux Échafaudage'}]},
                    {title:'RUCHE (Management)',icon:'🏰',bg:'#6C348306',border:'#6C3483',items:[
                      {niv:'L',nom:'Ruche Junior',ca:'3–5M€',int:'Gardien de Ruche',ext:'Directeur de Travaux Échafaudage'},
                      {niv:'XL',nom:'Ruche Senior',ca:'5–7,5M€',int:'Régisseur de Ruche',ext:'Responsable d\'Agence Échafaudage'}]},
                    {title:'RUCHER (Direction)',icon:'👑',bg:'#dc262606',border:'#dc2626',items:[
                      {niv:'XXL',nom:'Rucher Junior',ca:'7,5–12M€',int:'Maître-Apiculteur',ext:'Directeur d\'Agence Échafaudage'},
                      {niv:'XXXL',nom:'Rucher Senior',ca:'12–15M€',int:'Roi / Reine de la Ruche',ext:'Directeur d\'Exploitation Multi-Sites'}]}
                  ]},
                  etancheite: {color:'#0e6655', blocs:[
                    {title:'ALVÉOLE (Terrain)',icon:'🌱',bg:'#0e665506',border:'#0e6655',items:[
                      {niv:'XXS',nom:'Alvéole Apprenti',ca:'0–0,3M€',int:'Butineur',ext:'Aide-Étancheur / Apprenti'},
                      {niv:'XS',nom:'Alvéole',ca:'0,3–0,7M€',int:'Collecteur',ext:'Étancheur Qualifié'}]},
                    {title:'RAYON (Encadrement)',icon:'🍯',bg:'#0e665506',border:'#148f77',items:[
                      {niv:'S',nom:'Rayon Junior',ca:'0,7–1,2M€',int:'Bâtisseur',ext:'Chef d\'Équipe Étanchéité'},
                      {niv:'M',nom:'Rayon Senior',ca:'1,2–2,5M€',int:'Maître-Bâtisseur',ext:'Conducteur de Travaux Étanchéité'}]},
                    {title:'RUCHE (Management)',icon:'🏰',bg:'#0e665506',border:'#0e6655',items:[
                      {niv:'L',nom:'Ruche Junior',ca:'2,5–4M€',int:'Gardien de Ruche',ext:'Chargé d\'Affaires Étanchéité'},
                      {niv:'XL',nom:'Ruche Senior',ca:'4–6M€',int:'Régisseur de Ruche',ext:'Responsable d\'Agence Étanchéité'}]},
                    {title:'RUCHER (Direction)',icon:'👑',bg:'#dc262606',border:'#dc2626',items:[
                      {niv:'XXL',nom:'Rucher Junior',ca:'6–10M€',int:'Maître-Apiculteur',ext:'Directeur d\'Agence Étanchéité'},
                      {niv:'XXXL',nom:'Rucher Senior',ca:'10–15M€',int:'Roi / Reine de la Ruche',ext:'Directeur Multi-Sites Étanchéité'}]}
                  ]},
                  roulotte: {color:'#C49A2A', blocs:[
                    {title:'ALVÉOLE (Terrain commercial)',icon:'🌱',bg:'#C49A2A06',border:'#C49A2A',items:[
                      {niv:'XXS',nom:'Alvéole Apprenti',ca:'0–0,3M€',int:'Butineur',ext:'Assistant Commercial Location'},
                      {niv:'XS',nom:'Alvéole',ca:'0,3–0,6M€',int:'Collecteur',ext:'Commercial Location / Magasinier'}]},
                    {title:'RAYON (Encadrement commercial)',icon:'🍯',bg:'#C49A2A06',border:'#D4AC2B',items:[
                      {niv:'S',nom:'Rayon Junior',ca:'0,6–1M€',int:'Bâtisseur',ext:'Commercial Location Confirmé'},
                      {niv:'M',nom:'Rayon Senior',ca:'1–2M€',int:'Maître-Bâtisseur',ext:'Responsable Commercial / Chef de Parc'}]},
                    {title:'RUCHE (Management)',icon:'🏰',bg:'#C49A2A06',border:'#C49A2A',items:[
                      {niv:'L',nom:'Ruche Junior',ca:'2–3,5M€',int:'Gardien de Ruche',ext:'Responsable d\'Agence Location'},
                      {niv:'XL',nom:'Ruche Senior',ca:'3,5–5M€',int:'Régisseur de Ruche',ext:'Directeur d\'Agence Location'}]},
                    {title:'RUCHER (Direction)',icon:'👑',bg:'#dc262606',border:'#dc2626',items:[
                      {niv:'XXL',nom:'Rucher Junior',ca:'5–8M€',int:'Maître-Apiculteur',ext:'Directeur d\'Agence Location / Zone'},
                      {niv:'XXXL',nom:'Rucher Senior',ca:'8–12M€',int:'Roi / Reine de la Ruche',ext:'Directeur Multi-Sites Location'}]}
                  ]}
                };
                const data = ARCHI_DATA[archiFil];
                if(!data) return null;
                return data.blocs.map((bloc,bi)=>(
                  <div key={bi} style={{marginBottom:16,background:$bgSub,borderRadius:crmRd,padding:'16px 18px',borderLeft:`3px solid ${data.color}`}}>
                    <h4 style={{fontWeight:700,fontSize:'0.95rem',marginBottom:12,color:data.color,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'1.1rem'}}>{bloc.icon}</span> Bloc {bi+1} — {bloc.title}</h4>
                    <div style={{display:'flex',flexDirection:'column',gap:10}}>
                      {bloc.items.map((item,ii)=>(
                        <div key={ii} style={{background:$bgCard,borderRadius:crmRd,padding:'12px 14px',border:`1px solid ${$border}`,display:'flex',alignItems:'center',gap:14}}>
                          <div style={{minWidth:52,textAlign:'center'}}><span style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,background:data.color+'12',color:data.color,fontWeight:800,fontSize:'0.78rem'}}>{item.niv}</span></div>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:700,fontSize:'0.88rem',color:data.color,marginBottom:2}}>{item.nom} <span style={{fontWeight:400,fontSize:'0.75rem',color:$textMut}}>| CA : {item.ca}</span></div>
                            <div style={{display:'flex',gap:20,fontSize:'0.82rem',color:$textSec}}>
                              <span>🐝 <span style={{fontWeight:600}}>{item.int}</span></span>
                              <span>💼 <span style={{fontWeight:500}}>{item.ext}</span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
              )}
              {blocId === 'grilles' && (
            <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`, marginBottom:24}}>
              <h2 style={{fontSize:'1.5rem', fontWeight:700, marginBottom:20, color:$accent, display:'flex', alignItems:'center', gap:8, textShadow:'0 1px 0 rgba(255,255,255,0.3)'}}>💰 Grilles de Rémunération</h2>
              {/* Model tabs: BTP vs Location */}
              <div style={{display:'flex',gap:4,background:$bgSub,borderRadius:crmRd,padding:4,marginBottom:16,border:`1px solid ${$border}`,width:'fit-content'}}>
                {[{id:'btp',l:'🏗️ Grilles BTP'},{id:'location',l:'🚛 Grilles Location'}].map(m=>(
                  <button key={m.id} onClick={()=>{setGrilleModel(m.id);setGrilleFil(m.id==='btp'?'ezel':'roulotte');}} style={{padding:'10px 22px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:grilleModel===m.id?$selBg:'transparent',color:grilleModel===m.id?$selText:$textMut,fontWeight:grilleModel===m.id?700:400,fontSize:'0.88rem',transition:'all 0.15s',fontFamily:'inherit'}}>{m.l}</button>
                ))}
              </div>
              {/* Filiale sub-tabs */}
              <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
                {(grilleModel==='btp'?[
                  {id:'ezel',l:'Ezel Bâtiment',icon:'🏗️',color:'#007ab5'},
                  {id:'echafaudage',l:"L'Échafaudage",icon:'⚙️',color:'#6C3483'},
                  {id:'etancheite',l:"L'Étanchéité",icon:'💧',color:'#0e6655'},
                ]:[
                  {id:'roulotte',l:'La Roulotte',icon:'🚛',color:'#C49A2A'},
                ]).map(f=>(
                  <button key={f.id} onClick={()=>setGrilleFil(f.id)} style={{padding:'6px 14px',borderRadius:crmRd>0?20:2,border:`1px solid ${grilleFil===f.id?f.color:$border}`,background:grilleFil===f.id?f.color+'12':'transparent',color:grilleFil===f.id?f.color:$textMut,fontWeight:grilleFil===f.id?600:400,fontSize:'0.78rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',display:'flex',alignItems:'center',gap:5}}><span style={{width:8,height:8,borderRadius:'50%',background:f.color}}/>{f.icon} {f.l}</button>
                ))}
              </div>
              {/* Column width slider */}
              <div style={{background:$bgSub, borderRadius:crmRd, padding:'8px 12px', marginBottom:16, border:`1px solid ${$border}`, fontSize:'0.78rem', color:$textMut, display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
                <span>💡 Glissez les en-têtes pour réorganiser les colonnes</span>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:'0.72rem'}}>Largeur</span><input type="range" min={60} max={180} value={grilleColWidth} onChange={e=>setGrilleColWidth(Number(e.target.value))} style={{width:80,accentColor:$accent}}/><span style={{fontSize:'0.72rem',fontWeight:600,color:$accent}}>{grilleColWidth}px</span><button onClick={()=>setGrilleColWidth(100)} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.62rem',color:$textMut,cursor:'pointer',fontFamily:'inherit'}}>Reset</button></div>
              </div>
              {/* Selected grille table */}
              {(()=>{
                const GRILLE_META = {ezel:{c1:'#007ab5',c2:'#1570B8'},echafaudage:{c1:'#6C3483',c2:'#8E44AD'},etancheite:{c1:'#0e6655',c2:'#148f77'},roulotte:{c1:'#C49A2A',c2:'#D4AC2B'}};
                const meta = GRILLE_META[grilleFil];
                if(!meta||!filiales[grilleFil]) return null;
                const c1=meta.c1, c2=meta.c2, key=grilleFil;
                return (
                  <>
                  <div style={{borderRadius:crmRd,overflow:'hidden',border:`1px solid ${c1}20`}}>
                    <div style={{overflowX:'auto'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.75rem',userSelect:'none'}}>
                        <thead><tr style={{background:c1+'12',borderBottom:`2px solid ${c1}25`}}>
                          {ordreColonnesGrille.map((colId, colIdx) => { const col = configColonnes[colId]; const isColBeingDragged = isColDragging && colDrag === colId; const isColDropTarget = isColDragging && colDropTargetIndex === colIdx && colDrag !== colId; return (<th key={colId} ref={(el) => { colRefs.current[colId] = el; }} style={{padding:'8px 10px',borderBottom:`1px solid ${c1}20`,textAlign:'center',cursor:'grab',position:'relative',whiteSpace:'nowrap',opacity:isColBeingDragged?0.3:1,color:c1,fontWeight:700,fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.03em',minWidth:grilleColWidth,maxWidth:grilleColWidth*2}} onMouseDown={(e) => handleColMouseDown(e, colId)}>{isColDropTarget && (<div style={{position:'absolute', left:0, top:0, bottom:0, width:4, background:c1, borderRadius:crmRd, zIndex:30}} />)}<div style={{fontSize:'0.82rem'}}>{col.label}</div>{col.sub && <div style={{fontSize:'0.75rem',opacity:0.7}}>({col.sub})</div>}</th>); })}
                        </tr></thead>
                        <tbody>{filiales[key].grille.map((g, idx) => { const varMin = g.caMin * 0.01 * 0.5; const varMax = g.caMax * 0.01 * 1.3; const varMaxPlafonnee = Math.min(varMax, g.plafond - g.fixe - g.prime); const salaireMin = g.fixe + g.prime + varMin; const salaireMax = Math.min(g.fixe + g.prime + varMax, g.plafond); const isSelected = grilleNivSel === g.niveau + key; return (<tr key={g.niveau} onClick={()=>setGrilleNivSel(isSelected ? null : g.niveau + key)} style={{background:isSelected?c1+'18':g.niveau==='XXXL'?c1+'08':idx%2===0?'transparent':$bgSub+'30',transition:'background 0.15s',cursor:'pointer',borderLeft:isSelected?`3px solid ${c1}`:'3px solid transparent'}} onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.background=c1+'10';}} onMouseLeave={e=>{if(!isSelected)e.currentTarget.style.background=g.niveau==='XXXL'?c1+'08':idx%2===0?'transparent':$bgSub+'30';}}>{ordreColonnesGrille.map((colId) => { const cell = getCellValue(colId, g, varMin, varMaxPlafonnee, salaireMin, salaireMax); return (<td key={colId} style={{padding:'8px 10px',borderBottom:`1px solid ${$borderLight}`,textAlign:cell.align||'left',color:cell.color||$text,fontWeight:cell.bold||isSelected?700:400,fontSize:'0.72rem',minWidth:grilleColWidth,maxWidth:grilleColWidth*2}}>{cell.val}</td>); })}</tr>); })}</tbody>
                      </table>
                    </div>
                  </div>
                  {/* ── Détail niveau sélectionné ── */}
                  {grilleNivSel && grilleNivSel.endsWith(key) && (() => {
                    const nivCode = grilleNivSel.slice(0, grilleNivSel.length - key.length);
                    const g = filiales[key].grille.find(x=>x.niveau===nivCode);
                    if(!g) return null;
                    const varMin = g.caMin*0.01*0.5;
                    const varMax = g.caMax*0.01*1.3;
                    const varMaxPlaf = Math.min(varMax, g.plafond-g.fixe-g.prime);
                    const salMin = g.fixe+g.prime+varMin;
                    const salMax = Math.min(g.fixe+g.prime+varMax, g.plafond);
                    const fmt = v => Math.round(v).toLocaleString('fr-FR')+'€';
                    const pct = v => (v*100).toFixed(1)+'%';
                    const collabsNiveau = employes.filter(e => e.niveau === nivCode && (e.statut||'actif') !== 'ancien');
                    const items = [
                      {label:'Titre Ruche', val:g.nom, color:c1, bold:true},
                      {label:'CA cible', val:g.caCible, color:$text},
                      {label:'CA min / max', val:fmt(g.caMin)+' → '+fmt(g.caMax), color:$textSec},
                      {label:'Salaire fixe', val:fmt(g.fixe), color:$info},
                      {label:'Prime fixe', val:fmt(g.prime), color:$info},
                      {label:'Variable min', val:fmt(varMin), color:'#16a34a'},
                      {label:'Variable max', val:fmt(varMaxPlaf), color:'#16a34a'},
                      {label:'Total min', val:fmt(salMin), color:$warn},
                      {label:'Total max', val:fmt(salMax), color:$warn},
                      {label:'Plafond', val:fmt(g.plafond), color:$danger},
                      {label:'EBE cible', val:pct(g.ebeCible), color:$accent},
                      {label:'Effectif', val:collabsNiveau.length+' collaborateur'+(collabsNiveau.length!==1?'s':''), color:c1, bold:true},
                    ];
                    return (
                      <div style={{marginTop:12,borderRadius:crmRd,border:`1.5px solid ${c1}30`,background:`linear-gradient(135deg,${c1}06 0%,${$bgCard} 100%)`,overflow:'hidden'}}>
                        <div style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:`1px solid ${c1}18`,background:c1+'08'}}>
                          <span style={{fontSize:'1.4rem'}}>{g.emoji||'🐝'}</span>
                          <div>
                            <div style={{fontWeight:700,fontSize:'0.95rem',color:c1}}>{g.niveau} — {g.nom}</div>
                            <div style={{fontSize:'0.72rem',color:$textMut}}>CA cible : {g.caCible}</div>
                          </div>
                          <button onClick={()=>setGrilleNivSel(null)} style={{marginLeft:'auto',padding:'3px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',fontSize:'0.72rem',color:$textMut,fontFamily:'inherit'}}>✕</button>
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
                          {items.map((item,i)=>(
                            <div key={i} style={{padding:'10px 14px',borderRight:i%4<3?`1px solid ${c1}12`:'none',borderBottom:i<8?`1px solid ${c1}12`:'none'}}>
                              <div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:3}}>{item.label}</div>
                              <div style={{fontSize:'0.82rem',fontWeight:item.bold?700:600,color:item.color}}>{item.val}</div>
                            </div>
                          ))}
                        </div>
                        {collabsNiveau.length > 0 && (
                          <div style={{padding:'12px 18px',borderTop:`1px solid ${c1}15`}}>
                            <div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Collaborateurs à ce niveau</div>
                            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                              {collabsNiveau.map(e => {
                                const fil = filialesDynamiques.find(f=>f.id===e.filialeId);
                                return (
                                  <button key={e.id} onClick={()=>{setOngletActif('collaborateurs');setCollabOngletId(e.id);setCollabDetailTab('profil');}} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${fil?.couleur||c1}30`,background:(fil?.couleur||c1)+'0D',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e2=>e2.currentTarget.style.background=(fil?.couleur||c1)+'20'} onMouseLeave={e2=>e2.currentTarget.style.background=(fil?.couleur||c1)+'0D'}>
                                    <span style={{width:6,height:6,borderRadius:'50%',background:fil?.couleur||c1,flexShrink:0}}/>
                                    <span style={{fontSize:'0.78rem',fontWeight:600,color:$text}}>{e.prenom} {e.nom}</span>
                                    <span style={{fontSize:'0.65rem',color:$textMut}}>{e.posteInterne||e.posteExterne||''}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {collabsNiveau.length === 0 && (
                          <div style={{padding:'10px 18px',borderTop:`1px solid ${c1}15`,fontSize:'0.75rem',color:$textMut,fontStyle:'italic'}}>
                            Aucun collaborateur actif à ce niveau
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  </>
                );
              })()}
              {isColDragging && colDrag && (<div style={{position:'fixed',zIndex:50,pointerEvents:'none',left:colDragPos.x-40,top:colDragPos.y-20}}><div style={{padding:'8px 12px',borderRadius:crmRd,fontWeight:600,fontSize:'0.75rem',background:$accent+'15',border:`2px solid ${$accent}60`,boxShadow:'0 8px 30px rgba(139,111,71,0.3)',color:$accent,whiteSpace:'nowrap'}}>{configColonnes[colDrag]?.label}</div></div>)}
            </div>
              )}
              {blocId === 'composition' && (
            <div style={{background:$bgCard, borderRadius:crmRd, padding:28, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:`1px solid ${$border}`, marginBottom:24}}>
              <div style={{background:$success+"06",borderRadius:crmRd,padding:24,border:`2px solid ${$success}40`}}>
                <h3 style={{fontSize:"1.05rem",fontWeight:700,color:$success,marginBottom:16}}>📊 Composition de la Part Variable</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
                  <div style={{background:$bgCard,borderRadius:crmRd,padding:16,border:`2px solid ${$info}40`}}><div style={{fontSize:'1.8rem', marginBottom:8}}>📈</div><div style={{fontWeight:700,color:$info,marginBottom:4}}>40% sur CA</div><div style={{fontSize:'0.92rem', color:$textSec}}>Basé sur le chiffre d'affaires réalisé vs objectif</div></div>
                  <div style={{background:$bgCard,borderRadius:crmRd,padding:16,border:`2px solid ${$accent}40`}}><div style={{fontSize:'1.8rem', marginBottom:8}}>💰</div><div style={{fontWeight:700,color:$accent,marginBottom:4}}>35% sur EBE</div><div style={{fontSize:'0.92rem', color:$textSec}}>Basé sur l'EBE (Résultat) avec coefficient multiplicateur</div></div>
                  <div style={{background:$bgCard,borderRadius:crmRd,padding:16,border:`2px solid ${$success}40`}}><div style={{fontSize:'1.8rem', marginBottom:8}}>📊</div><div style={{fontWeight:700,color:$success,marginBottom:4}}>25% sur Marge</div><div style={{fontSize:'0.92rem', color:$textSec}}>Basé sur la marge brute réalisée</div></div>
                </div>
                <div style={{background:$bgCard,borderRadius:crmRd,padding:16,border:`1px solid ${$accent}40`}}><h4 style={{fontWeight:600,color:$accent,marginBottom:8}}>🎯 Conditions de Déclenchement</h4><ul style={{fontSize:"0.85rem",color:$textSec}}><li><strong>CA :</strong> Variable proportionnel à l'atteinte (70% CA = 70% de la part CA)</li><li><strong>EBE :</strong> Coefficient multiplicateur selon écart vs cible (voir barème ci-dessus)</li><li><strong>Marge :</strong> Déclenchement si marge brute ≥ objectif du niveau</li><li><strong>Bonus :</strong> Coefficient appliqué sur ensemble si performance exceptionnelle ({'>'}+15% vs cible)</li></ul></div>
              </div>
            </div>
              )}
                </div>
              );
            })}
            {isBlocDragging && blocDrag && (
              <div style={{position:"fixed",zIndex:50,pointerEvents:"none"}} style={{left: blocDragPos.x - 150, top: blocDragPos.y - 25}}>
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 20px",borderRadius:crmRd,fontWeight:600,background:$accent+"15",border:`2px solid ${$accent}60`,boxShadow:$shadowLg}} style={{boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(0,0,0,0.2)', maxWidth: '350px'}}>
                  <span style={{fontSize:'1.5rem'}}>{configBlocsPresentation[blocDrag].icon}</span>
                  <span style={{color:$accent,whiteSpace:"nowrap",fontSize:"0.85rem"}}>{configBlocsPresentation[blocDrag].label}</span>
                </div>
              </div>
            )}
          </div>
  );
}
