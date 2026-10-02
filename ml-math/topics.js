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
/* depth:start — generated from the scratch scripts mlmath_snippets.py / mlmath_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "vectors": {
  "example": "For a = (1, 2, 3) and b = (4, 5, 6) the dot product is <strong>32</strong>; divided by their lengths it gives a cosine of <strong>0.975</strong>, an angle of <strong>12.9°</strong>. A 2×3 matrix times a 3×4 matrix gives a <strong>2×4</strong> result — the inner sizes must match and disappear. And (AB)ᵀ = BᵀAᵀ holds (<strong>True</strong>): transposing a product reverses its order.",
  "fails": [
   "Shape errors are the most common bug in ML code; broadcasting can hide them by silently stretching a vector instead of failing.",
   "The dot product mixes direction and length; for similarity you usually want the cosine.",
   "Intuitions from 2 or 3 dimensions mislead in high dimensions, where random vectors are almost always nearly perpendicular."
  ],
  "code": "a, b = np.array([1, 2, 3]), np.array([4, 5, 6])\ndot = a @ b\ncos = dot / (np.linalg.norm(a) * np.linalg.norm(b))\nangle = np.degrees(np.arccos(cos))\nA, B = np.ones((2, 3)), np.ones((3, 4))\nshape = (A @ B).shape                       # (2,3) x (3,4): inner sizes must match\ntranspose_rule = np.allclose((A @ B).T, B.T @ A.T)",
  "sources": [
   "<em>Introduction to Linear Algebra</em> (5th ed.), G. Strang, Wellesley-Cambridge Press, 2016",
   "<em>Deep Learning</em>, I. Goodfellow, Y. Bengio &amp; A. Courville, MIT Press, 2016 — chapter 2"
  ]
 },
 "linear": {
  "example": "Six points that lie roughly on y = 2x. Least squares finds slope <strong>2.02</strong> and intercept <strong>−0.02</strong>, with a mean squared error of <strong>0.021</strong>. With one input and a closed-form solution there is nothing to tune: the fit is the answer to a single matrix equation.",
  "fails": [
   "A good fit does not mean a straight line is right; always plot the residuals.",
   "Least squares is pulled hard by outliers, because errors are squared (see Loss Functions).",
   "Coefficients are only interpretable as effects when inputs are not strongly correlated (see Regularization)."
  ],
  "code": "x = np.array([1, 2, 3, 4, 5, 6], dtype=float)\ny = np.array([2.1, 3.9, 6.2, 7.8, 10.1, 12.2])            # made up, roughly y = 2x\nX = np.column_stack([x, np.ones_like(x)])\n(w, b), *_ = np.linalg.lstsq(X, y, rcond=None)             # least squares, closed form\nmse = np.mean((y - (w * x + b)) ** 2)",
  "sources": [
   "<em>The Elements of Statistical Learning</em> (2nd ed.), T. Hastie, R. Tibshirani &amp; J. Friedman, Springer, 2009 — chapter 3",
   "<em>Pattern Recognition and Machine Learning</em>, C. M. Bishop, Springer, 2006 — chapter 3"
  ]
 },
 "logistic": {
  "example": "With w = 1.5, b = −2 and x = 3, the score is 2.5 and the sigmoid turns it into <strong>P = 0.924</strong>. Cross-entropy punishes confident mistakes hard: predicting 0.9 for a true 1 costs <strong>0.105</strong>, predicting 0.1 costs <strong>2.303</strong> — 22 times more. The gradient is simply (p − y)·x, here <strong>−0.228</strong>.",
  "fails": [
   "The output is a probability only if the model is calibrated; strong regularization or class rebalancing shifts it.",
   "The decision boundary is linear in the inputs; curved boundaries need features or a different model.",
   "With perfectly separable data the weights grow without limit unless regularized."
  ],
  "code": "sigmoid = lambda z: 1 / (1 + np.exp(-z))\nbce = lambda y, p: -(y * np.log(p) + (1 - y) * np.log(1 - p))\nw, b, x = 1.5, -2.0, 3.0\np = sigmoid(w * x + b)                      # P(y = 1 | x)\nloss_right = bce(1, 0.9)                    # confident and right\nloss_wrong = bce(1, 0.1)                    # confident and wrong\ngrad_w = (p - 1) * x                        # dBCE/dw for a true label y = 1",
  "sources": [
   "D. R. Cox, “The Regression Analysis of Binary Sequences”, <em>Journal of the Royal Statistical Society B</em> 20(2), 1958",
   "<em>The Elements of Statistical Learning</em> (2nd ed.), T. Hastie, R. Tibshirani &amp; J. Friedman, Springer, 2009 — chapter 4"
  ]
 },
 "gradient": {
  "example": "Minimising (w − 3)² from w = 0. With a learning rate of 0.1, ten steps reach <strong>2.68</strong>, closing in on 3. With 1.1 each step overshoots further than the last and ten steps end at <strong>−15.6</strong>. For this curve any rate above 1 diverges: the step size is not a detail, it decides whether learning happens at all.",
  "fails": [
   "Real loss surfaces are not one bowl; gradient descent finds a nearby low point, not the lowest.",
   "A good learning rate depends on the curvature, which differs between directions (see Optimizers).",
   "Stochastic gradients from mini-batches are noisy; the loss does not fall every step."
  ],
  "code": "def descend(lr, steps=10, w=0.0):\n    for _ in range(steps):\n        w -= lr * 2 * (w - 3)               # gradient of (w - 3)^2\n    return w\n\ngood = descend(0.1)                          # converging towards 3\ntoo_big = descend(1.1)                       # each step overshoots further",
  "sources": [
   "<em>Deep Learning</em>, I. Goodfellow, Y. Bengio &amp; A. Courville, MIT Press, 2016 — chapter 4",
   "<em>Convex Optimization</em>, S. Boyd &amp; L. Vandenberghe, Cambridge University Press, 2004 — chapter 9"
  ]
 },
 "activation": {
  "example": "Two linear layers, 4 → 8 → 3, applied to 100 inputs give the same output as the single matrix W2·W1 — the largest difference is <strong>4×10⁻¹⁵</strong>, rounding error. Put a ReLU between them and outputs differ by up to <strong>15.7</strong>. Without a non-linearity, depth adds nothing.",
  "fails": [
   "ReLU units can “die”: once their input is always negative they output zero and stop learning.",
   "Sigmoid and tanh saturate, giving tiny gradients at large inputs; they were a main cause of vanishing gradients.",
   "The universal approximation theorem says a wide enough network can represent a function, not that training will find it."
  ],
  "code": "rng = np.random.default_rng(0)\nW1, W2 = rng.normal(size=(8, 4)), rng.normal(size=(3, 8))\nx = rng.normal(size=(4, 100))\ntwo_linear = W2 @ (W1 @ x)\none_linear = (W2 @ W1) @ x                  # the same map, one matrix\ncollapse_gap = np.abs(two_linear - one_linear).max()\nwith_relu = W2 @ np.maximum(W1 @ x, 0)\nrelu_gap = np.abs(with_relu - one_linear).max()",
  "sources": [
   "G. Cybenko, “Approximation by Superpositions of a Sigmoidal Function”, <em>Mathematics of Control, Signals and Systems</em> 2(4), 1989",
   "X. Glorot, A. Bordes &amp; Y. Bengio, “Deep Sparse Rectifier Neural Networks”, <em>AISTATS</em>, 2011",
   "D. Hendrycks &amp; K. Gimpel, “Gaussian Error Linear Units (GELUs)”, arXiv:1606.08415, 2016"
  ]
 },
 "bias-variance": {
  "example": "Fit polynomials to 200 noisy samples of a sine wave, 30 points each, and compare the fits. A straight line (degree 1) has squared bias <strong>0.155</strong> and variance <strong>0.020</strong>: consistently wrong. Degree 3 has <strong>0.003</strong> and <strong>0.014</strong>: about right. Degree 9 has almost no bias, <strong>0.007</strong>, but variance <strong>0.962</strong>: it chases the noise in each sample.",
  "fails": [
   "Very large neural networks can generalise better as they grow past the point of fitting the training data (“double descent”, Belkin et al. 2019); the classic U-curve is not the whole story.",
   "Bias and variance are properties of a method across datasets; one fitted model has neither on its own.",
   "More data reduces variance, not bias."
  ],
  "code": "rng = np.random.default_rng(1)\nf = lambda x: np.sin(2 * np.pi * x)\nx_test = np.linspace(0.05, 0.95, 50)\n\ndef bias_var(degree, sets=200, n=30, noise=0.3):\n    preds = []\n    for _ in range(sets):                    # many training sets from the same world\n        x = rng.random(n); y = f(x) + rng.normal(0, noise, n)\n        preds.append(np.polyval(np.polyfit(x, y, degree), x_test))\n    preds = np.array(preds)\n    return ((preds.mean(0) - f(x_test)) ** 2).mean(), preds.var(0).mean()\n\nresult = {d: np.round(bias_var(d), 3).tolist() for d in (1, 3, 9)}   # degree: [bias^2, variance]",
  "sources": [
   "S. Geman, E. Bienenstock &amp; R. Doursat, “Neural Networks and the Bias/Variance Dilemma”, <em>Neural Computation</em> 4(1), 1992",
   "M. Belkin, D. Hsu, S. Ma &amp; S. Mandal, “Reconciling Modern Machine-Learning Practice and the Classical Bias–Variance Trade-off”, <em>PNAS</em> 116(32), 2019",
   "<em>The Elements of Statistical Learning</em> (2nd ed.), T. Hastie, R. Tibshirani &amp; J. Friedman, Springer, 2009"
  ]
 },
 "loss": {
  "example": "Five targets, 1, 2, 2, 3 and an outlier at 30. The single constant that minimises squared error is <strong>7.6</strong> — the mean, dragged towards the outlier. The constant that minimises absolute error is <strong>2</strong> — the median, which ignores it. Choosing a loss is choosing which summary of the data the model is aiming at.",
  "fails": [
   "MSE is right when errors are roughly Gaussian; with heavy tails it is dominated by a few points. Huber’s loss is the compromise.",
   "The loss you train on and the metric you care about are often different; optimising one does not guarantee the other.",
   "Cross-entropy on imbalanced classes is dominated by the majority class unless weighted."
  ],
  "code": "y = np.array([1, 2, 2, 3, 30.0])               # one outlier\nc = np.linspace(0, 30, 30001)                      # candidate constant predictions\nmse = ((y[:, None] - c) ** 2).mean(0)\nmae = np.abs(y[:, None] - c).mean(0)\nbest_mse, best_mae = c[mse.argmin()], c[mae.argmin()]   # the mean and the median",
  "sources": [
   "P. J. Huber, “Robust Estimation of a Location Parameter”, <em>Annals of Mathematical Statistics</em> 35(1), 1964",
   "<em>The Elements of Statistical Learning</em> (2nd ed.), T. Hastie, R. Tibshirani &amp; J. Friedman, Springer, 2009",
   "<em>Deep Learning</em>, I. Goodfellow, Y. Bengio &amp; A. Courville, MIT Press, 2016 — chapter 6"
  ]
 },
 "backprop": {
  "example": "A one-unit network: h = ReLU(w₁x), y = w₂h, loss ½(y − t)². With x = 2, t = 1, w₁ = 0.5 and w₂ = −1.5, the chain rule gives ∂L/∂w₁ = <strong>7.5</strong> and ∂L/∂w₂ = <strong>−2.5</strong>. Nudging w₁ by a millionth and measuring the change gives <strong>7.4999999999</strong>: the gradient check every hand-written backward pass should pass.",
  "fails": [
   "Backprop computes gradients exactly; it says nothing about whether following them leads somewhere good.",
   "At ReLU’s kink the derivative is undefined; frameworks pick a value, which rarely matters but breaks naive gradient checks exactly at zero.",
   "Long chains multiply many factors, which is where vanishing and exploding gradients come from (see RNN)."
  ],
  "code": "x, t = 2.0, 1.0                                  # input and target\nw1, w2 = 0.5, -1.5\n\ndef loss(w1, w2):\n    h = max(w1 * x, 0)                             # ReLU hidden unit\n    return 0.5 * (w2 * h - t) ** 2\n\nh = max(w1 * x, 0); y = w2 * h\ndL_dy = y - t\ngrad_w2 = dL_dy * h                                # chain rule, backwards\ngrad_w1 = dL_dy * w2 * (1 if w1 * x &gt; 0 else 0) * x\neps = 1e-6                                         # check against finite differences\nnum_w1 = (loss(w1 + eps, w2) - loss(w1 - eps, w2)) / (2 * eps)",
  "sources": [
   "D. E. Rumelhart, G. E. Hinton &amp; R. J. Williams, “Learning Representations by Back-Propagating Errors”, <em>Nature</em> 323, 1986",
   "A. G. Baydin, B. A. Pearlmutter, A. A. Radul &amp; J. M. Siskind, “Automatic Differentiation in Machine Learning: A Survey”, <em>Journal of Machine Learning Research</em> 18(153), 2018"
  ]
 },
 "optimizers": {
  "example": "A narrow valley, 50 times steeper in one direction than the other, started from (10, 1). Plain gradient descent, with a step close to the largest the steep direction allows, needs <strong>152</strong> steps to get the loss under 0.001. Momentum needs <strong>93</strong>, and Adam, which scales each direction separately, <strong>80</strong>. The difference is how they cope with uneven curvature.",
  "fails": [
   "Each optimizer was given hand-picked settings here; with other settings the ranking can change. Optimizer comparisons are only as fair as their tuning.",
   "Adaptive methods can converge faster but generalise worse than well-tuned SGD on some tasks (Wilson et al. 2017).",
   "Toy valleys are smooth and deterministic; real training adds noise from mini-batches."
  ],
  "code": "grad = lambda p: np.array([p[0], 50 * p[1]])        # f = 0.5 (x^2 + 50 y^2): a narrow valley\nf = lambda p: 0.5 * (p[0] ** 2 + 50 * p[1] ** 2)\n\ndef steps_to(update, tol=1e-3, limit=10_000):\n    p, state = np.array([10.0, 1.0]), {}\n    for k in range(1, limit + 1):\n        p = update(p, grad(p), state, k)\n        if f(p) &lt; tol: return k\n    return limit\n\ndef sgd(p, g, s, k): return p - 0.035 * g\ndef momentum(p, g, s, k):\n    s['v'] = 0.9 * s.get('v', 0) - 0.035 * g; return p + s['v']\ndef adam(p, g, s, k, lr=0.5, b1=0.9, b2=0.999):\n    s['m'] = b1 * s.get('m', 0) + (1 - b1) * g; s['v'] = b2 * s.get('v', 0) + (1 - b2) * g * g\n    m, v = s['m'] / (1 - b1 ** k), s['v'] / (1 - b2 ** k)\n    return p - lr * m / (np.sqrt(v) + 1e-8)\n\nresult = {name: steps_to(u) for name, u in [('sgd', sgd), ('momentum', momentum), ('adam', adam)]}",
  "sources": [
   "D. P. Kingma &amp; J. Ba, “Adam: A Method for Stochastic Optimization”, <em>ICLR</em>, 2015",
   "B. T. Polyak, “Some Methods of Speeding Up the Convergence of Iteration Methods”, <em>USSR Computational Mathematics and Mathematical Physics</em> 4(5), 1964",
   "A. C. Wilson et al., “The Marginal Value of Adaptive Gradient Methods in Machine Learning”, <em>NeurIPS</em>, 2017"
  ]
 },
 "regularization": {
  "example": "Two inputs that are almost copies of each other, and a target built from 1 × each. Ordinary least squares returns weights of <strong>0.33</strong> and <strong>1.78</strong> — an arbitrary split that would change with the next sample. Ridge regression with λ = 1 returns <strong>1.05</strong> and <strong>1.05</strong>. The penalty picks the stable answer among many that fit equally well.",
  "fails": [
   "Regularization strength is a hyperparameter; too much and the model underfits. Choose it by cross-validation.",
   "L2 and L1 penalties depend on the scale of the inputs; standardize first.",
   "Shrunken coefficients are biased on purpose, so read them as predictions, not as causal effects."
  ],
  "code": "rng = np.random.default_rng(2)\nx1 = rng.normal(size=50)\nx2 = x1 + rng.normal(0, 0.01, 50)                  # almost a copy of x1\nX = np.column_stack([x1, x2])\ny = x1 + x2 + rng.normal(0, 0.5, 50)               # the truth: weights 1 and 1\nols = np.linalg.solve(X.T @ X, X.T @ y)\nridge = np.linalg.solve(X.T @ X + 1.0 * np.eye(2), X.T @ y)   # L2 penalty, lambda = 1",
  "sources": [
   "A. E. Hoerl &amp; R. W. Kennard, “Ridge Regression: Biased Estimation for Nonorthogonal Problems”, <em>Technometrics</em> 12(1), 1970",
   "R. Tibshirani, “Regression Shrinkage and Selection via the Lasso”, <em>Journal of the Royal Statistical Society B</em> 58(1), 1996",
   "N. Srivastava et al., “Dropout: A Simple Way to Prevent Neural Networks from Overfitting”, <em>Journal of Machine Learning Research</em> 15, 2014"
  ]
 },
 "batchnorm": {
  "example": "A batch of 64 activations with mean 5 and standard deviation 3, normalised: every unit now has mean <strong>0</strong> and standard deviation <strong>1</strong>. But the statistics come from the batch. With 64 examples the batch mean is off by about <strong>0.38</strong> on average; with 2 examples by <strong>2.15</strong> — noise as large as the signal. That is why batch norm struggles with small batches.",
  "fails": [
   "Training uses batch statistics and inference uses running averages; when the two differ, train and test behave differently.",
   "For small batches or sequences, LayerNorm or GroupNorm avoid the dependence on the batch (see Normalization).",
   "Why it helps is still debated; Santurkar et al. (2018) argue it smooths the loss landscape rather than fixing “internal covariate shift”."
  ],
  "code": "rng = np.random.default_rng(3)\nacts = rng.normal(5, 3, size=(64, 4))              # a batch of 64, four units\nxhat = (acts - acts.mean(0)) / np.sqrt(acts.var(0) + 1e-5)\nafter = (xhat.mean(0).round(6).tolist(), xhat.std(0).round(3).tolist())\n# how noisy the batch mean is as an estimate of the true mean (5)\nnoise = {m: np.std([rng.normal(5, 3, m).mean() for _ in range(2000)]).round(3) for m in (2, 64)}",
  "sources": [
   "S. Ioffe &amp; C. Szegedy, “Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift”, <em>ICML</em>, 2015",
   "S. Santurkar, D. Tsipras, A. Ilyas &amp; A. Madry, “How Does Batch Normalization Help Optimization?”, <em>NeurIPS</em>, 2018",
   "Y. Wu &amp; K. He, “Group Normalization”, <em>ECCV</em>, 2018"
  ]
 },
 "lr-schedule": {
  "example": "Warmup over 1,000 steps to 3×10⁻⁴, then cosine decay to 3×10⁻⁵ by step 10,000. The rate is <strong>0</strong> at the start, <strong>1.5×10⁻⁴</strong> halfway through warmup, <strong>3×10⁻⁴</strong> at its peak, <strong>1.65×10⁻⁴</strong> halfway through the decay and <strong>3×10⁻⁵</strong> at the end. Warmup protects the fragile first steps; the decay lets training settle.",
  "fails": [
   "A schedule tuned for one run length does not transfer; cosine decay depends on knowing the total number of steps.",
   "Warmup matters most with large batches and adaptive optimizers; small runs often do fine without it.",
   "Changing the schedule and the peak rate at once makes it impossible to tell which helped."
  ],
  "code": "lr_max, lr_min, warmup, total = 3e-4, 3e-5, 1_000, 10_000\n\ndef lr(t):\n    if t &lt; warmup: return lr_max * t / warmup                     # linear warmup\n    progress = (t - warmup) / (total - warmup)\n    return lr_min + 0.5 * (lr_max - lr_min) * (1 + np.cos(np.pi * progress))   # cosine decay\n\nschedule = {t: float(f'{lr(t):.2e}') for t in (0, 500, 1_000, 5_500, 10_000)}",
  "sources": [
   "I. Loshchilov &amp; F. Hutter, “SGDR: Stochastic Gradient Descent with Warm Restarts”, <em>ICLR</em>, 2017",
   "P. Goyal et al., “Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour”, arXiv:1706.02677, 2017 — linear warmup",
   "L. N. Smith, “Cyclical Learning Rates for Training Neural Networks”, <em>WACV</em>, 2017"
  ]
 },
 "weight-init": {
  "example": "Twenty ReLU layers, 256 wide. With weights drawn from N(0, 1), activations grow to a standard deviation of <strong>1.5×10²¹</strong>. With weights of standard deviation 0.01 they shrink to <strong>1.2×10⁻¹⁹</strong>. He initialization, variance 2/fan-in, keeps them at <strong>0.73</strong>. The right scale makes each layer pass on a signal of the same size.",
  "fails": [
   "The rules assume particular activations: Xavier for tanh-like, He for ReLU. Mismatch them and the drift returns.",
   "Normalization layers and residual connections make networks far less sensitive to initialization.",
   "Good initialization makes training possible; it does not make it good."
  ],
  "code": "rng = np.random.default_rng(4)\n\ndef final_std(scale, layers=20, width=256):\n    h = rng.normal(size=(width, 100))\n    for _ in range(layers):\n        W = rng.normal(0, scale, (width, width))\n        h = np.maximum(W @ h, 0)                   # ReLU layers\n    return h.std()\n\nnaive = final_std(1.0)                             # N(0, 1) weights\nhe = final_std(np.sqrt(2 / 256))                   # He: variance 2 / fan_in\ntiny = final_std(0.01)",
  "sources": [
   "X. Glorot &amp; Y. Bengio, “Understanding the Difficulty of Training Deep Feedforward Neural Networks”, <em>AISTATS</em>, 2010",
   "K. He, X. Zhang, S. Ren &amp; J. Sun, “Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification”, <em>ICCV</em>, 2015"
  ]
 },
 "grad-clip": {
  "example": "A gradient of length <strong>50</strong>. Clipping by norm to 1 gives (0.6, −0.8, 0.01): one fiftieth the length, exactly the same direction (cosine <strong>1.0</strong>). Clipping each value to [−1, 1] gives (1, −1, 0.5): the small third component is now as big as the others, and the direction has turned (cosine <strong>0.94</strong>).",
  "fails": [
   "A clipping threshold that triggers on every step is just a smaller learning rate; log how often it fires.",
   "Clipping treats the symptom; frequent explosions often point to a bad learning rate, initialization or data bug.",
   "Clipping by value distorts the direction; prefer clipping by norm."
  ],
  "code": "g = np.array([30.0, -40.0, 0.5])                    # an exploding gradient, norm about 50\nmax_norm = 1.0\nby_norm = g * min(1, max_norm / np.linalg.norm(g))\nby_value = np.clip(g, -1, 1)\ncos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))",
  "sources": [
   "R. Pascanu, T. Mikolov &amp; Y. Bengio, “On the Difficulty of Training Recurrent Neural Networks”, <em>ICML</em>, 2013",
   "J. Zhang, T. He, S. Sra &amp; A. Jadbabaie, “Why Gradient Clipping Accelerates Training: A Theoretical Justification for Adaptivity”, <em>ICLR</em>, 2020"
  ]
 },
 "softmax": {
  "example": "Scores of 2, 1 and 0.1 become probabilities <strong>0.659, 0.242, 0.099</strong>. Halving the temperature sharpens them to 0.864, 0.117, 0.019; doubling it flattens them to 0.502, 0.304, 0.194. Scores of 1000 and 1001 overflow a naive implementation (<strong>nan</strong>); subtracting the largest score first gives the correct <strong>0.269, 0.731</strong>.",
  "fails": [
   "Softmax outputs look like probabilities but are often over-confident; temperature scaling on held-out data calibrates them (Guo et al. 2017).",
   "Only differences between scores matter; adding a constant to all of them changes nothing.",
   "A high softmax probability is not evidence that the input is like the training data."
  ],
  "code": "def softmax(z, T=1.0):\n    z = np.asarray(z, float) / T\n    e = np.exp(z - z.max())                        # subtract the max: same result, no overflow\n    return e / e.sum()\n\np = softmax([2.0, 1.0, 0.1])\ncold, hot = softmax([2.0, 1.0, 0.1], T=0.5), softmax([2.0, 1.0, 0.1], T=2.0)\nwith np.errstate(over='ignore', invalid='ignore'):\n    naive = np.exp([1000.0, 1001.0]) / np.exp([1000.0, 1001.0]).sum()   # overflows\nstable = softmax([1000.0, 1001.0])",
  "sources": [
   "<em>Deep Learning</em>, I. Goodfellow, Y. Bengio &amp; A. Courville, MIT Press, 2016 — chapter 6",
   "C. Guo, G. Pleiss, Y. Sun &amp; K. Q. Weinberger, “On Calibration of Modern Neural Networks”, <em>ICML</em>, 2017"
  ]
 },
 "mle": {
  "example": "Seven heads in ten tosses: the probability that makes this most likely is <strong>0.7</strong>. For the values 4, 6, 5, 9 and 6, the maximum-likelihood mean is <strong>6.0</strong> and the maximum-likelihood variance <strong>2.8</strong> — it divides by n. The usual unbiased estimate, dividing by n − 1, is <strong>3.5</strong>. MLE is a principle for estimates, not a guarantee they are unbiased.",
  "fails": [
   "With little data MLE overfits: after three heads in three tosses it says the coin never lands tails. Priors (MAP) or smoothing fix this.",
   "The likelihood assumes a model; if the model is wrong, the best fit to it can still be a poor description.",
   "Minimising MSE is MLE under Gaussian noise, and cross-entropy is MLE for categorical outcomes — useful to know which assumption a loss carries."
  ],
  "code": "heads, n = 7, 10\np = np.linspace(0.01, 0.99, 99)\nloglik = heads * np.log(p) + (n - heads) * np.log(1 - p)\np_hat = p[loglik.argmax()]                          # the MLE: 7/10\nx = np.array([4.0, 6.0, 5.0, 9.0, 6.0])\nmu_hat = x.mean()\nvar_mle = ((x - mu_hat) ** 2).mean()                # MLE divides by n, not n - 1\nvar_unbiased = x.var(ddof=1)",
  "sources": [
   "R. A. Fisher, “On the Mathematical Foundations of Theoretical Statistics”, <em>Philosophical Transactions of the Royal Society A</em> 222, 1922",
   "<em>Pattern Recognition and Machine Learning</em>, C. M. Bishop, Springer, 2006 — chapters 1–2"
  ]
 },
 "entropy": {
  "example": "A fair coin carries <strong>1 bit</strong> of surprise per toss; a 90/10 coin only <strong>0.47</strong> bits; a fair eight-sided die <strong>3</strong> bits. Encoding the 90/10 coin with a code built for a fair coin costs <strong>1 bit</strong> per toss — the cross-entropy — instead of 0.47. The difference is the waste from using the wrong distribution, which is the KL divergence.",
  "fails": [
   "Entropy measures unpredictability, not meaning; a random string has maximum entropy and no information you care about.",
   "Estimating entropy from samples is biased low when the data are few relative to the number of outcomes.",
   "Bits (log base 2) and nats (natural log) differ by a factor of ln 2; check which a library uses."
  ],
  "code": "H = lambda p: -np.sum(np.asarray(p) * np.log2(p))\nfair, loaded, eight = H([0.5, 0.5]), H([0.9, 0.1]), H(np.full(8, 1 / 8))\np, q = np.array([0.9, 0.1]), np.array([0.5, 0.5])\ncross = -np.sum(p * np.log2(q))                      # coding p's outcomes with q's code",
  "sources": [
   "C. E. Shannon, “A Mathematical Theory of Communication”, <em>Bell System Technical Journal</em> 27(3), 1948",
   "<em>Elements of Information Theory</em> (2nd ed.), T. M. Cover &amp; J. A. Thomas, Wiley, 2006"
  ]
 },
 "kl-div": {
  "example": "P is a fair coin and Q a 90/10 coin. KL(P‖Q) is <strong>0.511</strong> nats, KL(Q‖P) is <strong>0.368</strong>. The order matters: the first asks how badly Q explains data from P, the second the reverse. When Q gives some outcome almost no probability that P considers likely, KL(P‖Q) blows up.",
  "fails": [
   "KL is not a distance: it is not symmetric and does not obey the triangle inequality.",
   "If Q assigns zero probability to anything P can produce, KL(P‖Q) is infinite; smoothing is needed in practice.",
   "Minimising KL(P‖Q) or KL(Q‖P) gives different fits — one covers all modes, the other locks onto one (a key choice in variational inference)."
  ],
  "code": "kl = lambda p, q: np.sum(p * np.log(p / q))\nP_, Q_ = np.array([0.5, 0.5]), np.array([0.9, 0.1])\nkl_pq, kl_qp = kl(P_, Q_), kl(Q_, P_)               # not symmetric",
  "sources": [
   "S. Kullback &amp; R. A. Leibler, “On Information and Sufficiency”, <em>Annals of Mathematical Statistics</em> 22(1), 1951",
   "<em>Elements of Information Theory</em> (2nd ed.), T. M. Cover &amp; J. A. Thomas, Wiley, 2006",
   "<em>Pattern Recognition and Machine Learning</em>, C. M. Bishop, Springer, 2006 — chapter 10"
  ]
 },
 "bayes": {
  "example": "A condition that 1% of people have, and a test that catches 99% of cases with 5% false positives. About <strong>5.9%</strong> of everyone tests positive, but only <strong>16.7%</strong> of positives are sick — the false positives from the healthy 99% outnumber the true ones. A second, independent positive test lifts it to <strong>79.8%</strong>.",
  "fails": [
   "The answer depends heavily on the prior; the same test means different things in a clinic and in a screening of everyone.",
   "Repeated tests are rarely fully independent; the second update assumes they are.",
   "People reason much better about this with counts (“10 of 1,000”) than with percentages (Gigerenzer &amp; Hoffrage 1995)."
  ],
  "code": "prior = 0.01                          # 1% have the condition\nsens, spec = 0.99, 0.95               # P(+ | sick), P(- | healthy)\np_pos = sens * prior + (1 - spec) * (1 - prior)\nposterior = sens * prior / p_pos      # P(sick | +)\nsecond = sens * posterior / (sens * posterior + (1 - spec) * (1 - posterior))   # after a second positive test",
  "sources": [
   "T. Bayes, “An Essay towards Solving a Problem in the Doctrine of Chances”, <em>Philosophical Transactions of the Royal Society</em> 53, 1763",
   "G. Gigerenzer &amp; U. Hoffrage, “How to Improve Bayesian Reasoning without Instruction: Frequency Formats”, <em>Psychological Review</em> 102(4), 1995",
   "<em>Pattern Recognition and Machine Learning</em>, C. M. Bishop, Springer, 2006"
  ]
 },
 "crossval": {
  "example": "A model that is right on 76 of 100 cases. A single random 80/20 split measures its accuracy on 20 cases, and across 2,000 such splits the result ranges from <strong>0.60</strong> to <strong>0.90</strong> (5th to 95th percentile). Five-fold cross-validation tests every case once and gives <strong>0.76</strong>. One split is a noisy measurement; k folds average the noise away.",
  "fails": [
   "Folds must respect the structure of the data: groups, time order, duplicates. Otherwise the score leaks (see Cross-Validation Done Right in The Toolkit).",
   "Using the CV score to choose hyperparameters and to report performance double-counts it; use nested CV.",
   "The fold scores are not independent, so their standard deviation understates the true uncertainty."
  ],
  "code": "rng = np.random.default_rng(5)\ncorrect = rng.random(100) &lt; 0.8           # a model that is right on 80 of 100 cases, fixed\nsingle = []\nfor _ in range(2000):                      # one random 80/20 split each time\n    test = rng.permutation(100)[:20]\n    single.append(correct[test].mean())\nlo, hi = np.percentile(single, [5, 95])\nfive_fold = np.mean([correct[k::5].mean() for k in range(5)])   # every case tested once",
  "sources": [
   "M. Stone, “Cross-Validatory Choice and Assessment of Statistical Predictions”, <em>Journal of the Royal Statistical Society B</em> 36(2), 1974",
   "R. Kohavi, “A Study of Cross-Validation and Bootstrap for Accuracy Estimation and Model Selection”, <em>IJCAI</em>, 1995",
   "S. Varma &amp; R. Simon, “Bias in Error Estimation When Using Cross-Validation for Model Selection”, <em>BMC Bioinformatics</em> 7, 2006"
  ]
 },
 "metrics": {
  "example": "1,000 cases: 40 true positives, 10 false positives, 20 missed and 930 true negatives. Accuracy is <strong>97%</strong>, mostly from the easy negatives. Precision is <strong>0.80</strong> (four in five alarms are real), recall <strong>0.67</strong> (a third of the positives are missed), and F1 <strong>0.73</strong>. The metric should match the cost of the mistakes.",
  "fails": [
   "F1 weights precision and recall equally; if a miss costs ten times a false alarm, use a weighted measure or the costs directly.",
   "Precision depends on how common positives are; the same model has different precision in a different population.",
   "A single threshold hides the trade-off; look at the precision–recall curve."
  ],
  "code": "tp, fp, fn, tn = 40, 10, 20, 930\nprecision = tp / (tp + fp)\nrecall = tp / (tp + fn)\nf1 = 2 * precision * recall / (precision + recall)\naccuracy = (tp + tn) / (tp + fp + fn + tn)",
  "sources": [
   "D. M. W. Powers, “Evaluation: From Precision, Recall and F-Measure to ROC, Informedness, Markedness and Correlation”, <em>Journal of Machine Learning Technologies</em> 2(1), 2011",
   "T. Saito &amp; M. Rehmsmeier, “The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets”, <em>PLoS ONE</em> 10(3), 2015"
  ]
 },
 "cosine-sim": {
  "example": "(1, 2, 0) and (2, 4, 0) point the same way: cosine <strong>1.0</strong>, although they are <strong>2.24</strong> apart in Euclidean distance. (1, 2, 0) and (0, 0, 3) are perpendicular: cosine <strong>0</strong>. Normalise vectors to length 1 first and the dot product <em>is</em> the cosine, which is why vector databases store unit vectors.",
  "fails": [
   "Cosine ignores length, which sometimes carries meaning (a longer document, a more confident embedding).",
   "Similarity scores are only comparable within one embedding model; 0.8 in one model is not 0.8 in another.",
   "In high dimensions many unrelated vectors sit at similar cosines, so thresholds need calibrating on real pairs."
  ],
  "code": "a, b = np.array([1.0, 2.0, 0.0]), np.array([2.0, 4.0, 0.0])    # same direction, twice as long\nc = np.array([0.0, 0.0, 3.0])\ncos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))\nresult = dict(cos_ab=cos(a, b), dist_ab=np.linalg.norm(a - b), cos_ac=cos(a, c))\nunit = lambda v: v / np.linalg.norm(v)\ndot_of_units = unit(a) @ unit(b)                  # on normalized vectors, dot product = cosine",
  "sources": [
   "G. Salton, A. Wong &amp; C. S. Yang, “A Vector Space Model for Automatic Indexing”, <em>Communications of the ACM</em> 18(11), 1975",
   "<em>Introduction to Information Retrieval</em>, C. D. Manning, P. Raghavan &amp; H. Schütze, Cambridge University Press, 2008"
  ]
 },
 "cnn": {
  "example": "A 224×224 input with a 3×3 kernel, padding 1 and stride 2 gives a <strong>112×112</strong> output. Mapping 64 channels to 128 takes <strong>73,856</strong> parameters, because the same small filter is reused at every position. A fully connected layer between the same two shapes would need about <strong>5×10¹²</strong>. Weight sharing is what makes images tractable.",
  "fails": [
   "Convolutions are translation-equivariant, not invariant; pooling and training add some invariance, and only to small shifts.",
   "A small receptive field sees only local patterns; depth or dilation is needed for global context.",
   "Vision transformers match or beat CNNs at scale; the convolution’s built-in assumption is a help with little data, not a law."
  ],
  "code": "out = lambda W, K, P, S: (W - K + 2 * P) // S + 1\nsize = out(224, 3, 1, 2)                          # 224x224 input, 3x3 kernel, padding 1, stride 2\nconv_params = 3 * 3 * 64 * 128 + 128              # 64 -&gt; 128 channels, shared across positions\ndense_params = (224 * 224 * 64) * (112 * 112 * 128)  # a fully connected layer between the same shapes",
  "sources": [
   "Y. LeCun, L. Bottou, Y. Bengio &amp; P. Haffner, “Gradient-Based Learning Applied to Document Recognition”, <em>Proceedings of the IEEE</em> 86(11), 1998",
   "V. Dumoulin &amp; F. Visin, “A Guide to Convolution Arithmetic for Deep Learning”, arXiv:1603.07285, 2016"
  ]
 },
 "embeddings": {
  "example": "Five hand-made 3-d vectors. king − man + woman lands closest to <strong>queen</strong>, and then to woman and king. Here the analogy works because the vectors were built for it. In real embeddings the famous result relies partly on a quiet rule: the input words are excluded from the answers (Nissim et al. 2020).",
  "fails": [
   "Analogy tests overstate what embeddings know; excluding the query words does much of the work.",
   "Embeddings learn the associations in their training text, including social biases.",
   "Distances are meaningful only within one trained space; two models’ vectors cannot be compared directly."
  ],
  "code": "E = {'king': [0.9, 0.8, 0.1], 'queen': [0.9, 0.1, 0.8], 'man': [0.1, 0.9, 0.1],\n     'woman': [0.1, 0.2, 0.8], 'apple': [0.0, 0.3, 0.3]}           # hand-made 3-d vectors\nE = {w: np.array(v) for w, v in E.items()}\ntarget = E['king'] - E['man'] + E['woman']\ncos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))\nranked = sorted(E, key=lambda w: -cos(E[w], target))\nbest_excluding_inputs = [w for w in ranked if w not in ('king', 'man', 'woman')][0]",
  "sources": [
   "T. Mikolov, K. Chen, G. Corrado &amp; J. Dean, “Efficient Estimation of Word Representations in Vector Space”, arXiv:1301.3781, 2013",
   "M. Nissim, R. van Noord &amp; R. van der Goot, “Fair Is Better than Sensational: Man Is to Doctor as Woman Is to Doctor”, <em>Computational Linguistics</em> 46(2), 2020"
  ]
 },
 "attention": {
  "example": "One query and ten keys of dimension 512. Without scaling, the dot products are large and the softmax puts <strong>99.6%</strong> of the weight on a single key — attention becomes a hard lookup with almost no gradient for the rest. Dividing by √512 brings the largest weight down to <strong>21%</strong>. The √d in the formula is there for exactly this reason.",
  "fails": [
   "Attention weights are not explanations; high weight on a token does not mean it caused the output.",
   "Full attention costs grow with the square of the sequence length.",
   "Attention has no sense of order by itself; position encodings supply it."
  ],
  "code": "rng = np.random.default_rng(6)\nsoftmax = lambda z: np.exp(z - z.max()) / np.exp(z - z.max()).sum()\nd = 512\nq, K = rng.normal(size=d), rng.normal(size=(10, d))   # one query, ten keys\nraw = softmax(K @ q).max()                             # unscaled scores grow with sqrt(d)\nscaled = softmax(K @ q / np.sqrt(d)).max()",
  "sources": [
   "A. Vaswani et al., “Attention Is All You Need”, <em>NeurIPS</em>, 2017",
   "D. Bahdanau, K. Cho &amp; Y. Bengio, “Neural Machine Translation by Jointly Learning to Align and Translate”, <em>ICLR</em>, 2015",
   "S. Jain &amp; B. C. Wallace, “Attention Is Not Explanation”, <em>NAACL</em>, 2019"
  ]
 },
 "transformer": {
  "example": "GPT-2 small: width 768, feed-forward 3,072, 12 layers, 50,257 tokens. Each layer holds <strong>7,087,872</strong> parameters — a third in attention, two thirds in the feed-forward block. With token and position embeddings the total is <strong>124,439,808</strong>, the familiar “124M”. Most of a transformer is its MLPs.",
  "fails": [
   "Parameter counts say little about compute: attention cost grows with sequence length, which is not in the count.",
   "Small details — where the LayerNorm sits, the positional scheme — matter a lot for training stability (Xiong et al. 2020).",
   "Shared input and output embeddings, as in GPT-2, are counted once here; other models count them twice."
  ],
  "code": "d, ff, layers, vocab = 768, 3072, 12, 50_257          # GPT-2 small\nattn = 4 * d * d + 4 * d                             # Q, K, V and output projections\nmlp = 2 * d * ff + ff + d\nnorms = 2 * 2 * d\nper_layer = attn + mlp + norms\nembeddings = vocab * d + 1024 * d                    # tokens + 1,024 learned positions\ntotal = layers * per_layer + embeddings + 2 * d       # + final LayerNorm",
  "sources": [
   "A. Vaswani et al., “Attention Is All You Need”, <em>NeurIPS</em>, 2017",
   "A. Radford, J. Wu, R. Child, D. Luan, D. Amodei &amp; I. Sutskever, “Language Models Are Unsupervised Multitask Learners”, OpenAI, 2019",
   "R. Xiong et al., “On Layer Normalization in the Transformer Architecture”, <em>ICML</em>, 2020"
  ]
 },
 "normalization": {
  "example": "The vector (2, 4, 6, 8). LayerNorm gives <strong>(−1.34, −0.45, 0.45, 1.34)</strong>; RMSNorm, which skips the mean, gives <strong>(0.37, 0.73, 1.10, 1.46)</strong>. Add 100 to every feature and LayerNorm’s output is unchanged (<strong>True</strong>), while RMSNorm’s becomes (0.97, 0.99, 1.01, 1.03). RMSNorm is cheaper; LayerNorm is shift-invariant.",
  "fails": [
   "The learned scale and shift (γ, β) can undo the normalization; it changes the parametrisation, not what the network can represent.",
   "Which norm works best is empirical and architecture-specific; results do not transfer automatically.",
   "Where the norm sits (before or after the residual) matters as much as which norm it is."
  ],
  "code": "x = np.array([2.0, 4.0, 6.0, 8.0])\nlayer = (x - x.mean()) / np.sqrt(x.var() + 1e-5)     # LayerNorm, before gamma and beta\nrms = x / np.sqrt((x ** 2).mean() + 1e-5)             # RMSNorm: no mean subtraction\nshifted = x + 100                                     # add the same constant to every feature\nlayer_shift = (shifted - shifted.mean()) / np.sqrt(shifted.var() + 1e-5)\nrms_shift = shifted / np.sqrt((shifted ** 2).mean() + 1e-5)",
  "sources": [
   "J. L. Ba, J. R. Kiros &amp; G. E. Hinton, “Layer Normalization”, arXiv:1607.06450, 2016",
   "B. Zhang &amp; R. Sennrich, “Root Mean Square Layer Normalization”, <em>NeurIPS</em>, 2019",
   "Y. Wu &amp; K. He, “Group Normalization”, <em>ECCV</em>, 2018"
  ]
 },
 "rnn": {
  "example": "Backpropagating through 50 time steps multiplies 50 factors. If each shrinks the gradient to 0.9 of its size, <strong>0.005</strong> of it survives; if each grows it to 1.1, it becomes <strong>117</strong> times larger. Plain RNNs live between vanishing and exploding, which is why they forget long-range patterns.",
  "fails": [
   "Gradient clipping handles explosions but not vanishing; gates (LSTM, GRU) address vanishing.",
   "Truncated backpropagation through time limits how far back the model can learn, whatever the architecture.",
   "RNNs process steps one at a time, so they parallelise poorly compared with transformers."
  ],
  "code": "steps = 50\nvanish, explode = 0.9 ** steps, 1.1 ** steps      # gradient factor through 50 steps, per-step gain 0.9 or 1.1",
  "sources": [
   "J. L. Elman, “Finding Structure in Time”, <em>Cognitive Science</em> 14(2), 1990",
   "Y. Bengio, P. Simard &amp; P. Frasconi, “Learning Long-Term Dependencies with Gradient Descent Is Difficult”, <em>IEEE Transactions on Neural Networks</em> 5(2), 1994",
   "R. Pascanu, T. Mikolov &amp; Y. Bengio, “On the Difficulty of Training Recurrent Neural Networks”, <em>ICML</em>, 2013"
  ]
 },
 "lstm": {
  "example": "The forget gate decides how much of the cell state to keep each step. At 0.9, after 100 steps <strong>0.003%</strong> is left; at 0.99, <strong>37%</strong>; at 0.999, <strong>90%</strong>. The memory length is roughly 1/(1 − f): 10, 100 and 1,000 steps. Because the gate is learned, the network chooses its own memory span.",
  "fails": [
   "The original LSTM had no forget gate; it was added by Gers et al. (2000), and initialising its bias high helps.",
   "In large comparisons most LSTM variants perform about the same; the forget gate and output activation matter most (Greff et al. 2017).",
   "For long sequences transformers usually win, given enough data."
  ],
  "code": "keep = {f: f ** 100 for f in (0.9, 0.99, 0.999)}      # share of the cell state left after 100 steps\nspan = {f: 1 / (1 - f) for f in (0.9, 0.99, 0.999)}    # rough memory length in steps",
  "sources": [
   "S. Hochreiter &amp; J. Schmidhuber, “Long Short-Term Memory”, <em>Neural Computation</em> 9(8), 1997",
   "F. A. Gers, J. Schmidhuber &amp; F. Cummins, “Learning to Forget: Continual Prediction with LSTM”, <em>Neural Computation</em> 12(10), 2000",
   "K. Greff et al., “LSTM: A Search Space Odyssey”, <em>IEEE Transactions on Neural Networks and Learning Systems</em> 28(10), 2017"
  ]
 },
 "gru": {
  "example": "With 128 inputs and 256 hidden units, an LSTM layer has <strong>394,240</strong> parameters and a GRU layer <strong>295,680</strong> — exactly <strong>75%</strong>, because it has three weight blocks instead of four. Fewer parameters train faster and need less data; whether they do as well is an empirical question for each task.",
  "fails": [
   "Neither GRU nor LSTM wins consistently; comparisons find them close (Chung et al. 2014).",
   "Parameter count is not speed; implementations and hardware kernels decide that.",
   "Like the LSTM, the GRU still processes one step at a time."
  ],
  "code": "x, h = 128, 256\ngate = h * (h + x) + h                  # one gate: weights on [h, x] plus bias\nlstm, gru = 4 * gate, 3 * gate          # LSTM: four blocks; GRU: three",
  "sources": [
   "K. Cho et al., “Learning Phrase Representations Using RNN Encoder–Decoder for Statistical Machine Translation”, <em>EMNLP</em>, 2014",
   "J. Chung, C. Gulcehre, K. Cho &amp; Y. Bengio, “Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling”, arXiv:1412.3555, 2014"
  ]
 },
 "pca": {
  "example": "5,000 points from a correlated 2-d distribution. The covariance matrix has eigenvalues <strong>4.53</strong> and <strong>0.43</strong>, so the first principal component explains <strong>91.3%</strong> of the variance. One number per point, its position along that axis, keeps almost all the spread of two.",
  "fails": [
   "PCA finds directions of large variance, not directions that matter for a prediction; a small component can carry the signal.",
   "It is sensitive to scale; standardize features measured in different units.",
   "It finds only linear structure; curved data needs other methods."
  ],
  "code": "rng = np.random.default_rng(7)\nX = rng.multivariate_normal([0, 0], [[3, 2], [2, 2]], size=5_000)\nX = X - X.mean(0)\nvals, vecs = np.linalg.eigh(np.cov(X.T))\nvals = vals[::-1]\nexplained = vals / vals.sum()",
  "sources": [
   "K. Pearson, “On Lines and Planes of Closest Fit to Systems of Points in Space”, <em>Philosophical Magazine</em> 2(11), 1901",
   "H. Hotelling, “Analysis of a Complex of Statistical Variables into Principal Components”, <em>Journal of Educational Psychology</em> 24(6), 1933",
   "I. T. Jolliffe &amp; J. Cadima, “Principal Component Analysis: A Review and Recent Developments”, <em>Philosophical Transactions of the Royal Society A</em> 374, 2016"
  ]
 },
 "svd": {
  "example": "A 50×50 matrix whose singular values fall by 30% each. Keeping the top five captures <strong>97.2%</strong> of its energy with a relative error of <strong>16.8%</strong>, using <strong>505</strong> numbers instead of 2,500. The Eckart–Young theorem says no rank-5 matrix does better — the idea behind LoRA and compressed recommenders.",
  "fails": [
   "The approximation is only good when singular values decay; for noise-like matrices every component matters.",
   "Energy captured is not task performance; check the error on what the matrix is used for.",
   "Full SVD is expensive for large matrices; randomised or truncated methods are used in practice."
  ],
  "code": "rng = np.random.default_rng(8)\nU, _ = np.linalg.qr(rng.normal(size=(50, 50)))\nV, _ = np.linalg.qr(rng.normal(size=(50, 50)))\ns = 0.7 ** np.arange(50)                         # singular values that decay\nA = U @ np.diag(s) @ V.T\nk = 5\nA_k = U[:, :k] @ np.diag(s[:k]) @ V[:, :k].T     # best rank-5 approximation\nenergy = (s[:k] ** 2).sum() / (s ** 2).sum()\nrel_err = np.linalg.norm(A - A_k) / np.linalg.norm(A)\nnumbers = (50 * 50, k * (50 + 50 + 1))           # entries stored: full vs rank-5",
  "sources": [
   "C. Eckart &amp; G. Young, “The Approximation of One Matrix by Another of Lower Rank”, <em>Psychometrika</em> 1(3), 1936",
   "<em>Matrix Computations</em> (4th ed.), G. H. Golub &amp; C. F. Van Loan, Johns Hopkins University Press, 2013",
   "<em>Introduction to Linear Algebra</em> (5th ed.), G. Strang, Wellesley-Cambridge Press, 2016"
  ]
 },
 "vae": {
  "example": "For one input the encoder outputs μ = 1 and σ = 0.5. Sampling z = μ + σ·ε moves the randomness into ε, so gradients can flow through μ and σ; five samples land at 0.60, 1.12, 0.17, 1.33 and 1.57. The KL penalty that pulls this towards a standard normal is <strong>0.818</strong> nats: the price of a smooth latent space.",
  "fails": [
   "With a powerful decoder the KL term can drive the encoder to ignore the input (“posterior collapse”, Bowman et al. 2016).",
   "VAE samples tend to be blurrier than GAN or diffusion samples, partly because of the Gaussian likelihood.",
   "The ELBO is a lower bound; a better bound does not always mean better samples."
  ],
  "code": "rng = np.random.default_rng(9)\nmu, sigma = 1.0, 0.5                             # what the encoder outputs for one input\nz = mu + sigma * rng.normal(size=5)              # reparameterization: randomness moved into eps\nkl = 0.5 * (sigma ** 2 + mu ** 2 - 1 - np.log(sigma ** 2))   # KL(N(mu, sigma^2) || N(0, 1))",
  "sources": [
   "D. P. Kingma &amp; M. Welling, “Auto-Encoding Variational Bayes”, <em>ICLR</em>, 2014",
   "D. J. Rezende, S. Mohamed &amp; D. Wierstra, “Stochastic Backpropagation and Approximate Inference in Deep Generative Models”, <em>ICML</em>, 2014",
   "S. R. Bowman et al., “Generating Sentences from a Continuous Space”, <em>CoNLL</em>, 2016"
  ]
 },
 "diffusion": {
  "example": "DDPM’s schedule adds noise over 1,000 steps. The share of the original signal left is <strong>0.9999</strong> after one step, <strong>0.947</strong> after 100, <strong>0.280</strong> after 500 and <strong>0.006</strong> after 1,000 — essentially pure noise. The model learns to undo one small step at a time, and generation runs the whole chain backwards.",
  "fails": [
   "The linear schedule destroys information quickly in the middle; a cosine schedule spreads it more evenly (Nichol &amp; Dhariwal 2021).",
   "A thousand denoising steps make sampling slow; faster samplers trade steps for quality.",
   "Likelihood and sample quality do not always improve together."
  ],
  "code": "T = 1000\nbeta = np.linspace(1e-4, 0.02, T)                # DDPM's linear noise schedule\nalpha_bar = np.cumprod(1 - beta)\nsignal = {t: float(np.sqrt(alpha_bar[t - 1]).round(4)) for t in (1, 100, 500, 1000)}   # share of the original left",
  "sources": [
   "J. Sohl-Dickstein, E. Weiss, N. Maheswaranathan &amp; S. Ganguli, “Deep Unsupervised Learning Using Nonequilibrium Thermodynamics”, <em>ICML</em>, 2015",
   "J. Ho, A. Jain &amp; P. Abbeel, “Denoising Diffusion Probabilistic Models”, <em>NeurIPS</em>, 2020",
   "A. Q. Nichol &amp; P. Dhariwal, “Improved Denoising Diffusion Probabilistic Models”, <em>ICML</em>, 2021"
  ]
 },
 "gan": {
  "example": "Real data centred at 0 and a generator centred at 3. The best possible discriminator outputs <strong>0.999</strong> at −1, 0.989 at 0, <strong>0.5</strong> at 1.5 and <strong>0.011</strong> at 3 — easy to tell apart. When the generator matches the data it can only say <strong>0.5</strong> everywhere, and the game’s value reaches −log 4 = <strong>−1.386</strong>, the equilibrium.",
  "fails": [
   "When the discriminator wins too easily, the generator’s gradient vanishes; Wasserstein GANs change the objective to fix this (Arjovsky et al. 2017).",
   "Generators can collapse to a few outputs that fool the discriminator (mode collapse).",
   "GAN training has no single loss that tracks progress; sample quality must be measured separately."
  ],
  "code": "from math import erf, sqrt, exp, pi\npdf = lambda x, m: exp(-(x - m) ** 2 / 2) / sqrt(2 * pi)\nd_star = lambda x, m_g: pdf(x, 0) / (pdf(x, 0) + pdf(x, m_g))   # best discriminator: data at 0, generator at m_g\nfar = [round(d_star(x, 3), 3) for x in (-1, 0, 1.5, 3)]\nequal = [round(d_star(x, 0), 3) for x in (-1, 0, 1.5, 3)]       # generator matches the data\nvalue_at_equilibrium = 2 * np.log(0.5)",
  "sources": [
   "I. Goodfellow et al., “Generative Adversarial Nets”, <em>NeurIPS</em>, 2014",
   "M. Arjovsky, S. Chintala &amp; L. Bottou, “Wasserstein Generative Adversarial Networks”, <em>ICML</em>, 2017",
   "T. Salimans et al., “Improved Techniques for Training GANs”, <em>NeurIPS</em>, 2016"
  ]
 },
 "tokenization": {
  "example": "Four words with counts: low ×5, lower ×2, newest ×6, widest ×3. BPE merges the most frequent adjacent pair each round: <strong>e+s</strong>, then <strong>es+t</strong>, then <strong>est+&lt;/w&gt;</strong>, then <strong>l+o</strong>. After four merges “newest” is n e w est&lt;/w&gt; — the common ending has become one token, learned from counts alone.",
  "fails": [
   "Tokens are frequency artefacts, not morphemes; the same word can split differently with a leading space or capital.",
   "Languages and scripts under-represented in the training corpus get more tokens per word, costing more and fitting worse.",
   "Numbers split into irregular chunks, one reason arithmetic is hard for language models."
  ],
  "code": "from collections import Counter\nwords = {'l o w &lt;/w&gt;': 5, 'l o w e r &lt;/w&gt;': 2, 'n e w e s t &lt;/w&gt;': 6, 'w i d e s t &lt;/w&gt;': 3}   # word -&gt; count\nmerges = []\nfor _ in range(4):\n    pairs = Counter()\n    for w, n in words.items():\n        s = w.split()\n        for a, b in zip(s, s[1:]): pairs[a, b] += n\n    best = max(pairs, key=pairs.get)\n    merges.append(''.join(best))\n    words = {w.replace(' '.join(best), ''.join(best)): n for w, n in words.items()}",
  "sources": [
   "R. Sennrich, B. Haddow &amp; A. Birch, “Neural Machine Translation of Rare Words with Subword Units”, <em>ACL</em>, 2016",
   "P. Gage, “A New Algorithm for Data Compression”, <em>C Users Journal</em> 12(2), 1994",
   "T. Kudo &amp; J. Richardson, “SentencePiece: A Simple and Language Independent Subword Tokenizer and Detokenizer”, <em>EMNLP</em>, 2018"
  ]
 },
 "lora": {
  "example": "A 4096×4096 weight matrix has <strong>16,777,216</strong> parameters. A rank-16 LoRA update trains two thin matrices with <strong>131,072</strong> — <strong>0.78%</strong> as many. The update B·A can only have rank 16 (in the small check, rank <strong>4</strong> for r = 4), which is the bet: that fine-tuning changes lie in a low-dimensional subspace.",
  "fails": [
   "The low-rank bet can fail for tasks far from pre-training; full fine-tuning can still win there.",
   "The rank and the scaling factor α interact; changing one without the other changes the effective learning rate.",
   "LoRA saves training memory, not inference cost, unless the update is merged into the weights."
  ],
  "code": "d, r = 4096, 16\nfull = d * d\nlora = 2 * d * r                                   # B (d x r) and A (r x d)\nrng = np.random.default_rng(10)\nB, A = rng.normal(size=(64, 4)), rng.normal(size=(4, 64))\nrank = np.linalg.matrix_rank(B @ A)                # an update of rank at most r",
  "sources": [
   "E. J. Hu et al., “LoRA: Low-Rank Adaptation of Large Language Models”, <em>ICLR</em>, 2022",
   "A. Aghajanyan, S. Gupta &amp; L. Zettlemoyer, “Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning”, <em>ACL</em>, 2021",
   "T. Dettmers, A. Pagnoni, A. Holtzman &amp; L. Zettlemoyer, “QLoRA: Efficient Finetuning of Quantized LLMs”, <em>NeurIPS</em>, 2023"
  ]
 },
 "rlhf": {
  "example": "A reward model trained on human comparisons follows the Bradley–Terry model: a reward gap of 1 means the preferred answer wins <strong>73%</strong> of the time. DPO skips the reward model and trains on the comparisons directly; with β = 0.1 its loss is <strong>0.693</strong> when the model has no preference, <strong>0.313</strong> at a log-ratio margin of 10 and <strong>0.049</strong> at 30.",
  "fails": [
   "Optimising hard against a learned reward model eventually exploits its errors (reward over-optimisation, Gao et al. 2023); the KL penalty is what holds it back.",
   "Human preferences are noisy and inconsistent; a 73% preference is a weak signal per comparison.",
   "Preference training improves what raters reward — which can include confident tone over correctness."
  ],
  "code": "sigmoid = lambda z: 1 / (1 + np.exp(-z))\np_prefer = sigmoid(1.0)                             # Bradley-Terry: reward gap of 1 -&gt; P(chosen beats rejected)\nbeta = 0.1\ndpo_loss = lambda margin: -np.log(sigmoid(beta * margin))   # margin = difference of log-ratios vs the reference\nlosses = {m: round(float(dpo_loss(m)), 3) for m in (0, 10, 30)}",
  "sources": [
   "P. F. Christiano et al., “Deep Reinforcement Learning from Human Preferences”, <em>NeurIPS</em>, 2017",
   "L. Ouyang et al., “Training Language Models to Follow Instructions with Human Feedback”, <em>NeurIPS</em>, 2022",
   "R. Rafailov et al., “Direct Preference Optimization: Your Language Model Is Secretly a Reward Model”, <em>NeurIPS</em>, 2023",
   "L. Gao, J. Schulman &amp; J. Hilton, “Scaling Laws for Reward Model Overoptimization”, <em>ICML</em>, 2023"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, codeNote: 'Assumes <code>import numpy as np</code>. Each snippet carries its own example numbers; the comments say which are made up or simulated.' });
}
/* depth:end */

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
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">38</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">38</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">7</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> arrow keys to navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-foundations','vectors')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M6.5 16c4.5 0 6-8 11.5-9"/></svg></div>
      <div class="cat-card-name">Foundations</div>
      <div class="cat-card-count">6 topics · Vectors, regression, gradients, activations</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-training','loss')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 5c5 1 7.5 5 9 12"/><circle cx="15" cy="17.5" r="2.4"/></svg></div>
      <div class="cat-card-name">Training</div>
      <div class="cat-card-count">8 topics · Loss, optimizers, regularization, init</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-core','softmax')">
      <div class="cat-card-icon">∑</div>
      <div class="cat-card-name">Core Math</div>
      <div class="cat-card-count">8 topics · Probability, statistics, similarity</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-deep','cnn')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="6" r="1.8"/><circle cx="12" cy="18" r="1.8"/><circle cx="19" cy="12" r="1.8"/><path d="M6.6 11l3.9-4M6.6 13l3.9 4M13.4 7l4 4M13.4 17l4-4"/></svg></div>
      <div class="cat-card-name">Deep Learning</div>
      <div class="cat-card-count">5 topics · CNNs, attention, transformers</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-sequence','rnn')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12c2.5 0 2.5-5 5-5s2.5 8 5 8 2.5-6 5-6 3 3 3 3"/></svg></div>
      <div class="cat-card-name">Sequence Models</div>
      <div class="cat-card-count">3 topics · RNN, LSTM, GRU</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-generative','pca')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12a1.5 1.5 0 0 0 3 0 4 4 0 0 0-8 0 6.5 6.5 0 0 0 13 0 9 9 0 0 0-18 0"/></svg></div>
      <div class="cat-card-name">Generative & Prob.</div>
      <div class="cat-card-count">5 topics · PCA, SVD, VAE, Diffusion, GANs</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-modern','tokenization')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H8"/><path d="M16 5h1.5A1.5 1.5 0 0 1 19 6.5v11a1.5 1.5 0 0 1-1.5 1.5H16"/><circle cx="10" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="1" fill="currentColor" stroke="none"/></svg></div>
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
    <span class="topic-badge">Linear Algebra</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The language of ML — every model is matrix multiplication under the hood</p>
  <p class="prose">Machine learning is built on <strong>linear algebra</strong>. Inputs are vectors, weights are matrices, and the forward pass is matrix multiplication. Understanding dot products, shapes, and transposes is non-negotiable.</p>
  <div class="fb"><div class="fm">a · b = Σᵢ aᵢbᵢ = |a||b|cos(θ)</div><div class="fd"><span>Dot product</span> = sum of element-wise products = measures alignment between vectors</div></div>
  <div class="fb c2"><div class="fm">C = A × B &nbsp;&nbsp; Cᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ</div><div class="fd"><span>Matrix multiply:</span> A is (m×k), B is (k×n) → C is (m×n). Inner dimensions must match.</div></div>
  <div class="fb c3"><div class="fm">(AB)ᵀ = BᵀAᵀ &nbsp;&nbsp; (A⁻¹)⁻¹ = A</div><div class="fd"><span>Transpose</span> reverses multiplication order. Only square, full-rank matrices are invertible.</div></div>
  <div class="va">
    <div class="vl">// Interactive 2D vectors — drag to change, see dot product</div>
    <canvas id="vecCanvas" role="img" aria-label="Vectors &amp; Matrices: Interactive 2D vectors — drag to change, see dot product" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Dot products measure alignment here and in <a href="../ml-math/#cosine-sim">cosine similarity</a> for statistics. The same operation that scores <a href="../llm/#self-attention">attention weights</a> in a transformer also measures how two price series co-move in <a href="../markets/risk/#correlation-risk">market correlation</a>.</div>
  ${depthHtml('vectors')}
  <div class="topic-nav" id="nav-vectors"></div>
</div>`;
}

/* 02 — Linear Regression */
function buildLinear() {
  return `<div class="topic" id="linear">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Foundations</div><h2>Linear <em>Regression</em></h2></div>
    <span class="topic-badge">Supervised</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Fitting a line through data — the simplest predictive model</p>
  <p class="prose">Linear regression finds the best-fit line through data. Given input <strong>x</strong>, we predict <strong>ŷ</strong> by learning weight <strong>w</strong> (slope) and bias <strong>b</strong> (intercept) that minimise prediction error.</p>
  <div class="fb"><div class="fm">ŷ = w · x + b</div><div class="fd"><span>ŷ</span> = prediction &nbsp;|&nbsp; <span>w</span> = weight &nbsp;|&nbsp; <span>x</span> = input &nbsp;|&nbsp; <span>b</span> = bias</div></div>
  <div class="fb c2"><div class="fm">MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</div><div class="fd"><span>MSE</span> = Mean Squared Error loss &nbsp;|&nbsp; minimised by gradient descent</div></div>
  <div class="va">
    <div class="vl">// Interactive — drag sliders to fit the line</div>
    <canvas id="linCanvas" role="img" aria-label="Linear Regression: Interactive — drag sliders to fit the line" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Weight w</span><input type="range" id="linW" min="-3" max="3" step="0.05" value="0.5"><span class="vd" id="linWv">0.50</span></div>
      <div class="cg"><span class="cl">Bias b</span><input type="range" id="linB" min="-3" max="3" step="0.05" value="0"><span class="vd" id="linBv">0.00</span></div>
      <div class="cg"><span class="cl">MSE</span><span class="vd" id="linMSE" style="color:var(--accent)">—</span></div>
      <button class="btn" onclick="bestFit()">BEST FIT</button>
    </div>
  </div>
  <div class="callout"><strong>OLS Solution:</strong> For simple linear regression, the optimal weights have a closed-form: w = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)². Gradient descent finds the same answer iteratively.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Fitting a line is the same act everywhere — <a href="../stats/#regression-metrics">linear regression</a> in statistics, <a href="../markets/indicators/#sma">simple moving averages</a> in markets. Wrap the same linear score in a sigmoid and it becomes a classifier: <a href="#logistic">logistic regression</a>.</div>
  ${depthHtml('linear')}
  <div class="topic-nav" id="nav-linear"></div>
</div>`;
}

/* 03 — Logistic Regression */
function buildLogistic() {
  return `<div class="topic" id="logistic">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Foundations</div><h2>Logistic <em>Regression</em></h2></div>
    <span class="topic-badge">Classification</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The bridge from regression to classification — sigmoid turns scores into probabilities</p>
  <p class="prose">Logistic regression wraps a linear model in a <strong>sigmoid function</strong>, producing a probability between 0 and 1. Despite the name, it's a <strong>classifier</strong>, not a regressor. It's the simplest neural network — a single neuron.</p>
  <div class="fb"><div class="fm">P(y=1|x) = σ(w·x + b) = 1/(1 + e^(−(w·x+b)))</div><div class="fd"><span>σ</span> = sigmoid &nbsp;|&nbsp; outputs probability of class 1 &nbsp;|&nbsp; decision boundary at 0.5</div></div>
  <div class="fb c2"><div class="fm">BCE = −[y·log(ŷ) + (1−y)·log(1−ŷ)]</div><div class="fd"><span>Binary Cross-Entropy</span> — penalises confident wrong predictions exponentially</div></div>
  <div class="va">
    <div class="vl">// Decision boundary — adjust weight and bias</div>
    <canvas id="logCanvas" role="img" aria-label="Logistic Regression: Decision boundary — adjust weight and bias" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The sigmoid that squeezes values into [0,1] reappears as <a href="../essays/#essay-threshold">probability curves</a> in statistics and mirrors the S-curve of <a href="../markets/psychology/#market-sentiment-cycle">market sentiment cycles</a> — gradual build, rapid shift, saturation.</div>
  ${depthHtml('logistic')}
  <div class="topic-nav" id="nav-logistic"></div>
</div>`;
}

/* 04 — Gradient Descent */
function buildGradient() {
  return `<div class="topic" id="gradient">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Foundations</div><h2>Gradient <em>Descent</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
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
    <canvas id="gdCanvas" role="img" aria-label="Gradient Descent: Animated loss landscape — adjust learning rate and run" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Learning Rate α</span><input type="range" id="gdLR" min="0.01" max="0.48" step="0.01" value="0.1" oninput="document.getElementById('gdLRv').textContent=parseFloat(this.value).toFixed(2)"><span class="vd" id="gdLRv">0.10</span></div>
      <div class="cg"><span class="cl">Steps</span><span class="vd" id="gdSteps">0</span></div>
      <button class="btn" onclick="runGD()">▶ RUN</button>
      <button class="btn" onclick="resetGD()">↺ RESET</button>
    </div>
  </div>
  <div class="callout warn"><strong>Learning rate:</strong> Too large → overshoot and diverge. Too small → extremely slow convergence. Learning rate warmup + decay schedulers (topic 12) solve this in practice.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rolling downhill on a loss surface is the same intuition behind <a href="../markets/indicators/#roc">Rate of Change</a> in markets — both measure slope to decide direction.</div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Start with <strong>Adam</strong> optimizer (lr=1e-3) — it handles most cases well out of the box</li>
      <li>If training loss plateaus, try <strong>reducing lr by 10x</strong> or use a cosine annealing schedule</li>
      <li>If training loss oscillates wildly → lr is too high — halve it until stable</li>
      <li>Use <strong>gradient clipping</strong> (<code>max_norm=1.0</code>) for RNNs and transformers to prevent exploding gradients</li>
      <li>Monitor both <strong>train loss</strong> and <strong>val loss</strong> — divergence means you're overfitting (see <a href="../stats/#learning-curves">Learning Curves</a>)</li>
    </ol>
    <div class="howto-pitfall"><strong>When gradient descent fails:</strong> Non-convex loss landscapes have local minima and saddle points. SGD with momentum helps escape saddle points; Adam helps with sparse gradients. For very deep networks, poor initialization can cause vanishing gradients — use He or Xavier init.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Adam usually converges faster and with less tuning than plain SGD; well-tuned SGD with momentum often generalises as well or better on vision tasks (Wilson et al. 2017)</li>
      <li>GPT-3 was trained with Adam (β₁ = 0.9, β₂ = 0.95), a linear warmup over the first 375M tokens, then cosine decay (Brown et al. 2020)</li>
      <li>Very large batches can generalise worse unless the learning rate and warmup are scaled with them (Keskar et al. 2017; Goyal et al. 2017)</li>
      <li>Mixed-precision training (FP16/BF16) roughly halves activation memory and speeds training considerably on GPUs with tensor cores, usually without loss of accuracy (Micikevicius et al. 2018)</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Training any neural network. Fine-tuning pre-trained models. Logistic regression on large datasets. Any differentiable loss function.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Tree models (XGBoost, Random Forest) — they use different optimization. Small linear models where closed-form solutions exist (OLS). Problems where derivative-free optimization (genetic algorithms, Bayesian optimization) is more appropriate.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Use this pattern on real data</div>
    <a href="../cases/index.html#housing-regression">Pattern Portal Case: Housing Regression</a>
    <div class="ds-note">Train a baseline model, monitor train/validation loss, and compare learning-rate choices against MAE/RMSE.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install torch scikit-learn
import torch

optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)
for epoch in range(20):
    model.train()
    optimizer.zero_grad()
    pred = model(X_train)
    loss = loss_fn(pred, y_train)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    optimizer.step()</code></pre>
  </div>
  ${depthHtml('gradient')}
  <div class="topic-nav" id="nav-gradient"></div>
</div>`;
}

/* 05 — Activation Functions */
function buildActivation() {
  return `<div class="topic" id="activation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Foundations</div><h2>Activation <em>Functions</em></h2></div>
    <span class="topic-badge">Non-linearity</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
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
    <canvas id="actCanvas" role="img" aria-label="Activation Functions: Select function — solid = f(x), dashed = derivative f′(x)" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> ReLU clips everything below zero — a threshold, like <a href="../markets/charts/#support-resistance">support and resistance</a> levels that prices bounce off.</div>
  ${depthHtml('activation')}
  <div class="topic-nav" id="nav-activation"></div>
</div>`;
}

/* 06 — Bias-Variance */
function buildBiasVariance() {
  return `<div class="topic" id="bias-variance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Foundations</div><h2>Bias-Variance <em>Tradeoff</em></h2></div>
    <span class="topic-badge">Theory</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The fundamental tension between underfitting and overfitting</p>
  <p class="prose">Every model makes two types of errors: <strong>Bias</strong> — systematic error from wrong assumptions (underfitting). <strong>Variance</strong> — sensitivity to noise in training data (overfitting). You can't minimize both simultaneously.</p>
  <div class="fb"><div class="fm">E[(y−ŷ)²] = Bias² + Variance + Irreducible Noise</div><div class="fd">Total expected error decomposes into these three independent terms</div></div>
  <div class="va">
    <div class="vl">// Model complexity vs. error — the classic U-curve</div>
    <canvas id="bvCanvas" role="img" aria-label="Bias-Variance Tradeoff: Model complexity vs. error — the classic U-curve" height="240"></canvas>
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
  <div class="howto">
    <div class="howto-title">How to diagnose this in practice</div>
    <ol>
      <li>Train a simple baseline first and record train/validation metrics.</li>
      <li>If both train and validation scores are weak, add features or use a more expressive model.</li>
      <li>If train score is strong but validation score is weak, add regularization, simplify the model, or collect more data.</li>
      <li>Use learning curves to test whether more data is likely to help before spending time collecting it.</li>
      <li>Confirm the diagnosis with cross-validation; a single lucky split can hide high variance.</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — tuning to the test set:</strong> If you keep checking the final test set while reducing variance, you are training on it indirectly. Keep one final holdout untouched.</div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The U-curve of bias vs. variance is the same tradeoff between <a href="../stats/#confidence-intervals">confidence interval width</a> and precision in statistics. In markets, <a href="../markets/psychology/#overconfidence">overconfidence</a> is low bias, high variance — the model fits noise.</div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li><strong>Random Forests</strong> = low bias, moderate variance → bagging reduces variance. Rarely overfit severely, which is why they're the go-to baseline</li>
      <li><strong>Deep neural networks</strong> = very low bias, potentially high variance → need dropout, weight decay, early stopping, data augmentation</li>
      <li><strong>Linear models</strong> = high bias, low variance → add polynomial features or switch to a more expressive model if underfitting</li>
      <li>The "double descent" phenomenon: very large neural nets can go past the interpolation threshold and generalize well again — the classic U-curve doesn't always hold</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Diagnosing why your model performs poorly. Deciding between a simpler or more complex model. Choosing regularization strength. Understanding why ensemble methods work.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You already know the problem is data quality (garbage in, garbage out). Using pre-trained models where the bias-variance trade-off was already optimized by the pre-training team.</div>
  </div>
  ${depthHtml('bias-variance')}
  <div class="topic-nav" id="nav-bias-variance"></div>
</div>`;
}

/* 07 — Loss Functions */
function buildLoss() {
  return `<div class="topic" id="loss">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Training</div><h2>Loss <em>Functions</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring how wrong the model is — the objective being minimised</p>
  <p class="prose">The loss function defines what the model is optimising. Different tasks need different loss functions. Getting this wrong is one of the most common ML mistakes.</p>
  <div class="fb"><div class="fm">MSE = (1/n)·Σ(y−ŷ)²</div><div class="fd"><span>Regression</span> — squared penalty, sensitive to outliers</div></div>
  <div class="fb c2"><div class="fm">MAE = (1/n)·Σ|y−ŷ|</div><div class="fd"><span>Robust regression</span> — linear penalty, outlier-resistant</div></div>
  <div class="fb c3"><div class="fm">CE = −Σ yᵢ·log(ŷᵢ)</div><div class="fd"><span>Classification</span> — penalises confident wrong predictions exponentially</div></div>
  <div class="fb c4"><div class="fm">Huber = { ½(y−ŷ)² if |y−ŷ|≤δ, δ|y−ŷ|−½δ² otherwise }</div><div class="fd"><span>Huber</span> — smooth MSE near zero, MAE for large errors. Best of both.</div></div>
  <div class="va">
    <div class="vl">// MSE vs MAE vs Huber — drag to see how penalty scales with error</div>
    <canvas id="lossCanvas" role="img" aria-label="Loss Functions: MSE vs MAE vs Huber — drag to see how penalty scales with error" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Error magnitude</span><input type="range" id="errSlider" min="0.05" max="3" step="0.05" value="1" oninput="onErrSlider(this.value)"><span class="vd" id="errVal">1.00</span></div>
      <div class="cg"><span class="cl">MSE</span><span class="vd" id="mseP">1.000</span></div>
      <div class="cg"><span class="cl">MAE</span><span class="vd" id="maeP" style="color:var(--accent2)">1.000</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Loss functions measure distance from truth — like <a href="../markets/indicators/#standard-deviation">variance</a> measures distance from the mean.</div>
  ${depthHtml('loss')}
  <div class="topic-nav" id="nav-loss"></div>
</div>`;
}

/* 08 — Backpropagation */
function buildBackprop() {
  return `<div class="topic" id="backprop">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Training</div><h2><em>Back</em>propagation</h2></div>
    <span class="topic-badge">Algorithm</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Chain rule applied through a network — how every weight gets its gradient</p>
  <p class="prose">Backprop answers: <strong>"how much did each weight contribute to the error?"</strong> It uses the chain rule to propagate gradients backward from the loss to every parameter.</p>
  <div class="fb"><div class="fm">∂L/∂w₁ = ∂L/∂ŷ · ∂ŷ/∂h · ∂h/∂w₁</div><div class="fd"><span>Chain Rule:</span> multiply local gradients along the path from loss back to each weight</div></div>
  <div class="va">
    <div class="vl">// Forward pass → loss → backward pass → weight update</div>
    <canvas id="bpCanvas" role="img" aria-label="Backpropagation: Forward pass → loss → backward pass → weight update" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animBP()">▶ ANIMATE</button>
      <button class="btn" onclick="resetBP()">↺ RESET</button>
      <span id="bpMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px">Click Animate</span>
    </div>
  </div>
  <div class="callout warn"><strong>Vanishing gradients:</strong> In deep networks, multiplying many small numbers (sigmoid derivatives ≤ 0.25) makes early-layer gradients near zero. Solutions: ReLU activations, batch norm, residual connections, gradient clipping (topic 14).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The chain rule propagates credit backward through layers — the same logic as <a href="../markets/psychology/#information-cascades">information cascades</a> in markets where effects ripple back.</div>
  ${depthHtml('backprop')}
  <div class="topic-nav" id="nav-backprop"></div>
</div>`;
}

/* 09 — Optimizers */
function buildOptimizers() {
  return `<div class="topic" id="optimizers">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Training</div><h2><em>Optimizers</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Beyond vanilla SGD — momentum, adaptive learning rates, Adam</p>
  <p class="prose">Modern optimizers improve on vanilla gradient descent by adding <strong>momentum</strong> (using past gradients) and <strong>adaptive rates</strong> (different step size per parameter).</p>
  <div class="fb"><div class="fm">SGD+Momentum: v := βv − α·∇L &nbsp;&nbsp; w := w + v</div><div class="fd"><span>β</span> = momentum (typically 0.9) — accumulates velocity across steps</div></div>
  <div class="fb c2"><div class="fm">RMSProp: s := ρs + (1−ρ)·(∇L)² &nbsp;&nbsp; w := w − α·∇L/√(s+ε)</div><div class="fd">Divides by RMS of recent gradients — large gradients get smaller steps</div></div>
  <div class="fb c3"><div class="fm">Adam: m̂ = m/(1−β₁ᵗ) &nbsp;&nbsp; v̂ = v/(1−β₂ᵗ) &nbsp;&nbsp; w := w − α·m̂/√(v̂+ε)</div><div class="fd"><span>Adam</span> = momentum + RMSProp + bias correction. Default: β₁=0.9, β₂=0.999, ε=1e-8</div></div>
  <div class="va">
    <div class="vl">// Optimizer comparison on a saddle point surface</div>
    <canvas id="optCanvas" role="img" aria-label="Optimizers: Optimizer comparison on a saddle point surface" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Momentum in Adam is literally <a href="../markets/indicators/#roc">momentum</a> in trading — using past velocity to guide the next step. <a href="../markets/indicators/#ema">Exponential moving averages</a> smooth both gradient updates and price series identically.</div>
  ${depthHtml('optimizers')}
  <div class="topic-nav" id="nav-optimizers"></div>
</div>`;
}

/* 10 — Regularization */
function buildRegularization() {
  return `<div class="topic" id="regularization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Training</div><h2><em>Regularization</em></h2></div>
    <span class="topic-badge">Generalization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Preventing overfitting by constraining model complexity</p>
  <p class="prose">Regularization adds a <strong>penalty for complexity</strong> to the loss, discouraging the model from memorising noise and improving generalisation to unseen data.</p>
  <div class="fb"><div class="fm">L_total = L_data + λ·||w||²₂ &nbsp;&nbsp; (L2 / Ridge)</div><div class="fd"><span>λ</span> = regularization strength &nbsp;|&nbsp; drives weights toward zero but not exactly zero</div></div>
  <div class="fb c2"><div class="fm">L_total = L_data + λ·||w||₁ &nbsp;&nbsp; (L1 / Lasso)</div><div class="fd">L1 produces <span>sparse</span> weights — many exactly zero (implicit feature selection)</div></div>
  <div class="fb c3"><div class="fm">Dropout: h̃ = h ⊙ mask/p &nbsp;&nbsp; mask ~ Bernoulli(p)</div><div class="fd">Each neuron zeroed with prob (1−p) during training; scaled by 1/p to preserve expected value</div></div>
  <div class="va">
    <div class="vl">// L1 vs L2 penalty contours — see how they constrain weights differently</div>
    <canvas id="regCanvas" role="img" aria-label="Regularization: L1 vs L2 penalty contours — see how they constrain weights differently" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> L1/L2 penalties constrain complexity. In markets, <a href="../markets/psychology/#loss-aversion">loss aversion</a> acts as a natural regularizer, penalizing risky bets.</div>
  <div class="howto">
    <div class="howto-title">How to apply regularization safely</div>
    <ol>
      <li>Start with an unregularized baseline and save train/validation metrics.</li>
      <li>Add L2/weight decay first; tune it on validation data, not the test set.</li>
      <li>Use L1 only when sparsity or feature selection matters.</li>
      <li>Add dropout for neural nets only when the validation gap is real.</li>
      <li>Re-check calibration and feature importance after regularization; it can change model behavior.</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — regularizing underfit models:</strong> If both train and validation loss are high, regularization will usually make the model worse. Increase capacity or improve features first.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Dropout of 0.1 is common in transformers (BERT uses 0.1); many recent large language models use little or none</li>
      <li>PyTorch’s AdamW defaults to a weight decay of 0.01; large pre-training runs often use 0.1 (GPT-3, LLaMA)</li>
      <li>L1 gives sparse linear models, which helps feature selection and interpretation; in neural networks, unstructured sparsity rarely speeds up inference on standard hardware</li>
      <li>Data augmentation is among the most effective regularisers for vision (flips, crops, colour jitter); Mixup and CutMix extend it (Zhang et al. 2018; Yun et al. 2019)</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Train loss is much lower than val loss (classic overfitting). Small dataset relative to model capacity. Fine-tuning a large model on a small domain dataset.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Model is underfitting (both train and val loss high) — you need more capacity, not less. Very large datasets where overfitting is unlikely (e.g. training CLIP on 400M image-text pairs).</div>
  </div>
  <div class="playground">
    <div class="playground-title">Experiment — regularization strength</div>
    <div class="pg-controls">
      <label>λ (weight decay) <input type="range" id="regExpLambda" min="0" max="100" step="1" value="10" oninput="updateRegPlayground()"><span class="pg-val" id="regExpLV">1e-3</span></label>
      <label>Dropout rate <input type="range" id="regExpDrop" min="0" max="80" step="5" value="20" oninput="updateRegPlayground()"><span class="pg-val" id="regExpDV">0.20</span></label>
      <label>Dataset size <input type="range" id="regExpData" min="100" max="10000" step="100" value="1000" oninput="updateRegPlayground()"><span class="pg-val" id="regExpDataV">1K</span></label>
    </div>
    <div class="pg-output" id="regPlayground">
      <span id="regDiagnosis">Adjust sliders to see how regularization affects your model's behavior.</span>
    </div>
  </div>
  ${depthHtml('regularization')}
  <div class="topic-nav" id="nav-regularization"></div>
</div>`;
}

/* 11 — Batch Norm */
function buildBatchnorm() {
  return `<div class="topic" id="batchnorm">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Training</div><h2>Batch <em>Normalization</em></h2></div>
    <span class="topic-badge">Stabilization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Normalizing activations to keep training stable and fast</p>
  <p class="prose">Batch Normalization normalises each layer's activations to have <strong>zero mean and unit variance</strong> across the mini-batch, then scales/shifts with learned parameters γ and β.</p>
  <div class="fb"><div class="fm">μ_B = (1/m)·Σxᵢ &nbsp;&nbsp; σ²_B = (1/m)·Σ(xᵢ−μ_B)²</div><div class="fd">Compute batch mean and variance</div></div>
  <div class="fb c2"><div class="fm">x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε)</div><div class="fd">Normalise: <span>ε</span> = small constant for numerical stability (1e-5)</div></div>
  <div class="fb c3"><div class="fm">yᵢ = γ · x̂ᵢ + β</div><div class="fd"><span>γ</span> = learned scale &nbsp;|&nbsp; <span>β</span> = learned shift — restores representational power</div></div>
  <div class="va">
    <div class="vl">// Effect of batch norm on activation distributions across layers</div>
    <canvas id="bnCanvas" role="img" aria-label="Batch Normalization: Effect of batch norm on activation distributions across layers" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawBN(false)">WITHOUT BN</button>
      <button class="btn b2" onclick="drawBN(true)">WITH BN</button>
    </div>
  </div>
  <div class="callout"><strong>Layer Norm vs Batch Norm:</strong> BatchNorm normalises over the batch dimension — problematic for small batches and transformers. LayerNorm normalises over the feature dimension and is the standard in transformers. See topic 27 for all variants.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Normalizing activations to zero mean and unit variance is exactly <a href="../stats/#outlier-detection">z-score standardization</a> from statistics. Markets use the same logic: <a href="../markets/indicators/#bollinger-bands">Bollinger Bands</a> normalize price relative to its rolling mean and standard deviation. For transformers and small batches, see the other <a href="#normalization">normalization variants</a>.</div>
  ${depthHtml('batchnorm')}
  <div class="topic-nav" id="nav-batchnorm"></div>
</div>`;
}

/* 12 — LR Scheduling */
function buildLRSchedule() {
  return `<div class="topic" id="lr-schedule">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Training</div><h2>LR <em>Scheduling</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Adjusting the learning rate over training for better convergence</p>
  <p class="prose">A fixed learning rate is rarely optimal. Starting too high causes instability; finishing too high prevents convergence. Schedulers <strong>adjust α during training</strong>.</p>
  <div class="fb"><div class="fm">Cosine Decay: αₜ = αₘᵢₙ + ½(αₘₐₓ−αₘᵢₙ)(1 + cos(πt/T))</div><div class="fd"><span>T</span> = total steps &nbsp;|&nbsp; smoothly decays from αₘₐₓ to αₘᵢₙ</div></div>
  <div class="fb c2"><div class="fm">Warmup: α = αₘₐₓ · (t/t_warmup) &nbsp; for t &lt; t_warmup</div><div class="fd">Linear ramp-up prevents large gradient updates from poorly-initialised weights</div></div>
  <div class="va">
    <div class="vl">// Learning rate schedules — click to compare</div>
    <canvas id="lrCanvas" role="img" aria-label="LR Scheduling: Learning rate schedules — click to compare" height="230"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Cosine decay mimics natural cooling — fast changes early, fine adjustments later. Markets show it in <a href="../markets/psychology/#market-sentiment-cycle">sentiment cycles</a> that heat up and cool down.</div>
  ${depthHtml('lr-schedule')}
  <div class="topic-nav" id="nav-lr-schedule"></div>
</div>`;
}

/* 13 — Weight Initialization */
function buildWeightInit() {
  return `<div class="topic" id="weight-init">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Training</div><h2>Weight <em>Initialization</em></h2></div>
    <span class="topic-badge">Stabilization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How you start determines if you converge — Xavier, He, and why they matter</p>
  <p class="prose">Bad initialization → activations explode or vanish → gradients die → training fails. The goal: keep <strong>variance of activations stable</strong> across layers.</p>
  <div class="fb"><div class="fm">Xavier/Glorot: W ~ N(0, 2/(fan_in + fan_out))</div><div class="fd">Designed for <span>tanh/sigmoid</span> — keeps variance ≈1 going forward and backward</div></div>
  <div class="fb c2"><div class="fm">He/Kaiming: W ~ N(0, 2/fan_in)</div><div class="fd">Designed for <span>ReLU</span> — compensates for ReLU killing half the activations</div></div>
  <div class="va">
    <div class="vl">// Activation variance through 10 layers with different initializations</div>
    <canvas id="initCanvas" role="img" aria-label="Weight Initialization: Activation variance through 10 layers with different initializations" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Xavier initialization sets variance to 1/fan_in — the same principle behind <a href="../markets/risk/#volatility-sizing">variance scaling</a>.</div>
  ${depthHtml('weight-init')}
  <div class="topic-nav" id="nav-weight-init"></div>
</div>`;
}

/* 14 — Gradient Clipping */
function buildGradClip() {
  return `<div class="topic" id="grad-clip">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Training</div><h2>Gradient <em>Clipping</em></h2></div>
    <span class="topic-badge">Stabilization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Preventing exploding gradients by capping their magnitude</p>
  <p class="prose">In RNNs and deep networks, gradients can <strong>explode exponentially</strong> during backprop. Gradient clipping caps the gradient norm before the optimizer step, keeping training stable.</p>
  <div class="fb"><div class="fm">Clip by norm: if ||g|| > max_norm → g := g · max_norm / ||g||</div><div class="fd">Rescales the entire gradient vector to have norm ≤ max_norm. Preserves direction.</div></div>
  <div class="fb c2"><div class="fm">Clip by value: gᵢ := clamp(gᵢ, −clip_val, +clip_val)</div><div class="fd">Clips each element independently. Faster but can change gradient direction.</div></div>
  <div class="va">
    <div class="vl">// Gradient norm over training — with and without clipping</div>
    <canvas id="clipCanvas" role="img" aria-label="Gradient Clipping: Gradient norm over training — with and without clipping" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Capping gradient magnitude is a guardrail — like <a href="../markets/indicators/#atr">ATR-based stops</a> that cap how much a position can move against you.</div>
  ${depthHtml('grad-clip')}
  <div class="topic-nav" id="nav-grad-clip"></div>
</div>`;
}

/* 15 — Softmax */
function buildSoftmax() {
  return `<div class="topic" id="softmax">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Core Math</div><h2>Softmax & <em>Probabilities</em></h2></div>
    <span class="topic-badge">Classification</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Converting raw scores into a probability distribution</p>
  <p class="prose">Softmax maps a vector of real-valued logits to probabilities that <strong>sum to 1</strong>. It amplifies the largest logit, making the winner more decisive.</p>
  <div class="fb"><div class="fm">σ(zᵢ) = e^zᵢ / Σⱼ e^zⱼ</div><div class="fd"><span>zᵢ</span> = logit for class i &nbsp;|&nbsp; numerator = exponentiated score &nbsp;|&nbsp; denominator = normalisation</div></div>
  <div class="va">
    <div class="vl">// Adjust logits — watch probabilities redistribute</div>
    <canvas id="smCanvas" role="img" aria-label="Softmax: Adjust logits — watch probabilities redistribute" height="200"></canvas>
    <div class="ctrl" id="smCtrl"></div>
  </div>
  <div class="callout"><strong>Temperature scaling:</strong> σ(z/T). T&lt;1 → sharper (more confident). T&gt;1 → softer (more uniform). Used in knowledge distillation and language model sampling.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Converting logits to probabilities that sum to 1 is a <a href="../llm/#sampling">probability distribution</a> in action. Temperature scaling changes the "confidence" — hot = uniform = <a href="../markets/psychology/#fear-and-greed">uncertain market</a>, cold = peaked = consensus. Sampling from these probabilities, with temperature, top-k or top-p, is the subject of <a href="../llm/#decoding-strategies">decoding strategies</a>.</div>
  ${depthHtml('softmax')}
  <div class="topic-nav" id="nav-softmax"></div>
</div>`;
}

/* 16 — MLE & Gaussian */
function buildMLE() {
  return `<div class="topic" id="mle">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Core Math</div><h2>MLE & <em>Gaussian</em></h2></div>
    <span class="topic-badge">Probability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Maximum Likelihood Estimation — why MSE and Cross-Entropy exist</p>
  <p class="prose">MLE asks: <strong>what parameters make the observed data most probable?</strong> Most ML training objectives are secretly MLE under a particular assumed distribution.</p>
  <div class="fb"><div class="fm">θ* = argmax_θ Σ log p(xᵢ | θ)</div><div class="fd">Maximise log-likelihood (summing logs avoids numerical underflow with tiny probabilities)</div></div>
  <div class="fb c2"><div class="fm">Gaussian: p(x|μ,σ) = (1/√2πσ²) · exp(−(x−μ)²/2σ²)</div><div class="fd">MLE on Gaussian noise assumption → MSE loss. MLE on Bernoulli → Cross-Entropy loss.</div></div>
  <div class="va">
    <div class="vl">// Gaussian distribution — adjust mean and variance</div>
    <canvas id="gaussCanvas" role="img" aria-label="MLE &amp; Gaussian: Gaussian distribution — adjust mean and variance" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Mean μ</span><input type="range" id="gaussMu" min="-3" max="3" step="0.1" value="0" oninput="drawGauss()"><span class="vd" id="gaussMuV">0.0</span></div>
      <div class="cg"><span class="cl">Std σ</span><input type="range" id="gaussSig" min="0.2" max="2.5" step="0.1" value="1" oninput="drawGauss()"><span class="vd" id="gaussSigV">1.0</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Training with MSE loss = assuming your errors are Gaussian distributed. Training with Cross-Entropy = assuming Bernoulli/Categorical outputs. The loss function encodes your distributional assumption.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Maximum likelihood estimation is the mathematical foundation of <a href="../stats/#distribution-shape">fitting a normal distribution</a> to data. The same principle drives <a href="../markets/indicators/#standard-deviation">volatility estimation</a> in markets — finding the parameters that best explain observed returns.</div>
  ${depthHtml('mle')}
  <div class="topic-nav" id="nav-mle"></div>
</div>`;
}

/* 17 — Entropy */
function buildEntropy() {
  return `<div class="topic" id="entropy">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Core Math</div><h2><em>Entropy</em></h2></div>
    <span class="topic-badge">Information Theory</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring uncertainty — how much "surprise" is in a distribution</p>
  <p class="prose"><strong>Entropy</strong> measures the average amount of information (surprise) in a distribution. A fair coin has maximum entropy (1 bit). A loaded coin has lower entropy. Cross-entropy extends this to compare two distributions.</p>
  <div class="fb"><div class="fm">H(P) = −Σ P(x) · log₂P(x)</div><div class="fd"><span>Shannon Entropy</span> — measured in bits (log₂) or nats (ln). Maximum when uniform, zero when deterministic.</div></div>
  <div class="fb c2"><div class="fm">H(P,Q) = −Σ P(x) · log Q(x)</div><div class="fd"><span>Cross-Entropy</span> — expected surprise when using Q to encode events from P. Always ≥ H(P).</div></div>
  <div class="fb c3"><div class="fm">H(P,Q) = H(P) + KL(P||Q)</div><div class="fd">Cross-entropy = entropy of P + extra bits from approximation error. Minimising CE ≡ minimising KL.</div></div>
  <div class="va">
    <div class="vl">// Binary entropy — adjust probability of heads</div>
    <canvas id="entropyCanvas" role="img" aria-label="Entropy: Binary entropy — adjust probability of heads" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">P(heads)</span><input type="range" id="entP" min="0.01" max="0.99" step="0.01" value="0.5" oninput="drawEntropy()"><span class="vd" id="entPV">0.50</span></div>
      <div class="cg"><span class="cl">Entropy</span><span class="vd" id="entHV" style="color:var(--accent)">1.000 bits</span></div>
    </div>
  </div>
  <div class="callout"><strong>Why CE loss works:</strong> When labels are one-hot, cross-entropy reduces to −log(ŷ_correct). The model only needs to maximise the probability of the correct class.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Shannon entropy measures uncertainty — identical to the <a href="../stats/#information-gain">spread of a distribution</a>. High entropy in <a href="../llm/#sampling">LLM sampling</a> means many plausible next tokens.</div>
  ${depthHtml('entropy')}
  <div class="topic-nav" id="nav-entropy"></div>
</div>`;
}

/* 18 — KL Divergence */
function buildKLDiv() {
  return `<div class="topic" id="kl-div">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Core Math</div><h2>KL <em>Divergence</em></h2></div>
    <span class="topic-badge">Information Theory</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring how different two probability distributions are</p>
  <p class="prose">KL Divergence measures how much information is <strong>lost when using distribution Q to approximate P</strong>. It is not symmetric — KL(P||Q) ≠ KL(Q||P).</p>
  <div class="fb"><div class="fm">KL(P||Q) = Σ P(x) · log(P(x)/Q(x))</div><div class="fd">Always ≥ 0 &nbsp;|&nbsp; = 0 only when P = Q exactly</div></div>
  <div class="fb c2"><div class="fm">KL(P||Q) = ∫ p(x) · log(p(x)/q(x)) dx</div><div class="fd">Continuous case &nbsp;|&nbsp; used in VAE loss, RLHF, variational inference</div></div>
  <div class="va">
    <div class="vl">// Visualise KL divergence between two Gaussians</div>
    <canvas id="klCanvas" role="img" aria-label="KL Divergence: Visualise KL divergence between two Gaussians" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Q mean offset</span><input type="range" id="klOffset" min="0" max="4" step="0.1" value="1" oninput="drawKL()"><span class="vd" id="klOffV">1.0</span></div>
      <div class="cg"><span class="cl">KL(P||Q)</span><span class="vd" id="klVal" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> KL divergence measures how one distribution diverges from another — the same logic as comparing <a href="../stats/#hypothesis-testing">observed vs. expected</a> in hypothesis testing. In markets, the gap between <a href="../markets/psychology/#smart-money-dumb-money">smart money and dumb money</a> positioning is a kind of divergence signal. The KL term that keeps a <a href="#vae">VAE</a>’s latent space smooth is this divergence to a standard normal.</div>
  ${depthHtml('kl-div')}
  <div class="topic-nav" id="nav-kl-div"></div>
</div>`;
}

/* 19 — Bayes */
function buildBayes() {
  return `<div class="topic" id="bayes">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Core Math</div><h2>Bayes' <em>Theorem</em></h2></div>
    <span class="topic-badge">Probability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Updating beliefs with evidence — the foundation of probabilistic ML</p>
  <p class="prose">Bayes' Theorem tells us how to <strong>update a prior belief</strong> when we observe new evidence.</p>
  <div class="fb"><div class="fm">P(A|B) = P(B|A) · P(A) / P(B)</div><div class="fd"><span>P(A|B)</span> = posterior &nbsp;|&nbsp; <span>P(B|A)</span> = likelihood &nbsp;|&nbsp; <span>P(A)</span> = prior &nbsp;|&nbsp; <span>P(B)</span> = evidence</div></div>
  <div class="va">
    <div class="vl">// Medical test — posterior probability after positive result</div>
    <canvas id="bayesCanvas" role="img" aria-label="Bayes' Theorem: Medical test — posterior probability after positive result" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Prior P(disease) %</span><input type="range" id="priorS" min="0.1" max="50" step="0.1" value="1" oninput="onBayes()"><span class="vd" id="priorV">1.0%</span></div>
      <div class="cg"><span class="cl">Sensitivity %</span><input type="range" id="sensS" min="50" max="99" step="1" value="95" oninput="onBayes()"><span class="vd" id="sensV">95%</span></div>
      <div class="cg"><span class="cl">Posterior</span><span class="vd" id="postV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Base rate fallacy:</strong> 1% disease prevalence + 95% accurate test = only ~16% chance you're actually sick after a positive. Low priors dominate!</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Updating beliefs with evidence is the core of <a href="../stats/#bayesian-ab">Bayesian statistics</a>. Traders do it intuitively: new data shifts the <a href="../markets/psychology/#confirmation-bias">prior belief</a> — or doesn’t, when confirmation bias blocks the update.</div>
  ${depthHtml('bayes')}
  <div class="topic-nav" id="nav-bayes"></div>
</div>`;
}

/* 20 — Cross-Validation */
function buildCrossval() {
  return `<div class="topic" id="crossval">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Core Math</div><h2>Cross-<em>Validation</em></h2></div>
    <span class="topic-badge">Evaluation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Reliable model evaluation by rotating which data is used for testing</p>
  <p class="prose"><strong>k-fold cross-validation</strong> averages performance over k splits for a more reliable estimate than a single train/test split.</p>
  <div class="fb"><div class="fm">CV Score = (1/k) · Σᵢ score(model_i, fold_i)</div><div class="fd">Train k models, each evaluated on a different held-out fold</div></div>
  <div class="va">
    <div class="vl">// k-fold cross-validation — click to cycle through folds</div>
    <canvas id="cvCanvas" role="img" aria-label="Cross-Validation: k-fold cross-validation — click to cycle through folds" height="200"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rotating train/test splits prevents overfitting to one sample — the statistical version of <a href="../stats/#clt-sampling">sampling distributions</a>. In markets, <a href="../markets/psychology/#recency-bias">recency bias</a> is what happens when you only test on the latest fold.</div>
  ${depthHtml('crossval')}
  <div class="topic-nav" id="nav-crossval"></div>
</div>`;
}

/* 21 — Eval Metrics */
function buildMetrics() {
  return `<div class="topic" id="metrics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Core Math</div><h2>Evaluation <em>Metrics</em></h2></div>
    <span class="topic-badge">Evaluation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How to actually measure if your model is good</p>
  <p class="prose">Accuracy alone is misleading for imbalanced classes. <strong>Precision, Recall, F1 and ROC-AUC</strong> give a complete picture.</p>
  <div class="fb"><div class="fm">Precision = TP/(TP+FP) &nbsp;&nbsp; Recall = TP/(TP+FN)</div><div class="fd"><span>Precision</span> = of predicted positives, how many real? &nbsp;|&nbsp; <span>Recall</span> = of real positives, how many found?</div></div>
  <div class="fb c2"><div class="fm">F1 = 2·(Precision·Recall)/(Precision+Recall)</div><div class="fd">Harmonic mean — punishes models that sacrifice one for the other</div></div>
  <div class="va">
    <div class="vl">// Interactive confusion matrix</div>
    <canvas id="metricsCanvas" role="img" aria-label="Eval Metrics: Interactive confusion matrix" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">True Positives</span><input type="range" id="mTP" min="1" max="100" step="1" value="80" oninput="drawMetrics()"><span class="vd" id="mTPv">80</span></div>
      <div class="cg"><span class="cl">False Positives</span><input type="range" id="mFP" min="0" max="50" step="1" value="10" oninput="drawMetrics()"><span class="vd" id="mFPv">10</span></div>
      <div class="cg"><span class="cl">False Negatives</span><input type="range" id="mFN" min="0" max="50" step="1" value="20" oninput="drawMetrics()"><span class="vd" id="mFNv">20</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Precision and recall trade off like <a href="../stats/#hypothesis-testing">Type I and Type II errors</a> in hypothesis testing. In markets, a <a href="../markets/indicators/#macd">MACD signal</a> has the same tradeoff: too sensitive (false positives) vs. too slow (missed moves).</div>
  ${depthHtml('metrics')}
  <div class="topic-nav" id="nav-metrics"></div>
</div>`;
}

/* 22 — Cosine Similarity */
function buildCosineSim() {
  return `<div class="topic" id="cosine-sim">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Core Math</div><h2>Cosine <em>Similarity</em></h2></div>
    <span class="topic-badge">Distance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring angular similarity between vectors — the backbone of retrieval</p>
  <p class="prose">Cosine similarity measures the <strong>angle between two vectors</strong>, ignoring magnitude. Two vectors pointing the same direction have similarity 1, opposite = −1, perpendicular = 0. It's the standard metric for embeddings and RAG retrieval.</p>
  <div class="fb"><div class="fm">cos(θ) = (a · b) / (||a|| · ||b||)</div><div class="fd"><span>a · b</span> = dot product &nbsp;|&nbsp; <span>||a||</span> = L2 norm &nbsp;|&nbsp; Range: [−1, 1]</div></div>
  <div class="fb c2"><div class="fm">Cosine Distance = 1 − cos(θ)</div><div class="fd">Converts similarity to distance &nbsp;|&nbsp; Range: [0, 2] &nbsp;|&nbsp; 0 = identical direction</div></div>
  <div class="va">
    <div class="vl">// Two vectors — adjust angle to see similarity change</div>
    <canvas id="cosCanvas" role="img" aria-label="Cosine Similarity: Two vectors — adjust angle to see similarity change" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The angle between embeddings measures semantic similarity — the same geometry as <a href="../stats/#feature-correlation">Pearson correlation</a> on centered data. <a href="../llm/#embedding-search">Vector search in RAG</a> relies on this. The dot products and norms it is built from are in <a href="#vectors">Vectors &amp; Matrices</a>.</div>
  ${depthHtml('cosine-sim')}
  <div class="topic-nav" id="nav-cosine-sim"></div>
</div>`;
}

/* 23 — CNN */
function buildCNN() {
  return `<div class="topic" id="cnn">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Deep Learning</div><h2>CNN — <em>Convolutions</em></h2></div>
    <span class="topic-badge">Architecture</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Exploiting spatial structure with shared local filters</p>
  <p class="prose">Convolutional layers apply a <strong>small learnable filter</strong> across the entire input — translational equivariance.</p>
  <div class="fb"><div class="fm">(f * g)[i,j] = Σₘ Σₙ f[m,n] · g[i−m, j−n]</div><div class="fd"><span>f</span> = filter/kernel &nbsp;|&nbsp; <span>g</span> = input &nbsp;|&nbsp; slide filter, compute dot product at each position</div></div>
  <div class="fb c2"><div class="fm">Output size = ⌊(W − K + 2P)/S⌋ + 1</div><div class="fd"><span>W</span> = input width &nbsp;|&nbsp; <span>K</span> = kernel size &nbsp;|&nbsp; <span>P</span> = padding &nbsp;|&nbsp; <span>S</span> = stride</div></div>
  <div class="va">
    <div class="vl">// Convolution operation — kernel sliding over input</div>
    <canvas id="cnnCanvas" role="img" aria-label="CNN: Convolution operation — kernel sliding over input" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Kernel Size</span><input type="range" id="cnnK" min="1" max="5" step="2" value="3" oninput="drawCNN()"><span class="vd" id="cnnKV">3×3</span></div>
      <div class="cg"><span class="cl">Stride</span><input type="range" id="cnnS" min="1" max="3" step="1" value="1" oninput="drawCNN()"><span class="vd" id="cnnSV">1</span></div>
      <button class="btn" onclick="animCNN()">▶ ANIMATE</button>
    </div>
  </div>
  <div class="code-block"><pre>self.conv1 = nn.Conv2d(in_channels=<span class="st">3</span>, out_channels=<span class="st">64</span>, kernel_size=<span class="st">3</span>, padding=<span class="st">1</span>)
self.pool  = nn.MaxPool2d(kernel_size=<span class="st">2</span>, stride=<span class="st">2</span>)
self.conv2 = nn.Conv2d(<span class="st">64</span>, <span class="st">128</span>, kernel_size=<span class="st">3</span>, padding=<span class="st">1</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Sliding a kernel across an image is the same operation as a <a href="../markets/indicators/#sma">moving average</a> sliding across a price series. Both detect local patterns through shared weights.</div>
  ${depthHtml('cnn')}
  <div class="topic-nav" id="nav-cnn"></div>
</div>`;
}

/* 24 — Embeddings */
function buildEmbeddings() {
  return `<div class="topic" id="embeddings">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Deep Learning</div><h2>Embeddings & <em>Word2Vec</em></h2></div>
    <span class="topic-badge">Representation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Mapping discrete tokens to continuous vector spaces</p>
  <p class="prose">An embedding maps each discrete token to a dense vector where <strong>semantic similarity = geometric proximity</strong>.</p>
  <div class="fb"><div class="fm">Skip-gram: max Σ Σ log P(wₒ | wᵢ)</div><div class="fd">Predict surrounding words from centre word — forces similar words to nearby vectors</div></div>
  <div class="fb c2"><div class="fm">king − man + woman ≈ queen</div><div class="fd">Learned embeddings encode <span>analogical relationships</span> as linear vector arithmetic</div></div>
  <div class="va">
    <div class="vl">// 2D embedding space — semantic clusters</div>
    <canvas id="embCanvas" role="img" aria-label="Embeddings: 2D embedding space — semantic clusters" height="240"></canvas>
  </div>
  <div class="code-block"><pre>self.embed = nn.Embedding(vocab_size=<span class="st">50000</span>, embedding_dim=<span class="st">256</span>)
x = self.embed(token_ids)  <span class="cm"># (batch, seq) → (batch, seq, 256)</span></pre></div>
  <div class="callout"><strong>Modern embeddings:</strong> Word2Vec is the ancestor. Today BERT/GPT produce <em>contextual</em> embeddings — the same word gets different vectors depending on context.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Mapping tokens to vectors where distance = meaning is the same idea behind <a href="../llm/#embeddings">LLM token embeddings</a>.</div>
  ${depthHtml('embeddings')}
  <div class="topic-nav" id="nav-embeddings"></div>
</div>`;
}

/* 25 — Attention */
function buildAttention() {
  return `<div class="topic" id="attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Deep Learning</div><h2>Attention <em>Mechanism</em></h2></div>
    <span class="topic-badge">Architecture</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Selectively focusing on relevant parts of the input</p>
  <p class="prose">Each token asks: <strong>"which other tokens are most relevant to me?"</strong> via dot-product similarity between queries and keys.</p>
  <div class="fb"><div class="fm">Attention(Q,K,V) = softmax(QKᵀ / √d) · V</div><div class="fd"><span>Q</span> = Query &nbsp;|&nbsp; <span>K</span> = Key &nbsp;|&nbsp; <span>V</span> = Value &nbsp;|&nbsp; <span>√d</span> = scaling to prevent saturation</div></div>
  <div class="va">
    <div class="vl">// Attention heatmap — click cells to boost connections</div>
    <canvas id="attCanvas" role="img" aria-label="Attention heatmap — click cells to boost connections" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="rndAtt()">↺ RANDOMIZE</button>
      <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">Click cells to strengthen</span>
    </div>
  </div>
  <div class="callout info"><strong>Multi-Head Attention:</strong> Run h attention functions in parallel, each with different learned projections. Allows attending to syntax, semantics, and coreference simultaneously.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Selectively weighting inputs by relevance appears in <a href="../markets/indicators/#vwap">VWAP</a> (volume-weighted attention to price) and <a href="../llm/#self-attention">transformer self-attention</a>.</div>
  ${depthHtml('attention')}
  <div class="topic-nav" id="nav-attention"></div>
</div>`;
}

/* 26 — Transformer */
function buildTransformer() {
  return `<div class="topic" id="transformer">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Deep Learning</div><h2>Transformer <em>Architecture</em></h2></div>
    <span class="topic-badge">Architecture</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The architecture behind BERT, GPT, and all modern LLMs</p>
  <p class="prose">The Transformer combines <strong>multi-head self-attention</strong> with position-wise feed-forward networks, residual connections, and layer normalisation.</p>
  <div class="fb"><div class="fm">PE(pos, 2i) = sin(pos/10000^(2i/d))</div><div class="fd"><span>Positional Encoding</span> — sine/cosine waves encode token position</div></div>
  <div class="fb c2"><div class="fm">FFN(x) = max(0, xW₁+b₁)W₂+b₂</div><div class="fd">Position-wise feed-forward: two linear layers with ReLU/GELU</div></div>
  <div class="fb c3"><div class="fm">x = LayerNorm(x + Sublayer(x))</div><div class="fd"><span>Residual + LayerNorm</span> — applied around every sublayer</div></div>
  <div class="va">
    <div class="vl">// Transformer block diagram</div>
    <canvas id="transCanvas" role="img" aria-label="Transformer block diagram" height="280"></canvas>
  </div>
  <div class="code-block"><pre>encoder_layer = nn.TransformerEncoderLayer(
    d_model=<span class="st">512</span>, nhead=<span class="st">8</span>, dim_feedforward=<span class="st">2048</span>,
    dropout=<span class="st">0.1</span>, norm_first=<span class="st">True</span>  <span class="cm"># Pre-LN (modern default)</span>
)
transformer = nn.TransformerEncoder(encoder_layer, num_layers=<span class="st">6</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The transformer block — attention + feed-forward + residual — is now the backbone of <a href="../llm/#transformer-block">every modern LLM</a>. GPT-2, counted in the worked example, is a <a href="../llm/#decoder-only">decoder-only</a> model: the original transformer without its encoder.</div>
  ${depthHtml('transformer')}
  <div class="topic-nav" id="nav-transformer"></div>
</div>`;
}

/* 27 — Normalization Variants */
function buildNormalization() {
  return `<div class="topic" id="normalization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Deep Learning</div><h2>Normalization <em>Variants</em></h2></div>
    <span class="topic-badge">Architecture</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// LayerNorm, RMSNorm, GroupNorm — which normalisation for which architecture</p>
  <p class="prose">Different architectures need different normalisation. <strong>BatchNorm</strong> works for CNNs, <strong>LayerNorm</strong> for transformers, <strong>RMSNorm</strong> for modern LLMs (faster, no mean subtraction).</p>
  <div class="fb"><div class="fm">LayerNorm: x̂ = (x − μ) / √(σ² + ε) · γ + β</div><div class="fd">Normalises over <span>features (last dim)</span> — independent of batch size. Standard for transformers.</div></div>
  <div class="fb c2"><div class="fm">RMSNorm: x̂ = x / RMS(x) · γ &nbsp;&nbsp; RMS(x) = √(Σxᵢ²/n)</div><div class="fd">Skips mean subtraction — <span>faster</span> than LayerNorm (7–64% in its authors’ tests). Used in LLaMA, Mistral, Gemma.</div></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> LayerNorm in transformers standardizes activations per sample — the same operation as <a href="../stats/#outlier-detection">z-scoring</a>. It’s why <a href="../markets/indicators/#bollinger-bands">Bollinger Bands</a> work: normalizing price by its own volatility reveals the signal beneath.</div>
  ${depthHtml('normalization')}
  <div class="topic-nav" id="nav-normalization"></div>
</div>`;
}

/* 28 — RNN */
function buildRNN() {
  return `<div class="topic" id="rnn">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Sequence Models</div><h2>RNN — <em>Recurrent</em> Networks</h2></div>
    <span class="topic-badge">Sequential</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Processing sequences by passing hidden state through time</p>
  <p class="prose">RNNs process sequences step-by-step, maintaining a <strong>hidden state h</strong> that carries memory of previous inputs.</p>
  <div class="fb"><div class="fm">hₜ = tanh(Wₕ·hₜ₋₁ + Wₓ·xₜ + b)</div><div class="fd"><span>hₜ</span> = new hidden state &nbsp;|&nbsp; same weights reused at every timestep</div></div>
  <div class="va">
    <div class="vl">// RNN unrolled through time</div>
    <canvas id="rnnCanvas" role="img" aria-label="RNN unrolled through time" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Seq length</span><input type="range" id="rnnLen" min="3" max="6" step="1" value="4" oninput="document.getElementById('rnnLenV').textContent=this.value;drawRNN()"><span class="vd" id="rnnLenV">4</span></div>
      <button class="btn" onclick="animRNN()">▶ ANIMATE</button>
      <button class="btn" onclick="resetRNN()">↺ RESET</button>
      <span id="rnnMsg" style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-left:8px">Click Animate</span>
    </div>
  </div>
  <div class="callout warn"><strong>Vanishing gradient:</strong> Gradients shrink exponentially over many timesteps. LSTM and GRU solve this with gated memory.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Hidden state flowing through time steps is sequential memory — like <a href="../markets/indicators/#ema">exponential moving averages</a> where each value inherits from the past.</div>
  ${depthHtml('rnn')}
  <div class="topic-nav" id="nav-rnn"></div>
</div>`;
}

/* 29 — LSTM */
function buildLSTM() {
  return `<div class="topic" id="lstm">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Sequence Models</div><h2>LSTM — <em>Long Short-Term</em> Memory</h2></div>
    <span class="topic-badge">Sequential</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Gated memory cells that solve the vanishing gradient problem</p>
  <p class="prose">LSTMs add a <strong>cell state c</strong> — a "memory highway" — alongside the hidden state. Three gates control information flow.</p>
  <div class="fb"><div class="fm">fₜ=σ(Wf·[hₜ₋₁,xₜ]) &nbsp; iₜ=σ(Wi·[hₜ₋₁,xₜ]) &nbsp; oₜ=σ(Wo·[hₜ₋₁,xₜ])</div><div class="fd"><span>f</span> = forget &nbsp;|&nbsp; <span>i</span> = input &nbsp;|&nbsp; <span>o</span> = output gates</div></div>
  <div class="fb c2"><div class="fm">cₜ = fₜ ⊙ cₜ₋₁ + iₜ ⊙ tanh(Wc·[hₜ₋₁,xₜ])</div><div class="fd">Cell state update: forget old + write new candidate</div></div>
  <div class="fb c3"><div class="fm">hₜ = oₜ ⊙ tanh(cₜ)</div><div class="fd">Hidden state = filtered cell state</div></div>
  <div class="va">
    <div class="vl">// LSTM gate diagram</div>
    <canvas id="lstmCanvas" role="img" aria-label="LSTM gate diagram" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The forget gate decides what to keep and what to discard — the same selective memory behind <a href="../markets/psychology/#recency-bias">recency bias</a>.</div>
  ${depthHtml('lstm')}
  <div class="topic-nav" id="nav-lstm"></div>
</div>`;
}

/* 30 — GRU */
function buildGRU() {
  return `<div class="topic" id="gru">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Sequence Models</div><h2>GRU — <em>Gated Recurrent</em> Unit</h2></div>
    <span class="topic-badge">Sequential</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// LSTM's streamlined sibling — two gates, one state vector</p>
  <p class="prose">GRU simplifies LSTM by merging cell+hidden state and using only <strong>two gates</strong>: update and reset.</p>
  <div class="fb"><div class="fm">zₜ = σ(Wz·[hₜ₋₁,xₜ]) &nbsp;&nbsp; rₜ = σ(Wr·[hₜ₋₁,xₜ])</div><div class="fd"><span>z</span> = update gate &nbsp;|&nbsp; <span>r</span> = reset gate</div></div>
  <div class="fb c2"><div class="fm">h̃ₜ = tanh(W·[rₜ⊙hₜ₋₁, xₜ])</div><div class="fd">Candidate hidden state — gated by reset</div></div>
  <div class="fb c3"><div class="fm">hₜ = (1−zₜ)⊙hₜ₋₁ + zₜ⊙h̃ₜ</div><div class="fd">Interpolate between old and new state via update gate</div></div>
  <div class="va">
    <div class="vl">// RNN vs GRU vs LSTM — parameter count comparison</div>
    <canvas id="gruCanvas" role="img" aria-label="GRU: RNN vs GRU vs LSTM — parameter count comparison" height="230"></canvas>
  </div>
  <div class="callout"><strong>When to use which:</strong> <strong style="color:var(--accent)">RNN</strong> — quick baseline. <strong style="color:var(--accent2)">GRU</strong> — best default for seq tasks. <strong style="color:var(--accent3)">LSTM</strong> — complex long-range deps. <strong style="color:var(--accent4)">Transformer</strong> — lots of data + GPU.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> GRU merges forget and input into a single update gate — elegant reduction. In markets, <a href="../markets/indicators/#rsi">RSI</a> compresses momentum into one number.</div>
  ${depthHtml('gru')}
  <div class="topic-nav" id="nav-gru"></div>
</div>`;
}

/* 31 — PCA */
function buildPCA() {
  return `<div class="topic" id="pca">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">31 — Generative & Prob.</div><h2>PCA & <em>Eigenvectors</em></h2></div>
    <span class="topic-badge">Dimensionality</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Finding the directions of maximum variance for dimensionality reduction</p>
  <p class="prose">PCA finds the axes along which data <strong>varies the most</strong>. These are the eigenvectors of the covariance matrix.</p>
  <div class="fb"><div class="fm">C = (1/n)·XᵀX &nbsp;&nbsp;&nbsp; Cv = λv</div><div class="fd"><span>C</span> = covariance matrix &nbsp;|&nbsp; <span>v</span> = eigenvector &nbsp;|&nbsp; <span>λ</span> = eigenvalue (variance explained)</div></div>
  <div class="va">
    <div class="vl">// 2D data with principal components — adjust correlation</div>
    <canvas id="pcaCanvas" role="img" aria-label="PCA: 2D data with principal components — adjust correlation" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Correlation</span><input type="range" id="pcaCorr" min="0" max="0.98" step="0.01" value="0.7" oninput="onPCA(this.value)"><span class="vd" id="pcaCorrV">0.70</span></div>
      <div class="cg"><span class="cl">PC1 explains</span><span class="vd" id="pc1V">—</span></div>
      <div class="cg"><span class="cl">PC2 explains</span><span class="vd" id="pc2V" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Finding the axis of maximum variance is the geometric core of <a href="../markets/indicators/#standard-deviation">variance</a> itself. In markets, <a href="../markets/indicators/#adx">ADX</a> extracts the principal direction of trend from noisy price data.</div>
  ${depthHtml('pca')}
  <div class="topic-nav" id="nav-pca"></div>
</div>`;
}

/* 32 — SVD */
function buildSVD() {
  return `<div class="topic" id="svd">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">32 — Generative & Prob.</div><h2>SVD — <em>Singular Value</em> Decomposition</h2></div>
    <span class="topic-badge">Linear Algebra</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Decomposing any matrix into rotation, scaling, and rotation</p>
  <p class="prose">SVD factors <strong>any matrix</strong> into three parts: A = UΣVᵀ. It's the Swiss Army knife of linear algebra — used in PCA, compression, recommenders, and the mathematical foundation of LoRA.</p>
  <div class="fb"><div class="fm">A = UΣVᵀ</div><div class="fd"><span>U</span> = left singular vectors (m×m) &nbsp;|&nbsp; <span>Σ</span> = diagonal singular values &nbsp;|&nbsp; <span>Vᵀ</span> = right singular vectors (n×n)</div></div>
  <div class="fb c2"><div class="fm">A ≈ U_r · Σ_r · V_r^T &nbsp;&nbsp; (rank-r approximation)</div><div class="fd">Keep only top-r singular values → best rank-r approximation (Eckart-Young theorem)</div></div>
  <div class="va">
    <div class="vl">// Low-rank approximation — how many singular values do you need?</div>
    <canvas id="svdCanvas" role="img" aria-label="SVD: Low-rank approximation — how many singular values do you need?" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Decomposing a matrix into rank-1 layers is the math behind <a href="../markets/risk/#factor-models">factor analysis</a> in statistics and <a href="../llm/#lora-qlora">LoRA’s low-rank updates</a>.</div>
  ${depthHtml('svd')}
  <div class="topic-nav" id="nav-svd"></div>
</div>`;
}

/* 33 — VAE */
function buildVAE() {
  return `<div class="topic" id="vae">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">33 — Generative & Prob.</div><h2>VAE — Variational <em>Autoencoder</em></h2></div>
    <span class="topic-badge">Generative</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Learning a structured latent space for generation and interpolation</p>
  <p class="prose">A VAE encodes inputs to a <strong>distribution over latent vectors</strong>, then decodes samples. The KL term forces a smooth, continuous latent space.</p>
  <div class="fb"><div class="fm">ELBO = E[log p(x|z)] − KL(q(z|x) || p(z))</div><div class="fd"><span>ELBO</span> = reconstruction + KL regularization</div></div>
  <div class="fb c2"><div class="fm">z = μ + σ·ε &nbsp;&nbsp; ε ~ N(0,1)</div><div class="fd"><span>Reparameterization trick:</span> makes sampling differentiable</div></div>
  <div class="va">
    <div class="vl">// VAE architecture diagram</div>
    <canvas id="vaeCanvas" role="img" aria-label="VAE architecture diagram" height="240"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Encoding data into a structured latent space, then decoding it. The KL term is a <a href="../essays/#essay-bell">normal distribution</a> regularizer — pulling the latent space toward Gaussian structure.</div>
  ${depthHtml('vae')}
  <div class="topic-nav" id="nav-vae"></div>
</div>`;
}

/* 34 — Diffusion */
function buildDiffusion() {
  return `<div class="topic" id="diffusion">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">34 — Generative & Prob.</div><h2>Diffusion <em>Models</em></h2></div>
    <span class="topic-badge">Generative</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Generating by learning to reverse a noise process (DDPM, Stable Diffusion)</p>
  <p class="prose">Diffusion models learn to <strong>denoise data</strong>. The forward process adds noise; a neural network learns to reverse it.</p>
  <div class="fb"><div class="fm">Forward: q(xₜ|xₜ₋₁) = N(xₜ; √(1−β)·xₜ₋₁, β·I)</div><div class="fd">Adds noise β at each step. After T steps, data ≈ pure Gaussian noise.</div></div>
  <div class="fb c2"><div class="fm">xₜ = √ᾱₜ·x₀ + √(1−ᾱₜ)·ε &nbsp;&nbsp; ε~N(0,I)</div><div class="fd">Closed form for any timestep t.</div></div>
  <div class="fb c3"><div class="fm">L = E[||ε − εθ(xₜ,t)||²]</div><div class="fd">Training: predict the noise ε that was added.</div></div>
  <div class="va">
    <div class="vl">// Forward diffusion — noise being added over timesteps</div>
    <canvas id="diffCanvas" role="img" aria-label="Diffusion Models: Forward diffusion — noise being added over timesteps" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Timestep t</span><input type="range" id="diffT" min="0" max="100" step="1" value="0" oninput="drawDiffusion(this.value)"><span class="vd" id="diffTV">0</span></div>
      <button class="btn" onclick="animDiff()">▶ FORWARD PROCESS</button>
    </div>
  </div>
  <div class="callout info"><strong>DDPM → DDIM → Latent Diffusion:</strong> DDPM (2020). DDIM made sampling 10–50× faster. Latent Diffusion (Stable Diffusion) runs in compressed latent space — enabling image generation on consumer GPUs.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Adding noise then learning to reverse it mirrors <a href="../stats/#clt-sampling">the central limit theorem</a> in reverse — from Gaussian noise back to structured signal. In markets, <a href="../markets/psychology/#euphoria-panic">euphoria and panic</a> inject noise that mean-reverts to equilibrium.</div>
  ${depthHtml('diffusion')}
  <div class="topic-nav" id="nav-diffusion"></div>
</div>`;
}

/* 35 — GAN */
function buildGAN() {
  return `<div class="topic" id="gan">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">35 — Generative & Prob.</div><h2>GANs — Generative <em>Adversarial</em> Networks</h2></div>
    <span class="topic-badge">Generative</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Two networks competing: generator vs discriminator</p>
  <p class="prose">GANs pit a <strong>Generator G</strong> against a <strong>Discriminator D</strong> in a minimax game.</p>
  <div class="fb"><div class="fm">min_G max_D V(D,G) = E[log D(x)] + E[log(1−D(G(z)))]</div><div class="fd">Minimax objective: at equilibrium D(x) = 0.5 everywhere.</div></div>
  <div class="va">
    <div class="vl">// GAN training dynamics</div>
    <canvas id="ganCanvas" role="img" aria-label="GANs: GAN training dynamics" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animGAN()">▶ SIMULATE TRAINING</button>
      <button class="btn" onclick="resetGAN()">↺ RESET</button>
      <span id="ganMsg" style="font-family:var(--mono);font-size:10px;color:var(--muted)"></span>
    </div>
  </div>
  <div class="callout warn"><strong>Mode collapse:</strong> The biggest GAN failure — G learns only a few convincing samples. WGAN and gradient penalty (WGAN-GP) are the standard fixes.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The generator-discriminator game is two opposing forces that produce something neither could alone. In markets, <a href="../markets/psychology/#contrarian-thinking">contrarian vs. herd</a> is the same adversarial dynamic.</div>
  ${depthHtml('gan')}
  <div class="topic-nav" id="nav-gan"></div>
</div>`;
}

/* 36 — Tokenization (BPE) */
function buildTokenization() {
  return `<div class="topic" id="tokenization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">36 — Modern / LLM</div><h2>Tokenization <em>(BPE)</em></h2></div>
    <span class="topic-badge">NLP</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How text becomes numbers — the first step in every language model</p>
  <p class="prose">Byte Pair Encoding (BPE) builds a vocabulary by <strong>iteratively merging the most frequent pair</strong> of tokens. It handles unseen words via subword splitting — no unknown tokens needed.</p>
  <div class="fb"><div class="fm">BPE: repeatedly merge most frequent adjacent pair</div><div class="fd">"lowest" → ["low", "est"] or ["l", "ow", "est"] depending on learned merges</div></div>
  <div class="fb c2"><div class="fm">Vocab size: typically 32k–128k tokens</div><div class="fd">GPT-2: 50,257 &nbsp;|&nbsp; LLaMA: 32,000 &nbsp;|&nbsp; GPT-4: ~100,000</div></div>
  <div class="va">
    <div class="vl">// BPE merge process — watch vocabulary build up</div>
    <canvas id="bpeCanvas" role="img" aria-label="Tokenization (BPE): BPE merge process — watch vocabulary build up" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Byte Pair Encoding merges frequent pairs into tokens — the same compression principle behind <a href="../llm/#tokenization">LLM vocabularies</a>. In statistics, binning into percentiles is discretization of continuous data.</div>
  ${depthHtml('tokenization')}
  <div class="topic-nav" id="nav-tokenization"></div>
</div>`;
}

/* 37 — LoRA */
function buildLoRA() {
  return `<div class="topic" id="lora">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">37 — Modern / LLM</div><h2>LoRA — <em>Low-Rank</em> Adaptation</h2></div>
    <span class="topic-badge">Fine-tuning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Training billion-parameter models by updating only tiny low-rank matrices</p>
  <p class="prose">LoRA freezes the original weights and injects <strong>small trainable rank-r matrices</strong> alongside each layer. Instead of updating a d×d weight matrix (millions of params), you update d×r + r×d (thousands).</p>
  <div class="fb"><div class="fm">W' = W + ΔW = W + B·A &nbsp;&nbsp; B ∈ ℝ^(d×r), A ∈ ℝ^(r×d)</div><div class="fd"><span>W</span> = frozen original weights &nbsp;|&nbsp; <span>B·A</span> = low-rank update &nbsp;|&nbsp; <span>r</span> = rank (4–64 typical)</div></div>
  <div class="fb c2"><div class="fm">Params: d² → 2·d·r &nbsp;&nbsp; (e.g., 4096² = 16.7M → 2·4096·16 = 131K)</div><div class="fd">A 99.2% reduction in trainable parameters for rank r=16</div></div>
  <div class="va">
    <div class="vl">// Parameter savings — full fine-tuning vs LoRA</div>
    <canvas id="loraCanvas" role="img" aria-label="LoRA: Parameter savings — full fine-tuning vs LoRA" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Low-rank adaptation fine-tunes with tiny matrices — the same rank reduction as <a href="../ml-math/#pca">principal components</a>. <a href="../llm/#lora-qlora">LoRA in LLM engineering</a> is the applied version.</div>
  ${depthHtml('lora')}
  <div class="topic-nav" id="nav-lora"></div>
</div>`;
}

/* 38 — RLHF */
function buildRLHF() {
  return `<div class="topic" id="rlhf">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">38 — Modern / LLM</div><h2>RLHF — <em>Alignment</em></h2></div>
    <span class="topic-badge">Alignment</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Making language models helpful, harmless, and honest with human feedback</p>
  <p class="prose">RLHF aligns a pretrained LLM with human preferences in three stages: supervised fine-tuning, reward model training, and PPO optimization. <strong>DPO</strong> simplifies this to a single training step.</p>
  <div class="fb"><div class="fm">Stage 1: SFT — fine-tune on high-quality demonstrations</div><div class="fd">Supervised fine-tuning on curated instruction-response pairs</div></div>
  <div class="fb c2"><div class="fm">Stage 2: Reward Model — R(x,y) trained on human preferences</div><div class="fd">Human annotators rank outputs; model learns to predict which response humans prefer</div></div>
  <div class="fb c3"><div class="fm">Stage 3: PPO — max E[R(x,y)] − β·KL(π||π_ref)</div><div class="fd">Optimise policy to maximise reward while staying close to SFT model (prevents reward hacking)</div></div>
  <div class="fb c4"><div class="fm">DPO: L = −log σ(β(log π(y_w|x)/π_ref(y_w|x) − log π(y_l|x)/π_ref(y_l|x)))</div><div class="fd"><span>DPO</span> = Direct Preference Optimization — no reward model needed. Simpler, more stable.</div></div>
  <div class="va">
    <div class="vl">// RLHF pipeline — three-stage process</div>
    <canvas id="rlhfCanvas" role="img" aria-label="RLHF pipeline — three-stage process" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animRLHF()">▶ WALK THROUGH</button>
      <button class="btn" onclick="resetRLHF()">↺ RESET</button>
      <span id="rlhfMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px"></span>
    </div>
  </div>
  <div class="callout info"><strong>DPO vs RLHF:</strong> DPO reformulates RLHF as a simple classification loss on preference pairs — no reward model, no PPO, no RL instability. LLaMA 2, Zephyr, and many modern models use DPO.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Training a reward model from human preferences connects to <a href="../llm/#rlhf">RLHF in LLM alignment</a> and <a href="../stats/#hypothesis-testing">preference testing</a> in statistics. In markets, <a href="../markets/psychology/#herd-behavior">herd behavior</a> is collective preference shaping price — the market’s reward signal. The one-step alternative has its own topic: <a href="../llm/#dpo">DPO</a>.</div>
  ${depthHtml('rlhf')}
  <div class="topic-nav" id="nav-rlhf"></div>
</div>`;
}
