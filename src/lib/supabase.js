// === Client Supabase (projet groupoy-maquette, dédié à la maquette) ===
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Actif seulement si les variables sont présentes (sinon l'app tourne en localStorage seul).
export const supabaseEnabled = Boolean(url && anon);
export const supabase = supabaseEnabled ? createClient(url, anon) : null;

// Lecture d'une valeur du store clé-valeur cloud
export async function kvGet(key) {
  if (!supabase) return undefined;
  const { data, error } = await supabase.from('app_kv').select('value').eq('key', key).maybeSingle();
  if (error) { console.warn('[supabase kvGet]', key, error.message); return undefined; }
  return data ? data.value : undefined;
}

// Écriture (upsert) d'une valeur
export async function kvSet(key, value) {
  if (!supabase) return;
  const { error } = await supabase.from('app_kv').upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) console.warn('[supabase kvSet]', key, error.message);
}

// ── Authentification par e-mail (lien de connexion ou code) ──
// Envoie un e-mail de connexion. IMPORTANT : `shouldCreateUser: false` →
// seules les adresses déjà autorisées (créées par un administrateur) peuvent entrer.
// Aucun inconnu ne peut se créer un compte.
export async function otpSignIn(email) {
  if (!supabase) return { error: 'Supabase non configuré' };
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: window.location.origin,
    }
  });
  if (error) {
    // Message clair pour une adresse non autorisée
    const m = (error.message || '').toLowerCase();
    if (m.includes('signups not allowed') || m.includes('not found') || m.includes('disabled')) {
      return { error: "Cette adresse n'est pas autorisée. Contactez l'administrateur." };
    }
    return { error: error.message };
  }
  return { error: null };
}

// Vérifie le code reçu → ouvre la session
export async function otpVerify(email, token) {
  if (!supabase) return { error: 'Supabase non configuré' };
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  return { error: error ? error.message : null, user: data?.user || null };
}

export async function authSignOut() {
  if (supabase) await supabase.auth.signOut();
}

export async function getAuthUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Session courante (utilisée au démarrage : si l'utilisateur revient par le lien
// reçu par e-mail, supabase-js a déjà posé la session → on ouvre l'application).
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

// Notifie l'application quand la session change (connexion par lien, déconnexion…)
export function onAuthChange(callback) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data?.subscription?.unsubscribe?.();
}
