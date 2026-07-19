/* Site consistency check — the drift guard. Run from the repo root:
     node scripts/check.mjs
   Exits non-zero if anything is out of sync. Validates:
     1. Every collection deep link (href="...#id") across all HTML and the
        learning-path JS resolves against search-index.json
     2. Declared topic counts (page badges, meta descriptions, hub stat
        numbers, homepage totals) match the collections' actual TOPIC_DATA
     3. Sandbox activity counts on hub/collection cards match each lab's
        actual TOPIC_DATA
     4. game/game-data.js is in sync with the collections (counts + ids)
   Run scripts/build.mjs and scripts/build-game-data.mjs to fix drift in
   derived files; count mismatches in page copy are fixed by hand. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';

const COLLECTIONS = [
  { col: 'stats',      dir: 'stats',               path: '/stats/',               universe: 'stats' },
  { col: 'ml-math',    dir: 'ml-math',             path: '/ml-math/',             universe: 'ml' },
  { col: 'llm',        dir: 'llm',                 path: '/llm/',                 universe: 'ml' },
  { col: 'mlops',      dir: 'mlops',               path: '/mlops/',               universe: 'ml' },
  { col: 'timeseries', dir: 'timeseries',          path: '/timeseries/',          universe: 'ml' },
  { col: 'charts',     dir: 'markets/charts',      path: '/markets/charts/',      universe: 'markets' },
  { col: 'indicators', dir: 'markets/indicators',  path: '/markets/indicators/',  universe: 'markets' },
  { col: 'psychology', dir: 'markets/psychology',  path: '/markets/psychology/',  universe: 'markets' },
  { col: 'risk',       dir: 'markets/risk',        path: '/markets/risk/',        universe: 'markets' },
];
const LABS = ['ml', 'markets', 'stats', 'chaos', 'dl'];

let failures = 0;
const fail = msg => { failures++; console.error('  ✗ ' + msg); };
const ok = msg => console.log('  ✓ ' + msg);

function extractTopicData(file) {
  const m = readFileSync(file, 'utf8').match(/const TOPIC_DATA = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error(`TOPIC_DATA not found in ${file}`);
  return eval('[' + m[1] + ']');
}

function htmlFiles(root = '.') {
  const out = [];
  for (const entry of readdirSync(root)) {
    if (['lite', 'node_modules', '.git'].includes(entry)) continue;
    const p = join(root, entry);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (entry.endsWith('.html') && !entry.startsWith('google')) out.push(p);
  }
  return out;
}

/* ── Load ground truth ── */
const topicsByCol = new Map(COLLECTIONS.map(c => [c.col, extractTopicData(`${c.dir}/topics.js`)]));
const index = JSON.parse(readFileSync('search-index.json', 'utf8'));
const validAnchors = new Set(index.map(e => e.path));
const total = [...topicsByCol.values()].reduce((a, t) => a + t.length, 0);
const uniTotal = u => COLLECTIONS.filter(c => c.universe === u)
  .reduce((a, c) => a + topicsByCol.get(c.col).length, 0);

/* ── 1. Deep links ── */
console.log('1. Collection deep links');
{
  const colPaths = new Set(COLLECTIONS.map(c => c.path).concat('/essays/'));
  let checked = 0, broken = 0;
  const sources = htmlFiles().map(f => [f, readFileSync(f, 'utf8')]);
  sources.push(['js/learning-path.js', readFileSync('js/learning-path.js', 'utf8')]);
  for (const [file, src] of sources) {
    const base = ('/' + dirname(file)).replace(/\\/g, '/').replace(/\/\.$/, '') + '/';
    for (const m of src.matchAll(/['"](\/?[^'"#\s]*?)(?:\?[^'"#\s]*)?#([A-Za-z0-9_-]+)['"]/g)) {
      let [, target, frag] = m;
      if (target.startsWith('http') || target === '') continue;
      let p = target.startsWith('/') ? target : normalize(join(base, target)).replace(/\\/g, '/');
      p = p.replace(/index\.html$/, '');
      if (!p.endsWith('/')) p += '/';
      if (!colPaths.has(p)) continue;
      checked++;
      if (!validAnchors.has(p + '#' + frag)) { broken++; fail(`${file}: dead link ${p}#${frag}`); }
    }
  }
  if (!broken) ok(`${checked} collection anchors all resolve`);
}

/* ── 2. Topic counts ── */
console.log('2. Topic counts');
{
  for (const c of COLLECTIONS) {
    const n = topicsByCol.get(c.col).length;
    const page = readFileSync(`${c.dir}/index.html`, 'utf8');
    const badge = page.match(/>(\d+) Topics</);
    if (badge && +badge[1] !== n) fail(`${c.dir}/index.html badge says ${badge[1]} topics, actual ${n}`);
    const meta = page.match(/content="(\d+) interactive topics/);
    if (meta && +meta[1] !== n) fail(`${c.dir}/index.html meta says ${meta[1]} topics, actual ${n}`);
  }
  const home = readFileSync('index.html', 'utf8');
  const homeTotal = home.match(/id="totalTopics">(\d+)</);
  if (!homeTotal || +homeTotal[1] !== total) fail(`homepage total says ${homeTotal?.[1]}, actual ${total}`);
  for (const [hub, u] of [['ml/index.html', 'ml'], ['markets/index.html', 'markets']]) {
    const n = uniTotal(u);
    const src = readFileSync(hub, 'utf8');
    const stat = src.match(/portal-stat-num">(\d+)</);
    if (!stat || +stat[1] !== n) fail(`${hub} stat says ${stat?.[1]} topics, actual ${n}`);
  }
  if (!failures) ok(`collections ${[...topicsByCol.values()].map(t => t.length).join('/')} · total ${total} · ml ${uniTotal('ml')} · markets ${uniTotal('markets')}`);
}

/* ── 3. Sandbox activity counts ── */
console.log('3. Sandbox activity counts');
{
  const actual = Object.fromEntries(LABS.map(l => [l, extractTopicData(`sandbox/${l}/activities.js`).length]));
  const hub = readFileSync('sandbox/index.html', 'utf8');
  const labels = { ml: 'ML Lab', markets: 'Markets Lab', stats: 'Stats Lab', chaos: 'Chaos Lab', dl: 'DL Lab' };
  let bad = 0;
  for (const [lab, label] of Object.entries(labels)) {
    const m = hub.match(new RegExp(`Enter ${label} — (\\d+) Activities`));
    if (m && +m[1] !== actual[lab]) { bad++; fail(`sandbox hub: ${label} says ${m[1]}, actual ${actual[lab]}`); }
  }
  for (const [page, lab] of [['stats/index.html', 'stats'], ['ml/index.html', 'ml'], ['markets/index.html', 'markets']]) {
    const src = readFileSync(page, 'utf8');
    const m = src.match(/(\d+) hands-on activities/);
    if (m && +m[1] !== actual[lab]) { bad++; fail(`${page}: card says ${m[1]} hands-on activities, actual ${actual[lab]}`); }
    const chip = src.match(/>(\d+) Activities</);
    if (chip && +chip[1] !== actual[lab]) { bad++; fail(`${page}: chip says ${chip[1]} Activities, actual ${actual[lab]}`); }
  }
  if (!bad) ok(`labs ${LABS.map(l => `${l} ${actual[l]}`).join(', ')} — all cards agree`);
}

/* ── 4. game-data sync ── */
console.log('4. game/game-data.js sync');
{
  const m = readFileSync('game/game-data.js', 'utf8').match(/const GAME_TOPICS = \[([\s\S]*?)\n\];/);
  const game = eval('[' + m[1] + ']');
  let bad = 0;
  if (game.length !== total) { bad++; fail(`GAME_TOPICS has ${game.length} entries, collections have ${total}`); }
  for (const c of COLLECTIONS) {
    const want = new Set(topicsByCol.get(c.col).map(t => t.id));
    const have = new Set(game.filter(t => t.col === c.col).map(t => t.id));
    const missing = [...want].filter(id => !have.has(id));
    const extra = [...have].filter(id => !want.has(id));
    if (missing.length || extra.length) {
      bad++;
      fail(`${c.col}: ${missing.length ? 'missing ' + missing.slice(0, 3).join(',') : ''}${extra.length ? ' stale ' + extra.slice(0, 3).join(',') : ''} (run scripts/build-game-data.mjs)`);
    }
  }
  if (!bad) ok(`${game.length} game topics match the collections exactly`);
}

console.log(failures ? `\n${failures} problem(s) found` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
