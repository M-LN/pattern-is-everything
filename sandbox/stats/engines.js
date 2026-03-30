/* ═══════════════════════════════════════════════════════════════
   Stats Lab — Interactive Engines
   Canvas-based statistics sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const DPR = window.devicePixelRatio || 1;
const ENGINE = {};

/* ── Helpers ── */
function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const rect = c.parentElement.getBoundingClientRect();
  const w = rect.width - 2;
  c.style.width = w + 'px';
  c.width = w * DPR;
  const h = parseInt(c.getAttribute('height') || 400);
  c.height = h * DPR;
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w, h };
}

function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

const PURPLE = '#ce93d8';
const GREEN = '#81c784';
const RED = '#e57373';
const BLUE = '#4fc3f7';
const ORANGE = '#ffb74d';
const COLORS = ['#ce93d8', '#4fc3f7', '#81c784', '#e57373', '#ffb74d', '#4dd0e1'];
const MUTED = () => css('--muted') || '#666';
const BORDER = () => css('--border') || '#222';
const BG = () => css('--bg') || '#fff';
const SURFACE = () => css('--surface') || '#f5f5f5';
const TEXT = () => css('--text') || '#1a1a1a';
const MONO = () => css('--mono') || 'IBM Plex Mono, monospace';


/* ═══════════════════════════════════════════════════════════════
   HINTS & CHALLENGES SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const HINT_STORE_KEY = 'sb-stats-hints';
const CHALLENGE_STORE_KEY = 'sb-stats-challenges';

function getShownHints() {
  try { return JSON.parse(sessionStorage.getItem(HINT_STORE_KEY) || '{}'); } catch { return {}; }
}

function checkHints(topicId, state) {
  const hints = typeof HINTS !== 'undefined' ? HINTS[topicId] : null;
  if (!hints) return;
  const shown = getShownHints();

  hints.forEach(h => {
    if (shown[h.id]) return;
    let triggered = false;
    const t = h.trigger;

    if (t in state && state[t] === true) triggered = true;
    else {
      const m = t.match(/^(\w+)(>=|<=|>|<|==)(.+)$/);
      if (m) {
        const val = state[m[1]];
        const cmp = parseFloat(m[3]);
        if (val !== undefined) {
          if (m[2] === '>=' && val >= cmp) triggered = true;
          if (m[2] === '<=' && val <= cmp) triggered = true;
          if (m[2] === '>'  && val >  cmp) triggered = true;
          if (m[2] === '<'  && val <  cmp) triggered = true;
          if (m[2] === '==' && val == cmp) triggered = true;
        }
      }
    }

    if (triggered) {
      shown[h.id] = true;
      sessionStorage.setItem(HINT_STORE_KEY, JSON.stringify(shown));
      showHint(topicId, h.message);
    }
  });
}

function showHint(topicId, message) {
  const panel = document.getElementById('hints-' + topicId);
  if (!panel) return;
  const el = document.createElement('div');
  el.className = 'hint-item hint-enter';
  el.innerHTML = `<span class="hint-icon">💡</span><span class="hint-text">${message}</span>`;
  panel.appendChild(el);
  requestAnimationFrame(() => { el.classList.remove('hint-enter'); el.classList.add('hint-visible'); });
  setTimeout(() => {
    el.classList.remove('hint-visible');
    el.classList.add('hint-exit');
    setTimeout(() => el.remove(), 400);
  }, 10000);
}

function checkChallenges(topicId, state) {
  const challenges = typeof CHALLENGES !== 'undefined' ? CHALLENGES[topicId] : null;
  if (!challenges) return;
  const saved = JSON.parse(localStorage.getItem(CHALLENGE_STORE_KEY) || '{}');
  let changed = false;

  challenges.forEach(ch => {
    if (saved[ch.id]) return;
    const parts = ch.checkFn.split('&&');
    const pass = parts.every(p => {
      const pt = p.trim();
      if (pt in state && state[pt] === true) return true;
      const m = pt.match(/^(\w+)(>=|<=|>|<|==)(.+)$/);
      if (m) {
        const val = state[m[1]];
        const cmp = parseFloat(m[3]);
        if (val !== undefined) {
          if (m[2] === '>=' && val >= cmp) return true;
          if (m[2] === '<=' && val <= cmp) return true;
          if (m[2] === '>'  && val >  cmp) return true;
          if (m[2] === '<'  && val <  cmp) return true;
          if (m[2] === '==' && val == cmp) return true;
        }
      }
      return false;
    });
    if (pass) {
      saved[ch.id] = true;
      changed = true;
    }
  });

  if (changed) {
    localStorage.setItem(CHALLENGE_STORE_KEY, JSON.stringify(saved));
    if (typeof renderChallenges === 'function') renderChallenges(topicId);
  }
}


/* ═══════════════════════════════════════════════════════════════
   1. DISTRIBUTION EXPLORER
   ═══════════════════════════════════════════════════════════════ */

let deState = {
  dist: 'normal',
  param1: 0,    // mean / a / lambda
  param2: 1,    // sd / b
  nSamples: 1000,
  samples: [],
  showCDF: false,
  seenDists: new Set(['normal']),
};

function deGenerate() {
  const s = deState;
  const arr = [];
  for (let i = 0; i < s.nSamples; i++) {
    switch (s.dist) {
      case 'normal':
        arr.push(s.param1 + s.param2 * gauss());
        break;
      case 'uniform':
        arr.push(s.param1 + Math.random() * s.param2);
        break;
      case 'exponential': {
        const lam = Math.max(0.01, s.param1 || 1);
        arr.push(-Math.log(1 - Math.random()) / lam);
        break;
      }
      case 'poisson': {
        const lam = Math.max(0.1, s.param1 || 3);
        let L = Math.exp(-lam), k = 0, p = 1;
        do { k++; p *= Math.random(); } while (p > L);
        arr.push(k - 1);
        break;
      }
    }
  }
  s.samples = arr;
}

function deStats() {
  const s = deState.samples;
  if (s.length === 0) return { mean: 0, sd: 0, variance: 0, skew: 0 };
  const n = s.length;
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const variance = s.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  const sd = Math.sqrt(variance);
  const skew = sd === 0 ? 0 : s.reduce((a, b) => a + ((b - mean) / sd) ** 3, 0) / n;
  return { mean, sd, variance, skew };
}

function drawDE() {
  const r = setupCanvas('deCanvas');
  if (!r) return;
  const { ctx, w, h } = r;

  if (deState.samples.length === 0) deGenerate();

  const st = deStats();
  document.getElementById('deMean').textContent = st.mean.toFixed(2);
  document.getElementById('deSD').textContent = st.sd.toFixed(2);
  document.getElementById('deVar').textContent = st.variance.toFixed(2);
  document.getElementById('deSkew').textContent = st.skew.toFixed(2);

  ctx.fillStyle = BG();
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 30, right: 30, bottom: 50, left: 60 };
  const pw = w - pad.left - pad.right;
  const ph = h - pad.top - pad.bottom;

  // Histogram bins
  const samples = deState.samples;
  const minV = Math.min(...samples);
  const maxV = Math.max(...samples);
  const range = maxV - minV || 1;
  const nBins = Math.min(50, Math.max(10, Math.ceil(Math.sqrt(samples.length))));
  const binW = range / nBins;
  const bins = new Array(nBins).fill(0);
  samples.forEach(v => {
    const idx = Math.min(nBins - 1, Math.floor((v - minV) / binW));
    bins[idx]++;
  });
  const maxBin = Math.max(...bins);

  if (deState.showCDF) {
    // CDF
    const sorted = [...samples].sort((a, b) => a - b);
    ctx.strokeStyle = PURPLE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    sorted.forEach((v, i) => {
      const x = pad.left + ((v - minV) / range) * pw;
      const y = pad.top + ph - (i / (sorted.length - 1)) * ph;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // CDF label
    ctx.fillStyle = MUTED();
    ctx.font = `11px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText('1.0', pad.left - 8, pad.top + 4);
    ctx.fillText('0.0', pad.left - 8, pad.top + ph + 4);
    ctx.fillText('CDF', pad.left + pw, pad.top - 8);
  } else {
    // Histogram bars
    const barPx = pw / nBins;
    bins.forEach((count, i) => {
      const x = pad.left + i * barPx;
      const barH = maxBin === 0 ? 0 : (count / maxBin) * ph;
      ctx.fillStyle = PURPLE + '44';
      ctx.fillRect(x + 1, pad.top + ph - barH, barPx - 2, barH);
      ctx.strokeStyle = PURPLE;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, pad.top + ph - barH, barPx - 2, barH);
    });

    // Mean line
    const meanX = pad.left + ((st.mean - minV) / range) * pw;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = RED;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meanX, pad.top);
    ctx.lineTo(meanX, pad.top + ph);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = RED;
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('μ', meanX, pad.top - 8);

    // ±σ lines
    if (st.sd > 0) {
      [-1, 1].forEach(sign => {
        const sx = pad.left + ((st.mean + sign * st.sd - minV) / range) * pw;
        if (sx >= pad.left && sx <= pad.left + pw) {
          ctx.setLineDash([2, 4]);
          ctx.strokeStyle = ORANGE + '88';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx, pad.top);
          ctx.lineTo(sx, pad.top + ph);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = ORANGE;
          ctx.font = `10px ${MONO()}`;
          ctx.textAlign = 'center';
          ctx.fillText(sign === -1 ? '-σ' : '+σ', sx, pad.top + ph + 16);
        }
      });
    }
  }

  // Axes
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + ph);
  ctx.lineTo(pad.left + pw, pad.top + ph);
  ctx.stroke();

  // X-axis labels
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  for (let i = 0; i <= 5; i++) {
    const v = minV + (range / 5) * i;
    const x = pad.left + (pw / 5) * i;
    ctx.fillText(v.toFixed(1), x, pad.top + ph + 32);
  }

  // Title
  ctx.fillStyle = TEXT();
  ctx.font = `bold 13px ${MONO()}`;
  ctx.textAlign = 'left';
  const distLabel = { normal: 'Normal', uniform: 'Uniform', exponential: 'Exponential', poisson: 'Poisson' };
  ctx.fillText(distLabel[deState.dist] + ' Distribution' + (deState.showCDF ? ' (CDF)' : ''), pad.left, pad.top - 8);

  // Hints
  checkHints('distribution-explorer', {
    distNormal: deState.dist === 'normal',
    distUniform: deState.dist === 'uniform',
    distExponential: deState.dist === 'exponential',
    sdHigh: deState.param2 > 3,
    showCDF: deState.showCDF,
  });

  // Challenges
  checkChallenges('distribution-explorer', {
    seenAll: deState.seenDists.size >= 4,
    tightNormal: deState.dist === 'normal' && st.sd < 0.5,
  });
}

ENGINE.setDist = function(v) {
  deState.dist = v;
  deState.seenDists.add(v);
  // Adjust slider ranges based on distribution
  const p1 = document.getElementById('deParam1');
  const p2 = document.getElementById('deParam2');
  if (v === 'normal')      { p1.min = -5; p1.max = 5; p1.value = 0; p2.min = 0.1; p2.max = 5; p2.value = 1; }
  if (v === 'uniform')     { p1.min = -5; p1.max = 5; p1.value = 0; p2.min = 0.1; p2.max = 10; p2.value = 5; }
  if (v === 'exponential') { p1.min = 0.1; p1.max = 5; p1.value = 1; p2.min = 0.1; p2.max = 5; p2.value = 1; }
  if (v === 'poisson')     { p1.min = 0.1; p1.max = 20; p1.value = 3; p2.min = 0.1; p2.max = 5; p2.value = 1; }
  deState.param1 = +p1.value;
  deState.param2 = +p2.value;
  document.getElementById('deP1V').textContent = p1.value;
  document.getElementById('deP2V').textContent = p2.value;
  deGenerate();
  drawDE();
};
ENGINE.setParam1 = function(v) { deState.param1 = v; deGenerate(); drawDE(); };
ENGINE.setParam2 = function(v) { deState.param2 = v; deGenerate(); drawDE(); };
ENGINE.setSamples = function(v) { deState.nSamples = v; deGenerate(); drawDE(); };
ENGINE.generateDE = function() { deGenerate(); drawDE(); };
ENGINE.toggleCDF = function() { deState.showCDF = !deState.showCDF; drawDE(); };
ENGINE.resetDE = function() {
  deState = { dist: 'normal', param1: 0, param2: 1, nSamples: 1000, samples: [], showCDF: false, seenDists: new Set(['normal']) };
  document.getElementById('deDist').value = 'normal';
  document.getElementById('deParam1').value = 0; document.getElementById('deP1V').textContent = '0';
  document.getElementById('deParam2').value = 1; document.getElementById('deP2V').textContent = '1';
  document.getElementById('deSamples').value = 1000; document.getElementById('deSampV').textContent = '1000';
  drawDE();
};


/* ═══════════════════════════════════════════════════════════════
   2. HYPOTHESIS TESTING
   ═══════════════════════════════════════════════════════════════ */

let htState = {
  effectSize: 0.5,
  n: 30,
  alpha: 0.05,
  pValue: null,
  testStat: null,
  power: null,
  decision: null,
  history: [],    // array of { p, reject }
  nullDist: [],   // for visualization
  altDist: [],
};

function normalCDF(z) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

function normalPDF(x, mu, sigma) {
  return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
}

function htRunOnce() {
  const s = htState;
  // Generate sample from alternative (mean = effectSize, sd = 1)
  const sample = [];
  for (let i = 0; i < s.n; i++) sample.push(s.effectSize + gauss());
  const mean = sample.reduce((a, b) => a + b, 0) / s.n;
  const se = 1 / Math.sqrt(s.n);
  const z = mean / se;
  const p = 2 * (1 - normalCDF(Math.abs(z)));
  return { z, p, reject: p < s.alpha };
}

function htCalcPower() {
  const s = htState;
  const se = 1 / Math.sqrt(s.n);
  const zCrit = 1.96; // For alpha=0.05 two-tailed; compute properly below
  // Compute z-crit for actual alpha
  let zAlpha = 0;
  for (let z = 0; z < 5; z += 0.001) {
    if (2 * (1 - normalCDF(z)) <= s.alpha) { zAlpha = z; break; }
  }
  const ncp = s.effectSize / se; // non-centrality parameter
  const power = 1 - normalCDF(zAlpha - ncp) + normalCDF(-zAlpha - ncp);
  return clamp(power, 0, 1);
}

ENGINE.setHTEffect = function(v) { htState.effectSize = v; drawHT(); };
ENGINE.setHTN = function(v) { htState.n = v; drawHT(); };
ENGINE.setHTAlpha = function(v) { htState.alpha = v; drawHT(); };

ENGINE.runTest = function() {
  const result = htRunOnce();
  htState.pValue = result.p;
  htState.testStat = result.z;
  htState.decision = result.reject ? 'Reject H₀' : 'Fail to reject';
  htState.power = htCalcPower();
  htState.history.push(result);
  drawHT();
};

ENGINE.runMany = function() {
  for (let i = 0; i < 100; i++) {
    htState.history.push(htRunOnce());
  }
  htState.power = htCalcPower();
  // Show last result
  const last = htState.history[htState.history.length - 1];
  htState.pValue = last.p;
  htState.testStat = last.z;
  htState.decision = last.reject ? 'Reject H₀' : 'Fail to reject';
  drawHT();
};

ENGINE.resetHT = function() {
  htState = { effectSize: 0.5, n: 30, alpha: 0.05, pValue: null, testStat: null, power: null, decision: null, history: [], nullDist: [], altDist: [] };
  document.getElementById('htEffect').value = 0.5; document.getElementById('htEffV').textContent = '0.5';
  document.getElementById('htN').value = 30; document.getElementById('htNV').textContent = '30';
  document.getElementById('htAlpha').value = 0.05; document.getElementById('htAlphaV').textContent = '0.05';
  drawHT();
};

function drawHT() {
  const r = setupCanvas('htCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const s = htState;

  // Update metrics
  document.getElementById('htPVal').textContent = s.pValue !== null ? s.pValue.toFixed(4) : '—';
  document.getElementById('htStat').textContent = s.testStat !== null ? s.testStat.toFixed(3) : '—';
  document.getElementById('htPower').textContent = s.power !== null ? (s.power * 100).toFixed(1) + '%' : '—';
  document.getElementById('htDecision').textContent = s.decision || '—';
  if (s.decision === 'Reject H₀') document.getElementById('htDecision').style.color = GREEN;
  else if (s.decision) document.getElementById('htDecision').style.color = RED;

  ctx.fillStyle = BG();
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 30, right: 30, bottom: 60, left: 60 };
  const pw = w - pad.left - pad.right;
  const ph = (h - pad.top - pad.bottom) * 0.5;

  // ── Top half: Null + Alt distributions ──
  const se = 1 / Math.sqrt(s.n);
  const zRange = 5;

  // Find z-critical
  let zCrit = 1.96;
  for (let z = 0; z < 5; z += 0.001) {
    if (2 * (1 - normalCDF(z)) <= s.alpha) { zCrit = z; break; }
  }

  const ncp = s.effectSize / se;

  // Draw null distribution (centered at 0)
  ctx.fillStyle = BLUE + '22';
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let px = 0; px <= pw; px++) {
    const z = -zRange + (px / pw) * 2 * zRange;
    const y = normalPDF(z, 0, 1);
    const py = pad.top + ph - y * ph * 2.5;
    px === 0 ? ctx.moveTo(pad.left + px, py) : ctx.lineTo(pad.left + px, py);
  }
  ctx.stroke();

  // Shade rejection regions
  ctx.fillStyle = RED + '33';
  ctx.beginPath();
  ctx.moveTo(pad.left + ((zCrit + zRange) / (2 * zRange)) * pw, pad.top + ph);
  for (let px = Math.floor(((zCrit + zRange) / (2 * zRange)) * pw); px <= pw; px++) {
    const z = -zRange + (px / pw) * 2 * zRange;
    const y = normalPDF(z, 0, 1);
    ctx.lineTo(pad.left + px, pad.top + ph - y * ph * 2.5);
  }
  ctx.lineTo(pad.left + pw, pad.top + ph);
  ctx.fill();

  ctx.beginPath();
  const leftRej = Math.floor(((-zCrit + zRange) / (2 * zRange)) * pw);
  ctx.moveTo(pad.left, pad.top + ph);
  for (let px = 0; px <= leftRej; px++) {
    const z = -zRange + (px / pw) * 2 * zRange;
    const y = normalPDF(z, 0, 1);
    ctx.lineTo(pad.left + px, pad.top + ph - y * ph * 2.5);
  }
  ctx.lineTo(pad.left + leftRej, pad.top + ph);
  ctx.fill();

  // Draw alternative distribution
  ctx.strokeStyle = PURPLE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let px = 0; px <= pw; px++) {
    const z = -zRange + (px / pw) * 2 * zRange;
    const y = normalPDF(z, ncp, 1);
    const py = pad.top + ph - y * ph * 2.5;
    px === 0 ? ctx.moveTo(pad.left + px, py) : ctx.lineTo(pad.left + px, py);
  }
  ctx.stroke();

  // Labels
  ctx.fillStyle = BLUE;
  ctx.font = `bold 11px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('H₀ (null)', pad.left + pw * 0.5, pad.top + 14);

  ctx.fillStyle = PURPLE;
  const altX = pad.left + ((ncp + zRange) / (2 * zRange)) * pw;
  ctx.fillText('H₁ (alt)', clamp(altX, pad.left + 30, pad.left + pw - 30), pad.top + 14);

  // Z-axis
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top + ph);
  ctx.lineTo(pad.left + pw, pad.top + ph);
  ctx.stroke();

  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  for (let z = -4; z <= 4; z += 2) {
    const x = pad.left + ((z + zRange) / (2 * zRange)) * pw;
    ctx.fillText(z.toString(), x, pad.top + ph + 14);
  }

  // Critical value markers
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = RED;
  ctx.lineWidth = 1;
  [zCrit, -zCrit].forEach(z => {
    const x = pad.left + ((z + zRange) / (2 * zRange)) * pw;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ph); ctx.stroke();
  });
  ctx.setLineDash([]);

  ctx.fillStyle = RED;
  ctx.font = `9px ${MONO()}`;
  ctx.textAlign = 'center';
  const zcX = pad.left + ((zCrit + zRange) / (2 * zRange)) * pw;
  ctx.fillText('z=' + zCrit.toFixed(2), zcX, pad.top + ph + 26);

  // ── Bottom half: p-value history ──
  const histTop = pad.top + ph + 45;
  const histH = h - histTop - 20;
  if (s.history.length > 0 && histH > 30) {
    ctx.fillStyle = TEXT();
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'left';
    const rejectCount = s.history.filter(h => h.reject).length;
    const rejectRate = (rejectCount / s.history.length * 100).toFixed(1);
    ctx.fillText(`Test History: ${s.history.length} tests, ${rejectRate}% rejected`, pad.left, histTop);

    const dotR = 3;
    const maxShow = Math.min(s.history.length, Math.floor(pw / (dotR * 2 + 2)));
    const start = s.history.length - maxShow;
    for (let i = start; i < s.history.length; i++) {
      const x = pad.left + (i - start) * (dotR * 2 + 2);
      const y = histTop + 16;
      ctx.fillStyle = s.history[i].reject ? GREEN : RED + '66';
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Hints
  const power = htCalcPower();
  checkHints('hypothesis-testing', {
    pLow: s.pValue !== null && s.pValue < s.alpha,
    pHigh: s.pValue !== null && s.pValue >= s.alpha,
    nSmall: s.n < 15,
    type1Risk: s.alpha > 0.1,
    highPower: power > 0.9,
  });

  // Challenges
  checkChallenges('hypothesis-testing', {
    pBelow05: s.pValue !== null && s.pValue < 0.05,
    highPowerSmallN: power >= 0.9 && s.n <= 50,
  });
}


/* ═══════════════════════════════════════════════════════════════
   3. CORRELATION PLAYGROUND
   ═══════════════════════════════════════════════════════════════ */

let cpState = {
  points: [],
  showLine: true,
};

function cpCalcR() {
  const pts = cpState.points;
  const n = pts.length;
  if (n < 2) return { r: NaN, r2: NaN, slope: NaN, intercept: NaN };

  const sx = pts.reduce((a, p) => a + p.x, 0);
  const sy = pts.reduce((a, p) => a + p.y, 0);
  const mx = sx / n;
  const my = sy / n;

  let sxy = 0, sxx = 0, syy = 0;
  pts.forEach(p => {
    const dx = p.x - mx, dy = p.y - my;
    sxy += dx * dy;
    sxx += dx * dx;
    syy += dy * dy;
  });

  const r = sxx === 0 || syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy);
  const slope = sxx === 0 ? 0 : sxy / sxx;
  const intercept = my - slope * mx;
  return { r, r2: r * r, slope, intercept };
}

function onCPClick(e) {
  const c = document.getElementById('cpCanvas');
  if (!c) return;
  const rect = c.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (e.shiftKey && cpState.points.length > 0) {
    // Remove nearest point
    let minD = Infinity, minI = 0;
    cpState.points.forEach((p, i) => {
      const d = (p.px - x) ** 2 + (p.py - y) ** 2;
      if (d < minD) { minD = d; minI = i; }
    });
    if (minD < 400) cpState.points.splice(minI, 1);
  } else {
    cpState.points.push({ px: x, py: y, x: 0, y: 0 }); // screen coords, data coords computed in draw
  }
  drawCP();
}

function cpScreenToData(px, py, pad, pw, ph) {
  return {
    x: ((px - pad.left) / pw) * 20 - 10,
    y: (1 - (py - pad.top) / ph) * 20 - 10,
  };
}

function cpDataToScreen(dx, dy, pad, pw, ph) {
  return {
    px: pad.left + ((dx + 10) / 20) * pw,
    py: pad.top + (1 - (dy + 10) / 20) * ph,
  };
}

ENGINE.cpPreset = function(v) {
  cpState.points = [];
  if (v === 'none') { drawCP(); return; }
  const N = 30;
  const pad = { top: 30, right: 30, bottom: 50, left: 60 };
  const canvas = document.getElementById('cpCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width - 2;
  const h = parseInt(canvas.getAttribute('height') || 400);
  const pw = w - pad.left - pad.right;
  const ph = h - pad.top - pad.bottom;

  for (let i = 0; i < N; i++) {
    let dx, dy;
    switch (v) {
      case 'positive':
        dx = -8 + 16 * (i / N) + gauss() * 1.5;
        dy = -8 + 16 * (i / N) + gauss() * 1.5;
        break;
      case 'negative':
        dx = -8 + 16 * (i / N) + gauss() * 1.5;
        dy = 8 - 16 * (i / N) + gauss() * 1.5;
        break;
      case 'circle': {
        const angle = (i / N) * Math.PI * 2;
        dx = Math.cos(angle) * 6 + gauss() * 0.5;
        dy = Math.sin(angle) * 6 + gauss() * 0.5;
        break;
      }
      case 'quadratic':
        dx = -8 + 16 * (i / N);
        dy = 0.15 * dx * dx - 5 + gauss() * 1;
        break;
    }
    const scr = cpDataToScreen(dx, dy, pad, pw, ph);
    cpState.points.push({ px: scr.px, py: scr.py, x: dx, y: dy });
  }
  drawCP();
};

ENGINE.cpToggleLine = function() { cpState.showLine = !cpState.showLine; drawCP(); };
ENGINE.cpClear = function() { cpState.points = []; drawCP(); };

function drawCP() {
  const r = setupCanvas('cpCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;

  // Bind click handler
  c.onclick = onCPClick;

  ctx.fillStyle = BG();
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 30, right: 30, bottom: 50, left: 60 };
  const pw = w - pad.left - pad.right;
  const ph = h - pad.top - pad.bottom;

  // Update data coords for all points
  cpState.points.forEach(p => {
    const d = cpScreenToData(p.px, p.py, pad, pw, ph);
    p.x = d.x;
    p.y = d.y;
  });

  // Grid
  ctx.strokeStyle = BORDER() + '33';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 10; i++) {
    const x = pad.left + (i / 10) * pw;
    const y = pad.top + (i / 10) * ph;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ph); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + pw, y); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + ph);
  ctx.lineTo(pad.left + pw, pad.top + ph);
  ctx.stroke();

  // Axis labels
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  for (let i = -10; i <= 10; i += 5) {
    const x = pad.left + ((i + 10) / 20) * pw;
    ctx.fillText(i.toString(), x, pad.top + ph + 20);
  }
  ctx.textAlign = 'right';
  for (let i = -10; i <= 10; i += 5) {
    const y = pad.top + (1 - (i + 10) / 20) * ph;
    ctx.fillText(i.toString(), pad.left - 8, y + 4);
  }

  const stats = cpCalcR();

  // Regression line
  if (cpState.showLine && cpState.points.length >= 2 && !isNaN(stats.slope)) {
    const x1 = -10, x2 = 10;
    const y1 = stats.slope * x1 + stats.intercept;
    const y2 = stats.slope * x2 + stats.intercept;
    const s1 = cpDataToScreen(x1, y1, pad, pw, ph);
    const s2 = cpDataToScreen(x2, y2, pad, pw, ph);
    ctx.strokeStyle = PURPLE + '88';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(s1.px, s1.py);
    ctx.lineTo(s2.px, s2.py);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Points
  cpState.points.forEach(p => {
    ctx.fillStyle = PURPLE;
    ctx.beginPath();
    ctx.arc(p.px, p.py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = BG();
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Update metrics
  document.getElementById('cpR').textContent = isNaN(stats.r) ? '—' : stats.r.toFixed(4);
  document.getElementById('cpR2').textContent = isNaN(stats.r2) ? '—' : stats.r2.toFixed(4);
  document.getElementById('cpCount').textContent = cpState.points.length;
  document.getElementById('cpSlope').textContent = isNaN(stats.slope) ? '—' : stats.slope.toFixed(3);

  // R value display
  if (!isNaN(stats.r)) {
    const rColor = Math.abs(stats.r) > 0.7 ? GREEN : Math.abs(stats.r) > 0.3 ? ORANGE : RED;
    ctx.fillStyle = rColor;
    ctx.font = `bold 16px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText('r = ' + stats.r.toFixed(3), pad.left + pw, pad.top + 20);
  }

  // Title
  ctx.fillStyle = TEXT();
  ctx.font = `bold 13px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('Scatter Plot', pad.left, pad.top - 8);

  // Hints
  const n = cpState.points.length;
  const absR = Math.abs(stats.r || 0);
  // Detect if there's an outlier: a point far from the regression line
  let hasOutlier = false;
  if (n >= 5 && !isNaN(stats.slope)) {
    cpState.points.forEach(p => {
      const predicted = stats.slope * p.x + stats.intercept;
      if (Math.abs(p.y - predicted) > 8) hasOutlier = true;
    });
  }

  checkHints('correlation-playground', {
    pointCount: n,
    rStrong: absR > 0.8 && n >= 5,
    rWeak: absR < 0.2 && n >= 8,
    hasOutlier: hasOutlier,
    rNegative: stats.r < -0.3 && n >= 5,
  });

  // Challenges
  checkChallenges('correlation-playground', {
    nearPerfect: absR > 0.95 && n >= 5,
    zeroCorrelation: absR < 0.1 && n >= 10,
  });
}


/* ═══════════════════════════════════════════════════════════════
   4. CENTRAL LIMIT THEOREM
   ═══════════════════════════════════════════════════════════════ */

let cltState = {
  popType: 'uniform',
  customPop: [],     // user-drawn population bars
  sampleSize: 5,
  sampleMeans: [],
  population: [],    // generated population values
};

function cltGeneratePopulation() {
  const s = cltState;
  const pop = [];
  const N = 10000;
  switch (s.popType) {
    case 'uniform':
      for (let i = 0; i < N; i++) pop.push(Math.random() * 10);
      break;
    case 'skewed':
      for (let i = 0; i < N; i++) pop.push(-Math.log(1 - Math.random()) * 3);
      break;
    case 'bimodal':
      for (let i = 0; i < N; i++) pop.push(Math.random() < 0.5 ? 2 + gauss() * 0.8 : 8 + gauss() * 0.8);
      break;
    case 'custom':
      if (s.customPop.length === 0) {
        // Default custom: flat
        for (let i = 0; i < 20; i++) s.customPop.push(1);
      }
      const total = s.customPop.reduce((a, b) => a + b, 0) || 1;
      for (let i = 0; i < N; i++) {
        let r = Math.random() * total, acc = 0;
        for (let j = 0; j < s.customPop.length; j++) {
          acc += s.customPop[j];
          if (r <= acc) { pop.push(j * 0.5 + Math.random() * 0.5); break; }
        }
      }
      break;
  }
  s.population = pop;
}

function cltDrawOneSample() {
  const s = cltState;
  if (s.population.length === 0) cltGeneratePopulation();
  const sample = [];
  for (let i = 0; i < s.sampleSize; i++) {
    sample.push(s.population[Math.floor(Math.random() * s.population.length)]);
  }
  const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
  s.sampleMeans.push(mean);
  return mean;
}

ENGINE.setCLTPop = function(v) {
  cltState.popType = v;
  cltState.sampleMeans = [];
  cltState.population = [];
  if (v === 'custom') cltState.customPop = new Array(20).fill(1);
  cltGeneratePopulation();
  document.getElementById('cltShape').textContent = { uniform: 'Uniform', skewed: 'Right-Skewed', bimodal: 'Bimodal', custom: 'Custom' }[v];
  drawCLT();
};
ENGINE.setCLTN = function(v) { cltState.sampleSize = v; cltState.sampleMeans = []; drawCLT(); };
ENGINE.drawSample = function() { cltDrawOneSample(); drawCLT(); };
ENGINE.drawMany = function(count) { for (let i = 0; i < count; i++) cltDrawOneSample(); drawCLT(); };
ENGINE.resetCLT = function() {
  cltState = { popType: cltState.popType, customPop: cltState.customPop, sampleSize: 5, sampleMeans: [], population: cltState.population };
  document.getElementById('cltN').value = 5;
  document.getElementById('cltNV').textContent = '5';
  drawCLT();
};

function drawCLT() {
  const r = setupCanvas('cltCanvas');
  if (!r) return;
  const { c, ctx, w, h } = r;
  const s = cltState;

  if (s.population.length === 0) cltGeneratePopulation();

  ctx.fillStyle = BG();
  ctx.fillRect(0, 0, w, h);

  const pad = { top: 30, right: 30, bottom: 30, left: 60 };
  const pw = w - pad.left - pad.right;
  const halfH = (h - pad.top - pad.bottom - 40) / 2;

  // ── Top: Population distribution ──
  ctx.fillStyle = TEXT();
  ctx.font = `bold 12px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('Population Distribution', pad.left, pad.top - 8);

  const popMin = Math.min(...s.population);
  const popMax = Math.max(...s.population);
  const popRange = popMax - popMin || 1;
  const popBins = 40;
  const popBinW = popRange / popBins;
  const popHist = new Array(popBins).fill(0);
  s.population.forEach(v => {
    const idx = Math.min(popBins - 1, Math.floor((v - popMin) / popBinW));
    popHist[idx]++;
  });
  const popMaxBin = Math.max(...popHist);

  const barPx = pw / popBins;
  popHist.forEach((count, i) => {
    const x = pad.left + i * barPx;
    const barH = popMaxBin === 0 ? 0 : (count / popMaxBin) * halfH * 0.85;
    ctx.fillStyle = BLUE + '44';
    ctx.fillRect(x + 0.5, pad.top + halfH - barH, barPx - 1, barH);
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x + 0.5, pad.top + halfH - barH, barPx - 1, barH);
  });

  // Population axis
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top + halfH);
  ctx.lineTo(pad.left + pw, pad.top + halfH);
  ctx.stroke();

  // Handle custom drawing
  if (s.popType === 'custom') {
    c.onmousedown = function(e) {
      const rect = c.getBoundingClientRect();
      const canvasH = parseInt(c.getAttribute('height') || 500);
      const y = e.clientY - rect.top;
      if (y > pad.top + halfH + 20) return; // only allow drawing in top half
      const drawHandler = function(ev) {
        const mx = ev.clientX - rect.left;
        const my = ev.clientY - rect.top;
        const bin = Math.floor(((mx - pad.left) / pw) * s.customPop.length);
        if (bin >= 0 && bin < s.customPop.length && my >= pad.top && my <= pad.top + halfH) {
          s.customPop[bin] = clamp((1 - (my - pad.top) / halfH) * 10, 0.1, 10);
          cltGeneratePopulation();
          s.sampleMeans = [];
          drawCLT();
        }
      };
      drawHandler(e);
      const upHandler = () => { c.removeEventListener('mousemove', drawHandler); };
      c.addEventListener('mousemove', drawHandler);
      document.addEventListener('mouseup', upHandler, { once: true });
    };
  } else {
    c.onmousedown = null;
  }

  // ── Bottom: Sampling distribution ──
  const sampTop = pad.top + halfH + 40;

  ctx.fillStyle = TEXT();
  ctx.font = `bold 12px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText(`Distribution of Sample Means (n=${s.sampleSize})`, pad.left, sampTop - 8);

  if (s.sampleMeans.length > 0) {
    const meansMin = Math.min(...s.sampleMeans, popMin);
    const meansMax = Math.max(...s.sampleMeans, popMax);
    const meansRange = meansMax - meansMin || 1;
    const meansBins = 40;
    const meansBinW = meansRange / meansBins;
    const meansHist = new Array(meansBins).fill(0);
    s.sampleMeans.forEach(v => {
      const idx = Math.min(meansBins - 1, Math.floor((v - meansMin) / meansBinW));
      meansHist[idx]++;
    });
    const meansMaxBin = Math.max(...meansHist);

    const mBarPx = pw / meansBins;
    meansHist.forEach((count, i) => {
      const x = pad.left + i * mBarPx;
      const barH = meansMaxBin === 0 ? 0 : (count / meansMaxBin) * halfH * 0.85;
      ctx.fillStyle = PURPLE + '44';
      ctx.fillRect(x + 0.5, sampTop + halfH - barH, mBarPx - 1, barH);
      ctx.strokeStyle = PURPLE;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 0.5, sampTop + halfH - barH, mBarPx - 1, barH);
    });

    // Grand mean line
    const grandMean = s.sampleMeans.reduce((a, b) => a + b, 0) / s.sampleMeans.length;
    const meanX = pad.left + ((grandMean - meansMin) / meansRange) * pw;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = RED;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meanX, sampTop);
    ctx.lineTo(meanX, sampTop + halfH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = RED;
    ctx.font = `bold 10px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('x̄=' + grandMean.toFixed(2), meanX, sampTop - 12);

    // SE annotation
    const popMean = s.population.reduce((a, b) => a + b, 0) / s.population.length;
    const popSD = Math.sqrt(s.population.reduce((a, b) => a + (b - popMean) ** 2, 0) / s.population.length);
    const theorySE = popSD / Math.sqrt(s.sampleSize);
    const actualSE = s.sampleMeans.length > 1 ? Math.sqrt(s.sampleMeans.reduce((a, b) => a + (b - grandMean) ** 2, 0) / s.sampleMeans.length) : 0;

    // Update metrics
    document.getElementById('cltCount').textContent = s.sampleMeans.length;
    document.getElementById('cltMeanMeans').textContent = grandMean.toFixed(3);
    document.getElementById('cltSE').textContent = actualSE.toFixed(3) + ' (theory: ' + theorySE.toFixed(3) + ')';

    // Overlay normal curve on sampling distribution
    if (s.sampleMeans.length >= 10) {
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= pw; px++) {
        const v = meansMin + (px / pw) * meansRange;
        const y = normalPDF(v, grandMean, actualSE || 0.001);
        const normY = y * actualSE * s.sampleMeans.length * meansBinW;
        const barH = meansMaxBin === 0 ? 0 : (normY / meansMaxBin) * halfH * 0.85;
        const py = sampTop + halfH - barH;
        px === 0 ? ctx.moveTo(pad.left + px, py) : ctx.lineTo(pad.left + px, py);
      }
      ctx.stroke();
    }
  } else {
    document.getElementById('cltCount').textContent = '0';
    document.getElementById('cltMeanMeans').textContent = '—';
    document.getElementById('cltSE').textContent = '—';

    ctx.fillStyle = MUTED();
    ctx.font = `12px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Click "Draw 1 Sample" to begin', pad.left + pw / 2, sampTop + halfH / 2);
  }

  // Sampling axis
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, sampTop + halfH);
  ctx.lineTo(pad.left + pw, sampTop + halfH);
  ctx.stroke();

  // Hints
  const actualSE2 = s.sampleMeans.length > 1 ?
    Math.sqrt(s.sampleMeans.reduce((a, b) => a + (b - s.sampleMeans.reduce((x, y) => x + y, 0) / s.sampleMeans.length) ** 2, 0) / s.sampleMeans.length) : 999;

  checkHints('central-limit-theorem', {
    sampleCount: s.sampleMeans.length,
    sampleSizeSmall: s.sampleSize < 5 && s.sampleMeans.length > 10,
    sampleSizeBig: s.sampleSize >= 30,
    looksNormal: s.sampleMeans.length >= 30 && s.sampleSize >= 10,
    showSEM: s.sampleMeans.length >= 20,
  });

  // Challenges
  checkChallenges('central-limit-theorem', {
    bellShaped: s.sampleMeans.length >= 50 && s.sampleSize >= 5,
    lowSE: actualSE2 < 1.0 && s.sampleSize >= 30,
  });
}


/* ═══════════════════════════════════════════════════════════════
   FUNCTION REUSE: normalPDF for HT engine
   ═══════════════════════════════════════════════════════════════ */
// normalPDF and normalCDF defined in hypothesis testing section above


/* ═══════════════════════════════════════════════════════════════
   5. BAYESIAN UPDATER
   ═══════════════════════════════════════════════════════════════ */

let bayState = { priorA: 1, priorB: 1, heads: 0, tails: 0, trueProb: 0.5, flips: [] };

/* Log-Gamma via Lanczos approximation */
function lnGamma(z) {
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  const g = 7;
  const c = [0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,
    -176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaPDF(x, a, b) {
  if (x <= 0 || x >= 1) return 0;
  const logB = lnGamma(a) + lnGamma(b) - lnGamma(a + b);
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logB);
}

function drawBayes() {
  const r = setupCanvas('bayCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const s = bayState;
  const postA = s.priorA + s.heads;
  const postB = s.priorB + s.tails;
  const totalFlips = s.heads + s.tails;
  const postMean = postA / (postA + postB);

  // Update metrics
  document.getElementById('bayPriorA').textContent = s.priorA.toFixed(2);
  document.getElementById('bayPriorB').textContent = s.priorB.toFixed(2);
  document.getElementById('bayPostA').textContent = postA.toFixed(2);
  document.getElementById('bayPostB').textContent = postB.toFixed(2);
  document.getElementById('bayFlips').textContent = totalFlips;
  document.getElementById('bayHeads').textContent = s.heads;
  document.getElementById('bayMean').textContent = postMean.toFixed(4);

  const pad = { top: 30, right: 20, bottom: 50, left: 50 };
  const topH = h * 0.65;
  const botTop = topH + 10;
  const botH = h - botTop - pad.bottom;
  const pw = w - pad.left - pad.right;

  ctx.clearRect(0, 0, w, h);

  // — Top half: Beta PDF curves —
  const steps = 200;
  let maxY = 0;
  const priorPts = [], postPts = [];
  for (let i = 0; i <= steps; i++) {
    const x = i / steps;
    const pv = betaPDF(x, s.priorA, s.priorB);
    const qv = betaPDF(x, postA, postB);
    priorPts.push({ x, y: pv });
    postPts.push({ x, y: qv });
    if (isFinite(pv)) maxY = Math.max(maxY, pv);
    if (isFinite(qv)) maxY = Math.max(maxY, qv);
  }
  if (maxY === 0) maxY = 1;

  // Axes
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, topH);
  ctx.lineTo(pad.left + pw, topH);
  ctx.stroke();

  ctx.fillStyle = MUTED();
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'center';
  for (let i = 0; i <= 10; i++) {
    const xp = pad.left + (i / 10) * pw;
    ctx.fillText((i / 10).toFixed(1), xp, topH + 14);
  }
  ctx.fillText('θ (probability)', pad.left + pw / 2, topH + 30);

  // Prior curve (blue, dashed)
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  priorPts.forEach((p, i) => {
    const px = pad.left + p.x * pw;
    const py = topH - (Math.min(p.y, maxY) / maxY) * (topH - pad.top);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Posterior curve (purple, solid)
  ctx.strokeStyle = PURPLE;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  postPts.forEach((p, i) => {
    const px = pad.left + p.x * pw;
    const py = topH - (Math.min(p.y, maxY) / maxY) * (topH - pad.top);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.stroke();

  // True probability line
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  const trueX = pad.left + s.trueProb * pw;
  ctx.beginPath();
  ctx.moveTo(trueX, pad.top);
  ctx.lineTo(trueX, topH);
  ctx.stroke();
  ctx.setLineDash([]);

  // Legend
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'left';
  const lx = pad.left + 10;
  ctx.fillStyle = BLUE;  ctx.fillText('— Prior (dashed)', lx, pad.top + 14);
  ctx.fillStyle = PURPLE; ctx.fillText('— Posterior', lx, pad.top + 28);
  ctx.fillStyle = GREEN;  ctx.fillText('— True p', lx, pad.top + 42);

  // — Bottom half: coin flip dots —
  ctx.fillStyle = MUTED();
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('Coin flips:', pad.left, botTop + 14);

  const dotR = 4;
  const gap = 3;
  const dotsPerRow = Math.floor(pw / (dotR * 2 + gap));
  s.flips.forEach((f, i) => {
    const col = i % dotsPerRow;
    const row = Math.floor(i / dotsPerRow);
    const cx = pad.left + col * (dotR * 2 + gap) + dotR;
    const cy = botTop + 28 + row * (dotR * 2 + gap) + dotR;
    if (cy + dotR > h) return;
    ctx.beginPath();
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = f === 1 ? GREEN : RED;
    ctx.fill();
  });

  // Hints
  checkHints('bayesian-updater', {
    flips: totalFlips,
    flatPrior: s.priorA === 1 && s.priorB === 1,
    strongPrior: s.priorA > 5 || s.priorB > 5,
    converging: totalFlips >= 30 && Math.abs(postMean - s.trueProb) < 0.1,
    meanClose: totalFlips >= 20 && Math.abs(postMean - s.trueProb) < 0.05,
  });

  // Challenges
  checkChallenges('bayesian-updater', {
    flatStart: s.priorA === 1 && s.priorB === 1,
    flips: totalFlips,
    trueBeliever: Math.abs(postMean - s.trueProb) < 0.05,
  });
}

ENGINE.setPriorA = function(v) { bayState.priorA = v; drawBayes(); };
ENGINE.setPriorB = function(v) { bayState.priorB = v; drawBayes(); };
ENGINE.setTrueProb = function(v) { bayState.trueProb = v; drawBayes(); };

ENGINE.flipBayes = function(n) {
  for (let i = 0; i < n; i++) {
    const result = Math.random() < bayState.trueProb ? 1 : 0;
    bayState.flips.push(result);
    if (result) bayState.heads++; else bayState.tails++;
  }
  drawBayes();
};

ENGINE.resetBayes = function() {
  bayState = { priorA: 1, priorB: 1, heads: 0, tails: 0, trueProb: bayState.trueProb, flips: [] };
  document.getElementById('bayAlpha').value = 1; document.getElementById('bayAV').textContent = '1';
  document.getElementById('bayBeta').value = 1;  document.getElementById('bayBV').textContent = '1';
  drawBayes();
};


/* ═══════════════════════════════════════════════════════════════
   6. REGRESSION DIAGNOSTICS
   ═══════════════════════════════════════════════════════════════ */

let rdState = { points: [], n: 50, noise: 1, relationship: 'linear', fit: null };

function rdGenerate() {
  const s = rdState;
  s.points = [];
  for (let i = 0; i < s.n; i++) {
    const x = (i / (s.n - 1)) * 10 - 5;
    let yTrue;
    switch (s.relationship) {
      case 'linear':    yTrue = 0.8 * x + 2; break;
      case 'quadratic': yTrue = 0.3 * x * x - 1; break;
      case 'sine':      yTrue = 3 * Math.sin(x); break;
      default:          yTrue = x;
    }
    const y = yTrue + gauss() * s.noise;
    s.points.push({ x, y, yTrue });
  }
  rdFit();
}

function rdFit() {
  const pts = rdState.points;
  if (pts.length < 3) { rdState.fit = null; return; }
  const n = pts.length;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0;
  pts.forEach(p => { sx += p.x; sy += p.y; sxy += p.x * p.y; sx2 += p.x * p.x; });
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;

  const residuals = pts.map(p => p.y - (slope * p.x + intercept));
  const fitted = pts.map(p => slope * p.x + intercept);
  const meanY = sy / n;
  const ssTot = pts.reduce((a, p) => a + (p.y - meanY) ** 2, 0);
  const ssRes = residuals.reduce((a, r) => a + r * r, 0);
  const r2 = 1 - ssRes / ssTot;
  const adjR2 = 1 - (1 - r2) * (n - 1) / (n - 2);
  const rmse = Math.sqrt(ssRes / n);

  // Durbin-Watson approximation
  let dwNum = 0;
  for (let i = 1; i < residuals.length; i++) dwNum += (residuals[i] - residuals[i - 1]) ** 2;
  const dw = dwNum / ssRes;

  rdState.fit = { slope, intercept, residuals, fitted, r2, adjR2, rmse, dw };
}

function drawRD() {
  const r = setupCanvas('rdCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const s = rdState;

  ctx.clearRect(0, 0, w, h);

  if (!s.fit || s.points.length === 0) {
    ctx.fillStyle = MUTED();
    ctx.font = `13px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Click "Generate" to create data and fit regression', w / 2, h / 2);
    return;
  }

  const f = s.fit;
  document.getElementById('rdR2').textContent = f.r2.toFixed(4);
  document.getElementById('rdAdjR2').textContent = f.adjR2.toFixed(4);
  document.getElementById('rdRMSE').textContent = f.rmse.toFixed(4);
  document.getElementById('rdDW').textContent = f.dw.toFixed(4);

  const halfW = w / 2;
  const halfH = h / 2;
  const pad = 40;

  function panelBounds(col, row) {
    return {
      x: col * halfW + pad,
      y: row * halfH + pad / 2,
      w: halfW - pad * 1.5,
      h: halfH - pad * 1.2
    };
  }

  function drawAxes(b, xlabel, ylabel) {
    ctx.strokeStyle = BORDER();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x, b.y + b.h);
    ctx.lineTo(b.x + b.w, b.y + b.h);
    ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `9px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(xlabel, b.x + b.w / 2, b.y + b.h + 16);
    ctx.save();
    ctx.translate(b.x - 14, b.y + b.h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(ylabel, 0, 0);
    ctx.restore();
  }

  // Panel titles
  const titles = ['Fitted vs Actual', 'Residuals vs Fitted', 'Q-Q Plot', 'Residual Histogram'];
  titles.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    ctx.fillStyle = TEXT();
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(t, col * halfW + halfW / 2, row * halfH + 14);
  });

  // (1) Fitted vs Actual
  const b1 = panelBounds(0, 0);
  drawAxes(b1, 'Fitted', 'Actual');
  const fMin = Math.min(...f.fitted), fMax = Math.max(...f.fitted);
  const yArr = s.points.map(p => p.y);
  const yMin = Math.min(...yArr), yMax = Math.max(...yArr);
  // 45-degree line
  ctx.strokeStyle = MUTED();
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  const lineMin = Math.min(fMin, yMin), lineMax = Math.max(fMax, yMax);
  ctx.moveTo(b1.x + ((lineMin - fMin) / (fMax - fMin || 1)) * b1.w, b1.y + b1.h - ((lineMin - yMin) / (yMax - yMin || 1)) * b1.h);
  ctx.lineTo(b1.x + ((lineMax - fMin) / (fMax - fMin || 1)) * b1.w, b1.y + b1.h - ((lineMax - yMin) / (yMax - yMin || 1)) * b1.h);
  ctx.stroke();
  ctx.setLineDash([]);
  s.points.forEach((p, i) => {
    const px = b1.x + ((f.fitted[i] - fMin) / (fMax - fMin || 1)) * b1.w;
    const py = b1.y + b1.h - ((p.y - yMin) / (yMax - yMin || 1)) * b1.h;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fillStyle = BLUE; ctx.fill();
  });

  // (2) Residuals vs Fitted
  const b2 = panelBounds(1, 0);
  drawAxes(b2, 'Fitted', 'Residual');
  const rMin = Math.min(...f.residuals), rMax = Math.max(...f.residuals);
  ctx.strokeStyle = MUTED();
  ctx.setLineDash([4, 4]);
  const zeroY = b2.y + b2.h - ((0 - rMin) / (rMax - rMin || 1)) * b2.h;
  ctx.beginPath(); ctx.moveTo(b2.x, zeroY); ctx.lineTo(b2.x + b2.w, zeroY); ctx.stroke();
  ctx.setLineDash([]);
  s.points.forEach((p, i) => {
    const px = b2.x + ((f.fitted[i] - fMin) / (fMax - fMin || 1)) * b2.w;
    const py = b2.y + b2.h - ((f.residuals[i] - rMin) / (rMax - rMin || 1)) * b2.h;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fillStyle = PURPLE; ctx.fill();
  });

  // (3) Q-Q Plot
  const b3 = panelBounds(0, 1);
  drawAxes(b3, 'Theoretical', 'Sample');
  const sorted = [...f.residuals].sort((a, b) => a - b);
  const n = sorted.length;
  const qqPts = sorted.map((v, i) => {
    const p = (i + 0.5) / n;
    // Approximate inverse normal (Beasley-Springer-Moro)
    const t = p < 0.5 ? Math.sqrt(-2 * Math.log(p)) : Math.sqrt(-2 * Math.log(1 - p));
    const theoretical = (p < 0.5 ? -1 : 1) * (t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t));
    return { t: theoretical, s: v };
  });
  const tMin = Math.min(...qqPts.map(p => p.t)), tMax = Math.max(...qqPts.map(p => p.t));
  const sMin = Math.min(...qqPts.map(p => p.s)), sMax = Math.max(...qqPts.map(p => p.s));
  // Reference line
  ctx.strokeStyle = MUTED();
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(b3.x, b3.y + b3.h);
  ctx.lineTo(b3.x + b3.w, b3.y);
  ctx.stroke();
  ctx.setLineDash([]);
  qqPts.forEach(p => {
    const px = b3.x + ((p.t - tMin) / (tMax - tMin || 1)) * b3.w;
    const py = b3.y + b3.h - ((p.s - sMin) / (sMax - sMin || 1)) * b3.h;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fillStyle = GREEN; ctx.fill();
  });

  // (4) Residual Histogram
  const b4 = panelBounds(1, 1);
  drawAxes(b4, 'Residual', 'Count');
  const nBins = 15;
  const binW = (rMax - rMin) / nBins || 1;
  const bins = new Array(nBins).fill(0);
  f.residuals.forEach(v => {
    const bi = Math.min(Math.floor((v - rMin) / binW), nBins - 1);
    bins[bi]++;
  });
  const maxBin = Math.max(...bins, 1);
  const barW = b4.w / nBins;
  bins.forEach((count, i) => {
    const bh = (count / maxBin) * b4.h;
    ctx.fillStyle = ORANGE;
    ctx.fillRect(b4.x + i * barW + 1, b4.y + b4.h - bh, barW - 2, bh);
  });

  // Hints
  const resStd = Math.sqrt(f.residuals.reduce((a, v) => a + v * v, 0) / n);
  checkHints('regression-diagnostics', {
    hasResidualPattern: s.relationship !== 'linear',
    qqDeviation: s.relationship !== 'linear' || s.noise > 3,
    heteroscedastic: false,
    r2High: f.r2 > 0.9,
    autocorrelated: f.dw < 1.2 || f.dw > 2.8,
  });

  checkChallenges('regression-diagnostics', {
    perfectFit: f.r2 > 0.95 && s.relationship === 'linear',
    patternHunter: s.relationship === 'quadratic',
  });
}

ENGINE.setRDN = function(v) { rdState.n = v; };
ENGINE.setRDNoise = function(v) { rdState.noise = v; };
ENGINE.setRDRel = function(v) { rdState.relationship = v; };
ENGINE.generateRD = function() { rdGenerate(); drawRD(); };
ENGINE.resetRD = function() {
  rdState = { points: [], n: 50, noise: 1, relationship: 'linear', fit: null };
  document.getElementById('rdN').value = 50;     document.getElementById('rdNV').textContent = '50';
  document.getElementById('rdNoise').value = 1;   document.getElementById('rdNoiseV').textContent = '1';
  document.getElementById('rdRel').value = 'linear';
  drawRD();
};


/* ═══════════════════════════════════════════════════════════════
   7. PROBABILITY CALCULATOR
   ═══════════════════════════════════════════════════════════════ */

let pcState = { pA: 0.3, pBA: 0.8, pBNotA: 0.1, calculated: false };

function pcCalc() {
  const s = pcState;
  const pB = s.pBA * s.pA + s.pBNotA * (1 - s.pA);
  const pAB = (s.pBA * s.pA) / pB;
  const pNotAB = 1 - pAB;
  const lr = s.pBA / s.pBNotA;
  s.calculated = true;
  return { pB, pAB, pNotAB, lr };
}

function drawPC() {
  const r = setupCanvas('pcCanvas');
  if (!r) return;
  const { ctx, w, h } = r;
  const s = pcState;

  ctx.clearRect(0, 0, w, h);

  const res = pcCalc();
  document.getElementById('pcPB').textContent = res.pB.toFixed(4);
  document.getElementById('pcPAB').textContent = res.pAB.toFixed(4);
  document.getElementById('pcPNotAB').textContent = res.pNotAB.toFixed(4);
  document.getElementById('pcLR').textContent = res.lr.toFixed(4);

  const pad = { top: 30, bottom: 20, left: 40, right: 40 };
  const treeW = w - pad.left - pad.right;
  const treeH = h - pad.top - pad.bottom;

  // Tree layout
  const rootX = pad.left + 30;
  const rootY = pad.top + treeH / 2;
  const col1X = pad.left + treeW * 0.3;
  const col2X = pad.left + treeW * 0.65;
  const resultX = pad.left + treeW * 0.85;

  const aY = pad.top + treeH * 0.25;
  const notAY = pad.top + treeH * 0.75;

  const baY = pad.top + treeH * 0.12;
  const notBaY = pad.top + treeH * 0.38;
  const bNotAY = pad.top + treeH * 0.62;
  const notBNotAY = pad.top + treeH * 0.88;

  function drawBranch(x1, y1, x2, y2, prob, color, thick) {
    ctx.strokeStyle = color;
    ctx.lineWidth = thick ? 3 : 1.5;
    ctx.globalAlpha = thick ? 1 : 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - 8;
    ctx.fillStyle = color;
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(prob.toFixed(3), mx, my);
  }

  function drawNode(x, y, label, color, highlight) {
    const r = highlight ? 18 : 14;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = highlight ? color : BG();
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = highlight ? BG() : color;
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    ctx.textBaseline = 'alphabetic';
  }

  // Highlighted path: root → A → B|A (shows P(A|B) derivation)
  const isHighPath = res.pAB > 0.5;

  // Branches: root → A, root → ¬A
  drawBranch(rootX, rootY, col1X, aY, s.pA, BLUE, isHighPath);
  drawBranch(rootX, rootY, col1X, notAY, 1 - s.pA, RED, !isHighPath);

  // Branches: A → B|A, A → ¬B|A
  drawBranch(col1X, aY, col2X, baY, s.pBA, GREEN, isHighPath);
  drawBranch(col1X, aY, col2X, notBaY, 1 - s.pBA, MUTED(), false);

  // Branches: ¬A → B|¬A, ¬A → ¬B|¬A
  drawBranch(col1X, notAY, col2X, bNotAY, s.pBNotA, ORANGE, !isHighPath);
  drawBranch(col1X, notAY, col2X, notBNotAY, 1 - s.pBNotA, MUTED(), false);

  // Nodes
  drawNode(rootX, rootY, '⊙', TEXT(), false);
  drawNode(col1X, aY, 'A', BLUE, isHighPath);
  drawNode(col1X, notAY, '¬A', RED, !isHighPath);
  drawNode(col2X, baY, 'B', GREEN, isHighPath);
  drawNode(col2X, notBaY, '¬B', MUTED(), false);
  drawNode(col2X, bNotAY, 'B', ORANGE, !isHighPath);
  drawNode(col2X, notBNotAY, '¬B', MUTED(), false);

  // Joint probabilities at leaf level
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillStyle = TEXT();
  const jp1 = s.pA * s.pBA;
  const jp2 = s.pA * (1 - s.pBA);
  const jp3 = (1 - s.pA) * s.pBNotA;
  const jp4 = (1 - s.pA) * (1 - s.pBNotA);
  ctx.fillText(`= ${jp1.toFixed(4)}`, col2X + 24, baY + 4);
  ctx.fillText(`= ${jp2.toFixed(4)}`, col2X + 24, notBaY + 4);
  ctx.fillText(`= ${jp3.toFixed(4)}`, col2X + 24, bNotAY + 4);
  ctx.fillText(`= ${jp4.toFixed(4)}`, col2X + 24, notBNotAY + 4);

  // Result panel
  ctx.fillStyle = PURPLE;
  ctx.font = `bold 14px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText(`P(A|B) = ${res.pAB.toFixed(4)}`, resultX, h / 2 - 20);
  ctx.fillStyle = TEXT();
  ctx.font = `11px ${MONO()}`;
  ctx.fillText(`P(B) = ${res.pB.toFixed(4)}`, resultX, h / 2 + 5);
  ctx.fillText(`LR = ${res.lr.toFixed(2)}`, resultX, h / 2 + 22);

  // Title
  ctx.fillStyle = TEXT();
  ctx.font = `bold 13px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Bayes\' Theorem Probability Tree', w / 2, 16);

  // Hints
  checkHints('probability-calculator', {
    baseRateTrap: s.pA < 0.05 && s.pBA > 0.9 && res.pAB < 0.5,
    highLR: res.lr > 5,
    priorMatters: s.calculated,
    complementShown: s.calculated,
    rareEvent: s.pA < 0.05,
  });

  // Challenges
  checkChallenges('probability-calculator', {
    baseRateChallenge: s.pA <= 0.01 && s.pBA >= 0.99 && s.pBNotA >= 0.05 && res.pAB < 0.2,
    certaintyCh: res.pAB > 0.95,
  });
}

ENGINE.setPCA = function(v) { pcState.pA = v; drawPC(); };
ENGINE.setPCBA = function(v) { pcState.pBA = v; drawPC(); };
ENGINE.setPCBNotA = function(v) { pcState.pBNotA = v; drawPC(); };
ENGINE.calcPC = function() { drawPC(); };
ENGINE.resetPC = function() {
  pcState = { pA: 0.3, pBA: 0.8, pBNotA: 0.1, calculated: false };
  document.getElementById('pcPA').value = 0.3;   document.getElementById('pcPAV').textContent = '0.3';
  document.getElementById('pcPBA').value = 0.8;   document.getElementById('pcPBAV').textContent = '0.8';
  document.getElementById('pcPBNA').value = 0.1;  document.getElementById('pcPBNAV').textContent = '0.1';
  drawPC();
};


/* ═══════════════════════════════════════════════════════════════
   DRAWS DISPATCH — maps topic ID to draw function
   ═══════════════════════════════════════════════════════════════ */

const DRAWS = {
  'distribution-explorer': function() { deGenerate(); drawDE(); },
  'hypothesis-testing':    function() { drawHT(); },
  'correlation-playground':function() { drawCP(); },
  'central-limit-theorem': function() { cltGeneratePopulation(); drawCLT(); },
  'bayesian-updater':      function() { drawBayes(); },
  'regression-diagnostics':function() { rdGenerate(); drawRD(); },
  'probability-calculator':function() { drawPC(); },
};
