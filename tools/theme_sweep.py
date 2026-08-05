#!/usr/bin/env python3
"""Remplace les couleurs claires ECRITES EN DUR par les variables du theme.

Pourquoi : ces couleurs ne changent pas quand on choisit le theme sombre
(« Obsidienne & Or »), d'ou des ecrans qui restent blancs.

Prudence : on ne remplace QUE la valeur d'une propriete de fond ou de bordure.
`color:'white'` (texte blanc sur bouton colore) n'est jamais touche.

Usage: python3 tools/theme_sweep.py [--dry] [fichiers...]
"""
import re, sys, glob

# Proprietes dont la valeur est un fond ou une bordure
PROPS = ('background', 'backgroundColor', 'borderColor', 'border', 'borderTop',
         'borderBottom', 'borderLeft', 'borderRight', 'boxShadow', 'outline',
         # cles maison servant de fond dans les tableaux de statuts : { color:…, bg:… }
         'bg', 'bgColor', 'fond')

# Correspondances : littéral clair -> variable de theme
FONDS = {
    'white': '$bgCard', '#fff': '$bgCard', '#ffffff': '$bgCard',
    '#fefdfb': '$bgCard', '#faf9f7': '$bgCard', '#fdfdfd': '$bgCard',
    '#f9fafb': '$bgSub', '#f8fafc': '$bgSub', '#f7f7f7': '$bgSub',
    '#fafafa': '$bgSub', '#f3f4f6': '$bgSub', '#f5f5f5': '$bgSub',
}
BORDURES = {
    '#f0ebe3': '$border', '#e8e4de': '$border', '#e5e7eb': '$border',
    '#e5e5e5': '$border', '#eee': '$border', '#eeeeee': '$border',
    '#ddd': '$border', '#dddddd': '$border', '#e0e0e0': '$border',
}
# Teintes de sens (alerte / attention / succes) : on passe en translucide,
# ce qui fonctionne sur fond clair COMME sur fond sombre.
TEINTES = {
    '#fef2f2': "'rgba(239,68,68,0.10)'", '#fee2e2': "'rgba(239,68,68,0.14)'",
    '#fecaca': "'rgba(239,68,68,0.22)'", '#fca5a5': "'rgba(239,68,68,0.30)'",
    '#fefce8': "'rgba(212,160,48,0.12)'", '#fef3c7': "'rgba(212,160,48,0.18)'",
    '#fde68a': "'rgba(212,160,48,0.26)'",
    '#dcfce7': "'rgba(34,197,94,0.14)'", '#d1fae5': "'rgba(34,197,94,0.14)'",
    '#bbf7d0': "'rgba(34,197,94,0.22)'",
    '#dbeafe': "'rgba(59,130,246,0.14)'", '#e0e7ff': "'rgba(99,102,241,0.14)'",
    '#ede9fe': "'rgba(139,92,246,0.14)'", '#f3e8ff': "'rgba(139,92,246,0.14)'",
    '#cffafe': "'rgba(6,182,212,0.14)'", '#ffedd5': "'rgba(249,115,22,0.14)'",
    # ajouts 2e passe
    '#fffbeb': "'rgba(212,160,48,0.12)'", '#fffde7': "'rgba(212,160,48,0.10)'",
    '#f0fdf4': "'rgba(34,197,94,0.10)'", '#ecfdf5': "'rgba(34,197,94,0.10)'",
    '#f0f7f0': "'rgba(34,197,94,0.10)'", '#eff6ff': "'rgba(59,130,246,0.10)'",
    '#f5f3ff': "'rgba(139,92,246,0.10)'", '#fdf2f8': "'rgba(236,72,153,0.10)'",
    '#fff7ed': "'rgba(249,115,22,0.10)'", '#fef9c3': "'rgba(212,160,48,0.16)'",
}
# Teintes « creme » de l'ancienne charte : deviennent des fonds de theme
FONDS_CREME = {
    '#faf8f5': '$bgSub', '#faf6ef': '$bgSub', '#fafbfc': '$bgSub',
    '#fdfcfa': '$bgSub', '#f9f7f4': '$bgSub', '#f7f5f2': '$bgSub',
}

def fin_de_valeur(s, i):
    """Retourne l'index de fin de la valeur d'une propriete commencant a i."""
    prof = 0
    while i < len(s):
        c = s[i]
        if c in '([{': prof += 1
        elif c in ')]}':
            if prof == 0: return i
            prof -= 1
        elif c == ',' and prof == 0: return i
        elif c in '"\'`':
            q = c; i += 1
            while i < len(s) and s[i] != q:
                if s[i] == '\\': i += 1
                i += 1
        i += 1
    return len(s)

def traiter(src):
    """Remplace dans src, renvoie (nouveau_src, nb_remplacements)."""
    total = 0
    motif_prop = re.compile(r'\b(' + '|'.join(PROPS) + r')\s*:')
    sortie = []
    pos = 0
    for m in motif_prop.finditer(src):
        if m.start() < pos:      # deja consomme par une valeur precedente
            continue
        debut = m.end()
        fin = fin_de_valeur(src, debut)
        valeur = src[debut:fin]
        nouvelle = valeur
        # fonds et bordures : on remplace le littéral (avec ses guillemets) par la variable
        table = dict(FONDS); table.update(BORDURES); table.update(FONDS_CREME)
        for litt, var in table.items():
            for q in ("'", '"'):
                cible = q + litt + q
                if cible in nouvelle:
                    nouvelle = nouvelle.replace(cible, var)
        # teintes de sens : littéral -> chaine rgba
        for litt, rgba in TEINTES.items():
            for q in ("'", '"'):
                cible = q + litt + q
                if cible in nouvelle:
                    nouvelle = nouvelle.replace(cible, rgba)
        if nouvelle != valeur:
            total += nouvelle.count('$') - valeur.count('$') + \
                     sum(nouvelle.count(v) for v in TEINTES.values()) - \
                     sum(valeur.count(v) for v in TEINTES.values())
            total = max(total, 1) if total <= 0 else total
        sortie.append(src[pos:debut]); sortie.append(nouvelle)
        pos = fin
    sortie.append(src[pos:])
    return ''.join(sortie), total

def compter_clairs(s):
    n = 0
    for litt in list(FONDS) + list(BORDURES) + list(TEINTES) + list(FONDS_CREME):
        for q in ("'", '"'):
            n += s.count(q + litt + q)
    return n

def main():
    dry = '--dry' in sys.argv
    cibles = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not cibles:
        cibles = sorted(glob.glob('src/tabs/*.jsx')) + ['src/App.jsx']
    grand_total = 0
    for f in cibles:
        src = open(f).read()
        avant = compter_clairs(src)
        if avant == 0: continue
        neuf, _ = traiter(src)
        apres = compter_clairs(neuf)
        change = avant - apres
        if change:
            grand_total += change
            print(f"  {change:>4} remplacements — {f.split('/')[-1]:<28} (restants: {apres})")
            if not dry:
                open(f, 'w').write(neuf)
    print(f"\n{'[SIMULATION] ' if dry else ''}TOTAL : {grand_total} couleurs claires remplacees par des variables de theme")

if __name__ == '__main__':
    main()
