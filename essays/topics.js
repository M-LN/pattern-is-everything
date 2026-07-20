/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Topics Data & Content Builder
   5 short reflections on patterns in the world
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-essays', title:'Pattern Essays', topics:['home','essay-bell','essay-mean','essay-tail','essay-signal','essay-map','essay-feedback','essay-walk','essay-threshold','essay-survivor','essay-fractal','essay-simpson','essay-kalman'] },
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
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'essay-bell', num:'E1', title:'The Bell in Everything', category:'Pattern Essays', keywords:['normal distribution','gaussian','central limit theorem','bell curve','aggregation','independence','emergence'], content:'Normal distributions emerge wherever many small, independent forces combine.' },
  { id:'essay-mean', num:'E2', title:'Regression to the Mean', category:'Pattern Essays', keywords:['regression','mean reversion','extremes','Galton','inheritance','arithmetic','luck'], content:'Extreme outcomes tend to be followed by less extreme ones \u2014 not a force, just arithmetic.' },
  { id:'essay-tail', num:'E3', title:'The Long Tail', category:'Pattern Essays', keywords:['power law','Pareto','Zipf','inequality','scale-free','fat tails','rare events','wealth'], content:'Most things are small. A few are enormous. The pattern repeats across domains that seem unrelated.' },
  { id:'essay-signal', num:'E4', title:'Signal in the Noise', category:'Pattern Essays', keywords:['noise','overfitting','randomness','pattern recognition','apophenia','data','uncertainty'], content:'Every dataset is a mix of pattern and randomness. The hard part is not inventing signal where there is none.' },
  { id:'essay-map', num:'E5', title:'The Map and the Territory', category:'Pattern Essays', keywords:['model','abstraction','simplification','representation','Borges','assumptions','residuals'], content:'A model is a deliberate simplification. The danger is forgetting what was left out.' },
  { id:'essay-feedback', num:'E6', title:'The Feedback Loop', category:'Pattern Essays', keywords:['feedback','compounding','exponential','S-curve','logistic','growth','tipping point','self-reinforcing'], content:'When a system\'s output feeds back into its input, small nudges can cascade into enormous change — or freeze everything in place.' },
  { id:'essay-walk', num:'E7', title:'The Random Walk', category:'Pattern Essays', keywords:['random walk','Brownian motion','stock prices','drift','volatility','unpredictability','efficient market','path dependence'], content:'Each step is random, yet the path that emerges is not without structure. Distance grows — just not in the direction you expect.' },
  { id:'essay-threshold', num:'E8', title:'The Threshold', category:'Pattern Essays', keywords:['threshold','tipping point','phase transition','sigmoid','bifurcation','critical point','nonlinear','catastrophe'], content:'Many systems stay quiet for a long time, then change all at once. The threshold is the hidden line that separates gradual from sudden.' },
  { id:'essay-survivor', num:'E9', title:'Survivorship Bias', category:'Pattern Essays', keywords:['survivorship bias','selection bias','missing data','Wald','bombers','survivors','hidden failures','censored'], content:'We study what survived and forget what did not. The missing data is often where the real lesson hides.' },
  { id:'essay-fractal', num:'E10', title:'The Fractal', category:'Pattern Essays', keywords:['fractal','self-similarity','scale invariance','Mandelbrot','recursion','coastline','dimension','branching'], content:'Zoom in and the pattern repeats. Self-similarity across scales is one of nature\u2019s most common signatures.' },
  { id:'essay-simpson', num:'E11', title:'Simpson\u2019s Paradox', category:'Pattern Essays', keywords:['Simpson paradox','confounding','aggregation','lurking variable','reversal','subgroups','causation','statistics'], content:'A trend can point one way in every group and the opposite way when the groups are combined. Aggregation can lie.' },
  { id:'essay-kalman', num:'E12', title:'The Deep Kalman Filter', category:'Pattern Essays', keywords:['Kalman filter','deep Kalman filter','state estimation','hidden state','sensor fusion','hotspot temperature','generator','transformer winding','state of charge','battery','EHR','health monitoring','filtering','prediction','measurement','process noise','Kalman gain','neural network','latent state'], content:'You cannot measure everything directly. The Kalman filter estimates a hidden state by blending what it predicts with what it noisily measures \u2014 and the deep version learns the model from data.' },
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
    + buildEssayKalman();
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
      <div class="home-stat"><div class="home-stat-num">12</div><div class="home-stat-label">Essays</div></div>
      <div class="home-stat"><div class="home-stat-num">12</div><div class="home-stat-label">Visualizations</div></div>
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
  <p class="prose">The bell appears in measurement error, in exam scores, in the daily returns of large stock indices. It is not imposed from above; it <em>emerges</em> from below. That emergence is the pattern: complexity aggregating into simplicity. A thousand causes, one shape.</p>
  <p class="prose">The next time you see a histogram clustering around a centre and fading at the edges, you are looking at the arithmetic of accumulation. Nothing more \u2014 and nothing less.</p>
  <div class="va">
    <canvas id="bellCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Dice rolled</span>
      <input type="range" id="bellDiceSlider" min="1" max="12" value="1" oninput="document.getElementById('bellDiceVal').textContent=this.value;DRAWS['essay-bell']()">
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
    <canvas id="meanCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Correlation</span>
      <input type="range" id="meanCorrSlider" min="0" max="100" value="55" oninput="document.getElementById('meanCorrVal').textContent=Math.round(this.value)+'%';DRAWS['essay-mean']()">
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
  <p class="prose">Rank cities by population and plot the result. A handful of megacities tower on the left; thousands of towns form a long, whispering tail stretching to the right. Now do the same with word frequencies, website traffic, earthquake magnitudes, or personal wealth. The shape is the same: steep drop, then a tail that refuses to die.</p>
  <p class="prose">These are power-law distributions, and they emerge wherever <em>success breeds success</em> \u2014 a city that grows attracts more people, which makes it grow further. A word used often becomes even more familiar, so it gets used again. The rich get richer, not always through merit, but through mechanics.</p>
  <p class="prose">The tail matters more than it looks. In a bell curve, extremes are vanishingly rare. In a power law, the single largest event can dwarf the rest combined. This is why one earthquake, one pandemic, or one black swan trade can reshape everything.</p>
  <div class="va">
    <canvas id="tailCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Inequality</span>
      <input type="range" id="tailAlphaSlider" min="10" max="50" value="18" oninput="document.getElementById('tailAlphaVal').textContent=(this.value/10).toFixed(1);DRAWS['essay-tail']()">
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
    <canvas id="signalCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Noise level</span>
      <input type="range" id="signalNoiseSlider" min="0" max="100" value="50" oninput="document.getElementById('signalNoiseVal').textContent=this.value+'%';DRAWS['essay-signal']()">
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> <a href="../stats/index.html#cross-validation">Cross-validation</a> is the practical guard against this, and <a href="../stats/index.html#learning-curves">learning curves</a> let you see overfitting happen in real time.</div>
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
    <canvas id="mapCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Model complexity</span>
      <input type="range" id="mapComplexSlider" min="1" max="5" value="1" oninput="document.getElementById('mapComplexVal').textContent=['Linear','Quadratic','Cubic','Degree 4','Overfit'][this.value-1];DRAWS['essay-map']()">
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
  <p class="prose">But exponential growth always meets a wall — resources run out, competition arrives, the body builds immunity. The result is an S-curve: slow start, explosive middle, plateau at the top. Population growth, technology adoption, viral spread — all follow this shape. The feedback loop is the engine; the ceiling is the brake.</p>
  <p class="prose">Negative feedback works in reverse: the output damps the system back toward equilibrium. A thermostat. A predator-prey cycle. The price mechanism in a market. Without negative feedback, every small perturbation would spiral forever.</p>
  <div class="va">
    <canvas id="feedbackCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Growth rate</span>
      <input type="range" id="feedbackRateSlider" min="102" max="140" value="120" oninput="document.getElementById('feedbackRateVal').textContent=((this.value/100-1)*100).toFixed(0)+'%/yr';DRAWS['essay-feedback']()">
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../stats/index.html#distribution-shape">distribution shape</a> topic shows what happens when feedback loops generate extreme outcomes, and <a href="../markets/index.html#indicator-playground">moving averages</a> are a practical negative-feedback tool.</div>
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
  <p class="prose">The surprising thing is the square-root law: after <em>n</em> steps of size 1, the expected distance from the start is &radic;<em>n</em>, not <em>n</em>. Doubling your time quadruples your uncertainty, not doubles it. A stock forecast for one year is not twice as reliable as one for four years — it is half as reliable.</p>
  <p class="prose">Random walks also explain why past prices carry almost no information about future prices in efficient markets. Each step erases the memory of the last. The path looks meaningful in hindsight. It was not.</p>
  <div class="va">
    <canvas id="walkCanvas" height="180"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The <a href="../markets/index.html#paper-trading">paper trading</a> activity lets you test whether you can beat a random walk, and <a href="../stats/index.html#time-series">time-series analysis</a> is the tool for extracting the non-random component.</div>
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
    <canvas id="thresholdCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Input level</span>
      <input type="range" id="thresholdInputSlider" min="0" max="100" value="30" oninput="document.getElementById('thresholdInputVal').textContent=this.value;DRAWS['essay-threshold']()">
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Logistic regression in the <a href="../ml/index.html#logistic-regression">ML Lab</a> is built on this very curve, and <a href="../stats/index.html#hypothesis-testing">hypothesis testing</a> uses a threshold (the p-value) to decide when evidence becomes belief.</div>
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
    <canvas id="survivorCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Survival cutoff</span>
      <input type="range" id="survivorCutSlider" min="0" max="80" value="40" oninput="document.getElementById('survivorCutVal').textContent=this.value;DRAWS['essay-survivor']()">
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
    <canvas id="fractalCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Recursion depth</span>
      <input type="range" id="fractalDepthSlider" min="1" max="10" value="6" oninput="document.getElementById('fractalDepthVal').textContent=this.value;DRAWS['essay-fractal']()">
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
  <p class="prose">In 1973, Berkeley appeared to admit men at a higher rate than women, hinting at bias. But when admissions were broken down department by department, most departments actually favoured women slightly. The reversal was real, not a mistake. Women had applied in larger numbers to the most competitive departments, where everyone\u2019s odds were low. The aggregate hid the structure.</p>
  <p class="prose">This is Simpson\u2019s paradox: a relationship that holds within every subgroup can vanish or flip when the subgroups are pooled. A treatment can help both mild and severe patients yet look worse overall, simply because it was given more often to the sicker ones. The lurking variable \u2014 department, severity, the way cases were sorted \u2014 quietly steers the total.</p>
  <p class="prose">The pattern is a warning about aggregation: a single number summarising a mixed population can point in a direction that is true of <em>no one</em> inside it. The fix is not better arithmetic \u2014 it is asking what was combined, and why.</p>
  <div class="va">
    <canvas id="simpsonCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Group separation</span>
      <input type="range" id="simpsonSepSlider" min="0" max="100" value="70" oninput="document.getElementById('simpsonSepVal').textContent=this.value+'%';DRAWS['essay-simpson']()">
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
    <canvas id="kalmanCanvas" height="180"></canvas>
    <div class="viz-ctrl">
      <span>Trust in sensor</span>
      <input type="range" id="kalmanTrustSlider" min="3" max="95" value="30" oninput="document.getElementById('kalmanTrustVal').textContent=this.value+'%';DRAWS['essay-kalman']()">
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> This essay is the applied face of <a href="../timeseries/index.html#state-space">state-space models</a> in The Toolkit, where the Kalman filter lives, and the \u201cdeep\u201d half borrows the learned dynamics of <a href="../timeseries/index.html#lstm-for-ts">recurrent networks</a>.</div>
  <div class="topic-nav" id="nav-essay-kalman"></div>
</div>`;
}
