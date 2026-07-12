// === Données de configuration : rôles, services, permissions, utilisateurs initiaux ===
// Extrait de App.jsx lors de la modularisation (étape 1).

export const ROLES = {
  SUPER_ADMIN: { label: 'Super Admin', level: 4, color: '#dc2626', icon: '◆', description: 'Accès total + gestion de tous les droits' },
  ADMIN: { label: 'Admin', level: 3, color: '#f59e0b', icon: '◆', description: 'Accès total sauf gestion Super Admin' },
  MANAGER: { label: 'Manager', level: 2, color: '#3b82f6', icon: '◇', description: 'Accès aux onglets autorisés + gestion équipe' },
  USER: { label: 'Utilisateur', level: 1, color: '#22c55e', icon: '○', description: 'Accès aux onglets autorisés' }
};

// Catégories de rôles
export const NIVEAUX_HIERARCHIQUES = [
  { id: 'PDG', label: 'PDG', icon: '👑' },
  { id: 'DG', label: 'Directeur Général', icon: '🏛️' },
  { id: 'DAF', label: 'Directeur Administratif & Financier', icon: '💰' },
  { id: 'DIRECTEUR', label: 'Directeur / Responsable', icon: '📋' },
  { id: 'CHEF_SERVICE', label: 'Chef de Service', icon: '🔧' },
  { id: 'CHARGE', label: 'Chargé(e) / Référent(e)', icon: '📌' },
  { id: 'EMPLOYE', label: 'Employé(e)', icon: '👤' }
];

export const SERVICES = [
  { id: 'DIRECTION', label: 'Direction Générale', icon: '🏛️' },
  { id: 'FINANCE', label: 'Finance / Comptabilité', icon: '💰' },
  { id: 'RH', label: 'Ressources Humaines', icon: '👥' },
  { id: 'OPERATIONS', label: 'Opérations / Production', icon: '🏗️' },
  { id: 'COMMERCIAL', label: 'Commercial / Relation Client', icon: '🤝' },
  { id: 'IT', label: 'IT / Digital', icon: '💻' },
  { id: 'MARKETING', label: 'Marketing / Communication', icon: '📢' },
  { id: 'QUALITE', label: 'Qualité / Sécurité', icon: '🛡️' }
];

export const NIVEAUX_ACCES = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', icon: '◆', desc: 'Tout voir, tout modifier, gérer les droits' },
  { id: 'ADMIN', label: 'Admin', icon: '◆', desc: 'Tout voir et modifier' },
  { id: 'MANAGER', label: 'Manager', icon: '◇', desc: 'Voir + modifier son périmètre' },
  { id: 'LECTEUR', label: 'Lecteur', icon: '○', desc: 'Consultation uniquement' }
];

export const PERMISSION_LEVELS = { HIDDEN: 'hidden', READ: 'read', WRITE: 'write' };

export const DEFAULT_PERMISSIONS = {
  SUPER_ADMIN: { dashboard: 'write', collaborateurs: 'write', postes: 'write', presentation: 'write', organigramme: 'write', organigramme_bis: 'write', simulateur: 'write', suivi: 'write', admin: 'write' },
  ADMIN: { dashboard: 'write', collaborateurs: 'write', postes: 'write', presentation: 'write', organigramme: 'write', organigramme_bis: 'write', simulateur: 'write', suivi: 'write', admin: 'write' },
  MANAGER: { dashboard: 'read', collaborateurs: 'write', postes: 'read', presentation: 'read', organigramme: 'read', organigramme_bis: 'read', simulateur: 'read', suivi: 'write', admin: 'hidden' },
  USER: { dashboard: 'read', collaborateurs: 'read', postes: 'read', presentation: 'read', organigramme: 'read', organigramme_bis: 'read', simulateur: 'read', suivi: 'read', admin: 'hidden' }
};

export const INITIAL_USERS = [
  { id: 'USR001', login: 'ozdogan', password: 'admin2025', prenom: 'Özdoğan', nom: 'YILMAZ', role: 'SUPER_ADMIN', niveauHierarchique: 'PDG', service: 'DIRECTION', niveauAcces: 'SUPER_ADMIN', employeId: 'EMP001', permissions: {...DEFAULT_PERMISSIONS.SUPER_ADMIN}, actif: true, derniereConnexion: null },
  { id: 'USR002', login: 'ozlem.yilmaz', password: 'oyilmaz25', prenom: 'Ozlem', nom: 'YILMAZ', role: 'ADMIN', niveauHierarchique: 'DG', service: 'DIRECTION', niveauAcces: 'ADMIN', employeId: 'EMP002', permissions: {...DEFAULT_PERMISSIONS.ADMIN}, actif: true, derniereConnexion: null },
  { id: 'USR003', login: 'anthony.robert', password: 'arobert25', prenom: 'Anthony', nom: 'ROBERT', role: 'MANAGER', niveauHierarchique: 'DAF', service: 'FINANCE', niveauAcces: 'MANAGER', employeId: 'EMP003', permissions: {...DEFAULT_PERMISSIONS.MANAGER, postes: 'write'}, actif: true, derniereConnexion: null },
  { id: 'USR004', login: 'sophie.martin', password: 'smartin25', prenom: 'Sophie', nom: 'MARTIN', role: 'MANAGER', niveauHierarchique: 'CHEF_SERVICE', service: 'RH', niveauAcces: 'MANAGER', employeId: 'EMP004', permissions: {...DEFAULT_PERMISSIONS.MANAGER, collaborateurs: 'write', postes: 'write'}, actif: true, derniereConnexion: null },
  { id: 'USR005', login: 'laurent.petit', password: 'lpetit25', prenom: 'Laurent', nom: 'PETIT', role: 'MANAGER', niveauHierarchique: 'DIRECTEUR', service: 'OPERATIONS', niveauAcces: 'MANAGER', employeId: 'EMP005', permissions: {...DEFAULT_PERMISSIONS.MANAGER}, actif: true, derniereConnexion: null },
  { id: 'USR006', login: 'loetitia.lequerrec', password: 'llequerrec25', prenom: 'Loetitia', nom: 'LEQUERREC', role: 'MANAGER', niveauHierarchique: 'DIRECTEUR', service: 'OPERATIONS', niveauAcces: 'MANAGER', employeId: 'EMP006', permissions: {...DEFAULT_PERMISSIONS.MANAGER}, actif: true, derniereConnexion: null },
  { id: 'USR008', login: 'sarah.ciccolallo', password: 'sciccolallo25', prenom: 'Sarah', nom: 'CICCOLALLO', role: 'MANAGER', niveauHierarchique: 'CHARGE', service: 'RH', niveauAcces: 'MANAGER', employeId: 'EMP014', permissions: { dashboard: 'read', collaborateurs: 'write', postes: 'write', presentation: 'read', organigramme: 'read', simulateur: 'read', suivi: 'read', admin: 'hidden' }, actif: true, derniereConnexion: null },
  { id: 'USR009', login: 'diane.arulsothy', password: 'darulsothy25', prenom: 'Diane', nom: 'ARULSOTHY', role: 'MANAGER', niveauHierarchique: 'DIRECTEUR', service: 'OPERATIONS', niveauAcces: 'MANAGER', employeId: 'EMP015', permissions: {...DEFAULT_PERMISSIONS.MANAGER}, actif: true, derniereConnexion: null },
  { id: 'USR010', login: 'nadia.ferreira', password: 'nferreira25', prenom: 'Nadia', nom: 'FERREIRA', role: 'MANAGER', niveauHierarchique: 'DIRECTEUR', service: 'OPERATIONS', niveauAcces: 'MANAGER', employeId: 'EMP016', permissions: {...DEFAULT_PERMISSIONS.MANAGER}, actif: true, derniereConnexion: null }
];
