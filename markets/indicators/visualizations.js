/* ═══════════════════════════════════════════════════════════════
   Technical Indicators — Interactive Visualizations
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

/* helper: draw a price‑like zigzag line */
function drawPrice(ctx, pts, color, width) {
  ctx.beginPath();
  pts.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  ctx.strokeStyle = color; ctx.lineWidth = width || 1.5; ctx.stroke();
}

const DRAWS = {
/* ─────────── 01 SMA ─────────── */
sma(canvas) {
  const s = setupCanvas('smaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // Noisy price
  const price = [];
  for (let i = 0; i < 30; i++) price.push([w*0.05+i*(w*0.9/29), h*0.5+Math.sin(i*0.4)*h*0.22+(Math.random()-0.5)*h*0.12]);
  drawPrice(ctx, price, fg+'70', 1);
  // SMA‑5 (fast)
  const sma5 = []; for (let i = 4; i < 30; i++) { let sum = 0; for (let j = i - 4; j <= i; j++) sum += price[j][1]; sma5.push([price[i][0], sum / 5]); }
  drawPrice(ctx, sma5, green, 2);
  // SMA‑12 (slow)
  const sma12 = []; for (let i = 11; i < 30; i++) { let sum = 0; for (let j = i - 11; j <= i; j++) sum += price[j][1]; sma12.push([price[i][0], sum / 12]); }
  drawPrice(ctx, sma12, accent, 2);
  ctx.fillStyle = green; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('SMA-5 (fast)', w*0.72, h*0.1);
  ctx.fillStyle = accent; ctx.fillText('SMA-12 (slow)', w*0.72, h*0.2);
  ctx.fillStyle = muted; ctx.fillText('Price', w*0.72, h*0.3);
},

/* ─────────── 02 EMA ─────────── */
ema(canvas) {
  const s = setupCanvas('emaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const price = [];
  for (let i = 0; i < 30; i++) price.push([w*0.05+i*(w*0.9/29), h*0.5+Math.sin(i*0.35)*h*0.25+(Math.random()-0.5)*h*0.08]);
  drawPrice(ctx, price, fg+'60', 1);
  // EMA
  const k = 2 / (10 + 1);
  let ema = price[0][1];
  const emaLine = [[price[0][0], ema]];
  for (let i = 1; i < 30; i++) { ema = (price[i][1] - ema) * k + ema; emaLine.push([price[i][0], ema]); }
  drawPrice(ctx, emaLine, green, 2);
  // SMA for comparison
  const sma10 = []; for (let i = 9; i < 30; i++) { let s2 = 0; for (let j = i - 9; j <= i; j++) s2 += price[j][1]; sma10.push([price[i][0], s2 / 10]); }
  drawPrice(ctx, sma10, accent, 2);
  ctx.fillStyle = green; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('EMA-10 (more responsive)', w*0.05, h*0.08);
  ctx.fillStyle = accent; ctx.fillText('SMA-10 (laggier)', w*0.05, h*0.18);
},

/* ─────────── 03 WMA ─────────── */
wma(canvas) {
  const s = setupCanvas('wmaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const muted = getColor('--muted') || '#666';
  // Weight bars diagram
  const n = 10;
  const barW = (w * 0.7) / n;
  for (let i = 0; i < n; i++) {
    const wt = i + 1;
    const bh = (wt / n) * h * 0.6;
    const x = w * 0.15 + i * barW;
    ctx.fillStyle = green + Math.round(30 + 70 * wt / n).toString(16).padStart(2, '0');
    ctx.fillRect(x, h * 0.8 - bh, barW - 4, bh);
    ctx.fillStyle = fg; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(wt.toString(), x + barW / 2 - 2, h * 0.88);
  }
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Weight assigned to each period (most recent → heaviest)', w * 0.5, 14);
  ctx.fillText('Denominator = N(N+1)/2 = ' + (n * (n + 1) / 2), w * 0.5, h - 4);
},

/* ─────────── 04 DEMA ─────────── */
dema(canvas) {
  const s = setupCanvas('demaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const accent = getColor('--accent3') || '#2955a0';
  const red = getColor('--accent') || '#c84b2f';
  const muted = getColor('--muted') || '#666';
  // Conceptual diagram: EMA → EMA(EMA) → 2·EMA − EMA(EMA)
  const bw = 90, bh = 36, gap = 30;
  const y1 = h * 0.25, y2 = h * 0.55;
  // EMA box
  ctx.fillStyle = accent + '30'; ctx.fillRect(w*0.1, y1, bw, bh);
  ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.strokeRect(w*0.1, y1, bw, bh);
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('EMA(N)', w*0.1 + bw/2, y1 + bh/2 + 4);
  // EMA(EMA) box
  const x2 = w * 0.1 + bw + gap;
  ctx.fillStyle = red + '30'; ctx.fillRect(x2, y1, bw, bh);
  ctx.strokeStyle = red; ctx.strokeRect(x2, y1, bw, bh);
  ctx.fillStyle = fg; ctx.fillText('EMA(EMA)', x2 + bw/2, y1 + bh/2 + 4);
  // Arrow
  ctx.beginPath(); ctx.moveTo(w*0.1+bw, y1+bh/2); ctx.lineTo(x2, y1+bh/2);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke();
  // DEMA box
  const x3 = (w*0.1 + x2 + bw) / 2 - bw/2;
  ctx.fillStyle = green + '30'; ctx.fillRect(x3, y2, bw*1.6, bh);
  ctx.strokeStyle = green; ctx.strokeRect(x3, y2, bw*1.6, bh);
  ctx.fillStyle = fg; ctx.fillText('DEMA = 2·EMA − EMA(EMA)', x3 + bw*0.8, y2 + bh/2 + 4);
  // Arrows down
  ctx.beginPath(); ctx.moveTo(w*0.1+bw/2, y1+bh); ctx.lineTo(x3+bw*0.4, y2);
  ctx.strokeStyle = muted; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2+bw/2, y1+bh); ctx.lineTo(x3+bw*1.2, y2);
  ctx.stroke();
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Lag removed by subtracting double-smoothed signal', w*0.5, h - 8);
},

/* ─────────── 05 VWAP ─────────── */
vwap(canvas) {
  const s = setupCanvas('vwapCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // VWAP line (horizontal-ish)
  const vy = h * 0.48;
  ctx.setLineDash([5, 3]);
  ctx.beginPath(); ctx.moveTo(w*0.05, vy); ctx.lineTo(w*0.95, vy);
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.setLineDash([]);
  // Price above and below
  const price = [];
  for (let i = 0; i < 30; i++) price.push([w*0.05+i*(w*0.9/29), vy + Math.sin(i*0.5)*h*0.25 + Math.cos(i*0.3)*h*0.08]);
  drawPrice(ctx, price, fg, 1.5);
  // Color fills
  for (let i = 1; i < price.length; i++) {
    const [x0,y0] = price[i-1], [x1,y1] = price[i];
    const mid = (y0+y1)/2;
    ctx.fillStyle = mid < vy ? green+'15' : red+'15';
    ctx.fillRect(x0, Math.min(mid,vy), x1-x0, Math.abs(mid-vy));
  }
  ctx.fillStyle = accent; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('VWAP', w*0.97, vy - 5);
  ctx.fillStyle = green; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Above VWAP → buyer control', w*0.3, h*0.1);
  ctx.fillStyle = red; ctx.fillText('Below VWAP → seller control', w*0.7, h*0.92);
},

/* ─────────── 06 RSI ─────────── */
rsi(canvas) {
  const s = setupCanvas('rsiCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // Overbought zone
  const ob = h * 0.2, os = h * 0.8;
  ctx.fillStyle = red + '12'; ctx.fillRect(0, 0, w, ob);
  ctx.fillStyle = green + '12'; ctx.fillRect(0, os, w, h - os);
  ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0, ob); ctx.lineTo(w, ob);
  ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, os); ctx.lineTo(w, os);
  ctx.strokeStyle = green; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, h*0.5); ctx.lineTo(w, h*0.5);
  ctx.strokeStyle = muted; ctx.stroke();
  ctx.setLineDash([]);
  // RSI line
  const rsi = [];
  let v = 50;
  for (let i = 0; i < 30; i++) { v += (Math.random()-0.48)*12; v = Math.max(10,Math.min(90,v)); rsi.push([w*0.05+i*(w*0.9/29), h*0.05 + (1-v/100)*h*0.9]); }
  drawPrice(ctx, rsi, accent, 2);
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('70 — Overbought', w - 5, ob - 4);
  ctx.fillStyle = green; ctx.fillText('30 — Oversold', w - 5, os + 14);
  ctx.fillStyle = muted; ctx.fillText('50', w - 5, h*0.5 - 4);
},

/* ─────────── 07 Stochastic ─────────── */
stochastic(canvas) {
  const s = setupCanvas('stochasticCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const ob = h*0.15, os = h*0.85;
  ctx.fillStyle = red+'12'; ctx.fillRect(0,0,w,ob);
  ctx.fillStyle = green+'12'; ctx.fillRect(0,os,w,h-os);
  ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0,ob); ctx.lineTo(w,ob); ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,os); ctx.lineTo(w,os); ctx.strokeStyle = green; ctx.stroke();
  ctx.setLineDash([]);
  // %K line (fast)
  const kLine = []; let kv = 50;
  for (let i = 0; i < 30; i++) { kv += (Math.random()-0.48)*14; kv = Math.max(5,Math.min(95,kv)); kLine.push([w*0.05+i*(w*0.9/29), h*0.05+(1-kv/100)*h*0.9]); }
  drawPrice(ctx, kLine, accent, 2);
  // %D line (smoothed)
  const dLine = [];
  for (let i = 2; i < kLine.length; i++) { const avg = (kLine[i-2][1]+kLine[i-1][1]+kLine[i][1])/3; dLine.push([kLine[i][0], avg]); }
  drawPrice(ctx, dLine, red, 1.5);
  ctx.fillStyle = accent; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('%K (fast)', 8, h*0.08);
  ctx.fillStyle = red; ctx.fillText('%D (signal)', 8, h*0.18);
  ctx.fillStyle = muted; ctx.textAlign = 'right';
  ctx.fillText('80', w-5, ob+12); ctx.fillText('20', w-5, os-4);
},

/* ─────────── 08 CCI ─────────── */
cci(canvas) {
  const s = setupCanvas('cciCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const red = getColor('--accent') || '#c84b2f';
  const green = getColor('--accent2') || '#2a7d5f';
  const muted = getColor('--muted') || '#666';
  const zero = h*0.5, p100 = h*0.25, n100 = h*0.75;
  ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0,p100); ctx.lineTo(w,p100); ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,n100); ctx.lineTo(w,n100); ctx.strokeStyle = green; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,zero); ctx.lineTo(w,zero); ctx.strokeStyle = muted; ctx.stroke();
  ctx.setLineDash([]);
  const line = []; let cv = 0;
  for (let i = 0; i < 30; i++) { cv += (Math.random()-0.48)*40; cv = Math.max(-200,Math.min(200,cv)); line.push([w*0.05+i*(w*0.9/29), zero - (cv/200)*h*0.45]); }
  drawPrice(ctx, line, accent, 2);
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('+100', w-5, p100-4);
  ctx.fillStyle = green; ctx.fillText('-100', w-5, n100+12);
  ctx.fillStyle = muted; ctx.fillText('0', w-5, zero-4);
},

/* ─────────── 09 Williams %R ─────────── */
'williams-r'(canvas) {
  const s = setupCanvas('williamsRCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const red = getColor('--accent') || '#c84b2f';
  const green = getColor('--accent2') || '#2a7d5f';
  const muted = getColor('--muted') || '#666';
  // Scale: 0 at top, -100 at bottom
  const ob = h*0.15, os = h*0.85;
  ctx.fillStyle = red+'12'; ctx.fillRect(0,0,w,ob);
  ctx.fillStyle = green+'12'; ctx.fillRect(0,os,w,h-os);
  ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0,ob); ctx.lineTo(w,ob); ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,os); ctx.lineTo(w,os); ctx.strokeStyle = green; ctx.stroke();
  ctx.setLineDash([]);
  const line = []; let rv = -50;
  for (let i = 0; i < 30; i++) { rv += (Math.random()-0.48)*14; rv = Math.max(-98,Math.min(-2,rv)); line.push([w*0.05+i*(w*0.9/29), h*0.05+(-rv/100)*h*0.9]); }
  drawPrice(ctx, line, accent, 2);
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('-20 (overbought)', w-5, ob-4);
  ctx.fillStyle = green; ctx.fillText('-80 (oversold)', w-5, os+12);
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('Scale inverted: 0 at top, -100 at bottom', w*0.5, h-4);
},

/* ─────────── 10 ROC ─────────── */
roc(canvas) {
  const s = setupCanvas('rocCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const zero = h*0.5;
  ctx.setLineDash([4,3]); ctx.beginPath(); ctx.moveTo(0,zero); ctx.lineTo(w,zero);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // ROC bars
  const n = 25;
  const bw = (w*0.85)/n;
  let rv = 0;
  for (let i = 0; i < n; i++) {
    rv += (Math.random()-0.47)*4; rv = Math.max(-15,Math.min(15,rv));
    const bh = (rv/15)*h*0.4;
    const x = w*0.08+i*bw;
    ctx.fillStyle = rv >= 0 ? green+'80' : red+'80';
    ctx.fillRect(x, zero, bw-2, -bh);
  }
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Zero line — positive above, negative below', w*0.5, h-6);
  ctx.fillStyle = green; ctx.textAlign = 'left'; ctx.fillText('Upward momentum', 5, 14);
  ctx.fillStyle = red; ctx.fillText('Downward momentum', 5, h-18);
},

/* ─────────── 11 MACD ─────────── */
macd(canvas) {
  const s = setupCanvas('macdCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const zero = h*0.55;
  ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(0,zero); ctx.lineTo(w,zero);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // MACD and signal lines
  const macdLine = [], sigLine = [];
  let mv = 0;
  for (let i = 0; i < 30; i++) {
    mv += (Math.random()-0.46)*3; mv = Math.max(-10,Math.min(10,mv));
    macdLine.push([w*0.05+i*(w*0.9/29), zero-(mv/10)*h*0.35]);
  }
  // Signal (smoothed)
  for (let i = 0; i < macdLine.length; i++) {
    if (i < 3) { sigLine.push([macdLine[i][0], macdLine[i][1]]); continue; }
    const avg = (macdLine[i-2][1]+macdLine[i-1][1]+macdLine[i][1])/3;
    sigLine.push([macdLine[i][0], avg]);
  }
  // Histogram
  for (let i = 0; i < macdLine.length; i++) {
    const diff = sigLine[i][1] - macdLine[i][1];
    ctx.fillStyle = diff > 0 ? green+'60' : red+'60';
    ctx.fillRect(macdLine[i][0]-3, zero, 6, -(zero - macdLine[i][1]) + (zero - sigLine[i][1]));
  }
  drawPrice(ctx, macdLine, accent, 2);
  drawPrice(ctx, sigLine, red, 1.5);
  ctx.fillStyle = accent; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('MACD Line', 5, 12);
  ctx.fillStyle = red; ctx.fillText('Signal Line', 5, 24);
  ctx.fillStyle = muted; ctx.fillText('Histogram', 5, 36);
},

/* ─────────── 12 ADX ─────────── */
adx(canvas) {
  const s = setupCanvas('adxCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // 25 threshold
  const t25 = h * 0.6;
  ctx.setLineDash([4,3]); ctx.beginPath(); ctx.moveTo(0,t25); ctx.lineTo(w,t25);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('25 (trend threshold)', w-5, t25-3);
  // ADX line
  const adxLine = []; let av = 20;
  for (let i = 0; i < 30; i++) { av += (Math.random()-0.45)*5; av = Math.max(8,Math.min(70,av)); adxLine.push([w*0.05+i*(w*0.9/29), h*0.9-(av/80)*h*0.8]); }
  drawPrice(ctx, adxLine, fg, 2.5);
  // +DI
  const diPlus = []; let dp = 30;
  for (let i = 0; i < 30; i++) { dp += (Math.random()-0.48)*6; dp = Math.max(5,Math.min(60,dp)); diPlus.push([w*0.05+i*(w*0.9/29), h*0.9-(dp/80)*h*0.8]); }
  drawPrice(ctx, diPlus, green, 1.5);
  // -DI
  const diMinus = []; let dm = 25;
  for (let i = 0; i < 30; i++) { dm += (Math.random()-0.52)*6; dm = Math.max(5,Math.min(60,dm)); diMinus.push([w*0.05+i*(w*0.9/29), h*0.9-(dm/80)*h*0.8]); }
  drawPrice(ctx, diMinus, red, 1.5);
  ctx.fillStyle = fg; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('ADX (strength)', 5, 12);
  ctx.fillStyle = green; ctx.fillText('+DI (bullish)', 5, 24);
  ctx.fillStyle = red; ctx.fillText('−DI (bearish)', 5, 36);
},

/* ─────────── 13 Parabolic SAR ─────────── */
'parabolic-sar'(canvas) {
  const s = setupCanvas('parabolicSarCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const muted = getColor('--muted') || '#666';
  // Price line going up then down
  const pts = [];
  for (let i = 0; i < 30; i++) {
    const base = i < 15 ? h*0.7 - i*(h*0.35/15) : h*0.35 + (i-15)*(h*0.35/15);
    pts.push([w*0.05+i*(w*0.9/29), base + (Math.random()-0.5)*h*0.04]);
  }
  drawPrice(ctx, pts, fg, 1.5);
  // SAR dots — below in uptrend, above in downtrend
  for (let i = 0; i < 30; i++) {
    const isUp = i < 16;
    const dotY = isUp ? pts[i][1] + 12 + i*0.8 : pts[i][1] - 12 - (i-16)*0.8;
    ctx.beginPath(); ctx.arc(pts[i][0], dotY, 3, 0, Math.PI*2);
    ctx.fillStyle = isUp ? green : red; ctx.fill();
  }
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Dots below = uptrend', w*0.25, h*0.12);
  ctx.fillText('Dots above = downtrend', w*0.75, h*0.12);
  ctx.fillText('Flip when price touches dot', w*0.5, h-6);
},

/* ─────────── 14 Ichimoku Cloud ─────────── */
ichimoku(canvas) {
  const s = setupCanvas('ichimokuCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // Simplified cloud
  const n = 30;
  const spanA = [], spanB = [];
  for (let i = 0; i < n; i++) {
    const x = w*0.05+i*(w*0.9/(n-1));
    spanA.push([x, h*0.35 + Math.sin(i*0.3)*h*0.08]);
    spanB.push([x, h*0.55 + Math.sin(i*0.25+1)*h*0.06]);
  }
  // Cloud fill
  for (let i = 1; i < n; i++) {
    const above = spanA[i][1] < spanB[i][1];
    ctx.fillStyle = above ? green+'18' : red+'18';
    ctx.beginPath();
    ctx.moveTo(spanA[i-1][0], spanA[i-1][1]);
    ctx.lineTo(spanA[i][0], spanA[i][1]);
    ctx.lineTo(spanB[i][0], spanB[i][1]);
    ctx.lineTo(spanB[i-1][0], spanB[i-1][1]);
    ctx.closePath(); ctx.fill();
  }
  drawPrice(ctx, spanA, green, 1);
  drawPrice(ctx, spanB, red, 1);
  // Price line crossing through cloud
  const price = [];
  for (let i = 0; i < n; i++) {
    const x = w*0.05+i*(w*0.9/(n-1));
    price.push([x, h*0.2 + i*(h*0.55/n) + Math.sin(i*0.5)*h*0.08]);
  }
  drawPrice(ctx, price, fg, 2);
  ctx.fillStyle = green; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Senkou A', 5, h*0.25);
  ctx.fillStyle = red; ctx.fillText('Senkou B', 5, h*0.68);
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('Price above cloud → bullish · Below → bearish', w*0.5, h-5);
},

/* ─────────── 15 Aroon ─────────── */
aroon(canvas) {
  const s = setupCanvas('aroonCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const muted = getColor('--muted') || '#666';
  // 70/30 thresholds
  const t70 = h*0.25, t30 = h*0.75;
  ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(0,t70); ctx.lineTo(w,t70); ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,t30); ctx.lineTo(w,t30); ctx.stroke();
  ctx.setLineDash([]);
  // Aroon Up
  const up = []; let uv = 60;
  for (let i = 0; i < 30; i++) { uv += (Math.random()-0.45)*12; uv = Math.max(0,Math.min(100,uv)); up.push([w*0.05+i*(w*0.9/29), h*0.05+(1-uv/100)*h*0.9]); }
  drawPrice(ctx, up, green, 2);
  // Aroon Down
  const dn = []; let dv = 40;
  for (let i = 0; i < 30; i++) { dv += (Math.random()-0.55)*12; dv = Math.max(0,Math.min(100,dv)); dn.push([w*0.05+i*(w*0.9/29), h*0.05+(1-dv/100)*h*0.9]); }
  drawPrice(ctx, dn, red, 2);
  ctx.fillStyle = green; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Aroon Up', 5, 12);
  ctx.fillStyle = red; ctx.fillText('Aroon Down', 5, 24);
  ctx.fillStyle = muted; ctx.textAlign = 'right';
  ctx.fillText('70', w-5, t70+12); ctx.fillText('30', w-5, t30-4);
},

/* ─────────── 16 Bollinger Bands ─────────── */
'bollinger-bands'(canvas) {
  const s = setupCanvas('bollingerBandsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const n = 30;
  // SMA center
  const sma = [];
  for (let i = 0; i < n; i++) sma.push([w*0.05+i*(w*0.9/(n-1)), h*0.5+Math.sin(i*0.25)*h*0.12]);
  // Variable bandwidth (squeeze in middle)
  const upper = [], lower = [];
  for (let i = 0; i < n; i++) {
    const band = (i > 10 && i < 20) ? h*0.06 : h*0.18;
    upper.push([sma[i][0], sma[i][1] - band]);
    lower.push([sma[i][0], sma[i][1] + band]);
  }
  // Fill band area
  ctx.beginPath();
  upper.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  for (let i = lower.length-1; i >= 0; i--) ctx.lineTo(lower[i][0], lower[i][1]);
  ctx.closePath(); ctx.fillStyle = accent+'12'; ctx.fill();
  drawPrice(ctx, upper, accent+'60', 1);
  drawPrice(ctx, lower, accent+'60', 1);
  drawPrice(ctx, sma, accent, 1.5);
  // Price
  const price = [];
  for (let i = 0; i < n; i++) price.push([sma[i][0], sma[i][1]+(Math.random()-0.5)*(upper[i][1]-sma[i][1])*1.5]);
  drawPrice(ctx, price, fg, 1.5);
  // Squeeze label
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('← Squeeze →', w*0.5, h*0.5);
  ctx.fillText('Narrow bands = low volatility = big move coming', w*0.5, h-6);
},

/* ─────────── 17 ATR ─────────── */
atr(canvas) {
  const s = setupCanvas('atrCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const green = getColor('--accent2') || '#2a7d5f';
  const muted = getColor('--muted') || '#666';
  // ATR bars showing volatility changes
  const n = 25;
  const bw = (w*0.85)/n;
  const vals = [];
  let av = 5;
  for (let i = 0; i < n; i++) {
    av += (Math.random()-0.48)*2;
    av = Math.max(1, Math.min(15, av));
    vals.push(av);
  }
  const maxV = Math.max(...vals);
  for (let i = 0; i < n; i++) {
    const bh = (vals[i]/maxV)*h*0.65;
    const x = w*0.08+i*bw;
    ctx.fillStyle = accent+'70';
    ctx.fillRect(x, h*0.85-bh, bw-3, bh);
  }
  // ATR line on top of bars
  const line = vals.map((v,i) => [w*0.08+i*bw+bw/2-1, h*0.85-(v/maxV)*h*0.65]);
  drawPrice(ctx, line, fg, 1.5);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('ATR — measures volatility magnitude, not direction', w*0.5, 14);
  ctx.fillText('Higher bars = more volatile periods', w*0.5, h-4);
},

/* ─────────── 18 Keltner Channels ─────────── */
'keltner-channels'(canvas) {
  const s = setupCanvas('keltnerChannelsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const n = 30;
  const ema = [];
  for (let i = 0; i < n; i++) ema.push([w*0.05+i*(w*0.9/(n-1)), h*0.5+Math.sin(i*0.2)*h*0.1]);
  const upper = ema.map(([x,y]) => [x, y - h*0.16]);
  const lower = ema.map(([x,y]) => [x, y + h*0.16]);
  // Fill
  ctx.beginPath();
  upper.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  for (let i = lower.length-1; i >= 0; i--) ctx.lineTo(lower[i][0], lower[i][1]);
  ctx.closePath(); ctx.fillStyle = green+'10'; ctx.fill();
  drawPrice(ctx, upper, green+'60', 1);
  drawPrice(ctx, lower, green+'60', 1);
  drawPrice(ctx, ema, green, 1.5);
  // Price
  const price = [];
  for (let i = 0; i < n; i++) price.push([ema[i][0], ema[i][1]+(Math.random()-0.5)*h*0.2]);
  drawPrice(ctx, price, fg, 1.5);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('EMA(20) ± 2×ATR(10) — smoother than Bollinger', w*0.5, h-6);
},

/* ─────────── 19 Donchian Channels ─────────── */
'donchian-channels'(canvas) {
  const s = setupCanvas('donchianChannelsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // Step-like upper and lower bounds
  const n = 30;
  const upper = [], lower = [], mid = [];
  let hi = h*0.3, lo = h*0.7;
  for (let i = 0; i < n; i++) {
    if (i % 5 === 0) { hi = h*0.2+Math.random()*h*0.15; lo = h*0.65+Math.random()*h*0.15; }
    const x = w*0.05+i*(w*0.9/(n-1));
    upper.push([x, hi]); lower.push([x, lo]); mid.push([x, (hi+lo)/2]);
  }
  ctx.beginPath();
  upper.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  for (let i = lower.length-1; i >= 0; i--) ctx.lineTo(lower[i][0], lower[i][1]);
  ctx.closePath(); ctx.fillStyle = accent+'10'; ctx.fill();
  drawPrice(ctx, upper, accent, 1.5);
  drawPrice(ctx, lower, accent, 1.5);
  ctx.setLineDash([3,3]); drawPrice(ctx, mid, muted, 1); ctx.setLineDash([]);
  // Price
  const price = [];
  for (let i = 0; i < n; i++) price.push([upper[i][0], (upper[i][1]+lower[i][1])/2+(Math.random()-0.5)*(lower[i][1]-upper[i][1])*0.8]);
  drawPrice(ctx, price, fg, 1.5);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Highest high / Lowest low — Turtle Traders\' breakout system', w*0.5, h-6);
},

/* ─────────── 20 Standard Deviation ─────────── */
'standard-deviation'(canvas) {
  const s = setupCanvas('standardDeviationCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  // Bell curve
  const cx = w*0.5, cy = h*0.85;
  ctx.beginPath();
  for (let x = -3; x <= 3; x += 0.05) {
    const px = cx + (x/3)*w*0.4;
    const py = cy - Math.exp(-x*x/2)*h*0.65;
    x === -3 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  // σ zones
  const zones = [
    { s:-1, e:1, label:'68%', color:accent+'25' },
    { s:-2, e:2, label:'95%', color:accent+'12' },
  ];
  zones.forEach(({ s: s2, e, label, color }) => {
    ctx.beginPath();
    for (let x = s2; x <= e; x += 0.05) {
      const px = cx + (x/3)*w*0.4;
      const py = cy - Math.exp(-x*x/2)*h*0.65;
      x === s2 ? ctx.moveTo(px, cy) : void 0; ctx.lineTo(px, py);
    }
    ctx.lineTo(cx+(e/3)*w*0.4, cy);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  });
  // Labels
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('−2σ', cx-w*0.27, cy+12); ctx.fillText('−1σ', cx-w*0.13, cy+12);
  ctx.fillText('μ', cx, cy+12);
  ctx.fillText('+1σ', cx+w*0.13, cy+12); ctx.fillText('+2σ', cx+w*0.27, cy+12);
  ctx.fillStyle = accent; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('68%', cx, cy-h*0.15);
  ctx.fillText('95%', cx, cy-h*0.35);
},

/* ─────────── 21 OBV ─────────── */
obv(canvas) {
  const s = setupCanvas('obvCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const muted = getColor('--muted') || '#666';
  // Price (top half)
  const ph = h*0.4;
  const price = [];
  for (let i = 0; i < 30; i++) price.push([w*0.05+i*(w*0.9/29), ph*0.5+Math.sin(i*0.3)*ph*0.3]);
  drawPrice(ctx, price, fg, 1.5);
  ctx.setLineDash([2,2]); ctx.beginPath(); ctx.moveTo(0,ph); ctx.lineTo(w,ph);
  ctx.strokeStyle = muted; ctx.lineWidth = 0.5; ctx.stroke(); ctx.setLineDash([]);
  // OBV (bottom half) — rising
  const obvLine = []; let ov = 0;
  for (let i = 0; i < 30; i++) {
    ov += (Math.random()-0.4)*5;
    const y = h*0.7 - (ov/30)*h*0.2;
    obvLine.push([w*0.05+i*(w*0.9/29), y]);
  }
  drawPrice(ctx, obvLine, green, 2);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Price', 5, 12);
  ctx.fillStyle = green; ctx.fillText('OBV rising = accumulation', 5, ph+16);
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('Volume precedes price — OBV slope reveals pressure', w*0.5, h-4);
},

/* ─────────── 22 Accumulation/Distribution ─────────── */
'accumulation-distribution'(canvas) {
  const s = setupCanvas('accumulationDistributionCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const muted = getColor('--muted') || '#666';
  // CLV diagram for a candle
  const cx = w*0.25, cw = 30, cy = h*0.2, ch = h*0.6;
  // Candle bar
  ctx.strokeStyle = fg; ctx.lineWidth = 1;
  ctx.strokeRect(cx-cw/2, cy, cw, ch);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('High', cx+cw/2+5, cy+8);
  ctx.fillText('Low', cx+cw/2+5, cy+ch-2);
  // Close marker at 75%
  const closeY = cy + ch*0.25;
  ctx.beginPath(); ctx.moveTo(cx-cw/2, closeY); ctx.lineTo(cx+cw/2, closeY);
  ctx.strokeStyle = green; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = green; ctx.fillText('Close', cx+cw/2+5, closeY+4);
  // CLV shading
  ctx.fillStyle = green+'20'; ctx.fillRect(cx-cw/2, closeY, cw, cy+ch-closeY);
  // Formula
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'left';
  const fx = w*0.55;
  ctx.fillText('CLV = ((C−L) − (H−C)) / (H−L)', fx, h*0.3);
  ctx.fillText('A/D = Σ(CLV × Volume)', fx, h*0.45);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Close near High → CLV ≈ +1', fx, h*0.62);
  ctx.fillText('Close near Low → CLV ≈ −1', fx, h*0.74);
  ctx.fillText('Weights volume by close position', fx, h*0.9);
},

/* ─────────── 23 MFI ─────────── */
mfi(canvas) {
  const s = setupCanvas('mfiCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const ob = h*0.15, os = h*0.85;
  ctx.fillStyle = red+'12'; ctx.fillRect(0,0,w,ob);
  ctx.fillStyle = green+'12'; ctx.fillRect(0,os,w,h-os);
  ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0,ob); ctx.lineTo(w,ob); ctx.strokeStyle = red; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,os); ctx.lineTo(w,os); ctx.strokeStyle = green; ctx.stroke();
  ctx.setLineDash([]);
  const line = []; let mv = 50;
  for (let i = 0; i < 30; i++) { mv += (Math.random()-0.48)*10; mv = Math.max(5,Math.min(95,mv)); line.push([w*0.05+i*(w*0.9/29), h*0.05+(1-mv/100)*h*0.9]); }
  drawPrice(ctx, line, accent, 2);
  ctx.fillStyle = red; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'right';
  ctx.fillText('80 — Overbought', w-5, ob-4);
  ctx.fillStyle = green; ctx.fillText('20 — Oversold', w-5, os+14);
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('MFI = "volume-weighted RSI"', w*0.5, h-4);
},

/* ─────────── 24 Chaikin Oscillator ─────────── */
'chaikin-oscillator'(canvas) {
  const s = setupCanvas('chaikinOscillatorCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const green = getColor('--accent2') || '#2a7d5f';
  const red = getColor('--accent') || '#c84b2f';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const zero = h*0.5;
  ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(0,zero); ctx.lineTo(w,zero);
  ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
  // Oscillator line
  const line = []; let cv = 0;
  for (let i = 0; i < 30; i++) { cv += (Math.random()-0.47)*4; cv = Math.max(-12,Math.min(12,cv)); line.push([w*0.05+i*(w*0.9/29), zero-(cv/12)*h*0.38]); }
  // Fill above/below zero
  ctx.beginPath();
  line.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  ctx.lineTo(line[line.length-1][0], zero); ctx.lineTo(line[0][0], zero); ctx.closePath();
  ctx.fillStyle = green+'15'; ctx.fill();
  drawPrice(ctx, line, accent, 2);
  // Zero-cross markers
  for (let i = 1; i < line.length; i++) {
    if ((line[i-1][1]-zero) * (line[i][1]-zero) < 0) {
      ctx.beginPath(); ctx.arc(line[i][0], zero, 4, 0, Math.PI*2);
      ctx.fillStyle = (line[i][1] < zero) ? green : red; ctx.fill();
    }
  }
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('EMA(3) of A/D − EMA(10) of A/D — zero crossovers = signals', w*0.5, h-5);
},

/* ─────────── 25 VWAP Bands ─────────── */
'vwap-bands'(canvas) {
  const s = setupCanvas('vwapBandsCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const fg = getColor('--fg') || '#c9c9c9';
  const accent = getColor('--accent3') || '#2955a0';
  const muted = getColor('--muted') || '#666';
  const n = 30;
  const vwap = [];
  for (let i = 0; i < n; i++) vwap.push([w*0.05+i*(w*0.9/(n-1)), h*0.5+Math.sin(i*0.15)*h*0.05]);
  // 3 band levels
  const bands = [h*0.08, h*0.16, h*0.24];
  const labels = ['±1σ (68%)', '±2σ (95%)', '±3σ (99.7%)'];
  bands.forEach((b, idx) => {
    const upper2 = vwap.map(([x,y]) => [x, y-b]);
    const lower2 = vwap.map(([x,y]) => [x, y+b]);
    ctx.beginPath();
    upper2.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    for (let i = lower2.length-1; i >= 0; i--) ctx.lineTo(lower2[i][0], lower2[i][1]);
    ctx.closePath();
    ctx.fillStyle = accent + (6 - idx*2).toString(16) + '0';
    ctx.fill();
  });
  drawPrice(ctx, vwap, accent, 2);
  // Price
  const price = [];
  for (let i = 0; i < n; i++) price.push([vwap[i][0], vwap[i][1]+(Math.random()-0.5)*h*0.25]);
  drawPrice(ctx, price, fg, 1.5);
  ctx.fillStyle = muted; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'right';
  labels.forEach((l, i) => ctx.fillText(l, w-5, 14+i*13));
  ctx.textAlign = 'center';
  ctx.fillText('VWAP ± σ bands — dynamic intraday S/R', w*0.5, h-4);
},
};
