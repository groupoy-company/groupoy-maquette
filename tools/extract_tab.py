#!/usr/bin/env python3
"""Extracteur de sekme (onglet) : App.jsx → src/tabs/TabX.jsx
Usage: python3 tools/extract_tab.py <tab_id> [--dry]
- Trouve le bloc {ongletActif === '<tab_id>' && ( ... )}
- Détecte les identifiants utilisés définis dans le scope du composant → props
- Génère src/tabs/Tab<Pascal>.jsx (imports lucide/recharts/data auto)
- Remplace le bloc dans App.jsx par <TabX {...{props}} /> et ajoute l'import
"""
import re, sys, json, keyword

APP = 'src/App.jsx'
TABS_DIR = 'src/tabs'

JS_BUILTINS = set('''true false null undefined new typeof instanceof in of this
Object Array String Number Boolean Date Math JSON RegExp Map Set Promise
parseInt parseFloat isNaN isFinite encodeURIComponent decodeURIComponent
window document localStorage sessionStorage console alert confirm prompt
setTimeout setInterval clearTimeout clearInterval fetch navigator location
Error TypeError NaN Infinity Intl structuredClone requestAnimationFrame
if else for while do switch case default break continue return function const let var
try catch finally throw async await yield class extends super import export from as
key ref style className onClick onChange onKeyDown onMouseEnter onMouseLeave
onDragStart onDragOver onDrop onDragEnd onDragLeave onDoubleClick onBlur onFocus
onSubmit onInput onMouseDown onMouseUp onMouseMove onWheel onContextMenu
'''.split())

def read(p):
    with open(p) as f: return f.read()

def pascal(tab):
    return 'Tab' + ''.join(w.capitalize() for w in tab.split('_'))

def find_block(lines, tab):
    pat = re.compile(r"\{ongletActif === '" + tab + r"'")
    for i, l in enumerate(lines):
        if pat.search(l):
            depth = 0; started = False
            for j in range(i, min(i+7000, len(lines))):
                for ch in lines[j]:
                    if ch in '({': depth += 1; started = True
                    elif ch in ')}': depth -= 1
                if started and depth <= 0:
                    return i, j
    raise SystemExit(f"bloc introuvable: {tab}")

def harvest_scope(src):
    """SADECE modül seviyesi (0 girinti) + component üst seviyesi (2 boşluk girinti) isimler."""
    names = set()
    for line in src.split('\n'):
        m = re.match(r'(?:  )?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=', line)
        if m: names.add(m.group(1))
        m = re.match(r'(?:  )?(?:const|let)\s*\[\s*([^\]]+)\]\s*=', line)
        if m:
            for part in m.group(1).split(','):
                p = part.strip()
                if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
        m = re.match(r'(?:  )?(?:const|let)\s*\{([^}]+)\}\s*=', line)
        if m:
            for part in m.group(1).split(','):
                p = part.strip().split(':')[-1].strip().split('=')[0].strip()
                if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
        m = re.match(r'(?:  )?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)', line)
        if m: names.add(m.group(1))
        m = re.match(r'(?:  )?class\s+([A-Za-z_$][\w$]*)', line)
        if m: names.add(m.group(1))
    return names


def module_imports(src):
    """nom → (source, named?) pour tous les imports du fichier App.jsx"""
    imp = {}
    for m in re.finditer(r"import\s+(?:([A-Za-z_$][\w$]*)\s*,\s*)?\{([^}]*)\}\s*from\s*'([^']+)'", src):
        default, named, mod = m.groups()
        if default: imp[default] = (mod, False)
        for n in named.split(','):
            n = n.strip().split(' as ')[-1].strip()
            if n: imp[n] = (mod, True)
    for m in re.finditer(r"import\s+([A-Za-z_$][\w$]*)\s+from\s*'([^']+)'", src):
        imp[m.group(1)] = (m.group(2), False)
    return imp

def local_decls(block):
    names = set()
    for m in re.finditer(r'\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)', block): names.add(m.group(1))
    for m in re.finditer(r'\b(?:const|let)\s*\[\s*([^\]]+)\]', block):
        for part in m.group(1).split(','):
            p = part.strip()
            if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
    for m in re.finditer(r'\(([^()]{0,80}?)\)\s*=>', block):  # (a, b) =>
        for part in m.group(1).split(','):
            p = part.strip().split('=')[0].strip()
            if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
    for m in re.finditer(r'\b([a-z_$][\w$]*)\s*=>', block):   # x =>
        names.add(m.group(1))
    return names


def top_level_locals(body_lines):
    """IIFE gövdesinin SADECE üst seviyesindeki const/let/var isimleri (redeclare hatasını önlemek için)."""
    names = set(); depth = 0
    for l in body_lines:
        stripped = l.strip()
        if depth == 0:
            m = re.match(r'(?:const|let|var)\s+([A-Za-z_$][\w$]*)', stripped)
            if m: names.add(m.group(1))
            m2 = re.match(r'(?:const|let)\s*\[([^\]]+)\]', stripped)
            if m2:
                for part in m2.group(1).split(','):
                    p = part.strip()
                    if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
            m3 = re.match(r'(?:const|let)\s*\{([^}]+)\}', stripped)
            if m3:
                for part in m3.group(1).split(','):
                    p = part.strip().split(':')[-1].strip().split('=')[0].strip()
                    if re.fullmatch(r'[A-Za-z_$][\w$]*', p): names.add(p)
        for ch in l:
            if ch in '({[': depth += 1
            elif ch in ')}]': depth -= 1
    return names

def main():
    tab = sys.argv[1]
    dry = '--dry' in sys.argv
    src = read(APP)
    lines = src.split('\n')
    s, e = find_block(lines, tab)
    block_lines = lines[s:e+1]
    block = '\n'.join(block_lines)

    first = block_lines[0]
    # form tespiti + ekstra koşullar
    m_iife = re.search(r"\{ongletActif === '" + tab + r"'((?:\s*&&\s*[\w.!()]+?)*?)\s*&&\s*\(\(\)\s*=>\s*\{\s*$", first)
    m_simple = re.search(r"\{ongletActif === '" + tab + r"'((?:\s*&&\s*[\w.!()]+?)*?)\s*&&\s*\(\s*$", first)
    conds = ''
    if m_iife:
        form = 'iife'; conds = m_iife.group(1) or ''
        body_lines = block_lines[1:-1]
        last = re.sub(r'\}\s*\)\s*\(\s*\)\s*\}\s*$', '', block_lines[-1])
        if last.strip(): body_lines = body_lines + [last]
        inner = '\n'.join(body_lines)
        tl_locals = top_level_locals(body_lines)
    elif m_simple:
        form = 'simple'; conds = m_simple.group(1) or ''
        last_stripped = re.sub(r'\)\s*\}\s*$', '', block_lines[-1])
        inner = '\n'.join([l for l in block_lines[1:-1] + [last_stripped] if l.strip() != ''])
        tl_locals = set()
    else:
        raise SystemExit(f"format inconnu ligne {s+1}: {first[:120]}")

    scope = harvest_scope(src)
    imps = module_imports(src)
    tokens = set(re.findall(r'[A-Za-z_$][\w$]*', block))

    used_imports = {t: imps[t] for t in tokens if t in imps}
    props = sorted(t for t in tokens
                   if t in scope and t not in imps and t not in JS_BUILTINS
                   and t not in tl_locals
                   and t not in ('ongletActif',) and not keyword.iskeyword(t))

    name = pascal(tab)
    by_mod = {}
    for n, (mod, named) in used_imports.items():
        by_mod.setdefault(mod, {'named': [], 'default': None})
        if named: by_mod[mod]['named'].append(n)
        else: by_mod[mod]['default'] = n
    import_lines = []
    react_needed = 'React' in tokens
    for mod, info in sorted(by_mod.items()):
        mod_path = mod.replace('./', '../', 1) if mod.startswith('./') else mod
        parts = []
        if info['default']: parts.append(info['default'])
        if info['named']: parts.append('{ ' + ', '.join(sorted(set(info['named']))) + ' }')
        if mod == 'react':
            react_needed = False
            import_lines.append(f"import React, {{ {', '.join(sorted(set(info['named'])))} }} from 'react';")
        else:
            import_lines.append(f"import {', '.join(parts)} from '{mod_path}';")
    if react_needed:
        import_lines.insert(0, "import React from 'react';")

    props_destructure = ', '.join(props)
    if form == 'iife':
        body = f"  const {{ {props_destructure} }} = __props;\n{inner}"
    else:
        body = f"  const {{ {props_destructure} }} = __props;\n  return (\n{inner}\n  );"
    comp = f"""// === Onglet « {tab} » — extrait de App.jsx (modularisation, forme {form}) ===
{chr(10).join(import_lines)}

export default function {name}(__props) {{
{body}
}}
"""
    out_path = f"{TABS_DIR}/{name}.jsx"
    indent = re.match(r'\s*', block_lines[0]).group(0)
    spread = ', '.join(props)
    replacement = f"{indent}{{ongletActif === '{tab}'{conds} && <{name} {{...{{ {spread} }}}} />}}"

    print(f"tab={tab} [{form}] bloc {s+1}→{e+1} ({e-s+1}l) props={len(props)} conds='{conds.strip()}'")
    if dry:
        print("PROPS:", props[:50])
        return

    with open(out_path, 'w') as f: f.write(comp)
    new_lines = lines[:s] + [replacement] + lines[e+1:]
    out = new_lines
    for idx in range(len(out)-1, -1, -1):
        if re.match(r"import .* from '\./(data|hooks|tabs)/", out[idx]):
            out.insert(idx+1, f"import {name} from './tabs/{name}.jsx';")
            break
    with open(APP, 'w') as f: f.write('\n'.join(out))
    print(f"écrit: {out_path}")


if __name__ == '__main__':
    main()
