# Risk & Portfolio snippets, each with its own small example numbers (made up
# unless a comment says otherwise). Running this file executes every snippet
# and prints what the worked example quotes.
import numpy as np
import pandas as pd

P = {}

P['value-at-risk'] = ("""r = pd.Series([0.4, -1.2, 0.8, 0.1, -0.6, 1.5, -2.8, 0.3, 0.9, -0.4,
               0.2, -1.7, 0.6, 1.1, -0.9, 0.5, -3.6, 0.7, 0.0, -0.3]) / 100   # 20 daily returns, made up
value = 1_000_000
historical = -np.quantile(r, 0.05) * value                 # read the 5% quantile off the data
parametric = -(r.mean() - 1.645 * r.std()) * value         # assume a normal distribution""", 'historical, parametric')

P['expected-shortfall'] = ("""rng = np.random.default_rng(4)
r = rng.standard_t(3, 10_000) * 0.01 / np.sqrt(3)          # fat-tailed daily returns, 1% volatility
var = -np.quantile(r, 0.025)                               # VaR at 97.5%
es = -r[r <= -var].mean()                                  # the average loss beyond it
es_normal = 0.01 * np.exp(-1.96**2 / 2) / np.sqrt(2 * np.pi) / 0.025   # ES of a normal with the same volatility""", 'var, es, es_normal')

P['volatility-modeling'] = ("""r = np.r_[np.tile([0.005, -0.005], 15), [-0.04], np.tile([0.005, -0.005], 10)]   # calm, one shock, calm
lam = 0.94                                                 # RiskMetrics' daily decay
var = np.empty(len(r)); var[0] = r[0] ** 2
for t in range(1, len(r)):
    var[t] = lam * var[t - 1] + (1 - lam) * r[t - 1] ** 2   # tomorrow's variance from today's
ewma = np.sqrt(var * 252)                                  # annualized
window = pd.Series(r).rolling(20).std().shift().values * np.sqrt(252)   # equal-weight 20-day estimate
days = [30, 31, 40]                                        # the shock day, the day after, nine days later""", 'ewma[days].round(3), window[days].round(3)')

P['correlation-risk'] = ("""vol = np.array([0.20, 0.20])                               # two assets, 20% volatility each
w = np.array([0.5, 0.5])

def port_vol(rho):
    cov = np.outer(vol, vol) * np.array([[1, rho], [rho, 1]])
    return np.sqrt(w @ cov @ w)

calm, stress = port_vol(0.2), port_vol(0.9)""", 'calm, stress')

P['tail-risk'] = ("""from scipy import stats
k = 5                                                      # a five-standard-deviation down day
p_normal = stats.norm.cdf(-k)
p_fat = stats.t.cdf(-k * np.sqrt(3), df=3)                 # Student-t with 3 d.o.f., scaled to the same volatility
years_normal, years_fat = 1 / (p_normal * 252), 1 / (p_fat * 252)   # how often, in trading years""", 'p_normal, p_fat, years_normal, years_fat')

P['mean-variance'] = ("""mu = np.array([0.07, 0.03, 0.05])                         # stocks, bonds, real estate: expected returns
vol = np.array([0.16, 0.05, 0.12])
rho = np.array([[1, 0.1, 0.5], [0.1, 1, 0.2], [0.5, 0.2, 1]])
cov = np.outer(vol, vol) * rho
rf = 0.02

def tangency(mu):                                          # the maximum-Sharpe portfolio
    w = np.linalg.solve(cov, mu - rf)
    return w / w.sum()

base = tangency(mu)
nudged = tangency(mu + [0.01, 0, 0])                       # one point more expected from stocks""", 'base.round(2), nudged.round(2)')

P['risk-parity'] = ("""vol = np.array([0.16, 0.05])                               # stocks, bonds
cov = np.outer(vol, vol) * np.array([[1, 0.1], [0.1, 1]])

def contributions(w):                                      # each asset's share of portfolio variance
    return w * (cov @ w) / (w @ cov @ w)

sixty_forty = contributions(np.array([0.6, 0.4]))
w_rp = (1 / vol) / (1 / vol).sum()                         # inverse volatility: equal risk for two assets
parity = contributions(w_rp)
rp_vol = np.sqrt(w_rp @ cov @ w_rp)
leverage = np.sqrt(np.array([0.6, 0.4]) @ cov @ np.array([0.6, 0.4])) / rp_vol   # to match 60/40's risk""", 'sixty_forty.round(2), w_rp.round(2), parity.round(2), leverage')

P['factor-models'] = ("""rng = np.random.default_rng(8)
n = 60                                                     # five years of monthly returns, simulated
mkt = rng.normal(0.007, 0.045, n)
smb = rng.normal(0.002, 0.03, n)                           # small minus big
fund = 0.000 + 1.1 * mkt + 0.4 * smb + rng.normal(0, 0.01, n)   # no true alpha
X = np.column_stack([np.ones(n), mkt, smb])
coef, *_ = np.linalg.lstsq(X, fund, rcond=None)
alpha, b_mkt, b_smb = coef
resid = fund - X @ coef
r2 = 1 - resid.var() / fund.var()
capm_alpha = np.linalg.lstsq(X[:, :2], fund, rcond=None)[0][0]   # leaving out the size factor""", 'alpha * 12, b_mkt, b_smb, r2, capm_alpha * 12')

P['rebalancing'] = ("""rng = np.random.default_rng(5)
r = np.column_stack([rng.normal(0.008, 0.045, 120), rng.normal(0.003, 0.012, 120)])   # ten years, monthly, simulated
target, band = np.array([0.6, 0.4]), 0.05
w, trades, drift = target.copy(), 0, target.copy()
for m in r:
    w = w * (1 + m); w /= w.sum()                          # weights drift with returns
    drift = drift * (1 + m); drift /= drift.sum()          # never rebalanced
    if abs(w[0] - target[0]) > band:                       # threshold rule: back to 60/40 when 5 points off
        w, trades = target.copy(), trades + 1""", 'trades, drift.round(2)')

P['diversification'] = ("""sigma, rho = 0.30, 0.30                                   # each stock 30% volatile, average correlation 0.3
n = np.array([1, 5, 20, 100, 10_000])
port = sigma * np.sqrt(rho + (1 - rho) / n)                # equal weights
floor = sigma * np.sqrt(rho)                               # what no number of such stocks removes""", 'dict(zip(n.tolist(), port.round(3))), floor')

P['kelly-criterion'] = ("""p, b = 0.55, 1.0                                           # win 55% of even-money bets
kelly = (p * b - (1 - p)) / b

def growth(f):                                             # expected log growth per bet
    return p * np.log(1 + b * f) + (1 - p) * np.log(1 - f)

rates = {m: growth(m * kelly) for m in (0.5, 1, 2, 2.5)}""", 'kelly, {k: round(v, 5) for k, v in rates.items()}')

P['fixed-fractional'] = ("""equity, risk = 50_000, 0.01                               # risk 1% of equity per trade
entry, stop = 40.0, 37.0
shares = int(equity * risk / (entry - stop))
after_20_losses = equity * (1 - risk) ** 20
after_100_losses = equity * (1 - risk) ** 100""", 'shares, after_20_losses, after_100_losses')

P['volatility-sizing'] = ("""risk_per_trade, n = 1_000, 2                              # dollars at risk, stop at 2 x ATR
assets = pd.DataFrame({'price': [50, 50], 'atr': [1.0, 2.5]}, index=['steady', 'jumpy'])
assets['shares'] = (risk_per_trade / (n * assets.atr)).astype(int)
assets['position'] = assets.shares * assets.price""", 'assets.to_dict("index")')

P['pyramiding'] = ("""tiers = pd.DataFrame({'price': [100, 105, 110], 'shares': [100, 50, 25]})   # each add half the last
avg = (tiers.price * tiers.shares).sum() / tiers.shares.sum()
stop = 103                                                 # stop raised under the second add
at_stop = (stop - avg) * tiers.shares.sum()
flat = (stop - 110) * 175                                  # the same 175 shares bought all at 110""", 'avg, at_stop, flat')

P['max-position'] = ("""w = pd.Series({'A': 0.30, 'B': 0.20, 'C': 0.15, 'D': 0.10, 'E': 0.10, 'F': 0.08, 'G': 0.07})
cap = 0.15
while (w > cap + 1e-12).any():                             # trim to the cap, share the excess pro rata
    excess = (w - cap).clip(lower=0).sum()
    w = w.clip(upper=cap)
    room = w < cap
    w[room] += excess * w[room] / w[room].sum()
hit_before = 0.30 * 0.5                                    # the top name halves
hit_after = w.max() * 0.5""", 'w.round(3).to_dict(), hit_before, hit_after')

P['options-hedging'] = ("""S0, put_k, put_cost, call_k, call_premium = 100, 90, 2.5, 115, 2.0   # premiums made up
ST = np.array([70, 90, 100, 115, 130])                     # where the stock ends
stock = ST - S0
protective = stock + np.maximum(put_k - ST, 0) - put_cost
collar = protective - np.maximum(ST - call_k, 0) + call_premium""", 'stock.tolist(), protective.tolist(), collar.tolist()')

P['stop-losses'] = ("""close = pd.Series([50, 51, 53, 52, 55, 57, 56, 59, 58, 55, 56, 53, 51, 52, 48])   # made up
atr = 1.5
trail = (close.cummax() - 2 * atr)                         # 2 x ATR under the highest close so far
exit_trail = close[close < trail].index[0]
fixed = 50 * 0.90                                          # a fixed 10% stop from the entry
fixed_hit = (close < fixed).any()""", 'exit_trail, close[exit_trail], trail[exit_trail], fixed_hit, close.iloc[-1]')

P['pairs-trading'] = ("""rng = np.random.default_rng(11)
common = np.cumsum(rng.normal(0, 0.01, 500))               # a shared random walk (log prices)
spread_true = np.zeros(500)
for t in range(1, 500):
    spread_true[t] = 0.9 * spread_true[t - 1] + rng.normal(0, 0.005)   # a mean-reverting gap
a, b = 4.0 + 1.2 * common + spread_true, 3.0 + common
beta = np.polyfit(b, a, 1)[0]                              # hedge ratio
spread = a - beta * b
z = (spread[-1] - spread.mean()) / spread.std()
phi = np.polyfit(spread[:-1], spread[1:], 1)[0]            # AR(1) persistence of the spread
half_life = -np.log(2) / np.log(phi)""", 'beta, z, half_life')

P['portfolio-insurance'] = ("""value, floor, m = 100.0, 80.0, 4                          # CPPI: risky exposure = 4 x cushion
for move in [0.05, 0.03, -0.10, -0.30]:                    # the last day is a crash
    risky = min(m * (value - floor), value)
    value = value + risky * move
    print(f"{move:+.0%}  exposure {risky:5.1f}  value {value:5.1f}  floor {floor}")""", 'value')

P['currency-hedging'] = ("""eur, s0, s1 = 100, 1.10, 0.99                             # 100 EUR of stocks; EUR/USD falls 10%
local = 0.08                                               # the stocks return 8% in euros
fwd = s0 * 1.05 / 1.03                                     # 1-year forward from USD and EUR rates of 5% and 3%
cost = eur * s0
unhedged = eur * (1 + local) * s1 / cost - 1
hedged = (eur * (1 + local) * s1 + eur * (fwd - s1)) / cost - 1   # sell the starting 100 EUR forward""", 'unhedged, hedged, fwd')

P['return-attribution'] = ("""t = pd.DataFrame({'wp': [0.50, 0.30, 0.20], 'wb': [0.40, 0.40, 0.20],    # portfolio and benchmark weights
                  'rp': [0.10, 0.04, 0.02], 'rb': [0.08, 0.05, 0.01]},  # sector returns
                 index=['tech', 'finance', 'energy'])
Rb = (t.wb * t.rb).sum()
allocation = ((t.wp - t.wb) * (t.rb - Rb)).sum()           # Brinson-Fachler
selection = (t.wb * (t.rp - t.rb)).sum()
interaction = ((t.wp - t.wb) * (t.rp - t.rb)).sum()
active = (t.wp * t.rp).sum() - Rb""", 'allocation, selection, interaction, active')

P['benchmark-tracking'] = ("""port  = np.array([1.2, -0.5, 2.1, 0.8, -1.9, 1.5, 0.3, 2.4, -0.7, 1.0, 0.6, -0.2]) / 100   # 12 months, made up
bench = np.array([1.0, -0.8, 1.8, 1.1, -2.3, 1.2, 0.5, 2.0, -0.4, 0.9, 0.2, -0.5]) / 100
active = port - bench
te = active.std(ddof=1) * np.sqrt(12)                      # annualized tracking error
ir = active.mean() * 12 / te                               # information ratio""", 'active.mean() * 12, te, ir')

P['alpha-generation'] = ("""alpha, te = 0.02, 0.05                                   # 2% a year above the benchmark, 5% tracking error
ir = alpha / te
years_for_t2 = (2 / ir) ** 2                               # t-stat = IR x sqrt(years); 2 is the usual bar
ic, breadth = 0.05, 100                                    # Grinold: skill per bet and independent bets a year
ir_fundamental = ic * np.sqrt(breadth)""", 'ir, years_for_t2, ir_fundamental')

P['risk-adjusted-perf'] = ("""r = np.array([2.1, -1.0, 3.2, 0.5, -2.5, 1.8, 0.9, -0.4, 2.6, -1.6, 1.4, 0.7]) / 100   # 12 months, made up
rf = 0.03 / 12
ex = r - rf
sharpe = ex.mean() / ex.std(ddof=1) * np.sqrt(12)
downside = np.sqrt((np.minimum(ex, 0) ** 2).mean()) * np.sqrt(12)
sortino = ex.mean() * 12 / downside
wealth = np.cumprod(1 + r)
mdd = (1 - wealth / np.maximum.accumulate(wealth)).max()
calmar = (wealth[-1] - 1) / mdd                            # one year, so the total return is the annual one""", 'sharpe, sortino, mdd, calmar')

P['drawdown-analysis'] = ("""equity = pd.Series([100, 104, 108, 103, 97, 91, 94, 89, 95, 99, 104, 110, 113])   # month-end, made up
peak = equity.cummax()
dd = equity / peak - 1
mdd = dd.min()
trough = dd.idxmin()
start = equity[:trough].idxmax()
recovered = equity[(equity.index > trough) & (equity >= peak[trough])].index.min()
to_recover = 1 / (1 + mdd) - 1                             # gain needed from the bottom""", 'mdd, start, trough, recovered, to_recover')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np, 'pd': pd}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
