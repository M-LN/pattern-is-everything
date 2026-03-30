/* ═══════════════════════════════════════════════════════════════
   Markets Lab — Activities Data & Content Builder
   Interactive Markets sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-markets-lab', title:'Markets Lab', topics:['indicator-playground','candlestick-spotter','paper-trading','risk-calculator','ma-crossover','support-resistance','volume-profile'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'indicator-playground': 'Indicator Playground',
  'candlestick-spotter':  'Candlestick Pattern Spotter',
  'paper-trading':        'Paper Trading Sim',
  'risk-calculator':      'Risk Calculator',
  'ma-crossover':         'Moving Average Crossover',
  'support-resistance':   'Support & Resistance',
  'volume-profile':       'Volume Profile',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'indicator-playground', num:'01', title:'Indicator Playground', category:'Markets Lab', keywords:['SMA','EMA','RSI','bollinger','MACD','moving average','indicator','technical analysis','candlestick','OHLC'], content:'Overlay technical indicators on a live candlestick chart. Toggle SMA, EMA, RSI, Bollinger Bands and MACD to see how they react to price action.' },
  { id:'candlestick-spotter', num:'02', title:'Candlestick Pattern Spotter', category:'Markets Lab', keywords:['doji','hammer','engulfing','morning star','evening star','pattern','candle','quiz','recognition'], content:'Test your pattern-recognition skills — identify candlestick formations in randomly generated charts and build your score.' },
  { id:'paper-trading', num:'03', title:'Paper Trading Sim', category:'Markets Lab', keywords:['paper trade','buy','sell','P&L','position','portfolio','simulation','chart','trading'], content:'Step through a price chart bar-by-bar, buy and sell with virtual cash, and track your profit & loss in real time.' },
  { id:'risk-calculator', num:'04', title:'Risk Calculator', category:'Markets Lab', keywords:['position size','risk','reward','stop loss','kelly','risk management','R:R','percentage risk'], content:'Calculate optimal position sizes, stop-loss placement, and risk/reward ratios. Visualise the Kelly criterion for bankroll growth.' },
  { id:'ma-crossover', num:'05', title:'Moving Average Crossover', category:'Markets Lab', keywords:['SMA','moving average','crossover','golden cross','death cross','signal','trend','fast','slow'], content:'Generate price charts with two SMA overlays. Spot golden and death cross signals and track their accuracy over time.' },
  { id:'support-resistance', num:'06', title:'Support & Resistance', category:'Markets Lab', keywords:['support','resistance','level','pivot','swing high','swing low','bounce','break','S/R'], content:'Auto-detect support and resistance levels on a candlestick chart using pivot analysis. Click to add manual levels and see bounces vs breaks.' },
  { id:'volume-profile', num:'07', title:'Volume Profile', category:'Markets Lab', keywords:['volume profile','POC','point of control','value area','VAH','VAL','market profile','histogram','volume'], content:'View a horizontal volume histogram overlaid on price action. Identify the Point of Control, Value Area High and Low for context on where the market traded most.' },
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
  'ma-crossover': [
    { id:'mac-first',     trigger:'generated',       message:'A golden cross (fast crosses above slow) is historically a bullish signal.' },
    { id:'mac-death',     trigger:'hasDeathCross',   message:'A death cross (fast crosses below slow) often precedes further downside.' },
    { id:'mac-fast',      trigger:'fastChanged',     message:'Shorter fast periods react quicker but produce more false signals.' },
    { id:'mac-slow',      trigger:'slowChanged',     message:'Longer slow periods filter noise but lag behind real trend changes.' },
    { id:'mac-win',       trigger:'winRate>=60',      message:'Above 60% win rate — this parameter combo is working well on this data.' },
  ],
  'support-resistance': [
    { id:'sr-detected',   trigger:'levelsDetected',  message:'Levels are auto-detected using 5-bar pivot highs and lows.' },
    { id:'sr-manual',     trigger:'manualAdded',     message:'Manual levels let you mark zones the algorithm might miss.' },
    { id:'sr-bounce',     trigger:'bounces>=3',      message:'Multiple bounces at the same level strengthen that support or resistance.' },
    { id:'sr-break',      trigger:'breaks>=2',       message:'When a level breaks, old support often becomes new resistance and vice versa.' },
    { id:'sr-sens',       trigger:'sensChanged',     message:'Higher sensitivity clusters more nearby pivots into a single level.' },
  ],
  'volume-profile': [
    { id:'vp-built',      trigger:'profileBuilt',    message:'The Point of Control is the price level with the highest traded volume.' },
    { id:'vp-va',         trigger:'vaShown',         message:'The Value Area contains ~70% of total volume — prices tend to revert here.' },
    { id:'vp-poc',        trigger:'pocShown',        message:'Price often gravitates toward the POC — it acts as a magnet.' },
    { id:'vp-skew',       trigger:'skewed',          message:'A skewed volume profile suggests directional conviction in the market.' },
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
  'ma-crossover': [
    { id:'mac-c1', title:'Golden Hunter',      objective:'Find a chart with at least 3 golden crosses',       checkFn:'goldenCrosses>=3' },
    { id:'mac-c2', title:'Signal Surgeon',      objective:'Achieve a signal win rate above 60%',               checkFn:'winRate>=60' },
  ],
  'support-resistance': [
    { id:'sr-c1', title:'Level Master',         objective:'Detect at least 3 support and 3 resistance levels', checkFn:'supportCount>=3&&resistanceCount>=3' },
    { id:'sr-c2', title:'Manual Precision',     objective:'Add a manual level that gets at least 2 bounces',   checkFn:'manualBounces>=2' },
  ],
  'volume-profile': [
    { id:'vp-c1', title:'POC Finder',           objective:'Generate a chart where POC is in the top third of the price range', checkFn:'pocInTopThird' },
    { id:'vp-c2', title:'Tight Value Area',     objective:'Find a profile where Value Area spans less than 30% of range',     checkFn:'vaTight' },
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
    } else if (id === 'ma-crossover') {
      div.innerHTML = buildMaCrossover();
    } else if (id === 'support-resistance') {
      div.innerHTML = buildSupportResistance();
    } else if (id === 'volume-profile') {
      div.innerHTML = buildVolumeProfile();
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

function buildMaCrossover() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Moving Average <em style="font-style:italic;color:#81c784;">Crossover</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Overlay fast & slow SMAs on generated price data. Golden crosses (fast above slow) and death crosses (fast below slow) are marked automatically — track their accuracy.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="macCanvas" height="420" style="cursor:default;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-group">
        <label class="ctrl-label" for="macFast">Fast SMA</label>
        <input id="macFast" type="range" class="sb-range" min="5" max="30" value="10">
        <span class="range-val" id="macFastVal">10</span>
      </div>
      <div class="ctrl-group">
        <label class="ctrl-label" for="macSlow">Slow SMA</label>
        <input id="macSlow" type="range" class="sb-range" min="15" max="60" value="30">
        <span class="range-val" id="macSlowVal">30</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateMAC()">🎲 New Chart</button>
        <button class="sb-btn" onclick="ENGINE.resetMAC()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('ma-crossover')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Golden ✕</span><span class="metric-val" id="macGolden">0</span></div>
      <div class="metric"><span class="metric-label">Death ✕</span><span class="metric-val" id="macDeath">0</span></div>
      <div class="metric"><span class="metric-label">Signals</span><span class="metric-val" id="macSignals">0</span></div>
      <div class="metric"><span class="metric-label">Win Rate</span><span class="metric-val" id="macWinRate">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-ma-crossover" style="display:none;"></div>
    <div class="hint-panel" id="hints-ma-crossover"></div>
  `;
}

function buildSupportResistance() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Support & <em style="font-style:italic;color:#81c784;">Resistance</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Auto-detect support and resistance levels via pivot analysis. Click the chart to add manual levels. Watch how price bounces off or breaks through each zone.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="srCanvas" height="420" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-group">
        <label class="ctrl-label" for="srSens">Sensitivity</label>
        <input id="srSens" type="range" class="sb-range" min="1" max="10" value="5">
        <span class="range-val" id="srSensVal">5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.newSRChart()">🎲 New Chart</button>
        <button class="sb-btn" onclick="ENGINE.resetSR()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('support-resistance')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Support</span><span class="metric-val" id="srSupport">0</span></div>
      <div class="metric"><span class="metric-label">Resistance</span><span class="metric-val" id="srResist">0</span></div>
      <div class="metric"><span class="metric-label">Bounces</span><span class="metric-val" id="srBounces">0</span></div>
      <div class="metric"><span class="metric-label">Breaks</span><span class="metric-val" id="srBreaks">0</span></div>
    </div>

    <div class="challenge-panel" id="challenge-support-resistance" style="display:none;"></div>
    <div class="hint-panel" id="hints-support-resistance"></div>
  `;
}

function buildVolumeProfile() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Volume <em style="font-style:italic;color:#81c784;">Profile</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      View a horizontal volume histogram at each price level. Identify the Point of Control (highest volume), Value Area High and Low — key zones where the market traded most.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="vpCanvas" height="420" style="cursor:default;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.newVPChart()">🎲 New Chart</button>
        <button class="sb-btn" onclick="ENGINE.resetVP()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('volume-profile')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">POC</span><span class="metric-val" id="vpPOC">—</span></div>
      <div class="metric"><span class="metric-label">VAH</span><span class="metric-val" id="vpVAH">—</span></div>
      <div class="metric"><span class="metric-label">VAL</span><span class="metric-val" id="vpVAL">—</span></div>
      <div class="metric"><span class="metric-label">Total Vol</span><span class="metric-val" id="vpTotalVol">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-volume-profile" style="display:none;"></div>
    <div class="hint-panel" id="hints-volume-profile"></div>
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


