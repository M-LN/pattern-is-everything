/* ═══════════════════════════════════════════════════════════════
   ML Math — Topics Data & Content Builder
   38 topics organized into 7 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-foundations', title:'Foundations', topics:['home','vectors','linear','logistic','gradient','activation','bias-variance'] },
  { id:'sec-training', title:'Training', topics:['loss','backprop','optimizers','regularization','batchnorm','lr-schedule','weight-init','grad-clip'] },
  { id:'sec-core', title:'Core Math', topics:['softmax','mle','entropy','kl-div','bayes','crossval','metrics','cosine-sim'] },
  { id:'sec-deep', title:'Deep Learning', topics:['cnn','embeddings','attention','transformer','normalization'] },
  { id:'sec-sequence', title:'Sequence Models', topics:['rnn','lstm','gru'] },
  { id:'sec-generative', title:'Generative & Prob.', topics:['pca','svd','vae','diffusion','gan'] },
  { id:'sec-modern', title:'Modern / LLM', topics:['tokenization','lora','rlhf'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  vectors:'Vectors & Matrices',
  linear:'Linear Regression',
  logistic:'Logistic Regression',
  gradient:'Gradient Descent',
  activation:'Activation Functions',
  'bias-variance':'Bias-Variance Tradeoff',
  loss:'Loss Functions',
  backprop:'Backpropagation',
  optimizers:'Optimizers',
  regularization:'Regularization',
  batchnorm:'Batch Normalization',
  'lr-schedule':'LR Scheduling',
  'weight-init':'Weight Initialization',
  'grad-clip':'Gradient Clipping',
  softmax:'Softmax',
  mle:'MLE & Gaussian',
  entropy:'Entropy',
  'kl-div':'KL Divergence',
  bayes:"Bayes' Theorem",
  crossval:'Cross-Validation',
  metrics:'Eval Metrics',
  'cosine-sim':'Cosine Similarity',
  cnn:'CNN',
  embeddings:'Embeddings',
  attention:'Attention',
  transformer:'Transformer',
  normalization:'Normalization Variants',
  rnn:'RNN',
  lstm:'LSTM',
  gru:'GRU',
  pca:'PCA',
  svd:'SVD',
  vae:'VAE',
  diffusion:'Diffusion Models',
  gan:'GANs',
  tokenization:'Tokenization (BPE)',
  lora:'LoRA',
  rlhf:'RLHF',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'vectors', num:'01', title:'Vectors & Matrices', category:'Foundations', keywords:['dot product','matrix multiplication','transpose','linear algebra','eigenvector','rank','determinant','inverse'], content:'The language of ML — dot products, matrix multiplication, transpose, and the operations every model relies on.' },
  { id:'linear', num:'02', title:'Linear Regression', category:'Foundations', keywords:['MSE','OLS','weight','bias','least squares','slope','intercept','prediction'], content:'Fitting a line through data — the simplest predictive model using weights and bias to minimize MSE.' },
  { id:'logistic', num:'03', title:'Logistic Regression', category:'Foundations', keywords:['sigmoid','binary classification','decision boundary','log odds','logit'], content:'The bridge between linear regression and neural nets — sigmoid output for binary classification.' },
  { id:'gradient', num:'04', title:'Gradient Descent', category:'Foundations', keywords:['SGD','stochastic','mini-batch','learning rate','convergence','optimization','loss landscape'], content:'Rolling downhill on the loss landscape to find optimal weights using gradient updates.' },
  { id:'activation', num:'05', title:'Activation Functions', category:'Foundations', keywords:['sigmoid','relu','tanh','gelu','silu','swish','non-linearity','dead neuron'], content:'What makes deep networks more than stacked linear transforms — ReLU, GELU, SiLU, and more.' },
  { id:'bias-variance', num:'06', title:'Bias-Variance Tradeoff', category:'Foundations', keywords:['underfitting','overfitting','generalization','complexity','U-curve','noise'], content:'The fundamental tension between underfitting and overfitting in model complexity.' },
  { id:'loss', num:'07', title:'Loss Functions', category:'Training', keywords:['MSE','MAE','cross-entropy','BCE','Huber','hinge','focal'], content:'Measuring how wrong the model is — MSE, MAE, Cross-Entropy, and when to use each.' },
  { id:'backprop', num:'08', title:'Backpropagation', category:'Training', keywords:['chain rule','gradient','backward pass','computational graph','automatic differentiation'], content:'Chain rule applied through a network — how every weight gets its gradient.' },
  { id:'optimizers', num:'09', title:'Optimizers', category:'Training', keywords:['adam','adamw','sgd','momentum','rmsprop','adagrad','adaptive learning rate'], content:'Beyond vanilla SGD — momentum, adaptive learning rates, Adam, and AdamW.' },
  { id:'regularization', num:'10', title:'Regularization', category:'Training', keywords:['L1','L2','lasso','ridge','dropout','weight decay','elastic net','early stopping'], content:'Preventing overfitting by constraining model complexity — L1, L2, Dropout.' },
  { id:'batchnorm', num:'11', title:'Batch Normalization', category:'Training', keywords:['batch norm','layer norm','normalization','internal covariate shift','gamma','beta'], content:'Normalizing activations to keep training stable and fast across layers.' },
  { id:'lr-schedule', num:'12', title:'LR Scheduling', category:'Training', keywords:['cosine decay','warmup','cyclic','step decay','one cycle','annealing'], content:'Adjusting the learning rate over training for better convergence.' },
  { id:'weight-init', num:'13', title:'Weight Initialization', category:'Training', keywords:['xavier','glorot','he','kaiming','initialization','variance','fan-in','fan-out'], content:'How you initialize weights determines if training starts well or collapses immediately.' },
  { id:'grad-clip', num:'14', title:'Gradient Clipping', category:'Training', keywords:['gradient explosion','clip norm','clip value','max norm','gradient scaling'], content:'Preventing exploding gradients by capping gradient magnitude during training.' },
  { id:'softmax', num:'15', title:'Softmax', category:'Core Math', keywords:['probability','temperature','logits','classification','distribution','normalize'], content:'Converting raw scores into a probability distribution that sums to 1.' },
  { id:'mle', num:'16', title:'MLE & Gaussian', category:'Core Math', keywords:['maximum likelihood','gaussian','normal distribution','log-likelihood','parameter estimation'], content:'Maximum Likelihood Estimation — why MSE and Cross-Entropy exist.' },
  { id:'entropy', num:'17', title:'Entropy', category:'Core Math', keywords:['information','bits','shannon entropy','cross-entropy','surprise','uncertainty'], content:'Measuring uncertainty in a distribution — the foundation of information theory.' },
  { id:'kl-div', num:'18', title:'KL Divergence', category:'Core Math', keywords:['relative entropy','distribution distance','forward KL','reverse KL','ELBO','variational'], content:'Measuring how different two probability distributions are.' },
  { id:'bayes', num:'19', title:"Bayes' Theorem", category:'Core Math', keywords:['posterior','prior','likelihood','evidence','conditional probability','base rate'], content:'Updating beliefs with evidence — the foundation of probabilistic ML.' },
  { id:'crossval', num:'20', title:'Cross-Validation', category:'Core Math', keywords:['k-fold','train test split','validation','generalization','stratified','LOOCV'], content:'Reliable model evaluation by rotating which data is used for testing.' },
  { id:'metrics', num:'21', title:'Eval Metrics', category:'Core Math', keywords:['precision','recall','F1','accuracy','ROC','AUC','confusion matrix','TP','FP','FN'], content:'How to actually measure if your model is good — Precision, Recall, F1, ROC-AUC.' },
  { id:'cosine-sim', num:'22', title:'Cosine Similarity', category:'Core Math', keywords:['similarity','dot product','angle','embedding distance','vector space','retrieval'], content:'Measuring how similar two vectors are by the angle between them.' },
  { id:'cnn', num:'23', title:'CNN', category:'Deep Learning', keywords:['convolution','kernel','filter','stride','padding','pooling','feature map','translational'], content:'Exploiting spatial structure with shared local filters — convolutions and pooling.' },
  { id:'embeddings', num:'24', title:'Embeddings', category:'Deep Learning', keywords:['word2vec','skip-gram','embedding layer','dense vector','semantic','representation'], content:'Mapping discrete tokens to continuous vector spaces where similarity = proximity.' },
  { id:'attention', num:'25', title:'Attention', category:'Deep Learning', keywords:['self-attention','multi-head','query','key','value','scaled dot-product','QKV'], content:'Selectively focusing on relevant parts of the input with learned attention weights.' },
  { id:'transformer', num:'26', title:'Transformer', category:'Deep Learning', keywords:['encoder','decoder','positional encoding','feed-forward','residual','layer norm','BERT','GPT'], content:'The architecture behind BERT, GPT, and all modern LLMs.' },
  { id:'normalization', num:'27', title:'Normalization Variants', category:'Deep Learning', keywords:['layer norm','RMSNorm','group norm','instance norm','LLaMA','transformer'], content:'LayerNorm, RMSNorm, GroupNorm — which normalization for which architecture.' },
  { id:'rnn', num:'28', title:'RNN', category:'Sequence Models', keywords:['recurrent','hidden state','sequence','time step','BPTT','vanishing gradient'], content:'Processing sequences by passing hidden state through time.' },
  { id:'lstm', num:'29', title:'LSTM', category:'Sequence Models', keywords:['long short-term memory','forget gate','input gate','output gate','cell state','gated'], content:'Gated memory cells that solve the vanishing gradient problem.' },
  { id:'gru', num:'30', title:'GRU', category:'Sequence Models', keywords:['gated recurrent unit','update gate','reset gate','simplified LSTM'], content:'LSTMs streamlined sibling — two gates, one state vector.' },
  { id:'pca', num:'31', title:'PCA', category:'Generative & Prob.', keywords:['principal component','eigenvector','eigenvalue','covariance','dimensionality reduction','variance'], content:'Finding the directions of maximum variance for dimensionality reduction.' },
  { id:'svd', num:'32', title:'SVD', category:'Generative & Prob.', keywords:['singular value decomposition','matrix factorization','low rank','recommender','compression'], content:'Decomposing any matrix into rotation, scaling, and rotation — used everywhere.' },
  { id:'vae', num:'33', title:'VAE', category:'Generative & Prob.', keywords:['variational autoencoder','ELBO','reparameterization','latent space','encoder decoder','KL'], content:'Learning a structured latent space for generation and interpolation.' },
  { id:'diffusion', num:'34', title:'Diffusion Models', category:'Generative & Prob.', keywords:['DDPM','DDIM','noise schedule','denoising','stable diffusion','score matching'], content:'Generating by learning to reverse a noise process — DDPM, Stable Diffusion.' },
  { id:'gan', num:'35', title:'GANs', category:'Generative & Prob.', keywords:['generator','discriminator','minimax','mode collapse','wasserstein','adversarial'], content:'Two networks competing: generator vs discriminator in a minimax game.' },
  { id:'tokenization', num:'36', title:'Tokenization (BPE)', category:'Modern / LLM', keywords:['byte pair encoding','subword','vocabulary','merge','token','sentencepiece','tiktoken'], content:'How text becomes numbers — Byte Pair Encoding and subword tokenization.' },
  { id:'lora', num:'37', title:'LoRA', category:'Modern / LLM', keywords:['low rank adaptation','fine-tuning','parameter efficient','adapter','rank','frozen weights'], content:'Training large models with tiny updates — low-rank adaptation for efficient fine-tuning.' },
  { id:'rlhf', num:'38', title:'RLHF', category:'Modern / LLM', keywords:['reinforcement learning','human feedback','reward model','PPO','DPO','alignment','preference'], content:'Aligning language models with human preferences via reward modeling.' },
];

/* ═══════════════════════════════════════════════════════════════
   NAV BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  // Keep progress bar
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

/* ═══════════════════════════════════════════════════════════════
   CONTENT BUILDER — generates all topic HTML
   ═══════════════════════════════════════════════════════════════ */
function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome() + buildVectors() + buildLinear() + buildLogistic() + buildGradient()
    + buildActivation() + buildBiasVariance() + buildLoss() + buildBackprop() + buildOptimizers()
    + buildRegularization() + buildBatchnorm() + buildLRSchedule() + buildWeightInit() + buildGradClip()
    + buildSoftmax() + buildMLE() + buildEntropy() + buildKLDiv() + buildBayes()
    + buildCrossval() + buildMetrics() + buildCosineSim() + buildCNN() + buildEmbeddings()
    + buildAttention() + buildTransformer() + buildNormalization() + buildRNN() + buildLSTM()
    + buildGRU() + buildPCA() + buildSVD() + buildVAE() + buildDiffusion() + buildGAN()
    + buildTokenization() + buildLoRA() + buildRLHF();
}

/* ── Home ── */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>The <em>Mathematics</em><br>of Machine Learning</h2>
    <p style="margin-top:14px">A complete interactive reference covering 38 topics — from linear
    algebra to RLHF. Every topic features the core math, visual intuition, and PyTorch code.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> arrow keys to navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-foundations','vectors')">
      <div class="cat-card-icon">📐</div>
      <div class="cat-card-name">Foundations</div>
      <div class="cat-card-count">6 topics · Vectors, regression, gradients, activations</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-training','loss')">
      <div class="cat-card-icon">⚙️</div>
      <div class="cat-card-name">Training</div>
      <div class="cat-card-count">8 topics · Loss, optimizers, regularization, init</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-core','softmax')">
      <div class="cat-card-icon">∑</div>
      <div class="cat-card-name">Core Math</div>
      <div class="cat-card-count">8 topics · Probability, statistics, similarity</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-deep','cnn')">
      <div class="cat-card-icon">🧠</div>
      <div class="cat-card-name">Deep Learning</div>
      <div class="cat-card-count">5 topics · CNNs, attention, transformers</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-sequence','rnn')">
      <div class="cat-card-icon">⏱</div>
      <div class="cat-card-name">Sequence Models</div>
      <div class="cat-card-count">3 topics · RNN, LSTM, GRU</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-generative','pca')">
      <div class="cat-card-icon">🎨</div>
      <div class="cat-card-name">Generative & Prob.</div>
      <div class="cat-card-count">5 topics · PCA, SVD, VAE, Diffusion, GANs</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-modern','tokenization')">
      <div class="cat-card-icon">🚀</div>
      <div class="cat-card-name">Modern / LLM</div>
      <div class="cat-card-count">3 topics · BPE, LoRA, RLHF</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Vectors & Matrices */
function buildVectors() {
  return `<div class="topic" id="vectors">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Foundations</div><h2>Vectors & <em>Matrices</em></h2></div>
    <span class="topic-badge">Linear Algebra</span>
  </div>
  <p class="sub">// The language of ML — every model is matrix multiplication under the hood</p>
  <p class="prose">Machine learning is built on <strong>linear algebra</strong>. Inputs are vectors, weights are matrices, and the forward pass is matrix multiplication. Understanding dot products, shapes, and transposes is non-negotiable.</p>
  <div class="fb"><div class="fm">a · b = Σᵢ aᵢbᵢ = |a||b|cos(θ)</div><div class="fd"><span>Dot product</span> = sum of element-wise products = measures alignment between vectors</div></div>
  <div class="fb c2"><div class="fm">C = A × B &nbsp;&nbsp; Cᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ</div><div class="fd"><span>Matrix multiply:</span> A is (m×k), B is (k×n) → C is (m×n). Inner dimensions must match.</div></div>
  <div class="fb c3"><div class="fm">(AB)ᵀ = BᵀAᵀ &nbsp;&nbsp; (A⁻¹)⁻¹ = A</div><div class="fd"><span>Transpose</span> reverses multiplication order. Only square, full-rank matrices are invertible.</div></div>
  <div class="va">
    <div class="vl">// Interactive 2D vectors — drag to change, see dot product</div>
    <canvas id="vecCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Vector A angle</span><input type="range" id="vecA" min="0" max="360" step="1" value="30"><span class="vd" id="vecAv">30°</span></div>
      <div class="cg"><span class="cl">Vector B angle</span><input type="range" id="vecB" min="0" max="360" step="1" value="80"><span class="vd" id="vecBv">80°</span></div>
      <div class="cg"><span class="cl">Dot Product</span><span class="vd" id="vecDot" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Operation</th><th>Shape</th><th>Usage</th></tr></thead>
    <tbody>
      <tr><td>Dot product a·b</td><td>(n,)·(n,)→scalar</td><td>Similarity, projections</td></tr>
      <tr><td>Matrix-vector Ax</td><td>(m,n)·(n,)→(m,)</td><td>Linear layer (no batch)</td></tr>
      <tr><td>Matrix multiply AB</td><td>(m,k)·(k,n)→(m,n)</td><td>Batched forward passes</td></tr>
      <tr><td>Hadamard A⊙B</td><td>(m,n)⊙(m,n)→(m,n)</td><td>Gating (LSTM, attention masks)</td></tr>
      <tr><td>Outer product abᵀ</td><td>(m,)·(n,)→(m,n)</td><td>Rank-1 updates, LoRA</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># PyTorch matrix operations</span>
a = torch.randn(<span class="st">3</span>)
b = torch.randn(<span class="st">3</span>)
dot = torch.dot(a, b)                 <span class="cm"># scalar</span>
C = A @ B                             <span class="cm"># matrix multiply</span>
C = torch.matmul(A, B)                <span class="cm"># same thing</span>
D = A * B                             <span class="cm"># element-wise (Hadamard)</span>
E = torch.outer(a, b)                 <span class="cm"># outer product</span></pre></div>
  <div class="callout info"><strong>Shape debugging:</strong> Most PyTorch errors are shape mismatches. Use <code>tensor.shape</code> liberally. The rule: (…, m, k) @ (…, k, n) → (…, m, n).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Dot products measure alignment here and in <a href="../stats/#cosine-sim" target="_blank" rel="noopener">cosine similarity</a> for statistics. The same operation that scores <a href="../llm/#self-attention" target="_blank" rel="noopener">attention weights</a> in a transformer also measures how two price series co-move in <a href="../markets/indicators/#correlation" target="_blank" rel="noopener">market correlation</a>.</div>
  <div class="topic-nav" id="nav-vectors"></div>
</div>`;
}

/* 02 — Linear Regression */
function buildLinear() {
  return `<div class="topic" id="linear">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Foundations</div><h2>Linear <em>Regression</em></h2></div>
    <span class="topic-badge">Supervised</span>
  </div>
  <p class="sub">// Fitting a line through data — the simplest predictive model</p>
  <p class="prose">Linear regression finds the best-fit line through data. Given input <strong>x</strong>, we predict <strong>ŷ</strong> by learning weight <strong>w</strong> (slope) and bias <strong>b</strong> (intercept) that minimise prediction error.</p>
  <div class="fb"><div class="fm">ŷ = w · x + b</div><div class="fd"><span>ŷ</span> = prediction &nbsp;|&nbsp; <span>w</span> = weight &nbsp;|&nbsp; <span>x</span> = input &nbsp;|&nbsp; <span>b</span> = bias</div></div>
  <div class="fb c2"><div class="fm">MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</div><div class="fd"><span>MSE</span> = Mean Squared Error loss &nbsp;|&nbsp; minimised by gradient descent</div></div>
  <div class="va">
    <div class="vl">// Interactive — drag sliders to fit the line</div>
    <canvas id="linCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Weight w</span><input type="range" id="linW" min="-3" max="3" step="0.05" value="0.5"><span class="vd" id="linWv">0.50</span></div>
      <div class="cg"><span class="cl">Bias b</span><input type="range" id="linB" min="-3" max="3" step="0.05" value="0"><span class="vd" id="linBv">0.00</span></div>
      <div class="cg"><span class="cl">MSE</span><span class="vd" id="linMSE" style="color:var(--accent)">—</span></div>
      <button class="btn" onclick="bestFit()">BEST FIT</button>
    </div>
  </div>
  <div class="callout"><strong>OLS Solution:</strong> For simple linear regression, the optimal weights have a closed-form: w = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)². Gradient descent finds the same answer iteratively.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Fitting a line is the same act everywhere — <a href="../stats/#regression" target="_blank" rel="noopener">linear regression</a> in statistics, <a href="../markets/indicators/#sma" target="_blank" rel="noopener">simple moving averages</a> in markets. Even <a href="../poetry/forms/#couplet" target="_blank" rel="noopener">couplets</a> pair two lines with a clear relationship, the simplest "fit" in verse.</div>
  <div class="topic-nav" id="nav-linear"></div>
</div>`;
}

/* 03 — Logistic Regression */
function buildLogistic() {
  return `<div class="topic" id="logistic">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Foundations</div><h2>Logistic <em>Regression</em></h2></div>
    <span class="topic-badge">Classification</span>
  </div>
  <p class="sub">// The bridge from regression to classification — sigmoid turns scores into probabilities</p>
  <p class="prose">Logistic regression wraps a linear model in a <strong>sigmoid function</strong>, producing a probability between 0 and 1. Despite the name, it's a <strong>classifier</strong>, not a regressor. It's the simplest neural network — a single neuron.</p>
  <div class="fb"><div class="fm">P(y=1|x) = σ(w·x + b) = 1/(1 + e^(−(w·x+b)))</div><div class="fd"><span>σ</span> = sigmoid &nbsp;|&nbsp; outputs probability of class 1 &nbsp;|&nbsp; decision boundary at 0.5</div></div>
  <div class="fb c2"><div class="fm">BCE = −[y·log(ŷ) + (1−y)·log(1−ŷ)]</div><div class="fd"><span>Binary Cross-Entropy</span> — penalises confident wrong predictions exponentially</div></div>
  <div class="va">
    <div class="vl">// Decision boundary — adjust weight and bias</div>
    <canvas id="logCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Weight w</span><input type="range" id="logW" min="-5" max="5" step="0.1" value="2"><span class="vd" id="logWv">2.0</span></div>
      <div class="cg"><span class="cl">Bias b</span><input type="range" id="logBias" min="-5" max="5" step="0.1" value="0"><span class="vd" id="logBiasV">0.0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch logistic regression</span>
model = nn.Sequential(
    nn.Linear(<span class="st">784</span>, <span class="st">1</span>),
    nn.Sigmoid()
)
loss_fn = nn.BCELoss()          <span class="cm"># or BCEWithLogitsLoss (more stable)</span>
loss = loss_fn(model(x), y)</pre></div>
  <div class="callout warn"><strong>Numerical stability:</strong> Never use nn.Sigmoid() + nn.BCELoss(). Use nn.BCEWithLogitsLoss() which combines them with the log-sum-exp trick to avoid overflow/underflow.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The sigmoid that squeezes values into [0,1] reappears as <a href="../stats/#probability-distributions" target="_blank" rel="noopener">probability curves</a> in statistics and mirrors the S-curve of <a href="../markets/psychology/#market-sentiment-cycle" target="_blank" rel="noopener">market sentiment cycles</a> — gradual build, rapid shift, saturation.</div>
  <div class="topic-nav" id="nav-logistic"></div>
</div>`;
}

/* 04 — Gradient Descent */
function buildGradient() {
  return `<div class="topic" id="gradient">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Foundations</div><h2>Gradient <em>Descent</em></h2></div>
    <span class="topic-badge">Optimization</span>
  </div>
  <p class="sub">// Rolling downhill on the loss landscape to find optimal weights</p>
  <p class="prose">Gradient Descent is how models learn. We start at random weights and take small steps in the direction of <strong>steepest descent</strong> — opposite the gradient — to reach minimum loss.</p>
  <div class="fb"><div class="fm">w := w − α · ∂L/∂w</div><div class="fd"><span>α</span> = learning rate &nbsp;|&nbsp; <span>∂L/∂w</span> = gradient (slope of loss w.r.t. weight)</div></div>
  <table class="mt">
    <thead><tr><th>Variant</th><th>Samples/step</th><th>Pros</th><th>Cons</th></tr></thead>
    <tbody>
      <tr><td><span class="tag t1">Batch GD</span></td><td>All n</td><td>Stable, exact gradient</td><td>Slow per step</td></tr>
      <tr><td><span class="tag t2">Stochastic GD</span></td><td>1</td><td>Fast, noisy escapes minima</td><td>High variance</td></tr>
      <tr><td><span class="tag t3">Mini-batch GD</span></td><td>32–256</td><td>Best of both worlds</td><td>Batch size is a hyperparameter</td></tr>
    </tbody>
  </table>
  <div class="va">
    <div class="vl">// Animated loss landscape — adjust learning rate and run</div>
    <canvas id="gdCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Learning Rate α</span><input type="range" id="gdLR" min="0.01" max="0.48" step="0.01" value="0.1" oninput="document.getElementById('gdLRv').textContent=parseFloat(this.value).toFixed(2)"><span class="vd" id="gdLRv">0.10</span></div>
      <div class="cg"><span class="cl">Steps</span><span class="vd" id="gdSteps">0</span></div>
      <button class="btn" onclick="runGD()">▶ RUN</button>
      <button class="btn" onclick="resetGD()">↺ RESET</button>
    </div>
  </div>
  <div class="callout warn"><strong>Learning rate:</strong> Too large → overshoot and diverge. Too small → extremely slow convergence. Learning rate warmup + decay schedulers (topic 12) solve this in practice.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rolling downhill on a loss surface is the same intuition behind <a href="../markets/indicators/#roc" target="_blank" rel="noopener">Rate of Change</a> in markets — both measure slope to decide direction. The <a href="../poetry/sound/#cadence" target="_blank" rel="noopener">cadence</a> of a poem also descends and rises by gradients of stress.</div>
  <div class="topic-nav" id="nav-gradient"></div>
</div>`;
}

/* 05 — Activation Functions */
function buildActivation() {
  return `<div class="topic" id="activation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Foundations</div><h2>Activation <em>Functions</em></h2></div>
    <span class="topic-badge">Non-linearity</span>
  </div>
  <p class="sub">// What makes deep networks more than stacked linear transforms</p>
  <p class="prose">Without activations, any stack of linear layers collapses to a single linear transform. Activation functions introduce <strong>non-linearity</strong>, giving networks the power to approximate any function.</p>
  <div class="va">
    <div class="vl">// Select function — solid = f(x), dashed = derivative f′(x)</div>
    <div class="ctrl" style="margin:0 0 12px">
      <button class="btn" onclick="showAct('sigmoid')">SIGMOID</button>
      <button class="btn b2" onclick="showAct('relu')">RELU</button>
      <button class="btn b3" onclick="showAct('tanh')">TANH</button>
      <button class="btn b4" onclick="showAct('gelu')">GELU</button>
      <button class="btn" onclick="showAct('silu')">SILU</button>
    </div>
    <canvas id="actCanvas" height="220"></canvas>
    <div id="actInfo" style="margin-top:12px"></div>
  </div>
  <table class="mt">
    <thead><tr><th>Function</th><th>Formula</th><th>Range</th><th>Derivative</th><th>Used In</th></tr></thead>
    <tbody>
      <tr><td><span class="tag t1">Sigmoid</span></td><td>1/(1+e⁻ˣ)</td><td>(0,1)</td><td>σ(x)(1−σ(x))</td><td>Binary output, old nets</td></tr>
      <tr><td><span class="tag t2">ReLU</span></td><td>max(0,x)</td><td>[0,∞)</td><td>0 or 1</td><td>ResNets, most CNNs</td></tr>
      <tr><td><span class="tag t3">Tanh</span></td><td>(eˣ−e⁻ˣ)/(eˣ+e⁻ˣ)</td><td>(−1,1)</td><td>1−tanh²(x)</td><td>RNNs, LSTMs</td></tr>
      <tr><td><span class="tag t4">GELU</span></td><td>x·Φ(x)</td><td>(−∞,∞)</td><td>Complex</td><td>BERT, GPT</td></tr>
      <tr><td><span class="tag t2">SiLU</span></td><td>x·σ(x)</td><td>(−∞,∞)</td><td>σ(x)(1+x(1−σ(x)))</td><td>EfficientNet, LLaMA</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ReLU clips everything below zero — a threshold, like <a href="../markets/charts/#support-resistance" target="_blank" rel="noopener">support and resistance</a> levels that prices bounce off. In poetry, <a href="../poetry/sound/#caesura" target="_blank" rel="noopener">caesura</a> creates a hard break that divides flow, a rhythmic activation gate.</div>
  <div class="topic-nav" id="nav-activation"></div>
</div>`;
}

/* 06 — Bias-Variance */
function buildBiasVariance() {
  return `<div class="topic" id="bias-variance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Foundations</div><h2>Bias-Variance <em>Tradeoff</em></h2></div>
    <span class="topic-badge">Theory</span>
  </div>
  <p class="sub">// The fundamental tension between underfitting and overfitting</p>
  <p class="prose">Every model makes two types of errors: <strong>Bias</strong> — systematic error from wrong assumptions (underfitting). <strong>Variance</strong> — sensitivity to noise in training data (overfitting). You can't minimize both simultaneously.</p>
  <div class="fb"><div class="fm">E[(y−ŷ)²] = Bias² + Variance + Irreducible Noise</div><div class="fd">Total expected error decomposes into these three independent terms</div></div>
  <div class="va">
    <div class="vl">// Model complexity vs. error — the classic U-curve</div>
    <canvas id="bvCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model Complexity</span><input type="range" id="bvSlider" min="1" max="10" step="0.1" value="3" oninput="drawBV(this.value)"><span class="vd" id="bvVal">3.0</span></div>
      <div class="cg"><span class="cl">Bias²</span><span class="vd" id="bvBias" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Variance</span><span class="vd" id="bvVar" style="color:var(--accent3)">—</span></div>
    </div>
  </div>
  <div class="steps">
    <div class="step"><div class="sn">⬇</div><div><h4>High Bias (Underfitting)</h4><p>Model too simple — misses real patterns. Both train and test error are high.</p></div></div>
    <div class="step"><div class="sn">⬆</div><div><h4>High Variance (Overfitting)</h4><p>Model too complex — memorises noise. Low train error, high test error.</p></div></div>
    <div class="step"><div class="sn">✓</div><div><h4>Sweet Spot</h4><p>Regularization, dropout, cross-validation help find the optimal complexity.</p></div></div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The U-curve of bias vs. variance is the same tradeoff between <a href="../stats/#confidence-intervals" target="_blank" rel="noopener">confidence interval width</a> and precision in statistics. In markets, <a href="../markets/psychology/#overconfidence" target="_blank" rel="noopener">overconfidence</a> is low bias, high variance — the model fits noise.</div>
  <div class="topic-nav" id="nav-bias-variance"></div>
</div>`;
}

/* 07 — Loss Functions */
function buildLoss() {
  return `<div class="topic" id="loss">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Training</div><h2>Loss <em>Functions</em></h2></div>
    <span class="topic-badge">Optimization</span>
  </div>
  <p class="sub">// Measuring how wrong the model is — the objective being minimised</p>
  <p class="prose">The loss function defines what the model is optimising. Different tasks need different loss functions. Getting this wrong is one of the most common ML mistakes.</p>
  <div class="fb"><div class="fm">MSE = (1/n)·Σ(y−ŷ)²</div><div class="fd"><span>Regression</span> — squared penalty, sensitive to outliers</div></div>
  <div class="fb c2"><div class="fm">MAE = (1/n)·Σ|y−ŷ|</div><div class="fd"><span>Robust regression</span> — linear penalty, outlier-resistant</div></div>
  <div class="fb c3"><div class="fm">CE = −Σ yᵢ·log(ŷᵢ)</div><div class="fd"><span>Classification</span> — penalises confident wrong predictions exponentially</div></div>
  <div class="fb c4"><div class="fm">Huber = { ½(y−ŷ)² if |y−ŷ|≤δ, δ|y−ŷ|−½δ² otherwise }</div><div class="fd"><span>Huber</span> — smooth MSE near zero, MAE for large errors. Best of both.</div></div>
  <div class="va">
    <div class="vl">// MSE vs MAE vs Huber — drag to see how penalty scales with error</div>
    <canvas id="lossCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Error magnitude</span><input type="range" id="errSlider" min="0.05" max="3" step="0.05" value="1" oninput="onErrSlider(this.value)"><span class="vd" id="errVal">1.00</span></div>
      <div class="cg"><span class="cl">MSE</span><span class="vd" id="mseP">1.000</span></div>
      <div class="cg"><span class="cl">MAE</span><span class="vd" id="maeP" style="color:var(--accent2)">1.000</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Loss functions measure distance from truth — like <a href="../stats/#variance-std" target="_blank" rel="noopener">variance</a> measures distance from the mean. In poetry, the constraint of a <a href="../poetry/forms/#villanelle" target="_blank" rel="noopener">villanelle</a> is itself a loss function: deviate from the form, and the poem breaks.</div>
  <div class="topic-nav" id="nav-loss"></div>
</div>`;
}

/* 08 — Backpropagation */
function buildBackprop() {
  return `<div class="topic" id="backprop">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Training</div><h2><em>Back</em>propagation</h2></div>
    <span class="topic-badge">Algorithm</span>
  </div>
  <p class="sub">// Chain rule applied through a network — how every weight gets its gradient</p>
  <p class="prose">Backprop answers: <strong>"how much did each weight contribute to the error?"</strong> It uses the chain rule to propagate gradients backward from the loss to every parameter.</p>
  <div class="fb"><div class="fm">∂L/∂w₁ = ∂L/∂ŷ · ∂ŷ/∂h · ∂h/∂w₁</div><div class="fd"><span>Chain Rule:</span> multiply local gradients along the path from loss back to each weight</div></div>
  <div class="va">
    <div class="vl">// Forward pass → loss → backward pass → weight update</div>
    <canvas id="bpCanvas" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animBP()">▶ ANIMATE</button>
      <button class="btn" onclick="resetBP()">↺ RESET</button>
      <span id="bpMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px">Click Animate</span>
    </div>
  </div>
  <div class="callout warn"><strong>Vanishing gradients:</strong> In deep networks, multiplying many small numbers (sigmoid derivatives ≤ 0.25) makes early-layer gradients near zero. Solutions: ReLU activations, batch norm, residual connections, gradient clipping (topic 14).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The chain rule propagates credit backward through layers — the same logic as <a href="../markets/psychology/#information-cascades" target="_blank" rel="noopener">information cascades</a> in markets where effects ripple back. In poetry, <a href="../poetry/rhetoric/#anadiplosis" target="_blank" rel="noopener">anadiplosis</a> chains the end of one line to the start of the next.</div>
  <div class="topic-nav" id="nav-backprop"></div>
</div>`;
}

/* 09 — Optimizers */
function buildOptimizers() {
  return `<div class="topic" id="optimizers">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Training</div><h2><em>Optimizers</em></h2></div>
    <span class="topic-badge">Optimization</span>
  </div>
  <p class="sub">// Beyond vanilla SGD — momentum, adaptive learning rates, Adam</p>
  <p class="prose">Modern optimizers improve on vanilla gradient descent by adding <strong>momentum</strong> (using past gradients) and <strong>adaptive rates</strong> (different step size per parameter).</p>
  <div class="fb"><div class="fm">SGD+Momentum: v := βv − α·∇L &nbsp;&nbsp; w := w + v</div><div class="fd"><span>β</span> = momentum (typically 0.9) — accumulates velocity across steps</div></div>
  <div class="fb c2"><div class="fm">RMSProp: s := ρs + (1−ρ)·(∇L)² &nbsp;&nbsp; w := w − α·∇L/√(s+ε)</div><div class="fd">Divides by RMS of recent gradients — large gradients get smaller steps</div></div>
  <div class="fb c3"><div class="fm">Adam: m̂ = m/(1−β₁ᵗ) &nbsp;&nbsp; v̂ = v/(1−β₂ᵗ) &nbsp;&nbsp; w := w − α·m̂/√(v̂+ε)</div><div class="fd"><span>Adam</span> = momentum + RMSProp + bias correction. Default: β₁=0.9, β₂=0.999, ε=1e-8</div></div>
  <div class="va">
    <div class="vl">// Optimizer comparison on a saddle point surface</div>
    <canvas id="optCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="runOptAnim('sgd')">SGD</button>
      <button class="btn b2" onclick="runOptAnim('momentum')">MOMENTUM</button>
      <button class="btn b3" onclick="runOptAnim('adam')">ADAM</button>
      <button class="btn" onclick="resetOpt()">↺ RESET</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch optimizers</span>
optim = torch.optim.SGD(model.parameters(), lr=<span class="st">0.01</span>, momentum=<span class="st">0.9</span>)
optim = torch.optim.Adam(model.parameters(), lr=<span class="st">1e-3</span>, betas=(<span class="st">0.9</span>, <span class="st">0.999</span>))
optim = torch.optim.AdamW(model.parameters(), lr=<span class="st">1e-3</span>, weight_decay=<span class="st">0.01</span>)  <span class="cm"># default choice</span></pre></div>
  <div class="callout"><strong>AdamW</strong> is the default choice for most modern models. It decouples weight decay from the gradient update, fixing a subtle bug in Adam's L2 regularization.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Momentum in Adam is literally <a href="../markets/indicators/#roc" target="_blank" rel="noopener">momentum</a> in trading — using past velocity to guide the next step. <a href="../markets/indicators/#ema" target="_blank" rel="noopener">Exponential moving averages</a> smooth both gradient updates and price series identically.</div>
  <div class="topic-nav" id="nav-optimizers"></div>
</div>`;
}

/* 10 — Regularization */
function buildRegularization() {
  return `<div class="topic" id="regularization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Training</div><h2><em>Regularization</em></h2></div>
    <span class="topic-badge">Generalization</span>
  </div>
  <p class="sub">// Preventing overfitting by constraining model complexity</p>
  <p class="prose">Regularization adds a <strong>penalty for complexity</strong> to the loss, discouraging the model from memorising noise and improving generalisation to unseen data.</p>
  <div class="fb"><div class="fm">L_total = L_data + λ·||w||²₂ &nbsp;&nbsp; (L2 / Ridge)</div><div class="fd"><span>λ</span> = regularization strength &nbsp;|&nbsp; drives weights toward zero but not exactly zero</div></div>
  <div class="fb c2"><div class="fm">L_total = L_data + λ·||w||₁ &nbsp;&nbsp; (L1 / Lasso)</div><div class="fd">L1 produces <span>sparse</span> weights — many exactly zero (implicit feature selection)</div></div>
  <div class="fb c3"><div class="fm">Dropout: h̃ = h ⊙ mask/p &nbsp;&nbsp; mask ~ Bernoulli(p)</div><div class="fd">Each neuron zeroed with prob (1−p) during training; scaled by 1/p to preserve expected value</div></div>
  <div class="va">
    <div class="vl">// L1 vs L2 penalty contours — see how they constrain weights differently</div>
    <canvas id="regCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawReg('l2')">L2 (RIDGE)</button>
      <button class="btn b2" onclick="drawReg('l1')">L1 (LASSO)</button>
      <div class="cg"><span class="cl">λ strength</span><input type="range" id="regLambda" min="0.1" max="3" step="0.1" value="1" oninput="drawReg(currentReg)"><span class="vd" id="regLVal">1.0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># L2 via weight_decay in optimizer</span>
optim = torch.optim.AdamW(model.parameters(), weight_decay=<span class="st">1e-4</span>)

<span class="cm"># Dropout layer</span>
<span class="kw">self</span>.dropout = nn.Dropout(p=<span class="st">0.3</span>)   <span class="cm"># drop 30% of neurons</span>

model.eval()   <span class="cm"># disables dropout at test time</span>
model.train()  <span class="cm"># re-enables dropout</span></pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> L1/L2 penalties constrain complexity, just as <a href="../poetry/forms/#shakespearean-sonnet" target="_blank" rel="noopener">sonnet form</a> constrains a poet — the restriction forces elegance. In markets, <a href="../markets/psychology/#loss-aversion" target="_blank" rel="noopener">loss aversion</a> acts as a natural regularizer, penalizing risky bets.</div>
  <div class="topic-nav" id="nav-regularization"></div>
</div>`;
}

/* 11 — Batch Norm */
function buildBatchnorm() {
  return `<div class="topic" id="batchnorm">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Training</div><h2>Batch <em>Normalization</em></h2></div>
    <span class="topic-badge">Stabilization</span>
  </div>
  <p class="sub">// Normalizing activations to keep training stable and fast</p>
  <p class="prose">Batch Normalization normalises each layer's activations to have <strong>zero mean and unit variance</strong> across the mini-batch, then scales/shifts with learned parameters γ and β.</p>
  <div class="fb"><div class="fm">μ_B = (1/m)·Σxᵢ &nbsp;&nbsp; σ²_B = (1/m)·Σ(xᵢ−μ_B)²</div><div class="fd">Compute batch mean and variance</div></div>
  <div class="fb c2"><div class="fm">x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε)</div><div class="fd">Normalise: <span>ε</span> = small constant for numerical stability (1e-5)</div></div>
  <div class="fb c3"><div class="fm">yᵢ = γ · x̂ᵢ + β</div><div class="fd"><span>γ</span> = learned scale &nbsp;|&nbsp; <span>β</span> = learned shift — restores representational power</div></div>
  <div class="va">
    <div class="vl">// Effect of batch norm on activation distributions across layers</div>
    <canvas id="bnCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawBN(false)">WITHOUT BN</button>
      <button class="btn b2" onclick="drawBN(true)">WITH BN</button>
    </div>
  </div>
  <div class="callout"><strong>Layer Norm vs Batch Norm:</strong> BatchNorm normalises over the batch dimension — problematic for small batches and transformers. LayerNorm normalises over the feature dimension and is the standard in transformers. See topic 27 for all variants.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Normalizing activations to zero mean and unit variance is exactly <a href="../stats/#z-scores" target="_blank" rel="noopener">z-score standardization</a> from statistics. Markets use the same logic: <a href="../markets/indicators/#bollinger-bands" target="_blank" rel="noopener">Bollinger Bands</a> normalize price relative to its rolling mean and standard deviation.</div>
  <div class="topic-nav" id="nav-batchnorm"></div>
</div>`;
}

/* 12 — LR Scheduling */
function buildLRSchedule() {
  return `<div class="topic" id="lr-schedule">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Training</div><h2>LR <em>Scheduling</em></h2></div>
    <span class="topic-badge">Optimization</span>
  </div>
  <p class="sub">// Adjusting the learning rate over training for better convergence</p>
  <p class="prose">A fixed learning rate is rarely optimal. Starting too high causes instability; finishing too high prevents convergence. Schedulers <strong>adjust α during training</strong>.</p>
  <div class="fb"><div class="fm">Cosine Decay: αₜ = αₘᵢₙ + ½(αₘₐₓ−αₘᵢₙ)(1 + cos(πt/T))</div><div class="fd"><span>T</span> = total steps &nbsp;|&nbsp; smoothly decays from αₘₐₓ to αₘᵢₙ</div></div>
  <div class="fb c2"><div class="fm">Warmup: α = αₘₐₓ · (t/t_warmup) &nbsp; for t &lt; t_warmup</div><div class="fd">Linear ramp-up prevents large gradient updates from poorly-initialised weights</div></div>
  <div class="va">
    <div class="vl">// Learning rate schedules — click to compare</div>
    <canvas id="lrCanvas" height="230"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawLR('step')">STEP DECAY</button>
      <button class="btn b2" onclick="drawLR('cosine')">COSINE</button>
      <button class="btn b3" onclick="drawLR('warmup_cosine')">WARMUP+COSINE</button>
      <button class="btn b4" onclick="drawLR('cyclic')">CYCLIC</button>
    </div>
  </div>
  <div class="code-block"><pre>scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optim, T_max=<span class="st">100</span>)
scheduler = torch.optim.lr_scheduler.OneCycleLR(optim, max_lr=<span class="st">0.01</span>, total_steps=<span class="st">1000</span>)

<span class="cm"># call after each epoch/step:</span>
scheduler.step()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Cosine decay mimics natural cooling — fast changes early, fine adjustments later. The same arc appears in <a href="../poetry/rhetoric/#climax" target="_blank" rel="noopener">climax (gradatio)</a>: build intensity, then resolve. Markets show it in <a href="../markets/psychology/#market-sentiment-cycle" target="_blank" rel="noopener">sentiment cycles</a> that heat up and cool down.</div>
  <div class="topic-nav" id="nav-lr-schedule"></div>
</div>`;
}

/* 13 — Weight Initialization */
function buildWeightInit() {
  return `<div class="topic" id="weight-init">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Training</div><h2>Weight <em>Initialization</em></h2></div>
    <span class="topic-badge">Stabilization</span>
  </div>
  <p class="sub">// How you start determines if you converge — Xavier, He, and why they matter</p>
  <p class="prose">Bad initialization → activations explode or vanish → gradients die → training fails. The goal: keep <strong>variance of activations stable</strong> across layers.</p>
  <div class="fb"><div class="fm">Xavier/Glorot: W ~ N(0, 2/(fan_in + fan_out))</div><div class="fd">Designed for <span>tanh/sigmoid</span> — keeps variance ≈1 going forward and backward</div></div>
  <div class="fb c2"><div class="fm">He/Kaiming: W ~ N(0, 2/fan_in)</div><div class="fd">Designed for <span>ReLU</span> — compensates for ReLU killing half the activations</div></div>
  <div class="va">
    <div class="vl">// Activation variance through 10 layers with different initializations</div>
    <canvas id="initCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawInit('random')">RANDOM N(0,1)</button>
      <button class="btn b2" onclick="drawInit('xavier')">XAVIER</button>
      <button class="btn b3" onclick="drawInit('he')">HE/KAIMING</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch initialization</span>
nn.init.xavier_uniform_(layer.weight)     <span class="cm"># for tanh/sigmoid</span>
nn.init.kaiming_normal_(layer.weight)     <span class="cm"># for ReLU (default)</span>
nn.init.zeros_(layer.bias)                <span class="cm"># biases → 0</span></pre></div>
  <div class="callout info"><strong>Modern practice:</strong> PyTorch's nn.Linear uses Kaiming uniform by default. Transformers typically use small normal init (std ≈ 0.02) + special scaling for residual paths.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Xavier initialization sets variance to 1/fan_in — the same principle behind <a href="../stats/#variance-std" target="_blank" rel="noopener">variance scaling</a>. Starting conditions matter everywhere: the <a href="../poetry/forms/#shakespearean-sonnet" target="_blank" rel="noopener">opening quatrain</a> of a sonnet sets the trajectory for the whole poem.</div>
  <div class="topic-nav" id="nav-weight-init"></div>
</div>`;
}

/* 14 — Gradient Clipping */
function buildGradClip() {
  return `<div class="topic" id="grad-clip">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Training</div><h2>Gradient <em>Clipping</em></h2></div>
    <span class="topic-badge">Stabilization</span>
  </div>
  <p class="sub">// Preventing exploding gradients by capping their magnitude</p>
  <p class="prose">In RNNs and deep networks, gradients can <strong>explode exponentially</strong> during backprop. Gradient clipping caps the gradient norm before the optimizer step, keeping training stable.</p>
  <div class="fb"><div class="fm">Clip by norm: if ||g|| > max_norm → g := g · max_norm / ||g||</div><div class="fd">Rescales the entire gradient vector to have norm ≤ max_norm. Preserves direction.</div></div>
  <div class="fb c2"><div class="fm">Clip by value: gᵢ := clamp(gᵢ, −clip_val, +clip_val)</div><div class="fd">Clips each element independently. Faster but can change gradient direction.</div></div>
  <div class="va">
    <div class="vl">// Gradient norm over training — with and without clipping</div>
    <canvas id="clipCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Max Norm</span><input type="range" id="clipMax" min="0.1" max="5" step="0.1" value="1" oninput="drawClip()"><span class="vd" id="clipMaxV">1.0</span></div>
      <button class="btn" onclick="drawClip()">REDRAW</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Standard training loop with gradient clipping</span>
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=<span class="st">1.0</span>)  <span class="cm"># clip by norm</span>
optimizer.step()</pre></div>
  <div class="callout"><strong>When to use:</strong> Almost always for RNNs/LSTMs. Common in transformer training too (GPT uses max_norm=1.0). The max_norm value of 1.0 is a good default.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Capping gradient magnitude is a guardrail — like <a href="../markets/indicators/#atr" target="_blank" rel="noopener">ATR-based stops</a> that cap how much a position can move against you. In poetry, <a href="../poetry/sound/#end-stopped" target="_blank" rel="noopener">end-stopped lines</a> clip the flow before it runs away.</div>
  <div class="topic-nav" id="nav-grad-clip"></div>
</div>`;
}

/* 15 — Softmax */
function buildSoftmax() {
  return `<div class="topic" id="softmax">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Core Math</div><h2>Softmax & <em>Probabilities</em></h2></div>
    <span class="topic-badge">Classification</span>
  </div>
  <p class="sub">// Converting raw scores into a probability distribution</p>
  <p class="prose">Softmax maps a vector of real-valued logits to probabilities that <strong>sum to 1</strong>. It amplifies the largest logit, making the winner more decisive.</p>
  <div class="fb"><div class="fm">σ(zᵢ) = e^zᵢ / Σⱼ e^zⱼ</div><div class="fd"><span>zᵢ</span> = logit for class i &nbsp;|&nbsp; numerator = exponentiated score &nbsp;|&nbsp; denominator = normalisation</div></div>
  <div class="va">
    <div class="vl">// Adjust logits — watch probabilities redistribute</div>
    <canvas id="smCanvas" height="200"></canvas>
    <div class="ctrl" id="smCtrl"></div>
  </div>
  <div class="callout"><strong>Temperature scaling:</strong> σ(z/T). T&lt;1 → sharper (more confident). T&gt;1 → softer (more uniform). Used in knowledge distillation and language model sampling.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Converting logits to probabilities that sum to 1 is a <a href="../stats/#probability-distributions" target="_blank" rel="noopener">probability distribution</a> in action. Temperature scaling changes the "confidence" — hot = uniform = <a href="../markets/psychology/#fear-and-greed" target="_blank" rel="noopener">uncertain market</a>, cold = peaked = consensus.</div>
  <div class="topic-nav" id="nav-softmax"></div>
</div>`;
}

/* 16 — MLE & Gaussian */
function buildMLE() {
  return `<div class="topic" id="mle">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Core Math</div><h2>MLE & <em>Gaussian</em></h2></div>
    <span class="topic-badge">Probability</span>
  </div>
  <p class="sub">// Maximum Likelihood Estimation — why MSE and Cross-Entropy exist</p>
  <p class="prose">MLE asks: <strong>what parameters make the observed data most probable?</strong> Most ML training objectives are secretly MLE under a particular assumed distribution.</p>
  <div class="fb"><div class="fm">θ* = argmax_θ Σ log p(xᵢ | θ)</div><div class="fd">Maximise log-likelihood (summing logs avoids numerical underflow with tiny probabilities)</div></div>
  <div class="fb c2"><div class="fm">Gaussian: p(x|μ,σ) = (1/√2πσ²) · exp(−(x−μ)²/2σ²)</div><div class="fd">MLE on Gaussian noise assumption → MSE loss. MLE on Bernoulli → Cross-Entropy loss.</div></div>
  <div class="va">
    <div class="vl">// Gaussian distribution — adjust mean and variance</div>
    <canvas id="gaussCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Mean μ</span><input type="range" id="gaussMu" min="-3" max="3" step="0.1" value="0" oninput="drawGauss()"><span class="vd" id="gaussMuV">0.0</span></div>
      <div class="cg"><span class="cl">Std σ</span><input type="range" id="gaussSig" min="0.2" max="2.5" step="0.1" value="1" oninput="drawGauss()"><span class="vd" id="gaussSigV">1.0</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Training with MSE loss = assuming your errors are Gaussian distributed. Training with Cross-Entropy = assuming Bernoulli/Categorical outputs. The loss function encodes your distributional assumption.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Maximum likelihood estimation is the mathematical foundation of <a href="../stats/#normal" target="_blank" rel="noopener">fitting a normal distribution</a> to data. The same principle drives <a href="../markets/indicators/#standard-deviation" target="_blank" rel="noopener">volatility estimation</a> in markets — finding the parameters that best explain observed returns.</div>
  <div class="topic-nav" id="nav-mle"></div>
</div>`;
}

/* 17 — Entropy */
function buildEntropy() {
  return `<div class="topic" id="entropy">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Core Math</div><h2><em>Entropy</em></h2></div>
    <span class="topic-badge">Information Theory</span>
  </div>
  <p class="sub">// Measuring uncertainty — how much "surprise" is in a distribution</p>
  <p class="prose"><strong>Entropy</strong> measures the average amount of information (surprise) in a distribution. A fair coin has maximum entropy (1 bit). A loaded coin has lower entropy. Cross-entropy extends this to compare two distributions.</p>
  <div class="fb"><div class="fm">H(P) = −Σ P(x) · log₂P(x)</div><div class="fd"><span>Shannon Entropy</span> — measured in bits (log₂) or nats (ln). Maximum when uniform, zero when deterministic.</div></div>
  <div class="fb c2"><div class="fm">H(P,Q) = −Σ P(x) · log Q(x)</div><div class="fd"><span>Cross-Entropy</span> — expected surprise when using Q to encode events from P. Always ≥ H(P).</div></div>
  <div class="fb c3"><div class="fm">H(P,Q) = H(P) + KL(P||Q)</div><div class="fd">Cross-entropy = entropy of P + extra bits from approximation error. Minimising CE ≡ minimising KL.</div></div>
  <div class="va">
    <div class="vl">// Binary entropy — adjust probability of heads</div>
    <canvas id="entropyCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">P(heads)</span><input type="range" id="entP" min="0.01" max="0.99" step="0.01" value="0.5" oninput="drawEntropy()"><span class="vd" id="entPV">0.50</span></div>
      <div class="cg"><span class="cl">Entropy</span><span class="vd" id="entHV" style="color:var(--accent)">1.000 bits</span></div>
    </div>
  </div>
  <div class="callout"><strong>Why CE loss works:</strong> When labels are one-hot, cross-entropy reduces to −log(ŷ_correct). The model only needs to maximise the probability of the correct class.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Shannon entropy measures uncertainty — identical to the <a href="../stats/#probability-distributions" target="_blank" rel="noopener">spread of a distribution</a>. High entropy in <a href="../llm/#sampling" target="_blank" rel="noopener">LLM sampling</a> means many plausible next tokens. In poetry, <a href="../poetry/forms/#free-verse" target="_blank" rel="noopener">free verse</a> is high-entropy form — maximal freedom.</div>
  <div class="topic-nav" id="nav-entropy"></div>
</div>`;
}

/* 18 — KL Divergence */
function buildKLDiv() {
  return `<div class="topic" id="kl-div">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Core Math</div><h2>KL <em>Divergence</em></h2></div>
    <span class="topic-badge">Information Theory</span>
  </div>
  <p class="sub">// Measuring how different two probability distributions are</p>
  <p class="prose">KL Divergence measures how much information is <strong>lost when using distribution Q to approximate P</strong>. It is not symmetric — KL(P||Q) ≠ KL(Q||P).</p>
  <div class="fb"><div class="fm">KL(P||Q) = Σ P(x) · log(P(x)/Q(x))</div><div class="fd">Always ≥ 0 &nbsp;|&nbsp; = 0 only when P = Q exactly</div></div>
  <div class="fb c2"><div class="fm">KL(P||Q) = ∫ p(x) · log(p(x)/q(x)) dx</div><div class="fd">Continuous case &nbsp;|&nbsp; used in VAE loss, RLHF, variational inference</div></div>
  <div class="va">
    <div class="vl">// Visualise KL divergence between two Gaussians</div>
    <canvas id="klCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Q mean offset</span><input type="range" id="klOffset" min="0" max="4" step="0.1" value="1" oninput="drawKL()"><span class="vd" id="klOffV">1.0</span></div>
      <div class="cg"><span class="cl">KL(P||Q)</span><span class="vd" id="klVal" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> KL divergence measures how one distribution diverges from another — the same logic as comparing <a href="../stats/#hypothesis-testing" target="_blank" rel="noopener">observed vs. expected</a> in hypothesis testing. In markets, the gap between <a href="../markets/psychology/#smart-money-dumb-money" target="_blank" rel="noopener">smart money and dumb money</a> positioning is a kind of divergence signal.</div>
  <div class="topic-nav" id="nav-kl-div"></div>
</div>`;
}

/* 19 — Bayes */
function buildBayes() {
  return `<div class="topic" id="bayes">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Core Math</div><h2>Bayes' <em>Theorem</em></h2></div>
    <span class="topic-badge">Probability</span>
  </div>
  <p class="sub">// Updating beliefs with evidence — the foundation of probabilistic ML</p>
  <p class="prose">Bayes' Theorem tells us how to <strong>update a prior belief</strong> when we observe new evidence.</p>
  <div class="fb"><div class="fm">P(A|B) = P(B|A) · P(A) / P(B)</div><div class="fd"><span>P(A|B)</span> = posterior &nbsp;|&nbsp; <span>P(B|A)</span> = likelihood &nbsp;|&nbsp; <span>P(A)</span> = prior &nbsp;|&nbsp; <span>P(B)</span> = evidence</div></div>
  <div class="va">
    <div class="vl">// Medical test — posterior probability after positive result</div>
    <canvas id="bayesCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Prior P(disease) %</span><input type="range" id="priorS" min="0.1" max="50" step="0.1" value="1" oninput="onBayes()"><span class="vd" id="priorV">1.0%</span></div>
      <div class="cg"><span class="cl">Sensitivity %</span><input type="range" id="sensS" min="50" max="99" step="1" value="95" oninput="onBayes()"><span class="vd" id="sensV">95%</span></div>
      <div class="cg"><span class="cl">Posterior</span><span class="vd" id="postV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Base rate fallacy:</strong> 1% disease prevalence + 95% accurate test = only ~16% chance you're actually sick after a positive. Low priors dominate!</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Updating beliefs with evidence is the core of <a href="../stats/#bayes" target="_blank" rel="noopener">Bayesian statistics</a>. Traders do it intuitively: new data shifts the <a href="../markets/psychology/#confirmation-bias" target="_blank" rel="noopener">prior belief</a> — or doesn’t, when confirmation bias blocks the update.</div>
  <div class="topic-nav" id="nav-bayes"></div>
</div>`;
}

/* 20 — Cross-Validation */
function buildCrossval() {
  return `<div class="topic" id="crossval">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Core Math</div><h2>Cross-<em>Validation</em></h2></div>
    <span class="topic-badge">Evaluation</span>
  </div>
  <p class="sub">// Reliable model evaluation by rotating which data is used for testing</p>
  <p class="prose"><strong>k-fold cross-validation</strong> averages performance over k splits for a more reliable estimate than a single train/test split.</p>
  <div class="fb"><div class="fm">CV Score = (1/k) · Σᵢ score(model_i, fold_i)</div><div class="fd">Train k models, each evaluated on a different held-out fold</div></div>
  <div class="va">
    <div class="vl">// k-fold cross-validation — click to cycle through folds</div>
    <canvas id="cvCanvas" height="200"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">k folds</span><input type="range" id="cvK" min="2" max="10" step="1" value="5" oninput="drawCV()"><span class="vd" id="cvKV">5</span></div>
      <button class="btn" onclick="animCV()">▶ CYCLE FOLDS</button>
    </div>
  </div>
  <div class="steps">
    <div class="step"><div class="sn">1</div><div><h4>Split data into k folds</h4><p>Typically k=5 or k=10</p></div></div>
    <div class="step"><div class="sn">2</div><div><h4>Train on k−1 folds</h4><p>One fold held out as validation set</p></div></div>
    <div class="step"><div class="sn">3</div><div><h4>Evaluate on held-out fold</h4><p>Record metric (accuracy, F1, etc.)</p></div></div>
    <div class="step"><div class="sn">4</div><div><h4>Average k scores</h4><p>→ final CV estimate with confidence interval</p></div></div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rotating train/test splits prevents overfitting to one sample — the statistical version of <a href="../stats/#sampling-distributions" target="_blank" rel="noopener">sampling distributions</a>. In markets, <a href="../markets/psychology/#recency-bias" target="_blank" rel="noopener">recency bias</a> is what happens when you only test on the latest fold.</div>
  <div class="topic-nav" id="nav-crossval"></div>
</div>`;
}

/* 21 — Eval Metrics */
function buildMetrics() {
  return `<div class="topic" id="metrics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Core Math</div><h2>Evaluation <em>Metrics</em></h2></div>
    <span class="topic-badge">Evaluation</span>
  </div>
  <p class="sub">// How to actually measure if your model is good</p>
  <p class="prose">Accuracy alone is misleading for imbalanced classes. <strong>Precision, Recall, F1 and ROC-AUC</strong> give a complete picture.</p>
  <div class="fb"><div class="fm">Precision = TP/(TP+FP) &nbsp;&nbsp; Recall = TP/(TP+FN)</div><div class="fd"><span>Precision</span> = of predicted positives, how many real? &nbsp;|&nbsp; <span>Recall</span> = of real positives, how many found?</div></div>
  <div class="fb c2"><div class="fm">F1 = 2·(Precision·Recall)/(Precision+Recall)</div><div class="fd">Harmonic mean — punishes models that sacrifice one for the other</div></div>
  <div class="va">
    <div class="vl">// Interactive confusion matrix</div>
    <canvas id="metricsCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">True Positives</span><input type="range" id="mTP" min="1" max="100" step="1" value="80" oninput="drawMetrics()"><span class="vd" id="mTPv">80</span></div>
      <div class="cg"><span class="cl">False Positives</span><input type="range" id="mFP" min="0" max="50" step="1" value="10" oninput="drawMetrics()"><span class="vd" id="mFPv">10</span></div>
      <div class="cg"><span class="cl">False Negatives</span><input type="range" id="mFN" min="0" max="50" step="1" value="20" oninput="drawMetrics()"><span class="vd" id="mFNv">20</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Precision and recall trade off like <a href="../stats/#hypothesis-testing" target="_blank" rel="noopener">Type I and Type II errors</a> in hypothesis testing. In markets, a <a href="../markets/indicators/#macd" target="_blank" rel="noopener">MACD signal</a> has the same tradeoff: too sensitive (false positives) vs. too slow (missed moves).</div>
  <div class="topic-nav" id="nav-metrics"></div>
</div>`;
}

/* 22 — Cosine Similarity */
function buildCosineSim() {
  return `<div class="topic" id="cosine-sim">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Core Math</div><h2>Cosine <em>Similarity</em></h2></div>
    <span class="topic-badge">Distance</span>
  </div>
  <p class="sub">// Measuring angular similarity between vectors — the backbone of retrieval</p>
  <p class="prose">Cosine similarity measures the <strong>angle between two vectors</strong>, ignoring magnitude. Two vectors pointing the same direction have similarity 1, opposite = −1, perpendicular = 0. It's the standard metric for embeddings and RAG retrieval.</p>
  <div class="fb"><div class="fm">cos(θ) = (a · b) / (||a|| · ||b||)</div><div class="fd"><span>a · b</span> = dot product &nbsp;|&nbsp; <span>||a||</span> = L2 norm &nbsp;|&nbsp; Range: [−1, 1]</div></div>
  <div class="fb c2"><div class="fm">Cosine Distance = 1 − cos(θ)</div><div class="fd">Converts similarity to distance &nbsp;|&nbsp; Range: [0, 2] &nbsp;|&nbsp; 0 = identical direction</div></div>
  <div class="va">
    <div class="vl">// Two vectors — adjust angle to see similarity change</div>
    <canvas id="cosCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Angle between vectors</span><input type="range" id="cosAngle" min="0" max="180" step="1" value="30" oninput="drawCosSim()"><span class="vd" id="cosAngleV">30°</span></div>
      <div class="cg"><span class="cl">Cosine Sim</span><span class="vd" id="cosSimV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch cosine similarity</span>
sim = F.cosine_similarity(a, b, dim=-<span class="st">1</span>)          <span class="cm"># batch-wise</span>
sim = torch.dot(a, b) / (a.norm() * b.norm())    <span class="cm"># single pair</span>

<span class="cm"># For nearest-neighbor retrieval:</span>
sims = query @ embeddings.T                       <span class="cm"># all similarities at once</span>
top_k = sims.topk(<span class="st">10</span>)                             <span class="cm"># top-10 most similar</span></pre></div>
  <div class="callout info"><strong>In practice:</strong> Embeddings are often L2-normalized, making cosine similarity equivalent to a simple dot product. This is why dot-product search (FAISS, HNSW) is so fast.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The angle between embeddings measures semantic similarity — the same geometry as <a href="../stats/#correlation" target="_blank" rel="noopener">Pearson correlation</a> on centered data. <a href="../llm/#embedding-search" target="_blank" rel="noopener">Vector search in RAG</a> relies on this. In poetry, <a href="../poetry/sound/#slant-rhyme" target="_blank" rel="noopener">slant rhyme</a> is imperfect similarity — cosine < 1 but close.</div>
  <div class="topic-nav" id="nav-cosine-sim"></div>
</div>`;
}

/* 23 — CNN */
function buildCNN() {
  return `<div class="topic" id="cnn">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Deep Learning</div><h2>CNN — <em>Convolutions</em></h2></div>
    <span class="topic-badge">Architecture</span>
  </div>
  <p class="sub">// Exploiting spatial structure with shared local filters</p>
  <p class="prose">Convolutional layers apply a <strong>small learnable filter</strong> across the entire input — translational equivariance.</p>
  <div class="fb"><div class="fm">(f * g)[i,j] = Σₘ Σₙ f[m,n] · g[i−m, j−n]</div><div class="fd"><span>f</span> = filter/kernel &nbsp;|&nbsp; <span>g</span> = input &nbsp;|&nbsp; slide filter, compute dot product at each position</div></div>
  <div class="fb c2"><div class="fm">Output size = ⌊(W − K + 2P)/S⌋ + 1</div><div class="fd"><span>W</span> = input width &nbsp;|&nbsp; <span>K</span> = kernel size &nbsp;|&nbsp; <span>P</span> = padding &nbsp;|&nbsp; <span>S</span> = stride</div></div>
  <div class="va">
    <div class="vl">// Convolution operation — kernel sliding over input</div>
    <canvas id="cnnCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Kernel Size</span><input type="range" id="cnnK" min="1" max="5" step="2" value="3" oninput="drawCNN()"><span class="vd" id="cnnKV">3×3</span></div>
      <div class="cg"><span class="cl">Stride</span><input type="range" id="cnnS" min="1" max="3" step="1" value="1" oninput="drawCNN()"><span class="vd" id="cnnSV">1</span></div>
      <button class="btn" onclick="animCNN()">▶ ANIMATE</button>
    </div>
  </div>
  <div class="code-block"><pre>self.conv1 = nn.Conv2d(in_channels=<span class="st">3</span>, out_channels=<span class="st">64</span>, kernel_size=<span class="st">3</span>, padding=<span class="st">1</span>)
self.pool  = nn.MaxPool2d(kernel_size=<span class="st">2</span>, stride=<span class="st">2</span>)
self.conv2 = nn.Conv2d(<span class="st">64</span>, <span class="st">128</span>, kernel_size=<span class="st">3</span>, padding=<span class="st">1</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Sliding a kernel across an image is the same operation as a <a href="../markets/indicators/#sma" target="_blank" rel="noopener">moving average</a> sliding across a price series. Both detect local patterns through shared weights. In poetry, <a href="../poetry/forms/#pantoum" target="_blank" rel="noopener">pantoum</a> form slides repeated lines through new contexts.</div>
  <div class="topic-nav" id="nav-cnn"></div>
</div>`;
}

/* 24 — Embeddings */
function buildEmbeddings() {
  return `<div class="topic" id="embeddings">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Deep Learning</div><h2>Embeddings & <em>Word2Vec</em></h2></div>
    <span class="topic-badge">Representation</span>
  </div>
  <p class="sub">// Mapping discrete tokens to continuous vector spaces</p>
  <p class="prose">An embedding maps each discrete token to a dense vector where <strong>semantic similarity = geometric proximity</strong>.</p>
  <div class="fb"><div class="fm">Skip-gram: max Σ Σ log P(wₒ | wᵢ)</div><div class="fd">Predict surrounding words from centre word — forces similar words to nearby vectors</div></div>
  <div class="fb c2"><div class="fm">king − man + woman ≈ queen</div><div class="fd">Learned embeddings encode <span>analogical relationships</span> as linear vector arithmetic</div></div>
  <div class="va">
    <div class="vl">// 2D embedding space — semantic clusters</div>
    <canvas id="embCanvas" height="240"></canvas>
  </div>
  <div class="code-block"><pre>self.embed = nn.Embedding(vocab_size=<span class="st">50000</span>, embedding_dim=<span class="st">256</span>)
x = self.embed(token_ids)  <span class="cm"># (batch, seq) → (batch, seq, 256)</span></pre></div>
  <div class="callout"><strong>Modern embeddings:</strong> Word2Vec is the ancestor. Today BERT/GPT produce <em>contextual</em> embeddings — the same word gets different vectors depending on context.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Mapping tokens to vectors where distance = meaning is the same idea behind <a href="../llm/#embeddings" target="_blank" rel="noopener">LLM token embeddings</a>. In poetry, <a href="../poetry/rhetoric/#metaphor" target="_blank" rel="noopener">metaphor</a> is a human embedding — projecting one concept into the space of another.</div>
  <div class="topic-nav" id="nav-embeddings"></div>
</div>`;
}

/* 25 — Attention */
function buildAttention() {
  return `<div class="topic" id="attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Deep Learning</div><h2>Attention <em>Mechanism</em></h2></div>
    <span class="topic-badge">Architecture</span>
  </div>
  <p class="sub">// Selectively focusing on relevant parts of the input</p>
  <p class="prose">Each token asks: <strong>"which other tokens are most relevant to me?"</strong> via dot-product similarity between queries and keys.</p>
  <div class="fb"><div class="fm">Attention(Q,K,V) = softmax(QKᵀ / √d) · V</div><div class="fd"><span>Q</span> = Query &nbsp;|&nbsp; <span>K</span> = Key &nbsp;|&nbsp; <span>V</span> = Value &nbsp;|&nbsp; <span>√d</span> = scaling to prevent saturation</div></div>
  <div class="va">
    <div class="vl">// Attention heatmap — click cells to boost connections</div>
    <canvas id="attCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="rndAtt()">↺ RANDOMIZE</button>
      <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">Click cells to strengthen</span>
    </div>
  </div>
  <div class="callout info"><strong>Multi-Head Attention:</strong> Run h attention functions in parallel, each with different learned projections. Allows attending to syntax, semantics, and coreference simultaneously.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Selectively weighting inputs by relevance appears in <a href="../markets/indicators/#vwap" target="_blank" rel="noopener">VWAP</a> (volume-weighted attention to price) and <a href="../llm/#self-attention" target="_blank" rel="noopener">transformer self-attention</a>. In poetry, <a href="../poetry/sound/#refrain" target="_blank" rel="noopener">refrain</a> forces attention back to repeated lines.</div>
  <div class="topic-nav" id="nav-attention"></div>
</div>`;
}

/* 26 — Transformer */
function buildTransformer() {
  return `<div class="topic" id="transformer">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Deep Learning</div><h2>Transformer <em>Architecture</em></h2></div>
    <span class="topic-badge">Architecture</span>
  </div>
  <p class="sub">// The architecture behind BERT, GPT, and all modern LLMs</p>
  <p class="prose">The Transformer combines <strong>multi-head self-attention</strong> with position-wise feed-forward networks, residual connections, and layer normalisation.</p>
  <div class="fb"><div class="fm">PE(pos, 2i) = sin(pos/10000^(2i/d))</div><div class="fd"><span>Positional Encoding</span> — sine/cosine waves encode token position</div></div>
  <div class="fb c2"><div class="fm">FFN(x) = max(0, xW₁+b₁)W₂+b₂</div><div class="fd">Position-wise feed-forward: two linear layers with ReLU/GELU</div></div>
  <div class="fb c3"><div class="fm">x = LayerNorm(x + Sublayer(x))</div><div class="fd"><span>Residual + LayerNorm</span> — applied around every sublayer</div></div>
  <div class="va">
    <div class="vl">// Transformer block diagram</div>
    <canvas id="transCanvas" height="280"></canvas>
  </div>
  <div class="code-block"><pre>encoder_layer = nn.TransformerEncoderLayer(
    d_model=<span class="st">512</span>, nhead=<span class="st">8</span>, dim_feedforward=<span class="st">2048</span>,
    dropout=<span class="st">0.1</span>, norm_first=<span class="st">True</span>  <span class="cm"># Pre-LN (modern default)</span>
)
transformer = nn.TransformerEncoder(encoder_layer, num_layers=<span class="st">6</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The transformer block — attention + feed-forward + residual — is now the backbone of <a href="../llm/#transformer-block" target="_blank" rel="noopener">every modern LLM</a>. Its residual connections mirror how a <a href="../poetry/forms/#crown-of-sonnets" target="_blank" rel="noopener">crown of sonnets</a> carries forward lines from one poem to the next.</div>
  <div class="topic-nav" id="nav-transformer"></div>
</div>`;
}

/* 27 — Normalization Variants */
function buildNormalization() {
  return `<div class="topic" id="normalization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Deep Learning</div><h2>Normalization <em>Variants</em></h2></div>
    <span class="topic-badge">Architecture</span>
  </div>
  <p class="sub">// LayerNorm, RMSNorm, GroupNorm — which normalisation for which architecture</p>
  <p class="prose">Different architectures need different normalisation. <strong>BatchNorm</strong> works for CNNs, <strong>LayerNorm</strong> for transformers, <strong>RMSNorm</strong> for modern LLMs (faster, no mean subtraction).</p>
  <div class="fb"><div class="fm">LayerNorm: x̂ = (x − μ) / √(σ² + ε) · γ + β</div><div class="fd">Normalises over <span>features (last dim)</span> — independent of batch size. Standard for transformers.</div></div>
  <div class="fb c2"><div class="fm">RMSNorm: x̂ = x / RMS(x) · γ &nbsp;&nbsp; RMS(x) = √(Σxᵢ²/n)</div><div class="fd">Skips mean subtraction — <span>15% faster</span> than LayerNorm. Used in LLaMA, Mistral, Gemma.</div></div>
  <div class="fb c3"><div class="fm">GroupNorm: split channels into G groups, normalise each</div><div class="fd">Works with any batch size. <span>G=32</span> is common. Used in diffusion models (U-Net).</div></div>
  <table class="mt">
    <thead><tr><th>Method</th><th>Normalises Over</th><th>Batch-Dependent</th><th>Used In</th></tr></thead>
    <tbody>
      <tr><td><span class="tag t1">BatchNorm</span></td><td>Batch dim</td><td>Yes</td><td>CNNs, ResNets</td></tr>
      <tr><td><span class="tag t2">LayerNorm</span></td><td>Feature dim</td><td>No</td><td>BERT, GPT-2, ViT</td></tr>
      <tr><td><span class="tag t3">RMSNorm</span></td><td>Feature dim (no mean)</td><td>No</td><td>LLaMA, Mistral, Gemma</td></tr>
      <tr><td><span class="tag t4">GroupNorm</span></td><td>Channel groups</td><td>No</td><td>U-Net, diffusion</td></tr>
      <tr><td><span class="tag t2">InstanceNorm</span></td><td>Single sample, per-channel</td><td>No</td><td>Style transfer</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre>nn.LayerNorm(<span class="st">512</span>)                          <span class="cm"># standard transformers</span>

<span class="cm"># RMSNorm (not in PyTorch by default)</span>
<span class="kw">class</span> <span class="cl2">RMSNorm</span>(nn.Module):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, d, eps=<span class="st">1e-6</span>):
        super().__init__()
        self.w = nn.Parameter(torch.ones(d))
        self.eps = eps
    <span class="kw">def</span> <span class="fn">forward</span>(self, x):
        <span class="kw">return</span> x * torch.rsqrt(x.pow(<span class="st">2</span>).mean(-<span class="st">1</span>, keepdim=<span class="st">True</span>) + self.eps) * self.w</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> LayerNorm in transformers standardizes activations per sample — the same operation as <a href="../stats/#z-scores" target="_blank" rel="noopener">z-scoring</a>. It’s why <a href="../markets/indicators/#bollinger-bands" target="_blank" rel="noopener">Bollinger Bands</a> work: normalizing price by its own volatility reveals the signal beneath.</div>
  <div class="topic-nav" id="nav-normalization"></div>
</div>`;
}

/* 28 — RNN */
function buildRNN() {
  return `<div class="topic" id="rnn">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Sequence Models</div><h2>RNN — <em>Recurrent</em> Networks</h2></div>
    <span class="topic-badge">Sequential</span>
  </div>
  <p class="sub">// Processing sequences by passing hidden state through time</p>
  <p class="prose">RNNs process sequences step-by-step, maintaining a <strong>hidden state h</strong> that carries memory of previous inputs.</p>
  <div class="fb"><div class="fm">hₜ = tanh(Wₕ·hₜ₋₁ + Wₓ·xₜ + b)</div><div class="fd"><span>hₜ</span> = new hidden state &nbsp;|&nbsp; same weights reused at every timestep</div></div>
  <div class="va">
    <div class="vl">// RNN unrolled through time</div>
    <canvas id="rnnCanvas" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Seq length</span><input type="range" id="rnnLen" min="3" max="6" step="1" value="4" oninput="document.getElementById('rnnLenV').textContent=this.value;drawRNN()"><span class="vd" id="rnnLenV">4</span></div>
      <button class="btn" onclick="animRNN()">▶ ANIMATE</button>
      <button class="btn" onclick="resetRNN()">↺ RESET</button>
      <span id="rnnMsg" style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:8px">Click Animate</span>
    </div>
  </div>
  <div class="callout warn"><strong>Vanishing gradient:</strong> Gradients shrink exponentially over many timesteps. LSTM and GRU solve this with gated memory.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Hidden state flowing through time steps is sequential memory — like <a href="../markets/indicators/#ema" target="_blank" rel="noopener">exponential moving averages</a> where each value inherits from the past. In poetry, <a href="../poetry/sound/#enjambment" target="_blank" rel="noopener">enjambment</a> carries meaning across line breaks, one step to the next.</div>
  <div class="topic-nav" id="nav-rnn"></div>
</div>`;
}

/* 29 — LSTM */
function buildLSTM() {
  return `<div class="topic" id="lstm">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Sequence Models</div><h2>LSTM — <em>Long Short-Term</em> Memory</h2></div>
    <span class="topic-badge">Sequential</span>
  </div>
  <p class="sub">// Gated memory cells that solve the vanishing gradient problem</p>
  <p class="prose">LSTMs add a <strong>cell state c</strong> — a "memory highway" — alongside the hidden state. Three gates control information flow.</p>
  <div class="fb"><div class="fm">fₜ=σ(Wf·[hₜ₋₁,xₜ]) &nbsp; iₜ=σ(Wi·[hₜ₋₁,xₜ]) &nbsp; oₜ=σ(Wo·[hₜ₋₁,xₜ])</div><div class="fd"><span>f</span> = forget &nbsp;|&nbsp; <span>i</span> = input &nbsp;|&nbsp; <span>o</span> = output gates</div></div>
  <div class="fb c2"><div class="fm">cₜ = fₜ ⊙ cₜ₋₁ + iₜ ⊙ tanh(Wc·[hₜ₋₁,xₜ])</div><div class="fd">Cell state update: forget old + write new candidate</div></div>
  <div class="fb c3"><div class="fm">hₜ = oₜ ⊙ tanh(cₜ)</div><div class="fd">Hidden state = filtered cell state</div></div>
  <div class="va">
    <div class="vl">// LSTM gate diagram</div>
    <canvas id="lstmCanvas" height="280"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="highlightGate('forget')">FORGET</button>
      <button class="btn b2" onclick="highlightGate('input')">INPUT</button>
      <button class="btn b3" onclick="highlightGate('output')">OUTPUT</button>
      <button class="btn b4" onclick="highlightGate('all')">ALL</button>
    </div>
  </div>
  <div class="code-block"><pre>self.lstm = nn.LSTM(input_size=<span class="st">10</span>, hidden_size=<span class="st">64</span>, num_layers=<span class="st">2</span>,
                    batch_first=<span class="st">True</span>, dropout=<span class="st">0.2</span>)
out, (hn, cn) = self.lstm(x)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The forget gate decides what to keep and what to discard — the same selective memory behind <a href="../markets/psychology/#recency-bias" target="_blank" rel="noopener">recency bias</a>. In poetry, a <a href="../poetry/forms/#sestina" target="_blank" rel="noopener">sestina</a> has its own gating mechanism: rotating end-words that persist and recombine across stanzas.</div>
  <div class="topic-nav" id="nav-lstm"></div>
</div>`;
}

/* 30 — GRU */
function buildGRU() {
  return `<div class="topic" id="gru">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Sequence Models</div><h2>GRU — <em>Gated Recurrent</em> Unit</h2></div>
    <span class="topic-badge">Sequential</span>
  </div>
  <p class="sub">// LSTM's streamlined sibling — two gates, one state vector</p>
  <p class="prose">GRU simplifies LSTM by merging cell+hidden state and using only <strong>two gates</strong>: update and reset.</p>
  <div class="fb"><div class="fm">zₜ = σ(Wz·[hₜ₋₁,xₜ]) &nbsp;&nbsp; rₜ = σ(Wr·[hₜ₋₁,xₜ])</div><div class="fd"><span>z</span> = update gate &nbsp;|&nbsp; <span>r</span> = reset gate</div></div>
  <div class="fb c2"><div class="fm">h̃ₜ = tanh(W·[rₜ⊙hₜ₋₁, xₜ])</div><div class="fd">Candidate hidden state — gated by reset</div></div>
  <div class="fb c3"><div class="fm">hₜ = (1−zₜ)⊙hₜ₋₁ + zₜ⊙h̃ₜ</div><div class="fd">Interpolate between old and new state via update gate</div></div>
  <div class="va">
    <div class="vl">// RNN vs GRU vs LSTM — parameter count comparison</div>
    <canvas id="gruCanvas" height="230"></canvas>
  </div>
  <div class="callout"><strong>When to use which:</strong> <strong style="color:var(--accent)">RNN</strong> — quick baseline. <strong style="color:var(--accent2)">GRU</strong> — best default for seq tasks. <strong style="color:var(--accent3)">LSTM</strong> — complex long-range deps. <strong style="color:var(--accent4)">Transformer</strong> — lots of data + GPU.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> GRU merges forget and input into a single update gate — elegant reduction. The same economy appears in a <a href="../poetry/forms/#haiku" target="_blank" rel="noopener">haiku</a>: maximum meaning, minimal structure. In markets, <a href="../markets/indicators/#rsi" target="_blank" rel="noopener">RSI</a> compresses momentum into one number.</div>
  <div class="topic-nav" id="nav-gru"></div>
</div>`;
}

/* 31 — PCA */
function buildPCA() {
  return `<div class="topic" id="pca">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">31 — Generative & Prob.</div><h2>PCA & <em>Eigenvectors</em></h2></div>
    <span class="topic-badge">Dimensionality</span>
  </div>
  <p class="sub">// Finding the directions of maximum variance for dimensionality reduction</p>
  <p class="prose">PCA finds the axes along which data <strong>varies the most</strong>. These are the eigenvectors of the covariance matrix.</p>
  <div class="fb"><div class="fm">C = (1/n)·XᵀX &nbsp;&nbsp;&nbsp; Cv = λv</div><div class="fd"><span>C</span> = covariance matrix &nbsp;|&nbsp; <span>v</span> = eigenvector &nbsp;|&nbsp; <span>λ</span> = eigenvalue (variance explained)</div></div>
  <div class="va">
    <div class="vl">// 2D data with principal components — adjust correlation</div>
    <canvas id="pcaCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Correlation</span><input type="range" id="pcaCorr" min="0" max="0.98" step="0.01" value="0.7" oninput="onPCA(this.value)"><span class="vd" id="pcaCorrV">0.70</span></div>
      <div class="cg"><span class="cl">PC1 explains</span><span class="vd" id="pc1V">—</span></div>
      <div class="cg"><span class="cl">PC2 explains</span><span class="vd" id="pc2V" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Finding the axis of maximum variance is the geometric core of <a href="../stats/#variance-std" target="_blank" rel="noopener">variance</a> itself. In markets, <a href="../markets/indicators/#adx" target="_blank" rel="noopener">ADX</a> extracts the principal direction of trend from noisy price data. In poetry, a <a href="../poetry/rhetoric/#motif" target="_blank" rel="noopener">motif</a> is the principal component of a poem — the recurring theme that explains the most.</div>
  <div class="topic-nav" id="nav-pca"></div>
</div>`;
}

/* 32 — SVD */
function buildSVD() {
  return `<div class="topic" id="svd">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">32 — Generative & Prob.</div><h2>SVD — <em>Singular Value</em> Decomposition</h2></div>
    <span class="topic-badge">Linear Algebra</span>
  </div>
  <p class="sub">// Decomposing any matrix into rotation, scaling, and rotation</p>
  <p class="prose">SVD factors <strong>any matrix</strong> into three parts: A = UΣVᵀ. It's the Swiss Army knife of linear algebra — used in PCA, compression, recommenders, and the mathematical foundation of LoRA.</p>
  <div class="fb"><div class="fm">A = UΣVᵀ</div><div class="fd"><span>U</span> = left singular vectors (m×m) &nbsp;|&nbsp; <span>Σ</span> = diagonal singular values &nbsp;|&nbsp; <span>Vᵀ</span> = right singular vectors (n×n)</div></div>
  <div class="fb c2"><div class="fm">A ≈ U_r · Σ_r · V_r^T &nbsp;&nbsp; (rank-r approximation)</div><div class="fd">Keep only top-r singular values → best rank-r approximation (Eckart-Young theorem)</div></div>
  <div class="va">
    <div class="vl">// Low-rank approximation — how many singular values do you need?</div>
    <canvas id="svdCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Rank r</span><input type="range" id="svdR" min="1" max="10" step="1" value="3" oninput="drawSVD()"><span class="vd" id="svdRV">3</span></div>
      <div class="cg"><span class="cl">Energy kept</span><span class="vd" id="svdEnergy" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre>U, S, Vt = torch.linalg.svd(A)           <span class="cm"># full SVD</span>
A_approx = U[:, :r] @ torch.diag(S[:r]) @ Vt[:r, :]  <span class="cm"># rank-r</span>

<span class="cm"># NumPy equivalent</span>
U, s, Vt = np.linalg.svd(A, full_matrices=<span class="st">False</span>)</pre></div>
  <div class="callout info"><strong>SVD → LoRA:</strong> LoRA exploits the fact that weight updates during fine-tuning are often low-rank. Instead of updating a full (d×d) matrix, it learns two small matrices (d×r) and (r×d) where r ≪ d. This is fundamentally SVD thinking.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Decomposing a matrix into rank-1 layers is the math behind <a href="../stats/#correlation" target="_blank" rel="noopener">factor analysis</a> in statistics and <a href="../llm/#lora-qlora" target="_blank" rel="noopener">LoRA’s low-rank updates</a>. Any signal can be decomposed into layers of importance — like peeling back the <a href="../poetry/rhetoric/#allegory" target="_blank" rel="noopener">allegorical layers</a> of a poem.</div>
  <div class="topic-nav" id="nav-svd"></div>
</div>`;
}

/* 33 — VAE */
function buildVAE() {
  return `<div class="topic" id="vae">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">33 — Generative & Prob.</div><h2>VAE — Variational <em>Autoencoder</em></h2></div>
    <span class="topic-badge">Generative</span>
  </div>
  <p class="sub">// Learning a structured latent space for generation and interpolation</p>
  <p class="prose">A VAE encodes inputs to a <strong>distribution over latent vectors</strong>, then decodes samples. The KL term forces a smooth, continuous latent space.</p>
  <div class="fb"><div class="fm">ELBO = E[log p(x|z)] − KL(q(z|x) || p(z))</div><div class="fd"><span>ELBO</span> = reconstruction + KL regularization</div></div>
  <div class="fb c2"><div class="fm">z = μ + σ·ε &nbsp;&nbsp; ε ~ N(0,1)</div><div class="fd"><span>Reparameterization trick:</span> makes sampling differentiable</div></div>
  <div class="va">
    <div class="vl">// VAE architecture diagram</div>
    <canvas id="vaeCanvas" height="240"></canvas>
  </div>
  <div class="code-block"><pre><span class="kw">class</span> <span class="cl2">VAE</span>(nn.Module):
    <span class="kw">def</span> <span class="fn">forward</span>(self, x):
        mu, log_var = self.encode(x)
        z = mu + torch.exp(<span class="st">0.5</span>*log_var) * torch.randn_like(mu)
        return self.decode(z), mu, log_var

<span class="kw">def</span> <span class="fn">vae_loss</span>(recon_x, x, mu, log_var):
    recon = F.mse_loss(recon_x, x)
    kl    = <span class="st">-0.5</span> * torch.mean(<span class="st">1</span> + log_var - mu**<span class="st">2</span> - log_var.exp())
    <span class="kw">return</span> recon + kl</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Encoding data into a structured latent space, then decoding it, mirrors how a <a href="../poetry/forms/#ghazal" target="_blank" rel="noopener">ghazal</a> compresses longing into couplets that radiate meaning when unpacked. The KL term is a <a href="../stats/#normal" target="_blank" rel="noopener">normal distribution</a> regularizer — pulling the latent space toward Gaussian structure.</div>
  <div class="topic-nav" id="nav-vae"></div>
</div>`;
}

/* 34 — Diffusion */
function buildDiffusion() {
  return `<div class="topic" id="diffusion">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">34 — Generative & Prob.</div><h2>Diffusion <em>Models</em></h2></div>
    <span class="topic-badge">Generative</span>
  </div>
  <p class="sub">// Generating by learning to reverse a noise process (DDPM, Stable Diffusion)</p>
  <p class="prose">Diffusion models learn to <strong>denoise data</strong>. The forward process adds noise; a neural network learns to reverse it.</p>
  <div class="fb"><div class="fm">Forward: q(xₜ|xₜ₋₁) = N(xₜ; √(1−β)·xₜ₋₁, β·I)</div><div class="fd">Adds noise β at each step. After T steps, data ≈ pure Gaussian noise.</div></div>
  <div class="fb c2"><div class="fm">xₜ = √ᾱₜ·x₀ + √(1−ᾱₜ)·ε &nbsp;&nbsp; ε~N(0,I)</div><div class="fd">Closed form for any timestep t.</div></div>
  <div class="fb c3"><div class="fm">L = E[||ε − εθ(xₜ,t)||²]</div><div class="fd">Training: predict the noise ε that was added.</div></div>
  <div class="va">
    <div class="vl">// Forward diffusion — noise being added over timesteps</div>
    <canvas id="diffCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Timestep t</span><input type="range" id="diffT" min="0" max="100" step="1" value="0" oninput="drawDiffusion(this.value)"><span class="vd" id="diffTV">0</span></div>
      <button class="btn" onclick="animDiff()">▶ FORWARD PROCESS</button>
    </div>
  </div>
  <div class="callout info"><strong>DDPM → DDIM → Latent Diffusion:</strong> DDPM (2020). DDIM made sampling 10–50× faster. Latent Diffusion (Stable Diffusion) runs in compressed latent space — enabling image generation on consumer GPUs.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Adding noise then learning to reverse it mirrors <a href="../stats/#central-limit" target="_blank" rel="noopener">the central limit theorem</a> in reverse — from Gaussian noise back to structured signal. In markets, <a href="../markets/psychology/#euphoria-panic" target="_blank" rel="noopener">euphoria and panic</a> inject noise that mean-reverts to equilibrium.</div>
  <div class="topic-nav" id="nav-diffusion"></div>
</div>`;
}

/* 35 — GAN */
function buildGAN() {
  return `<div class="topic" id="gan">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">35 — Generative & Prob.</div><h2>GANs — Generative <em>Adversarial</em> Networks</h2></div>
    <span class="topic-badge">Generative</span>
  </div>
  <p class="sub">// Two networks competing: generator vs discriminator</p>
  <p class="prose">GANs pit a <strong>Generator G</strong> against a <strong>Discriminator D</strong> in a minimax game.</p>
  <div class="fb"><div class="fm">min_G max_D V(D,G) = E[log D(x)] + E[log(1−D(G(z)))]</div><div class="fd">Minimax objective: at equilibrium D(x) = 0.5 everywhere.</div></div>
  <div class="va">
    <div class="vl">// GAN training dynamics</div>
    <canvas id="ganCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animGAN()">▶ SIMULATE TRAINING</button>
      <button class="btn" onclick="resetGAN()">↺ RESET</button>
      <span id="ganMsg" style="font-family:var(--mono);font-size:10px;color:var(--muted)"></span>
    </div>
  </div>
  <div class="callout warn"><strong>Mode collapse:</strong> The biggest GAN failure — G learns only a few convincing samples. WGAN and gradient penalty (WGAN-GP) are the standard fixes.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The generator-discriminator game is <a href="../poetry/rhetoric/#antithesis" target="_blank" rel="noopener">antithesis</a> as architecture: two opposing forces that produce something neither could alone. In markets, <a href="../markets/psychology/#contrarian-thinking" target="_blank" rel="noopener">contrarian vs. herd</a> is the same adversarial dynamic.</div>
  <div class="topic-nav" id="nav-gan"></div>
</div>`;
}

/* 36 — Tokenization (BPE) */
function buildTokenization() {
  return `<div class="topic" id="tokenization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">36 — Modern / LLM</div><h2>Tokenization <em>(BPE)</em></h2></div>
    <span class="topic-badge">NLP</span>
  </div>
  <p class="sub">// How text becomes numbers — the first step in every language model</p>
  <p class="prose">Byte Pair Encoding (BPE) builds a vocabulary by <strong>iteratively merging the most frequent pair</strong> of tokens. It handles unseen words via subword splitting — no unknown tokens needed.</p>
  <div class="fb"><div class="fm">BPE: repeatedly merge most frequent adjacent pair</div><div class="fd">"lowest" → ["low", "est"] or ["l", "ow", "est"] depending on learned merges</div></div>
  <div class="fb c2"><div class="fm">Vocab size: typically 32k–128k tokens</div><div class="fd">GPT-2: 50,257 &nbsp;|&nbsp; LLaMA: 32,000 &nbsp;|&nbsp; GPT-4: ~100,000</div></div>
  <div class="va">
    <div class="vl">// BPE merge process — watch vocabulary build up</div>
    <canvas id="bpeCanvas" height="220"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animBPE()">▶ RUN MERGES</button>
      <button class="btn" onclick="resetBPE()">↺ RESET</button>
      <span id="bpeMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px"></span>
    </div>
  </div>
  <div class="steps">
    <div class="step"><div class="sn">1</div><div><h4>Start with characters</h4><p>Initial vocabulary = all unique bytes/characters in corpus</p></div></div>
    <div class="step"><div class="sn">2</div><div><h4>Count adjacent pairs</h4><p>Find the most frequent pair of consecutive tokens</p></div></div>
    <div class="step"><div class="sn">3</div><div><h4>Merge & add to vocab</h4><p>Replace all occurrences. New token added to vocabulary.</p></div></div>
    <div class="step"><div class="sn">4</div><div><h4>Repeat until vocab_size</h4><p>Continue until target vocabulary size reached (e.g., 50k)</p></div></div>
  </div>
  <div class="code-block"><pre><span class="cm"># tiktoken (OpenAI's fast BPE)</span>
<span class="kw">import</span> tiktoken
enc = tiktoken.encoding_for_model(<span class="st">"gpt-4"</span>)
tokens = enc.encode(<span class="st">"Hello, world!"</span>)          <span class="cm"># [9906, 11, 1917, 0]</span>
text = enc.decode(tokens)                       <span class="cm"># "Hello, world!"</span>

<span class="cm"># HuggingFace tokenizers</span>
<span class="kw">from</span> transformers <span class="kw">import</span> AutoTokenizer
tok = AutoTokenizer.from_pretrained(<span class="st">"meta-llama/Llama-2-7b"</span>)</pre></div>
  <div class="callout"><strong>Why it matters:</strong> Tokenization determines the model's "eyesight". Poor tokenization (e.g., splitting numbers digit-by-digit) directly hurts performance. Modern models train their own tokenizer on their specific data.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Byte Pair Encoding merges frequent pairs into tokens — the same compression principle behind <a href="../llm/#tokenization" target="_blank" rel="noopener">LLM vocabularies</a>. In poetry, <a href="../poetry/rhetoric/#metonymy" target="_blank" rel="noopener">metonymy</a> compresses a whole concept into a single word. In statistics, <a href="../stats/#percentiles" target="_blank" rel="noopener">binning into percentiles</a> is discretization of continuous data.</div>
  <div class="topic-nav" id="nav-tokenization"></div>
</div>`;
}

/* 37 — LoRA */
function buildLoRA() {
  return `<div class="topic" id="lora">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">37 — Modern / LLM</div><h2>LoRA — <em>Low-Rank</em> Adaptation</h2></div>
    <span class="topic-badge">Fine-tuning</span>
  </div>
  <p class="sub">// Training billion-parameter models by updating only tiny low-rank matrices</p>
  <p class="prose">LoRA freezes the original weights and injects <strong>small trainable rank-r matrices</strong> alongside each layer. Instead of updating a d×d weight matrix (millions of params), you update d×r + r×d (thousands).</p>
  <div class="fb"><div class="fm">W' = W + ΔW = W + B·A &nbsp;&nbsp; B ∈ ℝ^(d×r), A ∈ ℝ^(r×d)</div><div class="fd"><span>W</span> = frozen original weights &nbsp;|&nbsp; <span>B·A</span> = low-rank update &nbsp;|&nbsp; <span>r</span> = rank (4–64 typical)</div></div>
  <div class="fb c2"><div class="fm">Params: d² → 2·d·r &nbsp;&nbsp; (e.g., 4096² = 16.7M → 2·4096·16 = 131K)</div><div class="fd">A 99.2% reduction in trainable parameters for rank r=16</div></div>
  <div class="va">
    <div class="vl">// Parameter savings — full fine-tuning vs LoRA</div>
    <canvas id="loraCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model dim d</span><input type="range" id="loraD" min="256" max="8192" step="256" value="4096" oninput="drawLoRA()"><span class="vd" id="loraDV">4096</span></div>
      <div class="cg"><span class="cl">Rank r</span><input type="range" id="loraR" min="1" max="64" step="1" value="16" oninput="drawLoRA()"><span class="vd" id="loraRV">16</span></div>
      <div class="cg"><span class="cl">Savings</span><span class="vd" id="loraSave" style="color:var(--accent2)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Using PEFT library</span>
<span class="kw">from</span> peft <span class="kw">import</span> LoraConfig, get_peft_model

config = LoraConfig(
    r=<span class="st">16</span>,                    <span class="cm"># rank</span>
    lora_alpha=<span class="st">32</span>,           <span class="cm"># scaling factor</span>
    target_modules=[<span class="st">"q_proj"</span>, <span class="st">"v_proj"</span>],  <span class="cm"># which layers</span>
    lora_dropout=<span class="st">0.05</span>,
)
model = get_peft_model(base_model, config)
model.print_trainable_parameters()  <span class="cm"># "trainable: 0.1% of total"</span></pre></div>
  <div class="callout"><strong>QLoRA</strong> takes this further: quantise the frozen weights to 4-bit, then apply LoRA. This enables fine-tuning a 65B model on a single 48GB GPU.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Low-rank adaptation fine-tunes with tiny matrices — the same rank reduction as <a href="../stats/#correlation" target="_blank" rel="noopener">principal components</a>. <a href="../llm/#lora-qlora" target="_blank" rel="noopener">LoRA in LLM engineering</a> is the applied version. In poetry, a <a href="../poetry/forms/#modern-sonnet" target="_blank" rel="noopener">modern sonnet</a> adapts the old form with minimal changes — low-rank modification of tradition.</div>
  <div class="topic-nav" id="nav-lora"></div>
</div>`;
}

/* 38 — RLHF */
function buildRLHF() {
  return `<div class="topic" id="rlhf">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">38 — Modern / LLM</div><h2>RLHF — <em>Alignment</em></h2></div>
    <span class="topic-badge">Alignment</span>
  </div>
  <p class="sub">// Making language models helpful, harmless, and honest with human feedback</p>
  <p class="prose">RLHF aligns a pretrained LLM with human preferences in three stages: supervised fine-tuning, reward model training, and PPO optimization. <strong>DPO</strong> simplifies this to a single training step.</p>
  <div class="fb"><div class="fm">Stage 1: SFT — fine-tune on high-quality demonstrations</div><div class="fd">Supervised fine-tuning on curated instruction-response pairs</div></div>
  <div class="fb c2"><div class="fm">Stage 2: Reward Model — R(x,y) trained on human preferences</div><div class="fd">Human annotators rank outputs; model learns to predict which response humans prefer</div></div>
  <div class="fb c3"><div class="fm">Stage 3: PPO — max E[R(x,y)] − β·KL(π||π_ref)</div><div class="fd">Optimise policy to maximise reward while staying close to SFT model (prevents reward hacking)</div></div>
  <div class="fb c4"><div class="fm">DPO: L = −log σ(β(log π(y_w|x)/π_ref(y_w|x) − log π(y_l|x)/π_ref(y_l|x)))</div><div class="fd"><span>DPO</span> = Direct Preference Optimization — no reward model needed. Simpler, more stable.</div></div>
  <div class="va">
    <div class="vl">// RLHF pipeline — three-stage process</div>
    <canvas id="rlhfCanvas" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animRLHF()">▶ WALK THROUGH</button>
      <button class="btn" onclick="resetRLHF()">↺ RESET</button>
      <span id="rlhfMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px"></span>
    </div>
  </div>
  <div class="callout info"><strong>DPO vs RLHF:</strong> DPO reformulates RLHF as a simple classification loss on preference pairs — no reward model, no PPO, no RL instability. LLaMA 2, Zephyr, and many modern models use DPO.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Training a reward model from human preferences connects to <a href="../llm/#rlhf" target="_blank" rel="noopener">RLHF in LLM alignment</a> and <a href="../stats/#hypothesis-testing" target="_blank" rel="noopener">preference testing</a> in statistics. In markets, <a href="../markets/psychology/#herd-behavior" target="_blank" rel="noopener">herd behavior</a> is collective preference shaping price — the market’s reward signal.</div>
  <div class="topic-nav" id="nav-rlhf"></div>
</div>`;
}
