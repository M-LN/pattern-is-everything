# Chart-pattern snippets and the small data set each one is shown on.
# Each pattern's data is built from its key points (day, close), joined by
# straight lines; candlestick patterns give their bars directly. Running
# this file executes every snippet on its data and prints the result the
# worked example quotes.
import numpy as np
import pandas as pd

SWINGS = """def swings(s, n=3):                     # a swing high (low) is the extreme of the 2n+1 bars around it
    w = s.rolling(2 * n + 1, center=True)
    return s[s == w.max()], s[s == w.min()]
"""

def from_points(pts, spread=0.5):
    days = np.arange(pts[-1][0] + 1)
    close = np.interp(days, [d for d, _ in pts], [p for _, p in pts])
    df = pd.DataFrame({'close': close})
    df['open'] = df['close'].shift().fillna(df['close'][0])
    df['high'] = df[['open', 'close']].max(axis=1) + spread
    df['low'] = df[['open', 'close']].min(axis=1) - spread
    return df

def parabola(n=41, rim=110, bottom=90):
    x = np.arange(n); mid = (n - 1) / 2
    return list(zip(x, bottom + (rim - bottom) * ((x - mid) / mid) ** 2))

def bars(rows):
    return pd.DataFrame(rows, columns=['open', 'high', 'low', 'close'])

P = {}   # pattern -> (data, snippet, what to print)

P['head-and-shoulders'] = (from_points([(0, 95), (5, 108), (9, 100), (14, 115), (18, 100), (22, 109), (26, 99), (30, 92)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
ls, head, rs = highs.iloc[-3:]                       # left shoulder, head, right shoulder
between = lows[(lows.index > highs.index[-3]) & (lows.index < highs.index[-1])]
neck = between.mean()                                # neckline (flat here)
is_hs = head > max(ls, rs) and abs(ls - rs) / head < 0.05
target = neck - (head - neck)                        # measured move
confirmed = c.iloc[-1] < neck""", 'is_hs, neck, target, confirmed')

P['inverse-head-and-shoulders'] = (from_points([(0, 105), (5, 92), (9, 100), (14, 85), (18, 100), (22, 91), (26, 101), (30, 108)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
ls, head, rs = lows.iloc[-3:]                        # the three troughs
between = highs[(highs.index > lows.index[-3]) & (highs.index < lows.index[-1])]
neck = between.mean()
is_ihs = head < min(ls, rs) and abs(ls - rs) / head < 0.05
target = neck + (neck - head)
confirmed = c.iloc[-1] > neck""", 'is_ihs, neck, target, confirmed')

P['double-top'] = (from_points([(0, 90), (6, 110), (11, 100), (17, 109.5), (22, 99), (26, 94)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
t1, t2 = highs.iloc[-2:]
valley = lows[(lows.index > highs.index[-2]) & (lows.index < highs.index[-1])].min()
is_dt = abs(t1 - t2) / max(t1, t2) < 0.02            # tops within 2%
target = valley - (max(t1, t2) - valley)
confirmed = c.iloc[-1] < valley""", 'is_dt, valley, target, confirmed')

P['double-bottom'] = (from_points([(0, 110), (6, 90), (11, 100), (17, 90.5), (22, 101), (26, 106)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
b1, b2 = lows.iloc[-2:]
peak = highs[(highs.index > lows.index[-2]) & (highs.index < lows.index[-1])].max()
is_db = abs(b1 - b2) / min(b1, b2) < 0.02
target = peak + (peak - min(b1, b2))
confirmed = c.iloc[-1] > peak""", 'is_db, peak, target, confirmed')

P['rounding-bottom'] = (from_points(parabola()),
"""y = df['close'].iloc[-41:].values
x = np.arange(len(y))
a, b, k = np.polyfit(x, y, 2)                         # y ≈ a·x² + b·x + k
vertex = -b / (2 * a)                                 # where the curve turns
is_round = a > 0 and 0.3 < vertex / len(x) < 0.7     # a U, bottoming near the middle
rim, bottom = max(y[0], y[-1]), y.min()
target = rim + (rim - bottom)""", 'round(a, 3), round(vertex, 1), is_round, target')

P['bull-flag'] = (from_points([(0, 100), (5, 115), (7, 112), (9, 114), (11, 111), (13, 113), (15, 110), (16, 116)]),
"""c = df['close']
pole = c.iloc[-12] - c.iloc[-17]                      # the 5-bar rise
flag = c.iloc[-12:-1]                                 # the 11 bars after it
slope = np.polyfit(np.arange(len(flag)), flag.values, 1)[0]
is_flag = pole / c.iloc[-17] > 0.08 and slope < 0     # sharp rise, then a drift down
breakout = c.iloc[-1] > flag.max()
target = flag.max() + pole""", 'pole, round(slope, 2), is_flag, breakout, target')

P['bear-flag'] = (from_points([(0, 100), (5, 85), (7, 88), (9, 86), (11, 89), (13, 87), (15, 90), (16, 84)]),
"""c = df['close']
pole = c.iloc[-17] - c.iloc[-12]                      # the 5-bar fall
flag = c.iloc[-12:-1]
slope = np.polyfit(np.arange(len(flag)), flag.values, 1)[0]
is_flag = pole / c.iloc[-17] > 0.08 and slope > 0     # sharp fall, then a drift up
breakdown = c.iloc[-1] < flag.min()
target = flag.min() - pole""", 'pole, round(slope, 2), is_flag, breakdown, target')

P['pennant'] = (from_points([(0, 100), (5, 115), (7, 110), (9, 114), (11, 111), (13, 113), (15, 112), (16, 117)]),
SWINGS + """c = df['close']
pole = c.iloc[-12] - c.iloc[-17]
hi, lo = swings(c.iloc[-12:-1], n=1)                 # swings inside the pennant
converging = hi.is_monotonic_decreasing and lo.is_monotonic_increasing
breakout = c.iloc[-1] > hi.iloc[-1]
target = hi.iloc[-1] + pole""", 'pole, list(hi), list(lo), converging, breakout, target')

P['ascending-triangle'] = (from_points([(0, 95), (4, 110), (8, 100), (12, 110), (16, 104), (20, 110), (24, 107), (27, 114)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
top, rises = highs.iloc[-3:], lows.iloc[-3:]
flat_top = (top.max() - top.min()) / top.mean() < 0.01
rising = rises.is_monotonic_increasing
height = top.mean() - rises.iloc[0]
breakout = c.iloc[-1] > top.max()
target = top.mean() + height""", 'list(top), list(rises), flat_top, rising, breakout, target')

P['descending-triangle'] = (from_points([(0, 100), (4, 90), (8, 105), (12, 90), (16, 100), (20, 90), (24, 96), (27, 86)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
floor, falls = lows.iloc[-3:], highs.iloc[-3:]
flat_floor = (floor.max() - floor.min()) / floor.mean() < 0.01
falling = falls.is_monotonic_decreasing
height = falls.iloc[0] - floor.mean()
breakdown = c.iloc[-1] < floor.min()
target = floor.mean() - height""", 'list(floor), list(falls), flat_floor, falling, breakdown, target')

P['symmetric-triangle'] = (from_points([(0, 100), (3, 112), (6, 92), (9, 108), (12, 96), (15, 105), (18, 99), (21, 107)]),
SWINGS.replace('n=3', 'n=2') + """c = df['close']
highs, lows = swings(c)
hi, lo = highs.iloc[-3:], lows.iloc[-3:]
symmetric = hi.is_monotonic_decreasing and lo.is_monotonic_increasing
height = hi.iloc[0] - lo.iloc[0]                     # the widest part
breakout = c.iloc[-1] > hi.iloc[-1]
target = c.iloc[-1] + height""", 'list(hi), list(lo), symmetric, height, breakout, target')

P['rising-wedge'] = (from_points([(0, 93), (3, 105), (6, 95), (9, 108), (12, 101), (15, 110), (18, 106), (21, 100)]),
SWINGS.replace('n=3', 'n=2') + """c = df['close']
highs, lows = swings(c)
hi, lo = highs.iloc[-3:], lows.iloc[-3:]
hs = np.polyfit(hi.index, hi.values, 1)[0]           # slope of the upper line
ls = np.polyfit(lo.index, lo.values, 1)[0]           # slope of the lower line
is_wedge = hs > 0 and ls > hs                         # both rise, the lows faster
breakdown = c.iloc[-1] < lo.iloc[-1]
target = lo.iloc[0]                                   # back to where the wedge began""", 'round(hs, 2), round(ls, 2), is_wedge, breakdown, target')

P['falling-wedge'] = (from_points([(0, 105), (3, 110), (6, 95), (9, 104), (12, 93), (15, 100), (18, 92), (21, 103)]),
SWINGS.replace('n=3', 'n=2') + """c = df['close']
highs, lows = swings(c)
hi, lo = highs.iloc[-3:], lows.iloc[-3:]
hs = np.polyfit(hi.index, hi.values, 1)[0]
ls = np.polyfit(lo.index, lo.values, 1)[0]
is_wedge = ls < 0 and hs < ls                         # both fall, the highs faster
breakout = c.iloc[-1] > hi.iloc[-1]
target = hi.iloc[0]""", 'list(hi), list(lo), round(hs, 2), round(ls, 2), is_wedge, breakout, target')

P['broadening-formation'] = (from_points([(0, 100), (3, 105), (6, 95), (9, 108), (12, 92), (15, 111), (18, 89), (21, 95)]),
SWINGS.replace('n=3', 'n=2') + """c = df['close']
highs, lows = swings(c)
hi, lo = highs.iloc[-3:], lows.iloc[-3:]
broadening = hi.is_monotonic_increasing and lo.is_monotonic_decreasing
width = (hi.values - lo.values)                       # how far each swing reached""", 'list(hi), list(lo), broadening, list(width)')

P['rectangle'] = (from_points([(0, 100), (4, 110), (8, 100), (12, 110), (16, 100), (20, 110), (24, 100), (27, 112)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
top, bottom = highs.iloc[-3:].mean(), lows.iloc[-3:].mean()
flat = highs.iloc[-3:].std() / top < 0.01 and lows.iloc[-3:].std() / bottom < 0.01
height = top - bottom
breakout = c.iloc[-1] > top
target = top + height""", 'round(top, 2), round(bottom, 2), flat, round(height, 2), breakout, round(target, 2)')

P['doji'] = (bars([(103, 104, 101.5, 102), (102, 102.5, 100, 100.5), (100.2, 102, 98, 100.0)]),
"""o, h, l, c = df.iloc[-1][['open', 'high', 'low', 'close']]
body, rng = abs(c - o), h - l
is_doji = body <= 0.1 * rng                           # body under 10% of the day's range""", 'round(body, 2), rng, is_doji')

P['hammer'] = (bars([(104, 104.5, 102, 102.5), (102.5, 103, 100.5, 101), (100, 101, 96, 100.8)]),
"""o, h, l, c = df.iloc[-1][['open', 'high', 'low', 'close']]
body = abs(c - o)
lower = min(o, c) - l                                 # lower shadow
upper = h - max(o, c)                                 # upper shadow
after_fall = df['close'].iloc[-3] > df['close'].iloc[-2]
is_hammer = after_fall and lower >= 2 * body and upper <= body""", 'round(body, 2), lower, round(upper, 2), after_fall, is_hammer')

P['engulfing'] = (bars([(103, 103.5, 101.5, 102), (102, 102.5, 99.5, 100), (99.5, 103, 99.2, 102.5)]),
"""(o1, c1), (o2, c2) = df[['open', 'close']].iloc[-2], df[['open', 'close']].iloc[-1]
bullish = c1 < o1 and c2 > o2 and o2 <= c1 and c2 >= o1   # today's body covers yesterday's""", 'o1, c1, o2, c2, bullish')

P['morning-star'] = (bars([(105, 105.5, 99.5, 100), (99, 99.8, 98.5, 99.3), (100, 103.8, 99.8, 103.5)]),
"""d1, d2, d3 = df.iloc[-3], df.iloc[-2], df.iloc[-1]
long_red = d1.open - d1.close > 0.6 * (d1.high - d1.low)
small = abs(d2.close - d2.open) < 0.3 * abs(d1.close - d1.open)
gap_down = max(d2.open, d2.close) < d1.close
mid = (d1.open + d1.close) / 2
strong_green = d3.close > d3.open and d3.close > mid
is_morning_star = long_red and small and gap_down and strong_green""", 'long_red, small, gap_down, mid, strong_green, is_morning_star')

P['evening-star'] = (bars([(100, 105.5, 99.5, 105), (106, 106.5, 105.2, 105.7), (105, 105.2, 101.2, 101.5)]),
"""d1, d2, d3 = df.iloc[-3], df.iloc[-2], df.iloc[-1]
long_green = d1.close - d1.open > 0.6 * (d1.high - d1.low)
small = abs(d2.close - d2.open) < 0.3 * abs(d1.close - d1.open)
gap_up = min(d2.open, d2.close) > d1.close
mid = (d1.open + d1.close) / 2
strong_red = d3.close < d3.open and d3.close < mid
is_evening_star = long_green and small and gap_up and strong_red""", 'long_green, small, gap_up, mid, strong_red, is_evening_star')

P['support-resistance'] = (from_points([(0, 105), (4, 100), (8, 108), (12, 100), (16, 110), (20, 100), (24, 106)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
touches = lows.round(0).value_counts()               # swing lows grouped to the nearest point
level = touches.idxmax()
support = level if touches.max() >= 2 else None
broken = c.iloc[-1] < level * 0.99                    # a close 1% under it""", 'list(lows), support, touches.max(), broken')

P['trendlines'] = (from_points([(0, 103), (4, 100), (8, 107), (12, 104), (16, 111), (20, 108), (24, 113)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
(x1, y1), (x2, y2) = list(lows.iloc[:2].items())      # the first two rising lows
slope = (y2 - y1) / (x2 - x1)
line = lambda x: y1 + slope * (x - x1)
x3, y3 = lows.index[2], lows.iloc[2]                  # the third low tests the line
held = y3 >= line(x3) * 0.99
broken = c.iloc[-1] < line(len(c) - 1)""", 'list(lows.items()), slope, line(x3), y3, held, broken')

P['channels'] = (from_points([(0, 103), (4, 100), (8, 107), (12, 104), (16, 111), (20, 108), (24, 115)]),
SWINGS + """c = df['close']
highs, lows = swings(c)
slope, base = np.polyfit(lows.index, lows.values, 1)   # the lower line through the lows
lower = lambda x: base + slope * x
width = (highs - lower(highs.index)).mean()          # the parallel line through the highs
upper = lambda x: lower(x) + width
x = len(c) - 1""", 'slope, round(width, 2), round(lower(x), 2), round(upper(x), 2)')

P['gaps'] = (bars([(101, 102, 100.5, 101.5), (101.5, 104, 101, 103.8), (106.2, 108, 106, 107.5), (107.5, 108.5, 105.5, 106), (106, 106.5, 103.5, 104)]),
"""gap_up = df['low'] > df['high'].shift()               # the whole bar above yesterday's
size = df['low'] - df['high'].shift()
day = gap_up.idxmax()
bottom = df['high'].iloc[day - 1]                     # the gap's lower edge
filled = (df['low'].iloc[day + 1:] <= bottom).any()""", 'day, round(size[day], 2), bottom, filled')

P['cup-and-handle'] = (from_points(parabola() + [(44, 106), (47, 105), (50, 112)]),
"""c = df['close']
cup = c.iloc[:41]
rim, bottom = min(cup.iloc[0], cup.iloc[-1]), cup.min()
depth = rim - bottom
handle = c.iloc[41:-1]
shallow = rim - handle.min() < depth / 3              # handle retraces under a third of the cup
breakout = c.iloc[-1] > rim
target = rim + depth""", 'rim, bottom, depth, handle.min(), shallow, breakout, target')

def run(which=None):
    out = {}
    for tid, (df, code, show) in P.items():
        if which and tid not in which: continue
        ns = {'df': df.copy(), 'np': np, 'pd': pd}
        exec(code, ns)
        out[tid] = eval(show, ns)
    return out

if __name__ == '__main__':
    import sys
    for tid, r in run(sys.argv[1:] or None).items():
        print(f'{tid:28}', r)
