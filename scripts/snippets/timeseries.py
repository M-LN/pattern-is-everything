# Timeseries snippets: numpy (and pandas where noted), each simulating its
# own series. Running this file executes every snippet and prints what the
# worked example quotes.
import numpy as np
import pandas as pd

P = {}

P['stationarity'] = ("""rng = np.random.default_rng(0)
corr_levels, corr_diffs = [], []
for _ in range(1_000):                          # pairs of independent random walks
    a, b = rng.normal(size=(2, 250)).cumsum(axis=1)
    corr_levels.append(abs(np.corrcoef(a, b)[0, 1]))
    corr_diffs.append(abs(np.corrcoef(np.diff(a), np.diff(b))[0, 1]))
levels, diffs = np.mean(corr_levels), np.mean(corr_diffs)
share_big = np.mean(np.array(corr_levels) > 0.5)""", 'round(levels, 3), round(diffs, 3), round(share_big, 3)')

P['autocorrelation'] = ("""rng = np.random.default_rng(1)
n, phi = 2_000, 0.7
y = np.zeros(n)
for t in range(1, n): y[t] = phi * y[t - 1] + rng.normal()   # AR(1)

def acf(x, k):
    x = x - x.mean(); return (x[:-k] * x[k:]).sum() / (x * x).sum()

sample = [round(acf(y, k), 3) for k in (1, 2, 3)]
theory = [round(phi ** k, 3) for k in (1, 2, 3)]
X = np.column_stack([y[1:-1], y[:-2]])           # PACF at lag 2: the lag-2 coefficient given lag 1
pacf2 = np.linalg.lstsq(X, y[2:], rcond=None)[0][1]
band = 1.96 / np.sqrt(n)""", 'sample, theory, round(pacf2, 3), round(band, 3)')

P['decomposition'] = ("""rng = np.random.default_rng(2)
t = np.arange(120)                                # ten years, monthly
season = 10 * np.sin(2 * np.pi * t / 12)
y = pd.Series(0.5 * t + season + rng.normal(0, 3, 120))
trend = y.rolling(12, center=True).mean().rolling(2, center=True).mean()   # centred 2x12 moving average
detr = y - trend
seasonal = detr.groupby(t % 12).transform('mean')
resid = y - trend - seasonal
amp = (seasonal.max() - seasonal.min()) / 2       # true amplitude is 10""", 'round(amp, 2), round(resid.std(), 2)')

P['differencing'] = ("""rng = np.random.default_rng(3)
t = np.arange(500)
trend = 0.3 * t + rng.normal(0, 1, 500)
d1 = np.diff(trend)
noise = rng.normal(0, 1, 500)                    # already stationary
over = np.diff(noise)                            # differenced anyway

def acf1(x):
    x = x - x.mean(); return (x[:-1] * x[1:]).sum() / (x * x).sum()""", 'round(d1.mean(), 3), round(acf1(over), 3), round(over.var() / noise.var(), 2)')

P['resampling'] = ("""daily = np.array([0.10, -0.10])                  # +10% then -10%
summed = daily.sum()
compounded = np.prod(1 + daily) - 1
log_sum = np.expm1(np.log1p(daily).sum())        # log returns add up correctly
prices = pd.Series([100, 102, 101, 108, 95], index=pd.date_range('2026-03-02', periods=5))
week = dict(last=prices.iloc[-1], mean=prices.mean())   # a weekly 'close' vs a weekly average""", 'summed, round(compounded, 4), round(log_sum, 4), week')

P['ar-models'] = ("""rng = np.random.default_rng(4)
phi, n = 0.8, 200
y = np.zeros(n)
for t in range(1, n): y[t] = phi * y[t - 1] + rng.normal()
phi_hat = np.linalg.lstsq(y[:-1, None], y[1:], rcond=None)[0][0]
last = 3.0                                        # forecast from a value 3 above the mean of 0
forecast = [round(last * phi ** h, 2) for h in (1, 2, 5, 10)]
half_life = np.log(0.5) / np.log(phi)""", 'round(phi_hat, 3), forecast, round(half_life, 2)')

P['ma-models'] = ("""rng = np.random.default_rng(5)
theta, n = 0.6, 5_000
e = rng.normal(size=n + 1)
y = e[1:] + theta * e[:-1]                        # MA(1)

def acf(x, k):
    x = x - x.mean(); return (x[:-k] * x[k:]).sum() / (x * x).sum()

theory1 = theta / (1 + theta ** 2)
sample = [round(acf(y, k), 3) for k in (1, 2, 3)]""", 'round(theory1, 3), sample')

P['arima'] = ("""sigma = 1.0                                       # one-step error of a random walk, ARIMA(0,1,0)
width = {h: round(1.96 * sigma * np.sqrt(h), 2) for h in (1, 4, 12, 52)}   # 95% interval half-width""", 'width')

P['sarima'] = ("""rng = np.random.default_rng(6)
t = np.arange(96)
y = 100 + 0.2 * t + 15 * np.sin(2 * np.pi * t / 12) + rng.normal(0, 2, 96)   # eight years, monthly
train, test = y[:84], y[84:]
naive = np.full(12, train[-1])                    # repeat the last month
seasonal_naive = train[-12:]                      # repeat the same month last year
mae = lambda f: np.abs(test - f).mean()""", 'round(mae(naive), 2), round(mae(seasonal_naive), 2)')

P['exponential-smoothing'] = ("""steps_to_90 = {a: round(np.log(0.1) / np.log(1 - a), 1) for a in (0.2, 0.5, 0.8)}   # after a level shift
b, phi = 1.0, 0.9                                  # trend per period, damping
damped_total = b * phi / (1 - phi)                 # where a damped trend's extra growth levels off
straight_24 = b * 24                               # an undamped trend 24 periods ahead""", 'steps_to_90, round(damped_total, 1), straight_24')

P['prophet'] = ("""t = np.arange(48)                                 # four years, monthly
y = np.where(t < 40, 100 + 1.0 * t, 140 + 3.0 * (t - 40))   # growth triples in the last 8 months
h = 24
last_slope = (y[-1] - y[-9]) / 8                  # the most recent trend segment
overall = np.polyfit(t, y, 1)[0]
f_last = y[-1] + last_slope * h
f_overall = y[-1] + overall * h""", 'last_slope, round(overall, 2), f_last, round(f_overall, 1)')

P['state-space'] = ("""def steady_gain(q, r=1.0):                     # local level model: state noise q, observation noise r
    P = (q + np.sqrt(q * q + 4 * q * r)) / 2       # steady-state prior variance
    return P / (P + r)                              # Kalman gain = the SES smoothing weight

gains = {q: round(steady_gain(q), 3) for q in (0.01, 0.1, 1, 10)}""", 'gains')

P['garch'] = ("""rng = np.random.default_rng(7)
omega, alpha, beta, n = 0.05, 0.10, 0.85, 20_000
long_run = omega / (1 - alpha - beta)
half_life = np.log(0.5) / np.log(alpha + beta)     # days for a volatility shock to halve
r, s2 = np.zeros(n), np.full(n, long_run)
for t in range(1, n):
    s2[t] = omega + alpha * r[t - 1] ** 2 + beta * s2[t - 1]
    r[t] = np.sqrt(s2[t]) * rng.normal()
kurt = ((r - r.mean()) ** 4).mean() / r.var() ** 2   # normal = 3""", 'long_run, round(half_life, 1), round(kurt, 2)')

P['var-models'] = ("""rng = np.random.default_rng(8)
n = 500
x, y = np.zeros(n), np.zeros(n)
for t in range(1, n):
    x[t] = 0.5 * x[t - 1] + rng.normal()
    y[t] = 0.3 * y[t - 1] + 0.6 * x[t - 1] + rng.normal()   # x leads y by one step
Z = np.column_stack([x[:-1], y[:-1]])
A = np.linalg.lstsq(Z, np.column_stack([x[1:], y[1:]]), rcond=None)[0].T   # rows: equations for x and y""", 'A.round(2)')

P['changepoint-detection'] = ("""rng = np.random.default_rng(9)
def best_split(y):                                # the single split that most reduces squared error
    total = ((y - y.mean()) ** 2).sum()
    gains = [total - ((y[:k] - y[:k].mean()) ** 2).sum() - ((y[k:] - y[k:].mean()) ** 2).sum() for k in range(5, len(y) - 5)]
    k = int(np.argmax(gains)); return k + 5, gains[k] / total

shift = np.r_[rng.normal(0, 1, 60), rng.normal(1.5, 1, 40)]   # the mean moves at t = 60
flat = rng.normal(0, 1, 100)                                   # nothing happens
found, found_flat = best_split(shift), best_split(flat)""", '(found[0], round(found[1], 3)), (found_flat[0], round(found_flat[1], 3))')

P['rnn-for-ts'] = ("""rng = np.random.default_rng(10)
prices = 100 + rng.normal(0, 5, 1_000)            # raw prices around 100
w = rng.normal(0, 0.1, 1_000)                      # small random input weights
saturated_raw = np.mean(np.abs(np.tanh(w * prices)) > 0.99)
z = (prices - prices.mean()) / prices.std()        # standardized
saturated_std = np.mean(np.abs(np.tanh(w * z)) > 0.99)""", 'round(saturated_raw, 3), round(saturated_std, 3)')

P['lstm-for-ts'] = ("""rng = np.random.default_rng(11)
y = 100 + rng.normal(0, 1, 2_000).cumsum()       # a random walk, like many prices
test = y[1_000:]
naive = np.abs(test[1:] - test[:-1]).mean()       # tomorrow = today
mean_fc = np.abs(test[1:] - y[:1_000].mean()).mean()   # tomorrow = the training average
drift = np.abs(test[1:] - (test[:-1] + np.diff(y[:1_000]).mean())).mean()""", 'round(naive, 3), round(mean_fc, 2), round(drift, 3)')

P['temporal-cnn'] = ("""def receptive_field(k, dilations, convs_per_block=2):
    return 1 + convs_per_block * (k - 1) * sum(dilations)

small = receptive_field(3, [1, 2, 4, 8])
large = receptive_field(3, [2 ** i for i in range(8)])     # dilations 1..128""", 'small, large')

P['transformers-for-ts'] = ("""rng = np.random.default_rng(12)
t = np.arange(600)
y = 10 * np.sin(2 * np.pi * t / 24) + 0.01 * t + rng.normal(0, 1, 600)   # hourly with a daily cycle
L = 48                                             # look back two days
X = np.array([y[i:i + L] for i in range(len(y) - L)]); target = y[L:]
split = 400
w = np.linalg.lstsq(np.c_[X[:split], np.ones(split)], target[:split], rcond=None)[0]   # one linear layer
linear = np.abs(np.c_[X[split:], np.ones(len(X) - split)] @ w - target[split:]).mean()
seasonal_naive = np.abs(X[split:, -24] - target[split:]).mean()""", 'round(linear, 3), round(seasonal_naive, 3)')

P['nbeats'] = ("""train = np.array([12, 15, 14, 18, 20, 17, 21, 24, 22, 26, 28, 25.0])   # made up
test = np.array([29, 31, 28.0])
forecast = np.array([28, 29, 30.0])
scale = np.abs(np.diff(train)).mean()              # in-sample error of the naive forecast
mase = np.abs(test - forecast).mean() / scale       # < 1 beats naive on the scale of the training data""", 'round(scale, 3), round(mase, 3)')

P['feature-engineering'] = ("""rng = np.random.default_rng(13)
y = pd.Series(rng.normal(0, 1, 2_000).cumsum()).diff().dropna()   # daily changes: unpredictable
leaky = y.rolling(3).mean()                        # includes today's value
honest = y.shift(1).rolling(3).mean()              # only yesterday and before
corr_leaky, corr_honest = y.corr(leaky), y.corr(honest)""", 'round(corr_leaky, 3), round(corr_honest, 3)')

P['cross-validation-ts'] = ("""n, folds, test_size, gap = 100, 4, 10, 2
splits = []
for i in range(folds):                             # expanding window
    test_start = n - (folds - i) * test_size
    splits.append(((0, test_start - gap), (test_start, test_start + test_size)))""", 'splits')

P['backtesting-forecasts'] = ("""actual = np.array([120.0, 80.0, 2.0, 150.0, 95.0])
forecast = np.array([110.0, 90.0, 10.0, 140.0, 100.0])
err = actual - forecast
mae = np.abs(err).mean()
rmse = np.sqrt((err ** 2).mean())
mape = np.abs(err / actual).mean() * 100
mape_without_small = np.abs(err / actual)[actual > 10].mean() * 100""", 'mae, round(rmse, 2), round(mape, 1), round(mape_without_small, 1)')

P['anomaly-detection'] = ("""rng = np.random.default_rng(14)
day = np.arange(730)
temp = 10 - 12 * np.cos(2 * np.pi * day / 365) + rng.normal(0, 2, 730)   # two years, warm summers
temp[20] = 15                                      # a warm day in January: normal in July
z_global = (temp - temp.mean()) / temp.std()
resid = temp - pd.Series(temp).rolling(15, center=True, min_periods=5).median()
z_local = resid / resid.std()
flags = (round(z_global[20], 2), round(z_local[20], 2))
false_alarms_per_day = 10_000 * 0.0027             # 10,000 metrics checked daily at 3 sigma""", 'flags, false_alarms_per_day')

P['forecast-ensembles'] = ("""rng = np.random.default_rng(15)
rho = 0.3
cov = [[1, rho], [rho, 1]]
e = rng.multivariate_normal([0, 0], cov, 100_000)     # errors of two unbiased forecasts
mse_single = (e[:, 0] ** 2).mean()
mse_avg = (e.mean(axis=1) ** 2).mean()
theory = (1 + rho) / 2""", 'round(mse_single, 3), round(mse_avg, 3), theory')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np, 'pd': pd}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
