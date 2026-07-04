/* Site build script — regenerates derived files before deploy.
   Run from the repo root:  node scripts/build.mjs

   Outputs:
   1. search-index.json   — global topic index for the Ctrl+K palette
   2. essays/feed.xml     — RSS feed for Pattern Essays
   3. sitemap.xml         — refreshed <lastmod> dates from git history
*/
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const SITE = 'https://patterniseverything.com';

const COLLECTIONS = [
  { dir: 'stats',               name: 'The Toolkit',          path: '/stats/' },
  { dir: 'ml-math',             name: 'ML Math',              path: '/ml-math/' },
  { dir: 'llm',                 name: 'LLM Engineering',      path: '/llm/' },
  { dir: 'mlops',               name: 'MLOps',                path: '/mlops/' },
  { dir: 'timeseries',          name: 'Timeseries',           path: '/timeseries/' },
  { dir: 'markets/charts',      name: 'Chart Patterns',       path: '/markets/charts/' },
  { dir: 'markets/indicators',  name: 'Technical Indicators', path: '/markets/indicators/' },
  { dir: 'markets/psychology',  name: 'Market Psychology',    path: '/markets/psychology/' },
  { dir: 'markets/risk',        name: 'Risk & Portfolio',     path: '/markets/risk/' },
  { dir: 'essays',              name: 'Pattern Essays',       path: '/essays/' },
];

function git(...args) {
  try { return execFileSync('git', args, { encoding: 'utf-8' }).trim(); }
  catch { return ''; }
}

/* Extract the TOPIC_DATA array literal from a topics.js source file. */
function extractTopicData(src, file) {
  const marker = 'const TOPIC_DATA = [';
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`No TOPIC_DATA in ${file}`);
  let i = start + marker.length - 1, depth = 0;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  const literal = src.slice(start + marker.length - 1, i + 1);
  return new Function(`return ${literal};`)();
}

/* ── 1. search-index.json ── */
const index = [];
for (const c of COLLECTIONS) {
  const file = `${c.dir}/topics.js`;
  const data = extractTopicData(readFileSync(file, 'utf-8'), file);
  for (const t of data) {
    index.push({
      t: t.title,
      cat: c.name,
      path: `${c.path}#${t.id}`,
      kw: (t.keywords || []).join(' '),
    });
  }
}
writeFileSync('search-index.json', JSON.stringify(index), 'utf-8');
console.log(`search-index.json: ${index.length} topics, ${(JSON.stringify(index).length / 1024).toFixed(1)} KB`);

/* ── 2. essays/feed.xml ── */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const essays = extractTopicData(readFileSync('essays/topics.js', 'utf-8'), 'essays/topics.js');
const items = essays.map(e => {
  // First commit that introduced this essay id = publication date
  const iso = git('log', '--reverse', '--format=%aI', '-S', `id:'${e.id}'`, '--', 'essays/topics.js').split('\n')[0];
  const pub = iso ? new Date(iso) : new Date();
  return { ...e, pub };
}).sort((a, b) => b.pub - a.pub);

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Pattern Essays — Pattern is Everything</title>
  <link>${SITE}/essays/</link>
  <description>Short visual essays on patterns in machine learning, markets, and the world.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE}/essays/feed.xml" rel="self" type="application/rss+xml"/>
${items.map(e => `  <item>
    <title>${esc(e.title)}</title>
    <link>${SITE}/essays/#${e.id}</link>
    <guid isPermaLink="true">${SITE}/essays/#${e.id}</guid>
    <pubDate>${e.pub.toUTCString()}</pubDate>
    <description>${esc(e.content)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`;
writeFileSync('essays/feed.xml', feed, 'utf-8');
console.log(`essays/feed.xml: ${items.length} items`);

/* ── 3. sitemap.xml lastmod ── */
const dirty = new Set(
  git('status', '--porcelain').split('\n').map(l => l.slice(3).trim()).filter(Boolean)
);
const today = new Date().toISOString().slice(0, 10);
let sitemap = readFileSync('sitemap.xml', 'utf-8');
sitemap = sitemap.replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, block => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)[1];
  let p = loc.replace(`${SITE}/`, '') || 'index.html';
  if (p.endsWith('/')) p += 'index.html';
  else if (!/\.[a-z]+$/.test(p)) p += '/index.html';
  const lastmod = (dirty.has(p) || !existsSync(p))
    ? today
    : (git('log', '-1', '--format=%as', '--', p) || today);
  return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`);
});
writeFileSync('sitemap.xml', sitemap, 'utf-8');
console.log('sitemap.xml: lastmod refreshed');
