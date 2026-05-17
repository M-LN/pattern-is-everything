/* ═══════════════════════════════════════════════════════════════
   Chaos Lab — Engines
   Canvas drawing functions for all 6 activities
   ═══════════════════════════════════════════════════════════════ */

const CA = '#ff8a65';
const CA25 = 'rgba(255,138,101,.25)';
const CA10 = 'rgba(255,138,101,.10)';
const CA60 = 'rgba(255,138,101,.60)';

function caSetup(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width = Math.round(rect.width * dpr);
  c.height = Math.round(rect.height * dpr);
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  return { c, ctx, w: rect.width, h: rect.height };
}

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function bgColor() {
  return isDark() ? '#141420' : '#f8f6ff';
}

function fgColor() {
  return isDark() ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)';
}

/* ── Detect period in a logistic map series ── */
function detectPeriod(series) {
  const tail = series.slice(-64);
  for (const p of [1, 2, 4, 8]) {
    let ok = true;
    for (let i = 0; i < 16; i++) {
      if (Math.abs(tail[tail.length - 1 - i] - tail[tail.length - 1 - i - p]) > 0.01) { ok = false; break; }
    }
    if (ok) return p;
  }
  return 0; // chaos
}

/* ═══════════════════════════════════════════════════════════════
   ENGINE — all interactive functions
   ═══════════════════════════════════════════════════════════════ */
const ENGINE = {};

/* ── C1: Logistic Map ─────────────────────────────────────────── */
ENGINE.drawLogisticMap = function() {
  const s = caSetup('lmCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const r = parseFloat(document.getElementById('lmR')?.value || 2.8);
  const x0 = parseFloat(document.getElementById('lmX0')?.value || 0.5);
  const steps = 80;

  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  /* generate series */
  const series = [x0];
  let x = x0;
  for (let i = 0; i < steps; i++) { x = r * x * (1 - x); series.push(x); }

  const pad = { l: 36, r: 16, t: 32, b: 24 };
  const aw = w - pad.l - pad.r;
  const ah = h - pad.t - pad.b;

  /* grid */
  ctx.strokeStyle = fgColor();
  ctx.lineWidth = 0.5;
  for (let v of [0, 0.25, 0.5, 0.75, 1]) {
    const py = pad.t + (1 - v) * ah;
    ctx.beginPath(); ctx.moveTo(pad.l, py); ctx.lineTo(w - pad.r, py); ctx.stroke();
    ctx.fillStyle = 'var(--muted)';
    ctx.font = '9px IBM Plex Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(v.toFixed(2), pad.l - 4, py + 3);
  }

  /* series line */
  ctx.beginPath();
  series.forEach((v, i) => {
    const px = pad.l + (i / steps) * aw;
    const py = pad.t + (1 - v) * ah;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.strokeStyle = CA60;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  /* dots */
  series.forEach((v, i) => {
    const px = pad.l + (i / steps) * aw;
    const py = pad.t + (1 - v) * ah;
    ctx.beginPath();
    ctx.arc(px, py, i === 0 ? 4 : 2, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? 'var(--text)' : CA;
    ctx.fill();
  });

  /* period annotation */
  const period = detectPeriod(series);
  const label = period === 0 ? 'Chaos' : period === 1 ? 'Fixed point (period 1)' : `Period ${period}`;
  ctx.font = '11px IBM Plex Mono, monospace';
  ctx.fillStyle = period === 0 ? '#ef5350' : CA;
  ctx.textAlign = 'left';
  ctx.fillText(label, pad.l + 4, pad.t - 8);
};

ENGINE.teachLogisticMap = function() {
  hideNarration('logistic-map');
  const setR = (v) => {
    const sl = document.getElementById('lmR');
    if (sl) { sl.value = v; document.getElementById('lmRV').textContent = v.toFixed(2); }
    ENGINE.drawLogisticMap();
  };
  setR(2.8); showNarration('logistic-map', 0);
  setTimeout(() => { setR(2.8); showNarration('logistic-map', 1); }, 2500);
  setTimeout(() => { setR(3.2); showNarration('logistic-map', 2); }, 5000);
  setTimeout(() => { setR(3.5); showNarration('logistic-map', 3); }, 7500);
  setTimeout(() => { setR(3.9); showNarration('logistic-map', 4); }, 10000);
};

/* ── C2: Butterfly Effect ─────────────────────────────────────── */
ENGINE.drawButterflyEffect = function() {
  const s = caSetup('beCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const r = parseFloat(document.getElementById('beR')?.value || 3.9);
  const eps = parseFloat(document.getElementById('beEps')?.value || 0.001);
  const steps = 100;
  const x0 = 0.5;

  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  /* generate two series */
  const s1 = [x0], s2 = [x0 + eps];
  let a = x0, b = x0 + eps;
  for (let i = 0; i < steps; i++) {
    a = r * a * (1 - a); s1.push(a);
    b = r * b * (1 - b); s2.push(b);
  }

  const splitH = Math.round(h * 0.62);
  const pad = { l: 36, r: 16, t: 28, b: 8 };
  const aw = w - pad.l - pad.r;

  /* === upper panel: trajectories === */
  const ah1 = splitH - pad.t - 16;

  ctx.strokeStyle = fgColor();
  ctx.lineWidth = 0.5;
  for (const v of [0, 0.5, 1]) {
    const py = pad.t + (1 - v) * ah1;
    ctx.beginPath(); ctx.moveTo(pad.l, py); ctx.lineTo(w - pad.r, py); ctx.stroke();
    ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)';
    ctx.textAlign = 'right'; ctx.fillText(v.toFixed(1), pad.l - 4, py + 3);
  }

  const drawSeries = (series, color, alpha) => {
    ctx.beginPath();
    series.forEach((v, i) => {
      const px = pad.l + (i / steps) * aw;
      const py = pad.t + (1 - Math.max(0, Math.min(1, v))) * ah1;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1;
  };
  drawSeries(s1, CA, 0.9);
  drawSeries(s2, isDark() ? '#90caf9' : '#1565c0', 0.7);

  /* legend */
  ctx.font = '9px IBM Plex Mono, monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = CA; ctx.fillText('x₀ = ' + x0.toFixed(3), pad.l + 4, pad.t + 12);
  ctx.fillStyle = isDark() ? '#90caf9' : '#1565c0';
  ctx.fillText('x₀ + ε = ' + (x0 + eps).toFixed(6), pad.l + 80, pad.t + 12);

  /* === lower panel: divergence |s1 - s2| === */
  const ph2 = h - splitH;
  const pad2t = splitH + 24;
  const ah2 = h - pad2t - 12;

  ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)';
  ctx.textAlign = 'left'; ctx.fillText('|divergence|', pad.l + 4, splitH + 14);

  const diffs = s1.map((v, i) => Math.abs(v - s2[i]));
  const maxD = Math.max(...diffs, 1e-10);

  ctx.strokeStyle = fgColor(); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad2t); ctx.lineTo(w - pad.r, pad2t); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad.l, pad2t + ah2); ctx.lineTo(w - pad.r, pad2t + ah2); ctx.stroke();

  ctx.beginPath();
  diffs.forEach((d, i) => {
    const px = pad.l + (i / steps) * aw;
    const py = pad2t + ah2 - (Math.log10(d + 1e-12) - Math.log10(1e-12)) /
               (Math.log10(2) - Math.log10(1e-12)) * ah2;
    const pyClamped = Math.max(pad2t, Math.min(pad2t + ah2, py));
    if (i === 0) ctx.moveTo(px, pyClamped); else ctx.lineTo(px, pyClamped);
  });
  ctx.strokeStyle = '#ef9a9a'; ctx.lineWidth = 1.2; ctx.stroke();

  ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)'; ctx.textAlign = 'right';
  ctx.fillText('log scale', w - pad.r - 2, pad2t + 10);
};

ENGINE.teachButterflyEffect = function() {
  hideNarration('butterfly-effect');
  showNarration('butterfly-effect', 0);
  setTimeout(() => showNarration('butterfly-effect', 1), 2500);
  setTimeout(() => showNarration('butterfly-effect', 2), 5500);
  setTimeout(() => showNarration('butterfly-effect', 3), 8500);
  setTimeout(() => showNarration('butterfly-effect', 4), 11500);
};

/* ── C3: Bifurcation Diagram ──────────────────────────────────── */
ENGINE._bifRendered = false;

ENGINE.renderBifurcation = function() {
  const s = caSetup('bifCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  ENGINE._bifW = w; ENGINE._bifH = h;

  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  const rMin = 2.5, rMax = 4.0;
  const skip = 300, keep = 200;
  const cols = Math.round(w);

  for (let i = 0; i < cols; i++) {
    const r = rMin + (rMax - rMin) * i / cols;
    let x = 0.5;
    for (let j = 0; j < skip; j++) x = r * x * (1 - x);
    for (let j = 0; j < keep; j++) {
      x = r * x * (1 - x);
      const py = Math.round(h - x * h);
      ctx.fillStyle = CA;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(i, Math.max(0, Math.min(h - 1, py)), 1, 1);
    }
  }
  ctx.globalAlpha = 1;

  /* axis labels */
  ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)';
  ctx.textAlign = 'left'; ctx.fillText('r = 2.5', 4, h - 4);
  ctx.textAlign = 'right'; ctx.fillText('r = 4.0', w - 4, h - 4);
  ctx.textAlign = 'left'; ctx.fillText('x = 1.0', 4, 12);
  ctx.fillText('x = 0', 4, h - 14);

  ENGINE._bifRendered = true;

  /* hover listener — add once */
  const canvas = document.getElementById('bifCanvas');
  if (canvas && !canvas._bifHover) {
    canvas._bifHover = true;
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const r = 2.5 + (cx / rect.width) * 1.5;
      const x = 1 - (cy / rect.height);
      const info = document.getElementById('bifInfo');
      if (info) info.textContent = `r = ${r.toFixed(4)}  |  x = ${x.toFixed(4)}`;
    });
  }
};

ENGINE.teachBifurcation = function() {
  hideNarration('bifurcation');
  if (!ENGINE._bifRendered) ENGINE.renderBifurcation();
  showNarration('bifurcation', 0);
  setTimeout(() => showNarration('bifurcation', 1), 2500);
  setTimeout(() => showNarration('bifurcation', 2), 5000);
  setTimeout(() => showNarration('bifurcation', 3), 8000);
  setTimeout(() => showNarration('bifurcation', 4), 11500);
};

/* ── C4: Lorenz Attractor ─────────────────────────────────────── */
ENGINE._lorenzState = null;
ENGINE._lorenzFrame = null;
ENGINE._lorenzRunning = false;
ENGINE._lorenzPoints = [];

ENGINE.restartLorenz = function() {
  if (ENGINE._lorenzFrame) { cancelAnimationFrame(ENGINE._lorenzFrame); ENGINE._lorenzFrame = null; }
  ENGINE._lorenzPoints = [];
  ENGINE._lorenzState = { x: 0.1, y: 0, z: 0 };
  ENGINE._lorenzRunning = true;
  const btn = document.getElementById('lorPlayBtn');
  if (btn) btn.textContent = '⏸ Pause';
  ENGINE._lorenzAnimate();
};

ENGINE.toggleLorenz = function() {
  ENGINE._lorenzRunning = !ENGINE._lorenzRunning;
  const btn = document.getElementById('lorPlayBtn');
  if (btn) btn.textContent = ENGINE._lorenzRunning ? '⏸ Pause' : '▶ Play';
  if (ENGINE._lorenzRunning) ENGINE._lorenzAnimate();
};

ENGINE._lorenzAnimate = function() {
  if (!ENGINE._lorenzRunning) return;
  const speed = parseInt(document.getElementById('lorSpeed')?.value || 3);
  const s = caSetup('lorenzCanvas');
  if (!s) { ENGINE._lorenzRunning = false; return; }
  const { ctx, w, h } = s;

  const sigma = 10, beta = 8 / 3;
  const rho = parseFloat(document.getElementById('lorRho')?.value || 28);
  const dt = 0.005;

  /* integrate `speed * 5` steps per frame */
  const st = ENGINE._lorenzState;
  for (let k = 0; k < speed * 5; k++) {
    /* RK4 */
    const { x, y, z } = st;
    const k1x = sigma * (y - x),        k1y = x * (rho - z) - y, k1z = x * y - beta * z;
    const hx = x + k1x*dt/2, hy = y + k1y*dt/2, hz = z + k1z*dt/2;
    const k2x = sigma*(hy-hx),           k2y = hx*(rho-hz)-hy,    k2z = hx*hy-beta*hz;
    const hx2 = x+k2x*dt/2, hy2 = y+k2y*dt/2, hz2 = z+k2z*dt/2;
    const k3x = sigma*(hy2-hx2),         k3y = hx2*(rho-hz2)-hy2, k3z = hx2*hy2-beta*hz2;
    const fx = x+k3x*dt, fy = y+k3y*dt, fz = z+k3z*dt;
    const k4x = sigma*(fy-fx),           k4y = fx*(rho-fz)-fy,    k4z = fx*fy-beta*fz;

    st.x += (k1x + 2*k2x + 2*k3x + k4x) * dt / 6;
    st.y += (k1y + 2*k2y + 2*k3y + k4y) * dt / 6;
    st.z += (k1z + 2*k2z + 2*k3z + k4z) * dt / 6;

    ENGINE._lorenzPoints.push({ x: st.x, z: st.z });
    if (ENGINE._lorenzPoints.length > 6000) ENGINE._lorenzPoints.shift();
  }

  /* draw */
  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  const pts = ENGINE._lorenzPoints;
  if (pts.length < 2) { ENGINE._lorenzFrame = requestAnimationFrame(ENGINE._lorenzAnimate); return; }

  /* find bounds */
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const p of pts) { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; if (p.z < minZ) minZ = p.z; if (p.z > maxZ) maxZ = p.z; }
  const scaleX = (w - 40) / Math.max(maxX - minX, 1);
  const scaleZ = (h - 40) / Math.max(maxZ - minZ, 1);
  const scale = Math.min(scaleX, scaleZ);
  const offX = w / 2 - (minX + maxX) / 2 * scale;
  const offZ = h / 2 + (minZ + maxZ) / 2 * scale;

  const toScreen = p => ({ sx: offX + p.x * scale, sy: offZ - p.z * scale });

  /* draw trail with fade */
  const total = pts.length;
  ctx.lineWidth = 1.0;
  for (let i = 1; i < total; i++) {
    const age = i / total;
    const a = (age * 0.7 + 0.05);
    const { sx: x1, sy: y1 } = toScreen(pts[i - 1]);
    const { sx: x2, sy: y2 } = toScreen(pts[i]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(255,138,101,${a.toFixed(2)})`;
    ctx.stroke();
  }

  /* label */
  ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)';
  ctx.textAlign = 'left'; ctx.fillText('Lorenz attractor — XZ projection', 8, 14);
  ctx.textAlign = 'right'; ctx.fillText(`ρ = ${rho}`, w - 8, 14);

  ENGINE._lorenzFrame = requestAnimationFrame(ENGINE._lorenzAnimate);
};

ENGINE.teachLorenz = function() {
  hideNarration('lorenz-attractor');
  showNarration('lorenz-attractor', 0);
  setTimeout(() => showNarration('lorenz-attractor', 1), 3000);
  setTimeout(() => showNarration('lorenz-attractor', 2), 6000);
  setTimeout(() => showNarration('lorenz-attractor', 3), 9000);
  setTimeout(() => showNarration('lorenz-attractor', 4), 12000);
};

/* ── C5: Wolfram's Rules ──────────────────────────────────────── */
ENGINE.setRule = function(n) {
  const sl = document.getElementById('wolRule');
  if (sl) { sl.value = n; document.getElementById('wolRuleV').textContent = n; }
  ENGINE.drawWolfram();
};

ENGINE.drawWolfram = function() {
  const s = caSetup('wolframCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const rule = parseInt(document.getElementById('wolRule')?.value || 90);

  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  const cellSize = 4;
  const cols = Math.floor(w / cellSize);
  const rows = Math.floor(h / cellSize);

  let row = new Array(cols).fill(0);
  row[Math.floor(cols / 2)] = 1;

  for (let r = 0; r < rows; r++) {
    /* draw */
    for (let c = 0; c < cols; c++) {
      if (row[c]) {
        ctx.fillStyle = CA;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
      }
    }
    /* next generation */
    const next = new Array(cols).fill(0);
    for (let c = 0; c < cols; c++) {
      const l = row[(c - 1 + cols) % cols];
      const m = row[c];
      const ri = row[(c + 1) % cols];
      const pattern = (l << 2) | (m << 1) | ri;
      next[c] = (rule >> pattern) & 1;
    }
    row = next;
  }

  /* rule binary display */
  ctx.font = '9px IBM Plex Mono, monospace'; ctx.fillStyle = 'var(--muted)';
  ctx.textAlign = 'left';
  ctx.fillText(`Rule ${rule} — binary: ${rule.toString(2).padStart(8, '0')}`, 4, h - 4);
};

ENGINE.teachWolfram = function() {
  hideNarration('wolfram-rules');
  showNarration('wolfram-rules', 0);
  setTimeout(() => { ENGINE.setRule(90); showNarration('wolfram-rules', 1); }, 2500);
  setTimeout(() => { showNarration('wolfram-rules', 2); }, 5000);
  setTimeout(() => { ENGINE.setRule(30); showNarration('wolfram-rules', 3); }, 7500);
  setTimeout(() => { ENGINE.setRule(110); showNarration('wolfram-rules', 4); }, 10500);
};

/* ── C6: Conway's Game of Life ────────────────────────────────── */
const GOL = {
  rows: 60, cols: 80,
  grid: null,
  running: false,
  gen: 0,
  timer: null,
  painting: false,
  paintVal: 1,
};

function golGrid() {
  return Array.from({ length: GOL.rows }, () => new Int8Array(GOL.cols));
}

ENGINE.golInit = function() {
  GOL.grid = golGrid();
  GOL.gen = 0;
  ENGINE.golDraw();
  const g = document.getElementById('golGen'); if (g) g.textContent = 0;
  const p = document.getElementById('golPop'); if (p) p.textContent = 0;
};

ENGINE.golDraw = function() {
  const s = caSetup('golCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const cw = w / GOL.cols, ch = h / GOL.rows;

  ctx.fillStyle = bgColor();
  ctx.fillRect(0, 0, w, h);

  /* grid lines */
  ctx.strokeStyle = fgColor();
  ctx.lineWidth = 0.3;
  for (let c = 0; c <= GOL.cols; c++) {
    ctx.beginPath(); ctx.moveTo(c * cw, 0); ctx.lineTo(c * cw, h); ctx.stroke();
  }
  for (let r = 0; r <= GOL.rows; r++) {
    ctx.beginPath(); ctx.moveTo(0, r * ch); ctx.lineTo(w, r * ch); ctx.stroke();
  }

  /* cells */
  let pop = 0;
  for (let r = 0; r < GOL.rows; r++) {
    for (let c = 0; c < GOL.cols; c++) {
      if (GOL.grid[r][c]) {
        pop++;
        ctx.fillStyle = CA;
        ctx.fillRect(c * cw + 0.5, r * ch + 0.5, cw - 1, ch - 1);
      }
    }
  }
  const p = document.getElementById('golPop'); if (p) p.textContent = pop;
};

ENGINE.golCountNeighbors = function(r, c) {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++)
      if (dr || dc) n += GOL.grid[(r + dr + GOL.rows) % GOL.rows][(c + dc + GOL.cols) % GOL.cols];
  return n;
};

ENGINE.golStep = function() {
  const next = golGrid();
  for (let r = 0; r < GOL.rows; r++)
    for (let c = 0; c < GOL.cols; c++) {
      const n = ENGINE.golCountNeighbors(r, c);
      next[r][c] = GOL.grid[r][c] ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
    }
  GOL.grid = next;
  GOL.gen++;
  const g = document.getElementById('golGen'); if (g) g.textContent = GOL.gen;
  ENGINE.golDraw();
};

ENGINE.golToggle = function() {
  GOL.running = !GOL.running;
  const btn = document.getElementById('golRunBtn');
  if (btn) btn.textContent = GOL.running ? '⏸ Pause' : '▶ Run';
  if (GOL.running) ENGINE._golLoop();
  else if (GOL.timer) { clearTimeout(GOL.timer); GOL.timer = null; }
};

ENGINE._golLoop = function() {
  if (!GOL.running) return;
  ENGINE.golStep();
  const fps = parseInt(document.getElementById('golSpeed')?.value || 6);
  GOL.timer = setTimeout(ENGINE._golLoop, Math.round(1000 / fps));
};

ENGINE.golClear = function() {
  if (GOL.running) ENGINE.golToggle();
  ENGINE.golInit();
};

ENGINE.golPreset = function(name) {
  ENGINE.golClear();
  const cx = Math.floor(GOL.cols / 2), cy = Math.floor(GOL.rows / 2);

  const set = (cells) => cells.forEach(([r, c]) => {
    if (r >= 0 && r < GOL.rows && c >= 0 && c < GOL.cols) GOL.grid[r][c] = 1;
  });

  if (name === 'glider') {
    set([[cy-1, cx], [cy, cx+1], [cy+1, cx-1], [cy+1, cx], [cy+1, cx+1]]);
  } else if (name === 'blinker') {
    set([[cy, cx-1], [cy, cx], [cy, cx+1]]);
  } else if (name === 'pulsar') {
    const d = [2,3,4,8,9,10];
    for (const o of d) {
      set([[cy-6, cx+o], [cy-6, cx-o], [cy+6, cx+o], [cy+6, cx-o],
           [cy+o, cx-6], [cy-o, cx-6], [cy+o, cx+6], [cy-o, cx+6]]);
    }
    const e = [1,5];
    for (const o of e) {
      const pd = [2,3,4,8,9,10];
      for (const q of pd) {
        set([[cy-o, cx+q], [cy-o, cx-q], [cy+o, cx+q], [cy+o, cx-q],
             [cy+q, cx-o], [cy-q, cx-o], [cy+q, cx+o], [cy-q, cx+o]]);
      }
    }
  } else if (name === 'rpentomino') {
    set([[cy-1, cx], [cy-1, cx+1], [cy, cx-1], [cy, cx], [cy+1, cx]]);
  } else if (name === 'glidergun') {
    /* Gosper Glider Gun */
    const g = [
      [5,1],[5,2],[6,1],[6,2],
      [5,11],[6,11],[7,11],[4,12],[8,12],[3,13],[9,13],[3,14],[9,14],
      [6,15],[4,16],[8,16],[5,17],[6,17],[7,17],[6,18],
      [3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],
      [1,25],[2,25],[6,25],[7,25],
      [3,35],[4,35],[3,36],[4,36]
    ];
    const or = cy - 18, oc = 2;
    g.forEach(([r, c]) => {
      const rr = or + r, cc = oc + c;
      if (rr >= 0 && rr < GOL.rows && cc >= 0 && cc < GOL.cols) GOL.grid[rr][cc] = 1;
    });
  } else if (name === 'random') {
    for (let r = 0; r < GOL.rows; r++)
      for (let c = 0; c < GOL.cols; c++)
        GOL.grid[r][c] = Math.random() < 0.3 ? 1 : 0;
  }

  GOL.gen = 0;
  const g = document.getElementById('golGen'); if (g) g.textContent = 0;
  ENGINE.golDraw();
};

ENGINE.teachGameOfLife = function() {
  hideNarration('game-of-life');
  ENGINE.golPreset('blinker');
  showNarration('game-of-life', 0);
  setTimeout(() => { showNarration('game-of-life', 1); }, 3000);
  setTimeout(() => { showNarration('game-of-life', 2); }, 6000);
  setTimeout(() => {
    ENGINE.golClear();
    ENGINE.golPreset('glider');
    if (!GOL.running) ENGINE.golToggle();
    showNarration('game-of-life', 3);
  }, 9000);
  setTimeout(() => {
    if (GOL.running) ENGINE.golToggle();
    ENGINE.golClear();
    ENGINE.golPreset('rpentomino');
    showNarration('game-of-life', 4);
  }, 13000);
};

/* ── Canvas mouse interaction for GoL ── */
function setupGolMouse() {
  const canvas = document.getElementById('golCanvas');
  if (!canvas || canvas._golMouse) return;
  canvas._golMouse = true;

  const getCellFromEvent = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * GOL.cols;
    const y = (e.clientY - rect.top) / rect.height * GOL.rows;
    return [Math.floor(y), Math.floor(x)];
  };

  canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    const [r, c] = getCellFromEvent(e);
    if (r < 0 || r >= GOL.rows || c < 0 || c >= GOL.cols) return;
    GOL.paintVal = GOL.grid[r][c] ? 0 : 1;
    GOL.grid[r][c] = GOL.paintVal;
    GOL.painting = true;
    ENGINE.golDraw();
  });
  canvas.addEventListener('mousemove', e => {
    if (!GOL.painting) return;
    const [r, c] = getCellFromEvent(e);
    if (r < 0 || r >= GOL.rows || c < 0 || c >= GOL.cols) return;
    GOL.grid[r][c] = GOL.paintVal;
    ENGINE.golDraw();
  });
  canvas.addEventListener('mouseup', () => { GOL.painting = false; });
  canvas.addEventListener('mouseleave', () => { GOL.painting = false; });
}

/* ═══════════════════════════════════════════════════════════════
   DRAWS — initial render triggered when topic becomes visible
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {
  'logistic-map':     () => ENGINE.drawLogisticMap(),
  'butterfly-effect': () => ENGINE.drawButterflyEffect(),
  'bifurcation':      () => { if (!ENGINE._bifRendered) ENGINE.renderBifurcation(); },
  'lorenz-attractor': () => { if (!ENGINE._lorenzRunning) ENGINE.restartLorenz(); },
  'wolfram-rules':    () => ENGINE.drawWolfram(),
  'game-of-life':     () => { ENGINE.golInit(); setupGolMouse(); },
};

/* ── Resize handler ── */
window.addEventListener('resize', () => {
  if (typeof currentTopic !== 'undefined' && DRAWS[currentTopic]) {
    setTimeout(() => DRAWS[currentTopic](), 100);
  }
});
