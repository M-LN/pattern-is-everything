/* ═══════════════════════════════════════════════════════════════
   LLM Engineering — Topics Data & Content Builder
   30 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-foundations', title:'Foundations', topics:['home','tokenization','embeddings','positional-encoding','self-attention','multi-head-attention','feed-forward'] },
  { id:'sec-architecture', title:'Architecture', topics:['transformer-block','decoder-only','kv-cache','context-windows','mixture-of-experts','scaling-laws'] },
  { id:'sec-training', title:'Training', topics:['pre-training','fine-tuning','lora-qlora','rlhf','dpo','data-curation'] },
  { id:'sec-inference', title:'Inference', topics:['decoding-strategies','sampling','speculative-decoding','quantization','kv-cache-opt','batching'] },
  { id:'sec-applications', title:'Applications', topics:['prompt-engineering','rag','embedding-search','function-calling','agents','evaluation'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  tokenization:'Tokenization',
  embeddings:'Token Embeddings',
  'positional-encoding':'Positional Encoding',
  'self-attention':'Self-Attention',
  'multi-head-attention':'Multi-Head Attention',
  'feed-forward':'Feed-Forward Networks',
  'transformer-block':'Transformer Block',
  'decoder-only':'Decoder-Only Models',
  'kv-cache':'KV-Cache',
  'context-windows':'Context Windows',
  'mixture-of-experts':'Mixture of Experts',
  'scaling-laws':'Scaling Laws',
  'pre-training':'Pre-Training',
  'fine-tuning':'Fine-Tuning',
  'lora-qlora':'LoRA & QLoRA',
  rlhf:'RLHF',
  dpo:'DPO',
  'data-curation':'Data Curation',
  'decoding-strategies':'Decoding Strategies',
  sampling:'Sampling',
  'speculative-decoding':'Speculative Decoding',
  quantization:'Quantization',
  'kv-cache-opt':'KV-Cache Optimization',
  batching:'Batching & Throughput',
  'prompt-engineering':'Prompt Engineering',
  rag:'RAG',
  'embedding-search':'Embedding Search',
  'function-calling':'Function Calling',
  agents:'Agents & Planning',
  evaluation:'Evaluation & Benchmarks',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'tokenization', num:'01', title:'Tokenization', category:'Foundations', keywords:['bpe','wordpiece','sentencepiece','byte pair encoding','subword','vocabulary','token','merge','unigram'], content:'Breaking text into subword tokens — BPE, WordPiece, and how vocabulary size impacts model performance.' },
  { id:'embeddings', num:'02', title:'Token Embeddings', category:'Foundations', keywords:['embedding table','lookup','vector','dimension','learned','representation','dense','word2vec'], content:'Mapping discrete tokens to dense vectors — the first layer in every language model.' },
  { id:'positional-encoding', num:'03', title:'Positional Encoding', category:'Foundations', keywords:['sinusoidal','rope','alibi','rotary','position','relative','absolute','frequency'], content:'Giving transformers a sense of order — sinusoidal, RoPE, and ALiBi positional encodings.' },
  { id:'self-attention', num:'04', title:'Self-Attention', category:'Foundations', keywords:['query','key','value','qkv','scaled dot product','softmax','attention weights','context'], content:'The core mechanism — how each token attends to every other token via Q, K, V projections.' },
  { id:'multi-head-attention', num:'05', title:'Multi-Head Attention', category:'Foundations', keywords:['heads','parallel','concat','projection','multi-query','grouped-query','gqa','mqa'], content:'Running multiple attention heads in parallel — each one learning different relationship patterns.' },
  { id:'feed-forward', num:'06', title:'Feed-Forward Networks', category:'Foundations', keywords:['ffn','swiglu','gelu','relu','expansion','hidden dimension','mlp','activation'], content:'The point-wise FFN after attention — SwiGLU activations and the 2/3 expansion trick.' },
  { id:'transformer-block', num:'07', title:'Transformer Block', category:'Architecture', keywords:['residual','layernorm','prenorm','postnorm','block','layer','skip connection'], content:'The fundamental building block — residual connections, layer normalization, and data flow.' },
  { id:'decoder-only', num:'08', title:'Decoder-Only Models', category:'Architecture', keywords:['gpt','causal','autoregressive','mask','llama','next token','unidirectional','language model'], content:'The dominant LLM architecture — causal masking and autoregressive next-token prediction.' },
  { id:'kv-cache', num:'09', title:'KV-Cache', category:'Architecture', keywords:['key value cache','incremental','memory','generation','recompute','prefix','cached'], content:'Caching key-value states to avoid recomputation during autoregressive generation.' },
  { id:'context-windows', num:'10', title:'Context Windows', category:'Architecture', keywords:['context length','sliding window','sparse attention','rope scaling','ntk','yarn','long context','128k'], content:'How much text a model can process — window sizes, sparse attention, and RoPE scaling tricks.' },
  { id:'mixture-of-experts', num:'11', title:'Mixture of Experts', category:'Architecture', keywords:['moe','router','expert','sparse','top-k','gating','switch','mixtral','load balancing'], content:'Sparse activation via expert routing — more parameters, same compute, better scaling.' },
  { id:'scaling-laws', num:'12', title:'Scaling Laws', category:'Architecture', keywords:['chinchilla','compute optimal','flops','tokens','parameters','power law','kaplan','loss prediction'], content:'How model performance scales with data, parameters, and compute — the Chinchilla recipe.' },
  { id:'pre-training', num:'13', title:'Pre-Training', category:'Training', keywords:['next token prediction','causal lm','masked lm','autoregressive','loss','cross entropy','corpus','crawl'], content:'Training from scratch on massive text corpora — next-token prediction at scale.' },
  { id:'fine-tuning', num:'14', title:'Fine-Tuning', category:'Training', keywords:['supervised fine-tuning','sft','instruction tuning','chat','catastrophic forgetting','full fine-tune','downstream'], content:'Adapting a pre-trained model to specific tasks — instruction tuning and alignment.' },
  { id:'lora-qlora', num:'15', title:'LoRA & QLoRA', category:'Training', keywords:['low rank','adapter','rank','alpha','quantized','4-bit','peft','parameter efficient','merge'], content:'Parameter-efficient fine-tuning — low-rank adapters that train <1% of weights.' },
  { id:'rlhf', num:'16', title:'RLHF', category:'Training', keywords:['reinforcement learning','human feedback','reward model','ppo','preference','ranking','helpful','harmless'], content:'Learning from human preferences — reward modeling and PPO optimization.' },
  { id:'dpo', num:'17', title:'DPO', category:'Training', keywords:['direct preference optimization','implicit reward','chosen','rejected','bradley terry','no reward model','simpler'], content:'Skip the reward model — directly optimizing the policy from preference pairs.' },
  { id:'data-curation', num:'18', title:'Data Curation', category:'Training', keywords:['deduplication','quality filtering','data mixing','ratio','synthetic data','contamination','benchmark leakage'], content:'The most underrated part of LLM training — data quality, dedup, and mixing ratios.' },
  { id:'decoding-strategies', num:'19', title:'Decoding Strategies', category:'Inference', keywords:['greedy','beam search','beam width','best first','argmax','sequence score','length penalty'], content:'From greedy argmax to beam search — deterministic approaches to text generation.' },
  { id:'sampling', num:'20', title:'Sampling', category:'Inference', keywords:['temperature','top-k','top-p','nucleus','softmax','logits','diversity','creativity','repetition penalty'], content:'Controlling generation randomness — temperature scaling, top-k, and nucleus sampling.' },
  { id:'speculative-decoding', num:'21', title:'Speculative Decoding', category:'Inference', keywords:['draft model','verification','speedup','acceptance rate','lookahead','medusa','parallel generation'], content:'Using a small draft model to generate candidates that a large model verifies in parallel.' },
  { id:'quantization', num:'22', title:'Quantization', category:'Inference', keywords:['int8','int4','fp16','bf16','gptq','awq','gguf','precision','weight only','activation','calibration'], content:'Reducing precision to shrink memory and boost speed — INT8, INT4, GPTQ, AWQ.' },
  { id:'kv-cache-opt', num:'23', title:'KV-Cache Optimization', category:'Inference', keywords:['paged attention','vllm','block allocation','memory fragmentation','prefix caching','radix tree'], content:'Managing GPU memory for cached KV states — PagedAttention and prefix sharing.' },
  { id:'batching', num:'24', title:'Batching & Throughput', category:'Inference', keywords:['continuous batching','dynamic','prefill','decode','TTFT','TPS','throughput','latency','scheduling'], content:'Serving many requests efficiently — continuous batching and prefill/decode separation.' },
  { id:'prompt-engineering', num:'25', title:'Prompt Engineering', category:'Applications', keywords:['system prompt','few-shot','chain of thought','cot','zero-shot','template','instruction','role'], content:'Crafting effective prompts — system messages, few-shot examples, and chain-of-thought.' },
  { id:'rag', num:'26', title:'RAG', category:'Applications', keywords:['retrieval augmented generation','chunking','reranking','context window','grounding','hallucination','vector store'], content:'Grounding LLM responses in retrieved documents — the RAG pipeline end-to-end.' },
  { id:'embedding-search', num:'27', title:'Embedding Search', category:'Applications', keywords:['vector similarity','cosine','ann','hnsw','faiss','semantic search','nearest neighbor','index'], content:'Finding similar content via embeddings — vector databases, ANN search, and HNSW.' },
  { id:'function-calling', num:'28', title:'Function Calling', category:'Applications', keywords:['tool use','structured output','json mode','schema','api','parallel calls','tool choice'], content:'Extending LLMs with tools — structured output, JSON schemas, and parallel tool calls.' },
  { id:'agents', num:'29', title:'Agents & Planning', category:'Applications', keywords:['react','tool chain','memory','planning','reflection','loop','autonomous','multi-step','orchestration'], content:'Autonomous multi-step reasoning — ReAct loops, tool chains, memory, and orchestration.' },
  { id:'evaluation', num:'30', title:'Evaluation & Benchmarks', category:'Applications', keywords:['perplexity','mmlu','humaneval','gsm8k','arena','elo','benchmark','leaderboard','contamination'], content:'Measuring LLM quality — perplexity, benchmarks, ELO ratings, and evaluation pitfalls.' },
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
  main.innerHTML = buildHome()
    + buildTokenization() + buildEmbeddings() + buildPositionalEncoding()
    + buildSelfAttention() + buildMultiHeadAttention() + buildFeedForward()
    + buildTransformerBlock() + buildDecoderOnly() + buildKVCache()
    + buildContextWindows() + buildMixtureOfExperts() + buildScalingLaws()
    + buildPreTraining() + buildFineTuning() + buildLoRA()
    + buildRLHF() + buildDPO() + buildDataCuration()
    + buildDecodingStrategies() + buildSampling() + buildSpeculativeDecoding()
    + buildQuantization() + buildKVCacheOpt() + buildBatching()
    + buildPromptEngineering() + buildRAG() + buildEmbeddingSearch()
    + buildFunctionCalling() + buildAgents() + buildEvaluation();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>LLM <em>Engineering</em></h2>
    <p style="margin-top:14px">An interactive reference covering 30 topics — from tokenization to agents.
    Every topic has the core concepts, visual intuition, and Python code.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> arrow keys to navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-foundations','tokenization')">
      <div class="cat-card-icon">🔤</div>
      <div class="cat-card-name">Foundations</div>
      <div class="cat-card-count">6 topics · Tokenization, attention, embeddings</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-architecture','transformer-block')">
      <div class="cat-card-icon">🏗️</div>
      <div class="cat-card-name">Architecture</div>
      <div class="cat-card-count">6 topics · Transformer, MoE, scaling laws</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-training','pre-training')">
      <div class="cat-card-icon">⚡</div>
      <div class="cat-card-name">Training</div>
      <div class="cat-card-count">6 topics · Pre-training, LoRA, RLHF, DPO</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-inference','decoding-strategies')">
      <div class="cat-card-icon">🚀</div>
      <div class="cat-card-name">Inference</div>
      <div class="cat-card-count">6 topics · Sampling, quantization, batching</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-applications','prompt-engineering')">
      <div class="cat-card-icon">🛠️</div>
      <div class="cat-card-name">Applications</div>
      <div class="cat-card-count">6 topics · RAG, agents, function calling</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Tokenization */
function buildTokenization() {
  return `<div class="topic" id="tokenization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Foundations</div><h2>Token<em>ization</em></h2></div>
    <span class="topic-badge">BPE · WordPiece · Unigram</span>
  </div>
  <p class="sub">// Breaking text into the atomic units a model can process</p>
  <p class="prose">LLMs don't see characters or words — they see <strong>tokens</strong>. A tokenizer maps raw text to integer IDs from a fixed vocabulary. The dominant algorithm is <strong>Byte Pair Encoding (BPE)</strong>: start with individual bytes, iteratively merge the most frequent adjacent pair until the vocabulary reaches the target size (typically 32k–128k).</p>
  <div class="fb"><div class="fm">BPE: Repeat → find most frequent pair (a, b) → merge into ab → until |V| = target</div><div class="fd">Each merge creates a new subword token. Rare words get split into multiple tokens.</div></div>
  <div class="fb"><div class="fm">Compression ratio = bytes / tokens ≈ 3–4× for English</div><div class="fd">A good tokenizer compresses text efficiently — fewer tokens per sentence means more context fits in the window.</div></div>
  <p class="prose"><strong>WordPiece</strong> (BERT) maximizes likelihood instead of frequency. <strong>Unigram</strong> (SentencePiece) starts with a large vocabulary and prunes. <strong>Byte-level BPE</strong> (GPT-2+) operates on UTF-8 bytes, needing no pre-tokenization — handles any language/script.</p>
  <div class="callout">Vocab size is a key tradeoff: larger vocab → fewer tokens per text but bigger embedding table. GPT-4 uses ~100k tokens; LLaMA 2 uses ~32k.</div>
  <div class="va"><div class="vl">Interactive — type text to see BPE tokenization</div><canvas id="tokenCanvas" width="700" height="220"></canvas>
  <div class="ctrl"><label>Input: <input type="text" id="tokenInput" value="Hello, tokenization is fascinating!" style="width:260px;font-family:var(--mono);font-size:12px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;background:var(--surface);color:var(--text)"></label></div></div>
  <h3>Python — BPE from scratch</h3>
  <div class="code-block"><pre><code>def train_bpe(text, vocab_size):
    tokens = list(text.encode('utf-8'))
    merges = {}
    while len(set(tokens)) < vocab_size:
        pairs = {}
        for i in range(len(tokens) - 1):
            p = (tokens[i], tokens[i+1])
            pairs[p] = pairs.get(p, 0) + 1
        if not pairs: break
        best = max(pairs, key=pairs.get)
        new_id = max(set(tokens)) + 1
        merges[best] = new_id
        # Apply merge
        new_tokens, i = [], 0
        while i < len(tokens):
            if i < len(tokens)-1 and (tokens[i], tokens[i+1]) == best:
                new_tokens.append(new_id)
                i += 2
            else:
                new_tokens.append(tokens[i])
                i += 1
        tokens = new_tokens
    return merges</code></pre></div>
  <div class="topic-nav" id="nav-tokenization"></div>
</div>`;
}

/* 02 — Token Embeddings */
function buildEmbeddings() {
  return `<div class="topic" id="embeddings">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Foundations</div><h2>Token <em>Embeddings</em></h2></div>
    <span class="topic-badge">Learned Representations</span>
  </div>
  <p class="sub">// Mapping discrete token IDs to continuous vector space</p>
  <p class="prose">Each token ID indexes into a <strong>learned embedding table</strong> of shape <code>(vocab_size, d_model)</code>. The result is a dense vector that captures semantic meaning. Similar tokens end up near each other in this space — "king" and "queen" are close, "cat" and "automobile" are far.</p>
  <div class="fb"><div class="fm">E = Embedding(token_id) ∈ ℝ^d_model</div><div class="fd">Simple lookup: row token_id from the embedding matrix. No computation, just indexing.</div></div>
  <div class="fb"><div class="fm">Scaled: E' = E · √d_model</div><div class="fd">Some architectures scale embeddings so their magnitude matches positional encodings.</div></div>
  <p class="prose">Typical dimensions: GPT-2 uses d=768 (small) to d=1600 (XL). LLaMA-70B uses d=8192. The embedding table is often <strong>tied</strong> with the output projection (weight tying), reducing parameter count.</p>
  <div class="callout">For GPT-4's ~100k vocab with d_model=12288, the embedding table alone is ~1.2B parameters — a significant fraction of total model size for smaller models.</div>
  <div class="va"><div class="vl">Interactive — 2D embedding projection</div><canvas id="embedCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="resetEmbed()">Regenerate</button></div></div>
  <h3>Python — embedding layer</h3>
  <div class="code-block"><pre><code>import torch
import torch.nn as nn

vocab_size, d_model = 32000, 4096
embed = nn.Embedding(vocab_size, d_model)

# Forward: token IDs → dense vectors
token_ids = torch.tensor([101, 2054, 2003])  # 3 tokens
vectors = embed(token_ids)  # shape: (3, 4096)

# Cosine similarity between tokens
from torch.nn.functional import cosine_similarity
sim = cosine_similarity(vectors[0], vectors[1], dim=0)
print(f"Similarity: {sim:.3f}")</code></pre></div>
  <div class="topic-nav" id="nav-embeddings"></div>
</div>`;
}

/* 03 — Positional Encoding */
function buildPositionalEncoding() {
  return `<div class="topic" id="positional-encoding">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Foundations</div><h2>Positional <em>Encoding</em></h2></div>
    <span class="topic-badge">Sinusoidal · RoPE · ALiBi</span>
  </div>
  <p class="sub">// Giving transformers a sense of token order</p>
  <p class="prose">Self-attention is <strong>permutation-equivariant</strong> — it treats "the cat sat" identically to "sat cat the" without positional information. We need to inject position somehow.</p>
  <div class="fb"><div class="fm">Sinusoidal: PE(pos,2i) = sin(pos / 10000^(2i/d))  &nbsp;  PE(pos,2i+1) = cos(pos / 10000^(2i/d))</div><div class="fd">Original Transformer (2017). Fixed, not learned. Each dimension has a different frequency.</div></div>
  <div class="fb"><div class="fm">RoPE: q'ₘ = Rθ,m · qₘ    k'ₙ = Rθ,n · kₙ    →  q'ₘᵀk'ₙ depends on (m−n)</div><div class="fd">Rotary Position Embedding. Rotates Q,K vectors — attention depends on relative distance. Used in LLaMA, Mistral.</div></div>
  <div class="fb"><div class="fm">ALiBi: attention(i,j) = qᵢᵀkⱼ − m · |i − j|</div><div class="fd">Attention with Linear Biases. No learned parameters — just subtract a slope × distance. Used in BLOOM.</div></div>
  <p class="prose"><strong>RoPE</strong> dominates modern LLMs because it encodes relative position and can be extrapolated beyond training length via NTK-aware scaling or YaRN.</p>
  <div class="callout">Learned absolute position embeddings (GPT-2) can't extrapolate beyond training length. Relative methods (RoPE, ALiBi) handle longer sequences naturally.</div>
  <div class="va"><div class="vl">Interactive — positional encoding patterns</div><canvas id="posEncCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawPosEnc('sin')">Sinusoidal</button> <button class="btn b2" onclick="drawPosEnc('rope')">RoPE</button> <button class="btn b3" onclick="drawPosEnc('alibi')">ALiBi</button></div></div>
  <h3>Python — sinusoidal positional encoding</h3>
  <div class="code-block"><pre><code>import torch, math

def sinusoidal_pe(max_len, d_model):
    pe = torch.zeros(max_len, d_model)
    pos = torch.arange(max_len).unsqueeze(1).float()
    div = torch.exp(torch.arange(0, d_model, 2).float()
                    * (-math.log(10000.0) / d_model))
    pe[:, 0::2] = torch.sin(pos * div)
    pe[:, 1::2] = torch.cos(pos * div)
    return pe  # shape: (max_len, d_model)

pe = sinusoidal_pe(512, 256)
# pe[pos] gives the encoding vector for position pos</code></pre></div>
  <div class="topic-nav" id="nav-positional-encoding"></div>
</div>`;
}

/* 04 — Self-Attention */
function buildSelfAttention() {
  return `<div class="topic" id="self-attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Foundations</div><h2>Self-<em>Attention</em></h2></div>
    <span class="topic-badge">Scaled Dot-Product</span>
  </div>
  <p class="sub">// The mechanism that lets every token look at every other token</p>
  <p class="prose">Self-attention is the <strong>core operation</strong> of transformers. Each token produces a <strong>Query</strong> (what am I looking for?), a <strong>Key</strong> (what do I contain?), and a <strong>Value</strong> (what do I output?). Attention weights are the softmax of query-key dot products.</p>
  <div class="fb"><div class="fm">Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V</div><div class="fd">Scale by √d_k to prevent softmax saturation as dimension grows. Output is a weighted mix of value vectors.</div></div>
  <div class="fb"><div class="fm">Q = XW_Q    K = XW_K    V = XW_V    where W ∈ ℝ^(d_model × d_k)</div><div class="fd">Linear projections from the input. No bias in most modern architectures.</div></div>
  <p class="prose">Complexity is <strong>O(n² · d)</strong> — quadratic in sequence length. This is the fundamental bottleneck that drives context window research. Each attention weight tells you how much token i "pays attention to" token j.</p>
  <div class="callout">The √d_k scaling is crucial. Without it, dot products grow proportionally with dimension, pushing softmax into regions with tiny gradients.</div>
  <div class="va"><div class="vl">Interactive — attention weight heatmap</div><canvas id="selfAttnCanvas" width="700" height="320"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawSelfAttn()">New Random Sequence</button> <label>Temperature: <input type="range" id="attnTemp" min="0.1" max="3" step="0.1" value="1" oninput="drawSelfAttn()"></label></div></div>
  <h3>Python — self-attention from scratch</h3>
  <div class="code-block"><pre><code>import torch
import torch.nn.functional as F

def self_attention(x, W_q, W_k, W_v):
    """x: (batch, seq_len, d_model)"""
    Q = x @ W_q  # (batch, seq_len, d_k)
    K = x @ W_k
    V = x @ W_v
    d_k = Q.size(-1)
    scores = Q @ K.transpose(-2, -1) / d_k**0.5
    weights = F.softmax(scores, dim=-1)
    return weights @ V  # (batch, seq_len, d_v)</code></pre></div>
  <div class="topic-nav" id="nav-self-attention"></div>
</div>`;
}

/* 05 — Multi-Head Attention */
function buildMultiHeadAttention() {
  return `<div class="topic" id="multi-head-attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Foundations</div><h2>Multi-Head <em>Attention</em></h2></div>
    <span class="topic-badge">MHA · MQA · GQA</span>
  </div>
  <p class="sub">// Running multiple attention computations in parallel</p>
  <p class="prose">Instead of one big attention operation, we split into <strong>h heads</strong>, each with dimension d_k = d_model / h. Each head learns different patterns — one might track syntax, another coreference, another positional relationships.</p>
  <div class="fb"><div class="fm">MultiHead(Q,K,V) = Concat(head₁, ..., headₕ) · W_O</div><div class="fd">Run h parallel attention ops with different projections, concat results, project back to d_model.</div></div>
  <div class="fb"><div class="fm">MQA: all heads share K,V — only Q varies per head</div><div class="fd">Multi-Query Attention. Massive KV-cache savings (÷ h). Used in PaLM, Falcon.</div></div>
  <div class="fb"><div class="fm">GQA: groups of heads share K,V — middle ground</div><div class="fd">Grouped-Query Attention. G groups, each with h/G query heads. LLaMA 2 70B uses 8 KV heads for 64 query heads.</div></div>
  <p class="prose">Standard MHA with 32 heads and d_model=4096 → d_k=128 per head. <strong>GQA</strong> is now the default for large models: it trades a tiny quality hit for huge inference speedups via smaller KV caches.</p>
  <div class="va"><div class="vl">Interactive — compare MHA, MQA, GQA head layouts</div><canvas id="mhaCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawMHA('mha')">MHA</button> <button class="btn b2" onclick="drawMHA('mqa')">MQA</button> <button class="btn b3" onclick="drawMHA('gqa')">GQA</button></div></div>
  <h3>Python — grouped-query attention</h3>
  <div class="code-block"><pre><code>import torch, torch.nn as nn, torch.nn.functional as F

class GQA(nn.Module):
    def __init__(self, d, n_heads, n_kv_heads):
        super().__init__()
        self.n_heads, self.n_kv = n_heads, n_kv_heads
        self.d_k = d // n_heads
        self.W_q = nn.Linear(d, n_heads * self.d_k, bias=False)
        self.W_k = nn.Linear(d, n_kv_heads * self.d_k, bias=False)
        self.W_v = nn.Linear(d, n_kv_heads * self.d_k, bias=False)
        self.W_o = nn.Linear(n_heads * self.d_k, d, bias=False)

    def forward(self, x):
        B, T, _ = x.shape
        q = self.W_q(x).view(B, T, self.n_heads, self.d_k).transpose(1, 2)
        k = self.W_k(x).view(B, T, self.n_kv, self.d_k).transpose(1, 2)
        v = self.W_v(x).view(B, T, self.n_kv, self.d_k).transpose(1, 2)
        # Repeat KV heads to match query heads
        r = self.n_heads // self.n_kv
        k = k.repeat_interleave(r, dim=1)
        v = v.repeat_interleave(r, dim=1)
        attn = F.scaled_dot_product_attention(q, k, v, is_causal=True)
        return self.W_o(attn.transpose(1,2).reshape(B, T, -1))</code></pre></div>
  <div class="topic-nav" id="nav-multi-head-attention"></div>
</div>`;
}

/* 06 — Feed-Forward Networks */
function buildFeedForward() {
  return `<div class="topic" id="feed-forward">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Foundations</div><h2>Feed-Forward <em>Networks</em></h2></div>
    <span class="topic-badge">SwiGLU · GELU · Expansion</span>
  </div>
  <p class="sub">// The per-token MLP after every attention layer</p>
  <p class="prose">After attention mixes information across tokens, the <strong>feed-forward network (FFN)</strong> processes each token independently. It expands to a higher dimension, applies a nonlinearity, and projects back down. This is where most of the model's "knowledge" is stored.</p>
  <div class="fb"><div class="fm">FFN(x) = W₂ · σ(W₁x + b₁) + b₂    where W₁ ∈ ℝ^(d × 4d)</div><div class="fd">Classic design: expand 4×, activate, contract. About 2/3 of transformer parameters live here.</div></div>
  <div class="fb"><div class="fm">SwiGLU(x) = (W₁x ⊙ Swish(W_gate·x)) · W₂    where W₁,W_gate ∈ ℝ^(d × ⅔·4d)</div><div class="fd">Gated variant used in LLaMA, Mistral, Gemma. ⅔ factor keeps parameter count equal to standard 4d expansion.</div></div>
  <p class="prose"><strong>SwiGLU</strong> consistently outperforms ReLU and GELU. The gating mechanism lets the network learn to suppress/amplify features multiplicatively — more expressive than additive bias alone.</p>
  <div class="callout">In a 70B-parameter model, the FFN layers contain roughly 47B parameters. They act as massive key-value memories: keys are W₁ rows, values are W₂ columns.</div>
  <div class="va"><div class="vl">Interactive — activation functions comparison</div><canvas id="ffnCanvas" width="700" height="260"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawFFN('relu')">ReLU</button> <button class="btn b2" onclick="drawFFN('gelu')">GELU</button> <button class="btn b3" onclick="drawFFN('swish')">Swish</button> <button class="btn b4" onclick="drawFFN('swiglu')">SwiGLU gate</button></div></div>
  <h3>Python — SwiGLU FFN</h3>
  <div class="code-block"><pre><code>import torch, torch.nn as nn, torch.nn.functional as F

class SwiGLU_FFN(nn.Module):
    def __init__(self, d_model, expansion=8/3):
        super().__init__()
        hidden = int(d_model * expansion)
        self.w1 = nn.Linear(d_model, hidden, bias=False)
        self.w_gate = nn.Linear(d_model, hidden, bias=False)
        self.w2 = nn.Linear(hidden, d_model, bias=False)

    def forward(self, x):
        return self.w2(self.w1(x) * F.silu(self.w_gate(x)))</code></pre></div>
  <div class="topic-nav" id="nav-feed-forward"></div>
</div>`;
}

/* 07 — Transformer Block */
function buildTransformerBlock() {
  return `<div class="topic" id="transformer-block">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Architecture</div><h2>Transformer <em>Block</em></h2></div>
    <span class="topic-badge">Pre-Norm · Residuals</span>
  </div>
  <p class="sub">// The fundamental repeating unit of every LLM</p>
  <p class="prose">A transformer block combines attention and FFN with <strong>residual connections</strong> and <strong>layer normalization</strong>. Modern LLMs use <strong>Pre-Norm</strong> (normalize before each sublayer) rather than Post-Norm, which stabilizes training at scale.</p>
  <div class="fb"><div class="fm">Pre-Norm block:  x → x + Attn(LN(x)) → x + FFN(LN(x))</div><div class="fd">LayerNorm before sublayer, residual after. Gradients flow cleanly through the skip connection.</div></div>
  <div class="fb"><div class="fm">RMSNorm(x) = x / RMS(x) · γ    where RMS(x) = √(mean(x²))</div><div class="fd">Root Mean Square normalization — no mean subtraction. Faster, used in LLaMA, Mistral.</div></div>
  <p class="prose">A 70B model stacks <strong>80 blocks</strong>. Each block adds ~875M parameters. The residual stream acts as a highway — early layers write features, later layers read and refine them. This is the <strong>residual stream</strong> mental model.</p>
  <div class="callout">The residual connection is why deep transformers work at all. Without it, gradients vanish through 80+ layers. With it, there's always a direct path from output to any layer.</div>
  <div class="va"><div class="vl">Interactive — data flow through a transformer block</div><canvas id="tfBlockCanvas" width="700" height="340"></canvas>
  <div class="ctrl"><button class="btn" onclick="animTFBlock()">Animate Forward Pass</button> <button class="btn b2" onclick="drawTFBlock()">Reset</button></div></div>
  <h3>Python — transformer block</h3>
  <div class="code-block"><pre><code>import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, n_kv_heads):
        super().__init__()
        self.ln1 = nn.RMSNorm(d_model)
        self.attn = GQA(d_model, n_heads, n_kv_heads)
        self.ln2 = nn.RMSNorm(d_model)
        self.ffn = SwiGLU_FFN(d_model)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))   # attention + residual
        x = x + self.ffn(self.ln2(x))    # FFN + residual
        return x</code></pre></div>
  <div class="topic-nav" id="nav-transformer-block"></div>
</div>`;
}

/* 08 — Decoder-Only Models */
function buildDecoderOnly() {
  return `<div class="topic" id="decoder-only">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Architecture</div><h2>Decoder-Only <em>Models</em></h2></div>
    <span class="topic-badge">GPT · LLaMA · Causal LM</span>
  </div>
  <p class="sub">// The dominant architecture behind GPT, LLaMA, Mistral, and most modern LLMs</p>
  <p class="prose">Decoder-only models use <strong>causal (left-to-right) masking</strong> so each token can only attend to itself and previous tokens — never the future. This enables <strong>autoregressive generation</strong>: predict next token, append, repeat.</p>
  <div class="fb"><div class="fm">Causal mask: M_ij = 0 if j ≤ i, else −∞</div><div class="fd">Upper triangle set to −∞ before softmax → zeroes out future attention weights.</div></div>
  <div class="fb"><div class="fm">P(text) = ∏ P(token_t | token_1, ..., token_{t-1})</div><div class="fd">Autoregressive factorization — the probability of text as a product of conditional probabilities.</div></div>
  <p class="prose">Why decoder-only won: (1) simpler than encoder-decoder, (2) scales better with compute, (3) naturally handles both understanding and generation in a single architecture. The "decoder" name comes from the original Transformer paper where this half decoded outputs.</p>
  <div class="callout">Every GPT, LLaMA, Mistral, Gemma, Claude, and most modern LLMs are decoder-only. The encoder-decoder style (T5, BART) is now mainly used for specialized tasks like translation.</div>
  <div class="va"><div class="vl">Interactive — causal mask & autoregressive generation</div><canvas id="decoderCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="animDecoder()">Generate Token</button> <button class="btn b2" onclick="resetDecoder()">Reset</button></div></div>
  <h3>Python — causal attention mask</h3>
  <div class="code-block"><pre><code>import torch

def causal_mask(seq_len):
    """Lower-triangular mask for causal (left-to-right) attention"""
    mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1)
    return mask.masked_fill(mask == 1, float('-inf'))

# Usage in attention
scores = Q @ K.T / d_k**0.5
scores = scores + causal_mask(seq_len)  # mask future
weights = torch.softmax(scores, dim=-1)
output = weights @ V</code></pre></div>
  <div class="topic-nav" id="nav-decoder-only"></div>
</div>`;
}

/* 09 — KV-Cache */
function buildKVCache() {
  return `<div class="topic" id="kv-cache">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Architecture</div><h2>KV-<em>Cache</em></h2></div>
    <span class="topic-badge">Memory Optimization</span>
  </div>
  <p class="sub">// Cache once, reuse forever — the key to fast autoregressive generation</p>
  <p class="prose">During generation, each new token only needs to compute its own Q, K, V — but it attends to <strong>all previous K and V vectors</strong>. Without caching, we'd recompute K,V for all prior tokens at every step. The <strong>KV-cache</strong> stores these, turning generation from O(n²) to O(n) per step.</p>
  <div class="fb"><div class="fm">Step t: K_cache = [K₁, K₂, ..., K_t],  V_cache = [V₁, V₂, ..., V_t]</div><div class="fd">Append new K_t, V_t each step. Only compute attention for the new query against cached K,V.</div></div>
  <div class="fb"><div class="fm">Memory: 2 · n_layers · seq_len · n_kv_heads · d_k · bytes_per_param</div><div class="fd">For LLaMA-70B with 4K context in FP16: ~2.5 GB per request just for KV cache.</div></div>
  <p class="prose">KV-cache is why <strong>batch size</strong> during inference is heavily memory-constrained. GQA (fewer KV heads) directly reduces this cost. This is the main motivation behind MQA and GQA research.</p>
  <div class="callout warn">KV-cache memory scales linearly with sequence length × batch size. For long contexts (128K+), a single request can consume 40+ GB. This dominates GPU memory during serving.</div>
  <div class="va"><div class="vl">Interactive — KV-cache growth during generation</div><canvas id="kvCacheCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="animKVCache()">Generate Token</button> <button class="btn b2" onclick="resetKVCache()">Reset</button> <label>Layers: <input type="range" id="kvLayers" min="4" max="32" step="4" value="16" oninput="resetKVCache()"></label></div></div>
  <h3>Python — KV-cache in generation loop</h3>
  <div class="code-block"><pre><code>def generate_with_cache(model, prompt_ids, max_new=50):
    past_kv = None  # will hold cached K,V tensors
    input_ids = prompt_ids

    for _ in range(max_new):
        # Only feed new token(s) — cache handles the rest
        logits, past_kv = model(input_ids, past_key_values=past_kv)
        next_id = logits[:, -1, :].argmax(dim=-1, keepdim=True)
        input_ids = next_id  # only the new token
        if next_id.item() == eos_token_id:
            break
    return all_generated_ids</code></pre></div>
  <div class="topic-nav" id="nav-kv-cache"></div>
</div>`;
}

/* 10 — Context Windows */
function buildContextWindows() {
  return `<div class="topic" id="context-windows">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Architecture</div><h2>Context <em>Windows</em></h2></div>
    <span class="topic-badge">Long Context · RoPE Scaling</span>
  </div>
  <p class="sub">// How much text can a model see at once — and how to push the limits</p>
  <p class="prose">The context window is the maximum number of tokens a model can process in one forward pass. GPT-3 had 2K, GPT-4 Turbo has 128K, Gemini 1.5 has 1M+. Expanding context is critical for document analysis, code understanding, and long conversations.</p>
  <div class="fb"><div class="fm">Attention cost: O(n²) time, O(n) KV-cache memory</div><div class="fd">Quadratic compute + linear memory = context length is the fundamental bottleneck.</div></div>
  <div class="fb"><div class="fm">RoPE scaling: θ' = θ · α    where α = target_len / train_len</div><div class="fd">NTK-aware interpolation stretches RoPE frequencies to extrapolate beyond training length.</div></div>
  <p class="prose"><strong>Approaches to longer context:</strong> (1) RoPE scaling (NTK, YaRN) — cheapest, (2) Sliding window attention (Mistral) — each layer sees a local window, (3) Sparse attention patterns — attend to subset, (4) Ring attention — distribute across GPUs, (5) Simply train on more context.</p>
  <div class="callout">Doubling context length quadruples attention compute but only doubles KV-cache memory. Long-context models primarily fight the compute cost, not the memory cost.</div>
  <div class="va"><div class="vl">Interactive — attention patterns at different context lengths</div><canvas id="ctxCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawCtx('full')">Full Attention</button> <button class="btn b2" onclick="drawCtx('sliding')">Sliding Window</button> <button class="btn b3" onclick="drawCtx('sparse')">Sparse</button> <label>Context: <input type="range" id="ctxLen" min="16" max="128" step="16" value="32" oninput="drawCtx()"></label></div></div>
  <h3>Python — sliding window attention</h3>
  <div class="code-block"><pre><code>def sliding_window_mask(seq_len, window_size):
    """Causal + sliding window: attend to last W tokens only"""
    causal = torch.triu(torch.ones(seq_len, seq_len), diagonal=1)
    window = torch.tril(torch.ones(seq_len, seq_len),
                        diagonal=-window_size)
    mask = causal + window
    return mask.masked_fill(mask >= 1, float('-inf'))

# Mistral uses window_size=4096: each token attends to
# the previous 4096 tokens only, regardless of context length</code></pre></div>
  <div class="topic-nav" id="nav-context-windows"></div>
</div>`;
}

/* 11 — Mixture of Experts */
function buildMixtureOfExperts() {
  return `<div class="topic" id="mixture-of-experts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Architecture</div><h2>Mixture of <em>Experts</em></h2></div>
    <span class="topic-badge">Sparse · Router · Top-K</span>
  </div>
  <p class="sub">// More parameters without proportionally more compute</p>
  <p class="prose"><strong>Mixture of Experts (MoE)</strong> replaces the single FFN with multiple "expert" FFNs and a <strong>router</strong> that selects which experts process each token. Only the top-K experts activate per token — typically K=2 out of 8–64 experts.</p>
  <div class="fb"><div class="fm">MoE(x) = Σᵢ gᵢ(x) · Expertᵢ(x)    where g(x) = TopK(softmax(W_router · x))</div><div class="fd">Router assigns weights to top-K experts. Each expert is a standard FFN. Inactive experts skip computation entirely.</div></div>
  <div class="fb"><div class="fm">Mixtral 8×7B: 8 experts, top-2 routing → 47B total, ~13B active per token</div><div class="fd">7B-quality performance at 13B-compute cost, with 47B parameters of capacity.</div></div>
  <p class="prose"><strong>Key challenges:</strong> (1) <em>Load balancing</em> — prevent all tokens routing to the same expert, fixed with auxiliary loss. (2) <em>Expert collapse</em> — some experts never activate. (3) <em>Communication</em> — experts on different GPUs need token routing across devices.</p>
  <div class="callout">MoE models need more RAM (all experts loaded) but less compute (only K active). This makes them memory-bound, not compute-bound — great for inference on high-memory hardware.</div>
  <div class="va"><div class="vl">Interactive — expert routing animation</div><canvas id="moeCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="animMoE()">Route New Token</button> <button class="btn b2" onclick="resetMoE()">Reset</button> <label>Experts: <input type="range" id="moeExperts" min="4" max="16" step="4" value="8" oninput="resetMoE()"></label></div></div>
  <h3>Python — simplified MoE layer</h3>
  <div class="code-block"><pre><code>import torch, torch.nn as nn, torch.nn.functional as F

class MoELayer(nn.Module):
    def __init__(self, d_model, n_experts=8, top_k=2):
        super().__init__()
        self.top_k = top_k
        self.router = nn.Linear(d_model, n_experts, bias=False)
        self.experts = nn.ModuleList([
            SwiGLU_FFN(d_model) for _ in range(n_experts)
        ])

    def forward(self, x):
        # x: (batch, seq, d_model)
        logits = self.router(x)                       # (B, T, E)
        weights, indices = logits.topk(self.top_k)    # top-K experts
        weights = F.softmax(weights, dim=-1)           # normalize
        out = torch.zeros_like(x)
        for k in range(self.top_k):
            for e in range(len(self.experts)):
                mask = indices[..., k] == e
                if mask.any():
                    out[mask] += weights[..., k:k+1][mask] * \\
                                 self.experts[e](x[mask])
        return out</code></pre></div>
  <div class="topic-nav" id="nav-mixture-of-experts"></div>
</div>`;
}

/* 12 — Scaling Laws */
function buildScalingLaws() {
  return `<div class="topic" id="scaling-laws">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Architecture</div><h2>Scaling <em>Laws</em></h2></div>
    <span class="topic-badge">Chinchilla · Power Laws</span>
  </div>
  <p class="sub">// Predicting performance before spending millions on compute</p>
  <p class="prose"><strong>Scaling laws</strong> reveal that LLM loss follows <strong>power laws</strong> in parameters (N), data (D), and compute (C). The <strong>Chinchilla paper</strong> showed that most models were trained on too little data — the optimal ratio is roughly 20 tokens per parameter.</p>
  <div class="fb"><div class="fm">L(N) ≈ (N_c / N)^α_N    L(D) ≈ (D_c / D)^α_D</div><div class="fd">Loss decreases as a power law. α_N ≈ 0.076, α_D ≈ 0.095 from Kaplan et al.</div></div>
  <div class="fb"><div class="fm">Chinchilla optimal: D_opt ≈ 20 · N</div><div class="fd">For a 70B model, train on ~1.4T tokens. GPT-3 (175B) was undertrained at 300B tokens.</div></div>
  <div class="fb"><div class="fm">Compute: C ≈ 6 · N · D  (FLOPs)</div><div class="fd">Rough approximation: 6 FLOPs per parameter per token for a forward+backward pass.</div></div>
  <p class="prose">In practice, modern models (LLaMA 3, Gemma) train <em>way beyond</em> Chinchilla-optimal because <strong>inference cost matters more</strong>: a smaller model trained on more data is cheap to serve. LLaMA 3 8B trains on 15T tokens (1875× parameter count).</p>
  <div class="callout">Scaling laws let you predict the loss of a $100M training run from a $1K experiment. Run small models, fit the power law, extrapolate — this is how frontier labs plan training.</div>
  <div class="va"><div class="vl">Interactive — scaling law curves</div><canvas id="scalingCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawScaling('params')">Parameters</button> <button class="btn b2" onclick="drawScaling('data')">Data</button> <button class="btn b3" onclick="drawScaling('compute')">Compute</button></div></div>
  <h3>Python — fit scaling law</h3>
  <div class="code-block"><pre><code>import numpy as np
from scipy.optimize import curve_fit

def power_law(x, a, b, c):
    return a * x**(-b) + c

# Example: fit loss vs parameters from small runs
params = np.array([1e6, 1e7, 1e8, 5e8, 1e9])
losses = np.array([4.2, 3.5, 2.9, 2.5, 2.3])

popt, _ = curve_fit(power_law, params, losses)
# Predict loss at 70B
predicted = power_law(70e9, *popt)
print(f"Predicted loss at 70B: {predicted:.3f}")</code></pre></div>
  <div class="topic-nav" id="nav-scaling-laws"></div>
</div>`;
}

/* 13 — Pre-Training */
function buildPreTraining() {
  return `<div class="topic" id="pre-training">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Training</div><h2>Pre-<em>Training</em></h2></div>
    <span class="topic-badge">Next-Token Prediction</span>
  </div>
  <p class="sub">// Learning language from trillions of tokens</p>
  <p class="prose">Pre-training is the foundation: train a randomly-initialized transformer to predict the next token on a massive text corpus. The <strong>cross-entropy loss</strong> between predicted and actual next tokens drives all learning. The model develops grammar, facts, reasoning, and code — all from this single objective.</p>
  <div class="fb"><div class="fm">L = −(1/T) Σ log P(token_t | token_1, ..., token_{t−1})</div><div class="fd">Average negative log-likelihood over all positions. Lower loss = better predictions.</div></div>
  <div class="fb"><div class="fm">Perplexity = e^L = 2^(L/ln2)</div><div class="fd">Intuition: average number of "choices" the model is uncertain between. PPL of 10 ≈ choosing among 10 options.</div></div>
  <p class="prose"><strong>Training recipe:</strong> AdamW optimizer (β₁=0.9, β₂=0.95), cosine learning rate schedule with warmup, weight decay 0.1, gradient clipping at 1.0, bf16 mixed precision, sequence packing, batch size ramp-up.</p>
  <div class="callout">LLaMA 3 70B: 15T tokens, ~1e25 FLOPs, ~6000 GPU×months on H100s. The cost of pre-training a frontier model is $10M–$100M+ in compute alone.</div>
  <div class="va"><div class="vl">Interactive — training loss curve</div><canvas id="pretrainCanvas" width="700" height="260"></canvas>
  <div class="ctrl"><button class="btn" onclick="animPretrain()">Animate Training</button> <button class="btn b2" onclick="resetPretrain()">Reset</button></div></div>
  <h3>Python — pre-training loop skeleton</h3>
  <div class="code-block"><pre><code>import torch
from torch.nn import CrossEntropyLoss

optimizer = torch.optim.AdamW(model.parameters(),
    lr=3e-4, betas=(0.9, 0.95), weight_decay=0.1)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=total_steps)

for batch in dataloader:
    input_ids = batch['input_ids']          # (B, T)
    logits = model(input_ids[:, :-1])       # predict
    loss = CrossEntropyLoss()(
        logits.reshape(-1, vocab_size),
        input_ids[:, 1:].reshape(-1)        # targets shifted by 1
    )
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()
    scheduler.step()
    optimizer.zero_grad()</code></pre></div>
  <div class="topic-nav" id="nav-pre-training"></div>
</div>`;
}

/* 14 — Fine-Tuning */
function buildFineTuning() {
  return `<div class="topic" id="fine-tuning">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Training</div><h2>Fine-<em>Tuning</em></h2></div>
    <span class="topic-badge">SFT · Instruction Tuning</span>
  </div>
  <p class="sub">// Turning a base model into a helpful assistant</p>
  <p class="prose">A pre-trained model predicts next tokens but doesn't follow instructions. <strong>Supervised Fine-Tuning (SFT)</strong> trains on curated (instruction, response) pairs — teaching the model to converse, follow directions, and output structured answers.</p>
  <div class="fb"><div class="fm">L_SFT = −Σ log P(response_t | instruction, response_{&lt;t})</div><div class="fd">Only compute loss on the response tokens — the instruction tokens are context, not targets.</div></div>
  <div class="fb"><div class="fm">Dataset: ~10K–100K high-quality (instruction, response) pairs</div><div class="fd">Quality >> quantity. Careful curation matters more than scale for SFT.</div></div>
  <p class="prose"><strong>Catastrophic forgetting</strong> is the main risk: fine-tuning too aggressively overwrites pre-training knowledge. Mitigations: low learning rate (1e-5 to 5e-5), few epochs (1–3), mixing pre-training data.</p>
  <div class="callout">The gap between a base model (random-feeling completions) and a fine-tuned model (helpful assistant) is dramatic — SFT is what makes "chat" models work.</div>
  <div class="va"><div class="vl">Interactive — fine-tuning effect on output distribution</div><canvas id="finetuneCanvas" width="700" height="260"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawFinetune('base')">Base Model</button> <button class="btn b2" onclick="drawFinetune('sft')">After SFT</button> <button class="btn b3" onclick="drawFinetune('overfit')">Overfit</button></div></div>
  <h3>Python — SFT with masking</h3>
  <div class="code-block"><pre><code># SFT training: only compute loss on response tokens
def sft_loss(model, input_ids, response_start_idx):
    logits = model(input_ids[:, :-1])
    # Create labels: -100 for instruction tokens (ignored by loss)
    labels = input_ids[:, 1:].clone()
    labels[:, :response_start_idx] = -100
    loss = CrossEntropyLoss(ignore_index=-100)(
        logits.reshape(-1, vocab_size),
        labels.reshape(-1)
    )
    return loss

# Typical hyperparameters
# lr: 2e-5, epochs: 2-3, batch: 128, warmup: 3%</code></pre></div>
  <div class="topic-nav" id="nav-fine-tuning"></div>
</div>`;
}

/* 15 — LoRA & QLoRA */
function buildLoRA() {
  return `<div class="topic" id="lora-qlora">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Training</div><h2>LoRA & <em>QLoRA</em></h2></div>
    <span class="topic-badge">Parameter-Efficient</span>
  </div>
  <p class="sub">// Fine-tune a 70B model on a single GPU</p>
  <p class="prose"><strong>LoRA (Low-Rank Adaptation)</strong> freezes all pre-trained weights and injects small trainable rank-decomposition matrices. Instead of updating W ∈ ℝ^(d×d), we learn W' = W + BA where B ∈ ℝ^(d×r), A ∈ ℝ^(r×d) with rank r ≪ d (typically 8–64).</p>
  <div class="fb"><div class="fm">W' = W₀ + (α/r) · B · A    where B ∈ ℝ^(d×r), A ∈ ℝ^(r×d)</div><div class="fd">Only B and A are trained. W₀ stays frozen. α/r scales the adapter contribution.</div></div>
  <div class="fb"><div class="fm">Trainable params: 2 · d · r per adapter ≪ d²</div><div class="fd">For d=4096, r=16: 131K params per adapter vs 16.7M for the full matrix — 128× reduction.</div></div>
  <p class="prose"><strong>QLoRA</strong> goes further: quantize W₀ to 4-bit (NF4 format), keep adapters in bf16, and use paged optimizers to handle memory spikes. This makes fine-tuning a 65B model possible on a single 48GB GPU.</p>
  <div class="callout">LoRA adapters can be merged back into the base weights for zero-cost inference: W_merged = W₀ + (α/r)·B·A. Multiple LoRA adapters can be served simultaneously by switching the small adapter weights per request.</div>
  <div class="va"><div class="vl">Interactive — low-rank decomposition</div><canvas id="loraCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><label>Rank r: <input type="range" id="loraRank" min="1" max="32" step="1" value="8" oninput="drawLoRA()"></label> <label>Alpha α: <input type="range" id="loraAlpha" min="1" max="64" step="1" value="16" oninput="drawLoRA()"></label></div></div>
  <h3>Python — LoRA with PEFT</h3>
  <div class="code-block"><pre><code>from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,                          # rank
    lora_alpha=32,                 # scaling factor
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(base_model, config)
model.print_trainable_parameters()
# trainable: 83M / 7B total = 1.2%</code></pre></div>
  <div class="topic-nav" id="nav-lora-qlora"></div>
</div>`;
}

/* 16 — RLHF */
function buildRLHF() {
  return `<div class="topic" id="rlhf">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Training</div><h2><em>RLHF</em></h2></div>
    <span class="topic-badge">Reward Model · PPO</span>
  </div>
  <p class="sub">// Aligning language models with human preferences</p>
  <p class="prose"><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> is a 3-stage process: (1) SFT the base model, (2) train a <strong>reward model</strong> on human comparison data, (3) optimize the SFT model with <strong>PPO</strong> against the reward model while staying close to the SFT policy.</p>
  <div class="fb"><div class="fm">Stage 2 — Reward: L_RM = −log σ(r(x, y_w) − r(x, y_l))</div><div class="fd">Bradley-Terry model: chosen response y_w should score higher than rejected y_l.</div></div>
  <div class="fb"><div class="fm">Stage 3 — PPO: max E[r(x,y)] − β · KL(π_θ || π_ref)</div><div class="fd">Maximize reward while staying close to the reference policy. β controls the KL penalty.</div></div>
  <p class="prose">The KL penalty is crucial — without it, the model "reward hacks": finds adversarial outputs that fool the reward model. Typical β values: 0.01–0.2. RLHF produces noticeably better outputs than SFT alone, but adds significant training complexity.</p>
  <div class="callout">RLHF was the secret sauce behind ChatGPT's launch. InstructGPT showed that RLHF on a 1.3B model could outperform a 175B SFT model in human evaluations.</div>
  <div class="va"><div class="vl">Interactive — RLHF pipeline stages</div><canvas id="rlhfCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawRLHF(1)">Stage 1: SFT</button> <button class="btn b2" onclick="drawRLHF(2)">Stage 2: Reward</button> <button class="btn b3" onclick="drawRLHF(3)">Stage 3: PPO</button></div></div>
  <h3>Python — reward model training</h3>
  <div class="code-block"><pre><code>import torch.nn.functional as F

class RewardModel(nn.Module):
    def __init__(self, base_model):
        super().__init__()
        self.model = base_model
        self.head = nn.Linear(d_model, 1, bias=False)

    def forward(self, input_ids):
        hidden = self.model(input_ids).last_hidden_state
        reward = self.head(hidden[:, -1, :])  # score from last token
        return reward.squeeze(-1)

# Bradley-Terry loss
def reward_loss(chosen_reward, rejected_reward):
    return -F.logsigmoid(chosen_reward - rejected_reward).mean()</code></pre></div>
  <div class="topic-nav" id="nav-rlhf"></div>
</div>`;
}

/* 17 — DPO */
function buildDPO() {
  return `<div class="topic" id="dpo">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Training</div><h2><em>DPO</em></h2></div>
    <span class="topic-badge">Direct Preference Optimization</span>
  </div>
  <p class="sub">// Skip the reward model — optimize preferences directly</p>
  <p class="prose"><strong>DPO</strong> reformulates RLHF as a simple classification problem: given (chosen, rejected) pairs, directly optimize the policy — no reward model, no PPO, no RL. The key insight: the optimal RLHF solution has a closed-form mapping between reward and policy.</p>
  <div class="fb"><div class="fm">L_DPO = −log σ( β · [log π_θ(y_w|x)/π_ref(y_w|x) − log π_θ(y_l|x)/π_ref(y_l|x)] )</div><div class="fd">Increase probability of chosen, decrease rejected, relative to the reference model.</div></div>
  <div class="fb"><div class="fm">Implicit reward: r(x,y) = β · log[π_θ(y|x) / π_ref(y|x)] + const</div><div class="fd">DPO learns the reward implicitly — the policy IS the reward model.</div></div>
  <p class="prose"><strong>Why DPO took over:</strong> (1) simpler pipeline — just SFT then DPO, (2) more stable than PPO, (3) cheaper — no separate reward model forward passes, (4) competitive or better quality. Variants: IPO (no sigmoid), KTO (unpaired), ORPO (combines SFT+DPO).</p>
  <div class="callout">DPO needs a frozen reference model in memory alongside the training model — essentially doubling memory cost. Efficient implementations use LoRA or offload the reference to CPU.</div>
  <div class="va"><div class="vl">Interactive — DPO preference optimization</div><canvas id="dpoCanvas" width="700" height="260"></canvas>
  <div class="ctrl"><button class="btn" onclick="animDPO()">Optimization Step</button> <button class="btn b2" onclick="resetDPO()">Reset</button> <label>β: <input type="range" id="dpoBeta" min="0.05" max="0.5" step="0.05" value="0.1" oninput="resetDPO()"></label></div></div>
  <h3>Python — DPO loss</h3>
  <div class="code-block"><pre><code>def dpo_loss(pi_chosen, pi_rejected, ref_chosen, ref_rejected, beta=0.1):
    """All inputs are log-probabilities of the full sequences"""
    chosen_ratio = pi_chosen - ref_chosen
    rejected_ratio = pi_rejected - ref_rejected
    loss = -F.logsigmoid(beta * (chosen_ratio - rejected_ratio))
    return loss.mean()

# In practice: sum log P(token_t | prev) over response tokens
# for both policy (π_θ) and reference (π_ref) models</code></pre></div>
  <div class="topic-nav" id="nav-dpo"></div>
</div>`;
}

/* 18 — Data Curation */
function buildDataCuration() {
  return `<div class="topic" id="data-curation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Training</div><h2>Data <em>Curation</em></h2></div>
    <span class="topic-badge">Quality · Dedup · Mixing</span>
  </div>
  <p class="sub">// The most impactful and least glamorous part of LLM training</p>
  <p class="prose">Data quality determines model quality. The pipeline: <strong>crawl → filter → deduplicate → classify → mix</strong>. Common Crawl provides ~250B pages, but only a small fraction is high-quality. Aggressive filtering and deduplication are essential.</p>
  <div class="fb"><div class="fm">Quality filter pipeline: URL → language ID → perplexity → toxicity → heuristic rules</div><div class="fd">Each stage drops data. LLaMA 3 starts with 15T+ raw tokens and uses a classifier trained on quality signals.</div></div>
  <div class="fb"><div class="fm">Dedup: MinHash + LSH for fuzzy, exact-match for verbatim</div><div class="fd">Duplicates hurt training: models memorize repeated passages, wasting capacity. 30–50% of web crawl is near-duplicate.</div></div>
  <p class="prose"><strong>Data mixing</strong> is critical: model capabilities depend on training data composition. Typical mix: ~50% web, ~25% code, ~10% academic, ~5% books, ~5% math, ~5% conversation. Overloading on code improves reasoning.</p>
  <div class="callout warn">Benchmark contamination is a real problem — if test questions appear in training data, benchmarks are meaningless. Modern data pipelines include decontamination stages that remove known benchmarks.</div>
  <div class="va"><div class="vl">Interactive — data filtering funnel</div><canvas id="dataCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="animData()">Animate Pipeline</button> <button class="btn b2" onclick="resetData()">Reset</button></div></div>
  <h3>Python — MinHash deduplication</h3>
  <div class="code-block"><pre><code>from datasketch import MinHash, MinHashLSH

def minhash_doc(text, num_perm=128):
    m = MinHash(num_perm=num_perm)
    for word in text.lower().split():
        m.update(word.encode('utf8'))
    return m

# Build LSH index for near-duplicate detection
lsh = MinHashLSH(threshold=0.8, num_perm=128)
for doc_id, text in documents:
    mh = minhash_doc(text)
    if not lsh.query(mh):  # not similar to existing
        lsh.insert(doc_id, mh)
    else:
        print(f"Dropping duplicate: {doc_id}")</code></pre></div>
  <div class="topic-nav" id="nav-data-curation"></div>
</div>`;
}

/* 19 — Decoding Strategies */
function buildDecodingStrategies() {
  return `<div class="topic" id="decoding-strategies">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Inference</div><h2>Decoding <em>Strategies</em></h2></div>
    <span class="topic-badge">Greedy · Beam Search</span>
  </div>
  <p class="sub">// Deterministic methods for converting logits to text</p>
  <p class="prose"><strong>Greedy decoding</strong> picks the highest-probability token at each step. Simple but often suboptimal — it can miss globally better sequences. <strong>Beam search</strong> maintains K candidate sequences (beams) and prunes at each step.</p>
  <div class="fb"><div class="fm">Greedy: token_t = argmax P(token | context)</div><div class="fd">Fastest, but prone to repetitive or locally-trapped outputs.</div></div>
  <div class="fb"><div class="fm">Beam search: maintain top-K partial sequences ranked by Σ log P</div><div class="fd">At each step, expand all K beams, score, keep top K. Beam width K=4–5 is typical.</div></div>
  <p class="prose">Beam search was dominant pre-LLM (translation, summarization) but is rarely used for chat/creative generation — it produces <em>too safe</em>, repetitive text. Modern LLMs use <strong>sampling</strong> (next topic) for most tasks.</p>
  <div class="callout">Beam search still wins for tasks with a "correct" answer — code generation, math, structured output. For open-ended text, sampling produces more natural and diverse output.</div>
  <div class="va"><div class="vl">Interactive — beam search tree</div><canvas id="decodingCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="animDecoding()">Next Step</button> <button class="btn b2" onclick="resetDecoding()">Reset</button> <label>Beam width: <input type="range" id="beamWidth" min="1" max="5" step="1" value="3" oninput="resetDecoding()"></label></div></div>
  <h3>Python — beam search</h3>
  <div class="code-block"><pre><code>def beam_search(model, prompt_ids, beam_width=4, max_len=50):
    beams = [(prompt_ids, 0.0)]  # (sequence, log_prob)
    for _ in range(max_len):
        candidates = []
        for seq, score in beams:
            logits = model(seq)[:, -1, :]
            log_probs = F.log_softmax(logits, dim=-1)
            topk = log_probs.topk(beam_width)
            for i in range(beam_width):
                new_seq = torch.cat([seq, topk.indices[:, i:i+1]], dim=-1)
                new_score = score + topk.values[:, i].item()
                candidates.append((new_seq, new_score))
        # Keep top-K beams
        beams = sorted(candidates, key=lambda x: -x[1])[:beam_width]
    return beams[0][0]  # best sequence</code></pre></div>
  <div class="topic-nav" id="nav-decoding-strategies"></div>
</div>`;
}

/* 20 — Sampling */
function buildSampling() {
  return `<div class="topic" id="sampling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Inference</div><h2><em>Sampling</em></h2></div>
    <span class="topic-badge">Temperature · Top-K · Top-P</span>
  </div>
  <p class="sub">// Controlling creativity by shaping the probability distribution</p>
  <p class="prose">Instead of argmax, <strong>sample</strong> from the distribution — but shape it first. <strong>Temperature</strong> sharpens or flattens. <strong>Top-K</strong> limits to K most likely tokens. <strong>Top-P (nucleus)</strong> limits to the smallest set that sums to P probability.</p>
  <div class="fb"><div class="fm">Temperature: P'(token) = softmax(logit / T)</div><div class="fd">T<1 → sharper (more confident). T>1 → flatter (more random). T→0 = greedy.</div></div>
  <div class="fb"><div class="fm">Top-K: zero out all but top K logits, renormalize</div><div class="fd">K=50 is common. Prevents sampling very unlikely tokens (garbage).</div></div>
  <div class="fb"><div class="fm">Top-P (nucleus): keep tokens until cumulative P ≥ p, zero rest</div><div class="fd">Adaptive: for confident predictions, keeps few tokens. For uncertain, keeps many. p=0.9–0.95 typical.</div></div>
  <p class="prose">In practice, combine them: temperature + top-P is the standard. <strong>Repetition penalty</strong> divides logits of recently-generated tokens by a factor (1.1–1.3) to reduce loops. <strong>Min-P</strong> is a newer approach that scales the threshold with the top token's probability.</p>
  <div class="callout">Temperature 0.0–0.3 for code/math (deterministic). Temperature 0.7–1.0 for creative writing. Top-P 0.9 is a solid default for most tasks.</div>
  <div class="va"><div class="vl">Interactive — probability distribution shaping</div><canvas id="samplingCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><label>Temp: <input type="range" id="sampTemp" min="0.1" max="2" step="0.1" value="1" oninput="drawSampling()"></label> <label>Top-K: <input type="range" id="sampTopK" min="1" max="50" step="1" value="50" oninput="drawSampling()"></label> <label>Top-P: <input type="range" id="sampTopP" min="0.1" max="1" step="0.05" value="1" oninput="drawSampling()"></label></div></div>
  <h3>Python — sampling with temperature + top-p</h3>
  <div class="code-block"><pre><code>def sample(logits, temperature=0.8, top_p=0.9, top_k=50):
    logits = logits / temperature
    # Top-K filtering
    if top_k > 0:
        indices_to_remove = logits < logits.topk(top_k).values[..., -1:]
        logits[indices_to_remove] = float('-inf')
    # Top-P (nucleus) filtering
    sorted_logits, sorted_idx = logits.sort(descending=True)
    cumsum = sorted_logits.softmax(dim=-1).cumsum(dim=-1)
    remove = cumsum - sorted_logits.softmax(dim=-1) >= top_p
    sorted_logits[remove] = float('-inf')
    logits.scatter_(-1, sorted_idx, sorted_logits)
    probs = logits.softmax(dim=-1)
    return torch.multinomial(probs, 1)</code></pre></div>
  <div class="topic-nav" id="nav-sampling"></div>
</div>`;
}

/* 21 — Speculative Decoding */
function buildSpeculativeDecoding() {
  return `<div class="topic" id="speculative-decoding">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Inference</div><h2>Speculative <em>Decoding</em></h2></div>
    <span class="topic-badge">Draft & Verify</span>
  </div>
  <p class="sub">// Use a fast model to draft, a large model to verify — 2–3× speedup</p>
  <p class="prose">Autoregressive generation is <strong>memory-bound</strong>: each token requires loading all model weights but does minimal computation. <strong>Speculative decoding</strong> uses a small draft model to generate K candidate tokens, then the large model verifies all K in one forward pass (which is compute-bound, so it's fast).</p>
  <div class="fb"><div class="fm">Draft: generate K tokens with small model M_s (fast)</div><div class="fd">The draft model should be ~10-20× smaller. E.g., 0.5B draft for 70B target.</div></div>
  <div class="fb"><div class="fm">Verify: run target model M_t on all K tokens in parallel → accept/reject each</div><div class="fd">Accept token i if P_target(token_i) ≥ P_draft(token_i). On rejection, resample from adjusted distribution.</div></div>
  <p class="prose">The key guarantee: speculative decoding produces <strong>exactly the same distribution</strong> as standard generation — it's lossless. Speedup depends on draft model quality (acceptance rate). Typical: 60–80% acceptance → 2–3× throughput.</p>
  <div class="callout">Medusa and Eagle add extra heads to the model itself instead of using a separate draft model — eliminating the need for draft-target distribution matching.</div>
  <div class="va"><div class="vl">Interactive — speculative decoding timeline</div><canvas id="specCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="animSpec()">Generate Batch</button> <button class="btn b2" onclick="resetSpec()">Reset</button> <label>Draft tokens K: <input type="range" id="specK" min="2" max="8" step="1" value="4" oninput="resetSpec()"></label></div></div>
  <h3>Python — speculative decoding loop</h3>
  <div class="code-block"><pre><code>def speculative_decode(target, draft, prompt, K=4):
    tokens = prompt.clone()
    while len(tokens) < max_len:
        # 1. Draft K tokens
        draft_tokens, draft_probs = [], []
        for _ in range(K):
            logits = draft(tokens)
            p = logits[:, -1].softmax(-1)
            t = torch.multinomial(p, 1)
            draft_tokens.append(t)
            draft_probs.append(p[0, t.item()])
            tokens = torch.cat([tokens, t], dim=-1)

        # 2. Verify all K with target (single forward pass)
        target_logits = target(tokens)
        for i in range(K):
            pos = len(tokens) - K + i
            p_target = target_logits[:, pos-1].softmax(-1)
            p_t = p_target[0, draft_tokens[i].item()]
            # Accept with min(1, p_target/p_draft)
            if torch.rand(1) < (p_t / draft_probs[i]):
                continue  # accepted
            else:
                # Reject: resample, discard rest
                tokens = tokens[:, :pos]
                break
    return tokens</code></pre></div>
  <div class="topic-nav" id="nav-speculative-decoding"></div>
</div>`;
}

/* 22 — Quantization */
function buildQuantization() {
  return `<div class="topic" id="quantization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Inference</div><h2>Quant<em>ization</em></h2></div>
    <span class="topic-badge">INT8 · INT4 · GPTQ · AWQ</span>
  </div>
  <p class="sub">// Shrink models 2–4× with minimal quality loss</p>
  <p class="prose"><strong>Quantization</strong> reduces the precision of model weights from 16-bit floats to 8-bit or 4-bit integers. This halves (or quarters) memory usage and speeds up memory-bound inference. The challenge: preserving output quality.</p>
  <div class="fb"><div class="fm">Linear quantization: q = round((x − zero) / scale)    x ≈ q · scale + zero</div><div class="fd">Map continuous weights to discrete integer grid. Scale and zero-point define the mapping.</div></div>
  <div class="fb"><div class="fm">Model sizes: FP16=2B/param → INT8=1B/param → INT4=0.5B/param</div><div class="fd">A 70B model: 140GB (FP16) → 70GB (INT8) → 35GB (INT4). Fits on 2× A100 vs 4× A100.</div></div>
  <p class="prose"><strong>Methods:</strong> (1) <em>GPTQ</em> — weight-only, layer-by-layer with Hessian info, (2) <em>AWQ</em> — activation-aware, protects salient weights, (3) <em>GGUF</em> — CPU-friendly mixed-precision, (4) <em>bitsandbytes</em> — NF4 datatype for QLoRA. Weight-only quantization (activations stay in fp16) is most common for LLMs.</p>
  <div class="callout">INT8 quantization has virtually no quality loss for most tasks. INT4 shows small degradation but is the sweet spot for serving — 4× memory savings are too compelling to ignore.</div>
  <div class="va"><div class="vl">Interactive — precision comparison</div><canvas id="quantCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawQuant('fp16')">FP16</button> <button class="btn b2" onclick="drawQuant('int8')">INT8</button> <button class="btn b3" onclick="drawQuant('int4')">INT4</button></div></div>
  <h3>Python — quantize with bitsandbytes</h3>
  <div class="code-block"><pre><code>from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# 4-bit quantization (NF4 for QLoRA)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,  # quantize the quantization constants
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-70B",
    quantization_config=bnb_config,
    device_map="auto"
)
# 70B model now fits in ~35GB VRAM</code></pre></div>
  <div class="topic-nav" id="nav-quantization"></div>
</div>`;
}

/* 23 — KV-Cache Optimization */
function buildKVCacheOpt() {
  return `<div class="topic" id="kv-cache-opt">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Inference</div><h2>KV-Cache <em>Optimization</em></h2></div>
    <span class="topic-badge">PagedAttention · vLLM</span>
  </div>
  <p class="sub">// Eliminating the memory fragmentation that limits batch size</p>
  <p class="prose">Standard KV-cache allocates a contiguous buffer for the maximum sequence length per request — this wastes memory (most sequences are shorter). <strong>PagedAttention</strong> (vLLM) allocates KV-cache in <em>fixed-size blocks</em> (like OS virtual memory pages), eliminating fragmentation.</p>
  <div class="fb"><div class="fm">PagedAttention: KV-cache = non-contiguous blocks of size B tokens each</div><div class="fd">Physical blocks allocated on demand. Block table maps logical → physical. No wasted pre-allocation.</div></div>
  <div class="fb"><div class="fm">Prefix caching: shared prompts → shared KV blocks (copy-on-write)</div><div class="fd">If 100 requests share a system prompt, cache its KV once. Saves ~50% memory for chat workloads.</div></div>
  <p class="prose"><strong>Impact:</strong> vLLM achieves 2–4× higher throughput than naive serving by fitting more requests in the same GPU memory. Additional optimizations: <em>KV-cache quantization</em> (FP8 per KV), <em>sliding window eviction</em>, and <em>radix tree prefix sharing</em>.</p>
  <div class="callout">PagedAttention is the single most impactful inference optimization for serving LLMs at scale. It's why vLLM, TGI, and SGLang are the standard serving frameworks.</div>
  <div class="va"><div class="vl">Interactive — paged vs contiguous KV-cache allocation</div><canvas id="kvOptCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawKVOpt('contiguous')">Contiguous (naive)</button> <button class="btn b2" onclick="drawKVOpt('paged')">PagedAttention</button> <button class="btn b3" onclick="animKVOpt()">Add Request</button></div></div>
  <h3>Python — vLLM serving</h3>
  <div class="code-block"><pre><code>from vllm import LLM, SamplingParams

# vLLM handles PagedAttention automatically
llm = LLM(
    model="meta-llama/Llama-3.1-8B-Instruct",
    tensor_parallel_size=1,
    gpu_memory_utilization=0.9,  # use 90% of GPU for KV-cache
    enable_prefix_caching=True,  # share KV for common prefixes
)

params = SamplingParams(temperature=0.7, top_p=0.9, max_tokens=256)
outputs = llm.generate(["Explain PagedAttention"], params)
print(outputs[0].outputs[0].text)</code></pre></div>
  <div class="topic-nav" id="nav-kv-cache-opt"></div>
</div>`;
}

/* 24 — Batching & Throughput */
function buildBatching() {
  return `<div class="topic" id="batching">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Inference</div><h2>Batching & <em>Throughput</em></h2></div>
    <span class="topic-badge">Continuous Batching · Prefill vs Decode</span>
  </div>
  <p class="sub">// Serving hundreds of concurrent requests efficiently</p>
  <p class="prose">LLM inference has two distinct phases: <strong>prefill</strong> (process the full prompt — compute-bound, fast per token) and <strong>decode</strong> (generate one token — memory-bound, slow per token). <strong>Continuous batching</strong> dynamically adds/removes requests from a batch as they finish, rather than waiting for the longest sequence.</p>
  <div class="fb"><div class="fm">Static batching: all requests padded to same length, wait for slowest</div><div class="fd">Wastes GPU cycles on padding. Throughput = 1/longest_sequence.</div></div>
  <div class="fb"><div class="fm">Continuous batching: new requests join mid-batch, finished ones leave</div><div class="fd">GPU is always busy. Throughput improves 10-20× compared to static batching.</div></div>
  <p class="prose"><strong>Key metrics:</strong> <em>TTFT</em> (time to first token — mainly prefill), <em>TPS</em> (tokens per second — decode speed), <em>throughput</em> (total tokens/sec across all requests). Disaggregating prefill and decode to separate GPU pools (prefill cluster + decode cluster) is the latest frontier.</p>
  <div class="callout">The fundamental LLM serving insight: prefill is compute-bound, decode is memory-bound. They have opposite optimization strategies. Modern serving engines schedule them separately.</div>
  <div class="va"><div class="vl">Interactive — static vs continuous batching timeline</div><canvas id="batchCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawBatch('static')">Static Batching</button> <button class="btn b2" onclick="drawBatch('continuous')">Continuous Batching</button></div></div>
  <h3>Python — throughput benchmark</h3>
  <div class="code-block"><pre><code>import time, asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(base_url="http://localhost:8000/v1")

async def single_request(prompt):
    start = time.monotonic()
    resp = await client.completions.create(
        model="llama-3.1-8b", prompt=prompt,
        max_tokens=256, temperature=0.7)
    elapsed = time.monotonic() - start
    tokens = resp.usage.completion_tokens
    return tokens, elapsed

async def benchmark(n_concurrent=32):
    prompts = ["Explain transformers in detail."] * n_concurrent
    tasks = [single_request(p) for p in prompts]
    results = await asyncio.gather(*tasks)
    total_tokens = sum(r[0] for r in results)
    wall_time = max(r[1] for r in results)
    print(f"Throughput: {total_tokens/wall_time:.0f} tok/s")</code></pre></div>
  <div class="topic-nav" id="nav-batching"></div>
</div>`;
}

/* 25 — Prompt Engineering */
function buildPromptEngineering() {
  return `<div class="topic" id="prompt-engineering">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Applications</div><h2>Prompt <em>Engineering</em></h2></div>
    <span class="topic-badge">System · Few-Shot · CoT</span>
  </div>
  <p class="sub">// The craft of asking questions that get the best answers</p>
  <p class="prose">Prompt engineering is the art of structuring inputs to maximize output quality. The key tools: <strong>system prompts</strong> (set behavior), <strong>few-shot examples</strong> (show by example), and <strong>chain-of-thought</strong> (encourage step-by-step reasoning).</p>
  <div class="fb"><div class="fm">Zero-shot: Direct instruction → answer</div><div class="fd">Works for simple tasks. "Translate to French: Hello world"</div></div>
  <div class="fb"><div class="fm">Few-shot: Example₁, Example₂, ..., Query → answer</div><div class="fd">Provide 2-5 examples of input→output. Model infers the pattern.</div></div>
  <div class="fb"><div class="fm">Chain-of-Thought: "Think step by step" → reasoning → answer</div><div class="fd">Dramatically improves math, logic, and multi-step reasoning. Model "shows its work."</div></div>
  <p class="prose">Advanced techniques: <em>self-consistency</em> (sample N times, majority vote), <em>tree-of-thought</em> (explore multiple reasoning paths), <em>structured output</em> (ask for JSON with a schema), <em>persona prompting</em> (act as expert in X).</p>
  <div class="callout">Chain-of-thought prompting improved GSM8K (math) accuracy from 17.7% to 58.1% on PaLM 540B — for free, just by adding "Let's think step by step."</div>
  <div class="va"><div class="vl">Interactive — prompt structure diagram</div><canvas id="promptCanvas" width="700" height="280"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawPrompt('zero')">Zero-Shot</button> <button class="btn b2" onclick="drawPrompt('few')">Few-Shot</button> <button class="btn b3" onclick="drawPrompt('cot')">Chain-of-Thought</button></div></div>
  <h3>Python — structured prompting</h3>
  <div class="code-block"><pre><code>from openai import OpenAI
client = OpenAI()

# Chain-of-thought with structured output
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a math tutor. "
         "Always work through problems step by step. "
         "Return JSON with 'steps' (array) and 'answer' (number)."},
        {"role": "user", "content": "If a train travels 120km in "
         "1.5 hours, what is its speed in m/s?"}
    ],
    response_format={"type": "json_object"},
    temperature=0.1
)</code></pre></div>
  <div class="topic-nav" id="nav-prompt-engineering"></div>
</div>`;
}

/* 26 — RAG */
function buildRAG() {
  return `<div class="topic" id="rag">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Applications</div><h2><em>RAG</em></h2></div>
    <span class="topic-badge">Retrieval-Augmented Generation</span>
  </div>
  <p class="sub">// Grounding LLM answers in your own documents</p>
  <p class="prose"><strong>RAG</strong> solves the hallucination problem by retrieving relevant documents before generation. The pipeline: <strong>Chunk</strong> documents → <strong>Embed</strong> chunks → <strong>Store</strong> in vector DB → At query time: <strong>Embed</strong> query → <strong>Retrieve</strong> top-K chunks → <strong>Generate</strong> answer with chunks as context.</p>
  <div class="fb"><div class="fm">Pipeline: Query → Embed → Search → Rerank → Augment Prompt → Generate</div><div class="fd">Each stage has design choices: chunk size, overlap, embedding model, retriever, reranker, prompt template.</div></div>
  <div class="fb"><div class="fm">Chunk size: 256–512 tokens with 10–20% overlap</div><div class="fd">Too small → lost context. Too large → diluted relevance. Semantic chunking (split at paragraph breaks) works better than fixed-size.</div></div>
  <p class="prose"><strong>Common pitfalls:</strong> (1) Chunking destroys context — tables, lists split mid-content. (2) Embedding model mismatch — query embeddings must match document embeddings. (3) Top-K too small — misses relevant but lower-ranked chunks. (4) No reranking — embedding similarity ≠ answer relevance.</p>
  <div class="callout">Reranking is the highest-impact improvement for most RAG systems. A cross-encoder reranker on top-20 retrieval results can boost precision@5 by 15–20%.</div>
  <div class="va"><div class="vl">Interactive — RAG pipeline flow</div><canvas id="ragCanvas" width="780" height="420"></canvas>
  <div class="ctrl"><button class="btn" onclick="animRAG()">Run Query</button> <button class="btn b2" onclick="resetRAG()">Reset</button></div></div>
  <h3>Python — RAG with LangChain</h3>
  <div class="code-block"><pre><code>from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# 1. Chunk documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# 2. Embed & store
vectorstore = FAISS.from_documents(chunks, OpenAIEmbeddings())

# 3. Retrieve & generate
qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o", temperature=0),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
)
answer = qa.invoke("What is the refund policy?")</code></pre></div>
  <div class="topic-nav" id="nav-rag"></div>
</div>`;
}

/* 27 — Embedding Search */
function buildEmbeddingSearch() {
  return `<div class="topic" id="embedding-search">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Applications</div><h2>Embedding <em>Search</em></h2></div>
    <span class="topic-badge">Vector DB · ANN · HNSW</span>
  </div>
  <p class="sub">// Finding semantically similar content at scale</p>
  <p class="prose">Embedding search converts text to vectors and finds nearest neighbors. The embedding model maps text to a dense vector (768–1536 dimensions). <strong>Cosine similarity</strong> or <strong>dot product</strong> measures closeness. For millions of vectors, exact search is too slow — we use <strong>Approximate Nearest Neighbors (ANN)</strong>.</p>
  <div class="fb"><div class="fm">cosine_sim(a, b) = (a · b) / (‖a‖ · ‖b‖) ∈ [−1, 1]</div><div class="fd">1 = identical direction, 0 = orthogonal, −1 = opposite. Most embedding models are L2-normalized.</div></div>
  <div class="fb"><div class="fm">HNSW: hierarchical navigable small world graph</div><div class="fd">Multi-layer graph: top layers for coarse search, bottom layers for precise. O(log n) query time, ~95%+ recall.</div></div>
  <p class="prose"><strong>Vector databases:</strong> Pinecone (managed), Qdrant (open-source), pgvector (PostgreSQL), Chroma (lightweight), Weaviate (hybrid search). For smaller datasets (<100K vectors), brute-force exact search in FAISS is fast enough.</p>
  <div class="callout">Hybrid search (BM25 keyword + semantic embedding) consistently outperforms either alone. Most production systems combine both with reciprocal rank fusion.</div>
  <div class="va"><div class="vl">Interactive — vector space nearest neighbor search</div><canvas id="searchCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawSearch()">New Query</button> <label>K neighbors: <input type="range" id="searchK" min="1" max="10" step="1" value="3" oninput="drawSearch()"></label></div></div>
  <h3>Python — embedding search with FAISS</h3>
  <div class="code-block"><pre><code>import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-base-en-v1.5")

# Index documents
docs = ["Machine learning basics", "Neural networks intro", ...]
embeddings = model.encode(docs, normalize_embeddings=True)
dim = embeddings.shape[1]

index = faiss.IndexFlatIP(dim)  # inner product (= cosine for normalized)
index.add(embeddings.astype('float32'))

# Search
query = model.encode(["How do neural nets work?"],
                     normalize_embeddings=True)
scores, indices = index.search(query.astype('float32'), k=5)
for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
    print(f"{i+1}. [{score:.3f}] {docs[idx]}")</code></pre></div>
  <div class="topic-nav" id="nav-embedding-search"></div>
</div>`;
}

/* 28 — Function Calling */
function buildFunctionCalling() {
  return `<div class="topic" id="function-calling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Applications</div><h2>Function <em>Calling</em></h2></div>
    <span class="topic-badge">Tool Use · Structured Output</span>
  </div>
  <p class="sub">// Extending LLMs with real-world capabilities via tool use</p>
  <p class="prose"><strong>Function calling</strong> lets an LLM request the execution of external functions — APIs, databases, calculations — by outputting structured JSON matching a schema you define. The model decides <em>when</em> to call a function, <em>which</em> function, and with what <em>arguments</em>.</p>
  <div class="fb"><div class="fm">Input: tools=[{name, description, parameters}] + user message</div><div class="fd">You define available tools as JSON Schema. Model chooses to call one (or more) based on the query.</div></div>
  <div class="fb"><div class="fm">Output: tool_calls=[{function: {name, arguments}}]</div><div class="fd">Structured JSON that your code parses and executes. Return the result as a tool message for the next turn.</div></div>
  <p class="prose"><strong>Parallel function calling:</strong> models can request multiple tool calls in one response. <strong>Structured output / JSON mode:</strong> forces the model to output valid JSON matching a schema — useful even without external tools for data extraction, classification, etc.</p>
  <div class="callout">Function calling is the foundation of agents. Without it, LLMs can only output text. With it, they can search the web, query databases, send emails, write code — anything with an API.</div>
  <div class="va"><div class="vl">Interactive — function call flow</div><canvas id="funcCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="animFunc()">Simulate Call</button> <button class="btn b2" onclick="resetFunc()">Reset</button></div></div>
  <h3>Python — OpenAI function calling</h3>
  <div class="code-block"><pre><code>from openai import OpenAI
import json

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Weather in Oslo?"}],
    tools=tools
)
# Parse tool call → execute → send result back
call = response.choices[0].message.tool_calls[0]
args = json.loads(call.function.arguments)</code></pre></div>
  <div class="topic-nav" id="nav-function-calling"></div>
</div>`;
}

/* 29 — Agents & Planning */
function buildAgents() {
  return `<div class="topic" id="agents">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Applications</div><h2>Agents & <em>Planning</em></h2></div>
    <span class="topic-badge">ReAct · Tool Chains · Memory</span>
  </div>
  <p class="sub">// Autonomous multi-step reasoning with tools and memory</p>
  <p class="prose">An <strong>agent</strong> is an LLM that reasons about what to do, takes actions (tool calls), observes results, and iterates. The <strong>ReAct</strong> pattern (Reason + Act) interleaves thinking and tool use: Thought → Action → Observation → Thought → ...</p>
  <div class="fb"><div class="fm">ReAct loop: Thought → Action(tool, args) → Observation → Thought → ... → Final Answer</div><div class="fd">Each iteration: reason about what's needed, call a tool, process the result, decide next step.</div></div>
  <div class="fb"><div class="fm">Planning: Decompose task → subtasks → execute sequentially or in parallel</div><div class="fd">Complex tasks need planning: break "book a trip" into search flights, compare prices, book, confirm.</div></div>
  <p class="prose"><strong>Memory types:</strong> (1) <em>Short-term</em> — conversation history in context window. (2) <em>Long-term</em> — vector store of past interactions, retrieved as needed. (3) <em>Working memory</em> — scratchpad for current task state. Key challenge: agents can be <em>unreliable</em> — they get stuck in loops, hallucinate tool calls, or lose track of the plan.</p>
  <div class="callout">The best agent systems use simple, constrained loops — not complex multi-agent frameworks. A single ReAct loop with 3–5 well-designed tools beats a graph of 10 specialized agents for most tasks.</div>
  <div class="va"><div class="vl">Interactive — ReAct agent loop</div><canvas id="agentCanvas" width="700" height="300"></canvas>
  <div class="ctrl"><button class="btn" onclick="animAgent()">Next Step</button> <button class="btn b2" onclick="resetAgent()">Reset Task</button></div></div>
  <h3>Python — ReAct agent</h3>
  <div class="code-block"><pre><code>def react_agent(query, tools, max_steps=5):
    messages = [
        {"role": "system", "content":
         "You are a helpful agent. Use tools to answer questions. "
         "Think step by step."},
        {"role": "user", "content": query}
    ]
    for step in range(max_steps):
        response = client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=tools)
        msg = response.choices[0].message

        if msg.tool_calls:
            messages.append(msg)
            for call in msg.tool_calls:
                result = execute_tool(call.function.name,
                                     json.loads(call.function.arguments))
                messages.append({
                    "role": "tool",
                    "tool_call_id": call.id,
                    "content": str(result)
                })
        else:
            return msg.content  # final answer
    return "Max steps reached"</code></pre></div>
  <div class="topic-nav" id="nav-agents"></div>
</div>`;
}

/* 30 — Evaluation & Benchmarks */
function buildEvaluation() {
  return `<div class="topic" id="evaluation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Applications</div><h2>Evaluation & <em>Benchmarks</em></h2></div>
    <span class="topic-badge">Perplexity · MMLU · Arena</span>
  </div>
  <p class="sub">// Measuring what matters — and what doesn't</p>
  <p class="prose">How do you know if an LLM is good? <strong>Perplexity</strong> measures language modeling quality. <strong>Benchmarks</strong> test specific skills. <strong>Human evaluation</strong> and <strong>arena rankings</strong> capture overall helpfulness. Each has blind spots.</p>
  <div class="fb"><div class="fm">Perplexity = e^(−1/T · Σ log P(token_t))</div><div class="fd">Average surprisal. Lower = better at predicting text. Only measures language modeling, not task ability.</div></div>
  <div class="fb"><div class="fm">MMLU: 57 subjects, multiple choice (humanities, STEM, social sciences)</div><div class="fd">Knowledge breadth. GPT-4: ~86%, LLaMA-3-70B: ~82%. But multiple-choice ≠ open-ended ability.</div></div>
  <p class="prose"><strong>Key benchmarks:</strong> <em>MMLU</em> (knowledge), <em>HumanEval</em> (code generation), <em>GSM8K</em> (math), <em>HellaSwag</em> (common sense), <em>ARC</em> (reasoning), <em>TruthfulQA</em> (hallucination). <strong>Chatbot Arena</strong> uses live ELO rankings from anonymous human votes — currently the most trusted evaluation.</p>
  <div class="callout warn">Benchmark contamination is rampant — if test questions leak into training data, scores are meaningless. Private held-out test sets and Arena rankings are more reliable than public benchmark scores.</div>
  <div class="va"><div class="vl">Interactive — benchmark comparison radar chart</div><canvas id="evalCanvas" width="700" height="320"></canvas>
  <div class="ctrl"><button class="btn" onclick="drawEval('gpt4')">GPT-4</button> <button class="btn b2" onclick="drawEval('llama3')">LLaMA-3-70B</button> <button class="btn b3" onclick="drawEval('mistral')">Mistral-Large</button> <button class="btn b4" onclick="drawEval('compare')">Compare All</button></div></div>
  <h3>Python — evaluation with lm-harness</h3>
  <div class="code-block"><pre><code># Using EleutherAI lm-evaluation-harness
# pip install lm-eval

# Run MMLU benchmark
# lm_eval --model hf --model_args pretrained=meta-llama/Llama-3.1-8B \\
#   --tasks mmlu --batch_size 8 --output_path results/

# Programmatic usage
from lm_eval import evaluator
results = evaluator.simple_evaluate(
    model="hf",
    model_args="pretrained=meta-llama/Llama-3.1-8B",
    tasks=["mmlu", "hellaswag", "arc_challenge", "gsm8k"],
    batch_size=8,
)
for task, metrics in results["results"].items():
    print(f"{task}: {metrics['acc,none']:.3f}")</code></pre></div>
  <div class="topic-nav" id="nav-evaluation"></div>
</div>`;
}
