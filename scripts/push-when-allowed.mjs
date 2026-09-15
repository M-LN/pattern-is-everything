/* Push once Vercel will actually build it, then confirm the site caught up.
   Run from the repo root:  node scripts/push-when-allowed.mjs [--after 19:23]

   Vercel refuses builds for 24 hours once the account hits its deployment rate
   limit, and a push during that window succeeds while the build never happens.
   This waits for the window to pass, pushes, then polls the Vercel check on the
   commit until it reports success or failure - so the answer is "deployed" or
   "refused, and here is why", never a silent gap.
*/
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const afterArg = args[args.indexOf('--after') + 1];
const intervalMin = Number(args[args.indexOf('--every') + 1]) || 15;
const REPO = 'M-LN/pattern-is-everything';

function git(...a) {
  return execFileSync('git', a, { encoding: 'utf-8' }).trim();
}

function gh(path) {
  try { return JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf-8', maxBuffer: 8e6 })); }
  catch { return null; }
}

function stamp() {
  return new Date().toISOString().slice(11, 19);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* When the current limit lifts: 24h after the most recent rate-limited check,
   read from the repository rather than assumed. */
function windowOpensAt() {
  if (afterArg && /^\d{1,2}:\d{2}$/.test(afterArg)) {
    const [h, m] = afterArg.split(':').map(Number);
    const t = new Date();
    t.setUTCHours(h, m, 0, 0);
    if (t < new Date()) t.setUTCDate(t.getUTCDate() + 1);
    return t;
  }
  const commits = gh(`repos/${REPO}/commits?per_page=10`) || [];
  for (const c of commits) {
    const status = gh(`repos/${REPO}/commits/${c.sha}/status`);
    const check = status?.statuses?.find(s => s.context === 'Vercel');
    if (check && /rate limited/i.test(check.description || '')) {
      return new Date(new Date(check.created_at).getTime() + 24 * 3600 * 1000);
    }
  }
  return new Date();
}

const head = git('rev-parse', 'HEAD').slice(0, 7);
const opens = windowOpensAt();
console.log(`[${stamp()}] HEAD ${head}; rate-limit window opens ${opens.toISOString()}`);

while (new Date() < opens) {
  const minutes = Math.ceil((opens - new Date()) / 60000);
  console.log(`[${stamp()}] waiting ${minutes} more minute(s)`);
  await sleep(Math.min(intervalMin, minutes) * 60000);
}

console.log(`[${stamp()}] pushing`);
try {
  console.log(git('push', 'origin', 'master'));
} catch (err) {
  console.log(`[${stamp()}] push failed: ${String(err).slice(0, 200)}`);
  process.exitCode = 1;
}

/* A build takes a minute or two; poll rather than guess. */
for (let attempt = 1; attempt <= 20; attempt++) {
  await sleep(60000);
  const status = gh(`repos/${REPO}/commits/${head}/status`);
  const check = status?.statuses?.find(s => s.context === 'Vercel');
  if (!check) { console.log(`[${stamp()}] no Vercel check yet (${attempt}/20)`); continue; }
  console.log(`[${stamp()}] Vercel: ${check.state} — ${check.description}`);
  if (check.state === 'success') {
    console.log(`[${stamp()}] deployed. Verify with: node scripts/deploy-status.mjs`);
    process.exitCode = 0;
    break;
  }
  if (check.state === 'failure' || check.state === 'error') {
    process.exitCode = 1;
    break;
  }
}
