// === Onglet « kpi_dashboard » — extrait de App.jsx (modularisation, forme iife) ===
import { AO_RAW, getAffId, getDosId, getExt } from '../data/ao.js';
import { CRM_FIL_ACC } from '../data/theme.js';

export default function TabKpiDashboard(__props) {
  const { $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, SERVICES_CONFIG, ca, chantiers, crmRd, navEntreprise, navService, postes, setOngletActif } = __props;
          const ACC = navEntreprise==='ezel'?'#007ab5':navEntreprise==='roulotte'?'#C49A2A':navEntreprise==='echafaudage'?'#9f58bd':navEntreprise==='etancheite'?'#12856f':navEntreprise==='yilmaz'?'#555555':'#007ab5';
          const entrepriseNom = SERVICES_CONFIG[navEntreprise]?.nom || navEntreprise;
          const svcConfig = SERVICES_CONFIG[navEntreprise]?.services.find(s => s.id === navService);
          const svcLabel = svcConfig?.label || navService;
          const svcIcon = svcConfig?.icon || '☰';
          const svcKey = `${navEntreprise}_${navService}`;
          const acc = CRM_FIL_ACC[navEntreprise] || $accent;
          const aoActifs = AO_RAW.filter(a => ['À Préparer','Visite rdv à prendre','Visite demandée','Visite rdv pris','Demandes de précisions','En préparation','En attente de Réponse','AO sélectionné'].includes(a.s));
          const aoGagnes = AO_RAW.filter(a => ['Accepté ✧','Projet en Cours de Réalisation','Projet Terminé'].includes(a.s));
          const aoPerdus = AO_RAW.filter(a => ['Rejeté  😡','Pas répondu','Reporté','À Suivre - Sans Suite','Visite problématique'].includes(a.s));
          const aoDecides = aoGagnes.length + aoPerdus.filter(a => a.s !== 'Pas répondu' && a.s !== 'Reporté').length;
          const tauxSucces = aoDecides > 0 ? Math.round(aoGagnes.length / aoDecides * 100) : 0;
          const fmtEuro = (v) => {
            if (!v || v === 0) return '—';
            if (v >= 1000000) return (v/1000000).toFixed(1).replace('.0','') + 'M€';
            if (v >= 1000) return Math.round(v/1000) + 'k€';
            return v + '€';
          };
          const CHANTIERS_EXEC = [
            {code:'1690',nom:'Construction gendarmerie Guignes',ville:'Guignes (77)',ca:2973442,statut:'Travaux en cours',resp:'A. AZIYANE'},
            {code:'1698',nom:'MAC Accessibilité Handicapés',ville:'Paris',ca:null,statut:'Travaux en cours',resp:'A. AZIYANE'},
            {code:'1718',nom:'Réhabilitation Stade Pershing',ville:'Paris 12',ca:652390,statut:'Travaux en cours',resp:'A. AZIYANE'},
            {code:'1719',nom:'Toiture-terrasse Quai Branly',ville:'Paris 7',ca:253645,statut:'Travaux en cours',resp:'P. SEMERCI'},
            {code:'1722',nom:'Rénovation thermique Éc. Polytechnique',ville:'Palaiseau (91)',ca:170362,statut:'Travaux en cours',resp:'P. SEMERCI'},
            {code:'1721',nom:'Réhabilitation labos PIJ',ville:'Épinay-sur-Seine (93)',ca:56546,statut:'Travaux en cours',resp:'A. AZIYANE'},
            {code:'1692',nom:'Préfecture Palaiseau',ville:'Palaiseau',ca:193763,statut:'Travaux en cours',resp:'P. SEMERCI'},
            {code:'1680',nom:'Bardage collège Edmond Michelet',ville:'Paris',ca:1097696,statut:'Travaux suspendus',resp:'—'},
            {code:'1702',nom:'Réhabilitation maison individuelle',ville:'Bourron-Marlotte (77)',ca:730082,statut:'Travaux suspendus',resp:'A. AZIYANE'},
            {code:'1706',nom:'Étanchéité Voltaire',ville:'Paris 11',ca:273049,statut:'Travaux suspendus',resp:'P. SEMERCI'},
            {code:'1715',nom:'Pôle Santé & CTM',ville:'Chevry-Cossigny (77)',ca:33890,statut:'Travaux suspendus',resp:'P. SEMERCI'},
            {code:'1654',nom:'Chantier Cachan',ville:'Cachan',ca:168568,statut:'Travaux suspendus',resp:'—'},
            {code:'1689',nom:'SCI des Cèdres',ville:'St-Germain-des-Granges',ca:112398,statut:'Travaux suspendus',resp:'—'},
            {code:'1707',nom:'Jacob Barbizon',ville:'Barbizon (77)',ca:102120,statut:'Travaux suspendus',resp:'—'},
          ];
          const CHANTIERS_PREP = [
            {code:'1723',nom:'Étanchéité Onera Palaiseau',ville:'Palaiseau',ca:196799,statut:'OS Reçu',resp:'P. SEMERCI'},
            {code:'1717',nom:'Aménagement crèche Lumières',ville:'Coupvray (77)',ca:16607,statut:'OS Reçu',resp:'A. AZIYANE'},
            {code:'1716',nom:'Aménagement crèche Goodall',ville:'Coupvray (77)',ca:14207,statut:'OS Reçu',resp:'A. AZIYANE'},
            {code:'1709',nom:'EPA Sénart Poste de garde',ville:'Sénart',ca:null,statut:'OS Reçu',resp:'—'},
          ];
          const KPI_DATA = {
            'ezel_etudes_prix': [
              {l:'AO actifs',v:String(aoActifs.length),i:'◺',c:acc,sub:aoActifs.filter(a=>a.d&&Math.ceil((new Date(a.d)-new Date())/86400000)<=7&&Math.ceil((new Date(a.d)-new Date())/86400000)>=0).length+' urgents (≤7j)'},
              {l:'En attente réponse',v:String(AO_RAW.filter(a=>a.s==='En attente de Réponse').length),i:'↥',c:'#3b82f6',sub:fmtEuro(AO_RAW.filter(a=>a.s==='En attente de Réponse').reduce((s,a)=>s+(a.o||0),0))+' en jeu'},
              {l:'Taux de succès',v:tauxSucces+'%',i:'★',c:tauxSucces>=15?'#10b981':tauxSucces>=8?'#f59e0b':'#ef4444',sub:aoGagnes.length+' gagnés / '+aoDecides+' décidés'},
              {l:'Pipeline budget',v:fmtEuro(AO_RAW.filter(a=>['À Préparer','En préparation','Visite rdv à prendre'].includes(a.s)).reduce((s,a)=>s+(a.b||0),0)),i:'€',c:'#8b5cf6',sub:String(AO_RAW.filter(a=>['À Préparer','En préparation','Visite rdv à prendre'].includes(a.s)).length)+' dossiers actifs'}
            ],
            'ezel_preparation': [
              {l:'Dossiers Phase 2',v:'4',i:'☰',c:acc,sub:'228k€ de marché'},
              {l:'OS reçus',v:'3',i:'✓',c:'#10b981',sub:'prêts à démarrer'},
              {l:'En attente OS',v:'1',i:'⏳',c:'#f59e0b',sub:'EPA Sénart'},
              {l:'Docs à préparer',v:'12',i:'▸',c:'#8b5cf6',sub:'PPSPS, DICT, planning'}
            ],
            'ezel_execution': [
              {l:'Chantiers Phase 3',v:'14',i:'◆',c:acc,sub:'6.82M€ de marché'},
              {l:'Travaux en cours',v:'7',i:'🔨',c:'#10b981',sub:'équipes sur site'},
              {l:'Travaux suspendus',v:'7',i:'🚦',c:'#f59e0b',sub:'intempéries / blocage'},
              {l:'CA Phase 3',v:'6.8M€',i:'€',c:'#3b82f6',sub:"en cours d'exécution"}
            ],
            'ezel_cloture': [
              {l:'Réception & Clôture',v:'19',i:'☰',c:acc,sub:'10M€ de marché'},
              {l:'DGD en préparation',v:'9',i:'✎',c:'#f59e0b',sub:'décompte à préparer'},
              {l:'DGD envoyée',v:'6',i:'↥',c:'#3b82f6',sub:'en attente validation'},
              {l:'GPA / RG bloquée',v:'11',i:'▬',c:'#8b5cf6',sub:'2.8M€ GPA en cours'}
            ],
            'ezel_logistique': [
              {l:'Véhicules actifs',v:'8',i:'🚐',c:acc,sub:'sur chantiers'},
              {l:'Engins loués',v:'3',i:'🚜',c:'#f59e0b',sub:'nacelle, chariot, benne'},
              {l:'Bons de commande',v:'14',i:'▣',c:'#3b82f6',sub:'en cours de livraison'},
              {l:'Fournisseurs actifs',v:'22',i:'◈',c:'#8b5cf6',sub:'référencés 2026'}
            ],
            'ezel_rh': [
              {l:'Effectif actif',v:'34',i:'◉',c:acc,sub:'salariés Ezel'},
              {l:'Habilitations',v:'4',i:'▲',c:'#ef4444',sub:'à renouveler'},
              {l:'Absences (mois)',v:'3',i:'◫',c:'#f59e0b',sub:'CP + maladie'},
              {l:'Recrutements',v:'2',i:'◉',c:'#3b82f6',sub:'postes ouverts'}
            ],
            'ezel_juridique': [
              {l:'Litiges actifs',v:'2',i:'§',c:'#ef4444',sub:'en cours'},
              {l:'Contrats actifs',v:'28',i:'✎',c:acc,sub:'marchés en cours'},
              {l:'Assurances',v:'3',i:'⬟',c:'#10b981',sub:'DC, RCP, dommages'},
              {l:'Contentieux',v:'1',i:'🔴',c:'#ef4444',sub:'procédure engagée'}
            ],
            'ezel_comptabilite': [
              {l:'Encours clients',v:'3.8M€',i:'▬',c:acc,sub:'créances à recouvrer'},
              {l:'Factures à émettre',v:'11',i:'↥',c:'#3b82f6',sub:'situations validées'},
              {l:'Factures à payer',v:'18',i:'↧',c:'#f59e0b',sub:'fournisseurs + ST'},
              {l:'Délai moyen',v:'47j',i:'◷',c:'#8b5cf6',sub:'jours paiement client'}
            ],
            'ezel_administratif': [
              {l:'Docs en attente',v:'5',i:'▫',c:'#f59e0b',sub:'à signer ou valider'},
              {l:'Contrats actifs',v:'28',i:'✎',c:acc,sub:'marchés en portefeuille'},
              {l:'Assurances',v:'2',i:'⬟',c:'#ef4444',sub:'à renouveler avant 06/2026'},
              {l:'Conformité',v:'100%',i:'✓',c:'#10b981',sub:'certifications à jour'}
            ],
            'roulotte_exploitation': [
              {l:'Unités en location',v:'45 / 60',i:'▸',c:'#10b981',sub:'taux occupation 75%'},
              {l:'Livraisons sem.',v:'12',i:'▣',c:acc,sub:'planifiées cette semaine'},
              {l:'Retours planifiés',v:'8',i:'↻',c:'#f59e0b',sub:'récupérations à effectuer'},
              {l:'Incidents signalés',v:'2',i:'▲',c:'#ef4444',sub:'en cours de traitement'}
            ],
            'roulotte_crm': [
              {l:'Devis en attente',v:'15',i:'☰',c:acc,sub:'réponse client attendue'},
              {l:'Contrats signés',v:'9',i:'✓',c:'#10b981',sub:'ce mois'},
              {l:'Taux conversion',v:'38%',i:'↗',c:'#8b5cf6',sub:'devis → contrat'},
              {l:'CA mensuel',v:'435k€',i:'€',c:'#3b82f6',sub:'objectif 500k€'}
            ],
            'roulotte_logistique': [
              {l:'Flotte véhicules',v:'12',i:'🚐',c:acc,sub:'camions + utilitaires'},
              {l:'Tournées / sem.',v:'28',i:'⌖',c:'#3b82f6',sub:'livraisons + retraits'},
              {l:'Conflits planning',v:'3',i:'▲',c:'#ef4444',sub:'à résoudre'},
              {l:'Ponctualité',v:'92%',i:'◷',c:'#10b981',sub:'dans les délais'}
            ],
            'roulotte_rh': [
              {l:'Effectif',v:'8',i:'◉',c:acc,sub:'chauffeurs + admin'},
              {l:'Permis C valides',v:'6 / 6',i:'✓',c:'#10b981',sub:'tous à jour'},
              {l:'Congés (mois)',v:'2',i:'◫',c:'#f59e0b',sub:'à planifier'},
              {l:'Formation',v:'1',i:'▤',c:'#3b82f6',sub:'ce trimestre'}
            ],
            'roulotte_comptabilite': [
              {l:'Factures à émettre',v:'11',i:'↥',c:acc,sub:'contrats livrés'},
              {l:'Factures à payer',v:'8',i:'↧',c:'#ef4444',sub:'fournisseurs'},
              {l:'Encours clients',v:'680k€',i:'▬',c:'#f59e0b',sub:'créances actives'},
              {l:'Délai paiement',v:'38j',i:'◷',c:'#8b5cf6',sub:'moyenne clients'}
            ],
            'roulotte_administratif': [
              {l:'Docs en attente',v:'4',i:'▫',c:'#f59e0b',sub:'à signer'},
              {l:'Contrats actifs',v:'45',i:'✎',c:acc,sub:'locations en cours'},
              {l:'CT à planifier',v:'3',i:'⌕',c:'#ef4444',sub:'contrôles techniques'},
              {l:'Conformité',v:'98%',i:'✓',c:'#10b981',sub:'équipements normés'}
            ],
            'echafaudage_exploitation': [
              {l:'Chantiers montage',v:'8',i:'◆',c:acc,sub:'actifs en ce moment'},
              {l:'Tonnes en location',v:'320t / 450t',i:'▣',c:'#3b82f6',sub:'taux utilisation 71%'},
              {l:'Montages sem.',v:'5',i:'✱',c:'#10b981',sub:'nouvelles installations'},
              {l:'Démontages sem.',v:'3',i:'↻',c:'#f59e0b',sub:'récupérations planifiées'}
            ],
            'echafaudage_crm': [
              {l:'Devis en attente',v:'22',i:'☰',c:acc,sub:'réponse client attendue'},
              {l:'Contrats signés',v:'7',i:'✓',c:'#10b981',sub:'ce mois'},
              {l:'Taux conversion',v:'35%',i:'↗',c:'#8b5cf6',sub:'devis → contrat'},
              {l:'CA mensuel',v:'1.25M€',i:'€',c:'#3b82f6',sub:'objectif 1.5M€'}
            ],
            'echafaudage_logistique': [
              {l:'Parc matériel',v:'450t',i:'▣',c:acc,sub:'stock total'},
              {l:'En maintenance',v:'15t',i:'✱',c:'#ef4444',sub:'en réparation'},
              {l:'Flotte véhicules',v:'6',i:'🚐',c:'#3b82f6',sub:'camions + grues'},
              {l:'Valeur parc',v:'2.8M€',i:'€',c:'#8b5cf6',sub:'immobilisations 2026'}
            ],
            'echafaudage_rh': [
              {l:'Monteurs',v:'18',i:'◉',c:acc,sub:'effectif terrain'},
              {l:'Habilitations',v:'4',i:'▲',c:'#ef4444',sub:'à renouveler'},
              {l:'Absences (mois)',v:'2',i:'◫',c:'#f59e0b',sub:'CP + maladie'},
              {l:'Formation',v:'2',i:'▤',c:'#3b82f6',sub:'travaux en hauteur'}
            ],
            'echafaudage_comptabilite': [
              {l:'Factures à émettre',v:'16',i:'↥',c:acc,sub:'fin de mois'},
              {l:'Factures à payer',v:'19',i:'↧',c:'#ef4444',sub:'fournisseurs + ST'},
              {l:'Encours clients',v:'1.8M€',i:'▬',c:'#f59e0b',sub:'créances actives'},
              {l:'Délai paiement',v:'52j',i:'◷',c:'#8b5cf6',sub:'moyenne clients'}
            ],
            'echafaudage_administratif': [
              {l:'Docs en attente',v:'5',i:'▫',c:'#f59e0b',sub:'à signer'},
              {l:'Contrats actifs',v:'34',i:'✎',c:acc,sub:'chantiers en portefeuille'},
              {l:'Habilitations',v:'4',i:'⬟',c:'#ef4444',sub:'CACES à renouveler'},
              {l:'Conformité',v:'95%',i:'✓',c:'#10b981',sub:'certifications'}
            ]
          };
          const kpis = KPI_DATA[svcKey];
          const chantierList = svcKey === 'ezel_execution' ? CHANTIERS_EXEC : svcKey === 'ezel_preparation' ? CHANTIERS_PREP : null;
          const isMonday = ['ezel_etudes_prix','ezel_execution','ezel_preparation','ezel_cloture'].includes(svcKey);
          if (!kpis) {
            return (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',textAlign:'center'}}>
                <div style={{fontSize:'2.5rem',marginBottom:16}}>▦</div>
                <div style={{fontWeight:700,color:$text,fontSize:'1rem',marginBottom:8}}>Tableau de bord en cours de configuration</div>
                <div style={{color:$textMut,fontSize:'0.82rem',maxWidth:320}}>{svcIcon} {svcLabel} — Les indicateurs seront disponibles prochainement.</div>
              </div>
            );
          }
          const sStatut = (s) => {
            if (s === 'Travaux en cours') return {bg:'#10b981',tx:'#fff'};
            if (s === 'Travaux suspendus') return {bg:'#f59e0b',tx:'#fff'};
            if (s === 'OS Reçu') return {bg:'#3b82f6',tx:'#fff'};
            return {bg:'#888',tx:'#fff'};
          };
          return (
            <div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,paddingBottom:12,borderBottom:`1px solid ${$border}`}}>
                <div>
                  <h2 style={{fontSize:'1.15rem',fontWeight:800,color:$text,margin:0}}>{svcIcon} {svcLabel}</h2>
                  <div style={{fontSize:'0.76rem',color:$textMut,marginTop:3}}>{entrepriseNom} — Indicateurs clés</div>
                </div>
                <div style={{fontSize:'0.68rem',color:$textMut,background:$bgSub,padding:'4px 10px',borderRadius:6,border:`1px solid ${$border}`}}>
                  {isMonday ? '🟢 Monday.com' : '▦ Estimées'} · Mars 2026
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',marginBottom:16,margin:'0 8px 16px'}}>
                {kpis.map((k, idx) => (
                  <div key={idx} style={{padding:'18px 20px',borderRight:idx<3?`1px solid ${$border}`:'none'}}>
                    <div style={{fontSize:'0.67rem',color:$textSec,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>{k.l}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:4}}>
                      <span style={{fontSize:'1.9rem',fontWeight:800,color:k.c,lineHeight:1,letterSpacing:'-0.03em'}}>{k.v}</span>
                      <span style={{fontSize:'1.1rem'}}>{k.i}</span>
                    </div>
                    {k.sub && <div style={{fontSize:'0.69rem',color:$textMut,lineHeight:1.4}}>{k.sub}</div>}
                  </div>
                ))}
              </div>
              {svcKey === 'ezel_etudes_prix' && (() => {
                const aoUrgDash = aoActifs.filter(a => { if(!a.d) return false; const dl=Math.ceil((new Date(a.d)-new Date())/86400000); return dl>=0&&dl<=7; });
                const aoSemDash = aoActifs.filter(a => { if(!a.d) return false; const dl=Math.ceil((new Date(a.d)-new Date())/86400000); return dl>7&&dl<=21; });
                const statDist2 = [
                  {l:'À Préparer',v:AO_RAW.filter(a=>a.s==='À Préparer').length,c:'#64748b'},
                  {l:'En préparation',v:AO_RAW.filter(a=>a.s==='En préparation').length,c:ACC},
                  {l:'Visite à planifier',v:AO_RAW.filter(a=>['Visite rdv à prendre','Visite rdv pris'].includes(a.s)).length,c:'#0284c7'},
                  {l:'En attente réponse',v:AO_RAW.filter(a=>a.s==='En attente de Réponse').length,c:'#ea580c'},
                  {l:'Gagnés',v:aoGagnes.length,c:'#059669'},
                  {l:'Perdus/archivés',v:aoPerdus.length,c:'#dc2626'},
                ];
                const maxDist2 = Math.max(...statDist2.map(s=>s.v),1);
                const fmtDDash = (d) => { if(!d) return '—'; const p=d.split('-'); return p[2]+'/'+p[1]+'/'+p[0].slice(2); };
                const dlLeftDash = (d) => { if(!d) return null; return Math.ceil((new Date(d)-new Date())/86400000); };
                return (<>
                  {aoUrgDash.length > 0 && (
                    <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:crmRd,margin:'0 8px 14px',padding:'12px 14px'}}>
                      <div style={{fontWeight:700,color:'#dc2626',fontSize:'0.82rem',marginBottom:8}}>▲ AO urgents — deadline dans les 7 jours ({aoUrgDash.length})</div>
                      <div style={{display:'flex',flexDirection:'column',gap:5}}>
                        {aoUrgDash.map((a,i) => { const dl=dlLeftDash(a.d); const ext=getExt(a.id); const resp=(ext.r||'David LEMAIRE').split(',')[0].trim(); return (
                          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',background:'#fff',borderRadius:crmRd,border:'1px solid #fecaca'}}>
                            <div style={{fontSize:'0.77rem',fontWeight:600,color:'#111',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginRight:8}}>{a.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,55)}</div>
                            <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                              <span style={{fontSize:'0.68rem',color:'#6b7280',whiteSpace:'nowrap'}}>{resp.split(' ')[1]||resp}</span>
                              <span style={{fontSize:'0.74rem',fontWeight:700,color:'#dc2626',background:'#fee2e2',padding:'2px 7px',borderRadius:8}}>{dl===0?"Aujourd'hui !":dl+'j'}</span>
                              <span style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 6px',borderRadius:4,background:'#bca58a22',color:'#64748b'}}>{a.s}</span>
                              {ext.drive && <a href={ext.drive} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:'0.68rem',color:'#1a73e8',textDecoration:'none',padding:'2px 6px',borderRadius:4,background:'#1a73e810',border:'1px solid #1a73e820',whiteSpace:'nowrap'}}>▸ Drive</a>}
                              <a href={"https://ezel-batiment.monday.com/boards/6470581185/views/159052052/item/"+a.id} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:'0.68rem',color:'#0073ea',textDecoration:'none',padding:'2px 6px',borderRadius:4,background:'#0073ea10',border:'1px solid #0073ea20',whiteSpace:'nowrap'}}>↗ Monday</a>
                            </div>
                          </div>
                        );})}
                      </div>
                    </div>
                  )}
                  {aoSemDash.length > 0 && aoUrgDash.length === 0 && (
                    <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:crmRd,margin:'0 8px 14px',padding:'10px 14px'}}>
                      <div style={{fontWeight:700,color:'#d97706',fontSize:'0.82rem',marginBottom:6}}>▲ AO à délai serré — deadline dans les 21 jours ({aoSemDash.length})</div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                        {aoSemDash.map((a,i) => { const dl=dlLeftDash(a.d); return (
                          <div key={i} style={{padding:'4px 8px',background:'#fff',border:'1px solid #fde68a',borderRadius:crmRd,display:'flex',alignItems:'center',gap:5}}>
                            <span style={{fontSize:'0.74rem',fontWeight:600,color:'#111',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,35)}</span>
                            <span style={{fontSize:'0.72rem',fontWeight:700,color:'#d97706'}}>{dl}j · {fmtDDash(a.d)}</span>
                          </div>
                        );})}
                      </div>
                    </div>
                  )}
                  <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,margin:'0 8px 14px',overflow:'hidden'}}>
                    <div style={{padding:'10px 16px',borderBottom:`1px solid ${$border}`,background:$bgSub,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{fontWeight:700,color:$text,fontSize:'0.82rem'}}>▦ Répartition par statut — AO actifs</div>
                      <div style={{fontSize:'0.68rem',fontWeight:600,color:acc}}>{AO_RAW.length} AO total · Board Monday</div>
                    </div>
                    <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:7}}>
                      {statDist2.filter(s=>s.v>0).map((s,i) => (
                        <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:110,fontSize:'0.74rem',color:$textSec,textAlign:'right',flexShrink:0}}>{s.l}</div>
                          <div style={{flex:1,height:14,background:$bgSub,borderRadius:3,overflow:'hidden'}}>
                            <div style={{height:'100%',width:Math.round(s.v/maxDist2*100)+'%',background:s.c,borderRadius:3,transition:'width 0.5s',minWidth:s.v>0?6:0}}></div>
                          </div>
                          <span style={{width:22,textAlign:'right',fontWeight:700,fontSize:'0.76rem',color:s.c,flexShrink:0}}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Visites à planifier */}
                  {(() => {
                    const visitAOs = aoActifs.filter(a => {
                      const s = (a.s||'').toLowerCase();
                      return s.includes('visite rdv') || s.includes('visite demand');
                    });
                    if (visitAOs.length === 0) return null;
                    return (
                      <div style={{background:$bgCard,borderRadius:crmRd,border:'1px solid #f59e0b33',margin:'0 8px 14px',overflow:'hidden'}}>
                        <div style={{padding:'10px 16px',borderBottom:'1px solid #f59e0b22',background:'#f59e0b08',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                          <div style={{fontWeight:700,color:'#d97706',fontSize:'0.82rem'}}>◆ Visites terrain à planifier ({visitAOs.length})</div>
                          <div style={{fontSize:'0.68rem',color:'#d97706',fontWeight:600}}>Action requise</div>
                        </div>
                        <div style={{padding:'10px 14px',display:'flex',flexDirection:'column',gap:6}}>{visitAOs.map((a,i)=>{
                          const dl=dlLeftDash(a.d);
                          const ext=getExt(a.id);
                          const resp=(ext.r||'').split(',')[0].trim();
                          return (
                            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 10px',background:$bgSub,borderRadius:crmRd,border:'1px solid '+$border}}>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontSize:'0.76rem',fontWeight:600,color:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,50)}</div>
                                <div style={{fontSize:'0.67rem',color:$textMut,marginTop:1}}>{a.m} · {resp}</div>
                              </div>
                              <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0,marginLeft:8}}>
                                <span style={{padding:'2px 7px',borderRadius:8,background:a.s.includes('problématique')?'#dc262618':'#66ccff22',color:a.s.includes('problématique')?'#dc2626':'#0284c7',fontSize:'0.68rem',fontWeight:700}}>{a.s}</span>
                                {ext.vo==='Oui'&&<span style={{padding:'2px 6px',borderRadius:4,background:'#dc262612',color:'#dc2626',fontSize:'0.65rem',fontWeight:700}}>OBL</span>}
                                {dl!==null&&<span style={{padding:'2px 6px',borderRadius:4,background:dl<=7?'#dc262612':'#f59e0b12',color:dl<=7?'#dc2626':'#d97706',fontSize:'0.68rem',fontWeight:700}}>J-{dl}</span>}
                                {ext.drive&&<a href={ext.drive} target="_blank" rel="noreferrer" style={{padding:'2px 6px',borderRadius:4,background:'#1a73e810',color:'#1a73e8',fontSize:'0.65rem',textDecoration:'none',border:'1px solid #1a73e820'}}>▸</a>}
                              </div>
                            </div>
                          );
                        })}</div>
                      </div>
                    );
                  })()}
                </>);
              })()}
              {/* ── IDs ACTIFS ── */}
              {(()=>{
                const dosActifs = aoActifs.filter(a=>getDosId(a.id));
                const affActifs = AO_RAW.filter(a=>getAffId(a.id));
                if(dosActifs.length===0&&affActifs.length===0) return null;
                return (
                  <div style={{background:$bgCard,borderRadius:crmRd,border:'1px solid #007ab533',margin:'0 8px 14px',overflow:'hidden'}}>
                    <div style={{padding:'10px 16px',borderBottom:'1px solid #007ab522',background:'#007ab508',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{fontWeight:700,color:'#007ab5',fontSize:'0.82rem'}}>⌗ Référentiels ID Group OY</div>
                      <div style={{display:'flex',gap:8}}>
                        <span style={{fontSize:'0.68rem',fontWeight:700,padding:'2px 8px',borderRadius:8,background:'#007ab515',color:'#007ab5'}}>DOS {dosActifs.length}</span>
                        <span style={{fontSize:'0.68rem',fontWeight:700,padding:'2px 8px',borderRadius:8,background:'#05966915',color:'#059669'}}>AFF {affActifs.length}</span>
                      </div>
                    </div>
                    <div style={{padding:'10px 14px',display:'flex',flexDirection:'column',gap:4}}>
                      {[...dosActifs.map(a=>({...a,intId:getDosId(a.id),type:'dos'})), ...affActifs.map(a=>({...a,intId:getAffId(a.id),type:'aff'}))].slice(0,8).map((a,i)=>(
                        <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 8px',background:$bgSub,borderRadius:crmRd,border:'1px solid '+$border}}>
                          <span style={{fontSize:'0.72rem',fontWeight:800,fontFamily:"'Courier New',monospace",color:a.type==='aff'?'#059669':'#007ab5',flexShrink:0,minWidth:110}}>{a.intId}</span>
                          <span style={{fontSize:'0.73rem',color:$text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.n.replace(/^\d{4}\.\d{2}\.\d{2} - /,'').slice(0,45)}</span>
                          <span style={{fontSize:'0.65rem',color:$textMut,flexShrink:0}}>{a.m}</span>
                        </div>
                      ))}
                      {(dosActifs.length+affActifs.length)>8&&<div style={{fontSize:'0.67rem',color:$textMut,textAlign:'center',paddingTop:4}}>+{dosActifs.length+affActifs.length-8} autres — voir Suivi Dossiers</div>}
                    </div>
                  </div>
                );
              })()}

              {chantierList && (
                <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,margin:'0 8px 14px',overflow:'hidden'}}>
                  <div style={{padding:'10px 16px',borderBottom:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:$bgSub}}>
                    <div style={{fontWeight:700,color:$text,fontSize:'0.82rem'}}>
                      {svcKey==='ezel_execution'?'◆ Chantiers Phase 3 — Exécution':'☰ Chantiers Phase 2 — Préparation'}
                    </div>
                    <div style={{fontSize:'0.68rem',fontWeight:600,color:acc}}>{chantierList.length} chantiers · Board Monday</div>
                  </div>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
                    <thead>
                      <tr style={{background:$bgSub}}>
                        <th style={{padding:'7px 14px',textAlign:'left',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`,width:54}}>Code</th>
                        <th style={{padding:'7px 14px',textAlign:'left',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`}}>Affaire</th>
                        <th style={{padding:'7px 14px',textAlign:'left',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`,width:160}}>Ville</th>
                        <th style={{padding:'7px 14px',textAlign:'right',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`,width:90}}>Marché HT</th>
                        <th style={{padding:'7px 14px',textAlign:'left',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`,width:100}}>Resp.</th>
                        <th style={{padding:'7px 14px',textAlign:'center',fontWeight:700,color:$textSec,fontSize:'0.66rem',textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${$border}`,width:130}}>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chantierList.map((c, idx) => {
                        const st = sStatut(c.statut);
                        return (
                          <tr key={idx} style={{borderBottom:`1px solid ${$border}`}}
                            onMouseEnter={e => e.currentTarget.style.background=$bgSub}
                            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                            <td style={{padding:'9px 14px',color:acc,fontWeight:700,fontFamily:'monospace',fontSize:'0.74rem'}}>{c.code}</td>
                            <td style={{padding:'9px 14px',color:$text,fontWeight:500}}>{c.nom}</td>
                            <td style={{padding:'9px 14px',color:$textMut,fontSize:'0.74rem'}}>{c.ville}</td>
                            <td style={{padding:'9px 14px',textAlign:'right',color:$text,fontWeight:600,fontFamily:'monospace',fontSize:'0.74rem'}}>{c.ca?fmtEuro(c.ca):'—'}</td>
                            <td style={{padding:'9px 14px',color:$textMut,fontSize:'0.73rem'}}>{c.resp}</td>
                            <td style={{padding:'9px 14px',textAlign:'center'}}>
                              <span style={{display:'inline-block',padding:'3px 9px',borderRadius:4,fontSize:'0.67rem',fontWeight:700,background:st.bg,color:st.tx}}>{c.statut}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'12px 16px'}}>
                <div style={{fontWeight:700,color:$textSec,fontSize:'0.67rem',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>Navigation rapide</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {(svcConfig?.modules||[]).filter(m=>m.id!=='kpi_dashboard').map((m,idx)=>(
                    <button key={idx} onClick={()=>setOngletActif(m.id)} style={{background:$bgSub,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'5px 12px',fontSize:'0.76rem',color:$text,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}
                      onMouseEnter={e=>{e.currentTarget.style.background=acc+'18';e.currentTarget.style.borderColor=acc;e.currentTarget.style.color=acc;}}
                      onMouseLeave={e=>{e.currentTarget.style.background=$bgSub;e.currentTarget.style.borderColor=$border;e.currentTarget.style.color=$text;}}>
                      <span style={{fontSize:'0.82rem'}}>{m.icon}</span><span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
}
