// === Onglet « crm_commercial » — extrait de App.jsx (modularisation, forme iife) ===
import { CRM_FIL_ACC, CRM_FIL_ICONS, CRM_FIL_NAMES } from '../data/theme.js';
import React, {  } from 'react';

export default function TabCrmCommercial(__props) {
  const { $accent, $bg, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, $warn, addChecklistItem, ca, checklistEditOpen, checklistEditTab, clDragId, clDragOver, crmActiveGroup, crmAffaires, crmColWidths, crmCollapsed, crmFicheId, crmFicheTab, crmFil, crmFilterOpen, crmGroupBy, crmLoading, crmModuleRef, crmMondayKey, crmRd, crmScrollRef, crmSearch, crmShowArchive, crmTab, crmVisibleCols, ctActivities, ctContactMeta, ctGroupBy, ctNewActType, ctNewNote, ctPipeFilter, ctSearch, ctSelectedContact, ctView, drawerResizing, drawerWidth, ficheTabDragId, ficheTabDragOver, ficheTabOrder, ficheTabScrollRef, filiales, ganttZoom, getChecklistData, gpColCode, gpColDate, gpExpanded, gpFilter, gpFontSize, gpGroupBy, gpLabelW, gpScale, gpScrollRef, gpSpacing, gpZoom, navEntreprise, navService, newItemText, prepColWidths, prepCollapsed, prepGroupBy, removeChecklistItem, reorderChecklistItem, reorderFicheTabs, setChecklistEditOpen, setChecklistEditTab, setClDragId, setClDragOver, setCrmActiveGroup, setCrmAffaires, setCrmColWidths, setCrmCollapsed, setCrmFicheId, setCrmFicheTab, setCrmFil, setCrmFilterOpen, setCrmGroupBy, setCrmLoading, setCrmMondayKey, setCrmSearch, setCrmShowArchive, setCrmTab, setCrmVisibleCols, setCtActivities, setCtContactMeta, setCtGroupBy, setCtNewActType, setCtNewNote, setCtPipeFilter, setCtSearch, setCtSelectedContact, setCtView, setFicheTabDragId, setFicheTabDragOver, setGanttZoom, setGpColCode, setGpColDate, setGpExpanded, setGpFilter, setGpFontSize, setGpGroupBy, setGpLabelW, setGpScale, setGpSpacing, setGpZoom, setNewItemText, setPrepColWidths, setPrepCollapsed, setPrepGroupBy, startColResize, startDrawerResize, updateChecklistItem } = __props;
          const filColor = CRM_FIL_ACC[navEntreprise] || $accent;
          const filNom = CRM_FIL_NAMES[navEntreprise] || navEntreprise;
          const filIcon = CRM_FIL_ICONS[navEntreprise] || '▪';

          const PHASES = [
            { id:1, label:'P1 — Lancement',     color:'#0369a1', icon:'🚀' },
            { id:2, label:'P2 — Prépa & OS',     color:'#b45309', icon:'☰' },
            { id:3, label:'P3 — Exécution',      color:'#1d4ed8', icon:'◆' },
            { id:4, label:'P4 — Pré-réception',  color:'#6d28d9', icon:'⌕' },
            { id:5, label:'P5 — Réception',      color:'#047857', icon:'✓' },
            { id:6, label:'P6 — GPA & RG',       color:'#c2410c', icon:'🛡️' },
            { id:7, label:'P7 — Archivage',      color:'#334155', icon:'▣' },
          ];
          const STATUTS_PAR_PHASE = {
            1:['Affaire remportée','Préparation initiale','Dossier transféré'],
            2:['En attente OS','OS reçu','Installation chantier','PPSPS validé','DICT envoyée','Commandes lancées'],
            3:['Travaux en cours','Travaux suspendus','En attente client/MOA','Arrêt intempéries','Arrêt administratif'],
            4:['Finitions / Pré-OPR','OPR en cours','OPR validé','Levée de réserves'],
            5:['PV réception signé','DGD en préparation','DGD envoyée','DGD validée / Solde reçu','DOE remis'],
            6:['GPA en cours / RG bloquée','Demande libération envoyée','GPA expirée - relance'],
            7:['RG libérée','Terminé','Projet abandonné','Affaire résiliée','AO perdu'],
          };
          const AFFAIRES_REAL = [
            {cd:'1728',n:'Extension bureaux Ciel Bleu - Cachan (94)',mk:'Privé',eq:'TCE',m:'586K',ph:1,st:'Affaire remportée',lit:false,fil:'ezel'},
            {cd:'1727',n:'Consolidation structurelle Local 30 - Emerainville (77)',mk:'Privé',eq:'GO',m:'17K',ph:1,st:'Dossier transféré',lit:false,fil:'ezel'},
            {cd:'1726',n:'Réfection toiture Sorbonne Bat.91 - Paris 13',mk:'Public',eq:'Étanch.',m:'269K',ph:1,st:'Dossier transféré',lit:false,fil:'etancheite'},
            {cd:'1709',n:'EPA Senart - Poste de garde',mk:'Public',eq:'GO',m:'--',ph:1,st:'Préparation initiale',lit:false,fil:'ezel'},
            {cd:'1723',n:'Étanchéité ONERA - Palaiseau (91)',mk:'Public',eq:'Étanch.',m:'197K',ph:2,st:'OS reçu',lit:false,fil:'etancheite'},
            {cd:'1717',n:'Aménagement crèche Frères Lumières - Coupvray (77)',mk:'Public',eq:'TCE',m:'17K',ph:2,st:'OS reçu',lit:false,fil:'ezel'},
            {cd:'1716',n:'Aménagement crèche Jane Goodall - Coupvray (77)',mk:'Public',eq:'TCE',m:'14K',ph:2,st:'OS reçu',lit:false,fil:'ezel'},
            {cd:'1722',n:'Réno. thermique Polytechnique - Palaiseau (91)',mk:'Public',eq:'Étanch.',m:'170K',ph:3,st:'Travaux en cours',lit:false,fil:'etancheite'},
            {cd:'1721',n:'Réhab. Point Info Jeunesse - Épinay (93)',mk:'Public',eq:'GO',m:'57K',ph:3,st:'Travaux en cours',lit:false,fil:'ezel'},
            {cd:'1719',n:'Réfection toiture Musée Quai Branly - Paris 7',mk:'Public',eq:'Étanch.',m:'254K',ph:3,st:'Travaux en cours',lit:false,fil:'etancheite'},
            {cd:'1718',n:'Réhabilitation Stade Pershing - Paris 12',mk:'Public',eq:'TCE',m:'652K',ph:3,st:'Travaux en cours',lit:false,fil:'ezel'},
            {cd:'1715',n:'Pôle Santé étanchéité - Chevry-Cossigny (77)',mk:'Public',eq:'Étanch.',m:'34K',ph:3,st:'Travaux suspendus',lit:false,fil:'etancheite'},
            {cd:'1706',n:'Étanchéité Voltaire - Paris 11',mk:'Public',eq:'Étanch.',m:'273K',ph:3,st:'Travaux suspendus',lit:false,fil:'etancheite'},
            {cd:'1707',n:'JACOB - Barbizon (77)',mk:'Particulier',eq:'Privée',m:'102K',ph:3,st:'Travaux suspendus',lit:false,fil:'ezel'},
            {cd:'1702',n:'Réhab. maison Deasy - Bourron-Marlotte (77)',mk:'Particulier',eq:'TCE',m:'730K',ph:3,st:'Travaux suspendus',lit:true,fil:'ezel'},
            {cd:'1698',n:'MAC Accessibilité Handicapés - Paris',mk:'Public',eq:'TCE',m:'--',ph:3,st:'Travaux en cours',lit:false,fil:'ezel'},
            {cd:'1692',n:'Préfecture étanchéité - Palaiseau (91)',mk:'Public',eq:'Étanch.',m:'194K',ph:3,st:'Travaux en cours',lit:false,fil:'etancheite'},
            {cd:'1690',n:'Gendarmerie Habitat 77 - Guignes (77)',mk:'Public',eq:'GO',m:'2.97M',ph:3,st:'Travaux en cours',lit:false,fil:'ezel'},
            {cd:'1689',n:'SCI des Cèdres - St-Germain-des-Granges',mk:'Privé',eq:'GO',m:'112K',ph:3,st:'Travaux suspendus',lit:false,fil:'ezel'},
            {cd:'1680',n:'Bardage Collège E. Michelet - Paris',mk:'Public',eq:'TCE',m:'1.1M',ph:3,st:'Travaux suspendus',lit:true,fil:'ezel'},
            {cd:'1654',n:'Travaux divers - Cachan (94)',mk:'Particulier',eq:'TCE',m:'169K',ph:3,st:'Travaux suspendus',lit:false,fil:'ezel'},
            {cd:'1714',n:'Réfection toitures Collèges Gagny (93)',mk:'Public',eq:'Étanch.',m:'281K',ph:4,st:'Levée de réserves',lit:false,fil:'etancheite'},
            {cd:'1711',n:'Centre de Loisirs - Pontault-Combault (77)',mk:'Public',eq:'TCE',m:'1.1M',ph:4,st:'Levée de réserves',lit:false,fil:'ezel'},
            {cd:'1703',n:"Institut de l'Islam - Paris 18",mk:'Public',eq:'TCE',m:'711K',ph:4,st:'Levée de réserves',lit:false,fil:'ezel'},
            {cd:'1712',n:'Université Gustave Eiffel - Champs-sur-Marne (77)',mk:'Public',eq:'TCE',m:'244K',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1701',n:'Opéra National de Paris - Lot 1+2',mk:'Public',eq:'TCE',m:'1.5M',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1696',n:'22 lgts + 1 maison - Cabourg (14)',mk:'Privé',eq:'GO',m:'777K',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1691',n:'Piscine George Vallerey - Paris 20',mk:'Public',eq:'TCE',m:'2.03M',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1688',n:'Foyer Lycée Champlain - Chennevières (94)',mk:'Public',eq:'TCE',m:'228K',ph:5,st:'DGD envoyée',lit:false,fil:'ezel'},
            {cd:'1685',n:"Musée d'Orsay - Paris (Lot 2+3)",mk:'Public',eq:'TCE',m:'1.15M',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1682',n:'Gymnase Raymond - Paris',mk:'Public',eq:'TCE',m:'316K',ph:5,st:'DGD envoyée',lit:false,fil:'ezel'},
            {cd:'1681',n:'ADAP Écoles Lacordaire + St Charles - Paris',mk:'Public',eq:'TCE',m:'424K',ph:5,st:'DGD envoyée',lit:false,fil:'ezel'},
            {cd:'1672',n:'20 logements - Combs-la-Ville (77)',mk:'Privé',eq:'GO',m:'1.58M',ph:5,st:'DGD envoyée',lit:false,fil:'ezel'},
            {cd:'1670',n:"Centre d'accueil - Paris 12",mk:'Public',eq:'TCE',m:'728K',ph:5,st:'DGD envoyée',lit:false,fil:'ezel'},
            {cd:'1635',n:'Travaux divers - Fontenay-Tresigny (77)',mk:'Public',eq:'TCE',m:'203K',ph:5,st:'DGD en préparation',lit:false,fil:'ezel'},
            {cd:'1720',n:'Étanchéité École La Fontaine - Montmorency (95)',mk:'Public',eq:'Étanch.',m:'70K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'etancheite'},
            {cd:'1710',n:'EHPAD La Forêt',mk:'Privé',eq:'Privée',m:'169K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'ezel'},
            {cd:'1700',n:'Ravalement Collège Genevoix - Montrouge (92)',mk:'Public',eq:'TCE',m:'746K',ph:6,st:'GPA en cours / RG bloquée',lit:true,fil:'ezel'},
            {cd:'1697',n:'Collège Paul Éluard - Nanterre (92)',mk:'Public',eq:'GO',m:'494K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'ezel'},
            {cd:'1693',n:'Piscine Dauvin étanchéité - Paris',mk:'Public',eq:'Étanch.',m:'253K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'etancheite'},
            {cd:'1684',n:'Neuville étanchéité - Cergy (95)',mk:'Public',eq:'Étanch.',m:'458K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'etancheite'},
            {cd:'1683',n:'Musée Guimet - Paris',mk:'Privé',eq:'TCE',m:'59K',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'ezel'},
            {cd:'1677',n:'Mission Locale - Paris 14 (3 lots)',mk:'Public',eq:'TCE',m:'586K',ph:6,st:'GPA en cours / RG bloquée',lit:true,fil:'ezel'},
            {cd:'1675',n:'MAC Étanchéité - Paris',mk:'Public',eq:'Étanch.',m:'--',ph:6,st:'GPA en cours / RG bloquée',lit:false,fil:'etancheite'},
          ];
          const parseMontant = (m) => {
            if (!m || m === '--') return 0;
            const s = String(m).replace(/[€\s]/g,'');
            if (s.endsWith('M')) return parseFloat(s)*1000000;
            if (s.endsWith('K') || s.endsWith('k')) return parseFloat(s)*1000;
            return parseFloat(s)||0;
          };
          const fmtE = (v) => !v||v===0?'—' : v>=1000000?(v/1000000).toFixed(2)+'M€' : v>=1000?Math.round(v/1000)+'k€' : v+'€';

          // P7 — Archivés (séparés pour toggle)
          const ARCHIVES_REAL = [
            {cd:'1668',n:'Médiathèque La Courneuve - Lot GO',mk:'Public',eq:'GO',m:'1.23M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1665',n:'Étanchéité Groupe Scolaire Villejuif (94)',mk:'Public',eq:'Étanch.',m:'298K',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1662',n:'Réhab. Foyer ADOMA - Vitry (94)',mk:'Public',eq:'GO',m:'1.04M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1659',n:'Étanchéité Piscine Issy-les-Moulineaux (92)',mk:'Public',eq:'Étanch.',m:'512K',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1656',n:'Résidence sociale Ivry-sur-Seine (94)',mk:'Public',eq:'GO',m:'1.67M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1655',n:'ADAP Mairie de Bagnolet - Paris',mk:'Public',eq:'TCE',m:'412K',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1652',n:'Étanchéité Gymnase Aubervilliers (93)',mk:'Public',eq:'Étanch.',m:'189K',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1649',n:'Extension parking souterrain Châtelet',mk:'Public',eq:'GO',m:'2.3M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1648',n:'Réhab. Résidence Orly (94)',mk:'Privé',eq:'GO',m:'890K',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1645',n:'Bardage Lycée Jean Jaurès - Montreuil (93)',mk:'Public',eq:'TCE',m:'756K',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1643',n:'Étanchéité Hôpital Lariboisière - Paris 10',mk:'Public',eq:'Étanch.',m:'874K',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1641',n:'Collège Simone Veil - Creil (60)',mk:'Public',eq:'TCE',m:'2.1M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1638',n:'ADAP École Pasteur - Noisy-le-Grand (93)',mk:'Public',eq:'TCE',m:'338K',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1636',n:'Étanchéité Centre Commercial Créteil (94)',mk:'Privé',eq:'Étanch.',m:'623K',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1633',n:'Réhab. Immeuble Montparnasse - Paris 14',mk:'Privé',eq:'GO',m:'1.12M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1630',n:'Étanchéité Palais de Justice - Paris 4',mk:'Public',eq:'Étanch.',m:'387K',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1627',n:'Logements sociaux Argenteuil (95)',mk:'Public',eq:'GO',m:'1.89M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1625',n:'Centre Aquatique Sucy-en-Brie (94)',mk:'Public',eq:'TCE',m:'1.75M',ph:7,st:'Terminé',lit:true,fil:'ezel'},
            {cd:'1622',n:'Étanchéité Musée du Louvre - Aile Richelieu',mk:'Public',eq:'Étanch.',m:'1.08M',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1618',n:'EHPAD Les Glycines - Meaux (77)',mk:'Privé',eq:'GO',m:'2.45M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1615',n:'Réfection toitures Mairie de Pantin (93)',mk:'Public',eq:'Étanch.',m:'445K',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1614',n:'Étanchéité Stade Charlety - Paris 13',mk:'Public',eq:'Étanch.',m:'640K',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1610',n:'Réhab. Centre Commercial Belle Épine (94)',mk:'Privé',eq:'TCE',m:'3.1M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1607',n:'ADAP Groupe Scolaire Vincennes (94)',mk:'Public',eq:'TCE',m:'567K',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1603',n:'Étanchéité Palais Omnisports Bercy',mk:'Public',eq:'Étanch.',m:'728K',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1600',n:'Maison de retraite Fontainebleau (77)',mk:'Privé',eq:'GO',m:'1.34M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1598',n:'Immeuble de bureaux Massy (91)',mk:'Privé',eq:'GO',m:'3.4M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1594',n:'Collège Pierre et Marie Curie - Orsay (91)',mk:'Public',eq:'TCE',m:'1.92M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1590',n:'Étanchéité Tour Montparnasse - Paris 15',mk:'Privé',eq:'Étanch.',m:'956K',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1585',n:'ADAP Hôtel de Ville - Vincennes (94)',mk:'Public',eq:'TCE',m:'411K',ph:7,st:'Affaire résiliée',lit:true,fil:'ezel'},
            {cd:'1578',n:'Étanchéité Bibliothèque Nationale F. Mitterrand',mk:'Public',eq:'Étanch.',m:'1.15M',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
            {cd:'1571',n:'Résidence Les Chênes - Melun (77)',mk:'Privé',eq:'GO',m:'2.78M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1563',n:'Lycée Romain Rolland - Ivry (94)',mk:'Public',eq:'TCE',m:'1.63M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1554',n:'Étanchéité Stade de France - St-Denis (93)',mk:'Public',eq:'Étanch.',m:'2.04M',ph:7,st:'Terminé',lit:false,fil:'etancheite'},
            {cd:'1546',n:'Centre Hospitalier Poissy - Bât. B',mk:'Public',eq:'GO',m:'4.2M',ph:7,st:'RG libérée',lit:false,fil:'ezel'},
            {cd:'1537',n:'Siège Social BNP Paribas - Paris 9',mk:'Privé',eq:'TCE',m:'3.85M',ph:7,st:'Terminé',lit:false,fil:'ezel'},
            {cd:'1528',n:'Étanchéité Cité des Sciences - Paris 19',mk:'Public',eq:'Étanch.',m:'1.37M',ph:7,st:'RG libérée',lit:false,fil:'etancheite'},
          ];

          const TOUTES_AFFAIRES = [...AFFAIRES_REAL, ...(crmShowArchive ? ARCHIVES_REAL : [])];

          const getPhase = (a) => a.ph || 1;

          const affairesToShow = (crmAffaires.length > 0 ? crmAffaires : TOUTES_AFFAIRES).filter(a => {
            if (navEntreprise && navEntreprise !== 'groupoy' && a.fil && a.fil !== navEntreprise) return false;
            if (!crmShowArchive && getPhase(a) === 7) return false;
            if (crmSearch && !a.n?.toLowerCase().includes(crmSearch.toLowerCase()) && !a.nom?.toLowerCase().includes(crmSearch.toLowerCase())) return false;
            if (crmFil === 'public') return a.mk === 'Public' || a.marche === 'Public';
            if (crmFil === 'prive') return a.mk === 'Privé' || a.marche === 'Privé';
            if (crmFil === 'particulier') return a.mk === 'Particulier' || a.marche === 'Particulier';
            return true;
          });

          const litCount = affairesToShow.filter(a => a.lit).length;
          const totalPipeline = affairesToShow.filter(a => getPhase(a) < 7).reduce((s,a) => s + parseMontant(a.m || a.montant), 0);

          const CRM_TABS = [
            { id: 'entreprises', label: 'Entreprises', icon: '▪', count: 31 },
            { id: 'contacts', label: 'Contacts', icon: '◉', count: 10 },
            { id: 'kanban', label: 'Pipeline Kanban', icon: '🗂️' },
            { id: 'affaires', label: 'Affaires', icon: '☰', count: affairesToShow.length },
            { id: 'planning_global', label: 'Planning', icon: '◫' },
            { id: 'preparation_crm', label: 'Préparation', icon: '✱' },
            { id: 'devis', label: 'Devis', icon: '▫' },
            { id: 'activites', label: 'Activités', icon: '◫' },
            { id: 'dashboard_crm', label: 'Dashboard', icon: '▦' },
          ];

          const fetchMondayAffaires = async () => {
            if (!crmMondayKey) return;
            setCrmLoading(true);
            try {
              const q = `{ boards(ids: [4113177037]) { items_page(limit: 100) { items { id name column_values { id text value } } } } }`;
              const res = await fetch('https://api.monday.com/v2', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': crmMondayKey }, body: JSON.stringify({ query: q }) });
              const d = await res.json();
              const items = d?.data?.boards?.[0]?.items_page?.items || [];
              const mapped = items.map(item => {
                const col = (id) => item.column_values?.find(c => c.id === id)?.text || '';
                return { id: item.id, nom: item.name, client: col('client') || col('text') || '', statut: col('statut') || col('status') || 'Qualification', montant: parseFloat(col('montant') || col('numbers') || '0') || 0, marche: col('marche') || col('dropdown') || 'Privé', equipe: col('equipe') || col('people') || '', dateCreation: col('date') || '', notes: col('notes') || col('long_text') || '' };
              });
              setCrmAffaires(mapped);
            } catch(e) { console.error('Monday fetch error', e); }
            setCrmLoading(false);
          };

          const ENTREPRISES_MOCK = [
            { id: 1, nom: 'Nexity Ile-de-France', secteur: 'Promoteur', ville: 'Paris 8e', ca: '2.1Md€', contacts: 3, affaires: 4, statut: 'Client actif' },
            { id: 2, nom: 'Bouygues Immobilier', secteur: 'Promoteur', ville: 'Issy-les-Moulineaux', ca: '3.8Md€', contacts: 5, affaires: 7, statut: 'Client actif' },
            { id: 3, nom: 'GSE Groupe', secteur: 'Promoteur industrie', ville: 'Paris 17e', ca: '850M€', contacts: 2, affaires: 3, statut: 'Prospect chaud' },
            { id: 4, nom: 'Grand Paris Aménagement', secteur: 'EPA public', ville: "L'Île-Saint-Denis", ca: 'n/c', contacts: 4, affaires: 6, statut: 'Client actif' },
            { id: 5, nom: 'Mairie de Croissy', secteur: 'Collectivité', ville: 'Croissy-sur-Seine', ca: 'n/c', contacts: 1, affaires: 2, statut: 'Client ponctuel' },
          ];

          // Données réelles Monday.com — Board 7381189521 "Prospects à démarcher" (42 contacts)
          // tc = type contact, sect = secteur, ref = referent, prio = priorité par défaut, pipe0 = pipeline initial, act0 = action initiale
          const CONTACTS_REAL = [
            {id:'11362213774',nom:'Guillaume PENICAUD',entreprise:'PROMOGIM',poste:'Directeur National Appels d\'Offres',email:'g.penicaud@promogim.fr',tel:'0750957258',statut:'🟡 À contacter',remarques:'PROMOGIM — 22 rue de Bellevue, Boulogne-Billancourt',linkedin:'',tc:'promoteur',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'froid',act0:'appeler'},
            {id:'9306355599',nom:'Gabriela RASCAO',entreprise:'',poste:'',email:'rascao.gabriela@hotmail.fr',tel:'',statut:'🟡 À contacter',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'appeler'},
            {id:'7464805737',nom:'David Pottin',entreprise:'Abc Domus',poste:'Économiste en bâtiment',email:'d.pottin@abcdomus.com',tel:'06 31 51 90 46',statut:'🔁 À relancer',remarques:'Expatrié en Bretagne (Pont Aven). Missions parisiennes encore possibles.',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7483943954',nom:'Thierry VALENTINO',entreprise:'Valentino Architectes',poste:'Dirigeant',email:'TVALENTINO@valentinoarchitectes.fr',tel:'06 08 99 23 16',statut:'',remarques:'',linkedin:'',tc:'architecte',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'appeler'},
            {id:'7548127035',nom:'Thomas FRERY',entreprise:'Baty Nova',poste:'',email:'thomas.frery@batynova.fr',tel:'06 33 25 08 07',statut:'✕ Pas intéressé',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'basse',pipe0:'froid',act0:'rien'},
            {id:'7549068428',nom:'Philippe DE MAGALHAES',entreprise:'Alto Ingénierie',poste:'Responsable Pôle Electricité / CVC-PLB',email:'Philippe.demagalhaes@alto-ingenierie.fr',tel:'06 22 82 22 63',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'8189235045',nom:'Mosquée de Noisy',entreprise:'Mosquée de Noisy',poste:'',email:'mosqueedenoisy@gmail.com',tel:'',statut:'🟡 À contacter',remarques:'Lots hors GO : Étanchéité, Coupole, Menuiseries ext., Habillage pierre, Ravalement',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'froid',act0:'appeler'},
            {id:'7464736512',nom:'Marie Océane Douzon',entreprise:'Abc Domus',poste:'Chef de projet technique',email:'mo.douzon@abcdomus.com',tel:'07 84 53 01 55',statut:'🟡 À contacter',remarques:'Suivi de chantier copro',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'emailer'},
            {id:'7548112762',nom:'Alexis VERNET',entreprise:'Pve Conseil',poste:'',email:'a.vernet@pveconseil.com',tel:'06 62 69 95 61',statut:'',remarques:'',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'appeler'},
            {id:'7549116624',nom:'Vincent BARTHELEMI',entreprise:'Emile Dufour',poste:'Directeur',email:'',tel:'06 85 01 96 83',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7463500269',nom:'Nicolas HUE',entreprise:'Pve Conseil',poste:'',email:'nicolas.hue@ralphlauren.com',tel:'06 14 75 25 84',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7548116447',nom:'Emmanuel SINAPPA',entreprise:'Pve Conseil',poste:'',email:'e.sinappa@pveconseil.com',tel:'07 85 71 01 67',statut:'',remarques:'',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'appeler'},
            {id:'7464678427',nom:'Benoit Demée',entreprise:'Abc Domus',poste:'Responsable d\'agence',email:'b.demee@abcdomus.com',tel:'06 31 56 54 04',statut:'✆ Premier appel fait',remarques:'Consultation rénovation énergétique et TCE',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7548134582',nom:'Laure LERUSTE',entreprise:'Habitat 77',poste:'Chargée d\'opération',email:'laure.leruste@habitat77.fr',tel:'06 38 48 36 73',statut:'',remarques:'',linkedin:'',tc:'bailleur',sect:'public',ref:'Ozdogan',prio:'haute',pipe0:'froid',act0:'appeler'},
            {id:'7464868784',nom:'Virginie Comarteau',entreprise:'Atelier Comarteau',poste:'Architecte',email:'comarteau.architecte@free.fr',tel:'06 83 15 12 86',statut:'✆ Premier appel fait',remarques:'Marché parisien : ravalement, couverture, étanchéité',linkedin:'https://fr.linkedin.com/in/virginie-comarteau-b5829114b',tc:'architecte',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7482491444',nom:'Giulio ben Conti',entreprise:'Atelier Giulio Conti',poste:'Architecte',email:'giuliobenconti@gmail.com',tel:'06 67 25 63 06',statut:'🟡 À contacter',remarques:'Travaille avec Benoit Leleu en collaboration',linkedin:'',tc:'architecte',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'froid',act0:'emailer'},
            {id:'7464962290',nom:'Essan Ferrooghi',entreprise:'Urban Makers',poste:'Architecte associé',email:'e.farooghi@urbanmakers.eu',tel:'06 02 59 34 00',statut:'✆ Premier appel fait',remarques:'Agence Paris + Nantes',linkedin:'',tc:'architecte',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7482672800',nom:'Martin Sobierajski',entreprise:'Orfeo Développement',poste:'Directeur associé',email:'ms@orfeo-developpement.com',tel:'06 40 51 20 63',statut:'',remarques:'',linkedin:'',tc:'promoteur',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'froid',act0:'appeler'},
            {id:'11375202180',nom:'Pascal CLERGEAUD',entreprise:'EPA Sénart',poste:'Responsable de pôle',email:'',tel:'01 64 10 15 15',statut:'🟡 À contacter',remarques:'1709 - EPA Sénart / poste de garde. Message répondeur.',linkedin:'',tc:'bailleur',sect:'public',ref:'Ozdogan',prio:'haute',pipe0:'froid',act0:'appeler'},
            {id:'7470772238',nom:'Jeson Cavaignac',entreprise:'Jrm Ingénierie',poste:'Maître d\'oeuvre',email:'jrm.ingenierie@gmail.com',tel:'06 64 82 41 33',statut:'✆ Premier appel fait',remarques:"Travaille sur des projets d\'Unibail",linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'8102251196',nom:'Corinne Cattiaux',entreprise:'Bsgi',poste:"Chef d\'entreprise",email:'cattiauxcorinne.bsgi@gmail.com',tel:'06 11 31 61 09',statut:'',remarques:'Déjà avec des entreprises depuis de nombreuses années',linkedin:'',tc:'autre',sect:'privé',ref:'Ozdogan',prio:'basse',pipe0:'froid',act0:'appeler'},
            {id:'7472354614',nom:'Gianni Vittilo',entreprise:'Agence Du Centre Vincennes Immo.',poste:"Chef d\'entreprise",email:'ariane.immo93100@orange.fr',tel:'06 30 58 44 37',statut:'✆ Premier appel fait',remarques:'Gérant agences immo, SCI — nombreux contacts immobilier',linkedin:'',tc:'immo',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'9439297678',nom:'Philippe Bouttier',entreprise:'Renovation Man / Habitat Conseil',poste:"Chef d\'entreprise + Resp. sud IDF",email:'',tel:'06 49 19 02 66',statut:'✓ Qualifié',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozlem',prio:'normale',pipe0:'qualifié',act0:'en_attente'},
            {id:'7482462140',nom:'Benoit Leleu',entreprise:'Atelier Benoit Leleu',poste:'Architecte',email:'bntleleu@gmail.com',tel:'07 60 03 17 20',statut:'✆ Premier appel fait',remarques:'Bureau, coque, brasserie, restaurant...',linkedin:'',tc:'architecte',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7482539188',nom:'Emilie Roulleau',entreprise:'Orfeo Développement',poste:'Directrice travaux',email:'ms@orfeo-developpement.com',tel:'06 50 35 45 34',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'promoteur',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'7482572392',nom:'Benjamin Bon',entreprise:'Total Energie',poste:'Chef du service sécurité et performance',email:'',tel:'',statut:'✆ Premier appel fait',remarques:'Ancien responsable technique Parly 2 (Unibail)',linkedin:'',tc:'industriel',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'en_attente'},
            {id:'11364713190',nom:'Mme Maud LAMBERT',entreprise:'',poste:'',email:'maudl@hotmail.com',tel:'06 99 20 05 31',statut:'✓ Qualifié',remarques:'',linkedin:'',tc:'particulier',sect:'privé',ref:'Ozlem',prio:'normale',pipe0:'qualifié',act0:'proposition'},
            {id:'7482612694',nom:'Antoine Rousseau',entreprise:'Particulier',poste:'Particulier',email:'antoinerousseau89@gmail.com',tel:'',statut:'✆ Premier appel fait',remarques:"Projet d\'Extension sur Champigny Sur Marne",linkedin:'',tc:'particulier',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'en_echange',act0:'en_attente'},
            {id:'7549087190',nom:'De Poncheville',entreprise:'Maville Immobilier',poste:"Gérant de l\'agence",email:'',tel:'01 78 09 02 84',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7549097955',nom:'Rodriguez',entreprise:'Maville Immobilier',poste:'Gestionnaire copropriété',email:'',tel:'01 78 09 02 88',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7549109916',nom:'Fournier',entreprise:'Maville Immobilier',poste:'Gestionnaire de copropriété',email:'',tel:'01 78 09 02 83',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7549121314',nom:'Lalle',entreprise:'David Gestion Fontenay',poste:'Gestionnaire de copropriété',email:'',tel:'01 48 73 11 11',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7549133317',nom:'Lalle',entreprise:'David Gestion Nogent',poste:'Gestionnaire de copropriété',email:'gestioncopro1@davidgestion.fr',tel:'01 48 76 68 63',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7645397797',nom:'Karl PIGNOL',entreprise:'Cabinet Preclaire',poste:'Gestionnaire copropriété',email:'contact@preclaire.fr',tel:'',statut:'✆ Premier appel fait',remarques:'',linkedin:'https://cabinetpreclaire.fr/',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7687859930',nom:'Lefebvre Jimmy',entreprise:'David Gestion Nogent',poste:'',email:'gestioncopro1@davidgestion.fr',tel:'01 48 76 68 63',statut:'✆ Premier appel fait',remarques:'Agence de Nogent sur Marne',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7687874920',nom:'Koupelle Cyrille',entreprise:'David Gestion Fontenay',poste:'',email:'gestioncopro4@davidgestion.fr',tel:'01 48 73 11 11',statut:'✆ Premier appel fait',remarques:'Agence de Fontenay sous Bois',linkedin:'',tc:'gestionnaire',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7500835620',nom:'Haissam MOHARRAM',entreprise:'I3f',poste:'Chef de secteur',email:'',tel:'07 58 91 82 21',statut:'✆ Premier appel fait',remarques:'Prise de contact effectuée, RDV programmé',linkedin:'',tc:'bailleur',sect:'public',ref:'Ozdogan',prio:'haute',pipe0:'en_echange',act0:'rdv'},
            {id:'7548345112',nom:'Guillaume PIFFETEAU',entreprise:'Gp Consultancy Services',poste:'Directeur',email:'gpiffeteau.consultancyservices@gmail.com',tel:'',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'moe',sect:'privé',ref:'Ozdogan',prio:'normale',pipe0:'contacté',act0:'relancer'},
            {id:'7548593513',nom:'Pierre-André BUISSON',entreprise:'Vinci Immobilier Promotion',poste:'Directeur technique Île-de-France',email:'pierre-andre.buisson@vinci-immobilier.com',tel:'06 01 31 90 82',statut:'✆ Premier appel fait',remarques:'',linkedin:'',tc:'promoteur',sect:'privé',ref:'Ozdogan',prio:'haute',pipe0:'contacté',act0:'relancer'},
            {id:'9439313884',nom:'La Maison des Travaux Brie comte robert',entreprise:'La Maison des Travaux',poste:'',email:'',tel:'',statut:'✓ Qualifié',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozlem',prio:'normale',pipe0:'qualifié',act0:'proposition'},
            {id:'9439315843',nom:'La Maison des Travaux Noisy le Grand',entreprise:'La Maison des Travaux',poste:'',email:'',tel:'',statut:'✓ Qualifié',remarques:'',linkedin:'',tc:'autre',sect:'privé',ref:'Ozlem',prio:'normale',pipe0:'qualifié',act0:'proposition'},
          ];
                    const STATUT_CONTACT_COLOR = {
            '🟡 À contacter': '#f59e0b',
            '✆ Premier appel fait': '#3b82f6',
            '⏳ En attente de réponse': '#f97316',
            '◫ RDV fixé': '#8b5cf6',
            '✓ Qualifié': '#10b981',
            '🔁 À relancer': '#d97706',
            '✕ Pas intéressé': '#ef4444',
            '💤 Stand-by': '#64748b',
            '📵 Mauvais contact': '#757575',
            '🧹 À nettoyer': '#225091',
          };

          const phaseGroups = PHASES.map(ph => ({ ...ph, items: affairesToShow.filter(a => getPhase(a) === ph.id) }));

          return (
            <div ref={crmModuleRef} style={{padding:'0 0 40px'}}>
              {/* Header */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <span style={{fontSize:'1.6rem'}}>{filIcon}</span>
                  <div>
                    <h2 style={{margin:0, fontSize:'1.25rem', fontWeight:700, color:$text}}>CRM Commercial — {filNom}</h2>
                    <div style={{fontSize:'0.75rem', color:$textMut, marginTop:2}}>Gestion commerciale · Pipeline · Affaires</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  {!crmMondayKey && (
                    <div style={{display:'flex', gap:6, alignItems:'center', background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, padding:'6px 12px'}}>
                      <span style={{fontSize:'0.75rem', color:$textMut}}>🔗 Monday API Key :</span>
                      <input type="password" placeholder="Coller la clé Monday.com..." value={crmMondayKey} onChange={e => { setCrmMondayKey(e.target.value); try { localStorage.setItem('crm_monday_key', e.target.value); } catch(e2) {} }} style={{border:'none', background:'transparent', fontSize:'0.78rem', color:$text, outline:'none', width:200, fontFamily:'monospace'}} />
                      <button onClick={fetchMondayAffaires} style={{padding:'4px 10px', borderRadius:Math.max(crmRd-2,0), border:'none', background:filColor, color:'#fff', fontSize:'0.75rem', cursor:'pointer', fontWeight:600}}>Sync</button>
                    </div>
                  )}
                  {crmMondayKey && <button onClick={fetchMondayAffaires} disabled={crmLoading} style={{padding:'6px 14px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$text, fontSize:'0.78rem', cursor:'pointer'}}>{crmLoading ? '⏳ Sync...' : '↻ Sync Monday'}</button>}
                  <input value={crmSearch} onChange={e => setCrmSearch(e.target.value)} placeholder="⌕ Rechercher..." style={{padding:'6px 12px', border:`1px solid ${$border}`, borderRadius:crmRd, background:$bgCard, color:$text, fontSize:'0.82rem', outline:'none', width:180}} />
                </div>
              </div>

              {/* KPI Strip — absences style */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:20}}>
                {[
                  {l:'Chantiers actifs', v:affairesToShow.filter(a=>getPhase(a)===3).length, c:'#3b82f6', ic:'◆'},
                  {l:'En réception',     v:affairesToShow.filter(a=>[4,5].includes(getPhase(a))).length, c:'#22c55e', ic:'✓'},
                  {l:'Montant actif',    v:fmtE(affairesToShow.filter(a=>getPhase(a)<7).reduce((s,a)=>s+parseMontant(a.m||a.montant),0)), c:'#f59e0b', ic:'€'},
                  {l:'GPA & RG en cours',v:affairesToShow.filter(a=>getPhase(a)===6).length, c:'#f97316', ic:'🛡️'},
                  {l:'Litiges actifs',   v:litCount, c:'#e74c3c', ic:'⚖️'},
                ].map((k,i)=>(
                  <div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=k.c;e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}>
                    <div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{k.l}</div>
                    <div style={{fontSize:'1.5rem',fontWeight:700,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                    <div style={{position:'absolute',top:10,right:14,fontSize:'1.2rem',opacity:0.1}}>{k.ic}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{display:'flex', gap:2, background:$bgSub, borderRadius:crmRd, padding:3, border:`1px solid ${$border}`, marginBottom:20, width:'fit-content'}}>
                {CRM_TABS.map(t => (
                  <button key={t.id} onClick={() => { setCrmTab(t.id); setCrmActiveGroup(null); }} style={{padding:'9px 16px', borderRadius:0, border:'none', borderBottom:crmTab===t.id?`2px solid ${filColor}`:'2px solid transparent', background:crmTab===t.id?filColor+'10':'transparent', color:crmTab===t.id?filColor:$textMut, fontWeight:crmTab===t.id?700:400, fontSize:'0.8rem', cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all 0.15s', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0}}
                    onMouseEnter={e=>{if(crmTab!==t.id){e.currentTarget.style.background=$bgCardHover;e.currentTarget.style.color=$textSec;}}}
                    onMouseLeave={e=>{if(crmTab!==t.id){e.currentTarget.style.background='transparent';e.currentTarget.style.color=$textMut;}}}
                  >
                    <span>{t.icon}</span><span>{t.label}</span>{t.count !== undefined && <span style={{background:crmTab===t.id?filColor+'20':$bgSub, color:crmTab===t.id?filColor:$textMut, borderRadius:crmRd>0?99:2, padding:'1px 7px', fontSize:'0.7rem', fontWeight:600, border:`1px solid ${crmTab===t.id?filColor+'30':$borderLight}`}}>{t.count}</span>}
                  </button>
                ))}
              </div>

              {/* Tab content — minHeight prevents scroll jump when switching short/long tabs */}
              <div style={{minHeight:'calc(100vh - 320px)'}}>

              {/* Grouper par + Filtres & Colonnes toolbar */}
              {(crmTab === 'affaires' || crmTab === 'kanban') && (
                <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:16, flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.72rem', color:$textMut, fontWeight:600}}>Grouper par</span>
                  <select value={crmGroupBy} onChange={e=>setCrmGroupBy(e.target.value)} style={{fontSize:'0.74rem',padding:'4px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,background:$bgCard,color:$text,cursor:'pointer',outline:'none',fontFamily:'inherit',fontWeight:600}}>
                    <option value="phase">Phase</option>
                    <option value="statut">Statut</option>
                    <option value="marche">Marché</option>
                    <option value="equipe">Équipe</option>
                  </select>
                  <div style={{width:1, height:18, background:$border, margin:'0 2px'}}/>
                  <select value={crmFil} onChange={e => setCrmFil(e.target.value)} style={{fontSize:'0.74rem', padding:'4px 10px', border:`1px solid ${$border}`, borderRadius:crmRd, background:$bgCard, color:$textSec, cursor:'pointer', outline:'none', fontFamily:'inherit'}}>
                    <option value="all">Tous marchés</option>
                    <option value="public">◆ Public</option>
                    <option value="prive">▪ Privé</option>
                    <option value="particulier">◉ Particulier</option>
                  </select>
                  <button onClick={() => setCrmShowArchive(v => !v)} style={{padding:'4px 12px', borderRadius:crmRd>0?99:2, border:`1px solid ${crmShowArchive ? '#6b7280' : $border}`, background:crmShowArchive ? '#6b728015' : $bgCard, color:crmShowArchive ? '#6b7280' : $textMut, fontSize:'0.74rem', cursor:'pointer', fontWeight:crmShowArchive?600:400, fontFamily:'inherit', transition:'all 0.15s', display:'flex', alignItems:'center', gap:5}}>
                    ▣ {crmShowArchive ? 'Masquer archivés' : 'Afficher archivés'}
                    {crmShowArchive && <span style={{background:'#6b7280', color:'#fff', borderRadius:crmRd>0?99:2, padding:'0 6px', fontSize:'0.65rem', fontWeight:700}}>{ARCHIVES_REAL.length}</span>}
                  </button>
                  <div style={{marginLeft:'auto', position:'relative'}}>
                    <button onClick={() => setCrmFilterOpen(v => !v)} style={{padding:'5px 14px', borderRadius:crmRd, border:`1px solid ${crmFilterOpen ? filColor : $border}`, background:crmFilterOpen ? filColor+'12' : $bgCard, color:crmFilterOpen ? filColor : $textMut, fontSize:'0.74rem', cursor:'pointer', fontFamily:'inherit', fontWeight:600, display:'flex', alignItems:'center', gap:6, transition:'all 0.15s'}}>
                      ✱ Filtres &amp; Colonnes
                      {Object.values(crmVisibleCols).some(v => !v) && <span style={{width:6, height:6, borderRadius:'50%', background:$warn, display:'inline-block'}}/>}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Filtres & Colonnes panel ── */}
              {crmFilterOpen && crmTab === 'affaires' && (
                <>
                  <div onClick={() => setCrmFilterOpen(false)} style={{position:'fixed', inset:0, background:'transparent', zIndex:9997}}/>
                  <div style={{position:'fixed', top:210, right:20, width:320, maxHeight:'72vh', overflow:'auto', background:$bgCard, border:`1px solid ${$borderAlt}`, borderRadius:crmRd, padding:20, boxShadow:'0 12px 40px rgba(0,0,0,0.15)', zIndex:9998}} onClick={e => e.stopPropagation()}>
                    <div style={{fontWeight:700, fontSize:'0.82rem', color:$text, marginBottom:16}}>✱ Filtres &amp; Colonnes</div>

                    {/* Archive toggle */}
                    <div style={{marginBottom:16}}>
                      <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8}}>Affaires archivées (P7)</div>
                      <button onClick={() => setCrmShowArchive(v => !v)} style={{padding:'5px 14px', borderRadius:crmRd, border:`1px solid ${crmShowArchive ? '#6b7280' : $border}`, background:crmShowArchive ? '#6b728015' : $bgCard, color:crmShowArchive ? '#6b7280' : $textSec, fontSize:'0.74rem', cursor:'pointer', fontFamily:'inherit', fontWeight:600}}>
                        {crmShowArchive ? '▣ Archivés visibles — cliquer pour masquer' : '▣ Archivés masqués — cliquer pour afficher'}
                      </button>
                    </div>

                    {/* Marché filter */}
                    <div style={{marginBottom:16}}>
                      <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8}}>Marché</div>
                      <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
                        {[{id:'all',l:'Tous'},{id:'public',l:'◆ Public'},{id:'prive',l:'▪ Privé'},{id:'particulier',l:'◉ Particulier'}].map(f => (
                          <button key={f.id} onClick={() => setCrmFil(f.id)} style={{padding:'4px 10px', borderRadius:crmRd, border:`1px solid ${crmFil===f.id ? filColor : $border}`, background:crmFil===f.id ? filColor+'15' : 'transparent', color:crmFil===f.id ? filColor : $textSec, fontSize:'0.72rem', fontWeight:crmFil===f.id?600:400, cursor:'pointer', fontFamily:'inherit'}}>
                            {f.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colonnes visibles */}
                    <div style={{borderTop:`1px solid ${$border}`, paddingTop:14}}>
                      <div style={{fontSize:'0.68rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:10}}>Colonnes visibles</div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
                        {[
                          {id:'code',l:'Code',locked:true},
                          {id:'affaire',l:'Affaire',locked:true},
                          {id:'marche',l:'Marché'},
                          {id:'equipe',l:'Équipe'},
                          {id:'montant',l:'Montant'},
                          {id:'phase',l:'Phase'},
                          {id:'statut',l:'Statut'},
                          {id:'litige',l:'⚖️ Litige'},
                        ].map(col => (
                          <label key={col.id} style={{display:'flex', alignItems:'center', gap:7, fontSize:'0.74rem', color:$textSec, cursor:col.locked?'default':'pointer', opacity:col.locked?0.45:1}}>
                            <input type="checkbox" checked={crmVisibleCols[col.id] !== false} disabled={col.locked} onChange={() => setCrmVisibleCols(p => ({...p, [col.id]: !p[col.id]}))} style={{accentColor:filColor, width:13, height:13}}/>
                            {col.l}
                          </label>
                        ))}
                      </div>
                      <button onClick={() => setCrmVisibleCols({code:true,affaire:true,marche:true,equipe:true,montant:true,phase:true,statut:true,litige:true})} style={{marginTop:10, fontSize:'0.68rem', color:$textMut, background:'transparent', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit', textDecoration:'underline'}}>
                        Réinitialiser les colonnes
                      </button>
                    </div>
                  </div>
                </>
              )}

              {crmTab === 'affaires' && (() => {
                const buildGroups = () => {
                  if (crmGroupBy === 'phase') return PHASES.map(ph => ({ key:String(ph.id), label:ph.label, icon:ph.icon, color:ph.color, items:affairesToShow.filter(a=>getPhase(a)===ph.id) })).filter(g=>g.items.length>0);
                  if (crmGroupBy === 'statut') { const sts=[...new Set(affairesToShow.map(a=>a.st||a.statut||'—'))]; return sts.map(st=>{ const ph=PHASES.find(p=>p.id===getPhase(affairesToShow.find(a=>(a.st||a.statut)===st)||{}))||PHASES[0]; return {key:st,label:st,icon:ph.icon,color:ph.color,items:affairesToShow.filter(a=>(a.st||a.statut||'—')===st)}; }).filter(g=>g.items.length>0); }
                  if (crmGroupBy === 'marche') return [{key:'Public',label:'Marché Public',icon:'◆',color:'#3b82f6',items:affairesToShow.filter(a=>(a.mk||a.marche)==='Public')},{key:'Privé',label:'Marché Privé',icon:'▪',color:'#f59e0b',items:affairesToShow.filter(a=>(a.mk||a.marche)==='Privé')},{key:'Particulier',label:'Particulier',icon:'◉',color:'#8b5cf6',items:affairesToShow.filter(a=>(a.mk||a.marche)==='Particulier')}].filter(g=>g.items.length>0);
                  if (crmGroupBy === 'equipe') { const eqs=[...new Set(affairesToShow.map(a=>a.eq||a.equipe||'—'))]; return eqs.map((eq,i)=>({key:eq,label:eq||'Non assigné',icon:'◉',color:['#3b82f6','#8b5cf6','#f59e0b','#22c55e','#f97316'][i%5],items:affairesToShow.filter(a=>(a.eq||a.equipe||'—')===eq)})); }
                  return [{key:'all',label:'Toutes les affaires',icon:'☰',color:filColor,items:affairesToShow}];
                };
                const groups = buildGroups();
                const mkColor = mk => mk==='Public'?'#3b82f6':mk==='Particulier'?'#8b5cf6':'#f59e0b';
                const stInfo = st => {
                  const s = st||'';
                  if(s.includes('cours')) return {c:'#3b82f6',ic:'▶'};
                  if(s.includes('suspendu')||s.includes('Suspendu')) return {c:'#f97316',ic:'⏸'};
                  if(s.includes('DGD')) return {c:'#8b5cf6',ic:'▫'};
                  if(s.includes('GPA')||s.includes('RG')) return {c:'#f97316',ic:'🛡'};
                  if(s.includes('Terminé')||s.includes('libérée')) return {c:'#6b7280',ic:'✓'};
                  if(s.includes('reçu')||s.includes('remportée')) return {c:'#22c55e',ic:'✓'};
                  if(s.includes('réserves')||s.includes('Levée')) return {c:'#8b5cf6',ic:'⌕'};
                  if(s.includes('transféré')) return {c:$textMut,ic:'→'};
                  return {c:$textSec,ic:'·'};
                };
                const renderRow = (a, i, grpColor, isFirst, isLast) => {
                  const ph = PHASES.find(p => p.id === getPhase(a)) || PHASES[0];
                  const mkClr = mkColor(a.mk||a.marche);
                  const isLit = a.lit;
                  const isArchive = getPhase(a) === 7;
                  const cols = crmVisibleCols;
                  const st = a.st||a.statut||'—';
                  const si2 = stInfo(st);
                  return (
                    <tr key={a.cd||a.id||i}
                      style={{borderBottom:isLast?'none':`1px solid ${$borderLight}`,transition:'background 0.1s',cursor:'pointer',background:isLit?'#e74c3c06':$bgSub+'60'}}
                      onClick={()=>{setCrmFicheId(a.cd||a.id);setCrmFicheTab('intervenants');}}
                      onMouseEnter={e=>e.currentTarget.style.background=isLit?'#e74c3c12':$bgCardHover}
                      onMouseLeave={e=>e.currentTarget.style.background=isLit?'#e74c3c06':$bgSub+'60'}>
                      {cols.code!==false&&<td style={{padding:'12px 14px',whiteSpace:'nowrap',position:'relative'}}>
                        {grpColor&&<div style={{position:'absolute',left:0,top:0,bottom:0,width:4,background:grpColor,borderRadius:isLast?`0 0 0 ${crmRd}px`:'0'}}/>}
                        <span style={{fontFamily:'monospace',fontSize:'0.8rem',fontWeight:700,color:filColor,paddingLeft:grpColor?6:0}}>{a.cd||a.id}</span>
                      </td>}
                      {cols.affaire!==false&&<td style={{padding:'12px 14px'}}>
                        <div style={{fontWeight:600,fontSize:'0.84rem',color:isArchive?$textSec:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:280,opacity:isArchive?0.7:1}}>{a.n||a.nom}</div>
                      </td>}
                      {cols.marche!==false&&<td style={{padding:'12px 14px',whiteSpace:'nowrap'}}>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:mkClr+'18',color:mkClr,display:'inline-flex',alignItems:'center',gap:4}}>
                          <span style={{width:5,height:5,borderRadius:'50%',background:mkClr}}/>{a.mk||a.marche}
                        </span>
                      </td>}
                      {cols.equipe!==false&&<td style={{padding:'12px 14px',fontSize:'0.8rem',color:$textSec,whiteSpace:'nowrap'}}>{a.eq||a.equipe||'—'}</td>}
                      {cols.montant!==false&&<td style={{padding:'12px 14px',fontWeight:700,fontSize:'0.88rem',color:isArchive?$textMut:$text,whiteSpace:'nowrap'}}>{a.m&&a.m!=='--'?a.m+'€':a.montant?fmtE(a.montant):'—'}</td>}
                      {cols.phase!==false&&<td style={{padding:'12px 14px',whiteSpace:'nowrap'}}>
                        <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:ph.color+'18',color:ph.color,display:'inline-flex',alignItems:'center',gap:4}}>
                          <span style={{width:5,height:5,borderRadius:'50%',background:ph.color}}/>{ph.icon} {ph.label.split('—')[1]?.trim()||ph.label}
                        </span>
                      </td>}
                      {cols.statut!==false&&<td style={{padding:'12px 14px',fontSize:'0.78rem',color:si2.c,whiteSpace:'nowrap'}}>{si2.ic} {st}</td>}
                      {cols.litige!==false&&<td style={{padding:'12px 14px',textAlign:'center'}}>
                        {isLit&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.7rem',fontWeight:600,background:'#e74c3c18',color:'#e74c3c',display:'inline-flex',alignItems:'center',gap:4}}>⚖️ Litige</span>}
                      </td>}
                    </tr>
                  );
                };
                return (
                  <div style={{border:`1px solid ${$border}`,borderRadius:crmRd,overflow:'hidden',boxShadow:$shadow,background:$bgCard}}>
                    <div style={{padding:'10px 16px',borderBottom:`1px solid ${$border}`,background:$bgSub,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{fontSize:'0.8rem',fontWeight:700,color:$text}}>☰ {affairesToShow.length} affaires · {groups.length} groupe{groups.length>1?'s':''}</span>
                      {litCount>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:'#e74c3c18',color:'#e74c3c',display:'inline-flex',alignItems:'center',gap:4}}>⚖️ {litCount} litige{litCount>1?'s':''} en cours</span>}
                    </div>
                    {/* Sticky group indicator — Monday.com style */}
                    {crmActiveGroup && (
                      <div style={{padding:'5px 16px', background:crmActiveGroup.color+'18', borderBottom:`2px solid ${crmActiveGroup.color}`, display:'flex', alignItems:'center', gap:8}}>
                        <span style={{fontWeight:700, fontSize:'0.78rem', color:crmActiveGroup.color, letterSpacing:'0.02em', textTransform:'uppercase'}}>{crmActiveGroup.icon} {crmActiveGroup.label}</span>
                        <span style={{fontSize:'0.68rem', color:crmActiveGroup.color, background:crmActiveGroup.color+'22', borderRadius:crmRd>0?99:2, padding:'1px 8px', fontWeight:700}}>{crmActiveGroup.count} affaire{crmActiveGroup.count>1?'s':''}</span>
                      </div>
                    )}
                    <div ref={crmScrollRef} style={{overflowX:'auto',maxHeight:'62vh',overflowY:'auto'}} onScroll={()=>{
                      const el = crmScrollRef.current;
                      if(!el) return;
                      const rows = el.querySelectorAll('[data-group-header]');
                      let active = null;
                      rows.forEach(row => {
                        const rect = row.getBoundingClientRect();
                        const parentRect = el.getBoundingClientRect();
                        if(rect.top < parentRect.top + 4) {
                          active = { label: row.dataset.groupLabel, icon: row.dataset.groupIcon, color: row.dataset.groupColor, count: parseInt(row.dataset.groupCount||'0') };
                        }
                      });
                      setCrmActiveGroup(active);
                    }}>
                      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                        <thead>
                          <tr style={{background:$bgSub,position:'sticky',top:0,zIndex:2}}>
                            {[{id:'code',l:'Code'},{id:'affaire',l:'Affaire'},{id:'marche',l:'Marché'},{id:'equipe',l:'Équipe'},{id:'montant',l:'Montant'},{id:'phase',l:'Phase'},{id:'statut',l:'Statut'},{id:'litige',l:''}].filter(h=>crmVisibleCols[h.id]!==false).map((h,hi,arr)=>(
                              <th key={h.id} style={{padding:'10px 14px',textAlign:'left',fontWeight:700,fontSize:'0.78rem',color:$textMut,borderBottom:`1px solid ${$border}`,letterSpacing:'0.04em',textTransform:'uppercase',position:'relative',background:$bgSub,userSelect:'none',minWidth:crmColWidths[h.id]||80,maxWidth:crmColWidths[h.id]||undefined,width:crmColWidths[h.id]||undefined}}>
                                {h.l}
                                {hi<arr.length-1&&<div
                                  style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',display:'flex',alignItems:'center',justifyContent:'center',zIndex:3}}
                                  onMouseDown={e=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const startX=e.clientX;
                                    const startW=crmColWidths[h.id]||120;
                                    const colId=h.id;
                                    const overlay=document.createElement('div');
                                    overlay.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';
                                    document.body.appendChild(overlay);
                                    const onMove=ev=>{const nw=Math.max(60,startW+ev.clientX-startX);setCrmColWidths(prev=>({...prev,[colId]:nw}));};
                                    const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);overlay.remove();};
                                    document.addEventListener('mousemove',onMove);
                                    document.addEventListener('mouseup',onUp);
                                  }}>
                                  <div style={{width:2,height:'55%',background:$border,borderRadius:crmRd>0?2:0,pointerEvents:'none'}}/>
                                </div>}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {groups.map((g, gi) => {
                            const grpTotal = g.items.reduce((s,a)=>s+parseMontant(a.m||a.montant),0);
                            const isCollapsed = !!crmCollapsed[g.key];
                            return (
                              <React.Fragment key={g.key}>
                                {gi>0&&<tr><td colSpan={8} style={{height:20,background:$bgSub,padding:0}}/></tr>}
                                <tr>
                                  <td colSpan={8} style={{padding:0}}
                                    data-group-header="1"
                                    data-group-label={g.label}
                                    data-group-icon={g.icon}
                                    data-group-color={g.color}
                                    data-group-count={g.items.length}>
                                    <div onClick={()=>setCrmCollapsed(prev=>({...prev,[g.key]:!prev[g.key]}))}
                                      style={{display:'flex',alignItems:'center',gap:10,padding:'7px 14px 7px 18px',background:g.color+'10',borderTop:`1px solid ${g.color}25`,borderBottom:`1px solid ${g.color}25`,cursor:'pointer',userSelect:'none',transition:'background 0.15s',position:'relative'}}
                                      onMouseEnter={e=>e.currentTarget.style.background=g.color+'1e'}
                                      onMouseLeave={e=>e.currentTarget.style.background=g.color+'10'}>
                                      <div style={{position:'absolute',left:0,top:0,bottom:0,width:4,background:g.color,borderRadius:isCollapsed?`${crmRd}px 0 0 ${crmRd}px`:`${crmRd}px 0 0 0`}}/>
                                      <span style={{fontSize:'0.65rem',color:g.color,fontWeight:700,transition:'transform 0.15s',display:'inline-block',transform:isCollapsed?'rotate(-90deg)':'rotate(0deg)',width:12,textAlign:'center'}}>▾</span>
                                      <span style={{fontWeight:700,fontSize:'0.8rem',color:g.color}}>{g.icon} {g.label}</span>
                                      <span style={{padding:'1px 9px',borderRadius:crmRd>0?99:2,fontSize:'0.7rem',fontWeight:700,background:g.color+'22',color:g.color}}>{g.items.length} affaire{g.items.length>1?'s':''}</span>
                                      {grpTotal>0&&<span style={{fontSize:'0.72rem',color:g.color,marginLeft:'auto',fontWeight:700,opacity:0.85}}>{fmtE(grpTotal)}</span>}
                                    </div>
                                  </td>
                                </tr>
                                {!isCollapsed && g.items.map((a,i)=>renderRow(a,i,g.color,i===0,i===g.items.length-1))}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {affairesToShow.length===0&&<div style={{padding:48,textAlign:'center',color:$textMut}}>Aucune affaire correspondante</div>}
                    <div style={{padding:'7px 16px',borderTop:`1px solid ${$border}`,fontSize:'0.62rem',color:$textMut,display:'flex',justifyContent:'space-between',background:$bgSub+'80'}}>
                      <span>▦ Monday.com · board 4113177037 · 44 actives / 81 total</span>
                      <span>Sync : 11/03/2026</span>
                    </div>
                  </div>
                );
              })()}

              {/* ===== TAB: KANBAN ===== */}
              {crmTab === 'kanban' && (
                <div style={{display:'flex', gap:12, overflowX:'auto', paddingBottom:8}}>
                  {PHASES.map(ph => {
                    const items = affairesToShow.filter(a => getPhase(a) === ph.id);
                    return (
                      <div key={ph.id} style={{minWidth:220, flex:'0 0 220px', background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                        <div style={{padding:'10px 14px', background:ph.color+'15', borderBottom:`1px solid ${ph.color+'30'}`, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <div style={{display:'flex', alignItems:'center', gap:6}}>
                            <span>{ph.icon}</span>
                            <span style={{fontWeight:700, color:ph.color, fontSize:'0.82rem'}}>{ph.label}</span>
                          </div>
                          <span style={{background:ph.color+'25', color:ph.color, borderRadius:crmRd>0?99:2, padding:'1px 8px', fontSize:'0.7rem', fontWeight:700}}>{items.length}</span>
                        </div>
                        <div style={{padding:8, display:'flex', flexDirection:'column', gap:8, minHeight:100}}>
                          {items.map(a => (
                            <div key={a.id} style={{background:$bgSub, borderRadius:Math.max(crmRd-2,0), border:`1px solid ${$border}`, padding:'10px 12px', cursor:'pointer', transition:'box-shadow 0.15s'}} onMouseEnter={e=>e.currentTarget.style.boxShadow=$shadow} onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                              <div style={{fontSize:'0.78rem', fontWeight:600, color:$text, marginBottom:4, lineHeight:1.3}}>{a.nom}</div>
                              <div style={{fontSize:'0.7rem', color:$textMut, marginBottom:6}}>{a.client}</div>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{fontSize:'0.78rem', fontWeight:700, color:ph.color}}>{fmtE(parseMontant(a.m||a.montant))}</div>
                                <span style={{fontSize:'0.65rem', background:a.mk==='Public'||a.marche==='Public'?'#3b82f615':'#f59e0b15', color:a.mk==='Public'||a.marche==='Public'?'#3b82f6':'#f59e0b', padding:'1px 6px', borderRadius:crmRd>0?99:2}}>{a.mk||a.marche}</span>
                              </div>
                              {(a.eq||a.equipe) && <div style={{fontSize:'0.65rem', color:$textMut, marginTop:4}}>◉ {a.eq||a.equipe}</div>}
                            </div>
                          ))}
                          {items.length === 0 && <div style={{textAlign:'center', color:$textMut, fontSize:'0.72rem', padding:'20px 0', opacity:0.5}}>Vide</div>}
                        </div>
                        <div style={{padding:'8px 12px', borderTop:`1px solid ${$border}`, textAlign:'right', fontSize:'0.72rem', fontWeight:700, color:ph.color}}>
                          {fmtE(items.reduce((s,a)=>s+parseMontant(a.m||a.montant),0))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ===== TAB: ENTREPRISES ===== */}
              {crmTab === 'entreprises' && (
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden'}}>
                  <div style={{padding:'12px 16px', borderBottom:`1px solid ${$border}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontWeight:700, color:$text, fontSize:'0.9rem'}}>▪ Répertoire Entreprises</span>
                    <button style={{padding:'5px 14px', borderRadius:crmRd, border:`1px solid ${filColor}`, background:filColor+'10', color:filColor, fontSize:'0.78rem', cursor:'pointer', fontWeight:600, fontFamily:'inherit'}}>+ Nouvelle entreprise</button>
                  </div>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:'0.8rem'}}>
                    <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`}}>{['Entreprise','Secteur','Ville','CA','Contacts','Affaires','Statut'].map((h,i)=><th key={i} style={{position:'relative',padding:'9px 14px',textAlign:'left',fontSize:'0.68rem',fontWeight:700,color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
                    <tbody>
                      {ENTREPRISES_MOCK.map((e,i) => (
                        <tr key={e.id} style={{borderBottom:`1px solid ${$border}`, cursor:'pointer', transition:'background 0.1s'}} onMouseEnter={ev=>ev.currentTarget.style.background=$bgCardHover} onMouseLeave={ev=>ev.currentTarget.style.background='transparent'}>
                          <td style={{padding:'10px 14px',fontWeight:600,color:$text}}>{e.nom}</td>
                          <td style={{padding:'10px 14px',color:$textSec,fontSize:'0.78rem'}}>{e.secteur}</td>
                          <td style={{padding:'10px 14px',color:$textMut,fontSize:'0.78rem'}}>{e.ville}</td>
                          <td style={{padding:'10px 14px',color:$textSec,fontSize:'0.78rem'}}>{e.ca}</td>
                          <td style={{padding:'10px 14px',textAlign:'center'}}><span style={{background:$bgSub,borderRadius:crmRd>0?99:2,padding:'2px 10px',fontSize:'0.75rem',fontWeight:700,color:$text}}>{e.contacts}</span></td>
                          <td style={{padding:'10px 14px',textAlign:'center'}}><span style={{background:filColor+'12',borderRadius:crmRd>0?99:2,padding:'2px 10px',fontSize:'0.75rem',fontWeight:700,color:filColor}}>{e.affaires}</span></td>
                          <td style={{padding:'10px 14px'}}><span style={{padding:'2px 8px',borderRadius:crmRd>0?99:2,background:e.statut==='Client actif'?'#22c55e15':'#f59e0b15',color:e.statut==='Client actif'?'#22c55e':'#f59e0b',fontSize:'0.7rem',fontWeight:600}}>{e.statut}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ===== TAB: CONTACTS ===== */}
              {crmTab === 'contacts' && (() => {
                // ─── Config ───────────────────────────────────────────────
                const PIPE_STAGES = [
                  {id:'froid',      label:'Froid',       icon:'🧊', color:'#94a3b8'},
                  {id:'contacté',   label:'Contacté',    icon:'↥', color:'#3b82f6'},
                  {id:'en_echange', label:'En échange',  icon:'💬', color:'#f97316'},
                  {id:'qualifié',   label:'Qualifié',    icon:'◎', color:'#10b981'},
                  {id:'proposition',label:'Proposition', icon:'✎', color:'#8b5cf6'},
                  {id:'affaire',    label:'Affaire',     icon:'🤝', color:'#007ab5'},
                ];
                const NEXT_ACTIONS = [
                  {id:'appeler',    label:'À appeler',    icon:'✆', color:'#3b82f6'},
                  {id:'emailer',    label:'À emailer',    icon:'✉️',  color:'#6366f1'},
                  {id:'relancer',   label:'À relancer',  icon:'🔁', color:'#f59e0b'},
                  {id:'en_attente', label:'En attente',  icon:'⏳', color:'#94a3b8'},
                  {id:'rdv',        label:'RDV à prép.', icon:'◫', color:'#8b5cf6'},
                  {id:'proposition',label:'Envoyer offre',icon:'▫',color:'#10b981'},
                  {id:'rien',       label:'Rien',         icon:'🚫', color:'#d1d5db'},
                ];
                const ACT_TYPES = [
                  {id:'appel',   label:'Appel',   icon:'✆', color:'#3b82f6'},
                  {id:'email',   label:'Email',   icon:'✉️',  color:'#6366f1'},
                  {id:'rdv',     label:'RDV',     icon:'◫', color:'#8b5cf6'},
                  {id:'relance', label:'Relance', icon:'🔁', color:'#f59e0b'},
                  {id:'note',    label:'Note',    icon:'✎', color:'#64748b'},
                  {id:'offre',   label:'Offre',   icon:'▫', color:'#10b981'},
                ];
                const TC_TYPES = [
                  {id:'architecte', label:'Architecte',  icon:'◺', color:'#8b5cf6'},
                  {id:'moe',        label:'MOE / Ingé.', icon:'📏', color:'#3b82f6'},
                  {id:'promoteur',  label:'Promoteur',   icon:'◆', color:'#f97316'},
                  {id:'immo',       label:'Immo.',        icon:'🏠', color:'#f59e0b'},
                  {id:'gestionnaire',label:'Gest. Copro',icon:'🗂️', color:'#10b981'},
                  {id:'bailleur',   label:'Bailleur soc.',icon:'◆',color:'#007ab5'},
                  {id:'industriel', label:'Industriel',  icon:'✱', color:'#6b7280'},
                  {id:'particulier',label:'Particulier', icon:'◉', color:'#ec4899'},
                  {id:'autre',      label:'Autre',        icon:'▪', color:'#94a3b8'},
                ];
                const PRIO_LIST = [
                  {id:'haute',   label:'Haute',   icon:'🔴', color:'#ef4444'},
                  {id:'normale', label:'Normale', icon:'🟡', color:'#f59e0b'},
                  {id:'basse',   label:'Basse',   icon:'🔵', color:'#94a3b8'},
                ];

                // ─── Helpers ──────────────────────────────────────────────
                const getMeta = (c) => ctContactMeta[c.id] || {};
                const getPipe = (c) => getMeta(c).pipeline || c.pipe0;
                const getAction = (c) => getMeta(c).action || c.act0;
                const getPrio = (c) => getMeta(c).prio || c.prio;
                const getTc = (c) => getMeta(c).tc || c.tc;
                const getSect = (c) => getMeta(c).sect || c.sect;
                const getRef = (c) => getMeta(c).ref || c.ref;
                const setMeta = (cid, key, val) => setCtContactMeta(prev => ({...prev, [cid]: {...(prev[cid]||{}), [key]: val}}));
                const getPipeStage = (c) => PIPE_STAGES.find(s=>s.id===getPipe(c)) || PIPE_STAGES[0];
                const getActionObj = (c) => NEXT_ACTIONS.find(a=>a.id===getAction(c)) || NEXT_ACTIONS[0];
                const getTcObj = (c) => TC_TYPES.find(t=>t.id===getTc(c)) || TC_TYPES[8];
                const getPrioObj = (c) => PRIO_LIST.find(p=>p.id===getPrio(c)) || PRIO_LIST[1];
                const getRefColor = (r) => r==='Ozdogan'?filColor:r==='Ozlem'?'#ec4899':'#94a3b8';
                const ini = (nom) => { const p = nom.trim().split(/\s+/); return ((p[0]||'')[0]||'')+((p[p.length-1]||'')[0]||''); };
                const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'2-digit',hour:'2-digit',minute:'2-digit'}); } catch(e2) { return iso; } };
                const getAnciennete = (c) => {
                  const acts = ctActivities[c.id]||[];
                  if(!acts.length) return 'jamais';
                  const d = new Date(acts[0].date);
                  const now = new Date();
                  const diff = (now-d)/(1000*60*60*24);
                  if(diff < 7) return 'semaine';
                  if(diff < 30) return 'mois';
                  if(diff < 90) return 'plus30';
                  return 'plus90';
                };

                // ─── Filter ───────────────────────────────────────────────
                const filtered = CONTACTS_REAL.filter(c => {
                  const q = ctSearch.toLowerCase();
                  const mQ = !q || c.nom.toLowerCase().includes(q) || c.entreprise.toLowerCase().includes(q) || c.poste.toLowerCase().includes(q);
                  const mP = ctPipeFilter === 'all' || getPipe(c) === ctPipeFilter;
                  return mQ && mP;
                });

                // ─── Grouping ─────────────────────────────────────────────
                const buildGroups = () => {
                  if(ctGroupBy === 'pipeline') {
                    return PIPE_STAGES.map(s => ({key:s.id, label:s.label, icon:s.icon, color:s.color, items:filtered.filter(c=>getPipe(c)===s.id)})).filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'action') {
                    return NEXT_ACTIONS.map(a => ({key:a.id, label:a.label, icon:a.icon, color:a.color, items:filtered.filter(c=>getAction(c)===a.id)})).filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'ancienneté') {
                    const buckets = [
                      {key:'semaine', label:'Cette semaine', icon:'🟢', color:'#10b981'},
                      {key:'mois',    label:'Ce mois',       icon:'🟡', color:'#f59e0b'},
                      {key:'plus30',  label:'+ 30 jours',    icon:'🟠', color:'#f97316'},
                      {key:'plus90',  label:'+ 90 jours',    icon:'🔴', color:'#ef4444'},
                      {key:'jamais',  label:'Jamais contacté',icon:'⚫', color:'#94a3b8'},
                    ];
                    return buckets.map(b => ({...b, items:filtered.filter(c=>getAnciennete(c)===b.key)})).filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'type') {
                    return TC_TYPES.map(t => ({key:t.id, label:t.label, icon:t.icon, color:t.color, items:filtered.filter(c=>getTc(c)===t.id)})).filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'secteur') {
                    return [
                      {key:'privé',  label:'Secteur Privé',  icon:'▪', color:'#3b82f6', items:filtered.filter(c=>getSect(c)==='privé')},
                      {key:'public', label:'Secteur Public',  icon:'◆', color:'#10b981', items:filtered.filter(c=>getSect(c)==='public')},
                      {key:'mixte',  label:'Mixte',            icon:'🔀', color:'#8b5cf6', items:filtered.filter(c=>getSect(c)==='mixte')},
                    ].filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'priorité') {
                    return PRIO_LIST.map(p => ({key:p.id, label:`Priorité ${p.label}`, icon:p.icon, color:p.color, items:filtered.filter(c=>getPrio(c)===p.id)})).filter(g=>g.items.length>0);
                  }
                  if(ctGroupBy === 'referent') {
                    const refs = [...new Set(CONTACTS_REAL.map(c=>getRef(c)))].sort();
                    return refs.map(r => ({key:r, label:r||'Non assigné', icon:'◉', color:getRefColor(r), items:filtered.filter(c=>getRef(c)===r)})).filter(g=>g.items.length>0);
                  }
                  return [{key:'all', label:'', icon:'', color:filColor, items:filtered}];
                };
                const groups = buildGroups();

                const selContact = ctSelectedContact ? CONTACTS_REAL.find(c=>c.id===ctSelectedContact) : null;
                const selActs = selContact ? (ctActivities[selContact.id]||[]) : [];
                const addActivity = () => {
                  if(!ctNewNote.trim() || !selContact) return;
                  const act = { id: Date.now().toString(), type: ctNewActType, text: ctNewNote.trim(), date: new Date().toISOString(), auteur:'Ozdogan Y.' };
                  setCtActivities(prev => ({ ...prev, [selContact.id]: [act, ...(prev[selContact.id]||[])] }));
                  setCtNewNote('');
                };

                // ─── Card Component ───────────────────────────────────────
                const ContactCard = ({c}) => {
                  const pipe = getPipeStage(c);
                  const act  = getActionObj(c);
                  const prio = getPrioObj(c);
                  const tc   = getTcObj(c);
                  const actCnt = (ctActivities[c.id]||[]).length;
                  const isSelected = ctSelectedContact === c.id;
                  return (
                    <div onClick={()=>setCtSelectedContact(isSelected?null:c.id)}
                      style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${isSelected?filColor:$border}`, padding:'12px 14px', cursor:'pointer', transition:'all 0.15s', boxShadow:isSelected?`0 0 0 2px ${filColor}30`:'', overflow:'hidden'}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=isSelected?filColor:filColor+'50'; e.currentTarget.style.boxShadow=isSelected?`0 0 0 2px ${filColor}30`:$shadow;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=isSelected?filColor:$border; e.currentTarget.style.boxShadow=isSelected?`0 0 0 2px ${filColor}30`:'none';}}>
                      {/* Top accent bar + nom + prio */}
                      <div style={{height:3, borderRadius:'2px 2px 0 0', background:isSelected?filColor:pipe.color, margin:'-12px -14px 12px -14px', transition:'background 0.2s'}} />
                      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:7}}>
                        <div style={{minWidth:0, flex:1}}>
                          <div style={{fontWeight:700, color:$text, fontSize:'0.85rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', letterSpacing:'-0.01em'}}>{c.nom}</div>
                          {c.poste && <div style={{fontSize:'0.69rem', color:$textMut, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:2}}>{c.poste}</div>}
                        </div>
                        {getPrio(c) !== 'normale' && <span title={`Priorité ${prio.label}`} style={{padding:'1px 5px', borderRadius:2, background:prio.color+'15', color:prio.color, fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', flexShrink:0, border:`1px solid ${prio.color}25`}}>{prio.label}</span>}
                      </div>
                      {/* Entreprise + type */}
                      {c.entreprise && <div style={{display:'flex', alignItems:'center', gap:5, marginBottom:7}}>
                        <span style={{fontSize:'0.68rem', color:tc.color}}>{tc.icon}</span>
                        <span style={{fontSize:'0.72rem', color:$textSec, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1}}>{c.entreprise}</span>
                      </div>}
                      {/* 2-axis badges */}
                      <div style={{display:'flex', gap:4, flexWrap:'wrap', marginBottom:7}}>
                        <span style={{padding:'2px 7px', borderRadius:crmRd>0?99:2, background:pipe.color+'18', color:pipe.color, fontSize:'0.62rem', fontWeight:700, border:`1px solid ${pipe.color}30`}}>{pipe.icon} {pipe.label}</span>
                        <span style={{padding:'2px 7px', borderRadius:crmRd>0?99:2, background:act.color+'18', color:act.color, fontSize:'0.62rem', fontWeight:600, border:`1px solid ${act.color}25`}}>{act.icon} {act.label}</span>
                      </div>
                      {/* Footer */}
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:6}}>
                        <div style={{display:'flex', gap:6}}>
                          {c.tel && <span style={{fontSize:'0.65rem', color:$textMut}}>✆ {c.tel}</span>}
                        </div>
                        <div style={{display:'flex', gap:4, alignItems:'center'}}>
                          {actCnt>0 && <span style={{padding:'1px 5px', borderRadius:99, background:filColor+'15', color:filColor, fontSize:'0.6rem', fontWeight:700}}>✎{actCnt}</span>}
                          <span style={{fontSize:'0.62rem', color:getRefColor(getRef(c)), fontWeight:600}}>{getRef(c)?.[0]}</span>
                        </div>
                      </div>
                    </div>
                  );
                };

                return (
                  <div style={{display:'flex', gap:0, height:'calc(100vh - 240px)', minHeight:520}}>

                    {/* ── MAIN PANEL ── */}
                    <div style={{flex: selContact ? '0 0 500px' : '1', minWidth:0, display:'flex', flexDirection:'column', borderRight: selContact ? `1px solid ${$border}` : 'none', overflowY:'hidden', paddingRight: selContact ? 16 : 0}}>

                      {/* Toolbar row 1 */}
                      <div style={{flexShrink:0, paddingBottom:10}}>
                        <div style={{display:'flex', gap:8, marginBottom:8, alignItems:'center', flexWrap:'wrap'}}>
                          <input value={ctSearch} onChange={e=>setCtSearch(e.target.value)} placeholder="Rechercher nom, entreprise..." style={{flex:1, minWidth:120, padding:'6px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$text, fontSize:'0.8rem', fontFamily:'inherit', outline:'none'}} />
                          {/* Grouper par */}
                          <div style={{display:'flex', alignItems:'center', gap:5, flexShrink:0}}>
                            <span style={{fontSize:'0.68rem', color:$textMut, whiteSpace:'nowrap'}}>Grouper par</span>
                            <select value={ctGroupBy} onChange={e=>setCtGroupBy(e.target.value)} style={{padding:'5px 8px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$text, fontSize:'0.73rem', fontFamily:'inherit', outline:'none', cursor:'pointer'}}>
                              <option value="none">Aucun</option>
                              <option value="pipeline">Pipeline</option>
                              <option value="action">Prochaine action</option>
                              <option value="ancienneté">Ancienneté contact</option>
                              <option value="type">Type de contact</option>
                              <option value="secteur">Secteur (Privé/Public)</option>
                              <option value="priorité">Priorité</option>
                              <option value="referent">Référent</option>
                            </select>
                          </div>
                          {/* Vue toggle */}
                          <div style={{display:'flex', borderRadius:crmRd, border:`1px solid ${$border}`, overflow:'hidden', flexShrink:0}}>
                            {[{v:'list',icon:'☰'},{v:'cards',icon:'⊞'}].map(({v,icon}) => (
                              <button key={v} onClick={()=>setCtView(v)} style={{padding:'5px 10px', border:'none', background:ctView===v?filColor:'transparent', color:ctView===v?'#fff':$textMut, fontSize:'0.82rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.12s'}}>{icon}</button>
                            ))}
                          </div>
                          <span style={{fontSize:'0.7rem', color:$textMut, whiteSpace:'nowrap', flexShrink:0}}>{filtered.length}/{CONTACTS_REAL.length}</span>
                        </div>
                        {/* Pipeline filter pills */}
                        <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
                          <button onClick={()=>setCtPipeFilter('all')} style={{padding:'3px 8px', borderRadius:crmRd>0?99:2, border:`1px solid ${ctPipeFilter==='all'?filColor:$border}`, background:ctPipeFilter==='all'?filColor+'18':'transparent', color:ctPipeFilter==='all'?filColor:$textMut, fontSize:'0.67rem', fontWeight:ctPipeFilter==='all'?700:400, cursor:'pointer', fontFamily:'inherit'}}>
                            Tous ({CONTACTS_REAL.length})
                          </button>
                          {PIPE_STAGES.map(s => {
                            const cnt = CONTACTS_REAL.filter(c=>getPipe(c)===s.id).length;
                            const isA = ctPipeFilter === s.id;
                            return (
                              <button key={s.id} onClick={()=>setCtPipeFilter(s.id)} style={{padding:'3px 8px', borderRadius:crmRd>0?99:2, border:`1px solid ${isA?s.color:$border}`, background:isA?s.color+'18':'transparent', color:isA?s.color:$textMut, fontSize:'0.67rem', fontWeight:isA?700:400, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3}}>
                                <span>{s.icon}</span>{s.label} ({cnt})
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{flex:1, overflowY:'auto'}}>
                        {groups.map((group, gi) => (
                          <div key={group.key} style={{marginBottom: ctGroupBy !== 'none' ? 18 : 0}}>
                            {ctGroupBy !== 'none' && (
                              <div style={{display:'flex', alignItems:'center', gap:8, padding:'5px 0 7px', borderBottom:`2px solid ${group.color}30`, marginBottom:8, position:'sticky', top:0, background:$bg, zIndex:2}}>
                                <span>{group.icon}</span>
                                <span style={{fontWeight:700, color:group.color, fontSize:'0.8rem'}}>{group.label}</span>
                                <span style={{padding:'1px 7px', borderRadius:99, background:group.color+'18', color:group.color, fontSize:'0.65rem', fontWeight:700}}>{group.items.length}</span>
                                <div style={{flex:1, height:1, background:group.color+'20'}} />
                              </div>
                            )}

                            {/* LIST VIEW */}
                            {ctView === 'list' && (
                              <table style={{width:'100%', borderCollapse:'collapse'}}>
                                {(gi === 0 || ctGroupBy !== 'none') && (
                                  <thead><tr style={{borderBottom:`1px solid ${$border}`}}>
                                    <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.05em', minWidth:120}}>Contact<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                                    {!selContact && <><th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', minWidth:90}}>Type<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                                    <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', minWidth:80}}>Tél<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                                    <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', minWidth:100}}>Email<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th></>}
                                    <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', whiteSpace:'nowrap', minWidth:90}}>Pipeline<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                                    <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', whiteSpace:'nowrap', minWidth:110}}>Prochaine action<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>
                                    {!selContact && <th style={{position:'relative', padding:'5px 6px', textAlign:'center', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', minWidth:30}}>P<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>}
                                    {!selContact && <th style={{position:'relative', padding:'5px 6px', textAlign:'left', fontSize:'0.6rem', fontWeight:700, color:$textMut, textTransform:'uppercase', minWidth:60}}>Réf.<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>}
                                  </tr></thead>
                                )}
                                <tbody>
                                  {group.items.map(c => {
                                    const pipe = getPipeStage(c);
                                    const act  = getActionObj(c);
                                    const prio = getPrioObj(c);
                                    const tc   = getTcObj(c);
                                    const isSelected = ctSelectedContact === c.id;
                                    const actCnt = (ctActivities[c.id]||[]).length;
                                    return (
                                      <tr key={c.id} onClick={()=>setCtSelectedContact(isSelected?null:c.id)}
                                        style={{borderBottom:`1px solid ${$border+'50'}`, background:isSelected?filColor+'10':'transparent', cursor:'pointer', transition:'background 0.1s'}}
                                        onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.background=$bgSub; }}
                                        onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.background='transparent'; }}>
                                        <td style={{padding:'6px 6px'}}>
                                          <div style={{display:'flex', alignItems:'center', gap:9}}>
                                            <div style={{width:3, height:28, borderRadius:2, background:isSelected?filColor:pipe.color, flexShrink:0, opacity:isSelected?1:0.7, transition:'all 0.15s'}} />
                                            <div style={{minWidth:0}}>
                                              <div style={{fontWeight:600, color:$text, fontSize:'0.78rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth: selContact?100:190, letterSpacing:'-0.01em'}}>{c.nom}</div>
                                              <div style={{fontSize:'0.65rem', color:$textMut, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth: selContact?100:190}}>{selContact ? (c.entreprise||c.poste) : c.entreprise}</div>
                                            </div>
                                          </div>
                                        </td>
                                        {!selContact && <>
                                          <td style={{padding:'6px 6px'}}><span style={{padding:'2px 6px', borderRadius:crmRd>0?99:2, background:tc.color+'15', color:tc.color, fontSize:'0.62rem', fontWeight:600, whiteSpace:'nowrap'}}>{tc.icon} {tc.label}</span></td>
                                          <td style={{padding:'6px 6px'}}><div style={{fontSize:'0.7rem', color:$textMut, whiteSpace:'nowrap'}}>{c.tel||'—'}</div></td>
                                          <td style={{padding:'6px 6px'}}><div style={{fontSize:'0.68rem', color:$textMut, maxWidth:150, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.email||'—'}</div></td>
                                        </>}
                                        <td style={{padding:'6px 6px', whiteSpace:'nowrap'}}>
                                          <span style={{padding:'2px 7px', borderRadius:crmRd>0?99:2, background:pipe.color+'18', color:pipe.color, fontSize:'0.62rem', fontWeight:700, border:`1px solid ${pipe.color}25`}}>{pipe.icon} {pipe.label}</span>
                                        </td>
                                        <td style={{padding:'6px 6px', whiteSpace:'nowrap'}}>
                                          <span style={{padding:'2px 7px', borderRadius:crmRd>0?99:2, background:act.color+'15', color:act.color, fontSize:'0.62rem', fontWeight:600}}>
                                            {act.icon} {act.label}
                                          </span>
                                        </td>
                                        {!selContact && <td style={{padding:'6px 6px', textAlign:'center'}}>{getPrio(c) !== 'normale' && <span style={{display:'inline-block', padding:'1px 6px', borderRadius:2, background:prio.color+'12', color:prio.color, fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', border:`1px solid ${prio.color}20`}}>{prio.label}</span>}</td>}
                                        {!selContact && <td style={{padding:'6px 6px'}}><span style={{fontSize:'0.7rem', color:getRefColor(getRef(c)), fontWeight:600}}>{getRef(c)}</span></td>}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            )}

                            {/* CARDS VIEW */}
                            {ctView === 'cards' && (
                              <div style={{display:'grid', gridTemplateColumns: selContact ? 'repeat(auto-fill,minmax(190px,1fr))' : 'repeat(auto-fill,minmax(230px,1fr))', gap:10}}>
                                {group.items.map(c => <ContactCard key={c.id} c={c} />)}
                              </div>
                            )}
                          </div>
                        ))}
                        {filtered.length === 0 && <div style={{textAlign:'center', padding:'32px 0', color:$textMut, fontSize:'0.82rem'}}>Aucun contact trouvé</div>}
                      </div>
                    </div>

                    {/* ── DETAIL PANEL ── */}
                    {selContact && (
                      <div style={{flex:1, minWidth:0, overflowY:'auto', paddingLeft:20, display:'flex', flexDirection:'column', gap:14}}>
                        {/* Header */}
                        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', paddingBottom:12, borderBottom:`1px solid ${$border}`}}>
                          <div style={{display:'flex', alignItems:'center', gap:12}}>
                            <div style={{width:46, height:46, borderRadius:crmRd, background:`linear-gradient(135deg, ${getPipeStage(selContact).color}22, ${getPipeStage(selContact).color}08)`, border:`1.5px solid ${getPipeStage(selContact).color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.82rem', fontWeight:800, color:getPipeStage(selContact).color, flexShrink:0, letterSpacing:'0.02em', fontFamily:'inherit'}}>{ini(selContact.nom).toUpperCase()}</div>
                            <div>
                              <div style={{fontWeight:800, color:$text, fontSize:'1rem', lineHeight:1.2}}>{selContact.nom}</div>
                              {selContact.poste && <div style={{fontSize:'0.76rem', color:$textSec, marginTop:1}}>{selContact.poste}</div>}
                              {selContact.entreprise && <div style={{display:'flex', alignItems:'center', gap:4, marginTop:2}}><span style={{fontSize:'0.7rem'}}>{getTcObj(selContact).icon}</span><span style={{fontSize:'0.75rem', color:filColor, fontWeight:600}}>{selContact.entreprise}</span></div>}
                            </div>
                          </div>
                          <button onClick={()=>setCtSelectedContact(null)} style={{padding:'4px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, background:'transparent', color:$textMut, fontSize:'0.75rem', cursor:'pointer', fontFamily:'inherit', flexShrink:0}}>✕</button>
                        </div>

                        {/* ─ AXE 1 : Pipeline ─ */}
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$border}`}}>
                          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
                            <div style={{fontSize:'0.62rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em'}}>Positionnement Pipeline</div>
                            <span style={{padding:'2px 8px', borderRadius:crmRd>0?4:2, background:getPipeStage(selContact).color+'18', color:getPipeStage(selContact).color, fontSize:'0.65rem', fontWeight:700, border:`1px solid ${getPipeStage(selContact).color}30`}}>{getPipeStage(selContact).icon} {getPipeStage(selContact).label}</span>
                          </div>
                          <div style={{display:'flex', gap:3, marginBottom:7}}>
                            {PIPE_STAGES.map((stage, i) => {
                              const curIdx = PIPE_STAGES.findIndex(s=>s.id===getPipe(selContact));
                              const isActive = i === curIdx;
                              const isDone = i < curIdx;
                              return (
                                <div key={stage.id} onClick={()=>setMeta(selContact.id,'pipeline',stage.id)} title={stage.label}
                                  style={{flex:1, height:6, borderRadius:2, background:isDone||isActive?stage.color:$border+'50', cursor:'pointer', transition:'all 0.18s', opacity:isDone||isActive?1:0.4}}
                                  onMouseEnter={e=>{e.currentTarget.style.opacity='1'; e.currentTarget.style.background=stage.color;}}
                                  onMouseLeave={e=>{const a=i<PIPE_STAGES.findIndex(s=>s.id===getPipe(selContact))||i===PIPE_STAGES.findIndex(s=>s.id===getPipe(selContact)); e.currentTarget.style.opacity=a?'1':'0.4'; e.currentTarget.style.background=a?stage.color:$border+'50';}} />
                              );
                            })}
                          </div>
                          <div style={{display:'flex', gap:3}}>
                            {PIPE_STAGES.map((stage, i) => {
                              const curIdx = PIPE_STAGES.findIndex(s=>s.id===getPipe(selContact));
                              const isActive = i === curIdx;
                              const isDone = i < curIdx;
                              return (
                                <div key={stage.id} onClick={()=>setMeta(selContact.id,'pipeline',stage.id)} style={{flex:1, cursor:'pointer', textAlign:'center'}}>
                                  <div style={{fontSize:'0.5rem', fontWeight:isActive?800:isDone?500:400, color:isActive?stage.color:isDone?stage.color:$textMut, textTransform:'uppercase', letterSpacing:'0.04em', transition:'color 0.15s'}}>{stage.label}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* ─ AXE 2 : Prochaine action ─ */}
                        <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$border}`}}>
                          <div style={{fontSize:'0.62rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8}}>⚡ Axe 2 — Prochaine action</div>
                          <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
                            {NEXT_ACTIONS.map(a => {
                              const isA = getAction(selContact) === a.id;
                              return (
                                <button key={a.id} onClick={()=>setMeta(selContact.id,'action',a.id)} style={{padding:'4px 10px', borderRadius:crmRd>0?99:2, border:`1px solid ${isA?a.color:$border}`, background:isA?a.color+'20':'transparent', color:isA?a.color:$textMut, fontSize:'0.72rem', fontWeight:isA?700:400, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:4, transition:'all 0.12s'}}>
                                  <span>{a.icon}</span>{a.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Infos + meta */}
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                          <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$border}`}}>
                            <div style={{fontSize:'0.62rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8}}>Coordonnées</div>
                            {selContact.tel && <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:5}}><span>✆</span><a href={"tel:"+selContact.tel} style={{fontSize:'0.76rem', color:filColor, textDecoration:'none', fontWeight:600}}>{selContact.tel}</a></div>}
                            {selContact.email && <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:5, overflow:'hidden'}}><span style={{flexShrink:0}}>✉️</span><a href={"mailto:"+selContact.email} style={{fontSize:'0.7rem', color:filColor, textDecoration:'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{selContact.email}</a></div>}
                            {selContact.linkedin && selContact.linkedin.startsWith('http') && <div style={{display:'flex', alignItems:'center', gap:6}}><span>🔗</span><a href={selContact.linkedin} target="_blank" rel="noopener noreferrer" style={{fontSize:'0.7rem', color:'#0077b5'}}>LinkedIn</a></div>}
                          </div>
                          <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$border}`}}>
                            <div style={{fontSize:'0.62rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8}}>Qualification</div>
                            <div style={{display:'flex', flexDirection:'column', gap:6}}>
                              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:6}}>
                                <span style={{fontSize:'0.7rem', color:$textMut}}>Type</span>
                                <select value={getTc(selContact)} onChange={e=>setMeta(selContact.id,'tc',e.target.value)} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$text, fontSize:'0.7rem', fontFamily:'inherit', outline:'none', cursor:'pointer'}}>
                                  {TC_TYPES.map(t=><option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                                </select>
                              </div>
                              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:6}}>
                                <span style={{fontSize:'0.7rem', color:$textMut}}>Priorité</span>
                                <div style={{display:'flex', gap:4}}>
                                  {PRIO_LIST.map(p => <button key={p.id} onClick={()=>setMeta(selContact.id,'prio',p.id)} title={p.label} style={{padding:'2px 8px', borderRadius:2, border:`1px solid ${getPrio(selContact)===p.id?p.color:$border}`, background:getPrio(selContact)===p.id?p.color+'18':'transparent', color:getPrio(selContact)===p.id?p.color:$textMut, fontSize:'0.62rem', fontWeight:getPrio(selContact)===p.id?700:400, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit', transition:'all 0.12s'}}>{p.label}</button>)}
                                </div>
                              </div>
                              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:6}}>
                                <span style={{fontSize:'0.7rem', color:$textMut}}>Référent</span>
                                <select value={getRef(selContact)} onChange={e=>setMeta(selContact.id,'ref',e.target.value)} style={{padding:'3px 6px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$text, fontSize:'0.7rem', fontFamily:'inherit', outline:'none', cursor:'pointer'}}>
                                  <option value="Ozdogan">Ozdogan</option>
                                  <option value="Ozlem">Ozlem</option>
                                  <option value="">Non assigné</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {selContact.remarques && (
                          <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 12px', border:`1px solid ${$border+'80'}`}}>
                            <div style={{fontSize:'0.62rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:5}}>§ Contexte</div>
                            <div style={{fontSize:'0.78rem', color:$textSec, lineHeight:1.55}}>{selContact.remarques}</div>
                          </div>
                        )}

                        {/* Enregistrer activité */}
                        <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${filColor+'40'}`, padding:'12px 14px'}}>
                          <div style={{fontSize:'0.65rem', fontWeight:700, color:filColor, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10}}>+ Enregistrer une activité</div>
                          <div style={{display:'flex', gap:5, marginBottom:10, flexWrap:'wrap'}}>
                            {ACT_TYPES.map(t => (
                              <button key={t.id} onClick={()=>setCtNewActType(t.id)} style={{padding:'3px 10px', borderRadius:crmRd>0?99:2, border:`1px solid ${ctNewActType===t.id?t.color:$border}`, background:ctNewActType===t.id?t.color+'18':'transparent', color:ctNewActType===t.id?t.color:$textMut, fontSize:'0.7rem', fontWeight:ctNewActType===t.id?700:400, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3}}>
                                <span>{t.icon}</span>{t.label}
                              </button>
                            ))}
                          </div>
                          <textarea value={ctNewNote} onChange={e=>setCtNewNote(e.target.value)}
                            placeholder={ctNewActType==='appel'?"Résumé appel : a dit que..., rappeler le...":ctNewActType==='email'?"Objet, retour attendu...":ctNewActType==='rdv'?"Date, lieu, objectif...":ctNewActType==='offre'?"Devis envoyé, montant, suite...":"Note libre..."}
                            rows={3} style={{width:'100%', padding:'8px 10px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgSub, color:$text, fontSize:'0.8rem', fontFamily:'inherit', outline:'none', resize:'vertical', boxSizing:'border-box', lineHeight:1.5}} />
                          <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
                            <button onClick={addActivity} disabled={!ctNewNote.trim()} style={{padding:'6px 18px', borderRadius:crmRd, border:'none', background:ctNewNote.trim()?filColor:'#ccc', color:'#fff', fontSize:'0.78rem', fontWeight:700, cursor:ctNewNote.trim()?'pointer':'not-allowed', fontFamily:'inherit'}}>
                              Enregistrer
                            </button>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div style={{paddingBottom:24}}>
                          <div style={{fontSize:'0.65rem', fontWeight:700, color:$textMut, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10}}>Historique ({selActs.length} activité{selActs.length!==1?'s':''})</div>
                          {selActs.length === 0 && <div style={{background:$bgSub, borderRadius:crmRd, border:`1px solid ${$border}`, padding:'20px', textAlign:'center', color:$textMut, fontSize:'0.8rem', fontStyle:'italic'}}>Aucune activité — commencez par enregistrer un appel !</div>}
                          <div style={{display:'flex', flexDirection:'column', gap:8}}>
                            {selActs.map((act, idx) => {
                              const t = ACT_TYPES.find(x=>x.id===act.type) || ACT_TYPES[4];
                              return (
                                <div key={act.id} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0}}>
                                    <div style={{width:28, height:28, borderRadius:'50%', background:t.color+'18', border:`2px solid ${t.color+'40'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.78rem'}}>{t.icon}</div>
                                    {idx < selActs.length-1 && <div style={{width:2, flex:1, minHeight:10, background:$border, margin:'3px 0'}} />}
                                  </div>
                                  <div style={{flex:1, minWidth:0, background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:'9px 12px'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5, gap:6}}>
                                      <span style={{padding:'2px 8px', borderRadius:crmRd>0?99:2, background:t.color+'15', color:t.color, fontSize:'0.62rem', fontWeight:700}}>{t.label}</span>
                                      <span style={{fontSize:'0.62rem', color:$textMut, flexShrink:0}}>{fmtDate(act.date)}</span>
                                    </div>
                                    <div style={{fontSize:'0.78rem', color:$text, lineHeight:1.55, whiteSpace:'pre-wrap'}}>{act.text}</div>
                                    <div style={{fontSize:'0.62rem', color:$textMut, marginTop:5}}>par {act.auteur}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ===== TAB: PLANNING GLOBAL ===== */}
              {crmTab === 'planning_global' && (() => {
                // Contexte: Yilmaz/Holding voit TOUTES les filiales, sinon filiale courante seulement
                const isHoldingCtx = !navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz';
                const currentFilCtx = navEntreprise && navEntreprise !== 'groupoy' && navEntreprise !== 'yilmaz' ? navEntreprise : null;
                // Données Monday.com enrichies: dates réelles board 4113177037
                const MONDAY_DATES = {
                  '1698': {start:'2023-01-22', fin:'2025-01-22'},
                  '1707': {start:'2024-01-08', fin:'2024-06-30'},
                  '1714': {start:'2025-07-02', fin:'2025-08-31'},
                  '1710': {start:'2024-06-06', fin:null},
                  '1711': {start:'2024-08-20', fin:null},
                  '1712': {start:'2024-07-26', fin:null},
                  '1713': {start:'2024-04-24', fin:'2024-09-30'},
                  '1715': {start:'2025-06-17', fin:null},
                  '1716': {start:'2025-06-23', fin:null},
                  '1717': {start:'2025-06-23', fin:null},
                  '1718': {start:'2025-06-23', fin:null},
                  '1719': {start:'2025-06-23', fin:null},
                  '1720': {start:'2025-07-01', fin:null},
                  '1721': {start:'2025-07-09', fin:null},
                  '1722': {start:'2025-07-26', fin:null},
                  '1723': {start:'2025-07-26', fin:null},
                  '1724': {start:'2026-02-26', fin:null},
                  '1725': {start:'2025-10-27', fin:'2025-12-31'},
                  '1726': {start:'2025-12-23', fin:null},
                  '1727': {start:'2025-12-25', fin:null},
                  '1728': {start:'2025-12-25', fin:null},
                };
                const fmtDate = (d) => { if(!d) return '—'; const dt=new Date(d); return dt.toLocaleDateString('fr-FR',{month:'short',year:'numeric'}); };
                const affToGantt = (aff) => {
                  const phaseId = aff.ph || aff.phase || 1;
                  const code = String(aff.cd||aff.id||'1000').replace(/[^0-9]/g,'');
                  const codeNum = parseInt(code) || 1600;
                  const EPOCH = new Date(2020,0,1);
                  const mdKey = Object.keys(MONDAY_DATES).find(k => code.startsWith(k));
                  let osDate, finDateReal=null;
                  if (mdKey && MONDAY_DATES[mdKey].start) {
                    osDate = new Date(MONDAY_DATES[mdKey].start);
                    if (MONDAY_DATES[mdKey].fin) finDateReal = new Date(MONDAY_DATES[mdKey].fin);
                  } else {
                    const monthsFromBase = Math.round((codeNum - 1620) * 0.7);
                    osDate = new Date(2020, monthsFromBase, 1);
                    if (osDate > new Date(2026,11,31)) osDate = new Date(2026,11,1);
                    if (osDate < new Date(2020,0,1)) osDate = new Date(2020,0,1);
                  }
                  const startM = Math.round((osDate - EPOCH) / (1000*60*60*24*30.44));
                  const mStr = (aff.m||aff.montant||'--').replace(/[^0-9.KkMm]/g,'');
                  const mNum = mStr.includes('M') ? parseFloat(mStr)*1000 : mStr.includes('K') ? parseFloat(mStr) : parseFloat(mStr)||50;
                  const durEst = Math.max(3, Math.min(36, Math.round(mNum/45)));
                  let durReal = durEst;
                  if (finDateReal) {
                    durReal = Math.max(1, Math.round((finDateReal - osDate) / (1000*60*60*24*30.44)));
                  } else {
                    const retard = phaseId >= 3 ? (codeNum % 5 === 0 ? 3 : codeNum % 7 === 0 ? 2 : 0) : 0;
                    durReal = durEst + retard;
                  }
                  const hasRetard = durReal > durEst;
                  const phPct = {1:5,2:15,3:55,4:80,5:95,6:100,7:100};
                  const pct = phPct[phaseId] || 50;
                  const finEst = new Date(osDate); finEst.setMonth(finEst.getMonth() + durReal);
                  return { startM, durEst, durReal, hasRetard, pct, osDate, finEst, finDateReal };
                };
                // Timeline: Jan 2020 → Déc 2030 = 132 mois
                const GP_ORIGIN = new Date(2020,0,1);
                const GP_TOTAL = 132; // toujours en mois en interne
                const GP_TODAY_M = Math.round((new Date(2026,2,12) - GP_ORIGIN) / (1000*60*60*24*30.44));
                // Echelle: wk = pixels par MOIS (base interne)
                // Selon l'échelle, on calcule wk à partir du zoom et d'un multiplicateur
                const SCALE_WK = gpScale==='year' ? gpZoom/12 : gpScale==='quarter' ? gpZoom/3 : gpScale==='week' ? gpZoom*4.33 : gpScale==='day' ? gpZoom*30.44 : gpZoom;
                const wk = Math.max(0.5, SCALE_WK);
                const LW = gpLabelW; // label width — resizable outer panel
                // Font & spacing settings — 5 niveaux chacun
                const FS = gpFontSize === 'sm' ? {base:7.5,sm:7,xs:6.5,grp:9.5} : gpFontSize === 'lg' ? {base:11,sm:10,xs:9,grp:13} : gpFontSize === 'xl' ? {base:13,sm:11.5,xs:10.5,grp:15} : gpFontSize === 'xxl' ? {base:15.5,sm:13.5,xs:12,grp:18} : {base:9,sm:8.5,xs:8,grp:10.5};
                const SP = gpSpacing === 'sm' ? {rowH:23,subRowH:18,hdrH:46,barOff:5,barH:13} : gpSpacing === 'lg' ? {rowH:38,subRowH:28,hdrH:58,barOff:8,barH:22} : gpSpacing === 'xl' ? {rowH:48,subRowH:36,hdrH:66,barOff:10,barH:28} : gpSpacing === 'xxl' ? {rowH:60,subRowH:46,hdrH:78,barOff:13,barH:34} : {rowH:30,subRowH:23,hdrH:52,barOff:7,barH:16};
                const rowH = SP.rowH;
                const subRowH = SP.subRowH;
                const hdrH = SP.hdrH;
                // Colonnes internes du label panel — toutes resizables
                const CODE_W = gpColCode;           // col code (draggable sep à droite)
                const DATE_W = gpColDate;            // chaque col date (draggable sep entre elles)
                const NAME_X = CODE_W + 2;           // x début col nom
                const DATE1_X = LW - DATE_W * 2;    // x début col Début
                const DATE2_X = LW - DATE_W;         // x début col Fin
                const NAME_W = DATE1_X - NAME_X;     // largeur col nom (calculée)
                // Drag handlers pour séparateurs internes
                const startColResize = (e, which) => {
                  e.preventDefault(); e.stopPropagation();
                  const startX = e.clientX;
                  if (which === 'code') {
                    const startW = gpColCode;
                    const onMove = (ev) => setGpColCode(Math.max(30, Math.min(90, startW + ev.clientX - startX)));
                    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
                  } else if (which === 'date1') {
                    const startW = gpColDate;
                    const onMove = (ev) => setGpColDate(Math.max(44, Math.min(90, startW - ev.clientX + startX)));
                    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
                  }
                };
                const PHASE_COLORS = {1:'#0369a1',2:'#b45309',3:'#1d4ed8',4:'#6d28d9',5:'#047857',6:'#c2410c',7:'#334155'};
                const FIL_COLORS = {ezel:'#007ab5',echafaudage:'#0891b2',etancheite:'#059669',roulotte:'#d97706'};
                const FIL_LABELS = {ezel:'Ezel Bâtiment',echafaudage:"L'Échafaudage",etancheite:"L'Étanchéité",roulotte:'La Roulotte'};
                const mNames = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
                const gpYears = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
                // Filtrer affaires
                const TOUTES_GP = [...AFFAIRES_REAL, ...(crmShowArchive ? ARCHIVES_REAL : [])];
                let affFiltered = TOUTES_GP.filter(a => {
                  if (!isHoldingCtx && currentFilCtx && (a.fil||a.filiale) !== currentFilCtx) return false;
                  if (gpFilter.fil !== 'all' && (a.fil||a.filiale) !== gpFilter.fil) return false;
                  if (gpFilter.phase !== 'all' && String(a.ph||a.phase) !== gpFilter.phase) return false;
                  if (gpFilter.marche !== 'all' && (a.mk||a.marche) !== gpFilter.marche) return false;
                  if (gpFilter.retard) { const g = affToGantt(a); if (!g.hasRetard) return false; }
                  return true;
                });
                const groupAffaires = (list) => {
                  if (gpGroupBy === 'filiale') {
                    const order = ['ezel','echafaudage','etancheite','roulotte'];
                    const groups = {};
                    list.forEach(a => { const k = a.fil||a.filiale||'ezel'; if(!groups[k]) groups[k]=[]; groups[k].push(a); });
                    return order.filter(k=>groups[k]).map(k => ({key:k, label:FIL_LABELS[k]||k, color:FIL_COLORS[k]||'#64748b', items:groups[k]}));
                  }
                  if (gpGroupBy === 'phase') {
                    const groups = {};
                    list.forEach(a => { const k = a.ph||a.phase||1; if(!groups[k]) groups[k]=[]; groups[k].push(a); });
                    return [1,2,3,4,5,6,7].filter(k=>groups[k]).map(k => ({key:k, label:'P'+k+' — '+(['Lancement','Prépa & OS','Exécution','Pré-réception','Réception','GPA & RG','Archivage'][k-1]), color:PHASE_COLORS[k], items:groups[k]}));
                  }
                  if (gpGroupBy === 'marche') {
                    const groups = {};
                    list.forEach(a => { const k = a.mk||a.marche||'Privé'; if(!groups[k]) groups[k]=[]; groups[k].push(a); });
                    return Object.entries(groups).map(([k,v]) => ({key:k, label:k, color:k==='Public'?'#3b82f6':k==='Particulier'?'#8b5cf6':'#f59e0b', items:v}));
                  }
                  return [{key:'all', label:'Toutes les affaires', color:'#64748b', items:list}];
                };
                const groups = groupAffaires(affFiltered);
                // Calcul hauteur totale
                let totalRows = 0;
                groups.forEach(g => {
                  totalRows += 1;
                  totalRows += g.items.length;
                  g.items.forEach(a => { if(gpExpanded[a.cd||a.id]) totalRows += 8; });
                });
                const svgH = hdrH + totalRows * rowH + 16;
                const barSvgW = GP_TOTAL * wk;
                const retardCount = affFiltered.filter(a => affToGantt(a).hasRetard).length;
                // Resize handle handlers
                const startGpResize = (e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startW = gpLabelW;
                  const onMove = (ev) => { const newW = Math.max(180, Math.min(500, startW + ev.clientX - startX)); setGpLabelW(newW); };
                  const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                  document.addEventListener('mousemove', onMove);
                  document.addEventListener('mouseup', onUp);
                };
                // Build rows data for both panels
                const buildRows = () => {
                  const rows = [];
                  let curY = hdrH;
                  groups.forEach((grp, gi) => {
                    rows.push({type:'group', grp, y:curY});
                    curY += rowH;
                    grp.items.forEach((aff, ai) => {
                      const g = affToGantt(aff);
                      rows.push({type:'aff', aff, g, grp, ai, y:curY});
                      curY += rowH;
                      if (gpExpanded[aff.cd||aff.id]) {
                        const detailPhases = [
                          {l:'Études / Préparation', pStart:0, pDur:0.2, color:'#6366f1'},
                          {l:'Admin & Réglementaire', pStart:0.05, pDur:0.15, color:'#8b5cf6'},
                          {l:'Gros Œuvre', pStart:0.2, pDur:0.3, color:'#0369a1'},
                          {l:'Second Œuvre', pStart:0.45, pDur:0.25, color:'#059669'},
                          {l:'Finitions', pStart:0.65, pDur:0.2, color:'#ea580c'},
                          {l:'Réception / OPR', pStart:0.85, pDur:0.08, color:'#047857'},
                          {l:'GPA & Garanties', pStart:0.93, pDur:0.25, color:'#c2410c'},
                          {l:'Décennale', pStart:0.93, pDur:1.5, color:'#334155'},
                        ];
                        detailPhases.forEach((dp, di) => {
                          rows.push({type:'detail', dp, di, aff, g, y:curY});
                          curY += subRowH;
                        });
                      }
                    });
                  });
                  return {rows, totalH: curY + 8};
                };
                const {rows, totalH} = buildRows();
                return (
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  {/* Toolbar */}
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                    <div style={{fontWeight:700,fontSize:'0.88rem',color:$text,marginRight:4}}>◫ Planning Général</div>
                    {isHoldingCtx ? (
                      <span style={{fontSize:'0.72rem',padding:'2px 8px',borderRadius:crmRd>0?10:2,background:'#6366f118',color:'#6366f1',fontWeight:600,border:'1px solid #6366f130'}}>◆ Tous groupes</span>
                    ) : (
                      <span style={{fontSize:'0.72rem',padding:'2px 8px',borderRadius:crmRd>0?10:2,background:filColor+'18',color:filColor,fontWeight:600,border:`1px solid ${filColor}30`}}>{FIL_LABELS[currentFilCtx]||currentFilCtx}</span>
                    )}
                    <span style={{fontSize:'0.72rem',padding:'2px 8px',borderRadius:crmRd>0?10:2,background:'#3b82f618',color:'#3b82f6',fontWeight:600,border:'1px solid #3b82f630'}}>{affFiltered.length} affaires</span>
                    {retardCount>0&&<span style={{fontSize:'0.72rem',padding:'2px 8px',borderRadius:crmRd>0?10:2,background:'#e74c3c18',color:'#e74c3c',fontWeight:700,border:'1px solid #e74c3c30'}}>▲ {retardCount} retard(s)</span>}
                    <div style={{flex:1}}/>
                    {/* Filiale filter — Yilmaz/Holding only */}
                    {isHoldingCtx&&<select value={gpFilter.fil} onChange={e=>setGpFilter(f=>({...f,fil:e.target.value}))} style={{padding:'5px 8px',borderRadius:crmRd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$text,fontSize:'0.75rem',fontFamily:'inherit',cursor:'pointer'}}>
                      <option value="all">Toutes filiales</option>
                      <option value="ezel">Ezel Bâtiment</option>
                      <option value="echafaudage">L'Échafaudage</option>
                      <option value="etancheite">L'Étanchéité</option>
                      <option value="roulotte">La Roulotte</option>
                    </select>}
                    <select value={gpFilter.phase} onChange={e=>setGpFilter(f=>({...f,phase:e.target.value}))} style={{padding:'5px 8px',borderRadius:crmRd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$text,fontSize:'0.75rem',fontFamily:'inherit',cursor:'pointer'}}>
                      <option value="all">Toutes phases</option>
                      {[1,2,3,4,5,6,7].map(p=><option key={p} value={String(p)}>P{p}</option>)}
                    </select>
                    <select value={gpFilter.marche} onChange={e=>setGpFilter(f=>({...f,marche:e.target.value}))} style={{padding:'5px 8px',borderRadius:crmRd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$text,fontSize:'0.75rem',fontFamily:'inherit',cursor:'pointer'}}>
                      <option value="all">Tous marchés</option>
                      <option value="Public">◆ Public</option>
                      <option value="Privé">▪ Privé</option>
                      <option value="Particulier">◉ Particulier</option>
                    </select>
                    <button onClick={()=>setGpFilter(f=>({...f,retard:!f.retard}))} style={{padding:'5px 10px',borderRadius:crmRd>0?6:2,border:`1px solid ${gpFilter.retard?'#e74c3c':$border}`,background:gpFilter.retard?'#e74c3c15':$bgCard,color:gpFilter.retard?'#e74c3c':$textMut,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>▲ Retards</button>
                    <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd>0?8:2,padding:3,border:`1px solid ${$border}`}}>
                      {[{id:'filiale',l:'Filiale'},{id:'phase',l:'Phase'},{id:'marche',l:'Marché'},{id:'none',l:'Aucun'}].map(g=>(
                        <button key={g.id} onClick={()=>setGpGroupBy(g.id)} style={{padding:'4px 10px',borderRadius:crmRd>0?6:2,border:'none',background:gpGroupBy===g.id?$bgCard:'transparent',color:gpGroupBy===g.id?$text:$textMut,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit',fontWeight:gpGroupBy===g.id?600:400,boxShadow:gpGroupBy===g.id?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>{g.l}</button>
                      ))}
                    </div>
                    {/* Echelle temporelle */}
                    <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd>0?8:2,padding:3,border:`1px solid ${$border}`}}>
                      {[{id:'year',l:'An'},{id:'quarter',l:'Trim.'},{id:'month',l:'Mois'},{id:'week',l:'Sem.'},{id:'day',l:'Jour'}].map(s=>(
                        <button key={s.id} onClick={()=>{setGpScale(s.id); const presets={year:96,quarter:60,month:22,week:5,day:1.2}; setGpZoom(presets[s.id]);}} style={{padding:'4px 8px',borderRadius:crmRd>0?6:2,border:'none',background:gpScale===s.id?filColor:'transparent',color:gpScale===s.id?'#fff':$textMut,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit',fontWeight:gpScale===s.id?700:400,transition:'all 0.15s'}}>{s.l}</button>
                      ))}
                    </div>
                    {/* Zoom +/- */}
                    <div style={{display:'flex',alignItems:'center',gap:3}}>
                      <button onClick={()=>setGpZoom(z=>Math.max(0.5,+(z*0.75).toFixed(1)))} style={{width:22,height:22,borderRadius:crmRd>0?5:2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontWeight:700,fontSize:'0.85rem',color:$textSec,fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                      <button onClick={()=>setGpZoom(z=>+(z*1.33).toFixed(1))} style={{width:22,height:22,borderRadius:crmRd>0?5:2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontWeight:700,fontSize:'0.85rem',color:$textSec,fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                    </div>
                    <button onClick={()=>setGpExpanded({})} style={{padding:'5px 8px',borderRadius:crmRd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$textMut,fontSize:'0.7rem',cursor:'pointer',fontFamily:'inherit'}}>Réduire tout</button>
                    <button onClick={()=>{const exp={}; affFiltered.forEach(a=>{exp[a.cd||a.id]=true;}); setGpExpanded(exp);}} style={{padding:'5px 8px',borderRadius:crmRd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$textMut,fontSize:'0.7rem',cursor:'pointer',fontFamily:'inherit'}}>Déplier tout</button>
                    {/* Taille texte — 5 niveaux */}
                    <div style={{display:'flex',alignItems:'center',gap:2,background:$bgSub,borderRadius:crmRd>0?8:2,padding:3,border:`1px solid ${$border}`}} title="Taille du texte">
                      {[{id:'sm',l:'A',fs:'0.64rem'},{id:'md',l:'A',fs:'0.74rem'},{id:'lg',l:'A',fs:'0.84rem'},{id:'xl',l:'A',fs:'0.94rem'},{id:'xxl',l:'A',fs:'1.06rem'}].map(s=>(
                        <button key={s.id} onClick={()=>setGpFontSize(s.id)} style={{width:22,height:20,borderRadius:crmRd>0?4:2,border:'none',background:gpFontSize===s.id?$bgCard:'transparent',color:gpFontSize===s.id?$text:$textMut,fontSize:s.fs,cursor:'pointer',fontFamily:'inherit',fontWeight:gpFontSize===s.id?700:400,boxShadow:gpFontSize===s.id?'0 1px 3px rgba(0,0,0,0.12)':'none',display:'flex',alignItems:'center',justifyContent:'center'}}>{s.l}</button>
                      ))}
                    </div>
                    {/* Espacement — 5 niveaux */}
                    <div style={{display:'flex',alignItems:'center',gap:2,background:$bgSub,borderRadius:crmRd>0?8:2,padding:3,border:`1px solid ${$border}`}} title="Espacement des lignes">
                      {[{id:'sm',l:'≡',t:'Compact'},{id:'md',l:'☰',t:'Normal'},{id:'lg',l:'▤',t:'Aéré'},{id:'xl',l:'▥',t:'Très aéré'},{id:'xxl',l:'⠀▤',t:'Maximal'}].map(s=>(
                        <button key={s.id} onClick={()=>setGpSpacing(s.id)} title={s.t} style={{width:22,height:20,borderRadius:crmRd>0?4:2,border:'none',background:gpSpacing===s.id?$bgCard:'transparent',color:gpSpacing===s.id?$text:$textMut,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',fontWeight:gpSpacing===s.id?700:400,boxShadow:gpSpacing===s.id?'0 1px 3px rgba(0,0,0,0.12)':'none',display:'flex',alignItems:'center',justifyContent:'center'}}>{s.l}</button>
                      ))}
                    </div>
                  </div>
                  {/* Gantt — label fixe + barre scrollable */}
                  <div style={{background:$bgSub,borderRadius:crmRd,border:`1px solid ${$border}`,position:'relative',overflow:'hidden'}}>
                    {/* === PANEL DROIT SCROLLABLE === */}
                    <div style={{marginLeft:LW,overflowX:'auto',overflowY:'hidden'}} ref={gpScrollRef}>
                      <svg width={barSvgW} height={totalH} style={{display:'block'}}>
                        {/* Colonnes de fond selon l'échelle */}
                        {gpScale==='year'&&gpYears.map((yr,yi)=>(
                          <rect key={yr} x={yi*12*wk} y={0} width={12*wk} height={totalH} fill={yi%2===0?'transparent':'rgba(0,0,0,0.015)'}/>
                        ))}
                        {(gpScale==='quarter'||gpScale==='month')&&gpYears.map((yr,yi)=>(
                          <rect key={yr} x={yi*12*wk} y={0} width={12*wk} height={totalH} fill={yi%2===0?'transparent':'rgba(0,0,0,0.012)'}/>
                        ))}
                        {/* Grid lignes verticales selon échelle */}
                        {gpScale==='year'&&Array.from({length:GP_TOTAL+1},(_,m)=>(
                          <line key={m} x1={m*wk} y1={hdrH} x2={m*wk} y2={totalH} stroke={m%12===0?$border:'transparent'} strokeWidth={m%12===0?1:0}/>
                        ))}
                        {(gpScale==='quarter')&&Array.from({length:GP_TOTAL+1},(_,m)=>(
                          <line key={m} x1={m*wk} y1={hdrH} x2={m*wk} y2={totalH} stroke={m%12===0?$border:m%3===0?$borderLight:'transparent'} strokeWidth={m%12===0?1:0.5}/>
                        ))}
                        {gpScale==='month'&&Array.from({length:GP_TOTAL+1},(_,m)=>(
                          <line key={m} x1={m*wk} y1={hdrH-2} x2={m*wk} y2={totalH} stroke={m%12===0?$border:m%3===0?$borderLight:$borderLight} strokeWidth={m%12===0?1:0.3}/>
                        ))}
                        {gpScale==='week'&&Array.from({length:GP_TOTAL},(_,m)=>{
                          const weeksInM = 4.33;
                          return Array.from({length:4},(_,w)=>{
                            const x = (m + w/weeksInM) * wk;
                            return <line key={`${m}_${w}`} x1={x} y1={hdrH} x2={x} y2={totalH} stroke={w===0?$border:$borderLight} strokeWidth={w===0?0.8:0.3}/>;
                          });
                        })}
                        {gpScale==='day'&&Array.from({length:GP_TOTAL},(_,m)=>(
                          <line key={m} x1={m*wk} y1={hdrH} x2={m*wk} y2={totalH} stroke={$border} strokeWidth={0.5}/>
                        ))}
                        {/* HEADER ROW 1 — selon échelle */}
                        {gpScale==='year'&&gpYears.map((yr,yi)=>{
                          const x=yi*12*wk; const isCur=yr===2026;
                          return <g key={yr}><rect x={x} y={0} width={12*wk} height={hdrH} fill={isCur?'#3b82f610':'transparent'}/><line x1={x} y1={0} x2={x} y2={hdrH} stroke={$border} strokeWidth={1}/><text x={x+6*wk} y={hdrH*0.55} fontSize={Math.max(FS.xs,Math.min(FS.grp,12*wk/40))} fill={isCur?'#3b82f6':$textSec} fontWeight="700" textAnchor="middle">{yr}</text></g>;
                        })}
                        {(gpScale==='quarter'||gpScale==='month'||gpScale==='week'||gpScale==='day')&&(<>
                          {/* Row 1: années */}
                          {gpYears.map((yr,yi)=>{
                            const x=yi*12*wk; const isCur=yr===2026;
                            return <g key={yr}><rect x={x} y={0} width={12*wk} height={hdrH*0.48} fill={isCur?'#3b82f608':'transparent'}/><line x1={x} y1={0} x2={x} y2={hdrH*0.5} stroke={$border} strokeWidth={1}/><text x={x+6*wk} y={hdrH*0.34} fontSize={FS.sm} fill={isCur?'#3b82f6':$textSec} fontWeight="700" textAnchor="middle">{yr}</text></g>;
                          })}
                          {/* Row 2: trimestres */}
                          {gpScale==='quarter'&&Array.from({length:44},(_,q)=>{
                            const x=q*3*wk; const yr=2020+Math.floor(q/4); const qt=q%4+1;
                            return <g key={q}><line x1={x} y1={hdrH*0.5} x2={x} y2={hdrH} stroke={$borderLight} strokeWidth={0.8}/><text x={x+1.5*wk} y={hdrH*0.82} fontSize={FS.sm} fill={$textMut} fontWeight="600" textAnchor="middle">T{qt}</text></g>;
                          })}
                          {/* Row 2: mois */}
                          {(gpScale==='month'||gpScale==='week'||gpScale==='day')&&Array.from({length:GP_TOTAL},(_,m)=>{
                            const show = gpScale==='month' ? (wk>=14?true:wk>=7?m%3===0:m%6===0) : true;
                            if(!show) return null;
                            const isTod = m===GP_TODAY_M;
                            return <g key={m}><line x1={m*wk} y1={hdrH*0.5} x2={m*wk} y2={hdrH} stroke={$borderLight} strokeWidth={0.5}/><text x={m*wk+wk/2} y={hdrH*0.82} fontSize={FS.xs} fill={isTod?'#3b82f6':$textMut} fontWeight={isTod?'700':'400'} textAnchor="middle">{mNames[m%12].slice(0,gpScale==='month'&&wk>20?3:1)}</text></g>;
                          })}
                        </>)}
                        <line x1={0} y1={hdrH} x2={barSvgW} y2={hdrH} stroke={$border} strokeWidth={1.5}/>
                        {/* Today line */}
                        <line x1={GP_TODAY_M*wk} y1={0} x2={GP_TODAY_M*wk} y2={totalH} stroke='#3b82f6' strokeWidth={1.5} strokeDasharray="5,3"/>
                        <rect x={GP_TODAY_M*wk-14} y={hdrH-16} width={28} height={14} rx={3} fill='#3b82f6'/>
                        <text x={GP_TODAY_M*wk} y={hdrH-5} fontSize={FS.xs} fill="#fff" fontWeight="700" textAnchor="middle">Auj.</text>
                        {/* ROWS — barres seulement */}
                        {rows.map((row, ri) => {
                          if (row.type === 'group') {
                            return <rect key={`gbg_${ri}`} x={0} y={row.y} width={barSvgW} height={rowH} fill={row.grp.color+'10'}/>;
                          }
                          if (row.type === 'aff') {
                            const {aff, g, grp, ai, y} = row;
                            const phId = aff.ph||aff.phase||1;
                            const phColor = PHASE_COLORS[phId]||'#64748b';
                            const barX = g.startM*wk;
                            const barEstW = g.durEst*wk;
                            const barRealW = g.durReal*wk;
                            const fillW = Math.min(g.pct/100*barRealW, barRealW);
                            const mkC = (aff.mk||aff.marche)==='Public'?'#3b82f6':(aff.mk||aff.marche)==='Particulier'?'#8b5cf6':'#f59e0b';
                            return (
                            <g key={`aff_${aff.cd||aff.id}`} style={{cursor:'pointer'}} onClick={()=>setGpExpanded(prev=>({...prev,[aff.cd||aff.id]:!prev[aff.cd||aff.id]}))}>
                              <rect x={0} y={y} width={barSvgW} height={rowH} fill={ai%2===0?'transparent':'rgba(0,0,0,0.012)'}/>
                              <rect x={barX} y={y+7} width={Math.max(barEstW,2)} height={rowH-14} rx={crmRd>0?3:0} fill={$bgCard} stroke={phColor} strokeWidth={0.8} strokeOpacity={0.5}/>
                              {fillW>0&&<rect x={barX} y={y+7} width={fillW} height={rowH-14} rx={crmRd>0?3:0} fill={phColor+(g.pct===100?'ee':'99')}/>}
                              {g.hasRetard&&<rect x={barX+barEstW} y={y+9} width={(g.durReal-g.durEst)*wk} height={rowH-18} rx={crmRd>0?2:0} fill="#e74c3c" opacity={0.7}/>}
                              {barEstW>wk*1.5&&<text x={barX+5} y={y+rowH/2+4} fontSize={7.5} fill={g.pct>30?'#fff':phColor} fontWeight="600">P{phId}·{g.pct}%</text>}
                              <circle cx={barX-5} cy={y+rowH/2} r={3} fill={mkC} opacity={0.7}/>
                            </g>
                            );
                          }
                          if (row.type === 'detail') {
                            const {dp, di, aff, g, y} = row;
                            const dpX = g.startM*wk + dp.pStart*g.durReal*wk;
                            const dpW = Math.max(dp.pDur*g.durReal*wk, 2);
                            const dpDone = g.pct/100 > dp.pStart + dp.pDur/2;
                            return (
                            <g key={`dp_${aff.cd}_${di}`}>
                              <rect x={0} y={y} width={barSvgW} height={subRowH} fill={di%2===0?'transparent':'rgba(0,0,0,0.01)'}/>
                              <rect x={dpX} y={y+4} width={dpW} height={subRowH-8} rx={crmRd>0?2:0} fill={dp.color+(dpDone?'cc':'44')} stroke={dp.color} strokeWidth={0.5}/>
                              {dpDone&&dpW>20&&<text x={dpX+4} y={y+subRowH/2+3} fontSize={7} fill="#fff" fontWeight="600">✓</text>}
                            </g>
                            );
                          }
                          return null;
                        })}
                      </svg>
                    </div>
                    {/* === PANEL GAUCHE FIXE — clickable === */}
                    <div style={{position:'absolute',top:0,left:0,width:LW,height:totalH,background:$bgSub,zIndex:5,borderRight:`2px solid ${$border}`,overflow:'hidden'}}>
                      <svg width={LW} height={totalH} style={{display:'block',cursor:'default'}}>
                        <rect x={0} y={0} width={LW} height={hdrH} fill={$bgCard}/>
                        <line x1={0} y1={hdrH} x2={LW} y2={hdrH} stroke={$border} strokeWidth={1.5}/>
                        <line x1={CODE_W} y1={0} x2={CODE_W} y2={totalH} stroke={$border} strokeWidth={0.8} opacity={0.5}/>
                        <line x1={DATE1_X} y1={0} x2={DATE1_X} y2={totalH} stroke={$border} strokeWidth={0.8} opacity={0.5}/>
                        <line x1={DATE2_X} y1={0} x2={DATE2_X} y2={totalH} stroke={$border} strokeWidth={0.5} opacity={0.35}/>
                        <text x={CODE_W/2} y={hdrH*0.42} fontSize={FS.xs} fill={$textMut} fontWeight="700" textAnchor="middle">CODE</text>
                        <text x={NAME_X + NAME_W/2} y={hdrH*0.42} fontSize={FS.xs} fill={$textMut} fontWeight="700" textAnchor="middle">AFFAIRE</text>
                        <text x={DATE1_X + DATE_W/2} y={hdrH*0.42} fontSize={FS.xs} fill={$textMut} fontWeight="700" textAnchor="middle">DÉBUT</text>
                        <text x={DATE2_X + DATE_W/2} y={hdrH*0.42} fontSize={FS.xs} fill={$textMut} fontWeight="700" textAnchor="middle">FIN</text>
                        {rows.map((row, ri) => {
                          if (row.type === 'group') {
                            return (
                            <g key={`lgrp_${ri}`}>
                              <rect x={0} y={row.y} width={LW} height={rowH} fill={row.grp.color+'12'}/>
                              <rect x={0} y={row.y+4} width={4} height={rowH-8} fill={row.grp.color} rx={2}/>
                              <text x={10} y={row.y+rowH/2+FS.grp*0.38} fontSize={FS.grp} fill={row.grp.color} fontWeight="700">{row.grp.label} ({row.grp.items.length})</text>
                            </g>
                            );
                          }
                          if (row.type === 'aff') {
                            const {aff, g, ai, y} = row;
                            const filC = FIL_COLORS[aff.fil||aff.filiale||'ezel']||'#64748b';
                            const isExp = gpExpanded[aff.cd||aff.id];
                            const maxNameChars = Math.floor(NAME_W / (FS.base * 0.6));
                            const nomFull = aff.n||aff.nom||'';
                            const nomTxt = nomFull.length > maxNameChars ? nomFull.slice(0, maxNameChars-1)+'…' : nomFull;
                            const toggleExp = () => setGpExpanded(prev=>({...prev,[aff.cd||aff.id]:!prev[aff.cd||aff.id]}));
                            return (
                            <g key={`laff_${aff.cd||aff.id}`} style={{cursor:'pointer'}} onClick={toggleExp}>
                              <rect x={0} y={y} width={LW} height={rowH} fill={ai%2===0?'transparent':'rgba(0,0,0,0.014)'}/>
                              <rect x={0} y={y} width={LW} height={rowH} fill="transparent"/>
                              <text x={5} y={y+rowH/2+FS.sm*0.38} fontSize={FS.sm} fill={$accent} fontWeight="800">{isExp?'▼':'►'}</text>
                              <text x={14} y={y+rowH/2+FS.base*0.38} fontSize={FS.sm} fill={filC} fontWeight="800">{aff.cd||aff.id}</text>
                              <text x={NAME_X+3} y={y+rowH/2+FS.base*0.38} fontSize={FS.base} fill={$text} fontWeight="500">{nomTxt}</text>
                              <text x={DATE1_X+3} y={y+rowH/2+FS.sm*0.38} fontSize={FS.sm} fill={$textMut}>{fmtDate(g.osDate)}</text>
                              <text x={DATE2_X+3} y={y+rowH/2+FS.sm*0.38} fontSize={FS.sm} fill={g.hasRetard?'#e74c3c':$textMut}>{fmtDate(g.finEst)}</text>
                              {g.hasRetard && <text x={LW-4} y={y+rowH/2+FS.xs*0.38} fontSize={FS.xs} fill="#e74c3c" textAnchor="end">▲</text>}
                            </g>
                            );
                          }
                          if (row.type === 'detail') {
                            const {dp, di, y} = row;
                            return (
                            <g key={`ldp_${ri}`}>
                              <rect x={0} y={y} width={LW} height={subRowH} fill={di%2===0?'transparent':'rgba(0,0,0,0.01)'}/>
                              <rect x={NAME_X} y={y+3} width={3} height={subRowH-6} fill={dp.color} rx={1}/>
                              <text x={NAME_X+7} y={y+subRowH/2+FS.sm*0.38} fontSize={FS.sm} fill={$textSec}>{dp.l}</text>
                            </g>
                            );
                          }
                          return null;
                        })}
                      </svg>
                    </div>
                    {/* === RESIZE HANDLES (pointer-events actifs) === */}
                    <div onMouseDown={e=>startColResize(e,'code')} style={{position:'absolute',top:0,left:CODE_W-3,width:7,height:totalH,cursor:'col-resize',zIndex:12}} title="Redimensionner colonne Code"/>
                    <div onMouseDown={e=>startColResize(e,'date1')} style={{position:'absolute',top:0,left:DATE1_X-3,width:7,height:totalH,cursor:'col-resize',zIndex:12}} title="Redimensionner colonnes dates"/>
                    <div onMouseDown={startGpResize} style={{position:'absolute',top:0,left:LW-4,width:8,height:totalH,cursor:'col-resize',zIndex:10,display:'flex',alignItems:'center',justifyContent:'center'}} title="Redimensionner le panneau">
                      <div style={{width:3,height:48,borderRadius:2,background:$border,opacity:0.5}}/>
                    </div>
                  </div>
                  {/* Légende */}
                  {/* Légende */}
                  <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:'0.72rem',color:$textMut,alignItems:'center'}}>
                    <span>■ Barre = durée · couleur = phase</span>
                    <span style={{color:'#e74c3c'}}>■ Rouge = retard</span>
                    <span>▶/▼ = déplier phases détaillées</span>
                    <span>● Marché: <span style={{color:'#3b82f6'}}>Public</span> · <span style={{color:'#f59e0b'}}>Privé</span> · <span style={{color:'#8b5cf6'}}>Particulier</span></span>
                    <span style={{marginLeft:'auto',fontStyle:'italic'}}>📡 Monday.com · board 4113177037</span>
                  </div>
                </div>
                );
              })()}

              {/* ===== TAB: DASHBOARD CRM =====

              {/* ===== TAB: DASHBOARD CRM ===== */}
              {crmTab === 'dashboard_crm' && (
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:20}}>
                    <div style={{fontWeight:700, color:$text, fontSize:'0.9rem', marginBottom:16}}>▦ Répartition par Phase</div>
                    {PHASES.map(ph => {
                      const items = affairesToShow.filter(a => getPhase(a) === ph.id);
                      const pct = affairesToShow.length ? Math.round(items.length / affairesToShow.length * 100) : 0;
                      return (
                        <div key={ph.id} style={{marginBottom:10}}>
                          <div style={{display:'flex', justifyContent:'space-between', marginBottom:3}}><span style={{fontSize:'0.78rem', color:$textSec}}>{ph.icon} {ph.label}</span><span style={{fontSize:'0.78rem', fontWeight:700, color:ph.color}}>{items.length} ({pct}%)</span></div>
                          <div style={{height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}><div style={{height:'100%', width:`${pct}%`, background:ph.color, borderRadius:3, transition:'width 0.5s'}} /></div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:20}}>
                    <div style={{fontWeight:700, color:$text, fontSize:'0.9rem', marginBottom:16}}>€ Montants par Phase</div>
                    {PHASES.filter(ph => affairesToShow.some(a=>getPhase(a)===ph.id)).map(ph => {
                      const total = affairesToShow.filter(a=>getPhase(a)===ph.id).reduce((s,a)=>s+parseMontant(a.m||a.montant),0);
                      const maxTotal = Math.max(...PHASES.map(p => affairesToShow.filter(a=>getPhase(a)===p.id).reduce((s,a)=>s+parseMontant(a.m||a.montant),0)));
                      const pct = maxTotal ? Math.round(total / maxTotal * 100) : 0;
                      return (
                        <div key={ph.id} style={{marginBottom:10}}>
                          <div style={{display:'flex', justifyContent:'space-between', marginBottom:3}}><span style={{fontSize:'0.78rem', color:$textSec}}>{ph.icon} {ph.label}</span><span style={{fontSize:'0.78rem', fontWeight:700, color:ph.color}}>{fmtE(total)}</span></div>
                          <div style={{height:6, borderRadius:3, background:$bgSub, overflow:'hidden'}}><div style={{height:'100%', width:`${pct}%`, background:ph.color+'80', borderRadius:3}} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===== TAB: PRÉPARATION GLOBALE ===== */}
              {crmTab === 'preparation_crm' && (() => {
                const PREP_STATUTS = [
                  {id:'a_demarrer', l:'À démarrer',     c:'#94a3b8', ic:'⬜'},
                  {id:'en_cours',   l:'En cours',        c:'#3b82f6', ic:'↻'},
                  {id:'bloque',     l:'Bloqué',          c:'#e74c3c', ic:'🚫'},
                  {id:'pret',       l:'Prêt à démarrer', c:'#059669', ic:'✓'},
                ];
                const PREP_GROUPS_DEF = [
                  {ic:'☰',l:'Transfert Études→Travaux',steps:5},
                  {ic:'📜',l:'Admin & Réglementaire',steps:6},
                  {ic:'🗺️',l:'PIC',steps:6},
                  {ic:'◆',l:'Installation physique',steps:7},
                ];
                const getStatut = (a) => {
                  if(a.donePct>=100) return 'pret';
                  if(a.alerts.length>0) return 'bloque';
                  if(a.donePct>0) return 'en_cours';
                  return 'a_demarrer';
                };
                const PREP_AFFAIRES = affairesToShow.filter(a=>getPhase(a)<=3).slice(0,14).map((a,i)=>{
                  const ph = getPhase(a);
                  const donePct = ph===1?15:ph===2?55:80;
                  const done = Math.round(24*donePct/100);
                  const alerts = ph===1?['DICT manquante','PPSPS non rédigé']:ph===2?['Grue non commandée']:[];
                  return {...a, donePct, done, total:24, alerts, ph};
                });
                const alertCount = PREP_AFFAIRES.reduce((s,a)=>s+a.alerts.length,0);
                const prets = PREP_AFFAIRES.filter(a=>getStatut(a)==='pret').length;
                const encours = PREP_AFFAIRES.filter(a=>getStatut(a)==='en_cours').length;

                // Build groups based on groupBy
                let groups = [];
                if(prepGroupBy==='statut') {
                  groups = PREP_STATUTS.map(s=>({
                    id:s.id, label:s.l, color:s.c, ic:s.ic,
                    items: PREP_AFFAIRES.filter(a=>getStatut(a)===s.id)
                  })).filter(g=>g.items.length>0);
                } else if(prepGroupBy==='phase') {
                  groups = PHASES.filter(p=>p.id<=3).map(p=>({
                    id:'p'+p.id, label:p.label, color:p.color, ic:p.icon,
                    items: PREP_AFFAIRES.filter(a=>a.ph===p.id)
                  })).filter(g=>g.items.length>0);
                } else if(prepGroupBy==='ct') {
                  const cts = [...new Set(PREP_AFFAIRES.map(a=>a.eq||'Non assigné'))];
                  groups = cts.map(ct=>({
                    id:ct, label:ct, color:filColor, ic:'👷',
                    items: PREP_AFFAIRES.filter(a=>(a.eq||'Non assigné')===ct)
                  }));
                } else {
                  groups = [{id:'all',label:'Toutes les affaires',color:filColor,ic:'☰',items:PREP_AFFAIRES}];
                }

                const PREP_COLS = [
                  {id:'affaire',l:'Affaire'},{id:'phase',l:'Phase'},{id:'ct',l:'CT'},
                  {id:'avancement',l:'Avancement'},{id:'statut',l:'Statut'},{id:'alertes',l:'Alertes'},
                ];

                const toggleGroup = (id) => setPrepCollapsed(prev=>({...prev,[id]:!prev[id]}));

                return (
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    {/* KPI strip */}
                    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                      {[
                        {l:'En préparation',v:PREP_AFFAIRES.length,c:filColor,ic:'✱'},
                        {l:'Prêts à démarrer',v:prets,c:'#059669',ic:'✓'},
                        {l:'En cours',v:encours,c:'#3b82f6',ic:'↻'},
                        {l:'Alertes actives',v:alertCount,c:'#e74c3c',ic:'▲'},
                      ].map((k,i)=>(
                        <div key={i} style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${i===3&&alertCount>0?'#e74c3c40':$border}`,padding:'12px 14px',position:'relative',overflow:'hidden'}}>
                          <div style={{fontSize:'0.6rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:3}}>{k.l}</div>
                          <div style={{fontWeight:800,fontSize:'1.3rem',color:k.c}}>{k.v}</div>
                          <div style={{position:'absolute',bottom:6,right:10,fontSize:'1.3rem',opacity:0.07}}>{k.ic}</div>
                        </div>
                      ))}
                    </div>

                    {/* Toolbar */}
                    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                      <span style={{fontSize:'0.75rem',color:$textMut,fontWeight:600}}>Grouper par</span>
                      {[
                        {id:'statut', l:'Statut préparation', ic:'🏷️'},
                        {id:'phase',  l:'Phase chantier',     ic:'🔢'},
                        {id:'ct',     l:'Conducteur travaux', ic:'👷'},
                        {id:'aucun',  l:'Sans regroupement',  ic:'☰'},
                      ].map(opt=>(
                        <button key={opt.id} onClick={()=>setPrepGroupBy(opt.id)}
                          style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${prepGroupBy===opt.id?filColor:$border}`,background:prepGroupBy===opt.id?filColor+'15':'transparent',color:prepGroupBy===opt.id?filColor:$textMut,fontWeight:prepGroupBy===opt.id?700:400,fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:5,transition:'all 0.15s'}}>
                          <span>{opt.ic}</span><span>{opt.l}</span>
                        </button>
                      ))}
                      <div style={{marginLeft:'auto',display:'flex',gap:6}}>
                        {PREP_STATUTS.map(s=>(
                          <span key={s.id} style={{fontSize:'0.68rem',padding:'3px 8px',borderRadius:crmRd>0?20:2,background:s.c+'15',color:s.c,fontWeight:600,border:`1px solid ${s.c}30`}}>
                            {s.ic} {PREP_AFFAIRES.filter(a=>getStatut(a)===s.id).length} {s.l}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Table with groups */}
                    <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',tableLayout:'fixed'}}>
                        <colgroup>
                          {PREP_COLS.map(c=><col key={c.id} style={{width:prepColWidths[c.id]||120}}/>)}
                        </colgroup>
                        <thead>
                          <tr style={{background:$bgSub,borderBottom:`1px solid ${$border}`}}>
                            {PREP_COLS.map(h=>(
                              <th key={h.id} style={{padding:'9px 14px',textAlign:'left',fontWeight:700,fontSize:'0.63rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.05em',position:'relative',userSelect:'none',width:prepColWidths[h.id]||120}}>
                                {h.l}
                                <div onMouseDown={e=>startColResize(h.id,e,prepColWidths,setPrepColWidths)} onMouseEnter={e=>e.currentTarget.style.background=$accent+'40'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',display:'flex',alignItems:'center',justifyContent:'center',zIndex:3,background:'transparent'}}>
                                  <div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {groups.map((grp,gi)=>{
                            const isCollapsed = prepCollapsed[grp.id];
                            return (
                              <React.Fragment key={grp.id}>
                                {/* Group header row */}
                                {prepGroupBy!=='aucun'&&(
                                  <tr onClick={()=>toggleGroup(grp.id)} style={{cursor:'pointer',background:grp.color+'0d',borderTop:gi>0?`1px solid ${$border}`:'none'}} onMouseEnter={e=>e.currentTarget.style.background=grp.color+'18'} onMouseLeave={e=>e.currentTarget.style.background=grp.color+'0d'}>
                                    <td colSpan={PREP_COLS.length} style={{padding:'8px 14px',position:'relative'}}>
                                      {/* left bar */}
                                      <div style={{position:'absolute',left:0,top:0,bottom:0,width:4,background:grp.color,borderRadius:isCollapsed?`${crmRd>0?2:0}px 0 0 ${crmRd>0?2:0}px`:'0'}}/>
                                      <div style={{display:'flex',alignItems:'center',gap:8,paddingLeft:8}}>
                                        <span style={{fontSize:'0.75rem',transition:'transform 0.2s',display:'inline-block',transform:isCollapsed?'rotate(-90deg)':'rotate(0deg)',color:grp.color}}>▾</span>
                                        <span style={{fontSize:'0.78rem',fontWeight:700,color:grp.color}}>{grp.ic} {grp.label}</span>
                                        <span style={{fontSize:'0.7rem',padding:'1px 8px',borderRadius:crmRd>0?20:2,background:grp.color+'20',color:grp.color,fontWeight:600}}>{grp.items.length} affaire{grp.items.length>1?'s':''}</span>
                                        {grp.id==='bloque'&&grp.items.length>0&&<span style={{fontSize:'0.68rem',color:'#e74c3c',fontWeight:600}}>— {grp.items.reduce((s,a)=>s+a.alerts.length,0)} alerte(s)</span>}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                {/* Rows */}
                                {!isCollapsed && grp.items.map((a,ri)=>{
                                  const ph = PHASES.find(p=>p.id===a.ph)||PHASES[0];
                                  const st = PREP_STATUTS.find(s=>s.id===getStatut(a));
                                  const isLast = ri===grp.items.length-1;
                                  return (
                                    <tr key={a.cd||a.id} onClick={()=>{setCrmFicheId(a.cd||a.id);setCrmFicheTab('preparation');}}
                                      style={{cursor:'pointer',borderBottom:!isLast?`1px solid ${$borderLight}`:'none',transition:'background 0.1s',position:'relative'}}
                                      onMouseEnter={e=>e.currentTarget.style.background=$bgSub}
                                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                      {prepGroupBy!=='aucun'&&(
                                        <td colSpan={0} style={{padding:0,width:0,position:'relative'}}>
                                          <div style={{position:'absolute',left:0,top:0,bottom:isLast?0:'auto',height:isLast?'100%':'100%',width:4,background:grp.color+(isLast?'':''),opacity:0.35,pointerEvents:'none'}}/>
                                        </td>
                                      )}
                                      <td style={{padding:'10px 14px 10px '+(prepGroupBy!=='aucun'?'18px':'14px'),overflow:'hidden'}}>
                                        <div style={{fontWeight:600,fontSize:'0.8rem',color:$text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.n||'—'}</div>
                                        <div style={{fontSize:'0.67rem',color:$textMut,marginTop:1}}>{a.cd||a.id}</div>
                                      </td>
                                      <td style={{padding:'10px 14px'}}>
                                        <span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:crmRd>0?20:2,background:ph.color+'18',color:ph.color,fontWeight:600,whiteSpace:'nowrap'}}>{ph.icon} P{a.ph}</span>
                                      </td>
                                      <td style={{padding:'10px 14px',fontSize:'0.78rem',color:$textSec,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.eq||'—'}</td>
                                      <td style={{padding:'10px 14px'}}>
                                        <div style={{display:'flex',alignItems:'center',gap:7}}>
                                          <div style={{flex:1,height:5,background:$bgSub,borderRadius:crmRd>0?3:0,overflow:'hidden',minWidth:30}}>
                                            <div style={{height:'100%',width:a.donePct+'%',background:a.donePct>=100?'#059669':a.donePct>50?'#d97706':'#3b82f6',borderRadius:crmRd>0?3:0,transition:'width 0.4s'}}/>
                                          </div>
                                          <span style={{fontSize:'0.68rem',fontWeight:700,color:$textMut,whiteSpace:'nowrap'}}>{a.done}/{a.total}</span>
                                        </div>
                                      </td>
                                      <td style={{padding:'10px 14px'}}>
                                        <span style={{fontSize:'0.7rem',padding:'2px 9px',borderRadius:crmRd>0?20:2,background:st.c+'15',color:st.c,fontWeight:600,border:`1px solid ${st.c}25`,whiteSpace:'nowrap'}}>{st.ic} {st.l}</span>
                                      </td>
                                      <td style={{padding:'10px 14px'}}>
                                        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                                          {a.alerts.length===0
                                            ? <span style={{fontSize:'0.68rem',color:'#059669',fontWeight:600}}>✓ OK</span>
                                            : a.alerts.map((al,ai)=>(
                                                <span key={ai} style={{fontSize:'0.63rem',padding:'2px 6px',borderRadius:crmRd>0?10:2,background:'#e74c3c10',border:'1px solid #e74c3c28',color:'#e74c3c',fontWeight:600,whiteSpace:'nowrap'}}>▲ {al}</span>
                                              ))
                                          }
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                                {/* Gap between groups */}
                                {gi<groups.length-1&&<tr><td colSpan={PREP_COLS.length} style={{height:10,background:$bgSub,borderTop:`1px solid ${$border}`,borderBottom:`1px solid ${$border}`}}/></tr>}
                              </React.Fragment>
                            );
                          })}
                          {PREP_AFFAIRES.length===0&&(
                            <tr><td colSpan={PREP_COLS.length} style={{padding:40,textAlign:'center',color:$textMut,fontSize:'0.85rem'}}>Aucun chantier en phase de préparation</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Légende statuts + groupes */}
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                      <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'12px 14px'}}>
                        <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:8}}>🏷️ Statuts de préparation</div>
                        {PREP_STATUTS.map((s,i)=>(
                          <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',borderBottom:i<PREP_STATUTS.length-1?`1px solid ${$borderLight}`:'none'}}>
                            <div style={{width:8,height:8,borderRadius:'50%',background:s.c,flexShrink:0}}/>
                            <span style={{fontSize:'0.75rem',fontWeight:600,color:s.c}}>{s.ic} {s.l}</span>
                            <span style={{marginLeft:'auto',fontSize:'0.72rem',color:$textMut,fontWeight:600}}>{PREP_AFFAIRES.filter(a=>getStatut(a)===s.id).length}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,padding:'12px 14px'}}>
                        <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:8}}>☰ Groupes checklist (24 étapes)</div>
                        {PREP_GROUPS_DEF.map((g,i)=>(
                          <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',borderBottom:i<PREP_GROUPS_DEF.length-1?`1px solid ${$borderLight}`:'none'}}>
                            <span style={{fontSize:'0.85rem'}}>{g.ic}</span>
                            <span style={{fontSize:'0.75rem',color:$textSec,flex:1}}>{g.l}</span>
                            <span style={{fontSize:'0.7rem',color:$textMut,fontWeight:600}}>{g.steps} étapes</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ===== TABS: DEVIS & ACTIVITÉS (placeholder) ===== */}
              {(crmTab === 'devis' || crmTab === 'activites') && (
                <div style={{background:$bgCard, borderRadius:crmRd, border:`1px solid ${$border}`, padding:40, textAlign:'center'}}>
                  <div style={{fontSize:'2rem', marginBottom:12}}>{crmTab === 'devis' ? '▫' : '◫'}</div>
                  <div style={{fontWeight:700, color:$text, fontSize:'1rem', marginBottom:8}}>{crmTab === 'devis' ? 'Gestion des Devis' : 'Journal des Activités'}</div>
                  <div style={{color:$textMut, fontSize:'0.82rem'}}>Module en cours de développement — disponible prochainement</div>
                </div>
              )}
              </div>{/* end minHeight wrapper */}

              {/* ===== FICHE CHANTIER DRAWER ===== */}
              {crmFicheId && (() => {
                const TOUTES = [...AFFAIRES_REAL, ...ARCHIVES_REAL];
                const aff = TOUTES.find(a=>(a.cd||a.id)===crmFicheId);
                if(!aff) return null;
                const stInfo = st => {
                  const s = st||'';
                  if(s.includes('cours')) return {c:'#3b82f6',ic:'▶'};
                  if(s.includes('suspendu')||s.includes('Suspendu')) return {c:'#f97316',ic:'⏸'};
                  if(s.includes('DGD')) return {c:'#8b5cf6',ic:'▫'};
                  if(s.includes('GPA')||s.includes('RG')) return {c:'#f97316',ic:'🛡'};
                  if(s.includes('reçu')||s.includes('OS')) return {c:'#22c55e',ic:'✓'};
                  if(s.includes('remportée')||s.includes('transféré')) return {c:'#3b82f6',ic:'→'};
                  if(s.includes('Levée')||s.includes('Réception')) return {c:'#22c55e',ic:'✓'};
                  return {c:'#94a3b8',ic:'·'};
                };
                const ph = PHASES.find(p=>p.id===(aff.ph||aff.phase)) || PHASES[0];
                const si2 = stInfo(aff.st||aff.statut||'—');

                const montantVal = aff.m&&aff.m!=='--'?(parseFloat(aff.m)*1000):aff.montant||0;
                const margeB = Math.round(montantVal*0.18);
                const margePct = 18;
                const rgMontant = Math.round(montantVal*0.05);
                const avancPhy = ph.id===1?10:ph.id===2?25:ph.id===3?55:ph.id===4?80:ph.id===5?95:ph.id===6?100:100;
                const avancFin = Math.round(avancPhy*0.85);
                const MOCK_FICHE = {
                  client: aff.mk==='Public'?'Maîtrise d\'Ouvrage Publique':aff.mk==='Privé'?'Promoteur Privé':'Particulier',
                  adresse: aff.n.includes('Paris')?'Paris, Île-de-France':aff.n.includes('77')?'Seine-et-Marne (77)':aff.n.includes('94')?'Val-de-Marne (94)':'Île-de-France',
                  email: (aff.cd||aff.id)+'@ezel-batiment.fr',
                  dateOS: '15/01/2025', dateFin: '30/06/2025', duree: '24 semaines',
                  ct: 'Marco Dupont', chef: 'Raphaël Martin', etudes: 'Bruno Leroy',
                  moe: aff.mk==='Public'?'Cabinet Architecture & Associés':'—',
                  opc: aff.mk==='Public'?'OPC Conseil BTP':'—',
                  sps: 'Sécurité & Prévention SAS', bc: aff.mk==='Public'?'Bureau Veritas':'—',
                  montant: aff.m&&aff.m!=='--'?aff.m+'€':aff.montant?fmtE(aff.montant):'—',
                  montantVal, margeB, margePct, rgMontant, avancPhy, avancFin,
                  ts: 12500, prevResulat: Math.round(margeB*0.72),
                  situations: [
                    {n:'Sit. 1', date:'28/02/2025', montant:85, statut:'Payée'},
                    {n:'Sit. 2', date:'31/03/2025', montant:120, statut:'Payée'},
                    {n:'Sit. 3', date:'30/04/2025', montant:145, statut:'En cours'},
                  ],
                  budgetPostes: [
                    {l:'Main d\'œuvre',budget:Math.round(montantVal*0.32),reel:Math.round(montantVal*0.29)},
                    {l:'Matériaux',budget:Math.round(montantVal*0.22),reel:Math.round(montantVal*0.21)},
                    {l:'Sous-traitance',budget:Math.round(montantVal*0.18),reel:Math.round(montantVal*0.17)},
                    {l:'Frais chantier',budget:Math.round(montantVal*0.08),reel:Math.round(montantVal*0.09)},
                  ],
                  soustraitants: aff.eq==='TCE'?[
                    {nom:'Électricité Générale IDF', lot:'Électricité', montant:'45K€', statut:'Actif'},
                    {nom:'Plomberie Pro 77', lot:'Plomberie', montant:'28K€', statut:'Actif'},
                  ]:[],
                  docs: [
                    {n:'Marché signé', type:'PDF', date:'10/01/2025'},
                    {n:'PPSPS', type:'PDF', date:'12/01/2025'},
                    {n:'DC4 sous-traitants', type:'PDF', date:'15/01/2025'},
                    {n:'Plans d\'exécution', type:'DWG', date:'20/01/2025'},
                    {n:'PIC - Plan Installation', type:'PDF', date:'18/01/2025'},
                  ],
                  commandes: [
                    {n:'Grue Liebherr 42L', fournisseur:'Hup Grue IDF', montant:'8.5K€/mois', statut:'Livré', date:'20/01/2025', ic:'◆'},
                    {n:'Béton BPE (contrat cadre)', fournisseur:'Cemex Île-de-France', montant:'Cadre 180K€', statut:'En cours', date:'15/01/2025', ic:'🪣'},
                    {n:'Armatures HA', fournisseur:'ArcelorMittal', montant:'42K€', statut:'Livré', date:'25/01/2025', ic:'✱'},
                    {n:'Banches coffrages', fournisseur:'Doka France', montant:'3.2K€/mois', statut:'Livré', date:'22/01/2025', ic:'🧱'},
                    {n:'Cantonnement bungalows', fournisseur:'La Roulotte (Group OY)', montant:'1.8K€/mois', statut:'Livré', date:'18/01/2025', ic:'🏠'},
                    {n:'EPI & Sécurité', fournisseur:'Würth France', montant:'4.2K€', statut:'Commandé', date:'28/01/2025', ic:'🦺'},
                  ],
                  planning: [
                    // Référence: mois 0 = Jan 2024. Valeurs en mois depuis Jan 2023 (offset +12)
                    // Format: {l, startM, durM, done, color, cat}
                    // Phase Études & Préparation (avant chantier)
                    {l:'Études / Conception',      startM:0,  durM:6,  done:true, color:'#6366f1', cat:'Études'},
                    {l:'DCE & Consultation EO',    startM:5,  durM:3,  done:true, color:'#8b5cf6', cat:'Études'},
                    {l:'Dépôt PC / DA',            startM:3,  durM:8,  done:true, color:'#a855f7', cat:'Admin'},
                    {l:'Obtention permis',         startM:11, durM:1,  done:true, color:'#7c3aed', cat:'Admin'},
                    // Phase Préparation chantier
                    {l:'Ordre de Service',         startM:12, durM:1,  done:true, color:'#3b82f6', cat:'Chantier'},
                    {l:'Installation chantier',    startM:12, durM:2,  done:true, color:'#f59e0b', cat:'Chantier'},
                    {l:'Consultation ST',          startM:11, durM:3,  done:true, color:'#0ea5e9', cat:'Chantier'},
                    // Gros Œuvre
                    {l:'Terrassement / Fouilles',  startM:14, durM:2,  done:true, color:'#854d0e', cat:'GO'},
                    {l:'Fondations',               startM:16, durM:2,  done:true, color:'#92400e', cat:'GO'},
                    {l:'Structure béton',          startM:18, durM:5,  done:ph.id>=3, color:'#0369a1', cat:'GO'},
                    {l:'Maçonnerie / Élévation',   startM:20, durM:4,  done:ph.id>=3, color:'#1d4ed8', cat:'GO'},
                    // Second Œuvre
                    {l:'Charpente / Couverture',   startM:23, durM:3,  done:ph.id>=3, color:'#059669', cat:'SO'},
                    {l:'Menuiseries ext.',          startM:24, durM:2,  done:ph.id>=3, color:'#047857', cat:'SO'},
                    {l:'Plomberie / CVC',           startM:25, durM:4,  done:ph.id>=4, color:'#0891b2', cat:'SO'},
                    {l:'Électricité CFO/CFA',       startM:25, durM:5,  done:ph.id>=4, color:'#d97706', cat:'SO'},
                    {l:'Cloisons / Plâtrerie',      startM:27, durM:3,  done:ph.id>=4, color:'#ca8a04', cat:'SO'},
                    // Finitions
                    {l:'Carrelage / Revêtements',   startM:29, durM:3,  done:ph.id>=4, color:'#ea580c', cat:'Finitions'},
                    {l:'Peintures',                 startM:31, durM:2,  done:ph.id>=4, color:'#dc2626', cat:'Finitions'},
                    {l:'VRD / Aménagements ext.',   startM:30, durM:3,  done:ph.id>=4, color:'#16a34a', cat:'Finitions'},
                    // Réception & Garanties
                    {l:'OPR / Réception',           startM:33, durM:1,  done:ph.id>=5, color:'#047857', cat:'Réception'},
                    {l:'Levée des réserves',        startM:34, durM:2,  done:ph.id>=5, color:'#dc2626', cat:'Réception'},
                    {l:'GPA — Parfait achèvement',  startM:36, durM:12, done:ph.id>=6, color:'#c2410c', cat:'Garanties'},
                    {l:'RG — Retenue de garantie',  startM:33, durM:12, done:ph.id>=6, color:'#b45309', cat:'Garanties'},
                    {l:'Biennale (équipements)',    startM:36, durM:24, done:ph.id>=7, color:'#6d28d9', cat:'Garanties'},
                    {l:'Décennale',                 startM:36, durM:60, done:ph.id>=7, color:'#334155', cat:'Garanties'},
                  ],
                  garanties: [
                    {l:'Parfait achèvement',dur:'1 an',fin:'30/06/2026',active:ph.id>=5},
                    {l:'Biennale (équipements)',dur:'2 ans',fin:'30/06/2027',active:ph.id>=5},
                    {l:'Décennale',dur:'10 ans',fin:'30/06/2035',active:ph.id>=5},
                  ],
                  litigeStatut: aff.lit?'En analyse':'—',
                  litigeDesc: aff.lit?'Malfaçon signalée par le client sur les ouvrages de finition. Expertise contradictoire en cours.':'',
                  avancement: (()=>{
                    const mk = aff.mk||aff.marche||'Privé';
                    const isPub = mk==='Public';
                    const isPart = mk==='Particulier';
                    const all = [
                      // Groupe Contractuel
                      { grp:'☰ Contractuel', items: [
                        { l:'Notification marché / OS reçu', done:ph.id>=1, types:[] },
                        { l:'Commission d\'appel d\'offres — décision', done:ph.id>=1, types:['Public'] },
                        { l:'Négociation & signature marché', done:ph.id>=1, types:['Privé'] },
                        { l:'Devis signé + acompte reçu', done:ph.id>=1, types:['Particulier'] },
                        { l:'Délai rétractation 10j écoulé (CCMI)', done:ph.id>=1, types:['Particulier'] },
                        { l:'Caution bancaire déposée', done:ph.id>=1, types:['Public'] },
                        { l:'DC4 sous-traitants signés & agréés', done:ph.id>=2, types:['Public'] },
                      ].filter(x=>x.types.length===0||x.types.includes(mk)) },
                      // Groupe Préparation
                      { grp:'✱ Préparation', items: [
                        { l:'Réunion de transfert Études → Travaux', done:ph.id>=2, types:[] },
                        { l:'PIC validé + VISA MOE obtenu', done:ph.id>=2, types:['Public'] },
                        { l:'PIC dessiné et validé', done:ph.id>=2, types:['Privé'] },
                        { l:'PIC simplifié / plan d\'installation', done:ph.id>=2, types:['Particulier'] },
                        { l:'PV réunion démarrage (MOE+OPC+SPS+BC)', done:ph.id>=2, types:['Public'] },
                        { l:'Réunion de démarrage avec ST', done:ph.id>=2, types:['Privé'] },
                        { l:'Grue montée + VGP effectué', done:ph.id>=2, types:['Public','Privé'] },
                        { l:'Installation chantier complète', done:ph.id>=2, types:[] },
                      ].filter(x=>x.types.length===0||x.types.includes(mk)) },
                      // Groupe Exécution
                      { grp:'◆ Exécution', items: [
                        { l:'Gros œuvre démarré', done:ph.id>=3, types:[] },
                        { l:'PV réunions de chantier hebdo (MOE signé)', done:ph.id>=3, types:['Public'] },
                        { l:'Réunions de chantier hebdo', done:ph.id>=3, types:['Privé'] },
                        { l:'Fiches contrôle béton — bureau de contrôle', done:ph.id>=3, types:['Public'] },
                        { l:'Situations de travaux visées MOE', done:ph.id>=3, types:['Public'] },
                        { l:'Situations mensuelles émises', done:ph.id>=3, types:['Privé'] },
                        { l:'Appels de fonds 30% reçu', done:ph.id>=3, types:['Particulier'] },
                        { l:'Appels de fonds 70% reçu', done:ph.id>=4, types:['Particulier'] },
                        { l:'Second œuvre / finitions', done:ph.id>=4, types:[] },
                        { l:'Pré-réception interne — levée réserves', done:ph.id>=4, types:[] },
                      ].filter(x=>x.types.length===0||x.types.includes(mk)) },
                      // Groupe Réception
                      { grp:'✓ Réception & Clôture', items: [
                        { l:'OPR avec bureau de contrôle', done:ph.id>=5, types:['Public'] },
                        { l:'OPR — visite contradictoire MOE', done:ph.id>=5, types:['Privé'] },
                        { l:'Réception travaux avec client', done:ph.id>=5, types:['Particulier'] },
                        { l:'PV de réception signé (MOE+MOA)', done:ph.id>=5, types:['Public','Privé'] },
                        { l:'PV de réception simplifié', done:ph.id>=5, types:['Particulier'] },
                        { l:'Levée des réserves (délai 90j)', done:ph.id>=5, types:['Public'] },
                        { l:'Levée des réserves', done:ph.id>=5, types:['Privé','Particulier'] },
                        { l:'DGD — Décompte Général Définitif', done:ph.id>=6, types:['Public'] },
                        { l:'DGD (si prévu au contrat)', done:ph.id>=6, types:['Privé'] },
                        { l:'Solde final réglé (100%)', done:ph.id>=6, types:['Particulier'] },
                        { l:'DOE — Dossier Ouvrages Exécutés', done:ph.id>=6, types:['Public'] },
                        { l:'DOE (si prévu)', done:ph.id>=6, types:['Privé'] },
                        { l:'Repli chantier + nettoyage', done:ph.id>=6, types:[] },
                        { l:'Libération RG à 1 an exactement', done:ph.id>=7, types:['Public'] },
                        { l:'Libération RG (contractuel)', done:ph.id>=7, types:['Privé'] },
                      ].filter(x=>x.types.length===0||x.types.includes(mk)) },
                    ];
                    return all;
                  })(),
                  activites: [
                    {date:'10/03/2025',type:'Réunion',txt:'Réunion de chantier hebdomadaire — avancement 65%'},
                    {date:'05/03/2025',type:'Email',txt:'Envoi situation de travaux n°2 au MOE'},
                    {date:'28/02/2025',type:'Paiement',txt:'Paiement situation n°1 reçu — 85K€'},
                    {date:'15/02/2025',type:'Incident',txt:'Intempéries — arrêt chantier 3 jours'},
                    {date:'01/02/2025',type:'Réunion',txt:'Réunion de transfert Études → Travaux'},
                  ],
                  preparation: (()=>{
                    const mk = aff.mk||aff.marche||'Privé';
                    const isPub = mk==='Public';
                    const isPart = mk==='Particulier';
                    const isPriv = mk==='Privé';
                    // types: [] = tous, ['Public'] = public seulement, ['Privé','Particulier'] = hors public
                    const show = (types) => types.length===0 || types.includes(mk);
                    return [
                    {
                      titre:'Transfert Études → Travaux', ic:'☰', color:'#3b82f6',
                      items:[
                        {l:'Réunion de transfert organisée',done:ph.id>=2,types:[]},
                        {l:'Budget études remis (déboursés par poste)',done:ph.id>=2,types:[]},
                        {l:'Liste ST / fournisseurs retenus remise',done:ph.id>=2,types:[]},
                        {l:'Points de vigilance techniques documentés',done:ph.id>=2,types:[]},
                        {l:'Planning contractuel et méthodes remis',done:ph.id>=2,types:[]},
                        {l:'DC1/DC2 dossier candidature archivé',done:ph.id>=2,types:['Public']},
                        {l:'Négociation avenant / ajustements signés',done:ph.id>=2,types:['Privé']},
                        {l:'Acompte à la signature reçu',done:ph.id>=2,types:['Particulier']},
                        {l:'Délai rétractation 10 jours écoulé (CCMI)',done:ph.id>=2,types:['Particulier']},
                      ].filter(it=>show(it.types))
                    },
                    {
                      titre:'Admin & Réglementaire', ic:'📜', color:'#8b5cf6',
                      items:[
                        {l:'DICT (réseaux enterrés) envoyée',done:ph.id>=2,types:[]},
                        {l:'PPSPS / PGC rédigé et validé',done:ph.id>=2,types:[]},
                        {l:'Permis de construire / DP obtenu',done:ph.id>=1,types:[]},
                        {l:'DC4 sous-traitants signés',done:ph.id>=3,types:[]},
                        {l:'Assurances TRC / DO vérifiées',done:ph.id>=2,types:[]},
                        {l:'Caution bancaire déposée',done:ph.id>=2,types:['Public']},
                        {l:'Bureau de contrôle agréé désigné',done:ph.id>=2,types:['Public']},
                        {l:'Attestations fiscales / URSSAF < 6 mois',done:ph.id>=2,types:['Public']},
                        {l:'Conditions de paiement contractuelles validées',done:ph.id>=2,types:['Privé']},
                      ].filter(it=>show(it.types))
                    },
                    {
                      titre:'PIC — Plan d\'Installation de Chantier', ic:'🗺️', color:'#d97706',
                      items:[
                        {l:'Positionnement grue(s) défini',done:ph.id>=2,types:[]},
                        {l:'Cantonnement / bungalows localisé',done:ph.id>=2,types:[]},
                        {l:'Accès camion et lavage roues défini',done:ph.id>=2,types:[]},
                        {l:'Zones de stockage tracées',done:ph.id>=2,types:[]},
                        {l:'Réseaux provisoires planifiés (eau, élec)',done:ph.id>=2,types:[]},
                        {l:'PIC dessiné et validé par le chef de chantier',done:ph.id>=2,types:[]},
                        {l:'VISA MOE sur plans d\'exécution obtenu',done:ph.id>=2,types:['Public']},
                        {l:'PV réunion de démarrage (MOE+OPC+SPS+BC)',done:ph.id>=2,types:['Public']},
                      ].filter(it=>show(it.types))
                    },
                    {
                      titre:'Installation Physique du Chantier', ic:'◆', color:'#059669',
                      items:[
                        {l:'Clôture de chantier et panneau posés',done:ph.id>=3,types:[]},
                        {l:'Terrassement de la plateforme réalisé',done:ph.id>=3,types:[]},
                        {l:'Bungalows installés (La Roulotte)',done:ph.id>=3,types:[]},
                        {l:'Branchements provisoires raccordés',done:ph.id>=3,types:[]},
                        {l:'Grue montée + VGP effectué',done:ph.id>=3,types:[]},
                        {l:'Implantation géomètre réalisée',done:ph.id>=3,types:[]},
                        {l:'Réunion de lancement avec ST effectuée',done:ph.id>=3,types:[]},
                        {l:'Fiches contrôle béton — bureau de contrôle validé',done:ph.id>=3,types:['Public']},
                      ].filter(it=>show(it.types))
                    },
                    ];
                  })(),
                  consultations: [
                    {fourniture:'Béton BPE C30/37',fournisseurs:['Cemex IDF','Lafarge','Unibéton'],retenu:'Cemex IDF',prix:'118€/m³',statut:'Retenu',ic:'🪣',urgent:false},
                    {fourniture:'Armatures HA / Treillis',fournisseurs:['ArcelorMittal','Fimurex'],retenu:'Fimurex',prix:'-3% vs budget',statut:'En cours',ic:'✱',urgent:true},
                    {fourniture:'Coffrages banches',fournisseurs:['Doka France','Hussor','COFNORD'],retenu:'Doka France',prix:'3.2K€/mois',statut:'Retenu',ic:'🧱',urgent:false},
                    {fourniture:'Terrassement (ST)',fournisseurs:['Terrabat','Géosol IDF','Eurovia'],retenu:'Terrabat',prix:'42K€ forfait',statut:'Signé',ic:'🚜',urgent:false},
                    {fourniture:'Étanchéité terrasse (ST)',fournisseurs:['L\'Étanchéité (Group OY)','Soprema'],retenu:'En attente',prix:'—',statut:'À consulter',ic:'◦',urgent:true},
                    {fourniture:'Électricité courants forts (ST)',fournisseurs:['Elec IDF','Spie Batignolles'],retenu:'—',prix:'—',statut:'À consulter',ic:'⚡',urgent:false},
                  ],
                };

                const FTABS_DEF = {
                  intervenants:{id:'intervenants',l:'Intervenants',ic:'◉'},
                  financier:{id:'financier',l:'Financier',ic:'€'},
                  preparation:{id:'preparation',l:'Préparation',ic:'✱'},
                  consultations:{id:'consultations',l:'Consultations',ic:'📩'},
                  commandes:{id:'commandes',l:'Commandes',ic:'▣'},
                  planning:{id:'planning',l:'Planning',ic:'◫'},
                  documents:{id:'documents',l:'Documents',ic:'▸'},
                  litiges:{id:'litiges',l:'Litiges',ic:'⚖️'},
                  avancement:{id:'avancement',l:'Avancement',ic:'▦'},
                  activites:{id:'activites',l:'Activités',ic:'◷'},
                };
                const FTABS = ficheTabOrder
                  .filter(id => id!=='litiges' || aff.lit)
                  .map(id => FTABS_DEF[id])
                  .filter(Boolean);

                const rd = crmRd;
                return (
                  <>
                    {/* Backdrop — sous le header sticky (zIndex:9001) */}
                    <div onClick={()=>setCrmFicheId(null)} style={{position:'fixed',inset:0,top:52,background:'rgba(0,0,0,0.35)',zIndex:9000}}/>
                    {/* Drawer — démarre juste sous le header */}
                    <div style={{position:'fixed',top:52,right:0,bottom:0,width:drawerWidth,background:$bgCard,boxShadow:'-4px 0 32px rgba(0,0,0,0.18)',zIndex:9002,display:'flex',flexDirection:'column',overflowY:'auto'}}>
                      {/* Resize handle — bord gauche du drawer */}
                      <div
                        onMouseDown={startDrawerResize}
                        style={{position:'absolute',left:0,top:0,bottom:0,width:5,cursor:'col-resize',zIndex:10,background:drawerResizing?filColor+'60':'transparent',transition:'background 0.15s',display:'flex',alignItems:'center',justifyContent:'center'}}
                        title="Glisser pour redimensionner"
                      >
                        <div style={{width:3,height:40,borderRadius:2,background:drawerResizing?filColor:$border,transition:'all 0.15s',opacity:drawerResizing?1:0.6}}/>
                      </div>

                      {/* Header */}
                      <div style={{padding:'20px 24px 16px',borderBottom:`1px solid ${$border}`,background:$bgSub,flexShrink:0}}>
                        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:12}}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,flexWrap:'wrap'}}>
                              <span style={{fontFamily:'monospace',fontSize:'0.85rem',fontWeight:700,color:filColor,background:filColor+'15',padding:'2px 8px',borderRadius:rd>0?6:0}}>{aff.cd||aff.id}</span>
                              <span style={{padding:'3px 10px',borderRadius:rd>0?20:2,fontSize:'0.72rem',fontWeight:700,background:ph.color+'18',color:ph.color}}>{ph.icon} {ph.label}</span>
                              {(()=>{const mk=aff.mk||aff.marche;const mkC=mk==='Public'?'#3b82f6':mk==='Particulier'?'#8b5cf6':'#f59e0b';const mkIc=mk==='Public'?'◆':mk==='Particulier'?'◉':'▪';return mk?<span style={{padding:'3px 10px',borderRadius:rd>0?20:2,fontSize:'0.72rem',fontWeight:700,background:mkC+'18',color:mkC,border:`1px solid ${mkC}30`}}>{mkIc} {mk}</span>:null;})()}
                              {aff.lit&&<span style={{padding:'3px 8px',borderRadius:rd>0?20:2,fontSize:'0.7rem',fontWeight:700,background:'#e74c3c18',color:'#e74c3c'}}>⚖️ Litige</span>}
                            </div>
                            <div style={{fontWeight:700,fontSize:'1.05rem',color:$text,lineHeight:1.3,marginBottom:4}}>{aff.n||aff.nom}</div>
                            <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                              <span style={{fontSize:'0.78rem',color:si2.c,fontWeight:600}}>{si2.ic} {aff.st||aff.statut}</span>
                              <span style={{color:$textMut,fontSize:'0.7rem'}}>·</span>
                              <span style={{fontSize:'0.8rem',fontWeight:700,color:$text}}>{MOCK_FICHE.montant}</span>
                              <span style={{color:$textMut,fontSize:'0.7rem'}}>·</span>
                              <span style={{fontSize:'0.75rem',color:$textSec}}>{aff.eq||aff.equipe}</span>
                            </div>
                          </div>
                          <button onClick={()=>setCrmFicheId(null)} style={{width:32,height:32,borderRadius:rd>0?'50%':2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:$textMut,fontSize:'1rem',flexShrink:0,fontFamily:'inherit'}}>✕</button>
                        </div>
                        {/* Info pills */}
                        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                          {[
                            {l:'📍 '+MOCK_FICHE.adresse},
                            {l:'◆ '+MOCK_FICHE.ct},
                            {l:'✉️ '+MOCK_FICHE.email},
                            {l:'◫ OS: '+MOCK_FICHE.dateOS},
                            {l:'🏁 Fin: '+MOCK_FICHE.dateFin},
                            {l:'◷ '+MOCK_FICHE.duree},
                          ].map((p,i)=>(
                            <span key={i} style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:rd>0?20:2,background:$bgCard,border:`1px solid ${$border}`,color:$textSec}}>{p.l}</span>
                          ))}
                        </div>
                      </div>

                      {/* Tabs — draggable + scroll arrows */}
                      <div style={{position:'relative',flexShrink:0,borderBottom:`1px solid ${$border}`,background:$bgSub,display:'flex',alignItems:'stretch'}}>
                        {/* Scroll left button */}
                        <button onClick={()=>{const el=ficheTabScrollRef.current;if(el)el.scrollBy({left:-160,behavior:'smooth'});}} style={{flexShrink:0,width:32,border:'none',borderRight:`1px solid ${$border}`,borderBottom:'2px solid transparent',background:$bgSub,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#3b82f6',fontSize:'1.4rem',fontWeight:900,zIndex:2,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#3b82f615'} onMouseLeave={e=>e.currentTarget.style.background=$bgSub}>❮</button>
                        {/* Tab scroll container */}
                        <div ref={ficheTabScrollRef} style={{flex:1,display:'flex',gap:0,overflowX:'auto',scrollbarWidth:'none'}} className="hide-scrollbar">
                          {FTABS.map(t=>(
                            <button
                              key={t.id}
                              draggable
                              onDragStart={()=>setFicheTabDragId(t.id)}
                              onDragOver={e=>{e.preventDefault();setFicheTabDragOver(t.id);}}
                              onDragEnd={()=>{if(ficheTabDragOver&&ficheTabDragOver!==ficheTabDragId){reorderFicheTabs(ficheTabDragId,ficheTabDragOver);}setFicheTabDragId(null);setFicheTabDragOver(null);}}
                              onClick={()=>setCrmFicheTab(t.id)}
                              style={{padding:'10px 13px',border:'none',borderBottom:crmFicheTab===t.id?'2px solid #3b82f6':ficheTabDragOver===t.id&&ficheTabDragId!==t.id?'2px solid #3b82f640':'2px solid transparent',background:crmFicheTab===t.id?'#3b82f608':ficheTabDragOver===t.id&&ficheTabDragId!==t.id?'#3b82f605':'transparent',color:crmFicheTab===t.id?'#3b82f6':ficheTabDragId===t.id?$textMut+'60':$textMut,fontWeight:crmFicheTab===t.id?700:400,fontSize:'0.78rem',cursor:'grab',whiteSpace:'nowrap',fontFamily:'inherit',transition:'all 0.12s',display:'flex',alignItems:'center',gap:4,userSelect:'none',opacity:ficheTabDragId===t.id?0.4:1,flexShrink:0}}
                              onMouseEnter={e=>{if(crmFicheTab!==t.id)e.currentTarget.style.color=$text;}}
                              onMouseLeave={e=>{if(crmFicheTab!==t.id)e.currentTarget.style.color=$textMut;}}
                            >
                              {t.ic} {t.l}
                            </button>
                          ))}
                        </div>
                        {/* Scroll right button + count */}
                        <div style={{flexShrink:0,display:'flex',alignItems:'center',gap:4,paddingRight:6,borderLeft:`1px solid ${$border}`,paddingLeft:6}}>
                          <span style={{fontSize:'0.6rem',padding:'2px 6px',borderRadius:rd>0?8:2,background:'#3b82f618',color:'#3b82f6',fontWeight:700,border:'1px solid #3b82f630'}}>{FTABS.length}</span>
                          <button onClick={()=>{const el=ficheTabScrollRef.current;if(el)el.scrollBy({left:160,behavior:'smooth'});}} style={{width:32,height:28,border:'none',borderBottom:'2px solid transparent',background:$bgSub,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#3b82f6',fontSize:'1.4rem',fontWeight:900,fontFamily:'inherit',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#3b82f615'} onMouseLeave={e=>e.currentTarget.style.background=$bgSub}>❯</button>
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{flex:1,padding:'20px 24px',overflowY:'auto'}}>

                        {/* INTERVENANTS */}
                        {crmFicheTab==='intervenants'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:16}}>
                            {/* Équipe interne */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12,display:'flex',alignItems:'center',gap:6}}>▪ Équipe interne Ezel</div>
                              {[
                                {role:'Conducteur de travaux',nom:MOCK_FICHE.ct,ic:'👷'},
                                {role:'Chef de chantier',nom:MOCK_FICHE.chef,ic:'🪖'},
                                {role:'Chargé d\'études',nom:MOCK_FICHE.etudes,ic:'◺'},
                              ].map((p,i)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:i<2?`1px solid ${$borderLight}`:'none'}}>
                                  <div style={{width:32,height:32,borderRadius:'50%',background:filColor+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',flexShrink:0}}>{p.ic}</div>
                                  <div style={{flex:1}}>
                                    <div style={{fontWeight:600,fontSize:'0.82rem',color:$text}}>{p.nom}</div>
                                    <div style={{fontSize:'0.7rem',color:$textMut}}>{p.role}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Intervenants externes */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>🤝 Intervenants externes</div>
                              {[
                                {role:'Maître d\'œuvre (MOE)',nom:MOCK_FICHE.moe},
                                {role:'OPC',nom:MOCK_FICHE.opc},
                                {role:'Coordinateur SPS',nom:MOCK_FICHE.sps},
                                {role:'Bureau de contrôle',nom:MOCK_FICHE.bc},
                              ].map((p,i,arr)=>(
                                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<arr.length-1?`1px solid ${$borderLight}`:'none'}}>
                                  <span style={{fontSize:'0.75rem',color:$textMut}}>{p.role}</span>
                                  <span style={{fontSize:'0.78rem',fontWeight:600,color:p.nom==='—'?$textMut:$text}}>{p.nom}</span>
                                </div>
                              ))}
                            </div>
                            {/* Sous-traitants */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>✱ Sous-traitants</div>
                              {MOCK_FICHE.soustraitants.length===0?(
                                <div style={{color:$textMut,fontSize:'0.78rem',textAlign:'center',padding:'12px 0'}}>Aucun sous-traitant enregistré</div>
                              ):MOCK_FICHE.soustraitants.map((st,i)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<MOCK_FICHE.soustraitants.length-1?`1px solid ${$borderLight}`:'none'}}>
                                  <div style={{flex:1}}>
                                    <div style={{fontWeight:600,fontSize:'0.82rem',color:$text}}>{st.nom}</div>
                                    <div style={{fontSize:'0.7rem',color:$textMut}}>Lot : {st.lot}</div>
                                  </div>
                                  <div style={{textAlign:'right'}}>
                                    <div style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>{st.montant}</div>
                                    <span style={{fontSize:'0.68rem',padding:'1px 7px',borderRadius:rd>0?20:2,background:'#05966915',color:'#059669',fontWeight:600}}>{st.statut}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* FINANCIER */}
                        {crmFicheTab==='financier'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:14}}>
                            {/* KPI top row */}
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                              {[
                                {l:'Montant marché',v:MOCK_FICHE.montant,c:filColor,ic:'▪'},
                                {l:'Marge brute',v:MOCK_FICHE.margePct+'% — '+fmtE(MOCK_FICHE.margeB),c:'#059669',ic:'↗'},
                                {l:'Retenue de garantie',v:fmtE(MOCK_FICHE.rgMontant),c:'#d97706',ic:'🔒'},
                                {l:'Avancement physique',v:MOCK_FICHE.avancPhy+'%',c:'#3b82f6',ic:'◆'},
                                {l:'Avancement financier',v:MOCK_FICHE.avancFin+'%',c:'#8b5cf6',ic:'€'},
                                {l:'TS / Avenants',v:'+'+fmtE(MOCK_FICHE.ts),c:'#f97316',ic:'☰'},
                              ].map((k,i)=>(
                                <div key={i} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'11px 13px',position:'relative',overflow:'hidden'}}>
                                  <div style={{fontSize:'0.6rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:3}}>{k.l}</div>
                                  <div style={{fontWeight:800,fontSize:'0.95rem',color:k.c}}>{k.v}</div>
                                  <div style={{position:'absolute',top:8,right:10,fontSize:'1rem',opacity:0.1}}>{k.ic}</div>
                                </div>
                              ))}
                            </div>
                            {/* Avancement physique vs financier */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>▦ Avancement physique vs financier</div>
                              {[
                                {l:'Avancement physique',v:MOCK_FICHE.avancPhy,c:'#3b82f6'},
                                {l:'Avancement financier',v:MOCK_FICHE.avancFin,c:'#8b5cf6'},
                              ].map((b,i)=>(
                                <div key={i} style={{marginBottom:10}}>
                                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                                    <span style={{fontSize:'0.75rem',color:$textSec,fontWeight:600}}>{b.l}</span>
                                    <span style={{fontSize:'0.78rem',fontWeight:700,color:b.c}}>{b.v}%</span>
                                  </div>
                                  <div style={{height:8,background:$bgCard,borderRadius:rd>0?4:0,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                    <div style={{height:'100%',width:b.v+'%',background:b.c,borderRadius:rd>0?4:0,transition:'width 0.5s'}}/>
                                  </div>
                                </div>
                              ))}
                              {MOCK_FICHE.avancPhy - MOCK_FICHE.avancFin > 5 && (
                                <div style={{marginTop:8,padding:'6px 10px',background:'#d9770610',borderRadius:rd,border:'1px solid #d9770630',fontSize:'0.72rem',color:'#d97706'}}>
                                  ▲ Écart de {MOCK_FICHE.avancPhy-MOCK_FICHE.avancFin}% — facturation en retard sur l'avancement physique
                                </div>
                              )}
                            </div>
                            {/* Situations */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                                <div style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>☰ Situations de travaux</div>
                                <span style={{fontSize:'0.72rem',color:$textMut}}>Cumulé facturé : {fmtE(MOCK_FICHE.situations.reduce((s,x)=>s+x.montant,0)*1000)}</span>
                              </div>
                              {MOCK_FICHE.situations.map((s,i)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:i<MOCK_FICHE.situations.length-1?`1px solid ${$borderLight}`:'none'}}>
                                  <div>
                                    <div style={{fontWeight:600,fontSize:'0.82rem',color:$text}}>{s.n}</div>
                                    <div style={{fontSize:'0.7rem',color:$textMut}}>{s.date}</div>
                                  </div>
                                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                                    <span style={{fontWeight:700,fontSize:'0.85rem',color:$text}}>{s.montant}K€</span>
                                    <span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:rd>0?20:2,background:s.statut==='Payée'?'#05966915':'#d9770615',color:s.statut==='Payée'?'#059669':'#d97706',fontWeight:600}}>{s.statut}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Budget vs réel par poste */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>📉 Budget vs Réel par poste</div>
                              {MOCK_FICHE.budgetPostes.map((b,i)=>{
                                const pct = Math.round(b.reel/b.budget*100);
                                const c = pct>100?'#e74c3c':pct>90?'#d97706':'#059669';
                                return (
                                  <div key={i} style={{marginBottom:10}}>
                                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                                      <span style={{fontSize:'0.75rem',color:$textSec,fontWeight:600}}>{b.l}</span>
                                      <span style={{fontSize:'0.72rem',color:c,fontWeight:700}}>{fmtE(b.reel)} / {fmtE(b.budget)} ({pct}%)</span>
                                    </div>
                                    <div style={{height:6,background:$bgCard,borderRadius:rd>0?3:0,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                      <div style={{height:'100%',width:Math.min(pct,100)+'%',background:c,borderRadius:rd>0?3:0,transition:'width 0.5s'}}/>
                                    </div>
                                  </div>
                                );
                              })}
                              <div style={{marginTop:10,padding:'8px 12px',background:$bgCard,borderRadius:rd,border:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                                <span style={{fontSize:'0.75rem',fontWeight:700,color:$text}}>Résultat estimé à terminaison</span>
                                <span style={{fontSize:'0.82rem',fontWeight:800,color:'#059669'}}>{fmtE(MOCK_FICHE.prevResulat)}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PRÉPARATION */}
                        {crmFicheTab==='preparation'&&(()=>{
                          const mk = aff.mk||aff.marche||'Privé';
                          const mkC = mk==='Public'?'#3b82f6':mk==='Particulier'?'#8b5cf6':'#f59e0b';
                          const mkIc = mk==='Public'?'◆':mk==='Particulier'?'◉':'▪';
                          const affId = aff.cd||aff.id;
                          // Flatten default items avec IDs stables
                          const defaultFlat = MOCK_FICHE.preparation.flatMap((grp,gi)=>
                            grp.items.map((item,ii)=>({...item, id:`prep_${gi}_${ii}`, grpColor:grp.color, grpTitre:grp.titre, grpIc:grp.ic}))
                          );
                          const allItems = getChecklistData(affId, defaultFlat).filter(x=>!x.hidden);
                          const done = allItems.filter(x=>x.done).length;
                          const total = allItems.length;
                          const pct = total>0?Math.round(done/total*100):0;
                          const specificCount = allItems.filter(x=>x.types&&x.types.length>0).length;
                          // Regrouper par grpTitre
                          const grpMap = {};
                          allItems.forEach(item => {
                            const k = item.grpTitre||'Autres';
                            if (!grpMap[k]) grpMap[k] = {titre:k, color:item.grpColor||'#64748b', ic:item.grpIc||'☰', items:[]};
                            grpMap[k].items.push(item);
                          });
                          const grps = Object.values(grpMap);
                          const isEditOpen = checklistEditOpen && checklistEditTab==='preparation';
                          return (
                          <div style={{display:'flex',flexDirection:'column',gap:14}}>
                            {/* Type banner + bouton editeur */}
                            <div style={{padding:'10px 14px',background:mkC+'10',borderRadius:rd,border:`1px solid ${mkC}30`,display:'flex',alignItems:'center',gap:10}}>
                              <span style={{fontSize:'1.1rem'}}>{mkIc}</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:700,fontSize:'0.82rem',color:mkC}}>Checklist {mk}</div>
                                <div style={{fontSize:'0.71rem',color:$textMut,marginTop:1}}>
                                  {total} étapes · {specificCount} spécifiques {mk}
                                  {mk==='Public'?' — DC4 · VISA MOE · Caution bancaire':''}
                                  {mk==='Privé'?' — Négociation libre · Conditions paiement':''}
                                  {mk==='Particulier'?' — Acompte · Délai rétractation 10j':''}
                                </div>
                              </div>
                              <div style={{display:'flex',alignItems:'center',gap:6}}>
                                <span style={{fontSize:'0.75rem',padding:'3px 10px',borderRadius:rd>0?20:2,background:mkC+'20',color:mkC,fontWeight:700,border:`1px solid ${mkC}40`,whiteSpace:'nowrap'}}>{done}/{total} ({pct}%)</span>
                                <button onClick={()=>{setChecklistEditOpen(v=>!v);setChecklistEditTab('preparation');}} style={{padding:'4px 10px',borderRadius:rd>0?8:2,border:`1px solid ${isEditOpen?filColor:$border}`,background:isEditOpen?filColor+'15':$bgCard,color:isEditOpen?filColor:$textMut,fontSize:'0.7rem',cursor:'pointer',fontFamily:'inherit',fontWeight:600,display:'flex',alignItems:'center',gap:4,whiteSpace:'nowrap'}}>
                                  ✎ {isEditOpen?'Fermer':'Gérer'}
                                </button>
                              </div>
                            </div>

                            {/* EDITEUR — panneau accordéon */}
                            {isEditOpen&&(()=>{
                              const allFlat = getChecklistData(affId, defaultFlat);
                              return (
                              <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${filColor}40`,overflow:'hidden'}}>
                                <div style={{padding:'10px 14px',background:filColor+'12',borderBottom:`1px solid ${filColor}25`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                  <span style={{fontWeight:700,fontSize:'0.8rem',color:filColor}}>✎ Éditeur de checklist — Préparation</span>
                                  <span style={{fontSize:'0.7rem',color:$textMut}}>{allFlat.length} étapes · cliquer pour masquer/afficher</span>
                                </div>
                                <div style={{maxHeight:340,overflowY:'auto'}}>
                                  {allFlat.map((item,idx)=>{
                                    const isSpec = item.types&&item.types.length>0;
                                    const tC = isSpec?(item.types[0]==='Public'?'#3b82f6':item.types[0]==='Particulier'?'#8b5cf6':'#f59e0b'):null;
                                    return (
                                    <div key={item.id} draggable onDragStart={()=>setClDragId(item.id)} onDragOver={e=>{e.preventDefault();setClDragOver(item.id);}} onDragEnd={()=>{if(clDragOver&&clDragOver!==item.id){reorderChecklistItem(affId,clDragId,clDragOver,defaultFlat);}setClDragId(null);setClDragOver(null);}} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',borderBottom:`1px solid ${$borderLight}`,background:clDragOver===item.id&&clDragId!==item.id?$accent+'12':item.hidden?'#e74c3c06':'transparent',opacity:item.hidden?0.5:1,cursor:'grab',transition:'background 0.1s'}}>
                                      <span style={{color:$textMut,fontSize:'1rem',flexShrink:0,userSelect:'none',lineHeight:1}} title="Glisser pour réordonner">⠿</span>
                                      {/* Visible toggle */}
                                      <button onClick={e=>{e.stopPropagation();updateChecklistItem(affId,item.id,{hidden:!item.hidden},defaultFlat);}} style={{width:22,height:22,borderRadius:rd>0?'50%':2,border:`1px solid ${item.hidden?'#e74c3c':$border}`,background:item.hidden?'#e74c3c15':'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'0.75rem'}}>
                                        {item.hidden?'🚫':'👁️'}
                                      </button>
                                      <span style={{flex:1,fontSize:'0.75rem',color:item.hidden?$textMut:$text,textDecoration:item.hidden?'line-through':'none'}}>{item.l}</span>
                                      {isSpec&&<span style={{fontSize:'0.6rem',padding:'1px 5px',borderRadius:rd>0?8:2,background:tC+'18',color:tC,fontWeight:700,flexShrink:0}}>{item.types[0]}</span>}
                                      {item.custom&&<span style={{fontSize:'0.6rem',padding:'1px 5px',borderRadius:rd>0?8:2,background:'#059669'+'18',color:'#059669',fontWeight:700,flexShrink:0}}>Custom</span>}
                                      {/* Supprimer (custom seulement) */}
                                      {item.custom&&<button onClick={e=>{e.stopPropagation();removeChecklistItem(affId,item.id,defaultFlat);}} style={{width:20,height:20,borderRadius:rd>0?'50%':2,border:`1px solid #e74c3c40`,background:'#e74c3c12',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'0.65rem',color:'#e74c3c'}}>✕</button>}
                                    </div>
                                    );
                                  })}
                                </div>
                                {/* Ajouter étape custom */}
                                <div style={{padding:'10px 12px',borderTop:`1px solid ${$border}`,display:'flex',gap:8,alignItems:'center'}}>
                                  <input
                                    value={newItemText}
                                    onChange={e=>setNewItemText(e.target.value)}
                                    onKeyDown={e=>{if(e.key==='Enter'&&newItemText.trim()){addChecklistItem(affId,newItemText,'Personnalisé',defaultFlat);setNewItemText('');}}}
                                    placeholder="+ Ajouter une étape personnalisée..."
                                    style={{flex:1,padding:'6px 10px',borderRadius:rd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$text,fontSize:'0.75rem',fontFamily:'inherit',outline:'none'}}
                                  />
                                  <button onClick={()=>{if(newItemText.trim()){addChecklistItem(affId,newItemText,'Personnalisé',defaultFlat);setNewItemText('');}}} style={{padding:'6px 12px',borderRadius:rd>0?6:2,border:'none',background:filColor,color:'white',fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit',fontWeight:700}}>Ajouter</button>
                                </div>
                              </div>
                              );
                            })()}

                            {/* Progress bar */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'12px 16px'}}>
                              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                                <span style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>✱ Avancement global</span>
                                <span style={{fontWeight:800,fontSize:'0.9rem',color:pct===100?'#059669':pct>60?'#d97706':'#e74c3c'}}>{pct}%</span>
                              </div>
                              <div style={{height:8,background:$bgCard,borderRadius:rd>0?4:0,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                <div style={{height:'100%',width:pct+'%',background:pct===100?'#059669':pct>60?'#d97706':'#3b82f6',borderRadius:rd>0?4:0,transition:'width 0.5s'}}/>
                              </div>
                              {pct===100&&<div style={{marginTop:8,padding:'6px 12px',background:'#05966912',borderRadius:rd,border:'1px solid #05966930',fontSize:'0.75rem',color:'#059669',fontWeight:700}}>✓ Chantier prêt à démarrer</div>}
                              {pct<100&&pct>0&&<div style={{marginTop:8,padding:'6px 12px',background:'#d9770612',borderRadius:rd,border:'1px solid #d9770630',fontSize:'0.75rem',color:'#d97706',fontWeight:600}}>▲ {total-done} étape(s) restante(s)</div>}
                            </div>

                            {/* Groups — items cliquables */}
                            {grps.map((grp,gi)=>{
                              const gDone=grp.items.filter(x=>x.done).length;
                              const gPct=grp.items.length>0?Math.round(gDone/grp.items.length*100):0;
                              return (
                              <div key={gi} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                <div style={{padding:'10px 16px',background:grp.color+'12',borderBottom:`1px solid ${grp.color}30`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                  <span style={{fontWeight:700,fontSize:'0.82rem',color:grp.color}}>{grp.ic} {grp.titre}</span>
                                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                                    <div style={{width:60,height:5,background:$bgCard,borderRadius:rd>0?3:0,overflow:'hidden'}}>
                                      <div style={{height:'100%',width:gPct+'%',background:grp.color,borderRadius:rd>0?3:0}}/>
                                    </div>
                                    <span style={{fontSize:'0.72rem',fontWeight:700,color:grp.color}}>{gDone}/{grp.items.length}</span>
                                  </div>
                                </div>
                                {grp.items.map((item,ii)=>{
                                  const isSpec = item.types&&item.types.length>0;
                                  const tC = isSpec?(item.types[0]==='Public'?'#3b82f6':item.types[0]==='Particulier'?'#8b5cf6':'#f59e0b'):null;
                                  const tIc = isSpec?(item.types[0]==='Public'?'◆':item.types[0]==='Particulier'?'◉':'▪'):null;
                                  return (
                                  <div key={item.id||ii} onClick={()=>updateChecklistItem(affId,item.id||`prep_${gi}_${ii}`,{done:!item.done},defaultFlat)} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 16px',borderBottom:ii<grp.items.length-1?`1px solid ${$borderLight}`:'none',background:isSpec?tC+'06':'transparent',cursor:'pointer',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=item.done?grp.color+'08':$bgCard} onMouseLeave={e=>e.currentTarget.style.background=isSpec?tC+'06':'transparent'}>
                                    <div style={{width:18,height:18,borderRadius:rd>0?'50%':2,background:item.done?grp.color:'transparent',border:`2px solid ${item.done?grp.color:$border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>
                                      {item.done&&<span style={{color:'white',fontSize:'0.55rem',fontWeight:900}}>✓</span>}
                                    </div>
                                    <span style={{flex:1,fontSize:'0.79rem',color:item.done?$text:$textMut,fontWeight:item.done?600:400,textDecoration:item.done?'line-through none':'none'}}>{item.l}</span>
                                    {item.custom&&<span style={{fontSize:'0.62rem',padding:'1px 6px',borderRadius:rd>0?10:2,background:'#05966918',color:'#059669',fontWeight:700,flexShrink:0}}>✨ Custom</span>}
                                    {isSpec&&<span style={{fontSize:'0.62rem',padding:'1px 7px',borderRadius:rd>0?10:2,background:tC+'18',color:tC,fontWeight:700,border:`1px solid ${tC}30`,whiteSpace:'nowrap',flexShrink:0}}>{tIc} {item.types[0]}</span>}
                                  </div>
                                  );
                                })}
                              </div>
                            );
                            })}
                          </div>
                          );
                        })()}

                        {/* CONSULTATIONS FOURNISSEURS */}                        {/* CONSULTATIONS FOURNISSEURS */}
                        {crmFicheTab==='consultations'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'12px 16px',marginBottom:4}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:6}}>📩 Demandes de prix & Consultations fournisseurs / sous-traitants</div>
                              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                                {[
                                  {l:'Total',v:MOCK_FICHE.consultations.length,c:filColor},
                                  {l:'Retenus',v:MOCK_FICHE.consultations.filter(c=>c.statut==='Retenu'||c.statut==='Signé').length,c:'#059669'},
                                  {l:'En cours',v:MOCK_FICHE.consultations.filter(c=>c.statut==='En cours').length,c:'#d97706'},
                                  {l:'À consulter',v:MOCK_FICHE.consultations.filter(c=>c.statut==='À consulter').length,c:'#e74c3c'},
                                ].map((k,i)=>(
                                  <div key={i} style={{flex:1,minWidth:70,background:$bgCard,borderRadius:rd,border:`1px solid ${$border}`,padding:'8px 10px',textAlign:'center'}}>
                                    <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>{k.l}</div>
                                    <div style={{fontWeight:800,fontSize:'1rem',color:k.c}}>{k.v}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {MOCK_FICHE.consultations.map((c,i)=>(
                              <div key={i} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${c.urgent?'#e74c3c40':$border}`,padding:'13px 14px'}}>
                                <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                                  <div style={{width:36,height:36,borderRadius:rd>0?'50%':4,background:c.statut==='Retenu'||c.statut==='Signé'?'#05966918':c.statut==='En cours'?'#d9770618':'#e74c3c18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{c.ic}</div>
                                  <div style={{flex:1}}>
                                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                                      <span style={{fontWeight:700,fontSize:'0.83rem',color:$text}}>{c.fourniture}</span>
                                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                                        {c.urgent&&<span style={{fontSize:'0.65rem',padding:'2px 7px',borderRadius:rd>0?10:2,background:'#e74c3c15',color:'#e74c3c',fontWeight:700}}>⚡ Urgent</span>}
                                        <span style={{fontSize:'0.7rem',padding:'2px 9px',borderRadius:rd>0?20:2,fontWeight:600,background:c.statut==='Retenu'||c.statut==='Signé'?'#05966915':c.statut==='En cours'?'#d9770615':'#e74c3c15',color:c.statut==='Retenu'||c.statut==='Signé'?'#059669':c.statut==='En cours'?'#d97706':'#e74c3c'}}>{c.statut}</span>
                                      </div>
                                    </div>
                                    <div style={{display:'flex',gap:16,marginBottom:6}}>
                                      <div>
                                        <div style={{fontSize:'0.65rem',color:$textMut,marginBottom:2}}>Entreprises consultées</div>
                                        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                                          {c.fournisseurs.map((f,fi)=>(
                                            <span key={fi} style={{fontSize:'0.68rem',padding:'1px 7px',borderRadius:rd>0?10:2,background:f===c.retenu?filColor+'18':$bgCard,border:`1px solid ${f===c.retenu?filColor:$border}`,color:f===c.retenu?filColor:$textSec,fontWeight:f===c.retenu?700:400}}>{f}{f===c.retenu?' ✓':''}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    {c.prix!=='—'&&<div style={{fontSize:'0.75rem',color:$text,fontWeight:600}}>€ {c.prix}</div>}
                                    {c.statut==='À consulter'&&<div style={{marginTop:6,padding:'5px 10px',background:'#e74c3c08',borderRadius:rd,border:'1px solid #e74c3c25',fontSize:'0.72rem',color:'#e74c3c'}}>Aucune consultation lancée — à faire avant démarrage</div>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* COMMANDES */}
                        {crmFicheTab==='commandes'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>
                            {/* KPI */}
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:4}}>
                              {[
                                {l:'Total commandes',v:MOCK_FICHE.commandes.length+'',c:filColor},
                                {l:'Livrées',v:MOCK_FICHE.commandes.filter(c=>c.statut==='Livré').length+'',c:'#059669'},
                                {l:'En attente',v:MOCK_FICHE.commandes.filter(c=>c.statut!=='Livré').length+'',c:'#d97706'},
                              ].map((k,i)=>(
                                <div key={i} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'10px 12px'}}>
                                  <div style={{fontSize:'0.62rem',color:$textMut,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:3}}>{k.l}</div>
                                  <div style={{fontWeight:800,fontSize:'1.1rem',color:k.c}}>{k.v}</div>
                                </div>
                              ))}
                            </div>
                            {MOCK_FICHE.commandes.map((c,i)=>(
                              <div key={i} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'12px 14px',display:'flex',alignItems:'center',gap:12}}>
                                <div style={{width:36,height:36,borderRadius:rd>0?'50%':4,background:c.statut==='Livré'?'#05966918':c.statut==='En cours'?filColor+'18':'#d9770618',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{c.ic}</div>
                                <div style={{flex:1,minWidth:0}}>
                                  <div style={{fontWeight:600,fontSize:'0.82rem',color:$text}}>{c.n}</div>
                                  <div style={{fontSize:'0.7rem',color:$textMut,marginTop:2}}>{c.fournisseur} · {c.date}</div>
                                </div>
                                <div style={{textAlign:'right',flexShrink:0}}>
                                  <div style={{fontWeight:700,fontSize:'0.8rem',color:$text}}>{c.montant}</div>
                                  <span style={{fontSize:'0.68rem',padding:'2px 8px',borderRadius:rd>0?20:2,background:c.statut==='Livré'?'#05966915':c.statut==='En cours'?filColor+'15':'#d9770615',color:c.statut==='Livré'?'#059669':c.statut==='En cours'?filColor:'#d97706',fontWeight:600}}>{c.statut}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* PLANNING */}
                        {crmFicheTab==='planning'&&(()=>{
                          // Référence: startM=0 → Jan 2023
                          // Timeline: Jan 2023 → Dec 2027 = 60 mois
                          const ORIGIN_YEAR = 2023;
                          const ORIGIN_MONTH = 0; // janvier
                          const TOTAL_MONTHS = 60; // 5 ans
                          const TODAY_M = 24; // simulé: Jan 2025 = mois 24
                          const ROWS = MOCK_FICHE.planning;
                          const wk = ganttZoom; // px par mois
                          const labelW = 168;
                          const rowH = 30;
                          const hdrH = 52; // hauteur header (années + mois)
                          const svgW = labelW + TOTAL_MONTHS * wk;
                          const svgH = hdrH + ROWS.length * rowH + 8;
                          // Catégories pour grouper visuellement
                          const cats = ['Études','Admin','Chantier','GO','SO','Finitions','Réception','Garanties'];
                          const catColors = {Études:'#6366f1',Admin:'#7c3aed',Chantier:'#3b82f6',GO:'#0369a1',SO:'#059669',Finitions:'#ea580c',Réception:'#047857',Garanties:'#334155'};
                          // Années
                          const years = [2023,2024,2025,2026,2027];
                          return (
                          <div style={{display:'flex',flexDirection:'column',gap:12}}>
                            {/* Toolbar */}
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
                              <div>
                                <div style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>◫ Planning général — Jan 2023 → Déc 2027</div>
                                <div style={{fontSize:'0.7rem',color:$textMut,marginTop:2}}>Études · Travaux · Garanties · Décennale</div>
                              </div>
                              <div style={{display:'flex',alignItems:'center',gap:6}}>
                                <span style={{fontSize:'0.7rem',color:$textMut}}>Zoom</span>
                                <button onClick={()=>setGanttZoom(z=>Math.max(14,z-6))} style={{width:26,height:26,borderRadius:rd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontWeight:700,fontSize:'1rem',color:$textSec,fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                                <span style={{fontSize:'0.72rem',fontWeight:600,color:$textSec,minWidth:32,textAlign:'center'}}>{wk}px</span>
                                <button onClick={()=>setGanttZoom(z=>Math.min(90,z+6))} style={{width:26,height:26,borderRadius:rd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontWeight:700,fontSize:'1rem',color:$textSec,fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                                <button onClick={()=>setGanttZoom(28)} style={{padding:'3px 8px',borderRadius:rd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,cursor:'pointer',fontSize:'0.68rem',color:$textMut,fontFamily:'inherit'}}>Reset</button>
                              </div>
                            </div>
                            {/* Légende catégories */}
                            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                              {cats.map(c=>(
                                <span key={c} style={{fontSize:'0.62rem',padding:'2px 7px',borderRadius:rd>0?10:2,background:catColors[c]+'18',color:catColors[c],fontWeight:600,border:`1px solid ${catColors[c]}30`}}>{c}</span>
                              ))}
                            </div>
                            {/* Gantt scrollable */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,overflowX:'auto',overflowY:'visible',position:'relative'}}>
                              <svg width={svgW} height={svgH} style={{display:'block'}}>
                                {/* ===== BACKGROUND ===== */}
                                {/* Colonnes alternées par année */}
                                {years.map((yr,yi)=>(
                                  <rect key={yr} x={labelW+(yi*12)*wk} y={0} width={12*wk} height={svgH} fill={yi%2===0?'transparent':'rgba(0,0,0,0.018)'}/>
                                ))}
                                {/* Grille mois — lignes verticales */}
                                {Array.from({length:TOTAL_MONTHS+1},(_,m)=>(
                                  <line key={m} x1={labelW+m*wk} y1={hdrH-2} x2={labelW+m*wk} y2={svgH} stroke={m%12===0?$border:m%3===0?$borderLight:'transparent'} strokeWidth={m%12===0?1.2:0.6}/>
                                ))}
                                {/* ===== HEADER ===== */}
                                {/* Années */}
                                {years.map((yr,yi)=>{
                                  const x = labelW+(yi*12)*wk;
                                  const w12 = 12*wk;
                                  const isCurrent = yr===2025;
                                  return (
                                  <g key={yr}>
                                    <rect x={x} y={0} width={w12} height={22} fill={isCurrent?filColor+'18':'transparent'}/>
                                    <line x1={x} y1={0} x2={x} y2={22} stroke={$border} strokeWidth={1}/>
                                    <text x={x+w12/2} y={14} fontSize={11} fill={isCurrent?filColor:$textSec} fontWeight="700" textAnchor="middle">{yr}</text>
                                  </g>
                                  );
                                })}
                                {/* Mois — labels courts */}
                                {Array.from({length:TOTAL_MONTHS},(_,m)=>{
                                  const mNames=['J','F','M','A','M','J','J','A','S','O','N','D'];
                                  const mo = (ORIGIN_MONTH+m)%12;
                                  const show = wk>=18 ? true : wk>=10 ? m%3===0 : m%6===0;
                                  if(!show) return null;
                                  return (
                                  <g key={m}>
                                    <rect x={labelW+m*wk} y={22} width={wk} height={hdrH-22} fill={m===TODAY_M?filColor+'10':'transparent'}/>
                                    <text x={labelW+m*wk+wk/2} y={36} fontSize={8} fill={m===TODAY_M?filColor:$textMut} fontWeight={m===TODAY_M?'700':'400'} textAnchor="middle">{mNames[mo]}</text>
                                  </g>
                                  );
                                })}
                                {/* Label col bg — collé à gauche, sticky visuellement */}
                                <rect x={0} y={0} width={labelW} height={svgH} fill={$bgSub}/>
                                <line x1={labelW} y1={0} x2={labelW} y2={svgH} stroke={$border} strokeWidth={1}/>
                                <rect x={0} y={0} width={labelW} height={hdrH} fill={$bgCard}/>
                                <text x={8} y={14} fontSize={9} fill={$textMut} fontWeight="600">TÂCHE</text>
                                <line x1={0} y1={hdrH} x2={svgW} y2={hdrH} stroke={$border} strokeWidth={1}/>
                                {/* ===== TODAY LINE ===== */}
                                <line x1={labelW+TODAY_M*wk} y1={0} x2={labelW+TODAY_M*wk} y2={svgH} stroke={filColor} strokeWidth={2} strokeDasharray="5,3"/>
                                <rect x={labelW+TODAY_M*wk-14} y={hdrH-16} width={28} height={14} rx={3} fill={filColor}/>
                                <text x={labelW+TODAY_M*wk} y={hdrH-6} fontSize={8} fill="#fff" fontWeight="700" textAnchor="middle">Auj.</text>
                                {/* ===== ROWS ===== */}
                                {ROWS.map((p,i)=>{
                                  const y0 = hdrH + i*rowH;
                                  const barX = labelW + p.startM*wk;
                                  const barW2 = p.durM*wk;
                                  const elapsed = Math.max(0, Math.min(TODAY_M - p.startM, p.durM));
                                  const fillW = p.done ? barW2 : elapsed*wk;
                                  const pct = p.done ? 100 : p.durM>0 ? Math.round(elapsed/p.durM*100) : 0;
                                  const isActive = !p.done && TODAY_M>=p.startM && TODAY_M<p.startM+p.durM;
                                  const isFuture = p.startM > TODAY_M;
                                  const catC = catColors[p.cat]||p.color;
                                  return (
                                  <g key={i}>
                                    {/* Row alternating bg */}
                                    <rect x={0} y={y0} width={svgW} height={rowH} fill={i%2===0?'transparent':'rgba(0,0,0,0.014)'}/>
                                    {/* Cat indicator */}
                                    <rect x={0} y={y0+4} width={3} height={rowH-8} rx={1} fill={catC}/>
                                    {/* Label */}
                                    <text x={8} y={y0+rowH/2+4} fontSize={9.5} fill={p.done?$text:isFuture?$textMut:$textSec} fontWeight={isActive?'700':p.done?'500':'400'}>
                                      {p.l.length>20 ? p.l.slice(0,19)+'…' : p.l}
                                    </text>
                                    {/* Track bg */}
                                    <rect x={barX} y={y0+5} width={Math.max(barW2,1)} height={rowH-10} rx={rd>0?3:0} fill={isFuture?'transparent':$bgCard} stroke={p.color} strokeWidth={0.8} strokeOpacity={0.5}/>
                                    {/* Fill */}
                                    {fillW>0&&<rect x={barX} y={y0+5} width={fillW} height={rowH-10} rx={rd>0?3:0} fill={p.color+(p.done?'ee':isActive?'bb':'77')}/>}
                                    {/* Stripe pattern for future */}
                                    {isFuture&&barW2>4&&<rect x={barX} y={y0+5} width={barW2} height={rowH-10} rx={rd>0?3:0} fill={`url(#stripe_${i})`} stroke={p.color} strokeWidth={0.8} strokeOpacity={0.4}/>}
                                    {isFuture&&<defs><pattern id={`stripe_${i}`} patternUnits="userSpaceOnUse" width={6} height={6} patternTransform="rotate(45)"><rect width={3} height={6} fill={p.color+'18'}/></pattern></defs>}
                                    {/* Label inside bar */}
                                    {barW2>wk*1.2&&<text x={barX+5} y={y0+rowH/2+4} fontSize={8} fill={fillW>16&&!isFuture?'#fff':p.color} fontWeight="600">
                                      {p.done?'✓':isActive?pct+'%':p.durM+'m'}
                                    </text>}
                                    {/* Active pulse dot */}
                                    {isActive&&<circle cx={labelW+TODAY_M*wk} cy={y0+rowH/2} r={3} fill={filColor} opacity={0.8}/>}
                                  </g>
                                  );
                                })}
                              </svg>
                            </div>
                            {/* Jalons clés */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:10}}>🚩 Jalons clés</div>
                              {[
                                {l:'Ordre de Service',date:'Jan 2024',done:true},
                                {l:'Démarrage travaux',date:'Fév 2024',done:true},
                                {l:"Mise hors d'eau",date:'Nov 2024',done:ph.id>=3},
                                {l:"Mise hors d'air",date:'Jan 2025',done:ph.id>=3},
                                {l:'OPR / Réception',date:'Sep 2025',done:ph.id>=5},
                                {l:'Fin levée des réserves',date:'Nov 2025',done:ph.id>=5},
                                {l:'Libération RG (1 an)',date:'Sep 2026',done:ph.id>=6},
                                {l:'Fin biennale',date:'Sep 2027',done:ph.id>=7},
                                {l:'Fin décennale',date:'Sep 2035',done:ph.id>=7},
                              ].map((j,i,arr)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:i<arr.length-1?`1px solid ${$borderLight}`:'none'}}>
                                  <div style={{width:18,height:18,borderRadius:'50%',background:j.done?'#059669':'transparent',border:`2px solid ${j.done?'#059669':$border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                                    {j.done&&<span style={{color:'white',fontSize:'0.5rem',fontWeight:700}}>✓</span>}
                                  </div>
                                  <span style={{flex:1,fontSize:'0.79rem',color:j.done?$text:$textMut,fontWeight:j.done?500:400}}>{j.l}</span>
                                  <span style={{fontSize:'0.7rem',color:$textMut,fontFamily:'monospace'}}>{j.date}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          );
                        })()}

                                                {/* DOCUMENTS */}
                        {crmFicheTab==='documents'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:12}}>
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'12px 16px',display:'flex',alignItems:'center',gap:10}}>
                              <span style={{fontSize:'1.2rem'}}>📂</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:600,fontSize:'0.82rem',color:$text}}>Dossier Google Drive</div>
                                <div style={{fontSize:'0.7rem',color:$textMut}}>Chantier {aff.cd||aff.id} — {aff.n}</div>
                              </div>
                              <button style={{padding:'5px 12px',borderRadius:rd,border:`1px solid ${$border}`,background:$bgCard,color:$accent,fontSize:'0.75rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Ouvrir ↗</button>
                            </div>
                            {MOCK_FICHE.docs.map((d,i)=>(
                              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`}}>
                                <span style={{fontSize:'0.9rem'}}>{d.type==='PDF'?'▫':'◺'}</span>
                                <div style={{flex:1}}>
                                  <div style={{fontWeight:600,fontSize:'0.8rem',color:$text}}>{d.n}</div>
                                  <div style={{fontSize:'0.68rem',color:$textMut}}>{d.type} · {d.date}</div>
                                </div>
                                <button style={{padding:'3px 10px',borderRadius:rd>0?20:2,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontSize:'0.72rem',cursor:'pointer',fontFamily:'inherit'}}>↓</button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* LITIGES */}
                        {crmFicheTab==='litiges'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:14}}>
                            <div style={{background:'#e74c3c08',borderRadius:rd,border:'1px solid #e74c3c30',padding:'14px 16px'}}>
                              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                                <span style={{fontSize:'1.1rem'}}>⚖️</span>
                                <span style={{fontWeight:700,fontSize:'0.85rem',color:'#e74c3c'}}>Litige signalé</span>
                                <span style={{marginLeft:'auto',padding:'2px 10px',borderRadius:rd>0?20:2,background:'#d9770620',color:'#d97706',fontSize:'0.72rem',fontWeight:700}}>En analyse</span>
                              </div>
                              <div style={{fontSize:'0.8rem',color:$text,lineHeight:1.5}}>{MOCK_FICHE.litigeDesc}</div>
                            </div>
                            {/* Statuts litige */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>Progression du litige</div>
                              {['Détecté','En analyse','Négociation','Contentieux','Clos'].map((s,i)=>{
                                const active = i<=1;
                                return (
                                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:i<4?`1px solid ${$borderLight}`:'none'}}>
                                    <div style={{width:20,height:20,borderRadius:'50%',background:active?'#e74c3c':'transparent',border:`2px solid ${active?'#e74c3c':$border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                                      {active&&<span style={{color:'white',fontSize:'0.6rem',fontWeight:700}}>✓</span>}
                                    </div>
                                    <span style={{fontSize:'0.78rem',fontWeight:active?700:400,color:active?$text:$textMut}}>{s}</span>
                                    {i===1&&<span style={{marginLeft:'auto',fontSize:'0.68rem',color:'#d97706',fontWeight:600}}>← En cours</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* AVANCEMENT */}
                        {crmFicheTab==='avancement'&&(()=>{
                          const mk = aff.mk||aff.marche||'Privé';
                          const mkC = mk==='Public'?'#3b82f6':mk==='Particulier'?'#8b5cf6':'#f59e0b';
                          const mkIc = mk==='Public'?'◆':mk==='Particulier'?'◉':'▪';
                          const affId = (aff.cd||aff.id)+'_ava';
                          const defaultFlat = MOCK_FICHE.avancement.flatMap((grp,gi)=>
                            grp.items.map((item,ii)=>({...item, id:`ava_${gi}_${ii}`, grpLabel:grp.grp}))
                          );
                          const grpColors = {'☰ Contractuel':'#6366f1','✱ Préparation':'#d97706','◆ Exécution':'#3b82f6','✓ Réception & Clôture':'#059669'};
                          const allItems = getChecklistData(affId, defaultFlat).filter(x=>!x.hidden);
                          const done = allItems.filter(x=>x.done).length;
                          const total = allItems.length;
                          const pct = total>0?Math.round(done/total*100):0;
                          const grpMap = {};
                          allItems.forEach(item=>{
                            const k = item.grpLabel||'Autres';
                            if(!grpMap[k]) grpMap[k]={grp:k,color:grpColors[k]||'#64748b',items:[]};
                            grpMap[k].items.push(item);
                          });
                          const grps = Object.values(grpMap);
                          const isEditOpen = checklistEditOpen && checklistEditTab==='avancement';
                          return (
                          <div style={{display:'flex',flexDirection:'column',gap:14}}>
                            {/* Type banner + editeur */}
                            <div style={{padding:'10px 14px',background:mkC+'10',borderRadius:rd,border:`1px solid ${mkC}30`,display:'flex',alignItems:'center',gap:10}}>
                              <span style={{fontSize:'1.1rem'}}>{mkIc}</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:700,fontSize:'0.82rem',color:mkC}}>Jalons {mk}</div>
                                <div style={{fontSize:'0.71rem',color:$textMut,marginTop:1}}>
                                  {done}/{total} jalons
                                  {mk==='Public'?' — DGD · DOE · PV hebdo MOE · RG 1 an':''}
                                  {mk==='Privé'?' — Situations mensuelles · DGD si prévu':''}
                                  {mk==='Particulier'?' — Acompte · Appels de fonds · PV simplifié':''}
                                </div>
                              </div>
                              <div style={{display:'flex',alignItems:'center',gap:6}}>
                                <span style={{fontSize:'0.75rem',padding:'3px 10px',borderRadius:rd>0?20:2,background:mkC+'20',color:mkC,fontWeight:700,border:`1px solid ${mkC}40`,whiteSpace:'nowrap'}}>{pct}%</span>
                                <button onClick={()=>{setChecklistEditOpen(v=>!v);setChecklistEditTab('avancement');}} style={{padding:'4px 10px',borderRadius:rd>0?8:2,border:`1px solid ${isEditOpen?filColor:$border}`,background:isEditOpen?filColor+'15':$bgCard,color:isEditOpen?filColor:$textMut,fontSize:'0.7rem',cursor:'pointer',fontFamily:'inherit',fontWeight:600,whiteSpace:'nowrap'}}>
                                  ✎ {isEditOpen?'Fermer':'Gérer'}
                                </button>
                              </div>
                            </div>
                            {/* Editeur */}
                            {isEditOpen&&(()=>{
                              const allFlat = getChecklistData(affId, defaultFlat);
                              return (
                              <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${filColor}40`,overflow:'hidden'}}>
                                <div style={{padding:'10px 14px',background:filColor+'12',borderBottom:`1px solid ${filColor}25`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                  <span style={{fontWeight:700,fontSize:'0.8rem',color:filColor}}>✎ Éditeur — Jalons Avancement</span>
                                  <span style={{fontSize:'0.7rem',color:$textMut}}>{allFlat.length} jalons</span>
                                </div>
                                <div style={{maxHeight:320,overflowY:'auto'}}>
                                  {allFlat.map((item,idx)=>{
                                    const isSpec=item.types&&item.types.length>0;
                                    const tC=isSpec?(item.types[0]==='Public'?'#3b82f6':item.types[0]==='Particulier'?'#8b5cf6':'#f59e0b'):null;
                                    const gC=grpColors[item.grpLabel]||'#64748b';
                                    return (
                                    <div key={item.id} draggable onDragStart={()=>setClDragId(item.id)} onDragOver={e=>{e.preventDefault();setClDragOver(item.id);}} onDragEnd={()=>{if(clDragOver&&clDragOver!==item.id){reorderChecklistItem(affId,clDragId,clDragOver,defaultFlat);}setClDragId(null);setClDragOver(null);}} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',borderBottom:`1px solid ${$borderLight}`,opacity:item.hidden?0.5:1,background:clDragOver===item.id&&clDragId!==item.id?$accent+'12':item.hidden?'#e74c3c06':'transparent',cursor:'grab',transition:'background 0.12s'}}>
                                      <span style={{color:$textMut,fontSize:'1rem',flexShrink:0,userSelect:'none'}} title="Glisser pour réordonner">⠿</span>
                                      <button onClick={e=>{e.stopPropagation();updateChecklistItem(affId,item.id,{hidden:!item.hidden},defaultFlat);}} style={{width:22,height:22,borderRadius:rd>0?'50%':2,border:`1px solid ${item.hidden?'#e74c3c':$border}`,background:item.hidden?'#e74c3c15':'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem'}}>
                                        {item.hidden?'🚫':'👁️'}
                                      </button>
                                      <span style={{width:6,height:6,borderRadius:'50%',background:gC,flexShrink:0}}/>
                                      <span style={{flex:1,fontSize:'0.75rem',color:item.hidden?$textMut:$text,textDecoration:item.hidden?'line-through':'none'}}>{item.l}</span>
                                      {isSpec&&<span style={{fontSize:'0.6rem',padding:'1px 5px',borderRadius:rd>0?8:2,background:tC+'18',color:tC,fontWeight:700}}>{item.types[0]}</span>}
                                      {item.custom&&<span style={{fontSize:'0.6rem',padding:'1px 5px',borderRadius:rd>0?8:2,background:'#05966918',color:'#059669',fontWeight:700}}>Custom</span>}
                                      {item.custom&&<button onClick={e=>{e.stopPropagation();removeChecklistItem(affId,item.id,defaultFlat);}} style={{width:20,height:20,borderRadius:rd>0?'50%':2,border:'1px solid #e74c3c40',background:'#e74c3c12',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem',color:'#e74c3c'}}>✕</button>}
                                    </div>
                                    );
                                  })}
                                </div>
                                <div style={{padding:'10px 12px',borderTop:`1px solid ${$border}`,display:'flex',gap:8}}>
                                  <input value={newItemText} onChange={e=>setNewItemText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newItemText.trim()){addChecklistItem(affId,newItemText,'Personnalisé',defaultFlat);setNewItemText('');}}} placeholder="+ Ajouter un jalon personnalisé..." style={{flex:1,padding:'6px 10px',borderRadius:rd>0?6:2,border:`1px solid ${$border}`,background:$bgCard,color:$text,fontSize:'0.75rem',fontFamily:'inherit',outline:'none'}}/>
                                  <button onClick={()=>{if(newItemText.trim()){addChecklistItem(affId,newItemText,'Personnalisé',defaultFlat);setNewItemText('');}}} style={{padding:'6px 12px',borderRadius:rd>0?6:2,border:'none',background:filColor,color:'white',fontSize:'0.75rem',cursor:'pointer',fontFamily:'inherit',fontWeight:700}}>Ajouter</button>
                                </div>
                              </div>
                              );
                            })()}
                            {/* Phase bar */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'12px 16px'}}>
                              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                                <div style={{display:'flex',alignItems:'center',gap:8}}>
                                  <span style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>Phase actuelle</span>
                                  <span style={{padding:'3px 10px',borderRadius:rd>0?20:2,background:ph.color+'18',color:ph.color,fontWeight:700,fontSize:'0.75rem'}}>{ph.icon} {ph.label}</span>
                                </div>
                                <span style={{fontWeight:700,fontSize:'0.82rem',color:pct===100?'#059669':pct>60?'#d97706':'#e74c3c'}}>{done}/{total}</span>
                              </div>
                              <div style={{display:'flex',gap:3,marginBottom:10}}>
                                {PHASES.filter(p=>p.id<=6).map(p=>(
                                  <div key={p.id} style={{flex:1,height:6,borderRadius:rd>0?3:0,background:p.id<ph.id?p.color:p.id===ph.id?p.color+'80':$bgCard,border:`1px solid ${p.id<=ph.id?p.color:$border}`,transition:'all 0.3s'}} title={p.label}/>
                                ))}
                              </div>
                              <div style={{height:6,background:$bgCard,borderRadius:rd>0?3:0,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                <div style={{height:'100%',width:pct+'%',background:pct===100?'#059669':pct>60?'#d97706':'#3b82f6',borderRadius:rd>0?3:0,transition:'width 0.5s'}}/>
                              </div>
                            </div>
                            {/* Groupes cliquables */}
                            {grps.map((grp,gi)=>{
                              const gDone=grp.items.filter(x=>x.done).length;
                              const gPct=grp.items.length>0?Math.round(gDone/grp.items.length*100):0;
                              return (
                              <div key={gi} style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                                <div style={{padding:'9px 14px',background:grp.color+'10',borderBottom:`1px solid ${grp.color}25`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                  <span style={{fontWeight:700,fontSize:'0.8rem',color:grp.color}}>{grp.grp}</span>
                                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                                    <div style={{width:50,height:4,background:$bgCard,borderRadius:rd>0?2:0,overflow:'hidden'}}>
                                      <div style={{height:'100%',width:gPct+'%',background:grp.color}}/>
                                    </div>
                                    <span style={{fontSize:'0.7rem',fontWeight:700,color:grp.color}}>{gDone}/{grp.items.length}</span>
                                  </div>
                                </div>
                                {grp.items.map((item,ii)=>{
                                  const isSpec=item.types&&item.types.length>0;
                                  const tC=isSpec?(item.types[0]==='Public'?'#3b82f6':item.types[0]==='Particulier'?'#8b5cf6':'#f59e0b'):null;
                                  const tIc=isSpec?(item.types[0]==='Public'?'◆':item.types[0]==='Particulier'?'◉':'▪'):null;
                                  return (
                                  <div key={item.id||ii} onClick={()=>updateChecklistItem(affId,item.id||`ava_${gi}_${ii}`,{done:!item.done},defaultFlat)} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 14px',borderBottom:ii<grp.items.length-1?`1px solid ${$borderLight}`:'none',cursor:'pointer',background:'transparent'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCard} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                    <div style={{width:18,height:18,borderRadius:rd>0?'50%':2,background:item.done?grp.color:'transparent',border:`2px solid ${item.done?grp.color:$border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>
                                      {item.done&&<span style={{color:'white',fontSize:'0.55rem',fontWeight:700}}>✓</span>}
                                    </div>
                                    <span style={{flex:1,fontSize:'0.79rem',color:item.done?$text:$textMut,fontWeight:item.done?500:400}}>{item.l}</span>
                                    {item.custom&&<span style={{fontSize:'0.62rem',padding:'1px 6px',borderRadius:rd>0?10:2,background:'#05966918',color:'#059669',fontWeight:700,flexShrink:0}}>✨</span>}
                                    {isSpec&&<span style={{fontSize:'0.62rem',padding:'1px 7px',borderRadius:rd>0?10:2,background:tC+'18',color:tC,fontWeight:700,border:`1px solid ${tC}30`,whiteSpace:'nowrap',flexShrink:0}}>{tIc} {item.types[0]}</span>}
                                  </div>
                                  );
                                })}
                              </div>
                            );
                            })}
                            {/* Garanties */}
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,padding:'14px 16px'}}>
                              <div style={{fontWeight:700,fontSize:'0.82rem',color:$text,marginBottom:12}}>🛡️ Garanties légales</div>
                              {MOCK_FICHE.garanties.map((g,i)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<MOCK_FICHE.garanties.length-1?`1px solid ${$borderLight}`:'none'}}>
                                  <div style={{width:10,height:10,borderRadius:'50%',background:g.active?'#059669':$border,flexShrink:0}}/>
                                  <div style={{flex:1}}>
                                    <span style={{fontSize:'0.8rem',fontWeight:600,color:g.active?$text:$textMut}}>{g.l}</span>
                                    <span style={{fontSize:'0.72rem',color:$textMut,marginLeft:8}}>{g.dur}</span>
                                  </div>
                                  <span style={{fontSize:'0.72rem',color:g.active?$textSec:$textMut,fontWeight:g.active?600:400}}>→ {g.fin}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          );
                        })()}

                        {/* ACTIVITÉS */}
                        {crmFicheTab==='activites'&&(
                          <div style={{display:'flex',flexDirection:'column',gap:0}}>
                            <div style={{background:$bgSub,borderRadius:rd,border:`1px solid ${$border}`,overflow:'hidden'}}>
                              {MOCK_FICHE.activites.map((a,i)=>(
                                <div key={i} style={{display:'flex',gap:12,padding:'12px 16px',borderBottom:i<MOCK_FICHE.activites.length-1?`1px solid ${$borderLight}`:'none',alignItems:'flex-start'}}>
                                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,flexShrink:0}}>
                                    <div style={{width:32,height:32,borderRadius:'50%',background:filColor+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem'}}>
                                      {a.type==='Réunion'?'🤝':a.type==='Email'?'✉️':'💳'}
                                    </div>
                                  </div>
                                  <div style={{flex:1}}>
                                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                                      <span style={{fontSize:'0.72rem',fontWeight:700,color:$accent}}>{a.type}</span>
                                      <span style={{fontSize:'0.68rem',color:$textMut}}>{a.date}</span>
                                    </div>
                                    <div style={{fontSize:'0.8rem',color:$text,lineHeight:1.4}}>{a.txt}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          );
}
