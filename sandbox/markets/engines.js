/* ═══════════════════════════════════════════════════════════════
   Markets Lab — Interactive Engines
   Canvas-based market sandbox activities
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

const GREEN = '#81c784';
const RED = '#e57373';
const BLUE = '#4fc3f7';
const COLORS = ['#4fc3f7', '#81c784', '#e57373', '#ffb74d', '#ce93d8', '#4dd0e1'];
const MUTED = () => css('--muted') || '#666';
const BORDER = () => css('--border') || '#222';
const BG = () => css('--bg') || '#fff';
const SURFACE = () => css('--surface') || '#f5f5f5';
const TEXT = () => css('--text') || '#1a1a1a';
const MONO = () => css('--mono') || 'IBM Plex Mono, monospace';


/* ═══════════════════════════════════════════════════════════════
   PRICE DATA GENERATOR
   ═══════════════════════════════════════════════════════════════ */

function generateOHLC(count) {
  const data = [];
  let price = 50 + Math.random() * 50;
  const drift = (Math.random() - 0.5) * 0.3;

  for (let i = 0; i < count; i++) {
    const vol = 0.5 + Math.random() * 2;
    const open = price;
    const close = open + gauss() * vol + drift;
    const high = Math.max(open, close) + Math.abs(gauss() * vol * 0.5);
    const low = Math.min(open, close) - Math.abs(gauss() * vol * 0.5);
    data.push({
      o: Math.max(1, open),
      h: Math.max(1, high),
      l: Math.max(0.5, low),
      c: Math.max(1, close),
    });
    price = close;
  }
  return data;
}


/* ═══════════════════════════════════════════════════════════════
   INDICATOR CALCULATIONS
   ═══════════════════════════════════════════════════════════════ */

function calcSMA(data, period) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(null); continue; }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += data[j].c;
    result.push(sum / period);
  }
  return result;
}

function calcEMA(data, period) {
  const result = [];
  const k = 2 / (period + 1);
  let ema = null;
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(null); continue; }
    if (ema === null) {
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) sum += data[j].c;
      ema = sum / period;
    } else {
      ema = data[i].c * k + ema * (1 - k);
    }
    result.push(ema);
  }
  return result;
}

function calcRSI(data, period) {
  const result = [];
  let avgGain = 0, avgLoss = 0;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) { result.push(null); continue; }
    const change = data[i].c - data[i - 1].c;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? -change : 0;
    if (i <= period) {
      avgGain += gain;
      avgLoss += loss;
      if (i === period) {
        avgGain /= period;
        avgLoss /= period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        result.push(100 - 100 / (1 + rs));
      } else {
        result.push(null);
      }
    } else {
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      result.push(100 - 100 / (1 + rs));
    }
  }
  return result;
}

function calcBollinger(data, period, mult) {
  const sma = calcSMA(data, period);
  const upper = [], lower = [];
  for (let i = 0; i < data.length; i++) {
    if (sma[i] === null) { upper.push(null); lower.push(null); continue; }
    let sumSq = 0;
    for (let j = i - period + 1; j <= i; j++) sumSq += (data[j].c - sma[i]) ** 2;
    const std = Math.sqrt(sumSq / period);
    upper.push(sma[i] + mult * std);
    lower.push(sma[i] - mult * std);
  }
  return { mid: sma, upper, lower };
}

function calcMACD(data) {
  const ema12 = calcEMA(data, 12);
  const ema26 = calcEMA(data, 26);
  const macdLine = [];
  for (let i = 0; i < data.length; i++) {
    if (ema12[i] === null || ema26[i] === null) { macdLine.push(null); continue; }
    macdLine.push(ema12[i] - ema26[i]);
  }
  // Signal line = 9-period EMA of MACD
  const signal = [];
  const k = 2 / 10;
  let ema = null;
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] === null) { signal.push(null); continue; }
    if (ema === null) {
      // Use first valued entry
      ema = macdLine[i];
      signal.push(ema);
    } else {
      ema = macdLine[i] * k + ema * (1 - k);
      signal.push(ema);
    }
  }
  const histogram = [];
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] === null || signal[i] === null) { histogram.push(null); continue; }
    histogram.push(macdLine[i] - signal[i]);
  }
  return { macd: macdLine, signal, histogram };
}


/* ═══════════════════════════════════════════════════════════════
   INDICATOR PLAYGROUND
   ═══════════════════════════════════════════════════════════════ */

const IP = {
  data: [],
  indicators: { sma: false, ema: false, rsi: false, bollinger: false, macd: false },
  cache: {},
};

function ipInit() {
  IP.data = generateOHLC(60);
  IP.cache = {};
  recalcIndicators();
}

function recalcIndicators() {
  IP.cache.sma = calcSMA(IP.data, 20);
  IP.cache.ema = calcEMA(IP.data, 12);
  IP.cache.rsi = calcRSI(IP.data, 14);
  IP.cache.bollinger = calcBollinger(IP.data, 20, 2);
  IP.cache.macd = calcMACD(IP.data);
}

function drawIP() {
  const s = setupCanvas('ipCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  const data = IP.data;
  if (data.length === 0) { ipInit(); return drawIP(); }

  const padL = 55, padR = 15, padT = 20;
  const showRSI = IP.indicators.rsi;
  const showMACD = IP.indicators.macd;
  const subCount = (showRSI ? 1 : 0) + (showMACD ? 1 : 0);
  const subH = subCount > 0 ? 70 : 0;
  const mainH = h - padT - 30 - subCount * (subH + 15);
  const chartW = w - padL - padR;

  ctx.clearRect(0, 0, w, h);

  // Price range
  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  // Include Bollinger bands in range
  if (IP.indicators.bollinger) {
    IP.cache.bollinger.upper.forEach(v => { if (v !== null && v > pMax) pMax = v; });
    IP.cache.bollinger.lower.forEach(v => { if (v !== null && v < pMin) pMin = v; });
  }
  const pRange = pMax - pMin || 1;
  const pPad = pRange * 0.08;
  pMin -= pPad; pMax += pPad;

  function priceY(p) { return padT + mainH * (1 - (p - pMin) / (pMax - pMin)); }
  function candleX(i) { return padL + (i + 0.5) * (chartW / data.length); }
  const cw = Math.max(2, (chartW / data.length) * 0.6);

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const p = pMin + (pMax - pMin) * (i / gridSteps);
    const y = priceY(p);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(p.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Bollinger Bands fill
  if (IP.indicators.bollinger) {
    const boll = IP.cache.bollinger;
    ctx.fillStyle = 'rgba(206,147,216,0.08)';
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < data.length; i++) {
      if (boll.upper[i] === null) continue;
      const x = candleX(i);
      if (!started) { ctx.moveTo(x, priceY(boll.upper[i])); started = true; }
      else ctx.lineTo(x, priceY(boll.upper[i]));
    }
    for (let i = data.length - 1; i >= 0; i--) {
      if (boll.lower[i] === null) continue;
      ctx.lineTo(candleX(i), priceY(boll.lower[i]));
    }
    ctx.closePath();
    ctx.fill();

    // Bollinger lines
    drawLine(ctx, data, boll.upper, candleX, priceY, '#ce93d8', 1);
    drawLine(ctx, data, boll.mid, candleX, priceY, '#ce93d8', 1.5);
    drawLine(ctx, data, boll.lower, candleX, priceY, '#ce93d8', 1);
  }

  // Candlesticks
  data.forEach((d, i) => {
    const x = candleX(i);
    const bullish = d.c >= d.o;
    const bodyTop = priceY(Math.max(d.o, d.c));
    const bodyBot = priceY(Math.min(d.o, d.c));
    const bodyH = Math.max(1, bodyBot - bodyTop);

    // Wick
    ctx.strokeStyle = bullish ? GREEN : RED;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, priceY(d.h));
    ctx.lineTo(x, priceY(d.l));
    ctx.stroke();

    // Body
    ctx.fillStyle = bullish ? GREEN : RED;
    ctx.fillRect(x - cw / 2, bodyTop, cw, bodyH);
  });

  // SMA overlay
  if (IP.indicators.sma) {
    drawLine(ctx, data, IP.cache.sma, candleX, priceY, '#4fc3f7', 2);
  }

  // EMA overlay
  if (IP.indicators.ema) {
    drawLine(ctx, data, IP.cache.ema, candleX, priceY, '#ffb74d', 2);
  }

  // Sub-panels y offset
  let subY = padT + mainH + 20;

  // RSI panel
  if (showRSI) {
    drawSubPanel(ctx, padL, subY, chartW, subH, 'RSI 14');
    const rsi = IP.cache.rsi;

    // Overbought/oversold zones
    const rsiY = v => subY + subH * (1 - v / 100);
    ctx.fillStyle = 'rgba(229,115,115,0.06)';
    ctx.fillRect(padL, rsiY(100), chartW, rsiY(70) - rsiY(100));
    ctx.fillStyle = 'rgba(129,199,132,0.06)';
    ctx.fillRect(padL, rsiY(30), chartW, rsiY(0) - rsiY(30));

    // 30/70 lines
    ctx.strokeStyle = MUTED();
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    [30, 70].forEach(v => {
      ctx.beginPath(); ctx.moveTo(padL, rsiY(v)); ctx.lineTo(padL + chartW, rsiY(v)); ctx.stroke();
    });
    ctx.setLineDash([]);

    // RSI line
    ctx.strokeStyle = '#ce93d8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    let started = false;
    rsi.forEach((v, i) => {
      if (v === null) return;
      const x = candleX(i);
      const y = rsiY(v);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    subY += subH + 15;
  }

  // MACD panel
  if (showMACD) {
    drawSubPanel(ctx, padL, subY, chartW, subH, 'MACD');
    const macd = IP.cache.macd;
    const vals = macd.macd.filter(v => v !== null);
    const sigVals = macd.signal.filter(v => v !== null);
    const allVals = [...vals, ...sigVals];
    let mMin = Math.min(...allVals), mMax = Math.max(...allVals);
    const mPad = (mMax - mMin) * 0.1 || 0.5;
    mMin -= mPad; mMax += mPad;
    const macdY = v => subY + subH * (1 - (v - mMin) / (mMax - mMin));

    // Zero line
    ctx.strokeStyle = MUTED();
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    if (mMin <= 0 && mMax >= 0) {
      ctx.beginPath(); ctx.moveTo(padL, macdY(0)); ctx.lineTo(padL + chartW, macdY(0)); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Histogram
    macd.histogram.forEach((v, i) => {
      if (v === null) return;
      const x = candleX(i);
      const zeroY = macdY(0);
      const barY = macdY(v);
      ctx.fillStyle = v >= 0 ? 'rgba(129,199,132,0.5)' : 'rgba(229,115,115,0.5)';
      ctx.fillRect(x - cw / 2, Math.min(zeroY, barY), cw, Math.abs(barY - zeroY));
    });

    // MACD line
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    let started = false;
    macd.macd.forEach((v, i) => {
      if (v === null) return;
      const x = candleX(i), y = macdY(v);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Signal line
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 1;
    ctx.beginPath();
    started = false;
    macd.signal.forEach((v, i) => {
      if (v === null) return;
      const x = candleX(i), y = macdY(v);
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Detect trend
  const sma20 = IP.cache.sma;
  const recent = sma20.slice(-5).filter(v => v !== null);
  let trend = '—';
  if (recent.length >= 3) {
    const rising = recent.every((v, i) => i === 0 || v >= recent[i - 1]);
    const falling = recent.every((v, i) => i === 0 || v <= recent[i - 1]);
    if (rising) trend = '↗ Up';
    else if (falling) trend = '↘ Down';
    else trend = '→ Sideways';
  }
  document.getElementById('ipTrend').textContent = trend;
  document.getElementById('ipCandles').textContent = data.length;
  document.getElementById('ipActive').textContent = Object.values(IP.indicators).filter(Boolean).length;
}

function drawLine(ctx, data, values, xFn, yFn, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  let started = false;
  values.forEach((v, i) => {
    if (v === null) return;
    const x = xFn(i), y = yFn(v);
    if (!started) { ctx.moveTo(x, y); started = true; }
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function drawSubPanel(ctx, x, y, w, h, label) {
  ctx.fillStyle = SURFACE();
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText(label, x + 6, y + 12);
}

ENGINE.toggleInd = function(name) {
  IP.indicators[name] = !IP.indicators[name];
  // Update button style
  const btn = document.getElementById('btn' + name.charAt(0).toUpperCase() + name.slice(1));
  if (btn) {
    btn.classList.toggle('active', IP.indicators[name]);
    btn.style.background = IP.indicators[name] ? 'rgba(129,199,132,0.15)' : '';
    btn.style.borderColor = IP.indicators[name] ? GREEN : '';
  }
  drawIP();
  const count = Object.values(IP.indicators).filter(Boolean).length;
  checkHints('indicator-playground', {
    smaOn: IP.indicators.sma,
    emaOn: IP.indicators.ema,
    rsiOn: IP.indicators.rsi,
    bollingerOn: IP.indicators.bollinger,
    macdOn: IP.indicators.macd,
    indicatorCount: count,
  });
};

ENGINE.newChart = function() {
  ipInit();
  drawIP();
};

ENGINE.resetIP = function() {
  Object.keys(IP.indicators).forEach(k => IP.indicators[k] = false);
  document.querySelectorAll('.indicator-toggle').forEach(btn => {
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.borderColor = '';
  });
  ipInit();
  drawIP();
};


/* ═══════════════════════════════════════════════════════════════
   CANDLESTICK PATTERN SPOTTER
   ═══════════════════════════════════════════════════════════════ */

const PATTERNS = [
  {
    name: 'Doji',
    generate() {
      const base = 50 + Math.random() * 30;
      return [
        { o: base, h: base + 3 + Math.random() * 3, l: base - 3 - Math.random() * 3, c: base + (Math.random() - 0.5) * 0.5 }
      ];
    },
    description: 'Open ≈ close with long wicks — indecision signal',
  },
  {
    name: 'Hammer',
    generate() {
      const base = 50 + Math.random() * 30;
      const body = 0.5 + Math.random() * 1;
      return [
        { o: base, h: base + body + Math.random() * 0.5, l: base - body * 3 - Math.random() * 2, c: base + body }
      ];
    },
    description: 'Small body at top, long lower wick — potential reversal',
  },
  {
    name: 'Inverted Hammer',
    generate() {
      const base = 50 + Math.random() * 30;
      const body = 0.5 + Math.random() * 1;
      return [
        { o: base + body, h: base + body + body * 3 + Math.random() * 2, l: base - Math.random() * 0.5, c: base }
      ];
    },
    description: 'Small body at bottom, long upper wick — potential bullish reversal',
  },
  {
    name: 'Bullish Engulfing',
    generate() {
      const base = 50 + Math.random() * 30;
      const b1 = 1 + Math.random() * 1.5;
      const b2 = b1 + 1 + Math.random() * 1.5;
      return [
        { o: base + b1, h: base + b1 + 0.5, l: base - 0.5, c: base },
        { o: base - 0.5, h: base + b1 + b2 * 0.3, l: base - 1, c: base + b1 + 0.5 + Math.random() }
      ];
    },
    description: 'A small bearish candle followed by a larger bullish candle that engulfs it',
  },
  {
    name: 'Bearish Engulfing',
    generate() {
      const base = 50 + Math.random() * 30;
      const b1 = 1 + Math.random() * 1.5;
      const b2 = b1 + 1 + Math.random() * 1.5;
      return [
        { o: base, h: base + b1 + 0.5, l: base - 0.5, c: base + b1 },
        { o: base + b1 + 0.5 + Math.random(), h: base + b1 + 1, l: base - b2 * 0.3, c: base - 0.5 }
      ];
    },
    description: 'A small bullish candle followed by a larger bearish candle that engulfs it',
  },
  {
    name: 'Morning Star',
    generate() {
      const base = 50 + Math.random() * 30;
      const body = 2 + Math.random() * 2;
      return [
        { o: base + body, h: base + body + 0.5, l: base - 0.5, c: base },
        { o: base - 0.3, h: base + 0.2, l: base - 1 - Math.random(), c: base - 0.2 },
        { o: base + 0.2, h: base + body + 1, l: base - 0.3, c: base + body * 0.8 }
      ];
    },
    description: 'Bearish → small body → bullish — reversal after downtrend',
  },
  {
    name: 'Shooting Star',
    generate() {
      const base = 50 + Math.random() * 30;
      const body = 0.5 + Math.random() * 1;
      return [
        { o: base + body, h: base + body + body * 3 + Math.random() * 2, l: base - Math.random() * 0.3, c: base }
      ];
    },
    description: 'Small body at bottom, long upper wick after uptrend — bearish reversal',
  },
  {
    name: 'Three White Soldiers',
    generate() {
      const base = 50 + Math.random() * 30;
      const candles = [];
      let open = base;
      for (let i = 0; i < 3; i++) {
        const body = 1.5 + Math.random() * 1.5;
        candles.push({ o: open, h: open + body + Math.random() * 0.5, l: open - Math.random() * 0.5, c: open + body });
        open = open + body - Math.random() * 0.5;
      }
      return candles;
    },
    description: 'Three consecutive bullish candles with higher closes — strong uptrend',
  },
];

const CS = {
  currentPattern: null,
  patternCandles: [],
  contextCandles: [],
  score: 0,
  streak: 0,
  attempts: 0,
  wrongCount: 0,
  answered: false,
  startTime: Date.now(),
};

function csGenerateQuiz() {
  // Pick a random pattern
  const idx = Math.floor(Math.random() * PATTERNS.length);
  CS.currentPattern = PATTERNS[idx];
  CS.patternCandles = CS.currentPattern.generate();
  CS.answered = false;

  // Generate context candles before the pattern
  CS.contextCandles = generateOHLC(8);

  // Generate 4 choices (including the correct one)
  const choices = [CS.currentPattern.name];
  const otherPatterns = PATTERNS.filter(p => p.name !== CS.currentPattern.name);
  while (choices.length < 4 && otherPatterns.length > 0) {
    const ri = Math.floor(Math.random() * otherPatterns.length);
    choices.push(otherPatterns[ri].name);
    otherPatterns.splice(ri, 1);
  }
  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  // Render choice buttons
  const el = document.getElementById('csChoices');
  if (el) {
    el.innerHTML = choices.map(c =>
      `<button class="sb-btn choice-btn" onclick="ENGINE.answerCS('${c.replace(/'/g, "\\'")}')">${c}</button>`
    ).join('');
  }
}

function drawCS() {
  const s = setupCanvas('csCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  if (!CS.currentPattern) { csGenerateQuiz(); }

  const padL = 55, padR = 15, padT = 20, padB = 30;
  const allCandles = [...CS.contextCandles, ...CS.patternCandles];
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  ctx.clearRect(0, 0, w, h);

  // Price range
  let pMin = Infinity, pMax = -Infinity;
  allCandles.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  const pRange = pMax - pMin || 1;
  const pPad = pRange * 0.1;
  pMin -= pPad; pMax += pPad;

  function priceY(p) { return padT + chartH * (1 - (p - pMin) / (pMax - pMin)); }
  function candleX(i) { return padL + (i + 0.5) * (chartW / allCandles.length); }
  const cw = Math.max(4, (chartW / allCandles.length) * 0.6);

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 4; i++) {
    const p = pMin + (pMax - pMin) * (i / 4);
    const y = priceY(p);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(p.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Highlight zone for pattern candles
  const patternStart = CS.contextCandles.length;
  const x1 = candleX(patternStart) - cw;
  const x2 = candleX(allCandles.length - 1) + cw;
  ctx.fillStyle = 'rgba(129,199,132,0.06)';
  ctx.fillRect(x1, padT, x2 - x1, chartH);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 3]);
  ctx.strokeRect(x1, padT, x2 - x1, chartH);
  ctx.setLineDash([]);

  // Label
  ctx.fillStyle = GREEN;
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Identify this pattern', (x1 + x2) / 2, padT - 6);

  // Draw candles
  allCandles.forEach((d, i) => {
    const x = candleX(i);
    const bullish = d.c >= d.o;
    const bodyTop = priceY(Math.max(d.o, d.c));
    const bodyBot = priceY(Math.min(d.o, d.c));
    const bodyH = Math.max(1, bodyBot - bodyTop);
    const isPattern = i >= patternStart;

    ctx.strokeStyle = isPattern ? (bullish ? GREEN : RED) : MUTED();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, priceY(d.h));
    ctx.lineTo(x, priceY(d.l));
    ctx.stroke();

    ctx.fillStyle = isPattern ? (bullish ? GREEN : RED) : MUTED();
    ctx.globalAlpha = isPattern ? 1 : 0.4;
    ctx.fillRect(x - cw / 2, bodyTop, cw, bodyH);
    ctx.globalAlpha = 1;
  });

  // If answered, show result
  if (CS.answered) {
    ctx.fillStyle = BG();
    ctx.globalAlpha = 0.7;
    ctx.fillRect(padL, h / 2 - 30, chartW, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = TEXT();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(CS.currentPattern.name + ': ' + CS.currentPattern.description, w / 2, h / 2);
  }
}

ENGINE.answerCS = function(answer) {
  if (CS.answered) return;
  CS.answered = true;
  CS.attempts++;

  const correct = answer === CS.currentPattern.name;
  if (correct) {
    CS.score++;
    CS.streak++;
  } else {
    CS.streak = 0;
    CS.wrongCount++;
  }

  // Update UI
  document.getElementById('csScore').textContent = CS.score;
  document.getElementById('csStreak').textContent = CS.streak;
  document.getElementById('csAttempts').textContent = CS.attempts;
  document.getElementById('csAccuracy').textContent = CS.attempts > 0
    ? Math.round((CS.score / CS.attempts) * 100) + '%' : '—';

  // Highlight buttons
  document.querySelectorAll('.choice-btn').forEach(btn => {
    if (btn.textContent === CS.currentPattern.name) {
      btn.style.background = 'rgba(129,199,132,0.2)';
      btn.style.borderColor = GREEN;
    } else if (btn.textContent === answer && !correct) {
      btn.style.background = 'rgba(229,115,115,0.2)';
      btn.style.borderColor = RED;
    }
    btn.disabled = true;
  });

  drawCS();

  checkHints('candlestick-spotter', {
    attempts: CS.attempts,
    streak: CS.streak,
    wrongCount: CS.wrongCount,
    score: CS.score,
  });

  const elapsed = (Date.now() - CS.startTime) / 1000;
  checkChallenges('candlestick-spotter', {
    score: CS.score,
    streak: CS.streak,
    timeUnder60: elapsed < 60,
  });
};

ENGINE.nextPattern = function() {
  csGenerateQuiz();
  drawCS();
};

ENGINE.resetCS = function() {
  CS.score = 0;
  CS.streak = 0;
  CS.attempts = 0;
  CS.wrongCount = 0;
  CS.startTime = Date.now();
  document.getElementById('csScore').textContent = '0';
  document.getElementById('csStreak').textContent = '0';
  document.getElementById('csAttempts').textContent = '0';
  document.getElementById('csAccuracy').textContent = '—';
  csGenerateQuiz();
  drawCS();
};


/* ═══════════════════════════════════════════════════════════════
   HINTS SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const shownHints = JSON.parse(sessionStorage.getItem('sb-mkt-hints') || '{}');

function checkHints(activityId, state) {
  const activityHints = HINTS[activityId];
  if (!activityHints) return;

  activityHints.forEach(hint => {
    if (shownHints[hint.id]) return;

    let triggered = false;
    try {
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
      sessionStorage.setItem('sb-mkt-hints', JSON.stringify(shownHints));
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

  requestAnimationFrame(() => {
    hintEl.classList.remove('hint-enter');
    hintEl.classList.add('hint-visible');
  });

  setTimeout(() => {
    hintEl.classList.add('hint-exit');
    setTimeout(() => hintEl.remove(), 400);
  }, 10000);
}


/* ═══════════════════════════════════════════════════════════════
   CHALLENGES SYSTEM
   ═══════════════════════════════════════════════════════════════ */

const challengeProgress = JSON.parse(localStorage.getItem('sb-mkt-challenges') || '{}');
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
    const parts = ch.checkFn.split('&&');
    passed = parts.every(part => {
      part = part.trim();
      if (part.includes('>=')) {
        const [key, val] = part.split('>=');
        return state[key.trim()] >= parseFloat(val);
      } else if (part.includes('<')) {
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
    localStorage.setItem('sb-mkt-challenges', JSON.stringify(challengeProgress));
    activeChallenge[activityId] = null;
    renderChallenges(activityId);
  }
}


/* ═══════════════════════════════════════════════════════════════
   PAPER TRADING SIM
   ═══════════════════════════════════════════════════════════════ */

const PT = {
  data: [],
  idx: 20,        // visible bars count starts at 20
  balance: 10000,
  position: null, // { entry, shares, idx }
  trades: [],     // { entry, exit, pnl }
  autoTimer: null,
};

function ptInit() {
  PT.data = generateOHLC(120);
  PT.idx = 20;
  PT.balance = 10000;
  PT.position = null;
  PT.trades = [];
  if (PT.autoTimer) { clearInterval(PT.autoTimer); PT.autoTimer = null; }
  ptUpdateUI();
}

function ptUpdateUI() {
  const fmt = v => '$' + v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  document.getElementById('ptBalance').textContent = fmt(Math.round(PT.balance));
  document.getElementById('ptTrades').textContent = PT.trades.length;

  const buyBtn = document.getElementById('ptBuyBtn');
  const sellBtn = document.getElementById('ptSellBtn');

  if (PT.position) {
    const current = PT.data[PT.idx - 1].c;
    const unreal = (current - PT.position.entry) * PT.position.shares;
    document.getElementById('ptPosition').textContent = PT.position.shares + ' @ ' + PT.position.entry.toFixed(2);
    document.getElementById('ptUnreal').textContent = (unreal >= 0 ? '+' : '') + fmt(Math.round(unreal));
    document.getElementById('ptUnreal').style.color = unreal >= 0 ? GREEN : RED;
    if (buyBtn) buyBtn.disabled = true;
    if (sellBtn) sellBtn.disabled = false;

    checkHints('paper-trading', { hasBought: true, unrealPnlNeg: unreal < 0 });
  } else {
    document.getElementById('ptPosition').textContent = '—';
    document.getElementById('ptUnreal').textContent = '—';
    document.getElementById('ptUnreal').style.color = '';
    if (buyBtn) buyBtn.disabled = false;
    if (sellBtn) sellBtn.disabled = true;
  }
}

function drawPT() {
  const s = setupCanvas('ptCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  if (PT.data.length === 0) ptInit();

  ctx.clearRect(0, 0, w, h);
  const padL = 55, padR = 10, padT = 15, padB = 25;
  const plotW = w - padL - padR, plotH = h - padT - padB;

  const visible = PT.data.slice(0, PT.idx);
  let yMin = Infinity, yMax = -Infinity;
  visible.forEach(d => { yMin = Math.min(yMin, d.l); yMax = Math.max(yMax, d.h); });
  const yPad = (yMax - yMin) * 0.08 || 1;
  yMin -= yPad; yMax += yPad;

  const barW = Math.max(2, plotW / visible.length - 1);

  function valY(v) { return padT + plotH * (1 - (v - yMin) / (yMax - yMin)); }

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 4; i++) {
    const v = yMin + (yMax - yMin) * (i / 4);
    const y = valY(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `9px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(v.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Candles
  visible.forEach((d, i) => {
    const x = padL + i * (barW + 1) + barW / 2;
    const bull = d.c >= d.o;
    ctx.strokeStyle = bull ? GREEN : RED;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, valY(d.h)); ctx.lineTo(x, valY(d.l)); ctx.stroke();
    ctx.fillStyle = bull ? GREEN : RED;
    const top = valY(Math.max(d.o, d.c));
    const bot = valY(Math.min(d.o, d.c));
    ctx.fillRect(x - barW / 2, top, barW, Math.max(1, bot - top));
  });

  // Buy markers
  PT.trades.forEach(t => {
    if (t.buyIdx < PT.idx) {
      const x = padL + t.buyIdx * (barW + 1) + barW / 2;
      const y = valY(t.entry) + 12;
      ctx.fillStyle = GREEN;
      ctx.font = `bold 10px ${MONO()}`;
      ctx.textAlign = 'center';
      ctx.fillText('▲B', x, y);
    }
    if (t.sellIdx !== undefined && t.sellIdx < PT.idx) {
      const x = padL + t.sellIdx * (barW + 1) + barW / 2;
      const y = valY(t.exit) - 6;
      ctx.fillStyle = RED;
      ctx.font = `bold 10px ${MONO()}`;
      ctx.textAlign = 'center';
      ctx.fillText('▼S', x, y);
    }
  });

  // Active position line
  if (PT.position) {
    ctx.strokeStyle = GREEN;
    ctx.setLineDash([6, 3]);
    ctx.lineWidth = 1;
    const y = valY(PT.position.entry);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke();
    ctx.setLineDash([]);
  }

  // End-of-data message
  if (PT.idx >= PT.data.length) {
    ctx.fillStyle = MUTED();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Chart ended — start a new game!', w / 2, h / 2);
  }
}

ENGINE.ptStep = function() {
  if (PT.idx >= PT.data.length) return;
  PT.idx++;
  ptUpdateUI();
  drawPT();
};

ENGINE.ptBuy = function() {
  if (PT.position || PT.idx >= PT.data.length) return;
  const price = PT.data[PT.idx - 1].c;
  const shares = Math.floor(PT.balance / price);
  if (shares <= 0) return;
  PT.position = { entry: price, shares, idx: PT.idx - 1 };
  ptUpdateUI();
  drawPT();
};

ENGINE.ptSell = function() {
  if (!PT.position) return;
  const price = PT.data[PT.idx - 1].c;
  const pnl = (price - PT.position.entry) * PT.position.shares;
  PT.balance += PT.position.shares * price;
  PT.trades.push({
    entry: PT.position.entry,
    exit: price,
    pnl,
    buyIdx: PT.position.idx,
    sellIdx: PT.idx - 1,
  });
  PT.position = null;
  ptUpdateUI();
  drawPT();

  const totalPnl = PT.trades.reduce((s, t) => s + t.pnl, 0);
  checkHints('paper-trading', { hasSold: true, totalPnlPos: totalPnl > 0 });
  checkChallenges('paper-trading', {
    lastTradeProfit: pnl > 0,
    balance: PT.balance,
  });
};

ENGINE.ptAutoPlay = function() {
  if (PT.autoTimer) { clearInterval(PT.autoTimer); PT.autoTimer = null; return; }
  PT.autoTimer = setInterval(() => {
    if (PT.idx >= PT.data.length) { clearInterval(PT.autoTimer); PT.autoTimer = null; return; }
    ENGINE.ptStep();
  }, 350);
};

ENGINE.resetPT = function() {
  ptInit();
  drawPT();
};


/* ═══════════════════════════════════════════════════════════════
   RISK CALCULATOR
   ═══════════════════════════════════════════════════════════════ */

const RC = {
  account: 10000,
  riskPct: 2,
  entry: 100,
  stop: 95,
  target: 115,
  winRate: 55,
  positionSize: 0,
  dollarRisk: 0,
  rrRatio: 0,
  kelly: 0,
};

function drawRC() {
  const s = setupCanvas('rcCanvas');
  if (!s) return;
  const { ctx, w, h } = s;

  ctx.clearRect(0, 0, w, h);

  if (RC.positionSize === 0) {
    ctx.fillStyle = MUTED();
    ctx.font = `14px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText('Enter parameters and click Calculate', w / 2, h / 2);
    return;
  }

  const padL = 60, padR = 20, padT = 30, padB = 30;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const barChartW = plotW * 0.45;
  const rrChartX = padL + barChartW + 40;
  const rrChartW = plotW - barChartW - 40;

  // LEFT: Position sizing bar chart
  ctx.fillStyle = MUTED();
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Position Sizing', padL + barChartW / 2, padT - 10);

  const bars = [
    { label: 'Account', value: RC.account, color: BLUE },
    { label: '$ Risk', value: RC.dollarRisk, color: RED },
    { label: 'Position $', value: RC.positionSize * RC.entry, color: GREEN },
  ];
  const maxBar = Math.max(...bars.map(b => b.value));
  const barWidth = barChartW / (bars.length * 2 + 1);

  bars.forEach((b, i) => {
    const x = padL + barWidth + i * barWidth * 2;
    const barH = (b.value / maxBar) * plotH * 0.8;
    const y = padT + plotH - barH;
    ctx.fillStyle = b.color;
    ctx.fillRect(x, y, barWidth, barH);
    ctx.fillStyle = MUTED();
    ctx.font = `9px ${MONO()}`;
    ctx.textAlign = 'center';
    ctx.fillText(b.label, x + barWidth / 2, padT + plotH + 14);
    ctx.fillText('$' + Math.round(b.value).toLocaleString(), x + barWidth / 2, y - 6);
  });

  // RIGHT: R:R visual
  ctx.fillStyle = MUTED();
  ctx.font = `11px ${MONO()}`;
  ctx.textAlign = 'center';
  ctx.fillText('Risk / Reward', rrChartX + rrChartW / 2, padT - 10);

  const totalRange = Math.abs(RC.entry - RC.stop) + Math.abs(RC.target - RC.entry);
  const riskHeight = (Math.abs(RC.entry - RC.stop) / totalRange) * plotH * 0.7;
  const rewardHeight = (Math.abs(RC.target - RC.entry) / totalRange) * plotH * 0.7;
  const midY = padT + plotH * 0.5;
  const barX = rrChartX + rrChartW / 2 - 20;

  // Entry line
  ctx.strokeStyle = MUTED();
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(rrChartX, midY);
  ctx.lineTo(rrChartX + rrChartW, midY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = TEXT();
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'right';
  ctx.fillText('Entry ' + RC.entry.toFixed(2), barX - 6, midY + 4);

  // Risk bar (below entry)
  ctx.fillStyle = 'rgba(229,115,115,0.3)';
  ctx.fillRect(barX, midY, 40, riskHeight);
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.strokeRect(barX, midY, 40, riskHeight);
  ctx.fillStyle = RED;
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'right';
  ctx.fillText('Stop ' + RC.stop.toFixed(2), barX - 6, midY + riskHeight + 4);

  // Reward bar (above entry)
  ctx.fillStyle = 'rgba(129,199,132,0.3)';
  ctx.fillRect(barX, midY - rewardHeight, 40, rewardHeight);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 2;
  ctx.strokeRect(barX, midY - rewardHeight, 40, rewardHeight);
  ctx.fillStyle = GREEN;
  ctx.font = `10px ${MONO()}`;
  ctx.textAlign = 'right';
  ctx.fillText('Target ' + RC.target.toFixed(2), barX - 6, midY - rewardHeight - 4);

  // R:R label
  ctx.fillStyle = TEXT();
  ctx.font = `bold 14px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('1 : ' + RC.rrRatio.toFixed(1), barX + 50, midY + 5);

  // Kelly label
  ctx.fillStyle = MUTED();
  ctx.font = `10px ${MONO()}`;
  ctx.fillText('Kelly: ' + RC.kelly.toFixed(1) + '%', barX + 50, midY + 22);
  ctx.fillText('½ Kelly: ' + (RC.kelly / 2).toFixed(1) + '%', barX + 50, midY + 36);
}

ENGINE.calcRC = function() {
  RC.account = parseFloat(document.getElementById('rcAccount').value) || 10000;
  RC.riskPct = parseFloat(document.getElementById('rcRiskPct').value) || 2;
  RC.entry = parseFloat(document.getElementById('rcEntry').value) || 100;
  RC.stop = parseFloat(document.getElementById('rcStop').value) || 95;
  RC.target = parseFloat(document.getElementById('rcTarget').value) || 115;
  RC.winRate = parseFloat(document.getElementById('rcWinRate').value) || 55;

  const riskPerShare = Math.abs(RC.entry - RC.stop);
  if (riskPerShare === 0) return;

  RC.dollarRisk = RC.account * (RC.riskPct / 100);
  RC.positionSize = Math.floor(RC.dollarRisk / riskPerShare);
  const rewardPerShare = Math.abs(RC.target - RC.entry);
  RC.rrRatio = riskPerShare > 0 ? rewardPerShare / riskPerShare : 0;

  // Kelly criterion: f* = (p*b - q) / b  where p=winRate, q=1-p, b=R:R ratio
  const p = RC.winRate / 100;
  const q = 1 - p;
  const b = RC.rrRatio;
  RC.kelly = b > 0 ? Math.max(0, ((p * b - q) / b) * 100) : 0;

  document.getElementById('rcSize').textContent = RC.positionSize + ' shares';
  document.getElementById('rcDollarRisk').textContent = '$' + Math.round(RC.dollarRisk).toLocaleString();
  document.getElementById('rcRR').textContent = '1 : ' + RC.rrRatio.toFixed(1);
  document.getElementById('rcKelly').textContent = RC.kelly.toFixed(1) + '%';

  drawRC();

  checkHints('risk-calculator', {
    calculated: true,
    rrLow: RC.rrRatio < 2,
    kellyShown: true,
    riskHigh: RC.riskPct > 2,
  });
  checkChallenges('risk-calculator', {
    riskPct: RC.riskPct,
    rrRatio: RC.rrRatio,
  });
};


/* ═══════════════════════════════════════════════════════════════
   MOVING AVERAGE CROSSOVER
   ═══════════════════════════════════════════════════════════════ */

const MAC = {
  data: [],
  fastPeriod: 10,
  slowPeriod: 30,
  fastSMA: [],
  slowSMA: [],
  signals: [],    // { idx, type:'golden'|'death', priceAtSignal, priceAfter10 }
};

function macGenerate() {
  MAC.data = generateOHLC(100);
  macCalc();
}

function macCalc() {
  MAC.fastSMA = calcSMA(MAC.data, MAC.fastPeriod);
  MAC.slowSMA = calcSMA(MAC.data, MAC.slowPeriod);
  MAC.signals = [];
  for (let i = 1; i < MAC.data.length; i++) {
    const pf = MAC.fastSMA[i - 1], ps = MAC.slowSMA[i - 1];
    const cf = MAC.fastSMA[i], cs = MAC.slowSMA[i];
    if (pf === null || ps === null || cf === null || cs === null) continue;
    if (pf <= ps && cf > cs) {
      MAC.signals.push({ idx: i, type: 'golden', priceAtSignal: MAC.data[i].c, priceAfter10: i + 10 < MAC.data.length ? MAC.data[i + 10].c : null });
    } else if (pf >= ps && cf < cs) {
      MAC.signals.push({ idx: i, type: 'death', priceAtSignal: MAC.data[i].c, priceAfter10: i + 10 < MAC.data.length ? MAC.data[i + 10].c : null });
    }
  }
}

function macUpdateMetrics() {
  const golden = MAC.signals.filter(s => s.type === 'golden').length;
  const death = MAC.signals.filter(s => s.type === 'death').length;
  const total = MAC.signals.length;
  let wins = 0, counted = 0;
  MAC.signals.forEach(s => {
    if (s.priceAfter10 === null) return;
    counted++;
    if (s.type === 'golden' && s.priceAfter10 > s.priceAtSignal) wins++;
    else if (s.type === 'death' && s.priceAfter10 < s.priceAtSignal) wins++;
  });
  const wr = counted > 0 ? Math.round((wins / counted) * 100) : 0;

  document.getElementById('macGolden').textContent = golden;
  document.getElementById('macDeath').textContent = death;
  document.getElementById('macSignals').textContent = total;
  document.getElementById('macWinRate').textContent = counted > 0 ? wr + '%' : '—';

  return { golden, death, total, winRate: wr, counted };
}

function drawMAC() {
  const s = setupCanvas('macCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  if (MAC.data.length === 0) macGenerate();

  const data = MAC.data;
  const padL = 55, padR = 15, padT = 20, padB = 30;
  const chartW = w - padL - padR, chartH = h - padT - padB;

  ctx.clearRect(0, 0, w, h);

  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  const pPad = (pMax - pMin) * 0.08 || 1;
  pMin -= pPad; pMax += pPad;

  function priceY(p) { return padT + chartH * (1 - (p - pMin) / (pMax - pMin)); }
  function candleX(i) { return padL + (i + 0.5) * (chartW / data.length); }
  const cw = Math.max(2, (chartW / data.length) * 0.55);

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 5; i++) {
    const p = pMin + (pMax - pMin) * (i / 5);
    const y = priceY(p);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(p.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Candlesticks
  data.forEach((d, i) => {
    const x = candleX(i);
    const bull = d.c >= d.o;
    ctx.strokeStyle = bull ? GREEN : RED;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, priceY(d.h)); ctx.lineTo(x, priceY(d.l)); ctx.stroke();
    ctx.fillStyle = bull ? GREEN : RED;
    const top = priceY(Math.max(d.o, d.c));
    const bot = priceY(Math.min(d.o, d.c));
    ctx.fillRect(x - cw / 2, top, cw, Math.max(1, bot - top));
  });

  // Fast SMA (blue)
  drawLine(ctx, data, MAC.fastSMA, candleX, priceY, BLUE, 2);
  // Slow SMA (orange)
  drawLine(ctx, data, MAC.slowSMA, candleX, priceY, '#ffb74d', 2);

  // Legend
  ctx.font = `10px ${MONO()}`;
  ctx.fillStyle = BLUE;
  ctx.textAlign = 'left';
  ctx.fillText(`Fast SMA ${MAC.fastPeriod}`, padL + 6, padT + 12);
  ctx.fillStyle = '#ffb74d';
  ctx.fillText(`Slow SMA ${MAC.slowPeriod}`, padL + 6, padT + 24);

  // Signal markers
  MAC.signals.forEach(sig => {
    const x = candleX(sig.idx);
    const isGolden = sig.type === 'golden';
    const y = isGolden ? priceY(data[sig.idx].l) + 14 : priceY(data[sig.idx].h) - 8;
    ctx.fillStyle = isGolden ? GREEN : RED;
    ctx.beginPath();
    if (isGolden) {
      ctx.moveTo(x, y - 8); ctx.lineTo(x - 5, y); ctx.lineTo(x + 5, y);
    } else {
      ctx.moveTo(x, y + 8); ctx.lineTo(x - 5, y); ctx.lineTo(x + 5, y);
    }
    ctx.closePath();
    ctx.fill();
  });

  macUpdateMetrics();
}

ENGINE.setMACFast = function(val) {
  MAC.fastPeriod = parseInt(val);
  document.getElementById('macFastVal').textContent = val;
  macCalc();
  drawMAC();
  checkHints('ma-crossover', { generated: true, fastChanged: true });
};

ENGINE.setMACSlow = function(val) {
  MAC.slowPeriod = parseInt(val);
  document.getElementById('macSlowVal').textContent = val;
  macCalc();
  drawMAC();
  checkHints('ma-crossover', { generated: true, slowChanged: true });
};

ENGINE.generateMAC = function() {
  macGenerate();
  drawMAC();
  const m = macUpdateMetrics();
  checkHints('ma-crossover', {
    generated: true,
    hasDeathCross: m.death > 0,
    winRate: m.winRate,
  });
  checkChallenges('ma-crossover', {
    goldenCrosses: m.golden,
    winRate: m.winRate,
  });
};

ENGINE.resetMAC = function() {
  MAC.fastPeriod = 10;
  MAC.slowPeriod = 30;
  const fastEl = document.getElementById('macFast');
  const slowEl = document.getElementById('macSlow');
  if (fastEl) { fastEl.value = 10; }
  if (slowEl) { slowEl.value = 30; }
  document.getElementById('macFastVal').textContent = '10';
  document.getElementById('macSlowVal').textContent = '30';
  macGenerate();
  drawMAC();
};


/* ═══════════════════════════════════════════════════════════════
   SUPPORT & RESISTANCE
   ═══════════════════════════════════════════════════════════════ */

const SR = {
  data: [],
  levels: [],       // { price, type:'support'|'resistance', manual:bool }
  tolerance: 5,     // slider 1-10 maps to tolerance factor
  bounces: 0,
  breaks: 0,
  manualBounces: 0,
};

function srGenerate() {
  SR.data = generateOHLC(60);
  SR.levels = [];
  SR.bounces = 0;
  SR.breaks = 0;
  SR.manualBounces = 0;
  srDetect();
}

function srDetect() {
  const data = SR.data;
  const autoLevels = [];
  const tolFactor = SR.tolerance * 0.003;

  // 5-bar pivot highs and lows
  for (let i = 2; i < data.length - 2; i++) {
    const isSwingHigh = data[i].h >= data[i - 1].h && data[i].h >= data[i - 2].h && data[i].h >= data[i + 1].h && data[i].h >= data[i + 2].h;
    const isSwingLow = data[i].l <= data[i - 1].l && data[i].l <= data[i - 2].l && data[i].l <= data[i + 1].l && data[i].l <= data[i + 2].l;
    if (isSwingHigh) autoLevels.push({ price: data[i].h, type: 'resistance' });
    if (isSwingLow) autoLevels.push({ price: data[i].l, type: 'support' });
  }

  // Cluster nearby levels
  autoLevels.sort((a, b) => a.price - b.price);
  const clustered = [];
  const avgPrice = data.reduce((s, d) => s + d.c, 0) / data.length;
  const threshold = avgPrice * tolFactor;

  for (let i = 0; i < autoLevels.length; i++) {
    if (clustered.length === 0) { clustered.push(autoLevels[i]); continue; }
    const last = clustered[clustered.length - 1];
    if (Math.abs(autoLevels[i].price - last.price) < threshold) {
      last.price = (last.price + autoLevels[i].price) / 2;
      // If mixed pivots, keep the type closer to last close
      if (autoLevels[i].type !== last.type) {
        const lastClose = data[data.length - 1].c;
        last.type = last.price > lastClose ? 'resistance' : 'support';
      }
    } else {
      clustered.push(autoLevels[i]);
    }
  }

  // Keep manual levels, replace auto
  SR.levels = SR.levels.filter(l => l.manual).concat(clustered.map(l => ({ ...l, manual: false })));
  srCountBouncesBreaks();
}

function srCountBouncesBreaks() {
  const data = SR.data;
  let bounces = 0, breaks = 0, manualBounces = 0;
  const avgPrice = data.reduce((s, d) => s + d.c, 0) / data.length;
  const touchDist = avgPrice * 0.008;

  SR.levels.forEach(level => {
    let levelBounces = 0;
    for (let i = 1; i < data.length - 1; i++) {
      const touchesHigh = Math.abs(data[i].h - level.price) < touchDist;
      const touchesLow = Math.abs(data[i].l - level.price) < touchDist;
      if (touchesHigh || touchesLow) {
        // Next bar stays on same side = bounce, crosses = break
        const nextClose = data[i + 1].c;
        const prevClose = data[i - 1].c;
        const sameSide = (prevClose < level.price && nextClose < level.price) || (prevClose > level.price && nextClose > level.price);
        if (sameSide) { bounces++; levelBounces++; }
        else breaks++;
      }
    }
    if (level.manual) manualBounces += levelBounces;
  });
  SR.bounces = bounces;
  SR.breaks = breaks;
  SR.manualBounces = manualBounces;
}

function srUpdateMetrics() {
  const supportCount = SR.levels.filter(l => l.type === 'support').length;
  const resistCount = SR.levels.filter(l => l.type === 'resistance').length;
  document.getElementById('srSupport').textContent = supportCount;
  document.getElementById('srResist').textContent = resistCount;
  document.getElementById('srBounces').textContent = SR.bounces;
  document.getElementById('srBreaks').textContent = SR.breaks;
  return { supportCount, resistanceCount: resistCount, bounces: SR.bounces, breaks: SR.breaks, manualBounces: SR.manualBounces };
}

function drawSR() {
  const s = setupCanvas('srCanvas');
  if (!s) return;
  const { c, ctx, w, h } = s;
  if (SR.data.length === 0) srGenerate();

  const data = SR.data;
  const padL = 55, padR = 15, padT = 20, padB = 30;
  const chartW = w - padL - padR, chartH = h - padT - padB;

  ctx.clearRect(0, 0, w, h);

  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  SR.levels.forEach(l => { if (l.price < pMin) pMin = l.price; if (l.price > pMax) pMax = l.price; });
  const pPad = (pMax - pMin) * 0.08 || 1;
  pMin -= pPad; pMax += pPad;

  function priceY(p) { return padT + chartH * (1 - (p - pMin) / (pMax - pMin)); }
  function candleX(i) { return padL + (i + 0.5) * (chartW / data.length); }
  const cw = Math.max(3, (chartW / data.length) * 0.6);

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 5; i++) {
    const p = pMin + (pMax - pMin) * (i / 5);
    const y = priceY(p);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(p.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // S/R levels as dashed horizontal lines
  SR.levels.forEach(level => {
    const y = priceY(level.price);
    const isSupport = level.type === 'support';
    ctx.strokeStyle = isSupport ? GREEN : RED;
    ctx.lineWidth = level.manual ? 2 : 1.5;
    ctx.setLineDash(level.manual ? [8, 4] : [6, 3]);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    ctx.setLineDash([]);
    // Price label on right
    ctx.fillStyle = isSupport ? GREEN : RED;
    ctx.font = `9px ${MONO()}`;
    ctx.textAlign = 'left';
    const tag = (level.manual ? 'M ' : '') + level.price.toFixed(1);
    ctx.fillText(tag, padL + chartW + 2, y + 3);
  });

  // Candlesticks
  data.forEach((d, i) => {
    const x = candleX(i);
    const bull = d.c >= d.o;
    ctx.strokeStyle = bull ? GREEN : RED;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, priceY(d.h)); ctx.lineTo(x, priceY(d.l)); ctx.stroke();
    ctx.fillStyle = bull ? GREEN : RED;
    const top = priceY(Math.max(d.o, d.c));
    const bot = priceY(Math.min(d.o, d.c));
    ctx.fillRect(x - cw / 2, top, cw, Math.max(1, bot - top));
  });

  srUpdateMetrics();

  // Store mapping for click handler
  c._srPriceFromY = function(canvasY) {
    const cssY = canvasY / DPR;
    return pMin + (1 - (cssY - padT) / chartH) * (pMax - pMin);
  };
}

ENGINE.detectSR = function() {
  srDetect();
  drawSR();
  const m = srUpdateMetrics();
  checkHints('support-resistance', {
    levelsDetected: true,
    bounces: m.bounces,
    breaks: m.breaks,
  });
  checkChallenges('support-resistance', m);
};

ENGINE.addManualSR = function(price) {
  const lastClose = SR.data[SR.data.length - 1].c;
  const type = price > lastClose ? 'resistance' : 'support';
  SR.levels.push({ price, type, manual: true });
  srCountBouncesBreaks();
  drawSR();
  const m = srUpdateMetrics();
  checkHints('support-resistance', { manualAdded: true, bounces: m.bounces, breaks: m.breaks });
  checkChallenges('support-resistance', m);
};

ENGINE.newSRChart = function() {
  srGenerate();
  drawSR();
  const m = srUpdateMetrics();
  checkHints('support-resistance', { levelsDetected: true, bounces: m.bounces, breaks: m.breaks });
  checkChallenges('support-resistance', m);
};

ENGINE.resetSR = function() {
  SR.tolerance = 5;
  const sensEl = document.getElementById('srSens');
  if (sensEl) sensEl.value = 5;
  document.getElementById('srSensVal').textContent = '5';
  srGenerate();
  drawSR();
};


/* ═══════════════════════════════════════════════════════════════
   VOLUME PROFILE
   ═══════════════════════════════════════════════════════════════ */

const VP = {
  data: [],
  bins: [],         // { priceLow, priceHigh, volume }
  poc: 0,           // Point of Control price
  vah: 0,           // Value Area High
  val: 0,           // Value Area Low
  totalVolume: 0,
  binCount: 30,
};

function vpGenerate() {
  VP.data = [];
  let price = 50 + Math.random() * 50;
  const drift = (Math.random() - 0.5) * 0.3;

  for (let i = 0; i < 80; i++) {
    const vol = 0.5 + Math.random() * 2;
    const open = price;
    const close = open + gauss() * vol + drift;
    const high = Math.max(open, close) + Math.abs(gauss() * vol * 0.5);
    const low = Math.min(open, close) - Math.abs(gauss() * vol * 0.5);
    const volume = Math.round(500 + Math.random() * 2000 + Math.abs(gauss()) * 1000);
    VP.data.push({
      o: Math.max(1, open),
      h: Math.max(1, high),
      l: Math.max(0.5, low),
      c: Math.max(1, close),
      v: volume,
    });
    price = close;
  }
  vpBuild();
}

function vpBuild() {
  const data = VP.data;
  if (data.length === 0) return;

  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  const range = pMax - pMin || 1;
  const binSize = range / VP.binCount;

  VP.bins = [];
  for (let i = 0; i < VP.binCount; i++) {
    VP.bins.push({ priceLow: pMin + i * binSize, priceHigh: pMin + (i + 1) * binSize, volume: 0 });
  }

  // Distribute each candle's volume across bins its range spans
  VP.totalVolume = 0;
  data.forEach(d => {
    VP.totalVolume += d.v;
    const lo = Math.min(d.o, d.c, d.l);
    const hi = Math.max(d.o, d.c, d.h);
    const spannedBins = VP.bins.filter(b => b.priceHigh > lo && b.priceLow < hi);
    const share = spannedBins.length > 0 ? d.v / spannedBins.length : 0;
    spannedBins.forEach(b => b.volume += share);
  });

  // POC = bin with highest volume
  let maxVol = 0;
  VP.bins.forEach(b => { if (b.volume > maxVol) { maxVol = b.volume; VP.poc = (b.priceLow + b.priceHigh) / 2; } });

  // Value Area: 70% of total volume around POC
  const sorted = VP.bins.map((b, i) => ({ ...b, idx: i })).sort((a, b) => b.volume - a.volume);
  let vaVol = 0;
  const target = VP.totalVolume * 0.7;
  const inVA = new Set();
  for (let i = 0; i < sorted.length && vaVol < target; i++) {
    inVA.add(sorted[i].idx);
    vaVol += sorted[i].volume;
  }
  let vahIdx = -1, valIdx = VP.binCount;
  inVA.forEach(idx => { if (idx > vahIdx) vahIdx = idx; if (idx < valIdx) valIdx = idx; });
  VP.vah = VP.bins[vahIdx] ? VP.bins[vahIdx].priceHigh : pMax;
  VP.val = VP.bins[valIdx] ? VP.bins[valIdx].priceLow : pMin;
}

function vpUpdateMetrics() {
  document.getElementById('vpPOC').textContent = VP.poc.toFixed(2);
  document.getElementById('vpVAH').textContent = VP.vah.toFixed(2);
  document.getElementById('vpVAL').textContent = VP.val.toFixed(2);
  document.getElementById('vpTotalVol').textContent = VP.totalVolume.toLocaleString();
}

function drawVP() {
  const s = setupCanvas('vpCanvas');
  if (!s) return;
  const { ctx, w, h } = s;
  if (VP.data.length === 0) vpGenerate();

  const data = VP.data;
  const padL = 55, padR = 15, padT = 20, padB = 30;
  const profileW = w * 0.18;
  const chartW = w - padL - padR - profileW - 10;
  const chartH = h - padT - padB;

  ctx.clearRect(0, 0, w, h);

  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  const pPad = (pMax - pMin) * 0.08 || 1;
  pMin -= pPad; pMax += pPad;

  function priceY(p) { return padT + chartH * (1 - (p - pMin) / (pMax - pMin)); }
  function candleX(i) { return padL + (i + 0.5) * (chartW / data.length); }
  const cw = Math.max(2, (chartW / data.length) * 0.55);

  // Grid
  ctx.strokeStyle = BORDER();
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 5; i++) {
    const p = pMin + (pMax - pMin) * (i / 5);
    const y = priceY(p);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW + profileW + 10, y); ctx.stroke();
    ctx.fillStyle = MUTED();
    ctx.font = `10px ${MONO()}`;
    ctx.textAlign = 'right';
    ctx.fillText(p.toFixed(1), padL - 6, y + 3);
  }
  ctx.setLineDash([]);

  // Candlesticks
  data.forEach((d, i) => {
    const x = candleX(i);
    const bull = d.c >= d.o;
    ctx.strokeStyle = bull ? GREEN : RED;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, priceY(d.h)); ctx.lineTo(x, priceY(d.l)); ctx.stroke();
    ctx.fillStyle = bull ? GREEN : RED;
    const top = priceY(Math.max(d.o, d.c));
    const bot = priceY(Math.min(d.o, d.c));
    ctx.fillRect(x - cw / 2, top, cw, Math.max(1, bot - top));
  });

  // Volume profile bars (right side)
  const profileX = padL + chartW + 10;
  const maxBinVol = Math.max(...VP.bins.map(b => b.volume));

  VP.bins.forEach(b => {
    const y1 = priceY(b.priceHigh);
    const y2 = priceY(b.priceLow);
    const barW = maxBinVol > 0 ? (b.volume / maxBinVol) * profileW : 0;
    const mid = (b.priceLow + b.priceHigh) / 2;
    const isPOC = Math.abs(mid - VP.poc) < (pMax - pMin) / VP.binCount;
    const inVA = mid >= VP.val && mid <= VP.vah;

    ctx.fillStyle = isPOC ? 'rgba(229,115,115,0.6)' : inVA ? 'rgba(79,195,247,0.3)' : 'rgba(150,150,150,0.2)';
    ctx.fillRect(profileX, y1, barW, Math.max(1, y2 - y1 - 1));
    ctx.strokeStyle = isPOC ? RED : inVA ? BLUE : BORDER();
    ctx.lineWidth = isPOC ? 1.5 : 0.5;
    ctx.strokeRect(profileX, y1, barW, Math.max(1, y2 - y1 - 1));
  });

  // POC line
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  const pocY = priceY(VP.poc);
  ctx.beginPath(); ctx.moveTo(padL, pocY); ctx.lineTo(padL + chartW + profileW + 10, pocY); ctx.stroke();
  ctx.fillStyle = RED;
  ctx.font = `bold 9px ${MONO()}`;
  ctx.textAlign = 'left';
  ctx.fillText('POC', profileX + profileW + 2, pocY - 3);

  // VAH / VAL dashed lines
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 3]);
  const vahY = priceY(VP.vah);
  const valY = priceY(VP.val);
  ctx.beginPath(); ctx.moveTo(padL, vahY); ctx.lineTo(padL + chartW + profileW + 10, vahY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(padL, valY); ctx.lineTo(padL + chartW + profileW + 10, valY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = BLUE;
  ctx.font = `9px ${MONO()}`;
  ctx.fillText('VAH', profileX + profileW + 2, vahY - 3);
  ctx.fillText('VAL', profileX + profileW + 2, valY - 3);

  vpUpdateMetrics();
}

ENGINE.buildVP = function() {
  vpBuild();
  drawVP();
  checkHints('volume-profile', { profileBuilt: true, vaShown: true, pocShown: true });
  // Check skew
  const topHalf = VP.bins.slice(Math.floor(VP.binCount / 2));
  const botHalf = VP.bins.slice(0, Math.floor(VP.binCount / 2));
  const topVol = topHalf.reduce((s, b) => s + b.volume, 0);
  const botVol = botHalf.reduce((s, b) => s + b.volume, 0);
  const skewed = Math.abs(topVol - botVol) / VP.totalVolume > 0.2;
  if (skewed) checkHints('volume-profile', { skewed: true });
};

ENGINE.newVPChart = function() {
  vpGenerate();
  drawVP();
  checkHints('volume-profile', { profileBuilt: true, vaShown: true, pocShown: true });

  // Check challenges
  const data = VP.data;
  let pMin = Infinity, pMax = -Infinity;
  data.forEach(d => { if (d.l < pMin) pMin = d.l; if (d.h > pMax) pMax = d.h; });
  const range = pMax - pMin || 1;
  const pocInTopThird = VP.poc > pMin + range * 0.67;
  const vaRange = VP.vah - VP.val;
  const vaTight = vaRange / range < 0.3;
  checkChallenges('volume-profile', { pocInTopThird, vaTight });
};

ENGINE.resetVP = function() {
  vpGenerate();
  drawVP();
};


/* ═══════════════════════════════════════════════════════════════
   DRAW DISPATCH (compatible with show() pattern)
   ═══════════════════════════════════════════════════════════════ */

const DRAWS = {
  'indicator-playground': function() {
    if (IP.data.length === 0) ipInit();
    drawIP();
  },
  'candlestick-spotter': function() {
    drawCS();
  },
  'paper-trading': function() {
    drawPT();
  },
  'risk-calculator': function() {
    drawRC();
    // Bind input change listeners
    ['rcAccount','rcRiskPct','rcEntry','rcStop','rcTarget','rcWinRate'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el._rcBound) {
        el.addEventListener('change', () => ENGINE.calcRC());
        el._rcBound = true;
      }
    });
  },
  'ma-crossover': function() {
    if (MAC.data.length === 0) macGenerate();
    drawMAC();
    // Bind slider listeners
    const fastEl = document.getElementById('macFast');
    if (fastEl && !fastEl._macBound) {
      fastEl.addEventListener('input', () => ENGINE.setMACFast(fastEl.value));
      fastEl._macBound = true;
    }
    const slowEl = document.getElementById('macSlow');
    if (slowEl && !slowEl._macBound) {
      slowEl.addEventListener('input', () => ENGINE.setMACSlow(slowEl.value));
      slowEl._macBound = true;
    }
  },
  'support-resistance': function() {
    if (SR.data.length === 0) srGenerate();
    drawSR();
    // Bind sensitivity slider
    const sensEl = document.getElementById('srSens');
    if (sensEl && !sensEl._srBound) {
      sensEl.addEventListener('input', () => {
        SR.tolerance = parseInt(sensEl.value);
        document.getElementById('srSensVal').textContent = sensEl.value;
        srDetect();
        drawSR();
        checkHints('support-resistance', { sensChanged: true, levelsDetected: true });
      });
      sensEl._srBound = true;
    }
    // Bind click-to-add-level
    const canvas = document.getElementById('srCanvas');
    if (canvas && !canvas._srClickBound) {
      canvas.addEventListener('click', function(e) {
        if (!canvas._srPriceFromY) return;
        const rect = canvas.getBoundingClientRect();
        const canvasY = (e.clientY - rect.top) * DPR;
        const price = canvas._srPriceFromY(canvasY);
        if (price > 0) ENGINE.addManualSR(price);
      });
      canvas._srClickBound = true;
    }
  },
  'volume-profile': function() {
    if (VP.data.length === 0) vpGenerate();
    drawVP();
  },
};

// Resize handler
window.addEventListener('resize', () => {
  if (typeof currentTopic !== 'undefined' && DRAWS[currentTopic]) {
    DRAWS[currentTopic]();
  }
});


/* ═══════════════════════════════════════════════════════════════
   TEACH MODE ENGINES
   ═══════════════════════════════════════════════════════════════ */

ENGINE.teachIndicators = function() {
  hideNarration('indicator-playground');
  ENGINE.resetIP();
  showNarration('indicator-playground', 0);

  setTimeout(() => {
    ENGINE.toggleInd('sma');
    drawIP();
    showNarration('indicator-playground', 1);
  }, 2000);

  setTimeout(() => {
    ENGINE.toggleInd('rsi');
    drawIP();
    showNarration('indicator-playground', 2);
  }, 5000);

  setTimeout(() => {
    ENGINE.toggleInd('bollinger');
    drawIP();
    showNarration('indicator-playground', 3);
  }, 8500);
};

ENGINE.teachCandlestick = function() {
  hideNarration('candlestick-spotter');
  ENGINE.resetCS();
  showNarration('candlestick-spotter', 0);

  setTimeout(() => {
    showNarration('candlestick-spotter', 1);
  }, 3000);

  setTimeout(() => {
    ENGINE.nextPattern();
    showNarration('candlestick-spotter', 2);
  }, 6000);

  setTimeout(() => {
    ENGINE.nextPattern();
    showNarration('candlestick-spotter', 3);
  }, 10000);
};

ENGINE.teachPaperTrading = function() {
  hideNarration('paper-trading');
  ENGINE.resetPT();
  showNarration('paper-trading', 0);

  setTimeout(() => {
    for (let i = 0; i < 8; i++) ENGINE.ptStep();
    showNarration('paper-trading', 1);
  }, 2500);

  setTimeout(() => {
    ENGINE.ptBuy();
    drawPT();
    showNarration('paper-trading', 2);
  }, 5500);

  setTimeout(() => {
    for (let i = 0; i < 6; i++) ENGINE.ptStep();
    ENGINE.ptSell();
    showNarration('paper-trading', 3);
  }, 9000);
};

ENGINE.teachRiskCalculator = function() {
  hideNarration('risk-calculator');
  showNarration('risk-calculator', 0);

  setTimeout(() => {
    const acct = document.getElementById('rcAccount');
    const risk = document.getElementById('rcRiskPct');
    const entry = document.getElementById('rcEntry');
    const stop = document.getElementById('rcStop');
    const target = document.getElementById('rcTarget');
    const winRate = document.getElementById('rcWinRate');
    if (acct) acct.value = 10000;
    if (risk) risk.value = 2;
    if (entry) entry.value = 100;
    if (stop) stop.value = 95;
    if (target) target.value = 115;
    if (winRate) winRate.value = 55;
    ENGINE.calcRC();
    showNarration('risk-calculator', 1);
  }, 2500);

  setTimeout(() => {
    showNarration('risk-calculator', 2);
  }, 6000);

  setTimeout(() => {
    showNarration('risk-calculator', 3);
  }, 10000);
};

ENGINE.teachMaCrossover = function() {
  hideNarration('ma-crossover');
  MAC.fastPeriod = 10;
  MAC.slowPeriod = 30;
  const fastEl = document.getElementById('macFast');
  const slowEl = document.getElementById('macSlow');
  if (fastEl) { fastEl.value = 10; document.getElementById('macFastVal').textContent = '10'; }
  if (slowEl) { slowEl.value = 30; document.getElementById('macSlowVal').textContent = '30'; }
  macGenerate();
  drawMAC();
  showNarration('ma-crossover', 0);

  setTimeout(() => {
    showNarration('ma-crossover', 1);
  }, 3000);

  setTimeout(() => {
    MAC.fastPeriod = 5;
    if (fastEl) { fastEl.value = 5; document.getElementById('macFastVal').textContent = '5'; }
    macCalc();
    drawMAC();
    showNarration('ma-crossover', 2);
  }, 7000);

  setTimeout(() => {
    showNarration('ma-crossover', 3);
  }, 11000);
};

ENGINE.teachSupportResistance = function() {
  hideNarration('support-resistance');
  SR.tolerance = 5;
  const sensEl = document.getElementById('srSens');
  if (sensEl) { sensEl.value = 5; document.getElementById('srSensVal').textContent = '5'; }
  srGenerate();
  drawSR();
  showNarration('support-resistance', 0);

  setTimeout(() => {
    showNarration('support-resistance', 1);
  }, 3000);

  setTimeout(() => {
    showNarration('support-resistance', 2);
  }, 6500);

  setTimeout(() => {
    showNarration('support-resistance', 3);
  }, 10500);
};

ENGINE.teachVolumeProfile = function() {
  hideNarration('volume-profile');
  vpGenerate();
  drawVP();
  showNarration('volume-profile', 0);

  setTimeout(() => {
    showNarration('volume-profile', 1);
  }, 3000);

  setTimeout(() => {
    showNarration('volume-profile', 2);
  }, 6500);

  setTimeout(() => {
    showNarration('volume-profile', 3);
  }, 10500);
};
