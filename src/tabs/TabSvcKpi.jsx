// === Onglet « svc_kpi » — extrait de App.jsx (modularisation, forme iife) ===
import { AO_RAW } from '../data/ao.js';

export default function TabSvcKpi(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, AO_PHASES, AO_STATUTS, SERVICES_CONFIG, SourceLogo, aoColDragOverIdx, aoColOrder, aoPrioFiltre, aoStatutOrdre, aoSvcColWidths, aoTypeFiltre, appelsOffres, crmRd, getAoGrouped, getAoStats, handleAoColDrop, navEntreprise, navService, setAoColDragIdx, setAoColDragOverIdx, setAoPrioFiltre, setAoSvcColWidths, setAoTypeFiltre, setOngletActif, startColResize } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const entrepriseNom = SERVICES_CONFIG[navEntreprise]?.nom || navEntreprise;
          const svcConfig = SERVICES_CONFIG[navEntreprise]?.services.find(s => s.id === navService);
          const svcLabel = svcConfig?.label || navService;
          const svcIcon = svcConfig?.icon || '📋';
          const svcKey = `${navEntreprise}_${navService}`;
          // ═══ STATISTIQUES ÉTUDES DE PRIX ═══
          if (navEntreprise === 'ezel' && navService === 'etudes_prix') {
            const ACTIF_ST = ['À Préparer','Visite rdv à prendre','Visite rdv pris','Visite demandée','Demandes de précisions','En préparation','En attente de Réponse','AO sélectionné','En cours de négociation','À Suivre – Bientôt'];
            const GAGNE_ST = ['Accepté 🍾','Projet en Cours de Réalisation','Projet Terminé'];
            const PERDU_ST = ['Rejeté  😡','Pas répondu','Reporté','À Suivre - Sans Suite','Visite problématique'];
            const raw = AO_RAW;
            const actifs = raw.filter(a => ACTIF_ST.includes(a.s));
            const gagnes = raw.filter(a => GAGNE_ST.includes(a.s));
            const perdus = raw.filter(a => PERDU_ST.includes(a.s));
            const decides = gagnes.length + perdus.length;
            const tauxSucces = decides > 0 ? Math.round(gagnes.length / decides * 100) : 0;
            const pipelineTotal = actifs.reduce((s,a) => s + (Number(a.b)||0), 0);
            const pipelineOffres = raw.filter(a=>a.s==='En attente de Réponse').reduce((s,a)=>s+(Number(a.o)||0),0);
            const fmtM = (v) => !v||v===0?'—':v>=1000000?(v/1000000).toFixed(1)+'M€':v>=1000?Math.round(v/1000)+'k€':v+'€';
            const todaySK = new Date(); todaySK.setHours(0,0,0,0);
            const urgentsSK = actifs.filter(a=>a.d&&Math.ceil((new Date(a.d)-todaySK)/86400000)<=7&&Math.ceil((new Date(a.d)-todaySK)/86400000)>=0);
            // Stats par type de marché (using a.tm field)
            const byType = [
              { label:'Marché public', key:'pub', count: raw.filter(a=>a.tm==='Marché public').length, gagnes: gagnes.filter(a=>a.tm==='Marché public').length, color:'#0055cc', bg:'#e0f0ff', e:'🏛️' },
              { label:'Marché privé', key:'priv', count: raw.filter(a=>a.tm==='Marché privé').length, gagnes: gagnes.filter(a=>a.tm==='Marché privé').length, color:'#166534', bg:'#dcfce7', e:'🏢' },
              { label:'Particulier', key:'part', count: raw.filter(a=>a.tm==='Marché particulier').length, gagnes: gagnes.filter(a=>a.tm==='Marché particulier').length, color:'#7c3aed', bg:'#f3e8ff', e:'🏠' }
            ];
            // Distribution par statut (actifs seulement)
            const statutDist = [
              { label:'À Préparer', count: raw.filter(a=>a.s==='À Préparer').length, color:'#64748b' },
              { label:'En préparation', count: raw.filter(a=>a.s==='En préparation').length, color:ACC },
              { label:'Visite à planifier', count: raw.filter(a=>['Visite rdv à prendre','Visite rdv pris','Visite demandée'].includes(a.s)).length, color:'#0284c7' },
              { label:'Demandes précisions', count: raw.filter(a=>a.s==='Demandes de précisions').length, color:'#e0f2fe' },
              { label:'En attente réponse', count: raw.filter(a=>a.s==='En attente de Réponse').length, color:'#ea580c' },
              { label:'Accepté 🍾', count: gagnes.length, color:'#059669' },
              { label:'Perdu / archivé', count: perdus.length, color:'#dc2626' }
            ].filter(s=>s.count>0);
            const maxDist = Math.max(...statutDist.map(s=>s.count),1);
            // Mois récents (9 derniers) — using a.d field
            const moisLabels = ['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc'];
            const moisData = {};
            raw.forEach(a => {
              if(!a.d) return;
              const d = new Date(a.d); if(isNaN(d)) return;
              const key = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
              if(!moisData[key]) moisData[key]={total:0,gagnes:0,offres:0};
              moisData[key].total++;
              if(GAGNE_ST.includes(a.s)) moisData[key].gagnes++;
              if(a.s==='En attente de Réponse') moisData[key].offres++;
            });
            const moisKeys = Object.keys(moisData).sort().slice(-9);
            const maxMois = Math.max(...moisKeys.map(k=>moisData[k].total),1);
            // Prochaine deadline
            const upcomingSK = actifs.filter(a=>a.d).map(a=>({...a,_dl:new Date(a.d)})).filter(a=>a._dl>=todaySK).sort((a,b)=>a._dl-b._dl);
            const nextDl = upcomingSK[0];
            const nextDlJours = nextDl ? Math.ceil((nextDl._dl-todaySK)/86400000) : null;
            const kpis = [
              { label:'AO actifs', val: actifs.length, sub:`${urgentsSK.length} urgents ≤7j`, icon:'📐', color:'#007ab5', bg:'#007ab512', urgent:urgentsSK.length>0 },
              { label:'Taux de succès', val: tauxSucces+'%', sub:`${gagnes.length} gagnés / ${decides} décidés`, icon:'🏆', color: tauxSucces>=15?'#059669':tauxSucces>=8?'#d97706':'#ef4444', bg: tauxSucces>=15?'#05966912':tauxSucces>=8?'#f59e0b12':'#ef444412' },
              { label:'Pipeline budget', val: fmtM(pipelineTotal), sub:`AO en cours de préparation`, icon:'💰', color:'#7c3aed', bg:'#7c3aed12' },
              { label:'Offres déposées', val: fmtM(pipelineOffres)||String(raw.filter(a=>a.s==='En attente de Réponse').length)+' dossiers', sub:`En attente de réponse`, icon:'📤', color:'#ea580c', bg:'#ff6d3b12' },
              { label:'Prochaine deadline', val: nextDl?`${nextDl._dl.getDate()}/${nextDl._dl.getMonth()+1}`:'–', sub: nextDl?`dans ${nextDlJours}j — ${nextDl.m?.slice(0,22)}`:'Aucune', icon:'📅', color: nextDlJours!==null&&nextDlJours<=7?'#dc2626':nextDlJours!==null&&nextDlJours<=14?'#d97706':'#059669', bg: nextDlJours!==null&&nextDlJours<=7?'#dc262612':nextDlJours!==null&&nextDlJours<=14?'#f59e0b12':'#05966912', urgent: nextDlJours!==null&&nextDlJours<=7 },
              { label:'Visites à planifier', val: raw.filter(a=>['Visite rdv à prendre','Visite demandée'].includes(a.s)).length, sub:`terrain + obligatoires`, icon:'🏗️', color:'#0891b2', bg:'#0891b212' }
            ];
            return (<div style={{display:'flex',flexDirection:'column',gap:20}}>
              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <h2 style={{margin:0,fontSize:'1.2rem',fontWeight:700,color:$text,display:'flex',alignItems:'center',gap:8}}>📈 Statistiques — Études de Prix</h2>
                  <p style={{margin:'4px 0 0',fontSize:'0.85rem',color:$textMut}}>Analyse de la performance sur {raw.length} AO · Données Monday.com live</p>
                </div>
                <span style={{fontSize:'0.75rem',padding:'4px 10px',borderRadius:crmRd,background:'#e0f2fe',color:'#0369a1',fontWeight:600,border:'1px solid #bae6fd'}}>🟢 Monday.com live</span>
              </div>
              {/* KPI row */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:10}}>
                {kpis.map((k,i) => (
                  <div key={i} style={{background:$bgCard,border:`1px solid ${k.urgent?k.color+'44':$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,transition:'all 0.18s',cursor:'default'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=k.color+'66';const w=e.currentTarget.querySelector('.kw2');if(w){w.style.animation='none';void w.offsetWidth;w.style.animation='sweep 0.8s cubic-bezier(0.4,0,0.2,1)';}}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=k.urgent?k.color+'44':$border;const w=e.currentTarget.querySelector('.kw2');if(w){w.style.animation='none';void w.offsetWidth;w.style.animation='sweepBack 0.8s cubic-bezier(0.4,0,0.2,1)';}}}
                  >
                    <div className="kw2" style={{position:'absolute',inset:0,background:`linear-gradient(90deg,transparent 0%,${k.color}22 50%,transparent 100%)`,transform:'translateX(-100%)',pointerEvents:'none',zIndex:0}}/>
                    <div style={{height:3,background:k.color,opacity:k.urgent?1:0.6}}/>
                    <div style={{padding:'12px 13px'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:7}}>
                        <div style={{fontSize:'0.6rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',lineHeight:1.2}}>{k.label}</div>
                        <div style={{width:24,height:24,borderRadius:6,background:k.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem'}}>{k.icon}</div>
                      </div>
                      <div style={{fontSize:'1.5rem',fontWeight:800,color:k.color,letterSpacing:'-0.02em',lineHeight:1,marginBottom:3}}>{k.val}</div>
                      <div style={{fontSize:'0.62rem',color:k.urgent?k.color:$textMut,fontWeight:k.urgent?700:400,lineHeight:1.3}}>{k.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Deux colonnes */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {/* Distribution par statut */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'18px 20px'}}>
                  <h3 style={{margin:'0 0 14px',fontSize:'0.88rem',fontWeight:700,color:$text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Répartition par statut</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {statutDist.map(s => (<div key={s.label}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                        <span style={{fontSize:'0.8rem',color:$text}}>{s.label}</span>
                        <span style={{fontSize:'0.8rem',fontWeight:700,color:s.color}}>{s.count}</span>
                      </div>
                      <div style={{height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${Math.round(s.count/maxDist*100)}%`,background:s.color,borderRadius:3,transition:'width 0.5s'}}></div>
                      </div>
                    </div>))}
                  </div>
                </div>
                {/* Par type de marché */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'18px 20px'}}>
                  <h3 style={{margin:'0 0 14px',fontSize:'0.88rem',fontWeight:700,color:$text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Par type de marché</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:12}}>
                    {byType.map(t => { const tx = t.count > 0 ? Math.round(t.gagnes/t.count*100) : 0; return (<div key={t.key} style={{padding:'10px 12px',background:t.bg,borderRadius:crmRd,border:`1px solid ${t.color}30`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                        <span style={{fontSize:'0.83rem',fontWeight:600,color:t.color}}>{t.label}</span>
                        <span style={{fontSize:'0.83rem',fontWeight:700,color:$text}}>{t.count} AO</span>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{fontSize:'0.75rem',color:$textMut}}>{t.gagnes} gagnés</span>
                        <span style={{fontSize:'0.75rem',fontWeight:600,color:t.color}}>Taux {tx}%</span>
                      </div>
                    </div>); })}
                  </div>
                </div>
              </div>
              {/* Graphique mensuel */}
              <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden'}}>
                <div style={{padding:'14px 20px',borderBottom:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:$bgSub}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.84rem',color:$text}}>📊 Activité mensuelle AO</div>
                    <div style={{fontSize:'0.72rem',color:$textMut}}>Volume par date limite · {moisKeys.length} derniers mois</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <span style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.68rem',color:$textMut}}><span style={{width:10,height:10,borderRadius:2,background:'#007ab5',display:'inline-block'}}/> AO total</span>
                    <span style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.68rem',color:$textMut}}><span style={{width:10,height:10,borderRadius:2,background:'#059669',display:'inline-block'}}/> Gagnés</span>
                  </div>
                </div>
                <div style={{padding:'16px 20px'}}>
                  <div style={{display:'flex',alignItems:'flex-end',gap:6,height:110}}>
                    {moisKeys.map(k => { const v=moisData[k]; const h=Math.round(v.total/maxMois*100); const hG=Math.round(v.gagnes/maxMois*100); const [yr,mo]=k.split('-'); const isCurrent=k===new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0'); return (<div key={k} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                      <span style={{fontSize:'0.65rem',fontWeight:700,color:isCurrent?'#007ab5':$textSec}}>{v.total}</span>
                      <div style={{width:'100%',position:'relative',display:'flex',flexDirection:'column',justifyContent:'flex-end',height:86}}>
                        <div style={{width:'100%',height:`${h}%`,minHeight:4,background:isCurrent?'#007ab5':'#7c3aed',borderRadius:'3px 3px 0 0',opacity:0.75,position:'relative'}}>
                          {v.gagnes>0&&<div style={{position:'absolute',bottom:0,left:0,right:0,height:`${Math.round(v.gagnes/v.total*100)}%`,background:'#059669',borderRadius:'3px 3px 0 0',opacity:1}}/>}
                        </div>
                      </div>
                      <span style={{fontSize:'0.65rem',color:isCurrent?'#007ab5':$textMut,fontWeight:isCurrent?700:400}}>{moisLabels[parseInt(mo)-1]}</span>
                    </div>); })}
                  </div>
                </div>
              </div>
            </div>);
          }
          // ═══ FIN BRANCHE ETUDES ═══

          const SVC_KPI_LABEL = { etudes_prix: '📐 Suivi Études', preparation: '📋 Suivi Préparation', execution: '🏗️ Suivi Financier', cloture: '✅ Suivi Réception', comptabilite: '💰 Suivi Compta', administratif: '🧾 Suivi Admin' };
          const dynamicSvcKpiLabel = SVC_KPI_LABEL[navService] || 'Réponses AO';

          const SERVICE_KPI = {
            'ezel_etudes_prix': { title: "Bureau d'Études & Prix — Ezel Bâtiment", kpis: [{ label: 'Dossiers en cours', value: '14', icon: '📐', color: '#3498db' },{ label: 'Devis déposés (mois)', value: '7', icon: '✅', color: '#2ecc71' },{ label: 'Délai moyen étude', value: '12j', icon: '⏱️', color: '#e67e22' },{ label: 'Taux succès AO', value: '42%', icon: '📊', color: '#9b59b6' }] },
            'ezel_preparation': { title: 'Préparation Chantiers — Ezel Bâtiment', kpis: [{ label: 'Chantiers en préparation', value: '5', icon: '🔧', color: '#e67e22' },{ label: 'Plans validés (mois)', value: '8', icon: '✅', color: '#2ecc71' },{ label: 'Commandes fournisseurs', value: '22', icon: '📦', color: '#3498db' },{ label: 'Délai moyen prépa', value: '8j', icon: '⏱️', color: '#9b59b6' }] },
            'ezel_execution': { title: 'Suivi Financier Chantiers — Ezel Bâtiment', kpis: [{ label: 'Chantiers actifs', value: '6', icon: '🏗️', color: '#e67e22' },{ label: 'Avancement moyen', value: '62%', icon: '📈', color: '#2ecc71' },{ label: 'Retards signalés', value: '2', icon: '⚠️', color: '#e74c3c' },{ label: 'Heures travaillées', value: '3 240h', icon: '⏱️', color: '#3498db' }] },
            'ezel_cloture': { title: 'Clôture Affaires — Ezel Bâtiment', kpis: [{ label: 'Affaires à clôturer', value: '4', icon: '🏁', color: '#9b59b6' },{ label: 'DGD signés (mois)', value: '3', icon: '✅', color: '#2ecc71' },{ label: 'Réserves levées', value: '87%', icon: '📊', color: '#3498db' },{ label: 'Délai paiement solde', value: '38j', icon: '⏱️', color: '#e67e22' }] },
            'ezel_comptabilite': { title: 'Comptabilité — Ezel Bâtiment', kpis: [{ label: 'Factures à émettre', value: '18', icon: '📤', color: '#3498db' },{ label: 'Factures à payer', value: '24', icon: '📥', color: '#e74c3c' },{ label: 'Encours client', value: '3.2M€', icon: '💳', color: '#e67e22' },{ label: 'DSO moyen', value: '45j', icon: '⏱️', color: '#9b59b6' }] },
            'ezel_administratif': { title: 'Administratif — Ezel Bâtiment', kpis: [{ label: 'Documents en attente', value: '7', icon: '📄', color: '#e67e22' },{ label: 'Contrats actifs', value: '23', icon: '📝', color: '#3498db' },{ label: 'Assurances à renouveler', value: '2', icon: '🛡️', color: '#e74c3c' },{ label: 'Conformité URSSAF', value: '100%', icon: '✅', color: '#2ecc71' }] },
            'roulotte_exploitation': { title: 'Exploitation & Logistique — La Roulotte', kpis: [{ label: 'Unités en location', value: '45/60', icon: '🚛', color: '#2ecc71' },{ label: 'Taux d\'occupation', value: '75%', icon: '📊', color: '#3498db' },{ label: 'Livraisons cette semaine', value: '12', icon: '📦', color: '#e67e22' },{ label: 'Retours planifiés', value: '8', icon: '🔄', color: '#9b59b6' }] },
            'roulotte_commercial': { title: 'Commercial & Location — La Roulotte', kpis: [{ label: 'Devis en attente', value: '15', icon: '📋', color: '#3498db' },{ label: 'Contrats signés (mois)', value: '9', icon: '✅', color: '#2ecc71' },{ label: 'Taux de conversion', value: '38%', icon: '📈', color: '#9b59b6' },{ label: 'CA location mensuel', value: '435k€', icon: '💰', color: '#e67e22' }] },
            'roulotte_planification': { title: 'Planification — La Roulotte', kpis: [{ label: 'Interventions planifiées', value: '28', icon: '📅', color: '#3498db' },{ label: 'Disponibilité flotte', value: '25 unités', icon: '🚛', color: '#2ecc71' },{ label: 'Conflits planning', value: '3', icon: '⚠️', color: '#e74c3c' },{ label: 'Taux ponctualité', value: '92%', icon: '⏱️', color: '#9b59b6' }] },
            'roulotte_comptabilite': { title: 'Comptabilité — La Roulotte', kpis: [{ label: 'Factures clients à émettre', value: '11', icon: '📤', color: '#3498db' },{ label: 'Factures fournisseurs à payer', value: '8', icon: '📥', color: '#e74c3c' },{ label: 'Encours client', value: '680k€', icon: '💳', color: '#e67e22' },{ label: 'Délai paiement moyen', value: '38j', icon: '⏱️', color: '#9b59b6' }] },
            'roulotte_administratif': { title: 'Administratif — La Roulotte', kpis: [{ label: 'Documents en attente', value: '4', icon: '📄', color: '#e67e22' },{ label: 'Contrats location actifs', value: '45', icon: '📝', color: '#3498db' },{ label: 'Contrôles techniques', value: '3 à planifier', icon: '🔍', color: '#e74c3c' },{ label: 'Conformité réglementaire', value: '98%', icon: '✅', color: '#2ecc71' }] },
            'echafaudage_exploitation': { title: 'Exploitation & Montage — L\'Échafaudage', kpis: [{ label: 'Chantiers montage actifs', value: '8', icon: '⚙️', color: '#6C3483' },{ label: 'Tonnes en location', value: '320t/450t', icon: '📦', color: '#3498db' },{ label: 'Montages cette semaine', value: '5', icon: '🏗️', color: '#e67e22' },{ label: 'Démontages planifiés', value: '3', icon: '🔄', color: '#2ecc71' }] },
            'echafaudage_commercial': { title: 'Commercial & Location — L\'Échafaudage', kpis: [{ label: 'Devis en attente', value: '22', icon: '📋', color: '#3498db' },{ label: 'Contrats signés (mois)', value: '7', icon: '✅', color: '#2ecc71' },{ label: 'Taux de conversion', value: '35%', icon: '📈', color: '#9b59b6' },{ label: 'CA mensuel', value: '1.25M€', icon: '💰', color: '#e67e22' }] },
            'echafaudage_materiel': { title: 'Parc Matériel — L\'Échafaudage', kpis: [{ label: 'Stock disponible', value: '130t', icon: '📦', color: '#2ecc71' },{ label: 'En maintenance', value: '15t', icon: '🔧', color: '#e74c3c' },{ label: 'Taux d\'utilisation', value: '71%', icon: '📊', color: '#3498db' },{ label: 'Valeur parc', value: '2.8M€', icon: '💰', color: '#e67e22' }] },
            'echafaudage_comptabilite': { title: 'Comptabilité — L\'Échafaudage', kpis: [{ label: 'Factures clients à émettre', value: '16', icon: '📤', color: '#3498db' },{ label: 'Factures fournisseurs à payer', value: '19', icon: '📥', color: '#e74c3c' },{ label: 'Encours client', value: '1.8M€', icon: '💳', color: '#e67e22' },{ label: 'Délai paiement moyen', value: '52j', icon: '⏱️', color: '#9b59b6' }] },
            'echafaudage_administratif': { title: 'Administratif — L\'Échafaudage', kpis: [{ label: 'Documents en attente', value: '5', icon: '📄', color: '#e67e22' },{ label: 'Contrats actifs', value: '34', icon: '📝', color: '#3498db' },{ label: 'Habilitations à renouveler', value: '4', icon: '🛡️', color: '#e74c3c' },{ label: 'Conformité sécurité', value: '95%', icon: '✅', color: '#2ecc71' }] },
            'etancheite_execution': { title: "Suivi Financier Chantiers — L'Étanchéité", kpis: [{ label: 'Chantiers actifs', value: '4', icon: '🔨', color: '#0e6655' },{ label: 'Avancement moyen', value: '55%', icon: '📈', color: '#2ecc71' },{ label: 'Retards signalés', value: '1', icon: '⚠️', color: '#e74c3c' },{ label: 'M² traités (mois)', value: '2 800m²', icon: '📐', color: '#3498db' }] },
            'etancheite_etudes_prix': { title: "Bureau d'Études & Prix — L'Étanchéité", kpis: [{ label: 'Devis en cours', value: '9', icon: '📐', color: '#3498db' },{ label: 'Devis acceptés (mois)', value: '4', icon: '✅', color: '#2ecc71' },{ label: 'Taux de conversion', value: '44%', icon: '📊', color: '#9b59b6' },{ label: 'Pipeline', value: '1.2M€', icon: '💰', color: '#e67e22' }] },
            'etancheite_preparation': { title: "Préparation Chantiers — L'Étanchéité", kpis: [{ label: 'Chantiers en prépa', value: '3', icon: '🔧', color: '#e67e22' },{ label: 'Plans validés (mois)', value: '4', icon: '✅', color: '#2ecc71' },{ label: 'Commandes matériaux', value: '11', icon: '📦', color: '#3498db' },{ label: 'Délai moyen prépa', value: '6j', icon: '⏱️', color: '#9b59b6' }] },
            'etancheite_cloture': { title: "Clôture Affaires — L'Étanchéité", kpis: [{ label: 'Affaires à clôturer', value: '2', icon: '🏁', color: '#9b59b6' },{ label: 'DGD signés (mois)', value: '2', icon: '✅', color: '#2ecc71' },{ label: 'Réserves levées', value: '91%', icon: '📊', color: '#3498db' },{ label: 'Délai paiement solde', value: '42j', icon: '⏱️', color: '#e67e22' }] },
            'etancheite_technique': { title: "Bureau Technique — L'Étanchéité", kpis: [{ label: 'Études techniques en cours', value: '6', icon: '🛠️', color: '#3498db' },{ label: 'Rapports validés (mois)', value: '8', icon: '✅', color: '#2ecc71' },{ label: 'Délai moyen étude', value: '12j', icon: '⏱️', color: '#e67e22' },{ label: 'Diagnostics planifiés', value: '3', icon: '🔍', color: '#9b59b6' }] },
            'etancheite_comptabilite': { title: "Comptabilité — L'Étanchéité", kpis: [{ label: 'Factures à émettre', value: '7', icon: '📤', color: '#3498db' },{ label: 'Factures à payer', value: '11', icon: '📥', color: '#e74c3c' },{ label: 'Encours client', value: '420k€', icon: '💳', color: '#e67e22' },{ label: 'DSO moyen', value: '40j', icon: '⏱️', color: '#9b59b6' }] },
            'etancheite_administratif': { title: "Administratif — L'Étanchéité", kpis: [{ label: 'Documents en attente', value: '3', icon: '📄', color: '#e67e22' },{ label: 'Contrats actifs', value: '12', icon: '📝', color: '#3498db' },{ label: 'Certifications à renouveler', value: '1', icon: '🛡️', color: '#e74c3c' },{ label: 'Conformité Qualibat', value: '100%', icon: '✅', color: '#2ecc71' }] },
            'roulotte_planification': { title: 'Planification — La Roulotte', kpis: [{ label: 'Interventions planifiées', value: '28', icon: '📅', color: '#3498db' },{ label: 'Disponibilité flotte', value: '25 unités', icon: '🚛', color: '#2ecc71' },{ label: 'Conflits planning', value: '3', icon: '⚠️', color: '#e74c3c' },{ label: 'Taux ponctualité', value: '92%', icon: '⏱️', color: '#9b59b6' }] },
            'echafaudage_planification': { title: "Planification — L'Échafaudage", kpis: [{ label: 'Montages planifiés', value: '14', icon: '📅', color: '#6C3483' },{ label: 'Équipes disponibles', value: '4', icon: '👷', color: '#2ecc71' },{ label: 'Conflits planning', value: '1', icon: '⚠️', color: '#e74c3c' },{ label: 'Taux ponctualité', value: '89%', icon: '⏱️', color: '#3498db' }] }
          };

          const data = SERVICE_KPI[svcKey];
          const hasAO = navService === 'etudes_prix' || navService === 'affaires' || navService === 'etudes';
          const aoStats = hasAO ? getAoStats() : null;
          const aoGrouped = hasAO ? getAoGrouped() : null;
          const fmtM = (v) => v >= 1000000 ? (v/1000000).toFixed(1)+'M€' : v >= 1000 ? Math.round(v/1000)+'k€' : v+'€';

          const AO_COL_DEFS = {
            element:{label:'Réf.',w:110}, source:{label:'Source',w:90}, client:{label:'Client',w:160},
            objet:{label:'Objet',w:220}, type:{label:'Type',w:90}, statut:{label:'Statut',w:160},
            phase:{label:'Phase',w:140}, priorite:{label:'Priorité',w:100}, montant:{label:'Montant',w:110},
            dateDepot:{label:'Date dépôt',w:120}, responsable:{label:'Responsable',w:130}, progression:{label:'Progression',w:140}
          };

          const T = {sm:'0.72rem',md:'0.8rem'};

          return (<>
            {/* ── Showcase header ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:'1px solid '+$border,marginBottom:14,overflow:'hidden'}}>
              <div style={{height:3,background:'linear-gradient(90deg,'+ACC+','+ACC+'60)'}}/>
              <div style={{padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:36,height:36,borderRadius:9,background:ACC+'15',border:'1px solid '+ACC+'30',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>{svcIcon}</div>
                  <div>
                    <div style={{fontSize:'0.88rem',fontWeight:800,color:$text}}>{data?.title||navService}</div>
                    <div style={{fontSize:'0.7rem',color:$textMut}}>Indicateurs de service · Données Monday.com live</div>
                  </div>
                </div>
              </div>
            </div>
            {data && (
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:20}}>
                {data.kpis.map((kpi, i) => (
                  <div key={i} style={{background:$bgCard, borderRadius:crmRd, padding:'18px 18px', border:'1px solid '+$border, borderLeft:'3px solid '+kpi.color}}>
                    <div style={{display:'flex', alignItems:'center', gap:7, marginBottom:8}}>
                      <span style={{fontSize:'1.1rem'}}>{kpi.icon}</span>
                      <span style={{fontSize:'0.75rem', color:$textMut, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em'}}>{kpi.label}</span>
                    </div>
                    <div style={{fontSize:'1.6rem', fontWeight:800, color:kpi.color, letterSpacing:'-0.02em'}}>{kpi.value}</div>
                  </div>
                ))}
              </div>
            )}

            {hasAO && (<div style={{background:$bgCard, borderRadius:crmRd, boxShadow:$shadow, border:`1px solid ${$border}`, overflow:'visible'}}>
              {/* Header */}
              <div style={{padding:'20px 20px 0'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
                  <div>
                    <h2 style={{fontSize:'1.15rem', fontWeight:700, color:$text, margin:0}}>Réponses Appels d'Offres</h2>
                    <div style={{fontSize:'0.72rem', color:$textMut, marginTop:2}}>Préparation · Dépôt · Suivi</div>
                  </div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <select value={aoTypeFiltre} onChange={e=>setAoTypeFiltre(e.target.value)} style={{fontSize:T.sm,padding:'4px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,color:$textSec,cursor:'pointer',outline:'none',fontFamily:'inherit'}}>
                      <option value="tous">Type: Tous</option><option value="Public">Public</option><option value="Privé">Privé</option>
                    </select>
                    <select value={aoPrioFiltre} onChange={e=>setAoPrioFiltre(e.target.value)} style={{fontSize:T.sm,padding:'4px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,color:$textSec,cursor:'pointer',outline:'none',fontFamily:'inherit'}}>
                      <option value="tous">Priorité: Toutes</option><option value="Haute">Haute</option><option value="Moyenne">Moyenne</option><option value="Basse">Basse</option>
                    </select>
                  </div>
                </div>
                {/* KPI cards */}
                <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:16}}>
                  {[
                    { label: 'DOSSIERS EN COURS', value: aoStats.enCours, color: '#3b82f6' },
                    { label: 'REMPORTÉS', value: aoStats.remportes, color: '#22c55e' },
                    { label: 'NON RETENUS', value: aoStats.nonRetenus, color: '#ef4444' },
                    { label: 'COURRIERS & SUITES', value: aoStats.courriers, color: '#8b5cf6' },
                    { label: 'PIPELINE ACTIF', value: fmtM(aoStats.pipeline), color: '#d97706' },
                  ].map((s, i) => (
                    <div key={i} style={{background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`, padding:'16px 20px'}}>
                      <div style={{fontSize:'0.68rem', fontWeight:500, color:$textMut, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6}}>{s.label}</div>
                      <div style={{fontSize:'1.5rem', fontWeight:700, color:s.color, letterSpacing:'-0.02em'}}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Grouped Table */}
              <div style={{padding:'0 0 0'}}>
                {aoGrouped && aoGrouped.length > 0 ? (() => {
                  return aoGrouped.map(grp => {
                    const statInfo = AO_STATUTS[grp.key] || {color:$textMut, icon:'📋'};
                    return (<div key={grp.key} style={{marginBottom:0}}>
                      <div style={{padding:'10px 20px', background:$bgSub, borderTop:`1px solid ${$border}`, borderBottom:`1px solid ${$border}`, display:'flex', alignItems:'center', gap:8}}>
                        <span>{statInfo.icon}</span>
                        <span style={{fontSize:T.md, fontWeight:700, color:$text}}>{grp.key}</span>
                        <span style={{fontSize:T.sm, color:$textMut, fontWeight:600}}>({grp.items.length})</span>
                        <span style={{fontSize:T.sm, color:statInfo.color, fontWeight:600, marginLeft:'auto'}}>{fmtM(grp.items.reduce((s,a)=>s+a.montant,0))}</span>
                      </div>
                      <div style={{overflowX:'auto'}}>
                        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.88rem'}}>
                          <thead><tr style={{background:$bgSub}}>
                            {aoColOrder.map(colId => {
                              const def = AO_COL_DEFS[colId];
                              if (!def) return null;
                              return (<th key={colId} draggable onDragStart={()=>setAoColDragIdx(aoColOrder.indexOf(colId))} onDragOver={e=>{e.preventDefault();setAoColDragOverIdx(aoColOrder.indexOf(colId));}} onDrop={e=>{e.preventDefault();handleAoColDrop(aoColOrder.indexOf(colId));}} onDragEnd={()=>{setAoColDragIdx(null);setAoColDragOverIdx(null);}}
                                style={{padding:'6px 10px', textAlign:'left', fontWeight:600, color:$textMut, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.04em', borderBottom:`1px solid ${$border}`, whiteSpace:'nowrap', cursor:'grab', minWidth:aoSvcColWidths[colId]||def.w, position:'relative', background: aoColDragOverIdx===aoColOrder.indexOf(colId)?$accentSub:$bgSub}}>
                                {def.label}
                                <div onMouseDown={e=>startColResize(colId,e,aoSvcColWidths,setAoSvcColWidths)} style={{position:'absolute',right:0,top:0,bottom:0,width:4,cursor:'col-resize',background:'transparent'}} onMouseOver={e=>e.currentTarget.style.background=$accent+'40'} onMouseOut={e=>e.currentTarget.style.background='transparent'}/>
                              </th>);
                            })}
                          </tr></thead>
                          <tbody>{grp.items.map(ao => {
                            const phase = AO_PHASES.find(p=>p.id===ao.phase);
                            const prio = {Haute:{color:'#e74c3c',bg:'#fee2e2'},Moyenne:{color:'#f39c12',bg:'#fef3c7'},Basse:{color:'#3498db',bg:'#dbeafe'}}[ao.priorite]||{color:$textMut,bg:$bgSub};
                            const typeC = ao.type==='Public'?{color:'#27ae60',bg:'#dcfce7'}:{color:'#8b5cf6',bg:'#f3e8ff'};
                            const pct = ao.tachesTotal>0?Math.round(ao.taches/ao.tachesTotal*100):0;
                            return (<tr key={ao.id} style={{borderBottom:`1px solid ${$borderLight||$border}`}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover||$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                              {aoColOrder.map(colId => {
                                const base = {padding:'8px 10px', fontSize:T.md, color:$text, minWidth:aoSvcColWidths[colId]||(AO_COL_DEFS[colId]?.w||100)};
                                switch(colId) {
                                  case 'element': return <td key={colId} style={{...base, fontWeight:600, color:$accent, whiteSpace:'nowrap'}}>{ao.id}</td>;
                                  case 'source': return <td key={colId} style={base}><div style={{display:'flex',alignItems:'center',gap:5}}><SourceLogo name={ao.source} size={14}/><span style={{fontSize:T.sm}}>{ao.source}</span></div></td>;
                                  case 'client': return <td key={colId} style={{...base, fontWeight:500}}>{ao.client}</td>;
                                  case 'objet': return <td key={colId} style={{...base, maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{ao.objet}</td>;
                                  case 'type': return <td key={colId} style={{...base, textAlign:'center'}}><span style={{padding:'2px 8px',borderRadius:crmRd>0?20:2,fontSize:T.sm,fontWeight:600,background:typeC.bg,color:typeC.color}}>{ao.type}</span></td>;
                                  case 'statut': return <td key={colId} style={base}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:T.sm,fontWeight:600,background:(AO_STATUTS[ao.statut]?.bg||$bgSub),color:(AO_STATUTS[ao.statut]?.color||$textMut),display:'inline-flex',alignItems:'center',gap:4}}>{AO_STATUTS[ao.statut]?.icon} {ao.statut}</span></td>;
                                  case 'phase': return <td key={colId} style={base}>{phase?<span style={{padding:'2px 8px',borderRadius:crmRd>0?20:2,fontSize:T.sm,fontWeight:500,background:phase.color+'15',color:phase.color}}>{phase.icon} {phase.label}</span>:<span style={{color:$textMut}}>—</span>}</td>;
                                  case 'priorite': return <td key={colId} style={{...base, textAlign:'center'}}><span style={{padding:'2px 8px',borderRadius:crmRd>0?20:2,fontSize:T.sm,fontWeight:600,background:prio.bg,color:prio.color}}>{ao.priorite}</span></td>;
                                  case 'montant': return <td key={colId} style={{...base, textAlign:'right', fontWeight:600}}>{fmtM(ao.montant)}</td>;
                                  case 'dateDepot': return <td key={colId} style={{...base, fontSize:T.sm, color:$textSec}}>{ao.dateDepot}</td>;
                                  case 'responsable': return <td key={colId} style={{...base, fontSize:T.sm}}>{ao.responsable}</td>;
                                  case 'progression': return <td key={colId} style={base}><div style={{display:'flex',alignItems:'center',gap:6}}><div style={{flex:1,height:6,borderRadius:4,background:$bgSub,overflow:'hidden'}}><div style={{height:'100%',borderRadius:4,background:pct>=100?'#22c55e':pct>=50?'#f59e0b':'#3b82f6',width:pct+'%',transition:'width 0.3s'}}/></div><span style={{fontSize:'0.68rem',color:$textMut,flexShrink:0}}>{ao.taches}/{ao.tachesTotal}</span></div></td>;
                                  default: return <td key={colId} style={base}><span style={{color:$textMut}}>—</span></td>;
                                }
                              })}
                            </tr>);
                          })}</tbody>
                        </table>
                      </div>
                    </div>);
                  });
                })() : <div style={{padding:20,textAlign:'center',color:$textMut}}>Aucun dossier correspondant</div>}
              </div>
              {/* Footer */}
              {(() => { const filteredCount = aoGrouped ? aoGrouped.reduce((s,g)=>s+g.items.length,0) : appelsOffres.length; return (
              <div style={{display:'flex',alignItems:'center',gap:16,padding:'8px 16px',fontSize:'0.72rem',color:$textMut,borderTop:`1px solid ${$border}`}}>
                <span style={{fontWeight:600}}>{filteredCount} dossier{filteredCount>1?'s':''}{filteredCount<appelsOffres.length?` / ${appelsOffres.length}`:''}</span>
                <span style={{marginLeft:'auto',display:'flex',gap:12,flexWrap:'wrap'}}>
                  {aoStatutOrdre.map(k=>{const v=AO_STATUTS[k]||{};const cnt=appelsOffres.filter(a=>a.statut===k).length;return cnt>0?<span key={k} style={{display:'flex',alignItems:'center',gap:3}}><span style={{width:6,height:6,borderRadius:'50%',background:v.color}}/>{k} {cnt}</span>:null;})}
                </span>
              </div>); })()}
              <div style={{padding:'8px 16px 12px'}}>
                <button onClick={()=>{setOngletActif('veille_ao');}} style={{padding:'8px 20px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,fontSize:'0.88rem',fontWeight:600,color:$accent,cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>📊 Ouvrir le module Veille AO complet →</button>
              </div>
            </div>)}

            {!data && !hasAO && (<div style={{background:$bgCard,borderRadius:crmRd,boxShadow:$shadow,padding:32,border:`1px solid ${$border}`,textAlign:'center'}}><div style={{fontSize:'3rem',marginBottom:12}}>{svcIcon}</div><h2 style={{fontSize:'1.1rem',fontWeight:700,color:$accent}}>{svcLabel} — {entrepriseNom}</h2><p style={{color:$textMut,fontSize:'0.88rem'}}>Les indicateurs de ce service seront bientôt disponibles.</p></div>)}
          </>);
}
