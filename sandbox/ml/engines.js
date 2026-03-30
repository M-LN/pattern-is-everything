/* ═══════════════════════════════════════════════════════════════
   ML Lab — Interactive Engines
   Canvas-based ML sandbox activities
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

const BLUE = '#4fc3f7';
const COLORS = ['#4fc3f7', '#81c784', '#e57373', '#ffb74d', '#ce93d8', '#4dd0e1'];
const MUTED = () => css('--muted') || '#666';
const BORDER = () => css('--border') || '#222';
const BG = () => css('--bg') || '#fff';
const SURFACE = () => css('--surface') || '#f5f5f5';
const TEXT = () => css('--text') || '#1a1a1a';
const MONO = () => css('--mono') || 'IBM Plex Mono, monospace';

/* ═══════════════════════════════════════════════════════════════
   LINEAR REGRESSION
   ═══════════════════════════════════════════════════════════════ */

const LR = {
  points: [],
  m: 0, b: 0,
  fitted: false,
  animating: false,
  iteration: 0,
  mse: 0,
  // Canvas coordinate system: data space mapped to pixel space
  // Data range: x ∈ [0, 10], y ∈ [0, 10]
  xMin: 0, xMax: 10, yMin: 0, yMax: 10,
};

function lrToPixel(s, dx, dy) {
  const padX = 50, padY = 40;
  const plotW = s.w - padX * 2;
  const plotH = s.h - padY * 2;
  return {
    px: padX + ((dx - LR.xMin) / (LR.xMax - LR.xMin)) * plotW,
    py: padY + (1 - (dy - LR.yMin) / (LR.yMax - LR.yMin)) * plotH,
  };
}

function lrFromPixel(s, px, py) {
  const padX = 50, padY = 40;
  const plotW = s.w - padX * 2;
  const plotH = s.h - padY * 2;
  return {
    dx: LR.xMin + ((px - padX) / plotW) * (LR.xMax - LR.xMin),
    dy: LR.yMax - ((py - padY) / plotH) * (LR.yMax - LR.yMin),
  };
}

function drawLR() {
  const s = setupCanvas('lrCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const padX = 50, padY = 40;
  const plotW = w - padX * 2;
  const plotH = h - padY * 2;

  ctx.clearRect(0, 0, w, h);

  // Background grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 10; i += 2) {
    const p = lrToPixel(s, i, 0);
    ctx.beginPath(); ctx.moveTo(p.px, padY); ctx.lineTo(p.px, padY + plotH); ctx.stroke();
    const q = lrToPixel(s, 0, i);
    ctx.beginPath(); ctx.moveTo(padX, q.py); ctx.lineTo(padX + plotW, q.py); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Axes
  ctx.strokeStyle = MUTED();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX, padY);
  ctx.lineTo(padX, padY + plotH);
  ctx.lineTo(padX + plotW, padY + plotH);
  ctx.stroke();

  // Axis labels
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  for (let i = 0; i <= 10; i += 2) {
    const p = lrToPixel(s, i, 0);
    ctx.fillText(i, p.px, padY + plotH + 16);
  }
  ctx.textAlign = 'right';
  for (let i = 0; i <= 10; i += 2) {
    const p = lrToPixel(s, 0, i);
    ctx.fillText(i, padX - 8, p.py + 4);
  }

  // Draw regression line (if fitted)
  if (LR.fitted || LR.animating) {
    const p1 = lrToPixel(s, LR.xMin, LR.m * LR.xMin + LR.b);
    const p2 = lrToPixel(s, LR.xMax, LR.m * LR.xMax + LR.b);
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(clamp(p1.px, padX, padX + plotW), clamp(p1.py, padY, padY + plotH));
    ctx.lineTo(clamp(p2.px, padX, padX + plotW), clamp(p2.py, padY, padY + plotH));
    ctx.stroke();

    // Residual lines
    ctx.strokeStyle = 'rgba(229,115,115,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    LR.points.forEach(pt => {
      const predicted = LR.m * pt.x + LR.b;
      const pData = lrToPixel(s, pt.x, pt.y);
      const pLine = lrToPixel(s, pt.x, predicted);
      ctx.beginPath();
      ctx.moveTo(pData.px, pData.py);
      ctx.lineTo(pLine.px, pLine.py);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  // Draw data points
  LR.points.forEach(pt => {
    const p = lrToPixel(s, pt.x, pt.y);
    ctx.beginPath();
    ctx.arc(p.px, p.py, 6, 0, Math.PI * 2);
    ctx.fillStyle = BLUE;
    ctx.fill();
    ctx.strokeStyle = BG();
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Empty state message
  if (LR.points.length === 0) {
    ctx.fillStyle = MUTED();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Click anywhere to place data points', w / 2, h / 2);
  }
}

// Click handler for placing points
function onLRClick(e) {
  if (LR.animating) return;
  const canvas = document.getElementById('lrCanvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  const s = { w: rect.width, h: rect.height };
  const d = lrFromPixel(s, px, py);
  if (d.dx >= LR.xMin && d.dx <= LR.xMax && d.dy >= LR.yMin && d.dy <= LR.yMax) {
    LR.points.push({ x: d.dx, y: d.dy });
    LR.fitted = false;
    drawLR();
    checkHints('linear-regression', { pointCount: LR.points.length });
  }
}

// Gradient descent animation
ENGINE.fitLine = function() {
  if (LR.points.length < 2 || LR.animating) return;
  const lr = parseFloat(document.getElementById('lrRate').value);
  const maxIter = parseInt(document.getElementById('lrIter').value);
  const n = LR.points.length;

  LR.m = 0;
  LR.b = 0;
  LR.iteration = 0;
  LR.animating = true;
  LR.fitted = false;

  function step() {
    // Compute gradients
    let dm = 0, db = 0;
    LR.points.forEach(pt => {
      const pred = LR.m * pt.x + LR.b;
      const err = pred - pt.y;
      dm += (2 / n) * err * pt.x;
      db += (2 / n) * err;
    });

    LR.m -= lr * dm;
    LR.b -= lr * db;
    LR.iteration++;

    // Compute MSE
    let totalErr = 0;
    LR.points.forEach(pt => {
      totalErr += (pt.y - (LR.m * pt.x + LR.b)) ** 2;
    });
    LR.mse = totalErr / n;

    // Update display
    document.getElementById('lrMSE').textContent = LR.mse.toFixed(4);
    document.getElementById('lrSlope').textContent = LR.m.toFixed(4);
    document.getElementById('lrIntercept').textContent = LR.b.toFixed(4);
    document.getElementById('lrIterC').textContent = LR.iteration;

    drawLR();

    if (LR.iteration < maxIter) {
      requestAnimationFrame(step);
    } else {
      LR.animating = false;
      LR.fitted = true;
      checkHints('linear-regression', {
        pointCount: LR.points.length,
        mse: LR.mse,
        learningRate: lr,
        fitted: true,
      });
      checkChallenges('linear-regression', {
        mse: LR.mse,
        fitted: true,
        iterations: LR.iteration,
      });
    }
  }

  requestAnimationFrame(step);
};

ENGINE.addNoise = function() {
  if (LR.animating) return;
  if (LR.points.length === 0) {
    // Generate a default line with noise
    for (let i = 0; i < 15; i++) {
      const x = 1 + Math.random() * 8;
      const y = 0.7 * x + 2 + gauss() * 1.2;
      LR.points.push({ x: clamp(x, 0.2, 9.8), y: clamp(y, 0.2, 9.8) });
    }
  } else {
    // Add noise to existing points
    LR.points.forEach(pt => {
      pt.y = clamp(pt.y + gauss() * 0.8, 0.2, 9.8);
    });
  }
  LR.fitted = false;
  drawLR();
  checkHints('linear-regression', { pointCount: LR.points.length });
};

ENGINE.resetLR = function() {
  LR.points = [];
  LR.m = 0;
  LR.b = 0;
  LR.fitted = false;
  LR.animating = false;
  LR.iteration = 0;
  LR.mse = 0;
  document.getElementById('lrMSE').textContent = '—';
  document.getElementById('lrSlope').textContent = '—';
  document.getElementById('lrIntercept').textContent = '—';
  document.getElementById('lrIterC').textContent = '—';
  drawLR();
};


/* ═══════════════════════════════════════════════════════════════
   K-MEANS CLUSTERING
   ═══════════════════════════════════════════════════════════════ */

const KM = {
  points: [],       // {x, y, cluster: -1}
  centroids: [],    // {x, y}
  k: 3,
  stepCount: 0,
  converged: false,
  runCount: 0,
  animating: false,
  inertia: 0,
};

function kmToPixel(s, dx, dy) {
  const padX = 50, padY = 40;
  const plotW = s.w - padX * 2;
  const plotH = s.h - padY * 2;
  return {
    px: padX + (dx / 10) * plotW,
    py: padY + (1 - dy / 10) * plotH,
  };
}

function kmFromPixel(s, px, py) {
  const padX = 50, padY = 40;
  const plotW = s.w - padX * 2;
  const plotH = s.h - padY * 2;
  return {
    dx: ((px - padX) / plotW) * 10,
    dy: (1 - (py - padY) / plotH) * 10,
  };
}

function drawKM() {
  const s = setupCanvas('kmCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const padX = 50, padY = 40;
  const plotW = w - padX * 2;
  const plotH = h - padY * 2;

  ctx.clearRect(0, 0, w, h);

  // Draw Voronoi-like regions if we have centroids
  if (KM.centroids.length > 0 && KM.stepCount > 0) {
    const imgData = ctx.createImageData(w, h);
    for (let px = padX; px < padX + plotW; px += 3) {
      for (let py = padY; py < padY + plotH; py += 3) {
        const d = kmFromPixel(s, px, py);
        let minDist = Infinity, closest = 0;
        KM.centroids.forEach((c, i) => {
          const dist = (d.dx - c.x) ** 2 + (d.dy - c.y) ** 2;
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        const color = COLORS[closest % COLORS.length];
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        // Fill 3x3 block
        for (let dx = 0; dx < 3 && px + dx < w; dx++) {
          for (let dy = 0; dy < 3 && py + dy < h; dy++) {
            const idx = ((py + dy) * w + (px + dx)) * 4;
            imgData.data[idx] = r;
            imgData.data[idx + 1] = g;
            imgData.data[idx + 2] = b;
            imgData.data[idx + 3] = 20; // very transparent
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 10; i += 2) {
    const p = kmToPixel(s, i, 0);
    ctx.beginPath(); ctx.moveTo(p.px, padY); ctx.lineTo(p.px, padY + plotH); ctx.stroke();
    const q = kmToPixel(s, 0, i);
    ctx.beginPath(); ctx.moveTo(padX, q.py); ctx.lineTo(padX + plotW, q.py); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Axes
  ctx.strokeStyle = MUTED();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX, padY);
  ctx.lineTo(padX, padY + plotH);
  ctx.lineTo(padX + plotW, padY + plotH);
  ctx.stroke();

  // Draw points
  KM.points.forEach(pt => {
    const p = kmToPixel(s, pt.x, pt.y);
    ctx.beginPath();
    ctx.arc(p.px, p.py, 5, 0, Math.PI * 2);
    ctx.fillStyle = pt.cluster >= 0 ? COLORS[pt.cluster % COLORS.length] : MUTED();
    ctx.fill();
    ctx.strokeStyle = BG();
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Draw centroids
  KM.centroids.forEach((c, i) => {
    const p = kmToPixel(s, c.x, c.y);
    // Outer ring
    ctx.beginPath();
    ctx.arc(p.px, p.py, 12, 0, Math.PI * 2);
    ctx.strokeStyle = COLORS[i % COLORS.length];
    ctx.lineWidth = 2.5;
    ctx.stroke();
    // Inner dot
    ctx.beginPath();
    ctx.arc(p.px, p.py, 5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    // Label
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(`C${i + 1}`, p.px, p.py - 16);
  });

  // Empty state
  if (KM.points.length === 0) {
    ctx.fillStyle = MUTED();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Click anywhere to place data points', w / 2, h / 2);
  }
}

// Click handler for placing points
function onKMClick(e) {
  if (KM.animating) return;
  const canvas = document.getElementById('kmCanvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  const s = { w: rect.width, h: rect.height };
  const d = kmFromPixel(s, px, py);
  if (d.dx >= 0.2 && d.dx <= 9.8 && d.dy >= 0.2 && d.dy <= 9.8) {
    KM.points.push({ x: d.dx, y: d.dy, cluster: -1 });
    drawKM();
    checkHints('k-means', { pointCount: KM.points.length });
  }
}

function initCentroids() {
  KM.k = parseInt(document.getElementById('kmK').value);
  KM.centroids = [];
  KM.stepCount = 0;
  KM.converged = false;
  // Random initialization from data range
  for (let i = 0; i < KM.k; i++) {
    KM.centroids.push({
      x: 1 + Math.random() * 8,
      y: 1 + Math.random() * 8,
    });
  }
  KM.points.forEach(p => p.cluster = -1);
}

function kmStep() {
  if (KM.points.length < KM.k) return false;

  // Assignment step
  let changed = false;
  KM.points.forEach(pt => {
    let minDist = Infinity, closest = 0;
    KM.centroids.forEach((c, i) => {
      const dist = (pt.x - c.x) ** 2 + (pt.y - c.y) ** 2;
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (pt.cluster !== closest) { pt.cluster = closest; changed = true; }
  });

  // Update step — move centroids to cluster means
  KM.centroids.forEach((c, i) => {
    const members = KM.points.filter(p => p.cluster === i);
    if (members.length > 0) {
      c.x = members.reduce((s, p) => s + p.x, 0) / members.length;
      c.y = members.reduce((s, p) => s + p.y, 0) / members.length;
    }
  });

  // Compute inertia
  KM.inertia = 0;
  KM.points.forEach(pt => {
    if (pt.cluster >= 0) {
      const c = KM.centroids[pt.cluster];
      KM.inertia += (pt.x - c.x) ** 2 + (pt.y - c.y) ** 2;
    }
  });

  KM.stepCount++;
  return changed;
}

ENGINE.stepKM = function() {
  if (KM.points.length < 2) return;
  if (KM.centroids.length === 0 || KM.converged) {
    initCentroids();
    KM.runCount++;
  }
  const changed = kmStep();
  if (!changed && KM.stepCount > 1) {
    KM.converged = true;
    document.getElementById('kmStatus').textContent = 'Converged ✓';
  } else {
    document.getElementById('kmStatus').textContent = 'Iterating…';
  }
  document.getElementById('kmStep').textContent = KM.stepCount;
  document.getElementById('kmInertia').textContent = KM.inertia.toFixed(2);
  drawKM();
  checkHints('k-means', {
    pointCount: KM.points.length,
    k: KM.k,
    converged: KM.converged,
    stepCount: KM.stepCount,
    runCount: KM.runCount,
    pointGroups: estimateGroups(),
  });
  if (KM.converged) {
    checkChallenges('k-means', {
      converged: true,
      stepCount: KM.stepCount,
      k: KM.k,
    });
  }
};

ENGINE.runKM = function() {
  if (KM.points.length < 2 || KM.animating) return;
  if (KM.centroids.length === 0 || KM.converged) {
    initCentroids();
    KM.runCount++;
  }
  KM.animating = true;
  function animate() {
    const changed = kmStep();
    document.getElementById('kmStep').textContent = KM.stepCount;
    document.getElementById('kmInertia').textContent = KM.inertia.toFixed(2);
    drawKM();
    if (changed && KM.stepCount < 100) {
      document.getElementById('kmStatus').textContent = 'Iterating…';
      setTimeout(animate, 200);
    } else {
      KM.converged = true;
      KM.animating = false;
      document.getElementById('kmStatus').textContent = 'Converged ✓';
      checkHints('k-means', {
        pointCount: KM.points.length,
        k: KM.k,
        converged: true,
        stepCount: KM.stepCount,
        runCount: KM.runCount,
        pointGroups: estimateGroups(),
      });
      checkChallenges('k-means', {
        converged: true,
        stepCount: KM.stepCount,
        k: KM.k,
      });
    }
  }
  animate();
};

ENGINE.randomData = function() {
  KM.points = [];
  KM.centroids = [];
  KM.stepCount = 0;
  KM.converged = false;
  // Generate 3 natural clusters
  const centers = [
    { x: 2.5, y: 7 }, { x: 7, y: 7.5 }, { x: 5, y: 2.5 },
  ];
  centers.forEach(ctr => {
    const count = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      KM.points.push({
        x: clamp(ctr.x + gauss() * 1, 0.3, 9.7),
        y: clamp(ctr.y + gauss() * 1, 0.3, 9.7),
        cluster: -1,
      });
    }
  });
  document.getElementById('kmStep').textContent = '0';
  document.getElementById('kmStatus').textContent = 'Ready';
  document.getElementById('kmInertia').textContent = '—';
  drawKM();
  checkHints('k-means', { pointCount: KM.points.length });
};

ENGINE.resetKM = function() {
  KM.points = [];
  KM.centroids = [];
  KM.stepCount = 0;
  KM.converged = false;
  KM.animating = false;
  KM.inertia = 0;
  document.getElementById('kmStep').textContent = '0';
  document.getElementById('kmStatus').textContent = 'Place points';
  document.getElementById('kmInertia').textContent = '—';
  drawKM();
};

function estimateGroups() {
  // Rough estimate of natural groups using simple gap detection
  if (KM.points.length < 5) return KM.points.length;
  return 3; // default heuristic
}


/* ═══════════════════════════════════════════════════════════════
   HINTS SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const shownHints = JSON.parse(sessionStorage.getItem('sb-ml-hints') || '{}');

function checkHints(activityId, state) {
  const activityHints = HINTS[activityId];
  if (!activityHints) return;

  activityHints.forEach(hint => {
    if (shownHints[hint.id]) return;

    let triggered = false;
    try {
      // Evaluate simple trigger conditions
      const trigger = hint.trigger;
      if (trigger.includes('>=')) {
        const [key, val] = trigger.split('>=');
        triggered = (state[key.trim()] >= parseFloat(val));
      } else if (trigger.includes('<=')) {
        const [key, val] = trigger.split('<=');
        triggered = (state[key.trim()] <= parseFloat(val));
      } else if (trigger.includes('>')) {
        const [key, val] = trigger.split('>');
        triggered = (state[key.trim()] > parseFloat(val));
      } else if (trigger.includes('<')) {
        const [key, val] = trigger.split('<');
        triggered = (state[key.trim()] < parseFloat(val));
      } else if (trigger.includes('==')) {
        const [key, val] = trigger.split('==');
        triggered = (state[key.trim()] == val.trim());
      } else if (state[trigger]) {
        triggered = true;
      }
    } catch (_) {}

    if (triggered) {
      showHint(activityId, hint);
      shownHints[hint.id] = true;
      sessionStorage.setItem('sb-ml-hints', JSON.stringify(shownHints));
    }
  });
}

function showHint(activityId, hint) {
  const panel = document.getElementById('hints-' + activityId);
  if (!panel) return;

  const hintEl = document.createElement('div');
  hintEl.className = 'hint-item hint-enter';
  hintEl.innerHTML = `<span class="hint-icon">💡</span><span class="hint-text">${hint.message}</span>`;
  panel.appendChild(hintEl);

  // Animate in
  requestAnimationFrame(() => {
    hintEl.classList.remove('hint-enter');
    hintEl.classList.add('hint-visible');
  });

  // Auto-hide after 10s
  setTimeout(() => {
    hintEl.classList.add('hint-exit');
    setTimeout(() => hintEl.remove(), 400);
  }, 10000);
}


/* ═══════════════════════════════════════════════════════════════
   CHALLENGES SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const challengeProgress = JSON.parse(localStorage.getItem('sb-ml-challenges') || '{}');
let activeChallenge = {};

function toggleChallenge(activityId) {
  const panel = document.getElementById('challenge-' + activityId);
  if (!panel) return;

  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    renderChallenges(activityId);
  } else {
    panel.style.display = 'none';
    activeChallenge[activityId] = null;
  }
}

function renderChallenges(activityId) {
  const panel = document.getElementById('challenge-' + activityId);
  const challenges = CHALLENGES[activityId];
  if (!challenges || !panel) return;

  panel.innerHTML = '<div class="challenge-header">🎯 Challenges</div>' +
    challenges.map(ch => {
      const done = challengeProgress[ch.id];
      const isActive = activeChallenge[activityId] === ch.id;
      return `<div class="challenge-item ${done ? 'done' : ''} ${isActive ? 'active' : ''}">
        <div class="challenge-status">${done ? '✓' : isActive ? '▶' : '○'}</div>
        <div class="challenge-info">
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-obj">${ch.objective}</div>
        </div>
        ${!done ? `<button class="challenge-start" onclick="startChallenge('${activityId}','${ch.id}')">
          ${isActive ? 'Active' : 'Start'}
        </button>` : ''}
      </div>`;
    }).join('');
}

function startChallenge(activityId, challengeId) {
  activeChallenge[activityId] = challengeId;
  renderChallenges(activityId);
}

function checkChallenges(activityId, state) {
  const chId = activeChallenge[activityId];
  if (!chId) return;
  const challenges = CHALLENGES[activityId];
  const ch = challenges.find(c => c.id === chId);
  if (!ch || challengeProgress[ch.id]) return;

  let passed = false;
  try {
    // Evaluate check function
    const parts = ch.checkFn.split('&&');
    passed = parts.every(part => {
      part = part.trim();
      if (part.includes('<')) {
        const [key, val] = part.split('<');
        return state[key.trim()] < parseFloat(val);
      } else if (part.includes('>')) {
        const [key, val] = part.split('>');
        return state[key.trim()] > parseFloat(val);
      } else if (part.includes('==')) {
        const [key, val] = part.split('==');
        return state[key.trim()] == val.trim();
      } else {
        return !!state[part.trim()];
      }
    });
  } catch (_) {}

  if (passed) {
    challengeProgress[ch.id] = true;
    localStorage.setItem('sb-ml-challenges', JSON.stringify(challengeProgress));
    activeChallenge[activityId] = null;
    renderChallenges(activityId);
    showChallengeComplete(activityId);
  }
}

function showChallengeComplete(activityId) {
  // Draw celebration particles on the active canvas
  const canvasId = activityId === 'linear-regression' ? 'lrCanvas' : 'kmCanvas';
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width / DPR;
  const h = canvas.height / DPR;

  let particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: w / 2, y: h / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 3,
      r: 2 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
    });
  }

  let frame = 0;
  function animateParticles() {
    // Redraw underlying canvas first
    if (activityId === 'linear-regression') drawLR();
    else drawKM();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life -= 0.02;
      if (p.life > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    frame++;
    if (frame < 60) requestAnimationFrame(animateParticles);
  }
  animateParticles();
}


/* ═══════════════════════════════════════════════════════════════
   CLASSIFICATION BOUNDARY
   ═══════════════════════════════════════════════════════════════ */

const CB = {
  points: [],   // {x, y, label: 0|1}
  algo: 'knn',
  trained: false,
  boundary: null,  // ImageData cache
  accuracy: 0,
};

function cbToPixel(s, dx, dy) {
  const p = 50, pw = s.w - 100, ph = s.h - 80;
  return { px: p + (dx / 10) * pw, py: p + (1 - dy / 10) * ph };
}
function cbFromPixel(s, px, py) {
  const p = 50, pw = s.w - 100, ph = s.h - 80;
  return { dx: ((px - p) / pw) * 10, dy: (1 - (py - p) / ph) * 10 };
}

function drawCB() {
  const s = setupCanvas('cbCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const padX = 50, padY = 40;
  const plotW = w - padX * 2, plotH = h - padY * 2;
  ctx.clearRect(0, 0, w, h);

  // Draw boundary if trained
  if (CB.trained && CB.boundary) {
    ctx.putImageData(CB.boundary, 0, 0);
  }

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 10; i += 2) {
    const p = cbToPixel(s, i, 0);
    ctx.beginPath(); ctx.moveTo(p.px, padY); ctx.lineTo(p.px, padY + plotH); ctx.stroke();
    const q = cbToPixel(s, 0, i);
    ctx.beginPath(); ctx.moveTo(padX, q.py); ctx.lineTo(padX + plotW, q.py); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Data points
  CB.points.forEach(pt => {
    const p = cbToPixel(s, pt.x, pt.y);
    ctx.beginPath();
    ctx.arc(p.px, p.py, 6, 0, Math.PI * 2);
    ctx.fillStyle = pt.label === 0 ? BLUE : '#e57373';
    ctx.fill();
    ctx.strokeStyle = BG();
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  if (CB.points.length === 0) {
    ctx.fillStyle = MUTED();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Click = Class A (blue) | Shift+Click = Class B (red)', w / 2, h / 2);
  }
}

function onCBClick(e) {
  const canvas = document.getElementById('cbCanvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const px = e.clientX - rect.left, py = e.clientY - rect.top;
  const s = { w: rect.width, h: rect.height };
  const d = cbFromPixel(s, px, py);
  if (d.dx >= 0.2 && d.dx <= 9.8 && d.dy >= 0.2 && d.dy <= 9.8) {
    CB.points.push({ x: d.dx, y: d.dy, label: e.shiftKey ? 1 : 0 });
    CB.trained = false;
    CB.boundary = null;
    updateCBMetrics();
    drawCB();
    const countA = CB.points.filter(p => p.label === 0).length;
    const countB = CB.points.filter(p => p.label === 1).length;
    checkHints('classification-boundary', {
      pointCount: CB.points.length,
      imbalanced: countA > 0 && countB > 0 && (countA > countB * 3 || countB > countA * 3),
    });
  }
}

function knnClassify(x, y, k) {
  const dists = CB.points.map(p => ({
    dist: (p.x - x) ** 2 + (p.y - y) ** 2,
    label: p.label,
  })).sort((a, b) => a.dist - b.dist);
  const topK = dists.slice(0, k);
  const votes = [0, 0];
  topK.forEach(d => votes[d.label]++);
  return votes[0] >= votes[1] ? 0 : 1;
}

function logisticClassify(x, y, weights) {
  const z = weights[0] + weights[1] * x + weights[2] * y;
  return 1 / (1 + Math.exp(-z)) >= 0.5 ? 0 : 1;
}

function trainLogistic() {
  const lr = 0.1;
  const w = [0, 0, 0];
  for (let epoch = 0; epoch < 200; epoch++) {
    CB.points.forEach(pt => {
      const z = w[0] + w[1] * pt.x + w[2] * pt.y;
      const pred = 1 / (1 + Math.exp(-z));
      const target = pt.label === 0 ? 1 : 0;
      const err = target - pred;
      w[0] += lr * err;
      w[1] += lr * err * pt.x;
      w[2] += lr * err * pt.y;
    });
  }
  return w;
}

ENGINE.setCBAlgo = function(val) { CB.algo = val; };

ENGINE.trainCB = function() {
  if (CB.points.length < 2) return;
  const countA = CB.points.filter(p => p.label === 0).length;
  const countB = CB.points.filter(p => p.label === 1).length;
  if (countA === 0 || countB === 0) return;

  const canvas = document.getElementById('cbCanvas');
  if (!canvas) return;
  const w = canvas.width / DPR, h = canvas.height / DPR;
  const k = parseInt(document.getElementById('cbK').value);

  let weights = null;
  if (CB.algo === 'logistic') weights = trainLogistic();

  const imgData = canvas.getContext('2d').createImageData(w * DPR, h * DPR);

  // Paint boundary at every 3rd pixel
  for (let px = 0; px < w; px += 2) {
    for (let py = 0; py < h; py += 2) {
      const d = cbFromPixel({ w, h }, px, py);
      if (d.dx < 0 || d.dx > 10 || d.dy < 0 || d.dy > 10) continue;
      const label = CB.algo === 'knn' ? knnClassify(d.dx, d.dy, k) : logisticClassify(d.dx, d.dy, weights);
      const r = label === 0 ? 79 : 229, g = label === 0 ? 195 : 115, b = label === 0 ? 247 : 115;
      for (let dx = 0; dx < 2 * DPR && (px * DPR + dx) < w * DPR; dx++) {
        for (let dy = 0; dy < 2 * DPR && (py * DPR + dy) < h * DPR; dy++) {
          const idx = ((py * DPR + dy) * w * DPR + (px * DPR + dx)) * 4;
          imgData.data[idx] = r;
          imgData.data[idx + 1] = g;
          imgData.data[idx + 2] = b;
          imgData.data[idx + 3] = 25;
        }
      }
    }
  }

  CB.boundary = imgData;
  CB.trained = true;

  // Compute accuracy
  let correct = 0;
  CB.points.forEach(pt => {
    const pred = CB.algo === 'knn' ? knnClassify(pt.x, pt.y, k) : logisticClassify(pt.x, pt.y, weights);
    if (pred === pt.label) correct++;
  });
  CB.accuracy = Math.round((correct / CB.points.length) * 100);
  updateCBMetrics();
  drawCB();

  checkHints('classification-boundary', {
    trained: true,
    k: k,
    pointCount: CB.points.length,
  });
  checkChallenges('classification-boundary', {
    accuracy: CB.accuracy,
    kHigh: k >= 5,
  });
};

ENGINE.sampleCB = function() {
  CB.points = [];
  CB.trained = false;
  CB.boundary = null;
  // Two clusters
  for (let i = 0; i < 15; i++) {
    CB.points.push({ x: clamp(3 + gauss() * 1.2, 0.3, 9.7), y: clamp(7 + gauss() * 1.2, 0.3, 9.7), label: 0 });
    CB.points.push({ x: clamp(7 + gauss() * 1.2, 0.3, 9.7), y: clamp(3 + gauss() * 1.2, 0.3, 9.7), label: 1 });
  }
  updateCBMetrics();
  drawCB();
};

ENGINE.resetCB = function() {
  CB.points = [];
  CB.trained = false;
  CB.boundary = null;
  CB.accuracy = 0;
  updateCBMetrics();
  drawCB();
};

function updateCBMetrics() {
  const a = CB.points.filter(p => p.label === 0).length;
  const b = CB.points.filter(p => p.label === 1).length;
  document.getElementById('cbCountA').textContent = a;
  document.getElementById('cbCountB').textContent = b;
  document.getElementById('cbAccuracy').textContent = CB.trained ? CB.accuracy + '%' : '—';
}


/* ═══════════════════════════════════════════════════════════════
   NEURAL NETWORK BUILDER
   ═══════════════════════════════════════════════════════════════ */

const NN = {
  data: [],       // {x, y, label: 0|1}
  weights: null,
  epoch: 0,
  lossHistory: [],
  dataset: 'xor',
  trained: false,
};

function nnGenerateData(type) {
  const pts = [];
  const n = 100;
  if (type === 'xor') {
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
      pts.push({ x, y, label: (x > 0) !== (y > 0) ? 1 : 0 });
    }
  } else if (type === 'circle') {
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
      pts.push({ x, y, label: x * x + y * y < 0.5 ? 1 : 0 });
    }
  } else if (type === 'spiral') {
    for (let i = 0; i < n / 2; i++) {
      const r = i / (n / 2) * 1;
      const t = 1.75 * i / (n / 2) * 2 * Math.PI;
      pts.push({ x: r * Math.cos(t) + gauss() * 0.08, y: r * Math.sin(t) + gauss() * 0.08, label: 0 });
      pts.push({ x: -r * Math.cos(t) + gauss() * 0.08, y: -r * Math.sin(t) + gauss() * 0.08, label: 1 });
    }
  } else {
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
      pts.push({ x, y, label: y > 0.3 * x + 0.1 ? 1 : 0 });
    }
  }
  return pts;
}

// Simple 2-input, 1-hidden-layer, 1-output network
function nnInit() {
  const nHidden = parseInt(document.getElementById('nnNeurons')?.value || 4);
  // Xavier init
  const scale1 = Math.sqrt(2 / 2);
  const scale2 = Math.sqrt(2 / nHidden);
  NN.weights = {
    w1: Array.from({ length: nHidden }, () => [gauss() * scale1, gauss() * scale1]),
    b1: Array.from({ length: nHidden }, () => 0),
    w2: Array.from({ length: nHidden }, () => gauss() * scale2),
    b2: 0,
    nHidden,
  };
  NN.epoch = 0;
  NN.lossHistory = [];
  NN.trained = false;
}

function nnActivate(x, fn) {
  if (fn === 'relu') return Math.max(0, x);
  if (fn === 'sigmoid') return 1 / (1 + Math.exp(-x));
  if (fn === 'tanh') return Math.tanh(x);
  return x;
}

function nnActivateDeriv(output, fn) {
  if (fn === 'relu') return output > 0 ? 1 : 0;
  if (fn === 'sigmoid') return output * (1 - output);
  if (fn === 'tanh') return 1 - output * output;
  return 1;
}

function nnForward(x, y) {
  const W = NN.weights;
  const act = document.getElementById('nnActivation')?.value || 'relu';
  const hidden = [];
  for (let j = 0; j < W.nHidden; j++) {
    const z = W.w1[j][0] * x + W.w1[j][1] * y + W.b1[j];
    hidden.push(nnActivate(z, act));
  }
  let out = W.b2;
  for (let j = 0; j < W.nHidden; j++) out += W.w2[j] * hidden[j];
  out = 1 / (1 + Math.exp(-out)); // sigmoid output
  return { hidden, out };
}

function nnTrainStep() {
  const W = NN.weights;
  const lr = parseFloat(document.getElementById('nnLR')?.value || 0.5);
  const act = document.getElementById('nnActivation')?.value || 'relu';
  let totalLoss = 0;

  NN.data.forEach(pt => {
    const { hidden, out } = nnForward(pt.x, pt.y);
    const target = pt.label;
    const err = out - target;
    totalLoss += err * err;

    // Output layer gradient
    const dOut = err * out * (1 - out);
    W.b2 -= lr * dOut;
    for (let j = 0; j < W.nHidden; j++) {
      const dW2 = dOut * hidden[j];
      const dHidden = dOut * W.w2[j] * nnActivateDeriv(hidden[j], act);
      W.w2[j] -= lr * dW2;
      W.w1[j][0] -= lr * dHidden * pt.x;
      W.w1[j][1] -= lr * dHidden * pt.y;
      W.b1[j] -= lr * dHidden;
    }
  });

  NN.epoch++;
  const avgLoss = totalLoss / NN.data.length;
  NN.lossHistory.push(avgLoss);
  return avgLoss;
}

function drawNN() {
  const s = setupCanvas('nnCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  if (NN.data.length === 0) {
    NN.data = nnGenerateData(NN.dataset);
    nnInit();
  }

  ctx.clearRect(0, 0, w, h);

  const boundaryW = Math.floor(w * 0.6);
  const lossW = w - boundaryW - 20;

  // Left: decision boundary + data
  const bx = 10, by = 30, bw = boundaryW - 20, bh = h - 60;

  // Draw boundary if weights exist
  if (NN.weights && NN.epoch > 0) {
    const resolution = 4;
    for (let px = bx; px < bx + bw; px += resolution) {
      for (let py = by; py < by + bh; py += resolution) {
        const dx = ((px - bx) / bw) * 2 - 1;
        const dy = ((py - by) / bh) * 2 - 1;
        const { out } = nnForward(dx, dy);
        const r = Math.round(79 + (229 - 79) * out);
        const g = Math.round(195 + (115 - 195) * out);
        const b2 = Math.round(247 + (115 - 247) * out);
        ctx.fillStyle = `rgba(${r},${g},${b2},0.15)`;
        ctx.fillRect(px, py, resolution, resolution);
      }
    }
  }

  // Border
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.strokeRect(bx, by, bw, bh);

  // Data points
  NN.data.forEach(pt => {
    const px = bx + ((pt.x + 1) / 2) * bw;
    const py = by + ((pt.y + 1) / 2) * bh;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = pt.label === 0 ? BLUE : '#e57373';
    ctx.fill();
  });

  // Label
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Decision Boundary', bx + bw / 2, by - 8);

  // Right: loss curve
  const lx = boundaryW + 10, ly = 30, lw = lossW - 10, lh = h - 60;
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.strokeRect(lx, ly, lw, lh);

  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Loss Curve', lx + lw / 2, ly - 8);

  if (NN.lossHistory.length > 1) {
    const maxLoss = Math.max(...NN.lossHistory, 0.01);
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    NN.lossHistory.forEach((loss, i) => {
      const x = lx + (i / (NN.lossHistory.length - 1)) * lw;
      const y = ly + lh - (loss / maxLoss) * lh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = MUTED();
    ctx.font = `9px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(maxLoss.toFixed(2), lx - 4, ly + 10);
    ctx.fillText('0', lx - 4, ly + lh);
  }
}

ENGINE.trainNN = function() {
  const dataset = document.getElementById('nnDataset')?.value || 'xor';
  if (dataset !== NN.dataset || NN.data.length === 0) {
    NN.dataset = dataset;
    NN.data = nnGenerateData(dataset);
    nnInit();
  }
  if (!NN.weights) nnInit();

  let i = 0;
  const batchSize = 50;
  function step() {
    const loss = nnTrainStep();
    document.getElementById('nnEpoch').textContent = NN.epoch;
    document.getElementById('nnLoss').textContent = loss.toFixed(4);
    drawNN();
    i++;
    if (i < batchSize) requestAnimationFrame(step);
    else {
      NN.trained = true;
      const act = document.getElementById('nnActivation')?.value || 'relu';
      checkHints('neural-network', {
        epoch: NN.epoch,
        lossHigh: loss > 0.2,
        datasetXOR: NN.dataset === 'xor',
        activationRelu: act === 'relu',
      });
      checkChallenges('neural-network', {
        loss: loss,
        datasetXOR: NN.dataset === 'xor',
        neuronCount: NN.weights.nHidden,
      });
    }
  }
  requestAnimationFrame(step);
};

ENGINE.resetNN = function() {
  NN.data = [];
  NN.weights = null;
  NN.epoch = 0;
  NN.lossHistory = [];
  NN.trained = false;
  document.getElementById('nnEpoch').textContent = '0';
  document.getElementById('nnLoss').textContent = '—';
  drawNN();
};


/* ═══════════════════════════════════════════════════════════════
   FEATURE SCALING DEMO
   ═══════════════════════════════════════════════════════════════ */

const FS = {
  rawData: [],     // {f1, f2, y}
  method: 'minmax',
  rawPath: [],     // GD path on raw data
  scaledPath: [],  // GD path on scaled data
  rawConverged: false,
  scaledConverged: false,
  triedMethods: {},
};

function fsGenerateData() {
  FS.rawData = [];
  for (let i = 0; i < 30; i++) {
    const f1 = 100 + Math.random() * 900;   // large scale
    const f2 = 0.1 + Math.random() * 0.9;   // small scale
    const y = 0.02 * f1 + 3 * f2 + gauss() * 2;
    FS.rawData.push({ f1, f2, y });
  }
  FS.rawPath = [];
  FS.scaledPath = [];
  FS.rawConverged = false;
  FS.scaledConverged = false;
}

function fsScale(data, method) {
  const f1s = data.map(d => d.f1), f2s = data.map(d => d.f2);
  if (method === 'minmax') {
    const f1Min = Math.min(...f1s), f1Max = Math.max(...f1s);
    const f2Min = Math.min(...f2s), f2Max = Math.max(...f2s);
    return data.map(d => ({
      f1: (d.f1 - f1Min) / (f1Max - f1Min || 1),
      f2: (d.f2 - f2Min) / (f2Max - f2Min || 1),
      y: d.y,
    }));
  } else if (method === 'zscore') {
    const f1Mean = f1s.reduce((a, b) => a + b, 0) / f1s.length;
    const f2Mean = f2s.reduce((a, b) => a + b, 0) / f2s.length;
    const f1Std = Math.sqrt(f1s.reduce((a, b) => a + (b - f1Mean) ** 2, 0) / f1s.length) || 1;
    const f2Std = Math.sqrt(f2s.reduce((a, b) => a + (b - f2Mean) ** 2, 0) / f2s.length) || 1;
    return data.map(d => ({ f1: (d.f1 - f1Mean) / f1Std, f2: (d.f2 - f2Mean) / f2Std, y: d.y }));
  } else {
    // Robust: IQR
    const sorted1 = [...f1s].sort((a, b) => a - b);
    const sorted2 = [...f2s].sort((a, b) => a - b);
    const q1 = arr => arr[Math.floor(arr.length * 0.25)];
    const q3 = arr => arr[Math.floor(arr.length * 0.75)];
    const med = arr => arr[Math.floor(arr.length * 0.5)];
    const iqr1 = q3(sorted1) - q1(sorted1) || 1;
    const iqr2 = q3(sorted2) - q1(sorted2) || 1;
    const med1 = med(sorted1), med2 = med(sorted2);
    return data.map(d => ({ f1: (d.f1 - med1) / iqr1, f2: (d.f2 - med2) / iqr2, y: d.y }));
  }
}

function fsGradientDescent(data, maxIter) {
  let w1 = 0, w2 = 0;
  const lr = 0.01;
  const path = [{ w1, w2 }];
  for (let iter = 0; iter < maxIter; iter++) {
    let dw1 = 0, dw2 = 0;
    data.forEach(d => {
      const pred = w1 * d.f1 + w2 * d.f2;
      const err = pred - d.y;
      dw1 += err * d.f1;
      dw2 += err * d.f2;
    });
    dw1 /= data.length;
    dw2 /= data.length;
    w1 -= lr * dw1;
    w2 -= lr * dw2;
    path.push({ w1, w2 });
    if (Math.abs(dw1) < 1e-6 && Math.abs(dw2) < 1e-6) break;
  }
  return path;
}

function drawFS() {
  const s = setupCanvas('fsCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  if (FS.rawData.length === 0) fsGenerateData();

  ctx.clearRect(0, 0, w, h);
  const halfW = Math.floor(w / 2) - 15;

  // Draw two scatter plots side by side
  drawFSPanel(ctx, 10, 30, halfW, h - 50, 'Raw Data', FS.rawData, FS.rawPath, '#e57373');
  const scaled = fsScale(FS.rawData, FS.method);
  drawFSPanel(ctx, halfW + 25, 30, halfW, h - 50, 'Scaled (' + FS.method + ')', scaled, FS.scaledPath, '#81c784');

  // Divider
  ctx.strokeStyle = BORDER();
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(w / 2, 20);
  ctx.lineTo(w / 2, h - 10);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawFSPanel(ctx, ox, oy, pw, ph, label, data, gdPath, color) {
  const f1s = data.map(d => d.f1), f2s = data.map(d => d.f2);
  const f1Min = Math.min(...f1s), f1Max = Math.max(...f1s);
  const f2Min = Math.min(...f2s), f2Max = Math.max(...f2s);
  const f1R = f1Max - f1Min || 1, f2R = f2Max - f2Min || 1;

  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.strokeRect(ox, oy, pw, ph);

  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText(label, ox + pw / 2, oy - 8);

  // Data points
  data.forEach(d => {
    const x = ox + 10 + ((d.f1 - f1Min) / f1R) * (pw - 20);
    const y = oy + ph - 10 - ((d.f2 - f2Min) / f2R) * (ph - 20);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = BLUE;
    ctx.fill();
  });

  // GD path
  if (gdPath.length > 1) {
    const wRange = gdPath.reduce((acc, p) => ({
      w1Min: Math.min(acc.w1Min, p.w1), w1Max: Math.max(acc.w1Max, p.w1),
      w2Min: Math.min(acc.w2Min, p.w2), w2Max: Math.max(acc.w2Max, p.w2),
    }), { w1Min: Infinity, w1Max: -Infinity, w2Min: Infinity, w2Max: -Infinity });
    const w1R = wRange.w1Max - wRange.w1Min || 1;
    const w2R = wRange.w2Max - wRange.w2Min || 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    gdPath.forEach((p, i) => {
      const x = ox + 10 + ((p.w1 - wRange.w1Min) / w1R) * (pw - 20);
      const y = oy + ph - 10 - ((p.w2 - wRange.w2Min) / w2R) * (ph - 20);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // End dot
    const last = gdPath[gdPath.length - 1];
    const lx = ox + 10 + ((last.w1 - wRange.w1Min) / w1R) * (pw - 20);
    const ly = oy + ph - 10 - ((last.w2 - wRange.w2Min) / w2R) * (ph - 20);
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Iteration count
    ctx.fillStyle = color;
    ctx.font = `bold 11px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText((gdPath.length - 1) + ' iters', ox + pw / 2, oy + ph + 14);
  }
}

ENGINE.setFSMethod = function(v) {
  FS.method = v;
  FS.scaledPath = [];
  FS.scaledConverged = false;
  drawFS();
};

ENGINE.runFS = function() {
  if (FS.rawData.length === 0) fsGenerateData();
  FS.rawPath = fsGradientDescent(FS.rawData, 500);
  const scaled = fsScale(FS.rawData, FS.method);
  FS.scaledPath = fsGradientDescent(scaled, 500);
  FS.rawConverged = true;
  FS.scaledConverged = true;
  FS.triedMethods[FS.method] = true;

  document.getElementById('fsRawIter').textContent = FS.rawPath.length - 1;
  document.getElementById('fsScaledIter').textContent = FS.scaledPath.length - 1;
  const speedup = ((FS.rawPath.length - 1) / Math.max(1, FS.scaledPath.length - 1)).toFixed(1);
  document.getElementById('fsSpeedup').textContent = speedup + 'x';
  drawFS();

  checkHints('feature-scaling', {
    showRaw: true,
    methodMinmax: FS.method === 'minmax',
    methodZscore: FS.method === 'zscore',
    bothConverged: true,
  });
  checkChallenges('feature-scaling', {
    scaledIter: FS.scaledPath.length - 1,
    scaledConverged: true,
    triedAll: FS.triedMethods.minmax && FS.triedMethods.zscore && FS.triedMethods.robust,
  });
};

ENGINE.newFSData = function() {
  fsGenerateData();
  document.getElementById('fsRawIter').textContent = '—';
  document.getElementById('fsScaledIter').textContent = '—';
  document.getElementById('fsSpeedup').textContent = '—';
  drawFS();
};

ENGINE.resetFS = function() {
  FS.rawPath = [];
  FS.scaledPath = [];
  FS.rawConverged = false;
  FS.scaledConverged = false;
  document.getElementById('fsRawIter').textContent = '—';
  document.getElementById('fsScaledIter').textContent = '—';
  document.getElementById('fsSpeedup').textContent = '—';
  drawFS();
};


/* ═══════════════════════════════════════════════════════════════
   TIMESERIES FORECASTING
   ═══════════════════════════════════════════════════════════════ */

const TS = {
  data: [],
  forecast: [],
  method: 'ma',
  mae: 0,
  rmse: 0,
};

function tsGenerateData() {
  const n = 80;
  const data = [];
  const trend = (Math.random() - 0.3) * 0.5;
  const seasonPeriod = 10 + Math.floor(Math.random() * 10);
  const seasonAmp = 5 + Math.random() * 15;
  const baseLevel = 30 + Math.random() * 40;
  for (let i = 0; i < n; i++) {
    const t = baseLevel + trend * i + seasonAmp * Math.sin(2 * Math.PI * i / seasonPeriod) + gauss() * 3;
    data.push(Math.max(0, t));
  }
  return data;
}

function tsMovingAvg(data, window) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) { result.push(null); continue; }
    let sum = 0;
    for (let j = i - window + 1; j <= i; j++) sum += data[j];
    result.push(sum / window);
  }
  return result;
}

function tsExpSmooth(data, alpha) {
  const result = [data[0]];
  for (let i = 1; i < data.length; i++) {
    result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
  }
  return result;
}

function drawTS() {
  const s = setupCanvas('tsCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  if (TS.data.length === 0) TS.data = tsGenerateData();

  ctx.clearRect(0, 0, w, h);
  const padL = 50, padR = 15, padT = 25, padB = 30;
  const plotW = w - padL - padR, plotH = h - padT - padB;

  const allVals = [...TS.data, ...TS.forecast.filter(v => v !== null)];
  let yMin = Math.min(...allVals), yMax = Math.max(...allVals);
  const yPad = (yMax - yMin) * 0.1 || 5;
  yMin -= yPad; yMax += yPad;

  function valY(v) { return padT + plotH * (1 - (v - yMin) / (yMax - yMin)); }
  function timeX(i) { return padL + (i / (TS.data.length - 1)) * plotW; }

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 4; i++) {
    const v = yMin + (yMax - yMin) * (i / 4);
    const y = valY(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(v.toFixed(0), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Axes
  ctx.strokeStyle = MUTED();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, padT + plotH);
  ctx.lineTo(padL + plotW, padT + plotH);
  ctx.stroke();

  // Data line
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  TS.data.forEach((v, i) => {
    const x = timeX(i), y = valY(v);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Forecast line
  if (TS.forecast.length > 0) {
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    TS.forecast.forEach((v, i) => {
      if (v === null) return;
      const x = timeX(i), y = valY(v);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Legend
  ctx.fillStyle = BLUE;
  ctx.fillRect(padL + 10, padT + 5, 20, 3);
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('Actual', padL + 35, padT + 10);
  if (TS.forecast.length > 0) {
    ctx.fillStyle = '#e57373';
    ctx.fillRect(padL + 90, padT + 5, 20, 3);
    ctx.fillStyle = MUTED();
    ctx.fillText('Forecast', padL + 115, padT + 10);
  }

  document.getElementById('tsPoints').textContent = TS.data.length;
}

ENGINE.setTSMethod = function(v) {
  TS.method = v;
  const wRow = document.getElementById('tsWindowRow');
  const aRow = document.getElementById('tsAlphaRow');
  if (wRow) wRow.style.display = v === 'ma' ? 'flex' : 'none';
  if (aRow) aRow.style.display = v === 'es' ? 'flex' : 'none';
};

ENGINE.forecastTS = function() {
  if (TS.data.length === 0) TS.data = tsGenerateData();
  if (TS.method === 'ma') {
    const win = parseInt(document.getElementById('tsWindow')?.value || 5);
    TS.forecast = tsMovingAvg(TS.data, win);
  } else {
    const alpha = parseFloat(document.getElementById('tsAlpha')?.value || 0.3);
    TS.forecast = tsExpSmooth(TS.data, alpha);
  }

  // Compute errors
  let sumAE = 0, sumSE = 0, count = 0;
  TS.data.forEach((v, i) => {
    if (TS.forecast[i] === null || TS.forecast[i] === undefined) return;
    sumAE += Math.abs(v - TS.forecast[i]);
    sumSE += (v - TS.forecast[i]) ** 2;
    count++;
  });
  TS.mae = count > 0 ? sumAE / count : 0;
  TS.rmse = count > 0 ? Math.sqrt(sumSE / count) : 0;

  document.getElementById('tsMAE').textContent = TS.mae.toFixed(2);
  document.getElementById('tsRMSE').textContent = TS.rmse.toFixed(2);
  drawTS();

  const alpha = parseFloat(document.getElementById('tsAlpha')?.value || 0.3);
  checkHints('timeseries-forecast', {
    methodMA: TS.method === 'ma',
    methodES: TS.method === 'es',
    alphaLow: alpha < 0.15,
    alphaHigh: alpha > 0.8,
    hasSeason: true,
  });
  checkChallenges('timeseries-forecast', {
    mae: TS.mae,
    rmse: TS.rmse,
    methodES: TS.method === 'es',
  });
};

ENGINE.newTSData = function() {
  TS.data = tsGenerateData();
  TS.forecast = [];
  TS.mae = 0;
  TS.rmse = 0;
  document.getElementById('tsMAE').textContent = '—';
  document.getElementById('tsRMSE').textContent = '—';
  drawTS();
};

ENGINE.resetTS = function() {
  TS.forecast = [];
  TS.mae = 0;
  TS.rmse = 0;
  document.getElementById('tsMAE').textContent = '—';
  document.getElementById('tsRMSE').textContent = '—';
  drawTS();
};


/* ═══════════════════════════════════════════════════════════════
   DRAW DISPATCH (compatible with show() pattern)
   ═══════════════════════════════════════════════════════════════ */

const DRAWS = {
  'linear-regression': function() {
    drawLR();
    // Attach click handler
    const c = document.getElementById('lrCanvas');
    if (c && !c._lrBound) {
      c.addEventListener('click', onLRClick);
      c._lrBound = true;
    }
    // Bind slider updates
    const rate = document.getElementById('lrRate');
    const iter = document.getElementById('lrIter');
    if (rate && !rate._bound) {
      rate.addEventListener('input', () => { document.getElementById('lrRateV').textContent = parseFloat(rate.value).toFixed(3); });
      rate._bound = true;
    }
    if (iter && !iter._bound) {
      iter.addEventListener('input', () => { document.getElementById('lrIterV').textContent = iter.value; });
      iter._bound = true;
    }
  },
  'k-means': function() {
    drawKM();
    // Attach click handler
    const c = document.getElementById('kmCanvas');
    if (c && !c._kmBound) {
      c.addEventListener('click', onKMClick);
      c._kmBound = true;
    }
    // Bind slider
    const kSlider = document.getElementById('kmK');
    if (kSlider && !kSlider._bound) {
      kSlider.addEventListener('input', () => {
        document.getElementById('kmKV').textContent = kSlider.value;
        KM.k = parseInt(kSlider.value);
      });
      kSlider._bound = true;
    }
  },
  'classification-boundary': function() {
    drawCB();
    const c = document.getElementById('cbCanvas');
    if (c && !c._cbBound) {
      c.addEventListener('click', onCBClick);
      c._cbBound = true;
    }
    const kSlider = document.getElementById('cbK');
    if (kSlider && !kSlider._bound) {
      kSlider.addEventListener('input', () => { document.getElementById('cbKV').textContent = kSlider.value; });
      kSlider._bound = true;
    }
  },
  'neural-network': function() {
    drawNN();
    const nSlider = document.getElementById('nnNeurons');
    if (nSlider && !nSlider._bound) {
      nSlider.addEventListener('input', () => {
        document.getElementById('nnNeuronsV').textContent = nSlider.value;
        document.getElementById('nnTotalN').textContent = nSlider.value;
      });
      nSlider._bound = true;
    }
    const lrSlider = document.getElementById('nnLR');
    if (lrSlider && !lrSlider._bound) {
      lrSlider.addEventListener('input', () => { document.getElementById('nnLRV').textContent = parseFloat(lrSlider.value).toFixed(2); });
      lrSlider._bound = true;
    }
  },
  'feature-scaling': function() {
    drawFS();
  },
  'timeseries-forecast': function() {
    drawTS();
    const wSlider = document.getElementById('tsWindow');
    if (wSlider && !wSlider._bound) {
      wSlider.addEventListener('input', () => { document.getElementById('tsWindowV').textContent = wSlider.value; });
      wSlider._bound = true;
    }
    const aSlider = document.getElementById('tsAlpha');
    if (aSlider && !aSlider._bound) {
      aSlider.addEventListener('input', () => { document.getElementById('tsAlphaV').textContent = parseFloat(aSlider.value).toFixed(2); });
      aSlider._bound = true;
    }
  },
};

// Resize handler
window.addEventListener('resize', () => {
  if (typeof currentTopic !== 'undefined' && DRAWS[currentTopic]) {
    DRAWS[currentTopic]();
  }
});
