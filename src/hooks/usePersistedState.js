// === Hook de persistance (window.storage — artifacts Claude) ===
// Extrait de App.jsx lors de la modularisation (étape 4).
import React, { useState, useEffect } from 'react';

export const DATA_VERSION = "v81";
export const usePersistedState = (key, defaultValue) => {
  const fullKey = 'ruches_' + DATA_VERSION + '_' + key;
  const [state, setState] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  // Charger depuis storage au montage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (window.storage) {
          const result = await window.storage.get(fullKey);
          if (!cancelled && result && result.value) {
            const parsed = JSON.parse(result.value);
            setState(parsed);
          }
        }
      } catch(e) { /* pas de données sauvegardées */ }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Sauvegarder à chaque changement (après le chargement initial)
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        if (window.storage) {
          await window.storage.set(fullKey, JSON.stringify(stateRef.current));
        }
      } catch(e) { /* échec sauvegarde */ }
    })();
  }, [state, loaded]);

  return [state, setState];
};
