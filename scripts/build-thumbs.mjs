/* ── Topic thumbnails for the bridge preview card ──
   Hovering a link to a topic shows a preview card (js/connections.js); this
   gives the card a picture — the topic's own visualization, as it first
   draws. Each pre-rendered topic page is opened in headless Chrome (or Edge)
   in the dark theme, and its first canvas is captured to
   assets/thumbs/<collection>/<id>.webp.

   One set, dark only: the card shows it on a dark inset in either theme,
   so a second light set isn't worth doubling the files.

   No dependencies. The browser is driven over the DevTools protocol with
   Node's built-in WebSocket (Node 22+), not Playwright — any installed
   Chrome, Edge or Chromium will do. Point BROWSER at one if it isn't found.

   Usage:  node scripts/build-thumbs.mjs [collection ...]     (default: all)
   Then:   node scripts/build.mjs   — connections.json records each thumb's
           hash, which is how the card finds it and busts the year-long
           /assets/ cache when it changes. */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, readdir, rm, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COLLECTIONS = ['stats', 'ml-math', 'llm', 'mlops', 'timeseries', 'essays',
  'markets/charts', 'markets/indicators', 'markets/psychology', 'markets/risk'];
const WIDTH = 480;           // output pixels; the card shows it at ~300 CSS px
const SETTLE_MS = 700;       // let the first draw (and any intro animation) land
const LOW_DETAIL = 2500;     // bytes: a capture this small is nearly blank
const PLAY_MS = 2500;        // how long a pressed play button gets to run

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.woff2': 'font/woff2', '.webp': 'image/webp' };

function serve() {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const body = await readFile(join(ROOT, p));
      res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function findBrowser() {
  const candidates = [
    process.env.BROWSER,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const hit = candidates.find(p => existsSync(p));
  if (!hit) throw new Error('No Chrome/Edge/Chromium found — set BROWSER to its executable.');
  return hit;
}

/* Start the browser on a free debugging port and return that port. Chrome
   writes the port it picked to DevToolsActivePort in its profile dir. */
async function launch(exe) {
  const profile = await mkdtemp(join(tmpdir(), 'pp-thumbs-'));
  const proc = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', 'about:blank'],
    { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await sleep(100);
  const port = Number((await readFile(portFile, 'utf8')).split('\n')[0]);
  return { proc, port, profile };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* The smallest DevTools protocol client that does the job. */
async function connect(port) {
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map(), waiters = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      for (const w of waiters.splice(0)) (w.method === msg.method ? w.resolve(msg.params) : waiters.push(w));
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const once = method => new Promise(resolve => waiters.push({ method, resolve }));
  return { send, once, close: () => ws.close() };
}

async function run() {
  const only = process.argv.slice(2);
  const cols = only.length ? only : COLLECTIONS;
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const { proc, port, profile } = await launch(findBrowser());
  let made = 0, replayed = 0, skipped = [];
  try {
    const cdp = await connect(port);
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 900, deviceScaleFactor: 1, mobile: false });
    // Dark theme, and no motion-reduced fallbacks: the pages read these on load.
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: "try{localStorage.setItem('theme','dark')}catch(e){}" });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });

    for (const col of cols) {
      const ids = (await readdir(join(ROOT, col), { withFileTypes: true }))
        .filter(d => d.isDirectory() && existsSync(join(ROOT, col, d.name, 'index.html'))).map(d => d.name);
      for (const id of ids) {
        const html = await readFile(join(ROOT, col, id, 'index.html'), 'utf8');
        if (!html.includes('Generated by scripts/prerender.mjs')) continue;
        const loaded = cdp.once('Page.loadEventFired');
        await cdp.send('Page.navigate', { url: `${base}/${col}/${id}/` });
        await loaded;
        await sleep(SETTLE_MS);
        const { result } = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
          const c = document.querySelector('.topic .va canvas') || document.querySelector('.topic canvas');
          if (!c) return null;
          c.scrollIntoView({ block: 'center' });
          const r = c.getBoundingClientRect();
          return r.width && r.height ? { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height } : null;
        })()` });
        const box = result.value;
        if (!box) { skipped.push(`${col}/${id}`); continue; }
        await sleep(120);
        const capture = async () => Buffer.from((await cdp.send('Page.captureScreenshot', {
          format: 'webp', quality: 78, captureBeyondViewport: true,
          clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: WIDTH / box.w },
        })).data, 'base64');
        let img = await capture();
        /* Some visualizations open on an empty starting state — a Galton board
           with no balls yet, an optimizer at its first step — and only fill in
           once played. A near-blank capture compresses to very little, so when
           one comes out that small and the visualization has a play-type
           button, press it, let it run, and keep whichever shows more. */
        if (img.length < LOW_DETAIL) {
          const { result: pressed } = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
            // A play-type button if there is one, else the first control that
            // isn't a reset (SGD / Momentum / Adam and the like).
            const all = [...document.querySelectorAll('.topic .va button, .topic button.btn')];
            const b = all.find(b => /animat|run|play|start|drop|simulat|train|step|go\\b/i.test(b.textContent))
              || all.find(b => !/reset|clear|↺/i.test(b.textContent));
            if (!b) return false;
            b.click();
            return true;
          })()` });
          if (pressed.value) {
            await sleep(PLAY_MS);
            const played = await capture();
            if (played.length > img.length) { img = played; replayed++; }
          }
        }
        const out = join(ROOT, 'assets', 'thumbs', col, `${id}.webp`);
        await mkdir(dirname(out), { recursive: true });
        await writeFile(out, img);
        made++;
      }
      console.log(`${col}: done`);
    }
    cdp.close();
  } finally {
    proc.kill();
    server.close();
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
  console.log(`${made} thumbnails written to assets/thumbs/ (${replayed} after pressing play)` +
    (skipped.length ? `; no canvas on ${skipped.join(', ')}` : ''));
  console.log('Now run: node scripts/build.mjs  (records the thumbnails in connections.json)');
}

run().catch(e => { console.error(e); process.exit(1); });
