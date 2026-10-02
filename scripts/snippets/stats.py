# The Toolkit snippets: numpy, pandas and scipy, each simulating or making
# up its own data. Running this file executes every snippet and prints what
# the worked example quotes.
import numpy as np
import pandas as pd

P = {}

P['confusion-matrix'] = ("""rng = np.random.default_rng(0)
y = rng.random(2_000) < 0.2                                   # 20% positives
score = np.clip(rng.normal(np.where(y, 0.65, 0.35), 0.18), 0, 1)
table = {}
for th in (0.3, 0.5, 0.7):
    pred = score >= th
    tp, fp, fn = (pred & y).sum(), (pred & ~y).sum(), (~pred & y).sum()
    table[th] = (round(tp / (tp + fp), 2), round(tp / (tp + fn), 2))     # (precision, recall)""", 'table')

P['roc-auc'] = ("""from scipy.stats import rankdata
rng = np.random.default_rng(1)
pos, neg = rng.normal(1.0, 1, 300), rng.normal(0, 1, 700)
ranks = rankdata(np.r_[pos, neg])
auc_rank = (ranks[:300].sum() - 300 * 301 / 2) / (300 * 700)      # Mann-Whitney U, scaled
auc_pairs = (pos[:, None] > neg[None, :]).mean()                   # P(random positive outranks random negative)""", 'round(auc_rank, 4), round(auc_pairs, 4)')

P['regression-metrics'] = ("""y = np.array([10.0, 12, 11, 13, 12, 14, 11, 13])
model = np.array([12.5, 10, 13, 11, 14, 12, 13.5, 11])          # a model that learned the wrong pattern
r2 = 1 - ((y - model) ** 2).sum() / ((y - y.mean()) ** 2).sum()
mae, rmse = np.abs(y - model).mean(), np.sqrt(((y - model) ** 2).mean())""", 'round(r2, 2), round(mae, 2), round(rmse, 2)')

P['cross-validation'] = ("""rng = np.random.default_rng(2)
y = np.r_[np.ones(5), np.zeros(95)]                 # 5 positives in 100
empty = 0
for _ in range(10_000):                              # plain 5-fold on a shuffled order
    folds = rng.permutation(y).reshape(5, 20)
    empty += (folds.sum(axis=1) == 0).any()
p_some_fold_without_positives = empty / 10_000""", 'p_some_fold_without_positives')

P['comparing-runs'] = ("""from scipy.stats import ttest_ind, ttest_rel
a = np.array([0.81, 0.86, 0.78, 0.90, 0.84])        # model A, five CV folds
b = a + np.array([0.012, 0.009, 0.011, 0.008, 0.010])   # B is a little better on every fold
p_unpaired = ttest_ind(b, a).pvalue
p_paired = ttest_rel(b, a).pvalue""", 'round(p_unpaired, 3), f"{p_paired:.1e}"')

P['learning-curves'] = ("""rng = np.random.default_rng(3)
f = lambda x: np.sin(3 * x)
x_val = rng.uniform(-1, 1, 2_000); y_val = f(x_val) + rng.normal(0, 0.3, 2_000)
gaps = {}
for n in (20, 80, 320):
    x = rng.uniform(-1, 1, n); y = f(x) + rng.normal(0, 0.3, n)
    c = np.polyfit(x, y, 7)
    train = ((np.polyval(c, x) - y) ** 2).mean(); val = ((np.polyval(c, x_val) - y_val) ** 2).mean()
    gaps[n] = (round(train, 3), round(val, 3))""", 'gaps')

P['shap-values'] = ("""w, b = np.array([2.0, -1.0, 0.5]), 1.0          # a linear model
X = np.array([[1.0, 2.0, 3.0], [3.0, 0.0, 1.0], [2.0, 1.0, 2.0]])   # background data
x = np.array([3.0, 1.0, 0.0])
phi = w * (x - X.mean(axis=0))                    # exact SHAP values for a linear model
base = w @ X.mean(axis=0) + b
check = (base + phi.sum(), w @ x + b)             # additivity
dup = np.array([1.0, 1.0]) * w[0] / 2 * (x[0] - X[:, 0].mean())   # feature 1 copied twice, weight split""", 'phi, round(base, 3), check, dup')

P['permutation-importance'] = ("""rng = np.random.default_rng(4)
n = 5_000
x1 = rng.normal(size=n); x2 = x1 + rng.normal(0, 0.05, n)    # x2 almost a copy of x1
y = 2 * x1 + rng.normal(0, 0.5, n)

def importance(X, w, col):
    base = ((X @ w - y) ** 2).mean()
    Xp = X.copy(); Xp[:, col] = rng.permutation(Xp[:, col])
    return ((Xp @ w - y) ** 2).mean() - base

alone = importance(x1[:, None], np.array([2.0]), 0)
both = importance(np.c_[x1, x2], np.array([1.0, 1.0]), 0)     # a model that split the weight""", 'round(alone, 2), round(both, 2)')

P['pdp-ice'] = ("""rng = np.random.default_rng(5)
x2 = rng.choice([-1.0, 1.0], 1_000)                 # half the rows have x2 = -1, half +1
predict = lambda x1, x2: x1 * x2                     # a pure interaction
grid = np.linspace(-2, 2, 5)
pdp = [predict(g, x2).mean() for g in grid]          # average over the data
ice_slopes = sorted({float(predict(1, v) - predict(0, v)) for v in x2})""", 'np.round(pdp, 2).tolist(), ice_slopes')

P['feature-correlation'] = ("""rng = np.random.default_rng(6)
n = 1_000
a = rng.normal(size=n); b = rng.normal(size=n)
c = 0.7 * a + 0.7 * b + rng.normal(0, 0.1, n)      # almost a combination of a and b
X = np.c_[a, b, c]

def vif(X, j):
    others = np.c_[np.delete(X, j, axis=1), np.ones(len(X))]
    fit = others @ np.linalg.lstsq(others, X[:, j], rcond=None)[0]
    r2 = 1 - ((X[:, j] - fit) ** 2).sum() / ((X[:, j] - X[:, j].mean()) ** 2).sum()
    return 1 / (1 - r2)

vifs = [round(vif(X, j), 1) for j in range(3)]
max_pairwise = np.abs(np.corrcoef(X.T)[np.triu_indices(3, 1)]).max()""", 'vifs, round(max_pairwise, 2)')

P['information-gain'] = ("""rng = np.random.default_rng(7)
x = rng.uniform(-1, 1, 20_000)
y = x ** 2 + rng.normal(0, 0.05, 20_000)           # fully dependent, not linear
r = np.corrcoef(x, y)[0, 1]
joint, _, _ = np.histogram2d(x, y, bins=10)
pxy = joint / joint.sum(); px = pxy.sum(1, keepdims=True); py = pxy.sum(0, keepdims=True)
nz = pxy > 0
mi_bits = (pxy[nz] * np.log2(pxy[nz] / (px @ py)[nz])).sum()""", 'round(r, 3), round(mi_bits, 2)')

P['distribution-shape'] = ("""from scipy.stats import skew
rng = np.random.default_rng(8)
income = rng.lognormal(mean=10.5, sigma=0.8, size=10_000)   # right-skewed, like incomes
stats_raw = (round(skew(income), 2), round(income.mean()), round(np.median(income)))
skew_log = round(skew(np.log(income)), 2)""", 'stats_raw, skew_log')

P['outlier-detection'] = ("""x = np.array([10, 11, 9, 10, 12, 11, 10, 9, 11, 10, 25, 300.0])   # two outliers: 25 and 300
z = (x - x.mean()) / x.std()
mad = np.median(np.abs(x - np.median(x)))
robust = 0.6745 * (x - np.median(x)) / mad          # modified z-score
flag_z = x[np.abs(z) > 3].tolist()
flag_robust = x[np.abs(robust) > 3.5].tolist()""", 'flag_z, flag_robust')

P['missing-data'] = ("""rng = np.random.default_rng(9)
income = rng.lognormal(10.5, 0.6, 10_000)
p_missing = np.clip((income - 30_000) / 100_000, 0, 0.8)     # higher earners skip the question more
observed = np.where(rng.random(10_000) < p_missing, np.nan, income)
true_mean = income.mean()
complete_case = np.nanmean(observed)                          # what mean imputation also centres on
share_missing = np.isnan(observed).mean()""", 'round(true_mean), round(complete_case), round(share_missing, 3)')

P['data-drift'] = ("""tpr, fpr = 0.80, 0.10                               # the model's behaviour within each class, unchanged
def precision(prevalence):
    return tpr * prevalence / (tpr * prevalence + fpr * (1 - prevalence))
before, after = precision(0.10), precision(0.20)       # only the share of positives changed""", 'round(before, 3), round(after, 3)')

P['class-imbalance'] = ("""cost_fp, cost_fn = 1.0, 10.0                        # a missed case costs ten false alarms
threshold = cost_fp / (cost_fp + cost_fn)           # act when P(positive) exceeds this
expected_cost = lambda p, act: cost_fp * (1 - p) if act else cost_fn * p
at_15 = (expected_cost(0.15, True), expected_cost(0.15, False))   # a case with P = 0.15""", 'round(threshold, 3), at_15')

P['sharpe-ratio'] = ("""sr_annual, months = 1.0, 36                         # a Sharpe of 1, from three years of monthly returns
sr_m = sr_annual / np.sqrt(12)
se_m = np.sqrt((1 + 0.5 * sr_m ** 2) / months)       # Lo (2002), i.i.d. returns
se_annual = se_m * np.sqrt(12)
ci = (sr_annual - 1.96 * se_annual, sr_annual + 1.96 * se_annual)""", 'round(se_annual, 2), np.round(ci, 2)')

P['max-drawdown'] = ("""rng = np.random.default_rng(10)
def median_mdd(years, paths=2_000, mu=0.07, sigma=0.16):
    r = rng.normal(mu / 252, sigma / np.sqrt(252), (paths, 252 * years))
    wealth = np.exp(np.cumsum(r, axis=1))
    return np.median((1 - wealth / np.maximum.accumulate(wealth, axis=1)).max(axis=1))
table = {y: round(median_mdd(y), 3) for y in (1, 5, 20)}""", 'table')

P['walk-forward'] = ("""rng = np.random.default_rng(11)
r = rng.normal(0, 0.01, (200, 1_000))               # 200 strategies with no edge, 1,000 days
ins, outs = r[:, :500], r[:, 500:]
sharpe = lambda x: x.mean(axis=-1) / x.std(axis=-1) * np.sqrt(252)
best = np.argmax(sharpe(ins))
result = (round(sharpe(ins)[best], 2), round(sharpe(outs)[best], 2), round(sharpe(outs).mean(), 2))""", 'result')

P['monte-carlo'] = ("""rng = np.random.default_rng(12)
trades = rng.normal(0.002, 0.02, 250)                 # one year of trade returns
def mdd(rets):
    w = np.cumprod(1 + rets); return (1 - w / np.maximum.accumulate(w)).max()
actual = mdd(trades)
shuffled = [mdd(rng.permutation(trades)) for _ in range(5_000)]   # same trades, other orders
lo, hi = np.percentile(shuffled, [5, 95])
final_same = np.isclose(np.prod(1 + trades), np.prod(1 + rng.permutation(trades)))""", 'round(actual, 3), round(lo, 3), round(hi, 3), final_same')

P['survivorship-bias'] = ("""rng = np.random.default_rng(13)
funds, years = 1_000, 5
returns = rng.normal(0.0, 0.10, (funds, years))      # no fund has any skill
alive = np.ones(funds, bool)
for t in range(years):                                # each year the worst 10% of survivors close
    cut = np.quantile(returns[alive, t], 0.10)
    alive &= ~(returns[:, t] < cut)
all_avg, survivors_avg = returns.mean(), returns[alive].mean()""", 'alive.sum(), round(all_avg, 4), round(survivors_avg, 4)')

P['confidence-intervals'] = ("""from scipy import stats
rng = np.random.default_rng(14)
def coverage(draw, true_mean, n=10, reps=20_000):
    x = draw((reps, n))
    half = stats.t.ppf(0.975, n - 1) * x.std(axis=1, ddof=1) / np.sqrt(n)
    return (np.abs(x.mean(axis=1) - true_mean) <= half).mean()
normal = coverage(lambda s: rng.normal(1, 1, s), 1)
skewed = coverage(lambda s: rng.lognormal(0, 1, s), np.exp(0.5))   # lognormal, mean e^0.5""", 'round(normal, 3), round(skewed, 3)')

P['bootstrap-methods'] = ("""rng = np.random.default_rng(15)
x = rng.uniform(0, 1, 50)
boot_max = np.array([rng.choice(x, 50).max() for _ in range(10_000)])
share_equal = (boot_max == x.max()).mean()            # resamples whose max is just the sample max
theory = 1 - (1 - 1 / 50) ** 50""", 'round(share_equal, 3), round(theory, 3)')

P['bayesian-ab'] = ("""rng = np.random.default_rng(16)
a = rng.beta(1 + 120, 1 + 880, 200_000)              # 120 of 1,000 converted, uniform prior
b = rng.beta(1 + 135, 1 + 865, 200_000)              # 135 of 1,000
p_b_better = (b > a).mean()
expected_loss_b = np.maximum(a - b, 0).mean()        # what choosing B costs on average if wrong""", 'round(p_b_better, 3), round(expected_loss_b, 4)')

P['effect-size'] = ("""from scipy.stats import ttest_ind
rng = np.random.default_rng(17)
a = rng.normal(100, 15, 100_000)
b = rng.normal(100.75, 15, 100_000)                  # a 0.75-point difference on an SD of 15
p = ttest_ind(a, b).pvalue
d = (b.mean() - a.mean()) / np.sqrt((a.var(ddof=1) + b.var(ddof=1)) / 2)""", 'f"{p:.1e}", round(d, 3)')

P['power-analysis'] = ("""from scipy.stats import norm
z = norm.ppf(0.975) + norm.ppf(0.80)
n_per_group = {d: int(np.ceil(2 * z ** 2 / d ** 2)) for d in (0.2, 0.5, 0.8)}   # normal approximation
power_30 = norm.cdf(0.5 * np.sqrt(30 / 2) - norm.ppf(0.975))                   # d = 0.5 with 30 per group""", 'n_per_group, round(power_30, 2)')

P['hypothesis-testing'] = ("""from scipy.stats import ttest_ind
rng = np.random.default_rng(18)
x = rng.normal(0, 1, (5_000, 60))                        # 5,000 experiments, two groups of 30, no effect
y = rng.normal(0, 1, (5_000, 60)); y[:, 30:] += 0.4      # 5,000 more with a real effect of 0.4 SD
null = ttest_ind(x[:, :30], x[:, 30:], axis=1).pvalue    # one t-test per row
real = ttest_ind(y[:, :30], y[:, 30:], axis=1).pvalue
share = (round((null < 0.05).mean(), 3), round((real < 0.05).mean(), 3))
near_miss = round(((real > 0.01) & (real < 0.05)).mean(), 3)""", 'share, near_miss')

P['stat-tests'] = ("""from scipy.stats import ttest_ind, mannwhitneyu
rng = np.random.default_rng(19)
hits_t = hits_u = 0
for _ in range(2_000):                               # heavy-tailed data with a real shift of 0.5
    a, b = rng.standard_t(2, 40), rng.standard_t(2, 40) + 0.5
    hits_t += ttest_ind(a, b).pvalue < 0.05
    hits_u += mannwhitneyu(a, b).pvalue < 0.05
power = (hits_t / 2_000, hits_u / 2_000)""", 'power')

P['clt-sampling'] = ("""from scipy.stats import skew
rng = np.random.default_rng(20)
skew_of_mean = {n: round(skew(rng.exponential(1, (20_000, n)).mean(axis=1)), 2) for n in (1, 5, 30)}
cauchy = rng.standard_cauchy((2_000, 1_000))
spread = (round(np.subtract(*np.percentile(cauchy[:, 0], [75, 25])), 2),          # one draw
          round(np.subtract(*np.percentile(cauchy.mean(axis=1), [75, 25])), 2))   # mean of 1,000""", 'skew_of_mean, spread')

P['correlation-causation'] = ("""rng = np.random.default_rng(21)
talent, looks = rng.normal(size=(2, 20_000))         # independent in the population
famous = talent + looks > 2                          # only the top on the sum get noticed
r_all = np.corrcoef(talent, looks)[0, 1]
r_famous = np.corrcoef(talent[famous], looks[famous])[0, 1]""", 'round(r_all, 3), round(r_famous, 3), famous.sum()')

P['eda-workflow'] = ("""df = pd.DataFrame({'age': ['34', '51', '29', 'n/a', '45'],      # numbers stored as text
                   'income': [52_000, -999, 61_000, 48_000, -999]})   # -999 means "unknown"
age = pd.to_numeric(df.age, errors='coerce')
naive_mean = df.income.mean()
clean_mean = df.income.replace(-999, np.nan).mean()""", 'age.dtype.name, age.isna().sum(), naive_mean, round(clean_mean, 1)')

P['groupby-aggregation'] = ("""df = pd.DataFrame({'store': ['big'] * 900 + ['small'] * 100,
                   'basket': np.r_[np.full(900, 40.0), np.full(100, 80.0)]})
per_store = df.groupby('store').basket.mean()
mean_of_means = per_store.mean()                    # each store counts once
pooled = df.basket.mean()                           # each basket counts once""", 'per_store.to_dict(), mean_of_means, pooled')

P['cohort-retention'] = ("""cohorts = pd.DataFrame({'channel': ['search', 'ads'] * 2, 'month': ['Jan', 'Jan', 'Jun', 'Jun'],
                        'users': [800, 200, 300, 700], 'retained': [400, 60, 160, 224]})
cohorts['rate'] = cohorts.retained / cohorts.users
overall = cohorts.groupby('month')[['users', 'retained']].sum()
overall['rate'] = overall.retained / overall.users""", 'cohorts.pivot(index="month", columns="channel", values="rate").round(3).to_dict(), overall.rate.round(3).to_dict()')

P['funnel-analysis'] = ("""stages = np.array([0.40, 0.50, 0.20])               # visit -> signup -> trial -> paid
overall = stages.prod()
fix_small = np.array([0.40, 0.50, 0.30]).prod()      # +10 points on the weakest step
fix_large = np.array([0.40, 0.60, 0.20]).prod()      # +10 points on a stronger one""", 'round(overall, 3), round(fix_small, 3), round(fix_large, 3)')

P['sklearn-eval'] = ("""support = np.array([900, 80, 20])                    # three classes, very unequal
f1 = np.array([0.95, 0.60, 0.20])                      # per-class F1 from a classification report
macro = f1.mean()                                      # every class counts the same
weighted = (f1 * support).sum() / support.sum()        # every example counts the same""", 'round(macro, 3), round(weighted, 3)')

P['shap-library'] = ("""sigmoid = lambda z: 1 / (1 + np.exp(-z))
base_logodds = np.log(0.2 / 0.8)                      # TreeExplainer's base value for a 20% base rate
contrib = np.array([1.2, 0.9])                        # two features' SHAP values, in log-odds
p = sigmoid(base_logodds + contrib.sum())
naive = 0.2 + contrib.sum()                           # treating them as probability points""", 'round(base_logodds, 3), round(p, 3), naive')

P['optuna'] = ("""p_top5 = {n: round(1 - 0.95 ** n, 3) for n in (20, 60, 200)}   # random search: at least one trial in the top 5%""", 'p_top5')

P['pandas-ta'] = ("""close = pd.Series([44.3, 44.1, 44.2, 43.6, 44.3, 44.8, 45.1, 45.4, 45.8, 46.1,
                   45.9, 46.2, 45.6, 46.3, 46.3, 46.0, 46.4, 46.2, 45.6, 46.2])
d = close.diff()
up, down = d.clip(lower=0), -d.clip(upper=0)
def rsi(u, v): return (100 - 100 / (1 + u / v)).iloc[-1]
wilder = rsi(up.ewm(alpha=1 / 14, adjust=False).mean(), down.ewm(alpha=1 / 14, adjust=False).mean())
simple = rsi(up.rolling(14).mean(), down.rolling(14).mean())   # "RSI" with a plain average""", 'round(wilder, 2), round(simple, 2)')

P['scipy-statsmodels'] = ("""p = np.array([0.001, 0.004, 0.008, 0.012, 0.02, 0.03, 0.04, 0.045, 0.2, 0.5])
m = len(p)
bonferroni = (p < 0.05 / m).sum()
order = np.sort(p)
passed = order <= 0.05 * np.arange(1, m + 1) / m    # Benjamini-Hochberg step-up
bh = (np.max(np.nonzero(passed)) + 1) if passed.any() else 0""", 'bonferroni, bh, (p < 0.05).sum()')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np, 'pd': pd}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
