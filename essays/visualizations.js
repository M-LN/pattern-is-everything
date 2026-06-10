/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Visualizations
   Interactive generative canvases — read slider values on each draw
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

function gaussRandom(mu, sigma) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* Polynomial fit helpers for E5 */
function polyfitLinear(pts, deg) {
  /* Vandermonde least squares via normal equations — small deg only */
  const n = pts.length;
  const d = deg + 1;
  /* build A^T A and A^T b */
  const ATA = Array.from({length:d}, () => new Array(d).fill(0));
  const ATb = new Array(d).fill(0);
  for (const [x, y] of pts) {
    const row = Array.from({length:d}, (_, k) => Math.pow(x, k));
    for (let i = 0; i < d; i++) {
      ATb[i] += row[i] * y;
      for (let j = 0; j < d; j++) ATA[i][j] += row[i] * row[j];
    }
  }
  /* Gaussian elimination */
  for (let col = 0; col < d; col++) {
    let maxRow = col;
    for (let r = col+1; r < d; r++) if (Math.abs(ATA[r][col]) > Math.abs(ATA[maxRow][col])) maxRow = r;
    [ATA[col], ATA[maxRow]] = [ATA[maxRow], ATA[col]];
    [ATb[col], ATb[maxRow]] = [ATb[maxRow], ATb[col]];
    for (let r = col+1; r < d; r++) {
      const f = ATA[r][col] / ATA[col][col];
      for (let c2 = col; c2 < d; c2++) ATA[r][c2] -= f * ATA[col][c2];
      ATb[r] -= f * ATb[col];
    }
  }
  const coef = new Array(d).fill(0);
  for (let i = d-1; i >= 0; i--) {
    coef[i] = ATb[i];
    for (let j = i+1; j < d; j++) coef[i] -= ATA[i][j] * coef[j];
    coef[i] /= ATA[i][i];
  }
  return coef;
}

function polyeval(coef, x) {
  let v = 0;
  for (let i = coef.length-1; i >= 0; i--) v = v * x + coef[i];
  return v;
}

/* ═══════════════════════════════════════════════════════════════
   DRAWS — one entry per essay
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {

  /* E1 — The Bell in Everything
     Sum of n dice rolls — CLT in action */
  'essay-bell'() {
    const s = setupCanvas('bellCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const nDice = parseInt(document.getElementById('bellDiceSlider')?.value || 1);
    const rolls = 800;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.06)';
    ctx.fillRect(0, 0, w, h);

    const maxSum = nDice * 6;
    const minSum = nDice * 1;
    const range = maxSum - minSum;
    const mu = (minSum + maxSum) / 2;
    const bins = new Array(range + 1).fill(0);

    const samples = [];
    for (let i = 0; i < rolls; i++) {
      let s2 = 0;
      for (let d = 0; d < nDice; d++) s2 += Math.floor(Math.random() * 6) + 1;
      bins[s2 - minSum]++;
      samples.push(s2);
    }

    const maxBin = Math.max(...bins);
    const barW = (w - 40) / bins.length;

    /* bars */
    bins.forEach((cnt, i) => {
      const bh = (cnt / maxBin) * (h - 40) * 0.85;
      const bx = 20 + i * barW;
      const by = h - 20 - bh;
      ctx.fillStyle = ACCENT4_10;
      ctx.fillRect(bx, by, barW - 1, bh);
    });

    /* bell outline overlay */
    const sigma = Math.sqrt(nDice * 35 / 36);
    ctx.beginPath();
    for (let i = 0; i < bins.length; i++) {
      const x = 20 + (i + 0.5) * barW;
      const z = (i - (mu - minSum)) / sigma;
      const pdf = Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
      const y = h - 20 - pdf * rolls * barW * 0.85;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.8;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* baseline */
    ctx.beginPath();
    ctx.moveTo(20, h - 20);
    ctx.lineTo(w - 20, h - 20);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    /* label */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'center';
    ctx.fillText(nDice === 1 ? 'flat (1 die)' : nDice >= 8 ? 'bell curve!' : 'emerging bell', w / 2, 14);
  },

  /* E2 — Regression to the Mean
     Scatter with adjustable correlation slope */
  'essay-mean'() {
    const s = setupCanvas('meanCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const corr = (parseInt(document.getElementById('meanCorrSlider')?.value || 55)) / 100;
    const pad = 30;
    const area = Math.min(w, h) - pad * 2;
    const n = 120;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* axes */
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
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

    /* regression line */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad - area * (1 - corr) / 2);
    ctx.lineTo(pad + area, h - pad - area * (1 + corr) / 2);
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* scatter */
    for (let i = 0; i < n; i++) {
      const t = Math.random();
      const x2 = corr * t + (1 - corr) * 0.5 + gaussRandom(0, 0.09);
      ctx.beginPath();
      ctx.arc(pad + t * area, h - pad - Math.max(0, Math.min(1, x2)) * area, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT4_25;
      ctx.fill();
    }

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
     Power-law curve with adjustable exponent */
  'essay-tail'() {
    const s = setupCanvas('tailCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const alpha = (parseInt(document.getElementById('tailAlphaSlider')?.value || 18)) / 10;
    const pad = 30;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    const steps = w - pad * 2;
    const pts = [];
    for (let i = 0; i < steps; i++) {
      const x = (i + 1) / steps;
      pts.push(Math.pow(x, -1 / alpha));
    }
    const maxY = pts[0];

    /* filled area */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    for (let i = 0; i < pts.length; i++) {
      ctx.lineTo(pad + i, h - pad - (pts[i] / maxY) * (h - pad * 2) * 0.85);
    }
    ctx.lineTo(w - pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = ACCENT4_10;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const px = pad + i;
      const py = h - pad - (pts[i] / maxY) * (h - pad * 2) * 0.85;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'left';
    ctx.fillText('the few', pad + 4, pad + 14);
    ctx.textAlign = 'right';
    ctx.fillText('the many', w - pad - 4, h - pad - 8);
  },

  /* E4 — Signal in the Noise
     Wave buried in noise — slider controls noise level */
  'essay-signal'() {
    const s = setupCanvas('signalCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const noisePct = parseInt(document.getElementById('signalNoiseSlider')?.value || 50) / 100;
    const mid = h / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* noise floor — more dots = more noise */
    const nDots = Math.round(noisePct * 1200);
    for (let i = 0; i < nDots; i++) {
      const x = Math.random() * w;
      const y = mid + gaussRandom(0, h * 0.28);
      ctx.beginPath();
      ctx.arc(x, y, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139,79,168,.09)';
      ctx.fill();
    }

    /* wave — amplitude shrinks with noise */
    const amp = 28 * (1 - noisePct * 0.85);
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const noiseAmt = noisePct * 18;
      const y = mid + Math.sin(x * 0.04) * amp + gaussRandom(0, noiseAmt);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = Math.max(0.15, 1 - noisePct * 0.9);
    ctx.stroke();
    ctx.globalAlpha = 1;
  },

  /* E5 — The Map and the Territory
     Polynomial regression — slider controls model complexity */
  'essay-map'() {
    const s = setupCanvas('mapCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const deg = parseInt(document.getElementById('mapComplexSlider')?.value || 1);
    const pad = 30;
    const n = 40;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* fixed seed-like data via deterministic-ish generation */
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const trueY = 0.3 + 0.4 * t + 0.3 * Math.sin(t * Math.PI * 2);
      const noisy = Math.min(1, Math.max(0, trueY + gaussRandom(0, 0.08)));
      pts.push([t, noisy]);
    }

    const area_w = w - pad * 2;
    const area_h = h - pad * 2;

    /* fit polynomial */
    const coef = polyfitLinear(pts, deg);

    /* regression curve */
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const yp = polyeval(coef, t);
      const px = pad + t * area_w;
      const py = h - pad - yp * area_h;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    /* scatter & residuals */
    for (const [x, y] of pts) {
      const px = pad + x * area_w;
      const py = h - pad - y * area_h;
      const predY = polyeval(coef, x);
      const ppy = h - pad - predY * area_h;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, ppy);
      ctx.strokeStyle = ACCENT4_10;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT4_25;
      ctx.fill();
    }

    /* label */
    const labels = ['linear map', 'quadratic', 'cubic', 'degree 4', 'overfit!'];
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = deg === 5 ? ACCENT4 : 'var(--muted)';
    ctx.textAlign = 'right';
    ctx.fillText(labels[deg - 1], w - pad - 4, pad + 12);
  },

  /* E6 — The Feedback Loop
     Logistic S-curve with adjustable growth rate */
  'essay-feedback'() {
    const s = setupCanvas('feedbackCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const rate = parseInt(document.getElementById('feedbackRateSlider')?.value || 108) / 100;
    const pad = 30;
    const steps = 60;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* generate logistic growth: N(t+1) = r·N(t)·(1 - N(t)/K) */
    const K = 1.0;
    let N = 0.02;
    const series = [N];
    for (let i = 1; i < steps; i++) {
      N = N * rate * (1 - N / K);
      N = Math.max(0, Math.min(K, N));
      series.push(N);
    }

    const area_w = w - pad * 2;
    const area_h = h - pad * 2;

    /* filled area under curve */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    series.forEach((v, i) => {
      ctx.lineTo(pad + (i / (steps - 1)) * area_w, h - pad - v * area_h * 0.9);
    });
    ctx.lineTo(w - pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = ACCENT4_10;
    ctx.fill();

    /* curve */
    ctx.beginPath();
    series.forEach((v, i) => {
      const px = pad + (i / (steps - 1)) * area_w;
      const py = h - pad - v * area_h * 0.9;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 2;
    ctx.stroke();

    /* ceiling line */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad - area_h * 0.9);
    ctx.lineTo(w - pad, h - pad - area_h * 0.9);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = ACCENT4_25;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    /* axis */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'left';
    ctx.fillText('carrying capacity', pad + 4, h - pad - area_h * 0.9 - 4);
    ctx.textAlign = 'center';
    ctx.fillText('time →', w / 2, h - 8);
  },

  /* E7 — The Random Walk
     Multiple simultaneous paths — re-generated on each call */
  'essay-walk'() {
    const s = setupCanvas('walkCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const pad = 20;
    const steps = 120;
    const nWalks = 5;
    const mid = h / 2;
    const stepSize = (w - pad * 2) / steps;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* centre line */
    ctx.beginPath();
    ctx.moveTo(pad, mid);
    ctx.lineTo(w - pad, mid);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.setLineDash([]);

    const alphas = [0.8, 0.55, 0.45, 0.35, 0.25];
    for (let wi = 0; wi < nWalks; wi++) {
      let y = mid;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      for (let t = 1; t <= steps; t++) {
        y += gaussRandom(0, 6);
        y = Math.max(pad + 4, Math.min(h - pad - 4, y));
        ctx.lineTo(pad + t * stepSize, y);
      }
      ctx.strokeStyle = ACCENT4;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = alphas[wi];
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'left';
    ctx.fillText('start', pad + 2, mid - 6);
    ctx.textAlign = 'right';
    ctx.fillText('time →', w - pad - 2, h - 6);
  },

  /* E8 — The Threshold
     Sigmoid curve with marker showing current input position */
  'essay-threshold'() {
    const s = setupCanvas('thresholdCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const inputVal = parseInt(document.getElementById('thresholdInputSlider')?.value || 30) / 100;
    const pad = 30;
    const area_w = w - pad * 2;
    const area_h = h - pad * 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* sigmoid: 1 / (1 + e^(-12*(x - 0.5))) */
    const sigmoid = x => 1 / (1 + Math.exp(-12 * (x - 0.5)));

    /* filled area */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      ctx.lineTo(pad + t * area_w, h - pad - sigmoid(t) * area_h * 0.9);
    }
    ctx.lineTo(w - pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = ACCENT4_10;
    ctx.fill();

    /* sigmoid curve */
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const px = pad + t * area_w;
      const py = h - pad - sigmoid(t) * area_h * 0.9;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 2;
    ctx.stroke();

    /* threshold marker — vertical line at input position */
    const markerX = pad + inputVal * area_w;
    const markerY = h - pad - sigmoid(inputVal) * area_h * 0.9;

    ctx.beginPath();
    ctx.moveTo(markerX, h - pad);
    ctx.lineTo(markerX, markerY);
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* dot at current point */
    ctx.beginPath();
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT4;
    ctx.fill();

    /* output label */
    const outputPct = Math.round(sigmoid(inputVal) * 100);
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = ACCENT4;
    ctx.textAlign = markerX > w / 2 ? 'right' : 'left';
    const labelX = markerX > w / 2 ? markerX - 8 : markerX + 8;
    ctx.fillText(`output: ${outputPct}%`, labelX, markerY - 8);

    /* axes */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'center';
    ctx.fillText('input →', w / 2, h - 8);

    /* threshold label */
    const threshX = pad + 0.5 * area_w;
    ctx.beginPath();
    ctx.moveTo(threshX, pad + 4);
    ctx.lineTo(threshX, h - pad);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'var(--muted)';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);
    ctx.textAlign = 'center';
    ctx.fillText('threshold', threshX, pad + 12);
  },

  /* E9 — Survivorship Bias
     Hidden failures pull the true mean down; only survivors are seen */
  'essay-survivor'() {
    const s = setupCanvas('survivorCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const cut = parseInt(document.getElementById('survivorCutSlider')?.value || 40);
    const pad = 34;
    const areaH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* deterministic point cloud (stable across slider drags) */
    let seed = 20240601;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const sgauss = (mu, sd) => {
      let u = 0, v = 0;
      while (u === 0) u = rnd();
      while (v === 0) v = rnd();
      return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    const N = 90;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const val = Math.max(2, Math.min(98, sgauss(45, 20)));
      const fx = pad + rnd() * (w - pad * 2);
      pts.push({ val, fx });
    }

    const yFor = val => h - pad - (val / 100) * areaH;
    const survivors = pts.filter(p => p.val >= cut);
    const trueMean = pts.reduce((a, p) => a + p.val, 0) / pts.length;
    const obsMean = survivors.length ? survivors.reduce((a, p) => a + p.val, 0) / survivors.length : trueMean;

    /* cutoff line */
    const cutY = yFor(cut);
    ctx.beginPath();
    ctx.moveTo(pad, cutY); ctx.lineTo(w - pad, cutY);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'var(--muted)';
    ctx.lineWidth = 0.75;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    /* points: failures faded, survivors solid */
    pts.forEach(p => {
      const py = yFor(p.val);
      ctx.beginPath();
      ctx.arc(p.fx, py, 2.4, 0, Math.PI * 2);
      if (p.val >= cut) { ctx.fillStyle = ACCENT4; ctx.fill(); }
      else { ctx.strokeStyle = 'var(--muted)'; ctx.globalAlpha = 0.3; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1; }
    });

    /* mean lines */
    const drawMean = (val, color, label, align) => {
      const my = yFor(val);
      ctx.beginPath();
      ctx.moveTo(pad, my); ctx.lineTo(w - pad, my);
      ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.8;
      ctx.stroke(); ctx.globalAlpha = 1;
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.fillStyle = color;
      ctx.textAlign = align;
      const lx = align === 'left' ? pad + 4 : w - pad - 4;
      ctx.fillText(`${label}: ${val.toFixed(0)}`, lx, my - 5);
    };
    drawMean(trueMean, 'var(--muted)', 'true avg', 'left');
    drawMean(obsMean, ACCENT4, 'visible avg', 'right');

    /* cutoff label */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'left';
    ctx.fillText('survival cutoff', pad + 4, cutY - 5);
  },

  /* E10 — The Fractal
     A recursive branching tree — self-similarity across scales */
  'essay-fractal'() {
    const s = setupCanvas('fractalCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const depth = parseInt(document.getElementById('fractalDepthSlider')?.value || 6);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    const len0 = h * 0.27;
    const spread = 0.42;

    const branch = (x, y, angle, len, d) => {
      if (d > depth || len < 1.2) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x2, y2);
      ctx.strokeStyle = ACCENT4;
      ctx.globalAlpha = Math.max(0.28, 1 - d / (depth + 2));
      ctx.lineWidth = Math.max(0.5, (depth - d) * 0.45);
      ctx.stroke();
      ctx.globalAlpha = 1;
      branch(x2, y2, angle - spread, len * 0.72, d + 1);
      branch(x2, y2, angle + spread, len * 0.72, d + 1);
    };

    branch(w / 2, h - 18, -Math.PI / 2, len0, 0);
  },

  /* E11 — Simpson's Paradox
     Two groups rise; the combined trend falls when they separate */
  'essay-simpson'() {
    const s = setupCanvas('simpsonCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const sep = (parseInt(document.getElementById('simpsonSepSlider')?.value || 70)) / 100;
    const pad = 30;
    const areaW = w - pad * 2;
    const areaH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    const C_A = '#2955a0';
    const C_B = '#c84b2f';
    const slope = 0.55;

    let seed = 991733;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

    /* two groups: positive within-group slope, intercepts pushed apart by sep */
    const groups = [
      { cx: 0.325, lo: 0.15, hi: 0.5, base: 0.45 + sep * 0.30, color: C_A, pts: [] },
      { cx: 0.675, lo: 0.5, hi: 0.85, base: 0.45 - sep * 0.30, color: C_B, pts: [] },
    ];
    const all = [];
    groups.forEach(g => {
      for (let i = 0; i < 40; i++) {
        const x = g.lo + rnd() * (g.hi - g.lo);
        const y = Math.max(0.04, Math.min(0.96, g.base + slope * (x - g.cx) + (rnd() - 0.5) * 0.12));
        g.pts.push([x, y]);
        all.push([x, y]);
      }
    });

    const px = x => pad + x * areaW;
    const py = y => h - pad - y * areaH;

    /* least-squares line over a point set, drawn across [x0,x1] */
    const drawFit = (pset, x0, x1, color, dash, lw) => {
      const n = pset.length;
      let sx = 0, sy = 0, sxx = 0, sxy = 0;
      pset.forEach(([x, y]) => { sx += x; sy += y; sxx += x * x; sxy += x * y; });
      const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
      const b = (sy - m * sx) / n;
      ctx.beginPath();
      ctx.moveTo(px(x0), py(m * x0 + b));
      ctx.lineTo(px(x1), py(m * x1 + b));
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      if (dash) ctx.setLineDash(dash); else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    /* scatter */
    groups.forEach(g => {
      ctx.fillStyle = g.color;
      ctx.globalAlpha = 0.55;
      g.pts.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(px(x), py(y), 2.2, 0, Math.PI * 2); ctx.fill(); });
      ctx.globalAlpha = 1;
    });

    /* within-group fits */
    groups.forEach(g => drawFit(g.pts, g.lo, g.hi, g.color, null, 1.6));
    /* combined fit */
    drawFit(all, 0.15, 0.85, ACCENT4, [5, 4], 2);

    /* axes */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad); ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    /* legend */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = C_A; ctx.fillText('group A \u2197', pad + 4, pad + 12);
    ctx.fillStyle = C_B; ctx.fillText('group B \u2197', pad + 4, pad + 24);
    ctx.fillStyle = ACCENT4; ctx.fillText('combined \u2935', pad + 4, pad + 36);
  },

  /* E12 — The Deep Kalman Filter
     A hidden "true" hotspot signal, noisy sensor readings, and the filter
     estimate. The slider sets how much the filter trusts the sensor — i.e.
     the steady-state Kalman gain. Low trust → smooth but laggy; high trust →
     tracks the noisy dots. Noise is seeded so dragging stays stable. */
  'essay-kalman'() {
    const s = setupCanvas('kalmanCanvas');
    if (!s) return;
    const { ctx, w, h } = s;
    const trust = (parseInt(document.getElementById('kalmanTrustSlider')?.value || 30)) / 100;
    const pad = 34;
    const areaW = w - pad * 2;
    const areaH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(139,79,168,.04)';
    ctx.fillRect(0, 0, w, h);

    /* deterministic noise so the cloud is stable across slider drags */
    let seed = 71531;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const sgauss = () => {
      let u = 0, v = 0;
      while (u === 0) u = rnd();
      while (v === 0) v = rnd();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    /* hidden true hotspot temperature curve (°C scale, normalised 0..1) */
    const smooth = u => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
    const N = 100;
    const tempLo = 40, tempHi = 105;
    const trueAt = t => {
      const base = 58;
      const ramp = 38 * smooth((t - 0.10) / 0.32);   // load step heats the winding
      const wob = 2.4 * Math.sin(t * 13 + 0.6);        // small operating wobble
      const cool = -13 * smooth((t - 0.80) / 0.18);    // load shed, partial cooling
      return base + ramp + wob + cool;
    };

    const xAt = i => pad + (i / (N - 1)) * areaW;
    const yFor = temp => h - pad - ((temp - tempLo) / (tempHi - tempLo)) * areaH;

    /* generate measurements */
    const noiseAmp = 9;            // °C sensor noise
    const meas = [];
    for (let i = 0; i < N; i++) meas.push(trueAt(i / (N - 1)) + sgauss() * noiseAmp);

    /* run a steady-state Kalman filter (exponential form):
       gain alpha grows with "trust in sensor". Also keep a velocity term so
       the estimate can follow the ramp instead of lagging — the predict step. */
    const alpha = 0.04 + trust * 0.90;
    const beta = alpha * alpha * 0.5;     // trend correction (predict-step memory)
    let x = meas[0], vel = 0;
    const est = [];
    for (let i = 0; i < N; i++) {
      /* predict */
      const xPred = x + vel;
      /* correct */
      const resid = meas[i] - xPred;
      x = xPred + alpha * resid;
      vel = vel + beta * resid;
      est.push(x);
    }

    /* hidden truth — dashed muted line */
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const px = xAt(i), py = yFor(trueAt(i / (N - 1)));
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'var(--muted)';
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    /* noisy sensor readings — faint dots */
    ctx.fillStyle = 'var(--muted)';
    ctx.globalAlpha = 0.32;
    for (let i = 0; i < N; i++) {
      ctx.beginPath();
      ctx.arc(xAt(i), yFor(meas[i]), 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* filter estimate — solid accent line */
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const px = xAt(i), py = yFor(est[i]);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = ACCENT4;
    ctx.lineWidth = 2;
    ctx.stroke();

    /* baseline */
    ctx.beginPath();
    ctx.moveTo(pad, h - pad); ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    /* legend */
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'var(--muted)'; ctx.fillText('\u2504 hidden hotspot', pad + 4, pad + 10);
    ctx.fillStyle = 'var(--muted)'; ctx.globalAlpha = 0.6; ctx.fillText('\u00b7 sensor', pad + 4, pad + 22); ctx.globalAlpha = 1;
    ctx.fillStyle = ACCENT4; ctx.fillText('\u2014 filter estimate', pad + 4, pad + 34);

    /* mode hint */
    ctx.textAlign = 'right';
    ctx.fillStyle = 'var(--muted)';
    const hint = trust < 0.25 ? 'trusts model \u2192 smooth, slow' : trust > 0.7 ? 'trusts sensor \u2192 jumpy' : 'balanced blend';
    ctx.fillText(hint, w - pad - 2, pad + 10);
  },
};
