/* External link check — do the sources and references still resolve?
     node scripts/links.mjs          check every external <a href> on the site
     node scripts/links.mjs --ci     the same, exit 1 if any link is dead (the monthly workflow)

   Not part of scripts/check.mjs: it needs the network, and other people's
   servers are not something a push should fail on. A monthly workflow runs it.

   Each URL ends up in one of three groups:
     dead       404 or 410, or the host no longer resolves. Fix or replace it.
     uncertain  403, 401, 429, 5xx or a timeout. Publishers often refuse
                scripts; open these in a browser before changing anything.
     ok         everything else (2xx, or a redirect that ends in one).
   doi.org links are judged by the DOI resolver alone: a redirect means the DOI
   exists, whatever the publisher behind it says to a script. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const OWN = /^https?:\/\/(www\.)?patterniseverything\.com(\/|$)/;
// The "Report a mistake" links (one per page, all to the same issue form).
const ISSUE_FORM = /^https:\/\/github\.com\/M-LN\/pattern-is-everything\/issues\/new\?/;
const UA = 'Mozilla/5.0 (compatible; PatternIsEverything-linkcheck/1.0; +https://patterniseverything.com/about/)';
const TIMEOUT = 20000;
const CONCURRENCY = 6;

function htmlFiles(root = '.') {
  const out = [];
  for (const entry of readdirSync(root)) {
    // Same exclusions as scripts/check.mjs: not part of the published site.
    if (['lite', 'node_modules', '.git', '.claude', '.venv', '.cache'].includes(entry)) continue;
    const p = join(root, entry);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (entry.endsWith('.html') && !entry.startsWith('google')) out.push(p);
  }
  return out;
}

/* Every external link in an <a href>, with the pages that carry it. */
export function externalLinks(files = htmlFiles()) {
  const pages = new Map();
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/<a\b[^>]*?\shref="(https?:\/\/[^"]+)"/gi)) {
      const url = m[1].replace(/&amp;/g, '&');
      if (OWN.test(url) || ISSUE_FORM.test(url)) continue;
      if (!pages.has(url)) pages.set(url, new Set());
      pages.get(url).add(f.replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1') || '/');
    }
  }
  return pages;
}

async function request(url, method, redirect) {
  const res = await fetch(url, { method, redirect, headers: { 'user-agent': UA, accept: 'text/html,*/*' },
                                 signal: AbortSignal.timeout(TIMEOUT) });
  res.body?.cancel().catch(() => {});
  return res.status;
}

export function classify(status) {
  if (status === 404 || status === 410) return 'dead';
  if (status >= 200 && status < 400) return 'ok';
  return 'uncertain';
}

/* → { url, status, verdict, note } */
export async function checkLink(url) {
  const doi = /^https?:\/\/(dx\.)?doi\.org\//.test(url);
  try {
    let status = await request(url, 'HEAD', doi ? 'manual' : 'follow');
    // Many servers refuse or mishandle HEAD; ask again with GET before judging.
    if (classify(status) !== 'ok') status = await request(url, 'GET', doi ? 'manual' : 'follow');
    return { url, status, verdict: classify(status) };
  } catch (e) {
    const code = e.cause?.code || e.name;
    if (code === 'ENOTFOUND' || code === 'EAI_NONAME') return { url, status: 0, verdict: 'dead', note: 'host not found' };
    return { url, status: 0, verdict: 'uncertain', note: code === 'TimeoutError' ? 'timed out' : String(code) };
  }
}

async function checkAll(urls) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) results.push(await checkLink(urls[next++]));
  }));
  return results.sort((a, b) => a.url.localeCompare(b.url));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pages = externalLinks();
  const results = await checkAll([...pages.keys()]);
  const show = r => `  ${r.url}  (${r.note || r.status})\n      on ${[...pages.get(r.url)].slice(0, 3).join(', ')}` +
    (pages.get(r.url).size > 3 ? ` and ${pages.get(r.url).size - 3} more` : '');
  const dead = results.filter(r => r.verdict === 'dead');
  const uncertain = results.filter(r => r.verdict === 'uncertain');
  if (dead.length) console.log(`${dead.length} dead link(s):\n${dead.map(show).join('\n')}`);
  if (uncertain.length) console.log(`${uncertain.length} link(s) to check by hand:\n${uncertain.map(show).join('\n')}`);
  console.log(`${results.length} external links: ${results.length - dead.length - uncertain.length} ok, ` +
              `${uncertain.length} uncertain, ${dead.length} dead`);
  if (process.argv.includes('--ci') && dead.length) process.exit(1);
}
