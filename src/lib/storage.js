// === Module unique de stockage des documents ===
//
// POURQUOI CE MODULE : l'application ne sait jamais OÙ sont physiquement les
// fichiers. Elle demande simplement « envoie », « liste », « ouvre », « supprime ».
// Le fournisseur de stockage est choisi ici, à un seul endroit.
//
//   Aujourd'hui  : Supabase Storage (bucket privé « documents »)
//   Demain       : Google Cloud Storage pour les gros volumes d'archive (Drive > 1 To)
//
// Pour basculer vers GCS, il suffira d'écrire un second adaptateur plus bas et de
// changer `FOURNISSEUR` — aucun écran de l'application n'aura à être modifié.

import { supabase, supabaseEnabled } from './supabase.js';

const BUCKET = 'documents';
const FOURNISSEUR = 'supabase'; // 'supabase' | 'gcs' (à venir)

// ── Utilitaires ──────────────────────────────────────────────────────────────

// Nettoie un nom de fichier pour en faire une clé de stockage sûre
// (accents, espaces et caractères spéciaux → tirets).
export function assainirNom(nom) {
  return (nom || 'fichier')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(-120);
}

// Construit le chemin de rangement : entité/module/enregistrement/horodatage-nom
// Exemple : ezel/chantiers/CH001/1785742200-devis-gros-oeuvre.pdf
export function construireChemin({ entite = 'group', module = 'divers', enregistrementId = 'general', nomFichier }) {
  const horodatage = Date.now();
  return [entite, module, enregistrementId, `${horodatage}-${assainirNom(nomFichier)}`]
    .map(s => assainirNom(String(s)))
    .join('/');
}

export function formaterTaille(octets) {
  if (octets == null) return '—';
  if (octets < 1024) return octets + ' o';
  if (octets < 1048576) return (octets / 1024).toFixed(0) + ' Ko';
  if (octets < 1073741824) return (octets / 1048576).toFixed(1) + ' Mo';
  return (octets / 1073741824).toFixed(2) + ' Go';
}

export const TAILLE_MAX = 50 * 1024 * 1024; // 50 Mo

// ── Adaptateur Supabase Storage ──────────────────────────────────────────────

const adaptateurSupabase = {
  disponible: () => supabaseEnabled && !!supabase,

  async envoyer(chemin, fichier, { onProgress } = {}) {
    const { error } = await supabase.storage.from(BUCKET).upload(chemin, fichier, {
      cacheControl: '3600',
      upsert: false,
      contentType: fichier.type || undefined,
    });
    if (error) return { error: error.message };
    if (onProgress) onProgress(100);
    return { error: null, chemin };
  },

  async lister(prefixe = '') {
    const { data, error } = await supabase.storage.from(BUCKET).list(prefixe, {
      limit: 200, sortBy: { column: 'created_at', order: 'desc' },
    });
    if (error) return { error: error.message, fichiers: [] };
    return {
      error: null,
      fichiers: (data || [])
        .filter(f => f.id) // exclut les « dossiers »
        .map(f => ({
          nom: f.name,
          chemin: prefixe ? `${prefixe}/${f.name}` : f.name,
          taille: f.metadata?.size ?? null,
          type: f.metadata?.mimetype || '',
          creeLe: f.created_at || null,
        })),
    };
  },

  // Lien temporaire (le bucket est privé : jamais d'URL publique permanente)
  async lienTemporaire(chemin, secondes = 3600) {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(chemin, secondes);
    if (error) return { error: error.message, url: null };
    return { error: null, url: data.signedUrl };
  },

  async supprimer(chemin) {
    const { error } = await supabase.storage.from(BUCKET).remove([chemin]);
    return { error: error ? error.message : null };
  },
};

// ── Adaptateur Google Cloud Storage (emplacement réservé) ────────────────────
// À implémenter le jour de la migration des archives Drive (> 1 To).
// Il devra exposer exactement les mêmes fonctions que l'adaptateur Supabase,
// en passant par une fonction serveur qui signe les URL (jamais de clé côté client).
const adaptateurGCS = {
  disponible: () => false,
  async envoyer() { return { error: 'Stockage Google Cloud pas encore activé' }; },
  async lister() { return { error: 'Stockage Google Cloud pas encore activé', fichiers: [] }; },
  async lienTemporaire() { return { error: 'Stockage Google Cloud pas encore activé', url: null }; },
  async supprimer() { return { error: 'Stockage Google Cloud pas encore activé' }; },
};

const adaptateur = FOURNISSEUR === 'gcs' ? adaptateurGCS : adaptateurSupabase;

// ── Interface publique (la seule utilisée par l'application) ─────────────────

export const stockageDisponible = () => adaptateur.disponible();

export async function envoyerDocument({ entite, module, enregistrementId, fichier, onProgress }) {
  if (!adaptateur.disponible()) return { error: 'Stockage non configuré' };
  if (!fichier) return { error: 'Aucun fichier' };
  if (fichier.size > TAILLE_MAX) {
    return { error: `Fichier trop volumineux (${formaterTaille(fichier.size)}). Maximum : ${formaterTaille(TAILLE_MAX)}.` };
  }
  const chemin = construireChemin({ entite, module, enregistrementId, nomFichier: fichier.name });
  return adaptateur.envoyer(chemin, fichier, { onProgress });
}

export async function listerDocuments({ entite, module, enregistrementId }) {
  if (!adaptateur.disponible()) return { error: 'Stockage non configuré', fichiers: [] };
  const prefixe = [entite, module, enregistrementId]
    .filter(Boolean).map(s => assainirNom(String(s))).join('/');
  return adaptateur.lister(prefixe);
}

export async function ouvrirDocument(chemin) {
  if (!adaptateur.disponible()) return { error: 'Stockage non configuré', url: null };
  return adaptateur.lienTemporaire(chemin);
}

export async function supprimerDocument(chemin) {
  if (!adaptateur.disponible()) return { error: 'Stockage non configuré' };
  return adaptateur.supprimer(chemin);
}

// Retire l'horodatage technique pour l'affichage : « 1785742200-devis.pdf » → « devis.pdf »
export function nomLisible(nomStocke) {
  return (nomStocke || '').replace(/^\d{10,}-/, '');
}
