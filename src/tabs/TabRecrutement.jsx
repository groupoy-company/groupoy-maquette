// === Onglet « recrutement » — extrait de App.jsx (modularisation, forme iife) ===
import { Search } from 'lucide-react';

export default function TabRecrutement(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, candidats, chantiers, crmRd, currentUser, empNom, filiales, filialesDynamiques, grille, postes, recruAddingFichier, recruBulkSel, recruCompare, recruCvParsing, recruCvPaste, recruDetail, recruDetailTab, recruDrag, recruEdit, recruFichierType, recruFichierUrl, recruFileViewer, recruFilter, recruIaLoading, recruIaResult, recruLinkedinUrl, recruNewFichier, recruNewMode, recruOffreIaLoading, recruOffreIaResult, recruSearch, recruSettingsOpen, recruView, setCandidats, setObEdit, setOngletActif, setPosteSelectionne, setPostes, setRecruAddingFichier, setRecruBulkSel, setRecruCompare, setRecruCvParsing, setRecruCvPaste, setRecruDetail, setRecruDetailTab, setRecruDrag, setRecruEdit, setRecruFichierType, setRecruFichierUrl, setRecruFileViewer, setRecruFilter, setRecruIaLoading, setRecruIaResult, setRecruLinkedinUrl, setRecruNewFichier, setRecruNewMode, setRecruOffreIaLoading, setRecruOffreIaResult, setRecruSearch, setRecruSettingsOpen, setRecruView, showBorderAccent } = __props;
        // ═══ ATS PIPELINE — TEAMTAILOR-STYLE ═══
        const RECRU_ETAPES = [
          {id:'nouveau',label:'Nouveau',color:'#8b5cf6',icon:'🆕',desc:'Candidature reçue'},
          {id:'a_analyser',label:'À analyser',color:'#a855f7',icon:'☰',desc:'CV en attente de review'},
          {id:'preselection',label:'Présélection',color:'#f59e0b',icon:'⌕',desc:'Analyse CV & profil'},
          {id:'entretien_1',label:'1er Entretien',color:'#f97316',icon:'🗣️',desc:'Entretien téléphonique ou visio'},
          {id:'entretien_2',label:'2ème Entretien',color:'#ef4444',icon:'🤝',desc:'Entretien physique'},
          {id:'test',label:'Test / Référence',color:'#ec4899',icon:'✎',desc:'Test technique ou prise de références'},
          {id:'proposition',label:'Proposition',color:'#10b981',icon:'▫',desc:'Promesse d\'embauche'},
          {id:'embauche',label:'Embauché',color:'#059669',icon:'✓',desc:'Intégration en cours'},
          {id:'refuse',label:'Refusé',color:$textSec,icon:'✕',desc:'Candidature refusée'},
          {id:'reserve',label:'Vivier',color:'#0ea5e9',icon:'💎',desc:'Candidat en réserve pour plus tard'}
        ];
        const SOURCES = ['Indeed','LinkedIn','Pôle Emploi','APEC','Spontanée','Cooptation','Cabinet','Site carrière','Facebook','Autre'];
        const SCORE_CRITERES = [
          {id:'competence_technique',label:'Compétences techniques',poids:3},
          {id:'experience',label:'Expérience secteur BTP',poids:2},
          {id:'motivation',label:'Motivation & attitude',poids:2},
          {id:'communication',label:'Communication',poids:1},
          {id:'disponibilite',label:'Disponibilité',poids:1},
          {id:'pretention_salariale',label:'Prétention salariale',poids:1}
        ];
        const rcKey = 'oy_recrutement';
        const defaultCandidats = [
          {id:'C001',nom:'Martin Dubois',prenom:'Martin',nomFamille:'Dubois',poste:'Chef de chantier',filiale:'Ezel Bâtiment',etape:'entretien_1',priorite:'Haute',dateCandidat:'2026-01-15',email:'m.dubois@email.com',tel:'+33612345678',source:'Indeed',notes:'10 ans expérience BTP gros œuvre. CACES 1-3-5. Ancien chef chez Bouygues.',evaluation:4,pretentionSalariale:42000,disponibilite:'Immédiate',villeCandidat:'Strasbourg',linkedin:'',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:4,commentaire:'CACES multiples, 10 ans GO'},{criteriaId:'experience',note:5,commentaire:'Bouygues, Eiffage — très solide'},{criteriaId:'motivation',note:4,commentaire:'Très motivé, veut PME'},{criteriaId:'communication',note:3,commentaire:'Correct mais réservé'},{criteriaId:'disponibilite',note:5,commentaire:'Préavis terminé'},{criteriaId:'pretention_salariale',note:3,commentaire:'42k€ — dans la fourchette haute'}],
            entretiens:[{id:'E001',date:'2026-02-05',heure:'10:00',type:'visio',intervieweur:'EMP014',statut:'fait',notes:'Profil très intéressant. Connaît bien les chantiers GO. À convoquer en physique.',note:4}],
            photoUrl:'',fichiers:[{id:'F001',type:'cv',nom:'CV_Martin_Dubois_2026.pdf',date:'2026-01-15'},{id:'F002',type:'capture',nom:'Capture_LinkedIn_Dubois.png',date:'2026-01-16'}],timeline:[{date:'2026-01-15',action:'Candidature reçue via Indeed'},{date:'2026-01-18',action:'CV analysé — profil retenu'},{date:'2026-02-01',action:'Convocation entretien visio envoyée'},{date:'2026-02-05',action:'1er entretien réalisé — positif'}]
          },
          {id:'C002',nom:'Sophie Laurent',prenom:'Sophie',nomFamille:'Laurent',poste:'Comptable',filiale:'YILMAZ SAS',etape:'proposition',priorite:'Haute',dateCandidat:'2026-01-20',email:'s.laurent@email.com',tel:'+33623456789',source:'LinkedIn',notes:'DCG + 5 ans cabinet. Connait Pennylane et Sage. Références vérifiées.',evaluation:5,pretentionSalariale:36000,disponibilite:'1 mois',villeCandidat:'Colmar',linkedin:'linkedin.com/in/sophie-laurent',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:5,commentaire:'DCG, Pennylane, Sage — parfait'},{criteriaId:'experience',note:4,commentaire:'Cabinet comptable, pas BTP directement'},{criteriaId:'motivation',note:5,commentaire:'Très motivée par la PME'},{criteriaId:'communication',note:5,commentaire:'Excellente'},{criteriaId:'disponibilite',note:4,commentaire:'1 mois de préavis'},{criteriaId:'pretention_salariale',note:5,commentaire:'36k€ — parfait'}],
            entretiens:[{id:'E002',date:'2026-02-10',heure:'14:00',type:'physique',intervieweur:'EMP003',statut:'fait',notes:'Entretien excellent. Sophie connait bien la compta BTP. Proposition à envoyer.',note:5},{id:'E003',date:'2026-02-18',heure:'11:00',type:'physique',intervieweur:'EMP001',statut:'fait',notes:'Validée par la direction. Promesse à préparer.',note:5}],
            photoUrl:'',fichiers:[{id:'F003',type:'cv',nom:'CV_Sophie_Laurent.pdf',date:'2026-01-20'},{id:'F004',type:'lettre',nom:'Lettre_motivation_Laurent.pdf',date:'2026-01-20'}],timeline:[{date:'2026-01-20',action:'Candidature via LinkedIn'},{date:'2026-01-25',action:'Entretien téléphonique — très bien'},{date:'2026-02-10',action:'Entretien physique avec DAF'},{date:'2026-02-18',action:'Entretien direction — validée'},{date:'2026-02-25',action:'Promesse d\'embauche en cours'}]
          },
          {id:'C003',nom:'Karim Benali',prenom:'Karim',nomFamille:'Benali',poste:'Monteur échafaudeur',filiale:"L'Échafaudage",etape:'a_analyser',priorite:'Moyenne',dateCandidat:'2026-02-01',email:'k.benali@email.com',tel:'+33634567890',source:'Pôle Emploi',notes:'Formation R408 Montage/Démontage. 3 ans expérience.',evaluation:3,pretentionSalariale:28000,disponibilite:'Immédiate',villeCandidat:'Mulhouse',linkedin:'',motifRefus:'',scorecard:[],entretiens:[],
            photoUrl:'',fichiers:[],timeline:[{date:'2026-02-01',action:'Candidature via Pôle Emploi'}]
          },
          {id:'C004',nom:'Émilie Roche',prenom:'Émilie',nomFamille:'Roche',poste:'Assistante administrative',filiale:'YILMAZ SAS',etape:'preselection',priorite:'Basse',dateCandidat:'2026-02-05',email:'e.roche@email.com',tel:'+33645678901',source:'Spontanée',notes:'BTS Gestion PME. Maîtrise Google Workspace + Monday.com.',evaluation:3,pretentionSalariale:26000,disponibilite:'2 semaines',villeCandidat:'Strasbourg',linkedin:'linkedin.com/in/emilie-roche',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:3,commentaire:'BTS, bureautique OK'},{criteriaId:'experience',note:2,commentaire:'Pas d\'expérience BTP'},{criteriaId:'motivation',note:4,commentaire:'Enthousiaste'},{criteriaId:'communication',note:4,commentaire:'Bonne présentation'},{criteriaId:'disponibilite',note:5,commentaire:'2 semaines'},{criteriaId:'pretention_salariale',note:5,commentaire:'26k€ — budget respecté'}],
            entretiens:[],
            photoUrl:'',fichiers:[],timeline:[{date:'2026-02-05',action:'Candidature spontanée reçue'},{date:'2026-02-08',action:'CV analysé — présélection'}]
          },
          {id:'C005',nom:'Pierre Moreau',prenom:'Pierre',nomFamille:'Moreau',poste:'Conducteur PL',filiale:'La Roulotte',etape:'nouveau',priorite:'Moyenne',dateCandidat:'2026-02-10',email:'p.moreau@email.com',tel:'+33656789012',source:'Indeed',notes:'Permis C + FIMO + ADR. 8 ans expérience transport.',evaluation:0,pretentionSalariale:30000,disponibilite:'Immédiate',villeCandidat:'Haguenau',linkedin:'',motifRefus:'',scorecard:[],entretiens:[],
            photoUrl:'',fichiers:[],timeline:[{date:'2026-02-10',action:'Candidature reçue via Indeed'}]
          },
          {id:'C006',nom:'Ahmed Khelifi',prenom:'Ahmed',nomFamille:'Khelifi',poste:'Maçon qualifié',filiale:'Ezel Bâtiment',etape:'entretien_2',priorite:'Haute',dateCandidat:'2026-01-08',email:'a.khelifi@email.com',tel:'+33667890123',source:'Cooptation',notes:'Coopté par Vitor Da Silva. Spécialiste enduit/ravalement. CACES nacelle.',evaluation:4,pretentionSalariale:32000,disponibilite:'1 mois',villeCandidat:'Strasbourg',linkedin:'',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:5,commentaire:'Enduit, ravalement, carrelage — polyvalent'},{criteriaId:'experience',note:4,commentaire:'7 ans chantier'},{criteriaId:'motivation',note:4,commentaire:'Coopté — bonne recommandation'},{criteriaId:'communication',note:3,commentaire:'Français correct, turcophone'},{criteriaId:'disponibilite',note:3,commentaire:'1 mois préavis'},{criteriaId:'pretention_salariale',note:4,commentaire:'32k€ — OK'}],
            entretiens:[{id:'E004',date:'2026-01-25',heure:'09:00',type:'tel',intervieweur:'EMP014',statut:'fait',notes:'Très bon profil technique. À rencontrer.',note:4},{id:'E005',date:'2026-02-12',heure:'14:00',type:'physique',intervieweur:'EMP010',statut:'planifie',notes:'',note:0}],
            photoUrl:'',fichiers:[],timeline:[{date:'2026-01-08',action:'Cooptation par Vitor Da Silva'},{date:'2026-01-12',action:'CV analysé — excellent profil'},{date:'2026-01-25',action:'Entretien téléphonique — validé'},{date:'2026-02-12',action:'2ème entretien physique planifié'}]
          },
          {id:'C007',nom:'Fatima Bouziane',prenom:'Fatima',nomFamille:'Bouziane',poste:'Chargée RH',filiale:'YILMAZ SAS',etape:'refuse',priorite:'Moyenne',dateCandidat:'2025-12-15',email:'f.bouziane@email.com',tel:'+33678901234',source:'APEC',notes:'Master RH. 4 ans expérience mais pas BTP.',evaluation:2,pretentionSalariale:38000,disponibilite:'3 mois',villeCandidat:'Paris',linkedin:'linkedin.com/in/fatima-bouziane',motifRefus:'Prétentions salariales trop élevées + localisation géographique',scorecard:[],entretiens:[],
            photoUrl:'',fichiers:[],timeline:[{date:'2025-12-15',action:'Candidature APEC'},{date:'2025-12-22',action:'Refusée — salaire + localisation'}]
          },
          {id:'C008',nom:'Julien Mercier',prenom:'Julien',nomFamille:'Mercier',poste:'Conducteur de travaux',filiale:'Ezel Bâtiment',etape:'reserve',priorite:'Haute',dateCandidat:'2025-11-20',email:'j.mercier@email.com',tel:'+33689012345',source:'Cabinet',notes:'ESTP diplômé. 6 ans expérience TCE chez Vinci. Excellent mais pas dispo avant sept.',evaluation:5,pretentionSalariale:48000,disponibilite:'Septembre 2026',villeCandidat:'Lyon',linkedin:'linkedin.com/in/julien-mercier-ct',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:5,commentaire:'ESTP, TCE complet'},{criteriaId:'experience',note:5,commentaire:'Vinci 6 ans'},{criteriaId:'motivation',note:4,commentaire:'Intéressé mais prend son temps'},{criteriaId:'communication',note:5,commentaire:'Excellent'},{criteriaId:'disponibilite',note:1,commentaire:'Pas avant septembre'},{criteriaId:'pretention_salariale',note:3,commentaire:'48k€ — élevé mais justifié'}],
            entretiens:[{id:'E006',date:'2025-12-10',heure:'17:00',type:'visio',intervieweur:'EMP001',statut:'fait',notes:'Profil exceptionnel. Dommage pour la dispo. À garder dans le vivier.',note:5}],
            photoUrl:'',fichiers:[],timeline:[{date:'2025-11-20',action:'Présenté par cabinet Michael Page'},{date:'2025-12-10',action:'Entretien visio direction'},{date:'2025-12-15',action:'Mis en vivier — dispo septembre'}]
          },
          {id:'C009',nom:'Nadia Ferreira',prenom:'Nadia',nomFamille:'Ferreira',poste:'Chargée de clientèle',filiale:"L'Étanchéité",etape:'entretien_1',priorite:'Haute',dateCandidat:'2026-02-20',email:'n.ferreira@email.com',tel:'+33691234567',source:'LinkedIn',notes:'BTS Négociation + 4 ans expérience B2B. Connait le secteur couverture/étanchéité. Permis B, véhiculée.',evaluation:4,pretentionSalariale:34000,disponibilite:'3 semaines',villeCandidat:'Metz',adresse:'12 rue des Tilleuls, 57000 Metz',dateNaissance:'1993-09-11',nationalite:'Franco-portugaise',permis:'B',formations:'BTS Négociation Relation Client — Lycée Poincaré Metz (2015)',langues:'Français (natif), Portugais (bilingue), Anglais (B2)',linkedin:'linkedin.com/in/nadia-ferreira-btp',motifRefus:'',
            scorecard:[{criteriaId:'competence_technique',note:4,commentaire:'Bonne connaissance secteur couverture'},{criteriaId:'experience',note:4,commentaire:'4 ans B2B BTP — solide'},{criteriaId:'motivation',note:5,commentaire:'Très motivée par Étanchéité'},{criteriaId:'communication',note:5,commentaire:'Excellente communicante'},{criteriaId:'disponibilite',note:4,commentaire:'3 semaines — rapide'},{criteriaId:'pretention_salariale',note:4,commentaire:'34k€ — correct pour le profil'}],
            entretiens:[{id:'E007',date:'2026-03-05',heure:'11:00',type:'visio',intervieweur:'EMP016',statut:'fait',notes:'Entretien très positif. Connait bien les produits Sika et Soprema. À convoquer en physique.',note:4}],
            photoUrl:'',fichiers:[{id:'F010',type:'cv',nom:'CV_Nadia_Ferreira_2026.pdf',date:'2026-02-20'}],timeline:[{date:'2026-02-20',action:'Candidature LinkedIn'},{date:'2026-02-24',action:'CV analysé — profil retenu'},{date:'2026-03-05',action:'1er entretien visio — très positif'}]
          }
        ];
        const activeCandidats = candidats || defaultCandidats;
        const saveCands = (d) => { setCandidats(d); };
        const prioC = (p) => p==='Haute'?'#dc2626':p==='Moyenne'?$warn:'#3b82f6';
        const starsR = (n) => '★'.repeat(n||0) + '☆'.repeat(5-(n||0));
        const daysSinceActivity = (c) => {
          const last = (c.timeline||[]).slice().sort((a,b)=>b.date.localeCompare(a.date))[0];
          const lastDate = last ? new Date(last.date) : new Date(c.dateCandidat||'2026-01-01');
          return Math.floor((Date.now()-lastDate.getTime())/(1000*60*60*24));
        };
        const needsRelance = (c) => !['refuse','reserve','embauche'].includes(c.etape) && daysSinceActivity(c) >= 7;
        const filt = (() => {
          let result = recruFilter === 'all' ? activeCandidats : activeCandidats.filter(c => c.filiale === recruFilter);
          if (recruSearch) result = result.filter(c => `${c.nom} ${c.poste} ${c.filiale} ${c.source}`.toLowerCase().includes(recruSearch.toLowerCase()));
          return result;
        })();
        const uniqFil = [...new Set(activeCandidats.map(c => c.filiale))];
        const pipelineEtapes = RECRU_ETAPES.filter(e => !['refuse','reserve'].includes(e.id));
        const totalActifs = activeCandidats.filter(c => !['refuse','reserve','embauche'].includes(c.etape)).length;
        const calcScore = (sc) => {
          if (!sc || sc.length === 0) return 0;
          let total = 0, poids = 0;
          sc.forEach(s => { const cr = SCORE_CRITERES.find(c => c.id === s.criteriaId); if (cr) { total += s.note * cr.poids; poids += cr.poids * 5; }});
          return poids > 0 ? Math.round(total / poids * 100) : 0;
        };
        const scoreColor = (pct) => pct >= 80 ? $success : pct >= 60 ? $warn : pct >= 40 ? '#f97316' : $danger;
        const openDetail = (c) => { setRecruDetail(c.id); setRecruDetailTab('profil'); };
        const sel = recruDetail ? activeCandidats.find(c => c.id === recruDetail) : null;

        // Map candidate poste to onboarding posteType
        const mapPosteToObType = (poste) => {
          const p = (poste||'').toLowerCase();
          if (p.includes('directeur') || p.includes('direction') || p.includes('cadre') || p.includes('dg') || p.includes('pdg') || p.includes('responsable d\'agence')) return 'direction';
          if (p.includes('conducteur') || p.includes('étude') || p.includes('bureau')) return 'conducteur_travaux';
          if (p.includes('chargé') || p.includes('affaire') || p.includes('commercial')) return 'charge_affaires';
          if (p.includes('chef') && (p.includes('chantier') || p.includes('équipe') || p.includes('groupe'))) return 'chef_chantier';
          if (p.includes('assistant') || p.includes('admin') || p.includes('comptable') || p.includes('rh') || p.includes('secrétaire') || p.includes('gestion')) return 'assistante_admin';
          return 'ouvrier_btp';
        };
        const launchOnboarding = (cand) => {
          const obType = mapPosteToObType(cand.poste);
          const obChecklists = {ouvrier_btp:0,chef_chantier:1,charge_affaires:2,conducteur_travaux:3,assistante_admin:4,direction:5};
          setOngletActif('onboarding');
          setTimeout(() => {
            setObEdit({
              id: 'OB-' + String(Date.now()).slice(-6),
              employeId: null,
              collaborateur: cand.nom || '',
              filialeId: typeof cand.filiale === 'string' ? (cand.filiale.includes('Ezel') ? 3 : cand.filiale.includes('Roulotte') ? 1 : cand.filiale.includes('Échafaudage') ? 2 : cand.filiale.includes('Étanchéité') ? 6 : 'yilmaz') : 3,
              filiale: cand.filiale || 'Ezel Bâtiment',
              poste: cand.poste || '',
              posteType: obType,
              dateEntree: new Date().toISOString().slice(0, 10),
              tuteur: '',
              periodeEssai: '',
              statut: 'planifie',
              candidatId: cand.id,
              email: cand.email || '',
              tel: cand.tel || '',
              checklist: []
            });
          }, 100);
          // Update candidate timeline
          saveCands(activeCandidats.map(c2 => c2.id === cand.id ? {...c2, timeline: [...(c2.timeline||[]), {date: new Date().toISOString().slice(0,10), action: 'Onboarding lancé'}]} : c2));
        };

                return (<div style={{display:'flex',gap:0,height:recruDetail?'calc(100vh - 140px)':'auto'}}>
          {/* ═══ LEFT: MAIN CONTENT ═══ */}
          <div style={{flex:1,minWidth:0,overflow:recruDetail?'auto':'visible'}}>
          {/* ── HEADER SHOWCASE ── */}
          <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
            <div style={{height:3,background:`linear-gradient(90deg,${$accent} 0%,${$accent}80 100%)`}}/>
            <div style={{padding:'14px 20px'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:10,background:$accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>◎</div>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                      <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Pipeline Recrutement</h2>
                      {activeCandidats.filter(c=>c.etape==='entretien_rh'||c.etape==='entretien_tech').length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:$accent+'15',color:$accent,fontWeight:700,border:`1px solid ${$accent}30`}}>{activeCandidats.filter(c=>c.etape==='entretien_rh'||c.etape==='entretien_tech').length} entretiens</span>}
                      {activeCandidats.filter(c=>c.etape==='embauche').length>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#10b98115',color:'#059669',fontWeight:700,border:'1px solid #10b98130'}}>{activeCandidats.filter(c=>c.etape==='embauche').length} embauché{activeCandidats.filter(c=>c.etape==='embauche').length>1?'s':''}</span>}
                    </div>
                    <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>{totalActifs} candidature{totalActifs>1?'s':''} · {postes.filter(p=>['ouvert','recrutement','a_creer'].includes(p.statut)).length} poste{postes.filter(p=>['ouvert','recrutement','a_creer'].includes(p.statut)).length>1?'s':''} ouvert{postes.filter(p=>['ouvert','recrutement','a_creer'].includes(p.statut)).length>1?'s':''}</p>
                  </div>
                </div>
                <button onClick={() => setRecruNewMode('choose')} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:$accent,fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  + Candidat
                </button>
              </div>
              <div style={{display:'flex',gap:16,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                {(()=>{const stepsKpi=[{id:'cv',l:'CV reçus'},{id:'entretien_rh',l:'RH'},{id:'entretien_tech',l:'Technique'},{id:'proposition',l:'Proposition'},{id:'embauche',l:'Embauchés'}];return stepsKpi.map((s,i)=>{const n=activeCandidats.filter(c=>c.etape===s.id).length;return <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}><div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{s.l}</div><div style={{fontSize:'1.1rem',fontWeight:800,color:n>0?$accent:$textMut,letterSpacing:'-0.02em'}}>{n}</div></div>;});})()}
              </div>
            </div>
          </div>

          {/* Tabs + Search + Filtres */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content'}}>{[{id:'kanban',l:'Kanban'},{id:'liste',l:'Liste'},{id:'compare',l:'Comparer'},{id:'stats',l:'▦ Stats'}].map(v => <button key={v.id} onClick={() => setRecruView(v.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',background:recruView===v.id?$selBg:'transparent',color:recruView===v.id?$selText:$textMut,fontWeight:recruView===v.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit',cursor:'pointer'}}>{v.l}</button>)}</div>
              <input value={recruSearch} onChange={e=>setRecruSearch(e.target.value)} placeholder="Rechercher un candidat..." style={{padding:'6px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',width:200}}/>
            </div>
            <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
              <button onClick={()=>setRecruSettingsOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${recruSettingsOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:recruSettingsOpen?$accentSub:'transparent',color:recruSettingsOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                ✱ Filtres & Colonnes {recruFilter!=='all'&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
              </button>
              {recruFilter!=='all'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setRecruFilter('all')}>✕ {recruFilter}</span>}
            </div>
          </div>
          {/* ✱ Filtres panel */}
          {recruSettingsOpen&&<><div onClick={()=>setRecruSettingsOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:recruDetail?420:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                <button onClick={()=>setRecruFilter('all')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${recruFilter==='all'?$accent:$border}`,background:recruFilter==='all'?$selBg:'transparent',color:recruFilter==='all'?$selText:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Toutes</button>
                {uniqFil.map(f=>(<button key={f} onClick={()=>setRecruFilter(f)} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${recruFilter===f?$accent:$border}`,background:recruFilter===f?$accent+'18':'transparent',color:recruFilter===f?$accent:$textSec,fontSize:'0.7rem',fontWeight:recruFilter===f?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{f}</button>))}
              </div>
            </div>
          </div></>}

          {/* Alerte relances */}
          {(() => { const relances = activeCandidats.filter(needsRelance); if(relances.length===0) return null; return (
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderRadius:crmRd,background:'#fef3c7',border:'1px solid #fcd34d',marginBottom:12,cursor:'pointer'}} onClick={()=>setRecruView('liste')}>
              <span style={{fontSize:'1.1rem'}}>▲</span>
              <div style={{flex:1}}>
                <span style={{fontWeight:700,color:'#92400e',fontSize:'0.82rem'}}>{relances.length} candidat{relances.length>1?'s':''} sans activité depuis 7+ jours</span>
                <span style={{fontSize:'0.72rem',color:'#a16207',marginLeft:8}}>{relances.slice(0,3).map(c=>c.nom).join(', ')}{relances.length>3?'…':''}</span>
              </div>
              <span style={{fontSize:'0.72rem',fontWeight:600,color:'#92400e'}}>Voir →</span>
            </div>
          ); })()}
          {/* KPI Pipeline Funnel */}
          <div style={{display:'flex',gap:4,marginBottom:20,overflowX:'auto',paddingBottom:4}}>
            {pipelineEtapes.map((et,i) => {
              const n = activeCandidats.filter(c=>c.etape===et.id).length;
              return (<div key={et.id} style={{flex:'1 0 90px',background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'10px 12px',textAlign:'center',position:'relative',overflow:'hidden',cursor:'default',transition:'all 0.2s',borderBottom:`3px solid ${et.color}`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=et.color;e.currentTarget.style.transform='translateY(-1px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.borderBottom=`3px solid ${et.color}`;}}
              >
                <div style={{fontSize:'0.62rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4,whiteSpace:'nowrap'}}>{et.label}</div>
                <div style={{fontSize:'1.3rem',fontWeight:800,color:n>0?et.color:$textMut}}>{n}</div>
              </div>);
            })}
            {/* Refusés + Vivier */}
            {RECRU_ETAPES.filter(e=>['refuse','reserve'].includes(e.id)).map(et=>{const n=activeCandidats.filter(c=>c.etape===et.id).length; return(
              <div key={et.id} style={{flex:'0 0 80px',background:$bgSub,border:`1px solid ${$borderLight}`,borderRadius:crmRd,padding:'10px 12px',textAlign:'center',opacity:0.7}}>
                <div style={{fontSize:'0.62rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>{et.label}</div>
                <div style={{fontSize:'1.3rem',fontWeight:800,color:et.color}}>{n}</div>
              </div>);
            })}
          </div>

          {/* ═══ VUE KANBAN ═══ */}
          {recruView === 'kanban' && (<div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:12}}>
            {pipelineEtapes.map(et => {
              const cartes = filt.filter(c=>c.etape===et.id);
              return (<div key={et.id} style={{minWidth:210,flex:'1 0 210px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$border}`,display:'flex',flexDirection:'column'}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(recruDrag){saveCands(activeCandidats.map(c=>c.id===recruDrag?{...c,etape:et.id,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:et.id==='embauche'?'✓ Embauché — Penser à lancer l\'onboarding':`Déplacé vers ${et.label}`}]}:c));
                    // Auto-update linked poste when embauché
                    if(et.id==='embauche'){const cand=activeCandidats.find(c=>c.id===recruDrag);if(cand?.posteId){setPostes(prev=>prev.map(px=>px.id===cand.posteId?{...px,statut:'pourvu',historique:[...(px.historique||[]),{date:new Date().toISOString().slice(0,10),action:'✓ Poste pourvu — '+cand.nom+' embauché',par:currentUser?.prenom||''}]}:px));}}
                    setRecruDrag(null);}}}>
                <div style={{padding:'10px 12px',borderBottom:`2px solid ${et.color}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontWeight:700,fontSize:'0.8rem',color:et.color}}>{et.icon} {et.label}</span>
                  <span style={{background:et.color+'20',color:et.color,fontWeight:800,fontSize:'0.72rem',padding:'2px 7px',borderRadius:crmRd}}>{cartes.length}</span>
                </div>
                <div style={{padding:6,flex:1,display:'flex',flexDirection:'column',gap:6,minHeight:60}}>
                  {cartes.map(c => {
                    const sc = calcScore(c.scorecard);
                    return (<div key={c.id} draggable onDragStart={()=>setRecruDrag(c.id)} onClick={()=>openDetail(c)}
                      style={{background:$bgCard,borderRadius:crmRd,padding:'10px 12px',border:`1px solid ${recruDetail===c.id?$accent:$borderAlt}`,cursor:'pointer',boxShadow:recruDetail===c.id?`0 0 0 2px ${$accent}30`:'0 1px 3px rgba(0,0,0,0.04)',borderLeft:showBorderAccent?`3px solid ${prioC(c.priorite)}`:'none',transition:'all 0.15s'}}
                      onMouseEnter={e=>{if(recruDetail!==c.id)e.currentTarget.style.borderColor=$accent+'50';}}
                      onMouseLeave={e=>{if(recruDetail!==c.id)e.currentTarget.style.borderColor=$borderAlt;}}
                    >
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>{c.photoUrl?<img src={c.photoUrl} style={{width:24,height:24,borderRadius:'50%',objectFit:'cover'}}/>:<div style={{width:24,height:24,borderRadius:'50%',background:$bgSub,border:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.55rem',fontWeight:700,color:$textMut,flexShrink:0}}>{(c.nom||'').split(' ').map(w=>w[0]).join('').slice(0,2)}</div>}<div style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>{c.nom}</div></div>
                        {sc > 0 && <div style={{width:28,height:28,borderRadius:'50%',background:scoreColor(sc)+'18',border:`2px solid ${scoreColor(sc)}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',fontWeight:800,color:scoreColor(sc),flexShrink:0}}>{sc}%</div>}
                      </div>
                      <div style={{fontSize:'0.72rem',color:$accent,marginBottom:3}}>{c.poste}{c.posteAProposer&&<span style={{fontSize:'0.6rem',color:$info,marginLeft:4}}>→ {c.posteAProposer}</span>}</div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span style={{fontSize:'0.62rem',color:$textMut}}>{c.filiale}</span>
                        <div style={{display:'flex',gap:3,alignItems:'center'}}>
                          {c.entretiens?.length > 0 && <span style={{fontSize:'0.58rem',background:$info+'15',color:$info,padding:'1px 5px',borderRadius:crmRd,fontWeight:600}}>{c.entretiens.length} ent.</span>}
                          <span style={{fontSize:'0.62rem',color:$textMut}}>{c.source}</span>
                        </div>
                      </div>
                      {c.disponibilite && <div style={{fontSize:'0.6rem',color:$success,marginTop:3,fontWeight:500}}>Dispo: {c.disponibilite}</div>}
                      {needsRelance(c) && <div style={{fontSize:'0.58rem',color:'#d97706',marginTop:3,fontWeight:700,display:'flex',alignItems:'center',gap:3}}>▲ {daysSinceActivity(c)}j sans activité</div>}
                      {c.etape==='embauche'&&<div style={{fontSize:'0.58rem',color:$success,marginTop:2,fontWeight:600,display:'flex',alignItems:'center',gap:3}}>🚀 Onboarding</div>}
                      {c.fichiers?.length > 0 && <div style={{display:'flex',gap:3,marginTop:2}}>{c.fichiers.some(f=>f.type==='cv')&&<span style={{fontSize:'0.55rem',background:$accent+'12',color:$accent,padding:'1px 4px',borderRadius:3,fontWeight:600}}>CV</span>}{c.fichiers.length>1&&<span style={{fontSize:'0.55rem',background:$bgSub,color:$textMut,padding:'1px 4px',borderRadius:3}}>+{c.fichiers.length-1}</span>}</div>}
                    </div>);
                  })}
                </div>
              </div>);
            })}
          </div>)}

          {/* ═══ VUE LISTE ═══ */}
          {recruView === 'liste' && (<div>
            {/* Bulk action bar */}
            {recruBulkSel.length>0&&(<div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',background:$accent+'10',border:`1px solid ${$accent}30`,borderRadius:crmRd,marginBottom:10}}>
              <span style={{fontWeight:700,color:$accent,fontSize:'0.82rem'}}>{recruBulkSel.length} sélectionné{recruBulkSel.length>1?'s':''}</span>
              <button onClick={()=>{const newEtape=prompt('Nouvelle étape (nouveau/a_analyser/preselection/entretien_1/entretien_2/test/proposition/embauche/refuse/reserve):');if(!newEtape||!RECRU_ETAPES.find(e=>e.id===newEtape))return;saveCands(activeCandidats.map(c=>recruBulkSel.includes(c.id)?{...c,etape:newEtape,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`[Bulk] Déplacé vers ${RECRU_ETAPES.find(e=>e.id===newEtape)?.label}`}]}:c));setRecruBulkSel([]);}} style={{padding:'4px 12px',borderRadius:crmRd,border:`1px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit'}}>🔀 Changer étape</button>
              <button onClick={()=>{const etId='reserve';saveCands(activeCandidats.map(c=>recruBulkSel.includes(c.id)?{...c,etape:etId,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:'[Bulk] Mis en vivier'}]}:c));setRecruBulkSel([]);}} style={{padding:'4px 12px',borderRadius:crmRd,border:`1px solid ${$info}`,background:'transparent',color:$info,fontWeight:600,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit'}}>💎 Vivier</button>
              <button onClick={()=>{if(!window.confirm(`Refuser ${recruBulkSel.length} candidat(s) ?`))return;saveCands(activeCandidats.map(c=>recruBulkSel.includes(c.id)?{...c,etape:'refuse',timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:'[Bulk] Candidature refusée'}]}:c));setRecruBulkSel([]);}} style={{padding:'4px 12px',borderRadius:crmRd,border:`1px solid ${$danger}`,background:'transparent',color:$danger,fontWeight:600,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit'}}>✕ Refuser</button>
              <button onClick={()=>setRecruBulkSel([])} style={{marginLeft:'auto',padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textMut,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit'}}>Désélectionner</button>
            </div>)}
            <div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,boxShadow:$shadow}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
              <thead><tr style={{background:$bgSub}}>
                <th style={{padding:'12px 10px',textAlign:'center',width:36,borderBottom:`1px solid ${$border}`}}><input type="checkbox" checked={recruBulkSel.length===filt.filter(c=>c.etape!=='refuse').length&&filt.filter(c=>c.etape!=='refuse').length>0} onChange={e=>setRecruBulkSel(e.target.checked?filt.filter(c=>c.etape!=='refuse').map(c=>c.id):[])}/></th>
                {['Candidat','Poste','Filiale','Étape','Score','Priorité','Source','Dispo','Salaire','Date','▲'].map(h=><th key={h} style={{position:'relative',padding:'12px 14px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',whiteSpace:'nowrap'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}
              </tr></thead>
              <tbody>{filt.filter(c=>c.etape!=='refuse').map(c=>{
                const et=RECRU_ETAPES.find(e=>e.id===c.etape);
                const sc=calcScore(c.scorecard);
                const isBulk=recruBulkSel.includes(c.id);
                const alerte=needsRelance(c);
                const days=alerte?daysSinceActivity(c):0;
                return <tr key={c.id} style={{cursor:'pointer',borderBottom:`1px solid ${$borderLight}`,background:isBulk?$accent+'10':recruDetail===c.id?$accentSub:alerte?'#fffbeb':$bgSub+'60',transition:'background 0.1s'}} onMouseEnter={e=>{if(recruDetail!==c.id&&!isBulk)e.currentTarget.style.background=$bgCardHover;}} onMouseLeave={e=>{if(recruDetail!==c.id&&!isBulk)e.currentTarget.style.background=recruDetail===c.id?$accentSub:alerte?'#fffbeb':$bgSub+'60';}}>
                  <td style={{padding:'12px 10px',textAlign:'center'}} onClick={e=>e.stopPropagation()}><input type="checkbox" checked={isBulk} onChange={e=>setRecruBulkSel(prev=>e.target.checked?[...prev,c.id]:prev.filter(x=>x!==c.id))}/></td>
                  <td style={{padding:'12px 14px'}} onClick={()=>openDetail(c)}><div style={{display:'flex',alignItems:'center',gap:8}}>{c.photoUrl?<img src={c.photoUrl} style={{width:28,height:28,borderRadius:'50%',objectFit:'cover',flexShrink:0}}/>:<div style={{width:28,height:28,borderRadius:'50%',background:$bgSub,border:`1px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.58rem',fontWeight:700,color:$textMut,flexShrink:0}}>{(c.nom||'').split(' ').map(w=>w[0]).join('').slice(0,2)}</div>}<div><div style={{fontWeight:700,color:$text}}>{c.nom}</div><div style={{fontSize:'0.68rem',color:$textMut,fontWeight:400}}>{c.email}</div></div></div></td>
                  <td style={{padding:'12px 14px',fontSize:'0.82rem'}} onClick={()=>openDetail(c)}>{c.poste}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem'}} onClick={()=>openDetail(c)}>{c.filiale}</td>
                  <td style={{padding:'12px 14px'}} onClick={()=>openDetail(c)}><span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:et.color+'18',color:et.color,fontWeight:700,fontSize:'0.72rem',display:'inline-flex',alignItems:'center',gap:3}}><span style={{width:5,height:5,borderRadius:'50%',background:et.color}}/>{et.label}</span></td>
                  <td style={{padding:'12px 14px'}} onClick={()=>openDetail(c)}>{sc > 0 ? <span style={{fontWeight:800,color:scoreColor(sc),fontSize:'0.82rem'}}>{sc}%</span> : <span style={{color:$textMut,fontSize:'0.72rem'}}>—</span>}</td>
                  <td style={{padding:'12px 14px'}} onClick={()=>openDetail(c)}><span style={{fontWeight:700,fontSize:'0.72rem',color:prioC(c.priorite)}}>{c.priorite}</span></td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem',color:$textSec}} onClick={()=>openDetail(c)}>{c.source}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem',color:$success}} onClick={()=>openDetail(c)}>{c.disponibilite||'—'}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.72rem',fontWeight:600}} onClick={()=>openDetail(c)}>{c.pretentionSalariale?`${(c.pretentionSalariale/1000).toFixed(0)}k€`:'—'}</td>
                  <td style={{padding:'12px 14px',fontSize:'0.7rem',color:$textMut}} onClick={()=>openDetail(c)}>{c.dateCandidat}</td>
                  <td style={{padding:'12px 14px',textAlign:'center'}} onClick={()=>openDetail(c)}>{alerte&&<span style={{fontSize:'0.72rem',fontWeight:700,color:'#d97706',background:'#fef3c7',padding:'2px 7px',borderRadius:crmRd>0?10:2,whiteSpace:'nowrap'}}>▲ {days}j</span>}</td>
                </tr>;
              })}</tbody>
            </table>
            </div>
          </div>)}

          {/* ═══ VUE COMPARER ═══ */}
          {recruView === 'compare' && (<div>
            <div style={{fontSize:'0.78rem',color:$textMut,marginBottom:12}}>Sélectionnez 2 à 3 candidats à comparer :</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
              {filt.filter(c=>c.etape!=='refuse').map(c=>{
                const isSel = recruCompare.includes(c.id);
                return <button key={c.id} onClick={()=>setRecruCompare(prev=>isSel?prev.filter(x=>x!==c.id):prev.length<3?[...prev,c.id]:prev)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${isSel?$accent:$border}`,background:isSel?$accent+'15':'transparent',color:isSel?$accent:$textSec,fontSize:'0.72rem',fontWeight:isSel?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{isSel?'✓ ':''}{c.nom} — {c.poste}</button>;
              })}
            </div>
            {recruCompare.length >= 2 && (<div style={{overflowX:'auto',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
                <thead><tr style={{background:$bgSub}}><th style={{position:'relative',padding:'12px 14px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,width:160}}>Critère<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                  {recruCompare.map(id=>{const c=activeCandidats.find(x=>x.id===id);return c?<th key={id} style={{position:'relative',padding:'12px 14px',textAlign:'center',fontWeight:700,fontSize:'0.82rem',color:$text,borderBottom:`1px solid ${$border}`}}><div>{c.nom}</div><div style={{fontSize:'0.68rem',color:$accent,fontWeight:400}}>{c.poste}</div><div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>:null;})}
                </tr></thead>
                <tbody>
                  {[{l:'Score global',f:c=>{ const sc=calcScore(c.scorecard); return sc>0?<span style={{fontWeight:800,color:scoreColor(sc)}}>{sc}%</span>:'—'; }},
                    {l:'Priorité',f:c=><span style={{color:prioC(c.priorite),fontWeight:700}}>{c.priorite}</span>},
                    {l:'Prétention salariale',f:c=>c.pretentionSalariale?`${(c.pretentionSalariale/1000).toFixed(0)}k€`:'—'},
                    {l:'Disponibilité',f:c=>c.disponibilite||'—'},
                    {l:'Source',f:c=>c.source},
                    {l:'Entretiens',f:c=>c.entretiens?.length||0},
                    ...SCORE_CRITERES.map(cr=>({l:cr.label,f:c=>{const s=c.scorecard?.find(s=>s.criteriaId===cr.id);return s?<span style={{fontWeight:700,color:scoreColor(s.note*20)}}>{s.note}/5</span>:'—';}}))
                  ].map((row,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${$borderLight}`,background:i%2===0?'transparent':$bgSub+'40'}}>
                      <td style={{padding:'10px 14px',fontWeight:600,color:$textSec,fontSize:'0.78rem'}}>{row.l}</td>
                      {recruCompare.map(id=>{const c=activeCandidats.find(x=>x.id===id);return c?<td key={id} style={{padding:'10px 14px',textAlign:'center'}}>{row.f(c)}</td>:null;})}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>)}
          </div>)}

          {/* ═══ VUE STATS ═══ */}
          {recruView === 'stats' && (() => {
            const totalC = activeCandidats.length;
            const embauches = activeCandidats.filter(c=>c.etape==='embauche').length;
            const refuses = activeCandidats.filter(c=>c.etape==='refuse').length;
            const actifs = activeCandidats.filter(c=>!['refuse','reserve','embauche'].includes(c.etape)).length;
            const txConversion = totalC>0 ? Math.round(embauches/totalC*100) : 0;
            const sourceStats = SOURCES.map(s=>({s,n:activeCandidats.filter(c=>c.source===s).length})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);
            const filStats = [...new Set(activeCandidats.map(c=>c.filiale))].map(f=>({f,n:activeCandidats.filter(c=>c.filiale===f).length})).sort((a,b)=>b.n-a.n);
            const avgScore = (() => { const scored=activeCandidats.filter(c=>c.scorecard&&c.scorecard.length>0); return scored.length>0?Math.round(scored.reduce((s,c)=>s+calcScore(c.scorecard),0)/scored.length):0; })();
            const relancesCount = activeCandidats.filter(needsRelance).length;
            const maxSource = sourceStats[0]?.n||1;
            const maxFil = filStats[0]?.n||1;
            return (
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
                {/* KPIs */}
                {[
                  {label:'Total candidats',v:totalC,color:$accent,icon:'◉'},
                  {label:'Actifs en pipeline',v:actifs,color:$info,icon:'↻'},
                  {label:'Embauchés',v:embauches,color:$success,icon:'✓'},
                  {label:'Refusés',v:refuses,color:$textSec,icon:'✕'},
                  {label:'Taux de conversion',v:txConversion+'%',color:txConversion>20?$success:txConversion>10?$warn:$danger,icon:'↗'},
                  {label:'Score moyen',v:avgScore>0?avgScore+'%':'—',color:scoreColor(avgScore),icon:'⭐'},
                  {label:'À relancer (7j+)',v:relancesCount,color:relancesCount>0?'#d97706':$success,icon:'▲'},
                  {label:'En vivier',v:activeCandidats.filter(c=>c.etape==='reserve').length,color:$info,icon:'💎'},
                  {label:'Avec CV',v:activeCandidats.filter(c=>c.fichiers?.some(f=>f.type==='cv')).length,color:$textSec,icon:'▫'},
                ].map((kpi,i)=>(
                  <div key={i} style={{background:$bgCard,borderRadius:crmRd,padding:'16px 20px',border:`1px solid ${$border}`,display:'flex',alignItems:'center',gap:14}}>
                    <span style={{fontSize:'1.5rem'}}>{kpi.icon}</span>
                    <div><div style={{fontSize:'1.5rem',fontWeight:900,color:kpi.color,lineHeight:1}}>{kpi.v}</div><div style={{fontSize:'0.72rem',color:$textMut,marginTop:3}}>{kpi.label}</div></div>
                  </div>
                ))}
                {/* Sources */}
                <div style={{gridColumn:'span 2',background:$bgCard,borderRadius:crmRd,padding:'18px 20px',border:`1px solid ${$border}`}}>
                  <div style={{fontWeight:700,fontSize:'0.88rem',color:$text,marginBottom:14}}>📡 Sources de candidatures</div>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {sourceStats.map(({s,n})=>(
                      <div key={s} style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:80,fontSize:'0.72rem',color:$textSec,fontWeight:500,flexShrink:0}}>{s}</div>
                        <div style={{flex:1,height:8,background:$bgSub,borderRadius:4,overflow:'hidden'}}>
                          <div style={{width:`${n/maxSource*100}%`,height:'100%',background:$accent,borderRadius:4,transition:'width 0.5s'}}/>
                        </div>
                        <span style={{fontSize:'0.72rem',fontWeight:700,color:$accent,width:20,textAlign:'right'}}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Par filiale */}
                <div style={{background:$bgCard,borderRadius:crmRd,padding:'18px 20px',border:`1px solid ${$border}`}}>
                  <div style={{fontWeight:700,fontSize:'0.88rem',color:$text,marginBottom:14}}>▪ Par filiale</div>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {filStats.map(({f,n})=>(
                      <div key={f} style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{flex:1,fontSize:'0.72rem',color:$textSec}}>{f.replace("L'","")}</div>
                        <div style={{width:60,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}>
                          <div style={{width:`${n/maxFil*100}%`,height:'100%',background:$info,borderRadius:3}}/>
                        </div>
                        <span style={{fontSize:'0.72rem',fontWeight:700,color:$info,width:16,textAlign:'right'}}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Funnel conversion */}
                <div style={{gridColumn:'span 3',background:$bgCard,borderRadius:crmRd,padding:'18px 20px',border:`1px solid ${$border}`}}>
                  <div style={{fontWeight:700,fontSize:'0.88rem',color:$text,marginBottom:14}}>◎ Taux de passage par étape</div>
                  <div style={{display:'flex',gap:4,overflowX:'auto'}}>
                    {pipelineEtapes.map((et,i)=>{
                      const n=activeCandidats.filter(c=>c.etape===et.id).length;
                      const pct=totalC>0?Math.round(n/totalC*100):0;
                      return (
                        <div key={et.id} style={{flex:1,minWidth:80,textAlign:'center',position:'relative'}}>
                          <div style={{height:60,display:'flex',alignItems:'flex-end',justifyContent:'center',marginBottom:6}}>
                            <div style={{width:'70%',background:et.color+'30',border:`1px solid ${et.color}40`,borderRadius:`${crmRd}px ${crmRd}px 0 0`,height:`${Math.max(pct*0.6+4,6)}px`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                              <span style={{fontSize:'0.72rem',fontWeight:800,color:et.color}}>{n}</span>
                            </div>
                          </div>
                          <div style={{fontSize:'0.6rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.03em'}}>{et.label}</div>
                          <div style={{fontSize:'0.65rem',color:et.color,fontWeight:700}}>{pct}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* + Candidat — Mode Chooser + CV Parser */}
          {recruNewMode&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>{setRecruNewMode(null);setRecruCvPaste('');setRecruCvParsing(false);setRecruFichierUrl('');}}>
            <div style={{background:$bgCard,borderRadius:crmRd,width:'94%',maxWidth:700,maxHeight:'90vh',overflow:'auto',boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>
                <div style={{fontWeight:700,color:$text}}>{recruNewMode==='choose'?'Nouveau candidat':recruNewMode==='cv'?'🤖 Créer depuis un CV':recruNewMode==='linkedin'?'🔗 Depuis LinkedIn / Capture':'Saisie manuelle'}</div>
                <button onClick={()=>{setRecruNewMode(null);setRecruCvPaste('');setRecruCvParsing(false);setRecruFichierUrl('');}} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer',color:$textSec}}>✕</button>
              </div>

              {/* CHOOSE MODE */}
              {recruNewMode==='choose'&&(<div style={{padding:'24px 20px',display:'flex',flexDirection:'column',gap:12}}>
                <div style={{fontSize:'0.82rem',color:$textMut,marginBottom:4}}>Comment souhaitez-vous ajouter ce candidat ?</div>
                <button onClick={()=>{setRecruNewMode(null);setRecruEdit({id:'C'+String(activeCandidats.length+1).padStart(3,'0'),nom:'',prenom:'',nomFamille:'',poste:'',posteId:null,posteAProposer:undefined,filiale:'Ezel Bâtiment',etape:'nouveau',priorite:'Moyenne',dateCandidat:new Date().toISOString().slice(0,10),email:'',tel:'',source:'',notes:'',evaluation:0,pretentionSalariale:0,disponibilite:'',villeCandidat:'',adresse:'',dateNaissance:'',nationalite:'',permis:'',formations:'',langues:'',linkedin:'',motifRefus:'',photoUrl:'',fichiers:[],scorecard:[],entretiens:[],timeline:[{date:new Date().toISOString().slice(0,10),action:'Candidature ajoutée manuellement'}]});}} style={{display:'flex',alignItems:'center',gap:14,padding:'16px 20px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=$accent;e.currentTarget.style.background=$accentSub;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.background=$bgCard;}}
                >
                  <div style={{width:48,height:48,borderRadius:crmRd,background:$accent+'12',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0}}>✎</div>
                  <div><div style={{fontSize:'0.92rem',fontWeight:700,color:$text}}>Saisie manuelle</div><div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>Remplir le formulaire avec les informations du candidat</div></div>
                </button>

                <button onClick={()=>setRecruNewMode('cv')} style={{display:'flex',alignItems:'center',gap:14,padding:'16px 20px',borderRadius:crmRd,border:`1px solid ${$info}40`,background:$info+'05',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=$info;e.currentTarget.style.background=$info+'12';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$info+'40';e.currentTarget.style.background=$info+'05';}}
                >
                  <div style={{width:48,height:48,borderRadius:crmRd,background:$info+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0}}>🤖</div>
                  <div><div style={{fontSize:'0.92rem',fontWeight:700,color:$text}}>Depuis un CV <span style={{fontSize:'0.65rem',fontWeight:600,color:$info,background:$info+'15',padding:'2px 8px',borderRadius:crmRd>0?10:2,marginLeft:6}}>IA</span></div><div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>Collez le texte du CV — l'IA extraira nom, email, téléphone, compétences automatiquement</div></div>
                </button>

                <button onClick={()=>setRecruNewMode('linkedin')} style={{display:'flex',alignItems:'center',gap:14,padding:'16px 20px',borderRadius:crmRd,border:`1px solid ${$success}40`,background:$success+'05',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=$success;e.currentTarget.style.background=$success+'12';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=$success+'40';e.currentTarget.style.background=$success+'05';}}
                >
                  <div style={{width:48,height:48,borderRadius:crmRd,background:$success+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0}}>🔗</div>
                  <div><div style={{fontSize:'0.92rem',fontWeight:700,color:$text}}>Depuis LinkedIn / Capture <span style={{fontSize:'0.65rem',fontWeight:600,color:$success,background:$success+'15',padding:'2px 8px',borderRadius:crmRd>0?10:2,marginLeft:6}}>IA</span></div><div style={{fontSize:'0.72rem',color:$textMut,marginTop:2}}>Collez un lien LinkedIn, une capture d'écran texte ou un profil — l'IA crée le candidat</div></div>
                </button>
              </div>)}

              {/* CV PASTE MODE */}
              {recruNewMode==='cv'&&(<div style={{padding:'16px 20px'}}>
                <div style={{display:'flex',gap:6,marginBottom:12}}>
                  <button onClick={()=>setRecruNewMode('choose')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.7rem',color:$textSec,cursor:'pointer',fontFamily:'inherit'}}>← Retour</button>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:$info+'08',borderRadius:crmRd,border:`1px solid ${$info}20`}}>
                      <span style={{fontSize:'1rem'}}>1️⃣</span>
                      <div style={{fontSize:'0.72rem',color:$text}}>Ouvrez le <strong>CV du candidat</strong> (PDF, Word, ou email reçu)</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:$info+'08',borderRadius:crmRd,border:`1px solid ${$info}20`}}>
                      <span style={{fontSize:'1rem'}}>2️⃣</span>
                      <div style={{fontSize:'0.72rem',color:$text}}>Sélectionnez <strong>tout le texte</strong> (Ctrl+A) puis copiez (Ctrl+C)</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:$info+'08',borderRadius:crmRd,border:`1px solid ${$info}20`}}>
                      <span style={{fontSize:'1rem'}}>3️⃣</span>
                      <div style={{fontSize:'0.72rem',color:$text}}>Collez le texte ci-dessous (Ctrl+V) puis cliquez <strong>Analyser & Créer</strong></div>
                    </div>
                  </div>
                </div>
                {/* Upload CV from computer */}
                <div style={{marginBottom:12}}>
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'14px 20px',borderRadius:crmRd,border:`2px dashed ${recruCvPaste&&recruCvPaste.trim().length>10?$success:$accent}`,background:recruCvPaste&&recruCvPaste.trim().length>10?$success+'05':$accent+'05',cursor:'pointer',transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=$accent;e.currentTarget.style.background=$accent+'10';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=recruCvPaste&&recruCvPaste.trim().length>10?$success:$accent;e.currentTarget.style.background=recruCvPaste&&recruCvPaste.trim().length>10?$success+'05':$accent+'05';}}
                  >
                    <span style={{fontSize:'1.3rem'}}>▫</span>
                    <div style={{textAlign:'center'}}><div style={{fontSize:'0.82rem',fontWeight:700,color:$text}}>{recruCvParsing?'⏳ Analyse du CV en cours...':'Importer un CV depuis l\'ordinateur'}</div><div style={{fontSize:'0.68rem',color:$textMut,marginTop:2}}>{recruCvParsing?'L\'IA lit le PDF et extrait toutes les informations...':'PDF → l\'IA analyse et crée le candidat automatiquement'}</div></div>
                    <input type="file" accept=".pdf,.doc,.docx,.txt,.rtf" style={{display:'none'}} onChange={async(e)=>{const file=e.target.files?.[0];if(!file)return;setRecruNewFichier(file.name);if(file.type==='text/plain'||file.name.endsWith('.txt')){const reader=new FileReader();reader.onload=(ev)=>{setRecruCvPaste(ev.target.result);};reader.readAsText(file);}else if(file.type==='application/pdf'){setRecruCvPaste('▫ PDF détecté : '+file.name+' — Analyse automatique en cours...');setRecruCvParsing(true);try{const base64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Lecture impossible'));r.readAsDataURL(file);});const dataUrl=await new Promise((r2,j2)=>{const rd=new FileReader();rd.onload=()=>r2(rd.result);rd.onerror=()=>j2('err');rd.readAsDataURL(file);});const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:[{type:'document',source:{type:'base64',media_type:'application/pdf',data:base64}},{type:'text',text:'Tu es un expert RH. Extrais les informations de ce CV et retourne UNIQUEMENT un objet JSON valide (sans markdown, sans backticks) :\n\n{\"prenom\":\"\",\"nomFamille\":\"\",\"email\":\"\",\"tel\":\"\",\"adresse\":\"Adresse complète (numéro, rue, code postal, ville)\",\"villeCandidat\":\"Juste la ville\",\"poste\":\"Poste actuel ou recherché\",\"linkedin\":\"\",\"pretentionSalariale\":0,\"disponibilite\":\"\",\"notes\":\"Résumé compétences et expériences clés (4-5 lignes)\",\"source\":\"CV\",\"hasPhoto\":false,\"photoDescription\":\"Si photo présente, décris brièvement (homme/femme, cheveux, tenue)\",\"dateNaissance\":\"\",\"nationalite\":\"\",\"permis\":\"\",\"formations\":\"Diplômes et certifications\",\"langues\":\"\"}\n\nSi une info est absente, laisse \"\". Pour hasPhoto, indique true si tu vois une photo du candidat.'}]}]})});const data=await resp.json();const text=data.content?.[0]?.text||'{}';const clean=text.replace(/```json|```/g,'').trim();const parsed=JSON.parse(clean);const newId='C'+String(activeCandidats.length+1).padStart(3,'0');const newCandidat={id:newId,nom:(parsed.prenom+' '+parsed.nomFamille).trim()||'Nouveau candidat',prenom:parsed.prenom||'',nomFamille:parsed.nomFamille||'',poste:parsed.poste||'',posteId:null,posteAProposer:undefined,filiale:'Ezel Bâtiment',etape:'nouveau',priorite:'Moyenne',dateCandidat:new Date().toISOString().slice(0,10),email:parsed.email||'',tel:parsed.tel||'',source:'CV',notes:parsed.notes||'',evaluation:0,pretentionSalariale:parsed.pretentionSalariale||0,disponibilite:parsed.disponibilite||'',villeCandidat:parsed.villeCandidat||'',adresse:parsed.adresse||'',dateNaissance:parsed.dateNaissance||'',nationalite:parsed.nationalite||'',permis:parsed.permis||'',formations:parsed.formations||'',langues:parsed.langues||'',linkedin:parsed.linkedin||'',motifRefus:'',photoUrl:'',fichiers:[{id:'F'+Date.now(),type:'cv',nom:file.name,url:recruFichierUrl||'',dataUrl:'',date:new Date().toISOString().slice(0,10)}],scorecard:[],entretiens:[],timeline:[{date:new Date().toISOString().slice(0,10),action:'Candidat créé depuis CV PDF (IA)'+(parsed.hasPhoto?' — 📷 Photo détectée'+(parsed.photoDescription?' ('+parsed.photoDescription+')':''):'')}]};saveCands([...activeCandidats,newCandidat]);setRecruNewMode(null);setRecruCvPaste('');setRecruCvParsing(false);setRecruFichierUrl('');setRecruDetail(newId);setRecruDetailTab('fichiers');}catch(err){setRecruCvParsing(false);setRecruCvPaste('Erreur lors de l\'analyse du PDF: '+err.message+'\n\nVeuillez copier-coller le texte du CV ci-dessous.');}}else{setRecruCvPaste('');setTimeout(()=>{const el=document.getElementById('cvPasteArea');if(el)el.focus();},100);}}}/>
                  </label>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                  <div style={{flex:1,height:1,background:$border}}/>
                  <span style={{fontSize:'0.68rem',color:$textMut,fontWeight:600}}>OU</span>
                  <div style={{flex:1,height:1,background:$border}}/>
                </div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:'0.72rem',fontWeight:600,color:$text,marginBottom:4}}>Lien vers le CV (Google Drive, Dropbox, URL directe)</div>
                  <input value={recruFichierUrl||''} onChange={e=>setRecruFichierUrl(e.target.value)} placeholder="https://drive.google.com/file/d/... (optionnel mais recommandé)" style={{width:'100%',padding:'8px 12px',borderRadius:crmRd,border:`1px solid ${recruFichierUrl?$success:$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:recruFichierUrl?$success+'05':$bgCard,color:$text,outline:'none',boxSizing:'border-box',transition:'all 0.2s'}}/>
                  <div style={{fontSize:'0.6rem',color:$textMut,marginTop:3}}>✧ Uploadez le CV sur Google Drive → Clic droit → Obtenir le lien → Collez ici. Le lien sera attaché au profil du candidat.</div>
                </div>
                <textarea value={recruCvPaste===' '?'':recruCvPaste} onChange={e=>setRecruCvPaste(e.target.value)} placeholder={"Collez le texte du CV ici...\n\nExemple :\nMartin DUBOIS\n12 rue de la Paix, 67000 Strasbourg\nm.dubois@email.com — 06 12 34 56 78\n\nChef de chantier — 10 ans d'expérience BTP\n\nExpérience :\n- Chef de chantier chez Bouygues (2018-2024)\n- Conducteur de travaux chez Eiffage (2014-2018)\n\nFormation : BTS Bâtiment\nPermis : B, C — CACES 1, 3, 5"} id="cvPasteArea" rows={12} style={{width:'100%',padding:'12px 14px',borderRadius:crmRd,border:`2px dashed ${recruCvPaste&&recruCvPaste.trim().length>10?$success:$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:recruCvPaste&&recruCvPaste.trim().length>10?$success+'05':$bgSub,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box',lineHeight:1.5,transition:'all 0.2s'}}/>
                <div style={{display:'flex',gap:6,marginTop:12,justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:'0.68rem',color:$textMut}}>{recruCvPaste&&recruCvPaste.trim().length > 1 ? `${recruCvPaste.trim().length} caractères` : 'En attente du CV...'}</div>
                  <button disabled={recruCvParsing||!recruCvPaste||recruCvPaste.trim().length<10} onClick={async()=>{
                    setRecruCvParsing(true);
                    try{
                      const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert RH. Extrais les informations de ce CV et retourne UNIQUEMENT un objet JSON valide (sans markdown, sans backticks, juste le JSON) avec ces champs :\n\n{\n  "prenom": "",\n  "nomFamille": "",\n  "email": "",\n  "tel": "",\n  "villeCandidat": "",\n  "poste": "",\n  "linkedin": "",\n  "pretentionSalariale": 0,\n  "disponibilite": "",\n  "notes": "Résumé des compétences et expériences clés (3-4 lignes)",\n  "source": "CV"\n}\n\nSi une info n'est pas trouvée, laisse vide. Pour pretentionSalariale, mets 0 si non mentionné. Pour le poste, déduis-le du parcours si non explicite.\n\nCV :\n${recruCvPaste.trim()}`}]})});
                      const data=await resp.json();
                      const text=data.content?.[0]?.text||'{}';
                      const clean=text.replace(/\`\`\`json|\`\`\`/g,'').trim();
                      const parsed=JSON.parse(clean);
                      const newId='C'+String(activeCandidats.length+1).padStart(3,'0');
                      const newCandidat={
                        id:newId,nom:`${parsed.prenom||''} ${parsed.nomFamille||''}`.trim()||'Nouveau candidat',
                        prenom:parsed.prenom||'',nomFamille:parsed.nomFamille||'',
                        poste:parsed.poste||'',posteId:null,posteAProposer:undefined,filiale:'Ezel Bâtiment',etape:'nouveau',priorite:'Moyenne',
                        dateCandidat:new Date().toISOString().slice(0,10),
                        email:parsed.email||'',tel:parsed.tel||'',source:parsed.source||'CV',
                        notes:parsed.notes||'',evaluation:0,
                        pretentionSalariale:parsed.pretentionSalariale||0,
                        disponibilite:parsed.disponibilite||'',
                        villeCandidat:parsed.villeCandidat||'',
                        adresse:parsed.adresse||'',dateNaissance:parsed.dateNaissance||'',nationalite:parsed.nationalite||'',permis:parsed.permis||'',formations:parsed.formations||'',langues:parsed.langues||'',
                        linkedin:parsed.linkedin||'',motifRefus:'',photoUrl:'',
                        fichiers:[{id:'F'+Date.now(),type:'cv',nom:`CV_${parsed.nomFamille||'candidat'}_${parsed.prenom||''}.pdf`,url:recruFichierUrl||'',date:new Date().toISOString().slice(0,10)}],
                        scorecard:[],entretiens:[],
                        timeline:[{date:new Date().toISOString().slice(0,10),action:'Candidat créé depuis CV (IA)'}]
                      };
                      saveCands([...activeCandidats,newCandidat]);
                      setRecruNewMode(null);setRecruCvPaste('');setRecruCvParsing(false);setRecruFichierUrl('');
                      setRecruDetail(newId);setRecruDetailTab('profil');
                    }catch(err){setRecruCvParsing(false);}
                  }} style={{padding:'8px 20px',borderRadius:crmRd,border:'none',background:recruCvParsing?$textMut:$info,color:'white',fontWeight:700,fontSize:'0.78rem',cursor:recruCvParsing?'wait':'pointer',fontFamily:'inherit',opacity:(!recruCvPaste||recruCvPaste.trim().length<10)?0.4:1,display:'flex',alignItems:'center',gap:6}}>
                    {recruCvParsing?<>⏳ Analyse en cours...</>:<>🤖 Analyser & Créer</>}
                  </button>
                </div>
              </div>)}

              {/* LINKEDIN / CAPTURE MODE */}
              {recruNewMode==='linkedin'&&(<div style={{padding:'16px 20px'}}>
                <div style={{display:'flex',gap:6,marginBottom:12}}>
                  <button onClick={()=>setRecruNewMode('choose')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.7rem',color:$textSec,cursor:'pointer',fontFamily:'inherit'}}>← Retour</button>
                </div>

                {/* File upload */}
                <div style={{marginBottom:12}}>
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'14px 20px',borderRadius:crmRd,border:`2px dashed ${$success}`,background:$success+'05',cursor:'pointer',transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=$success+'12';}}
                    onMouseLeave={e=>{e.currentTarget.style.background=$success+'05';}}
                  >
                    <span style={{fontSize:'1.3rem'}}>§</span>
                    <div style={{textAlign:'center'}}><div style={{fontSize:'0.82rem',fontWeight:700,color:$text}}>Importer un fichier depuis l'ordinateur</div><div style={{fontSize:'0.68rem',color:$textMut,marginTop:2}}>PDF, image, texte — le fichier sera attaché au profil</div></div>
                    <input type="file" accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg" style={{display:'none'}} onChange={e=>{const file=e.target.files?.[0];if(file){if(file.type==='text/plain'||file.name.endsWith('.txt')){const reader=new FileReader();reader.onload=(ev)=>setRecruCvPaste(ev.target.result);reader.readAsText(file);}else{setRecruCvPaste(`Fichier importé : ${file.name}\nCopiez aussi le texte du profil ci-dessous pour que l'IA puisse l'analyser.`);}}}}/>
                  </label>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                  <div style={{flex:1,height:1,background:$border}}/><span style={{fontSize:'0.68rem',color:$textMut}}>OU</span><div style={{flex:1,height:1,background:$border}}/>
                </div>

                <div style={{marginBottom:10}}>
                  <div style={{fontSize:'0.72rem',fontWeight:600,color:$text,marginBottom:4}}>Lien LinkedIn</div>
                  <input value={recruLinkedinUrl||''} onChange={e=>setRecruLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/prenom-nom" style={{width:'100%',padding:'8px 12px',borderRadius:crmRd,border:`1px solid ${recruLinkedinUrl?$success:$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:recruLinkedinUrl?$success+'05':$bgCard,color:$text,outline:'none',boxSizing:'border-box',transition:'all 0.2s',marginBottom:6}}/>
                  <div style={{fontSize:'0.72rem',fontWeight:600,color:$text,marginBottom:4}}>Lien vers le CV (Google Drive, Dropbox)</div>
                  <input value={recruFichierUrl||''} onChange={e=>setRecruFichierUrl(e.target.value)} placeholder="https://drive.google.com/file/d/... (optionnel)" style={{width:'100%',padding:'8px 12px',borderRadius:crmRd,border:`1px solid ${recruFichierUrl?$success:$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:recruFichierUrl?$success+'05':$bgCard,color:$text,outline:'none',boxSizing:'border-box',transition:'all 0.2s'}}/>
                </div>

                <div style={{marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',background:$success+'08',borderRadius:crmRd,fontSize:'0.68rem',color:$text,marginBottom:8}}>
                    <span>✧</span><span>Copiez le <strong>profil LinkedIn</strong>, un <strong>email de candidature</strong>, une <strong>fiche Indeed</strong>, ou décrivez le candidat</span>
                  </div>
                  <textarea value={recruCvPaste===' '?'':recruCvPaste||''} onChange={e=>setRecruCvPaste(e.target.value)} placeholder={"Collez le texte du profil ici...\n\nExemple :\nSophie LAURENT — Comptable\nColmar, Grand Est\ns.laurent@email.com\n\nExpérience : 5 ans en cabinet comptable\nCompétences : DCG, Pennylane, Sage"} rows={8} style={{width:'100%',padding:'12px 14px',borderRadius:crmRd,border:`2px dashed ${recruCvPaste&&recruCvPaste.trim().length>10?$success:$border}`,fontSize:'0.78rem',fontFamily:'inherit',background:recruCvPaste&&recruCvPaste.trim().length>10?$success+'05':$bgSub,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box',lineHeight:1.5,transition:'all 0.2s'}}/>
                </div>

                <div style={{display:'flex',gap:6,justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:'0.68rem',color:$textMut}}>{recruCvPaste&&recruCvPaste.trim().length>1?`${recruCvPaste.trim().length} caractères`:'En attente...'}</div>
                  <button disabled={recruCvParsing||(!recruCvPaste||recruCvPaste.trim().length<10)} onClick={async()=>{
                    setRecruCvParsing(true);
                    try{
                      const content=`${recruLinkedinUrl?'Lien LinkedIn: '+recruLinkedinUrl+'\n\n':''}${recruCvPaste||''}`;
                      const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert RH. Extrais les informations de ce profil candidat et retourne UNIQUEMENT un objet JSON valide (sans markdown, sans backticks) :\n\n{"prenom":"","nomFamille":"","email":"","tel":"","villeCandidat":"","poste":"","linkedin":"","pretentionSalariale":0,"disponibilite":"","notes":"Résumé compétences et expériences (4 lignes)","source":"LinkedIn"}\n\nSi info non trouvée, laisse "". Pour le poste, déduis le poste actuel ou recherché.\n\nProfil :\n${content.trim()}`}]})});
                      const data=await resp.json();
                      const text=data.content?.[0]?.text||'{}';
                      const clean=text.replace(/```json|```/g,'').trim();
                      const parsed=JSON.parse(clean);
                      const newId='C'+String(activeCandidats.length+1).padStart(3,'0');
                      const fichiers=[{id:'F'+Date.now(),type:'capture',nom:'Profil_LinkedIn_'+(parsed.nomFamille||'candidat')+'.txt',url:recruLinkedinUrl||'',date:new Date().toISOString().slice(0,10)}];
                      if(recruFichierUrl)fichiers.push({id:'F'+(Date.now()+1),type:'cv',nom:'CV_'+(parsed.nomFamille||'candidat')+'.pdf',url:recruFichierUrl,date:new Date().toISOString().slice(0,10)});
                      const newCandidat={
                        id:newId,nom:`${parsed.prenom||''} ${parsed.nomFamille||''}`.trim()||'Nouveau candidat',
                        prenom:parsed.prenom||'',nomFamille:parsed.nomFamille||'',
                        poste:parsed.poste||'',posteId:null,posteAProposer:undefined,filiale:'Ezel Bâtiment',etape:'nouveau',priorite:'Moyenne',
                        dateCandidat:new Date().toISOString().slice(0,10),
                        email:parsed.email||'',tel:parsed.tel||'',source:parsed.source||'LinkedIn',
                        notes:parsed.notes||'',evaluation:0,
                        pretentionSalariale:parsed.pretentionSalariale||0,
                        disponibilite:parsed.disponibilite||'',
                        villeCandidat:parsed.villeCandidat||'',
                        linkedin:parsed.linkedin||recruLinkedinUrl||'',motifRefus:'',photoUrl:'',
                        fichiers:fichiers,scorecard:[],entretiens:[],
                        timeline:[{date:new Date().toISOString().slice(0,10),action:'Candidat créé depuis LinkedIn/Capture (IA)'}]
                      };
                      saveCands([...activeCandidats,newCandidat]);
                      setRecruNewMode(null);setRecruCvPaste('');setRecruCvParsing(false);setRecruLinkedinUrl('');setRecruFichierUrl('');
                      setRecruDetail(newId);setRecruDetailTab('profil');
                    }catch(err){setRecruCvParsing(false);}
                  }} style={{padding:'8px 20px',borderRadius:crmRd,border:'none',background:recruCvParsing?$textMut:$success,color:'white',fontWeight:700,fontSize:'0.78rem',cursor:recruCvParsing?'wait':'pointer',fontFamily:'inherit',opacity:(!recruCvPaste||recruCvPaste.trim().length<10)?0.4:1,display:'flex',alignItems:'center',gap:6}}>
                    {recruCvParsing?<>⏳ Analyse en cours...</>:<>🔗 Analyser & Créer</>}
                  </button>
                </div>
              </div>)}

            </div>
          </div>)}

                    {/* File Viewer Modal */}
          {recruFileViewer&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:10000,display:'flex',flexDirection:'column'}} onClick={()=>setRecruFileViewer(null)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 20px',background:'#1a1a1a',color:'white',flexShrink:0}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:'1.1rem'}}>{recruFileViewer.type==='cv'?'▫':recruFileViewer.type==='photo'?'📷':'§'}</span>
                <span style={{fontWeight:700,fontSize:'0.9rem'}}>{recruFileViewer.nom}</span>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button onClick={()=>{const a=document.createElement('a');a.href=recruFileViewer.dataUrl;a.download=recruFileViewer.nom;document.body.appendChild(a);a.click();document.body.removeChild(a);}} style={{padding:'5px 14px',borderRadius:crmRd,border:'1px solid rgba(255,255,255,0.3)',background:'transparent',color:'white',fontSize:'0.75rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}>↓ Télécharger</button>
                <button onClick={()=>setRecruFileViewer(null)} style={{padding:'5px 10px',borderRadius:crmRd,border:'none',background:'rgba(255,255,255,0.15)',color:'white',fontSize:'1rem',cursor:'pointer',fontFamily:'inherit'}}>✕</button>
              </div>
            </div>
            <div style={{flex:1,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={e=>e.stopPropagation()}>
              {recruFileViewer.dataUrl?.startsWith('data:application/pdf')?
                <iframe src={recruFileViewer.dataUrl} style={{width:'100%',height:'100%',border:'none',background:'white'}}/>
              :recruFileViewer.dataUrl?.startsWith('data:image')?
                <img src={recruFileViewer.dataUrl} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',borderRadius:8,boxShadow:'0 8px 40px rgba(0,0,0,0.5)'}}/>
              :
                <iframe src={recruFileViewer.dataUrl} style={{width:'100%',height:'100%',border:'none',background:'white'}}/>
              }
            </div>
          </div>)}

                    {/* Edit Modal */}
          {recruEdit && (<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setRecruEdit(null)}><div style={{background:$bgCard,borderRadius:crmRd,width:'92%',maxWidth:640,maxHeight:'88vh',overflow:'auto',boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{activeCandidats.find(c=>c.id===recruEdit.id)?'Modifier':'Nouveau'} candidat</span><button onClick={()=>setRecruEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer',color:$textSec}}>✕</button></div>
            <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{k:'prenom',l:'Prénom',transform:'titlecase'},{k:'nomFamille',l:'Nom',transform:'uppercase'},{k:'poste',l:'Poste visé',type:'poste'},{k:'filiale',l:'Filiale',type:'select',opts:['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte',"L'Étanchéité"]},{k:'email',l:'Email'},{k:'tel',l:'Téléphone'},{k:'villeCandidat',l:'Ville'},{k:'source',l:'Source',type:'select',opts:SOURCES},{k:'priorite',l:'Priorité',type:'select',opts:['Haute','Moyenne','Basse']},{k:'etape',l:'Étape',type:'select',opts:RECRU_ETAPES.map(e=>e.id),labels:RECRU_ETAPES.map(e=>e.label)},{k:'pretentionSalariale',l:'Prétention salariale (€)',type:'number'},{k:'disponibilite',l:'Disponibilité'},{k:'adresse',l:'Adresse complète',span:2},{k:'dateNaissance',l:'Date de naissance',type:'date'},{k:'nationalite',l:'Nationalité'},{k:'permis',l:'Permis'},{k:'formations',l:'Formations / Diplômes',span:2},{k:'langues',l:'Langues'},{k:'linkedin',l:'LinkedIn'},{k:'dateCandidat',l:'Date candidature',type:'date'},{k:'notes',l:'Notes',span:2,type:'textarea'}].map(f=>(
                <div key={f.k} style={{gridColumn:f.span?'span 2':'span 1'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>{f.l}</label>
                  {f.type==='poste'?<div>
                    <select value={recruEdit[f.k]||''} onChange={e=>setRecruEdit({...recruEdit,[f.k]:e.target.value,posteId:postes.find(p=>p.titre===e.target.value)?.id||null})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',marginBottom:4}}>
                      <option value="">— Sélectionner un poste —</option>
                      <option value="__libre__">✎ Saisie libre (taper le poste)</option>
                      <optgroup label="Postes ouverts">{postes.filter(p=>(p.statut==='ouvert'||p.statut==='Ouvert'||p.statut==='recrutement'||p.statut==='a_creer'||p.statut==='gele'||p.statut==='proposition'||p.statut==='remplacement_temp')).map(p=><option key={p.id} value={p.titre}>{p.titre} — {filialesDynamiques.find(f=>f.id===p.filialeId)?.nom||''}</option>)}</optgroup>
                      <optgroup label="Tous les postes">{postes.filter(p=>p.statut!=='Ouvert').map(p=><option key={p.id} value={p.titre}>{p.titre} — {p.statut}</option>)}</optgroup>
                    </select>
                    {recruEdit.poste==='__libre__'&&<div style={{marginTop:4}}><input value={recruEdit.posteLibre||''} onChange={e=>setRecruEdit({...recruEdit,posteLibre:e.target.value,poste:e.target.value})} placeholder="Tapez le poste visé..." style={{width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$accent}`,fontSize:'0.78rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>}
                    {recruEdit.posteAProposer!==undefined&&<div style={{marginTop:4}}>
                      <select value={recruEdit.posteAProposer&&!postes.find(p=>p.titre===recruEdit.posteAProposer)?'__libre__':(recruEdit.posteAProposer||'')} onChange={e=>{if(e.target.value==='__libre__')setRecruEdit({...recruEdit,posteAProposer:'__libre__'});else setRecruEdit({...recruEdit,posteAProposer:e.target.value});}} style={{width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$warn}`,fontSize:'0.75rem',fontFamily:'inherit',background:$warn+'08',color:$text,outline:'none',marginBottom:3}}>
                        <option value="">— Sélectionner un poste alternatif —</option>
                        <option value="__libre__">✎ Saisie libre</option>
                        <optgroup label="Postes ouverts">{postes.filter(p=>['ouvert','recrutement','a_creer','gele','remplacement_temp'].includes(p.statut)).map(p=><option key={p.id} value={p.titre}>{p.titre} — {filialesDynamiques.find(f=>f.id===p.filialeId)?.nom||''}</option>)}</optgroup>
                        <optgroup label="Tous les postes">{postes.filter(p=>!['ouvert','recrutement','a_creer','gele','remplacement_temp'].includes(p.statut)).map(p=><option key={p.id} value={p.titre}>{p.titre} — {p.statut}</option>)}</optgroup>
                      </select>
                      {(recruEdit.posteAProposer==='__libre__'||(!postes.find(p=>p.titre===recruEdit.posteAProposer)&&recruEdit.posteAProposer&&recruEdit.posteAProposer!==''))&&<input value={recruEdit.posteAProposer==='__libre__'?'':recruEdit.posteAProposer||''} onChange={e=>setRecruEdit({...recruEdit,posteAProposer:e.target.value})} placeholder="Tapez le poste alternatif..." style={{width:'100%',padding:'5px 10px',borderRadius:crmRd,border:`1px solid ${$warn}`,fontSize:'0.75rem',fontFamily:'inherit',background:$warn+'08',color:$text,outline:'none',boxSizing:'border-box'}}/>}
                    </div>}
                    <button onClick={()=>setRecruEdit({...recruEdit,posteAProposer:recruEdit.posteAProposer!==undefined?undefined:''})} style={{marginTop:4,padding:'2px 8px',borderRadius:crmRd,border:`1px solid ${$borderLight}`,background:'transparent',fontSize:'0.62rem',color:$info,cursor:'pointer',fontFamily:'inherit'}}>{recruEdit.posteAProposer!==undefined?'✕ Annuler poste alternatif':'+ Proposer un autre poste'}</button>
                  </div>
                  :f.type==='select'?<select value={recruEdit[f.k]||''} onChange={e=>setRecruEdit({...recruEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{(f.opts||[]).map((o,i)=><option key={o} value={o}>{f.labels?f.labels[i]:o}</option>)}</select>
                  :f.type==='textarea'?<textarea value={recruEdit[f.k]||''} onChange={e=>setRecruEdit({...recruEdit,[f.k]:e.target.value})} rows={2} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
                  :f.type==='number'?<input type="number" value={recruEdit[f.k]||0} onChange={e=>setRecruEdit({...recruEdit,[f.k]:parseFloat(e.target.value)||0})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :f.type==='date'?<input type="date" value={recruEdit[f.k]||''} onChange={e=>setRecruEdit({...recruEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>
                  :<input value={recruEdit[f.k]||''} onChange={e=>{let v=e.target.value;if(f.transform==='uppercase')v=v.toUpperCase();if(f.transform==='titlecase')v=v.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(' ');setRecruEdit({...recruEdit,[f.k]:v});}} style={{width:'100%',padding:'7px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/>}
                </div>))}
            </div>
            <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
              <div>{activeCandidats.find(c=>c.id===recruEdit.id)&&<button onClick={()=>{saveCands(activeCandidats.filter(c=>c.id!==recruEdit.id));setRecruEdit(null);setRecruDetail(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Supprimer</button>}</div>
              <div style={{display:'flex',gap:6}}><button onClick={()=>setRecruEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Annuler</button><button onClick={()=>{const ex=activeCandidats.find(c=>c.id===recruEdit.id);if(ex){saveCands(activeCandidats.map(c=>c.id===recruEdit.id?{...recruEdit,nom:`${recruEdit.prenom||''} ${recruEdit.nomFamille||''}`.trim()||recruEdit.nom}:c));}else{saveCands([...activeCandidats,{...recruEdit,nom:`${recruEdit.prenom||''} ${recruEdit.nomFamille||''}`.trim()||recruEdit.nom}]);}setRecruEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Enregistrer</button></div>
            </div>
          </div></div>)}
          </div>

          {/* ═══ RIGHT: DETAIL PANEL ═══ */}
          {sel && (<div style={{width:400,flexShrink:0,borderLeft:`1px solid ${$border}`,background:$bgCard,overflow:'auto',boxShadow:'-4px 0 20px rgba(0,0,0,0.04)'}}>
            {/* Header */}
            <div style={{padding:'16px 20px',borderBottom:`1px solid ${$border}`,background:$bgSub}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>{sel.photoUrl?<img src={sel.photoUrl} style={{width:40,height:40,borderRadius:'50%',objectFit:'cover',border:`2px solid ${$border}`}}/>:<div style={{width:40,height:40,borderRadius:'50%',background:$bgSub,border:`2px solid ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',fontWeight:800,color:$textMut}}>{(sel.nom||'').split(' ').map(w=>w[0]).join('').slice(0,2)}</div>}<div style={{fontSize:'1.1rem',fontWeight:800,color:$text}}>{sel.nom}</div></div>
                  <div style={{fontSize:'0.82rem',color:$accent,marginTop:2}}>{sel.poste} — {sel.filiale}</div>
                </div>
                <div style={{display:'flex',gap:4}}>
                  <button onClick={()=>setRecruEdit({...sel})} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Modifier</button>
                  <button onClick={()=>setRecruDetail(null)} style={{background:'none',border:'none',fontSize:'1rem',cursor:'pointer',color:$textMut}}>✕</button>
                </div>
              </div>
              <div style={{display:'flex',gap:4,marginTop:10,flexWrap:'wrap'}}>
                {(() => {const et=RECRU_ETAPES.find(e=>e.id===sel.etape); return <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:et.color+'18',color:et.color,fontWeight:700,fontSize:'0.72rem'}}>{et.icon} {et.label}</span>;})()}
                <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:prioC(sel.priorite)+'15',color:prioC(sel.priorite),fontWeight:700,fontSize:'0.72rem'}}>Priorité {sel.priorite}</span>
                {calcScore(sel.scorecard)>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:scoreColor(calcScore(sel.scorecard))+'15',color:scoreColor(calcScore(sel.scorecard)),fontWeight:700,fontSize:'0.72rem'}}>Score {calcScore(sel.scorecard)}%</span>}
                {sel.etape==='embauche'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:$success+'15',color:$success,fontWeight:700,fontSize:'0.72rem',cursor:'pointer'}} onClick={()=>launchOnboarding(sel)}>🚀 Lancer Onboarding</span>}
                {(sel.etape==='proposition')&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,background:$warn+'15',color:$warn,fontWeight:700,fontSize:'0.72rem'}}>▫ Proposition en cours</span>}
              </div>
            </div>
            {/* Tabs */}
            <div style={{display:'flex',borderBottom:`1px solid ${$border}`,background:$bgSub+'80'}}>
              {[{id:'profil',l:'Profil'},{id:'scorecard',l:'Scorecard'},{id:'entretiens',l:'Entretiens'},{id:'fichiers',l:'Fichiers & IA'},{id:'actions',l:'Actions'},{id:'timeline',l:'Historique'}].map(t=>(
                <button key={t.id} onClick={()=>setRecruDetailTab(t.id)} style={{flex:1,padding:'10px 8px',border:'none',borderBottom:recruDetailTab===t.id?`2px solid ${$accent}`:'2px solid transparent',background:'transparent',color:recruDetailTab===t.id?$accent:$textMut,fontWeight:recruDetailTab===t.id?700:400,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{t.l}</button>
              ))}
            </div>
            {/* Tab Content */}
            <div style={{padding:'16px 20px'}}>
              {/* PROFIL */}
              {recruDetailTab==='profil'&&(<div style={{display:'flex',flexDirection:'column',gap:12}}>
                {[{l:'Email',v:sel.email,icon:'📧'},{l:'Téléphone',v:sel.tel,icon:'📱'},{l:'Ville',v:sel.villeCandidat,icon:'📍'},{l:'LinkedIn',v:sel.linkedin,icon:'🔗'},{l:'Poste visé',v:sel.poste,icon:'▪',link:sel.posteId?()=>{setOngletActif('postes');setPosteSelectionne(sel.posteId);}:null},{l:'Poste à proposer',v:sel.posteAProposer||null,icon:'↻'},{l:'Source',v:sel.source,icon:'📡'},{l:'Adresse',v:sel.adresse||null,icon:'🏠'},{l:'Date de naissance',v:sel.dateNaissance||null,icon:'🎂'},{l:'Nationalité',v:sel.nationalite||null,icon:'🌍'},{l:'Permis',v:sel.permis||null,icon:'🚗'},{l:'Formations',v:sel.formations||null,icon:'🎓'},{l:'Langues',v:sel.langues||null,icon:'🗣️'},{l:'Disponibilité',v:sel.disponibilite,icon:'◫'},{l:'Prétention salariale',v:sel.pretentionSalariale?`${sel.pretentionSalariale.toLocaleString('fr-FR')}€ brut/an`:'—',icon:'€'},{l:'Date candidature',v:sel.dateCandidat,icon:'☰'}].filter(f=>f.v!==null&&f.v!==undefined&&f.v!=='').map((f,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontSize:'0.85rem',width:24,textAlign:'center'}}>{f.icon}</span>
                    <div><div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>{f.l}</div><div style={{fontSize:'0.82rem',color:$text,fontWeight:500}}>{f.v||'—'}</div></div>
                  </div>
                ))}
                {sel.notes&&<div style={{marginTop:8,padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.65rem',color:$textMut,fontWeight:600,textTransform:'uppercase',marginBottom:6}}>Notes</div>
                  <div style={{fontSize:'0.78rem',color:$textSec,lineHeight:1.5}}>{sel.notes}</div>
                </div>}
                {sel.motifRefus&&<div style={{marginTop:4,padding:'12px 14px',background:$danger+'08',borderRadius:crmRd,borderLeft:`3px solid ${$danger}`}}>
                  <div style={{fontSize:'0.65rem',color:$danger,fontWeight:600,textTransform:'uppercase',marginBottom:4}}>Motif du refus</div>
                  <div style={{fontSize:'0.78rem',color:$text}}>{sel.motifRefus}</div>
                </div>}
              </div>)}
              {/* SCORECARD */}
              {recruDetailTab==='scorecard'&&(<div>
                {sel.scorecard&&sel.scorecard.length>0?(<div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{textAlign:'center',marginBottom:8}}>
                    <div style={{fontSize:'2rem',fontWeight:900,color:scoreColor(calcScore(sel.scorecard))}}>{calcScore(sel.scorecard)}%</div>
                    <div style={{fontSize:'0.72rem',color:$textMut}}>Score global pondéré</div>
                  </div>
                  {SCORE_CRITERES.map(cr=>{
                    const s=sel.scorecard.find(s=>s.criteriaId===cr.id);
                    const note=s?.note||0;
                    return (<div key={cr.id} style={{padding:'10px 12px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                        <span style={{fontSize:'0.75rem',fontWeight:600,color:$text}}>{cr.label}</span>
                        <div style={{display:'flex',gap:2}}>{[1,2,3,4,5].map(n=><span key={n} onClick={()=>{const newSc=[...(sel.scorecard||[])];const idx=newSc.findIndex(x=>x.criteriaId===cr.id);if(idx>=0)newSc[idx]={...newSc[idx],note:n};else newSc.push({criteriaId:cr.id,note:n,commentaire:''});saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,scorecard:newSc}:c));}} style={{cursor:'pointer',fontSize:'0.9rem',color:n<=note?scoreColor(note*20):'#e8e4de',transition:'color 0.1s'}}>★</span>)}</div>
                      </div>
                      <div style={{height:4,background:$bgCard,borderRadius:2,overflow:'hidden'}}>
                        <div style={{width:`${note*20}%`,height:'100%',background:scoreColor(note*20),borderRadius:2,transition:'width 0.3s'}}/>
                      </div>
                      {s?.commentaire&&<div style={{fontSize:'0.68rem',color:$textMut,marginTop:4,fontStyle:'italic'}}>{s.commentaire}</div>}
                      <div style={{fontSize:'0.58rem',color:$textMut,marginTop:2}}>Poids: ×{cr.poids}</div>
                    </div>);
                  })}
                </div>):(<div style={{textAlign:'center',padding:30,color:$textMut}}>
                  <div style={{fontSize:'1.5rem',marginBottom:8}}>▦</div>
                  <div style={{fontSize:'0.82rem',fontWeight:600}}>Pas encore évalué</div>
                  <div style={{fontSize:'0.72rem',marginTop:4}}>Cliquez sur les étoiles pour noter chaque critère</div>
                </div>)}
              </div>)}
              {/* ENTRETIENS */}
              {recruDetailTab==='entretiens'&&(<div style={{display:'flex',flexDirection:'column',gap:10}}>
                {sel.entretiens&&sel.entretiens.length>0?sel.entretiens.map(ent=>{
                  const statColor=ent.statut==='fait'?$success:ent.statut==='planifie'?$info:$textMut;
                  return (<div key={ent.id} style={{padding:'12px 14px',borderRadius:crmRd,border:`1px solid ${$borderLight}`,background:$bgSub}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                      <span style={{fontWeight:700,fontSize:'0.8rem',color:$text}}>{ent.type==='tel'?'✆ Téléphone':ent.type==='visio'?'💻 Visio':'🤝 Physique'}</span>
                      <span style={{padding:'2px 8px',borderRadius:crmRd>0?12:2,background:statColor+'15',color:statColor,fontWeight:600,fontSize:'0.68rem'}}>{ent.statut==='fait'?'Réalisé':'Planifié'}</span>
                    </div>
                    <div style={{fontSize:'0.75rem',color:$textSec}}>{ent.date} à {ent.heure} — {ent.intervieweur?empNom(ent.intervieweur):'—'}</div>
                    {ent.notes&&<div style={{fontSize:'0.72rem',color:$textMut,marginTop:6,lineHeight:1.4,fontStyle:'italic'}}>"{ent.notes}"</div>}
                    {ent.note>0&&<div style={{marginTop:6,display:'flex',gap:1}}>{[1,2,3,4,5].map(n=><span key={n} style={{fontSize:'0.85rem',color:n<=ent.note?'#d4a030':'#e8e4de'}}>★</span>)}</div>}
                  </div>);
                }):(<div style={{textAlign:'center',padding:30,color:$textMut}}>
                  <div style={{fontSize:'1.5rem',marginBottom:8}}>🗣️</div>
                  <div style={{fontSize:'0.82rem',fontWeight:600}}>Aucun entretien</div>
                </div>)}
              </div>)}
              {/* TIMELINE */}
              {/* FICHIERS & IA */}
              {recruDetailTab==='fichiers'&&(<div style={{display:'flex',flexDirection:'column',gap:14}}>
                {/* Photo candidat */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>Photo candidat</div>
                  </div>
                  {!sel.photoUrl&&sel.timeline?.some(t=>t.action?.includes('Photo détectée'))&&<div style={{padding:'8px 12px',background:$warn+'10',border:`1px solid ${$warn}30`,borderRadius:crmRd,marginBottom:8}}>
                    <div style={{fontSize:'0.72rem',fontWeight:600,color:$warn,marginBottom:4}}>📷 Photo détectée dans le CV !</div>
                    <div style={{fontSize:'0.65rem',color:$text,lineHeight:1.4}}>L'IA a repéré une photo dans le CV mais ne peut pas l'extraire automatiquement. Pour l'ajouter :</div>
                    <div style={{fontSize:'0.62rem',color:$textSec,marginTop:4,lineHeight:1.5}}>1. Ouvrez le CV ci-dessous ("Ouvrir ↗")<br/>2. Faites une capture d'écran de la photo<br/>3. Cliquez "▸ Importer photo" ci-dessous</div>
                  </div>}
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    {sel.photoUrl?<img src={sel.photoUrl} style={{width:64,height:64,borderRadius:'50%',objectFit:'cover',border:`2px solid ${$border}`}}/>:<div style={{width:64,height:64,borderRadius:'50%',background:$bgCard,border:`2px dashed ${$border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',color:$textMut}}>📷</div>}
                    <div style={{flex:1}}>
                      <div style={{fontSize:'0.58rem',color:$textMut,marginBottom:4,lineHeight:1.4}}>
                        ✧ <strong>LinkedIn</strong> : Ouvrez le profil → clic droit sur la photo → "Copier l'adresse de l'image" → collez ci-dessous<br/>
                        ✧ <strong>CV</strong> : Ouvrez le CV → capture d'écran de la photo → "Importer photo"
                      </div>
                      <input placeholder="Collez l'URL de la photo ici (clic droit → Copier l'adresse de l'image)" value={sel.photoUrl||''} onChange={e=>{saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,photoUrl:e.target.value}:c));}} style={{width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.75rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',marginBottom:4,boxSizing:'border-box'}}/>
                      <div style={{display:'flex',gap:6,alignItems:'center'}}>
                        <label style={{padding:'4px 12px',borderRadius:crmRd,border:`1px dashed ${$accent}`,background:$accent+'05',fontSize:'0.65rem',fontWeight:600,color:$accent,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                          ▸ Importer photo
                          <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const file=e.target.files?.[0];if(file){const reader=new FileReader();reader.onload=(ev)=>{saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,photoUrl:ev.target.result}:c));};reader.readAsDataURL(file);}}}/>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents / Fichiers */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>Documents</div>
                    <button onClick={()=>{setRecruAddingFichier(p=>!p);if(!recruAddingFichier){setRecruFichierType('cv');setRecruNewFichier('');setRecruFichierUrl('');}}} style={{padding:'3px 10px',borderRadius:crmRd,border:`1px solid ${recruAddingFichier?$accent:$border}`,background:recruAddingFichier?$accentSub:$bgCard,fontSize:'0.68rem',fontWeight:600,color:$accent,cursor:'pointer',fontFamily:'inherit'}}>+ Ajouter</button>
                  </div>
                  {recruAddingFichier&&<div style={{padding:'10px 12px',background:$bgCard,borderRadius:crmRd,border:`1px solid ${$accent}30`,marginBottom:8}}>
                    <div style={{fontSize:'0.65rem',color:$textMut,marginBottom:6}}>Type de document :</div>
                    <div style={{display:'flex',gap:4,marginBottom:8,flexWrap:'wrap'}}>
                      {[{v:'cv',l:'▫ CV'},{v:'lettre',l:'✉️ Lettre motiv.'},{v:'photo',l:'📷 Photo'},{v:'capture',l:'📸 Capture LinkedIn'},{v:'promesse',l:'☰ Promesse embauche'},{v:'test',l:'✎ Test technique'},{v:'autre',l:'§ Autre'}].map(t=>(
                        <button key={t.v} onClick={()=>{setRecruFichierType(t.v);if(!recruNewFichier){const nameMap={cv:`CV_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,lettre:`LM_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,photo:`Photo_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,capture:`LinkedIn_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,promesse:`Promesse_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,test:`Test_${(sel.nomFamille||sel.nom||'').replace(/\s/g,'_')}`,autre:''};setRecruNewFichier(nameMap[t.v]||'');}}} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${recruFichierType===t.v?$accent:$border}`,background:recruFichierType===t.v?$accent+'15':'transparent',color:recruFichierType===t.v?$accent:$textSec,fontSize:'0.65rem',fontWeight:recruFichierType===t.v?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.1s'}}>{t.l}</button>
                      ))}
                    </div>
                    <div style={{fontSize:'0.65rem',color:$textMut,marginBottom:4}}>Nom du document :</div>
                    <input value={recruNewFichier} onChange={e=>setRecruNewFichier(e.target.value)} placeholder="Nom du fichier (ex: CV_Martin_Dubois.pdf)" onKeyDown={e=>{if(e.key==='Enter'&&recruNewFichier.trim()){const newF={id:'F'+Date.now(),type:recruFichierType||'autre',nom:recruNewFichier.trim(),url:recruFichierUrl||'',date:new Date().toISOString().slice(0,10)};setCandidats(prev=>{const base=prev||defaultCandidats;const updated=base.map(c=>c.id===sel.id?{...c,fichiers:[...(c.fichiers||[]),newF]}:c);return updated;});setRecruNewFichier('');setRecruFichierUrl('');setRecruAddingFichier(false);}}} style={{width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,fontSize:'0.72rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box',marginBottom:4}}/>
                    <input value={recruFichierUrl||''} onChange={e=>setRecruFichierUrl(e.target.value)} placeholder="Lien du fichier : Google Drive, Dropbox, ou URL directe (optionnel)" style={{width:'100%',padding:'6px 10px',borderRadius:crmRd,border:`1px solid ${$borderLight}`,fontSize:'0.68rem',fontFamily:'inherit',background:$bgSub,color:$textSec,outline:'none',boxSizing:'border-box',marginBottom:6}}/>
                    <div style={{display:'flex',gap:4,marginBottom:6}}>
                      <label style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:6,padding:'8px 12px',borderRadius:crmRd,border:`2px dashed ${$border}`,background:$bgSub,cursor:'pointer',transition:'all 0.15s',fontSize:'0.7rem',fontWeight:600,color:$textSec}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=$accent;e.currentTarget.style.color=$accent;}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.color=$textSec;}}
                      >
                        <span style={{fontSize:'1rem'}}>▸</span> Choisir un fichier
                        <input type="file" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp" style={{display:'none'}} onChange={async(e)=>{const file=e.target.files?.[0];if(!file)return;const typeMap={'application/pdf':'cv','image/jpeg':'photo','image/png':'photo','image/webp':'photo'};const autoType=typeMap[file.type]||recruFichierType||'autre';let dataUrl='';if(file.size<500000){try{dataUrl=await new Promise((r2,j2)=>{const rd=new FileReader();rd.onload=()=>r2(rd.result);rd.onerror=()=>j2('err');rd.readAsDataURL(file);});}catch(ex){}}const fId='F'+Date.now();const newFichier={id:fId,type:autoType,nom:file.name,url:'',dataUrl:dataUrl||'',date:new Date().toISOString().slice(0,10),size:file.size};setCandidats(prev=>{const base=prev||defaultCandidats;return base.map(c=>c.id===sel.id?{...c,fichiers:[...(c.fichiers||[]),newFichier]}:c);});setRecruAddingFichier(false);setRecruNewFichier('');setRecruFichierUrl('');e.target.value='';}}/>  
                      </label>
                      <div style={{flex:1,fontSize:'0.62rem',color:$textMut,display:'flex',alignItems:'center'}}> ou remplissez le nom + lien ci-dessus</div>
                    </div>
                    <div style={{display:'flex',gap:4,justifyContent:'flex-end'}}>
                      <button onClick={()=>{setRecruAddingFichier(false);setRecruNewFichier('');setRecruFichierUrl('');}} style={{padding:'4px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.68rem',color:$textSec,cursor:'pointer',fontFamily:'inherit'}}>Annuler</button>
                      <button onClick={()=>{if(recruNewFichier.trim()){const newF={id:'F'+Date.now(),type:recruFichierType||'autre',nom:recruNewFichier.trim(),url:recruFichierUrl||'',date:new Date().toISOString().slice(0,10)};setCandidats(prev=>{const base=prev||defaultCandidats;const updated=base.map(c=>c.id===sel.id?{...c,fichiers:[...(c.fichiers||[]),newF]}:c);return updated;});setRecruNewFichier('');setRecruFichierUrl('');setRecruAddingFichier(false);}}} style={{padding:'4px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontSize:'0.68rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:recruNewFichier.trim()?1:0.4}}>Ajouter</button>
                    </div>
                  </div>}
                  {sel.fichiers&&sel.fichiers.length>0?(<div style={{display:'flex',flexDirection:'column',gap:4}}>
                    {sel.fichiers.map((f,i)=>{
                      const typeIcons={cv:'▫',photo:'📷',capture:'📸',lettre:'✉️',autre:'§',promesse:'☰',test:'✎'};
                      const typeColors={cv:$accent,photo:'#8b5cf6',capture:'#0ea5e9',lettre:$warn,autre:$textMut,promesse:$success,test:'#ec4899'};
                      return (<div key={f.id||i} onClick={()=>{if(f.dataUrl&&f.dataUrl.length>10)setRecruFileViewer({nom:f.nom,dataUrl:f.dataUrl,type:f.type});else if(f.url)window.open(f.url.startsWith('http')?f.url:'https://'+f.url,'_blank');}} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderRadius:crmRd,background:$bgCard,border:`1px solid ${$borderLight}`,cursor:f.dataUrl||f.url?'pointer':'default',transition:'all 0.15s'}}
                        onMouseEnter={e=>{if(f.dataUrl||f.url)e.currentTarget.style.borderColor=$accent;}}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=$borderLight}>
                        <span style={{fontSize:'1rem'}}>{typeIcons[f.type]||'§'}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:'0.75rem',fontWeight:600,color:$text}}>{f.url?<a href={f.url} target="_blank" rel="noopener" style={{color:$accent,textDecoration:'none'}} onMouseEnter={e=>e.currentTarget.style.textDecoration='underline'} onMouseLeave={e=>e.currentTarget.style.textDecoration='none'}>{f.nom} ↗</a>:f.nom}</div>
                          <div style={{fontSize:'0.62rem',color:$textMut}}>{f.type?.toUpperCase()} — {f.date}{f.dataUrl&&f.dataUrl.length>10?' — ↧ Téléchargé':f.url?' — 🔗 Lien disponible':' — § Ajouté'}{f.size?` — ${(f.size/1024).toFixed(0)} Ko`:''}</div>
                        </div>
                        <div style={{display:'flex',gap:3}}>{(f.url||f.dataUrl)&&<button onClick={e2=>{e2.stopPropagation();if(f.dataUrl&&f.dataUrl.length>10)setRecruFileViewer({nom:f.nom,dataUrl:f.dataUrl,type:f.type});else if(f.url)window.open(f.url.startsWith('http')?f.url:'https://'+f.url,'_blank');}} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$accent}30`,background:$accent+'08',fontSize:'0.6rem',fontWeight:600,color:$accent,cursor:'pointer',fontFamily:'inherit'}}>{f.dataUrl&&f.dataUrl.length>10?'Ouvrir ↗':'Lien ↗'}</button>}{f.dataUrl&&<button onClick={e2=>{e2.stopPropagation();const a=document.createElement('a');a.href=f.dataUrl;a.download=f.nom;document.body.appendChild(a);a.click();document.body.removeChild(a);}} style={{padding:'2px 6px',borderRadius:crmRd,border:`1px solid ${$success}30`,background:$success+'08',fontSize:'0.6rem',fontWeight:600,color:$success,cursor:'pointer',fontFamily:'inherit'}}>Télécharger ↓</button>}<button onClick={e2=>{e2.stopPropagation();saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,fichiers:c.fichiers.filter((_,j)=>j!==i)}:c));}} style={{background:'none',border:'none',fontSize:'0.7rem',color:$danger,cursor:'pointer',fontFamily:'inherit'}}>✕</button></div>
                      </div>);
                    })}
                  </div>):(<div style={{textAlign:'center',padding:16,color:$textMut,fontSize:'0.75rem'}}>Aucun document — cliquez + Ajouter</div>)}
                </div>

                {/* IA — Résumé CV */}
                <div style={{padding:'12px 14px',background:`linear-gradient(135deg, ${$info}08, ${$accent}05)`,borderRadius:crmRd,border:`1px solid ${$info}30`}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
                    <span style={{fontSize:'0.9rem'}}>🤖</span>
                    <div style={{fontSize:'0.68rem',color:$info,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.04em'}}>IA Co-pilot</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    <button onClick={async()=>{setRecruIaLoading(true);setRecruIaResult(null);try{const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert RH dans le BTP en France. Analyse ce profil candidat et génère un résumé structuré :\n\nNom: ${sel.nom}\nPoste visé: ${sel.poste}\nFiliale: ${sel.filiale}\nSource: ${sel.source}\nExpérience/Notes: ${sel.notes}\nPrétention salariale: ${sel.pretentionSalariale||'Non renseigné'}€\nDisponibilité: ${sel.disponibilite||'Non renseignée'}\nVille: ${sel.villeCandidat||'Non renseignée'}\nScorecard: ${JSON.stringify(sel.scorecard?.map(s=>({critere:SCORE_CRITERES.find(c=>c.id===s.criteriaId)?.label,note:s.note,commentaire:s.commentaire}))||[])}\n\nGénère :\n1. RÉSUMÉ (3-4 lignes synthétiques)\n2. POINTS FORTS (bullet points)\n3. POINTS D'ATTENTION (bullet points)\n4. RECOMMANDATION (Embaucher / Entretien approfondi / Vivier / Refuser)\n5. QUESTIONS À POSER en entretien (5 questions ciblées pour ce profil BTP)`}]})});const data=await resp.json();setRecruIaResult(data.content[0]?.text||'Erreur IA');}catch(err){setRecruIaResult('Erreur: '+err.message);}setRecruIaLoading(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$info}40`,background:$bgCard,cursor:recruIaLoading?'wait':'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left',opacity:recruIaLoading?0.6:1}}
                      onMouseEnter={e=>{if(!recruIaLoading)e.currentTarget.style.borderColor=$info;}}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$info+'40'}
                    >
                      <span style={{fontSize:'1.1rem'}}>{recruIaLoading?'⏳':'▦'}</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$info}}>{recruIaLoading?'Analyse en cours...':'Analyser le profil + Questions entretien'}</div><div style={{fontSize:'0.62rem',color:$textMut}}>Résumé IA, points forts/faibles, recommandation, questions ciblées</div></div>
                    </button>

                    <button onClick={async()=>{setRecruIaLoading(true);setRecruIaResult(null);try{const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert recrutement BTP en France. Génère une fiche d'évaluation d'entretien pour ce poste :\n\nPoste: ${sel.poste}\nFiliale: ${sel.filiale} (Group OY — entreprise BTP multi-filiales)\nProfil candidat: ${sel.notes}\n\nGénère un KIT D'ENTRETIEN complet :\n1. PRÉSENTATION DU POSTE (3 lignes — ce qu'on attend)\n2. COMPÉTENCES TECHNIQUES à évaluer (5 items avec barème 1-5)\n3. QUESTIONS COMPORTEMENTALES (5 questions STAR method)\n4. MISE EN SITUATION BTP (2 cas pratiques terrain)\n5. GRILLE DE NOTATION à remplir\n6. RED FLAGS à surveiller`}]})});const data=await resp.json();setRecruIaResult(data.content[0]?.text||'Erreur IA');}catch(err){setRecruIaResult('Erreur: '+err.message);}setRecruIaLoading(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$accent}40`,background:$bgCard,cursor:recruIaLoading?'wait':'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left',opacity:recruIaLoading?0.6:1}}
                      onMouseEnter={e=>{if(!recruIaLoading)e.currentTarget.style.borderColor=$accent;}}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$accent+'40'}
                    >
                      <span style={{fontSize:'1.1rem'}}>{recruIaLoading?'⏳':'🗣️'}</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$accent}}>{recruIaLoading?'Génération en cours...':'Générer un Kit d\'Entretien IA'}</div><div style={{fontSize:'0.62rem',color:$textMut}}>Questions, mise en situation, grille de notation BTP</div></div>
                    </button>

                    <button onClick={async()=>{setRecruIaLoading(true);setRecruIaResult(null);try{const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert RH. Rédige une promesse d'embauche professionnelle pour :\n\nCandidat: ${sel.nom}\nPoste: ${sel.poste}\nFiliale: ${sel.filiale}\nAdresse filiale: Strasbourg\nRémunération brute annuelle: ${sel.pretentionSalariale||35000}€\nDate de prise de poste: À définir\nType de contrat: CDI\nConvention collective: Bâtiment et Travaux Publics\nPériode d'essai: 2 mois (renouvelable 1 fois)\n\nEntreprise: Group OY\nPDG: Özdoğan YILMAZ\n\nRédige la promesse d'embauche complète et formelle, conforme au droit du travail français.`}]})});const data=await resp.json();setRecruIaResult(data.content[0]?.text||'Erreur IA');}catch(err){setRecruIaResult('Erreur: '+err.message);}setRecruIaLoading(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$success}40`,background:$bgCard,cursor:recruIaLoading?'wait':'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left',opacity:recruIaLoading?0.6:1}}
                      onMouseEnter={e=>{if(!recruIaLoading)e.currentTarget.style.borderColor=$success;}}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$success+'40'}
                    >
                      <span style={{fontSize:'1.1rem'}}>{recruIaLoading?'⏳':'🎉'}</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$success}}>{recruIaLoading?'Rédaction en cours...':'Générer Promesse d\'Embauche IA'}</div><div style={{fontSize:'0.62rem',color:$textMut}}>Document conforme au droit du travail français</div></div>
                    </button>
                  </div>

                  {/* IA Result */}
                  {recruIaResult&&(<div style={{marginTop:12,padding:'14px 16px',background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,maxHeight:400,overflow:'auto'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <div style={{fontSize:'0.72rem',fontWeight:700,color:$info}}>Résultat IA</div>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>{navigator.clipboard.writeText(recruIaResult);}} style={{padding:'2px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.62rem',fontWeight:600,color:$textSec,cursor:'pointer',fontFamily:'inherit'}}>☰ Copier</button>
                        <button onClick={()=>setRecruIaResult(null)} style={{padding:'2px 8px',borderRadius:crmRd,border:'none',background:'transparent',fontSize:'0.62rem',color:$textMut,cursor:'pointer',fontFamily:'inherit'}}>✕</button>
                      </div>
                    </div>
                    <pre style={{fontSize:'0.72rem',color:$text,lineHeight:1.6,whiteSpace:'pre-wrap',wordBreak:'break-word',fontFamily:'inherit',margin:0}}>{recruIaResult}</pre>
                  </div>)}
                </div>
              </div>)}
                            {/* ACTIONS */}
              {recruDetailTab==='actions'&&(<div style={{display:'flex',flexDirection:'column',gap:12}}>
                {/* Changer d'étape */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>Déplacer vers l'étape</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                    {RECRU_ETAPES.map(et=>(
                      <button key={et.id} onClick={()=>{saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,etape:et.id,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:et.id==='embauche'?'✓ Embauché':`Déplacé vers ${et.label}`}]}:c));if(et.id==='embauche'&&sel.posteId){setPostes(prev=>prev.map(px=>px.id===sel.posteId?{...px,statut:'pourvu',historique:[...(px.historique||[]),{date:new Date().toISOString().slice(0,10),action:'✓ Poste pourvu — '+(sel.nom||'candidat')+' embauché',par:currentUser?.prenom||''}]}:px));}}} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${sel.etape===et.id?et.color:$border}`,background:sel.etape===et.id?et.color+'18':'transparent',color:sel.etape===et.id?et.color:$textSec,fontSize:'0.68rem',fontWeight:sel.etape===et.id?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{et.icon} {et.label}</button>
                    ))}
                  </div>
                </div>

                {/* Lancer Onboarding */}
                {(sel.etape==='proposition'||sel.etape==='embauche')&&<div style={{padding:'12px 14px',background:`linear-gradient(135deg, ${$success}08, ${$success}04)`,borderRadius:crmRd,border:`1px solid ${$success}30`}}>
                  <div style={{fontSize:'0.68rem',color:$success,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>🎉 Intégration</div>
                  <button onClick={()=>launchOnboarding(sel)} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 16px',borderRadius:crmRd,border:`1px solid ${$success}`,background:$success+'10',cursor:'pointer',fontFamily:'inherit',transition:'all 0.2s',textAlign:'left',width:'100%'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=$success+'20';e.currentTarget.style.transform='translateY(-1px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background=$success+'10';e.currentTarget.style.transform='none';}}
                  >
                    <div style={{width:40,height:40,borderRadius:crmRd,background:$success+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>🚀</div>
                    <div>
                      <div style={{fontSize:'0.85rem',fontWeight:700,color:$success}}>Lancer l'Onboarding</div>
                      <div style={{fontSize:'0.65rem',color:$textMut,marginTop:2}}>Créer le parcours d'intégration avec checklist BTP pour {sel.nom}</div>
                      <div style={{fontSize:'0.6rem',color:$success,marginTop:3,fontWeight:500}}>Type détecté : {mapPosteToObType(sel.poste)==='ouvrier_btp'?'Ouvrier BTP':mapPosteToObType(sel.poste)==='chef_chantier'?'Chef de chantier':mapPosteToObType(sel.poste)==='charge_affaires'?'Chargé d\'affaires':mapPosteToObType(sel.poste)==='conducteur_travaux'?'Conducteur de travaux':mapPosteToObType(sel.poste)==='assistante_admin'?'Assistante administrative':'Direction / Cadre'}</div>
                    </div>
                  </button>
                </div>}

                {/* Communication — Email */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>Communication</div>
                  <div style={{display:'flex',flexDirection:'column',gap:6}}>
                    <button onClick={()=>{const mailto=`mailto:${sel.email}?subject=${encodeURIComponent(`Candidature ${sel.poste} — Group OY`)}&body=${encodeURIComponent(`Bonjour ${sel.nom},\n\nNous avons bien reçu votre candidature pour le poste de ${sel.poste}.\n\nCordialement,\nService RH — Group OY`)}`;window.open(mailto);saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`Email envoyé à ${sel.email}`}]}:c));}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=$accent}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$border}
                    >
                      <span style={{fontSize:'1.1rem'}}>📧</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$text}}>Envoyer un email</div><div style={{fontSize:'0.65rem',color:$textMut}}>{sel.email||'Pas d\'email renseigné'}</div></div>
                    </button>

                    <button onClick={()=>{const smsUrl=`sms:${sel.tel}?body=${encodeURIComponent(`Bonjour ${sel.nom}, nous vous contactons concernant votre candidature pour le poste de ${sel.poste} chez Group OY. Cordialement, Service RH.`)}`;window.open(smsUrl);saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`SMS envoyé à ${sel.tel}`}]}:c));}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=$accent}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$border}
                    >
                      <span style={{fontSize:'1.1rem'}}>💬</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$text}}>Envoyer un SMS</div><div style={{fontSize:'0.65rem',color:$textMut}}>{sel.tel||'Pas de téléphone'}</div></div>
                    </button>

                    {sel.linkedin&&<button onClick={()=>window.open(sel.linkedin.startsWith('http')?sel.linkedin:`https://${sel.linkedin}`,'_blank')} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor='#0077b5'}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=$border}
                    >
                      <span style={{fontSize:'1.1rem'}}>🔗</span>
                      <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$text}}>Voir profil LinkedIn</div><div style={{fontSize:'0.65rem',color:'#0077b5'}}>{sel.linkedin}</div></div>
                    </button>}
                  </div>
                </div>

                {/* Planifier entretien — Calendly */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>Planifier un entretien</div>
                  <button onClick={()=>{const mailto=`mailto:${sel.email}?subject=${encodeURIComponent(`Entretien — ${sel.poste} — Group OY`)}&body=${encodeURIComponent(`Bonjour ${sel.nom},\n\nSuite à votre candidature pour le poste de ${sel.poste}, nous souhaiterions vous rencontrer.\n\nMerci de choisir un créneau via le lien suivant :\nhttps://calendly.com/rh-groupoy/entretien\n\nCordialement,\nService RH — Group OY`)}`;window.open(mailto);saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`Lien Calendly envoyé pour entretien`}]}:c));}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$info}40`,background:$info+'08',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left',width:'100%'}}
                    onMouseEnter={e=>e.currentTarget.style.background=$info+'15'}
                    onMouseLeave={e=>e.currentTarget.style.background=$info+'08'}
                  >
                    <span style={{fontSize:'1.1rem'}}>◫</span>
                    <div><div style={{fontSize:'0.78rem',fontWeight:600,color:$info}}>Envoyer lien Calendly</div><div style={{fontSize:'0.65rem',color:$textMut}}>Le candidat choisit sa date d'entretien</div></div>
                  </button>
                </div>

                {/* Emails automatiques par étape */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>Emails automatiques</div>
                  <div style={{display:'flex',flexDirection:'column',gap:4}}>
                    {[
                      {label:'Accusé de réception',desc:'Confirmer la réception de la candidature',icon:'📨',subject:'Confirmation de réception — {poste}',body:'Bonjour {nom},\n\nNous accusons bonne réception de votre candidature pour le poste de {poste} au sein de {filiale}.\n\nVotre dossier sera étudié avec attention et nous reviendrons vers vous dans les meilleurs délais.\n\nCordialement,\nService RH — Group OY'},
                      {label:'Convocation entretien',desc:'Inviter à un entretien',icon:'🗣️',subject:'Invitation entretien — {poste}',body:'Bonjour {nom},\n\nNous avons le plaisir de vous informer que votre candidature pour le poste de {poste} a retenu notre attention.\n\nNous souhaitons vous rencontrer lors d\'un entretien. Merci de choisir un créneau :\nhttps://calendly.com/rh-groupoy/entretien\n\nCordialement,\nService RH — Group OY'},
                      {label:'Refus candidature',desc:'Informer du refus avec motif',icon:'✉️',subject:'Suite à votre candidature — {poste}',body:'Bonjour {nom},\n\nNous vous remercions pour l\'intérêt que vous portez à notre entreprise et pour votre candidature au poste de {poste}.\n\nAprès examen attentif de votre dossier, nous avons le regret de vous informer que nous ne pourrons pas donner suite à votre candidature.\n\nNous vous souhaitons bonne continuation dans vos recherches.\n\nCordialement,\nService RH — Group OY'},
                      {label:'Promesse d\'embauche',desc:'Envoyer une proposition d\'embauche',icon:'🎉',subject:'Proposition d\'embauche — {poste} — Group OY',body:'Bonjour {nom},\n\nNous avons le plaisir de vous confirmer que votre candidature pour le poste de {poste} au sein de {filiale} a été retenue.\n\nVous trouverez ci-joint votre promesse d\'embauche. Merci de nous la retourner signée.\n\nDate de prise de poste prévue : À confirmer\nRémunération brute annuelle : {salaire}€\n\nBienvenue dans l\'équipe !\n\nCordialement,\nÖzdoğan YILMAZ\nPDG — Group OY'}
                    ].map((tpl,i)=>(
                      <button key={i} onClick={()=>{const subj=tpl.subject.replace('{poste}',sel.poste);const body=tpl.body.replace(/\{nom\}/g,sel.nom).replace(/\{poste\}/g,sel.poste).replace(/\{filiale\}/g,sel.filiale).replace(/\{salaire\}/g,String(sel.pretentionSalariale||''));const mailto=`mailto:${sel.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;window.open(mailto);saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`${tpl.label} envoyé(e) à ${sel.email}`}]}:c));}} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left'}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=$accent}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=$border}
                      >
                        <span style={{fontSize:'0.9rem'}}>{tpl.icon}</span>
                        <div style={{flex:1}}><div style={{fontSize:'0.75rem',fontWeight:600,color:$text}}>{tpl.label}</div><div style={{fontSize:'0.62rem',color:$textMut}}>{tpl.desc}</div></div>
                        <span style={{fontSize:'0.62rem',color:$accent,fontWeight:600}}>Envoyer →</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offre d'emploi IA */}
                <div style={{padding:'12px 14px',background:$bgSub,borderRadius:crmRd,border:`1px solid ${$borderLight}`}}>
                  <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10}}>Offre d'emploi IA</div>
                  <button onClick={async()=>{setRecruOffreIaLoading(true);setRecruOffreIaResult(null);try{const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`Tu es un expert RH dans le BTP. Génère une offre d'emploi professionnelle et attractive pour Indeed/LinkedIn :\n\nPoste : ${sel.poste}\nFiliale : ${sel.filiale} (Group OY — groupe BTP multi-filiales, Alsace-Lorraine)\nNiveau visé : ${sel.notes||'Non précisé'}\nFourchette salariale : ${sel.pretentionSalariale?(Math.round((sel.pretentionSalariale||30000)*0.9/1000)*1000)+'€ — '+(Math.round((sel.pretentionSalariale||35000)*1.1/1000)*1000)+'€ brut/an':'À définir'}\nDisponibilité souhaitée : ${sel.disponibilite||'Dès que possible'}\n\nStructure :\n1. ACCROCHE (2 lignes percutantes)\n2. QUI SOMMES-NOUS ? (Group OY, 3 filiales BTP, ambiance PME dynamique)\n3. LE POSTE (missions clés, 5-6 bullets)\n4. PROFIL RECHERCHÉ (compétences, expérience, qualités, 5-6 bullets)\n5. CE QUE NOUS OFFRONS (avantages, rémunération, évolution)\n6. COMMENT POSTULER (email rh@groupoy.fr ou via Indeed)\n\nTon : professionnel mais chaleureux, orienté résultats, reflet d'une PME dynamique.`}]})});const data=await resp.json();setRecruOffreIaResult(data.content[0]?.text||'Erreur');}catch(err){setRecruOffreIaResult('Erreur: '+err.message);}setRecruOffreIaLoading(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${'#7c3aed'}40`,background:'#7c3aed'+'08',cursor:recruOffreIaLoading?'wait':'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left',width:'100%',opacity:recruOffreIaLoading?0.6:1}}
                    onMouseEnter={e=>{if(!recruOffreIaLoading)e.currentTarget.style.background='#7c3aed'+'18';}}
                    onMouseLeave={e=>{if(!recruOffreIaLoading)e.currentTarget.style.background='#7c3aed'+'08';}}
                  >
                    <span style={{fontSize:'1.1rem'}}>{recruOffreIaLoading?'⏳':'✎'}</span>
                    <div><div style={{fontSize:'0.78rem',fontWeight:600,color:'#7c3aed'}}>{recruOffreIaLoading?'Rédaction en cours...':'Générer une offre d\'emploi'}</div><div style={{fontSize:'0.62rem',color:$textMut}}>Offre Indeed/LinkedIn prête à publier — format structuré</div></div>
                  </button>
                  {recruOffreIaResult&&(<div style={{marginTop:10,padding:'12px 14px',background:$bgCard,borderRadius:crmRd,border:'1px solid #7c3aed30',maxHeight:350,overflow:'auto'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <div style={{fontSize:'0.72rem',fontWeight:700,color:'#7c3aed'}}>✎ Offre générée</div>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>navigator.clipboard.writeText(recruOffreIaResult)} style={{padding:'2px 8px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',fontSize:'0.62rem',fontWeight:600,color:$textSec,cursor:'pointer',fontFamily:'inherit'}}>☰ Copier</button>
                        <button onClick={()=>setRecruOffreIaResult(null)} style={{padding:'2px 8px',borderRadius:crmRd,border:'none',background:'transparent',fontSize:'0.62rem',color:$textMut,cursor:'pointer',fontFamily:'inherit'}}>✕</button>
                      </div>
                    </div>
                    <pre style={{fontSize:'0.72rem',color:$text,lineHeight:1.6,whiteSpace:'pre-wrap',wordBreak:'break-word',fontFamily:'inherit',margin:0}}>{recruOffreIaResult}</pre>
                  </div>)}
                </div>

                {/* Quick actions */}
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {sel.etape!=='refuse'&&<button onClick={()=>{const motif=prompt('Motif du refus :');if(motif!==null){saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,etape:'refuse',motifRefus:motif,timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:`Candidature refusée${motif?' — '+motif:''}`}]}:c));}}} style={{flex:1,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$danger}40`,background:$danger+'08',color:$danger,fontWeight:600,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit'}}>✕ Refuser</button>}
                  {sel.etape!=='reserve'&&<button onClick={()=>{saveCands(activeCandidats.map(c=>c.id===sel.id?{...c,etape:'reserve',timeline:[...(c.timeline||[]),{date:new Date().toISOString().slice(0,10),action:'Mis en vivier pour plus tard'}]}:c));}} style={{flex:1,padding:'10px 14px',borderRadius:crmRd,border:`1px solid ${$info}40`,background:$info+'08',color:$info,fontWeight:600,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit'}}>💎 Vivier</button>}
                </div>
              </div>)}
                            {recruDetailTab==='timeline'&&(<div style={{position:'relative',paddingLeft:20}}>
                <div style={{position:'absolute',left:6,top:0,bottom:0,width:2,background:$border}}/>
                {(sel.timeline||[]).slice().reverse().map((t,i)=>(
                  <div key={i} style={{position:'relative',paddingBottom:16,paddingLeft:16}}>
                    <div style={{position:'absolute',left:-2,top:4,width:10,height:10,borderRadius:'50%',background:i===0?$accent:$bgSub,border:`2px solid ${i===0?$accent:$border}`}}/>
                    <div style={{fontSize:'0.68rem',color:$textMut,fontWeight:600}}>{t.date}</div>
                    <div style={{fontSize:'0.78rem',color:$text,marginTop:2}}>{t.action}</div>
                  </div>
                ))}
              </div>)}
            </div>
          </div>)}
        </div>);

}
