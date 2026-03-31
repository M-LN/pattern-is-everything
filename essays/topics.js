/* ═══════════════════════════════════════════════════════════════
   Pattern Essays — Topics Data & Content Builder
   5 short reflections on patterns in the world
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-essays', title:'Pattern Essays', topics:['home','essay-bell','essay-mean','essay-tail','essay-signal','essay-map'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'essay-bell':'The Bell in Everything',
  'essay-mean':'Regression to the Mean',
  'essay-tail':'The Long Tail',
  'essay-signal':'Signal in the Noise',
  'essay-map':'The Map and the Territory',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'essay-bell', num:'E1', title:'The Bell in Everything', category:'Pattern Essays', keywords:['normal distribution','gaussian','central limit theorem','bell curve','aggregation','independence','emergence'], content:'Normal distributions emerge wherever many small, independent forces combine.' },
  { id:'essay-mean', num:'E2', title:'Regression to the Mean', category:'Pattern Essays', keywords:['regression','mean reversion','extremes','Galton','inheritance','arithmetic','luck'], content:'Extreme outcomes tend to be followed by less extreme ones \u2014 not a force, just arithmetic.' },
  { id:'essay-tail', num:'E3', title:'The Long Tail', category:'Pattern Essays', keywords:['power law','Pareto','Zipf','inequality','scale-free','fat tails','rare events','wealth'], content:'Most things are small. A few are enormous. The pattern repeats across domains that seem unrelated.' },
  { id:'essay-signal', num:'E4', title:'Signal in the Noise', category:'Pattern Essays', keywords:['noise','overfitting','randomness','pattern recognition','apophenia','data','uncertainty'], content:'Every dataset is a mix of pattern and randomness. The hard part is not inventing signal where there is none.' },
  { id:'essay-map', num:'E5', title:'The Map and the Territory', category:'Pattern Essays', keywords:['model','abstraction','simplification','representation','Borges','assumptions','residuals'], content:'A model is a deliberate simplification. The danger is forgetting what was left out.' },
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
    + buildEssayMap();
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
    <div class="essay-label">A thousand small forces, one shape</div>
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
    <div class="essay-label">First measurement vs. second \u2014 the pull toward centre</div>
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
    <div class="essay-label">The few and the many \u2014 a power-law curve</div>
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
    <div class="essay-label">A wave emerging from noise \u2014 or is it?</div>
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
    <div class="essay-label">The line and the dots \u2014 the gap is the point</div>
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
