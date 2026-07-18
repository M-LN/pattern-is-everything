/* ═══════════════════════════════════════════════════════════════
   The Toolkit — Visualizations Engine
   Canvas-based interactive visualizations for 39 topics
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

function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function gaussPdf(x, mu, sig) { return Math.exp(-0.5 * ((x - mu) / sig) ** 2) / (sig * Math.sqrt(2 * Math.PI)); }
function betaPdf(x, a, b) {
  if (x <= 0 || x >= 1) return 0;
  const lnB = lnGamma(a) + lnGamma(b) - lnGamma(a + b);
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - lnB);
}
function lnGamma(z) {
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  const g = 7; const c = [0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
  let x = c[0]; for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

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

const ACCENT = () => css('--accent') || '#c8a96e';
const BLUE = '#4fc3f7';
const GREEN = '#81c784';
const RED = '#e57373';
const MUTED = () => css('--muted') || '#666';
const BORDER = () => css('--border') || '#222';
const MONO = () => css('--mono') || 'Space Mono, monospace';

/* ═══════════════════════════════════════════════════════════════
   01 — Confusion Matrix
   ═══════════════════════════════════════════════════════════════ */
let cmData;
DRAWS['confusion-matrix'] = function() {
  const s = setupCanvas('cmCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const thresh = document.getElementById('cmThresh');
  if (!thresh) return;

  // Generate synthetic scores once
  if (!cmData) {
    cmData = { pos: [], neg: [] };
    for (let i = 0; i < 100; i++) cmData.pos.push(clamp(0.6 + gauss() * 0.2, 0, 1));
    for (let i = 0; i < 100; i++) cmData.neg.push(clamp(0.35 + gauss() * 0.2, 0, 1));
  }

  function draw() {
    const t = +thresh.value / 100;
    document.getElementById('cmThreshV').textContent = t.toFixed(2);
    ctx.clearRect(0, 0, w, h);

    let tp = 0, fp = 0, tn = 0, fn = 0;
    cmData.pos.forEach(v => { if (v >= t) tp++; else fn++; });
    cmData.neg.forEach(v => { if (v >= t) fp++; else tn++; });

    const prec = tp + fp > 0 ? tp / (tp + fp) : 0;
    const rec = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = prec + rec > 0 ? 2 * prec * rec / (prec + rec) : 0;

    document.getElementById('cmPrec').textContent = prec.toFixed(3);
    document.getElementById('cmRec').textContent = rec.toFixed(3);
    document.getElementById('cmF1').textContent = f1.toFixed(3);

    // Draw confusion matrix grid
    const mx = 20, my = 20, mw = Math.min(200, w * 0.35), mh = h - 40;
    const cw = mw / 2, ch = mh / 2;
    const cells = [[tp, 'TP', ACCENT()], [fp, 'FP', RED], [fn, 'FN', '#f0a050'], [tn, 'TN', BLUE]];
    const maxCell = Math.max(tp, fp, tn, fn, 1);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const idx = r * 2 + c;
        const x = mx + c * cw, y = my + r * ch;
        const alpha = 0.15 + 0.6 * (cells[idx][0] / maxCell);
        ctx.fillStyle = cells[idx][2]; ctx.globalAlpha = alpha;
        ctx.fillRect(x, y, cw - 2, ch - 2);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cw - 2, ch - 2);
        ctx.fillStyle = '#fff'; ctx.font = `bold 18px ${MONO()}`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(cells[idx][0], x + cw / 2, y + ch / 2 - 10);
        ctx.font = `11px ${MONO()}`; ctx.fillStyle = MUTED();
        ctx.fillText(cells[idx][1], x + cw / 2, y + ch / 2 + 14);
      }
    }
    // Labels
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Pred +', mx + cw / 2, my - 6);
    ctx.fillText('Pred −', mx + cw + cw / 2, my - 6);

    // Score distributions on the right
    const dx = mx + mw + 40, dw = w - dx - 20, dh = h - 40;
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.strokeRect(dx, my, dw, dh);
    // Threshold line
    const tx = dx + t * dw;
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(tx, my); ctx.lineTo(tx, my + dh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ACCENT(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('threshold', tx, my + dh + 14);

    // Plot scores as dots
    const dotR = 3;
    cmData.pos.forEach(v => {
      const x = dx + v * dw, y = my + dh * 0.25 + (Math.random() - 0.5) * dh * 0.3;
      ctx.fillStyle = v >= t ? GREEN : '#f0a050';
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2); ctx.fill();
    });
    cmData.neg.forEach(v => {
      const x = dx + v * dw, y = my + dh * 0.75 + (Math.random() - 0.5) * dh * 0.3;
      ctx.fillStyle = v >= t ? RED : BLUE;
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('Actual +', dx + 4, my + dh * 0.12);
    ctx.fillText('Actual −', dx + 4, my + dh * 0.62);
  }

  thresh.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   02 — ROC & AUC
   ═══════════════════════════════════════════════════════════════ */
DRAWS['roc-auc'] = function() {
  const s = setupCanvas('rocCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sep = document.getElementById('rocSep');
  if (!sep) return;

  function draw() {
    const d = +sep.value / 100;
    document.getElementById('rocSepV').textContent = d.toFixed(2);
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad * 2;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad / 2, pw, ph);
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('FPR', pad + pw / 2, h - 4);
    ctx.save(); ctx.translate(10, pad / 2 + ph / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('TPR', 0, 0); ctx.restore();

    // Diagonal (random)
    ctx.strokeStyle = MUTED(); ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(pad, pad / 2 + ph); ctx.lineTo(pad + pw, pad / 2); ctx.stroke();
    ctx.setLineDash([]);

    // Generate ROC curve via parametric model
    const pts = [];
    let auc = 0;
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const tpr = 1 - Math.pow(1 - t, 1 + d * 4);
      const fpr = t;
      pts.push({ fpr, tpr });
    }
    // Calculate AUC via trapezoidal
    for (let i = 1; i < pts.length; i++) {
      auc += (pts[i].fpr - pts[i - 1].fpr) * (pts[i].tpr + pts[i - 1].tpr) / 2;
    }

    // Fill under curve
    ctx.fillStyle = `rgba(200,169,110,0.15)`;
    ctx.beginPath();
    ctx.moveTo(pad, pad / 2 + ph);
    pts.forEach(p => ctx.lineTo(pad + p.fpr * pw, pad / 2 + ph - p.tpr * ph));
    ctx.lineTo(pad + pw, pad / 2 + ph);
    ctx.fill();

    // Curve
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2.5;
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = pad + p.fpr * pw, y = pad / 2 + ph - p.tpr * ph;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    document.getElementById('rocAuc').textContent = auc.toFixed(3);
  }

  sep.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   03 — Regression Metrics
   ═══════════════════════════════════════════════════════════════ */
let regPts;
DRAWS['regression-metrics'] = function() {
  const s = setupCanvas('regCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const noise = document.getElementById('regNoise');
  if (!noise) return;

  function genData(n) {
    regPts = [];
    const nl = +noise.value / 100 * 3;
    for (let i = 0; i < 25; i++) {
      const x = i / 24;
      regPts.push({ x, y: 0.3 + 0.5 * x + gauss() * nl * 0.2 });
    }
  }

  function draw() {
    const nl = +noise.value / 100;
    document.getElementById('regNoiseV').textContent = nl.toFixed(2);
    if (!regPts) genData(25);
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    // Fit line (least squares)
    let sx = 0, sy = 0, sxy = 0, sx2 = 0, n = regPts.length;
    regPts.forEach(p => { sx += p.x; sy += p.y; sxy += p.x * p.y; sx2 += p.x * p.x; });
    const bw = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
    const bb = (sy - bw * sx) / n;
    const yMean = sy / n;

    let ssTot = 0, ssRes = 0, mae = 0, mse = 0;
    regPts.forEach(p => {
      const pred = bw * p.x + bb;
      ssRes += (p.y - pred) ** 2;
      ssTot += (p.y - yMean) ** 2;
      mae += Math.abs(p.y - pred);
      mse += (p.y - pred) ** 2;
    });
    mae /= n; mse /= n;
    const r2 = 1 - ssRes / (ssTot || 1);

    document.getElementById('regMAE').textContent = mae.toFixed(3);
    document.getElementById('regRMSE').textContent = Math.sqrt(mse).toFixed(3);
    document.getElementById('regR2').textContent = r2.toFixed(3);

    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);

    function toX(v) { return pad + v * pw; }
    function toY(v) { return 10 + ph - v * ph; }

    // Residual lines
    regPts.forEach(p => {
      const pred = bw * p.x + bb;
      ctx.strokeStyle = 'rgba(229,115,115,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(toX(p.x), toY(p.y)); ctx.lineTo(toX(p.x), toY(pred)); ctx.stroke();
    });

    // Fit line
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(toX(0), toY(bb)); ctx.lineTo(toX(1), toY(bw + bb)); ctx.stroke();

    // Points
    regPts.forEach(p => {
      ctx.fillStyle = BLUE;
      ctx.beginPath(); ctx.arc(toX(p.x), toY(p.y), 4, 0, Math.PI * 2); ctx.fill();
    });
  }

  noise.oninput = () => { regPts = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   04 — Cross-Validation
   ═══════════════════════════════════════════════════════════════ */
let cvMode = 'kfold';
window.toggleCVMode = function() {
  cvMode = cvMode === 'kfold' ? 'timeseries' : 'kfold';
  document.getElementById('cvMode').textContent = cvMode === 'kfold' ? 'K-Fold' : 'Time-Series';
  if (DRAWS['cross-validation']) DRAWS['cross-validation']();
};
DRAWS['cross-validation'] = function() {
  const s = setupCanvas('cvCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const kSlider = document.getElementById('cvK');
  if (!kSlider) return;

  function draw() {
    const k = +kSlider.value;
    document.getElementById('cvKv').textContent = k;
    ctx.clearRect(0, 0, w, h);
    const pad = 20, barH = Math.min(28, (h - pad * 2) / k - 4);

    for (let fold = 0; fold < k; fold++) {
      const y = pad + fold * (barH + 4);
      ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(`Fold ${fold + 1}`, pad + 40, y + barH / 2);

      const bx = pad + 48, bw = w - bx - pad;
      for (let seg = 0; seg < k; seg++) {
        const sx = bx + (seg / k) * bw;
        const sw = bw / k - 2;

        if (cvMode === 'kfold') {
          ctx.fillStyle = seg === fold ? ACCENT() : BLUE;
          ctx.globalAlpha = seg === fold ? 0.8 : 0.25;
        } else {
          // Time series: train = 0..fold, test = fold+1
          if (seg <= fold) { ctx.fillStyle = BLUE; ctx.globalAlpha = 0.25; }
          else if (seg === fold + 1) { ctx.fillStyle = ACCENT(); ctx.globalAlpha = 0.8; }
          else { ctx.fillStyle = MUTED(); ctx.globalAlpha = 0.08; }
        }
        ctx.fillRect(sx, y, sw, barH);
        ctx.globalAlpha = 1;
      }
    }
    // Legend
    ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillStyle = BLUE; ctx.fillRect(pad + 48, h - 16, 12, 10);
    ctx.fillStyle = MUTED(); ctx.fillText('Train', pad + 64, h - 9);
    ctx.fillStyle = ACCENT(); ctx.fillRect(pad + 110, h - 16, 12, 10);
    ctx.fillStyle = MUTED(); ctx.fillText('Test', pad + 126, h - 9);
  }

  kSlider.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   05 — Comparing Model Runs
   ═══════════════════════════════════════════════════════════════ */
DRAWS['comparing-runs'] = function() {
  const s = setupCanvas('compCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const sA = document.getElementById('compA');
  const sB = document.getElementById('compB');
  if (!sA || !sB) return;

  function draw() {
    const muA = +sA.value / 100, muB = +sB.value / 100;
    document.getElementById('compAv').textContent = muA.toFixed(2);
    document.getElementById('compBv').textContent = muB.toFixed(2);
    ctx.clearRect(0, 0, w, h);
    const pad = 30, pw = w - pad * 2, ph = h - 50;
    const sigA = 0.03, sigB = 0.03;

    // Generate 10-fold scores
    const scoresA = [], scoresB = [];
    for (let i = 0; i < 10; i++) { scoresA.push(muA + gauss() * sigA); scoresB.push(muB + gauss() * sigB); }

    // Paired t-test
    const diffs = scoresA.map((a, i) => a - scoresB[i]);
    const meanD = diffs.reduce((s, v) => s + v, 0) / diffs.length;
    const stdD = Math.sqrt(diffs.reduce((s, v) => s + (v - meanD) ** 2, 0) / (diffs.length - 1));
    const tStat = meanD / (stdD / Math.sqrt(diffs.length));
    // Rough p-value approximation (two-tailed, df=9)
    const pVal = Math.min(1, 2 * Math.exp(-0.5 * tStat * tStat) * 1.5);
    document.getElementById('compP').textContent = pVal < 0.001 ? '<0.001' : pVal.toFixed(3);

    // Draw distributions
    const xMin = 0.6, xMax = 1.0;
    function toX(v) { return pad + (v - xMin) / (xMax - xMin) * pw; }
    function toY(v) { return pad + ph - v * ph; }

    // Density curves
    [{ mu: muA, sig: sigA, col: BLUE, label: 'A' }, { mu: muB, sig: sigB, col: GREEN, label: 'B' }].forEach(m => {
      ctx.strokeStyle = m.col; ctx.lineWidth = 2; ctx.beginPath();
      let maxPdf = 0;
      for (let x = xMin; x <= xMax; x += 0.002) maxPdf = Math.max(maxPdf, gaussPdf(x, m.mu, m.sig));
      for (let x = xMin; x <= xMax; x += 0.002) {
        const y = gaussPdf(x, m.mu, m.sig) / maxPdf;
        x === xMin ? ctx.moveTo(toX(x), toY(y * 0.8)) : ctx.lineTo(toX(x), toY(y * 0.8));
      }
      ctx.stroke();
    });

    // Score dots
    scoresA.forEach(v => { ctx.fillStyle = BLUE; ctx.beginPath(); ctx.arc(toX(v), pad + ph + 10, 3, 0, Math.PI * 2); ctx.fill(); });
    scoresB.forEach(v => { ctx.fillStyle = GREEN; ctx.beginPath(); ctx.arc(toX(v), pad + ph + 20, 3, 0, Math.PI * 2); ctx.fill(); });

    // Labels
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Score', pad + pw / 2, h - 2);
    ctx.fillStyle = BLUE; ctx.fillText('Model A', pad + 30, pad - 8);
    ctx.fillStyle = GREEN; ctx.fillText('Model B', pad + pw - 30, pad - 8);
  }

  sA.oninput = draw; sB.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   06 — Learning Curves
   ═══════════════════════════════════════════════════════════════ */
DRAWS['learning-curves'] = function() {
  const s = setupCanvas('lcCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const comp = document.getElementById('lcComp');
  if (!comp) return;

  function draw() {
    const c = +comp.value;
    document.getElementById('lcCompV').textContent = c;
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    // Axes
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Training samples →', pad + pw / 2, h - 4);

    // Model learning curves based on complexity
    const overfit = c / 100;
    const trainPts = [], valPts = [];
    for (let i = 0; i < 20; i++) {
      const x = (i + 1) / 20;
      const train = Math.min(0.99, 0.6 + 0.4 * (1 - Math.exp(-3 * x)) * (0.5 + 0.5 * overfit));
      const val = Math.min(train, 0.5 + 0.4 * (1 - Math.exp(-2 * x)) * (1 - 0.5 * overfit));
      trainPts.push({ x, y: train });
      valPts.push({ x, y: val });
    }

    function toX(v) { return pad + v * pw; }
    function toY(v) { return 10 + ph * (1 - v); }

    // Gap fill
    ctx.fillStyle = 'rgba(229,115,115,0.1)';
    ctx.beginPath();
    trainPts.forEach((p, i) => i === 0 ? ctx.moveTo(toX(p.x), toY(p.y)) : ctx.lineTo(toX(p.x), toY(p.y)));
    for (let i = valPts.length - 1; i >= 0; i--) ctx.lineTo(toX(valPts[i].x), toY(valPts[i].y));
    ctx.fill();

    // Train curve
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.beginPath();
    trainPts.forEach((p, i) => i === 0 ? ctx.moveTo(toX(p.x), toY(p.y)) : ctx.lineTo(toX(p.x), toY(p.y)));
    ctx.stroke();
    // Val curve
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
    valPts.forEach((p, i) => i === 0 ? ctx.moveTo(toX(p.x), toY(p.y)) : ctx.lineTo(toX(p.x), toY(p.y)));
    ctx.stroke();

    // Legend
    ctx.fillStyle = ACCENT(); ctx.font = `11px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('— Train', pad + 4, 24);
    ctx.fillStyle = BLUE;
    ctx.fillText('— Val', pad + 80, 24);

    // Diagnosis
    const gap = trainPts[19].y - valPts[19].y;
    let diag = 'Good fit';
    if (gap > 0.2) diag = 'Overfitting';
    else if (valPts[19].y < 0.6) diag = 'Underfitting';
    document.getElementById('lcDiag').textContent = diag;
  }

  comp.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   07 — SHAP Values
   ═══════════════════════════════════════════════════════════════ */
let shapData;
window.reshapSHAP = function() { shapData = null; if (DRAWS['shap-values']) DRAWS['shap-values'](); };
DRAWS['shap-values'] = function() {
  const s = setupCanvas('shapCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nSlider = document.getElementById('shapN');
  if (!nSlider) return;

  function draw() {
    const n = +nSlider.value;
    document.getElementById('shapNv').textContent = n;
    if (!shapData || shapData.length !== n) {
      shapData = [];
      const names = ['age', 'income', 'tenure', 'purchases', 'region', 'channel', 'score', 'visits', 'balance', 'tier'];
      for (let i = 0; i < n; i++) shapData.push({ name: names[i], val: (gauss() * 0.3) });
      shapData.sort((a, b) => Math.abs(b.val) - Math.abs(a.val));
    }
    ctx.clearRect(0, 0, w, h);
    const pad = 80, barH = Math.min(28, (h - 30) / n - 4);
    const maxAbs = Math.max(...shapData.map(d => Math.abs(d.val)), 0.01);
    const scale = (w - pad - 40) / 2 / maxAbs;
    const cx = pad + (w - pad - 40) / 2;

    // Centre line
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, 5); ctx.lineTo(cx, h - 5); ctx.stroke();

    shapData.forEach((d, i) => {
      const y = 15 + i * (barH + 4);
      const bw = Math.abs(d.val) * scale;
      const bx = d.val >= 0 ? cx : cx - bw;
      ctx.fillStyle = d.val >= 0 ? RED : BLUE;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bx, y, bw, barH);
      ctx.globalAlpha = 1;
      // Label
      ctx.fillStyle = MUTED(); ctx.font = `11px ${MONO()}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(d.name, pad - 6, y + barH / 2);
      // Value
      ctx.textAlign = d.val >= 0 ? 'left' : 'right';
      ctx.fillText(d.val.toFixed(3), d.val >= 0 ? cx + bw + 4 : cx - bw - 4, y + barH / 2);
    });

    ctx.fillStyle = RED; ctx.font = `9px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('→ pushes higher', cx + (w - pad - 40) / 4, h - 2);
    ctx.fillStyle = BLUE;
    ctx.fillText('← pushes lower', cx - (w - pad - 40) / 4, h - 2);
  }

  nSlider.oninput = () => { shapData = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   08 — Permutation Importance
   ═══════════════════════════════════════════════════════════════ */
let piData;
window.reshufflePerm = function() { piData = null; if (DRAWS['permutation-importance']) DRAWS['permutation-importance'](); };
DRAWS['permutation-importance'] = function() {
  const s = setupCanvas('piCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nSlider = document.getElementById('piN');
  if (!nSlider) return;

  function draw() {
    const n = +nSlider.value;
    document.getElementById('piNv').textContent = n;
    if (!piData || piData.length !== n) {
      piData = [];
      const names = ['feature_A', 'feature_B', 'feature_C', 'feature_D', 'feature_E', 'feature_F', 'feature_G', 'feature_H'];
      for (let i = 0; i < n; i++) piData.push({ name: names[i], imp: Math.max(0, 0.3 - i * 0.04 + gauss() * 0.04) });
      piData.sort((a, b) => b.imp - a.imp);
    }
    ctx.clearRect(0, 0, w, h);
    const pad = 90, barH = Math.min(26, (h - 20) / n - 4);
    const maxImp = Math.max(...piData.map(d => d.imp), 0.01);

    piData.forEach((d, i) => {
      const y = 10 + i * (barH + 4);
      const bw = (d.imp / maxImp) * (w - pad - 30);
      ctx.fillStyle = ACCENT(); ctx.globalAlpha = 0.4 + 0.6 * (d.imp / maxImp);
      ctx.fillRect(pad, y, bw, barH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = MUTED(); ctx.font = `11px ${MONO()}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(d.name, pad - 6, y + barH / 2);
      ctx.textAlign = 'left';
      ctx.fillText(d.imp.toFixed(3), pad + bw + 5, y + barH / 2);
    });
  }

  nSlider.oninput = () => { piData = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   09 — PDP & ICE
   ═══════════════════════════════════════════════════════════════ */
let iceMode = false;
window.toggleICE = function() {
  iceMode = !iceMode;
  const btn = document.getElementById('pdpIce');
  if (btn) btn.textContent = iceMode ? 'ICE ON' : 'ICE OFF';
  if (DRAWS['pdp-ice']) DRAWS['pdp-ice']();
};
DRAWS['pdp-ice'] = function() {
  const s = setupCanvas('pdpCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nSlider = document.getElementById('pdpN');
  if (!nSlider) return;

  function draw() {
    const nInst = +nSlider.value;
    document.getElementById('pdpNv').textContent = nInst;
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);

    function toX(v) { return pad + v * pw; }
    function toY(v) { return 10 + ph * (1 - v); }

    // ICE curves (individual instances)
    if (iceMode) {
      for (let inst = 0; inst < nInst; inst++) {
        const offset = gauss() * 0.15;
        const slope = 0.3 + gauss() * 0.15;
        ctx.strokeStyle = `rgba(79,195,247,0.15)`; ctx.lineWidth = 1; ctx.beginPath();
        for (let x = 0; x <= 1; x += 0.02) {
          const y = clamp(0.3 + slope * x + offset + 0.05 * Math.sin(x * 6 + inst), 0, 1);
          x === 0 ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
        }
        ctx.stroke();
      }
    }

    // PDP (average line)
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = 0; x <= 1; x += 0.02) {
      const y = 0.3 + 0.35 * x + 0.04 * Math.sin(x * 4);
      x === 0 ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Feature value →', pad + pw / 2, h - 4);
    ctx.fillStyle = ACCENT(); ctx.fillText('— PDP', pad + 30, 24);
    if (iceMode) { ctx.fillStyle = BLUE; ctx.fillText('— ICE', pad + 90, 24); }
  }

  nSlider.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   10 — Feature Correlation
   ═══════════════════════════════════════════════════════════════ */
let corrData;
window.regenCorr = function() { corrData = null; if (DRAWS['feature-correlation']) DRAWS['feature-correlation'](); };
DRAWS['feature-correlation'] = function() {
  const s = setupCanvas('corrCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nSlider = document.getElementById('corrN');
  if (!nSlider) return;

  function draw() {
    const n = +nSlider.value;
    document.getElementById('corrNv').textContent = n;
    if (!corrData || corrData.length !== n) {
      corrData = [];
      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
          if (i === j) row.push(1);
          else if (j < i) row.push(corrData[j][i]); // symmetric
          else row.push(Math.round((Math.random() * 2 - 1) * 100) / 100);
        }
        corrData.push(row);
      }
    }
    ctx.clearRect(0, 0, w, h);
    const pad = 60, cellW = Math.min(36, (w - pad - 20) / n), cellH = Math.min(36, (h - pad) / n);
    const labels = ['X₁', 'X₂', 'X₃', 'X₄', 'X₅', 'X₆', 'X₇', 'X₈'];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const v = corrData[i][j];
        const x = pad + j * cellW, y = 10 + i * cellH;
        // Color: red for positive, blue for negative
        if (v >= 0) {
          ctx.fillStyle = `rgba(229,115,115,${Math.abs(v) * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(79,195,247,${Math.abs(v) * 0.7})`;
        }
        ctx.fillRect(x, y, cellW - 1, cellH - 1);
        ctx.fillStyle = Math.abs(v) > 0.5 ? '#fff' : MUTED();
        ctx.font = `${Math.min(10, cellW / 3.5)}px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(v.toFixed(1), x + cellW / 2, y + cellH / 2);
      }
      // Row labels
      ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], pad - 5, 10 + i * cellH + cellH / 2);
      // Col labels
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], pad + i * cellW + cellW / 2, 10 + n * cellH + 14);
    }
  }

  nSlider.oninput = () => { corrData = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   11 — Information Gain
   ═══════════════════════════════════════════════════════════════ */
let miRelation = 0;
const MI_TYPES = ['Linear', 'Quadratic', 'Sine', 'Random'];
window.cycleRelation = function() {
  miRelation = (miRelation + 1) % MI_TYPES.length;
  document.getElementById('miType').textContent = MI_TYPES[miRelation];
  if (DRAWS['information-gain']) DRAWS['information-gain']();
};
DRAWS['information-gain'] = function() {
  const s = setupCanvas('miCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const pad = 40, pw = w - pad * 2, ph = h - pad - 20;
  ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
  ctx.strokeRect(pad, 10, pw, ph);

  const pts = [];
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 2 - 1;
    let y;
    switch (miRelation) {
      case 0: y = x + gauss() * 0.3; break; // linear
      case 1: y = x * x + gauss() * 0.2; break; // quadratic
      case 2: y = Math.sin(x * 3) + gauss() * 0.2; break; // sine
      case 3: y = gauss(); break; // random
    }
    pts.push({ x, y });
  }

  // Compute Pearson correlation
  let sx = 0, sy = 0, sxy = 0, sx2 = 0, sy2 = 0, n = pts.length;
  pts.forEach(p => { sx += p.x; sy += p.y; sxy += p.x * p.y; sx2 += p.x * p.x; sy2 += p.y * p.y; });
  const corr = (n * sxy - sx * sy) / Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy) || 1);

  // Rough MI estimate (correlation-based proxy)
  const mi = miRelation === 3 ? 0 : (miRelation === 0 ? Math.abs(corr) * 1.2 : 0.4 + Math.random() * 0.3);

  document.getElementById('miVal').textContent = mi.toFixed(3);
  document.getElementById('miCorr').textContent = corr.toFixed(3);

  const xMin = -1.5, xMax = 1.5, yMin = -1.5, yMax = 1.5;
  function toX(v) { return pad + (v - xMin) / (xMax - xMin) * pw; }
  function toY(v) { return 10 + ph - (v - yMin) / (yMax - yMin) * ph; }

  pts.forEach(p => {
    ctx.fillStyle = BLUE; ctx.globalAlpha = 0.4;
    ctx.beginPath(); ctx.arc(toX(p.x), toY(p.y), 3, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
  ctx.fillText('X', pad + pw / 2, h - 4);
};

/* ═══════════════════════════════════════════════════════════════
   12 — Distribution Shape
   ═══════════════════════════════════════════════════════════════ */
DRAWS['distribution-shape'] = function() {
  const s = setupCanvas('distCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const skewS = document.getElementById('distSkew');
  const kurtS = document.getElementById('distKurt');
  if (!skewS || !kurtS) return;

  function draw() {
    const skew = +skewS.value / 10;
    const kurt = +kurtS.value / 10;
    document.getElementById('distSkewV').textContent = skew.toFixed(1);
    document.getElementById('distKurtV').textContent = kurt.toFixed(1);
    ctx.clearRect(0, 0, w, h);
    const pad = 30, pw = w - pad * 2, ph = h - pad - 10;

    // Generate skewed distribution using sinh-arcsinh transform
    const pts = [];
    let maxY = 0;
    for (let x = -4; x <= 4; x += 0.05) {
      // Approximate skewed/heavy-tailed pdf
      let y = gaussPdf(x, skew * 0.3, 1 + kurt * 0.05);
      if (skew > 0) y *= (1 + 0.3 * skew * x);
      else if (skew < 0) y *= (1 - 0.3 * Math.abs(skew) * x);
      y = Math.max(0, y);
      maxY = Math.max(maxY, y);
      pts.push({ x, y });
    }

    function toX(v) { return pad + (v + 4) / 8 * pw; }
    function toY(v) { return pad + ph - (v / (maxY || 1)) * ph * 0.9; }

    // Fill
    ctx.fillStyle = `rgba(200,169,110,0.15)`;
    ctx.beginPath(); ctx.moveTo(toX(-4), toY(0));
    pts.forEach(p => ctx.lineTo(toX(p.x), toY(p.y)));
    ctx.lineTo(toX(4), toY(0)); ctx.fill();

    // Line
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(toX(p.x), toY(p.y)) : ctx.lineTo(toX(p.x), toY(p.y)));
    ctx.stroke();

    // Normal overlay
    ctx.strokeStyle = MUTED(); ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.beginPath();
    for (let x = -4; x <= 4; x += 0.05) {
      const ny = gaussPdf(x, 0, 1);
      const nScaled = ny / (maxY || 1);
      x === -4 ? ctx.moveTo(toX(x), toY(gaussPdf(x, 0, 1))) : ctx.lineTo(toX(x), toY(gaussPdf(x, 0, 1)));
    }
    ctx.stroke(); ctx.setLineDash([]);
  }

  skewS.oninput = draw; kurtS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   13 — Outlier Detection
   ═══════════════════════════════════════════════════════════════ */
let outMethod = 0;
const OUT_METHODS = ['IQR', 'Z-Score', 'Isolation'];
window.cycleOutlier = function() {
  outMethod = (outMethod + 1) % OUT_METHODS.length;
  document.getElementById('outMethod').textContent = OUT_METHODS[outMethod];
  if (DRAWS['outlier-detection']) DRAWS['outlier-detection']();
};
let outData;
DRAWS['outlier-detection'] = function() {
  const s = setupCanvas('outCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  if (!outData) {
    outData = [];
    for (let i = 0; i < 80; i++) outData.push(gauss());
    // Add outliers
    outData.push(4.2, -3.8, 3.5, -4.1, 5.0);
  }
  ctx.clearRect(0, 0, w, h);
  const pad = 30, pw = w - pad * 2, ph = h - pad - 10;
  const sorted = [...outData].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const mean = outData.reduce((s, v) => s + v, 0) / outData.length;
  const std = Math.sqrt(outData.reduce((s, v) => s + (v - mean) ** 2, 0) / outData.length);
  const xMin = -6, xMax = 6;

  function toX(v) { return pad + (v - xMin) / (xMax - xMin) * pw; }

  // Determine outlier mask
  let outliers;
  switch (outMethod) {
    case 0: outliers = outData.map(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr); break;
    case 1: outliers = outData.map(v => Math.abs((v - mean) / std) > 3); break;
    case 2: outliers = outData.map(v => Math.abs(v) > 3.2); break; // simplified
  }

  const nOut = outliers.filter(Boolean).length;
  document.getElementById('outCount').textContent = nOut;

  // Boundaries
  let lo, hi;
  if (outMethod === 0) { lo = q1 - 1.5 * iqr; hi = q3 + 1.5 * iqr; }
  else if (outMethod === 1) { lo = mean - 3 * std; hi = mean + 3 * std; }
  else { lo = -3.2; hi = 3.2; }

  // Shaded inlier zone
  ctx.fillStyle = 'rgba(79,195,247,0.08)';
  ctx.fillRect(toX(lo), 10, toX(hi) - toX(lo), ph);
  ctx.strokeStyle = BLUE; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(toX(lo), 10); ctx.lineTo(toX(lo), 10 + ph); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(hi), 10); ctx.lineTo(toX(hi), 10 + ph); ctx.stroke();
  ctx.setLineDash([]);

  // Plot points with jitter
  outData.forEach((v, i) => {
    const x = toX(v);
    const y = h / 2 + (Math.random() - 0.5) * ph * 0.6;
    ctx.fillStyle = outliers[i] ? RED : GREEN;
    ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.arc(x, y, outliers[i] ? 5 : 3.5, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
};

/* ═══════════════════════════════════════════════════════════════
   14 — Missing Data
   ═══════════════════════════════════════════════════════════════ */
let missStrat = 0;
const MISS_STRATS = ['Mean', 'Median', 'KNN', 'Drop'];
window.cycleImpute = function() {
  missStrat = (missStrat + 1) % MISS_STRATS.length;
  document.getElementById('missStrat').textContent = MISS_STRATS[missStrat];
  if (DRAWS['missing-data']) DRAWS['missing-data']();
};
DRAWS['missing-data'] = function() {
  const s = setupCanvas('missCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const pctS = document.getElementById('missPct');
  if (!pctS) return;

  function draw() {
    const pct = +pctS.value;
    document.getElementById('missPctV').textContent = pct + '%';
    ctx.clearRect(0, 0, w, h);

    // Data grid (8 cols x 10 rows)
    const cols = 8, rows = 10;
    const pad = 20, cellW = Math.min(40, (w - pad * 2) / cols - 2), cellH = Math.min(22, (h - pad) / rows - 2);
    const gx = pad, gy = 10;

    // Generate a mask of missing
    const mask = [];
    for (let r = 0; r < rows; r++) {
      mask[r] = [];
      for (let c = 0; c < cols; c++) {
        mask[r][c] = Math.random() * 100 < pct;
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = gx + c * (cellW + 2), y = gy + r * (cellH + 2);
        if (mask[r][c]) {
          if (missStrat === 3) {
            // Drop: show as empty
            ctx.fillStyle = 'rgba(229,115,115,0.2)';
            ctx.fillRect(x, y, cellW, cellH);
            ctx.strokeStyle = RED; ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, cellW, cellH);
          } else {
            // Imputed
            ctx.fillStyle = 'rgba(129,199,132,0.3)';
            ctx.fillRect(x, y, cellW, cellH);
            ctx.fillStyle = GREEN; ctx.font = `9px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(missStrat === 0 ? 'μ' : missStrat === 1 ? 'M' : 'k', x + cellW / 2, y + cellH / 2);
          }
        } else {
          ctx.fillStyle = 'rgba(79,195,247,0.15)';
          ctx.fillRect(x, y, cellW, cellH);
          ctx.fillStyle = BLUE; ctx.font = `9px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText((Math.random() * 10).toFixed(1), x + cellW / 2, y + cellH / 2);
        }
      }
    }

    // Legend
    const ly = gy + rows * (cellH + 2) + 8;
    ctx.fillStyle = 'rgba(79,195,247,0.15)'; ctx.fillRect(gx, ly, 12, 10);
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('Present', gx + 16, ly + 8);
    ctx.fillStyle = missStrat === 3 ? 'rgba(229,115,115,0.2)' : 'rgba(129,199,132,0.3)';
    ctx.fillRect(gx + 80, ly, 12, 10);
    ctx.fillStyle = MUTED();
    ctx.fillText(missStrat === 3 ? 'Dropped' : 'Imputed', gx + 96, ly + 8);
  }

  pctS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   15 — Data Drift
   ═══════════════════════════════════════════════════════════════ */
DRAWS['data-drift'] = function() {
  const s = setupCanvas('driftCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const amt = document.getElementById('driftAmt');
  if (!amt) return;

  function draw() {
    const d = +amt.value / 100 * 2;
    document.getElementById('driftAmtV').textContent = (d / 2).toFixed(2);
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    function toX(v) { return pad + (v + 5) / 10 * pw; }
    function toY(v) { return 10 + ph - v * ph; }

    // Reference distribution
    let maxPdf = 0;
    for (let x = -5; x <= 5; x += 0.1) maxPdf = Math.max(maxPdf, gaussPdf(x, 0, 1));

    // Reference (blue)
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = -5; x <= 5; x += 0.05) {
      const y = gaussPdf(x, 0, 1) / maxPdf * 0.85;
      x === -5 ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // New (drifted) distribution
    maxPdf = 0;
    for (let x = -5; x <= 5; x += 0.1) maxPdf = Math.max(maxPdf, gaussPdf(x, d, 1 + d * 0.2));
    ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = -5; x <= 5; x += 0.05) {
      const y = gaussPdf(x, d, 1 + d * 0.2) / maxPdf * 0.85;
      x === -5 ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // PSI approximation
    let psi = 0;
    const bins = 10;
    for (let i = 0; i < bins; i++) {
      const lo = -3 + i * 6 / bins, hi = lo + 6 / bins;
      const mid = (lo + hi) / 2;
      const p = gaussPdf(mid, 0, 1) * (6 / bins) + 0.001;
      const q = gaussPdf(mid, d, 1 + d * 0.2) * (6 / bins) + 0.001;
      psi += (p - q) * Math.log(p / q);
    }
    document.getElementById('driftPSI').textContent = Math.abs(psi).toFixed(3);

    // Legend
    ctx.fillStyle = BLUE; ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('— Reference', pad + 4, 24);
    ctx.fillStyle = RED; ctx.fillText('— Current', pad + 100, 24);
    ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('Feature value', pad + pw / 2, h - 4);
  }

  amt.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   16 — Class Imbalance
   ═══════════════════════════════════════════════════════════════ */
let imbStrat = 0;
const IMB_STRATS = ['None', 'SMOTE', 'Undersample', 'Weights'];
window.cycleImbalance = function() {
  imbStrat = (imbStrat + 1) % IMB_STRATS.length;
  document.getElementById('imbStrat').textContent = IMB_STRATS[imbStrat];
  if (DRAWS['class-imbalance']) DRAWS['class-imbalance']();
};
DRAWS['class-imbalance'] = function() {
  const s = setupCanvas('imbCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const ratio = document.getElementById('imbRatio');
  if (!ratio) return;

  function draw() {
    const r = +ratio.value;
    document.getElementById('imbRatioV').textContent = `1:${r}`;
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 10;

    const nMaj = 50, nMin = Math.max(2, Math.round(50 / r));
    let effMin = nMin, effMaj = nMaj;
    if (imbStrat === 1) effMin = nMaj; // SMOTE
    if (imbStrat === 2) effMaj = nMin; // Undersample

    // Draw scatter
    const pts = [];
    for (let i = 0; i < effMaj; i++) pts.push({ x: 0.5 + gauss() * 0.2, y: 0.5 + gauss() * 0.2, cls: 0 });
    for (let i = 0; i < effMin; i++) pts.push({ x: 0.2 + gauss() * 0.12, y: 0.3 + gauss() * 0.12, cls: 1 });

    function toX(v) { return pad + clamp(v, 0, 1) * pw; }
    function toY(v) { return 10 + clamp(1 - v, 0, 1) * ph; }

    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);

    pts.forEach(p => {
      ctx.fillStyle = p.cls === 0 ? BLUE : RED;
      ctx.globalAlpha = p.cls === 1 && imbStrat === 1 && Math.random() > nMin / effMin ? 0.35 : 0.6;
      const sz = imbStrat === 3 && p.cls === 1 ? 5 : 3.5;
      ctx.beginPath(); ctx.arc(toX(p.x), toY(p.y), sz, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Legend
    ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillStyle = BLUE; ctx.fillText(`● Majority (${effMaj})`, pad + 4, h - 2);
    ctx.fillStyle = RED; ctx.fillText(`● Minority (${effMin})`, pad + pw / 2, h - 2);
  }

  ratio.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   17 — Sharpe Ratio
   ═══════════════════════════════════════════════════════════════ */
DRAWS['sharpe-ratio'] = function() {
  const s = setupCanvas('sharpeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const retS = document.getElementById('sharpeRet');
  const volS = document.getElementById('sharpeVol');
  if (!retS || !volS) return;

  function draw() {
    const ret = +retS.value, vol = +volS.value;
    document.getElementById('sharpeRetV').textContent = ret + '%';
    document.getElementById('sharpeVolV').textContent = vol + '%';
    const rf = 5; // risk-free rate
    const sharpe = (ret - rf) / (vol || 1);
    document.getElementById('sharpeSR').textContent = sharpe.toFixed(2);
    ctx.clearRect(0, 0, w, h);

    const pad = 50, pw = w - pad * 2, ph = h - pad - 20;
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);

    // Axes labels
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Volatility %', pad + pw / 2, h - 4);
    ctx.save(); ctx.translate(12, 10 + ph / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Return %', 0, 0); ctx.restore();

    // Risk-free point
    function toX(v) { return pad + v / 50 * pw; }
    function toY(v) { return 10 + ph - v / 50 * ph; }

    // Capital market line (Sharpe line from rf)
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.setLineDash([6, 3]);
    ctx.beginPath(); ctx.moveTo(toX(0), toY(rf)); ctx.lineTo(toX(50), toY(rf + sharpe * 50)); ctx.stroke();
    ctx.setLineDash([]);

    // Portfolio dot
    ctx.fillStyle = ACCENT();
    ctx.beginPath(); ctx.arc(toX(vol), toY(ret), 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `bold 10px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('P', toX(vol), toY(ret));

    // Rf dot
    ctx.fillStyle = GREEN;
    ctx.beginPath(); ctx.arc(toX(0), toY(rf), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = MUTED(); ctx.font = `9px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('Rf', toX(0) + 8, toY(rf));

    // Sharpe label
    ctx.fillStyle = ACCENT(); ctx.font = `11px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText(`Sharpe = ${sharpe.toFixed(2)}`, pad + 8, 26);
  }

  retS.oninput = draw; volS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   18 — Maximum Drawdown
   ═══════════════════════════════════════════════════════════════ */
let ddPath;
window.regenDD = function() { ddPath = null; if (DRAWS['max-drawdown']) DRAWS['max-drawdown'](); };
DRAWS['max-drawdown'] = function() {
  const s = setupCanvas('ddCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const volS = document.getElementById('ddVol');
  if (!volS) return;

  function draw() {
    const vol = +volS.value / 100;
    document.getElementById('ddVolV').textContent = (vol * 100).toFixed(0) + '%';
    if (!ddPath) {
      ddPath = [1];
      for (let i = 1; i < 200; i++) {
        const ret = gauss() * vol / Math.sqrt(252) + 0.0003;
        ddPath.push(ddPath[i - 1] * (1 + ret));
      }
    }
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 10;

    const maxVal = Math.max(...ddPath), minVal = Math.min(...ddPath);
    function toX(i) { return pad + i / (ddPath.length - 1) * pw; }
    function toY(v) { return 10 + ph - (v - minVal) / (maxVal - minVal || 1) * ph; }

    // Running max
    const running = [];
    let rm = 0;
    ddPath.forEach(v => { rm = Math.max(rm, v); running.push(rm); });

    // Find max drawdown
    let maxDD = 0, ddStart = 0, ddEnd = 0;
    for (let i = 0; i < ddPath.length; i++) {
      const dd = (running[i] - ddPath[i]) / running[i];
      if (dd > maxDD) { maxDD = dd; ddEnd = i; }
    }
    // Find peak before maxDD end
    for (let i = ddEnd; i >= 0; i--) {
      if (ddPath[i] >= running[ddEnd]) { ddStart = i; break; }
    }

    document.getElementById('ddMax').textContent = (-maxDD * 100).toFixed(1) + '%';

    // Drawdown shading
    ctx.fillStyle = 'rgba(229,115,115,0.15)';
    ctx.beginPath(); ctx.moveTo(toX(ddStart), toY(ddPath[ddStart]));
    for (let i = ddStart; i <= ddEnd; i++) ctx.lineTo(toX(i), toY(ddPath[i]));
    ctx.lineTo(toX(ddEnd), toY(running[ddEnd]));
    ctx.lineTo(toX(ddStart), toY(running[ddStart])); ctx.fill();

    // Equity curve
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.beginPath();
    ddPath.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Running max line
    ctx.strokeStyle = MUTED(); ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath();
    running.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke(); ctx.setLineDash([]);
  }

  volS.oninput = () => { ddPath = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   19 — Walk-Forward Validation
   ═══════════════════════════════════════════════════════════════ */
let wfMode = 'rolling';
window.toggleWFMode = function() {
  wfMode = wfMode === 'rolling' ? 'anchored' : 'rolling';
  document.getElementById('wfMode').textContent = wfMode === 'rolling' ? 'Rolling' : 'Anchored';
  if (DRAWS['walk-forward']) DRAWS['walk-forward']();
};
DRAWS['walk-forward'] = function() {
  const s = setupCanvas('wfCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const winS = document.getElementById('wfWin');
  if (!winS) return;

  function draw() {
    const win = +winS.value;
    document.getElementById('wfWinV').textContent = win;
    ctx.clearRect(0, 0, w, h);
    const pad = 20, totalPeriods = 20, step = 2;
    const barH = 18, gapY = 4;
    const bx = pad + 10, bw = w - bx - pad;

    let fold = 0;
    for (let start = 0; start + win + step <= totalPeriods; start += step) {
      const trainStart = wfMode === 'rolling' ? start : 0;
      const trainEnd = start + win;
      const testEnd = Math.min(trainEnd + step, totalPeriods);
      const y = pad + fold * (barH + gapY);
      if (y + barH > h - 10) break;

      for (let seg = 0; seg < totalPeriods; seg++) {
        const sx = bx + (seg / totalPeriods) * bw;
        const sw = bw / totalPeriods - 1;
        if (seg >= trainStart && seg < trainEnd) {
          ctx.fillStyle = BLUE; ctx.globalAlpha = 0.3;
        } else if (seg >= trainEnd && seg < testEnd) {
          ctx.fillStyle = ACCENT(); ctx.globalAlpha = 0.8;
        } else {
          ctx.fillStyle = MUTED(); ctx.globalAlpha = 0.05;
        }
        ctx.fillRect(sx, y, sw, barH);
      }
      ctx.globalAlpha = 1;
      fold++;
    }

    // Time arrow
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Time →', bx + bw / 2, h - 4);
    // Legend
    ctx.fillStyle = BLUE; ctx.fillRect(bx, h - 16, 12, 10);
    ctx.fillStyle = MUTED(); ctx.textAlign = 'left'; ctx.fillText('Train', bx + 16, h - 8);
    ctx.fillStyle = ACCENT(); ctx.fillRect(bx + 60, h - 16, 12, 10);
    ctx.fillStyle = MUTED(); ctx.fillText('Test', bx + 76, h - 8);
  }

  winS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   20 — Monte Carlo Simulation
   ═══════════════════════════════════════════════════════════════ */
let mcPaths;
window.regenMC = function() { mcPaths = null; if (DRAWS['monte-carlo']) DRAWS['monte-carlo'](); };
DRAWS['monte-carlo'] = function() {
  const s = setupCanvas('mcCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nS = document.getElementById('mcPaths');
  if (!nS) return;

  function draw() {
    const nPaths = +nS.value;
    document.getElementById('mcPathsV').textContent = nPaths;
    if (!mcPaths || mcPaths.length !== nPaths) {
      mcPaths = [];
      for (let p = 0; p < nPaths; p++) {
        const path = [1];
        for (let d = 1; d < 100; d++) {
          path.push(path[d - 1] * (1 + gauss() * 0.015 + 0.0004));
        }
        mcPaths.push(path);
      }
    }
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 10;

    // Find bounds
    let allMin = Infinity, allMax = -Infinity;
    mcPaths.forEach(path => path.forEach(v => { allMin = Math.min(allMin, v); allMax = Math.max(allMax, v); }));

    function toX(i) { return pad + i / 99 * pw; }
    function toY(v) { return 10 + ph - (v - allMin) / (allMax - allMin || 1) * ph; }

    // Draw each path
    mcPaths.forEach(path => {
      ctx.strokeStyle = `rgba(200,169,110,${Math.min(0.3, 5 / nPaths)})`;
      ctx.lineWidth = 1; ctx.beginPath();
      path.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
      ctx.stroke();
    });

    // Percentile bands
    const p5 = [], p50 = [], p95 = [];
    for (let d = 0; d < 100; d++) {
      const vals = mcPaths.map(p => p[d]).sort((a, b) => a - b);
      p5.push(vals[Math.floor(nPaths * 0.05)] || vals[0]);
      p50.push(vals[Math.floor(nPaths * 0.5)] || vals[0]);
      p95.push(vals[Math.floor(nPaths * 0.95)] || vals[vals.length - 1]);
    }

    // P5 / P95 fill
    ctx.fillStyle = 'rgba(79,195,247,0.1)'; ctx.beginPath();
    p5.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    for (let i = 99; i >= 0; i--) ctx.lineTo(toX(i), toY(p95[i]));
    ctx.fill();

    // Median
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
    p50.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    document.getElementById('mc5').textContent = ((p5[99] - 1) * 100).toFixed(1) + '%';
  }

  nS.oninput = () => { mcPaths = null; draw(); };
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   21 — Survivorship Bias
   ═══════════════════════════════════════════════════════════════ */
DRAWS['survivorship-bias'] = function() {
  const s = setupCanvas('survCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const delS = document.getElementById('survDel');
  if (!delS) return;

  function draw() {
    const delPct = +delS.value;
    document.getElementById('survDelV').textContent = delPct + '%';
    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    // 50 stocks over 20 periods
    const nStocks = 50, periods = 20;
    const paths = [];
    for (let s = 0; s < nStocks; s++) {
      const path = [1];
      const drift = gauss() * 0.02;
      let alive = true;
      for (let t = 1; t < periods; t++) {
        if (!alive) { path.push(null); continue; }
        const ret = drift + gauss() * 0.08;
        path.push(path[t - 1] * (1 + ret));
        if (path[t] < 0.3 && Math.random() < delPct / 100) alive = false; // delist
      }
      paths.push(path);
    }

    const survivors = paths.filter(p => p[periods - 1] !== null);
    const biasedReturn = survivors.length > 0 ? survivors.reduce((s, p) => s + p[periods - 1], 0) / survivors.length : 1;
    const allFinal = paths.map(p => { for (let t = periods - 1; t >= 0; t--) if (p[t] !== null) return p[t]; return 0; });
    const realReturn = allFinal.reduce((s, v) => s + v, 0) / allFinal.length;

    document.getElementById('survBias').textContent = ((biasedReturn - 1) * 100).toFixed(1) + '%';
    document.getElementById('survReal').textContent = ((realReturn - 1) * 100).toFixed(1) + '%';

    let allMax = 0;
    paths.forEach(p => p.forEach(v => { if (v !== null) allMax = Math.max(allMax, v); }));

    function toX(t) { return pad + t / (periods - 1) * pw; }
    function toY(v) { return 10 + ph - v / (allMax || 2) * ph; }

    // Draw all paths
    paths.forEach(p => {
      const surv = p[periods - 1] !== null;
      ctx.strokeStyle = surv ? `rgba(200,169,110,0.3)` : `rgba(229,115,115,0.3)`;
      ctx.lineWidth = 1; ctx.beginPath();
      for (let t = 0; t < periods; t++) {
        if (p[t] === null) break;
        t === 0 ? ctx.moveTo(toX(t), toY(p[t])) : ctx.lineTo(toX(t), toY(p[t]));
      }
      ctx.stroke();
      // Mark delist with X
      if (!surv) {
        for (let t = periods - 1; t >= 0; t--) {
          if (p[t] !== null) {
            ctx.fillStyle = RED; ctx.font = `bold 12px ${MONO()}`; ctx.textAlign = 'center';
            ctx.fillText('×', toX(t), toY(p[t]));
            break;
          }
        }
      }
    });

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Time →', pad + pw / 2, h - 4);
  }

  delS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   22 — Confidence Intervals
   ═══════════════════════════════════════════════════════════════ */
DRAWS['confidence-intervals'] = function() {
  const s = setupCanvas('ciCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const nS = document.getElementById('ciN');
  const confS = document.getElementById('ciConf');
  if (!nS || !confS) return;

  function draw() {
    const n = +nS.value, conf = +confS.value;
    document.getElementById('ciNv').textContent = n;
    document.getElementById('ciConfV').textContent = conf + '%';
    ctx.clearRect(0, 0, w, h);

    // Z values for confidence levels
    const zMap = { 80: 1.28, 85: 1.44, 90: 1.645, 95: 1.96, 99: 2.576 };
    const z = zMap[conf] || 1.96;
    const trueMean = 50, trueSigma = 10;

    // Draw 20 CIs from different samples
    const nCIs = 20;
    const pad = 40, barH = Math.min(10, (h - 30) / nCIs - 2);
    let hits = 0;

    for (let i = 0; i < nCIs; i++) {
      // Sample mean
      const sampleMean = trueMean + gauss() * trueSigma / Math.sqrt(n);
      const me = z * trueSigma / Math.sqrt(n);
      const lo = sampleMean - me, hi = sampleMean + me;
      const contains = lo <= trueMean && hi >= trueMean;
      if (contains) hits++;

      const y = 10 + i * (barH + 3);
      function toX(v) { return pad + (v - 20) / 60 * (w - pad * 2); }

      ctx.strokeStyle = contains ? BLUE : RED; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(toX(lo), y + barH / 2); ctx.lineTo(toX(hi), y + barH / 2); ctx.stroke();
      ctx.fillStyle = contains ? BLUE : RED;
      ctx.beginPath(); ctx.arc(toX(sampleMean), y + barH / 2, 3, 0, Math.PI * 2); ctx.fill();
    }

    // True mean line
    const tmX = pad + (trueMean - 20) / 60 * (w - pad * 2);
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(tmX, 5); ctx.lineTo(tmX, h - 20); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ACCENT(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('True μ', tmX, h - 6);

    const width = 2 * z * trueSigma / Math.sqrt(n);
    document.getElementById('ciWidth').textContent = width.toFixed(2);
  }

  nS.oninput = draw; confS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   23 — Bootstrap Methods
   ═══════════════════════════════════════════════════════════════ */
let bootData;
window.regenBoot = function() { bootData = null; if (DRAWS['bootstrap-methods']) DRAWS['bootstrap-methods'](); };
DRAWS['bootstrap-methods'] = function() {
  const s = setupCanvas('bootCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const bS = document.getElementById('bootB');
  if (!bS) return;

  function draw() {
    const B = +bS.value;
    document.getElementById('bootBv').textContent = B;

    // Original sample
    const sample = [];
    for (let i = 0; i < 30; i++) sample.push(50 + gauss() * 12);

    // Bootstrap
    const means = [];
    for (let b = 0; b < B; b++) {
      let sum = 0;
      for (let i = 0; i < sample.length; i++) sum += sample[Math.floor(Math.random() * sample.length)];
      means.push(sum / sample.length);
    }

    const se = Math.sqrt(means.reduce((s, m) => s + (m - means.reduce((a, b) => a + b, 0) / means.length) ** 2, 0) / means.length);
    document.getElementById('bootSE').textContent = se.toFixed(3);

    ctx.clearRect(0, 0, w, h);
    const pad = 30, pw = w - pad * 2, ph = h - pad - 10;

    // Histogram of bootstrap means
    const bins = 30;
    const bMin = Math.min(...means) - 1, bMax = Math.max(...means) + 1;
    const counts = new Array(bins).fill(0);
    means.forEach(m => {
      const idx = Math.min(bins - 1, Math.floor((m - bMin) / (bMax - bMin) * bins));
      counts[idx]++;
    });
    const maxCount = Math.max(...counts);

    for (let i = 0; i < bins; i++) {
      const x = pad + (i / bins) * pw;
      const bw = pw / bins - 1;
      const bh = (counts[i] / (maxCount || 1)) * ph;
      ctx.fillStyle = BLUE; ctx.globalAlpha = 0.6;
      ctx.fillRect(x, 10 + ph - bh, bw, bh);
    }
    ctx.globalAlpha = 1;

    // Mean line
    const bootMean = means.reduce((a, b) => a + b, 0) / means.length;
    const mx = pad + (bootMean - bMin) / (bMax - bMin) * pw;
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(mx, 10); ctx.lineTo(mx, 10 + ph); ctx.stroke();
    ctx.fillStyle = ACCENT(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText(`μ̂ = ${bootMean.toFixed(2)}`, mx, h - 2);
  }

  bS.oninput = () => draw();
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   24 — Bayesian A/B Testing
   ═══════════════════════════════════════════════════════════════ */
DRAWS['bayesian-ab'] = function() {
  const s = setupCanvas('abCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const aS = document.getElementById('abA');
  const bSl = document.getElementById('abB');
  if (!aS || !bSl) return;

  function draw() {
    const convA = +aS.value, convB = +bSl.value;
    const totalA = 1000, totalB = 1000;
    document.getElementById('abAv').textContent = convA;
    document.getElementById('abBv').textContent = convB;

    const alphaA = convA + 1, betaA = totalA - convA + 1;
    const alphaB = convB + 1, betaB = totalB - convB + 1;

    ctx.clearRect(0, 0, w, h);
    const pad = 40, pw = w - pad * 2, ph = h - pad - 20;

    // Plot range
    const lo = Math.max(0, Math.min(convA, convB) / totalA - 0.05);
    const hi = Math.min(1, Math.max(convA, convB) / totalA + 0.05);

    function toX(v) { return pad + (v - lo) / (hi - lo) * pw; }

    // Find max pdf for scaling
    let maxPdf = 0;
    for (let x = lo; x <= hi; x += 0.001) {
      maxPdf = Math.max(maxPdf, betaPdf(x, alphaA, betaA), betaPdf(x, alphaB, betaB));
    }
    function toY(v) { return 10 + ph - (v / maxPdf) * ph * 0.9; }

    // Posterior A
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = lo; x <= hi; x += 0.0005) {
      const y = betaPdf(x, alphaA, betaA);
      x === lo ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // Posterior B
    ctx.strokeStyle = GREEN; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = lo; x <= hi; x += 0.0005) {
      const y = betaPdf(x, alphaB, betaB);
      x === lo ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // P(B > A) via simulation
    let bWins = 0;
    const nSim = 5000;
    for (let i = 0; i < nSim; i++) {
      // Sample from Beta using gamma sampling
      const sA = sampleBeta(alphaA, betaA);
      const sB = sampleBeta(alphaB, betaB);
      if (sB > sA) bWins++;
    }
    document.getElementById('abProb').textContent = (bWins / nSim).toFixed(3);

    // Labels
    ctx.fillStyle = BLUE; ctx.font = `11px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('A', pad + 4, 22);
    ctx.fillStyle = GREEN; ctx.fillText('B', pad + 30, 22);
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('Conversion rate', pad + pw / 2, h - 4);
  }

  function sampleBeta(a, b) {
    // Simple beta sampling via gamma
    const ga = sampleGamma(a), gb = sampleGamma(b);
    return ga / (ga + gb);
  }
  function sampleGamma(shape) {
    if (shape < 1) return sampleGamma(shape + 1) * Math.pow(Math.random(), 1 / shape);
    const d = shape - 1 / 3, c = 1 / Math.sqrt(9 * d);
    while (true) {
      let x, v;
      do { x = gauss(); v = 1 + c * x; } while (v <= 0);
      v = v * v * v;
      const u = Math.random();
      if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v;
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
  }

  aS.oninput = draw; bSl.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   25 — Effect Size
   ═══════════════════════════════════════════════════════════════ */
DRAWS['effect-size'] = function() {
  const s = setupCanvas('esCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const diffS = document.getElementById('esDiff');
  if (!diffS) return;

  function draw() {
    const diff = +diffS.value / 100;
    document.getElementById('esDiffV').textContent = diff.toFixed(2);
    const d = diff; // Cohen's d (sigma = 1)
    document.getElementById('esD').textContent = d.toFixed(2);

    // Overlap (approximate using OVL formula for normal distributions)
    const ovl = 2 * (1 - normalCdf(Math.abs(d) / 2));
    document.getElementById('esOverlap').textContent = (ovl * 100).toFixed(1) + '%';

    ctx.clearRect(0, 0, w, h);
    const pad = 30, pw = w - pad * 2, ph = h - pad - 10;
    const xMin = -4, xMax = 4 + diff;

    function toX(v) { return pad + (v - xMin) / (xMax - xMin) * pw; }
    let maxPdf = 0;
    for (let x = xMin; x <= xMax; x += 0.1) maxPdf = Math.max(maxPdf, gaussPdf(x, 0, 1), gaussPdf(x, diff, 1));
    function toY(v) { return 10 + ph - (v / maxPdf) * ph * 0.85; }

    // Group A
    ctx.fillStyle = 'rgba(79,195,247,0.15)'; ctx.beginPath();
    ctx.moveTo(toX(xMin), toY(0));
    for (let x = xMin; x <= xMax; x += 0.05) ctx.lineTo(toX(x), toY(gaussPdf(x, 0, 1)));
    ctx.lineTo(toX(xMax), toY(0)); ctx.fill();
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.05) {
      x === xMin ? ctx.moveTo(toX(x), toY(gaussPdf(x, 0, 1))) : ctx.lineTo(toX(x), toY(gaussPdf(x, 0, 1)));
    }
    ctx.stroke();

    // Group B
    ctx.fillStyle = 'rgba(129,199,132,0.15)'; ctx.beginPath();
    ctx.moveTo(toX(xMin), toY(0));
    for (let x = xMin; x <= xMax; x += 0.05) ctx.lineTo(toX(x), toY(gaussPdf(x, diff, 1)));
    ctx.lineTo(toX(xMax), toY(0)); ctx.fill();
    ctx.strokeStyle = GREEN; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.05) {
      x === xMin ? ctx.moveTo(toX(x), toY(gaussPdf(x, diff, 1))) : ctx.lineTo(toX(x), toY(gaussPdf(x, diff, 1)));
    }
    ctx.stroke();

    ctx.fillStyle = BLUE; ctx.font = `11px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText('A', toX(0), 22);
    ctx.fillStyle = GREEN; ctx.fillText('B', toX(diff), 22);
  }

  function normalCdf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1; x = Math.abs(x) / Math.sqrt(2);
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1 + sign * y);
  }

  diffS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   26 — Power Analysis
   ═══════════════════════════════════════════════════════════════ */
DRAWS['power-analysis'] = function() {
  const s = setupCanvas('powCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const dS = document.getElementById('powD');
  const alphaS = document.getElementById('powAlpha');
  if (!dS || !alphaS) return;

  function normalCdf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1; x = Math.abs(x) / Math.sqrt(2);
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1 + sign * y);
  }

  function draw() {
    const d = +dS.value / 100;
    const alpha = +alphaS.value / 100;
    document.getElementById('powDv').textContent = d.toFixed(2);
    document.getElementById('powAlphaV').textContent = alpha.toFixed(2);
    ctx.clearRect(0, 0, w, h);
    const pad = 50, pw = w - pad * 2, ph = h - pad - 20;

    ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, 10, pw, ph);

    function toX(n) { return pad + n / 300 * pw; }
    function toY(p) { return 10 + ph * (1 - p); }

    // Power curve
    const zAlpha = -Math.log(2 * alpha) * 0.6 + 0.8; // rough approximation
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2.5; ctx.beginPath();
    let nNeeded = null;
    for (let n = 5; n <= 300; n += 2) {
      const power = normalCdf(d * Math.sqrt(n / 2) - 1.96);
      if (n === 5) ctx.moveTo(toX(n), toY(power)); else ctx.lineTo(toX(n), toY(power));
      if (power >= 0.8 && nNeeded === null) nNeeded = n;
    }
    ctx.stroke();

    // 80% power line
    ctx.strokeStyle = MUTED(); ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(pad, toY(0.8)); ctx.lineTo(pad + pw, toY(0.8)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'right';
    ctx.fillText('80%', pad - 4, toY(0.8) + 4);

    if (nNeeded) {
      ctx.strokeStyle = GREEN; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(toX(nNeeded), toY(0.8)); ctx.lineTo(toX(nNeeded), 10 + ph); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = GREEN; ctx.textAlign = 'center';
      ctx.fillText(`n=${nNeeded}`, toX(nNeeded), 10 + ph + 14);
    }

    document.getElementById('powN').textContent = nNeeded ? nNeeded + '/group' : '>300';

    ctx.fillStyle = MUTED(); ctx.textAlign = 'center';
    ctx.fillText('Sample size per group', pad + pw / 2, h - 4);
  }

  dS.oninput = draw; alphaS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   27 — scikit-learn Evaluation Suite (workflow diagram)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['sklearn-eval'] = function() {
  const s = setupCanvas('skCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);

  const steps = ['Data', 'Pipeline', 'CV Score', 'Report', 'Inspect', 'Tune'];
  const icons = ['📊', '🔗', '✂️', '📋', '🔍', '⚙️'];
  const n = steps.length;
  const boxW = Math.min(90, (w - 40) / n - 10), boxH = 50;
  const startX = (w - n * (boxW + 10) + 10) / 2;

  steps.forEach((step, i) => {
    const x = startX + i * (boxW + 10), y = h / 2 - boxH / 2;
    ctx.fillStyle = `rgba(200,169,110,${0.1 + 0.1 * i})`; 
    ctx.fillRect(x, y, boxW, boxH);
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1;
    ctx.strokeRect(x, y, boxW, boxH);
    ctx.fillStyle = '#fff'; ctx.font = `18px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(icons[i], x + boxW / 2, y + 22);
    ctx.font = `10px ${MONO()}`; ctx.fillStyle = MUTED();
    ctx.fillText(step, x + boxW / 2, y + boxH + 14);
    // Arrow
    if (i < n - 1) {
      drawArrow(ctx, x + boxW + 2, h / 2, x + boxW + 8, h / 2, ACCENT(), 1.5);
    }
  });
};

/* ═══════════════════════════════════════════════════════════════
   28 — SHAP Library (explainer comparison)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['shap-library'] = function() {
  const s = setupCanvas('shapLibCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);

  const plots = ['waterfall', 'beeswarm', 'bar', 'scatter', 'force'];
  const n = plots.length;
  const boxW = Math.min(100, (w - 40) / n - 8), boxH = 60;
  const startX = (w - n * (boxW + 8) + 8) / 2;

  plots.forEach((name, i) => {
    const x = startX + i * (boxW + 8), y = h / 2 - boxH / 2;
    ctx.fillStyle = `rgba(79,195,247,${0.1 + 0.08 * i})`;
    ctx.fillRect(x, y, boxW, boxH);
    ctx.strokeStyle = BLUE; ctx.lineWidth = 1;
    ctx.strokeRect(x, y, boxW, boxH);

    // Mini graph icon
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1.5;
    const cx = x + boxW / 2, cy = y + boxH / 2 - 6;
    if (i === 0) { // waterfall bars
      for (let b = 0; b < 4; b++) { ctx.fillStyle = b % 2 === 0 ? RED : BLUE; ctx.fillRect(cx - 18 + b * 10, cy - b * 4, 8, 6 + b * 2); }
    } else if (i === 1) { // beeswarm dots
      for (let d = 0; d < 12; d++) { ctx.fillStyle = d < 6 ? BLUE : RED; ctx.beginPath(); ctx.arc(cx + (Math.random() - 0.5) * 30, cy + (Math.random() - 0.5) * 16, 2, 0, Math.PI * 2); ctx.fill(); }
    } else if (i === 2) { // bar chart
      for (let b = 0; b < 4; b++) { ctx.fillStyle = ACCENT(); ctx.globalAlpha = 0.4 + 0.15 * b; ctx.fillRect(cx - 18 + b * 10, cy + 8 - (3 - b) * 5, 8, (3 - b) * 5 + 4); }
      ctx.globalAlpha = 1;
    } else if (i === 3) { // scatter
      for (let d = 0; d < 10; d++) { ctx.fillStyle = GREEN; ctx.beginPath(); ctx.arc(cx - 15 + d * 3.5, cy + 4 - d * 1.5 + Math.random() * 6, 2, 0, Math.PI * 2); ctx.fill(); }
    } else { // force
      ctx.beginPath(); ctx.moveTo(cx - 20, cy); ctx.lineTo(cx + 20, cy); ctx.strokeStyle = ACCENT(); ctx.stroke();
      ctx.fillStyle = RED; ctx.fillRect(cx, cy - 5, 15, 4);
      ctx.fillStyle = BLUE; ctx.fillRect(cx - 15, cy + 1, 12, 4);
    }

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText(name, x + boxW / 2, y + boxH + 14);
  });
};

/* ═══════════════════════════════════════════════════════════════
   29 — Optuna (search space exploration)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['optuna'] = function() {
  const s = setupCanvas('optunaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const pad = 40, pw = w - pad * 2, ph = h - pad - 10;

  ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
  ctx.strokeRect(pad, 10, pw, ph);
  ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
  ctx.fillText('Trial #', pad + pw / 2, h - 2);
  ctx.save(); ctx.translate(12, 10 + ph / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('Objective', 0, 0); ctx.restore();

  // Simulate optimization history
  const nTrials = 50;
  let best = 0.5;
  const trials = [], bests = [];
  for (let t = 0; t < nTrials; t++) {
    const val = 0.5 + 0.4 * (1 - Math.exp(-t / 15)) + gauss() * 0.05;
    trials.push(val);
    best = Math.max(best, val);
    bests.push(best);
  }

  function toX(t) { return pad + (t / (nTrials - 1)) * pw; }
  function toY(v) { return 10 + ph - clamp((v - 0.3) / 0.7, 0, 1) * ph; }

  // Trial dots
  trials.forEach((v, i) => {
    ctx.fillStyle = BLUE; ctx.globalAlpha = 0.4;
    ctx.beginPath(); ctx.arc(toX(i), toY(v), 3, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Best line
  ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.beginPath();
  bests.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.stroke();

  ctx.fillStyle = ACCENT(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
  ctx.fillText(`Best: ${best.toFixed(3)}`, pad + 4, 24);
};

/* ═══════════════════════════════════════════════════════════════
   30 — pandas-ta & yfinance (price chart with indicators)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['pandas-ta'] = function() {
  const s = setupCanvas('ptaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);
  const pad = 40, pw = w - pad * 2, ph = h - pad - 10;

  // Simulate price data
  const nBars = 60;
  let price = 100;
  const prices = [];
  for (let i = 0; i < nBars; i++) {
    price *= 1 + gauss() * 0.02;
    prices.push(price);
  }

  // SMA 10
  const sma = [];
  for (let i = 0; i < nBars; i++) {
    if (i < 9) { sma.push(null); continue; }
    let sum = 0;
    for (let j = i - 9; j <= i; j++) sum += prices[j];
    sma.push(sum / 10);
  }

  // Bollinger bands
  const bbUp = [], bbLo = [];
  for (let i = 0; i < nBars; i++) {
    if (i < 19) { bbUp.push(null); bbLo.push(null); continue; }
    let sum = 0;
    for (let j = i - 19; j <= i; j++) sum += prices[j];
    const mean = sum / 20;
    let variance = 0;
    for (let j = i - 19; j <= i; j++) variance += (prices[j] - mean) ** 2;
    const std = Math.sqrt(variance / 20);
    bbUp.push(mean + 2 * std);
    bbLo.push(mean - 2 * std);
  }

  const allVals = [...prices, ...bbUp.filter(v => v !== null), ...bbLo.filter(v => v !== null)];
  const pMin = Math.min(...allVals) * 0.99, pMax = Math.max(...allVals) * 1.01;

  function toX(i) { return pad + (i / (nBars - 1)) * pw; }
  function toY(v) { return 10 + ph - (v - pMin) / (pMax - pMin) * ph; }

  ctx.strokeStyle = BORDER(); ctx.lineWidth = 0.5;
  ctx.strokeRect(pad, 10, pw, ph);

  // BB fill
  ctx.fillStyle = 'rgba(79,195,247,0.08)'; ctx.beginPath();
  let started = false;
  for (let i = 0; i < nBars; i++) {
    if (bbUp[i] === null) continue;
    if (!started) { ctx.moveTo(toX(i), toY(bbUp[i])); started = true; }
    else ctx.lineTo(toX(i), toY(bbUp[i]));
  }
  for (let i = nBars - 1; i >= 0; i--) {
    if (bbLo[i] === null) continue;
    ctx.lineTo(toX(i), toY(bbLo[i]));
  }
  ctx.fill();

  // Price
  ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.beginPath();
  prices.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.stroke();

  // SMA
  ctx.strokeStyle = GREEN; ctx.lineWidth = 1.5; ctx.beginPath();
  sma.forEach((v, i) => { if (v === null) return; if (i === 10) ctx.moveTo(toX(i), toY(v)); else ctx.lineTo(toX(i), toY(v)); });
  ctx.stroke();

  // Labels
  ctx.fillStyle = ACCENT(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
  ctx.fillText('Price', pad + 4, 22);
  ctx.fillStyle = GREEN; ctx.fillText('SMA(10)', pad + 50, 22);
  ctx.fillStyle = BLUE; ctx.fillText('BB(20,2)', pad + 110, 22);
};

/* ═══════════════════════════════════════════════════════════════
   31 — scipy.stats & statsmodels (tests overview)
   ═══════════════════════════════════════════════════════════════ */
DRAWS['scipy-statsmodels'] = function() {
  const s = setupCanvas('ssCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.clearRect(0, 0, w, h);

  const categories = [
    { name: 'scipy.stats', items: ['ttest_ind', 'shapiro', 'ks_2samp', 'spearmanr'], col: BLUE },
    { name: 'statsmodels', items: ['OLS', 'ARIMA', 'adfuller', 'acf'], col: GREEN },
  ];

  const colW = Math.min(200, w / 2 - 30);
  const startX = (w - 2 * colW - 20) / 2;

  categories.forEach((cat, ci) => {
    const x = startX + ci * (colW + 20);
    // Header
    ctx.fillStyle = cat.col; ctx.globalAlpha = 0.15;
    ctx.fillRect(x, 10, colW, 30);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = cat.col; ctx.lineWidth = 1;
    ctx.strokeRect(x, 10, colW, 30);
    ctx.fillStyle = cat.col; ctx.font = `bold 12px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillText(cat.name, x + colW / 2, 30);

    // Items
    cat.items.forEach((item, i) => {
      const y = 50 + i * 36;
      ctx.fillStyle = `rgba(${cat.col === BLUE ? '79,195,247' : '129,199,132'},0.08)`;
      ctx.fillRect(x + 10, y, colW - 20, 28);
      ctx.strokeStyle = cat.col; ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 10, y, colW - 20, 28);
      ctx.fillStyle = MUTED(); ctx.font = `11px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(item, x + colW / 2, y + 14);
    });
  });
};

/* ── Learning Curve Playground ── */
window.updateLCPlayground = function() {
  const complexity = parseInt(document.getElementById('lcComplexity')?.value || 5);
  const size = parseInt(document.getElementById('lcSize')?.value || 200);
  const noise = parseInt(document.getElementById('lcNoise')?.value || 3);
  const cv = document.getElementById('lcComplexV'); if (cv) cv.textContent = complexity;
  const sv = document.getElementById('lcSizeV'); if (sv) sv.textContent = size;
  const nv = document.getElementById('lcNoiseV'); if (nv) nv.textContent = noise;
  const el = document.getElementById('lcDiagnosis'); if (!el) return;

  const trainScore = Math.min(0.99, 0.5 + complexity * 0.05 + size * 0.0002 - noise * 0.01);
  const valScore = Math.min(trainScore, 0.4 + size * 0.0004 - complexity * 0.03 + (10 - noise) * 0.02);
  const gap = trainScore - valScore;

  let diagnosis = '';
  if (gap > 0.2 && valScore < 0.6) {
    diagnosis = '⚠️ <strong>Overfitting</strong> — large train/val gap. Try: reduce complexity, add regularization, or get more data.';
  } else if (trainScore < 0.65 && valScore < 0.6) {
    diagnosis = '⚠️ <strong>Underfitting</strong> — both scores low. Try: increase complexity, add features, or reduce noise.';
  } else if (gap < 0.1 && valScore > 0.7) {
    diagnosis = '✅ <strong>Good fit</strong> — small gap, high scores. Model is generalizing well.';
  } else if (gap > 0.15) {
    diagnosis = '⚡ <strong>Mild overfitting</strong> — some gap. More data or slight regularization would help.';
  } else {
    diagnosis = '→ Moderate setup. Train: ' + trainScore.toFixed(2) + ', Val: ' + valScore.toFixed(2) + ', Gap: ' + gap.toFixed(2);
  }
  el.innerHTML = diagnosis + '<br><span style="color:var(--muted);font-size:11px">Train score: ' + trainScore.toFixed(3) + ' | Val score: ' + valScore.toFixed(3) + ' | Gap: ' + gap.toFixed(3) + '</span>';
};

// ── Learning Curves Playground ──
window.updateLCPlayground = function() {
  const complexity = +document.getElementById('lcComplexity').value;
  const size = +document.getElementById('lcSize').value;
  const noise = +document.getElementById('lcNoise').value;
  document.getElementById('lcComplexV').textContent = complexity;
  document.getElementById('lcSizeV').textContent = size;
  document.getElementById('lcNoiseV').textContent = noise;

  // Simulate train/val scores
  const trainScore = Math.min(0.99, 0.5 + complexity * 0.06 - noise * 0.015 + size * 0.0001);
  const valScore = Math.min(trainScore, 0.5 + size * 0.0003 - complexity * 0.03 - noise * 0.025 + 0.1);
  const gap = trainScore - valScore;

  let diagnosis = '';
  if (gap > 0.25) {
    diagnosis = '🔴 <strong>Overfitting</strong> — large train/val gap (' + gap.toFixed(2) + '). Reduce complexity, add regularization, or get more data.';
  } else if (valScore < 0.55) {
    diagnosis = '🟡 <strong>Underfitting</strong> — both scores low. Increase complexity or reduce noise.';
  } else if (gap < 0.08 && valScore > 0.7) {
    diagnosis = '🟢 <strong>Good fit</strong> — small gap (' + gap.toFixed(2) + '), high validation score (' + valScore.toFixed(2) + '). Model is well-calibrated.';
  } else {
    diagnosis = '🟠 <strong>Moderate gap</strong> (' + gap.toFixed(2) + ') — val score ' + valScore.toFixed(2) + '. More data or light regularization may help.';
  }
  document.getElementById('lcDiagnosis').innerHTML = '→ Train: ' + trainScore.toFixed(2) + ' | Val: ' + valScore.toFixed(2) + '<br>' + diagnosis;
};

/* ═══════════════════════════════════════════════════════════════
   27 — Hypothesis Testing & p-values
   ═══════════════════════════════════════════════════════════════ */
DRAWS['hypothesis-testing'] = function() {
  const s = setupCanvas('hypCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const zS = document.getElementById('hypZ'), aS = document.getElementById('hypAlpha');
  if (!zS || !aS) return;

  // Standard normal CDF via erf approximation
  function phi(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  }
  function zCrit(alpha) { // two-tailed critical value via bisection
    let lo = 0, hi = 6;
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2;
      if (2 * (1 - phi(mid)) > alpha) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }

  function draw() {
    const z = +zS.value / 100;
    const alpha = +aS.value / 100;
    document.getElementById('hypZV').textContent = z.toFixed(2);
    document.getElementById('hypAlphaV').textContent = alpha.toFixed(2);
    const p = 2 * (1 - phi(Math.abs(z)));
    const reject = p < alpha;
    document.getElementById('hypP').textContent = p < 0.0001 ? '<0.0001' : p.toFixed(4);
    const dec = document.getElementById('hypDecision');
    dec.textContent = reject ? 'Reject H₀' : 'Fail to reject';
    dec.style.color = reject ? RED : GREEN;

    ctx.clearRect(0, 0, w, h);
    const px = 30, pw = w - 60, py = 20, ph = h - 60;
    const xToPx = x => px + (x + 4) / 8 * pw;
    const zc = zCrit(alpha);
    const peak = gaussPdf(0, 0, 1);

    // Rejection regions (shaded tails)
    ctx.fillStyle = 'rgba(229,115,115,0.18)';
    [[-4, -zc], [zc, 4]].forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(xToPx(a), py + ph);
      for (let x = a; x <= b + 0.001; x += 0.02) ctx.lineTo(xToPx(x), py + ph - gaussPdf(x, 0, 1) / peak * ph);
      ctx.lineTo(xToPx(b), py + ph);
      ctx.closePath(); ctx.fill();
    });

    // Null distribution curve
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -4; x <= 4; x += 0.02) {
      const cx = xToPx(x), cy = py + ph - gaussPdf(x, 0, 1) / peak * ph;
      x === -4 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Axis
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px, py + ph); ctx.lineTo(px + pw, py + ph); ctx.stroke();
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    [-3, -2, -1, 0, 1, 2, 3].forEach(t => ctx.fillText(t, xToPx(t), py + ph + 14));

    // Critical value markers
    ctx.fillStyle = RED; ctx.font = `10px ${MONO()}`;
    ctx.fillText('−z₍crit₎ ' + (-zc).toFixed(2), xToPx(-zc), py + 10);
    ctx.fillText('+z₍crit₎ ' + zc.toFixed(2), xToPx(zc), py + 10);

    // Observed statistic
    const ox = xToPx(clamp(z, -4, 4));
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(ox, py); ctx.lineTo(ox, py + ph); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ACCENT(); ctx.textAlign = 'center';
    ctx.fillText('observed z', ox, py + ph + 28);

    ctx.fillStyle = MUTED(); ctx.textAlign = 'left';
    ctx.fillText('H₀ distribution — red tails = rejection region (α)', px + 4, h - 6);
  }
  zS.oninput = draw; aS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   28 — Choosing the Right Statistical Test
   ═══════════════════════════════════════════════════════════════ */
DRAWS['stat-tests'] = function() {
  const s = setupCanvas('testCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const gS = document.getElementById('testGroups'), pS = document.getElementById('testPaired'), nS = document.getElementById('testNormal');
  if (!gS || !pS || !nS) return;

  function draw() {
    const groups = +gS.value, paired = +pS.value === 1, normal = +nS.value === 1;
    document.getElementById('testGroupsV').textContent = groups === 2 ? '2' : '3+';
    document.getElementById('testPairedV').textContent = paired ? 'Yes' : 'No';
    document.getElementById('testNormalV').textContent = normal ? 'Yes' : 'No';

    let rec;
    if (groups >= 3) rec = normal ? 'One-way ANOVA' : 'Kruskal-Wallis';
    else if (paired) rec = normal ? 'Paired t-test' : 'Wilcoxon signed-rank';
    else rec = normal ? 'Welch t-test' : 'Mann-Whitney U';
    document.getElementById('testRec').textContent = rec;

    ctx.clearRect(0, 0, w, h);
    const cells = [
      { name: 'Welch t-test',        sub: '2 groups · independent · normal' },
      { name: 'Mann-Whitney U',      sub: '2 groups · independent · any shape' },
      { name: 'Paired t-test',       sub: '2 groups · paired · normal' },
      { name: 'Wilcoxon signed-rank',sub: '2 groups · paired · any shape' },
      { name: 'One-way ANOVA',       sub: '3+ groups · normal' },
      { name: 'Kruskal-Wallis',      sub: '3+ groups · any shape' },
    ];
    const cols = 2, rows = 3;
    const gx = 20, gy = 34, gw = w - 40, gh = h - 54;
    const cw = gw / cols, chh = gh / rows;

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('// decision map — your situation highlights the test to reach for', gx, 18);

    cells.forEach((cell, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      const x = gx + c * cw + 4, y = gy + r * chh + 4, bw = cw - 8, bh = chh - 8;
      const hot = cell.name === rec;
      ctx.fillStyle = hot ? 'rgba(200,169,110,0.16)' : 'rgba(128,128,128,0.05)';
      ctx.fillRect(x, y, bw, bh);
      ctx.strokeStyle = hot ? ACCENT() : BORDER(); ctx.lineWidth = hot ? 2 : 1;
      ctx.strokeRect(x, y, bw, bh);
      ctx.fillStyle = hot ? ACCENT() : MUTED();
      ctx.font = `${hot ? 'bold ' : ''}12px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(cell.name, x + bw / 2, y + bh / 2 - 8);
      ctx.font = `9px ${MONO()}`; ctx.fillStyle = MUTED();
      ctx.fillText(cell.sub, x + bw / 2, y + bh / 2 + 10);
      ctx.textBaseline = 'alphabetic';
    });
  }
  gS.oninput = draw; pS.oninput = draw; nS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   29 — Central Limit Theorem & Sampling
   ═══════════════════════════════════════════════════════════════ */
DRAWS['clt-sampling'] = function() {
  const s = setupCanvas('cltCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const skS = document.getElementById('cltSkew'), nS = document.getElementById('cltN');
  if (!skS || !nS) return;

  function popSample(skew) {
    // Mix of normal and exponential controlled by skew ∈ [0,1]
    const g = 0.5 + gauss() * 0.12;
    const e = -Math.log(1 - Math.random()) * 0.22;
    return clamp((1 - skew) * g + skew * e, 0, 1);
  }

  function draw() {
    const skew = +skS.value / 100, n = +nS.value;
    document.getElementById('cltSkewV').textContent = skew.toFixed(2);
    document.getElementById('cltNV').textContent = n;

    // Simulate
    const POP = 4000, TRIALS = 3000;
    const popBins = new Array(40).fill(0);
    for (let i = 0; i < POP; i++) popBins[clamp(Math.floor(popSample(skew) * 40), 0, 39)]++;
    const meanBins = new Array(40).fill(0);
    const means = [];
    for (let t = 0; t < TRIALS; t++) {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += popSample(skew);
      const m = sum / n;
      means.push(m);
      meanBins[clamp(Math.floor(m * 40), 0, 39)]++;
    }
    const mMean = means.reduce((a, b) => a + b, 0) / means.length;
    const mSd = Math.sqrt(means.reduce((a, b) => a + (b - mMean) ** 2, 0) / means.length);
    document.getElementById('cltSE').textContent = mSd.toFixed(3);

    ctx.clearRect(0, 0, w, h);
    const px = 30, pw = w - 60;
    const panel = (bins, py, ph, color, label) => {
      const maxB = Math.max(...bins, 1);
      const bw = pw / bins.length;
      ctx.fillStyle = color;
      bins.forEach((b, i) => {
        const bh = b / maxB * (ph - 16);
        ctx.globalAlpha = 0.75;
        ctx.fillRect(px + i * bw, py + ph - bh, bw - 1, bh);
        ctx.globalAlpha = 1;
      });
      ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, py + ph); ctx.lineTo(px + pw, py + ph); ctx.stroke();
      ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
      ctx.fillText(label, px, py + 10);
    };
    const half = (h - 30) / 2;
    panel(popBins, 8, half, BLUE, '// population (one draw at a time)');
    panel(meanBins, half + 22, half, ACCENT(), '// distribution of sample means (n=' + n + ')');

    // Normal overlay on bottom panel
    const maxB = Math.max(...meanBins, 1);
    const py2 = half + 22, ph2 = half;
    ctx.strokeStyle = GREEN; ctx.lineWidth = 1.6;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < 200; i++) {
      const x = i / 199;
      const pdf = gaussPdf(x, mMean, Math.max(mSd, 0.004));
      const binApprox = pdf / 40 * TRIALS; // expected count per bin width
      const yy = py2 + ph2 - clamp(binApprox / maxB, 0, 1) * (ph2 - 16);
      const cx = px + x * pw;
      started ? ctx.lineTo(cx, yy) : ctx.moveTo(cx, yy); started = true;
    }
    ctx.stroke();
    ctx.fillStyle = GREEN; ctx.font = `10px ${MONO()}`; ctx.textAlign = 'right';
    ctx.fillText('normal fit', px + pw, py2 + 10);
  }
  skS.oninput = draw; nS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   30 — Correlation, Causation & Simpson's Paradox
   ═══════════════════════════════════════════════════════════════ */
let causBase;
DRAWS['correlation-causation'] = function() {
  const s = setupCanvas('causCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const cS = document.getElementById('causConf');
  if (!cS) return;

  if (!causBase) {
    causBase = [];
    for (let g = 0; g < 3; g++)
      for (let i = 0; i < 26; i++)
        causBase.push({ g, u: Math.random(), e: gauss() * 0.05 });
  }

  function pearson(pts) {
    const n = pts.length;
    const mx = pts.reduce((a, p) => a + p.x, 0) / n, my = pts.reduce((a, p) => a + p.y, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    pts.forEach(p => { sxy += (p.x - mx) * (p.y - my); sxx += (p.x - mx) ** 2; syy += (p.y - my) ** 2; });
    return sxy / Math.sqrt(sxx * syy || 1);
  }
  function fitLine(pts) {
    const n = pts.length;
    const mx = pts.reduce((a, p) => a + p.x, 0) / n, my = pts.reduce((a, p) => a + p.y, 0) / n;
    let sxy = 0, sxx = 0;
    pts.forEach(p => { sxy += (p.x - mx) * (p.y - my); sxx += (p.x - mx) ** 2; });
    const b = sxy / (sxx || 1);
    return { b, a: my - b * mx };
  }

  function draw() {
    const conf = +cS.value / 100;
    document.getElementById('causConfV').textContent = conf.toFixed(2);

    // Within each group, x-y slope is positive; confounder shifts groups so pooled slope turns negative
    const pts = causBase.map(p => {
      const gx = p.g * 0.30 * conf;            // group offset on x
      const gy = -p.g * 0.34 * conf;           // opposite offset on y
      const x = 0.08 + gx + p.u * 0.32;
      const y = 0.22 + gy + p.u * 0.28 + p.e + conf * 0.34;
      return { x: clamp(x, 0, 1), y: clamp(y, 0.02, 0.98), g: p.g };
    });

    const rPooled = pearson(pts);
    const rWithin = [0, 1, 2].map(g => pearson(pts.filter(p => p.g === g)));
    const rW = rWithin.reduce((a, b) => a + b, 0) / 3;
    const pool = document.getElementById('causPooled');
    pool.textContent = rPooled.toFixed(2);
    pool.style.color = rPooled < 0 ? RED : GREEN;
    document.getElementById('causWithin').textContent = rW.toFixed(2);

    ctx.clearRect(0, 0, w, h);
    const px = 34, pw = w - 60, py = 16, ph = h - 50;
    const X = v => px + v * pw, Y = v => py + (1 - v) * ph;
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.strokeRect(px, py, pw, ph);

    const gcols = [BLUE, GREEN, '#f0a050'];
    // Group points + group fit lines
    [0, 1, 2].forEach(g => {
      const gp = pts.filter(p => p.g === g);
      ctx.fillStyle = gcols[g];
      gp.forEach(p => { ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 3, 0, Math.PI * 2); ctx.fill(); });
      const f = fitLine(gp);
      const x0 = Math.min(...gp.map(p => p.x)), x1 = Math.max(...gp.map(p => p.x));
      ctx.strokeStyle = gcols[g]; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(X(x0), Y(clamp(f.a + f.b * x0, 0, 1))); ctx.lineTo(X(x1), Y(clamp(f.a + f.b * x1, 0, 1))); ctx.stroke();
    });

    // Pooled fit line (dashed red)
    const f = fitLine(pts);
    ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(X(0.02), Y(clamp(f.a + f.b * 0.02, 0, 1))); ctx.lineTo(X(0.98), Y(clamp(f.a + f.b * 0.98, 0, 1))); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('colored = subgroups (each trends up) · dashed = pooled trend', px, h - 8);
  }
  cS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   31 — Exploratory Data Analysis (EDA)
   ═══════════════════════════════════════════════════════════════ */
let edaBase;
DRAWS['eda-workflow'] = function() {
  const s = setupCanvas('edaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const skS = document.getElementById('edaSkew'), oS = document.getElementById('edaOut');
  if (!skS || !oS) return;

  if (!edaBase) edaBase = Array.from({ length: 600 }, () => ({ g: gauss(), e: -Math.log(1 - Math.random()), u: Math.random() }));

  function draw() {
    const skew = +skS.value / 100, outPct = +oS.value;
    document.getElementById('edaSkewV').textContent = skew.toFixed(2);
    document.getElementById('edaOutV').textContent = outPct + '%';

    const data = edaBase.map((p, i) => {
      let v = (1 - skew) * (0.45 + p.g * 0.1) + skew * (0.15 + p.e * 0.14);
      if (p.u < outPct / 100) v = 0.85 + (p.g * 0.05 + 0.08); // injected outliers
      return clamp(v, 0, 1);
    });
    const sorted = [...data].sort((a, b) => a - b);
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const q1 = sorted[Math.floor(sorted.length * 0.25)], q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    document.getElementById('edaMean').textContent = mean.toFixed(3);
    document.getElementById('edaMedian').textContent = median.toFixed(3);

    ctx.clearRect(0, 0, w, h);
    const px = 30, pw = w - 60;

    // Histogram (top)
    const hy = 14, hh = h - 110;
    const bins = new Array(44).fill(0);
    data.forEach(v => bins[clamp(Math.floor(v * 44), 0, 43)]++);
    const maxB = Math.max(...bins, 1), bw = pw / bins.length;
    ctx.fillStyle = BLUE;
    bins.forEach((b, i) => {
      const bh = b / maxB * (hh - 10);
      ctx.globalAlpha = 0.7; ctx.fillRect(px + i * bw, hy + hh - bh, bw - 1, bh); ctx.globalAlpha = 1;
    });
    ctx.strokeStyle = BORDER(); ctx.beginPath(); ctx.moveTo(px, hy + hh); ctx.lineTo(px + pw, hy + hh); ctx.stroke();

    // Mean / median markers
    const mx = px + mean * pw, mdx = px + median * pw;
    ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(mx, hy); ctx.lineTo(mx, hy + hh); ctx.stroke();
    ctx.strokeStyle = GREEN;
    ctx.beginPath(); ctx.moveTo(mdx, hy); ctx.lineTo(mdx, hy + hh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    ctx.fillStyle = RED; ctx.fillText('mean', mx, hy + 10);
    ctx.fillStyle = GREEN; ctx.fillText('median', mdx, hy + hh - 4);

    // Box plot (bottom)
    const by = hy + hh + 26, bh2 = 34;
    const lo = Math.max(sorted[0], q1 - 1.5 * iqr), hi = Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr);
    ctx.strokeStyle = ACCENT(); ctx.lineWidth = 1.5;
    // whiskers
    ctx.beginPath();
    ctx.moveTo(px + lo * pw, by + bh2 / 2); ctx.lineTo(px + q1 * pw, by + bh2 / 2);
    ctx.moveTo(px + q3 * pw, by + bh2 / 2); ctx.lineTo(px + hi * pw, by + bh2 / 2);
    ctx.stroke();
    // box
    ctx.fillStyle = 'rgba(200,169,110,0.15)';
    ctx.fillRect(px + q1 * pw, by, (q3 - q1) * pw, bh2);
    ctx.strokeRect(px + q1 * pw, by, (q3 - q1) * pw, bh2);
    // median line
    ctx.strokeStyle = GREEN; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px + median * pw, by); ctx.lineTo(px + median * pw, by + bh2); ctx.stroke();
    // outlier dots
    ctx.fillStyle = RED;
    sorted.filter(v => v < lo || v > hi).forEach(v => {
      ctx.beginPath(); ctx.arc(px + v * pw, by + bh2 / 2, 2.5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('// box plot — IQR box, whiskers, outliers beyond 1.5×IQR in red', px, by + bh2 + 14);
  }
  skS.oninput = draw; oS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   32 — GroupBy, Pivot & Aggregation
   ═══════════════════════════════════════════════════════════════ */
let gbData;
DRAWS['groupby-aggregation'] = function() {
  const s = setupCanvas('gbCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const aS = document.getElementById('gbAgg');
  if (!aS) return;

  if (!gbData) {
    gbData = [];
    const sizes = [7, 5, 9];
    sizes.forEach((n, g) => { for (let i = 0; i < n; i++) gbData.push({ g, v: 0.25 + Math.random() * 0.65 + g * 0.05 }); });
  }
  const AGGS = ['count', 'sum', 'mean', 'max'];

  function draw() {
    const aggIdx = +aS.value;
    const aggName = AGGS[aggIdx];
    document.getElementById('gbAggV').textContent = aggName;

    ctx.clearRect(0, 0, w, h);
    const gcols = [BLUE, GREEN, '#f0a050'];
    const midX = w * 0.52;
    const py = 30, ph = h - 60;

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('// raw rows (grouped by color)', 20, 18);
    ctx.fillText('// one bar per group — ' + aggName, midX + 30, 18);

    // Raw rows as small bars, left panel
    const rows = gbData.length;
    const rowH = Math.min(10, ph / rows - 2);
    let yy = py;
    gbData.forEach(p => {
      ctx.fillStyle = gcols[p.g]; ctx.globalAlpha = 0.8;
      ctx.fillRect(30, yy, p.v * (midX - 80), rowH);
      ctx.globalAlpha = 1;
      yy += rowH + 2;
    });

    // Arrow
    drawArrow(ctx, midX - 24, h / 2, midX + 16, h / 2, MUTED(), 1.5);

    // Aggregated values
    const groups = [0, 1, 2].map(g => {
      const vals = gbData.filter(p => p.g === g).map(p => p.v);
      let out;
      if (aggName === 'count') out = vals.length;
      else if (aggName === 'sum') out = vals.reduce((a, b) => a + b, 0);
      else if (aggName === 'mean') out = vals.reduce((a, b) => a + b, 0) / vals.length;
      else out = Math.max(...vals);
      return out;
    });
    const maxOut = Math.max(...groups, 0.001);
    const barW = (w - midX - 80) / 3;
    groups.forEach((v, g) => {
      const bh = v / maxOut * (ph - 20);
      const x = midX + 40 + g * (barW + 12);
      ctx.fillStyle = gcols[g]; ctx.globalAlpha = 0.85;
      ctx.fillRect(x, py + ph - bh, barW, bh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = gcols[g]; ctx.font = `bold 11px ${MONO()}`; ctx.textAlign = 'center';
      ctx.fillText(aggName === 'count' ? v : v.toFixed(2), x + barW / 2, py + ph - bh - 6);
      ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`;
      ctx.fillText('G' + (g + 1), x + barW / 2, py + ph + 14);
    });
    ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(midX + 30, py + ph); ctx.lineTo(w - 20, py + ph); ctx.stroke();
  }
  aS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   33 — Cohort & Retention Analysis
   ═══════════════════════════════════════════════════════════════ */
DRAWS['cohort-retention'] = function() {
  const s = setupCanvas('cohortCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const cS = document.getElementById('cohChurn'), iS = document.getElementById('cohImprove');
  if (!cS || !iS) return;

  function draw() {
    const churn = +cS.value / 100, improve = +iS.value / 100;
    document.getElementById('cohChurnV').textContent = Math.round(churn * 100) + '%';
    document.getElementById('cohImproveV').textContent = Math.round(improve * 100) + '%';

    const COHORTS = 6, MONTHS = 8;
    // Older cohorts have higher churn; newest is (1 - improve*...) better
    const grid = [];
    for (let c = 0; c < COHORTS; c++) {
      const cohChurnRate = churn * (1 - improve * c / (COHORTS - 1));
      const row = [];
      const visible = MONTHS - c; // triangle: newer cohorts observed fewer months
      for (let m = 0; m < visible; m++) row.push(Math.pow(1 - cohChurnRate, m));
      grid.push(row);
    }
    const latest = grid[COHORTS - 1];
    const m3 = Math.pow(1 - churn * (1 - improve), 3);
    document.getElementById('cohM3').textContent = Math.round(m3 * 100) + '%';

    ctx.clearRect(0, 0, w, h);
    const lx = 86, ty = 34;
    const cw = Math.min(62, (w - lx - 20) / MONTHS), chh = (h - ty - 16) / COHORTS;

    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center';
    for (let m = 0; m < MONTHS; m++) ctx.fillText('M' + m, lx + m * cw + cw / 2, ty - 8);
    ctx.textAlign = 'right';
    for (let c = 0; c < COHORTS; c++) ctx.fillText('Cohort ' + (c + 1), lx - 8, ty + c * chh + chh / 2 + 3);

    grid.forEach((row, c) => {
      row.forEach((v, m) => {
        const x = lx + m * cw, y = ty + c * chh;
        // gold → dark gradient by retention
        ctx.fillStyle = ACCENT();
        ctx.globalAlpha = 0.08 + v * 0.8;
        ctx.fillRect(x, y, cw - 2, chh - 2);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = BORDER(); ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cw - 2, chh - 2);
        ctx.fillStyle = v > 0.45 ? '#1a150e' : MUTED();
        ctx.font = `10px ${MONO()}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(v * 100) + '%', x + cw / 2 - 1, y + chh / 2);
        ctx.textBaseline = 'alphabetic';
      });
    });
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('// rows = signup cohorts · columns = months since signup', lx, h - 4);
  }
  cS.oninput = draw; iS.oninput = draw;
  draw();
};

/* ═══════════════════════════════════════════════════════════════
   34 — Funnel & Conversion Analysis
   ═══════════════════════════════════════════════════════════════ */
DRAWS['funnel-analysis'] = function() {
  const s = setupCanvas('funnelCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const mS = document.getElementById('funMid'), cS = document.getElementById('funCheckout');
  if (!mS || !cS) return;

  function draw() {
    const midRate = +mS.value / 100, coRate = +cS.value / 100;
    document.getElementById('funMidV').textContent = Math.round(midRate * 100) + '%';
    document.getElementById('funCheckoutV').textContent = Math.round(coRate * 100) + '%';

    const stages = [
      { name: 'Visit',        rate: 1 },
      { name: 'View product', rate: 0.55 },
      { name: 'Add to cart',  rate: midRate },
      { name: 'Checkout',     rate: 0.70 },
      { name: 'Purchase',     rate: coRate },
    ];
    let users = 10000;
    const counts = stages.map((st, i) => { users = i === 0 ? users : users * st.rate; return Math.round(users); });
    const overall = counts[counts.length - 1] / counts[0];
    document.getElementById('funOverall').textContent = (overall * 100).toFixed(2) + '%';

    // Biggest leak (lowest stage conversion, ignoring stage 0)
    let worst = 1, worstIdx = 1;
    stages.forEach((st, i) => { if (i > 0 && st.rate < worst) { worst = st.rate; worstIdx = i; } });

    ctx.clearRect(0, 0, w, h);
    const ty = 20, bh = h - 50, n = stages.length;
    const rowH = bh / n;
    const maxW = w - 220;

    counts.forEach((cnt, i) => {
      const frac = cnt / counts[0];
      const bw = Math.max(frac * maxW, 4);
      const x = (w - 160 - bw) / 2 + 30, y = ty + i * rowH;
      const hot = i === worstIdx;
      ctx.fillStyle = hot ? RED : ACCENT();
      ctx.globalAlpha = hot ? 0.75 : 0.55 + 0.35 * frac;
      ctx.fillRect(x, y + 4, bw, rowH - 14);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = hot ? RED : BORDER(); ctx.lineWidth = 1;
      ctx.strokeRect(x, y + 4, bw, rowH - 14);

      ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'right';
      ctx.fillText(stages[i].name, x - 8, y + rowH / 2 + 1);
      ctx.textAlign = 'left';
      ctx.fillStyle = hot ? RED : MUTED();
      const pct = i === 0 ? '100%' : Math.round(stages[i].rate * 100) + '%';
      ctx.fillText(cnt.toLocaleString() + '  (' + pct + (hot ? ' ← biggest leak' : '') + ')', x + bw + 8, y + rowH / 2 + 1);
    });
    ctx.fillStyle = MUTED(); ctx.font = `10px ${MONO()}`; ctx.textAlign = 'left';
    ctx.fillText('// bar width = share of initial visitors still in the funnel', 30, h - 8);
  }
  mS.oninput = draw; cS.oninput = draw;
  draw();
};
