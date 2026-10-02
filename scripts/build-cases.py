"""Build the real-data case studies: cases/<id>/index.html and their Run data.

Each case is a module in scripts/cases/ (housing, credit, energy, market):
a question, the data set, and STEPS of text and code. This script runs the
steps in order in one namespace — the way a reader running them top to
bottom would — and writes each step's printed output under its code. Text
in the steps may name values the code computed, as {name} placeholders, so
every number in the prose comes from the run that printed it.

Data: cases/data/*.csv, written by scripts/cases/prepare-data.py. The market
case reads the Kenneth R. French Data Library file straight from its URL;
here the URL is pointed at the copy in .cache/cases/, and the case has no
Run button (the page cannot fetch from that site).

Also written:
  run/cases-<id>.json   for js/code-run.js — step k's setup is steps 1..k-1
  notebooks/<file>, lite/files/<file>   the same steps as a Jupyter notebook

  python scripts/build-cases.py            write
  python scripts/build-cases.py --check    exit 1 if anything would change
"""
import contextlib
import copy
import html
import importlib
import io
import json
import os
import re
import shutil
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts', 'cases'))
SITE = 'https://patterniseverything.com'
REVIEWED = '2 October 2026'
CASES = ['housing', 'credit', 'energy', 'market']
DATA_DIR = os.path.join(ROOT, 'cases', 'data')
CACHE = os.path.join(ROOT, '.cache', 'cases')

CONN = json.load(open(os.path.join(ROOT, 'connections.json'), encoding='utf-8'))


def topic(ref):
    col, tid = ref.rsplit('/', 1)
    t = CONN['topics'].get('/%s/#%s' % (col, tid))
    if not t:
        raise SystemExit('cases: unknown topic ' + ref)
    return t['t'], '/%s/%s/' % (col, tid)


def esc(s):
    return html.escape(s, quote=False)


def packages(text):
    pk = ['numpy']
    if 'pd.' in text or 'pandas' in text:
        pk.append('pandas')
    if 'sklearn' in text:
        pk.append('scikit-learn')
    if 'scipy' in text:
        pk.append('scipy')
    return pk


def run_steps(mod):
    """Execute the steps; return (namespace, [stdout per step], [seconds per step])."""
    ns = {'__name__': '__case__'}
    outs, secs = [], []
    subs = getattr(mod, 'URL_SUBS', {})
    cwd = os.getcwd()
    os.chdir(DATA_DIR)
    try:
        import numpy as np
        np.set_printoptions(legacy='1.25')
        for st in mod.STEPS:
            code = st['code']
            for url, local in subs.items():    # the URL expression, exactly as in the code -> the cached file
                assert url in code or url not in st['code'], url
                code = code.replace(url, repr(os.path.join(CACHE, local).replace('\\', '/')))
            buf = io.StringIO()
            t = time.time()
            with contextlib.redirect_stdout(buf):
                exec(compile(code, '<%s>' % mod.ID, 'exec'), ns)
            secs.append(time.time() - t)
            outs.append(buf.getvalue())
    finally:
        os.chdir(cwd)
    return ns, outs, secs


def fill(text, values):
    try:
        return text.format_map(values)
    except (KeyError, IndexError, ValueError) as e:
        raise SystemExit('cases: placeholder %s in %r' % (e, text[:80]))


CSS = """
    body { padding-top: var(--hdr-h); }
    .portal-header { position: fixed; top: 0; left: 0; right: 0; height: var(--hdr-h); background: var(--bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 16px; z-index: 200; backdrop-filter: blur(12px); }
    .back-link { font-family: var(--mono); font-size: 11px; color: var(--muted); text-decoration: none; }
    .back-link:hover { color: var(--accent); }
    .case-page { width: min(840px, calc(100% - 32px)); max-width: none; margin: 0 auto 80px; padding: 0; }
    .case-hero { padding: 48px 0 6px; }
    .crumb { font: 500 11px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
    .crumb a { color: var(--accent); text-underline-offset: 2px; }
    .case-hero h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(30px, 5.5vw, 46px); line-height: 1.1; letter-spacing: -.02em; margin: 10px 0 14px; }
    .case-hero h2 em { color: var(--accent); }
    .case-q { font-size: 18px; line-height: 1.7; margin: 0; }
    .case a { color: var(--accent3); text-underline-offset: 2px; }
    @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .case a { color: #6fa8ff; } }
    [data-theme="dark"] .case a { color: #6fa8ff; }
    .case-data { margin: 26px 0 8px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); padding: 14px 18px; display: grid; gap: 6px; font-size: 14px; line-height: 1.65; }
    .case-data b { font: 500 11px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-right: 6px; }
    .case h3 { font-family: var(--serif); font-weight: 700; font-size: 24px; margin: 44px 0 10px; }
    .case h3 .n { font: 500 13px var(--mono); color: var(--accent); margin-right: 8px; vertical-align: 3px; }
    .case p { line-height: 1.8; margin: 0 0 14px; }
    .case .code-block { margin: 12px 0 10px; }
    .run-static { margin: 0 0 14px; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface2); font-family: var(--mono); font-size: 12px; line-height: 1.65; white-space: pre-wrap; overflow-x: auto; }
    .run-static::before { content: 'Output'; display: block; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
    .case-fig { margin: 18px 0 20px; }
    .case-chart { width: 100%; height: auto; display: block; color: var(--text); font-family: var(--mono); }
    .case-chart .cl { font-size: 12px; fill: currentColor; }
    .case-chart .cv { font-size: 11px; fill: var(--muted); }
    .case-chart .cg { stroke: var(--border); stroke-width: 1; }
    .case-chart .cz { stroke: var(--muted); stroke-width: 1; }
    .case-chart .cs1 { fill: var(--accent); } .case-chart .cs2 { fill: var(--accent3); } .case-chart .cs3 { fill: var(--accent2); } .case-chart .cs4 { fill: var(--accent4); }
    .case-chart polyline { fill: none; stroke-width: 1.6; }
    .case-chart .cp1 { stroke: var(--accent); } .case-chart .cp2 { stroke: var(--accent3); } .case-chart .cp3 { stroke: var(--accent2); } .case-chart .cp4 { stroke: var(--accent4); }
    .case-fig figcaption { font-size: 12.5px; color: var(--muted); line-height: 1.6; margin-top: 6px; }
    .case-box { margin: 36px 0 0; border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; background: var(--surface); }
    .case-box h4 { font: 500 11px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 10px; }
    .case-box ul { margin: 0; padding-left: 20px; display: grid; gap: 8px; line-height: 1.7; }
    .case-box.src ul { font-size: 13px; color: var(--muted); }
    .case-box .t { color: var(--muted); }
    .reviewed { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 32px; }
    .case-cards { display: grid; gap: 12px; margin: 22px 0; }
    @media (max-width: 600px) { .portal-header { padding: 0 16px; } .case-q { font-size: 16px; } }"""


def page(title, desc, path, body, og):
    return '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>%(title)s — Pattern is Everything</title>
  <meta name="description" content="%(desc)s">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="canonical" href="%(site)s%(path)s">
  <script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "Article", "headline": %(jtitle)s, "description": %(jdesc)s,
    "url": "%(site)s%(path)s", "dateModified": "2026-10-02", "inLanguage": "en",
    "author": { "@type": "Organization", "name": "Pattern is Everything", "url": "%(site)s/" } }
  </script>
  <meta property="og:url" content="%(site)s%(path)s">
  <meta property="og:title" content="%(title)s">
  <meta property="og:description" content="%(desc)s">
  <meta property="og:type" content="article">
  <meta property="og:image" content="%(og)s">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Pattern is Everything">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/css/fonts.css?v=2">
  <link rel="stylesheet" href="/css/main.css?v=38">
  <script>(function(){var s=null;try{s=localStorage.getItem('theme')}catch(e){}if(s)document.documentElement.setAttribute('data-theme',s);else if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.setAttribute('data-theme','dark');})()</script>
  <script data-goatcounter="https://patterniseverything.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>%(css)s
  </style>
</head>
<body>
<a class="skip-link" href="#mainContent">Skip to main content</a>
<header class="portal-header">
  <a class="logo-ring" href="/" title="Back to Pattern is Everything"></a>
  <h1 style="font-family:var(--serif);font-size:20px;font-weight:700;letter-spacing:-.01em;">Case <em style="font-style:italic;color:var(--accent)">studies</em></h1>
  <nav class="portal-nav" aria-label="Primary">
    <a href="/ml/">ML</a>
    <a href="/stats/">Stats</a>
    <a href="/markets/">Markets</a>
    <a href="/essays/">Essays</a>
    <a href="/guides/">Guides</a>
    <a href="/cases/" class="is-current" aria-current="page">Cases</a>
    <a href="/sandbox/">Sandbox</a>
    <a href="/lab/">Lab</a>
    <a href="/start/">Start here</a>
  </nav>
  <div style="margin-left:auto;display:flex;gap:12px;align-items:center;">
    <a class="back-link" href="/cases/">All cases</a>
  </div>
</header>
<main class="case case-page" id="mainContent">
%(body)s
<p class="reviewed">Last reviewed: %(reviewed)s · <a href="/method/">How this site checks its content</a></p>
</main>
<script src="/js/track.js?v=1" defer></script>
<script src="/js/code-run.js?v=2" defer></script>
<script src="/js/ui-enhance.js?v=34" defer></script>
</body>
</html>
''' % {'title': esc(re.sub('<[^>]+>', '', title)), 'desc': html.escape(desc), 'site': SITE, 'path': path,
       'jtitle': json.dumps(re.sub('<[^>]+>', '', title)), 'jdesc': json.dumps(desc), 'css': CSS,
       'body': body, 'reviewed': REVIEWED, 'og': og}


def build_case(name):
    mod = importlib.import_module(name)
    ns, outs, secs = run_steps(mod)
    values = dict(ns)
    if hasattr(mod, 'derive'):
        values.update(mod.derive(ns))
    runnable = bool(getattr(mod, 'FILES', None))
    key = 'cases-' + mod.ID
    d = mod.DATA
    parts = ['''<section class="case-hero">
<div class="crumb"><a href="/cases/">Cases</a> · %s</div>
<h2>%s</h2>
<p class="case-q">%s</p>
</section>''' % (esc(mod.KICKER), mod.TITLE, fill(mod.QUESTION, values))]
    parts.append('<div class="case-data"><div><b>Data</b>%s — %s</div><div><b>Source</b>%s</div>'
                 '<div><b>Licence</b>%s</div>%s</div>' % (
                     d['name'], d['what'], d['source'], d['license'],
                     '<div><b>File</b><a href="/cases/data/%s" download>%s</a> (%s KB), as used below</div>' % (
                         d['file'], d['file'], round(os.path.getsize(os.path.join(DATA_DIR, d['file'])) / 1024))
                     if d.get('file') else ('<div><b>Get it</b>%s</div>' % d['get'] if d.get('get') else '')))
    run = {}
    for i, st in enumerate(mod.STEPS, 1):
        sid = 'step-%d' % i
        parts.append('<h3 id="%s"><span class="n">%02d</span>%s</h3>' % (sid, i, esc(st['title'])))
        if st.get('before'):
            parts.append('<p>%s</p>' % fill(st['before'], values))
        attr = ' data-run="%s/%s"' % (key, sid) if runnable else ''
        parts.append('<div class="code-block" tabindex="0"%s><pre>%s</pre></div>' % (attr, esc(st['code'])))
        if runnable:
            parts.append('<div class="run-bar"><button type="button" class="run-btn">▶ Run</button>'
                         '<span class="run-hint">Python, in your browser%s — edit the code and run it again</span></div>'
                         % (' — runs steps 1–%d first' % (i - 1) if i > 2 else ' — runs step 1 first' if i == 2 else ''))
            setup = '\n\n'.join(s['code'] for s in mod.STEPS[:i - 1])
            run[sid] = {'code': st['code'], 'setup': setup, 'show': '',
                        'pkgs': packages(setup + st['code']),
                        'files': ['/cases/data/' + f for f in mod.FILES]}
        parts.append('<pre class="run-static">%s</pre>' % esc(outs[i - 1].rstrip('\n')))
        if st.get('after'):
            parts.append('<p>%s</p>' % fill(st['after'], values))
        if st.get('chart'):
            parts.append(st['chart'](ns))
    parts.append('<div class="case-box"><h4>What this case shows</h4><ul>%s</ul></div>'
                 % ''.join('<li>%s</li>' % fill(t, values) for t in mod.TAKEAWAYS))
    links = []
    for ref, why in mod.PATTERNS:
        t, url = topic(ref)
        links.append('<li><a href="%s">%s</a> <span class="t">— %s</span></li>' % (url, esc(t), esc(why)))
    parts.append('<div class="case-box"><h4>The patterns behind it</h4><ul>%s</ul></div>' % ''.join(links))
    nb = mod.NOTEBOOK
    parts.append('<div class="case-box"><h4>Run it yourself</h4><ul>%s'
                 '<li><a href="/notebooks/%s" download>Download the notebook</a> — the same steps, for Jupyter on your own machine%s</li>'
                 '<li><a href="/lite/lab/?path=%s" target="_blank" rel="noopener">Open it in JupyterLite</a> — Jupyter in the browser, nothing to install</li></ul></div>'
                 % ('<li>Each step above has a <b>Run</b> button: Python runs in this page, on the data file above.</li>' if runnable else '',
                    nb, '; it downloads the data itself' if not runnable else '', nb))
    parts.append('<div class="case-box src"><h4>Sources</h4><ul>%s</ul></div>'
                 % ''.join('<li>%s</li>' % s for s in mod.SOURCES))
    html_out = page(mod.SHORT + ' — case study', mod.DESCRIPTION, '/cases/%s/' % mod.ID, '\n'.join(parts),
                    share_card(mod.ID))
    hub = {
        'id': mod.ID, 'level': mod.LEVEL, 'badge': mod.BADGE,
        'evidenceClass': mod.EVIDENCE[0], 'evidenceLabel': mod.EVIDENCE[1],
        'title': mod.TITLE, 'kicker': mod.KICKER, 'summary': fill(mod.QUESTION, values),
        'finding': fill(mod.FINDING, values), 'page': '/cases/%s/' % mod.ID,
        'datasetName': re.sub('<[^>]+>', '', d['name']),
        'datasetUrl': re.search(r'href="([^"]+)"', d['source']).group(1),
        'notebookPath': mod.NOTEBOOK, 'runnable': runnable,
        'steps': [st['title'] for st in mod.STEPS],
        'topics': [[topic(ref)[0], topic(ref)[1]] for ref, _ in mod.PATTERNS],
        'lab': list(mod.LAB),
    }
    return mod, html_out, run, secs, notebook(mod, values), hub


def hub_js(entries):
    """The CASES array in cases/cases.js, between its markers."""
    path = os.path.join(ROOT, 'cases', 'cases.js')
    src = open(path, encoding='utf-8').read().replace('\r\n', '\n')
    a, b = src.index('/* cases:start'), src.index('/* cases:end */')
    block = ('/* cases:start — written by scripts/build-cases.py from scripts/cases/*.py; edit those. */\n'
             'const CASES = ' + json.dumps(entries, ensure_ascii=False, indent=2) + ';\n')
    return src[:a] + block + src[b:]


def lite_index():
    """lite/api/contents/all.json lists the files JupyterLite shows; keep it in step with lite/files/."""
    path = os.path.join(ROOT, 'lite', 'api', 'contents', 'all.json')
    idx = json.load(open(path, encoding='utf-8'))
    old = {c['name']: c for c in idx['content']}
    stamp = '2026-10-02T00:00:00.000000Z'
    content = []
    for name in sorted(os.listdir(os.path.join(ROOT, 'lite', 'files'))):
        size = os.path.getsize(os.path.join(ROOT, 'lite', 'files', name))
        prev = old.get(name)
        if prev and prev['size'] == size:
            content.append(prev)
            continue
        kind = 'notebook' if name.endswith('.ipynb') else 'file'
        mime = {'.csv': 'text/csv', '.md': 'text/markdown'}.get(os.path.splitext(name)[1]) if kind == 'file' else None
        content.append({'content': None, 'created': prev['created'] if prev else stamp, 'format': None,
                        'hash': None, 'hash_algorithm': None, 'last_modified': stamp, 'mimetype': mime,
                        'name': name, 'path': name, 'size': size, 'type': kind, 'writable': True})
    idx['content'] = content
    return json.dumps(idx, indent=2) + '\n'


def share_card(case_id):
    """The case's og:image (scripts/build-page-cards.mjs), versioned by its hash."""
    import hashlib
    f = os.path.join(ROOT, 'assets', 'og', 'pages', 'cases-%s.jpg' % case_id)
    if not os.path.exists(f):
        return SITE + '/assets/og/og-start.png'
    return '%s/assets/og/pages/cases-%s.jpg?v=%s' % (SITE, case_id, hashlib.md5(open(f, 'rb').read()).hexdigest()[:8])


def md(text):
    """Case HTML to notebook Markdown (Jupyter renders inline HTML)."""
    return re.sub(r'<a href="/', '<a href="' + SITE + '/', text)


def notebook(mod, values):
    cells = [('markdown', '# %s\n\n%s\n\n*From [Pattern is Everything](%s/cases/%s/). Data: %s — %s.*'
              % (re.sub('<[^>]+>', '', mod.TITLE), fill(mod.QUESTION, values), SITE, mod.ID,
                 re.sub('<[^>]+>', '', mod.DATA['name']), re.sub('<[^>]+>', '', mod.DATA['source'])))]
    if getattr(mod, 'FILES', None):
        cells.append(('code', '# Fetch the data file if it is not next to this notebook (in JupyterLite it already is)\n'
                      'import os, urllib.request\n' + ''.join(
                          "if not os.path.exists('%s'):\n    urllib.request.urlretrieve('%s/cases/data/%s', '%s')\n" % (f, SITE, f, f)
                          for f in mod.FILES).rstrip('\n')))
    for i, st in enumerate(mod.STEPS, 1):
        txt = '## %d. %s' % (i, st['title'])
        if st.get('before'):
            txt += '\n\n' + md(fill(st['before'], values))
        cells.append(('markdown', txt))
        cells.append(('code', st['code']))
        if st.get('after'):
            cells.append(('markdown', md(fill(st['after'], values))))
    nb = {'cells': [{'cell_type': t, 'metadata': {}, 'source': s.splitlines(True),
                     **({'execution_count': None, 'outputs': []} if t == 'code' else {})} for t, s in cells],
          'metadata': {'kernelspec': {'display_name': 'Python 3', 'language': 'python', 'name': 'python3'},
                       'language_info': {'name': 'python'}},
          'nbformat': 4, 'nbformat_minor': 5}
    return json.dumps(nb, ensure_ascii=False, indent=1) + '\n'


def write(path, text, check, stale):
    full = os.path.join(ROOT, path)
    old = open(full, encoding='utf-8').read().replace('\r\n', '\n') if os.path.exists(full) else None
    if old == text:
        return
    stale.append(path)
    if not check:
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)


def main():
    check = '--check' in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith('--')] or CASES
    stale, hubs = [], []
    for name in only:
        if name == 'market' and not os.path.exists(os.path.join(CACHE, 'ff_daily.zip')):
            print('cases: market skipped — run scripts/cases/prepare-data.py for its data')
            continue
        mod, html_out, run, secs, nb, hub = build_case(name)
        hubs.append(hub)
        write('cases/%s/index.html' % mod.ID, html_out, check, stale)
        if run:
            write('run/cases-%s.json' % mod.ID, json.dumps(run, ensure_ascii=False, indent=1) + '\n', check, stale)
        write('notebooks/' + mod.NOTEBOOK, nb, check, stale)
        write('lite/files/' + mod.NOTEBOOK, nb, check, stale)
        for f in getattr(mod, 'FILES', []):    # JupyterLite reads the data from its own file list
            write('lite/files/' + f, open(os.path.join(DATA_DIR, f), encoding='utf-8').read().replace('\r\n', '\n'),
                  check, stale)
        print('  %-20s %s' % (mod.ID, ' '.join('%.1fs' % s for s in secs)))
    if len(hubs) == len(CASES):             # the hub and indexes need every case
        write('cases/cases.js', hub_js(hubs), check, stale)
        if not check:
            write('lite/api/contents/all.json', lite_index(), check, stale)
        sm = open(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8').read().replace('\r\n', '\n')
        for h in hubs:
            loc = '<loc>%s%s</loc>' % (SITE, h['page'])
            if loc not in sm:
                sm = sm.replace('</urlset>', '  <url>\n    %s\n    <priority>0.8</priority>\n    <lastmod>2026-10-02</lastmod>\n  </url>\n</urlset>' % loc)
        write('sitemap.xml', sm, check, stale)
    if check:
        if stale:
            print('cases: stale — ' + ', '.join(stale) + ' (python scripts/build-cases.py)')
            sys.exit(1)
        print('cases: %d case(s), all current' % len(only))
    else:
        print('cases: %d file(s) written' % len(stale))


if __name__ == '__main__':
    main()
