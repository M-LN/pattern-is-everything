# The 15-day example data shared by every indicator topic, and the pandas
# snippet each topic shows. Running this file executes every snippet against
# the data, so the numbers quoted in the worked examples come from the code
# readers see.
import json, sys
import numpy as np
import pandas as pd

DATA = {
    'close':  [100, 102, 101, 104, 107, 106, 109, 108, 105, 103, 104, 102, 99, 101, 104],
    'high':   [101, 103, 103, 105, 108, 108, 110, 110, 108, 105, 105, 104, 102, 102, 105],
    'low':    [ 99, 100, 100, 101, 104, 105, 106, 107, 104, 102, 102, 101,  98,  99, 101],
    'volume': [50, 62, 48, 70, 85, 60, 90, 72, 80, 66, 55, 75, 95, 64, 71],
}

SNIPPETS = {
'sma': """df['sma5'] = df['close'].rolling(5).mean()""",
'ema': """df['ema5'] = df['close'].ewm(span=5, adjust=False).mean()   # k = 2/(5+1)""",
'wma': """w = np.arange(1, 6)                      # weights 1..5, newest heaviest
df['wma5'] = df['close'].rolling(5).apply(lambda x: (x * w).sum() / w.sum(), raw=True)""",
'dema': """e1 = df['close'].ewm(span=5, adjust=False).mean()
e2 = e1.ewm(span=5, adjust=False).mean()     # the EMA of the EMA
df['dema5'] = 2 * e1 - e2""",
'vwap': """tp = (df['high'] + df['low'] + df['close']) / 3
df['vwap'] = (tp * df['volume']).cumsum() / df['volume'].cumsum()
# intraday: group by session date and take the cumulative sums per day""",
'rsi': """d = df['close'].diff()
gain = d.clip(lower=0).ewm(alpha=1/5, adjust=False).mean()    # Wilder smoothing
loss = (-d.clip(upper=0)).ewm(alpha=1/5, adjust=False).mean()
df['rsi5'] = 100 - 100 / (1 + gain / loss)""",
'stochastic': """ll = df['low'].rolling(5).min()
hh = df['high'].rolling(5).max()
df['k'] = 100 * (df['close'] - ll) / (hh - ll)
df['d'] = df['k'].rolling(3).mean()""",
'cci': """tp = (df['high'] + df['low'] + df['close']) / 3
ma = tp.rolling(5).mean()
md = tp.rolling(5).apply(lambda x: np.abs(x - x.mean()).mean(), raw=True)
df['cci5'] = (tp - ma) / (0.015 * md)""",
'williams-r': """hh = df['high'].rolling(5).max()
ll = df['low'].rolling(5).min()
df['wr5'] = -100 * (hh - df['close']) / (hh - ll)""",
'roc': """df['roc5'] = 100 * (df['close'] / df['close'].shift(5) - 1)""",
'macd': """fast = df['close'].ewm(span=3, adjust=False).mean()
slow = df['close'].ewm(span=6, adjust=False).mean()
df['macd'] = fast - slow
df['signal'] = df['macd'].ewm(span=3, adjust=False).mean()
df['hist'] = df['macd'] - df['signal']""",
'adx': """up, down = df['high'].diff(), -df['low'].diff()
plus_dm = np.where((up > down) & (up > 0), up, 0.0)
minus_dm = np.where((down > up) & (down > 0), down, 0.0)
pc = df['close'].shift()
tr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)
w = lambda s: pd.Series(s, index=df.index).ewm(alpha=1/5, adjust=False).mean()   # Wilder
atr = w(tr)
df['+di'] = 100 * w(plus_dm) / atr
df['-di'] = 100 * w(minus_dm) / atr
dx = 100 * (df['+di'] - df['-di']).abs() / (df['+di'] + df['-di'])
df['adx5'] = w(dx)""",
'parabolic-sar': """af0, step, af_max = 0.02, 0.02, 0.20
high, low = df['high'].values, df['low'].values
sar = np.zeros(len(df)); up = True; af = af0
ep, sar[0] = high[0], low[0]
for i in range(1, len(df)):
    sar[i] = sar[i-1] + af * (ep - sar[i-1])
    if up:
        sar[i] = min(sar[i], low[i-1], low[max(i-2, 0)])   # never above the last two lows
        if low[i] < sar[i]:                                 # stop hit: flip short
            up, sar[i], ep, af = False, ep, low[i], af0
        elif high[i] > ep:
            ep, af = high[i], min(af + step, af_max)
    else:
        sar[i] = max(sar[i], high[i-1], high[max(i-2, 0)])
        if high[i] > sar[i]:                                # stop hit: flip long
            up, sar[i], ep, af = True, ep, high[i], af0
        elif low[i] < ep:
            ep, af = low[i], min(af + step, af_max)
df['sar'] = sar""",
'ichimoku': """mid = lambda n: (df['high'].rolling(n).max() + df['low'].rolling(n).min()) / 2
df['tenkan'] = mid(3)                     # 9 in the standard settings
df['kijun'] = mid(6)                      # 26
df['span_a'] = ((df['tenkan'] + df['kijun']) / 2).shift(6)
df['span_b'] = mid(12).shift(6)           # 52, shifted 26 ahead""",
'aroon': """last = lambda f: (lambda x: len(x) - 1 - f(x[::-1]))     # position of the latest extreme
pos_hi = df['high'].rolling(6).apply(last(np.argmax), raw=True)   # 0 = oldest of 6 bars, 5 = today
pos_lo = df['low'].rolling(6).apply(last(np.argmin), raw=True)
df['aroon_up'] = 100 * pos_hi / 5           # 100 = the high is today
df['aroon_down'] = 100 * pos_lo / 5""",
'bollinger-bands': """mid = df['close'].rolling(5).mean()
sd = df['close'].rolling(5).std(ddof=0)       # population SD, as Bollinger uses
df['bb_up'], df['bb_mid'], df['bb_lo'] = mid + 2 * sd, mid, mid - 2 * sd""",
'atr': """pc = df['close'].shift()
tr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)
df['atr5'] = tr.ewm(alpha=1/5, adjust=False).mean()   # Wilder smoothing""",
'keltner-channels': """pc = df['close'].shift()
tr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)
atr = tr.ewm(alpha=1/5, adjust=False).mean()
mid = df['close'].ewm(span=5, adjust=False).mean()
df['kc_up'], df['kc_mid'], df['kc_lo'] = mid + 2 * atr, mid, mid - 2 * atr""",
'donchian-channels': """df['dc_up'] = df['high'].rolling(5).max()
df['dc_lo'] = df['low'].rolling(5).min()
df['dc_mid'] = (df['dc_up'] + df['dc_lo']) / 2
df['breakout'] = df['close'] > df['dc_up'].shift()   # close above the prior range""",
'standard-deviation': """df['sd5'] = df['close'].rolling(5).std(ddof=0)
df['ret_sd5'] = df['close'].pct_change().rolling(5).std()   # the same idea on returns""",
'obv': """direction = np.sign(df['close'].diff()).fillna(0)
df['obv'] = (direction * df['volume']).cumsum()""",
'accumulation-distribution': """clv = ((df['close'] - df['low']) - (df['high'] - df['close'])) / (df['high'] - df['low'])
df['ad'] = (clv * df['volume']).cumsum()""",
'mfi': """tp = (df['high'] + df['low'] + df['close']) / 3
flow = tp * df['volume']
pos = flow.where(tp > tp.shift(), 0).rolling(5).sum()
neg = flow.where(tp < tp.shift(), 0).rolling(5).sum()
df['mfi5'] = 100 - 100 / (1 + pos / neg)""",
'chaikin-oscillator': """clv = ((df['close'] - df['low']) - (df['high'] - df['close'])) / (df['high'] - df['low'])
ad = (clv * df['volume']).cumsum()
df['chaikin'] = ad.ewm(span=3, adjust=False).mean() - ad.ewm(span=10, adjust=False).mean()""",
'vwap-bands': """tp = (df['high'] + df['low'] + df['close']) / 3
v = df['volume']
vwap = (tp * v).cumsum() / v.cumsum()
sd = np.sqrt((v * (tp - vwap) ** 2).cumsum() / v.cumsum())   # volume-weighted SD
df['vwap'], df['vb_up'], df['vb_lo'] = vwap, vwap + 2 * sd, vwap - 2 * sd""",
}

def run():
    out = {}
    for tid, code in SNIPPETS.items():
        df = pd.DataFrame(DATA)
        df.index = range(1, 16)
        df.index.name = 'day'
        df['volume'] = df['volume'] * 1000
        ns = {'df': df, 'np': np, 'pd': pd}
        exec(code, ns)
        new = [c for c in ns['df'].columns if c not in ('close', 'high', 'low', 'volume')]
        out[tid] = ns['df'][new].round(2).replace({np.nan: None}).to_dict(orient='index')
    return out

if __name__ == '__main__':
    res = run()
    which = sys.argv[1:] or list(res)
    for tid in which:
        print('==', tid)
        for day, row in res[tid].items():
            if any(v is not None for v in row.values()):
                print(f'  day {day:>2}', {k: v for k, v in row.items()})
