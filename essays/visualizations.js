/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Visualizations
   Static generative canvases (render once, no interactivity)
   ═══════════════════════════════════════════════════════════════ */

const ACCENT4 = '#8b4fa8';
const ACCENT4_25 = 'rgba(139,79,168,.25)';
const ACCENT4_10 = 'rgba(139,79,168,.10)';

function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  return { c, ctx, w: rect.width, h: rect.height };
}

/* ── helpers ── */
function gaussRandom(mu, sigma) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ═══════════════════════════════════════════════════════════════
   DRAWS — one entry per essay
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {

  /* E1 — The Bell in Everything
     Gaussian dot scatter settling into bell shape */
  'essay-bell'(el) {
    const s = setupCanvas('bellCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const n = 600;
    const mu = w / 2, sigma = w / 7;
    const bins = new Array(Math.ceil(w)).fill(0);

    ctx.fillStyle = 'rgba(139,79,168,.06)';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < n; i++) {
      const x = gaussRandom(mu, sigma);
      if (x < 0 || x >= w) continue;
      const bx = Math.floor(x);
      bins[bx]++;
      const noise = (Math.random() - .5) * 8;
      const y = h - 12 - bins[bx] * 1.1 + noise;
      ctx.beginPath();
      ctx.arc(x, Math.max(8, y), 1.6, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT4_25;
      ctx.fill();
    }

    /* bell outline */
    ctx.beginPath();
    ctx.moveTo(0, h - 12);
    for (let x = 0; x < w; x += 2) {
      const z = (x - mu) / sigma;
      const pdf = Math.exp(-.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
      const y = h - 12 - pdf * n * 2.2;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = .5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* baseline */
    ctx.beginPath();
    ctx.moveTo(20, h - 12);
    ctx.lineTo(w - 20, h - 12);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = .5;
    ctx.stroke();
  },

  /* E2 — Regression to the Mean
     First-vs-second measurement scatter toward diagonal */
  'essay-mean'(el) {
    const s = setupCanvas('meanCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const pad = 30;
    const area = Math.min(w, h) - pad * 2;
    const n = 120;

    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* axes */
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = .5;
    ctx.beginPath();
    ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    /* diagonal — perfect correlation */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(pad + area, h - pad - area);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = ACCENT4_25;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    /* regression line — slope < 1 */
    const slope = .55;
    ctx.beginPath();
    ctx.moveTo(pad, h - pad - area * (1 - slope) / 2);
    ctx.lineTo(pad + area, h - pad - area * (1 + slope) / 2);
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = .6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* scatter */
    for (let i = 0; i < n; i++) {
      const t = Math.random();
      const x1 = t;
      const x2 = slope * t + (1 - slope) * .5 + gaussRandom(0, .09);
      const px = pad + x1 * area;
      const py = h - pad - x2 * area;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT4_25;
      ctx.fill();
    }

    /* labels */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'center';
    ctx.fillText('1st measurement', w / 2, h - 8);
    ctx.save();
    ctx.translate(10, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('2nd measurement', 0, 0);
    ctx.restore();
  },

  /* E3 — The Long Tail
     Power-law curve: steep drop, long whispery tail */
  'essay-tail'(el) {
    const s = setupCanvas('tailCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const pad = 30;

    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* power-law curve */
    const alpha = 1.8;
    const steps = w - pad * 2;
    const pts = [];
    for (let i = 0; i < steps; i++) {
      const x = (i + 1) / steps;
      const y = Math.pow(x, -1 / alpha);
      pts.push(y);
    }
    const maxY = pts[0];

    /* filled area */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    for (let i = 0; i < pts.length; i++) {
      const px = pad + i;
      const py = h - pad - (pts[i] / maxY) * (h - pad * 2) * .85;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(w - pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = ACCENT4_10;
    ctx.fill();

    /* curve line */
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const px = pad + i;
      const py = h - pad - (pts[i] / maxY) * (h - pad * 2) * .85;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    /* baseline */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = .5;
    ctx.stroke();

    /* annotation */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'left';
    ctx.fillText('the few', pad + 4, pad + 14);
    ctx.textAlign = 'right';
    ctx.fillText('the many', w - pad - 4, h - pad - 8);
  },

  /* E4 — Signal in the Noise
     Sine wave half-buried in static, emerging left to right */
  'essay-signal'(el) {
    const s = setupCanvas('signalCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const mid = h / 2;

    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* noise floor */
    const n = 800;
    for (let i = 0; i < n; i++) {
      const x = Math.random() * w;
      const y = mid + gaussRandom(0, h * .25);
      ctx.beginPath();
      ctx.arc(x, y, .8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139,79,168,.08)';
      ctx.fill();
    }

    /* wave emerging from noise */
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = x / w;
      const amp = 25 * t; /* grows left-to-right */
      const noiseAmt = 12 * (1 - t);
      const y = mid + Math.sin(x * .04) * amp + gaussRandom(0, noiseAmt);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = .7;
    ctx.stroke();
    ctx.globalAlpha = 1;
  },

  /* E5 — The Map and the Territory
     Regression line through messy scatter — gap is the point */
  'essay-map'(el) {
    const s = setupCanvas('mapCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const pad = 30;
    const n = 80;

    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* generate data with a nonlinear true relationship */
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = Math.random();
      const trueY = .3 + .4 * t + .3 * Math.sin(t * Math.PI * 2);
      const noisy = trueY + gaussRandom(0, .08);
      pts.push([t, noisy]);
    }

    /* linear regression */
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (const [x, y] of pts) { sx += x; sy += y; sxx += x * x; sxy += x * y; }
    const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const intercept = (sy - slope * sx) / n;

    const area_w = w - pad * 2;
    const area_h = h - pad * 2;

    /* regression line */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad - (intercept) * area_h);
    ctx.lineTo(pad + area_w, h - pad - (intercept + slope) * area_h);
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* scatter & residual lines */
    for (const [x, y] of pts) {
      const px = pad + x * area_w;
      const py = h - pad - y * area_h;
      const predY = intercept + slope * x;
      const ppy = h - pad - predY * area_h;

      /* residual whisker */
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, ppy);
      ctx.strokeStyle = ACCENT4_10;
      ctx.lineWidth = .6;
      ctx.stroke();

      /* dot */
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT4_25;
      ctx.fill();
    }

    /* annotation */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'right';
    ctx.fillText('the map', w - pad - 4, h - pad - (intercept + slope) * area_h - 6);
    ctx.fillText('the territory', w - pad - 4, h - pad - (intercept + slope) * area_h + 14);
  },
};
