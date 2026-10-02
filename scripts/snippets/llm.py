# LLM Engineering snippets: engineering-scale numbers (memory, cost, speed,
# reliability), each with its own inputs. Configs named after real models
# use their published shapes; everything else is made up or simulated.
import numpy as np

P = {}

P['tokenization'] = ("""samples = {'English': 'pattern', 'Danish': 'mønstre på tværs', 'Greek': 'μοτίβο',
           'Chinese': '模式识别', 'Hindi': 'पैटर्न'}
bytes_per_char = {lang: len(s.encode('utf-8')) / len(s) for lang, s in samples.items()}
# byte-level BPE starts from UTF-8 bytes: scripts it saw little of stay closer to one token per byte""", '{k: round(v, 2) for k, v in bytes_per_char.items()}')

P['embeddings'] = ("""def embedding_share(vocab, d, total):
    return vocab * d / total

gpt2_small = embedding_share(50_257, 768, 124_439_808)       # GPT-2 small, tied input/output
llama2_70b = embedding_share(32_000, 8_192, 68_976_648_192)   # Llama 2 70B, one of its two tables
tied_saving = 50_257 * 768                                     # parameters saved by weight tying""", 'gpt2_small, llama2_70b, tied_saving')

P['positional-encoding'] = ("""def pe(pos, d=64):
    i = np.arange(d // 2)
    ang = pos / 10_000 ** (2 * i / d)
    return np.concatenate([np.sin(ang), np.cos(ang)])

near = (pe(10) @ pe(15), pe(500) @ pe(505))          # same distance, different places
rot = lambda v, m, th=0.1: np.array([[np.cos(m*th), -np.sin(m*th)], [np.sin(m*th), np.cos(m*th)]]) @ v
q, k = np.array([1.0, 0.5]), np.array([0.3, 0.8])
rope = (rot(q, 7) @ rot(k, 3), rot(q, 104) @ rot(k, 100))   # RoPE: score depends on m - n = 4 only""", 'np.round(near, 6), np.round(rope, 6)')

P['self-attention'] = ("""def score_matrix_gb(n, bytes_per=2):            # one head, one layer, fp16
    return n * n * bytes_per / 1e9

sizes = {n: round(score_matrix_gb(n), 3) for n in (4_096, 32_768, 131_072)}""", 'sizes')

P['multi-head-attention'] = ("""layers, d_k, bytes_per, ctx = 80, 128, 2, 4_096      # Llama-2-70B shapes, fp16, 4k context
def kv_gb(kv_heads):
    return 2 * layers * kv_heads * d_k * bytes_per * ctx / 1e9   # K and V, every layer, every token
mha, gqa, mqa = kv_gb(64), kv_gb(8), kv_gb(1)         # 64 query heads; 64, 8 or 1 KV heads""", 'round(mha, 2), round(gqa, 2), round(mqa, 2)')

P['feed-forward'] = ("""d = 4_096
classic = 2 * d * (4 * d)                       # W1 and W2 with a 4d hidden layer
swiglu_ideal = 3 * d * round(2 / 3 * 4 * d)     # three matrices at 2/3 of 4d keep the count equal
swiglu_llama = 3 * d * 11_008                   # LLaMA-7B rounds the hidden size to 11,008""", 'classic, swiglu_ideal, swiglu_llama')

P['transformer-block'] = ("""d, kv_dim, ff, layers, vocab = 8_192, 1_024, 28_672, 80, 32_000   # Llama-2-70B
attn = d * d + 2 * d * kv_dim + d * d          # Q, K and V (grouped), output
ffn = 3 * d * ff                                # SwiGLU
block = attn + ffn + 2 * d                      # + two RMSNorm scales
total = layers * block + 2 * vocab * d + d      # + input and output embeddings, final norm""", 'attn, ffn, block, total')

P['decoder-only'] = ("""p = np.array([0.5, 0.3, 0.9, 0.2])              # P(token_t | everything before it)
logp = np.log(p).sum()
seq_prob = np.exp(logp)
n = 1_000
pairs_causal, pairs_full = n * (n + 1) // 2, n * n   # attention pairs with and without the causal mask""", 'round(logp, 3), round(seq_prob, 4), pairs_causal / pairs_full')

P['kv-cache'] = ("""T = 1_000                                       # tokens generated
recompute = T * (T + 1) // 2                    # K/V projections without a cache: the whole prefix every step
cached = T                                      # with a cache: one new token per step
layers, kv_heads, d_k, bytes_per = 32, 8, 128, 2   # Llama-3-8B shapes, fp16
per_token_kb = 2 * layers * kv_heads * d_k * bytes_per / 1024
at_128k_gb = per_token_kb * 131_072 / 1024 ** 2""", 'recompute // cached, per_token_kb, at_128k_gb')

P['context-windows'] = ("""short, long = 4_096, 131_072
tokens = long / short
attention_work = tokens ** 2                   # score matrix grows with n^2
kv_memory = tokens                             # the cache grows with n
rope_scale = long / short                      # position interpolation factor""", 'tokens, attention_work, kv_memory, rope_scale')

P['mixture-of-experts'] = ("""total, active, experts, top_k = 46.7e9, 12.9e9, 8, 2       # Mixtral 8x7B, published counts
per_expert = (total - active) / (experts - top_k)           # total = shared + 8E, active = shared + 2E
shared = active - top_k * per_expert
share_per_expert = top_k / experts                          # tokens each expert sees under perfect balance""", 'round(per_expert / 1e9, 2), round(shared / 1e9, 2), share_per_expert')

P['scaling-laws'] = ("""C = 1e24                                        # training FLOPs budget
N = (C / (6 * 20)) ** 0.5                       # Chinchilla: C = 6ND with D = 20N
D = 20 * N
llama3_8b_ratio = 15e12 / 8e9                   # tokens per parameter: Llama 3 8B, ~15T tokens""", 'f"{N:.2e}", f"{D:.2e}", llama3_8b_ratio, llama3_8b_ratio / 20')

P['pre-training'] = ("""loss = 2.0                                       # nats per token on held-out text
perplexity = np.exp(loss)
flops = 6 * 8e9 * 15e12                         # 8B parameters, 15T tokens
gpu_flops = 989e12 * 0.40                       # an H100's dense bf16 peak at 40% utilisation
gpu_hours = flops / gpu_flops / 3600""", 'round(perplexity, 2), f"{flops:.1e}", round(gpu_hours)')

P['fine-tuning'] = ("""sft_tokens = 50_000 * 500                       # 50k examples of ~500 tokens
pretrain_tokens = 15e12
share = sft_tokens / pretrain_tokens
lima_examples = 1_000                           # the LIMA paper's whole SFT set""", 'sft_tokens, f"{share:.1e}", lima_examples')

P['lora-qlora'] = ("""params = 65e9
full_adam = params * (2 + 2 + 4 + 4 + 4) / 1e9   # fp16 weights + grads, fp32 master copy + Adam m and v
qlora_base = params * 0.5 / 1e9                   # 4-bit frozen weights
adapters = 2 * 8_192 * 64 * 4 * 80                 # rank-64 adapters on 4 projections in 80 layers
qlora_adapters = adapters * (2 + 2 + 4 + 4 + 4) / 1e9""", 'round(full_adam), round(qlora_base, 1), f"{adapters:.2e}", round(qlora_adapters, 2)')

P['rlhf'] = ("""ref = np.array([0.5, 0.3, 0.2])                 # reference policy over three answers
reward = np.array([1.0, 2.0, 4.0])              # the reward model's scores (the third one it overrates)
kl = lambda p: np.sum(p * np.log(p / ref))
objective = lambda p, beta: p @ reward - beta * kl(p)
modest, hacked = np.array([0.3, 0.45, 0.25]), np.array([0.01, 0.01, 0.98])
result = {beta: (round(objective(modest, beta), 3), round(objective(hacked, beta), 3)) for beta in (0.1, 2.0)}""", 'round(kl(modest), 3), round(kl(hacked), 3), result')

P['dpo'] = ("""sigmoid = lambda z: 1 / (1 + np.exp(-z))
beta = 0.1
chosen = (-10.0) - (-12.0)                      # log pi(y_w) - log pi_ref(y_w): the chosen answer gained 2 nats
rejected = (-14.0) - (-11.0)                    # the rejected answer lost 3
loss = -np.log(sigmoid(beta * (chosen - rejected)))
both_down = -np.log(sigmoid(beta * ((-2.0) - (-6.0))))   # chosen also falls, by 2; rejected by 6""", 'round(loss, 3), round(both_down, 3)')

P['data-curation'] = ("""import zlib
def shingles(text, k=5):
    t = text.lower()
    return {t[i:i + k] for i in range(len(t) - k + 1)}

a = 'The quick brown fox jumps over the lazy dog near the river bank today.'
b = 'The quick brown fox jumped over the lazy dog near the river bank today!'
A, B = shingles(a), shingles(b)
jaccard = len(A & B) / len(A | B)

rng = np.random.default_rng(0)
coef = rng.integers(1, 2**31 - 1, size=(256, 2))       # 256 random hash functions
h = lambda s: np.array([zlib.crc32(x.encode()) for x in s], dtype=np.int64)
minhash = lambda s: ((coef[:, :1] * h(s) + coef[:, 1:]) % (2**31 - 1)).min(axis=1)
estimate = (minhash(A) == minhash(B)).mean()            # the share of equal minima estimates Jaccard""", 'round(jaccard, 3), round(estimate, 3)')

P['decoding-strategies'] = ("""step1 = {'A': 0.6, 'B': 0.4}
step2 = {'A': {'x': 0.4, 'y': 0.35, 'z': 0.25}, 'B': {'x': 0.9, 'y': 0.05, 'z': 0.05}}
greedy_first = max(step1, key=step1.get)
greedy_best = max(step2[greedy_first].values())
greedy = (greedy_first, step1[greedy_first] * greedy_best)
beam = max((((a, b), step1[a] * pb) for a in step1 for b, pb in step2[a].items()), key=lambda c: c[1])   # width 2 keeps both first steps""", 'greedy, (beam[0], round(beam[1], 2))')

P['sampling'] = ("""logits = np.array([3.0, 2.5, 2.0, 1.0, 0.5, 0.0, -1.0, -2.0])

def probs(T):
    z = np.exp((logits - logits.max()) / T); return z / z.sum()

def nucleus_size(p, top_p=0.9):
    return int(np.searchsorted(np.cumsum(np.sort(p)[::-1]), top_p) + 1)

entropy = lambda p: -(p * np.log2(p)).sum()
table = {T: (round(entropy(probs(T)), 2), nucleus_size(probs(T))) for T in (0.7, 1.0, 1.3)}""", 'table')

P['speculative-decoding'] = ("""def tokens_per_pass(alpha, gamma=4):            # Leviathan et al.: expected tokens per target-model pass
    return (1 - alpha ** (gamma + 1)) / (1 - alpha)

table = {a: round(tokens_per_pass(a), 2) for a in (0.6, 0.8, 0.9)}""", 'table')

P['quantization'] = ("""sizes = {bits: 70e9 * bits / 8 / 1e9 for bits in (16, 8, 4)}   # a 70B model, GB
rng = np.random.default_rng(1)
w = rng.normal(0, 0.02, 4_096)
w[::512] = 0.5                                    # a few outlier weights

def int4_error(w, group):
    g = w.reshape(-1, group)
    scale = np.abs(g).max(axis=1, keepdims=True) / 7
    return np.abs(np.clip(np.round(g / scale), -7, 7) * scale - g).mean() / np.abs(w).mean()

per_tensor, per_group = int4_error(w, 4_096), int4_error(w, 128)""", 'sizes, round(per_tensor, 3), round(per_group, 3)')

P['kv-cache-opt'] = ("""rng = np.random.default_rng(2)
lengths = np.clip(rng.lognormal(np.log(400), 0.8, 64).astype(int), 16, 4_096)   # 64 live requests
reserved_contiguous = 64 * 4_096                         # a buffer for the maximum length each
reserved_paged = (np.ceil(lengths / 16) * 16).sum()      # 16-token blocks, allocated as needed
used = lengths.sum()
util = (used / reserved_contiguous, used / reserved_paged)""", 'int(used), round(util[0], 3), round(util[1], 3)')

P['batching'] = ("""rng = np.random.default_rng(3)
out = rng.integers(20, 600, size=(25, 8))              # output lengths: 25 batches of 8 requests
static_util = (out.sum(1) / (8 * out.max(1))).mean()    # each batch runs until its longest request ends
continuous_util = 1.0                                   # finished slots refilled at once (the ideal)""", 'round(static_util, 3), continuous_util')

P['prompt-engineering'] = ("""from math import comb
def majority(p, n):                               # independent samples, binary right/wrong
    return sum(comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))
votes = {n: round(majority(0.6, n), 3) for n in (1, 5, 15)}""", 'votes')

P['rag'] = ("""rng = np.random.default_rng(4)
def split_rate(chunk, overlap, span=100, doc=100_000, trials=20_000):
    step = chunk - overlap
    starts = rng.integers(0, doc - span, trials)          # where the fact begins
    k = starts // step                                    # the last chunk to start before the fact
    ok = starts + span <= k * step + chunk                # does it reach the fact's end?
    return 1 - ok.mean()
rates = {(c, o): round(split_rate(c, o), 3) for c, o in [(512, 0), (512, 64), (512, 128)]}""", 'rates')

P['embedding-search'] = ("""n, d = 1_000_000, 768
memory_gb = n * d * 4 / 1e9                      # float32
flops_per_query = n * d                          # brute force: one dot product per stored vector
pq_bytes = n * 64                                # product quantization to 64 one-byte codes
rng = np.random.default_rng(5)
X = rng.normal(size=(1_000, d)); X /= np.linalg.norm(X, axis=1, keepdims=True)
typical_cos = np.abs(X[:500] @ X[500:].T).mean()   # unrelated random vectors in 768-d""", 'memory_gb, f"{flops_per_query:.1e}", pq_bytes / 1e9, round(typical_cos, 3)')

P['function-calling'] = ("""import json
schema = {'required': ['city', 'unit'], 'types': {'city': str, 'unit': str, 'days': int},
          'enum': {'unit': ['celsius', 'fahrenheit']}}

def check(raw):
    try: args = json.loads(raw)
    except json.JSONDecodeError as e: return [f'not JSON: {e.msg}']
    errs = [f'missing {k}' for k in schema['required'] if k not in args]
    errs += [f'{k} should be {t.__name__}' for k, t in schema['types'].items() if k in args and not isinstance(args[k], t)]
    errs += [f'{k} not in {v}' for k, v in schema['enum'].items() if k in args and args[k] not in v]
    return errs

calls = ['{"city": "Aarhus", "unit": "celsius"}', '{"city": "Aarhus", "days": "3"}', '{"city": "Aarhus", "unit": "kelvin"', '{"city": "Aarhus", "unit": "K"}']
results = [check(c) for c in calls]""", 'results')

P['agents'] = ("""chain = {steps: round(0.95 ** steps, 3) for steps in (5, 10, 20)}   # each step right 95% of the time
retry = round((1 - 0.05 ** 2) ** 20, 3)          # 20 steps, each checked and retried once on failure""", 'chain, retry')

P['evaluation'] = ("""def ci95(acc, n):
    return 1.96 * np.sqrt(acc * (1 - acc) / n)

small = ci95(0.86, 1_000)                       # a 1,000-question benchmark
mmlu = ci95(0.86, 14_042)                       # MMLU's test set
gap = 0.875 - 0.86
se_diff = np.sqrt(2) * small / 1.96             # two independent models on the 1,000 questions
z = gap / se_diff""", 'round(small * 100, 2), round(mmlu * 100, 2), round(z, 2)')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
