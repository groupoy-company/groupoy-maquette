// === Onglet « parc_automobile » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabParcAutomobile(__props) {
  const { $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FILIALE_FILTER_OPTIONS, autoColWidths, autoData, autoDetail, autoEdit, autoEtatLieux, autoFilialeFilter, autoFilter, autoFilterOpen, autoStatutFilter, autoTab, autoTabsRef, autoViewMode, autoVisibleCols, crmRd, ctStatut, empNom, employes, filialeFilter, filialesDynamiques, navEntreprise, setAutoColWidths, setAutoData, setAutoDetail, setAutoEdit, setAutoEtatLieux, setAutoFilialeFilter, setAutoFilter, setAutoFilterOpen, setAutoStatutFilter, setAutoTab, setAutoViewMode, setAutoVisibleCols, showBorderAccent } = __props;
        const saveAuto = d => { setAutoData(d); localStorage.setItem('ruches_auto_data', JSON.stringify(d)); };
        const AUTO_TYPES = [{id:'vp',label:'VP',color:'#ef4444'},{id:'vu',label:'VU',color:'#f59e0b'},{id:'vu_cg',label:'VU-CG',color:'#f97316'},{id:'pl',label:'PL',color:$text}];
        const ENERGIES = [{id:'diesel',label:'Diesel',color:'#ca8a04'},{id:'essence',label:'Essence',color:'#16a34a'},{id:'hybride',label:'Hybride',color:'#db2777'},{id:'electrique',label:'Électrique',color:'#2563eb'},{id:'gpl',label:'GPL',color:'#0891b2'}];
        const BOITES = [{id:'automatique',label:'Auto',color:'#ea580c'},{id:'manuelle',label:'Manuelle',color:'#16a34a'}];
        const STATUT_ADMIN = [{id:'a_commander',label:'À Commander',color:'#ea580c'},{id:'commande',label:'Commandé',color:'#65a30d'},{id:'actif',label:'Actif',color:'#16a34a'},{id:'restitue',label:'Restitué',color:$textSec},{id:'perte_totale',label:'Perte totale',color:'#dc2626'},{id:'cede_vendu',label:'Cédé / Vendu',color:'#7c3aed'},{id:'hors_service',label:'Hors service',color:'#57534e'},{id:'vole',label:'Volé',color:'#be123c'}];
        const STATUT_USAGE = [{id:'disponible',label:'Disponible',color:'#ca8a04'},{id:'affecte_conducteur',label:'Affecté',color:'#16a34a'},{id:'mise_a_disposition',label:'Mise à dispo.',color:'#65a30d'},{id:'reserve',label:'Réservé',color:$textSec},{id:'en_maintenance',label:'Maintenance',color:'#ea580c'},{id:'en_reconditionnement',label:'Recondition.',color:'#9333ea'},{id:'hors_service_temp',label:'H.S. temp.',color:'#dc2626'}];
        const ENTITES = [{id:'group_oy',label:'GROUP OY',color:'#1e40af'},{id:'ezel',label:'EZEL',color:'#047857'},{id:'leaseplan',label:'LEASEPLAN',color:'#c2410c'},{id:'cic',label:'CIC',color:'#0e7490'},{id:'france_cars',label:'FRANCE CARS',color:$text},{id:'loxam',label:'LOXAM',color:'#b91c1c'},{id:'sogelease',label:'SOGELEASE',color:'#0f766e'},{id:'e_entreprise',label:'E-ENTREPRISE',color:'#b45309'}];
        const TYPE_ACQUIS = [{id:'achat',label:'Achat',color:'#16a34a'},{id:'leasing_lld',label:'LLD',color:'#2563eb'},{id:'leasing_loa',label:'LOA',color:'#7c3aed'},{id:'location_simple',label:'Location',color:'#ea580c'}];
        const CT_STATUTS = [{id:'valide',label:'Valide',color:'#16a34a'},{id:'non_valide',label:'Non Valide',color:'#dc2626'},{id:'a_faire',label:'À Faire',color:'#ea580c'},{id:'a_reviser',label:'À Réviser',color:'#ca8a04'}];
        const INTERV_TYPES = [{id:'mise_a_disposition',label:'Mise à disposition',color:'#65a30d',cat:'affectation'},{id:'restitution',label:'Restitution',color:'#0e7490',cat:'affectation'},{id:'pret_vehicule',label:'Prêt véhicule',color:'#0891b2',cat:'affectation'},{id:'entretien',label:'Entretien',color:'#16a34a',cat:'technique'},{id:'revision',label:'Révision',color:'#059669',cat:'technique'},{id:'reparation',label:'Réparation',color:'#ea580c',cat:'technique'},{id:'carrosserie',label:'Carrosserie',color:'#c2410c',cat:'technique'},{id:'pneumatiques',label:'Pneumatiques',color:'#4f46e5',cat:'technique'},{id:'controle_technique',label:'CT',color:'#0284c7',cat:'technique'},{id:'nettoyage',label:'Nettoyage',color:'#0d9488',cat:'technique'},{id:'contravention',label:'Contravention',color:'#dc2626',cat:'administratif'},{id:'assurance_interv',label:'Assurance',color:'#ea580c',cat:'administratif'},{id:'sinistre',label:'Sinistre',color:'#be123c',cat:'sinistre'}];
        const SINISTRE_TYPES = [{id:'accrochage',label:'Accrochage'},{id:'bris_glace',label:'Bris de glace'},{id:'vol',label:'Vol'},{id:'vandalisme',label:'Vandalisme'},{id:'degat_naturel',label:'Dégât naturel'},{id:'incendie',label:'Incendie'}];
        const SINISTRE_RESP = [{id:'tort_100',label:'100% tort',color:'#dc2626'},{id:'tort_50',label:'50/50',color:'#ea580c'},{id:'non_responsable',label:'Non resp.',color:'#16a34a'}];
        const EDL_ZONES = ['Avant','Arrière','Côté gauche','Côté droit','Toit / Capot','Pare-brise','Tableau de bord','Sièges','Coffre','Roues / Pneus'];
        const EDL_ETATS = [{id:'bon',label:'Bon',color:'#16a34a'},{id:'usage',label:'Usagé',color:'#ea580c'},{id:'degrade',label:'Dégradé',color:'#c2410c'},{id:'casse',label:'Cassé',color:'#dc2626'}];

        /* ── 41 VEHICLES ── */
        const sampleAuto = [
          {id:'VH-004',marque:'BMW',modele:'Serie 1',immat:'GJ-110-ER',nVehicule:4,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'Noir',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP015',filialeId:1,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2022-08-31',dateFinContrat:'2025-09-12',dateMEC:'2022-08-31',carteCarburant:'0404',km:61515,loyer:617.02,aen:183.27,ctStatut:'valide',ctDateProchain:'2026-08-31',assureur:'MAIF',notes:'Diane (La Roulotte)'},
          {id:'VH-006',marque:'BMW',modele:'Serie 1',immat:'GK-230-GZ',nVehicule:6,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'Noir',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP001',filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2022-10-28',dateFinContrat:'2025-11-22',dateMEC:'2022-10-28',carteCarburant:'0131-EZEL 1',km:34653,loyer:613.52,aen:183.27,ctStatut:'valide',ctDateProchain:'2026-10-28',assureur:'MAIF',notes:''},
          {id:'VH-019',marque:'BMW',modele:'X4 XDRIVE 2.0D',immat:'EH057XL',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'perte_totale',statutUsage:'hors_service_temp',conducteurId:null,filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/120',dateDebutContrat:'2020-01-31',dateFinContrat:null,dateMEC:'2017-01-31',carteCarburant:'',km:0,loyer:0,aen:183.27,ctStatut:'non_valide',ctDateProchain:null,assureur:'',notes:'Perte totale'},
          {id:'VH-001',marque:'Renault',modele:'Kangoo',immat:'',nVehicule:1,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Bleu Ciel',statutAdmin:'actif',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'ezel',typeAcquisition:'achat',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-005',marque:'Mercedes',modele:'Viano',immat:'GJ-847-XV',nVehicule:5,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'Noir',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP001',filialeId:3,entiteDetentrice:'group_oy',typeAcquisition:'achat',contrat:'',dateDebutContrat:'2022-10-07',dateFinContrat:null,dateMEC:'2020-10-26',carteCarburant:'',km:20000,loyer:0,aen:690,ctStatut:'valide',ctDateProchain:'2026-10-26',assureur:'Allianz',notes:''},
          {id:'VH-015',marque:'Peugeot',modele:'208',immat:'GR-148-HG',nVehicule:15,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP017',filialeId:2,entiteDetentrice:'cic',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-09-20',dateFinContrat:'2026-09-20',dateMEC:'2023-09-20',carteCarburant:'',km:56160,loyer:0,aen:0,ctStatut:'valide',ctDateProchain:'2026-09-20',assureur:'MAIF',notes:'Predrag JOVANOVIC'},
          {id:'VH-013',marque:'Peugeot',modele:'3008',immat:'GR-224-HG',nVehicule:13,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'Noir',statutAdmin:'actif',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'cic',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-09-20',dateFinContrat:'2026-10-20',dateMEC:'2023-09-20',carteCarburant:'',km:58069,loyer:900,aen:270,ctStatut:'valide',ctDateProchain:'2027-09-20',assureur:'MAIF',notes:''},
          {id:'VH-014',marque:'Peugeot',modele:'3008',immat:'GR-345-HG',nVehicule:14,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'Gris Anthracite',statutAdmin:'actif',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'cic',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-09-20',dateFinContrat:'2026-10-20',dateMEC:'2023-09-20',carteCarburant:'1006',km:55162,loyer:641.11,aen:255,ctStatut:'valide',ctDateProchain:'2027-09-20',assureur:'MAIF',notes:''},
          {id:'VH-009',marque:'Peugeot',modele:'308',immat:'GN-030-PQ',nVehicule:9,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP009',filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'',dateDebutContrat:'2023-04-26',dateFinContrat:'2026-06-22',dateMEC:'2023-04-26',carteCarburant:'EZEL 020',km:74100,loyer:647.18,aen:0,ctStatut:'valide',ctDateProchain:'2027-04-26',assureur:'MAIF',notes:'Sophie DOS SANTOS'},
          {id:'VH-007',marque:'Peugeot',modele:'308',immat:'GN-409-JY',nVehicule:7,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP018',filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'',dateDebutContrat:'2023-04-17',dateFinContrat:'2026-06-14',dateMEC:'2023-04-17',carteCarburant:'EZEL 02',km:48652,loyer:647.18,aen:0,ctStatut:'valide',ctDateProchain:'2027-04-17',assureur:'MAIF',notes:'Ali AZIYANE'},
          {id:'VH-010',marque:'Peugeot',modele:'308',immat:'GN-433-QP',nVehicule:10,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'mise_a_disposition',conducteurId:'EMP005',filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'',dateDebutContrat:'2023-04-27',dateFinContrat:'2026-06-12',dateMEC:'2023-04-27',carteCarburant:'',km:64758,loyer:647.18,aen:0,ctStatut:'valide',ctDateProchain:'2027-04-27',assureur:'MAIF',notes:'Prêté à Pierre SEMERCI (pas son véhicule attitré)'},
          {id:'VH-008',marque:'Peugeot',modele:'308',immat:'GN-482-KF',nVehicule:8,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP006',filialeId:2,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'',dateDebutContrat:'2023-04-18',dateFinContrat:'2026-05-10',dateMEC:'2023-04-18',carteCarburant:'1123',km:75061,loyer:647.18,aen:0,ctStatut:'valide',ctDateProchain:'2027-04-18',assureur:'MAIF',notes:'Loetitia LEQUERREC'},
          {id:'VH-016',marque:'Peugeot',modele:'408 Hybride',immat:'GR-278-HG',nVehicule:16,typeVehicule:'vp',energie:'hybride',boite:'automatique',couleur:'',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP002',filialeId:3,entiteDetentrice:'cic',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-09-20',dateFinContrat:'2026-10-20',dateMEC:'2023-09-20',carteCarburant:'',km:30812,loyer:793.94,aen:0,ctStatut:'valide',ctDateProchain:'2027-09-20',assureur:'MAIF',notes:'Ozlem YILMAZ. Hybride.'},
          {id:'VH-033',marque:'Renault',modele:'Clio',immat:'DE-189-JK',nVehicule:null,typeVehicule:'vu_cg',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'hors_service',statutUsage:'hors_service_temp',conducteurId:null,filialeId:3,entiteDetentrice:'ezel',typeAcquisition:'achat',contrat:'',dateDebutContrat:'2018-08-08',dateFinContrat:null,dateMEC:'2014-03-27',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'non_valide',ctDateProchain:null,assureur:'',notes:'Casse'},
          {id:'VH-017',marque:'Renault',modele:'Clio',immat:'EV-112-HH',nVehicule:17,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Blanc',statutAdmin:'actif',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'ezel',typeAcquisition:'achat',contrat:'',dateDebutContrat:'2024-07-01',dateFinContrat:null,dateMEC:'2018-02-27',carteCarburant:'0028-6',km:80000,loyer:0,aen:0,ctStatut:'valide',ctDateProchain:'2026-02-27',assureur:'MAIF',notes:''},
          {id:'VH-011',marque:'Renault',modele:'Express Van Blue DCI 95',immat:'GQ-180-DC',nVehicule:11,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Blanc',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP010',filialeId:3,entiteDetentrice:'sogelease',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-07-10',dateFinContrat:'2028-07-25',dateMEC:'2023-07-10',carteCarburant:'EZEL 07',km:28879,loyer:0,aen:0,ctStatut:'valide',ctDateProchain:'2027-07-10',assureur:'MAIF',notes:'Vitor DA SILVA'},
          {id:'VH-018',marque:'Renault',modele:'Kangoo Express DCI 90',immat:'FC-696-GK',nVehicule:18,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Blanc',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP019',filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2018-12-04',dateFinContrat:'2023-07-17',dateMEC:'2018-12-04',carteCarburant:'0909',km:109048,loyer:304.37,aen:0,ctStatut:'a_reviser',ctDateProchain:'2026-06-04',assureur:'MAIF',notes:'M.T. BEGU'},
          {id:'VH-002',marque:'Renault',modele:'Kangoo Express DCI 90',immat:'FC-970-GK',nVehicule:2,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Blanc',statutAdmin:'actif',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2018-12-04',dateFinContrat:'2023-05-17',dateMEC:'2018-12-04',carteCarburant:'1402',km:124702,loyer:310.77,aen:0,ctStatut:'valide',ctDateProchain:'2026-12-04',assureur:'MAIF',notes:''},
          {id:'VH-012',marque:'Renault',modele:'Kangoo Van',immat:'GP-238-WW',nVehicule:12,typeVehicule:'vu',energie:'diesel',boite:'automatique',couleur:'Blanc',statutAdmin:'actif',statutUsage:'affecte_conducteur',conducteurId:'EMP005',filialeId:3,entiteDetentrice:'sogelease',typeAcquisition:'leasing_loa',contrat:'',dateDebutContrat:'2023-08-04',dateFinContrat:'2028-07-25',dateMEC:'2023-06-28',carteCarburant:'',km:59138,loyer:0,aen:0,ctStatut:'valide',ctDateProchain:'2027-06-28',assureur:'MAIF',notes:'Pierre SEMERCI'},
          {id:'VH-003',marque:'Renault',modele:'Master F3SL2 DCI130',immat:'FE-337-NE',nVehicule:11,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'Blanc',statutAdmin:'actif',statutUsage:'en_maintenance',conducteurId:null,filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2019-03-13',dateFinContrat:'2023-07-02',dateMEC:'2019-03-13',carteCarburant:'EZEL 022',km:106222,loyer:451.23,aen:0,ctStatut:'non_valide',ctDateProchain:'2026-03-13',assureur:'MAIF',notes:'CT non valide'},
          {id:'VH-039',marque:'Renault',modele:'Megane III',immat:'CB-659-JF',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'cede_vendu',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'ezel',typeAcquisition:'achat',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:'Cédé'},
          {id:'VH-020',marque:'Renault',modele:'Clio Société',immat:'FD-366-RV',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'2022-08-02',carteCarburant:'',km:100000,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-021',marque:'Ford',modele:'Kuga SUV BVA',immat:'FY-871-NW',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2023-02-23',dateFinContrat:'2022-10-04',dateMEC:'2023-02-23',carteCarburant:'1907-EZEL 03',km:44805,loyer:825.20,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-022',marque:'Iveco',modele:'Daily',immat:'FG-743-LY',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:1,entiteDetentrice:'loxam',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'1501',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-023',marque:'Iveco',modele:'Daily (2)',immat:'',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:1,entiteDetentrice:'loxam',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-024',marque:'Kia',modele:'S Tonic',immat:'GJ-705-JC',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-20',dateFinContrat:null,dateMEC:'',carteCarburant:'1303',km:60,loyer:919,aen:275.7,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-025',marque:'Kia',modele:'S Tonic',immat:'GJ-713-JC',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-21',dateFinContrat:null,dateMEC:'',carteCarburant:'1204',km:60,loyer:919,aen:275.7,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-026',marque:'Mercedes',modele:'Camion Benne',immat:'',nVehicule:null,typeVehicule:'pl',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:1,entiteDetentrice:'loxam',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-01-01',dateFinContrat:null,dateMEC:'2022-01-01',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-027',marque:'Opel',modele:'Antara',immat:'GN-156-TN',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2023-10-02',dateFinContrat:'2022-10-26',dateMEC:'2023-10-02',carteCarburant:'0808',km:62,loyer:919,aen:275.7,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-028',marque:'Opel',modele:'Corsa',immat:'GA-413-EC',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-26',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:12700,loyer:738,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-029',marque:'Opel',modele:'Corsa → Peugeot 208',immat:'GA-388-EC',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-21',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:20000,loyer:738,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-030',marque:'Peugeot',modele:'208',immat:'FN-796-TN',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:52000,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-031',marque:'Peugeot',modele:'208 Essence',immat:'FV-406-JX',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-01',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:52000,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-032',marque:'Peugeot',modele:'5008',immat:'FS-277-RV',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-08-02',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:170000,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-034',marque:'Renault',modele:'Clio Business DCI 90',immat:'FC-593-HA',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'36/60',dateDebutContrat:'2023-11-21',dateFinContrat:'2023-10-30',dateMEC:'2023-11-21',carteCarburant:'0313',km:80000,loyer:0,aen:111,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-035',marque:'Renault',modele:'Clio Essence',immat:'GB-118-WR',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-11-23',dateFinContrat:null,dateMEC:'',carteCarburant:'1907',km:16000,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-036',marque:'Renault',modele:'Clio Soc. Essence',immat:'GC-511-JZ',nVehicule:null,typeVehicule:'vu',energie:'essence',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'france_cars',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-26',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-038',marque:'Renault',modele:'Kadjar',immat:'DX458KV',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:'yilmaz',entiteDetentrice:'leaseplan',typeAcquisition:'leasing_lld',contrat:'',dateDebutContrat:'',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-040',marque:'Seat',modele:'Ateca',immat:'FN-796-TN',nVehicule:null,typeVehicule:'vp',energie:'diesel',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2023-10-02',dateFinContrat:null,dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-041',marque:'Toyota',modele:'ProAce / Berlingo',immat:'GE-168-TS',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-10-24',dateFinContrat:'2022-07-19',dateMEC:'2022-10-24',carteCarburant:'1709',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''},
          {id:'VH-042',marque:'Volkswagen',modele:'T-Roc',immat:'GH-925-NW',nVehicule:null,typeVehicule:'vp',energie:'essence',boite:'automatique',couleur:'',statutAdmin:'restitue',statutUsage:'disponible',conducteurId:null,filialeId:3,entiteDetentrice:'e_entreprise',typeAcquisition:'location_simple',contrat:'',dateDebutContrat:'2022-11-10',dateFinContrat:'2022-10-26',dateMEC:'2022-11-10',carteCarburant:'006',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:null,assureur:'',notes:''}
        ];
        const sampleInterv = [
          {id:'INT-001',vehiculeId:'VH-004',type:'mise_a_disposition',dateDebut:'2025-05-24',dateFin:null,statut:'en_cours',salarieId:'EMP001',commentaire:'MAD Ozdogan YILMAZ',montantTTC:0,prestataire:''},
          {id:'INT-010',vehiculeId:'VH-015',type:'contravention',dateDebut:'2026-01-15',dateFin:null,statut:'en_cours',salarieId:'EMP004',commentaire:'Excès vitesse A35',montantTTC:90,prestataire:'',contrav:{nature:'Excès vitesse < 20km/h',lieu:'A35 Molsheim',dateReception:'2026-01-28',conducteurFautifId:'EMP004',statutDenonciation:'a_denoncer',montantAmende:90,fraisGestion:30,points:1,nAvis:'AV-2026-445521'}},
          {id:'INT-011',vehiculeId:'VH-009',type:'contravention',dateDebut:'2025-12-03',dateFin:null,statut:'en_cours',salarieId:'EMP009',commentaire:'Stationnement Strasbourg',montantTTC:135,prestataire:'',contrav:{nature:'Stationnement gênant',lieu:'Strasbourg',dateReception:'2025-12-18',conducteurFautifId:'EMP009',statutDenonciation:'denonce',montantAmende:135,fraisGestion:15,points:0,nAvis:'AV-2025-998712'}},
          {id:'INT-012',vehiculeId:'VH-006',type:'contravention',dateDebut:'2026-02-10',dateFin:null,statut:'en_cours',salarieId:'EMP001',commentaire:'Feu rouge caméra',montantTTC:135,prestataire:'',contrav:{nature:'Feu rouge / Stop',lieu:'D500 Mutzig',dateReception:'2026-02-22',conducteurFautifId:'EMP001',statutDenonciation:'a_denoncer',montantAmende:135,fraisGestion:30,points:4,nAvis:'AV-2026-112847'}},
          {id:'INT-020',vehiculeId:'VH-004',type:'sinistre',dateDebut:'2025-09-12',dateFin:'2025-10-05',statut:'termine',salarieId:'EMP001',commentaire:'Accrochage parking',montantTTC:850,prestataire:'Garage Kuhn',sinistre:{typeSinistre:'accrochage',responsabilite:'tort_100',nDossierAssurance:'SIN-2025-08842',franchise:300,dureeImmobilisation:8,vehiculeRemplacement:'208 France Cars'}},
          {id:'INT-021',vehiculeId:'VH-005',type:'sinistre',dateDebut:'2024-06-20',dateFin:'2024-06-22',statut:'termine',salarieId:'EMP001',commentaire:'Bris de glace',montantTTC:450,prestataire:'Carglass',sinistre:{typeSinistre:'bris_glace',responsabilite:'non_responsable',nDossierAssurance:'SIN-2024-05521',franchise:0,dureeImmobilisation:2,vehiculeRemplacement:''}},
          {id:'INT-030',vehiculeId:'VH-009',type:'entretien',dateDebut:'2026-01-10',dateFin:'2026-01-10',statut:'termine',salarieId:null,commentaire:'Vidange + filtres',montantTTC:285,prestataire:'Peugeot Molsheim',entretien:{typeEntretien:'Vidange',kmMoment:90000,prochainKm:105000}},
          {id:'INT-031',vehiculeId:'VH-003',type:'controle_technique',dateDebut:'2026-02-15',dateFin:'2026-02-15',statut:'termine',salarieId:null,commentaire:'CT non valide',montantTTC:78,prestataire:'Dekra Mutzig',entretien:{typeEntretien:'CT',kmMoment:106000}},
          {id:'INT-032',vehiculeId:'VH-015',type:'pneumatiques',dateDebut:'2025-11-20',dateFin:'2025-11-20',statut:'termine',salarieId:null,commentaire:'4 pneus hiver',montantTTC:620,prestataire:'Euromaster',entretien:{typeEntretien:'Pneus hiver',kmMoment:52000}},
          {id:'INT-033',vehiculeId:'VH-016',type:'revision',dateDebut:'2026-03-10',dateFin:null,statut:'planifie',salarieId:null,commentaire:'Révision 30 000 km',montantTTC:0,prestataire:'Peugeot',entretien:{typeEntretien:'Révision',kmMoment:30000}},
          {id:'EDL-001',vehiculeId:'VH-004',type:'mise_a_disposition',dateDebut:'2026-02-12',dateFin:'2026-02-12',statut:'termine',salarieId:'EMP001',commentaire:'',montantTTC:0,prestataire:'',edl:{type:'depart',km:61515,carburant:'3/4',zones:{'Avant':'bon','Arrière':'usage','Côté gauche':'bon','Côté droit':'bon','Toit / Capot':'bon','Pare-brise':'bon','Tableau de bord':'bon','Sièges':'bon','Coffre':'bon','Roues / Pneus':'usage'},observations:'Traces usure pare-choc AR. Pneus arrière à surveiller.',signataire:'Ozdogan YILMAZ',signe:true}},
          {id:'EDL-002',vehiculeId:'VH-008',type:'mise_a_disposition',dateDebut:'2025-06-15',dateFin:'2025-06-15',statut:'termine',salarieId:'EMP003',commentaire:'',montantTTC:0,prestataire:'',edl:{type:'depart',km:65000,carburant:'1/2',zones:{'Avant':'bon','Arrière':'bon','Côté gauche':'bon','Côté droit':'degrade','Toit / Capot':'bon','Pare-brise':'bon','Tableau de bord':'bon','Sièges':'bon','Coffre':'usage','Roues / Pneus':'bon'},observations:'Rayure côté droit.',signataire:'Loetitia LEQUERREC',signe:true}}
        ];

        const isYilmazView = !navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz';
        const rawData = autoData.length > 0 ? autoData : sampleAuto;
        const data = isYilmazView
          ? (filialeFilter.length > 0
            ? rawData.filter(d => { const fid = d.filialeId; if(fid === 'yilmaz') return true; return typeof fid === 'number' && filialeFilter.includes(fid); })
            : rawData)
          : rawData.filter(d => {
            const fid = d.filialeId;
            const ctxMap = { 'roulotte': 1, 'echafaudage': 2, 'ezel': 3, 'etancheite': 6 };
            const ctxId = ctxMap[navEntreprise];
            if (!ctxId) return false;
            return (typeof fid === 'number') ? fid === ctxId : false;
          });
        const intervs = sampleInterv;
        const tabs = [{id:'dashboard',label:'Dashboard'},{id:'vehicules',label:'Véhicules'},{id:'contraventions',label:'PV / Contraventions'},{id:'sinistres',label:'Sinistres'},{id:'entretiens',label:'Entretiens / CT'},{id:'etat_lieux',label:'État des lieux'},{id:'tco',label:'TCO / Coûts'}];
        const fmt = v => v >= 1000000 ? `${(v/1000000).toFixed(1)}M€` : v >= 1000 ? `${Math.round(v/1000)}k€` : `${v}€`;
        const fmtN = v => (v||0).toLocaleString('fr-FR');
        const daysDiff = d => { if(!d) return 999; return Math.ceil((new Date(d)-new Date())/(1000*3600*24)); };
        const getLbl = (arr,id) => (arr.find(a=>a.id===id)||{}).label||id||'—';
        const getClr = (arr,id) => (arr.find(a=>a.id===id)||{}).color||'#64748b';
        const FIL_LABELS = {1:'La Roulotte',2:"L'Échafaudage",3:'Ezel',6:"L'Étanchéité",'yilmaz':'Yilmaz'};
        const FIL_COLORS = {1:'#C49A2A',2:'#6C3483',3:'#007ab5',6:'#0e6655','yilmaz':'#8B6F47'};
        const getFilLabel = (fid) => FIL_LABELS[fid]||'—';
        const getFilColor = (fid) => FIL_COLORS[fid]||'#64748b';

        /* ── Design system — sharp, modern ── */
        const Tag = ({label,color,size}) => <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:size==='s'?'2px 8px':'3px 10px',background:color+'15',color:color,fontWeight:600,fontSize:size==='s'?'0.72rem':'0.72rem',borderRadius:crmRd>0?20:2}}><span style={{width:5,height:5,borderRadius:'50%',background:color}}/>{label}</span>;
        const Metric = ({label,value,color,sub}) => <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'16px 18px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default'}} onMouseEnter={e=>{e.currentTarget.style.borderColor=(color||$accent)+'40';e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=$border;e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}><div style={{fontSize:'0.7rem',color:$textMut,fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:6}}>{label}</div><div style={{fontSize:'1.5rem',fontWeight:700,color:color||$text,letterSpacing:'-0.02em',lineHeight:1}}>{value}</div>{sub&&<div style={{fontSize:'0.72rem',color:$textMut,marginTop:4}}>{sub}</div>}</div>;
        const SectionTitle = ({children}) => <div style={{fontSize:'0.78rem',fontWeight:700,color:$text,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:10,paddingBottom:6,borderBottom:`1px solid ${$border}`}}>{children}</div>;

        const actifs = data.filter(d=>d.statutAdmin==='actif');
        const inactifs = data.filter(d=>d.statutAdmin!=='actif');
        const enCirc = actifs.filter(d=>['affecte_conducteur','mise_a_disposition'].includes(d.statutUsage)).length;
        const enMaint = actifs.filter(d=>['en_maintenance','en_reconditionnement'].includes(d.statutUsage)).length;
        const ctUrg = actifs.filter(d=>d.ctDateProchain && daysDiff(d.ctDateProchain) < 90).length;
        const ctDep = actifs.filter(d=>d.ctDateProchain && daysDiff(d.ctDateProchain) < 0).length;
        const contFin = actifs.filter(d=>d.dateFinContrat && daysDiff(d.dateFinContrat) < 90 && daysDiff(d.dateFinContrat) > 0).length;
        const contravEC = intervs.filter(i=>i.type==='contravention'&&i.contrav?.statutDenonciation!=='paye').length;
        const contravAD = intervs.filter(i=>i.type==='contravention'&&i.contrav?.statutDenonciation==='a_denoncer').length;
        const valLoyers = actifs.reduce((s,d)=>s+(d.loyer||0),0);
        const coutEnt = intervs.filter(i=>['entretien','revision','reparation','carrosserie','pneumatiques','controle_technique','nettoyage'].includes(i.type)).reduce((s,i)=>s+(i.montantTTC||0),0);
        const coutSin = intervs.filter(i=>i.type==='sinistre').reduce((s,i)=>s+(i.montantTTC||0),0);
        const preFiltered = autoFilter==='tous'?data:autoFilter==='actif'?actifs:autoFilter==='inactif'?inactifs:data.filter(d=>{const f=autoFilter;if(f.startsWith('t_'))return d.typeVehicule===f.slice(2);if(f.startsWith('e_'))return d.entiteDetentrice===f.slice(2);if(f.startsWith('su_'))return d.statutUsage===f.slice(3);if(f.startsWith('aq_'))return d.typeAcquisition===f.slice(3);return true;});
        const filFiltered = autoFilialeFilter.length===0?preFiltered:preFiltered.filter(d=>{const fid=String(d.filialeId);return autoFilialeFilter.map(String).includes(fid);});
        const filteredData = autoStatutFilter.length===0?filFiltered:filFiltered.filter(d=>autoStatutFilter.includes(d.statutAdmin));

        return (
          <div style={{padding:0}}>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:'linear-gradient(90deg,#334155 0%,#0891b2 60%,#334155 100%)'}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>🚗</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Parc Automobile</h2>
                        {ctUrg>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#ea580c15',color:'#ea580c',fontWeight:700,border:'1px solid #ea580c30'}}>⚠ {ctUrg} CT urgent</span>}
                        {contravAD>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#dc262615',color:'#dc2626',fontWeight:700,border:'1px solid #dc262630'}}>{contravAD} PV à dénoncer</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>{actifs.length} véhicules actifs · TCO · Sinistres · Contraventions</p>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8,flexShrink:0}}>
              <button onClick={()=>setAutoEdit({id:'VH-'+String(data.length+1).padStart(3,'0'),marque:'',modele:'',immat:'',nVehicule:null,typeVehicule:'vu',energie:'diesel',boite:'manuelle',couleur:'',statutAdmin:'a_commander',statutUsage:'disponible',conducteurId:null,filialeId:1,entiteDetentrice:'',typeAcquisition:'achat',contrat:'',dateDebutContrat:'',dateFinContrat:'',dateMEC:'',carteCarburant:'',km:0,loyer:0,aen:0,ctStatut:'a_faire',ctDateProchain:'',assureur:'',notes:''})} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#334155',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer'}}>
                <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                + Véhicule
              </button>
                  </div>
                </div>
                {/* KPI mini TCO */}
                <div style={{display:'flex',gap:20,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                  {[{l:'Actifs',v:actifs.length,c:'#16a34a'},{l:'Loyers/mois',v:(valLoyers).toLocaleString('fr-FR')+'€',c:'#0891b2'},{l:'CT urgents',v:ctUrg,c:ctUrg>0?'#ea580c':$textMut},{l:'Fins contrat <90j',v:contFin,c:contFin>0?'#d97706':$textMut},{l:'Maintenances',v:enMaint,c:enMaint>0?'#7c3aed':$textMut}].map((k,i)=>(
                    <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}>
                      <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{k.l}</div>
                      <div style={{fontSize:'1.1rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em'}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ── TABS + FILTRES ── */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div ref={autoTabsRef} style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content',flexWrap:'wrap'}}>
                {tabs.map(t=><button key={t.id} onClick={()=>setAutoTab(t.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:autoTab===t.id?$selBg:'transparent',color:autoTab===t.id?$selText:$textMut,fontWeight:autoTab===t.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{t.label}{t.id==='contraventions'&&contravAD>0?` (${contravAD})`:''}</button>)}
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setAutoFilterOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${autoFilterOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:autoFilterOpen?$accentSub:'transparent',color:autoFilterOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ⚙ Filtres & Colonnes {(autoFilialeFilter.length>0||autoStatutFilter.length!==2)&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {autoFilialeFilter.length>0&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setAutoFilialeFilter([])}>✕ {autoFilialeFilter.length} filiale{autoFilialeFilter.length>1?'s':''}</span>}
                {autoStatutFilter.length!==2&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$warn+'18',color:$warn,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setAutoStatutFilter(['actif','a_commander'])}>✕ Filtre statut</span>}
              </div>
            </div>

            {/* ── Filtres & Colonnes panel ── */}
            {autoFilterOpen&&<><div onClick={()=>setAutoFilterOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              {/* Filiale filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                {(()=>{
                  const toggle=(id)=>setAutoFilialeFilter(p=>p.map(String).includes(String(id))?p.filter(x=>String(x)!==String(id)):[...p,id]);
                  const isC=(id)=>autoFilialeFilter.map(String).includes(String(id));
                  const countF=(fid)=>data.filter(d=>{const f=d.filialeId;if(String(fid)==='yilmaz')return f==='yilmaz';return String(f)===String(fid);}).length;
                  const invLoc=filialesDynamiques.filter(f=>f.holding==='INVEST LOC');
                  const invExe=filialesDynamiques.filter(f=>f.holding==='INVEST EXE');
                  const Chk=({id,label,count,color,indent})=>(<div onClick={()=>toggle(id)} style={{padding:'5px 8px',paddingLeft:indent?20:8,display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC(id)?$accent:$border}`,background:isC(id)?$accent:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC(id)&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                    {color&&<div style={{width:7,height:7,borderRadius:'50%',background:color,flexShrink:0}}/>}
                    <span style={{fontSize:'0.78rem',fontWeight:isC(id)?600:400,color:isC(id)?$text:$textSec,flex:1}}>{label}</span>
                    <span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut}}>{count}</span>
                  </div>);
                  return(<div style={{display:'flex',flexDirection:'column',gap:2}}>
                    <Chk id='yilmaz' label='🏢 Yilmaz' count={countF('yilmaz')} color='#2d2d2d'/>
                    <div style={{padding:'6px 8px 2px',fontSize:'0.65rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Invest Loc</div>
                    {invLoc.map(f=><Chk key={f.id} id={f.id} label={f.icon+' '+f.nom} count={countF(f.id)} color={f.couleur} indent/>)}
                    <div style={{padding:'6px 8px 2px',fontSize:'0.65rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Invest Exe</div>
                    {invExe.map(f=><Chk key={f.id} id={f.id} label={f.icon+' '+f.nom} count={countF(f.id)} color={f.couleur} indent/>)}
                  </div>);
                })()}
              </div>
              {/* Statut admin filter */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Statut administratif</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {STATUT_ADMIN.map(st=>{const isC=autoStatutFilter.includes(st.id);const n=data.filter(d=>d.statutAdmin===st.id).length;return n>0?(
                    <div key={st.id} onClick={()=>setAutoStatutFilter(p=>p.includes(st.id)?p.filter(x=>x!==st.id):[...p,st.id])} style={{padding:'5px 8px',display:'flex',alignItems:'center',gap:7,cursor:'pointer',borderRadius:crmRd,transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgSub} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${isC?st.color:$border}`,background:isC?st.color:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{isC&&<span style={{color:'#fff',fontSize:'0.55rem',fontWeight:700}}>✓</span>}</div>
                      <span style={{width:6,height:6,borderRadius:'50%',background:st.color,flexShrink:0}}/>
                      <span style={{fontSize:'0.78rem',fontWeight:isC?600:400,color:isC?$text:$textSec,flex:1}}>{st.label}</span>
                      <span style={{fontSize:'0.7rem',fontWeight:700,color:$textMut}}>{n}</span>
                    </div>):null;})}
                </div>
              </div>
              {/* Colonnes visibles */}
              <div style={{borderTop:`1px solid ${$border}`,paddingTop:12}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Colonnes visibles</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {[{id:'id',label:'N° Véhicule'},{id:'nom',label:'Véhicule',locked:true},{id:'immat',label:'Immatriculation'},{id:'filiale',label:'Filiale'},{id:'type',label:'Type'},{id:'energie',label:'Énergie'},{id:'statut',label:'Statut admin'},{id:'usage',label:'Usage'},{id:'conducteur',label:'Conducteur'},{id:'acquis',label:'Acquisition'},{id:'km',label:'Kilométrage'},{id:'loyer',label:'Loyer'},{id:'ct',label:'Contrôle technique'}].map(col=>(
                    <label key={col.id} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 8px',borderRadius:crmRd,cursor:col.locked?'default':'pointer',opacity:col.locked?0.5:1,fontSize:'0.76rem',color:$textSec,transition:'background 0.1s'}} onMouseEnter={e=>{if(!col.locked)e.currentTarget.style.background=$bgSub;}} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <input type='checkbox' checked={autoVisibleCols[col.id]!==false} disabled={col.locked} onChange={()=>setAutoVisibleCols(p=>({...p,[col.id]:p[col.id]===false?true:false}))} style={{accentColor:$accent}}/>
                      {col.label}
                    </label>
                  ))}
                </div>
              </div>
            </div></>}

            {/* Tab content — min height prevents page jump on tab switch */}
            <div style={{minHeight:'60vh'}}>
            {/* ═══ DASHBOARD ═══ */}
            {autoTab === 'dashboard' && <>
                          {/* KPI Cards */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:20}}>
                <Metric label="Flotte active" value={actifs.length} sub={`${data.length} total`}/>
                <Metric label="En circulation" value={enCirc} color="#16a34a"/>
                <Metric label="Loyers / mois" value={fmtN(Math.round(valLoyers))+'€'} color={$accent}/>
                <Metric label="Maintenance" value={enMaint} color={enMaint>0?'#ea580c':'#16a34a'}/>
                <Metric label="CT < 90 jours" value={ctUrg} color={ctUrg>0?'#ea580c':'#16a34a'} sub={ctDep>0?`${ctDep} dépassé`:''}/>
                <Metric label="Contrat fin < 3m" value={contFin} color={contFin>0?'#dc2626':'#16a34a'}/>
                <Metric label="PV en cours" value={contravEC} color={contravAD>0?'#dc2626':'#64748b'} sub={contravAD>0?`${contravAD} à dénoncer`:''}/>
              </div>

              {/* Alertes critiques */}
              {(ctDep>0||contravAD>0)&&<div style={{background:$danger+'08',border:`1px solid ${$danger}25`,borderRadius:crmRd,padding:'16px 20px',marginBottom:20,borderLeft:`4px solid ${$danger}`}}>
                <div style={{fontWeight:700,fontSize:'0.78rem',color:$danger,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.04em'}}>Alertes critiques</div>
                <div style={{display:'flex',flexDirection:'column',gap:4}}>
                  {actifs.filter(d=>d.ctDateProchain&&daysDiff(d.ctDateProchain)<0).map(d=><div key={d.id} style={{fontSize:'0.78rem',color:$danger,lineHeight:1.5}}>🔴 CT DÉPASSÉ — {d.marque} {d.modele} ({d.immat}) · {Math.abs(daysDiff(d.ctDateProchain))}j de retard</div>)}
                  {intervs.filter(i=>i.contrav?.statutDenonciation==='a_denoncer').map(i=>{const dl=i.contrav?.dateReception?daysDiff(new Date(new Date(i.contrav.dateReception).getTime()+45*24*3600*1000).toISOString().slice(0,10)):null;return <div key={i.id} style={{fontSize:'0.78rem',color:$danger,lineHeight:1.5}}>🔴 PV {i.contrav.nAvis} — {dl>0?`${dl}j restants pour dénonciation`:'DÉLAI DÉPASSÉ'}</div>;})}
                </div>
              </div>}

              {/* Répartitions */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
                {/* Par type d'acquisition */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par type d'acquisition</div>
                  {TYPE_ACQUIS.map(t=>{const n=actifs.filter(d=>d.typeAcquisition===t.id).length;if(n===0)return null;const pct=actifs.length>0?Math.round(n/actifs.length*100):0;return <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:`1px solid ${$borderLight||$border}`}}>
                    <span style={{fontSize:'0.78rem',width:120,display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:t.color,flexShrink:0}}/>{t.label}</span>
                    <div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:t.color,borderRadius:3,transition:'width 0.3s'}}/></div>
                    <span style={{fontSize:'0.78rem',fontWeight:700,color:t.color,minWidth:24,textAlign:'right'}}>{n}</span>
                  </div>;})}
                </div>

                {/* Par entité détentrice */}
                <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par entité détentrice</div>
                  {ENTITES.map(t=>{const n=actifs.filter(d=>d.entiteDetentrice===t.id).length;if(n===0)return null;const pct=actifs.length>0?Math.round(n/actifs.length*100):0;return <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:`1px solid ${$borderLight||$border}`}}>
                    <span style={{fontSize:'0.78rem',width:120,display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:t.color,flexShrink:0}}/>{t.label}</span>
                    <div style={{flex:1,height:6,background:$bgSub,borderRadius:3,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:t.color,borderRadius:3,transition:'width 0.3s'}}/></div>
                    <span style={{fontSize:'0.78rem',fontWeight:700,color:t.color,minWidth:24,textAlign:'right'}}>{n}</span>
                  </div>;})}
                </div>
              </div>

              {/* Par statut */}
              <div style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:20,boxShadow:$shadow}}>
                <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:14,textTransform:'uppercase',letterSpacing:'0.04em'}}>Par statut</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[...STATUT_USAGE,{id:'a_commander',label:'À commander',color:$textSec}].map(st=>{const n=st.id==='a_commander'?data.filter(d=>d.statutAdmin==='a_commander').length:actifs.filter(d=>d.statutUsage===st.id).length;if(n===0)return null;const pct=data.length>0?Math.round(n/data.length*100):0;return <div key={st.id} style={{flex:'1 1 140px',padding:'12px 16px',background:st.color+'08',border:`1px solid ${st.color}20`,borderRadius:crmRd,borderLeft:showBorderAccent?`4px solid ${st.color}`:'none'}}>
                    <div style={{fontSize:'0.68rem',fontWeight:600,color:st.color,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>{st.label}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:6}}>
                      <span style={{fontSize:'1.2rem',fontWeight:700,color:st.color}}>{n}</span>
                      <span style={{fontSize:'0.72rem',color:$textMut}}>{pct}%</span>
                    </div>
                  </div>;})}
                </div>
              </div>
            </>}

            {/* ═══ VÉHICULES ═══ */}
            {autoTab === 'vehicules' && <>
              <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center',flexWrap:'wrap'}}>
                <select value={autoFilter} onChange={e=>setAutoFilter(e.target.value)} style={{padding:'6px 14px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontWeight:500,fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
                  <option value="tous">Tous ({data.length})</option>
                  <option value="actif">Actifs ({actifs.length})</option>
                  <option value="inactif">Inactifs ({inactifs.length})</option>
                  <optgroup label="Type">{AUTO_TYPES.map(t=><option key={t.id} value={'t_'+t.id}>{t.label}</option>)}</optgroup>
                  <optgroup label="Usage">{STATUT_USAGE.map(s=><option key={s.id} value={'su_'+s.id}>{s.label}</option>)}</optgroup>
                  <optgroup label="Entité">{ENTITES.map(t=><option key={t.id} value={'e_'+t.id}>{t.label}</option>)}</optgroup>
                </select>
                <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`}}>
                  {['table','cards'].map(m=><button key={m} onClick={()=>setAutoViewMode(m)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:autoViewMode===m?$selBg:'transparent',color:autoViewMode===m?$selText:$textMut,fontWeight:autoViewMode===m?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{m==='table'?'Tableau':'Cartes'}</button>)}
                </div>
                <span style={{fontSize:'0.78rem',color:$textMut,fontWeight:500}}>{filteredData.length} résultats</span>
              </div>

              {autoViewMode === 'table' && <div style={{overflowX:'auto',border:`1px solid ${$border}`,borderRadius:crmRd,background:$bgCard,boxShadow:$shadow}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:$bgSub, borderBottom:`1px solid ${$border}`, position:'sticky',top:0,zIndex:3}}>
                    {[{k:'id',l:'',w:70},{k:'nom',l:'Véhicule',w:180},{k:'immat',l:'Immat',w:115},{k:'filiale',l:'Filiale',w:120},{k:'type',l:'Type',w:70},{k:'energie',l:'Énergie',w:80},{k:'statut',l:'Statut',w:90},{k:'usage',l:'Usage',w:100},{k:'conducteur',l:'Conducteur',w:140},{k:'acquis',l:'Acquis.',w:80},{k:'km',l:'Km',w:85},{k:'loyer',l:'Loyer',w:75},{k:'ct',l:'CT',w:100}].filter(col=>autoVisibleCols[col.k]!==false).map(col=><th key={col.k} style={{padding:'12px 10px',textAlign:'left',fontWeight:700,color:$textMut,borderBottom:`1px solid ${$border}`,borderRight:`1px solid ${$borderLight||$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.06em',whiteSpace:'nowrap',width:autoColWidths[col.k]||col.w,minWidth:60,position:'relative',userSelect:'none',overflow:'hidden'}}>
                      {col.l}
                      <div onMouseDown={e=>{e.preventDefault();const startX=e.clientX;const th=e.target.closest('th');const startW=th.offsetWidth;const key=col.k;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const onMove=ev=>{const w=Math.max(60,startW+ev.clientX-startX);setAutoColWidths(prev=>({...prev,[key]:w}));};const onUp=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);}} style={{position:'absolute',right:0,top:0,bottom:0,width:6,cursor:'col-resize',background:'transparent',transition:'background 0.15s',zIndex:2}} onMouseEnter={e=>e.currentTarget.style.background=$accent+'40'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}/>
                    </th>)}
                  </tr></thead>
                  <tbody>{filteredData.map((v,idx)=>{
                    const ctD=daysDiff(v.ctDateProchain);const inactive=v.statutAdmin!=='actif';
                    return <tr key={v.id} onClick={()=>setAutoDetail(v.id)} style={{cursor:'pointer',borderBottom:`1px solid ${$borderLight}`,opacity:inactive?0.4:1,background:$bgSub+'60',transition:'background 0.1s'}} onMouseEnter={e=>{if(!inactive)e.currentTarget.style.background=$bgCardHover;}} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                      {autoVisibleCols.id!==false&&<td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{v.id}</td>}
                      <td style={{padding:'12px 14px',fontWeight:700,color:$text}}>{v.marque} {v.modele}</td>
                      {autoVisibleCols.immat!==false&&<td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{v.immat||'—'}</td>}
                      {autoVisibleCols.filiale!==false&&<td style={{padding:'12px 14px', fontSize:'0.82rem', color:$textSec}}><span style={{display:'inline-flex', alignItems:'center', gap:5}}><span style={{width:6, height:6, borderRadius:'50%', background:getFilColor(v.filialeId), flexShrink:0}}/>{getFilLabel(v.filialeId)}</span></td>}
                      {autoVisibleCols.type!==false&&<td style={{padding:'12px 14px'}}><Tag label={getLbl(AUTO_TYPES,v.typeVehicule)} color={getClr(AUTO_TYPES,v.typeVehicule)} size="s"/></td>}
                      {autoVisibleCols.energie!==false&&<td style={{padding:'12px 14px'}}><Tag label={getLbl(ENERGIES,v.energie)} color={getClr(ENERGIES,v.energie)} size="s"/></td>}
                      {autoVisibleCols.statut!==false&&<td style={{padding:'12px 14px'}}><Tag label={getLbl(STATUT_ADMIN,v.statutAdmin)} color={getClr(STATUT_ADMIN,v.statutAdmin)} size="s"/></td>}
                      {autoVisibleCols.usage!==false&&<td style={{padding:'12px 14px'}}>{v.statutAdmin==='actif'?<Tag label={getLbl(STATUT_USAGE,v.statutUsage)} color={getClr(STATUT_USAGE,v.statutUsage)} size="s"/>:'—'}</td>}
                      {autoVisibleCols.conducteur!==false&&<td style={{padding:'12px 14px',fontSize:'0.72rem',color:$textSec}}>{v.conducteurId?empNom(v.conducteurId):'—'}</td>}
                      {autoVisibleCols.acquis!==false&&<td style={{padding:'12px 14px'}}><Tag label={getLbl(TYPE_ACQUIS,v.typeAcquisition)} color={getClr(TYPE_ACQUIS,v.typeAcquisition)} size="s"/></td>}
                      {autoVisibleCols.km!==false&&<td style={{padding:'12px 14px',textAlign:'right',fontSize:'0.82rem',color:$textSec}}>{v.km>0?fmtN(v.km):'—'}</td>}
                      {autoVisibleCols.loyer!==false&&<td style={{padding:'12px 14px',textAlign:'right',fontSize:'0.82rem',color:$textSec}}>{v.loyer>0?`${v.loyer}€`:'—'}</td>}
                      {autoVisibleCols.ct!==false&&<td style={{padding:'12px 14px',fontSize:'0.82rem',color:$textSec}}>{v.ctDateProchain?<span style={{color:ctD<0?'#dc2626':ctD<90?'#ea580c':$textSec}}>{v.ctDateProchain}</span>:'—'}</td>}
                    </tr>;})}
                  </tbody>
                </table>
              </div>}

              {autoViewMode === 'cards' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))',gap:12}}>
                {filteredData.map(v=><div key={v.id} onClick={()=>setAutoDetail(v.id)} style={{background:$bgCard,padding:'14px 18px',cursor:'pointer',borderLeft:showBorderAccent?`4px solid ${getClr(AUTO_TYPES,v.typeVehicule)}`:'none',opacity:v.statutAdmin!=='actif'?0.4:1,border:`1px solid ${$border}`,borderRadius:crmRd,boxShadow:$shadow,transition:'all 0.2s'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div><div style={{fontWeight:800,fontSize:'0.82rem',color:$text}}>{v.marque} {v.modele}</div><div style={{fontSize:'0.78rem',color:$accent,fontWeight:600,marginTop:2}}>{v.id} · {v.immat||'—'}</div></div>
                    <Tag label={getLbl(STATUT_ADMIN,v.statutAdmin)} color={getClr(STATUT_ADMIN,v.statutAdmin)}/>
                  </div>
                  <div style={{display:'flex',gap:4,marginTop:6,flexWrap:'wrap'}}><Tag label={getFilLabel(v.filialeId)} color={getFilColor(v.filialeId)} size="s"/><Tag label={getLbl(AUTO_TYPES,v.typeVehicule)} color={getClr(AUTO_TYPES,v.typeVehicule)} size="s"/><Tag label={getLbl(ENERGIES,v.energie)} color={getClr(ENERGIES,v.energie)} size="s"/><Tag label={getLbl(TYPE_ACQUIS,v.typeAcquisition)} color={getClr(TYPE_ACQUIS,v.typeAcquisition)} size="s"/></div>
                  <div style={{fontSize:'0.72rem',color:$textMut,marginTop:4}}>{v.conducteurId?empNom(v.conducteurId):'Non affecté'}{v.km>0?` · ${fmtN(v.km)} km`:''}{v.loyer>0?` · ${v.loyer}€/mois`:''}</div>
                </div>)}
              </div>}
            </>}

            {/* ═══ CONTRAVENTIONS ═══ */}
            {autoTab === 'contraventions' && <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:16}}>
                <Metric label="Total PV" value={intervs.filter(i=>i.type==='contravention').length} color="#dc2626"/>
                <Metric label="À dénoncer" value={contravAD} color={contravAD>0?'#dc2626':'#16a34a'}/>
                <Metric label="Amendes" value={fmt(intervs.filter(i=>i.type==='contravention').reduce((s,i)=>s+(i.contrav?.montantAmende||0),0))} color="#991b1b"/>
                <Metric label="Frais gestion" value={fmt(intervs.filter(i=>i.type==='contravention').reduce((s,i)=>s+(i.contrav?.fraisGestion||0),0))} color="#c2410c"/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {intervs.filter(i=>i.type==='contravention').sort((a,b)=>(a.contrav?.statutDenonciation==='a_denoncer'?0:1)-(b.contrav?.statutDenonciation==='a_denoncer'?0:1)).map(i=>{
                const c=i.contrav||{};const vh=data.find(d=>d.id===i.vehiculeId);const dateLim=c.dateReception?new Date(new Date(c.dateReception).getTime()+45*24*3600*1000).toISOString().slice(0,10):null;const jR=dateLim?daysDiff(dateLim):null;const urg=jR!==null&&jR<15;
                return <div key={i.id} style={{background:$bgCard,padding:'14px 18px',borderLeft:showBorderAccent?`4px solid ${c.statutDenonciation==='a_denoncer'?'#dc2626':c.statutDenonciation==='denonce'?'#ea580c':'#16a34a'}`:'none',borderRadius:crmRd,border:`1px solid ${$border}`,boxShadow:$shadow}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                    <div><div style={{fontWeight:800,fontSize:'0.82rem',color:$text}}>{c.nature}</div><div style={{fontSize:'0.78rem',color:$textSec,marginTop:2}}>{c.lieu} · {i.dateDebut} · {vh?`${vh.marque} ${vh.modele} (${vh.immat})`:''}</div></div>
                    <Tag label={c.statutDenonciation==='a_denoncer'?'À DÉNONCER':c.statutDenonciation==='denonce'?'DÉNONCÉ':'PAYÉ'} color={c.statutDenonciation==='a_denoncer'?'#dc2626':c.statutDenonciation==='denonce'?'#ea580c':'#16a34a'}/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'auto auto auto 1fr',gap:12,marginTop:10}}>
                    <div><div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Amende</div><div style={{fontSize:'1rem',fontWeight:900,color:'#dc2626'}}>{c.montantAmende}€</div></div>
                    <div><div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Frais</div><div style={{fontSize:'1rem',fontWeight:900,color:'#c2410c'}}>{c.fraisGestion}€</div></div>
                    {c.points>0&&<div><div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>Points</div><div style={{fontSize:'1rem',fontWeight:900,color:'#dc2626'}}>-{c.points}</div></div>}
                    <div style={{background:c.statutDenonciation==='a_denoncer'?(urg?'#dc2626':'#ea580c'):'#16a34a',color:'white',padding:'8px 14px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                      <div style={{fontSize:'0.75rem',fontWeight:700,textTransform:'uppercase'}}>Délai dénonciation</div>
                      {c.statutDenonciation==='a_denoncer'?<div style={{fontSize:'1rem',fontWeight:900}}>{jR>0?`${jR} JOURS RESTANTS`:'DÉPASSÉ'}</div>:<div style={{fontSize:'0.82rem',fontWeight:700}}>EFFECTUÉE</div>}
                    </div>
                  </div>
                  <div style={{fontSize:'0.78rem',color:$textSec,marginTop:6}}>Conducteur: <strong style={{color:$text}}>{c.conducteurFautifId?empNom(c.conducteurFautifId):'?'}</strong> · N° avis: {c.nAvis}</div>
                </div>;})}
              </div>
            </>}

            {/* ═══ SINISTRES ═══ */}
            {autoTab === 'sinistres' && <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:16}}>
                <Metric label="Sinistres" value={intervs.filter(i=>i.type==='sinistre').length} color="#be123c"/><Metric label="Coût total" value={fmt(coutSin)} color="#991b1b"/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {intervs.filter(i=>i.type==='sinistre').map(i=>{const s=i.sinistre||{};const vh=data.find(d=>d.id===i.vehiculeId);return <div key={i.id} style={{background:$bgCard,padding:'14px 18px',borderLeft:showBorderAccent?'4px solid #be123c':'none',borderRadius:crmRd,border:`1px solid ${$border}`,boxShadow:$shadow}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontWeight:800,fontSize:'0.82rem',color:$text}}>{getLbl(SINISTRE_TYPES,s.typeSinistre)}</div><div style={{fontSize:'0.78rem',color:$textSec,marginTop:2}}>{vh?`${vh.marque} ${vh.modele} (${vh.immat})`:''} · {i.dateDebut}</div></div><Tag label={i.statut==='termine'?'CLOS':'EN COURS'} color={i.statut==='termine'?'#16a34a':'#ea580c'}/></div>
                <div style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap',alignItems:'center'}}>
                  <Tag label={getLbl(SINISTRE_RESP,s.responsabilite)} color={getClr(SINISTRE_RESP,s.responsabilite)}/><span style={{fontWeight:800,color:'#dc2626'}}>{i.montantTTC}€</span>{s.franchise>0&&<span style={{fontSize:'0.78rem',color:$textSec}}>Franchise {s.franchise}€</span>}{s.dureeImmobilisation>0&&<span style={{fontSize:'0.78rem',color:$textSec}}>{s.dureeImmobilisation}j immobilisé</span>}{s.nDossierAssurance&&<span style={{fontSize:'0.72rem',color:$accent}}>{s.nDossierAssurance}</span>}
                </div>
                <div style={{fontSize:'0.78rem',color:$textSec,marginTop:4}}>{i.prestataire}{s.vehiculeRemplacement?` · Remplacement: ${s.vehiculeRemplacement}`:''}</div>
              </div>;})}
              </div>
            </>}

            {/* ═══ ENTRETIENS ═══ */}
            {autoTab === 'entretiens' && <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:16}}>
                <Metric label="Interventions" value={intervs.filter(i=>['entretien','revision','reparation','carrosserie','pneumatiques','controle_technique','nettoyage'].includes(i.type)).length} color={$accent}/>
                <Metric label="Coût" value={fmt(coutEnt)} color={$accent}/><Metric label="CT urgents" value={ctUrg} color={ctUrg>0?'#dc2626':'#16a34a'}/>
              </div>
              <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.04em'}}>Prochains contrôles techniques</div>
              <div style={{display:'flex',flexDirection:'column',gap:1,background:$bgSub,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden',marginBottom:16}}>
              {actifs.filter(d=>d.ctDateProchain).sort((a,b)=>new Date(a.ctDateProchain)-new Date(b.ctDateProchain)).slice(0,8).map(d=>{const dd=daysDiff(d.ctDateProchain);return <div key={d.id} style={{display:'flex',alignItems:'center',gap:12,background:$bgSub+'60',padding:'12px 14px',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                <Tag label={getLbl(CT_STATUTS,d.ctStatut)} color={getClr(CT_STATUTS,d.ctStatut)} size="s"/>
                <span style={{fontWeight:700,fontSize:'0.82rem',flex:1}}>{d.marque} {d.modele} <span style={{color:$accent}}>{d.immat}</span></span>
                <span style={{fontWeight:700,fontSize:'0.78rem',color:dd<0?'#dc2626':dd<90?'#ea580c':'#16a34a'}}>{d.ctDateProchain} · {dd<0?`${Math.abs(dd)}j RETARD`:dd<90?`${dd}j`:`${dd}j`}</span>
              </div>;})}
              </div>
              <div style={{fontWeight:700,fontSize:'0.78rem',color:$text,marginBottom:10,marginTop:4,textTransform:'uppercase',letterSpacing:'0.04em'}}>Historique interventions</div>
              <div style={{display:'flex',flexDirection:'column',gap:1,background:$bgSub,borderRadius:crmRd,border:`1px solid ${$border}`,overflow:'hidden'}}>
              {intervs.filter(i=>['entretien','revision','reparation','carrosserie','pneumatiques','controle_technique','nettoyage'].includes(i.type)).sort((a,b)=>new Date(b.dateDebut)-new Date(a.dateDebut)).map(i=>{const vh=data.find(d=>d.id===i.vehiculeId);const it=INTERV_TYPES.find(t=>t.id===i.type)||{};return <div key={i.id} style={{background:$bgSub+'60',padding:'12px 14px',borderLeft:showBorderAccent?`3px solid ${it.color||'#64748b'}`:'none',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                <div><strong style={{fontSize:'0.82rem'}}>{it.label}</strong><span style={{fontSize:'0.78rem',color:$textSec,marginLeft:8}}>{vh?`${vh.marque} ${vh.modele} (${vh.immat})`:''} · {i.dateDebut} · {i.prestataire||'—'}</span>{i.commentaire&&<span style={{fontSize:'0.72rem',color:$textMut,fontStyle:'italic'}}> — {i.commentaire}</span>}</div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>{i.montantTTC>0&&<span style={{fontWeight:700,color:$accent}}>{i.montantTTC}€</span>}<Tag label={i.statut==='termine'?'FAIT':i.statut==='planifie'?'PLANIFIÉ':'EN COURS'} color={i.statut==='termine'?'#16a34a':i.statut==='planifie'?'#7c3aed':'#ea580c'} size="s"/></div>
              </div>;})}
              </div>
            </>}

            {/* ═══ ÉTAT DES LIEUX ═══ */}
            {autoTab === 'etat_lieux' && <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <div><div style={{fontWeight:700,fontSize:'0.78rem',color:$text,textTransform:'uppercase',letterSpacing:'0.04em'}}>État des lieux véhicule</div><div style={{fontSize:'0.78rem',color:$textSec,marginTop:4}}>Inspection de départ (affectation) et retour (restitution)</div></div>
                <button onClick={()=>setAutoEtatLieux({id:'EDL-'+Date.now(),vehiculeId:'',type:'depart',salarieId:'',date:new Date().toISOString().slice(0,10),km:'',carburant:'1/2',zones:Object.fromEntries(EDL_ZONES.map(z=>[z,'bon'])),observations:'',signataire:'',signe:false})} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.15s',fontFamily:'inherit'}}>+ ÉTAT DES LIEUX</button>
              </div>
              <div style={{background:$info+'08',border:`1px solid ${$info}20`,borderRadius:crmRd,padding:'16px 20px',marginBottom:16,borderLeft:`4px solid ${$info}`}}>
                <div style={{fontWeight:700,fontSize:'0.78rem',color:$info,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.04em'}}>Processus</div>
                <div style={{fontSize:'0.78rem',color:$textSec,lineHeight:1.6}}>
                  <strong style={{color:$success}}>DÉPART</strong> — Affectation / Prêt. Inspection véhicule, photos, vidéos, notes dégâts existants, signature salarié.<br/>
                  <strong style={{color:$info}}>RETOUR</strong> — Restitution / Départ salarié. Comparaison avec état de départ, nouveaux dégâts, photos, signature. Facturation si dégâts.
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {intervs.filter(i=>i.edl).sort((a,b)=>new Date(b.dateDebut)-new Date(a.dateDebut)).map(i=>{
                const vh=data.find(d=>d.id===i.vehiculeId);const e=i.edl;const nbDeg=Object.values(e.zones||{}).filter(v=>v==='degrade'||v==='casse').length;
                return <div key={i.id} style={{background:$bgCard,padding:'14px 18px',borderLeft:showBorderAccent?`4px solid ${e.type==='depart'?'#16a34a':'#2563eb'}`:'none',borderRadius:crmRd,border:`1px solid ${$border}`,boxShadow:$shadow}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div><div style={{fontWeight:800,fontSize:'0.82rem',color:$text}}>{e.type==='depart'?'DÉPART — Mise à disposition':'RETOUR — Restitution'}</div><div style={{fontSize:'0.78rem',color:$textSec,marginTop:2}}>{vh?`${vh.marque} ${vh.modele} (${vh.immat})`:i.vehiculeId} · {i.dateDebut}</div></div>
                    <Tag label={e.signe?'SIGNÉ':'EN ATTENTE'} color={e.signe?'#16a34a':'#ea580c'}/>
                  </div>
                  <div style={{display:'flex',gap:10,marginTop:8,flexWrap:'wrap'}}>
                    <span style={{fontSize:'0.82rem',fontWeight:700}}>{fmtN(e.km)} km</span>
                    <span style={{fontSize:'0.82rem'}}>Carburant: {e.carburant}</span>
                    <span style={{fontSize:'0.82rem',fontWeight:700,color:nbDeg>0?'#dc2626':'#16a34a'}}>{nbDeg>0?`${nbDeg} zone(s) dégradée(s)`:'Bon état'}</span>
                    <span style={{fontSize:'0.82rem',color:$textSec}}>{e.signataire}</span>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:2,marginTop:6}}>{Object.entries(e.zones||{}).map(([zone,etat])=>{const ec=EDL_ETATS.find(x=>x.id===etat)||{};return <Tag key={zone} label={`${zone}: ${ec.label||etat}`} color={ec.color||'#64748b'} size="s"/>;})}</div>
                  {e.observations&&<div style={{fontSize:'0.78rem',color:$textSec,marginTop:6,padding:'8px 12px',background:$bgSub,borderRadius:crmRd,borderLeft:showBorderAccent?`3px solid ${$border}`:'none'}}>{e.observations}</div>}
                </div>;
              })}
              </div>
            </>}

            {/* ═══ TCO ═══ */}
            {autoTab === 'tco' && <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:12,marginBottom:16}}>
                <Metric label="Loyers / mois" value={fmt(valLoyers)} color="#2563eb"/><Metric label="Loyers / an" value={fmt(valLoyers*12)} color="#1e40af"/><Metric label="Entretiens" value={fmt(coutEnt)} color="#0284c7"/><Metric label="Sinistres" value={fmt(coutSin)} color="#dc2626"/><Metric label="Total estimé / an" value={fmt(valLoyers*12+coutEnt+coutSin)} color="#991b1b"/>
              </div>
              <div style={{overflowX:'auto',border:`1px solid ${$border}`,borderRadius:crmRd,background:$bgCard,boxShadow:$shadow}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
                  <thead><tr style={{background:$bgSub}}>{['Véhicule','Immat','Filiale','Loyer/mois','Entretien','Sinistres','PV','Total/an','Km','€/km'].map(h=><th key={h} style={{position:'relative',padding:'12px 10px',textAlign:['Loyer/mois','Entretien','Sinistres','PV','Total/an','Km','€/km'].includes(h)?'right':'left',fontWeight:700,borderBottom:`1px solid ${$border}`,fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.04em',color:$textMut}}>{h}<div onMouseDown={e=>{e.preventDefault();e.stopPropagation();const th=e.target.closest('th');if(!th)return;const startX=e.clientX,startW=th.offsetWidth;document.body.style.cursor='col-resize';document.body.style.userSelect='none';const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;cursor:col-resize;z-index:99999;';document.body.appendChild(ov);const mm=ev=>{const w=Math.max(40,startW+ev.clientX-startX);th.style.minWidth=w+'px';th.style.width=w+'px';};const mu=()=>{document.body.style.cursor='';document.body.style.userSelect='';document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);ov.remove();};document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);}} onMouseEnter={e=>e.currentTarget.style.background='rgba(128,128,128,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} style={{position:'absolute',right:0,top:0,bottom:0,width:8,cursor:'col-resize',background:'transparent',zIndex:3,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:2,height:'50%',background:'currentColor',opacity:0.15,borderRadius:1,pointerEvents:'none'}}/></div></th>)}</tr></thead>
                  <tbody>{actifs.map((v,idx)=>{const vI=intervs.filter(i=>i.vehiculeId===v.id);const vE=vI.filter(i=>['entretien','revision','reparation','carrosserie','pneumatiques','controle_technique','nettoyage'].includes(i.type)).reduce((s,i)=>s+(i.montantTTC||0),0);const vS=vI.filter(i=>i.type==='sinistre').reduce((s,i)=>s+(i.montantTTC||0),0);const vP=vI.filter(i=>i.type==='contravention').reduce((s,i)=>s+(i.contrav?.montantAmende||0),0);const tot=(v.loyer||0)*12+vE+vS+vP;return <tr key={v.id} style={{borderBottom:`1px solid ${$borderLight}`,background:$bgSub+'60',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background=$bgCardHover} onMouseLeave={e=>e.currentTarget.style.background=$bgSub+'60'}>
                    <td style={{padding:'12px 14px',fontWeight:700,color:$text}}>{v.marque} {v.modele}</td>
                    <td style={{padding:'12px 14px',color:$accent,fontWeight:600,fontSize:'0.82rem'}}>{v.immat||'—'}</td>
                    <td style={{padding:'12px 14px'}}><Tag label={getFilLabel(v.filialeId)} color={getFilColor(v.filialeId)} size="s"/></td>
                    <td style={{padding:'12px 14px',textAlign:'right',color:$textSec}}>{v.loyer>0?`${v.loyer}€`:'—'}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',color:$textSec}}>{vE>0?`${vE}€`:'—'}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',color:vS>0?'#dc2626':''}}>{vS>0?`${vS}€`:'—'}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',color:vP>0?'#c2410c':''}}>{vP>0?`${vP}€`:'—'}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,color:$danger}}>{fmt(tot)}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',color:$textSec}}>{fmtN(v.km)}</td>
                    <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,color:$accent}}>{v.km>0?(tot/v.km).toFixed(2)+'€':'—'}</td>
                  </tr>;})}</tbody>
                </table>
              </div>
            </>}

            </div>{/* end tab content wrapper */}

            {/* ═══ DETAIL + EDIT MODAL ═══ */}
            {autoDetail && (()=>{
              const v = data.find(d=>d.id===autoDetail); if(!v) return null;
              const isEd = autoEdit && autoEdit.id === v.id; const ev = isEd ? autoEdit : v;
              const vInterv = intervs.filter(i=>i.vehiculeId===v.id).sort((a,b)=>new Date(b.dateDebut)-new Date(a.dateDebut));
              const F = ({l,k,type,opts}) => <div style={{padding:'8px 12px',background:$bgSub,borderRadius:Math.max(crmRd-4,2)}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em'}}>{l}</div>
                {isEd?(type==='select'?<select value={ev[k]||''} onChange={e=>setAutoEdit({...autoEdit,[k]:e.target.value})} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}><option value="">—</option>{opts.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select>:type==='date'?<input type="date" value={ev[k]||''} onChange={e=>setAutoEdit({...autoEdit,[k]:e.target.value})} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.9rem',boxSizing:'border-box'}}/>:type==='number'?<input type="number" value={ev[k]??''} onChange={e=>setAutoEdit({...autoEdit,[k]:e.target.value?parseFloat(e.target.value):null})} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.9rem',boxSizing:'border-box'}}/>:<input value={ev[k]||''} onChange={e=>setAutoEdit({...autoEdit,[k]:e.target.value})} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.9rem',boxSizing:'border-box'}}/>):<div style={{fontSize:'0.82rem',fontWeight:600,color:$text,marginTop:2}}>{type==='select'&&opts?getLbl(opts,v[k]):v[k]||'—'}</div>}
              </div>;
              return <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>{setAutoDetail(null);setAutoEdit(null);}}>
                <div style={{background:$bgCard,width:'95%',maxWidth:820,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                  <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>
                    <div><div style={{fontWeight:700,fontSize:'1rem',color:$text}}>{v.marque} {v.modele}</div><div style={{fontSize:'0.82rem',color:$accent,fontWeight:600}}>{v.immat} · {v.id}</div></div>
                    <div style={{display:'flex',gap:6}}>
                      {!isEd?<button onClick={e=>{e.stopPropagation();setAutoEdit({...v});}} style={{padding:'6px 14px',border:`1px solid ${$border}`,borderRadius:crmRd,background:'transparent',color:$textSec,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>MODIFIER</button>:
                      <><button onClick={()=>{saveAuto(data.map(d=>d.id===autoEdit.id?autoEdit:d));setAutoEdit(null);}} style={{padding:'6px 14px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>SAUVER</button>
                      <button onClick={()=>setAutoEdit(null)} style={{padding:'6px 16px',border:`1px solid ${$border}`,background:$bgCard,fontWeight:600,fontSize:'0.9rem',cursor:'pointer'}}>ANNULER</button></>}
                      <button onClick={()=>{setAutoDetail(null);setAutoEdit(null);}} style={{background:'none',border:'none',fontSize:'1rem',cursor:'pointer',color:$textMut,fontWeight:300}}>✕</button>
                    </div>
                  </div>
                  <div style={{padding:'16px 20px'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
                      <F l="Marque" k="marque"/><F l="Modèle" k="modele"/><F l="Immatriculation" k="immat"/>
                      <F l="Type" k="typeVehicule" type="select" opts={AUTO_TYPES}/><F l="Énergie" k="energie" type="select" opts={ENERGIES}/><F l="Boîte" k="boite" type="select" opts={BOITES}/>
                      <F l="Statut" k="statutAdmin" type="select" opts={STATUT_ADMIN}/><F l="Usage" k="statutUsage" type="select" opts={STATUT_USAGE}/><F l="Couleur" k="couleur"/>
                      {/* Filiale */}
                      <div style={{padding:'8px 12px',background:$bgSub,borderRadius:Math.max(crmRd-4,2)}}>
                        <div style={{fontSize:'0.75rem',fontWeight:800,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>Filiale</div>
                        {isEd?<select value={ev.filialeId||''} onChange={e=>setAutoEdit({...autoEdit,filialeId:isNaN(e.target.value)?e.target.value:parseInt(e.target.value)})} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.88rem',background:$bgCard}}>
                          <option value="">—</option>{FILIALE_FILTER_OPTIONS.map(f=><option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}
                        </select>:<div style={{fontSize:'0.88rem',fontWeight:700,color:getFilColor(v.filialeId),marginTop:1}}>{getFilLabel(v.filialeId)}</div>}
                      </div>
                      {/* Conducteur */}
                      <div style={{padding:'8px 12px',background:$bgSub,borderRadius:Math.max(crmRd-4,2)}}>
                        <div style={{fontSize:'0.75rem',fontWeight:800,color:$textMut,textTransform:'uppercase',letterSpacing:'0.06em'}}>Conducteur</div>
                        {isEd?<select value={ev.conducteurId||''} onChange={e=>{const eid=e.target.value||null;const emp=eid?employes.find(x=>x.id===eid):null;setAutoEdit({...autoEdit,conducteurId:eid,...(emp&&emp.filialeId?{filialeId:emp.filialeId}:{})});}} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.88rem',background:$bgCard}}>
                          <option value="">— Aucun —</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom} ({getFilLabel(e.filialeId)})</option>)}
                        </select>:<div style={{fontSize:'0.82rem',fontWeight:600,color:$text,marginTop:2}}>{v.conducteurId?empNom(v.conducteurId):'— Non affecté —'}</div>}
                      </div>
                      <F l="Entité détentrice" k="entiteDetentrice" type="select" opts={ENTITES}/><F l="Acquisition" k="typeAcquisition" type="select" opts={TYPE_ACQUIS}/><F l="Contrat" k="contrat"/>
                      <F l="Début contrat" k="dateDebutContrat" type="date"/><F l="Fin contrat" k="dateFinContrat" type="date"/><F l="Date MEC" k="dateMEC" type="date"/>
                      <F l="Carte carburant" k="carteCarburant"/><F l="Km" k="km" type="number"/><F l="Loyer €/mois" k="loyer" type="number"/>
                      <F l="AEN €/mois" k="aen" type="number"/><F l="CT" k="ctStatut" type="select" opts={CT_STATUTS}/><F l="Prochain CT" k="ctDateProchain" type="date"/>
                      <F l="Assureur" k="assureur"/><F l="N° véhicule" k="nVehicule" type="number"/>
                    </div>
                    {(v.notes||isEd)&&<div style={{padding:'8px 12px',background:$bgSub,borderRadius:Math.max(crmRd-4,2),marginBottom:16}}>
                      <div style={{fontSize:'0.76rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Notes</div>
                      {isEd?<textarea value={ev.notes||''} onChange={e=>setAutoEdit({...autoEdit,notes:e.target.value})} rows={2} style={{width:'100%',padding:'4px 6px',border:`1px solid ${$border}`,fontSize:'0.9rem',resize:'vertical',boxSizing:'border-box'}}/>:<div style={{fontSize:'0.88rem',color:$text}}>{v.notes}</div>}
                    </div>}
                    <SectionTitle>Interventions ({vInterv.length})</SectionTitle>
                    {vInterv.length>0?<div style={{display:'flex',flexDirection:'column',gap:6}}>{vInterv.slice(0,10).map(i=>{const it=INTERV_TYPES.find(t=>t.id===i.type)||{};return <div key={i.id} style={{display:'flex',gap:10,padding:'8px 12px',background:$bgCard,borderLeft:showBorderAccent?`3px solid ${it.color||'#64748b'}`:'none',borderRadius:Math.max(crmRd-4,2),border:`1px solid ${$borderLight||$border}`}}>
                      <span style={{minWidth:72,fontSize:'0.76rem',color:$textSec,fontWeight:700,fontFamily:'monospace'}}>{i.dateDebut}</span>
                      <span style={{flex:1,fontSize:'0.9rem'}}><strong>{it.label}</strong>{i.montantTTC>0?` — ${i.montantTTC}€`:''} <span style={{color:$textMut}}>{i.commentaire}</span></span>
                      <Tag label={i.statut==='termine'?'FAIT':'EN COURS'} color={i.statut==='termine'?'#16a34a':'#ea580c'} size="s"/>
                    </div>;})}</div>:<div style={{color:$textMut,fontSize:'0.82rem'}}>Aucune intervention.</div>}
                  </div>
                </div>
              </div>;
            })()}

            {/* ═══ NEW VEHICLE MODAL ═══ */}
            {autoEdit && !autoDetail && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setAutoEdit(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:720,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,fontWeight:700,fontSize:'0.92rem',color:$text,borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>NOUVEAU VÉHICULE</div>
                <div style={{padding:'16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                  {[{l:'Marque',k:'marque'},{l:'Modèle',k:'modele'},{l:'Immat',k:'immat'},{l:'Type',k:'typeVehicule',t:'s',o:AUTO_TYPES},{l:'Énergie',k:'energie',t:'s',o:ENERGIES},{l:'Boîte',k:'boite',t:'s',o:BOITES},{l:'Statut',k:'statutAdmin',t:'s',o:STATUT_ADMIN},{l:'Usage',k:'statutUsage',t:'s',o:STATUT_USAGE},{l:'Couleur',k:'couleur'},{l:'Entité détentrice',k:'entiteDetentrice',t:'s',o:ENTITES},{l:'Acquisition',k:'typeAcquisition',t:'s',o:TYPE_ACQUIS},{l:'Contrat',k:'contrat'},{l:'Début',k:'dateDebutContrat',t:'d'},{l:'Fin',k:'dateFinContrat',t:'d'},{l:'MEC',k:'dateMEC',t:'d'},{l:'Carte carburant',k:'carteCarburant'},{l:'Km',k:'km',t:'n'},{l:'Loyer',k:'loyer',t:'n'},{l:'AEN',k:'aen',t:'n'},{l:'CT',k:'ctStatut',t:'s',o:CT_STATUTS},{l:'Prochain CT',k:'ctDateProchain',t:'d'},{l:'Assureur',k:'assureur'}].map((f,i)=><div key={i}>
                    <label style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>{f.l}</label>
                    {f.t==='s'?<select value={autoEdit[f.k]||''} onChange={e=>setAutoEdit({...autoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}><option value="">—</option>{f.o.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select>:
                    f.t==='d'?<input type="date" value={autoEdit[f.k]||''} onChange={e=>setAutoEdit({...autoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>:
                    f.t==='n'?<input type="number" value={autoEdit[f.k]??''} onChange={e=>setAutoEdit({...autoEdit,[f.k]:e.target.value?parseFloat(e.target.value):null})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>:
                    <input value={autoEdit[f.k]||''} onChange={e=>setAutoEdit({...autoEdit,[f.k]:e.target.value})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',boxSizing:'border-box',background:$bgCard,color:$text,outline:'none'}}/>}
                  </div>)}
                  {/* Filiale */}
                  <div>
                    <label style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>Filiale</label>
                    <select value={autoEdit.filialeId||''} onChange={e=>setAutoEdit({...autoEdit,filialeId:isNaN(e.target.value)?e.target.value:parseInt(e.target.value)})} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
                      <option value="">—</option>{FILIALE_FILTER_OPTIONS.map(f=><option key={f.id} value={f.id}>{f.icon} {f.nom}</option>)}
                    </select>
                  </div>
                  {/* Conducteur */}
                  <div>
                    <label style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:4}}>Conducteur</label>
                    <select value={autoEdit.conducteurId||''} onChange={e=>{const eid=e.target.value||null;const emp=eid?employes.find(x=>x.id===eid):null;setAutoEdit({...autoEdit,conducteurId:eid,...(emp&&emp.filialeId?{filialeId:emp.filialeId}:{})});}} style={{width:'100%',padding:'6px 8px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
                      <option value="">— Aucun —</option>{employes.map(emp=><option key={emp.id} value={emp.id}>{emp.prenom} {emp.nom} ({getFilLabel(emp.filialeId)})</option>)}
                    </select>
                  </div>
                </div>
                <div style={{padding:'12px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'flex-end',gap:6}}>
                  <button onClick={()=>setAutoEdit(null)} style={{padding:'7px 16px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button>
                  <button onClick={()=>{saveAuto([...data,autoEdit]);setAutoEdit(null);}} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>CRÉER</button>
                </div>
              </div>
            </div>}

            {/* ═══ ÉTAT DES LIEUX MODAL ═══ */}
            {autoEtatLieux && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}} onClick={()=>setAutoEtatLieux(null)}>
              <div style={{background:$bgCard,width:'95%',maxWidth:720,maxHeight:'90vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
                <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,fontWeight:700,color:$text,borderRadius:`${crmRd}px ${crmRd}px 0 0`}}>ÉTAT DES LIEUX</div>
                <div style={{padding:'16px 20px'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Type</label><select value={autoEtatLieux.type} onChange={e=>setAutoEtatLieux({...autoEtatLieux,type:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="depart">DÉPART — Affectation / Prêt</option><option value="retour">RETOUR — Restitution</option></select></div>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Véhicule</label><select value={autoEtatLieux.vehiculeId} onChange={e=>setAutoEtatLieux({...autoEtatLieux,vehiculeId:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">— Sélectionner —</option>{actifs.map(v=><option key={v.id} value={v.id}>{v.marque} {v.modele} ({v.immat})</option>)}</select></div>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Salarié</label><select value={autoEtatLieux.salarieId} onChange={e=>setAutoEtatLieux({...autoEtatLieux,salarieId:e.target.value,signataire:empNom(e.target.value)})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}><option value="">— Sélectionner —</option>{employes.map(e=><option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>)}</select></div>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Date</label><input type="date" value={autoEtatLieux.date} onChange={e=>setAutoEtatLieux({...autoEtatLieux,date:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem',boxSizing:'border-box'}}/></div>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Kilométrage</label><input type="number" value={autoEtatLieux.km} onChange={e=>setAutoEtatLieux({...autoEtatLieux,km:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem',boxSizing:'border-box'}}/></div>
                    <div><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Carburant</label><select value={autoEtatLieux.carburant} onChange={e=>setAutoEtatLieux({...autoEtatLieux,carburant:e.target.value})} style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem'}}>{['Vide','1/4','1/2','3/4','Plein'].map(o=><option key={o}>{o}</option>)}</select></div>
                  </div>
                  <SectionTitle>Inspection par zone</SectionTitle>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,marginBottom:14,background:$bgSub}}>
                    {EDL_ZONES.map(zone=><div key={zone} style={{display:'flex',alignItems:'center',gap:8,background:$bgCard,padding:'8px 12px'}}>
                      <span style={{fontSize:'0.82rem',fontWeight:700,flex:1}}>{zone}</span>
                      <select value={(autoEtatLieux.zones||{})[zone]||'bon'} onChange={e=>setAutoEtatLieux({...autoEtatLieux,zones:{...autoEtatLieux.zones,[zone]:e.target.value}})} style={{padding:'4px 8px',border:`1px solid ${$border}`,fontSize:'0.9rem'}}>
                        {EDL_ETATS.map(e=><option key={e.id} value={e.id}>{e.label}</option>)}
                      </select>
                    </div>)}
                  </div>
                  <div style={{marginBottom:12}}><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Observations / Dégâts</label><textarea value={autoEtatLieux.observations||''} onChange={e=>setAutoEtatLieux({...autoEtatLieux,observations:e.target.value})} rows={3} placeholder="Rayure, fissure, tache, etc." style={{width:'100%',padding:'8px',border:`1px solid ${$border}`,fontSize:'0.88rem',resize:'vertical',boxSizing:'border-box',marginTop:4}}/></div>
                  <div style={{marginBottom:14}}><label style={{fontSize:'0.78rem',fontWeight:800,color:$textMut,textTransform:'uppercase'}}>Photos / Vidéos</label><div style={{border:`2px dashed ${$border}`,padding:'20px',textAlign:'center',marginTop:4,cursor:'pointer'}}><div style={{fontSize:'0.82rem',fontWeight:600,color:$textSec}}>CLIQUER POUR AJOUTER</div><div style={{fontSize:'0.9rem',color:$textMut}}>Upload photos, capture vidéo, annotations (production)</div></div></div>
                  <div style={{background:$bgSub,padding:'12px 14px',borderLeft:showBorderAccent?`3px solid ${$accent}`:'none',borderRadius:Math.max(crmRd-4,2)}}>
                    <div style={{fontWeight:800,fontSize:'0.9rem',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>Signature</div>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}><span style={{fontSize:'0.82rem'}}>Signataire: <strong>{autoEtatLieux.signataire||'—'}</strong></span><label style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',fontSize:'0.82rem'}}><input type="checkbox" checked={autoEtatLieux.signe} onChange={e=>setAutoEtatLieux({...autoEtatLieux,signe:e.target.checked})}/> Signé</label></div>
                  </div>
                </div>
                <div style={{padding:'12px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'flex-end',gap:6}}>
                  <button onClick={()=>setAutoEtatLieux(null)} style={{padding:'7px 16px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Annuler</button>
                  <button onClick={()=>setAutoEtatLieux(null)} style={{padding:'7px 16px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Enregistrer</button>
                </div>
              </div>
            </div>}

          </div>
        );
}
