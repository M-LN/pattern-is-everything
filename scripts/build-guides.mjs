/* ── Guides: build ──
   Writes guides/index.html and guides/<id>/index.html from
   scripts/guides-data.mjs. Every topic reference is resolved against
   connections.json (title + pre-rendered URL); an unknown reference stops
   the build. The pages are complete without JavaScript — decision trees are
   nested <details>, checklists plain checkboxes — and js/guides.js adds
   one-branch-at-a-time trees, saved checklist progress and event counts.

   Usage: node scripts/build-guides.mjs            (writes the pages)
          node scripts/build-guides.mjs --check    (fails if they are stale) */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { GUIDES } from './guides-data.mjs';

const SITE = 'https://patterniseverything.com';
const REVIEWED = '2 October 2026';
const conn = JSON.parse(readFileSync('connections.json', 'utf8'));
const esc = s => String(s).replace(/&(?![a-z#0-9]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => esc(s).replace(/"/g, '&quot;');
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function topic(ref) {
  const i = ref.lastIndexOf('/');
  const key = `/${ref.slice(0, i)}/#${ref.slice(i + 1)}`;
  const t = conn.topics[key];
  if (!t) throw new Error(`guides: unknown topic ${ref}`);
  return { title: t.t, coll: t.c, url: `/${ref.slice(0, i)}/${ref.slice(i + 1)}/` };
}
const links = refs => refs.map(r => { const t = topic(r); return `<a href="${t.url}">${esc(t.title)}</a>`; }).join(' · ');

function result(r) {
  return `<div class="g-result" data-result="${attr(slug(r.name))}">
  <div class="g-kicker">Use</div>
  <div class="g-name">${esc(r.name)}</div>
  ${r.code ? `<code class="g-code">${esc(r.code)}</code>` : ''}
  <p>${esc(r.why)}</p>
  <div class="g-read"><span>Read</span> ${links(r.links)}</div>
</div>`;
}
function node(n, depth = 0) {
  return `<div class="g-node">
<div class="g-q">${esc(n.q)}</div>
<div class="g-opts">
${n.options.map(o => `<details class="g-opt"><summary>${esc(o.a)}</summary>
<div class="g-next">${o.next ? node(o.next, depth + 1) : result(o.result)}</div>
</details>`).join('\n')}
</div>
</div>`;
}
function checklist(g) {
  let n = 0;
  const total = g.groups.reduce((s, x) => s + x.items.length, 0);
  return `<div class="g-progress" aria-live="polite"><span data-done>0</span> of ${total} checked</div>
${g.groups.map(gr => `<fieldset class="g-group"><legend>${esc(gr.title)}</legend>
${gr.items.map(it => `<label class="g-item"><input type="checkbox" data-k="${n++}"><span>${esc(it.t)}<span class="g-read">${links(it.links)}</span></span></label>`).join('\n')}
</fieldset>`).join('\n')}`;
}

const CSS = `
    body { padding-top: var(--hdr-h); }
    .portal-header { position: fixed; top: 0; left: 0; right: 0; height: var(--hdr-h); background: var(--bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 16px; z-index: 200; backdrop-filter: blur(12px); }
    .back-link { font-family: var(--mono); font-size: 11px; color: var(--muted); text-decoration: none; }
    .back-link:hover { color: var(--accent); }
    .guide { width: min(780px, calc(100% - 32px)); margin: 0 auto 80px; }
    .guide-hero { padding: 48px 0 10px; }
    .crumb { font: 500 11px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
    .crumb a { color: var(--accent); text-decoration: none; }
    .guide-hero h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(30px, 5.5vw, 48px); line-height: 1.08; letter-spacing: -.02em; margin: 10px 0 12px; }
    .guide-hero p { color: var(--muted); line-height: 1.75; margin: 0; }
    .g-before { margin: 22px 0 26px; padding: 14px 16px; border-left: 3px solid var(--accent); background: var(--surface); border-radius: 0 10px 10px 0; line-height: 1.7; }
    .guide a, .g-read a { color: var(--accent3); text-underline-offset: 2px; }
    @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .guide a { color: #6fa8ff; } }
    [data-theme="dark"] .guide a { color: #6fa8ff; }
    .g-q { font-family: var(--serif); font-weight: 700; font-size: 21px; margin: 6px 0 12px; }
    .g-opts { display: grid; gap: 8px; }
    .g-opt { border: 1px solid var(--border); border-radius: 10px; background: var(--surface); }
    .g-opt > summary { cursor: pointer; list-style: none; padding: 12px 14px 12px 40px; position: relative; line-height: 1.5; }
    .g-opt > summary::-webkit-details-marker { display: none; }
    .g-opt > summary::before { content: '›'; position: absolute; left: 16px; top: 10px; font: 600 18px var(--mono); color: var(--accent); transition: transform .15s; }
    .g-opt[open] > summary::before { transform: rotate(90deg); }
    .g-opt[open] > summary { font-weight: 600; border-bottom: 1px solid var(--border); }
    .g-opt > summary:hover { color: var(--accent); }
    .g-opt > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 10px; }
    .g-next { padding: 14px 14px 16px; }
    .g-result { border-radius: 10px; padding: 14px 16px; background: color-mix(in srgb, var(--accent) 7%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); }
    .g-kicker { font: 500 11px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
    .g-name { font-family: var(--serif); font-weight: 700; font-size: 22px; margin: 4px 0 8px; line-height: 1.25; }
    .g-code { display: block; font-family: var(--mono); font-size: 12.5px; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px; margin: 0 0 8px; overflow-x: auto; white-space: pre; }
    .g-result p { margin: 0 0 8px; line-height: 1.7; }
    .g-read { font-size: 14px; line-height: 1.8; }
    .g-read > span:first-child { font: 500 11px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-right: 4px; }
    .g-progress { font: 500 12px var(--mono); color: var(--muted); margin: 0 0 10px; }
    .g-group { border: 1px solid var(--border); border-radius: 12px; padding: 6px 16px 10px; margin: 0 0 14px; background: var(--surface); }
    .g-group legend { font-family: var(--serif); font-weight: 700; font-size: 19px; padding: 0 6px; }
    .g-item { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-top: 1px solid var(--border); line-height: 1.6; cursor: pointer; }
    .g-group .g-item:first-of-type { border-top: 0; }
    .g-item input { margin-top: 5px; width: 18px; height: 18px; accent-color: var(--accent); flex: none; }
    .g-item .g-read { display: block; font-size: 13px; margin-top: 2px; }
    .g-item input:checked + span { color: var(--muted); }
    .g-tools { margin: 16px 0 0; display: flex; gap: 10px; }
    .g-tools button { font: 500 12px var(--mono); padding: 7px 12px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; }
    .g-tools button:hover { color: var(--accent); border-color: var(--accent); }
    .g-cards { display: grid; gap: 12px; margin: 24px 0; }
    .g-card { display: block; text-decoration: none; color: inherit; border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; background: var(--surface); }
    .g-card:hover { border-color: var(--accent); }
    .g-card .g-kicker { margin-bottom: 4px; }
    .g-card h3 { font-family: var(--serif); font-size: 22px; margin: 0 0 6px; color: var(--text); }
    .g-card p { margin: 0; color: var(--muted); line-height: 1.6; }
    .reviewed { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 32px; }
    @media (max-width: 600px) { .portal-header { padding: 0 16px; } .g-opt > summary { padding-left: 34px; } .g-opt > summary::before { left: 12px; } }`;

function page({ title, desc, path, heroTitle, crumb, body, script }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} — Pattern is Everything</title>
  <meta name="description" content="${attr(desc)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="canonical" href="${SITE}${path}">
  <script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "Article", "headline": ${JSON.stringify(title)}, "description": ${JSON.stringify(desc)},
    "url": "${SITE}${path}", "dateModified": "2026-10-02", "inLanguage": "en",
    "author": { "@type": "Organization", "name": "Pattern is Everything", "url": "${SITE}/" } }
  </script>
  <meta property="og:url" content="${SITE}${path}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${SITE}/assets/og/og-start.png">
  <meta property="og:site_name" content="Pattern is Everything">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/css/fonts.css?v=2">
  <link rel="stylesheet" href="/css/main.css?v=35">
  <script>(function(){var s=null;try{s=localStorage.getItem('theme')}catch(e){}if(s)document.documentElement.setAttribute('data-theme',s);else if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.setAttribute('data-theme','dark');})()</script>
  <script data-goatcounter="https://patterniseverything.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>${CSS}
  </style>
</head>
<body>
<header class="portal-header">
  <a class="logo-ring" href="/" title="Back to Pattern is Everything"></a>
  <h1 style="font-family:var(--serif);font-size:20px;font-weight:700;letter-spacing:-.01em;">${heroTitle}</h1>
  <nav class="portal-nav" aria-label="Primary">
    <a href="/ml/">ML</a>
    <a href="/stats/">Stats</a>
    <a href="/markets/">Markets</a>
    <a href="/essays/">Essays</a>
    <a href="/guides/">Guides</a>
    <a href="/cases/">Cases</a>
    <a href="/start/">Start here</a>
  </nav>
  <div style="margin-left:auto;display:flex;gap:12px;align-items:center;">
    <a class="back-link" href="/">Home</a>
  </div>
</header>
<main class="guide">
${crumb}
${body}
<p class="reviewed">Last reviewed: ${REVIEWED} · <a href="/method/">How this site checks its content</a></p>
</main>
<script src="/js/track.js?v=1" defer></script>
${script ? '<script src="/js/guides.js?v=2" defer></script>' : ''}
<script src="/js/ui-enhance.js?v=32" defer></script>
</body>
</html>
`;
}

const files = {};
for (const g of GUIDES) {
  const kind = g.kind === 'tree' ? 'Decision guide' : 'Checklist';
  const body = `<div class="g-before">${esc(g.before)}<div class="g-read" style="margin-top:6px"><span>Background</span> ${links(g.beforeLinks)}</div></div>
<section class="g-body" data-guide="${g.id}" data-kind="${g.kind}">
${g.kind === 'tree' ? node(g.root) : checklist(g)}
<div class="g-tools"><button type="button" data-reset>${g.kind === 'tree' ? 'Start over' : 'Clear all'}</button></div>
</section>`;
  files[`guides/${g.id}/index.html`] = page({
    title: g.title, desc: g.blurb, path: `/guides/${g.id}/`,
    heroTitle: 'Guides',
    crumb: `<section class="guide-hero"><div class="crumb"><a href="/guides/">Guides</a> · ${kind} · ${g.minutes} min</div><h2>${esc(g.title)}</h2><p>${esc(g.blurb)}</p></section>`,
    body, script: true,
  });
}
files['guides/index.html'] = page({
  title: 'Guides', desc: 'Start from the problem: decision guides and checklists that lead to the right method and the topics behind it.',
  path: '/guides/', heroTitle: 'Guides',
  crumb: `<section class="guide-hero"><div class="crumb">Guides</div><h2>Start from the <em style="color:var(--accent)">problem</em></h2><p>The topics are organised by subject. These guides start from what you are trying to do — choose a test, pick a metric, check a backtest — and lead to the method and the topics that explain it.</p></section>`,
  body: `<div class="g-cards">
${GUIDES.map(g => `<a class="g-card" href="/guides/${g.id}/"><div class="g-kicker">${g.kind === 'tree' ? 'Decision guide' : 'Checklist'} · ${g.minutes} min</div><h3>${esc(g.title)}</h3><p>${esc(g.blurb)}</p></a>`).join('\n')}
</div>`,
  script: false,
});

const check = process.argv.includes('--check');
let stale = 0;
for (const [f, html] of Object.entries(files)) {
  const cur = existsSync(f) ? readFileSync(f, 'utf8').replace(/\r\n/g, '\n') : '';
  if (cur === html) continue;
  stale++;
  if (!check) { mkdirSync(f.replace(/\/index\.html$/, ''), { recursive: true }); writeFileSync(f, html); }
}
// sitemap entries for the guide pages
if (!check) {
  let sm = readFileSync('sitemap.xml', 'utf8'); const nl = sm.includes('\r\n') ? '\r\n' : '\n'; sm = sm.replace(/\r\n/g, '\n');
  let added = 0;
  for (const f of Object.keys(files)) {
    const loc = `${SITE}/${f.replace(/index\.html$/, '')}`;
    if (sm.includes(`<loc>${loc}</loc>`)) continue;
    sm = sm.replace('</urlset>', `  <url>\n    <loc>${loc}</loc>\n    <priority>0.8</priority>\n    <lastmod>2026-10-02</lastmod>\n  </url>\n</urlset>`);
    added++;
  }
  writeFileSync('sitemap.xml', sm.replace(/\n/g, nl));
  console.log(`guides: ${Object.keys(files).length} pages, ${stale} written, ${added} added to sitemap`);
} else {
  console.log(stale ? `guides: ${stale} page(s) stale` : 'guides: all pages current');
  if (stale) process.exit(1);
}
