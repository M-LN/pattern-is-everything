/* Review queue — which topics are due to be checked against their sources again.
     node scripts/reviews.mjs          list the topics due, oldest first, and the next ones
     node scripts/reviews.mjs --ci     the same, exit 1 if any are due (the weekly workflow)

   Each topic carries its own reviewed date in its collection's TOPIC_DATA
   (reviewed:'YYYY-MM-DD'). It is shown on the topic ("Last reviewed October
   2026") and as the page's dateModified. To mark a topic reviewed, set the date
   after checking its figures and sources, then run scripts/prerender.mjs for
   that collection.

   LLM Engineering and MLOps name models, tools and hardware that age within
   months, so they fall due after six months; everything else after eighteen.
   /about/ promises exactly this — change both together. */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const COLLECTIONS = ['stats', 'ml-math', 'llm', 'mlops', 'timeseries', 'markets/charts',
  'markets/indicators', 'markets/psychology', 'markets/risk', 'essays'];
export const MONTHS_UNTIL_DUE = { 'llm': 6, 'mlops': 6 };
const DEFAULT_MONTHS = 18;
export const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function topicData(dir) {
  const m = readFileSync(`${dir}/topics.js`, 'utf8').match(/const TOPIC_DATA = \[([\s\S]*?)\n\];/);
  if (!m) throw new Error(`TOPIC_DATA not found in ${dir}/topics.js`);
  return eval('[' + m[1] + ']');
}

const addMonths = (iso, n) => {
  const [, y, mo, d] = iso.match(ISO_DATE).map(Number);
  return new Date(Date.UTC(y, mo - 1 + n, d)).toISOString().slice(0, 10);
};

/* Every topic with its reviewed date and the date it falls due; `problem` is
   set when the date is missing, malformed or in the future. */
export function reviewQueue(today = new Date().toISOString().slice(0, 10)) {
  const rows = [];
  for (const dir of COLLECTIONS) {
    const months = MONTHS_UNTIL_DUE[dir] || DEFAULT_MONTHS;
    for (const t of topicData(dir)) {
      const row = { key: `${dir}/${t.id}`, dir, id: t.id, reviewed: t.reviewed };
      const m = ISO_DATE.exec(t.reviewed || '');
      const real = m && new Date(t.reviewed + 'T00:00:00Z').toISOString().slice(0, 10) === t.reviewed;
      if (!real) row.problem = `reviewed date missing or invalid (${t.reviewed ?? 'none'})`;
      else if (t.reviewed > today) row.problem = `reviewed date ${t.reviewed} is in the future`;
      else {
        row.due = addMonths(t.reviewed, months);
        row.overdue = row.due <= today;
      }
      rows.push(row);
    }
  }
  return rows;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rows = reviewQueue();
  const problems = rows.filter(r => r.problem);
  const due = rows.filter(r => r.overdue).sort((a, b) => a.reviewed.localeCompare(b.reviewed));
  const next = rows.filter(r => r.due && !r.overdue).sort((a, b) => a.due.localeCompare(b.due));
  for (const r of problems) console.log(`  ✗ ${r.key}: ${r.problem}`);
  if (due.length) {
    console.log(`${due.length} topic(s) due for review:`);
    for (const r of due) console.log(`  ${r.key.padEnd(44)} last reviewed ${r.reviewed}, due ${r.due}`);
  } else {
    console.log('No topics due for review.');
  }
  if (next.length) console.log(`Next due: ${next[0].due} (${next.filter(r => r.due === next[0].due).length} topic(s))`);
  if (process.argv.includes('--ci') && (due.length || problems.length)) process.exit(1);
}
