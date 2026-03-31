/* ═══════════════════════════════════════════════════════════════
   ML Lab — Activities Data & Content Builder
   Interactive ML sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-ml-lab', title:'ML Lab', topics:['linear-regression','k-means','classification-boundary','neural-network','feature-scaling','timeseries-forecast','pca-visualizer','decision-tree','anomaly-detection'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'linear-regression':       'Linear Regression Playground',
  'k-means':                 'K-Means Clustering',
  'classification-boundary': 'Classification Boundary',
  'neural-network':          'Neural Network Builder',
  'feature-scaling':         'Feature Scaling Demo',
  'timeseries-forecast':     'Timeseries Forecasting',
  'pca-visualizer':          'PCA Visualization',
  'decision-tree':           'Decision Tree',
  'anomaly-detection':       'Anomaly Detection',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'linear-regression', num:'01', title:'Linear Regression Playground', category:'ML Lab', keywords:['regression','gradient descent','MSE','loss','slope','intercept','learning rate','fit','line','scatter'], content:'Place data points and watch gradient descent fit a line in real-time. Adjust learning rate and see how it affects convergence.' },
  { id:'k-means', num:'02', title:'K-Means Clustering', category:'ML Lab', keywords:['clustering','centroids','k-means','unsupervised','voronoi','iteration','convergence','elbow'], content:'Place points, choose K, and step through the K-Means algorithm — watch centroids move and clusters form.' },
  { id:'classification-boundary', num:'03', title:'Classification Boundary', category:'ML Lab', keywords:['classification','KNN','logistic regression','decision boundary','supervised','binary','classes'], content:'Place two classes of points and watch how KNN or Logistic Regression draws a decision boundary between them.' },
  { id:'neural-network', num:'04', title:'Neural Network Builder', category:'ML Lab', keywords:['neural network','deep learning','layers','neurons','activation','sigmoid','relu','backpropagation','XOR','spiral'], content:'Build a small neural network, pick a dataset, and watch it learn a decision boundary epoch by epoch.' },
  { id:'feature-scaling', num:'05', title:'Feature Scaling Demo', category:'ML Lab', keywords:['feature scaling','normalization','standardization','min-max','z-score','gradient descent','convergence'], content:'See how feature scaling transforms data and dramatically speeds up gradient descent convergence.' },
  { id:'timeseries-forecast', num:'06', title:'Timeseries Forecasting', category:'ML Lab', keywords:['timeseries','forecasting','moving average','exponential smoothing','holt-winters','ARIMA','autoregressive','seasonal naive','trend','seasonality','MAE','RMSE','MAPE','compare','projection','kalman filter','gaussian process','RNN','LSTM','neural network','deep learning'], content:'Generate time series with trend, seasonality, or random walks — forecast with 12 methods from naive baselines to LSTM, compare them all, and project into the future.' },
  { id:'pca-visualizer', num:'07', title:'PCA Visualization', category:'ML Lab', keywords:['PCA','principal component analysis','dimensionality reduction','eigenvector','eigenvalue','covariance','projection','variance'], content:'Plot 2D data, compute principal components, show eigenvectors and project data along the first principal component.' },
  { id:'decision-tree', num:'08', title:'Decision Tree', category:'ML Lab', keywords:['decision tree','classifier','gini impurity','split','depth','leaves','axis-aligned','regions'], content:'Build a simple decision tree classifier, visualize the splits on 2D data with colored regions.' },
  { id:'anomaly-detection', num:'09', title:'Anomaly Detection', category:'ML Lab', keywords:['anomaly','outlier','Gaussian','Mahalanobis','covariance','threshold','envelope','detection'], content:'Place normal and outlier points, fit a Gaussian envelope, see which points get flagged as anomalies.' },
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
    { id:'ts-hw',            trigger:'methodHW',         message:'Holt-Winters captures both trend and seasonality — three smoothing parameters working together.' },
    { id:'ts-ar',            trigger:'methodAR',         message:'AR(1) predicts each value from the previous one — works well for correlated series.' },
    { id:'ts-snaive',        trigger:'methodSNaive',     message:'Seasonal Naive repeats last season\'s values — a surprisingly strong baseline.' },
    { id:'ts-compare',       trigger:'comparedAll',      message:'The leaderboard ranks all methods — no single method wins on every data type!' },
    { id:'ts-stock',         trigger:'isStock',          message:'Stock prices follow geometric random walks — methods that assume stationarity often struggle here.' },
    { id:'ts-crash',         trigger:'isCrash',          message:'Crashes create regime changes — no smooth forecasting method can predict a sudden structural break.' },
    { id:'ts-kalman',        trigger:'methodKalman',      message:'The Kalman Filter estimates a hidden state from noisy observations — it adapts its gain as certainty grows.' },
    { id:'ts-gp',            trigger:'methodGP',          message:'Gaussian Process regression fits a flexible non-parametric curve — great for smooth patterns, expensive for long series.' },
    { id:'ts-rnn',           trigger:'methodRNN',         message:'A recurrent neural network learns sequential dependencies — the hidden state carries memory of past values.' },
    { id:'ts-lstm',          trigger:'methodLSTM',        message:'LSTM gates control what to remember and forget — designed to capture long-range dependencies that simple RNNs miss.' },
  ],
  'pca-visualizer': [
    { id:'pca-first-points', trigger:'pointCount>=3',    message:'Place at least 8 points in an elongated cluster to see clear principal components.' },
    { id:'pca-computed',     trigger:'computed',          message:'The blue arrow is PC1 (most variance). The green arrow is PC2 (remaining variance).' },
    { id:'pca-high-var',     trigger:'pc1Pct>=80',       message:'PC1 explains most of the variance — the data has a strong dominant direction.' },
    { id:'pca-projected',    trigger:'showProjection',   message:'Red dots show each point projected onto PC1 — dimensionality reduction in action.' },
    { id:'pca-equal',        trigger:'pc1Pct<60',        message:'Variance is spread across both components — the data has no dominant direction.' },
  ],
  'decision-tree': [
    { id:'dt-first-points',  trigger:'pointCount>=3',    message:'Place points for both classes — toggle the class button and click on the canvas.' },
    { id:'dt-trained',       trigger:'trained',          message:'Dashed lines show axis-aligned splits. Each colored region is a leaf prediction.' },
    { id:'dt-deep',          trigger:'depth>=3',         message:'Deeper trees fit training data well but risk overfitting — watch for tiny regions.' },
    { id:'dt-shallow',       trigger:'depth==1',         message:'A depth-1 tree (decision stump) makes only one split — very simple but limited.' },
    { id:'dt-perfect',       trigger:'accuracy==100',    message:'100% training accuracy — the tree memorized the data. This may not generalize well.' },
  ],
  'anomaly-detection': [
    { id:'ad-first-points',  trigger:'pointCount>=5',    message:'Place normal points and outliers using the toggle button, then click on the canvas.' },
    { id:'ad-detected',      trigger:'detected',         message:'Red rings mark flagged anomalies. Points far from the mean in Mahalanobis distance are flagged.' },
    { id:'ad-high-thresh',   trigger:'threshHigh',       message:'A higher threshold percentile flags fewer points — only the most extreme outliers.' },
    { id:'ad-low-thresh',    trigger:'threshLow',        message:'A lower threshold flags more points — sensitive detection but more false positives.' },
    { id:'ad-contours',      trigger:'detected',         message:'Elliptical contours show equal-distance regions from the Gaussian center.' },
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
    { id:'ts-c3', title:'Method Master',    objective:'Compare all methods on one dataset',                    checkFn:'comparedAll' },
    { id:'ts-c4', title:'Crystal Ball',     objective:'Project 20+ steps into the future with MAPE < 15%',    checkFn:'mape<15&&horizon>=20' },
  ],
  'pca-visualizer': [
    { id:'pca-c1', title:'Dominant Direction', objective:'Create a dataset where PC1 explains > 90% of variance', checkFn:'pc1Pct>90&&computed' },
    { id:'pca-c2', title:'Even Split',         objective:'Create a dataset where both PCs explain ~50% each',    checkFn:'pc1Pct<60&&pc1Pct>40&&computed' },
  ],
  'decision-tree': [
    { id:'dt-c1', title:'Perfect Split',   objective:'Achieve 100% training accuracy with max depth 2',      checkFn:'accuracy==100&&depth<=2' },
    { id:'dt-c2', title:'Stump Power',      objective:'Get 90%+ accuracy using only a depth-1 tree',         checkFn:'accuracy>=90&&depth==1' },
  ],
  'anomaly-detection': [
    { id:'ad-c1', title:'Sharp Eye',       objective:'Flag all outliers with 0 false positives',              checkFn:'allOutliersFound&&noFalsePos' },
    { id:'ad-c2', title:'Tight Envelope',   objective:'Detect 80%+ of outliers with threshold ≥ 95',         checkFn:'detectedPct>=80&&threshold>=95' },
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
    } else if (id === 'pca-visualizer') {
      div.innerHTML = buildPcaVisualizer();
    } else if (id === 'decision-tree') {
      div.innerHTML = buildDecisionTree();
    } else if (id === 'anomaly-detection') {
      div.innerHTML = buildAnomalyDetection();
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

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Linear Regression &amp; Gradient Descent</h3>
      <p>Linear regression fits a straight line <strong>y = mx + b</strong> through scattered data by finding the slope (m) and intercept (b) that minimise the total squared error. Gradient descent iteratively adjusts m and b in the direction that reduces error fastest — the learning rate controls step size.</p>
      <div class="exp-formula">MSE = (1 / n) &Sigma; (y&#x1D62; &minus; &#x0177;&#x1D62;)&sup2;</div>
      <p>When MSE stops falling, the line has converged. A low learning rate converges slowly but steadily; a high rate may overshoot and diverge.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The line rotates and shifts each iteration — watch gradient descent walk downhill on the error surface.</li>
        <li>A high learning rate may overshoot and cause the line to jump erratically.</li>
        <li>Adding noise increases MSE — the line compromises between all data points.</li>
        <li>Slope captures the trend direction; intercept is where the line crosses y = 0.</li>
      </ul>
    </details>
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

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>K-Means Clustering</h3>
      <p>K-Means partitions data into K groups by repeatedly (1) assigning each point to the nearest centroid and (2) moving each centroid to the mean of its assigned points. The algorithm converges when assignments stop changing.</p>
      <div class="exp-formula">argmin &Sigma; &Sigma; ||x&#x1D62; &minus; &mu;&#x2096;||&sup2;</div>
      <p>Choosing K is part of the art — too few clusters merge distinct groups, too many fragment natural clusters. The inertia metric drops as K increases; look for an elbow.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Centroids migrate toward cluster centres with each step — watch the Voronoi regions reshape.</li>
        <li>Higher K values split data into finer groups — but can over-segment.</li>
        <li>Inertia (total within-cluster distance) decreases with each iteration and with higher K.</li>
        <li>Initial centroid placement matters — different starts can give different results.</li>
      </ul>
    </details>
  `;
}

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

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Classification &amp; Decision Boundaries</h3>
      <p>A classifier learns a boundary that separates classes in feature space. <strong>KNN</strong> assigns a point to the majority class among its K nearest neighbours — producing flexible, locally-adaptive boundaries. <strong>Logistic regression</strong> fits a linear boundary using the sigmoid function.</p>
      <div class="exp-formula">KNN: class(x) = majority vote of K nearest neighbours</div>
      <p>K controls the smoothness of the KNN boundary — low K is sensitive to noise, high K smooths the decision region but may under-fit.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Low K (1–3) creates jagged, data-hugging boundaries; high K produces smoother regions.</li>
        <li>Logistic regression draws a single straight line — it cannot capture nonlinear patterns.</li>
        <li>Accuracy rises when classes are well-separated and falls when they overlap.</li>
        <li>Adding points near the boundary zone is where most classification errors occur.</li>
      </ul>
    </details>
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

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Neural Networks &amp; Backpropagation</h3>
      <p>A neural network chains layers of neurons, each computing <strong>z = &sigma;(Wx + b)</strong>. The activation function (&sigma;) introduces nonlinearity, letting the network learn curved decision boundaries that a single line cannot capture.</p>
      <div class="exp-formula">Loss = &minus;(1/n) &Sigma; [ y log(&#x0177;) + (1&minus;y) log(1&minus;&#x0177;) ]</div>
      <p>Backpropagation computes the gradient of the loss with respect to every weight, then gradient descent updates them. More hidden neurons increase capacity but risk over-fitting on small datasets.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The decision boundary starts random and progressively carves the correct regions as epochs increase.</li>
        <li>The loss curve should drop smoothly — plateaus indicate a learning-rate or capacity issue.</li>
        <li>ReLU learns sharp boundaries; Sigmoid and Tanh produce smoother, rounder regions.</li>
        <li>XOR and Spiral datasets require hidden neurons — a single layer cannot solve them.</li>
      </ul>
    </details>
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

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Feature Scaling &amp; Normalisation</h3>
      <p>When features have very different ranges, gradient descent zig-zags because the loss surface is elongated. Scaling brings all features into a comparable range and rounds the contours, so the optimiser converges in far fewer steps.</p>
      <div class="exp-formula">Min-Max: x' = (x &minus; min) / (max &minus; min) &emsp;|&emsp; Z-Score: x' = (x &minus; &mu;) / &sigma;</div>
      <p><strong>Min-Max</strong> maps to [0, 1]. <strong>Z-Score</strong> centres on 0 with unit variance. <strong>Robust</strong> scaling uses the median and IQR, making it resistant to outliers.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The left canvas shows raw data; the right shows the same data after scaling — compare the axis ranges.</li>
        <li>Gradient descent on scaled data converges in a fraction of the iterations.</li>
        <li>The speedup factor shows how many times faster scaling makes optimisation.</li>
        <li>Robust scaling holds up when extreme outliers are present in the data.</li>
      </ul>
    </details>
  `;
}


/* ── Build: Timeseries Forecasting ── */
function buildTimeseriesForecast() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Timeseries <em style="font-style:italic;color:#4fc3f7;">Forecasting</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Generate different time series patterns, forecast with 8 methods, compare them all, and project into the future.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="tsCanvas" height="420"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Data Type</label>
        <select id="tsDataType" class="sb-select" onchange="ENGINE.setTSDataType(this.value)">
          <option value="trend-season">Trend + Seasonal</option>
          <option value="trend-only">Trend Only</option>
          <option value="seasonal-only">Seasonal Only</option>
          <option value="random-walk">Random Walk</option>
          <option value="noisy-plateau">Noisy Plateau</option>
          <option value="stock-bull">📈 Stock — Bull Run</option>
          <option value="stock-volatile">📉 Stock — Volatile</option>
          <option value="stock-crash">💥 Stock — Crash & Recovery</option>
          <option value="stock-sideways">↔ Stock — Sideways Channel</option>
        </select>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Method</label>
        <select id="tsMethod" class="sb-select" onchange="ENGINE.setTSMethod(this.value)">
          <option value="ma">Moving Average</option>
          <option value="wma">Weighted Moving Average</option>
          <option value="es">Exponential Smoothing</option>
          <option value="holt">Holt's Linear Trend</option>
          <option value="hw">Holt-Winters (Seasonal)</option>
          <option value="ar">AR(1) Autoregressive</option>
          <option value="snaive">Seasonal Naive</option>
          <option value="linear">Linear Trend</option>
          <option value="kalman">Kalman Filter</option>
          <option value="gp">Gaussian Process</option>
          <option value="rnn">Simple RNN</option>
          <option value="lstm">LSTM</option>
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
      <div class="ctrl-row" id="tsBetaRow" style="display:none;">
        <label class="ctrl-label">Beta (β)</label>
        <input type="range" id="tsBeta" min="0.01" max="0.5" step="0.01" value="0.1">
        <span class="ctrl-val" id="tsBetaV">0.10</span>
      </div>
      <div class="ctrl-row" id="tsGammaRow" style="display:none;">
        <label class="ctrl-label">Gamma (γ)</label>
        <input type="range" id="tsGamma" min="0.01" max="0.5" step="0.01" value="0.1">
        <span class="ctrl-val" id="tsGammaV">0.10</span>
      </div>
      <div class="ctrl-row" id="tsSeasonRow" style="display:none;">
        <label class="ctrl-label">Season Length</label>
        <input type="range" id="tsSeason" min="4" max="24" step="1" value="12">
        <span class="ctrl-val" id="tsSeasonV">12</span>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Horizon (future)</label>
        <input type="range" id="tsHorizon" min="0" max="30" step="1" value="0">
        <span class="ctrl-val" id="tsHorizonV">0</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.forecastTS()">▶ Forecast</button>
        <button class="sb-btn" onclick="ENGINE.compareAllTS()">⚡ Compare All</button>
        <button class="sb-btn" onclick="ENGINE.newTSData()">🎲 New Series</button>
        <button class="sb-btn" onclick="ENGINE.resetTS()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('timeseries-forecast')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">MAE</span><span class="metric-val" id="tsMAE">—</span></div>
      <div class="metric"><span class="metric-label">RMSE</span><span class="metric-val" id="tsRMSE">—</span></div>
      <div class="metric"><span class="metric-label">MAPE</span><span class="metric-val" id="tsMAPE">—</span></div>
      <div class="metric"><span class="metric-label">Points</span><span class="metric-val" id="tsPoints">—</span></div>
    </div>

    <div id="tsLeaderboard" style="display:none;margin-top:16px;">
      <div style="font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">⚡ Method Comparison</div>
      <table id="tsLeaderTable" style="width:100%;font-family:var(--mono);font-size:12px;border-collapse:collapse;">
        <thead><tr style="color:var(--muted);border-bottom:1px solid var(--border);">
          <th style="text-align:left;padding:4px 8px;">Rank</th>
          <th style="text-align:left;padding:4px 8px;">Method</th>
          <th style="text-align:right;padding:4px 8px;">MAE</th>
          <th style="text-align:right;padding:4px 8px;">RMSE</th>
          <th style="text-align:right;padding:4px 8px;">MAPE</th>
        </tr></thead>
        <tbody id="tsLeaderBody"></tbody>
      </table>
    </div>

    <div class="challenge-panel" id="challenge-timeseries-forecast" style="display:none;"></div>
    <div class="hint-panel" id="hints-timeseries-forecast"></div>

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Time-Series Forecasting Methods</h3>
      <p>A time series is a sequence of values ordered by time. Forecasting methods exploit patterns — <strong>trend</strong> (long-term direction), <strong>seasonality</strong> (repeating cycles), and <strong>noise</strong> (random variation) — to project future values.</p>
      <div class="exp-formula">MAE = (1/n) &Sigma; |y&#x1D62; &minus; &#x0177;&#x1D62;| &emsp;|&emsp; RMSE = &radic;[(1/n) &Sigma; (y&#x1D62; &minus; &#x0177;&#x1D62;)&sup2;]</div>
      <p>Simple methods (Moving Average, Exponential Smoothing) are fast and interpretable. Holt adds trend; Holt-Winters adds seasonality. Advanced methods (Kalman, GP, RNN, LSTM) model nonlinear dynamics. Compare All ranks every method on the same data.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Moving Average lags behind sudden changes — the window parameter controls how much.</li>
        <li>Holt-Winters excels on data with both trend and seasonal components.</li>
        <li>MAPE gives a percentage error that is easy to interpret across different data scales.</li>
        <li>The leaderboard reveals which methods suit which data patterns — no single method wins everywhere.</li>
      </ul>
    </details>
  `;
}


/* ── Build: PCA Visualization ── */
function buildPcaVisualizer() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">PCA <em style="font-style:italic;color:#4fc3f7;">Visualization</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Click to place 2D data points. Hit <strong>Compute PCA</strong> to find principal components — eigenvectors show the directions of maximum variance.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="pcaCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.computePCA()">▶ Compute PCA</button>
        <button class="sb-btn" onclick="ENGINE.toggleProjection()">📐 Toggle Projection</button>
        <button class="sb-btn" onclick="ENGINE.samplePCA()">🎲 Sample Data</button>
        <button class="sb-btn" onclick="ENGINE.resetPCA()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('pca-visualizer')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">PC1 Var %</span><span class="metric-val" id="pcaPC1">—</span></div>
      <div class="metric"><span class="metric-label">PC2 Var %</span><span class="metric-val" id="pcaPC2">—</span></div>
      <div class="metric"><span class="metric-label">Total Var</span><span class="metric-val" id="pcaTotalVar">—</span></div>
      <div class="metric"><span class="metric-label">Points</span><span class="metric-val" id="pcaCount">0</span></div>
    </div>

    <div class="challenge-panel" id="challenge-pca-visualizer" style="display:none;"></div>
    <div class="hint-panel" id="hints-pca-visualizer"></div>

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Principal Component Analysis</h3>
      <p>PCA finds the directions (eigenvectors) along which your data varies the most. The first principal component captures the most variance; the second captures the most remaining variance orthogonal to the first. Projecting data onto these axes reduces dimensionality while preserving structure.</p>
      <div class="exp-formula">Cov(X) v = &lambda; v &emsp;&mdash;&emsp; &lambda; = variance explained by eigenvector v</div>
      <p>If PC1 captures 95% of the variance, the data is essentially one-dimensional — the other dimension is mostly noise.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The eigenvector arrows point along the directions of maximum spread in the data.</li>
        <li>A long, narrow point cloud puts nearly all variance in PC1.</li>
        <li>Toggling projection collapses points onto the principal axis — see how much information is kept.</li>
        <li>Circular data splits variance equally between PC1 and PC2 — no dimension reduction is possible.</li>
      </ul>
    </details>
  `;
}


/* ── Build: Decision Tree ── */
function buildDecisionTree() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Decision <em style="font-style:italic;color:#4fc3f7;">Tree</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Toggle class below, then click to place points. Train to see axis-aligned decision splits.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="dtCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Place as</label>
        <button class="sb-btn" id="dtClassToggle" onclick="ENGINE.toggleDTClass()" style="min-width:120px;">🔵 Class A</button>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Max Depth</label>
        <input type="range" id="dtDepth" min="1" max="4" step="1" value="2">
        <span class="ctrl-val" id="dtDepthV">2</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.trainDT()">▶ Train</button>
        <button class="sb-btn" onclick="ENGINE.sampleDT()">🎲 Sample Data</button>
        <button class="sb-btn" onclick="ENGINE.resetDT()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('decision-tree')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Depth</span><span class="metric-val" id="dtDepthM">—</span></div>
      <div class="metric"><span class="metric-label">Leaves</span><span class="metric-val" id="dtLeaves">—</span></div>
      <div class="metric"><span class="metric-label">Accuracy</span><span class="metric-val" id="dtAccuracy">—</span></div>
      <div class="metric"><span class="metric-label">Gini</span><span class="metric-val" id="dtGini">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-decision-tree" style="display:none;"></div>
    <div class="hint-panel" id="hints-decision-tree"></div>

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Decision Trees &amp; Gini Impurity</h3>
      <p>A decision tree recursively splits the feature space with axis-aligned cuts. At each node it picks the feature and threshold that best separate the classes, measured by <strong>Gini impurity</strong> — a value of 0 means a perfectly pure node.</p>
      <div class="exp-formula">Gini = 1 &minus; &Sigma; p&#x1D62;&sup2;</div>
      <p>Deeper trees can model complex boundaries but risk over-fitting to noise. Limiting max depth acts as regularisation — the tree generalises better on unseen data.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Each split adds a horizontal or vertical line, carving the plane into rectangles.</li>
        <li>Depth 1 gives a single split; depth 4 can create intricate rectangular regions.</li>
        <li>Accuracy rises with depth but may capture noise rather than the true boundary.</li>
        <li>Gini drops toward 0 as leaves become purer — perfectly classified data has Gini = 0.</li>
      </ul>
    </details>
  `;
}


/* ── Build: Anomaly Detection ── */
function buildAnomalyDetection() {
  return `
    <h2 style="font-family:var(--serif);font-size:clamp(24px,4vw,36px);font-weight:400;margin-bottom:8px;">Anomaly <em style="font-style:italic;color:#4fc3f7;">Detection</em></h2>
    <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:24px;line-height:1.6;">
      Toggle point type below, then click to place. Hit Detect to fit a Gaussian envelope and flag anomalies.
    </p>

    <div class="sandbox-canvas-wrap">
      <canvas id="adCanvas" height="400" style="cursor:crosshair;"></canvas>
    </div>

    <div class="sandbox-controls">
      <div class="ctrl-row">
        <label class="ctrl-label">Place as</label>
        <button class="sb-btn" id="adTypeToggle" onclick="ENGINE.toggleADType()" style="min-width:120px;">🔵 Normal</button>
      </div>
      <div class="ctrl-row">
        <label class="ctrl-label">Threshold (percentile)</label>
        <input type="range" id="adThresh" min="90" max="99" step="1" value="95">
        <span class="ctrl-val" id="adThreshV">95</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.detectAD()">▶ Detect</button>
        <button class="sb-btn" onclick="ENGINE.sampleAD()">🎲 Sample Data</button>
        <button class="sb-btn" onclick="ENGINE.resetAD()">↺ Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenge('anomaly-detection')">🎯 Challenges</button>
      </div>
    </div>

    <div class="sandbox-metrics">
      <div class="metric"><span class="metric-label">Flagged</span><span class="metric-val" id="adFlagged">—</span></div>
      <div class="metric"><span class="metric-label">Threshold</span><span class="metric-val" id="adThreshM">—</span></div>
      <div class="metric"><span class="metric-label">Mean</span><span class="metric-val" id="adMean">—</span></div>
      <div class="metric"><span class="metric-label">Detected %</span><span class="metric-val" id="adDetPct">—</span></div>
    </div>

    <div class="challenge-panel" id="challenge-anomaly-detection" style="display:none;"></div>
    <div class="hint-panel" id="hints-anomaly-detection"></div>

    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Gaussian Anomaly Detection</h3>
      <p>This method fits a multivariate Gaussian to the normal data, estimating the mean (&mu;) and covariance (&Sigma;). Points falling in the low-probability tail — below a chosen percentile threshold — are flagged as anomalies.</p>
      <div class="exp-formula">p(x) = N(x | &mu;, &Sigma;) &emsp;&mdash;&emsp; flag if p(x) &lt; &epsilon;</div>
      <p>The ellipse on the canvas visualises the probability contour at the threshold. Points outside the ellipse are considered anomalous. A higher percentile threshold makes detection stricter (fewer flags).</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The ellipse expands or contracts as you adjust the threshold percentile.</li>
        <li>Tightly clustered normal data produces a small ellipse — outliers are easy to spot.</li>
        <li>Spread-out normal data creates a larger envelope — anomalies must be further from the centre.</li>
        <li>The detected-percentage metric shows what fraction of all points falls outside the threshold.</li>
      </ul>
    </details>
  `;
}
