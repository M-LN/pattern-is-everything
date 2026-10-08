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
  { id:'head-and-shoulders', evidence:'heuristic', reviewed:'2026-10-02', num:'01', title:'Head & Shoulders', category:'Reversal Patterns', keywords:['reversal','top','neckline','left shoulder','right shoulder','bearish','breakdown'], content:'A three-peak pattern signaling a trend reversal — left shoulder, higher head, right shoulder. Breakdown below the neckline confirms the reversal.' },
  { id:'inverse-head-and-shoulders', evidence:'heuristic', reviewed:'2026-10-02', num:'02', title:'Inverse Head & Shoulders', category:'Reversal Patterns', keywords:['reversal','bottom','neckline','bullish','breakout','accumulation'], content:'The mirror image of H&S — three troughs with the middle lowest. A breakout above the neckline signals a bullish reversal.' },
  { id:'double-top', evidence:'heuristic', reviewed:'2026-10-02', num:'03', title:'Double Top', category:'Reversal Patterns', keywords:['reversal','M pattern','resistance','two peaks','bearish','neckline'], content:'Price hits the same resistance twice, forming an "M" shape. Failure to break higher on the second attempt signals bearish reversal.' },
  { id:'double-bottom', evidence:'heuristic', reviewed:'2026-10-02', num:'04', title:'Double Bottom', category:'Reversal Patterns', keywords:['reversal','W pattern','support','two troughs','bullish','neckline'], content:'Price tests the same support twice, forming a "W" shape. The second bounce confirms the support and signals bullish reversal.' },
  { id:'rounding-bottom', evidence:'heuristic', reviewed:'2026-10-02', num:'05', title:'Rounding Bottom', category:'Reversal Patterns', keywords:['saucer','gradual reversal','accumulation','long-term','bullish','U-shape'], content:'A gradual U-shaped reversal over weeks or months — selling pressure slowly gives way to buying. Signals a long-term bullish reversal.' },
  { id:'bull-flag', evidence:'heuristic', reviewed:'2026-10-02', num:'06', title:'Bull Flag', category:'Continuation Patterns', keywords:['continuation','flag','pole','bullish','consolidation','breakout','trend'], content:'A sharp rally (pole) followed by a downward-sloping consolidation (flag). Breakout above the flag continues the uptrend. High reliability.' },
  { id:'bear-flag', evidence:'heuristic', reviewed:'2026-10-02', num:'07', title:'Bear Flag', category:'Continuation Patterns', keywords:['continuation','flag','pole','bearish','consolidation','breakdown','trend'], content:'A sharp decline (pole) followed by an upward-sloping consolidation (flag). Breakdown below continues the downtrend.' },
  { id:'pennant', evidence:'heuristic', reviewed:'2026-10-02', num:'08', title:'Pennant', category:'Continuation Patterns', keywords:['continuation','triangle','converging','small','brief','breakout','symmetrical'], content:'A small symmetrical triangle after a strong move — converging trendlines over a brief period. Breakout follows the prior trend direction.' },
  { id:'ascending-triangle', evidence:'heuristic', reviewed:'2026-10-02', num:'09', title:'Ascending Triangle', category:'Continuation Patterns', keywords:['continuation','flat top','rising lows','bullish','resistance','breakout'], content:'Flat resistance top with rising lows — buyers are increasingly aggressive. Usually breaks upward with a measured move equal to the triangle height.' },
  { id:'descending-triangle', evidence:'heuristic', reviewed:'2026-10-02', num:'10', title:'Descending Triangle', category:'Continuation Patterns', keywords:['continuation','flat bottom','falling highs','bearish','support','breakdown'], content:'Flat support bottom with falling highs — sellers are increasingly aggressive. Usually breaks downward. The mirror of ascending triangle.' },
  { id:'symmetric-triangle', evidence:'heuristic', reviewed:'2026-10-02', num:'11', title:'Symmetric Triangle', category:'Bilateral & Wedge', keywords:['bilateral','converging','neutral','breakout either way','indecision','apex'], content:'Converging trendlines with lower highs and higher lows — the market is undecided. Can break either direction; watch volume for confirmation.' },
  { id:'rising-wedge', evidence:'heuristic', reviewed:'2026-10-02', num:'12', title:'Rising Wedge', category:'Bilateral & Wedge', keywords:['bearish','converging up','weakening momentum','breakdown','exhaustion','distribution'], content:'Both trendlines slope upward but converge — the advance is weakening. Usually resolves with a bearish breakdown. Found at tops and in downtrends.' },
  { id:'falling-wedge', evidence:'heuristic', reviewed:'2026-10-02', num:'13', title:'Falling Wedge', category:'Bilateral & Wedge', keywords:['bullish','converging down','weakening selling','breakout','exhaustion','accumulation'], content:'Both trendlines slope downward but converge — selling pressure is weakening. Usually resolves with a bullish breakout.' },
  { id:'broadening-formation', evidence:'heuristic', reviewed:'2026-10-02', num:'14', title:'Broadening Formation', category:'Bilateral & Wedge', keywords:['megaphone','expanding range','volatility','diverging trendlines','instability','reversal'], content:'Diverging trendlines — higher highs and lower lows — indicating increasing volatility and disagreement. Often appears at major tops.' },
  { id:'rectangle', evidence:'heuristic', reviewed:'2026-10-02', num:'15', title:'Rectangle', category:'Bilateral & Wedge', keywords:['range','consolidation','horizontal','support','resistance','breakout either way'], content:'Price bounces between parallel horizontal support and resistance — a consolidation zone. Breakout direction continues the prior trend (usually).' },
  { id:'doji', evidence:'heuristic', reviewed:'2026-10-02', num:'16', title:'Doji', category:'Candlestick Patterns', keywords:['indecision','equal open close','cross','neutral','reversal signal','context'], content:'Open and close are nearly equal — a "+" shaped candle. It signals indecision. At a trend extreme, it can signal reversal; in a range, it means nothing.' },
  { id:'hammer', evidence:'heuristic', reviewed:'2026-10-02', num:'17', title:'Hammer', category:'Candlestick Patterns', keywords:['reversal','long lower shadow','bullish','support','rejection','inverted hammer'], content:'Small body at the top, long lower shadow — sellers pushed price down but buyers reclaimed it. At a bottom, it signals bullish reversal. Its inverse (hanging man) appears at tops.' },
  { id:'engulfing', evidence:'heuristic', reviewed:'2026-10-02', num:'18', title:'Engulfing', category:'Candlestick Patterns', keywords:['reversal','two candle','bullish engulfing','bearish engulfing','body covers','momentum shift'], content:'A two-candle pattern where the second body completely covers the first. Bullish engulfing: small red → large green. Bearish engulfing: small green → large red.' },
  { id:'morning-star', evidence:'heuristic', reviewed:'2026-10-02', num:'19', title:'Morning Star', category:'Candlestick Patterns', keywords:['reversal','three candle','bullish','bottom','gap down','gap up','hope'], content:'Three-candle bullish reversal: long red → small-bodied candle (the "star") → long green. The star represents the turning point between selling and buying.' },
  { id:'evening-star', evidence:'heuristic', reviewed:'2026-10-02', num:'20', title:'Evening Star', category:'Candlestick Patterns', keywords:['reversal','three candle','bearish','top','gap up','gap down','warning'], content:'Three-candle bearish reversal: long green → small-bodied star → long red. The mirror image of morning star, appearing at trend peaks.' },
  { id:'support-resistance', evidence:'heuristic', reviewed:'2026-10-02', num:'21', title:'Support & Resistance', category:'Structural Analysis', keywords:['levels','horizontal','price memory','floor','ceiling','breakout','retest'], content:'Price levels where buying (support) or selling (resistance) has historically concentrated. These levels have "memory" — broken support becomes resistance and vice versa.' },
  { id:'trendlines', evidence:'heuristic', reviewed:'2026-10-02', num:'22', title:'Trendlines', category:'Structural Analysis', keywords:['diagonal','connecting lows','connecting highs','slope','trend direction','break'], content:'Diagonal lines connecting swing lows (uptrend) or swing highs (downtrend). A valid trendline touches at least 3 points. More touches = more significant.' },
  { id:'channels', evidence:'heuristic', reviewed:'2026-10-02', num:'23', title:'Channels', category:'Structural Analysis', keywords:['parallel trendlines','range','ascending channel','descending channel','trade within'], content:'Two parallel trendlines containing price action — an ascending channel for uptrends, descending for downtrends. Price oscillates between the boundaries.' },
  { id:'gaps', evidence:'heuristic', reviewed:'2026-10-02', num:'24', title:'Gaps', category:'Structural Analysis', keywords:['breakaway','runaway','exhaustion','common','opening gap','price void','fill'], content:'Price voids between closes and opens. Breakaway gaps start moves, runaway gaps continue them, exhaustion gaps end them. "Do gaps always fill?" — some do, some don\'t.' },
  { id:'cup-and-handle', evidence:'heuristic', reviewed:'2026-10-02', num:'25', title:'Cup & Handle', category:'Structural Analysis', keywords:['continuation','rounded bottom','handle','breakout','consolidation','bullish','O\'Neil'], content:'A rounded bottom (cup) followed by a small consolidation (handle) before breakout. Popularized by William O\'Neil. The measured move target equals the cup depth.' },
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

/* depth:start — generated from the scratch scripts chart_snippets.py / chart_depth.py; each
   worked example is the output of the code shown, run on the data shown with it. */
const TOPIC_DEPTH = {
 "head-and-shoulders": {
  "example": "Left shoulder 108 (day 5), head 115 (day 14), right shoulder 109 (day 22), and both troughs between them at 100 — the neckline. The shoulders are within 1% of each other and the head clears both; day 26 closes at 99, below the neckline, which confirms it. Measured move: 100 − (115 − 100) = <strong>85</strong>.",
  "fails": [
   "In real time the right shoulder is just a rally until the neckline breaks, and many necklines never break. The pattern is easiest to see afterwards.",
   "The measured move is a rule of thumb; prices often stop short of it, and a pullback to the neckline after the break is common.",
   "Studies differ: some find information in the pattern (Osler &amp; Chang 1995 in currencies; Savin, Weller &amp; Zvingelis 2007 in U.S. stocks), but not a rule to trade blindly."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nls, head, rs = highs.iloc[-3:]                       # left shoulder, head, right shoulder\nbetween = lows[(lows.index &gt; highs.index[-3]) &amp; (lows.index &lt; highs.index[-1])]\nneck = between.mean()                                # neckline (flat here)\nis_hs = head &gt; max(ls, rs) and abs(ls - rs) / head &lt; 0.05\ntarget = neck - (head - neck)                        # measured move\nconfirmed = c.iloc[-1] &lt; neck",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "G. Savin, P. Weller &amp; J. Zvingelis, “The Predictive Power of ‘Head-and-Shoulders’ Price Patterns in the U.S. Stock Market”, <em>Journal of Financial Econometrics</em> 5(2), 2007",
   "C. L. Osler &amp; P. H. K. Chang, “Head and Shoulders: Not Just a Flaky Pattern”, Federal Reserve Bank of New York Staff Report 4, 1995"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>95</td></tr><tr><td>5</td><td>108</td></tr><tr><td>9</td><td>100</td></tr><tr><td>14</td><td>115</td></tr><tr><td>18</td><td>100</td></tr><tr><td>22</td><td>109</td></tr><tr><td>26</td><td>99</td></tr><tr><td>30</td><td>92</td></tr></tbody></table></div></details>"
 },
 "inverse-head-and-shoulders": {
  "example": "Troughs at 92, 85 (the head) and 91, with the peaks between them at 100. Day 26 closes at 101, above the neckline. Measured move: 100 + (100 − 85) = <strong>115</strong>.",
  "fails": [
   "Bottoms take longer to form than tops, and many “left shoulders” are just the first bounce in a longer fall.",
   "Edwards and Magee wanted rising volume on the break; without it the signal is weaker.",
   "The target is a rule of thumb; check it against the next resistance overhead."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nls, head, rs = lows.iloc[-3:]                        # the three troughs\nbetween = highs[(highs.index &gt; lows.index[-3]) &amp; (highs.index &lt; lows.index[-1])]\nneck = between.mean()\nis_ihs = head &lt; min(ls, rs) and abs(ls - rs) / head &lt; 0.05\ntarget = neck + (neck - head)\nconfirmed = c.iloc[-1] &gt; neck",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "A. W. Lo, H. Mamaysky &amp; J. Wang, “Foundations of Technical Analysis: Computational Algorithms, Statistical Inference, and Empirical Implementation”, <em>Journal of Finance</em> 55(4), 2000 — patterns found by an algorithm like the one below, tested on U.S. stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>105</td></tr><tr><td>5</td><td>92</td></tr><tr><td>9</td><td>100</td></tr><tr><td>14</td><td>85</td></tr><tr><td>18</td><td>100</td></tr><tr><td>22</td><td>91</td></tr><tr><td>26</td><td>101</td></tr><tr><td>30</td><td>108</td></tr></tbody></table></div></details>"
 },
 "double-top": {
  "example": "Tops at 110 (day 6) and 109.5 (day 17), within 0.5% of each other, with a valley at 100 between. The pattern exists only once the price closes below the valley, as it does on day 22 (99). Measured move: 100 − (110 − 100) = <strong>90</strong>.",
  "fails": [
   "Until the valley breaks it is just two similar highs, and in an uptrend those are often followed by a third, higher one.",
   "How equal is “equal” is a choice (2% here); loosen it and double tops appear everywhere.",
   "After the break the price often comes back to test the valley from below."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nt1, t2 = highs.iloc[-2:]\nvalley = lows[(lows.index &gt; highs.index[-2]) &amp; (lows.index &lt; highs.index[-1])].min()\nis_dt = abs(t1 - t2) / max(t1, t2) &lt; 0.02            # tops within 2%\ntarget = valley - (max(t1, t2) - valley)\nconfirmed = c.iloc[-1] &lt; valley",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>90</td></tr><tr><td>6</td><td>110</td></tr><tr><td>11</td><td>100</td></tr><tr><td>17</td><td>109.5</td></tr><tr><td>22</td><td>99</td></tr><tr><td>26</td><td>94</td></tr></tbody></table></div></details>"
 },
 "double-bottom": {
  "example": "Bottoms at 90 (day 6) and 90.5 (day 17), with a peak at 100 between. Day 22 closes at 101, above the peak. Measured move: 100 + (100 − 90) = <strong>110</strong>.",
  "fails": [
   "A second low slightly under the first is usually still read as a double bottom; the definition traders use is looser than any code.",
   "Buying before the peak breaks anticipates a pattern that may never complete.",
   "The target is rough; the next resistance level matters more."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nb1, b2 = lows.iloc[-2:]\npeak = highs[(highs.index &gt; lows.index[-2]) &amp; (highs.index &lt; lows.index[-1])].max()\nis_db = abs(b1 - b2) / min(b1, b2) &lt; 0.02\ntarget = peak + (peak - min(b1, b2))\nconfirmed = c.iloc[-1] &gt; peak",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>110</td></tr><tr><td>6</td><td>90</td></tr><tr><td>11</td><td>100</td></tr><tr><td>17</td><td>90.5</td></tr><tr><td>22</td><td>101</td></tr><tr><td>26</td><td>106</td></tr></tbody></table></div></details>"
 },
 "rounding-bottom": {
  "example": "Forty-one days that fall from 110 to 90 and climb back. Fitting y = a·x² + b·x + k gives a = 0.05 (positive, so a U) with the turn at day 20, the middle of the window. Measured from the rim: 110 + (110 − 90) = <strong>130</strong>. Many traders use a smaller target; the full depth is the optimistic version.",
  "fails": [
   "It takes weeks or months to form, and the right side looks like any rebound until the rim is reached.",
   "A quadratic fits any dip that recovers; the fit says the shape is round, not that the rise will continue.",
   "Few formal studies test it; the evidence is mostly practitioner counts."
  ],
  "code": "y = df['close'].iloc[-41:].values\nx = np.arange(len(y))\na, b, k = np.polyfit(x, y, 2)                         # y ≈ a·x² + b·x + k\nvertex = -b / (2 * a)                                 # where the curve turns\nis_round = a &gt; 0 and 0.3 &lt; vertex / len(x) &lt; 0.7     # a U, bottoming near the middle\nrim, bottom = max(y[0], y[-1]), y.min()\ntarget = rim + (rim - bottom)",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">A U from 110 (day 0) down to 90 (day 20) and back to 110 (day 40), as daily closes; high and low are half a point either side of each bar.</p></details>"
 },
 "bull-flag": {
  "example": "A pole from 100 to 115 in five days, then eleven days drifting down to 110 (a fitted slope of −0.32 a day). Day 16 closes at 116, above the flag’s high of 115. Measured move: 115 + 15 = <strong>130</strong>.",
  "fails": [
   "A flag that drifts too long, or gives back most of the pole, is no longer a pause but a reversal.",
   "On real data the pole and flag lengths have to be chosen; the 5 and 11 bars here are fixed to this example.",
   "The target assumes the second leg equals the first, and it often falls short."
  ],
  "code": "c = df['close']\npole = c.iloc[-12] - c.iloc[-17]                      # the 5-bar rise\nflag = c.iloc[-12:-1]                                 # the 11 bars after it\nslope = np.polyfit(np.arange(len(flag)), flag.values, 1)[0]\nis_flag = pole / c.iloc[-17] &gt; 0.08 and slope &lt; 0     # sharp rise, then a drift down\nbreakout = c.iloc[-1] &gt; flag.max()\ntarget = flag.max() + pole",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>5</td><td>115</td></tr><tr><td>7</td><td>112</td></tr><tr><td>9</td><td>114</td></tr><tr><td>11</td><td>111</td></tr><tr><td>13</td><td>113</td></tr><tr><td>15</td><td>110</td></tr><tr><td>16</td><td>116</td></tr></tbody></table></div></details>"
 },
 "bear-flag": {
  "example": "A pole from 100 down to 85 in five days, then eleven days drifting up to 90 (slope +0.32 a day). Day 16 closes at 84, below the flag’s low of 85. Measured move: 85 − 15 = <strong>70</strong>.",
  "fails": [
   "A slow, long rise after the fall is more likely the start of a recovery than a pause.",
   "Short sellers covering can turn the breakdown into a sharp reversal.",
   "As with the bull flag, the target assumes a second leg as long as the first."
  ],
  "code": "c = df['close']\npole = c.iloc[-17] - c.iloc[-12]                      # the 5-bar fall\nflag = c.iloc[-12:-1]\nslope = np.polyfit(np.arange(len(flag)), flag.values, 1)[0]\nis_flag = pole / c.iloc[-17] &gt; 0.08 and slope &gt; 0     # sharp fall, then a drift up\nbreakdown = c.iloc[-1] &lt; flag.min()\ntarget = flag.min() - pole",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>5</td><td>85</td></tr><tr><td>7</td><td>88</td></tr><tr><td>9</td><td>86</td></tr><tr><td>11</td><td>89</td></tr><tr><td>13</td><td>87</td></tr><tr><td>15</td><td>90</td></tr><tr><td>16</td><td>84</td></tr></tbody></table></div></details>"
 },
 "pennant": {
  "example": "After a pole from 100 to 115, the swing highs fall (114, then 113) while the swing lows rise (110, then 111): the range converges. Day 16 closes at 117, above the last swing high; measured from it, 113 + 15 = <strong>128</strong>.",
  "fails": [
   "With two highs and two lows, “converging” is easy to find in noise.",
   "Pennants are short by definition (one to three weeks); a longer one is usually treated as a symmetric triangle.",
   "It does not say which way it will break until it does."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\npole = c.iloc[-12] - c.iloc[-17]\nhi, lo = swings(c.iloc[-12:-1], n=1)                 # swings inside the pennant\nconverging = hi.is_monotonic_decreasing and lo.is_monotonic_increasing\nbreakout = c.iloc[-1] &gt; hi.iloc[-1]\ntarget = hi.iloc[-1] + pole",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>5</td><td>115</td></tr><tr><td>7</td><td>110</td></tr><tr><td>9</td><td>114</td></tr><tr><td>11</td><td>111</td></tr><tr><td>13</td><td>113</td></tr><tr><td>15</td><td>112</td></tr><tr><td>16</td><td>117</td></tr></tbody></table></div></details>"
 },
 "ascending-triangle": {
  "example": "Three swing highs at 110 — a flat ceiling — and rising swing lows at 100, 104 and 107. Day 27 closes at 114, above the ceiling. The widest part is 110 − 100 = 10, so the target is 110 + 10 = <strong>120</strong>.",
  "fails": [
   "The ceiling can hold; rising lows do not guarantee a break, and a close back under the ceiling after a break is a common failure.",
   "“Flat” needs a tolerance (1% here), and which triangles you find depends on it.",
   "Bulkowski’s counts show ascending triangles also break downward a meaningful share of the time."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\ntop, rises = highs.iloc[-3:], lows.iloc[-3:]\nflat_top = (top.max() - top.min()) / top.mean() &lt; 0.01\nrising = rises.is_monotonic_increasing\nheight = top.mean() - rises.iloc[0]\nbreakout = c.iloc[-1] &gt; top.max()\ntarget = top.mean() + height",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>95</td></tr><tr><td>4</td><td>110</td></tr><tr><td>8</td><td>100</td></tr><tr><td>12</td><td>110</td></tr><tr><td>16</td><td>104</td></tr><tr><td>20</td><td>110</td></tr><tr><td>24</td><td>107</td></tr><tr><td>27</td><td>114</td></tr></tbody></table></div></details>"
 },
 "descending-triangle": {
  "example": "A flat floor at 90 (three swing lows) under falling highs at 105, 100 and 96. Day 27 closes at 86, below the floor. Height 105 − 90 = 15, so the target is 90 − 15 = <strong>75</strong>.",
  "fails": [
   "The floor can hold; falling highs do not guarantee a break down.",
   "Breaks below a well-watched floor attract buyers as well as sellers, and quick reversals back above it are common.",
   "The tolerance for a “flat” floor decides which triangles you find."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nfloor, falls = lows.iloc[-3:], highs.iloc[-3:]\nflat_floor = (floor.max() - floor.min()) / floor.mean() &lt; 0.01\nfalling = falls.is_monotonic_decreasing\nheight = falls.iloc[0] - floor.mean()\nbreakdown = c.iloc[-1] &lt; floor.min()\ntarget = floor.mean() - height",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>4</td><td>90</td></tr><tr><td>8</td><td>105</td></tr><tr><td>12</td><td>90</td></tr><tr><td>16</td><td>100</td></tr><tr><td>20</td><td>90</td></tr><tr><td>24</td><td>96</td></tr><tr><td>27</td><td>86</td></tr></tbody></table></div></details>"
 },
 "symmetric-triangle": {
  "example": "Highs falling (112, 108, 105) and lows rising (92, 96, 99), using swings over five bars. The widest part is 112 − 92 = 20. Day 21 closes at 107, above the last high, so the measured move is 107 + 20 = <strong>127</strong>.",
  "fails": [
   "It has no direction until it breaks; reading the prior trend into it is a guess.",
   "Edwards and Magee found breaks most reliable between half and three-quarters of the way to the apex; late breaks are weaker.",
   "False breaks that fall back into the triangle are common."
  ],
  "code": "def swings(s, n=2):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nhi, lo = highs.iloc[-3:], lows.iloc[-3:]\nsymmetric = hi.is_monotonic_decreasing and lo.is_monotonic_increasing\nheight = hi.iloc[0] - lo.iloc[0]                     # the widest part\nbreakout = c.iloc[-1] &gt; hi.iloc[-1]\ntarget = c.iloc[-1] + height",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>3</td><td>112</td></tr><tr><td>6</td><td>92</td></tr><tr><td>9</td><td>108</td></tr><tr><td>12</td><td>96</td></tr><tr><td>15</td><td>105</td></tr><tr><td>18</td><td>99</td></tr><tr><td>21</td><td>107</td></tr></tbody></table></div></details>"
 },
 "rising-wedge": {
  "example": "Swing highs at 105, 108 and 110, swing lows at 95, 101 and 106: both lines rise, but the lows faster (1.0 a day against 0.42), so the range narrows. Day 21 closes at 100, below the last swing low; the usual target is where the wedge began, <strong>95</strong>.",
  "fails": [
   "A rising wedge can break upward too; the bearish reading is a tendency, not a rule.",
   "Lines through three points each make the slopes very sensitive to which swings you pick.",
   "“Back to the start” is a convention, not a measured move."
  ],
  "code": "def swings(s, n=2):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nhi, lo = highs.iloc[-3:], lows.iloc[-3:]\nhs = np.polyfit(hi.index, hi.values, 1)[0]           # slope of the upper line\nls = np.polyfit(lo.index, lo.values, 1)[0]           # slope of the lower line\nis_wedge = hs &gt; 0 and ls &gt; hs                         # both rise, the lows faster\nbreakdown = c.iloc[-1] &lt; lo.iloc[-1]\ntarget = lo.iloc[0]                                   # back to where the wedge began",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>93</td></tr><tr><td>3</td><td>105</td></tr><tr><td>6</td><td>95</td></tr><tr><td>9</td><td>108</td></tr><tr><td>12</td><td>101</td></tr><tr><td>15</td><td>110</td></tr><tr><td>18</td><td>106</td></tr><tr><td>21</td><td>100</td></tr></tbody></table></div></details>"
 },
 "falling-wedge": {
  "example": "Swing highs at 110, 104 and 100, swing lows at 95, 93 and 92: both lines fall, the highs faster (−0.83 a day against −0.25). Day 21 closes at 103, above the last high; the usual target is the wedge’s first high, <strong>110</strong>.",
  "fails": [
   "A falling wedge can keep falling; the bullish reading is a tendency, not a rule.",
   "With few swings the two slopes are fragile, and a single new low changes the pattern.",
   "The target is a convention, not a measured move."
  ],
  "code": "def swings(s, n=2):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nhi, lo = highs.iloc[-3:], lows.iloc[-3:]\nhs = np.polyfit(hi.index, hi.values, 1)[0]\nls = np.polyfit(lo.index, lo.values, 1)[0]\nis_wedge = ls &lt; 0 and hs &lt; ls                         # both fall, the highs faster\nbreakout = c.iloc[-1] &gt; hi.iloc[-1]\ntarget = hi.iloc[0]",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>105</td></tr><tr><td>3</td><td>110</td></tr><tr><td>6</td><td>95</td></tr><tr><td>9</td><td>104</td></tr><tr><td>12</td><td>93</td></tr><tr><td>15</td><td>100</td></tr><tr><td>18</td><td>92</td></tr><tr><td>21</td><td>103</td></tr></tbody></table></div></details>"
 },
 "broadening-formation": {
  "example": "Swing highs at 105, 108 and 111, swing lows at 95, 92 and 89: each swing reaches further than the last (widths 10, 16 and 22). There is no measured move — the pattern describes growing volatility and disagreement, not a direction.",
  "fails": [
   "There is no clean entry: by the time three widening swings are visible, the next one is already large.",
   "Widening swings mean wider stops, so position size has to shrink to keep the same risk.",
   "Edwards and Magee treated it as a mostly bearish top; later counts are mixed."
  ],
  "code": "def swings(s, n=2):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nhi, lo = highs.iloc[-3:], lows.iloc[-3:]\nbroadening = hi.is_monotonic_increasing and lo.is_monotonic_decreasing\nwidth = (hi.values - lo.values)                       # how far each swing reached",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>3</td><td>105</td></tr><tr><td>6</td><td>95</td></tr><tr><td>9</td><td>108</td></tr><tr><td>12</td><td>92</td></tr><tr><td>15</td><td>111</td></tr><tr><td>18</td><td>89</td></tr><tr><td>21</td><td>95</td></tr></tbody></table></div></details>"
 },
 "rectangle": {
  "example": "Three highs at 110 and three lows at 100: a 10-point range. Day 27 closes at 112, above the top; the target is 110 + 10 = <strong>120</strong>.",
  "fails": [
   "Inside the range the opposite trade works — sell the top, buy the bottom — so breakout and range traders take turns being wrong until it breaks.",
   "Breaks that return into the range are common; many traders wait for a second close outside it.",
   "Each test of an edge is also read as weakening it, so the same history supports both “it will hold” and “it will break”."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\ntop, bottom = highs.iloc[-3:].mean(), lows.iloc[-3:].mean()\nflat = highs.iloc[-3:].std() / top &lt; 0.01 and lows.iloc[-3:].std() / bottom &lt; 0.01\nheight = top - bottom\nbreakout = c.iloc[-1] &gt; top\ntarget = top + height",
  "sources": [
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns",
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>100</td></tr><tr><td>4</td><td>110</td></tr><tr><td>8</td><td>100</td></tr><tr><td>12</td><td>110</td></tr><tr><td>16</td><td>100</td></tr><tr><td>20</td><td>110</td></tr><tr><td>24</td><td>100</td></tr><tr><td>27</td><td>112</td></tr></tbody></table></div></details>"
 },
 "doji": {
  "example": "The last bar opens at 100.2 and closes at 100.0, inside a range of 98 to 102: a body of 0.2 against a range of 4, or 5%. Under the 10% threshold, so a doji — after two down days, a session where neither side won.",
  "fails": [
   "It signals indecision, not reversal; the next bar decides, and on its own a doji predicts little.",
   "The 10% threshold is arbitrary, and on quiet days many bars qualify.",
   "Opening and closing prices differ slightly between data vendors, so whether a bar is a doji can depend on the source."
  ],
  "code": "o, h, l, c = df.iloc[-1][['open', 'high', 'low', 'close']]\nbody, rng = abs(c - o), h - l\nis_doji = body &lt;= 0.1 * rng                           # body under 10% of the day's range",
  "sources": [
   "<em>Japanese Candlestick Charting Techniques</em>, S. Nison, New York Institute of Finance, 1991",
   "B. R. Marshall, M. R. Young &amp; L. C. Rose, “Candlestick technical trading strategies: Can they create value for investors?”, <em>Journal of Banking &amp; Finance</em> 30(8), 2006 — they found none on Dow Jones stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>103</td><td>104</td><td>101.5</td><td>102</td></tr><tr><td>2</td><td>102</td><td>102.5</td><td>100</td><td>100.5</td></tr><tr><td>3</td><td>100.2</td><td>102</td><td>98</td><td>100</td></tr></tbody></table></div></details>"
 },
 "hammer": {
  "example": "After two lower closes the last bar opens at 100, falls to 96, and closes at 100.8 near its high of 101. Body 0.8, lower shadow 4 (five times the body), upper shadow 0.2: a hammer. Sellers pushed the price down 4 points and buyers took it all back.",
  "fails": [
   "It needs a decline before it; the same bar after a rise is a “hanging man” and read the opposite way.",
   "Most definitions require confirmation — a higher close the next day. Without it the bar is just a long shadow.",
   "Tests of candlestick rules on U.S. stocks found no value after costs (Marshall, Young &amp; Rose 2006)."
  ],
  "code": "o, h, l, c = df.iloc[-1][['open', 'high', 'low', 'close']]\nbody = abs(c - o)\nlower = min(o, c) - l                                 # lower shadow\nupper = h - max(o, c)                                 # upper shadow\nafter_fall = df['close'].iloc[-3] &gt; df['close'].iloc[-2]\nis_hammer = after_fall and lower &gt;= 2 * body and upper &lt;= body",
  "sources": [
   "<em>Japanese Candlestick Charting Techniques</em>, S. Nison, New York Institute of Finance, 1991",
   "B. R. Marshall, M. R. Young &amp; L. C. Rose, “Candlestick technical trading strategies: Can they create value for investors?”, <em>Journal of Banking &amp; Finance</em> 30(8), 2006 — they found none on Dow Jones stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>104</td><td>104.5</td><td>102</td><td>102.5</td></tr><tr><td>2</td><td>102.5</td><td>103</td><td>100.5</td><td>101</td></tr><tr><td>3</td><td>100</td><td>101</td><td>96</td><td>100.8</td></tr></tbody></table></div></details>"
 },
 "engulfing": {
  "example": "Yesterday was red, from 102 down to 100. Today opens at 99.5 and closes at 102.5: its body covers yesterday’s completely. A bullish engulfing pair.",
  "fails": [
   "It depends on gaps between sessions, so it is common on daily stock charts and rare on round-the-clock markets, where each open is the previous close.",
   "After a long decline it reads as a reversal; inside a range it means little.",
   "The evidence for one- and two-bar candle signals is weak (Marshall, Young &amp; Rose 2006)."
  ],
  "code": "(o1, c1), (o2, c2) = df[['open', 'close']].iloc[-2], df[['open', 'close']].iloc[-1]\nbullish = c1 &lt; o1 and c2 &gt; o2 and o2 &lt;= c1 and c2 &gt;= o1   # today's body covers yesterday's",
  "sources": [
   "<em>Japanese Candlestick Charting Techniques</em>, S. Nison, New York Institute of Finance, 1991",
   "B. R. Marshall, M. R. Young &amp; L. C. Rose, “Candlestick technical trading strategies: Can they create value for investors?”, <em>Journal of Banking &amp; Finance</em> 30(8), 2006 — they found none on Dow Jones stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>103</td><td>103.5</td><td>101.5</td><td>102</td></tr><tr><td>2</td><td>102</td><td>102.5</td><td>99.5</td><td>100</td></tr><tr><td>3</td><td>99.5</td><td>103</td><td>99.2</td><td>102.5</td></tr></tbody></table></div></details>"
 },
 "morning-star": {
  "example": "Day 1 is a long red bar from 105 to 100. Day 2 has a small body (99 to 99.3) that gaps below day 1’s close. Day 3 is green and closes at 103.5, above day 1’s midpoint of 102.5. All four conditions hold: a morning star.",
  "fails": [
   "Three bars leave many ways to bend the definition (how long, how small, gap or not), and results depend on the exact rules.",
   "On markets that trade around the clock the required gap rarely exists.",
   "Nison presents it as a reversal sign in context — at support, after a decline — not as a signal on its own."
  ],
  "code": "d1, d2, d3 = df.iloc[-3], df.iloc[-2], df.iloc[-1]\nlong_red = d1.open - d1.close &gt; 0.6 * (d1.high - d1.low)\nsmall = abs(d2.close - d2.open) &lt; 0.3 * abs(d1.close - d1.open)\ngap_down = max(d2.open, d2.close) &lt; d1.close\nmid = (d1.open + d1.close) / 2\nstrong_green = d3.close &gt; d3.open and d3.close &gt; mid\nis_morning_star = long_red and small and gap_down and strong_green",
  "sources": [
   "<em>Japanese Candlestick Charting Techniques</em>, S. Nison, New York Institute of Finance, 1991",
   "B. R. Marshall, M. R. Young &amp; L. C. Rose, “Candlestick technical trading strategies: Can they create value for investors?”, <em>Journal of Banking &amp; Finance</em> 30(8), 2006 — they found none on Dow Jones stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>105</td><td>105.5</td><td>99.5</td><td>100</td></tr><tr><td>2</td><td>99</td><td>99.8</td><td>98.5</td><td>99.3</td></tr><tr><td>3</td><td>100</td><td>103.8</td><td>99.8</td><td>103.5</td></tr></tbody></table></div></details>"
 },
 "evening-star": {
  "example": "Day 1 is a long green bar from 100 to 105. Day 2 has a small body (106 to 105.7) that gaps above it. Day 3 is red and closes at 101.5, below day 1’s midpoint of 102.5: an evening star.",
  "fails": [
   "As with the morning star, the exact thresholds decide how many you find.",
   "Gaps are rare on round-the-clock markets, so the pattern barely exists there.",
   "Its value as a stand-alone signal is not supported by tests on U.S. stocks (Marshall, Young &amp; Rose 2006)."
  ],
  "code": "d1, d2, d3 = df.iloc[-3], df.iloc[-2], df.iloc[-1]\nlong_green = d1.close - d1.open &gt; 0.6 * (d1.high - d1.low)\nsmall = abs(d2.close - d2.open) &lt; 0.3 * abs(d1.close - d1.open)\ngap_up = min(d2.open, d2.close) &gt; d1.close\nmid = (d1.open + d1.close) / 2\nstrong_red = d3.close &lt; d3.open and d3.close &lt; mid\nis_evening_star = long_green and small and gap_up and strong_red",
  "sources": [
   "<em>Japanese Candlestick Charting Techniques</em>, S. Nison, New York Institute of Finance, 1991",
   "B. R. Marshall, M. R. Young &amp; L. C. Rose, “Candlestick technical trading strategies: Can they create value for investors?”, <em>Journal of Banking &amp; Finance</em> 30(8), 2006 — they found none on Dow Jones stocks"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>100</td><td>105.5</td><td>99.5</td><td>105</td></tr><tr><td>2</td><td>106</td><td>106.5</td><td>105.2</td><td>105.7</td></tr><tr><td>3</td><td>105</td><td>105.2</td><td>101.2</td><td>101.5</td></tr></tbody></table></div></details>"
 },
 "support-resistance": {
  "example": "The price turns up from 100 three times (days 4, 12 and 20). Grouping the swing lows to the nearest point gives one level with three touches: support at <strong>100</strong>. A close 1% below it, under 99, would count as a break; day 24 closes at 106, so it holds.",
  "fails": [
   "Levels are zones, not lines: how close counts as a touch is a parameter, and changing it changes the levels you find.",
   "Every test also uses up the buyers waiting there, so heavily tested levels often break.",
   "Round numbers and old highs work partly because many traders watch them, a self-fulfilling effect that can stop at any time."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\ntouches = lows.round(0).value_counts()               # swing lows grouped to the nearest point\nlevel = touches.idxmax()\nsupport = level if touches.max() &gt;= 2 else None\nbroken = c.iloc[-1] &lt; level * 0.99                    # a close 1% under it",
  "sources": [
   "C. L. Osler, “Support for Resistance: Technical Analysis and Intraday Exchange Rates”, Federal Reserve Bank of New York <em>Economic Policy Review</em> 6(2), 2000",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>105</td></tr><tr><td>4</td><td>100</td></tr><tr><td>8</td><td>108</td></tr><tr><td>12</td><td>100</td></tr><tr><td>16</td><td>110</td></tr><tr><td>20</td><td>100</td></tr><tr><td>24</td><td>106</td></tr></tbody></table></div></details>"
 },
 "trendlines": {
  "example": "Swing lows at 100 (day 4) and 104 (day 12) define a line rising 0.5 a day. Projected to day 20 it gives 108, and the third low lands exactly there: the line held. On day 24 the line is at 110, and the close of 113 is above it.",
  "fails": [
   "Two points always make a line; only the third touch tests it, and which lows to connect is a judgement call.",
   "Steep lines break quickly, and their breaks say little.",
   "On growing assets a straight line on a price scale eventually breaks; a log scale gives a different line."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\n(x1, y1), (x2, y2) = list(lows.iloc[:2].items())      # the first two rising lows\nslope = (y2 - y1) / (x2 - x1)\nline = lambda x: y1 + slope * (x - x1)\nx3, y3 = lows.index[2], lows.iloc[2]                  # the third low tests the line\nheld = y3 &gt;= line(x3) * 0.99\nbroken = c.iloc[-1] &lt; line(len(c) - 1)",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>103</td></tr><tr><td>4</td><td>100</td></tr><tr><td>8</td><td>107</td></tr><tr><td>12</td><td>104</td></tr><tr><td>16</td><td>111</td></tr><tr><td>20</td><td>108</td></tr><tr><td>24</td><td>113</td></tr></tbody></table></div></details>"
 },
 "channels": {
  "example": "The lower line runs through the swing lows at 0.5 a day, and the swing highs sit 5 above it on average. On day 24 the channel runs from <strong>110 to 115</strong>.",
  "fails": [
   "Fading the edges works until the breakout; a channel trade needs a stop outside the channel.",
   "Parallel lines are an assumption; real highs and lows rarely line up that neatly.",
   "The width is estimated from a few swings and moves as each new one is added."
  ],
  "code": "def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it\n    w = s.rolling(2 * n + 1, center=True)\n    return s[s == w.max()], s[s == w.min()]\nc = df['close']\nhighs, lows = swings(c)\nslope, base = np.polyfit(lows.index, lows.values, 1)   # the lower line through the lows\nlower = lambda x: base + slope * x\nwidth = (highs - lower(highs.index)).mean()          # the parallel line through the highs\nupper = lambda x: lower(x) + width\nx = len(c) - 1",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The turning points the daily closes run through, in straight lines between them; high and low are half a point either side of each bar.</p><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>Close</th></tr></thead><tbody><tr><td>0</td><td>103</td></tr><tr><td>4</td><td>100</td></tr><tr><td>8</td><td>107</td></tr><tr><td>12</td><td>104</td></tr><tr><td>16</td><td>111</td></tr><tr><td>20</td><td>108</td></tr><tr><td>24</td><td>115</td></tr></tbody></table></div></details>"
 },
 "gaps": {
  "example": "The second bar’s high is 104; the third bar’s low is 106. The whole third bar trades above the second, leaving a gap of 2 points (about 1.9%). Two bars later the low reaches 103.5, below 104: the gap is filled.",
  "fails": [
   "Not every gap means the same: gaps inside a range tend to fill, while gaps on news can run. Telling them apart in advance is the hard part.",
   "“Gaps always fill” is a saying, not a statistic; some never do.",
   "On round-the-clock markets gaps barely exist, so the idea is mostly about stocks and futures."
  ],
  "code": "gap_up = df['low'] &gt; df['high'].shift()               # the whole bar above yesterday's\nsize = df['low'] - df['high'].shift()\nday = gap_up.idxmax()\nbottom = df['high'].iloc[day - 1]                     # the gap's lower edge\nfilled = (df['low'].iloc[day + 1:] &lt;= bottom).any()",
  "sources": [
   "<em>Technical Analysis of Stock Trends</em>, R. D. Edwards &amp; J. Magee, 1948 (later editions revised by W. H. C. Bassetti)",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">The bars the example is worked on.</p><div class=\"depth-table\"><table><thead><tr><th>Bar</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody><tr><td>1</td><td>101</td><td>102</td><td>100.5</td><td>101.5</td></tr><tr><td>2</td><td>101.5</td><td>104</td><td>101</td><td>103.8</td></tr><tr><td>3</td><td>106.2</td><td>108</td><td>106</td><td>107.5</td></tr><tr><td>4</td><td>107.5</td><td>108.5</td><td>105.5</td><td>106</td></tr><tr><td>5</td><td>106</td><td>106.5</td><td>103.5</td><td>104</td></tr></tbody></table></div></details>"
 },
 "cup-and-handle": {
  "example": "A 41-day cup from a rim of 110 down to 90 and back: 20 deep. The handle dips to 105, a quarter of the cup’s depth — under the usual one-third limit. Day 50 closes at 112, above the rim; the target is 110 + 20 = <strong>130</strong>.",
  "fails": [
   "O’Neil’s version has conditions this code leaves out — a prior uptrend, the cup’s length, volume drying up in the handle — and they change which cups qualify.",
   "A deep handle, or one that falls below the cup’s midpoint, usually means the base has failed.",
   "Like every measured move, the target is a rough guide."
  ],
  "code": "c = df['close']\ncup = c.iloc[:41]\nrim, bottom = min(cup.iloc[0], cup.iloc[-1]), cup.min()\ndepth = rim - bottom\nhandle = c.iloc[41:-1]\nshallow = rim - handle.min() &lt; depth / 3              # handle retraces under a third of the cup\nbreakout = c.iloc[-1] &gt; rim\ntarget = rim + depth",
  "sources": [
   "<em>How to Make Money in Stocks</em>, W. J. O’Neil, McGraw-Hill, 1988",
   "<em>Encyclopedia of Chart Patterns</em> (2nd ed.), T. N. Bulkowski, Wiley, 2005 — success and failure rates from large counts of patterns"
  ],
  "dataHtml": "<details class=\"depth-data\"><summary>The example data</summary><p class=\"depth-note\">A U from 110 (day 0) down to 90 (day 20) and back to 110 (day 40), then a handle down to 105 (day 47) and a close of 112 on day 50, as daily closes; high and low are half a point either side of each bar.</p></details>"
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
/* selfcheck:start — "Check yourself" questions; js/self-check.js renders them. */
const SELF_CHECK = {
 "head-and-shoulders": [
  {
   "q": "When is a head-and-shoulders top considered complete in classical charting?",
   "options": [
    "When the right shoulder forms.",
    "When the head is higher than both shoulders.",
    "When price closes below the neckline."
   ],
   "answer": 2,
   "why": "Before the neckline breaks, the shape is just three peaks — and many such shapes resolve upward."
  },
  {
   "q": "How is the classic price target measured?",
   "options": [
    "The width of the pattern, projected down.",
    "The height from the head to the neckline, projected down from the neckline.",
    "Half the height of the right shoulder."
   ],
   "answer": 1,
   "why": "The measured move is a rule of thumb, not a forecast with known accuracy."
  },
  {
   "q": "What does research say about chart patterns like this one?",
   "options": [
    "The evidence is mixed: some patterns carry a little information, and spotting them in hindsight overstates their reliability.",
    "They reliably predict reversals.",
    "They have been proven to be pure noise."
   ],
   "answer": 0,
   "why": "Lo, Mamaysky &amp; Wang (2000) found some patterns shifted return distributions slightly; profits after costs and out of sample are another matter."
  }
 ],
 "support-resistance": [
  {
   "q": "Why might support and resistance levels work at all?",
   "options": [
    "Market makers are obliged to defend those prices.",
    "They cannot work; any effect is imagined.",
    "Orders cluster at round numbers and previous highs and lows, so price often pauses there."
   ],
   "answer": 2,
   "why": "Osler (2000) found published support and resistance levels helped predict intraday trend interruptions in currency markets."
  },
  {
   "q": "Price breaks below support, then closes back above it the next day. What is this called?",
   "options": [
    "A false breakout — the reason many traders wait for a close beyond the level.",
    "A confirmed breakdown.",
    "A gap."
   ],
   "answer": 0,
   "why": "Requiring a close, or a percentage beyond the level, filters some false breaks at the cost of later entries."
  },
  {
   "q": "What is the trap in drawing levels on a past chart?",
   "options": [
    "Levels drawn on the past are always valid.",
    "With hindsight you can always find lines that “worked”; a fair test fixes the levels before the price action.",
    "Past charts lack the data to draw levels."
   ],
   "answer": 1,
   "why": "Define the levels by a rule (e.g. the last swing low) and test that rule on data it did not see."
  }
 ],
 "double-top": [
  {
   "q": "Two peaks of similar height have formed. When is the double top complete?",
   "options": [
    "As soon as the second peak forms.",
    "When price closes below the low between the two peaks.",
    "When volume rises on the second peak."
   ],
   "answer": 1,
   "why": "Two similar highs are common inside ordinary uptrends; the break of the valley is what separates a reversal from a pause."
  },
  {
   "q": "What is the classic target after the break?",
   "options": [
    "The height of the first peak.",
    "The distance from the peaks to the valley, projected down from the valley.",
    "Twice the distance between the peaks."
   ],
   "answer": 1,
   "why": "Like other measured moves, it is a convention for planning, not a probability."
  },
  {
   "q": "Why do traders insist on the break before acting?",
   "options": [
    "Without it, two similar highs often turn out to be a pause, and the trend continues.",
    "Volume is always highest at the break.",
    "The pattern only forms after the break."
   ],
   "answer": 0,
   "why": "Confirmation trades a later entry for fewer false signals."
  }
 ],
 "bull-flag": [
  {
   "q": "What does a bull flag consist of?",
   "options": [
    "A slow rise with no pullback.",
    "Two equal lows.",
    "A sharp rise (the pole), then a short, shallow pullback or sideways drift."
   ],
   "answer": 2,
   "why": "The flag is a pause after a strong move; the pattern is read as continuation if price breaks above it."
  },
  {
   "q": "What volume pattern is traditionally expected?",
   "options": [
    "Rising steadily through the flag.",
    "Volume plays no role.",
    "High on the pole, lower during the flag, rising again on the breakout."
   ],
   "answer": 2,
   "why": "Falling volume during the flag is read as a lack of selling pressure — a heuristic, not a rule."
  },
  {
   "q": "How is the classic target set?",
   "options": [
    "The width of the flag.",
    "The previous all-time high.",
    "The length of the pole, added to the breakout point."
   ],
   "answer": 2,
   "why": "Measured moves assume the second leg repeats the first — a symmetry with little evidence behind it."
  }
 ],
 "gaps": [
  {
   "q": "A gap at the start of a new trend, on heavy volume after news, is classically called a…",
   "options": [
    "exhaustion gap.",
    "breakaway gap.",
    "common gap."
   ],
   "answer": 1,
   "why": "Runaway gaps appear mid-trend; exhaustion gaps near its end. The labels are only certain in hindsight."
  },
  {
   "q": "What about the saying “gaps always fill”?",
   "options": [
    "Many gaps do fill eventually, but “eventually” can mean years — it is not a timing rule.",
    "It is true within a few days.",
    "Gaps never fill."
   ],
   "answer": 0,
   "why": "A rule that is right only on an unknown timescale cannot guide a trade."
  },
  {
   "q": "Why are price gaps common in stocks but rare in major currency pairs?",
   "options": [
    "Stock markets close overnight, so news arrives while they are shut; currencies trade around the clock on weekdays.",
    "Central banks fix currency prices between sessions.",
    "Stocks are more volatile than currencies."
   ],
   "answer": 0,
   "why": "A gap is simply news priced in at the next open."
  }
 ]
};
function selfCheck(id) {
  return typeof renderSelfCheck === 'function' ? renderSelfCheck('markets/charts/' + id, SELF_CHECK[id]) : '';
}
/* selfcheck:end */
function depthHtml(id) {
  return depthOnly(id) + selfCheck(id);
}
function depthOnly(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, id, run: 'markets-charts/' + id, codeNote: 'Assumes <code>import numpy as np</code>, <code>import pandas as pd</code>, and a DataFrame <code>df</code> with columns open, high, low and close for the data above.' });
}
/* depth:end */

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
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <div class="callout warn" style="margin-top:18px;text-align:left;font-size:12px;">
      <strong>Evidence note:</strong> Chart patterns are <strong>heuristic</strong> — widely used by traders but not mathematically proven. Academic evidence on their predictive power is mixed. Topics are labelled: <span class="evidence-badge statistical">Statistical</span> for statistically grounded concepts and <span class="evidence-badge heuristic">◐ Heuristic</span> for pattern-recognition techniques with debated evidence.
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-reversal','head-and-shoulders')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 18 6.5 12 9.5 15 12 6 14.5 15 17.5 12 21 18"/></svg></div>
      <div class="cat-card-name">Reversal Patterns</div>
      <div class="cat-card-count">5 topics · H&S, Double Top/Bottom, Rounding</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-continuation','bull-flag')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 18 9 12.5 13 15 20 6.5"/></svg></div>
      <div class="cat-card-name">Continuation Patterns</div>
      <div class="cat-card-count">5 topics · Flags, Pennants, Triangles</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-bilateral','symmetric-triangle')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5l16 5M4 17.5l16-5"/></svg></div>
      <div class="cat-card-name">Bilateral & Wedge</div>
      <div class="cat-card-count">5 topics · Sym Triangle, Wedges, Rectangle</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-candlestick','doji')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="4" x2="8" y2="20"/><rect x="5.5" y="8" width="5" height="7" rx="1"/><line x1="16" y1="6" x2="16" y2="18"/><rect x="13.5" y="10" width="5" height="5" rx="1"/></svg></div>
      <div class="cat-card-name">Candlestick Patterns</div>
      <div class="cat-card-count">5 topics · Doji, Hammer, Engulfing, Stars</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-structure','support-resistance')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="4.5" rx="1"/><rect x="5" y="10" width="14" height="4.5" rx="1"/><rect x="5" y="16" width="14" height="4.5" rx="1"/></svg></div>
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
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">01 — Reversal Patterns</div><h2>Head & <em>Shoulders</em></h2></div><span class="topic-badge">Bearish Reversal</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Three peaks — the classic top reversal</p>
  <p class="prose">The <strong>Head & Shoulders</strong> is the best-known reversal pattern. A left shoulder peak, a higher head peak, then a lower right shoulder. When price breaks below the <strong>neckline</strong> (drawn through the two troughs), the bearish reversal is confirmed.</p>
  <div class="fb"><div class="fm">Target = Neckline − (Head − Neckline)</div><div class="fd"><span>Measured move:</span> the distance from the head to the neckline, projected downward from the breakpoint.</div></div>
  <div class="va"><div class="vl">// Head & Shoulders anatomy</div><canvas id="headAndShouldersCanvas" role="img" aria-label="Head &amp; Shoulders anatomy" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume typically decreases from left shoulder → head → right shoulder. Declining volume on the right shoulder confirms weakening buying pressure.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The three-peak reversal is a <a href="../../stats/#distribution-shape">distribution shape</a> — the center peak is the mode. In ML, <a href="../../ml-math/#bias-variance">bias-variance</a> follows the same arc: performance rises, peaks, then degrades.</div>
  <div class="howto">
    <div class="howto-title">How traders use this (with caveats)</div>
    <ol>
      <li>Identify three peaks with the middle one highest — the pattern often takes weeks to form</li>
      <li>Draw the <strong>neckline</strong> through the two troughs between the peaks</li>
      <li>Wait for a close <em>below</em> the neckline on increased volume — don't front-run</li>
      <li>Measure the distance from head to neckline — project that distance downward for a price target</li>
      <li>Set a stop-loss above the right shoulder — if price reclaims it, the pattern has failed</li>
    </ol>
    <div class="howto-pitfall"><strong>Reality check:</strong> Academic studies show mixed results for chart patterns. A 2000 study by Lo, Mamaysky & Wang found some statistical significance, but later studies with transaction costs often show diminishing edge. Use chart patterns as <em>one input</em> alongside quantitative signals — never as your sole decision tool.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Large hand-counted samples (Bulkowski 2005) report that many patterns never reach their measured target; treat the target as an optimistic estimate and published success rates as rough guides</li>
      <li>Volume confirmation — falling volume into the right shoulder, rising volume on the break — is the classic filter (Edwards &amp; Magee)</li>
      <li>Failure rate rises in strong trends — a clear H&amp;S in a strong bull market often ends in a failed breakdown and continuation higher</li>
      <li>Tested by algorithm, the pattern carries some information but rarely a trading edge on its own after costs (Lo, Mamaysky &amp; Wang 2000)</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> You see three clear peaks after an extended uptrend. Volume declines on each successive peak. The pattern is forming on a daily or weekly timeframe (longer timeframes are less noisy). You have other confirming signals (RSI divergence, declining momentum).</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> The pattern is on an intraday chart (noise dominates). The broader trend is strongly bullish with no momentum divergence. You're relying solely on the pattern without risk management. The "head" is barely higher than the "shoulders" — ambiguous patterns have low reliability.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/jacksoncrow/stock-market-dataset" target="_blank" rel="noopener">Kaggle: Daily Stock Prices (S&P 500, all tickers, 2000-2023)</a>
    <div class="ds-note">Download daily OHLCV data and look for H&S patterns in SPY around major tops (2000, 2007, 2022). Compare the pattern's predicted target vs actual drawdown.</div>
  </div>
  ${depthHtml('head-and-shoulders')}
  <div class="topic-nav" id="nav-head-and-shoulders"></div>
</div>`;
}

function buildInverseHeadAndShoulders() {
  return `<div class="topic" id="inverse-head-and-shoulders">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Reversal Patterns</div><h2>Inverse <em>H&S</em></h2></div><span class="topic-badge">Bullish Reversal</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// The mirror image — three troughs signaling a bottom</p>
  <p class="prose">The <strong>Inverse Head & Shoulders</strong> is the bullish mirror: left trough, a deeper head trough, then a shallower right trough. Breakout above the neckline confirms the bullish reversal. Often forms at the end of extended downtrends.</p>
  <div class="fb"><div class="fm">Target = Neckline + (Neckline − Head)</div><div class="fd"><span>The deeper the head,</span> the larger the potential move. Volume should increase on the breakout.</div></div>
  <div class="va"><div class="vl">// Inverse Head & Shoulders anatomy</div><canvas id="inverseHeadAndShouldersCanvas" role="img" aria-label="Inverse Head &amp; Shoulders anatomy" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The neckline doesn't have to be perfectly horizontal — a slightly sloping neckline is normal. What matters is the pattern of three troughs.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A bottoming reversal is the mirror image of head-and-shoulders — the same <a href="../../stats/#distribution-shape">symmetry</a> that statistics reveals in distributions.</div>
  ${depthHtml('inverse-head-and-shoulders')}
  <div class="topic-nav" id="nav-inverse-head-and-shoulders"></div>
</div>`;
}

function buildDoubleTop() {
  return `<div class="topic" id="double-top">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">03 — Reversal Patterns</div><h2>Double <em>Top</em></h2></div><span class="topic-badge">Bearish — M</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Two peaks at the same level — the "M" formation</p>
  <p class="prose">The <strong>Double Top</strong> forms when price hits resistance twice and fails to break through. The two peaks form an "M" shape. Breakdown below the trough between peaks (the neckline) confirms the bearish reversal.</p>
  <div class="fb"><div class="fm">Target = Neckline − (Peak − Neckline)</div><div class="fd"><span>The two peaks don't need to be identical</span> — a difference of ~3% is acceptable. Time between peaks varies from weeks to months.</div></div>
  <div class="va"><div class="vl">// Double Top — M formation</div><canvas id="doubleTopCanvas" role="img" aria-label="Double Top — M formation" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The second peak often shows lower volume than the first — a sign that buying enthusiasm is fading even though price reaches the same level.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Two failed attempts at the same level — like a <a href="../../ml-math/#activation">ReLU-clipped activation</a> hitting a ceiling. In statistics, <a href="../../stats/#hypothesis-testing">repeated failed tests</a> at the same significance level tell you the effect isn’t there.</div>
  ${depthHtml('double-top')}
  <div class="topic-nav" id="nav-double-top"></div>
</div>`;
}

function buildDoubleBottom() {
  return `<div class="topic" id="double-bottom">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">04 — Reversal Patterns</div><h2>Double <em>Bottom</em></h2></div><span class="topic-badge">Bullish — W</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Two troughs at the same level — the "W" formation</p>
  <p class="prose">The <strong>Double Bottom</strong> is the bullish mirror of the double top — price tests support twice and bounces. The "W" shape forms with a peak between two troughs. Breakout above the neckline (the middle peak) confirms the reversal.</p>
  <div class="fb"><div class="fm">Target = Neckline + (Neckline − Trough)</div><div class="fd"><span>A "spring"</span> — where the second bottom slightly undercuts the first before reversing — can be especially powerful.</div></div>
  <div class="va"><div class="vl">// Double Bottom — W formation</div><canvas id="doubleBottomCanvas" role="img" aria-label="Double Bottom — W formation" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The strongest double bottoms have increasing volume on the second bounce — it shows buyers stepping in more aggressively at the support level.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Two bounces off the same floor mirror <a href="../../ml-math/#activation">activation floors</a> in neural nets.</div>
  ${depthHtml('double-bottom')}
  <div class="topic-nav" id="nav-double-bottom"></div>
</div>`;
}

function buildRoundingBottom() {
  return `<div class="topic" id="rounding-bottom">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">05 — Reversal Patterns</div><h2>Rounding <em>Bottom</em></h2></div><span class="topic-badge">Saucer</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// A slow, gradual reversal — the U-shaped bottom</p>
  <p class="prose">The <strong>Rounding Bottom</strong> (saucer) is a gradual transition from selling to buying pressure, forming a U-shape over weeks or months. Volume mirrors the price pattern — high at the start, low at the bottom, rising on the right side.</p>
  <div class="fb"><div class="fm">Target = Neckline + Depth of saucer</div><div class="fd"><span>Patience required:</span> this is a long-term pattern. It forms slowly, and is only confirmed by the breakout.</div></div>
  <div class="va"><div class="vl">// Rounding Bottom — saucer formation</div><canvas id="roundingBottomCanvas" role="img" aria-label="Rounding Bottom — saucer formation" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The rounding bottom reflects a gradual change in market sentiment — not a panic reversal but a slow shift from distribution to accumulation.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The slow U-shaped recovery mirrors the <a href="../../ml-math/#lr-schedule">cosine learning rate schedule</a> — gradual cooling, then gradual warm-up. In statistics, it’s the shape of a cumulative distribution function.</div>
  ${depthHtml('rounding-bottom')}
  <div class="topic-nav" id="nav-rounding-bottom"></div>
</div>`;
}

function buildBullFlag() {
  return `<div class="topic" id="bull-flag">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">06 — Continuation Patterns</div><h2>Bull <em>Flag</em></h2></div><span class="topic-badge">Bullish Cont.</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Sharp rally + downward-sloping channel = continuation</p>
  <p class="prose">The <strong>Bull Flag</strong> starts with a sharp rally (the pole), followed by a gentle downward-sloping consolidation channel (the flag). Breakout above the flag's upper trendline continues the uptrend. A widely used continuation pattern.</p>
  <div class="fb"><div class="fm">Target = Breakout point + Pole length</div><div class="fd"><span>The pole measures the initial move;</span> project that distance from the breakout point for the target.</div></div>
  <div class="va"><div class="vl">// Bull Flag — pole and flag anatomy</div><canvas id="bullFlagCanvas" role="img" aria-label="Bull Flag — pole and flag anatomy" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The best bull flags have decreasing volume during the flag phase and expanding volume on the breakout — showing sellers exhausting themselves.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A pause in an uptrend before continuation. In ML, <a href="../../ml-math/#lr-schedule">learning rate warmup</a> creates the same pattern: a brief consolidation phase before the model accelerates.</div>
  ${depthHtml('bull-flag')}
  <div class="topic-nav" id="nav-bull-flag"></div>
</div>`;
}

function buildBearFlag() {
  return `<div class="topic" id="bear-flag">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">07 — Continuation Patterns</div><h2>Bear <em>Flag</em></h2></div><span class="topic-badge">Bearish Cont.</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Sharp decline + upward-sloping channel = continuation down</p>
  <p class="prose">The <strong>Bear Flag</strong> is the bearish mirror: a sharp decline (pole) followed by a gentle upward-sloping consolidation (flag). Breakdown below the lower trendline continues the downtrend.</p>
  <div class="fb"><div class="fm">Target = Breakdown point − Pole length</div><div class="fd"><span>Bear flags in strong downtrends</span> can resolve very quickly — the consolidation may be brief.</div></div>
  <div class="va"><div class="vl">// Bear Flag — pole and flag anatomy</div><canvas id="bearFlagCanvas" role="img" aria-label="Bear Flag — pole and flag anatomy" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Bear flags tend to resolve faster than bull flags — fear is a stronger emotion than greed, so selling accelerates more quickly.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The mirror of a bull flag. In ML, <a href="../../ml-math/#grad-clip">gradient clipping</a> creates brief pauses in the descent before loss resumes falling.</div>
  ${depthHtml('bear-flag')}
  <div class="topic-nav" id="nav-bear-flag"></div>
</div>`;
}

function buildPennant() {
  return `<div class="topic" id="pennant">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">08 — Continuation Patterns</div><h2><em>Pennant</em></h2></div><span class="topic-badge">Continuation</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Small symmetrical triangle on a pole — brief pause before continuation</p>
  <p class="prose">A <strong>Pennant</strong> is a small symmetrical triangle that forms after a strong move (the pole). Converging trendlines create a brief pause. Breakout continues in the direction of the pole. Typically resolves within 1-3 weeks.</p>
  <div class="fb"><div class="fm">Target = Breakout + Pole length</div><div class="fd"><span>Key difference from flags:</span> pennants have converging trendlines (triangle), flags have parallel trendlines (channel).</div></div>
  <div class="va"><div class="vl">// Pennant anatomy — pole + triangle</div><canvas id="pennantCanvas" role="img" aria-label="Pennant anatomy — pole + triangle" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume should contract during the pennant and expand on breakout. A breakout without volume is unreliable.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Converging trendlines compressing volatility before a breakout. In statistics, <a href="../indicators/#standard-deviation">decreasing variance</a> signals the same convergence.</div>
  ${depthHtml('pennant')}
  <div class="topic-nav" id="nav-pennant"></div>
</div>`;
}

function buildAscendingTriangle() {
  return `<div class="topic" id="ascending-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">09 — Continuation Patterns</div><h2>Ascending <em>Triangle</em></h2></div><span class="topic-badge">Bullish</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Flat resistance + rising lows = buyers pressing higher</p>
  <p class="prose">The <strong>Ascending Triangle</strong> has a flat resistance level and a rising lower trendline. Buyers are willing to pay increasingly higher prices. When resistance finally breaks, the measured move equals the triangle's height at its widest point.</p>
  <div class="fb"><div class="fm">Target = Breakout + Height of triangle base</div><div class="fd"><span>Usually read as bullish</span> — but published success rates vary, so wait for a close above resistance.</div></div>
  <div class="va"><div class="vl">// Ascending Triangle — flat top, rising lows</div><canvas id="ascendingTriangleCanvas" role="img" aria-label="Ascending Triangle — flat top, rising lows" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Each touch of resistance weakens it — like repeatedly hitting a wall. The rising lows show buyers becoming more aggressive with each dip.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rising lows against a flat ceiling — pressure building. Same dynamic as <a href="../../ml-math/#optimizers">optimizer momentum</a> accumulating against a loss plateau.</div>
  ${depthHtml('ascending-triangle')}
  <div class="topic-nav" id="nav-ascending-triangle"></div>
</div>`;
}

function buildDescendingTriangle() {
  return `<div class="topic" id="descending-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">10 — Continuation Patterns</div><h2>Descending <em>Triangle</em></h2></div><span class="topic-badge">Bearish</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Flat support + falling highs = sellers pressing lower</p>
  <p class="prose">The <strong>Descending Triangle</strong> has a flat support level and a falling upper trendline. Sellers are accepting lower prices. Breakdown below support triggers the measured move — the triangle's height projected downward.</p>
  <div class="fb"><div class="fm">Target = Breakdown − Height of triangle base</div><div class="fd"><span>The mirror of ascending triangles</span> — sellers weaken support with each touch until it breaks.</div></div>
  <div class="va"><div class="vl">// Descending Triangle — flat bottom, falling highs</div><canvas id="descendingTriangleCanvas" role="img" aria-label="Descending Triangle — flat bottom, falling highs" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> If the prior trend is up, a descending triangle can actually break upward — context matters more than the pattern alone.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Falling highs against a flat floor. In statistics, a <a href="../../stats/#confidence-intervals">narrowing confidence interval</a> compresses uncertainty the same way.</div>
  ${depthHtml('descending-triangle')}
  <div class="topic-nav" id="nav-descending-triangle"></div>
</div>`;
}

function buildSymmetricTriangle() {
  return `<div class="topic" id="symmetric-triangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">11 — Bilateral & Wedge</div><h2>Symmetric <em>Triangle</em></h2></div><span class="topic-badge">Bilateral</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Converging trendlines, no bias — the market is deciding</p>
  <p class="prose">The <strong>Symmetric Triangle</strong> has converging trendlines with lower highs and higher lows — the market is compressing, undecided. It can break either way. Most often continues the prior trend direction, but always wait for confirmation.</p>
  <div class="fb"><div class="fm">Target = Breakout point ± Width at base</div><div class="fd"><span>Breakout typically occurs</span> between 50-75% of the way to the apex. Breakouts too close to the apex often fail.</div></div>
  <div class="va"><div class="vl">// Symmetric Triangle — converging to apex</div><canvas id="symmetricTriangleCanvas" role="img" aria-label="Symmetric Triangle — converging to apex" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume should progressively decrease as the triangle tightens. The breakout direction becomes the prevailing trend — don't try to predict, react.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Both sides converge to a point of maximum compression. In ML, the <a href="../../ml-math/#bias-variance">bias-variance sweet spot</a> sits at the convergence of two opposing forces.</div>
  ${depthHtml('symmetric-triangle')}
  <div class="topic-nav" id="nav-symmetric-triangle"></div>
</div>`;
}

function buildRisingWedge() {
  return `<div class="topic" id="rising-wedge">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">12 — Bilateral & Wedge</div><h2>Rising <em>Wedge</em></h2></div><span class="topic-badge">Bearish</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Both lines slope up but converge — momentum is dying</p>
  <p class="prose">The <strong>Rising Wedge</strong> has both support and resistance sloping upward, but converging. Price is rising but the range is narrowing — momentum is exhausting. Usually resolves with a bearish breakdown.</p>
  <div class="fb"><div class="fm">Target = Breakdown − Height of wedge at widest</div><div class="fd"><span>Key difference from ascending triangle:</span> both lines slope up in a wedge, only one is flat in a triangle.</div></div>
  <div class="va"><div class="vl">// Rising Wedge — upward but weakening</div><canvas id="risingWedgeCanvas" role="img" aria-label="Rising Wedge — upward but weakening" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The rising wedge is deceptive — price is going up, but the narrowing range and declining volume signal that the advance is running out of steam.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Upward slopes narrowing — momentum fading despite higher prices. In ML, <a href="../../ml-math/#gradient">vanishing gradients</a> show the same decaying energy.</div>
  ${depthHtml('rising-wedge')}
  <div class="topic-nav" id="nav-rising-wedge"></div>
</div>`;
}

function buildFallingWedge() {
  return `<div class="topic" id="falling-wedge">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">13 — Bilateral & Wedge</div><h2>Falling <em>Wedge</em></h2></div><span class="topic-badge">Bullish</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Both lines slope down but converge — selling is exhausting</p>
  <p class="prose">The <strong>Falling Wedge</strong> has both lines sloping downward and converging. Price is falling but the range is narrowing — sellers are losing conviction. Usually resolves with a bullish breakout.</p>
  <div class="fb"><div class="fm">Target = Breakout + Height of wedge at widest</div><div class="fd"><span>Falling wedges in downtrends</span> signal reversal; in uptrends, they're continuation patterns (a pullback before resuming).</div></div>
  <div class="va"><div class="vl">// Falling Wedge — downward but exhausting</div><canvas id="fallingWedgeCanvas" role="img" aria-label="Falling Wedge — downward but exhausting" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The bullish resolution of a falling wedge is the mirror of the rising wedge's bearish resolution — both show momentum exhaustion.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Downward slopes narrowing — selling exhaustion. Like <a href="../../ml-math/#lr-schedule">learning rate decay</a> approaching convergence: the steps shrink but the model is almost there.</div>
  ${depthHtml('falling-wedge')}
  <div class="topic-nav" id="nav-falling-wedge"></div>
</div>`;
}

function buildBroadeningFormation() {
  return `<div class="topic" id="broadening-formation">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">14 — Bilateral & Wedge</div><h2>Broadening <em>Formation</em></h2></div><span class="topic-badge">Megaphone</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Diverging trendlines — expanding volatility, increasing disagreement</p>
  <p class="prose">The <strong>Broadening Formation</strong> (megaphone) has diverging trendlines — higher highs and lower lows. Volatility and disagreement are increasing. It often appears at major market tops and is one of the most difficult patterns to trade.</p>
  <div class="fb"><div class="fm">No clean measured move — trade the swings or wait for breakout</div><div class="fd"><span>Each swing is larger than the last,</span> swinging buyers and sellers into increasingly extreme positions.</div></div>
  <div class="va"><div class="vl">// Broadening Formation — diverging trendlines</div><canvas id="broadeningFormationCanvas" role="img" aria-label="Broadening Formation — diverging trendlines" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Broadening formations reflect emotional extremes — they often appear during periods of uncertainty (elections, crises). The expanding range shows the market can't find consensus.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Expanding volatility — the market can’t agree on a price. In statistics, <a href="../indicators/#standard-deviation">increasing variance</a> signals instability.</div>
  ${depthHtml('broadening-formation')}
  <div class="topic-nav" id="nav-broadening-formation"></div>
</div>`;
}

function buildRectangle() {
  return `<div class="topic" id="rectangle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">15 — Bilateral & Wedge</div><h2><em>Rectangle</em></h2></div><span class="topic-badge">Range</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Horizontal support and resistance — a consolidation box</p>
  <p class="prose">The <strong>Rectangle</strong> is a horizontal consolidation range — price bounces between parallel support and resistance. It's a pause in the trend. Breakout direction usually follows the prior trend. The measured move is the rectangle's height.</p>
  <div class="fb"><div class="fm">Target = Breakout ± Height of rectangle</div><div class="fd"><span>Can be traded internally</span> (buy support, sell resistance) or by waiting for the breakout.</div></div>
  <div class="va"><div class="vl">// Rectangle — horizontal range</div><canvas id="rectangleCanvas" role="img" aria-label="Rectangle — horizontal range" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The longer a rectangle persists, the more significant the eventual breakout — energy is building up like a compressed spring.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Price oscillating between two fixed bounds is a <a href="../../stats/#distribution-shape">uniform distribution</a> in action. In ML, <a href="../../ml-math/#batchnorm">batch normalization</a> constrains activations to a bounded range.</div>
  ${depthHtml('rectangle')}
  <div class="topic-nav" id="nav-rectangle"></div>
</div>`;
}

function buildDoji() {
  return `<div class="topic" id="doji">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">16 — Candlestick Patterns</div><h2><em>Doji</em></h2></div><span class="topic-badge">Indecision</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Open ≈ Close — the market is undecided</p>
  <p class="prose">A <strong>Doji</strong> forms when the open and close are nearly equal, creating a cross or plus shape. It signals indecision — neither buyers nor sellers won. Context is everything: at a trend extreme, it suggests reversal; mid-range, it's noise.</p>
  <div class="fb"><div class="fm">Variants: Standard (+), Long-legged, Dragonfly (T), Gravestone (⊥)</div><div class="fd"><span>A doji after a long green candle</span> suggests the uptrend may be stalling — buyers ran out of conviction.</div></div>
  <div class="va"><div class="vl">// Doji variants</div><canvas id="dojiCanvas" role="img" aria-label="Doji variants" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> A single doji means nothing in isolation — it needs context. After a strong move, it's significant. In a sideways range, it's normal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Open equals close — perfect indecision, a <a href="../../stats/#distribution-shape">mean equal to median</a> moment. In ML, a <a href="../../ml-math/#loss">loss of zero</a> at a saddle point looks the same: no net direction.</div>
  ${depthHtml('doji')}
  <div class="topic-nav" id="nav-doji"></div>
</div>`;
}

function buildHammer() {
  return `<div class="topic" id="hammer">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">17 — Candlestick Patterns</div><h2><em>Hammer</em></h2></div><span class="topic-badge">Bullish Reversal</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Long lower shadow, small body at top — buyers reclaimed</p>
  <p class="prose">The <strong>Hammer</strong> has a small body at the top and a long lower shadow (≥2× body length). Sellers pushed price down during the session, but buyers pulled it back up. At a support level or downtrend base, it signals bullish reversal.</p>
  <div class="fb"><div class="fm">Lower shadow ≥ 2× body length, little or no upper shadow</div><div class="fd"><span>The "Hanging Man"</span> has the same shape but appears at tops — same candle, opposite meaning depending on context.</div></div>
  <div class="va"><div class="vl">// Hammer vs. Hanging Man</div><canvas id="hammerCanvas" role="img" aria-label="Hammer vs. Hanging Man" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Color matters less than shape — a green hammer is slightly more bullish, but a red hammer at support is still a valid reversal signal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A long lower shadow rejected by buyers — the distribution of the session is <a href="../../stats/#distribution-shape">heavily skewed</a>. In ML, <a href="../../ml-math/#activation">ReLU</a> similarly rejects negative values, keeping only the upside.</div>
  ${depthHtml('hammer')}
  <div class="topic-nav" id="nav-hammer"></div>
</div>`;
}

function buildEngulfing() {
  return `<div class="topic" id="engulfing">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">18 — Candlestick Patterns</div><h2><em>Engulfing</em></h2></div><span class="topic-badge">Reversal</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// The second candle swallows the first — momentum shift</p>
  <p class="prose">An <strong>Engulfing</strong> pattern is a two-candle reversal. <strong>Bullish:</strong> small red candle followed by a larger green candle that completely covers the red body. <strong>Bearish:</strong> small green followed by a larger red that engulfs it.</p>
  <div class="fb"><div class="fm">Second body completely covers (engulfs) the first body</div><div class="fd"><span>The engulfing candle shows conviction</span> — the larger the second candle relative to the first, the stronger the signal.</div></div>
  <div class="va"><div class="vl">// Bullish and Bearish Engulfing</div><canvas id="engulfingCanvas" role="img" aria-label="Engulfing: Bullish and Bearish Engulfing" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Engulfing patterns at key support/resistance levels are far more significant than those in the middle of a range.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> One candle completely contains the prior — a <a href="../indicators/#standard-deviation">variance expansion</a> in a single bar.</div>
  ${depthHtml('engulfing')}
  <div class="topic-nav" id="nav-engulfing"></div>
</div>`;
}

function buildMorningStar() {
  return `<div class="topic" id="morning-star">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">19 — Candlestick Patterns</div><h2>Morning <em>Star</em></h2></div><span class="topic-badge">Bullish 3-Candle</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Long red → small star → long green — dawn after night</p>
  <p class="prose">The <strong>Morning Star</strong> is a three-candle bullish reversal. First, a long red candle (sellers in control). Then a small-bodied "star" (indecision — sellers exhausting). Finally, a long green candle (buyers take over). Named because it appears before dawn — the trend's darkest point.</p>
  <div class="fb"><div class="fm">Red (long) → Star (small, gapped) → Green (long)</div><div class="fd"><span>The star can be a doji</span> (called a "Morning Doji Star") — this strengthens the signal.</div></div>
  <div class="va"><div class="vl">// Morning Star formation</div><canvas id="morningStarCanvas" role="img" aria-label="Morning Star formation" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The gap between the first candle and the star, and between the star and the third candle, adds to the signal's power — but the pattern works without gaps too.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A three-candle reversal: despair, indecision, hope. In ML, <a href="../../ml-math/#lr-schedule">warmup schedules</a> follow the same cold-start-to-recovery arc.</div>
  ${depthHtml('morning-star')}
  <div class="topic-nav" id="nav-morning-star"></div>
</div>`;
}

function buildEveningStar() {
  return `<div class="topic" id="evening-star">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">20 — Candlestick Patterns</div><h2>Evening <em>Star</em></h2></div><span class="topic-badge">Bearish 3-Candle</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Long green → small star → long red — dusk after daylight</p>
  <p class="prose">The <strong>Evening Star</strong> is the bearish mirror. First, a long green candle (buyers confident). Then a small star (indecision at the top). Finally, a long red candle (sellers overwhelm). Named because the evening star appears before nightfall.</p>
  <div class="fb"><div class="fm">Green (long) → Star (small, gapped) → Red (long)</div><div class="fd"><span>The third candle should close</span> below the midpoint of the first candle for a strong signal.</div></div>
  <div class="va"><div class="vl">// Evening Star formation</div><canvas id="eveningStarCanvas" role="img" aria-label="Evening Star formation" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Evening Stars at resistance levels or after extended rallies are usually read as the stronger signals — they confirm the level and the exhaustion simultaneously.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The bearish mirror of morning star — hope, indecision, despair. In statistics, <a href="../../stats/#distribution-shape">negative skew</a> captures this tail of decline.</div>
  ${depthHtml('evening-star')}
  <div class="topic-nav" id="nav-evening-star"></div>
</div>`;
}

function buildSupportResistance() {
  return `<div class="topic" id="support-resistance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">21 — Structural Analysis</div><h2>Support & <em>Resistance</em></h2></div><span class="topic-badge">Levels</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// The floor and ceiling of price — where memory lives</p>
  <p class="prose"><strong>Support</strong> is a price level where buying concentrates (floor). <strong>Resistance</strong> is where selling concentrates (ceiling). These levels have "memory" — broken support becomes resistance, and broken resistance becomes support. This polarity principle is fundamental to all chart reading.</p>
  <div class="fb"><div class="fm">More touches = stronger level · Broken support → resistance (and vice versa)</div><div class="fd"><span>S&R levels are zones, not exact prices</span> — think of them as areas where orders cluster, not precise lines.</div></div>
  <div class="va"><div class="vl">// Support & Resistance — price memory</div><canvas id="supportResistanceCanvas" role="img" aria-label="Support &amp; Resistance — price memory" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Round numbers ($50, $100) and previous highs/lows create natural S&R levels because traders and algorithms place orders there.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Price memory at specific levels is <a href="../../markets/psychology/#anchoring">anchoring bias</a> made visible. In ML, <a href="../../ml-math/#activation">activation clamping</a> (ReLU at 0, sigmoid at 0/1) creates the same floor and ceiling.</div>
  ${depthHtml('support-resistance')}
  <div class="topic-nav" id="nav-support-resistance"></div>
</div>`;
}

function buildTrendlines() {
  return `<div class="topic" id="trendlines">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">22 — Structural Analysis</div><h2><em>Trendlines</em></h2></div><span class="topic-badge">Diagonal</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Connecting swing points — the direction of price flow</p>
  <p class="prose"><strong>Trendlines</strong> connect swing lows in an uptrend (ascending support) or swing highs in a downtrend (descending resistance). A valid trendline touches at least 3 points. The more touches and the longer the line, the more significant its break.</p>
  <div class="fb"><div class="fm">≥3 touches = valid · Steeper = less sustainable · Break = signal</div><div class="fd"><span>Draw trendlines from body to body</span> (closes not wicks) for more reliable levels, though both methods have advocates.</div></div>
  <div class="va"><div class="vl">// Trendline construction — connecting swings</div><canvas id="trendlinesCanvas" role="img" aria-label="Trendlines: Trendline construction — connecting swings" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Trendlines that are too steep are unsustainable — an angle depends on how the chart is scaled, so there is no “right” slope — but steeper trendlines do break sooner and are replaced by shallower ones.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drawing a line through successive highs or lows is literally <a href="../../ml-math/#linear">linear regression</a> — the same best fit computed in statistics.</div>
  ${depthHtml('trendlines')}
  <div class="topic-nav" id="nav-trendlines"></div>
</div>`;
}

function buildChannels() {
  return `<div class="topic" id="channels">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">23 — Structural Analysis</div><h2><em>Channels</em></h2></div><span class="topic-badge">Parallel</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Two parallel trendlines containing price</p>
  <p class="prose">A <strong>Channel</strong> consists of two parallel trendlines between which price oscillates. Ascending channels slope up (bullish), descending channels slope down (bearish), and horizontal channels are ranges. Price bouncing off both lines confirms the channel.</p>
  <div class="fb"><div class="fm">Trade the channel interior · Breakout signals new move</div><div class="fd"><span>Draw the primary trendline first</span> (connecting 3+ points), then create a parallel line through the opposite extreme.</div></div>
  <div class="va"><div class="vl">// Channel types — ascending, descending, horizontal</div><canvas id="channelsCanvas" role="img" aria-label="Channels: Channel types — ascending, descending, horizontal" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Channels provide both direction and range — buy the lower line, sell the upper line, and exit when price breaks through either boundary.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Parallel trendlines bounding price is a visual <a href="../../stats/#confidence-intervals">confidence interval</a> — price stays within 2σ most of the time. In ML, <a href="../../ml-math/#batchnorm">batch normalization</a> keeps activations channeled.</div>
  ${depthHtml('channels')}
  <div class="topic-nav" id="nav-channels"></div>
</div>`;
}

function buildGaps() {
  return `<div class="topic" id="gaps">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">24 — Structural Analysis</div><h2><em>Gaps</em></h2></div><span class="topic-badge">Price Void</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// Empty space between candles — where no trading happened</p>
  <p class="prose"><strong>Gaps</strong> occur when price opens above the prior close (gap up) or below it (gap down), leaving a void. Four types: <strong>Common</strong> (noise, often fills), <strong>Breakaway</strong> (starts a new move), <strong>Runaway</strong> (continuation), <strong>Exhaustion</strong> (end of move).</p>
  <div class="fb"><div class="fm">Breakaway → starts move · Runaway → continues · Exhaustion → ends</div><div class="fd"><span>"Gaps always fill"</span> is a myth — breakaway and runaway gaps often don't fill for months or years.</div></div>
  <div class="va"><div class="vl">// Four types of gaps</div><canvas id="gapsCanvas" role="img" aria-label="Gaps: Four types of gaps" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Volume distinguishes gap types — breakaway gaps have high volume, runaway gaps have moderate volume, and exhaustion gaps have extreme volume followed by a reversal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A discontinuity where price jumps past a range. In statistics, <a href="../../stats/#outlier-detection">outliers</a> are the same — data points that break the expected distribution.</div>
  ${depthHtml('gaps')}
  <div class="topic-nav" id="nav-gaps"></div>
</div>`;
}

function buildCupAndHandle() {
  return `<div class="topic" id="cup-and-handle">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">25 — Structural Analysis</div><h2>Cup & <em>Handle</em></h2></div><span class="topic-badge">Bullish</span><span class="evidence-badge heuristic" title="Pattern-recognition heuristic — widely used but academic evidence is mixed">◐ Heuristic</span></div>
  <p class="sub">// A rounded bottom with a brief consolidation — then breakout</p>
  <p class="prose">The <strong>Cup & Handle</strong>, popularized by William O'Neil, combines a rounded bottom (the cup) with a brief downward drift or consolidation (the handle) before breaking out to new highs. The cup should be a smooth U-shape, not a sharp V.</p>
  <div class="fb"><div class="fm">Target = Breakout + Depth of cup</div><div class="fd"><span>The handle should retrace</span> no more than 1/3 of the cup depth. Handle pullbacks of 8-12% are ideal (O'Neil guidelines).</div></div>
  <div class="va"><div class="vl">// Cup & Handle — anatomy and target</div><canvas id="cupAndHandleCanvas" role="img" aria-label="Cup &amp; Handle — anatomy and target" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The handle represents the last group of sellers getting shaken out before the breakout. Its brevity and shallow depth signal strong underlying demand.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A U-shaped base then a small consolidation — the shape of <a href="../../ml-math/#lr-schedule">cosine annealing</a> with a brief plateau before the final push.</div>
  ${depthHtml('cup-and-handle')}
  <div class="topic-nav" id="nav-cup-and-handle"></div>
</div>`;
}
