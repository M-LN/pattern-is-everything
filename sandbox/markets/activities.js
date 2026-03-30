/* ═══════════════════════════════════════════════════════════════
   Markets Lab — Activities Data & Content Builder
   Interactive Markets sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-markets-lab', title:'Markets Lab', topics:['indicator-playground','candlestick-spotter','paper-trading','risk-calculator'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'indicator-playground': 'Indicator Playground',
  'candlestick-spotter':  'Candlestick Pattern Spotter',
  'paper-trading':        'Paper Trading Sim',
  'risk-calculator':      'Risk Calculator',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'indicator-playground', num:'01', title:'Indicator Playground', category:'Markets Lab', keywords:['SMA','EMA','RSI','bollinger','MACD','moving average','indicator','technical analysis','candlestick','OHLC'], content:'Overlay technical indicators on a live candlestick chart. Toggle SMA, EMA, RSI, Bollinger Bands and MACD to see how they react to price action.' },
  { id:'candlestick-spotter', num:'02', title:'Candlestick Pattern Spotter', category:'Markets Lab', keywords:['doji','hammer','engulfing','morning star','evening star','pattern','candle','quiz','recognition'], content:'Test your pattern-recognition skills — identify candlestick formations in randomly generated charts and build your score.' },
  { id:'paper-trading', num:'03', title:'Paper Trading Sim', category:'Markets Lab', keywords:['paper trade','buy','sell','P&L','position','portfolio','simulation','chart','trading'], content:'Step through a price chart bar-by-bar, buy and sell with virtual cash, and track your profit & loss in real time.' },
  { id:'risk-calculator', num:'04', title:'Risk Calculator', category:'Markets Lab', keywords:['position size','risk','reward','stop loss','kelly','risk management','R:R','percentage risk'], content:'Calculate optimal position sizes, stop-loss placement, and risk/reward ratios. Visualise the Kelly criterion for bankroll growth.' },
];

/* ── Hints system ── */
const HINTS = {
  'indicator-playground': [
    { id:'ip-sma-on',     trigger:'smaOn',       message:'The SMA smooths price data — notice how it lags behind sudden moves.' },
    { id:'ip-rsi-on',     trigger:'rsiOn',        message:'RSI above 70 often signals overbought; below 30 signals oversold.' },
    { id:'ip-boll-on',    trigger:'bollingerOn',  message:'Bollinger Bands widen during volatile periods and narrow in calm markets.' },
    { id:'ip-macd-on',    trigger:'macdOn',       message:'When MACD crosses above its signal line, it\'s often read as bullish.' },
    { id:'ip-multi',      trigger:'indicatorCount>=3', message:'Using too many overlapping indicators can create analysis paralysis — focus on 1–2 that complement each other.' },
  ],
  'candlestick-spotter': [
    { id:'cs-first',      trigger:'attempts>=1',  message:'Look for long wicks relative to the body — they signal rejection of a price level.' },
    { id:'cs-streak',     trigger:'streak>=3',     message:'Great streak! Pattern recognition improves with practice.' },
    { id:'cs-wrong',      trigger:'wrongCount>=2', message:'Don\'t worry — many patterns look similar. Focus on body-to-wick ratio and context.' },
    { id:'cs-score10',    trigger:'score>=10',     message:'Excellent visual intuition — you\'re spotting patterns like a pro.' },
  ],
  'paper-trading': [
    { id:'pt-first-buy',  trigger:'hasBought',     message:'You entered a position — watch the chart advance and decide when to sell.' },
    { id:'pt-first-sell', trigger:'hasSold',        message:'Closed the trade! Check your P&L — was the timing right?' },
    { id:'pt-losing',     trigger:'unrealPnlNeg',   message:'Price moved against you — consider cutting losses early to preserve capital.' },
    { id:'pt-profit',     trigger:'totalPnlPos',    message:'Nice realised profit! Consistency matters more than big wins.' },
  ],
  'risk-calculator': [
    { id:'rc-first',      trigger:'calculated',     message:'Position size = (Account × Risk%) ÷ |Entry − Stop|.' },
    { id:'rc-rr-low',     trigger:'rrLow',           message:'A risk/reward below 1:2 means you need a high win-rate to stay profitable.' },
    { id:'rc-kelly',      trigger:'kellyShown',      message:'Kelly sizing can be aggressive — many traders use half-Kelly for safety.' },
    { id:'rc-large-risk', trigger:'riskHigh',        message:'Risking more than 2% per trade can lead to large drawdowns.' },
  ],
};

/* ── Challenges ── */
const CHALLENGES = {
  'indicator-playground': [
    { id:'ip-c1', title:'Trend Spotter',     objective:'Identify a clear uptrend using SMA crossover', checkFn:'smaOn&&trendIdentified' },
    { id:'ip-c2', title:'Volatility Reader',  objective:'Spot a Bollinger Band squeeze and breakout',   checkFn:'bollingerOn&&squeezeFound' },
  ],
  'candlestick-spotter': [
    { id:'cs-c1', title:'Quick Eyes',         objective:'Identify 5 patterns correctly in under 60 seconds', checkFn:'score>=5&&timeUnder60' },
    { id:'cs-c2', title:'Perfect Round',      objective:'Get 10 in a row without a mistake',                 checkFn:'streak>=10' },
  ],
  'paper-trading': [
    { id:'pt-c1', title:'First Profit',       objective:'Close a trade with positive P&L',                   checkFn:'lastTradeProfit' },
    { id:'pt-c2', title:'Portfolio Growth',    objective:'Grow your balance above $10,500',                   checkFn:'balance>10500' },
  ],
  'risk-calculator': [
    { id:'rc-c1', title:'Textbook Sizing',    objective:'Calculate a position risking exactly 1% of account', checkFn:'riskPct==1' },
    { id:'rc-c2', title:'Favorable R:R',      objective:'Set up a trade with risk/reward ≥ 1:3',              checkFn:'rrRatio>=3' },
  ],
};

/* ── Build page content ── */
function buildContent() {
  const nav = document.getElementById('mainNav');
  const main = document.getElementById('mainContent');

  // Build nav
  SECTIONS.forEach(sec => {
    const secDiv = document.createElement('div');
    secDiv.className = 'nav-section';
    secDiv.innerHTML = `<div class="ns-title" onclick="this.parentElement.classList.toggle('collapsed')">${sec.title} <span class="ns-arrow">▾</span></div>`;
    sec.topics.forEach((id, i) => {
      const ni = document.createElement('div');
      ni.className = 'ni';
      ni.dataset.topic = id;
      ni.innerHTML = `<span class="ni-num">${String(i + 1).padStart(2, '0')}</span>${TOPIC_NAMES[id]}`;
      ni.onclick = () => show(id);
      secDiv.appendChild(ni);
    });
    nav.appendChild(secDiv);
  });

  // Build activity pages
  TOPICS.forEach(id => {
    const div = document.createElement('div');
    div.className = 'topic';
    div.id = id;

    if (id === 'indicator-playground') {
      div.innerHTML = buildIndicatorPlayground();
    } else if (id === 'candlestick-spotter') {
      div.innerHTML = buildCandlestickSpotter();
    } else if (id === 'paper-trading') {
      div.innerHTML = buildPaperTrading();
    } else if (id === 'risk-calculator') {
      div.innerHTML = buildRiskCalculator();
    }

    main.appendChild(div);
  });
}

function buildIndicatorPlayground() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Indicator <em style="font-style:italic;color:#81c784;">Playground</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Toggle technical indicators on a generated candlestick chart. Watch how each indicator reacts to price movement — combine them to understand convergence and divergence.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="ipCanvas" height="420" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-buttons">
        <button class="sb-btn indicator-toggle" id="btnSMA" onclick="ENGINE.toggleInd('sma')">SMA 20</button>
        <button class="sb-btn indicator-toggle" id="btnEMA" onclick="ENGINE.toggleInd('ema')">EMA 12</button>
        <button class="sb-btn indicator-toggle" id="btnRSI" onclick="ENGINE.toggleInd('rsi')">RSI 14</button>
        <button class="sb-btn indicator-toggle" id="btnBollinger" onclick="ENGINE.toggleInd('bollinger')">Bollinger</button>
        <button class="sb-btn indicator-toggle" id="btnMACD" onclick="ENGINE.toggleInd('macd')">MACD</button>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.newChart()">🎲 New Chart</button>
        <button class="sb-btn" onclick="ENGINE.resetIP()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('indicator-playground')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Candles</span><span class="metric-val" id="ipCandles">60</span></div>
      <div class="metric"><span class="metric-label">Trend</span><span class="metric-val" id="ipTrend">—</span></div>
      <div class="metric"><span class="metric-label">Active</span><span class="metric-val" id="ipActive">0</span></div>
    </div>

    <div class="challenge-panel" id="challenge-indicator-playground" style="display:none;"></div>
    <div class="hint-panel" id="hints-indicator-playground"></div>
  `;
}

function buildCandlestickSpotter() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Candlestick <em style="font-style:italic;color:#81c784;">Pattern Spotter</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      A pattern is highlighted on the chart — pick the correct name from the choices. Build your recognition speed and accuracy over time.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="csCanvas" height="320" style="cursor:default;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-buttons" id="csChoices">
        <!-- Choices populated by engine -->
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.nextPattern()">→ Next Pattern</button>
        <button class="sb-btn" onclick="ENGINE.resetCS()">↺ Reset Score</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('candlestick-spotter')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Score</span><span class="metric-val" id="csScore">0</span></div>
      <div class="metric"><span class="metric-label">Streak</span><span class="metric-val" id="csStreak">0</span></div>
      <div class="metric"><span class="metric-label">Attempts</span><span class="metric-val" id="csAttempts">0</span></div>
      <div class="metric"><span class="metric-label">Accuracy</span><span class="metric-val" id="csAccuracy">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-candlestick-spotter" style="display:none;"></div>
    <div class="hint-panel" id="hints-candlestick-spotter"></div>
  `;
}

function buildPaperTrading() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Paper <em style="font-style:italic;color:#81c784;">Trading Sim</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Step through a price chart bar-by-bar. Buy and sell with virtual cash — learn to manage entries, exits, and emotions without real risk.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="ptCanvas" height="340" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.ptStep()">▶ Step</button>
        <button class="sb-btn" id="ptBuyBtn" onclick="ENGINE.ptBuy()" style="background:#81c784;color:#000;">Buy</button>
        <button class="sb-btn" id="ptSellBtn" onclick="ENGINE.ptSell()" style="background:#e57373;color:#000;" disabled>Sell</button>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn" onclick="ENGINE.ptAutoPlay()">⏩ Auto-play</button>
        <button class="sb-btn" onclick="ENGINE.resetPT()">↺ New Game</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('paper-trading')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Balance</span><span class="metric-val" id="ptBalance">$10,000</span></div>
      <div class="metric"><span class="metric-label">Position</span><span class="metric-val" id="ptPosition">—</span></div>
      <div class="metric"><span class="metric-label">Unrealised</span><span class="metric-val" id="ptUnreal">—</span></div>
      <div class="metric"><span class="metric-label">Trades</span><span class="metric-val" id="ptTrades">0</span></div>
    </div>

    <div class="challenge-panel" id="challenge-paper-trading" style="display:none;"></div>
    <div class="hint-panel" id="hints-paper-trading"></div>
  `;
}

function buildRiskCalculator() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Risk <em style="font-style:italic;color:#81c784;">Calculator</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Size your positions correctly. Enter your account, risk tolerance, and trade levels to see optimal lot sizes, risk/reward ratios, and Kelly sizing.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="rcCanvas" height="320" style="cursor:default;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcAccount">Account ($)</label>
        <input id="rcAccount" type="number" class="sb-input" value="10000" min="100" step="100">
      </div>
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcRiskPct">Risk % per trade</label>
        <input id="rcRiskPct" type="number" class="sb-input" value="2" min="0.1" max="100" step="0.1">
      </div>
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcEntry">Entry price</label>
        <input id="rcEntry" type="number" class="sb-input" value="100" min="0.01" step="0.01">
      </div>
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcStop">Stop-loss</label>
        <input id="rcStop" type="number" class="sb-input" value="95" min="0.01" step="0.01">
      </div>
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcTarget">Target price</label>
        <input id="rcTarget" type="number" class="sb-input" value="115" min="0.01" step="0.01">
      </div>
    </div>

    <div class="sandbox-controls" style="margin-top:8px;">
      <div class="ctrl-group">
        <label class="ctrl-label" for="rcWinRate">Win rate (Kelly)</label>
        <input id="rcWinRate" type="number" class="sb-input" value="55" min="1" max="99" step="1">
        <span style="font-family:var(--mono);font-size:11px;color:var(--muted);">%</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.calcRC()">Calculate</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('risk-calculator')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Position Size</span><span class="metric-val" id="rcSize">—</span></div>
      <div class="metric"><span class="metric-label">$ at Risk</span><span class="metric-val" id="rcDollarRisk">—</span></div>
      <div class="metric"><span class="metric-label">R:R Ratio</span><span class="metric-val" id="rcRR">—</span></div>
      <div class="metric"><span class="metric-label">Kelly %</span><span class="metric-val" id="rcKelly">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-risk-calculator" style="display:none;"></div>
    <div class="hint-panel" id="hints-risk-calculator"></div>
  `;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', buildContent);
