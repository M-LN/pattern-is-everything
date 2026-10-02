# MLOps snippets, each with its own small example numbers (made up or
# simulated unless a comment says otherwise). Running this file executes
# every snippet and prints what the worked example quotes.
import numpy as np
import pandas as pd

P = {}

P['model-packaging'] = ("""import hashlib
weights = np.arange(6, dtype=np.float32).reshape(2, 3)     # the trained model, tiny here

def artifact_id(weights, requirements):                    # identity = model bytes + the environment it needs
    h = hashlib.sha256(weights.tobytes())
    h.update(requirements.encode())
    return h.hexdigest()[:12]

a = artifact_id(weights, 'numpy==1.26.4\\nscikit-learn==1.4.2')
b = artifact_id(weights, 'numpy==2.0.0\\nscikit-learn==1.4.2')     # same weights, one pin changed""", 'a, b, a == b')

P['serving-patterns'] = ("""entities = 1_000_000                   # customers that could be scored
requested = 50_000                     # customers actually looked up per day
batch = dict(scored=entities, avg_age_h=24 / 2)            # nightly batch: everyone, results half a day old on average
online = dict(scored=requested, avg_age_h=0)               # online: only who is asked for, scored on the spot
waste = 1 - requested / entities                           # share of batch scores nobody reads""", 'batch, online, waste')

P['ab-rollout'] = ("""from scipy.stats import norm
p0, p1 = 0.010, 0.015                  # error rate today, and the regression we want to catch
alpha, power = 0.05, 0.80
z = norm.ppf(1 - alpha / 2) + norm.ppf(power)
n = z**2 * (p0 * (1 - p0) + p1 * (1 - p1)) / (p1 - p0) ** 2    # requests needed in each arm
daily = 100_000
days_at_5pct = n / (0.05 * daily)       # canary gets 5% of traffic""", 'round(n), days_at_5pct')

P['latency-throughput'] = ("""rng = np.random.default_rng(0)
lat = rng.lognormal(mean=np.log(40), sigma=0.6, size=100_000)   # simulated latencies in ms
p50, p99 = np.percentile(lat, [50, 99])
slow_one = 0.01                                # each backend call is slow 1% of the time
slow_fanout = 1 - (1 - slow_one) ** 10          # a request that waits on 10 such calls
in_flight = 200 * 0.050                         # Little: 200 requests/s x 50 ms = requests in progress""", 'p50, p99, slow_fanout, in_flight')

P['gpu-inference'] = ("""params = 7e9                           # a 7B-parameter model
bytes_per = 2                          # fp16
weights_gb = params * bytes_per / 1e9
bandwidth_gb_s = 2000                  # memory bandwidth of a modern data-centre GPU, ~2 TB/s
tokens_s_batch1 = bandwidth_gb_s / weights_gb      # each new token reads every weight once
tokens_s_batch16 = 16 * tokens_s_batch1            # one read serves 16 sequences (until compute-bound)""", 'weights_gb, tokens_s_batch1, tokens_s_batch16')

P['drift-detection'] = ("""from scipy.stats import ks_2samp
expected = np.array([0.10, 0.20, 0.40, 0.20, 0.10])     # share of training data in five score bins
actual   = np.array([0.05, 0.15, 0.35, 0.25, 0.20])     # the same bins this week
psi = np.sum((actual - expected) * np.log(actual / expected))

rng = np.random.default_rng(1)                           # a shift too small to matter...
train, live = rng.normal(0, 1, 200_000), rng.normal(0.02, 1, 200_000)
ks_p = ks_2samp(train, live).pvalue                      # ...is still "significant" with this much data""", 'psi, ks_p')

P['model-monitoring'] = ("""rng = np.random.default_rng(2)
n = 5_000                                                 # predictions per day
rate = np.r_[np.full(20, 0.08), np.full(10, 0.11)]        # share predicted positive; it shifts on day 20
pos = rng.binomial(n, rate) / n
base = pos[:14].mean()                                    # two weeks of baseline
limit = 3 * np.sqrt(base * (1 - base) / n)                # p-chart control limits
flagged = np.where(np.abs(pos - base) > limit)[0]""", 'round(base, 4), round(limit, 4), flagged[:3].tolist()')

P['alerting-slos'] = ("""slo = 0.995                            # 99.5% of requests succeed within 200 ms, over 30 days
requests = 10_000_000
budget = (1 - slo) * requests          # failures you are allowed in the window
error_rate = 0.02                      # what is happening right now
burn = error_rate / (1 - slo)          # how many times faster than allowed
days_left = 30 / burn                  # budget gone at this pace""", 'budget, burn, days_left')

P['shadow-scoring'] = ("""from scipy.stats import binomtest
rng = np.random.default_rng(3)

def shadow(n, p_champ=0.90, p_chal=0.91):           # both models score the same n labelled requests
    champ = rng.random(n) < p_champ
    chal = np.where(rng.random(n) < 0.5, champ, rng.random(n) < p_chal)   # they agree half the time by construction
    only_chal, only_champ = (chal & ~champ).sum(), (champ & ~chal).sum()
    return binomtest(only_chal, only_chal + only_champ).pvalue           # McNemar's exact test

p_2k, p_20k = shadow(2_000), shadow(20_000)""", 'p_2k, p_20k')

P['data-quality'] = ("""batch = pd.DataFrame({'age': [34, 51, None, 29, 230, 45],
                      'income': [52_000, 61_000, 48_000, None, None, 75_000],
                      'ts': pd.to_datetime(['2026-09-30 22:00'] * 6)})
now, expected_rows = pd.Timestamp('2026-10-01 09:00'), 6
checks = {
    'row count': len(batch) >= 0.5 * expected_rows,
    'age nulls <= 5%': batch.age.isna().mean() <= 0.05,
    'age in 0-120': batch.age.dropna().between(0, 120).all(),
    'income nulls <= 5%': batch.income.isna().mean() <= 0.05,
    'fresh within 24 h': (now - batch.ts.max()) <= pd.Timedelta('24h'),
}
failed = [name for name, ok in checks.items() if not ok]""", 'failed')

P['ml-pipelines'] = ("""minutes = {'ingest': 20, 'validate': 5, 'features': 40, 'labels': 15,
           'train': 90, 'evaluate': 10, 'deploy': 5}
needs = {'validate': ['ingest'], 'features': ['validate'], 'labels': ['validate'],
         'train': ['features', 'labels'], 'evaluate': ['train'], 'deploy': ['evaluate']}

def finish(step, cache=()):                         # earliest finish, with unlimited parallel workers
    start = max((finish(d, cache) for d in needs.get(step, [])), default=0)
    return start + (0 if step in cache else minutes[step])

total = finish('deploy')
cached = finish('deploy', cache={'ingest', 'validate', 'features'})   # retrain on cached features
serial = sum(minutes.values())""", 'total, cached, serial')

P['feature-stores'] = ("""events = pd.DataFrame({'user': [1, 1, 2], 'ts': pd.to_datetime(['2026-03-01', '2026-03-10', '2026-03-05'])})
feats = pd.DataFrame({'user': [1, 1, 2, 2], 'ts': pd.to_datetime(['2026-02-20', '2026-03-08', '2026-03-01', '2026-03-09']),
                      'orders_30d': [2, 5, 1, 4]})
latest = events.merge(feats.sort_values('ts').groupby('user').tail(1)[['user', 'orders_30d']], on='user')
as_of = pd.merge_asof(events.sort_values('ts'), feats.sort_values('ts'), on='ts', by='user')   # point-in-time
leaked = (latest.sort_values(['user', 'ts']).orders_30d.values != as_of.sort_values(['user', 'ts']).orders_30d.values).sum()""",
 'latest.orders_30d.tolist(), as_of.sort_values(["user", "ts"]).orders_30d.tolist(), leaked')

P['experiment-tracking'] = ("""runs = pd.DataFrame({'config': ['A'] * 5 + ['B'] * 5,
                     'seed': list(range(5)) * 2,
                     'auc': [0.842, 0.851, 0.838, 0.847, 0.845,      # five seeds of each config, made up
                             0.849, 0.836, 0.853, 0.841, 0.846]})
best = runs.loc[runs.auc.idxmax()]
by_config = runs.groupby('config').auc.agg(['mean', 'std'])""", 'best.config, best.auc, by_config.round(4).to_dict("index")')

P['ci-cd-ml'] = ("""holdout = pd.DataFrame({'segment': ['new', 'returning', 'enterprise'],
                        'n': [8_000, 11_000, 1_000],
                        'champion': [0.880, 0.910, 0.900],
                        'candidate': [0.895, 0.918, 0.860]})      # accuracy per segment
overall = lambda col: (holdout[col] * holdout.n).sum() / holdout.n.sum()
better_overall = overall('candidate') > overall('champion')
worst_drop = (holdout.candidate - holdout.champion).min()
ship = better_overall and worst_drop >= -0.01            # gate: no segment may lose more than one point""",
 'round(overall("champion"), 4), round(overall("candidate"), 4), round(worst_drop, 3), ship')

P['orchestration'] = ("""p_fail = 0.20                          # a task fails transiently one time in five
retries = 3
p_success = 1 - p_fail ** (retries + 1)
backoff = [30 * 2 ** k for k in range(retries)]           # seconds between attempts: exponential
backfill_runs = 90                                         # a daily DAG re-run for the last 90 days""", 'p_success, backoff, backfill_runs')

P['model-compression'] = ("""rng = np.random.default_rng(4)
x = rng.normal(0, 1, (1_000, 256))                 # a batch of inputs

def prune_error(W, keep=0.20):                     # keep the largest 20% of weights by size
    cut = np.quantile(np.abs(W), 1 - keep)
    Wp = np.where(np.abs(W) >= cut, W, 0)
    return np.linalg.norm(x @ Wp - x @ W) / np.linalg.norm(x @ W)

even = prune_error(rng.normal(0, 1, (256, 256)))            # weights all of similar size
peaked = prune_error(rng.standard_t(1.5, (256, 256)))       # a few large weights and many near zero""", 'even, peaked')

P['quantization'] = ("""rng = np.random.default_rng(5)
w = rng.normal(0, 0.02, 10_000).astype(np.float32)

def int8_error(w):                                 # symmetric per-tensor INT8
    scale = np.abs(w).max() / 127
    q = np.clip(np.round(w / scale), -127, 127)
    return np.abs(q * scale - w).mean() / np.abs(w).mean()

err = int8_error(w)
w_out = w.copy(); w_out[0] = 1.0                   # one outlier weight, 50 standard deviations out
err_outlier = int8_error(w_out)
memory_saving = 32 / 8""", 'err, err_outlier, memory_saving')

P['caching-layers'] = ("""keys = 1_000_000
rank = np.arange(1, keys + 1)
share = (1 / rank) / (1 / rank).sum()             # Zipf: the k-th most popular key gets traffic ~ 1/k
hit_rate = share[: keys // 100].sum()             # cache the top 1% of keys
latency = hit_rate * 1 + (1 - hit_rate) * 50       # ms: 1 from cache, 50 from the model""", 'hit_rate, latency')

P['auto-scaling'] = ("""import math
rps, latency_s, per_replica = 1_200, 0.080, 8       # traffic, time per request, concurrent requests per replica
in_flight = rps * latency_s                         # Little's law
replicas = math.ceil(in_flight / (per_replica * 0.70))   # target 70% utilisation
current, cpu, target = 10, 0.92, 0.70
hpa = math.ceil(current * cpu / target)             # Kubernetes HPA rule""", 'in_flight, replicas, hpa')

P['cost-governance'] = ("""gpu_per_hour = 2.50                        # dollars, on demand
capacity = 400                             # predictions per second at full use

def cost_per_1k(utilisation):
    return gpu_per_hour / (capacity * utilisation * 3600) * 1000

low, high = cost_per_1k(0.30), cost_per_1k(0.80)""", 'low, high, low / high')

P['model-registry'] = ("""registry = {'fraud': {'v7': 'archived', 'v8': 'production', 'v9': 'staging'}}
history = ['v7', 'v8']                                   # production versions, oldest first

def promote(name, version):
    reg = registry[name]
    for v, stage in reg.items():
        if stage == 'production': reg[v] = 'archived'
    reg[version] = 'production'; history.append(version)

def rollback(name):
    history.pop(); promote(name, history.pop())

promote('fraud', 'v9')
rollback('fraud')                                        # v9 misbehaves: one call back to v8
live = [v for v, s in registry['fraud'].items() if s == 'production']""", 'live, registry["fraud"]')

P['lineage-tracking'] = ("""edges = {'raw/2026-09-28': ['features/v12'], 'raw/2026-09-29': ['features/v12'],
         'features/v12': ['model/fraud-v9', 'model/churn-v4'],
         'model/fraud-v9': ['preds/fraud-0930'], 'model/churn-v4': ['preds/churn-0930', 'dashboard/retention']}

def downstream(node):                                    # everything built from a node
    seen, stack = set(), [node]
    while stack:
        for nxt in edges.get(stack.pop(), []):
            if nxt not in seen: seen.add(nxt); stack.append(nxt)
    return sorted(seen)

affected = downstream('raw/2026-09-29')                  # this partition turned out to be corrupt""", 'affected')

P['fairness-audits'] = ("""g = pd.DataFrame({'group': ['a', 'b'],
                  'tp': [300, 120], 'fn': [100, 80],      # among people who would repay
                  'fp': [60, 40], 'tn': [540, 760]})       # among people who would not
g['selection'] = (g.tp + g.fp) / (g.tp + g.fn + g.fp + g.tn)
g['tpr'] = g.tp / (g.tp + g.fn)
g['fpr'] = g.fp / (g.fp + g.tn)
disparate_impact = g.selection[1] / g.selection[0]        # four-fifths rule: worry below 0.8""",
 'g[["group", "selection", "tpr", "fpr"]].round(3).to_dict("records"), round(disparate_impact, 3)')

P['reproducibility'] = ("""x = np.random.default_rng(6).normal(0, 1, 1_000_000).astype(np.float32)
s1 = x.sum()
s2 = x[np.random.default_rng(7).permutation(len(x))].sum()   # same numbers, different order
order_diff = abs(float(s1) - float(s2))
same_seed = np.random.default_rng(42).random(3).tolist() == np.random.default_rng(42).random(3).tolist()""", 'order_diff, same_seed')

P['incident-response'] = ("""rps = 50                                   # requests per second
bad_from = 0                               # a bad model goes live at t = 0
detect_manual = 45 * 60                    # someone notices after 45 minutes
detect_breaker = 2 * 60                    # error rate > 5% over a 2-minute window trips the breaker
rollback = 5 * 60                          # manual rollback takes 5 minutes
hit_manual = rps * (detect_manual + rollback)
hit_breaker = rps * detect_breaker          # the breaker switches to the fallback at once""", 'hit_manual, hit_breaker, hit_manual / hit_breaker')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np, 'pd': pd}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
