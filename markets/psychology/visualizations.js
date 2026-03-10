/* ═══════════════════════════════════════════════════════════════
   Market Psychology — Canvas Visualizations
   25 DRAWS — behavioral finance & trading psychology diagrams
   ═══════════════════════════════════════════════════════════════ */

function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, w: rect.width, h: rect.height };
}

function getColor(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}

const DRAWS = {};

/* 01 — Confirmation Bias: funnel filter diagram */
DRAWS['confirmationBiasCanvas'] = () => {
  const r = setupCanvas('confirmationBiasCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const accent2 = getColor('--accent2');

  // Funnel shape
  ctx.beginPath();
  ctx.moveTo(w * 0.15, h * 0.15);
  ctx.lineTo(w * 0.85, h * 0.15);
  ctx.lineTo(w * 0.6, h * 0.85);
  ctx.lineTo(w * 0.4, h * 0.85);
  ctx.closePath();
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Incoming arrows (all info)
  const arrows = [0.2, 0.35, 0.5, 0.65, 0.8];
  arrows.forEach((x, i) => {
    const confirming = i === 1 || i === 2 || i === 4;
    ctx.strokeStyle = confirming ? accent2 : muted;
    ctx.lineWidth = confirming ? 2.5 : 1.5;
    ctx.setLineDash(confirming ? [] : [4, 4]);
    ctx.beginPath();
    ctx.moveTo(w * x, h * 0.02);
    ctx.lineTo(w * x, h * 0.14);
    ctx.stroke();
    // arrow head
    ctx.beginPath();
    ctx.moveTo(w * x - 4, h * 0.1);
    ctx.lineTo(w * x, h * 0.14);
    ctx.lineTo(w * x + 4, h * 0.1);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Filter line in funnel
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  const fy = h * 0.45;
  ctx.beginPath();
  ctx.moveTo(w * 0.27, fy);
  ctx.lineTo(w * 0.73, fy);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.font = `bold 11px ${getColor('--mono') || 'monospace'}`;
  ctx.textAlign = 'center';
  ctx.fillStyle = muted;
  ctx.fillText('All Information', w * 0.5, h * 0.11);
  ctx.fillStyle = accent;
  ctx.fillText('BELIEF FILTER', w * 0.5, fy - 6);
  ctx.fillStyle = accent2;
  ctx.fillText('Confirming Only', w * 0.5, h * 0.95);
};

/* 02 — Anchoring: anchor weight pulling price */
DRAWS['anchoringCanvas'] = () => {
  const r = setupCanvas('anchoringCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Anchor shape at bottom
  const ax = w * 0.3, ay = h * 0.7;
  ctx.strokeStyle = fg;
  ctx.lineWidth = 3;
  // anchor ring
  ctx.beginPath();
  ctx.arc(ax, ay - 20, 8, 0, Math.PI * 2);
  ctx.stroke();
  // anchor shaft
  ctx.beginPath();
  ctx.moveTo(ax, ay - 12);
  ctx.lineTo(ax, ay + 15);
  ctx.stroke();
  // anchor arms
  ctx.beginPath();
  ctx.moveTo(ax - 15, ay + 5);
  ctx.quadraticCurveTo(ax - 15, ay + 18, ax, ay + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ax + 15, ay + 5);
  ctx.quadraticCurveTo(ax + 15, ay + 18, ax, ay + 15);
  ctx.stroke();

  // Chain from anchor to price
  const px = w * 0.65, py = h * 0.25;
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.moveTo(ax, ay - 20);
  ctx.lineTo(px, py);
  ctx.stroke();
  ctx.setLineDash([]);

  // Current price dot
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(px, py, 8, 0, Math.PI * 2);
  ctx.fill();

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = fg;
  ctx.fillText('$50 Buy Price', ax, ay + 35);
  ctx.fillStyle = accent;
  ctx.fillText('$30 Current', px, py - 15);

  // "Cheap?" perception
  ctx.fillStyle = muted;
  ctx.font = 'italic 10px sans-serif';
  ctx.fillText('"Still cheap vs my anchor"', w * 0.5, h * 0.5);
};

/* 03 — Recency Bias: timeline with magnified recent section */
DRAWS['recencyBiasCanvas'] = () => {
  const r = setupCanvas('recencyBiasCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Timeline
  const y = h * 0.5;
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.05, y);
  ctx.lineTo(w * 0.95, y);
  ctx.stroke();

  // Old events — small dots
  for (let i = 0; i < 6; i++) {
    const x = w * (0.1 + i * 0.08);
    ctx.fillStyle = muted;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Recent events — large dots
  for (let i = 0; i < 3; i++) {
    const x = w * (0.7 + i * 0.08);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x, y, 6 + i * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Magnifying glass over recent
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w * 0.78, y - 25, 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.78 + 20, y - 5);
  ctx.lineTo(w * 0.78 + 32, y + 10);
  ctx.lineWidth = 3;
  ctx.stroke();

  // Labels
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = muted;
  ctx.textAlign = 'center';
  ctx.fillText('Past (forgotten)', w * 0.3, y + 25);
  ctx.fillStyle = accent;
  ctx.fillText('Recent (overweighted)', w * 0.78, y + 30);
};

/* 04 — Availability Heuristic: vivid vs. quiet comparison */
DRAWS['availabilityHeuristicCanvas'] = () => {
  const r = setupCanvas('availabilityHeuristicCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');

  // Two columns
  const lx = w * 0.25, rx = w * 0.75;

  // Left: vivid crash (big, red)
  ctx.fillStyle = accent;
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CRASH', lx, h * 0.4);
  ctx.font = '10px sans-serif';
  ctx.fillText('2% of days', lx, h * 0.5);

  // Right: quiet gains (small, green)
  ctx.fillStyle = accent2;
  ctx.font = '14px sans-serif';
  ctx.fillText('+0.03%', rx, h * 0.35);
  ctx.fillText('+0.05%', rx, h * 0.42);
  ctx.fillText('+0.02%', rx, h * 0.49);
  ctx.font = '10px sans-serif';
  ctx.fillText('98% of days', rx, h * 0.6);

  // Probability arrows
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = accent;
  ctx.fillText('↑ Perceived Risk', lx, h * 0.7);
  ctx.fillStyle = accent2;
  ctx.fillText('↓ Perceived Value', rx, h * 0.7);

  ctx.fillStyle = fg;
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('VIVID', lx, h * 0.15);
  ctx.fillText('QUIET', rx, h * 0.15);
};

/* 05 — Hindsight Bias: timeline with "obvious" arrows */
DRAWS['hindsightBiasCanvas'] = () => {
  const r = setupCanvas('hindsightBiasCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Price line with crash
  const pts = [
    [0.05,0.5],[0.15,0.45],[0.25,0.35],[0.35,0.3],[0.45,0.25],[0.55,0.2],
    [0.6,0.25],[0.65,0.5],[0.7,0.7],[0.75,0.75],[0.85,0.7],[0.95,0.65]
  ];
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    i === 0 ? ctx.moveTo(w * x, h * y) : ctx.lineTo(w * x, h * y);
  });
  ctx.stroke();

  // "Obvious" arrows pointing at peak
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  const peak = { x: w * 0.55, y: h * 0.2 };
  for (let i = 0; i < 3; i++) {
    const sx = peak.x + 20 + i * 15;
    const sy = peak.y - 20 - i * 8;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(peak.x + 5, peak.y - 5);
    ctx.stroke();
  }

  ctx.fillStyle = accent;
  ctx.font = 'italic bold 11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('"Obviously the top"', peak.x + 15, peak.y - 35);

  ctx.fillStyle = muted;
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('(only obvious in hindsight)', w * 0.5, h * 0.95);
};

/* 06 — Fear & Greed: pendulum gauge */
DRAWS['fearAndGreedCanvas'] = () => {
  const r = setupCanvas('fearAndGreedCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  const cx = w * 0.5, cy = h * 0.75, radius = Math.min(w, h) * 0.45;

  // Semi-circle gauge (fear to greed)
  // Left half = fear (red), right half = greed (green)
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';

  // Fear arc (left)
  ctx.strokeStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI, Math.PI * 1.5);
  ctx.stroke();

  // Greed arc (right)
  ctx.strokeStyle = accent2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 1.5, Math.PI * 2);
  ctx.stroke();

  // Needle pointing slightly toward greed
  const angle = Math.PI * 1.6;
  ctx.strokeStyle = fg;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(angle) * radius * 0.75, cy + Math.sin(angle) * radius * 0.75);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();

  // Labels
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.fillText('FEAR', w * 0.15, cy + 5);
  ctx.fillStyle = accent2;
  ctx.fillText('GREED', w * 0.85, cy + 5);
  ctx.fillStyle = muted;
  ctx.font = '10px sans-serif';
  ctx.fillText('Neutral', cx, cy - radius - 8);
};

/* 07 — Loss Aversion: asymmetric value function (S-curve) */
DRAWS['lossAversionCanvas'] = () => {
  const r = setupCanvas('lossAversionCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  const cx = w * 0.5, cy = h * 0.45;

  // Axes
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, cy);
  ctx.lineTo(w * 0.9, cy);
  ctx.moveTo(cx, h * 0.05);
  ctx.lineTo(cx, h * 0.9);
  ctx.stroke();

  // Gains curve (concave, smaller)
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  for (let x = 0; x <= 1; x += 0.02) {
    const px = cx + x * (w * 0.35);
    const py = cy - Math.pow(x, 0.5) * (h * 0.25);
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Losses curve (convex, steeper ~2x)
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x <= 1; x += 0.02) {
    const px = cx - x * (w * 0.35);
    const py = cy + Math.pow(x, 0.5) * (h * 0.45);
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent2;
  ctx.fillText('Gains (+)', w * 0.8, cy - 8);
  ctx.fillStyle = accent;
  ctx.fillText('Losses (−)', w * 0.18, cy - 8);
  ctx.fillStyle = fg;
  ctx.font = '10px sans-serif';
  ctx.fillText('Value', cx + 12, h * 0.08);
  ctx.fillStyle = muted;
  ctx.fillText('Losses hurt ~2× more', w * 0.3, h * 0.9);
};

/* 08 — Regret Aversion: decision paralysis fork */
DRAWS['regretAversionCanvas'] = () => {
  const r = setupCanvas('regretAversionCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Person at fork
  const cx = w * 0.5, top = h * 0.2;
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.arc(cx, top, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, top + 8);
  ctx.lineTo(cx, top + 30);
  ctx.stroke();

  // Two paths
  // Left: Act → possible regret of commission
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, top + 30);
  ctx.quadraticCurveTo(cx - 30, h * 0.5, w * 0.2, h * 0.7);
  ctx.stroke();

  // Right: Don't act → possible regret of omission
  ctx.strokeStyle = accent2;
  ctx.beginPath();
  ctx.moveTo(cx, top + 30);
  ctx.quadraticCurveTo(cx + 30, h * 0.5, w * 0.8, h * 0.7);
  ctx.stroke();

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.fillText('ACT', w * 0.2, h * 0.78);
  ctx.font = '9px sans-serif';
  ctx.fillText('Regret of commission', w * 0.2, h * 0.85);

  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = accent2;
  ctx.fillText("DON'T ACT", w * 0.8, h * 0.78);
  ctx.font = '9px sans-serif';
  ctx.fillText('Regret of omission', w * 0.8, h * 0.85);

  // Paralysis indicator
  ctx.fillStyle = muted;
  ctx.font = 'italic 10px sans-serif';
  ctx.fillText('— paralysis —', cx, h * 0.55);
};

/* 09 — Overconfidence: calibration diagram */
DRAWS['overconfidenceCanvas'] = () => {
  const r = setupCanvas('overconfidenceCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Bar chart: confidence vs actual accuracy
  const bars = [
    { label: '50%', conf: 0.5, actual: 0.45 },
    { label: '70%', conf: 0.7, actual: 0.55 },
    { label: '80%', conf: 0.8, actual: 0.6 },
    { label: '90%', conf: 0.9, actual: 0.65 },
    { label: '99%', conf: 0.99, actual: 0.75 },
  ];

  const bw = w * 0.08, gap = w * 0.1;
  const baseY = h * 0.85, topY = h * 0.1;
  const maxH = baseY - topY;
  const startX = w * 0.12;

  bars.forEach((b, i) => {
    const x = startX + i * (bw * 2 + gap);
    // Confidence bar
    ctx.fillStyle = accent;
    const ch = b.conf * maxH;
    ctx.fillRect(x, baseY - ch, bw, ch);
    // Actual bar
    ctx.fillStyle = accent2;
    const ah = b.actual * maxH;
    ctx.fillRect(x + bw + 2, baseY - ah, bw, ah);
    // Label
    ctx.fillStyle = fg;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.label, x + bw, baseY + 12);
  });

  // Legend
  ctx.fillStyle = accent;
  ctx.fillRect(w * 0.15, h * 0.03, 10, 10);
  ctx.fillStyle = fg;
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Confidence', w * 0.17 + 10, h * 0.03 + 9);

  ctx.fillStyle = accent2;
  ctx.fillRect(w * 0.5, h * 0.03, 10, 10);
  ctx.fillStyle = fg;
  ctx.fillText('Actual Accuracy', w * 0.52 + 10, h * 0.03 + 9);
};

/* 10 — Disposition Effect: sell winners / hold losers arrows */
DRAWS['dispositionEffectCanvas'] = () => {
  const r = setupCanvas('dispositionEffectCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Two stock paths from center
  const cx = w * 0.5, cy = h * 0.5;
  const startX = w * 0.1;

  // Winner line going up
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, cy);
  ctx.lineTo(w * 0.4, cy - h * 0.15);
  ctx.lineTo(w * 0.55, cy - h * 0.2);
  ctx.stroke();
  // Scissors cut
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  const cutX = w * 0.55, cutY = cy - h * 0.2;
  ctx.beginPath();
  ctx.moveTo(cutX - 8, cutY - 10);
  ctx.lineTo(cutX + 8, cutY + 5);
  ctx.moveTo(cutX + 8, cutY - 10);
  ctx.lineTo(cutX - 8, cutY + 5);
  ctx.stroke();
  // Missed further gains (dashed)
  ctx.strokeStyle = accent2;
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cutX, cutY);
  ctx.lineTo(w * 0.9, h * 0.1);
  ctx.stroke();
  ctx.setLineDash([]);

  // Loser line going down
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, cy + h * 0.05);
  ctx.lineTo(w * 0.35, cy + h * 0.15);
  ctx.lineTo(w * 0.55, cy + h * 0.25);
  ctx.lineTo(w * 0.8, cy + h * 0.35);
  ctx.lineTo(w * 0.9, cy + h * 0.38);
  ctx.stroke();

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillStyle = accent2;
  ctx.fillText('Winner → SOLD ✂️', cutX + 12, cutY);
  ctx.fillStyle = accent;
  ctx.fillText('Loser → HELD 😰', w * 0.6, cy + h * 0.3);

  ctx.fillStyle = muted;
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Buy price', startX + 20, cy + h * 0.05 - 10);
};

/* 11 — Herd Behavior: crowd of arrows all pointing same direction */
DRAWS['herdBehaviorCanvas'] = () => {
  const r = setupCanvas('herdBehaviorCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');

  // Grid of arrows all pointing right (herd)
  ctx.fillStyle = fg;
  const rows = 4, cols = 6;
  const gx = w * 0.08, gy = h * 0.15;
  const sw = (w * 0.75) / cols, sh = (h * 0.6) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gx + c * sw + sw / 2;
      const y = gy + r * sh + sh / 2;
      const isContrarian = r === 2 && c === 4;

      ctx.save();
      ctx.translate(x, y);
      if (isContrarian) {
        ctx.rotate(Math.PI);
        ctx.fillStyle = accent;
      } else {
        ctx.fillStyle = accent2;
      }

      // Arrow shape
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-4, -6);
      ctx.lineTo(-4, -2);
      ctx.lineTo(-10, -2);
      ctx.lineTo(-10, 2);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-4, 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent2;
  ctx.fillText('The Herd →', w * 0.5, h * 0.08);
  ctx.fillStyle = accent;
  ctx.fillText('← Contrarian', w * 0.75, h * 0.88);
};

/* 12 — FOMO: escalation spiral */
DRAWS['fomoCanvas'] = () => {
  const r = setupCanvas('fomoCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Spiral path going inward (FOMO trap)
  const cx = w * 0.5, cy = h * 0.5;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const turns = 3;
  for (let a = 0; a < turns * Math.PI * 2; a += 0.05) {
    const radius = (Math.min(w, h) * 0.4) * (1 - a / (turns * Math.PI * 2));
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Labels along spiral
  const labels = [
    { a: 0.3, r: 0.85, text: 'See gains' },
    { a: 1.5, r: 0.65, text: 'Anxiety' },
    { a: 3.0, r: 0.48, text: 'Chase' },
    { a: 4.5, r: 0.3, text: 'Buy top' },
  ];
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  labels.forEach(l => {
    const radius = (Math.min(w, h) * 0.4) * l.r;
    const x = cx + Math.cos(l.a) * radius;
    const y = cy + Math.sin(l.a) * radius;
    ctx.fillStyle = fg;
    ctx.fillText(l.text, x, y - 8);
  });

  // Trap center
  ctx.fillStyle = accent;
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('TRAP', cx, cy + 4);
};

/* 13 — Social Proof: network/influence diagram */
DRAWS['socialProofCanvas'] = () => {
  const r = setupCanvas('socialProofCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Central influencer node
  const cx = w * 0.5, cy = h * 0.45;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  // Follower nodes in circle
  const followers = 8;
  const radius = Math.min(w, h) * 0.3;
  for (let i = 0; i < followers; i++) {
    const a = (i / followers) * Math.PI * 2 - Math.PI / 2;
    const fx = cx + Math.cos(a) * radius;
    const fy = cy + Math.sin(a) * radius;

    // Connection line
    ctx.strokeStyle = muted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(fx, fy);
    ctx.stroke();

    // Follower dot
    ctx.fillStyle = accent2;
    ctx.beginPath();
    ctx.arc(fx, fy, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Labels
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.fillText('BUY', cx, cy + 4);
  ctx.fillStyle = fg;
  ctx.fillText('Social Proof Network', w * 0.5, h * 0.92);
};

/* 14 — Contrarian Thinking: stream vs. salmon */
DRAWS['contrarianThinkingCanvas'] = () => {
  const r = setupCanvas('contrarianThinkingCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');

  // Stream flowing right (multiple parallel arrows)
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 1;
  for (let y = h * 0.2; y < h * 0.8; y += h * 0.1) {
    ctx.beginPath();
    ctx.moveTo(w * 0.1, y);
    ctx.lineTo(w * 0.85, y);
    ctx.stroke();
    // arrowhead
    ctx.beginPath();
    ctx.moveTo(w * 0.82, y - 4);
    ctx.lineTo(w * 0.85, y);
    ctx.lineTo(w * 0.82, y + 4);
    ctx.stroke();
  }

  // Contrarian arrow going LEFT in the middle
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(w * 0.8, h * 0.5);
  ctx.lineTo(w * 0.15, h * 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.2, h * 0.5 - 8);
  ctx.lineTo(w * 0.15, h * 0.5);
  ctx.lineTo(w * 0.2, h * 0.5 + 8);
  ctx.fillStyle = accent;
  ctx.fill();

  // Labels
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent2;
  ctx.fillText('Consensus →', w * 0.5, h * 0.12);
  ctx.fillStyle = accent;
  ctx.fillText('← Contrarian', w * 0.5, h * 0.93);
};

/* 15 — Information Cascades: domino chain */
DRAWS['informationCascadesCanvas'] = () => {
  const r = setupCanvas('informationCascadesCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  const count = 7;
  const spacing = w * 0.85 / count;
  const baseY = h * 0.75;

  for (let i = 0; i < count; i++) {
    const x = w * 0.1 + i * spacing;
    const angle = i < 5 ? (i * 0.15) : 0; // falling dominoes
    const isBroken = i === 5; // cascade break point

    ctx.save();
    ctx.translate(x, baseY);
    ctx.rotate(angle);

    if (isBroken) {
      // Standing domino (hasn't fallen)
      ctx.fillStyle = accent;
      ctx.fillRect(-6, -40, 12, 40);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('?', 0, -18);
    } else {
      ctx.fillStyle = i < 5 ? fg : muted;
      ctx.fillRect(-6, -40, 12, 40);
      // Dots
      ctx.fillStyle = i < 5 ? '#fff' : fg;
      ctx.beginPath();
      ctx.arc(0, -28, 2, 0, Math.PI * 2);
      ctx.arc(0, -14, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Labels
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = fg;
  ctx.fillText('A buys → B follows → C follows → D follows → ...', w * 0.5, h * 0.12);
  ctx.fillStyle = accent;
  ctx.fillText('Cascade breaks here!', w * 0.1 + 5 * spacing, h * 0.92);
};

/* 16 — Sunk Cost: weight pulling down */
DRAWS['sunkCostFallacyCanvas'] = () => {
  const r = setupCanvas('sunkCostFallacyCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Person figure at top
  const cx = w * 0.5, top = h * 0.12;
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.arc(cx, top, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, top + 8);
  ctx.lineTo(cx, top + 30);
  ctx.stroke();

  // Chain down to weight
  ctx.strokeStyle = muted;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(cx, top + 30);
  ctx.lineTo(cx, h * 0.6);
  ctx.stroke();
  ctx.setLineDash([]);

  // Weight block
  ctx.fillStyle = accent;
  const bw = 60, bh = 35;
  ctx.fillRect(cx - bw / 2, h * 0.6, bw, bh);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('-$5,000', cx, h * 0.6 + bh / 2 + 4);

  // Label
  ctx.fillStyle = muted;
  ctx.font = '10px sans-serif';
  ctx.fillText('Sunk cost — already gone', cx, h * 0.6 + bh + 18);
  ctx.fillStyle = fg;
  ctx.font = 'italic 10px sans-serif';
  ctx.fillText('"I can\'t sell now..."', cx, top + 50);
};

/* 17 — Gambler's Fallacy: coin flips sequence */
DRAWS['gamblerFallacyCanvas'] = () => {
  const r = setupCanvas('gamblerFallacyCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Sequence of "red" days
  const days = ['▼','▼','▼','▼','▼','?'];
  const spacing = w * 0.8 / days.length;
  const y = h * 0.4;

  days.forEach((d, i) => {
    const x = w * 0.12 + i * spacing;
    const isLast = i === days.length - 1;

    // Circle
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = isLast ? muted : accent;
    ctx.fill();

    // Symbol
    ctx.fillStyle = '#fff';
    ctx.font = isLast ? 'bold 18px sans-serif' : '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d, x, y + 6);

    // Day label
    ctx.fillStyle = fg;
    ctx.font = '9px sans-serif';
    ctx.fillText(`Day ${i + 1}`, x, y + 35);
  });

  // Wrong inference arrow
  const lastX = w * 0.12 + 5 * spacing;
  ctx.fillStyle = accent2;
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('"Due for ▲!"', lastX, y - 28);

  // Truth
  ctx.fillStyle = muted;
  ctx.font = '10px sans-serif';
  ctx.fillText('Each day is independent — no memory', w * 0.5, h * 0.82);
};

/* 18 — Framing Effect: same glass, two perspectives */
DRAWS['framingEffectCanvas'] = () => {
  const r = setupCanvas('framingEffectCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');

  // Two identical glasses
  const drawGlass = (x, fillLevel, label, color, frameLabel) => {
    const gw = 50, gh = 70;
    const gy = h * 0.35;

    // Glass outline
    ctx.strokeStyle = fg;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - gw / 2, gy);
    ctx.lineTo(x - gw / 2 + 5, gy + gh);
    ctx.lineTo(x + gw / 2 - 5, gy + gh);
    ctx.lineTo(x + gw / 2, gy);
    ctx.stroke();

    // Fill level
    const fillH = gh * fillLevel;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(x - gw / 2 + 3, gy + gh - fillH);
    ctx.lineTo(x - gw / 2 + 5, gy + gh);
    ctx.lineTo(x + gw / 2 - 5, gy + gh);
    ctx.lineTo(x + gw / 2 - 3, gy + gh - fillH);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Labels
    ctx.fillStyle = color;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, h * 0.25);
    ctx.font = '10px sans-serif';
    ctx.fillText(frameLabel, x, gy + gh + 20);
  };

  drawGlass(w * 0.25, 0.5, 'GAIN FRAME', accent2, '"20% discount"');
  drawGlass(w * 0.75, 0.5, 'LOSS FRAME', accent, '"Fell 20%"');

  // Equals sign
  ctx.fillStyle = fg;
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('=', w * 0.5, h * 0.65);

  ctx.font = '10px sans-serif';
  ctx.fillText('Same fact, different decisions', w * 0.5, h * 0.92);
};

/* 19 — Mental Accounting: separate buckets */
DRAWS['mentalAccountingCanvas'] = () => {
  const r = setupCanvas('mentalAccountingCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const accent3 = getColor('--accent3');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  const buckets = [
    { label: 'Salary', color: accent3, risk: 'Low risk' },
    { label: 'Trading\nProfits', color: accent2, risk: 'High risk' },
    { label: 'Bonus', color: accent, risk: 'Medium' },
  ];

  const bw = w * 0.2, spacing = w * 0.07;
  const startX = w * 0.1;

  buckets.forEach((b, i) => {
    const x = startX + i * (bw + spacing);
    const by = h * 0.3, bh = h * 0.4;

    // Bucket shape
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x, by);
    ctx.lineTo(x + 3, by + bh);
    ctx.lineTo(x + bw - 3, by + bh);
    ctx.lineTo(x + bw, by);
    ctx.stroke();

    // Label
    ctx.fillStyle = b.color;
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    const lines = b.label.split('\n');
    lines.forEach((line, li) => {
      ctx.fillText(line, x + bw / 2, by + bh / 2 + li * 13);
    });

    // Risk label
    ctx.fillStyle = muted;
    ctx.font = '9px sans-serif';
    ctx.fillText(b.risk, x + bw / 2, by + bh + 16);
  });

  // "But it's all YOUR money" label
  ctx.fillStyle = fg;
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('All fungible — $1 = $1', w * 0.5, h * 0.92);
};

/* 20 — Status Quo Bias: person sitting while opportunities pass */
DRAWS['statusQuoBiasCanvas'] = () => {
  const r = setupCanvas('statusQuoBiasCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // "Current Position" box (anchored)
  const cx = w * 0.5, cy = h * 0.5;
  ctx.strokeStyle = fg;
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 35, cy - 20, 70, 40);
  ctx.fillStyle = fg;
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('STATUS', cx, cy - 4);
  ctx.fillText('QUO', cx, cy + 10);

  // Opportunities passing by (dashed arrows going past)
  const opportunities = [
    { y: h * 0.2, label: 'Rebalance' },
    { y: h * 0.35, label: 'Switch fund' },
    { y: h * 0.65, label: 'Cut loser' },
    { y: h * 0.8, label: 'New allocation' },
  ];

  opportunities.forEach(o => {
    ctx.strokeStyle = accent2;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(w * 0.05, o.y);
    ctx.lineTo(w * 0.95, o.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = accent2;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(o.label + ' →', w * 0.95, o.y - 5);
  });

  ctx.fillStyle = muted;
  ctx.font = 'italic 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('"I\'ll just keep what I have"', cx, h * 0.95);
};

/* 21 — Sentiment Cycle: emotional wave with labeled phases */
DRAWS['marketSentimentCycleCanvas'] = () => {
  const r = setupCanvas('marketSentimentCycleCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Wave shape representing market cycle
  const phases = [
    { x: 0.05, y: 0.7, label: 'Disbelief' },
    { x: 0.12, y: 0.55, label: 'Hope' },
    { x: 0.22, y: 0.4, label: 'Optimism' },
    { x: 0.32, y: 0.28, label: 'Excitement' },
    { x: 0.42, y: 0.18, label: 'Thrill' },
    { x: 0.5, y: 0.12, label: 'EUPHORIA' },
    { x: 0.58, y: 0.2, label: 'Anxiety' },
    { x: 0.65, y: 0.35, label: 'Denial' },
    { x: 0.72, y: 0.5, label: 'Fear' },
    { x: 0.8, y: 0.7, label: 'Panic' },
    { x: 0.88, y: 0.82, label: 'CAPITULATION' },
    { x: 0.95, y: 0.75, label: 'Relief' },
  ];

  // Draw cycle curve
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  phases.forEach((p, i) => {
    const x = w * p.x, y = h * p.y;
    if (i === 0) ctx.moveTo(x, y);
    else {
      const prev = phases[i - 1];
      const cpx = (w * prev.x + x) / 2;
      ctx.quadraticCurveTo(cpx, h * prev.y, x, y);
    }
  });
  ctx.stroke();

  // Phase labels
  phases.forEach(p => {
    const x = w * p.x, y = h * p.y;
    ctx.fillStyle = p.label === 'EUPHORIA' ? accent : p.label === 'CAPITULATION' ? accent2 : muted;
    ctx.font = p.label === 'EUPHORIA' || p.label === 'CAPITULATION' ? 'bold 10px sans-serif' : '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.label, x, y - 8);

    // Dot
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Risk / Opportunity markers
  ctx.fillStyle = accent;
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('MAX RISK ↑', w * 0.5, h * 0.08);
  ctx.fillStyle = accent2;
  ctx.fillText('MAX OPPORTUNITY ↓', w * 0.88, h * 0.92);
};

/* 22 — Accumulation & Distribution: Wyckoff 4-phase diagram */
DRAWS['accumulationDistributionCanvas'] = () => {
  const r = setupCanvas('accumulationDistributionCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const accent3 = getColor('--accent3');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Four phases as price curve
  const pts = [
    // Accumulation (flat/range)
    [0.02,0.7],[0.06,0.72],[0.1,0.68],[0.14,0.72],[0.18,0.69],
    // Markup (rising)
    [0.25,0.6],[0.32,0.45],[0.38,0.35],
    // Distribution (flat/range at top)
    [0.42,0.3],[0.46,0.28],[0.5,0.32],[0.54,0.28],[0.58,0.32],
    // Markdown (falling)
    [0.65,0.45],[0.72,0.6],[0.78,0.7],
    // New accumulation
    [0.82,0.72],[0.86,0.68],[0.9,0.72],[0.95,0.7],
  ];

  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    i === 0 ? ctx.moveTo(w * x, h * y) : ctx.lineTo(w * x, h * y);
  });
  ctx.stroke();

  // Phase backgrounds
  const phases = [
    { x1: 0.02, x2: 0.2, color: accent2, label: 'Accumulation', ly: 0.9 },
    { x1: 0.2, x2: 0.4, color: accent3, label: 'Markup', ly: 0.9 },
    { x1: 0.4, x2: 0.6, color: accent, label: 'Distribution', ly: 0.15 },
    { x1: 0.6, x2: 0.8, color: muted, label: 'Markdown', ly: 0.9 },
  ];

  phases.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.08;
    ctx.fillRect(w * p.x1, h * 0.05, w * (p.x2 - p.x1), h * 0.9);
    ctx.globalAlpha = 1;

    ctx.fillStyle = p.color;
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.label, w * (p.x1 + p.x2) / 2, h * p.ly);
  });
};

/* 23 — Euphoria & Panic: VIX-style volatility spikes */
DRAWS['euphoriaPanicCanvas'] = () => {
  const r = setupCanvas('euphoriaPanicCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Price line (bubble → crash)
  const pricePts = [
    [0.05,0.7],[0.1,0.65],[0.15,0.6],[0.2,0.5],[0.25,0.4],
    [0.3,0.28],[0.35,0.18],[0.4,0.12],[0.42,0.1], // peak
    [0.45,0.15],[0.5,0.3],[0.55,0.5],[0.58,0.7],[0.6,0.78],
    [0.65,0.82],[0.7,0.8],[0.8,0.75],[0.9,0.7],[0.95,0.68]
  ];

  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  pricePts.forEach(([x, y], i) => {
    i === 0 ? ctx.moveTo(w * x, h * y) : ctx.lineTo(w * x, h * y);
  });
  ctx.stroke();

  // Euphoria zone (top)
  ctx.fillStyle = accent2;
  ctx.globalAlpha = 0.12;
  ctx.fillRect(w * 0.3, h * 0.05, w * 0.15, h * 0.2);
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent2;
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EUPHORIA', w * 0.375, h * 0.08);

  // Panic zone (bottom)
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.12;
  ctx.fillRect(w * 0.52, h * 0.65, w * 0.18, h * 0.25);
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent;
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('PANIC', w * 0.61, h * 0.95);

  // "This time is different" / "The world is ending"
  ctx.font = 'italic 8px sans-serif';
  ctx.fillStyle = accent2;
  ctx.fillText('"This time is different"', w * 0.375, h * 0.17);
  ctx.fillStyle = accent;
  ctx.fillText('"The world is ending"', w * 0.61, h * 0.85);
};

/* 24 — Smart Money vs Dumb Money: divergence arrows */
DRAWS['smartMoneyDumbMoneyCanvas'] = () => {
  const r = setupCanvas('smartMoneyDumbMoneyCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Timeline across bottom
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.05, h * 0.5);
  ctx.lineTo(w * 0.95, h * 0.5);
  ctx.stroke();

  // Market phases
  const phases = ['Bottom', 'Markup', 'Top', 'Markdown'];
  phases.forEach((p, i) => {
    const x = w * (0.15 + i * 0.22);
    ctx.fillStyle = muted;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p, x, h * 0.5 + 14);
  });

  // Smart money arrows (buy at bottom, sell at top)
  const smart = [
    { x: 0.15, dir: 'up', label: 'BUYS' },
    { x: 0.37, dir: 'up', label: '' },
    { x: 0.59, dir: 'down', label: 'SELLS' },
    { x: 0.81, dir: 'down', label: '' },
  ];
  smart.forEach(s => {
    const x = w * s.x - 12;
    const isUp = s.dir === 'up';
    ctx.strokeStyle = accent2;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x, h * (isUp ? 0.42 : 0.18));
    ctx.lineTo(x, h * (isUp ? 0.22 : 0.42));
    ctx.stroke();
    // arrowhead
    const ay = h * (isUp ? 0.22 : 0.42);
    const dir = isUp ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(x - 5, ay + dir * 6);
    ctx.lineTo(x, ay);
    ctx.lineTo(x + 5, ay + dir * 6);
    ctx.stroke();
    if (s.label) {
      ctx.fillStyle = accent2;
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.label, x, h * (isUp ? 0.18 : 0.15));
    }
  });

  // Dumb money arrows (buy at top, sell at bottom) — offset
  const dumb = [
    { x: 0.15, dir: 'down', label: 'sells' },
    { x: 0.37, dir: 'down', label: '' },
    { x: 0.59, dir: 'up', label: 'buys' },
    { x: 0.81, dir: 'up', label: '' },
  ];
  dumb.forEach(s => {
    const x = w * s.x + 12;
    const isUp = s.dir === 'up';
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, h * (isUp ? 0.42 : 0.58));
    ctx.lineTo(x, h * (isUp ? 0.58 : 0.78));
    ctx.stroke();
    ctx.setLineDash([]);
    const ay = h * (isUp ? 0.58 : 0.78);
    const dir = isUp ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(x - 4, ay - dir * 5);
    ctx.lineTo(x, ay);
    ctx.lineTo(x + 4, ay - dir * 5);
    ctx.strokeStyle = accent;
    ctx.stroke();
    if (s.label) {
      ctx.fillStyle = accent;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.label, x, h * (isUp ? 0.63 : 0.83));
    }
  });

  // Legend
  ctx.fillStyle = accent2;
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('— Smart Money', w * 0.05, h * 0.08);
  ctx.fillStyle = accent;
  ctx.fillText('- - Dumb Money', w * 0.05, h * 0.95);
};

/* 25 — Mean Reversion: rubber band stretching back to mean */
DRAWS['meanReversionPsychologyCanvas'] = () => {
  const r = setupCanvas('meanReversionPsychologyCanvas'); if (!r) return;
  const { ctx, w, h } = r;
  const accent = getColor('--accent');
  const accent2 = getColor('--accent2');
  const fg = getColor('--fg');
  const muted = getColor('--muted');

  // Mean line
  const my = h * 0.5;
  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(w * 0.05, my);
  ctx.lineTo(w * 0.95, my);
  ctx.stroke();
  ctx.setLineDash([]);

  // Price oscillating around mean
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= 1; x += 0.005) {
    const px = w * (0.05 + x * 0.9);
    const amplitude = Math.sin(x * Math.PI * 3) * h * 0.3;
    const decay = 1 - x * 0.3;
    const py = my - amplitude * decay;
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Rubber band arrows pulling back to mean at extremes
  const extremes = [
    { x: 0.22, above: true },
    { x: 0.55, above: false },
    { x: 0.88, above: true },
  ];
  extremes.forEach(e => {
    const px = w * (0.05 + e.x * 0.9);
    const amplitude = Math.sin(e.x * Math.PI * 3) * h * 0.3 * (1 - e.x * 0.3);
    const py = my - amplitude;

    ctx.strokeStyle = e.above ? accent : accent2;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, my);
    ctx.stroke();
    // arrow toward mean
    const dir = e.above ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(px - 4, my - dir * 6);
    ctx.lineTo(px, my);
    ctx.lineTo(px + 4, my - dir * 6);
    ctx.stroke();
  });

  // Labels
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = muted;
  ctx.fillText('MEAN', w * 0.96, my - 5);
  ctx.fillStyle = accent;
  ctx.fillText('Overshoot', w * 0.25, h * 0.12);
  ctx.fillStyle = accent2;
  ctx.fillText('Undershoot', w * 0.55, h * 0.9);
};
