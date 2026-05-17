/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Topics Data & Content Builder
   5 short reflections on patterns in the world
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-essays', title:'Pattern Essays', topics:['home','essay-bell','essay-mean','essay-tail','essay-signal','essay-map','essay-feedback','essay-walk','essay-threshold'] },
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
    + buildEssayThreshold();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Pattern <em>Essays</em></h2>
    <p style="margin-top:14px">Short, calm reflections on patterns that appear across the world &mdash; in data, in markets, in everyday life. Each essay is accompanied by a small visualization. No formulas. No code. Just the pattern.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
    <span class="topic-badge">Essay</span>
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
