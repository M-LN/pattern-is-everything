/* ── Headless Chrome for the build scripts, without dependencies ──
   A static server for the repo, a way to start any installed Chrome, Edge or
   Chromium with remote debugging, and the smallest DevTools-protocol client
   that does the job, on Node's built-in WebSocket (Node 22+). Used by
   scripts/build-topic-images.mjs. Point BROWSER at an executable if none of
   the usual install paths has one. */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { tmpdir } from 'node:os';

export const sleep = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg' };

/* Serve `root` on a free local port. Resolves to the server; its base URL is
   http://127.0.0.1:<server.address().port>. */
export function serve(root) {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const body = await readFile(join(root, p));
      res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

export function findBrowser() {
  const hit = [
    process.env.BROWSER,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean).find(p => existsSync(p));
  if (!hit) throw new Error('No Chrome/Edge/Chromium found — set BROWSER to its executable.');
  return hit;
}

/* Start the browser headless on a free debugging port. Chrome writes the port
   it picked to DevToolsActivePort in its profile directory. */
export async function launch(exe = findBrowser()) {
  const profile = await mkdtemp(join(tmpdir(), 'pp-chrome-'));
  const proc = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', 'about:blank'],
    { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await sleep(100);
  const port = Number((await readFile(portFile, 'utf8')).split('\n')[0]);
  const close = async () => {
    proc.kill();
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };
  return { port, close };
}

/* A fresh page target: send(method, params) → result, once(event) → params. */
export async function connect(port) {
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
  /* Navigate and wait for the load event. */
  const goto = async url => {
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url });
    await loaded;
  };
  const evaluate = async expression =>
    (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
  return { send, once, goto, evaluate, close: () => ws.close() };
}
