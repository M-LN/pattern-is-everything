/* ── Share cards for the guides and case studies ──
   Renders a 1200×630 og:image for every guide (scripts/guides-data.mjs) and
   case study (the CASES list in cases/cases.js, written by build-cases.py)
   with scripts/og-card.html — the template the topic and trail cards use —
   in its text-only layout: kicker, title, and the guide's blurb or the
   case's finding. Before these, the pages shared the site's generic card.

   Writes assets/og/pages/<guides|cases>-<id>.jpg. scripts/build-guides.mjs
   and scripts/build-cases.py point each page's og:image at its card,
   versioned by the file's hash, so run them afterwards.

   Usage: node scripts/build-page-cards.mjs */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve, launch, connect } from './chrome.mjs';
import { GUIDES } from './guides-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'og', 'pages');
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

const cases = JSON.parse(readFileSync(join(ROOT, 'cases', 'cases.js'), 'utf8')
  .match(/const CASES = (\[[\s\S]*?\]);\s*\/\* cases:end/)[1]);
const cards = [
  ...GUIDES.map(g => ({ file: `guides-${g.id}.jpg`, accent: '#d0573a',
    kicker: g.kind === 'tree' ? 'Decision guide' : 'Checklist', title: g.title, text: g.blurb })),
  ...cases.map(c => ({ file: `cases-${c.id}.jpg`, accent: '#3fa37e',
    kicker: 'Case study · real data', title: strip(c.title).replace(/:.*/, ''), text: strip(c.finding) })),
];

const server = await serve(ROOT);
const browser = await launch();
try {
  const page = await connect(browser.port);
  await page.send('Page.enable');
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await page.send('Page.bringToFront');
  await page.goto(`http://127.0.0.1:${server.address().port}/scripts/og-card.html`);
  mkdirSync(OUT, { recursive: true });
  for (const c of cards) {
    await page.evaluate(`(async () => {
      const c = ${JSON.stringify(c)};
      document.documentElement.style.setProperty('--accent', c.accent);
      document.querySelector('.col').textContent = 'Pattern is Everything · ' + c.kicker;
      document.querySelector('.title').textContent = c.title;
      document.querySelector('.pattern').textContent = c.text;
      document.body.classList.add('no-viz');
      document.body.classList.remove('side');
      document.querySelector('.pattern').style.webkitLineClamp = '3';
      await document.fonts.ready;
      return true;
    })()`);
    const shot = Buffer.from((await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 86 })).data, 'base64');
    writeFileSync(join(OUT, c.file), shot);
    console.log('assets/og/pages/' + c.file);
  }
  page.close();
} finally {
  server.close();
  await browser.close();
}
