/* ═══════════════════════════════════════════════════════════════
   Deep Learning Lab — Activities Data & Content Builder
   10 interactive deep learning architecture activities
   ═══════════════════════════════════════════════════════════════ */

function T(symbol, def) {
  const safe = def.replace(/"/g, '&quot;');
  return `<span class="fd-term" data-def="${safe}" data-sym="${symbol}">${symbol}</span>`;
}

const NARRATIONS = {
  'cnn-filter': [
    'A convolutional layer slides a small filter — a grid of weights — across the entire input. At every position it multiplies the filter values by the overlapping pixels and sums the result.',
    'Paint something on the input grid. The filter scans from top-left to bottom-right, one step at a time. Each position produces one number in the output feature map.',
    'The output value is high where the input pattern matches the filter pattern. An edge-detect filter fires strongly at boundaries; a blur filter fires strongly on smooth regions.',
    'One filter produces one feature map. A real CNN layer has dozens or hundreds of filters in parallel — each learning to detect a different feature at this scale.',
    'Stack multiple layers and the network learns to detect increasingly complex patterns: edges → textures → parts → objects. The filter weights are learned by backpropagation.',
  ],
  'self-attention': [
    'Attention asks: "which other tokens in the sequence are relevant to this token?" Every token produces three vectors — Query, Key, and Value.',
    'Click any word. Its Query vector is compared (dot product) against every other token\'s Key vector. Higher dot product = more relevant.',
    'The raw scores are scaled by √d to prevent extremely large values, then passed through softmax to produce attention weights that sum to 1.',
    'Each token\'s output is a weighted sum of all Value vectors — weighted by the attention scores. Tokens that "attend" strongly pull in more of each other\'s meaning.',
    'Self-attention lets every token interact with every other token in one step, regardless of distance. This is why transformers handle long-range dependencies better than RNNs.',
  ],
  'autoencoder': [
    'An autoencoder has two halves: an encoder that compresses the input into a small code, and a decoder that reconstructs the original from that code.',
    'Paint a shape on the input grid. The encoder squeezes it through a narrow bottleneck — fewer neurons than the input, so it must discard details.',
    'The bottleneck is the only thing the decoder sees. It must reconstruct the full input from this compressed representation.',
    'Drag the bottleneck slider smaller. More compression = blurrier reconstruction. The code captures only the most essential structure.',
    'The network is trained by minimising reconstruction loss — the pixel-by-pixel difference between input and output. No labels needed. That\'s unsupervised learning.',
  ],
  'vae': [
    'A Variational Autoencoder encodes not to a single point but to a distribution — a Gaussian blob in latent space. The encoder outputs a mean and a variance.',
    'During training, the model samples a random point from that Gaussian before decoding. This forces nearby latent points to decode to similar outputs.',
    'The latent space becomes smooth and continuous — you can walk through it and get meaningful outputs the whole way. Regular autoencoders have "holes" between training examples.',
    'Click anywhere in the latent canvas. A point is sampled from that region and decoded into an output. Points near the centre decode to average shapes; edges to more extreme ones.',
    'The VAE loss has two terms: reconstruction loss (make the output look like the input) and KL divergence (keep the latent distribution close to a standard Gaussian).',
  ],
  'unet': [
    'U-Net is an encoder-decoder architecture with a twist: skip connections that copy feature maps directly from each encoder layer to the matching decoder layer.',
    'The encoder compresses the input, extracting increasingly abstract features while halving spatial resolution at each stage. Spatial detail is lost but semantic content is preserved.',
    'The decoder upsamples back to full resolution. Without skip connections it only sees abstract features — it would struggle to place details precisely in space.',
    'Skip connections paste the encoder\'s high-resolution detail directly into the decoder at the matching level. The decoder can be precise about *where* and abstract about *what*.',
    'Originally designed for biomedical image segmentation. Now the backbone of most diffusion model architectures — the denoising network is almost always a U-Net.',
  ],
  'seq2seq': [
    'Seq2Seq has an encoder and a decoder. The encoder reads the entire input sequence and compresses it into a context vector — a fixed-size summary.',
    'The decoder uses the context vector as its starting state and generates one output token at a time, each conditioned on all previously generated tokens.',
    'Without attention, the context vector is the only bridge — a severe bottleneck for long sequences. The entire input must fit into one vector.',
    'With attention, the decoder can query the encoder at every step. It learns which input positions are most relevant for each output position. The alignment matrix shows this.',
    'The bright diagonal in the attention matrix means each output token mostly attends to the corresponding input token — the classic pattern for translation. Off-diagonal weights capture reordering.',
  ],
  'gan': [
    'A GAN has two competing networks: a Generator that creates fake samples, and a Discriminator that tries to tell fakes from real.',
    'The Generator starts producing random noise. The Discriminator easily spots the fakes — they look nothing like the real distribution.',
    'The Generator is updated to fool the Discriminator. The Discriminator is updated to keep distinguishing them. Each improves in response to the other.',
    'As training progresses the generated distribution creeps toward the real one. The Discriminator\'s job gets harder — it approaches 50% accuracy when both are perfect.',
    'In equilibrium, the Generator produces samples indistinguishable from real data. The Discriminator can no longer do better than random guessing. That\'s the Nash equilibrium.',
  ],
  'diffusion': [
    'Diffusion models destroy structure by adding Gaussian noise over T time steps. The forward process is fixed and simple — just progressively noisier versions of the input.',
    'The model learns the reverse: given a noisy image at step t, predict the noise that was added. Subtracting the prediction gives a slightly cleaner version.',
    'At inference time, start from pure Gaussian noise (step T) and apply the learned denoising function T times. Structure gradually emerges from randomness.',
    'Drag the timestep slider right to add noise, left to denoise. At t=0 the original structure is clear. At t=T it is pure noise with no trace of the original.',
    'The key insight: learning to denoise is equivalent to learning the data distribution. The score function — the gradient of the log probability — points toward more likely data.',
  ],
  'residual': [
    'In a deep network without skip connections, the gradient must travel back through every layer. Multiply many numbers less than 1 together — the gradient vanishes.',
    'A residual connection adds the input of a block directly to its output: output = F(x) + x. The gradient now has a direct highway back to earlier layers.',
    'With the skip connection, backpropagation can flow through the addition unchanged. The network can be 50, 100, even 1000 layers deep and still train well.',
    'The layers learn the residual — the difference between input and desired output — rather than the full transformation. Small corrections are easier to learn than large ones.',
    'ResNet introduced residual connections in 2015 and enabled networks deep enough to win ImageNet by a large margin. Almost every modern architecture uses them.',
  ],
  'embeddings': [
    'An embedding maps a discrete token — a word, a user ID, a category — to a dense vector of real numbers. Similar tokens end up near each other in this vector space.',
    'The vectors are learned by training on a task. Words that appear in similar contexts get pushed together. "King" and "Queen" end up nearby; "King" and "Banana" end up far apart.',
    'Hover over any point to see its label. Click to see its nearest neighbours connected by lines. The clusters that form reflect real semantic relationships.',
    'The geometry is meaningful: vector arithmetic works. King − Man + Woman ≈ Queen. The difference vector encodes the "gender" concept as a direction in space.',
    'Embeddings are the input layer of almost every modern deep learning model. Images, audio, graphs, molecules — everything gets embedded before the main network processes it.',
  ],
  'kalman': [
    'A Kalman filter tracks a hidden state from noisy measurements. It runs two steps forever: predict where the state should go, then update that guess with the next measurement.',
    'The Kalman gain K decides who to trust. K = 0 means ignore the sensor and follow the model; K = 1 means snap to the sensor; in between it blends the two. Drag the emitter line to feel it.',
    'In the univariate sandbox, Q is how much you expect the true state to drift (process noise) and R is how noisy you think the sensor is (measurement noise). Watch the teal estimate thread between the green truth and the orange measurements.',
    'Notice the K(t) and P(t) sub-graphs settle to steady values after a few steps. The filter converges: the gain and the uncertainty stop changing once it has learned how much to trust each source.',
    'High R (distrust the sensor) → low gain, smooth but laggy estimate. High Q (expect fast drift) → high gain, responsive but jittery estimate. Tuning Q and R is the whole art of filtering.',
    'The multivariate sandbox tracks two coupled temperatures. The A matrix mixes core and surface each step; the thermal-coupling slider fills its off-diagonals. The K matrix is the steady-state gain solved from the Riccati recursion — watch both heatmaps respond live.',
  ],
  'mlp-deep': [
    'This is a real, trainable neural network — two inputs, a hidden layer, one output — running full forward-pass and backpropagation in your browser. No libraries, no faking. Hit ▶ Train and watch it learn.',
    'The right panel is the decision boundary: the network\'s guess at every point in the input space. As training runs, the boundary bends to separate the teal dots (class 1) from the orange dots (class 0). The "circle" and "XOR" datasets are impossible for a single straight line — the hidden layer is what bends the boundary.',
    'Every connection is a weight. Teal lines are positive weights, orange are negative, and thickness is magnitude. During training the weights move; the lines thicken, thin, and flip colour as the network reorganises itself.',
    'Now go to the emitter level. Click any neuron in the diagram. The inspector shows exactly what it does: each incoming signal times its weight, summed with the bias to give z, then squashed by the activation function into a — the value it emits to the next layer. The orange dot on the curve is its current operating point.',
    'Click anywhere on the decision-boundary panel to move the white probe. That sets the input the whole diagram forward-passes, so you can watch one specific point flow through every neuron and see what each one emits for it.',
    'Tick "show gradients" to overlay backpropagation: purple dashed lines, thickness ∝ |∂Loss/∂weight| — the correction signal flowing backward. Big gradients early in training, fading toward zero as the loss flattens and the network converges.',
  ],
};

const _narratorStep = {};
function showNarration(topicId, stepIdx) {
  const steps = NARRATIONS[topicId];
  if (!steps) return;
  const bar = document.getElementById('narrator-' + topicId);
  if (!bar) return;
  _narratorStep[topicId] = stepIdx;
  bar.classList.add('active');
  bar.querySelector('.narrator-step').textContent = `Step ${stepIdx + 1} of ${steps.length}`;
  bar.querySelector('.narrator-text').textContent = steps[stepIdx] || '';
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => d.classList.toggle('active', i === stepIdx));
  const btn = bar.querySelector('.narrator-next');
  if (btn) btn.textContent = stepIdx < steps.length - 1 ? 'Next →' : '✓ Done';
}
function hideNarration(topicId) {
  const bar = document.getElementById('narrator-' + topicId);
  if (bar) bar.classList.remove('active');
}
function buildNarratorBar(topicId) {
  const dots = (NARRATIONS[topicId] || []).map(() => '<div class="narrator-dot"></div>').join('');
  return `<div class="narrator-bar" id="narrator-${topicId}">
    <div class="narrator-icon">💡</div>
    <div class="narrator-body">
      <div class="narrator-step"></div>
      <div class="narrator-text"></div>
      <div class="narrator-dots">${dots}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">
      <button class="narrator-next" onclick="(function(){const steps=NARRATIONS['${topicId}'];const cur=_narratorStep['${topicId}']||0;if(cur<steps.length-1){showNarration('${topicId}',cur+1);}else{hideNarration('${topicId}');}})()">Next →</button>
      <button class="narrator-close" onclick="hideNarration('${topicId}')" title="Close">✕</button>
    </div>
  </div>`;
}

const SECTIONS = [
  { id:'sec-dl-lab', title:'Deep Learning Lab', topics:['cnn-filter','self-attention','autoencoder','vae','unet','seq2seq','gan','diffusion','residual','embeddings','kalman','mlp-deep'] },
];
const TOPICS = SECTIONS.flatMap(s => s.topics);
const TOPIC_NAMES = {
  'cnn-filter':    'CNN Filter Explorer',
  'self-attention':'Self-Attention',
  'autoencoder':   'Autoencoder',
  'vae':           'Variational Autoencoder',
  'unet':          'U-Net',
  'seq2seq':       'Seq2Seq + Attention',
  'gan':           'GAN Training',
  'diffusion':     'Diffusion Process',
  'residual':      'Residual Networks',
  'embeddings':    'Embedding Space',
  'kalman':        'Discrete Kalman Filter',
  'mlp-deep':      'Neural Network: Deep Dive',
};
const TOPIC_DATA = [
  { id:'cnn-filter',    num:'D1',  title:'CNN Filter Explorer',        category:'Deep Learning Lab', keywords:['CNN','convolution','filter','kernel','feature map','stride','padding','pooling','edge detection'], content:'Paint on a grid and watch a convolution filter slide across it, producing a feature map in real time.' },
  { id:'self-attention',num:'D2',  title:'Self-Attention',             category:'Deep Learning Lab', keywords:['attention','transformer','query','key','value','softmax','dot product','multi-head','BERT','GPT'], content:'Click a token and watch its attention weights light up across the sequence. The core of every transformer.' },
  { id:'autoencoder',   num:'D3',  title:'Autoencoder',                category:'Deep Learning Lab', keywords:['autoencoder','encoder','decoder','bottleneck','latent','reconstruction','compression','unsupervised'], content:'Compress a painted shape through a bottleneck and watch the decoder reconstruct it. Drag to change compression level.' },
  { id:'vae',           num:'D4',  title:'Variational Autoencoder',    category:'Deep Learning Lab', keywords:['VAE','variational','latent space','Gaussian','KL divergence','reparameterization','generative','sampling'], content:'Click in a 2D latent space to decode a point into a shape. The smooth, continuous space is the key VAE property.' },
  { id:'unet',          num:'D5',  title:'U-Net',                      category:'Deep Learning Lab', keywords:['U-Net','skip connections','encoder decoder','segmentation','upsampling','feature maps','diffusion backbone'], content:'Animated U-Net architecture — watch data flow down through the encoder, across the bottleneck, up through the decoder with skip connections.' },
  { id:'seq2seq',       num:'D6',  title:'Seq2Seq + Attention',        category:'Deep Learning Lab', keywords:['seq2seq','encoder decoder','attention','alignment','context vector','translation','RNN','LSTM','Bahdanau'], content:'Watch an encoder read a sequence and a decoder generate an output. The attention alignment matrix shows where the decoder looks at each step.' },
  { id:'gan',           num:'D7',  title:'GAN Training',               category:'Deep Learning Lab', keywords:['GAN','generator','discriminator','adversarial','Nash equilibrium','mode collapse','distribution matching'], content:'A 1D GAN: the generator tries to match the real distribution while the discriminator tries to tell them apart. Watch the distributions converge.' },
  { id:'diffusion',     num:'D8',  title:'Diffusion Process',          category:'Deep Learning Lab', keywords:['diffusion','denoising','DDPM','score matching','noise schedule','forward process','reverse process','DALL-E','Stable Diffusion'], content:'Drag the timestep slider to add noise forward or denoise backward. Structure dissolves and re-emerges.' },
  { id:'residual',      num:'D9',  title:'Residual Networks',          category:'Deep Learning Lab', keywords:['ResNet','skip connection','residual','vanishing gradient','deep network','identity mapping','batch norm','He initialization'], content:'Toggle skip connections and watch the gradient signal fade in a deep network — or stay strong with residuals.' },
  { id:'embeddings',    num:'D10', title:'Embedding Space',            category:'Deep Learning Lab', keywords:['embeddings','word2vec','semantic space','nearest neighbours','vector arithmetic','representation learning','cosine similarity'], content:'A 2D projection of a semantic embedding space. Hover for labels, click to see nearest neighbours, discover the geometry of meaning.' },
  { id:'kalman',        num:'D11', title:'Discrete Kalman Filter',     category:'Deep Learning Lab', keywords:['Kalman filter','DKF','predict update','Kalman gain','state estimation','covariance','process noise','measurement noise','sensor fusion','recursive estimation','filtering','Riccati'], content:'Predict/update cycle with colour-coded formulas, a univariate sandbox tuning process and measurement noise, and a multivariate thermal model with live Kalman-gain and transition-matrix heatmaps.' },
  { id:'mlp-deep',      num:'D12', title:'Neural Network: Deep Dive',   category:'Deep Learning Lab', keywords:['neural network','MLP','multilayer perceptron','neuron','emitter','perceptron','forward pass','backpropagation','gradient descent','weights','bias','activation function','tanh','sigmoid','ReLU','decision boundary','training','hidden layer','classification','XOR'], content:'A real, trainable multilayer perceptron. Watch it learn a decision boundary, then click any neuron to drill down to the emitter level — its weights, weighted sum, activation curve, and exactly what it emits downstream.' },
];

const EXPLAINERS = {
  'cnn-filter': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Convolution</h3>
    <p>A filter (kernel) is a small matrix of learnable weights. Sliding it across the input and computing the dot product at each position produces one feature map. Multiple filters in parallel produce multiple channels.</p>
    <div class="exp-formula">${T('output[i,j]','The value at position (i,j) in the feature map — one number per filter position.')} = Σ ${T('filter[m,n]','One weight in the filter grid — learned during training.')} · ${T('input[i+m, j+n]','The overlapping input pixel at this filter position.')}</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Edge-detect filter: fires at boundaries, silent on flat regions.</li>
      <li>Blur filter: averages neighbours — smooths sharp transitions.</li>
      <li>The output is smaller than the input by (filter_size − 1) without padding.</li>
      <li>Stride > 1 skips positions and shrinks the output further — like subsampling.</li>
    </ul>
  </details>`,
  'self-attention': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Scaled Dot-Product Attention</h3>
    <p>Each token produces three vectors via learned linear projections: a Query (what am I looking for?), a Key (what do I contain?), and a Value (what will I contribute?).</p>
    <div class="exp-formula">${T('Attention(Q,K,V)','The full attention operation — returns a weighted sum of values.')} = softmax( ${T('QKᵀ','Dot product of Query and all Keys — measures relevance between tokens.')} / ${T('√d_k','Square root of key dimension — scales scores to prevent vanishing gradients in softmax.')} ) · ${T('V','Value vectors — the actual content that gets mixed according to attention weights.')}</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Tokens near the query in meaning show higher attention weights.</li>
      <li>The weights always sum to 1 (softmax) — it is a weighted average.</li>
      <li>Multi-head attention runs this in parallel with different projections — each head can attend to different relationships.</li>
      <li>Positional encoding is needed because attention is order-agnostic by itself.</li>
    </ul>
  </details>`,
  'autoencoder': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Encoder–Decoder Compression</h3>
    <p>The encoder maps a high-dimensional input to a low-dimensional code (the bottleneck). The decoder maps the code back to the original space. Training minimises the difference between input and output.</p>
    <div class="exp-formula">${T('L','Reconstruction loss — measures how different the output is from the input.')} = ||${T('x','The original input.')} − ${T('D(E(x))','Decoded version of the encoded input — the reconstruction.')}||²</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Large bottleneck: near-perfect reconstruction — not much compression.</li>
      <li>Small bottleneck: blurry reconstruction — only the coarse structure survives.</li>
      <li>The latent code can be used for clustering, anomaly detection, or as features.</li>
      <li>Autoencoders learn a compressed basis tailored to the data distribution.</li>
    </ul>
  </details>`,
  'vae': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Variational Inference</h3>
    <p>The VAE encoder outputs a mean μ and log-variance σ² for each latent dimension. A sample z is drawn from N(μ, σ²). The decoder maps z back to data space.</p>
    <div class="exp-formula">${T('ELBO','Evidence Lower BOund — the VAE training objective, which is maximised.')} = 𝔼[log ${T('p(x|z)','Reconstruction term — how likely the input is given the sampled latent code.')}] − ${T('KL(q||p)','KL divergence — penalty for the posterior deviating from the standard Gaussian prior N(0,I).')}</div>
    <h3>What to Observe</h3>
    <ul>
      <li>The centre of the latent canvas decodes to an "average" shape — it's the most likely region.</li>
      <li>Nearby points decode to similar shapes — the space is smooth and continuous.</li>
      <li>A regular autoencoder would have gaps between clusters; the VAE's KL term fills them in.</li>
      <li>Increasing the temperature samples from a wider region — more diverse, less accurate outputs.</li>
    </ul>
  </details>`,
  'unet': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Skip Connections in Encoder–Decoder</h3>
    <p>The encoder progressively halves spatial resolution while doubling channel depth. The decoder reverses this. Skip connections concatenate matching encoder feature maps to each decoder layer.</p>
    <div class="exp-formula">${T('decoder_input[l]','Input to decoder level l.')} = upsample(${T('decoder_out[l+1]','Output from the deeper decoder level.')}) ⊕ ${T('encoder_feat[l]','Feature map from the matching encoder level — same spatial resolution, passed via skip connection.')}</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Without skip connections, the decoder only has abstract features — spatial precision is lost.</li>
      <li>Skip connections restore high-frequency spatial detail at every scale.</li>
      <li>The bottleneck is the only path without a shortcut — it forces global context compression.</li>
      <li>The U shape in the architecture diagram gives the model its name.</li>
    </ul>
  </details>`,
  'seq2seq': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Encoder–Decoder with Attention</h3>
    <p>The encoder reads the full input sequence, producing a hidden state at each position. Without attention, only the final state is passed to the decoder — a severe bottleneck for long inputs.</p>
    <div class="exp-formula">${T('e_ij','Alignment score — how relevant encoder position j is when generating decoder step i.')} = ${T('a(sᵢ₋₁, hⱼ)','Alignment model — a small network comparing the previous decoder state s and encoder hidden state h.')} &nbsp; ${T('αᵢⱼ','Attention weight — softmax(e_ij) — sums to 1 across all j for each decoder step i.')} = softmax(${T('eᵢⱼ','Raw alignment scores for decoder step i.')})</div>
    <h3>What to Observe</h3>
    <ul>
      <li>The bright diagonal in the attention matrix: each output token mostly attends to the aligned input token.</li>
      <li>Off-diagonal weights appear when output order differs from input order (e.g., translation reordering).</li>
      <li>Without attention, the context vector is the only bridge — performance degrades sharply on long sequences.</li>
      <li>Attention was the precursor to the full Transformer, which replaced recurrence entirely with attention.</li>
    </ul>
  </details>`,
  'gan': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Minimax Game</h3>
    <p>The GAN objective is a minimax game. The discriminator D maximises its ability to classify real vs. fake; the generator G minimises the discriminator's success at detecting its output.</p>
    <div class="exp-formula">min_${T('G','Generator — maps random noise z to a fake sample G(z) that should look real.')} max_${T('D','Discriminator — outputs the probability that a sample is real, not generated.')} 𝔼[log ${T('D(x)','Probability the discriminator assigns to a real sample x — should be close to 1.')}] + 𝔼[log(1 − ${T('D(G(z))','Probability the discriminator assigns to a fake sample G(z) — should be close to 0 from D\'s perspective.')})]</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Early training: generated distribution is flat, discriminator easily separates them.</li>
      <li>After many steps: generated distribution converges toward real; discriminator score approaches 0.5 everywhere.</li>
      <li>Mode collapse: the generator finds one spot that fools the discriminator and gets stuck there.</li>
      <li>GAN training is unstable — the two networks must improve at the same pace.</li>
    </ul>
  </details>`,
  'diffusion': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Forward and Reverse Processes</h3>
    <p>The forward process gradually adds Gaussian noise over T steps until the data is indistinguishable from pure noise. The reverse process learns to undo this, one step at a time.</p>
    <div class="exp-formula">${T('q(xₜ|xₜ₋₁)','Forward process — add a small amount of Gaussian noise at each step. Fixed, not learned.')} = 𝒩(xₜ; ${T('√(1−βₜ) xₜ₋₁','Scaled previous state — slightly shrinks signal.')} , ${T('βₜ I','Noise schedule — how much noise is added at step t. Small at first, larger later.')})</div>
    <h3>What to Observe</h3>
    <ul>
      <li>At t=0: original structure is fully intact.</li>
      <li>At t=T/2: signal is present but noisy — the model has most information to work with here.</li>
      <li>At t=T: pure Gaussian noise — no trace of the original remains.</li>
      <li>The noise schedule β controls how quickly structure is destroyed — linear, cosine, or learned schedules each have tradeoffs.</li>
    </ul>
  </details>`,
  'residual': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Skip Connections and Gradient Flow</h3>
    <p>A residual block computes F(x) + x instead of F(x). During backpropagation, the gradient flows through the addition gate unchanged — the skip connection is a gradient highway.</p>
    <div class="exp-formula">${T('∂L/∂x','Gradient of the loss with respect to the block input — this is what backprop needs to pass backward.')} = ${T('∂L/∂y','Gradient from the next layer.')} · (1 + ${T('∂F/∂x','Gradient through the residual branch — can be small, but the +1 from the skip ensures the total is never zero.') })</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Without skip connections: gradient magnitude halves at each layer — 20 layers = 2⁻²⁰ ≈ 0. Training stops.</li>
      <li>With skip connections: gradient flows directly to early layers unchanged — very deep networks train normally.</li>
      <li>The residual learns a correction, not a full transformation — small corrections are easier to learn.</li>
      <li>ResNets with 50, 101, or 152 layers are only practical because of this simple addition.</li>
    </ul>
  </details>`,
  'embeddings': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Dense Vector Representations</h3>
    <p>An embedding table maps each token to a learned vector of real numbers. Words used in similar contexts end up with similar vectors — measured by cosine similarity.</p>
    <div class="exp-formula">${T('similarity(a,b)','How similar two embedding vectors are — 1 = identical direction, 0 = orthogonal, −1 = opposite.')} = ${T('a·b','Dot product of the two embedding vectors.')} / (||${T('a','Magnitude of vector a.')}|| · ||${T('b','Magnitude of vector b.')}||) &nbsp; (cosine similarity)</div>
    <h3>What to Observe</h3>
    <ul>
      <li>Semantic clusters: animals, colours, and verbs group together even though they weren't explicitly labelled.</li>
      <li>Nearest neighbours reflect meaning: "dog" is close to "cat" and "puppy", far from "table".</li>
      <li>Vector arithmetic: King − Man + Woman ≈ Queen. Directions encode semantic relationships.</li>
      <li>This 2D view is a PCA projection — real embeddings have hundreds or thousands of dimensions.</li>
    </ul>
  </details>`,
  'kalman': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>Predict / Update Recursion</h3>
    <p>The Kalman filter alternates two phases. <strong>Predict</strong> rolls the state forward through the dynamics model and grows the uncertainty. <strong>Update</strong> corrects that prediction with the new measurement, weighted by the Kalman gain, and shrinks the uncertainty.</p>
    <div class="exp-formula">${T('K','Kalman gain — between 0 and 1 (or a matrix). It sets how far the estimate moves from the prediction toward the measurement.')} = ${T('P⁻','Predicted (a-priori) covariance — uncertainty after the predict step, before seeing the measurement.')} Hᵀ ( ${T('H P⁻ Hᵀ + R','Innovation covariance — predicted measurement uncertainty plus sensor noise R.')} )⁻¹</div>
    <div class="exp-formula">${T('x̂','Updated (a-posteriori) state estimate.')} = ${T('x̂⁻','Predicted state — the model\'s guess before the measurement.')} + K ( ${T('z − H x̂⁻','Innovation — the surprise: how far the measurement z fell from the prediction.')} )</div>
    <h3>What to Observe</h3>
    <ul>
      <li><strong>Theory:</strong> K = 0 ignores the sensor, K = 1 ignores the model, K = 0.5 splits the difference. The estimate always lands on the line between prediction and measurement.</li>
      <li><strong>Univariate:</strong> raise R to distrust the sensor — the estimate smooths out but lags; raise Q to expect drift — it tracks faster but gets noisier.</li>
      <li>K(t) and P(t) converge to steady values: a Kalman filter "learns" its trust level within a handful of steps.</li>
      <li><strong>Multivariate:</strong> the A matrix's off-diagonals are the thermal coupling between core and surface; the K matrix is the steady-state gain from iterating the Riccati recursion.</li>
    </ul>
  </details>`,
  'mlp-deep': `<details class="sandbox-explainer"><summary>How it Works</summary>
    <h3>What every neuron does</h3>
    <p>A neuron is a tiny machine: it takes each incoming signal, multiplies it by a learned <strong>weight</strong>, adds them all up with a <strong>bias</strong>, then passes the result through a non-linear <strong>activation function</strong>. That single output number is what it "emits" to the next layer.</p>
    <div class="exp-formula">${T('z','The pre-activation — the weighted sum of inputs plus the bias. A linear combination, before any non-linearity.')} = Σ ${T('wᵢ','A learned weight on one incoming connection. Its sign and size decide how much that input pushes the neuron up or down.')} · ${T('xᵢ','One input to the neuron — a raw feature for a hidden neuron, or a previous neuron\'s output for a deeper one.')} + ${T('b','The bias — shifts the activation threshold left or right, independent of the inputs.')}</div>
    <div class="exp-formula">${T('a','The activation — the value the neuron emits. The non-linearity is what lets stacked layers carve curved decision boundaries.')} = ${T('f(z)','The activation function: tanh, sigmoid, or ReLU here. Without it the whole network would collapse into a single linear map.')}</div>
    <h3>How it learns — backpropagation</h3>
    <p>The output is compared to the true label to get a <strong>loss</strong> (binary cross-entropy). The chain rule pushes that error backward, computing ∂Loss/∂w for every weight, and each weight steps a little against its gradient. Repeat thousands of times and the boundary forms.</p>
    <div class="exp-formula">${T('w ← w − η · ∂L/∂w','Gradient-descent update — nudge each weight downhill on the loss surface. η is the learning rate.')}</div>
    <h3>What to Observe</h3>
    <ul>
      <li><strong>Circle &amp; XOR are not linearly separable</strong> — one neuron (a straight line) can't solve them. Watch the hidden layer combine several lines into a curved boundary.</li>
      <li><strong>Click a neuron</strong> to open its emitter inspector: weights, weighted sum z, the activation curve, and the exact value it emits for the current probe input.</li>
      <li><strong>Move the probe</strong> (click the boundary panel) and watch one input propagate through every neuron.</li>
      <li><strong>Show gradients</strong> to see backprop: thick purple early, thinning to nothing as the loss flattens — that's convergence.</li>
      <li><strong>Learning rate</strong> too high → loss bounces or diverges; too low → painfully slow. Try ReLU vs tanh and watch the boundary's character change.</li>
    </ul>
  </details>`,
};

function buildContent() {
  const nav = document.getElementById('mainNav');
  const main = document.getElementById('mainContent');
  SECTIONS.forEach(sec => {
    const secDiv = document.createElement('div');
    secDiv.className = 'nav-section';
    secDiv.innerHTML = `<div class="ns-title" onclick="this.parentElement.classList.toggle('collapsed')">${sec.title} <span class="ns-arrow">▾</span></div>`;
    sec.topics.forEach((id, i) => {
      const ni = document.createElement('div');
      ni.className = 'ni'; ni.dataset.topic = id;
      ni.innerHTML = `<span class="ni-num">${String(i + 1).padStart(2, '0')}</span>${TOPIC_NAMES[id]}`;
      ni.onclick = () => show(id);
      secDiv.appendChild(ni);
    });
    nav.appendChild(secDiv);
  });
  TOPICS.forEach(id => {
    const div = document.createElement('div');
    div.className = 'topic'; div.id = id;
    const builders = { 'cnn-filter': buildCnnFilter, 'self-attention': buildSelfAttention,
      'autoencoder': buildAutoencoder, 'vae': buildVae, 'unet': buildUnet,
      'seq2seq': buildSeq2Seq, 'gan': buildGan, 'diffusion': buildDiffusion,
      'residual': buildResidual, 'embeddings': buildEmbeddings, 'kalman': buildKalman,
      'mlp-deep': buildMlpDeep };
    if (builders[id]) div.innerHTML = builders[id]();
    div.innerHTML += buildNarratorBar(id);
    div.innerHTML += EXPLAINERS[id] || '';
    main.appendChild(div);
  });
}

const DL_HEAD = (num, title, sub) => `
  <h2 style="font-family:var(--serif);font-size:clamp(22px,4vw,34px);font-weight:400;margin-bottom:8px;">${title}</h2>
  <p class="sub" style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:20px;line-height:1.6;">${sub}</p>`;

function buildCnnFilter() {
  return DL_HEAD('D1','CNN <em style="color:#4dd0e1">Filter</em> Explorer',
    `Paint on the input grid. Watch the ${T('filter','A small matrix of weights — the learnable pattern detector. It slides across the input computing a dot product at every position.')} slide across it and produce a ${T('feature map','The output of applying the filter to the entire input. Each value shows how strongly the filter pattern matched at that location.')}.`) + `
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:start;margin-bottom:16px;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">INPUT (paint here)</div>
      <canvas id="cnnInputCanvas" style="width:100%;cursor:crosshair;border-radius:4px;"></canvas>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:28px;">
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);">FILTER</div>
      <canvas id="cnnFilterCanvas" style="width:80px;height:80px;border-radius:4px;"></canvas>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);">→</div>
    </div>
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">FEATURE MAP</div>
      <canvas id="cnnOutputCanvas" style="width:100%;border-radius:4px;"></canvas>
    </div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Filter preset</label>
      <select id="cnnFilterSel" onchange="ENGINE.setCnnFilter(this.value)" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="edge-h">Edge (horizontal)</option>
        <option value="edge-v">Edge (vertical)</option>
        <option value="blur">Blur</option>
        <option value="sharpen">Sharpen</option>
        <option value="emboss">Emboss</option>
      </select>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn" onclick="ENGINE.cnnClear()">✕ Clear</button>
      <button class="sb-btn teach-btn" onclick="ENGINE.teachCnn()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildSelfAttention() {
  return DL_HEAD('D2','<em style="color:#4dd0e1">Self</em>-Attention',
    `Click any token to see its ${T('attention weights','How much this token "looks at" every other token. Computed from the dot product of its Query vector with all other tokens\' Key vectors, then softmaxed.')}.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="attnCanvas" height="360"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Example sentence</label>
      <select id="attnSentSel" onchange="ENGINE.setAttnSentence(this.value)" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="0">The cat sat on the mat</option>
        <option value="1">She sells sea shells</option>
        <option value="2">The bank by the river bank</option>
        <option value="3">Time flies like an arrow</option>
      </select>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Temperature','Controls how "peaked" the attention distribution is. Low temperature = one dominant token. High = spread evenly across all tokens.')}</label>
      <input type="range" id="attnTemp" min="1" max="20" step="1" value="5"
             oninput="document.getElementById('attnTempV').textContent=(this.value/10).toFixed(1);ENGINE.drawAttention()">
      <span class="ctrl-val" id="attnTempV">0.5</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachAttention()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildAutoencoder() {
  return DL_HEAD('D3','<em style="color:#4dd0e1">Auto</em>encoder',
    `Paint a shape. The ${T('encoder','Compresses the input into a small code — fewer neurons than the input, so it must discard details.')} squeezes it to a ${T('bottleneck','The narrowest point — a vector of n numbers that must summarise the entire input. Smaller = more compression = blurrier reconstruction.')}. The ${T('decoder','Expands the code back to full size. It sees only the bottleneck — everything else is discarded.')} reconstructs from that code alone.`) + `
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:start;margin-bottom:16px;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">INPUT (paint)</div>
      <canvas id="aeInputCanvas" style="width:100%;cursor:crosshair;border-radius:4px;"></canvas>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:24px;">
      <div style="font-family:var(--mono);font-size:9px;color:var(--muted);">ENCODE</div>
      <canvas id="aeCodeCanvas" style="width:24px;height:120px;border-radius:3px;"></canvas>
      <div style="font-family:var(--mono);font-size:9px;color:var(--muted);">DECODE</div>
    </div>
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">RECONSTRUCTION</div>
      <canvas id="aeOutputCanvas" style="width:100%;border-radius:4px;"></canvas>
    </div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Bottleneck size</label>
      <input type="range" id="aeBottleneck" min="1" max="32" step="1" value="8"
             oninput="document.getElementById('aeBottleneckV').textContent=this.value+' dims';ENGINE.runAutoencoder()">
      <span class="ctrl-val" id="aeBottleneckV">8 dims</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn" onclick="ENGINE.aeClear()">✕ Clear</button>
      <button class="sb-btn teach-btn" onclick="ENGINE.teachAutoencoder()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildVae() {
  return DL_HEAD('D4','Variational <em style="color:#4dd0e1">Autoencoder</em>',
    `Click anywhere in the ${T('latent space','A 2D coordinate system where each point represents a learned encoding. Nearby points decode to similar outputs — the VAE ensures this by training with a KL divergence penalty.')} to decode that point into a shape. The space is smooth and continuous.`) + `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">LATENT SPACE (click)</div>
      <canvas id="vaeLatentCanvas" style="width:100%;cursor:crosshair;border-radius:4px;"></canvas>
    </div>
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">DECODED OUTPUT</div>
      <canvas id="vaeOutputCanvas" style="width:100%;border-radius:4px;"></canvas>
    </div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Sampling σ','Standard deviation of the sampling noise. High σ = wider samples from around the clicked point — more diversity, less accuracy.')}</label>
      <input type="range" id="vaeSigma" min="1" max="30" step="1" value="5"
             oninput="document.getElementById('vaeSigmaV').textContent=(this.value/10).toFixed(1);ENGINE.drawVaeLatent()">
      <span class="ctrl-val" id="vaeSigmaV">0.5</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachVae()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildUnet() {
  return DL_HEAD('D5','<em style="color:#4dd0e1">U-Net</em>',
    `Watch data flow through the encoder (down), cross the ${T('bottleneck','The deepest, smallest feature map — maximum compression, maximum context.')}, and back up through the decoder. The ${T('skip connections','Direct connections from each encoder level to the matching decoder level. They pass high-resolution spatial detail that the encoder would otherwise lose.')} paste spatial detail at every scale.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="unetCanvas" height="380"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Animation</label>
      <button class="sb-btn" id="unetPlayBtn" onclick="ENGINE.toggleUnet()">▶ Play</button>
      <button class="sb-btn" onclick="ENGINE.restartUnet()">↺ Restart</button>
    </div>
    <div class="ctrl-row">
      <label style="font-family:var(--mono);font-size:12px;color:var(--muted);">
        <input type="checkbox" id="unetSkipToggle" checked onchange="ENGINE.drawUnetFrame()"> Show skip connections
      </label>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachUnet()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildSeq2Seq() {
  return DL_HEAD('D6','<em style="color:#4dd0e1">Seq2Seq</em> + Attention',
    `The ${T('encoder','Reads the input sequence left to right, building a hidden state at each step. With attention, all hidden states are kept and made available to the decoder.')} reads the input. The ${T('decoder','Generates one output token at a time, attending to the encoder hidden states to decide which input positions to focus on at each step.')} generates the output. The ${T('alignment matrix','Shows which input position (column) the decoder is attending to when generating each output token (row). Bright = strong attention.')}.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="s2sCanvas" height="380"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Example</label>
      <select id="s2sExSel" onchange="ENGINE.setS2SExample(parseInt(this.value))" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="0">1 2 3 4 5 → sum sequence</option>
        <option value="1">English → French (simple)</option>
        <option value="2">Reverse a sequence</option>
        <option value="3">Sort ascending</option>
      </select>
    </div>
    <div class="ctrl-row">
      <label style="font-family:var(--mono);font-size:12px;color:var(--muted);">
        <input type="checkbox" id="s2sAttnToggle" checked onchange="ENGINE.drawS2S()"> Show attention
      </label>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachSeq2Seq()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildGan() {
  return DL_HEAD('D7','<em style="color:#4dd0e1">GAN</em> Training',
    `The ${T('generator','Maps random noise z to a fake sample. Trained to fool the discriminator — it wants D(G(z)) to be close to 1.')} tries to match the real ${T('distribution','The statistical pattern of the real data — in this 1D demo, a Gaussian. The generator starts with a flat uniform distribution and must learn to mimic the bell shape.')}. The ${T('discriminator','Classifies samples as real or fake. Trained to output 1 for real samples and 0 for fakes.')} tries to tell them apart.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="ganCanvas" height="300"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Real distribution</label>
      <select id="ganDistSel" onchange="ENGINE.resetGan()" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="gaussian">Gaussian (μ=0.6)</option>
        <option value="bimodal">Bimodal</option>
        <option value="uniform">Uniform</option>
      </select>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn" onclick="ENGINE.ganStep(10)">+10 steps</button>
      <button class="sb-btn" onclick="ENGINE.ganStep(100)">+100 steps</button>
      <button class="sb-btn" onclick="ENGINE.resetGan()">↺ Reset</button>
      <button class="sb-btn teach-btn" onclick="ENGINE.teachGan()">🎓 Teach Me</button>
    </div>
    <div class="ctrl-row" style="font-family:var(--mono);font-size:11px;color:var(--muted);">
      Steps: <strong id="ganSteps">0</strong> &nbsp;·&nbsp; D accuracy: <strong id="ganAcc">—</strong>
    </div>
  </div>`;
}

function buildDiffusion() {
  return DL_HEAD('D8','<em style="color:#4dd0e1">Diffusion</em> Process',
    `Drag the timestep slider to add ${T('noise','Gaussian random values added to the data. At each forward step: xₜ = √(1−β)·xₜ₋₁ + √β·ε, where ε ~ N(0,I) and β is the noise schedule.')} forward (→ pure noise) or reverse it backward (→ original structure).`) + `
  <div class="sandbox-canvas-wrap"><canvas id="diffCanvas" height="300"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Timestep t','0 = original data, T = pure noise. The forward process adds noise; the reverse process (learned by the model) denoises step by step.')}</label>
      <input type="range" id="diffT" min="0" max="60" step="1" value="0"
             oninput="document.getElementById('diffTV').textContent=this.value;ENGINE.drawDiffusion()">
      <span class="ctrl-val" id="diffTV">0</span>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">Pattern</label>
      <select id="diffPatSel" onchange="ENGINE.resetDiffusion()" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="two-moons">Two moons</option>
        <option value="spiral">Spiral</option>
        <option value="grid">Grid</option>
        <option value="ring">Ring</option>
      </select>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachDiffusion()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildResidual() {
  return DL_HEAD('D9','<em style="color:#4dd0e1">Residual</em> Networks',
    `Toggle ${T('skip connections','A direct addition from the block input to its output: y = F(x) + x. The +x ensures the gradient always has a path back, no matter how many layers deep.')} to see how the ${T('gradient','The signal backpropagated through the network to update weights. Without skip connections, repeated multiplication by small numbers causes it to vanish — early layers receive no update.')} survives or vanishes through a deep network.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="resCanvas" height="380"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label style="font-family:var(--mono);font-size:12px;color:var(--muted);">
        <input type="checkbox" id="resSkipToggle" onchange="ENGINE.drawResidual()"> Enable skip connections
      </label>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">Network depth</label>
      <input type="range" id="resDepth" min="4" max="20" step="1" value="10"
             oninput="document.getElementById('resDepthV').textContent=this.value+' layers';ENGINE.drawResidual()">
      <span class="ctrl-val" id="resDepthV">10 layers</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachResidual()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildEmbeddings() {
  return DL_HEAD('D10','<em style="color:#4dd0e1">Embedding</em> Space',
    `A 2D projection of a semantic space. Hover for labels. Click any point to see its ${T('nearest neighbours','The k most similar tokens by cosine similarity in the embedding space. Similar meaning = nearby vector = connected by a line.')}. The clusters that form are not programmed — they emerge from training.`) + `
  <div class="sandbox-canvas-wrap"><canvas id="embCanvas" height="380" style="cursor:pointer;"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Neighbours k</label>
      <input type="range" id="embK" min="1" max="6" step="1" value="3"
             oninput="document.getElementById('embKV').textContent=this.value;ENGINE.drawEmbeddings()">
      <span class="ctrl-val" id="embKV">3</span>
    </div>
    <div class="ctrl-row">
      <label style="font-family:var(--mono);font-size:12px;color:var(--muted);">
        <input type="checkbox" id="embClusters" checked onchange="ENGINE.drawEmbeddings()"> Show clusters
      </label>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachEmbeddings()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildKalman() {
  const partHead = (n, title, sub) => `
    <div style="margin:34px 0 14px;padding-top:18px;border-top:1px solid var(--border);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#4dd0e1;margin-bottom:4px;">Part ${n}</div>
      <h3 style="font-family:var(--serif);font-size:clamp(18px,3vw,24px);font-weight:400;margin:0 0 6px;">${title}</h3>
      <p style="font-family:var(--mono);font-size:12px;color:var(--muted);line-height:1.65;margin:0;">${sub}</p>
    </div>`;

  return DL_HEAD('D11','Discrete <em style="color:#4dd0e1">Kalman</em> Filter',
    `Track a hidden state from noisy measurements. The filter runs a ${T('predict','Roll the state forward through the dynamics model and grow the uncertainty: x̂⁻ = A x̂, P⁻ = A P Aᵀ + Q.')} → ${T('update','Correct the prediction with the new measurement, weighted by the Kalman gain, and shrink the uncertainty.')} loop forever.`)

  /* ── PART 1 — THEORY ── */
  + partHead('1', 'Theory — the predict/update cycle',
      'The two phases below run every step. The Kalman gain K (orange line) decides how much the measurement corrects the prediction.')
  + `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0;">
    <div style="border:1.5px solid ${'rgba(150,130,255,0.5)'};border-radius:10px;padding:14px 16px;background:rgba(150,130,255,0.05);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9c82ff;margin-bottom:10px;">▸ Predict</div>
      <div class="exp-formula" style="border-left:3px solid #9c82ff;">${T('x̂⁻','A-priori state — the model\'s guess before the measurement.')} = ${T('A','State-transition matrix — how the state evolves one step.')} x̂</div>
      <div class="exp-formula" style="border-left:3px solid #9c82ff;">${T('P⁻','A-priori covariance — uncertainty grown by the process noise.')} = A P Aᵀ + ${T('Q','Process noise — how much the true state is expected to drift each step.')}</div>
    </div>
    <div style="border:1.5px solid rgba(255,150,80,0.5);border-radius:10px;padding:14px 16px;background:rgba(255,150,80,0.05);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#ff9650;margin-bottom:10px;">▸ Update</div>
      <div class="exp-formula" style="border-left:3px solid #ff9650;">${T('K','Kalman gain — how far to move from prediction toward measurement.')} = P⁻ Hᵀ (H P⁻ Hᵀ + ${T('R','Measurement noise — how noisy the sensor is assumed to be.')})⁻¹</div>
      <div class="exp-formula" style="border-left:3px solid #ff9650;">x̂ = x̂⁻ + K (${T('z','The incoming measurement.')} − H x̂⁻)</div>
      <div class="exp-formula" style="border-left:3px solid #ff9650;">P = (I − K H) P⁻</div>
    </div>
  </div>
  <div class="sandbox-canvas-wrap"><canvas id="kalGainCanvas" height="200"></canvas></div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Drag the line, or:</label>
      <button class="sb-btn" onclick="ENGINE.setKalGain(0)">K = 0 (model)</button>
      <button class="sb-btn" onclick="ENGINE.setKalGain(0.5)">K = 0.5 (blend)</button>
      <button class="sb-btn" onclick="ENGINE.setKalGain(1)">K = 1 (sensor)</button>
    </div>
  </div>`

  /* ── PART 2 — UNIVARIATE SANDBOX ── */
  + partHead('2', 'Univariate sandbox — tune the noise',
      'A 1-D filter (A = 1, H = 1) tracks a drifting signal. Raise R to distrust the sensor, raise Q to expect faster drift. Watch the gain and covariance settle in the sub-graphs.')
  + `
  <div class="sandbox-canvas-wrap"><canvas id="kalUniCanvas" height="260"></canvas></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;">
    <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="kalKCanvas" height="150"></canvas></div>
    <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="kalPCanvas" height="150"></canvas></div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Q — process noise','How much the true state is expected to change each step. Higher Q → higher gain → more responsive, noisier estimate.')}</label>
      <input type="range" id="kalUniQ" min="1" max="400" step="1" value="50"
             oninput="document.getElementById('kalUniQV').textContent=(this.value/100).toFixed(2);ENGINE.runKalUni()">
      <span class="ctrl-val" id="kalUniQV">0.50</span>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">${T('R — measurement noise','How noisy the sensor is assumed to be. Higher R → lower gain → smoother but laggier estimate.')}</label>
      <input type="range" id="kalUniR" min="10" max="1200" step="10" value="200"
             oninput="document.getElementById('kalUniRV').textContent=(this.value/100).toFixed(2);ENGINE.runKalUni()">
      <span class="ctrl-val" id="kalUniRV">2.00</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn" onclick="ENGINE.genKalUni();ENGINE.runKalUni()">↻ New data</button>
      <button class="sb-btn teach-btn" onclick="ENGINE.teachKalman()">🎓 Teach Me</button>
    </div>
  </div>`

  /* ── PART 3 — MULTIVARIATE SANDBOX ── */
  + partHead('3', 'Multivariate sandbox — two coupled temperatures',
      'A 2-state thermal model (core + surface). Thermal coupling fills the off-diagonals of the transition matrix A. The Kalman gain K is the steady-state solution of the Riccati recursion — both heatmaps update live.')
  + `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0 18px;">
    <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="kalAHeat" height="190"></canvas></div>
    <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="kalKHeat" height="190"></canvas></div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Q — process noise','Process-noise level on the diagonal of Q. More process noise pushes the steady-state gain up.')}</label>
      <input type="range" id="kalMultiQ" min="1" max="200" step="1" value="20"
             oninput="document.getElementById('kalMultiQV').textContent=(this.value/1000).toFixed(3);ENGINE.runKalMulti()">
      <span class="ctrl-val" id="kalMultiQV">0.020</span>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">${T('R — measurement noise','Sensor-noise level on the diagonal of R. More sensor noise pulls the steady-state gain down.')}</label>
      <input type="range" id="kalMultiR" min="10" max="1000" step="10" value="200"
             oninput="document.getElementById('kalMultiRV').textContent=(this.value/1000).toFixed(3);ENGINE.runKalMulti()">
      <span class="ctrl-val" id="kalMultiRV">0.200</span>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Thermal coupling','How fast heat flows between core and surface each step. It fills the off-diagonal terms of the A matrix.')}</label>
      <input type="range" id="kalMultiC" min="0" max="50" step="1" value="15"
             oninput="document.getElementById('kalMultiCV').textContent=(this.value/100).toFixed(2);ENGINE.runKalMulti()">
      <span class="ctrl-val" id="kalMultiCV">0.15</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn teach-btn" onclick="ENGINE.teachKalman()">🎓 Teach Me</button>
    </div>
  </div>`;
}

function buildMlpDeep() {
  const partHead = (n, title, sub) => `
    <div style="margin:34px 0 14px;padding-top:18px;border-top:1px solid var(--border);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#4dd0e1;margin-bottom:4px;">Part ${n}</div>
      <h3 style="font-family:var(--serif);font-size:clamp(18px,3vw,24px);font-weight:400;margin:0 0 6px;">${title}</h3>
      <p style="font-family:var(--mono);font-size:12px;color:var(--muted);line-height:1.65;margin:0;">${sub}</p>
    </div>`;

  return DL_HEAD('D12','Neural Network — <em style="color:#4dd0e1">Deep Dive</em>',
    `A real, trainable ${T('MLP','Multilayer perceptron — the original deep network. Stacked layers of neurons, each a weighted sum followed by a non-linearity, trained by backpropagation.')}: two inputs → a hidden layer → one output. It runs genuine ${T('forward pass','Feed the input through every layer to produce a prediction — each neuron computes its weighted sum and activation in turn.')} and ${T('backpropagation','The chain rule applied backward through the network to get ∂Loss/∂weight for every weight, so gradient descent can update them.')} in your browser. Train it, then drill down to the emitter level.`)

  /* ── PART 1 — THE LIVING NETWORK ── */
  + partHead('1', 'The living network — train it',
      'Hit Train and watch the weights move and the decision boundary bend. The teal/orange lines are positive/negative weights; thickness is magnitude. Tick "show gradients" to overlay the backprop signal.')
  + `
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;align-items:start;margin:14px 0 4px;">
    <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="nnNetCanvas" height="360"></canvas></div>
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:6px;text-align:center;">DECISION BOUNDARY · click to move the probe ◉</div>
      <div class="sandbox-canvas-wrap" style="margin:0;"><canvas id="nnBoundaryCanvas" height="300" style="cursor:crosshair;"></canvas></div>
    </div>
  </div>
  <div class="sandbox-controls">
    <div class="ctrl-row">
      <label class="ctrl-label">Dataset</label>
      <select id="nnData" onchange="ENGINE.initNn()" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="circle">Circle (concentric)</option>
        <option value="xor">XOR</option>
        <option value="spiral">Spiral</option>
        <option value="linear">Linear</option>
      </select>
      <label class="ctrl-label" style="margin-left:8px;">${T('Activation','The non-linearity each hidden neuron applies. tanh and sigmoid squash into a fixed range; ReLU passes positives straight through and zeros negatives.')}</label>
      <select id="nnAct" onchange="ENGINE.initNn()" style="font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;">
        <option value="tanh">tanh</option>
        <option value="sigmoid">sigmoid</option>
        <option value="relu">ReLU</option>
      </select>
    </div>
    <div class="ctrl-row">
      <label class="ctrl-label">${T('Hidden neurons','How many neurons in the hidden layer. More neurons = more lines to combine = a more flexible boundary (and more to overfit with).')}</label>
      <input type="range" id="nnHidden" min="2" max="6" step="1" value="4"
             oninput="document.getElementById('nnHiddenV').textContent=this.value;ENGINE.initNn()">
      <span class="ctrl-val" id="nnHiddenV">4</span>
      <label class="ctrl-label" style="margin-left:8px;">${T('Learning rate η','How big a step each weight takes against its gradient. Too high → the loss bounces or blows up; too low → it crawls.')}</label>
      <input type="range" id="nnLR" min="1" max="100" step="1" value="10"
             oninput="document.getElementById('nnLRV').textContent=(this.value/20).toFixed(2)">
      <span class="ctrl-val" id="nnLRV">0.50</span>
    </div>
    <div class="ctrl-row">
      <button class="sb-btn" id="nnTrainBtn" onclick="ENGINE.toggleNnTrain()">▶ Train</button>
      <button class="sb-btn" onclick="ENGINE.stepNn(20)">+20 epochs</button>
      <button class="sb-btn" onclick="ENGINE.resetNn()">↺ Reset weights</button>
      <label style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-left:8px;">
        <input type="checkbox" id="nnGradToggle" onchange="ENGINE.toggleNnGrad()"> show gradients
      </label>
      <button class="sb-btn teach-btn" onclick="ENGINE.teachNn()">🎓 Teach Me</button>
    </div>
    <div class="ctrl-row" style="font-family:var(--mono);font-size:11px;color:var(--muted);">
      Epoch: <strong id="nnEpoch">0</strong> &nbsp;·&nbsp; Loss: <strong id="nnLossV">—</strong> &nbsp;·&nbsp; Accuracy: <strong id="nnAcc">—</strong>
    </div>
  </div>`

  /* ── PART 2 — EMITTER-LEVEL INSPECTION ── */
  + partHead('2', 'Emitter level — what one neuron emits',
      'Click any neuron in the diagram above. This is the full story of that single unit for the current probe input: every weighted input, the summed pre-activation z, the activation curve, and the value a it emits downstream.')
  + `
  <div id="nnInspector" class="nn-inspector"></div>
  <style>
    .nn-inspector { border:1px solid var(--border); border-radius:10px; padding:16px 18px; margin:6px 0 4px; background:var(--surface); }
    .nn-insp-title { font-family:var(--serif); font-size:18px; margin-bottom:10px; }
    .nn-insp-title em { color:#4dd0e1; font-style:italic; }
    .nn-insp-tbl { width:100%; border-collapse:collapse; font-family:var(--mono); font-size:11px; margin-bottom:8px; }
    .nn-insp-tbl th { text-align:left; color:var(--muted); font-weight:400; padding:3px 8px 3px 0; border-bottom:1px solid var(--border); }
    .nn-insp-tbl td { padding:3px 8px 3px 0; color:var(--text); border-bottom:1px solid var(--border); }
    .nn-emit { font-family:var(--mono); font-size:12px; color:#4dd0e1; margin-top:8px; }
    .nn-emit strong { color:#4dd0e1; }
  </style>`;
}
