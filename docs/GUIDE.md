# Guide de l'application — Group OY (le « manuel »)

> Document vivant : décrit **ce que fait l'application aujourd'hui**. Mis à jour au fil des évolutions.
> But : donner à tout nouvel arrivant (humain ou assistant) une carte claire de l'outil.

## En bref
Application interne CRM / ERP du groupe (BTP). Un tableau de bord unique qui rassemble RH, Finance, Commercial/AO, Chantiers, Parc & IT, et le pilotage de direction. 49 modules (onglets), deux entités : **Group OY** et **Invest Exe**.

## Comment ça marche (côté utilisateur)
- Connexion par **code e-mail** (OTP).
- Menu latéral → un **onglet = un module**.
- Les données saisies sont **sauvegardées automatiquement** (navigateur + cloud Supabase).
- Thème visuel « Obsidienne & Or » (sombre, luxe sobre).

## Carte des modules (49)

### Direction & pilotage
- **Dashboard**, **KpiDashboard** — vues de synthèse et indicateurs.
- **Organigramme**, **Presentation**, **PresentationGroupe** — structure et présentation du groupe.
- **Identite** — identité / paramètres de l'entité.
- **EzelTableau**, **DonneesRef** — tableaux de référence.

### Ressources humaines
- **Collaborateurs**, **DossierRh** — fiches du personnel.
- **Recrutement**, **Onboarding**, **Offboarding** — cycle de vie du salarié.
- **Absences**, **Formation**, **Postes**, **Conformite** — suivi RH et conformité (habilitations, CACES…).

### Finance
- **Budget**, **Tresorerie**, **Analytique** — pilotage financier.
- **FactInterne**, **FactExterne**, **ReceptionFactures**, **BonCommande** — facturation et achats.
- **Contrats**, **Litiges**, **Assurances** — engagements et risques.

### Commercial & appels d'offres
- **CrmCommercial** — relation client / prospects.
- **VeilleAo**, **SuiviDossiers**, **Suivi** — veille et suivi des appels d'offres.

### Chantiers & prestations (BTP)
- **OrdresTravail**, **PlanningGantt** — ordres de travail et planning.
- **Materiel**, **ParcAutomobile** — matériel et véhicules.
- **CataloguePresta**, **SuiviPresta**, **CalendrierSvc**, **ProcessusSvc**, **SvcKpi** — catalogue, suivi et process des prestations.

### Parc informatique & outils
- **ParcInfo**, **Outils**, **Tickets**, **Supports**, **Web** — matériel IT, outils, support.

### Outils internes de l'app
- **Guide** — aide intégrée.
- **Roadmap** — feuille de route dans l'app.
- **Simulateur** — simulateur (origine de la maquette).
- **Admin** — administration.

## Sources de données externes (connexions prévues, pas de duplication)
- **Pappers / API gouv** — données légales des sociétés (SIREN).
- **Pennylane** — finance/compta.
- **Monday** — suivi AO/projets (à remplacer à terme par un module in-app).
- **Drive / Google Cloud Storage** — documents (archive > 1 To).

## À savoir pour développer
- Ajouter/modifier un module = éditer `src/tabs/TabX.jsx`.
- Données de départ = `src/data/`. Persistance = hook `usePersistedState`.
- Outil `tools/extract_tab.py` = a servi à découper l'ancien fichier géant en 49 composants.
- Toujours faire une **passe de relecture critique** avant de valider un changement important.
