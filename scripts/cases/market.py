"""Case: a century of the 200-day moving-average rule."""
from svg import bars, lines

ID = 'market-backtest'
SHORT = 'The 200-day rule'
TITLE = 'A century of the 200-day rule: <em>where the edge came from</em>'
KICKER = 'Backtest · US stock market, daily, 1926–2026'
DESCRIPTION = ('The 200-day moving-average rule tested on a hundred years of daily US stock market returns: its '
               'whole-sample edge comes from one era, it has trailed buy-and-hold since 1976, and a one-day '
               'look-ahead bug almost doubles its return.')
QUESTION = ('Stay in the stock market while it is above its 200-day average, move to Treasury bills when it falls '
            'below: one of the oldest trend-following rules. Does it beat simply holding the market — and when?')
URL = 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_Factors_daily_CSV.zip'
URL_SUBS = {"('https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/'\n"
            "       'F-F_Research_Data_Factors_daily_CSV.zip')": 'ff_daily.zip'}
FILES = []
NOTEBOOK = 'case-market-backtest.ipynb'
DATA = {
    'name': 'Fama/French research factors, daily',
    'what': 'The daily return of the whole US stock market (all NYSE, AMEX and NASDAQ stocks, weighted by value, '
            'from CRSP) in excess of the one-month Treasury bill, and the T-bill return itself, since July 1926.',
    'source': '<a href="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html">Kenneth R. French '
              'Data Library</a>, Tuck School of Business',
    'license': 'Free to download for research and teaching; not redistributed here — the code below fetches it '
               'from the library, and this page shows only results computed from it',
    'get': 'The code in step 1 downloads the file (≈0.2 MB) directly. The page has no Run buttons, because a '
           'browser page cannot fetch from that site; use the notebook below.',
}

LEVEL, BADGE, EVIDENCE = 'Advanced', 'Markets', ('heuristic', 'Heuristic')
LAB = ('Markets Paper Trading Lab', '/sandbox/markets/#paper-trading')
FINDING = ('{rule_cagr} a year against {hold_cagr} for buy-and-hold since 1927 — but the edge comes from '
           '1927–1975. Since 2001: {e3_rule} against {e3_hold}. With a one-day look-ahead bug: {cheat_cagr}.')

STEPS = [
    {
        'title': 'A hundred years of daily returns',
        'before': 'Load the file, turn percentages into fractions, and add the T-bill rate back to get the market’s '
                  'total return.',
        'code': """import numpy as np
import pandas as pd

url = ('https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/'
       'F-F_Research_Data_Factors_daily_CSV.zip')
ff = pd.read_csv(url, skiprows=4, index_col=0)          # pandas unzips it
ff = ff[ff.index.astype(str).str.strip().str.fullmatch(r'\\d{8}')]   # drop the copyright line
ff.index = pd.to_datetime(ff.index.astype(str).str.strip(), format='%Y%m%d')
ff = ff.astype(float) / 100
r = ff['Mkt-RF'] + ff['RF']          # the market's daily total return
rf = ff['RF']                        # the T-bill's
print(len(r), 'days,', r.index[0].date(), 'to', r.index[-1].date())
print('five worst days:', {d.date().isoformat(): round(v, 3) for d, v in r.nsmallest(5).items()})""",
        'after': 'The worst day, {worst_day}, lost <strong>{worst_pct}</strong> — {worst_sd} times the standard '
                 'deviation of a day’s return. Three of the five worst came in the crash of autumn 1929, one in March 2020.',
    },
    {
        'title': 'The rule, without peeking',
        'before': 'Build the market’s value from its returns and its 200-day average. The decision for each day is '
                  'taken from the previous day’s close — the <code>shift(1)</code> — because that is all an '
                  'investor would have known. Out of the market, the money earns the T-bill rate. Each switch '
                  'costs 0.1%.',
        'code': """price = (1 + r).cumprod()
above = (price > price.rolling(200).mean()).shift(1)   # yesterday's close vs its average
start = price.rolling(200).mean().first_valid_index() + pd.Timedelta(days=1)
r, rf, above = r[start:], rf[start:], above[start:].astype(bool)
switch = above != above.shift(1, fill_value=True)
rule = pd.Series(np.where(above, r, rf), index=r.index) - 0.001 * switch

def summary(x, name):
    years = len(x) / 252
    growth = (1 + x).prod() ** (1 / years) - 1
    wealth = (1 + x).cumprod()
    drawdown = (wealth / wealth.cummax() - 1).min()
    sharpe = (x - rf.loc[x.index]).mean() / x.std() * np.sqrt(252)
    print(f'{name:16} {growth:6.2%} a year | volatility {x.std() * np.sqrt(252):6.2%} | '
          f'worst drawdown {drawdown:7.1%} | Sharpe {sharpe:.2f}')
    return growth, drawdown

hold_all = summary(r, 'buy and hold')
rule_all = summary(rule, '200-day rule')
print('switches per year:', round(switch.sum() / (len(r) / 252), 1))""",
        'after': 'Over the whole period the rule wins on every line: <strong>{rule_cagr}</strong> a year against '
                 '{hold_cagr} for buy-and-hold, at two thirds of the volatility, and a worst drawdown of '
                 '{rule_dd} instead of {hold_dd}. That is the headline result.',
    },
    {
        'title': 'Split the century',
        'before': 'The same comparison, era by era.',
        'code': """eras = {'1927-1975': ('1927', '1975'),
        '1976-2000': ('1976', '2000'),
        '2001-2026': ('2001', '2026')}
by_era = {}
for era, (a, b) in eras.items():
    print(era)
    by_era[era] = (summary(r[a:b], '  buy and hold'), summary(rule[a:b], '  200-day rule'))""",
        'after': 'The whole-sample edge comes from <strong>1927–1975</strong>, when the rule sidestepped most of '
                 'the 1929–32 crash: {e1_rule} a year against {e1_hold}. Since 1976 it has earned less than simply '
                 'holding the market — {e2_rule} against {e2_hold}, then {e3_rule} against {e3_hold} — while still '
                 'cutting the worst drawdown, from {e2_hold_dd} to {e2_rule_dd} and from {e3_hold_dd} to {e3_rule_dd}. In the recent eras it behaved like insurance, not like '
                 'an engine of return. Sullivan, Timmermann and White found the same pattern '
                 'on the Dow Jones index: the best rules over 1897–1986 survived a correction for data snooping, '
                 'but their performance did not repeat in the decade that followed.',
        'chart': lambda ns: bars(
            [(era, [v[0][0] * 100, v[1][0] * 100]) for era, v in ns['by_era'].items()],
            ['buy and hold', '200-day rule'], fmt='{:.1f}%', title='Annual growth by era',
            note='Compound annual return, with 0.1% per switch for the rule. Daily data, US market (CRSP value-weighted).'),
    },
    {
        'title': 'The bug that nearly doubles the result',
        'before': 'Remove the <code>shift(1)</code>: decide each day using that same day’s close — which is only '
                  'known once the day’s return has already happened.',
        'code': """peek = (price > price.rolling(200).mean())[start:]
cheat = pd.Series(np.where(peek, r, rf), index=r.index)
cheat -= 0.001 * (peek != peek.shift(1, fill_value=True))
cheat_all = summary(cheat, 'with look-ahead')""",
        'after': 'One missing <code>shift</code>, and the rule earns <strong>{cheat_cagr}</strong> a year — {cheat_ratio} times '
                 'the honest {rule_cagr}. A day’s own return is what pushes the price across its average, so the '
                 'bugged rule is in the market for the rise that crosses it upward and out of it for the fall that '
                 'crosses it downward. Bugs in backtests are '
                 'rarely this visible; most leak a little information and inflate a little, which is why '
                 'an implausibly good backtest should be checked line by line before anything else.',
        'chart': lambda ns: lines(
            ns['curve_years'], {'buy and hold': ns['curve_hold'], '200-day rule': ns['curve_rule'],
                                'with look-ahead': ns['curve_cheat']},
            title='Growth of $1, log scale', log=True, yfmt=lambda v: '${:,.0f}'.format(v),
            xticks=[1930, 1950, 1970, 1990, 2010], yticks=[1, 100, 10_000, 1_000_000, 100_000_000],
            note='Value of $1 invested in May 1927, year-end values, log scale. The look-ahead line is the bug, not a strategy.'),
    },
]


def derive(ns):
    _curves(ns)
    r = ns['r']
    worst = r.idxmin()
    sd = r.std()
    e = ns['by_era']
    pct = lambda v: '%.1f%%' % (100 * v)
    out = {
        'worst_day': '%d %s' % (worst.day, worst.strftime('%B %Y')),
        'worst_sd': '%.0f' % (-r.min() / sd),
        'worst_pct': pct(-r.min()),
        'rule_cagr': pct(ns['rule_all'][0]), 'hold_cagr': pct(ns['hold_all'][0]),
        'rule_dd': '%.0f%%' % (-100 * ns['rule_all'][1]), 'hold_dd': '%.0f%%' % (-100 * ns['hold_all'][1]),
        'cheat_ratio': '%.1f' % (ns['cheat_all'][0] / ns['rule_all'][0]),
        'cheat_cagr': pct(ns['cheat_all'][0]),
    }
    for i, era in enumerate(e, 1):
        out['e%d_hold' % i] = pct(e[era][0][0])
        out['e%d_rule' % i] = pct(e[era][1][0])
        out['e%d_hold_dd' % i] = '%.0f%%' % (-100 * e[era][0][1])
        out['e%d_rule_dd' % i] = '%.0f%%' % (-100 * e[era][1][1])
    return out


def _curves(ns):
    import pandas as pd
    yearly = lambda x: (1 + x).cumprod().resample('YE').last()
    h, ru, c = yearly(ns['r']), yearly(ns['rule']), yearly(ns['cheat'])
    ns['curve_years'] = [d.year for d in h.index]
    ns['curve_hold'], ns['curve_rule'], ns['curve_cheat'] = h.tolist(), ru.tolist(), c.tolist()


TAKEAWAYS = [
    'A full-sample backtest is an average over regimes. Split it by era before believing it: here one era '
    'supplies the whole century’s edge.',
    'Lag every signal to the information available at the time. A one-day look-ahead added eight points a year.',
    'Judge a rule on what it is for. Since 1976 the 200-day rule has cost return and reduced drawdowns — a '
    'trade some investors want, but not the free lunch the full sample suggests.',
    'Include trading costs and count the trades: five or so switches a year is cheap; a faster rule may not be.',
]
PATTERNS = [
    ('stats/walk-forward', 'testing a rule on data it was not designed on'),
    ('markets/indicators/sma', 'the moving average itself'),
    ('markets/risk/drawdown-analysis', 'what the rule actually reduces'),
    ('essays/essay-forking', 'many rules tried, one reported'),
    ('markets/risk/tail-risk', 'days like 19 October 1987'),
]
SOURCES = [
    'K. R. French, Data Library: Fama/French 3 Factors [Daily], Tuck School of Business — the data (CRSP-based)',
    'W. Brock, J. Lakonishok &amp; B. LeBaron, “Simple Technical Trading Rules and the Stochastic Properties of Stock Returns”, <em>Journal of Finance</em> 47(5), 1992',
    'R. Sullivan, A. Timmermann &amp; H. White, “Data-Snooping, Technical Trading Rule Performance, and the Bootstrap”, <em>Journal of Finance</em> 54(5), 1999',
    'M. T. Faber, “A Quantitative Approach to Tactical Asset Allocation”, <em>Journal of Wealth Management</em> 9(4), 2007',
]
