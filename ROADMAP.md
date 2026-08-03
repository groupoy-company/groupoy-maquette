# ROADMAP — Application Group OY (CRM/ERP)

> Source unique des décisions et du backlog. Versionné dans le repo `groupoy-company/groupoy-maquette`.
> Suivi opérationnel : board Monday « 🚀 Gestion Projet — Application Group OY ».

## Où vit le projet
- **Code** : `~/Desktop/Claude/crm-app` (local) + GitHub `groupoy-company/groupoy-maquette` (tag `v1-maquette` = maquette d'origine).
- **Base + fichiers** : Supabase projet `groupoy-maquette` (org « Group OY », compte admin@yilmaz.fr), séparé du projet `groupoy-app` de Benjamin.
- **Stack** : Vite + React 18, données `src/data/`, hook `usePersistedState` (localStorage + Supabase), 49 onglets dans `src/tabs/`.

---

## FAZ A — Fondations (avant mise en ligne)
- [x] Modularisation (App.jsx 27 000 → ~4 000 lignes, 49 composants)
- [x] Identité visuelle V2 (thème « Obsidienne & Or », en-tête, monogrammes)
- [x] Persistance corrigée (window.storage → localStorage + Supabase)
- [x] Supabase branché (projet dédié, table `app_kv`, client `src/lib/supabase.js`)
- [x] Auth OTP e-mail — UI + flux construits
- [x] **Connexion par e-mail opérationnelle** (03/08) — cause de la panne trouvée : le modèle d'e-mail Supabase envoyait un **lien** alors que l'écran attendait un **code**, et `site_url` pointait sur un mauvais port. Corrigé : `site_url`/`uri_allow_list` justes, code à 6 chiffres, et l'application récupère désormais la session au retour du lien (formats `#access_token` et `?code`). Testé de bout en bout : e-mail reçu → connexion automatique.
- [ ] **SMTP Resend** (reste à faire — demande un compte) : l'e-mail intégré Supabase est limité à **2 envois/heure**, tombe en indésirables, et **ne permet pas de personnaliser le modèle en offre gratuite** (donc lien only, pas de code). De plus, les scanners de sécurité des messageries peuvent **consommer le lien à usage unique avant l'utilisateur** (constaté). → Resend = code à 6 chiffres, 3 000 e-mails/mois, expéditeur `@groupoy.fr`.
- [x] **Sécurité — verrouillage complet** (03/08) :
  - RLS `app_kv` : accès anonyme **supprimé** (avant : lecture ET écriture ouvertes à tous — données salariés, finances, chantiers exposées). Réservé aux utilisateurs authentifiés. Vérifié : anonyme = `[]` en lecture, refus en écriture.
  - **Inscriptions publiques fermées** (`disable_signup`) + `shouldCreateUser: false` : plus personne ne peut se créer un compte. Comptes autorisés provisionnés (admin@yilmaz.fr, oyilmaz@ezel.fr, contact@ezel.fr).
  - **Connexion obligatoire** : `isLoggedIn` par défaut = false.
  - **Mots de passe en clair supprimés** (code, navigateur et cloud) → empreintes SHA-256 salées par identifiant. Les mots de passe existants continuent de fonctionner.
  - Reste (Faz C) : droits fins par utilisateur (qui voit/modifie quoi).
- [x] **Stockage documents** (03/08) : module unique `src/lib/storage.js` — l'application ne sait pas où sont les fichiers. Bucket Supabase **privé** `documents`, réservé aux authentifiés, ouverture par **liens temporaires** (jamais d'URL publique). Composant réutilisable `PanneauDocuments` (glisser-déposer, liste, ouverture, suppression) + onglet **Documents** (rangement par entité › dossier). Adaptateur **GCS préparé** dans le même fichier : la bascule archive (Drive > 1 To) se fera sans toucher aux écrans.
- [ ] **Hébergement + domaine** : déploiement (Cloud Run ou Vercel) + sous-domaine **app.groupoy.fr** (DNS chez le registrar, sans toucher au site vitrine).

## FAZ B — Fonctionnalités (backlog, par ROI)
1. [x] **Centre d'échéances** (fait 03/08) — agrège assurances, contrats, contrôles techniques, fins de leasing, conformité (DUERP/certifs/VGP) et appels d'offres ; KPI (expiré / 30j / 90j), filtres par source + horizon, recherche, respect du contexte filiale. Onglet `centre_echeances` dans Direction (Group OY) et Juridique de chaque entité. Données via `src/data/echeances.js` (repli échantillon quand l'état live est vide).
2. Palette de commandes ⌘K + recherche globale
3. Carte des chantiers + météo 5 jours
4. Module SCI ELIA (biens, loyers, emprunts) — appli dédiée, hors vitrine page de garde
5. Exports PDF élégants (organigramme, dashboard, présentation)
6. Bascule de langue FR / TR
7. Mode TV bureau (dashboard plein écran)
8. PWA mobile terrain (photos, pointage — après Supabase)
9. **Module « Suivi de Projet » in-app** : phases/tâches/roadmap dans l'application elle-même (kanban + jalons), pour remplacer Monday à terme et garder le pilotage dans un seul outil.

## FAZ C — Plus tard
- Agents IA in-app via **Vercel « eve »** (assistants : analyse CV, analyse AO…)
- Sites vitrines publics par filiale : modernes, 3D (v0.dev / Three.js / Spline)
- Gestion fine des droits par utilisateur connecté (qui voit/modifie quoi)
- Migration complète Drive → GCS

---

## Bugs connus (à corriger)
- [x] **Dashboard Group OY plantait** (corrigé 03/08) — cause : `getKpiFiliale` (App.jsx) renvoyait `margeBrutePct = undefined` pour les holdings à CA=0 dépourvus du champ (ELIA, L'Ezel), puis `kpi.margeBrutePct.toFixed(0)` (widget « Filiales ») → écran blanc. Fix : défauts `?? 0` dans `getKpiFiliale` + moyennes holding protégées. **+ Error boundary** ajoutée autour de toute la zone d'onglets (`WidgetErrorBoundary`, `key={ongletActif}`) → si un module plante, on affiche un message au lieu d'un écran blanc, et les autres onglets restent utilisables.

## Décisions actées
- **Projets Supabase séparés** : maquette = `groupoy-maquette` ; ne pas mélanger avec `groupoy-app` de Benjamin.
- **Domaine** : sous-domaine `app.groupoy.fr` (pas le www racine).
- **Documents** : Supabase Storage (live/app) au départ + GCS (archive, Drive > 1 To) ensuite, abstraits derrière un module unique `storage-helper`.
- **Domaine** : `groupoy.fr` enregistré chez **1&1 / IONOS** → sous-domaine `app.groupoy.fr` via un enregistrement DNS (CNAME), sans toucher au site vitrine.
- **Suivi projet** : à terme dans l'app (module dédié) pour se passer de Monday.
- **Revue qualité** : passe « contrôleur » (relecture critique) systématique sur chaque changement important avant validation.
- **Multi-agents / skills** : pas de structure permanente ; bursts d'agents seulement pour gros travaux parallèles ; skills projet quand les patterns se stabilisent.
- **Sécurité = priorité** avant toute mise en ligne.
