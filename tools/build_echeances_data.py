#!/usr/bin/env python3
"""Extrait les tableaux d'échantillons (samples) des onglets source et génère
src/data/echeances.js — source unique pour le Centre d'échéances ET les onglets.
Extraction fidèle (copie exacte) : évite les erreurs de transcription."""
import re, sys

def extract_array(path, var):
    """Retourne le littéral de tableau [...] affecté à `const <var> = [` dans path."""
    with open(path) as f:
        lines = f.read().split('\n')
    start = None
    for i, l in enumerate(lines):
        if re.search(r'\bconst\s+' + re.escape(var) + r'\s*=\s*\[\s*$', l):
            start = i
            indent = re.match(r'\s*', l).group(0)
            break
    if start is None:
        raise SystemExit(f"tableau {var} introuvable dans {path}")
    # fin = première ligne '<indent>]' ou '<indent>];'
    for j in range(start + 1, len(lines)):
        r = lines[j].rstrip()
        if r == indent + ']' or r == indent + '];':
            body = lines[start + 1:j]
            # dé-indente proprement
            return '[\n' + '\n'.join(body) + '\n]'
    raise SystemExit(f"fin du tableau {var} introuvable dans {path}")

BASE = 'src/tabs/'
ass = extract_array(BASE + 'TabAssurances.jsx', 'sampleAss')
ctr = extract_array(BASE + 'TabContrats.jsx', 'sampleCtr')
auto = extract_array(BASE + 'TabParcAutomobile.jsx', 'sampleAuto')
conf = extract_array(BASE + 'TabConformite.jsx', 'items')

out = f"""// === Données d'échéances — source unique (généré par tools/build_echeances_data.py) ===
// Échantillons extraits fidèlement des onglets. Servent de repli quand l'état live est vide,
// et de source pour le Centre d'échéances.

export const SAMPLE_ASS = {ass};

export const SAMPLE_CTR = {ctr};

export const SAMPLE_AUTO = {auto};

export const CONF_ITEMS = {conf};

// Statuts calculés par rapport à aujourd'hui
export function echeanceStatut(dateStr, seuilJours = 60) {{
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const now = new Date();
  const jours = Math.round((d - now) / 86400000);
  if (jours < 0) return {{ cle: 'expire', label: 'Expiré', jours }};
  if (jours <= seuilJours) return {{ cle: 'bientot', label: 'Bientôt', jours }};
  return {{ cle: 'ok', label: 'À venir', jours }};
}}

// Construit la liste unifiée des échéances à partir des données live (repli = échantillon).
// Chaque entrée : {{ id, source, sourceLabel, categorie, titre, sousTitre, date, filialeId, seuil }}
export function buildEcheances({{ assData, ctrData, autoData, veilleAO }} = {{}}) {{
  const ass = (assData && assData.length ? assData : SAMPLE_ASS);
  const ctr = (ctrData && ctrData.length ? ctrData : SAMPLE_CTR);
  const auto = (autoData && autoData.length ? autoData : SAMPLE_AUTO);
  const ao = (veilleAO && veilleAO.length ? veilleAO : []);
  const out = [];

  ass.forEach(a => {{
    if (a.dateFin) out.push({{ id: 'ass-' + a.id, source: 'assurance', sourceLabel: 'Assurance',
      categorie: a.type, titre: a.assureur + ' — ' + (a.numPolice || ''), sousTitre: a.couverture || '',
      date: a.dateFin, filialeId: a.filialeId, seuil: 60 }});
  }});

  ctr.forEach(c => {{
    if (c.dateFin) out.push({{ id: 'ctr-' + c.id, source: 'contrat', sourceLabel: 'Contrat',
      categorie: c.type, titre: c.titre, sousTitre: c.partenaire || '',
      date: c.dateFin, filialeId: c.filialeId, seuil: c.alerteJours || 60 }});
  }});

  auto.forEach(v => {{
    // ne garder que les véhicules encore en service
    const horsService = ['restitue', 'cede_vendu', 'perte_totale', 'hors_service', 'vole'];
    if (horsService.includes(v.statutAdmin)) return;
    const nom = [v.marque, v.modele].filter(Boolean).join(' ') + (v.immat ? ' (' + v.immat + ')' : '');
    if (v.ctDateProchain) out.push({{ id: 'ct-' + v.id, source: 'vehicule_ct', sourceLabel: 'Contrôle technique',
      categorie: 'controle_technique', titre: 'CT — ' + nom, sousTitre: 'Contrôle technique',
      date: v.ctDateProchain, filialeId: v.filialeId, seuil: 60 }});
    if (v.dateFinContrat) out.push({{ id: 'leasing-' + v.id, source: 'vehicule_leasing', sourceLabel: 'Fin leasing',
      categorie: 'leasing', titre: 'Fin leasing — ' + nom, sousTitre: v.entiteDetentrice || '',
      date: v.dateFinContrat, filialeId: v.filialeId, seuil: 90 }});
  }});

  CONF_ITEMS.forEach(i => {{
    if (i.prochaine) out.push({{ id: 'conf-' + i.id, source: 'conformite', sourceLabel: 'Conformité',
      categorie: i.categorie, titre: i.titre, sousTitre: i.notes || '',
      date: i.prochaine, filialeId: i.filialeId, seuil: 60 }});
  }});

  ao.forEach(a => {{
    if (a.dateLimite && (a.statut !== 'Perdu' && a.statut !== 'Abandonné' && a.decision !== 'perdu')) {{
      out.push({{ id: 'ao-' + a.id, source: 'appel_offre', sourceLabel: 'Appel d\\'offres',
        categorie: a.type, titre: a.titre, sousTitre: a.acheteur || '',
        date: (a.dateLimite || '').slice(0, 10), filialeId: a.filialeId || 'all', seuil: 30 }});
    }}
  }});

  return out;
}}
"""

with open('src/data/echeances.js', 'w') as f:
    f.write(out)
print("écrit: src/data/echeances.js")
print(f"  SAMPLE_ASS lignes={ass.count(chr(10))-1} SAMPLE_CTR={ctr.count(chr(10))-1} SAMPLE_AUTO={auto.count(chr(10))-1} CONF_ITEMS={conf.count(chr(10))-1}")
