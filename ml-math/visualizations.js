/* ═══════════════════════════════════════════════════════════════
   ML Math — Visualizations Engine
   Canvas-based interactive visualizations for all 37+ topics
   ═══════════════════════════════════════════════════════════════ */

const DRAWS = {};
const DPR = window.devicePixelRatio || 1;

/* ── Helpers ── */
function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const rect = c.parentElement.getBoundingClientRect();
  const w = rect.width - 2;
  c.style.width = w + 'px';
  c.width = w * DPR;
  c.height = parseInt(c.getAttribute('height') || 240) * DPR;
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w, h: parseInt(c.getAttribute('height') || 240) };
}

function getCSS(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a, b, t) { return a + (b - a) * t; }

/* ═══════════════════════════════════════════════════════════════
   01 — Vectors & Matrices
   ═══════════════════════════════════════════════════════════════ */
DRAWS['vectors'] = function() {
  const s = setupCanvas('vecCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35;
  const aA = document.getElementById('vecA');
  const aB = document.getElementById('vecB');
  if (!aA || !aB) return;

  function draw() {
    const angA = +aA.value * Math.PI / 180;
    const angB = +aB.value * Math.PI / 180;
    document.getElementById('vecAv').textContent = aA.value + '°';
    document.getElementById('vecBv').textContent = aB.value + '°';

    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();

    // vectors
    const ax = cx + r * Math.cos(angA), ay = cy - r * Math.sin(angA);
    const bx = cx + r * Math.cos(angB), by = cy - r * Math.sin(angB);

    drawArrow(ctx, cx, cy, ax, ay, getCSS('--accent'), 2.5);
    drawArrow(ctx, cx, cy, bx, by, getCSS('--accent3'), 2.5);

    // labels
    ctx.font = '13px ' + getCSS('--mono');
    ctx.fillStyle = getCSS('--accent'); ctx.fillText('A', ax + 8, ay - 4);
    ctx.fillStyle = getCSS('--accent3'); ctx.fillText('B', bx + 8, by - 4);

    // dot product
    const dot = Math.cos(angA) * Math.cos(angB) + Math.sin(angA) * Math.sin(angB);
    document.getElementById('vecDot').textContent = dot.toFixed(3);

    // arc
    ctx.beginPath();
    ctx.arc(cx, cy, 30, -angB, -angA, angA > angB);
    ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1.5; ctx.stroke();
  }

  aA.oninput = draw; aB.oninput = draw;
  draw();
};

function drawArrow(ctx, x1, y1, x2, y2, color, lw) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.fillStyle = color; ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(ang - 0.3), y2 - 10 * Math.sin(ang - 0.3));
  ctx.lineTo(x2 - 10 * Math.cos(ang + 0.3), y2 - 10 * Math.sin(ang + 0.3));
  ctx.fill();
}

/* ═══════════════════════════════════════════════════════════════
   02 — Linear Regression
   ═══════════════════════════════════════════════════════════════ */
let linData;
DRAWS['linear'] = function() {
  const s = setupCanvas('linCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  if (!linData) {
    linData = [];
    for (let i = 0; i < 20; i++) {
      const x = -2 + 4 * Math.random();
      linData.push({ x, y: 0.8 * x + 0.3 + (Math.random() - 0.5) * 1.2 });
    }
  }
  const wSlider = document.getElementById('linW');
  const bSlider = document.getElementById('linB');
  if (!wSlider || !bSlider) return;

  function toScreen(vx, vy) {
    return { sx: (vx + 3) / 6 * w, sy: h - (vy + 3) / 6 * h };
  }

  function draw() {
    const cw = +wSlider.value, cb = +bSlider.value;
    document.getElementById('linWv').textContent = cw.toFixed(2);
    document.getElementById('linBv').textContent = cb.toFixed(2);
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
    const o = toScreen(0, 0);
    ctx.beginPath(); ctx.moveTo(0, o.sy); ctx.lineTo(w, o.sy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(o.sx, 0); ctx.lineTo(o.sx, h); ctx.stroke();
    // data
    let mse = 0;
    linData.forEach(d => {
      const p = toScreen(d.x, d.y);
      const pred = cw * d.x + cb;
      const pp = toScreen(d.x, pred);
      // error line
      ctx.strokeStyle = 'rgba(200,75,47,0.25)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(pp.sx, pp.sy); ctx.stroke();
      // point
      ctx.fillStyle = getCSS('--accent3');
      ctx.beginPath(); ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2); ctx.fill();
      mse += (d.y - pred) ** 2;
    });
    mse /= linData.length;
    document.getElementById('linMSE').textContent = mse.toFixed(3);
    // line
    const l1 = toScreen(-3, cw * -3 + cb), l2 = toScreen(3, cw * 3 + cb);
    ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(l1.sx, l1.sy); ctx.lineTo(l2.sx, l2.sy); ctx.stroke();
  }

  wSlider.oninput = draw; bSlider.oninput = draw;
  draw();

  // Best fit
  window.bestFit = function() {
    const n = linData.length;
    let sx = 0, sy = 0, sxy = 0, sx2 = 0;
    linData.forEach(d => { sx += d.x; sy += d.y; sxy += d.x * d.y; sx2 += d.x * d.x; });
    const bw = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
    const bb = (sy - bw * sx) / n;
    wSlider.value = bw.toFixed(2); bSlider.value = bb.toFixed(2);
    draw();
  };
};

/* ═══════════════════════════════════════════════════════════════
   03 — Logistic Regression
   ═══════════════════════════════════════════════════════════════ */
DRAWS['logistic'] = function() {
  const s = setupCanvas('logCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const wSl = document.getElementById('logW');
  const bSl = document.getElementById('logBias');
  if (!wSl || !bSl) return;

  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

  function draw() {
    const cw = +wSl.value, cb = +bSl.value;
    document.getElementById('logWv').textContent = cw.toFixed(1);
    document.getElementById('logBiasV').textContent = cb.toFixed(1);
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
    // sigmoid curve
    ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
      const x = (px / w) * 12 - 6;
      const y = sigmoid(cw * x + cb);
      const py = h - y * h * 0.9 - h * 0.05;
      if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // decision boundary (where sigmoid = 0.5 → wx+b=0 → x=-b/w)
    if (Math.abs(cw) > 0.01) {
      const dbx = -cb / cw;
      const px = ((dbx + 6) / 12) * w;
      if (px > 0 && px < w) {
        ctx.strokeStyle = getCSS('--accent2'); ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '11px ' + getCSS('--mono');
        ctx.fillStyle = getCSS('--accent2');
        ctx.fillText('boundary', px + 4, 16);
      }
    }
    // labels
    ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.fillText('P=1', 4, 16); ctx.fillText('P=0', 4, h - 6);
  }

  wSl.oninput = draw; bSl.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   04 — Gradient Descent
   ═══════════════════════════════════════════════════════════════ */
let gdAnim = null, gdX = 3.5;
DRAWS['gradient'] = function() {
  const s = setupCanvas('gdCanvas'); if (!s) return;
  drawGDStatic(s.ctx, s.w, s.h, gdX);
};

function drawGDStatic(ctx, w, h, x) {
  ctx.clearRect(0, 0, w, h);
  // loss landscape: L(x) = (x-0.5)^2 + 0.3*sin(3x) + 1
  const loss = t => (t - 0.5) ** 2 + 0.3 * Math.sin(3 * t) + 1;
  const maxL = 12;
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 2;
  ctx.beginPath();
  for (let px = 0; px <= w; px++) {
    const t = (px / w) * 7 - 1;
    const py = h - (loss(t) / maxL) * h * 0.85 - h * 0.05;
    if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  // ball
  const bx = ((x + 1) / 7) * w;
  const by = h - (loss(x) / maxL) * h * 0.85 - h * 0.05;
  ctx.fillStyle = getCSS('--accent');
  ctx.beginPath(); ctx.arc(bx, by, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = getCSS('--fg'); ctx.font = '11px ' + getCSS('--mono');
  ctx.fillText('L=' + loss(x).toFixed(2), bx + 12, by - 4);
}

window.runGD = function() {
  if (gdAnim) return;
  const s = setupCanvas('gdCanvas'); if (!s) return;
  const lr = +document.getElementById('gdLR').value;
  let steps = 0;
  const loss = t => (t - 0.5) ** 2 + 0.3 * Math.sin(3 * t) + 1;
  const grad = t => 2 * (t - 0.5) + 0.9 * Math.cos(3 * t);
  gdAnim = setInterval(() => {
    gdX -= lr * grad(gdX);
    gdX = Math.max(-1, Math.min(6, gdX));
    steps++;
    document.getElementById('gdSteps').textContent = steps;
    drawGDStatic(s.ctx, s.w, s.h, gdX);
    if (steps > 200 || Math.abs(grad(gdX)) < 0.001) { clearInterval(gdAnim); gdAnim = null; }
  }, 40);
};

window.resetGD = function() {
  if (gdAnim) { clearInterval(gdAnim); gdAnim = null; }
  gdX = 3.5;
  document.getElementById('gdSteps').textContent = '0';
  DRAWS['gradient']();
};

/* ═══════════════════════════════════════════════════════════════
   05 — Activation Functions
   ═══════════════════════════════════════════════════════════════ */
DRAWS['activation'] = function() { showAct('relu'); };

window.showAct = function(name) {
  const s = setupCanvas('actCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sigmoid = x => 1 / (1 + Math.exp(-x));
  const fns = {
    sigmoid: { f: sigmoid, d: x => sigmoid(x) * (1 - sigmoid(x)), range: [-6, 6], desc: 'Range (0,1). Saturates for |x|>4 → vanishing gradients.' },
    relu: { f: x => Math.max(0, x), d: x => x > 0 ? 1 : 0, range: [-4, 4], desc: 'Dead neurons for x<0, but fast and works great in practice.' },
    tanh: { f: Math.tanh, d: x => 1 - Math.tanh(x) ** 2, range: [-4, 4], desc: 'Range (-1,1). Zero-centered but still saturates.' },
    gelu: { f: x => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3))), d: null, range: [-4, 4], desc: 'Smooth ReLU variant. Default in BERT, GPT.' },
    silu: { f: x => x * sigmoid(x), d: null, range: [-4, 4], desc: 'x·σ(x). Non-monotonic. Used in LLaMA, EfficientNet.' },
  };
  const fn = fns[name]; if (!fn) return;

  ctx.clearRect(0, 0, w, h);
  const [lo, hi] = fn.range;
  const toX = v => (v - lo) / (hi - lo) * w;
  const toY = v => h / 2 - v * h * 0.25;
  // axes
  ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(0), 0); ctx.lineTo(toX(0), h); ctx.stroke();
  // function
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= w; px++) {
    const x = lo + (px / w) * (hi - lo);
    const y = toY(fn.f(x));
    if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
  }
  ctx.stroke();
  // derivative (dashed)
  if (fn.d) {
    ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
      const x = lo + (px / w) * (hi - lo);
      const y = toY(fn.d(x));
      if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
    }
    ctx.stroke(); ctx.setLineDash([]);
  }
  // label
  ctx.font = 'bold 13px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--accent'); ctx.fillText(name.toUpperCase(), 12, 20);
  ctx.font = '11px ' + getCSS('--sans'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText(fn.desc, 12, 38);
  // info box
  const info = document.getElementById('actInfo');
  if (info) info.innerHTML = `<span style="font-family:var(--mono);font-size:11px;color:var(--muted)">Solid = f(x) &nbsp;|&nbsp; Dashed = f'(x)</span>`;
};

/* ═══════════════════════════════════════════════════════════════
   06 — Bias-Variance
   ═══════════════════════════════════════════════════════════════ */
DRAWS['bias-variance'] = function() {
  const sl = document.getElementById('bvSlider');
  if (sl) drawBV(sl.value);
};

window.drawBV = function(val) {
  const s = setupCanvas('bvCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const v = +val;
  document.getElementById('bvVal').textContent = v.toFixed(1);
  ctx.clearRect(0, 0, w, h);
  const pad = 40;
  const pw = w - pad * 2, ph = h - pad * 2;
  // curves
  const n = 100;
  ctx.lineWidth = 2.5;
  for (let pass = 0; pass < 3; pass++) {
    ctx.strokeStyle = pass === 0 ? getCSS('--accent') : pass === 1 ? getCSS('--accent3') : getCSS('--accent4');
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = pad + t * pw;
      let y;
      if (pass === 0) y = 3 / (1 + t * 10); // bias²
      else if (pass === 1) y = 0.1 + t * t * 4; // variance
      else y = 3 / (1 + t * 10) + 0.1 + t * t * 4; // total
      const py = pad + ph - (y / 5) * ph;
      if (i === 0) ctx.moveTo(x, py); else ctx.lineTo(x, py);
    }
    ctx.stroke();
  }
  // marker
  const t = (v - 1) / 9;
  const mx = pad + t * pw;
  ctx.strokeStyle = getCSS('--fg'); ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(mx, pad); ctx.lineTo(mx, pad + ph); ctx.stroke();
  ctx.setLineDash([]);
  // values
  const bias2 = 3 / (1 + t * 10);
  const variance = 0.1 + t * t * 4;
  document.getElementById('bvBias').textContent = bias2.toFixed(2);
  document.getElementById('bvVar').textContent = variance.toFixed(2);
  // legend
  ctx.font = '11px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--accent'); ctx.fillText('Bias²', w - 100, pad + 15);
  ctx.fillStyle = getCSS('--accent3'); ctx.fillText('Variance', w - 100, pad + 30);
  ctx.fillStyle = getCSS('--accent4'); ctx.fillText('Total', w - 100, pad + 45);
  ctx.fillStyle = getCSS('--muted'); ctx.fillText('Complexity →', w / 2 - 30, h - 8);
};

/* ═══════════════════════════════════════════════════════════════
   07 — Loss Functions
   ═══════════════════════════════════════════════════════════════ */
DRAWS['loss'] = function() {
  const s = setupCanvas('lossCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const pad = 30;
  // draw curves
  const maxX = 3, maxY = 9;
  const funcs = [
    { name: 'MSE', fn: x => x * x, color: getCSS('--accent') },
    { name: 'MAE', fn: x => Math.abs(x), color: getCSS('--accent2') },
    { name: 'Huber', fn: x => Math.abs(x) <= 1 ? 0.5 * x * x : Math.abs(x) - 0.5, color: getCSS('--accent3') },
  ];
  funcs.forEach(f => {
    ctx.strokeStyle = f.color; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
      const x = (px / w) * maxX * 2 - maxX;
      const y = h - pad - (f.fn(x) / maxY) * (h - pad * 2);
      if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
    }
    ctx.stroke();
  });
  // legend
  ctx.font = '11px ' + getCSS('--mono');
  funcs.forEach((f, i) => {
    ctx.fillStyle = f.color;
    ctx.fillText(f.name, 10, 18 + i * 16);
  });
  // slider callback
  window.onErrSlider = function(val) {
    const v = +val;
    document.getElementById('errVal').textContent = v.toFixed(2);
    document.getElementById('mseP').textContent = (v * v).toFixed(3);
    document.getElementById('maeP').textContent = v.toFixed(3);
  };
};

/* ═══════════════════════════════════════════════════════════════
   08 — Backpropagation
   ═══════════════════════════════════════════════════════════════ */
let bpAnim = null;
DRAWS['backprop'] = function() {
  const s = setupCanvas('bpCanvas'); if (!s) return;
  drawBPState(s.ctx, s.w, s.h, -1);
};

function drawBPState(ctx, w, h, phase) {
  ctx.clearRect(0, 0, w, h);
  const layers = [{ x: w * 0.1, n: 3, label: 'Input' }, { x: w * 0.35, n: 4, label: 'Hidden 1' }, { x: w * 0.6, n: 4, label: 'Hidden 2' }, { x: w * 0.85, n: 2, label: 'Output' }];
  // connections
  for (let l = 0; l < layers.length - 1; l++) {
    const a = layers[l], b = layers[l + 1];
    for (let i = 0; i < a.n; i++) {
      for (let j = 0; j < b.n; j++) {
        const y1 = 40 + (i / (a.n - 1 || 1)) * (h - 80);
        const y2 = 40 + (j / (b.n - 1 || 1)) * (h - 80);
        let glow = false;
        if (phase === 0 && l <= 1) glow = true; // forward
        if (phase === 1 && l >= 1) glow = true; // backward
        ctx.strokeStyle = glow ? (phase === 0 ? getCSS('--accent3') : getCSS('--accent')) : getCSS('--border');
        ctx.lineWidth = glow ? 1.5 : 0.5;
        ctx.beginPath(); ctx.moveTo(a.x, y1); ctx.lineTo(b.x, y2); ctx.stroke();
      }
    }
  }
  // nodes
  layers.forEach(l => {
    for (let i = 0; i < l.n; i++) {
      const y = 40 + (i / (l.n - 1 || 1)) * (h - 80);
      ctx.fillStyle = getCSS('--card'); ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(l.x, y, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.textAlign = 'center'; ctx.fillText(l.label, l.x, h - 4); ctx.textAlign = 'start';
  });
  // phase label
  const labels = ['→ Forward Pass', '← Backward Pass (gradients)', '✓ Weight Update'];
  if (phase >= 0 && phase < labels.length) {
    ctx.font = 'bold 13px ' + getCSS('--mono');
    ctx.fillStyle = phase === 1 ? getCSS('--accent') : getCSS('--accent3');
    ctx.fillText(labels[phase], 10, 20);
  }
}

window.animBP = function() {
  if (bpAnim) return;
  const s = setupCanvas('bpCanvas'); if (!s) return;
  let phase = 0;
  drawBPState(s.ctx, s.w, s.h, phase);
  document.getElementById('bpMsg').textContent = 'Running...';
  bpAnim = setInterval(() => {
    phase++;
    if (phase > 2) { clearInterval(bpAnim); bpAnim = null; document.getElementById('bpMsg').textContent = 'Done'; return; }
    drawBPState(s.ctx, s.w, s.h, phase);
  }, 1200);
};

window.resetBP = function() {
  if (bpAnim) { clearInterval(bpAnim); bpAnim = null; }
  document.getElementById('bpMsg').textContent = 'Click Animate';
  DRAWS['backprop']();
};

/* ═══════════════════════════════════════════════════════════════
   09 — Optimizers
   ═══════════════════════════════════════════════════════════════ */
let optAnim = null;
DRAWS['optimizers'] = function() {
  const s = setupCanvas('optCanvas'); if (!s) return;
  drawOptSurface(s.ctx, s.w, s.h, []);
};

function drawOptSurface(ctx, w, h, paths) {
  ctx.clearRect(0, 0, w, h);
  // saddle-point-ish contours
  const cols = [getCSS('--border'), getCSS('--muted')];
  for (let r = 20; r < Math.max(w, h); r += 30) {
    ctx.strokeStyle = r % 60 === 0 ? cols[1] : cols[0];
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.ellipse(w * 0.3, h * 0.5, r, r * 0.6, 0.3, 0, Math.PI * 2); ctx.stroke();
  }
  // minimum marker
  ctx.fillStyle = getCSS('--accent2');
  ctx.beginPath(); ctx.arc(w * 0.3, h * 0.5, 5, 0, Math.PI * 2); ctx.fill();
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillText('min', w * 0.3 + 8, h * 0.5 + 4);
  // paths
  const pColors = [getCSS('--accent'), getCSS('--accent3'), getCSS('--accent4')];
  paths.forEach((path, pi) => {
    if (path.length < 2) return;
    ctx.strokeStyle = pColors[pi % pColors.length]; ctx.lineWidth = 2;
    ctx.beginPath();
    path.forEach((p, i) => { if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
    ctx.stroke();
    // current pos
    const last = path[path.length - 1];
    ctx.fillStyle = pColors[pi % pColors.length];
    ctx.beginPath(); ctx.arc(last[0], last[1], 5, 0, Math.PI * 2); ctx.fill();
  });
}

window.runOptAnim = function(type) {
  if (optAnim) { clearInterval(optAnim); optAnim = null; }
  const s = setupCanvas('optCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const target = [w * 0.3, h * 0.5];
  let pos = [w * 0.85, h * 0.15];
  let vel = [0, 0];
  const path = [pos.slice()];
  const lr = 0.03;

  optAnim = setInterval(() => {
    const dx = pos[0] - target[0], dy = pos[1] - target[1];
    let gx = dx * 0.02, gy = dy * 0.02;
    if (type === 'momentum' || type === 'adam') {
      vel[0] = 0.9 * vel[0] + gx; vel[1] = 0.9 * vel[1] + gy;
      gx = vel[0]; gy = vel[1];
    }
    if (type === 'adam') { gx *= 0.5; gy *= 0.5; }
    pos[0] -= lr * gx * (type === 'sgd' ? 30 : 20);
    pos[1] -= lr * gy * (type === 'sgd' ? 30 : 20);
    path.push(pos.slice());
    drawOptSurface(ctx, w, h, [path]);
    if (Math.abs(dx) < 3 && Math.abs(dy) < 3 || path.length > 200) { clearInterval(optAnim); optAnim = null; }
  }, 30);
};

window.resetOpt = function() {
  if (optAnim) { clearInterval(optAnim); optAnim = null; }
  DRAWS['optimizers']();
};

/* ═══════════════════════════════════════════════════════════════
   10 — Regularization
   ═══════════════════════════════════════════════════════════════ */
let currentReg = 'l2';
DRAWS['regularization'] = function() { drawReg('l2'); };

window.drawReg = function(type) {
  currentReg = type;
  const s = setupCanvas('regCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const lambda = +(document.getElementById('regLambda')?.value || 1);
  document.getElementById('regLVal').textContent = lambda.toFixed(1);
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.3 * lambda / 2;
  // constraint region
  ctx.fillStyle = type === 'l2' ? 'rgba(41,85,160,0.12)' : 'rgba(42,125,95,0.12)';
  ctx.strokeStyle = type === 'l2' ? getCSS('--accent3') : getCSS('--accent2');
  ctx.lineWidth = 2;
  if (type === 'l2') {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy);
    ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  // loss contours (ellipses offset)
  const lcx = cx + 60, lcy = cy - 40;
  for (let i = 1; i <= 5; i++) {
    ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(lcx, lcy, i * 25, i * 18, 0.3, 0, Math.PI * 2); ctx.stroke();
  }
  // optimal point (intersection)
  ctx.fillStyle = getCSS('--accent');
  ctx.beginPath(); ctx.arc(cx + r * 0.5, cy - r * 0.3, 6, 0, Math.PI * 2); ctx.fill();
  // labels
  ctx.font = '12px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--fg');
  ctx.fillText(type === 'l2' ? 'L2 (Ridge) — circle' : 'L1 (Lasso) — diamond', 10, 20);
  ctx.fillStyle = getCSS('--muted'); ctx.font = '10px ' + getCSS('--mono');
  ctx.fillText('Ellipses = loss contours', 10, 36);
};

/* ═══════════════════════════════════════════════════════════════
   11 — Batch Normalization
   ═══════════════════════════════════════════════════════════════ */
DRAWS['batchnorm'] = function() { drawBN(true); };

window.drawBN = function(withBN) {
  const s = setupCanvas('bnCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const layers = 5, barW = w / (layers * 3);
  for (let l = 0; l < layers; l++) {
    const x = (l / layers) * w + w / (layers * 2) - barW / 2;
    // Without BN: variance grows
    const spread = withBN ? 1 : Math.pow(1.5, l);
    const mean = withBN ? 0 : l * 0.3;
    // draw distribution bars
    for (let i = 0; i < 30; i++) {
      const val = mean + (Math.random() - 0.5) * spread * 2;
      const barH = Math.abs(val) * 15 + 2;
      const by = h / 2 - barH / 2 + val * 20;
      ctx.fillStyle = val > 0 ? getCSS('--accent3') : getCSS('--accent');
      ctx.globalAlpha = 0.5;
      ctx.fillRect(x + Math.random() * barW, by, 3, barH);
    }
    ctx.globalAlpha = 1;
    ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.textAlign = 'center';
    ctx.fillText('L' + (l + 1), x + barW / 2, h - 6);
  }
  ctx.textAlign = 'start';
  ctx.font = '12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  ctx.fillText(withBN ? '✓ With Batch Norm — stable' : '✗ Without — distributions shift', 10, 20);
};

/* ═══════════════════════════════════════════════════════════════
   12 — LR Scheduling
   ═══════════════════════════════════════════════════════════════ */
DRAWS['lr-schedule'] = function() { drawLR('cosine'); };

window.drawLR = function(type) {
  const s = setupCanvas('lrCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const pad = 30, pw = w - pad * 2, ph = h - pad * 2;
  const n = 200, maxLR = 0.01;

  const schedules = {
    step: t => t < 0.33 ? maxLR : t < 0.66 ? maxLR * 0.1 : maxLR * 0.01,
    cosine: t => maxLR * 0.5 * (1 + Math.cos(Math.PI * t)),
    warmup_cosine: t => t < 0.1 ? maxLR * (t / 0.1) : maxLR * 0.5 * (1 + Math.cos(Math.PI * (t - 0.1) / 0.9)),
    cyclic: t => maxLR * 0.5 * (1 + Math.cos(Math.PI * t * 6)),
  };

  const fn = schedules[type]; if (!fn) return;
  // axes
  ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, pad + ph); ctx.lineTo(pad + pw, pad + ph); ctx.stroke();
  // curve
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = pad + t * pw;
    const y = pad + ph - (fn(t) / maxLR) * ph;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // labels
  ctx.font = 'bold 12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent');
  ctx.fillText(type.replace('_', '+'), pad + 5, pad + 18);
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Epoch →', w / 2 - 20, h - 4);
  ctx.save(); ctx.translate(12, h / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('Learning Rate', 0, 0); ctx.restore();
};

/* ═══════════════════════════════════════════════════════════════
   13 — Weight Initialization
   ═══════════════════════════════════════════════════════════════ */
DRAWS['weight-init'] = function() { drawInit('he'); };

window.drawInit = function(method) {
  const s = setupCanvas('initCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const layers = 10, barW = (w - 60) / layers;

  for (let l = 0; l < layers; l++) {
    const fanIn = 256;
    let std;
    if (method === 'random') std = 1.0;
    else if (method === 'xavier') std = Math.sqrt(2 / (fanIn + fanIn));
    else std = Math.sqrt(2 / fanIn); // he

    // Simulate variance through layers
    let variance;
    if (method === 'random') variance = Math.pow(fanIn * 1.0, l) / Math.pow(fanIn, l) * Math.pow(1.3, l);
    else if (method === 'xavier') variance = 1.0 + l * 0.02;
    else variance = 1.0 + l * 0.01;

    variance = Math.min(variance, 50);
    const barH = Math.min(variance * 15, h - 40);
    const x = 30 + l * barW;
    const color = method === 'random' ? getCSS('--accent') : method === 'xavier' ? getCSS('--accent3') : getCSS('--accent2');
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(x + 4, h / 2 - barH / 2, barW - 8, barH);
    ctx.globalAlpha = 1;
    ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.textAlign = 'center';
    ctx.fillText('L' + (l + 1), x + barW / 2, h - 4);
  }
  ctx.textAlign = 'start';
  ctx.font = '12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  const descs = { random: 'Random N(0,1) → exploding activations', xavier: 'Xavier → stable (tanh/sigmoid)', he: 'He/Kaiming → stable (ReLU)' };
  ctx.fillText(descs[method], 10, 18);
};

/* ═══════════════════════════════════════════════════════════════
   14 — Gradient Clipping
   ═══════════════════════════════════════════════════════════════ */
DRAWS['grad-clip'] = function() { drawClip(); };

window.drawClip = function() {
  const s = setupCanvas('clipCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const maxNorm = +(document.getElementById('clipMax')?.value || 1);
  document.getElementById('clipMaxV').textContent = maxNorm.toFixed(1);
  ctx.clearRect(0, 0, w, h);
  const pad = 30, pw = w - pad * 2, ph = h - pad * 2;
  // fake gradient norms over training
  const norms = [];
  for (let i = 0; i < 100; i++) {
    norms.push(Math.random() * 3 + Math.exp(i / 30) * 0.3);
  }
  const maxG = Math.max(...norms);
  // unclipped
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 1.5; ctx.globalAlpha = 0.5;
  ctx.beginPath();
  norms.forEach((n, i) => {
    const x = pad + (i / 99) * pw, y = pad + ph - (n / maxG) * ph;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke(); ctx.globalAlpha = 1;
  // clipped
  ctx.strokeStyle = getCSS('--accent2'); ctx.lineWidth = 2;
  ctx.beginPath();
  norms.forEach((n, i) => {
    const clipped = Math.min(n, maxNorm);
    const x = pad + (i / 99) * pw, y = pad + ph - (clipped / maxG) * ph;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  // clip line
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  const clipY = pad + ph - (maxNorm / maxG) * ph;
  ctx.beginPath(); ctx.moveTo(pad, clipY); ctx.lineTo(pad + pw, clipY); ctx.stroke();
  ctx.setLineDash([]);
  // legend
  ctx.font = '10px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--accent'); ctx.fillText('Unclipped', w - 90, pad + 12);
  ctx.fillStyle = getCSS('--accent2'); ctx.fillText('Clipped', w - 90, pad + 26);
};

/* ═══════════════════════════════════════════════════════════════
   15 — Softmax
   ═══════════════════════════════════════════════════════════════ */
let smValues = [2.0, 1.0, 0.5, -1.0];
DRAWS['softmax'] = function() { initSM(); drawSM(); };

function initSM() {
  const ctrl = document.getElementById('smCtrl');
  if (!ctrl || ctrl.children.length > 0) return;
  const labels = ['Cat', 'Dog', 'Bird', 'Fish'];
  smValues.forEach((v, i) => {
    const cg = document.createElement('div'); cg.className = 'cg';
    cg.innerHTML = `<span class="cl">${labels[i]}</span><input type="range" id="sm${i}" min="-3" max="5" step="0.1" value="${v}" oninput="onSMSlider()"><span class="vd" id="smV${i}">${v.toFixed(1)}</span>`;
    ctrl.appendChild(cg);
  });
}

window.onSMSlider = function() {
  for (let i = 0; i < 4; i++) {
    const sl = document.getElementById('sm' + i);
    if (sl) { smValues[i] = +sl.value; document.getElementById('smV' + i).textContent = (+sl.value).toFixed(1); }
  }
  drawSM();
};

function drawSM() {
  const s = setupCanvas('smCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const maxE = Math.max(...smValues);
  const exps = smValues.map(v => Math.exp(v - maxE));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / sum);
  const labels = ['Cat', 'Dog', 'Bird', 'Fish'];
  const colors = [getCSS('--accent'), getCSS('--accent3'), getCSS('--accent2'), getCSS('--accent4')];
  const barW = w / 6;
  probs.forEach((p, i) => {
    const x = (i + 1) * w / 5 - barW / 2;
    const barH = p * (h - 50);
    ctx.fillStyle = colors[i]; ctx.globalAlpha = 0.8;
    ctx.fillRect(x, h - 20 - barH, barW, barH);
    ctx.globalAlpha = 1;
    ctx.font = 'bold 12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText((p * 100).toFixed(1) + '%', x + barW / 2, h - 24 - barH);
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.fillText(labels[i], x + barW / 2, h - 4);
  });
  ctx.textAlign = 'start';
}

/* ═══════════════════════════════════════════════════════════════
   16 — MLE & Gaussian
   ═══════════════════════════════════════════════════════════════ */
DRAWS['mle'] = function() { drawGauss(); };

window.drawGauss = function() {
  const s = setupCanvas('gaussCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const mu = +(document.getElementById('gaussMu')?.value || 0);
  const sig = +(document.getElementById('gaussSig')?.value || 1);
  document.getElementById('gaussMuV').textContent = mu.toFixed(1);
  document.getElementById('gaussSigV').textContent = sig.toFixed(1);
  ctx.clearRect(0, 0, w, h);
  const gauss = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
  ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(0, h - 30); ctx.lineTo(w, h - 30); ctx.stroke();
  // fill
  ctx.fillStyle = 'rgba(200,75,47,0.12)';
  ctx.beginPath(); ctx.moveTo(0, h - 30);
  for (let px = 0; px <= w; px++) {
    const x = (px / w) * 10 - 5;
    const y = h - 30 - gauss(x, mu, sig) * (h - 50) * sig * 2.5;
    ctx.lineTo(px, y);
  }
  ctx.lineTo(w, h - 30); ctx.fill();
  // line
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= w; px++) {
    const x = (px / w) * 10 - 5;
    const y = h - 30 - gauss(x, mu, sig) * (h - 50) * sig * 2.5;
    if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
  }
  ctx.stroke();
  // mean line
  const mx = ((mu + 5) / 10) * w;
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(mx, 0); ctx.lineTo(mx, h - 30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent3');
  ctx.fillText('μ=' + mu.toFixed(1), mx + 4, 14);
};

/* ═══════════════════════════════════════════════════════════════
   17 — Entropy
   ═══════════════════════════════════════════════════════════════ */
DRAWS['entropy'] = function() { drawEntropy(); };

window.drawEntropy = function() {
  const s = setupCanvas('entropyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const p = +(document.getElementById('entP')?.value || 0.5);
  document.getElementById('entPV').textContent = p.toFixed(2);
  const H = -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
  document.getElementById('entHV').textContent = H.toFixed(3) + ' bits';
  ctx.clearRect(0, 0, w, h);
  const pad = 30, pw = w - pad * 2, ph = h - pad * 2;
  // entropy curve
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let i = 1; i < 200; i++) {
    const t = i / 200;
    const x = pad + t * pw;
    const ent = -(t * Math.log2(t) + (1 - t) * Math.log2(1 - t));
    const y = pad + ph - ent * ph;
    if (i === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // marker
  const mx = pad + p * pw;
  const my = pad + ph - H * ph;
  ctx.fillStyle = getCSS('--accent');
  ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
  // axes
  ctx.strokeStyle = getCSS('--border'); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, pad + ph); ctx.lineTo(pad + pw, pad + ph); ctx.stroke();
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('P(heads)', w / 2 - 20, h - 4);
  ctx.fillText('0', pad - 4, h - 16);
  ctx.fillText('1', pad + pw - 4, h - 16);
};

/* ═══════════════════════════════════════════════════════════════
   18 — KL Divergence
   ═══════════════════════════════════════════════════════════════ */
DRAWS['kl-div'] = function() { drawKL(); };

window.drawKL = function() {
  const s = setupCanvas('klCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const offset = +(document.getElementById('klOffset')?.value || 1);
  document.getElementById('klOffV').textContent = offset.toFixed(1);
  ctx.clearRect(0, 0, w, h);
  const gauss = (x, mu, sig) => Math.exp(-0.5 * ((x - mu) / sig) ** 2) / (sig * Math.sqrt(2 * Math.PI));
  const muP = 0, muQ = offset, sig = 1;
  // KL between two Gaussians with same variance: (muP-muQ)^2 / (2*sig^2)
  const kl = (muP - muQ) ** 2 / (2 * sig * sig);
  document.getElementById('klVal').textContent = kl.toFixed(3);
  // draw both
  [{ mu: muP, color: getCSS('--accent3'), label: 'P' }, { mu: muQ, color: getCSS('--accent'), label: 'Q' }].forEach(d => {
    ctx.strokeStyle = d.color; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
      const x = (px / w) * 10 - 3;
      const y = h - 30 - gauss(x, d.mu, sig) * (h - 60) * 2.5;
      if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
    }
    ctx.stroke();
    // label
    const lx = ((d.mu + 3) / 10) * w;
    ctx.font = 'bold 12px ' + getCSS('--mono'); ctx.fillStyle = d.color;
    ctx.fillText(d.label, lx - 4, 20);
  });
};

/* ═══════════════════════════════════════════════════════════════
   19 — Bayes' Theorem
   ═══════════════════════════════════════════════════════════════ */
DRAWS['bayes'] = function() { onBayes(); };

window.onBayes = function() {
  const s = setupCanvas('bayesCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const prior = +(document.getElementById('priorS')?.value || 1) / 100;
  const sens = +(document.getElementById('sensS')?.value || 95) / 100;
  document.getElementById('priorV').textContent = (prior * 100).toFixed(1) + '%';
  document.getElementById('sensV').textContent = (sens * 100).toFixed(0) + '%';
  const fp = 0.05; // false positive rate
  const posterior = (sens * prior) / (sens * prior + fp * (1 - prior));
  document.getElementById('postV').textContent = (posterior * 100).toFixed(1) + '%';
  ctx.clearRect(0, 0, w, h);
  // draw bars
  const bars = [
    { label: 'Prior', val: prior, color: getCSS('--accent3') },
    { label: 'Posterior', val: posterior, color: getCSS('--accent') },
  ];
  const barW = w / 5;
  bars.forEach((b, i) => {
    const x = w / 3 * (i + 1) - barW / 2;
    const barH = b.val * (h - 60);
    ctx.fillStyle = b.color; ctx.globalAlpha = 0.7;
    ctx.fillRect(x, h - 30 - barH, barW, barH);
    ctx.globalAlpha = 1;
    ctx.font = 'bold 13px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText((b.val * 100).toFixed(1) + '%', x + barW / 2, h - 34 - barH);
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.fillText(b.label, x + barW / 2, h - 10);
  });
  ctx.textAlign = 'start';
};

/* ═══════════════════════════════════════════════════════════════
   20 — Cross-Validation
   ═══════════════════════════════════════════════════════════════ */
let cvAnimTimer = null, cvFold = 0;
DRAWS['crossval'] = function() { drawCV(); };

window.drawCV = function() {
  const s = setupCanvas('cvCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const k = +(document.getElementById('cvK')?.value || 5);
  document.getElementById('cvKV').textContent = k;
  ctx.clearRect(0, 0, w, h);
  const pad = 20, bh = 30, gap = 6;
  for (let f = 0; f < k; f++) {
    const y = pad + f * (bh + gap);
    const foldW = (w - pad * 2) / k;
    for (let i = 0; i < k; i++) {
      const x = pad + i * foldW;
      const isTest = i === (f % k);
      ctx.fillStyle = isTest ? getCSS('--accent') : getCSS('--accent3');
      ctx.globalAlpha = f === cvFold % k ? 1 : 0.3;
      ctx.fillRect(x + 1, y, foldW - 2, bh);
    }
    ctx.globalAlpha = 1;
    ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.fillText('Fold ' + (f + 1), w - pad - 40, y + bh / 2 + 4);
  }
  // legend
  ctx.globalAlpha = 1;
  ctx.fillStyle = getCSS('--accent3'); ctx.fillRect(pad, h - 18, 12, 12);
  ctx.fillStyle = getCSS('--accent'); ctx.fillRect(pad + 80, h - 18, 12, 12);
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Train', pad + 16, h - 8);
  ctx.fillText('Test', pad + 96, h - 8);
};

window.animCV = function() {
  if (cvAnimTimer) { clearInterval(cvAnimTimer); cvAnimTimer = null; }
  const k = +(document.getElementById('cvK')?.value || 5);
  cvFold = 0;
  cvAnimTimer = setInterval(() => {
    cvFold++;
    drawCV();
    if (cvFold >= k) { clearInterval(cvAnimTimer); cvAnimTimer = null; }
  }, 600);
};

/* ═══════════════════════════════════════════════════════════════
   21 — Eval Metrics
   ═══════════════════════════════════════════════════════════════ */
DRAWS['metrics'] = function() { drawMetrics(); };

window.drawMetrics = function() {
  const s = setupCanvas('metricsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const tp = +(document.getElementById('mTP')?.value || 80);
  const fp = +(document.getElementById('mFP')?.value || 10);
  const fn = +(document.getElementById('mFN')?.value || 20);
  document.getElementById('mTPv').textContent = tp;
  document.getElementById('mFPv').textContent = fp;
  document.getElementById('mFNv').textContent = fn;
  const prec = tp / (tp + fp);
  const rec = tp / (tp + fn);
  const f1 = 2 * prec * rec / (prec + rec || 1);
  ctx.clearRect(0, 0, w, h);
  // confusion matrix
  const sz = 60, ox = 20, oy = 40;
  const cells = [[tp, fp], [fn, 0]];
  const colors = [getCSS('--accent2'), getCSS('--accent'), getCSS('--accent4'), getCSS('--border')];
  cells.forEach((row, r) => row.forEach((v, c) => {
    ctx.fillStyle = colors[r * 2 + c]; ctx.globalAlpha = 0.6;
    ctx.fillRect(ox + c * sz, oy + r * sz, sz - 2, sz - 2);
    ctx.globalAlpha = 1;
    ctx.font = 'bold 14px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText(v, ox + c * sz + sz / 2, oy + r * sz + sz / 2 + 5);
  }));
  ctx.textAlign = 'start';
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Pred +', ox + sz / 2 - 14, oy - 6);
  ctx.fillText('Pred −', ox + sz + sz / 2 - 14, oy - 6);
  ctx.fillText('Act +', ox - 16, oy + sz / 2); ctx.fillText('Act −', ox - 16, oy + sz + sz / 2);
  // metrics bars
  const metrics = [{ name: 'Precision', val: prec }, { name: 'Recall', val: rec }, { name: 'F1', val: f1 }];
  const bx = ox + sz * 2 + 40, bw = w - bx - 20;
  metrics.forEach((m, i) => {
    const y = oy + i * 40;
    ctx.fillStyle = getCSS('--border'); ctx.fillRect(bx, y, bw, 20);
    ctx.fillStyle = i === 0 ? getCSS('--accent3') : i === 1 ? getCSS('--accent') : getCSS('--accent2');
    ctx.fillRect(bx, y, bw * m.val, 20);
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.fillText(m.name + ': ' + (m.val * 100).toFixed(1) + '%', bx + 4, y + 15);
  });
};

/* ═══════════════════════════════════════════════════════════════
   22 — Cosine Similarity
   ═══════════════════════════════════════════════════════════════ */
DRAWS['cosine-sim'] = function() { drawCosSim(); };

window.drawCosSim = function() {
  const s = setupCanvas('cosCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const angle = +(document.getElementById('cosAngle')?.value || 30);
  document.getElementById('cosAngleV').textContent = angle + '°';
  const sim = Math.cos(angle * Math.PI / 180);
  document.getElementById('cosSimV').textContent = sim.toFixed(3);
  ctx.clearRect(0, 0, w, h);
  const cx = w * 0.3, cy = h * 0.6, r = Math.min(w, h) * 0.4;
  // vectors
  const a1 = 0, a2 = angle * Math.PI / 180;
  drawArrow(ctx, cx, cy, cx + r * Math.cos(-a1), cy - r * Math.sin(a1), getCSS('--accent'), 2.5);
  drawArrow(ctx, cx, cy, cx + r * Math.cos(-a2), cy - r * Math.sin(a2), getCSS('--accent3'), 2.5);
  // arc
  ctx.beginPath(); ctx.arc(cx, cy, 40, -a2, 0);
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1.5; ctx.stroke();
  // labels
  ctx.font = '12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent'); ctx.fillText('A', cx + r + 8, cy + 4);
  ctx.fillStyle = getCSS('--accent3'); ctx.fillText('B', cx + r * Math.cos(-a2) + 8, cy - r * Math.sin(a2) - 4);
  ctx.fillStyle = getCSS('--accent4'); ctx.fillText(angle + '°', cx + 48, cy - 10);
  // similarity bar
  const bx = w * 0.65, by = 30, bw = w * 0.3, bh = h - 60;
  ctx.fillStyle = getCSS('--border'); ctx.fillRect(bx, by, bw, bh);
  const fill = (sim + 1) / 2; // map [-1,1] to [0,1]
  ctx.fillStyle = sim >= 0 ? getCSS('--accent2') : getCSS('--accent');
  ctx.fillRect(bx, by + bh * (1 - fill), bw, bh * fill);
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.textAlign = 'center';
  ctx.fillText('+1', bx + bw / 2, by - 4);
  ctx.fillText('−1', bx + bw / 2, by + bh + 14);
  ctx.fillText('0', bx + bw / 2, by + bh / 2 + 4);
  ctx.textAlign = 'start';
};

/* ═══════════════════════════════════════════════════════════════
   23 — CNN
   ═══════════════════════════════════════════════════════════════ */
let cnnAnim = null;
DRAWS['cnn'] = function() { drawCNN(); };

window.drawCNN = function() {
  const s = setupCanvas('cnnCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const k = +(document.getElementById('cnnK')?.value || 3);
  const stride = +(document.getElementById('cnnS')?.value || 1);
  document.getElementById('cnnKV').textContent = k + '×' + k;
  document.getElementById('cnnSV').textContent = stride;
  ctx.clearRect(0, 0, w, h);
  const gridSize = 7, cellSize = Math.min(28, (h - 60) / gridSize);
  const ox = 40, oy = 30;
  // input grid
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const val = Math.random();
      ctx.fillStyle = `rgba(200,75,47,${val * 0.5 + 0.1})`;
      ctx.fillRect(ox + c * cellSize, oy + r * cellSize, cellSize - 1, cellSize - 1);
    }
  }
  // kernel highlight
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 2.5;
  ctx.strokeRect(ox, oy, k * cellSize, k * cellSize);
  // output grid
  const outSize = Math.floor((gridSize - k) / stride) + 1;
  const ox2 = w / 2 + 40;
  for (let r = 0; r < outSize; r++) {
    for (let c = 0; c < outSize; c++) {
      ctx.fillStyle = `rgba(41,85,160,${Math.random() * 0.5 + 0.2})`;
      ctx.fillRect(ox2 + c * cellSize, oy + r * cellSize, cellSize - 1, cellSize - 1);
    }
  }
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 1.5;
  ctx.strokeRect(ox2, oy, cellSize, cellSize);
  // arrow
  ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1.5;
  const arrowX = ox + gridSize * cellSize + 20;
  ctx.beginPath(); ctx.moveTo(arrowX, h / 2); ctx.lineTo(ox2 - 20, h / 2); ctx.stroke();
  drawArrow(ctx, arrowX, h / 2, ox2 - 20, h / 2, getCSS('--muted'), 1.5);
  // labels
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Input ' + gridSize + '×' + gridSize, ox, h - 6);
  ctx.fillText('Output ' + outSize + '×' + outSize, ox2, h - 6);
};

window.animCNN = function() {
  if (cnnAnim) { clearInterval(cnnAnim); cnnAnim = null; }
  // Simple animation placeholder
  drawCNN();
};

/* ═══════════════════════════════════════════════════════════════
   24 — Embeddings
   ═══════════════════════════════════════════════════════════════ */
DRAWS['embeddings'] = function() {
  const s = setupCanvas('embCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const clusters = [
    { words: ['king', 'queen', 'prince', 'royal'], cx: 0.3, cy: 0.3, color: getCSS('--accent') },
    { words: ['cat', 'dog', 'fish', 'bird'], cx: 0.7, cy: 0.5, color: getCSS('--accent3') },
    { words: ['run', 'walk', 'jump', 'swim'], cx: 0.4, cy: 0.75, color: getCSS('--accent2') },
    { words: ['happy', 'sad', 'angry', 'calm'], cx: 0.8, cy: 0.2, color: getCSS('--accent4') },
  ];
  clusters.forEach(cl => {
    cl.words.forEach((word, i) => {
      const x = cl.cx * w + (Math.random() - 0.5) * 60;
      const y = cl.cy * h + (Math.random() - 0.5) * 40;
      ctx.fillStyle = cl.color; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = cl.color;
      ctx.fillText(word, x + 8, y + 4);
    });
  });
  // analogy arrow
  ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(w * 0.28, h * 0.26); ctx.lineTo(w * 0.34, h * 0.34); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '10px ' + getCSS('--sans'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Semantic clusters emerge from co-occurrence', 10, h - 8);
};

/* ═══════════════════════════════════════════════════════════════
   25 — Attention
   ═══════════════════════════════════════════════════════════════ */
let attWeights;
DRAWS['attention'] = function() { initAtt(); drawAtt(); };

function initAtt() {
  if (!attWeights) {
    attWeights = [];
    for (let i = 0; i < 5; i++) {
      attWeights[i] = [];
      for (let j = 0; j < 5; j++) attWeights[i][j] = Math.random();
    }
    // normalize rows
    attWeights.forEach(row => {
      const s = row.reduce((a, b) => a + b, 0);
      row.forEach((v, i, arr) => { arr[i] = v / s; });
    });
  }
}

function drawAtt() {
  const s = setupCanvas('attCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const tokens = ['The', 'cat', 'sat', 'on', 'mat'];
  const n = tokens.length, cellSize = Math.min(36, (Math.min(w, h) - 80) / n);
  const ox = 80, oy = 50;
  // headers
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  tokens.forEach((t, i) => {
    ctx.textAlign = 'center';
    ctx.fillText(t, ox + i * cellSize + cellSize / 2, oy - 8);
    ctx.textAlign = 'right';
    ctx.fillText(t, ox - 8, oy + i * cellSize + cellSize / 2 + 4);
  });
  ctx.textAlign = 'start';
  // heatmap
  attWeights.forEach((row, r) => {
    row.forEach((v, c) => {
      const alpha = Math.min(v * 2.5, 1);
      ctx.fillStyle = `rgba(200,75,47,${alpha})`;
      ctx.fillRect(ox + c * cellSize, oy + r * cellSize, cellSize - 1, cellSize - 1);
      ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = alpha > 0.5 ? '#fff' : getCSS('--fg');
      ctx.textAlign = 'center';
      ctx.fillText(v.toFixed(2), ox + c * cellSize + cellSize / 2, oy + r * cellSize + cellSize / 2 + 3);
    });
  });
  ctx.textAlign = 'start';

  // click handler
  s.c.onclick = function(e) {
    const rect = s.c.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * DPR / DPR;
    const my = (e.clientY - rect.top) * DPR / DPR;
    const col = Math.floor((mx - ox) / cellSize);
    const row = Math.floor((my - oy) / cellSize);
    if (row >= 0 && row < n && col >= 0 && col < n) {
      attWeights[row][col] += 0.3;
      const sum = attWeights[row].reduce((a, b) => a + b, 0);
      attWeights[row].forEach((v, i, a) => { a[i] = v / sum; });
      drawAtt();
    }
  };
}

window.rndAtt = function() {
  attWeights = null;
  initAtt();
  drawAtt();
};

/* ═══════════════════════════════════════════════════════════════
   26 — Transformer
   ═══════════════════════════════════════════════════════════════ */
DRAWS['transformer'] = function() {
  const s = setupCanvas('transCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, bw = 180, bh = 36, gap = 8;
  const blocks = [
    { label: 'Input Embeddings + PE', color: getCSS('--accent3') },
    { label: 'Multi-Head Attention', color: getCSS('--accent') },
    { label: 'Add & LayerNorm', color: getCSS('--accent4') },
    { label: 'Feed-Forward Network', color: getCSS('--accent2') },
    { label: 'Add & LayerNorm', color: getCSS('--accent4') },
    { label: 'Output (×N layers)', color: getCSS('--accent3') },
  ];
  const startY = 15;
  blocks.forEach((b, i) => {
    const y = startY + i * (bh + gap);
    ctx.fillStyle = b.color; ctx.globalAlpha = 0.15;
    ctx.fillRect(cx - bw / 2, y, bw, bh);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = b.color; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - bw / 2, y, bw, bh);
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText(b.label, cx, y + bh / 2 + 4);
    // arrow
    if (i < blocks.length - 1) {
      ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, y + bh); ctx.lineTo(cx, y + bh + gap); ctx.stroke();
    }
  });
  // residual connections
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  const resX = cx + bw / 2 + 15;
  // residual around attention
  ctx.beginPath();
  ctx.moveTo(resX, startY + bh + gap / 2);
  ctx.lineTo(resX, startY + 2 * (bh + gap) + bh / 2);
  ctx.stroke();
  // residual around FFN
  ctx.beginPath();
  ctx.moveTo(resX + 12, startY + 2 * (bh + gap) + bh + gap / 2);
  ctx.lineTo(resX + 12, startY + 4 * (bh + gap) + bh / 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent4');
  ctx.fillText('skip', resX + 2, startY + (bh + gap) * 1.5 + 4);
  ctx.fillText('skip', resX + 14, startY + (bh + gap) * 3.5 + 4);
  ctx.textAlign = 'start';
};

/* ═══════════════════════════════════════════════════════════════
   27 — Normalization Variants (no dedicated canvas — table only)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['normalization'] = function() {
  // No interactive canvas for this topic — it's table/code driven
};

/* ═══════════════════════════════════════════════════════════════
   28 — RNN
   ═══════════════════════════════════════════════════════════════ */
let rnnAnimTimer = null, rnnStep = -1;
DRAWS['rnn'] = function() { drawRNN(); };

window.drawRNN = function() {
  const s = setupCanvas('rnnCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const len = +(document.getElementById('rnnLen')?.value || 4);
  ctx.clearRect(0, 0, w, h);
  const pad = 40, cw = (w - pad * 2) / len, nodeR = 22;
  for (let i = 0; i < len; i++) {
    const x = pad + i * cw + cw / 2;
    const y = h / 2;
    // connection to next
    if (i < len - 1) {
      ctx.strokeStyle = i <= rnnStep ? getCSS('--accent') : getCSS('--border');
      ctx.lineWidth = i <= rnnStep ? 2.5 : 1;
      ctx.beginPath(); ctx.moveTo(x + nodeR, y); ctx.lineTo(x + cw - nodeR, y); ctx.stroke();
      drawArrow(ctx, x + nodeR, y, x + cw - nodeR, y, i <= rnnStep ? getCSS('--accent') : getCSS('--border'), 1.5);
    }
    // input arrow
    ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, h - 20); ctx.lineTo(x, y + nodeR + 4); ctx.stroke();
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent3');
    ctx.textAlign = 'center'; ctx.fillText('x' + (i + 1), x, h - 6);
    // output arrow
    ctx.strokeStyle = getCSS('--accent2'); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y - nodeR - 4); ctx.lineTo(x, 20); ctx.stroke();
    ctx.fillStyle = getCSS('--accent2'); ctx.fillText('h' + (i + 1), x, 14);
    // node
    ctx.fillStyle = i <= rnnStep ? getCSS('--accent') : getCSS('--card');
    ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = i <= rnnStep ? '#fff' : getCSS('--fg');
    ctx.font = '10px ' + getCSS('--mono');
    ctx.fillText('tanh', x, y + 4);
  }
  ctx.textAlign = 'start';
};

window.animRNN = function() {
  if (rnnAnimTimer) { clearInterval(rnnAnimTimer); rnnAnimTimer = null; }
  rnnStep = -1;
  const len = +(document.getElementById('rnnLen')?.value || 4);
  document.getElementById('rnnMsg').textContent = 'Propagating...';
  rnnAnimTimer = setInterval(() => {
    rnnStep++;
    drawRNN();
    if (rnnStep >= len - 1) {
      clearInterval(rnnAnimTimer); rnnAnimTimer = null;
      document.getElementById('rnnMsg').textContent = 'Done';
    }
  }, 500);
};

window.resetRNN = function() {
  if (rnnAnimTimer) { clearInterval(rnnAnimTimer); rnnAnimTimer = null; }
  rnnStep = -1;
  document.getElementById('rnnMsg').textContent = 'Click Animate';
  drawRNN();
};

/* ═══════════════════════════════════════════════════════════════
   29 — LSTM
   ═══════════════════════════════════════════════════════════════ */
let lstmHighlight = 'all';
DRAWS['lstm'] = function() { drawLSTM(); };

window.highlightGate = function(gate) { lstmHighlight = gate; drawLSTM(); };

function drawLSTM() {
  const s = setupCanvas('lstmCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  // Cell box
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 2;
  ctx.strokeRect(cx - 100, cy - 70, 200, 140);
  // Gates
  const gates = [
    { name: 'Forget', x: cx - 60, y: cy - 30, color: getCSS('--accent'), id: 'forget' },
    { name: 'Input', x: cx, y: cy - 30, color: getCSS('--accent3'), id: 'input' },
    { name: 'Output', x: cx + 60, y: cy - 30, color: getCSS('--accent2'), id: 'output' },
  ];
  gates.forEach(g => {
    const active = lstmHighlight === 'all' || lstmHighlight === g.id;
    ctx.fillStyle = g.color; ctx.globalAlpha = active ? 0.8 : 0.15;
    ctx.beginPath(); ctx.arc(g.x, g.y, 18, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = active ? '#fff' : getCSS('--muted');
    ctx.textAlign = 'center';
    ctx.fillText('σ', g.x, g.y + 3);
    ctx.fillStyle = g.color; ctx.font = '10px ' + getCSS('--mono');
    ctx.fillText(g.name, g.x, g.y - 24);
  });
  // Cell state highway
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx - 120, cy + 30); ctx.lineTo(cx + 120, cy + 30); ctx.stroke();
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent4');
  ctx.fillText('Cell state cₜ →', cx - 40, cy + 50);
  // Hidden state
  ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx - 120, cy + 60); ctx.lineTo(cx + 120, cy + 60); ctx.stroke();
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Hidden hₜ →', cx - 36, cy + 76);
  ctx.textAlign = 'start';
}

/* ═══════════════════════════════════════════════════════════════
   30 — GRU
   ═══════════════════════════════════════════════════════════════ */
DRAWS['gru'] = function() {
  const s = setupCanvas('gruCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const data = [
    { name: 'RNN', params: 1, color: getCSS('--accent') },
    { name: 'GRU', params: 3, color: getCSS('--accent2') },
    { name: 'LSTM', params: 4, color: getCSS('--accent3') },
  ];
  const barW = w / 5, maxH = h - 60;
  data.forEach((d, i) => {
    const x = (i + 1) * w / 4 - barW / 2;
    const barH = (d.params / 4) * maxH;
    ctx.fillStyle = d.color; ctx.globalAlpha = 0.7;
    ctx.fillRect(x, h - 30 - barH, barW, barH);
    ctx.globalAlpha = 1;
    ctx.font = 'bold 12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText(d.name, x + barW / 2, h - 10);
    ctx.fillText(d.params + '×', x + barW / 2, h - 36 - barH);
  });
  ctx.textAlign = 'start';
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('Relative parameter count per hidden unit', 10, 18);
};

/* ═══════════════════════════════════════════════════════════════
   31 — PCA
   ═══════════════════════════════════════════════════════════════ */
DRAWS['pca'] = function() { onPCA(0.7); };

window.onPCA = function(corr) {
  const s = setupCanvas('pcaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const c = +corr;
  document.getElementById('pcaCorrV').textContent = c.toFixed(2);
  ctx.clearRect(0, 0, w, h);
  // generate correlated 2D data
  const n = 80;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const x = (Math.random() - 0.5) * 2;
    const y = c * x + Math.sqrt(1 - c * c) * (Math.random() - 0.5) * 2;
    pts.push([x, y]);
  }
  const toSx = x => w / 2 + x * w * 0.2;
  const toSy = y => h / 2 - y * h * 0.2;
  // points
  pts.forEach(p => {
    ctx.fillStyle = getCSS('--accent3'); ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(toSx(p[0]), toSy(p[1]), 3, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
  // PC1 direction (approximate)
  const angle = Math.atan2(c, 1);
  const pc1x = Math.cos(angle), pc1y = Math.sin(angle);
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toSx(-3 * pc1x), toSy(-3 * pc1y));
  ctx.lineTo(toSx(3 * pc1x), toSy(3 * pc1y));
  ctx.stroke();
  // PC2
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(toSx(2 * pc1y), toSy(-2 * pc1x));
  ctx.lineTo(toSx(-2 * pc1y), toSy(2 * pc1x));
  ctx.stroke();
  ctx.setLineDash([]);
  // labels
  ctx.font = '11px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--accent'); ctx.fillText('PC1', toSx(3 * pc1x) + 4, toSy(3 * pc1y) - 4);
  ctx.fillStyle = getCSS('--accent4'); ctx.fillText('PC2', toSx(2 * pc1y) + 4, toSy(-2 * pc1x) - 4);
  // explained variance (approximate)
  const pc1Pct = (50 + c * 45).toFixed(0);
  document.getElementById('pc1V').textContent = pc1Pct + '%';
  document.getElementById('pc2V').textContent = (100 - pc1Pct) + '%';
};

/* ═══════════════════════════════════════════════════════════════
   32 — SVD
   ═══════════════════════════════════════════════════════════════ */
DRAWS['svd'] = function() { drawSVD(); };

window.drawSVD = function() {
  const s = setupCanvas('svdCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const rank = +(document.getElementById('svdR')?.value || 3);
  document.getElementById('svdRV').textContent = rank;
  ctx.clearRect(0, 0, w, h);
  // simulate singular values (decaying)
  const total = 10;
  const singVals = [];
  for (let i = 0; i < total; i++) singVals.push(Math.exp(-i * 0.4));
  const totalEnergy = singVals.reduce((a, b) => a + b * b, 0);
  const keptEnergy = singVals.slice(0, rank).reduce((a, b) => a + b * b, 0);
  document.getElementById('svdEnergy').textContent = ((keptEnergy / totalEnergy) * 100).toFixed(1) + '%';
  // bar chart
  const barW = (w - 60) / total, maxH = h - 60;
  singVals.forEach((v, i) => {
    const x = 30 + i * barW;
    const barH = v * maxH;
    ctx.fillStyle = i < rank ? getCSS('--accent') : getCSS('--border');
    ctx.globalAlpha = i < rank ? 0.8 : 0.3;
    ctx.fillRect(x + 2, h - 30 - barH, barW - 4, barH);
    ctx.globalAlpha = 1;
    ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
    ctx.textAlign = 'center'; ctx.fillText('σ' + (i + 1), x + barW / 2, h - 14);
  });
  ctx.textAlign = 'start';
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent');
  ctx.fillText('Kept (rank ' + rank + ')', 10, 18);
};

/* ═══════════════════════════════════════════════════════════════
   33 — VAE
   ═══════════════════════════════════════════════════════════════ */
DRAWS['vae'] = function() {
  const s = setupCanvas('vaeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const cy = h / 2;
  const blocks = [
    { label: 'x (input)', x: 40, w: 50, h: 60, color: getCSS('--accent3') },
    { label: 'Encoder', x: 120, w: 70, h: 50, color: getCSS('--accent') },
    { label: 'μ, σ²', x: 220, w: 50, h: 30, color: getCSS('--accent4') },
    { label: 'z ~ N(μ,σ²)', x: 300, w: 60, h: 40, color: getCSS('--accent2') },
    { label: 'Decoder', x: 390, w: 70, h: 50, color: getCSS('--accent') },
    { label: 'x̂ (recon)', x: 490, w: 50, h: 60, color: getCSS('--accent3') },
  ];
  blocks.forEach((b, i) => {
    const y = cy - b.h / 2;
    ctx.fillStyle = b.color; ctx.globalAlpha = 0.15;
    ctx.fillRect(b.x, y, b.w, b.h);
    ctx.globalAlpha = 1; ctx.strokeStyle = b.color; ctx.lineWidth = 1.5;
    ctx.strokeRect(b.x, y, b.w, b.h);
    ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center'; ctx.fillText(b.label, b.x + b.w / 2, y + b.h / 2 + 4);
    if (i < blocks.length - 1) {
      ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(b.x + b.w, cy); ctx.lineTo(blocks[i + 1].x, cy); ctx.stroke();
    }
  });
  // KL arrow
  ctx.strokeStyle = getCSS('--accent4'); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(300, cy + 30); ctx.lineTo(300, cy + 55); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent4');
  ctx.fillText('KL(q||p)', 280, cy + 68);
  ctx.textAlign = 'start';
};

/* ═══════════════════════════════════════════════════════════════
   34 — Diffusion
   ═══════════════════════════════════════════════════════════════ */
let diffAnimTimer = null;
DRAWS['diffusion'] = function() { drawDiffusion(0); };

window.drawDiffusion = function(t) {
  const s = setupCanvas('diffCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const step = +t;
  document.getElementById('diffTV').textContent = step;
  ctx.clearRect(0, 0, w, h);
  // draw a simple 2D grid that gets progressively noisier
  const gridSize = 12, cellSize = Math.min(16, (Math.min(w * 0.4, h - 40)) / gridSize);
  const ox = (w - gridSize * cellSize) / 2, oy = (h - gridSize * cellSize) / 2;
  const noiseFrac = step / 100;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // original signal: a simple pattern
      const signal = ((r + c) % 3 === 0) ? 0.8 : 0.2;
      const noisy = signal * (1 - noiseFrac) + Math.random() * noiseFrac;
      const v = Math.max(0, Math.min(1, noisy));
      ctx.fillStyle = `rgba(200,75,47,${v})`;
      ctx.fillRect(ox + c * cellSize, oy + r * cellSize, cellSize - 1, cellSize - 1);
    }
  }
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  ctx.fillText('t=' + step + (step === 0 ? ' (clean)' : step >= 100 ? ' (pure noise)' : ''), 10, 18);
};

window.animDiff = function() {
  if (diffAnimTimer) { clearInterval(diffAnimTimer); diffAnimTimer = null; }
  let t = 0;
  const slider = document.getElementById('diffT');
  diffAnimTimer = setInterval(() => {
    t += 2;
    if (t > 100) { clearInterval(diffAnimTimer); diffAnimTimer = null; return; }
    if (slider) slider.value = t;
    drawDiffusion(t);
  }, 50);
};

/* ═══════════════════════════════════════════════════════════════
   35 — GAN
   ═══════════════════════════════════════════════════════════════ */
let ganAnimTimer = null;
DRAWS['gan'] = function() { drawGANState(0); };

function drawGANState(epoch) {
  const s = setupCanvas('ganCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  // Real data distribution
  const realMu = w * 0.6, realSig = 30;
  // Generated distribution (starts far, approaches real)
  const genMu = w * 0.3 + (epoch / 100) * (realMu - w * 0.3);
  const genSig = 60 - (epoch / 100) * 30;
  const gauss = (x, mu, sig) => Math.exp(-0.5 * ((x - mu) / sig) ** 2);
  // Real
  ctx.strokeStyle = getCSS('--accent3'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= w; px++) {
    const y = h - 30 - gauss(px, realMu, realSig) * (h - 60);
    if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
  }
  ctx.stroke();
  // Generated
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= w; px++) {
    const y = h - 30 - gauss(px, genMu, Math.max(genSig, 20)) * (h - 60);
    if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
  }
  ctx.stroke();
  // legend
  ctx.font = '11px ' + getCSS('--mono');
  ctx.fillStyle = getCSS('--accent3'); ctx.fillText('Real data', 10, 20);
  ctx.fillStyle = getCSS('--accent'); ctx.fillText('Generated', 10, 36);
  ctx.fillStyle = getCSS('--muted'); ctx.fillText('Epoch: ' + epoch, w - 80, 20);
}

window.animGAN = function() {
  if (ganAnimTimer) { clearInterval(ganAnimTimer); ganAnimTimer = null; }
  let epoch = 0;
  document.getElementById('ganMsg').textContent = 'Training...';
  ganAnimTimer = setInterval(() => {
    epoch += 2;
    drawGANState(epoch);
    if (epoch >= 100) {
      clearInterval(ganAnimTimer); ganAnimTimer = null;
      document.getElementById('ganMsg').textContent = 'Converged!';
    }
  }, 60);
};

window.resetGAN = function() {
  if (ganAnimTimer) { clearInterval(ganAnimTimer); ganAnimTimer = null; }
  document.getElementById('ganMsg').textContent = '';
  drawGANState(0);
};

/* ═══════════════════════════════════════════════════════════════
   36 — Tokenization (BPE)
   ═══════════════════════════════════════════════════════════════ */
let bpeState = null;
DRAWS['tokenization'] = function() { resetBPE(); };

window.resetBPE = function() {
  bpeState = { tokens: ['l', 'o', 'w', ' ', 'l', 'o', 'w', 'e', 'r', ' ', 'n', 'e', 'w', 'e', 'r'], merges: [], step: 0 };
  drawBPEState();
};

window.animBPE = function() {
  if (!bpeState) resetBPE();
  const mergeRules = [['l', 'o', 'lo'], ['lo', 'w', 'low'], ['e', 'r', 'er'], ['n', 'ew', 'new'], ['low', 'er', 'lower']];
  if (bpeState.step >= mergeRules.length) { document.getElementById('bpeMsg').textContent = 'Done!'; return; }
  const rule = mergeRules[bpeState.step];
  // apply merge
  const newTokens = [];
  let i = 0;
  while (i < bpeState.tokens.length) {
    if (i < bpeState.tokens.length - 1 && bpeState.tokens[i] === rule[0] && bpeState.tokens[i + 1] === rule[1]) {
      newTokens.push(rule[2]);
      i += 2;
    } else {
      newTokens.push(bpeState.tokens[i]);
      i++;
    }
  }
  bpeState.tokens = newTokens;
  bpeState.merges.push(rule[0] + '+' + rule[1] + '→' + rule[2]);
  bpeState.step++;
  document.getElementById('bpeMsg').textContent = 'Merge ' + bpeState.step + ': ' + bpeState.merges[bpeState.merges.length - 1];
  drawBPEState();
};

function drawBPEState() {
  const s = setupCanvas('bpeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  if (!bpeState) return;
  ctx.clearRect(0, 0, w, h);
  const tokens = bpeState.tokens;
  const tokW = Math.min(50, (w - 40) / tokens.length);
  const y = h / 2 - 15;
  tokens.forEach((t, i) => {
    const x = 20 + i * tokW;
    ctx.fillStyle = t.length > 1 ? getCSS('--accent') : getCSS('--accent3');
    ctx.globalAlpha = 0.2;
    ctx.fillRect(x + 1, y, tokW - 2, 30);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = t.length > 1 ? getCSS('--accent') : getCSS('--accent3');
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 1, y, tokW - 2, 30);
    ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
    ctx.textAlign = 'center';
    ctx.fillText(t === ' ' ? '▁' : t, x + tokW / 2, y + 20);
  });
  // merge history
  ctx.textAlign = 'start';
  ctx.font = '10px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--muted');
  bpeState.merges.forEach((m, i) => {
    ctx.fillText((i + 1) + '. ' + m, 10, h - 10 - (bpeState.merges.length - 1 - i) * 14);
  });
}

/* ═══════════════════════════════════════════════════════════════
   37 — LoRA
   ═══════════════════════════════════════════════════════════════ */
DRAWS['lora'] = function() { drawLoRA(); };

window.drawLoRA = function() {
  const s = setupCanvas('loraCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const d = +(document.getElementById('loraD')?.value || 4096);
  const r = +(document.getElementById('loraR')?.value || 16);
  document.getElementById('loraDV').textContent = d;
  document.getElementById('loraRV').textContent = r;
  const fullParams = d * d;
  const loraParams = 2 * d * r;
  const savings = ((1 - loraParams / fullParams) * 100).toFixed(1);
  document.getElementById('loraSave').textContent = savings + '% fewer params';
  ctx.clearRect(0, 0, w, h);
  // bar comparison
  const maxW = w * 0.8, barH = 35;
  // Full
  ctx.fillStyle = getCSS('--accent'); ctx.globalAlpha = 0.6;
  ctx.fillRect(40, 40, maxW, barH);
  ctx.globalAlpha = 1;
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  ctx.fillText('Full: ' + (fullParams / 1e6).toFixed(1) + 'M params', 44, 62);
  // LoRA
  const loraW = Math.max((loraParams / fullParams) * maxW, 20);
  ctx.fillStyle = getCSS('--accent2'); ctx.globalAlpha = 0.6;
  ctx.fillRect(40, 100, loraW, barH);
  ctx.globalAlpha = 1;
  ctx.font = '11px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  ctx.fillText('LoRA (r=' + r + '): ' + (loraParams / 1e3).toFixed(0) + 'K params', 44, 122);
  // matrix diagrams
  const my = 160, mSize = 40;
  ctx.strokeStyle = getCSS('--accent'); ctx.lineWidth = 1.5;
  ctx.strokeRect(40, my, mSize, mSize);
  ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent');
  ctx.fillText('W (d×d)', 40, my + mSize + 14);
  ctx.font = '14px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  ctx.fillText('≈', 95, my + mSize / 2 + 4);
  // B matrix
  ctx.strokeStyle = getCSS('--accent2'); ctx.lineWidth = 1.5;
  const bW = 12, bH = mSize;
  ctx.strokeRect(120, my, bW, bH);
  ctx.font = '9px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent2');
  ctx.fillText('B(d×r)', 110, my + mSize + 14);
  ctx.font = '12px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--fg');
  ctx.fillText('×', 140, my + mSize / 2 + 4);
  // A matrix
  ctx.strokeRect(155, my + 10, mSize, bW);
  ctx.fillStyle = getCSS('--accent2'); ctx.font = '9px ' + getCSS('--mono');
  ctx.fillText('A(r×d)', 155, my + mSize + 14);
};

/* ═══════════════════════════════════════════════════════════════
   38 — RLHF
   ═══════════════════════════════════════════════════════════════ */
let rlhfAnimTimer = null, rlhfStage = -1;
DRAWS['rlhf'] = function() { drawRLHFState(-1); };

function drawRLHFState(stage) {
  const s = setupCanvas('rlhfCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const stages = [
    { label: 'Stage 1: SFT', desc: 'Fine-tune on demonstrations', color: getCSS('--accent3') },
    { label: 'Stage 2: Reward Model', desc: 'Train on human preferences', color: getCSS('--accent') },
    { label: 'Stage 3: PPO/DPO', desc: 'Optimise policy with reward', color: getCSS('--accent2') },
  ];
  const boxW = (w - 60) / 3, boxH = 80, oy = h / 2 - boxH / 2;
  stages.forEach((st, i) => {
    const x = 20 + i * (boxW + 10);
    const active = stage >= i;
    ctx.fillStyle = st.color; ctx.globalAlpha = active ? 0.2 : 0.05;
    ctx.fillRect(x, oy, boxW, boxH);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = st.color; ctx.lineWidth = active ? 2.5 : 1;
    ctx.strokeRect(x, oy, boxW, boxH);
    ctx.font = 'bold 11px ' + getCSS('--mono'); ctx.fillStyle = active ? st.color : getCSS('--muted');
    ctx.textAlign = 'center';
    ctx.fillText(st.label, x + boxW / 2, oy + 30);
    ctx.font = '10px ' + getCSS('--sans');
    ctx.fillText(st.desc, x + boxW / 2, oy + 50);
    // arrow
    if (i < 2) {
      ctx.strokeStyle = getCSS('--muted'); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + boxW, h / 2); ctx.lineTo(x + boxW + 10, h / 2); ctx.stroke();
    }
  });
  ctx.textAlign = 'start';
  if (stage === 3) {
    ctx.font = 'bold 13px ' + getCSS('--mono'); ctx.fillStyle = getCSS('--accent2');
    ctx.fillText('✓ Aligned model ready', 20, h - 10);
  }
}

window.animRLHF = function() {
  if (rlhfAnimTimer) { clearInterval(rlhfAnimTimer); rlhfAnimTimer = null; }
  rlhfStage = -1;
  document.getElementById('rlhfMsg').textContent = 'Starting...';
  rlhfAnimTimer = setInterval(() => {
    rlhfStage++;
    drawRLHFState(rlhfStage);
    const msgs = ['SFT training...', 'Collecting preferences...', 'PPO optimizing...', 'Done!'];
    document.getElementById('rlhfMsg').textContent = msgs[Math.min(rlhfStage, 3)];
    if (rlhfStage >= 3) { clearInterval(rlhfAnimTimer); rlhfAnimTimer = null; }
  }, 1200);
};

window.resetRLHF = function() {
  if (rlhfAnimTimer) { clearInterval(rlhfAnimTimer); rlhfAnimTimer = null; }
  rlhfStage = -1;
  document.getElementById('rlhfMsg').textContent = '';
  drawRLHFState(-1);
};

/* ═══════════════════════════════════════════════════════════════
   INIT — draw active topic's visualization
   ═══════════════════════════════════════════════════════════════ */
function initVisualizations(topicId) {
  if (DRAWS[topicId]) {
    requestAnimationFrame(() => DRAWS[topicId]());
  }
}

// Expose globally
window.DRAWS = DRAWS;
window.initVisualizations = initVisualizations;
