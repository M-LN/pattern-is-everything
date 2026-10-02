"""Build the data behind the "Run" button on every topic's code.

Each file in scripts/snippets/ holds one collection's snippets, the data
they run on and what the worked example quotes from them; running such a
file prints those numbers. This script turns them into run/<collection>.json:

  { "<topic>": { "code": the snippet, exactly as the page shows it,
                 "setup": imports and data, run first (shown under "Setup"),
                 "show": print lines appended to the snippet in the editor,
                 "pkgs": Pyodide packages to load } }

js/code-run.js fetches the file when a reader presses Run and executes
setup + (edited) snippet + show in Pyodide, in the browser.
scripts/check.mjs checks that every "code" still matches its page.

  python scripts/build-run.py           write run/*.json
  python scripts/build-run.py --check   exit 1 if a file would change
"""
import ast
import importlib.util
import inspect
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'scripts', 'snippets')
OUT = os.path.join(ROOT, 'run')
COLLECTIONS = ['stats', 'timeseries', 'ml-math', 'llm', 'mlops',
               'markets-charts', 'markets-indicators', 'markets-psychology', 'markets-risk']


def load(name):
    path = os.path.join(SRC, name + '.py')
    spec = importlib.util.spec_from_file_location('snip_' + name.replace('-', '_'), path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    with open(path, encoding='utf-8') as f:
        return mod, f.read()


def imports(text):
    lines = ['import numpy as np']
    if 'pd.' in text:
        lines.append('import pandas as pd')
    return lines


def packages(text):
    pk = ['numpy']
    if 'pd.' in text:
        pk.append('pandas')
    if 'scipy' in text:
        pk.append('scipy')
    return pk


def show_lines(expr):
    """'a, round(b, 2)' -> print('a =', a) / print('round(b, 2) =', round(b, 2))."""
    tree = ast.parse(expr, mode='eval').body
    parts = tree.elts if isinstance(tree, ast.Tuple) else [tree]
    out = []
    for p in parts:
        src = ast.get_source_segment(expr, p)
        out.append('print(%r, %s)' % (src + ' =', src) if len(parts) > 1 or isinstance(p, ast.Name) else 'print(%s)' % src)
    return '\n'.join(out)


def data_sources(source):
    """For P['id'] = (data, code, show): the source text of each data expression."""
    out = {}
    for node in ast.parse(source).body:
        if (isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Subscript)
                and isinstance(node.value, ast.Tuple) and len(node.value.elts) == 3):
            key = node.targets[0].slice.value
            out[key] = ast.get_source_segment(source, node.value.elts[0])
    return out


def build(name):
    mod, source = load(name)
    res = {}
    if name == 'markets-indicators':
        data = 'df = pd.DataFrame({\n' + ''.join(
            '    %r: %r,\n' % (k, v) for k, v in mod.DATA.items()) + '})\n'
        data += "df.index = range(1, 16)\ndf.index.name = 'day'\ndf['volume'] = df['volume'] * 1000   # in shares"
        base = ['close', 'high', 'low', 'volume']
        for tid, code in mod.SNIPPETS.items():
            res[tid] = {
                'code': code,
                'setup': 'import numpy as np\nimport pandas as pd\n\n' + data,
                'show': 'print(df.drop(columns=%r).round(2).to_string())' % base,
                'pkgs': ['numpy', 'pandas'],
            }
        return res
    if name == 'markets-charts':
        helpers = {f.__name__: inspect.getsource(f).rstrip() for f in (mod.from_points, mod.parabola, mod.bars)}
        notes = {'from_points': '# the example data: key points joined by straight lines',
                 'bars': '# the example data: the bars, given directly'}
        datas = data_sources(source)
        for tid, (_, code, show) in mod.P.items():
            used = [n for n in helpers if n + '(' in datas[tid]]
            note = next(notes[n] for n in used if n in notes)
            setup = ('import numpy as np\nimport pandas as pd\n\n' + note + '\n'
                     + '\n\n'.join(helpers[n] for n in used) + '\n\ndf = ' + datas[tid])
            res[tid] = {'code': code, 'setup': setup, 'show': show_lines(show), 'pkgs': ['numpy', 'pandas']}
        return res
    for tid, (code, show) in mod.P.items():
        res[tid] = {'code': code, 'setup': '\n'.join(imports(code + show)),
                    'show': show_lines(show), 'pkgs': packages(code + show)}
    return res


def main():
    check = '--check' in sys.argv
    stale = []
    os.makedirs(OUT, exist_ok=True)
    total = 0
    for name in COLLECTIONS:
        text = json.dumps(build(name), ensure_ascii=False, indent=1) + '\n'
        total += text.count('"code":')
        path = os.path.join(OUT, name + '.json')
        old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
        if old != text:
            stale.append(name)
            if not check:
                with open(path, 'w', encoding='utf-8', newline='\n') as f:
                    f.write(text)
    if check and stale:
        print('run: stale — ' + ', '.join(stale) + ' (python scripts/build-run.py)')
        sys.exit(1)
    print('run: %d snippets in %d files%s' % (total, len(COLLECTIONS),
          ', all current' if check else ', %d written' % len(stale)))


if __name__ == '__main__':
    main()
