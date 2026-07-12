// === Onglet « onboarding » — extrait de App.jsx (modularisation, forme iife) ===


export default function TabOnboarding(__props) {
  const { $accent, $accentHover, $accentSub, $bgCard, $bgSub, $border, $borderAlt, $borderLight, $danger, $info, $selBg, $selText, $shadow, $shadowLg, $success, $text, $textMut, $textSec, $warn, EmpLink, FilLink, chantiers, crmRd, empNom, filiales, filialesDynamiques, filterByFiliale, highlightStyle, isYilmazContext, obData, obDetailCat, obEdit, obFilialeFilter, obPosteFilter, obSettingsOpen, obStatutFilter, setObData, setObDetailCat, setObEdit, setObFilialeFilter, setObPosteFilter, setObSettingsOpen, setObStatutFilter } = __props;
        // ─── BTP Onboarding Checklists par poste ───
        const OB_POSTES = [
          {id:'ouvrier_btp', label:'Ouvrier BTP', icon:'⛏', color:'#f59e0b'},
          {id:'chef_chantier', label:'Chef de chantier', icon:'🪖', color:'#ef4444'},
          {id:'charge_affaires', label:"Chargé d'affaires", icon:'☰', color:'#3b82f6'},
          {id:'conducteur_travaux', label:'Conducteur de travaux', icon:'◆', color:'#8b5cf6'},
          {id:'assistante_admin', label:'Assistante administrative', icon:'🗂', color:'#10b981'},
          {id:'direction', label:'Direction / Cadre', icon:'👔', color:'#1e40af'}
        ];
        const OB_CHECKLISTS = {
          ouvrier_btp: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail signé (CDI/CDD chantier)', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité / Titre de séjour vérifié', obligatoire:true, delai:'Avant J1'},
              {t:'RIB reçu', obligatoire:true, delai:'J1'},
              {t:'Carte vitale / attestation SS', obligatoire:true, delai:'J1'},
              {t:'Inscription CIBTP (Caisse Congés Payés BTP)', obligatoire:true, delai:'S1'},
              {t:'Demande carte BTP (obligatoire chantier)', obligatoire:true, delai:'S1'},
              {t:'Inscription registre unique du personnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'Santé & Sécurité', items:[
              {t:'Visite médicale d\'aptitude (SIR — avant prise de poste)', obligatoire:true, delai:'Avant J1'},
              {t:'Fiche d\'aptitude médicale reçue', obligatoire:true, delai:'Avant J1'},
              {t:'Remise EPI complets (casque, chaussures, gants, gilet, lunettes)', obligatoire:true, delai:'J1'},
              {t:'Fiche remise EPI signée', obligatoire:true, delai:'J1'},
              {t:'Formation accueil sécurité chantier', obligatoire:true, delai:'J1'},
              {t:'Sensibilisation risque amiante (SS4)', obligatoire:true, delai:'S1'},
              {t:'Formation gestes et postures', obligatoire:false, delai:'M1'}
            ]},
            {cat:'Habilitations', items:[
              {t:'Vérification CACES existants', obligatoire:false, delai:'S1'},
              {t:'Formation travail en hauteur / port du harnais', obligatoire:true, delai:'S1'},
              {t:'Habilitation électrique (si concerné)', obligatoire:false, delai:'M1'}
            ]},
            {cat:'Social & Prévoyance', items:[
              {t:'Adhésion mutuelle BTP (obligatoire)', obligatoire:true, delai:'J1'},
              {t:'Adhésion prévoyance BTP', obligatoire:true, delai:'J1'},
              {t:'Remise notice mutuelle + prévoyance', obligatoire:true, delai:'J1'}
            ]},
            {cat:'Intégration', items:[
              {t:'Présentation équipe et tuteur/parrain', obligatoire:true, delai:'J1'},
              {t:'Livret d\'accueil remis', obligatoire:true, delai:'J1'},
              {t:'Visite dépôt / locaux', obligatoire:false, delai:'J1'},
              {t:'Règlement intérieur signé', obligatoire:true, delai:'S1'},
              {t:'Charte utilisation véhicules signée', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace (@ezel.fr / @laroulotte.fr)', obligatoire:false, delai:'Avant J1'},
              {t:'Photo identité pour profil (email, badge)', obligatoire:false, delai:'S1'},
              {t:'Ajout aux listes de diffusion (équipe chantier)', obligatoire:false, delai:'S1'}
            ]},
            {cat:'🚗 Véhicule & Déplacements', items:[
              {t:'Attribution véhicule de service (Kangoo / utilitaire)', obligatoire:false, delai:'J1'},
              {t:'Remise clés + carte carburant + télépéage', obligatoire:false, delai:'J1'},
              {t:'État des lieux véhicule signé', obligatoire:false, delai:'J1'},
              {t:'Vérification permis de conduire', obligatoire:false, delai:'Avant J1'},
              {t:'Charte utilisation véhicule signée', obligatoire:false, delai:'S1'}
            ]},
            {cat:'👷 EPI & Vêtements de travail', items:[
              {t:'Tailles recueillies (veste, pantalon, chaussures)', obligatoire:true, delai:'Avant J1'},
              {t:'Casque de chantier (personnalisé si besoin)', obligatoire:true, delai:'J1'},
              {t:'Chaussures de sécurité', obligatoire:true, delai:'J1'},
              {t:'Gilet haute visibilité', obligatoire:true, delai:'J1'},
              {t:'Gants de protection', obligatoire:true, delai:'J1'},
              {t:'Lunettes de protection', obligatoire:true, delai:'J1'},
              {t:'Vêtements de travail (pantalon + veste)', obligatoire:false, delai:'S1'},
              {t:'Harnais antichute (si travail en hauteur)', obligatoire:false, delai:'S1'},
              {t:'Bouchons d\'oreilles / casque antibruit', obligatoire:false, delai:'S1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive dossier équipe', obligatoire:false, delai:'S1'},
              {t:'Partage dossier procédures sécurité', obligatoire:true, delai:'J1'},
              {t:'Accès dossier modèles (bons, rapports)', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📚 Formations', items:[
              {t:'Formation accueil sécurité (obligatoire)', obligatoire:true, delai:'J1'},
              {t:'Formation outillage spécifique', obligatoire:false, delai:'S1'},
              {t:'Planning formation CACES (si besoin)', obligatoire:false, delai:'M1'},
              {t:'Formation amiante SS4 (si concerné)', obligatoire:false, delai:'M1'}
            ]}
          ],
          chef_chantier: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail signé', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité / Titre de séjour', obligatoire:true, delai:'Avant J1'},
              {t:'RIB reçu', obligatoire:true, delai:'J1'},
              {t:'Carte vitale / attestation SS', obligatoire:true, delai:'J1'},
              {t:'Inscription CIBTP', obligatoire:true, delai:'S1'},
              {t:'Demande carte BTP', obligatoire:true, delai:'S1'},
              {t:'Inscription registre unique du personnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'Santé & Sécurité', items:[
              {t:'Visite médicale d\'aptitude (SIR)', obligatoire:true, delai:'Avant J1'},
              {t:'Remise EPI complets', obligatoire:true, delai:'J1'},
              {t:'Formation accueil sécurité', obligatoire:true, delai:'J1'},
              {t:'Formation amiante SS4 (encadrement)', obligatoire:true, delai:'S1'},
              {t:'Formation SST (Sauveteur Secouriste)', obligatoire:true, delai:'M1'},
              {t:'Formation échafaudage (montage/réception)', obligatoire:true, delai:'M1'}
            ]},
            {cat:'Habilitations', items:[
              {t:'CACES engins de chantier (si concerné)', obligatoire:false, delai:'M1'},
              {t:'Habilitation travail en hauteur', obligatoire:true, delai:'S1'},
              {t:'Habilitation électrique BS/BE', obligatoire:false, delai:'M1'},
              {t:'Autorisation de conduite véhicule société', obligatoire:false, delai:'S1'}
            ]},
            {cat:'Social & Prévoyance', items:[
              {t:'Adhésion mutuelle BTP', obligatoire:true, delai:'J1'},
              {t:'Adhésion prévoyance BTP', obligatoire:true, delai:'J1'},
              {t:'Véhicule de fonction (si applicable)', obligatoire:false, delai:'S1'}
            ]},
            {cat:'IT & Intégration', items:[
              {t:'Smartphone professionnel configuré', obligatoire:true, delai:'J1'},
              {t:'Accès logiciel suivi chantier', obligatoire:true, delai:'S1'},
              {t:'Présentation équipe + responsables', obligatoire:true, delai:'J1'},
              {t:'Livret d\'accueil + règlement intérieur', obligatoire:true, delai:'J1'},
              {t:'Visite chantiers en cours', obligatoire:true, delai:'S1'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace', obligatoire:true, delai:'Avant J1'},
              {t:'Configuration signature email (template Group OY)', obligatoire:true, delai:'J1'},
              {t:'Photo professionnelle pour profil', obligatoire:false, delai:'S1'},
              {t:'Ajout aux listes de diffusion (direction chantier, RH)', obligatoire:true, delai:'J1'},
              {t:'Configuration email sur téléphone professionnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'💻 Accès Logiciels', items:[
              {t:'Compte Monday.com créé (workspace Yilmaz)', obligatoire:true, delai:'J1'},
              {t:'Formation Monday.com — gestion chantier', obligatoire:true, delai:'S1'},
              {t:'Accès Pennylane (consultation budgets)', obligatoire:false, delai:'S1'},
              {t:'Accès CRM Group OY', obligatoire:true, delai:'S1'},
              {t:'Compte Google Workspace (Drive, Agenda, Meet)', obligatoire:true, delai:'J1'}
            ]},
            {cat:'🚗 Véhicule & Déplacements', items:[
              {t:'Attribution véhicule de service / fonction', obligatoire:true, delai:'J1'},
              {t:'Remise clés + carte carburant + badge télépéage', obligatoire:true, delai:'J1'},
              {t:'État des lieux véhicule signé', obligatoire:true, delai:'J1'},
              {t:'Copie permis de conduire dans dossier', obligatoire:true, delai:'Avant J1'},
              {t:'Assurance véhicule vérifiée', obligatoire:true, delai:'J1'},
              {t:'Charte utilisation véhicule signée', obligatoire:true, delai:'J1'}
            ]},
            {cat:'✱ Matériel & Équipements', items:[
              {t:'Téléphone professionnel (si poste le requiert)', obligatoire:true, delai:'J1'},
              {t:'Tablette chantier configurée', obligatoire:false, delai:'S1'},
              {t:'Outillage métré / laser', obligatoire:false, delai:'J1'},
              {t:'Badge accès dépôt / bureaux', obligatoire:true, delai:'J1'}
            ]},
            {cat:'👷 EPI & Vêtements', items:[
              {t:'Tailles recueillies (veste, pantalon, chaussures)', obligatoire:true, delai:'Avant J1'},
              {t:'Kit EPI complet (casque, chaussures, gilet, gants, lunettes)', obligatoire:true, delai:'J1'},
              {t:'Vêtements de travail floqués (logo entreprise)', obligatoire:false, delai:'S1'},
              {t:'Harnais antichute', obligatoire:false, delai:'S1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive — dossiers chantiers', obligatoire:true, delai:'J1'},
              {t:'Partage dossier templates (PPSPS, DOE, PV)', obligatoire:true, delai:'J1'},
              {t:'Accès dossier procédures qualité', obligatoire:true, delai:'S1'},
              {t:'Accès dossier sous-traitants', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📚 Formations Logiciels', items:[
              {t:'Formation Monday.com (suivi chantier, planning)', obligatoire:true, delai:'S1'},
              {t:'Formation Google Workspace (Drive, Agenda)', obligatoire:true, delai:'S1'},
              {t:'Formation CRM Group OY (saisie heures, BC)', obligatoire:false, delai:'M1'},
              {t:'Formation Pennylane (consultation)', obligatoire:false, delai:'M1'}
            ]}
          ],
          charge_affaires: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail signé', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité', obligatoire:true, delai:'Avant J1'},
              {t:'RIB reçu', obligatoire:true, delai:'J1'},
              {t:'Carte vitale / attestation SS', obligatoire:true, delai:'J1'},
              {t:'Inscription CIBTP', obligatoire:true, delai:'S1'},
              {t:'Demande carte BTP', obligatoire:true, delai:'S1'}
            ]},
            {cat:'Santé & Sécurité', items:[
              {t:'Visite médicale (VIP ou SIR selon poste)', obligatoire:true, delai:'<3 mois'},
              {t:'EPI pour visites chantier', obligatoire:true, delai:'J1'},
              {t:'Sensibilisation sécurité chantier', obligatoire:true, delai:'S1'},
              {t:'Sensibilisation amiante SS4', obligatoire:true, delai:'M1'}
            ]},
            {cat:'Social & Prévoyance', items:[
              {t:'Adhésion mutuelle BTP', obligatoire:true, delai:'J1'},
              {t:'Adhésion prévoyance BTP', obligatoire:true, delai:'J1'}
            ]},
            {cat:'IT & Outils', items:[
              {t:'PC portable configuré', obligatoire:true, delai:'J1'},
              {t:'Smartphone professionnel', obligatoire:true, delai:'J1'},
              {t:'Comptes Google Workspace', obligatoire:true, delai:'J1'},
              {t:'Accès logiciel devis / facturation', obligatoire:true, delai:'S1'},
              {t:'Formation outils internes', obligatoire:true, delai:'S1'}
            ]},
            {cat:'Intégration', items:[
              {t:'Présentation direction + équipe', obligatoire:true, delai:'J1'},
              {t:'Livret d\'accueil + charte', obligatoire:true, delai:'J1'},
              {t:'Tour des chantiers en cours', obligatoire:true, delai:'S1'},
              {t:'Transmission portefeuille affaires', obligatoire:true, delai:'S1-S2'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace', obligatoire:true, delai:'Avant J1'},
              {t:'Configuration signature email (template Group OY)', obligatoire:true, delai:'J1'},
              {t:'Photo professionnelle pour profil', obligatoire:false, delai:'S1'},
              {t:'Ajout aux listes de diffusion (direction chantier, RH)', obligatoire:true, delai:'J1'},
              {t:'Configuration email sur téléphone professionnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'💻 Accès Logiciels', items:[
              {t:'Compte Monday.com créé (workspace Yilmaz)', obligatoire:true, delai:'J1'},
              {t:'Formation Monday.com — suivi affaires', obligatoire:true, delai:'S1'},
              {t:'Accès Pennylane (consultation budgets)', obligatoire:false, delai:'S1'},
              {t:'Accès CRM Group OY', obligatoire:true, delai:'S1'},
              {t:'Compte Google Workspace (Drive, Agenda, Meet)', obligatoire:true, delai:'J1'}
            ]},
            {cat:'🚗 Véhicule & Déplacements', items:[
              {t:'Attribution véhicule de service / fonction', obligatoire:true, delai:'J1'},
              {t:'Remise clés + carte carburant + badge télépéage', obligatoire:true, delai:'J1'},
              {t:'État des lieux véhicule signé', obligatoire:true, delai:'J1'},
              {t:'Copie permis de conduire dans dossier', obligatoire:true, delai:'Avant J1'},
              {t:'Assurance véhicule vérifiée', obligatoire:true, delai:'J1'},
              {t:'Charte utilisation véhicule signée', obligatoire:true, delai:'J1'}
            ]},
            {cat:'✱ Matériel & Équipements', items:[
              {t:'Téléphone professionnel (si poste le requiert)', obligatoire:true, delai:'J1'},
              {t:'Tablette ou laptop terrain', obligatoire:false, delai:'S1'},
              {t:'Outillage métré / laser', obligatoire:false, delai:'J1'},
              {t:'Badge accès dépôt / bureaux', obligatoire:true, delai:'J1'}
            ]},
            {cat:'👷 EPI & Vêtements', items:[
              {t:'Tailles recueillies (veste, pantalon, chaussures)', obligatoire:true, delai:'Avant J1'},
              {t:'Kit EPI complet (casque, chaussures, gilet, gants, lunettes)', obligatoire:true, delai:'J1'},
              {t:'Vêtements de travail floqués (logo entreprise)', obligatoire:false, delai:'S1'},
              {t:'Harnais antichute', obligatoire:false, delai:'S1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive — dossiers chantiers', obligatoire:true, delai:'J1'},
              {t:'Partage dossier templates (PPSPS, DOE, PV)', obligatoire:true, delai:'J1'},
              {t:'Accès dossier procédures qualité', obligatoire:true, delai:'S1'},
              {t:'Accès dossier sous-traitants', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📚 Formations Logiciels', items:[
              {t:'Formation Monday.com (suivi chantier, planning)', obligatoire:true, delai:'S1'},
              {t:'Formation Google Workspace (Drive, Agenda)', obligatoire:true, delai:'S1'},
              {t:'Formation CRM Group OY (saisie heures, BC)', obligatoire:false, delai:'M1'},
              {t:'Formation Pennylane (consultation)', obligatoire:false, delai:'M1'}
            ]}
          ],
          conducteur_travaux: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail signé', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité', obligatoire:true, delai:'Avant J1'},
              {t:'RIB + Carte vitale', obligatoire:true, delai:'J1'},
              {t:'Inscription CIBTP', obligatoire:true, delai:'S1'},
              {t:'Demande carte BTP', obligatoire:true, delai:'S1'}
            ]},
            {cat:'Santé & Sécurité', items:[
              {t:'Visite médicale (SIR — poste à risques)', obligatoire:true, delai:'Avant J1'},
              {t:'EPI pour chantier', obligatoire:true, delai:'J1'},
              {t:'Formation sécurité chantier', obligatoire:true, delai:'J1'},
              {t:'Formation amiante SS4 (encadrement technique)', obligatoire:true, delai:'M1'},
              {t:'Formation SST', obligatoire:true, delai:'M1'}
            ]},
            {cat:'Habilitations', items:[
              {t:'Habilitation travail en hauteur', obligatoire:true, delai:'S1'},
              {t:'CACES (selon besoins)', obligatoire:false, delai:'M1'},
              {t:'Habilitation électrique', obligatoire:false, delai:'M1'},
              {t:'Autorisation de conduite véhicule', obligatoire:true, delai:'S1'}
            ]},
            {cat:'Social', items:[
              {t:'Adhésion mutuelle + prévoyance BTP', obligatoire:true, delai:'J1'},
              {t:'Véhicule de fonction attribué', obligatoire:true, delai:'S1'},
              {t:'Carte carburant / télépéage', obligatoire:false, delai:'S1'}
            ]},
            {cat:'IT & Intégration', items:[
              {t:'PC + smartphone configurés', obligatoire:true, delai:'J1'},
              {t:'Comptes IT (Google, logiciels métier)', obligatoire:true, delai:'J1'},
              {t:'Accès plateforme chantiers', obligatoire:true, delai:'S1'},
              {t:'Présentation direction + équipes', obligatoire:true, delai:'J1'},
              {t:'Livret d\'accueil', obligatoire:true, delai:'J1'},
              {t:'Tour des chantiers', obligatoire:true, delai:'S1'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace', obligatoire:true, delai:'Avant J1'},
              {t:'Configuration signature email (template Group OY)', obligatoire:true, delai:'J1'},
              {t:'Photo professionnelle pour profil', obligatoire:false, delai:'S1'},
              {t:'Ajout aux listes de diffusion (direction chantier, RH)', obligatoire:true, delai:'J1'},
              {t:'Configuration email sur téléphone professionnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'💻 Accès Logiciels', items:[
              {t:'Compte Monday.com créé (workspace Yilmaz)', obligatoire:true, delai:'J1'},
              {t:'Formation Monday.com — pilotage travaux', obligatoire:true, delai:'S1'},
              {t:'Accès Pennylane (consultation budgets)', obligatoire:false, delai:'S1'},
              {t:'Accès CRM Group OY', obligatoire:true, delai:'S1'},
              {t:'Compte Google Workspace (Drive, Agenda, Meet)', obligatoire:true, delai:'J1'}
            ]},
            {cat:'🚗 Véhicule & Déplacements', items:[
              {t:'Attribution véhicule de service / fonction', obligatoire:true, delai:'J1'},
              {t:'Remise clés + carte carburant + badge télépéage', obligatoire:true, delai:'J1'},
              {t:'État des lieux véhicule signé', obligatoire:true, delai:'J1'},
              {t:'Copie permis de conduire dans dossier', obligatoire:true, delai:'Avant J1'},
              {t:'Assurance véhicule vérifiée', obligatoire:true, delai:'J1'},
              {t:'Charte utilisation véhicule signée', obligatoire:true, delai:'J1'}
            ]},
            {cat:'✱ Matériel & Équipements', items:[
              {t:'Téléphone professionnel (si poste le requiert)', obligatoire:true, delai:'J1'},
              {t:'Tablette chantier configurée', obligatoire:false, delai:'S1'},
              {t:'Outillage métré / laser', obligatoire:false, delai:'J1'},
              {t:'Badge accès dépôt / bureaux', obligatoire:true, delai:'J1'}
            ]},
            {cat:'👷 EPI & Vêtements', items:[
              {t:'Tailles recueillies (veste, pantalon, chaussures)', obligatoire:true, delai:'Avant J1'},
              {t:'Kit EPI complet (casque, chaussures, gilet, gants, lunettes)', obligatoire:true, delai:'J1'},
              {t:'Vêtements de travail floqués (logo entreprise)', obligatoire:false, delai:'S1'},
              {t:'Harnais antichute', obligatoire:false, delai:'S1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive — dossiers chantiers', obligatoire:true, delai:'J1'},
              {t:'Partage dossier templates (PPSPS, DOE, PV)', obligatoire:true, delai:'J1'},
              {t:'Accès dossier procédures qualité', obligatoire:true, delai:'S1'},
              {t:'Accès dossier sous-traitants', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📚 Formations Logiciels', items:[
              {t:'Formation Monday.com (suivi chantier, planning)', obligatoire:true, delai:'S1'},
              {t:'Formation Google Workspace (Drive, Agenda)', obligatoire:true, delai:'S1'},
              {t:'Formation CRM Group OY (saisie heures, BC)', obligatoire:false, delai:'M1'},
              {t:'Formation Pennylane (consultation)', obligatoire:false, delai:'M1'}
            ]}
          ],
          assistante_admin: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail signé', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité', obligatoire:true, delai:'Avant J1'},
              {t:'RIB + Carte vitale', obligatoire:true, delai:'J1'},
              {t:'Inscription registre du personnel', obligatoire:true, delai:'J1'}
            ]},
            {cat:'Santé', items:[
              {t:'Visite d\'information et de prévention (VIP)', obligatoire:true, delai:'<3 mois'},
              {t:'Attestation de suivi reçue', obligatoire:true, delai:'<3 mois'}
            ]},
            {cat:'Social', items:[
              {t:'Adhésion mutuelle', obligatoire:true, delai:'J1'},
              {t:'Adhésion prévoyance', obligatoire:true, delai:'J1'},
              {t:'Remise notices mutuelle + prévoyance', obligatoire:true, delai:'J1'}
            ]},
            {cat:'IT & Outils', items:[
              {t:'PC configuré + écran', obligatoire:true, delai:'J1'},
              {t:'Comptes Google Workspace', obligatoire:true, delai:'J1'},
              {t:'Accès logiciel comptabilité / ERP', obligatoire:true, delai:'S1'},
              {t:'Formation logiciels internes', obligatoire:true, delai:'S1-S2'},
              {t:'Badge accès / clés bureau', obligatoire:true, delai:'J1'}
            ]},
            {cat:'Intégration', items:[
              {t:'Présentation équipe + direction', obligatoire:true, delai:'J1'},
              {t:'Livret d\'accueil + règlement intérieur', obligatoire:true, delai:'J1'},
              {t:'Visite locaux', obligatoire:true, delai:'J1'},
              {t:'Transmission dossiers en cours', obligatoire:true, delai:'S1'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace', obligatoire:true, delai:'Avant J1'},
              {t:'Configuration signature email (template Group OY)', obligatoire:true, delai:'J1'},
              {t:'Photo professionnelle pour profil', obligatoire:false, delai:'S1'},
              {t:'Ajout aux listes de diffusion (admin, compta, RH)', obligatoire:true, delai:'J1'},
              {t:'Configuration email sur ordinateur + téléphone', obligatoire:true, delai:'J1'}
            ]},
            {cat:'💻 Accès Logiciels', items:[
              {t:'Compte Monday.com créé (tous les boards)', obligatoire:true, delai:'J1'},
              {t:'Formation Monday.com complète', obligatoire:true, delai:'S1'},
              {t:'Accès Pennylane (saisie + consultation)', obligatoire:true, delai:'J1'},
              {t:'Formation Pennylane (saisie factures, rapprochements)', obligatoire:true, delai:'S1'},
              {t:'Accès CRM Group OY (tous modules)', obligatoire:true, delai:'J1'},
              {t:'Compte Google Workspace complet (Drive, Agenda, Meet, Sheets)', obligatoire:true, delai:'J1'},
              {t:'Accès Yousign (si signatures)', obligatoire:false, delai:'S1'}
            ]},
            {cat:'✱ Matériel IT', items:[
              {t:'Ordinateur portable configuré', obligatoire:true, delai:'J1'},
              {t:'Écran externe (si bureau)', obligatoire:false, delai:'J1'},
              {t:'Souris + clavier', obligatoire:false, delai:'J1'},
              {t:'Téléphone professionnel (si requis)', obligatoire:false, delai:'J1'},
              {t:'Imprimante / scanner configuré', obligatoire:false, delai:'S1'},
              {t:'Badge accès bureaux', obligatoire:true, delai:'J1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive — tous les dossiers partagés', obligatoire:true, delai:'J1'},
              {t:'Partage dossier templates administratifs', obligatoire:true, delai:'J1'},
              {t:'Accès dossier RH (contrats, absences)', obligatoire:true, delai:'J1'},
              {t:'Accès dossier comptabilité', obligatoire:true, delai:'J1'},
              {t:'Accès dossier fournisseurs', obligatoire:false, delai:'S1'}
            ]},
            {cat:'📚 Formations Logiciels', items:[
              {t:'Formation Monday.com (gestion boards, automations)', obligatoire:true, delai:'S1'},
              {t:'Formation Google Workspace (Drive, Sheets, Agenda)', obligatoire:true, delai:'S1'},
              {t:'Formation Pennylane (comptabilité)', obligatoire:true, delai:'S1'},
              {t:'Formation CRM Group OY', obligatoire:true, delai:'M1'},
              {t:'Formation Yousign (signatures électroniques)', obligatoire:false, delai:'M1'}
            ]}
          ],
          direction: [
            {cat:'Administratif', items:[
              {t:'DPAE effectuée (URSSAF)', obligatoire:true, delai:'Avant J1'},
              {t:'Contrat de travail (ou mandat social)', obligatoire:true, delai:'J1'},
              {t:'Pièce d\'identité', obligatoire:true, delai:'Avant J1'},
              {t:'RIB + Carte vitale', obligatoire:true, delai:'J1'},
              {t:'Déclaration Kbis / PV AG (si mandataire)', obligatoire:false, delai:'S1'}
            ]},
            {cat:'Santé', items:[
              {t:'Visite d\'information et de prévention (VIP)', obligatoire:true, delai:'<3 mois'},
              {t:'EPI pour visites chantier', obligatoire:false, delai:'S1'}
            ]},
            {cat:'Social', items:[
              {t:'Adhésion mutuelle', obligatoire:true, delai:'J1'},
              {t:'Adhésion prévoyance', obligatoire:true, delai:'J1'},
              {t:'Véhicule de fonction', obligatoire:false, delai:'S1'}
            ]},
            {cat:'IT', items:[
              {t:'PC / Mac configuré', obligatoire:true, delai:'J1'},
              {t:'Smartphone professionnel', obligatoire:true, delai:'J1'},
              {t:'Comptes IT (Google, signatures mail)', obligatoire:true, delai:'J1'},
              {t:'Accès outils de pilotage / dashboards', obligatoire:true, delai:'S1'}
            ]},
            {cat:'Intégration stratégique', items:[
              {t:'Présentation filiales & équipes', obligatoire:true, delai:'S1'},
              {t:'Transmission dossiers stratégiques', obligatoire:true, delai:'S1-S2'},
              {t:'Planning rendez-vous partenaires clés', obligatoire:false, delai:'M1'},
              {t:'Livret d\'accueil + charte', obligatoire:true, delai:'J1'}
            ]},
            {cat:'📧 Email & Communication', items:[
              {t:'Création compte email Google Workspace', obligatoire:true, delai:'Avant J1'},
              {t:'Configuration signature email (template Direction)', obligatoire:true, delai:'J1'},
              {t:'Photo professionnelle', obligatoire:true, delai:'S1'},
              {t:'Ajout aux listes de diffusion (direction, CODIR)', obligatoire:true, delai:'J1'},
              {t:'Configuration email sur tous les appareils', obligatoire:true, delai:'J1'},
              {t:'Carte de visite commandée', obligatoire:false, delai:'S1'}
            ]},
            {cat:'💻 Accès Logiciels', items:[
              {t:'Compte Monday.com (admin)', obligatoire:true, delai:'J1'},
              {t:'Accès Pennylane (full admin)', obligatoire:true, delai:'J1'},
              {t:'Accès CRM Group OY (admin)', obligatoire:true, delai:'J1'},
              {t:'Accès Google Workspace admin', obligatoire:true, delai:'J1'},
              {t:'Accès plateforme bancaire', obligatoire:false, delai:'S1'},
              {t:'Accès Yousign', obligatoire:true, delai:'J1'}
            ]},
            {cat:'🚗 Véhicule', items:[
              {t:'Attribution véhicule de fonction', obligatoire:true, delai:'J1'},
              {t:'Contrat véhicule de fonction signé', obligatoire:true, delai:'J1'},
              {t:'Carte carburant + badge télépéage', obligatoire:true, delai:'J1'},
              {t:'Assurance véhicule', obligatoire:true, delai:'J1'}
            ]},
            {cat:'✱ Matériel', items:[
              {t:'Ordinateur portable haut de gamme', obligatoire:true, delai:'J1'},
              {t:'Téléphone professionnel', obligatoire:true, delai:'J1'},
              {t:'Bureau aménagé', obligatoire:true, delai:'J1'},
              {t:'Badge accès tous sites', obligatoire:true, delai:'J1'}
            ]},
            {cat:'▸ Dossiers & Drive', items:[
              {t:'Accès Google Drive — tous les dossiers stratégiques', obligatoire:true, delai:'J1'},
              {t:'Accès dossier direction / CODIR', obligatoire:true, delai:'J1'},
              {t:'Accès dossier juridique', obligatoire:true, delai:'S1'},
              {t:'Accès dossier financier complet', obligatoire:true, delai:'J1'}
            ]}
          ]
        };
        const saveOb = d => { setObData(d); };
        const sampleOb = [
          {id:'OB-001',employeId:'EMP008',collaborateur:'David LEMAIRE',filialeId:3,filiale:'Ezel Bâtiment',poste:'Responsable Étude de Prix',posteType:'conducteur_travaux',dateEntree:'2020-03-01',tuteur:'EMP005',periodeEssai:'2020-07-01',statut:'termine',checklist:OB_CHECKLISTS.conducteur_travaux.flatMap(cat => cat.items.map(item => ({t:item.t,done:true,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))},
          {id:'OB-002',employeId:null,collaborateur:'Nouveau Maçon Mars 2026',filialeId:3,filiale:'Ezel Bâtiment',poste:'Maçon qualifié',posteType:'ouvrier_btp',dateEntree:'2026-03-10',tuteur:'EMP010',periodeEssai:'2026-05-10',statut:'planifie',checklist:OB_CHECKLISTS.ouvrier_btp.flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))},
          {id:'OB-003',employeId:'EMP020',collaborateur:'Priscillia BORDES',filialeId:3,filiale:'Ezel Bâtiment',poste:'Assistante Admin & Technique',posteType:'assistante_admin',dateEntree:'2024-01-15',tuteur:'EMP009',periodeEssai:'2024-05-15',statut:'termine',checklist:OB_CHECKLISTS.assistante_admin.flatMap(cat => cat.items.map(item => ({t:item.t,done:true,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))},
          {id:'OB-004',employeId:null,collaborateur:'Nouveau Chef de Chantier',filialeId:3,filiale:'Ezel Bâtiment',poste:'Chef de Chantier GO',posteType:'chef_chantier',dateEntree:'2026-04-01',tuteur:'EMP005',periodeEssai:'2026-08-01',statut:'planifie',checklist:OB_CHECKLISTS.chef_chantier.flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))}
        ];
        const data = filterByFiliale(obData.length > 0 ? obData : sampleOb);
        const enCours = data.filter(d => d.statut === 'en_cours').length;
        const planifies = data.filter(d => d.statut === 'planifie').length;
        const termines = data.filter(d => d.statut === 'termine').length;
        return (
          <div>
            {/* ── HEADER SHOWCASE ── */}
            <div style={{background:$bgCard,borderRadius:crmRd,border:`1px solid ${$border}`,marginBottom:14,overflow:'hidden',boxShadow:$shadow}}>
              <div style={{height:3,background:'linear-gradient(90deg,#7c3aed 0%,#a78bfa 50%,#7c3aed 100%)'}}/>
              <div style={{padding:'14px 20px'}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:10,background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>🚀</div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:2}}>
                        <h2 style={{margin:0,fontSize:'1.05rem',fontWeight:800,color:$text,letterSpacing:'-0.01em'}}>Onboarding BTP</h2>
                        {enCours>0&&<span style={{fontSize:'0.68rem',padding:'2px 7px',borderRadius:8,background:'#7c3aed15',color:'#7c3aed',fontWeight:700,border:'1px solid #7c3aed30'}}>{enCours} en cours</span>}
                      </div>
                      <p style={{margin:0,fontSize:'0.8rem',color:$textMut}}>Checklists dynamiques par poste BTP · {data.length} dossiers · {planifies} planifié{planifies>1?'s':''}</p>
                    </div>
                  </div>
                  <button onClick={() => setObEdit({id:'OB-'+String(data.length+1).padStart(3,'0'),collaborateur:'',poste:'',posteType:'ouvrier_btp',filiale:'Ezel Bâtiment',filialeId:3,dateEntree:new Date().toISOString().slice(0,10),tuteur:'',periodeEssai:'',statut:'planifie',checklist:OB_CHECKLISTS.ouvrier_btp.flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))})} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:crmRd,border:'none',background:'#7c3aed',fontSize:'0.8rem',fontWeight:700,color:'#fff',cursor:'pointer',flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    + Nouvel onboarding
                  </button>
                </div>
                <div style={{display:'flex',gap:16,marginTop:12,paddingTop:10,borderTop:`1px solid ${$border}`,flexWrap:'wrap'}}>
                  {[{l:'En cours',v:enCours,c:'#7c3aed'},{l:'Planifiés',v:planifies,c:'#3b82f6'},{l:'Terminés',v:termines,c:'#10b981'},{l:'Total',v:data.length,c:$textSec}].map((k,i)=>(
                    <div key={i} style={{display:'flex',flexDirection:'column',gap:1}}>
                      <div style={{fontSize:'0.6rem',color:$textMut,textTransform:'uppercase',letterSpacing:'0.07em',fontWeight:700}}>{k.l}</div>
                      <div style={{fontSize:'1.1rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em'}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs + Filtres */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`,width:'fit-content',flexWrap:'wrap'}}>
                <button onClick={()=>setObPosteFilter('tous')} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:obPosteFilter==='tous'?$selBg:'transparent',color:obPosteFilter==='tous'?$selText:$textMut,fontWeight:obPosteFilter==='tous'?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>Tous</button>
              {OB_POSTES.map(p => <button key={p.id} onClick={()=>setObPosteFilter(p.id)} style={{padding:'6px 14px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:obPosteFilter===p.id?p.color:'transparent',color:obPosteFilter===p.id?'#fff':$textMut,fontWeight:obPosteFilter===p.id?600:400,fontSize:'0.78rem',transition:'all 0.15s',fontFamily:'inherit'}}>{p.icon} {p.label}</button>)}</div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setObSettingsOpen(p=>!p)} style={{padding:'6px 14px',border:`1px solid ${obSettingsOpen?$accent:$border}`,borderRadius:crmRd,fontSize:'0.78rem',fontFamily:'inherit',background:obSettingsOpen?$accentSub:'transparent',color:obSettingsOpen?$accent:$textSec,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontWeight:600,transition:'all 0.15s'}}>
                  ✱ Filtres & Colonnes {(obStatutFilter!=='tous'||obFilialeFilter!=='tous')&&<span style={{width:6,height:6,borderRadius:'50%',background:$warn}}/>}
                </button>
                {obStatutFilter!=='tous'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setObStatutFilter('tous')}>✕ {obStatutFilter==='en_cours'?'En cours':obStatutFilter==='planifie'?'Planifié':'Terminé'}</span>}
                {obFilialeFilter!=='tous'&&<span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:$accent+'18',color:$accent,display:'inline-flex',alignItems:'center',gap:4,cursor:'pointer'}} onClick={()=>setObFilialeFilter('tous')}>✕ Filiale</span>}
              </div>
            </div>
            {/* ✱ Filtres panel */}
            {obSettingsOpen&&<><div onClick={()=>setObSettingsOpen(false)} style={{position:'fixed',inset:0,background:'transparent',zIndex:9997}}/><div style={{position:'fixed',top:210,right:20,width:320,maxHeight:'70vh',overflow:'auto',background:$bgCard,border:`1px solid ${$borderAlt}`,borderRadius:crmRd,padding:20,boxShadow:'0 12px 40px rgba(0,0,0,0.15)',zIndex:9998}} onClick={e=>e.stopPropagation()}>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par statut</div>
                <div style={{display:'flex',gap:2,background:$bgSub,borderRadius:crmRd,padding:3,border:`1px solid ${$border}`}}>
                  {[{id:'tous',l:'Tous'},{id:'en_cours',l:'En cours'},{id:'planifie',l:'Planifié'},{id:'termine',l:'Terminé'}].map(s=>(
                    <button key={s.id} onClick={()=>setObStatutFilter(s.id)} style={{flex:1,padding:'5px 8px',borderRadius:Math.max(crmRd-2,0),border:'none',cursor:'pointer',background:obStatutFilter===s.id?$selBg:'transparent',color:obStatutFilter===s.id?$selText:$textMut,fontWeight:obStatutFilter===s.id?600:400,fontSize:'0.7rem',transition:'all 0.15s',fontFamily:'inherit'}}>{s.l}</button>
                  ))}
                </div>
              </div>
              {isYilmazContext&&<div style={{marginBottom:14}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,color:$textMut,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:8}}>Filtrer par filiale</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  <button onClick={()=>setObFilialeFilter('tous')} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${obFilialeFilter==='tous'?$accent:$border}`,background:obFilialeFilter==='tous'?$selBg:'transparent',color:obFilialeFilter==='tous'?$selText:$textSec,fontSize:'0.7rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Toutes</button>
                  {filialesDynamiques.filter(f=>f.holding!=='GROUP OY').map(f=>(
                    <button key={f.id} onClick={()=>setObFilialeFilter(String(f.id))} style={{padding:'4px 10px',borderRadius:crmRd,border:`1px solid ${obFilialeFilter===String(f.id)?f.couleur||$accent:$border}`,background:obFilialeFilter===String(f.id)?(f.couleur||$accent)+'18':'transparent',color:obFilialeFilter===String(f.id)?f.couleur||$accent:$textSec,fontSize:'0.7rem',fontWeight:obFilialeFilter===String(f.id)?600:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>{f.icon} {f.nom}</button>
                  ))}
                </div>
              </div>}
            </div></>}

                        {/* KPI Cards */}
            {(() => {
              const allItems = data.flatMap(d => d.checklist || []);
              const allDone = allItems.filter(c => c.done).length;
              const allOblig = allItems.filter(c => c.obligatoire);
              const obligDone = allOblig.filter(c => c.done).length;
              const obligOverdue = allOblig.filter(c => !c.done).length;
              const globalPct = allItems.length > 0 ? Math.round(allDone / allItems.length * 100) : 0;
              const PHASES = [{id:'tous',l:'Toutes les phases'},{id:'Avant J1',l:'Avant J1',c:'#8b5cf6'},{id:'J1',l:'Jour J',c:'#f97316'},{id:'S1',l:'Semaine 1',c:'#3b82f6'},{id:'M1',l:'Mois 1',c:'#10b981'}];
              return (<>
                <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:10, marginBottom:16}}>
                  {[
                    {l:'En cours',v:enCours,c:$info,ic:'▸'},
                    {l:'Planifiés',v:planifies,c:$warn,ic:'◔'},
                    {l:'Terminés',v:termines,c:$success,ic:'✓'},
                    {l:'Tâches complétées',v:`${allDone}/${allItems.length}`,c:$accent,ic:'◉',sub:globalPct+'%'},
                    {l:'Obligatoires OK',v:`${obligDone}/${allOblig.length}`,c:obligOverdue>0?$danger:$success,ic:'▲',sub:obligOverdue>0?obligOverdue+' en attente':'Tout OK'},
                    {l:'Progression',v:globalPct+'%',c:globalPct>=80?$success:globalPct>=50?$warn:$danger,ic:'▦',bar:true,barPct:globalPct}
                  ].map((k,i)=>(
                    <div key={i} style={{background:$bgCard,border:`1px solid ${$border}`,borderRadius:crmRd,padding:'14px 16px',boxShadow:$shadow,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'default',borderBottom:`3px solid ${k.c}`}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow=$shadowLg;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=$shadow;}}
                  >
                    <div style={{fontSize:'0.62rem',color:$textMut,fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:4}}>{k.l}</div>
                    <div style={{fontSize:'1.3rem',fontWeight:800,color:k.c,letterSpacing:'-0.02em',lineHeight:1}}>{k.v}</div>
                    {k.sub&&<div style={{fontSize:'0.62rem',color:k.c,fontWeight:500,marginTop:3}}>{k.sub}</div>}
                    {k.bar&&<div style={{height:4,background:$bgSub,borderRadius:2,marginTop:6,overflow:'hidden'}}><div style={{width:k.barPct+'%',height:'100%',background:k.c,borderRadius:2,transition:'width 0.5s'}}/></div>}
                  </div>
                  ))}
                </div>
                {/* Phase Filter Tabs */}
                <div style={{display:'flex',gap:4,marginBottom:16,flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,display:'flex',alignItems:'center',marginRight:4}}>Phase :</span>
                  {PHASES.map(ph=>{
                    const isActive = (obDetailCat||'tous') === ph.id;
                    const phaseItems = ph.id==='tous' ? allItems : allItems.filter(it=>it.delai===ph.id);
                    const phDone = phaseItems.filter(it=>it.done).length;
                    return <button key={ph.id} onClick={()=>setObDetailCat(ph.id==='tous'?null:ph.id)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${isActive?(ph.c||$accent):$border}`,background:isActive?(ph.c||$accent)+'15':'transparent',color:isActive?(ph.c||$accent):$textMut,fontSize:'0.72rem',fontWeight:isActive?700:400,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',display:'flex',alignItems:'center',gap:4}}>
                      {ph.l} <span style={{padding:'0 5px',borderRadius:8,background:isActive?(ph.c||$accent)+'20':$bgSub,fontSize:'0.6rem',fontWeight:700}}>{phDone}/{phaseItems.length}</span>
                    </button>;
                  })}
                </div>
              </>);
            })()}
            {/* Onboarding cards */}
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {data.filter(ob => (obPosteFilter==='tous' || ob.posteType===obPosteFilter) && (obStatutFilter==='tous' || ob.statut===obStatutFilter)).sort((a,b) => a.statut==='termine'?1:b.statut==='termine'?-1:0).map(ob => {
                const done = ob.checklist.filter(c => c.done).length;
                const total = ob.checklist.length;
                const obligDone = ob.checklist.filter(c => c.obligatoire && c.done).length;
                const obligTotal = ob.checklist.filter(c => c.obligatoire).length;
                const pct = total > 0 ? Math.round(done/total*100) : 0;
                const posteInfo = OB_POSTES.find(p => p.id === ob.posteType) || OB_POSTES[0];
                const statColor = ob.statut === 'termine' ? $success : ob.statut === 'en_cours' ? $info : $warn;
                const statLabel = ob.statut === 'termine' ? 'Terminé' : ob.statut === 'en_cours' ? 'En cours' : 'Planifié';
                // Group by category
                const cats = [...new Set(ob.checklist.map(c => c.cat))];
                return (
                  <div key={ob.id} style={{background:$bgCard, border:`1px solid ${$border}`, borderRadius:crmRd, overflow:'hidden', boxShadow:$shadow, transition:'all 0.2s', ...highlightStyle('onboarding', ob.id)}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=$shadowLg;e.currentTarget.style.borderColor=$accent+'30';}} onMouseLeave={e=>{e.currentTarget.style.boxShadow=$shadow;e.currentTarget.style.borderColor=$border;}}>
                    <div style={{padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`1px solid ${$border}`, cursor:'pointer'}} onClick={() => setObEdit({...ob})}>
                      <div>
                        <div style={{fontWeight:700, fontSize:'0.95rem', color:$text}}>{ob.employeId ? <EmpLink id={ob.employeId}/> : ob.collaborateur} <span style={{padding:'3px 10px',borderRadius:crmRd>0?20:2,fontSize:'0.72rem',fontWeight:600,background:posteInfo.color+'18',color:posteInfo.color,display:'inline-flex',alignItems:'center',gap:4,marginLeft:6}}>{posteInfo.icon} {posteInfo.label}</span></div>
                        <div style={{fontSize:'0.78rem', color:$accent, marginTop:2}}>{ob.poste} — {ob.filialeId ? <FilLink id={ob.filialeId}/> : ob.filiale}</div>
                        <div style={{fontSize:'0.72rem', color:$textMut, marginTop:2}}>Entrée: {ob.dateEntree} — Tuteur: {ob.tuteur ? empNom(ob.tuteur) : '—'} — Fin PE: {ob.periodeEssai || '—'}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <span style={{padding:'4px 12px',borderRadius:crmRd||2,fontWeight:700,fontSize:'0.78rem',background:statColor+'15',color:statColor}}>{statLabel}</span>
                        <div style={{fontSize:'0.78rem', fontWeight:700, color:$accent, marginTop:6}}>{done}/{total} ({pct}%)</div>
                        <div style={{fontSize:'0.65rem', color:obligDone<obligTotal?'#dc2626':'#059669', fontWeight:600}}>Oblig: {obligDone}/{obligTotal}</div>
                      </div>
                    </div>
                    <div style={{padding:'10px 18px'}}>
                      <div style={{height:6, background:$bgSub, borderRadius:crmRd, overflow:'hidden', marginBottom:14}}>
                        <div style={{width:pct+'%', height:'100%', background: pct===100?`linear-gradient(90deg, ${$success}, #34d399)`:pct>50?`linear-gradient(90deg, ${$accent}, ${$accentHover})`:`linear-gradient(90deg, ${$warn}, #fbbf24)`, borderRadius:crmRd, transition:'width 0.5s ease-out'}}/>
                      </div>
                      {cats.map(cat => {
                        const catItems = ob.checklist.filter(c => c.cat === cat && (!obDetailCat || c.delai === obDetailCat));
                        const catDone = catItems.filter(c => c.done).length;
                        return (
                          <div key={cat} style={{marginBottom:8}}>
                            <div style={{fontSize:'0.72rem',fontWeight:600,color:$textMut,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em',display:'flex',alignItems:'center',gap:8,paddingBottom:4,borderBottom:`1px solid ${$borderLight}`}}>{cat} <span style={{padding:'1px 8px',borderRadius:crmRd>0?12:2,fontSize:'0.62rem',fontWeight:700,background:catDone===catItems.length?$success+'15':$accent+'12',color:catDone===catItems.length?$success:$accent}}>{catDone}/{catItems.length}</span></div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:3}}>
                              {catItems.map((c,i) => {
                                const globalIdx = ob.checklist.indexOf(c);
                                return (
                                  <div key={i} onClick={(e) => {e.stopPropagation(); const updated = data.map(d => d.id===ob.id?{...d, checklist: d.checklist.map((cc,ii) => ii===globalIdx?{...cc,done:!cc.done}:cc)}:d); saveOb(updated);}} style={{display:'flex', alignItems:'center', gap:6, padding:'3px 6px', cursor:'pointer', borderRadius:Math.max(crmRd-3,2),background: c.done ? $success+'08' : c.obligatoire && !c.done ? $danger+'06' : 'transparent',transition:'all 0.15s',border:`1px solid ${c.done?$success+'15':c.obligatoire&&!c.done?$danger+'10':'transparent'}`}}>
                                    <span style={{width:15, height:15, borderRadius:Math.max(crmRd-4,3),border: c.done ? 'none' : `2px solid ${c.obligatoire?$danger+'50':$border}`, background: c.done ? $success : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'0.58rem', flexShrink:0, transition:'all 0.15s', boxShadow: c.done?`0 0 0 2px ${$success}20`:'none'}}>{c.done ? '✓' : ''}</span>
                                    <span style={{fontSize:'0.72rem', color: c.done ? $success : $textSec, textDecoration: c.done ? 'line-through' : 'none'}}>{c.obligatoire && !c.done ? '▲ ' : ''}{c.t}{c.delai&&<span style={{marginLeft:4,padding:'0 4px',borderRadius:4,fontSize:'0.55rem',fontWeight:600,background:c.delai==='Avant J1'?'#8b5cf620':c.delai==='J1'?'#f9731620':c.delai==='S1'?'#3b82f620':'#10b98120',color:c.delai==='Avant J1'?'#8b5cf6':c.delai==='J1'?'#f97316':c.delai==='S1'?'#3b82f6':'#10b981'}}>{c.delai}</span>}</span>
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
              })}
            </div>
            {/* Modal */}
            {obEdit && (() => {
            // Auto-fill checklist if empty (from Recrutement launch)
            if (obEdit.checklist && obEdit.checklist.length === 0 && obEdit.posteType && OB_CHECKLISTS[obEdit.posteType]) {
              const autoChecklist = OB_CHECKLISTS[obEdit.posteType].flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})));
              setObEdit(prev => ({...prev, checklist: autoChecklist}));
            }
            return null;
          })()}
          {obEdit && (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setObEdit(null)}><div style={{background:$bgCard,width:'94%',maxWidth:600,maxHeight:'88vh',overflow:'auto',borderRadius:crmRd,boxShadow:$shadowLg}} onClick={e=>e.stopPropagation()}>
              <div style={{padding:'14px 20px',background:$bgSub,borderBottom:`1px solid ${$border}`,display:'flex',justifyContent:'space-between',borderRadius:`${crmRd}px ${crmRd}px 0 0`}}><span style={{fontWeight:700,color:$text}}>{data.find(d=>d.id===obEdit.id)?'✎ Modifier':'➕ Nouvel'} onboarding</span><button onClick={()=>setObEdit(null)} style={{background:'none',border:'none',fontSize:'1.1rem',cursor:'pointer'}}>✕</button></div>
              <div style={{padding:'14px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <div style={{gridColumn:'span 2'}}><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Collaborateur</label><input value={obEdit.collaborateur||''} onChange={e=>setObEdit({...obEdit,collaborateur:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Poste</label><input value={obEdit.poste||''} onChange={e=>setObEdit({...obEdit,poste:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Type de poste</label><select value={obEdit.posteType||'ouvrier_btp'} onChange={e=>{const newType = e.target.value; setObEdit({...obEdit, posteType:newType, checklist: OB_CHECKLISTS[newType].flatMap(cat => cat.items.map(item => ({t:item.t,done:false,cat:cat.cat,obligatoire:item.obligatoire,delai:item.delai||''})))});}} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>{OB_POSTES.map(p=><option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}</select></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Filiale</label><select value={obEdit.filiale||''} onChange={e=>setObEdit({...obEdit,filiale:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}>
                  {['YILMAZ SAS','Ezel Bâtiment',"L'Échafaudage",'La Roulotte',"L'Étanchéité"].map(f=><option key={f} value={f}>{f}</option>)}</select></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Date d'entrée</label><input type="date" value={obEdit.dateEntree||''} onChange={e=>setObEdit({...obEdit,dateEntree:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Fin période essai</label><input type="date" value={obEdit.periodeEssai||''} onChange={e=>setObEdit({...obEdit,periodeEssai:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Tuteur</label><input value={obEdit.tuteur||''} onChange={e=>setObEdit({...obEdit,tuteur:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none',boxSizing:'border-box'}}/></div>
                <div><label style={{display:'block',fontSize:'0.7rem',fontWeight:600,color:$textMut,marginBottom:4,letterSpacing:'0.02em',textTransform:'uppercase'}}>Statut</label><select value={obEdit.statut||'planifie'} onChange={e=>setObEdit({...obEdit,statut:e.target.value})} style={{width:'100%',padding:'7px 10px',border:`1px solid ${$border}`,borderRadius:crmRd,fontSize:'0.82rem',fontFamily:'inherit',background:$bgCard,color:$text,outline:'none'}}><option value="planifie">Planifié</option><option value="en_cours">En cours</option><option value="termine">Terminé</option></select></div>
              </div>
              <div style={{padding:'10px 20px',borderTop:`1px solid ${$border}`,display:'flex',justifyContent:'space-between'}}>
                <div>{data.find(d=>d.id===obEdit.id)&&<button onClick={()=>{saveOb(data.filter(d=>d.id!==obEdit.id));setObEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$danger}30`,background:$danger+'12',color:$danger,fontWeight:600,fontSize:'0.8rem',cursor:'pointer',fontFamily:'inherit'}}>Supprimer</button>}</div>
                <div style={{display:'flex',gap:6}}><button onClick={()=>setObEdit(null)} style={{padding:'5px 12px',borderRadius:crmRd,border:`1px solid ${$border}`,background:'transparent',color:$textSec,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Annuler</button><button onClick={()=>{const ex=data.find(d=>d.id===obEdit.id);if(ex){saveOb(data.map(d=>d.id===obEdit.id?obEdit:d));}else{saveOb([...data,obEdit]);}setObEdit(null);}} style={{padding:'5px 12px',borderRadius:crmRd,border:`2px solid ${$accent}`,background:'transparent',color:$accent,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>Enregistrer</button></div>
              </div>
            </div></div>)}
          </div>
        );
}
