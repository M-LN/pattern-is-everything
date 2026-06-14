/* ═══════════════════════════════════════════════════════════════
   Deep Learning Lab — Canvas Engines
   ═══════════════════════════════════════════════════════════════ */

function caSetup(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  const w = rect.width || c.offsetWidth || 300;
  // Capture the logical (CSS-pixel) height once, before we scale the backing store.
  // Re-reading c.height on later calls would re-inflate it by dpr each time (e.g. on
  // Windows display scaling, dpr≠1), making the canvas grow on every slider input.
  if (c._logicalH == null) c._logicalH = c.height || rect.height || 200;
  const h = c._logicalH;
  c.width = Math.round(w * dpr);
  c.height = Math.round(h * dpr);
  c.style.width = w + 'px';
  c.style.height = h + 'px';
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  return { c, ctx, w, h };
}

/* ── Shared helpers ── */
function gaussRand(mu, sigma) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ═══════════════════════════════════════════════════════════════
   ENGINE object
   ═══════════════════════════════════════════════════════════════ */
const ENGINE = {};

/* ────────────────────────────────────────────────────────────────
   D1 — CNN Filter Explorer
   ──────────────────────────────────────────────────────────────── */
ENGINE._cnnGrid = null;
ENGINE._cnnSize = 16;
ENGINE._cnnFilters = {
  'edge-h':  [[-1,-1,-1],[2,2,2],[-1,-1,-1]],
  'edge-v':  [[-1,2,-1],[-1,2,-1],[-1,2,-1]],
  'blur':    [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]],
  'sharpen': [[0,-1,0],[-1,5,-1],[0,-1,0]],
  'emboss':  [[-2,-1,0],[-1,1,1],[0,1,2]],
};
ENGINE._cnnActiveFilter = 'edge-h';
ENGINE._cnnPainting = false;

ENGINE.initCnn = function() {
  const n = ENGINE._cnnSize;
  ENGINE._cnnGrid = new Float32Array(n * n);
  // Default: draw a cross
  const mid = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    ENGINE._cnnGrid[mid * n + i] = 1;
    ENGINE._cnnGrid[i * n + mid] = 1;
  }
  ENGINE.renderCnn();
  const ic = document.getElementById('cnnInputCanvas');
  if (!ic || ic._cnnInit) return;
  ic._cnnInit = true;
  const getPos = (e) => {
    const r = ic.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    const col = Math.floor(x / r.width * n);
    const row = Math.floor(y / r.height * n);
    return { col, row };
  };
  const paint = (e) => {
    if (!ENGINE._cnnPainting) return;
    e.preventDefault();
    const { col, row } = getPos(e);
    if (col >= 0 && col < n && row >= 0 && row < n)
      ENGINE._cnnGrid[row * n + col] = 1;
    ENGINE.renderCnn();
  };
  ic.addEventListener('mousedown', (e) => { ENGINE._cnnPainting = true; paint(e); });
  ic.addEventListener('mousemove', paint);
  ic.addEventListener('mouseup', () => { ENGINE._cnnPainting = false; });
  ic.addEventListener('mouseleave', () => { ENGINE._cnnPainting = false; });
  ic.addEventListener('touchstart', (e) => { ENGINE._cnnPainting = true; paint(e); }, { passive: false });
  ic.addEventListener('touchmove', paint, { passive: false });
  ic.addEventListener('touchend', () => { ENGINE._cnnPainting = false; });
};

ENGINE.setCnnFilter = function(key) {
  ENGINE._cnnActiveFilter = key;
  ENGINE.renderCnn();
};

ENGINE.cnnClear = function() {
  ENGINE._cnnGrid = new Float32Array(ENGINE._cnnSize * ENGINE._cnnSize);
  ENGINE.renderCnn();
};

ENGINE.renderCnn = function() {
  const n = ENGINE._cnnSize;
  const grid = ENGINE._cnnGrid;
  const filter = ENGINE._cnnFilters[ENGINE._cnnActiveFilter];

  // Input canvas
  const ri = caSetup('cnnInputCanvas');
  if (!ri) return;
  const { ctx: ci, w: wi, h: hi } = ri;
  const cw = wi / n, ch = hi / n;
  ci.clearRect(0, 0, wi, hi);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = grid[r * n + c];
      ci.fillStyle = v > 0 ? `rgba(77,208,225,${v})` : 'rgba(30,30,40,0.6)';
      ci.fillRect(c * cw, r * ch, cw - 1, ch - 1);
    }
  }

  // Filter canvas
  const rf = caSetup('cnnFilterCanvas');
  if (rf) {
    const { ctx: cf, w: wf, h: hf } = rf;
    const fw = wf / 3, fh = hf / 3;
    cf.clearRect(0, 0, wf, hf);
    let fmin = Infinity, fmax = -Infinity;
    filter.forEach(row => row.forEach(v => { fmin = Math.min(fmin, v); fmax = Math.max(fmax, v); }));
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const v = filter[r][c];
        const t = fmax === fmin ? 0.5 : (v - fmin) / (fmax - fmin);
        const g = Math.round(t * 200 + 30);
        cf.fillStyle = `rgb(${g},${g},${Math.round(g * 1.2)})`;
        cf.fillRect(c * fw, r * fh, fw - 1, fh - 1);
        cf.fillStyle = '#fff';
        cf.font = `bold ${Math.round(fw * 0.3)}px var(--mono)`;
        cf.textAlign = 'center';
        cf.textBaseline = 'middle';
        cf.fillText(v.toFixed(1), c * fw + fw / 2, r * fh + fh / 2);
      }
    }
  }

  // Convolve
  const out = new Float32Array((n - 2) * (n - 2));
  let omin = Infinity, omax = -Infinity;
  for (let r = 0; r < n - 2; r++) {
    for (let c = 0; c < n - 2; c++) {
      let sum = 0;
      for (let fr = 0; fr < 3; fr++)
        for (let fc = 0; fc < 3; fc++)
          sum += filter[fr][fc] * grid[(r + fr) * n + (c + fc)];
      out[r * (n - 2) + c] = sum;
      omin = Math.min(omin, sum);
      omax = Math.max(omax, sum);
    }
  }
  const on = n - 2;
  const ro = caSetup('cnnOutputCanvas');
  if (ro) {
    const { ctx: co, w: wo, h: ho } = ro;
    const ocw = wo / on, och = ho / on;
    co.clearRect(0, 0, wo, ho);
    for (let r = 0; r < on; r++) {
      for (let c = 0; c < on; c++) {
        const v = out[r * on + c];
        const t = omax === omin ? 0 : (v - omin) / (omax - omin);
        const intensity = Math.round(t * 255);
        co.fillStyle = `rgb(${intensity},${Math.round(intensity * 0.9)},${Math.round(intensity * 1.1)})`;
        co.fillRect(c * ocw, r * och, ocw - 1, och - 1);
      }
    }
  }
};

ENGINE.teachCnn = function() {
  let step = 0;
  showNarration('cnn-filter', step);
  const bar = document.getElementById('narrator-cnn-filter');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('cnn-filter', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D2 — Self-Attention
   ──────────────────────────────────────────────────────────────── */
ENGINE._attnSentences = [
  ['The','cat','sat','on','the','mat'],
  ['She','sells','sea','shells'],
  ['The','bank','by','the','river','bank'],
  ['Time','flies','like','an','arrow'],
];
ENGINE._attnIdx = 0;
ENGINE._attnSel = 0;
// Pre-baked attention weight seeds (query-key affinities)
ENGINE._attnSeeds = [
  // Sentence 0: The cat sat on the mat
  [[0.1,0.7,0.4,0.2,0.8,0.5],[0.6,0.1,0.5,0.3,0.4,0.7],
   [0.3,0.6,0.1,0.5,0.2,0.4],[0.2,0.3,0.6,0.1,0.5,0.3],
   [0.8,0.3,0.2,0.4,0.1,0.9],[0.4,0.8,0.5,0.2,0.7,0.1]],
  // Sentence 1
  [[0.1,0.5,0.3,0.2],[0.4,0.1,0.7,0.6],[0.3,0.8,0.1,0.5],[0.2,0.6,0.4,0.1]],
  // Sentence 2
  [[0.1,0.8,0.3,0.7,0.2,0.9],[0.7,0.1,0.2,0.5,0.6,0.4],
   [0.3,0.2,0.1,0.4,0.3,0.2],[0.6,0.5,0.4,0.1,0.8,0.5],
   [0.2,0.7,0.3,0.9,0.1,0.3],[0.8,0.3,0.2,0.4,0.3,0.1]],
  // Sentence 3
  [[0.1,0.6,0.3,0.2,0.5],[0.5,0.1,0.4,0.7,0.3],
   [0.3,0.4,0.1,0.5,0.6],[0.2,0.6,0.5,0.1,0.4],[0.4,0.3,0.7,0.5,0.1]],
];

ENGINE.setAttnSentence = function(v) {
  ENGINE._attnIdx = parseInt(v);
  ENGINE._attnSel = 0;
  ENGINE.drawAttention();
};

ENGINE.drawAttention = function() {
  const r = caSetup('attnCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const tokens = ENGINE._attnSentences[ENGINE._attnIdx];
  const seeds = ENGINE._attnSeeds[ENGINE._attnIdx];
  const n = tokens.length;
  const temp = parseFloat(document.getElementById('attnTemp')?.value || 5) / 10;
  const sel = ENGINE._attnSel;

  // Softmax with temperature
  const rawWeights = seeds[sel];
  const scaled = rawWeights.map(v => v / temp);
  const maxS = Math.max(...scaled);
  const exps = scaled.map(v => Math.exp(v - maxS));
  const sumE = exps.reduce((a, b) => a + b, 0);
  const weights = exps.map(v => v / sumE);

  ctx.clearRect(0, 0, w, h);

  const tokenH = 36, tokenPad = 12;
  const totalW = n * (60 + tokenPad);
  const startX = (w - totalW) / 2;
  const tokY = h / 2;

  // Attention arcs above tokens
  for (let j = 0; j < n; j++) {
    const alpha = weights[j];
    if (j === sel) continue;
    const x1 = startX + sel * (60 + tokenPad) + 30;
    const x2 = startX + j * (60 + tokenPad) + 30;
    const cy = tokY - 20 - Math.abs(x2 - x1) * 0.35;
    ctx.beginPath();
    ctx.moveTo(x1, tokY - tokenH / 2);
    ctx.quadraticCurveTo((x1 + x2) / 2, cy, x2, tokY - tokenH / 2);
    ctx.strokeStyle = `rgba(77,208,225,${alpha * 0.9})`;
    ctx.lineWidth = 1 + alpha * 3;
    ctx.stroke();
  }

  // Tokens
  for (let i = 0; i < n; i++) {
    const tx = startX + i * (60 + tokenPad);
    const isSelected = i === sel;
    const attnW = weights[i];

    // Background glow for attention weight
    if (!isSelected) {
      ctx.fillStyle = `rgba(77,208,225,${attnW * 0.25})`;
      ctx.beginPath();
      ctx.roundRect(tx, tokY - tokenH / 2, 60, tokenH, 6);
      ctx.fill();
    }

    ctx.strokeStyle = isSelected ? '#4dd0e1' : `rgba(77,208,225,${0.2 + attnW * 0.6})`;
    ctx.lineWidth = isSelected ? 2 : 1;
    ctx.fillStyle = isSelected ? 'rgba(77,208,225,0.15)' : 'rgba(77,208,225,0.05)';
    ctx.beginPath();
    ctx.roundRect(tx, tokY - tokenH / 2, 60, tokenH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isSelected ? '#4dd0e1' : 'var(--text, #eee)';
    ctx.font = `${isSelected ? 'bold' : 'normal'} 13px var(--mono, monospace)`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tokens[i], tx + 30, tokY);

    // Weight label below
    if (!isSelected) {
      ctx.fillStyle = 'rgba(77,208,225,0.7)';
      ctx.font = '10px var(--mono, monospace)';
      ctx.fillText(attnW.toFixed(2), tx + 30, tokY + tokenH / 2 + 12);
    }
  }

  // Legend
  ctx.fillStyle = 'rgba(150,150,160,0.6)';
  ctx.font = '11px var(--mono, monospace)';
  ctx.textAlign = 'left';
  ctx.fillText('Click a token to select it as the query', 10, h - 12);

  // Register click handler once
  if (!c._attnInit) {
    c._attnInit = true;
    c.addEventListener('click', (e) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const tks = ENGINE._attnSentences[ENGINE._attnIdx];
      const tw = tks.length, tw2 = (w - tw * (60 + tokenPad)) / 2;
      for (let i = 0; i < tks.length; i++) {
        const tx = tw2 + i * (60 + tokenPad);
        if (mx >= tx && mx <= tx + 60) { ENGINE._attnSel = i; ENGINE.drawAttention(); break; }
      }
    });
  }
};

ENGINE.teachAttention = function() {
  let step = 0;
  showNarration('self-attention', step);
  const bar = document.getElementById('narrator-self-attention');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('self-attention', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D3 — Autoencoder
   ──────────────────────────────────────────────────────────────── */
ENGINE._aeGrid = null;
ENGINE._aeSize = 14;
ENGINE._aePainting = false;

ENGINE.initAutoencoder = function() {
  const n = ENGINE._aeSize;
  ENGINE._aeGrid = new Float32Array(n * n);
  // Default circle
  const cx = n / 2, cy = n / 2, r = n * 0.35;
  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++) {
      const d = Math.hypot(col - cx, row - cy);
      if (d < r && d > r - 2.5) ENGINE._aeGrid[row * n + col] = 1;
    }
  ENGINE.runAutoencoder();

  const ic = document.getElementById('aeInputCanvas');
  if (!ic || ic._aeInit) return;
  ic._aeInit = true;
  const getPos = (e) => {
    const rect = ic.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { col: Math.floor(x / rect.width * n), row: Math.floor(y / rect.height * n) };
  };
  const paint = (e) => {
    if (!ENGINE._aePainting) return;
    e.preventDefault();
    const { col, row } = getPos(e);
    if (col >= 0 && col < n && row >= 0 && row < n) ENGINE._aeGrid[row * n + col] = 1;
    ENGINE.runAutoencoder();
  };
  ic.addEventListener('mousedown', (e) => { ENGINE._aePainting = true; paint(e); });
  ic.addEventListener('mousemove', paint);
  ic.addEventListener('mouseup', () => { ENGINE._aePainting = false; });
  ic.addEventListener('mouseleave', () => { ENGINE._aePainting = false; });
  ic.addEventListener('touchstart', (e) => { ENGINE._aePainting = true; paint(e); }, { passive: false });
  ic.addEventListener('touchmove', paint, { passive: false });
  ic.addEventListener('touchend', () => { ENGINE._aePainting = false; });
};

ENGINE.aeClear = function() {
  ENGINE._aeGrid = new Float32Array(ENGINE._aeSize * ENGINE._aeSize);
  ENGINE.runAutoencoder();
};

ENGINE.runAutoencoder = function() {
  const n = ENGINE._aeSize;
  const grid = ENGINE._aeGrid;
  const bottleneck = parseInt(document.getElementById('aeBottleneck')?.value || 8);

  // Simulate compression via DCT-like: keep only the N lowest-frequency components
  // Simple approach: use a grid-frequency basis
  const flat = Array.from(grid);
  const W = n, H = n;

  // DCT-II approximation
  const dct = new Float32Array(W * H);
  for (let u = 0; u < W; u++) {
    for (let v = 0; v < H; v++) {
      let sum = 0;
      for (let x = 0; x < W; x++)
        for (let y = 0; y < H; y++)
          sum += flat[y * W + x] * Math.cos(Math.PI * u * (2 * x + 1) / (2 * W)) * Math.cos(Math.PI * v * (2 * y + 1) / (2 * H));
      dct[v * W + u] = sum;
    }
  }

  // Keep only 'bottleneck' lowest-frequency coefficients (zigzag order approximation)
  // Build list of (u,v) sorted by u+v (spatial frequency proxy)
  const freqs = [];
  for (let u = 0; u < W; u++)
    for (let v = 0; v < H; v++)
      freqs.push({ u, v, freq: u + v });
  freqs.sort((a, b) => a.freq - b.freq);

  const kept = new Float32Array(W * H);
  const maxKeep = Math.max(1, bottleneck);
  for (let i = 0; i < Math.min(maxKeep, freqs.length); i++) {
    const { u, v } = freqs[i];
    kept[v * W + u] = dct[v * W + u];
  }

  // IDCT
  const recon = new Float32Array(W * H);
  const norm = 4 / (W * H);
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      let sum = 0;
      for (let u = 0; u < W; u++)
        for (let v = 0; v < H; v++) {
          const cu = u === 0 ? 1 / Math.sqrt(2) : 1;
          const cv = v === 0 ? 1 / Math.sqrt(2) : 1;
          sum += cu * cv * kept[v * W + u] * Math.cos(Math.PI * u * (2 * x + 1) / (2 * W)) * Math.cos(Math.PI * v * (2 * y + 1) / (2 * H));
        }
      recon[y * W + x] = sum * norm;
    }
  }

  // Render input
  const ri = caSetup('aeInputCanvas');
  if (!ri) return;
  const { ctx: ci, w: wi, h: hi } = ri;
  const cw = wi / n, ch = hi / n;
  ci.clearRect(0, 0, wi, hi);
  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++) {
      ci.fillStyle = grid[row * n + col] > 0.5 ? '#4dd0e1' : 'rgba(30,30,40,0.5)';
      ci.fillRect(col * cw, row * ch, cw - 1, ch - 1);
    }

  // Render bottleneck bar
  const rb = caSetup('aeCodeCanvas');
  if (rb) {
    const { ctx: cb, w: wb, h: hb } = rb;
    cb.clearRect(0, 0, wb, hb);
    const cellH = hb / 32;
    for (let i = 0; i < 32; i++) {
      const active = i < bottleneck;
      const brightness = active ? (freqs[i] ? Math.abs(dct[freqs[i].v * W + freqs[i].u]) : 0.5) : 0;
      const t = Math.min(1, brightness * 2);
      cb.fillStyle = active ? `rgba(77,208,225,${0.3 + t * 0.7})` : 'rgba(80,80,100,0.3)';
      cb.fillRect(0, i * cellH, wb, cellH - 1);
    }
  }

  // Render reconstruction
  const ro = caSetup('aeOutputCanvas');
  if (!ro) return;
  const { ctx: co, w: wo, h: ho } = ro;
  const ocw = wo / n, och = ho / n;
  co.clearRect(0, 0, wo, ho);
  let rmin = Infinity, rmax = -Infinity;
  recon.forEach(v => { rmin = Math.min(rmin, v); rmax = Math.max(rmax, v); });
  for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++) {
      const t = rmax > rmin ? (recon[row * n + col] - rmin) / (rmax - rmin) : 0;
      co.fillStyle = `rgba(77,208,225,${t.toFixed(3)})`;
      co.fillRect(col * ocw, row * och, ocw - 1, och - 1);
    }
};

ENGINE.teachAutoencoder = function() {
  let step = 0;
  showNarration('autoencoder', step);
  const bar = document.getElementById('narrator-autoencoder');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('autoencoder', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D4 — Variational Autoencoder
   ──────────────────────────────────────────────────────────────── */
ENGINE._vaeClick = null;
ENGINE._vaeRegions = [
  // [x, y, shape] in normalised [-1,1] latent space coords
  { z: [-0.7, -0.6], label: 'circle',    draw: (ctx, cx, cy, s) => { ctx.beginPath(); ctx.arc(cx, cy, s * 0.4, 0, Math.PI * 2); ctx.stroke(); } },
  { z: [-0.2, -0.7], label: 'triangle',  draw: (ctx, cx, cy, s) => { ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.45); ctx.lineTo(cx + s * 0.4, cy + s * 0.35); ctx.lineTo(cx - s * 0.4, cy + s * 0.35); ctx.closePath(); ctx.stroke(); } },
  { z: [0.6, -0.5],  label: 'square',    draw: (ctx, cx, cy, s) => { ctx.strokeRect(cx - s * 0.35, cy - s * 0.35, s * 0.7, s * 0.7); } },
  { z: [0.8, 0.4],   label: 'diamond',   draw: (ctx, cx, cy, s) => { ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.45); ctx.lineTo(cx + s * 0.4, cy, ); ctx.lineTo(cx, cy + s * 0.45); ctx.lineTo(cx - s * 0.4, cy); ctx.closePath(); ctx.stroke(); } },
  { z: [0.1, 0.7],   label: 'cross',     draw: (ctx, cx, cy, s) => { ctx.beginPath(); ctx.moveTo(cx - s * 0.4, cy); ctx.lineTo(cx + s * 0.4, cy); ctx.moveTo(cx, cy - s * 0.4); ctx.lineTo(cx, cy + s * 0.4); ctx.stroke(); } },
  { z: [-0.6, 0.6],  label: 'star',      draw: (ctx, cx, cy, s) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI / 5) - Math.PI / 2;
      const b = a + 2 * Math.PI / 5;
      ctx.lineTo(cx + Math.cos(a) * s * 0.4, cy + Math.sin(a) * s * 0.4);
      ctx.lineTo(cx + Math.cos(b) * s * 0.18, cy + Math.sin(b) * s * 0.18);
    }
    ctx.closePath(); ctx.stroke();
  }},
  { z: [0.0, 0.0],   label: 'avg shape', draw: (ctx, cx, cy, s) => {
    ctx.beginPath(); ctx.arc(cx, cy, s * 0.3, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeRect(cx - s * 0.15, cy - s * 0.15, s * 0.3, s * 0.3);
  }},
];

ENGINE.drawVaeLatent = function() {
  const r = caSetup('vaeLatentCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const sigma = parseFloat(document.getElementById('vaeSigma')?.value || 5) / 10;

  ctx.clearRect(0, 0, w, h);

  // Background gradient
  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  bg.addColorStop(0, 'rgba(77,208,225,0.08)');
  bg.addColorStop(1, 'rgba(20,20,30,0)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const toCanvas = (z) => ({
    x: (z[0] + 1) / 2 * w * 0.85 + w * 0.075,
    y: (z[1] + 1) / 2 * h * 0.85 + h * 0.075,
  });

  // Draw Gaussian blobs for each region
  ENGINE._vaeRegions.forEach(reg => {
    const { x, y } = toCanvas(reg.z);
    const g = ctx.createRadialGradient(x, y, 0, x, y, sigma * w * 0.25);
    g.addColorStop(0, 'rgba(77,208,225,0.18)');
    g.addColorStop(1, 'rgba(77,208,225,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, sigma * w * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Label dot
    ctx.fillStyle = 'rgba(77,208,225,0.5)';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(200,200,220,0.6)';
    ctx.font = '10px var(--mono, monospace)';
    ctx.textAlign = 'center';
    ctx.fillText(reg.label, x, y - 8);
  });

  // Axes
  ctx.strokeStyle = 'rgba(150,150,160,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
  ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Click point
  if (ENGINE._vaeClick) {
    const { x, y } = ENGINE._vaeClick;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.font = '10px var(--mono, monospace)';
  ctx.textAlign = 'center';
  ctx.fillText('latent z₁', w / 2, h - 4);
  ctx.save();
  ctx.translate(10, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('latent z₂', 0, 0);
  ctx.restore();

  if (!c._vaeInit) {
    c._vaeInit = true;
    c.addEventListener('click', (e) => {
      const rect = c.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      ENGINE._vaeClick = { x: cx, y: cy };
      const z1 = (cx / rect.width - 0.075) / 0.85 * 2 - 1;
      const z2 = (cy / rect.height - 0.075) / 0.85 * 2 - 1;
      ENGINE.drawVaeLatent();
      ENGINE.decodeVae(z1, z2);
    });
  }
};

ENGINE.decodeVae = function(z1, z2) {
  // Find nearest region, blend between two closest
  const sigma = parseFloat(document.getElementById('vaeSigma')?.value || 5) / 10;
  const regs = ENGINE._vaeRegions;
  const dists = regs.map(r => Math.hypot(r.z[0] - z1, r.z[1] - z2));
  const sorted = dists.map((d, i) => ({ d, i })).sort((a, b) => a.d - b.d);

  const r = caSetup('vaeOutputCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);

  // Blend two nearest
  const i1 = sorted[0].i, i2 = sorted[1].i;
  const d1 = sorted[0].d, d2 = sorted[1].d;
  const blend = d1 + d2 > 0 ? d2 / (d1 + d2) : 0.5; // weight toward nearer
  const cx = w / 2, cy = h / 2, s = Math.min(w, h) * 0.9;
  const noise = sigma * 0.3;

  ctx.strokeStyle = `rgba(77,208,225,${0.5 + blend * 0.4})`;
  ctx.lineWidth = 2;
  ctx.save();
  ctx.translate(gaussRand(0, noise * w * 0.05), gaussRand(0, noise * h * 0.05));
  regs[i1].draw(ctx, cx, cy, s);
  ctx.restore();

  if (blend < 0.7) {
    ctx.strokeStyle = `rgba(77,208,225,${(1 - blend) * 0.5})`;
    ctx.lineWidth = 1;
    ctx.save();
    ctx.translate(gaussRand(0, noise * w * 0.08), gaussRand(0, noise * h * 0.08));
    regs[i2].draw(ctx, cx, cy, s * (0.7 + blend * 0.3));
    ctx.restore();
  }

  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.font = '10px var(--mono, monospace)';
  ctx.textAlign = 'center';
  ctx.fillText(`z = (${z1.toFixed(2)}, ${z2.toFixed(2)})`, w / 2, h - 6);
};

ENGINE.teachVae = function() {
  let step = 0;
  showNarration('vae', step);
  const bar = document.getElementById('narrator-vae');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('vae', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D5 — U-Net Architecture Animation
   ──────────────────────────────────────────────────────────────── */
ENGINE._unetFrame = 0;
ENGINE._unetPlaying = false;
ENGINE._unetRAF = null;
ENGINE._unetLastTime = 0;
ENGINE._unetFPS = 0.8; // steps per second

ENGINE.toggleUnet = function() {
  ENGINE._unetPlaying = !ENGINE._unetPlaying;
  const btn = document.getElementById('unetPlayBtn');
  if (btn) btn.textContent = ENGINE._unetPlaying ? '⏸ Pause' : '▶ Play';
  if (ENGINE._unetPlaying) ENGINE._unetAnimate();
};

ENGINE.restartUnet = function() {
  ENGINE._unetFrame = 0;
  ENGINE._unetPlaying = false;
  const btn = document.getElementById('unetPlayBtn');
  if (btn) btn.textContent = '▶ Play';
  ENGINE.drawUnetFrame();
};

ENGINE._unetAnimate = function() {
  if (!ENGINE._unetPlaying) return;
  ENGINE._unetFrame = (ENGINE._unetFrame + 1) % 16;
  ENGINE.drawUnetFrame();
  ENGINE._unetRAF = setTimeout(ENGINE._unetAnimate, 1000 / ENGINE._unetFPS);
};

ENGINE.drawUnetFrame = function() {
  const r = caSetup('unetCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const showSkip = document.getElementById('unetSkipToggle')?.checked !== false;
  const frame = ENGINE._unetFrame;

  ctx.clearRect(0, 0, w, h);

  // U-Net has 4 encoder levels + bottleneck + 4 decoder levels
  // Levels: enc0,enc1,enc2,enc3,bot,dec3,dec2,dec1,dec0
  const levels = 4;
  const totalBlocks = levels * 2 + 1; // 9
  const blockW = Math.min(56, w / (totalBlocks + 2));
  const spacing = (w - totalBlocks * blockW) / (totalBlocks + 1);

  const blockX = (i) => spacing + i * (blockW + spacing);

  // Heights: encoder shrinks, decoder grows (mirrored)
  const baseH = h * 0.52;
  const blockH = (i) => {
    const enc = i < levels ? levels - i : i < levels + 1 ? 0 : i - levels;
    const d = i <= levels ? i : totalBlocks - 1 - i;
    return baseH * (0.3 + 0.7 * d / levels);
  };

  const labels = ['256ch','128ch','64ch','32ch','16ch\n(bottle)','32ch','64ch','128ch','256ch'];
  const names = ['Enc 1','Enc 2','Enc 3','Enc 4','Bottleneck','Dec 4','Dec 3','Dec 2','Dec 1'];

  // Draw skip connections first (behind blocks)
  if (showSkip) {
    for (let i = 0; i < levels; i++) {
      const ex = blockX(i) + blockW / 2;
      const dx = blockX(totalBlocks - 1 - i) + blockW / 2;
      const eh = blockH(i);
      const dh = blockH(totalBlocks - 1 - i);
      const ey = h * 0.15 + (baseH - eh) / 2;
      const dy = h * 0.15 + (baseH - dh) / 2;
      const skipY = ey - 18 - i * 10;

      const active = frame >= i && frame <= totalBlocks - 1 - i;
      ctx.strokeStyle = active ? 'rgba(77,208,225,0.7)' : 'rgba(77,208,225,0.15)';
      ctx.lineWidth = active ? 2 : 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex, skipY);
      ctx.lineTo(dx, skipY);
      ctx.lineTo(dx, dy);
      ctx.stroke();
      ctx.setLineDash([]);

      if (active) {
        ctx.fillStyle = 'rgba(77,208,225,0.7)';
        ctx.font = 'bold 9px var(--mono)';
        ctx.textAlign = 'center';
        ctx.fillText('skip', (ex + dx) / 2, skipY - 3);
      }
    }
  }

  // Draw blocks
  for (let i = 0; i < totalBlocks; i++) {
    const x = blockX(i);
    const bh = blockH(i);
    const y = h * 0.15 + (baseH - bh) / 2;
    const isBottleneck = i === levels;
    const active = i === frame % totalBlocks;
    const past = i < frame % totalBlocks;

    const alpha = active ? 1 : past ? 0.7 : 0.3;
    ctx.fillStyle = isBottleneck
      ? `rgba(200,100,255,${alpha * 0.3})`
      : i < levels
        ? `rgba(77,208,225,${alpha * 0.25})`
        : `rgba(100,200,180,${alpha * 0.25})`;
    ctx.strokeStyle = isBottleneck
      ? `rgba(200,100,255,${alpha})`
      : i < levels
        ? `rgba(77,208,225,${alpha})`
        : `rgba(100,200,180,${alpha})`;
    ctx.lineWidth = active ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x, y, blockW, bh, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = `rgba(220,220,240,${alpha * 0.9})`;
    ctx.font = `${active ? 'bold' : 'normal'} 9px var(--mono)`;
    ctx.textAlign = 'center';
    ctx.fillText(names[i], x + blockW / 2, y + bh + 14);

    // Animated data particle
    if (active) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x + blockW / 2, y + bh / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Flow arrows
  for (let i = 0; i < totalBlocks - 1; i++) {
    const x1 = blockX(i) + blockW;
    const x2 = blockX(i + 1);
    const y1 = h * 0.15 + (baseH - blockH(i)) / 2 + blockH(i) / 2;
    const y2 = h * 0.15 + (baseH - blockH(i + 1)) / 2 + blockH(i + 1) / 2;
    const active = i < frame % totalBlocks;
    ctx.strokeStyle = active ? 'rgba(220,220,240,0.5)' : 'rgba(220,220,240,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.font = '10px var(--mono)';
  ctx.textAlign = 'center';
  ctx.fillText('Step ' + (frame % totalBlocks + 1) + ' / ' + totalBlocks, w / 2, h - 6);
};

ENGINE.teachUnet = function() {
  let step = 0;
  showNarration('unet', step);
  const bar = document.getElementById('narrator-unet');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('unet', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D6 — Seq2Seq + Attention
   ──────────────────────────────────────────────────────────────── */
ENGINE._s2sExamples = [
  {
    enc: ['1','2','3','4','5'],
    dec: ['1','3','6','10','15'],
    attn: [[0.9,0.1,0,0,0],[0.5,0.5,0,0,0],[0.3,0.3,0.4,0,0],[0.2,0.2,0.3,0.3,0],[0.15,0.15,0.2,0.25,0.25]],
    label: 'Cumulative sums'
  },
  {
    enc: ['Je','suis','heureux'],
    dec: ['I','am','happy'],
    attn: [[0.85,0.1,0.05],[0.05,0.85,0.1],[0.05,0.1,0.85]],
    label: 'Translation'
  },
  {
    enc: ['A','B','C','D'],
    dec: ['D','C','B','A'],
    attn: [[0.05,0.1,0.15,0.7],[0.1,0.1,0.7,0.1],[0.1,0.7,0.1,0.1],[0.7,0.1,0.1,0.1]],
    label: 'Reverse sequence'
  },
  {
    enc: ['3','1','4','2'],
    dec: ['1','2','3','4'],
    attn: [[0.1,0.8,0.05,0.05],[0.05,0.05,0.05,0.85],[0.8,0.05,0.1,0.05],[0.05,0.05,0.8,0.1]],
    label: 'Sort ascending'
  },
];
ENGINE._s2sIdx = 0;

ENGINE.setS2SExample = function(idx) {
  ENGINE._s2sIdx = idx;
  ENGINE.drawS2S();
};

ENGINE.drawS2S = function() {
  const r = caSetup('s2sCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const ex = ENGINE._s2sExamples[ENGINE._s2sIdx];
  const showAttn = document.getElementById('s2sAttnToggle')?.checked !== false;

  ctx.clearRect(0, 0, w, h);

  const enc = ex.enc, dec = ex.dec;
  const ne = enc.length, nd = dec.length;
  const cellSize = Math.min(36, (w * 0.4) / Math.max(ne, nd));
  const pad = 6;

  // Layout: encoder row top, decoder row right, attention matrix middle-right
  const encY = 40;
  const decY = h - 50;
  const encStartX = w * 0.05;
  const decStartX = w * 0.05;

  // Encoder tokens
  ctx.font = 'bold 11px var(--mono)';
  ctx.textAlign = 'center';
  for (let i = 0; i < ne; i++) {
    const x = encStartX + i * (cellSize + pad);
    ctx.fillStyle = 'rgba(77,208,225,0.2)';
    ctx.beginPath(); ctx.roundRect(x, encY - cellSize / 2, cellSize, cellSize, 4); ctx.fill();
    ctx.strokeStyle = 'rgba(77,208,225,0.7)'; ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#4dd0e1';
    ctx.fillText(enc[i], x + cellSize / 2, encY + 4);
  }
  ctx.fillStyle = 'rgba(150,150,160,0.6)';
  ctx.font = '9px var(--mono)'; ctx.textAlign = 'left';
  ctx.fillText('ENCODER', encStartX, encY - cellSize / 2 - 6);

  // Decoder tokens
  ctx.font = 'bold 11px var(--mono)'; ctx.textAlign = 'center';
  for (let i = 0; i < nd; i++) {
    const x = decStartX + i * (cellSize + pad);
    ctx.fillStyle = 'rgba(100,200,180,0.2)';
    ctx.beginPath(); ctx.roundRect(x, decY - cellSize / 2, cellSize, cellSize, 4); ctx.fill();
    ctx.strokeStyle = 'rgba(100,200,180,0.7)'; ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#64c8b4';
    ctx.fillText(dec[i], x + cellSize / 2, decY + 4);
  }
  ctx.fillStyle = 'rgba(150,150,160,0.6)';
  ctx.font = '9px var(--mono)'; ctx.textAlign = 'left';
  ctx.fillText('DECODER', decStartX, decY + cellSize / 2 + 14);

  if (!showAttn) return;

  // Attention matrix
  const matLeft = w * 0.55;
  const matTop = h * 0.12;
  const matCellW = Math.min(30, (w * 0.42) / ne);
  const matCellH = Math.min(30, (h * 0.7) / nd);

  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.font = '9px var(--mono)'; ctx.textAlign = 'center';
  ctx.fillText('Attention', matLeft + ne * matCellW / 2, matTop - 6);

  for (let di = 0; di < nd; di++) {
    for (let ei = 0; ei < ne; ei++) {
      const a = ex.attn[di] ? (ex.attn[di][ei] || 0) : 0;
      const x = matLeft + ei * matCellW;
      const y = matTop + di * matCellH;
      ctx.fillStyle = `rgba(77,208,225,${a * 0.9 + 0.02})`;
      ctx.fillRect(x, y, matCellW - 1, matCellH - 1);
    }
  }

  // Encoder labels on matrix
  ctx.font = '8px var(--mono)'; ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(77,208,225,0.7)';
  for (let i = 0; i < ne; i++)
    ctx.fillText(enc[i], matLeft + i * matCellW + matCellW / 2, matTop - 14);

  // Decoder labels on matrix
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(100,200,180,0.7)';
  for (let i = 0; i < nd; i++)
    ctx.fillText(dec[i], matLeft - 4, matTop + i * matCellH + matCellH / 2 + 3);

  // Context vector arrow
  const encMidX = encStartX + (ne - 1) * (cellSize + pad) / 2 + cellSize / 2;
  ctx.strokeStyle = 'rgba(200,180,100,0.5)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(encMidX, encY + cellSize / 2 + 4);
  ctx.lineTo(encMidX, h / 2 - 10);
  ctx.lineTo(decStartX + (nd - 1) * (cellSize + pad) / 2 + cellSize / 2, decY - cellSize / 2 - 4);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '9px var(--mono)'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(200,180,100,0.6)';
  ctx.fillText('context', encMidX + 20, h / 2 + 4);
};

ENGINE.teachSeq2Seq = function() {
  let step = 0;
  showNarration('seq2seq', step);
  const bar = document.getElementById('narrator-seq2seq');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('seq2seq', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D7 — GAN Training
   ──────────────────────────────────────────────────────────────── */
ENGINE._ganSteps = 0;
ENGINE._ganGenMu = 0.2;
ENGINE._ganGenSigma = 0.3;

ENGINE.resetGan = function() {
  ENGINE._ganSteps = 0;
  ENGINE._ganGenMu = 0.2;
  ENGINE._ganGenSigma = 0.3;
  const steps = document.getElementById('ganSteps');
  const acc = document.getElementById('ganAcc');
  if (steps) steps.textContent = '0';
  if (acc) acc.textContent = '—';
  ENGINE.drawGan();
};

ENGINE.ganStep = function(n) {
  const dist = document.getElementById('ganDistSel')?.value || 'gaussian';
  for (let i = 0; i < n; i++) {
    // Generator tries to match real distribution
    const [realMu, realSigma] = ENGINE._ganRealParams(dist);
    const lr = 0.003 / (1 + ENGINE._ganSteps * 0.001);
    ENGINE._ganGenMu += lr * (realMu - ENGINE._ganGenMu) * (1 + Math.random() * 0.5);
    ENGINE._ganGenSigma += lr * (realSigma - ENGINE._ganGenSigma) * (1 + Math.random() * 0.3);
    ENGINE._ganGenSigma = Math.max(0.03, ENGINE._ganGenSigma);
    ENGINE._ganSteps++;
  }
  const steps = document.getElementById('ganSteps');
  const acc = document.getElementById('ganAcc');
  if (steps) steps.textContent = ENGINE._ganSteps;
  if (acc) {
    const [realMu, realSigma] = ENGINE._ganRealParams(document.getElementById('ganDistSel')?.value || 'gaussian');
    const overlap = Math.max(0, 1 - Math.abs(ENGINE._ganGenMu - realMu) - Math.abs(ENGINE._ganGenSigma - realSigma));
    const dAcc = 50 + overlap * 50;
    acc.textContent = dAcc.toFixed(0) + '%';
  }
  ENGINE.drawGan();
};

ENGINE._ganRealParams = function(dist) {
  if (dist === 'bimodal') return [0.55, 0.12];
  if (dist === 'uniform') return [0.5, 0.18];
  return [0.6, 0.1]; // gaussian
};

ENGINE.drawGan = function() {
  const r = caSetup('ganCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const dist = document.getElementById('ganDistSel')?.value || 'gaussian';
  const [realMu, realSigma] = ENGINE._ganRealParams(dist);
  ctx.clearRect(0, 0, w, h);

  const margin = { l: 40, r: 20, t: 30, b: 40 };
  const pw = w - margin.l - margin.r;
  const ph = h - margin.t - margin.b;

  // Draw real distribution
  const pdf = (x, mu, sigma, dist2) => {
    if (dist2 === 'bimodal') return (
      Math.exp(-0.5 * ((x - (mu - 0.12)) / 0.09) ** 2) / (0.09 * Math.sqrt(2 * Math.PI)) * 0.5 +
      Math.exp(-0.5 * ((x - (mu + 0.12)) / 0.09) ** 2) / (0.09 * Math.sqrt(2 * Math.PI)) * 0.5
    );
    if (dist2 === 'uniform') return (x >= 0.2 && x <= 0.8) ? 1 / 0.6 : 0;
    return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
  };

  const xs = Array.from({ length: 200 }, (_, i) => i / 199);
  const realY = xs.map(x => pdf(x, realMu, realSigma, dist));
  const genY = xs.map(x => pdf(x, ENGINE._ganGenMu, ENGINE._ganGenSigma, 'gaussian'));
  const maxY = Math.max(...realY, ...genY, 1);

  const toX = (v) => margin.l + v * pw;
  const toY = (v) => margin.t + ph - (v / maxY) * ph;

  // Real distribution (teal fill)
  ctx.beginPath();
  xs.forEach((x, i) => i === 0 ? ctx.moveTo(toX(x), toY(realY[i])) : ctx.lineTo(toX(x), toY(realY[i])));
  ctx.lineTo(toX(1), toY(0)); ctx.lineTo(toX(0), toY(0)); ctx.closePath();
  ctx.fillStyle = 'rgba(77,208,225,0.2)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(77,208,225,0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Generator distribution (orange)
  ctx.beginPath();
  xs.forEach((x, i) => i === 0 ? ctx.moveTo(toX(x), toY(genY[i])) : ctx.lineTo(toX(x), toY(genY[i])));
  ctx.lineTo(toX(1), toY(0)); ctx.lineTo(toX(0), toY(0)); ctx.closePath();
  ctx.fillStyle = 'rgba(255,150,80,0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,150,80,0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Axes
  ctx.strokeStyle = 'rgba(150,150,160,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t); ctx.lineTo(margin.l, margin.t + ph);
  ctx.lineTo(margin.l + pw, margin.t + ph);
  ctx.stroke();

  // Legend
  ctx.font = '11px var(--mono)'; ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(77,208,225,0.9)';
  ctx.fillText('● Real', margin.l + 8, margin.t + 16);
  ctx.fillStyle = 'rgba(255,150,80,0.9)';
  ctx.fillText('● Generator', margin.l + 70, margin.t + 16);

  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.font = '10px var(--mono)';
  ctx.textAlign = 'center';
  ctx.fillText('sample value', w / 2, h - 6);
};

ENGINE.teachGan = function() {
  let step = 0;
  showNarration('gan', step);
  const bar = document.getElementById('narrator-gan');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('gan', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D8 — Diffusion Process
   ──────────────────────────────────────────────────────────────── */
ENGINE._diffPoints = null;
ENGINE._diffT = 60;

ENGINE._diffPatterns = {
  'two-moons': () => {
    const pts = [];
    for (let i = 0; i < 120; i++) {
      const t = (i / 60) * Math.PI;
      const noise = () => (Math.random() - 0.5) * 0.08;
      if (i < 60) pts.push([Math.cos(t) * 0.7 + noise(), Math.sin(t) * 0.4 + 0.2 + noise()]);
      else pts.push([Math.cos(t) * 0.7 + noise(), -Math.sin(t) * 0.4 - 0.2 + noise()]);
    }
    return pts;
  },
  'spiral': () => {
    const pts = [];
    for (let i = 0; i < 120; i++) {
      const t = (i / 120) * 4 * Math.PI;
      const r = 0.15 + (i / 120) * 0.7;
      const noise = () => (Math.random() - 0.5) * 0.05;
      pts.push([Math.cos(t) * r + noise(), Math.sin(t) * r + noise()]);
    }
    return pts;
  },
  'grid': () => {
    const pts = [];
    for (let r = -2; r <= 2; r++)
      for (let c = -2; c <= 2; c++)
        pts.push([c * 0.35 + (Math.random() - 0.5) * 0.04, r * 0.35 + (Math.random() - 0.5) * 0.04]);
    return pts;
  },
  'ring': () => {
    const pts = [];
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * 2 * Math.PI;
      const r = 0.65 + (Math.random() - 0.5) * 0.08;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return pts;
  },
};

ENGINE.resetDiffusion = function() {
  const pat = document.getElementById('diffPatSel')?.value || 'two-moons';
  ENGINE._diffPoints = ENGINE._diffPatterns[pat]();
  document.getElementById('diffT').value = 0;
  document.getElementById('diffTV').textContent = '0';
  ENGINE.drawDiffusion();
};

ENGINE.drawDiffusion = function() {
  const r = caSetup('diffCanvas');
  if (!r) return;
  if (!ENGINE._diffPoints) ENGINE.resetDiffusion();
  const { ctx, w, h } = r;
  const t = parseInt(document.getElementById('diffT')?.value || 0);
  const T = 60;
  const noiseLevel = t / T;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2, cy = h / 2;
  const scale = Math.min(w, h) * 0.42;

  // Add noise to original points proportional to t
  const beta = noiseLevel * noiseLevel; // quadratic schedule
  ENGINE._diffPoints.forEach(([x0, y0]) => {
    const nx = x0 * (1 - beta) + gaussRand(0, beta * 0.5);
    const ny = y0 * (1 - beta) + gaussRand(0, beta * 0.5);
    const px = cx + nx * scale;
    const py = cy + ny * scale;
    const alpha = Math.max(0.1, 1 - noiseLevel * 0.7);
    const hue = noiseLevel * 60; // shift from teal to yellow as noise increases
    ctx.fillStyle = `hsla(${180 + hue}, 70%, 65%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Noise label
  ctx.fillStyle = 'rgba(150,150,160,0.6)';
  ctx.font = '11px var(--mono)';
  ctx.textAlign = 'center';
  const labels = ['clean data', 'slight noise', 'noisy', 'very noisy', 'pure noise'];
  const li = Math.floor(noiseLevel * (labels.length - 1));
  ctx.fillText(`t = ${t} — ${labels[Math.min(li, labels.length - 1)]}`, w / 2, h - 8);
};

ENGINE.teachDiffusion = function() {
  let step = 0;
  showNarration('diffusion', step);
  const bar = document.getElementById('narrator-diffusion');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('diffusion', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D9 — Residual Networks
   ──────────────────────────────────────────────────────────────── */
ENGINE.drawResidual = function() {
  const r = caSetup('resCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const skip = document.getElementById('resSkipToggle')?.checked || false;
  const depth = parseInt(document.getElementById('resDepth')?.value || 10);

  ctx.clearRect(0, 0, w, h);

  // Show gradient magnitude at each layer (1 = full signal, 0 = vanished)
  const gradients = [];
  for (let i = 0; i < depth; i++) {
    // Without skip: gradient ~ 0.85^i (each layer multiplies by ~0.85)
    // With skip: gradient ~ 1 (highway)
    if (skip) {
      gradients.push(Math.max(0.05, 1 - i * 0.01));
    } else {
      gradients.push(Math.pow(0.82, i));
    }
  }

  const margin = { l: 60, r: 20, t: 30, b: 50 };
  const pw = w - margin.l - margin.r;
  const ph = h - margin.t - margin.b;

  const layerW = pw / depth;
  const maxG = 1;

  // Draw layers as rectangles coloured by gradient magnitude
  for (let i = 0; i < depth; i++) {
    const g = gradients[i];
    const x = margin.l + i * layerW + layerW * 0.1;
    const barH = (g / maxG) * ph;
    const y = margin.t + ph - barH;
    const bw = layerW * 0.8;

    // Color: green (strong) → red (vanished)
    const r2 = Math.round(255 * (1 - g));
    const g2 = Math.round(200 * g);
    ctx.fillStyle = `rgba(${r2},${g2},100,0.7)`;
    ctx.fillRect(x, y, bw, barH);
    ctx.strokeStyle = `rgba(${r2},${g2},100,0.9)`;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, bw, barH);
  }

  // Skip connection arc (when enabled)
  if (skip) {
    for (let i = 0; i < depth - 1; i += 2) {
      const x1 = margin.l + i * layerW + layerW / 2;
      const x2 = margin.l + (i + 2) * layerW + layerW / 2;
      const arcY = margin.t - 18 - (i % 4) * 6;
      ctx.strokeStyle = 'rgba(77,208,225,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, margin.t);
      ctx.quadraticCurveTo((x1 + x2) / 2, arcY, x2, margin.t);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(77,208,225,0.6)';
    ctx.font = '10px var(--mono)';
    ctx.textAlign = 'center';
    ctx.fillText('skip connections', w / 2, 12);
  }

  // Axes
  ctx.strokeStyle = 'rgba(150,150,160,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t); ctx.lineTo(margin.l, margin.t + ph);
  ctx.lineTo(margin.l + pw, margin.t + ph);
  ctx.stroke();

  // Y axis labels
  ctx.fillStyle = 'rgba(150,150,160,0.6)';
  ctx.font = '10px var(--mono)';
  ctx.textAlign = 'right';
  ctx.fillText('1.0', margin.l - 4, margin.t + 4);
  ctx.fillText('0.5', margin.l - 4, margin.t + ph / 2 + 4);
  ctx.fillText('0.0', margin.l - 4, margin.t + ph + 4);

  // X axis label
  ctx.textAlign = 'center';
  ctx.fillText('layer (from output → input)', margin.l + pw / 2, margin.t + ph + 30);
  ctx.save(); ctx.translate(14, margin.t + ph / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('gradient magnitude', 0, 0);
  ctx.restore();

  // Status text
  const finalGrad = gradients[depth - 1];
  ctx.fillStyle = finalGrad < 0.01 ? 'rgba(255,80,80,0.8)' : 'rgba(80,220,120,0.8)';
  ctx.font = 'bold 11px var(--mono)';
  ctx.textAlign = 'right';
  ctx.fillText(
    `Gradient at layer 1: ${finalGrad.toExponential(2)}` + (finalGrad < 0.01 ? '  ← vanished!' : '  ← healthy'),
    w - margin.r, margin.t + ph + 30
  );
};

ENGINE.teachResidual = function() {
  let step = 0;
  showNarration('residual', step);
  const bar = document.getElementById('narrator-residual');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('residual', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D10 — Embedding Space
   ──────────────────────────────────────────────────────────────── */
ENGINE._embPoints = [
  // Animals cluster
  { label: 'dog',    x: 0.18, y: 0.22, cluster: 0 },
  { label: 'cat',    x: 0.22, y: 0.17, cluster: 0 },
  { label: 'puppy',  x: 0.15, y: 0.28, cluster: 0 },
  { label: 'kitten', x: 0.28, y: 0.14, cluster: 0 },
  { label: 'wolf',   x: 0.10, y: 0.35, cluster: 0 },
  { label: 'lion',   x: 0.08, y: 0.25, cluster: 0 },
  // Colours cluster
  { label: 'red',    x: 0.72, y: 0.18, cluster: 1 },
  { label: 'blue',   x: 0.78, y: 0.14, cluster: 1 },
  { label: 'green',  x: 0.75, y: 0.22, cluster: 1 },
  { label: 'yellow', x: 0.82, y: 0.19, cluster: 1 },
  { label: 'purple', x: 0.70, y: 0.12, cluster: 1 },
  // Royals cluster (for king-queen demo)
  { label: 'king',   x: 0.45, y: 0.72, cluster: 2 },
  { label: 'queen',  x: 0.55, y: 0.68, cluster: 2 },
  { label: 'prince', x: 0.42, y: 0.80, cluster: 2 },
  { label: 'duke',   x: 0.38, y: 0.74, cluster: 2 },
  // Verbs cluster
  { label: 'run',    x: 0.62, y: 0.55, cluster: 3 },
  { label: 'walk',   x: 0.68, y: 0.50, cluster: 3 },
  { label: 'jump',   x: 0.72, y: 0.58, cluster: 3 },
  { label: 'swim',   x: 0.58, y: 0.62, cluster: 3 },
  // Food cluster
  { label: 'apple',  x: 0.28, y: 0.58, cluster: 4 },
  { label: 'banana', x: 0.22, y: 0.64, cluster: 4 },
  { label: 'bread',  x: 0.35, y: 0.52, cluster: 4 },
  { label: 'rice',   x: 0.30, y: 0.70, cluster: 4 },
];
ENGINE._embSel = null;
ENGINE._embHover = null;
ENGINE._embClusterColors = [
  '#4dd0e1','#ffb74d','#ce93d8','#81c784','#ff8a65'
];
ENGINE._embClusterNames = ['Animals','Colours','Royals','Verbs','Food'];

ENGINE.drawEmbeddings = function() {
  const r = caSetup('embCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const k = parseInt(document.getElementById('embK')?.value || 3);
  const showClusters = document.getElementById('embClusters')?.checked !== false;
  const pts = ENGINE._embPoints;

  ctx.clearRect(0, 0, w, h);
  const pad = 30;

  const px = (x) => pad + x * (w - 2 * pad);
  const py = (y) => pad + y * (h - 2 * pad);

  // Cluster hulls
  if (showClusters) {
    for (let ci = 0; ci < 5; ci++) {
      const clusterPts = pts.filter(p => p.cluster === ci);
      const xs = clusterPts.map(p => px(p.x));
      const ys = clusterPts.map(p => py(p.y));
      const mx = xs.reduce((a, b) => a + b) / xs.length;
      const my = ys.reduce((a, b) => a + b) / ys.length;
      const rx = (Math.max(...xs) - Math.min(...xs)) / 2 + 22;
      const ry = (Math.max(...ys) - Math.min(...ys)) / 2 + 22;
      ctx.fillStyle = ENGINE._embClusterColors[ci] + '18';
      ctx.strokeStyle = ENGINE._embClusterColors[ci] + '40';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(mx, my, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = ENGINE._embClusterColors[ci] + '60';
      ctx.font = '10px var(--mono)'; ctx.textAlign = 'center';
      ctx.fillText(ENGINE._embClusterNames[ci], mx, my + ry + 12);
    }
  }

  // K-NN lines from selected
  if (ENGINE._embSel !== null) {
    const sel = pts[ENGINE._embSel];
    const dists = pts.map((p, i) => ({ i, d: Math.hypot(p.x - sel.x, p.y - sel.y) }))
      .filter(d => d.i !== ENGINE._embSel)
      .sort((a, b) => a.d - b.d);
    for (let i = 0; i < Math.min(k, dists.length); i++) {
      const p = pts[dists[i].i];
      ctx.strokeStyle = `rgba(255,255,255,${0.7 - i * 0.15})`;
      ctx.lineWidth = 2 - i * 0.3;
      ctx.beginPath();
      ctx.moveTo(px(sel.x), py(sel.y));
      ctx.lineTo(px(p.x), py(p.y));
      ctx.stroke();
    }
  }

  // Points
  pts.forEach((p, i) => {
    const x = px(p.x), y = py(p.y);
    const isSelected = i === ENGINE._embSel;
    const isHovered = i === ENGINE._embHover;
    const col = ENGINE._embClusterColors[p.cluster];
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, y, isSelected ? 8 : isHovered ? 6 : 5, 0, Math.PI * 2);
    ctx.fill();
    if (isSelected || isHovered) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = `bold 11px var(--mono)`;
      ctx.textAlign = 'center';
      ctx.fillText(p.label, x, y - 10);
    }
  });

  if (!c._embInit) {
    c._embInit = true;
    c.addEventListener('click', (e) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let closest = null, minD = Infinity;
      ENGINE._embPoints.forEach((p, i) => {
        const d = Math.hypot(px(p.x) - mx, py(p.y) - my);
        if (d < minD) { minD = d; closest = i; }
      });
      ENGINE._embSel = minD < 20 ? closest : null;
      ENGINE.drawEmbeddings();
    });
    c.addEventListener('mousemove', (e) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let closest = null, minD = Infinity;
      ENGINE._embPoints.forEach((p, i) => {
        const d = Math.hypot(px(p.x) - mx, py(p.y) - my);
        if (d < minD) { minD = d; closest = i; }
      });
      const newHover = minD < 20 ? closest : null;
      if (newHover !== ENGINE._embHover) { ENGINE._embHover = newHover; ENGINE.drawEmbeddings(); }
    });
    c.addEventListener('mouseleave', () => { if (ENGINE._embHover !== null) { ENGINE._embHover = null; ENGINE.drawEmbeddings(); } });
  }
};

ENGINE.teachEmbeddings = function() {
  let step = 0;
  showNarration('embeddings', step);
  const bar = document.getElementById('narrator-embeddings');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('embeddings', step); };
  });
};

/* ────────────────────────────────────────────────────────────────
   D11 — Discrete Kalman Filter (Theory · Univariate · Multivariate)
   ──────────────────────────────────────────────────────────────── */

/* Colour roles shared across the three parts */
const KAL_C = {
  truth:   'rgba(120,200,150,',   // green  — true state
  meas:    'rgba(255,150,80,',    // orange — noisy measurement
  est:     'rgba(77,208,225,',    // teal   — DKF estimate
  predict: 'rgba(150,130,255,',   // violet — predict phase
  update:  'rgba(255,150,80,',    // orange — update phase
};

/* ── 2×2 matrix helpers (row-major [a,b,c,d]) ── */
const M = {
  I:  () => [1, 0, 0, 1],
  add:(A, B) => [A[0]+B[0], A[1]+B[1], A[2]+B[2], A[3]+B[3]],
  sub:(A, B) => [A[0]-B[0], A[1]-B[1], A[2]-B[2], A[3]-B[3]],
  mul:(A, B) => [
    A[0]*B[0]+A[1]*B[2], A[0]*B[1]+A[1]*B[3],
    A[2]*B[0]+A[3]*B[2], A[2]*B[1]+A[3]*B[3],
  ],
  T:  (A) => [A[0], A[2], A[1], A[3]],
  inv:(A) => { const det = A[0]*A[3] - A[1]*A[2] || 1e-9; return [A[3]/det, -A[1]/det, -A[2]/det, A[0]/det]; },
};

/* ════ Part 1 — Theory: Kalman gain emitter line ════ */
ENGINE._kalK = 0.5;
ENGINE._kalPred = 4.2;   // prediction value (on a 0..12 line)
ENGINE._kalMeas = 9.4;   // measurement value

ENGINE.setKalGain = function(k) {
  ENGINE._kalK = Math.max(0, Math.min(1, k));
  ENGINE.drawKalGain();
};

ENGINE.drawKalGain = function() {
  const r = caSetup('kalGainCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const K = ENGINE._kalK, pred = ENGINE._kalPred, meas = ENGINE._kalMeas;
  const est = pred + K * (meas - pred);
  ctx.clearRect(0, 0, w, h);

  const ml = 40, mr = 40, lineY = h * 0.52;
  const lo = 0, hi = 12;
  const toX = (v) => ml + (v - lo) / (hi - lo) * (w - ml - mr);

  // base emitter line
  ctx.strokeStyle = 'rgba(150,150,160,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toX(lo), lineY); ctx.lineTo(toX(hi), lineY); ctx.stroke();

  // span between prediction and measurement (the "trust" interval)
  ctx.strokeStyle = 'rgba(150,150,160,0.25)';
  ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.moveTo(toX(pred), lineY); ctx.lineTo(toX(meas), lineY); ctx.stroke();
  ctx.setLineDash([]);

  const marker = (v, colBase, label, sub, up) => {
    const x = toX(v), dir = up ? -1 : 1;
    ctx.strokeStyle = colBase + '0.9)';
    ctx.fillStyle = colBase + '0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, lineY); ctx.lineTo(x, lineY + dir * 26); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, lineY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 11px var(--mono)'; ctx.textAlign = 'center';
    ctx.fillText(label, x, lineY + dir * 40);
    ctx.font = '9px var(--mono)'; ctx.fillStyle = colBase + '0.6)';
    ctx.fillText(sub, x, lineY + dir * 53);
  };

  marker(pred, KAL_C.predict, 'prediction x̂⁻', pred.toFixed(1), true);
  marker(meas, KAL_C.meas, 'measurement z', meas.toFixed(1), true);

  // estimate marker (animated position by K)
  const ex = toX(est);
  ctx.fillStyle = KAL_C.est + '1)';
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(ex, lineY, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = KAL_C.est + '1)';
  ctx.font = 'bold 12px var(--mono)'; ctx.textAlign = 'center';
  ctx.fillText('estimate x̂ = ' + est.toFixed(2), ex, lineY + 78);

  // gain readout + interpretation
  let msg;
  if (K <= 0.02) msg = 'K = 0 → trust the model completely, ignore the sensor.';
  else if (K >= 0.98) msg = 'K = 1 → trust the sensor completely, ignore the model.';
  else if (Math.abs(K - 0.5) < 0.03) msg = 'K = 0.5 → weight model and sensor equally.';
  else msg = 'K = ' + K.toFixed(2) + ' → blend ' + Math.round((1-K)*100) + '% model / ' + Math.round(K*100) + '% sensor.';
  ctx.fillStyle = 'rgba(200,200,215,0.85)';
  ctx.font = '12px var(--mono)'; ctx.textAlign = 'center';
  ctx.fillText('x̂ = x̂⁻ + K (z − x̂⁻)', w / 2, 24);
  ctx.fillStyle = KAL_C.est + '0.95)';
  ctx.font = '11px var(--mono)';
  ctx.fillText(msg, w / 2, h - 10);

  // click / drag the line to set K continuously
  if (!c._kalGainInit) {
    c._kalGainInit = true;
    const setFromX = (clientX) => {
      const rect = c.getBoundingClientRect();
      const v = lo + (clientX - rect.left - ml) / (rect.width - ml - mr) * (hi - lo);
      const k = (v - pred) / (meas - pred);
      ENGINE.setKalGain(k);
    };
    let dragging = false;
    c.addEventListener('mousedown', (e) => { dragging = true; setFromX(e.clientX); });
    c.addEventListener('mousemove', (e) => { if (dragging) setFromX(e.clientX); });
    window.addEventListener('mouseup', () => { dragging = false; });
    c.addEventListener('touchstart', (e) => { setFromX(e.touches[0].clientX); }, { passive: true });
    c.addEventListener('touchmove', (e) => { setFromX(e.touches[0].clientX); }, { passive: true });
  }
};

ENGINE.teachKalman = function() {
  let step = 0;
  showNarration('kalman', step);
  const bar = document.getElementById('narrator-kalman');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('kalman', step); };
  });
};

/* ════ Part 2 — Univariate sandbox ════ */
ENGINE._kalUni = null;   // { truth:[], noise:[], N }

ENGINE.genKalUni = function() {
  const N = 140;
  const truth = [], noise = [];
  for (let t = 0; t < N; t++) {
    // smooth true state: slow sine + a step partway through
    let v = 4 * Math.sin(t / 22) + (t > 80 ? 3 : 0) + 0.5 * Math.sin(t / 5);
    truth.push(v);
    noise.push(gaussRand(0, 1));   // unit noise, scaled by sensor std at draw time
  }
  ENGINE._kalUni = { truth, noise, N };
};

ENGINE.runKalUni = function() {
  if (!ENGINE._kalUni) ENGINE.genKalUni();
  const { truth, noise, N } = ENGINE._kalUni;
  const Q = parseFloat(document.getElementById('kalUniQ')?.value || 50) / 100;   // process noise
  const R = parseFloat(document.getElementById('kalUniR')?.value || 200) / 100;  // measurement noise (assumed)
  const sensorStd = 2.2;   // the *real* sensor std (fixed) — measurements use this

  const meas = truth.map((v, i) => v + noise[i] * sensorStd);

  // 1-D Kalman filter (random-walk model: A=1, H=1)
  let x = meas[0], P = 1;
  const est = [], Karr = [], Parr = [];
  for (let t = 0; t < N; t++) {
    // predict
    const Pm = P + Q;
    // update
    const K = Pm / (Pm + R);
    x = x + K * (meas[t] - x);
    P = (1 - K) * Pm;
    est.push(x); Karr.push(K); Parr.push(P);
  }

  ENGINE._kalUniRun = { truth, meas, est, Karr, Parr, N };
  ENGINE.drawKalUni();
};

ENGINE._kalAxes = function(ctx, w, h, m, ymin, ymax, label) {
  ctx.strokeStyle = 'rgba(150,150,160,0.25)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(m.l, m.t); ctx.lineTo(m.l, h - m.b); ctx.lineTo(w - m.r, h - m.b);
  ctx.stroke();
  ctx.fillStyle = 'rgba(150,150,160,0.6)'; ctx.font = '9px var(--mono)';
  ctx.textAlign = 'left';
  if (label) ctx.fillText(label, m.l, m.t - 4);
};

ENGINE.drawKalUni = function() {
  const run = ENGINE._kalUniRun;
  if (!run) return;
  const { truth, meas, est, N } = run;

  const r = caSetup('kalUniCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);
  const m = { l: 34, r: 14, t: 22, b: 22 };

  let ymin = Infinity, ymax = -Infinity;
  meas.forEach(v => { ymin = Math.min(ymin, v); ymax = Math.max(ymax, v); });
  ymin -= 1; ymax += 1;
  const toX = (i) => m.l + i / (N - 1) * (w - m.l - m.r);
  const toY = (v) => m.t + (1 - (v - ymin) / (ymax - ymin)) * (h - m.t - m.b);

  ENGINE._kalAxes(ctx, w, h, m, ymin, ymax, '');

  // measurements (orange dots)
  ctx.fillStyle = KAL_C.meas + '0.55)';
  meas.forEach((v, i) => { ctx.beginPath(); ctx.arc(toX(i), toY(v), 1.8, 0, Math.PI * 2); ctx.fill(); });

  // true state (green)
  ctx.strokeStyle = KAL_C.truth + '0.9)'; ctx.lineWidth = 2;
  ctx.beginPath();
  truth.forEach((v, i) => i ? ctx.lineTo(toX(i), toY(v)) : ctx.moveTo(toX(i), toY(v)));
  ctx.stroke();

  // estimate (teal)
  ctx.strokeStyle = KAL_C.est + '1)'; ctx.lineWidth = 2;
  ctx.beginPath();
  est.forEach((v, i) => i ? ctx.lineTo(toX(i), toY(v)) : ctx.moveTo(toX(i), toY(v)));
  ctx.stroke();

  // legend
  const leg = [['true state', KAL_C.truth], ['measurements', KAL_C.meas], ['DKF estimate', KAL_C.est]];
  ctx.font = '10px var(--mono)'; ctx.textAlign = 'left';
  let lx = m.l + 4;
  leg.forEach(([t, col]) => {
    ctx.fillStyle = col + '1)';
    ctx.fillRect(lx, m.t + 2, 10, 3);
    ctx.fillText(t, lx + 14, m.t + 6);
    lx += 14 + t.length * 6.2 + 16;
  });

  // sub-graphs: K(t) and P(t)
  ENGINE._kalSubPlot('kalKCanvas', run.Karr, KAL_C.est, 'Kalman gain K(t)', 0, 1);
  ENGINE._kalSubPlot('kalPCanvas', run.Parr, KAL_C.predict, 'Covariance P(t)', 0, null);
};

ENGINE._kalSubPlot = function(id, arr, colBase, label, fmin, fmax) {
  const r = caSetup(id);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);
  const m = { l: 30, r: 10, t: 18, b: 14 };
  const N = arr.length;
  let ymin = fmin != null ? fmin : Math.min(...arr);
  let ymax = fmax != null ? fmax : Math.max(...arr) * 1.05 || 1;
  if (ymax === ymin) ymax = ymin + 1;
  const toX = (i) => m.l + i / (N - 1) * (w - m.l - m.r);
  const toY = (v) => m.t + (1 - (v - ymin) / (ymax - ymin)) * (h - m.t - m.b);

  ENGINE._kalAxes(ctx, w, h, m, ymin, ymax, label);
  // y ticks
  ctx.fillStyle = 'rgba(150,150,160,0.55)'; ctx.font = '8px var(--mono)'; ctx.textAlign = 'right';
  ctx.fillText(ymax.toFixed(2), m.l - 3, m.t + 4);
  ctx.fillText(ymin.toFixed(2), m.l - 3, h - m.b);

  ctx.strokeStyle = colBase + '1)'; ctx.lineWidth = 1.8;
  ctx.beginPath();
  arr.forEach((v, i) => i ? ctx.lineTo(toX(i), toY(v)) : ctx.moveTo(toX(i), toY(v)));
  ctx.stroke();
  // fill under
  ctx.lineTo(toX(N - 1), h - m.b); ctx.lineTo(toX(0), h - m.b); ctx.closePath();
  ctx.fillStyle = colBase + '0.1)'; ctx.fill();
};

/* ════ Part 3 — Multivariate sandbox (2-state thermal) ════ */
ENGINE.runKalMulti = function() {
  const q = parseFloat(document.getElementById('kalMultiQ')?.value || 20) / 1000;
  const rr = parseFloat(document.getElementById('kalMultiR')?.value || 200) / 1000;
  const c = parseFloat(document.getElementById('kalMultiC')?.value || 15) / 100;   // thermal coupling 0..0.5

  // state transition: two coupled temperatures (core, surface)
  const A = [1 - c, c, c, 1 - c];
  const Q = [q, 0, 0, q];
  const R = [rr, 0, 0, rr];
  const H = M.I();

  // iterate Riccati recursion to steady state
  let P = M.I();
  let K = [0, 0, 0, 0];
  for (let it = 0; it < 300; it++) {
    const Pm = M.add(M.mul(M.mul(A, P), M.T(A)), Q);       // P⁻ = A P Aᵀ + Q
    const S = M.add(M.mul(M.mul(H, Pm), M.T(H)), R);       // S = H P⁻ Hᵀ + R
    K = M.mul(M.mul(Pm, M.T(H)), M.inv(S));                // K = P⁻ Hᵀ S⁻¹
    P = M.mul(M.sub(M.I(), M.mul(K, H)), Pm);             // P = (I − K H) P⁻
  }

  ENGINE._kalHeat('kalAHeat', A, 'A — state transition', ['core', 'surf'], 0, 1);
  ENGINE._kalHeat('kalKHeat', K, 'K — Kalman gain (steady state)', ['core', 'surf'], 0, 1);
};

ENGINE._kalHeat = function(id, Mx, label, names, vmin, vmax) {
  const r = caSetup(id);
  if (!r) return;
  const { ctx, w, h } = r;
  ctx.clearRect(0, 0, w, h);
  const pad = 30, top = 26;
  const cell = Math.min((w - pad - 10) / 2, (h - top - 24) / 2);
  const gx = pad, gy = top;

  ctx.fillStyle = 'rgba(200,200,215,0.85)'; ctx.font = '10px var(--mono)'; ctx.textAlign = 'left';
  ctx.fillText(label, 6, 16);

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const v = Mx[row * 2 + col];
      const t = Math.max(0, Math.min(1, (v - vmin) / (vmax - vmin || 1)));
      ctx.fillStyle = 'rgba(77,208,225,' + (0.08 + t * 0.85).toFixed(3) + ')';
      ctx.fillRect(gx + col * cell, gy + row * cell, cell - 2, cell - 2);
      ctx.fillStyle = t > 0.55 ? '#06181c' : 'rgba(220,230,235,0.95)';
      ctx.font = 'bold 13px var(--mono)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(v.toFixed(2), gx + col * cell + cell / 2 - 1, gy + row * cell + cell / 2 - 1);
      ctx.textBaseline = 'alphabetic';
    }
  }
  // labels
  ctx.fillStyle = 'rgba(150,150,160,0.7)'; ctx.font = '9px var(--mono)';
  ctx.textAlign = 'center';
  names.forEach((nm, i) => ctx.fillText(nm, gx + i * cell + cell / 2, gy - 6));
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  names.forEach((nm, i) => ctx.fillText(nm, gx - 4, gy + i * cell + cell / 2));
  ctx.textBaseline = 'alphabetic';
};

/* ────────────────────────────────────────────────────────────────
   D12 — Neural Network: Deep Dive (emitter level)
   A real, trainable 2-H-1 MLP. Forward pass + full backprop in vanilla
   JS. Click any neuron to inspect what it emits; click the boundary to
   set the input probe.
   ──────────────────────────────────────────────────────────────── */
ENGINE._nn        = null;          // { H, W1, b1, W2, b2 }
ENGINE._nnH       = 4;
ENGINE._nnAct     = 'tanh';
ENGINE._nnData    = [];
ENGINE._nnEpoch   = 0;
ENGINE._nnLoss    = 0;
ENGINE._nnTraining= false;
ENGINE._nnRAF     = null;
ENGINE._nnProbe   = [0.45, 0.45];  // the input point the diagram forward-passes
ENGINE._nnSel     = { layer: 1, idx: 0 };  // layer 1 = hidden, 2 = output
ENGINE._nnNodes   = [];            // {x,y,r,layer,idx} for click hit-testing
ENGINE._nnGrad    = null;          // last-batch |∂L/∂w| for the gradient overlay
ENGINE._nnShowGrad= false;

ENGINE._nnSig = z => 1 / (1 + Math.exp(-z));
ENGINE._nnActFns = {
  tanh:    { f: z => Math.tanh(z),          d: (a)    => 1 - a * a, label: 'tanh' },
  sigmoid: { f: z => 1 / (1 + Math.exp(-z)),d: (a)    => a * (1 - a), label: 'σ (sigmoid)' },
  relu:    { f: z => Math.max(0, z),        d: (a, z) => (z > 0 ? 1 : 0), label: 'ReLU' },
};

ENGINE._nnEl = id => document.getElementById(id);

ENGINE.genNnData = function(preset, n) {
  const data = [];
  const jit = () => (Math.random() - 0.5) * 0.08;
  for (let i = 0; i < n; i++) {
    const x1 = Math.random() * 2 - 1, x2 = Math.random() * 2 - 1;
    let y;
    if (preset === 'xor')        y = (x1 * x2 > 0) ? 1 : 0;
    else if (preset === 'linear')y = (0.8 * x1 + x2 > 0) ? 1 : 0;
    else if (preset === 'spiral') {
      const r = Math.hypot(x1, x2), th = Math.atan2(x2, x1);
      y = (Math.sin(3.2 * r * Math.PI + th) > 0) ? 1 : 0;
    } else { // circle (concentric) — the classic non-linearly-separable case
      y = (x1 * x1 + x2 * x2 < 0.5) ? 1 : 0;
    }
    data.push({ x: [x1 + jit(), x2 + jit()], y });
  }
  return data;
};

ENGINE._nnInitWeights = function() {
  const H = ENGINE._nnH;
  const r = (s) => (Math.random() * 2 - 1) * s;
  ENGINE._nn = {
    H,
    W1: Array.from({ length: H }, () => [r(1.4), r(1.4)]),
    b1: Array.from({ length: H }, () => r(0.3)),
    W2: Array.from({ length: H }, () => r(1.4)),
    b2: r(0.3),
  };
  ENGINE._nnEpoch = 0;
  ENGINE._nnLoss = 0;
  ENGINE._nnGrad = null;
};

ENGINE._nnForward = function(x) {
  const nn = ENGINE._nn, act = ENGINE._nnActFns[ENGINE._nnAct];
  const z1 = new Array(nn.H), a1 = new Array(nn.H);
  for (let h = 0; h < nn.H; h++) {
    z1[h] = nn.b1[h] + nn.W1[h][0] * x[0] + nn.W1[h][1] * x[1];
    a1[h] = act.f(z1[h]);
  }
  let z2 = nn.b2;
  for (let h = 0; h < nn.H; h++) z2 += nn.W2[h] * a1[h];
  return { a0: x, z1, a1, z2, a2: ENGINE._nnSig(z2) };
};

ENGINE.trainNnEpoch = function() {
  const nn = ENGINE._nn, act = ENGINE._nnActFns[ENGINE._nnAct], data = ENGINE._nnData;
  const lr = (parseInt(ENGINE._nnEl('nnLR')?.value || 10)) / 20;
  const H = nn.H, N = data.length;
  const gW1 = Array.from({ length: H }, () => [0, 0]);
  const gb1 = new Array(H).fill(0);
  const gW2 = new Array(H).fill(0);
  let gb2 = 0, loss = 0;
  for (const s of data) {
    const fp = ENGINE._nnForward(s.x);
    const p = Math.min(1 - 1e-7, Math.max(1e-7, fp.a2));
    loss += -(s.y * Math.log(p) + (1 - s.y) * Math.log(1 - p));
    const dz2 = fp.a2 - s.y;                 // ∂BCE/∂z2 for a sigmoid output
    gb2 += dz2;
    for (let h = 0; h < H; h++) {
      gW2[h] += dz2 * fp.a1[h];
      const da1 = dz2 * nn.W2[h];
      const dz1 = da1 * act.d(fp.a1[h], fp.z1[h]);
      gW1[h][0] += dz1 * s.x[0];
      gW1[h][1] += dz1 * s.x[1];
      gb1[h]    += dz1;
    }
  }
  nn.b2 -= lr * gb2 / N;
  for (let h = 0; h < H; h++) {
    nn.W2[h]    -= lr * gW2[h] / N;
    nn.W1[h][0] -= lr * gW1[h][0] / N;
    nn.W1[h][1] -= lr * gW1[h][1] / N;
    nn.b1[h]    -= lr * gb1[h] / N;
  }
  ENGINE._nnGrad = {
    W2: gW2.map(g => Math.abs(g / N)),
    W1: gW1.map(row => row.map(g => Math.abs(g / N))),
  };
  ENGINE._nnLoss = loss / N;
  ENGINE._nnEpoch++;
};

ENGINE._nnAccuracy = function() {
  let ok = 0;
  for (const s of ENGINE._nnData) if ((ENGINE._nnForward(s.x).a2 > 0.5 ? 1 : 0) === s.y) ok++;
  return ok / ENGINE._nnData.length;
};

ENGINE.initNn = function() {
  ENGINE._nnH   = parseInt(ENGINE._nnEl('nnHidden')?.value || 4);
  ENGINE._nnAct = ENGINE._nnEl('nnAct')?.value || 'tanh';
  const preset  = ENGINE._nnEl('nnData')?.value || 'circle';
  ENGINE._nnData = ENGINE.genNnData(preset, 130);
  ENGINE._nnInitWeights();
  ENGINE._nnProbe = [0.45, 0.45];
  if (ENGINE._nnSel.layer === 1 && ENGINE._nnSel.idx >= ENGINE._nnH) ENGINE._nnSel = { layer: 1, idx: 0 };
  ENGINE.drawNnAll();
};

ENGINE.drawNnAll = function() {
  ENGINE.drawNn();
  ENGINE.drawNnBoundary();
  ENGINE.updateNnInspector();
  ENGINE.updateNnStats();
};

ENGINE.resetNn = function() {
  if (ENGINE._nnTraining) ENGINE.toggleNnTrain();
  ENGINE._nnInitWeights();
  ENGINE.drawNnAll();
};

ENGINE.stepNn = function(n) {
  for (let i = 0; i < n; i++) ENGINE.trainNnEpoch();
  ENGINE.drawNnAll();
};

ENGINE.toggleNnTrain = function() {
  ENGINE._nnTraining = !ENGINE._nnTraining;
  const btn = ENGINE._nnEl('nnTrainBtn');
  if (btn) btn.textContent = ENGINE._nnTraining ? '⏸ Pause' : '▶ Train';
  if (ENGINE._nnTraining) ENGINE._nnLoop();
  else if (ENGINE._nnRAF) cancelAnimationFrame(ENGINE._nnRAF);
};

ENGINE._nnLoop = function() {
  if (!ENGINE._nnTraining) return;
  // Stop the loop if the user has navigated away from this activity.
  if (typeof currentTopic !== 'undefined' && currentTopic !== 'mlp-deep') {
    ENGINE._nnTraining = false;
    const btn = ENGINE._nnEl('nnTrainBtn'); if (btn) btn.textContent = '▶ Train';
    return;
  }
  for (let i = 0; i < 6; i++) ENGINE.trainNnEpoch();
  ENGINE.drawNnAll();
  ENGINE._nnRAF = requestAnimationFrame(ENGINE._nnLoop);
};

ENGINE.toggleNnGrad = function() {
  ENGINE._nnShowGrad = ENGINE._nnEl('nnGradToggle')?.checked || false;
  ENGINE.drawNn();
};

// signed activation → colour: teal for positive, orange for negative
ENGINE._nnColor = function(v, max) {
  const m = max || 1;
  const t = Math.min(1, Math.abs(v) / m);
  return v >= 0 ? `rgba(77,208,225,${0.12 + 0.78 * t})` : `rgba(255,150,80,${0.12 + 0.78 * t})`;
};

ENGINE.drawNn = function() {
  const r = caSetup('nnNetCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const nn = ENGINE._nn; if (!nn) return;
  ctx.clearRect(0, 0, w, h);

  const fp = ENGINE._nnForward(ENGINE._nnProbe);
  const H = nn.H;
  const colX = [w * 0.13, w * 0.5, w * 0.87];
  const nr = 17;
  const colY = (count, i) => {
    const top = 50, bot = h - 36, span = bot - top;
    return count === 1 ? top + span / 2 : top + span * i / (count - 1);
  };

  // node positions
  const inN  = [0, 1].map(i => ({ x: colX[0], y: colY(2, i), r: nr, layer: 0, idx: i }));
  const hidN = Array.from({ length: H }, (_, i) => ({ x: colX[1], y: colY(H, i), r: nr, layer: 1, idx: i }));
  const outN = { x: colX[2], y: colY(1, 0), r: nr, layer: 2, idx: 0 };
  ENGINE._nnNodes = [...hidN, outN]; // only weighted neurons are inspectable

  const wWidth = aw => Math.min(5, 0.4 + Math.abs(aw) * 1.8);

  // ── connections: input → hidden ──
  for (let i = 0; i < 2; i++) for (let hh = 0; hh < H; hh++) {
    const wv = nn.W1[hh][i];
    ctx.beginPath();
    ctx.moveTo(inN[i].x + nr, inN[i].y);
    ctx.lineTo(hidN[hh].x - nr, hidN[hh].y);
    ctx.strokeStyle = ENGINE._nnColor(wv, 2);
    ctx.lineWidth = wWidth(wv);
    ctx.stroke();
  }
  // ── connections: hidden → output ──
  for (let hh = 0; hh < H; hh++) {
    const wv = nn.W2[hh];
    ctx.beginPath();
    ctx.moveTo(hidN[hh].x + nr, hidN[hh].y);
    ctx.lineTo(outN.x - nr, outN.y);
    ctx.strokeStyle = ENGINE._nnColor(wv, 2);
    ctx.lineWidth = wWidth(wv);
    ctx.stroke();
  }

  // ── gradient overlay (dashed purple, width ∝ |∂L/∂w|) ──
  if (ENGINE._nnShowGrad && ENGINE._nnGrad) {
    const g = ENGINE._nnGrad;
    let gmax = 1e-6;
    g.W1.forEach(row => row.forEach(v => gmax = Math.max(gmax, v)));
    g.W2.forEach(v => gmax = Math.max(gmax, v));
    ctx.setLineDash([4, 4]);
    for (let i = 0; i < 2; i++) for (let hh = 0; hh < H; hh++) {
      const t = g.W1[hh][i] / gmax;
      ctx.beginPath();
      ctx.moveTo(hidN[hh].x - nr, hidN[hh].y);
      ctx.lineTo(inN[i].x + nr, inN[i].y);
      ctx.strokeStyle = `rgba(156,130,255,${0.25 + 0.65 * t})`;
      ctx.lineWidth = 0.5 + 3.5 * t;
      ctx.stroke();
    }
    for (let hh = 0; hh < H; hh++) {
      const t = g.W2[hh] / gmax;
      ctx.beginPath();
      ctx.moveTo(outN.x - nr, outN.y);
      ctx.lineTo(hidN[hh].x + nr, hidN[hh].y);
      ctx.strokeStyle = `rgba(156,130,255,${0.25 + 0.65 * t})`;
      ctx.lineWidth = 0.5 + 3.5 * t;
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  const sel = ENGINE._nnSel;
  const drawNode = (n, val, max, label, sub) => {
    const isSel = sel.layer === n.layer && sel.idx === n.idx;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = ENGINE._nnColor(val, max);
    ctx.fill();
    ctx.lineWidth = isSel ? 3 : 1.2;
    ctx.strokeStyle = isSel ? '#4dd0e1' : 'rgba(150,150,160,0.55)';
    ctx.stroke();
    ctx.fillStyle = 'var(--text,#eee)';
    ctx.font = '10px var(--mono,monospace)';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(val.toFixed(2), n.x, n.y);
    ctx.fillStyle = 'rgba(150,150,160,0.85)';
    ctx.font = '11px var(--mono,monospace)';
    if (label) ctx.fillText(label, n.x, n.y - n.r - 9);
    if (sub) { ctx.fillStyle = 'rgba(150,150,160,0.6)'; ctx.font = '9px var(--mono,monospace)'; ctx.fillText(sub, n.x, n.y + n.r + 11); }
  };

  inN.forEach((n, i)  => drawNode(n, ENGINE._nnProbe[i], 1, 'x' + (i + 1)));
  hidN.forEach((n, i) => drawNode(n, fp.a1[i], ENGINE._nnAct === 'relu' ? 2 : 1, 'h' + (i + 1)));
  drawNode(outN, fp.a2, 1, 'ŷ', fp.a2 > 0.5 ? 'class 1' : 'class 0');

  // column captions
  ctx.fillStyle = 'rgba(150,150,160,0.55)';
  ctx.font = '10px var(--mono,monospace)';
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText('INPUT', colX[0], 26);
  ctx.fillText(`HIDDEN · ${ENGINE._nnActFns[ENGINE._nnAct].label}`, colX[1], 26);
  ctx.fillText('OUTPUT · σ', colX[2], 26);
  ctx.fillStyle = 'rgba(150,150,160,0.5)';
  ctx.fillText('teal +w · orange −w · click a neuron', w / 2, h - 8);

  if (!c._nnInit) {
    c._nnInit = true;
    c.addEventListener('click', (e) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      for (const n of ENGINE._nnNodes) {
        if (Math.hypot(mx - n.x, my - n.y) <= n.r + 4) {
          ENGINE._nnSel = { layer: n.layer, idx: n.idx };
          ENGINE.drawNn(); ENGINE.updateNnInspector();
          break;
        }
      }
    });
  }
};

ENGINE.drawNnBoundary = function() {
  const r = caSetup('nnBoundaryCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  if (!ENGINE._nn) return;
  ctx.clearRect(0, 0, w, h);

  const res = 40;
  const cw = w / res, ch = h / res;
  const toData = (px, py) => [(px / w) * 2 - 1, (py / h) * 2 - 1];
  for (let i = 0; i < res; i++) for (let j = 0; j < res; j++) {
    const [dx, dy] = toData((i + 0.5) * cw, (j + 0.5) * ch);
    const p = ENGINE._nnForward([dx, dy]).a2;
    // orange (class 0) ↔ teal (class 1)
    const tealR = 77, tealG = 208, tealB = 225, orR = 255, orG = 150, orB = 80;
    const R = Math.round(orR + (tealR - orR) * p);
    const G = Math.round(orG + (tealG - orG) * p);
    const B = Math.round(orB + (tealB - orB) * p);
    ctx.fillStyle = `rgba(${R},${G},${B},0.42)`;
    ctx.fillRect(i * cw, j * ch, cw + 1, ch + 1);
  }
  // data points
  for (const s of ENGINE._nnData) {
    const px = (s.x[0] + 1) / 2 * w, py = (s.x[1] + 1) / 2 * h;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = s.y === 1 ? 'rgba(77,208,225,0.95)' : 'rgba(255,150,80,0.95)';
    ctx.fill();
    ctx.lineWidth = 0.6; ctx.strokeStyle = 'rgba(20,18,16,0.6)'; ctx.stroke();
  }
  // probe point
  const ppx = (ENGINE._nnProbe[0] + 1) / 2 * w, ppy = (ENGINE._nnProbe[1] + 1) / 2 * h;
  ctx.beginPath(); ctx.arc(ppx, ppy, 7, 0, Math.PI * 2);
  ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff'; ctx.stroke();
  ctx.beginPath(); ctx.arc(ppx, ppy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();

  if (!c._nnbInit) {
    c._nnbInit = true;
    const setProbe = (e) => {
      const rect = c.getBoundingClientRect();
      const px = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const py = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      ENGINE._nnProbe = [
        Math.max(-1, Math.min(1, (px / rect.width) * 2 - 1)),
        Math.max(-1, Math.min(1, (py / rect.height) * 2 - 1)),
      ];
      ENGINE.drawNn(); ENGINE.drawNnBoundary(); ENGINE.updateNnInspector();
    };
    c.addEventListener('click', setProbe);
    c.addEventListener('touchstart', (e) => { e.preventDefault(); setProbe(e); }, { passive: false });
  }
};

ENGINE.updateNnStats = function() {
  const ep = ENGINE._nnEl('nnEpoch'), ls = ENGINE._nnEl('nnLossV'), ac = ENGINE._nnEl('nnAcc');
  if (ep) ep.textContent = ENGINE._nnEpoch;
  if (ls) ls.textContent = ENGINE._nnLoss.toFixed(4);
  if (ac) ac.textContent = (ENGINE._nnAccuracy() * 100).toFixed(1) + '%';
};

ENGINE.updateNnInspector = function() {
  const box = ENGINE._nnEl('nnInspector');
  if (!box || !ENGINE._nn) return;
  const nn = ENGINE._nn, act = ENGINE._nnActFns[ENGINE._nnAct];
  const fp = ENGINE._nnForward(ENGINE._nnProbe);
  const sel = ENGINE._nnSel;
  const fmt = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(3);
  const wbar = (v) => {
    const t = Math.min(1, Math.abs(v) / 2);
    const col = v >= 0 ? '#4dd0e1' : '#ff9650';
    return `<span style="display:inline-block;width:${Math.round(t * 70)}px;height:8px;background:${col};border-radius:2px;vertical-align:middle;"></span>`;
  };

  let html = '', zParts, z, a, emit;
  if (sel.layer === 2) {
    const ins = fp.a1;
    zParts = ins.map((ai, h) => `<tr><td>h${h + 1}</td><td>${ai.toFixed(3)}</td><td>${fmt(nn.W2[h])}</td><td>${wbar(nn.W2[h])}</td><td>${(ai * nn.W2[h]).toFixed(3)}</td></tr>`).join('');
    z = fp.z2; a = fp.a2; emit = a;
    html = `<div class="nn-insp-title">Output neuron <em>ŷ</em></div>
      <table class="nn-insp-tbl"><thead><tr><th>from</th><th>aᵢ</th><th>wᵢ</th><th></th><th>wᵢ·aᵢ</th></tr></thead><tbody>${zParts}</tbody></table>
      <div class="exp-formula" style="border-left-color:#4dd0e1;">z = Σ wᵢ·aᵢ + b = <strong>${z.toFixed(3)}</strong> &nbsp;(b = ${fmt(nn.b2)})</div>
      <div class="exp-formula" style="border-left-color:#4dd0e1;">ŷ = σ(z) = <strong>${a.toFixed(3)}</strong> → predicts <strong>class ${a > 0.5 ? 1 : 0}</strong></div>`;
  } else {
    const h = Math.min(sel.idx, nn.H - 1);
    const ins = ENGINE._nnProbe;
    zParts = [0, 1].map(i => `<tr><td>x${i + 1}</td><td>${ins[i].toFixed(3)}</td><td>${fmt(nn.W1[h][i])}</td><td>${wbar(nn.W1[h][i])}</td><td>${(ins[i] * nn.W1[h][i]).toFixed(3)}</td></tr>`).join('');
    z = fp.z1[h]; a = fp.a1[h]; emit = a;
    html = `<div class="nn-insp-title">Hidden neuron <em>h${h + 1}</em></div>
      <table class="nn-insp-tbl"><thead><tr><th>from</th><th>xᵢ</th><th>wᵢ</th><th></th><th>wᵢ·xᵢ</th></tr></thead><tbody>${zParts}</tbody></table>
      <div class="exp-formula" style="border-left-color:#4dd0e1;">z = Σ wᵢ·xᵢ + b = <strong>${z.toFixed(3)}</strong> &nbsp;(b = ${fmt(nn.b1[h])})</div>
      <div class="exp-formula" style="border-left-color:#4dd0e1;">a = ${act.label}(z) = <strong>${a.toFixed(3)}</strong></div>`;
  }
  html += `<div class="nn-emit">▶ this neuron <strong>emits ${emit.toFixed(3)}</strong> downstream</div>
    <canvas id="nnActCanvas" height="120" style="width:100%;margin-top:10px;"></canvas>`;
  box.innerHTML = html;
  ENGINE.drawNnActCurve(z, a);
};

ENGINE.drawNnActCurve = function(z0, a0) {
  const r = caSetup('nnActCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const act = ENGINE._nnActFns[ENGINE._nnAct];
  const isOut = ENGINE._nnSel.layer === 2;
  const fn = isOut ? ENGINE._nnSig : act.f;
  const label = isOut ? 'σ (sigmoid)' : act.label;
  ctx.clearRect(0, 0, w, h);
  const m = { l: 28, r: 10, t: 14, b: 18 };
  const pw = w - m.l - m.r, ph = h - m.t - m.b;
  const zMin = -6, zMax = 6;
  // y-range: relu unbounded → clamp to view of operating point
  const yMin = (act === ENGINE._nnActFns.relu && !isOut) ? 0 : (isOut ? 0 : -1.1);
  const yMax = (act === ENGINE._nnActFns.relu && !isOut) ? Math.max(2, Math.abs(a0) * 1.2 + 0.5) : 1.1;
  const toX = z => m.l + (z - zMin) / (zMax - zMin) * pw;
  const toY = v => m.t + ph - (v - yMin) / (yMax - yMin) * ph;
  // axes
  ctx.strokeStyle = 'rgba(150,150,160,0.25)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(m.l, toY(0)); ctx.lineTo(m.l + pw, toY(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(0), m.t); ctx.lineTo(toX(0), m.t + ph); ctx.stroke();
  // curve
  ctx.beginPath();
  for (let i = 0; i <= 120; i++) {
    const z = zMin + (zMax - zMin) * i / 120;
    const v = Math.max(yMin, Math.min(yMax, fn(z)));
    i === 0 ? ctx.moveTo(toX(z), toY(v)) : ctx.lineTo(toX(z), toY(v));
  }
  ctx.strokeStyle = '#4dd0e1'; ctx.lineWidth = 2; ctx.stroke();
  // operating point
  const zc = Math.max(zMin, Math.min(zMax, z0));
  ctx.beginPath(); ctx.moveTo(toX(zc), m.t); ctx.lineTo(toX(zc), m.t + ph);
  ctx.strokeStyle = 'rgba(255,150,80,0.45)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.arc(toX(zc), toY(Math.max(yMin, Math.min(yMax, a0))), 4, 0, Math.PI * 2);
  ctx.fillStyle = '#ff9650'; ctx.fill();
  ctx.fillStyle = 'rgba(150,150,160,0.7)'; ctx.font = '9px var(--mono,monospace)';
  ctx.textAlign = 'left'; ctx.fillText(label, m.l + 2, m.t + 8);
  ctx.textAlign = 'center'; ctx.fillText('z', m.l + pw, toY(0) + 14);
};

ENGINE.teachNn = function() {
  let step = 0;
  showNarration('mlp-deep', step);
  const bar = document.getElementById('narrator-mlp-deep');
  if (!bar) return;
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => {
    d.onclick = () => { step = i; showNarration('mlp-deep', step); };
  });
};

/* ════════════════════════════════════════════════════════════════
   DRAWS dispatch — called 60ms after show(id)
   ════════════════════════════════════════════════════════════════ */
const DRAWS = {
  'cnn-filter':    () => { ENGINE.initCnn(); ENGINE.renderCnn(); },
  'self-attention':() => ENGINE.drawAttention(),
  'autoencoder':   () => { ENGINE.initAutoencoder(); ENGINE.runAutoencoder(); },
  'vae':           () => { ENGINE.drawVaeLatent(); },
  'unet':          () => { ENGINE._unetFrame = 0; ENGINE.drawUnetFrame(); },
  'seq2seq':       () => ENGINE.drawS2S(),
  'gan':           () => { ENGINE._ganSteps === 0 ? ENGINE.resetGan() : ENGINE.drawGan(); },
  'diffusion':     () => { if (!ENGINE._diffPoints) ENGINE.resetDiffusion(); else ENGINE.drawDiffusion(); },
  'residual':      () => ENGINE.drawResidual(),
  'embeddings':    () => ENGINE.drawEmbeddings(),
  'kalman':        () => { ENGINE.drawKalGain(); ENGINE.runKalUni(); ENGINE.runKalMulti(); },
  'mlp-deep':      () => { if (!ENGINE._nn) ENGINE.initNn(); else ENGINE.drawNnAll(); },
};

window.addEventListener('resize', () => {
  if (typeof currentTopic !== 'undefined' && currentTopic && DRAWS[currentTopic]) DRAWS[currentTopic]();
});
