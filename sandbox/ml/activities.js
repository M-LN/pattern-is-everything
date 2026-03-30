/* ═══════════════════════════════════════════════════════════════
   ML Lab — Activities Data & Content Builder
   Interactive ML sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-ml-lab', title:'ML Lab', topics:['linear-regression','k-means','classification-boundary','neural-network','feature-scaling','timeseries-forecast'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'linear-regression':       'Linear Regression Playground',
  'k-means':                 'K-Means Clustering',
  'classification-boundary': 'Classification Boundary',
  'neural-network':          'Neural Network Builder',
  'feature-scaling':         'Feature Scaling Demo',
  'timeseries-forecast':     'Timeseries Forecasting',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'linear-regression', num:'01', title:'Linear Regression Playground', category:'ML Lab', keywords:['regression','gradient descent','MSE','loss','slope','intercept','learning rate','fit','line','scatter'], content:'Place data points and watch gradient descent fit a line in real-time. Adjust learning rate and see how it affects convergence.' },
  { id:'k-means', num:'02', title:'K-Means Clustering', category:'ML Lab', keywords:['clustering','centroids','k-means','unsupervised','voronoi','iteration','convergence','elbow'], content:'Place points, choose K, and step through the K-Means algorithm — watch centroids move and clusters form.' },
  { id:'classification-boundary', num:'03', title:'Classification Boundary', category:'ML Lab', keywords:['classification','KNN','logistic regression','decision boundary','supervised','binary','classes'], content:'Place two classes of points and watch how KNN or Logistic Regression draws a decision boundary between them.' },
  { id:'neural-network', num:'04', title:'Neural Network Builder', category:'ML Lab', keywords:['neural network','deep learning','layers','neurons','activation','sigmoid','relu','backpropagation','XOR','spiral'], content:'Build a small neural network, pick a dataset, and watch it learn a decision boundary epoch by epoch.' },
  { id:'feature-scaling', num:'05', title:'Feature Scaling Demo', category:'ML Lab', keywords:['feature scaling','normalization','standardization','min-max','z-score','gradient descent','convergence'], content:'See how feature scaling transforms data and dramatically speeds up gradient descent convergence.' },
  { id:'timeseries-forecast', num:'06', title:'Timeseries Forecasting', category:'ML Lab', keywords:['timeseries','forecasting','moving average','exponential smoothing','trend','seasonality','MAE','RMSE'], content:'Generate time series with trend and seasonality, then forecast with moving averages and exponential smoothing.' },
];

/* ── Hints system ── */
const HINTS = {
  'linear-regression': [
    { id:'lr-first-point',         trigger:'pointCount>=1',  message:'Place at least 5 points to see a meaningful regression fit.' },
    { id:'lr-high-loss',           trigger:'mse>2',          message:'High loss — try adding more points near the center to anchor the fit.' },
    { id:'lr-high-lr',             trigger:'learningRate>0.5',message:'A very high learning rate can cause the line to overshoot — watch for oscillation.' },
    { id:'lr-low-lr',              trigger:'learningRate<0.01',message:'A very small learning rate converges slowly but precisely.' },
    { id:'lr-good-fit',            trigger:'mse<0.3',        message:'Nice fit! The MSE is low — this line captures the trend well.' },
    { id:'lr-after-fit',           trigger:'fitted',         message:'The line minimizes the total squared vertical distance to all points.' },
  ],
  'k-means': [
    { id:'km-first-points',        trigger:'pointCount>=3',  message:'Place at least 10 points to see interesting clusters form.' },
    { id:'km-high-k',              trigger:'k>pointGroups',  message:'More clusters than natural groups can cause over-splitting.' },
    { id:'km-converged',           trigger:'converged',      message:'K-Means has converged — the centroids stopped moving.' },
    { id:'km-rerun',               trigger:'runCount>=2',    message:'Different starting centroids can give different results — that\'s K-Means\' sensitivity to initialization.' },
    { id:'km-step-explain',        trigger:'stepCount==1',   message:'Each step: 1) assign every point to its nearest centroid, 2) move centroids to the mean of their cluster.' },
  ],
  'classification-boundary': [
    { id:'cb-first-points',  trigger:'pointCount>=3',    message:'Place points for both classes — click for Class A (blue), Shift+click for Class B (red).' },
    { id:'cb-imbalanced',    trigger:'imbalanced',       message:'Classes are imbalanced — the boundary may be biased toward the larger class.' },
    { id:'cb-knn-high',      trigger:'k>7',              message:'A higher K smooths the boundary but may miss local patterns.' },
    { id:'cb-knn-low',       trigger:'k==1',             message:'K=1 creates a very jagged boundary — every point is its own neighborhood.' },
    { id:'cb-trained',       trigger:'trained',          message:'The colored regions show where each class is predicted. Points near the boundary are hardest to classify.' },
  ],
  'neural-network': [
    { id:'nn-first-train',   trigger:'epoch>=1',         message:'Each epoch updates all weights via backpropagation — watch the loss curve decrease.' },
    { id:'nn-slow',          trigger:'lossHigh',         message:'Loss is still high — try adding more neurons or switching activation functions.' },
    { id:'nn-xor',           trigger:'datasetXOR',       message:'XOR can\'t be solved with a single layer — you need at least one hidden layer.' },
    { id:'nn-overfit',       trigger:'epoch>=200',       message:'Many epochs may overfit — watch if the boundary becomes overly complex.' },
    { id:'nn-relu',          trigger:'activationRelu',   message:'ReLU trains faster but can "die" — neurons stuck at 0 output.' },
  ],
  'feature-scaling': [
    { id:'fs-raw',           trigger:'showRaw',          message:'Without scaling, features on larger scales dominate gradient descent.' },
    { id:'fs-minmax',        trigger:'methodMinmax',     message:'Min-Max scales features to [0,1] — sensitive to outliers.' },
    { id:'fs-zscore',        trigger:'methodZscore',     message:'Z-score centers data at 0 with s.d.=1 — robust to different ranges.' },
    { id:'fs-speedup',       trigger:'bothConverged',    message:'Notice how the scaled version converges in far fewer iterations!' },
  ],
  'timeseries-forecast': [
    { id:'ts-ma',            trigger:'methodMA',         message:'Moving Average smooths noise but lags behind sudden changes.' },
    { id:'ts-es-low',        trigger:'alphaLow',         message:'Low alpha means heavy smoothing — the forecast reacts slowly to changes.' },
    { id:'ts-es-high',       trigger:'alphaHigh',        message:'High alpha tracks recent values closely but is sensitive to noise.' },
    { id:'ts-seasonal',      trigger:'hasSeason',        message:'The repeating peaks show seasonality — a pattern that repeats at fixed intervals.' },
  ],
};

/* ── Challenges ── */
const CHALLENGES = {
  'linear-regression': [
    { id:'lr-c1', title:'Noisy Fit',       objective:'Fit a line to noisy data with MSE < 0.5',              checkFn:'mse<0.5&&fitted' },
    { id:'lr-c2', title:'Speed Learner',    objective:'Converge in under 20 iterations',                      checkFn:'iterations<20&&fitted' },
  ],
  'k-means': [
    { id:'km-c1', title:'Quick Cluster',    objective:'Cluster the data into 3 groups in under 10 steps',     checkFn:'converged&&stepCount<10&&k==3' },
    { id:'km-c2', title:'Find the K',       objective:'Find the optimal K for this dataset (lowest inertia)', checkFn:'optimalK' },
  ],
  'classification-boundary': [
    { id:'cb-c1', title:'Clean Split',     objective:'Achieve 100% training accuracy with KNN',               checkFn:'accuracy==100' },
    { id:'cb-c2', title:'Smooth Boundary',  objective:'Get 90%+ accuracy with K ≥ 5',                        checkFn:'accuracy>=90&&kHigh' },
  ],
  'neural-network': [
    { id:'nn-c1', title:'XOR Solver',      objective:'Solve XOR — get loss below 0.05',                       checkFn:'loss<0.05&&datasetXOR' },
    { id:'nn-c2', title:'Minimal Network',  objective:'Solve Circle with only 3 hidden neurons total',        checkFn:'loss<0.1&&neuronCount<=3' },
  ],
  'feature-scaling': [
    { id:'fs-c1', title:'Speed Demon',     objective:'Converge the scaled version in under 30 iterations',    checkFn:'scaledIter<30&&scaledConverged' },
    { id:'fs-c2', title:'Compare All',      objective:'Try all three scaling methods on the same data',       checkFn:'triedAll' },
  ],
  'timeseries-forecast': [
    { id:'ts-c1', title:'Tight Forecast',  objective:'Achieve MAE < 5 with exponential smoothing',            checkFn:'mae<5&&methodES' },
    { id:'ts-c2', title:'Trend Tracker',    objective:'Forecast a trending series with RMSE < 8',             checkFn:'rmse<8' },
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

    if (id === 'linear-regression') {
      div.innerHTML = buildLinearRegression();
    } else if (id === 'k-means') {
      div.innerHTML = buildKMeans();
    } else if (id === 'classification-boundary') {
      div.innerHTML = buildClassificationBoundary();
    } else if (id === 'neural-network') {
      div.innerHTML = buildNeuralNetwork();
    } else if (id === 'feature-scaling') {
      div.innerHTML = buildFeatureScaling();
    } else if (id === 'timeseries-forecast') {
      div.innerHTML = buildTimeseriesForecast();
    }

    main.appendChild(div);
  });
}

function buildLinearRegression() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Linear Regression <em style="font-style:italic;color:#4fc3f7;">Playground</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Click on the canvas to place data points. Hit <strong>Fit Line</strong> to watch gradient descent find the best-fit line in real-time. Adjust the learning rate to see how it affects convergence.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="lrCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Learning Rate</label>
        <input type="range" id="lrRate" min="0.001" max="1" step="0.001" value="0.05">
        <span class="ctrl-val" id="lrRateV">0.050</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Iterations</label>
        <input type="range" id="lrIter" min="5" max="200" step="1" value="50">
        <span class="ctrl-val" id="lrIterV">50</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.fitLine()">▶ Fit Line</button>
        <button class="sb-btn" onclick="ENGINE.addNoise()">🎲 Add Noise</button>
        <button class="sb-btn" onclick="ENGINE.resetLR()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('linear-regression')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">MSE</span><span class="metric-val" id="lrMSE">—</span></div>
      <div class="metric"><span class="metric-label">Slope (m)</span><span class="metric-val" id="lrSlope">—</span></div>
      <div class="metric"><span class="metric-label">Intercept (b)</span><span class="metric-val" id="lrIntercept">—</span></div>
      <div class="metric"><span class="metric-label">Iteration</span><span class="metric-val" id="lrIterC">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-linear-regression" style="display:none;"></div>
    <div class="hint-panel" id="hints-linear-regression"></div>
  `;
}

function buildKMeans() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">K-Means <em style="font-style:italic;color:#4fc3f7;">Clustering</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Click to place data points on the canvas. Choose K and step through the algorithm — watch centroids move and Voronoi-style regions form.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="kmCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">K (clusters)</label>
        <input type="range" id="kmK" min="2" max="6" step="1" value="3">
        <span class="ctrl-val" id="kmKV">3</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.stepKM()">→ Step</button>
        <button class="sb-btn primary" onclick="ENGINE.runKM()">▶ Run All</button>
        <button class="sb-btn" onclick="ENGINE.randomData()">🎲 Random Data</button>
        <button class="sb-btn" onclick="ENGINE.resetKM()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('k-means')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Step</span><span class="metric-val" id="kmStep">0</span></div>
      <div class="metric"><span class="metric-label">Status</span><span class="metric-val" id="kmStatus">Place points</span></div>
      <div class="metric"><span class="metric-label">Inertia</span><span class="metric-val" id="kmInertia">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-k-means" style="display:none;"></div>
    <div class="hint-panel" id="hints-k-means"></div>
  `;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', buildContent);


/* ── Build: Classification Boundary ── */
function buildClassificationBoundary() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Classification <em style="font-style:italic;color:#4fc3f7;">Boundary</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Click to place <strong style="color:#4fc3f7">Class A</strong> points. <strong>Shift+Click</strong> for <strong style="color:#e57373">Class B</strong>. Train to see the decision boundary.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="cbCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Algorithm</label>
        <select id="cbAlgo" class="sb-select" onchange="ENGINE.setCBAlgo(this.value)">
          <option value="knn" selected>K-Nearest Neighbors</option>
          <option value="logistic">Logistic Regression</option>
        </select>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">K (for KNN)</label>
        <input type="range" id="cbK" min="1" max="15" step="2" value="5">
        <span class="ctrl-val" id="cbKV">5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.trainCB()">▶ Train</button>
        <button class="sb-btn" onclick="ENGINE.sampleCB()">🎲 Sample Data</button>
        <button class="sb-btn" onclick="ENGINE.resetCB()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('classification-boundary')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Class A</span><span class="metric-val" id="cbCountA">0</span></div>
      <div class="metric"><span class="metric-label">Class B</span><span class="metric-val" id="cbCountB">0</span></div>
      <div class="metric"><span class="metric-label">Accuracy</span><span class="metric-val" id="cbAccuracy">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-classification-boundary" style="display:none;"></div>
    <div class="hint-panel" id="hints-classification-boundary"></div>
  `;
}


/* ── Build: Neural Network Builder ── */
function buildNeuralNetwork() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Neural Network <em style="font-style:italic;color:#4fc3f7;">Builder</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Pick a dataset, build a network, and watch it learn a decision boundary epoch by epoch. The loss curve shows training progress.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="nnCanvas" height="400"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Dataset</label>
        <select id="nnDataset" class="sb-select">
          <option value="xor">XOR</option>
          <option value="circle">Circle</option>
          <option value="spiral">Spiral</option>
          <option value="linear">Linear</option>
        </select>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Hidden Neurons</label>
        <input type="range" id="nnNeurons" min="2" max="8" step="1" value="4">
        <span class="ctrl-val" id="nnNeuronsV">4</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Learning Rate</label>
        <input type="range" id="nnLR" min="0.01" max="2" step="0.01" value="0.5">
        <span class="ctrl-val" id="nnLRV">0.50</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Activation</label>
        <select id="nnActivation" class="sb-select">
          <option value="relu">ReLU</option>
          <option value="sigmoid">Sigmoid</option>
          <option value="tanh">Tanh</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.trainNN()">▶ Train 50 Epochs</button>
        <button class="sb-btn" onclick="ENGINE.resetNN()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('neural-network')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Epoch</span><span class="metric-val" id="nnEpoch">0</span></div>
      <div class="metric"><span class="metric-label">Loss</span><span class="metric-val" id="nnLoss">—</span></div>
      <div class="metric"><span class="metric-label">Neurons</span><span class="metric-val" id="nnTotalN">4</span></div>
    </div>

    <div class="challenge-panel" id="challenge-neural-network" style="display:none;"></div>
    <div class="hint-panel" id="hints-neural-network"></div>
  `;
}


/* ── Build: Feature Scaling Demo ── */
function buildFeatureScaling() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Feature Scaling <em style="font-style:italic;color:#4fc3f7;">Demo</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      See how normalization transforms data and speeds up gradient descent. Left = raw data, Right = scaled data. Watch convergence speed difference.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="fsCanvas" height="380"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Scaling Method</label>
        <select id="fsMethod" class="sb-select" onchange="ENGINE.setFSMethod(this.value)">
          <option value="minmax">Min-Max [0, 1]</option>
          <option value="zscore">Z-Score (μ=0, σ=1)</option>
          <option value="robust">Robust (IQR-based)</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.runFS()">▶ Run Gradient Descent</button>
        <button class="sb-btn" onclick="ENGINE.newFSData()">🎲 New Data</button>
        <button class="sb-btn" onclick="ENGINE.resetFS()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('feature-scaling')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Raw Iters</span><span class="metric-val" id="fsRawIter">—</span></div>
      <div class="metric"><span class="metric-label">Scaled Iters</span><span class="metric-val" id="fsScaledIter">—</span></div>
      <div class="metric"><span class="metric-label">Speedup</span><span class="metric-val" id="fsSpeedup">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-feature-scaling" style="display:none;"></div>
    <div class="hint-panel" id="hints-feature-scaling"></div>
  `;
}


/* ── Build: Timeseries Forecasting ── */
function buildTimeseriesForecast() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Timeseries <em style="font-style:italic;color:#4fc3f7;">Forecasting</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Generate a time series with trend and seasonality. Apply Moving Average or Exponential Smoothing to forecast and compare error metrics.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="tsCanvas" height="380"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Method</label>
        <select id="tsMethod" class="sb-select" onchange="ENGINE.setTSMethod(this.value)">
          <option value="ma">Moving Average</option>
          <option value="es">Exponential Smoothing</option>
        </select>
      </div>
      <div class="ctrl-row" id="tsWindowRow">
        <label class="ctrl-label">Window</label>
        <input type="range" id="tsWindow" min="3" max="20" step="1" value="5">
        <span class="ctrl-val" id="tsWindowV">5</span>
      </div>
      <div class="ctrl-row" id="tsAlphaRow" style="display:none;">
        <label class="ctrl-label">Alpha (α)</label>
        <input type="range" id="tsAlpha" min="0.05" max="0.95" step="0.05" value="0.3">
        <span class="ctrl-val" id="tsAlphaV">0.30</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.forecastTS()">▶ Forecast</button>
        <button class="sb-btn" onclick="ENGINE.newTSData()">🎲 New Series</button>
        <button class="sb-btn" onclick="ENGINE.resetTS()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('timeseries-forecast')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">MAE</span><span class="metric-val" id="tsMAE">—</span></div>
      <div class="metric"><span class="metric-label">RMSE</span><span class="metric-val" id="tsRMSE">—</span></div>
      <div class="metric"><span class="metric-label">Points</span><span class="metric-val" id="tsPoints">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-timeseries-forecast" style="display:none;"></div>
    <div class="hint-panel" id="hints-timeseries-forecast"></div>
  `;
}
