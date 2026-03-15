/* ═══════════════════════════════════════════════════════════════
   Chart Patterns — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-reversal', title:'Reversal Patterns', topics:['home','head-and-shoulders','inverse-head-and-shoulders','double-top','double-bottom','rounding-bottom'] },
  { id:'sec-continuation', title:'Continuation Patterns', topics:['bull-flag','bear-flag','pennant','ascending-triangle','descending-triangle'] },
  { id:'sec-bilateral', title:'Bilateral & Wedge', topics:['symmetric-triangle','rising-wedge','falling-wedge','broadening-formation','rectangle'] },
  { id:'sec-candlestick', title:'Candlestick Patterns', topics:['doji','hammer','engulfing','morning-star','evening-star'] },
  { id:'sec-structure', title:'Structural Analysis', topics:['support-resistance','trendlines','channels','gaps','cup-and-handle'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'head-and-shoulders':'Head & Shoulders',
  'inverse-head-and-shoulders':'Inverse H&S',
  'double-top':'Double Top',
  'double-bottom':'Double Bottom',
  'rounding-bottom':'Rounding Bottom',
  'bull-flag':'Bull Flag',
  'bear-flag':'Bear Flag',
  pennant:'Pennant',
  'ascending-triangle':'Ascending Triangle',
  'descending-triangle':'Descending Triangle',
  'symmetric-triangle':'Symmetric Triangle',
  'rising-wedge':'Rising Wedge',
  'falling-wedge':'Falling Wedge',
  'broadening-formation':'Broadening Formation',
  rectangle:'Rectangle',
  doji:'Doji',
  hammer:'Hammer',
  engulfing:'Engulfing',
  'morning-star':'Morning Star',
  'evening-star':'Evening Star',
  'support-resistance':'Support & Resistance',
  trendlines:'Trendlines',
  channels:'Channels',
  gaps:'Gaps',
  'cup-and-handle':'Cup & Handle',
};

const TOPIC_DATA = [
  { id:'head-and-shoulders', num:'01', title:'Head & Shoulders', category:'Reversal Patterns', keywords:['reversal','top','neckline','left shoulder','right shoulder','bearish','breakdown'], content:'A three-peak pattern signaling a trend reversal — left shoulder, higher head, right shoulder. Breakdown below the neckline confirms the reversal.' },
  { id:'inverse-head-and-shoulders', num:'02', title:'Inverse Head & Shoulders', category:'Reversal Patterns', keywords:['reversal','bottom','neckline','bullish','breakout','accumulation'], content:'The mirror image of H&S — three troughs with the middle lowest. A breakout above the neckline signals a bullish reversal.' },
  { id:'double-top', num:'03', title:'Double Top', category:'Reversal Patterns', keywords:['reversal','M pattern','resistance','two peaks','bearish','neckline'], content:'Price hits the same resistance twice, forming an "M" shape. Failure to break higher on the second attempt signals bearish reversal.' },
  { id:'double-bottom', num:'04', title:'Double Bottom', category:'Reversal Patterns', keywords:['reversal','W pattern','support','two troughs','bullish','neckline'], content:'Price tests the same support twice, forming a "W" shape. The second bounce confirms the support and signals bullish reversal.' },
  { id:'rounding-bottom', num:'05', title:'Rounding Bottom', category:'Reversal Patterns', keywords:['saucer','gradual reversal','accumulation','long-term','bullish','U-shape'], content:'A gradual U-shaped reversal over weeks or months — selling pressure slowly gives way to buying. Signals a long-term bullish reversal.' },
  { id:'bull-flag', num:'06', title:'Bull Flag', category:'Continuation Patterns', keywords:['continuation','flag','pole','bullish','consolidation','breakout','trend'], content:'A sharp rally (pole) followed by a downward-sloping consolidation (flag). Breakout above the flag continues the uptrend. High reliability.' },
  { id:'bear-flag', num:'07', title:'Bear Flag', category:'Continuation Patterns', keywords:['continuation','flag','pole','bearish','consolidation','breakdown','trend'], content:'A sharp decline (pole) followed by an upward-sloping consolidation (flag). Breakdown below continues the downtrend.' },
  { id:'pennant', num:'08', title:'Pennant', category:'Continuation Patterns', keywords:['continuation','triangle','converging','small','brief','breakout','symmetrical'], content:'A small symmetrical triangle after a strong move — converging trendlines over a brief period. Breakout follows the prior trend direction.' },
  { id:'ascending-triangle', num:'09', title:'Ascending Triangle', category:'Continuation Patterns', keywords:['continuation','flat top','rising lows','bullish','resistance','breakout'], content:'Flat resistance top with rising lows — buyers are increasingly aggressive. Usually breaks upward with a measured move equal to the triangle height.' },
  { id:'descending-triangle', num:'10', title:'Descending Triangle', category:'Continuation Patterns', keywords:['continuation','flat bottom','falling highs','bearish','support','breakdown'], content:'Flat support bottom with falling highs — sellers are increasingly aggressive. Usually breaks downward. The mirror of ascending triangle.' },
  { id:'symmetric-triangle', num:'11', title:'Symmetric Triangle', category:'Bilateral & Wedge', keywords:['bilateral','converging','neutral','breakout either way','indecision','apex'], content:'Converging trendlines with lower highs and higher lows — the market is undecided. Can break either direction; watch volume for confirmation.' },
  { id:'rising-wedge', num:'12', title:'Rising Wedge', category:'Bilateral & Wedge', keywords:['bearish','converging up','weakening momentum','breakdown','exhaustion','distribution'], content:'Both trendlines slope upward but converge — the advance is weakening. Usually resolves with a bearish breakdown. Found at tops and in downtrends.' },
  { id:'falling-wedge', num:'13', title:'Falling Wedge', category:'Bilateral & Wedge', keywords:['bullish','converging down','weakening selling','breakout','exhaustion','accumulation'], content:'Both trendlines slope downward but converge — selling pressure is weakening. Usually resolves with a bullish breakout.' },
  { id:'broadening-formation', num:'14', title:'Broadening Formation', category:'Bilateral & Wedge', keywords:['megaphone','expanding range','volatility','diverging trendlines','instability','reversal'], content:'Diverging trendlines — higher highs and lower lows — indicating increasing volatility and disagreement. Often appears at major tops.' },
  { id:'rectangle', num:'15', title:'Rectangle', category:'Bilateral & Wedge', keywords:['range','consolidation','horizontal','support','resistance','breakout either way'], content:'Price bounces between parallel horizontal support and resistance — a consolidation zone. Breakout direction continues the prior trend (usually).' },
  { id:'doji', num:'16', title:'Doji', category:'Candlestick Patterns', keywords:['indecision','equal open close','cross','neutral','reversal signal','context'], content:'Open and close are nearly equal — a "+" shaped candle. It signals indecision. At a trend extreme, it can signal reversal; in a range, it means nothing.' },
  { id:'hammer', num:'17', title:'Hammer', category:'Candlestick Patterns', keywords:['reversal','long lower shadow','bullish','support','rejection','inverted hammer'], content:'Small body at the top, long lower shadow — sellers pushed price down but buyers reclaimed it. At a bottom, it signals bullish reversal. Its inverse (hanging man) appears at tops.' },
  { id:'engulfing', num:'18', title:'Engulfing', category:'Candlestick Patterns', keywords:['reversal','two candle','bullish engulfing','bearish engulfing','body covers','momentum shift'], content:'A two-candle pattern where the second body completely covers the first. Bullish engulfing: small red → large green. Bearish engulfing: small green → large red.' },
  { id:'morning-star', num:'19', title:'Morning Star', category:'Candlestick Patterns', keywords:['reversal','three candle','bullish','bottom','gap down','gap up','hope'], content:'Three-candle bullish reversal: long red → small-bodied candle (the "star") → long green. The star represents the turning point between selling and buying.' },
  { id:'evening-star', num:'20', title:'Evening Star', category:'Candlestick Patterns', keywords:['reversal','three candle','bearish','top','gap up','gap down','warning'], content:'Three-candle bearish reversal: long green → small-bodied star → long red. The mirror image of morning star, appearing at trend peaks.' },
  { id:'support-resistance', num:'21', title:'Support & Resistance', category:'Structural Analysis', keywords:['levels','horizontal','price memory','floor','ceiling','breakout','retest'], content:'Price levels where buying (support) or selling (resistance) has historically concentrated. These levels have "memory" — broken support becomes resistance and vice versa.' },
  { id:'trendlines', num:'22', title:'Trendlines', category:'Structural Analysis', keywords:['diagonal','connecting lows','connecting highs','slope','trend direction','break'], content:'Diagonal lines connecting swing lows (uptrend) or swing highs (downtrend). A valid trendline touches at least 3 points. More touches = more significant.' },
  { id:'channels', num:'23', title:'Channels', category:'Structural Analysis', keywords:['parallel trendlines','range','ascending channel','descending channel','trade within'], content:'Two parallel trendlines containing price action — an ascending channel for uptrends, descending for downtrends. Price oscillates between the boundaries.' },
  { id:'gaps', num:'24', title:'Gaps', category:'Structural Analysis', keywords:['breakaway','runaway','exhaustion','common','opening gap','price void','fill'], content:'Price voids between closes and opens. Breakaway gaps start moves, runaway gaps continue them, exhaustion gaps end them. "Do gaps always fill?" — some do, some don\'t.' },
  { id:'cup-and-handle', num:'25', title:'Cup & Handle', category:'Structural Analysis', keywords:['continuation','rounded bottom','handle','breakout','consolidation','bullish','O\'Neil'], content:'A rounded bottom (cup) followed by a small consolidation (handle) before breakout. Popularized by William O\'Neil. The measured move target equals the cup depth.' },
];

/* ═══════════════════════════════════════════════════════════════ */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const progressHTML = nav.innerHTML;
  let html = progressHTML;
  let num = 0;
  SECTIONS.forEach(sec => {
    html += `<div class="nav-section open" id="${sec.id}">
      <div class="nav-section-header" onclick="toggleSection('${sec.id}')">
        <span class="nav-section-title">${sec.title}</span>
        <span class="nav-section-arrow">▾</span>
      </div><div class="nav-items">`;
    sec.topics.forEach(tid => {
      if (tid === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">◉</span>Overview</div>`;
      } else {
        num++;
        const n = String(num).padStart(2,'0');
        html += `<div class="ni" data-topic="${tid}" onclick="show('${tid}',true)"><span class="ni-num">${n}</span>${TOPIC_NAMES[tid]}</div>`;
      }
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome() + buildHeadAndShoulders() + buildInverseHeadAndShoulders()
    + buildDoubleTop() + buildDoubleBottom() + buildRoundingBottom()
    + buildBullFlag() + buildBearFlag() + buildPennant()
    + buildAscendingTriangle() + buildDescendingTriangle()
    + buildSymmetricTriangle() + buildRisingWedge() + buildFallingWedge()
    + buildBroadeningFormation() + buildRectangle()
    + buildDoji() + buildHammer() + buildEngulfing()
    + buildMorningStar() + buildEveningStar()
    + buildSupportResistance() + buildTrendlines() + buildChannels()
    + buildGaps() + buildCupAndHandle();
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Chart <em>Patterns</em></h2>
    <p style="margin-top:14px">An interactive reference to 25 essential chart patterns — from classic reversal formations to candlestick signals and structural analysis. Each entry includes pattern anatomy, psychology, and a visual breakdown.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-reversal','head-and-shoulders')">
      <div class="cat-card-icon">🔄</div>
      <div class="cat-card-name">Reversal Patterns</div>
      <div class="cat-card-count">5 topics · H&S, Double Top/Bottom, Rounding</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-continuation','bull-flag')">
      <div class="cat-card-icon">📈</div>
      <div class="cat-card-name">Continuation Patterns</div>
      <div class="cat-card-count">5 topics · Flags, Pennants, Triangles</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-bilateral','symmetric-triangle')">
      <div class="cat-card-icon">📐</div>
      <div class="cat-card-name">Bilateral & Wedge</div>
      <div class="cat-card-count">5 topics · Sym Triangle, Wedges, Rectangle</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-candlestick','doji')">
      <div class="cat-card-icon">🕯️</div>
      <div class="cat-card-name">Candlestick Patterns</div>
      <div class="cat-card-count">5 topics · Doji, Hammer, Engulfing, Stars</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-structure','support-resistance')">
      <div class="cat-card-icon">🏗️</div>
      <div class="cat-card-name">Structural Analysis</div>
      <div class="cat-card-count">5 topics · S&R, Trendlines, Gaps, Cup & Handle</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildHeadAndShoulders() {
  return `<div class="topic" id="head-and-shoulders">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">01 — Reversal Patterns</div><h2>Head & <em>Shoulders</em></h2></div><span class="topic-badge">Bearish Reversal</span></div>
  <p class="sub">// Three peaks — the classic top reversal</p>
  <p class="prose">The <strong>Head & Shoulders</strong> is the most reliable reversal pattern. A left shoulder peak, a higher head peak, then a lower right shoulder. When price breaks below the <strong>neckline</strong> (drawn through the two troughs), the bearish reversal is confirmed.</p>
  <div class="fb"><div class="fm">Target = Neckline − (Head − Neckline)</div><div class="fd"><span>Measured move:</span> the distance from the head to the neckline, projected downward from the breakpoint.</div></div>
  <div class="va"><div class="vl">// Head & Shoulders anatomy</div><canvas id="headAndShouldersCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume typically decreases from left shoulder → head → right shoulder. Declining volume on the right shoulder confirms weakening buying pressure.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The three-peak reversal is a <a href="../../stats/#normal" target="_blank" rel="noopener">distribution shape</a> — the center peak is the mode. In ML, <a href="../../ml-math/#bias-variance" target="_blank" rel="noopener">bias-variance</a> follows the same arc: performance rises, peaks, then degrades.</div>
  <div class="topic-nav" id="nav-head-and-shoulders"></div>
</div>`;
}

function buildInverseHeadAndShoulders() {
  return `<div class="topic" id="inverse-head-and-shoulders">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Reversal Patterns</div><h2>Inverse <em>H&S</em></h2></div><span class="topic-badge">Bullish Reversal</span></div>
  <p class="sub">// The mirror image — three troughs signaling a bottom</p>
  <p class="prose">The <strong>Inverse Head & Shoulders</strong> is the bullish mirror: left trough, a deeper head trough, then a shallower right trough. Breakout above the neckline confirms the bullish reversal. Often forms at the end of extended downtrends.</p>
  <div class="fb"><div class="fm">Target = Neckline + (Neckline − Head)</div><div class="fd"><span>The deeper the head,</span> the larger the potential move. Volume should increase on the breakout.</div></div>
  <div class="va"><div class="vl">// Inverse Head & Shoulders anatomy</div><canvas id="inverseHeadAndShouldersCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The neckline doesn't have to be perfectly horizontal — a slightly sloping neckline is normal. What matters is the pattern of three troughs.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A bottoming reversal is the mirror image of head-and-shoulders — the same <a href="../../stats/#normal" target="_blank" rel="noopener">symmetry</a> that statistics reveals in distributions. In poetry, <a href="../../poetry/rhetoric/#chiasmus" target="_blank" rel="noopener">chiasmus</a> mirrors structure: A-B then B-A.</div>
  <div class="topic-nav" id="nav-inverse-head-and-shoulders"></div>
</div>`;
}

function buildDoubleTop() {
  return `<div class="topic" id="double-top">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">03 — Reversal Patterns</div><h2>Double <em>Top</em></h2></div><span class="topic-badge">Bearish — M</span></div>
  <p class="sub">// Two peaks at the same level — the "M" formation</p>
  <p class="prose">The <strong>Double Top</strong> forms when price hits resistance twice and fails to break through. The two peaks form an "M" shape. Breakdown below the trough between peaks (the neckline) confirms the bearish reversal.</p>
  <div class="fb"><div class="fm">Target = Neckline − (Peak − Neckline)</div><div class="fd"><span>The two peaks don't need to be identical</span> — a difference of ~3% is acceptable. Time between peaks varies from weeks to months.</div></div>
  <div class="va"><div class="vl">// Double Top — M formation</div><canvas id="doubleTopCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The second peak often shows lower volume than the first — a sign that buying enthusiasm is fading even though price reaches the same level.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Two failed attempts at the same level — like a <a href="../../ml-math/#activation" target="_blank" rel="noopener">ReLU-clipped activation</a> hitting a ceiling. In statistics, <a href="../../stats/#hypothesis-testing" target="_blank" rel="noopener">repeated failed tests</a> at the same significance level tell you the effect isn’t there.</div>
  <div class="topic-nav" id="nav-double-top"></div>
</div>`;
}

function buildDoubleBottom() {
  return `<div class="topic" id="double-bottom">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">04 — Reversal Patterns</div><h2>Double <em>Bottom</em></h2></div><span class="topic-badge">Bullish — W</span></div>
  <p class="sub">// Two troughs at the same level — the "W" formation</p>
  <p class="prose">The <strong>Double Bottom</strong> is the bullish mirror of the double top — price tests support twice and bounces. The "W" shape forms with a peak between two troughs. Breakout above the neckline (the middle peak) confirms the reversal.</p>
  <div class="fb"><div class="fm">Target = Neckline + (Neckline − Trough)</div><div class="fd"><span>A "spring"</span> — where the second bottom slightly undercuts the first before reversing — can be especially powerful.</div></div>
  <div class="va"><div class="vl">// Double Bottom — W formation</div><canvas id="doubleBottomCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The strongest double bottoms have increasing volume on the second bounce — it shows buyers stepping in more aggressively at the support level.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Two bounces off the same floor mirror <a href="../../ml-math/#activation" target="_blank" rel="noopener">activation floors</a> in neural nets. In poetry, a <a href="../../poetry/sound/#refrain" target="_blank" rel="noopener">refrain</a> returns to the same line — touching the bottom and bouncing back to the poem.</div>
  <div class="topic-nav" id="nav-double-bottom"></div>
</div>`;
}

function buildRoundingBottom() {
  return `<div class="topic" id="rounding-bottom">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">05 — Reversal Patterns</div><h2>Rounding <em>Bottom</em></h2></div><span class="topic-badge">Saucer</span></div>
  <p class="sub">// A slow, gradual reversal — the U-shaped bottom</p>
  <p class="prose">The <strong>Rounding Bottom</strong> (saucer) is a gradual transition from selling to buying pressure, forming a U-shape over weeks or months. Volume mirrors the price pattern — high at the start, low at the bottom, rising on the right side.</p>
  <div class="fb"><div class="fm">Target = Neckline + Depth of saucer</div><div class="fd"><span>Patience required:</span> this is a long-term pattern. The gradual nature makes it reliable but slow to develop.</div></div>
  <div class="va"><div class="vl">// Rounding Bottom — saucer formation</div><canvas id="roundingBottomCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The rounding bottom reflects a gradual change in market sentiment — not a panic reversal but a slow shift from distribution to accumulation.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The slow U-shaped recovery mirrors the <a href="../../ml-math/#lr-schedule" target="_blank" rel="noopener">cosine learning rate schedule</a> — gradual cooling, then gradual warm-up. In statistics, it’s the shape of a <a href="../../stats/#normal" target="_blank" rel="noopener">cumulative distribution function</a>.</div>
  <div class="topic-nav" id="nav-rounding-bottom"></div>
</div>`;
}

function buildBullFlag() {
  return `<div class="topic" id="bull-flag">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">06 — Continuation Patterns</div><h2>Bull <em>Flag</em></h2></div><span class="topic-badge">Bullish Cont.</span></div>
  <p class="sub">// Sharp rally + downward-sloping channel = continuation</p>
  <p class="prose">The <strong>Bull Flag</strong> starts with a sharp rally (the pole), followed by a gentle downward-sloping consolidation channel (the flag). Breakout above the flag's upper trendline continues the uptrend. One of the most reliable continuation patterns.</p>
  <div class="fb"><div class="fm">Target = Breakout point + Pole length</div><div class="fd"><span>The pole measures the initial move;</span> project that distance from the breakout point for the target.</div></div>
  <div class="va"><div class="vl">// Bull Flag — pole and flag anatomy</div><canvas id="bullFlagCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The best bull flags have decreasing volume during the flag phase and expanding volume on the breakout — showing sellers exhausting themselves.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A pause in an uptrend before continuation. In ML, <a href="../../ml-math/#lr-schedule" target="_blank" rel="noopener">learning rate warmup</a> creates the same pattern: a brief consolidation phase before the model accelerates. <a href="../../poetry/sound/#caesura" target="_blank" rel="noopener">Caesura</a> in poetry is the same breath before the line surges forward.</div>
  <div class="topic-nav" id="nav-bull-flag"></div>
</div>`;
}

function buildBearFlag() {
  return `<div class="topic" id="bear-flag">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">07 — Continuation Patterns</div><h2>Bear <em>Flag</em></h2></div><span class="topic-badge">Bearish Cont.</span></div>
  <p class="sub">// Sharp decline + upward-sloping channel = continuation down</p>
  <p class="prose">The <strong>Bear Flag</strong> is the bearish mirror: a sharp decline (pole) followed by a gentle upward-sloping consolidation (flag). Breakdown below the lower trendline continues the downtrend.</p>
  <div class="fb"><div class="fm">Target = Breakdown point − Pole length</div><div class="fd"><span>Bear flags in strong downtrends</span> can resolve very quickly — the consolidation may be brief.</div></div>
  <div class="va"><div class="vl">// Bear Flag — pole and flag anatomy</div><canvas id="bearFlagCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Bear flags tend to resolve faster than bull flags — fear is a stronger emotion than greed, so selling accelerates more quickly.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The mirror of a bull flag. In ML, <a href="../../ml-math/#grad-clip" target="_blank" rel="noopener">gradient clipping</a> creates brief pauses in the descent before loss resumes falling. In poetry, <a href="../../poetry/rhetoric/#anticlimax" target="_blank" rel="noopener">anticlimax</a> deliberately lets intensity sag before the final drop.</div>
  <div class="topic-nav" id="nav-bear-flag"></div>
</div>`;
}

function buildPennant() {
  return `<div class="topic" id="pennant">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">08 — Continuation Patterns</div><h2><em>Pennant</em></h2></div><span class="topic-badge">Continuation</span></div>
  <p class="sub">// Small symmetrical triangle on a pole — brief pause before continuation</p>
  <p class="prose">A <strong>Pennant</strong> is a small symmetrical triangle that forms after a strong move (the pole). Converging trendlines create a brief pause. Breakout continues in the direction of the pole. Typically resolves within 1-3 weeks.</p>
  <div class="fb"><div class="fm">Target = Breakout + Pole length</div><div class="fd"><span>Key difference from flags:</span> pennants have converging trendlines (triangle), flags have parallel trendlines (channel).</div></div>
  <div class="va"><div class="vl">// Pennant anatomy — pole + triangle</div><canvas id="pennantCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume should contract during the pennant and expand on breakout. A breakout without volume is unreliable.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Converging trendlines compressing volatility before a breakout. In statistics, <a href="../../stats/#variance-std" target="_blank" rel="noopener">decreasing variance</a> signals the same convergence. A <a href="../../poetry/forms/#haiku" target="_blank" rel="noopener">haiku</a> compresses language into a tiny form, then the final line breaks open.</div>
  <div class="topic-nav" id="nav-pennant"></div>
</div>`;
}

function buildAscendingTriangle() {
  return `<div class="topic" id="ascending-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">09 — Continuation Patterns</div><h2>Ascending <em>Triangle</em></h2></div><span class="topic-badge">Bullish</span></div>
  <p class="sub">// Flat resistance + rising lows = buyers pressing higher</p>
  <p class="prose">The <strong>Ascending Triangle</strong> has a flat resistance level and a rising lower trendline. Buyers are willing to pay increasingly higher prices. When resistance finally breaks, the measured move equals the triangle's height at its widest point.</p>
  <div class="fb"><div class="fm">Target = Breakout + Height of triangle base</div><div class="fd"><span>~75% of the time</span> these break upward, but always wait for confirmation above resistance.</div></div>
  <div class="va"><div class="vl">// Ascending Triangle — flat top, rising lows</div><canvas id="ascendingTriangleCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Each touch of resistance weakens it — like repeatedly hitting a wall. The rising lows show buyers becoming more aggressive with each dip.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rising lows against a flat ceiling — pressure building. Same dynamic as <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">optimizer momentum</a> accumulating against a loss plateau. In poetry, <a href="../../poetry/rhetoric/#climax" target="_blank" rel="noopener">gradatio</a> builds intensity step by step toward a peak.</div>
  <div class="topic-nav" id="nav-ascending-triangle"></div>
</div>`;
}

function buildDescendingTriangle() {
  return `<div class="topic" id="descending-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">10 — Continuation Patterns</div><h2>Descending <em>Triangle</em></h2></div><span class="topic-badge">Bearish</span></div>
  <p class="sub">// Flat support + falling highs = sellers pressing lower</p>
  <p class="prose">The <strong>Descending Triangle</strong> has a flat support level and a falling upper trendline. Sellers are accepting lower prices. Breakdown below support triggers the measured move — the triangle's height projected downward.</p>
  <div class="fb"><div class="fm">Target = Breakdown − Height of triangle base</div><div class="fd"><span>The mirror of ascending triangles</span> — sellers weaken support with each touch until it breaks.</div></div>
  <div class="va"><div class="vl">// Descending Triangle — flat bottom, falling highs</div><canvas id="descendingTriangleCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> If the prior trend is up, a descending triangle can actually break upward — context matters more than the pattern alone.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Falling highs against a flat floor. In statistics, a <a href="../../stats/#confidence-intervals" target="_blank" rel="noopener">narrowing confidence interval</a> compresses uncertainty the same way. In poetry, <a href="../../poetry/sound/#end-stopped" target="_blank" rel="noopener">end-stopped lines</a> create a floor the rhythm can’t fall below.</div>
  <div class="topic-nav" id="nav-descending-triangle"></div>
</div>`;
}

function buildSymmetricTriangle() {
  return `<div class="topic" id="symmetric-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">11 — Bilateral & Wedge</div><h2>Symmetric <em>Triangle</em></h2></div><span class="topic-badge">Bilateral</span></div>
  <p class="sub">// Converging trendlines, no bias — the market is deciding</p>
  <p class="prose">The <strong>Symmetric Triangle</strong> has converging trendlines with lower highs and higher lows — the market is compressing, undecided. It can break either way. Most often continues the prior trend direction, but always wait for confirmation.</p>
  <div class="fb"><div class="fm">Target = Breakout point ± Width at base</div><div class="fd"><span>Breakout typically occurs</span> between 50-75% of the way to the apex. Breakouts too close to the apex often fail.</div></div>
  <div class="va"><div class="vl">// Symmetric Triangle — converging to apex</div><canvas id="symmetricTriangleCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume should progressively decrease as the triangle tightens. The breakout direction becomes the prevailing trend — don't try to predict, react.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Both sides converge to a point of maximum compression. In ML, the <a href="../../ml-math/#bias-variance" target="_blank" rel="noopener">bias-variance sweet spot</a> sits at the convergence of two opposing forces. In poetry, a <a href="../../poetry/forms/#villanelle" target="_blank" rel="noopener">villanelle</a> converges its two refrains in the final stanza.</div>
  <div class="topic-nav" id="nav-symmetric-triangle"></div>
</div>`;
}

function buildRisingWedge() {
  return `<div class="topic" id="rising-wedge">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">12 — Bilateral & Wedge</div><h2>Rising <em>Wedge</em></h2></div><span class="topic-badge">Bearish</span></div>
  <p class="sub">// Both lines slope up but converge — momentum is dying</p>
  <p class="prose">The <strong>Rising Wedge</strong> has both support and resistance sloping upward, but converging. Price is rising but the range is narrowing — momentum is exhausting. Usually resolves with a bearish breakdown.</p>
  <div class="fb"><div class="fm">Target = Breakdown − Height of wedge at widest</div><div class="fd"><span>Key difference from ascending triangle:</span> both lines slope up in a wedge, only one is flat in a triangle.</div></div>
  <div class="va"><div class="vl">// Rising Wedge — upward but weakening</div><canvas id="risingWedgeCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The rising wedge is deceptive — price is going up, but the narrowing range and declining volume signal that the advance is running out of steam.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Upward slopes narrowing — momentum fading despite higher prices. In ML, <a href="../../ml-math/#gradient" target="_blank" rel="noopener">vanishing gradients</a> show the same decaying energy. In poetry, <a href="../../poetry/rhetoric/#understatement" target="_blank" rel="noopener">understatement</a> quietly diminishes force even as the subject grows.</div>
  <div class="topic-nav" id="nav-rising-wedge"></div>
</div>`;
}

function buildFallingWedge() {
  return `<div class="topic" id="falling-wedge">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">13 — Bilateral & Wedge</div><h2>Falling <em>Wedge</em></h2></div><span class="topic-badge">Bullish</span></div>
  <p class="sub">// Both lines slope down but converge — selling is exhausting</p>
  <p class="prose">The <strong>Falling Wedge</strong> has both lines sloping downward and converging. Price is falling but the range is narrowing — sellers are losing conviction. Usually resolves with a bullish breakout.</p>
  <div class="fb"><div class="fm">Target = Breakout + Height of wedge at widest</div><div class="fd"><span>Falling wedges in downtrends</span> signal reversal; in uptrends, they're continuation patterns (a pullback before resuming).</div></div>
  <div class="va"><div class="vl">// Falling Wedge — downward but exhausting</div><canvas id="fallingWedgeCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The bullish resolution of a falling wedge is the mirror of the rising wedge's bearish resolution — both show momentum exhaustion.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Downward slopes narrowing — selling exhaustion. Like <a href="../../ml-math/#lr-schedule" target="_blank" rel="noopener">learning rate decay</a> approaching convergence: the steps shrink but the model is almost there. In poetry, a <a href="../../poetry/forms/#sestina" target="_blank" rel="noopener">sestina</a> circles through the same words with diminishing rotation.</div>
  <div class="topic-nav" id="nav-falling-wedge"></div>
</div>`;
}

function buildBroadeningFormation() {
  return `<div class="topic" id="broadening-formation">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">14 — Bilateral & Wedge</div><h2>Broadening <em>Formation</em></h2></div><span class="topic-badge">Megaphone</span></div>
  <p class="sub">// Diverging trendlines — expanding volatility, increasing disagreement</p>
  <p class="prose">The <strong>Broadening Formation</strong> (megaphone) has diverging trendlines — higher highs and lower lows. Volatility and disagreement are increasing. It often appears at major market tops and is one of the most difficult patterns to trade.</p>
  <div class="fb"><div class="fm">No clean measured move — trade the swings or wait for breakout</div><div class="fd"><span>Each swing is larger than the last,</span> swinging buyers and sellers into increasingly extreme positions.</div></div>
  <div class="va"><div class="vl">// Broadening Formation — diverging trendlines</div><canvas id="broadeningFormationCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Broadening formations reflect emotional extremes — they often appear during periods of uncertainty (elections, crises). The expanding range shows the market can't find consensus.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Expanding volatility — the market can’t agree on a price. In statistics, <a href="../../stats/#variance-std" target="_blank" rel="noopener">increasing variance</a> signals instability. In poetry, <a href="../../poetry/forms/#free-verse" target="_blank" rel="noopener">free verse</a> breaks expanding away from formal constraints.</div>
  <div class="topic-nav" id="nav-broadening-formation"></div>
</div>`;
}

function buildRectangle() {
  return `<div class="topic" id="rectangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">15 — Bilateral & Wedge</div><h2><em>Rectangle</em></h2></div><span class="topic-badge">Range</span></div>
  <p class="sub">// Horizontal support and resistance — a consolidation box</p>
  <p class="prose">The <strong>Rectangle</strong> is a horizontal consolidation range — price bounces between parallel support and resistance. It's a pause in the trend. Breakout direction usually follows the prior trend. The measured move is the rectangle's height.</p>
  <div class="fb"><div class="fm">Target = Breakout ± Height of rectangle</div><div class="fd"><span>Can be traded internally</span> (buy support, sell resistance) or by waiting for the breakout.</div></div>
  <div class="va"><div class="vl">// Rectangle — horizontal range</div><canvas id="rectangleCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The longer a rectangle persists, the more significant the eventual breakout — energy is building up like a compressed spring.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Price oscillating between two fixed bounds is a <a href="../../stats/#uniform" target="_blank" rel="noopener">uniform distribution</a> in action. In ML, <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch normalization</a> constrains activations to a bounded range. A <a href="../../poetry/forms/#couplet" target="_blank" rel="noopener">couplet</a> pairs two parallel lines in a bounded space.</div>
  <div class="topic-nav" id="nav-rectangle"></div>
</div>`;
}

function buildDoji() {
  return `<div class="topic" id="doji">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">16 — Candlestick Patterns</div><h2><em>Doji</em></h2></div><span class="topic-badge">Indecision</span></div>
  <p class="sub">// Open ≈ Close — the market is undecided</p>
  <p class="prose">A <strong>Doji</strong> forms when the open and close are nearly equal, creating a cross or plus shape. It signals indecision — neither buyers nor sellers won. Context is everything: at a trend extreme, it suggests reversal; mid-range, it's noise.</p>
  <div class="fb"><div class="fm">Variants: Standard (+), Long-legged, Dragonfly (T), Gravestone (⊥)</div><div class="fd"><span>A doji after a long green candle</span> suggests the uptrend may be stalling — buyers ran out of conviction.</div></div>
  <div class="va"><div class="vl">// Doji variants</div><canvas id="dojiCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> A single doji means nothing in isolation — it needs context. After a strong move, it's significant. In a sideways range, it's normal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Open equals close — perfect indecision, a <a href="../../stats/#mean-median" target="_blank" rel="noopener">mean equal to median</a> moment. In ML, a <a href="../../ml-math/#loss" target="_blank" rel="noopener">loss of zero</a> at a saddle point looks the same: no net direction. In poetry, <a href="../../poetry/rhetoric/#oxymoron" target="_blank" rel="noopener">oxymoron</a> holds two opposing forces in equal tension.</div>
  <div class="topic-nav" id="nav-doji"></div>
</div>`;
}

function buildHammer() {
  return `<div class="topic" id="hammer">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">17 — Candlestick Patterns</div><h2><em>Hammer</em></h2></div><span class="topic-badge">Bullish Reversal</span></div>
  <p class="sub">// Long lower shadow, small body at top — buyers reclaimed</p>
  <p class="prose">The <strong>Hammer</strong> has a small body at the top and a long lower shadow (≥2× body length). Sellers pushed price down during the session, but buyers pulled it back up. At a support level or downtrend base, it signals bullish reversal.</p>
  <div class="fb"><div class="fm">Lower shadow ≥ 2× body length, little or no upper shadow</div><div class="fd"><span>The "Hanging Man"</span> has the same shape but appears at tops — same candle, opposite meaning depending on context.</div></div>
  <div class="va"><div class="vl">// Hammer vs. Hanging Man</div><canvas id="hammerCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Color matters less than shape — a green hammer is slightly more bullish, but a red hammer at support is still a valid reversal signal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A long lower shadow rejected by buyers — the distribution of the session is <a href="../../stats/#skewness" target="_blank" rel="noopener">heavily skewed</a>. In ML, <a href="../../ml-math/#activation" target="_blank" rel="noopener">ReLU</a> similarly rejects negative values, keeping only the upside.</div>
  <div class="topic-nav" id="nav-hammer"></div>
</div>`;
}

function buildEngulfing() {
  return `<div class="topic" id="engulfing">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">18 — Candlestick Patterns</div><h2><em>Engulfing</em></h2></div><span class="topic-badge">Reversal</span></div>
  <p class="sub">// The second candle swallows the first — momentum shift</p>
  <p class="prose">An <strong>Engulfing</strong> pattern is a two-candle reversal. <strong>Bullish:</strong> small red candle followed by a larger green candle that completely covers the red body. <strong>Bearish:</strong> small green followed by a larger red that engulfs it.</p>
  <div class="fb"><div class="fm">Second body completely covers (engulfs) the first body</div><div class="fd"><span>The engulfing candle shows conviction</span> — the larger the second candle relative to the first, the stronger the signal.</div></div>
  <div class="va"><div class="vl">// Bullish and Bearish Engulfing</div><canvas id="engulfingCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Engulfing patterns at key support/resistance levels are far more significant than those in the middle of a range.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> One candle completely contains the prior — a <a href="../../stats/#variance-std" target="_blank" rel="noopener">variance expansion</a> in a single bar. In poetry, <a href="../../poetry/rhetoric/#hyperbole" target="_blank" rel="noopener">hyperbole</a> engulfs understatement, one figure swallowing another.</div>
  <div class="topic-nav" id="nav-engulfing"></div>
</div>`;
}

function buildMorningStar() {
  return `<div class="topic" id="morning-star">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">19 — Candlestick Patterns</div><h2>Morning <em>Star</em></h2></div><span class="topic-badge">Bullish 3-Candle</span></div>
  <p class="sub">// Long red → small star → long green — dawn after night</p>
  <p class="prose">The <strong>Morning Star</strong> is a three-candle bullish reversal. First, a long red candle (sellers in control). Then a small-bodied "star" (indecision — sellers exhausting). Finally, a long green candle (buyers take over). Named because it appears before dawn — the trend's darkest point.</p>
  <div class="fb"><div class="fm">Red (long) → Star (small, gapped) → Green (long)</div><div class="fd"><span>The star can be a doji</span> (called a "Morning Doji Star") — this strengthens the signal.</div></div>
  <div class="va"><div class="vl">// Morning Star formation</div><canvas id="morningStarCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The gap between the first candle and the star, and between the star and the third candle, adds to the signal's power — but the pattern works without gaps too.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A three-candle reversal: despair, indecision, hope. The same narrative arc as <a href="../../poetry/forms/#petrarchan-sonnet" target="_blank" rel="noopener">a Petrarchan sonnet</a> — octave sets the problem, volta turns, sestet resolves. In ML, <a href="../../ml-math/#lr-schedule" target="_blank" rel="noopener">warmup schedules</a> follow the same cold-start-to-recovery arc.</div>
  <div class="topic-nav" id="nav-morning-star"></div>
</div>`;
}

function buildEveningStar() {
  return `<div class="topic" id="evening-star">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">20 — Candlestick Patterns</div><h2>Evening <em>Star</em></h2></div><span class="topic-badge">Bearish 3-Candle</span></div>
  <p class="sub">// Long green → small star → long red — dusk after daylight</p>
  <p class="prose">The <strong>Evening Star</strong> is the bearish mirror. First, a long green candle (buyers confident). Then a small star (indecision at the top). Finally, a long red candle (sellers overwhelm). Named because the evening star appears before nightfall.</p>
  <div class="fb"><div class="fm">Green (long) → Star (small, gapped) → Red (long)</div><div class="fd"><span>The third candle should close</span> below the midpoint of the first candle for a strong signal.</div></div>
  <div class="va"><div class="vl">// Evening Star formation</div><canvas id="eveningStarCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Evening Stars at resistance levels or after extended rallies are the most reliable — they confirm the level and the exhaustion simultaneously.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The bearish mirror of morning star — hope, indecision, despair. In poetry, an <a href="../../poetry/forms/#elegy" target="_blank" rel="noopener">elegy</a> traces the same downward arc from vitality to mourning. In statistics, <a href="../../stats/#skewness" target="_blank" rel="noopener">negative skew</a> captures this tail of decline.</div>
  <div class="topic-nav" id="nav-evening-star"></div>
</div>`;
}

function buildSupportResistance() {
  return `<div class="topic" id="support-resistance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">21 — Structural Analysis</div><h2>Support & <em>Resistance</em></h2></div><span class="topic-badge">Levels</span></div>
  <p class="sub">// The floor and ceiling of price — where memory lives</p>
  <p class="prose"><strong>Support</strong> is a price level where buying concentrates (floor). <strong>Resistance</strong> is where selling concentrates (ceiling). These levels have "memory" — broken support becomes resistance, and broken resistance becomes support. This polarity principle is fundamental to all chart reading.</p>
  <div class="fb"><div class="fm">More touches = stronger level · Broken support → resistance (and vice versa)</div><div class="fd"><span>S&R levels are zones, not exact prices</span> — think of them as areas where orders cluster, not precise lines.</div></div>
  <div class="va"><div class="vl">// Support & Resistance — price memory</div><canvas id="supportResistanceCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Round numbers ($50, $100) and previous highs/lows create natural S&R levels because traders and algorithms place orders there.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Price memory at specific levels is <a href="../../markets/psychology/#anchoring" target="_blank" rel="noopener">anchoring bias</a> made visible. In ML, <a href="../../ml-math/#activation" target="_blank" rel="noopener">activation clamping</a> (ReLU at 0, sigmoid at 0/1) creates the same floor and ceiling. In poetry, <a href="../../poetry/forms/#blank-verse" target="_blank" rel="noopener">blank verse</a> has a metrical ceiling it never breaks.</div>
  <div class="topic-nav" id="nav-support-resistance"></div>
</div>`;
}

function buildTrendlines() {
  return `<div class="topic" id="trendlines">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">22 — Structural Analysis</div><h2><em>Trendlines</em></h2></div><span class="topic-badge">Diagonal</span></div>
  <p class="sub">// Connecting swing points — the direction of price flow</p>
  <p class="prose"><strong>Trendlines</strong> connect swing lows in an uptrend (ascending support) or swing highs in a downtrend (descending resistance). A valid trendline touches at least 3 points. The more touches and the longer the line, the more significant its break.</p>
  <div class="fb"><div class="fm">≥3 touches = valid · Steeper = less sustainable · Break = signal</div><div class="fd"><span>Draw trendlines from body to body</span> (closes not wicks) for more reliable levels, though both methods have advocates.</div></div>
  <div class="va"><div class="vl">// Trendline construction — connecting swings</div><canvas id="trendlinesCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Trendlines that are too steep are unsustainable — a sustainable uptrend is typically 30-45°. Steeper trendlines break sooner and are replaced by shallower ones.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drawing a line through successive highs or lows is literally <a href="../../ml-math/#linear" target="_blank" rel="noopener">linear regression</a> — the same best fit computed in statistics. In poetry, <a href="../../poetry/sound/#enjambment" target="_blank" rel="noopener">enjambment</a> carries meaning along a continuous line.</div>
  <div class="topic-nav" id="nav-trendlines"></div>
</div>`;
}

function buildChannels() {
  return `<div class="topic" id="channels">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">23 — Structural Analysis</div><h2><em>Channels</em></h2></div><span class="topic-badge">Parallel</span></div>
  <p class="sub">// Two parallel trendlines containing price</p>
  <p class="prose">A <strong>Channel</strong> consists of two parallel trendlines between which price oscillates. Ascending channels slope up (bullish), descending channels slope down (bearish), and horizontal channels are ranges. Price bouncing off both lines confirms the channel.</p>
  <div class="fb"><div class="fm">Trade the channel interior · Breakout signals new move</div><div class="fd"><span>Draw the primary trendline first</span> (connecting 3+ points), then create a parallel line through the opposite extreme.</div></div>
  <div class="va"><div class="vl">// Channel types — ascending, descending, horizontal</div><canvas id="channelsCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Channels provide both direction and range — buy the lower line, sell the upper line, and exit when price breaks through either boundary.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Parallel trendlines bounding price is a visual <a href="../../stats/#confidence-intervals" target="_blank" rel="noopener">confidence interval</a> — price stays within 2σ most of the time. In ML, <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch normalization</a> keeps activations channeled. <a href="../../poetry/forms/#ballad" target="_blank" rel="noopener">Ballad meter</a> channels rhythm between fixed beats.</div>
  <div class="topic-nav" id="nav-channels"></div>
</div>`;
}

function buildGaps() {
  return `<div class="topic" id="gaps">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">24 — Structural Analysis</div><h2><em>Gaps</em></h2></div><span class="topic-badge">Price Void</span></div>
  <p class="sub">// Empty space between candles — where no trading happened</p>
  <p class="prose"><strong>Gaps</strong> occur when price opens above the prior close (gap up) or below it (gap down), leaving a void. Four types: <strong>Common</strong> (noise, often fills), <strong>Breakaway</strong> (starts a new move), <strong>Runaway</strong> (continuation), <strong>Exhaustion</strong> (end of move).</p>
  <div class="fb"><div class="fm">Breakaway → starts move · Runaway → continues · Exhaustion → ends</div><div class="fd"><span>"Gaps always fill"</span> is a myth — breakaway and runaway gaps often don't fill for months or years.</div></div>
  <div class="va"><div class="vl">// Four types of gaps</div><canvas id="gapsCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume distinguishes gap types — breakaway gaps have high volume, runaway gaps have moderate volume, and exhaustion gaps have extreme volume followed by a reversal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A discontinuity where price jumps past a range. In statistics, <a href="../../stats/#outliers" target="_blank" rel="noopener">outliers</a> are the same — data points that break the expected distribution. In poetry, <a href="../../poetry/sound/#caesura" target="_blank" rel="noopener">caesura</a> is a gap in the line, a deliberate discontinuity.</div>
  <div class="topic-nav" id="nav-gaps"></div>
</div>`;
}

function buildCupAndHandle() {
  return `<div class="topic" id="cup-and-handle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">25 — Structural Analysis</div><h2>Cup & <em>Handle</em></h2></div><span class="topic-badge">Bullish</span></div>
  <p class="sub">// A rounded bottom with a brief consolidation — then breakout</p>
  <p class="prose">The <strong>Cup & Handle</strong>, popularized by William O'Neil, combines a rounded bottom (the cup) with a brief downward drift or consolidation (the handle) before breaking out to new highs. The cup should be a smooth U-shape, not a sharp V.</p>
  <div class="fb"><div class="fm">Target = Breakout + Depth of cup</div><div class="fd"><span>The handle should retrace</span> no more than 1/3 of the cup depth. Handle pullbacks of 8-12% are ideal (O'Neil guidelines).</div></div>
  <div class="va"><div class="vl">// Cup & Handle — anatomy and target</div><canvas id="cupAndHandleCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The handle represents the last group of sellers getting shaken out before the breakout. Its brevity and shallow depth signal strong underlying demand.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A U-shaped base then a small consolidation — the shape of <a href="../../ml-math/#lr-schedule" target="_blank" rel="noopener">cosine annealing</a> with a brief plateau before the final push. In poetry, an <a href="../../poetry/forms/#ode" target="_blank" rel="noopener">ode</a> builds through praise (the cup) then pauses to reflect (the handle) before its final flourish.</div>
  <div class="topic-nav" id="nav-cup-and-handle"></div>
</div>`;
}
