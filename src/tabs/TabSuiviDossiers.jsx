// === Onglet « suivi_dossiers » — extrait de App.jsx (modularisation, forme iife) ===
import { AO_EXT, AO_RAW, DOS_IDS, SOUS_ELEMENTS, getAffId, getExt, getInternalId, getNextDosNum } from '../data/ao.js';
import { Search } from 'lucide-react';
import React, {  } from 'react';

export default function TabSuiviDossiers(__props) {
  const { $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, aoGrouper, aoSearch, aoSelected, aoSort, aoStatCellOpen, aoStatDropPos, aoStatut, aoTypeMarche, aoTypeProjet, aoView, ca, chantiers, crmRd, dosActiveGrp, dosColWidths, dosDrawerWide, dosFilterPanelOpen, dosRowBordersH, dosRowBordersV, dosTableRef, iaCctpText, iaDocs, iaGcsPath, iaMode, niveau, seStatDrop, seTaches, setAoGrouper, setAoSearch, setAoSelected, setAoSort, setAoStatCellOpen, setAoStatDropPos, setAoStatut, setAoTypeMarche, setAoTypeProjet, setAoView, setDosActiveGrp, setDosColWidths, setDosDrawerWide, setDosFilterPanelOpen, setDosRowBordersH, setDosRowBordersV, setIaCctpText, setIaDocs, setIaGcsPath, setIaMode, setOngletActif, setSeStatDrop, setSeTaches, setVeilleAOPrefill, veilleAOPrefill } = __props;
          const ACC = '#007ab5';

          const STATUT_CFG = {
            // ── ACTIF (workflow de préparation) ─────────────────────────────────────
            'APreparer':               { color:'#4a90c4', badge:'À Préparer',                          group:'actif', types:['public','prive','particulier'] },
            'AOselectionne':           { color:'#007ab5', badge:'AO sélectionné',                      group:'actif', types:['public','prive','particulier'] },
            'Visiterdvaprendre':       { color:'#d97706', badge:'Visite rdv à prendre',                group:'actif', types:['public','prive'] },
            'Visiterdvpris':           { color:'#f59e0b', badge:'Visite rdv pris',                     group:'actif', types:['public','prive'] },
            'Visitedemandee':          { color:'#d97706', badge:'Visite demandée',                     group:'actif', types:['public','prive'] },
            'Demandesdeprecisions':    { color:'#0284c7', badge:'Demandes de précisions',              group:'actif', types:['public','prive'] },
            'Enpreparation':           { color:'#007ab5', badge:'En préparation',                      group:'actif', types:['public','prive','particulier'] },
            'Visiteproblematique':     { color:'#dc2626', badge:'Visite problématique',                group:'actif', types:['public','prive'] },
            'EnattentedeReponse':      { color:'#ea580c', badge:'En attente de Réponse',               group:'actif', types:['public','prive','particulier'] },
            'Encoursdeneg':            { color:'#7c3aed', badge:'En cours de négociation',             group:'actif', types:['public','prive','particulier'] },
            'ASuivrebientot':          { color:'#3b82f6', badge:'À Suivre – Bientôt',                  group:'actif', types:['public','prive','particulier'] },
            // ── GAGNÉ ──────────────────────────────────────────────────────────────
            'Accepte':                 { color:'#059669', badge:'Accepté 🍾',                          group:'gagne', types:['public','prive','particulier'] },
            'ProjetenCoursRealisation':{ color:'#10b981', badge:'Projet en Cours de Réalisation',     group:'gagne', types:['public','prive','particulier'] },
            'ProjetTermine':           { color:'#34d399', badge:'Projet Terminé',                      group:'gagne', types:['public','prive','particulier'] },
            // ── PERDU / ARCHIVÉ ────────────────────────────────────────────────────
            'Rejete':                  { color:'#6b7280', badge:'Rejeté 😡',                           group:'perdu', types:['public','prive','particulier'] },
            'Pasrepondu':              { color:'#9ca3af', badge:'Pas répondu',                         group:'perdu', types:['public','prive','particulier'] },
            'Reporte':                 { color:'#94a3b8', badge:'Reporté',                             group:'perdu', types:['public','prive','particulier'] },
            'CourrierPrecisionsRefus': { color:'#6b7280', badge:'Courrier Demande Précisions Refus',  group:'perdu', types:['public'] },
            'ASuivreSansSuite':        { color:'#9ca3af', badge:'À Suivre - Sans Suite',               group:'perdu', types:['public','prive','particulier'] },
          };
          const normalize = s => (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z]/g,'');
          const getScfg = s => STATUT_CFG[normalize(s)] || STATUT_CFG[Object.keys(STATUT_CFG).find(k => normalize(s).toLowerCase().startsWith(normalize(k).toLowerCase().slice(0,6))) || ''] || { color:'#9ca3af', badge: s, group:'perdu' };

          // ── Badge style helper — unified across Suivi + Veille ──
          const getBadge = (statut, small) => {
            const cfg = getScfg(statut);
            const col = cfg.color || '#9ca3af';
            const fs = small ? '0.62rem' : '0.68rem';
            const px = small ? '2px 7px' : '3px 9px';
            return (
              <span style={{padding:px,borderRadius:crmRd>0?20:3,fontSize:fs,fontWeight:700,background:col+'18',color:col,border:`1px solid ${col}30`,letterSpacing:'0.01em',display:'inline-flex',alignItems:'center',gap:3,whiteSpace:'nowrap'}}>
                <span style={{width:5,height:5,borderRadius:'50%',background:col,flexShrink:0}}/>
                {cfg.badge||statut}
              </span>
            );
          };

          // AO_EXT + getExt définis au scope composant (global)

          // Tâches standard BTP par phase
          const TACHES_STANDARD = [
            { id:'t1', label:'Télécharger le DCE complet', phases:['À Préparer','AO sélectionné'], resp:'David LEMAIRE', cat:'preparation' },
            { id:'t2', label:'Analyse CCTP + vérification conformité', phases:['À Préparer'], resp:'David LEMAIRE', cat:'preparation' },
            { id:'t3', label:'Visite de chantier', phases:['Visite rdv à prendre','Visite rdv pris','Visite demandée'], resp:'David LEMAIRE / Pierre SEMERCI', cat:'visite' },
            { id:'t4', label:'DQE — Quantitatif estimatif', phases:['En préparation'], resp:'David LEMAIRE', cat:'chiffrage' },
            { id:'t5', label:'Consultation ST / Sous-traitants', phases:['En préparation'], resp:'David LEMAIRE', cat:'chiffrage' },
            { id:'t6', label:'Mémoire technique', phases:['En préparation'], resp:'David LEMAIRE', cat:'chiffrage' },
            { id:'t7', label:'Dossier administratif (DC1, DC2, Kbis, attestations)', phases:['En préparation'], resp:'Sophie DOS SANTOS', cat:'admin' },
            { id:'t8', label:'Validation Direction (si montant > 500k€)', phases:['En préparation'], resp:'Özdogan YILMAZ', cat:'validation' },
            { id:'t9', label:'Dépôt sur plateforme dématérialisée', phases:['En attente de Réponse'], resp:'Priscillia BORDES', cat:'depot' },
            { id:'t10', label:'Accusé de réception dépôt', phases:['En attente de Réponse'], resp:'Priscillia BORDES', cat:'depot' },
            { id:'t11', label:'Suivi & relance résultat', phases:['En attente de Réponse','En cours de négociation'], resp:'David LEMAIRE', cat:'suivi' },
          ];
          const getAutoTaches = (s) => {
            const ORDRE = ['AO sélectionné','À Préparer','Visite rdv à prendre','Visite rdv pris','Visite demandée','Demandes de précisions','En préparation','Visite problématique','En attente de Réponse','En cours de négociation','Accepté 🍾','Projet en Cours de Réalisation'];
            const idx = ORDRE.indexOf(s);
            return TACHES_STANDARD.map(t => {
              const tIdx = ORDRE.indexOf(t.phases[0]);
              return { ...t, auto_statut: tIdx < idx ? 'Fait' : tIdx === idx ? 'En cours' : 'À faire' };
            });
          };

          const PRIO_CFG = {
            'Critique !': { color:'#333333', bg:'#f3f3f3', dot:'#333' },
            'Haute':      { color:'#401694', bg:'#ede9fe', dot:'#7c3aed' },
            'Moyenne':    { color:'#5559df', bg:'#e0e7ff', dot:'#6366f1' },
            'Basse':      { color:'#4a90c4', bg:'#dbeafe', dot:'#3b82f6' },
          };
          const getPrio = p => PRIO_CFG[p] || { color:'#9ca3af', bg:'#f3f4f6', dot:'#d1d5db' };

          const TYPE_MARCHE_CFG = {
            'Marché public':      { color:'#0055cc', bg:'#e0f0ff', dot:'#0055cc', emoji:'◆' },
            'Marché privé':       { color:'#166534', bg:'#dcfce7', dot:'#16a34a', emoji:'▪' },
            'Marché particulier': { color:'#7c3aed', bg:'#f3e8ff', dot:'#9333ea', emoji:'🏠' },
          };
          const getTM = tm => TYPE_MARCHE_CFG[tm] || { color:'#6b7280', bg:'#f3f4f6', dot:'#9ca3af', emoji:'☰' };

          const today = new Date(); today.setHours(0,0,0,0);
          const daysLeft = dl => { if(!dl) return null; const d = new Date(dl); d.setHours(0,0,0,0); return Math.ceil((d - today) / 86400000); };
          const fmtM = n => !n ? '—' : n >= 1000000 ? (n/1000000).toFixed(1)+'M€' : n >= 1000 ? Math.round(n/1000)+'k€' : n+'€';
          const fmtDate = d => { if(!d) return '—'; const p = d.split('-'); return p[2]+'/'+p[1]+'/'+p[0].slice(2); };
          const dlColor = dl => dl === null ? $textMut : dl < 0 ? '#9ca3af' : dl <= 7 ? '#dc2626' : dl <= 14 ? '#f59e0b' : dl <= 21 ? '#d97706' : $textSec;

          // Filter + sort
          const DATA_NO_DOUBLON = AO_RAW.filter(a => a.s !== 'DOUBLON');
          const filtered = DATA_NO_DOUBLON.filter(ao => {
            const cfg = getScfg(ao.s);
            if (aoStatut === 'actifs' && cfg.group !== 'actif') return false;
            if (aoStatut === 'gagnes' && cfg.group !== 'gagne') return false;
            if (aoStatut === 'perdus' && cfg.group !== 'perdu') return false;
            if (aoTypeMarche !== 'all' && ao.tm !== aoTypeMarche) return false;
            if (aoTypeProjet !== 'all' && ao.tp !== aoTypeProjet) return false;
            if (aoSearch) { const q = aoSearch.toLowerCase(); if (!ao.n.toLowerCase().includes(q) && !(ao.m||'').toLowerCase().includes(q) && !(ao.tp||'').toLowerCase().includes(q)) return false; }
            return true;
          });
          const sorted = [...filtered].sort((a,b) => {
            if (aoSort === 'deadline') { if(!a.d && !b.d) return 0; if(!a.d) return 1; if(!b.d) return -1; return a.d.localeCompare(b.d); }
            if (aoSort === 'offre_desc') return b.o - a.o;
            if (aoSort === 'offre_asc') return a.o - b.o;
            if (aoSort === 'budget_desc') return b.b - a.b;
            if (aoSort === 'updated') return b.u.localeCompare(a.u);
            return 0;
          });

          // KPIs globaux
          const actifs = DATA_NO_DOUBLON.filter(ao => getScfg(ao.s).group === 'actif');
          const gagnes = DATA_NO_DOUBLON.filter(ao => getScfg(ao.s).group === 'gagne');
          const perdus = DATA_NO_DOUBLON.filter(ao => getScfg(ao.s).group === 'perdu');
          const urgents = actifs.filter(ao => { const dl = daysLeft(ao.d); return dl !== null && dl <= 14 && dl >= 0; });
          const visitesEnAttente = actifs.filter(ao => {
            const s = normalize(ao.s);
            return s === normalize('Visite rdv à prendre') || s === normalize('Visite demandée') || s === normalize('Visite problématique');
          });
          const avecDrive = actifs.filter(ao => getExt(ao.id).drive);
          const avecVisite = actifs.filter(ao => getExt(ao.id).dv);
          const tauxSucces = gagnes.length + perdus.filter(a=>normalize(a.s)!=='Pasrepondu').length > 0
            ? ((gagnes.length / (gagnes.length + perdus.filter(a=>normalize(a.s)!=='Pasrepondu').length)) * 100).toFixed(1)
            : '0.0';

          // Swim lane data
          const TYPE_MARCHE_ORDER = ['Marché public', 'Marché privé', 'Marché particulier'];
          const laneGroups = TYPE_MARCHE_ORDER.map(tm => ({
            tm,
            cfg: getTM(tm),
            items: sorted.filter(a => a.tm === tm),
            allItems: DATA_NO_DOUBLON.filter(a => a.tm === tm),
          })).filter(g => g.items.length > 0 || (aoTypeMarche === 'all'));

          const allTP = [...new Set(DATA_NO_DOUBLON.map(a=>a.tp).filter(Boolean))].sort();

          // ── renderAoPanel ──
          const renderAoPanel = (ao) => {
            const cfg = getScfg(ao.s);
            const dl = daysLeft(ao.d);
            const prio = getPrio(ao.p);
                const tmCfg = getTM(ao.tm);
                const delta = ao.b > 0 && ao.o > 0 ? ((ao.o - ao.b) / ao.b * 100).toFixed(1) : null;
                const mondayLink = "https://ezel-bat.monday.com/boards/6470581185/views/159052052/item/" + ao.id;
                const aoDetailTab = window.__aoDetailTab || 'general';
                const setAoDetailTab = (t) => { window.__aoDetailTab = t; };

                const FIELD = ({label, val, accent, color, wide, mono}) => (
                  <div style={{padding:'9px 12px', borderRadius:crmRd, background:accent ? ACC+'0a' : $bgSub, border:accent ? "1px solid "+ACC+"28" : "1px solid transparent", gridColumn: wide ? 'span 2' : 'span 1'}}>
                    <div style={{fontSize:'0.62rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:3}}>{label}</div>
                    <div style={{fontSize:'0.83rem', fontWeight:600, color:color||$text, fontFamily:mono?"'Courier New',monospace":undefined, wordBreak:'break-word'}}>{val||'—'}</div>
                  </div>
                );
            return (
<div style={{marginTop:12, background:$bgCard, border:"1px solid "+ACC+"33", borderRadius:crmRd, overflow:'hidden'}}>
                    {/* top accent bar */}
                    <div style={{height:3, background:"linear-gradient(90deg, "+tmCfg.dot+", "+ACC+")"}}/>
                    <div style={{padding:'16px 20px'}}>

                      {/* Header */}
                      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12, paddingBottom:12, borderBottom:"1px solid "+$border}}>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                            {(()=>{ const intId=getInternalId(ao.id); const isAff=!!getAffId(ao.id); return intId ? (
                              <span style={{fontSize:'0.75rem',fontWeight:800,color:isAff?'#059669':'#007ab5',letterSpacing:'0.04em',fontFamily:"'Courier New',monospace"}}>{intId}</span>
                            ) : (
                              <span style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>DOSSIER · #{ao.id}</span>
                            );})()}
                            <span style={{fontSize:'0.6rem',color:$textMut,opacity:0.5}}>Monday #{ao.id}</span>
                          </div>
                          <div style={{fontSize:'0.96rem', fontWeight:700, color:$text, marginBottom:9, lineHeight:1.35}}>{ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'')}</div>
                          <div style={{display:'flex', gap:5, flexWrap:'wrap', alignItems:'center'}}>
                            <span style={{padding:'3px 9px', borderRadius:10, background:cfg.color+'22', color:cfg.color, fontSize:'0.71rem', fontWeight:700, border:"1px solid "+cfg.color+"33"}}>{cfg.badge}</span>
                            <span style={{padding:'3px 9px', borderRadius:10, background:tmCfg.bg, color:tmCfg.color, fontSize:'0.71rem', fontWeight:700, border:"1px solid "+tmCfg.dot+"30"}}>{tmCfg.emoji} {ao.tm||'—'}</span>
                            {ao.p && <span style={{padding:'3px 9px', borderRadius:10, background:prio.bg, color:prio.color, fontSize:'0.71rem', fontWeight:700}}>{ao.p}</span>}
                            {ao.tp && <span style={{padding:'3px 9px', borderRadius:10, background:$bgSub, color:$textSec, fontSize:'0.71rem', fontWeight:600, border:"1px solid "+$border}}>{ao.tp}</span>}
                            {dl !== null && dl >= 0 && dl <= 7 && <span style={{padding:'3px 9px', borderRadius:10, background:'#fee2e2', color:'#dc2626', fontSize:'0.71rem', fontWeight:700}}>⏰ J-{dl}</span>}
                            {dl !== null && dl < 0 && <span style={{padding:'3px 9px', borderRadius:10, background:'#fef3c7', color:'#92400e', fontSize:'0.71rem', fontWeight:700}}>▲ Dépassée</span>}
                          </div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end', flexShrink:0, marginLeft:14}}>
                          <button onClick={()=>setAoSelected(null)} style={{padding:'5px 11px', borderRadius:crmRd, border:"1px solid "+$border, background:$bgSub, fontSize:'0.76rem', color:$textMut, cursor:'pointer'}}>✕ Fermer</button>
                          <a href={mondayLink} target="_blank" rel="noreferrer" style={{padding:'5px 11px', borderRadius:crmRd, border:"1px solid #0073ea44", background:'#0073ea0d', fontSize:'0.72rem', color:'#0073ea', fontWeight:700, textDecoration:'none', cursor:'pointer'}}>↗ Monday</a>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div style={{display:'flex', gap:2, marginBottom:14, background:$bgSub, borderRadius:crmRd, padding:3, width:'fit-content', flexWrap:'wrap'}}>
                        {[{id:'general',label:'☰ Général'},{id:'equipe',label:'◉ Équipe'},{id:'dates',label:'◫ Dates'},{id:'taches',label:'✓ Tâches'},{id:'financier',label:'€ Financier'},{id:'suivi',label:'▪ Suivi'},{id:'ia',label:'🤖 Analyse IA'}].map(t => (
                          <button key={t.id} onClick={()=>{ window.__aoDetailTab=t.id; setAoSelected(null); setTimeout(()=>setAoSelected(ao.id),0); }} style={{padding:'5px 13px', borderRadius:crmRd, fontSize:'0.74rem', fontWeight: aoDetailTab===t.id ? 700 : 500, background: aoDetailTab===t.id ? $bgCard : 'transparent', color: aoDetailTab===t.id ? $text : $textMut, border: aoDetailTab===t.id ? "1px solid "+$border : '1px solid transparent', cursor:'pointer'}}>{t.label}</button>
                        ))}
                      </div>

                      {/* Tab: Général */}
                      {aoDetailTab === 'general' && (() => {
                        const ext = getExt(ao.id);
                        const nomAff = ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*[^-]+\s*-\s*/,'').slice(0,80) || ao.n;
                        return (
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>
                            {/* Nom affaire full */}
                            <div style={{padding:'9px 12px',borderRadius:crmRd,background:ACC+'08',border:"1px solid "+ACC+"22"}}>
                              <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:3}}>Objet / Nom de l'affaire</div>
                              <div style={{fontSize:'0.85rem',fontWeight:600,color:$text,lineHeight:1.4}}>{ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'')}</div>
                            </div>
                            {/* Grid principale */}
                            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:9}}>
                              <FIELD label="MOA / Client" val={ao.m}/>
                              <FIELD label="Type de marché" val={(tmCfg.emoji+" "+(ao.tm||'—'))} color={tmCfg.color}/>
                              <FIELD label="Type de projet" val={ao.tp}/>
                              {ext.moe && <FIELD label="MOE / BET" val={ext.moe}/>}
                              <FIELD label="Statut" val={cfg.badge} color={cfg.color} accent/>
                              <FIELD label="Priorité" val={ao.p} color={prio.color}/>
                              {ext.mo && <FIELD label="Mode d'attribution" val={ext.mo}/>}
                              {ext.lot && <FIELD label="N° lot" val={"Lot "+ext.lot} mono/>}
                              <FIELD label="Date limite réponse" val={fmtDate(ao.d)} color={dl !== null && dl <= 7 ? '#dc2626' : $text} accent={dl !== null && dl <= 7}/>
                              <FIELD label="Jours restants" val={dl !== null ? (dl < 0 ? "Dépassée +"+Math.abs(dl)+"j" : dl === 0 ? "Aujourd'hui" : dl+" jours") : '—'} color={dlColor(dl)}/>
                              {ext.vo && ext.vo !== '—' && (<div style={{padding:'9px 12px',borderRadius:crmRd,background:ext.vo==='Oui'?'#dc262608':ext.vo==='Conseillée'?'#f59e0b08':$bgSub,border:'1px solid '+(ext.vo==='Oui'?'#dc262622':ext.vo==='Conseillée'?'#f59e0b22':'transparent')}}>
                                <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:3}}>Visite obligatoire</div>
                                <div style={{fontSize:'0.83rem',fontWeight:700,color:ext.vo==='Oui'?'#dc2626':ext.vo==='Conseillée'?'#d97706':'#059669'}}>{ext.vo==='Oui'?'▲ Oui — obligatoire':ext.vo==='Conseillée'?'✧ Conseillée':'✓ Non requise'}</div>
                              </div>)}
                              <FIELD label="Dernière mise à jour" val={fmtDate(ao.u)}/>
                            </div>
                            {/* Drive + Monday */}
                            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                              {ext.drive && (<a href={ext.drive} target="_blank" rel="noreferrer" style={{padding:'6px 13px',borderRadius:crmRd,background:'#1a73e815',color:'#1a73e8',border:'1px solid #1a73e833',fontSize:'0.75rem',fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:5}}><span>▸</span> Dossier Google Drive</a>)}
                              <a href={"https://ezel-batiment.monday.com/boards/6470581185/views/159052052/item/"+ao.id} target="_blank" rel="noreferrer" style={{padding:'6px 13px',borderRadius:crmRd,background:'#0073ea15',color:'#0073ea',border:'1px solid #0073ea33',fontSize:'0.75rem',fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:5}}><span>↗</span> Fiche Monday.com</a>
                              <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(ao.n)} style={{padding:'6px 13px',borderRadius:crmRd,background:$bgSub,color:$textSec,border:"1px solid "+$border,fontSize:'0.75rem',cursor:'pointer',display:'flex',alignItems:'center',gap:5}}><span>☰</span> Copier le nom</button>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Tab: Équipe */}
                      {aoDetailTab === 'equipe' && (() => {
                        const ext = getExt(ao.id);
                        const BADGE = ({name, role, accent}) => (
                          <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:crmRd,background:accent?ACC+'08':$bgSub,border:"1px solid "+(accent?ACC+"22":$border)}}>
                            <div style={{width:34,height:34,borderRadius:4,background:accent?ACC:$border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:800,color:'white',flexShrink:0,fontFamily:"'Courier New',monospace"}}>
                              {(name||'?').split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{fontSize:'0.82rem',fontWeight:700,color:$text}}>{name||'—'}</div>
                              <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:500}}>{role}</div>
                            </div>
                            {accent && <div style={{marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:ACC}}/>}
                          </div>
                        );
                        const resps = (ext.r||'').split(',').map(s=>s.trim()).filter(Boolean);
                        const svs = (ext.sv||'').split(',').map(s=>s.trim()).filter(Boolean);
                        return (
                          <div style={{display:'flex',flexDirection:'column',gap:12}}>
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                              <div style={{padding:'12px 14px',borderRadius:crmRd,background:$bgSub,border:"1px solid "+$border}}>
                                <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:10}}>Responsable(s) dossier</div>
                                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                                  {resps.map((r,i)=>(<BADGE key={i} name={r} role={r.includes('Pierre')?'Chargé d\'Études Étanchéité':'Chargé d\'Études / Bureau d\'Études'} accent={i===0}/>))}
                                </div>
                              </div>
                              <div style={{padding:'12px 14px',borderRadius:crmRd,background:$bgSub,border:"1px solid "+$border}}>
                                <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:10}}>Supervision / Direction</div>
                                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                                  {svs.map((s,i)=>(<BADGE key={i} name={s} role={s.includes('YILMAZ')||s.includes('Direction')?'PDG / Direction':'Supervision externe'}/>))}
                                </div>
                              </div>
                            </div>
                            {/* Chargé d'affaires */}
                            {ext.ca && (
                              <div style={{padding:'10px 14px',borderRadius:crmRd,background:$bgSub,border:"1px solid "+$border,display:'flex',alignItems:'center',gap:10}}>
                                <span style={{fontSize:'1.1rem'}}>🤝</span>
                                <div>
                                  <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:2}}>Chargé d'affaires</div>
                                  <div style={{fontSize:'0.82rem',fontWeight:700,color:$text}}>{ext.ca}</div>
                                </div>
                              </div>
                            )}

                            {/* Procédure GO/No GO */}
                            <div style={{padding:'12px 14px',borderRadius:crmRd,background:$bgSub,border:"1px solid "+$border}}>
                              <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:8}}>Règles d'arbitrage — Bureau d'Études</div>
                              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                                {[
                                  {label:'Pilote dossier', val:'David LEMAIRE', note:'Pilote systématique'},
                                  {label:'GO/No Go', val: ao.b && ao.b > 500000 ? 'Özdogan + David' : ao.b && ao.b > 200000 ? 'David + Özdogan' : 'David LEMAIRE', note:ao.b && ao.b > 500000 ? 'Budget > 500k€' : ao.b && ao.b > 200000 ? 'Budget > 200k€' : 'Budget standard'},
                                  {label:'Coût prépa max', val: ao.o ? ('≤ '+Math.round(ao.o*0.005).toLocaleString('fr-FR')+'€') : '— (offre non renseignée)', note:'Règle 0,5% montant offre'},
                                ].map((r,i)=>(
                                  <div key={i} style={{padding:'9px 11px',borderRadius:crmRd,background:$bgCard,border:"1px solid "+$border}}>
                                    <div style={{fontSize:'0.61rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700,marginBottom:3}}>{r.label}</div>
                                    <div style={{fontSize:'0.82rem',fontWeight:700,color:$text}}>{r.val}</div>
                                    <div style={{fontSize:'0.65rem',color:$textMut,marginTop:2}}>{r.note}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Resp. visite */}
                            {ext.vo && ext.vo !== 'Non' && ext.vo !== '—' && (
                              <div style={{padding:'10px 14px',borderRadius:crmRd,background:'#f59e0b08',border:'1px solid #f59e0b22',display:'flex',alignItems:'center',gap:10}}>
                                <span style={{fontSize:'1.2rem'}}>👁️</span>
                                <div>
                                  <div style={{fontSize:'0.73rem',fontWeight:700,color:'#d97706'}}>Visite {ext.vo === 'Oui' ? 'obligatoire' : 'conseillée'} — Responsable visite</div>
                                  <div style={{fontSize:'0.78rem',color:$text,marginTop:2}}>
                                    {resps[0]||'David LEMAIRE'}
                                    {ao.tp && ao.tp.toLowerCase().includes('tancheit') ? ' & Pierre SEMERCI (Étanchéité)' : ''}
                                    {ext.dv ? ' · Date planifiée : '+ext.dv : ' · Date non planifiée'}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Tab: Dates */}
                      {aoDetailTab === 'dates' && (() => {
                        const ext = getExt(ao.id);
                        const today = new Date();
                        const parseD = d => d ? new Date(d.split(' ')[0]) : null;
                        const diffJ = d => { const dt = parseD(d); if(!dt) return null; return Math.round((dt-today)/(1000*60*60*24)); };
                        const dlDeadline = diffJ(ao.d);
                        const dlDepot = diffJ(ext.dd);
                        const dlVisite = diffJ(ext.dv);
                        const DateCard = ({label, date, icon, urgent, done, note}) => {
                          const d = diffJ(date);
                          const color = !date ? $textMut : done ? '#059669' : d!==null&&d<0 ? '#9ca3af' : d!==null&&d<=3 ? '#dc2626' : d!==null&&d<=7 ? '#f97316' : d!==null&&d<=14 ? '#d97706' : '#059669';
                          return (
                            <div style={{padding:'14px 16px',borderRadius:crmRd,background:!date?$bgSub:done?'#05966910':d!==null&&d<=7?'#dc262608':$bgSub,border:"1px solid "+(d!==null&&d<=7&&!done?'#dc262622':$border)}}>
                              <div style={{fontSize:'0.62rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:4}}>{icon} {label}</div>
                              <div style={{fontSize:'1.1rem',fontWeight:800,color:color}}>{date?date.split(' ')[0].split('-').reverse().join('/') :'—'}</div>
                              {d !== null && !done && (
                                <div style={{fontSize:'0.7rem',color:color,marginTop:3,fontWeight:600}}>
                                  {d<0 ? 'Passée ('+Math.abs(d)+' j)' : d===0 ? "Aujourd'hui ▲" : 'J-'+d}
                                </div>
                              )}
                              {note && <div style={{fontSize:'0.65rem',color:$textMut,marginTop:3}}>{note}</div>}
                            </div>
                          );
                        };
                        return (
                          <div style={{display:'flex',flexDirection:'column',gap:12}}>
                            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:9}}>
                              <DateCard label="Date limite de réponse" date={ao.d} icon="🔴" note="Deadline officielle MOA"/>
                              <DateCard label="Date de dépôt effective" date={ext.dd||ao.d} icon="↥" note={ext.dd?'Dépôt effectué':'Prévue = deadline'}/>
                              <DateCard label="Date de visite" date={ext.dv} icon="◆" note={ext.vo==='Oui'?'Visite obligatoire':ext.vo==='Conseillée'?'Visite conseillée':'Visite non requise'}/>
                              <DateCard label="Dernière mise à jour" date={ao.u} icon="↻" note="Dernière activité Monday"/>
                            </div>
                            {ext.dtx && (
                              <div style={{padding:'12px 14px',borderRadius:crmRd,background:'#059669'+10,border:'1px solid #05966930'}}>
                                <div style={{fontSize:'0.62rem',color:'#059669',textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700,marginBottom:4}}>📆 Dates prévisionnelles travaux</div>
                                <div style={{fontSize:'0.88rem',fontWeight:700,color:$text}}>{ext.dtx.replace('→','→')}</div>
                              </div>
                            )}
                            {/* Timeline visuelle */}
                            <div style={{padding:'12px 14px',borderRadius:crmRd,background:$bgSub}}>
                              <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Chronologie du dossier</div>
                              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                                {[
                                  {label:'AO identifié',date:ao.n.match(/^(\d{4}\.\d{2}\.\d{2})/)?.[1]?.replace(/\./g,'-'),icon:'⌕',done:true},
                                  {label:'Visite terrain',date:ext.dv,icon:'◆',done:!!ext.dv&&diffJ(ext.dv)<0},
                                  {label:'Date limite réponse',date:ao.d,icon:'⏰',done:!!ao.d&&dlDeadline<0},
                                  {label:'Dépôt',date:ext.dd||ao.d,icon:'↥',done:['En attente de Réponse','En cours de négociation','Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].includes(ao.s)},
                                  {label:'Résultat attendu',date:null,icon:'🏆',done:['Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].includes(ao.s)},
                                ].map((step,i)=>{
                                  const d = step.date?diffJ(step.date):null;
                                  const isNext = !step.done && (i===0 || [
                                    {label:'AO identifié',date:ao.n.match(/^(\d{4}\.\d{2}\.\d{2})/)?.[1]?.replace(/\./g,'-'),done:true},
                                    {label:'Visite terrain',date:ext.dv,done:!!ext.dv&&diffJ(ext.dv)<0},
                                    {label:'Date limite réponse',date:ao.d,done:!!ao.d&&dlDeadline<0},
                                    {label:'Dépôt',date:ext.dd||ao.d,done:['En attente de Réponse','En cours de négociation','Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].includes(ao.s)},
                                    {label:'Résultat attendu',date:null,done:['Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].includes(ao.s)},
                                  ][i-1]?.done);
                                  return (
                                    <div key={i} style={{display:'flex',alignItems:'center',gap:10}}>
                                      <div style={{width:26,height:26,borderRadius:'50%',background:step.done?'#059669':isNext?ACC:$border,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',flexShrink:0}}>
                                        {step.done?'✓':step.icon}
                                      </div>
                                      <div style={{flex:1,fontSize:'0.78rem',color:step.done?'#059669':isNext?$text:$textMut,fontWeight:step.done||isNext?600:400}}>
                                        {step.label}
                                      </div>
                                      <div style={{fontSize:'0.72rem',color:d!==null&&d<=3&&!step.done?'#dc2626':$textMut,fontWeight:600}}>
                                        {step.date?step.date.split('-').reverse().join('/'):step.done?'✓':'—'}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Tab: Tâches */}
                      {aoDetailTab === 'taches' && (() => {
                        const STAT_CFG = {
                          'Fait':    {c:'#059669',bg:'#05966912',icon:'✓'},
                          'En cours':{c:'#f59e0b',bg:'#f59e0b12',icon:'●'},
                          'À faire': {c:'#4a90c4',bg:'#579bfc12',icon:'○'},
                          'Bloqué':  {c:'#dc2626',bg:'#dc262612',icon:'✕'},
                        };
                        const tachesData = seTaches || (SOUS_ELEMENTS[ao.id] ? [...SOUS_ELEMENTS[ao.id]] : null);
                        const isReal = !!tachesData;
                        const autoTaches = getAutoTaches(ao.s);
                        const taches = tachesData
                          ? tachesData.map(t=>({...t,statut:t.statut||'À faire'}))
                          : autoTaches.map(t=>({id:t.id,nom:t.label,statut:t.auto_statut,resp:t.resp,date:'',doc:''}));
                        const done = taches.filter(t=>t.statut==='Fait').length;
                        const total = taches.length;
                        const pct = total>0?Math.round(done/total*100):0;
                        return (
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>
                            {/* Header */}
                            <div style={{padding:'12px 14px',borderRadius:crmRd,background:$bgSub,border:"1px solid "+$border}}>
                              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                                <div style={{display:'flex',alignItems:'center',gap:8}}>
                                  <div style={{fontSize:'0.75rem',fontWeight:700,color:$text}}>Progression</div>
                                  {isReal&&<span style={{fontSize:'0.62rem',padding:'1px 7px',borderRadius:6,background:'#0073ea15',color:'#0073ea',fontWeight:700,border:'1px solid #0073ea30'}}>Monday.com live</span>}
                                </div>
                                <div style={{fontSize:'0.8rem',fontWeight:800,color:pct===100?'#059669':pct>50?'#d97706':'#3b82f6'}}>{pct}% — {done}/{total}</div>
                              </div>
                              <div style={{height:7,borderRadius:4,background:$border,overflow:'hidden'}}>
                                <div style={{height:'100%',width:pct+'%',background:pct===100?'#059669':pct>50?'#d97706':'#4a90c4',borderRadius:4,transition:'width 0.4s'}}/>
                              </div>
                              <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                                {Object.entries(STAT_CFG).map(([s,cfg])=>{
                                  const cnt=taches.filter(t=>t.statut===s).length;
                                  return cnt>0?<span key={s} style={{padding:'2px 8px',borderRadius:7,background:cfg.bg,color:cfg.c,fontSize:'0.66rem',fontWeight:700}}>{s} {cnt}</span>:null;
                                })}
                              </div>
                            </div>

                            {/* Table des tâches */}
                            <div style={{border:"1px solid "+$border,borderRadius:crmRd,overflow:'hidden',background:$bgCard}}>
                              <div style={{display:'grid',gridTemplateColumns:'1fr 100px 90px 90px 32px',background:$bgSub,borderBottom:"1px solid "+$border}}>
                                {['Tâche','Responsable','Échéance','Statut',''].map((h,i)=>(
                                  <div key={i} style={{padding:'7px 10px',fontSize:'0.62rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>{h}</div>
                                ))}
                              </div>
                              {taches.map((t,i)=>{ const cfg=STAT_CFG[t.statut]||STAT_CFG['À faire']; return (
                                <div key={t.id} style={{display:'grid',gridTemplateColumns:'1fr 100px 90px 90px 32px',borderBottom:i<taches.length-1?"1px solid "+$borderLight:'none',background:t.statut==='En cours'?ACC+'05':$bgCard,transition:'background 0.1s'}}>
                                  <div style={{padding:'9px 10px',display:'flex',alignItems:'center',gap:8}}>
                                    <div style={{width:16,height:16,borderRadius:'50%',background:cfg.bg,border:"1.5px solid "+cfg.c,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'0.55rem',color:cfg.c,fontWeight:800}}>{cfg.icon}</div>
                                    <span style={{fontSize:'0.79rem',fontWeight:t.statut==='En cours'?700:500,color:t.statut==='Fait'?$textMut:$text,textDecoration:t.statut==='Fait'?'line-through':undefined}}>{t.nom}</span>
                                  </div>
                                  <div style={{padding:'9px 10px',fontSize:'0.73rem',color:$textSec,display:'flex',alignItems:'center'}}>{t.resp||<span style={{color:$textMut,fontStyle:'italic'}}>—</span>}</div>
                                  <div style={{padding:'9px 10px',fontSize:'0.73rem',color:t.date?(new Date(t.date)<new Date()?'#dc2626':$textSec):$textMut,display:'flex',alignItems:'center'}}>{t.date||'—'}</div>
                                  <div style={{padding:'9px 8px',display:'flex',alignItems:'center',position:'relative'}}>
                                    <button onClick={(e)=>{e.stopPropagation();setStatDrop(seStatDrop===t.id?null:t.id);}} style={{padding:'2px 8px',borderRadius:7,background:cfg.bg,color:cfg.c,fontSize:'0.65rem',fontWeight:700,border:'none',cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>{t.statut}</button>
                                    {seStatDrop===t.id&&(<>
                                      <div onClick={(e)=>{e.stopPropagation();setSeStatDrop(null);}} style={{position:'fixed',inset:0,zIndex:9997}}/>
                                      <div style={{position:'absolute',top:'100%',left:0,zIndex:9998,background:$bgCard,border:"1px solid "+$borderAlt,borderRadius:crmRd,padding:4,boxShadow:'0 8px 24px rgba(0,0,0,0.12)',minWidth:130}} onClick={e=>e.stopPropagation()}>
                                        {Object.keys(STAT_CFG).map(s=>(<button key={s} onClick={(e)=>{e.stopPropagation();const newT=taches.map(x=>x.id===t.id?{...x,statut:s}:x);if(tachesData){SOUS_ELEMENTS[ao.id]=newT;}setSeTaches(newT);setSeStatDrop(null);}} style={{display:'block',width:'100%',padding:'6px 10px',borderRadius:Math.max(crmRd-2,0),border:'none',background:STAT_CFG[s].bg,color:STAT_CFG[s].c,fontSize:'0.73rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit',marginBottom:2,textAlign:'left'}}>{STAT_CFG[s].icon} {s}</button>))}
                                      </div>
                                    </>)}
                                  </div>
                                  <div style={{padding:'9px 6px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    {t.doc&&<a href={t.doc} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:'0.8rem',textDecoration:'none',opacity:0.7}} title="Ouvrir document">§</a>}
                                  </div>
                                </div>
                              );})}
                            </div>

                            {!isReal&&<div style={{padding:'7px 12px',borderRadius:crmRd,background:$bgSub,fontSize:'0.67rem',color:$textMut,textAlign:'center'}}>
                              ✧ Tâches auto-calculées — sous-éléments Monday.com (board 6476016642) non encore synchronisés pour ce dossier.
                            </div>}
                          </div>
                        );
                      })()}

                      {/* Tab: Financier */}
                      {aoDetailTab === 'financier' && (
                        <div style={{display:'flex', flexDirection:'column', gap:12}}>
                          {/* Big numbers */}
                          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:9}}>
                            <div style={{padding:'14px 16px', borderRadius:crmRd, background:'#0055cc0d', border:'1px solid #0055cc22', gridColumn:'span 1'}}>
                              <div style={{fontSize:'0.62rem', color:'#0055cc', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:4}}>Budget estimé</div>
                              <div style={{fontSize:'1.6rem', fontWeight:800, color:'#0055cc', lineHeight:1}}>{fmtM(ao.b)}</div>
                              <div style={{fontSize:'0.68rem', color:$textMut, marginTop:4}}>Estimation maître d'ouvrage</div>
                            </div>
                            <div style={{padding:'14px 16px', borderRadius:crmRd, background: ao.o ? '#05966910' : $bgSub, border: ao.o ? '1px solid #05966930' : '1px solid transparent'}}>
                              <div style={{fontSize:'0.62rem', color:'#059669', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:4}}>Montant offre</div>
                              <div style={{fontSize:'1.6rem', fontWeight:800, color:ao.o?'#059669':$textMut, lineHeight:1}}>{fmtM(ao.o)}</div>
                              <div style={{fontSize:'0.68rem', color:$textMut, marginTop:4}}>Notre proposition</div>
                            </div>
                            <div style={{padding:'14px 16px', borderRadius:crmRd, background: delta !== null ? (parseFloat(delta)>10?'#dc262610':parseFloat(delta)<-10?'#05966910':'#f59e0b10') : $bgSub, border:'1px solid transparent'}}>
                              <div style={{fontSize:'0.62rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:4}}>Delta budget/offre</div>
                              <div style={{fontSize:'1.6rem', fontWeight:800, color: delta !== null ? (parseFloat(delta)>10?'#dc2626':parseFloat(delta)<-10?'#059669':'#d97706') : $textMut, lineHeight:1}}>
                                {delta !== null ? (parseFloat(delta)>0?'+':'')+delta+'%' : '—'}
                              </div>
                              <div style={{fontSize:'0.68rem', color:$textMut, marginTop:4}}>{delta !== null ? (parseFloat(delta)>10?'Offre supérieure':parseFloat(delta)<-10?'Offre compétitive':'Dans la fourchette') : 'Offre non renseignée'}</div>
                            </div>
                          </div>
                          {/* Gauge */}
                          {ao.b > 0 && ao.o > 0 && (() => {
                            const pctBar = Math.min(200, Math.round(ao.o/ao.b*100));
                            const bar1 = Math.min(100, pctBar);
                            const bar2 = pctBar > 100 ? pctBar - 100 : 0;
                            return (
                              <div style={{padding:'12px 14px', borderRadius:crmRd, background:$bgSub}}>
                                <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                                  <span style={{fontSize:'0.7rem', color:$textMut, fontWeight:600}}>Offre vs Budget</span>
                                  <span style={{fontSize:'0.7rem', fontWeight:700, color:parseFloat(delta)>0?'#dc2626':'#059669'}}>{Math.round(ao.o/ao.b*100)}%</span>
                                </div>
                                <div style={{position:'relative', height:8, borderRadius:4, background:$border, overflow:'hidden'}}>
                                  <div style={{position:'absolute', left:0, top:0, height:'100%', width:bar1+'%', background: bar2>0?'#f59e0b':'#059669', borderRadius:4}}/>
                                  {bar2>0 && <div style={{position:'absolute', left:'100%', transform:'translateX(-'+(100-bar1)+'%)', top:0, height:'100%', width:bar2+'%', background:'#dc2626'}}/>}
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', marginTop:4}}>
                                  <span style={{fontSize:'0.62rem', color:$textMut}}>0</span>
                                  <span style={{fontSize:'0.62rem', color:'#0055cc', fontWeight:700}}>Budget: {fmtM(ao.b)}</span>
                                  <span style={{fontSize:'0.62rem', color:$textMut}}>200%</span>
                                </div>
                              </div>
                            );
                          })()}
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9}}>
                            <FIELD label="Budget / m²" val={ao.b && ao.surface ? fmtM(ao.b/ao.surface)+'/m²' : '—'}/>
                            <FIELD label="Tranche" val={ao.b > 5000000 ? "> 5M€" : ao.b > 1000000 ? "1-5M€" : ao.b > 500000 ? "500k-1M€" : ao.b > 0 ? "< 500k€" : "—"}/>
                            <FIELD label="Groupe" val={getScfg(ao.s).group === 'gagne' ? "Chiffre d'affaires" : getScfg(ao.s).group === 'actif' ? "Pipeline" : "Non valorisé"}/>
                            <FIELD label="Taux succès type" val={(() => { const t = DATA_NO_DOUBLON.filter(a=>a.tp===ao.tp); const g=t.filter(a=>getScfg(a.s).group==='gagne').length; const f=t.filter(a=>['gagne','perdu'].includes(getScfg(a.s).group)).length; return f>0?Math.round(g/f*100)+'%':'—'; })()}/>
                          </div>
                        </div>
                      )}

                      {/* Tab: Suivi */}
                      {aoDetailTab === 'suivi' && (
                        <div style={{display:'flex', flexDirection:'column', gap:12}}>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9}}>
                            <FIELD label="Statut courant" val={ao.s} color={cfg.color} accent/>
                            <FIELD label="Groupe pipeline" val={getScfg(ao.s).group === 'actif' ? "🔥 Actif" : getScfg(ao.s).group === 'gagne' ? "🍾 Gagné" : "▸ Perdu"}/>
                            <FIELD label="Date limite" val={fmtDate(ao.d)} color={dl !== null && dl <= 7 ? '#dc2626' : $text}/>
                            <FIELD label="Urgence" val={dl !== null ? (dl < 0 ? "Dépassée" : dl === 0 ? "Aujourd'hui" : dl <= 3 ? "Critique" : dl <= 7 ? "Urgent" : dl <= 14 ? "À surveiller" : "Normal") : '—'} color={dl !== null ? (dl < 0 ? '#9ca3af' : dl <= 3 ? '#dc2626' : dl <= 7 ? '#f97316' : dl <= 14 ? '#d97706' : '#059669') : $textMut}/>
                          </div>
                          {/* Timeline statut */}
                          <div style={{padding:'12px 14px', borderRadius:crmRd, background:$bgSub}}>
                            <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10}}>Pipeline de progression</div>
                            <div style={{display:'flex', alignItems:'center', gap:0, overflowX:'auto'}}>
                              {[
                                {s:'À Préparer', label:'Prépa'}, {s:'En préparation', label:'En cours'}, {s:'En attente de Réponse', label:'Déposé'},
                                {s:'AO sélectionné', label:'Sélectionné'}, {s:'Accepté 🍾', label:'Gagné'},
                              ].map((step, i, arr) => {
                                const stepCfg = getScfg(step.s);
                                const isActive = ao.s === step.s;
                                const isPast = (['À Préparer','Visite rdv à prendre','En préparation','Demandes de précisions','En attente de Réponse','AO sélectionné','Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'].indexOf(ao.s)) >= i;
                                return (
                                  <React.Fragment key={step.s}>
                                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4, flex:'0 0 auto'}}>
                                      <div style={{width:28, height:28, borderRadius:'50%', background:isActive ? ACC : isPast ? '#059669' : $border, border:isActive ? "2px solid "+ACC : 'none', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', fontWeight:800, color:isActive||isPast?'white':$textMut}}>
                                        {isPast&&!isActive?'✓':i+1}
                                      </div>
                                      <div style={{fontSize:'0.6rem', color:isActive?ACC:isPast?'#059669':$textMut, fontWeight:isActive?700:500, textAlign:'center', maxWidth:55, lineHeight:1.2}}>{step.label}</div>
                                    </div>
                                    {i < arr.length-1 && <div style={{flex:1, height:2, background:isPast&&!isActive?'#05966960':$border, minWidth:16}}/>}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                          {/* Concurrents / context */}
                          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:9}}>
                            <div style={{padding:'12px 14px', borderRadius:crmRd, background:$bgSub, gridColumn:'span 2'}}>
                              <div style={{fontSize:'0.62rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:6}}>Actions disponibles</div>
                              <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                                <a href={mondayLink} target="_blank" rel="noreferrer" style={{padding:'5px 11px', borderRadius:crmRd, background:'#0073ea15', color:'#0073ea', border:'1px solid #0073ea33', fontSize:'0.73rem', fontWeight:700, textDecoration:'none'}}>↗ Ouvrir dans Monday</a>
                                <button onClick={()=>{ navigator.clipboard&&navigator.clipboard.writeText(ao.n); }} style={{padding:'5px 11px', borderRadius:crmRd, background:$bgSub, color:$textSec, border:"1px solid "+$border, fontSize:'0.73rem', cursor:'pointer'}}>☰ Copier le nom</button>
                                {getScfg(ao.s).group === 'actif' && (
                                  <button onClick={()=>setOngletActif('suivi_dossiers')} style={{padding:'5px 11px', borderRadius:crmRd, background:'#007ab515', color:'#007ab5', border:'1px solid #007ab533', fontSize:'0.73rem', fontWeight:700, cursor:'pointer'}}>☰ Voir dans Suivi Dossiers →</button>
                                )}
                                {getExt(ao.id).drive && (
                                  <a href={getExt(ao.id).drive} target="_blank" rel="noreferrer" style={{padding:'5px 11px', borderRadius:crmRd, background:'#1a73e815', color:'#1a73e8', border:'1px solid #1a73e833', fontSize:'0.73rem', fontWeight:700, textDecoration:'none'}}>▸ Dossier Drive</a>
                                )}
                              </div>
                            </div>
                            <div style={{padding:'12px 14px', borderRadius:crmRd, background:$bgSub}}>
                              <div style={{fontSize:'0.62rem', color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:6}}>Sous-éléments</div>
                              <div style={{fontSize:'0.8rem', color:$textMut, fontStyle:'italic'}}>Synchronisation Supabase à venir</div>
                            </div>
                          </div>
                          {/* Contexte marché */}
                          <div style={{padding:'12px 14px', borderRadius:crmRd, background:$bgSub}}>
                            <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8}}>Contexte — {ao.tp||'Type projet'}</div>
                            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8}}>
                              {(() => {
                                const similaires = DATA_NO_DOUBLON.filter(a=>a.tp===ao.tp&&a.id!==ao.id);
                                const gS=similaires.filter(a=>getScfg(a.s).group==='gagne').length;
                                const fS=similaires.filter(a=>['gagne','perdu'].includes(getScfg(a.s).group)).length;
                                return [
                                  {label:'AO similaires', val:similaires.length},
                                  {label:'Taux succès type', val:fS>0?Math.round(gS/fS*100)+'%':'—'},
                                  {label:'Budget moy. type', val:similaires.length?fmtM(similaires.reduce((s,a)=>s+(a.b||0),0)/similaires.length):'—'},
                                  {label:'Offre moy. type', val:similaires.filter(a=>a.o>0).length?fmtM(similaires.filter(a=>a.o>0).reduce((s,a)=>s+a.o,0)/similaires.filter(a=>a.o>0).length):'—'},
                                ].map((r,i)=>(<div key={i}><div style={{fontSize:'0.61rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700,marginBottom:2}}>{r.label}</div><div style={{fontSize:'0.88rem',fontWeight:700,color:$text}}>{r.val}</div></div>));
                              })()}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── TAB IA ── */}
                      {aoDetailTab === 'ia' && (() => {
                        const iaKey = 'ia_'+ao.id;
                        const iaResult = window[iaKey] || null;
                        const iaLoading = window[iaKey+'_loading'] || false;
                        const iaError = window[iaKey+'_err'] || null;
                        const docs = iaDocs[ao.id] || [];
                        const gcsPath = iaGcsPath[ao.id] || '';
                        const cctpText = iaCctpText[ao.id] || '';
                        const mode = iaMode[ao.id] || 'paste';

                        const FILE_ICONS = {pdf:'▫',docx:'✎',doc:'✎',xlsx:'▦',xls:'▦',pptx:'📑',txt:'📃',default:'§'};
                        const getIcon = name => FILE_ICONS[(name||'').split('.').pop().toLowerCase()] || FILE_ICONS.default;
                        const fmtSize = b => b>1048576?(b/1048576).toFixed(1)+'MB':b>1024?(b/1024).toFixed(0)+'KB':b+'B';

                        const handleFileAdd = async (e) => {
                          const files = Array.from(e.target.files||[]);
                          const newDocs = [];
                          for (const file of files) {
                            const ext = file.name.split('.').pop().toLowerCase();
                            if (['pdf','docx','doc','xlsx','xls','txt','csv'].includes(ext)) {
                              if (ext === 'pdf') {
                                const b64 = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
                                newDocs.push({name:file.name,type:'pdf',content:b64,size:file.size,mediaType:'application/pdf'});
                              } else {
                                const txt = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsText(file,'UTF-8');});
                                newDocs.push({name:file.name,type:ext,content:txt,size:file.size,mediaType:'text/plain'});
                              }
                            }
                          }
                          setIaDocs(p=>({...p,[ao.id]:[...(p[ao.id]||[]),...newDocs]}));
                          e.target.value='';
                        };

                        const removeDoc = (idx) => setIaDocs(p=>({...p,[ao.id]:(p[ao.id]||[]).filter((_,i)=>i!==idx)}));

                        const buildMessages = (prompt) => {
                          const msgs = [];
                          const contentBlocks = [];
                          // Add PDF docs as document blocks
                          const pdfDocs = docs.filter(d=>d.type==='pdf');
                          const txtDocs = docs.filter(d=>d.type!=='pdf');
                          for (const d of pdfDocs) {
                            contentBlocks.push({type:'document',source:{type:'base64',media_type:'application/pdf',data:d.content}});
                          }
                          // Add text docs + pasted CCTP as text
                          let extraTxt = '';
                          for (const d of txtDocs) extraTxt += '\n\n--- FICHIER : '+d.name+' ---\n'+d.content.slice(0,8000);
                          if (cctpText.trim()) extraTxt += '\n\n--- CCTP COLLÉ ---\n'+cctpText.slice(0,12000);
                          if (gcsPath.trim()) extraTxt += '\n\n(Note: chemin GCS renseigné : '+gcsPath+' — intégration native à venir en Phase 1 Supabase)';
                          contentBlocks.push({type:'text',text:prompt+(extraTxt?'\n'+extraTxt:'')});
                          msgs.push({role:'user',content:contentBlocks});
                          return msgs;
                        };

                        const triggerIA = async () => {
                          window[iaKey+'_loading'] = true;
                          setAoSelected(null); setTimeout(()=>setAoSelected(ao.id),10);
                          try {
                            const ext = getExt(ao.id);
                            const hasDocContent = docs.length > 0 || cctpText.trim().length > 0;
                            const prompt = hasDocContent
                              ? `Tu es expert en Bureau d'Études BTP, spécialisé dans la réponse aux appels d'offres en France (IDF).

Analyse les documents du DCE ci-joints pour le marché suivant :

**DOSSIER : ${ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'')}**
- MOA : ${ao.m||'—'} · Type : ${ao.tm||'—'} · Budget : ${ao.b?(ao.b/1000).toFixed(0)+'k€':'NC'}
- Responsable : ${ext.r||'David LEMAIRE'} · Deadline : ${ao.d||'—'}

Fournis une analyse complète DCE en 6 sections :

## 1. RÉSUMÉ DU MARCHÉ
Synthèse des pièces du DCE (CCTP, RC, DPGF).

## 2. EXIGENCES TECHNIQUES CLÉS
Points techniques critiques à respecter absolument.

## 3. CLAUSES CONTRACTUELLES À SURVEILLER
Pénalités, délais, garanties, conditions particulières.

## 4. RÉFÉRENCES DEMANDÉES
Références chantiers requises, certifications, qualifications.

## 5. AXES DE DIFFÉRENCIATION
Comment se démarquer sur ce marché précis.

## 6. RECOMMANDATION GO/NO-GO
Avec niveau de priorité (1=maximum, 3=normal) et actions immédiates.`
                              : `Tu es expert en Bureau d'Études BTP, spécialisé dans la réponse aux Appels d'Offres en France (IDF).

Analyse cet AO et donne des recommandations stratégiques :

**DOSSIER : ${ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'')}**
- MOA : ${ao.m||'—'} · Type : ${ao.tm||'—'} · Budget : ${ao.b?(ao.b/1000).toFixed(0)+'k€':'NC'}
- Responsable : ${ext.r||'David LEMAIRE'} · Deadline : ${ao.d||'—'}
- Visite : ${ext.vo||'Non précisé'}${ext.dv?' le '+ext.dv:''} · Lot : ${ext.lot||'Unique'} · MOE : ${ext.moe||'NC'}

## 1. RÉSUMÉ STRATÉGIQUE
## 2. POINTS CLÉS À SURVEILLER
## 3. AXES DE DIFFÉRENCIATION
## 4. ESTIMATION RESSOURCES
## 5. RECOMMANDATION GO/NO-GO`;

                            const messages = buildMessages(prompt);
                            const resp = await fetch('https://api.anthropic.com/v1/messages', {
                              method:'POST',
                              headers:{'Content-Type':'application/json'},
                              body:JSON.stringify({
                                model:'claude-sonnet-4-20250514',
                                max_tokens:hasDocContent?2000:1000,
                                system:"Tu es expert en Bureau d'Études BTP et réponse aux appels d'offres en France. Tes analyses sont précises, pragmatiques et directement actionnables.",
                                messages
                              })
                            });
                            const data = await resp.json();
                            window[iaKey] = data.content?.[0]?.text || 'Erreur — réponse vide';
                            window[iaKey+'_loading'] = false;
                            window[iaKey+'_err'] = null;
                          } catch(err) {
                            window[iaKey+'_loading'] = false;
                            window[iaKey+'_err'] = err.message;
                          }
                          setAoSelected(null); setTimeout(()=>setAoSelected(ao.id),10);
                        };

                        const renderMd = (txt) => {
                          if (!txt) return null;
                          return txt.split('\n').map((line,i) => {
                            if (line.startsWith('## ')) return <div key={i} style={{fontSize:'0.78rem',fontWeight:800,color:ACC,textTransform:'uppercase',letterSpacing:'0.05em',marginTop:14,marginBottom:4,paddingBottom:4,borderBottom:'1px solid '+ACC+'30'}}>{line.replace(/^## /,'')}</div>;
                            if (line.startsWith('- ') || line.startsWith('• ')) return <div key={i} style={{display:'flex',gap:6,alignItems:'flex-start',fontSize:'0.79rem',color:$text,marginBottom:3}}><span style={{color:ACC,flexShrink:0,marginTop:2}}>›</span><span>{line.replace(/^[-•] /,'').replace(/\*\*([^*]+)\*\*/g,'$1')}</span></div>;
                            if (line.match(/^\d+\./)) return <div key={i} style={{fontSize:'0.79rem',color:$text,marginBottom:3,paddingLeft:4}}>{line.replace(/\*\*([^*]+)\*\*/g,'$1')}</div>;
                            if (line.trim()==='') return <div key={i} style={{height:4}}/>;
                            return <div key={i} style={{fontSize:'0.79rem',color:$text,marginBottom:3,lineHeight:1.5}}>{line.replace(/\*\*([^*]+)\*\*/g,'$1')}</div>;
                          });
                        };

                        return (
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>

                            {/* ── HEADER ── */}
                            <div style={{padding:'12px 14px',borderRadius:crmRd,background:'linear-gradient(135deg,'+ACC+'08,'+ACC+'03)',border:'1px solid '+ACC+'22',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                              <div style={{display:'flex',alignItems:'center',gap:10}}>
                                <div style={{width:34,height:34,borderRadius:8,background:ACC,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>🤖</div>
                                <div>
                                  <div style={{fontSize:'0.82rem',fontWeight:800,color:$text}}>Analyse IA du DCE</div>
                                  <div style={{fontSize:'0.68rem',color:$textMut}}>{docs.length>0||cctpText.trim()?`Avec ${docs.length} fichier${docs.length>1?'s':''}${cctpText.trim()?' + texte collé':''}  · analyse complète DCE`:'Sans documents · analyse stratégique métadonnées'}</div>
                                </div>
                              </div>
                              <button onClick={triggerIA} disabled={iaLoading} style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:crmRd,border:'none',background:iaLoading?$bgSub:ACC,color:iaLoading?$textMut:'#fff',fontSize:'0.78rem',fontWeight:700,cursor:iaLoading?'wait':'pointer',flexShrink:0}}>
                                {iaLoading?<><span style={{display:'inline-block',width:10,height:10,border:'1.5px solid #007ab530',borderTopColor:ACC,borderRadius:'50%'}}/> Analyse...</>:iaResult?'↺ Relancer':'▶ Analyser'}
                              </button>
                            </div>

                            {/* ── DOCUMENTS DCE ── */}
                            <div style={{background:$bgCard,borderRadius:crmRd,border:'1px solid '+$border,overflow:'hidden'}}>
                              <div style={{padding:'8px 14px',background:$bgSub,borderBottom:'1px solid '+$border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>Documents DCE</span>
                                <div style={{display:'flex',gap:4}}>
                                  {['paste','file','gcs'].map(m=>(
                                    <button key={m} onClick={()=>setIaMode(p=>({...p,[ao.id]:m}))} style={{padding:'3px 9px',borderRadius:crmRd,border:'1px solid '+(mode===m?ACC:$border),background:mode===m?ACC+'15':'transparent',color:mode===m?ACC:$textMut,fontSize:'0.68rem',fontWeight:mode===m?700:400,cursor:'pointer'}}>
                                      {m==='paste'?'✎ Coller texte':m==='file'?'§ Fichiers':'☁ GCS'}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div style={{padding:'10px 14px'}}>

                                {/* PASTE MODE */}
                                {mode==='paste'&&(
                                  <div>
                                    <div style={{fontSize:'0.72rem',color:$textMut,marginBottom:6}}>Colle le contenu du CCTP, RC ou tout texte extrait des pièces du DCE :</div>
                                    <textarea value={cctpText} onChange={e=>setIaCctpText(p=>({...p,[ao.id]:e.target.value}))} placeholder={"Colle ici le texte du CCTP, règlement de consultation, DPGF...\n\nEx: Copie le contenu Word/PDF depuis Google Drive"} rows={6} style={{width:'100%',padding:'8px 10px',borderRadius:crmRd,border:'1px solid '+$border,fontSize:'0.75rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box',lineHeight:1.5}}/>
                                    {cctpText.trim()&&<div style={{fontSize:'0.66rem',color:'#059669',marginTop:4}}>✓ {cctpText.trim().split(' ').length.toLocaleString('fr-FR')} mots · {Math.round(cctpText.length/4).toLocaleString('fr-FR')} tokens estimés</div>}
                                  </div>
                                )}

                                {/* FILE MODE */}
                                {mode==='file'&&(
                                  <div>
                                    <div style={{fontSize:'0.72rem',color:$textMut,marginBottom:8}}>Fichiers acceptés : PDF, DOCX, XLSX, TXT, CSV (max 10MB/fichier)</div>
                                    <label style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderRadius:crmRd,border:'2px dashed '+ACC+'40',background:ACC+'05',cursor:'pointer',marginBottom:docs.length?8:0}}>
                                      <span style={{fontSize:'1.2rem'}}>§</span>
                                      <div>
                                        <div style={{fontSize:'0.78rem',fontWeight:700,color:ACC}}>Cliquer pour ajouter des fichiers</div>
                                        <div style={{fontSize:'0.66rem',color:$textMut}}>PDF → analyse native · DOCX/XLSX → extraction texte</div>
                                      </div>
                                      <input type="file" multiple accept=".pdf,.docx,.doc,.xlsx,.xls,.txt,.csv" style={{display:'none'}} onChange={handleFileAdd}/>
                                    </label>
                                    {docs.map((d,i)=>(
                                      <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:crmRd,background:$bgSub,border:'1px solid '+$border,marginBottom:4}}>
                                        <span style={{fontSize:'1rem'}}>{getIcon(d.name)}</span>
                                        <span style={{fontSize:'0.76rem',fontWeight:600,color:$text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.name}</span>
                                        <span style={{fontSize:'0.65rem',color:$textMut,flexShrink:0}}>{fmtSize(d.size)}</span>
                                        <span style={{fontSize:'0.62rem',padding:'1px 6px',borderRadius:4,background:d.type==='pdf'?'#dc262612':'#05966912',color:d.type==='pdf'?'#dc2626':'#059669',fontWeight:700}}>{d.type==='pdf'?'PDF natif':'Texte extrait'}</span>
                                        <button onClick={()=>removeDoc(i)} style={{background:'none',border:'none',color:$textMut,cursor:'pointer',fontSize:'0.8rem',padding:'0 2px'}}>✕</button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* GCS MODE */}
                                {mode==='gcs'&&(
                                  <div>
                                    <div style={{fontSize:'0.72rem',color:$textMut,marginBottom:6}}>Chemin GCS du dossier DCE (intégration native Phase 1 Supabase) :</div>
                                    <div style={{display:'flex',gap:6}}>
                                      <input value={gcsPath} onChange={e=>setIaGcsPath(p=>({...p,[ao.id]:e.target.value}))} placeholder="gs://group-oy-dce/2026/DOS-2026-0013/" style={{flex:1,padding:'7px 10px',borderRadius:crmRd,border:'1px solid '+$border,fontSize:'0.78rem',fontFamily:"'Courier New',monospace",background:$bgCard,color:$text,outline:'none'}}/>
                                    </div>
                                    {gcsPath.trim()&&<div style={{fontSize:'0.66rem',color:'#d97706',marginTop:6,padding:'6px 10px',borderRadius:crmRd,background:'#f59e0b10',border:'1px solid #f59e0b20'}}>
                                      ⏳ Intégration native GCS prévue en Phase 1 (Avr 2026). Actuellement le chemin est mémorisé mais non lu. Utilise "Coller texte" ou "Fichiers" pour analyser maintenant.
                                    </div>}
                                    <div style={{fontSize:'0.66rem',color:$textMut,marginTop:8}}>Bucket : <code style={{background:$bgSub,padding:'1px 5px',borderRadius:3}}>group-oy-dce</code> · Gemini 1.5 Pro pour multi-fichiers · Claude pour synthèse</div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* ── ERROR ── */}
                            {iaError&&<div style={{padding:'10px 14px',borderRadius:crmRd,background:'#dc262610',border:'1px solid #dc262630',fontSize:'0.76rem',color:'#dc2626'}}>▲ Erreur : {iaError}</div>}

                            {/* ── LOADING ── */}
                            {iaLoading&&!iaResult&&(
                              <div style={{padding:'32px',textAlign:'center',background:$bgSub,borderRadius:crmRd,border:'1px solid '+$border}}>
                                <div style={{fontSize:'1.8rem',marginBottom:8}}>🤖</div>
                                <div style={{fontSize:'0.82rem',color:$textMut,marginBottom:4}}>Analyse {docs.length>0||cctpText.trim()?'des documents DCE':'stratégique'} en cours...</div>
                                <div style={{fontSize:'0.7rem',color:$textMut}}>{docs.filter(d=>d.type==='pdf').length>0?'Lecture PDF → Extraction → Analyse':docs.length>0?'Traitement fichiers → Analyse':'Lecture métadonnées → Recommandations'}</div>
                              </div>
                            )}

                            {/* ── RESULT ── */}
                            {iaResult&&(
                              <div style={{background:$bgCard,border:'1px solid '+$border,borderRadius:crmRd,padding:'16px 18px',lineHeight:1.6}}>
                                {docs.length>0||cctpText.trim()?<div style={{fontSize:'0.62rem',color:'#059669',fontWeight:700,marginBottom:10,padding:'4px 8px',borderRadius:4,background:'#05966910',display:'inline-block'}}>✓ Analyse basée sur {docs.length} fichier{docs.length>1?'s':''}${cctpText.trim()?' + texte collé':''}</div>:null}
                                {renderMd(iaResult)}
                              </div>
                            )}

                            {/* ── EMPTY STATE ── */}
                            {!iaResult&&!iaLoading&&!iaError&&(
                              <div style={{padding:'32px 20px',textAlign:'center',background:$bgSub,borderRadius:crmRd,border:'1px dashed '+$border}}>
                                <div style={{fontSize:'1.8rem',marginBottom:10}}>🤖</div>
                                <div style={{fontSize:'0.88rem',fontWeight:700,color:$text,marginBottom:6}}>Analyse IA du DCE</div>
                                <div style={{fontSize:'0.75rem',color:$textMut,maxWidth:400,margin:'0 auto 8px',lineHeight:1.5}}>
                                  <strong>Sans documents</strong> → analyse stratégique sur métadonnées<br/>
                                  <strong>Avec PDF/DOCX/XLSX</strong> → analyse complète des pièces du DCE<br/>
                                  <strong>Avec GCS</strong> → intégration native en Phase 1 (Avr 2026)
                                </div>
                                <button onClick={triggerIA} style={{padding:'8px 18px',borderRadius:crmRd,border:'none',background:ACC,color:'#fff',fontSize:'0.8rem',fontWeight:700,cursor:'pointer',marginTop:10}}>
                                  ▶ Lancer l'analyse
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                    </div>
                  </div>
            );
          };

          return (
            <div style={{display:'flex', flexDirection:'column', gap:0, position:'relative'}}>

              {/* ═══════════════════════════════════════
                  DRAWER — DÉTAIL DOSSIER (slide-in droit)
                  ═══════════════════════════════════════ */}
              {aoSelected && (()=>{
                const ao = AO_RAW.find(a=>a.id===aoSelected);
                if(!ao) return null;
                return (<>
                  {/* Backdrop semi-transparent */}
                  <div
                    onClick={()=>setAoSelected(null)}
                    style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.18)',zIndex:2000}}
                  />
                  {/* Drawer panel */}
                  <div style={{
                    position:'fixed',top:0,right:0,bottom:0,
                    width:dosDrawerWide?'min(900px,94vw)':'min(560px,92vw)',
                    background:$bgCard,
                    borderLeft:`1px solid ${$border}`,
                    boxShadow:'-8px 0 32px rgba(0,0,0,0.12)',
                    zIndex:2001,
                    display:'flex',
                    flexDirection:'column',
                    overflow:'hidden',
                    animation:'slideInRight 0.22s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    {/* Top color bar */}
                    <div style={{height:3,background:`linear-gradient(90deg,${ACC},${ACC}60)`}}/>
                    {/* Drawer header bar */}
                    <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderBottom:`1px solid ${$border}`,background:$bgSub,flexShrink:0}}>
                      <div style={{height:16,width:3,background:'#007ab5',borderRadius:2,flexShrink:0}}/>
                      <span style={{fontSize:'0.82rem',fontWeight:700,color:$text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ao.titre||ao.id}</span>
                      <button onClick={()=>setDosDrawerWide(w=>!w)} title={dosDrawerWide?"R&#x27;eduire":"Agrandir"} style={{width:28,height:28,borderRadius:6,border:`1px solid ${$border}`,background:$bgSub,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        {dosDrawerWide
                          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2H12V5M5 12H2V9M12 2L8 6M2 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9v3h3M12 5V2H9M2 12l4-4M12 2l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        }
                      </button>
                      <button onClick={()=>setAoSelected(null)} title="Fermer" style={{width:28,height:28,borderRadius:6,border:`1px solid ${$border}`,background:$bgSub,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    {/* Scrollable content */}
                    <div style={{flex:1,overflowY:'auto',padding:'16px 20px'}}>
                      {renderAoPanel(ao)}
                    </div>
                  </div>
                  <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
                </>);
              })()}

              {/* ═══ HEADER ═══ */}
              <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, marginBottom:14, overflow:'hidden'}}>
                <div style={{height:3, background:'linear-gradient(90deg, #007ab5 0%, #0099d6 60%, #007ab5 100%)'}}></div>
                <div style={{padding:'16px 22px'}}>
                  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{width:42, height:42, borderRadius:10, background:'#007ab510', border:'1px solid #007ab530', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0}}>📂</div>
                      <div>
                        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:3}}>
                          <h2 style={{margin:0, fontSize:'1.05rem', fontWeight:800, color:$text, letterSpacing:'-0.01em'}}>Suivi des Dossiers AO</h2>
                          <span style={{fontSize:'0.68rem', padding:'2px 7px', borderRadius:10, background:'#007ab510', color:'#007ab5', fontWeight:700, border:'1px solid #007ab530', textTransform:'uppercase', letterSpacing:'0.05em'}}>Monday Live</span>
                        </div>
                        <p style={{margin:0, fontSize:'0.8rem', color:$textMut}}>Board Études · {DATA_NO_DOUBLON.length} dossiers · Analyse pipeline par type de marché</p>
                      </div>
                    </div>
                    {/* Type marché pills */}
                    <div style={{display:'flex', alignItems:'center', gap:6}}>
                      {TYPE_MARCHE_ORDER.map(tm => {
                        const cfg = getTM(tm);
                        const count = DATA_NO_DOUBLON.filter(a=>a.tm===tm).length;
                        return (
                          <div key={tm} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:crmRd, background:cfg.bg, border:`1px solid ${cfg.dot}30`}}>
                            <span style={{fontSize:'0.75rem'}}>{cfg.emoji}</span>
                            <span style={{fontSize:'0.73rem', fontWeight:700, color:cfg.color}}>{tm.replace('Marché ','')}</span>
                            <span style={{fontSize:'0.7rem', padding:'0 4px', borderRadius:8, background:cfg.dot+'20', color:cfg.dot, fontWeight:700}}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ IMPORT BANNER depuis Veille AO ═══ */}
              {veilleAOPrefill && (
                <div style={{background:'linear-gradient(90deg,#007ab508,#007ab510)',border:'2px solid #007ab540',borderRadius:crmRd,padding:'14px 18px',marginBottom:14,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flex:1,minWidth:0}}>
                    <div style={{width:34,height:34,borderRadius:8,background:'#007ab5',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{fontSize:'1rem',color:'#fff'}}>☰</span>
                    </div>
                    <div style={{minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:'0.82rem',color:'#007ab5',marginBottom:2}}>Import depuis Veille AO</div>
                      <div style={{fontSize:'0.76rem',color:$text,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{veilleAOPrefill.n}</div>
                      <div style={{fontSize:'0.7rem',color:$textMut,marginTop:1}}>
                        MOA : {veilleAOPrefill.m||'—'} · Type : {veilleAOPrefill.tm||'—'} · Deadline : {veilleAOPrefill.d||'—'}
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                    <div style={{textAlign:'center',marginRight:4}}>
                      <div style={{fontSize:'0.68rem',color:'#007ab5',fontWeight:800,fontFamily:"'Courier New',monospace",letterSpacing:'0.04em'}}>{getNextDosNum()}</div>
                      <div style={{fontSize:'0.58rem',color:$textMut}}>ID assigné</div>
                    </div>
                    <button onClick={()=>{
                      const dosId = getNextDosNum();
                      DOS_IDS['V-'+veilleAOPrefill.vId] = dosId;
                      setVeilleAOPrefill(null);
                    }} style={{padding:'6px 14px',borderRadius:crmRd,background:'#007ab5',color:'#fff',border:'none',fontSize:'0.75rem',fontWeight:700,cursor:'pointer'}}>
                      ✓ Créer le dossier
                    </button>
                    <button onClick={()=>setVeilleAOPrefill(null)} style={{padding:'6px 10px',borderRadius:crmRd,background:'transparent',color:$textMut,border:`1px solid ${$border}`,fontSize:'0.75rem',cursor:'pointer'}}>✕</button>
                  </div>
                </div>
              )}

              {/* ═══ KPI CARDS ═══ */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:14}}>
                {[
                  { label:'Dossiers actifs', value:actifs.length, sub:'dont '+urgents.length+' urgents ≤14j', icon:'🔥', color:'#dc2626', bg:'#fff1f2', border:'#fecdd3' },
                  { label:'Offres déposées', value:DATA_NO_DOUBLON.filter(a=>a.o>0).length, sub:fmtM(gagnes.reduce((s,a)=>s+a.o,0))+' CA gagné', icon:'↥', color:'#0369a1', bg:'#e0f2fe', border:'#bae6fd' },
                  { label:'Taux de succès', value:tauxSucces+'%', sub:gagnes.length+' acceptés', icon:'✓', color:'#059669', bg:'#dcfce7', border:'#bbf7d0' },
                  { label:'Visites à planifier', value:visitesEnAttente.length, sub:visitesEnAttente.length ? visitesEnAttente.slice(0,1).map(a=>a.m).join('')+' ...' : 'Aucune en attente', icon:'◆', color:visitesEnAttente.length>0?'#d97706':'#059669', bg:visitesEnAttente.length>0?'#fef3c7':'#dcfce7', border:visitesEnAttente.length>0?'#fde68a':'#bbf7d0' },
                  { label:'Urgents ≤14j', value:urgents.length, sub:urgents.length ? urgents[0].m||urgents[0].n.slice(0,20) : 'Aucun urgent', icon:'⏰', color: urgents.length > 0 ? '#dc2626' : '#059669', bg: urgents.length > 0 ? '#fee2e2' : '#dcfce7', border: urgents.length > 0 ? '#fca5a5' : '#bbf7d0' },
                  { label:'Pipeline actif', value:fmtM(actifs.reduce((s,a)=>s+a.o,0)), sub:'Montant total offres', icon:'€', color:'#b45309', bg:'#fef3c7', border:'#fde68a' },
                ].map((s,i) => (
                  <div key={i} style={{background:s.bg, borderRadius:crmRd, border:`1px solid ${s.border}`, padding:'12px 14px'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4}}>
                      <span style={{fontSize:'0.67rem', fontWeight:700, color:s.color, textTransform:'uppercase', letterSpacing:'0.06em'}}>{s.label}</span>
                      <span style={{fontSize:'0.9rem'}}>{s.icon}</span>
                    </div>
                    <div style={{fontSize:'1.5rem', fontWeight:800, color:s.color, letterSpacing:'-0.03em', lineHeight:1}}>{s.value}</div>
                    <div style={{fontSize:'0.68rem', color:s.color, opacity:0.7, marginTop:3}}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* ═══ TOOLBAR ═══ */}
              <div style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:12}}>
                {/* Tabs pipeline */}
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', borderBottom:`1px solid ${$border}`}}>
                  <div style={{display:'flex', alignItems:'center', gap:2, background:$bgSub, borderRadius:crmRd, padding:3}}>
                    {[
                      { id:'actifs', label:'🔥 Actifs', count: DATA_NO_DOUBLON.filter(a=>getScfg(a.s).group==='actif').length },
                      { id:'gagnes', label:'🍾 Gagnés', count: gagnes.length },
                      { id:'perdus', label:'▸ Perdus', count: perdus.length },
                      { id:'tous',   label:'Tous',      count: DATA_NO_DOUBLON.length },
                    ].map(t => (
                      <button key={t.id} onClick={()=>setAoStatut(t.id)} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 11px', borderRadius:crmRd, fontSize:'0.78rem', fontWeight:aoStatut===t.id?700:500, background:aoStatut===t.id?$bgCard:'transparent', color:aoStatut===t.id?$text:$textMut, border:aoStatut===t.id?`1px solid ${$border}`:'1px solid transparent', cursor:'pointer', boxShadow:aoStatut===t.id?'0 1px 3px rgba(0,0,0,0.06)':'none'}}>
                        {t.label}
                        <span style={{fontSize:'0.65rem', padding:'1px 5px', borderRadius:8, background:aoStatut===t.id?'#007ab520':'transparent', color:aoStatut===t.id?'#007ab5':$textMut, fontWeight:700}}>{t.count}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <span style={{fontSize:'0.76rem', color:$textMut, fontWeight:500}}>{sorted.length} résultat{sorted.length>1?'s':''}</span>
                    {/* View toggle */}
                    <div style={{display:'flex', alignItems:'center', background:$bgSub, borderRadius:crmRd, padding:3, gap:2}}>
                      {[{id:'tableau',label:'☰ Tableau'},{id:'kanban',label:'⬛ Kanban'},{id:'analytics',label:'▦ Analytics'}].map(v => (
                        <button key={v.id} onClick={()=>setAoView(v.id)} style={{padding:'4px 10px', borderRadius:crmRd, fontSize:'0.75rem', fontWeight:aoView===v.id?700:500, background:aoView===v.id?$bgCard:'transparent', color:aoView===v.id?$text:$textMut, border:aoView===v.id?`1px solid ${$border}`:'1px solid transparent', cursor:'pointer', boxShadow:aoView===v.id?'0 1px 3px rgba(0,0,0,0.06)':'none'}}>{v.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Filters row */}
                <div style={{display:'flex', alignItems:'center', gap:8, padding:'7px 14px', flexWrap:'wrap'}}>
                  {/* Search */}
                  <div style={{position:'relative', flex:'1', minWidth:200}}>
                    <span style={{position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:$textMut, fontSize:'0.85rem'}}>⌕</span>
                    <input value={aoSearch} onChange={e=>setAoSearch(e.target.value)} placeholder="Rechercher MOA, intitulé..." style={{width:'100%', padding:'6px 10px 6px 30px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, fontSize:'0.79rem', color:$text, fontFamily:'inherit', boxSizing:'border-box'}}/>
                  </div>
                  {/* Sort */}
                  <select value={aoSort} onChange={e=>setAoSort(e.target.value)} style={{fontSize:'0.79rem', fontWeight:500, padding:'5px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$text, cursor:'pointer', fontFamily:'inherit'}}>
                    <option value="deadline">Deadline ↑</option>
                    <option value="offre_desc">Offre ↓</option>
                    <option value="offre_asc">Offre ↑</option>
                    <option value="budget_desc">Budget ↓</option>
                    <option value="updated">Récents</option>
                  </select>
                  {/* Filtres & Colonnes */}
                  <div style={{marginLeft:'auto', position:'relative', zIndex:50}}>
                    <button onClick={()=>setDosFilterPanelOpen(v=>!v)} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:crmRd,border:`1px solid ${dosFilterPanelOpen?'#007ab5':$border}`,background:dosFilterPanelOpen?'#007ab510':$bgSub,fontSize:'0.78rem',fontWeight:600,color:dosFilterPanelOpen?'#007ab5':$textSec,cursor:'pointer'}}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Filtres &amp; Colonnes
                      {(aoTypeMarche!=='all'||aoTypeProjet!=='all'||aoGrouper!=='none')&&<span style={{width:6,height:6,borderRadius:'50%',background:'#007ab5',flexShrink:0}}/>}
                    </button>
                    {dosFilterPanelOpen && (
                      <React.Fragment>
                        <div onClick={()=>setDosFilterPanelOpen(false)} style={{position:'fixed',inset:0,zIndex:399,background:'transparent'}}/>
                        <div style={{position:'absolute',top:'100%',right:0,marginTop:4,width:300,maxHeight:'75vh',overflowY:'auto',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadowLg,zIndex:400,padding:'14px 16px'}}>
                          <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:14}}>&#x2699; Filtres &amp; Colonnes</div>
                          <div style={{marginBottom:14}}>
                            <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Type de march&#x27;e</div>
                            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                              {[{v:'all',l:'Tous'},{v:'March&#x27;e public',l:'Public'},{v:'March&#x27;e priv&#x27;e',l:'Priv&#x27;e'},{v:'March&#x27;e particulier',l:'Particulier'}].map(f=>(
                                <button key={f.v} onClick={()=>setAoTypeMarche(f.v)} style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${aoTypeMarche===f.v?'#007ab5':$border}`,background:aoTypeMarche===f.v?'#007ab510':$bgSub,fontSize:'0.75rem',fontWeight:aoTypeMarche===f.v?700:400,color:aoTypeMarche===f.v?'#007ab5':$textSec,cursor:'pointer'}}>{f.l}</button>
                              ))}
                            </div>
                          </div>
                          <div style={{marginBottom:14}}>
                            <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Type de projet</div>
                            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                              {['all',...allTP].map(tp=>(
                                <button key={tp} onClick={()=>setAoTypeProjet(tp)} style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${aoTypeProjet===tp?'#007ab5':$border}`,background:aoTypeProjet===tp?'#007ab510':$bgSub,fontSize:'0.75rem',fontWeight:aoTypeProjet===tp?700:400,color:aoTypeProjet===tp?'#007ab5':$textSec,cursor:'pointer'}}>{tp==='all'?'Tous':tp}</button>
                              ))}
                            </div>
                          </div>
                          <div style={{marginBottom:14,borderTop:`1px solid ${$border}`,paddingTop:12}}>
                            <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Grouper par</div>
                            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                              {[{v:'none',l:'Aucun'},{v:'tm',l:'Type march&#x27;e'},{v:'tp',l:'Type projet'},{v:'p',l:'Priorit&#x27;e'},{v:'s',l:'Statut'}].map(opt=>(
                                <button key={opt.v} onClick={()=>{setAoGrouper(opt.v);setAoSelected(null);}} style={{padding:'4px 10px',borderRadius:crmRd>0?20:2,border:`1px solid ${aoGrouper===opt.v?'#007ab5':$border}`,background:aoGrouper===opt.v?'#007ab510':$bgSub,fontSize:'0.75rem',fontWeight:aoGrouper===opt.v?700:400,color:aoGrouper===opt.v?'#007ab5':$textSec,cursor:'pointer'}}>{opt.l}</button>
                              ))}
                            </div>
                          </div>
                          <div style={{borderTop:`1px solid ${$border}`,paddingTop:12,marginBottom:14}}>
                            <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>Affichage</div>
                            <div style={{display:'flex',flexDirection:'column',gap:6}}>
                              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'0.8rem',color:$text}}>
                                <input type="checkbox" checked={dosRowBordersH} onChange={e=>setDosRowBordersH(e.target.checked)} style={{accentColor:'#007ab5'}}/>
                                S&#x27;eparateurs horizontaux
                              </label>
                              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'0.8rem',color:$text}}>
                                <input type="checkbox" checked={dosRowBordersV} onChange={e=>setDosRowBordersV(e.target.checked)} style={{accentColor:'#007ab5'}}/>
                                S&#x27;eparateurs verticaux
                              </label>
                            </div>
                          </div>
                          <button onClick={()=>{setAoTypeMarche('all');setAoTypeProjet('all');setAoGrouper('none');setDosRowBordersH(false);setDosRowBordersV(false);}} style={{width:'100%',padding:'6px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgSub,fontSize:'0.74rem',color:$textMut,cursor:'pointer'}}>R&#x27;einitialiser</button>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>

              {/* ═══ TABLE HEADER ═══ */}
              {aoView === 'tableau' && (
              <div style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, overflow:'hidden', boxShadow:$shadow}}>
                {/* ── 1. Summary bar ── */}
                <div style={{padding:'8px 16px', borderBottom:`1px solid ${$border}`, background:$bgSub, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:'0.78rem', fontWeight:700, color:$text}}>☰ {sorted.length} dossier{sorted.length>1?'s':''}</span>
                </div>
                {/* ── 2. Active group header (CRM style, JS-updated) ── */}
                {dosActiveGrp && (
                  <div style={{display:'flex',alignItems:'center',gap:10,padding:'7px 14px 7px 18px',background:dosActiveGrp.color+'10',borderBottom:`1px solid ${dosActiveGrp.color}25`,position:'relative'}}>
                    <div style={{position:'absolute',left:0,top:0,bottom:0,width:4,background:dosActiveGrp.color}}/>
                    <span style={{fontSize:'0.65rem',color:dosActiveGrp.color,fontWeight:700,display:'inline-block',width:12,textAlign:'center'}}>▾</span>
                    <span style={{fontWeight:700,fontSize:'0.8rem',color:dosActiveGrp.color,textTransform:'uppercase',letterSpacing:'0.02em'}}>{dosActiveGrp.label}</span>
                    <span style={{padding:'1px 9px',borderRadius:crmRd>0?99:2,fontSize:'0.7rem',fontWeight:700,background:dosActiveGrp.color+'22',color:dosActiveGrp.color}}>{dosActiveGrp.count}</span>
                    {dosActiveGrp.total&&<span style={{fontSize:'0.72rem',color:dosActiveGrp.color,marginLeft:'auto',fontWeight:700,opacity:0.85}}>{dosActiveGrp.total}</span>}
                  </div>
                )}
                {/* ── 3. Sticky col header ── */}
                <div style={{position:'sticky',top:0,zIndex:10,display:'grid',gridTemplateColumns:`32px ${dosColWidths.id}px ${dosColWidths.dossier}px ${dosColWidths.prio}px ${dosColWidths.typeproj}px ${dosColWidths.statut}px ${dosColWidths.tm}px ${dosColWidths.offre}px ${dosColWidths.deadline}px ${dosColWidths.jours}px ${dosColWidths.resp}px ${dosColWidths.visite}px`,padding:'7px 14px',background:$bgSub,borderBottom:`1px solid ${$border}`,gap:8}}>
                  {[{l:'ID',k:'id'},{l:'Dossier / MOA',k:'dossier'},{l:'Priorité',k:'prio'},{l:'Type projet',k:'typeproj'},{l:'Statut',k:'statut'},{l:'Type',k:'tm'},{l:'Offre',k:'offre'},{l:'Deadline',k:'deadline'},{l:'Jours',k:'jours'},{l:'Responsable',k:'resp'},{l:'Visite',k:'visite'}].map((h,i) => (
                    <div key={i} style={{fontSize:'0.67rem',fontWeight:700,color:i===0?'#007ab5':$textMut,textTransform:'uppercase',letterSpacing:'0.06em',position:'relative',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',userSelect:'none'}}>
                      {h.l}
                      <div style={{position:'absolute',right:0,top:0,bottom:0,width:5,cursor:'col-resize',zIndex:2,background:'transparent'}} onMouseDown={(ev)=>{ev.preventDefault();ev.stopPropagation();const cid=h.k;const startX=ev.clientX;const startW=dosColWidths[cid]||80;const onMv=(e)=>setDosColWidths(p=>({...p,[cid]:Math.max(40,startW+e.clientX-startX)}));const onUp=()=>{document.removeEventListener('mousemove',onMv);document.removeEventListener('mouseup',onUp);document.body.style.cursor='';document.body.style.userSelect='';};document.addEventListener('mousemove',onMv);document.addEventListener('mouseup',onUp);document.body.style.cursor='col-resize';document.body.style.userSelect='none';}} onMouseOver={e=>e.currentTarget.style.background=$accent+'50'} onMouseOut={e=>e.currentTarget.style.background='transparent'}/>
                    </div>
                  ))}
                </div>
                {/* ── 4. Scroll container ── */}
                <div ref={dosTableRef} style={{overflowX:'auto', maxHeight:'62vh', overflowY:'auto'}} onScroll={()=>{
                  const el = dosTableRef.current; if(!el) return;
                  const rows = el.querySelectorAll('[data-group-header]');
                  let active = null;
                  rows.forEach(row => {
                    const rect = row.getBoundingClientRect();
                    const pRect = el.getBoundingClientRect();
                    if(rect.top < pRect.top + 4) {
                      active = { label:row.dataset.groupLabel, color:row.dataset.groupColor, count:parseInt(row.dataset.groupCount||'0'), total:row.dataset.groupTotal };
                    }
                  });
                  setDosActiveGrp(active);
                }}>
                  {(() => {
                    const useGrouper = aoGrouper !== 'none';
                    const useSwimLanes = !useGrouper && aoTypeMarche === 'all';
                    const renderRows = (items, rowAccent) => { const RA = rowAccent || ACC; return items.length === 0
                      ? <div style={{padding:'40px', textAlign:'center', color:$textMut, fontSize:'0.85rem'}}>Aucun dossier pour ces filtres</div>
                      : items.map((ao, rowIdx) => {
                            const cfg = getScfg(ao.s);
                            const dl = daysLeft(ao.d);
                            const prio = getPrio(ao.p);
                            const isSelected = aoSelected === ao.id;
                            return (
                              <React.Fragment key={ao.id}><div
                                style={{display:'grid', gridTemplateColumns:`32px ${dosColWidths.id}px ${dosColWidths.dossier}px ${dosColWidths.prio}px ${dosColWidths.typeproj}px ${dosColWidths.statut}px ${dosColWidths.tm}px ${dosColWidths.offre}px ${dosColWidths.deadline}px ${dosColWidths.jours}px ${dosColWidths.resp}px ${dosColWidths.visite}px`, padding:'9px 14px', borderBottom:dosRowBordersH?`1px solid ${$border}`:'none', borderLeft:isSelected?`4px solid ${RA}`:`4px solid ${RA}40`, gap:8, cursor:'default', background:isSelected?RA+'0d':rowIdx%2===0?'transparent':$bgSub+'44', alignItems:'center', transition:'background 0.1s, border-color 0.1s'}}
                                onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.background='#007ab508'}}
                                onMouseLeave={e=>{e.currentTarget.style.background=isSelected?RA+'0d':rowIdx%2===0?'transparent':$bgSub+'44'}}>
                                <div onClick={(e)=>{e.stopPropagation();setAoSelected(isSelected?null:ao.id);}} style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',borderRadius:4,flexShrink:0}}
                                  onMouseEnter={e=>e.currentTarget.style.background=$bgSub}
                                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2l4 4-4 4" stroke={isSelected?'#007ab5':$textMut} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',gap:2,minWidth:0}}>
                                  {(()=>{ const intId=getInternalId(ao.id); const isAff=!!getAffId(ao.id); return intId ? (
                                    <span style={{fontSize:'0.72rem',fontWeight:800,color:isAff?'#059669':'#007ab5',fontFamily:"'Courier New',monospace",letterSpacing:'0.02em',lineHeight:1.2}}>{intId}</span>
                                  ) : (
                                    <span style={{fontSize:'0.65rem',color:$textMut,fontStyle:'italic'}}>—</span>
                                  );})()}
                                  <span style={{fontSize:'0.6rem',color:$textMut,opacity:0.5,fontFamily:"'Courier New',monospace",overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ao.id.slice(-6)}</span>
                                </div>
                                <div style={{minWidth:0}}>
                                  <div style={{fontSize:'0.8rem', fontWeight:600, color:$text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'').slice(0,55)}</div>
                                  <div style={{fontSize:'0.72rem', color:$textMut, marginTop:1}}>{ao.m||'—'}</div>
                                </div>
                                <div>{ao.p ? <span style={{display:'flex', alignItems:'center', gap:4, fontSize:'0.73rem', fontWeight:400, color:$textSec}}><span style={{width:6,height:6,borderRadius:'50%',background:prio.color,flexShrink:0}}></span>{ao.p}</span> : <span style={{color:$textMut, fontSize:'0.73rem'}}>—</span>}</div>
                                <div style={{fontSize:'0.73rem', color:$textSec, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ao.tp||'—'}</div>
                                <div style={{position:'relative'}} onClick={e=>e.stopPropagation()}>
                                  <div onClick={(e)=>{if(aoStatCellOpen===ao.id){setAoStatCellOpen(null);}else{const r=e.currentTarget.getBoundingClientRect();setAoStatDropPos({top:r.bottom+4,left:r.left});setAoStatCellOpen(ao.id);}}} style={{display:'inline-flex', alignItems:'center', gap:3, fontSize:'0.72rem', fontWeight:400, color:$textSec, cursor:'pointer', padding:'2px 4px', borderRadius:4, transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                    <span style={{width:6,height:6,borderRadius:'50%',background:cfg.color,flexShrink:0}}/>
                                    <span>{cfg.badge}</span>
                                    <span style={{fontSize:'0.55rem',color:$textMut,marginLeft:1}}>▾</span>
                                  </div>
                                  {aoStatCellOpen===ao.id && (() => {
                                    const STAT_LIST = Object.entries(STATUT_CFG);
                                    return (<><div style={{position:'fixed',inset:0,zIndex:9009}} onClick={e=>{e.stopPropagation();setAoStatCellOpen(null);}}/><div style={{position:'fixed', zIndex:9010, top:aoStatDropPos.top, left:aoStatDropPos.left, background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, boxShadow:$shadowLg, minWidth:240, maxHeight:320, overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
                                      {(() => {
                                      const TM_KEY = ao.tm ? (ao.tm.toLowerCase().includes('public')?'public':ao.tm.toLowerCase().includes('priv')?'prive':'particulier') : 'all';
                                      const GROUPS = [{key:'actif',label:'En cours',color:'#6b7280'},{key:'gagne',label:'Gagné',color:'#059669'},{key:'perdu',label:'Perdu / Archivé',color:'#dc2626'}];
                                      return GROUPS.map(grp => {
                                        const items = STAT_LIST.filter(([,sc])=>sc.group===grp.key);
                                        return (<React.Fragment key={grp.key}>
                                          <div style={{padding:'4px 12px 2px', fontSize:'0.6rem', fontWeight:700, color:grp.color, textTransform:'uppercase', letterSpacing:'0.06em', background:grp.color+'08', borderTop:`1px solid ${grp.color}20`}}>{grp.label}</div>
                                          {items.map(([key,sc])=>{
                                            const tmOk = !sc.types || sc.types.includes(TM_KEY) || TM_KEY==='all';
                                            return (<div key={key} onClick={()=>{ AO_RAW.find(a=>a.id===ao.id)&&(AO_RAW.find(a=>a.id===ao.id).s=sc.badge); setAoStatCellOpen(null); setAoSelected(null); setTimeout(()=>setAoSelected(ao.id),10); }} style={{display:'flex', alignItems:'center', gap:8, padding:'6px 12px', cursor:'pointer', background:cfg.badge===sc.badge?ACC+'12':'transparent', opacity:tmOk?1:0.4, transition:'background 0.1s'}} onMouseEnter={e=>{if(tmOk)e.currentTarget.style.background=ACC+'12'}} onMouseLeave={e=>e.currentTarget.style.background=cfg.badge===sc.badge?ACC+'12':'transparent'}>
                                              <span style={{width:8,height:8,borderRadius:'50%',background:sc.color,flexShrink:0}}/>
                                              <span style={{fontSize:'0.78rem', color:cfg.badge===sc.badge?ACC:$text, fontWeight:cfg.badge===sc.badge?600:400, flex:1}}>{sc.badge}</span>
                                              {!tmOk && <span style={{fontSize:'0.58rem',color:'#9ca3af',fontStyle:'italic'}}>{sc.types?.includes('public')?'◆ Public':sc.types?.includes('prive')?'▪ Privé':''}</span>}
                                              {cfg.badge===sc.badge && <span style={{fontSize:'0.65rem',color:ACC}}>✓</span>}
                                            </div>);
                                          })}
                                        </React.Fragment>);
                                      });
                                    })()}
                                    </div></> );
                                  })()}
                                </div>
                                <div style={{fontSize:'0.73rem', color:$textSec}}>{ao.tm ? (ao.tm.includes('public')?'◆':ao.tm.includes('priv')?'▪':'🏠') : '—'}</div>
                                <div style={{fontSize:'0.78rem', fontWeight:ao.o?600:400, color:ao.o?'#059669':$textMut}}>{fmtM(ao.o)}</div>
                                <div style={{fontSize:'0.75rem', color:dlColor(dl), fontWeight:dl!==null&&dl<=7?700:400, whiteSpace:'nowrap'}}>{fmtDate(ao.d)}</div>
                                <div>{dl !== null ? <span style={{padding:'2px 6px', borderRadius:6, background:dlColor(dl)+'22', color:dlColor(dl), fontSize:'0.69rem', fontWeight:700}}>{dl<0?'J+'+Math.abs(dl):dl===0?'Auj.':'J-'+dl}</span> : <span style={{color:$textMut,fontSize:'0.73rem'}}>—</span>}</div>
                                {(() => {
                                  const ext = getExt(ao.id);
                                  const resps = (ext.r||'').split(',');
                                  const first = resps[0]?.trim().split(' ');
                                  const initials = first ? (first[0]?.[0]||'')+(first[1]?.[0]||'') : '?';
                                  return (<div title={ext.r||'David LEMAIRE'} style={{display:'flex',alignItems:'center',gap:4}}>
                                    <div style={{width:20,height:20,borderRadius:3,background:ACC+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.58rem',fontWeight:800,color:ACC,flexShrink:0}}>{initials.toUpperCase()}</div>
                                    <span style={{fontSize:'0.66rem',color:$textMut,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:65}}>{first?.[1]||first?.[0]||'—'}</span>
                                  </div>);
                                })()}
                                {(() => {
                                  const ext = getExt(ao.id);
                                  return (<div>{ext.vo==='Oui'?<span style={{padding:'2px 5px',borderRadius:4,background:'#dc262615',color:'#dc2626',fontSize:'0.6rem',fontWeight:700}}>OBL</span>:ext.vo==='Conseillée'?<span style={{padding:'2px 5px',borderRadius:4,background:'#f59e0b15',color:'#d97706',fontSize:'0.6rem',fontWeight:700}}>CSL</span>:ext.drive?<span style={{fontSize:'0.65rem',color:'#1a73e8'}}>▸</span>:<span style={{color:$textMut,fontSize:'0.73rem'}}>—</span>}</div>);
                                })()}
                              </div></React.Fragment>
                            );
                          }); };


                    // ── Mode Grouper par ──
                    if (useGrouper) {
                      const getGroupKey = (ao) => {
                        if (aoGrouper === 'tm') return ao.tm || 'Non défini';
                        if (aoGrouper === 'tp') return ao.tp || 'Non défini';
                        if (aoGrouper === 'p')  return ao.p  || 'Non défini';
                        if (aoGrouper === 's')  return getScfg(ao.s).badge || ao.s || 'Non défini';
                        return '—';
                      };
                      const STATUT_ORDER = Object.values(STATUT_CFG).map(s=>s.badge);
                      const groupKeys = [...new Set(sorted.map(getGroupKey))].sort((a,b) => {
                        if (aoGrouper === 's') {
                          const ia = STATUT_ORDER.indexOf(a); const ib = STATUT_ORDER.indexOf(b);
                          if (ia === -1 && ib === -1) return a.localeCompare(b);
                          if (ia === -1) return 1; if (ib === -1) return -1;
                          return ia - ib;
                        }
                        return a.localeCompare(b, 'fr');
                      });
                      return groupKeys.map((key, gi) => {
                        const groupItems = sorted.filter(ao => getGroupKey(ao) === key);
                        const groupColor = aoGrouper==='s' ? getScfg(groupItems[0]?.s||'').color||ACC
                          : aoGrouper==='tm' ? (getTM(groupItems[0]?.tm||'').color||ACC)
                          : aoGrouper==='p' ? (getPrio(groupItems[0]?.p||'').color||ACC)
                          : ACC;
                        const groupTotal = groupItems.reduce((s,a)=>s+(a.o||0),0);
                        return (
                          <div key={key} style={{marginBottom:12, borderRadius:crmRd, border:`1px solid ${groupColor}20`}}>
                            <div style={{display:'flex', alignItems:'center', gap:8, padding:'7px 14px 5px', background:$bgCard, position:'sticky', top:0, zIndex:10, borderBottom:`1px solid ${groupColor}20`, borderLeft:`3px solid ${groupColor}`}}>
                              <span style={{width:9,height:9,borderRadius:'50%',background:groupColor,flexShrink:0}}/>
                              <span style={{fontSize:'0.78rem', fontWeight:700, color:groupColor}}>{key}</span>
                              <span style={{fontSize:'0.7rem', padding:'1px 7px', borderRadius:10, background:groupColor+'18', color:groupColor, fontWeight:700}}>{groupItems.length}</span>
                              {groupTotal>0 && <span style={{fontSize:'0.7rem', color:$textMut}}>{fmtM(groupTotal)}</span>}
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:`${dosColWidths.id}px ${dosColWidths.dossier}px ${dosColWidths.prio}px ${dosColWidths.typeproj}px ${dosColWidths.statut}px ${dosColWidths.tm}px ${dosColWidths.offre}px ${dosColWidths.deadline}px ${dosColWidths.jours}px ${dosColWidths.resp}px ${dosColWidths.visite}px`,padding:'6px 14px',background:$bgSub,borderBottom:`1px solid ${$border}`,gap:8}}>
                              {[{l:'ID'},{l:'Dossier / MOA'},{l:'Priorité'},{l:'Type projet'},{l:'Statut'},{l:'Type'},{l:'Offre'},{l:'Deadline'},{l:'Jours'},{l:'Resp.'},{l:'Visite'}].map((h,j)=>(
                                <div key={j} style={{fontSize:'0.67rem',fontWeight:700,color:j===0?'#007ab5':$textMut,textTransform:'uppercase',letterSpacing:'0.06em',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{h.l}</div>
                              ))}
                            </div>
                            {renderRows(groupItems, groupColor)}
                          </div>
                        );
                      });
                    }

                    // ── Single marché filter (pas de swim lanes) ──
                    if (!useSwimLanes) {
                      return renderRows(sorted);
                    }

                    // ── Swim lanes mode (all types, pas de grouper) ──
                    return TYPE_MARCHE_ORDER.map((tm, gi) => {
                      const laneItems = sorted.filter(a => a.tm === tm);
                      const laneCfg = getTM(tm);
                      if (laneItems.length === 0) return null;
                      const laneTotal = laneItems.reduce((s,a)=>s+a.o,0);
                      return (
                        <React.Fragment key={tm}>
                          {gi>0 && <div style={{height:16, background:$bgSub}}/>}
                          <div data-group-header="1" data-group-label={tm} data-group-color={laneCfg.color} data-group-count={laneItems.length} data-group-total={laneTotal>0?fmtM(laneTotal):''}
                            style={{display:'flex',alignItems:'center',gap:10,padding:'7px 14px 7px 18px',background:laneCfg.color+'10',borderTop:`1px solid ${laneCfg.color}25`,borderBottom:`1px solid ${laneCfg.color}25`,position:'relative'}}>
                            <div style={{position:'absolute',left:0,top:0,bottom:0,width:4,background:laneCfg.color,borderRadius:`${crmRd}px 0 0 0`}}/>
                            <span style={{fontSize:'0.65rem',color:laneCfg.color,fontWeight:700,display:'inline-block',width:12,textAlign:'center'}}>▾</span>
                            <span style={{fontWeight:700,fontSize:'0.8rem',color:laneCfg.color,textTransform:'uppercase',letterSpacing:'0.02em'}}>{tm}</span>
                            <span style={{padding:'1px 9px',borderRadius:crmRd>0?99:2,fontSize:'0.7rem',fontWeight:700,background:laneCfg.color+'22',color:laneCfg.color}}>{laneItems.length}</span>
                            {laneTotal>0&&<span style={{fontSize:'0.72rem',color:laneCfg.color,marginLeft:'auto',fontWeight:700,opacity:0.85}}>{fmtM(laneTotal)}</span>}
                          </div>
                          <div style={{display:'grid',gridTemplateColumns:`${dosColWidths.id}px ${dosColWidths.dossier}px ${dosColWidths.prio}px ${dosColWidths.typeproj}px ${dosColWidths.statut}px ${dosColWidths.tm}px ${dosColWidths.offre}px ${dosColWidths.deadline}px ${dosColWidths.jours}px ${dosColWidths.resp}px ${dosColWidths.visite}px`,padding:'6px 14px',background:$bgSub,borderBottom:`1px solid ${$border}`,gap:8}}>
                            {[{l:'ID',k:'id'},{l:'Dossier / MOA',k:'dossier'},{l:'Priorité',k:'prio'},{l:'Type projet',k:'typeproj'},{l:'Statut',k:'statut'},{l:'Type',k:'tm'},{l:'Offre',k:'offre'},{l:'Deadline',k:'deadline'},{l:'Jours',k:'jours'},{l:'Resp.',k:'resp'},{l:'Visite',k:'visite'}].map((h,j)=>(
                              <div key={j} style={{fontSize:'0.67rem',fontWeight:700,color:j===0?'#007ab5':$textMut,textTransform:'uppercase',letterSpacing:'0.06em',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{h.l}</div>
                            ))}
                          </div>
                          <div style={{display:'grid',gridTemplateColumns:`${dosColWidths.id}px ${dosColWidths.dossier}px ${dosColWidths.prio}px ${dosColWidths.typeproj}px ${dosColWidths.statut}px ${dosColWidths.tm}px ${dosColWidths.offre}px ${dosColWidths.deadline}px ${dosColWidths.jours}px ${dosColWidths.resp}px ${dosColWidths.visite}px`,padding:'6px 14px',background:$bgSub,borderBottom:`1px solid ${$border}`,gap:8}}>
                            {[{l:'ID'},{l:'Dossier / MOA'},{l:'Priorité'},{l:'Type projet'},{l:'Statut'},{l:'Type'},{l:'Offre'},{l:'Deadline'},{l:'Jours'},{l:'Resp.'},{l:'Visite'}].map((h,j)=>(
                              <div key={j} style={{fontSize:'0.67rem',fontWeight:700,color:j===0?'#007ab5':$textMut,textTransform:'uppercase',letterSpacing:'0.06em',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{h.l}</div>
                            ))}
                          </div>
                          {/* Lane rows */}
                          {laneItems.map((ao, rowIdx) => {
                            const cfg = getScfg(ao.s);
                            const dl = daysLeft(ao.d);
                            const prio = getPrio(ao.p);
                            const isSelected = aoSelected === ao.id;
                            return (
                              <React.Fragment key={ao.id}><div onClick={()=>setAoSelected(isSelected?null:ao.id)}
                                style={{display:'grid', gridTemplateColumns:'1.8fr 100px 130px 90px 80px 100px 100px 85px 70px', padding:'8px 14px', borderBottom:`1px solid ${$border}`, borderLeft:isSelected?`3px solid ${laneCfg.color}`:'3px solid transparent', gap:8, cursor:'pointer', background:isSelected?laneCfg.color+'0d':rowIdx%2===0?'transparent':$bgSub+'44', alignItems:'center', transition:'background 0.1s, border-color 0.1s'}}
                                onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.background=$bgCardHover}}
                                onMouseLeave={e=>{e.currentTarget.style.background=isSelected?laneCfg.color+'0d':rowIdx%2===0?'transparent':$bgSub+'44'}}>
                                <div style={{minWidth:0, paddingLeft:8, borderLeft:`2px solid ${laneCfg.dot}40`}}>
                                  <div style={{fontSize:'0.8rem', fontWeight:600, color:$text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'').slice(0,60)}</div>
                                  <div style={{fontSize:'0.72rem', color:$textMut, marginTop:1}}>{ao.m||'—'}</div>
                                </div>
                                <div>{ao.p ? <span style={{display:'flex', alignItems:'center', gap:4, fontSize:'0.73rem', fontWeight:400, color:$textSec}}><span style={{width:6,height:6,borderRadius:'50%',background:prio.color,flexShrink:0}}></span>{ao.p}</span> : <span style={{color:$textMut, fontSize:'0.73rem'}}>—</span>}</div>
                                <div style={{fontSize:'0.73rem', color:$textSec, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ao.tp||'—'}</div>
                                <div style={{position:'relative'}} onClick={e=>e.stopPropagation()}>
                                  <div onClick={(e)=>{if(aoStatCellOpen===ao.id){setAoStatCellOpen(null);}else{const r=e.currentTarget.getBoundingClientRect();setAoStatDropPos({top:r.bottom+4,left:r.left});setAoStatCellOpen(ao.id);}}} style={{display:'inline-flex', alignItems:'center', gap:3, fontSize:'0.72rem', fontWeight:400, color:$textSec, cursor:'pointer', padding:'2px 4px', borderRadius:4, transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                    <span style={{width:6,height:6,borderRadius:'50%',background:cfg.color,flexShrink:0}}/>
                                    <span>{cfg.badge}</span>
                                    <span style={{fontSize:'0.55rem',color:$textMut,marginLeft:1}}>▾</span>
                                  </div>
                                  {aoStatCellOpen===ao.id && (() => {
                                    const STAT_LIST = Object.entries(STATUT_CFG);
                                    return (<><div style={{position:'fixed',inset:0,zIndex:9009}} onClick={e=>{e.stopPropagation();setAoStatCellOpen(null);}}/><div style={{position:'fixed', zIndex:9010, top:aoStatDropPos.top, left:aoStatDropPos.left, background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, boxShadow:$shadowLg, minWidth:240, maxHeight:320, overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
                                      {(() => {
                                      const TM_KEY = ao.tm ? (ao.tm.toLowerCase().includes('public')?'public':ao.tm.toLowerCase().includes('priv')?'prive':'particulier') : 'all';
                                      const GROUPS = [{key:'actif',label:'En cours',color:'#6b7280'},{key:'gagne',label:'Gagné',color:'#059669'},{key:'perdu',label:'Perdu / Archivé',color:'#dc2626'}];
                                      return GROUPS.map(grp => {
                                        const items = STAT_LIST.filter(([,sc])=>sc.group===grp.key);
                                        return (<React.Fragment key={grp.key}>
                                          <div style={{padding:'4px 12px 2px', fontSize:'0.6rem', fontWeight:700, color:grp.color, textTransform:'uppercase', letterSpacing:'0.06em', background:grp.color+'08', borderTop:`1px solid ${grp.color}20`}}>{grp.label}</div>
                                          {items.map(([key,sc])=>{
                                            const tmOk = !sc.types || sc.types.includes(TM_KEY) || TM_KEY==='all';
                                            return (<div key={key} onClick={()=>{ AO_RAW.find(a=>a.id===ao.id)&&(AO_RAW.find(a=>a.id===ao.id).s=sc.badge); setAoStatCellOpen(null); setAoSelected(null); setTimeout(()=>setAoSelected(ao.id),10); }} style={{display:'flex', alignItems:'center', gap:8, padding:'6px 12px', cursor:'pointer', background:cfg.badge===sc.badge?ACC+'12':'transparent', opacity:tmOk?1:0.4, transition:'background 0.1s'}} onMouseEnter={e=>{if(tmOk)e.currentTarget.style.background=ACC+'12'}} onMouseLeave={e=>e.currentTarget.style.background=cfg.badge===sc.badge?ACC+'12':'transparent'}>
                                              <span style={{width:8,height:8,borderRadius:'50%',background:sc.color,flexShrink:0}}/>
                                              <span style={{fontSize:'0.78rem', color:cfg.badge===sc.badge?ACC:$text, fontWeight:cfg.badge===sc.badge?600:400, flex:1}}>{sc.badge}</span>
                                              {!tmOk && <span style={{fontSize:'0.58rem',color:'#9ca3af',fontStyle:'italic'}}>{sc.types?.includes('public')?'◆ Public':sc.types?.includes('prive')?'▪ Privé':''}</span>}
                                              {cfg.badge===sc.badge && <span style={{fontSize:'0.65rem',color:ACC}}>✓</span>}
                                            </div>);
                                          })}
                                        </React.Fragment>);
                                      });
                                    })()}
                                    </div></> );
                                  })()}
                                </div>
                                <div style={{fontSize:'0.73rem', color:$textSec}}>{ao.tm ? (ao.tm.includes('public')?'◆':ao.tm.includes('priv')?'▪':'🏠') : '—'}</div>
                                <div style={{fontSize:'0.78rem', fontWeight:ao.o?600:400, color:ao.o?'#059669':$textMut}}>{fmtM(ao.o)}</div>
                                <div style={{fontSize:'0.75rem', color:dlColor(dl), fontWeight:dl!==null&&dl<=7?700:400, whiteSpace:'nowrap'}}>{fmtDate(ao.d)}</div>
                                <div>{dl !== null ? <span style={{padding:'2px 6px', borderRadius:6, background:dlColor(dl)+'22', color:dlColor(dl), fontSize:'0.69rem', fontWeight:700}}>{dl<0?'J+'+Math.abs(dl):dl===0?'Auj.':'J-'+dl}</span> : <span style={{color:$textMut,fontSize:'0.73rem'}}>—</span>}</div>
                                {(() => {
                                  const ext = getExt(ao.id);
                                  const resps = (ext.r||'').split(',');
                                  const first = resps[0]?.trim().split(' ');
                                  const initials = first ? (first[0]?.[0]||'')+(first[1]?.[0]||'') : '?';
                                  return (<div title={ext.r||'David LEMAIRE'} style={{display:'flex',alignItems:'center',gap:4}}>
                                    <div style={{width:20,height:20,borderRadius:3,background:ACC+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.58rem',fontWeight:800,color:ACC,flexShrink:0}}>{initials.toUpperCase()}</div>
                                    <span style={{fontSize:'0.66rem',color:$textMut,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:65}}>{first?.[1]||first?.[0]||'—'}</span>
                                  </div>);
                                })()}
                                {(() => {
                                  const ext = getExt(ao.id);
                                  return (<div>{ext.vo==='Oui'?<span style={{padding:'2px 5px',borderRadius:4,background:'#dc262615',color:'#dc2626',fontSize:'0.6rem',fontWeight:700}}>OBL</span>:ext.vo==='Conseillée'?<span style={{padding:'2px 5px',borderRadius:4,background:'#f59e0b15',color:'#d97706',fontSize:'0.6rem',fontWeight:700}}>CSL</span>:ext.drive?<span style={{fontSize:'0.65rem',color:'#1a73e8'}}>▸</span>:<span style={{color:$textMut,fontSize:'0.73rem'}}>—</span>}</div>);
                                })()}
                              </div></React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    });
                  })()}
                  {sorted.length === 0 && aoTypeMarche === 'all' && (
                    <div style={{padding:'40px', textAlign:'center', color:$textMut, fontSize:'0.85rem'}}>Aucun dossier pour ces filtres</div>
                  )}
                </div>
              </div>
              )} {/* end aoView tableau */}

              {/* ═══ KANBAN VIEW ═══ */}
              {aoView === 'kanban' && (() => {
                // Statuts actifs à afficher en colonnes (ordre pipeline)
                const KANBAN_STATUTS_ACTIF = [
                  { key:'A Preparer',           label:'À Préparer',       color:'#64748b' },
                  { key:'Visite rdv a prendre', label:'Visite à prendre', color:'#0284c7' },
                  { key:'En preparation',       label:'En préparation',   color:'#7f5347' },
                  { key:'Demandes de precisions',label:'Précisions',      color:'#e0f2fe' },
                  { key:'En attente de Reponse',label:'Att. réponse',     color:'#ea580c' },
                  { key:'AO selectionne',       label:'AO sélectionné',   color:'#059669' },
                ];
                const KANBAN_STATUTS_GAGNE = [
                  { key:'Accepte',              label:'Accepté 🍾',       color:'#059669' },
                  { key:'Projet en Cours de Realisation', label:'En réalisation', color:'#10b981' },
                  { key:'Projet Termine',       label:'Terminé',          color:'#34d399' },
                ];
                const KANBAN_STATUTS_PERDU = [
                  { key:'Rejete',               label:'Rejeté',           color:'#dc2626' },
                  { key:'Pas repondu',          label:'Pas répondu',      color:'#d97706' },
                  { key:'Reporte',              label:'Reporté',          color:'#94a3b8' },
                  { key:'A Suivre Sans Suite',  label:'Sans suite',       color:'#007ab5' },
                ];
                const KANBAN_STATUTS = aoStatut === 'actifs' ? KANBAN_STATUTS_ACTIF : aoStatut === 'gagnes' ? KANBAN_STATUTS_GAGNE : aoStatut === 'perdus' ? KANBAN_STATUTS_PERDU : [...KANBAN_STATUTS_ACTIF, ...KANBAN_STATUTS_GAGNE, ...KANBAN_STATUTS_PERDU];

                // Data filtered (same filters, ignore aoStatut for kanban columns)
                const kanbanBase = DATA_NO_DOUBLON.filter(ao => {
                  const cfg = getScfg(ao.s);
                  if (aoStatut === 'actifs' && cfg.group !== 'actif') return false;
                  if (aoStatut === 'gagnes' && cfg.group !== 'gagne') return false;
                  if (aoStatut === 'perdus' && cfg.group !== 'perdu') return false;
                  if (aoTypeMarche !== 'all' && ao.tm !== aoTypeMarche) return false;
                  if (aoTypeProjet !== 'all' && ao.tp !== aoTypeProjet) return false;
                  if (aoSearch) { const q = aoSearch.toLowerCase(); if (!ao.n.toLowerCase().includes(q) && !(ao.m||'').toLowerCase().includes(q)) return false; }
                  return true;
                });

                const getColItems = (statKey) => kanbanBase.filter(ao => normalize(ao.s).toLowerCase().startsWith(normalize(statKey).toLowerCase().slice(0,6)));
                const TYPE_MARCHE_ORDER_K = ['Marché public', 'Marché privé', 'Marché particulier'];

                return (
                  <div style={{overflowX:'auto', paddingBottom:8}}>
                    {/* Swim lane headers */}
                    {aoTypeMarche === 'all' && (
                      <div style={{display:'flex', gap:6, marginBottom:10, flexWrap:'wrap'}}>
                        {TYPE_MARCHE_ORDER_K.map(tm => {
                          const cfg = getTM(tm);
                          const cnt = kanbanBase.filter(a=>a.tm===tm).length;
                          return cnt > 0 ? (
                            <div key={tm} style={{display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:crmRd, background:cfg.bg, border:`1px solid ${cfg.dot}30`}}>
                              <span>{cfg.emoji}</span>
                              <span style={{fontSize:'0.75rem', fontWeight:700, color:cfg.color}}>{tm.replace('Marché ','')}</span>
                              <span style={{fontSize:'0.7rem', padding:'0 5px', borderRadius:8, background:cfg.dot+'25', color:cfg.dot, fontWeight:700}}>{cnt}</span>
                            </div>
                          ) : null;
                        })}
                        <div style={{marginLeft:'auto', fontSize:'0.74rem', color:$textMut, alignSelf:'center'}}>{kanbanBase.length} dossier{kanbanBase.length>1?'s':''} · {KANBAN_STATUTS.length} colonnes</div>
                      </div>
                    )}

                    {/* Kanban columns */}
                    <div style={{display:'flex', gap:10, alignItems:'flex-start', minWidth: KANBAN_STATUTS.length * 220 + 'px'}}>
                      {KANBAN_STATUTS.map(statut => {
                        const colItems = getColItems(statut.key);
                        const colTotal = colItems.reduce((s,a)=>s+a.o,0);
                        return (
                          <div key={statut.key} style={{width:210, flexShrink:0}}>
                            {/* Column header */}
                            <div style={{padding:'7px 10px', borderRadius:crmRd, marginBottom:8, background:statut.color+'18', border:`1px solid ${statut.color}30`}}>
                              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3}}>
                                <span style={{fontSize:'0.76rem', fontWeight:700, color:statut.color}}>{statut.label}</span>
                                <span style={{fontSize:'0.7rem', padding:'1px 6px', borderRadius:8, background:statut.color+'30', color:statut.color, fontWeight:800}}>{colItems.length}</span>
                              </div>
                              {colTotal > 0 && <div style={{fontSize:'0.68rem', color:statut.color, opacity:0.75}}>{fmtM(colTotal)}</div>}
                            </div>
                            {/* Column cards */}
                            <div style={{display:'flex', flexDirection:'column', gap:7}}>
                              {colItems.length === 0 && (
                                <div style={{padding:'20px 10px', textAlign:'center', color:$textMut, fontSize:'0.75rem', border:`1px dashed ${$border}`, borderRadius:crmRd, background:$bgSub}}>—</div>
                              )}
                              {colItems.map(ao => {
                                const dl = daysLeft(ao.d);
                                const prio = getPrio(ao.p);
                                const tmCfg = getTM(ao.tm);
                                const isSelected = aoSelected === ao.id;
                                return (
                                  <div key={ao.id} onClick={()=>setAoSelected(isSelected?null:ao.id)}
                                    style={{background: isSelected ? ACC+'0d' : $bgCard, border: isSelected ? `1px solid ${ACC}55` : `1px solid ${$border}`, borderRadius:crmRd, padding:'9px 11px', cursor:'pointer', borderLeft:`3px solid ${tmCfg.dot}`, transition:'box-shadow 0.12s'}}
                                    onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; }}
                                    onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; }}>
                                    {/* Card title */}
                                    <div style={{fontSize:'0.78rem', fontWeight:600, color:$text, lineHeight:1.3, marginBottom:5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                                      {ao.n.replace(/^\d{4}\.\d{2}\.\d{2}\s*-\s*/,'').replace(/^[^-]+-\s*/,'')}
                                    </div>
                                    {/* MOA */}
                                    <div style={{fontSize:'0.71rem', color:$textMut, marginBottom:6, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ao.m||'—'}</div>
                                    {/* Tags row */}
                                    <div style={{display:'flex', flexWrap:'wrap', gap:3, marginBottom:6}}>
                                      <span style={{padding:'1px 6px', borderRadius:6, background:tmCfg.bg, color:tmCfg.color, fontSize:'0.66rem', fontWeight:700}}>{tmCfg.emoji} {ao.tm ? ao.tm.replace('Marché ','') : '—'}</span>
                                      {ao.p && <span style={{padding:'1px 6px', borderRadius:6, background:prio.bg, color:prio.color, fontSize:'0.66rem', fontWeight:600}}>{ao.p}</span>}
                                      {(() => { const ext=getExt(ao.id); return ext.vo==='Oui'?<span style={{padding:'1px 6px',borderRadius:6,background:'#dc262615',color:'#dc2626',fontSize:'0.62rem',fontWeight:700}}>👁 OBL</span>:ext.vo==='Conseillée'?<span style={{padding:'1px 6px',borderRadius:6,background:'#f59e0b15',color:'#d97706',fontSize:'0.62rem',fontWeight:700}}>👁 CSL</span>:null; })()}
                                    </div>
                                    {/* Footer: montant + deadline + resp */}
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:4}}>
                                      <div style={{display:'flex',alignItems:'center',gap:4,flex:1,minWidth:0}}>
                                        {(() => { const ext=getExt(ao.id); const nm=(ext.r||'DL').split(',')[0].trim().split(' '); const ini=(nm[0]?.[0]||'')+(nm[1]?.[0]||''); return (<div title={ext.r||'David LEMAIRE'} style={{width:18,height:18,borderRadius:3,background:ACC+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.55rem',fontWeight:800,color:ACC,flexShrink:0}}>{ini.toUpperCase()||'DL'}</div>); })()}
                                        <span style={{fontSize:'0.72rem', fontWeight:700, color:ao.o?$text:$textMut}}>{fmtM(ao.o)}</span>
                                      </div>
                                      {dl !== null && (
                                        <span style={{fontSize:'0.68rem', fontWeight:700, padding:'1px 6px', borderRadius:6, background:dlColor(dl)+'22', color:dlColor(dl), flexShrink:0}}>{dl<0?'J+'+Math.abs(dl):dl===0?'Auj.':'J-'+dl}</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* ═══ ANALYTICS VIEW ═══ */}
              {aoView === 'analytics' && (() => {
                const ALL = DATA_NO_DOUBLON;
                const total = ALL.length;
                const gagneC = (arr) => arr.filter(a => getScfg(a.s).group === 'gagne').length;
                const perduC = (arr) => arr.filter(a => getScfg(a.s).group === 'perdu').length;
                const actifC = (arr) => arr.filter(a => getScfg(a.s).group === 'actif').length;
                const sumB = (arr) => arr.reduce((s,a)=>s+(a.b||0),0);
                const sumO = (arr) => arr.reduce((s,a)=>s+(a.o||0),0);
                const taux = (arr) => { const g=gagneC(arr); const f=g+perduC(arr); return f>0?Math.round(g/f*100):0; };
                const PUB=ALL.filter(a=>a.tm==='Marché public'), PRI=ALL.filter(a=>a.tm==='Marché privé'), PAR=ALL.filter(a=>a.tm==='Marché particulier');
                const segments=[{label:'Public',emoji:'◆',color:'#0055cc',bg:'#0055cc0d',data:PUB},{label:'Privé',emoji:'▪',color:'#166534',bg:'#1665340d',data:PRI},{label:'Particulier',emoji:'🏠',color:'#7c3aed',bg:'#7c3aed0d',data:PAR}];
                const tpMap={};
                ALL.forEach(a=>{const k=a.tp||'Non classé';if(!tpMap[k])tpMap[k]={n:0,b:0,g:0,f:0};tpMap[k].n++;tpMap[k].b+=a.b||0;if(getScfg(a.s).group==='gagne')tpMap[k].g++;if(['gagne','perdu'].includes(getScfg(a.s).group))tpMap[k].f++;});
                const tpArr=Object.entries(tpMap).sort((a,b)=>b[1].n-a[1].n).slice(0,8);
                const maxTP=tpArr[0]?.[1]?.n||1;
                const prioArr=[['Critique',ALL.filter(a=>a.p==='Critique').length],['Haute',ALL.filter(a=>a.p==='Haute').length],['Moyenne',ALL.filter(a=>a.p==='Moyenne').length],['Basse',ALL.filter(a=>a.p==='Basse').length]];
                const now2=Date.now();
                const months=Array.from({length:12},(_,i)=>{const d=new Date(now2);d.setMonth(d.getMonth()-11+i);return{y:d.getFullYear(),m:d.getMonth(),label:(d.toLocaleString('fr-FR',{month:'short'})+String(d.getFullYear()).slice(2)).toUpperCase(),count:0,offre:0};});
                ALL.forEach(a=>{if(!a.d)return;const ad=new Date(a.d);const slot=months.find(mo=>mo.y===ad.getFullYear()&&mo.m===ad.getMonth());if(slot){slot.count++;slot.offre+=a.o||0;}});
                const maxMo=Math.max(...months.map(m=>m.count),1);
                const statMap={};ALL.forEach(a=>{const k=a.s||'—';if(!statMap[k])statMap[k]=0;statMap[k]++;});
                const statArr=Object.entries(statMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
                const maxStat=statArr[0]?.[1]||1;
                const KPI=({label,val,sub,color,bg})=>(
                  <div style={{flex:'1 1 0',minWidth:120,background:bg||$bgCard,border:`1px solid ${color}25`,borderRadius:crmRd,padding:'13px 15px'}}>
                    <div style={{fontSize:'0.68rem',fontWeight:700,color:color,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:3}}>{label}</div>
                    <div style={{fontSize:'1.45rem',fontWeight:800,color:color,lineHeight:1}}>{val}</div>
                    {sub&&<div style={{fontSize:'0.68rem',color:$textMut,marginTop:3}}>{sub}</div>}
                  </div>
                );
                return (
                  <div style={{display:'flex',flexDirection:'column',gap:12}}>
                    {/* KPIs */}
                    <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                      <KPI label="Total AO" val={total} sub="hors doublons" color="#007ab5" bg="#007ab50d"/>
                      <KPI label="Actifs" val={actifC(ALL)} sub={`${Math.round(actifC(ALL)/total*100)}% du total`} color="#f59e0b" bg="#f59e0b0d"/>
                      <KPI label="Taux succès" val={`${taux(ALL)}%`} sub={`${gagneC(ALL)} gagnés / ${gagneC(ALL)+perduC(ALL)} finalisés`} color="#059669" bg="#0596690d"/>
                      <KPI label="Pipeline actif" val={fmtM(sumO(ALL.filter(a=>getScfg(a.s).group==='actif')))} sub="offres en cours" color="#7c3aed" bg="#7c3aed0d"/>
                      <KPI label="Budget total" val={fmtM(sumB(ALL))} sub="tous statuts" color="#0055cc" bg="#0055cc0d"/>
                    </div>
                    {/* Segments */}
                    <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                      <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>Répartition par type de marché</div>
                      <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                        {segments.map(seg=>(
                          <div key={seg.label} style={{flex:'1 1 180px',background:seg.bg,border:`1px solid ${seg.color}20`,borderRadius:crmRd,padding:'13px 15px'}}>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                              <div style={{display:'flex',alignItems:'center',gap:5}}><span>{seg.emoji}</span><span style={{fontSize:'0.8rem',fontWeight:700,color:seg.color}}>{seg.label}</span></div>
                              <span style={{fontSize:'1.2rem',fontWeight:800,color:seg.color}}>{seg.data.length}</span>
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7,marginBottom:8}}>
                              {[['Budget moy.',seg.data.length?fmtM(sumB(seg.data)/seg.data.length):'—'],['Taux succès',`${taux(seg.data)}%`],['Actifs',`${actifC(seg.data)}`],['Offres actives',fmtM(sumO(seg.data.filter(a=>getScfg(a.s).group==='actif')))]].map(([l,v])=>(
                                <div key={l}><div style={{fontSize:'0.62rem',color:$textMut,marginBottom:1}}>{l}</div><div style={{fontSize:'0.77rem',fontWeight:700,color:$text}}>{v}</div></div>
                              ))}
                            </div>
                            {seg.data.length>0&&(()=>{const a2=actifC(seg.data),g2=gagneC(seg.data),p2=perduC(seg.data);return(<div><div style={{display:'flex',height:5,borderRadius:3,overflow:'hidden',gap:1}}><div style={{flex:a2,background:'#f59e0b'}}/><div style={{flex:g2,background:'#059669'}}/><div style={{flex:p2,background:'#dc2626'}}/></div><div style={{display:'flex',gap:8,marginTop:3}}>{[['#f59e0b','Actifs',a2],['#059669','Gagnés',g2],['#dc2626','Perdus',p2]].map(([c,l,v])=>(<div key={l} style={{display:'flex',alignItems:'center',gap:2}}><div style={{width:6,height:6,borderRadius:'50%',background:c}}/><span style={{fontSize:'0.61rem',color:$textMut}}>{l} <b style={{color:$text}}>{v}</b></span></div>))}</div></div>);})()}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Trend + Priorités */}
                    <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                      <div style={{flex:'2 1 300px',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                        <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>Échéances — 12 derniers mois</div>
                        <div style={{display:'flex',alignItems:'flex-end',gap:3,height:80}}>
                          {months.map((mo,i)=>{
                            const h=Math.max(3,Math.round(mo.count/maxMo*68));
                            const isNow=mo.y===new Date().getFullYear()&&mo.m===new Date().getMonth();
                            return(<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                              <div style={{fontSize:'0.57rem',color:$textMut,fontWeight:mo.count>0?700:400,minHeight:10,textAlign:'center'}}>{mo.count||''}</div>
                              <div style={{width:'100%',height:h,borderRadius:'2px 2px 0 0',background:isNow?'#007ab5':mo.count>0?'#007ab555':'#e5e7eb'}} title={`${mo.label}: ${mo.count} AO`}/>
                              <div style={{fontSize:'0.52rem',color:isNow?'#007ab5':$textMut,fontWeight:isNow?700:400,textAlign:'center',lineHeight:1.1,whiteSpace:'nowrap'}}>{mo.label}</div>
                            </div>);
                          })}
                        </div>
                      </div>
                      <div style={{flex:'1 1 150px',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                        <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>Par priorité</div>
                        <div style={{display:'flex',flexDirection:'column',gap:8}}>
                          {prioArr.map(([label,cnt])=>{const cfg=getPrio(label);const pct=Math.round(cnt/total*100);return(<div key={label}><div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}><span style={{fontSize:'0.74rem',fontWeight:600,color:cfg.color||$text}}>{label}</span><span style={{fontSize:'0.74rem',fontWeight:700,color:$text}}>{cnt}</span></div><div style={{height:6,borderRadius:3,background:$bgSub,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,borderRadius:3,background:cfg.color||ACC}}/></div></div>);})}
                        </div>
                      </div>
                    </div>
                    {/* Types projet + Statuts */}
                    <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
                      <div style={{flex:'1 1 280px',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                        <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>Top types de projet</div>
                        <div style={{display:'flex',flexDirection:'column',gap:7}}>
                          {tpArr.map(([tp,d])=>{const pct=Math.round(d.n/maxTP*100);const tx=d.f>0?Math.round(d.g/d.f*100):0;return(<div key={tp}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}><span style={{fontSize:'0.72rem',fontWeight:600,color:$text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{tp}</span><div style={{display:'flex',gap:7,alignItems:'center',marginLeft:6}}><span style={{fontSize:'0.68rem',color:$textMut}}>{fmtM(d.b)}</span><span style={{fontSize:'0.67rem',padding:'0px 4px',borderRadius:4,background:tx>5?'#05966920':'#dc262620',color:tx>5?'#059669':'#dc2626',fontWeight:700}}>{tx}%</span><span style={{fontSize:'0.72rem',fontWeight:800,color:$text,minWidth:18,textAlign:'right'}}>{d.n}</span></div></div><div style={{height:4,borderRadius:2,background:$bgSub,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,borderRadius:2,background:'#007ab5',opacity:0.55}}/></div></div>);})}
                        </div>
                      </div>
                      <div style={{flex:'1 1 220px',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px'}}>
                        <div style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10}}>Distribution des statuts</div>
                        <div style={{display:'flex',flexDirection:'column',gap:6}}>
                          {statArr.map(([s,cnt])=>{const cfg=getScfg(s);const pct=Math.round(cnt/maxStat*100);return(<div key={s}><div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}><div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:7,height:7,borderRadius:'50%',background:cfg.color||'#bbb',flexShrink:0}}/><span style={{fontSize:'0.7rem',color:$text}}>{s}</span></div><span style={{fontSize:'0.7rem',fontWeight:700,color:$text}}>{cnt}</span></div><div style={{height:4,borderRadius:2,background:$bgSub,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,borderRadius:2,background:cfg.color||'#bbb',opacity:0.65}}/></div></div>);})}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>
          );
}
