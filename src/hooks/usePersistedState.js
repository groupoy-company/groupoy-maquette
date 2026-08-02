// === Hook de persistance — localStorage (cache instantané) + Supabase (source cloud) ===
import { useState, useEffect, useRef } from 'react';
import { kvGet, kvSet, supabaseEnabled } from '../lib/supabase.js';

export const DATA_VERSION = "v81";

export const usePersistedState = (key, defaultValue) => {
  const fullKey = 'ruches_' + DATA_VERSION + '_' + key;

  // 1) Démarrage instantané depuis le cache localStorage
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(fullKey);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) { /* données corrompues → défaut */ }
    return defaultValue;
  });

  const first = useRef(true);
  const hydrated = useRef(false);

  // 2) Au montage : récupérer la valeur cloud (source de vérité) si dispo
  useEffect(() => {
    let cancelled = false;
    if (!supabaseEnabled) { hydrated.current = true; return; }
    (async () => {
      try {
        const cloud = await kvGet(fullKey);
        if (!cancelled && cloud !== undefined && cloud !== null) {
          setState(cloud);
          try { localStorage.setItem(fullKey, JSON.stringify(cloud)); } catch (e) {}
        }
      } catch (e) { /* offline → on garde le cache local */ }
      finally { hydrated.current = true; }
    })();
    return () => { cancelled = true; };
  }, [fullKey]);

  // 3) À chaque changement : cache local + cloud (après hydratation, pour ne pas écraser le cloud avec le défaut)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem(fullKey, JSON.stringify(state)); } catch (e) {}
    if (supabaseEnabled && hydrated.current) { kvSet(fullKey, state); }
  }, [fullKey, state]);

  return [state, setState];
};
