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
