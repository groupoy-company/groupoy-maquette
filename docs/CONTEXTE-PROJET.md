# Contexte du projet — Application Group OY

> **Rôle de ce fichier** : sauvegarde du contexte projet **sur GitHub** (survit à un changement d'ordinateur).
> Sur une nouvelle machine : cloner le repo `groupoy-company/groupoy-maquette` → tout revient (code + roadmap + contexte + historique).

## Où vit chaque type de savoir
| Savoir | Fichier / lieu | Nature |
|---|---|---|
| Ce que fait l'app (manuel) | `docs/GUIDE.md` | présent |
| Ce qu'on va faire (plan) | `ROADMAP.md` | futur |
| Historique des décisions | messages de commit Git (onglet « commits » sur GitHub) | passé |
| Contexte de reprise (ce fichier) | `docs/CONTEXTE-PROJET.md` | continuité |

Tout est dans le repo GitHub → rien n'est perdu si l'ordinateur change.

## Qui / quoi
- **Porteur** : Özdoğan YILMAZ (oyilmaz@ezel.fr), PDG Group OY / EZEL Bâtiment. Non-développeur : donne la direction, le goût, les fonctionnalités ; le code est fait par l'assistant.
- **Origine** : maquette CRM/ERP construite seul (~27 000 lignes, un seul composant React) → transformée en vraie application modulaire.
- **Séparation importante** : le dev Benjamin CONET a un autre projet (`groupoy-app`, Next.js). **On n'y touche pas.** Notre projet = cette maquette (`crm-app`), indépendante.

## Où vit le projet
- **Code (local)** : `~/Desktop/Claude/crm-app`
- **Code (GitHub)** : `groupoy-company/groupoy-maquette` (compte admin@yilmaz.fr) — tag `v1-maquette` = maquette d'origine.
- **Base de données + fichiers** : Supabase projet `groupoy-maquette` (org « Group OY »), **séparé** du projet de Benjamin.
- **Domaine** : `groupoy.fr` enregistré chez **1&1 / IONOS** → futur sous-domaine `app.groupoy.fr` (CNAME, sans toucher au site vitrine). Pas de site vitrine pour l'instant.
- **Cloud** : compte Google Cloud actif (déploiement + archive documents à venir).

## Stack technique
- **Vite + React 18**, recharts (graphiques), lucide (icônes).
- **Données** : `src/data/` (constants, ao, theme, defaults).
- **Persistance** : hook `src/hooks/usePersistedState.js` = localStorage + synchro Supabase (table `app_kv`), via `src/lib/supabase.js`.
- **Interface** : 49 onglets, chacun un composant dans `src/tabs/TabX.jsx`. `src/App.jsx` = coquille + navigation (~4 000 lignes).
- **Auth** : connexion par code e-mail (OTP) construite ; livraison e-mail (Supabase + Resend) à finaliser.
- Lancer en local : `npm run dev` (port 5188).

## Deux entités dans l'app
- **Group OY** (holding + filiales BTP) et **Invest Exe** (avec L'Ezel). L'organigramme / page de garde présente le groupe.

## Décisions actées (résumé — détail dans les commits)
- Projets Supabase séparés (maquette ≠ groupoy-app de Benjamin).
- Documents : Supabase Storage (live) puis Google Cloud Storage (archive, Drive > 1 To), derrière un module unique `storage-helper`.
- Sécurité = priorité avant mise en ligne (RLS strict, retirer les mots de passe en clair).
- Revue « contrôleur » (relecture critique) systématique sur chaque changement important.
- Suivi de projet : à terme un module in-app (pour se passer de Monday).
- Décisions enregistrées automatiquement (mémoire + GitHub) sans que le porteur ait à le demander.

## Sécurité — à traiter
- Mots de passe en clair hérités de la maquette (INITIAL_USERS) → à retirer.
- RLS Supabase permissive (dev) → à durcir avant mise en ligne.
- `isLoggedIn` défaut `true` (dev) → passer à `false` en prod.
