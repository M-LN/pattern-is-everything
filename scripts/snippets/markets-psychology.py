# Market Psychology snippets. Each one carries its own small example numbers
# (made up unless the comment says where they come from). Running this file
# executes every snippet and prints what the worked example quotes.
import numpy as np
import pandas as pd

P = {}   # topic -> (snippet, what to print)

P['confirmation-bias'] = ("""prior = 0.60                                    # how sure you are the bullish thesis is right
lr = [1.5, 1.5, 1.5, 1 / 1.5, 1 / 1.5, 1 / 1.5]  # three pieces of evidence for it, three equally strong against

def update(p, lrs, w_against=1.0):               # Bayes in log-odds; w_against < 1 discounts contrary evidence
    logit = np.log(p / (1 - p))
    for x in lrs:
        logit += np.log(x) * (w_against if x < 1 else 1)
    return 1 / (1 + np.exp(-logit))

fair = update(prior, lr)
biased = update(prior, lr, w_against=0.5)
biased_after_5_rounds = update(prior, lr * 5, w_against=0.5)""", 'fair, biased, biased_after_5_rounds')

P['anchoring'] = ("""close = pd.Series([80, 78, 74, 70, 66, 63, 61, 64, 62, 60, 63, 62])   # twelve month-end closes, made up
high52 = close.max()                     # the anchor: the 52-week high
ratio = close.iloc[-1] / high52          # George & Hwang's measure, price over its 52-week high
off_high = 1 - ratio
cost = 75                                # where this holder bought: a second anchor
vs_cost = close.iloc[-1] / cost - 1""", 'high52, ratio, off_high, vs_cost')

P['recency-bias'] = ("""r = pd.Series([0.12, 0.08, -0.05, 0.15, 0.10, 0.07, -0.18, 0.22, 0.25, 0.20])   # ten years of returns, made up
long_run = r.mean()
last_three = r.tail(3).mean()
felt = r.ewm(alpha=0.5).mean().iloc[-1]  # each year counts half as much as the one after it""", 'long_run, last_three, felt')

P['availability-heuristic'] = ("""years = 30
crash = np.zeros(years); crash[[8, 27]] = 1       # two crash years in thirty, the latest three years ago
base_rate = crash.mean()

vivid = np.where(crash == 1, 5.0, 1.0)            # a crash year comes to mind five times as easily
fresh = 0.9 ** np.arange(years)[::-1]             # and memories fade by 10% a year
w = vivid * fresh
felt = (w * crash).sum() / w.sum()                # the probability that "feels" right""", 'base_rate, felt')

P['hindsight-bias'] = ("""log = pd.DataFrame({
    'event':      ['rate cut', 'earnings beat', 'recession', 'oil above 100', 'index new high'],
    'said':       [0.30, 0.55, 0.20, 0.40, 0.60],      # written down beforehand
    'happened':   [1, 0, 1, 0, 1],
    'remembered': [0.60, 0.35, 0.45, 0.25, 0.80]})     # what you later recall having said
toward_outcome = np.where(log.happened == 1, log.remembered - log.said, log.said - log.remembered)
brier_said = ((log.said - log.happened) ** 2).mean()   # lower is better
brier_remembered = ((log.remembered - log.happened) ** 2).mean()""", 'toward_outcome.mean(), brier_said, brier_remembered')

P['fear-and-greed'] = ("""s = pd.DataFrame({                               # ten weekly readings, made up
    'vix':      [14, 13, 15, 22, 35, 41, 30, 24, 18, 16],
    'put_call': [0.80, 0.75, 0.85, 1.00, 1.25, 1.30, 1.10, 0.95, 0.85, 0.80],
    'above_200d': [72, 75, 68, 50, 28, 20, 33, 45, 60, 66]})   # % of stocks above their 200-day average
z = (s - s.mean()) / s.std()
fear = (z.vix + z.put_call - z.above_200d) / 3    # high = fear, low = greed
label = np.select([fear > 1, fear < -1], ['extreme fear', 'extreme greed'], 'neutral')""", 'fear.round(2).tolist(), label.tolist()')

P['loss-aversion'] = ("""def v(x, a=0.88, lam=2.25):                      # Tversky & Kahneman's (1992) median estimates
    return np.where(x >= 0, np.abs(x) ** a, -lam * np.abs(x) ** a)

ev = 0.5 * 110 + 0.5 * -100                      # a fair coin: win 110 or lose 100
felt = 0.5 * v(110) + 0.5 * v(-100)
win_needed = 100 * 2.25 ** (1 / 0.88)            # the win that makes losing 100 feel even""", 'ev, float(felt), win_needed')

P['regret-aversion'] = ("""pay = pd.DataFrame({'sell now': [0, 0, 0], 'sell half': [15, 2.5, -10], 'hold': [30, 5, -20]},
                   index=['rally', 'flat', 'drop'])      # profit from here in each outcome
p = np.array([0.35, 0.35, 0.30])                         # your odds for the three outcomes
ev = pay.T @ p
regret = pay.max(axis=1).values[:, None] - pay.values    # best choice in hindsight minus yours
worst_regret = pd.Series(regret.max(axis=0), index=pay.columns)""", 'ev.to_dict(), worst_regret.to_dict()')

P['overconfidence'] = ("""fc = pd.DataFrame({                              # ten ranges you were "90% sure" of, made up
    'low':    [95, 40, 1.8, 210, 70, 12, 3.1, 150, 88, 25],
    'high':   [105, 48, 2.2, 240, 80, 15, 3.5, 170, 96, 30],
    'actual': [108, 44, 2.5, 236, 64, 13, 3.4, 181, 90, 31]})
hit_rate = fc.actual.between(fc.low, fc.high).mean()""", 'hit_rate')

P['disposition-effect'] = ("""book = pd.DataFrame({                            # every position held on the days something was sold
    'gain': [1, 1, 1, 0, 0, 0, 0,  1, 1, 0, 0, 0,  1, 1, 1, 0, 0],
    'sold': [1, 0, 1, 0, 0, 0, 0,  1, 0, 0, 1, 0,  1, 0, 0, 0, 0]})
g, s = book.gain == 1, book.sold == 1
PGR = (g & s).sum() / g.sum()                    # proportion of gains realized (Odean 1998)
PLR = (~g & s).sum() / (~g).sum()                # proportion of losses realized""", 'PGR, PLR, PGR / PLR')

P['herd-behavior'] = ("""from math import comb
q = pd.DataFrame({'buyers': [18, 9, 14, 5, 11], 'sellers': [2, 11, 6, 15, 9]},
                 index=list('ABCDE'))            # funds buying and selling five stocks in one quarter, made up
n = q.buyers + q.sellers
p = q.buyers / n
p_all = q.buyers.sum() / n.sum()                 # share of all trades that are buys

def af(n, p):                                    # |p_i - p_all| expected by chance alone
    return sum(comb(n, k) * p**k * (1 - p)**(n - k) * abs(k / n - p) for k in range(n + 1))

H = (p - p_all).abs() - n.apply(af, p=p_all)     # Lakonishok, Shleifer & Vishny's herding measure""", 'p_all, H.round(3).to_dict(), H.mean()')

P['fomo'] = ("""close = pd.Series([10, 10.5, 11, 12, 13.5, 15.5, 18, 21, 19, 16, 14, 13])   # a run-up and its unwind, made up
entry = close[close >= 2 * close.iloc[0]].index[0]   # the FOMO buyer waits until it has doubled
fomo = close.iloc[-1] / close[entry] - 1
early = close.iloc[-1] / close.iloc[0] - 1""", 'entry, close[entry], fomo, early')

P['social-proof'] = ("""rng = np.random.default_rng(1)

def market(social, songs=10, listeners=2000):    # ten songs of equal quality
    plays = np.ones(songs)
    for _ in range(listeners):
        p = plays / plays.sum() if social else np.full(songs, 1 / songs)   # social: pick in proportion to plays so far
        plays[rng.choice(songs, p=p)] += 1
    return plays

top_share = lambda w: w.max() / w.sum()
alone = [top_share(market(False)) for _ in range(5)]
seen = [market(True) for _ in range(5)]
together = [top_share(w) for w in seen]
winners = [int(w.argmax()) for w in seen]""", 'np.round(alone, 2).tolist(), np.round(together, 2).tolist(), winners')

P['contrarian-thinking'] = ("""close = pd.Series([100, 92, 85, 70, 72, 60, 55, 50, 58, 66, 75, 82])   # a sell-off and recovery, made up
entry = close[close <= 0.7 * close.iloc[0]].index[0]   # buy into the panic, 30% below the high
worst = close[entry:].min() / close[entry] - 1        # what you sit through first
final = close.iloc[-1] / close[entry] - 1""", 'entry, close[entry], worst, final')

P['information-cascades'] = ("""rng = np.random.default_rng(7)

def queue(n=20, q=0.6):                           # the right choice is 1; each private signal is right 60% of the time
    acts, lead = [], 0                            # lead = adopters minus rejecters seen so far
    for _ in range(n):
        signal = 1 if rng.random() < q else 0
        act = (1 if lead > 0 else 0) if abs(lead) >= 2 else signal   # two ahead: copy the crowd, ignore the signal
        acts.append(act); lead += 1 if act else -1
    return acts

wrong_cascade = np.mean([queue()[-1] == 0 for _ in range(10_000)])
pooled_right = np.mean(rng.binomial(20, 0.6, 10_000) > 10)   # if all 20 signals were shared and counted""", 'wrong_cascade, pooled_right')

P['sunk-cost-fallacy'] = ("""shares, paid, now = 100, 50.0, 35.0
sunk = (paid - now) * shares                     # lost whether you sell or not
hold_view = 0.04                                 # your honest expected return from here
best_other = 0.07                                # e.g. an index fund
cost_of_holding = (best_other - hold_view) * now * shares   # a year's expected shortfall
back_to_even = paid / now - 1                    # the rise "getting out at even" needs""", 'sunk, cost_of_holding, back_to_even')

P['gambler-fallacy'] = ("""rng = np.random.default_rng(0)
up = rng.random(100_000) < 0.5                   # independent up and down days
after_5_down = [up[i] for i in range(5, len(up)) if not up[i - 5:i].any()]
bounce = np.mean(after_5_down)                   # P(up | five down days in a row)

# Miller & Sanjurjo: in short samples, the average share of heads right after a head is below 1/2
flips = rng.random((100_000, 4)) < 0.5
after_h = flips[:, :-1]
shares_hh = (flips[:, 1:] & after_h).sum(1)[after_h.any(1)] / after_h.sum(1)[after_h.any(1)]""", 'len(after_5_down), bounce, shares_hh.mean()')

P['framing-effect'] = ("""def v(x, a=0.88, lam=2.25):                      # prospect theory's value function
    return np.where(x >= 0, np.abs(x) ** a, -lam * np.abs(x) ** a)

# Tversky & Kahneman (1981): 600 lives at stake, the same two programmes described two ways
saved_sure, saved_gamble = v(200), (1 / 3) * v(600)        # "200 will be saved" vs "1/3 chance all 600 are saved"
die_sure, die_gamble = v(-400), (2 / 3) * v(-600)          # "400 will die" vs "2/3 chance all 600 die"
expected_saved = (200, 600 / 3)""", 'float(saved_sure), float(saved_gamble), float(die_sure), float(die_gamble), expected_saved')

P['mental-accounting'] = ("""capital, profit = 10_000, 4_000                  # the same 14,000, in two mental accounts
risk = 0.01 * capital + 0.25 * profit            # 1% of "my money", 25% of "house money"
share_at_risk = risk / (capital + profit)
one_account = 0.01 * (capital + profit)          # the same 1% rule on all of it""", 'risk, share_at_risk, one_account')

P['status-quo-bias'] = ("""w0 = np.array([0.60, 0.40])                       # target: 60% stocks, 40% bonds
r = np.array([[0.20, 0.02], [0.15, 0.03], [0.25, -0.01], [0.10, 0.04], [0.18, 0.02]])   # five years, made up
grown = w0 * np.prod(1 + r, axis=0)
w_now = grown / grown.sum()                      # what you hold after five years of doing nothing""", 'w_now.round(3).tolist()')

P['market-sentiment-cycle'] = ("""close = pd.Series([100, 104, 109, 115, 123, 130, 133, 134, 132, 129, 124, 116,
                   106, 96, 88, 84, 83, 85, 88, 93, 99, 106])   # 22 months, made up
trend = close.rolling(6).mean()
rising = close.diff() > 0
phase = np.select([(close > trend) & rising, (close > trend) & ~rising,
                   (close <= trend) & ~rising, (close <= trend) & rising],
                  ['optimism-euphoria', 'anxiety-denial', 'panic-capitulation', 'hope-relief'], '')
starts = [(i, ph) for i, ph in enumerate(phase) if ph and phase[i - 1] != ph]   # month each phase begins""", 'starts')

P['accumulation-distribution'] = ("""df = pd.DataFrame({                              # a fall, then a sideways range, made up
    'close':  [60, 56, 52, 49, 47, 48, 46, 47.5, 47, 48.5, 47.5, 49, 48, 49.5],
    'volume': [30, 35, 40, 45, 50, 38, 22, 36, 20, 40, 21, 42, 19, 44]})
box = df.tail(10)                                    # the last ten days
width = (box.close.max() - box.close.min()) / box.close.mean()
up = box.close.diff() > 0
up_down_volume = box.volume[up].mean() / box.volume[~up].mean()   # > 1 is read as quiet buying""", 'width, up_down_volume')

P['euphoria-panic'] = ("""peak, trough = 5048.62, 1114.11                  # Nasdaq Composite closes, 10 Mar 2000 and 9 Oct 2002
fall = trough / peak - 1
needed = peak / trough - 1                       # the rise needed just to get back
up, down = 1.50, -0.60
round_trip = (1 + up) * (1 + down) - 1           # +150% then -60%""", 'fall, needed, round_trip')

P['smart-money-dumb-money'] = ("""r = np.array([0.30, 0.25, -0.20, -0.10, 0.15])   # a fund's return each year, made up
flow = np.array([100, 200, 400, -300, -100])     # money investors put in (+) or take out (-) at each year's start

value = 0.0
for f, x in zip(flow, r):
    value = (value + f) * (1 + x)
fund = np.prod(1 + r) ** (1 / len(r)) - 1        # time-weighted: what the fund earned

cash = np.append(-flow, value)                   # the investors' own cash flows
roots = np.roots(cash[::-1])                     # money-weighted: the IRR of those flows
irr = [z.real - 1 for z in 1 / roots if abs(z.imag) < 1e-9 and z.real > 0]   # per-year rate""", 'value, fund, irr[0]')

P['mean-reversion-psychology'] = ("""rng = np.random.default_rng(3)
skill = rng.normal(0, 1, 10_000)                 # 10,000 managers: a little skill,
year1 = skill + rng.normal(0, 2, 10_000)         # a lot of luck
year2 = skill + rng.normal(0, 2, 10_000)
top = year1 >= np.quantile(year1, 0.9)           # last year's top 10%
kept = year2[top].mean() / year1[top].mean()     # theory: var(skill) / var(total) = 1 / 5""", 'year1[top].mean(), year2[top].mean(), kept')

if __name__ == '__main__':
    for tid, (code, show) in P.items():
        ns = {'np': np, 'pd': pd}
        exec(code, ns)
        print(tid, '=>', eval(show, ns))
