/* ═══════════════════════════════════════════════════════════════
   MLOps & Production ML — Canvas 2D Visualizations
   25 interactive drawings, one per topic
   ═══════════════════════════════════════════════════════════════ */

const DRAWS = {};
const DPR = window.devicePixelRatio || 1;

/* ── helpers ── */
function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const r = c.getBoundingClientRect();
  c.width = r.width * DPR;
  c.height = r.height * DPR;
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w: r.width, h: r.height };
}
function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

const ACCENT = () => css('--accent') || '#fbbf24';
const BLUE = '#60a5fa';
const GREEN = '#34d399';
const RED = '#f87171';
const MUTED = () => css('--muted') || '#888';
const BORDER = () => css('--border') || '#333';
const MONO = () => css('--fg') || '#e5e5e5';

function drawArrow(ctx, x1, y1, x2, y2, color, size) {
  size = size || 6;
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(a - 0.4), y2 - size * Math.sin(a - 0.4));
  ctx.lineTo(x2 - size * Math.cos(a + 0.4), y2 - size * Math.sin(a + 0.4));
  ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawBox(ctx, x, y, w, h, fill, label, textColor) {
  roundRect(ctx, x, y, w, h, 4);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.stroke();
  if (label) {
    ctx.fillStyle = textColor || MONO();
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);
  }
}

/* ─────────────────────────────────────────────────────────────
   01 — Model Packaging — pipeline flow
   ───────────────────────────────────────────────────────────── */
DRAWS['model-packaging'] = function () {
  const s = setupCanvas('packCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const stages = ['Train', 'Export', 'Package', 'Test', 'Push'];
    const colors = [BLUE, GREEN, ACCENT(), '#c084fc', RED];
    const bw = 80, bh = 36, gap = (w - stages.length * bw) / (stages.length + 1);

    const y = h / 2 - bh / 2;
    stages.forEach((st, i) => {
      const x = gap + i * (bw + gap);
      drawBox(ctx, x, y, bw, bh, colors[i] + '33', st, colors[i]);
      if (i < stages.length - 1) {
        drawArrow(ctx, x + bw + 4, y + bh / 2, x + bw + gap - 4, y + bh / 2, MUTED());
      }
    });

    // Labels below
    const labels = ['model.py', 'model.onnx', 'Dockerfile', 'smoke test', 'registry'];
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED();
    stages.forEach((_, i) => {
      const x = gap + i * (bw + gap) + bw / 2;
      ctx.fillText(labels[i], x, y + bh + 16);
    });

    // Title
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = MUTED();
    ctx.fillText('packaging pipeline', 12, 18);
  }

  draw();
  window.addEventListener('resize', () => { const r = s.c.getBoundingClientRect(); s.c.width = r.width * DPR; s.c.height = r.height * DPR; ctx.scale(DPR, DPR); draw(); });
};

/* ─────────────────────────────────────────────────────────────
   02 — Serving Patterns — comparison chart
   ───────────────────────────────────────────────────────────── */
DRAWS['serving-patterns'] = function () {
  const s = setupCanvas('serveCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const volSlider = document.getElementById('serveVol');
  const volV = document.getElementById('serveVolV');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const vol = +volSlider.value;
    volV.textContent = vol + 'k/day';

    const patterns = [
      { name: 'Online', lat: 20, cost: lerp(0.3, 1, vol / 100), color: BLUE },
      { name: 'Batch', lat: 80, cost: lerp(0.1, 0.4, vol / 100), color: GREEN },
      { name: 'Stream', lat: 40, cost: lerp(0.5, 0.8, vol / 100), color: ACCENT() },
      { name: 'Edge', lat: 5, cost: 0.2, color: '#c084fc' },
    ];

    const mx = 60, my = 30, gw = w - mx - 30, gh = h - my - 40;

    // Axes
    ctx.strokeStyle = BORDER();
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('Latency (ms)', mx + gw / 2, h - 4);
    ctx.save(); ctx.translate(12, my + gh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Relative Cost', 0, 0); ctx.restore();

    // Dots
    patterns.forEach(p => {
      const x = mx + (p.lat / 100) * gw;
      const y = my + gh - p.cost * gh;
      ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '66'; ctx.fill();
      ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = p.color; ctx.font = '10px monospace'; ctx.textAlign = 'center';
      ctx.fillText(p.name, x, y - 14);
    });
  }

  draw();
  volSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   03 — A/B & Canary — traffic split bar
   ───────────────────────────────────────────────────────────── */
DRAWS['ab-rollout'] = function () {
  const s = setupCanvas('canaryCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const pctSlider = document.getElementById('canaryPct');
  const pctV = document.getElementById('canaryPctV');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const pct = +pctSlider.value;
    pctV.textContent = pct + '%';

    const mx = 40, bh = 50, by = h / 2 - bh / 2 - 10, bw = w - 2 * mx;
    const stableW = bw * (100 - pct) / 100;
    const canaryW = bw * pct / 100;

    // Stable
    roundRect(ctx, mx, by, stableW, bh, 4);
    ctx.fillStyle = BLUE + '44'; ctx.fill();
    ctx.strokeStyle = BLUE; ctx.lineWidth = 1; ctx.stroke();

    // Canary
    if (canaryW > 1) {
      roundRect(ctx, mx + stableW, by, canaryW, bh, 4);
      ctx.fillStyle = ACCENT() + '44'; ctx.fill();
      ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1; ctx.stroke();
    }

    // Labels
    ctx.font = '11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (stableW > 60) { ctx.fillStyle = BLUE; ctx.fillText('Stable ' + (100 - pct) + '%', mx + stableW / 2, by + bh / 2); }
    if (canaryW > 50) { ctx.fillStyle = ACCENT(); ctx.fillText('Canary ' + pct + '%', mx + stableW + canaryW / 2, by + bh / 2); }

    // Risk indicator
    ctx.font = '10px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = MUTED();
    const risk = pct <= 5 ? 'LOW RISK' : pct <= 20 ? 'MODERATE' : pct <= 50 ? 'ELEVATED' : 'HIGH RISK';
    const rColor = pct <= 5 ? GREEN : pct <= 20 ? ACCENT() : pct <= 50 ? '#fb923c' : RED;
    ctx.fillStyle = rColor;
    ctx.fillText('Risk: ' + risk, mx, by + bh + 24);

    // Rollback indicator
    if (pct > 0) {
      ctx.fillStyle = MUTED(); ctx.font = '9px monospace';
      ctx.fillText('→ auto-rollback if error > 1%', mx + 160, by + bh + 24);
    }
  }

  draw();
  pctSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   04 — Latency & Throughput — distribution view
   ───────────────────────────────────────────────────────────── */
DRAWS['latency-throughput'] = function () {
  const s = setupCanvas('latencyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const batchSlider = document.getElementById('latBatch');
  const batchV = document.getElementById('latBatchV');
  const p50El = document.getElementById('latP50');
  const p99El = document.getElementById('latP99');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const batch = +batchSlider.value;
    batchV.textContent = batch;

    const mx = 50, my = 20, gw = w - mx - 20, gh = h - my - 40;
    const baseLat = 10 + batch * 1.5;
    const spread = 3 + batch * 0.5;

    // Generate latency samples
    const samples = [];
    for (let i = 0; i < 200; i++) {
      let v = baseLat + spread * (Math.random() + Math.random() + Math.random() - 1.5);
      if (Math.random() < 0.05) v += spread * 3 * Math.random(); // tail
      samples.push(Math.max(1, v));
    }
    samples.sort((a, b) => a - b);
    const p50 = samples[Math.floor(samples.length * 0.5)];
    const p99 = samples[Math.floor(samples.length * 0.99)];
    p50El.textContent = p50.toFixed(1) + 'ms';
    p99El.textContent = p99.toFixed(1) + 'ms';

    const maxLat = p99 * 1.3;

    // Histogram
    const bins = 30;
    const binW = maxLat / bins;
    const counts = new Array(bins).fill(0);
    samples.forEach(v => { const b = Math.min(bins - 1, Math.floor(v / binW)); counts[b]++; });
    const maxC = Math.max(...counts);

    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    const barW = gw / bins;
    counts.forEach((c, i) => {
      const bh2 = (c / maxC) * (gh - 10);
      const x = mx + i * barW;
      ctx.fillStyle = BLUE + '55';
      ctx.fillRect(x, my + gh - bh2, barW - 1, bh2);
    });

    // p50 line
    const p50x = mx + (p50 / maxLat) * gw;
    ctx.setLineDash([4, 3]); ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(p50x, my); ctx.lineTo(p50x, my + gh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ACCENT(); ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('p50', p50x, my - 4);

    // p99 line
    const p99x = mx + (p99 / maxLat) * gw;
    ctx.setLineDash([4, 3]); ctx.strokeStyle = RED; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(p99x, my); ctx.lineTo(p99x, my + gh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = RED; ctx.font = '9px monospace';
    ctx.fillText('p99', p99x, my - 4);

    // Axis label
    ctx.fillStyle = MUTED(); ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Latency (ms)', mx + gw / 2, h - 4);
  }

  draw();
  batchSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   05 — GPU Inference — CPU vs GPU comparison
   ───────────────────────────────────────────────────────────── */
DRAWS['gpu-inference'] = function () {
  const s = setupCanvas('gpuCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sizeSlider = document.getElementById('gpuSize');
  const sizeV = document.getElementById('gpuSizeV');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const modelSize = +sizeSlider.value;
    sizeV.textContent = modelSize + 'M';

    const cpuThroughput = Math.max(1, 500 / (1 + modelSize / 50));
    const gpuThroughput = Math.max(5, 5000 / (1 + modelSize / 200));
    const maxT = Math.max(cpuThroughput, gpuThroughput) * 1.2;

    const mx = 90, my = 40, gw = w - mx - 30, bh = 40;
    const labels = ['CPU', 'GPU', 'GPU+TRT'];
    const values = [cpuThroughput, gpuThroughput, gpuThroughput * 1.8];
    const colors = [MUTED(), BLUE, GREEN];

    labels.forEach((label, i) => {
      const y = my + i * (bh + 16);
      const barW = (values[i] / Math.max(...values) / 1.2) * gw;

      ctx.fillStyle = colors[i] + '33';
      roundRect(ctx, mx, y, barW, bh, 3);
      ctx.fill();
      ctx.strokeStyle = colors[i]; ctx.lineWidth = 1;
      roundRect(ctx, mx, y, barW, bh, 3);
      ctx.stroke();

      ctx.fillStyle = colors[i]; ctx.font = '11px monospace'; ctx.textAlign = 'right';
      ctx.fillText(label, mx - 10, y + bh / 2 + 4);

      ctx.textAlign = 'left'; ctx.font = '10px monospace';
      ctx.fillText(Math.round(values[i]) + ' pred/s', mx + barW + 8, y + bh / 2 + 4);
    });

    ctx.font = '10px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'left';
    ctx.fillText('throughput at ' + modelSize + 'M parameters', mx, my - 10);
  }

  draw();
  sizeSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   06 — Drift Detection — two distributions
   ───────────────────────────────────────────────────────────── */
DRAWS['drift-detection'] = function () {
  const s = setupCanvas('driftCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const driftSlider = document.getElementById('driftAmt');
  const driftV = document.getElementById('driftAmtV');
  const psiEl = document.getElementById('driftPSI');

  function gauss(x, mu, sig) { return Math.exp(-0.5 * ((x - mu) / sig) ** 2) / (sig * Math.sqrt(2 * Math.PI)); }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const driftAmt = +driftSlider.value / 100;
    driftV.textContent = driftAmt.toFixed(2);

    const mx = 40, my = 20, gw = w - mx - 20, gh = h - my - 40;
    const mu1 = 0, sig1 = 1;
    const mu2 = mu1 + driftAmt * 3, sig2 = sig1 + driftAmt * 0.5;

    // PSI calculation
    const nbins = 20;
    let psi = 0;
    for (let i = 0; i < nbins; i++) {
      const x = -4 + (8 * (i + 0.5)) / nbins;
      const p = Math.max(0.001, gauss(x, mu1, sig1));
      const q = Math.max(0.001, gauss(x, mu2, sig2));
      psi += (p - q) * Math.log(p / q);
    }
    psi = Math.abs(psi) * (8 / nbins);
    const psiColor = psi < 0.1 ? GREEN : psi < 0.2 ? ACCENT() : RED;
    psiEl.textContent = psi.toFixed(3);
    psiEl.style.color = psiColor;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    // Draw distributions
    const npts = 200;
    function drawDist(mu, sig, color) {
      ctx.beginPath();
      ctx.moveTo(mx, my + gh);
      for (let i = 0; i <= npts; i++) {
        const x = -4 + 8 * (i / npts);
        const y = gauss(x, mu, sig);
        const px = mx + (i / npts) * gw;
        const py = my + gh - y * gh * 2.2;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      // Fill
      ctx.lineTo(mx + gw, my + gh);
      ctx.lineTo(mx, my + gh);
      ctx.fillStyle = color + '22'; ctx.fill();
    }

    drawDist(mu1, sig1, BLUE);
    drawDist(mu2, sig2, RED);

    // Legend
    ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillStyle = BLUE; ctx.fillText('● Reference', mx + 10, my + 14);
    ctx.fillStyle = RED; ctx.fillText('● Production', mx + 110, my + 14);
  }

  draw();
  driftSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   07 — Model Monitoring — dashboard simulation
   ───────────────────────────────────────────────────────────── */
DRAWS['model-monitoring'] = function () {
  const s = setupCanvas('monitorCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const panels = [
      { label: 'Latency p99', value: '142ms', status: 'ok', color: GREEN },
      { label: 'Error Rate', value: '0.3%', status: 'ok', color: GREEN },
      { label: 'Drift (PSI)', value: '0.08', status: 'ok', color: GREEN },
      { label: 'Throughput', value: '1.2k/s', status: 'ok', color: BLUE },
    ];

    const pw = (w - 60) / 4, ph = 50, py = 20;

    panels.forEach((p, i) => {
      const px = 20 + i * (pw + 10);
      drawBox(ctx, px, py, pw, ph, p.color + '11');
      ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
      ctx.fillText(p.label, px + pw / 2, py + 16);
      ctx.font = '14px monospace'; ctx.fillStyle = p.color;
      ctx.fillText(p.value, px + pw / 2, py + 38);
    });

    // Time-series below
    const mx = 30, my = 90, gw = w - 60, gh = h - my - 20;
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    // Simulated accuracy over time
    ctx.beginPath();
    let seed = 42;
    for (let i = 0; i <= 100; i++) {
      seed = (seed * 16807) % 2147483647;
      const noise = (seed / 2147483647 - 0.5) * 0.02;
      const decay = i > 70 ? (i - 70) * 0.002 : 0;
      const acc = 0.95 + noise - decay;
      const x = mx + (i / 100) * gw;
      const y = my + gh - ((acc - 0.85) / 0.15) * gh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1.5; ctx.stroke();

    // Threshold line
    ctx.setLineDash([4, 3]); ctx.strokeStyle = RED + '88'; ctx.lineWidth = 1;
    const threshY = my + gh - ((0.92 - 0.85) / 0.15) * gh;
    ctx.beginPath(); ctx.moveTo(mx, threshY); ctx.lineTo(mx + gw, threshY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = RED; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText('SLO: 92%', mx + gw, threshY - 4);

    ctx.fillStyle = MUTED(); ctx.font = '9px monospace'; ctx.textAlign = 'left';
    ctx.fillText('accuracy over time →', mx, my - 4);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   08 — Alerting & SLOs — error budget burn
   ───────────────────────────────────────────────────────────── */
DRAWS['alerting-slos'] = function () {
  const s = setupCanvas('sloCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sloSlider = document.getElementById('sloTarget');
  const sloV = document.getElementById('sloTargetV');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const slo = +sloSlider.value;
    sloV.textContent = slo.toFixed(1) + '%';

    const budget = 100 - slo;
    const minutesPerMonth = 30 * 24 * 60;
    const downtimeMinutes = budget * minutesPerMonth / 100;

    const mx = 40, my = 30, gw = w - 80, gh = h - 70;

    // Budget bar
    const barH = 30;
    roundRect(ctx, mx, my, gw, barH, 4);
    ctx.fillStyle = GREEN + '22'; ctx.fill();
    ctx.strokeStyle = GREEN; ctx.lineWidth = 1; ctx.stroke();

    // Burned portion (simulate ~60% burned)
    const burned = 0.6;
    roundRect(ctx, mx, my, gw * burned, barH, 4);
    ctx.fillStyle = burned > 0.8 ? RED + '55' : ACCENT() + '44';
    ctx.fill();

    ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = MONO();
    ctx.fillText('Error Budget: ' + budget.toFixed(2) + '%  (' + Math.round(downtimeMinutes) + ' min/month)', mx + gw / 2, my + barH / 2 + 4);

    // Burn rate chart
    const cy = my + barH + 30, ch = gh - barH - 30;
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, cy); ctx.lineTo(mx, cy + ch); ctx.lineTo(mx + gw, cy + ch); ctx.stroke();

    // Ideal burn line
    ctx.setLineDash([4, 3]); ctx.strokeStyle = MUTED(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, cy + ch); ctx.lineTo(mx + gw, cy); ctx.stroke();
    ctx.setLineDash([]);

    // Actual burn (faster early, then plateau)
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const burn = Math.min(1, t < 0.3 ? t * 2.5 : 0.75 + (t - 0.3) * 0.36);
      const x = mx + t * gw;
      const y = cy + ch - burn * ch;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.stroke();

    ctx.font = '9px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = MUTED();
    ctx.fillText('budget burn rate', mx, cy - 6);
    ctx.fillStyle = RED; ctx.fillText('● actual', mx + gw - 100, cy - 6);
    ctx.fillStyle = MUTED(); ctx.fillText('● ideal', mx + gw - 50, cy - 6);
  }

  draw();
  sloSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   09 — Shadow Scoring — champion vs challenger
   ───────────────────────────────────────────────────────────── */
DRAWS['shadow-scoring'] = function () {
  const s = setupCanvas('shadowCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const mx = 40, my = 30;

    // Flow: Request → Router → [Champion, Challenger] → Compare
    const boxes = [
      { x: 20, y: h / 2 - 18, w: 70, h: 36, label: 'Request', color: MUTED() },
      { x: 120, y: h / 2 - 18, w: 60, h: 36, label: 'Router', color: BLUE },
      { x: 220, y: 30, w: 90, h: 36, label: 'Champion', color: GREEN },
      { x: 220, y: h - 66, w: 90, h: 36, label: 'Challenger', color: ACCENT() },
      { x: 350, y: 30, w: 80, h: 36, label: 'Serve ✓', color: GREEN },
      { x: 350, y: h - 66, w: 80, h: 36, label: 'Log only', color: MUTED() },
      { x: w - 110, y: h / 2 - 18, w: 90, h: 36, label: 'Compare', color: '#c084fc' },
    ];

    boxes.forEach(b => drawBox(ctx, b.x, b.y, b.w, b.h, b.color + '22', b.label, b.color));

    // Arrows
    drawArrow(ctx, 90, h / 2, 120, h / 2, MUTED());
    drawArrow(ctx, 180, h / 2 - 6, 220, 48, BLUE);
    drawArrow(ctx, 180, h / 2 + 6, 220, h - 48, BLUE);
    drawArrow(ctx, 310, 48, 350, 48, GREEN);
    drawArrow(ctx, 310, h - 48, 350, h - 48, MUTED());
    drawArrow(ctx, 430, 48, w - 110, h / 2 - 6, '#c084fc');
    drawArrow(ctx, 430, h - 48, w - 110, h / 2 + 6, '#c084fc');
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   10 — Data Quality Gates — pipeline with gates
   ───────────────────────────────────────────────────────────── */
DRAWS['data-quality'] = function () {
  const s = setupCanvas('dqCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const stages = ['Ingest', 'Schema ✓', 'Range ✓', 'Fresh ✓', 'Complete ✓', 'Feature Eng.'];
    const colors = [MUTED(), GREEN, GREEN, GREEN, GREEN, BLUE];
    const bw = 80, bh = 34;
    const gap = (w - stages.length * bw) / (stages.length + 1);
    const y = h / 2 - bh / 2;

    stages.forEach((st, i) => {
      const x = gap + i * (bw + gap);
      const isGate = i > 0 && i < 5;
      drawBox(ctx, x, y, bw, bh, colors[i] + (isGate ? '33' : '22'), st, colors[i]);
      if (i < stages.length - 1) {
        drawArrow(ctx, x + bw + 4, y + bh / 2, x + bw + gap - 4, y + bh / 2, isGate ? GREEN : MUTED());
      }

      // Gate icon
      if (isGate) {
        ctx.font = '14px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = GREEN;
        ctx.fillText('⬡', x + bw / 2, y - 10);
      }
    });

    // Fail path
    ctx.font = '9px monospace'; ctx.fillStyle = RED; ctx.textAlign = 'center';
    ctx.fillText('✕ fail → block pipeline', w / 2, h - 16);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   11 — ML Pipelines — DAG
   ───────────────────────────────────────────────────────────── */
DRAWS['ml-pipelines'] = function () {
  const s = setupCanvas('pipeCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const nodes = [
      { x: 30, y: h / 2 - 18, label: 'Data', color: MUTED() },
      { x: 140, y: 30, label: 'Validate', color: GREEN },
      { x: 140, y: h - 60, label: 'Features', color: BLUE },
      { x: 270, y: h / 2 - 18, label: 'Train', color: ACCENT() },
      { x: 380, y: h / 2 - 18, label: 'Evaluate', color: '#c084fc' },
      { x: 490, y: h / 2 - 18, label: 'Deploy', color: RED },
    ];
    const bw = 80, bh = 34;

    nodes.forEach(n => drawBox(ctx, n.x, n.y, bw, bh, n.color + '22', n.label, n.color));

    // Edges
    drawArrow(ctx, 110, h / 2, 140, 48, MUTED());
    drawArrow(ctx, 110, h / 2, 140, h - 42, MUTED());
    drawArrow(ctx, 220, 48, 270, h / 2 - 4, GREEN);
    drawArrow(ctx, 220, h - 42, 270, h / 2 + 4, BLUE);
    drawArrow(ctx, 350, h / 2, 380, h / 2, ACCENT());
    drawArrow(ctx, 460, h / 2, 490, h / 2, '#c084fc');
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   12 — Feature Stores — architecture diagram
   ───────────────────────────────────────────────────────────── */
DRAWS['feature-stores'] = function () {
  const s = setupCanvas('featCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, bw = 120, bh = 36;

    // Central store
    drawBox(ctx, cx - 60, h / 2 - 18, bw, bh, ACCENT() + '33', 'Feature Store', ACCENT());

    // Offline store
    drawBox(ctx, 30, 20, 100, 30, BLUE + '22', 'Offline Store', BLUE);
    drawArrow(ctx, 130, 35, cx - 60, h / 2 - 4, BLUE);

    // Online store
    drawBox(ctx, w - 130, 20, 100, 30, GREEN + '22', 'Online Store', GREEN);
    drawArrow(ctx, cx + 60, h / 2 - 4, w - 130, 35, GREEN);

    // Training
    drawBox(ctx, 30, h - 50, 80, 30, BLUE + '22', 'Training', BLUE);
    drawArrow(ctx, 80, 50, 80, h - 50, BLUE);

    // Serving
    drawBox(ctx, w - 110, h - 50, 80, 30, GREEN + '22', 'Serving', GREEN);
    drawArrow(ctx, w - 80, 50, w - 80, h - 50, GREEN);

    // Sources
    drawBox(ctx, cx - 50, h - 50, 100, 30, MUTED() + '22', 'Data Sources', MUTED());
    drawArrow(ctx, cx, h - 50, cx, h / 2 + 18, MUTED());

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('same features, two stores', cx, h / 2 + 32);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   13 — Experiment Tracking — run comparison
   ───────────────────────────────────────────────────────────── */
DRAWS['experiment-tracking'] = function () {
  const s = setupCanvas('expCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const runs = [
      { name: 'Run #1', auc: 0.91, f1: 0.84, lr: '0.01', depth: 6 },
      { name: 'Run #2', auc: 0.93, f1: 0.87, lr: '0.005', depth: 8 },
      { name: 'Run #3', auc: 0.942, f1: 0.873, lr: '0.003', depth: 10 },
      { name: 'Run #4', auc: 0.935, f1: 0.86, lr: '0.001', depth: 12 },
    ];
    const colors = [MUTED(), BLUE, GREEN, ACCENT()];

    const mx = 60, my = 30, gw = w - mx - 30, gh = h - my - 40;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('AUC', mx + gw / 2, h - 4);

    // Bar chart
    const barW = gw / (runs.length * 2 + 1);
    runs.forEach((r, i) => {
      const x = mx + barW + i * barW * 2;
      const bh2 = ((r.auc - 0.85) / 0.15) * gh;
      ctx.fillStyle = colors[i] + '77';
      ctx.fillRect(x, my + gh - bh2, barW * 1.5, bh2);
      ctx.strokeStyle = colors[i]; ctx.lineWidth = 1;
      ctx.strokeRect(x, my + gh - bh2, barW * 1.5, bh2);

      ctx.fillStyle = colors[i]; ctx.font = '10px monospace'; ctx.textAlign = 'center';
      ctx.fillText(r.name, x + barW * 0.75, my + gh + 14);
      ctx.font = '9px monospace';
      ctx.fillText(r.auc.toFixed(3), x + barW * 0.75, my + gh - bh2 - 6);
    });

    // Best marker
    ctx.fillStyle = GREEN; ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillText('★ best: Run #3', mx + 10, my + 14);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   14 — CI/CD for ML — pipeline stages
   ───────────────────────────────────────────────────────────── */
DRAWS['ci-cd-ml'] = function () {
  const s = setupCanvas('cicdCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const stages = [
      { label: 'Push', color: MUTED(), sub: 'git push' },
      { label: 'Data Test', color: GREEN, sub: 'schema ✓' },
      { label: 'Train', color: BLUE, sub: 'retrain' },
      { label: 'Eval Gate', color: ACCENT(), sub: 'AUC ≥ 0.93' },
      { label: 'Deploy', color: '#c084fc', sub: 'canary 5%' },
    ];
    const bw = 80, bh = 34, gap = (w - stages.length * bw) / (stages.length + 1);
    const y = h / 2 - bh / 2 - 10;

    stages.forEach((st, i) => {
      const x = gap + i * (bw + gap);
      drawBox(ctx, x, y, bw, bh, st.color + '22', st.label, st.color);
      ctx.font = '8px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = MUTED();
      ctx.fillText(st.sub, x + bw / 2, y + bh + 14);
      if (i < stages.length - 1) {
        drawArrow(ctx, x + bw + 4, y + bh / 2, x + bw + gap - 4, y + bh / 2, st.color);
      }
    });

    // Fail path from Eval Gate
    const gateX = gap + 3 * (bw + gap) + bw / 2;
    ctx.setLineDash([3, 3]); ctx.strokeStyle = RED;
    ctx.beginPath(); ctx.moveTo(gateX, y + bh); ctx.lineTo(gateX, h - 20); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = RED; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('✕ fail → notify', gateX, h - 8);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   15 — Orchestration — DAG dependency graph
   ───────────────────────────────────────────────────────────── */
DRAWS['orchestration'] = function () {
  const s = setupCanvas('orchCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const nodes = [
      { x: 30, y: h / 2 - 18, label: 'Schedule', color: MUTED() },
      { x: 140, y: 20, label: 'Ingest A', color: BLUE },
      { x: 140, y: h / 2 - 18, label: 'Ingest B', color: BLUE },
      { x: 140, y: h - 54, label: 'Ingest C', color: BLUE },
      { x: 280, y: h / 2 - 18, label: 'Transform', color: GREEN },
      { x: 400, y: 30, label: 'Train', color: ACCENT() },
      { x: 400, y: h - 64, label: 'Report', color: '#c084fc' },
    ];
    const bw = 80, bh = 34;

    nodes.forEach(n => drawBox(ctx, n.x, n.y, bw, bh, n.color + '22', n.label, n.color));

    drawArrow(ctx, 110, h / 2, 140, 38, MUTED());
    drawArrow(ctx, 110, h / 2, 140, h / 2, MUTED());
    drawArrow(ctx, 110, h / 2, 140, h - 36, MUTED());
    drawArrow(ctx, 220, 38, 280, h / 2 - 4, BLUE);
    drawArrow(ctx, 220, h / 2, 280, h / 2, BLUE);
    drawArrow(ctx, 220, h - 36, 280, h / 2 + 4, BLUE);
    drawArrow(ctx, 360, h / 2 - 4, 400, 48, GREEN);
    drawArrow(ctx, 360, h / 2 + 4, 400, h - 46, GREEN);

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'left';
    ctx.fillText('0 2 * * * (daily 02:00)', 32, h - 6);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   16 — Model Compression — pruning vs accuracy
   ───────────────────────────────────────────────────────────── */
DRAWS['model-compression'] = function () {
  const s = setupCanvas('compressCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sparSlider = document.getElementById('compSparsity');
  const sparV = document.getElementById('compSparsityV');
  const accEl = document.getElementById('compAcc');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const sparsity = +sparSlider.value;
    sparV.textContent = sparsity + '%';

    // Accuracy model: stays flat until ~70% sparsity, then drops
    const acc = sparsity < 50 ? 0.95 - sparsity * 0.0002 : sparsity < 80 ? 0.94 - (sparsity - 50) * 0.003 : 0.85 - (sparsity - 80) * 0.01;
    accEl.textContent = (acc * 100).toFixed(1) + '%';
    accEl.style.color = acc > 0.9 ? GREEN : acc > 0.85 ? ACCENT() : RED;

    const mx = 50, my = 20, gw = w - mx - 30, gh = h - my - 40;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('Sparsity %', mx + gw / 2, h - 4);

    // Curve
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const a = i < 50 ? 0.95 - i * 0.0002 : i < 80 ? 0.94 - (i - 50) * 0.003 : 0.85 - (i - 80) * 0.01;
      const x = mx + (i / 100) * gw;
      const y = my + gh - ((a - 0.6) / 0.4) * gh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.stroke();

    // Current point
    const cx2 = mx + (sparsity / 100) * gw;
    const cy2 = my + gh - ((acc - 0.6) / 0.4) * gh;
    ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT(); ctx.fill();
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.stroke();

    // Compression ratio label
    const ratio = (1 / (1 - sparsity / 100)).toFixed(1);
    ctx.fillStyle = ACCENT(); ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillText(ratio + '× compression', mx + 10, my + 14);
  }

  draw();
  sparSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   17 — Quantization — precision vs speed bars
   ───────────────────────────────────────────────────────────── */
DRAWS['quantization'] = function () {
  const s = setupCanvas('quantCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const data = [
      { label: 'FP32', speed: 1, acc: 1, mem: 1, color: MUTED() },
      { label: 'FP16', speed: 2, acc: 0.998, mem: 0.5, color: BLUE },
      { label: 'INT8 PTQ', speed: 3, acc: 0.98, mem: 0.25, color: GREEN },
      { label: 'INT8 QAT', speed: 3, acc: 0.995, mem: 0.25, color: ACCENT() },
    ];

    const mx = 90, my = 30, gw = w - mx - 40, bh = 28;

    data.forEach((d, i) => {
      const y = my + i * (bh + 16);
      const barW = (d.speed / 3.5) * gw;

      roundRect(ctx, mx, y, barW, bh, 3);
      ctx.fillStyle = d.color + '44'; ctx.fill();
      ctx.strokeStyle = d.color; ctx.lineWidth = 1;
      roundRect(ctx, mx, y, barW, bh, 3); ctx.stroke();

      ctx.fillStyle = d.color; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText(d.label, mx - 8, y + bh / 2 + 4);
      ctx.textAlign = 'left';
      ctx.fillText(d.speed + '× speed  ' + (d.acc * 100).toFixed(1) + '% acc', mx + barW + 8, y + bh / 2 + 4);
    });

    ctx.font = '10px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'left';
    ctx.fillText('relative inference speed', mx, my - 10);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   18 — Caching — hit rate vs latency
   ───────────────────────────────────────────────────────────── */
DRAWS['caching-layers'] = function () {
  const s = setupCanvas('cacheCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const hitSlider = document.getElementById('cacheHit');
  const hitV = document.getElementById('cacheHitV');
  const latEl = document.getElementById('cacheLatV');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const hitRate = +hitSlider.value;
    hitV.textContent = hitRate + '%';

    const cacheLatency = 0.5; // ms
    const modelLatency = 50; // ms
    const avgLatency = (hitRate / 100) * cacheLatency + (1 - hitRate / 100) * modelLatency;
    latEl.textContent = avgLatency.toFixed(1) + 'ms';

    const mx = 50, my = 20, gw = w - mx - 30, gh = h - my - 40;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('Cache Hit Rate %', mx + gw / 2, h - 4);

    // Curve
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const lat = (i / 100) * cacheLatency + (1 - i / 100) * modelLatency;
      const x = mx + (i / 100) * gw;
      const y = my + (lat / modelLatency) * gh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.stroke();

    // Current point
    const cx2 = mx + (hitRate / 100) * gw;
    const cy2 = my + (avgLatency / modelLatency) * gh;
    ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
    ctx.fillStyle = ACCENT(); ctx.fill();

    // Savings label
    const savings = ((1 - avgLatency / modelLatency) * 100).toFixed(0);
    ctx.fillStyle = GREEN; ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillText(savings + '% latency reduction', mx + 10, my + 14);
  }

  draw();
  hitSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   19 — Auto-Scaling — replica count vs traffic
   ───────────────────────────────────────────────────────────── */
DRAWS['auto-scaling'] = function () {
  const s = setupCanvas('scaleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const loadSlider = document.getElementById('scaleLoad');
  const loadV = document.getElementById('scaleLoadV');
  const repsEl = document.getElementById('scaleReps');

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const load = +loadSlider.value;
    loadV.textContent = load + '%';

    const replicas = load === 0 ? 0 : Math.max(1, Math.ceil(load / 20));
    repsEl.textContent = replicas;

    const mx = 40, my = 20, gw = w - mx - 20, gh = h - my - 40;

    // Draw replica boxes
    const maxRep = 6;
    const boxW = Math.min(60, (gw - 20) / maxRep);
    const boxH = 40;
    const startX = mx + (gw - maxRep * (boxW + 8)) / 2;

    for (let i = 0; i < maxRep; i++) {
      const x = startX + i * (boxW + 8);
      const y = h / 2 - boxH / 2;
      const active = i < replicas;
      drawBox(ctx, x, y, boxW, boxH, active ? GREEN + '33' : BORDER() + '22', active ? 'Pod ' + (i + 1) : '—', active ? GREEN : MUTED());
    }

    // Scale indicator
    ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillStyle = load === 0 ? MUTED() : replicas >= 5 ? RED : GREEN;
    const state = load === 0 ? 'SCALED TO ZERO' : replicas >= 5 ? 'HIGH LOAD' : 'HEALTHY';
    ctx.fillText(state, w / 2, my + 10);

    ctx.fillStyle = MUTED(); ctx.font = '9px monospace';
    ctx.fillText('HPA target: 80% CPU per pod', w / 2, h - 10);
  }

  draw();
  loadSlider.addEventListener('input', draw);
};

/* ─────────────────────────────────────────────────────────────
   20 — Cost Governance — breakdown pie/bar
   ───────────────────────────────────────────────────────────── */
DRAWS['cost-governance'] = function () {
  const s = setupCanvas('costCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const items = [
      { label: 'GPU Training', pct: 35, color: RED },
      { label: 'GPU Inference', pct: 25, color: ACCENT() },
      { label: 'Storage', pct: 15, color: BLUE },
      { label: 'Compute (CPU)', pct: 15, color: GREEN },
      { label: 'Networking', pct: 10, color: '#c084fc' },
    ];

    // Horizontal stacked bar
    const mx = 30, bh = 40, by = 30, bw = w - 60;
    let cx = mx;
    items.forEach(it => {
      const iw = bw * it.pct / 100;
      ctx.fillStyle = it.color + '55';
      ctx.fillRect(cx, by, iw, bh);
      ctx.strokeStyle = it.color; ctx.lineWidth = 1;
      ctx.strokeRect(cx, by, iw, bh);
      if (iw > 40) {
        ctx.fillStyle = it.color; ctx.font = '9px monospace'; ctx.textAlign = 'center';
        ctx.fillText(it.pct + '%', cx + iw / 2, by + bh / 2 + 4);
      }
      cx += iw;
    });

    // Legend
    const ly = by + bh + 20;
    items.forEach((it, i) => {
      const lx = mx + (i % 3) * ((w - 60) / 3);
      const row = Math.floor(i / 3);
      ctx.fillStyle = it.color;
      ctx.fillRect(lx, ly + row * 20, 10, 10);
      ctx.font = '9px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = MONO();
      ctx.fillText(it.label, lx + 16, ly + row * 20 + 9);
    });

    // Total
    ctx.font = '10px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('monthly ML infrastructure cost breakdown', w / 2, h - 10);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   21 — Model Registry — lifecycle states
   ───────────────────────────────────────────────────────────── */
DRAWS['model-registry'] = function () {
  const s = setupCanvas('regCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const states = [
      { label: 'Development', color: MUTED() },
      { label: 'Staging', color: BLUE },
      { label: 'Production', color: GREEN },
      { label: 'Archived', color: '#c084fc' },
    ];
    const bw = 100, bh = 40;
    const gap = (w - states.length * bw) / (states.length + 1);
    const y = h / 2 - bh / 2;

    states.forEach((st, i) => {
      const x = gap + i * (bw + gap);
      drawBox(ctx, x, y, bw, bh, st.color + '22', st.label, st.color);
      if (i < states.length - 1) {
        drawArrow(ctx, x + bw + 4, y + bh / 2, x + bw + gap - 4, y + bh / 2, st.color);
      }
    });

    // Rollback arrow
    const prodX = gap + 2 * (bw + gap);
    const stagX = gap + 1 * (bw + gap);
    ctx.setLineDash([3, 3]); ctx.strokeStyle = RED;
    ctx.beginPath();
    ctx.moveTo(prodX + bw / 2, y + bh);
    ctx.quadraticCurveTo(prodX, y + bh + 30, stagX + bw / 2, y + bh);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = RED; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('rollback', (prodX + stagX + bw) / 2, y + bh + 34);

    // Version labels
    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    states.forEach((st, i) => {
      const x = gap + i * (bw + gap) + bw / 2;
      ctx.fillText('v' + (4 - i) + '.0', x, y - 8);
    });
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   22 — Lineage Tracking — lineage graph
   ───────────────────────────────────────────────────────────── */
DRAWS['lineage-tracking'] = function () {
  const s = setupCanvas('lineageCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const nodes = [
      { x: 20, y: 20, label: 'Raw Data', color: MUTED() },
      { x: 20, y: h / 2 - 18, label: 'Code v3.2', color: MUTED() },
      { x: 20, y: h - 54, label: 'Config', color: MUTED() },
      { x: 180, y: 30, label: 'Features', color: BLUE },
      { x: 180, y: h - 64, label: 'Params', color: BLUE },
      { x: 340, y: h / 2 - 18, label: 'Model v7', color: GREEN },
      { x: w - 120, y: h / 2 - 18, label: 'Prediction', color: ACCENT() },
    ];
    const bw = 80, bh = 34;

    nodes.forEach(n => drawBox(ctx, n.x, n.y, bw, bh, n.color + '22', n.label, n.color));

    drawArrow(ctx, 100, 38, 180, 48, MUTED());
    drawArrow(ctx, 100, h / 2, 180, 48, MUTED());
    drawArrow(ctx, 100, h - 36, 180, h - 46, MUTED());
    drawArrow(ctx, 260, 48, 340, h / 2 - 4, BLUE);
    drawArrow(ctx, 260, h - 46, 340, h / 2 + 4, BLUE);
    drawArrow(ctx, 420, h / 2, w - 120, h / 2, GREEN);

    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('full provenance chain → audit trail', w / 2, h - 6);
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   23 — Fairness Audits — group comparison
   ───────────────────────────────────────────────────────────── */
DRAWS['fairness-audits'] = function () {
  const s = setupCanvas('fairCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const groups = [
      { name: 'Group A', posRate: 0.72, fpr: 0.08, fnr: 0.12 },
      { name: 'Group B', posRate: 0.58, fpr: 0.15, fnr: 0.20 },
    ];
    const metrics = ['Pos Rate', 'FPR', 'FNR'];
    const colors = [BLUE, GREEN, ACCENT()];

    const mx = 80, my = 30, gw = w - mx - 40, gh = h - my - 50;
    const barW = 30, gap = 20;
    const groupW = metrics.length * barW + (metrics.length - 1) * 6;
    const totalW = groups.length * groupW + gap;
    const startX = mx + (gw - totalW) / 2;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my + gh); ctx.lineTo(mx + gw, my + gh); ctx.stroke();

    groups.forEach((g, gi) => {
      const vals = [g.posRate, g.fpr, g.fnr];
      const gx = startX + gi * (groupW + gap);

      vals.forEach((v, vi) => {
        const x = gx + vi * (barW + 6);
        const bh2 = v * gh;
        ctx.fillStyle = colors[vi] + '55';
        ctx.fillRect(x, my + gh - bh2, barW, bh2);
        ctx.strokeStyle = colors[vi]; ctx.lineWidth = 1;
        ctx.strokeRect(x, my + gh - bh2, barW, bh2);

        ctx.fillStyle = colors[vi]; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText((v * 100).toFixed(0) + '%', x + barW / 2, my + gh - bh2 - 4);
      });

      ctx.fillStyle = MONO(); ctx.font = '10px monospace'; ctx.textAlign = 'center';
      ctx.fillText(g.name, gx + groupW / 2, my + gh + 16);
    });

    // 4/5 rule line
    const ratio = groups[1].posRate / groups[0].posRate;
    const ruleColor = ratio >= 0.8 ? GREEN : RED;
    ctx.fillStyle = ruleColor; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Disparate Impact: ' + ratio.toFixed(2) + (ratio >= 0.8 ? ' ✓' : ' ✕ (<0.8)'), w / 2, h - 8);

    // Legend
    metrics.forEach((m, i) => {
      ctx.fillStyle = colors[i]; ctx.font = '9px monospace'; ctx.textAlign = 'left';
      ctx.fillRect(mx + i * 70, my - 14, 8, 8);
      ctx.fillStyle = MONO();
      ctx.fillText(m, mx + i * 70 + 12, my - 6);
    });
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   24 — Reproducibility — checklist visualization
   ───────────────────────────────────────────────────────────── */
DRAWS['reproducibility'] = function () {
  const s = setupCanvas('reproCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const items = [
      { label: 'Random Seed Fixed', done: true },
      { label: 'Dependencies Pinned', done: true },
      { label: 'Data Versioned (DVC)', done: true },
      { label: 'Environment Containerized', done: false },
      { label: 'Hardware Specs Recorded', done: false },
      { label: 'Config Committed', done: true },
    ];

    const mx = 40, my = 16, rowH = 34;
    const done = items.filter(i => i.done).length;
    const pct = Math.round(done / items.length * 100);

    // Progress bar
    const barW = w - 2 * mx, barH = 14;
    roundRect(ctx, mx, my, barW, barH, 3);
    ctx.fillStyle = BORDER() + '44'; ctx.fill();
    roundRect(ctx, mx, my, barW * done / items.length, barH, 3);
    ctx.fillStyle = GREEN + '55'; ctx.fill();
    ctx.font = '9px monospace'; ctx.fillStyle = GREEN; ctx.textAlign = 'center';
    ctx.fillText(pct + '% reproducible', mx + barW / 2, my + 11);

    // Checklist
    items.forEach((it, i) => {
      const y = my + barH + 10 + i * rowH;
      const icon = it.done ? '✓' : '✕';
      const color = it.done ? GREEN : RED;
      ctx.font = '13px monospace'; ctx.fillStyle = color; ctx.textAlign = 'left';
      ctx.fillText(icon, mx, y + 14);
      ctx.font = '11px monospace'; ctx.fillStyle = it.done ? MONO() : MUTED();
      ctx.fillText(it.label, mx + 22, y + 14);
    });
  }

  draw();
};

/* ─────────────────────────────────────────────────────────────
   25 — Incident Response — decision tree
   ───────────────────────────────────────────────────────────── */
DRAWS['incident-response'] = function () {
  const s = setupCanvas('incidentCanvas'); if (!s) return;
  const { ctx, w, h } = s;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const nodes = [
      { x: w / 2 - 50, y: 10, w: 100, h: 30, label: 'Alert Fires', color: RED },
      { x: w / 4 - 50, y: 70, w: 100, h: 30, label: 'Serving Error?', color: ACCENT() },
      { x: 3 * w / 4 - 50, y: 70, w: 100, h: 30, label: 'Accuracy Drop?', color: ACCENT() },
      { x: 30, y: 140, w: 90, h: 30, label: 'Rollback!', color: RED },
      { x: w / 4 - 10, y: 140, w: 90, h: 30, label: 'Fix + Hotfix', color: BLUE },
      { x: w / 2 + 20, y: 140, w: 90, h: 30, label: 'Retrain', color: GREEN },
      { x: w - 130, y: 140, w: 90, h: 30, label: 'Monitor', color: MUTED() },
    ];

    nodes.forEach(n => drawBox(ctx, n.x, n.y, n.w, n.h, n.color + '22', n.label, n.color));

    // Edges
    drawArrow(ctx, w / 2, 40, w / 4, 70, RED);
    drawArrow(ctx, w / 2, 40, 3 * w / 4, 70, RED);
    ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillStyle = RED; ctx.fillText('YES', w / 4 - 30, 58);
    ctx.fillStyle = MUTED(); ctx.fillText('NO', 3 * w / 4 + 30, 58);

    drawArrow(ctx, w / 4 - 20, 100, 75, 140, ACCENT());
    drawArrow(ctx, w / 4 + 20, 100, w / 4 + 35, 140, ACCENT());
    drawArrow(ctx, 3 * w / 4 - 20, 100, w / 2 + 65, 140, ACCENT());
    drawArrow(ctx, 3 * w / 4 + 20, 100, w - 85, 140, ACCENT());

    ctx.fillStyle = RED; ctx.fillText('critical', w / 4 - 40, 125);
    ctx.fillStyle = BLUE; ctx.fillText('fixable', w / 4 + 40, 125);
    ctx.fillStyle = GREEN; ctx.fillText('drift', w / 2 + 50, 125);
    ctx.fillStyle = MUTED(); ctx.fillText('minor', w - 70, 125);

    // Postmortem
    ctx.font = '9px monospace'; ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('→ blameless postmortem after every P0/P1', w / 2, h - 10);
  }

  draw();
};
