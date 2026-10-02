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
/* depth:start — generated from the scratch scripts llm_snippets.py / llm_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "tokenization": {
  "example": "Byte-level BPE starts from UTF-8 bytes. English letters are <strong>1</strong> byte each, Danish text averages <strong>1.19</strong> (æ, ø and å take two), Greek <strong>2</strong>, and Chinese and Hindi <strong>3</strong>. Where the tokenizer saw little of a script, merges are few and text stays close to a token per byte — so the same sentence can cost several times more tokens, context and money in one language than in another.",
  "fails": [
   "Token counts, prices and context limits are per token, not per word; compare languages on tokens actually produced (Petrov et al. 2023 measured up to 15× differences).",
   "Tokenizers are frozen with the model; text that is rare in the tokenizer’s training data (code in a new language, a new script) stays expensive.",
   "Character-level questions (“how many r’s in strawberry?”) are hard because the model never sees characters."
  ],
  "code": "samples = {'English': 'pattern', 'Danish': 'mønstre på tværs', 'Greek': 'μοτίβο',\n           'Chinese': '模式识别', 'Hindi': 'पैटर्न'}\nbytes_per_char = {lang: len(s.encode('utf-8')) / len(s) for lang, s in samples.items()}\n# byte-level BPE starts from UTF-8 bytes: scripts it saw little of stay closer to one token per byte",
  "sources": [
   "R. Sennrich, B. Haddow &amp; A. Birch, “Neural Machine Translation of Rare Words with Subword Units”, <em>ACL</em>, 2016",
   "A. Radford, J. Wu, R. Child, D. Luan, D. Amodei &amp; I. Sutskever, “Language Models Are Unsupervised Multitask Learners”, OpenAI, 2019",
   "A. Petrov, E. La Malfa, P. H. S. Torr &amp; A. Bibi, “Language Model Tokenizers Introduce Unfairness Between Languages”, <em>NeurIPS</em>, 2023"
  ]
 },
 "embeddings": {
  "example": "In GPT-2 small the embedding table — 50,257 tokens × 768 dimensions — is <strong>31%</strong> of all 124M parameters. In Llama 2 70B one 32,000 × 8,192 table is <strong>0.4%</strong>. Tying the input and output tables, as GPT-2 does, saves <strong>38.6M</strong> parameters. In small models the vocabulary is a large share of the budget; in large ones it hardly registers.",
  "fails": [
   "Embedding geometry reflects co-occurrence in training text, including its biases.",
   "Rare tokens get few updates and poor vectors; “glitch tokens” that almost never appeared in training can produce strange behaviour.",
   "Comparing input embeddings across models is meaningless; each model has its own space."
  ],
  "code": "def embedding_share(vocab, d, total):\n    return vocab * d / total\n\ngpt2_small = embedding_share(50_257, 768, 124_439_808)       # GPT-2 small, tied input/output\nllama2_70b = embedding_share(32_000, 8_192, 68_976_648_192)   # Llama 2 70B, one of its two tables\ntied_saving = 50_257 * 768                                     # parameters saved by weight tying",
  "sources": [
   "O. Press &amp; L. Wolf, “Using the Output Embedding to Improve Language Models”, <em>EACL</em>, 2017",
   "A. Radford, J. Wu, R. Child, D. Luan, D. Amodei &amp; I. Sutskever, “Language Models Are Unsupervised Multitask Learners”, OpenAI, 2019",
   "H. Touvron et al., “Llama 2: Open Foundation and Fine-Tuned Chat Models”, arXiv:2307.09288, 2023"
  ]
 },
 "positional-encoding": {
  "example": "With sinusoidal encodings the dot product between positions 10 and 15 is <strong>23.504</strong> — exactly the same as between 500 and 505: similarity depends on distance, not place. RoPE builds this into attention itself. Rotating a query to position 7 and a key to position 3 gives a score of <strong>0.898</strong>; positions 104 and 100 give the same <strong>0.898</strong>, because only the gap of 4 matters.",
  "fails": [
   "Models trained on short contexts degrade beyond them unless the positions are rescaled (position interpolation, YaRN) and usually briefly fine-tuned.",
   "Relative encodings make distance cheap to represent, not easy to use; long-range recall still has to be learned.",
   "The choice interacts with caching and length extrapolation, so changing it means retraining."
  ],
  "code": "def pe(pos, d=64):\n    i = np.arange(d // 2)\n    ang = pos / 10_000 ** (2 * i / d)\n    return np.concatenate([np.sin(ang), np.cos(ang)])\n\nnear = (pe(10) @ pe(15), pe(500) @ pe(505))          # same distance, different places\nrot = lambda v, m, th=0.1: np.array([[np.cos(m*th), -np.sin(m*th)], [np.sin(m*th), np.cos(m*th)]]) @ v\nq, k = np.array([1.0, 0.5]), np.array([0.3, 0.8])\nrope = (rot(q, 7) @ rot(k, 3), rot(q, 104) @ rot(k, 100))   # RoPE: score depends on m - n = 4 only",
  "sources": [
   "A. Vaswani et al., “Attention Is All You Need”, <em>NeurIPS</em>, 2017",
   "J. Su, Y. Lu, S. Pan, A. Murtadha, B. Wen &amp; Y. Liu, “RoFormer: Enhanced Transformer with Rotary Position Embedding”, <em>Neurocomputing</em> 568, 2024",
   "O. Press, N. A. Smith &amp; M. Lewis, “Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation”, <em>ICLR</em>, 2022",
   "B. Peng, J. Quesnelle, H. Fan &amp; E. Shippole, “YaRN: Efficient Context Window Extension of Large Language Models”, <em>ICLR</em>, 2024"
  ]
 },
 "self-attention": {
  "example": "The attention scores for one head in one layer form an n × n matrix. In fp16 that is <strong>0.03 GB</strong> at 4k tokens, <strong>2.1 GB</strong> at 32k and <strong>34 GB</strong> at 128k — for a single head. FlashAttention never stores the matrix: it computes attention in tiles that fit in fast on-chip memory, which is what made long contexts practical.",
  "fails": [
   "FlashAttention removes the memory cost, not the compute: the work still grows with n².",
   "Attention weights are not explanations of the output (Jain &amp; Wallace 2019).",
   "Longer context is not the same as better use of context (see Context Windows)."
  ],
  "code": "def score_matrix_gb(n, bytes_per=2):            # one head, one layer, fp16\n    return n * n * bytes_per / 1e9\n\nsizes = {n: round(score_matrix_gb(n), 3) for n in (4_096, 32_768, 131_072)}",
  "sources": [
   "A. Vaswani et al., “Attention Is All You Need”, <em>NeurIPS</em>, 2017",
   "T. Dao, D. Y. Fu, S. Ermon, A. Rudra &amp; C. Ré, “FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness”, <em>NeurIPS</em>, 2022"
  ]
 },
 "multi-head-attention": {
  "example": "Llama 2 70B has 64 query heads. If each had its own keys and values, the KV-cache for one 4k-token request would be <strong>10.7 GB</strong>. Grouped-query attention shares them across groups — 8 KV heads — for <strong>1.34 GB</strong>; a single shared KV head (MQA) would need <strong>0.17 GB</strong>. Fewer KV heads mean more requests per GPU, at a small cost in quality.",
  "fails": [
   "Not every head matters: many can be pruned after training with little loss (Michel, Levy &amp; Neubig 2019), so head count is not a measure of capability.",
   "Stories about what a head “does” come from a few probes; most heads are hard to interpret.",
   "Converting a trained multi-head model to GQA needs some extra training (“uptraining”)."
  ],
  "code": "layers, d_k, bytes_per, ctx = 80, 128, 2, 4_096      # Llama-2-70B shapes, fp16, 4k context\ndef kv_gb(kv_heads):\n    return 2 * layers * kv_heads * d_k * bytes_per * ctx / 1e9   # K and V, every layer, every token\nmha, gqa, mqa = kv_gb(64), kv_gb(8), kv_gb(1)         # 64 query heads; 64, 8 or 1 KV heads",
  "sources": [
   "N. Shazeer, “Fast Transformer Decoding: One Write-Head Is All You Need”, arXiv:1911.02150, 2019",
   "J. Ainslie et al., “GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints”, <em>EMNLP</em>, 2023",
   "P. Michel, O. Levy &amp; G. Neubig, “Are Sixteen Heads Really Better than One?”, <em>NeurIPS</em>, 2019"
  ]
 },
 "feed-forward": {
  "example": "With d = 4,096, a classic feed-forward layer with a 4d hidden size has <strong>134,217,728</strong> parameters. SwiGLU uses three matrices instead of two, so it shrinks the hidden size to two thirds of 4d to keep the count equal: <strong>134,221,824</strong>. LLaMA rounds that hidden size to 11,008 for hardware efficiency, giving <strong>135,266,304</strong>.",
  "fails": [
   "Gated variants win in experiments, but the explanation is thin; Shazeer (2020) attributes the success to “divine benevolence”.",
   "Most of a dense model’s parameters sit here, and so does much of its factual recall (Geva et al. 2021) — which is why editing a fact can have side-effects.",
   "Feed-forward size and depth trade off; parameter count alone does not say which shape is better."
  ],
  "code": "d = 4_096\nclassic = 2 * d * (4 * d)                       # W1 and W2 with a 4d hidden layer\nswiglu_ideal = 3 * d * round(2 / 3 * 4 * d)     # three matrices at 2/3 of 4d keep the count equal\nswiglu_llama = 3 * d * 11_008                   # LLaMA-7B rounds the hidden size to 11,008",
  "sources": [
   "N. Shazeer, “GLU Variants Improve Transformer”, arXiv:2002.05202, 2020",
   "M. Geva, R. Schuster, J. Berant &amp; O. Levy, “Transformer Feed-Forward Layers Are Key-Value Memories”, <em>EMNLP</em>, 2021",
   "H. Touvron et al., “LLaMA: Open and Efficient Foundation Language Models”, arXiv:2302.13971, 2023"
  ]
 },
 "transformer-block": {
  "example": "Counting one block of Llama 2 70B: attention <strong>151.0M</strong> parameters (grouped keys and values make it lighter), the SwiGLU feed-forward <strong>704.6M</strong>, two norms almost nothing — <strong>855.7M</strong> per block. Eighty blocks plus the two embedding tables give <strong>68,976,648,192</strong>: the “70B”. Four fifths of each block is the feed-forward layer.",
  "fails": [
   "Parameter count is not compute per token for mixture-of-experts models, where only some blocks’ experts run.",
   "Pre-norm trains more stably than post-norm (Xiong et al. 2020), but very deep pre-norm models can under-use their later layers.",
   "The “residual stream” picture is a useful lens for interpretability, not a description of what each layer does."
  ],
  "code": "d, kv_dim, ff, layers, vocab = 8_192, 1_024, 28_672, 80, 32_000   # Llama-2-70B\nattn = d * d + 2 * d * kv_dim + d * d          # Q, K and V (grouped), output\nffn = 3 * d * ff                                # SwiGLU\nblock = attn + ffn + 2 * d                      # + two RMSNorm scales\ntotal = layers * block + 2 * vocab * d + d      # + input and output embeddings, final norm",
  "sources": [
   "H. Touvron et al., “Llama 2: Open Foundation and Fine-Tuned Chat Models”, arXiv:2307.09288, 2023",
   "R. Xiong et al., “On Layer Normalization in the Transformer Architecture”, <em>ICML</em>, 2020",
   "N. Elhage et al., “A Mathematical Framework for Transformer Circuits”, Anthropic, transformer-circuits.pub, 2021"
  ]
 },
 "decoder-only": {
  "example": "A decoder-only model scores a sequence as a product of next-token probabilities. Four tokens with probabilities 0.5, 0.3, 0.9 and 0.2 have a log-probability of <strong>−3.61</strong>: the sequence as a whole has probability <strong>0.027</strong>, and long texts become astronomically unlikely. The causal mask lets each token see only what came before — <strong>50%</strong> of the full attention pairs for 1,000 tokens.",
  "fails": [
   "Low probability is not low quality: long, specific, correct answers are always improbable sequences.",
   "Left-to-right generation cannot revise what it already wrote, which is why planning and self-correction need extra steps.",
   "Encoder-decoder models remain competitive for some tasks (translation, structured outputs) at smaller scales."
  ],
  "code": "p = np.array([0.5, 0.3, 0.9, 0.2])              # P(token_t | everything before it)\nlogp = np.log(p).sum()\nseq_prob = np.exp(logp)\nn = 1_000\npairs_causal, pairs_full = n * (n + 1) // 2, n * n   # attention pairs with and without the causal mask",
  "sources": [
   "A. Radford, K. Narasimhan, T. Salimans &amp; I. Sutskever, “Improving Language Understanding by Generative Pre-Training”, OpenAI, 2018",
   "T. Brown et al., “Language Models Are Few-Shot Learners”, <em>NeurIPS</em>, 2020",
   "T. Wang et al., “What Language Model Architecture and Pretraining Objective Work Best for Zero-Shot Generalization?”, <em>ICML</em>, 2022"
  ]
 },
 "kv-cache": {
  "example": "Generating 1,000 tokens without a cache recomputes keys and values for the whole prefix at every step: <strong>500×</strong> as many projections as with one. The cache has a price: for Llama 3 8B it is <strong>128 KB</strong> per token, so a 128k-token context holds <strong>16 GB</strong> of cache — as much as the model’s own weights in fp16.",
  "fails": [
   "The cache trades compute for memory; on long contexts memory, not arithmetic, limits how many users a GPU can serve.",
   "Reusing cache across requests (prefix caching) only works when the prefix is byte-identical.",
   "Compressing or evicting cache entries saves memory but can silently drop information the model needed."
  ],
  "code": "T = 1_000                                       # tokens generated\nrecompute = T * (T + 1) // 2                    # K/V projections without a cache: the whole prefix every step\ncached = T                                      # with a cache: one new token per step\nlayers, kv_heads, d_k, bytes_per = 32, 8, 128, 2   # Llama-3-8B shapes, fp16\nper_token_kb = 2 * layers * kv_heads * d_k * bytes_per / 1024\nat_128k_gb = per_token_kb * 131_072 / 1024 ** 2",
  "sources": [
   "R. Pope et al., “Efficiently Scaling Transformer Inference”, <em>Proceedings of Machine Learning and Systems</em> 5, 2023",
   "N. Shazeer, “Fast Transformer Decoding: One Write-Head Is All You Need”, arXiv:1911.02150, 2019",
   "W. Kwon et al., “Efficient Memory Management for Large Language Model Serving with PagedAttention”, <em>SOSP</em>, 2023"
  ]
 },
 "context-windows": {
  "example": "Going from a 4k to a 128k window means <strong>32×</strong> as many tokens: the KV-cache grows <strong>32×</strong>, and the attention scores <strong>1,024×</strong>. Extending a 4k-trained model with RoPE interpolation scales positions by the same factor of <strong>32</strong>. A long window is expensive, and the cost grows faster than the length.",
  "fails": [
   "Fitting text in the window is not the same as using it: accuracy drops for information in the middle of long contexts (Liu et al. 2024).",
   "Advertised window sizes are often tested with simple “needle” retrieval; reasoning across many parts of a long document is much harder.",
   "Long prompts raise cost and latency on every call; retrieval of a few relevant passages is often better."
  ],
  "code": "short, long = 4_096, 131_072\ntokens = long / short\nattention_work = tokens ** 2                   # score matrix grows with n^2\nkv_memory = tokens                             # the cache grows with n\nrope_scale = long / short                      # position interpolation factor",
  "sources": [
   "N. F. Liu et al., “Lost in the Middle: How Language Models Use Long Contexts”, <em>Transactions of the ACL</em> 12, 2024",
   "B. Peng, J. Quesnelle, H. Fan &amp; E. Shippole, “YaRN: Efficient Context Window Extension of Large Language Models”, <em>ICLR</em>, 2024",
   "A. Q. Jiang et al., “Mistral 7B”, arXiv:2310.06825, 2023 — sliding-window attention"
  ]
 },
 "mixture-of-experts": {
  "example": "Mixtral 8×7B has <strong>46.7B</strong> parameters but uses <strong>12.9B</strong> per token. Solving the two equations gives about <strong>5.63B</strong> per expert and <strong>1.63B</strong> shared (attention, embeddings). With 8 experts and top-2 routing, each expert should see <strong>25%</strong> of tokens; keeping it near that is what the load-balancing loss is for.",
  "fails": [
   "Active parameters set compute, but all parameters must sit in memory; MoE saves FLOPs, not GPU memory.",
   "“8×7B” is not 56B: the experts share attention and embeddings.",
   "Routing can collapse onto a few experts, and experts do not specialise into neat human topics."
  ],
  "code": "total, active, experts, top_k = 46.7e9, 12.9e9, 8, 2       # Mixtral 8x7B, published counts\nper_expert = (total - active) / (experts - top_k)           # total = shared + 8E, active = shared + 2E\nshared = active - top_k * per_expert\nshare_per_expert = top_k / experts                          # tokens each expert sees under perfect balance",
  "sources": [
   "N. Shazeer et al., “Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer”, <em>ICLR</em>, 2017",
   "W. Fedus, B. Zoph &amp; N. Shazeer, “Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity”, <em>Journal of Machine Learning Research</em> 23(120), 2022",
   "A. Q. Jiang et al., “Mixtral of Experts”, arXiv:2401.04088, 2024"
  ]
 },
 "scaling-laws": {
  "example": "With 10²⁴ training FLOPs and Chinchilla’s rule of about 20 tokens per parameter, C = 6ND gives a model of <strong>91B</strong> parameters trained on <strong>1.8T</strong> tokens. Llama 3 8B was trained on about 15T tokens: <strong>1,875</strong> per parameter, <strong>94×</strong> the Chinchilla ratio. Chinchilla optimises training compute; models that will be served billions of times are deliberately “over-trained” to be cheap to run.",
  "fails": [
   "Scaling laws predict loss, not specific abilities; some skills appear abruptly or not at all at a given scale.",
   "Fitted exponents depend on data, architecture and the range of sizes fitted; extrapolating far beyond it is a bet.",
   "Accounting for inference changes the optimum (Sardana &amp; Frankle 2024)."
  ],
  "code": "C = 1e24                                        # training FLOPs budget\nN = (C / (6 * 20)) ** 0.5                       # Chinchilla: C = 6ND with D = 20N\nD = 20 * N\nllama3_8b_ratio = 15e12 / 8e9                   # tokens per parameter: Llama 3 8B, ~15T tokens",
  "sources": [
   "J. Kaplan et al., “Scaling Laws for Neural Language Models”, arXiv:2001.08361, 2020",
   "J. Hoffmann et al., “Training Compute-Optimal Large Language Models”, <em>NeurIPS</em>, 2022",
   "N. Sardana &amp; J. Frankle, “Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws”, <em>ICML</em>, 2024"
  ]
 },
 "pre-training": {
  "example": "A held-out loss of 2.0 nats per token is a perplexity of <strong>7.39</strong>: as uncertain, on average, as choosing among seven equally likely tokens. Training an 8B model on 15T tokens takes about 6 × N × D = <strong>7.2×10²³</strong> FLOPs. At 40% of an H100’s peak that is about <strong>506,000</strong> GPU-hours — before failed runs, restarts and experiments.",
  "fails": [
   "Perplexity is comparable only between models with the same tokenizer and evaluation text.",
   "Lower pre-training loss does not guarantee better behaviour after fine-tuning, though the two are usually related.",
   "Achieved utilisation is often well below 40%; the cost estimate is a floor."
  ],
  "code": "loss = 2.0                                       # nats per token on held-out text\nperplexity = np.exp(loss)\nflops = 6 * 8e9 * 15e12                         # 8B parameters, 15T tokens\ngpu_flops = 989e12 * 0.40                       # an H100's dense bf16 peak at 40% utilisation\ngpu_hours = flops / gpu_flops / 3600",
  "sources": [
   "A. Radford, J. Wu, R. Child, D. Luan, D. Amodei &amp; I. Sutskever, “Language Models Are Unsupervised Multitask Learners”, OpenAI, 2019",
   "T. Brown et al., “Language Models Are Few-Shot Learners”, <em>NeurIPS</em>, 2020",
   "A. Chowdhery et al., “PaLM: Scaling Language Modeling with Pathways”, <em>Journal of Machine Learning Research</em> 24(240), 2023 — model FLOPs utilisation"
  ]
 },
 "fine-tuning": {
  "example": "50,000 instruction examples of about 500 tokens are <strong>25M</strong> tokens — <strong>0.0002%</strong> of a 15T-token pre-training run. LIMA got a strong assistant from just <strong>1,000</strong> carefully chosen examples. Fine-tuning mostly teaches format and behaviour; the knowledge comes from pre-training.",
  "fails": [
   "Fine-tuning on facts the model does not already know can increase hallucination rather than teach the facts.",
   "Aggressive fine-tuning erodes general abilities (catastrophic forgetting); low learning rates and mixing in general data help.",
   "Small, curated datasets outperform large, noisy ones; quality matters more than count."
  ],
  "code": "sft_tokens = 50_000 * 500                       # 50k examples of ~500 tokens\npretrain_tokens = 15e12\nshare = sft_tokens / pretrain_tokens\nlima_examples = 1_000                           # the LIMA paper's whole SFT set",
  "sources": [
   "L. Ouyang et al., “Training Language Models to Follow Instructions with Human Feedback”, <em>NeurIPS</em>, 2022",
   "C. Zhou et al., “LIMA: Less Is More for Alignment”, <em>NeurIPS</em>, 2023",
   "Y. Luo et al., “An Empirical Study of Catastrophic Forgetting in Large Language Models During Continual Fine-tuning”, arXiv:2308.08747, 2023"
  ]
 },
 "lora-qlora": {
  "example": "Full fine-tuning of a 65B model with Adam needs about 16 bytes per parameter — fp16 weights and gradients, an fp32 master copy and two Adam moments — about <strong>1,040 GB</strong>. QLoRA freezes the weights at 4 bits (<strong>32.5 GB</strong>) and trains rank-64 adapters on four projections in 80 layers: <strong>336M</strong> parameters, about <strong>5.4 GB</strong> with their optimizer state. That is how a 65B model fits on a single 48 GB GPU.",
  "fails": [
   "Activations and the KV-cache also need memory; long sequences can still overflow a GPU that holds the weights.",
   "Low-rank updates are a constraint; tasks far from the base model may need higher rank or full fine-tuning.",
   "Quantization error in the frozen base adds noise the adapters must work around."
  ],
  "code": "params = 65e9\nfull_adam = params * (2 + 2 + 4 + 4 + 4) / 1e9   # fp16 weights + grads, fp32 master copy + Adam m and v\nqlora_base = params * 0.5 / 1e9                   # 4-bit frozen weights\nadapters = 2 * 8_192 * 64 * 4 * 80                 # rank-64 adapters on 4 projections in 80 layers\nqlora_adapters = adapters * (2 + 2 + 4 + 4 + 4) / 1e9",
  "sources": [
   "E. J. Hu et al., “LoRA: Low-Rank Adaptation of Large Language Models”, <em>ICLR</em>, 2022",
   "T. Dettmers, A. Pagnoni, A. Holtzman &amp; L. Zettlemoyer, “QLoRA: Efficient Finetuning of Quantized LLMs”, <em>NeurIPS</em>, 2023",
   "S. Rajbhandari, J. Rasley, O. Ruwase &amp; Y. He, “ZeRO: Memory Optimizations Toward Training Trillion Parameter Models”, <em>SC20</em>, 2020 — the 16-bytes-per-parameter accounting"
  ]
 },
 "rlhf": {
  "example": "A reward model that overrates the third answer (4 points against 1 and 2). A modest policy shift has a KL of <strong>0.085</strong> from the reference; collapsing onto the overrated answer has <strong>1.48</strong>. With a weak penalty, β = 0.1, the collapse scores higher (<strong>3.80</strong> against 2.19) — reward hacking. With β = 2 the modest policy wins (<strong>2.03</strong> against 0.98). The KL term is what keeps the model honest to its starting point.",
  "fails": [
   "The reward model is a learned proxy; optimising hard against it eventually exploits its errors (Gao et al. 2023).",
   "β is a dial between following the reward and staying close to the reference; there is no principled value.",
   "Human raters reward confident, longer answers; RLHF can amplify that."
  ],
  "code": "ref = np.array([0.5, 0.3, 0.2])                 # reference policy over three answers\nreward = np.array([1.0, 2.0, 4.0])              # the reward model's scores (the third one it overrates)\nkl = lambda p: np.sum(p * np.log(p / ref))\nobjective = lambda p, beta: p @ reward - beta * kl(p)\nmodest, hacked = np.array([0.3, 0.45, 0.25]), np.array([0.01, 0.01, 0.98])\nresult = {beta: (round(objective(modest, beta), 3), round(objective(hacked, beta), 3)) for beta in (0.1, 2.0)}",
  "sources": [
   "P. F. Christiano et al., “Deep Reinforcement Learning from Human Preferences”, <em>NeurIPS</em>, 2017",
   "N. Stiennon et al., “Learning to Summarize from Human Feedback”, <em>NeurIPS</em>, 2020",
   "L. Ouyang et al., “Training Language Models to Follow Instructions with Human Feedback”, <em>NeurIPS</em>, 2022",
   "L. Gao, J. Schulman &amp; J. Hilton, “Scaling Laws for Reward Model Overoptimization”, <em>ICML</em>, 2023"
  ]
 },
 "dpo": {
  "example": "Relative to the reference model, the chosen answer’s log-probability rises by 2 and the rejected one’s falls by 3: with β = 0.1 the DPO loss is <strong>0.474</strong>. If instead the chosen answer <em>falls</em> by 2 while the rejected falls by 6, the loss is <strong>0.513</strong> — still lower than at the start (0.693). DPO rewards the gap, so it can push down the probability of the very answers it prefers.",
  "fails": [
   "Falling likelihood of preferred answers is a known failure mode (Pal et al. 2024); monitor the chosen log-probabilities, not just the loss.",
   "DPO assumes the Bradley–Terry preference model; with noisy or deterministic preferences it can overfit (Azar et al. 2024).",
   "Offline preference data goes stale as the model changes; iterative or online variants address this."
  ],
  "code": "sigmoid = lambda z: 1 / (1 + np.exp(-z))\nbeta = 0.1\nchosen = (-10.0) - (-12.0)                      # log pi(y_w) - log pi_ref(y_w): the chosen answer gained 2 nats\nrejected = (-14.0) - (-11.0)                    # the rejected answer lost 3\nloss = -np.log(sigmoid(beta * (chosen - rejected)))\nboth_down = -np.log(sigmoid(beta * ((-2.0) - (-6.0))))   # chosen also falls, by 2; rejected by 6",
  "sources": [
   "R. Rafailov et al., “Direct Preference Optimization: Your Language Model Is Secretly a Reward Model”, <em>NeurIPS</em>, 2023",
   "M. G. Azar et al., “A General Theoretical Paradigm to Understand Learning from Human Preferences”, <em>AISTATS</em>, 2024",
   "A. Pal et al., “Smaug: Fixing Failure Modes of Preference Optimisation with DPO-Positive”, arXiv:2402.13228, 2024"
  ]
 },
 "data-curation": {
  "example": "Two sentences that differ in two words share <strong>0.817</strong> of their five-character shingles (Jaccard). MinHash estimates this from 256 hash minima as <strong>0.785</strong>, without comparing the texts directly — which is how near-duplicates are found among billions of web pages. Removing them makes models better and less prone to memorising (Lee et al. 2022).",
  "fails": [
   "A threshold that removes boilerplate can also remove legitimately similar documents (laws, templates, code).",
   "Quality filters trained on “good” reference text encode its tastes and can under-represent dialects and topics.",
   "Deduplication against benchmarks (decontamination) needs fuzzy matching; exact matching misses paraphrased test items."
  ],
  "code": "import zlib\ndef shingles(text, k=5):\n    t = text.lower()\n    return {t[i:i + k] for i in range(len(t) - k + 1)}\n\na = 'The quick brown fox jumps over the lazy dog near the river bank today.'\nb = 'The quick brown fox jumped over the lazy dog near the river bank today!'\nA, B = shingles(a), shingles(b)\njaccard = len(A &amp; B) / len(A | B)\n\nrng = np.random.default_rng(0)\ncoef = rng.integers(1, 2**31 - 1, size=(256, 2))       # 256 random hash functions\nh = lambda s: np.array([zlib.crc32(x.encode()) for x in s], dtype=np.int64)\nminhash = lambda s: ((coef[:, :1] * h(s) + coef[:, 1:]) % (2**31 - 1)).min(axis=1)\nestimate = (minhash(A) == minhash(B)).mean()            # the share of equal minima estimates Jaccard",
  "sources": [
   "A. Z. Broder, “On the Resemblance and Containment of Documents”, <em>Compression and Complexity of Sequences</em>, 1997",
   "K. Lee et al., “Deduplicating Training Data Makes Language Models Better”, <em>ACL</em>, 2022",
   "G. Penedo et al., “The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale”, <em>NeurIPS Datasets and Benchmarks</em>, 2024"
  ]
 },
 "decoding-strategies": {
  "example": "A two-step choice. Greedy decoding takes A (0.6) and then the best continuation of A (0.4): a sequence probability of <strong>0.24</strong>. B starts less likely (0.4) but continues with 0.9, for <strong>0.36</strong>. A beam of width 2 keeps both first steps and finds B–x. Greedy commits too early; beam search looks a little further.",
  "fails": [
   "The most probable text is often bland or repetitive; for open-ended generation, maximising probability is the wrong goal (Holtzman et al. 2020).",
   "Wider beams can make translation <em>worse</em> beyond small widths (the beam search curse).",
   "Deterministic decoding still varies across hardware and batch sizes because of floating-point non-determinism."
  ],
  "code": "step1 = {'A': 0.6, 'B': 0.4}\nstep2 = {'A': {'x': 0.4, 'y': 0.35, 'z': 0.25}, 'B': {'x': 0.9, 'y': 0.05, 'z': 0.05}}\ngreedy_first = max(step1, key=step1.get)\ngreedy_best = max(step2[greedy_first].values())\ngreedy = (greedy_first, step1[greedy_first] * greedy_best)\nbeam = max((((a, b), step1[a] * pb) for a in step1 for b, pb in step2[a].items()), key=lambda c: c[1])   # width 2 keeps both first steps",
  "sources": [
   "A. Holtzman, J. Buys, L. Du, M. Forbes &amp; Y. Choi, “The Curious Case of Neural Text Degeneration”, <em>ICLR</em>, 2020",
   "C. Meister, R. Cotterell &amp; T. Vieira, “If Beam Search Is the Answer, What Was the Question?”, <em>EMNLP</em>, 2020",
   "M. Freitag &amp; Y. Al-Onaizan, “Beam Search Strategies for Neural Machine Translation”, <em>Workshop on Neural Machine Translation</em>, 2017"
  ]
 },
 "sampling": {
  "example": "Eight candidate tokens. At temperature 0.7 the distribution has <strong>1.69</strong> bits of entropy and top-p = 0.9 keeps <strong>3</strong> tokens; at 1.0, <strong>2.07</strong> bits and <strong>4</strong> tokens; at 1.3, <strong>2.33</strong> bits and <strong>5</strong>. Temperature changes how flat the distribution is, and nucleus sampling adapts how many tokens survive to that shape.",
  "fails": [
   "High temperature adds diversity and errors together; for factual or code tasks, low temperature is usually better.",
   "Fixed top-k ignores the shape of the distribution; top-p and min-p adapt, but all are heuristics tuned by eye.",
   "Sampling settings interact: temperature applied before or after truncation gives different results."
  ],
  "code": "logits = np.array([3.0, 2.5, 2.0, 1.0, 0.5, 0.0, -1.0, -2.0])\n\ndef probs(T):\n    z = np.exp((logits - logits.max()) / T); return z / z.sum()\n\ndef nucleus_size(p, top_p=0.9):\n    return int(np.searchsorted(np.cumsum(np.sort(p)[::-1]), top_p) + 1)\n\nentropy = lambda p: -(p * np.log2(p)).sum()\ntable = {T: (round(entropy(probs(T)), 2), nucleus_size(probs(T))) for T in (0.7, 1.0, 1.3)}",
  "sources": [
   "A. Holtzman, J. Buys, L. Du, M. Forbes &amp; Y. Choi, “The Curious Case of Neural Text Degeneration”, <em>ICLR</em>, 2020",
   "A. Fan, M. Lewis &amp; Y. Dauphin, “Hierarchical Neural Story Generation”, <em>ACL</em>, 2018 — top-k sampling",
   "M. N. Nguyen et al., “Turning Up the Heat: Min-p Sampling for Creative and Coherent LLM Outputs”, arXiv:2407.01082, 2024"
  ]
 },
 "speculative-decoding": {
  "example": "A draft model proposes 4 tokens and the large model checks them in one pass. If each draft token is accepted with probability α, the expected tokens per large-model pass is (1 − α⁵)/(1 − α): <strong>2.31</strong> at α = 0.6, <strong>3.36</strong> at 0.8 and <strong>4.10</strong> at 0.9. The output distribution is exactly the large model’s; only the speed changes.",
  "fails": [
   "The speed-up is in passes, not wall-clock; the draft model’s own cost and a larger batch can eat it.",
   "Acceptance rates vary by task: code and boilerplate accept well, creative text poorly.",
   "Under heavy batching the large model is already compute-bound, and speculation helps much less."
  ],
  "code": "def tokens_per_pass(alpha, gamma=4):            # Leviathan et al.: expected tokens per target-model pass\n    return (1 - alpha ** (gamma + 1)) / (1 - alpha)\n\ntable = {a: round(tokens_per_pass(a), 2) for a in (0.6, 0.8, 0.9)}",
  "sources": [
   "Y. Leviathan, M. Kalman &amp; Y. Matias, “Fast Inference from Transformers via Speculative Decoding”, <em>ICML</em>, 2023",
   "C. Chen et al., “Accelerating Large Language Model Decoding with Speculative Sampling”, arXiv:2302.01318, 2023"
  ]
 },
 "quantization": {
  "example": "A 70B model needs <strong>140 GB</strong> in fp16, <strong>70 GB</strong> in int8 and <strong>35 GB</strong> in int4. How it is quantized matters as much as the bit width: with a few outlier weights, one int4 scale for the whole tensor gives an average error of <strong>87%</strong> of a weight’s size; a separate scale per group of 128 weights cuts it to <strong>30%</strong>. Group-wise scales are why 4-bit models work.",
  "fails": [
   "Average reconstruction error is not task quality; evaluate on the tasks you care about, including long-context and maths, which degrade first.",
   "Weight-only quantization saves memory and bandwidth; it speeds up compute-bound batches much less.",
   "Below 4 bits quality usually falls quickly (Dettmers &amp; Zettlemoyer 2023)."
  ],
  "code": "sizes = {bits: 70e9 * bits / 8 / 1e9 for bits in (16, 8, 4)}   # a 70B model, GB\nrng = np.random.default_rng(1)\nw = rng.normal(0, 0.02, 4_096)\nw[::512] = 0.5                                    # a few outlier weights\n\ndef int4_error(w, group):\n    g = w.reshape(-1, group)\n    scale = np.abs(g).max(axis=1, keepdims=True) / 7\n    return np.abs(np.clip(np.round(g / scale), -7, 7) * scale - g).mean() / np.abs(w).mean()\n\nper_tensor, per_group = int4_error(w, 4_096), int4_error(w, 128)",
  "sources": [
   "E. Frantar, S. Ashkboos, T. Hoefler &amp; D. Alistarh, “GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers”, <em>ICLR</em>, 2023",
   "J. Lin et al., “AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration”, <em>Proceedings of Machine Learning and Systems</em> 6, 2024",
   "T. Dettmers &amp; L. Zettlemoyer, “The Case for 4-bit Precision: k-bit Inference Scaling Laws”, <em>ICML</em>, 2023"
  ]
 },
 "kv-cache-opt": {
  "example": "64 live requests whose lengths vary around 400 tokens hold <strong>36,363</strong> tokens of cache. Reserving a buffer for the 4,096-token maximum per request uses only <strong>13.9%</strong> of the reserved memory; allocating 16-token pages as needed uses <strong>98.6%</strong>. That difference is how PagedAttention fits several times more requests on the same GPU.",
  "fails": [
   "Paging removes fragmentation, not the cache itself; long contexts still need the memory.",
   "Evicting or compressing cache entries to save memory can drop information the model needed later.",
   "Prefix sharing only helps when many requests start with exactly the same tokens."
  ],
  "code": "rng = np.random.default_rng(2)\nlengths = np.clip(rng.lognormal(np.log(400), 0.8, 64).astype(int), 16, 4_096)   # 64 live requests\nreserved_contiguous = 64 * 4_096                         # a buffer for the maximum length each\nreserved_paged = (np.ceil(lengths / 16) * 16).sum()      # 16-token blocks, allocated as needed\nused = lengths.sum()\nutil = (used / reserved_contiguous, used / reserved_paged)",
  "sources": [
   "W. Kwon et al., “Efficient Memory Management for Large Language Model Serving with PagedAttention”, <em>SOSP</em>, 2023",
   "L. Zheng et al., “SGLang: Efficient Execution of Structured Language Model Programs”, arXiv:2312.07104, 2024 — prefix caching"
  ]
 },
 "batching": {
  "example": "25 batches of 8 requests with output lengths between 20 and 600 tokens. With static batching each batch runs until its longest request finishes, and on average only <strong>59%</strong> of the slots are doing useful work. Continuous batching refills a slot as soon as a request ends, approaching <strong>100%</strong>.",
  "fails": [
   "Higher throughput can mean worse latency for each user; batch size is a trade-off, not a free gain.",
   "Prefill (reading the prompt) and decode compete for the same GPU; long prompts stall everyone’s generation unless the two are separated.",
   "Benchmarks with uniform request lengths overstate real throughput."
  ],
  "code": "rng = np.random.default_rng(3)\nout = rng.integers(20, 600, size=(25, 8))              # output lengths: 25 batches of 8 requests\nstatic_util = (out.sum(1) / (8 * out.max(1))).mean()    # each batch runs until its longest request ends\ncontinuous_util = 1.0                                   # finished slots refilled at once (the ideal)",
  "sources": [
   "G.-I. Yu, J. S. Jeong, G.-W. Kim, S. Kim &amp; B.-G. Chun, “Orca: A Distributed Serving System for Transformer-Based Generative Models”, <em>OSDI</em>, 2022",
   "W. Kwon et al., “Efficient Memory Management for Large Language Model Serving with PagedAttention”, <em>SOSP</em>, 2023",
   "Y. Zhong et al., “DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving”, <em>OSDI</em>, 2024"
  ]
 },
 "prompt-engineering": {
  "example": "If a single answer is right 60% of the time and samples were independent, a majority vote over 5 samples would be right <strong>68.3%</strong> of the time and over 15 samples <strong>78.7%</strong>. That is the idea behind self-consistency. In practice samples share their mistakes, so the real gain is smaller — but the direction holds.",
  "fails": [
   "Results are sensitive to small formatting changes — spacing, separators, option order — sometimes by many points (Sclar et al. 2024).",
   "A prompt tuned on one model version often does not transfer to the next.",
   "Prompt tweaks evaluated on a handful of examples are a garden of forking paths; test on a held-out set."
  ],
  "code": "from math import comb\ndef majority(p, n):                               # independent samples, binary right/wrong\n    return sum(comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))\nvotes = {n: round(majority(0.6, n), 3) for n in (1, 5, 15)}",
  "sources": [
   "J. Wei et al., “Chain-of-Thought Prompting Elicits Reasoning in Large Language Models”, <em>NeurIPS</em>, 2022",
   "X. Wang et al., “Self-Consistency Improves Chain of Thought Reasoning in Language Models”, <em>ICLR</em>, 2023",
   "M. Sclar, Y. Choi, Y. Tsvetkov &amp; A. Suhr, “Quantifying Language Models’ Sensitivity to Spurious Features in Prompt Design”, <em>ICLR</em>, 2024"
  ]
 },
 "rag": {
  "example": "A fact that spans 100 tokens, in a document cut into 512-token chunks. With no overlap, <strong>19.3%</strong> of such facts are split across two chunks, so no single retrieved chunk contains them. With 64 tokens of overlap, <strong>7.8%</strong>; with 128 — more than the fact’s length — <strong>none</strong>. Chunking decides what can be retrieved before any embedding model is involved.",
  "fails": [
   "Retrieval failures look like model failures: if the right passage is not retrieved, the answer cannot be grounded (Barnett et al. 2024 list seven such failure points).",
   "Retrieved text placed in the middle of a long prompt is used less (Liu et al. 2024).",
   "RAG reduces hallucination but does not remove it; the model can still ignore or misread the sources."
  ],
  "code": "rng = np.random.default_rng(4)\ndef split_rate(chunk, overlap, span=100, doc=100_000, trials=20_000):\n    step = chunk - overlap\n    starts = rng.integers(0, doc - span, trials)          # where the fact begins\n    k = starts // step                                    # the last chunk to start before the fact\n    ok = starts + span &lt;= k * step + chunk                # does it reach the fact's end?\n    return 1 - ok.mean()\nrates = {(c, o): round(split_rate(c, o), 3) for c, o in [(512, 0), (512, 64), (512, 128)]}",
  "sources": [
   "P. Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”, <em>NeurIPS</em>, 2020",
   "S. Barnett et al., “Seven Failure Points When Engineering a Retrieval Augmented Generation System”, arXiv:2401.05856, 2024",
   "N. F. Liu et al., “Lost in the Middle: How Language Models Use Long Contexts”, <em>Transactions of the ACL</em> 12, 2024"
  ]
 },
 "embedding-search": {
  "example": "A million 768-dimensional float32 embeddings take <strong>3.1 GB</strong>, and a brute-force query costs <strong>7.7×10⁸</strong> multiply-adds. Product quantization to 64 one-byte codes per vector stores the same index in <strong>0.064 GB</strong>. And in 768 dimensions unrelated vectors are nearly perpendicular — a mean absolute cosine of <strong>0.029</strong> — so “similar” scores need calibrating on real pairs.",
  "fails": [
   "Approximate indexes trade recall for speed; measure recall against exact search on your data.",
   "Embedding similarity is topical, not logical: negations and numbers are often ignored.",
   "Changing the embedding model means re-embedding everything; vectors from two models are not comparable."
  ],
  "code": "n, d = 1_000_000, 768\nmemory_gb = n * d * 4 / 1e9                      # float32\nflops_per_query = n * d                          # brute force: one dot product per stored vector\npq_bytes = n * 64                                # product quantization to 64 one-byte codes\nrng = np.random.default_rng(5)\nX = rng.normal(size=(1_000, d)); X /= np.linalg.norm(X, axis=1, keepdims=True)\ntypical_cos = np.abs(X[:500] @ X[500:].T).mean()   # unrelated random vectors in 768-d",
  "sources": [
   "Y. A. Malkov &amp; D. A. Yashunin, “Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs”, <em>IEEE TPAMI</em> 42(4), 2020",
   "H. Jégou, M. Douze &amp; C. Schmid, “Product Quantization for Nearest Neighbor Search”, <em>IEEE TPAMI</em> 33(1), 2011",
   "J. Johnson, M. Douze &amp; H. Jégou, “Billion-Scale Similarity Search with GPUs”, <em>IEEE Transactions on Big Data</em> 7(3), 2021"
  ]
 },
 "function-calling": {
  "example": "Four tool calls checked against a schema. The first passes. The second is missing the required <code>unit</code> and sends <code>days</code> as a string. The third is not valid JSON (a missing brace). The fourth uses “K”, which is not an allowed unit. Every one of these reaches your code unless you validate — the model proposes a call, your program decides whether to run it.",
  "fails": [
   "Constrained decoding (JSON mode) guarantees valid syntax, not correct arguments.",
   "Tool descriptions are part of the prompt; vague descriptions cause wrong tool choice.",
   "Tool outputs can carry instructions (prompt injection); treat them as data, never as commands."
  ],
  "code": "import json\nschema = {'required': ['city', 'unit'], 'types': {'city': str, 'unit': str, 'days': int},\n          'enum': {'unit': ['celsius', 'fahrenheit']}}\n\ndef check(raw):\n    try: args = json.loads(raw)\n    except json.JSONDecodeError as e: return [f'not JSON: {e.msg}']\n    errs = [f'missing {k}' for k in schema['required'] if k not in args]\n    errs += [f'{k} should be {t.__name__}' for k, t in schema['types'].items() if k in args and not isinstance(args[k], t)]\n    errs += [f'{k} not in {v}' for k, v in schema['enum'].items() if k in args and args[k] not in v]\n    return errs\n\ncalls = ['{\"city\": \"Aarhus\", \"unit\": \"celsius\"}', '{\"city\": \"Aarhus\", \"days\": \"3\"}', '{\"city\": \"Aarhus\", \"unit\": \"kelvin\"', '{\"city\": \"Aarhus\", \"unit\": \"K\"}']\nresults = [check(c) for c in calls]",
  "sources": [
   "T. Schick et al., “Toolformer: Language Models Can Teach Themselves to Use Tools”, <em>NeurIPS</em>, 2023",
   "S. G. Patil, T. Zhang, X. Wang &amp; J. E. Gonzalez, “Gorilla: Large Language Model Connected with Massive APIs”, arXiv:2305.15334, 2023",
   "JSON Schema specification, json-schema.org"
  ]
 },
 "agents": {
  "example": "If each step of an agent is right 95% of the time, a 5-step task succeeds <strong>77%</strong> of the time, 10 steps <strong>60%</strong> and 20 steps <strong>36%</strong>. Checking each step and retrying once on failure lifts 20 steps to <strong>95%</strong>. Reliability compounds, so agents are built around verification, not just more reasoning.",
  "fails": [
   "The retry calculation assumes failures can be detected; silent errors compound unchecked.",
   "Agent benchmarks often ignore cost and over-fit to the benchmark (Kapoor et al. 2024); compare against simple baselines.",
   "Every tool an agent can call widens what can go wrong; give it the least access that works."
  ],
  "code": "chain = {steps: round(0.95 ** steps, 3) for steps in (5, 10, 20)}   # each step right 95% of the time\nretry = round((1 - 0.05 ** 2) ** 20, 3)          # 20 steps, each checked and retried once on failure",
  "sources": [
   "S. Yao et al., “ReAct: Synergizing Reasoning and Acting in Language Models”, <em>ICLR</em>, 2023",
   "N. Shinn et al., “Reflexion: Language Agents with Verbal Reinforcement Learning”, <em>NeurIPS</em>, 2023",
   "S. Kapoor, B. Stroebl, Z. S. Siegel, N. Nadgir &amp; A. Narayanan, “AI Agents That Matter”, arXiv:2407.01502, 2024"
  ]
 },
 "evaluation": {
  "example": "86% accuracy on a 1,000-question benchmark has a 95% margin of about <strong>±2.15</strong> points; on MMLU’s 14,042 test questions, <strong>±0.57</strong>. Two models scoring 86.0 and 87.5 on the 1,000 questions differ by <strong>0.97</strong> standard errors — not distinguishable. Leaderboard gaps of a point or two are often within the noise.",
  "fails": [
   "Both models answer the same questions, so a paired test is more sensitive than this independent one; report it (Miller 2024).",
   "Contamination — test items in the training data — inflates scores in ways no error bar captures.",
   "Benchmarks measure what is easy to score; arena-style human preference captures other things, and has its own biases."
  ],
  "code": "def ci95(acc, n):\n    return 1.96 * np.sqrt(acc * (1 - acc) / n)\n\nsmall = ci95(0.86, 1_000)                       # a 1,000-question benchmark\nmmlu = ci95(0.86, 14_042)                       # MMLU's test set\ngap = 0.875 - 0.86\nse_diff = np.sqrt(2) * small / 1.96             # two independent models on the 1,000 questions\nz = gap / se_diff",
  "sources": [
   "D. Hendrycks et al., “Measuring Massive Multitask Language Understanding”, <em>ICLR</em>, 2021",
   "E. Miller, “Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations”, arXiv:2411.00640, 2024",
   "W.-L. Chiang et al., “Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference”, <em>ICML</em>, 2024"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
/* selfcheck:start — "Check yourself" questions; js/self-check.js renders them. */
const SELF_CHECK = {
 "tokenization": [
  {
   "q": "Why do language models often miscount the letters in a word?",
   "options": [
    "They are trained only on whole words.",
    "They see subword tokens, not individual characters.",
    "Counting needs more parameters than they have."
   ],
   "answer": 1,
   "why": "A word like “strawberry” may be two or three tokens; the letters inside a token are not directly visible to the model."
  },
  {
   "q": "The same sentence in Danish and in English usually costs…",
   "options": [
    "exactly the same number of tokens.",
    "more tokens in Danish, because the tokenizer saw less Danish text when it was built.",
    "fewer tokens in Danish, because Danish words are longer."
   ],
   "answer": 1,
   "why": "BPE merges frequent character sequences. Languages that were rare in its training data split into more, shorter pieces — more cost and less context per sentence."
  },
  {
   "q": "What is the trade-off of a larger vocabulary?",
   "options": [
    "Longer sequences and smaller matrices.",
    "Shorter token sequences, but larger embedding and output matrices.",
    "There is none."
   ],
   "answer": 1,
   "why": "Each extra token type adds a row to the embedding table and a column to the output layer."
  }
 ],
 "kv-cache": [
  {
   "q": "What does the KV cache store?",
   "options": [
    "The model’s weights in compressed form.",
    "The keys and values of earlier tokens in every layer, so they are not recomputed at each generation step.",
    "Previous prompts and their answers."
   ],
   "answer": 1,
   "why": "Without it, generating token n would mean re-running attention over all n − 1 earlier tokens from scratch."
  },
  {
   "q": "KV cache memory grows with…",
   "options": [
    "the vocabulary size.",
    "sequence length × batch size × layers × (number of KV heads × head size).",
    "the number of training tokens."
   ],
   "answer": 1,
   "why": "Long contexts and large batches can make the cache larger than the weights themselves."
  },
  {
   "q": "How does grouped-query attention (GQA) shrink the KV cache?",
   "options": [
    "Several query heads share one set of keys and values.",
    "It stores keys and values at 1 bit.",
    "It drops the oldest tokens."
   ],
   "answer": 0,
   "why": "With 8 KV heads serving 64 query heads, the cache is 8 times smaller than with full multi-head attention."
  }
 ],
 "sampling": [
  {
   "q": "What does temperature 0 (greedy decoding) do?",
   "options": [
    "Picks tokens uniformly at random.",
    "Always picks the most likely next token.",
    "Makes the model refuse to answer."
   ],
   "answer": 1,
   "why": "Greedy decoding is (nearly) deterministic and can fall into repetition loops on long outputs."
  },
  {
   "q": "What does top-p = 0.9 sample from?",
   "options": [
    "The 90 most likely tokens.",
    "The smallest set of tokens whose probabilities add up to at least 0.9.",
    "Any token with probability above 0.9."
   ],
   "answer": 1,
   "why": "The set adapts: one token when the model is sure, many when it is not (Holtzman et al. 2020)."
  },
  {
   "q": "Raising the temperature makes the output…",
   "options": [
    "more varied, and more likely to contain errors.",
    "more accurate.",
    "shorter."
   ],
   "answer": 0,
   "why": "A higher temperature flattens the distribution, giving unlikely tokens more chance — good for brainstorming, bad for facts."
  }
 ],
 "rag": [
  {
   "q": "A RAG system answers wrongly although the right document is in the corpus. What should you check first?",
   "options": [
    "The model’s temperature.",
    "The length of the system prompt.",
    "Whether retrieval returned that document at all."
   ],
   "answer": 2,
   "why": "Measure retrieval recall separately from generation. If the passage never reached the model, no prompt will fix it."
  },
  {
   "q": "What goes wrong when chunks are too large?",
   "options": [
    "Nothing — larger chunks always help.",
    "Each embedding blurs several topics, so retrieval gets less precise and the context fills with irrelevant text.",
    "The model can no longer read the chunk."
   ],
   "answer": 1,
   "why": "Chunk size trades context for precision; test a few sizes on real questions."
  },
  {
   "q": "Does RAG stop hallucination?",
   "options": [
    "It reduces it, but the model can still ignore, misread or go beyond the retrieved text.",
    "Yes, completely.",
    "No — it has no effect on hallucination."
   ],
   "answer": 0,
   "why": "Evaluate faithfulness (is every claim supported by the retrieved passages?) as well as answer accuracy."
  }
 ],
 "scaling-laws": [
  {
   "q": "What did the Chinchilla paper conclude about compute-optimal training?",
   "options": [
    "Model size matters far more than data.",
    "Data matters far more than model size.",
    "Model size and training tokens should grow roughly together — about 20 tokens per parameter."
   ],
   "answer": 2,
   "why": "Hoffmann et al. (2022) found earlier large models were undertrained: a smaller model on more data matched them for the same compute."
  },
  {
   "q": "Loss falls as a power law in compute. What does that imply?",
   "options": [
    "Each constant improvement in loss needs a multiplicative increase in compute.",
    "Doubling compute halves the loss.",
    "Loss stops improving after a fixed budget."
   ],
   "answer": 0,
   "why": "On a log-log plot the curve is a straight line: steady gains require exponentially growing budgets."
  },
  {
   "q": "What do scaling laws predict reliably?",
   "options": [
    "Exactly which benchmarks a model will pass.",
    "Pre-training loss — not when specific abilities will appear on downstream tasks.",
    "How safe the model will be."
   ],
   "answer": 1,
   "why": "Smooth loss curves can hide abrupt-looking jumps on individual tasks, which depend heavily on how the task is scored."
  }
 ],
 "quantization": [
  {
   "q": "Going from 16-bit to 4-bit weights shrinks weight memory to about…",
   "options": [
    "a quarter, plus a little overhead for the scale factors.",
    "half.",
    "a sixteenth."
   ],
   "answer": 0,
   "why": "Four bits instead of sixteen. Group-wise schemes add a scale (and sometimes a zero point) per small block of weights."
  },
  {
   "q": "Why do outlier weights make quantization harder?",
   "options": [
    "Outliers are deleted before quantizing, which changes the model.",
    "They make the model slower.",
    "The scale is set by the largest value, so ordinary weights get only a few levels and lose precision."
   ],
   "answer": 2,
   "why": "Per-group or per-channel scales, and keeping outliers in higher precision, limit the damage."
  },
  {
   "q": "Why does weight-only quantization speed up token-by-token generation?",
   "options": [
    "The model needs fewer generation steps.",
    "Integer arithmetic is always faster than floating point.",
    "Decoding is limited by memory bandwidth, so reading fewer bytes per weight makes each step faster."
   ],
   "answer": 2,
   "why": "At batch size 1 the GPU mostly waits for weights to arrive from memory; smaller weights arrive sooner."
  }
 ],
 "evaluation": [
  {
   "q": "What is benchmark contamination?",
   "options": [
    "A benchmark with wrong answers in it.",
    "Test questions (or close copies) appearing in the training data, which inflates the score.",
    "Running too many benchmarks."
   ],
   "answer": 1,
   "why": "A model that has seen the answers is measuring memory, not ability. Fresh or held-out test sets guard against it."
  },
  {
   "q": "Model A scores 86.0% and model B 86.5% on a 1,000-question benchmark. What can you conclude?",
   "options": [
    "B is better.",
    "A is better, because it is more consistent.",
    "Very little: each score has a standard error of about 1.1 points, larger than the gap."
   ],
   "answer": 2,
   "why": "With n = 1,000 and p ≈ 0.86, the standard error is √(0.86 × 0.14 / 1000) ≈ 0.011. Report intervals, and compare on the same questions."
  },
  {
   "q": "What is a known risk of using an LLM as a judge?",
   "options": [
    "They grade too leniently to separate good models from bad ones.",
    "They always agree with humans.",
    "Judges can favour longer answers, a particular style, or the answer shown first."
   ],
   "answer": 2,
   "why": "Validate the judge against human ratings on a sample, and swap the order of the answers being compared."
  }
 ]
};
function selfCheck(id) {
  return typeof renderSelfCheck === 'function' ? renderSelfCheck('llm/' + id, SELF_CHECK[id]) : '';
}
/* selfcheck:end */
function depthHtml(id) {
  return depthOnly(id) + selfCheck(id);
}
function depthOnly(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, run: 'llm/' + id, codeNote: 'Assumes <code>import numpy as np</code>. Configurations named after real models use their published shapes; other numbers are made up or simulated, as the comments say.' });
}
/* depth:end */

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
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">30</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">30</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> arrow keys to navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-foundations','tokenization')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H8"/><path d="M16 5h1.5A1.5 1.5 0 0 1 19 6.5v11a1.5 1.5 0 0 1-1.5 1.5H16"/><circle cx="10" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="1" fill="currentColor" stroke="none"/></svg></div>
      <div class="cat-card-name">Foundations</div>
      <div class="cat-card-count">6 topics · Tokenization, attention, embeddings</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-architecture','transformer-block')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="4.5" rx="1"/><rect x="5" y="10" width="14" height="4.5" rx="1"/><rect x="5" y="16" width="14" height="4.5" rx="1"/></svg></div>
      <div class="cat-card-name">Architecture</div>
      <div class="cat-card-count">6 topics · Transformer, MoE, scaling laws</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-training','pre-training')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 5c5 1 7.5 5 9 12"/><circle cx="15" cy="17.5" r="2.4"/></svg></div>
      <div class="cat-card-name">Training</div>
      <div class="cat-card-count">6 topics · Pre-training, LoRA, RLHF, DPO</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-inference','decoding-strategies')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2.5 4.5 14 11 14 10 21.5 19.5 10 13 10"/></svg></div>
      <div class="cat-card-name">Inference</div>
      <div class="cat-card-count">6 topics · Sampling, quantization, batching</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-applications','prompt-engineering')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="9" cy="8" r="2.3"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="15" cy="16" r="2.3"/></svg></div>
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
    <span class="topic-badge">BPE · WordPiece · Unigram</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Breaking text into the atomic units a model can process</p>
  <p class="prose">LLMs don't see characters or words — they see <strong>tokens</strong>. A tokenizer maps raw text to integer IDs from a fixed vocabulary. The dominant algorithm is <strong>Byte Pair Encoding (BPE)</strong>: start with individual bytes, iteratively merge the most frequent adjacent pair until the vocabulary reaches the target size (typically 32k–128k).</p>
  <div class="fb"><div class="fm">BPE: Repeat → find most frequent pair (a, b) → merge into ab → until |V| = target</div><div class="fd">Each merge creates a new subword token. Rare words get split into multiple tokens.</div></div>
  <div class="fb"><div class="fm">Compression ratio = bytes / tokens ≈ 3–4× for English</div><div class="fd">A good tokenizer compresses text efficiently — fewer tokens per sentence means more context fits in the window.</div></div>
  <p class="prose"><strong>WordPiece</strong> (BERT) maximizes likelihood instead of frequency. <strong>Unigram</strong> (SentencePiece) starts with a large vocabulary and prunes. <strong>Byte-level BPE</strong> (GPT-2+) operates on UTF-8 bytes, needing no pre-tokenization — handles any language/script.</p>
  <div class="callout">Vocab size is a key tradeoff: larger vocab → fewer tokens per text but bigger embedding table. GPT-4 uses ~100k tokens; LLaMA 2 uses ~32k.</div>
  <div class="va"><div class="vl">Interactive — type text to see BPE tokenization</div><canvas id="tokenCanvas" role="img" aria-label="Tokenization: Interactive — type text to see BPE tokenization" width="700" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Splitting text into subword tokens is <a href="../ml-math/#tokenization">BPE compression</a> — frequent pairs merge, rare words split. In statistics, binning discretizes continuous data.</div>
  ${depthHtml('tokenization')}
  <div class="topic-nav" id="nav-tokenization"></div>
</div>`;
}

/* 02 — Token Embeddings */
function buildEmbeddings() {
  return `<div class="topic" id="embeddings">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Foundations</div><h2>Token <em>Embeddings</em></h2></div>
    <span class="topic-badge">Learned Representations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Mapping discrete token IDs to continuous vector space</p>
  <p class="prose">Each token ID indexes into a <strong>learned embedding table</strong> of shape <code>(vocab_size, d_model)</code>. The result is a dense vector that captures semantic meaning. Similar tokens end up near each other in this space — "king" and "queen" are close, "cat" and "automobile" are far.</p>
  <div class="fb"><div class="fm">E = Embedding(token_id) ∈ ℝ^d_model</div><div class="fd">Simple lookup: row token_id from the embedding matrix. No computation, just indexing.</div></div>
  <div class="fb"><div class="fm">Scaled: E' = E · √d_model</div><div class="fd">Some architectures scale embeddings so their magnitude matches positional encodings.</div></div>
  <p class="prose">Typical dimensions: GPT-2 uses d=768 (small) to d=1600 (XL). LLaMA-70B uses d=8192. The embedding table is often <strong>tied</strong> with the output projection (weight tying), reducing parameter count.</p>
  <div class="callout">For GPT-3 (a 50,257-token vocabulary, d_model = 12,288) the embedding table is about 0.6B parameters — under 0.4% of its 175B. In small models the share is far larger: about 31% in GPT-2 small.</div>
  <div class="va"><div class="vl">Interactive — 2D embedding projection</div><canvas id="embedCanvas" role="img" aria-label="Token Embeddings: Interactive — 2D embedding projection" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Mapping tokens to dense vectors where distance = meaning. <a href="../ml-math/#cosine-sim">Cosine similarity</a> measures the result.</div>
  ${depthHtml('embeddings')}
  <div class="topic-nav" id="nav-embeddings"></div>
</div>`;
}

/* 03 — Positional Encoding */
function buildPositionalEncoding() {
  return `<div class="topic" id="positional-encoding">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Foundations</div><h2>Positional <em>Encoding</em></h2></div>
    <span class="topic-badge">Sinusoidal · RoPE · ALiBi</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Giving transformers a sense of token order</p>
  <p class="prose">Self-attention is <strong>permutation-equivariant</strong> — it treats "the cat sat" identically to "sat cat the" without positional information. We need to inject position somehow.</p>
  <div class="fb"><div class="fm">Sinusoidal: PE(pos,2i) = sin(pos / 10000^(2i/d))  &nbsp;  PE(pos,2i+1) = cos(pos / 10000^(2i/d))</div><div class="fd">Original Transformer (2017). Fixed, not learned. Each dimension has a different frequency.</div></div>
  <div class="fb"><div class="fm">RoPE: q'ₘ = Rθ,m · qₘ    k'ₙ = Rθ,n · kₙ    →  q'ₘᵀk'ₙ depends on (m−n)</div><div class="fd">Rotary Position Embedding. Rotates Q,K vectors — attention depends on relative distance. Used in LLaMA, Mistral.</div></div>
  <div class="fb"><div class="fm">ALiBi: attention(i,j) = qᵢᵀkⱼ − m · |i − j|</div><div class="fd">Attention with Linear Biases. No learned parameters — just subtract a slope × distance. Used in BLOOM.</div></div>
  <p class="prose"><strong>RoPE</strong> dominates modern LLMs because it encodes relative position and can be extrapolated beyond training length via NTK-aware scaling or YaRN.</p>
  <div class="callout">Learned absolute position embeddings (GPT-2) can't extrapolate beyond training length. Relative methods (RoPE, ALiBi) handle longer sequences naturally.</div>
  <div class="va"><div class="vl">Interactive — positional encoding patterns</div><canvas id="posEncCanvas" role="img" aria-label="Positional Encoding: Interactive — positional encoding patterns" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Injecting position via sinusoids so the model knows word order. In markets, <a href="../markets/indicators/#aroon">Aroon</a> encodes "time since" as position information.</div>
  ${depthHtml('positional-encoding')}
  <div class="topic-nav" id="nav-positional-encoding"></div>
</div>`;
}

/* 04 — Self-Attention */
function buildSelfAttention() {
  return `<div class="topic" id="self-attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Foundations</div><h2>Self-<em>Attention</em></h2></div>
    <span class="topic-badge">Scaled Dot-Product</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The mechanism that lets every token look at every other token</p>
  <p class="prose">Self-attention is the <strong>core operation</strong> of transformers. Each token produces a <strong>Query</strong> (what am I looking for?), a <strong>Key</strong> (what do I contain?), and a <strong>Value</strong> (what do I output?). Attention weights are the softmax of query-key dot products.</p>
  <div class="fb"><div class="fm">Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V</div><div class="fd">Scale by √d_k to prevent softmax saturation as dimension grows. Output is a weighted mix of value vectors.</div></div>
  <div class="fb"><div class="fm">Q = XW_Q    K = XW_K    V = XW_V    where W ∈ ℝ^(d_model × d_k)</div><div class="fd">Linear projections from the input. No bias in most modern architectures.</div></div>
  <p class="prose">Complexity is <strong>O(n² · d)</strong> — quadratic in sequence length. This is the fundamental bottleneck that drives context window research. Each attention weight tells you how much token i "pays attention to" token j.</p>
  <div class="callout">The √d_k scaling is crucial. Without it, dot products grow proportionally with dimension, pushing softmax into regions with tiny gradients.</div>
  <div class="va"><div class="vl">Interactive — attention weight heatmap</div><canvas id="selfAttnCanvas" role="img" aria-label="Self-Attention: Interactive — attention weight heatmap" width="700" height="320"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Every token attending to every other token — a complete <a href="../stats/#feature-correlation">correlation matrix</a> computed at each layer. In markets, <a href="../markets/indicators/#vwap">VWAP</a> weights each price by volume — attention over the session.</div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li><strong>O(n²) is the bottleneck:</strong> at 128K tokens one attention matrix has 16 billion entries. FlashAttention avoids storing it by computing attention in tiles, so memory grows linearly with length (Dao et al. 2022)</li>
      <li><strong>FlashAttention-2</strong> roughly doubles FlashAttention’s speed (Dao 2023); PyTorch 2 exposes fused attention kernels through <code>torch.nn.functional.scaled_dot_product_attention</code></li>
      <li>For inference: the KV-cache makes attention O(n) per new token, not O(n²). Cache size = 2 × n_layers × n_kv_heads × d_head × seq_len × bytes per value</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Building or understanding any transformer model. Debugging attention patterns to understand model behavior. Designing custom architectures. Understanding why context length is limited.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Using LLMs via API — attention is handled for you. Working with very long sequences (>100K tokens) where sub-quadratic alternatives (state-space models such as Mamba, or RWKV) may be more efficient.</div>
  </div>
  ${depthHtml('self-attention')}
  <div class="topic-nav" id="nav-self-attention"></div>
</div>`;
}

/* 05 — Multi-Head Attention */
function buildMultiHeadAttention() {
  return `<div class="topic" id="multi-head-attention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Foundations</div><h2>Multi-Head <em>Attention</em></h2></div>
    <span class="topic-badge">MHA · MQA · GQA</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Running multiple attention computations in parallel</p>
  <p class="prose">Instead of one big attention operation, we split into <strong>h heads</strong>, each with dimension d_k = d_model / h. Each head learns different patterns — one might track syntax, another coreference, another positional relationships.</p>
  <div class="fb"><div class="fm">MultiHead(Q,K,V) = Concat(head₁, ..., headₕ) · W_O</div><div class="fd">Run h parallel attention ops with different projections, concat results, project back to d_model.</div></div>
  <div class="fb"><div class="fm">MQA: all heads share K,V — only Q varies per head</div><div class="fd">Multi-Query Attention. Massive KV-cache savings (÷ h). Used in PaLM, Falcon.</div></div>
  <div class="fb"><div class="fm">GQA: groups of heads share K,V — middle ground</div><div class="fd">Grouped-Query Attention. G groups, each with h/G query heads. LLaMA 2 70B uses 8 KV heads for 64 query heads.</div></div>
  <p class="prose">Standard MHA with 32 heads and d_model=4096 → d_k=128 per head. <strong>GQA</strong> is now the default for large models: it trades a tiny quality hit for huge inference speedups via smaller KV caches.</p>
  <div class="va"><div class="vl">Interactive — compare MHA, MQA, GQA head layouts</div><canvas id="mhaCanvas" role="img" aria-label="Multi-Head Attention: Interactive — compare MHA, MQA, GQA head layouts" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Multiple attention heads capture different relationship types in parallel — like running several <a href="../stats/#feature-correlation">correlation analyses</a> simultaneously. In markets, combining <a href="../markets/indicators/#rsi">RSI</a>, <a href="../markets/indicators/#macd">MACD</a>, and volume is multi-headed analysis.</div>
  ${depthHtml('multi-head-attention')}
  <div class="topic-nav" id="nav-multi-head-attention"></div>
</div>`;
}

/* 06 — Feed-Forward Networks */
function buildFeedForward() {
  return `<div class="topic" id="feed-forward">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Foundations</div><h2>Feed-Forward <em>Networks</em></h2></div>
    <span class="topic-badge">SwiGLU · GELU · Expansion</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The per-token MLP after every attention layer</p>
  <p class="prose">After attention mixes information across tokens, the <strong>feed-forward network (FFN)</strong> processes each token independently. It expands to a higher dimension, applies a nonlinearity, and projects back down. Much of the model’s factual recall appears to live here (Geva et al. 2021).</p>
  <div class="fb"><div class="fm">FFN(x) = W₂ · σ(W₁x + b₁) + b₂    where W₁ ∈ ℝ^(d × 4d)</div><div class="fd">Classic design: expand 4×, activate, contract. About 2/3 of transformer parameters live here.</div></div>
  <div class="fb"><div class="fm">SwiGLU(x) = (W₁x ⊙ Swish(W_gate·x)) · W₂    where W₁,W_gate ∈ ℝ^(d × ⅔·4d)</div><div class="fd">Gated variant used in LLaMA, Mistral, Gemma. ⅔ factor keeps parameter count equal to standard 4d expansion.</div></div>
  <p class="prose"><strong>SwiGLU</strong> consistently outperforms ReLU and GELU. The gating mechanism lets the network learn to suppress/amplify features multiplicatively — more expressive than additive bias alone.</p>
  <div class="callout">In Llama 2 70B the feed-forward layers hold about 56B of its 69B parameters. They act as massive key-value memories: keys are W₁ rows, values are W₂ columns.</div>
  <div class="va"><div class="vl">Interactive — activation functions comparison</div><canvas id="ffnCanvas" role="img" aria-label="Feed-Forward Networks: Interactive — activation functions comparison" width="700" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The MLP after attention stores factual knowledge — the model’s memory bank. Like <a href="../ml-math/#activation">activation functions</a> that add non-linearity after linear attention.</div>
  ${depthHtml('feed-forward')}
  <div class="topic-nav" id="nav-feed-forward"></div>
</div>`;
}

/* 07 — Transformer Block */
function buildTransformerBlock() {
  return `<div class="topic" id="transformer-block">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Architecture</div><h2>Transformer <em>Block</em></h2></div>
    <span class="topic-badge">Pre-Norm · Residuals</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The fundamental repeating unit of every LLM</p>
  <p class="prose">A transformer block combines attention and FFN with <strong>residual connections</strong> and <strong>layer normalization</strong>. Modern LLMs use <strong>Pre-Norm</strong> (normalize before each sublayer) rather than Post-Norm, which stabilizes training at scale.</p>
  <div class="fb"><div class="fm">Pre-Norm block:  x → x + Attn(LN(x)) → x + FFN(LN(x))</div><div class="fd">LayerNorm before sublayer, residual after. Gradients flow cleanly through the skip connection.</div></div>
  <div class="fb"><div class="fm">RMSNorm(x) = x / RMS(x) · γ    where RMS(x) = √(mean(x²))</div><div class="fd">Root Mean Square normalization — no mean subtraction. Faster, used in LLaMA, Mistral.</div></div>
  <p class="prose">A 70B model stacks <strong>80 blocks</strong>. Each block adds about 856M parameters (Llama 2 70B). The residual stream acts as a highway — early layers write features, later layers read and refine them. This is the <strong>residual stream</strong> mental model.</p>
  <div class="callout">The residual connection is why deep transformers work at all. Without it, gradients vanish through 80+ layers. With it, there's always a direct path from output to any layer.</div>
  <div class="va"><div class="vl">Interactive — data flow through a transformer block</div><canvas id="tfBlockCanvas" role="img" aria-label="Transformer Block: Interactive — data flow through a transformer block" width="700" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The repeated unit: attention → add+norm → FFN → add+norm. In <a href="../ml-math/#transformer">ML math</a>, the residual connections prevent gradient vanishing.</div>
  ${depthHtml('transformer-block')}
  <div class="topic-nav" id="nav-transformer-block"></div>
</div>`;
}

/* 08 — Decoder-Only Models */
function buildDecoderOnly() {
  return `<div class="topic" id="decoder-only">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Architecture</div><h2>Decoder-Only <em>Models</em></h2></div>
    <span class="topic-badge">GPT · LLaMA · Causal LM</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The dominant architecture behind GPT, LLaMA, Mistral, and most modern LLMs</p>
  <p class="prose">Decoder-only models use <strong>causal (left-to-right) masking</strong> so each token can only attend to itself and previous tokens — never the future. This enables <strong>autoregressive generation</strong>: predict next token, append, repeat.</p>
  <div class="fb"><div class="fm">Causal mask: M_ij = 0 if j ≤ i, else −∞</div><div class="fd">Upper triangle set to −∞ before softmax → zeroes out future attention weights.</div></div>
  <div class="fb"><div class="fm">P(text) = ∏ P(token_t | token_1, ..., token_{t-1})</div><div class="fd">Autoregressive factorization — the probability of text as a product of conditional probabilities.</div></div>
  <p class="prose">Why decoder-only won: (1) simpler than encoder-decoder, (2) scales better with compute, (3) naturally handles both understanding and generation in a single architecture. The "decoder" name comes from the original Transformer paper where this half decoded outputs.</p>
  <div class="callout">GPT, LLaMA, Mistral, Gemma and most other published LLMs are decoder-only. The encoder-decoder style (T5, BART) is now mainly used for specialized tasks like translation.</div>
  <div class="va"><div class="vl">Interactive — causal mask & autoregressive generation</div><canvas id="decoderCanvas" role="img" aria-label="Decoder-Only Models: Interactive — causal mask &amp; autoregressive generation" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Autoregressive generation — each token conditioned only on the past. In markets, <a href="../markets/psychology/#recency-bias">recency bias</a> makes traders decode only from recent history.</div>
  ${depthHtml('decoder-only')}
  <div class="topic-nav" id="nav-decoder-only"></div>
</div>`;
}

/* 09 — KV-Cache */
function buildKVCache() {
  return `<div class="topic" id="kv-cache">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Architecture</div><h2>KV-<em>Cache</em></h2></div>
    <span class="topic-badge">Memory Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Cache once, reuse forever — the key to fast autoregressive generation</p>
  <p class="prose">During generation, each new token only needs to compute its own Q, K, V — but it attends to <strong>all previous K and V vectors</strong>. Without caching, we'd recompute K,V for all prior tokens at every step. The <strong>KV-cache</strong> stores these, turning generation from O(n²) to O(n) per step.</p>
  <div class="fb"><div class="fm">Step t: K_cache = [K₁, K₂, ..., K_t],  V_cache = [V₁, V₂, ..., V_t]</div><div class="fd">Append new K_t, V_t each step. Only compute attention for the new query against cached K,V.</div></div>
  <div class="fb"><div class="fm">Memory: 2 · n_layers · seq_len · n_kv_heads · d_k · bytes_per_param</div><div class="fd">For Llama 2 70B with 4K context in FP16: about 1.3 GB per request with its 8 KV heads, and 10.7 GB if every head had its own.</div></div>
  <p class="prose">KV-cache is why <strong>batch size</strong> during inference is heavily memory-constrained. GQA (fewer KV heads) directly reduces this cost. This is the main motivation behind MQA and GQA research.</p>
  <div class="callout warn">KV-cache memory scales linearly with sequence length × batch size. For long contexts (128K+), a single request can consume 40+ GB. This dominates GPU memory during serving.</div>
  <div class="va"><div class="vl">Interactive — KV-cache growth during generation</div><canvas id="kvCacheCanvas" role="img" aria-label="KV-Cache: Interactive — KV-cache growth during generation" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Caching previously computed keys and values to avoid recomputation. The same <a href="../ml-math/#rnn">memory accumulation</a> that RNN hidden states perform. In markets, <a href="../markets/charts/#support-resistance">support/resistance</a> levels are cached price memories the market doesn’t recompute.</div>
  ${depthHtml('kv-cache')}
  <div class="topic-nav" id="nav-kv-cache"></div>
</div>`;
}

/* 10 — Context Windows */
function buildContextWindows() {
  return `<div class="topic" id="context-windows">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Architecture</div><h2>Context <em>Windows</em></h2></div>
    <span class="topic-badge">Long Context · RoPE Scaling</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How much text can a model see at once — and how to push the limits</p>
  <p class="prose">The context window is the maximum number of tokens a model can process in one forward pass. GPT-3 (2020) had 2K tokens; by 2024 GPT-4 Turbo offered 128K and Gemini 1.5 1M or more. Expanding context is critical for document analysis, code understanding, and long conversations.</p>
  <div class="fb"><div class="fm">Attention cost: O(n²) time, O(n) KV-cache memory</div><div class="fd">Quadratic compute + linear memory = context length is the fundamental bottleneck.</div></div>
  <div class="fb"><div class="fm">RoPE scaling: θ' = θ · α    where α = target_len / train_len</div><div class="fd">NTK-aware interpolation stretches RoPE frequencies to extrapolate beyond training length.</div></div>
  <p class="prose"><strong>Approaches to longer context:</strong> (1) RoPE scaling (NTK, YaRN) — cheapest, (2) Sliding window attention (Mistral) — each layer sees a local window, (3) Sparse attention patterns — attend to subset, (4) Ring attention — distribute across GPUs, (5) Simply train on more context.</p>
  <div class="callout">Doubling context length quadruples attention compute but only doubles KV-cache memory. Long-context models primarily fight the compute cost, not the memory cost.</div>
  <div class="va"><div class="vl">Interactive — attention patterns at different context lengths</div><canvas id="ctxCanvas" role="img" aria-label="Context Windows: Interactive — attention patterns at different context lengths" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The finite span of tokens the model can see at once. In statistics, <a href="../stats/#clt-sampling">sample size</a> is the context window of inference — more data, better estimates.</div>
  ${depthHtml('context-windows')}
  <div class="topic-nav" id="nav-context-windows"></div>
</div>`;
}

/* 11 — Mixture of Experts */
function buildMixtureOfExperts() {
  return `<div class="topic" id="mixture-of-experts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Architecture</div><h2>Mixture of <em>Experts</em></h2></div>
    <span class="topic-badge">Sparse · Router · Top-K</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// More parameters without proportionally more compute</p>
  <p class="prose"><strong>Mixture of Experts (MoE)</strong> replaces the single FFN with multiple "expert" FFNs and a <strong>router</strong> that selects which experts process each token. Only the top-K experts activate per token — typically K=2 out of 8–64 experts.</p>
  <div class="fb"><div class="fm">MoE(x) = Σᵢ gᵢ(x) · Expertᵢ(x)    where g(x) = TopK(softmax(W_router · x))</div><div class="fd">Router assigns weights to top-K experts. Each expert is a standard FFN. Inactive experts skip computation entirely.</div></div>
  <div class="fb"><div class="fm">Mixtral 8×7B: 8 experts, top-2 routing → 47B total, ~13B active per token</div><div class="fd">Its authors report it matching or beating Llama 2 70B on most benchmarks, at the compute of a ~13B model.</div></div>
  <p class="prose"><strong>Key challenges:</strong> (1) <em>Load balancing</em> — prevent all tokens routing to the same expert, fixed with auxiliary loss. (2) <em>Expert collapse</em> — some experts never activate. (3) <em>Communication</em> — experts on different GPUs need token routing across devices.</p>
  <div class="callout">MoE models need more RAM (all experts loaded) but less compute (only K active). This makes them memory-bound, not compute-bound — great for inference on high-memory hardware.</div>
  <div class="va"><div class="vl">Interactive — expert routing animation</div><canvas id="moeCanvas" role="img" aria-label="Mixture of Experts: Interactive — expert routing animation" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Routing inputs to specialized sub-networks — only a fraction active per token. In markets, <a href="../markets/psychology/#smart-money-dumb-money">sector rotation</a> activates different expert sectors at different times. In statistics, mixture models combine multiple distributions.</div>
  ${depthHtml('mixture-of-experts')}
  <div class="topic-nav" id="nav-mixture-of-experts"></div>
</div>`;
}

/* 12 — Scaling Laws */
function buildScalingLaws() {
  return `<div class="topic" id="scaling-laws">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Architecture</div><h2>Scaling <em>Laws</em></h2></div>
    <span class="topic-badge">Chinchilla · Power Laws</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Predicting performance before spending millions on compute</p>
  <p class="prose"><strong>Scaling laws</strong> reveal that LLM loss follows <strong>power laws</strong> in parameters (N), data (D), and compute (C). The <strong>Chinchilla paper</strong> showed that most models were trained on too little data — the optimal ratio is roughly 20 tokens per parameter.</p>
  <div class="fb"><div class="fm">L(N) ≈ (N_c / N)^α_N    L(D) ≈ (D_c / D)^α_D</div><div class="fd">Loss decreases as a power law. α_N ≈ 0.076, α_D ≈ 0.095 from Kaplan et al.</div></div>
  <div class="fb"><div class="fm">Chinchilla optimal: D_opt ≈ 20 · N</div><div class="fd">For a 70B model, train on ~1.4T tokens. GPT-3 (175B) was undertrained at 300B tokens.</div></div>
  <div class="fb"><div class="fm">Compute: C ≈ 6 · N · D  (FLOPs)</div><div class="fd">Rough approximation: 6 FLOPs per parameter per token for a forward+backward pass.</div></div>
  <p class="prose">In practice, modern models (LLaMA 3, Gemma) train <em>way beyond</em> Chinchilla-optimal because <strong>inference cost matters more</strong>: a smaller model trained on more data is cheap to serve. LLaMA 3 8B trains on 15T tokens (1875× parameter count).</p>
  <div class="callout">Scaling laws let you predict the loss of a large run from much smaller ones — the GPT-4 report predicted its final loss from runs with up to 10,000× less compute. Run small models, fit the power law, extrapolate — this is how frontier labs plan training.</div>
  <div class="va"><div class="vl">Interactive — scaling law curves</div><canvas id="scalingCanvas" role="img" aria-label="Scaling Laws: Interactive — scaling law curves" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Power-law relationships between compute, data, parameters, and loss. The same <a href="../ml-math/#linear">regression curves</a> that describe natural phenomena. In markets, <a href="../markets/psychology/#market-sentiment-cycle">market cycles</a> follow their own scaling laws — longer trends require proportionally more capitulation to reverse. The laws assume every token is worth training on; <a href="#data-curation">data curation</a> is what makes that true.</div>
  ${depthHtml('scaling-laws')}
  <div class="topic-nav" id="nav-scaling-laws"></div>
</div>`;
}

/* 13 — Pre-Training */
function buildPreTraining() {
  return `<div class="topic" id="pre-training">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Training</div><h2>Pre-<em>Training</em></h2></div>
    <span class="topic-badge">Next-Token Prediction</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Learning language from trillions of tokens</p>
  <p class="prose">Pre-training is the foundation: train a randomly-initialized transformer to predict the next token on a massive text corpus. The <strong>cross-entropy loss</strong> between predicted and actual next tokens drives all learning. The model develops grammar, facts, reasoning, and code — all from this single objective.</p>
  <div class="fb"><div class="fm">L = −(1/T) Σ log P(token_t | token_1, ..., token_{t−1})</div><div class="fd">Average negative log-likelihood over all positions. Lower loss = better predictions.</div></div>
  <div class="fb"><div class="fm">Perplexity = e^L = 2^(L/ln2)</div><div class="fd">Intuition: average number of "choices" the model is uncertain between. PPL of 10 ≈ choosing among 10 options.</div></div>
  <p class="prose"><strong>Training recipe:</strong> AdamW optimizer (β₁=0.9, β₂=0.95), cosine learning rate schedule with warmup, weight decay 0.1, gradient clipping at 1.0, bf16 mixed precision, sequence packing, batch size ramp-up.</p>
  <div class="callout">Llama 3 70B: about 15T tokens, roughly 6×10²⁴ FLOPs (6 × N × D), and about 6.4 million H100 GPU-hours as reported by Meta. Frontier pre-training runs cost tens of millions of dollars or more in compute alone.</div>
  <div class="va"><div class="vl">Interactive — training loss curve</div><canvas id="pretrainCanvas" role="img" aria-label="Pre-Training: Interactive — training loss curve" width="700" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Learning general patterns from massive data before specialization. Like <a href="../stats/#bayesian-ab">building a prior distribution</a> from large samples.</div>
  ${depthHtml('pre-training')}
  <div class="topic-nav" id="nav-pre-training"></div>
</div>`;
}

/* 14 — Fine-Tuning */
function buildFineTuning() {
  return `<div class="topic" id="fine-tuning">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Training</div><h2>Fine-<em>Tuning</em></h2></div>
    <span class="topic-badge">SFT · Instruction Tuning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Turning a base model into a helpful assistant</p>
  <p class="prose">A pre-trained model predicts next tokens but doesn't follow instructions. <strong>Supervised Fine-Tuning (SFT)</strong> trains on curated (instruction, response) pairs — teaching the model to converse, follow directions, and output structured answers.</p>
  <div class="fb"><div class="fm">L_SFT = −Σ log P(response_t | instruction, response_{&lt;t})</div><div class="fd">Only compute loss on the response tokens — the instruction tokens are context, not targets.</div></div>
  <div class="fb"><div class="fm">Dataset: ~10K–100K high-quality (instruction, response) pairs</div><div class="fd">Quality >> quantity. Careful curation matters more than scale for SFT.</div></div>
  <p class="prose"><strong>Catastrophic forgetting</strong> is the main risk: fine-tuning too aggressively overwrites pre-training knowledge. Mitigations: low learning rate (1e-5 to 5e-5), few epochs (1–3), mixing pre-training data.</p>
  <div class="callout">The gap between a base model (random-feeling completions) and a fine-tuned model (helpful assistant) is dramatic — SFT is what makes "chat" models work.</div>
  <div class="va"><div class="vl">Interactive — fine-tuning effect on output distribution</div><canvas id="finetuneCanvas" role="img" aria-label="Fine-Tuning: Interactive — fine-tuning effect on output distribution" width="700" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Adapting a pre-trained model to a specific task. In markets, adapting a general <a href="../markets/indicators/#sma">moving average strategy</a> to a specific asset class.</div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>LoRA trains well under 1% of the parameters. Full fine-tuning of a 7B model with Adam needs about 112 GB for weights, gradients and optimizer state alone (16 bytes per parameter); QLoRA fits it on a single GPU</li>
      <li>Hosted fine-tuning APIs are cheap per token but tie you to the provider’s base model, pricing and deprecation schedule</li>
      <li>Quality beats quantity in instruction data: LIMA reached strong results with 1,000 curated examples (Zhou et al. 2023)</li>
      <li>For production: fine-tune on your domain, then evaluate on held-out examples. If perplexity improves but task metrics don’t, data quality is the bottleneck</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> You need a model to follow specific output formats. Domain-specific knowledge that the base model doesn't have. Consistent style/tone requirements. Reducing prompt length (teach the model once instead of repeating instructions).</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Prompt engineering with examples (few-shot) already works well enough. Your data is small (<100 examples) — few-shot is better. You need to switch between many tasks dynamically — keep the generalist model.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — LoRA fine-tuning</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install transformers peft datasets accelerate bitsandbytes
# ────────────────────────────────────────
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B", load_in_4bit=True)
lora = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj","v_proj"])
model = get_peft_model(model, lora)  # ~0.5% trainable params

trainer = SFTTrainer(model, train_dataset=dataset,
    args=TrainingArguments(num_train_epochs=2, learning_rate=2e-4, per_device_train_batch_size=4))
trainer.train()</code></pre>
  </div>
  ${depthHtml('fine-tuning')}
  <div class="topic-nav" id="nav-fine-tuning"></div>
</div>`;
}

/* 15 — LoRA & QLoRA */
function buildLoRA() {
  return `<div class="topic" id="lora-qlora">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Training</div><h2>LoRA & <em>QLoRA</em></h2></div>
    <span class="topic-badge">Parameter-Efficient</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Fine-tune a 70B model on a single GPU</p>
  <p class="prose"><strong>LoRA (Low-Rank Adaptation)</strong> freezes all pre-trained weights and injects small trainable rank-decomposition matrices. Instead of updating W ∈ ℝ^(d×d), we learn W' = W + BA where B ∈ ℝ^(d×r), A ∈ ℝ^(r×d) with rank r ≪ d (typically 8–64).</p>
  <div class="fb"><div class="fm">W' = W₀ + (α/r) · B · A    where B ∈ ℝ^(d×r), A ∈ ℝ^(r×d)</div><div class="fd">Only B and A are trained. W₀ stays frozen. α/r scales the adapter contribution.</div></div>
  <div class="fb"><div class="fm">Trainable params: 2 · d · r per adapter ≪ d²</div><div class="fd">For d=4096, r=16: 131K params per adapter vs 16.7M for the full matrix — 128× reduction.</div></div>
  <p class="prose"><strong>QLoRA</strong> goes further: quantize W₀ to 4-bit (NF4 format), keep adapters in bf16, and use paged optimizers to handle memory spikes. This makes fine-tuning a 65B model possible on a single 48GB GPU.</p>
  <div class="callout">LoRA adapters can be merged back into the base weights for zero-cost inference: W_merged = W₀ + (α/r)·B·A. Multiple LoRA adapters can be served simultaneously by switching the small adapter weights per request.</div>
  <div class="va"><div class="vl">Interactive — low-rank decomposition</div><canvas id="loraCanvas" role="img" aria-label="LoRA &amp; QLoRA: Interactive — low-rank decomposition" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Low-rank updates that modify a frozen model with minimal parameters. The <a href="../ml-math/#lora">ML math behind LoRA</a> is SVD-inspired rank reduction.</div>
  ${depthHtml('lora-qlora')}
  <div class="topic-nav" id="nav-lora-qlora"></div>
</div>`;
}

/* 16 — RLHF */
function buildRLHF() {
  return `<div class="topic" id="rlhf">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Training</div><h2><em>RLHF</em></h2></div>
    <span class="topic-badge">Reward Model · PPO</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Aligning language models with human preferences</p>
  <p class="prose"><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> is a 3-stage process: (1) SFT the base model, (2) train a <strong>reward model</strong> on human comparison data, (3) optimize the SFT model with <strong>PPO</strong> against the reward model while staying close to the SFT policy.</p>
  <div class="fb"><div class="fm">Stage 2 — Reward: L_RM = −log σ(r(x, y_w) − r(x, y_l))</div><div class="fd">Bradley-Terry model: chosen response y_w should score higher than rejected y_l.</div></div>
  <div class="fb"><div class="fm">Stage 3 — PPO: max E[r(x,y)] − β · KL(π_θ || π_ref)</div><div class="fd">Maximize reward while staying close to the reference policy. β controls the KL penalty.</div></div>
  <p class="prose">The KL penalty is crucial — without it, the model "reward hacks": finds adversarial outputs that fool the reward model. Typical β values: 0.01–0.2. RLHF produces noticeably better outputs than SFT alone, but adds significant training complexity.</p>
  <div class="callout">RLHF was a key ingredient of ChatGPT. InstructGPT showed that labellers preferred a 1.3B RLHF model's outputs to those of the 175B GPT-3.</div>
  <div class="va"><div class="vl">Interactive — RLHF pipeline stages</div><canvas id="rlhfCanvas" role="img" aria-label="RLHF: Interactive — RLHF pipeline stages" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Aligning model outputs with human preferences via reward modeling. The <a href="../ml-math/#rlhf">math of RLHF</a> is a policy gradient over preference pairs. In markets, <a href="../markets/psychology/#herd-behavior">herd behavior</a> is collective preference shaping price — the market’s reward signal.</div>
  ${depthHtml('rlhf')}
  <div class="topic-nav" id="nav-rlhf"></div>
</div>`;
}

/* 17 — DPO */
function buildDPO() {
  return `<div class="topic" id="dpo">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Training</div><h2><em>DPO</em></h2></div>
    <span class="topic-badge">Direct Preference Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Skip the reward model — optimize preferences directly</p>
  <p class="prose"><strong>DPO</strong> reformulates RLHF as a simple classification problem: given (chosen, rejected) pairs, directly optimize the policy — no reward model, no PPO, no RL. The key insight: the optimal RLHF solution has a closed-form mapping between reward and policy.</p>
  <div class="fb"><div class="fm">L_DPO = −log σ( β · [log π_θ(y_w|x)/π_ref(y_w|x) − log π_θ(y_l|x)/π_ref(y_l|x)] )</div><div class="fd">Increase probability of chosen, decrease rejected, relative to the reference model.</div></div>
  <div class="fb"><div class="fm">Implicit reward: r(x,y) = β · log[π_θ(y|x) / π_ref(y|x)] + const</div><div class="fd">DPO learns the reward implicitly — the policy IS the reward model.</div></div>
  <p class="prose"><strong>Why DPO took over:</strong> (1) simpler pipeline — just SFT then DPO, (2) more stable than PPO, (3) cheaper — no separate reward model forward passes, (4) competitive or better quality. Variants: IPO (no sigmoid), KTO (unpaired), ORPO (combines SFT+DPO).</p>
  <div class="callout">DPO needs a frozen reference model in memory alongside the training model — essentially doubling memory cost. Efficient implementations use LoRA or offload the reference to CPU.</div>
  <div class="va"><div class="vl">Interactive — DPO preference optimization</div><canvas id="dpoCanvas" role="img" aria-label="DPO: Interactive — DPO preference optimization" width="700" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Direct Preference Optimization skips the reward model, optimizing preferences end-to-end. Like <a href="../ml-math/#loss">simplifying a loss function</a> to remove an intermediate step.</div>
  ${depthHtml('dpo')}
  <div class="topic-nav" id="nav-dpo"></div>
</div>`;
}

/* 18 — Data Curation */
function buildDataCuration() {
  return `<div class="topic" id="data-curation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Training</div><h2>Data <em>Curation</em></h2></div>
    <span class="topic-badge">Quality · Dedup · Mixing</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The most impactful and least glamorous part of LLM training</p>
  <p class="prose">Data quality determines model quality. The pipeline: <strong>crawl → filter → deduplicate → classify → mix</strong>. Common Crawl’s archive spans more than 250 billion pages collected since 2008, but only a small fraction is high-quality. Aggressive filtering and deduplication are essential.</p>
  <div class="fb"><div class="fm">Quality filter pipeline: URL → language ID → perplexity → toxicity → heuristic rules</div><div class="fd">Each stage drops data. Llama 3 was trained on over 15T tokens selected with heuristic filters, deduplication and model-based quality classifiers.</div></div>
  <div class="fb"><div class="fm">Dedup: MinHash + LSH for fuzzy, exact-match for verbatim</div><div class="fd">Duplicates hurt training: models memorize repeated passages, wasting capacity. A large share of web text is near-duplicate (Lee et al. 2022).</div></div>
  <p class="prose"><strong>Data mixing</strong> is critical: model capabilities depend on training data composition. Meta reported Llama 3’s mix as roughly 50% general knowledge, 25% maths and reasoning, 17% code and 8% multilingual text. More code has been linked to better reasoning, though the evidence is mixed.</p>
  <div class="callout warn">Benchmark contamination is a real problem — if test questions appear in training data, benchmarks are meaningless. Modern data pipelines include decontamination stages that remove known benchmarks.</div>
  <div class="va"><div class="vl">Interactive — data filtering funnel</div><canvas id="dataCanvas" role="img" aria-label="Data Curation: Interactive — data filtering funnel" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Quality over quantity in training data — deduplication, filtering, mixing. In statistics, <a href="../stats/#class-imbalance">sampling methodology</a> determines everything.</div>
  ${depthHtml('data-curation')}
  <div class="topic-nav" id="nav-data-curation"></div>
</div>`;
}

/* 19 — Decoding Strategies */
function buildDecodingStrategies() {
  return `<div class="topic" id="decoding-strategies">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Inference</div><h2>Decoding <em>Strategies</em></h2></div>
    <span class="topic-badge">Greedy · Beam Search</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Deterministic methods for converting logits to text</p>
  <p class="prose"><strong>Greedy decoding</strong> picks the highest-probability token at each step. Simple but often suboptimal — it can miss globally better sequences. <strong>Beam search</strong> maintains K candidate sequences (beams) and prunes at each step.</p>
  <div class="fb"><div class="fm">Greedy: token_t = argmax P(token | context)</div><div class="fd">Fastest, but prone to repetitive or locally-trapped outputs.</div></div>
  <div class="fb"><div class="fm">Beam search: maintain top-K partial sequences ranked by Σ log P</div><div class="fd">At each step, expand all K beams, score, keep top K. Beam width K=4–5 is typical.</div></div>
  <p class="prose">Beam search was dominant pre-LLM (translation, summarization) but is rarely used for chat/creative generation — it produces <em>too safe</em>, repetitive text. Modern LLMs use <strong>sampling</strong> (next topic) for most tasks.</p>
  <div class="callout">Beam search still wins for tasks with a "correct" answer — code generation, math, structured output. For open-ended text, sampling produces more natural and diverse output.</div>
  <div class="va"><div class="vl">Interactive — beam search tree</div><canvas id="decodingCanvas" role="img" aria-label="Decoding Strategies: Interactive — beam search tree" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Greedy, beam search, nucleus sampling — trading off quality vs. diversity. The same tradeoff as <a href="../ml-math/#bias-variance">bias-variance</a>: greedy = high bias, random = high variance. In markets, <a href="../markets/psychology/#fear-and-greed">fear and greed</a> drive conservative vs. aggressive strategies.</div>
  ${depthHtml('decoding-strategies')}
  <div class="topic-nav" id="nav-decoding-strategies"></div>
</div>`;
}

/* 20 — Sampling */
function buildSampling() {
  return `<div class="topic" id="sampling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Inference</div><h2><em>Sampling</em></h2></div>
    <span class="topic-badge">Temperature · Top-K · Top-P</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Controlling creativity by shaping the probability distribution</p>
  <p class="prose">Instead of argmax, <strong>sample</strong> from the distribution — but shape it first. <strong>Temperature</strong> sharpens or flattens. <strong>Top-K</strong> limits to K most likely tokens. <strong>Top-P (nucleus)</strong> limits to the smallest set that sums to P probability.</p>
  <div class="fb"><div class="fm">Temperature: P'(token) = softmax(logit / T)</div><div class="fd">T<1 → sharper (more confident). T>1 → flatter (more random). T→0 = greedy.</div></div>
  <div class="fb"><div class="fm">Top-K: zero out all but top K logits, renormalize</div><div class="fd">K=50 is common. Prevents sampling very unlikely tokens (garbage).</div></div>
  <div class="fb"><div class="fm">Top-P (nucleus): keep tokens until cumulative P ≥ p, zero rest</div><div class="fd">Adaptive: for confident predictions, keeps few tokens. For uncertain, keeps many. p=0.9–0.95 typical.</div></div>
  <p class="prose">In practice, combine them: temperature + top-P is the standard. <strong>Repetition penalty</strong> divides logits of recently-generated tokens by a factor (1.1–1.3) to reduce loops. <strong>Min-P</strong> is a newer approach that scales the threshold with the top token's probability.</p>
  <div class="callout">Temperature 0.0–0.3 for code/math (deterministic). Temperature 0.7–1.0 for creative writing. Top-P 0.9 is a solid default for most tasks.</div>
  <div class="va"><div class="vl">Interactive — probability distribution shaping</div><canvas id="samplingCanvas" role="img" aria-label="Sampling: Interactive — probability distribution shaping" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Temperature, top-k, top-p control the randomness of generation. Temperature is <a href="../ml-math/#softmax">softmax temperature</a> scaling. In statistics, <a href="../stats/#monte-carlo">sampling from distributions</a> is the foundation.</div>
  ${depthHtml('sampling')}
  <div class="topic-nav" id="nav-sampling"></div>
</div>`;
}

/* 21 — Speculative Decoding */
function buildSpeculativeDecoding() {
  return `<div class="topic" id="speculative-decoding">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Inference</div><h2>Speculative <em>Decoding</em></h2></div>
    <span class="topic-badge">Draft & Verify</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Use a fast model to draft, a large model to verify — 2–3× speedup</p>
  <p class="prose">Autoregressive generation is <strong>memory-bound</strong>: each token requires loading all model weights but does minimal computation. <strong>Speculative decoding</strong> uses a small draft model to generate K candidate tokens, then the large model verifies all K in one forward pass (which is compute-bound, so it's fast).</p>
  <div class="fb"><div class="fm">Draft: generate K tokens with small model M_s (fast)</div><div class="fd">The draft model is usually much smaller — 10× to 100× — e.g. a 1B draft for a 70B target.</div></div>
  <div class="fb"><div class="fm">Verify: run target model M_t on all K tokens in parallel → accept/reject each</div><div class="fd">Accept token i if P_target(token_i) ≥ P_draft(token_i). On rejection, resample from adjusted distribution.</div></div>
  <p class="prose">The key guarantee: speculative decoding produces <strong>exactly the same distribution</strong> as standard generation — it's lossless. Speedup depends on draft model quality (acceptance rate). Leviathan et al. report 2–3× faster generation.</p>
  <div class="callout">Medusa and Eagle add extra heads to the model itself instead of using a separate draft model — eliminating the need for draft-target distribution matching.</div>
  <div class="va"><div class="vl">Interactive — speculative decoding timeline</div><canvas id="specCanvas" role="img" aria-label="Speculative Decoding: Interactive — speculative decoding timeline" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> A small model drafts, a large model verifies — the same principle as <a href="../ml-math/#gan">generator/discriminator</a> in GANs. In markets, <a href="../markets/psychology/#contrarian-thinking">contrarian thinking</a> verifies what the crowd drafts.</div>
  ${depthHtml('speculative-decoding')}
  <div class="topic-nav" id="nav-speculative-decoding"></div>
</div>`;
}

/* 22 — Quantization */
function buildQuantization() {
  return `<div class="topic" id="quantization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Inference</div><h2>Quant<em>ization</em></h2></div>
    <span class="topic-badge">INT8 · INT4 · GPTQ · AWQ</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Shrink models 2–4× with minimal quality loss</p>
  <p class="prose"><strong>Quantization</strong> reduces the precision of model weights from 16-bit floats to 8-bit or 4-bit integers. This halves (or quarters) memory usage and speeds up memory-bound inference. The challenge: preserving output quality.</p>
  <div class="fb"><div class="fm">Linear quantization: q = round((x − zero) / scale)    x ≈ q · scale + zero</div><div class="fd">Map continuous weights to discrete integer grid. Scale and zero-point define the mapping.</div></div>
  <div class="fb"><div class="fm">Model sizes: FP16=2B/param → INT8=1B/param → INT4=0.5B/param</div><div class="fd">A 70B model: 140GB (FP16) → 70GB (INT8) → 35GB (INT4). In INT4 it fits on a single 80 GB GPU; FP16 needs at least two.</div></div>
  <p class="prose"><strong>Methods:</strong> (1) <em>GPTQ</em> — weight-only, layer-by-layer with Hessian info, (2) <em>AWQ</em> — activation-aware, protects salient weights, (3) <em>GGUF</em> — CPU-friendly mixed-precision, (4) <em>bitsandbytes</em> — NF4 datatype for QLoRA. Weight-only quantization (activations stay in fp16) is most common for LLMs.</p>
  <div class="callout">INT8 quantization has virtually no quality loss for most tasks. INT4 shows small degradation but is the sweet spot for serving — 4× memory savings are too compelling to ignore.</div>
  <div class="va"><div class="vl">Interactive — precision comparison</div><canvas id="quantCanvas" role="img" aria-label="Quantization: Interactive — precision comparison" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Reducing precision from float32 to int8/int4 is binning applied to weights — discrete approximation of continuous values. The production side — calibration, accuracy checks and serving — is in <a href="../mlops/#quantization">quantization for MLOps</a>.</div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Good 4-bit methods (GPTQ, AWQ) usually lose little on standard benchmarks; maths, code and long-context tasks tend to degrade first. llama.cpp’s GGUF format runs 4-bit 70B models on machines with 64 GB of memory</li>
      <li>Memory: FP32→FP16 = 2×, FP16→INT8 = 2×, INT8→INT4 = 2×. A 70B model goes from 280 GB → 35 GB</li>
      <li>Speed: weight-only INT4 can be several times faster than FP16 at small batch sizes, where memory bandwidth is the bottleneck (AWQ reports over 3×; Lin et al. 2024)</li>
      <li>AWQ protects the most important weights using activation statistics — better quality than naive rounding</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Deploying models locally or on limited hardware. Reducing inference costs in production. Running large models (30B+) on consumer GPUs. Edge deployment on phones/laptops.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Using cloud APIs (already optimized). Tasks requiring maximum precision (scientific computation). Small models (<1B) that already fit in memory. Training — quantize for inference only.</div>
  </div>
  ${depthHtml('quantization')}
  <div class="topic-nav" id="nav-quantization"></div>
</div>`;
}

/* 23 — KV-Cache Optimization */
function buildKVCacheOpt() {
  return `<div class="topic" id="kv-cache-opt">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Inference</div><h2>KV-Cache <em>Optimization</em></h2></div>
    <span class="topic-badge">PagedAttention · vLLM</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Eliminating the memory fragmentation that limits batch size</p>
  <p class="prose">Standard KV-cache allocates a contiguous buffer for the maximum sequence length per request — this wastes memory (most sequences are shorter). <strong>PagedAttention</strong> (vLLM) allocates KV-cache in <em>fixed-size blocks</em> (like OS virtual memory pages), eliminating fragmentation.</p>
  <div class="fb"><div class="fm">PagedAttention: KV-cache = non-contiguous blocks of size B tokens each</div><div class="fd">Physical blocks allocated on demand. Block table maps logical → physical. No wasted pre-allocation.</div></div>
  <div class="fb"><div class="fm">Prefix caching: shared prompts → shared KV blocks (copy-on-write)</div><div class="fd">If 100 requests share a system prompt, its KV is stored once instead of 100 times; the saving grows with the prompt’s share of each request.</div></div>
  <p class="prose"><strong>Impact:</strong> vLLM achieves 2–4× higher throughput than naive serving by fitting more requests in the same GPU memory. Additional optimizations: <em>KV-cache quantization</em> (FP8 per KV), <em>sliding window eviction</em>, and <em>radix tree prefix sharing</em>.</p>
  <div class="callout">PagedAttention is one of the most important serving optimisations of recent years; vLLM introduced it, and other serving frameworks have adopted similar paged KV-caches.</div>
  <div class="va"><div class="vl">Interactive — paged vs contiguous KV-cache allocation</div><canvas id="kvOptCanvas" role="img" aria-label="KV-Cache Optimization: Interactive — paged vs contiguous KV-cache allocation" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Grouped-query and multi-query attention reduce memory by sharing keys/values. The same <a href="../ml-math/#svd">rank reduction</a> principle behind SVD and LoRA.</div>
  ${depthHtml('kv-cache-opt')}
  <div class="topic-nav" id="nav-kv-cache-opt"></div>
</div>`;
}

/* 24 — Batching & Throughput */
function buildBatching() {
  return `<div class="topic" id="batching">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Inference</div><h2>Batching & <em>Throughput</em></h2></div>
    <span class="topic-badge">Continuous Batching · Prefill vs Decode</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Serving hundreds of concurrent requests efficiently</p>
  <p class="prose">LLM inference has two distinct phases: <strong>prefill</strong> (process the full prompt — compute-bound, fast per token) and <strong>decode</strong> (generate one token — memory-bound, slow per token). <strong>Continuous batching</strong> dynamically adds/removes requests from a batch as they finish, rather than waiting for the longest sequence.</p>
  <div class="fb"><div class="fm">Static batching: all requests padded to same length, wait for slowest</div><div class="fd">Wastes GPU cycles on padding. Throughput = 1/longest_sequence.</div></div>
  <div class="fb"><div class="fm">Continuous batching: new requests join mid-batch, finished ones leave</div><div class="fd">GPU is always busy. Throughput can rise several-fold over static batching (Yu et al. 2022).</div></div>
  <p class="prose"><strong>Key metrics:</strong> <em>TTFT</em> (time to first token — mainly prefill), <em>TPS</em> (tokens per second — decode speed), <em>throughput</em> (total tokens/sec across all requests). Disaggregating prefill and decode to separate GPU pools (prefill cluster + decode cluster) is the latest frontier.</p>
  <div class="callout">The fundamental LLM serving insight: prefill is compute-bound, decode is memory-bound. They have opposite optimization strategies. Modern serving engines schedule them separately.</div>
  <div class="va"><div class="vl">Interactive — static vs continuous batching timeline</div><canvas id="batchCanvas" role="img" aria-label="Batching &amp; Throughput: Interactive — static vs continuous batching timeline" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Processing multiple requests simultaneously for throughput. In <a href="../ml-math/#gradient">mini-batch gradient descent</a>, the same principle trades per-sample accuracy for throughput.</div>
  ${depthHtml('batching')}
  <div class="topic-nav" id="nav-batching"></div>
</div>`;
}

/* 25 — Prompt Engineering */
function buildPromptEngineering() {
  return `<div class="topic" id="prompt-engineering">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Applications</div><h2>Prompt <em>Engineering</em></h2></div>
    <span class="topic-badge">System · Few-Shot · CoT</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The craft of asking questions that get the best answers</p>
  <p class="prose">Prompt engineering is the art of structuring inputs to maximize output quality. The key tools: <strong>system prompts</strong> (set behavior), <strong>few-shot examples</strong> (show by example), and <strong>chain-of-thought</strong> (encourage step-by-step reasoning).</p>
  <div class="fb"><div class="fm">Zero-shot: Direct instruction → answer</div><div class="fd">Works for simple tasks. "Translate to French: Hello world"</div></div>
  <div class="fb"><div class="fm">Few-shot: Example₁, Example₂, ..., Query → answer</div><div class="fd">Provide 2-5 examples of input→output. Model infers the pattern.</div></div>
  <div class="fb"><div class="fm">Chain-of-Thought: "Think step by step" → reasoning → answer</div><div class="fd">Dramatically improves math, logic, and multi-step reasoning. Model "shows its work."</div></div>
  <p class="prose">Advanced techniques: <em>self-consistency</em> (sample N times, majority vote), <em>tree-of-thought</em> (explore multiple reasoning paths), <em>structured output</em> (ask for JSON with a schema), <em>persona prompting</em> (act as expert in X).</p>
  <div class="callout">Few-shot chain-of-thought prompting raised PaLM 540B’s GSM8K accuracy from about 18% to about 57% (Wei et al. 2022); simply adding “Let’s think step by step” also helps (Kojima et al. 2022).</div>
  <div class="va"><div class="vl">Interactive — prompt structure diagram</div><canvas id="promptCanvas" role="img" aria-label="Prompt Engineering: Interactive — prompt structure diagram" width="700" height="280"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Crafting inputs to steer outputs is the art of framing. In markets, <a href="../markets/psychology/#framing-effect">the framing effect</a> shows how presentation shapes decisions.</div>
  ${depthHtml('prompt-engineering')}
  <div class="topic-nav" id="nav-prompt-engineering"></div>
</div>`;
}

/* 26 — RAG */
function buildRAG() {
  return `<div class="topic" id="rag">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Applications</div><h2><em>RAG</em></h2></div>
    <span class="topic-badge">Retrieval-Augmented Generation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Grounding LLM answers in your own documents</p>
  <p class="prose"><strong>RAG</strong> solves the hallucination problem by retrieving relevant documents before generation. The pipeline: <strong>Chunk</strong> documents → <strong>Embed</strong> chunks → <strong>Store</strong> in vector DB → At query time: <strong>Embed</strong> query → <strong>Retrieve</strong> top-K chunks → <strong>Generate</strong> answer with chunks as context.</p>
  <div class="fb"><div class="fm">Pipeline: Query → Embed → Search → Rerank → Augment Prompt → Generate</div><div class="fd">Each stage has design choices: chunk size, overlap, embedding model, retriever, reranker, prompt template.</div></div>
  <div class="fb"><div class="fm">Chunk size: 256–512 tokens with 10–20% overlap</div><div class="fd">Too small → lost context. Too large → diluted relevance. Semantic chunking (split at paragraph breaks) works better than fixed-size.</div></div>
  <p class="prose"><strong>Common pitfalls:</strong> (1) Chunking destroys context — tables, lists split mid-content. (2) Embedding model mismatch — query embeddings must match document embeddings. (3) Top-K too small — misses relevant but lower-ranked chunks. (4) No reranking — embedding similarity ≠ answer relevance.</p>
  <div class="callout">Reranking is often one of the most effective improvements to a RAG system: a cross-encoder re-scores the top 20–100 retrieved passages more accurately than the first-stage search.</div>
  <div class="va"><div class="vl">Interactive — RAG pipeline flow</div><canvas id="ragCanvas" role="img" aria-label="RAG: Interactive — RAG pipeline flow" width="780" height="420"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Retrieval-Augmented Generation grounds the model in external knowledge. <a href="../ml-math/#cosine-sim">Cosine similarity</a> retrieves relevant passages. In statistics, <a href="../stats/#bayesian-ab">Bayesian updating</a> brings prior evidence to new questions. Add tools and a planning loop and retrieval becomes one step of an <a href="#agents">agent</a>.</div>
  ${depthHtml('rag')}
  <div class="topic-nav" id="nav-rag"></div>
</div>`;
}

/* 27 — Embedding Search */
function buildEmbeddingSearch() {
  return `<div class="topic" id="embedding-search">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Applications</div><h2>Embedding <em>Search</em></h2></div>
    <span class="topic-badge">Vector DB · ANN · HNSW</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Finding semantically similar content at scale</p>
  <p class="prose">Embedding search converts text to vectors and finds nearest neighbors. The embedding model maps text to a dense vector (768–1536 dimensions). <strong>Cosine similarity</strong> or <strong>dot product</strong> measures closeness. For millions of vectors, exact search is too slow — we use <strong>Approximate Nearest Neighbors (ANN)</strong>.</p>
  <div class="fb"><div class="fm">cosine_sim(a, b) = (a · b) / (‖a‖ · ‖b‖) ∈ [−1, 1]</div><div class="fd">1 = identical direction, 0 = orthogonal, −1 = opposite. Most embedding models are L2-normalized.</div></div>
  <div class="fb"><div class="fm">HNSW: hierarchical navigable small world graph</div><div class="fd">Multi-layer graph: top layers for coarse search, bottom layers for precise. Roughly logarithmic query time, with high recall (often above 95%) at typical settings.</div></div>
  <p class="prose"><strong>Vector databases:</strong> Pinecone (managed), Qdrant (open-source), pgvector (PostgreSQL), Chroma (lightweight), Weaviate (hybrid search). For smaller datasets (<100K vectors), brute-force exact search in FAISS is fast enough.</p>
  <div class="callout">Hybrid search (BM25 keyword + semantic embedding) consistently outperforms either alone. Most production systems combine both with reciprocal rank fusion.</div>
  <div class="va"><div class="vl">Interactive — vector space nearest neighbor search</div><canvas id="searchCanvas" role="img" aria-label="Embedding Search: Interactive — vector space nearest neighbor search" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Finding nearest neighbors in vector space is <a href="../ml-math/#cosine-sim">cosine similarity at scale</a>. In statistics, k-nearest-neighbors in feature space is the same idea.</div>
  ${depthHtml('embedding-search')}
  <div class="topic-nav" id="nav-embedding-search"></div>
</div>`;
}

/* 28 — Function Calling */
function buildFunctionCalling() {
  return `<div class="topic" id="function-calling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Applications</div><h2>Function <em>Calling</em></h2></div>
    <span class="topic-badge">Tool Use · Structured Output</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Extending LLMs with real-world capabilities via tool use</p>
  <p class="prose"><strong>Function calling</strong> lets an LLM request the execution of external functions — APIs, databases, calculations — by outputting structured JSON matching a schema you define. The model decides <em>when</em> to call a function, <em>which</em> function, and with what <em>arguments</em>.</p>
  <div class="fb"><div class="fm">Input: tools=[{name, description, parameters}] + user message</div><div class="fd">You define available tools as JSON Schema. Model chooses to call one (or more) based on the query.</div></div>
  <div class="fb"><div class="fm">Output: tool_calls=[{function: {name, arguments}}]</div><div class="fd">Structured JSON that your code parses and executes. Return the result as a tool message for the next turn.</div></div>
  <p class="prose"><strong>Parallel function calling:</strong> models can request multiple tool calls in one response. <strong>Structured output / JSON mode:</strong> forces the model to output valid JSON matching a schema — useful even without external tools for data extraction, classification, etc.</p>
  <div class="callout">Function calling is the foundation of agents. Without it, LLMs can only output text. With it, they can search the web, query databases, send emails, write code — anything with an API.</div>
  <div class="va"><div class="vl">Interactive — function call flow</div><canvas id="funcCanvas" role="img" aria-label="Function Calling: Interactive — function call flow" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The model outputting structured tool calls is <a href="../ml-math/#softmax">classification over actions</a> instead of tokens. In markets, <a href="../markets/indicators/#ichimoku">Ichimoku’s multi-signal system</a> calls different functions (trend, momentum, support) from one framework.</div>
  ${depthHtml('function-calling')}
  <div class="topic-nav" id="nav-function-calling"></div>
</div>`;
}

/* 29 — Agents & Planning */
function buildAgents() {
  return `<div class="topic" id="agents">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Applications</div><h2>Agents & <em>Planning</em></h2></div>
    <span class="topic-badge">ReAct · Tool Chains · Memory</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Autonomous multi-step reasoning with tools and memory</p>
  <p class="prose">An <strong>agent</strong> is an LLM that reasons about what to do, takes actions (tool calls), observes results, and iterates. The <strong>ReAct</strong> pattern (Reason + Act) interleaves thinking and tool use: Thought → Action → Observation → Thought → ...</p>
  <div class="fb"><div class="fm">ReAct loop: Thought → Action(tool, args) → Observation → Thought → ... → Final Answer</div><div class="fd">Each iteration: reason about what's needed, call a tool, process the result, decide next step.</div></div>
  <div class="fb"><div class="fm">Planning: Decompose task → subtasks → execute sequentially or in parallel</div><div class="fd">Complex tasks need planning: break "book a trip" into search flights, compare prices, book, confirm.</div></div>
  <p class="prose"><strong>Memory types:</strong> (1) <em>Short-term</em> — conversation history in context window. (2) <em>Long-term</em> — vector store of past interactions, retrieved as needed. (3) <em>Working memory</em> — scratchpad for current task state. Key challenge: agents can be <em>unreliable</em> — they get stuck in loops, hallucinate tool calls, or lose track of the plan.</p>
  <div class="callout">The best agent systems use simple, constrained loops — not complex multi-agent frameworks. Simple baselines are often hard to beat, and complex agent setups add cost (Kapoor et al. 2024).</div>
  <div class="va"><div class="vl">Interactive — ReAct agent loop</div><canvas id="agentCanvas" role="img" aria-label="Agents &amp; Planning: Interactive — ReAct agent loop" width="700" height="300"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> LLMs planning, tool-using, and looping is <a href="../ml-math/#optimizers">optimization</a> made autonomous — each step refines the next. In markets, <a href="../markets/psychology/#market-sentiment-cycle">the sentiment cycle</a> is an agent loop: observe, decide, act, observe again. Every tool an agent uses is reached through <a href="#function-calling">function calling</a>.</div>
  ${depthHtml('agents')}
  <div class="topic-nav" id="nav-agents"></div>
</div>`;
}

/* 30 — Evaluation & Benchmarks */
function buildEvaluation() {
  return `<div class="topic" id="evaluation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Applications</div><h2>Evaluation & <em>Benchmarks</em></h2></div>
    <span class="topic-badge">Perplexity · MMLU · Arena</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring what matters — and what doesn't</p>
  <p class="prose">How do you know if an LLM is good? <strong>Perplexity</strong> measures language modeling quality. <strong>Benchmarks</strong> test specific skills. <strong>Human evaluation</strong> and <strong>arena rankings</strong> capture overall helpfulness. Each has blind spots.</p>
  <div class="fb"><div class="fm">Perplexity = e^(−1/T · Σ log P(token_t))</div><div class="fd">Average surprisal. Lower = better at predicting text. Only measures language modeling, not task ability.</div></div>
  <div class="fb"><div class="fm">MMLU: 57 subjects, multiple choice (humanities, STEM, social sciences)</div><div class="fd">Knowledge breadth. GPT-4: ~86%, LLaMA-3-70B: ~82%. But multiple-choice ≠ open-ended ability.</div></div>
  <p class="prose"><strong>Key benchmarks:</strong> <em>MMLU</em> (knowledge), <em>HumanEval</em> (code generation), <em>GSM8K</em> (math), <em>HellaSwag</em> (common sense), <em>ARC</em> (reasoning), <em>TruthfulQA</em> (hallucination). <strong>Chatbot Arena</strong> uses live ELO rankings from anonymous human votes — a widely watched evaluation, with biases of its own.</p>
  <div class="callout warn">Benchmark contamination is rampant — if test questions leak into training data, scores are meaningless. Private held-out test sets and Arena rankings are more reliable than public benchmark scores.</div>
  <div class="va"><div class="vl">Interactive — benchmark comparison radar chart</div><canvas id="evalCanvas" role="img" aria-label="Evaluation &amp; Benchmarks: Interactive — benchmark comparison radar chart" width="700" height="320"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Benchmarking models with metrics and human evaluation. In ML, <a href="../ml-math/#metrics">precision/recall/F1</a> are the toolkit. In statistics, <a href="../stats/#hypothesis-testing">hypothesis testing</a> evaluates claims.</div>
  ${depthHtml('evaluation')}
  <div class="topic-nav" id="nav-evaluation"></div>
</div>`;
}
