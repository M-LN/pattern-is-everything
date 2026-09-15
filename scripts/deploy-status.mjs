/* Is what is live actually what is committed?
   Run from the repo root:  node scripts/deploy-status.mjs

   A push is not a deploy. Vercel refuses builds when the account hits its rate
   limit, and the push still succeeds, so "pushed" and "live" drifted apart for a
   day without anything looking wrong locally. This compares three things:

     HEAD            what is committed here
     origin/master   what GitHub has
     the live site   what visitors actually get

   Exit code 0 when they agree, 1 when they do not, so it can gate a claim that
   something is live.
*/
import { execFileSync } from 'node:child_process';
import https from 'node:https';

const SITE = process.env.SITE_URL || 'https://patterniseverything.com';
const REPO = 'M-LN/pattern-is-everything';

function git(...args) {
  try { return execFileSync('git', args, { encoding: 'utf-8' }).trim(); }
  catch { return ''; }
}

function gh(path) {
  try {
    return JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf-8', maxBuffer: 8e6 }));
  } catch { return null; }
}

const head = git('rev-parse', 'HEAD').slice(0, 7);
git('fetch', '-q', 'origin');
const remote = git('rev-parse', 'origin/master').slice(0, 7);

const status = gh(`repos/${REPO}/commits/${head}/status`);
const check = status?.statuses?.find(s => s.context === 'Vercel');
const deployments = gh(`repos/${REPO}/deployments?per_page=5`) || [];
const lastProduction = deployments.find(d => d.environment === 'Production');

/* A plain request rather than fetch: undici keeps its socket alive and crashes
   libuv at teardown on Node 24 for Windows, which turns exit 1 into exit 127. */
function probe(url) {
  return new Promise(resolve => {
    const req = https.request(url, { method: 'GET', agent: false }, res => {
      res.resume();
      resolve({ status: res.statusCode, cache: res.headers['x-vercel-cache'] });
    });
    req.on('error', err => resolve({ status: 0, error: String(err).slice(0, 80) }));
    req.end();
  });
}

const liveHead = await probe(`${SITE}/?deploycheck=${Date.now()}`);

const lines = [
  ['committed here', head],
  ['on origin', remote],
  ['last production deploy', lastProduction ? `${lastProduction.sha.slice(0, 7)} at ${lastProduction.created_at}` : 'none found'],
  ['Vercel check on HEAD', check ? `${check.state} — ${check.description}` : 'no check reported yet'],
  ['site responds', `${liveHead.status}${liveHead.cache ? ` (cache ${liveHead.cache})` : ''}`],
];
for (const [label, value] of lines) console.log(`  ${label.padEnd(24)} ${value}`);

const problems = [];
if (head !== remote) problems.push('HEAD is not pushed');
if (check && check.state !== 'success') problems.push(`Vercel check is ${check.state}: ${check.description}`);
if (!check) problems.push('no Vercel check on HEAD yet — the build may still be queued');
if (lastProduction && lastProduction.sha.slice(0, 7) !== head) {
  problems.push(`live is ${lastProduction.sha.slice(0, 7)}, not ${head}`);
}

console.log('');
if (problems.length === 0) {
  console.log('HEAD is deployed. Safe to call it live.');
  process.exit(0);
}
for (const p of problems) console.log(`  ✗ ${p}`);
console.log('\nNot live yet. Do not claim otherwise.');
process.exit(1);
