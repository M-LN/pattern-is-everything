/* Game/universe dataset build script — regenerates GAME_TOPICS in
   game/game-data.js from the nine collections' TOPIC_DATA arrays, so the
   Pattern Cosmos (/universe/) and Pattern Drift (/game/) always match the
   live site. Run from the repo root after adding or renaming topics:

     node scripts/build-game-data.mjs

   Only the GAME_TOPICS array, the topic-count header comment, and the
   collection labels are touched — DOMAINS, COLLECTIONS structure, and the
   derived CATEGORIES / CROSS_KEYWORDS code are left as-is (they rebuild
   themselves from GAME_TOPICS at runtime). */
import { readFileSync, writeFileSync } from 'node:fs';

const COLLECTIONS = [
  { col: 'stats',      file: 'stats/topics.js',              domain: 'ml',      searchPath: '/stats/' },
  { col: 'ml-math',    file: 'ml-math/topics.js',            domain: 'ml',      searchPath: '/ml-math/' },
  { col: 'llm',        file: 'llm/topics.js',                domain: 'ml',      searchPath: '/llm/' },
  { col: 'mlops',      file: 'mlops/topics.js',              domain: 'ml',      searchPath: '/mlops/' },
  { col: 'timeseries', file: 'timeseries/topics.js',         domain: 'ml',      searchPath: '/timeseries/' },
  { col: 'charts',     file: 'markets/charts/topics.js',     domain: 'markets', searchPath: '/markets/charts/' },
  { col: 'indicators', file: 'markets/indicators/topics.js', domain: 'markets', searchPath: '/markets/indicators/' },
  { col: 'psychology', file: 'markets/psychology/topics.js', domain: 'markets', searchPath: '/markets/psychology/' },
  { col: 'risk',       file: 'markets/risk/topics.js',       domain: 'markets', searchPath: '/markets/risk/' },
];
const KW_PER_TOPIC = 5;

const quote = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

function extractTopicData(file) {
  const src = readFileSync(file, 'utf8');
  const m = src.match(/const TOPIC_DATA = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error(`TOPIC_DATA not found in ${file}`);
  return eval('[' + m[1] + ']');
}

const blocks = [];
const seen = new Map(); // id -> [cols]
let total = 0;

for (const { col, file, domain } of COLLECTIONS) {
  const topics = extractTopicData(file);
  const lines = topics.map(t => {
    if (!t.id || !t.title || !t.category || !Array.isArray(t.keywords)) {
      throw new Error(`Malformed entry in ${file}: ${JSON.stringify(t).slice(0, 80)}`);
    }
    seen.set(t.id, [...(seen.get(t.id) || []), col]);
    const kw = t.keywords.slice(0, KW_PER_TOPIC).map(quote).join(',');
    return `  { id:${quote(t.id)}, title:${quote(t.title)}, domain:'${domain}', col:'${col}', cat:${quote(t.category)}, kw:[${kw}] },`;
  });
  total += topics.length;
  blocks.push(`  // ── ${col} (${topics.length}) ──────────────────────────────\n` + lines.join('\n'));
}

// Cross-check: every game topic must resolve to a real search-index anchor
const index = JSON.parse(readFileSync('search-index.json', 'utf8'));
const anchors = new Set(index.map(e => e.path));
const dead = [];
for (const { col, file, searchPath } of COLLECTIONS) {
  for (const t of extractTopicData(file)) {
    if (!anchors.has(searchPath + '#' + t.id)) dead.push(`${searchPath}#${t.id}`);
  }
}
if (dead.length) {
  console.warn(`⚠ ${dead.length} topics missing from search-index.json (run scripts/build.mjs first?):`);
  dead.slice(0, 10).forEach(d => console.warn('  ' + d));
}

const path = 'game/game-data.js';
let out = readFileSync(path, 'utf8');
out = out.replace(/const GAME_TOPICS = \[[\s\S]*?\n\];/,
  'const GAME_TOPICS = [\n\n' + blocks.join('\n\n') + '\n];');
out = out.replace(/All \d+ topics from 9 collections/, `All ${total} topics from 9 collections`);
writeFileSync(path, out);

const dupes = [...seen.entries()].filter(([, cols]) => cols.length > 1);
console.log(`✓ ${path}: ${total} topics across ${COLLECTIONS.length} collections`);
console.log(`  per collection: ${COLLECTIONS.map(c => `${c.col} ${seen.size && extractTopicData(c.file).length}`).join(', ')}`);
if (dupes.length) console.log(`  ids shared across collections (expected overlaps): ${dupes.map(([id]) => id).join(', ')}`);
if (!dead.length) console.log('  all topic ids resolve against search-index.json');
