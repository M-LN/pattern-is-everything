# ML Math snippets: each small, numpy only, with its own numbers (made up or
# simulated unless a comment says otherwise). Running this file executes
# every snippet and prints what the worked example quotes.
import numpy as np

P = {}

P['vectors'] = ("""a, b = np.array([1, 2, 3]), np.array([4, 5, 6])
dot = a @ b
cos = dot / (np.linalg.norm(a) * np.linalg.norm(b))
angle = np.degrees(np.arccos(cos))
A, B = np.ones((2, 3)), np.ones((3, 4))
shape = (A @ B).shape                       # (2,3) x (3,4): inner sizes must match
transpose_rule = np.allclose((A @ B).T, B.T @ A.T)""", 'dot, cos, angle, shape, transpose_rule')

P['linear'] = ("""x = np.array([1, 2, 3, 4, 5, 6], dtype=float)
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1, 12.2])            # made up, roughly y = 2x
X = np.column_stack([x, np.ones_like(x)])
(w, b), *_ = np.linalg.lstsq(X, y, rcond=None)             # least squares, closed form
mse = np.mean((y - (w * x + b)) ** 2)""", 'w, b, mse')

P['logistic'] = ("""sigmoid = lambda z: 1 / (1 + np.exp(-z))
bce = lambda y, p: -(y * np.log(p) + (1 - y) * np.log(1 - p))
w, b, x = 1.5, -2.0, 3.0
p = sigmoid(w * x + b)                      # P(y = 1 | x)
loss_right = bce(1, 0.9)                    # confident and right
loss_wrong = bce(1, 0.1)                    # confident and wrong
grad_w = (p - 1) * x                        # dBCE/dw for a true label y = 1""", 'p, loss_right, loss_wrong, grad_w')

P['gradient'] = ("""def descend(lr, steps=10, w=0.0):
    for _ in range(steps):
        w -= lr * 2 * (w - 3)               # gradient of (w - 3)^2
    return w

good = descend(0.1)                          # converging towards 3
too_big = descend(1.1)                       # each step overshoots further""", 'good, too_big')

P['activation'] = ("""rng = np.random.default_rng(0)
W1, W2 = rng.normal(size=(8, 4)), rng.normal(size=(3, 8))
x = rng.normal(size=(4, 100))
two_linear = W2 @ (W1 @ x)
one_linear = (W2 @ W1) @ x                  # the same map, one matrix
collapse_gap = np.abs(two_linear - one_linear).max()
with_relu = W2 @ np.maximum(W1 @ x, 0)
relu_gap = np.abs(with_relu - one_linear).max()""", 'collapse_gap, relu_gap')

P['bias-variance'] = ("""rng = np.random.default_rng(1)
f = lambda x: np.sin(2 * np.pi * x)
x_test = np.linspace(0.05, 0.95, 50)

def bias_var(degree, sets=200, n=30, noise=0.3):
    preds = []
    for _ in range(sets):                    # many training sets from the same world
        x = rng.random(n); y = f(x) + rng.normal(0, noise, n)
        preds.append(np.polyval(np.polyfit(x, y, degree), x_test))
    preds = np.array(preds)
    return ((preds.mean(0) - f(x_test)) ** 2).mean(), preds.var(0).mean()

result = {d: np.round(bias_var(d), 3).tolist() for d in (1, 3, 9)}   # degree: [bias^2, variance]""", 'result')

P['loss'] = ("""y = np.array([1, 2, 2, 3, 30.0])               # one outlier
c = np.linspace(0, 30, 30001)                      # candidate constant predictions
mse = ((y[:, None] - c) ** 2).mean(0)
mae = np.abs(y[:, None] - c).mean(0)
best_mse, best_mae = c[mse.argmin()], c[mae.argmin()]   # the mean and the median""", 'best_mse, best_mae, y.mean(), np.median(y)')

P['backprop'] = ("""x, t = 2.0, 1.0                                  # input and target
w1, w2 = 0.5, -1.5

def loss(w1, w2):
    h = max(w1 * x, 0)                             # ReLU hidden unit
    return 0.5 * (w2 * h - t) ** 2

h = max(w1 * x, 0); y = w2 * h
dL_dy = y - t
grad_w2 = dL_dy * h                                # chain rule, backwards
grad_w1 = dL_dy * w2 * (1 if w1 * x > 0 else 0) * x
eps = 1e-6                                         # check against finite differences
num_w1 = (loss(w1 + eps, w2) - loss(w1 - eps, w2)) / (2 * eps)""", 'grad_w1, num_w1, grad_w2')

P['optimizers'] = ("""grad = lambda p: np.array([p[0], 50 * p[1]])        # f = 0.5 (x^2 + 50 y^2): a narrow valley
f = lambda p: 0.5 * (p[0] ** 2 + 50 * p[1] ** 2)

def steps_to(update, tol=1e-3, limit=10_000):
    p, state = np.array([10.0, 1.0]), {}
    for k in range(1, limit + 1):
        p = update(p, grad(p), state, k)
        if f(p) < tol: return k
    return limit

def sgd(p, g, s, k): return p - 0.035 * g
def momentum(p, g, s, k):
    s['v'] = 0.9 * s.get('v', 0) - 0.035 * g; return p + s['v']
def adam(p, g, s, k, lr=0.5, b1=0.9, b2=0.999):
    s['m'] = b1 * s.get('m', 0) + (1 - b1) * g; s['v'] = b2 * s.get('v', 0) + (1 - b2) * g * g
    m, v = s['m'] / (1 - b1 ** k), s['v'] / (1 - b2 ** k)
    return p - lr * m / (np.sqrt(v) + 1e-8)

result = {name: steps_to(u) for name, u in [('sgd', sgd), ('momentum', momentum), ('adam', adam)]}""", 'result')

P['regularization'] = ("""rng = np.random.default_rng(2)
x1 = rng.normal(size=50)
x2 = x1 + rng.normal(0, 0.01, 50)                  # almost a copy of x1
X = np.column_stack([x1, x2])
y = x1 + x2 + rng.normal(0, 0.5, 50)               # the truth: weights 1 and 1
ols = np.linalg.solve(X.T @ X, X.T @ y)
ridge = np.linalg.solve(X.T @ X + 1.0 * np.eye(2), X.T @ y)   # L2 penalty, lambda = 1""", 'ols.round(2), ridge.round(2)')

P['batchnorm'] = ("""rng = np.random.default_rng(3)
acts = rng.normal(5, 3, size=(64, 4))              # a batch of 64, four units
xhat = (acts - acts.mean(0)) / np.sqrt(acts.var(0) + 1e-5)
after = (xhat.mean(0).round(6).tolist(), xhat.std(0).round(3).tolist())
# how noisy the batch mean is as an estimate of the true mean (5)
noise = {m: np.std([rng.normal(5, 3, m).mean() for _ in range(2000)]).round(3) for m in (2, 64)}""", 'after, noise')

P['lr-schedule'] = ("""lr_max, lr_min, warmup, total = 3e-4, 3e-5, 1_000, 10_000

def lr(t):
    if t < warmup: return lr_max * t / warmup                     # linear warmup
    progress = (t - warmup) / (total - warmup)
    return lr_min + 0.5 * (lr_max - lr_min) * (1 + np.cos(np.pi * progress))   # cosine decay

schedule = {t: float(f'{lr(t):.2e}') for t in (0, 500, 1_000, 5_500, 10_000)}""", 'schedule')

P['weight-init'] = ("""rng = np.random.default_rng(4)

def final_std(scale, layers=20, width=256):
    h = rng.normal(size=(width, 100))
    for _ in range(layers):
        W = rng.normal(0, scale, (width, width))
        h = np.maximum(W @ h, 0)                   # ReLU layers
    return h.std()

naive = final_std(1.0)                             # N(0, 1) weights
he = final_std(np.sqrt(2 / 256))                   # He: variance 2 / fan_in
tiny = final_std(0.01)""", 'naive, he, tiny')

P['grad-clip'] = ("""g = np.array([30.0, -40.0, 0.5])                    # an exploding gradient, norm about 50
max_norm = 1.0
by_norm = g * min(1, max_norm / np.linalg.norm(g))
by_value = np.clip(g, -1, 1)
cos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))""", 'np.linalg.norm(g), by_norm.round(3), cos(g, by_norm), by_value, cos(g, by_value)')

P['softmax'] = ("""def softmax(z, T=1.0):
    z = np.asarray(z, float) / T
    e = np.exp(z - z.max())                        # subtract the max: same result, no overflow
    return e / e.sum()

p = softmax([2.0, 1.0, 0.1])
cold, hot = softmax([2.0, 1.0, 0.1], T=0.5), softmax([2.0, 1.0, 0.1], T=2.0)
with np.errstate(over='ignore', invalid='ignore'):
    naive = np.exp([1000.0, 1001.0]) / np.exp([1000.0, 1001.0]).sum()   # overflows
stable = softmax([1000.0, 1001.0])""", 'p.round(3), cold.round(3), hot.round(3), naive, stable.round(3)')

P['mle'] = ("""heads, n = 7, 10
p = np.linspace(0.01, 0.99, 99)
loglik = heads * np.log(p) + (n - heads) * np.log(1 - p)
p_hat = p[loglik.argmax()]                          # the MLE: 7/10
x = np.array([4.0, 6.0, 5.0, 9.0, 6.0])
mu_hat = x.mean()
var_mle = ((x - mu_hat) ** 2).mean()                # MLE divides by n, not n - 1
var_unbiased = x.var(ddof=1)""", 'p_hat, mu_hat, var_mle, var_unbiased')

P['entropy'] = ("""H = lambda p: -np.sum(np.asarray(p) * np.log2(p))
fair, loaded, eight = H([0.5, 0.5]), H([0.9, 0.1]), H(np.full(8, 1 / 8))
p, q = np.array([0.9, 0.1]), np.array([0.5, 0.5])
cross = -np.sum(p * np.log2(q))                      # coding p's outcomes with q's code""", 'fair, loaded, eight, cross')

P['kl-div'] = ("""kl = lambda p, q: np.sum(p * np.log(p / q))
P_, Q_ = np.array([0.5, 0.5]), np.array([0.9, 0.1])
kl_pq, kl_qp = kl(P_, Q_), kl(Q_, P_)               # not symmetric""", 'kl_pq, kl_qp')

P['bayes'] = ("""prior = 0.01                          # 1% have the condition
sens, spec = 0.99, 0.95               # P(+ | sick), P(- | healthy)
p_pos = sens * prior + (1 - spec) * (1 - prior)
posterior = sens * prior / p_pos      # P(sick | +)
second = sens * posterior / (sens * posterior + (1 - spec) * (1 - posterior))   # after a second positive test""", 'p_pos, posterior, second')

P['crossval'] = ("""rng = np.random.default_rng(5)
correct = rng.random(100) < 0.8           # a model that is right on 80 of 100 cases, fixed
single = []
for _ in range(2000):                      # one random 80/20 split each time
    test = rng.permutation(100)[:20]
    single.append(correct[test].mean())
lo, hi = np.percentile(single, [5, 95])
five_fold = np.mean([correct[k::5].mean() for k in range(5)])   # every case tested once""", 'correct.mean(), lo, hi, five_fold')

P['metrics'] = ("""tp, fp, fn, tn = 40, 10, 20, 930
precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)
accuracy = (tp + tn) / (tp + fp + fn + tn)""", 'precision, recall, f1, accuracy')

P['cosine-sim'] = ("""a, b = np.array([1.0, 2.0, 0.0]), np.array([2.0, 4.0, 0.0])    # same direction, twice as long
c = np.array([0.0, 0.0, 3.0])
cos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))
result = dict(cos_ab=cos(a, b), dist_ab=np.linalg.norm(a - b), cos_ac=cos(a, c))
unit = lambda v: v / np.linalg.norm(v)
dot_of_units = unit(a) @ unit(b)                  # on normalized vectors, dot product = cosine""", 'result, dot_of_units')

P['cnn'] = ("""out = lambda W, K, P, S: (W - K + 2 * P) // S + 1
size = out(224, 3, 1, 2)                          # 224x224 input, 3x3 kernel, padding 1, stride 2
conv_params = 3 * 3 * 64 * 128 + 128              # 64 -> 128 channels, shared across positions
dense_params = (224 * 224 * 64) * (112 * 112 * 128)  # a fully connected layer between the same shapes""", 'size, conv_params, f"{dense_params:.2e}"')

P['embeddings'] = ("""E = {'king': [0.9, 0.8, 0.1], 'queen': [0.9, 0.1, 0.8], 'man': [0.1, 0.9, 0.1],
     'woman': [0.1, 0.2, 0.8], 'apple': [0.0, 0.3, 0.3]}           # hand-made 3-d vectors
E = {w: np.array(v) for w, v in E.items()}
target = E['king'] - E['man'] + E['woman']
cos = lambda u, v: u @ v / (np.linalg.norm(u) * np.linalg.norm(v))
ranked = sorted(E, key=lambda w: -cos(E[w], target))
best_excluding_inputs = [w for w in ranked if w not in ('king', 'man', 'woman')][0]""", 'ranked, best_excluding_inputs')

P['attention'] = ("""rng = np.random.default_rng(6)
softmax = lambda z: np.exp(z - z.max()) / np.exp(z - z.max()).sum()
d = 512
q, K = rng.normal(size=d), rng.normal(size=(10, d))   # one query, ten keys
raw = softmax(K @ q).max()                             # unscaled scores grow with sqrt(d)
scaled = softmax(K @ q / np.sqrt(d)).max()""", 'raw, scaled')

P['transformer'] = ("""d, ff, layers, vocab = 768, 3072, 12, 50_257          # GPT-2 small
attn = 4 * d * d + 4 * d                             # Q, K, V and output projections
mlp = 2 * d * ff + ff + d
norms = 2 * 2 * d
per_layer = attn + mlp + norms
embeddings = vocab * d + 1024 * d                    # tokens + 1,024 learned positions
total = layers * per_layer + embeddings + 2 * d       # + final LayerNorm""", 'per_layer, total')

P['normalization'] = ("""x = np.array([2.0, 4.0, 6.0, 8.0])
layer = (x - x.mean()) / np.sqrt(x.var() + 1e-5)     # LayerNorm, before gamma and beta
rms = x / np.sqrt((x ** 2).mean() + 1e-5)             # RMSNorm: no mean subtraction
shifted = x + 100                                     # add the same constant to every feature
layer_shift = (shifted - shifted.mean()) / np.sqrt(shifted.var() + 1e-5)
rms_shift = shifted / np.sqrt((shifted ** 2).mean() + 1e-5)""", 'layer.round(3), rms.round(3), np.allclose(layer, layer_shift), rms_shift.round(3)')

P['rnn'] = ("""steps = 50
vanish, explode = 0.9 ** steps, 1.1 ** steps      # gradient factor through 50 steps, per-step gain 0.9 or 1.1""", 'vanish, explode')

P['lstm'] = ("""keep = {f: f ** 100 for f in (0.9, 0.99, 0.999)}      # share of the cell state left after 100 steps
span = {f: 1 / (1 - f) for f in (0.9, 0.99, 0.999)}    # rough memory length in steps""", '{k: float(f"{v:.3g}") for k, v in keep.items()}, span')

P['gru'] = ("""x, h = 128, 256
gate = h * (h + x) + h                  # one gate: weights on [h, x] plus bias
lstm, gru = 4 * gate, 3 * gate          # LSTM: four blocks; GRU: three""", 'lstm, gru, gru / lstm')

P['pca'] = ("""rng = np.random.default_rng(7)
X = rng.multivariate_normal([0, 0], [[3, 2], [2, 2]], size=5_000)
X = X - X.mean(0)
vals, vecs = np.linalg.eigh(np.cov(X.T))
vals = vals[::-1]
explained = vals / vals.sum()""", 'vals.round(2), explained.round(3)')

P['svd'] = ("""rng = np.random.default_rng(8)
U, _ = np.linalg.qr(rng.normal(size=(50, 50)))
V, _ = np.linalg.qr(rng.normal(size=(50, 50)))
s = 0.7 ** np.arange(50)                         # singular values that decay
A = U @ np.diag(s) @ V.T
k = 5
A_k = U[:, :k] @ np.diag(s[:k]) @ V[:, :k].T     # best rank-5 approximation
energy = (s[:k] ** 2).sum() / (s ** 2).sum()
rel_err = np.linalg.norm(A - A_k) / np.linalg.norm(A)
numbers = (50 * 50, k * (50 + 50 + 1))           # entries stored: full vs rank-5""", 'energy, rel_err, numbers')

P['vae'] = ("""rng = np.random.default_rng(9)
mu, sigma = 1.0, 0.5                             # what the encoder outputs for one input
z = mu + sigma * rng.normal(size=5)              # reparameterization: randomness moved into eps
kl = 0.5 * (sigma ** 2 + mu ** 2 - 1 - np.log(sigma ** 2))   # KL(N(mu, sigma^2) || N(0, 1))""", 'z.round(2), kl')

P['diffusion'] = ("""T = 1000
beta = np.linspace(1e-4, 0.02, T)                # DDPM's linear noise schedule
alpha_bar = np.cumprod(1 - beta)
signal = {t: float(np.sqrt(alpha_bar[t - 1]).round(4)) for t in (1, 100, 500, 1000)}   # share of the original left""", 'signal')

P['gan'] = ("""from math import erf, sqrt, exp, pi
pdf = lambda x, m: exp(-(x - m) ** 2 / 2) / sqrt(2 * pi)
d_star = lambda x, m_g: pdf(x, 0) / (pdf(x, 0) + pdf(x, m_g))   # best discriminator: data at 0, generator at m_g
far = [round(d_star(x, 3), 3) for x in (-1, 0, 1.5, 3)]
equal = [round(d_star(x, 0), 3) for x in (-1, 0, 1.5, 3)]       # generator matches the data
value_at_equilibrium = 2 * np.log(0.5)""", 'far, equal, value_at_equilibrium')

P['tokenization'] = ("""from collections import Counter
words = {'l o w </w>': 5, 'l o w e r </w>': 2, 'n e w e s t </w>': 6, 'w i d e s t </w>': 3}   # word -> count
merges = []
for _ in range(4):
    pairs = Counter()
    for w, n in words.items():
        s = w.split()
        for a, b in zip(s, s[1:]): pairs[a, b] += n
    best = max(pairs, key=pairs.get)
    merges.append(''.join(best))
    words = {w.replace(' '.join(best), ''.join(best)): n for w, n in words.items()}""", 'merges, list(words)')

P['lora'] = ("""d, r = 4096, 16
full = d * d
lora = 2 * d * r                                   # B (d x r) and A (r x d)
rng = np.random.default_rng(10)
B, A = rng.normal(size=(64, 4)), rng.normal(size=(4, 64))
rank = np.linalg.matrix_rank(B @ A)                # an update of rank at most r""", 'full, lora, lora / full, rank')

P['rlhf'] = ("""sigmoid = lambda z: 1 / (1 + np.exp(-z))
p_prefer = sigmoid(1.0)                             # Bradley-Terry: reward gap of 1 -> P(chosen beats rejected)
beta = 0.1
dpo_loss = lambda margin: -np.log(sigmoid(beta * margin))   # margin = difference of log-ratios vs the reference
losses = {m: round(float(dpo_loss(m)), 3) for m in (0, 10, 30)}""", 'p_prefer, losses')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
