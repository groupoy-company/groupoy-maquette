// === Hook de persistance — localStorage (v2 : remplace window.storage des artifacts Claude) ===
import { useState, useEffect, useRef } from 'react';

export const DATA_VERSION = "v81";

export const usePersistedState = (key, defaultValue) => {
  const fullKey = 'ruches_' + DATA_VERSION + '_' + key;
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(fullKey);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) { /* données corrompues → défaut */ }
    return defaultValue;
  });
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem(fullKey, JSON.stringify(state)); } catch (e) { /* quota plein */ }
  }, [fullKey, state]);
  return [state, setState];
};
