/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Topics Data & Content Builder
   17 short reflections on patterns in the world
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-essays', title:'Pattern Essays', topics:['home','essay-bell','essay-mean','essay-tail','essay-signal','essay-map','essay-feedback','essay-walk','essay-threshold','essay-survivor','essay-fractal','essay-simpson','essay-kalman','essay-spring','essay-forking','essay-memory','essay-bottleneck','essay-reversible'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'essay-bell':'The Bell in Everything',
  'essay-mean':'Regression to the Mean',
  'essay-tail':'The Long Tail',
  'essay-signal':'Signal in the Noise',
  'essay-map':'The Map and the Territory',
  'essay-feedback':'The Feedback Loop',
  'essay-walk':'The Random Walk',
  'essay-threshold':'The Threshold',
  'essay-survivor':'Survivorship Bias',
  'essay-fractal':'The Fractal',
  'essay-simpson':'Simpson\u2019s Paradox',
  'essay-kalman':'The Deep Kalman Filter',
  'essay-spring':'The Coiled Spring',
  'essay-forking':'The Garden of Forking Paths',
  'essay-memory':'How Long Is Memory?',
  'essay-bottleneck':'The Bottleneck',
  'essay-reversible':'Small, Reversible Bets',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'essay-bell', reviewed:'2026-10-02', num:'E1', title:'The Bell in Everything', category:'Pattern Essays', keywords:['normal distribution','gaussian','central limit theorem','bell curve','aggregation','independence','emergence'], content:'Normal distributions emerge wherever many small, independent forces combine.' },
  { id:'essay-mean', reviewed:'2026-10-02', num:'E2', title:'Regression to the Mean', category:'Pattern Essays', keywords:['regression','mean reversion','extremes','Galton','inheritance','arithmetic','luck'], content:'Extreme outcomes tend to be followed by less extreme ones \u2014 not a force, just arithmetic.' },
  { id:'essay-tail', reviewed:'2026-10-02', num:'E3', title:'The Long Tail', category:'Pattern Essays', keywords:['power law','Pareto','Zipf','inequality','scale-free','fat tails','rare events','wealth'], content:'Most things are small. A few are enormous. The pattern repeats across domains that seem unrelated.' },
  { id:'essay-signal', reviewed:'2026-10-02', num:'E4', title:'Signal in the Noise', category:'Pattern Essays', keywords:['noise','overfitting','randomness','pattern recognition','apophenia','data','uncertainty'], content:'Every dataset is a mix of pattern and randomness. The hard part is not inventing signal where there is none.' },
  { id:'essay-map', reviewed:'2026-10-02', num:'E5', title:'The Map and the Territory', category:'Pattern Essays', keywords:['model','abstraction','simplification','representation','Borges','assumptions','residuals'], content:'A model is a deliberate simplification. The danger is forgetting what was left out.' },
  { id:'essay-feedback', reviewed:'2026-10-02', num:'E6', title:'The Feedback Loop', category:'Pattern Essays', keywords:['feedback','compounding','exponential','S-curve','logistic','growth','tipping point','self-reinforcing'], content:'When a system\'s output feeds back into its input, small nudges can cascade into enormous change — or freeze everything in place.' },
  { id:'essay-walk', reviewed:'2026-10-02', num:'E7', title:'The Random Walk', category:'Pattern Essays', keywords:['random walk','Brownian motion','stock prices','drift','volatility','unpredictability','efficient market','path dependence'], content:'Each step is random, yet the path that emerges is not without structure. Distance grows — just not in the direction you expect.' },
  { id:'essay-threshold', reviewed:'2026-10-02', num:'E8', title:'The Threshold', category:'Pattern Essays', keywords:['threshold','tipping point','phase transition','sigmoid','bifurcation','critical point','nonlinear','catastrophe'], content:'Many systems stay quiet for a long time, then change all at once. The threshold is the hidden line that separates gradual from sudden.' },
  { id:'essay-survivor', reviewed:'2026-10-02', num:'E9', title:'Survivorship Bias', category:'Pattern Essays', keywords:['survivorship bias','selection bias','missing data','Wald','bombers','survivors','hidden failures','censored'], content:'We study what survived and forget what did not. The missing data is often where the real lesson hides.' },
  { id:'essay-fractal', reviewed:'2026-10-02', num:'E10', title:'The Fractal', category:'Pattern Essays', keywords:['fractal','self-similarity','scale invariance','Mandelbrot','recursion','coastline','dimension','branching'], content:'Zoom in and the pattern repeats. Self-similarity across scales is one of nature\u2019s most common signatures.' },
  { id:'essay-simpson', reviewed:'2026-10-02', num:'E11', title:'Simpson\u2019s Paradox', category:'Pattern Essays', keywords:['Simpson paradox','confounding','aggregation','lurking variable','reversal','subgroups','causation','statistics'], content:'A trend can point one way in every group and the opposite way when the groups are combined. Aggregation can lie.' },
  { id:'essay-kalman', reviewed:'2026-10-02', num:'E12', title:'The Deep Kalman Filter', category:'Pattern Essays', keywords:['Kalman filter','deep Kalman filter','state estimation','hidden state','sensor fusion','hotspot temperature','generator','transformer winding','state of charge','battery','EHR','health monitoring','filtering','prediction','measurement','process noise','Kalman gain','neural network','latent state'], content:'You cannot measure everything directly. The Kalman filter estimates a hidden state by blending what it predicts with what it noisily measures \u2014 and the deep version learns the model from data.' },
  { id:'essay-spring', reviewed:'2026-10-02', num:'E13', title:'The Coiled Spring', category:'Pattern Essays', keywords:['volatility clustering','compression','squeeze','triangle','breakout','range','GARCH','Mandelbrot','elastic rebound'], content:'Volatility clusters: a narrowing range stores up a move. Compression warns about the size of what comes next, not its direction.' },
  { id:'essay-forking', reviewed:'2026-10-02', num:'E14', title:'The Garden of Forking Paths', category:'Pattern Essays', keywords:['multiple testing','data snooping','p-hacking','backtest overfitting','forking paths','Gelman','Borges','false discovery','hyperparameter search'], content:'Every choice in an analysis is a fork. Try enough rules and one will pass by luck; the best result of a search is always flattered.' },
  { id:'essay-memory', reviewed:'2026-10-02', num:'E15', title:'How Long Is Memory?', category:'Pattern Essays', keywords:['memory','autocorrelation','forgetting curve','Ebbinghaus','Hurst','long memory','moving average','LSTM','attention','retention'], content:'Every model of a sequence decides how far back the past matters and how fast it fades, usually with a parameter nobody looks at.' },
  { id:'essay-bottleneck', reviewed:'2026-10-02', num:'E16', title:'The Bottleneck', category:'Pattern Essays', keywords:['bottleneck','queueing','Little\'s law','throughput','latency','utilisation','theory of constraints','Goldratt','funnel'], content:'A system goes no faster than its slowest step, and as it nears full capacity, waiting time grows far faster than the load.' },
  { id:'essay-reversible', reviewed:'2026-10-02', num:'E17', title:'Small, Reversible Bets', category:'Pattern Essays', keywords:['reversibility','two-way door','ruin','Kelly','ergodicity','rollback','shadow mode','position sizing','sunk cost','optionality'], content:'Make mistakes cheap to undo, and size the ones you cannot undo so that being wrong is survivable.' },
];

/* ═══════════════════════════════════════════════════════════════
   NAV BUILDER
   ═══════════════════════════════════════════════════════════════ */
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
        <span class="nav-section-arrow">\u25be</span>
      </div><div class="nav-items">`;
    sec.topics.forEach(tid => {
      if (tid === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">\u25c9</span>Overview</div>`;
      } else {
        num++;
        html += `<div class="ni" data-topic="${tid}" onclick="show('${tid}',true)"><span class="ni-num">E${num}</span>${TOPIC_NAMES[tid]}</div>`;
      }
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome()
    + buildEssayBell()
    + buildEssayMean()
    + buildEssayTail()
    + buildEssaySignal()
    + buildEssayMap()
    + buildEssayFeedback()
    + buildEssayWalk()
    + buildEssayThreshold()
    + buildEssaySurvivor()
    + buildEssayFractal()
    + buildEssaySimpson()
    + buildEssayKalman()
    + buildEssaySpring()
    + buildEssayForking()
    + buildEssayMemory()
    + buildEssayBottleneck()
    + buildEssayReversible();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Pattern <em>Essays</em></h2>
    <p style="margin-top:14px">Short, calm reflections on patterns that appear across the world &mdash; in data, in markets, in everyday life. Each essay is accompanied by a small visualization. No formulas. No code. Just the pattern.</p>
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">17</div><div class="home-stat-label">Essays</div></div>
      <div class="home-stat"><div class="home-stat-num">17</div><div class="home-stat-label">Visualizations</div></div>
    </div>
    <p style="margin-top:18px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> arrow keys to navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="show('essay-bell',true)">
      <div class="cat-card-icon">\ud835\udd4f</div>
      <div class="cat-card-name">The Bell in Everything</div>
      <div class="cat-card-count">Normal distributions emerge wherever many small forces combine</div>
    </div>
    <div class="cat-card" onclick="show('essay-mean',true)">
      <div class="cat-card-icon">\u21c5</div>
      <div class="cat-card-name">Regression to the Mean</div>
      <div class="cat-card-count">Extreme outcomes pull back toward the centre &mdash; always</div>
    </div>
    <div class="cat-card" onclick="show('essay-tail',true)">
      <div class="cat-card-icon">\u221e</div>
      <div class="cat-card-name">The Long Tail</div>
      <div class="cat-card-count">Most things are small &mdash; a few are enormous</div>
    </div>
    <div class="cat-card" onclick="show('essay-signal',true)">
      <div class="cat-card-icon">\u223f</div>
      <div class="cat-card-name">Signal in the Noise</div>
      <div class="cat-card-count">Every dataset mixes pattern and randomness</div>
    </div>
    <div class="cat-card" onclick="show('essay-map',true)">
      <div class="cat-card-icon">\u25b3</div>
      <div class="cat-card-name">The Map and the Territory</div>
      <div class="cat-card-count">A model is a deliberate simplification</div>
    </div>
    <div class="cat-card" onclick="show('essay-feedback',true)">
      <div class="cat-card-icon">\u21ba</div>
      <div class="cat-card-name">The Feedback Loop</div>
      <div class="cat-card-count">Small nudges cascade into enormous change</div>
    </div>
    <div class="cat-card" onclick="show('essay-walk',true)">
      <div class="cat-card-icon">\u223c</div>
      <div class="cat-card-name">The Random Walk</div>
      <div class="cat-card-count">Each step is random &mdash; the path is not</div>
    </div>
    <div class="cat-card" onclick="show('essay-threshold',true)">
      <div class="cat-card-icon">\u26a1</div>
      <div class="cat-card-name">The Threshold</div>
      <div class="cat-card-count">Quiet for a long time &mdash; then all at once</div>
    </div>
    <div class="cat-card" onclick="show('essay-survivor',true)">
      <div class="cat-card-icon">\u2708</div>
      <div class="cat-card-name">Survivorship Bias</div>
      <div class="cat-card-count">We study what survived &mdash; and forget what did not</div>
    </div>
    <div class="cat-card" onclick="show('essay-fractal',true)">
      <div class="cat-card-icon">\u2745</div>
      <div class="cat-card-name">The Fractal</div>
      <div class="cat-card-count">Zoom in &mdash; and the pattern repeats itself</div>
    </div>
    <div class="cat-card" onclick="show('essay-simpson',true)">
      <div class="cat-card-icon">\u2696</div>
      <div class="cat-card-name">Simpson\u2019s Paradox</div>
      <div class="cat-card-count">Every group says one thing &mdash; the total says another</div>
    </div>
    <div class="cat-card" onclick="show('essay-kalman',true)">
      <div class="cat-card-icon">\u29bf</div>
      <div class="cat-card-name">The Deep Kalman Filter</div>
      <div class="cat-card-count">Estimating what you cannot measure &mdash; predict, then correct</div>
    </div>
    <div class="cat-card" onclick="show('essay-spring',true)">
      <div class="cat-card-icon">\u2307</div>
      <div class="cat-card-name">The Coiled Spring</div>
      <div class="cat-card-count">Quiet gathers before loud &mdash; a squeeze warns about size, not direction</div>
    </div>
    <div class="cat-card" onclick="show('essay-forking',true)">
      <div class="cat-card-icon">\u2442</div>
      <div class="cat-card-name">The Garden of Forking Paths</div>
      <div class="cat-card-count">Try enough paths and one will work &mdash; by luck alone</div>
    </div>
    <div class="cat-card" onclick="show('essay-memory',true)">
      <div class="cat-card-icon">\u21a9</div>
      <div class="cat-card-name">How Long Is Memory?</div>
      <div class="cat-card-count">Every model decides how much the past matters</div>
    </div>
    <div class="cat-card" onclick="show('essay-bottleneck',true)">
      <div class="cat-card-icon">\u29d7</div>
      <div class="cat-card-name">The Bottleneck</div>
      <div class="cat-card-count">The slowest step sets the pace &mdash; and waiting explodes near capacity</div>
    </div>
    <div class="cat-card" onclick="show('essay-reversible',true)">
      <div class="cat-card-icon">⇄</div>
      <div class="cat-card-name">Small, Reversible Bets</div>
      <div class="cat-card-count">Make mistakes cheap to undo &mdash; and survivable when you cannot</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   ESSAY BUILDERS
   ═══════════════════════════════════════════════════════════════ */

/* E1 — The Bell in Everything */
function buildEssayBell() {
  return `<div class="topic pattern-essay" id="essay-bell">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E1 \u2014 Pattern Essays</div><h2>The Bell in <em>Everything</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Wherever many small, independent forces combine, the same shape appears</p>
  <p class="prose">Measure the heights of a thousand strangers. Plot them. A bell curve forms \u2014 not because anyone designed it, but because height is the sum of many small genetic and environmental nudges, each roughly independent, each roughly random. The Central Limit Theorem says this will happen whenever you add up enough of these small forces, regardless of what each one looks like individually.</p>
  <p class="prose">The bell appears in measurement error, in exam scores, and roughly in the middle of daily stock-index returns — though not in their tails, which are far fatter than a bell allows. It is not imposed from above; it <em>emerges</em> from below. That emergence is the pattern: complexity aggregating into simplicity. A thousand causes, one shape.</p>
  <p class="prose">The next time you see a histogram clustering around a centre and fading at the edges, you are looking at the arithmetic of accumulation. Nothing more \u2014 and nothing less.</p>
  <div class="va">
    <canvas id="bellCanvas" role="img" aria-label="The Bell in Everything — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Dice rolled</span>
      <input type="range" aria-label="Dice rolled" id="bellDiceSlider" min="1" max="12" value="1" oninput="document.getElementById('bellDiceVal').textContent=this.value;DRAWS['essay-bell']()">
      <span class="viz-ctrl-val" id="bellDiceVal">1</span>
    </div>
    <div class="essay-label">Sum of <em>n</em> dice &mdash; watch the bell emerge</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Whenever many small, independent effects add up, expect a bell curve \u2014 and expect genuine extremes to be rare.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Laplace, P.-S. (1810). M\u00e9moire sur les approximations des formules qui sont fonctions de tr\u00e8s grands nombres. <em>M\u00e9moires de l\u2019Acad\u00e9mie royale des Sciences de Paris.</em></div>
    <div class="essay-ref">[2] Fischer, H. (2011). <em>A History of the Central Limit Theorem.</em> Springer. <a href="https://doi.org/10.1007/978-0-387-87857-7" target="_blank" rel="noopener">doi:10.1007/978-0-387-87857-7</a></div>
    <div class="essay-ref">[3] Lyon, A. (2014). Why are Normal Distributions Normal? <em>The British Journal for the Philosophy of Science, 65</em>(3), 621\u2013649. <a href="https://doi.org/10.1093/bjps/axs046" target="_blank" rel="noopener">doi:10.1093/bjps/axs046</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-bell')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The same emergence powers the <a href="../stats/index.html#distribution-shape">distribution shape</a> topic in The Toolkit, and the <a href="../stats/index.html#confidence-intervals">confidence interval</a> relies on this bell to set its width.</div>
  <div class="topic-nav" id="nav-essay-bell"></div>
</div>`;
}

/* E2 — Regression to the Mean */
function buildEssayMean() {
  return `<div class="topic pattern-essay" id="essay-mean">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E2 \u2014 Pattern Essays</div><h2>Regression to the <em>Mean</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Extreme outcomes are followed by less extreme ones \u2014 not a force, just arithmetic</p>
  <p class="prose">Francis Galton measured parents and children in the 1880s and noticed something odd: the tallest parents tended to have children who were tall \u2014 but not <em>quite</em> as tall. The shortest parents had children who were short \u2014 but not quite as short. He called it &ldquo;regression toward mediocrity.&rdquo;</p>
  <p class="prose">This is not a biological force pulling everyone to average. It is arithmetic. Any measurement is part signal, part luck. When luck runs extremely high, it is unlikely to run that high again. So the next measurement drifts back toward the centre. A fund manager\u2019s best quarter is followed by a more ordinary one. A student\u2019s worst exam is followed by a better one. Nothing changed except the luck component.</p>
  <p class="prose">The pattern: whenever you select on an extreme, the follow-up will be less extreme. Understanding this prevents you from inventing explanations for what is simply reversion.</p>
  <div class="va">
    <canvas id="meanCanvas" role="img" aria-label="Regression to the Mean — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Correlation</span>
      <input type="range" aria-label="Correlation" id="meanCorrSlider" min="0" max="100" value="55" oninput="document.getElementById('meanCorrVal').textContent=Math.round(this.value)+'%';DRAWS['essay-mean']()">
      <span class="viz-ctrl-val" id="meanCorrVal">55%</span>
    </div>
    <div class="essay-label">First measurement vs. second &mdash; the pull toward centre</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>After any extreme result, bet on something more ordinary next \u2014 and resist inventing a story for the change.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Galton, F. (1886). Regression Towards Mediocrity in Hereditary Stature. <em>Journal of the Anthropological Institute, 15</em>, 246\u2013263. <a href="https://doi.org/10.2307/2841583" target="_blank" rel="noopener">doi:10.2307/2841583</a></div>
    <div class="essay-ref">[2] Kahneman, D. (2011). <em>Thinking, Fast and Slow</em>, Ch. 17: Regression to the Mean. Farrar, Straus and Giroux.</div>
    <div class="essay-ref">[3] Barnett, A. G., van der Pols, J. C. &amp; Dobson, A. J. (2005). Regression to the mean: what it is and how to deal with it. <em>International Journal of Epidemiology, 34</em>(1), 215\u2013220. <a href="https://doi.org/10.1093/ije/dyh299" target="_blank" rel="noopener">doi:10.1093/ije/dyh299</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-mean')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#bayesian-ab">Bayesian A/B testing</a> topic wrestles with the same trap \u2014 is the improvement real, or just regression to the mean?</div>
  <div class="topic-nav" id="nav-essay-mean"></div>
</div>`;
}

/* E3 — The Long Tail */
function buildEssayTail() {
  return `<div class="topic pattern-essay" id="essay-tail">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E3 \u2014 Pattern Essays</div><h2>The Long <em>Tail</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Most things are small \u2014 a few are enormous \u2014 and the pattern keeps repeating</p>
  <p class="prose">Rank cities by population and plot the result. A handful of megacities tower on the left; thousands of towns form a long, whispering tail stretching to the right. Now do the same with word frequencies, website traffic, the energy released by earthquakes, or personal wealth. The shape is the same: steep drop, then a tail that refuses to die.</p>
  <p class="prose">These are power-law distributions, and they emerge wherever <em>success breeds success</em> \u2014 a city that grows attracts more people, which makes it grow further. A word used often becomes even more familiar, so it gets used again. The rich get richer, not always through merit, but through mechanics.</p>
  <p class="prose">The tail matters more than it looks. In a bell curve, extremes are vanishingly rare. In a power law, the single largest event can dwarf the rest combined. This is why one earthquake, one pandemic, or one black swan trade can reshape everything.</p>
  <div class="va">
    <canvas id="tailCanvas" role="img" aria-label="The Long Tail — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Inequality</span>
      <input type="range" aria-label="Inequality" id="tailAlphaSlider" min="10" max="50" value="18" oninput="document.getElementById('tailAlphaVal').textContent=(this.value/10).toFixed(1);DRAWS['essay-tail']()">
      <span class="viz-ctrl-val" id="tailAlphaVal">1.8</span>
    </div>
    <div class="essay-label">The few and the many &mdash; drag to steepen the tail</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>In a power-law world the average is misleading, and the single biggest event can outweigh all the rest combined.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Newman, M. E. J. (2005). Power laws, Pareto distributions and Zipf\u2019s law. <em>Contemporary Physics, 46</em>(5), 323\u2013351. <a href="https://doi.org/10.1080/00107510500052444" target="_blank" rel="noopener">doi:10.1080/00107510500052444</a></div>
    <div class="essay-ref">[2] Barab\u00e1si, A.-L. &amp; Albert, R. (1999). Emergence of Scaling in Random Networks. <em>Science, 286</em>(5439), 509\u2013512. <a href="https://doi.org/10.1126/science.286.5439.509" target="_blank" rel="noopener">doi:10.1126/science.286.5439.509</a></div>
    <div class="essay-ref">[3] Taleb, N. N. (2007). <em>The Black Swan: The Impact of the Highly Improbable.</em> Random House.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-tail')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#outlier-detection">outlier detection</a> topic asks when the tail <em>is</em> the signal, and <a href="../stats/index.html#max-drawdown">maximum drawdown</a> lives in this tail.</div>
  <div class="topic-nav" id="nav-essay-tail"></div>
</div>`;
}

/* E4 — Signal in the Noise */
function buildEssaySignal() {
  return `<div class="topic pattern-essay" id="essay-signal">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E4 \u2014 Pattern Essays</div><h2>Signal in the <em>Noise</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// The hard part is not finding pattern \u2014 it is resisting the urge to find it where there is none</p>
  <p class="prose">Scatter a hundred random points on a plane. Stare long enough and you will see clusters, streaks, shapes. The human brain is a pattern-completion machine \u2014 it was built for a world where mistaking a shadow for a predator was safer than ignoring a predator. That wiring does not switch off when you look at data.</p>
  <p class="prose">Every dataset is a blend of true signal and meaningless noise. A model trained too eagerly memorises the noise and calls it knowledge \u2014 the textbook definition of overfitting. The antidote is restraint: hold data back, cross-validate, penalise complexity, and accept that &ldquo;I don\u2019t know&rdquo; is sometimes the most accurate answer.</p>
  <p class="prose">The pattern here is a meta-pattern: <em>the urge to see patterns can itself be the error</em>. The discipline of statistics is, at its core, a set of tools for telling the difference.</p>
  <div class="va">
    <canvas id="signalCanvas" role="img" aria-label="Signal in the Noise — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Noise level</span>
      <input type="range" aria-label="Noise level" id="signalNoiseSlider" min="0" max="100" value="50" oninput="document.getElementById('signalNoiseVal').textContent=this.value+'%';DRAWS['essay-signal']()">
      <span class="viz-ctrl-val" id="signalNoiseVal">50%</span>
    </div>
    <div class="essay-label">A wave hiding in noise &mdash; drag to reveal or bury it</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Before trusting a pattern, ask whether you would still see it in fresh data you have not looked at yet.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Silver, N. (2012). <em>The Signal and the Noise: Why So Many Predictions Fail \u2014 but Some Don\u2019t.</em> Penguin Press.</div>
    <div class="essay-ref">[2] Foster, K. R. &amp; Kokko, H. (2009). The evolution of superstitious and superstition-like behaviour. <em>Proceedings of the Royal Society B, 276</em>(1654), 31\u201337. <a href="https://doi.org/10.1098/rspb.2008.0981" target="_blank" rel="noopener">doi:10.1098/rspb.2008.0981</a></div>
    <div class="essay-ref">[3] Hastie, T., Tibshirani, R. &amp; Friedman, J. (2009). <em>The Elements of Statistical Learning</em>, Ch. 7: Model Assessment and Selection. Springer. <a href="https://doi.org/10.1007/978-0-387-84858-7" target="_blank" rel="noopener">doi:10.1007/978-0-387-84858-7</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-signal')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> <a href="../stats/index.html#cross-validation">Cross-validation</a> is the practical guard against this, and <a href="../stats/index.html#learning-curves">learning curves</a> let you see overfitting happen in real time. Searching many rules until one works is the trap of <a href="index.html#essay-forking">The Garden of Forking Paths</a>.</div>
  <div class="topic-nav" id="nav-essay-signal"></div>
</div>`;
}

/* E5 — The Map and the Territory */
function buildEssayMap() {
  return `<div class="topic pattern-essay" id="essay-map">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E5 \u2014 Pattern Essays</div><h2>The Map and the <em>Territory</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// A model is a deliberate simplification \u2014 the danger is forgetting what was left out</p>
  <p class="prose">Jorge Luis Borges imagined an empire whose cartographers drew a map so detailed it was the same size as the empire itself. It was, of course, useless. A map\u2019s value is in what it <em>leaves out</em> \u2014 the irrelevant streets, the unchanged fields \u2014 so that what remains becomes visible.</p>
  <p class="prose">Every model you build is a map. A linear regression draws one straight line through a cloud of points and declares, &ldquo;this is the relationship.&rdquo; The cloud disagrees at every point. That disagreement \u2014 the residuals \u2014 is not a flaw; it is the honest price of simplification. The danger arrives when you forget the residuals exist, when you treat the line as the territory.</p>
  <p class="prose">The best practitioners hold two truths at once: the model is useful <em>and</em> the model is wrong. The gap between the line and the dots is where humility lives.</p>
  <div class="va">
    <canvas id="mapCanvas" role="img" aria-label="The Map and the Territory — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Model complexity</span>
      <input type="range" aria-label="Model complexity" id="mapComplexSlider" min="1" max="5" value="1" oninput="document.getElementById('mapComplexVal').textContent=['Linear','Quadratic','Cubic','Degree 4','Overfit'][this.value-1];DRAWS['essay-map']()">
      <span class="viz-ctrl-val" id="mapComplexVal">Linear</span>
    </div>
    <div class="essay-label">The line and the dots &mdash; watch the model overfit</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Every model is wrong in some way \u2014 keep the residuals in view and never mistake the line for the world.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Borges, J. L. (1946). On Exactitude in Science. <em>Los Anales de Buenos Aires, 1</em>(3).</div>
    <div class="essay-ref">[2] Box, G. E. P. (1976). Science and Statistics. <em>Journal of the American Statistical Association, 71</em>(356), 791\u2013799. <a href="https://doi.org/10.1080/01621459.1976.10480949" target="_blank" rel="noopener">doi:10.1080/01621459.1976.10480949</a></div>
    <div class="essay-ref">[3] Korzybski, A. (1933). <em>Science and Sanity: An Introduction to Non-Aristotelian Systems and General Semantics.</em> Institute of General Semantics.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-map')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> <a href="../stats/index.html#regression-metrics">Regression metrics</a> quantify this gap, and <a href="../stats/index.html#shap-values">SHAP values</a> show what the model chose to see.</div>
  <div class="topic-nav" id="nav-essay-map"></div>
</div>`;
}

/* E6 — The Feedback Loop */
function buildEssayFeedback() {
  return `<div class="topic pattern-essay" id="essay-feedback">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E6 — Pattern Essays</div><h2>The Feedback <em>Loop</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// When a system’s output feeds back into its input, small nudges can cascade into enormous change</p>
  <p class="prose">A savings account grows slowly at first. Interest earns interest, which earns more interest. After a few years the line barely looks bent. After a few decades it curves sharply upward. Nothing changed in the rules — only time passed. This is compounding: the simplest and most powerful feedback loop.</p>
  <p class="prose">But exponential growth always meets a wall — resources run out, competition arrives, the body builds immunity. The result is an S-curve: slow start, explosive middle, plateau at the top. Population growth, technology adoption and epidemics often follow this shape. The feedback loop is the engine; the ceiling is the brake.</p>
  <p class="prose">Negative feedback works in reverse: the output damps the system back toward equilibrium. A thermostat. A predator-prey cycle. The price mechanism in a market. Without negative feedback, every small perturbation would spiral forever.</p>
  <div class="va">
    <canvas id="feedbackCanvas" role="img" aria-label="The Feedback Loop — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Growth rate</span>
      <input type="range" aria-label="Growth rate" id="feedbackRateSlider" min="102" max="140" value="120" oninput="document.getElementById('feedbackRateVal').textContent=((this.value/100-1)*100).toFixed(0)+'%/yr';DRAWS['essay-feedback']()">
      <span class="viz-ctrl-val" id="feedbackRateVal">20%/yr</span>
    </div>
    <div class="essay-label">Exponential growth hitting a ceiling &mdash; the S-curve</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Find the loop \u2014 what feeds back into what \u2014 because that, not the starting point, decides where a system ends up.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Meadows, D. H. (2008). <em>Thinking in Systems: A Primer.</em> Chelsea Green Publishing.</div>
    <div class="essay-ref">[2] Strogatz, S. (2003). <em>Sync: How Order Emerges From Chaos in the Universe, Nature, and Daily Life.</em> Hyperion.</div>
    <div class="essay-ref">[3] Verhulst, P.-F. (1838). Notice sur la loi que la population suit dans son accroissement. <em>Correspondance Mathématique et Physique, 10</em>, 113–121.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-feedback')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#distribution-shape">distribution shape</a> topic shows what happens when feedback loops generate extreme outcomes, and <a href="../sandbox/markets/index.html#indicator-playground">moving averages</a> are a practical negative-feedback tool. Where a loop runs into the slowest step in a system, see <a href="index.html#essay-bottleneck">The Bottleneck</a>.</div>
  <div class="topic-nav" id="nav-essay-feedback"></div>
</div>`;
}

/* E7 — The Random Walk */
function buildEssayWalk() {
  return `<div class="topic pattern-essay" id="essay-walk">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E7 — Pattern Essays</div><h2>The Random <em>Walk</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Each step is random — yet the path that emerges is not without structure</p>
  <p class="prose">Imagine a drunkard leaving a lamp post, each step equally likely to go left or right. Where will they be after a thousand steps? Not where they started — the distance from the lamp post grows, just not in a predictable direction. This is a random walk, and it describes stock prices, the diffusion of molecules, the path of a pollen grain in water.</p>
  <p class="prose">The surprising thing is the square-root law: after <em>n</em> steps of size 1, the typical (root-mean-square) distance from the start is &radic;<em>n</em>, not <em>n</em>. Quadrupling your time only doubles your uncertainty. A four-year forecast is twice as uncertain as a one-year forecast — not four times.</p>
  <p class="prose">Random walks also explain why past prices carry almost no information about future prices in efficient markets. Each step erases the memory of the last. The path looks meaningful in hindsight. It was not.</p>
  <div class="va">
    <canvas id="walkCanvas" role="img" aria-label="The Random Walk — visualization" height="180"></canvas>
    <button class="viz-regen" onclick="DRAWS['essay-walk']()">&#8635; New walk</button>
    <div class="essay-label">Five simultaneous random walks &mdash; each unique, none predictable</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Uncertainty grows with the square root of time, and a convincing path in hindsight may carry no signal at all.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Pearson, K. (1905). The Problem of the Random Walk. <em>Nature, 72</em>(1865), 294. <a href="https://doi.org/10.1038/072294b0" target="_blank" rel="noopener">doi:10.1038/072294b0</a></div>
    <div class="essay-ref">[2] Malkiel, B. G. (1973). <em>A Random Walk Down Wall Street.</em> W. W. Norton &amp; Company.</div>
    <div class="essay-ref">[3] Fama, E. F. (1965). Random Walks in Stock Market Prices. <em>Financial Analysts Journal, 21</em>(5), 55–59. <a href="https://doi.org/10.2469/faj.v21.n5.55" target="_blank" rel="noopener">doi:10.2469/faj.v21.n5.55</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-walk')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../sandbox/markets/index.html#paper-trading">paper trading</a> activity lets you test whether you can beat a random walk, and <a href="../timeseries/index.html#decomposition">time-series analysis</a> is the tool for extracting the non-random component. Why the size of each step decides whether a walker survives at all is the subject of <a href="index.html#essay-reversible">Small, Reversible Bets</a>.</div>
  <div class="topic-nav" id="nav-essay-walk"></div>
</div>`;
}

/* E8 — The Threshold */
function buildEssayThreshold() {
  return `<div class="topic pattern-essay" id="essay-threshold">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E8 — Pattern Essays</div><h2>The <em>Threshold</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Many systems stay quiet for a long time — then change all at once</p>
  <p class="prose">Add grains of sand to a pile, one at a time. For a long while, nothing dramatic happens. Then, at some unpredictable moment, a single grain triggers an avalanche. The pile was always close to collapse. The last grain gets the credit it did not deserve.</p>
  <p class="prose">This is threshold behaviour, and it appears everywhere: a rumour that suddenly goes viral, ice that holds firm and then fractures, a neuron that fires only when input crosses a minimum. In each case, input and output are not proportional. Small changes accumulate invisibly until the threshold is crossed, and then the system snaps.</p>
  <p class="prose">The sigmoid function is the mathematician’s version: nearly flat on both sides, steep in the middle. It describes the dose-response curve of a drug, the probability of a binary outcome in logistic regression, and the activation of a neuron. The threshold is not special — it is simply the midpoint of a curve that was always going to be steep somewhere.</p>
  <div class="va">
    <canvas id="thresholdCanvas" role="img" aria-label="The Threshold — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Input level</span>
      <input type="range" aria-label="Input level" id="thresholdInputSlider" min="0" max="100" value="30" oninput="document.getElementById('thresholdInputVal').textContent=this.value;DRAWS['essay-threshold']()">
      <span class="viz-ctrl-val" id="thresholdInputVal">30</span>
    </div>
    <div class="essay-label">The sigmoid &mdash; drag through the threshold</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Slow, invisible accumulation can end in a sudden snap \u2014 watch the approach to the line, not just the line itself.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Bak, P., Tang, C. &amp; Wiesenfeld, K. (1987). Self-organized criticality. <em>Physical Review Letters, 59</em>(4), 381–384. <a href="https://doi.org/10.1103/PhysRevLett.59.381" target="_blank" rel="noopener">doi:10.1103/PhysRevLett.59.381</a></div>
    <div class="essay-ref">[2] Gladwell, M. (2000). <em>The Tipping Point: How Little Things Can Make a Big Difference.</em> Little, Brown and Company.</div>
    <div class="essay-ref">[3] Strogatz, S. H. (1994). <em>Nonlinear Dynamics and Chaos.</em> Addison-Wesley. Ch. 3: Bifurcations.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-threshold')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Logistic regression in the <a href="../sandbox/ml/index.html#classification-boundary">ML Lab</a> is built on this very curve, and <a href="../stats/index.html#hypothesis-testing">hypothesis testing</a> uses a threshold (the p-value) to decide when evidence becomes belief. The quiet build-up before a market breaks is the theme of <a href="index.html#essay-spring">The Coiled Spring</a>.</div>
  <div class="topic-nav" id="nav-essay-threshold"></div>
</div>`;
}

/* E9 — Survivorship Bias */
function buildEssaySurvivor() {
  return `<div class="topic pattern-essay" id="essay-survivor">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E9 \u2014 Pattern Essays</div><h2>Survivorship <em>Bias</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// We study what survived \u2014 and quietly forget everything that did not</p>
  <p class="prose">During the Second World War, the U.S. military studied bombers returning from missions and mapped where they were riddled with bullet holes \u2014 the wings, the fuselage, the tail. The instinct was to reinforce those areas. The statistician Abraham Wald saw it differently: the holes showed where a plane could be hit <em>and still come home</em>. The places with no holes \u2014 the engines, the cockpit \u2014 were where the lost planes had been struck. Reinforce the gaps, he argued, not the marks.</p>
  <p class="prose">This is survivorship bias: we draw conclusions from the things that made it through the filter and never see the ones that did not. We study successful founders and copy their habits, ignoring the identical habits of thousands who failed. We admire old buildings and call past craftsmanship superior, forgetting the flimsy ones that already collapsed.</p>
  <p class="prose">The pattern is a hole in the data, not in the analysis. The missing observations are invisible by definition \u2014 which is exactly why they are so easy to forget, and so dangerous to ignore.</p>
  <div class="va">
    <canvas id="survivorCanvas" role="img" aria-label="Survivorship Bias — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Survival cutoff</span>
      <input type="range" aria-label="Survival cutoff" id="survivorCutSlider" min="0" max="80" value="40" oninput="document.getElementById('survivorCutVal').textContent=this.value;DRAWS['essay-survivor']()">
      <span class="viz-ctrl-val" id="survivorCutVal">40</span>
    </div>
    <div class="essay-label">Only survivors are seen &mdash; drag to watch the visible average inflate</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Before trusting any lesson drawn from winners, ask what happened to everyone who is no longer in the sample.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Wald, A. (1943). <em>A Method of Estimating Plane Vulnerability Based on Damage of Survivors.</em> Statistical Research Group, Columbia University. Reprinted CRC 432 (1980).</div>
    <div class="essay-ref">[2] Mangel, M. &amp; Samaniego, F. J. (1984). Abraham Wald\u2019s Work on Aircraft Survivability. <em>Journal of the American Statistical Association, 79</em>(386), 259\u2013267. <a href="https://doi.org/10.1080/01621459.1984.10478038" target="_blank" rel="noopener">doi:10.1080/01621459.1984.10478038</a></div>
    <div class="essay-ref">[3] Brown, S. J., Goetzmann, W., Ibbotson, R. G. &amp; Ross, S. A. (1992). Survivorship Bias in Performance Studies. <em>Review of Financial Studies, 5</em>(4), 553\u2013580. <a href="https://doi.org/10.1093/rfs/5.4.553" target="_blank" rel="noopener">doi:10.1093/rfs/5.4.553</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-survivor')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#outlier-detection">outlier detection</a> topic deals with the data you can see, while <a href="../stats/index.html#survivorship-bias">survivorship &amp; look-ahead bias</a> is the backtesting trap built on funds and strategies that quietly disappeared.</div>
  <div class="topic-nav" id="nav-essay-survivor"></div>
</div>`;
}

/* E10 — The Fractal */
function buildEssayFractal() {
  return `<div class="topic pattern-essay" id="essay-fractal">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E10 \u2014 Pattern Essays</div><h2>The <em>Fractal</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// Zoom in, and the pattern repeats \u2014 the same shape living inside itself</p>
  <p class="prose">How long is the coastline of Britain? It sounds like a question with an answer, until you try to measure it. Use a long ruler and you cut across the bays; use a shorter one and you trace into each inlet, finding more length. Shrink the ruler again and the coastline grows once more. The closer you look, the more detail appears \u2014 and the detail looks like the whole.</p>
  <p class="prose">Beno\u00eet Mandelbrot called these shapes fractals: objects whose structure repeats across scales. A branch resembles the tree; a tributary resembles the river; a jagged minute of stock prices resembles a jagged year. Self-similarity is not a curiosity \u2014 it is one of the most common signatures of how nature builds, from lungs and blood vessels to lightning and snowflakes.</p>
  <p class="prose">The pattern is recursion made visible: a simple rule applied to itself, over and over, producing endless complexity from almost nothing. The whole is written into every part.</p>
  <div class="va">
    <canvas id="fractalCanvas" role="img" aria-label="The Fractal — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Recursion depth</span>
      <input type="range" aria-label="Recursion depth" id="fractalDepthSlider" min="1" max="10" value="6" oninput="document.getElementById('fractalDepthVal').textContent=this.value;DRAWS['essay-fractal']()">
      <span class="viz-ctrl-val" id="fractalDepthVal">6</span>
    </div>
    <div class="essay-label">A recursive tree &mdash; drag to grow detail from a single rule</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>When a shape looks the same at every zoom level, a simple repeated rule is usually doing the work \u2014 and there may be no single \u201ctrue\u201d scale to measure.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Mandelbrot, B. (1967). How Long Is the Coast of Britain? Statistical Self-Similarity and Fractional Dimension. <em>Science, 156</em>(3775), 636\u2013638. <a href="https://doi.org/10.1126/science.156.3775.636" target="_blank" rel="noopener">doi:10.1126/science.156.3775.636</a></div>
    <div class="essay-ref">[2] Mandelbrot, B. (1982). <em>The Fractal Geometry of Nature.</em> W. H. Freeman and Company.</div>
    <div class="essay-ref">[3] Mandelbrot, B. &amp; Hudson, R. L. (2004). <em>The (Mis)Behavior of Markets: A Fractal View of Risk, Ruin, and Reward.</em> Basic Books.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-fractal')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The fat tails of <a href="../stats/index.html#distribution-shape">distribution shape</a> are a fractal fingerprint, and <a href="../stats/index.html#monte-carlo">Monte Carlo simulation</a> generates the jagged, self-similar paths Mandelbrot described.</div>
  <div class="topic-nav" id="nav-essay-fractal"></div>
</div>`;
}

/* E11 — Simpson's Paradox */
function buildEssaySimpson() {
  return `<div class="topic pattern-essay" id="essay-simpson">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E11 \u2014 Pattern Essays</div><h2>Simpson\u2019s <em>Paradox</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">2 min read</span></div>
  </div>
  <p class="sub">// A trend can point one way in every group \u2014 and the opposite way once they are combined</p>
  <p class="prose">In 1973, Berkeley appeared to admit men at a higher rate than women, hinting at bias. But when admissions were broken down department by department, most departments showed no bias against women, and several slightly favoured them. The reversal was real, not a mistake. Women had applied in larger numbers to the most competitive departments, where everyone\u2019s odds were low. The aggregate hid the structure.</p>
  <p class="prose">This is Simpson\u2019s paradox: a relationship that holds within every subgroup can vanish or flip when the subgroups are pooled. A treatment can help both mild and severe patients yet look worse overall, simply because it was given more often to the sicker ones. The lurking variable \u2014 department, severity, the way cases were sorted \u2014 quietly steers the total.</p>
  <p class="prose">The pattern is a warning about aggregation: a single number summarising a mixed population can point in a direction that is true of <em>no one</em> inside it. The fix is not better arithmetic \u2014 it is asking what was combined, and why.</p>
  <div class="va">
    <canvas id="simpsonCanvas" role="img" aria-label="Simpson’s Paradox — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Group separation</span>
      <input type="range" aria-label="Group separation" id="simpsonSepSlider" min="0" max="100" value="70" oninput="document.getElementById('simpsonSepVal').textContent=this.value+'%';DRAWS['essay-simpson']()">
      <span class="viz-ctrl-val" id="simpsonSepVal">70%</span>
    </div>
    <div class="essay-label">Two rising groups, one falling total &mdash; drag to separate them</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Before trusting an overall trend, split the data by the obvious subgroups \u2014 the aggregate can point where no group does.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Simpson, E. H. (1951). The Interpretation of Interaction in Contingency Tables. <em>Journal of the Royal Statistical Society B, 13</em>(2), 238\u2013241. <a href="https://doi.org/10.1111/j.2517-6161.1951.tb00088.x" target="_blank" rel="noopener">doi:10.1111/j.2517-6161.1951.tb00088.x</a></div>
    <div class="essay-ref">[2] Bickel, P. J., Hammel, E. A. &amp; O\u2019Connell, J. W. (1975). Sex Bias in Graduate Admissions: Data from Berkeley. <em>Science, 187</em>(4175), 398\u2013404. <a href="https://doi.org/10.1126/science.187.4175.398" target="_blank" rel="noopener">doi:10.1126/science.187.4175.398</a></div>
    <div class="essay-ref">[3] Pearl, J. (2014). Comment: Understanding Simpson\u2019s Paradox. <em>The American Statistician, 68</em>(1), 8\u201313. <a href="https://doi.org/10.1080/00031305.2014.876829" target="_blank" rel="noopener">doi:10.1080/00031305.2014.876829</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-simpson')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#feature-correlation">feature correlation</a> topic shares this lurking-variable trap, and <a href="../stats/index.html#bayesian-ab">Bayesian A/B testing</a> must guard against pooling groups that should stay apart.</div>
  <div class="topic-nav" id="nav-essay-simpson"></div>
</div>`;
}

/* E12 — The Deep Kalman Filter */
function buildEssayKalman() {
  return `<div class="topic pattern-essay" id="essay-kalman">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E12 \u2014 Pattern Essays</div><h2>The Deep <em>Kalman Filter</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// Estimating what you cannot measure \u2014 predict, then correct, then predict again</p>
  <p class="prose">Some of the most important numbers in the world cannot be measured directly. The temperature deep inside a spinning generator. The exact charge left in a battery. The true health of a patient between hospital visits. In each case the quantity that matters is <em>hidden</em> \u2014 wrapped in insulation, sealed in a cell, hidden inside a body \u2014 and all we have are noisy, indirect signals from the outside.</p>
  <p class="prose">In 1960, Rudolf K\u00e1lm\u00e1n described a way to estimate such hidden quantities. The idea is a rhythm of two steps. First <strong>predict</strong>: use a model of how the system behaves to guess where the hidden state should be a moment from now. Then <strong>correct</strong>: when a noisy measurement arrives, nudge the guess toward it \u2014 but only partway, in proportion to how much you trust the sensor versus the model. Repeat forever. The amount of that nudge is the famous <em>Kalman gain</em>, and it automatically settles on the optimal blend of prediction and measurement.</p>
  <p class="prose">The classic filter assumes you can write the system\u2019s physics down by hand as neat linear equations. Reality is rarely so polite. The <strong>Deep Kalman Filter</strong> keeps the same predict-then-correct rhythm but replaces the hand-written model with neural networks that <em>learn</em> how the hidden state evolves and how it shows up in the sensors \u2014 straight from data. It is the same ancient pattern of disciplined guessing, now able to handle systems too tangled to derive on paper.</p>

  <div class="essay-case">
    <h4>Case 1 \u2014 The generator\u2019s hidden hotspot</h4>
    <p>Inside a large generator or power transformer, the part that fails first is the hottest spot in the copper winding, buried under layers of insulation where no thermometer can sit. Run too hot for too long and the insulation ages and cracks. Engineers cannot read that hotspot directly \u2014 instead they measure load current, coolant and oil temperature, and ambient air, then let a thermal model infer the rest. A Kalman-style estimator fuses those noisy outside readings with a model of how heat builds and dissipates to track the unseen hotspot in real time. A deep version learns the messy, nonlinear thermal behaviour of a specific machine \u2014 something the textbook IEC loading curves only approximate \u2014 so operators can push the machine harder when it is safe and back off before insulation life is quietly spent.</p>
  </div>

  <div class="essay-case">
    <h4>Case 2 \u2014 How much charge is really left?</h4>
    <p>The \u201cstate of charge\u201d on an electric car or laptop is not measured \u2014 it cannot be. There is no fuel gauge inside a lithium-ion cell. The battery management system only sees voltage, current, and temperature, and must <em>estimate</em> the charge from them. The relationship is nonlinear and drifts as the battery ages, so a raw reading jumps around with every change in load. Kalman filters have become the industry workhorse here: predict the charge from current drawn, correct using the measured voltage, and average out the noise. Deep Kalman variants learn the cell\u2019s aging chemistry, giving a steadier, more honest percentage \u2014 the difference between a car that strands you and one you can trust.</p>
  </div>

  <div class="essay-case">
    <h4>Case 3 \u2014 A patient between visits</h4>
    <p>A person\u2019s underlying health is a hidden state that moves continuously, yet we only glimpse it through scattered, irregular measurements \u2014 a blood test here, a blood-pressure reading there, a symptom noted weeks apart. Krishnan, Shalit and Sontag introduced the Deep Kalman Filter precisely for this setting: to estimate a latent patient state from sparse electronic health records and even reason about how a medication would change its trajectory. The filter fills the gaps between observations with a learned model of how the disease progresses, then snaps back to reality each time a real measurement arrives \u2014 the same predict-and-correct heartbeat, applied to a human being.</p>
  </div>

  <p class="prose">Three very different worlds \u2014 a power plant, a battery pack, a hospital ward \u2014 share one structure. Something essential is hidden; the sensors are noisy and indirect; and the way forward is not to trust the model alone, nor the measurement alone, but to weigh them against each other, moment by moment. That weighing <em>is</em> the pattern.</p>

  <div class="va">
    <canvas id="kalmanCanvas" role="img" aria-label="The Deep Kalman Filter — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Trust in sensor</span>
      <input type="range" aria-label="Trust in sensor" id="kalmanTrustSlider" min="3" max="95" value="30" oninput="document.getElementById('kalmanTrustVal').textContent=this.value+'%';DRAWS['essay-kalman']()">
      <span class="viz-ctrl-val" id="kalmanTrustVal">30%</span>
    </div>
    <div class="essay-label">Hidden truth \u00b7 noisy sensor \u00b7 filter estimate &mdash; drag to trust the sensor more or less</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>When the thing you care about is hidden, do not chase the raw sensor and do not trust the model blindly \u2014 blend the two, weighting each by how much you trust it. A deep filter just learns that model from data instead of deriving it by hand.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Kalman, R. E. (1960). A New Approach to Linear Filtering and Prediction Problems. <em>Journal of Basic Engineering, 82</em>(1), 35\u201345. <a href="https://doi.org/10.1115/1.3662552" target="_blank" rel="noopener">doi:10.1115/1.3662552</a></div>
    <div class="essay-ref">[2] Krishnan, R. G., Shalit, U. &amp; Sontag, D. (2015). Deep Kalman Filters. <em>arXiv preprint.</em> <a href="https://arxiv.org/abs/1511.05121" target="_blank" rel="noopener">arXiv:1511.05121</a></div>
    <div class="essay-ref">[3] Krishnan, R. G., Shalit, U. &amp; Sontag, D. (2017). Structured Inference Networks for Nonlinear State Space Models. <em>Proceedings of the AAAI Conference on Artificial Intelligence, 31</em>(1). <a href="https://doi.org/10.1609/aaai.v31i1.10779" target="_blank" rel="noopener">doi:10.1609/aaai.v31i1.10779</a></div>
    <div class="essay-ref">[4] IEC 60076-7 (2018). <em>Power transformers \u2014 Part 7: Loading guide for mineral-oil-immersed power transformers.</em> International Electrotechnical Commission.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-kalman')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> This essay is the applied face of <a href="../timeseries/index.html#state-space">state-space models</a> in The Toolkit, where the Kalman filter lives, and the \u201cdeep\u201d half borrows the learned dynamics of <a href="../timeseries/index.html#lstm-for-ts">recurrent networks</a>. How much of the past any model should keep is the question of <a href="index.html#essay-memory">How Long Is Memory?</a></div>
  <div class="topic-nav" id="nav-essay-kalman"></div>
</div>`;
}

/* E13 — The Coiled Spring */
function buildEssaySpring() {
  return `<div class="topic pattern-essay" id="essay-spring">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E13 — Pattern Essays</div><h2>The Coiled <em>Spring</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// Quiet gathers before loud — a narrowing range warns about size, not direction</p>
  <p class="prose">In 1963 Benoît Mandelbrot noticed something about cotton prices that every trader already felt: large changes tend to be followed by large changes, of either sign, and small changes by small ones. Calm comes in stretches, and so do storms. Volatility has a memory even when direction does not.</p>
  <p class="prose">That memory gives markets a rhythm. A range narrows day by day as buyers and sellers drift towards agreement, positions pile up on both sides of a level, and the news everyone is waiting for has not yet arrived. Then something resolves, and the stored-up disagreement is released at once. The quiet was not the absence of risk. It was risk being wound up.</p>

  <div class="essay-case">
    <h4>On the chart — the shapes of compression</h4>
    <p>Most of the classic continuation patterns are drawings of a narrowing range. The <a href="../markets/charts/index.html#symmetric-triangle">symmetric triangle</a> squeezes from both sides; the <a href="../markets/charts/index.html#ascending-triangle">ascending</a> and <a href="../markets/charts/index.html#descending-triangle">descending</a> triangles hold one side flat while the other closes in. <a href="../markets/charts/index.html#bull-flag">Bull flags</a>, <a href="../markets/charts/index.html#bear-flag">bear flags</a> and <a href="../markets/charts/index.html#pennant">pennants</a> are short pauses after a sharp move; <a href="../markets/charts/index.html#rising-wedge">rising</a> and <a href="../markets/charts/index.html#falling-wedge">falling wedges</a> narrow while they drift; the <a href="../markets/charts/index.html#rectangle">rectangle</a> and the <a href="../markets/charts/index.html#channels">channel</a> keep the range steady. The <a href="../markets/charts/index.html#broadening-formation">broadening formation</a> is the same idea run backwards: a range that keeps widening is uncertainty growing, not settling.</p>
  </div>

  <div class="essay-case">
    <h4>Around the price — measuring the squeeze</h4>
    <p>Envelopes turn the eye’s judgement into a number. <a href="../markets/indicators/index.html#keltner-channels">Keltner channels</a> scale with the average true range, <a href="../markets/indicators/index.html#donchian-channels">Donchian channels</a> with the highest high and lowest low, <a href="../markets/indicators/index.html#vwap-bands">VWAP bands</a> with dispersion around the volume-weighted price, and <a href="../markets/indicators/index.html#bollinger-bands">Bollinger Bands</a> with the standard deviation. When the bands pinch together, traders call it a squeeze: the market is unusually quiet compared with its own recent past.</p>
  </div>

  <div class="essay-case">
    <h4>In the model — calm that does not last</h4>
    <p><a href="../markets/risk/index.html#volatility-modeling">Volatility models</a> such as <a href="../timeseries/index.html#garch">GARCH</a> write the rhythm down. Today’s variance is built from yesterday’s variance and yesterday’s shock, so calm predicts calm — but only for a while, because the model also pulls volatility back towards its long-run level. An unusually quiet market is, in this view, a market that is likely to get louder.</p>
  </div>

  <p class="prose">The same shape turns up far from markets. In 1910 the geologist Harry Fielding Reid explained earthquakes as elastic rebound: the ground on either side of a fault creeps past slowly for years while the fault stays locked, strain builds silently, and then it is released in one slip. Stillness on the surface was storage underneath. And like Mandelbrot’s prices, the pattern looks the same whether you watch minutes or months — a cousin of <a href="index.html#essay-fractal">the fractal</a> and of <a href="index.html#essay-threshold">the threshold</a>.</p>
  <p class="prose">What compression does not tell you is which way the spring will jump. A tight triangle says a large move is more likely than usual; it says much less about its sign, and plenty of squeezes simply fizzle out into another quiet range.</p>

  <div class="va">
    <canvas id="springCanvas" role="img" aria-label="The Coiled Spring — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Compression</span>
      <input type="range" aria-label="Compression" id="springSlider" min="0" max="90" value="60" oninput="document.getElementById('springVal').textContent=this.value+'%';DRAWS['essay-spring']()">
      <span class="viz-ctrl-val" id="springVal">60%</span>
    </div>
    <div class="essay-label">Price and its 10-day range &mdash; drag to squeeze the quiet phase harder and watch the release grow</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>A narrowing range is a warning about size, not a forecast of direction. Size a position for the release, not for the calm that came before it.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Mandelbrot, B. (1963). The Variation of Certain Speculative Prices. <em>Journal of Business, 36</em>(4), 394–419. <a href="https://doi.org/10.1086/294632" target="_blank" rel="noopener">doi:10.1086/294632</a></div>
    <div class="essay-ref">[2] Engle, R. F. (1982). Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of United Kingdom Inflation. <em>Econometrica, 50</em>(4), 987–1007. <a href="https://doi.org/10.2307/1912773" target="_blank" rel="noopener">doi:10.2307/1912773</a></div>
    <div class="essay-ref">[3] Bollerslev, T. (1986). Generalized Autoregressive Conditional Heteroskedasticity. <em>Journal of Econometrics, 31</em>(3), 307–327. <a href="https://doi.org/10.1016/0304-4076(86)90063-1" target="_blank" rel="noopener">doi:10.1016/0304-4076(86)90063-1</a></div>
    <div class="essay-ref">[4] Reid, H. F. (1910). <em>The Mechanics of the Earthquake.</em> The California Earthquake of April 18, 1906: Report of the State Earthquake Investigation Commission, Vol. 2. Carnegie Institution of Washington.</div>
    <div class="essay-ref">[5] Bulkowski, T. N. (2005). <em>Encyclopedia of Chart Patterns</em> (2nd ed.). Wiley.</div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-spring')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The squeeze is measured with the <a href="../markets/indicators/index.html#atr">average true range</a> and sized for with <a href="../markets/risk/index.html#volatility-sizing">volatility-based position sizing</a> — the calm tells you how small the next stop would be, and how wrong that could prove.</div>
  <div class="topic-nav" id="nav-essay-spring"></div>
</div>`;
}

/* E14 — The Garden of Forking Paths */
function buildEssayForking() {
  return `<div class="topic pattern-essay" id="essay-forking">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E14 — Pattern Essays</div><h2>The Garden of <em>Forking Paths</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// Try enough paths and one of them will lead somewhere — by luck alone</p>
  <p class="prose">In a 1941 story by Jorge Luis Borges, a labyrinth is not a building but a novel in which every choice is taken: at each fork the story splits, and all the branches go on. Seventy years later the statisticians Andrew Gelman and Eric Loken borrowed the title for a quieter problem. A researcher rarely runs twenty tests and reports the best. More often they run one — but which one depends on the data: which outliers to drop, which window to use, which subgroup looked interesting. Each choice is a fork, and the path actually taken was chosen by the noise.</p>
  <p class="prose">The arithmetic is unforgiving. A rule with no edge at all passes a test at the 5% level one time in twenty. Try twenty such rules and the chance that at least one passes is about 64%. Try two hundred and it is a near certainty. The best result of a search is not a typical result; it is the luckiest one, and luck does not repeat.</p>

  <div class="essay-case">
    <h4>The chart reader</h4>
    <p>A <a href="../markets/charts/index.html#head-and-shoulders">head and shoulders</a>, an <a href="../markets/charts/index.html#inverse-head-and-shoulders">inverse one</a>, a <a href="../markets/charts/index.html#double-top">double top</a> or <a href="../markets/charts/index.html#double-bottom">bottom</a>, a <a href="../markets/charts/index.html#cup-and-handle">cup and handle</a>, a <a href="../markets/charts/index.html#rounding-bottom">rounding bottom</a>: each comes with choices — how equal is equal, how deep is deep, when the neckline counts as broken. Candlesticks multiply them. The <a href="../markets/charts/index.html#doji">doji</a>, the <a href="../markets/charts/index.html#hammer">hammer</a>, the <a href="../markets/charts/index.html#engulfing">engulfing</a> pair, the <a href="../markets/charts/index.html#morning-star">morning</a> and <a href="../markets/charts/index.html#evening-star">evening star</a> are a few of dozens of named shapes, and a chart of any length contains some of them. When the patterns were written as code and tested on Dow Jones stocks, they added no value (Marshall, Young &amp; Rose 2006). Writing the rule down before looking is what closes the forks.</p>
  </div>

  <div class="essay-case">
    <h4>The oscillator tinkerer</h4>
    <p>The <a href="../markets/indicators/index.html#stochastic">stochastic oscillator</a>, <a href="../markets/indicators/index.html#williams-r">Williams %R</a>, the <a href="../markets/indicators/index.html#cci">CCI</a> and the <a href="../markets/indicators/index.html#mfi">money flow index</a> all ask much the same question — where is the price within its recent range? — each with a lookback and two thresholds to choose. Change 14 days to 9 and 80/20 to 70/30 until the backtest shines, and you have walked a dozen paths. Sullivan, Timmermann and White tested thousands of simple trading rules together and showed how much of the best rule’s performance disappears once the size of the search is taken into account.</p>
  </div>

  <div class="essay-case">
    <h4>The model tuner</h4>
    <p>Machine learning automates the garden. <a href="../stats/index.html#optuna">Optuna</a> can try hundreds of hyperparameter settings in an afternoon, and the best validation score among them is flattered for the same reason the best trading rule is. The <a href="../stats/index.html#sklearn-eval">scikit-learn evaluation suite</a> answers with nested cross-validation and a test set that is touched once; <a href="../stats/index.html#scipy-statsmodels">statsmodels</a> answers with corrections for multiple testing, such as Benjamini and Hochberg’s. Public leaderboards are the same garden walked by a whole field: every team tunes against the same test set, which is why <a href="../llm/index.html#evaluation">LLM evaluation</a> keeps needing fresh benchmarks.</p>
  </div>

  <p class="prose">None of this means patterns are illusions. It means a result has to be judged together with the search that found it. A model is a map drawn from one territory, and a map redrawn until it fits every bump of the old ground is the one most likely to mislead on the new — the warning of <a href="index.html#essay-map">The Map and the Territory</a> and of <a href="index.html#essay-signal">Signal in the Noise</a>.</p>

  <div class="va">
    <canvas id="forkingCanvas" role="img" aria-label="The Garden of Forking Paths — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Rules tried</span>
      <input type="range" aria-label="Rules tried" id="forkingSlider" min="1" max="200" value="20" oninput="document.getElementById('forkingVal').textContent=this.value;DRAWS['essay-forking']()">
      <span class="viz-ctrl-val" id="forkingVal">20</span>
    </div>
    <div class="essay-label">Every rule is a coin flip with no edge &mdash; drag to try more of them and watch the best one look brilliant</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Count the paths you walked, not just the one you report. The best of many tries is always flattered; judge it on data it has never seen.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Borges, J. L. (1941). <em>El jardín de senderos que se bifurcan</em> (The Garden of Forking Paths). Buenos Aires: Sur.</div>
    <div class="essay-ref">[2] Gelman, A. &amp; Loken, E. (2014). The Statistical Crisis in Science. <em>American Scientist, 102</em>(6), 460–465. <a href="https://doi.org/10.1511/2014.111.460" target="_blank" rel="noopener">doi:10.1511/2014.111.460</a></div>
    <div class="essay-ref">[3] Sullivan, R., Timmermann, A. &amp; White, H. (1999). Data-Snooping, Technical Trading Rule Performance, and the Bootstrap. <em>Journal of Finance, 54</em>(5), 1647–1691. <a href="https://doi.org/10.1111/0022-1082.00163" target="_blank" rel="noopener">doi:10.1111/0022-1082.00163</a></div>
    <div class="essay-ref">[4] Marshall, B. R., Young, M. R. &amp; Rose, L. C. (2006). Candlestick Technical Trading Strategies: Can They Create Value for Investors? <em>Journal of Banking &amp; Finance, 30</em>(8), 2303–2323. <a href="https://doi.org/10.1016/j.jbankfin.2005.08.001" target="_blank" rel="noopener">doi:10.1016/j.jbankfin.2005.08.001</a></div>
    <div class="essay-ref">[5] Benjamini, Y. &amp; Hochberg, Y. (1995). Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing. <em>Journal of the Royal Statistical Society: Series B, 57</em>(1), 289–300. <a href="https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" target="_blank" rel="noopener">doi:10.1111/j.2517-6161.1995.tb02031.x</a></div>
    <div class="essay-ref">[6] Bailey, D. H., Borwein, J. M., López de Prado, M. &amp; Zhu, Q. J. (2014). Pseudo-Mathematics and Financial Charlatanism: The Effects of Backtest Overfitting on Out-of-Sample Performance. <em>Notices of the AMS, 61</em>(5), 458–471. <a href="https://doi.org/10.1090/noti1105" target="_blank" rel="noopener">doi:10.1090/noti1105</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-forking')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The defences are in The Toolkit: <a href="../stats/index.html#hypothesis-testing">hypothesis testing</a> says what a p-value means for a single test, and <a href="../stats/index.html#walk-forward">walk-forward validation</a> keeps the future out of the search.</div>
  <div class="topic-nav" id="nav-essay-forking"></div>
</div>`;
}

/* E15 — How Long Is Memory? */
function buildEssayMemory() {
  return `<div class="topic pattern-essay" id="essay-memory">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E15 — Pattern Essays</div><h2>How Long Is <em>Memory?</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// Every model decides how much the past matters — usually with a number nobody looks at</p>
  <p class="prose">In 1885 Hermann Ebbinghaus learned lists of nonsense syllables and tested himself at intervals afterwards. What he retained fell quickly at first and then more slowly: a forgetting curve. Some sixty-five years later the hydrologist Harold Edwin Hurst, planning dams on the Nile, found the opposite surprise. Wet years clustered with wet years and dry with dry over spans far longer than anyone expected; the river remembered.</p>
  <p class="prose">Between those two lies a question every model of a sequence has to answer: how far back does the past still matter, and how quickly should it fade? The answer is rarely argued for. It hides in a window length, a decay rate, a lag order or a context size — and it shapes everything the model can see.</p>

  <div class="essay-case">
    <h4>Averages — memory as a window</h4>
    <p>A moving average is a memory with a fixed shape. The simple average remembers N days equally and then forgets at once; the <a href="../markets/indicators/index.html#wma">weighted moving average</a> lets the weights fall in a straight line; the <a href="../markets/indicators/index.html#ema">exponential average</a> lets them fade without ever quite reaching zero; the <a href="../markets/indicators/index.html#dema">double exponential average</a> leans even harder on the present to cut the lag. Choosing between them is choosing how fast to forget. People make the same choice without noticing — <a href="../markets/psychology/index.html#recency-bias">recency bias</a> is a memory that is too short, and <a href="../markets/psychology/index.html#mean-reversion-psychology">waiting for mean reversion</a> assumes one long enough to know where the mean is.</p>
  </div>

  <div class="essay-case">
    <h4>Statistics — memory as a correlation</h4>
    <p><a href="../timeseries/index.html#autocorrelation">Autocorrelation</a> measures how much a series remembers itself at each lag. The classical models are shapes of that memory: <a href="../timeseries/index.html#ma-models">moving-average models</a> remember each shock for exactly q steps and then drop it; autoregressive models remember forever but ever more faintly; <a href="../timeseries/index.html#sarima">SARIMA</a> adds a second memory one season back; <a href="../timeseries/index.html#var-models">VAR models</a> remember the pasts of other series too. <a href="../timeseries/index.html#feature-engineering">Feature engineering</a> for forecasting is largely the craft of choosing which lags to hand a model.</p>
  </div>

  <div class="essay-case">
    <h4>Networks — memory as a state, or as a search</h4>
    <p>A <a href="../timeseries/index.html#rnn-for-ts">recurrent network</a> carries a summary of the past forward step by step, and in its plain form the summary fades fast — gradients over long spans vanish. The <a href="../ml-math/index.html#lstm">LSTM</a> added gates that learn what to keep and what to erase. A <a href="../timeseries/index.html#temporal-cnn">temporal CNN</a> sees a fixed horizon set by how its dilations stack; <a href="../timeseries/index.html#nbeats">N-BEATS</a> simply takes a fixed window of history. Transformers changed the question: with <a href="../llm/index.html#multi-head-attention">attention</a>, every position in the context can look at every other, so memory becomes a search rather than a fading trace. The <a href="../llm/index.html#kv-cache">KV-cache</a> keeps that past so it need not be recomputed, <a href="../llm/index.html#kv-cache-opt">KV-cache optimisation</a> decides what to drop when it fills, and <a href="../llm/index.html#rag">retrieval</a> moves memory outside the model altogether.</p>
  </div>

  <div class="essay-case">
    <h4>People and products — memory as retention</h4>
    <p>A <a href="../stats/index.html#cohort-retention">retention curve</a> is Ebbinghaus’s curve for a product: how many of the people who joined in a given month are still around one, three, twelve months later. It drops steeply and then flattens, and where it flattens is how long the product is remembered. The <a href="index.html#essay-kalman">Kalman filter</a> takes yet another route, keeping no history at all — only a running estimate and its uncertainty, which together carry everything the past has to say.</p>
  </div>

  <div class="va">
    <canvas id="memoryCanvas" role="img" aria-label="How Long Is Memory? — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Half-life</span>
      <input type="range" aria-label="Half-life" id="memorySlider" min="1" max="40" value="6" oninput="document.getElementById('memoryVal').textContent=this.value+' steps';DRAWS['essay-memory']()">
      <span class="viz-ctrl-val" id="memoryVal">6 steps</span>
    </div>
    <div class="essay-label">A noisy series and an average with fading memory &mdash; the bars show how much each past step still counts</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Every model answers “how much does the past matter?” Make that answer on purpose, and match it to how fast the world you are modelling forgets.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Ebbinghaus, H. (1885). <em>Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie.</em> Leipzig: Duncker &amp; Humblot.</div>
    <div class="essay-ref">[2] Hurst, H. E. (1951). Long-Term Storage Capacity of Reservoirs. <em>Transactions of the American Society of Civil Engineers, 116</em>, 770–799.</div>
    <div class="essay-ref">[3] Box, G. E. P. &amp; Jenkins, G. M. (1970). <em>Time Series Analysis: Forecasting and Control.</em> San Francisco: Holden-Day.</div>
    <div class="essay-ref">[4] Bengio, Y., Simard, P. &amp; Frasconi, P. (1994). Learning Long-Term Dependencies with Gradient Descent Is Difficult. <em>IEEE Transactions on Neural Networks, 5</em>(2), 157–166. <a href="https://doi.org/10.1109/72.279181" target="_blank" rel="noopener">doi:10.1109/72.279181</a></div>
    <div class="essay-ref">[5] Hochreiter, S. &amp; Schmidhuber, J. (1997). Long Short-Term Memory. <em>Neural Computation, 9</em>(8), 1735–1780. <a href="https://doi.org/10.1162/neco.1997.9.8.1735" target="_blank" rel="noopener">doi:10.1162/neco.1997.9.8.1735</a></div>
    <div class="essay-ref">[6] Vaswani, A. et al. (2017). Attention Is All You Need. <em>Advances in Neural Information Processing Systems 30.</em> <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener">arXiv:1706.03762</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-memory')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Where memory comes from in a price series is the subject of <a href="../timeseries/index.html#stationarity">stationarity</a>; how a network keeps it is the subject of <a href="../ml-math/index.html#attention">attention</a> in ML Math.</div>
  <div class="topic-nav" id="nav-essay-memory"></div>
</div>`;
}

/* E16 — The Bottleneck */
function buildEssayBottleneck() {
  return `<div class="topic pattern-essay" id="essay-bottleneck">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E16 — Pattern Essays</div><h2>The <em>Bottleneck</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// A system goes no faster than its slowest step — and near full capacity, waiting explodes</p>
  <p class="prose">In <em>The Goal</em>, a 1984 novel about a failing factory, Eliyahu Goldratt has his plant manager learn the lesson on a scout hike. The column of boys can only move as fast as the slowest one; hurrying the others just stretches the line. In the factory it is a single machine, and every improvement made anywhere else only grows the pile of parts waiting in front of it.</p>
  <p class="prose">Two facts from queueing theory make this sharper. John Little showed in 1961 that, in any stable system, the number of things inside it equals the rate at which they arrive times how long each one stays — so queues and waiting times rise and fall together. And waiting does not grow evenly with load. In the simplest queue, a server busy 50% of the time keeps each job waiting about as long as it takes to serve it; at 90% busy the time in the system is ten times the service time, at 95% twenty. The last few percent of utilisation are paid for in waiting.</p>

  <div class="essay-case">
    <h4>Serving a model</h4>
    <p>The tension between <a href="../mlops/index.html#latency-throughput">latency and throughput</a> is the bottleneck in miniature. <a href="../llm/index.html#batching">Batching</a> raises throughput by making requests wait for company; <a href="../mlops/index.html#auto-scaling">auto-scaling</a> adds capacity at the constraint before the queue explodes; <a href="../mlops/index.html#caching-layers">caching</a> skips the slow step entirely for answers already known. Which <a href="../mlops/index.html#serving-patterns">serving pattern</a> fits — online, batch or streaming — depends on where the slow step sits and who is waiting for it, and <a href="../mlops/index.html#gpu-inference">GPU inference</a> is mostly the art of finding out whether the chip is waiting on arithmetic or on memory.</p>
  </div>

  <div class="essay-case">
    <h4>Generating text</h4>
    <p>For a large language model producing one token at a time, the bottleneck is usually not computation but moving the weights from memory for every token. That is why the fixes all target bytes and steps. <a href="../llm/index.html#quantization">Quantization</a> and <a href="../mlops/index.html#model-compression">model compression</a> shrink what has to be read; a <a href="../llm/index.html#mixture-of-experts">mixture of experts</a> reads only a few of the experts for each token; <a href="../llm/index.html#speculative-decoding">speculative decoding</a> lets a small model draft several tokens that the large one checks in a single pass, so the slow step runs fewer times.</p>
  </div>

  <div class="essay-case">
    <h4>Pipelines and funnels</h4>
    <p>An <a href="../mlops/index.html#ml-pipelines">ML pipeline</a> finishes when its slowest chain of dependent steps finishes; <a href="../mlops/index.html#orchestration">orchestration</a> can run everything else in parallel, but not shorten that chain. A <a href="../mlops/index.html#feature-stores">feature store</a> exists largely so the same expensive features are not recomputed by every model that needs them. Outside engineering the shape is identical: in a <a href="../stats/index.html#funnel-analysis">conversion funnel</a> the narrowest step caps everything after it, and doubling the traffic at the top only doubles the crowd that drops out there.</p>
  </div>

  <p class="prose">Bottlenecks also move. Widen the slowest step and the second slowest becomes the constraint, often somewhere nobody was watching. That is the quiet logic behind <a href="index.html#essay-threshold">thresholds</a> and <a href="index.html#essay-feedback">feedback loops</a> in systems that seem to run smoothly right up until they do not.</p>

  <div class="va">
    <canvas id="bottleneckCanvas" role="img" aria-label="The Bottleneck — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Utilisation</span>
      <input type="range" aria-label="Utilisation" id="bottleneckSlider" min="10" max="97" value="70" oninput="document.getElementById('bottleneckVal').textContent=this.value+'%';DRAWS['essay-bottleneck']()">
      <span class="viz-ctrl-val" id="bottleneckVal">70%</span>
    </div>
    <div class="essay-label">Time in a simple queue, in multiples of the service time &mdash; drag towards full capacity and watch the curve turn upward</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Find the slowest step before optimising anything. Everywhere else, extra speed only lengthens the queue in front of it — and close to full capacity, the waiting grows far faster than the load.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Goldratt, E. M. &amp; Cox, J. (1984). <em>The Goal: A Process of Ongoing Improvement.</em> Great Barrington, MA: North River Press.</div>
    <div class="essay-ref">[2] Little, J. D. C. (1961). A Proof for the Queuing Formula: L = λW. <em>Operations Research, 9</em>(3), 383–387. <a href="https://doi.org/10.1287/opre.9.3.383" target="_blank" rel="noopener">doi:10.1287/opre.9.3.383</a></div>
    <div class="essay-ref">[3] Kingman, J. F. C. (1961). The Single Server Queue in Heavy Traffic. <em>Mathematical Proceedings of the Cambridge Philosophical Society, 57</em>(4), 902–904. <a href="https://doi.org/10.1017/S0305004100036094" target="_blank" rel="noopener">doi:10.1017/S0305004100036094</a></div>
    <div class="essay-ref">[4] Williams, S., Waterman, A. &amp; Patterson, D. (2009). Roofline: An Insightful Visual Performance Model for Multicore Architectures. <em>Communications of the ACM, 52</em>(4), 65–76. <a href="https://doi.org/10.1145/1498765.1498785" target="_blank" rel="noopener">doi:10.1145/1498765.1498785</a></div>
    <div class="essay-ref">[5] Leviathan, Y., Kalman, M. &amp; Matias, Y. (2023). Fast Inference from Transformers via Speculative Decoding. <em>Proceedings of the 40th International Conference on Machine Learning.</em> <a href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noopener">arXiv:2211.17192</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-bottleneck')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Queues are what <a href="../mlops/index.html#alerting-slos">latency SLOs</a> watch for, and the same arithmetic of narrow steps decides the drop-off in a <a href="../stats/index.html#cohort-retention">retention curve</a>.</div>
  <div class="topic-nav" id="nav-essay-bottleneck"></div>
</div>`;
}

/* E17 — Small, Reversible Bets */
function buildEssayReversible() {
  return `<div class="topic pattern-essay" id="essay-reversible">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">E17 — Pattern Essays</div><h2>Small, Reversible <em>Bets</em></h2></div>
    <div class="topic-badge-group"><span class="topic-badge">Essay</span><span class="reading-time">4 min read</span></div>
  </div>
  <p class="sub">// Make mistakes cheap to undo, and size the ones you cannot undo so that being wrong is survivable</p>
  <p class="prose">In his 2015 letter to shareholders, Jeff Bezos split decisions into two kinds. Some are one-way doors: once through, you cannot come back, and they deserve slow, careful thought. Most are two-way doors: if the room on the other side is wrong, you walk back out. The common mistake, he argued, is treating the second kind like the first — deliberating for weeks over choices that could have been tried, measured and reversed in days.</p>
  <p class="prose">The same idea has a harder, mathematical edge. When gains and losses compound, the order of events matters and a large enough loss ends the game. A bet can have a positive expected value and still ruin almost everyone who takes it too often at too large a size. The physicist Ole Peters calls this the ergodicity problem: the average over many people is not what any one person experiences over time. Survival is not one goal among others; it is the condition for having any others.</p>

  <div class="essay-case">
    <h4>Shipping a model — build the way back first</h4>
    <p>Mature ML teams spend a surprising share of their effort on undo. <a href="../mlops/index.html#shadow-scoring">Shadow mode</a> lets a new model score live traffic without acting on it, and a champion/challenger setup gives it a small slice before the whole. <a href="../mlops/index.html#ci-cd-ml">CI/CD for ML</a> stops a bad model before it ships; a <a href="../mlops/index.html#model-registry">model registry</a> makes going back to yesterday’s version a one-line change; <a href="../mlops/index.html#model-packaging">packaging in containers</a> makes sure the old version still runs; <a href="../mlops/index.html#reproducibility">reproducibility</a> means it can be rebuilt at all. When something does break, good <a href="../mlops/index.html#incident-response">incident response</a> rolls back first and investigates second.</p>
  </div>

  <div class="essay-case">
    <h4>Sizing a position — stay in the game</h4>
    <p>The <a href="../markets/risk/index.html#kelly-criterion">Kelly criterion</a> gives the bet size that grows capital fastest, and shows that betting much more than that turns a winning edge into a losing strategy. <a href="../markets/risk/index.html#max-position">Position limits</a> cap what any one mistake can cost. <a href="../markets/risk/index.html#pyramiding">Pyramiding</a> starts small and adds only once the market has said yes. A protective put from <a href="../markets/risk/index.html#options-hedging">options hedging</a> buys a floor, paying a premium so that one outcome is ruled out in advance. <a href="../markets/risk/index.html#portfolio-insurance">Portfolio insurance</a> tried to make the floor dynamic — and in October 1987 showed that an exit everyone plans to use at once is not reversible at all.</p>
  </div>

  <div class="essay-case">
    <h4>Training a language model — small runs before the big one</h4>
    <p>Large models are expensive one-way doors, so the field has learned to climb a ladder of cost. <a href="../llm/index.html#prompt-engineering">Prompt engineering</a> is the cheapest change and the easiest to undo; <a href="../llm/index.html#fine-tuning">fine-tuning</a> costs more and changes the weights; <a href="../llm/index.html#pre-training">pre-training</a> is the one-way door. Before walking through it, labs fit <a href="../llm/index.html#scaling-laws">scaling laws</a> to a series of small, cheap runs and extrapolate — many small bets used to size the one big one.</p>
  </div>

  <div class="essay-case">
    <h4>The mind — why reversing is hard</h4>
    <p>The obstacles are mostly psychological. The <a href="../markets/psychology/index.html#sunk-cost-fallacy">sunk cost fallacy</a> keeps people walking through a door they should back out of; the <a href="../markets/psychology/index.html#disposition-effect">disposition effect</a> reverses the wrong positions, selling winners and keeping losers; <a href="../markets/psychology/index.html#mental-accounting">mental accounting</a> treats recent gains as house money to bet bigger with; and <a href="../markets/psychology/index.html#fomo">FOMO</a> turns many small entries into one large, late one. Each turns a two-way door into a one-way door from the inside.</p>
  </div>

  <p class="prose">Cheap reversals are also what makes it safe to try many things — and trying many things brings back the warning of <a href="index.html#essay-forking">The Garden of Forking Paths</a>: the more you try, the more carefully you have to judge what seems to work. Small bets are for learning fast, not for believing the first lucky one.</p>

  <div class="va">
    <canvas id="reversibleCanvas" role="img" aria-label="Small, Reversible Bets — visualization" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Bet size</span>
      <input type="range" aria-label="Bet size" id="reversibleSlider" min="2" max="50" value="10" oninput="document.getElementById('reversibleVal').textContent=this.value+'%';DRAWS['essay-reversible']()">
      <span class="viz-ctrl-val" id="reversibleVal">10%</span>
    </div>
    <div class="essay-label">40 players, the same favourable coin (55% to win, even money), 300 rounds &mdash; drag the bet size and watch survival</div>
  </div>
  <div class="essay-takeaway"><strong>What to remember</strong>Prefer decisions you can undo, and size the ones you cannot so that being wrong is survivable. Speed comes from cheap reversals, not from being right the first time.</div>
  <div class="essay-refs">
    <div class="essay-refs-title">References</div>
    <div class="essay-ref">[1] Bezos, J. P. (2016). <em>2015 Letter to Shareholders.</em> Amazon.com, Inc. — Type 1 and Type 2 decisions.</div>
    <div class="essay-ref">[2] Kelly, J. L. (1956). A New Interpretation of Information Rate. <em>Bell System Technical Journal, 35</em>(4), 917–926. <a href="https://doi.org/10.1002/j.1538-7305.1956.tb03809.x" target="_blank" rel="noopener">doi:10.1002/j.1538-7305.1956.tb03809.x</a></div>
    <div class="essay-ref">[3] Peters, O. (2019). The Ergodicity Problem in Economics. <em>Nature Physics, 15</em>, 1216–1221. <a href="https://doi.org/10.1038/s41567-019-0732-0" target="_blank" rel="noopener">doi:10.1038/s41567-019-0732-0</a></div>
    <div class="essay-ref">[4] Sculley, D. et al. (2015). Hidden Technical Debt in Machine Learning Systems. <em>Advances in Neural Information Processing Systems 28.</em></div>
    <div class="essay-ref">[5] Kaplan, J. et al. (2020). Scaling Laws for Neural Language Models. <a href="https://arxiv.org/abs/2001.08361" target="_blank" rel="noopener">arXiv:2001.08361</a></div>
    <div class="essay-ref">[6] Arkes, H. R. &amp; Blumer, C. (1985). The Psychology of Sunk Cost. <em>Organizational Behavior and Human Decision Processes, 35</em>(1), 124–140. <a href="https://doi.org/10.1016/0749-5978(85)90049-4" target="_blank" rel="noopener">doi:10.1016/0749-5978(85)90049-4</a></div>
  </div>
  <p class="depth-note" style="margin:10px 0 0">Last reviewed ${reviewedOn('essay-reversible')} · <a href="../about/#checked">How this site checks its content</a></p>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The arithmetic of ruin is in <a href="../markets/risk/index.html#drawdown-analysis">drawdown analysis</a> — a 50% loss needs a 100% gain to recover — and the cost of waiting too long to reverse is in <a href="../markets/risk/index.html#stop-losses">stop-loss strategies</a>.</div>
  <div class="topic-nav" id="nav-essay-reversible"></div>
</div>`;
}
