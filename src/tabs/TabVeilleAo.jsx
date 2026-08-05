// === Onglet « veille_ao » — extrait de App.jsx (modularisation, forme iife) ===
import { CRM_FIL_ICONS } from '../data/theme.js';
import { Search } from 'lucide-react';
import React, {  } from 'react';

export default function TabVeilleAo(__props) {
  const { $bgCard, $bgSub, $border, $shadowLg, $text, $textMut, $textSec, VEILLE_DECISIONS, VEILLE_PERSONNES, VEILLE_STATUTS, crmRd, filialesEnrichies, navEntreprise, navService, setOngletActif, setStatutDragIdx, setStatutDragOverIdx, setVColDragIdx, setVColDragOverIdx, setVeilleAO, setVeilleAOPrefill, setVeilleColOrder, setVeilleColWidths, setVeilleDecCellOpen, setVeilleDecCellPos, setVeilleDecGrab, setVeilleDecOrdre, setVeilleDecOver, setVeilleDensity, setVeilleDrawerWide, setVeilleFilterPanelOpen, setVeilleFormData, setVeilleFormOpen, setVeilleGroupeActif, setVeilleGroupePar, setVeilleGroupesFermes, setVeilleHeaderSize, setVeillePinnedCols, setVeilleRowBordersH, setVeilleRowBordersV, setVeilleSearch, setVeilleSelectedAO, setVeilleSort, setVeilleSourceDropdown, setVeilleStatCellOpen, setVeilleStatCellPos, setVeilleStatGrab, setVeilleStatOver, setVeilleStatutFiltres, setVeilleStatutsOrdre, setVeilleTypeFiltre, startColResize, statutDragIdx, vColDragIdx, vColDragOverIdx, veilleAO, veilleColOrder, veilleColWidths, veilleDecCellOpen, veilleDecCellPos, veilleDecGrab, veilleDecOrdre, veilleDecOver, veilleDensity, veilleDrawerWide, veilleFilterPanelOpen, veilleFormData, veilleFormOpen, veilleGroupeActif, veilleGroupePar, veilleGroupesFermes, veilleHeaderSize, veillePinnedCols, veilleRowBordersH, veilleRowBordersV, veilleSearch, veilleSelectedAO, veilleSort, veilleSourceDropdown, veilleStatCellOpen, veilleStatCellPos, veilleStatGrab, veilleStatOver, veilleStatutFiltres, veilleTypeFiltre } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const svcKey = navEntreprise + '_' + navService;
          const filialesOp = filialesEnrichies.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom));
          const svcIcon = CRM_FIL_ICONS[navEntreprise] || '🏗️';

          // Logos SVG
          const LogoSpigao = ({size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24"><defs><linearGradient id="spG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff6d00"/><stop offset="100%" stopColor="#e65100"/></linearGradient></defs><circle cx="12" cy="12" r="10" fill="url(#spG)"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S</text></svg>);
          const LogoBoamp = ({size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#000091"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">RF</text></svg>);
          const LogoAutre = ({size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="10" fill="#78909c"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10">?</text></svg>);
          const SourceLogo = ({name, size=20}) => name === 'SPIGAO' ? <LogoSpigao size={size}/> : name === 'BOAMP' ? <LogoBoamp size={size}/> : <LogoAutre size={size}/>;
          const SOURCES_INFO = { SPIGAO: { connected: true, color: '#e65100' }, BOAMP: { connected: false, color: '#000091' }, Autre: { connected: true, color: '#78909c' } };

          // Filtered data
          let filtered = [...veilleAO];
          if (veilleGroupeActif === 'nouveaux') filtered = filtered.filter(a => a.statut === 'nouveau');
          else if (veilleGroupeActif === 'suivis') filtered = filtered.filter(a => !['nouveau','hors_cible','no_go','archive'].includes(a.statut));
          else if (veilleGroupeActif === 'archives') filtered = filtered.filter(a => ['hors_cible','no_go','archive'].includes(a.statut));
          if (veilleTypeFiltre !== 'tous') filtered = filtered.filter(a => a.type === veilleTypeFiltre);
          if (veilleStatutFiltres.length > 0) filtered = filtered.filter(a => veilleStatutFiltres.includes(a.statut));
          if (veilleSearch.trim()) {
            const q = veilleSearch.toLowerCase();
            filtered = filtered.filter(a => a.titre.toLowerCase().includes(q) || (a.acheteur||'').toLowerCase().includes(q) || (a.ref||'').toLowerCase().includes(q));
          }
          // Sort
          filtered.sort((a, b) => {
            const dir = veilleSort.dir === 'asc' ? 1 : -1;
            if (veilleSort.col === 'dateLimite') return dir * (new Date(a.dateLimite||0) - new Date(b.dateLimite||0));
            if (veilleSort.col === 'montant') return dir * ((a.montant||0) - (b.montant||0));
            if (veilleSort.col === 'priorite') { const o = {Haute:0,Moyenne:1,Basse:2}; return dir * ((o[a.priorite]||1) - (o[b.priorite]||1)); }
            if (veilleSort.col === 'titre') return dir * a.titre.localeCompare(b.titre);
            if (veilleSort.col === 'acheteur') return dir * (a.acheteur||'').localeCompare(b.acheteur||'');
            return 0;
          });

          const pipelineTotal = veilleAO.filter(a => !['hors_cible','no_go','archive'].includes(a.statut)).reduce((s,a) => s + a.montant, 0);
          const formatMontant = (v) => v >= 1000000 ? (v/1000000).toFixed(1) + 'M€' : v >= 1000 ? Math.round(v/1000) + 'k€' : v + '€';
          const getPersonLabel = (id) => { const p = [...VEILLE_PERSONNES.selecteurs, ...VEILLE_PERSONNES.validateurs].find(x=>x.id===id); return p ? p.nom : id; };

          const updateAO = (id, field, value) => {
            setVeilleAO(prev => prev.map(a => a.id === id ? {...a, [field]: value} : a));
          };
          const handleDecision = (id, decision) => {
            setVeilleAO(prev => prev.map(a => a.id === id ? {...a, decision} : a));
          };
          const handleValidation = (id, validePar) => {
            setVeilleAO(prev => prev.map(a => a.id === id ? {...a, validePar} : a));
          };
          const handleStatutDrop = (targetIdx) => {
            if (statutDragIdx === null || statutDragIdx === targetIdx) { setStatutDragIdx(null); setStatutDragOverIdx(null); return; }
            setVeilleStatutsOrdre(prev => { const a = [...prev]; const [moved] = a.splice(statutDragIdx, 1); a.splice(targetIdx, 0, moved); return a; });
            setStatutDragIdx(null); setStatutDragOverIdx(null);
          };
          const handleVColDrop = (targetIdx) => {
            if (vColDragIdx === null || vColDragIdx === targetIdx) { setVColDragIdx(null); setVColDragOverIdx(null); return; }
            setVeilleColOrder(prev => { const a = [...prev]; const [moved] = a.splice(vColDragIdx, 1); a.splice(targetIdx, 0, moved); return a; });
            setVColDragIdx(null); setVColDragOverIdx(null);
          };

          const tabGroupes = [
            { id: 'tous', label: '📋 Tous', count: veilleAO.length },
            { id: 'nouveaux', label: '🆕 Nouveaux', count: veilleAO.filter(a => a.statut === 'nouveau').length },
            { id: 'suivis', label: '👁️ Suivis', count: veilleAO.filter(a => !['nouveau','hors_cible','no_go','archive'].includes(a.statut)).length },
            { id: 'archives', label: '🗄️ Archives', count: veilleAO.filter(a => ['hors_cible','no_go','archive'].includes(a.statut)).length }
          ];

          // ── renderVeillePanel ──
          const renderVeillePanel = (ao) => {
                if (!ao) return null;
                const vs = VEILLE_STATUTS.find(s => s.id === ao.statut) || {};
                const pInfo = { Haute:{color:'#ef4444',bg:'rgba(239,68,68,0.14)'}, Moyenne:{color:'#f59e0b',bg:'rgba(212,160,48,0.18)'}, Basse:{color:'#6366f1',bg:'rgba(139,92,246,0.14)'} }[ao.priorite] || {color:'#64748b',bg:'rgba(241,245,249,0.14)'};
                const srcColor = { SPIGAO:'#e65100', BOAMP:'#000091', Autre:'#78909c' }[ao.source] || '#64748b';
                const dlMs = ao.dateLimite ? new Date(ao.dateLimite).getTime() - Date.now() : null;
                const dlDays = dlMs !== null ? Math.ceil(dlMs/86400000) : null;
                const dlCol = dlDays !== null ? (dlDays < 0 ? '#9ca3af' : dlDays <= 3 ? '#dc2626' : dlDays <= 7 ? '#f97316' : dlDays <= 14 ? '#d97706' : '#059669') : $textMut;
                const typeColor = { Public:'#0d9488', 'Privé':'#7c3aed', Particulier:'#b45309' }[ao.type] || '#64748b';
                const decInfo = VEILLE_DECISIONS.find(d=>d.id===(ao.decision||'a_decider')) || VEILLE_DECISIONS[0];
                const getPersonLabel2 = (id) => { const p = [...VEILLE_PERSONNES.selecteurs, ...VEILLE_PERSONNES.validateurs].find(x=>x.id===id); return p ? p.nom : (id||'—'); };
                const F = ({label, val, color, accent}) => (
                  <div style={{padding:'8px 12px', borderRadius:crmRd, background: accent ? '#007ab508' : $bgSub, border: accent ? '1px solid #007ab528' : '1px solid transparent'}}>
                    <div style={{fontSize:'0.61rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:3}}>{label}</div>
                    <div style={{fontSize:'0.82rem', fontWeight:600, color:color||$text, lineHeight:1.35}}>{val||'—'}</div>
                  </div>
                );
            return (
<div style={{background:'transparent'}}>
                    <div style={{height:2, background:`linear-gradient(90deg, ${vs.color||'#007ab5'}, ${vs.color||'#007ab5'}40)`, borderRadius:2, marginBottom:14}}/>
                    <div style={{padding:'16px 20px'}}>
                      {/* Header */}
                      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${$border}`}}>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontSize:'0.62rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:4}}>MARCHÉ SÉLECTIONNÉ · {ao.ref}</div>
                          <div style={{fontSize:'0.95rem', fontWeight:700, color:$text, marginBottom:9, lineHeight:1.35, maxWidth:680}}>{ao.titre}</div>
                          <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
                            <span style={{padding:'2px 8px', borderRadius:8, background:vs.bg||'#f1f5f9', color:vs.color||'#64748b', fontSize:'0.7rem', fontWeight:700, border:`1px solid ${vs.color||'#64748b'}33`}}>{vs.icon} {vs.label}</span>
                            <span style={{padding:'2px 8px', borderRadius:8, background:pInfo.bg, color:pInfo.color, fontSize:'0.7rem', fontWeight:700}}>{ao.priorite}</span>
                            <span style={{padding:'2px 8px', borderRadius:8, background:typeColor+'15', color:typeColor, fontSize:'0.7rem', fontWeight:700, border:`1px solid ${typeColor}30`}}>{ao.type === 'Public' ? '🏛️' : ao.type === 'Privé' ? '🏢' : '🏠'} {ao.type}</span>
                            <span style={{padding:'2px 8px', borderRadius:8, background:srcColor+'15', color:srcColor, fontSize:'0.7rem', fontWeight:700}}>{ao.source}</span>
                            {dlDays !== null && dlDays >= 0 && dlDays <= 7 && <span style={{padding:'2px 8px', borderRadius:8, background:'rgba(239,68,68,0.14)', color:'#dc2626', fontSize:'0.7rem', fontWeight:700}}>⏰ J-{dlDays}</span>}
                            {dlDays !== null && dlDays < 0 && <span style={{padding:'2px 8px', borderRadius:8, background:'rgba(212,160,48,0.18)', color:'#92400e', fontSize:'0.7rem', fontWeight:700}}>⚠️ Expirée</span>}
                          </div>
                        </div>
                        <div style={{display:'flex', gap:6, flexShrink:0, marginLeft:14}}>
                          <button onClick={()=>setVeilleSelectedAO(null)} style={{width:28,height:28,borderRadius:'50%',border:`1px solid ${$border}`,background:$bgSub,fontSize:'0.9rem',color:$textMut,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                          <button onClick={()=>{ const va=veilleAO.find(a=>a.id===veilleSelectedAO); if(va){setVeilleAOPrefill({n:va.titre,m:va.moa||va.maitrise_ouvrage||'',tm:va.type||'Marché public',b:va.budget||0,d:va.deadline||''});} setVeilleSelectedAO(null);setOngletActif('suivi_dossiers'); }} style={{padding:'5px 11px', borderRadius:crmRd, border:'1px solid #007ab533', background:'#007ab510', fontSize:'0.73rem', fontWeight:700, color:'#007ab5', cursor:'pointer'}}>📋 Passer en Suivi Dossiers →</button>
                        </div>
                      </div>
                      {/* Fields grid */}
                      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9, marginBottom:12}}>
                        <F label="Acheteur / Client" val={ao.acheteur}/>
                        <F label="Type de marché" val={ao.type} color={typeColor}/>
                        <F label="Montant estimé" val={formatMontant(ao.montant)} accent/>
                        <F label="Source" val={ao.source} color={srcColor}/>
                        <F label="Date limite" val={ao.dateLimite ? new Date(ao.dateLimite).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—'} color={dlCol} accent={dlDays!==null&&dlDays<=7}/>
                        <F label="Jours restants" val={dlDays!==null?(dlDays<0?'Expirée ('+Math.abs(dlDays)+'j)':dlDays===0?"Aujourd'hui":dlDays+' jours'):'—'} color={dlCol}/>
                        <F label="Importé le" val={ao.dateImport ? new Date(ao.dateImport).toLocaleDateString('fr-FR') : '—'}/>
                        <F label="Référence" val={ao.ref}/>
                      </div>
                      {/* Quick actions */}
                      <div style={{display:'flex',gap:7,marginBottom:12,flexWrap:'wrap'}}>
                        {ao.source==='BOAMP' && <a href={"https://www.boamp.fr/avis/detail/"+ao.ref.replace('BOAMP-','')} target="_blank" rel="noreferrer" style={{padding:'5px 12px',borderRadius:crmRd,background:'#00009115',color:'#000091',border:'1px solid #00009133',fontSize:'0.73rem',fontWeight:700,textDecoration:'none'}}>🏛️ Voir sur BOAMP</a>}
                        <button onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(ao.titre);}} style={{padding:'5px 12px',borderRadius:crmRd,background:$bgSub,color:$textSec,border:"1px solid "+$border,fontSize:'0.73rem',cursor:'pointer'}}>📋 Copier intitulé</button>
                        <button onClick={()=>{ const va=veilleAO.find(a=>a.id===veilleSelectedAO); if(va){setVeilleAOPrefill({n:va.titre,m:va.moa||va.maitrise_ouvrage||'',tm:va.type||'Marché public',b:va.budget||0,d:va.deadline||''});} setVeilleSelectedAO(null);setOngletActif('suivi_dossiers'); }} style={{padding:'5px 12px',borderRadius:crmRd,background:'#007ab510',color:'#007ab5',border:'1px solid #007ab533',fontSize:'0.73rem',fontWeight:700,cursor:'pointer'}}>📋 Passer en Suivi Dossiers →</button>
                        {ao.statut==='go_a_traiter' && <span style={{padding:'5px 12px',borderRadius:crmRd,background:'#05966910',color:'#059669',border:'1px solid #05966930',fontSize:'0.73rem',fontWeight:700}}>✅ GO décidé — À transférer dans Suivi</span>}
                      </div>
                      {/* ── IA RAPIDE GO/NO-GO + RC ── */}
                      {(()=>{
                        const viaKey = 'via_'+ao.id;
                        const viaRes = window[viaKey];
                        const viaLoad = window[viaKey+'_l'];
                        const viaDoc = window[viaKey+'_doc'] || null; // {name, content, type}
                        const setViaDoc = (d) => { window[viaKey+'_doc']=d; setVeilleSelectedAO(null); setTimeout(()=>setVeilleSelectedAO(ao.id),10); };

                        const handleViaFile = async (e) => {
                          const file = e.target.files?.[0]; if(!file) return;
                          const ext = file.name.split('.').pop().toLowerCase();
                          if(ext==='pdf') {
                            const b64 = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
                            setViaDoc({name:file.name,content:b64,type:'pdf',size:file.size});
                          } else {
                            const txt = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsText(file,'UTF-8');});
                            setViaDoc({name:file.name,content:txt,type:'txt',size:file.size});
                          }
                          e.target.value='';
                        };

                        const triggerVIA = async () => {
                          window[viaKey+'_l'] = true;
                          setVeilleSelectedAO(null); setTimeout(()=>setVeilleSelectedAO(ao.id),10);
                          try {
                            const base = "Tu es expert en appels d'offres BTP en France. Analyse cet AO et donne une recommandation GO/NO-GO pour Ezel Bâtiment (TCE, réhabilitation + construction neuve, IDF, 34 pers, CA ~8M€)."
                              + '\n\n**AO : '+ao.titre+'**'
                              + '\n- Acheteur : '+(ao.acheteur||'—')
                              + '\n- Type : '+(ao.type||'—')
                              + '\n- Montant : '+(ao.montant?Math.round(ao.montant/1000)+'k€':'NC')
                              + '\n- Source : '+(ao.source||'—')
                              + '\n- Deadline : '+(ao.dateLimite?new Date(ao.dateLimite).toLocaleDateString('fr-FR'):'NC');

                            const instr = viaDoc
                              ? '\n\nLe RC / CCTP est joint. Analyse les exigences clés, clauses importantes, références demandées.\n\nRéponds en 5 points :\n**VERDICT** : GO ✅ ou NO-GO ❌\n**RAISON** : (1 ligne)\n**EXIGENCES CLÉS** : (2-3 bullet depuis le document)\n**RISQUE CLÉ** : (1 ligne)\n**ACTION IMMÉDIATE** : (1 ligne)'
                              : '\n\nRéponds en 4 points MAX :\n**VERDICT** : GO ✅ ou NO-GO ❌\n**RAISON** : (1 ligne)\n**RISQUE CLÉ** : (1 ligne)\n**ACTION IMMÉDIATE** : si GO (1 ligne)';

                            let messages;
                            if(viaDoc && viaDoc.type==='pdf') {
                              messages = [{role:'user',content:[{type:'document',source:{type:'base64',media_type:'application/pdf',data:viaDoc.content}},{type:'text',text:base+instr}]}];
                            } else if(viaDoc) {
                              messages = [{role:'user',content:base+'\n\n--- '+viaDoc.name+' ---\n'+viaDoc.content.slice(0,10000)+instr}];
                            } else {
                              messages = [{role:'user',content:base+instr}];
                            }

                            const r = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:viaDoc?700:400,system:"Expert BTP appels d'offres France. Réponses concises et directement actionnables.",messages})});
                            const d = await r.json();
                            window[viaKey] = d.content?.[0]?.text||'Erreur';
                            window[viaKey+'_l'] = false;
                          } catch(e) { window[viaKey]='⚠ Erreur: '+e.message; window[viaKey+'_l']=false; }
                          setVeilleSelectedAO(null); setTimeout(()=>setVeilleSelectedAO(ao.id),10);
                        };

                        return (
                          <div style={{marginBottom:12,borderRadius:crmRd,border:'1px solid #007ab522',overflow:'hidden'}}>
                            {/* Header bar */}
                            <div style={{padding:'10px 14px',background:'linear-gradient(135deg,#007ab508,#007ab503)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                              <div style={{display:'flex',alignItems:'center',gap:7}}>
                                <span style={{fontSize:'1rem'}}>🤖</span>
                                <span style={{fontSize:'0.75rem',fontWeight:700,color:'#007ab5'}}>Analyse IA — GO / NO-GO</span>
                                {viaDoc&&<span style={{fontSize:'0.62rem',padding:'1px 6px',borderRadius:4,background:'#05966912',color:'#059669',fontWeight:700}}>📄 {viaDoc.name.slice(0,20)}{viaDoc.name.length>20?'...':''}</span>}
                                {viaRes&&!viaLoad&&<span style={{fontSize:'0.6rem',color:$textMut}}>mis en cache</span>}
                              </div>
                              <div style={{display:'flex',alignItems:'center',gap:5,flexWrap:'wrap',justifyContent:'flex-end'}}>
                                {/* ── SOURCE SÉLECTION ── */}
                                <div style={{display:'flex',gap:3,alignItems:'center'}}>

                                  {/* 📎 Upload manuel */}
                                  <label title="Upload RC/CCTP/DPGF depuis votre ordinateur (PDF, DOCX, XLSX)" style={{display:'flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:crmRd,border:'1px solid '+(viaDoc&&!viaDoc.fromBoamp&&!viaDoc.fromSpigao?'#059669':'#007ab533'),background:viaDoc&&!viaDoc.fromBoamp&&!viaDoc.fromSpigao?'#05966910':'transparent',color:viaDoc&&!viaDoc.fromBoamp&&!viaDoc.fromSpigao?'#059669':'#007ab5',fontSize:'0.68rem',fontWeight:600,cursor:'pointer'}}>
                                    {viaDoc&&!viaDoc.fromBoamp&&!viaDoc.fromSpigao?'✓ Fichier joint':'📎 Upload'}
                                    <input type="file" accept=".pdf,.docx,.doc,.txt,.xlsx,.xls,.csv" style={{display:'none'}} onChange={handleViaFile}/>
                                  </label>

                                  {/* 🏛️ BOAMP auto-fetch */}
                                  {ao.source==='BOAMP'&&ao.ref&&(
                                    <button
                                      title={"BOAMP : récupère automatiquement les pièces du DCE via l'API BOAMP (data.gouv.fr) — disponible Phase 1 Next.js"}
                                      onClick={()=>{
                                        // 🚧 PHASE 1 — implémentation backend requise
                                        // API: https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records?where=annonce_id=26-XXXXXX
                                        // → récupère lien_telecharger_dce
                                        // → proxy GCS/Next.js fetch + base64 → Claude
                                        alert('BOAMP auto-fetch — Phase 1 Next.js. Ce bouton recuperera automatiquement le DCE via API BOAMP. En attendant : cliquer Upload pour charger le RC manuellement.');
                                      }}
                                      style={{display:'flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:crmRd,border:'1px solid #00009133',background:viaDoc?.fromBoamp?'#00009110':'transparent',color:'#000091',fontSize:'0.68rem',fontWeight:600,cursor:'pointer',opacity:1}}
                                    >
                                      🏛️ BOAMP
                                      <span style={{fontSize:'0.55rem',padding:'1px 4px',borderRadius:3,background:'#f59e0b20',color:'#d97706',fontWeight:700}}>Phase 1</span>
                                    </button>
                                  )}

                                  {/* 🔍 SPIGAO */}
                                  <button
                                      title={"SPIGAO : pas d'API publique — ouvrir SPIGAO, télécharger le RC, puis l'uploader via '📎 Upload'"}
                                      onClick={()=>{
                                        // 🚧 Pas d'API publique SPIGAO
                                        // Workflow manuel: SPIGAO → télécharger → upload ici
                                        // Alternative future: connexion OAuth SPIGAO si disponible
                                        alert('SPIGAO — Pas d API publique. Workflow : 1. Ouvrir SPIGAO 2. Telecharger RC/CCTP 3. Uploader via Upload ci-dessus. Alternative future : integration API si disponible.');
                                      }}
                                      style={{display:'flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:crmRd,border:'1px solid #e6510033',background:'transparent',color:'#e65100',fontSize:'0.68rem',fontWeight:600,cursor:'pointer'}}
                                    >
                                      <span style={{fontWeight:800}}>SP</span> SPIGAO
                                      <span style={{fontSize:'0.55rem',padding:'1px 4px',borderRadius:3,background:'#6b728020',color:'#6b7280',fontWeight:700}}>Manuel</span>
                                    </button>

                                  {/* ☁ GCS */}
                                  <button
                                    title={"Google Cloud Storage — déposer le DCE dans gs://group-oy-dce/{dos_id}/ pour lecture automatique (Phase 1)"}
                                    onClick={()=>{
                                      // 🚧 PHASE 1 — GCS native integration
                                      // SDK: @google-cloud/storage
                                      // Bucket: group-oy-dce / folder: DOS-2026-XXXX/
                                      // → lister fichiers → Gemini 1.5 Pro (multi-fichiers natif) ou Claude
                                      alert('GCS — Phase 1. Bucket: gs://group-oy-dce/ Dossier par AO: DOS-2026-XXXX/. En Phase 1: Gemini 1.5 Pro lira les fichiers nativement. Pour instant: utiliser Upload.');
                                    }}
                                    style={{display:'flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:crmRd,border:'1px solid #1a73e833',background:'transparent',color:'#1a73e8',fontSize:'0.68rem',fontWeight:600,cursor:'pointer'}}
                                  >
                                    ☁ GCS
                                    <span style={{fontSize:'0.55rem',padding:'1px 4px',borderRadius:3,background:'#f59e0b20',color:'#d97706',fontWeight:700}}>Phase 1</span>
                                  </button>

                                  {viaDoc&&<button onClick={()=>setViaDoc(null)} style={{padding:'3px 6px',borderRadius:crmRd,border:'none',background:'transparent',color:$textMut,fontSize:'0.7rem',cursor:'pointer'}}>✕</button>}
                                </div>

                                <button onClick={triggerVIA} disabled={viaLoad} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 12px',borderRadius:crmRd,border:'none',background:viaLoad?$bgSub:'#007ab5',color:viaLoad?$textMut:'#fff',fontSize:'0.74rem',fontWeight:700,cursor:viaLoad?'wait':'pointer',whiteSpace:'nowrap'}}>
                                  {viaLoad?<><span style={{display:'inline-block',width:9,height:9,border:'1.5px solid #007ab530',borderTopColor:'#007ab5',borderRadius:'50%'}}/> Analyse...</>:viaRes?'↺ Relancer':'▶ Analyser'}
                                </button>
                              </div>
                            </div>
                            {/* Result */}
                            {viaRes&&<div style={{padding:'10px 14px',background:$bgCard,fontSize:'0.76rem',color:$text,lineHeight:1.65,whiteSpace:'pre-wrap'}}>{viaRes}</div>}
                            {/* Workflow hint + Télécharger tout */}
                            <div style={{padding:'8px 14px',background:$bgCard,borderTop:'1px solid '+$border,display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
                              <div style={{fontSize:'0.67rem',color:$textMut,lineHeight:1.5}}>
                                <span style={{fontWeight:700,color:$textSec}}>Étape 1</span> → Joindre le <strong>RC</strong> (Règlement de Consultation) via 📎 Upload ou BOAMP/SPIGAO · <span style={{fontWeight:700,color:$textSec}}>Étape 2</span> → ▶ Analyser
                              </div>
                              <button
                                onClick={()=>{
                                  // 🚧 PHASE 1 — Télécharger tout le dossier DCE
                                  // Sources par priorité :
                                  //   1. BOAMP API → boamp-datadila.opendatasoft.com/api → lien_telecharger_dce
                                  //      GET /records?where=annonce_id="{ao.ref}" → champ "url_document"
                                  //   2. SPIGAO → pas d'API publique → workflow manuel
                                  //   3. GCS → gs://group-oy-dce/{dosId}/ → liste + fetch
                                  // Résultat : ZIP ou liste de fichiers → Gemini 1.5 Pro (multi-fichiers)
                                  alert('Telecharger tout le dossier — Phase 1. RC + CCTP + DPGF + AE/DC1/DC2. Sources: BOAMP API (auto) / SPIGAO (manuel) / GCS. Analyse: Gemini 1.5 Pro + Claude synthese.');
                                }}
                                style={{display:'flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:crmRd,border:'1px solid #007ab533',background:'#007ab508',color:'#007ab5',fontSize:'0.68rem',fontWeight:700,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}
                              >
                                ⬇ Tout le dossier
                                <span style={{fontSize:'0.55rem',padding:'1px 4px',borderRadius:3,background:'#f59e0b20',color:'#d97706',fontWeight:700}}>Phase 1</span>
                              </button>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Workflow row */}
                      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:9}}>
                        <div style={{padding:'10px 14px', borderRadius:crmRd, background:$bgSub}}>
                          <div style={{fontSize:'0.61rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:6}}>Sélectionné par</div>
                          <div style={{fontSize:'0.84rem', fontWeight:600, color:$text}}>{ao.selectionnePar ? getPersonLabel2(ao.selectionnePar) : <span style={{color:$textMut, fontStyle:'italic'}}>Non assigné</span>}</div>
                        </div>
                        <div style={{padding:'10px 14px', borderRadius:crmRd, background:$bgSub}}>
                          <div style={{fontSize:'0.61rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:6}}>Validé par</div>
                          <div style={{fontSize:'0.84rem', fontWeight:600, color:$text}}>{ao.validePar ? getPersonLabel2(ao.validePar) : <span style={{color:$textMut, fontStyle:'italic'}}>En attente</span>}</div>
                        </div>
                        <div style={{padding:'10px 14px', borderRadius:crmRd, background:(decInfo.color||'#64748b')+'10', border:`1px solid ${decInfo.color||'#64748b'}25`}}>
                          <div style={{fontSize:'0.61rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:6}}>Décision</div>
                          <div style={{fontSize:'0.86rem', fontWeight:700, color:decInfo.color||$text}}>{decInfo.icon} {decInfo.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
            );
          };

          return (<div style={{display:'flex', flexDirection:'column', gap:0, position:'relative'}}>

            {/* ═══ DRAWER VEILLE AO ═══ */}
            {veilleSelectedAO && (()=>{
              const ao = veilleAO.find(a=>a.id===veilleSelectedAO);
              if(!ao) return null;
              return (<>
                <div onClick={()=>setVeilleSelectedAO(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.18)',zIndex:9990}}/>
                <div style={{position:'fixed',top:0,right:0,bottom:0,width:veilleDrawerWide?'min(900px,94vw)':'min(580px,94vw)',background:$bgCard,borderLeft:`1px solid ${$border}`,boxShadow:'-8px 0 32px rgba(0,0,0,0.12)',zIndex:9991,display:'flex',flexDirection:'column',overflow:'hidden',animation:'slideInRight 0.22s cubic-bezier(0.16,1,0.3,1)'}}>
                  {/* Drawer header */}
                  <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderBottom:`1px solid ${$border}`,background:$bgSub,flexShrink:0}}>
                    <div style={{height:16,width:3,background:'#007ab5',borderRadius:2,flexShrink:0}}/>
                    <span style={{fontSize:'0.82rem',fontWeight:700,color:$text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ao.titre}</span>
                    <button onClick={()=>setVeilleDrawerWide(w=>!w)} title={veilleDrawerWide?"Réduire":"Agrandir"} style={{width:28,height:28,borderRadius:6,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:$textMut,flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.background=$bgCard} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      {veilleDrawerWide
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2H12V5M5 12H2V9M12 2L8 6M2 12L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9v3h3M12 5V2H9M2 12l4-4M12 2l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      }
                    </button>
                    <button onClick={()=>setVeilleSelectedAO(null)} title="Fermer" style={{width:28,height:28,borderRadius:6,border:`1px solid ${$border}`,background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:$textMut,flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.background=$bgCard} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <div style={{flex:1,overflowY:'auto',padding:'16px 20px'}}>
                    {renderVeillePanel(ao)}
                  </div>
                </div>
                <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
              </>);
            })()}

            {/* ═══ HEADER SHOWCASE ═══ */}
            <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, marginBottom:14, overflow:'hidden'}}>
              {/* Accent bar top */}
              <div style={{height:3, background:'linear-gradient(90deg, #007ab5 0%, #0099d6 60%, #007ab5 100%)'}}></div>
              <div style={{padding:'18px 24px'}}>
                <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                  <div style={{display:'flex', alignItems:'center', gap:14}}>
                    <div style={{width:44, height:44, borderRadius:10, background:'#007ab5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0}}>🔍</div>
                    <div>
                      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:3}}>
                        <h2 style={{margin:0, fontSize:'1.1rem', fontWeight:800, color:$text, letterSpacing:'-0.01em'}}>Veille Appels d'Offres</h2>
                        <span style={{fontSize:'0.7rem', padding:'2px 8px', borderRadius:10, background:'#007ab510', color:'#007ab5', fontWeight:700, border:'1px solid #007ab530', textTransform:'uppercase', letterSpacing:'0.05em'}}>LIVE</span>
                      </div>
                      <p style={{margin:0, fontSize:'0.82rem', color:$textMut, lineHeight:1.4}}>Détection, qualification et suivi des marchés publics et privés</p>
                    </div>
                  </div>
                  {/* Right: sources + actions */}
                  <div style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}>
                    {/* Source badges */}
                    <div style={{display:'flex', alignItems:'center', gap:6}}>
                      {Object.entries(SOURCES_INFO).map(([name, info]) => (
                        <div key={name} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:crmRd, background: info.connected ? info.color+'0D' : $bgSub, border: `1px solid ${info.connected ? info.color+'30' : $border}`}}>
                          <SourceLogo name={name} size={13}/>
                          <span style={{fontSize:'0.75rem', fontWeight:700, color: info.connected ? info.color : $textMut}}>{name}</span>
                          <span style={{width:5, height:5, borderRadius:'50%', background: info.connected ? '#22c55e' : '#d1d5db', flexShrink:0}}></span>
                        </div>
                      ))}
                    </div>
                    <div style={{width:1, height:24, background:$border}}></div>
                    <button style={{display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, fontSize:'0.8rem', fontWeight:600, color:$textSec, cursor:'pointer'}}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2v4M8 14v-4M2 8h4M14 8h-4M4.1 4.1l2.8 2.8M11.9 11.9l-2.8-2.8M11.9 4.1l-2.8 2.8M4.1 11.9l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Sync
                    </button>
                    <button onClick={() => setVeilleFormOpen(true)} style={{display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:crmRd, border:'none', background:'#007ab5', fontSize:'0.8rem', fontWeight:700, color:'#fff', cursor:'pointer'}}>
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                      Saisie manuelle
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* === FORMULAIRE SAISIE MANUELLE === */}
            {veilleFormOpen && (<div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(15,23,42,0.35)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => setVeilleFormOpen(false)}>
              <div onClick={e => e.stopPropagation()} style={{background:$bgCard, borderRadius:crmRd, width:560, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid #e2e8f0'}}>
                <div style={{padding:'20px 24px 16px', borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div>
                    <h3 style={{margin:0, fontSize:'1.05rem', fontWeight:700, color:$text}}>Nouvelle Affaire</h3>
                    <p style={{margin:'4px 0 0', fontSize:'0.82rem', color:$textMut}}>Saisie manuelle d'un appel d'offres</p>
                  </div>
                  <button onClick={() => setVeilleFormOpen(false)} style={{width:28, height:28, borderRadius:crmRd, border:'1px solid #e2e8f0', background:$bgSub, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:$textMut}}>✕</button>
                </div>
                <div style={{padding:'20px 24px', display:'flex', flexDirection:'column', gap:14}}>
                  {[{label:'Titre / Objet *',key:'titre',type:'text',ph:"Ex: Réhabilitation groupe scolaire..."},{label:'Acheteur / Client *',key:'acheteur',type:'text',ph:"Nom de la collectivité ou entreprise"},{label:'Montant estimé (€)',key:'montant',type:'number',ph:"Ex: 500000"},{label:'Date limite',key:'dateLimite',type:'date',ph:''},{label:'Heure limite',key:'heureLimite',type:'time',ph:''}].map(f => (
                    <div key={f.key}>
                      <label style={{fontSize:'0.8rem', fontWeight:600, color:$textSec, display:'block', marginBottom:5}}>{f.label}</label>
                      <input type={f.type} value={veilleFormData[f.key]||''} onChange={e => setVeilleFormData(prev => ({...prev, [f.key]: e.target.value}))} placeholder={f.ph} style={{width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.85rem', color:$text, background:$bgSub, boxSizing:'border-box', outline:'none'}}/>
                    </div>
                  ))}
                  <div>
                    <label style={{fontSize:'0.8rem', fontWeight:600, color:$textSec, display:'block', marginBottom:5}}>Type de marché</label>
                    <div style={{display:'flex', gap:8}}>
                      {['Public','Privé','Particulier'].map(t => (<button key={t} onClick={() => setVeilleFormData(prev => ({...prev, type:t}))} style={{flex:1, padding:'7px', borderRadius:crmRd, border:`2px solid ${veilleFormData.type===t ? '#007ab5' : $border}`, background: veilleFormData.type===t ? '#007ab510' : $bgSub, color: veilleFormData.type===t ? '#007ab5' : $textSec, fontWeight:600, fontSize:'0.82rem', cursor:'pointer'}}>{t}</button>))}
                    </div>
                  </div>
                  <div>
                    <label style={{fontSize:'0.8rem', fontWeight:600, color:$textSec, display:'block', marginBottom:5}}>Source</label>
                    <div style={{display:'flex', gap:8}}>
                      {['SPIGAO','BOAMP','Autre'].map(s => (<button key={s} onClick={() => setVeilleFormData(prev => ({...prev, source:s}))} style={{flex:1, padding:'7px', borderRadius:crmRd, border:`2px solid ${(veilleFormData.source||'SPIGAO')===s ? '#007ab5' : $border}`, background: (veilleFormData.source||'SPIGAO')===s ? '#007ab510' : $bgSub, color: (veilleFormData.source||'SPIGAO')===s ? '#007ab5' : $textSec, fontWeight:600, fontSize:'0.82rem', cursor:'pointer'}}>{s}</button>))}
                    </div>
                  </div>
                </div>
                <div style={{padding:'12px 24px 20px', borderTop:`1px solid ${$border}`, display:'flex', gap:10, justifyContent:'flex-end'}}>
                  <button onClick={() => setVeilleFormOpen(false)} style={{padding:'8px 20px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, fontSize:'0.85rem', fontWeight:600, color:$textSec, cursor:'pointer'}}>Annuler</button>
                  <button onClick={() => {
                    if (!veilleFormData.titre || !veilleFormData.acheteur) return;
                    const newAO = { id: 'V-'+Date.now(), ref: 'MANUEL-'+new Date().getFullYear(), titre: veilleFormData.titre, acheteur: veilleFormData.acheteur, type: veilleFormData.type||'Public', montant: Number(veilleFormData.montant)||0, dateLimite: veilleFormData.dateLimite ? veilleFormData.dateLimite+'T'+(veilleFormData.heureLimite||'12:00') : '', source: veilleFormData.source||'Autre', statut: 'nouveau', priorite: 'Moyenne', selectionnePar: null, validePar: null, decision: 'a_decider', notes: '' };
                    setVeilleAO(prev => [newAO, ...prev]);
                    setVeilleFormData({ titre:'', acheteur:'', type:'Public', montant:'', dateLimite:'', heureLimite:'12:00', source:'SPIGAO' });
                    setVeilleFormOpen(false);
                  }} style={{padding:'8px 24px', borderRadius:crmRd, border:'none', background: (!veilleFormData.titre || !veilleFormData.acheteur) ? '#d1d5db' : '#007ab5', fontSize:'0.85rem', fontWeight:700, color:'white', cursor: (!veilleFormData.titre || !veilleFormData.acheteur) ? 'not-allowed' : 'pointer'}}>
                    Créer l'affaire
                  </button>
                </div>
              </div>
            </div>)}

            {/* ═══ KPI CARDS ═══ */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:14}}>
              {[
                { label:'Marchés détectés', value: veilleAO.length, icon:'📋', color:'#007ab5', bg:'#007ab50d', border:'#007ab525', sub: `dont ${veilleAO.filter(a=>a.statut==='nouveau').length} nouveaux`, subColor:'#007ab5' },
                { label:'En analyse', value: veilleAO.filter(a=>['a_regarder','en_analyse'].includes(a.statut)).length, icon:'🔬', color:'#f59e0b', bg:'#f59e0b0d', border:'#f59e0b25', sub:'À qualifier rapidement', subColor:'#d97706' },
                { label:'GO validés', value: veilleAO.filter(a=>a.statut==='go_a_traiter').length, icon:'🚀', color:'#059669', bg:'#0596690d', border:'#05966925', sub:'À transmettre études', subColor:'#059669' },
                { label:'Pipeline actif', value: formatMontant(pipelineTotal), icon:'💰', color:'#7c3aed', bg:'#7c3aed0d', border:'#7c3aed25', sub:`${veilleAO.filter(a=>!['hors_cible','no_go','archive'].includes(a.statut)).length} marchés actifs`, subColor:'#7c3aed' },
              ].map((s,i) => (
                <div key={i} style={{background:s.bg, borderRadius:crmRd, border:`1px solid ${s.border}`, padding:'0', overflow:'hidden', position:'relative'}}>
                  <div style={{height:3, background:s.color, opacity:0.7}}/>
                  <div style={{padding:'12px 16px'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6}}>
                      <span style={{fontSize:'0.68rem', fontWeight:700, color:s.color, textTransform:'uppercase', letterSpacing:'0.07em'}}>{s.label}</span>
                      <span style={{fontSize:'1.1rem', opacity:0.6}}>{s.icon}</span>
                    </div>
                    <div style={{fontSize:'1.8rem', fontWeight:800, color:s.color, letterSpacing:'-0.03em', lineHeight:1, marginBottom:4}}>{s.value}</div>
                    <div style={{fontSize:'0.7rem', color:s.subColor, opacity:0.75}}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ═══ TOOLBAR ═══ */}
            <div style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:12}}>
              {/* Tab row */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom:`1px solid ${$border}`}}>
                <div style={{display:'flex', alignItems:'center', gap:2, background:$bgSub, borderRadius:crmRd, padding:3}}>
                  {tabGroupes.map(t => (
                    <button key={t.id} onClick={() => setVeilleGroupeActif(t.id)} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 12px', borderRadius:crmRd, fontSize:'0.8rem', fontWeight: veilleGroupeActif === t.id ? 700 : 500, background: veilleGroupeActif === t.id ? $bgCard : 'transparent', color: veilleGroupeActif === t.id ? $text : $textMut, border: veilleGroupeActif === t.id ? `1px solid ${$border}` : '1px solid transparent', cursor:'pointer', boxShadow: veilleGroupeActif === t.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none', transition:'all 0.12s'}}>
                      {t.label}
                      <span style={{fontSize:'0.68rem', padding:'1px 5px', borderRadius:8, background: veilleGroupeActif === t.id ? '#007ab520' : 'transparent', color: veilleGroupeActif === t.id ? '#007ab5' : $textMut, fontWeight:700}}>{t.count}</span>
                    </button>
                  ))}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  {/* Filters count badge */}
                  {(veilleStatutFiltres.length > 0 || veilleTypeFiltre !== 'tous') && (
                    <span style={{fontSize:'0.72rem', padding:'2px 8px', borderRadius:10, background:'#007ab5', color:'#fff', fontWeight:700}}>
                      {[veilleStatutFiltres.length > 0 ? `${veilleStatutFiltres.length} statuts` : '', veilleTypeFiltre !== 'tous' ? veilleTypeFiltre : ''].filter(Boolean).join(' · ')}
                    </span>
                  )}
                  <span style={{fontSize:'0.78rem', color:$textMut, fontWeight:500}}>{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              {/* Filter controls row */}
              <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 16px', flexWrap:'wrap'}}>
                {/* Search — always visible */}
                <div style={{position:'relative', flex:'1', minWidth:180}}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{position:'absolute',left:9,top:'50%',transform:'translateY(-50%)',opacity:0.5}}><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <input value={veilleSearch} onChange={e=>setVeilleSearch(e.target.value)} placeholder="Rechercher AO, acheteur..." style={{width:'100%',padding:'6px 10px 6px 30px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgSub,fontSize:'0.79rem',color:$text,fontFamily:'inherit',boxSizing:'border-box'}}/>
                  {veilleSearch && <button onClick={()=>setVeilleSearch('')} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:$textMut,fontSize:'1rem',lineHeight:1}}>&#x00d7;</button>}
                </div>
                {/* Sort */}
                <select value={`${veilleSort.col}:${veilleSort.dir}`} onChange={e=>{const [col,dir]=e.target.value.split(':');setVeilleSort({col,dir});}} style={{fontSize:'0.79rem',fontWeight:500,padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgSub,color:$text,cursor:'pointer',fontFamily:'inherit'}}>
                  <option value="dateLimite:asc">&#x2191; Deadline</option>
                  <option value="dateLimite:desc">&#x2193; Deadline</option>
                  <option value="montant:desc">&#x2193; Montant</option>
                  <option value="montant:asc">&#x2191; Montant</option>
                  <option value="priorite:asc">&#x25b2; Priorit&#x27;e</option>
                  <option value="titre:asc">A&#x2192;Z Titre</option>
                  <option value="acheteur:asc">A&#x2192;Z Client</option>
                </select>
                {/* Filtres & Colonnes button */}
                <div style={{marginLeft:'auto', position:'relative', zIndex:50}}>
                  <button onClick={()=>setVeilleFilterPanelOpen(v=>!v)} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:crmRd,border:`1px solid ${veilleFilterPanelOpen?'#007ab5':$border}`,background:veilleFilterPanelOpen?'#007ab510':$bgSub,fontSize:'0.78rem',fontWeight:600,color:veilleFilterPanelOpen?'#007ab5':$textSec,cursor:'pointer'}}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Filtres &amp; Colonnes
                    {(veilleTypeFiltre!=='tous'||veilleStatutFiltres.length>0||veilleGroupePar!=='none')&&<span style={{width:6,height:6,borderRadius:'50%',background:'#007ab5',flexShrink:0}}/>}
                  </button>
                  {veilleFilterPanelOpen && (
                    <React.Fragment>
                      <div onClick={()=>setVeilleFilterPanelOpen(false)} style={{position:'fixed',inset:0,zIndex:399,background:'transparent'}}/>
                      <div style={{position:'absolute',top:'100%',right:0,marginTop:4,width:320,maxHeight:'80vh',overflowY:'auto',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadowLg,zIndex:400,padding:'14px 16px'}}>
                        <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:14}}>&#x2699; Filtres &amp; Colonnes</div>
                        {/* Type de march&#x27;e */}
                        <div style={{marginBottom:14}}>
                          <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Type de march&#x27;e</div>
                          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                            {[{v:'tous',l:'Tous'},{v:'Public',l:'&#x1f3db; Public'},{v:'Priv&#x27;e',l:'&#x1f3e2; Priv&#x27;e'},{v:'Particulier',l:'&#x1f3e0; Particulier'}].map(f=>(
                              <button key={f.v} onClick={()=>setVeilleTypeFiltre(f.v)} style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${veilleTypeFiltre===f.v?'#007ab5':$border}`,background:veilleTypeFiltre===f.v?'#007ab510':$bgSub,fontSize:'0.75rem',fontWeight:veilleTypeFiltre===f.v?700:400,color:veilleTypeFiltre===f.v?'#007ab5':$textSec,cursor:'pointer'}}>{f.l}</button>
                            ))}
                          </div>
                        </div>
                        {/* Statuts */}
                        <div style={{marginBottom:14}}>
                          <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Statuts</div>
                          <div style={{display:'flex',flexDirection:'column',gap:4,maxHeight:180,overflowY:'auto'}}>
                            {VEILLE_STATUTS.map(vs=>{
                              const checked=veilleStatutFiltres.length===0||veilleStatutFiltres.includes(vs.id);
                              const count=filtered.filter(a=>a.statut===vs.id).length;
                              return (<label key={vs.id} style={{display:'flex',alignItems:'center',gap:7,cursor:'pointer',fontSize:'0.8rem',color:$text,padding:'3px 0'}}>
                                <input type="checkbox" checked={checked} onChange={()=>setVeilleStatutFiltres(prev=>prev.length===0?(VEILLE_STATUTS.map(s=>s.id).filter(id=>id!==vs.id)):checked?prev.filter(id=>id!==vs.id):[...prev,vs.id])} style={{accentColor:'#007ab5'}}/>
                                <span style={{width:7,height:7,borderRadius:'50%',background:vs.color,flexShrink:0}}/>
                                {vs.label}
                                <span style={{marginLeft:'auto',fontSize:'0.72rem',fontWeight:600,color:'#007ab5'}}>{count}</span>
                              </label>);
                            })}
                          </div>
                        </div>
                        {/* Grouper */}
                        <div style={{marginBottom:14,borderTop:`1px solid ${$border}`,paddingTop:12}}>
                          <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Grouper par</div>
                          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                            {[{id:'none',label:'Aucun'},{id:'statut',label:'Statut'},{id:'type',label:'Type'},{id:'priorite',label:'Priorit&#x27;e'},{id:'source',label:'Source'},{id:'responsable',label:'Responsable'}].map(opt=>(
                              <button key={opt.id} onClick={()=>{setVeilleGroupePar(opt.id);setVeilleGroupesFermes([]);}} style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${veilleGroupePar===opt.id?'#007ab5':$border}`,background:veilleGroupePar===opt.id?'#007ab510':$bgSub,fontSize:'0.75rem',fontWeight:veilleGroupePar===opt.id?700:400,color:veilleGroupePar===opt.id?'#007ab5':$textSec,cursor:'pointer'}}>{opt.label}</button>
                            ))}
                          </div>
                        </div>
                        {/* Affichage */}
                        <div style={{borderTop:`1px solid ${$border}`,paddingTop:12,marginBottom:14}}>
                          <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>Affichage</div>
                          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                            <div>
                              <div style={{fontSize:'0.7rem',color:$textMut,marginBottom:4}}>Densit&#x27;e</div>
                              <div style={{display:'flex',gap:4}}>
                                {[{v:0,l:'XS'},{v:1,l:'S'},{v:2,l:'M'},{v:3,l:'L'}].map(d=>(
                                  <button key={d.v} onClick={()=>setVeilleDensity(d.v)} style={{padding:'3px 8px',borderRadius:crmRd>0?20:2,border:`1px solid ${veilleDensity===d.v?'#007ab5':$border}`,background:veilleDensity===d.v?'#007ab510':$bgSub,fontSize:'0.72rem',fontWeight:veilleDensity===d.v?700:400,color:veilleDensity===d.v?'#007ab5':$textSec,cursor:'pointer'}}>{d.l}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{fontSize:'0.7rem',color:$textMut,marginBottom:4}}>Taille texte</div>
                              <div style={{display:'flex',gap:4}}>
                                {[{v:0,l:'XS'},{v:1,l:'S'},{v:2,l:'M'},{v:3,l:'L'}].map(d=>(
                                  <button key={d.v} onClick={()=>setVeilleHeaderSize(d.v)} style={{padding:'3px 8px',borderRadius:crmRd>0?20:2,border:`1px solid ${veilleHeaderSize===d.v?'#007ab5':$border}`,background:veilleHeaderSize===d.v?'#007ab510':$bgSub,fontSize:'0.72rem',fontWeight:veilleHeaderSize===d.v?700:400,color:veilleHeaderSize===d.v?'#007ab5':$textSec,cursor:'pointer'}}>{d.l}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{marginTop:8}}>
                            <div style={{fontSize:'0.7rem',color:$textMut,marginBottom:4}}>Colonnes fig&#x27;ees</div>
                            <select value={veillePinnedCols} onChange={e=>setVeillePinnedCols(e.target.value)} style={{fontSize:'0.78rem',padding:'4px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgSub,color:$text,cursor:'pointer',fontFamily:'inherit',width:'100%'}}>
                              <option value="">Non fig&#x27;e</option>
                              {veilleColOrder.map(colId=>{const pinLabels={element:'R&#x27;ef.',source:'Source',client:'Client',objet:'Objet'};return <option key={colId} value={colId}>Jusqu&#x27;&#x00e0; {pinLabels[colId]||colId}</option>;})}
                            </select>
                          </div>
                        </div>
                        {/* S&#x27;eparateurs */}
                        <div style={{borderTop:`1px solid ${$border}`,paddingTop:12,marginBottom:14}}>
                          <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>S&#x27;eparateurs</div>
                          <div style={{display:'flex',flexDirection:'column',gap:6}}>
                            <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'0.8rem',color:$text}}>
                              <input type="checkbox" checked={veilleRowBordersH} onChange={e=>setVeilleRowBordersH(e.target.checked)} style={{accentColor:'#007ab5'}}/>
                              S&#x27;eparateurs horizontaux
                            </label>
                            <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'0.8rem',color:$text}}>
                              <input type="checkbox" checked={veilleRowBordersV} onChange={e=>setVeilleRowBordersV(e.target.checked)} style={{accentColor:'#007ab5'}}/>
                              S&#x27;eparateurs verticaux
                            </label>
                          </div>
                        </div>
                        <button onClick={()=>{setVeilleTypeFiltre('tous');setVeilleStatutFiltres([]);setVeilleGroupePar('none');setVeilleDensity(1);setVeilleHeaderSize(1);setVeillePinnedCols('');setVeilleRowBordersH(false);setVeilleRowBordersV(false);}} style={{width:'100%',padding:'6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgSub,fontSize:'0.74rem',color:$textMut,cursor:'pointer'}}>R&#x27;einitialiser</button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>

            {/* === TABLE CLEAN === */}
              {(() => {
                const toggleGrp = (sid) => setVeilleGroupesFermes(prev => prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]);
                const prioStyle = { 'Critique ⚠️️': { color:'#333', bg:'rgba(243,243,243,0.14)' }, Haute: { color: '#401694', bg: 'rgba(139,92,246,0.14)' }, Moyenne: { color: '#d97706', bg: 'rgba(212,160,48,0.18)' }, Basse: { color: '#2563eb', bg: 'rgba(59,130,246,0.14)' } };
                const typeColors = { Public: { color:'#0055cc', bg:'rgba(224,240,255,0.14)', emoji:'🏛️' }, 'Privé': { color:'#166534', bg:'rgba(34,197,94,0.14)', emoji:'🏢' }, Particulier: { color:'#7c3aed', bg:'rgba(139,92,246,0.14)', emoji:'🏠' } };
                const sourceStyle = { SPIGAO: { color: '#e65100', bg: 'rgba(255,243,224,0.14)' }, BOAMP: { color: '#000091', bg: 'rgba(227,242,253,0.14)' }, Autre: { color: '#546e7a', bg: 'rgba(236,239,241,0.14)' } };
                const personColors = { pierre: '#e65100', david: '#1565c0', ozdogan: '#6a1b9a' };
                const personInitials = { pierre: 'PS', david: 'DL', ozdogan: 'OY' };
                const VCOL_DEFS = {
                  element: { label: 'Réf.', align: 'left' }, count: { label: '', align: 'left' },
                  source: { label: 'Source', align: 'left' }, client: { label: 'Client', align: 'left' },
                  objet: { label: 'Objet', align: 'left' }, type: { label: 'Type', align: 'center' },
                  statut: { label: 'Statut', align: 'left' }, priorite: { label: 'Priorité', align: 'center' },
                  selectionnePar: { label: 'Sélectionné Par', align: 'center' }, validePar: { label: 'Validé Par', align: 'center' },
                  decision: { label: 'Décision', align: 'center' },
                  dateLimite: { label: 'Date Limite', align: 'left' },
                  montant: { label: 'Montant', align: 'right' }
                };
                const vTotalW = veilleColOrder.reduce((s, id) => s + (veilleColWidths[id] || 100), 0);

                const PersonBadge = ({pid, onClick}) => {
                  if (!pid) return (<div onClick={onClick} style={{padding:'3px 10px', borderRadius:crmRd, border:'1.5px dashed #d1d5db', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:4}}><span style={{fontSize:'0.78rem', color:'#c0c7d0'}}>— Aucun —</span></div>);
                  const c = personColors[pid] || '#64748b';
                  const p = VEILLE_PERSONNES.selecteurs.find(x=>x.id===pid);
                  const shortName = p ? (p.nom.split(' ')[0][0] + '. ' + p.nom.split(' ')[1]) : pid;
                  return (<div onClick={onClick} style={{padding:'3px 10px', borderRadius:crmRd, background:c+'12', border:'1px solid '+c+'25', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5}}>
                    <span style={{width:18, height:18, borderRadius:'50%', background:c+'20', border:'1px solid '+c+'35', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><span style={{fontSize:8, fontWeight:700, color:c}}>{personInitials[pid] || '??'}</span></span>
                    <span style={{fontSize:'0.8rem', fontWeight:600, color:c, whiteSpace:'nowrap'}}>{shortName}</span>
                  </div>);
                };

                const TXT = [
                  {sm:'0.72rem',md:'0.78rem',lg:'0.86rem',xl:'0.92rem'},
                  {sm:'0.78rem',md:'0.84rem',lg:'0.92rem',xl:'1.0rem'},
                  {sm:'0.84rem',md:'0.90rem',lg:'1.0rem',xl:'1.08rem'},
                  {sm:'0.90rem',md:'0.96rem',lg:'1.08rem',xl:'1.16rem'},
                  {sm:'0.96rem',md:'1.04rem',lg:'1.16rem',xl:'1.24rem'}
                ][veilleHeaderSize];
                const PAD = [
                  {cell:'3px 6px',head:'3px 6px'},
                  {cell:'5px 8px',head:'4px 8px'},
                  {cell:'8px 10px',head:'6px 10px'},
                  {cell:'11px 14px',head:'8px 14px'},
                  {cell:'14px 16px',head:'10px 16px'}
                ][veilleDensity];
                const HDR = ['0.80rem','0.86rem','0.92rem','0.98rem','1.06rem'][veilleHeaderSize];
                const GRP = ['0.92rem','1.0rem','1.08rem','1.18rem','1.28rem'][veilleHeaderSize];
                const ROW_H = [28, 34, 40, 48, 56][veilleDensity];

                // Compute frozen columns: all cols from left up to (including) veillePinnedCols
                const freezeIdx = veillePinnedCols ? veilleColOrder.indexOf(veillePinnedCols) : -1;

                const buildGroups = () => {
                  if (veilleGroupePar === 'none') return [{ key: 'all', label: 'Tous les marchés', color: '#64748b', items: filtered }];
                  if (veilleGroupePar === 'statut') return VEILLE_STATUTS.filter(vs => filtered.some(a => a.statut === vs.id)).map(vs => ({ key: vs.id, label: vs.label, color: vs.color, icon: vs.icon, items: filtered.filter(a => a.statut === vs.id) }));
                  if (veilleGroupePar === 'type') return ['Public','Privé','Particulier'].filter(t => filtered.some(a => a.type === t)).map(t => ({ key: t, label: t, color: typeColors[t], icon: t === 'Public' ? '🏛️' : t === 'Privé' ? '🏢' : '🏠', items: filtered.filter(a => a.type === t) }));
                  if (veilleGroupePar === 'priorite') return ['Haute','Moyenne','Basse'].filter(p => filtered.some(a => a.priorite === p)).map(p => ({ key: p, label: p, color: prioStyle[p].color, icon: p === 'Haute' ? '▲' : p === 'Moyenne' ? '●' : '▽', items: filtered.filter(a => a.priorite === p) }));
                  if (veilleGroupePar === 'source') return ['SPIGAO','BOAMP','Autre'].filter(s => filtered.some(a => a.source === s)).map(s => ({ key: s, label: s, color: sourceStyle[s]?.color || '#666', icon: s === 'SPIGAO' ? '◆' : s === 'BOAMP' ? '◇' : '○', items: filtered.filter(a => a.source === s) }));
                  if (veilleGroupePar === 'acheteur') return [...new Set(filtered.map(a => a.acheteur))].sort().map(ac => ({ key: ac, label: ac, color: '#0369a1', icon: '🏢', items: filtered.filter(a => a.acheteur === ac) }));
                  return [{ key: 'all', label: 'Tous', color: '#64748b', items: filtered }];
                };
                const groups = buildGroups();

                return (<div style={{display:'flex', flexDirection:'column', gap:12}}>
                  {groups.map((grp, gi) => {
                    if (grp.items.length === 0) return null;
                    const isFerme = veilleGroupesFermes.includes(grp.key);
                    const showGroup = veilleGroupePar !== 'none';
                    const frozenCols = freezeIdx >= 0 ? veilleColOrder.slice(0, freezeIdx + 1) : [];
                    const lastFrzId = frozenCols.length > 0 ? frozenCols[frozenCols.length - 1] : null;

                    return (<div key={grp.key} style={{background:'transparent', marginBottom:24}}>  
                      {/* Group title - Monday.com style */}
                      {showGroup && (
                        <div onClick={() => toggleGrp(grp.key)} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px 6px 0',cursor:'pointer',userSelect:'none',transition:'opacity 0.1s'}}
                          onMouseEnter={e=>e.currentTarget.style.opacity='0.75'}
                          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                          <svg width="16" height="16" viewBox="0 0 16 16" style={{flexShrink:0,transition:'transform 0.15s',transform:isFerme?'rotate(-90deg)':'rotate(0deg)'}}>
                            <path d="M5 6l3 3 3-3" stroke={grp.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{fontWeight:700,fontSize:'1rem',color:grp.color}}>{grp.label}</span>
                          <span style={{fontSize:'0.72rem',fontWeight:700,color:grp.color,background:grp.color+'18',padding:'1px 9px',borderRadius:20,marginLeft:2}}>{grp.items.length}</span>
                          {grp.items.reduce((s,a)=>s+a.montant,0)>0 && <span style={{fontSize:'0.75rem',color:$textMut,marginLeft:4}}>{formatMontant(grp.items.reduce((s,a)=>s+a.montant,0))}</span>}
                        </div>
                      )}
                      {/* Single table - freeze via JS transform on scroll */}
                      {!isFerme && (<div className="hide-scrollbar" style={{overflowX:'auto', overflowY:'visible', borderRadius:crmRd, border:`1px solid ${$border}`, borderLeft:`3px solid ${grp.color}`}} onScroll={frozenCols.length > 0 ? (ev) => {
                        const sl = ev.currentTarget.scrollLeft;
                        ev.currentTarget.querySelectorAll('[data-frz]').forEach(el => { el.style.transform = ''; el.style.left = sl+'px'; el.style.position = 'relative'; el.style.zIndex = '6'; el.style.isolation = 'auto'; });
                        ev.currentTarget.querySelectorAll('[data-frzh]').forEach(el => { el.style.transform = ''; el.style.left = sl+'px'; el.style.position = 'relative'; el.style.zIndex = '11'; el.style.isolation = 'auto'; });
                        ev.currentTarget.querySelectorAll('[data-lastfrz]').forEach(el => { el.style.boxShadow = sl > 0 ? '4px 0 8px rgba(0,0,0,0.06)' : 'none'; });
                      } : undefined}>
                        <table style={{width: vTotalW, borderCollapse:'separate', borderSpacing:0, tableLayout:'fixed'}}>
                          <thead><tr style={{height:ROW_H}}>
                            <th style={{width:32,padding:'0 4px',textAlign:'center',borderRight:`1px solid ${$border}`,background:$bgSub,position:'sticky',left:0,zIndex:5}}></th>
                            {veilleColOrder.map((colId, ci) => {
                              const def = VCOL_DEFS[colId] || {};
                              const isDrag = vColDragIdx === ci;
                              const isOver = vColDragOverIdx === ci;
                              const isFrz = frozenCols.includes(colId);
                              const isLast = colId === lastFrzId;
                              const frzHAttr = isFrz ? {'data-frzh':'1', ...(isLast ? {'data-lastfrz':'1'} : {})} : {};
                              return (
                              <th key={colId} {...frzHAttr} draggable onDragStart={(ev) => { setVColDragIdx(ci); ev.dataTransfer.effectAllowed = 'move'; }} onDragOver={(ev) => { ev.preventDefault(); setVColDragOverIdx(ci); }} onDragLeave={() => setVColDragOverIdx(null)} onDrop={(ev) => { ev.preventDefault(); handleVColDrop(ci); }} onDragEnd={() => { setVColDragIdx(null); setVColDragOverIdx(null); }}
                                style={{
                                  width: veilleColWidths[colId], maxWidth: veilleColWidths[colId], padding:PAD.head, textAlign: def.align || 'left',
                                  fontSize:'0.72rem', fontWeight:600, color:$textMut,
                                  textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                                  background: isOver ? $bgSub : $bgSub,
                                  userSelect:'none', cursor:'grab', opacity: isDrag ? 0.3 : 1, position:'relative',
                                  borderBottom:'1px solid #c0c4cc',
                                  borderRight: '1px solid #d1d5db',
                                  transition:'background 0.1s'
                                }}>
                                {def.label}
                                <div onMouseDown={(ev) => startColResize(colId, ev, veilleColWidths, setVeilleColWidths)} style={{position:'absolute', right:0, top:0, bottom:0, width:4, cursor:'col-resize', background:'transparent', zIndex:5}} onMouseOver={ev => ev.currentTarget.style.background='#c9b896'} onMouseOut={ev => ev.currentTarget.style.background='transparent'} />
                              </th>);
                            })}
                          </tr></thead>
                          <tbody>
                            {grp.items.map(ao => {
                              const st = VEILLE_STATUTS.find(s => s.id === ao.statut);
                              const isVSel = veilleSelectedAO===ao.id; return (<React.Fragment key={ao.id}><tr style={{height:ROW_H, cursor:'default', background: veilleSelectedAO===ao.id ? '#007ab50d' : 'transparent', borderLeft: veilleSelectedAO===ao.id ? '3px solid #007ab5' : '3px solid transparent', borderBottom: veilleRowBordersH ? `1px solid ${$border}` : 'none', transition:'background 0.1s, border-color 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=veilleSelectedAO===ao.id?'#007ab50d':'#007ab508'} onMouseLeave={e=>e.currentTarget.style.background=veilleSelectedAO===ao.id?'#007ab50d':'transparent'}>
                                    <td style={{width:32,padding:'0 4px',textAlign:'center',borderRight:`1px solid ${$border}`,background:'inherit'}}>
                                      <div onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}} style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',borderRadius:4,margin:'0 auto',transition:'background 0.1s'}}
                                        onMouseEnter={e=>e.currentTarget.style.background=$bgSub}
                                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2l4 4-4 4" stroke={isVSel?'#007ab5':$textMut} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                      </div>
                                    </td>
                                {veilleColOrder.map(colId => {
                                  const w = veilleColWidths[colId] || 100;
                                  const isFrz = frozenCols.includes(colId);
                                  const isLast = colId === lastFrzId;
                                  const frzStyle = isFrz ? { background:$bgCard, borderRight: `1px solid ${$border}` } : {};
                                  const base = { width: w, maxWidth: w, padding: PAD.cell, verticalAlign:'middle', borderRight: veilleRowBordersV ? '1px solid #d1d5db' : 'none', borderBottom:'1px solid #c0c4cc', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', ...frzStyle };
                                  const frzAttr = isFrz ? {'data-frz':'1', ...(isLast ? {'data-lastfrz':'1'} : {})} : {};
                                  switch(colId) {
                                    case 'element': return (<td key={colId} {...frzAttr} style={{...base, whiteSpace:'nowrap', cursor:'pointer'}} onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}}><span style={{fontSize:TXT.md, fontWeight:400, color:$text}}>{ao.id}</span></td>);
                                    case 'count': return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center'}}><div style={{width:18, height:18, borderRadius:crmRd, background:$bgSub, border:`1px solid ${$border}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}><span style={{fontSize:8, fontWeight:600, color:$textMut}}>0</span></div></td>);
                                    case 'source': {
                                      const sc = sourceStyle[ao.source] || {};
                                      return (<td key={colId} {...frzAttr} style={{...base, position:'relative'}}>
                                        <div onClick={(e) => { e.stopPropagation(); setVeilleSourceDropdown(veilleSourceDropdown === ao.id ? null : ao.id); }} style={{display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', borderRadius:crmRd, fontSize:TXT.md, fontWeight:400, color: sc.color || '#666', background:(sc.color || '#666')+'08', cursor:'pointer'}}>
                                          <SourceLogo name={ao.source} size={16} />{ao.source}
                                        </div>
                                        {veilleSourceDropdown === ao.id && (<div className="veille-dropdown-zone" onClick={e => e.stopPropagation()} style={{position:'absolute', top:'100%', left:8, zIndex:80, background:$bgCard, borderRadius:crmRd, border:'1px solid #e2e8f0', boxShadow:'0 4px 16px rgba(0,0,0,0.08)', padding:4, minWidth:120}}>
                                          {['SPIGAO','BOAMP','Autre'].map(s => (<div key={s} onClick={(ev) => { ev.stopPropagation(); updateAO(ao.id, 'source', s); setVeilleSourceDropdown(null); }} style={{padding:'5px 10px', borderRadius:crmRd, cursor:'pointer', fontSize:TXT.md, fontWeight: ao.source === s ? 600 : 400, color: sourceStyle[s]?.color || '#666', background: ao.source === s ? $bgSub : 'transparent', display:'flex', alignItems:'center', gap:6}} onMouseOver={ev => ev.currentTarget.style.background='#faf8f5'} onMouseOut={ev => { if(ao.source !== s) ev.currentTarget.style.background='transparent'; }}>
                                            <SourceLogo name={s} size={14} />{s}{ao.source === s && <span style={{marginLeft:'auto', color:'#22c55e', fontSize:11}}>✓</span>}
                                          </div>))}
                                        </div>)}
                                      </td>);
                                    }
                                    case 'client': return (<td key={colId} {...frzAttr} style={{...base, cursor:'pointer'}} onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}}><span style={{fontSize:TXT.md, fontWeight:400, color:$text}}>{ao.acheteur}</span></td>);
                                    case 'objet': return (<td key={colId} {...frzAttr} onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}} style={{...base, cursor:'pointer'}}><span style={{fontSize:TXT.md, fontWeight:400, color:$text}}>{ao.titre}</span></td>);
                                    case 'type': {
                                      const tmCfgV = typeColors[ao.type] || { color:$textSec, bg:$bgSub };
                                      const TM_ORDER_V = ['Public','Privé','Particulier'];
                                      return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center'}}>
                                        <div onClick={e => { e.stopPropagation(); const idx = TM_ORDER_V.indexOf(ao.type); updateAO(ao.id, 'type', TM_ORDER_V[(idx+1)%TM_ORDER_V.length]); }} title="Cliquer pour changer" style={{display:'inline-flex', alignItems:'center', gap:4, cursor:'pointer', userSelect:'none'}}>
                                          <span style={{width:6,height:6,borderRadius:'50%',background:tmCfgV.color,flexShrink:0}}/>
                                          <span style={{fontSize:TXT.md, fontWeight:400, color:$textSec}}>{ao.type}</span>
                                        </div>
                                      </td>);
                                    }
                                    case 'statut': {
                                      const isStatOpen = veilleStatCellOpen === ao.id;
                                      const VSTAT_H = 30;
                                      return (<td key={colId} {...frzAttr} style={{...base, overflow:'visible'}}>
                                        <div style={{display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', borderRadius:crmRd>0?99:2, background: (st?.color||'#6b7280')+'14', cursor:'pointer', userSelect:'none'}} onClick={(e) => { e.stopPropagation(); if (isStatOpen) { setVeilleStatCellOpen(null); } else { const r = e.currentTarget.getBoundingClientRect(); const dropH = VEILLE_STATUTS.length * VSTAT_H + 8; const flipUp = r.bottom + dropH > window.innerHeight; setVeilleStatCellPos({x: r.left, y: flipUp ? r.top : r.bottom}); setVeilleStatCellOpen(ao.id); } setVeilleStatGrab(null); setVeilleStatOver(null); }}>
                                          <span style={{width:6, height:6, borderRadius:'50%', background: st?.color || '#b0a08a', flexShrink:0}}></span>
                                          <span style={{fontSize:TXT.md, fontWeight:600, color: st?.color || '#334155', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{st?.label || ao.statut}</span>
                                          <svg width="7" height="7" viewBox="0 0 8 8" style={{flexShrink:0, opacity:0.5}}><path d="M1.5 3l2.5 2.5 2.5-2.5" stroke={st?.color||'#64748b'} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                                        </div>
                                        {isStatOpen && (<>
                                          <div onClick={() => { setVeilleStatCellOpen(null); setVeilleStatGrab(null); setVeilleStatOver(null); }} style={{position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:9998}} />
                                          <div
                                            onMouseMove={(e) => { if (veilleStatGrab === null) return; const rect = e.currentTarget.getBoundingClientRect(); const y = e.clientY - rect.top - 4; const idx = Math.max(0, Math.min(VEILLE_STATUTS.length - 1, Math.floor(y / VSTAT_H))); setVeilleStatOver(idx); }}
                                            onMouseUp={() => {
                                              if (veilleStatGrab !== null && veilleStatOver !== null && veilleStatGrab !== veilleStatOver) {
                                                setVeilleStatutsOrdre(prev => { const a = [...prev]; const [moved] = a.splice(veilleStatGrab, 1); a.splice(veilleStatOver, 0, moved); return a; });
                                              }
                                              setVeilleStatGrab(null); setVeilleStatOver(null);
                                            }}
                                            onMouseLeave={() => { setVeilleStatGrab(null); setVeilleStatOver(null); }}
                                            style={{position:'fixed', left:veilleStatCellPos.x, top: (veilleStatCellPos.y + VEILLE_STATUTS.length * VSTAT_H + 8 > window.innerHeight) ? undefined : veilleStatCellPos.y, bottom: (veilleStatCellPos.y + VEILLE_STATUTS.length * VSTAT_H + 8 > window.innerHeight) ? (window.innerHeight - veilleStatCellPos.y) : undefined, zIndex:9999, background:$bgCard, borderRadius:crmRd, border:'1px solid #e2e8f0', boxShadow:'0 4px 20px rgba(0,0,0,0.15)', padding:'4px 0', minWidth:220}}>
                                            {VEILLE_STATUTS.map((vs, idx) => { const isGrabbed = veilleStatGrab === idx; const isOverItem = veilleStatOver === idx && veilleStatGrab !== null && veilleStatGrab !== idx; const isCurrent = ao.statut === vs.id; return (
                                              <div key={vs.id}
                                                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setVeilleStatGrab(idx); }}
                                                onClick={(e) => { e.stopPropagation(); if (veilleStatGrab === null) { updateAO(ao.id, 'statut', vs.id); setVeilleStatCellOpen(null); } }}
                                                style={{display:'flex', alignItems:'center', gap:6, padding:'5px 10px', height:VSTAT_H, boxSizing:'border-box', cursor: veilleStatGrab !== null ? 'grabbing' : 'pointer', opacity: isGrabbed ? 0.35 : 1, background: isCurrent ? $border : (isOverItem ? '#eef2ff' : 'transparent'), borderTop: isOverItem ? '2px solid #818cf8' : '2px solid transparent', userSelect:'none', transition:'background 0.08s'}}>
                                                <svg width="6" height="10" viewBox="0 0 6 10" style={{flexShrink:0, opacity:0.25, cursor:'grab'}}><circle cx="1.5" cy="1.5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="1.5" r="1" fill="#b0a08a"/><circle cx="1.5" cy="5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="5" r="1" fill="#b0a08a"/><circle cx="1.5" cy="8.5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="8.5" r="1" fill="#b0a08a"/></svg>
                                                <span style={{width:7, height:7, borderRadius:'50%', background:vs.color, flexShrink:0}}></span>
                                                <span style={{fontSize:TXT.sm, color:$text, flex:1}}>{vs.icon} {vs.label}</span>
                                                {isCurrent && <span style={{fontSize:'0.7rem', color:'#3b82f6'}}>✓</span>}
                                              </div>
                                            ); })}
                                          </div>
                                        </>)}
                                      </td>);
                                    }
                                    case 'priorite': {
                                      const PRIO_ORDER_V = ['Critique ⚠️️','Haute','Moyenne','Basse'];
                                      const pc = prioStyle[ao.priorite] || prioStyle.Moyenne;
                                      return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center'}}>
                                        <div onClick={e => { e.stopPropagation(); const idx = PRIO_ORDER_V.indexOf(ao.priorite||'Moyenne'); updateAO(ao.id, 'priorite', PRIO_ORDER_V[(idx+1)%PRIO_ORDER_V.length]); }} title="Cliquer pour changer" style={{display:'inline-flex', alignItems:'center', gap:4, cursor:'pointer', userSelect:'none'}}>
                                          <span style={{width:6,height:6,borderRadius:'50%',background:pc.color,flexShrink:0}}/>
                                          <span style={{fontSize:TXT.md, fontWeight:400, color:$textSec}}>{ao.priorite||'—'}</span>
                                        </div>
                                      </td>);
                                    }
                                    case 'dateLimite': {
                                      const dlRaw = ao.dateLimite || '';
                                      const parts = dlRaw.split('T');
                                      const datePart = parts[0] ? parts[0].split('-').reverse().join('/') : '—';
                                      const timePart = parts[1] ? parts[1].slice(0,5) : '';
                                      const dlDays = (() => { if(!parts[0]) return null; const d = new Date(parts[0]); d.setHours(0,0,0,0); const t = new Date(); t.setHours(0,0,0,0); return Math.ceil((d-t)/86400000); })();
                                      const dlColor = dlDays === null ? $textMut : dlDays < 0 ? '#dc2626' : dlDays <= 7 ? '#dc2626' : dlDays <= 14 ? '#d97706' : '#16a34a';
                                      const dlBg = dlDays === null ? 'transparent' : dlDays < 0 ? '#fef2f2' : dlDays <= 7 ? '#fef2f2' : dlDays <= 14 ? '#fffbeb' : 'transparent';
                                      return (<td key={colId} {...frzAttr} onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}} style={{...base, cursor:'pointer', whiteSpace:'nowrap'}}>
                                        <div style={{display:'flex', flexDirection:'column', gap:1}}>
                                          <span style={{fontSize:TXT.md, fontWeight:400, color:$textSec}}>{datePart}</span>
                                          {timePart && <span style={{fontSize:'0.62rem', color:$textMut}}>{timePart}</span>}
                                          {dlDays !== null && <span style={{fontSize:'0.62rem', fontWeight:700, color:dlColor}}>{dlDays < 0 ? `J+${Math.abs(dlDays)}` : dlDays === 0 ? "Auj." : `J-${dlDays}`}</span>}
                                        </div>
                                      </td>);
                                    }
                                    case 'selectionnePar': {
                                      const spc = personColors[ao.selectionnePar] || '#b0a08a';
                                      return (<td key={colId} {...frzAttr} style={base}>
                                        <select value={ao.selectionnePar || ''} onChange={ev => { ev.stopPropagation(); updateAO(ao.id, 'selectionnePar', ev.target.value || null); }} onMouseDown={ev => ev.stopPropagation()} style={{fontSize:TXT.md, fontWeight:400, padding:'3px 4px', borderRadius:crmRd, border:'1px solid '+(ao.selectionnePar ? spc+'30' : '#e2e8f0'), background: ao.selectionnePar ? spc+'10' : 'transparent', color: ao.selectionnePar ? spc : '#b0a08a', cursor:'pointer', outline:'none', width:'100%'}}>
                                          <option value="">— Aucun —</option>
                                          {VEILLE_PERSONNES.selecteurs.map(s => <option key={s.id} value={s.id}>{getPersonLabel(s.id)}</option>)}
                                        </select>
                                      </td>);
                                    }
                                    case 'validePar': {
                                      const vpc = personColors[ao.validePar] || '#b0a08a';
                                      return (<td key={colId} {...frzAttr} style={base}>
                                        <select value={ao.validePar || ''} onChange={ev => { ev.stopPropagation(); handleValidation(ao.id, ev.target.value || null); }} onMouseDown={ev => ev.stopPropagation()} style={{fontSize:TXT.md, fontWeight:400, padding:'3px 4px', borderRadius:crmRd, border:'1px solid '+(ao.validePar ? vpc+'30' : '#e2e8f0'), background: ao.validePar ? vpc+'10' : 'transparent', color: ao.validePar ? vpc : '#b0a08a', cursor:'pointer', outline:'none', width:'100%'}}>
                                          <option value="">— Aucun —</option>
                                          {VEILLE_PERSONNES.validateurs.map(s => <option key={s.id} value={s.id}>{getPersonLabel(s.id)}</option>)}
                                        </select>
                                      </td>);
                                    }
                                    case 'decision': {
                                      const hasValidateur = !!ao.validePar;
                                      const isTransfere = ao.decision === 'transfere';
                                      if (!hasValidateur && !ao.decision) {
                                        return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center'}}><span style={{fontSize:TXT.md, color:'#c9b896'}}>—</span></td>);
                                      }
                                      if (isTransfere) {
                                        return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center'}}>
                                          <div style={{display:'inline-flex', alignItems:'center', gap:4}}>
                                            <span style={{fontSize:TXT.md, fontWeight:400, color:'#059669'}}>✅ Transféré</span>
                                            <button onClick={ev => { ev.stopPropagation(); handleDecision(ao.id, 'a_decider'); }} title="Annuler" style={{width:14, height:14, borderRadius:3, border:'1px solid #fca5a5', background:'rgba(239,68,68,0.14)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', padding:0, fontSize:8, color:'#dc2626', lineHeight:1}}>✕</button>
                                          </div>
                                        </td>);
                                      }
                                      const decColors = { a_decider:'#64748b', lancer:'#0369a1', reporte:'#d97706', ne_pas_repondre:'#dc2626' };
                                      const currentDec = ao.decision || 'a_decider';
                                      const decInfo = VEILLE_DECISIONS.find(d=>d.id===currentDec) || VEILLE_DECISIONS[0];
                                      const isDecOpen = veilleDecCellOpen === ao.id;
                                      const DEC_H = 32;
                                      return (<td key={colId} {...frzAttr} style={{...base, textAlign:'center', overflow:'visible'}}>
                                        <div style={{display:'flex', alignItems:'center', gap:4, cursor:'pointer', userSelect:'none', justifyContent:'center'}} onClick={(e) => { e.stopPropagation(); if (isDecOpen) { setVeilleDecCellOpen(null); } else { const r = e.currentTarget.getBoundingClientRect(); const dropH = veilleDecOrdre.length * DEC_H + 8; const flipUp = r.bottom + dropH > window.innerHeight; setVeilleDecCellPos({x: r.left, y: flipUp ? r.top : r.bottom}); setVeilleDecCellOpen(ao.id); } setVeilleDecGrab(null); setVeilleDecOver(null); }}>
                                          <span style={{fontSize:TXT.md, fontWeight:400, color:decInfo.color}}>{decInfo.icon} {decInfo.label}</span>
                                          <svg width="8" height="8" viewBox="0 0 8 8" style={{flexShrink:0, opacity:0.3}}><path d="M1.5 3l2.5 2.5 2.5-2.5" stroke="#64748b" strokeWidth="1" fill="none" strokeLinecap="round"/></svg>
                                        </div>
                                        {isDecOpen && (<>
                                          <div onClick={() => { setVeilleDecCellOpen(null); setVeilleDecGrab(null); setVeilleDecOver(null); }} style={{position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:9998}} />
                                          <div
                                            onMouseMove={(e) => { if (veilleDecGrab === null) return; const rect = e.currentTarget.getBoundingClientRect(); const y = e.clientY - rect.top - 4; const idx = Math.max(0, Math.min(veilleDecOrdre.length - 1, Math.floor(y / DEC_H))); setVeilleDecOver(idx); }}
                                            onMouseUp={() => {
                                              if (veilleDecGrab !== null && veilleDecOver !== null && veilleDecGrab !== veilleDecOver) {
                                                setVeilleDecOrdre(prev => { const a = [...prev]; const [moved] = a.splice(veilleDecGrab, 1); a.splice(veilleDecOver, 0, moved); return a; });
                                              }
                                              setVeilleDecGrab(null); setVeilleDecOver(null);
                                            }}
                                            onMouseLeave={() => { setVeilleDecGrab(null); setVeilleDecOver(null); }}
                                            style={{position:'fixed', left:veilleDecCellPos.x, top: (veilleDecCellPos.y + veilleDecOrdre.length * DEC_H + 8 > window.innerHeight) ? undefined : veilleDecCellPos.y, bottom: (veilleDecCellPos.y + veilleDecOrdre.length * DEC_H + 8 > window.innerHeight) ? (window.innerHeight - veilleDecCellPos.y) : undefined, zIndex:9999, background:$bgCard, borderRadius:crmRd, border:'1px solid #e2e8f0', boxShadow:'0 4px 20px rgba(0,0,0,0.15)', padding:'4px 0', minWidth:200}}>
                                            {veilleDecOrdre.map((dId, idx) => { const dv = VEILLE_DECISIONS.find(d=>d.id===dId)||{}; const isGrabbed = veilleDecGrab === idx; const isOverItem = veilleDecOver === idx && veilleDecGrab !== null && veilleDecGrab !== idx; const isCurrent = currentDec === dId; return (
                                              <div key={dId}
                                                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setVeilleDecGrab(idx); }}
                                                onClick={(e) => { e.stopPropagation(); if (veilleDecGrab === null) { handleDecision(ao.id, dId); setVeilleDecCellOpen(null); } }}
                                                style={{display:'flex', alignItems:'center', gap:6, padding:'5px 10px', height:DEC_H, boxSizing:'border-box', cursor: veilleDecGrab !== null ? 'grabbing' : 'pointer', opacity: isGrabbed ? 0.35 : 1, background: isCurrent ? $border : (isOverItem ? '#eef2ff' : 'transparent'), borderTop: isOverItem ? '2px solid #818cf8' : '2px solid transparent', userSelect:'none', transition:'background 0.08s'}}>
                                                <svg width="6" height="10" viewBox="0 0 6 10" style={{flexShrink:0, opacity:0.25, cursor:'grab'}}><circle cx="1.5" cy="1.5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="1.5" r="1" fill="#b0a08a"/><circle cx="1.5" cy="5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="5" r="1" fill="#b0a08a"/><circle cx="1.5" cy="8.5" r="1" fill="#b0a08a"/><circle cx="4.5" cy="8.5" r="1" fill="#b0a08a"/></svg>
                                                <span style={{fontSize:TXT.sm, color:dv.color||'#334155', flex:1}}>{dv.icon} {dv.label}</span>
                                                {isCurrent && <span style={{fontSize:'0.7rem', color:'#3b82f6'}}>✓</span>}
                                              </div>
                                            ); })}
                                          </div>
                                        </>)}
                                      </td>);
                                    }
                                    case 'montant': return (<td key={colId} {...frzAttr} style={{...base, textAlign:'right', cursor:'pointer'}} onClick={(e)=>{e.stopPropagation();setVeilleSelectedAO(prev=>prev===ao.id?null:ao.id);}}><span style={{fontSize:TXT.md, fontWeight:400, color:$text}}>{formatMontant(ao.montant)}</span></td>);
                                    default: return (<td key={colId} {...frzAttr} style={base}><span style={{fontSize:TXT.md, color:$textMut}}>—</span></td>);
                                  }
                                })}

                
                              </tr></React.Fragment>);
                            })}
                          </tbody>
                        </table>
                      </div>)}
                    </div>);
                  })}
                </div>);
              })()}

              {/* Footer minimal */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:16, padding:'8px 16px', fontSize:'0.78rem', color:$textMut}}>
                <span>{filtered.length} marché{filtered.length > 1 ? 's' : ''}</span>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  {VEILLE_STATUTS.map(vs => (<span key={vs.id} style={{display:'inline-flex', alignItems:'center', gap:3}}><span style={{width:5, height:5, borderRadius:'50%', background: vs.color}}></span>{vs.label} <span style={{fontWeight:600}}>{veilleAO.filter(a=>a.statut===vs.id).length}</span></span>))}
                </div>
                <span>Sync : 18/02/2026 08:30</span>
              </div>
            </div>);

}
