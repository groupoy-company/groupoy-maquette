// === Référentiel des modules (source unique) ===
// Icône, libellé, description et couleur de chaque module de l'application.
// Utilisé par les cartes de service, la barre latérale et la palette de commandes.

export const MODULES = {
  aujourdhui: { icon: '🌅', label: "Aujourd'hui", desc: 'Ce qui vous attend : retards, validations, pouls du groupe', color: '#d4a030' },
  documents: { icon: '📁', label: 'Documents', desc: 'Coffre-fort documentaire — plans, contrats, factures, photos', color: '#0891b2' },
  centre_echeances: { icon: '⏰', label: "Centre d'échéances", desc: 'Assurances, CT, leasings, contrats, conformité, AO — toutes les dates clés', color: '#d4a030' },
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
