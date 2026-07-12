import React, { useState, useEffect, useRef } from 'react';
import { Calculator, TrendingUp, DollarSign, Award, Users, BarChart3, Target, Briefcase, Search } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ROLES, NIVEAUX_HIERARCHIQUES, SERVICES, NIVEAUX_ACCES, PERMISSION_LEVELS, DEFAULT_PERMISSIONS, INITIAL_USERS } from './data/constants.js';
import { AO_RAW, AO_EXT, getExt, DOS_IDS, AFF_IDS, getDosId, getAffId, getInternalId, getNextDosNum, SOUS_ELEMENTS } from './data/ao.js';
import { CRM_THEMES, CRM_TINTS, CRM_TINT_BG, CRM_RAD, CRM_FIL_ACC, CRM_FIL_NAMES, CRM_FIL_ICONS } from './data/theme.js';
import { DATA_VERSION, usePersistedState } from './hooks/usePersistedState.js';
import { FILIALES_INIT, DONNEES_FIN_INIT, COLLABORATEURS_INIT, EMPLOYES_INIT, CHANTIERS_INIT, POSTES_INIT } from './data/defaults.js';
import TabIdentite from './tabs/TabIdentite.jsx';
import TabSupports from './tabs/TabSupports.jsx';
import TabReceptionFactures from './tabs/TabReceptionFactures.jsx';
import TabOutils from './tabs/TabOutils.jsx';
import TabConformite from './tabs/TabConformite.jsx';
import TabSuiviPresta from './tabs/TabSuiviPresta.jsx';
import TabContrats from './tabs/TabContrats.jsx';
import TabBonCommande from './tabs/TabBonCommande.jsx';
import TabCataloguePresta from './tabs/TabCataloguePresta.jsx';
import TabWeb from './tabs/TabWeb.jsx';
import TabTickets from './tabs/TabTickets.jsx';
import TabAssurances from './tabs/TabAssurances.jsx';
import TabCalendrierSvc from './tabs/TabCalendrierSvc.jsx';
import TabOrdresTravail from './tabs/TabOrdresTravail.jsx';
import TabLitiges from './tabs/TabLitiges.jsx';
import TabParcInfo from './tabs/TabParcInfo.jsx';
import TabGuide from './tabs/TabGuide.jsx';
import TabSuivi from './tabs/TabSuivi.jsx';
import TabAdmin from './tabs/TabAdmin.jsx';
import TabProcessusSvc from './tabs/TabProcessusSvc.jsx';
import TabAnalytique from './tabs/TabAnalytique.jsx';
import TabEzelTableau from './tabs/TabEzelTableau.jsx';
import TabDonneesRef from './tabs/TabDonneesRef.jsx';
import TabFormation from './tabs/TabFormation.jsx';
import TabOffboarding from './tabs/TabOffboarding.jsx';
import TabDossierRh from './tabs/TabDossierRh.jsx';
import TabPostes from './tabs/TabPostes.jsx';
import TabSvcKpi from './tabs/TabSvcKpi.jsx';
import TabPresentation from './tabs/TabPresentation.jsx';
import TabTresorerie from './tabs/TabTresorerie.jsx';
import TabKpiDashboard from './tabs/TabKpiDashboard.jsx';
import TabRoadmap from './tabs/TabRoadmap.jsx';
import TabAbsences from './tabs/TabAbsences.jsx';
import TabMateriel from './tabs/TabMateriel.jsx';
import TabFactInterne from './tabs/TabFactInterne.jsx';
import TabFactExterne from './tabs/TabFactExterne.jsx';
import TabSimulateur from './tabs/TabSimulateur.jsx';
import TabParcAutomobile from './tabs/TabParcAutomobile.jsx';
import TabPresentationGroupe from './tabs/TabPresentationGroupe.jsx';
import TabOnboarding from './tabs/TabOnboarding.jsx';
import TabCollaborateurs from './tabs/TabCollaborateurs.jsx';
import TabPlanningGantt from './tabs/TabPlanningGantt.jsx';
import TabBudget from './tabs/TabBudget.jsx';
import TabVeilleAo from './tabs/TabVeilleAo.jsx';
import TabOrganigramme from './tabs/TabOrganigramme.jsx';
import TabRecrutement from './tabs/TabRecrutement.jsx';
import TabSuiviDossiers from './tabs/TabSuiviDossiers.jsx';
import TabCrmCommercial from './tabs/TabCrmCommercial.jsx';
import TabDashboard from './tabs/TabDashboard.jsx';

// ═══ THEME SYSTEM ═══
// (CRM_THEMES, CRM_TINTS, CRM_TINT_BG, CRM_RAD, CRM_FIL_ACC, CRM_FIL_NAMES, CRM_FIL_ICONS → ./data/theme.js — modularisation étape 3)

// Error boundary pour isoler les crashes de widgets individuels
class WidgetErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('Widget crash:', this.props.name, error, info); }
  render() {
    if (this.state.hasError) {
      return <div style={{padding:16, background:$danger+'12', borderRadius:12, border:'1px solid #fca5a5', color:'#dc2626', fontSize:'0.92rem', width:'100%'}}>
        <span style={{fontWeight:700}}>⚠️ Erreur widget: {this.props.name}</span>
        <button onClick={() => this.setState({hasError: false, error: null})} style={{marginLeft:12, padding:'4px 12px', borderRadius:6, border:'1px solid #fca5a5', background:'white', cursor:'pointer', fontSize:'0.85rem'}}>Réessayer</button>
      </div>;
    }
    return this.props.children;
  }
}

// Nouveau barème basé sur l'écart avec l'EBE Cible (système relatif)
// L'EBE cible varie selon le niveau
const baremeRelatif = [
  { ecartMin: -999, ecartMax: -0.001, coeff: 0, label: "< Cible", emoji: "❌", commentaire: "Objectif non atteint" },
  { ecartMin: 0, ecartMax: 0.019, coeff: 0.5, label: "Cible atteinte", emoji: "✅", commentaire: "Objectif atteint (50% variable)" },
  { ecartMin: 0.02, ecartMax: 0.039, coeff: 0.6, label: "Cible +2pts", emoji: "●", commentaire: "Légèrement au-dessus" },
  { ecartMin: 0.04, ecartMax: 0.059, coeff: 0.75, label: "Cible +4pts", emoji: "✓", commentaire: "Bonne performance" },
  { ecartMin: 0.06, ecartMax: 0.079, coeff: 0.9, label: "Cible +6pts", emoji: "🌟", commentaire: "Très bonne performance" },
  { ecartMin: 0.08, ecartMax: 0.099, coeff: 1.0, label: "Cible +8pts", emoji: "⭐", commentaire: "Excellente performance (100%)" },
  { ecartMin: 0.10, ecartMax: 0.119, coeff: 1.1, label: "Cible +10pts", emoji: "🏆", commentaire: "Performance remarquable" },
  { ecartMin: 0.12, ecartMax: 0.149, coeff: 1.2, label: "Cible +12pts", emoji: "💎", commentaire: "Performance exceptionnelle" },
  { ecartMin: 0.15, ecartMax: 999, coeff: 1.3, label: "Cible +15pts", emoji: "🚀", commentaire: "PERFORMANCE HORS NORME" }
];

// Définition des filiales avec leurs grilles respectives
const filiales = {
  roulotte: {
    nom: "La Roulotte (Location Roulottes & Matériel)",
    icon: "🚛",
    holdingParent: "INVEST LOC",
    grille: [
      { niveau: "XXS", nom: "Alvéole Apprenti", posteInterne: "Butineur", posteExterne: "Assistant Commercial Location / Préparateur", caCible: "0–0,3 M€", caMin: 0, caMax: 300000, fixe: 30000, prime: 2000, plafond: 34000, ebeCible: 0.05 },
      { niveau: "XS", nom: "Alvéole", posteInterne: "Collecteur", posteExterne: "Commercial Location / Magasinier", caCible: "0,3–0,6 M€", caMin: 300000, caMax: 600000, fixe: 35000, prime: 2500, plafond: 45000, ebeCible: 0.08 },
      { niveau: "S", nom: "Rayon Junior", posteInterne: "Bâtisseur", posteExterne: "Commercial Location Confirmé / Gestionnaire de Parc", caCible: "0,6–1 M€", caMin: 600000, caMax: 1000000, fixe: 38000, prime: 4000, plafond: 52000, ebeCible: 0.1 },
      { niveau: "M", nom: "Rayon Senior", posteInterne: "Maître-Bâtisseur", posteExterne: "Responsable Commercial / Chef de Parc", caCible: "1–2 M€", caMin: 1000000, caMax: 2000000, fixe: 40000, prime: 6000, plafond: 65000, ebeCible: 0.12 },
      { niveau: "L", nom: "Ruche Junior", posteInterne: "Gardien de Ruche", posteExterne: "Chef de Dépôt / Responsable d'Agence Location", caCible: "2–3,5 M€", caMin: 2000000, caMax: 3500000, fixe: 42000, prime: 8000, plafond: 75000, ebeCible: 0.14 },
      { niveau: "XL", nom: "Ruche Senior", posteInterne: "Régisseur de Ruche", posteExterne: "Directeur d'Agence Location / Chef d'Agence", caCible: "3,5–5 M€", caMin: 3500000, caMax: 5000000, fixe: 45000, prime: 10000, plafond: 85000, ebeCible: 0.15 },
      { niveau: "XXL", nom: "Rucher Junior", posteInterne: "Maître-Apiculteur", posteExterne: "Directeur d'Agence Location / Directeur de Zone", caCible: "5–8 M€", caMin: 5000000, caMax: 8000000, fixe: 48000, prime: 12000, plafond: 105000, ebeCible: 0.16 },
      { niveau: "XXXL", nom: "Rucher Senior", posteInterne: "Roi / Reine de la Ruche", posteExterne: "Directeur Multi-Sites Location / Directeur d'Exploitation", caCible: "8–12 M€", caMin: 8000000, caMax: 12000000, fixe: 50000, prime: 15000, plafond: 135000, ebeCible: 0.17 }
    ]
  },
  echafaudage: {
    nom: "Échafaudage (Location + Montage/Démontage)",
    icon: "🏗️",
    holdingParent: "INVEST LOC",
    grille: [
      { niveau: "XXS", nom: "Alvéole Apprenti", posteInterne: "Butineur", posteExterne: "Assistant Conducteur de Travaux / Technicien", caCible: "0–0,5 M€", caMin: 0, caMax: 500000, fixe: 32000, prime: 2000, plafond: 35500, ebeCible: 0.05 },
      { niveau: "XS", nom: "Alvéole", posteInterne: "Collecteur", posteExterne: "Conducteur de Travaux / Chef de Chantier", caCible: "0,5–1 M€", caMin: 500000, caMax: 1000000, fixe: 40000, prime: 3000, plafond: 51000, ebeCible: 0.08 },
      { niveau: "S", nom: "Rayon Junior", posteInterne: "Bâtisseur", posteExterne: "Conducteur de Travaux Confirmé / Chargé d'Affaires", caCible: "1–1,5 M€", caMin: 1000000, caMax: 1500000, fixe: 40000, prime: 5000, plafond: 57000, ebeCible: 0.1 },
      { niveau: "M", nom: "Rayon Senior", posteInterne: "Maître-Bâtisseur", posteExterne: "Chargé d'Affaires Confirmé / Chef de Groupe", caCible: "1,5–3 M€", caMin: 1500000, caMax: 3000000, fixe: 40000, prime: 7000, plafond: 72000, ebeCible: 0.12 },
      { niveau: "L", nom: "Ruche Junior", posteInterne: "Gardien de Ruche", posteExterne: "Directeur de Travaux / Chef de Groupe Senior", caCible: "3–5 M€", caMin: 3000000, caMax: 5000000, fixe: 40000, prime: 10000, plafond: 80000, ebeCible: 0.15 },
      { niveau: "XL", nom: "Ruche Senior", posteInterne: "Régisseur de Ruche", posteExterne: "Responsable d'Agence / Chef d'Agence", caCible: "5–7,5 M€", caMin: 5000000, caMax: 7500000, fixe: 40000, prime: 10000, plafond: 90000, ebeCible: 0.1 },
      { niveau: "XXL", nom: "Rucher Junior", posteInterne: "Maître-Apiculteur", posteExterne: "Directeur d'Agence / Directeur d'Exploitation Junior", caCible: "7,5–12 M€", caMin: 7500000, caMax: 12000000, fixe: 45000, prime: 12000, plafond: 112000, ebeCible: 0.12 },
      { niveau: "XXXL", nom: "Rucher Senior / BU", posteInterne: "Roi / Reine de la Ruche", posteExterne: "Directeur d'Exploitation / Directeur Multi-Sites", caCible: "12–15 M€", caMin: 12000000, caMax: 15000000, fixe: 45000, prime: 15000, plafond: 145000, ebeCible: 0.15 }
    ]
  },
  ezel: {
    nom: "Ezel (Entreprise Générale de Bâtiment)",
    icon: "🏢",
    holdingParent: "INVEST EXE",
    grille: [
      { niveau: "XXS", nom: "Alvéole Apprenti", posteInterne: "Butineur", posteExterne: "Assistant Conducteur de Travaux / Technicien", caCible: "0–0,5 M€", caMin: 0, caMax: 500000, fixe: 32000, prime: 2000, plafond: 35500, ebeCible: 0.05 },
      { niveau: "XS", nom: "Alvéole", posteInterne: "Collecteur", posteExterne: "Conducteur de Travaux / Chef de Chantier", caCible: "0,5–1 M€", caMin: 500000, caMax: 1000000, fixe: 40000, prime: 3000, plafond: 51000, ebeCible: 0.08 },
      { niveau: "S", nom: "Rayon Junior", posteInterne: "Bâtisseur", posteExterne: "Conducteur de Travaux Confirmé / Chargé d'Affaires", caCible: "1–1,5 M€", caMin: 1000000, caMax: 1500000, fixe: 40000, prime: 5000, plafond: 57000, ebeCible: 0.1 },
      { niveau: "M", nom: "Rayon Senior", posteInterne: "Maître-Bâtisseur", posteExterne: "Chargé d'Affaires Confirmé / Chef de Groupe", caCible: "1,5–3 M€", caMin: 1500000, caMax: 3000000, fixe: 40000, prime: 7000, plafond: 72000, ebeCible: 0.12 },
      { niveau: "L", nom: "Ruche Junior", posteInterne: "Gardien de Ruche", posteExterne: "Directeur de Travaux / Chef de Groupe Senior", caCible: "3–5 M€", caMin: 3000000, caMax: 5000000, fixe: 40000, prime: 10000, plafond: 80000, ebeCible: 0.15 },
      { niveau: "XL", nom: "Ruche Senior", posteInterne: "Régisseur de Ruche", posteExterne: "Responsable d'Agence / Chef d'Agence", caCible: "5–7,5 M€", caMin: 5000000, caMax: 7500000, fixe: 40000, prime: 10000, plafond: 90000, ebeCible: 0.1 },
      { niveau: "XXL", nom: "Rucher Junior", posteInterne: "Maître-Apiculteur", posteExterne: "Directeur d'Agence / Directeur d'Exploitation Junior", caCible: "7,5–12 M€", caMin: 7500000, caMax: 12000000, fixe: 45000, prime: 12000, plafond: 112000, ebeCible: 0.12 },
      { niveau: "XXXL", nom: "Rucher Senior / BU", posteInterne: "Roi / Reine de la Ruche", posteExterne: "Directeur d'Exploitation / Directeur Multi-Sites", caCible: "12–15 M€", caMin: 12000000, caMax: 15000000, fixe: 45000, prime: 15000, plafond: 145000, ebeCible: 0.15 }
    ]
  },
  etancheite: {
    nom: "L'Étanchéité (Travaux d'étanchéité)",
    icon: "💧",
    holdingParent: "INVEST EXE",
    grille: [
      { niveau: "XXS", nom: "Alvéole Apprenti", posteInterne: "Butineur", posteExterne: "Aide-Étancheur / Apprenti", caCible: "0–0,3 M€", caMin: 0, caMax: 300000, fixe: 28000, prime: 1500, plafond: 32000, ebeCible: 0.06 },
      { niveau: "XS", nom: "Alvéole", posteInterne: "Collecteur", posteExterne: "Étancheur Qualifié", caCible: "0,3–0,7 M€", caMin: 300000, caMax: 700000, fixe: 34000, prime: 2500, plafond: 42000, ebeCible: 0.08 },
      { niveau: "S", nom: "Rayon Junior", posteInterne: "Bâtisseur", posteExterne: "Chef d'Équipe Étanchéité", caCible: "0,7–1,2 M€", caMin: 700000, caMax: 1200000, fixe: 38000, prime: 4000, plafond: 52000, ebeCible: 0.10 },
      { niveau: "M", nom: "Rayon Senior", posteInterne: "Maître-Bâtisseur", posteExterne: "Conducteur de Travaux Étanchéité", caCible: "1,2–2,5 M€", caMin: 1200000, caMax: 2500000, fixe: 40000, prime: 6000, plafond: 65000, ebeCible: 0.12 },
      { niveau: "L", nom: "Ruche Junior", posteInterne: "Gardien de Ruche", posteExterne: "Chargé d'Affaires Étanchéité", caCible: "2,5–4 M€", caMin: 2500000, caMax: 4000000, fixe: 42000, prime: 8000, plafond: 78000, ebeCible: 0.14 },
      { niveau: "XL", nom: "Ruche Senior", posteInterne: "Régisseur de Ruche", posteExterne: "Responsable d'Agence Étanchéité", caCible: "4–6 M€", caMin: 4000000, caMax: 6000000, fixe: 45000, prime: 10000, plafond: 88000, ebeCible: 0.15 },
      { niveau: "XXL", nom: "Rucher Junior", posteInterne: "Maître-Apiculteur", posteExterne: "Directeur d'Agence Étanchéité", caCible: "6–10 M€", caMin: 6000000, caMax: 10000000, fixe: 48000, prime: 12000, plafond: 110000, ebeCible: 0.16 },
      { niveau: "XXXL", nom: "Rucher Senior", posteInterne: "Roi / Reine de la Ruche", posteExterne: "Directeur Multi-Sites Étanchéité", caCible: "10–15 M€", caMin: 10000000, caMax: 15000000, fixe: 50000, prime: 15000, plafond: 140000, ebeCible: 0.17 }
    ]
  }
};

// (ROLES, NIVEAUX_HIERARCHIQUES, SERVICES, NIVEAUX_ACCES, PERMISSION_LEVELS,
//  DEFAULT_PERMISSIONS, INITIAL_USERS → déplacés dans ./data/constants.js — modularisation étape 1)

// === PERSISTANCE window.storage (artifacts Claude) ===
// (DATA_VERSION, usePersistedState → ./hooks/usePersistedState.js — modularisation étape 4)

const SimulateurRuches = () => {
  // === AUTH STATES ===
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const u = INITIAL_USERS.find(u => u.id === 'USR001');
    return u || null;
  });
  const [users, setUsers] = usePersistedState('users', INITIAL_USERS);
  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ ancien: '', nouveau: '', confirmation: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [greetingLine1, setGreetingLine1] = useState('');
  const [greetingLine2, setGreetingLine2] = useState('');
  // Auto-greeting on mount (for auto-login)
  React.useEffect(() => {
    if (isLoggedIn && currentUser && !greetingLine1) {
      const g = computeGreeting(currentUser.prenom || currentUser.login);
      setGreetingLine1(g.line1);
      setGreetingLine2(g.line2);
    }
  }, [isLoggedIn, currentUser]);

  // Smart greeting helper
  const computeGreeting = (prenom) => {
    const h = new Date().getHours();
    const salut = (h >= 5 && h < 18) ? 'Bonjour' : 'Bonsoir';
    const todayKey = new Date().toISOString().slice(0, 10);
    const storageKey = 'oy_last_login_date';
    let isReturn = false;
    try {
      const last = localStorage.getItem(storageKey);
      if (last === todayKey) isReturn = true;
      localStorage.setItem(storageKey, todayKey);
    } catch(e) {}
    if (isReturn) {
      const variants = [`Bon retour,  ${prenom} !`, `Content de te revoir,  ${prenom} !`];
      return { line1: variants[Math.floor(Math.random() * variants.length)], line2: '' };
    }
    return { line1: `${salut} ${prenom} !`, line2: 'Bienvenue au Grand Rucher.' };
  };

  // Login
  const handleLogin = () => {
    const user = users.find(u => u.login === loginForm.login && u.password === loginForm.password && u.actif);
    if (user) {
      const updated = {...user, derniereConnexion: new Date().toISOString()};
      setUsers(prev => prev.map(u => u.id === user.id ? updated : u));
      setCurrentUser(updated);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
      setLoginForm({ login: '', password: '' });
      setOngletActif('dashboard');
      const g = computeGreeting(updated.prenom || updated.login);
      setGreetingLine1(g.line1);
      setGreetingLine2(g.line2);
    } else {
      setLoginError('Identifiant ou mot de passe incorrect');
    }
  };

  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); setShowChangePassword(false); setShowLoginModal(false); setOngletActif('presentation_groupe'); };

  const handleChangePassword = () => {
    if (!currentUser) return;
    if (passwordForm.ancien !== currentUser.password) { setPasswordMsg('❌ Ancien mot de passe incorrect'); return; }
    if (passwordForm.nouveau.length < 4) { setPasswordMsg('❌ Le nouveau mot de passe doit faire au moins 4 caractères'); return; }
    if (passwordForm.nouveau !== passwordForm.confirmation) { setPasswordMsg('❌ La confirmation ne correspond pas'); return; }
    const updated = {...currentUser, password: passwordForm.nouveau};
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    setCurrentUser(updated);
    setPasswordMsg('✅ Mot de passe modifié avec succès !');
    setPasswordForm({ ancien: '', nouveau: '', confirmation: '' });
    setTimeout(() => { setPasswordMsg(''); setShowChangePassword(false); }, 2000);
  };

  // Helpers permissions
  const canView = (ongletId) => {
    if (!currentUser) return false;
    if (['crm_commercial', 'ezel_tableau', 'suivi_dossiers', 'kpi_dashboard', 'veille_ao', 'svc_kpi', 'planning_gantt', 'calendrier_svc', 'processus_svc', 'guide', 'presentation_groupe',
      'roadmap', 'fact_interne', 'fact_externe', 'budget', 'tresorerie', 'analytique',
      'recrutement', 'onboarding', 'offboarding', 'formation', 'absences', 'dossier_rh',
      'bon_commande', 'suivi_presta', 'reception_factures', 'catalogue_presta',
      'outils', 'tickets',
      'contrats', 'litiges', 'assurances', 'conformite',
      'ordres_travail', 'materiel', 'parc_automobile', 'donnees_ref', 'parc_info',
      'identite', 'supports', 'web'
    ].includes(ongletId)) return true;
    const perm = currentUser.permissions[ongletId];
    return perm === 'read' || perm === 'write';
  };
  const canEdit = (ongletId) => {
    if (!currentUser) return false;
    return currentUser.permissions[ongletId] === 'write';
  };
  const isAdmin = () => currentUser && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN');
  const isSuperAdmin = () => currentUser && currentUser.role === 'SUPER_ADMIN';

  const [ongletActif, setOngletActif] = useState('presentation_groupe');
  
  // Navigation Entreprise > Service > Module
  const [navEntreprise, setNavEntreprise] = useState(null);
  const [navService, setNavService] = useState(null);
  const cardsScrollRef = React.useRef(null);
  const dirigeantDragRef = React.useRef(null);
  const filialeDragRef = React.useRef(null);
  const [ordreFilialesPresentation, setOrdreFilialesPresentation] = usePersistedState('ordreFilialesPresentationV6', []);
  const [isScrollDragging, setIsScrollDragging] = useState(false);
  const scrollStartRef = React.useRef({x:0, scrollLeft:0});
  const [ordreEntreprises, setOrdreEntreprises] = usePersistedState('ordreEntreprises', ['groupoy', 'yilmaz', 'ezel', 'roulotte', 'echafaudage', 'etancheite']);
  const [ordreDirigeants, setOrdreDirigeants] = usePersistedState('ordreDirigeants', [
    ['EMP001','EMP002','EMP003','EMP004'],
    ['EMP005','EMP006','EMP015','EMP016']
  ]);

  // Définition des services par entreprise et modules par service
  const SERVICES_CONFIG = {
    'groupoy': {
      nom: 'Group OY', icon: '🐝', desc: 'Vue consolidée du groupe\net pilotage stratégique',
      services: [
        { id: 'direction', label: 'Direction Générale', icon: '🏛️', modules: ['dashboard', 'presentation_groupe', 'presentation', 'admin'] },
        { id: 'finance', label: 'Finance Group', icon: '💰', modules: ['dashboard', 'simulateur', 'suivi'] },
        { id: 'rh', label: 'RH Group', icon: '👥', modules: ['collaborateurs', 'postes', 'organigramme'] }
      ]
    },
    'yilmaz': {
      nom: 'Yilmaz', icon: '🏢', desc: 'Services partagés : Finance,\nRH, IT et Marketing',
      services: [
        { id: 'direction', label: 'Direction Générale', icon: '🏛️', modules: ['dashboard', 'presentation_groupe', 'presentation', 'roadmap'], desc: 'Pilotage stratégique, vision groupe, feuille de route' },
        { id: 'crm', label: 'CRM Groupe', icon: '🤝', modules: ['crm_commercial'], desc: 'Vue consolidée des affaires, contacts et pipeline de toutes les filiales' },
        { id: 'finance', label: 'Finance & Gestion', icon: '🏦', modules: ['dashboard', 'fact_interne', 'fact_externe', 'budget', 'tresorerie', 'analytique'], desc: 'Contrôle de gestion, facturation interne/externe, trésorerie, budget' },
        { id: 'rh', label: 'Ressources Humaines', icon: '👥', modules: ['collaborateurs', 'postes', 'organigramme', 'recrutement', 'onboarding', 'offboarding', 'absences', 'formation', 'dossier_rh', 'presentation', 'simulateur', 'suivi'], desc: 'Personnel, recrutement, rémunération, formation, gestion RH complète' },
        { id: 'execution', label: 'Exécution / Chantiers', icon: '🏗️', modules: ['ordres_travail'], desc: 'Ordres de travail, suivi chantiers (vue consolidée groupe)' },
        { id: 'achats', label: 'Achats & Prestataires', icon: '🤝', modules: ['bon_commande', 'suivi_presta', 'reception_factures', 'catalogue_presta'], desc: 'Bons de commande, freelances, suivi prestataires, facturation' },
        { id: 'it', label: 'IT / Digital', icon: '💻', modules: ['admin', 'outils', 'tickets', 'parc_info', 'donnees_ref'], desc: 'Infrastructure, parc informatique, données de référence' },
        { id: 'logistique', label: 'Logistique & Parc', icon: '🚗', modules: ['parc_automobile', 'materiel'], desc: 'Parc automobile, matériel BTP, état des lieux, TCO' },
        { id: 'juridique', label: 'Juridique & Conformité', icon: '⚖️', modules: ['contrats', 'litiges', 'assurances', 'conformite'], desc: 'Contrats, litiges, assurances, conformité BTP' },
        { id: 'marketing', label: 'Marketing & Communication', icon: '📣', modules: ['identite', 'supports', 'web'], desc: 'Charte graphique, supports commerciaux, présence web' }
      ]
    },
    'ezel': {
      nom: 'Ezel Bâtiment', icon: '🏗️', desc: 'Entreprise générale BTP',
      services: [
        { id: 'tableau', label: 'Tableau de Bord', icon: '📊', modules: ['dashboard', 'ezel_tableau'] },
        { id: 'crm', label: 'CRM Commercial', icon: '🤝', modules: ['crm_commercial'] },
        { id: 'etudes_prix', label: 'Études de Prix', icon: '📐', modules: ['kpi_dashboard', 'veille_ao', 'suivi_dossiers', 'planning_gantt', 'svc_kpi', 'calendrier_svc', 'processus_svc'] },
        { id: 'preparation', label: 'Préparation Chantier', icon: '📋', modules: ['kpi_dashboard', 'svc_kpi', 'ordres_travail', 'planning_gantt', 'processus_svc', 'calendrier_svc'] },
        { id: 'execution', label: 'Exécution Chantier', icon: '🏗️', modules: ['kpi_dashboard', 'ordres_travail', 'planning_gantt', 'svc_kpi', 'calendrier_svc'] },
        { id: 'cloture', label: 'Réception & Clôture', icon: '✅', modules: ['kpi_dashboard', 'svc_kpi', 'processus_svc', 'calendrier_svc'] },
        { id: 'logistique', label: 'Logistique & Parc', icon: '🚗', modules: ['parc_automobile', 'materiel'] },
        { id: 'rh', label: 'Ressources Humaines', icon: '👥', modules: ['collaborateurs', 'postes', 'recrutement', 'onboarding', 'offboarding', 'absences', 'formation', 'dossier_rh'] },
        { id: 'juridique', label: 'Juridique & Conformité', icon: '⚖️', modules: ['contrats', 'litiges', 'assurances', 'conformite'] },
        { id: 'comptabilite', label: 'Comptabilité', icon: '💰', modules: ['kpi_dashboard', 'svc_kpi', 'calendrier_svc'] },
        { id: 'administratif', label: 'Administratif', icon: '🧾', modules: ['kpi_dashboard', 'processus_svc', 'calendrier_svc'] }
      ]
    },
    'roulotte': {
      nom: 'La Roulotte', icon: '🚛', desc: 'Location roulottes & matériel',
      services: [
        { id: 'tableau', label: 'Tableau de Bord', icon: '📊', modules: ['dashboard'] },
        { id: 'crm', label: 'CRM Commercial', icon: '🤝', modules: ['crm_commercial'] },
        { id: 'exploitation', label: 'Exploitation & Planification', icon: '🚛', modules: ['kpi_dashboard', 'ordres_travail', 'svc_kpi', 'planning_gantt', 'calendrier_svc', 'processus_svc'] },
        { id: 'logistique', label: 'Parc & Matériel', icon: '🔧', modules: ['parc_automobile', 'materiel'] },
        { id: 'rh', label: 'Ressources Humaines', icon: '👥', modules: ['collaborateurs', 'postes', 'recrutement', 'onboarding', 'offboarding', 'absences', 'formation', 'dossier_rh'] },
        { id: 'comptabilite', label: 'Comptabilité', icon: '💰', modules: ['kpi_dashboard', 'svc_kpi', 'calendrier_svc'] },
        { id: 'administratif', label: 'Administratif', icon: '🧾', modules: ['kpi_dashboard', 'processus_svc', 'calendrier_svc', 'contrats', 'litiges', 'assurances', 'conformite'] }
      ]
    },
    'echafaudage': {
      nom: "L'Échafaudage", icon: '⚙️', desc: 'Location + Montage échafaudage',
      services: [
        { id: 'tableau', label: 'Tableau de Bord', icon: '📊', modules: ['dashboard'] },
        { id: 'crm', label: 'CRM Commercial', icon: '🤝', modules: ['crm_commercial'] },
        { id: 'exploitation', label: 'Exploitation & Montage', icon: '⚙️', modules: ['kpi_dashboard', 'ordres_travail', 'svc_kpi', 'planning_gantt', 'calendrier_svc', 'processus_svc'] },
        { id: 'logistique', label: 'Parc & Matériel', icon: '🔧', modules: ['materiel', 'parc_automobile'] },
        { id: 'rh', label: 'Ressources Humaines', icon: '👥', modules: ['collaborateurs', 'postes', 'recrutement', 'onboarding', 'offboarding', 'absences', 'formation', 'dossier_rh'] },
        { id: 'comptabilite', label: 'Comptabilité', icon: '💰', modules: ['kpi_dashboard', 'svc_kpi', 'calendrier_svc'] },
        { id: 'administratif', label: 'Administratif', icon: '🧾', modules: ['kpi_dashboard', 'processus_svc', 'calendrier_svc', 'contrats', 'litiges', 'assurances', 'conformite'] }
      ]
    },
    'etancheite': {
      nom: "L'Étanchéité", icon: '💧', desc: "Travaux d'étanchéité\net imperméabilisation",
      services: [
        { id: 'tableau', label: 'Tableau de Bord', icon: '📊', modules: ['dashboard'] },
        { id: 'crm', label: 'CRM Commercial', icon: '🤝', modules: ['crm_commercial'] },
        { id: 'etudes_prix', label: 'Études de Prix', icon: '📐', modules: ['kpi_dashboard', 'svc_kpi', 'suivi_dossiers', 'veille_ao', 'processus_svc', 'planning_gantt'] },
        { id: 'preparation', label: 'Préparation Chantier', icon: '📋', modules: ['kpi_dashboard', 'svc_kpi', 'ordres_travail', 'planning_gantt', 'processus_svc', 'calendrier_svc'] },
        { id: 'execution', label: 'Exécution Chantier', icon: '🔨', modules: ['kpi_dashboard', 'ordres_travail', 'planning_gantt', 'svc_kpi', 'calendrier_svc'] },
        { id: 'cloture', label: 'Réception & Clôture', icon: '✅', modules: ['kpi_dashboard', 'svc_kpi', 'processus_svc', 'calendrier_svc'] },
        { id: 'technique', label: 'Bureau Technique', icon: '🛠️', modules: ['kpi_dashboard', 'svc_kpi', 'calendrier_svc', 'processus_svc'] },
        { id: 'logistique', label: 'Logistique & Parc', icon: '🚗', modules: ['parc_automobile', 'materiel'] },
        { id: 'rh', label: 'Ressources Humaines', icon: '👥', modules: ['collaborateurs', 'postes', 'recrutement', 'onboarding', 'offboarding', 'absences', 'formation', 'dossier_rh'] },
        { id: 'juridique', label: 'Juridique & Conformité', icon: '⚖️', modules: ['contrats', 'litiges', 'assurances', 'conformite'] },
        { id: 'comptabilite', label: 'Comptabilité', icon: '💰', modules: ['kpi_dashboard', 'svc_kpi', 'calendrier_svc'] },
        { id: 'administratif', label: 'Administratif', icon: '🧾', modules: ['kpi_dashboard', 'processus_svc', 'calendrier_svc'] }
      ]
    }
  };

  // Modules visibles selon le service sélectionné (ou tous si pas de filtre)
  const defaultOrdreServices = Object.fromEntries(Object.entries(SERVICES_CONFIG).map(([k, v]) => [k, v.services.map(s => s.id)]));
  const [ordreServices, setOrdreServices] = useState(defaultOrdreServices);
  const [hiddenServicesYilmaz, setHiddenServicesYilmaz] = useState([]);
  const toggleSvcHidden = (e, svcId) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setHiddenServicesYilmaz(prev => {
      const arr = Array.isArray(prev) ? prev : ['juridique', 'marketing'];
      return arr.includes(svcId) ? arr.filter(id => id !== svcId) : [...arr, svcId];
    });
  };
  const getOrderedServices = (entrepriseKey) => {
    const order = ordreServices[entrepriseKey] || [];
    const allSvcs = SERVICES_CONFIG[entrepriseKey]?.services || [];
    const ordered = order.map(id => allSvcs.find(s => s.id === id)).filter(Boolean);
    allSvcs.forEach(s => { if (!ordered.find(o => o.id === s.id)) ordered.push(s); });
    // Filter out hidden services from grid (managed via toggle panel)
    return ordered.filter(s => {
      const hidden = entrepriseKey === 'yilmaz' ? hiddenServicesYilmaz.includes(s.id) : s.hidden;
      return !hidden;
    });
  };

  // Ordre des modules par entreprise+service (persisté)
  const [ordreModules, setOrdreModules] = usePersistedState('ordreModules', {});
  const getOrderedModules = (entrepriseKey, serviceId) => {
    const svc = SERVICES_CONFIG[entrepriseKey]?.services.find(s => s.id === serviceId);
    if (!svc) return [];
    const storeKey = `${entrepriseKey}_${serviceId}`;
    const order = ordreModules[storeKey] || [];
    const allMods = svc.modules;
    const ordered = order.filter(m => allMods.includes(m));
    allMods.forEach(m => { if (!ordered.includes(m)) ordered.push(m); });
    return ordered;
  };

  const getVisibleModules = () => {
    if (!navEntreprise || !navService) return ordreOnglets;
    const config = SERVICES_CONFIG[navEntreprise];
    if (!config) return ordreOnglets;
    const svc = config.services.find(s => s.id === navService);
    if (!svc) return ordreOnglets;
    return ordreOnglets.filter(oid => svc.modules.includes(oid));
  };
  
  // États pour le drag & drop des onglets
  const [ordreOnglets, setOrdreOnglets] = useState(['dashboard', 'collaborateurs', 'postes', 'presentation_groupe', 'presentation', 'organigramme', 'simulateur', 'suivi', 'admin', 'guide', 'kpi_dashboard', 'veille_ao', 'svc_kpi', 'planning_gantt', 'calendrier_svc', 'processus_svc', 'crm_commercial', 'suivi_dossiers']);
  const [crmTab, setCrmTab] = useState('affaires');
  // Suivi des Dossiers AO
  const [aoSearch, setAoSearch] = useState('');
  const [aoStatut, setAoStatut] = useState('actifs');
  const [aoTypeMarche, setAoTypeMarche] = useState('all');
  const [aoTypeProjet, setAoTypeProjet] = useState('all');
  const [aoSort, setAoSort] = useState('deadline');
  const [aoGrouper, setAoGrouper] = useState('s');
  const [aoStatCellOpen, setAoStatCellOpen] = useState(null);
  const [aoStatDropPos, setAoStatDropPos] = useState({top:0,left:0});
  const [aoSelected, setAoSelected] = useState(null);
  const [seStatDrop, setSeStatDrop] = useState(null);
  const [iaDocs, setIaDocs] = useState({});         // {ao_id: [{name, type, content, size}]}
  const [iaGcsPath, setIaGcsPath] = useState({});   // {ao_id: 'gs://bucket/path'}
  const [iaCctpText, setIaCctpText] = useState({}); // {ao_id: 'pasted text'}
  const [iaMode, setIaMode] = useState({});          // {ao_id: 'paste'|'gcs'|'file'}
  const [seTaches, setSeTaches] = useState(null);
  const [aoView, setAoView] = useState('tableau');
  const [dosActiveGrp, setDosActiveGrp] = useState(null);
  const [dosFilterPanelOpen, setDosFilterPanelOpen] = useState(false);
  const [dosSelectedItem, setDosSelectedItem] = useState(null);
  const [dosDrawerWide, setDosDrawerWide] = useState(false);
  const [dosRowBordersH, setDosRowBordersH] = useState(false);
  const [dosRowBordersV, setDosRowBordersV] = useState(false);
  const [aoDrawerWide, setAoDrawerWide] = useState(false);
  const dosTableRef = useRef(null);
  const [ctSearch, setCtSearch] = useState('');
  const [ctStatut, setCtStatut] = useState('all');
  const [ctSelectedContact, setCtSelectedContact] = useState(null);
  const [ctActivities, setCtActivities] = useState({});
  const [ctContactStatuts, setCtContactStatuts] = useState({});
  const [ctNewNote, setCtNewNote] = useState('');
  const [ctNewActType, setCtNewActType] = useState('appel');
  const [ctView, setCtView] = useState('list'); // 'list' | 'cards'
  const [ctGroupBy, setCtGroupBy] = useState('none');
  const [ctPipeFilter, setCtPipeFilter] = useState('all');
  const [ctContactMeta, setCtContactMeta] = useState({}); // {[id]:{pipeline,action,priorité,tc,sect,ref}}
  const [crmFil, setCrmFil] = useState('all');
  const [crmGroupBy, setCrmGroupBy] = useState('phase');
  const [crmMondayKey, setCrmMondayKey] = useState(() => { try { return localStorage.getItem('crm_monday_key') || ''; } catch(e) { return ''; } });
  const [crmAffaires, setCrmAffaires] = useState([]);
  const [crmLoading, setCrmLoading] = useState(false);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmShowArchive, setCrmShowArchive] = useState(false);
  const [crmActiveGroup, setCrmActiveGroup] = useState(null);
  const crmScrollRef = React.useRef(null);
  const [crmCollapsed, setCrmCollapsed] = useState({});
  const [crmColWidths, setCrmColWidths] = useState({code:80,affaire:240,marche:110,equipe:80,montant:100,phase:160,statut:200,litige:90});
  const [prepColWidths, setPrepColWidths] = useState({affaire:220,phase:90,ct:100,avancement:160,statut:130,alertes:180});
  const [prepGroupBy, setPrepGroupBy] = useState('statut');
  const [prepCollapsed, setPrepCollapsed] = useState({});
  const [crmFicheId, setCrmFicheId] = useState(null);
  const [crmFicheTab, setCrmFicheTab] = useState('avancement');
  // Ordre des onglets de la Fiche Chantier — drag & drop reorderable
  const DEFAULT_FTAB_ORDER = ['avancement','intervenants','financier','preparation','planning','consultations','commandes','documents','litiges','activites'];
  const [ficheTabOrder, setFicheTabOrder] = useState(DEFAULT_FTAB_ORDER);
  const [ficheTabDragId, setFicheTabDragId] = useState(null);
  const [ficheTabDragOver, setFicheTabDragOver] = useState(null);
  const ficheTabScrollRef = React.useRef(null);
  const [ganttZoom, setGanttZoom] = useState(38);
  const [gpZoom, setGpZoom] = useState(22);
  const [gpScale, setGpScale] = useState('month'); // 'year'|'quarter'|'month'|'week'|'day'
  const [gpGroupBy, setGpGroupBy] = useState('filiale');
  const [gpFilter, setGpFilter] = useState({fil:'all',phase:'all',marche:'all',retard:false});
  const [gpExpanded, setGpExpanded] = useState({});
  const [gpLabelW, setGpLabelW] = useState(320);
  const [gpFontSize, setGpFontSize] = useState('md'); // 'sm' | 'md' | 'lg'
  const [gpSpacing, setGpSpacing] = useState('normal'); // 'compact' | 'normal' | 'spacious'
  const [gpColCode, setGpColCode] = useState(44); // largeur colonne CODE
  const [gpColDate, setGpColDate] = useState(60); // largeur chaque colonne date
  const gpScrollRef = React.useRef(null);
  const gpResizeRef = React.useRef(null);
  const [drawerWidth, setDrawerWidth] = React.useState(580);
  const [drawerResizing, setDrawerResizing] = React.useState(false);
  const drawerResizeStart = React.useRef(null);
  const startDrawerResize = (e) => {
    e.preventDefault();
    drawerResizeStart.current = {x: e.clientX, w: drawerWidth};
    setDrawerResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const onMove = (ev) => {
      const delta = drawerResizeStart.current.x - ev.clientX;
      const newW = Math.min(Math.max(drawerResizeStart.current.w + delta, 380), Math.floor(window.innerWidth * 0.85));
      setDrawerWidth(newW);
    };
    const onUp = () => {
      setDrawerResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };
  const reorderFicheTabs = (dragId, overId) => {
    if (dragId===overId) return;
    setFicheTabOrder(prev => {
      const arr = [...prev];
      const fi = arr.indexOf(dragId);
      const ti = arr.indexOf(overId);
      if (fi<0||ti<0) return prev;
      arr.splice(fi,1);
      arr.splice(ti,0,dragId);
      return arr;
    });
  };
  // Checklist overrides par affaire — {[aff_id]: {items:[{id,l,done,hidden,types,custom}], hiddenDefaults:[id]}}
  // Architecture Supabase-ready: saveChecklist/loadChecklist sont les seuls points à changer
  const CHECKLIST_KEY = (aff_id) => `groupoy_checklist_${aff_id}`;
  const saveChecklist = (aff_id, data) => {
    try { localStorage.setItem(CHECKLIST_KEY(aff_id), JSON.stringify(data)); } catch(e) {}
  };
  const loadChecklist = (aff_id) => {
    try { const s = localStorage.getItem(CHECKLIST_KEY(aff_id)); return s ? JSON.parse(s) : null; } catch(e) { return null; }
  };
  const [checklistOverrides, setChecklistOverrides] = React.useState({});
  const [checklistEditOpen, setChecklistEditOpen] = React.useState(false); // editeur ouvert
  const [checklistEditTab, setChecklistEditTab] = React.useState('preparation'); // 'preparation' | 'avancement'
  const [newItemText, setNewItemText] = React.useState('');
  const [clDragId, setClDragId] = React.useState(null); // drag & drop checklist item id
  const [clDragOver, setClDragOver] = React.useState(null);
  const getChecklistData = (aff_id, defaultItems) => {
    const saved = checklistOverrides[aff_id] || loadChecklist(aff_id);
    if (!saved) return defaultItems.map((item,i) => ({...item, id: item.id||`def_${i}`, custom:false}));
    // Merge: keep custom items, update done status of defaults
    const defaults = defaultItems.map((item,i) => ({...item, id: item.id||`def_${i}`, custom:false}));
    const customItems = saved.filter(x=>x.custom);
    const merged = defaults.map(d => { const s = saved.find(x=>x.id===d.id); return s ? {...d, done:s.done, hidden:s.hidden} : d; });
    return [...merged, ...customItems];
  };
  const updateChecklistItem = (aff_id, itemId, changes, defaultItems) => {
    const current = getChecklistData(aff_id, defaultItems);
    const updated = current.map(x => x.id===itemId ? {...x,...changes} : x);
    setChecklistOverrides(prev => ({...prev, [aff_id]: updated}));
    saveChecklist(aff_id, updated);
  };
  const addChecklistItem = (aff_id, text, grpLabel, defaultItems) => {
    if (!text.trim()) return;
    const current = getChecklistData(aff_id, defaultItems);
    const newItem = {id:`custom_${Date.now()}`, l:text.trim(), done:false, hidden:false, types:[], custom:true, grp:grpLabel};
    const updated = [...current, newItem];
    setChecklistOverrides(prev => ({...prev, [aff_id]: updated}));
    saveChecklist(aff_id, updated);
  };
  const removeChecklistItem = (aff_id, itemId, defaultItems) => {
    const current = getChecklistData(aff_id, defaultItems);
    const updated = current.filter(x => x.id!==itemId);
    setChecklistOverrides(prev => ({...prev, [aff_id]: updated}));
    saveChecklist(aff_id, updated);
  };
  const moveChecklistItem = (aff_id, itemId, dir, defaultItems) => {
    const current = getChecklistData(aff_id, defaultItems);
    const idx = current.findIndex(x=>x.id===itemId);
    if (idx<0) return;
    const newIdx = idx+dir;
    if (newIdx<0||newIdx>=current.length) return;
    const updated = [...current];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setChecklistOverrides(prev => ({...prev, [aff_id]: updated}));
    saveChecklist(aff_id, updated);
  };
  const reorderChecklistItem = (aff_id, dragId, overId, defaultItems) => {
    if (dragId===overId) return;
    const current = getChecklistData(aff_id, defaultItems);
    const fromIdx = current.findIndex(x=>x.id===dragId);
    const toIdx = current.findIndex(x=>x.id===overId);
    if (fromIdx<0||toIdx<0) return;
    const updated = [...current];
    const [moved] = updated.splice(fromIdx,1);
    updated.splice(toIdx,0,moved);
    setChecklistOverrides(prev => ({...prev, [aff_id]: updated}));
    saveChecklist(aff_id, updated);
  };
  const crmModuleRef = React.useRef(null);
  const [crmFilterOpen, setCrmFilterOpen] = useState(false);
  const [crmVisibleCols, setCrmVisibleCols] = useState({code:true,affaire:true,marche:true,equipe:true,montant:true,phase:false,statut:true,litige:true});
  const [ongletDrag, setOngletDrag] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const ongletRefs = React.useRef({});
  
  // États pour le drag & drop des blocs Présentation
  const [ordreBlocsPresentation, setOrdreBlocsPresentation] = useState(['histoire', 'architecture', 'grilles', 'bareme', 'composition']);
  
  // Ordre des colonnes des grilles de rémunération (drag & drop)
  const [ordreColonnesGrille, setOrdreColonnesGrille] = useState(['niveau', 'poste', 'caMin', 'caMax', 'fixe', 'prime', 'varMin', 'varMax', 'salMin', 'salMax', 'ebe', 'plafond']);
  const [colDrag, setColDrag] = useState(null);
  const [isColDragging, setIsColDragging] = useState(false);
  const [colDragPos, setColDragPos] = useState({ x: 0, y: 0 });
  const [colDragOffset, setColDragOffset] = useState({ x: 0 });
  const [colDropTargetIndex, setColDropTargetIndex] = useState(null);
  const colRefs = React.useRef({});
  const [blocDrag, setBlocDrag] = useState(null);
  const [blocDragOffset, setBlocDragOffset] = useState({ x: 0, y: 0 });
  const [blocDragPos, setBlocDragPos] = useState({ x: 0, y: 0 });
  const [isBlocDragging, setIsBlocDragging] = useState(false);
  const [blocDropTargetIndex, setBlocDropTargetIndex] = useState(null);
  const blocRefs = React.useRef({});
  const blocDragRef = React.useRef(null);
  
  // Configuration des onglets
  const configOnglets = {
    dashboard: { label: 'Tableau de Bord', icon: BarChart3 },
    collaborateurs: { label: 'Collaborateurs', icon: Users },
    postes: { label: 'Postes & Fiches', icon: Briefcase },
    presentation: { label: 'Modèle Ruches', icon: Award },
    organigramme: { label: 'Organigramme', icon: Target },
    organigramme_bis: { label: 'Organigramme Bis', icon: Users },
    simulateur: { label: 'Simulateur Général', icon: Calculator },
    suivi: { label: 'Suivi de l\'Essaim', icon: Users },
    admin: { label: 'Administration', icon: Target },
    guide: { label: 'Guide & Documentation', icon: Award }
  };
  
  // Style CSS pour hexagones
  const hexagonStyle = {
    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
  };
  
  // Sélection de filiale
  const [filialeSelectionnee, setFilialeSelectionnee] = useState('ezel');
  const [menuFilialeOuvert, setMenuFilialeOuvert] = useState(false);
  const filialeData = filiales[filialeSelectionnee];
  const grille = filialeData.grille;

  // Dashboard states
  const [modalFilialeOuvert, setModalFilialeOuvert] = useState(false);
  const [dashboardFiliale, setDashboardFiliale] = useState(null);
  const defaultTabOrder = ['1','2','3','4','5','yilmaz'];
  const [dashTabOrder, setDashTabOrder] = usePersistedState('dashTabOrder', defaultTabOrder);
  const moveDashTab = (tabId, dir) => {
    setDashTabOrder(prev => {
      const arr = [...prev];
      const idx = arr.indexOf(String(tabId));
      if (idx < 0) return arr;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };
  const [dashWidgets, setDashWidgets] = usePersistedState('dashWidgets', {
    kpiCards: true, structure: true, compteResultat: true, evolutionCA: true,
    caParFiliale: true, tableauFiliales: true, donutCA: true, comparatifMarges: true,
    masseSalariale: true, tresorerieBFR: true, pipelineAO: true, caParCollab: true,
    topChantiers: true, alertes: true, evolutionEffectif: true, objectifsVsRealise: true,
    detailFrais: true, rentabiliteNette: true, objectifsEBE: true, sousTraitanceChart: true,
    radarPerformance: true, carnetCommandes: true, repartitionEffectif: true, ratiosFinanciers: true,
    margeParChantier: true
  });
  const [dashSettingsOpen, setDashSettingsOpen] = useState(false);
  const [processusOuvert, setProcessusOuvert] = useState(null);
  const [guideSection, setGuideSection] = useState('widgets');
  const toggleWidget = (key) => setDashWidgets(prev => ({...prev, [key]: prev[key] === false ? true : false}));
  const defaultWidgetOrder = ['kpiCards','masseSalariale','tresorerieBFR','alertes','structure','compteResultat','evolutionCA','caParFiliale','donutCA','comparatifMarges','sousTraitanceChart','detailFrais','rentabiliteNette','caParCollab','evolutionEffectif','pipelineAO','topChantiers','objectifsVsRealise','objectifsEBE','tableauFiliales','radarPerformance','carnetCommandes','repartitionEffectif','ratiosFinanciers','margeParChantier'];
  const [dashWidgetOrder, setDashWidgetOrder] = usePersistedState('dashWidgetOrder', defaultWidgetOrder);
  const defaultWidgetSizes = {
    kpiCards:'full', masseSalariale:'half', tresorerieBFR:'half', alertes:'full',
    structure:'half', compteResultat:'half', evolutionCA:'half', caParFiliale:'half',
    donutCA:'half', comparatifMarges:'half', caParCollab:'half', evolutionEffectif:'half',
    pipelineAO:'full', topChantiers:'full', objectifsVsRealise:'half', tableauFiliales:'full',
    detailFrais:'full', rentabiliteNette:'half', objectifsEBE:'half', sousTraitanceChart:'half',
    radarPerformance:'half', carnetCommandes:'half', repartitionEffectif:'half', ratiosFinanciers:'full', margeParChantier:'full'
  };
  const [dashWidgetSizes, setDashWidgetSizes] = usePersistedState('dashWidgetSizes_v7', defaultWidgetSizes);
  const toggleWidgetSize = (key) => setDashWidgetSizes(prev => ({...prev, [key]: prev[key] === 'full' ? 'half' : 'full'}));
  React.useEffect(() => {
    const missing = defaultWidgetOrder.filter(k => !dashWidgetOrder.includes(k));
    if (missing.length > 0) setDashWidgetOrder(prev => [...prev, ...missing.filter(k => !prev.includes(k))]);
    const missingSizes = Object.keys(defaultWidgetSizes).filter(k => !(k in dashWidgetSizes));
    if (missingSizes.length > 0) setDashWidgetSizes(prev => ({...prev, ...Object.fromEntries(missingSizes.filter(k => !(k in prev)).map(k => [k, defaultWidgetSizes[k]]))}));
    const missingWidgets = defaultWidgetOrder.filter(k => !(k in dashWidgets));
    if (missingWidgets.length > 0) setDashWidgets(prev => ({...prev, ...Object.fromEntries(missingWidgets.filter(k => !(k in prev)).map(k => [k, true]))}));
  }, [dashWidgetOrder, dashWidgetSizes, dashWidgets]);
  const [dragWidget, setDragWidget] = useState(null);
  const [dragOverWidget, setDragOverWidget] = useState(null);
  const [settingsDragIdx, setSettingsDragIdx] = useState(null);
  const [settingsDragOverIdx, setSettingsDragOverIdx] = useState(null);
  const handleSettingsDrop = (targetIdx) => {
    if (settingsDragIdx === null || settingsDragIdx === targetIdx) { setSettingsDragIdx(null); setSettingsDragOverIdx(null); return; }
    setDashWidgetOrder(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(settingsDragIdx, 1);
      arr.splice(targetIdx, 0, moved);
      return arr;
    });
    setSettingsDragIdx(null);
    setSettingsDragOverIdx(null);
  };
  const handleWidgetDrop = (targetKey) => {
    if (!dragWidget || dragWidget === targetKey) { setDragWidget(null); setDragOverWidget(null); return; }
    setDashWidgetOrder(prev => {
      const arr = prev.filter(k => k !== dragWidget);
      const idx = arr.indexOf(targetKey);
      arr.splice(idx, 0, dragWidget);
      return arr;
    });
    setDragWidget(null);
    setDragOverWidget(null);
  };
  const widgetLabels = {
    kpiCards: '📊 KPI Cards (CA, EBE, Effectif, Filiales)',
    structure: '🏛️ Structure du Group',
    compteResultat: '📋 Compte de Résultat Consolidé',
    evolutionCA: '📈 Évolution CA & EBE',
    caParFiliale: '🏢 CA par Filiale',
    tableauFiliales: '📋 Tableau des Filiales',
    donutCA: '🍩 Répartition CA (Donut)',
    comparatifMarges: '📊 Comparatif Marges par Filiale',
    masseSalariale: '💰 Masse Salariale / CA',
    tresorerieBFR: '🏦 Trésorerie / BFR',
    pipelineAO: '📑 Pipeline Commercial (AO)',
    caParCollab: '👤 CA / Collaborateur',
    topChantiers: '🏗️ Top 5 Chantiers en cours',
    alertes: '🚨 Alertes / Points d\'attention',
    evolutionEffectif: '👥 Évolution Effectif',
    objectifsVsRealise: '🎯 Objectifs CA vs Réalisé',
    sousTraitanceChart: '🔧 Taux Sous-traitance par Filiale',
    detailFrais: '📉 Décomposition des Charges',
    rentabiliteNette: '💹 Rentabilité Nette par Filiale',
    objectifsEBE: '🎯 Objectifs EBE vs Réalisé',
    radarPerformance: '🕸️ Radar Performance Filiales',
    carnetCommandes: '📒 Carnet de Commandes',
    repartitionEffectif: '👥 Répartition Effectif par Filiale',
    ratiosFinanciers: '📐 Ratios Financiers BTP',
    margeParChantier: '💶 Marge par Chantier'
  };
  // widgetDescriptions — structure de référence des widgets dashboard
  const widgetDescriptions = {
    ca: { short:"Chiffre d'affaires consolidé", detail:'CA total du groupe', categorie:'Pilotage', source:'Monday', frequence:'Mensuel' },
    margeBrute: { short:'Marge brute par filiale', detail:'MB = CA - ST', categorie:'Finance', source:'Monday', frequence:'Mensuel' },
    ebe: { short:'EBE par filiale', detail:'EBE = MB - Charges', categorie:'Finance', source:'Monday', frequence:'Mensuel' },
    treso: { short:'Trésorerie & BFR', detail:'Solde bancaire + BFR', categorie:'Finance / Trésorerie', source:'Pennylane', frequence:'Hebdo' },
    topChantiers: { short:'Top 5 chantiers en cours', detail:'Chantiers actifs triés par montant', categorie:'BTP / Rentabilité', source:'Monday', frequence:'Hebdo' },
    ratiosKpi: { short:'Ratios KPI BTP', detail:'ST%, MB%, EBE% par filiale', categorie:'BTP / Contrôle de gestion', source:'Monday', frequence:'Mensuel' },
    effectif: { short:'Effectif groupe', detail:'Nb salariés actifs', categorie:'RH', source:'Monday', frequence:'Mensuel' },
    masseSalariale: { short:'Masse salariale', detail:'Total brut chargé', categorie:'RH / Finance', source:'Monday', frequence:'Mensuel' },
    tableauFiliales: { short:'Tableau synthèse filiales', detail:'Tous les KPIs par filiale', categorie:'Synthèse', source:'Monday', frequence:'Mensuel' },
    detailFrais: { short:'Décomposition des charges', detail:'ST, MB, Frais int, Frais str, EBE, RN', categorie:'BTP / Contrôle de gestion', source:'Monday', frequence:'Mensuel' },
    recrutements: { short:'Recrutements en cours', detail:'Pipeline recrutement', categorie:'RH', source:'Monday', frequence:'Hebdo' },
    litiges: { short:'Litiges actifs', detail:'Suivi contentieux', categorie:'Opérationnel', source:'Monday', frequence:'Mensuel' },
    margeParChantier: { short:'Marge par chantier', detail:'Analyse rentabilité chantier', categorie:'BTP / Rentabilité', source:'Monday', frequence:'Mensuel' },
  };

  const [nouvelleFiliale, setNouvelleFiliale] = useState({ nom: '', holding: 'INVEST LOC', activite: '', ca: 0, effectif: 0, sousTraitancePct: 55, fraisInternesPct: 25, margeBrutePct: 45 });
  
  // ── CRUD Collaborateurs & Chantiers ──
  const emptyEmploye = { nom:'', prenom:'', dateNaissance:'', dateEntree:'', dateFin:'', filialeId:'yilmaz', service:'', niveau:'S', posteInterne:'', posteExterne:'', isResponsable:false, caGere:0, margeBrutePct:30, ebePct:8, salaireFix:0, primeFix:0, variable:0, email:'', emailPerso:'', statutContrat:'cdi', statut:'actif', condition:'', civilite:'', telFixe:'', portable:'', telPerso:'', matricule:'', historique:[] };
  const COLLAB_STATUTS = [{id:'actif',label:'Actif',color:'#059669'},{id:'en_cours_arriver',label:"En cours d'arriver",color:'#4a90c4'},{id:'en_cours_depart',label:'En cours de départ',color:'#dc2626'},{id:'ancien',label:'Ancien',color:'#757575'},{id:'inactif',label:'Inactif',color:'#cbd5e1'}];
  const COLLAB_CONTRATS = [{id:'cdi',label:'CDI',color:'#216edf'},{id:'cdd',label:'CDD',color:'#059669'},{id:'freelance',label:'Free-Lance',color:'#cd9282'},{id:'alternance',label:'Alternant(e)',color:'#34d399'},{id:'stage',label:'Stagiaire',color:'#94a3b8'},{id:'interimaire',label:'Intérimaire',color:'#cab641'},{id:'insertion',label:'Insertion',color:'#4a90c4'},{id:'prestataire',label:'Prestataire',color:'#dc2626'},{id:'externe',label:'Externe',color:'#9d50dd'}];
  const COLLAB_CONDITIONS = [{id:'arret_maladie',label:'Arrêt maladie',color:'#ff007f',short:'ARRÊT'},{id:'accident_travail',label:'Accident travail',color:'#dc2626',short:'ACC. TRAVAIL'},{id:'conge_maternite',label:'Congé mat./pat.',color:'#10b981',short:'CONGÉ MAT.'},{id:'conge_parental',label:'Congé parental',color:'#f59e0b',short:'CONGÉ PAR.'}];
  const emptyChantier = { nom:'', filialeId:null, responsableId:null, statut:'Planifié', avancement:0, budgetHT:0, montantVente:0, depense:0, dateDebut:'', dateFin:'', client:'' };
  const [modalEmploye, setModalEmploye] = useState(null);
  const [employeForm, setEmployeForm] = useState({...emptyEmploye});
  const [modalChantier, setModalChantier] = useState(null);
  const [chantierForm, setChantierForm] = useState({...emptyChantier});
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ══════ ROADMAP — State & Storage ══════
  const [roadmapEditMode, setRoadmapEditMode] = useState(false);
  const [roadmapEditTab, setRoadmapEditTab] = useState('jalons');
  const defaultRoadmapData = {
    jalons: [
      { id: 'j1', year: 2025, label: 'Fondations', icon: '🏗️', color: '#8B6F47', items: ['Structuration YILMAZ','Mise en place Ruches','4 filiales opérationnelles','CA ~4M€'], done: true },
      { id: 'j2', year: 2026, label: 'Consolidation', icon: '📈', color: '#059669', items: ['Rentabilité EBE positif','Recrutement +5 collaborateurs','Digitalisation complète','Lancement L\'Étanchéité'], active: true },
      { id: 'j3', year: 2027, label: 'Croissance', icon: '🚀', color: '#2563eb', items: ['CA 6M€ objectif','Première acquisition externe','Expansion géographique','15 collaborateurs'] },
      { id: 'j4', year: 2028, label: 'Expansion', icon: '🌍', color: '#7c3aed', items: ['CA 8M€','2ème acquisition','Nouveaux métiers BTP','20 collaborateurs'] },
      { id: 'j5', year: 2029, label: 'Leadership', icon: '👑', color: '#dc2626', items: ['CA 10M€','Leader régional BTP','Diversification services','25 collaborateurs'] },
      { id: 'j6', year: 2030, label: 'Cap 10M€', icon: '🎯', color: '#d97706', items: ['CA 10-12M€','5+ filiales','Innovation BTP','30 collaborateurs'] },
      { id: 'j7', year: 2032, label: 'Maturité', icon: '🏛️', color: '#0891b2', items: ['CA 15M€','Groupe structuré','Marque reconnue','40 collaborateurs'] },
      { id: 'j8', year: 2035, label: 'Vision 30M€', icon: '⭐', color: '#8B6F47', items: ['CA 25-30M€','Groupe multi-régional','Transmission possible','50+ collaborateurs'] }
    ],
    projections: [
      { year: 2025, ca: 4.3, ebe: -0.03, eff: 12 },
      { year: 2026, ca: 5.0, ebe: 0.25, eff: 15 },
      { year: 2027, ca: 6.0, ebe: 0.45, eff: 18 },
      { year: 2028, ca: 8.0, ebe: 0.70, eff: 22 },
      { year: 2029, ca: 10.0, ebe: 1.0, eff: 26 },
      { year: 2030, ca: 12.0, ebe: 1.3, eff: 30 },
      { year: 2032, ca: 18.0, ebe: 2.0, eff: 40 },
      { year: 2035, ca: 30.0, ebe: 3.5, eff: 55 }
    ],
    visionCards: [
      { id: 'v1', horizon: '1 an', year: '2027', icon: '📍', color: '#059669', objectif: 'CA 6M€', details: 'EBE positif consolidé, 18 collaborateurs, 4 filiales rentables, lancement L\'Étanchéité' },
      { id: 'v2', horizon: '3 ans', year: '2029', icon: '🎯', color: '#2563eb', objectif: 'CA 10M€', details: 'Leader régional, 1-2 acquisitions réalisées, 25 collaborateurs, diversification métiers' },
      { id: 'v3', horizon: '5 ans', year: '2031', icon: '🚀', color: '#7c3aed', objectif: 'CA 15M€', details: 'Groupe structuré multi-filiales, marque reconnue, 35 collaborateurs, innovation BTP' },
      { id: 'v4', horizon: '10 ans', year: '2035', icon: '⭐', color: '#d97706', objectif: 'CA 25-30M€', details: 'Groupe multi-régional, 50+ collaborateurs, possibilité transmission ou partenariat stratégique' }
    ],
    objectifs: [
      { id: 'o1', cat: 'Croissance Organique', icon: '🌱', color: '#059669', items: ['Augmenter CA Ezel de 15%/an','Développer La Roulotte (9→20 unités)','Monter L\'Échafaudage en autonomie','Lancer L\'Étanchéité (CA cible 500K€)'] },
      { id: 'o2', cat: 'Croissance Externe', icon: '🏢', color: '#2563eb', items: ['Identifier cibles acquisition Alsace','Budget acquisition : 200-500K€','Intégration via modèle YILMAZ','Mutualisation services post-acquisition'] },
      { id: 'o3', cat: 'Excellence Opérationnelle', icon: '⚡', color: '#7c3aed', items: ['Marge brute >40% sur chaque filiale','EBE/CA >8% objectif groupe','Digitalisation 100% processus','Certifications Qualibat / RGE'] },
      { id: 'o4', cat: 'Capital Humain', icon: '👥', color: '#d97706', items: ['Fidélisation via Ruches (turnover <10%)','Plan formation continue','Recrutement pipeline permanent','Montée en compétences managers'] }
    ],
    projectionsFiliale: [
      { id: 'pf1', nom: '🏗️ Ezel Bâtiment', ca25: '3.5M€', ca26: '3.9M€', ca27: '4.5M€', ca28: '5.5M€', ca29: '6.5M€', ca30: '7M€', ca32: '11M€', ca35: '15M€', obj: 'Leader TCE régional' },
      { id: 'pf2', nom: '🚛 La Roulotte', ca25: '0.10M€', ca26: '0.13M€', ca27: '0.20M€', ca28: '0.3M€', ca29: '0.4M€', ca30: '0.5M€', ca32: '1M€', ca35: '1.5M€', obj: '20 unités, 3 départements' },
      { id: 'pf3', nom: '⚙️ L\'Échafaudage', ca25: '0.20M€', ca26: '0.27M€', ca27: '0.40M€', ca28: '0.6M€', ca29: '0.8M€', ca30: '1M€', ca32: '2M€', ca35: '3M€', obj: 'Autonomie complète' },
      { id: 'pf4', nom: '💧 L\'Étanchéité', ca25: '—', ca26: '—', ca27: '0.15M€', ca28: '0.3M€', ca29: '0.5M€', ca30: '0.8M€', ca32: '2M€', ca35: '3M€', obj: 'Spécialiste étanchéité' },
      { id: 'pf5', nom: '🏢 Acquisitions', ca25: '—', ca26: '—', ca27: '—', ca28: '1.3M€', ca29: '2.0M€', ca30: '2.7M€', ca32: '5M€', ca35: '7.5M€', obj: '2-3 acquisitions BTP' }
    ]
  };
  const [roadmapData, setRoadmapData] = useState(defaultRoadmapData);
  const [roadmapLoaded, setRoadmapLoaded] = useState(false);

  // Load roadmap from storage
  React.useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get('roadmap-data');
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setRoadmapData(prev => ({ ...defaultRoadmapData, ...parsed }));
        }
      } catch (e) { console.log('Roadmap storage: using defaults'); }
      setRoadmapLoaded(true);
    })();
  }, []);

  // Save roadmap to storage
  const saveRoadmap = async (newData) => {
    setRoadmapData(newData);
    try { await window.storage.set('roadmap-data', JSON.stringify(newData)); } catch(e) { console.error('Save failed', e); }
  };
  const updateRoadmapField = (section, index, field, value) => {
    const newData = { ...roadmapData, [section]: roadmapData[section].map((item, i) => i === index ? { ...item, [field]: value } : item) };
    saveRoadmap(newData);
  };
  const addRoadmapItem = (section, template) => {
    const newData = { ...roadmapData, [section]: [...roadmapData[section], { ...template, id: section[0] + Date.now() }] };
    saveRoadmap(newData);
  };
  const removeRoadmapItem = (section, index) => {
    const newData = { ...roadmapData, [section]: roadmapData[section].filter((_, i) => i !== index) };
    saveRoadmap(newData);
  };
  const updateRoadmapListItem = (section, itemIndex, listIndex, value) => {
    const newData = { ...roadmapData, [section]: roadmapData[section].map((item, i) => i === itemIndex ? { ...item, items: item.items.map((it, j) => j === listIndex ? value : it) } : item) };
    saveRoadmap(newData);
  };
  const addRoadmapListItem = (section, itemIndex) => {
    const newData = { ...roadmapData, [section]: roadmapData[section].map((item, i) => i === itemIndex ? { ...item, items: [...item.items, ''] } : item) };
    saveRoadmap(newData);
  };
  const removeRoadmapListItem = (section, itemIndex, listIndex) => {
    const newData = { ...roadmapData, [section]: roadmapData[section].map((item, i) => i === itemIndex ? { ...item, items: item.items.filter((_, j) => j !== listIndex) } : item) };
    saveRoadmap(newData);
  };
  const resetRoadmap = async () => { setRoadmapData(defaultRoadmapData); try { await window.storage.set('roadmap-data', JSON.stringify(defaultRoadmapData)); } catch(e) {} };

  // ══════ FACTURATION INTERNE — State & Storage ══════
  const [factIntTab, setFactIntTab] = useState('dashboard');
  const [factIntEditFacture, setFactIntEditFacture] = useState(null);
  const [factIntPreview, setFactIntPreview] = useState(null);
  const [factIntStyle, setFactIntStyle] = useState('noir');
  const servicesYilmaz = [
    { id: 'direction', label: 'Direction / Stratégie', icon: '🏛️', color: '#8B6F47' },
    { id: 'finance', label: 'Finance / Comptabilité', icon: '🏦', color: '#059669' },
    { id: 'rh', label: 'RH / Paie', icon: '👥', color: '#2563eb' },
    { id: 'achats', label: 'Achats & Prestataires', icon: '🤝', color: '#7c3aed' },
    { id: 'it', label: 'IT / Digital', icon: '💻', color: '#0891b2' },
    { id: 'juridique', label: 'Juridique / Conformité', icon: '⚖️', color: '#d97706' },
    { id: 'marketing', label: 'Marketing / Communication', icon: '📣', color: '#ec4899' }
  ];
  const defaultFactIntData = {
    config: [
      { filialeNom: 'Ezel Bâtiment', forfaitMensuel: 4000, tauxVariable: 3, services: ['direction','finance','rh','achats','it','juridique','marketing'], actif: true },
      { filialeNom: "L'Échafaudage", forfaitMensuel: 1000, tauxVariable: 3, services: ['direction','finance','rh','it','juridique'], actif: true },
      { filialeNom: 'La Roulotte', forfaitMensuel: 700, tauxVariable: 3, services: ['direction','finance','rh','it'], actif: true },
      { filialeNom: "L'Étanchéité", forfaitMensuel: 400, tauxVariable: 2, services: ['direction','finance','rh'], actif: true }
    ],
    factures: []
  };
  const [factIntData, setFactIntData] = useState(defaultFactIntData);
  const [factIntLoaded, setFactIntLoaded] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get('factint-data');
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setFactIntData(prev => ({ ...defaultFactIntData, ...parsed }));
        }
      } catch (e) { console.log('FactInt storage: using defaults'); }
      setFactIntLoaded(true);
    })();
  }, []);

  const saveFactInt = async (newData) => {
    setFactIntData(newData);
    try { await window.storage.set('factint-data', JSON.stringify(newData)); } catch(e) {}
  };
  const updateFactIntConfig = (index, field, value) => {
    const nd = { ...factIntData, config: factIntData.config.map((c, i) => i === index ? { ...c, [field]: value } : c) };
    saveFactInt(nd);
  };
  const toggleFactIntService = (cfgIndex, svcId) => {
    const cfg = factIntData.config[cfgIndex];
    const svcs = cfg.services.includes(svcId) ? cfg.services.filter(s => s !== svcId) : [...cfg.services, svcId];
    updateFactIntConfig(cfgIndex, 'services', svcs);
  };
  const genererFacture = (mois, annee) => {
    const newFactures = factIntData.config.filter(c => c.actif).map(cfg => {
      const filiale = filialesEnrichies.find(f => f.nom === cfg.filialeNom);
      const kpi = filiale ? getKpiFiliale(filiale) : { ca: 0 };
      const montantForfait = cfg.forfaitMensuel;
      const montantVariable = Math.round(kpi.ca * cfg.tauxVariable / 100 / 12);
      const total = montantForfait + montantVariable;
      return {
        id: 'FI-' + annee + String(mois).padStart(2,'0') + '-' + cfg.filialeNom.replace(/[^a-zA-Z]/g,'').substring(0,4).toUpperCase(),
        filiale: cfg.filialeNom,
        mois, annee,
        periode: `${String(mois).padStart(2,'0')}/${annee}`,
        montantForfait, montantVariable, total,
        services: cfg.services,
        statut: 'brouillon',
        dateCreation: new Date().toISOString().split('T')[0],
        datePaiement: null,
        notes: ''
      };
    });
    const existing = factIntData.factures.filter(f => !(f.mois === mois && f.annee === annee));
    const nd = { ...factIntData, factures: [...existing, ...newFactures].sort((a,b) => b.periode.localeCompare(a.periode)) };
    saveFactInt(nd);
    return newFactures.length;
  };
  const updateFacture = (factureId, field, value) => {
    const nd = { ...factIntData, factures: factIntData.factures.map(f => f.id === factureId ? { ...f, [field]: value } : f) };
    saveFactInt(nd);
  };
  const deleteFacture = (factureId) => {
    const nd = { ...factIntData, factures: factIntData.factures.filter(f => f.id !== factureId) };
    saveFactInt(nd);
  };

  // ── FACTURATION EXTERNE — CRM Prestataires + Factures Reçues ──
  const [factExtTab, setFactExtTab] = useState('dashboard');

  // ═══ BUDGET PRÉVISIONNEL ═══
  const [budgetFiliale, setBudgetFiliale] = useState('all');
  const [budgetAnnee, setBudgetAnnee] = useState(2026);
  const [budgetTab, setBudgetTab] = useState('tableau');
  const [budgetEditCell, setBudgetEditCell] = useState(null);
  const [csvExportText, setCsvExportText] = useState(null);
  const [budgetImportModal, setBudgetImportModal] = useState(null); // 'csv' | 'paste' | 'copy_year' | null
  const [budgetImportText, setBudgetImportText] = useState('');
  const [budgetCopyPct, setBudgetCopyPct] = useState(5);
  const [budgetRowEdit, setBudgetRowEdit] = useState(null); // {cat, field, values:[12]}
  const [budgetApiConfig, setBudgetApiConfig] = useState(() => {
    try { const s = localStorage.getItem('oy_budget_api'); return s ? JSON.parse(s) : null; } catch(e) { return null; }
  });
  const saveBudgetApi = (cfg) => { setBudgetApiConfig(cfg); try { localStorage.setItem('oy_budget_api', JSON.stringify(cfg)); } catch(e) {} };
  const BUDGET_CATS = [
    { id:'ca', label:'Chiffre d\'affaires', type:'revenu', icon:'📈' },
    { id:'prestations_internes', label:'Prestations YILMAZ (refacturées)', type:'revenu', icon:'🔄' },
    { id:'autres_produits', label:'Autres produits', type:'revenu', icon:'💎' },
    { id:'achats_materiaux', label:'Achats matériaux & fournitures', type:'charge', icon:'🧱' },
    { id:'sous_traitance', label:'Sous-traitance', type:'charge', icon:'🏗️' },
    { id:'masse_salariale', label:'Masse salariale (brut + charges)', type:'charge', icon:'👥' },
    { id:'prestataires_ext', label:'Prestataires externes', type:'charge', icon:'🤝' },
    { id:'loyers_locaux', label:'Loyers & charges locaux', type:'charge', icon:'🏢' },
    { id:'vehicules', label:'Véhicules & déplacements', type:'charge', icon:'🚗' },
    { id:'assurances', label:'Assurances', type:'charge', icon:'🛡️' },
    { id:'frais_generaux', label:'Frais généraux & admin', type:'charge', icon:'📋' },
    { id:'it_outils', label:'IT, logiciels & outils', type:'charge', icon:'💻' },
    { id:'marketing_comm', label:'Marketing & communication', type:'charge', icon:'📣' },
    { id:'investissements', label:'Investissements (CAPEX)', type:'invest', icon:'💰' },
    { id:'remboursements', label:'Remboursements emprunts', type:'financier', icon:'🏦' }
  ];
  const BUDGET_FILIALES = [
    { id:'all', label:'🏛️ Consolidé (Group OY)', color:'#2d2216' },
    { id:'yilmaz', label:'🐝 YILMAZ SAS', color:'#8B6F47' },
    { id:'ezel', label:'🏗️ Ezel Bâtiment', color:'#1e40af' },
    { id:'echafaudage', label:'🏗️ L\'Échafaudage', color:'#059669' },
    { id:'roulotte', label:'🚽 La Roulotte', color:'#d97706' }
  ];
  const defaultApiConfig = {
    provider: 'pennylane', baseUrl: 'https://app.pennylane.com/api/external/v2', apiKey: '', companyId: '',
    syncDirection: 'import', syncFrequency: 'manual', lastSync: null, syncLog: [],
    mappings: BUDGET_CATS.map(c => ({ budgetCatId: c.id, budgetCatLabel: c.label, externalAccount: '', externalLabel: '', enabled: true })),
    endpoints: {
      revenues: { path: '/customer_invoices', method: 'GET', params: { status: 'paid' }, enabled: true },
      expenses: { path: '/supplier_invoices', method: 'GET', params: { status: 'paid' }, enabled: true },
      balances: { path: '/accounting/ledger', method: 'GET', params: {}, enabled: true },
      journal: { path: '/accounting/journal_entries', method: 'GET', params: {}, enabled: false },
    },
    webhooks: { enabled: false, url: '', secret: '', events: ['invoice.paid','invoice.created'] },
    filters: { dateFrom: '', dateTo: '', journalCodes: '', auxiliaryAccounts: '' },
  };
  const budgetStorageKey = 'budget-previsionnel-v1';
  const defaultBudgetData = (() => {
    const d = {};
    const makeYear = (fil, yr) => {
      const m = {};
      BUDGET_CATS.forEach(c => {
        m[c.id] = { prevu: Array(12).fill(0), reel: Array(12).fill(0) };
      });
      return m;
    };
    ['yilmaz','ezel','echafaudage','roulotte'].forEach(f => {
      d[f] = { 2025: makeYear(f,2025), 2026: makeYear(f,2026) };
    });
    // Sample data YILMAZ 2025 (for N-1 comparison)
    const y25 = d.yilmaz[2025];
    y25.ca.prevu = [15000,16000,18000,20000,20000,22000,22000,18000,20000,20000,22000,25000];
    y25.ca.reel = [14800,16500,18200,20500,21000,22500,23000,18500,20800,21000,23000,26000];
    y25.prestations_internes.prevu = [38000,38000,38000,38000,38000,38000,38000,38000,38000,38000,38000,38000];
    y25.prestations_internes.reel = [38000,38000,38000,38000,38000,38000,38000,38000,38000,38000,38000,38000];
    y25.masse_salariale.prevu = [26000,26000,26000,26000,26000,26000,26000,26000,26000,26000,26000,26000];
    y25.masse_salariale.reel = [25800,26200,26000,26100,25900,26300,26000,26000,26100,25800,26200,26500];
    y25.prestataires_ext.prevu = [7000,7000,7000,7000,7000,7000,7000,7000,7000,7000,7000,7000];
    y25.prestataires_ext.reel = [7200,6800,7100,7000,7300,6900,7000,7200,6800,7100,7000,7300];
    // Ezel 2025
    const e25 = d.ezel[2025];
    e25.ca.prevu = [320000,360000,400000,430000,450000,470000,450000,300000,420000,450000,470000,360000];
    e25.ca.reel = [330000,355000,410000,440000,460000,475000,455000,310000,425000,455000,480000,370000];
    e25.masse_salariale.prevu = [88000,88000,88000,88000,88000,88000,88000,88000,88000,88000,88000,88000];
    e25.masse_salariale.reel = [87500,88500,88000,88200,87800,88500,88000,88000,88200,87800,88500,88000];
    // Sample data YILMAZ 2026
    const y = d.yilmaz[2026];
    y.ca.prevu = [18000,18000,20000,22000,22000,24000,24000,20000,22000,22000,24000,28000];
    y.ca.reel = [17500,19200,21000,22800,0,0,0,0,0,0,0,0];
    y.prestations_internes.prevu = [42000,42000,42000,42000,42000,42000,42000,42000,42000,42000,42000,42000];
    y.prestations_internes.reel = [42000,42000,42000,42000,0,0,0,0,0,0,0,0];
    y.masse_salariale.prevu = [28000,28000,28000,28000,28000,28000,28000,28000,28000,28000,28000,28000];
    y.masse_salariale.reel = [27800,28200,28000,28500,0,0,0,0,0,0,0,0];
    y.prestataires_ext.prevu = [8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500];
    y.prestataires_ext.reel = [9200,8800,7900,8600,0,0,0,0,0,0,0,0];
    y.loyers_locaux.prevu = [3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200];
    y.loyers_locaux.reel = [3200,3200,3200,3200,0,0,0,0,0,0,0,0];
    y.it_outils.prevu = [2800,2800,2800,2800,2800,2800,2800,2800,2800,2800,2800,2800];
    y.it_outils.reel = [3100,2800,2600,2900,0,0,0,0,0,0,0,0];
    y.frais_generaux.prevu = [1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500];
    y.frais_generaux.reel = [1400,1600,1500,1500,0,0,0,0,0,0,0,0];
    y.assurances.prevu = [1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200];
    y.assurances.reel = [1200,1200,1200,1200,0,0,0,0,0,0,0,0];
    y.vehicules.prevu = [800,800,800,800,800,800,800,800,800,800,800,800];
    y.vehicules.reel = [750,900,800,850,0,0,0,0,0,0,0,0];
    // Ezel 2026
    const e = d.ezel[2026];
    e.ca.prevu = [380000,420000,450000,480000,500000,520000,500000,350000,480000,500000,520000,400000];
    e.ca.reel = [395000,410000,465000,490000,0,0,0,0,0,0,0,0];
    e.sous_traitance.prevu = [120000,140000,150000,160000,170000,175000,165000,110000,155000,165000,175000,130000];
    e.sous_traitance.reel = [125000,138000,155000,162000,0,0,0,0,0,0,0,0];
    e.achats_materiaux.prevu = [85000,95000,100000,110000,115000,120000,115000,80000,105000,115000,120000,90000];
    e.achats_materiaux.reel = [88000,92000,105000,108000,0,0,0,0,0,0,0,0];
    e.masse_salariale.prevu = [95000,95000,95000,95000,95000,95000,95000,95000,95000,95000,95000,95000];
    e.masse_salariale.reel = [94500,96000,95200,95800,0,0,0,0,0,0,0,0];
    e.prestataires_ext.prevu = [15000,18000,20000,22000,24000,25000,23000,12000,20000,22000,24000,18000];
    e.prestataires_ext.reel = [16000,17500,21000,22500,0,0,0,0,0,0,0,0];
    e.loyers_locaux.prevu = [4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500];
    e.loyers_locaux.reel = [4500,4500,4500,4500,0,0,0,0,0,0,0,0];
    e.vehicules.prevu = [6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000];
    e.vehicules.reel = [5800,6200,6100,5900,0,0,0,0,0,0,0,0];
    e.assurances.prevu = [8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500];
    e.assurances.reel = [8500,8500,8500,8500,0,0,0,0,0,0,0,0];
    e.frais_generaux.prevu = [3000,3000,3000,3000,3000,3000,3000,3000,3000,3000,3000,3000];
    e.frais_generaux.reel = [2800,3200,3100,2900,0,0,0,0,0,0,0,0];
    // Échafaudage 2026
    const ec = d.echafaudage[2026];
    ec.ca.prevu = [180000,200000,220000,240000,260000,280000,270000,200000,240000,260000,280000,210000];
    ec.ca.reel = [185000,195000,225000,248000,0,0,0,0,0,0,0,0];
    ec.masse_salariale.prevu = [52000,52000,52000,52000,52000,52000,52000,52000,52000,52000,52000,52000];
    ec.masse_salariale.reel = [51500,52500,52000,52200,0,0,0,0,0,0,0,0];
    ec.sous_traitance.prevu = [25000,30000,35000,40000,45000,48000,45000,30000,38000,42000,45000,32000];
    ec.sous_traitance.reel = [26000,29000,36000,41000,0,0,0,0,0,0,0,0];
    ec.loyers_locaux.prevu = [3800,3800,3800,3800,3800,3800,3800,3800,3800,3800,3800,3800];
    ec.loyers_locaux.reel = [3800,3800,3800,3800,0,0,0,0,0,0,0,0];
    ec.vehicules.prevu = [4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500,4500];
    ec.vehicules.reel = [4300,4700,4500,4600,0,0,0,0,0,0,0,0];
    ec.assurances.prevu = [6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000];
    ec.assurances.reel = [6000,6000,6000,6000,0,0,0,0,0,0,0,0];
    ec.achats_materiaux.prevu = [45000,50000,55000,60000,65000,70000,65000,45000,58000,62000,68000,50000];
    ec.achats_materiaux.reel = [47000,49000,56000,61000,0,0,0,0,0,0,0,0];
    // La Roulotte 2026
    const r = d.roulotte[2026];
    r.ca.prevu = [35000,38000,42000,45000,48000,50000,48000,35000,42000,45000,48000,38000];
    r.ca.reel = [36000,37500,43000,46000,0,0,0,0,0,0,0,0];
    r.masse_salariale.prevu = [12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000];
    r.masse_salariale.reel = [12000,12000,12000,12000,0,0,0,0,0,0,0,0];
    r.vehicules.prevu = [3500,3500,3500,3500,3500,3500,3500,3500,3500,3500,3500,3500];
    r.vehicules.reel = [3400,3600,3500,3500,0,0,0,0,0,0,0,0];
    r.assurances.prevu = [2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000];
    r.assurances.reel = [2000,2000,2000,2000,0,0,0,0,0,0,0,0];
    r.loyers_locaux.prevu = [1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500];
    r.loyers_locaux.reel = [1500,1500,1500,1500,0,0,0,0,0,0,0,0];
    r.frais_generaux.prevu = [800,800,800,800,800,800,800,800,800,800,800,800];
    r.frais_generaux.reel = [750,850,800,800,0,0,0,0,0,0,0,0];
    r.investissements.prevu = [0,0,0,15000,0,0,0,0,0,0,0,0];
    r.investissements.reel = [0,0,0,14500,0,0,0,0,0,0,0,0];
    return d;
  })();
  const [budgetData, setBudgetData] = useState(() => {
    try { const s = localStorage.getItem(budgetStorageKey); return s ? JSON.parse(s) : defaultBudgetData; } catch(e) { return defaultBudgetData; }
  });
  const saveBudget = (nd) => { setBudgetData(nd); localStorage.setItem(budgetStorageKey, JSON.stringify(nd)); };
  const getBudgetForFiliale = (fil, yr) => {
    if (fil === 'all') {
      const merged = {};
      BUDGET_CATS.forEach(c => { merged[c.id] = { prevu: Array(12).fill(0), reel: Array(12).fill(0) }; });
      ['yilmaz','ezel','echafaudage','roulotte'].forEach(f => {
        const fd = budgetData[f]?.[yr];
        if (fd) BUDGET_CATS.forEach(c => {
          for(let i=0;i<12;i++) { merged[c.id].prevu[i] += (fd[c.id]?.prevu[i]||0); merged[c.id].reel[i] += (fd[c.id]?.reel[i]||0); }
        });
      });
      return merged;
    }
    return budgetData[fil]?.[yr] || {};
  };
  const moisCourts = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const [factExtPreview, setFactExtPreview] = useState(null);
  const [factExtForm, setFactExtForm] = useState(null);
  const [factExtPrestaForm, setFactExtPrestaForm] = useState(null);
  const [factExtFilter, setFactExtFilter] = useState({ statut:'all', prestaId:'all', filiale:'all' });
  const [factExtView, setFactExtView] = useState('cards'); // 'cards' | 'list'
  const defaultPrestaColW = [150,140,105,115,95,85,65,75,36,75,70,90,56];
  const [prestaColW, setPrestaColW] = useState(defaultPrestaColW);
  const prestaResizeRef = useRef(null);
  const defaultFactColW = [160,260,280,105,105,110,110,140,70];
  const [factColW, setFactColW] = useState(defaultFactColW);
  const factResizeRef = useRef(null);
  const [prestaSort, setPrestaSort] = useState({ col:null, dir:'asc' });
  const [prestaFilters, setPrestaFilters] = useState({ type:'all', categorie:'all', statut:'all', modeFact:'all', search:'' });

  // Modes de facturation possibles
  const MODES_FACT = {
    tjm: { label:'Forfait jour (TJM)', unite:'€/jour', icon:'📅', desc:'Taux journalier moyen — idéal consultants, DAF externe' },
    horaire: { label:'Temps passé (horaire)', unite:'€/h', icon:'⏱️', desc:'Facturation à l\'heure — avocats, développeurs' },
    forfait_mensuel: { label:'Forfait mensuel', unite:'€/mois', icon:'📆', desc:'Abonnement mensuel fixe — expert-comptable, hébergement' },
    forfait_mission: { label:'Forfait mission', unite:'€/mission', icon:'🎯', desc:'Prix fixe pour un livrable défini — audit, site web' },
    forfait_annuel: { label:'Forfait annuel', unite:'€/an', icon:'📋', desc:'Contrat annuel — assurance, maintenance, certification' },
    success_fee: { label:'Au résultat (success fee)', unite:'% ou fixe', icon:'🏆', desc:'Commission sur résultat — cabinet recrutement' },
    regie: { label:'Régie (temps + matériel)', unite:'€/h + frais', icon:'🔧', desc:'Temps passé + fournitures/déplacements — artisans BTP' },
    mixte: { label:'Mixte (base + variable)', unite:'€/mois + var.', icon:'⚡', desc:'Forfait de base + complément variable — DAF, consultant' }
  };

  const TYPES_PRESTA = {
    freelance: { label:'Freelance / Indépendant', icon:'👤', color:'#7c3aed' },
    auto_entrepreneur: { label:'Auto-entrepreneur', icon:'🏠', color:'#2563eb' },
    societe: { label:'Société (SARL/SAS/EURL)', icon:'🏢', color:'#059669' },
    portage: { label:'Portage salarial', icon:'🤝', color:'#d97706' },
    cabinet: { label:'Cabinet / Agence', icon:'🏛️', color:'#dc2626' },
    organisme: { label:'Organisme agréé', icon:'🎓', color:'#0891b2' },
    interim: { label:'Agence intérim', icon:'👷', color:'#ea580c' },
    association: { label:'Association', icon:'💚', color:'#16a34a' }
  };

  const CATS_PRESTA = {
    finance: { label:'Finance & Comptabilité', icon:'💰', color:'#059669' },
    rh: { label:'Ressources Humaines', icon:'👥', color:'#7c3aed' },
    it: { label:'IT & Digital', icon:'💻', color:'#2563eb' },
    juridique: { label:'Juridique', icon:'⚖️', color:'#dc2626' },
    marketing: { label:'Marketing & Communication', icon:'📣', color:'#ec4899' },
    formation: { label:'Formation', icon:'🎓', color:'#d97706' },
    btp_sous_traitant: { label:'Sous-traitance BTP', icon:'🔨', color:'#ea580c' },
    bureau_etude: { label:'Bureau d\'études / Contrôle', icon:'📐', color:'#0891b2' },
    transport: { label:'Transport / Logistique', icon:'🚛', color:'#6b7280' },
    autre: { label:'Autre', icon:'📦', color:'#9ca3af' }
  };

  const STATUTS_FACTEXT = {
    reception: { label:'📥 Réceptionnée', bg:'#f3f4f6', color:'#374151', step:1 },
    validation_manager: { label:'👤 Validation manager', bg:'#fef3c7', color:'#92400e', step:2 },
    validation_daf: { label:'💼 Validation DAF', bg:'#dbeafe', color:'#1e40af', step:3 },
    bon_a_payer: { label:'✅ Bon à payer', bg:'#d1fae5', color:'#065f46', step:4 },
    payee: { label:'💰 Payée', bg:'#dcfce7', color:'#166534', step:5 },
    rejetee: { label:'❌ Rejetée', bg:'#fecaca', color:'#991b1b', step:0 },
    litige: { label:'⚠️ Litige', bg:'#fef3c7', color:'#dc2626', step:0 }
  };

  const CONTRAT_STATUTS = {
    a_preparer: { label:'À préparer', icon:'📝', bg:'#fef3c7', color:'#92400e' },
    en_redaction: { label:'En rédaction', icon:'✍️', bg:'#e0e7ff', color:'#4338ca' },
    envoye: { label:'Envoyé', icon:'📤', bg:'#dbeafe', color:'#1e40af' },
    signe: { label:'Signé', icon:'✅', bg:'#dcfce7', color:'#166534' },
    expire: { label:'Expiré', icon:'⏰', bg:'#fecaca', color:'#991b1b' },
    resilie: { label:'Résilié', icon:'🚫', bg:'#f3f4f6', color:'#6b7280' }
  };
  const CONDITIONS_PAIEMENT = {
    immediat:{label:'Paiement immédiat', delai:'à réception de facture'},
    '15_jours':{label:'15 jours net', delai:'à 15 jours date de facture'},
    '30_jours':{label:'30 jours net', delai:'à 30 jours date de facture'},
    '30_jours_fin_mois':{label:'30 jours fin de mois', delai:'à 30 jours fin de mois'},
    '45_jours':{label:'45 jours fin de mois', delai:'à 45 jours fin de mois'},
    '60_jours':{label:'60 jours net', delai:'à 60 jours date de facture'},
    sur_validation:{label:'Sur validation', delai:'après validation du livrable'},
    echeancier:{label:'Échéancier', delai:'selon échéancier défini au contrat'}
  };
  const [rejetModal, setRejetModal] = useState(null);

  const CONTRAT_TYPES = {
    prestation: { label:'Contrat de prestation de services', short:'Prestation' },
    sous_traitance: { label:'Contrat de sous-traitance', short:'Sous-traitance' },
    lettre_mission: { label:'Lettre de mission', short:'Lettre mission' },
    convention_formation: { label:'Convention de formation', short:'Formation' },
    bc_cadre: { label:'Bon de commande cadre / Accord-cadre', short:'Accord-cadre' },
    freelance: { label:'Contrat freelance / Indépendant', short:'Freelance' },
    interim: { label:'Contrat de mise à disposition (intérim)', short:'Intérim' },
    nda: { label:'Accord de confidentialité (NDA)', short:'NDA' }
  };

  const CGV_DEFAULTS = {
    prestation: `Article 7 — Propriété intellectuelle\nLes livrables produits dans le cadre de la mission sont la propriété exclusive du Donneur d'ordre dès paiement intégral.\n\nArticle 8 — Confidentialité\nLe Prestataire s'engage à ne divulguer aucune information confidentielle relative aux activités, clients ou projets du Donneur d'ordre, pendant et après la durée du contrat.\n\nArticle 9 — Responsabilité & Assurances\nLe Prestataire doit être couvert par une assurance RC Professionnelle et, le cas échéant, une assurance Décennale. Le Prestataire est seul responsable de ses obligations sociales et fiscales.\n\nArticle 10 — Sous-traitance\nToute sous-traitance doit faire l'objet d'un accord écrit préalable du Donneur d'ordre.\n\nArticle 11 — Force majeure\nAucune partie ne sera tenue responsable d'un retard ou d'une inexécution résultant d'un cas de force majeure tel que défini par l'article 1218 du Code civil.\n\nArticle 12 — Données personnelles (RGPD)\nLe Prestataire s'engage à respecter le Règlement (UE) 2016/679 (RGPD) dans le traitement de toute donnée personnelle.\n\nArticle 13 — Non-sollicitation\nChaque partie s'interdit de solliciter ou embaucher tout collaborateur de l'autre partie pendant la durée du contrat et 12 mois après son terme.\n\nArticle 14 — Pénalités de retard\nEn cas de retard de paiement, des pénalités de retard seront appliquées au taux de 3 fois le taux d'intérêt légal. Une indemnité forfaitaire de recouvrement de 40 € sera due de plein droit.`,
    sous_traitance: `Article 7 — Loi du 31 décembre 1975\nLe présent contrat est soumis aux dispositions de la loi n°75-1334 relative à la sous-traitance. Le Donneur d'ordre s'engage à accepter le sous-traitant et à agréer ses conditions de paiement.\n\nArticle 8 — Garantie décennale\nLe sous-traitant doit justifier d'une assurance décennale en cours de validité couvrant les travaux objet du présent contrat.\n\nArticle 9 — Sécurité & Prévention\nLe sous-traitant s'engage à respecter le Plan Particulier de Sécurité et de Protection de la Santé (PPSPS) du chantier.\n\nArticle 10 — Confidentialité\nLe sous-traitant s'engage à la plus stricte confidentialité concernant les informations techniques et commerciales.\n\nArticle 11 — Pénalités de retard\nPénalités de retard : 3× le taux d'intérêt légal. Indemnité forfaitaire de recouvrement : 40 €.`,
    lettre_mission: `Article 7 — Étendue de la mission\nLa mission est réalisée conformément aux normes professionnelles applicables. Le professionnel est tenu à une obligation de moyens.\n\nArticle 8 — Secret professionnel\nLe professionnel est tenu au secret professionnel conformément aux dispositions légales et réglementaires.\n\nArticle 9 — Responsabilité\nLa responsabilité du professionnel est limitée au montant des honoraires perçus au titre de la mission concernée.\n\nArticle 10 — Pénalités de retard\nPénalités de retard : 3× le taux d'intérêt légal. Indemnité forfaitaire de recouvrement : 40 €.`,
    _default: `Article 7 — Confidentialité\nLe Prestataire s'engage à ne divulguer aucune information confidentielle relative aux activités du Donneur d'ordre.\n\nArticle 8 — Responsabilité & Assurances\nLe Prestataire est tenu de justifier d'une assurance RC Professionnelle en cours de validité.\n\nArticle 9 — Données personnelles (RGPD)\nLe Prestataire s'engage à respecter le Règlement (UE) 2016/679 dans le traitement de toute donnée personnelle.\n\nArticle 10 — Pénalités de retard\nPénalités de retard : 3× le taux d'intérêt légal. Indemnité forfaitaire de recouvrement : 40 €.`
  };
  const [showCGVEditor, setShowCGVEditor] = useState(false);

  const [factExtContratModal, setFactExtContratModal] = useState(null);
  const [contratEdit, setContratEdit] = useState({});
  const [contratView, setContratView] = useState('edit');
  const [prestaDetailTab, setPrestaDetailTab] = useState('fiche');
  const [prestaNewCompetence, setPrestaNewCompetence] = useState('');
  const [prestaNewDocForm, setPrestaNewDocForm] = useState(null);
  const [prestaNewMissionForm, setPrestaNewMissionForm] = useState(null);
  const [prestaNewTacheForm, setPrestaNewTacheForm] = useState(null);
  const [prestaNewContratRecuForm, setPrestaNewContratRecuForm] = useState(null);
  const [missionViewMode, setMissionViewMode] = useState('list');
  const [expandedTache, setExpandedTache] = useState(null);
  const [newComment, setNewComment] = useState('');

  const DOC_TYPES = {
    cv: { label:'CV / Portfolio', icon:'📄', category:'recu' },
    urssaf: { label:'Attestation URSSAF', icon:'🏛️', category:'recu', renewable:true, delaiMois:3 },
    rc_pro: { label:'RC Professionnelle', icon:'🛡️', category:'recu', renewable:true, delaiMois:12 },
    decennale: { label:'Décennale', icon:'🏗️', category:'recu', renewable:true, delaiMois:12 },
    rib: { label:'RIB', icon:'🏦', category:'recu' },
    kbis: { label:'Kbis / SIRENE', icon:'📋', category:'recu', renewable:true, delaiMois:3 },
    certif: { label:'Certification / Habilitation', icon:'🎖️', category:'recu', renewable:true },
    contrat_signe: { label:'Contrat signé', icon:'📜', category:'emis' },
    bon_commande: { label:'Bon de commande', icon:'📝', category:'emis' },
    ordre_mission: { label:'Ordre de mission', icon:'📋', category:'emis' },
    evaluation: { label:'Évaluation annuelle', icon:'⭐', category:'emis' },
    autre: { label:'Autre', icon:'📎', category:'recu' }
  };

  const MISSION_STATUTS = {
    en_attente: { label:'En attente', icon:'⏳', bg:'#f3f4f6', color:'#6b7280' },
    en_cours: { label:'En cours', icon:'🔄', bg:'#dbeafe', color:'#1e40af' },
    livre: { label:'Livré', icon:'📦', bg:'#fef3c7', color:'#92400e' },
    valide: { label:'Validé', icon:'✅', bg:'#dcfce7', color:'#166534' },
    annule: { label:'Annulé', icon:'❌', bg:'#fecaca', color:'#991b1b' }
  };
  const TACHE_STATUTS = {
    a_faire: { label:'À faire', icon:'📋', bg:'#f3f4f6', color:'#6b7280' },
    en_cours: { label:'En cours', icon:'🔄', bg:'#dbeafe', color:'#1e40af' },
    en_revue: { label:'En revue', icon:'👀', bg:'#fef3c7', color:'#92400e' },
    terminee: { label:'Terminée', icon:'✅', bg:'#dcfce7', color:'#166534' }
  };
  const TACHE_PRIORITES = {
    haute: { label:'Haute', icon:'▲', color:'#dc2626' },
    moyenne: { label:'Moyenne', icon:'●', color:'#d97706' },
    basse: { label:'Basse', icon:'▽', color:'#059669' }
  };

  const defaultFactExtData = {
    prestataires: [
      // FINANCE
      { id:'P001', nom:'Caroline MULLER', raisonSociale:'CM Finance Conseil', type:'freelance', categorie:'finance', specialite:'DAF externalisée / Direction financière', siret:'912 345 678 00012', tvaIntra:'FR12912345678', adresse:'15 rue du Général Leclerc', ville:'Strasbourg', cp:'67000', contactNom:'Caroline Muller', contactEmail:'caroline@cmfinance.fr', contactTel:'06 12 34 56 78', linkedin:'linkedin.com/in/caroline-muller-daf', siteWeb:'www.cmfinance.fr', modeFact:'mixte', tarifBase:650, tarifUnite:'€/jour', frequence:'hebdomadaire', joursParSemaine:2, joursMois:null, filiales:['yilmaz','ezel'], statut:'actif', evaluation:5, dateDebut:'2024-09-01', dateFin:null, contrat:{ type:'prestation', statut:'signe', dateDebut:'2024-09-01', dateFin:'2025-08-31', renouvellement:'tacite', ref:'CTR-2024-001', conditionsPaiement:'30_jours', cgv:'Article 7 — Propriété intellectuelle\nLes livrables sont la propriété exclusive du Donneur d’ordre dès paiement.\n\nArticle 8 — Confidentialité\nLe Prestataire s’engage à ne divulguer aucune information confidentielle.\n\nArticle 9 — Responsabilité & Assurances\nRC Pro obligatoire. Le Prestataire est seul responsable de ses obligations sociales et fiscales.\n\nArticle 10 — Pénalités de retard\nPénalités : 3x taux légal. Indemnité forfaitaire : 40€.' }, competences:['Finance BTP','Contrôle de gestion','Trésorerie','Budget prévisionnel','Reporting','Pennylane','Excel avancé'], evaluationDetail:{qualite:5,reactivite:5,rapport_qp:4,communication:5}, documents:[{id:'D001',type:'cv',nom:'CV Caroline Muller 2024.pdf',dateAjout:'2024-08-15',dateExpiration:null,statut:'valide'},{id:'D002',type:'urssaf',nom:'Attestation URSSAF Q4 2025.pdf',dateAjout:'2025-10-01',dateExpiration:'2026-01-01',statut:'valide'},{id:'D003',type:'rc_pro',nom:'RC Pro CM Finance.pdf',dateAjout:'2024-09-01',dateExpiration:'2025-09-01',statut:'expire'}], contrats_recus:[{id:'CR001',nom:'CGV CM Finance Conseil 2024',dateSignature:'2024-09-01',dateExpiration:'2025-08-31',statut:'actif',fichier:'CGV_CM_Finance.pdf'}], missions:[{id:'M001',nom:'Mise en place reporting mensuel',filiale:'yilmaz',description:'Création dashboards financiers mensuels pour toutes les filiales',dateDebut:'2024-10-01',dateFinPrevue:'2024-12-31',dateFinReelle:'2024-12-20',budget:15600,consomme:13000,statut:'valide',taches:[{id:'T001',titre:'Analyse besoins par filiale',description:'Rencontrer chaque directeur de filiale pour identifier les KPIs clés',priorite:'haute',dateDebut:'2024-10-01T09:00',dateFin:'2024-10-15T17:00',heures:16,heuresReelles:14,statut:'terminee',commentaires:[{auteur:'Ozdogan',date:'2024-10-10',texte:'Très bon travail, KPIs bien identifiés'},{auteur:'Caroline',date:'2024-10-12',texte:'Rapport final envoyé par email'}]},{id:'T002',titre:'Template Excel reporting',description:'Créer les templates Excel avec macros pour reporting automatisé',priorite:'haute',dateDebut:'2024-10-15T09:00',dateFin:'2024-11-15T17:00',heures:24,heuresReelles:28,statut:'terminee',commentaires:[{auteur:'Caroline',date:'2024-11-10',texte:'Templates finalisés, en attente de validation'}]},{id:'T003',titre:'Formation équipes',description:'Former les équipes compta à utiliser les nouveaux templates',priorite:'moyenne',dateDebut:'2024-12-01T09:00',dateFin:'2024-12-15T12:00',heures:8,heuresReelles:8,statut:'terminee',commentaires:[]}]},{id:'M002',nom:'Clôture annuelle 2025',filiale:'yilmaz',description:'Accompagnement clôture comptable annuelle',dateDebut:'2025-12-01',dateFinPrevue:'2026-03-31',dateFinReelle:null,budget:19500,consomme:6500,statut:'en_cours',taches:[{id:'T004',titre:'Revue analytique',description:'Revue de tous les comptes analytiques avant clôture',priorite:'haute',dateDebut:'2026-01-06T09:00',dateFin:'2026-01-31T17:00',heures:16,heuresReelles:10,statut:'en_cours',commentaires:[{auteur:'Caroline',date:'2026-01-20',texte:'Anomalie détectée sur le compte 607, en investigation'}]},{id:'T005',titre:'Rapprochements bancaires',description:'Rapprochements bancaires des 5 comptes société',priorite:'haute',dateDebut:'2026-02-01T09:00',dateFin:'2026-02-28T17:00',heures:8,heuresReelles:0,statut:'a_faire',commentaires:[]},{id:'T006',titre:'Liasse fiscale',description:'Préparation et dépôt de la liasse fiscale',priorite:'moyenne',dateDebut:'2026-03-01T09:00',dateFin:'2026-03-31T17:00',heures:12,heuresReelles:0,statut:'a_faire',commentaires:[]}]}], notes:'2 jours/semaine. Forfait 5 200€/mois + variable si missions exceptionnelles. Très compétente, connaissance BTP.' },
      { id:'P002', nom:'Cabinet OSTWALD & Associés', raisonSociale:'OSTWALD Expertise Comptable SARL', type:'cabinet', categorie:'finance', specialite:'Expert-comptable / Commissariat aux comptes', siret:'345 678 912 00023', tvaIntra:'FR45345678912', adresse:'8 place Kléber', ville:'Strasbourg', cp:'67000', contactNom:'Marc Ostwald', contactEmail:'m.ostwald@ostwald-ec.fr', contactTel:'03 88 22 33 44', modeFact:'forfait_mensuel', tarifBase:2800, tarifUnite:'€/mois', frequence:'mensuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz','ezel','echafaudage','roulotte'], statut:'actif', evaluation:4, dateDebut:'2022-01-01', dateFin:null, contrat:{ type:'lettre_mission', statut:'signe', dateDebut:'2022-01-01', dateFin:'2025-12-31', renouvellement:'tacite', ref:'CTR-2022-001', conditionsPaiement:'30_jours_fin_mois' }, notes:'Gère compta des 4 entités. Forfait 2 800€/mois pour YILMAZ + forfaits séparés par filiale. Mission CAC en sus.' },
      // RH
      { id:'P003', nom:'Sophie WEBER', raisonSociale:'SW Conseil RH', type:'auto_entrepreneur', categorie:'rh', specialite:'Consultante RH / Recrutement BTP', siret:'567 890 123 00034', tvaIntra:'', adresse:'', ville:'Molsheim', cp:'67120', contactNom:'Sophie Weber', contactEmail:'sophie.weber@swrh.fr', contactTel:'06 78 90 12 34', modeFact:'forfait_mission', tarifBase:3500, tarifUnite:'€/mission', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz'], statut:'en_veille', evaluation:4, dateDebut:'2024-03-01', dateFin:'2024-12-15', contrat:{ type:'freelance', statut:'expire', dateDebut:'2024-03-01', dateFin:'2024-12-15', renouvellement:'non', ref:'CTR-2024-003' }, notes:'Recrutement conducteur de travaux + chef de chantier. 3 500€ par recrutement abouti. En veille pour prochaine mission.' },
      // IT
      { id:'P004', nom:'Karim BENALI', raisonSociale:'KB Dev', type:'freelance', categorie:'it', specialite:'Développeur full-stack React / Node.js', siret:'678 901 234 00045', tvaIntra:'FR67678901234', adresse:'', ville:'Strasbourg', cp:'67000', contactNom:'Karim Benali', contactEmail:'karim@kbdev.fr', contactTel:'06 45 67 89 01', linkedin:'linkedin.com/in/karim-amrani-dev', siteWeb:'karim-dev.fr', modeFact:'tjm', tarifBase:450, tarifUnite:'€/jour', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz'], statut:'actif', evaluation:5, dateDebut:'2025-01-15', dateFin:null, contrat:{ type:'freelance', statut:'signe', dateDebut:'2025-01-15', dateFin:'2025-12-31', renouvellement:'tacite', ref:'CTR-2025-004' }, competences:['React','Node.js','TypeScript','PostgreSQL','API REST','Tailwind CSS','Git','Docker'], evaluationDetail:{qualite:5,reactivite:4,rapport_qp:5,communication:4}, missions:[{id:'M003',nom:'Portail YILMAZ v2',filiale:'yilmaz',description:'Refonte complète du simulateur ruches et modules de gestion',dateDebut:'2025-01-15',dateFinPrevue:'2025-06-30',dateFinReelle:null,budget:45000,consomme:28350,statut:'en_cours',taches:[{id:'T007',titre:'Module Facturation Interne',description:'Développement complet du module de facturation inter-filiales',priorite:'haute',dateDebut:'2025-02-01T09:00',dateFin:'2025-03-15T18:00',heures:80,heuresReelles:75,statut:'terminee',commentaires:[]},{id:'T008',titre:'CRM Prestataires',description:'CRM complet avec gestion contrats, documents, missions',priorite:'haute',dateDebut:'2025-03-15T09:00',dateFin:'2025-04-30T18:00',heures:60,heuresReelles:35,statut:'en_cours',commentaires:[{auteur:'Karim',date:'2026-02-20',texte:'6 tabs du detail panel terminés, tests en cours'}]},{id:'T009',titre:'Module Trésorerie',description:'Dashboard trésorerie avec prévisionnel et rapprochements',priorite:'moyenne',dateDebut:'2025-05-01T09:00',dateFin:'2025-06-15T18:00',heures:40,heuresReelles:0,statut:'a_faire',commentaires:[]}]}], notes:'Développement portail YILMAZ et sites filiales. TJM 450€. Missions ponctuelles, facture au réel.' },
      { id:'P005', nom:'NovIT Solutions', raisonSociale:'NovIT Solutions SAS', type:'societe', categorie:'it', specialite:'Infogérance / Support IT / Hébergement', siret:'789 012 345 00056', tvaIntra:'FR78789012345', adresse:'Zone Actipôle', ville:'Entzheim', cp:'67960', contactNom:'Thomas Klein', contactEmail:'support@novit.fr', contactTel:'03 88 55 66 77', modeFact:'forfait_mensuel', tarifBase:890, tarifUnite:'€/mois', frequence:'mensuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz','ezel','echafaudage','roulotte'], statut:'actif', evaluation:3, dateDebut:'2023-06-01', dateFin:null, contrat:{ type:'prestation', statut:'signe', dateDebut:'2023-06-01', dateFin:'2026-05-31', renouvellement:'tacite', ref:'CTR-2023-005' }, notes:'Forfait infogérance 890€/mois : serveur, emails, sauvegarde, support N1. Interventions sur site facturées 85€/h en sus.' },
      // JURIDIQUE
      { id:'P006', nom:'Cabinet MEYER Avocats', raisonSociale:'MEYER & Associés AARPI', type:'cabinet', categorie:'juridique', specialite:'Droit social / Droit des affaires / Contentieux BTP', siret:'890 123 456 00067', tvaIntra:'FR89890123456', adresse:'5 quai Kléber', ville:'Strasbourg', cp:'67000', contactNom:'Maître Anne Meyer', contactEmail:'a.meyer@meyer-avocats.fr', contactTel:'03 88 33 44 55', modeFact:'horaire', tarifBase:250, tarifUnite:'€/h', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz','ezel'], statut:'actif', evaluation:4, dateDebut:'2023-01-01', dateFin:null, contrat:{ type:'prestation', statut:'signe', dateDebut:'2023-01-01', dateFin:null, renouvellement:'tacite', ref:'CTR-2023-006' }, notes:'Taux horaire 250€ HT. Conseil droit social + contentieux prud\'hommes. Forfait possible pour dossiers récurrents.' },
      // MARKETING
      { id:'P007', nom:'Léa FISCHER', raisonSociale:'Studio Léa', type:'auto_entrepreneur', categorie:'marketing', specialite:'Graphiste / Identité visuelle / Supports print', siret:'901 234 567 00078', tvaIntra:'', adresse:'', ville:'Obernai', cp:'67210', contactNom:'Léa Fischer', contactEmail:'lea@studiolea.fr', contactTel:'06 23 45 67 89', modeFact:'forfait_mission', tarifBase:0, tarifUnite:'€/mission', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['yilmaz'], statut:'actif', evaluation:5, dateDebut:'2025-02-01', dateFin:null, contrat:{ type:'freelance', statut:'a_preparer', dateDebut:'', dateFin:'', renouvellement:'non', ref:'' }, notes:'Tarifs selon projet : Logo 800€, Plaquette 4p 600€, Carte visite 150€, Charte graphique complète 2 500€. Très créative.' },
      // FORMATION
      { id:'P008', nom:'APAVE Alsacienne', raisonSociale:'APAVE Alsacienne SAS', type:'organisme', categorie:'formation', specialite:'Formations réglementaires BTP / Habilitations / CACES', siret:'012 345 678 00089', tvaIntra:'FR01012345678', adresse:'2 rue Hélène Boucher', ville:'Schiltigheim', cp:'67300', contactNom:'Service Formation', contactEmail:'formation.alsace@apave.com', contactTel:'03 88 10 56 00', modeFact:'forfait_mission', tarifBase:0, tarifUnite:'€/session', frequence:'ponctuel', joursParSemaine:null, joursMois:null, filiales:['ezel','echafaudage'], statut:'actif', evaluation:4, dateDebut:'2022-01-01', dateFin:null, contrat:{ type:'convention_formation', statut:'signe', dateDebut:'2022-01-01', dateFin:'2026-12-31', renouvellement:'annuel', ref:'CTR-2022-008' }, notes:'CACES R486 : 1 200€/pers. Habilitation électrique : 650€/pers. Travail en hauteur : 450€/pers. SST : 250€/pers. Remises groupe.' },
    ],
    factures: [
      { id:'FE001', ref:'FC-2026-CM-001', prestaId:'P001', filialeId:'yilmaz', dateFacture:'2026-01-31', dateReception:'2026-02-03', dateEcheance:'2026-03-05', montantHT:5200, tva:20, montantTTC:6240, objet:'DAF externalisée — Janvier 2026 (8 jours)', periode:'2026-01', statut:'bon_a_payer', chantier:'', notes:'Forfait mensuel 2j/semaine' },
      { id:'FE002', ref:'FC-2026-OST-012', prestaId:'P002', filialeId:'yilmaz', dateFacture:'2026-01-31', dateReception:'2026-02-05', dateEcheance:'2026-03-15', montantHT:2800, tva:20, montantTTC:3360, objet:'Honoraires comptabilité YILMAZ — Janvier 2026', periode:'2026-01', statut:'validation_daf', chantier:'', notes:'' },
      { id:'FE003', ref:'FC-2026-KB-003', prestaId:'P004', filialeId:'yilmaz', dateFacture:'2026-02-15', dateReception:'2026-02-17', dateEcheance:'2026-03-17', montantHT:2250, tva:20, montantTTC:2700, objet:'Développement portail YILMAZ — 5 jours (Sprint février)', periode:'2026-02', statut:'validation_manager', chantier:'', notes:'5j × 450€ TJM' },
      { id:'FE004', ref:'FC-2026-NOV-02', prestaId:'P005', filialeId:'yilmaz', dateFacture:'2026-02-01', dateReception:'2026-02-03', dateEcheance:'2026-03-03', montantHT:890, tva:20, montantTTC:1068, objet:'Forfait infogérance — Février 2026', periode:'2026-02', statut:'payee', chantier:'', datePaiement:'2026-02-20', notes:'' },
      { id:'FE005', ref:'FC-2026-MEY-007', prestaId:'P006', filialeId:'yilmaz', dateFacture:'2026-02-10', dateReception:'2026-02-12', dateEcheance:'2026-03-12', montantHT:1500, tva:20, montantTTC:1800, objet:'Conseil droit social — Dossier prud\'hommes ex-salarié + rédaction contrat prestation', periode:'2026-02', statut:'reception', chantier:'', notes:'6h conseil @ 250€/h' },
      { id:'FE006', ref:'FC-2026-LEA-001', prestaId:'P007', filialeId:'yilmaz', dateFacture:'2026-02-20', dateReception:'2026-02-22', dateEcheance:'2026-03-22', montantHT:2500, tva:0, montantTTC:2500, objet:'Charte graphique Group OY — Identité visuelle complète', periode:'2026-02', statut:'reception', chantier:'', notes:'Auto-entrepreneur non assujettie TVA. Livrable : logo, charte, templates PPT/Word' },
    ]
  };
  const [factExtData, setFactExtData] = useState(defaultFactExtData);
  const saveFactExt = async (data) => {
    setFactExtData(data);
    try { await window.storage.set('factext-data-v2', JSON.stringify(data)); } catch(e) {}
  };
  useEffect(() => {
    (async () => {
      try {
        const stored = await window.storage.get('factext-data-v2');
        if (stored?.value) {
          const parsed = JSON.parse(stored.value);
          setFactExtData(prev => ({ ...defaultFactExtData, ...parsed }));
        }
      } catch(e) {}
    })();
  }, []);
  const savePresta = (presta, isNew) => {
    const nd = isNew
      ? { ...factExtData, prestataires: [...factExtData.prestataires, presta] }
      : { ...factExtData, prestataires: factExtData.prestataires.map(p => p.id === presta.id ? presta : p) };
    saveFactExt(nd);
  };
  const deletePresta = (id) => saveFactExt({ ...factExtData, prestataires: factExtData.prestataires.filter(p => p.id !== id) });
  const saveFactExtEntry = (fa, isNew) => {
    const nd = isNew
      ? { ...factExtData, factures: [fa, ...factExtData.factures] }
      : { ...factExtData, factures: factExtData.factures.map(f => f.id === fa.id ? fa : f) };
    saveFactExt(nd);
  };
  const deleteFactExtEntry = (id) => saveFactExt({ ...factExtData, factures: factExtData.factures.filter(f => f.id !== id) });
  const updateFactExtStatut = (id, statut) => {
    if (statut === 'rejetee') {
      setRejetModal({ factureId: id, motif: '' });
      return;
    }
    const nd = { ...factExtData, factures: factExtData.factures.map(f => f.id === id ? { ...f, statut, ...(statut==='payee' ? {datePaiement: new Date().toISOString().slice(0,10)} : {}), ...(statut !== 'rejetee' ? {motifRejet:null, dateRejet:null} : {}) } : f) };
    saveFactExt(nd);
  };
  const confirmRejet = () => {
    if (!rejetModal) return;
    const nd = { ...factExtData, factures: factExtData.factures.map(f => f.id === rejetModal.factureId ? { ...f, statut:'rejetee', motifRejet: rejetModal.motif || 'Non spécifié', dateRejet: new Date().toISOString().slice(0,10) } : f) };
    saveFactExt(nd);
    setRejetModal(null);
  };

  const niveauxRuche = ['XXS','XS','S','M','L','XL','XXL','XXXL'];
  const statutsChantier = ['Planifié','En cours','Terminé'];
  
  const saveEmploye = () => {
    if (!employeForm.nom || !employeForm.prenom) return;
    if (modalEmploye === 'add') {
      const maxN = employes.reduce((m,e) => { const n = parseInt(e.id.replace('EMP','')); return n > m ? n : m; }, 0);
      const newId = `EMP${String(maxN+1).padStart(4,'0')}`;
      const entry = { date: new Date().toISOString().slice(0,10), type:'Entrée', poste: employeForm.posteExterne, niveau: employeForm.niveau, note:'Ajout manuel' };
      setEmployes(prev => [...prev, {...employeForm, id: newId, filialeId: employeForm.filialeId || 'yilmaz', historique:[entry]}]);
    } else {
      setEmployes(prev => prev.map(e => e.id === employeForm.id ? {...employeForm} : e));
    }
    setModalEmploye(null);
  };
  const deleteEmploye = (id) => {
    setEmployes(prev => prev.filter(e => e.id !== id));
    setConfirmDelete(null);
  };
  const saveChantier = () => {
    if (!chantierForm.nom || !chantierForm.client) return;
    if (modalChantier === 'add') {
      const maxN = chantiers.reduce((m,c) => { const n = parseInt(c.id.replace('CH','')); return n > m ? n : m; }, 0);
      const newId = `CH${String(maxN+1).padStart(4,'0')}`;
      setChantiers(prev => [...prev, {...chantierForm, id: newId, filialeId: chantierForm.filialeId || null, budgetHT: Number(chantierForm.budgetHT), montantVente: Number(chantierForm.montantVente), depense: Number(chantierForm.depense), avancement: Number(chantierForm.avancement)}]);
    } else {
      setChantiers(prev => prev.map(c => c.id === chantierForm.id ? {...chantierForm, budgetHT: Number(chantierForm.budgetHT), montantVente: Number(chantierForm.montantVente), depense: Number(chantierForm.depense), avancement: Number(chantierForm.avancement)} : c));
    }
    setModalChantier(null);
  };
  const deleteChantier = (id) => {
    setChantiers(prev => prev.filter(c => c.id !== id));
    setConfirmDelete(null);
  };

  const [filialesDynamiques, setFilialesDynamiques] = usePersistedState('filiales', FILIALES_INIT);

  // Migration: ajouter L'Étanchéité si absente + sync couleurs
  useEffect(() => {
    let needsUpdate = false;
    let updated = [...filialesDynamiques];
    if (updated.length > 0 && !updated.find(f => f.nom === "L'Étanchéité")) {
      const investExeIdx = updated.findIndex(f => f.nom === 'INVEST EXE');
      const etancheite = { id: 6, nom: "L'Étanchéité", holding: 'INVEST EXE', activite: "Travaux d'étanchéité et imperméabilisation", icon: '💧', ca: 2000000, effectif: 4, sousTraitancePct: 40, fraisInternesPct: 22, margeBrutePct: 60, couleur: '#0e6655',
        historique: [{ annee: '2024', ca: 0.8, ebe: 0.06 }, { annee: '2025', ca: 2.0, ebe: 0.18 }]
      };
      if (investExeIdx >= 0) { updated.splice(investExeIdx, 0, etancheite); } else { updated.push(etancheite); }
      updated = updated.map(f => f.nom === 'INVEST EXE' ? {...f, activite: "Holding Exécution — Détient Ezel Bâtiment & L'Étanchéité"} : f);
      needsUpdate = true;
    }
    const colorSync = { 'La Roulotte': '#C49A2A', "L'Échafaudage": '#6C3483', 'Ezel Bâtiment': '#007ab5', "L'Étanchéité": '#0e6655' };
    const iconSync = { 'La Roulotte': '🚛', "L'Échafaudage": '⚙️', 'Ezel Bâtiment': '🏗️', "L'Étanchéité": '💧' };
    updated = updated.map(f => {
      let changed = false; let newF = {...f};
      if (colorSync[f.nom] && f.couleur !== colorSync[f.nom]) { changed = true; newF.couleur = colorSync[f.nom]; }
      if (iconSync[f.nom] && f.icon !== iconSync[f.nom]) { changed = true; newF.icon = iconSync[f.nom]; }
      if (changed) { needsUpdate = true; return newF; }
      return f;
    });
    if (needsUpdate) setFilialesDynamiques(updated);
  }, [filialesDynamiques.length, filialesDynamiques.map(f=>f.icon).join()]);

  // Centre de Données
  const [donneesFinancieres, setDonneesFinancieres] = usePersistedState('donneesFinancieres', DONNEES_FIN_INIT);
  const [donneesAnneeActive, setDonneesAnneeActive] = usePersistedState('donneesAnneeActive', '2026');
  const [donneesAnneesSupp, setDonneesAnneesSupp] = usePersistedState('donneesAnneesSupp', []);
  const [pennylaneApiKey, setPennylaneApiKey] = usePersistedState('pennylaneApiKey', '');
  const [pennylaneStatus, setPennylaneStatus] = useState(null);
  const [pennylaneError, setPennylaneError] = useState('');

  // Calculs KPI
  const getKpiFiliale = (f) => {
    const m = donneesFinancieres?.[f.id]?.[donneesAnneeActive] || donneesFinancieres?.[String(f.id)]?.[donneesAnneeActive] || {};
    const ca = m.ca ?? f.ca;
    const sousTraitance = m.sousTraitance ?? (ca * f.sousTraitancePct / 100);
    const margeBrute = m.margeBrute ?? (ca * f.margeBrutePct / 100);
    const fraisInternes = m.fraisInternes ?? (ca * f.fraisInternesPct / 100);
    const fraisStructure = m.fraisStructure ?? (ca * 0.06);
    const ebe = m.ebe ?? (margeBrute - fraisInternes - fraisStructure);
    const ebePct = ca > 0 ? (ebe / ca * 100) : 0;
    const amortissements = m.amortissements ?? (ca * 0.03);
    const resultatExploitation = m.resultatExploitation ?? (ebe - amortissements);
    const impots = Math.max(0, resultatExploitation * 0.25);
    const resultatNet = m.rn ?? (resultatExploitation - impots);
    const resultatNetPct = ca > 0 ? (resultatNet / ca * 100) : 0;
    const margeBrutePct = ca > 0 ? (margeBrute / ca * 100) : f.margeBrutePct;
    const sousTraitancePct = ca > 0 ? (sousTraitance / ca * 100) : f.sousTraitancePct;
    const effectif = m.effectif ?? f.effectif;
    const caParCollab = effectif > 0 ? ca / effectif : 0;
    const tresorerie = m.tresorerie ?? null;
    const bfr = m.bfr ?? null;
    const masseSalariale = m.masseSalariale ?? null;
    const nbChantiers = m.nbChantiers ?? null;
    const caObjectif = m.caObjectif ?? null;
    const ebeObjectif = m.ebeObjectif ?? null;
    return { id: f.id, ca, sousTraitance, sousTraitancePct, margeBrute, margeBrutePct, fraisInternes, fraisStructure, ebe, ebePct, amortissements, resultatExploitation, impots, beneficeNet: resultatNet, resultatNet, resultatNetPct, caParCollab, effectif, tresorerie, bfr, masseSalariale, nbChantiers, caObjectif, ebeObjectif };
  };

  const calculsFiliales = filialesDynamiques.filter(f => f.holding !== 'GROUP OY').map(f => getKpiFiliale(f));

  const filialesEnrichies = filialesDynamiques.map(f => {
    if (f.holding === 'GROUP OY') {
      const children = filialesDynamiques.filter(c => c.holding === f.nom);
      if (children.length > 0) {
        const totalCA = children.reduce((s, c) => s + c.ca, 0);
        const totalEffectif = children.reduce((s, c) => s + c.effectif, 0);
        const avgMarge = children.reduce((s, c) => s + c.margeBrutePct, 0) / children.length;
        const avgSousTraitance = children.reduce((s, c) => s + c.sousTraitancePct, 0) / children.length;
        const avgFraisInternes = children.reduce((s, c) => s + c.fraisInternesPct, 0) / children.length;
        const historique = children[0].historique ? children[0].historique.map((_, i) => ({
          annee: children[0].historique[i]?.annee,
          ca: children.reduce((s, c) => s + (c.historique?.[i]?.ca || 0), 0),
          ebe: children.reduce((s, c) => s + (c.historique?.[i]?.ebe || 0), 0)
        })) : f.historique;
        return { ...f, ca: totalCA, effectif: totalEffectif, margeBrutePct: Math.round(avgMarge), sousTraitancePct: Math.round(avgSousTraitance), fraisInternesPct: Math.round(avgFraisInternes), historique };
      }
    }
    return f;
  });

  const ajouterFiliale = () => {
    if (!nouvelleFiliale.nom) return;
    setFilialesDynamiques([...filialesDynamiques, {
      id: Date.now(), ...nouvelleFiliale, icon: '🏢',
      ca: Number(nouvelleFiliale.ca), effectif: Number(nouvelleFiliale.effectif),
      sousTraitancePct: Number(nouvelleFiliale.sousTraitancePct),
      fraisInternesPct: Number(nouvelleFiliale.fraisInternesPct),
      margeBrutePct: Number(nouvelleFiliale.margeBrutePct),
      couleur: '#7c3aed',
      historique: [{ annee: '2025', ca: Number(nouvelleFiliale.ca) / 1000000, ebe: Number(nouvelleFiliale.ca) / 1000000 * 0.08 }]
    }]);
    setNouvelleFiliale({ nom: '', holding: 'INVEST LOC', activite: '', ca: 0, effectif: 0, sousTraitancePct: 55, fraisInternesPct: 25, margeBrutePct: 45 });
    setModalFilialeOuvert(false);
  };

  const supprimerFiliale = (id) => {
    setFilialesDynamiques(filialesDynamiques.filter(f => f.id !== id));
  };

  // Simulateur général
  const [niveauSelectionne, setNiveauSelectionne] = useState("XL");
  const [ca, setCa] = useState(3500000);
  const [sousTraitance, setSousTraitance] = useState(0.55);
  const [fraisInternes, setFraisInternes] = useState(ca * 0.25);
  const [tauxAmortissements, setTauxAmortissements] = useState(0.03);
  const [tauxFraisYilmaz, setTauxFraisYilmaz] = useState(0.03);
  const [tauxFraisHolding, setTauxFraisHolding] = useState(0.02);
  const [tauxFraisGroupOY, setTauxFraisGroupOY] = useState(0.01);
  const tauxImpots = 0.25;
  const [simTab, setSimTab] = useState('simulateur');
  const [simScenarios, setSimScenarios] = useState([]);
  const [simCompare, setSimCompare] = useState(false);
  const [simScenarioNom, setSimScenarioNom] = useState('');
  const [simPrintSel, setSimPrintSel] = useState({params:true,resultats:true,bilan:true,classement:false,scenarios:false});

  useEffect(() => { setFraisInternes(ca * 0.25); }, [ca]);

  // Suivi collaborateurs
  // Suivi: use real employes data for performance tracking
  const [suiviFilialeFilter, setSuiviFilialeFilter] = useState('all');
  const [suiviSearch, setSuiviSearch] = useState('');
  const [suiviFiltreOpen, setSuiviFiltreOpen] = useState(false);
  const [orgDirMode, setOrgDirMode] = useState('inside');
  const [orgBisExpanded, setOrgBisExpanded] = useState({groupoy:true,invest_exe:true,invest_loc:true,yilmaz:true});
  const toggleOrgBis = (key) => setOrgBisExpanded(prev => ({...prev, [key]: !prev[key]}));
  const [collaborateurs, setCollaborateurs] = usePersistedState('collaborateurs', COLLABORATEURS_INIT);
  const [collabSelectionne, setCollabSelectionne] = useState(1);
  const [filtreAnnee, setFiltreAnnee] = useState('toutes');

  // Organigramme et Essaim
  const [modalAjoutOuvert, setModalAjoutOuvert] = useState(false);
  const [employes, setEmployes] = usePersistedState('employes_v5', EMPLOYES_INIT);

  // ═══════════════════════════════════════════════════════
  // PART 2 — Chantiers, Migrations, AO, Veille, Planning, Postes
  // ═══════════════════════════════════════════════════════

  const [chantiers, setChantiers] = usePersistedState('chantiers', CHANTIERS_INIT);

  useEffect(() => {
    if (chantiers.length > 0 && !chantiers.find(c => c.id === 'CH013')) {
      setChantiers(prev => [...prev,
        { id: 'CH013', nom: 'Étanchéité Toiture Hôpital Bicêtre', filialeId: 6, responsableId: null, statut: 'En cours', avancement: 55, budgetHT: 380000, montantVente: 520000, depense: 215000, dateDebut: '2024-11-15', dateFin: '2025-06-30', client: 'AP-HP' },
        { id: 'CH014', nom: 'Imperméabilisation Parking Bercy', filialeId: 6, responsableId: null, statut: 'En cours', avancement: 35, budgetHT: 195000, montantVente: 280000, depense: 72000, dateDebut: '2025-01-10', dateFin: '2025-07-15', client: 'Indigo Infra' },
        { id: 'CH015', nom: 'Réfection Terrasses Résidence Montsouris', filialeId: 6, responsableId: null, statut: 'Planifié', avancement: 10, budgetHT: 145000, montantVente: 210000, depense: 15000, dateDebut: '2025-03-01', dateFin: '2025-09-30', client: 'Nexity' }
      ]);
    }
  }, [chantiers.length]);

  useEffect(() => {
    const CURRENT_EMP_VERSION = 8;
    const storedVersion = parseInt(localStorage.getItem('oy_emp_version') || '0');
    if (storedVersion < CURRENT_EMP_VERSION) {
      const fixes = {
        'EMP001': { filialeId: 'yilmaz', isResponsable: true },
        'EMP002': { filialeId: 'yilmaz', isResponsable: false },
        'EMP003': { filialeId: 'yilmaz', isResponsable: false },
        'EMP004': { filialeId: 'yilmaz', isResponsable: false },
        'EMP005': { filialeId: 3, service: 'EZEL', isResponsable: true },
        'EMP006': { prenom: 'Loetitia', filialeId: 2, service: 'ECH', salaireFix: 45000, primeFix: 5000, isResponsable: true, niveau: 'XL', variable: 32000 },
        'EMP015': { filialeId: 1, service: 'ROU', isResponsable: true },
        'EMP008': { filialeId: 3, service: 'EZEL', isResponsable: true },
        'EMP009': { filialeId: 3, service: 'EZEL', isResponsable: true },
        'EMP010': { filialeId: 3, service: 'EZEL', isResponsable: true },
        'EMP011': { filialeId: 2, service: 'ECH', isResponsable: true },
        'EMP012': { filialeId: 2, service: 'ECH', isResponsable: false },
        'EMP013': { filialeId: 1, service: 'ROU', isResponsable: false },
        'EMP014': { filialeId: 'yilmaz', service: 'RH', isResponsable: false },
        'EMP015': { filialeId: 1, service: 'ROU', isResponsable: true },
        'EMP016': { filialeId: 6, service: 'ETAN', isResponsable: true }
      };
      setEmployes(prev => {
        const patched = prev.map(e => {
          const f = fixes[e.id];
          return f ? {...e, ...f} : e;
        });
        const missingEmps = [
          { id: 'EMP008', nom: 'LEMAIRE', prenom: 'David', dateNaissance: '1984-07-10', dateEntree: '2020-03-01', groupe: '1', filiale: '1', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Architecte des Plans', posteExterne: "Responsable Étude de Prix", isResponsable: true, caGere: 3000000, margeBrutePct: 35, ebePct: 9, salaireFix: 42000, primeFix: 6000, variable: 10000, email: 'dlemaire@ezel.fr', historique: [] },
          { id: 'EMP009', nom: 'DOS SANTOS', prenom: 'Sophie', dateNaissance: '1989-04-15', dateEntree: '2016-09-01', groupe: '1', filiale: '1', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Gardien de Ruche', posteExterne: 'Responsable Administration & Coordination', isResponsable: true, salaireFix: 38000, primeFix: 5000, variable: 8000, email: 'sdossantos@ezel.fr', historique: [] },
          { id: 'EMP010', nom: 'DA SILVA', prenom: 'Vitor', dateNaissance: '1986-10-22', dateEntree: '2017-04-01', groupe: '1', filiale: '1', filialeId: 3, service: 'EZEL', niveau: 'M', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Chef de Chantier Gros Œuvre', isResponsable: true, caGere: 4000000, margeBrutePct: 32, ebePct: 7, salaireFix: 35000, primeFix: 4000, variable: 8000, email: 'vdasilva@ezel.fr', historique: [] },
          { id: 'EMP011', nom: 'LEFEVRE', prenom: 'Antoine', dateNaissance: '1988-08-20', dateEntree: '2016-11-01', groupe: '1', filiale: '2', filialeId: 2, service: 'ECH', niveau: 'M', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Chef de Groupe Échafaudage', isResponsable: true, caGere: 7000000, margeBrutePct: 52, ebePct: 13, salaireFix: 40000, primeFix: 7000, variable: 18000, historique: [] },
          { id: 'EMP012', nom: 'GARCIA', prenom: 'Mathieu', dateNaissance: '1996-02-11', dateEntree: '2021-09-01', groupe: '1', filiale: '2', filialeId: 2, service: 'ECH', niveau: 'S', posteInterne: 'Bâtisseur', posteExterne: 'Conducteur Travaux Échaf.', isResponsable: false, salaireFix: 38000, primeFix: 5000, variable: 6000, historique: [] },
          { id: 'EMP013', nom: 'THOMAS', prenom: 'Éric', dateNaissance: '1993-03-28', dateEntree: '2019-04-01', groupe: '1', filiale: '3', filialeId: 1, service: 'ROU', niveau: 'S', posteInterne: 'Bâtisseur', posteExterne: 'Commercial Location', isResponsable: false, salaireFix: 35000, primeFix: 4000, variable: 5000, historique: [] },
          { id: 'EMP014', nom: 'CICCOLALLO', prenom: 'Sarah', dateNaissance: '2000-03-20', dateEntree: '2023-11-08', groupe: '2', filiale: '0', filialeId: 'yilmaz', service: 'RH', niveau: 'M', posteInterne: 'Sentinelle des Abeilles', posteExterne: 'Chargée RH Group', isResponsable: false, salaireFix: 32000, primeFix: 4000, variable: 3000, email: 'sciccolallo@ezel.fr', historique: [] },
      { id: 'EMP015', nom: 'ARULSOTHY', prenom: 'Diane', dateNaissance: '1988-11-25', dateEntree: '2017-03-01', groupe: '1', filiale: '3', filialeId: 1, service: 'ROU', niveau: 'XL', posteInterne: 'Régisseur de Ruche', posteExterne: "Responsable d'Agence", isResponsable: true, statut: 'actif', salaireFix: 42000, primeFix: 5000, variable: 8000, email: 'darulsothy@laroulotte.fr', historique: [] },
          { id: 'EMP016', nom: 'FERREIRA', prenom: 'Nadia', dateNaissance: '1987-08-12', dateEntree: '2018-05-01', groupe: '1', filiale: '4', filialeId: 6, service: 'ETAN', niveau: 'XL', posteInterne: 'Régisseur de Ruche', posteExterne: "Responsable d'Agence", isResponsable: true, caGere: 2000000, margeBrutePct: 60, ebePct: 15, salaireFix: 40000, primeFix: 8000, variable: 25000, email: 'nferreira@letancheite.fr', historique: [] },
          { id: 'EMP017', nom: 'JOVANOVIC', prenom: 'Predrag', dateNaissance: '1985-04-15', dateEntree: '2023-04-01', groupe: '1', filiale: '3', filialeId: 2, service: 'ECH', niveau: 'M', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Conducteur de Travaux', isResponsable: false, salaireFix: 35000, primeFix: 3000, variable: 4000, email: 'pjovanovic@lechafaudage.fr', historique: [] },
          { id: 'EMP018', nom: 'AZIYANE', prenom: 'Ali', dateNaissance: '1982-06-30', dateEntree: '2019-01-01', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Maître-Apiculteur', posteExterne: "Chargé d'Affaires", isResponsable: false, salaireFix: 38000, primeFix: 3000, variable: 6000, email: 'aaziyane@ezel.fr', historique: [] },
          { id: 'EMP019', nom: 'BEGUIR', prenom: 'Mohamed Taher', dateNaissance: '1983-12-01', dateEntree: '2018-09-01', groupe: '1', filiale: '1', filialeId: 3, service: 'EZEL', niveau: 'M', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Chef de Chantier (Enduit/Ravalement)', isResponsable: true, salaireFix: 33000, primeFix: 3000, variable: 6000, email: 'mbeguir@ezel.fr', historique: [] },
          { id: 'EMP020', nom: 'BORDES', prenom: 'Priscillia', dateNaissance: '1995-03-15', dateEntree: '2024-01-15', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'S', posteInterne: 'Ouvrière-Bâtisseuse', posteExterne: 'Assistante Administratif & Technique', isResponsable: false, salaireFix: 26000, primeFix: 1500, variable: 0, email: 'pbordes@ezel.fr', historique: [] },
          { id: 'EMP021', nom: 'DIES', prenom: 'Laurent', statut: 'actif', condition: 'arret_maladie', dateNaissance: '1980-07-22', dateEntree: '2019-06-01', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Maître-Apiculteur', posteExterne: "Chargé d'Affaires", isResponsable: false, salaireFix: 38000, primeFix: 3000, variable: 5000, email: 'ldies@ezel.fr', historique: [], arretMaladie: true },
          { id: 'EMP022', nom: 'BEENEN', prenom: 'Auguste', dateNaissance: '1990-11-08', dateEntree: '2021-03-01', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'S', posteInterne: 'Ouvrière-Bâtisseuse', posteExterne: 'Ouvrier Qualifié', isResponsable: false, salaireFix: 24000, primeFix: 0, variable: 0, email: 'abeenen@ezel.fr', historique: [], arretMaladie: true },
          { id: 'EMP023', nom: 'COSTA', prenom: 'Lucas Wellison', dateNaissance: '1993-05-20', dateEntree: '2022-09-01', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'S', posteInterne: 'Ouvrière-Bâtisseuse', posteExterne: 'Ouvrier', isResponsable: false, salaireFix: 22000, primeFix: 0, variable: 0, email: 'lcosta@ezel.fr', historique: [] },
          { id: 'EMP022', nom: 'MOMAND', prenom: 'Abid', dateNaissance: '1988-01-10', dateEntree: '2023-02-01', groupe: '1', filiale: '3', filialeId: 3, service: 'EZEL', niveau: 'S', posteInterne: 'Ouvrière-Bâtisseuse', posteExterne: 'Ouvrier', isResponsable: false, salaireFix: 22000, primeFix: 0, variable: 0, email: 'amomand@ezel.fr', historique: [] }
        ];
        const existingIds = patched.map(e => e.id);
        const toAdd = missingEmps.filter(e => !existingIds.includes(e.id));
        const merged = [...patched, ...toAdd];
        // Dedup: keep first occurrence of each ID
        const seen = new Set();
        return merged.filter(e => { if (seen.has(e.id)) return false; seen.add(e.id); return true; });
      });
      localStorage.setItem('oy_emp_version', String(CURRENT_EMP_VERSION));
    }
  }, [,
    { id: 'EMP050', nom: 'SAINT-LÉGER', prenom: 'Gabriel', dateNaissance: '1990-07-24', dateEntree: '2023-10-28', dateFin: '2025-10-31', filialeId: 3, service: 'EZEL', niveau: 'XL', posteInterne: "Régisseur de Ruche", posteExterne: "Directeur d'Exploitation", statut: 'ancien', salaireFix: 45000, primeFix: 8000, variable: 15000, email: 'gsaintleger@ezel.fr', historique: [] },
    { id: 'EMP051', nom: 'DÉMONNET', prenom: 'Olivier', dateNaissance: '1968-08-18', dateEntree: '2025-09-23', dateFin: '2025-12-16', filialeId: 1, service: 'ROU', niveau: 'XL', posteInterne: 'Régisseur de Ruche', posteExterne: 'Responsable Parc Locatif', statut: 'ancien', salaireFix: 40000, primeFix: 5000, variable: 10000, email: 'odemonnet@laroulotte.fr', historique: [] },
    { id: 'EMP052', nom: 'DJEDID', prenom: 'Salim', dateNaissance: '1976-10-29', dateEntree: '2024-04-02', dateFin: '2025-07-08', filialeId: 3, service: 'EZEL', niveau: 'XXL', posteInterne: 'Maître-Apiculteur', posteExterne: 'Directeur Général Adjoint', statut: 'ancien', salaireFix: 50000, primeFix: 10000, variable: 20000, email: 'sdjedid@ezel.fr', historique: [] },
    { id: 'EMP053', nom: 'DUBOURG', prenom: 'Marina', dateNaissance: '1976-06-06', dateEntree: '2024-05-27', dateFin: '2025-07-11', filialeId: 3, service: 'EZEL', niveau: 'M', posteInterne: 'Gardien de Ruche', posteExterne: 'Assistante de Direction', statut: 'ancien', salaireFix: 32000, primeFix: 3000, variable: 5000, email: 'mdubourg@ezel.fr', historique: [] },
    { id: 'EMP054', nom: 'PREVOST', prenom: 'Fanny', dateNaissance: '1995-08-04', dateEntree: '2025-05-26', dateFin: '2025-12-31', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Gardien de Ruche', posteExterne: "Chargée d'Affaires", statut: 'ancien', salaireFix: 38000, primeFix: 5000, variable: 10000, email: 'fprevost@ezel.fr', historique: [] },
    { id: 'EMP055', nom: 'GENT', prenom: 'Eddie', dateNaissance: null, dateEntree: '2025-08-11', dateFin: '2026-01-31', filialeId: 'yilmaz', service: 'IT', niveau: 'L', posteInterne: 'Architecte des Plans', posteExterne: 'Chef de projet SI', statut: 'ancien', salaireFix: 42000, primeFix: 5000, variable: 8000, email: 'egent@ezel.fr', historique: [] },
    { id: 'EMP056', nom: 'JEANDUPEUX', prenom: 'Ludovic', dateNaissance: null, dateEntree: '2025-12-22', dateFin: '2026-02-28', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Conducteur Travaux', statut: 'ancien', salaireFix: 40000, primeFix: 5000, variable: 10000, email: 'ljeandupeux@ezel.fr', historique: [] },
    { id: 'EMP057', nom: 'CHAPPÉ', prenom: 'Cécile', dateNaissance: '1981-04-07', dateEntree: '2025-10-02', dateFin: '2026-02-09', filialeId: 3, service: 'EZEL', niveau: 'S', posteInterne: 'Ouvrière-Bâtisseuse', posteExterne: 'Assistante Comptable Polyvalente', statut: 'ancien', salaireFix: 28000, primeFix: 2000, variable: 3000, email: 'cchappe@ezel.fr', historique: [] },
    { id: 'EMP058', nom: 'BOULAÂLAM', prenom: 'Zakaria', dateNaissance: '1993-02-02', dateEntree: '2024-11-08', dateFin: '2025-10-31', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Gardien de Ruche', posteExterne: "Chargé d'Affaires", statut: 'ancien', salaireFix: 38000, primeFix: 4000, variable: 8000, email: 'zboulaalam@ezel.fr', historique: [] },
    { id: 'EMP059', nom: 'FERREIRA', prenom: 'David', dateNaissance: '1978-08-25', dateEntree: '2025-01-13', dateFin: '2025-06-30', filialeId: 3, service: 'EZEL', niveau: 'L', posteInterne: 'Maître-Bâtisseur', posteExterne: 'Conducteur Travaux Élec.', statut: 'ancien', salaireFix: 40000, primeFix: 5000, variable: 10000, email: 'dferreira@ezel.fr', historique: [] }]);

  const [dashboardVue, setDashboardVue] = useState('kpi');
  const [dashGroupeVue, setDashGroupeVue] = useState('kpi');
  const [yilmazVue, setYilmazVue] = useState('widgets');
  const [showServicesPanel, setShowServicesPanel] = useState(false);
  const defaultAnnees = ['2022','2023','2024','2025'];
  const [donneesFilialeOrder, setDonneesFilialeOrder] = usePersistedState('donneesFilialeOrder', ['yilmaz', 3, 6, 2, 1]);
  const [donneesDragIdx, setDonneesDragIdx] = useState(null);
  const [donneesDragOverIdx, setDonneesDragOverIdx] = useState(null);
  const handleDonneesDrop = (targetIdx) => {
    if (donneesDragIdx === null || donneesDragIdx === targetIdx) { setDonneesDragIdx(null); setDonneesDragOverIdx(null); return; }
    setDonneesFilialeOrder(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(donneesDragIdx, 1);
      arr.splice(targetIdx, 0, moved);
      return arr;
    });
    setDonneesDragIdx(null);
    setDonneesDragOverIdx(null);
  };

  const getDonnee = (fId, annee, champ) => {
    return donneesFinancieres?.[fId]?.[annee]?.[champ] ?? donneesFinancieres?.[String(fId)]?.[annee]?.[champ] ?? null;
  };
  const setDonnee = (fId, annee, champ, val) => {
    setDonneesFinancieres(prev => ({
      ...prev,
      [fId]: {
        ...prev[fId],
        [annee]: {
          ...(prev[fId]?.[annee] || {}),
          [champ]: val === '' ? null : parseFloat(val)
        }
      }
    }));
  };

  const [dashboardCollabId, setDashboardCollabId] = useState(null);
  const [dashboardChantierId, setDashboardChantierId] = useState(null);
  const getEmployesFiliale = (fId) => employes.filter(e => e.filialeId === fId);
  const getChantiersCollab = (eId) => chantiers.filter(c => c.responsableId === eId);

  const calcAge = (dateNaissance) => {
    if (!dateNaissance) return '-';
    const d = new Date(dateNaissance);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age--;
    return age;
  };
  const calcAnciennete = (dateEntree) => {
    if (!dateEntree) return '-';
    const d = new Date(dateEntree);
    const now = new Date();
    const years = now.getFullYear() - d.getFullYear();
    const months = now.getMonth() - d.getMonth();
    const totalMonths = years * 12 + months;
    return totalMonths >= 12 ? `${Math.floor(totalMonths/12)} ans ${totalMonths%12} mois` : `${totalMonths} mois`;
  };
  const updateEmploye = (id, updates) => {
    setEmployes(prev => prev.map(e => e.id === id ? {...e, ...updates} : e));
  };
  const startEditCollab = (emp) => {
    setCollabEditData({...emp, historique: emp.historique ? [...emp.historique] : []});
    setCollabEditMode(true);
  };
  const saveEditCollab = () => {
    if (collabEditData) {
      updateEmploye(collabEditData.id, collabEditData);
      setCollabEditMode(false);
      setCollabEditData(null);
    }
  };
  const cancelEditCollab = () => { setCollabEditMode(false); setCollabEditData(null); };

  const handlePrint = () => {
    const selected = Object.entries(printSelection).filter(([,v]) => v).map(([k]) => k);
    if (selected.length === 0) return;
    const style = document.createElement('style');
    style.id = 'print-style';
    style.textContent = `
      @media print {
        body * { visibility: hidden; }
        .print-area, .print-area * { visibility: visible; }
        .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
        .print-block { break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; }
        ${Object.keys(configBlocsPresentation).filter(k => !printSelection[k]).map(k => `[data-bloc-id="${k}"] { display: none !important; }`).join('\n')}
      }
    `;
    document.head.appendChild(style);
    setShowPrintModal(false);
    setTimeout(() => {
      window.print();
      setTimeout(() => { const s = document.getElementById('print-style'); if(s) s.remove(); }, 500);
    }, 100);
  };
  const navigateFiliale = (fId) => { setDashboardFiliale(fId); setDashboardVue('kpi'); setDashboardCollabId(null); setDashboardChantierId(null); };
  const navigateToGroupe = () => { setNavEntreprise(null); setNavService(null); setOngletActif('presentation_groupe'); setDashboardFiliale(null); setProcessusOuvert(null); setFilialeFilter([]); };
  const navigateToEntreprise = (key, filialeMap) => { setNavEntreprise(key); setNavService(null); setOngletActif('dashboard'); setProcessusOuvert(null); setFilialeFilter([]); if (key in filialeMap) setDashboardFiliale(filialeMap[key]); };
  const navigateToService = (svcId) => { setNavService(svcId); setProcessusOuvert(null); };
  const [collabOngletId, setCollabOngletId] = useState(null);
  const [collabEditMode, setCollabEditMode] = useState(false);
  const [collabEditData, setCollabEditData] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printSelection, setPrintSelection] = useState({architecture: true, grilles: true, bareme: true, composition: true});

  const [posteSelectionne, setPosteSelectionne] = useState(null);
  const [posteEditMode, setPosteEditMode] = useState(false);
  const [posteEditData, setPosteEditData] = useState(null);
  const [posteFiltreFiliale, setPosteFiltreFiliale] = useState('all');
  const [posteFiltreStatut, setPosteFiltreStatut] = useState('all');
  const [posteFilterOpen, setPosteFilterOpen] = useState(false);
  const [grilleColWidth, setGrilleColWidth] = useState(100);
  const [grilleNivSel, setGrilleNivSel] = useState(null);
  const [archiModel, setArchiModel] = useState('btp');
  const [archiFil, setArchiFil] = useState('ezel');
  const [grilleModel, setGrilleModel] = useState('btp');
  const [grilleFil, setGrilleFil] = useState('ezel');
  const [posteBesoinFilter, setPosteBesoinFilter] = useState('all');
  const [posteUrgenceFilter, setPosteUrgenceFilter] = useState('all');
  const [posteContratFilter, setPosteContratFilter] = useState('all');
  const [posteVisibleCols, setPosteVisibleCols] = useState({poste:true,niveau:true,filiale:true,statut:true,besoin:true,urgence:true,titulaire:true,budget:true,contrat:true,dateBesoin:false,service:false,onboarding:false});
  const [adminTab, setAdminTab] = useState('users');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState(null);

  // ═══ POSTES STATUTS & TYPES ═══
  const POSTE_STATUTS = [
    {id:'gele',label:'Gelé',color:'#9CA3AF',icon:'⏸️',desc:'Besoin identifié mais pas de budget'},
    {id:'a_creer',label:'À créer',color:'#7C3AED',icon:'📝',desc:'Budget validé, fiche à rédiger'},
    {id:'ouvert',label:'Ouvert',color:'#D97706',icon:'🟡',desc:'Fiche prête, recrutement peut démarrer'},
    {id:'recrutement',label:'Recrutement en cours',color:'#3B82F6',icon:'🔍',desc:'Pipeline actif, candidats en évaluation'},
    {id:'proposition',label:'Proposition envoyée',color:'#EA580C',icon:'📄',desc:'Candidat sélectionné, offre en attente'},
    {id:'pourvu',label:'Pourvu',color:'#059669',icon:'✅',desc:'Collaborateur en poste'},
    {id:'remplacement_temp',label:'Remplacement temporaire',color:'#DC2626',icon:'🔄',desc:'Titulaire absent — CDD/intérim'}
  ];
  const POSTE_BESOIN_TYPES = [
    {id:'remplacement',label:'Remplacement',color:'#DC2626'},
    {id:'creation',label:'Création',color:'#D97706'},
    {id:'projection',label:'Projection',color:'#7C3AED'}
  ];
  const POSTE_SOUS_MOTIFS = [
    {id:'demission',label:'Démission'},{id:'licenciement',label:'Licenciement'},
    {id:'rupture_conv',label:'Rupture conventionnelle'},{id:'fin_cdd',label:'Fin CDD/Chantier'},
    {id:'retraite',label:'Départ retraite'},{id:'arret_maladie',label:'Arrêt maladie longue durée'},
    {id:'accident_travail',label:'Accident de travail'},{id:'conge_maternite',label:'Congé maternité/paternité'},
    {id:'mutation',label:'Mutation interne'},{id:'autre',label:'Autre'}
  ];
  const POSTE_URGENCES = [
    {id:'immediate',label:'Immédiate',color:'#DC2626'},
    {id:'1_mois',label:'< 1 mois',color:'#EA580C'},
    {id:'1_3_mois',label:'1-3 mois',color:'#D97706'},
    {id:'3_plus',label:'> 3 mois',color:'#059669'}
  ];
  const POSTE_CONTRAT_TYPES = [
    {id:'cdi',label:'CDI'},{id:'cdd',label:'CDD'},{id:'interim',label:'Intérim'},
    {id:'alternance',label:'Alternance'},{id:'stage',label:'Stage'},{id:'insertion',label:'Insertion'}
  ];
  const POSTE_OB_TYPES = [
    {id:'ouvrier_btp',label:'Ouvrier BTP'},{id:'chef_chantier',label:'Chef de chantier'},
    {id:'charge_affaires',label:"Chargé d'affaires"},{id:'conducteur_travaux',label:'Conducteur de travaux'},
    {id:'assistante_admin',label:'Assistante administrative'},{id:'direction',label:'Direction / Cadre'}
  ];
  const [postes, setPostes] = usePersistedState('postes_v2', POSTES_INIT);

  const [collabFiltreFiliale, setCollabFiltreFiliale] = useState([]);
  const [collabFilterOpen, setCollabFilterOpen] = useState(false);
  const [collabStatutFilter, setCollabStatutFilter] = useState(['actif','en_cours_arriver','en_cours_depart']);
  const [collabConditionFilter, setCollabConditionFilter] = useState([]);
  const [collabContratFilter, setCollabContratFilter] = useState([]);
  const [collabVisibleCols, setCollabVisibleCols] = useState({nom:true,posteR:true,niveau:true,filiale:true,statut:true,age:true,anc:true,contrat:true,email:false,tel:false,portable:false,fixe:true,prime:true,var:true,total:true,resp:true,ch:true,act:true});
  const [collabColWidths, setCollabColWidths] = useState({});
  const [collabSearch, setCollabSearch] = useState('');
  const [collabSort, setCollabSort] = useState({key:'niveau',dir:'asc'});
  const [collabView, setCollabView] = useState('liste');
  const [orgView, setOrgView] = useState('liste');
  const [orgArbrePos, setOrgArbrePos] = useState(null);
  const [orgArbreDrag, setOrgArbreDrag] = useState(null);
  const orgArbreRef = React.useRef(null);
  const [orgSocietePos, setOrgSocietePos] = useState(null);
  const [orgSocieteDrag, setOrgSocieteDrag] = useState(null);
  const [orgSocieteZoom, setOrgSocieteZoom] = useState(1);
  const [orgSocietePan, setOrgSocietePan] = useState({x:0, y:0});
  const [orgSocietePanning, setOrgSocietePanning] = useState(null);
  const orgSocieteRef = React.useRef(null);
  const [collabDetailTab, setCollabDetailTab] = useState('profil');
  const [collabDocAdding, setCollabDocAdding] = useState(false);
  const [collabDocType, setCollabDocType] = useState('contrat');
  const [collabDocNom, setCollabDocNom] = useState('');
  const [collabDocUrl, setCollabDocUrl] = useState('');
  const [moduleOrder, setModuleOrder] = usePersistedState('moduleOrder', {});
  const [dragModule, setDragModule] = useState(null);

  const [moduleServiceActif, setModuleServiceActif] = useState(null);
  const [aoGroupBy, setAoGroupBy] = useState('statut');
  const [aoVueActive, setAoVueActive] = useState('tous');
  const [aoVues, setAoVues] = useState([
    { id: 'tous', label: 'Tous', icon: '📁', filters: { type: 'tous', prio: 'tous', statuts: [], groupBy: 'statut' } },
    { id: 'en_cours', label: 'En cours', icon: '🔄', filters: { type: 'tous', prio: 'tous', statuts: ['Visite RDV pris','En préparation','En attente de réponse','À présenter'], groupBy: 'statut' } },
    { id: 'public', label: 'Marchés Publics', icon: '🏛️', filters: { type: 'Public', prio: 'tous', statuts: [], groupBy: 'statut' } },
    { id: 'prive', label: 'Marchés Privés', icon: '🏢', filters: { type: 'Privé', prio: 'tous', statuts: [], groupBy: 'client' } },
    { id: 'haute_prio', label: 'Haute Priorité', icon: '▲', filters: { type: 'tous', prio: 'Haute', statuts: [], groupBy: 'statut' } },
    { id: 'resultats', label: 'Résultats', icon: '📊', filters: { type: 'tous', prio: 'tous', statuts: ['Remporté','Non retenu','Suite Refus'], groupBy: 'statut' } },
    { id: 'courrier', label: 'Courriers & Suites', icon: '✉️', filters: { type: 'tous', prio: 'tous', statuts: ['Courrier demande de précisions','Suite Refus'], groupBy: 'statut' } },
  ]);

  const [appelsOffres, setAppelsOffres] = useState([
    { id: 'AO-2025-001', client: 'Mairie de Melun', objet: 'Rénovation école Jules Ferry', type: 'Public', statut: 'En préparation', sousStatut: '', montant: 1200000, priorite: 'Haute', dateDepot: '2025-03-15', responsable: 'Bureau Études', source: 'SPIGAO', phase: 'Chiffrage', taches: 3, tachesTotal: 8 },
    { id: 'AO-2025-002', client: 'Région IDF', objet: 'Extension lycée Paul Éluard', type: 'Public', statut: 'En attente de réponse', sousStatut: '', montant: 4800000, priorite: 'Haute', dateDepot: '2025-02-01', responsable: 'Bureau Études', source: 'BOAMP', phase: 'Déposé', taches: 0, tachesTotal: 6 },
    { id: 'AO-2025-003', client: 'RIVP', objet: 'Réhabilitation résidence Les Lilas', type: 'Public', statut: 'Remporté', sousStatut: '', montant: 3200000, priorite: 'Haute', dateDepot: '2024-11-20', responsable: 'Direction', source: 'BOAMP', phase: 'Terminé', taches: 0, tachesTotal: 8 },
    { id: 'AO-2025-004', client: 'SCI Du Parc', objet: 'Construction immeuble R+4', type: 'Privé', statut: 'En préparation', sousStatut: 'chiffrage', montant: 4200000, priorite: 'Moyenne', dateDepot: '2025-03-30', responsable: 'Bureau Études', source: 'Autre', phase: 'Mémoire technique', taches: 0, tachesTotal: 8 },
    { id: 'AO-2025-005', client: 'Nexity', objet: 'Résidence seniors 80 lots', type: 'Privé', statut: 'Remporté', sousStatut: '', montant: 8500000, priorite: 'Haute', dateDepot: '2024-10-15', responsable: 'Direction', source: 'Autre', phase: 'Terminé', taches: 0, tachesTotal: 10 },
    { id: 'AO-2025-006', client: 'Département 94', objet: 'Restructuration collège Henri Wallon', type: 'Public', statut: 'En attente de réponse', sousStatut: '', montant: 5600000, priorite: 'Haute', dateDepot: '2025-02-28', responsable: 'Bureau Études', source: 'BOAMP', phase: 'Déposé', taches: 0, tachesTotal: 8 },
    { id: 'AO-2025-007', client: 'Ville de Créteil', objet: 'Construction gymnase municipal', type: 'Public', statut: 'Visite RDV pris', sousStatut: '', montant: 2800000, priorite: 'Moyenne', dateDepot: '2025-04-15', responsable: 'Bureau Études', source: 'SPIGAO', phase: 'Visite', taches: 1, tachesTotal: 10 },
    { id: 'AO-2025-008', client: 'OPH Meaux', objet: 'Réhabilitation thermique 120 logements', type: 'Public', statut: 'En préparation', sousStatut: 'chiffrage', montant: 3400000, priorite: 'Haute', dateDepot: '2025-04-01', responsable: 'Bureau Études', source: 'BOAMP', phase: 'Chiffrage', taches: 4, tachesTotal: 8 },
    { id: 'AO-2025-009', client: 'Bouygues Immobilier', objet: 'Lot GO résidence Le Cèdre', type: 'Privé', statut: 'À présenter', sousStatut: '', montant: 6200000, priorite: 'Haute', dateDepot: '2025-03-20', responsable: 'Direction', source: 'Autre', phase: 'Montage dossier', taches: 2, tachesTotal: 6 },
    { id: 'AO-2025-010', client: 'Mairie de Torcy', objet: 'Extension crèche Les Petits Pas', type: 'Public', statut: 'Non retenu', sousStatut: '', montant: 950000, priorite: 'Basse', dateDepot: '2024-12-10', responsable: 'Bureau Études', source: 'SPIGAO', phase: 'Terminé', taches: 0, tachesTotal: 6 },
    { id: 'AO-2025-011', client: 'SCI Marne Invest', objet: 'Immeuble de bureaux R+5 Noisy', type: 'Privé', statut: 'En préparation', sousStatut: '', montant: 7800000, priorite: 'Haute', dateDepot: '2025-04-10', responsable: 'Bureau Études', source: 'Autre', phase: 'Mémoire technique', taches: 3, tachesTotal: 8 },
    { id: 'AO-2025-012', client: 'AP-HP', objet: 'Rénovation urgences Hôpital Mondor', type: 'Public', statut: 'Courrier demande de précisions', sousStatut: '', montant: 4100000, priorite: 'Haute', dateDepot: '2025-01-15', responsable: 'Bureau Études', source: 'BOAMP', phase: 'Déposé', taches: 0, tachesTotal: 8 },
    { id: 'AO-2025-013', client: 'Ville de Melun', objet: 'Réaménagement place Saint-Jean', type: 'Public', statut: 'Suite Refus', sousStatut: '', montant: 1600000, priorite: 'Moyenne', dateDepot: '2024-09-20', responsable: 'Bureau Études', source: 'SPIGAO', phase: 'Terminé', taches: 0, tachesTotal: 8 }
  ]);

  const [aoColOrder, setAoColOrder] = useState(['element','source','client','objet','type','statut','phase','priorite','montant','dateDepot','responsable','progression']);
  const [aoColDragIdx, setAoColDragIdx] = useState(null);
  const [aoColDragOverIdx, setAoColDragOverIdx] = useState(null);
  const handleAoColDrop = (dropIdx) => {
    if (aoColDragIdx === null || aoColDragIdx === dropIdx) { setAoColDragIdx(null); setAoColDragOverIdx(null); return; }
    setAoColOrder(prev => { const arr = [...prev]; const [moved] = arr.splice(aoColDragIdx, 1); arr.splice(dropIdx, 0, moved); return arr; });
    setAoColDragIdx(null); setAoColDragOverIdx(null);
  };
  const [aoPinnedCols, setAoPinnedCols] = useState('');
  const SourceLogo = ({name, size=16}) => {
    if (name === 'SPIGAO') return (<div style={{width:size, height:size, borderRadius:3, background:'linear-gradient(135deg,#e65100,#ff8f00)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><span style={{fontSize:size*0.5, fontWeight:800, color:'#fff', lineHeight:1}}>SP</span></div>);
    if (name === 'BOAMP') return (<div style={{width:size, height:size, borderRadius:3, background:'linear-gradient(135deg,#000091,#1a43bf)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><span style={{fontSize:size*0.5, fontWeight:800, color:'#fff', lineHeight:1}}>BO</span></div>);
    return (<div style={{width:size, height:size, borderRadius:3, background:'linear-gradient(135deg,#78909c,#546e7a)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><span style={{fontSize:size*0.5, fontWeight:800, color:'#fff', lineHeight:1}}>?</span></div>);
  };

  const AO_PHASES = [
    { id: 'Visite', label: 'Visite', color: '#f59e0b', icon: '📅' },
    { id: 'Chiffrage', label: 'Chiffrage', color: '#3b82f6', icon: '🧮' },
    { id: 'Mémoire technique', label: 'Mémoire technique', color: '#8b5cf6', icon: '📝' },
    { id: 'Montage dossier', label: 'Montage dossier', color: '#06b6d4', icon: '📁' },
    { id: 'Relecture', label: 'Relecture', color: '#f97316', icon: '🔍' },
    { id: 'Prêt à déposer', label: 'Prêt à déposer', color: '#22c55e', icon: '✅' },
    { id: 'Déposé', label: 'Déposé', color: '#6366f1', icon: '📤' },
    { id: 'Terminé', label: 'Terminé', color: '#b0a08a', icon: '🏁' }
  ];

  const AO_STATUTS = {
    'Visite RDV pris': { color: '#d97706', bg: '#fffbeb', icon: '📅' },
    'En préparation': { color: '#007ab5', bg: '#eff6ff', icon: '📝' },
    'En attente de réponse': { color: '#2563eb', bg: '#dbeafe', icon: '⏳' },
    'À présenter': { color: '#0284c7', bg: '#e0f2fe', icon: '📤' },
    'Remporté': { color: '#059669', bg: '#ecfdf5', icon: '🏆' },
    'Non retenu': { color: '#6b7280', bg: '#f3f4f6', icon: '❌' },
    'Courrier demande de précisions': { color: '#7c3aed', bg: '#f5f3ff', icon: '✉️' },
    'Suite Refus': { color: '#94a3b8', bg: '#f8fafc', icon: '📨' },
  };

  // Veille AO
  const [veilleStatutsOrdre, setVeilleStatutsOrdre] = useState([
    { id: 'nouveau', label: 'Nouveau', icon: '🆕', color: '#64748b', bg: '#f8fafc', groupe: 'nouveaux' },
    { id: 'a_regarder', label: 'À Regarder', icon: '🐟', color: '#d97706', bg: '#fffbeb', groupe: 'suivis' },
    { id: 'en_attente_dce', label: 'En attente de DCE', icon: '📂', color: '#7c3aed', bg: '#f5f3ff', groupe: 'suivis' },
    { id: 'en_analyse', label: 'En Analyse', icon: '🔍', color: '#0369a1', bg: '#f0f9ff', groupe: 'suivis' },
    { id: 'go_a_traiter', label: 'GO – À Traiter', icon: '⭐', color: '#15803d', bg: '#f0fdf4', groupe: 'suivis' },
    { id: 'no_go', label: 'No Go', icon: '👎', color: '#be123c', bg: '#fff1f2', groupe: 'archives' },
    { id: 'hors_cible', label: 'Hors cible', icon: '🚫', color: '#9ca3af', bg: '#f9fafb', groupe: 'archives' },
  ]);

  const [veilleAO, setVeilleAO] = useState([
    { id: 'VAO-2026-0001', ref: 'BOAMP-26-015482', titre: 'Rénovation groupe scolaire Jean Moulin', acheteur: 'Mairie de Melun', type: 'Public', montant: 2100000, dateLimite: '2026-03-28T12:00', source: 'SPIGAO', statut: 'a_regarder', priorite: 'Haute', selectionnePar: 'david', validePar: null, attribuA: null, decision: null, dateImport: '2026-02-15' },
    { id: 'VAO-2026-0002', ref: 'BOAMP-26-018734', titre: 'Construction médiathèque intercommunale', acheteur: 'CC Brie des Rivières', type: 'Public', montant: 3800000, dateLimite: '2026-03-15T16:00', source: 'SPIGAO', statut: 'en_analyse', priorite: 'Haute', selectionnePar: 'pierre', validePar: null, attribuA: null, decision: null, dateImport: '2026-02-12' },
    { id: 'VAO-2026-0005', ref: 'SPIGAO-42901', titre: 'Aménagement bureaux Val de Fontenay', acheteur: 'Nexity Immobilier', type: 'Privé', montant: 890000, dateLimite: '2026-03-10T14:00', source: 'SPIGAO', statut: 'nouveau', priorite: 'Moyenne', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-02-17' },
    { id: 'VAO-2026-0006', ref: 'BOAMP-26-023789', titre: 'Réhabilitation logements Bloc D', acheteur: 'OPH Val de Marne', type: 'Public', montant: 1800000, dateLimite: '2026-04-02T12:00', source: 'BOAMP', statut: 'nouveau', priorite: 'Haute', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-02-18' },
    { id: 'VAO-2026-0003', ref: 'SPIGAO-41205', titre: 'Extension centre aquatique Sénart', acheteur: 'CA Grand Paris Sud', type: 'Public', montant: 5200000, dateLimite: '2026-04-15T14:00', source: 'SPIGAO', statut: 'en_analyse', priorite: 'Haute', selectionnePar: 'david', validePar: 'ozdogan', attribuA: null, decision: 'lancer', dateImport: '2026-02-10' },
    { id: 'VAO-2026-0004', ref: 'BOAMP-26-021456', titre: 'Restructuration lycée professionnel Cugnot', acheteur: 'Région IDF', type: 'Public', montant: 6800000, dateLimite: '2026-05-01T12:00', source: 'BOAMP', statut: 'go_a_traiter', priorite: 'Haute', selectionnePar: 'pierre', validePar: 'ozdogan', attribuA: null, decision: 'lancer', dateImport: '2026-02-08' },
    { id: 'VAO-2026-0007', ref: 'SPIGAO-43102', titre: 'Construction crèche multi-accueil Dammarie', acheteur: 'Mairie de Dammarie-les-Lys', type: 'Public', montant: 1450000, dateLimite: '2026-03-20T16:00', source: 'SPIGAO', statut: 'a_regarder', priorite: 'Moyenne', selectionnePar: 'david', validePar: null, attribuA: null, decision: null, dateImport: '2026-02-20' },
    { id: 'VAO-2026-0008', ref: 'BOAMP-26-025100', titre: 'Démolition-reconstruction groupe scolaire Pasteur', acheteur: 'Ville de Meaux', type: 'Public', montant: 4500000, dateLimite: '2026-04-28T12:00', source: 'BOAMP', statut: 'nouveau', priorite: 'Haute', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-02-22' },
    { id: 'VAO-2026-0009', ref: 'SPIGAO-43567', titre: 'Ravalement façades résidence Beausoleil', acheteur: 'Foyer de Seine-et-Marne', type: 'Public', montant: 980000, dateLimite: '2026-03-25T12:00', source: 'SPIGAO', statut: 'no_go', priorite: 'Basse', selectionnePar: 'david', validePar: null, attribuA: null, decision: 'ne_pas_repondre', dateImport: '2026-02-14' },
    { id: 'VAO-2026-0010', ref: 'BOAMP-26-027890', titre: 'Aménagement pôle santé intercommunal', acheteur: 'CC Pays de Fontainebleau', type: 'Public', montant: 3200000, dateLimite: '2026-05-10T16:00', source: 'BOAMP', statut: 'en_analyse', priorite: 'Moyenne', selectionnePar: 'pierre', validePar: null, attribuA: null, decision: null, dateImport: '2026-02-25' },
    { id: 'VAO-2026-0011', ref: 'PRIV-2026-001', titre: 'Surélévation immeuble haussmannien Paris 12', acheteur: 'SCI Reuilly Invest', type: 'Privé', montant: 2400000, dateLimite: '2026-04-05T18:00', source: 'Autre', statut: 'a_regarder', priorite: 'Haute', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-02-26' },
    { id: 'VAO-2026-0012', ref: 'SPIGAO-44001', titre: 'Mise aux normes accessibilité mairie annexe', acheteur: 'Ville de Brie-Comte-Robert', type: 'Public', montant: 620000, dateLimite: '2026-03-18T12:00', source: 'SPIGAO', statut: 'hors_cible', priorite: 'Basse', selectionnePar: 'david', validePar: null, attribuA: null, decision: 'ne_pas_repondre', dateImport: '2026-02-16' },
    { id: 'VAO-2026-0013', ref: 'BOAMP-26-029345', titre: 'Construction salle polyvalente Combs-la-Ville', acheteur: 'Ville de Combs-la-Ville', type: 'Public', montant: 2900000, dateLimite: '2026-05-15T14:00', source: 'BOAMP', statut: 'nouveau', priorite: 'Haute', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-03-01' },
    { id: 'VAO-2026-0014', ref: 'PRIV-2026-002', titre: 'Rénovation complète loft industriel Ivry', acheteur: 'Particulier', type: 'Particulier', montant: 380000, dateLimite: '2026-04-20T18:00', source: 'Autre', statut: 'a_regarder', priorite: 'Basse', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-03-02' },
    { id: 'VAO-2026-0015', ref: 'BOAMP-26-24920', titre: 'Construction nouveau siège EPHE — Campus Condorcet', acheteur: 'Étab. Public Campus Condorcet', type: 'Public', montant: 0, dateLimite: '2026-04-29T12:00', source: 'BOAMP', statut: 'nouveau', priorite: 'Haute', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-03-13', notes: 'Construction neuve GO+TCE. Aubervilliers (93). Procédure Ouverte. Publié 12/03/2026. Lien: https://www.boamp.fr/pages/avis/?q=idweb:26-24920' },
    { id: 'VAO-2026-0016', ref: 'BOAMP-26-25074', titre: 'Réaménagement Aire des Vents — Dugny', acheteur: 'Dépt. Seine-Saint-Denis', type: 'Public', montant: 0, dateLimite: '2026-04-13T12:00', source: 'BOAMP', statut: 'nouveau', priorite: 'Moyenne', selectionnePar: null, validePar: null, attribuA: null, decision: null, dateImport: '2026-03-13', notes: 'Travaux espaces publics. Dugny (93). Procédure Ouverte. Publié 12/03/2026. Lien: https://www.boamp.fr/pages/avis/?q=idweb:26-25074' },
  ]);

  const [veilleColWidths, setVeilleColWidths] = useState({ element: 120, source: 100, client: 160, objet: 240, type: 100, statut: 160, priorite: 100, dateLimite: 150, selectionnePar: 130, validePar: 130, decision: 140, montant: 110, count: 40 });
  const [dosColWidths, setDosColWidths] = useState({ id:90, dossier:280, prio:80, typeproj:110, statut:90, tm:60, offre:90, deadline:90, jours:80, resp:90, visite:60 });
  const [planColWidths, setPlanColWidths] = useState({ num:30, objet:260, moa:140, statut:130, phase:100, prio:80, deadline:90, offre:80, resp:80, visite:60 });
  const [aoSvcColWidths, setAoSvcColWidths] = useState({ element: 130, source: 100, client: 160, objet: 220, type: 90, statut: 160, phase: 140, montant: 110, priorite: 100, dateDepot: 130, responsable: 130, progression: 100 });
  const startColResize = (colId, e, widths, setWidths, minW = 60) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX; const startW = widths[colId] || 120;
    const onMove = (ev) => { const diff = ev.clientX - startX; setWidths(prev => ({...prev, [colId]: Math.max(minW, startW + diff)})); };
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; document.body.style.userSelect = ''; };
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
    document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none';
  };

  const [veilleGroupeActif, setVeilleGroupeActif] = useState('tous');
  const [veilleStatutFiltres, setVeilleStatutFiltres] = useState(['nouveau','a_regarder','en_analyse','go_a_traiter']);
  const [veilleGroupePar, setVeilleGroupePar] = useState('statut');
  const [veilleDensity, setVeilleDensity] = useState(2);
  const [veilleHeaderSize, setVeilleHeaderSize] = useState(2);
  const [veillePinnedCols, setVeillePinnedCols] = useState('');
  const [veilleTypeFiltre, setVeilleTypeFiltre] = useState('tous');
  const [veilleStatutFilterOpen, setVeilleStatutFilterOpen] = useState(false);
  const [veilleGroupMenuOpen, setVeilleGroupMenuOpen] = useState(false);
  const [veilleGroupesFermes, setVeilleGroupesFermes] = useState([]);
  const [veilleStatCellOpen, setVeilleStatCellOpen] = useState(null);
  const [veilleStatCellPos, setVeilleStatCellPos] = useState({x:0,y:0});
  const [veilleStatGrab, setVeilleStatGrab] = useState(null);
  const [veilleStatOver, setVeilleStatOver] = useState(null);
  const [statutDragIdx, setStatutDragIdx] = useState(null);
  const [statutDragOverIdx, setStatutDragOverIdx] = useState(null);
  const [veilleDecCellOpen, setVeilleDecCellOpen] = useState(null);
  const [veilleDecCellPos, setVeilleDecCellPos] = useState({x:0,y:0});
  const [veilleDecGrab, setVeilleDecGrab] = useState(null);
  const [veilleDecOver, setVeilleDecOver] = useState(null);
  const [veilleDecOrdre, setVeilleDecOrdre] = useState(['a_decider','lancer','reporte','ne_pas_repondre']);
  const [veilleFormOpen, setVeilleFormOpen] = useState(false);
  const [veilleFormData, setVeilleFormData] = useState({});
  const [veilleSourceDropdown, setVeilleSourceDropdown] = useState(null);
  const [vColDragIdx, setVColDragIdx] = useState(null);
  const [vColDragOverIdx, setVColDragOverIdx] = useState(null);
  const [veilleSearch, setVeilleSearch] = useState('');
  const [veilleSort, setVeilleSort] = useState({col:'dateLimite', dir:'asc'});
  const [veilleSelectedAO, setVeilleSelectedAO] = useState(null);
  const [veilleDrawerWide, setVeilleDrawerWide] = useState(false);
  const [veilleFilterPanelOpen, setVeilleFilterPanelOpen] = useState(false);
  const [veilleRowBordersH, setVeilleRowBordersH] = useState(false);
  const [veilleRowBordersV, setVeilleRowBordersV] = useState(false);
  const [veilleAOPrefill, setVeilleAOPrefill] = useState(null);
  const [planKanbanDrag, setPlanKanbanDrag] = useState(null);
  const VEILLE_STATUTS = veilleStatutsOrdre;
  const VEILLE_PERSONNES = {
    selecteurs: [
      {id:'david',nom:'David LEMAIRE',role:'Responsable Études'},
      {id:'pierre',nom:'Pierre SEMERCI',role:'Conducteur Travaux'},
      {id:'ozdogan',nom:'Ozdogan YILMAZ',role:'Direction Générale'}
    ],
    validateurs: [
      {id:'ozdogan',nom:'Ozdogan YILMAZ',role:'Direction Générale'},
      {id:'david',nom:'David LEMAIRE',role:'Responsable Études'}
    ]
  };
  const VEILLE_DECISIONS = [
    {id:'a_decider',label:'À décider',icon:'⏳',color:'#64748b'},
    {id:'lancer',label:'Lancer',icon:'🚀',color:'#0369a1'},
    {id:'reporte',label:'Reporté',icon:'⏸️',color:'#d97706'},
    {id:'ne_pas_repondre',label:'Ne pas répondre',icon:'✕',color:'#dc2626'}
  ];
  const toggleStatutFiltre = (id) => {
    setVeilleStatutFiltres(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };
  const [calMois, setCalMois] = useState(new Date().getMonth());
  const [headerCompact, setHeaderCompact] = useState(false);
  const headerCompactRef = React.useRef(false);
  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const wasCompact = headerCompactRef.current;
          let next = wasCompact;
          if (wasCompact && y < 20) next = false;
          else if (!wasCompact && y > 120) next = true;
          if (next !== wasCompact) { headerCompactRef.current = next; setHeaderCompact(next); }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [calAnnee, setCalAnnee] = useState(new Date().getFullYear());

  // Planning Gantt
  const PLAN_PHASES = [
    { id:'visite', label:'Visite', icon:'🏗️', color:'#f39c12' },
    { id:'chiffrage', label:'Chiffrage', icon:'🧮', color:'#e67e22' },
    { id:'memoire', label:'Mémoire technique', icon:'📝', color:'#9b59b6' },
    { id:'montage', label:'Montage dossier', icon:'📁', color:'#3498db' },
    { id:'relecture', label:'Relecture', icon:'🔍', color:'#0ea5e9' },
    { id:'depose', label:'Déposé', icon:'📤', color:'#e74c3c' },
    { id:'execution', label:'Exécution', icon:'⚡', color:'#27ae60' },
    { id:'termine', label:'Terminé', icon:'✅', color:'#16a34a' }
  ];
  const PLAN_STATUTS = [
    { id:'en_cours', label:'En cours', color:'#3498db', icon:'🔄' },
    { id:'planifie', label:'Planifié', color:'#b0a08a', icon:'📅' },
    { id:'en_retard', label:'En retard', color:'#e74c3c', icon:'⚠️' },
    { id:'termine', label:'Terminé', color:'#27ae60', icon:'✅' },
    { id:'en_pause', label:'En pause', color:'#f39c12', icon:'⏸️' }
  ];
  const [planProjets, setPlanProjets] = useState([
    { id:'P-001', aoRef:'AO-2025-001', nom:'Rénovation École Jules Ferry', client:'Mairie de Melun', type:'Public', montant:1200000, responsable:'Bureau Études', equipe:['Jean D.','Marie L.'], priorite:'Haute', phase:'chiffrage', statut:'en_cours', dateDebut:'2025-02-01', dateFin:'2025-06-15', progression:45, couleur:'#3498db', tags:['IDF'], jalons:[], sousTaches:[] },
    { id:'P-002', aoRef:'AO-2025-004', nom:'Construction Immeuble R+4', client:'SCI Du Parc', type:'Privé', montant:4200000, responsable:'Bureau Études', equipe:['Marie L.'], priorite:'Moyenne', phase:'memoire', statut:'en_cours', dateDebut:'2025-03-01', dateFin:'2025-09-30', progression:30, couleur:'#9b59b6', tags:[], jalons:[], sousTaches:[] },
  ]);
  const [planVue, setPlanVue] = useState('gantt');
  const [planZoom, setPlanZoom] = useState('mois');
  const [planOffset, setPlanOffset] = useState(0);
  const [planFiltreStatut, setPlanFiltreStatut] = useState([]);
  const [planFiltrePhase, setPlanFiltrePhase] = useState([]);
  const [planFiltreResp, setPlanFiltreResp] = useState('tous');
  const [planGanttScale, setPlanGanttScale] = useState('month');
  const [planGanttZoom, setPlanGanttZoom] = useState(22);
  const planGanttScrollRef = React.useRef(null);
  const [planFiltrePrio, setPlanFiltrePrio] = useState('tous');
  const [planGroupBy, setPlanGroupBy] = useState('phase');
  const [planDetailId, setPlanDetailId] = useState(null);
  const [planSearch, setPlanSearch] = useState('');
  const [planBarColor, setPlanBarColor] = useState('phase');
  const [planShowWeekends, setPlanShowWeekends] = useState(true);
  const [planGroupesFermes, setPlanGroupesFermes] = useState([]);

  const [veilleColOrder, setVeilleColOrder] = useState(['element','source','client','objet','type','statut','priorite','dateLimite','selectionnePar','validePar','decision','montant']);

  const AO_PRIORITES = {
    'Haute': { color: '#e74c3c', bg: '#fee2e2' },
    'Moyenne': { color: '#f39c12', bg: '#fef3c7' },
    'Basse': { color: '#3498db', bg: '#dbeafe' },
  };
  const AO_TYPES = {
    'Public': { color: '#27ae60', bg: '#dcfce7' },
    'Privé': { color: '#8b5cf6', bg: '#f3e8ff' },
  };

  const [aoGroupesFermes, setAoGroupesFermes] = useState([]);
  const [aoTypeFiltre, setAoTypeFiltre] = useState('tous');
  const [aoStatutFiltres, setAoStatutFiltres] = useState([]);
  const [aoStatutOrdre, setAoStatutOrdre] = useState(Object.keys(AO_STATUTS));
  const [aoPrioFiltre, setAoPrioFiltre] = useState('tous');

  const getAoStats = () => {
    const enCours = appelsOffres.filter(a => !['Remporté','Non retenu','Suite Refus'].includes(a.statut)).length;
    const remportes = appelsOffres.filter(a => a.statut === 'Remporté').length;
    const nonRetenus = appelsOffres.filter(a => ['Non retenu','Suite Refus'].includes(a.statut)).length;
    const courriers = appelsOffres.filter(a => ['Courrier demande de précisions','Suite Refus'].includes(a.statut)).length;
    const pipeline = appelsOffres.filter(a => !['Non retenu','Suite Refus'].includes(a.statut)).reduce((s, a) => s + a.montant, 0);
    return { enCours, remportes, nonRetenus, courriers, pipeline };
  };

  const getAoGrouped = () => {
    let items = [...appelsOffres];
    if (aoTypeFiltre !== 'tous') items = items.filter(a => a.type === aoTypeFiltre);
    if (aoPrioFiltre !== 'tous') items = items.filter(a => a.priorite === aoPrioFiltre);
    if (aoStatutFiltres.length > 0) items = items.filter(a => aoStatutFiltres.includes(a.statut));
    const field = aoGroupBy;
    const groups = {};
    items.forEach(ao => { const key = ao[field] || 'Non défini'; if (!groups[key]) groups[key] = []; groups[key].push(ao); });
    const ordre = aoStatutOrdre;
    return ordre.filter(s => groups[s]).map(s => ({ key: s, items: groups[s] }));
  };

  const [nouvelEmploye, setNouvelEmploye] = useState({ nom: '', prenom: '', groupe: '1', filiale: '1', pole: '', service: '', niveau: 'M', posteInterne: '', posteExterne: '' });

  // ═══ Module-level state (hooks compliance) ═══
  const [tresoFiliale, setTresoFiliale] = useState('all');
  const [tresoTab, setTresoTab] = useState('tableau');
  const [candidats, setCandidats] = useState(null);
  const [recruView, setRecruView] = useState('kanban');
  const [recruFilter, setRecruFilter] = useState('all');
  const [recruEdit, setRecruEdit] = useState(null);
  const [recruDrag, setRecruDrag] = useState(null);
  const [recruSettingsOpen, setRecruSettingsOpen] = useState(false);
  const [recruDetail, setRecruDetail] = useState(null);
  const [recruDetailTab, setRecruDetailTab] = useState('profil');
  const [recruCompare, setRecruCompare] = useState([]);
  const [recruSearch, setRecruSearch] = useState('');
  const [recruIaLoading, setRecruIaLoading] = useState(false);
  const [recruNewFichier, setRecruNewFichier] = useState('');
  const [recruAddingFichier, setRecruAddingFichier] = useState(false);
  const [recruFichierType, setRecruFichierType] = useState('cv');
  const [recruFichierUrl, setRecruFichierUrl] = useState('');
  const [recruFileViewer, setRecruFileViewer] = useState(null);
  const [recruCvPaste, setRecruCvPaste] = useState('');
  const [recruNewMode, setRecruNewMode] = useState(null);
  const [recruLinkedinUrl, setRecruLinkedinUrl] = useState('');
  const [recruCvParsing, setRecruCvParsing] = useState(false);
  const [recruIaResult, setRecruIaResult] = useState(null);
  const [recruBulkSel, setRecruBulkSel] = useState([]);
  const [recruOffreIaLoading, setRecruOffreIaLoading] = useState(false);
  const [recruOffreIaResult, setRecruOffreIaResult] = useState(null);
  const [bcData, setBcData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_bc_data') || '[]'); } catch(e) { return []; }});
  const [bcEdit, setBcEdit] = useState(null);
  const [bcFilter, setBcFilter] = useState('tous');
  const [bcSearch, setBcSearch] = useState('');
  const [absData, setAbsData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_abs_data') || '[]'); } catch(e) { return []; }});
  const [absEdit, setAbsEdit] = useState(null);
  const [absFilter, setAbsFilter] = useState('tous');
  const [absView, setAbsView] = useState('liste');
  const [absSettingsOpen, setAbsSettingsOpen] = useState(false);
  const [absVisibleCols, setAbsVisibleCols] = useState({collaborateur:true,filiale:true,type:true,periode:true,jours:true,motif:false,statut:true,valideur:false});
  const [absColWidths, setAbsColWidths] = useState({});
  const [formData, setFormData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_form_data') || '[]'); } catch(e) { return []; }});
  const [formEdit, setFormEdit] = useState(null);
  const [formFilialeFilter, setFormFilialeFilter] = useState('tous');
  const [formSettingsOpen, setFormSettingsOpen] = useState(false);
  const [formFilter, setFormFilter] = useState('tous');
  const [ctrData, setCtrData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_ctr_data') || '[]'); } catch(e) { return []; }});
  const [ctrEdit, setCtrEdit] = useState(null);
  const [ctrFilter, setCtrFilter] = useState('tous');
  const [tktData, setTktData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_tkt_data') || '[]'); } catch(e) { return []; }});
  const [tktEdit, setTktEdit] = useState(null);
  const [tktFilter, setTktFilter] = useState('tous');
  const [tktView, setTktView] = useState('liste');
  const [otData, setOtData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_ot_data') || '[]'); } catch(e) { return []; }});
  const [otEdit, setOtEdit] = useState(null);
  const [anaFiliale, setAnaFiliale] = useState('all');
  const [anaTab, setAnaTab] = useState('rentabilite');
  const [anaPeriode, setAnaPeriode] = useState('ytd');
  const [obData, setObData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_ob_data') || '[]'); } catch(e) { return []; }});
  const [obEdit, setObEdit] = useState(null);
  const [offData, setOffData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_off_data') || '[]'); } catch(e) { return []; }});
  const [offEdit, setOffEdit] = useState(null);
  const [offStatutFilter, setOffStatutFilter] = useState('tous');
  const [offMotifFilter, setOffMotifFilter] = useState('tous');
  const [offSettingsOpen, setOffSettingsOpen] = useState(false);
  const [rhData, setRhData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_rh_data') || '[]'); } catch(e) { return []; }});
  const [rhEdit, setRhEdit] = useState(null);
  const [rhSelected, setRhSelected] = useState(null);
  const [rhFilter, setRhFilter] = useState('all');
  const [rhSettingsOpen, setRhSettingsOpen] = useState(false);
  const [crmTheme, setCrmTheme] = usePersistedState('crm_th', 'bee');
  const [crmTint, setCrmTint] = usePersistedState('crm_tn', null);
  const [crmTintLvl, setCrmTintLvl] = usePersistedState('crm_tl', 0);
  const [crmRadius, setCrmRadius] = usePersistedState('crm_rd', 'round');
  const [crmLayout, setCrmLayout] = usePersistedState('crm_lay', 'cartes');
  const [navKeepCards, setNavKeepCards] = usePersistedState('nav_keep_cards', false);
  const [navKeepFil, setNavKeepFil] = usePersistedState('nav_keep_fil', false);
  const [dragFilKey, setDragFilKey] = React.useState(null); // keep svc/mod cards visible
  const [filCardSize, setFilCardSize] = usePersistedState('fil_card_sz', 'lg');   // filiale nav cards
  const [svcCardSize, setSvcCardSize] = usePersistedState('svc_card_sz', 'lg');   // service cards
  const [modCardSize, setModCardSize] = usePersistedState('mod_card_sz', 'lg');   // module cards
  const [homFilCardSize, setHomFilCardSize] = usePersistedState('hom_fil_sz', 'lg'); // home page filiale cards
  const showBorderAccent = crmLayout !== 'sidebar';
  const [crmSideOpen, setCrmSideOpen] = useState(true);
  const [crmPal, setCrmPal] = useState(false);
  const [crmChat, setCrmChat] = useState(false);
  const [crmChatMsg, setCrmChatMsg] = useState('');
  const [crmChatMsgs, setCrmChatMsgs] = useState([{f:'sys',t:'Bienvenue ! Équipe IT à votre service.',h:'09:00'}]);
  const crmTh = CRM_THEMES[crmTheme]||CRM_THEMES.bee;
  const crmAcc = CRM_FIL_ACC[navEntreprise]||CRM_FIL_ACC.groupoy;
  const crmBg = crmTint&&CRM_TINT_BG[crmTint]?CRM_TINT_BG[crmTint][crmTintLvl]:crmTh.bg;
  const crmRd = (CRM_RAD.find(x=>x.id===crmRadius)||CRM_RAD[2]).v;
  // ── Computed theme variables for module-by-module conversion ──
  const $bg = crmTh.isDark ? crmTh.bg : crmBg;
  const $bgCard = crmTh.bgCard;
  const $bgSub = crmTh.isDark ? crmTh.bgSub : (crmTint && CRM_TINT_BG[crmTint] ? CRM_TINT_BG[crmTint][Math.min(crmTintLvl+1,2)] : crmTh.bgSub);
  const $border = crmTh.border;
  const $borderAlt = crmTh.borderLight;
  const $text = crmTh.text;
  const $textSec = crmTh.textSec;
  const $textMut = crmTh.textMut;
  const $accent = crmAcc;
  const $accentSub = crmAcc + '18';
  const $accentHover = crmAcc + 'dd';
  const $selBg = crmAcc + '12';
  const $selText = crmAcc;
  const $selBorder = crmAcc + '35';
  const $bgCardHover = crmTh.bgCardHover;
  const $borderLight = crmTh.borderLight;
  const $shadow = crmTh.shadow;
  const $shadowLg = crmTh.shadowLg;
  const $success = crmTh.success;
  const $warn = crmTh.warn;
  const $danger = crmTh.danger;
  const $info = crmTh.info;
  const [rhTab, setRhTab] = useState('documents');
  const [obPosteFilter, setObPosteFilter] = useState('tous');
  const [obDetail, setObDetail] = useState(null);
  const [obDetailCat, setObDetailCat] = useState(null);
  const [offPosteDecision, setOffPosteDecision] = useState(null);
  const [obStatutFilter, setObStatutFilter] = useState('tous');
  const [obFilialeFilter, setObFilialeFilter] = useState('tous');
  const [obSettingsOpen, setObSettingsOpen] = useState(false);
  const [absViewMonth, setAbsViewMonth] = useState(new Date().getMonth());
  const [formAlertView, setFormAlertView] = useState('alertes');
  const [offTab, setOffTab] = useState('checklist');
  const [spData, setSpData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_sp_data') || '[]'); } catch(e) { return []; }});
  const [spEdit, setSpEdit] = useState(null);
  const [spFilter, setSpFilter] = useState('tous');
  const [rfData, setRfData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_rf_data') || '[]'); } catch(e) { return []; }});
  const [rfEdit, setRfEdit] = useState(null);
  const [rfFilter, setRfFilter] = useState('tous');
  const [cpData, setCpData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_cp_data') || '[]'); } catch(e) { return []; }});
  const [cpEdit, setCpEdit] = useState(null);
  const [cpFilter, setCpFilter] = useState('tous');
  const [cpSearch, setCpSearch] = useState('');
  const [litData, setLitData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_lit_data') || '[]'); } catch(e) { return []; }});
  const [litEdit, setLitEdit] = useState(null);
  const [litFilter, setLitFilter] = useState('tous');
  const [assData, setAssData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_ass_data') || '[]'); } catch(e) { return []; }});
  const [odtData, setOdtData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_odt_data') || '[]'); } catch(e) { return []; }});
  const [matData, setMatData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_mat_data') || '[]'); } catch(e) { return []; }});
  const [odtFilter, setOdtFilter] = useState('tous');
  const [odtView, setOdtView] = useState('liste');
  const [odtEdit, setOdtEdit] = useState(null);
  const [matFilter, setMatFilter] = useState('tous');
  const [matEdit, setMatEdit] = useState(null);
  const [matTab, setMatTab] = useState('dashboard');
  const [matAttest, setMatAttest] = useState(null);
  const [matDetail, setMatDetail] = useState(null);
  const [matFilterOpen, setMatFilterOpen] = useState(false);
  const [matVisibleCols, setMatVisibleCols] = useState({});
  const [matFilialeFilter, setMatFilialeFilter] = useState([]);
  const [filialeFilter, setFilialeFilter] = useState([]); // [] = tout voir, [1,2] = only those
  const [autoData, setAutoData] = useState(() => { try { const v = localStorage.getItem('ruches_auto_version'); if(v !== 'v4_real') { localStorage.removeItem('ruches_auto_data'); localStorage.setItem('ruches_auto_version','v4_real'); return []; } return JSON.parse(localStorage.getItem('ruches_auto_data') || '[]'); } catch(e) { return []; }});
  const [autoFilter, setAutoFilter] = useState('actif');
  const [autoEdit, setAutoEdit] = useState(null);
  const [autoTab, setAutoTab] = useState('dashboard');
  const [autoDetail, setAutoDetail] = useState(null);
  const [autoViewMode, setAutoViewMode] = useState('table');
  const [autoEtatLieux, setAutoEtatLieux] = useState(null);
  const [autoColWidths, setAutoColWidths] = useState({});
  const [autoFilterOpen, setAutoFilterOpen] = useState(false);
  const [autoVisibleCols, setAutoVisibleCols] = useState({});
  const [autoFilialeFilter, setAutoFilialeFilter] = useState([]);
  const [autoStatutFilter, setAutoStatutFilter] = useState(['actif','a_commander']);
  const autoResizeRef = React.useRef(null);
  const [drTab, setDrTab] = useState('filiales');
  const [parcInfoData, setParcInfoData] = useState(() => { try { return JSON.parse(localStorage.getItem('ruches_parc_info') || '[]'); } catch(e) { return []; }});
  const [parcInfoEdit, setParcInfoEdit] = useState(null);
  const [parcInfoDetail, setParcInfoDetail] = useState(null);
  const [parcInfoFilter, setParcInfoFilter] = useState('tous');
  /* ── No scroll on tab switch — sticky tabs handle visibility ── */
  const autoTabsRef = React.useRef(null);
  const [assEdit, setAssEdit] = useState(null);
  const [assTab, setAssTab] = useState('polices');

  // ═══════════════════════════════════════════════════════════════
  // 🏗️ VERI OMURGASI — Entity Resolver & Cross-Navigation
  // ═══════════════════════════════════════════════════════════════
  const FILIALES_REF = [{id:'yilmaz',label:'Yilmaz SAS',icon:'🐝'},{id:1,label:'La Roulotte',icon:'🚛'},{id:2,label:"L'Échafaudage",icon:'⚙️'},{id:3,label:'Ezel Bâtiment',icon:'🏢'},{id:6,label:"L'Étanchéité",icon:'💧'}];
  const getEmploye = (id) => employes.find(e => e.id === id);
  const getEmployeNom = (id) => { const e = getEmploye(id); return e ? `${e.prenom} ${e.nom}` : '—'; };
  const getChantier = (id) => chantiers.find(c => c.id === id);
  const getChantierNom = (id) => getChantier(id)?.nom || '—';
  const getFiliale = (id) => {
    if (id === 'yilmaz' || id === 0 || id === null) return { id:'yilmaz', nom:'YILMAZ SAS', icon:'🐝' };
    const f = filialesDynamiques.find(f => f.id === id);
    if (f) return f;
    const ref = FILIALES_REF.find(r => r.id === id);
    return ref ? { id:ref.id, nom:ref.label, icon:ref.icon } : { nom:'—', icon:'❓' };
  };
  const getFilialeNom = (id) => getFiliale(id)?.nom || '—';
  const getFilialeIcon = (id) => getFiliale(id)?.icon || '🏢';
  const getPresta = (id) => factExtData?.prestataires?.find(p => p.id === id);
  const getPrestaNom = (id) => getPresta(id)?.nom || '—';
  // ═══ ENTITY HIGHLIGHT STATE (for cross-module navigation) ═══
  const [highlightEntity, setHighlightEntity] = useState(null); // {type, id}
  const clearHighlight = () => setHighlightEntity(null);
  // Auto-clear highlight after 4 seconds
  useEffect(() => { if (highlightEntity) { const t = setTimeout(clearHighlight, 4000); return () => clearTimeout(t); } }, [highlightEntity]);
  const isHighlighted = (type, id) => highlightEntity?.type === type && highlightEntity?.id === id;
  const highlightStyle = (type, id) => isHighlighted(type, id) ? {boxShadow:'0 0 0 3px #F8DC00, 0 0 20px rgba(248,220,0,0.3)', transition:'box-shadow 0.3s', animation:'pulse-highlight 1.5s ease-in-out 2'} : {};

  const navigateToEntity = (type, id) => {
    setHighlightEntity({type, id});
    switch(type) {
      case 'employe': setOngletActif('collaborateurs'); setCollabOngletId(id); break;
      case 'chantier': setDashboardFiliale(null); setDashboardChantierId(id); break;
      case 'prestataire': setOngletActif('fact_ext'); setFactExtPreview(id); break;
      case 'filiale': setDashboardFiliale(typeof id === 'string' ? null : id); setOngletActif('dashboard'); break;
      case 'absence': setOngletActif('absences'); break;
      case 'formation': setOngletActif('formation'); break;
      case 'contrat': setOngletActif('contrats'); break;
      case 'litige': setOngletActif('litiges'); break;
      case 'assurance': setOngletActif('assurances'); break;
      case 'ticket': setOngletActif('tickets'); break;
      case 'bon_commande': setOngletActif('bon_commande'); break;
      case 'ordre_travail': setOngletActif('ordres_travail'); break;
      case 'onboarding': setOngletActif('onboarding'); break;
      case 'offboarding': setOngletActif('offboarding'); break;
      case 'dossier_rh': setOngletActif('dossier_rh'); break;
      case 'suivi_presta': setOngletActif('suivi_presta'); break;
      case 'reception_facture': setOngletActif('reception_factures'); break;
      default: break;
    }
  };
  const EntityLink = ({type, id, children, style}) => (
    <span onClick={(e) => {e.stopPropagation(); navigateToEntity(type, id);}} 
      style={{cursor:'pointer', color:'inherit', fontWeight:600, transition:'color 0.15s', ...style}}
      onMouseEnter={e=>e.currentTarget.style.color=$accent}
      onMouseLeave={e=>e.currentTarget.style.color='inherit'}
      title={`Voir ${type}`}>{children}</span>
  );
  // ═══ DISPLAY HELPERS — derive names from central store ═══
  const EmpLink = ({id, style}) => { const e = getEmploye(id); return e ? <EntityLink type="employe" id={id} style={style}>{e.prenom} {e.nom}</EntityLink> : <span style={{color:'#999'}}>—</span>; };
  const FilLink = ({id, style}) => { const f = getFiliale(id); return f ? <EntityLink type="filiale" id={id} style={style}>{f.icon || '🏢'} {f.nom}</EntityLink> : <span style={{color:'#999'}}>YILMAZ SAS</span>; };
  const ChLink = ({id, style}) => { const c = getChantier(id); return c ? <EntityLink type="chantier" id={id} style={style}>{c.nom}</EntityLink> : <span style={{color:'#999'}}>—</span>; };
  const PrestaLink = ({id, style}) => { const p = getPresta(id); return p ? <EntityLink type="prestataire" id={id} style={style}>{p.nom}</EntityLink> : <span style={{color:'#999'}}>—</span>; };
  // Name-only helpers (for compact displays)
  const empNom = (id) => { const e = getEmploye(id); return e ? `${e.prenom} ${e.nom}` : '—'; };
  const filNom = (id) => getFilialeNom(id);
  const chNom = (id) => getChantierNom(id);

  // ═══ GLOBAL FILIALE FILTER ═══
  // Maps navEntreprise to numeric filialeId(s)
  const getContextFilialeIds = () => {
    if (!navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz') {
      // YILMAZ: use multi-select filter if active
      return filialeFilter.length > 0 ? filialeFilter : null; // null = show all
    }
    const map = { 'roulotte': [1], 'echafaudage': [2], 'ezel': [3], 'etancheite': [6] };
    return map[navEntreprise] || null;
  };
  // Filters data array by current filiale context. opts.showAll=true bypasses filter.
  const filterByFiliale = (data, opts = {}) => {
    const ids = getContextFilialeIds();
    if (!ids || opts.showAll) return data;
    return data.filter(d => {
      const fid = d.filialeId;
      if (fid == null || fid === 'all') return true;
      if (fid === 'yilmaz') return true;
      if (typeof fid === 'number') return ids.includes(fid);
      const strMap = { 'roulotte': 1, 'echafaudage': 2, 'ezel': 3, 'etancheite': 6 };
      return ids.includes(strMap[fid]);
    });
  };
  const isYilmazContext = !navEntreprise || navEntreprise === 'groupoy' || navEntreprise === 'yilmaz';
  const FILIALE_FILTER_OPTIONS = [
    {id:1, nom:'La Roulotte', icon:'🚛', couleur:'#C49A2A'},
    {id:2, nom:"L'Échafaudage", icon:'⚙️', couleur:'#6C3483'},
    {id:3, nom:'Ezel Bâtiment', icon:'🏢', couleur:'#007ab5'},
    {id:6, nom:"L'Étanchéité", icon:'💧', couleur:'#0e6655'}
  ];
  const toggleFilialeFilter = (id) => {
    setFilialeFilter(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  // Filiale filter bar component for YILMAZ context
  const FilialeFilterBar = () => {
    if (!isYilmazContext) return null;
    const modulesWithFilter = ['contrats','tickets','bon_commande','litiges','suivi_presta','reception_factures','catalogue_presta','assurances','conformite','ordres_travail'];
    if (!modulesWithFilter.includes(ongletActif)) return null;
    return (
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'6px 20px',background:$bgSub,borderBottom:`1px solid ${$borderAlt}`,flexWrap:'wrap'}}>
        <span style={{fontSize:'0.72rem',color:$textSec,fontWeight:600,marginRight:4}}>Filtrer par filiale :</span>
        <button onClick={()=>setFilialeFilter([])} style={{padding:'4px 12px',borderRadius:crmRd,border:'1px solid '+(filialeFilter.length===0?'#8B6F47':'#d4cfc7'),background:filialeFilter.length===0?'#8B6F47':'white',color:filialeFilter.length===0?'white':'#6b5d4d',fontSize:'0.72rem',fontWeight:600,cursor:'pointer',transition:'all 0.2s'}}>
          🏛️ Toutes
        </button>
        {FILIALE_FILTER_OPTIONS.map(f => {
          const active = filialeFilter.includes(f.id);
          return (
            <button key={f.id} onClick={()=>toggleFilialeFilter(f.id)} style={{padding:'4px 12px',borderRadius:crmRd,border:'1px solid '+(active?f.couleur:'#d4cfc7'),background:active?f.couleur+'18':'white',color:active?f.couleur:'#6b5d4d',fontSize:'0.72rem',fontWeight:600,cursor:'pointer',transition:'all 0.2s'}}>
              {f.icon} {f.nom} {active && '✓'}
            </button>
          );
        })}
        {filialeFilter.length > 0 && <span style={{fontSize:'0.65rem',color:$textMut,marginLeft:4}}>({filialeFilter.length} filiale{filialeFilter.length>1?'s':''} sélectionnée{filialeFilter.length>1?'s':''})</span>}
      </div>
    );
  };

  // ═══ ALERTS SYSTEM (uses sample data as fallback) ═══
  const sampleFormDefault = [
    {id:'FORM-003',employeId:'EMP011',formation:'Travail en hauteur R408',dateExpiration:'2026-06-10',statut:'expire_bientot'},
    {id:'FORM-008',employeId:'EMP013',formation:'CACES R489 Cat. 1-3-5',dateExpiration:'2025-03-18',statut:'expire'}
  ];
  const sampleCtrDefault = [
    {id:'CTR-007',titre:'Maintenance échafaudages LAYHER',dateFin:'2026-02-28',statut:'expire_bientot'}
  ];
  const sampleAssDefault = [
    {id:'ASS-005',type:'RC Exploitation',numPolice:'POL-2024-RCE-002',dateFin:'2025-06-30',statut:'expire_bientot'}
  ];
  const getAlerts = () => {
    const alerts = [];
    const now = new Date();
    const daysDiff = (d) => Math.ceil((new Date(d) - now) / (1000*60*60*24));
    // Formations expiring (use sample defaults if no user data)
    const formActive = formData.length > 0 ? formData : sampleFormDefault;
    formActive.filter(f => f.dateExpiration).forEach(f => {
      const d = daysDiff(f.dateExpiration);
      if (d > 0 && d <= 90) alerts.push({type:'warning',module:'formation',icon:'📋',text:`Formation "${f.intitule || f.formation}" de ${empNom(f.employeId)} expire dans ${d}j`,entityType:'formation',entityId:f.id,employeId:f.employeId});
      else if (d <= 0) alerts.push({type:'critical',module:'formation',icon:'🚨',text:`Formation "${f.intitule || f.formation}" de ${empNom(f.employeId)} EXPIRÉE (${Math.abs(d)}j)`,entityType:'formation',entityId:f.id,employeId:f.employeId});
    });
    // Contrats expiring
    const ctrActive = ctrData.length > 0 ? ctrData : sampleCtrDefault;
    ctrActive.filter(c => c.dateFin).forEach(c => {
      const d = daysDiff(c.dateFin);
      if (d > 0 && d <= 90) alerts.push({type:'warning',module:'contrats',icon:'📄',text:`Contrat "${c.titre}" expire dans ${d}j`,entityType:'contrat',entityId:c.id});
      else if (d <= 0 && c.statut !== 'resilie') alerts.push({type:'critical',module:'contrats',icon:'🚨',text:`Contrat "${c.titre}" EXPIRÉ (${Math.abs(d)}j)`,entityType:'contrat',entityId:c.id});
    });
    // Assurances expiring
    const assActive = assData.length > 0 ? assData : sampleAssDefault;
    assActive.filter(a => a.dateFin).forEach(a => {
      const d = daysDiff(a.dateFin);
      if (d > 0 && d <= 90) alerts.push({type:'warning',module:'assurances',icon:'🛡️',text:`${a.type} (${a.numPolice || '—'}) expire dans ${d}j`,entityType:'assurance',entityId:a.id});
      else if (d <= 0 && a.statut !== 'resilie') alerts.push({type:'critical',module:'assurances',icon:'🚨',text:`${a.type} EXPIRÉE! (${Math.abs(d)}j)`,entityType:'assurance',entityId:a.id});
    });
    // Absences en attente
    const absActive = absData.length > 0 ? absData : [];
    const pendingAbs = absActive.filter(a => a.statut === 'en_attente').length;
    if (pendingAbs > 0) alerts.push({type:'info',module:'absences',icon:'📅',text:`${pendingAbs} demande${pendingAbs>1?'s':''} d'absence en attente`,entityType:'absence'});
    // Tickets ouverts
    const tktActive = tktData.length > 0 ? tktData : [];
    const openTkts = tktActive.filter(t => t.statut === 'ouvert' || t.priorite === 'critique').length;
    if (openTkts > 0) alerts.push({type:'warning',module:'tickets',icon:'🎫',text:`${openTkts} ticket${openTkts>1?'s':''} ouvert${openTkts>1?'s':''}`,entityType:'ticket'});
    // Litiges
    const litActive = litData.length > 0 ? litData : [];
    const openLit = litActive.filter(l => l.statut === 'ouvert' || l.statut === 'procedure').length;
    if (openLit > 0) alerts.push({type:'critical',module:'litiges',icon:'⚖️',text:`${openLit} litige${openLit>1?'s':''} en cours`,entityType:'litige'});
    // Factures à valider
    const rfActive = rfData.length > 0 ? rfData : [];
    const pendingRf = rfActive.filter(r => r.statut === 'a_valider').length;
    if (pendingRf > 0) alerts.push({type:'info',module:'reception_factures',icon:'📥',text:`${pendingRf} facture${pendingRf>1?'s':''} en attente de validation`,entityType:'reception_facture'});
    // BC non validés
    const bcActive = bcData.length > 0 ? bcData : [];
    const pendingBc = bcActive.filter(b => b.statut === 'brouillon' || b.statut === 'emis').length;
    if (pendingBc > 0) alerts.push({type:'info',module:'bon_commande',icon:'📦',text:`${pendingBc} bon${pendingBc>1?'s':''} de commande en attente`,entityType:'bon_commande'});
    // Onboarding en cours
    const obActive = obData.length > 0 ? obData : [];
    const activeOb = obActive.filter(o => o.statut === 'en_cours').length;
    if (activeOb > 0) alerts.push({type:'info',module:'onboarding',icon:'👋',text:`${activeOb} onboarding${activeOb>1?'s':''} en cours`,entityType:'onboarding'});
    // Dossier RH expirants
    const rhActive = rhData.length > 0 ? rhData : [];
    const expiringRh = rhActive.filter(r => r.statut === 'expire' || r.statut === 'expire_bientot').length;
    if (expiringRh > 0) alerts.push({type:'warning',module:'dossier_rh',icon:'📁',text:`${expiringRh} document${expiringRh>1?'s':''} RH expiré${expiringRh>1?'s':''}`,entityType:'dossier_rh'});
    // Ordres de travail urgents
    const odtActive = odtData.length > 0 ? odtData : [];
    const urgentOdt = odtActive.filter(o => o.priorite === 'urgente' && !['termine','annule'].includes(o.statut)).length;
    if (urgentOdt > 0) alerts.push({type:'critical',module:'ordres_travail',icon:'🏗️',text:`${urgentOdt} ordre${urgentOdt>1?'s':''} de travail URGENT${urgentOdt>1?'S':''}`,entityType:'ordre_travail'});
    const retardOdt = odtActive.filter(o => o.dateFin && new Date(o.dateFin) < now && !['termine','annule'].includes(o.statut)).length;
    if (retardOdt > 0) alerts.push({type:'warning',module:'ordres_travail',icon:'⏰',text:`${retardOdt} OT en retard`,entityType:'ordre_travail'});
    // Matériel — VGP/CT proches
    const matActive = matData.length > 0 ? matData : [];
    matActive.filter(m => m.dateVGP && m.statut !== 'reforme').forEach(m => {
      const d = daysDiff(m.dateVGP);
      if (d > 0 && d <= 60) alerts.push({type:'warning',module:'materiel',icon:'🔧',text:`VGP ${m.nom} dans ${d}j`,entityType:'materiel'});
      else if (d <= 0) alerts.push({type:'critical',module:'materiel',icon:'🚨',text:`VGP ${m.nom} DÉPASSÉ (${Math.abs(d)}j)`,entityType:'materiel'});
    });
    matActive.filter(m => m.dateCT && m.statut !== 'reforme').forEach(m => {
      const d = daysDiff(m.dateCT);
      if (d > 0 && d <= 60) alerts.push({type:'warning',module:'materiel',icon:'🚛',text:`CT ${m.nom} dans ${d}j`,entityType:'materiel'});
    });
    const enPanneMat = matActive.filter(m => m.statut === 'panne').length;
    if (enPanneMat > 0) alerts.push({type:'warning',module:'materiel',icon:'⚠️',text:`${enPanneMat} matériel${enPanneMat>1?'s':''} en panne`,entityType:'materiel'});
    return alerts.sort((a,b) => {
      const prio = {critical:0, warning:1, info:2};
      return (prio[a.type]||9) - (prio[b.type]||9);
    });
  };

  // KPI Dashboard
  const filialesOps = filialesDynamiques.filter(f => f.holding !== 'GROUP OY');
  const totalCA = filialesOps.reduce((sum, f) => sum + f.ca, 0);
  const totalEffectif = filialesOps.reduce((sum, f) => sum + getKpiFiliale(f).effectif, 0);
  const nbFiliales = filialesOps.length;
  const nbHoldings = filialesDynamiques.filter(f => f.holding === 'GROUP OY').length;
  const ordreFiliales = ['Yilmaz', 'Ezel Bâtiment', 'La Roulotte', "L'Échafaudage", "L'Étanchéité"];
  const yilmazServiceFees = filialesEnrichies.filter(f => f.holding !== 'GROUP OY').reduce((s, f) => s + f.ca * 0.03, 0);
  const dataCAParFiliale = ordreFiliales.map(nom => {
    if (nom === 'YILMAZ') return { name: 'YILMAZ (Service Fees)', ca: yilmazServiceFees / 1000000, colorLight: '#b0b0b0', colorDark: '#2d2d2d' };
    const f = filialesEnrichies.find(fi => fi.nom === nom);
    if (!f) return null;
    const gradMap = { 'La Roulotte': ['#F5D78E', '#C49A2A'], "L'Échafaudage": ['#C39BD3', '#6C3483'], 'Ezel Bâtiment': ['#85C1E9', '#007ab5'], "L'Étanchéité": ['#82E0AA', '#0e6655'] };
    const g = gradMap[f.nom] || ['#c9b896', '#8B6F47'];
    return { name: f.nom, ca: f.ca / 1000000, colorLight: g[0], colorDark: g[1] };
  }).filter(Boolean);

  const dataEvolutionCA = (() => {
    const anneesSet = new Set();
    filialesDynamiques.forEach(f => (f.historique || []).forEach(h => anneesSet.add(h.annee)));
    anneesSet.add(donneesAnneeActive);
    const annees = [...anneesSet].sort();
    return annees.map(a => {
      if (a === donneesAnneeActive) {
        const enrichedCA = filialesOps.reduce((s,f) => s + getKpiFiliale(f).ca, 0);
        const enrichedEBE = filialesOps.reduce((s,f) => s + getKpiFiliale(f).ebe, 0);
        return { annee: a, ca: parseFloat((enrichedCA / 1000000).toFixed(1)), ebe: parseFloat((enrichedEBE / 1000000).toFixed(2)) };
      }
      let ca = 0, ebe = 0;
      filialesDynamiques.forEach(f => { const h = (f.historique || []).find(x => x.annee === a); if (h) { ca += h.ca; ebe += h.ebe; } });
      return { annee: a, ca: parseFloat(ca.toFixed(1)), ebe: parseFloat(ebe.toFixed(2)) };
    });
  })();

  // Fonctions Essaim
  const ajouterEmploye = () => {
    let serviceAuto = nouvelEmploye.service;
    if (nouvelEmploye.groupe === '0') serviceAuto = 'DIR';
    else if (nouvelEmploye.groupe === '1') {
      if (nouvelEmploye.filiale === '1') serviceAuto = 'EZEL';
      else if (nouvelEmploye.filiale === '2') serviceAuto = 'ECH';
      else if (nouvelEmploye.filiale === '3') serviceAuto = 'ROU';
    } else if (nouvelEmploye.groupe === '2') serviceAuto = nouvelEmploye.pole ? nouvelEmploye.pole.replace('.', '') : 'SUP';
    const newId = `EMP${String(employes.length + 1).padStart(3, '0')}`;
    setEmployes([...employes, { ...nouvelEmploye, id: newId, service: serviceAuto }]);
    setModalAjoutOuvert(false);
    setNouvelEmploye({ nom: '', prenom: '', groupe: '1', filiale: '1', pole: '', service: '', niveau: 'M', posteInterne: '', posteExterne: '' });
  };

  const supprimerEmploye = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce membre de l\'Essaim ?')) {
      setEmployes(employes.filter(e => e.id !== id));
    }
  };

  const viderEssaim = () => {
    if (window.confirm('⚠️ ATTENTION ! Voulez-vous vraiment supprimer TOUT l\'Essaim ?')) {
      setEmployes([]);
    }
  };

  // Drag & drop onglets
  const handleMouseDown = (e, ongletId) => {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragPos({ x: e.clientX, y: e.clientY });
    setOngletDrag(ongletId);
    setIsDragging(false);
    e.preventDefault();
  };

  useEffect(() => {
    if (!ongletDrag) return;
    const handleMouseMove = (e) => {
      setDragPos({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
      let foundTarget = null;
      ordreOnglets.forEach((id, idx) => {
        const ref = ongletRefs.current[id];
        if (ref && id !== ongletDrag) {
          const rect = ref.getBoundingClientRect();
          if (e.clientX >= rect.left && e.clientX <= rect.right) foundTarget = idx;
        }
      });
      setDropTargetIndex(foundTarget);
    };
    const handleMouseUp = () => {
      if (isDragging && dropTargetIndex !== null && ongletDrag) {
        const newOrder = [...ordreOnglets];
        const dragIndex = newOrder.indexOf(ongletDrag);
        if (dragIndex !== dropTargetIndex) { newOrder.splice(dragIndex, 1); newOrder.splice(dropTargetIndex, 0, ongletDrag); setOrdreOnglets(newOrder); }
      } else if (!isDragging && ongletDrag) setOngletActif(ongletDrag);
      setOngletDrag(null); setIsDragging(false); setDropTargetIndex(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [ongletDrag, isDragging, dropTargetIndex, ordreOnglets]);

  // Drag & drop blocs Présentation
  const handleBlocMouseDown = (e, blocId) => {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setBlocDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setBlocDragPos({ x: e.clientX, y: e.clientY });
    setBlocDrag(blocId);
    setIsBlocDragging(false);
    blocDragRef.current = { width: rect.width, height: Math.min(rect.height, 120) };
    e.preventDefault(); e.stopPropagation();
  };

  useEffect(() => {
    if (!blocDrag) return;
    const handleMouseMove = (e) => {
      setBlocDragPos({ x: e.clientX, y: e.clientY });
      setIsBlocDragging(true);
      let foundTarget = null;
      ordreBlocsPresentation.forEach((id, idx) => {
        const ref = blocRefs.current[id];
        if (ref && id !== blocDrag) {
          const rect = ref.getBoundingClientRect();
          if (e.clientY >= rect.top && e.clientY <= rect.bottom) foundTarget = idx;
        }
      });
      setBlocDropTargetIndex(foundTarget);
    };
    const handleMouseUp = () => {
      if (isBlocDragging && blocDropTargetIndex !== null && blocDrag) {
        const newOrder = [...ordreBlocsPresentation];
        const dragIndex = newOrder.indexOf(blocDrag);
        if (dragIndex !== blocDropTargetIndex) { newOrder.splice(dragIndex, 1); newOrder.splice(blocDropTargetIndex, 0, blocDrag); setOrdreBlocsPresentation(newOrder); }
      }
      setBlocDrag(null); setIsBlocDragging(false); setBlocDropTargetIndex(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [blocDrag, isBlocDragging, blocDropTargetIndex, ordreBlocsPresentation]);

  const configBlocsPresentation = {
    histoire: { label: "L'Histoire de la Ruche", icon: '📖' },
    bareme: { label: 'Barème de Performance', icon: '📊' },
    architecture: { label: "L'Architecture de la Ruche", icon: '🐝' },
    grilles: { label: 'Grilles de Rémunération', icon: '💰' },
    composition: { label: 'Composition de la Part Variable', icon: '📈' }
  };

  const configColonnes = {
    niveau:  { label: 'Niveau', sub: null },
    poste:   { label: 'Poste Ruche', sub: null },
    caMin:   { label: 'CA Min', sub: 'k€', group: 'CA' },
    caMax:   { label: 'CA Max', sub: 'k€', group: 'CA' },
    fixe:    { label: '💵 Fixe', sub: null },
    prime:   { label: '🎁 Prime', sub: null },
    varMin:  { label: '📈 Var. Min', sub: 'coeff 0.5', group: 'Variable' },
    varMax:  { label: '📈 Var. Max', sub: 'coeff 1.3', group: 'Variable' },
    salMin:  { label: '💰 Sal. Min', sub: null, group: 'Salaire' },
    salMax:  { label: '💰 Sal. Max', sub: null, group: 'Salaire' },
    ebe:     { label: '🎯 EBE Cible', sub: null },
    plafond: { label: '🔝 Plafond', sub: null }
  };

  // ═══════════════════════════════════════════════════════
  // PART 3 — Calculs, fonctions, return JSX (début)
  // ═══════════════════════════════════════════════════════

  // Drag & drop colonnes grille
  const handleColMouseDown = (e, colId) => {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setColDragOffset({ x: e.clientX - rect.left });
    setColDragPos({ x: e.clientX, y: e.clientY });
    setColDrag(colId);
    setIsColDragging(false);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!colDrag) return;
    const handleMouseMove = (e) => {
      setColDragPos({ x: e.clientX, y: e.clientY });
      setIsColDragging(true);
      let foundTarget = null;
      ordreColonnesGrille.forEach((id, idx) => {
        const ref = colRefs.current[id];
        if (ref && id !== colDrag) {
          const rect = ref.getBoundingClientRect();
          if (e.clientX >= rect.left && e.clientX <= rect.right) foundTarget = idx;
        }
      });
      setColDropTargetIndex(foundTarget);
    };
    const handleMouseUp = () => {
      if (isColDragging && colDropTargetIndex !== null && colDrag) {
        const newOrder = [...ordreColonnesGrille];
        const dragIndex = newOrder.indexOf(colDrag);
        if (dragIndex !== colDropTargetIndex) {
          newOrder.splice(dragIndex, 1);
          newOrder.splice(colDropTargetIndex, 0, colDrag);
          setOrdreColonnesGrille(newOrder);
        }
      }
      setColDrag(null); setIsColDragging(false); setColDropTargetIndex(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [colDrag, isColDragging, colDropTargetIndex, ordreColonnesGrille]);

  const getCellValue = (colId, g, varMin, varMaxPlafonnee, salaireMin, salaireMax) => {
    switch(colId) {
      case 'niveau': return { val: g.niveau, color:null, bold:true, align:'left' };
      case 'poste': return { val: g.posteInterne, color:null, bold:g.niveau==='XXXL', align:'left' };
      case 'caMin': return { val: (g.caMin / 1000).toLocaleString('fr-FR'), color:null, bold:false, align:'right' };
      case 'caMax': return { val: (g.caMax / 1000).toLocaleString('fr-FR'), color:null, bold:true, align:'right' };
      case 'fixe': return { val: (g.fixe/1000).toFixed(0)+'k€', color:'#1d4ed8', bold:true, align:'right' };
      case 'prime': return { val: (g.prime/1000).toFixed(0)+'k€', color:'#7c3aed', bold:false, align:'right' };
      case 'varMin': return { val: (varMin/1000).toFixed(0)+'k€', color:'#059669', bold:false, align:'right' };
      case 'varMax': return { val: (varMaxPlafonnee/1000).toFixed(0)+'k€', color:'#15803d', bold:true, align:'right' };
      case 'salMin': return { val: (salaireMin/1000).toFixed(0)+'k€', color:'#d97706', bold:false, align:'right' };
      case 'salMax': return { val: (salaireMax/1000).toFixed(0)+'k€', color:'#b45309', bold:true, align:'right' };
      case 'ebe': return { val: (g.ebeCible*100).toFixed(0)+'%', color:'#ea580c', bold:true, align:'right' };
      case 'plafond': return { val: (g.plafond/1000).toFixed(0)+'k€', color:'#b45309', bold:true, align:'right' };
      default: return { val: '', color:null, bold:false, align:'left' };
    }
  };

  const calculateObjectives = (duration_years, annual_targets) => {
    if (!annual_targets || annual_targets.length === 0 || annual_targets.every(t => t === 0)) {
      return { mode: "init", monthly_objective: [], cumulative_objective: [], total_target: 0 };
    }
    if (duration_years < 1 || duration_years > 10 || annual_targets.length !== duration_years) {
      return { mode: "error", error: "Durée et liste incohérentes." };
    }
    const monthly_objective = [];
    const cumulative_objective = [];
    let cumulative = 0;
    for (let year = 0; year < duration_years; year++) {
      const monthly = annual_targets[year] / 12;
      for (let month = 0; month < 12; month++) {
        monthly_objective.push(Math.round(monthly * 100) / 100);
        cumulative += monthly;
        cumulative_objective.push(Math.round(cumulative * 100) / 100);
      }
    }
    return { mode: "compute", duration_years, annual_targets, monthly_objective, cumulative_objective, total_target: Math.round(annual_targets.reduce((s, v) => s + v, 0) * 100) / 100 };
  };

  const niveau = grille.find(g => g.niveau === niveauSelectionne);
  if (!niveau) return <div className="p-6 text-center text-red-600">Erreur: Niveau non trouvé</div>;

  const getCoefficient = (ebeRealise, ebeCible) => {
    const ecart = ebeRealise - ebeCible;
    for (let i = 0; i < baremeRelatif.length; i++) {
      if (ecart >= baremeRelatif[i].ecartMin && ecart <= baremeRelatif[i].ecartMax) {
        return { coeff: baremeRelatif[i].coeff, emoji: baremeRelatif[i].emoji, commentaire: baremeRelatif[i].commentaire, label: baremeRelatif[i].label };
      }
    }
    return { coeff: 0, emoji: "❌", commentaire: "Objectif non atteint", label: "< Cible" };
  };

  // Calculs simulateur général
  const amortissements = ca * tauxAmortissements;
  const achatsST = ca * sousTraitance;
  const margeBrute = ca - achatsST;
  const margeBrutePercent = (margeBrute / ca);
  const fraisYilmaz = ca * tauxFraisYilmaz;
  const fraisHolding = ca * tauxFraisHolding;
  const fraisGroupOY = ca * tauxFraisGroupOY;
  const totalFraisStructure = fraisYilmaz + fraisHolding + fraisGroupOY;
  const ebeValeur = margeBrute - fraisInternes - totalFraisStructure;
  const ebePercent = (ebeValeur / ca);
  const fraisInternesPercent = (fraisInternes / ca);
  const baseVariable = ca * 0.01;
  const coeffResult = getCoefficient(ebePercent, niveau.ebeCible);
  const coefficient = coeffResult.coeff;
  const variableModulee = baseVariable * coefficient;
  const ecartEBE = ebePercent - niveau.ebeCible;
  const remunerationAvantPlafond = niveau.fixe + niveau.prime + variableModulee;
  const remunerationTotale = Math.min(remunerationAvantPlafond, niveau.plafond);
  const variableAjustee = remunerationTotale - niveau.fixe - niveau.prime;
  const resultatExploitation = ebeValeur - amortissements;
  const impots = resultatExploitation > 0 ? resultatExploitation * tauxImpots : 0;
  const resultatNet = resultatExploitation - impots;
  const resultatNetPercent = (resultatNet / ca);

  // Suivi collaborateurs
  const collabActuel = collaborateurs.find(c => c.id === collabSelectionne);

  const calculerRemunerationCollab = (collab) => {
    const niv = grille.find(g => g.niveau === collab.niveau);
    if (!niv) return null;
    if (!niv) return null;
    const achatsST = collab.caRealise * (1 - collab.margeBrute);
    const margeBruteVal = collab.caRealise * collab.margeBrute;
    const fraisYilmazCollab = collab.caRealise * tauxFraisYilmaz;
    const fraisHoldingCollab = collab.caRealise * tauxFraisHolding;
    const fraisGroupOYCollab = collab.caRealise * tauxFraisGroupOY;
    const totalFraisStructureCollab = fraisYilmazCollab + fraisHoldingCollab + fraisGroupOYCollab;
    const ebeVal = collab.caRealise * collab.ebeRealise;
    const fraisInt = margeBruteVal - ebeVal - totalFraisStructureCollab;
    const margeNetteVal = ebeVal * 0.75;
    const baseVar = collab.caRealise * 0.01;
    const coeffResult = getCoefficient(collab.ebeRealise, niv.ebeCible);
    const coeff = coeffResult.coeff;
    const varMod = baseVar * coeff;
    const remTotale = Math.min(niv.fixe + niv.prime + varMod, niv.plafond);
    const varAjust = Math.min(varMod, niv.plafond - niv.fixe - niv.prime);
    const projectionCA = collab.moisEcoules > 0 ? (collab.caRealise / collab.moisEcoules) * 12 : 0;
    const projectionBaseVar = projectionCA * 0.01;
    const projectionVarMod = projectionBaseVar * coeff;
    const projectionRemTotale = Math.min(niv.fixe + niv.prime + projectionVarMod, niv.plafond);
    return { niveau: niv, baseVariable: baseVar, coefficient: coeff, coeffResult, variableModulee: varMod, variableAjustee: varAjust, remunerationTotale: remTotale, projectionCA, projectionRemuneration: projectionRemTotale, margeBruteValeur: margeBruteVal, ebeValeur: ebeVal, margeNetteValeur: margeNetteVal, achatsST, fraisInternes: fraisInt, fraisHolding };
  };

  const calculsCollab = collabActuel ? calculerRemunerationCollab(collabActuel) : null;

  const updateCollaborateur = (field, value) => {
    setCollaborateurs(collaborateurs.map(c => c.id === collabSelectionne ? { ...c, [field]: value } : c));
  };

  const updateObjectifs = (field, value) => {
    setCollaborateurs(collaborateurs.map(c => c.id === collabSelectionne ? { ...c, objectifs: { ...c.objectifs, [field]: value } } : c));
  };

  const calculerObjectifsLies = (champ, valeur) => {
    if (!collabActuel) return;
    const obj = { ...collabActuel.objectifs };
    if (champ === 'margeBruteObj') obj.margeBruteObj = valeur;
    else if (champ === 'ebeObj') { obj.ebeObj = valeur; obj.margeNetteObj = valeur * 0.75; }
    else if (champ === 'margeNetteObj') { obj.margeNetteObj = valeur; obj.ebeObj = valeur / 0.75; }
    setCollaborateurs(collaborateurs.map(c => c.id === collabSelectionne ? { ...c, objectifs: obj } : c));
  };

  const genererDonneesGraphique = () => {
    if (!collabActuel) return [];
    const donnees = [];
    const obj = collabActuel.objectifs;
    const niv = grille.find(g => g.niveau === collabActuel.niveau);
    const objectifsCalcules = calculateObjectives(obj.dureeAnnees, obj.objectifsAnnuels);
    if (objectifsCalcules.mode !== "compute") return [];
    const caMensuelActuel = collabActuel.moisEcoules > 0 ? collabActuel.caRealise / collabActuel.moisEcoules : 0;
    const totalMois = obj.dureeAnnees * 12;
    for (let moisIndex = 0; moisIndex < totalMois; moisIndex++) {
      const annee = Math.floor(moisIndex / 12) + 1;
      const moisDansAnnee = (moisIndex % 12) + 1;
      const numeroMois = moisIndex + 1;
      const estRealise = numeroMois <= collabActuel.moisEcoules;
      let caMois;
      if (numeroMois <= collabActuel.moisEcoules) caMois = collabActuel.caRealise * (numeroMois / collabActuel.moisEcoules);
      else caMois = collabActuel.caRealise + (caMensuelActuel * (numeroMois - collabActuel.moisEcoules));
      const margeBruteMois = caMois * (estRealise ? collabActuel.margeBrute : obj.margeBruteObj);
      const ebeMois = caMois * (estRealise ? collabActuel.ebeRealise : obj.ebeObj);
      const margeNetteMois = ebeMois * 0.75;
      const baseVar = caMois * 0.01;
      const coeff = getCoefficient(estRealise ? collabActuel.ebeRealise : obj.ebeObj, niv.ebeCible);
      const varMod = baseVar * coeff.coeff;
      const remTot = Math.min(niv.fixe + niv.prime + varMod, niv.plafond);
      const varAjust = Math.min(varMod, niv.plafond - niv.fixe - niv.prime);
      const caObjectifCumule = objectifsCalcules.cumulative_objective[moisIndex];
      const periode = annee === 1 ? `M${moisDansAnnee}` : `A${annee}-M${moisDansAnnee}`;
      donnees.push({ periode, annee, ca: Math.round(caMois), remuneration: Math.round(remTot), fixe: niv.fixe, primefixe: niv.prime, variable: Math.round(varAjust), margeBrute: Math.round(margeBruteMois), ebe: Math.round(ebeMois), margeNette: Math.round(margeNetteMois), estRealise, caObjectif: Math.round(caObjectifCumule), ebeObjectif: Math.round(caObjectifCumule * obj.ebeObj), margeBruteObjectif: Math.round(caObjectifCumule * obj.margeBruteObj) });
    }
    return donnees;
  };

  const donneesGraphique = genererDonneesGraphique();
  const donneesFiltrees = filtreAnnee === 'toutes' ? donneesGraphique : donneesGraphique.filter(d => d.annee === Number(filtreAnnee));

  const formatEuro = (valeur) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valeur);
  const formatPercent = (valeur) => `${(valeur * 100).toFixed(1)} %`;

  

  // Abeille animée
  const BeeAnimated = () => {
    const [buzzing, setBuzzing] = React.useState(false);
    const [flying, setFlying] = React.useState(false);
    const buzzTimeout = React.useRef(null);
    const flyTimeout = React.useRef(null);
    const audioCtx = React.useRef(null);
    const playBuzz = () => {
      try {
        if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.current.state === 'suspended') audioCtx.current.resume();
        const ctx = audioCtx.current; const now = ctx.currentTime;
        const osc1 = ctx.createOscillator(); osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(150, now); osc1.frequency.linearRampToValueAtTime(190, now + 0.4); osc1.frequency.linearRampToValueAtTime(145, now + 0.9); osc1.frequency.linearRampToValueAtTime(195, now + 1.4); osc1.frequency.linearRampToValueAtTime(155, now + 1.9); osc1.frequency.linearRampToValueAtTime(180, now + 2.3); osc1.frequency.linearRampToValueAtTime(150, now + 2.8);
        const gain = ctx.createGain(); gain.gain.setValueAtTime(0.0, now); gain.gain.linearRampToValueAtTime(0.12, now + 0.15); gain.gain.setValueAtTime(0.12, now + 0.5); gain.gain.linearRampToValueAtTime(0.08, now + 2.0); gain.gain.linearRampToValueAtTime(0.0, now + 2.8);
        osc1.connect(gain); gain.connect(ctx.destination); osc1.start(now); osc1.stop(now + 2.9);
      } catch(e) {}
    };
    const startBuzz = () => { setBuzzing(true); setFlying(true); playBuzz(); if(buzzTimeout.current) clearTimeout(buzzTimeout.current); buzzTimeout.current = setTimeout(() => setBuzzing(false), 2500); if(flyTimeout.current) clearTimeout(flyTimeout.current); flyTimeout.current = setTimeout(() => setFlying(false), 3000); };
    return (<div className={flying ? 'bee-flying' : buzzing ? 'bee-buzzing' : 'bee-idle'} onMouseEnter={startBuzz} onClick={startBuzz} style={{ fontSize:'4rem', lineHeight:1, userSelect:'none', cursor:'pointer' }} title="Bzzz... 🐝">🐝</div>);
  };

  const filialesOpPublic = filialesEnrichies.filter(f => !['GROUP OY','INVEST LOC','INVEST EXE','YILMAZ'].includes(f.nom));
  const gradMapPublic = {'La Roulotte':['#F5D78E','#C49A2A'],"L'Échafaudage":['#C39BD3','#6C3483'],'Ezel Bâtiment':['#85C1E9','#007ab5'],"L'Étanchéité":['#82E0AA','#0e6655']};

// (AO_RAW, AO_EXT, getExt, DOS_IDS, AFF_IDS, getDosId, getAffId, getInternalId, getNextDosNum, SOUS_ELEMENTS → ./data/ao.js — modularisation étape 2)


  return (
    <>
    {/* === MODALE DE CONNEXION === */}
    {showLoginModal && (
      <div style={{position:'fixed', inset:0, zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter, system-ui, sans-serif'}}>
        <div onClick={() => { setShowLoginModal(false); setLoginError(''); }} style={{position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 20%, rgba(201,162,39,0.14), transparent 55%), radial-gradient(ellipse at bottom right, rgba(139,111,71,0.10), transparent 60%), rgba(8,7,5,0.82)', backdropFilter:'blur(14px)'}} />
        <div style={{position:'relative', background:'linear-gradient(160deg, rgba(28,24,18,0.92), rgba(16,14,10,0.96))', backdropFilter:'blur(30px)', WebkitBackdropFilter:'blur(30px)', border:'1px solid rgba(201,162,39,0.35)', borderRadius:18, padding:'44px 40px', width:'100%', maxWidth:420, boxShadow:'0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,39,0.08), inset 0 1px 0 rgba(255,255,255,0.06)', animation:'fadeInUp 0.3s ease'}}>
          <button onClick={() => { setShowLoginModal(false); setLoginError(''); }} style={{position:'absolute', top:16, right:16, background:'none', border:'none', fontSize:'1.3rem', cursor:'pointer', color:'#999'}}>✕</button>
          <div style={{textAlign:'center', marginBottom:30}}>
            <div style={{width:64, height:64, margin:'0 auto 14px', borderRadius:'50%', border:'1.5px solid rgba(201,162,39,0.6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.35rem', fontWeight:600, letterSpacing:'0.08em', color:'#c9a227', background:'radial-gradient(circle at 35% 30%, rgba(201,162,39,0.16), transparent 70%)'}}>OY</div>
            <h1 style={{fontSize:'1.45rem', fontWeight:600, color:'#f4efe6', margin:0, letterSpacing:'0.02em'}}>Espace de Gestion</h1>
            <p style={{color:'#c9b892', fontSize:'0.88rem', margin:'6px 0 0', opacity:0.85}}>Le Grand Rucher — accès privé</p>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:'block', fontSize:'0.85rem', color:'#666', marginBottom:4, fontWeight:600}}>Identifiant</label>
            <input value={loginForm.login} onChange={e => setLoginForm({...loginForm, login: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="ex: ozdogan" style={{width:'100%', padding:'12px 14px', border:'2px solid #f0ebe3', borderRadius:crmRd, fontSize:'0.95rem', outline:'none', boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block', fontSize:'0.85rem', color:'#666', marginBottom:4, fontWeight:600}}>Mot de passe</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" style={{width:'100%', padding:'12px 14px', border:'2px solid #f0ebe3', borderRadius:crmRd, fontSize:'0.95rem', outline:'none', boxSizing:'border-box'}} />
          </div>
          {loginError && <div style={{background:$danger+'12', border:'1px solid #fecaca', color:'#dc2626', padding:'8px 12px', borderRadius:crmRd, fontSize:'0.9rem', marginBottom:16, fontWeight:600}}>{loginError}</div>}
          <button onClick={handleLogin} style={{width:'100%', padding:'14px', background:`linear-gradient(135deg, ${$accent}, ${$accent}cc)`, color:'white', border:'none', borderRadius:crmRd, fontSize:'1rem', fontWeight:700, cursor:'pointer'}}>Se connecter</button>
          
        </div>
      </div>
    )}
    <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

    {/* === PAGE PUBLIQUE : topbar === */}
    {!isLoggedIn && (
      <div style={{position:'fixed', top:0, left:0, right:0, zIndex:9998, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 32px', boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:'1.4rem'}}>🐝</span>
          <span style={{fontSize:'1.05rem', fontWeight:800, color:$accent}}>Group OY</span>
          <span style={{fontSize:'0.78rem', color:$textMut, marginLeft:4}}>Le Grand Rucher</span>
        </div>
        <button onClick={() => setShowLoginModal(true)} style={{padding:'9px 24px', borderRadius:crmRd, border:'1.5px solid #c9b896', background:'transparent', color:$accent, fontWeight:700, fontSize:'0.92rem', cursor:'pointer'}} onMouseOver={e => {e.target.style.background='#8B6F47'; e.target.style.color='white';}} onMouseOut={e => {e.target.style.background='transparent'; e.target.style.color='#8B6F47';}}>
          Se connecter
        </button>
      </div>
    )}

    {/* ══ TOP BAR — full width, above sidebar ══ */}
    {crmLayout==='sidebar' && isLoggedIn && (
      <div style={{position:'sticky',top:0,zIndex:9001,background:crmTh.isDark?'rgba(10,10,10,0.9)':'rgba(255,255,255,0.9)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:`1px solid ${$border}`,padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.78rem'}}>
          <span style={{color:'#8B6F47',cursor:'pointer'}} onClick={()=>{setNavEntreprise('groupoy');setNavService(null);setOngletActif('dashboard');}}>Group OY</span>
          <span style={{color:$textMut,opacity:0.4}}>›</span>
          <span style={{color:crmAcc,cursor:'pointer'}} onClick={()=>{setNavService(null);setOngletActif('dashboard');}}>{CRM_FIL_NAMES[navEntreprise||'groupoy']}</span>
          {ongletActif && ongletActif!=='dashboard' && <><span style={{color:$textMut,opacity:0.4}}>›</span><span style={{fontWeight:600,color:$text}}>{({'dashboard':'Dashboard','kpi_dashboard':'KPI','veille_ao':'Veille AO','svc_kpi':'Indicateurs','planning_gantt':'Planning','calendrier_svc':'Calendrier','processus_svc':'Processus','collaborateurs':'Collaborateurs','organigramme':'Organigramme','recrutement':'Recrutement','onboarding':'Onboarding','offboarding':'Offboarding',dossier_rh:'Dossier RH','presentation':'Modèle Ruches','simulateur':'Simulateur','suivi':'Suivi de l\'Essaim','formation':'Formation','absences':'Absences','bon_commande':'Bons de commande','fact_interne':'Fact. interne','fact_externe':'Fact. externe','budget':'Budget','tresorerie':'Trésorerie','contrats':'Contrats','litiges':'Litiges','assurances':'Assurances','conformite':'Conformité','identite':'Identité','supports':'Supports','web':'Web','outils':'Outils','tickets':'Tickets','parc_automobile':'Parc auto','materiel':'Matériel','admin':'Admin','roadmap':'Roadmap','presentation_groupe':'Groupe','ordres_travail':'Ordres travail','crm_commercial':'CRM Commercial','suivi_dossiers':'Suivi Dossiers AO'})[ongletActif]||ongletActif}</span></>}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setCrmPal(!crmPal)} style={{padding:'5px 12px',height:32,borderRadius:crmRd,border:`1px solid ${crmPal?crmAcc:$border}`,background:crmPal?$accentSub:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.78rem',transition:'all 0.15s',gap:4,fontFamily:'inherit',color:crmPal?crmAcc:$textMut}}>{String.fromCodePoint(0x1F3A8)} <span style={{fontSize:'0.7rem'}}>Thème</span></button>
          <div onClick={handleLogout} title="Déconnexion" style={{width:30,height:30,borderRadius:crmRd>6?8:crmRd>0?4:2,background:`linear-gradient(135deg,${crmAcc},${crmAcc}cc)`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'0.65rem',fontWeight:700,cursor:'pointer',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>ÖY</div>
        </div>
      </div>
    )}

    <div style={isLoggedIn ? {minHeight:'100vh', background:crmTh.isDark?crmTh.bg:crmBg, padding:crmLayout==='sidebar'?'24px 28px 1rem 28px':'1rem', fontFamily:crmTh.font, transition:'background 0.3s', marginLeft:crmLayout==='sidebar'?(crmSideOpen?210:48):0} : {paddingTop:56, fontFamily:'Inter, system-ui, sans-serif', minHeight:'100vh'}}>
      <style>{`
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media print {
          body > * { display: none !important; }
          body { background: white !important; }
          #print-overlay { display: block !important; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 99999; overflow: visible; padding: 20px; }
          #print-overlay * { color-adjust: exact; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @keyframes sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); }
        @keyframes sweepBack { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes wave { 0% { transform: rotate(0deg); } 15% { transform: rotate(14deg); } 30% { transform: rotate(-8deg); } 45% { transform: rotate(14deg); } 60% { transform: rotate(-4deg); } 75% { transform: rotate(10deg); } 100% { transform: rotate(0deg); } }
        .wave-emoji { display:inline-block; animation: wave 1.5s ease-in-out; transform-origin: 70% 70%; }
        .wave-trigger:hover .wave-emoji { animation: wave 1.5s ease-in-out infinite; }
        .nav-yilmaz-btn { flex:1 1 0%; padding:0.75rem 0.4rem; border:none; background:transparent; color:#fdd835; font-size:0.75rem; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.3rem; position:relative; overflow:hidden; transition:all 0.3s; white-space:nowrap; min-width:0; }
        .nav-yilmaz-btn::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.1)); transform:translateX(-100%); transition:none; }
        .nav-yilmaz-btn:not(.nav-active):hover { background:rgba(0,0,0,0.3); color:white; }
        .nav-yilmaz-btn:not(.nav-active):hover::before { animation: sweep 0.8s ease-in-out; }
        .nav-yilmaz-btn.nav-active { background:#FFC107; color:#2d2216; font-weight:bold; box-shadow:inset 0 2px 4px rgba(0,0,0,0.1); }
        @keyframes beeBuzz { 0% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(2px,-3px) rotate(5deg); } 50% { transform: translate(-3px,2px) rotate(-5deg); } 75% { transform: translate(3px,1px) rotate(3deg); } 100% { transform: translate(0,0) rotate(0deg); } }
        .bee-idle { animation: none; cursor: pointer; }
        .bee-buzzing { animation: beeBuzz 0.15s ease-in-out infinite; cursor: pointer; }
        .bee-flying { animation: beeFly 3.5s ease-in-out forwards, beeFlap 0.12s ease-in-out infinite; cursor: pointer; }
        @keyframes beeFly { 0% { translate: 0px 0px; } 30% { translate: 40px -20px; } 60% { translate: -20px -32px; } 100% { translate: 0px 0px; } }
        @keyframes beeFlap { 0% { transform: rotate(-6deg) scaleX(1); } 50% { transform: rotate(4deg) scaleX(0.92); } 100% { transform: rotate(-6deg) scaleX(1); } }
      `}</style>

      <div style={{maxWidth:'1600px', margin:'0 auto'}}>
        {isLoggedIn && (<>
        {/* ══ STICKY BREADCRUMB — only visible after scroll ══ */}
        <div style={{position:'sticky', top:0, zIndex:50, transition:'all 0.3s ease', opacity: headerCompact ? 1 : 0, pointerEvents: headerCompact ? 'auto' : 'none', maxHeight: headerCompact ? 60 : 0, overflow:'hidden', marginBottom: headerCompact ? 6 : 0, display:crmLayout==='sidebar'?'none':undefined, height:crmLayout==='sidebar'?0:undefined}}>
          <div style={{background:'rgba(245,243,238,0.92)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', padding:'4px 4px', borderRadius:0}}>
          <div style={{background:$bgCard, borderRadius:crmRd, padding:'6px 16px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${$border}`}}>
            <div style={{flexShrink:0, cursor:'pointer', display:'flex', alignItems:'center'}} onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div style={{transform:'scale(0.35)', transformOrigin:'center center', margin:'-14px -10px'}}><BeeAnimated /></div>
            </div>
            <div style={{flex:1, display:'flex', alignItems:'center', gap:4, fontSize:'0.85rem', color:$accent, fontWeight:600, overflow:'hidden', whiteSpace:'nowrap'}}>
              {navEntreprise ? (
                <>
                  <span onClick={() => { setNavService(null); setOngletActif('dashboard'); }} style={{cursor:'pointer', opacity: navService ? 0.6 : 1, transition:'opacity 0.2s'}} onMouseOver={e=>{ if(navService) e.currentTarget.style.opacity=1; }} onMouseOut={e=>{ if(navService) e.currentTarget.style.opacity=0.6; }}>
                    {(() => { const e2 = {groupoy:'',yilmaz:'🏢',ezel:'🏗️',roulotte:'🚛',echafaudage:'⚙️',etancheite:'💧'}; return e2[navEntreprise]||''; })()} {SERVICES_CONFIG[navEntreprise]?.nom}
                  </span>
                  {navService && (
                    <>
                      <span style={{color:'#d4d0c8', fontSize:'0.75rem'}}>›</span>
                      <span onClick={() => { setNavService(null); setOngletActif('dashboard'); }} style={{cursor:'pointer', opacity:0.6, transition:'opacity 0.2s'}} onMouseOver={e=>e.currentTarget.style.opacity=1} onMouseOut={e=>e.currentTarget.style.opacity=0.6}>
                        {SERVICES_CONFIG[navEntreprise]?.services.find(s=>s.id===navService)?.icon} {SERVICES_CONFIG[navEntreprise]?.services.find(s=>s.id===navService)?.label}
                      </span>
                      {ongletActif && (
                        <>
                          <span style={{color:'#d4d0c8', fontSize:'0.75rem'}}>›</span>
                          <span style={{color:$text, fontWeight:700}}>{
                            {dashboard:'Tableau de Bord', presentation_groupe:'Présentation Group', presentation:'Modèle Ruches', simulateur:'Simulateur', suivi:'Suivi de l\'Essaim', collaborateurs:'Collaborateurs', organigramme:'Organigramme', postes:'Postes', admin:'Administration',
                            roadmap:'Feuille de Route', fact_interne:'Facturation Interne', fact_externe:'Facturation Externe', budget:'Budget Prévisionnel', tresorerie:'Trésorerie', analytique:'Analytique',
                            recrutement:'Recrutement', onboarding:'Onboarding', offboarding:'Offboarding', dossier_rh:'Dossier RH', formation:'Formation', absences:'Absences',
                            bon_commande:'Bons de Commande', suivi_presta:'Suivi Prestataires', reception_factures:'Réception Factures', catalogue_presta:'Catalogue Prestataires',
                            outils:'Outils', tickets:'Tickets', contrats:'Contrats', litiges:'Litiges', assurances:'Assurances', conformite:'Conformité',
                            identite:'Identité Visuelle', supports:'Supports', web:'Présence Web', donnees_ref:'Données de Référence', parc_info:'Parc Informatique',
                            ordres_travail:'Ordres de Travail', parc_automobile:'Parc Automobile', materiel:'Parc Matériel',
                            kpi_dashboard:'KPI', veille_ao:'Veille AO', svc_kpi:'Réponses AO', planning_gantt:'Planning', calendrier_svc:'Calendrier', processus_svc:'Processus', crm_commercial:'CRM Commercial'}[ongletActif] || ongletActif
                          }</span>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <span style={{color:$textMut}}>Group OY — Vue consolidée</span>
              )}
            </div>
            {navEntreprise === 'yilmaz' && navService === 'direction' && crmLayout!=='sidebar' && (
              <div style={{display:'flex', gap:4, flexShrink:0}}>
                {[{key:'widgets', label:'📊'}, {key:'services', label:'🏢'}, {key:'groupe', label:'🐝'}].map(tab => (
                  <div key={tab.key} onClick={() => setYilmazVue(tab.key)}
                    style={{padding:'3px 8px', borderRadius:crmRd, fontSize:'0.8rem', fontWeight:700, background: yilmazVue === tab.key ? '#8B6F47' : '#f0ebe3', color: yilmazVue === tab.key ? 'white' : '#b0a08a', cursor:'pointer', transition:'all 0.2s'}}>
                    {tab.label}
                  </div>
                ))}
              </div>
            )}
            <button onClick={()=>setCrmPal(!crmPal)} style={{padding:'3px 10px',borderRadius:crmRd,border:'1px solid '+(crmPal?crmAcc:'#e5e0d8'),background:crmPal?crmAcc+'12':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:3,fontSize:'0.7rem',fontWeight:600,color:crmPal?crmAcc:$textMut,fontFamily:'inherit',flexShrink:0}}>{String.fromCodePoint(0x1F3A8)}</button>
            <button onClick={handleLogout} style={{background:'transparent', color:$textMut, border:'1px solid #e5e0d8', padding:'3px 10px', borderRadius:crmRd, fontSize:'0.7rem', fontWeight:600, cursor:'pointer', flexShrink:0}}>Déconnexion</button>
          </div>
          </div>
        </div>

        {/* ══ FULL HEADER — scrolls away naturally ══ */}
        <div style={{paddingTop:4, marginBottom:0, display:crmLayout==='sidebar'?'none':undefined}}>

        {/* Header */}
        <div style={{borderRadius:crmRd, boxShadow:'0 2px 16px rgba(139,111,71,0.07)', marginBottom:10, border:`1px solid ${$border}`, position:'relative', background:$bgCard, padding:'20px 24px', display:'flex', alignItems:'center', gap:16, cursor:'default'}}>
          <div style={{flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{transform:'scale(1)', transformOrigin:'center center'}}><BeeAnimated /></div>
          </div>
          <div className="wave-trigger" style={{flex:1, textAlign:'center', display:'flex', alignItems:'baseline', justifyContent:'center', gap:10}}>
            <div style={{ fontSize:'clamp(1.15rem, 2.6vw, 1.9rem)', fontWeight:600, letterSpacing:'0.01em', color:crmAcc, cursor:'default', display:'inline-block', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'100%' }}>{ greetingLine1 || 'Bonjour !'}</div>
            {greetingLine2 && <span style={{fontSize:'2.4rem', fontWeight:800, letterSpacing:'-0.02em', color:crmAcc}}>{' '}{greetingLine2}</span>}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
            <div style={{position:'relative'}}>
              <button onClick={()=>setCrmPal(!crmPal)} style={{padding:'7px 14px',borderRadius:crmRd,border:'1px solid '+(crmPal?crmAcc:'#e5e0d8'),background:crmPal?crmAcc+'12':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontSize:'0.82rem',fontWeight:600,color:crmPal?crmAcc:'#b0a08a',fontFamily:'inherit'}}>{String.fromCodePoint(0x1F3A8)} Thème</button>
              {crmPal&&crmLayout==='cartes'&&!headerCompact&&<><div onClick={()=>setCrmPal(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:52,right:20,width:320,maxHeight:'80vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>{String.fromCodePoint(0x1F3A8)} Apparence</span><button onClick={()=>setCrmPal(false)} style={{background:'none',border:'none',color:$textMut,cursor:'pointer',fontSize:'1.2rem'}}>{String.fromCodePoint(0x2715)}</button></div>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Thème</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_THEMES).map(([id,th])=>(<button key={id} onClick={()=>setCrmTheme(id)} style={{padding:'10px 14px',borderRadius:crmRd,border:'1px solid '+(crmTheme===id?crmAcc:'#e8e4de'),background:crmTheme===id?crmAcc+'12':'transparent',color:crmTheme===id?$text:'#b0a08a',fontWeight:crmTheme===id?600:400,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit',textAlign:'left',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><span style={{fontSize:'0.95rem'}}>{th.name.split(' ')[0]}</span><span>{th.name.split(' ').slice(1).join(' ')}</span></button>))}</div></div>
                  {!crmTh.isDark&&<div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Couleur de fond {crmTint&&<span style={{fontSize:'0.65rem',fontWeight:400,color:crmAcc}}>{String.fromCodePoint(0x2014)} {CRM_TINTS[crmTint]?.n}</span>}</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5}}>{Object.entries(CRM_TINTS).map(([id,tn])=>(<button key={id} onClick={()=>setCrmTint(crmTint===id?null:id)} style={{padding:'6px 4px',borderRadius:crmRd,border:'2px solid '+(crmTint===id?crmAcc:'#e8e4de'),background:crmTint===id?crmAcc+'12':'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,boxShadow:crmTint===id?'0 0 0 1px '+crmAcc:'none',transition:'all 0.15s'}}><div style={{width:18,height:18,borderRadius:'50%',background:tn.c,border:'1px solid #e8e4de'}}/><span style={{fontSize:'0.6rem',color:crmTint===id?$text:'#b0a08a',fontWeight:crmTint===id?600:400}}>{tn.n}</span></button>))}</div><div style={{marginTop:8,opacity:crmTint?1:0.35,pointerEvents:crmTint?'auto':'none'}}><div style={{fontSize:'0.65rem',color:'#b0a08a',marginBottom:4}}>Intensité du fond</div><div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:'1px solid #e8e4de',width:'fit-content'}}>{[{i:0,l:'Léger'},{i:1,l:'Moyen'},{i:2,l:'Fort'}].map(lv=><button key={lv.i} onClick={()=>setCrmTintLvl(lv.i)} style={{padding:'4px 12px',borderRadius:Math.max((crmRd)-2,0),border:'none',cursor:'pointer',background:crmTintLvl===lv.i?crmAcc:'transparent',color:crmTintLvl===lv.i?'#fff':'#b0a08a',fontWeight:crmTintLvl===lv.i?600:400,fontSize:'0.72rem',fontFamily:'inherit',transition:'all 0.15s'}}>{lv.l}</button>)}</div></div></div>}
                  <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Arrondi des bords</div><div style={{display:'flex',gap:4}}>{CRM_RAD.map(opt=>(<button key={opt.id} onClick={()=>setCrmRadius(opt.id)} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmRadius===opt.id?crmAcc:'#e8e4de'),background:crmRadius===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><div style={{width:28,height:20,borderRadius:opt.v+'px',border:'2px solid '+(crmRadius===opt.id?crmAcc:'#b0a08a'),transition:'all 0.15s'}}/><span style={{fontSize:'0.72rem',fontWeight:crmRadius===opt.id?600:400,color:crmRadius===opt.id?'#2d2216':'#b0a08a'}}>{opt.l}</span><span style={{fontSize:'0.58rem',color:'#b0a08a'}}>{opt.d}</span><span style={{fontSize:'0.55rem',color:crmRadius===opt.id?crmAcc:'#c4bfb6',fontWeight:500}}>{opt.s}</span></button>))}</div></div>
                  <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Navigation</div><div style={{display:'flex',gap:4}}>{[{id:'cartes',label:'Cartes',sub:'Par cartes',icon:'☰'},{id:'sidebar',label:'Sidebar',sub:'Panneau latéral',icon:'◫'}].map(opt=>(<button key={opt.id} onClick={()=>{setCrmLayout(opt.id);if(opt.id==='sidebar'&&!navEntreprise){setNavEntreprise('groupoy');setOngletActif('dashboard');}}} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmLayout===opt.id?crmAcc:'#e8e4de'),background:crmLayout===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><span style={{fontSize:'1rem'}}>{opt.icon}</span><span style={{fontSize:'0.72rem',fontWeight:crmLayout===opt.id?600:400,color:crmLayout===opt.id?$text:'#b0a08a'}}>{opt.label}</span><span style={{fontSize:'0.58rem',color:$textMut}}>{opt.sub}</span></button>))}</div></div><div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Affichage navigation</div><div style={{display:'flex',flexDirection:'column',gap:6}}>{[{label:'Filiales nav',keep:navKeepFil,set:setNavKeepFil},{label:'Services',keep:navKeepCards,set:setNavKeepCards}].map(row=>(<div key={row.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}><span style={{fontSize:'0.68rem',color:'#b0a08a',flex:1}}>{row.label}</span><div style={{display:'flex',gap:2}}>{[{id:false,l:'Auto'},{id:true,l:'Fixe'}].map(opt=>(<button key={String(opt.id)} onClick={()=>row.set(opt.id)} style={{padding:'3px 10px',borderRadius:Math.max(crmRd-2,0),border:'1px solid '+(row.keep===opt.id?crmAcc:'#e8e4de'),background:row.keep===opt.id?crmAcc+'18':'transparent',color:row.keep===opt.id?crmAcc:'#b0a08a',fontSize:'0.65rem',fontWeight:row.keep===opt.id?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s'}}>{opt.l}</button>))}</div></div>))}</div></div><div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:4}}>Taille des cartes</div>
                  {[
                    {label:'Filiales (nav)',state:filCardSize,setter:'fil'},
                    {label:'Services',     state:svcCardSize,setter:'svc'},
                    {label:'Modules',      state:modCardSize,setter:'mod',hasXS:true},
                    {label:'Présentation groupe',state:homFilCardSize,setter:'hom'},
                  ].map(row=>(
                    <div key={row.setter} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                      <span style={{fontSize:'0.68rem',color:'#b0a08a',flex:1,whiteSpace:'nowrap'}}>{row.label}</span>
                      <div style={{display:'flex',gap:2}}>
                        {(row.hasXS ? [{id:'lg',l:'L'},{id:'md',l:'M'},{id:'sm',l:'S'},{id:'xs',l:'XS'}] : [{id:'lg',l:'L'},{id:'md',l:'M'},{id:'sm',l:'S'}]).map(opt=>(
                          <button key={opt.id}
                            onClick={()=>{
                              if(row.setter==='fil') setFilCardSize(opt.id);
                              else if(row.setter==='svc') setSvcCardSize(opt.id);
                              else if(row.setter==='mod') setModCardSize(opt.id);
                              else setHomFilCardSize(opt.id);
                            }}
                            style={{width:26,height:22,borderRadius:Math.max(crmRd-2,0),border:'1px solid '+(row.state===opt.id?crmAcc:'#e8e4de'),background:row.state===opt.id?crmAcc+'18':'transparent',color:row.state===opt.id?crmAcc:'#b0a08a',fontSize:'0.65rem',fontWeight:row.state===opt.id?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s'}}
                          >{opt.l}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                  <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Accent filiale</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_FIL_ACC).map(([id,color])=>{const isA=navEntreprise===id||(!navEntreprise&&id==='groupoy');return(<div key={id} style={{padding:'8px 12px',borderRadius:crmRd,border:'1px solid '+(isA?color:'#e8e4de'),background:isA?color+'12':'transparent',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><div style={{width:16,height:16,borderRadius:'50%',background:color,flexShrink:0}}/><span style={{fontSize:'0.78rem',fontWeight:isA?600:400,color:isA?$text:'#b0a08a'}}>{CRM_FIL_ICONS[id]} {CRM_FIL_NAMES[id]}</span>{isA&&<span style={{marginLeft:'auto',fontSize:'0.6rem',color:color,fontWeight:700}}>actif</span>}</div>);})}</div></div>
                </div>
              </div></>}
            </div>
            <button onClick={handleLogout} style={{background:'transparent', color:$textMut, border:'1px solid #e5e0d8', padding:'7px 18px', borderRadius:crmRd, fontSize:'0.82rem', fontWeight:600, cursor:'pointer', flexShrink:0}}>Déconnexion</button>
          </div>
          {showChangePassword && (
            <div style={{position:'absolute', right:40, top:80, background:$bgCard, borderRadius:crmRd, padding:20, boxShadow:'0 10px 40px rgba(0,0,0,0.2)', zIndex:100, width:280}} onClick={e => e.stopPropagation()}>
              <h4 style={{margin:'0 0 12px', color:$accent, fontSize:'0.9rem'}}>🔒 Changer le mot de passe</h4>
              <input type="password" placeholder="Ancien mot de passe" value={passwordForm.ancien} onChange={e => setPasswordForm({...passwordForm, ancien: e.target.value})} style={{width:'100%', padding:'6px 10px', border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:8, fontSize:'0.9rem', boxSizing:'border-box'}} />
              <input type="password" placeholder="Nouveau mot de passe" value={passwordForm.nouveau} onChange={e => setPasswordForm({...passwordForm, nouveau: e.target.value})} style={{width:'100%', padding:'6px 10px', border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:8, fontSize:'0.9rem', boxSizing:'border-box'}} />
              <input type="password" placeholder="Confirmer" value={passwordForm.confirmation} onChange={e => setPasswordForm({...passwordForm, confirmation: e.target.value})} onKeyDown={e => e.key==='Enter' && handleChangePassword()} style={{width:'100%', padding:'6px 10px', border:`1px solid ${$border}`, borderRadius:crmRd, marginBottom:8, fontSize:'0.9rem', boxSizing:'border-box'}} />
              {passwordMsg && <div style={{fontSize:'0.85rem', marginBottom:8, color: passwordMsg.startsWith('✅') ? '#16a34a' : '#dc2626'}}>{passwordMsg}</div>}
              <div style={{display:'flex', gap:6}}>
                <button onClick={handleChangePassword} style={{flex:1, padding:'6px', background:$accent, color:'white', border:'none', borderRadius:crmRd, fontSize:'0.9rem', cursor:'pointer', fontWeight:600}}>Valider</button>
                <button onClick={() => { setShowChangePassword(false); setPasswordMsg(''); }} style={{padding:'6px 12px', background:'#eee', border:'none', borderRadius:crmRd, fontSize:'0.9rem', cursor:'pointer'}}>✕</button>
              </div>
            </div>
          )}
        </div>{/* end header bar */}
        {/* Theme dropdown from compact bar — fixed position */}
        {crmPal && crmLayout==='cartes' && headerCompact && <div onClick={()=>setCrmPal(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'transparent',zIndex:99999}}>
          <div onClick={e=>e.stopPropagation()} style={{position:'fixed',top:52,right:20,width:320,background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:99999,maxHeight:'80vh',overflow:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>{String.fromCodePoint(0x1F3A8)} Apparence</span><button onClick={()=>setCrmPal(false)} style={{background:'none',border:'none',color:$textMut,cursor:'pointer',fontSize:'1.2rem'}}>{String.fromCodePoint(0x2715)}</button></div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Thème</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_THEMES).map(([id,th])=>(<button key={id} onClick={()=>setCrmTheme(id)} style={{padding:'10px 14px',borderRadius:crmRd,border:'1px solid '+(crmTheme===id?crmAcc:'#e8e4de'),background:crmTheme===id?crmAcc+'12':'transparent',color:crmTheme===id?$text:'#b0a08a',fontWeight:crmTheme===id?600:400,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit',textAlign:'left',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><span style={{fontSize:'0.95rem'}}>{th.name.split(' ')[0]}</span><span>{th.name.split(' ').slice(1).join(' ')}</span></button>))}</div></div>
              {!crmTh.isDark&&<div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Couleur de fond {crmTint&&<span style={{fontSize:'0.65rem',fontWeight:400,color:crmAcc}}>{String.fromCodePoint(0x2014)} {CRM_TINTS[crmTint]?.n}</span>}</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5}}>{Object.entries(CRM_TINTS).map(([id,tn])=>(<button key={id} onClick={()=>setCrmTint(crmTint===id?null:id)} style={{padding:'6px 4px',borderRadius:crmRd,border:'2px solid '+(crmTint===id?crmAcc:'#e8e4de'),background:crmTint===id?crmAcc+'12':'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,boxShadow:crmTint===id?'0 0 0 1px '+crmAcc:'none',transition:'all 0.15s'}}><div style={{width:18,height:18,borderRadius:'50%',background:tn.c,border:'1px solid #e8e4de'}}/><span style={{fontSize:'0.6rem',color:crmTint===id?$text:'#b0a08a',fontWeight:crmTint===id?600:400}}>{tn.n}</span></button>))}</div><div style={{marginTop:8,opacity:crmTint?1:0.35,pointerEvents:crmTint?'auto':'none'}}><div style={{fontSize:'0.65rem',color:'#b0a08a',marginBottom:4}}>Intensité du fond</div><div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:'1px solid #e8e4de',width:'fit-content'}}>{[{i:0,l:'Léger'},{i:1,l:'Moyen'},{i:2,l:'Fort'}].map(lv=><button key={lv.i} onClick={()=>setCrmTintLvl(lv.i)} style={{padding:'4px 12px',borderRadius:Math.max((crmRd)-2,0),border:'none',cursor:'pointer',background:crmTintLvl===lv.i?crmAcc:'transparent',color:crmTintLvl===lv.i?'#fff':'#b0a08a',fontWeight:crmTintLvl===lv.i?600:400,fontSize:'0.72rem',fontFamily:'inherit',transition:'all 0.15s'}}>{lv.l}</button>)}</div></div></div>}
              <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Arrondi des bords</div><div style={{display:'flex',gap:4}}>{CRM_RAD.map(opt=>(<button key={opt.id} onClick={()=>setCrmRadius(opt.id)} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmRadius===opt.id?crmAcc:'#e8e4de'),background:crmRadius===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><div style={{width:28,height:20,borderRadius:opt.v+'px',border:'2px solid '+(crmRadius===opt.id?crmAcc:'#b0a08a'),transition:'all 0.15s'}}/><span style={{fontSize:'0.72rem',fontWeight:crmRadius===opt.id?600:400,color:crmRadius===opt.id?'#2d2216':'#b0a08a'}}>{opt.l}</span><span style={{fontSize:'0.58rem',color:'#b0a08a'}}>{opt.d}</span><span style={{fontSize:'0.55rem',color:crmRadius===opt.id?crmAcc:'#c4bfb6',fontWeight:500}}>{opt.s}</span></button>))}</div></div>
              <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Navigation</div><div style={{display:'flex',gap:4}}>{[{id:'cartes',l:'Cartes',sub:'Par cartes',icon:'☰'},{id:'sidebar',l:'Sidebar',sub:'Panneau latéral',icon:'◫'}].map(opt=>(<button key={opt.id} onClick={()=>{setCrmLayout(opt.id);if(opt.id==='sidebar'&&!navEntreprise){setNavEntreprise('groupoy');setOngletActif('dashboard');}}} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmLayout===opt.id?crmAcc:'#e8e4de'),background:crmLayout===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><span style={{fontSize:'1rem'}}>{opt.icon}</span><span style={{fontSize:'0.72rem',fontWeight:crmLayout===opt.id?600:400,color:crmLayout===opt.id?$text:'#b0a08a'}}>{opt.l}</span><span style={{fontSize:'0.58rem',color:$textMut}}>{opt.sub}</span></button>))}</div></div><div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Affichage navigation</div><div style={{display:'flex',flexDirection:'column',gap:6}}>{[{label:'Filiales nav',keep:navKeepFil,set:setNavKeepFil},{label:'Services',keep:navKeepCards,set:setNavKeepCards}].map(row=>(<div key={row.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}><span style={{fontSize:'0.68rem',color:'#b0a08a',flex:1}}>{row.label}</span><div style={{display:'flex',gap:2}}>{[{id:false,l:'Auto'},{id:true,l:'Fixe'}].map(opt=>(<button key={String(opt.id)} onClick={()=>row.set(opt.id)} style={{padding:'3px 10px',borderRadius:Math.max(crmRd-2,0),border:'1px solid '+(row.keep===opt.id?crmAcc:'#e8e4de'),background:row.keep===opt.id?crmAcc+'18':'transparent',color:row.keep===opt.id?crmAcc:'#b0a08a',fontSize:'0.65rem',fontWeight:row.keep===opt.id?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s'}}>{opt.l}</button>))}</div></div>))}</div></div><div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:4}}>Taille des cartes</div>
                  {[
                    {label:'Filiales (nav)',state:filCardSize,setter:'fil'},
                    {label:'Services',     state:svcCardSize,setter:'svc'},
                    {label:'Modules',      state:modCardSize,setter:'mod'},
                    {label:'Présentation groupe',state:homFilCardSize,setter:'hom'},
                  ].map(row=>(
                    <div key={row.setter} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                      <span style={{fontSize:'0.68rem',color:'#b0a08a',flex:1,whiteSpace:'nowrap'}}>{row.label}</span>
                      <div style={{display:'flex',gap:2}}>
                        {(row.hasXS ? [{id:'lg',l:'L'},{id:'md',l:'M'},{id:'sm',l:'S'},{id:'xs',l:'XS'}] : [{id:'lg',l:'L'},{id:'md',l:'M'},{id:'sm',l:'S'}]).map(opt=>(
                          <button key={opt.id}
                            onClick={()=>{
                              if(row.setter==='fil') setFilCardSize(opt.id);
                              else if(row.setter==='svc') setSvcCardSize(opt.id);
                              else if(row.setter==='mod') setModCardSize(opt.id);
                              else setHomFilCardSize(opt.id);
                            }}
                            style={{width:26,height:22,borderRadius:Math.max(crmRd-2,0),border:'1px solid '+(row.state===opt.id?crmAcc:'#e8e4de'),background:row.state===opt.id?crmAcc+'18':'transparent',color:row.state===opt.id?crmAcc:'#b0a08a',fontSize:'0.65rem',fontWeight:row.state===opt.id?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s'}}
                          >{opt.l}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Accent filiale</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_FIL_ACC).map(([id,color])=>{const isA=navEntreprise===id||(!navEntreprise&&id==='groupoy');return(<div key={id} style={{padding:'8px 12px',borderRadius:crmRd,border:'1px solid '+(isA?color:'#e8e4de'),background:isA?color+'12':'transparent',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><div style={{width:16,height:16,borderRadius:'50%',background:color,flexShrink:0}}/><span style={{fontSize:'0.78rem',fontWeight:isA?600:400,color:isA?$text:'#b0a08a'}}>{CRM_FIL_ICONS[id]} {CRM_FIL_NAMES[id]}</span>{isA&&<span style={{marginLeft:'auto',fontSize:'0.6rem',color:color,fontWeight:700}}>actif</span>}</div>);})}</div></div>
            </div>
          </div>
        </div>}

        {/* ====== BANDEAU NAVIGATION ENTREPRISE > SERVICE ====== */}
        <div style={{background:$bgSub, borderRadius:crmRd, padding: navService?'8px 14px':'10px 16px', marginBottom:4, boxShadow:$shadow, border:`1px solid ${$border}`, overflow:'hidden', display:crmLayout==='sidebar'?'none':undefined}}>

          {/* ====== CARTES ENTREPRISES — style image ====== */}
          {(!navService || navKeepFil) && (
            <div ref={cardsScrollRef}
              onMouseDown={(e) => {
                setIsScrollDragging(true);
                scrollStartRef.current = { x: e.pageX, scrollLeft: cardsScrollRef.current.scrollLeft };
              }}
              onMouseMove={(e) => {
                if (!isScrollDragging) return;
                e.preventDefault();
                const dx = e.pageX - scrollStartRef.current.x;
                cardsScrollRef.current.scrollLeft = scrollStartRef.current.scrollLeft - dx;
              }}
              onMouseUp={() => setIsScrollDragging(false)}
              onMouseLeave={() => setIsScrollDragging(false)}
              style={{display:'flex', gap:'1rem', overflowX:'auto', padding:'0.75rem 0.5rem', cursor: isScrollDragging ? 'grabbing' : 'grab', WebkitOverflowScrolling:'touch', scrollbarWidth:'thin', scrollbarColor:$border+' transparent', width:'fit-content', maxWidth:'100%', margin:'0 auto'}}>
              {ordreEntreprises.map((key) => {
                const cfg = SERVICES_CONFIG[key];
                if (!cfg) return null;
                const isActive = navEntreprise === key;
                const gradients = {
                  groupoy: 'linear-gradient(135deg, #cbb994 0%, #8B6F47 100%)',
                  yilmaz: 'linear-gradient(135deg, #b3ada2 0%, #47433c 100%)',
                  ezel: 'linear-gradient(135deg, #9db4c4 0%, #3d5a6e 100%)',
                  roulotte: 'linear-gradient(135deg, #e3d2a9 0%, #a98a45 100%)',
                  echafaudage: 'linear-gradient(135deg, #b5a6b8 0%, #5d4f63 100%)',
                  etancheite: 'linear-gradient(135deg, #a9c2b2 0%, #3f6053 100%)'
                };
                const iconBg = { groupoy: '#8B6F47', yilmaz: '#2d2d2d', ezel: '#007ab5', roulotte: '#C49A2A', echafaudage: '#6C3483', etancheite: '#0e6655' };
                const iconEmoji = { groupoy: 'OY', yilmaz: 'Y', ezel: 'E', roulotte: 'R', echafaudage: 'L', etancheite: 'É' };
                const descs = {
                  groupoy: 'Vue consolidée du groupe\net pilotage stratégique',
                  yilmaz: 'Services partagés : Finance,\nRH, IT et Marketing',
                  ezel: 'Gestion complète des appels\nd\'offres et suivi des chantiers BTP',
                  roulotte: 'Gestion de l\'activité location\nmobile et planification',
                  echafaudage: 'Gestion location d\'échafaudage\net suivi du matériel',
                  etancheite: 'Travaux d\'étanchéité\net imperméabilisation'
                };

                {/* ── FULL : image cards ── */}
                return (
                  <div key={key}
                    onDragOver={isSuperAdmin() ? (e) => { e.preventDefault(); } : undefined}
                    onDrop={isSuperAdmin() ? (e) => {
                      e.preventDefault();
                      const fromKey = e.dataTransfer.getData('entrepriseKey');
                      if (!fromKey || fromKey === key) { setDragFilKey(null); return; }
                      setOrdreEntreprises(prev => {
                        const arr = [...prev];
                        const fromIdx = arr.indexOf(fromKey);
                        const toIdx = arr.indexOf(key);
                        if (fromIdx < 0 || toIdx < 0) return arr;
                        arr.splice(fromIdx, 1);
                        arr.splice(toIdx, 0, fromKey);
                        return arr;
                      });
                      setDragFilKey(null);
                    } : undefined}
                    onClick={() => {
                      if (navEntreprise === key) { navigateToGroupe(); }
                      else {
                        const filialeMap = {
                          'groupoy': null, 'yilmaz': 'yilmaz',
                          'ezel': filialesEnrichies.find(f => f.nom === 'Ezel Bâtiment')?.id || 3,
                          'roulotte': filialesEnrichies.find(f => f.nom === 'La Roulotte')?.id || 1,
                          'echafaudage': filialesEnrichies.find(f => f.nom === "L'Échafaudage")?.id || 2,
                          'etancheite': filialesEnrichies.find(f => f.nom === "L'Étanchéité")?.id || 6
                        };
                        navigateToEntreprise(key, filialeMap);
                      }
                    }}
                    style={{
                      borderRadius:crmRd, overflow:'hidden', cursor:'pointer',
                      minWidth: filCardSize==='sm'?'160px':filCardSize==='md'?'190px':'220px', maxWidth: filCardSize==='sm'?'220px':filCardSize==='md'?'250px':'280px', flexShrink:0,
                      border: isActive ? `2px solid ${iconBg[key]}` : `1px solid ${$border}`,
                      background: $bgCard,
                      boxShadow: isActive ? `0 8px 24px ${iconBg[key]}30` : $shadow,
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                      transform: dragFilKey===key ? 'scale(0.95)' : isActive ? 'translateY(-4px)' : 'translateY(0)',
                      opacity: dragFilKey===key ? 0.4 : navEntreprise && !isActive ? 0.45 : 1,
                      outline: dragFilKey && dragFilKey!==key ? '2px dashed #8B6F47' : 'none',
                      outlineOffset: 3,
                    }}
                    onMouseOver={e => { if (!isActive) { e.currentTarget.style.boxShadow=$shadowLg; e.currentTarget.style.transform='translateY(-2px)'; }}}
                    onMouseOut={e => { if (!isActive) { e.currentTarget.style.boxShadow=$shadow; e.currentTarget.style.transform='translateY(0)'; }}}
                  >
                    <div style={{height: filCardSize==='sm'?72:filCardSize==='md'?96:120, background: gradients[key], position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      {key === 'etancheite' && (
                        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'0.65rem', fontWeight:700, color:'white', letterSpacing:'0.04em', background:'rgba(0,0,0,0.28)', padding:'3px 10px', borderRadius:crmRd, backdropFilter:'blur(2px)', whiteSpace:'nowrap'}}>À Venir</div>
                      )}
                      {isActive && (
                        <div style={{position:'absolute', top:12, right:12, background:'white', borderRadius:'50%', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center'}}>
                          <span style={{fontSize:'0.95rem', fontWeight:900, color:$accent}}>✓</span>
                        </div>
                      )}
                      {isSuperAdmin() && !navEntreprise && (
                        <div
                          draggable
                          onDragStart={(e) => { e.dataTransfer.setData('entrepriseKey', key); setDragFilKey(key); }}
                          onDragEnd={() => setDragFilKey(null)}
                          onClick={(e) => e.stopPropagation()}
                          style={{position:'absolute', top:10, left:10, background:'rgba(0,0,0,0.3)', borderRadius:crmRd, padding:'4px 8px', fontSize:'0.75rem', color:'white', fontWeight:600, cursor:'grab', display:'flex', alignItems:'center', gap:4, transition:'all 0.2s'}}
                          onMouseEnter={e=>{e.currentTarget.querySelector('.dep-lbl').style.maxWidth='70px';e.currentTarget.querySelector('.dep-lbl').style.opacity='1';}}
                          onMouseLeave={e=>{e.currentTarget.querySelector('.dep-lbl').style.maxWidth='0';e.currentTarget.querySelector('.dep-lbl').style.opacity='0';}}>
                          <span>⠿</span><span className="dep-lbl" style={{maxWidth:0,opacity:0,overflow:'hidden',whiteSpace:'nowrap',transition:'all 0.2s'}}>Déplacer</span></div>
                      )}
                                    </div>

                    <div style={{margin: filCardSize==='sm'?'-14px 0 0 12px':filCardSize==='md'?'-18px 0 0 16px':'-24px 0 0 20px', position:'relative', zIndex:2}}>
                      <div style={{
                        width: filCardSize==='sm'?28:filCardSize==='md'?38:48,
                        height: filCardSize==='sm'?28:filCardSize==='md'?38:48,
                        borderRadius:crmRd,
                        background: iconBg[key],
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize: filCardSize==='sm'?'0.85rem':filCardSize==='md'?'1.1rem':'1.4rem',
                        boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
                        border:'2px solid '+$bgCard
                      }}>
                        {iconEmoji[key]}
                      </div>
                    </div>

                    <div style={{padding: filCardSize==='sm'?'0.3rem 0.7rem 0.7rem':filCardSize==='md'?'0.45rem 1rem 1rem':'0.6rem 1.25rem 1.25rem'}}>
                      <div style={{fontSize: filCardSize==='sm'?'0.78rem':filCardSize==='md'?'0.92rem':'1.1rem', fontWeight:700, color: isActive ? $text : navEntreprise ? $textMut : $text, marginBottom: filCardSize==='sm'?'0.1rem':'0.3rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{cfg.nom}</div>
                      {filCardSize !== 'sm' && key !== 'etancheite' && <div style={{fontSize: filCardSize==='md'?'0.72rem':'0.9rem', color: isActive ? $textSec : navEntreprise ? $textMut : $textSec, lineHeight:1.4, whiteSpace:'pre-line', overflow:'hidden', maxHeight: filCardSize==='md'?'2.8em':'3em', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>{descs[key]}</div>}
                      {filCardSize !== 'sm' && key === 'etancheite' && <div style={{fontSize: filCardSize==='md'?'0.72rem':'0.9rem', color: $textMut, lineHeight:1.4, whiteSpace:'pre-line', overflow:'hidden', maxHeight: filCardSize==='md'?'2.8em':'3em', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>{descs[key]}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ====== CARTES SERVICES — quand entreprise sélectionnée ====== */}
          {navEntreprise && SERVICES_CONFIG[navEntreprise] && (!navService || navKeepCards) && (() => {
            const svcColors = {
              groupoy: { main: '#8B6F47', light: '#c9b896', gradient: 'linear-gradient(90deg, #8B6F47, #c9b896)' },
              yilmaz: { main: '#2d2d2d', light: '#b0b0b0', gradient: 'linear-gradient(90deg, #2d2d2d, #b0b0b0)' },
              ezel: { main: '#007ab5', light: '#85C1E9', gradient: 'linear-gradient(90deg, #007ab5, #85C1E9)' },
              roulotte: { main: '#C49A2A', light: '#F5D78E', gradient: 'linear-gradient(90deg, #C49A2A, #F5D78E)' },
              echafaudage: { main: '#6C3483', light: '#C39BD3', gradient: 'linear-gradient(90deg, #6C3483, #C39BD3)' },
              etancheite: { main: '#0e6655', light: '#82E0AA', gradient: 'linear-gradient(90deg, #0e6655, #82E0AA)' }
            };
            const col = svcColors[navEntreprise] || svcColors.groupoy;
            return (
            <div style={{marginTop: svcCardSize==='sm'?'0.5rem':'0.75rem'}}>
              <div style={{fontSize:'0.78rem', fontWeight:700, color: col.main, marginBottom: svcCardSize==='sm'?'0.35rem':'0.5rem', display:'flex', alignItems:'center', gap:'0.3rem'}}>
                <span style={{fontSize:'0.85rem'}}>📂</span> Services de {SERVICES_CONFIG[navEntreprise].nom}
                {navEntreprise === 'yilmaz' && isSuperAdmin() && (
                  <span onClick={(e) => { e.stopPropagation(); setShowServicesPanel(p => !p); }} style={{marginLeft:'auto', cursor:'pointer', fontSize:'0.82rem', color:$textMut, display:'flex', alignItems:'center', gap:4, padding:'2px 8px', borderRadius:crmRd, background: showServicesPanel ? $bgSub : 'transparent', transition:'background 0.2s'}}>
                    ⚙️ <span style={{fontSize:'0.7rem', color:'#d4d0c8'}}>{SERVICES_CONFIG.yilmaz.services.filter(s => !hiddenServicesYilmaz.includes(s.id)).length}/{SERVICES_CONFIG.yilmaz.services.length}</span>
                  </span>
                )}
              </div>
              {navEntreprise === 'yilmaz' && isSuperAdmin() && showServicesPanel && (
                <div style={{background:$bgSub, borderRadius:crmRd, padding:'10px 0', marginBottom:'0.75rem', border:`1px solid ${$border}`}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 70px 80px', gap:0, padding:'0 16px 6px', borderBottom:`1px solid ${$borderAlt}`}}>
                    <span style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase'}}>Service</span>
                    <span style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', textAlign:'center'}}>Visible</span>
                    <span style={{fontSize:'0.72rem', fontWeight:700, color:$textMut, textTransform:'uppercase', textAlign:'right'}}>Statut</span>
                  </div>
                  {SERVICES_CONFIG.yilmaz.services.map(svc => (
                    <div key={svc.id} style={{display:'grid', gridTemplateColumns:'1fr 70px 80px', gap:0, alignItems:'center', padding:'7px 16px', borderBottom:`1px solid ${$border}`}}>
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <span style={{fontSize:'0.9rem'}}>{svc.icon}</span>
                        <span style={{fontSize:'0.88rem', fontWeight:600, color: hiddenServicesYilmaz.includes(svc.id) ? $textMut : $text}}>{svc.label}</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'center'}}>
                        <div role="button" tabIndex={0} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); const sid = svc.id; setHiddenServicesYilmaz(prev => prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]); }}
                          style={{width:40, height:22, borderRadius:crmRd, background: hiddenServicesYilmaz.includes(svc.id) ? '#e5e7eb' : '#059669', cursor:'pointer', position:'relative', transition:'background 0.2s', userSelect:'none'}}>
                          <div style={{width:16, height:16, borderRadius:crmRd, background:$bgCard, position:'absolute', top:3, left: hiddenServicesYilmaz.includes(svc.id) ? 3 : 21, transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)', pointerEvents:'none'}} />
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        {svc.hidden && hiddenServicesYilmaz.includes(svc.id) && <span style={{fontSize:'0.65rem', fontWeight:700, background:'#d97706', color:'white', padding:'1px 6px', borderRadius:crmRd}}>BIENTÔT</span>}
                        {!svc.hidden && hiddenServicesYilmaz.includes(svc.id) && <span style={{fontSize:'0.7rem', color:'#9ca3af', fontWeight:600}}>🔒 Masqué</span>}
                        {!hiddenServicesYilmaz.includes(svc.id) && <span style={{fontSize:'0.7rem', color:'#059669', fontWeight:600}}>✅ Affiché</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{display:'grid', gridTemplateColumns:`repeat(auto-fill, minmax(${svcCardSize==='sm'?'110px':svcCardSize==='md'?'130px':'150px'}, 1fr))`, gap: svcCardSize==='sm'?'0.35rem':'0.5rem'}}>
                {getOrderedServices(navEntreprise).map(svc => {
                  const isActiveSvcCard = navService === svc.id;
                  return (
                  <div key={svc.id}
                    draggable={isSuperAdmin()}
                    onDragStart={isSuperAdmin() ? (e) => { e.dataTransfer.setData('serviceKey', svc.id); e.currentTarget.style.opacity = '0.4'; } : undefined}
                    onDragEnd={isSuperAdmin() ? (e) => { e.currentTarget.style.opacity = ''; } : undefined}
                    onDragOver={isSuperAdmin() ? (e) => { e.preventDefault(); e.currentTarget.style.outline = `2px dashed ${col.main}`; e.currentTarget.style.outlineOffset = '3px'; } : undefined}
                    onDragLeave={isSuperAdmin() ? (e) => { e.currentTarget.style.outline = ''; e.currentTarget.style.outlineOffset = ''; } : undefined}
                    onDrop={isSuperAdmin() ? (e) => {
                      e.preventDefault();
                      e.currentTarget.style.outline = '';
                      e.currentTarget.style.outlineOffset = '';
                      const fromId = e.dataTransfer.getData('serviceKey');
                      if (fromId === svc.id || !fromId) return;
                      setOrdreServices(prev => {
                        const arr = [...(prev[navEntreprise] || SERVICES_CONFIG[navEntreprise].services.map(s => s.id))];
                        const fromIdx = arr.indexOf(fromId);
                        const toIdx = arr.indexOf(svc.id);
                        if (fromIdx < 0 || toIdx < 0) return prev;
                        arr.splice(fromIdx, 1);
                        arr.splice(toIdx, 0, fromId);
                        return {...prev, [navEntreprise]: arr};
                      });
                    } : undefined}
                    onClick={() => {
                      navigateToService(svc.id);
                      const firstMod = svc.modules[0];
                      if (firstMod && canView(firstMod)) setOngletActif(firstMod);
                      const filialeMap = {
                        'groupoy': null,
                        'yilmaz': 'yilmaz',
                        'ezel': filialesEnrichies.find(f => f.nom === 'Ezel Bâtiment')?.id || 3,
                        'roulotte': filialesEnrichies.find(f => f.nom === 'La Roulotte')?.id || 1,
                        'echafaudage': filialesEnrichies.find(f => f.nom === "L'Échafaudage")?.id || 2,
                        'etancheite': filialesEnrichies.find(f => f.nom === "L'Étanchéité")?.id || 6
                      };
                      if (navEntreprise in filialeMap) setDashboardFiliale(filialeMap[navEntreprise]);
                    }}
                    style={{
                      borderRadius:crmRd, overflow:'hidden', cursor: isSuperAdmin() ? 'grab' : 'pointer',
                      border: isActiveSvcCard ? `2px solid ${col.main}` : `1.5px solid ${$border}`,
                      background: isActiveSvcCard ? `${col.main}10` : $bgCard,
                      transition:'all 0.25s ease',
                      boxShadow: isActiveSvcCard ? `0 4px 16px ${col.main}35` : $shadow,
                      transform: isActiveSvcCard ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                    onMouseOver={e => { if(!isActiveSvcCard){ e.currentTarget.style.borderColor=col.main; e.currentTarget.style.boxShadow=`0 6px 20px ${col.main}25`; e.currentTarget.style.transform='translateY(-3px)'; }}}
                    onMouseOut={e => { if(!isActiveSvcCard){ e.currentTarget.style.borderColor=$border; e.currentTarget.style.boxShadow=$shadow; e.currentTarget.style.transform='translateY(0)'; }}}
                  >
                    <div style={{height: svcCardSize==='sm'?'4px':svcCardSize==='md'?'5px':'6px', background: col.gradient, position:'relative'}}>
                      {isSuperAdmin() && <span style={{position:'absolute', right:6, top:-1, fontSize:'0.65rem', color:'rgba(255,255,255,0.8)', fontWeight:700}}>⠿</span>}
                    </div>
                    <div style={{padding: svcCardSize==='sm'?'0.45rem 0.55rem':svcCardSize==='md'?'0.55rem 0.7rem':'0.7rem 0.8rem'}}>
                      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:'0.25rem'}}>
                        <div style={{fontSize: svcCardSize==='sm'?'0.95rem':svcCardSize==='md'?'1.1rem':'1.3rem'}}>{svc.icon}</div>
                        {svc.hidden && <span style={{fontSize:'0.6rem', fontWeight:700, background:'#d97706', color:'white', padding:'1px 5px', borderRadius:crmRd}}>BIENTÔT</span>}
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:5}}>
                        <div style={{fontSize: svcCardSize==='sm'?'0.72rem':svcCardSize==='md'?'0.82rem':'0.92rem', fontWeight:700, color: isActiveSvcCard ? col.main : $text, marginBottom:'0.1rem', lineHeight:1.3, flex:1}}>{svc.label}</div>
                        {isActiveSvcCard && <div style={{width:6, height:6, borderRadius:'50%', background:col.main, boxShadow:`0 0 5px ${col.main}`, flexShrink:0, marginBottom:2}}/>}
                      </div>
                      <div style={{fontSize: svcCardSize==='sm'?'0.62rem':svcCardSize==='md'?'0.68rem':'0.75rem', color:$textMut}}>{svc.modules.length} module{svc.modules.length > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
            );
          })()}

          {/* Breadcrumb retour quand service sélectionné */}
          {navService && navEntreprise && !navKeepCards && (() => {
            const filAcc = CRM_FIL_ACC[navEntreprise] || crmAcc;
            const svcLabel = SERVICES_CONFIG[navEntreprise]?.services.find(s=>s.id===navService)?.label || navService;
            const svcIcon = SERVICES_CONFIG[navEntreprise]?.services.find(s=>s.id===navService)?.icon || '📁';
            return (
              <div style={{display:'flex', alignItems:'center', gap:0, marginBottom:'0.75rem', borderRadius:crmRd, overflow:'hidden', border:`1px solid ${filAcc}40`, background:$bgCard, boxShadow:`0 2px 8px ${filAcc}18`}}>
                <button onClick={() => navigateToGroupe()} style={{display:'flex', alignItems:'center', gap:6, padding:'8px 14px', background:'transparent', border:'none', cursor:'pointer', color:$textMut, fontSize:'0.8rem', fontWeight:500, fontFamily:'inherit', transition:'background 0.15s', flexShrink:0}} onMouseOver={e=>e.currentTarget.style.background=$bgSub} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                  🏠 <span>Accueil</span>
                </button>
                <span style={{color:$border, flexShrink:0, fontSize:'1rem', padding:'0 2px'}}>›</span>
                <button onClick={() => { setNavService(null); setOngletActif('dashboard'); setProcessusOuvert(null); }} style={{display:'flex', alignItems:'center', gap:6, padding:'8px 14px', background:'transparent', border:'none', cursor:'pointer', color:$textMut, fontSize:'0.8rem', fontWeight:500, fontFamily:'inherit', transition:'background 0.15s', flexShrink:0}} onMouseOver={e=>e.currentTarget.style.background=$bgSub} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                  {SERVICES_CONFIG[navEntreprise]?.icon} <span>{SERVICES_CONFIG[navEntreprise]?.nom}</span>
                </button>
                <span style={{color:$border, flexShrink:0, fontSize:'1rem', padding:'0 2px'}}>›</span>
                <div style={{display:'flex', alignItems:'center', gap:6, padding:'8px 14px', background:`${filAcc}12`, flex:1}}>
                  <div style={{width:3, height:16, borderRadius:2, background:filAcc, flexShrink:0}}></div>
                  <span style={{fontSize:'0.82rem', fontWeight:700, color:filAcc}}>{svcIcon} {svcLabel}</span>
                </div>
                {ongletActif && ongletActif !== 'dashboard' && <>
                  <span style={{color:$border, flexShrink:0, fontSize:'1rem', padding:'0 2px'}}>›</span>
                  <div style={{display:'flex', alignItems:'center', gap:6, padding:'8px 14px', background:`${filAcc}20`}}>
                    <span style={{fontSize:'0.8rem', fontWeight:600, color:filAcc}}>{({'crm_commercial':'CRM','kpi_dashboard':'KPI','dashboard':'Dashboard','svc_kpi':'Indicateurs','planning_gantt':'Planning','calendrier_svc':'Calendrier','processus_svc':'Processus','collaborateurs':'Collaborateurs','organigramme':'Organigramme','recrutement':'Recrutement','onboarding':'Onboarding','offboarding':'Offboarding','dossier_rh':'Dossier RH','formation':'Formation','absences':'Absences','parc_automobile':'Parc auto','materiel':'Matériel','litiges':'Litiges','contrats':'Contrats','assurances':'Assurances','postes':'Postes','ordres_travail':'OT'})[ongletActif] || ongletActif}</span>
                  </div>
                </>}
              </div>
            );
          })()}

          {/* ====== CARTES MODULES — quand service sélectionné ====== */}
          {navService && navEntreprise && (() => {
            const moduleIcons = {
              crm_commercial: { icon: '🤝', label: 'CRM Commercial', desc: 'Pipeline, affaires, contacts, entreprises', color: '#007ab5' },
              kpi_dashboard: { icon: '📊', label: 'KPI / Tableau de Bord', desc: "Objectifs, stats, analyse du service", color: '#059669' },
              dashboard: { icon: '📊', label: 'Tableau de Bord', desc: "KPI, finances et vue d'ensemble", color: '#e67e22' },
              ezel_tableau: { icon: '🏗️', label: 'Monday · Affaires Live', desc: '81 affaires · Études AO · données temps réel', color: '#007ab5' },
              suivi_dossiers: { icon: '📋', label: 'Suivi des Dossiers AO', desc: '345 dossiers · filtre statut/marché/délai · Monday live', color: '#dc2626' },
              svc_kpi: { icon: '📈', label: 'Statistiques', desc: 'Taux de succès · pipeline · analyse par type de marché', color: '#7c3aed' },
              veille_ao: { icon: '🔍', label: 'Veille AO', desc: 'Recherche et import AO publics (SPIGAO / BOAMP)', color: '#3b82f6' },
              planning_gantt: { icon: '📊', label: 'Planning Gantt', desc: 'Vue chronologique des projets', color: '#ea580c' },
              calendrier_svc: { icon: '📅', label: 'Calendrier', desc: 'Vue calendrier et sync Google', color: '#dc2626' },
              processus_svc: { icon: '📋', label: 'Processus & Procédures', desc: 'Étapes et workflow du service', color: '#7c3aed' },
              collaborateurs: { icon: '👥', label: 'Collaborateurs', desc: 'Gestion des employés et équipes', color: '#2ecc71' },
              postes: { icon: '💼', label: 'Postes & Fiches', desc: 'Fiches de poste et référentiel', color: '#3498db' },
              presentation: { icon: '🐝', label: 'Modèle Ruches', desc: 'Philosophie, niveaux de rémunération, fonctionnement du système ruches', color: '#9b59b6' },
              organigramme: { icon: '🏢', label: 'Organigramme', desc: 'Structure et hiérarchie', color: '#1abc9c' },
              simulateur: { icon: '🧮', label: 'Simulateur', desc: 'Simulation de rémunération', color: '#f39c12' },
              suivi: { icon: '📈', label: 'Suivi de l\'Essaim', desc: 'Suivi des performances', color: '#e74c3c' },
              admin: { icon: '⚙️', label: 'Administration', desc: 'Gestion des droits et structure', color: '#7f8c8d' },
              presentation_groupe: { icon: '🌐', label: 'Présentation Group', desc: 'Vitrine interactive du groupe', color: '#8B6F47' },
              // Direction
              roadmap: { icon: '🗺️', label: 'Feuille de Route', desc: 'Vision stratégique 2025-2035', color: '#6366f1' },
              // Finance
              fact_interne: { icon: '🧾', label: 'Facturation Interne', desc: 'Devis & factures YILMAZ → Filiales, temps passé', color: '#059669' },
              fact_externe: { icon: '📥', label: 'Facturation Externe', desc: 'Réception factures prestataires → Pennylane', color: '#dc2626' },
              budget: { icon: '📊', label: 'Budget Prévisionnel', desc: 'Budget annuel par filiale, suivi écarts prévu vs réel', color: '#8B6F47' },
              tresorerie: { icon: '💰', label: 'Trésorerie', desc: 'Plan de trésorerie, prévisions cash-flow', color: '#d97706' },
              analytique: { icon: '📊', label: 'Analytique', desc: 'Suivi analytique par chantier, filiale, projet', color: '#7c3aed' },
              // RH
              recrutement: { icon: '📋', label: 'Recrutement', desc: 'Pipeline : Offre → Sélection → Entretien → Promesse', color: '#3b82f6' },
              onboarding: { icon: '🚀', label: 'Onboarding', desc: 'Accueil nouveau collaborateur, checklist intégration', color: '#10b981' },
              offboarding: { icon: '👋', label: 'Offboarding', desc: 'Départ collaborateur, checklist sortie, solde de tout compte', color: '#ef4444' },
              dossier_rh: { icon: '📁', label: 'Dossier du Personnel', desc: 'Documents administratifs, contrats, pièces justificatives', color: '#8B6F47' },
              formation: { icon: '🎓', label: 'Formation', desc: 'Plan de formation, habilitations BTP, CACES', color: '#8b5cf6' },
              absences: { icon: '🏖️', label: 'Absences & Congés', desc: 'Congés, arrêts maladie, planning absences', color: '#f97316' },
              // Achats & Prestataires
              bon_commande: { icon: '📝', label: 'Bons de Commande', desc: 'Création et suivi BC vers prestataires/freelances', color: '#0891b2' },
              suivi_presta: { icon: '👤', label: 'Suivi Prestataires', desc: 'Missions en cours, livrables, évaluation', color: '#7c3aed' },
              reception_factures: { icon: '📥', label: 'Réception Factures', desc: 'Validation, rapprochement BC, export Pennylane', color: '#dc2626' },
              catalogue_presta: { icon: '📇', label: 'Catalogue Prestataires', desc: 'Base freelances, compétences, tarifs, évaluations', color: '#059669' },
              // IT
              outils: { icon: '🔧', label: 'Outils & Licences', desc: 'Inventaire logiciels, Monday, Pennylane, licences', color: '#6366f1' },
              tickets: { icon: '🎫', label: 'Tickets Support', desc: 'Demandes IT, incidents, résolution', color: '#ef4444' },
              // Juridique
              contrats: { icon: '📜', label: 'Contrats', desc: 'Suivi contrats clients, fournisseurs, sous-traitants', color: '#1e40af' },
              litiges: { icon: '⚡', label: 'Litiges', desc: 'Litiges en cours, provisions, suivi juridique', color: '#dc2626' },
              assurances: { icon: '🛡️', label: 'Assurances', desc: 'Polices, échéances, sinistres, décennale', color: '#059669' },
              conformite: { icon: '✅', label: 'Conformité BTP', desc: 'DUERP, registres obligatoires, certifications', color: '#7c3aed' },
              // Exécution
              ordres_travail: { icon: '📋', label: 'Ordres de Travail', desc: 'OT chantiers, consignes sécurité, suivi heures', color: '#f97316' },
              // Logistique & Parc
              parc_automobile: { icon: '🚗', label: 'Parc Automobile', desc: 'Véhicules, CT, assurance, km, conducteurs', color: '#0ea5e9' },
              materiel: { icon: '🔧', label: 'Parc Matériel', desc: 'Engins, échafaudages, outillage, VGP', color: '#0891b2' },
              // Marketing
              identite: { icon: '🎨', label: 'Identité Visuelle', desc: 'Charte graphique, logos, couleurs, templates', color: '#ec4899' },
              supports: { icon: '📄', label: 'Supports Commerciaux', desc: 'Plaquettes, cartes de visite, signalétique', color: '#f59e0b' },
              web: { icon: '🌐', label: 'Présence Web', desc: 'Sites web, réseaux sociaux, e-réputation', color: '#3b82f6' },
              donnees_ref: { icon: '🗄️', label: 'Données de Référence', desc: 'Filiales, collaborateurs, véhicules, matériel, chantiers', color: '#6366f1' },
              parc_info: { icon: '💻', label: 'Parc Informatique', desc: 'Téléphones, ordinateurs, écrans, imprimantes, accessoires', color: '#7c3aed' }
            };
            const storeKey = `${navEntreprise}_${navService}`;
            const orderedMods = getOrderedModules(navEntreprise, navService);
            return (
              <div style={{marginBottom:'0.25rem'}}>
                <div style={{fontSize:'0.78rem', fontWeight:700, color:$accent, marginBottom: modCardSize==='xs'?'0.2rem':modCardSize==='sm'?'0.3rem':'0.5rem', display:'flex', alignItems:'center', gap:'0.3rem'}}>
                  <span style={{fontSize:'0.85rem'}}>🧩</span> Modules disponibles
                </div>
                <div style={{display:'grid', gridTemplateColumns:`repeat(auto-fill, minmax(${modCardSize==='xs'?'80px':modCardSize==='sm'?'110px':modCardSize==='md'?'130px':'150px'}, 1fr))`, gap: modCardSize==='xs'?'0.2rem':modCardSize==='sm'?'0.35rem':'0.5rem'}}>
                  {orderedMods.filter(modId => canView(modId)).map(modId => {
                    const mod = moduleIcons[modId] || { icon: '📄', label: modId, desc: '', color: '#999' };
                    const isActiveModule = ongletActif === modId;
                    return (
                      <div key={modId}
                        draggable={isSuperAdmin()}
                        onDragStart={isSuperAdmin() ? (e) => { e.dataTransfer.setData('moduleKey', modId); e.currentTarget.style.opacity = '0.4'; } : undefined}
                        onDragEnd={isSuperAdmin() ? (e) => { e.currentTarget.style.opacity = ''; } : undefined}
                        onDragOver={isSuperAdmin() ? (e) => { e.preventDefault(); e.currentTarget.style.outline = '2px dashed #8B6F47'; e.currentTarget.style.outlineOffset = '3px'; } : undefined}
                        onDragLeave={isSuperAdmin() ? (e) => { e.currentTarget.style.outline = ''; e.currentTarget.style.outlineOffset = ''; } : undefined}
                        onDrop={isSuperAdmin() ? (e) => {
                          e.preventDefault();
                          e.currentTarget.style.outline = '';
                          e.currentTarget.style.outlineOffset = '';
                          const fromId = e.dataTransfer.getData('moduleKey');
                          if (fromId === modId || !fromId) return;
                          setOrdreModules(prev => {
                            const arr = [...orderedMods];
                            const fromIdx = arr.indexOf(fromId);
                            const toIdx = arr.indexOf(modId);
                            if (fromIdx < 0 || toIdx < 0) return prev;
                            arr.splice(fromIdx, 1);
                            arr.splice(toIdx, 0, fromId);
                            return {...prev, [storeKey]: arr};
                          });
                        } : undefined}
                        onClick={() => setOngletActif(modId)}
                        style={{
                          borderRadius:crmRd, overflow:'hidden',
                          cursor: isSuperAdmin() ? 'grab' : 'pointer',
                          border: isActiveModule ? `2px solid ${mod.color}` : `1px solid ${$border}`,
                          background: isActiveModule ? `${mod.color}08` : 'white',
                          transition:'all 0.25s ease',
                          boxShadow: isActiveModule ? `0 6px 20px ${mod.color}25` : $shadow,
                          transform: isActiveModule ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                        onMouseOver={e => { if (!isActiveModule) { e.currentTarget.style.borderColor=mod.color; e.currentTarget.style.boxShadow=`0 6px 20px ${mod.color}20`; e.currentTarget.style.transform='translateY(-3px)'; }}}
                        onMouseOut={e => { if (!isActiveModule) { e.currentTarget.style.borderColor=$border; e.currentTarget.style.boxShadow=$shadow; e.currentTarget.style.transform='translateY(0)'; }}}
                      >
                        <div style={{height: modCardSize==='xs'?'3px':modCardSize==='sm'?'4px':modCardSize==='md'?'5px':'6px', background:`linear-gradient(90deg, ${mod.color}, ${mod.color}88)`, position:'relative'}}>
                          {isSuperAdmin() && <span style={{position:'absolute', right:6, top:-1, fontSize:'0.65rem', color:'rgba(255,255,255,0.8)', fontWeight:700}}>⠿</span>}
                        </div>
                        <div style={{padding: modCardSize==='xs'?'0.3rem 0.4rem':modCardSize==='sm'?'0.5rem 0.6rem':modCardSize==='md'?'0.65rem 0.8rem':'0.85rem 1rem'}}>
                          <div style={{display:'flex', alignItems:'center', gap:'0.4rem', marginBottom: modCardSize==='xs'?'0.15rem':modCardSize==='sm'?'0.2rem':'0.4rem'}}>
                            <div style={{width: modCardSize==='xs'?18:modCardSize==='sm'?24:modCardSize==='md'?30:36, height: modCardSize==='xs'?18:modCardSize==='sm'?24:modCardSize==='md'?30:36, borderRadius:crmRd, background:`${mod.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: modCardSize==='xs'?'0.7rem':modCardSize==='sm'?'0.85rem':modCardSize==='md'?'1rem':'1.2rem', flexShrink:0}}>
                              {mod.icon}
                            </div>
                            {isActiveModule && <div style={{width:6, height:6, borderRadius:'50%', background:mod.color, boxShadow:`0 0 6px ${mod.color}`, flexShrink:0}}></div>}
                          </div>
                          <div style={{fontSize: modCardSize==='xs'?'0.62rem':modCardSize==='sm'?'0.72rem':modCardSize==='md'?'0.8rem':'0.9rem', fontWeight:700, color: isActiveModule ? mod.color : $text, marginBottom:'0.1rem', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{mod.label}</div>
                          {(modCardSize !== 'sm' && modCardSize !== 'xs') && <div style={{fontSize: modCardSize==='md'?'0.65rem':'0.75rem', color:'#aaa', lineHeight:1.4}}>{mod.desc}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
        </div>{/* end full header + nav */}
        </>)}{/* end isLoggedIn header/nav */}

        {/* ═══ SIDEBAR NAVIGATION ═══ */}
        {crmLayout==='sidebar' && isLoggedIn && (() => {
          const SIDEBAR_W = crmSideOpen ? 210 : 48;
          const filiales = [
            {key:'groupoy',name:'Group OY',icon:'\uD83D\uDC1D',color:$accent},
            {key:'yilmaz',name:'Yilmaz',icon:'\uD83C\uDFE2',color:'#2d2d2d'},
            {key:'ezel',name:'Ezel B\u00e2timent',icon:'\uD83C\uDFD7\uFE0F',color:'#007ab5'},
            {key:'roulotte',name:'La Roulotte',icon:'\uD83D\uDE9B',color:'#C49A2A'},
            {key:'echafaudage',name:"L'\u00c9chafaudage",icon:'\u2699\uFE0F',color:'#6C3483'},
            {key:'etancheite',name:"L'\u00c9tanch\u00e9it\u00e9",icon:'\uD83D\uDCA7',color:'#0e6655'}
          ];
          const currentFil = filiales.find(f=>f.key===navEntreprise) || filiales[0];
          const services = navEntreprise && SERVICES_CONFIG[navEntreprise] ? SERVICES_CONFIG[navEntreprise].services : [];
          const currentSvc = services.find(s=>s.id===navService);
          const moduleList = currentSvc ? currentSvc.modules : [];
          const filialeMap = {'groupoy':null,'yilmaz':'yilmaz','ezel':3,'roulotte':1,'echafaudage':2,'etancheite':6};
          const moduleNames = {dashboard:'Dashboard',kpi_dashboard:'KPI',veille_ao:'Veille AO',svc_kpi:'Indicateurs',planning_gantt:'Planning',calendrier_svc:'Calendrier',processus_svc:'Processus',collaborateurs:'Collaborateurs',postes:'Postes',organigramme:'Organigramme',recrutement:'Recrutement',onboarding:'Onboarding',offboarding:'Offboarding',presentation:'Modèle Ruches',simulateur:'Simulateur',suivi:'Suivi de l\'Essaim',formation:'Formation',absences:'Absences',dossier_rh:'Dossier RH',bon_commande:'Bons de commande',fact_interne:'Fact. interne',fact_externe:'Fact. externe',budget:'Budget',tresorerie:'Trésorerie',analytique:'Analytique',contrats:'Contrats',litiges:'Litiges',assurances:'Assurances',conformite:'Conformité',identite:'Identité',supports:'Supports',web:'Web',outils:'Outils',tickets:'Tickets',parc_info:'Parc info',donnees_ref:'Données ref',ordres_travail:'Ordres travail',parc_automobile:'Parc auto',materiel:'Matériel',admin:'Admin',roadmap:'Roadmap',presentation_groupe:'Groupe',suivi_presta:'Suivi presta',reception_factures:'Réception fact.',catalogue_presta:'Catalogue',crm_commercial:'CRM Commercial',suivi_dossiers:'Suivi Dossiers AO'};

          return (
            <div style={{position:'fixed',left:0,top:46,bottom:0,width:SIDEBAR_W,background:$bgSub,borderRight:`1px solid ${$border}`,zIndex:9000,display:'flex',flexDirection:'column',overflow:'hidden'}}>
              {/* Logo + Filiale accent bar */}
              <div style={{padding:crmSideOpen?'14px 12px':'10px 6px',borderBottom:`1px solid ${$border}`}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:crmSideOpen?10:6,flexDirection:crmSideOpen?'row':'column'}}>
                  <div style={{width:30,height:30,borderRadius:crmRd>6?8:crmRd,background:`linear-gradient(135deg,${currentFil.color},${currentFil.color}cc)`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'0.75rem',fontWeight:800,flexShrink:0}}>OY</div>
                  <div style={{display:crmSideOpen?'block':'none',flex:1,minWidth:0,marginTop:2}}>
                    <div style={{fontWeight:700,fontSize:'0.82rem',color:$text}}>{currentFil.name}</div>
                    <div style={{fontSize:'0.62rem',color:$textMut}}>{navEntreprise==='groupoy'?'Holding stratégique':navEntreprise==='yilmaz'?'Services partagés':navEntreprise==='ezel'?'Entreprise générale BTP':navEntreprise==='roulotte'?'Location sanitaires & matériel':navEntreprise==='echafaudage'?'Location + montage échafaudage':navEntreprise==='etancheite'?"Travaux d'étanchéité":'CRM Group OY'}</div>
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:3}}>
                  {filiales.map(f=>(
                    <button key={f.key} onClick={()=>{navigateToEntreprise(f.key,filialeMap);}} style={{padding:'3px 7px',borderRadius:crmRd>0?crmRd-2:0,border:`1px solid ${navEntreprise===f.key?f.color:$border}`,background:navEntreprise===f.key?f.color+'18':'transparent',fontSize:'0.62rem',cursor:'pointer',color:navEntreprise===f.key?f.color:$textMut,fontWeight:navEntreprise===f.key?700:400,transition:'all 0.15s',fontFamily:'inherit',whiteSpace:'nowrap'}} title={f.name}>{f.icon}</button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div style={{flex:1,overflow:'auto',padding:'6px 5px'}}>
                {services.length > 0 ? services.map(svc => {
                  const isActiveSvc = navService === svc.id;
                  const svcModules = svc.modules || [];
                  return (
                    <div key={svc.id}>
                      <div onClick={()=>{if(isActiveSvc){setNavService(null);}else{navigateToService(svc.id);if(svc.modules[0]&&canView(svc.modules[0]))setOngletActif(svc.modules[0]);}}} style={{padding:crmSideOpen?'7px 10px':'7px 4px',borderRadius:Math.max(crmRd-2,0),cursor:'pointer',display:'flex',alignItems:'center',gap:crmSideOpen?8:0,justifyContent:crmSideOpen?'flex-start':'center',background:isActiveSvc?currentFil.color+'12':'transparent',color:isActiveSvc?currentFil.color:$textSec,fontWeight:isActiveSvc?600:400,fontSize:'0.78rem',marginBottom:1,transition:'all 0.12s'}} onMouseEnter={e=>{if(!isActiveSvc)e.currentTarget.style.background=$bgCardHover;}} onMouseLeave={e=>{if(!isActiveSvc)e.currentTarget.style.background='transparent';}}>
                        {!crmSideOpen&&<span style={{fontSize:'0.85rem',opacity:isActiveSvc?1:0.5}}>{svc.icon}</span>}
                        {crmSideOpen&&<span style={{flex:1}}>{svc.label}</span>}
                      </div>
                      {isActiveSvc && svcModules.length > 0 && crmSideOpen && (
                        <div style={{padding:'0 0 4px 34px'}}>
                          {(()=>{const orderKey=navEntreprise+'_'+svc.id;const ordered=moduleOrder[orderKey]||svcModules;const visibleMods=ordered.filter(mid=>svcModules.includes(mid)&&canView(mid));const missing=svcModules.filter(mid=>canView(mid)&&!visibleMods.includes(mid));const allMods=[...visibleMods,...missing];return allMods.map(mid=>(
                            <div key={mid} draggable onDragStart={()=>setDragModule(mid)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(dragModule&&dragModule!==mid){const orderKey2=navEntreprise+'_'+svc.id;const curr=moduleOrder[orderKey2]||[...svcModules];const fromIdx=curr.indexOf(dragModule);const toIdx=curr.indexOf(mid);if(fromIdx===-1||toIdx===-1){const newArr=[...allMods];const fi=newArr.indexOf(dragModule);const ti=newArr.indexOf(mid);if(fi!==-1){newArr.splice(fi,1);newArr.splice(ti,0,dragModule);setModuleOrder(p=>({...p,[orderKey2]:newArr}));}}else{const newArr=[...curr];newArr.splice(fromIdx,1);newArr.splice(toIdx,0,dragModule);setModuleOrder(p=>({...p,[orderKey2]:newArr}));}setDragModule(null);}}} onClick={()=>setOngletActif(mid)} style={{padding:'5px 10px',borderRadius:Math.max(crmRd-3,0),cursor:'grab',fontSize:'0.72rem',fontWeight:ongletActif===mid?600:400,color:ongletActif===mid?currentFil.color:$textMut,background:dragModule===mid?$accent+'15':ongletActif===mid?currentFil.color+'08':'transparent',marginBottom:1,transition:'all 0.1s',display:'flex',alignItems:'center',gap:6,borderLeft:dragModule===mid?`2px solid ${$accent}`:'2px solid transparent'}} onMouseEnter={e=>{if(ongletActif!==mid&&dragModule!==mid)e.currentTarget.style.background=$bgCardHover;}} onMouseLeave={e=>{if(ongletActif!==mid&&dragModule!==mid)e.currentTarget.style.background=ongletActif===mid?currentFil.color+'08':'transparent';}}>
                              {moduleNames[mid]||mid}
                            </div>
                          ));})()}
                        </div>
                      )}
                    </div>
                  );
                }) : (
                  <div style={{padding:'20px 10px',textAlign:'center',color:$textMut,fontSize:'0.78rem'}}>Sélectionnez une filiale</div>
                )}
              </div>
              {/* Bottom buttons */}
              <div style={{padding:'8px 6px',borderTop:`1px solid ${$border}`,display:'flex',gap:4}}>
                <button onClick={()=>setCrmPal(!crmPal)} style={{flex:1,padding:'8px',borderRadius:crmRd,border:'1px solid '+(crmPal?crmAcc:$border),background:crmPal?crmAcc+'12':'transparent',color:crmPal?crmAcc:$textMut,fontWeight:600,fontSize:'0.76rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontFamily:'inherit'}}>{String.fromCodePoint(0x1F3A8)}{crmSideOpen?' Apparence':''}</button>
                {crmSideOpen&&<button onClick={()=>setCrmSideOpen(false)} style={{padding:'8px 10px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textMut,fontWeight:600,fontSize:'0.76rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'inherit',transition:'all 0.15s'}} onMouseEnter={e=>{e.currentTarget.style.background=$bgCardHover;}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>{String.fromCodePoint(0x25C0)}</button>}
              </div>

            </div>
          );
        })()}
        {/* Sidebar spacer — push content right when sidebar active */}
        {crmLayout==='sidebar' && isLoggedIn && <div style={{width:crmSideOpen?210:48,flexShrink:0}}/>}

        {/* FILIALE FILTER BAR — YILMAZ context only */}
        <FilialeFilterBar />

        {/* TABLEAU DE BORD */}
        {ongletActif === 'dashboard' && <TabDashboard {...{ $accent, $bg, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $shadow, $success, $text, $textMut, $textSec, $warn, SERVICES_CONFIG, WidgetErrorBoundary, ajouterFiliale, amortissements, appelsOffres, ca, calculsFiliales, chantiers, collaborateurs, crmRd, dashGroupeVue, dashSettingsOpen, dashWidgetOrder, dashWidgetSizes, dashWidgets, dashboardChantierId, dashboardCollabId, dashboardFiliale, dashboardVue, dataEvolutionCA, defaultAnnees, defaultWidgetOrder, donneesAnneeActive, donneesAnneesSupp, donneesDragOverIdx, donneesFilialeOrder, donneesFinancieres, dragOverWidget, dragWidget, employes, emptyChantier, emptyEmploye, filNom, filiales, filialesDynamiques, filialesEnrichies, fraisInternes, getAlerts, getChantiersCollab, getDonnee, getEmployesFiliale, getKpiFiliale, handleDonneesDrop, handleSettingsDrop, handleWidgetDrop, hiddenServicesYilmaz, impots, isDragging, margeBrute, modalFilialeOuvert, navEntreprise, nbFiliales, niveau, nouvelleFiliale, pennylaneApiKey, pennylaneError, pennylaneStatus, resultatExploitation, resultatNet, setChantierForm, setCollabDetailTab, setCollabFiltreFiliale, setCollabOngletId, setConfirmDelete, setDashGroupeVue, setDashSettingsOpen, setDashWidgetOrder, setDashWidgets, setDashboardChantierId, setDashboardCollabId, setDashboardFiliale, setDashboardVue, setDonnee, setDonneesAnneeActive, setDonneesAnneesSupp, setDonneesDragIdx, setDonneesDragOverIdx, setDragOverWidget, setDragWidget, setEmployeForm, setModalChantier, setModalEmploye, setModalFilialeOuvert, setNavService, setNouvelleFiliale, setOngletActif, setPennylaneApiKey, setPennylaneError, setPennylaneStatus, setSettingsDragIdx, setSettingsDragOverIdx, setYilmazVue, settingsDragIdx, settingsDragOverIdx, showBorderAccent, sousTraitance, toggleWidget, toggleWidgetSize, totalEffectif, widgetDescriptions, widgetLabels, yilmazVue }} />}

        {/* ══════ MODULE: CRM COMMERCIAL ══════ */}
        {ongletActif === 'crm_commercial' && navEntreprise && navService === 'crm' && <TabCrmCommercial {...{ $accent, $bg, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, $warn, addChecklistItem, ca, checklistEditOpen, checklistEditTab, clDragId, clDragOver, crmActiveGroup, crmAffaires, crmColWidths, crmCollapsed, crmFicheId, crmFicheTab, crmFil, crmFilterOpen, crmGroupBy, crmLoading, crmModuleRef, crmMondayKey, crmRd, crmScrollRef, crmSearch, crmShowArchive, crmTab, crmVisibleCols, ctActivities, ctContactMeta, ctGroupBy, ctNewActType, ctNewNote, ctPipeFilter, ctSearch, ctSelectedContact, ctView, drawerResizing, drawerWidth, ficheTabDragId, ficheTabDragOver, ficheTabOrder, ficheTabScrollRef, filiales, ganttZoom, getChecklistData, gpColCode, gpColDate, gpExpanded, gpFilter, gpFontSize, gpGroupBy, gpLabelW, gpScale, gpScrollRef, gpSpacing, gpZoom, navEntreprise, navService, newItemText, prepColWidths, prepCollapsed, prepGroupBy, removeChecklistItem, reorderChecklistItem, reorderFicheTabs, setChecklistEditOpen, setChecklistEditTab, setClDragId, setClDragOver, setCrmActiveGroup, setCrmAffaires, setCrmColWidths, setCrmCollapsed, setCrmFicheId, setCrmFicheTab, setCrmFil, setCrmFilterOpen, setCrmGroupBy, setCrmLoading, setCrmMondayKey, setCrmSearch, setCrmShowArchive, setCrmTab, setCrmVisibleCols, setCtActivities, setCtContactMeta, setCtGroupBy, setCtNewActType, setCtNewNote, setCtPipeFilter, setCtSearch, setCtSelectedContact, setCtView, setFicheTabDragId, setFicheTabDragOver, setGanttZoom, setGpColCode, setGpColDate, setGpExpanded, setGpFilter, setGpFontSize, setGpGroupBy, setGpLabelW, setGpScale, setGpSpacing, setGpZoom, setNewItemText, setPrepColWidths, setPrepCollapsed, setPrepGroupBy, startColResize, startDrawerResize, updateChecklistItem }} />}

        {/* ══════ MODULE: EZEL TABLEAU DE BORD ══════ */}
        {ongletActif === 'ezel_tableau' && <TabEzelTableau {...{ $bg, $bgCard, $bgSub, $border, $borderLight, $text, $textMut, $textSec, crmRd }} />}

        {/* ===== KPI SERVICE FILIALE ===== */}
        {/* ══════ MODULE: KPI DASHBOARD (Service) ══════ */}
        {ongletActif === 'kpi_dashboard' && navEntreprise && navService && <TabKpiDashboard {...{ $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, SERVICES_CONFIG, ca, chantiers, crmRd, navEntreprise, navService, postes, setOngletActif }} />}

        {ongletActif === 'svc_kpi' && navEntreprise && navService && <TabSvcKpi {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, AO_PHASES, AO_STATUTS, SERVICES_CONFIG, SourceLogo, aoColDragOverIdx, aoColOrder, aoPrioFiltre, aoStatutOrdre, aoSvcColWidths, aoTypeFiltre, appelsOffres, crmRd, getAoGrouped, getAoStats, handleAoColDrop, navEntreprise, navService, setAoColDragIdx, setAoColDragOverIdx, setAoPrioFiltre, setAoSvcColWidths, setAoTypeFiltre, setOngletActif, startColResize }} />}


        {/* ═══ MODULE SUIVI DOSSIERS AO ═══ */}
        {ongletActif === 'suivi_dossiers' && <TabSuiviDossiers {...{ $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $shadow, $shadowLg, $text, $textMut, $textSec, aoGrouper, aoSearch, aoSelected, aoSort, aoStatCellOpen, aoStatDropPos, aoStatut, aoTypeMarche, aoTypeProjet, aoView, ca, chantiers, crmRd, dosActiveGrp, dosColWidths, dosDrawerWide, dosFilterPanelOpen, dosRowBordersH, dosRowBordersV, dosTableRef, iaCctpText, iaDocs, iaGcsPath, iaMode, niveau, seStatDrop, seTaches, setAoGrouper, setAoSearch, setAoSelected, setAoSort, setAoStatCellOpen, setAoStatDropPos, setAoStatut, setAoTypeMarche, setAoTypeProjet, setAoView, setDosActiveGrp, setDosColWidths, setDosDrawerWide, setDosFilterPanelOpen, setDosRowBordersH, setDosRowBordersV, setIaCctpText, setIaDocs, setIaGcsPath, setIaMode, setOngletActif, setSeStatDrop, setSeTaches, setVeilleAOPrefill, veilleAOPrefill }} />}


        {/* ═══ MODULE VEILLE AO ═══ */}
        {ongletActif === 'veille_ao' && navEntreprise && navService && <TabVeilleAo {...{ $bgCard, $bgSub, $border, $shadowLg, $text, $textMut, $textSec, VEILLE_DECISIONS, VEILLE_PERSONNES, VEILLE_STATUTS, crmRd, filialesEnrichies, navEntreprise, navService, setOngletActif, setStatutDragIdx, setStatutDragOverIdx, setVColDragIdx, setVColDragOverIdx, setVeilleAO, setVeilleAOPrefill, setVeilleColOrder, setVeilleColWidths, setVeilleDecCellOpen, setVeilleDecCellPos, setVeilleDecGrab, setVeilleDecOrdre, setVeilleDecOver, setVeilleDensity, setVeilleDrawerWide, setVeilleFilterPanelOpen, setVeilleFormData, setVeilleFormOpen, setVeilleGroupeActif, setVeilleGroupePar, setVeilleGroupesFermes, setVeilleHeaderSize, setVeillePinnedCols, setVeilleRowBordersH, setVeilleRowBordersV, setVeilleSearch, setVeilleSelectedAO, setVeilleSort, setVeilleSourceDropdown, setVeilleStatCellOpen, setVeilleStatCellPos, setVeilleStatGrab, setVeilleStatOver, setVeilleStatutFiltres, setVeilleStatutsOrdre, setVeilleTypeFiltre, startColResize, statutDragIdx, vColDragIdx, vColDragOverIdx, veilleAO, veilleColOrder, veilleColWidths, veilleDecCellOpen, veilleDecCellPos, veilleDecGrab, veilleDecOrdre, veilleDecOver, veilleDensity, veilleDrawerWide, veilleFilterPanelOpen, veilleFormData, veilleFormOpen, veilleGroupeActif, veilleGroupePar, veilleGroupesFermes, veilleHeaderSize, veillePinnedCols, veilleRowBordersH, veilleRowBordersV, veilleSearch, veilleSelectedAO, veilleSort, veilleSourceDropdown, veilleStatCellOpen, veilleStatCellPos, veilleStatGrab, veilleStatOver, veilleStatutFiltres, veilleTypeFiltre }} />}

        {/* PLANNING GANTT — MODULE COMPLET */}
        {ongletActif === 'planning_gantt' && navEntreprise && navService && <TabPlanningGantt {...{ $bg, $bgCard, $bgSub, $border, $text, $textMut, $textSec, PLAN_PHASES, PLAN_STATUTS, crmRd, navEntreprise, navService, planBarColor, planColWidths, planDetailId, planFiltrePhase, planFiltrePrio, planFiltreResp, planFiltreStatut, planGanttScale, planGanttZoom, planGroupBy, planGroupesFermes, planKanbanDrag, planOffset, planProjets, planSearch, planVue, planZoom, setPlanBarColor, setPlanColWidths, setPlanDetailId, setPlanFiltrePrio, setPlanFiltreResp, setPlanGroupBy, setPlanGroupesFermes, setPlanKanbanDrag, setPlanOffset, setPlanProjets, setPlanSearch, setPlanVue, setPlanZoom }} />}

        {/* CALENDRIER SERVICE */}
        {ongletActif === 'calendrier_svc' && navEntreprise && navService && <TabCalendrierSvc {...{ $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, SERVICES_CONFIG, calAnnee, calMois, crmRd, navEntreprise, navService, setCalAnnee, setCalMois }} />}
        {ongletActif === 'guide' && <TabGuide {...{ $accent, $bgCard, $bgSub, $border, $info, $success, $text, $textMut, $textSec, ca, crmRd, filiales, guideSection, niveau, setGuideSection, widgetDescriptions, widgetLabels }} />}

        {/* PROCESSUS & PROCÉDURES */}
        {ongletActif === 'processus_svc' && navEntreprise && navService && <TabProcessusSvc {...{ $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, crmRd, filialesDynamiques, navEntreprise, navService, processusOuvert, setProcessusOuvert }} />}

        {/* COLLABORATEURS */}
        {ongletActif === 'collaborateurs' && <TabCollaborateurs {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selBorder, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, COLLAB_CONDITIONS, COLLAB_CONTRATS, COLLAB_STATUTS, calcAge, calcAnciennete, cancelEditCollab, chantiers, collabColWidths, collabConditionFilter, collabContratFilter, collabDetailTab, collabDocAdding, collabDocNom, collabDocType, collabDocUrl, collabFilterOpen, collabFiltreFiliale, collabOngletId, collabSearch, collabSort, collabStatutFilter, collabView, collabVisibleCols, collaborateurs, crmRd, employes, emptyEmploye, filialesDynamiques, getChantiersCollab, niveau, postes, setCollabColWidths, setCollabConditionFilter, setCollabContratFilter, setCollabDetailTab, setCollabDocAdding, setCollabDocNom, setCollabDocType, setCollabDocUrl, setCollabFilterOpen, setCollabFiltreFiliale, setCollabOngletId, setCollabSearch, setCollabSort, setCollabStatutFilter, setCollabView, setCollabVisibleCols, setConfirmDelete, setDashboardChantierId, setDashboardFiliale, setDashboardVue, setEmployeForm, setModalEmploye, setNavEntreprise, setNavService, setOngletActif, setPosteSelectionne, showBorderAccent }} />}

        {/* === ONGLET POSTES === */}
        {ongletActif === 'postes' && <TabPostes {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $shadow, $text, $textMut, $textSec, $warn, POSTE_BESOIN_TYPES, POSTE_CONTRAT_TYPES, POSTE_OB_TYPES, POSTE_SOUS_MOTIFS, POSTE_STATUTS, POSTE_URGENCES, canEdit, collaborateurs, crmRd, currentUser, employes, filialesDynamiques, niveau, posteBesoinFilter, posteContratFilter, posteEditData, posteEditMode, posteFilterOpen, posteFiltreFiliale, posteFiltreStatut, posteSelectionne, posteUrgenceFilter, posteVisibleCols, postes, setCollabDetailTab, setCollabOngletId, setConfirmDelete, setOngletActif, setPosteBesoinFilter, setPosteContratFilter, setPosteEditData, setPosteEditMode, setPosteFilterOpen, setPosteFiltreFiliale, setPosteFiltreStatut, setPosteSelectionne, setPosteUrgenceFilter, setPosteVisibleCols, setPostes, setRecruEdit, setRecruNewMode }} />}

        {/* PRÉSENTATION DU PROJET */}
        {ongletActif === 'presentation' && <TabPresentation {...{ $accent, $bgCard, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, archiFil, archiModel, baremeRelatif, blocDrag, blocDragPos, blocDropTargetIndex, blocRefs, ca, chantiers, coeffResult, coefficient, colDrag, colDragPos, colDropTargetIndex, colRefs, collaborateurs, configBlocsPresentation, configColonnes, crmRd, ebePercent, ecartEBE, employes, filiales, filialesDynamiques, formatPercent, getCellValue, grille, grilleColWidth, grilleFil, grilleModel, grilleNivSel, handleBlocMouseDown, handleColMouseDown, handlePrint, isBlocDragging, isColDragging, niveau, ordreBlocsPresentation, ordreColonnesGrille, printSelection, setArchiFil, setArchiModel, setCollabDetailTab, setCollabOngletId, setGrilleColWidth, setGrilleFil, setGrilleModel, setGrilleNivSel, setOngletActif, setPrintSelection, setShowPrintModal, showPrintModal }} />}

        {/* ORGANIGRAMME */}
        {ongletActif === 'organigramme' && <TabOrganigramme {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, ajouterEmploye, ca, collaborateurs, crmRd, employes, filiales, filialesDynamiques, handleMouseDown, modalAjoutOuvert, niveau, nouvelEmploye, orgArbreDrag, orgArbrePos, orgArbreRef, orgSocieteDrag, orgSocietePan, orgSocietePanning, orgSocietePos, orgSocieteRef, orgSocieteZoom, orgView, setModalAjoutOuvert, setNouvelEmploye, setOrgArbreDrag, setOrgArbrePos, setOrgSocieteDrag, setOrgSocietePan, setOrgSocietePanning, setOrgSocietePos, setOrgSocieteZoom, setOrgView, supprimerEmploye }} />}

        {/* SIMULATEUR GÉNÉRAL */}
        {ongletActif === 'simulateur' && <TabSimulateur {...{ $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderLight, $danger, $info, $selBg, $selText, $success, $text, $textMut, $textSec, $warn, achatsST, amortissements, baremeRelatif, baseVariable, ca, coeffResult, coefficient, collaborateurs, crmRd, ebePercent, ebeValeur, ecartEBE, filNom, filialeData, filialeSelectionnee, filiales, formatEuro, formatPercent, fraisGroupOY, fraisHolding, fraisInternes, fraisInternesPercent, fraisYilmaz, getCoefficient, grille, impots, margeBrute, margeBrutePercent, niveau, niveauSelectionne, remunerationAvantPlafond, remunerationTotale, resultatExploitation, resultatNet, resultatNetPercent, setCa, setCollabSelectionne, setFilialeSelectionnee, setFraisInternes, setNiveauSelectionne, setOngletActif, setSimCompare, setSimPrintSel, setSimScenarioNom, setSimScenarios, setSimTab, setSousTraitance, setTauxAmortissements, setTauxFraisGroupOY, setTauxFraisHolding, setTauxFraisYilmaz, simCompare, simPrintSel, simScenarioNom, simScenarios, simTab, sousTraitance, tauxAmortissements, tauxFraisGroupOY, tauxFraisHolding, tauxFraisYilmaz, tauxImpots, totalFraisStructure, variableAjustee, variableModulee }} />}

        {/* SUIVI DES COLLABORATEURS */}
        {ongletActif === 'suivi' && collabActuel && calculsCollab && <TabSuivi {...{ $accent, $bgCard, $bgSub, $border, $info, $shadowLg, $success, $text, $textMut, $textSec, $warn, baseVariable, ca, calculerObjectifsLies, calculsCollab, coeffResult, coefficient, collabActuel, collabSelectionne, collaborateurs, crmRd, donneesFiltrees, ebeValeur, filialesDynamiques, filtreAnnee, formatEuro, formatPercent, grille, margeBrute, niveau, remunerationTotale, setCollabOngletId, setCollabSelectionne, setCollaborateurs, setFiltreAnnee, setOngletActif, setSuiviFilialeFilter, setSuiviFiltreOpen, setSuiviSearch, suiviFilialeFilter, suiviFiltreOpen, suiviSearch, updateCollaborateur, updateObjectifs, variableAjustee }} />}

        {/* ADMINISTRATION */}
        {ongletActif === 'presentation_groupe' && <TabPresentationGroupe {...{ $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, ca, chantiers, collaborateurs, crmRd, dirigeantDragRef, employes, filialeDragRef, filialesDynamiques, filialesEnrichies, getKpiFiliale, homFilCardSize, isLoggedIn, niveau, ordreDirigeants, ordreFilialesPresentation, resultatNet, setDashboardFiliale, setNavEntreprise, setNavService, setOngletActif, setOrdreDirigeants, setOrdreFilialesPresentation, setShowLoginModal }} />}
        {ongletActif === 'admin' && canView('admin') && <TabAdmin {...{ $accent, $bgCard, $bgSub, $border, $text, $textMut, $textSec, adminTab, canEdit, canView, configOnglets, crmRd, currentUser, editUserData, editUserId, employes, filiales, filialesDynamiques, isSuperAdmin, niveau, ordreOnglets, setAdminTab, setCurrentUser, setEditUserData, setEditUserId, setFilialesDynamiques, setUsers, users }} />}

      {/* ══════ Modal CRUD Collaborateur ══════ */}
      {modalEmploye && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200}} onClick={() => setModalEmploye(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, padding:28, maxWidth:600, width:'100%', margin:'0 16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:`1px solid ${$border}`, maxHeight:'92vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
                  <div style={{fontSize:'1.1rem', fontWeight:800, color:$text, marginBottom:20}}>{modalEmploye === 'add' ? '➕ Nouveau Collaborateur' : '✏️ Modifier Collaborateur'}</div>
                  {(() => {
                    const f = employeForm; const u = (k,v) => setEmployeForm({...f, [k]:v});
                    const inS = {width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.95rem', outline:'none'};
                    const lbS = {display:'block', fontSize:'0.82rem', fontWeight:600, color:$textSec, marginBottom:4, textTransform:'uppercase'};
                    return (<div style={{display:'flex', flexDirection:'column', gap:14}}>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Prénom *</label><input style={inS} value={f.prenom} onChange={e => u('prenom', e.target.value)} placeholder="Jean" /></div>
                        <div><label style={lbS}>Nom *</label><input style={inS} value={f.nom} onChange={e => u('nom', e.target.value)} placeholder="DUPONT" /></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Date de naissance</label><input style={inS} type="date" value={f.dateNaissance} onChange={e => u('dateNaissance', e.target.value)} /></div>
                        <div><label style={lbS}>Date d'entrée</label><input style={inS} type="date" value={f.dateEntree} onChange={e => u('dateEntree', e.target.value)} /></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Filiale</label><select style={inS} value={f.filialeId || ''} onChange={e => { const v = e.target.value; u('filialeId', v === 'yilmaz' ? 'yilmaz' : v ? Number(v) : 'yilmaz'); }}>
                          <option value="yilmaz">🏛️ Yilmaz (Services Partagés)</option>
                          {filialesDynamiques.filter(f => f.holding !== 'GROUP OY').map(fi => <option key={fi.id} value={fi.id}>{fi.icon} {fi.nom}</option>)}
                        </select></div>
                        <div><label style={lbS}>Niveau Ruche</label><select style={inS} value={f.niveau} onChange={e => u('niveau', e.target.value)}>
                          {niveauxRuche.map(n => <option key={n} value={n}>{n}</option>)}
                        </select></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Poste Ruche (interne)</label><input style={inS} value={f.posteInterne} onChange={e => u('posteInterne', e.target.value)} placeholder="Maître-Bâtisseur" /></div>
                        <div><label style={lbS}>Poste officiel (externe)</label><input style={inS} value={f.posteExterne} onChange={e => u('posteExterne', e.target.value)} placeholder="Conducteur de Travaux" /></div>
                      </div>
                      <div><label style={lbS}>Email</label><input style={inS} type="email" value={f.email || ''} onChange={e => u('email', e.target.value)} placeholder="jean.dupont@ezel.fr" /></div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Contrat</label><select style={inS} value={f.statutContrat||'cdi'} onChange={e => u('statutContrat', e.target.value)}>{COLLAB_CONTRATS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
                        <div><label style={lbS}>Statut</label><select style={inS} value={f.statut||'actif'} onChange={e => u('statut', e.target.value)}>{COLLAB_STATUTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
                        <div><label style={lbS}>Situation</label><select style={inS} value={f.condition||''} onChange={e => u('condition', e.target.value)}><option value="">Aucune</option>{COLLAB_CONDITIONS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
                        <div><label style={lbS}>Condition</label><select style={inS} value={f.condition||''} onChange={e => u('condition', e.target.value)}>{COLLAB_CONDITIONS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Civilité</label><select style={inS} value={f.civilite||''} onChange={e => u('civilite', e.target.value)}><option value="">—</option><option value="homme">Homme</option><option value="femme">Femme</option></select></div>
                        <div><label style={lbS}>Tél. fixe</label><input style={inS} value={f.telFixe || ''} onChange={e => u('telFixe', e.target.value)} placeholder="03 88 00 00 00" /></div>
                        <div><label style={lbS}>Portable pro</label><input style={inS} value={f.portable || ''} onChange={e => u('portable', e.target.value)} placeholder="06 00 00 00 00" /></div>
                        <div><label style={lbS}>Tél. perso</label><input style={inS} value={f.telPerso || ''} onChange={e => u('telPerso', e.target.value)} placeholder="06 00 00 00 00" /></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Email perso</label><input style={inS} type="email" value={f.emailPerso || ''} onChange={e => u('emailPerso', e.target.value)} placeholder="jean@gmail.com" /></div>
                        <div><label style={lbS}>Matricule</label><input style={inS} value={f.matricule || ''} onChange={e => u('matricule', e.target.value)} placeholder="00140" /></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Date fin contrat</label><input style={inS} type="date" value={f.dateFin || ''} onChange={e => u('dateFin', e.target.value)} /></div>
                        <div><label style={lbS}>Anniversaire</label><input style={inS} type="date" value={f.anniversaire || ''} onChange={e => u('anniversaire', e.target.value)} /></div>
                      </div>
                      <div style={{background:$bgSub, borderRadius:crmRd, padding:14}}>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:$accent, marginBottom:10, textTransform:'uppercase'}}>💰 Rémunération annuelle (€)</div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
                          <div><label style={lbS}>Salaire Fixe</label><input style={inS} type="number" value={f.salaireFix} onChange={e => u('salaireFix', Number(e.target.value))} /></div>
                          <div><label style={lbS}>Prime Fixe</label><input style={inS} type="number" value={f.primeFix} onChange={e => u('primeFix', Number(e.target.value))} /></div>
                          <div><label style={lbS}>Variable</label><input style={inS} type="number" value={f.variable} onChange={e => u('variable', Number(e.target.value))} /></div>
                        </div>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0'}}>
                        <input type="checkbox" checked={f.isResponsable} onChange={e => u('isResponsable', e.target.checked)} style={{width:18, height:18, accentColor:'#8B6F47'}} />
                        <span style={{fontSize:'0.92rem', fontWeight:600, color:$text}}>👑 Est responsable (gère un CA)</span>
                      </div>
                      {f.isResponsable && (
                      <div style={{background:$success+'12', borderRadius:crmRd, padding:14}}>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:'#059669', marginBottom:10, textTransform:'uppercase'}}>📊 KPI Responsable</div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
                          <div><label style={lbS}>CA Géré (€)</label><input style={inS} type="number" value={f.caGere} onChange={e => u('caGere', Number(e.target.value))} /></div>
                          <div><label style={lbS}>Marge Brute %</label><input style={inS} type="number" value={f.margeBrutePct} onChange={e => u('margeBrutePct', Number(e.target.value))} min="0" max="100" /></div>
                          <div><label style={lbS}>EBE %</label><input style={inS} type="number" value={f.ebePct} onChange={e => u('ebePct', Number(e.target.value))} min="0" max="100" /></div>
                        </div>
                      </div>)}
                      <div style={{display:'flex', gap:10, marginTop:8}}>
                        <button onClick={saveEmploye} disabled={!f.nom || !f.prenom} style={{flex:1, padding:'10px 20px', borderRadius:crmRd, border:'none', background: (!f.nom || !f.prenom) ? '#f0ebe3' : 'linear-gradient(135deg, #059669, #047857)', color:'white', fontWeight:700, fontSize:'0.95rem', cursor: (!f.nom || !f.prenom) ? 'not-allowed' : 'pointer'}}>{modalEmploye === 'add' ? '✅ Créer' : '💾 Enregistrer'}</button>
                        <button onClick={() => setModalEmploye(null)} style={{padding:'10px 20px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>Annuler</button>
                      </div>
                    </div>);
                  })()}
                </div>
              </div>
            )}

      {/* ══════ Modal CRUD Chantier ══════ */}
      {modalChantier && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200}} onClick={() => setModalChantier(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, padding:28, maxWidth:600, width:'100%', margin:'0 16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:`1px solid ${$border}`, maxHeight:'92vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
                  <div style={{fontSize:'1.1rem', fontWeight:800, color:$text, marginBottom:20}}>{modalChantier === 'add' ? '➕ Nouveau Chantier' : '✏️ Modifier Chantier'}</div>
                  {(() => {
                    const f = chantierForm; const u = (k,v) => setChantierForm({...f, [k]:v});
                    const inS = {width:'100%', padding:'8px 12px', borderRadius:crmRd, border:`1px solid ${$border}`, fontSize:'0.95rem', outline:'none'};
                    const lbS = {display:'block', fontSize:'0.82rem', fontWeight:600, color:$textSec, marginBottom:4, textTransform:'uppercase'};
                    const filEmpsForSelect = f.filialeId ? employes.filter(e => e.filialeId === f.filialeId || e.filialeId === null) : employes;
                    return (<div style={{display:'flex', flexDirection:'column', gap:14}}>
                      <div><label style={lbS}>Nom du chantier *</label><input style={inS} value={f.nom} onChange={e => u('nom', e.target.value)} placeholder="Résidence Les Oliviers - Gros Œuvre" /></div>
                      <div><label style={lbS}>Client *</label><input style={inS} value={f.client} onChange={e => u('client', e.target.value)} placeholder="Bouygues Immobilier" /></div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Filiale</label><select style={inS} value={f.filialeId || ''} onChange={e => u('filialeId', e.target.value ? Number(e.target.value) : null)}>
                          <option value="">— Sélectionner —</option>
                          {filialesDynamiques.filter(f => f.holding !== 'GROUP OY').map(fi => <option key={fi.id} value={fi.id}>{fi.icon} {fi.nom}</option>)}
                        </select></div>
                        <div><label style={lbS}>Responsable</label><select style={inS} value={f.responsableId || ''} onChange={e => u('responsableId', e.target.value || null)}>
                          <option value="">— Sélectionner —</option>
                          {filEmpsForSelect.map(e => <option key={e.id} value={e.id}>{e.prenom} {e.nom} ({e.posteExterne})</option>)}
                        </select></div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Statut</label><select style={inS} value={f.statut} onChange={e => u('statut', e.target.value)}>
                          {statutsChantier.map(s => <option key={s} value={s}>{s}</option>)}
                        </select></div>
                        <div><label style={lbS}>Avancement (%)</label>
                          <div style={{display:'flex', alignItems:'center', gap:8}}>
                            <input type="range" min="0" max="100" value={f.avancement} onChange={e => u('avancement', Number(e.target.value))} style={{flex:1, accentColor:'#8B6F47'}} />
                            <span style={{fontSize:'0.95rem', fontWeight:700, color:$text, minWidth:36, textAlign:'right'}}>{f.avancement}%</span>
                          </div>
                        </div>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                        <div><label style={lbS}>Date début</label><input style={inS} type="date" value={f.dateDebut} onChange={e => u('dateDebut', e.target.value)} /></div>
                        <div><label style={lbS}>Date fin prévue</label><input style={inS} type="date" value={f.dateFin} onChange={e => u('dateFin', e.target.value)} /></div>
                      </div>
                      <div style={{background:$success+'12', borderRadius:crmRd, padding:14}}>
                        <div style={{fontSize:'0.82rem', fontWeight:700, color:'#059669', marginBottom:10, textTransform:'uppercase'}}>💰 Montants (€ HT)</div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
                          <div><label style={lbS}>Montant Vente</label><input style={inS} type="number" value={f.montantVente} onChange={e => u('montantVente', e.target.value)} /></div>
                          <div><label style={lbS}>Budget HT</label><input style={inS} type="number" value={f.budgetHT} onChange={e => u('budgetHT', e.target.value)} /></div>
                          <div><label style={lbS}>Dépensé</label><input style={inS} type="number" value={f.depense} onChange={e => u('depense', e.target.value)} /></div>
                        </div>
                        {Number(f.montantVente) > 0 && (
                        <div style={{marginTop:10, display:'flex', gap:16, fontSize:'0.85rem'}}>
                          <span style={{color:'#7c3aed', fontWeight:600}}>Marge prév.: {((Number(f.montantVente) - Number(f.budgetHT)) / Number(f.montantVente) * 100).toFixed(1)}%</span>
                          <span style={{color: Number(f.depense) > Number(f.budgetHT) * 0.9 ? '#dc2626' : '#059669', fontWeight:600}}>Budget utilisé: {Number(f.budgetHT) > 0 ? (Number(f.depense) / Number(f.budgetHT) * 100).toFixed(0) : 0}%</span>
                        </div>)}
                      </div>
                      <div style={{display:'flex', gap:10, marginTop:8}}>
                        <button onClick={saveChantier} disabled={!f.nom || !f.client} style={{flex:1, padding:'10px 20px', borderRadius:crmRd, border:'none', background: (!f.nom || !f.client) ? '#f0ebe3' : 'linear-gradient(135deg, #059669, #047857)', color:'white', fontWeight:700, fontSize:'0.95rem', cursor: (!f.nom || !f.client) ? 'not-allowed' : 'pointer'}}>{modalChantier === 'add' ? '✅ Créer' : '💾 Enregistrer'}</button>
                        <button onClick={() => setModalChantier(null)} style={{padding:'10px 20px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>Annuler</button>
                      </div>
                    </div>);
                  })()}
                </div>
              </div>
            )}

      {/* ══════ ROADMAP — FEUILLE DE ROUTE STRATÉGIQUE (EDITABLE) ══════ */}
      {ongletActif === 'roadmap' && <TabRoadmap {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, addRoadmapItem, addRoadmapListItem, ca, crmRd, employes, filiales, filialesEnrichies, getKpiFiliale, removeRoadmapItem, removeRoadmapListItem, resetRoadmap, roadmapData, roadmapEditMode, roadmapEditTab, saveRoadmap, setRoadmapEditMode, setRoadmapEditTab, updateRoadmapField, updateRoadmapListItem }} />}

      {/* ══════ FACTURATION INTERNE — YILMAZ → FILIALES ══════ */}
      {ongletActif === 'fact_interne' && <TabFactInterne {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $success, $text, $textMut, $textSec, CONDITIONS_PAIEMENT, ca, crmRd, deleteFacture, factIntData, factIntPreview, factIntStyle, factIntTab, filialesEnrichies, genererFacture, getKpiFiliale, handlePrint, servicesYilmaz, setFactIntPreview, setFactIntStyle, setFactIntTab, toggleFactIntService, updateFactIntConfig, updateFacture }} />}

      {/* ══════ FACTURATION EXTERNE — FOURNISSEURS → FILIALES ══════ */}
      {/* ══════ FACTURATION EXTERNE — CRM PRESTATAIRES + FACTURES ══════ */}
      {ongletActif === 'fact_externe' && <TabFactExterne {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $shadowLg, $success, $text, $textMut, $textSec, $warn, CATS_PRESTA, CGV_DEFAULTS, CONDITIONS_PAIEMENT, CONTRAT_STATUTS, CONTRAT_TYPES, DOC_TYPES, MISSION_STATUTS, MODES_FACT, STATUTS_FACTEXT, TACHE_PRIORITES, TACHE_STATUTS, TYPES_PRESTA, ca, confirmRejet, contratEdit, contratView, crmRd, defaultFactColW, defaultPrestaColW, deleteFactExtEntry, deletePresta, expandedTache, factColW, factExtContratModal, factExtData, factExtFilter, factExtForm, factExtPrestaForm, factExtPreview, factExtTab, factExtView, factResizeRef, filiales, filialesEnrichies, missionViewMode, newComment, prestaColW, prestaDetailTab, prestaFilters, prestaNewCompetence, prestaNewContratRecuForm, prestaNewDocForm, prestaNewMissionForm, prestaNewTacheForm, prestaResizeRef, prestaSort, rejetModal, saveFactExtEntry, savePresta, setContratEdit, setContratView, setExpandedTache, setFactColW, setFactExtContratModal, setFactExtFilter, setFactExtForm, setFactExtPrestaForm, setFactExtPreview, setFactExtTab, setFactExtView, setMissionViewMode, setNewComment, setPrestaColW, setPrestaDetailTab, setPrestaFilters, setPrestaNewCompetence, setPrestaNewContratRecuForm, setPrestaNewDocForm, setPrestaNewMissionForm, setPrestaNewTacheForm, setPrestaSort, setRejetModal, setShowCGVEditor, showCGVEditor, updateFactExtStatut }} />}
      {/* ══════ YILMAZ NEW MODULE PLACEHOLDERS ══════ */}
      {/* ═══ BUDGET PRÉVISIONNEL MODULE ═══ */}
      {ongletActif === 'budget' && <TabBudget {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $shadowLg, $text, $textMut, $textSec, BUDGET_CATS, BUDGET_FILIALES, budgetAnnee, budgetApiConfig, budgetCopyPct, budgetData, budgetEditCell, budgetFiliale, budgetImportModal, budgetImportText, budgetRowEdit, budgetTab, crmRd, csvExportText, defaultApiConfig, defaultBudgetData, getBudgetForFiliale, moisCourts, saveBudget, saveBudgetApi, setBudgetAnnee, setBudgetCopyPct, setBudgetEditCell, setBudgetFiliale, setBudgetImportModal, setBudgetImportText, setBudgetRowEdit, setBudgetTab, setCsvExportText }} />}

      {/* ═══════════════════════ MODULE: TRÉSORERIE ═══════════════════════ */}
      {ongletActif === 'tresorerie' && <TabTresorerie {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, crmRd, setTresoFiliale, setTresoTab, tresoFiliale, tresoTab }} />}

        {/* ═══════════════════════ MODULE: ORGANIGRAMME BIS ════════════════ */}
      {/* organigramme_bis — disabled */}
      {ongletActif === 'recrutement' && <TabRecrutement {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, candidats, chantiers, crmRd, currentUser, empNom, filiales, filialesDynamiques, grille, postes, recruAddingFichier, recruBulkSel, recruCompare, recruCvParsing, recruCvPaste, recruDetail, recruDetailTab, recruDrag, recruEdit, recruFichierType, recruFichierUrl, recruFileViewer, recruFilter, recruIaLoading, recruIaResult, recruLinkedinUrl, recruNewFichier, recruNewMode, recruOffreIaLoading, recruOffreIaResult, recruSearch, recruSettingsOpen, recruView, setCandidats, setObEdit, setOngletActif, setPosteSelectionne, setPostes, setRecruAddingFichier, setRecruBulkSel, setRecruCompare, setRecruCvParsing, setRecruCvPaste, setRecruDetail, setRecruDetailTab, setRecruDrag, setRecruEdit, setRecruFichierType, setRecruFichierUrl, setRecruFileViewer, setRecruFilter, setRecruIaLoading, setRecruIaResult, setRecruLinkedinUrl, setRecruNewFichier, setRecruNewMode, setRecruOffreIaLoading, setRecruOffreIaResult, setRecruSearch, setRecruSettingsOpen, setRecruView, showBorderAccent }} />}

            {/* ══════ MODULE: BONS DE COMMANDE ══════ */}
      {ongletActif === 'bon_commande' && <TabBonCommande {...{ $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $danger, $info, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, bcData, bcEdit, bcFilter, bcSearch, crmRd, filterByFiliale, setBcData, setBcEdit, setBcFilter, setBcSearch }} />}

      {/* ══════ MODULE: ABSENCES & CONGÉS ══════ */}
      {ongletActif === 'absences' && <TabAbsences {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FILIALE_FILTER_OPTIONS, absColWidths, absData, absEdit, absFilter, absSettingsOpen, absView, absViewMonth, absVisibleCols, crmRd, filialeFilter, filialesDynamiques, filterByFiliale, getEmploye, getFiliale, highlightStyle, isYilmazContext, setAbsColWidths, setAbsData, setAbsEdit, setAbsFilter, setAbsSettingsOpen, setAbsView, setAbsViewMonth, setAbsVisibleCols, setFilialeFilter, toggleFilialeFilter }} />}

      {/* ══════ MODULE: FORMATION & HABILITATIONS ══════ */}
      {ongletActif === 'formation' && <TabFormation {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $selBg, $selText, $shadow, $shadowLg, $text, $textMut, $textSec, $warn, EmpLink, FilLink, crmRd, filialesDynamiques, filterByFiliale, formAlertView, formData, formEdit, formFilialeFilter, formFilter, formSettingsOpen, highlightStyle, isYilmazContext, setFormAlertView, setFormData, setFormEdit, setFormFilialeFilter, setFormFilter, setFormSettingsOpen, showBorderAccent }} />}

      {/* ══════ MODULE: SUIVI CONTRATS ══════ */}
      {ongletActif === 'contrats' && <TabContrats {...{ $accent, $bgCard, $bgCardHover, $bgSub, $border, $danger, $info, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, crmRd, ctrData, ctrEdit, ctrFilter, filiales, filterByFiliale, setCtrData, setCtrEdit, setCtrFilter }} />}

      {/* ══════ MODULE: TICKETS SUPPORT IT ══════ */}
      {ongletActif === 'tickets' && <TabTickets {...{ $accent, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $danger, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, crmRd, filterByFiliale, setTktData, setTktEdit, setTktFilter, setTktView, tktData, tktEdit, tktFilter, tktView }} />}

      {/* ══════ MODULE: OUTILS & LICENCES ══════ */}
      {ongletActif === 'outils' && <TabOutils {...{ $accent, $bgCard, $bgSub, $border, $danger, $shadow, $shadowLg, $text, $textMut, $textSec, chantiers, crmRd, empNom, otData, otEdit, setOtData, setOtEdit }} />}

      {/* ══════ MODULE: ANALYTIQUE ══════ */}
      {ongletActif === 'analytique' && <TabAnalytique {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, anaFiliale, anaTab, ca, crmRd, filiales, setAnaFiliale, setAnaTab }} />}

      {/* ══════ MODULE: ONBOARDING ══════ */}
      {ongletActif === 'onboarding' && <TabOnboarding {...{ $accent, $accentHover, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FilLink, chantiers, crmRd, empNom, filiales, filialesDynamiques, filterByFiliale, highlightStyle, isYilmazContext, obData, obDetailCat, obEdit, obFilialeFilter, obPosteFilter, obSettingsOpen, obStatutFilter, setObData, setObDetailCat, setObEdit, setObFilialeFilter, setObPosteFilter, setObSettingsOpen, setObStatutFilter }} />}

      {/* ══════ MODULE: OFFBOARDING ══════ */}
      {ongletActif === 'offboarding' && <TabOffboarding {...{ $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FilLink, chantiers, crmRd, currentUser, empNom, filterByFiliale, highlightStyle, obDetailCat, offData, offEdit, offMotifFilter, offPosteDecision, offSettingsOpen, offStatutFilter, postes, setOffData, setOffEdit, setOffMotifFilter, setOffPosteDecision, setOffSettingsOpen, setOffStatutFilter, setPostes }} />}

      {/* ══════ MODULE: DOSSIER RH ══════ */}
      {ongletActif === 'dossier_rh' && <TabDossierRh {...{ $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $info, $selBg, $selText, $shadow, $text, $textMut, $textSec, $warn, EmpLink, FilLink, crmRd, filNom, filterByFiliale, getEmploye, isYilmazContext, postes, rhData, rhFilter, rhSelected, rhSettingsOpen, rhTab, setRhData, setRhFilter, setRhSelected, setRhSettingsOpen, setRhTab }} />}

      {/* ══════ MODULE: SUIVI PRESTATAIRES ══════ */}
      {ongletActif === 'suivi_presta' && <TabSuiviPresta {...{ $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec, PrestaLink, crmRd, empNom, filNom, filterByFiliale, setSpData, setSpEdit, setSpFilter, spData, spFilter }} />}

      {/* ══════ MODULE: RÉCEPTION FACTURES ══════ */}
      {ongletActif === 'reception_factures' && <TabReceptionFactures {...{ $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FilLink, PrestaLink, crmRd, filterByFiliale, rfData, rfFilter, setRfData, setRfEdit, setRfFilter }} />}

      {/* ══════ MODULE: CATALOGUE PRESTATAIRES ══════ */}
      {ongletActif === 'catalogue_presta' && <TabCataloguePresta {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $shadowLg, $text, $textMut, $textSec, PrestaLink, cpData, cpEdit, cpFilter, cpSearch, crmRd, filiales, filterByFiliale, setCpData, setCpEdit, setCpFilter, setCpSearch }} />}

      {/* ══════ MODULE: LITIGES ══════ */}
      {ongletActif === 'litiges' && <TabLitiges {...{ $accent, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $danger, $selBg, $selText, $shadow, $shadowLg, $text, $textMut, $textSec, ChLink, FilLink, crmRd, filterByFiliale, highlightStyle, litData, litEdit, litFilter, setLitData, setLitEdit, setLitFilter }} />}

      {/* ══════ MODULE: ASSURANCES ══════ */}
      {ongletActif === 'assurances' && <TabAssurances {...{ $accent, $bgCard, $bgSub, $border, $shadow, $shadowLg, $text, $textMut, $textSec, assData, assTab, crmRd, filNom, filiales, filterByFiliale, setAssData, setAssEdit, setAssTab }} />}

      {/* ══════ MODULE: CONFORMITÉ BTP ══════ */}
      {ongletActif === 'conformite' && <TabConformite {...{ $bgCard, $border, $text, $textMut, $textSec, chantiers, crmRd, empNom, filNom, filiales, filterByFiliale }} />}

      {/* ══════ MODULE: IDENTITÉ VISUELLE ══════ */}
      {ongletActif === 'identite' && <TabIdentite {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $text, $textMut, $textSec, crmRd }} />}

      {/* ══════ MODULE: SUPPORTS COMMERCIAUX ══════ */}
      {ongletActif === 'supports' && <TabSupports {...{ $accent, $bgCard, $border, $text, $textMut, $textSec, crmRd, filNom, filiales }} />}

      {/* ══════ MODULE: PRÉSENCE WEB ══════ */}
      {ongletActif === 'web' && <TabWeb {...{ $accent, $bgCard, $border, $text, $textMut, $textSec, crmRd, filiales }} />}

      {/* ══════ MODULE: PARC INFORMATIQUE ══════ */}
      {ongletActif === 'parc_info' && <TabParcInfo {...{ $bgCard, $border, $shadow, $shadowLg, $text, $textMut, $textSec, FILIALE_FILTER_OPTIONS, crmRd, empNom, employes, parcInfoData, parcInfoDetail, parcInfoEdit, parcInfoFilter, setParcInfoData, setParcInfoDetail, setParcInfoEdit, setParcInfoFilter }} />}

      {/* ══════ MODULE: DONNÉES DE RÉFÉRENCE ══════ */}
      {ongletActif === 'donnees_ref' && <TabDonneesRef {...{ $accent, $bgCard, $border, $danger, $shadow, $shadowLg, $text, $textMut, $textSec, autoData, ca, chantiers, collaborateurs, crmRd, drTab, employes, filiales, filialesDynamiques, niveau, setCollabDetailTab, setCollabOngletId, setDrTab, setEmployeForm, setModalEmploye, setOngletActif }} />}

      {/* ══════ MODULE: ORDRES DE TRAVAIL ══════ */}
      {ongletActif === 'ordres_travail' && <TabOrdresTravail {...{ $accent, $bgCard, $bgSub, $border, $borderAlt, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, ChLink, FilLink, chNom, chantiers, crmRd, empNom, employes, filialesDynamiques, filterByFiliale, highlightStyle, odtData, odtEdit, odtFilter, odtView, setOdtData, setOdtEdit, setOdtFilter, setOdtView, showBorderAccent }} />}

      {/* ══════ MODULE: PARC AUTOMOBILE ══════ */}
      {ongletActif === 'parc_automobile' && <TabParcAutomobile {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FILIALE_FILTER_OPTIONS, autoColWidths, autoData, autoDetail, autoEdit, autoEtatLieux, autoFilialeFilter, autoFilter, autoFilterOpen, autoStatutFilter, autoTab, autoTabsRef, autoViewMode, autoVisibleCols, crmRd, ctStatut, empNom, employes, filialeFilter, filialesDynamiques, navEntreprise, setAutoColWidths, setAutoData, setAutoDetail, setAutoEdit, setAutoEtatLieux, setAutoFilialeFilter, setAutoFilter, setAutoFilterOpen, setAutoStatutFilter, setAutoTab, setAutoViewMode, setAutoVisibleCols, showBorderAccent }} />}
      {/* ══════ MODULE: PARC MATÉRIEL (hors véhicules) ══════ */}
      {ongletActif === 'materiel' && <TabMateriel {...{ $accent, $accentSub, $bgCard, $bgCardHover, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, FILIALE_FILTER_OPTIONS, chantiers, collaborateurs, crmRd, empNom, employes, filialeFilter, matAttest, matData, matDetail, matEdit, matFilialeFilter, matFilter, matFilterOpen, matTab, matVisibleCols, navEntreprise, setMatAttest, setMatData, setMatDetail, setMatEdit, setMatFilialeFilter, setMatFilter, setMatFilterOpen, setMatTab, setMatVisibleCols, showBorderAccent }} />}

      </div>
    </div>

      {/* ══════ Modal Confirmation Suppression ══════ */}
      {confirmDelete && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:210}} onClick={() => setConfirmDelete(null)}>
                <div style={{background:$bgCard, borderRadius:crmRd, padding:28, maxWidth:420, width:'100%', margin:'0 16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid #fecaca', textAlign:'center'}} onClick={e => e.stopPropagation()}>
                  <div style={{fontSize:'2.5rem', marginBottom:12}}>⚠️</div>
                  <div style={{fontSize:'1rem', fontWeight:800, color:$text, marginBottom:8}}>Confirmer la suppression</div>
                  <div style={{fontSize:'0.95rem', color:$textSec, marginBottom:20}}>
                    Voulez-vous vraiment supprimer <strong style={{color:'#dc2626'}}>{confirmDelete.nom}</strong> ?
                    <br/><span style={{fontSize:'0.92rem', color:$textMut}}>Cette action est irréversible.</span>
                  </div>
                  <div style={{display:'flex', gap:10, justifyContent:'center'}}>
                    <button onClick={() => confirmDelete.type === 'poste' ? (()=>{setPostes(prev=>prev.filter(x=>x.id!==confirmDelete.id));setPosteSelectionne(null);setPosteEditMode(false);setConfirmDelete(null);})() : confirmDelete.type === 'employe' ? deleteEmploye(confirmDelete.id) : deleteChantier(confirmDelete.id)} style={{padding:'10px 24px', borderRadius:crmRd, border:'none', background:'linear-gradient(135deg, #dc2626, #b91c1c)', color:'white', fontWeight:700, fontSize:'0.95rem', cursor:'pointer'}}>🗑️ Supprimer</button>
                    <button onClick={() => setConfirmDelete(null)} style={{padding:'10px 24px', borderRadius:crmRd, border:`1px solid ${$border}`, background:$bgCard, color:$textSec, fontWeight:600, fontSize:'0.95rem', cursor:'pointer'}}>Annuler</button>
                  </div>
                </div>
              </div>
            )}

      {/* Theme Settings Modal */}
      {crmPal && crmLayout==='sidebar' && <div onClick={()=>setCrmPal(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'transparent',zIndex:99999}}>
        <div onClick={e=>e.stopPropagation()} style={{position:'absolute',top:52,right:20,background:$bgCard,borderRadius:crmRd,width:320,maxHeight:'80vh',overflow:'auto',boxShadow:'0 12px 40px rgba(0,0,0,0.15)',padding:20,border:`1px solid ${$borderAlt}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><span style={{fontWeight:700,fontSize:'0.95rem',color:$text}}>{String.fromCodePoint(0x1F3A8)} Apparence</span><button onClick={()=>setCrmPal(false)} style={{background:'none',border:'none',color:$textMut,cursor:'pointer',fontSize:'1.2rem'}}>{String.fromCodePoint(0x2715)}</button></div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Thème</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_THEMES).map(([id,th])=>(<button key={id} onClick={()=>setCrmTheme(id)} style={{padding:'10px 14px',borderRadius:crmRd,border:'1px solid '+(crmTheme===id?crmAcc:'#e8e4de'),background:crmTheme===id?crmAcc+'12':'transparent',color:crmTheme===id?$text:'#b0a08a',fontWeight:crmTheme===id?600:400,fontSize:'0.82rem',cursor:'pointer',fontFamily:'inherit',textAlign:'left',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><span style={{fontSize:'0.95rem'}}>{th.name.split(' ')[0]}</span><span>{th.name.split(' ').slice(1).join(' ')}</span></button>))}</div></div>
            {!crmTh.isDark&&<div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Couleur de fond {crmTint&&<span style={{fontSize:'0.65rem',fontWeight:400,color:crmAcc}}>{String.fromCodePoint(0x2014)} {CRM_TINTS[crmTint]?.n}</span>}</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5}}>{Object.entries(CRM_TINTS).map(([id,tn])=>(<button key={id} onClick={()=>setCrmTint(crmTint===id?null:id)} style={{padding:'6px 4px',borderRadius:crmRd,border:'2px solid '+(crmTint===id?crmAcc:'#e8e4de'),background:crmTint===id?crmAcc+'12':'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,boxShadow:crmTint===id?'0 0 0 1px '+crmAcc:'none',transition:'all 0.15s'}}><div style={{width:18,height:18,borderRadius:'50%',background:tn.c,border:'1px solid #e8e4de'}}/><span style={{fontSize:'0.6rem',color:crmTint===id?$text:'#b0a08a',fontWeight:crmTint===id?600:400}}>{tn.n}</span></button>))}</div><div style={{marginTop:8,opacity:crmTint?1:0.35,pointerEvents:crmTint?'auto':'none'}}><div style={{fontSize:'0.65rem',color:'#b0a08a',marginBottom:4}}>Intensité du fond</div><div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:'1px solid #e8e4de',width:'fit-content'}}>{[{i:0,l:'Léger'},{i:1,l:'Moyen'},{i:2,l:'Fort'}].map(lv=><button key={lv.i} onClick={()=>setCrmTintLvl(lv.i)} style={{padding:'4px 12px',borderRadius:Math.max((crmRd)-2,0),border:'none',cursor:'pointer',background:crmTintLvl===lv.i?crmAcc:'transparent',color:crmTintLvl===lv.i?'#fff':'#b0a08a',fontWeight:crmTintLvl===lv.i?600:400,fontSize:'0.72rem',fontFamily:'inherit',transition:'all 0.15s'}}>{lv.l}</button>)}</div></div></div>}
            <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Arrondi des bords</div><div style={{display:'flex',gap:4}}>{CRM_RAD.map(opt=>(<button key={opt.id} onClick={()=>setCrmRadius(opt.id)} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmRadius===opt.id?crmAcc:'#e8e4de'),background:crmRadius===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><div style={{width:28,height:20,borderRadius:opt.v+'px',border:'2px solid '+(crmRadius===opt.id?crmAcc:'#b0a08a'),transition:'all 0.15s'}}/><span style={{fontSize:'0.72rem',fontWeight:crmRadius===opt.id?600:400,color:crmRadius===opt.id?'#2d2216':'#b0a08a'}}>{opt.l}</span><span style={{fontSize:'0.58rem',color:'#b0a08a'}}>{opt.d}</span><span style={{fontSize:'0.55rem',color:crmRadius===opt.id?crmAcc:'#c4bfb6',fontWeight:500}}>{opt.s}</span></button>))}</div></div>
            <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Navigation</div><div style={{display:'flex',gap:4}}>{[{id:'cartes',l:'Cartes',sub:'Par cartes',icon:'☰'},{id:'sidebar',l:'Sidebar',sub:'Panneau latéral',icon:'◫'}].map(opt=>(<button key={opt.id} onClick={()=>{setCrmLayout(opt.id);if(opt.id==='sidebar'&&!navEntreprise){setNavEntreprise('groupoy');setOngletActif('dashboard');}}} style={{flex:1,padding:'10px',borderRadius:crmRd,border:'1px solid '+(crmLayout===opt.id?crmAcc:'#e8e4de'),background:crmLayout===opt.id?crmAcc+'12':'transparent',cursor:'pointer',fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:4,transition:'all 0.15s'}}><span style={{fontSize:'1rem'}}>{opt.icon}</span><span style={{fontSize:'0.72rem',fontWeight:crmLayout===opt.id?600:400,color:crmLayout===opt.id?$text:'#b0a08a'}}>{opt.l}</span><span style={{fontSize:'0.58rem',color:$textMut}}>{opt.sub}</span></button>))}</div></div>
            <div><div style={{fontSize:'0.72rem',fontWeight:700,color:$text,marginBottom:8}}>Accent filiale</div><div style={{display:'flex',flexDirection:'column',gap:4}}>{Object.entries(CRM_FIL_ACC).map(([id,color])=>{const isA=navEntreprise===id||(!navEntreprise&&id==='groupoy');return(<div key={id} style={{padding:'8px 12px',borderRadius:crmRd,border:'1px solid '+(isA?color:'#e8e4de'),background:isA?color+'12':'transparent',display:'flex',alignItems:'center',gap:8,transition:'all 0.15s'}}><div style={{width:16,height:16,borderRadius:'50%',background:color,flexShrink:0}}/><span style={{fontSize:'0.78rem',fontWeight:isA?600:400,color:isA?$text:'#b0a08a'}}>{CRM_FIL_ICONS[id]} {CRM_FIL_NAMES[id]}</span>{isA&&<span style={{marginLeft:'auto',fontSize:'0.6rem',color:color,fontWeight:700}}>actif</span>}</div>);})}</div></div>
          </div>
        </div>
      </div>}
      {/* IT Chat */}
      {isLoggedIn && !crmChat && (() => <button onClick={()=>setCrmChat(true)} style={{position:'fixed',bottom:20,right:20,width:52,height:52,borderRadius:crmRd>0?26:4,border:'none',background:crmAcc,color:'#fff',fontSize:'1.3rem',cursor:'pointer',boxShadow:'0 4px 20px rgba(0,0,0,0.2)',zIndex:9990,display:'flex',alignItems:'center',justifyContent:'center',transition:'transform 0.2s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>{String.fromCodePoint(0x1F4AC)}</button>)()}
      {isLoggedIn && crmChat && (() => {
        const send = (txt) => { const h=new Date().getHours().toString().padStart(2,'0')+':'+new Date().getMinutes().toString().padStart(2,'0'); setCrmChatMsgs(p=>[...p,{f:'user',t:txt,h}]); setCrmChatMsg(''); setTimeout(()=>setCrmChatMsgs(p=>[...p,{f:'it',t:'Bien reçu. Nous traitons votre demande.',h}]),800); };
        return (<div style={{position:'fixed',bottom:20,right:20,width:340,height:440,background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9990,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'12px 16px',background:crmAcc,color:'white',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:700,fontSize:'0.88rem'}}>{String.fromCodePoint(0x1F4AC)} Support IT</div><div style={{fontSize:'0.68rem',opacity:0.8}}>Group OY</div></div><button onClick={()=>setCrmChat(false)} style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',cursor:'pointer',width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{String.fromCodePoint(0x2715)}</button></div>
          <div style={{flex:1,overflow:'auto',padding:'12px 14px',display:'flex',flexDirection:'column',gap:8}}>{crmChatMsgs.map((m,i)=><div key={i} style={{display:'flex',flexDirection:'column',alignItems:m.f==='user'?'flex-end':'flex-start'}}><div style={{padding:'8px 12px',borderRadius:crmRd>0?crmRd:4,maxWidth:'85%',fontSize:'0.8rem',lineHeight:1.4,background:m.f==='user'?crmAcc:'#f5f0e6',color:m.f==='user'?'white':'#2d2216'}}>{m.t}</div><span style={{fontSize:'0.6rem',color:$textMut,marginTop:2}}>{m.f==='user'?'Vous':'IT'} {m.h}</span></div>)}</div>
          <div style={{padding:'6px 12px',borderTop:`1px solid ${$borderAlt}`,display:'flex',gap:4,flexWrap:'wrap'}}>{['Ticket','Accès','Panne','Email'].map((q,i)=><button key={i} onClick={()=>send(q)} style={{padding:'4px 8px',borderRadius:crmRd,border:`1px solid ${$borderAlt}`,background:'transparent',color:$textSec,fontSize:'0.68rem',cursor:'pointer',fontFamily:'inherit'}}>{q}</button>)}</div>
          <div style={{padding:'12px 14px',borderTop:`1px solid ${$borderAlt}`,display:'flex',gap:6}}><input value={crmChatMsg} onChange={e=>setCrmChatMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&crmChatMsg.trim())send(crmChatMsg);}} placeholder="Message..." style={{flex:1,padding:'8px 12px',borderRadius:crmRd,border:`1px solid ${$borderAlt}`,background:$bgCard,color:$text,fontSize:'0.8rem',fontFamily:'inherit',outline:'none'}}/><button onClick={()=>{if(crmChatMsg.trim())send(crmChatMsg);}} style={{padding:'8px 14px',borderRadius:crmRd,border:'none',background:crmAcc,color:'white',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>{String.fromCodePoint(0x2191)}</button></div>
        </div>);
      })()}
    </>
  );
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes waveSlide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}

export default SimulateurRuches;
