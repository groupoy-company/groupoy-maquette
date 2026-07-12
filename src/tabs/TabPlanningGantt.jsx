// === Onglet « planning_gantt » — extrait de App.jsx (modularisation, forme iife) ===
import { AO_RAW, getExt } from '../data/ao.js';
import React, {  } from 'react';
import { Bar, Legend } from 'recharts';

export default function TabPlanningGantt(__props) {
  const { $bg, $bgCard, $bgSub, $border, $text, $textMut, $textSec, PLAN_PHASES, PLAN_STATUTS, crmRd, navEntreprise, navService, planBarColor, planColWidths, planDetailId, planFiltrePhase, planFiltrePrio, planFiltreResp, planFiltreStatut, planGanttScale, planGanttZoom, planGroupBy, planGroupesFermes, planKanbanDrag, planOffset, planProjets, planSearch, planVue, planZoom, setPlanBarColor, setPlanColWidths, setPlanDetailId, setPlanFiltrePrio, setPlanFiltreResp, setPlanGroupBy, setPlanGroupesFermes, setPlanKanbanDrag, setPlanOffset, setPlanProjets, setPlanSearch, setPlanVue, setPlanZoom } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const today = new Date();
          const todayStr = today.toISOString().split('T')[0];
          const moisNoms = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
          const moisComplets = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
          // ═══ PLANNING RÉPONSES AO — ÉTUDES DE PRIX ═══
          if (navEntreprise === 'ezel' && navService === 'etudes_prix') {
            const ACTIF_ST_PL = ['À Préparer','AO sélectionné','Visite rdv à prendre','Visite rdv pris','Visite demandée','Demandes de précisions','En préparation','Visite problématique','En attente de Réponse','En cours de négociation'];
            const GAGNE_ST_PL = ['Accepté ✧','Projet en Cours de Réalisation','Projet Terminé'];
            const AO_PHASES_PL = [
              {id:'preparation',label:'PRÉPARATION',color:ACC,bg:'#f0ecfd',icon:'✱'},
              {id:'soumission',label:'SOUMISSION',color:'#ea580c',bg:'#fff3ee',icon:'↥'},
              {id:'resultat',label:'RÉSULTAT',color:'#059669',bg:'#e8f5ee',icon:'★'},
            ];
            const getPhaseAO = (s) => {
              if (['À Préparer','AO sélectionné','Visite rdv à prendre','Visite rdv pris','Visite demandée','Demandes de précisions','En préparation','Visite problématique'].includes(s)) return 'preparation';
              if (['En attente de Réponse','Prêt à déposer'].includes(s)) return 'soumission';
              if (['En cours de négociation','Accepté ✧','Projet en Cours de Réalisation','Projet Terminé'].includes(s)) return 'resultat';
              return 'archive';
            };
            const SC_PL = {'À Préparer':'#4a90c4','AO sélectionné':'#007ab5','Visite rdv à prendre':'#d97706','Visite rdv pris':'#b45309','Demandes de précisions':'#0284c7','En préparation':ACC,'Visite problématique':'#dc2626','En attente de Réponse':'#2563eb','En cours de négociation':'#7c3aed','Accepté ✧':'#059669','Projet en Cours de Réalisation':'#10b981','Projet Terminé':'#34d399'};
            const TM_PL = {'Marché public':{c:'#0055cc',bg:'#e0f0ff',e:'◆'},'Marché privé':{c:'#166534',bg:'#dcfce7',e:'▪'},'Marché particulier':{c:'#7c3aed',bg:'#f3e8ff',e:'⌂'}};
            const aoActifsPL = AO_RAW.filter(a => ACTIF_ST_PL.includes(a.s));
            const aoGagnesPL = AO_RAW.filter(a => GAGNE_ST_PL.includes(a.s));
            const aoPerdus_PL = AO_RAW.filter(a => !ACTIF_ST_PL.includes(a.s) && !GAGNE_ST_PL.includes(a.s));
            const aoDecides_PL = aoGagnesPL.length + aoPerdus_PL.filter(a => a.s !== 'Pas répondu' && a.s !== 'Reporté').length;
            const tauxSuccesPL = aoDecides_PL > 0 ? Math.round(aoGagnesPL.length/aoDecides_PL*100) : 0;
            const todayPL = new Date('2026-03-13'); todayPL.setHours(0,0,0,0);
            const dlLeft = (dl) => { if(!dl) return null; const d=new Date(dl); d.setHours(0,0,0,0); return Math.ceil((d-todayPL)/86400000); };
            const fmtMPL = (v) => !v||v===0?'—':v>=1000000?(v/1000000).toFixed(1)+'M€':v>=1000?Math.round(v/1000)+'k€':v+'€';
            const fmtDPL = (d) => { if(!d) return '—'; const p=d.split('-'); return p[2]+'/'+p[1]+'/'+p[0].slice(2); };
            const dlColorPL = (dl) => dl===null?$textMut:dl<0?'#9ca3af':dl<=7?'#dc2626':dl<=14?'#f59e0b':dl<=21?'#d97706':$textSec;
            const aoUrgentsPL = aoActifsPL.filter(a => a.d && dlLeft(a.d)!==null && dlLeft(a.d)>=0 && dlLeft(a.d)<=7);
            const pipelineBudgetPL = aoActifsPL.reduce((s,a)=>s+(a.b||0),0);
            const startDatePL = new Date('2026-03-01');
            const endDatePL = new Date('2026-10-31');
            const totalMsPL = endDatePL - startDatePL;
            const pctPL = (ds) => { if(!ds) return null; const d=new Date(ds); return Math.max(0,Math.min(100,((d-startDatePL)/totalMsPL)*100)); };
            const todayPctPL = pctPL('2026-03-13');
            // Estimation date de début selon phase (jours avant deadline)
            const PREP_DAYS = {'À Préparer':45,'AO sélectionné':40,'Visite rdv à prendre':35,'Visite rdv pris':30,'Visite demandée':32,'Demandes de précisions':28,'En préparation':20,'Visite problématique':25,'En attente de Réponse':5,'En cours de négociation':3};
            const getStartDate = (ao) => {
              if (!ao.d) return null;
              const prep = PREP_DAYS[ao.s] || 30;
              const dl = new Date(ao.d);
              dl.setDate(dl.getDate() - prep);
              return dl.toISOString().split('T')[0];
            };
            const pctBarStart = (ao) => {
              const sd = getStartDate(ao);
              if (!sd) return todayPctPL;
              const p = pctPL(sd);
              return p !== null ? Math.min(p, todayPctPL) : todayPctPL;
            };
            const monthsPL = [];
            let curPL = new Date('2026-03-01');
            while(curPL <= endDatePL) { monthsPL.push({label:moisNoms[curPL.getMonth()]+' '+curPL.getFullYear(),pct:pctPL(curPL.toISOString().split('T')[0])}); curPL=new Date(curPL.getFullYear(),curPL.getMonth()+1,1); }
            let filteredPL = [...aoActifsPL];
            if(planSearch){const srch=planSearch.toLowerCase();filteredPL=filteredPL.filter(a=>a.n.toLowerCase().includes(srch)||a.m.toLowerCase().includes(srch));}
            if(planFiltreResp!=='tous') filteredPL=filteredPL.filter(a=>getPhaseAO(a.s)===planFiltreResp);
            if(planFiltrePrio!=='tous') filteredPL=filteredPL.filter(a=>a.p===planFiltrePrio);
            const filteredGantt = filteredPL.filter(a=>a.d).sort((a,b)=>new Date(a.d)-new Date(b.d));
            // SVG Gantt 2022-2030
            const PL_O=new Date(2022,0,1),PL_TOT=108;
            const PL_NOW=Math.round((new Date()-PL_O)/(1000*60*60*24*30.44));
            const wkG=Math.max(0.5,planGanttScale==='year'?planGanttZoom/12:planGanttScale==='quarter'?planGanttZoom/3:planGanttScale==='week'?planGanttZoom*4.33:planGanttZoom);
            const LWG=300,RHG=36,HHG=44,PL_YRS=[2022,2023,2024,2025,2026,2027,2028,2029,2030];
            const MNG=['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
            const toMG=(ds)=>{if(!ds)return null;return Math.round((new Date(ds)-PL_O)/(1000*60*60*24*30.44));};
            const stMG=(ao)=>{if(!ao.d)return PL_NOW;const p=30;const sd=new Date(ao.d);sd.setDate(sd.getDate()-p);return Math.round((sd-PL_O)/(1000*60*60*24*30.44));};
            const bwG=PL_TOT*wkG,thG=(filteredGantt.length+1)*RHG+HHG;
            const cdG=(ao)=>{const m=String(ao.id).match(/[0-9]+/);return m?('#'+m[0].slice(-4)):ao.id;};
            const urgG2=(dl)=>dl===null?ACC:dl<0?'#9ca3af':dl<=7?'#dc2626':dl<=14?'#f59e0b':ACC;
            const fD2=(d)=>{if(!d)return '?';const dt=new Date(d);return(dt.getDate()+'').padStart(2,'0')+'/'+(dt.getMonth()+1+'').padStart(2,'0')+'/'+(dt.getFullYear()+'').slice(2);};
            return (<div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                <div>
                  <h2 style={{margin:0,fontSize:'1.2rem',fontWeight:700,color:$text}}>◫ Planning Bureau d'Études — AOs</h2>
                  <p style={{margin:'4px 0 0',fontSize:'0.85rem',color:$textMut}}>{aoActifsPL.length} AO actifs · {filteredGantt.length} avec deadline · Données Monday.com live</p>
                </div>
                <span style={{fontSize:'0.75rem',padding:'4px 10px',borderRadius:crmRd,background:'#e0f2fe',color:'#0369a1',fontWeight:600,border:'1px solid #bae6fd'}}>🟢 Monday.com live</span>
              </div>
              {/* KPI row */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
                {[{l:'AO actifs',v:aoActifsPL.length,i:'◺',c:'#007ab5'},{l:'Urgents ≤7j',v:aoUrgentsPL.length,i:'▲',c:aoUrgentsPL.length>0?'#dc2626':'#10b981'},{l:'En attente réponse',v:AO_RAW.filter(a=>a.s==='En attente de Réponse').length,i:'↥',c:'#ea580c'},{l:'Taux succès',v:tauxSuccesPL+'%',i:'★',c:tauxSuccesPL>=15?'#10b981':tauxSuccesPL>=8?'#f59e0b':'#ef4444'},{l:'Pipeline budget',v:fmtMPL(pipelineBudgetPL),i:'€',c:'#7c3aed'}].map((k,i) => (
                  <div key={i} style={{background:$bgCard,borderRadius:crmRd,padding:'14px 16px',border:`1px solid ${$border}`,borderTop:`3px solid ${k.c}`}}>
                    <div style={{fontSize:'0.67rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{k.l}</div>
                    <div style={{fontSize:'1.5rem',fontWeight:800,color:k.c,lineHeight:1}}>{k.v}</div>
                    <div style={{fontSize:'0.78rem',color:$textMut,marginTop:3}}>{k.i}</div>
                  </div>
                ))}
              </div>
              {/* Urgents banner */}
              {aoUrgentsPL.length > 0 && (
                <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:crmRd,padding:'12px 16px'}}>
                  <div style={{fontSize:'0.82rem',fontWeight:700,color:'#dc2626',marginBottom:8}}>▲ AO urgents — deadline dans les 7 prochains jours ({aoUrgentsPL.length})</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {aoUrgentsPL.map(a => { const dl=dlLeft(a.d); return (
                      <div key={a.id} style={{padding:'5px 10px',borderRadius:crmRd,background:'#fff',border:'1px solid #fecaca',display:'flex',alignItems:'center',gap:6}}>
                        <span style={{width:7,height:7,borderRadius:'50%',background:'#dc2626',display:'inline-block',flexShrink:0}}></span>
                        <span style={{fontSize:'0.76rem',fontWeight:600,color:'#111',maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,45)}</span>
                        <span style={{fontSize:'0.73rem',fontWeight:700,color:'#dc2626',flexShrink:0}}>{dl===0?'Aujourd\'hui !':dl+'j'}</span>
                      </div>
                    );})}
                  </div>
                </div>
              )}
              {/* Vue tabs + filters */}
              <div style={{display:'flex',alignItems:'center',gap:4,borderBottom:`1px solid ${$border}`,paddingBottom:8,flexWrap:'wrap',rowGap:6}}>
                {[{id:'gantt',icon:'▦',label:'Gantt'},{id:'tableau',icon:'☰',label:'Tableau'},{id:'kanban',icon:'▸',label:'Kanban'}].map(v => (
                  <button key={v.id} onClick={e=>{e.stopPropagation();setPlanVue(v.id);}} style={{padding:'6px 14px',borderRadius:crmRd,fontSize:'0.85rem',fontWeight:planVue===v.id?700:500,background:planVue===v.id?ACC+'15':'transparent',color:planVue===v.id?ACC:$textMut,border:planVue===v.id?`1px solid ${ACC}40`:'1px solid transparent',cursor:'pointer',transition:'all 0.15s'}}>{v.icon} {v.label}</button>
                ))}
                <div style={{flex:1}}/>
                <input value={planSearch} onChange={e=>setPlanSearch(e.target.value)} placeholder="⌕ Rechercher..." style={{padding:'5px 10px',borderRadius:crmRd,fontSize:'0.82rem',border:`1px solid ${$border}`,background:$bgCard,width:150,outline:'none'}} />
                <select value={planFiltreResp} onChange={e=>setPlanFiltreResp(e.target.value)} style={{padding:'5px 8px',borderRadius:crmRd,fontSize:'0.8rem',border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',outline:'none'}}>
                  <option value="tous">Phase : Toutes</option>
                  <option value="preparation">✱ Préparation</option>
                  <option value="soumission">↥ Soumission</option>
                  <option value="resultat">★ Résultat</option>
                </select>
                <select value={planFiltrePrio} onChange={e=>setPlanFiltrePrio(e.target.value)} style={{padding:'5px 8px',borderRadius:crmRd,fontSize:'0.8rem',border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',outline:'none'}}>
                  <option value="tous">Priorité : Toutes</option>
                  <option value="Critique !">Critique !</option>
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
                </select>
                <span style={{fontSize:'0.78rem',color:$textMut,marginLeft:4}}>{planVue==='gantt'?filteredGantt.length:filteredPL.length} AO</span>
              </div>
              {/* ── GANTT ── */}
              {planVue === 'gantt' && (
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden'}}>
                  <div style={{display:'flex',borderBottom:`1px solid ${$border}`,background:$bgSub,position:'sticky',top:52,zIndex:10}}>
                    <div style={{width:330,flexShrink:0,padding:'8px 14px',fontSize:'0.7rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em',borderRight:`1px solid ${$border}`,display:'flex',alignItems:'center',gap:8}}>
                      <span>AO / MOA</span>
                      <span style={{marginLeft:'auto',fontSize:'0.65rem',fontWeight:500,opacity:0.7}}>→ cliquer pour détails</span>
                    </div>
                    <div style={{flex:1,position:'relative',height:32}}>
                      {monthsPL.map((m,i) => (<div key={i} style={{position:'absolute',left:m.pct+'%',top:0,bottom:0,display:'flex',alignItems:'center',paddingLeft:4}}><span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut,whiteSpace:'nowrap'}}>{m.label}</span></div>))}
                      {monthsPL.map((m,i) => i>0&&(<div key={i} style={{position:'absolute',left:m.pct+'%',top:0,bottom:0,width:1,background:$border}}></div>))}
                      <div style={{position:'absolute',left:todayPctPL+'%',top:0,bottom:0,width:2,background:'#dc2626',opacity:0.8}}></div>
                    </div>
                    <div style={{width:72,flexShrink:0,borderLeft:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem',fontWeight:700,color:$textMut,textTransform:'uppercase'}}>Phase</div>
                  </div>
                  {filteredGantt.length===0&&<div style={{padding:'32px',textAlign:'center',color:$textMut,fontSize:'0.85rem'}}>Aucun AO avec deadline dans la période affichée</div>}
                  {filteredGantt.map((ao,i) => { const dl=dlLeft(ao.d); const barP=pctPL(ao.d); const barW=Math.max(0.5,(barP||0)-todayPctPL); const urgent=dl!==null&&dl>=0&&dl<=7; const warn=dl!==null&&dl>=0&&dl<=14; const barColor=urgent?'#dc2626':warn?'#f59e0b':SC_PL[ao.s]||'#7c3aed'; const tmCfg=TM_PL[ao.tm]||{c:'#6b7280',bg:'#f3f4f6',e:'☰'}; const isSelected=planDetailId===ao.id; const phId=getPhaseAO(ao.s); const phCfg=AO_PHASES_PL.find(p=>p.id===phId)||{color:$textSec,bg:'#f3f4f6',icon:'🗄️'}; const aoBrief=ao.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,48);
                    return (<React.Fragment key={ao.id}>
                      <div onClick={e=>{e.stopPropagation();setPlanDetailId(isSelected?null:ao.id);}} style={{display:'flex',borderBottom:`1px solid ${$border}`,minHeight:50,alignItems:'stretch',cursor:'pointer',background:isSelected?barColor+'08':i%2===0?'transparent':$bgSub+'50',borderLeft:isSelected?`3px solid ${barColor}`:'3px solid transparent'}} onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.background=$bgSub+'90';}} onMouseLeave={e=>{if(!isSelected)e.currentTarget.style.background=i%2===0?'transparent':$bgSub+'50';}}>
                        <div style={{width:327,flexShrink:0,padding:'8px 12px',borderRight:`1px solid ${$border}`,display:'flex',flexDirection:'column',justifyContent:'center',gap:3}}>
                          <div style={{fontSize:'0.76rem',fontWeight:600,color:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={ao.n}>{aoBrief}</div>
                          <div style={{display:'flex',alignItems:'center',gap:4}}>
                            <span style={{fontSize:'0.64rem',padding:'1px 5px',borderRadius:3,background:tmCfg.bg,color:tmCfg.c,fontWeight:600}}>{tmCfg.e} {ao.tm?.replace('Marché ','')}</span>
                            {ao.b>0&&<span style={{fontSize:'0.64rem',fontWeight:600,color:'#7c3aed'}}>{fmtMPL(ao.b)}</span>}
                            {ao.p&&<span style={{fontSize:'0.62rem',color:$textMut}}>{ao.p}</span>}
                          </div>
                        </div>
                        <div style={{flex:1,position:'relative',display:'flex',alignItems:'center'}}>
                          {monthsPL.map((m,mi)=>mi>0&&(<div key={mi} style={{position:'absolute',left:m.pct+'%',top:0,bottom:0,width:1,background:$border,opacity:0.35}}></div>))}
                          <div style={{position:'absolute',left:todayPctPL+'%',top:0,bottom:0,width:2,background:'#dc2626',opacity:0.3}}></div>
                          {ao.d&&barP!==null&&barP>0&&(<>
                            <div style={{position:'absolute',left:pctBarStart(ao)+'%',width:Math.max(0.5,(barP||0)-pctBarStart(ao))+'%',top:'50%',transform:'translateY(-50%)',height:16,background:barColor,borderRadius:3,opacity:0.82,display:'flex',alignItems:'center',paddingLeft:4,paddingRight:4,overflow:'hidden'}}>
                              {Math.max(0.5,(barP||0)-pctBarStart(ao))>4&&<span style={{fontSize:'0.58rem',fontWeight:700,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{dl!==null?(dl<0?'▲ Passé':(dl===0?'Auj.':dl+'j')):'—'}</span>}
                            </div>
                            <div style={{position:'absolute',left:`calc(${barP}% - 1px)`,top:'15%',bottom:'15%',width:2,background:barColor,borderRadius:2}}></div>
                            <div style={{position:'absolute',left:(barP+0.5)+'%',top:'50%',transform:'translateY(-50%)',whiteSpace:'nowrap'}}>
                              <span style={{fontSize:'0.66rem',fontWeight:700,color:dlColorPL(dl)}}>{fmtDPL(ao.d)}</span>
                            </div>
                          </>)}
                        </div>
                        <div style={{width:72,flexShrink:0,borderLeft:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 3px'}}>
                          <span style={{fontSize:'0.6rem',padding:'2px 4px',borderRadius:3,background:phCfg.bg,color:phCfg.color,fontWeight:700,textAlign:'center',lineHeight:1.3,wordBreak:'break-word'}}>{phCfg.icon} {phCfg.id?.toUpperCase().slice(0,5)}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div style={{padding:'14px 18px',background:barColor+'06',borderBottom:`1px solid ${$border}`,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                          {[['Objet',ao.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,''),'#111'],['MOA / Client',ao.m,$text],['Type marché',ao.tm,TM_PL[ao.tm]?.c||'#444'],['Type projet',ao.tp||'—',$text],['Deadline',fmtDPL(ao.d)+(dl!==null&&dl>=0?' ('+dl+'j)':dl<0?' (passé)':''),dlColorPL(dl)],['Budget MOA',fmtMPL(ao.b),'#7c3aed'],['Montant offre',fmtMPL(ao.o),'#059669'],['Priorité',ao.p||'—',$text]].map(([lbl,val,col],idx) => (
                            <div key={idx}><div style={{fontSize:'0.65rem',fontWeight:700,color:$textMut,textTransform:'uppercase',marginBottom:3}}>{lbl}</div><div style={{fontSize:'0.8rem',fontWeight:600,color:col,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:idx===0?'normal':'nowrap'}}>{val}</div></div>
                          ))}
                        </div>
                      )}
                    </React.Fragment>);
                  })}
                  <div style={{display:'flex',alignItems:'center',gap:14,padding:'10px 16px',background:$bgSub,borderTop:`1px solid ${$border}`}}>
                    <span style={{fontSize:'0.72rem',fontWeight:600,color:$textMut}}>Urgence :</span>
                    {[{c:'#dc2626',l:'≤ 7j ▲'},{c:'#f59e0b',l:'≤ 14j'},{c:ACC,l:'> 14j'}].map(l=>(
                      <div key={l.l} style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:12,height:7,borderRadius:2,background:l.c,display:'inline-block'}}></span><span style={{fontSize:'0.72rem',color:$text}}>{l.l}</span></div>
                    ))}
                    <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:4}}><span style={{width:2,height:14,background:'#dc2626',display:'inline-block',borderRadius:1}}></span><span style={{fontSize:'0.72rem',color:'#dc2626',fontWeight:600}}>Aujourd'hui (13/03/2026)</span></div>
                  </div>
                </div>
              )}
              {/* ── TABLEAU ── */}
              {planVue === 'tableau' && (
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.79rem',minWidth:900}}>
                    <thead>
                      <tr style={{background:$bgSub,borderBottom:`2px solid ${$border}`,position:'sticky',top:0}}>
                        {[{l:'#',k:'num'},{l:'Objet AO',k:'objet'},{l:'Statut',k:'statut'},{l:'Phase',k:'phase'},{l:'Priorité',k:'prio'},{l:'Deadline',k:'deadline'},{l:'Offre',k:'offre'},{l:'Resp.',k:'resp'},{l:'Visite',k:'visite'}].map((h,i) => (
                          <th key={i} style={{padding:'8px 10px',textAlign:'left',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',whiteSpace:'nowrap',borderRight:i<8?`1px solid ${$border}`:'none',minWidth:planColWidths[h.k]||60,width:planColWidths[h.k]||undefined,position:'relative'}}>
                            {h.l}
                            <div style={{position:'absolute',right:0,top:0,bottom:0,width:5,cursor:'col-resize',background:'transparent'}} onMouseDown={(ev)=>{ev.preventDefault();ev.stopPropagation();const cid=h.k;const startX=ev.clientX;const startW=planColWidths[cid]||80;const onMv=(e)=>setPlanColWidths(p=>({...p,[cid]:Math.max(30,startW+e.clientX-startX)}));const onUp=()=>{document.removeEventListener('mousemove',onMv);document.removeEventListener('mouseup',onUp);document.body.style.cursor='';document.body.style.userSelect='';};document.addEventListener('mousemove',onMv);document.addEventListener('mouseup',onUp);document.body.style.cursor='col-resize';document.body.style.userSelect='none';}} onMouseOver={e=>e.currentTarget.style.background='#007ab540'} onMouseOut={e=>e.currentTarget.style.background='transparent'}/>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPL.map((ao,i) => { const dl=dlLeft(ao.d); const sc=SC_PL[ao.s]||'#9ca3af'; const phId=getPhaseAO(ao.s); const phCfg=AO_PHASES_PL.find(p=>p.id===phId)||{color:$textSec,bg:'#f3f4f6',icon:'🗄️',label:'ARCHIVÉ'}; const tmCfg=TM_PL[ao.tm]||{c:'#6b7280',bg:'#f3f4f6',e:'☰'}; const aoBrief=ao.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,52);
                        return (
                          <tr key={ao.id} style={{borderBottom:`1px solid ${$border}`,background:i%2===0?'transparent':$bgSub+'40'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub+'80'} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?'transparent':$bgSub+'40'}>
                            <td style={{padding:'7px 9px',color:$textMut,fontSize:'0.68rem',fontWeight:700,fontFamily:'monospace',borderRight:`1px solid ${$border}`,width:30}}>{i+1}</td>
                            <td style={{padding:'7px 9px',maxWidth:260,borderRight:`1px solid ${$border}`}}><div style={{fontSize:'0.76rem',fontWeight:500,color:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={ao.n}>{aoBrief}</div><div style={{fontSize:'0.66rem',color:$textMut,marginTop:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ao.m}</div></td>
                            <td style={{padding:'7px 9px',borderRight:`1px solid ${$border}`}}><span style={{fontSize:'0.66rem',padding:'2px 6px',borderRadius:3,background:sc+'22',color:sc,fontWeight:700,whiteSpace:'nowrap'}}>{ao.s}</span></td>
                            <td style={{padding:'7px 9px',borderRight:`1px solid ${$border}`}}><span style={{fontSize:'0.64rem',padding:'1px 5px',borderRadius:3,background:phCfg.bg,color:phCfg.color,fontWeight:700,whiteSpace:'nowrap'}}>{phCfg.icon} {phCfg.label}</span></td>
                            <td style={{padding:'7px 9px',borderRight:`1px solid ${$border}`}}>{ao.p&&<span style={{fontSize:'0.7rem',fontWeight:600,color:ao.p==='Critique !'?'#111':ao.p==='Haute'?'#7c3aed':ao.p==='Moyenne'?'#2563eb':'#64748b'}}>{ao.p}</span>}</td>
                            <td style={{padding:'7px 9px',borderRight:`1px solid ${$border}`}}><div style={{display:'flex',flexDirection:'column',gap:1}}><span style={{fontSize:'0.74rem',fontWeight:700,color:dlColorPL(dl)}}>{fmtDPL(ao.d)}</span>{dl!==null&&dl>=0&&<span style={{fontSize:'0.63rem',fontWeight:700,color:dlColorPL(dl)}}>{dl===0?'Auj.':dl+'j'}</span>}</div></td>
                            <td style={{padding:'7px 9px',textAlign:'right',fontSize:'0.74rem',fontWeight:700,color:'#059669',borderRight:`1px solid ${$border}`,whiteSpace:'nowrap'}}>{fmtMPL(ao.o)}</td>
                            {(() => { const ext=getExt(ao.id); const nm=(ext.r||'David LEMAIRE').split(',')[0].trim().split(' '); const ini=(nm[0]?.[0]||'')+(nm[1]?.[0]||''); return (<td style={{padding:'7px 9px',borderRight:`1px solid ${$border}`}} title={ext.r}><div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:18,height:18,borderRadius:3,background:'#007ab520',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.55rem',fontWeight:800,color:'#007ab5'}}>{ini.toUpperCase()}</div><span style={{fontSize:'0.68rem',color:$textMut,whiteSpace:'nowrap'}}>{nm[1]||nm[0]}</span></div></td>); })()}
                            {(() => { const ext=getExt(ao.id); return (<td style={{padding:'7px 9px'}}>{ext.vo==='Oui'?<span style={{padding:'2px 5px',borderRadius:3,background:'#dc262612',color:'#dc2626',fontSize:'0.64rem',fontWeight:700}}>OBL</span>:ext.vo==='Conseillée'?<span style={{padding:'2px 5px',borderRadius:3,background:'#f59e0b12',color:'#d97706',fontSize:'0.64rem',fontWeight:700}}>CSL</span>:<span style={{color:$textMut,fontSize:'0.7rem'}}>—</span>}</td>); })()}
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot><tr style={{background:$bgSub,borderTop:`2px solid ${$border}`}}>
                      <td colSpan={7} style={{padding:'8px 10px',fontSize:'0.73rem',fontWeight:700,color:$textSec}}>Total ({filteredPL.length} AO)</td>
                      <td style={{padding:'8px 9px',textAlign:'right',fontSize:'0.75rem',fontWeight:800,color:'#059669'}}>{fmtMPL(filteredPL.reduce((s,a)=>s+(a.o||0),0))}</td>
                      <td colSpan={2} style={{padding:'8px 9px',fontSize:'0.68rem',color:$textMut}}>{filteredPL.filter(a=>getExt(a.id).vo==='Oui').length} visites oblig.</td>
                    </tr></tfoot>
                  </table>
                </div>
              )}
              {/* ── KANBAN ── */}
              {planVue === 'kanban' && (
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
                  {AO_PHASES_PL.map(phase => {
                    const pAOs = aoActifsPL.filter(a => getPhaseAO(a.s)===phase.id);
                    const pfiltAOs = pAOs.filter(a => { if(!planSearch) return true; const s=planSearch.toLowerCase(); return a.n.toLowerCase().includes(s)||a.m.toLowerCase().includes(s); });
                    return (
                      <div key={phase.id} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden'}}>
                        <div style={{padding:'10px 14px',borderBottom:`2px solid ${phase.color}`,background:phase.bg,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                          <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:'1rem'}}>{phase.icon}</span><span style={{fontWeight:700,fontSize:'0.84rem',color:phase.color}}>{phase.label}</span></div>
                          <span style={{padding:'2px 8px',borderRadius:10,background:phase.color+'22',color:phase.color,fontWeight:700,fontSize:'0.74rem'}}>{pfiltAOs.length}</span>
                        </div>
                        <div style={{padding:'8px',display:'flex',flexDirection:'column',gap:5,maxHeight:460,overflowY:'auto'}}>
                          {pfiltAOs.length===0&&<div style={{textAlign:'center',padding:'20px',color:$textMut,fontSize:'0.8rem'}}>Aucun AO</div>}
                          {pfiltAOs.map(ao => { const dl=dlLeft(ao.d); const sc=SC_PL[ao.s]||'#9ca3af'; const tmCfg=TM_PL[ao.tm]||{c:'#6b7280',bg:'#f3f4f6',e:'☰'}; const aoBrief=ao.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,42);
                            return (
                              <div key={ao.id} style={{background:$bg,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'9px 11px',borderLeft:`3px solid ${sc}`,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background=$bg}>
                                <div style={{fontSize:'0.76rem',fontWeight:600,color:$text,marginBottom:4,lineHeight:1.3}}>{aoBrief}</div>
                                <div style={{fontSize:'0.68rem',color:$textMut,marginBottom:5,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ao.m}</div>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:3}}>
                                  <span style={{fontSize:'0.63rem',padding:'1px 5px',borderRadius:3,background:tmCfg.bg,color:tmCfg.c,fontWeight:600}}>{tmCfg.e} {ao.tm?.replace('Marché ','')}</span>
                                  {ao.d&&<span style={{fontSize:'0.68rem',fontWeight:700,color:dlColorPL(dl)}}>{fmtDPL(ao.d)}{dl!==null&&dl>=0?' ('+dl+'j)':''}</span>}
                                </div>
                                <div style={{marginTop:4,display:'flex',alignItems:'center',gap:3,flexWrap:'wrap',justifyContent:'space-between'}}>
                                  <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
                                    <span style={{fontSize:'0.62rem',padding:'1px 5px',borderRadius:3,background:sc+'22',color:sc,fontWeight:700}}>{ao.s}</span>
                                    {ao.o>0&&<span style={{fontSize:'0.62rem',fontWeight:600,color:'#059669'}}>{fmtMPL(ao.o)}</span>}
                                    {(() => { const ext=getExt(ao.id); return ext.vo==='Oui'?<span style={{fontSize:'0.6rem',padding:'1px 4px',borderRadius:3,background:'#dc262615',color:'#dc2626',fontWeight:700}}>◎ OBL</span>:null; })()}
                                  </div>
                                  {(() => { const ext=getExt(ao.id); const nm=(ext.r||'DL').split(',')[0].trim().split(' '); const ini=(nm[0]?.[0]||'')+(nm[1]?.[0]||''); return (<div title={ext.r} style={{width:16,height:16,borderRadius:2,background:ACC+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.5rem',fontWeight:800,color:ACC}}>{ini.toUpperCase()||'DL'}</div>); })()}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{padding:'7px 12px',borderTop:`1px solid ${$border}`,background:$bgSub,display:'flex',justifyContent:'space-between',fontSize:'0.7rem',color:$textMut}}>
                          <span>Budget : {fmtMPL(pAOs.reduce((s,a)=>s+(a.b||0),0))}</span>
                          <span>Offres : {fmtMPL(pAOs.reduce((s,a)=>s+(a.o||0),0))}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>);
          }
          // ═══ FIN BRANCHE ETUDES PLANNING ═══

          // ── Helpers ──
          const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
          const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().split('T')[0]; };
          const fmtDate = (d) => d ? d.split('-').reverse().join('/') : '—';
          const getPhase = (id) => PLAN_PHASES.find(p => p.id === id) || PLAN_PHASES[0];
          const getStatut = (id) => PLAN_STATUTS.find(s => s.id === id) || PLAN_STATUTS[0];
          const getBarColor = (p) => {
            if (planBarColor === 'statut') return getStatut(p.statut).color;
            if (planBarColor === 'priorite') return p.priorite === 'Haute' ? '#e74c3c' : p.priorite === 'Moyenne' ? '#f39c12' : '#3498db';
            if (planBarColor === 'responsable') { const rc = {'Bureau Études':'#3498db','Direction':'#9b59b6','Commercial':'#e67e22'}; return rc[p.responsable] || '#64748b'; }
            return getPhase(p.phase).color;
          };

          // ── Filtrage ──
          let filtered = [...planProjets];
          if (planSearch) { const s = planSearch.toLowerCase(); filtered = filtered.filter(p => p.nom.toLowerCase().includes(s) || p.client.toLowerCase().includes(s) || (p.aoRef||'').toLowerCase().includes(s)); }
          if (planFiltreStatut.length > 0) filtered = filtered.filter(p => planFiltreStatut.includes(p.statut));
          if (planFiltrePhase.length > 0) filtered = filtered.filter(p => planFiltrePhase.includes(p.phase));
          if (planFiltreResp !== 'tous') filtered = filtered.filter(p => p.responsable === planFiltreResp);
          if (planFiltrePrio !== 'tous') filtered = filtered.filter(p => p.priorite === planFiltrePrio);

          // ── KPIs ──
          const kpiActifs = planProjets.filter(p => p.statut === 'en_cours').length;
          const kpiRetard = planProjets.filter(p => p.statut === 'en_retard').length;
          const kpiAVenir = planProjets.filter(p => p.statut === 'planifie').length;
          const kpiTermines = planProjets.filter(p => p.statut === 'termine').length;
          const kpiPipeline = planProjets.filter(p => p.statut !== 'termine').reduce((s, p) => s + p.montant, 0);

          // ── Groupement ──
          const getGrouped = () => {
            if (planGroupBy === 'none') return [{ key:'all', label:'Tous les projets', color:$textSec, icon:'☰', items:filtered }];
            if (planGroupBy === 'phase') return PLAN_PHASES.filter(ph => filtered.some(p => p.phase === ph.id)).map(ph => ({ key:ph.id, label:ph.label, color:ph.color, icon:ph.icon, items:filtered.filter(p => p.phase === ph.id) }));
            if (planGroupBy === 'statut') return PLAN_STATUTS.filter(st => filtered.some(p => p.statut === st.id)).map(st => ({ key:st.id, label:st.label, color:st.color, icon:st.icon, items:filtered.filter(p => p.statut === st.id) }));
            if (planGroupBy === 'priorite') return ['Haute','Moyenne','Basse'].filter(pr => filtered.some(p => p.priorite === pr)).map(pr => ({ key:pr, label:pr, color: pr==='Haute'?'#e74c3c':pr==='Moyenne'?'#f39c12':'#3498db', icon: pr==='Haute'?'▲':pr==='Moyenne'?'●':'▽', items:filtered.filter(p => p.priorite === pr) }));
            if (planGroupBy === 'responsable') { const rs = [...new Set(filtered.map(p=>p.responsable))].sort(); return rs.map(r => ({ key:r, label:r, color:$textSec, icon:'◉', items:filtered.filter(p => p.responsable === r) })); }
            if (planGroupBy === 'client') { const cs = [...new Set(filtered.map(p=>p.client))].sort(); return cs.map(c => ({ key:c, label:c, color:$textSec, icon:'▪', items:filtered.filter(p => p.client === c) })); }
            return [{ key:'all', label:'Tous', color:$textSec, icon:'☰', items:filtered }];
          };

          // ── Gantt Timeline Calc ──
          const earliestDate = filtered.reduce((min, p) => p.dateDebut < min ? p.dateDebut : min, filtered[0]?.dateDebut || todayStr);
          const latestDate = filtered.reduce((max, p) => p.dateFin > max ? p.dateFin : max, filtered[0]?.dateFin || todayStr);
          const earlyD = new Date(earliestDate);
          const baseDate = new Date(earlyD.getFullYear(), earlyD.getMonth() + planOffset, 1);
          const totalMonthsNeeded = Math.ceil(daysBetween(earliestDate, latestDate) / 30) + 4;
          const zoomConfig = {
            jour: { cols:Math.max(42, totalMonthsNeeded*30), cellW:36, getLabel:(i)=>{ const d=new Date(baseDate); d.setDate(i+1); return d.getDate(); }, getTopLabel:(i)=>{ const d=new Date(baseDate); d.setDate(i+1); return moisNoms[d.getMonth()]+' '+d.getFullYear(); }, isWeekend:(i)=>{ const d=new Date(baseDate); d.setDate(i+1); return d.getDay()===0||d.getDay()===6; }, getDate:(i)=>{ const d=new Date(baseDate); d.setDate(i+1); return d.toISOString().split('T')[0]; }, getDayName:(i)=>{ const d=new Date(baseDate); d.setDate(i+1); return ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()]; } },
            semaine: { cols:Math.max(36, totalMonthsNeeded*4), cellW:60, getLabel:(i)=>{ const d=new Date(baseDate); d.setDate(d.getDate()+i*7); return 'S'+(Math.ceil((d.getDate())/7)); }, getTopLabel:(i)=>{ const d=new Date(baseDate); d.setDate(d.getDate()+i*7); return moisNoms[d.getMonth()]+' '+d.getFullYear(); }, isWeekend:()=>false, getDate:(i)=>{ const d=new Date(baseDate); d.setDate(d.getDate()+i*7); return d.toISOString().split('T')[0]; } },
            mois: { cols:Math.max(24, totalMonthsNeeded), cellW:90, getLabel:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i, 1); return moisNoms[d.getMonth()]; }, getTopLabel:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i, 1); return String(d.getFullYear()); }, isWeekend:()=>false, getDate:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i, 1); return d.toISOString().split('T')[0]; } },
            trimestre: { cols:Math.max(12, Math.ceil(totalMonthsNeeded/3)), cellW:140, getLabel:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i*3, 1); return 'T'+Math.floor(d.getMonth()/3+1); }, getTopLabel:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i*3, 1); return String(d.getFullYear()); }, isWeekend:()=>false, getDate:(i)=>{ const d=new Date(baseDate.getFullYear(), baseDate.getMonth()+i*3, 1); return d.toISOString().split('T')[0]; } },
          };
          const zc = zoomConfig[planZoom];
          const timelineStart = baseDate.toISOString().split('T')[0];
          const getBarPos = (proj) => {
            const daysPerCol = planZoom === 'jour' ? 1 : planZoom === 'semaine' ? 7 : planZoom === 'mois' ? 30.44 : 91.3;
            const startDiff = daysBetween(timelineStart, proj.dateDebut);
            const dur = daysBetween(proj.dateDebut, proj.dateFin);
            const left = (startDiff / daysPerCol) * zc.cellW;
            const width = Math.max(zc.cellW * 0.3, (dur / daysPerCol) * zc.cellW);
            return { left, width };
          };
          const getTodayPos = () => {
            const daysPerCol = planZoom === 'jour' ? 1 : planZoom === 'semaine' ? 7 : planZoom === 'mois' ? 30.44 : 91.3;
            const diff = daysBetween(timelineStart, todayStr);
            return (diff / daysPerCol) * zc.cellW;
          };
          const todayX = getTodayPos();
          const totalW = zc.cols * zc.cellW;

          // ── Detail panel ──
          const detailProjet = planDetailId ? planProjets.find(p => p.id === planDetailId) : null;

          return (<div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}} onClick={() => setPlanDetailId(null)}>

                                    {/* KPI Cards */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:20}}>
              {[
                { label:'PROJETS ACTIFS', value:kpiActifs, color:'#3498db' },
                { label:'EN RETARD', value:kpiRetard, color:'#e74c3c' },
                { label:'À VENIR', value:kpiAVenir, color:'#f39c12' },
                { label:'TERMINÉS', value:kpiTermines, color:'#27ae60' },
                { label:'PIPELINE', value:(kpiPipeline/1000000).toFixed(1)+'M€', color:'#9b59b6' },
              ].map((k,i) => (
                <div key={i} style={{background:'#fff', borderRadius:crmRd, padding:'14px 16px', border:`1px solid ${$border}`, borderTop:`3px solid ${k.color}`}}>
                  <div style={{fontSize:'0.7rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4}}>{k.label}</div>
                  <div style={{fontSize:'1.4rem', fontWeight:800, color:k.color}}>{k.value}</div>
                </div>
              ))}
            </div>

            {/* Vue tabs */}
            <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:12, borderBottom:`1px solid ${$border}`, paddingBottom:8}}>
              {[{id:'gantt',icon:'▦',label:'Gantt'},{id:'tableau',icon:'☰',label:'Tableau'},{id:'kanban',icon:'▸',label:'Kanban'}].map(v => (
                <button key={v.id} onClick={() => setPlanVue(v.id)} style={{padding:'6px 14px', borderRadius:crmRd, fontSize:'0.85rem', fontWeight: planVue===v.id?700:500, background:planVue===v.id?ACC+'15':'transparent',color:planVue===v.id?ACC:$textMut,border:planVue===v.id?`1px solid ${ACC}40`:'1px solid transparent', cursor:'pointer', transition:'all 0.15s'}}>{v.icon} {v.label}</button>
              ))}
              <div style={{flex:1}}/>
              {planVue === 'gantt' && <>
                <div style={{display:'flex', gap:2, background:$bgSub, borderRadius:crmRd, padding:2}}>
                  {['jour','semaine','mois','trimestre'].map(z => (
                    <button key={z} onClick={() => setPlanZoom(z)} style={{padding:'4px 8px', borderRadius:crmRd, fontSize:'0.75rem', fontWeight:planZoom===z?600:400, background:planZoom===z?'#fff':'transparent', color:planZoom===z?'#ea580c':'#b0a08a', border:planZoom===z?`1px solid ${$border}`:'1px solid transparent', cursor:'pointer', textTransform:'capitalize'}}>{z}</button>
                  ))}
                </div>
                <button onClick={() => setPlanOffset(o=>o-1)} style={{padding:'4px 8px', borderRadius:crmRd, fontSize:'0.8rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer'}}>◀</button>
                <button onClick={() => setPlanOffset(0)} style={{padding:'4px 10px', borderRadius:crmRd, fontSize:'0.75rem', fontWeight:600, border:'1px solid #fed7aa', background:'#fff7ed', color:'#ea580c', cursor:'pointer'}}>Aujourd'hui</button>
                <button onClick={() => setPlanOffset(o=>o+1)} style={{padding:'4px 8px', borderRadius:crmRd, fontSize:'0.8rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer'}}>▶</button>
              </>}
            </div>
            {/* Filter bar */}
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16, flexWrap:'wrap'}}>
              <input value={planSearch} onChange={e => setPlanSearch(e.target.value)} placeholder="⌕ Rechercher..." style={{padding:'5px 10px', borderRadius:crmRd, fontSize:'0.82rem', border:`1px solid ${$border}`, background:'#fff', width:160, outline:'none'}} />
              <select value={planFiltrePrio} onChange={e => setPlanFiltrePrio(e.target.value)} style={{padding:'5px 10px', borderRadius:crmRd, fontSize:'0.82rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer', outline:'none'}}>
                <option value="tous">Priorité : Tous</option>
                <option value="Haute">▲ Haute</option><option value="Moyenne">● Moyenne</option><option value="Basse">▽ Basse</option>
              </select>
              <select value={planFiltreResp} onChange={e => setPlanFiltreResp(e.target.value)} style={{padding:'5px 10px', borderRadius:crmRd, fontSize:'0.82rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer', outline:'none'}}>
                <option value="tous">Responsable : Tous</option>
                {[...new Set(planProjets.map(p=>p.responsable))].sort().map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {planVue !== 'kanban' && <select value={planGroupBy} onChange={e => { setPlanGroupBy(e.target.value); setPlanGroupesFermes([]); }} style={{padding:'5px 10px', borderRadius:crmRd, fontSize:'0.82rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer', outline:'none'}}>
                <option value="none">Grouper : Aucun</option>
                <option value="phase">Phase</option><option value="statut">Statut</option><option value="priorite">Priorité</option><option value="responsable">Responsable</option><option value="client">Client</option>
              </select>}
              {planVue === 'gantt' && <select value={planBarColor} onChange={e => setPlanBarColor(e.target.value)} style={{padding:'5px 10px', borderRadius:crmRd, fontSize:'0.82rem', border:`1px solid ${$border}`, background:'#fff', cursor:'pointer', outline:'none'}}>
                <option value="phase">✎ Couleur : Phase</option><option value="statut">Statut</option><option value="priorite">Priorité</option><option value="responsable">Responsable</option>
              </select>}
              <span style={{fontSize:'0.78rem', color:$textMut, marginLeft:4}}>{filtered.length} projet{filtered.length>1?'s':''}</span>
            </div>

            {/* ════ VUE GANTT ════ */}
            {planVue === 'gantt' && (
              <div style={{background:'#fff', borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                <div style={{display:'flex', overflow:'hidden'}}>
                  {/* Left panel */}
                  <div style={{width:260, flexShrink:0, borderRight:'2px solid #f0ebe3', background:'#fefdfb'}}>
                    <div style={{padding:'8px 12px', borderBottom:`2px solid ${$border}`, fontSize:'0.78rem', fontWeight:700, color:$textSec, background:$bgSub, height:55, display:'flex', alignItems:'center'}}>Projet</div>
                    {getGrouped().map(grp => {
                      const isFerme = planGroupesFermes.includes(grp.key);
                      return (<div key={grp.key}>
                        {planGroupBy !== 'none' && <div onClick={() => setPlanGroupesFermes(prev => prev.includes(grp.key) ? prev.filter(k=>k!==grp.key) : [...prev, grp.key])} style={{display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:$bgSub, borderBottom:`1px solid ${$border}`, cursor:'pointer', userSelect:'none'}}>
                          <svg width="8" height="8" viewBox="0 0 8 8" style={{transform:isFerme?'rotate(-90deg)':'rotate(0deg)', transition:'0.15s'}}><path d="M1.5 2l2.5 3 2.5-3" fill={grp.color}/></svg>
                          <span style={{fontSize:'0.78rem', fontWeight:700, color:grp.color}}>{grp.icon} {grp.label}</span>
                          <span style={{fontSize:'0.7rem', fontWeight:600, color:'#fff', background:grp.color, padding:'0 6px', borderRadius:crmRd}}>{grp.items.length}</span>
                        </div>}
                        {!isFerme && grp.items.map(p => (
                          <div key={p.id} onClick={e => { e.stopPropagation(); setPlanDetailId(p.id); }} style={{padding:'6px 12px', borderBottom:`1px solid ${$border}`, cursor:'pointer', height:40, display:'flex', flexDirection:'column', justifyContent:'center', background: planDetailId===p.id?'#fff7ed':'transparent'}} className="hover:bg-gray-50">
                            <div style={{fontSize:'0.8rem', fontWeight:600, color:$text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.nom}</div>
                            <div style={{fontSize:'0.7rem', color:$textMut}}>{p.client}</div>
                          </div>
                        ))}
                      </div>);
                    })}
                  </div>
                  {/* Right timeline */}
                  <div style={{flex:1, overflowX:'scroll', overflowY:'hidden'}} onWheel={e => { if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) { e.currentTarget.scrollLeft += e.deltaY; } }}>
                    <div style={{minWidth:totalW, position:'relative'}}>
                      {/* Dual Header */}
                      {(() => {
                        // Build top-row groups
                        const topGroups = [];
                        for (let i = 0; i < zc.cols; i++) {
                          const lbl = zc.getTopLabel(i);
                          if (topGroups.length > 0 && topGroups[topGroups.length-1].label === lbl) {
                            topGroups[topGroups.length-1].span++;
                          } else {
                            topGroups.push({ label:lbl, span:1, startIdx:i });
                          }
                        }
                        return (<div style={{borderBottom:`2px solid ${$border}`, background:$bgSub}}>
                          {/* Top row — Year / Month groups */}
                          <div style={{display:'flex', height:24, borderBottom:`1px solid ${$border}`}}>
                            {topGroups.map((g,gi) => (
                              <div key={gi} style={{width:g.span * zc.cellW, minWidth:g.span * zc.cellW, textAlign:'center', fontSize:'0.72rem', fontWeight:800, color:$textSec, lineHeight:'24px', borderRight:'1px solid #e2e8f0', background: gi%2===0?'#f0ebe3':'#faf8f5', letterSpacing:'0.03em'}}>{g.label}</div>
                            ))}
                          </div>
                          {/* Bottom row — individual labels */}
                          <div style={{display:'flex', height:28}}>
                            {Array.from({length:zc.cols}).map((_,i) => {
                              const isWe = zc.isWeekend(i);
                              const isToday = zc.getDate && zc.getDate(i) === todayStr;
                              return (<div key={i} style={{width:zc.cellW, minWidth:zc.cellW, textAlign:'center', borderRight:`1px solid ${$border}`, background: isToday?'#fff7ed':isWe?'#fefdfb':'transparent', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative'}}>
                                <div style={{fontSize:'0.72rem', fontWeight: isToday?800:600, color: isToday?'#ea580c':isWe?'#c9b896':'#b0a08a'}}>{zc.getLabel(i)}</div>
                                {planZoom === 'jour' && zc.getDayName && <div style={{fontSize:'0.58rem', color: isWe?'#c9b896':'#b0b8c4', fontWeight:500, marginTop:-1}}>{zc.getDayName(i)}</div>}
                              </div>);
                            })}
                          </div>
                        </div>);
                      })()}
                      {/* Rows */}
                      {getGrouped().map(grp => {
                        const isFerme = planGroupesFermes.includes(grp.key);
                        return (<div key={grp.key}>
                          {planGroupBy !== 'none' && <div style={{height:28, background:$bgSub, borderBottom:`1px solid ${$border}`}} />}
                          {!isFerme && grp.items.map(p => {
                            const bar = getBarPos(p);
                            const barColor = getBarColor(p);
                            const daysLeft = daysBetween(todayStr, p.dateFin);
                            return (<div key={p.id} style={{position:'relative', height:40, borderBottom:`1px solid ${$border}`, background: planDetailId===p.id?'#fffbeb':'transparent'}}>
                              {/* Grid columns */}
                              {Array.from({length:zc.cols}).map((_,i) => (<div key={i} style={{position:'absolute', left:i*zc.cellW, top:0, bottom:0, width:zc.cellW, borderRight:'1px solid #faf8f5', background: zc.isWeekend(i)?'#fefdfb':'transparent'}} />))}
                              {/* Bar */}
                              <div onClick={e => { e.stopPropagation(); setPlanDetailId(p.id); }} style={{position:'absolute', top:8, left:bar.left, width:bar.width, height:24, borderRadius:crmRd, background:barColor+'25', border:`1px solid ${barColor}50`, cursor:'pointer', display:'flex', alignItems:'center', overflow:'hidden', transition:'all 0.15s', zIndex:2}}>
                                <div style={{height:'100%', width:(p.progression||0)+'%', background:barColor, borderRadius:crmRd, transition:'width 0.3s'}} />
                                <span style={{position:'absolute', left:6, fontSize:'0.68rem', fontWeight:700, color:$text, whiteSpace:'nowrap', textShadow:'0 0 3px #fff, 0 0 3px #fff'}}>{p.nom.length > 25 ? p.nom.substring(0,25)+'…' : p.nom}</span>
                                <span style={{position:'absolute', right:4, fontSize:'0.65rem', fontWeight:700, color:barColor, textShadow:'0 0 3px #fff'}}>{p.progression}%</span>
                              </div>
                              {/* Jalons */}
                              {p.jalons && p.jalons.map((j,ji) => {
                                const jDiff = daysBetween(timelineStart, j.date);
                                const dpc = planZoom === 'jour' ? 1 : planZoom === 'semaine' ? 7 : planZoom === 'mois' ? 30.44 : 91.3;
                                const jX = (jDiff / dpc) * zc.cellW;
                                return (<div key={ji} style={{position:'absolute', top:6, left:jX-6, zIndex:3}} title={j.label+' — '+fmtDate(j.date)}>
                                  <div style={{width:12, height:12, background: j.done?'#27ae60':'#e74c3c', transform:'rotate(45deg)', borderRadius:2, border:'2px solid #fff', boxShadow:'0 1px 3px rgba(0,0,0,0.15)'}} />
                                </div>);
                              })}
                            </div>);
                          })}
                        </div>);
                      })}
                      {/* Today line */}
                      {todayX > 0 && todayX < totalW && (
                        <div style={{position:'absolute', top:0, bottom:0, left:todayX, width:2, background:'#e74c3c', zIndex:10, pointerEvents:'none'}}>
                          <div style={{position:'absolute', top:0, left:-20, background:'#e74c3c', color:'#fff', fontSize:'0.65rem', fontWeight:700, padding:'1px 6px', borderRadius:crmRd}}>Auj.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Legend */}
                <div style={{display:'flex', alignItems:'center', gap:12, padding:'8px 16px', borderTop:`1px solid ${$border}`, fontSize:'0.75rem', color:$textMut, flexWrap:'wrap'}}>
                  <span style={{fontWeight:700}}>Légende :</span>
                  {(planBarColor === 'phase' ? PLAN_PHASES : planBarColor === 'statut' ? PLAN_STATUTS : planBarColor === 'priorite' ? [{id:'h',label:'Haute',color:'#e74c3c'},{id:'m',label:'Moyenne',color:'#f39c12'},{id:'b',label:'Basse',color:'#3498db'}] : [{id:'be',label:'Bureau Études',color:'#3498db'},{id:'dir',label:'Direction',color:'#9b59b6'},{id:'com',label:'Commercial',color:'#e67e22'}]).map(l => (
                    <span key={l.id} style={{display:'flex', alignItems:'center', gap:3}}><span style={{width:10, height:10, borderRadius:3, background:l.color, display:'inline-block'}} />{l.label}</span>
                  ))}
                  <span style={{display:'flex', alignItems:'center', gap:3, marginLeft:8}}><div style={{width:8, height:8, background:'#27ae60', transform:'rotate(45deg)', borderRadius:1}} /> Jalon OK</span>
                  <span style={{display:'flex', alignItems:'center', gap:3}}><div style={{width:8, height:8, background:'#e74c3c', transform:'rotate(45deg)', borderRadius:1}} /> Jalon à venir</span>
                </div>
              </div>
            )}

            {/* ════ VUE TABLEAU ════ */}
            {planVue === 'tableau' && (
              <div style={{background:'#fff', borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                {getGrouped().map(grp => {
                  const isFerme = planGroupesFermes.includes(grp.key);
                  return (<div key={grp.key} style={{borderBottom:`1px solid ${$border}`}}>
                    {planGroupBy !== 'none' && <div onClick={() => setPlanGroupesFermes(prev => prev.includes(grp.key) ? prev.filter(k=>k!==grp.key) : [...prev, grp.key])} style={{display:'flex', alignItems:'center', gap:8, padding:'8px 16px', background:'#fefdfb', cursor:'pointer', userSelect:'none', borderBottom: isFerme?'none':`1px solid ${$border}`}}>
                      <svg width="8" height="8" viewBox="0 0 8 8" style={{transform:isFerme?'rotate(-90deg)':'rotate(0deg)', transition:'0.15s'}}><path d="M1.5 2l2.5 3 2.5-3" fill={grp.color}/></svg>
                      <span style={{fontWeight:700, fontSize:'0.88rem', color:grp.color}}>{grp.icon} {grp.label}</span>
                      <span style={{fontSize:'0.75rem', fontWeight:600, color:'#fff', background:grp.color, padding:'1px 8px', borderRadius:crmRd}}>{grp.items.length}</span>
                      <span style={{fontSize:'0.75rem', color:$textMut, marginLeft:'auto'}}>{(grp.items.reduce((s,p)=>s+p.montant,0)/1000000).toFixed(1)}M€</span>
                    </div>}
                    {!isFerme && (<table style={{width:'100%', borderCollapse:'collapse'}}>
                      <thead><tr style={{background:$bgSub}}>
                        {['Réf.','Projet','Client','Phase','Statut','Priorité','Début','Fin','Progression','Montant','Responsable'].map(h => (
                          <th key={h} style={{position:'relative',padding:'6px 10px', fontSize:'0.75rem', fontWeight:700, color:$textMut, textAlign:'left', borderBottom:`1px solid ${$border}`, textTransform:'uppercase', letterSpacing:'0.05em'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                        ))}
                      </tr></thead>
                      <tbody>{grp.items.map(p => {
                        const ph = getPhase(p.phase); const st = getStatut(p.statut);
                        return (<tr key={p.id} onClick={e => { e.stopPropagation(); setPlanDetailId(p.id); }} style={{cursor:'pointer', borderBottom:`1px solid ${$border}`, background: planDetailId===p.id?'#fffbeb':'transparent'}} className="hover:bg-gray-50">
                          <td style={{padding:'6px 10px', fontSize:'0.8rem', color:$textMut, fontWeight:500}}>{p.aoRef || p.id}</td>
                          <td style={{padding:'6px 10px', fontSize:'0.8rem', fontWeight:600, color:$text, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.nom}</td>
                          <td style={{padding:'6px 10px', fontSize:'0.8rem', color:$textSec}}>{p.client}</td>
                          <td style={{padding:'6px 10px'}}><span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background:ph.color+'18', color:ph.color, fontWeight:600}}>{ph.icon} {ph.label}</span></td>
                          <td style={{padding:'6px 10px'}}><span style={{fontSize:'0.75rem', padding:'2px 8px', borderRadius:crmRd, background:st.color+'18', color:st.color, fontWeight:600}}>{st.icon} {st.label}</span></td>
                          <td style={{padding:'6px 10px', textAlign:'center'}}><span style={{fontSize:'0.75rem', fontWeight:600, color: p.priorite==='Haute'?'#e74c3c':p.priorite==='Moyenne'?'#f39c12':'#3498db'}}>{p.priorite}</span></td>
                          <td style={{padding:'6px 10px', fontSize:'0.78rem', color:$text}}>{fmtDate(p.dateDebut)}</td>
                          <td style={{padding:'6px 10px', fontSize:'0.78rem', color:$text}}>{fmtDate(p.dateFin)}</td>
                          <td style={{padding:'6px 10px'}}><div style={{display:'flex', alignItems:'center', gap:4}}><div style={{flex:1, height:6, background:$bgSub, borderRadius:3, overflow:'hidden'}}><div style={{height:'100%', width:p.progression+'%', background: p.progression===100?'#27ae60':p.statut==='en_retard'?'#e74c3c':'#3498db', borderRadius:3}} /></div><span style={{fontSize:'0.7rem', fontWeight:700, color:$textSec, minWidth:28, textAlign:'right'}}>{p.progression}%</span></div></td>
                          <td style={{padding:'6px 10px', fontSize:'0.8rem', fontWeight:600, color:$text, textAlign:'right'}}>{(p.montant/1000000).toFixed(1)}M€</td>
                          <td style={{padding:'6px 10px', fontSize:'0.78rem', color:$textSec}}>{p.responsable}</td>
                        </tr>);
                      })}</tbody>
                    </table>)}
                  </div>);
                })}
              </div>
            )}

            {/* ════ VUE KANBAN ════ */}
            {planVue === 'kanban' && (
              <div style={{display:'flex', gap:12, overflowX:'auto', paddingBottom:8}} className="hide-scrollbar">
                {PLAN_PHASES.map(ph => {
                  const items = filtered.filter(p => p.phase === ph.id);
                  const totalMontant = items.reduce((s,p)=>s+p.montant,0);
                  return (<div key={ph.id}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); if (planKanbanDrag) { setPlanProjets(prev => prev.map(p => p.id === planKanbanDrag ? {...p, phase: ph.id} : p)); setPlanKanbanDrag(null); } }}
                    style={{minWidth:240, maxWidth:280, flex:'0 0 260px', background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`, display:'flex', flexDirection:'column', maxHeight:'70vh'}}>
                    {/* Column header */}
                    <div style={{padding:'12px 14px', borderBottom:'2px solid '+ph.color, display:'flex', alignItems:'center', gap:6}}>
                      <span style={{fontSize:'0.95rem'}}>{ph.icon}</span>
                      <span style={{fontSize:'0.85rem', fontWeight:700, color:ph.color, flex:1}}>{ph.label}</span>
                      <span style={{fontSize:'0.75rem', fontWeight:700, color:'#fff', background:ph.color, padding:'1px 7px', borderRadius:crmRd}}>{items.length}</span>
                    </div>
                    {/* Cards */}
                    <div style={{flex:1, overflowY:'auto', padding:8, display:'flex', flexDirection:'column', gap:8}} className="hide-scrollbar">
                      {items.map(p => {
                        const st = getStatut(p.statut);
                        const daysLeft = daysBetween(todayStr, p.dateFin);
                        return (<div key={p.id} draggable onDragStart={() => setPlanKanbanDrag(p.id)} onDragEnd={() => setPlanKanbanDrag(null)}
                          onClick={e => { e.stopPropagation(); setPlanDetailId(p.id); }}
                          style={{background:'#fff', borderRadius:crmRd, padding:'12px 14px', border:`1px solid ${$border}`, cursor:'grab', boxShadow:'0 1px 3px rgba(0,0,0,0.04)', transition:'box-shadow 0.15s', borderLeft:`3px solid ${st.color}`}}>
                          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6}}>
                            <span style={{fontSize:'0.68rem', fontWeight:700, color: p.priorite==='Haute'?'#e74c3c':p.priorite==='Moyenne'?'#f39c12':'#3498db', textTransform:'uppercase'}}>{p.priorite==='Haute'?'▲':p.priorite==='Moyenne'?'●':'▽'} {p.priorite}</span>
                            <span style={{fontSize:'0.68rem', padding:'1px 5px', borderRadius:3, background: p.type==='Public'?'#dbeafe':'#fce7f3', color: p.type==='Public'?'#2563eb':'#db2777', fontWeight:600}}>{p.type}</span>
                          </div>
                          <div style={{fontSize:'0.82rem', fontWeight:700, color:$text, marginBottom:3, lineHeight:1.3}}>{p.nom}</div>
                          <div style={{fontSize:'0.72rem', color:$textMut, marginBottom:8}}>{p.client}</div>
                          <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:6}}>
                            <span style={{fontSize:'0.7rem', color:$textSec}}>◉ {p.responsable}</span>
                          </div>
                          <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:6}}>
                            <span style={{fontSize:'0.7rem', color:$textMut}}>◫ {fmtDate(p.dateDebut)} → {fmtDate(p.dateFin)}</span>
                          </div>
                          {/* Progress bar */}
                          <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:6}}>
                            <div style={{flex:1, height:5, background:$bgSub, borderRadius:3, overflow:'hidden'}}><div style={{height:'100%', width:p.progression+'%', background: p.progression===100?'#27ae60':st.color, borderRadius:3}} /></div>
                            <span style={{fontSize:'0.68rem', fontWeight:700, color:$textSec}}>{p.progression}%</span>
                          </div>
                          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span style={{fontSize:'0.72rem', fontWeight:700, color:$text}}>€ {(p.montant/1000000).toFixed(1)}M€</span>
                            {p.statut !== 'termine' && daysLeft >= 0 && <span style={{fontSize:'0.68rem', fontWeight:600, color: daysLeft<=14?'#e74c3c':'#b0a08a'}}>◷ J-{daysLeft}</span>}
                            {p.statut !== 'termine' && daysLeft < 0 && <span style={{fontSize:'0.68rem', fontWeight:600, color:'#e74c3c'}}>▲ +{Math.abs(daysLeft)}j</span>}
                          </div>
                        </div>);
                      })}
                      {items.length === 0 && <div style={{padding:16, textAlign:'center', fontSize:'0.78rem', color:'#c9b896'}}>Aucun projet</div>}
                    </div>
                    {/* Footer */}
                    {items.length > 0 && <div style={{padding:'6px 12px', borderTop:`1px solid ${$border}`, fontSize:'0.7rem', color:$textMut, fontWeight:600, textAlign:'center'}}>
                      {(totalMontant/1000000).toFixed(1)}M€
                    </div>}
                  </div>);
                })}
              </div>
            )}

            {/* ════ PANNEAU DÉTAIL ════ */}
            {detailProjet && (<div onClick={e => e.stopPropagation()} style={{position:'fixed', top:0, right:0, bottom:0, width:380, background:'#fff', boxShadow:'-4px 0 20px rgba(0,0,0,0.08)', zIndex:100, overflowY:'auto', borderLeft:`1px solid ${$border}`, padding:'20px 24px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
                <span style={{fontSize:'0.75rem', fontWeight:600, color:$textMut}}>{detailProjet.aoRef || detailProjet.id}</span>
                <button onClick={() => setPlanDetailId(null)} style={{width:28, height:28, borderRadius:crmRd, border:`1px solid ${$border}`, background:'#fff', cursor:'pointer', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center'}}>✕</button>
              </div>
              <h3 style={{fontSize:'1rem', fontWeight:800, color:$text, marginBottom:4, lineHeight:1.3}}>{detailProjet.nom}</h3>
              <div style={{fontSize:'0.85rem', color:$textSec, marginBottom:16}}>{detailProjet.client}</div>

              {/* Statut & Phase badges */}
              <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:16}}>
                {(() => { const st = getStatut(detailProjet.statut); return <span style={{fontSize:'0.75rem', padding:'3px 10px', borderRadius:crmRd, background:st.color+'18', color:st.color, fontWeight:700}}>{st.icon} {st.label}</span>; })()}
                {(() => { const ph = getPhase(detailProjet.phase); return <span style={{fontSize:'0.75rem', padding:'3px 10px', borderRadius:crmRd, background:ph.color+'18', color:ph.color, fontWeight:700}}>{ph.icon} {ph.label}</span>; })()}
                <span style={{fontSize:'0.75rem', padding:'3px 10px', borderRadius:crmRd, background: detailProjet.priorite==='Haute'?'#fee2e2':detailProjet.priorite==='Moyenne'?'#fef3c7':'#dbeafe', color: detailProjet.priorite==='Haute'?'#dc2626':detailProjet.priorite==='Moyenne'?'#d97706':'#2563eb', fontWeight:700}}>{detailProjet.priorite}</span>
              </div>

              {/* Info cards */}
              {[
                { title:'Planning', rows:[
                  ['Début', fmtDate(detailProjet.dateDebut)],
                  ['Fin', fmtDate(detailProjet.dateFin)],
                  ['Durée', daysBetween(detailProjet.dateDebut, detailProjet.dateFin)+' jours'],
                ]},
                { title:'Financier', rows:[
                  ['Montant', (detailProjet.montant/1000000).toFixed(2)+'M€'],
                  ['Type', detailProjet.type],
                ]},
              ].map(section => (
                <div key={section.title} style={{marginBottom:16, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                  <div style={{fontSize:'0.75rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>{section.title}</div>
                  {section.rows.map(([k,v]) => (
                    <div key={k} style={{display:'flex', justifyContent:'space-between', padding:'3px 0'}}>
                      <span style={{fontSize:'0.8rem', color:$textSec}}>{k}</span>
                      <span style={{fontSize:'0.8rem', fontWeight:600, color:$text}}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Progression */}
              <div style={{marginBottom:16, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                  <span style={{fontSize:'0.75rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>Progression</span>
                  <span style={{fontSize:'0.85rem', fontWeight:800, color: detailProjet.progression===100?'#27ae60':'#3498db'}}>{detailProjet.progression}%</span>
                </div>
                <div style={{height:8, background:$bgSub, borderRadius:crmRd, overflow:'hidden'}}>
                  <div style={{height:'100%', width:detailProjet.progression+'%', background: detailProjet.progression===100?'#27ae60':detailProjet.statut==='en_retard'?'#e74c3c':'#3498db', borderRadius:crmRd, transition:'width 0.3s'}} />
                </div>
              </div>

              {/* Équipe */}
              <div style={{marginBottom:16, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                <div style={{fontSize:'0.75rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Équipe</div>
                <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:4}}>
                  <span style={{fontSize:'0.8rem', fontWeight:600, color:$text}}>◉ {detailProjet.responsable}</span>
                  <span style={{fontSize:'0.7rem', color:$textMut}}>(resp.)</span>
                </div>
                {detailProjet.equipe.map(m => (
                  <div key={m} style={{fontSize:'0.8rem', color:$textSec, padding:'2px 0'}}>  • {m}</div>
                ))}
              </div>

              {/* Jalons */}
              {detailProjet.jalons && detailProjet.jalons.length > 0 && (
                <div style={{marginBottom:16, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                  <div style={{fontSize:'0.75rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Jalons</div>
                  {detailProjet.jalons.map((j,i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', gap:6, padding:'4px 0'}}>
                      <div style={{width:8, height:8, background: j.done?'#27ae60':'#e74c3c', transform:'rotate(45deg)', borderRadius:1}} />
                      <span style={{fontSize:'0.78rem', color:$text, flex:1}}>{j.label}</span>
                      <span style={{fontSize:'0.72rem', color:$textMut}}>{fmtDate(j.date)}</span>
                      <span style={{fontSize:'0.7rem'}}>{j.done ? '✓' : '⏳'}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sous-tâches */}
              {detailProjet.sousTaches && detailProjet.sousTaches.length > 0 && (
                <div style={{marginBottom:16, background:$bgSub, borderRadius:crmRd, padding:'12px 16px', border:`1px solid ${$border}`}}>
                  <div style={{fontSize:'0.75rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Sous-tâches</div>
                  {detailProjet.sousTaches.map(st => (
                    <div key={st.id} style={{padding:'4px 0', borderBottom:`1px solid ${$border}`}}>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3}}>
                        <span style={{fontSize:'0.78rem', fontWeight:600, color:$text}}>{st.progression===100?'✓':'↻'} {st.nom}</span>
                        <span style={{fontSize:'0.7rem', fontWeight:700, color: st.progression===100?'#27ae60':'#3498db'}}>{st.progression}%</span>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <div style={{flex:1, height:4, background:$bgSub, borderRadius:2, overflow:'hidden'}}><div style={{height:'100%', width:st.progression+'%', background: st.progression===100?'#27ae60':'#3498db', borderRadius:2}} /></div>
                        <span style={{fontSize:'0.68rem', color:$textMut}}>{st.resp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {detailProjet.tags && detailProjet.tags.length > 0 && (
                <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                  {detailProjet.tags.map(t => <span key={t} style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:crmRd, background:$bgSub, color:$textSec, fontWeight:600}}>#{t}</span>)}
                </div>
              )}
            </div>)}
          </div>);
}
