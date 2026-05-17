/* ═══════════════════════════════════════════════════════════════
   Chaos Lab — Activities Data & Content Builder
   6 interactive chaos theory activities
   ═══════════════════════════════════════════════════════════════ */

/* ── Formula Decoder helper ─────────────────────────────────── */
function T(symbol, def) {
  const safe = def.replace(/"/g, '&quot;');
  return `<span class="fd-term" data-def="${safe}" data-sym="${symbol}">${symbol}</span>`;
}

/* ── Narrator ────────────────────────────────────────────────── */
const NARRATIONS = {
  'logistic-map': [
    'The logistic map models a population that grows but is limited by resources. Start with r = 2.8 — a low growth rate.',
    'At r = 2.8 the population settles to a single fixed value. No matter where it starts, it always ends up at the same point. That\'s a stable fixed point.',
    'Drag r past 3.0. Something changes — the population can\'t decide between two values and starts alternating. This is period-2 behaviour.',
    'Push r past 3.45. The period doubles again — now four values alternate in a cycle. Period-doubling is the first sign of approaching chaos.',
    'At r = 3.9 the sequence never repeats. It wanders the entire range unpredictably. A tiny change in the starting value sends it somewhere completely different. This is deterministic chaos.',
  ],
  'butterfly-effect': [
    'Two simulations start at nearly the same point — x₀ = 0.500 and x₀ = 0.501. The difference is one part in a thousand.',
    'For the first 20 or so steps the two trajectories track each other almost perfectly. The tiny difference seems to disappear.',
    'Then they begin to peel apart. The gap grows roughly exponentially — doubling every few steps. This is called sensitive dependence on initial conditions.',
    'By step 40 the two trajectories are completely uncorrelated. Knowing one tells you nothing about the other.',
    'This is why long-range weather forecasting is fundamentally limited. Any error in measurement, however small, eventually dominates the forecast.',
  ],
  'bifurcation': [
    'The bifurcation diagram shows every stable state the logistic map ever visits — for every possible value of r.',
    'On the left, r < 3: each vertical slice has just one point. The population always settles to one value.',
    'At r ≈ 3 the single point splits into two. Period-2 begins. At r ≈ 3.45 it splits again into period-4. This cascade of doublings is universal.',
    'The splits keep happening faster and faster — period 8, 16, 32 — until at r ≈ 3.57 chaos begins. Feigenbaum showed the ratio between successive bifurcation points always converges to the same constant: δ ≈ 4.669.',
    'Inside the chaotic region look for the bright windows. Those are islands of order — periodic orbits that emerge briefly and then dissolve back into chaos.',
  ],
  'lorenz-attractor': [
    'The Lorenz system was designed in 1963 to model atmospheric convection — hot air rising, cool air sinking.',
    'Three variables: X (convection rate), Y (temperature difference), Z (temperature distortion). Three coupled differential equations.',
    'Watch the trajectory spiral around one lobe, then suddenly jump to the other. It never crosses itself, yet never repeats.',
    'This is a strange attractor — the trajectory is trapped in a bounded region but its path has infinite length. The shape is a fractal.',
    'The key discovery: two nearby starting points follow almost the same path briefly, then diverge onto different lobes. Chaos in a continuous system.',
  ],
  'wolfram-rules': [
    'Wolfram\'s elementary cellular automaton: a row of cells, each black or white. Each cell\'s next state depends only on itself and its two neighbours.',
    'Eight possible neighbourhood patterns (left, centre, right) — each gets a new colour. 8 bits = 256 possible rules. They are numbered 0 to 255.',
    'Try Rule 90 — the pattern is a Sierpiński triangle. A simple local rule producing a global fractal. Emergence from simplicity.',
    'Rule 30 produces apparent randomness from a completely deterministic rule. Wolfram used it as a random number generator.',
    'Rule 110 is Turing complete — it can compute anything a computer can. A single row of cells, a fixed rule, universal computation.',
  ],
  'game-of-life': [
    'Conway\'s Game of Life: a grid of live and dead cells. Every generation, four rules apply simultaneously to every cell.',
    'A live cell with 2 or 3 neighbours survives. Fewer — it dies of loneliness. More — it dies of overcrowding.',
    'A dead cell with exactly 3 live neighbours becomes alive. That\'s it. Four rules. No designer. Yet the patterns that emerge are extraordinary.',
    'Try the Glider preset — a small pattern that moves diagonally across the grid forever. Motion from rules that know nothing about direction.',
    'The R-Pentomino is chaotic — five cells evolve for 1103 generations before stabilising. No one predicted this from looking at the starting shape.',
  ],
};

function showNarration(topicId, stepIdx) {
  const steps = NARRATIONS[topicId];
  if (!steps) return;
  const bar = document.getElementById('narrator-' + topicId);
  if (!bar) return;
  bar.classList.add('active');
  bar.querySelector('.narrator-step').textContent = `Step ${stepIdx + 1} of ${steps.length}`;
  bar.querySelector('.narrator-text').textContent = steps[stepIdx] || '';
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => d.classList.toggle('active', i === stepIdx));
}
function hideNarration(topicId) {
  const bar = document.getElementById('narrator-' + topicId);
  if (bar) bar.classList.remove('active');
}
function buildNarratorBar(topicId) {
  const dots = (NARRATIONS[topicId] || []).map(() => '<div class="narrator-dot"></div>').join('');
  return `
    <div class="narrator-bar" id="narrator-${topicId}">
      <div class="narrator-icon">💡</div>
      <div class="narrator-body">
        <div class="narrator-step"></div>
        <div class="narrator-text"></div>
        <div class="narrator-dots">${dots}</div>
      </div>
      <button class="narrator-close" onclick="hideNarration('${topicId}')" title="Close">✕</button>
    </div>`;
}

const SECTIONS = [
  { id:'sec-chaos-lab', title:'Chaos Lab', topics:['logistic-map','butterfly-effect','bifurcation','lorenz-attractor','wolfram-rules','game-of-life'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'logistic-map':     'The Logistic Map',
  'butterfly-effect': 'The Butterfly Effect',
  'bifurcation':      'Bifurcation Diagram',
  'lorenz-attractor': 'The Lorenz Attractor',
  'wolfram-rules':    "Wolfram's Rules",
  'game-of-life':     "Conway's Game of Life",
};

const TOPIC_DATA = [
  { id:'logistic-map',     num:'C1', title:'The Logistic Map',        category:'Chaos Lab', keywords:['logistic map','chaos','iteration','fixed point','period doubling','attractor','r parameter','deterministic'], content:'Drag the r slider from order to chaos — watch a simple formula produce fixed points, periodic orbits, and finally unpredictable chaos.' },
  { id:'butterfly-effect', num:'C2', title:'The Butterfly Effect',     category:'Chaos Lab', keywords:['butterfly effect','sensitivity','initial conditions','divergence','Lyapunov','chaos','exponential growth'], content:'Two trajectories start almost identically. Watch them track together, then diverge exponentially.' },
  { id:'bifurcation',      num:'C3', title:'Bifurcation Diagram',      category:'Chaos Lab', keywords:['bifurcation','period doubling','Feigenbaum','phase transition','chaos onset','attractor','stability'], content:'The full portrait of chaos — every stable state for every r, rendered at once. See order dissolve into chaos.' },
  { id:'lorenz-attractor', num:'C4', title:'The Lorenz Attractor',     category:'Chaos Lab', keywords:['Lorenz','strange attractor','butterfly','differential equations','chaos','fractal','convection','weather'], content:'The iconic butterfly-shaped strange attractor — deterministic motion that never repeats.' },
  { id:'wolfram-rules',    num:'C5', title:"Wolfram's Rules",          category:'Chaos Lab', keywords:['cellular automaton','Wolfram','rule 30','rule 110','emergence','computation','fractal','Sierpinski','Turing'], content:'256 rules, each a universe. From boring repetition to fractals to apparent randomness to universal computation.' },
  { id:'game-of-life',     num:'C6', title:"Conway's Game of Life",    category:'Chaos Lab', keywords:['game of life','Conway','cellular automaton','emergence','glider','oscillator','still life','Turing complete','self-replication'], content:'Four rules, infinite complexity. Draw a pattern and watch what life does with it.' },
];

/* ── How-it-Works explainer panels ── */
const EXPLAINERS = {
  'logistic-map': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>The Logistic Map</h3>
      <p>The logistic map is a recursion — each value is computed from the last. It models a population that grows proportionally to its size but is limited by carrying capacity.</p>
      <div class="exp-formula">${T('xₜ₊₁','The next value in the sequence — the population at the next time step.')} = ${T('r','The growth rate parameter. Controls whether the system is stable, periodic, or chaotic.')} · ${T('xₜ','The current value — a number between 0 and 1 representing population as a fraction of carrying capacity.')} · (1 − ${T('xₜ','The current value — subtracted to model resource limits: the closer to 1, the less room to grow.')})</div>
      <p>The single parameter <strong>r</strong> controls everything. Below 3: stable. Near 3: period-2. Near 3.45: period-4. Above ≈3.57: chaos.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>At r = 2.5 the series converges to a fixed point — always.</li>
        <li>Cross r = 3.0 and two alternating values appear. Period has doubled.</li>
        <li>The period-doubling cascade accelerates — bifurcations come faster and faster.</li>
        <li>In the chaos regime, change x₀ by 0.001 and the long-run trajectory is completely different.</li>
      </ul>
    </details>`,

  'butterfly-effect': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Sensitive Dependence on Initial Conditions</h3>
      <p>In a chaotic system, nearby trajectories diverge exponentially. The rate of divergence is measured by the <strong>Lyapunov exponent</strong> λ — if λ > 0, the system is chaotic.</p>
      <div class="exp-formula">${T('|δx(t)|','The separation between two trajectories at time t — how different the two paths have become.')} ≈ ${T('e','Euler\'s number ≈ 2.718 — the base of exponential growth.')}^(${T('λ','Lyapunov exponent — positive means chaos. The larger λ, the faster nearby trajectories diverge.')} · ${T('t','Time — the number of iterations elapsed.')}) · ${T('|δx₀|','The initial separation — how similar the two starting conditions were.')}</div>
      <p>This is not due to errors or randomness — it is a property of the deterministic equations themselves. Perfect knowledge of the initial state would still fail after enough iterations.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Below r = 3.57 the two trajectories stay close — no chaos, no divergence.</li>
        <li>In the chaos zone they match for ~15–25 steps then peel apart suddenly.</li>
        <li>The divergence plot (lower panel) shows exponential growth until it saturates.</li>
        <li>A smaller ε delays divergence by a constant — it does not prevent it.</li>
      </ul>
    </details>`,

  'bifurcation': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>The Bifurcation Diagram</h3>
      <p>For each value of r we run the logistic map for 300 steps to let it settle, then record the next 150 values. Every recorded value becomes a dot in the diagram. The result is a complete portrait of every attractor at every r.</p>
      <div class="exp-formula">${T('δₙ','The gap between the nth and (n+1)th bifurcation point in r.')} / ${T('δₙ₊₁','The next gap.')} → ${T('δ','Feigenbaum\'s delta constant ≈ 4.66920… — universal across all maps with a quadratic maximum. Discovered by Mitchell Feigenbaum in 1975.')}</div>
      <p>The ratio between successive bifurcation widths converges to Feigenbaum's constant δ ≈ 4.669 — the same value appears in any smooth one-humped map, from population models to electronic circuits.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Each split is a period-doubling bifurcation — the number of stable states doubles.</li>
        <li>The splits arrive faster and faster (the Feigenbaum cascade).</li>
        <li>In the chaotic region, look for bright vertical windows — islands of periodicity.</li>
        <li>Zoom into any window and you see the whole diagram repeated inside it — self-similarity.</li>
      </ul>
    </details>`,

  'lorenz-attractor': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>The Lorenz System</h3>
      <p>Three coupled ordinary differential equations model convection in a fluid heated from below. Edward Lorenz discovered in 1963 that even this simple system had unpredictable long-term behaviour.</p>
      <div class="exp-formula">d${T('X','Convection rate — how vigorously the fluid circulates.')}/dt = ${T('σ','Sigma (Prandtl number) — ratio of fluid viscosity to thermal diffusivity. Default: 10.')}(${T('Y','Temperature difference between ascending and descending currents.')} − X) &nbsp;&nbsp; d${T('Y','Temperature difference between ascending and descending fluid.')}/dt = X(${T('ρ','Rho (Rayleigh number) — ratio of buoyancy to damping. Default: 28. Above 24.74 the fixed points become unstable.')} − ${T('Z','Distortion of the vertical temperature profile.')}) − Y &nbsp;&nbsp; d${T('Z','Vertical temperature profile distortion.')}/dt = XY − ${T('β','Beta — a geometric factor. Default: 8/3.')}Z</div>
      <p>The trajectory is attracted to a two-lobed fractal surface — it spirals around one lobe, then switches to the other unpredictably. It never crosses itself and never repeats.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The butterfly shape emerges after the first few hundred steps.</li>
        <li>The trajectory never visits the centre — that unstable fixed point repels it.</li>
        <li>The number of orbits on one lobe before switching appears random.</li>
        <li>Raise ρ above 28 — the attractor changes shape; lower it below 24.74 and it collapses to a point.</li>
      </ul>
    </details>`,

  'wolfram-rules': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Elementary Cellular Automata</h3>
      <p>Each cell is black (1) or white (0). At each step every cell looks at its left neighbour, itself, and its right neighbour — 8 possible patterns. The rule number in binary defines the new state for each pattern.</p>
      <div class="exp-formula">Rule ${T('N','The rule number 0–255. Its 8-bit binary representation lists the output for each of the 8 neighbourhood patterns (111, 110, 101, 100, 011, 010, 001, 000).')}: bit ${T('k','The pattern index (0–7) formed by reading left·centre·right as a 3-bit number.')} of binary(N) → new state for pattern k</div>
      <p>The 256 rules cover four qualitative classes (Wolfram's classification): Class I — uniform, Class II — periodic, Class III — chaotic, Class IV — complex (capable of computation). Class IV contains Rule 110.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Rule 90: a perfect Sierpiński triangle — global fractal from local rules.</li>
        <li>Rule 30: looks random even though it is perfectly deterministic.</li>
        <li>Rule 110: produces complex, irregular but structured patterns — Turing complete.</li>
        <li>Rule 254: fills everything — boring but valid.</li>
      </ul>
    </details>`,

  'game-of-life': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Conway's Game of Life</h3>
      <p>Four deterministic rules apply simultaneously to every cell every generation. No exceptions, no randomness, no designer. The rules interact to produce an astonishing variety of behaviour.</p>
      <div class="exp-formula">Live cell + ${T('2–3','The survival range. Fewer than 2 neighbours: death by underpopulation. More than 3: death by overcrowding.')} neighbours → survives &nbsp;|&nbsp; Dead cell + ${T('exactly 3','Birth rule. Exactly 3 live neighbours generate exactly enough "pressure" to create new life.')} neighbours → born &nbsp;|&nbsp; all other → unchanged</div>
      <p>Conway proved the Game of Life is Turing complete — it can simulate any computation. The Glider Gun was the first proof that self-replicating structures were possible.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Still lifes (Block, Beehive) are fixed — they satisfy all four rules every step.</li>
        <li>Oscillators (Blinker, Pulsar) return to their start after a fixed number of steps.</li>
        <li>Gliders translate — they move diagonally while oscillating.</li>
        <li>The R-Pentomino looks trivial but runs for 1103 generations before stabilising.</li>
      </ul>
    </details>`,
};

/* ── Build page content ── */
function buildContent() {
  const nav = document.getElementById('mainNav');
  const main = document.getElementById('mainContent');

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

  TOPICS.forEach(id => {
    const div = document.createElement('div');
    div.className = 'topic';
    div.id = id;

    if (id === 'logistic-map')     div.innerHTML = buildLogisticMap();
    else if (id === 'butterfly-effect') div.innerHTML = buildButterflyEffect();
    else if (id === 'bifurcation')      div.innerHTML = buildBifurcation();
    else if (id === 'lorenz-attractor') div.innerHTML = buildLorenzAttractor();
    else if (id === 'wolfram-rules')    div.innerHTML = buildWolframRules();
    else if (id === 'game-of-life')     div.innerHTML = buildGameOfLife();

    div.innerHTML += buildNarratorBar(id);
    div.innerHTML += EXPLAINERS[id] || '';
    main.appendChild(div);
  });
}

/* ── Activity builders ─────────────────────────────────────── */

function buildLogisticMap() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">The Logistic <em style="font-style:italic;color:#ff8a65;">Map</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      A single formula, one parameter. Drag ${T('r','Growth rate — the single parameter that controls the entire system. Below 3: stable. Near 3.45: period doubling. Above 3.57: chaos.')} from left to right and watch order give way to chaos.
    </p>
    <div class="sandbox-canvas-wrap">
      <canvas id="lmCanvas" height="300"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Growth rate ${T('r','The bifurcation parameter. Every qualitative change in the system — fixed point, period-2, period-4, chaos — is caused solely by this number.')}</label>
        <input type="range" id="lmR" min="2.4" max="4.0" step="0.01" value="2.8"
               oninput="document.getElementById('lmRV').textContent=parseFloat(this.value).toFixed(2);ENGINE.drawLogisticMap()">
        <span class="ctrl-val" id="lmRV">2.80</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Starting value ${T('x₀','The initial condition — a number between 0 and 1. In the chaotic regime, changing this by 0.001 eventually sends the trajectory somewhere completely different.')}</label>
        <input type="range" id="lmX0" min="0.01" max="0.99" step="0.01" value="0.5"
               oninput="document.getElementById('lmX0V').textContent=parseFloat(this.value).toFixed(2);ENGINE.drawLogisticMap()">
        <span class="ctrl-val" id="lmX0V">0.50</span>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn teach-btn" onclick="ENGINE.teachLogisticMap()">🎓 Teach Me</button>
        <button class="sb-btn" onclick="ENGINE.drawLogisticMap()">↺ Reset</button>
      </div>
    </div>`;
}

function buildButterflyEffect() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">The Butterfly <em style="font-style:italic;color:#ff8a65;">Effect</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      Two simulations, almost identical starts. Watch them track together — then diverge completely.
    </p>
    <div class="sandbox-canvas-wrap">
      <canvas id="beCanvas" height="340"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Growth rate ${T('r','Keep r in the chaos zone (above 3.57) to see divergence. Below it, both trajectories settle to the same attractor.')}</label>
        <input type="range" id="beR" min="3.5" max="4.0" step="0.01" value="3.9"
               oninput="document.getElementById('beRV').textContent=parseFloat(this.value).toFixed(2);ENGINE.drawButterflyEffect()">
        <span class="ctrl-val" id="beRV">3.90</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Initial separation ${T('ε','Epsilon — the tiny difference between the two starting values. Even ε = 0.000001 eventually causes complete divergence in a chaotic system.')}</label>
        <select id="beEps" onchange="ENGINE.drawButterflyEffect()" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
          <option value="0.1">ε = 0.1</option>
          <option value="0.01">ε = 0.01</option>
          <option value="0.001" selected>ε = 0.001</option>
          <option value="0.0001">ε = 0.0001</option>
          <option value="0.00001">ε = 0.00001</option>
        </select>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn teach-btn" onclick="ENGINE.teachButterflyEffect()">🎓 Teach Me</button>
        <button class="sb-btn" onclick="ENGINE.drawButterflyEffect()">↺ Reset</button>
      </div>
    </div>`;
}

function buildBifurcation() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">Bifurcation <em style="font-style:italic;color:#ff8a65;">Diagram</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      Every stable state for every ${T('r','Growth rate — x-axis runs from r = 2.5 to r = 4.0. Each vertical slice shows all values the system visits at that r.')} — the complete portrait of the logistic map. The onset of chaos, rendered all at once.
    </p>
    <div class="sandbox-canvas-wrap">
      <canvas id="bifCanvas" height="340" style="cursor:crosshair;"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row" id="bifInfo" style="font-family:var(--mono);font-size:12px;color:var(--muted);">
        Hover over the diagram to read r and x values
      </div>
      <div class="ctrl-row">
        <button class="sb-btn teach-btn" onclick="ENGINE.teachBifurcation()">🎓 Teach Me</button>
        <button class="sb-btn" onclick="ENGINE.renderBifurcation()">↺ Re-render</button>
      </div>
    </div>`;
}

function buildLorenzAttractor() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">The Lorenz <em style="font-style:italic;color:#ff8a65;">Attractor</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      Deterministic equations, infinite non-repeating path. The butterfly that started chaos theory.
    </p>
    <div class="sandbox-canvas-wrap">
      <canvas id="lorenzCanvas" height="360"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">${T('ρ','Rho — the Rayleigh number. Controls how vigorously the convection rolls. Below 24.74: fixed point. Above: chaos. Classic value: 28.')}</label>
        <input type="range" id="lorRho" min="10" max="60" step="0.5" value="28"
               oninput="document.getElementById('lorRhoV').textContent=parseFloat(this.value).toFixed(1);ENGINE.restartLorenz()">
        <span class="ctrl-val" id="lorRhoV">28.0</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Speed</label>
        <input type="range" id="lorSpeed" min="1" max="8" step="1" value="3"
               oninput="document.getElementById('lorSpeedV').textContent=this.value+'×'">
        <span class="ctrl-val" id="lorSpeedV">3×</span>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn" id="lorPlayBtn" onclick="ENGINE.toggleLorenz()">⏸ Pause</button>
        <button class="sb-btn" onclick="ENGINE.restartLorenz()">↺ Restart</button>
        <button class="sb-btn teach-btn" onclick="ENGINE.teachLorenz()">🎓 Teach Me</button>
      </div>
    </div>`;
}

function buildWolframRules() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">Wolfram's <em style="font-style:italic;color:#ff8a65;">Rules</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      256 rules. Each a universe. From uniform grey to universal computation.
    </p>
    <div class="sandbox-canvas-wrap">
      <canvas id="wolframCanvas" height="340"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Rule ${T('N','Rule number 0–255. Each bit in its binary representation defines the output for one of the 8 possible 3-cell neighbourhood patterns.')}</label>
        <input type="range" id="wolRule" min="0" max="255" step="1" value="90"
               oninput="document.getElementById('wolRuleV').textContent=this.value;ENGINE.drawWolfram()">
        <span class="ctrl-val" id="wolRuleV">90</span>
      </div>
      <div class="ctrl-row" style="flex-wrap:wrap;gap:6px;">
        <span style="font-family:var(--mono);font-size:11px;color:var(--muted);width:100%;margin-bottom:2px;">Famous rules:</span>
        <button class="sb-btn" onclick="ENGINE.setRule(30)">Rule 30 — chaos</button>
        <button class="sb-btn" onclick="ENGINE.setRule(90)">Rule 90 — fractal</button>
        <button class="sb-btn" onclick="ENGINE.setRule(110)">Rule 110 — universal</button>
        <button class="sb-btn" onclick="ENGINE.setRule(184)">Rule 184 — traffic</button>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn teach-btn" onclick="ENGINE.teachWolfram()">🎓 Teach Me</button>
      </div>
    </div>`;
}

function buildGameOfLife() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">Conway's Game <em style="font-style:italic;color:#ff8a65;">of Life</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">
      Four rules. Click to paint cells, then press Run. No designer — only emergence.
    </p>
    <div class="sandbox-canvas-wrap gol-grid-wrap">
      <canvas id="golCanvas" height="360" style="cursor:crosshair;display:block;width:100%;"></canvas>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span style="font-family:var(--mono);font-size:12px;color:var(--muted);">Generation: <strong id="golGen">0</strong></span>
        <span style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-left:16px;">Live cells: <strong id="golPop">0</strong></span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Speed</label>
        <input type="range" id="golSpeed" min="1" max="20" step="1" value="6"
               oninput="document.getElementById('golSpeedV').textContent=this.value+'fps'">
        <span class="ctrl-val" id="golSpeedV">6fps</span>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn" id="golRunBtn" onclick="ENGINE.golToggle()">▶ Run</button>
        <button class="sb-btn" onclick="ENGINE.golStep()">⏭ Step</button>
        <button class="sb-btn" onclick="ENGINE.golClear()">✕ Clear</button>
      </div>
      <div class="ctrl-row" style="flex-wrap:wrap;gap:6px;">
        <span style="font-family:var(--mono);font-size:11px;color:var(--muted);width:100%;margin-bottom:2px;">Presets:</span>
        <button class="sb-btn" onclick="ENGINE.golPreset('glider')">Glider</button>
        <button class="sb-btn" onclick="ENGINE.golPreset('blinker')">Blinker</button>
        <button class="sb-btn" onclick="ENGINE.golPreset('pulsar')">Pulsar</button>
        <button class="sb-btn" onclick="ENGINE.golPreset('rpentomino')">R-Pentomino</button>
        <button class="sb-btn" onclick="ENGINE.golPreset('glidergun')">Glider Gun</button>
        <button class="sb-btn" onclick="ENGINE.golPreset('random')">Random</button>
      </div>
      <div class="ctrl-row">
        <button class="sb-btn teach-btn" onclick="ENGINE.teachGameOfLife()">🎓 Teach Me</button>
      </div>
    </div>`;
}
