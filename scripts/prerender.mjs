/* ── Pre-render collection topics as standalone pages ──
   The collections render every topic client-side behind a hash, so the served
   HTML carries no topic content: /stats/ is 14.5 KB with none of its 39 topics
   in it. Crawlers and social scrapers therefore see ~27 pages for 257 topics.

   This walks a collection in a real browser, lifts each topic's rendered HTML,
   and writes it to /<collection>/<topic>/ as a standalone page with its own
   title, description, social tags and self-referencing canonical.

   The generated pages only load visualizations.js (self-contained — it has no
   references to topics.js), not the full reader bundle.

   Usage:  node scripts/prerender.mjs [collection ...]        (default: stats)
           node scripts/prerender.mjs --check                 (staleness only)
*/
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

/* Playwright is the only thing here that isn't a Node built-in, and the repo
   otherwise has no dependencies — so resolve it at run time (this honours
   NODE_PATH, unlike a static import) and fail with something actionable. */
let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  console.error('prerender needs Playwright. Install it globally:\n' +
                '  npm i -g playwright && npx playwright install chromium\n' +
                'or point NODE_PATH at an existing install.');
  process.exit(1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://patterniseverything.com';

/* Collections that can be pre-rendered. `depth` is how many directories the
   collection sits below the site root, which sets the generated page's
   relative asset paths. */
const COLLECTIONS = {
  // `depth` is how many directories the collection sits below the site root,
  // which sets the generated page's relative asset paths. `nav` is the primary
  // nav entry to mark current; leaf collections mark their parent world.
  'stats':              { depth: 1, label: 'The Toolkit',            theme: '#c84b2f', og: 'og-stats.png',        nav: '/stats/' },
  'essays':             { depth: 1, label: 'Pattern Essays',         theme: '#8b4fa8', og: 'og-essays.png',       nav: '/essays/' },
  'ml-math':            { depth: 1, label: 'ML Math',                theme: '#c84b2f', og: 'social-preview.png',  nav: '/ml/' },
  'llm':                { depth: 1, label: 'LLM Engineering',        theme: '#c84b2f', og: 'social-preview.png',  nav: '/ml/' },
  'mlops':              { depth: 1, label: 'MLOps & Production ML',  theme: '#c84b2f', og: 'social-preview.png',  nav: '/ml/' },
  'timeseries':         { depth: 1, label: 'Timeseries Engineering', theme: '#c84b2f', og: 'social-preview.png',  nav: '/ml/' },
  'markets/charts':     { depth: 2, label: 'Chart Patterns',         theme: '#2a7d5f', og: 'social-preview.png',  nav: '/markets/' },
  'markets/indicators': { depth: 2, label: 'Technical Indicators',   theme: '#2a7d5f', og: 'social-preview.png',  nav: '/markets/' },
  'markets/psychology': { depth: 2, label: 'Market Psychology',      theme: '#2a7d5f', og: 'social-preview.png',  nav: '/markets/' },
  'markets/risk':       { depth: 2, label: 'Risk & Portfolio',       theme: '#2a7d5f', og: 'social-preview.png',  nav: '/markets/' },
};
/* The key is the directory; `dir` is filled in so the rest of the script can
   keep using col.dir. */
for (const [key, c] of Object.entries(COLLECTIONS)) c.dir = key;

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
               '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png' };

function serve(port) {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const body = await readFile(join(ROOT, p));
      res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end('not found'); }
  });
  return new Promise(resolve => server.listen(port, () => resolve(server)));
}

/* With core.autocrlf a Windows checkout is CRLF while everything generated
   here is LF, so every comparison against a file on disk — and the topics.js
   fingerprint — works in LF. Files spliced in place are written back in their
   own line ending. */
const lf = s => s.replace(/\r\n/g, '\n');
const eolOf = s => s.includes('\r\n') ? '\r\n' : '\n';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* Topic markup is authored relative to the collection page (/<col>/), but the
   generated page sits one directory deeper (/<col>/<id>/). Without this every
   relative link in the content — the pattern bridges above all — resolved
   inside the topic's own folder and 404'd: ../markets/charts/ from
   /ml-math/activation/ became /ml-math/markets/charts/. Root-absolute and
   scheme links are left alone.

   A bare #id naming another topic of the same collection (href="#walk-forward")
   works in the reader, where every topic is on the page, but pointed at
   nothing on a page holding one topic; it goes to the reader, ../#id. Other
   #fragments (a heading's own anchor) stay as they are. */
const rebase = (html, topicIds) => html
  .replace(/(<a\b[^>]*?\shref=")(?![a-z][a-z0-9+.-]*:|\/|#)([^"]+)"/gi, '$1../$2"')
  .replace(/(<a\b[^>]*?\shref=")#([A-Za-z0-9_-]+)"/g,
    (m, pre, id) => topicIds && topicIds.has(id) ? `${pre}../#${id}"` : m);

function describe(content) {
  let t = String(content || '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  if (t.length > 155) t = t.slice(0,152).replace(/\s+\S*$/,'') + '…';
  return t;
}

/* The topic's own share card (scripts/build-topic-images.mjs), versioned by
   its hash so social platforms refetch a rebuilt one; the collection's card
   when there isn't one yet. */
function ogImageFor(col, topic) {
  const card = join(ROOT, 'assets', 'og', 'topics', col.dir, `${topic.id}.jpg`);
  if (existsSync(card)) {
    const v = createHash('sha256').update(readFileSync(card)).digest('hex').slice(0, 8);
    return `${SITE}/assets/og/topics/${col.dir}/${topic.id}.jpg?v=${v}`;
  }
  return `${SITE}/assets/${col.og.startsWith('og-') ? 'og/' : ''}${col.og}`;
}

/* "Linked from": the topics whose pattern bridges point here, from
   connections.json, written into the page rather than added by script so
   crawlers see the links. They go to the other topics' pre-rendered pages
   (/llm/kv-cache/), which search engines index — not to reader #hashes,
   which they fold into the collection page. The same markup
   js/connections.js renders in the readers. */
function linkedFromHtml(col, topic, up, connections) {
  const from = connections && connections.linkedFrom[`/${col.dir}/#${topic.id}`];
  if (!from || !from.length) return '';
  const items = from.map(k => {
    const t = connections.topics[k];
    const href = up + k.slice(1).replace('/#', '/') + '/';
    return `    <li><a href="${href}"><span class="tc-col">${esc(t.c)}</span>` +
      `<span class="tc-title">${esc(t.t)}</span>` +
      (t.p ? `<span class="tc-pattern">${esc(t.p)}</span>` : '') + `</a></li>`;
  }).join('\n');
  return `  <section class="topic-connections" aria-label="Topics that link here">
    <div class="tc-head"><span aria-hidden="true">↔</span> Linked from <span class="tc-count">${from.length}</span></div>
    <ul>
${items}
    </ul>
  </section>
`;
}

function page({ topic, html, prev, next, col, key, fingerprint, vizSrc, connections }) {
  const up = '../'.repeat(col.depth + 1);          // site root from /<col>/<id>/
  const coll = '../';                              // collection root
  const url = `${SITE}/${col.dir}/${topic.id}/`;
  const ogImage = ogImageFor(col, topic);
  const title = `${topic.title} — ${col.label}`;
  const desc = describe(topic.content);
  const nav = [
    prev ? `<a class="tnav-btn" href="../${prev.id}/"><div class="tnav-dir">← Previous</div><div class="tnav-name">${esc(prev.title)}</div></a>` : '<div></div>',
    next ? `<a class="tnav-btn next" href="../${next.id}/"><div class="tnav-dir">Next →</div><div class="tnav-name">${esc(next.title)}</div></a>` : '<div></div>',
  ].join('\n    ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <!-- Generated by scripts/prerender.mjs — do not edit by hand.
       The fingerprint lets scripts/check.mjs spot pages left behind by a
       topics.js edit without needing a browser. -->
  <meta name="prerender-source" content="${fingerprint}">
  <meta name="theme-color" content="${col.theme}" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#141210" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">
  <link rel="apple-touch-icon" sizes="180x180" href="${up}assets/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Pattern is Everything">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(topic.title)} — ${esc(col.label)}, with its visualization">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(topic.title)},
    "image": ${JSON.stringify(ogImage)},
    "description": ${JSON.stringify(desc)},
    "url": ${JSON.stringify(url)},
    "mainEntityOfPage": { "@type": "WebPage", "@id": ${JSON.stringify(url)} },
    "articleSection": ${JSON.stringify(topic.category || '')},
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "dateModified": "${topic.reviewed}",
    "author": { "@type": "Organization", "name": "Pattern is Everything", "url": "${SITE}/" },
    "publisher": { "@type": "Organization", "name": "Pattern is Everything" }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
      { "@type": "ListItem", "position": 2, "name": ${JSON.stringify(col.label)}, "item": "${SITE}/${col.dir}/" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(topic.title)} }
    ]
  }
  </script>
  <link rel="preconnect" href="https://patterniseverything.goatcounter.com">
  <script data-goatcounter="https://patterniseverything.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <link rel="stylesheet" href="${up}css/fonts.css?v=2">
  <link rel="stylesheet" href="${up}css/main.css?v=41">
  <style>
    .crumbs { font-family: var(--mono); font-size: 11px; color: var(--muted);
      letter-spacing: .06em; margin-bottom: 22px; }
    .crumbs a { color: var(--muted); text-decoration: none; }
    .crumbs a:hover { color: var(--accent); }
    .topic-page { max-width: 860px; margin: 0 auto; padding: 32px 24px 72px; }
    .topic-page .topic { display: block; }
    .reader-link { display: inline-block; margin-top: 8px; font-family: var(--mono);
      font-size: 12px; color: var(--accent); text-decoration: none; }
    .reader-link:hover { text-decoration: underline; }
    .tnav-btn { text-decoration: none; color: inherit; }
  </style>
</head>
<body>
<a class="skip-link" href="#mainContent">Skip to main content</a>
<script>(function(){var s=localStorage.getItem('theme');if(s)document.documentElement.setAttribute('data-theme',s);else if(window.matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.setAttribute('data-theme','dark');})()</script>

<div class="portal-header" role="banner">
  <a class="logo-ring" href="${up}index.html" title="Back to Pattern is Everything"></a>
  <h1 style="font-family:var(--serif);font-size:20px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">
    ${esc(col.label)}
  </h1>
  <nav class="portal-nav" aria-label="Primary">
${['/ml/','/stats/','/markets/','/essays/','/guides/','/cases/','/start/'].map(href => {
      const name = { '/ml/':'ML', '/stats/':'Stats', '/markets/':'Markets', '/essays/':'Essays', '/guides/':'Guides',
                     '/cases/':'Cases', '/sandbox/':'Sandbox', '/lab/':'Lab', '/start/':'Start here' }[href];
      return `    <a href="${href}"${href === col.nav ? ' class="is-current"' : ''}>${name}</a>`;
    }).join('\n')}
  </nav>
  <div style="margin-left:auto;display:flex;gap:8px;align-items:center;">
    <button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode">◐</button>
    <a class="back-link" href="${coll}">← ${esc(col.label)}</a>
  </div>
</div>

<div role="main" class="topic-page" id="mainContent">
  <div class="crumbs" role="navigation" aria-label="Breadcrumb">
    <a href="${up}index.html">Home</a> / <a href="${coll}">${esc(col.label)}</a> / ${esc(topic.title)}
  </div>
${html}
${linkedFromHtml(col, topic, up, connections)}  <div class="topic-nav">
    ${nav}
  </div>
  <a class="reader-link" href="${coll}#${topic.id}">Open in the full reader, with the topic sidebar →</a>
</div>

<script>
function toggleTheme() {
  var d = document.documentElement;
  d.setAttribute('data-theme', d.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme', d.getAttribute('data-theme'));
}
/* This page has no SPA router. Any handler the topic markup carries over from
   the reader should lead into the reader rather than throw. */
function show(id) { location.href = '${coll}#' + id; }
function showSection(sec, id) { location.href = '${coll}#' + id; }
function toggleSection() {}
</script>
<script src="${coll}${vizSrc}"></script>
<script>
window.addEventListener('load', function () {
  /* visualizations.js declares DRAWS with a top-level const, which is not a
     window property — so feature-detect the binding itself, not window.DRAWS. */
  try { if (typeof DRAWS !== 'undefined' && DRAWS[${JSON.stringify(topic.id)}]) DRAWS[${JSON.stringify(topic.id)}](); }
  catch (e) { console.error('visualization failed:', e); }
});
</script>
<script src="${up}js/progress.js?v=1" defer></script>
<script src="${up}js/return-trail.js?v=2" defer></script>
<script src="${up}js/connections.js?v=3" defer></script>
<script src="${up}js/track.js?v=1" defer></script>
${html.includes('class="selfcheck"') ? `<script src="${up}js/self-check.js?v=2" defer></script>
` : ''}${html.includes('data-run="') ? `<script src="${up}js/code-run.js?v=2" defer></script>
` : ''}</body>
</html>
`;
}

async function extract(key) {
  const col = COLLECTIONS[key];
  if (!col) throw new Error(`unknown collection: ${key}`);
  const port = 4390 + Object.keys(COLLECTIONS).indexOf(key);
  const server = await serve(port);
  const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 1280, height: 900 } });
  const pg = await ctx.newPage();
  await pg.goto(`http://localhost:${port}/${col.dir}/`, { waitUntil: 'load' });
  await pg.waitForFunction(() => typeof TOPICS !== 'undefined' && document.querySelectorAll('.topic').length > 0);

  const sections = await pg.evaluate(() =>
    (typeof SECTIONS !== 'undefined' ? SECTIONS : []).map(sec => ({
      title: sec.title, topics: sec.topics.filter(t => t !== 'home') })));

  const data = await pg.evaluate(() => {
    const order = TOPICS.filter(t => t !== 'home');
    return order.map(id => {
      const el = document.getElementById(id);
      const meta = TOPIC_DATA.find(t => t.id === id) || {};
      const clone = el.cloneNode(true);
      // The reader injects prev/next buttons here at runtime; the generated
      // page supplies real links instead.
      clone.querySelectorAll('.topic-nav').forEach(n => n.remove());
      // practical-template.js injects this on a 120 ms timer, so whether it
      // made it in depended on timing and the output wasn't reproducible. The
      // generated pages have never carried it. The template string starts
      // with a newline and indent, which lands as a text node in front of the
      // section — take that too, or its presence still varies between runs.
      clone.querySelectorAll('.practical-template').forEach(n => {
        const ws = n.previousSibling;
        if (ws && ws.nodeType === Node.TEXT_NODE && !ws.textContent.trim()) ws.remove();
        n.remove();
      });
      clone.classList.remove('active');
      return { id, title: meta.title || id, category: meta.category || '',
               reviewed: meta.reviewed, content: meta.content || '', html: clone.outerHTML };
    });
  });

  await browser.close();
  server.close();
  return { col, data, sections };
}

const I_START = '<!-- topic-index:start -->';
const I_END = '<!-- topic-index:end -->';

/* Link block written into the collection page's served HTML. Without it
   nothing on the site links to the pre-rendered pages — the hub's cards are
   built by topics.js and so never appear in the markup a crawler reads. */
async function syncTopicIndex(col, data, sections, check, markStale) {
  const file = join(ROOT, col.dir, 'index.html');
  const raw = await readFile(file, 'utf8');
  const eol = eolOf(raw), html = lf(raw);
  const byId = new Map(data.map(t => [t.id, t]));
  const groups = (sections.length ? sections : [{ title: 'Topics', topics: data.map(t => t.id) }])
    .map(sec => {
      const items = sec.topics.filter(id => byId.has(id)).map(id =>
        `        <li><a href="${id}/">${esc(byId.get(id).title)}</a></li>`).join('\n');
      if (!items) return '';
      return `      <div class="ti-group">\n        <div class="ti-group-title">${esc(sec.title)}</div>\n        <ul>\n${items}\n        </ul>\n      </div>`;
    }).filter(Boolean).join('\n');

  const block = [I_START,
    '<div class="topic-index" role="navigation" aria-label="All topics">',
    `  <div class="topic-index-head">All ${data.length} topics</div>`,
    groups,
    '</div>',
    I_END].join('\n');

  const has = html.includes(I_START) && html.includes(I_END);
  const next = has
    ? html.replace(new RegExp(`${I_START}[\\s\\S]*?${I_END}`), block)
    : html.replace('</main>\n</div>', `</main>\n</div>\n\n${block}`);   // right after the reader layout closes

  if (next === html) {
    if (!has) console.log(`  ! ${col.dir}/index.html: no insertion point found`);
    return;
  }
  if (check) { markStale(); console.log(`  stale: ${col.dir}/index.html topic index`); return; }
  await writeFile(file, next.replace(/\n/g, eol));
  console.log(`${col.dir}/index.html: topic index with ${data.length} links`);
}

/* The generated entries live between markers so the block can be rewritten on
   every run without disturbing the hand-maintained URLs around it. */
const S_START = '  <!-- prerendered:start -->';
const S_END = '  <!-- prerendered:end -->';

async function syncSitemap(urls, rendered, check, markStale) {
  const file = join(ROOT, 'sitemap.xml');
  const raw = await readFile(file, 'utf8');
  const eol = eolOf(raw), xml = lf(raw);
  const today = new Date().toISOString().slice(0, 10);
  const has = xml.includes(S_START) && xml.includes(S_END);

  /* Rendering only some collections must not drop the rest: the block used to
     be rewritten from this run's URLs alone, so `prerender.mjs markets/charts`
     left the sitemap with 25 pre-rendered pages instead of 269. Keep every
     existing entry outside the collections just rendered, in place; for those,
     keep the URLs that still exist and add any new ones. */
  const existing = has
    ? [...xml.slice(xml.indexOf(S_START), xml.indexOf(S_END)).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
    : [];
  const redone = rendered.map(dir => `${SITE}/${dir}/`);
  const fresh = new Set(urls);
  const kept = existing.filter(u => fresh.has(u) || !redone.some(p => u.startsWith(p)));
  const all = kept.concat(urls.filter(u => !kept.includes(u)));

  const block = [S_START, ...all.map(u =>
    `  <url>\n    <loc>${u}</loc>\n    <priority>0.6</priority>\n    <lastmod>${today}</lastmod>\n  </url>`), S_END].join('\n');

  const next = has
    ? xml.replace(new RegExp(`${S_START}[\\s\\S]*?${S_END}`), block)
    : xml.replace('</urlset>', `${block}\n</urlset>`);

  // Compare ignoring lastmod so a date bump alone never counts as drift.
  const strip = t => t.replace(/<lastmod>[^<]*<\/lastmod>/g, '');
  if (strip(next) === strip(xml)) return;
  if (check) { markStale(); console.log('  stale: sitemap.xml'); return; }
  await writeFile(file, next.replace(/\n/g, eol));
  console.log(`sitemap.xml: ${all.length} pre-rendered URLs`);
}

async function run() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const keys = args.filter(a => !a.startsWith('--'));
  const targets = keys.length ? keys : ['stats'];
  let stale = 0, written = 0;
  const urls = [];
  // Built from these pages by scripts/build.mjs; feeds each page's "Linked from".
  const connPath = join(ROOT, 'connections.json');
  const connections = existsSync(connPath) ? JSON.parse(await readFile(connPath, 'utf8')) : null;

  for (const key of targets) {
    const { col, data, sections } = await extract(key);
    /* The collection page owns the cache-busting version in data-viz; read it
       rather than hardcoding one, or the generated pages keep serving a stale
       visualizations.js forever because their key never changes. */
    const colHtml = await readFile(join(ROOT, col.dir, 'index.html'), 'utf8');
    const vizMatch = colHtml.match(/data-viz="([^"]+)"/);
    const vizSrc = vizMatch ? vizMatch[1] : 'visualizations.js';

    const topicIds = new Set(data.map(t => t.id));
    const fingerprint = 'topics.js@' + createHash('sha256')
      .update(lf(await readFile(join(ROOT, col.dir, 'topics.js'), 'utf8'))).digest('hex').slice(0, 12);
    for (let i = 0; i < data.length; i++) {
      const topic = data[i];
      /* When the topic was last checked against its sources: its own date in
         TOPIC_DATA, shown on the page (js/topic-depth.js) and as dateModified. */
      if (!/^\d{4}-\d{2}-\d{2}$/.test(topic.reviewed || ''))
        throw new Error(`${col.dir}/topics.js: ${topic.id} has no reviewed date (reviewed:'YYYY-MM-DD')`);
      const out = join(ROOT, col.dir, topic.id, 'index.html');
      const body = page({
        topic, html: rebase(topic.html, topicIds), col, key, fingerprint, vizSrc, connections,
        prev: i > 0 ? data[i - 1] : null,
        next: i < data.length - 1 ? data[i + 1] : null,
      });
      urls.push(`${SITE}/${col.dir}/${topic.id}/`);
      const current = existsSync(out) ? lf(await readFile(out, 'utf8')) : null;
      if (current === body) continue;
      if (check) { stale++; console.log(`  stale: /${col.dir}/${topic.id}/`); continue; }
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, body);
      written++;
    }
    await syncTopicIndex(col, data, sections, check, () => stale++);
    console.log(`${col.dir}: ${data.length} topics${check ? `, ${stale} stale` : `, ${written} written`}`);
  }
  await syncSitemap(urls, targets.map(k => COLLECTIONS[k].dir), check, () => stale++);

  if (check && stale) {
    console.error(`\n${stale} pre-rendered page(s) out of date — run: node scripts/prerender.mjs`);
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
