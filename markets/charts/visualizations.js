/* ═══════════════════════════════════════════════════════════════
   Chart Patterns — Interactive Visualizations
   25 canvas-based DRAWS + helper utilities
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
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { ctx, w: rect.width, h: rect.height };
}

function getColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const DRAWS = {
/* ─────────── 01 Head & Shoulders ─────────── */
'head-and-shoulders'(canvas) {
  const s = setupCanvas('headAndShouldersCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pts = [
    [w*0.05,h*0.7],[w*0.15,h*0.4],[w*0.25,h*0.6],[w*0.38,h*0.15],[w*0.5,h*0.55],
    [w*0.62,h*0.35],[w*0.72,h*0.6],[w*0.85,h*0.9]
  ];
  // Price line
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Neckline
  ctx.setLineDash([5,4]);
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.6); ctx.lineTo(w*0.72,h*0.6);
  ctx.strokeStyle = red; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.setLineDash([]);
  // Labels
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Left Shoulder', w*0.15, h*0.33);
  ctx.fillText('Head', w*0.38, h*0.08);
  ctx.fillText('Right Shoulder', w*0.62, h*0.28);
  ctx.fillStyle = red; ctx.fillText('Neckline', w*0.48, h*0.57);
  ctx.fillStyle = muted; ctx.fillText('↓ Breakdown target', w*0.85, h*0.85);
},

/* ─────────── 02 Inverse H&S ─────────── */
'inverse-head-and-shoulders'(canvas) {
  const s = setupCanvas('inverseHeadAndShouldersCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pts = [
    [w*0.05,h*0.3],[w*0.15,h*0.6],[w*0.25,h*0.4],[w*0.38,h*0.85],[w*0.5,h*0.45],
    [w*0.62,h*0.65],[w*0.72,h*0.4],[w*0.85,h*0.1]
  ];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Neckline
  ctx.setLineDash([5,4]);
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.4); ctx.lineTo(w*0.72,h*0.4);
  ctx.strokeStyle = green; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('L Shoulder', w*0.15, h*0.68);
  ctx.fillText('Head', w*0.38, h*0.93);
  ctx.fillText('R Shoulder', w*0.62, h*0.73);
  ctx.fillStyle = green; ctx.fillText('Neckline', w*0.48, h*0.37);
  ctx.fillStyle = muted; ctx.fillText('↑ Breakout target', w*0.85, h*0.08);
},

/* ─────────── 03 Double Top ─────────── */
'double-top'(canvas) {
  const s = setupCanvas('doubleTopCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pts = [
    [w*0.05,h*0.7],[w*0.2,h*0.15],[w*0.4,h*0.55],[w*0.6,h*0.15],[w*0.75,h*0.55],[w*0.9,h*0.9]
  ];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Resistance
  ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(w*0.15,h*0.15); ctx.lineTo(w*0.65,h*0.15);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  // Neckline
  ctx.beginPath(); ctx.moveTo(w*0.35,h*0.55); ctx.lineTo(w*0.8,h*0.55);
  ctx.strokeStyle = red+'90'; ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Peak 1', w*0.2, h*0.08);
  ctx.fillText('Peak 2', w*0.6, h*0.08);
  ctx.fillStyle = red; ctx.fillText('"M" formation', w*0.5, h*0.92);
},

/* ─────────── 04 Double Bottom ─────────── */
'double-bottom'(canvas) {
  const s = setupCanvas('doubleBottomCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pts = [
    [w*0.05,h*0.3],[w*0.2,h*0.85],[w*0.4,h*0.45],[w*0.6,h*0.85],[w*0.75,h*0.45],[w*0.9,h*0.1]
  ];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Support
  ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(w*0.15,h*0.85); ctx.lineTo(w*0.65,h*0.85);
  ctx.strokeStyle = green; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.35,h*0.45); ctx.lineTo(w*0.8,h*0.45);
  ctx.strokeStyle = green+'90'; ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Trough 1', w*0.2, h*0.93);
  ctx.fillText('Trough 2', w*0.6, h*0.93);
  ctx.fillStyle = green; ctx.fillText('"W" formation', w*0.5, h*0.08);
},

/* ─────────── 05 Rounding Bottom ─────────── */
'rounding-bottom'(canvas) {
  const s = setupCanvas('roundingBottomCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // U-shape curve
  ctx.beginPath();
  ctx.moveTo(w*0.08, h*0.2);
  ctx.bezierCurveTo(w*0.15, h*0.5, w*0.25, h*0.85, w*0.5, h*0.85);
  ctx.bezierCurveTo(w*0.75, h*0.85, w*0.85, h*0.5, w*0.92, h*0.15);
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Neckline
  ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(w*0.05,h*0.2); ctx.lineTo(w*0.95,h*0.2);
  ctx.strokeStyle = green; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Selling pressure fades', w*0.3, h*0.55);
  ctx.fillText('Buying builds', w*0.72, h*0.55);
  ctx.fillStyle = green; ctx.fillText('Neckline / Breakout', w*0.5, h*0.15);
},

/* ─────────── 06 Bull Flag ─────────── */
'bull-flag'(canvas) {
  const s = setupCanvas('bullFlagCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Pole
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.85); ctx.lineTo(w*0.25,h*0.15);
  ctx.strokeStyle = green; ctx.lineWidth = 3; ctx.stroke();
  // Flag channel (downward sloping)
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.15); ctx.lineTo(w*0.55,h*0.35);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.32); ctx.lineTo(w*0.55,h*0.52);
  ctx.strokeStyle = fg; ctx.stroke();
  // Price zigzag inside flag
  const flagPts = [[w*0.25,h*0.15],[w*0.32,h*0.34],[w*0.38,h*0.22],[w*0.44,h*0.42],[w*0.5,h*0.30],[w*0.55,h*0.48]];
  ctx.beginPath(); flagPts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg+'80'; ctx.lineWidth = 1; ctx.stroke();
  // Breakout
  ctx.beginPath(); ctx.moveTo(w*0.55,h*0.35); ctx.lineTo(w*0.85,h*0.05);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Pole', w*0.12, h*0.55);
  ctx.fillText('Flag', w*0.4, h*0.58);
  ctx.fillStyle = green; ctx.fillText('Breakout ↑', w*0.72, h*0.08);
},

/* ─────────── 07 Bear Flag ─────────── */
'bear-flag'(canvas) {
  const s = setupCanvas('bearFlagCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Pole down
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.15); ctx.lineTo(w*0.25,h*0.85);
  ctx.strokeStyle = red; ctx.lineWidth = 3; ctx.stroke();
  // Flag channel (upward sloping)
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.85); ctx.lineTo(w*0.55,h*0.65);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.25,h*0.68); ctx.lineTo(w*0.55,h*0.48);
  ctx.stroke();
  // Breakdown
  ctx.beginPath(); ctx.moveTo(w*0.55,h*0.65); ctx.lineTo(w*0.85,h*0.95);
  ctx.strokeStyle = red; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Pole', w*0.12, h*0.45);
  ctx.fillText('Flag', w*0.4, h*0.42);
  ctx.fillStyle = red; ctx.fillText('Breakdown ↓', w*0.72, h*0.92);
},

/* ─────────── 08 Pennant ─────────── */
pennant(canvas) {
  const s = setupCanvas('pennantCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Pole
  ctx.beginPath(); ctx.moveTo(w*0.05,h*0.85); ctx.lineTo(w*0.22,h*0.15);
  ctx.strokeStyle = green; ctx.lineWidth = 3; ctx.stroke();
  // Converging lines (small triangle)
  ctx.beginPath(); ctx.moveTo(w*0.22,h*0.15); ctx.lineTo(w*0.52,h*0.38);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.22,h*0.42); ctx.lineTo(w*0.52,h*0.38);
  ctx.stroke();
  // Breakout
  ctx.beginPath(); ctx.moveTo(w*0.52,h*0.38); ctx.lineTo(w*0.85,h*0.05);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Pole', w*0.1, h*0.55);
  ctx.fillText('Pennant', w*0.37, h*0.52);
  ctx.fillStyle = green; ctx.fillText('Breakout', w*0.72, h*0.08);
  ctx.fillStyle = muted; ctx.fillText('(converging lines — unlike flag\'s parallel)', w*0.5, h*0.95);
},

/* ─────────── 09 Ascending Triangle ─────────── */
'ascending-triangle'(canvas) {
  const s = setupCanvas('ascendingTriangleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Flat resistance
  ctx.beginPath(); ctx.moveTo(w*0.1,h*0.2); ctx.lineTo(w*0.75,h*0.2);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  // Rising support
  ctx.beginPath(); ctx.moveTo(w*0.1,h*0.8); ctx.lineTo(w*0.75,h*0.2);
  ctx.strokeStyle = green; ctx.lineWidth = 1.5; ctx.stroke();
  // Price zigzag
  const zz = [[w*0.1,h*0.78],[w*0.18,h*0.22],[w*0.28,h*0.62],[w*0.38,h*0.22],[w*0.5,h*0.42],[w*0.6,h*0.22],[w*0.68,h*0.28]];
  ctx.beginPath(); zz.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg+'80'; ctx.lineWidth = 1; ctx.stroke();
  // Breakout arrow
  ctx.beginPath(); ctx.moveTo(w*0.75,h*0.2); ctx.lineTo(w*0.9,h*0.05);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Flat resistance', w*0.45, h*0.14);
  ctx.fillText('Rising lows', w*0.3, h*0.85);
},

/* ─────────── 10 Descending Triangle ─────────── */
'descending-triangle'(canvas) {
  const s = setupCanvas('descendingTriangleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Flat support
  ctx.beginPath(); ctx.moveTo(w*0.1,h*0.8); ctx.lineTo(w*0.75,h*0.8);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  // Falling resistance
  ctx.beginPath(); ctx.moveTo(w*0.1,h*0.2); ctx.lineTo(w*0.75,h*0.8);
  ctx.strokeStyle = red; ctx.lineWidth = 1.5; ctx.stroke();
  // Breakdown
  ctx.beginPath(); ctx.moveTo(w*0.75,h*0.8); ctx.lineTo(w*0.9,h*0.95);
  ctx.strokeStyle = red; ctx.lineWidth = 2; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Falling highs', w*0.3, h*0.15);
  ctx.fillText('Flat support', w*0.45, h*0.88);
},

/* ─────────── 11 Symmetric Triangle ─────────── */
'symmetric-triangle'(canvas) {
  const s = setupCanvas('symmetricTriangleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent3') || '#2955a0';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Upper line (falling)
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.15); ctx.lineTo(w*0.7,h*0.48);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  // Lower line (rising)
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.85); ctx.lineTo(w*0.7,h*0.48);
  ctx.strokeStyle = fg; ctx.stroke();
  // Apex label
  ctx.beginPath(); ctx.arc(w*0.7,h*0.48,3,0,Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Apex', w*0.7, h*0.42);
  ctx.fillText('Lower highs', w*0.3, h*0.12);
  ctx.fillText('Higher lows', w*0.3, h*0.92);
  // Breakout both ways
  ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(w*0.58,h*0.38); ctx.lineTo(w*0.9,h*0.1);
  ctx.strokeStyle = getColor('--accent2')||'#2a7d5f'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.58,h*0.58); ctx.lineTo(w*0.9,h*0.88);
  ctx.strokeStyle = getColor('--accent')||'#c84b2f'; ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif';
  ctx.fillText('Can break either way', w*0.5, h*0.52);
},

/* ─────────── 12 Rising Wedge ─────────── */
'rising-wedge'(canvas) {
  const s = setupCanvas('risingWedgeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Both lines slope up, converging
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.8); ctx.lineTo(w*0.7,h*0.2);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.55); ctx.lineTo(w*0.7,h*0.15);
  ctx.strokeStyle = fg; ctx.stroke();
  // Breakdown
  ctx.beginPath(); ctx.moveTo(w*0.6,h*0.35); ctx.lineTo(w*0.9,h*0.85);
  ctx.strokeStyle = red; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Bearish breakdown', w*0.82, h*0.78);
  ctx.fillStyle = muted;
  ctx.fillText('Both lines slope up', w*0.35, h*0.92);
  ctx.fillText('but range narrows', w*0.35, h*0.98);
},

/* ─────────── 13 Falling Wedge ─────────── */
'falling-wedge'(canvas) {
  const s = setupCanvas('fallingWedgeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.2); ctx.lineTo(w*0.7,h*0.8);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.45); ctx.lineTo(w*0.7,h*0.85);
  ctx.strokeStyle = fg; ctx.stroke();
  // Breakout
  ctx.beginPath(); ctx.moveTo(w*0.6,h*0.68); ctx.lineTo(w*0.9,h*0.15);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = green; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Bullish breakout', w*0.82, h*0.18);
  ctx.fillStyle = muted;
  ctx.fillText('Both lines slope down', w*0.35, h*0.08);
},

/* ─────────── 14 Broadening Formation ─────────── */
'broadening-formation'(canvas) {
  const s = setupCanvas('broadeningFormationCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const accent = getColor('--accent3') || '#2955a0';
  // Diverging lines
  ctx.beginPath(); ctx.moveTo(w*0.3,h*0.45); ctx.lineTo(w*0.92,h*0.05);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.3,h*0.55); ctx.lineTo(w*0.92,h*0.95);
  ctx.strokeStyle = fg; ctx.stroke();
  // Price zigzag (expanding)
  const zz = [[w*0.3,h*0.5],[w*0.42,h*0.3],[w*0.5,h*0.62],[w*0.6,h*0.2],[w*0.72,h*0.75],[w*0.82,h*0.1],[w*0.9,h*0.88]];
  ctx.beginPath(); zz.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Higher highs', w*0.6, h*0.08);
  ctx.fillText('Lower lows', w*0.6, h*0.95);
  ctx.fillText('Megaphone — expanding volatility', w*0.5, h*0.5);
},

/* ─────────── 15 Rectangle ─────────── */
rectangle(canvas) {
  const s = setupCanvas('rectangleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const muted = getColor('--muted') || '#666';
  // Support and resistance
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.25); ctx.lineTo(w*0.72,h*0.25);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.08,h*0.75); ctx.lineTo(w*0.72,h*0.75);
  ctx.strokeStyle = fg; ctx.stroke();
  // Fill range
  ctx.fillStyle = fg+'08';
  ctx.fillRect(w*0.08,h*0.25,w*0.64,h*0.5);
  // Price bouncing
  const zz = [[w*0.1,h*0.5],[w*0.18,h*0.27],[w*0.28,h*0.73],[w*0.38,h*0.27],[w*0.48,h*0.73],[w*0.58,h*0.27],[w*0.68,h*0.5]];
  ctx.beginPath(); zz.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = green; ctx.lineWidth = 1.5; ctx.stroke();
  // Breakout
  ctx.beginPath(); ctx.moveTo(w*0.72,h*0.25); ctx.lineTo(w*0.92,h*0.05);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Resistance', w*0.4, h*0.2);
  ctx.fillText('Support', w*0.4, h*0.83);
},

/* ─────────── 16 Doji ─────────── */
doji(canvas) {
  const s = setupCanvas('dojiCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const accent = getColor('--accent3') || '#2955a0';
  const types = [
    { name:'Standard', x:w*0.15, wh:0, upperW:30, lowerW:30 },
    { name:'Long-legged', x:w*0.38, wh:0, upperW:45, lowerW:45 },
    { name:'Dragonfly', x:w*0.62, wh:0, upperW:3, lowerW:50 },
    { name:'Gravestone', x:w*0.85, wh:0, upperW:50, lowerW:3 },
  ];
  const cy = h*0.5;
  types.forEach(({name, x, upperW, lowerW}) => {
    // Upper wick
    ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy-upperW);
    ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
    // Lower wick
    ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy+lowerW);
    ctx.stroke();
    // Body (thin line for doji)
    ctx.beginPath(); ctx.moveTo(x-8, cy); ctx.lineTo(x+8, cy);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    // Label
    ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(name, x, h-10);
  });
  ctx.fillStyle = fg; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Open ≈ Close — indecision', w*0.5, 16);
},

/* ─────────── 17 Hammer ─────────── */
hammer(canvas) {
  const s = setupCanvas('hammerCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Hammer (bullish at bottom)
  const hx = w*0.3, hy = h*0.35;
  ctx.fillStyle = green; ctx.fillRect(hx-10, hy, 20, 15);
  ctx.beginPath(); ctx.moveTo(hx, hy+15); ctx.lineTo(hx, h*0.85);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Hammer', hx, h*0.22);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('(at bottom = bullish)', hx, h*0.95);
  // Hanging Man (bearish at top)
  const mx = w*0.7;
  ctx.fillStyle = red; ctx.fillRect(mx-10, hy, 20, 15);
  ctx.beginPath(); ctx.moveTo(mx, hy+15); ctx.lineTo(mx, h*0.85);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('Hanging Man', mx, h*0.22);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('(at top = bearish)', mx, h*0.95);
  // Annotation
  ctx.fillStyle = muted; ctx.fillText('Same shape, different context', w*0.5, 12);
},

/* ─────────── 18 Engulfing ─────────── */
engulfing(canvas) {
  const s = setupCanvas('engulfingCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Bullish engulfing (left)
  const bx = w*0.25;
  // Small red candle
  ctx.fillStyle = red; ctx.fillRect(bx-6, h*0.4, 12, 20);
  ctx.beginPath(); ctx.moveTo(bx, h*0.35); ctx.lineTo(bx, h*0.4); ctx.moveTo(bx, h*0.6); ctx.lineTo(bx, h*0.65);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  // Large green candle
  ctx.fillStyle = green+'80'; ctx.fillRect(bx+16, h*0.3, 18, 40);
  ctx.strokeStyle = green; ctx.lineWidth = 1.5; ctx.strokeRect(bx+16, h*0.3, 18, 40);
  ctx.beginPath(); ctx.moveTo(bx+25, h*0.22); ctx.lineTo(bx+25, h*0.3); ctx.moveTo(bx+25, h*0.7); ctx.lineTo(bx+25, h*0.78);
  ctx.strokeStyle = green; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Bullish Engulfing', bx+12, h*0.15);
  // Bearish engulfing (right)
  const sx = w*0.7;
  ctx.fillStyle = green; ctx.fillRect(sx-6, h*0.4, 12, 20);
  ctx.fillStyle = red+'80'; ctx.fillRect(sx+16, h*0.3, 18, 40);
  ctx.strokeStyle = red; ctx.lineWidth = 1.5; ctx.strokeRect(sx+16, h*0.3, 18, 40);
  ctx.fillStyle = fg; ctx.fillText('Bearish Engulfing', sx+12, h*0.15);
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif';
  ctx.fillText('Second body completely covers the first', w*0.5, h-8);
},

/* ─────────── 19 Morning Star ─────────── */
'morning-star'(canvas) {
  const s = setupCanvas('morningStarCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const cx = w*0.5;
  // Candle 1: long red
  const c1x = cx-60;
  ctx.fillStyle = red; ctx.fillRect(c1x-8, h*0.2, 16, 50);
  ctx.beginPath(); ctx.moveTo(c1x, h*0.15); ctx.lineTo(c1x, h*0.2); ctx.moveTo(c1x, h*0.7); ctx.lineTo(c1x, h*0.75);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  // Candle 2: star (small)
  const c2x = cx;
  ctx.fillStyle = fg; ctx.fillRect(c2x-4, h*0.68, 8, 6);
  ctx.beginPath(); ctx.moveTo(c2x, h*0.6); ctx.lineTo(c2x, h*0.68); ctx.moveTo(c2x, h*0.74); ctx.lineTo(c2x, h*0.82);
  ctx.strokeStyle = fg; ctx.lineWidth = 1; ctx.stroke();
  // Candle 3: long green
  const c3x = cx+60;
  ctx.fillStyle = green; ctx.fillRect(c3x-8, h*0.22, 16, 48);
  ctx.beginPath(); ctx.moveTo(c3x, h*0.15); ctx.lineTo(c3x, h*0.22); ctx.moveTo(c3x, h*0.7); ctx.lineTo(c3x, h*0.76);
  ctx.strokeStyle = green; ctx.lineWidth = 1; ctx.stroke();
  // Labels
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Long Red', c1x, h*0.1);
  ctx.fillText('Star', c2x, h*0.55);
  ctx.fillText('Long Green', c3x, h*0.1);
  ctx.fillText('↑ Bullish reversal', cx, h-8);
},

/* ─────────── 20 Evening Star ─────────── */
'evening-star'(canvas) {
  const s = setupCanvas('eveningStarCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const cx = w*0.5;
  // Candle 1: long green
  const c1x = cx-60;
  ctx.fillStyle = green; ctx.fillRect(c1x-8, h*0.35, 16, 45);
  ctx.beginPath(); ctx.moveTo(c1x, h*0.28); ctx.lineTo(c1x, h*0.35); ctx.moveTo(c1x, h*0.8); ctx.lineTo(c1x, h*0.85);
  ctx.strokeStyle = green; ctx.lineWidth = 1; ctx.stroke();
  // Candle 2: star
  const c2x = cx;
  ctx.fillStyle = fg; ctx.fillRect(c2x-4, h*0.2, 8, 6);
  ctx.beginPath(); ctx.moveTo(c2x, h*0.14); ctx.lineTo(c2x, h*0.2); ctx.moveTo(c2x, h*0.26); ctx.lineTo(c2x, h*0.34);
  ctx.strokeStyle = fg; ctx.lineWidth = 1; ctx.stroke();
  // Candle 3: long red
  const c3x = cx+60;
  ctx.fillStyle = red; ctx.fillRect(c3x-8, h*0.3, 16, 48);
  ctx.beginPath(); ctx.moveTo(c3x, h*0.22); ctx.lineTo(c3x, h*0.3); ctx.moveTo(c3x, h*0.78); ctx.lineTo(c3x, h*0.85);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Long Green', c1x, h*0.92);
  ctx.fillText('Star', c2x, h*0.42);
  ctx.fillText('Long Red', c3x, h*0.92);
  ctx.fillText('↓ Bearish reversal', cx, h-8);
},

/* ─────────── 21 Support & Resistance ─────────── */
'support-resistance'(canvas) {
  const s = setupCanvas('supportResistanceCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Resistance zone
  ctx.fillStyle = red+'15'; ctx.fillRect(0,h*0.15,w,h*0.12);
  ctx.setLineDash([5,4]); ctx.beginPath(); ctx.moveTo(0,h*0.21); ctx.lineTo(w,h*0.21);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // Support zone
  ctx.fillStyle = green+'15'; ctx.fillRect(0,h*0.68,w,h*0.12);
  ctx.setLineDash([5,4]); ctx.beginPath(); ctx.moveTo(0,h*0.74); ctx.lineTo(w,h*0.74);
  ctx.strokeStyle = green; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // Price bouncing
  const pts = [[w*0.05,h*0.5],[w*0.12,h*0.22],[w*0.22,h*0.72],[w*0.32,h*0.22],[w*0.42,h*0.72],[w*0.52,h*0.23],[w*0.62,h*0.72],[w*0.72,h*0.23],[w*0.82,h*0.72],[w*0.92,h*0.4]];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Resistance (ceiling)', 5, h*0.12);
  ctx.fillStyle = green; ctx.fillText('Support (floor)', 5, h*0.85);
},

/* ─────────── 22 Trendlines ─────────── */
trendlines(canvas) {
  const s = setupCanvas('trendlinesCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Uptrend — connecting swing lows
  const lows = [[w*0.08,h*0.78],[w*0.3,h*0.58],[w*0.55,h*0.38],[w*0.78,h*0.18]];
  const highs = [[w*0.18,h*0.55],[w*0.42,h*0.35],[w*0.65,h*0.15]];
  // Price zigzag
  const pts = [lows[0],[w*0.18,h*0.55],lows[1],[w*0.42,h*0.35],lows[2],[w*0.65,h*0.15],lows[3]];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  // Trendline through lows
  ctx.beginPath(); ctx.moveTo(lows[0][0],lows[0][1]); ctx.lineTo(w*0.9,h*0.08);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.stroke();
  // Touch points
  lows.forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
    ctx.fillStyle = green; ctx.fill();
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Trendline connects 3+ swing lows', w*0.5, h-8);
  ctx.fillStyle = green; ctx.fillText('Touch points', w*0.85, h*0.25);
},

/* ─────────── 23 Channels ─────────── */
channels(canvas) {
  const s = setupCanvas('channelsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Ascending channel
  const offsetY = h*0.25;
  ctx.beginPath(); ctx.moveTo(w*0.05,h*0.85); ctx.lineTo(w*0.95,h*0.25);
  ctx.strokeStyle = green; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.05,h*0.85-offsetY); ctx.lineTo(w*0.95,h*0.25-offsetY);
  ctx.strokeStyle = green; ctx.stroke();
  // Fill channel
  ctx.fillStyle = green+'10';
  ctx.beginPath();
  ctx.moveTo(w*0.05,h*0.85); ctx.lineTo(w*0.95,h*0.25);
  ctx.lineTo(w*0.95,h*0.25-offsetY); ctx.lineTo(w*0.05,h*0.85-offsetY);
  ctx.closePath(); ctx.fill();
  // Price bouncing inside
  const pts = [[w*0.1,h*0.8],[w*0.22,h*0.56],[w*0.32,h*0.72],[w*0.45,h*0.42],[w*0.55,h*0.58],[w*0.68,h*0.32],[w*0.78,h*0.48],[w*0.88,h*0.22]];
  ctx.beginPath(); pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Ascending channel — parallel trendlines', w*0.5, h-6);
},

/* ─────────── 24 Gaps ─────────── */
gaps(canvas) {
  const s = setupCanvas('gapsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const accent3 = getColor('--accent3') || '#2955a0';
  const types = [
    { name:'Common', x:w*0.12, color:muted },
    { name:'Breakaway', x:w*0.35, color:green },
    { name:'Runaway', x:w*0.58, color:accent3 },
    { name:'Exhaustion', x:w*0.82, color:getColor('--accent')||'#c84b2f' },
  ];
  types.forEach(({name, x, color}) => {
    // Two candle bodies with gap between
    ctx.fillStyle = color+'60';
    ctx.fillRect(x-8, h*0.55, 16, 30); // lower candle
    ctx.fillRect(x-8, h*0.15, 16, 25); // upper candle (gapped up)
    // Gap zone
    ctx.fillStyle = color+'15';
    ctx.fillRect(x-15, h*0.4, 30, 15);
    ctx.strokeStyle = color; ctx.lineWidth = 1;
    ctx.setLineDash([2,2]);
    ctx.strokeRect(x-15, h*0.4, 30, 15);
    ctx.setLineDash([]);
    // Label
    ctx.fillStyle = fg; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(name, x, h-10);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Four gap types — context determines meaning', w*0.5, h*0.08);
},

/* ─────────── 25 Cup & Handle ─────────── */
'cup-and-handle'(canvas) {
  const s = setupCanvas('cupAndHandleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Cup (U-shape)
  ctx.beginPath();
  ctx.moveTo(w*0.05, h*0.2);
  ctx.bezierCurveTo(w*0.12, h*0.5, w*0.2, h*0.82, w*0.4, h*0.82);
  ctx.bezierCurveTo(w*0.6, h*0.82, w*0.68, h*0.5, w*0.72, h*0.22);
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Handle (small dip)
  ctx.beginPath();
  ctx.moveTo(w*0.72, h*0.22);
  ctx.bezierCurveTo(w*0.76, h*0.35, w*0.8, h*0.38, w*0.83, h*0.28);
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // Breakout
  ctx.beginPath(); ctx.moveTo(w*0.83, h*0.28); ctx.lineTo(w*0.95, h*0.05);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  // Neckline
  ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(w*0.02,h*0.2); ctx.lineTo(w*0.88,h*0.2);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // Cup depth arrow
  ctx.beginPath(); ctx.moveTo(w*0.4,h*0.2); ctx.lineTo(w*0.4,h*0.82);
  ctx.strokeStyle = green+'60'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Cup', w*0.35, h*0.55);
  ctx.fillText('Handle', w*0.78, h*0.45);
  ctx.fillStyle = green; ctx.fillText('Breakout ↑', w*0.92, h*0.1);
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif';
  ctx.fillText('Target = breakout + cup depth', w*0.5, h-6);
},
};
