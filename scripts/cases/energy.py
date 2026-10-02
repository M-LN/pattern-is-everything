"""Case: one household's electricity — the forecast to beat."""
from svg import bars

ID = 'energy-forecast'
SHORT = 'Household electricity'
TITLE = 'One household’s electricity: <em>the average that is hard to beat</em>'
KICKER = 'Forecasting · 4 years of minute readings · one house near Paris'
DESCRIPTION = ('Forecasting tomorrow’s electricity use for one real household: missing minutes that look like low '
               'demand, seasonal patterns, six naive baselines, and a regression that beats a 7-day average by 1%.')
QUESTION = ('How much electricity will this household use tomorrow? Four years of minute-by-minute readings — '
            'and the question of how much any model adds to simply averaging the last week.')
FILES = ['power-daily.csv']
NOTEBOOK = 'case-energy-forecast.ipynb'
DATA = {
    'name': 'Individual Household Electric Power Consumption',
    'what': 'One house in Sceaux, near Paris, December 2006 to November 2010: active power every minute, about '
            '2 million readings. Here summed to kilowatt-hours per day, with the number of minutes that actually '
            'had a reading.',
    'source': '<a href="https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption">UCI '
              'Machine Learning Repository</a>, donated by Georges Hébrail and Alice Bérard (EDF R&amp;D)',
    'license': '<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>; the daily file is derived '
               'from it by <code>scripts/cases/prepare-data.py</code>',
    'file': 'power-daily.csv',
}

LEVEL, BADGE, EVIDENCE = 'Beginner', 'Time Series', ('proven', 'Statistical')
LAB = ('Timeseries Forecast Lab', '/sandbox/ml/#timeseries-forecast')
FINDING = ('The mean of the last 7 days forecasts tomorrow within {mae7} kWh on average; a {n_features}-feature '
           'regression improves on it by {ridge_gain}.')

STEPS = [
    {
        'title': 'Missing minutes look like low demand',
        'before': 'A day has 1,440 minutes. Count the days where some are missing, and look at the days with the '
                  'lowest consumption.',
        'code': """import numpy as np
import pandas as pd

d = pd.read_csv('power-daily.csv', index_col='date', parse_dates=True)
partial = d.minutes < 1440
print(len(d), 'days |', partial.sum(), 'with missing minutes |',
      (d.minutes == 0).sum(), 'with none at all')
complete = d[~partial]
floor = complete.kwh.min()
print('lowest complete day:', round(floor, 1), 'kWh, on', complete.kwh.idxmin().date())
below = d[(d.minutes > 0) & (d.kwh < floor)]
print('part-days below that:', below.kwh.round(1).tolist(),
      '| minutes recorded:', below.minutes.tolist())""",
        'after': 'No complete day used less than <strong>{floor_kwh} kWh</strong> — the lowest was in August 2008, '
                 'when the house was evidently empty: about {floor_w} W around the clock, the appliances that never switch off. Yet {n_below} '
                 'part-days fall below that, down to {min_below} kWh, and the {n_empty} days without a single '
                 'reading sum to exactly 0. They look like the household switching everything off; in fact the '
                 'meter was not recording. Train on them and the model learns collapses that never happened; test '
                 'on them and it is blamed for missing them.',
    },
    {
        'title': 'Repair the days, and keep track of which ones',
        'before': 'Days with at least 90% of their minutes are scaled up to a full day. The rest are treated as '
                  'missing and filled by linear interpolation between the days around them — but marked, so that '
                  'no forecast is scored against an invented value.',
        'code': """mostly_there = d.minutes >= 0.9 * 1440
kwh = (d.kwh * 1440 / d.minutes).where(mostly_there)  # scale near-complete days to 24 h
observed = kwh.notna()
kwh = kwh.interpolate()                                # fill the gaps (model input only)
print('scaled days:', (mostly_there & partial).sum(), '| filled days:', (~observed).sum())
print('mean kWh per day:', round(kwh[observed].mean(), 1),
      '| std:', round(kwh[observed].std(), 1))""",
        'after': '{scaled_days} days are scaled up and {filled_days} filled. A typical day uses about '
                 '{mean_kwh} kWh, give or take {std_kwh} — a lot of day-to-day noise for one household.',
    },
    {
        'title': 'Season and weekday',
        'before': 'Average consumption by month and by day of the week, over the observed days.',
        'code': """by_month = kwh[observed].groupby(kwh[observed].index.month).mean().round(1)
by_weekday = kwh[observed].groupby(kwh[observed].index.dayofweek).mean().round(1)
print('by month (Jan-Dec):', by_month.tolist())
print('by weekday (Mon-Sun):', by_weekday.tolist())""",
        'after': 'Winter days use more than twice as much as August days ({winter} against {august} kWh) — '
                 'probably heating and lighting in winter, and most likely the long French summer holiday in August. '
                 'Weekends are about {weekend_up} higher than weekdays, presumably because people are at home.',
        'chart': lambda ns: bars(
            [(m, [v]) for m, v in zip(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                      ns['by_month'].tolist())],
            ['kWh per day'], fmt='{:.1f}', title='Average daily consumption by month',
            note='Mean kWh per day over the observed days, December 2006 – November 2010.'),
    },
    {
        'title': 'Six naive forecasts, tested on the last year',
        'before': 'Forecast each day of the final twelve months (December 2009 – November 2010) using only the '
                  'days before it — a walk-forward test — and score each forecast with the mean absolute error on '
                  'the days that were actually observed.',
        'code': """forecasts = pd.DataFrame({
    'yesterday': kwh.shift(1),
    'same day last week': kwh.shift(7),
    'same weekday, last 4 weeks': sum(kwh.shift(7 * k) for k in range(1, 5)) / 4,
    'mean of last 7 days': kwh.shift(1).rolling(7).mean(),
    'mean of last 28 days': kwh.shift(1).rolling(28).mean(),
    'same day last year': kwh.shift(364),
})
test = (kwh.index >= '2009-12-01') & observed
mae = forecasts[test].sub(kwh[test], axis=0).abs().mean().round(2).sort_values()
print(mae.to_string())
print('test days:', test.sum())""",
        'after': 'The best of them is the plain <strong>mean of the last 7 days</strong>, {mae7} kWh off on an '
                 'average day of {mean_kwh}. Yesterday alone is noisier ({mae_yday}); the weekday-matched '
                 'forecasts are worse still, because one Tuesday says little about the next. Same day last year '
                 'is the worst of all, despite the strong seasonal pattern: one day a year ago is too noisy a guide.',
        'chart': lambda ns: bars(
            [(k, [v]) for k, v in ns['mae'].items()], ['MAE'], fmt='{:.2f}',
            title='Mean absolute error of naive forecasts',
            note='Mean absolute error in kWh per day, walk-forward over December 2009 – November 2010, observed days only.'),
    },
    {
        'title': 'A model against the average',
        'before': 'A ridge regression on the recent level (yesterday, last week, the 7- and 28-day means), the day '
                  'of the week and the time of year, refitted at the start of each month on everything before it.',
        'code': """from sklearn.linear_model import Ridge

doy = 2 * np.pi * kwh.index.dayofyear / 365.25
X = pd.DataFrame({
    'yesterday': kwh.shift(1), 'last_week': kwh.shift(7),
    'mean7': kwh.shift(1).rolling(7).mean(), 'mean28': kwh.shift(1).rolling(28).mean(),
    'season_sin': np.sin(doy), 'season_cos': np.cos(doy)}, index=kwh.index)
X = X.join(pd.get_dummies(kwh.index.dayofweek, prefix='wd', dtype=float).set_index(kwh.index))
usable = X.notna().all(axis=1)

pred = pd.Series(np.nan, index=kwh.index)
for month in pd.date_range('2009-12-01', '2010-11-01', freq='MS'):
    train = usable & (kwh.index < month)
    now = usable & (kwh.index >= month) & (kwh.index < month + pd.offsets.MonthBegin(1))
    model = Ridge(alpha=1.0).fit(X[train], kwh[train])
    pred[now] = model.predict(X[now])
ridge_mae = (pred[test] - kwh[test]).abs().mean()
print('ridge MAE:', round(ridge_mae, 2), '| mean of last 7 days:', mae['mean of last 7 days'])""",
        'after': '{n_features} features, refitted every month: <strong>{ridge} kWh</strong> against {mae7} for the '
                 '7-day mean, a {ridge_gain} improvement. That is the honest result for this household: most of '
                 'tomorrow is unpredictable from the meter alone, and the little that is predictable a moving '
                 'average already captures. The obvious next input is the weather, which drives heating, '
                 'rather than a more complex model of the same meter readings.',
    },
]


def derive(ns):
    import numpy as np
    bm, bw = ns['by_month'], ns['by_weekday']
    mae = ns['mae']
    return {
        'floor_kwh': '%.1f' % ns['floor'], 'floor_w': '%.0f' % (ns['floor'] / 24 * 1000), 'n_below': len(ns['below']),
        'min_below': '%.1f' % ns['below'].kwh.min(), 'n_empty': int((ns['d'].minutes == 0).sum()),
        'scaled_days': int((ns['mostly_there'] & ns['partial']).sum()),
        'filled_days': int((~ns['observed']).sum()),
        'mean_kwh': '%.0f' % ns['kwh'][ns['observed']].mean(),
        'std_kwh': '%.0f' % ns['kwh'][ns['observed']].std(),
        'winter': '%.0f' % bm[[12, 1]].mean(), 'august': '%.0f' % bm[8],
        'weekend_up': '%.0f%%' % (100 * (bw[[5, 6]].mean() / bw[[0, 1, 2, 3, 4]].mean() - 1)),
        'mae7': '%.2f' % mae['mean of last 7 days'], 'mae_yday': '%.2f' % mae['yesterday'],
        'ridge': '%.2f' % ns['ridge_mae'], 'n_features': ns['X'].shape[1],
        'ridge_gain': '%.0f%%' % (100 * (1 - ns['ridge_mae'] / mae['mean of last 7 days'])),
    }


TAKEAWAYS = [
    'Before forecasting, find out what a low value means. Missing readings that are summed as zeros look '
    'exactly like low demand.',
    'Fill gaps for model input if you must, but never score a forecast against a filled value.',
    'Test forecasts walk-forward — each prediction made only from the past — and always against several naive '
    'baselines. The best naive forecast is the bar a model has to clear.',
    'When a model barely beats a moving average, the limit is usually information, not the model. New inputs '
    '(here: weather) move the error more than new algorithms.',
]
PATTERNS = [
    ('timeseries/backtesting-forecasts', 'walk-forward testing'),
    ('timeseries/decomposition', 'trend, season and the rest'),
    ('timeseries/exponential-smoothing', 'averaging the recent past, weighted'),
    ('stats/missing-data', 'gaps that pretend to be values'),
    ('timeseries/resampling', 'from minutes to days'),
]
SOURCES = [
    'G. Hébrail &amp; A. Bérard, “Individual Household Electric Power Consumption”, UCI Machine Learning Repository, 2012 — the data set',
    'R. J. Hyndman &amp; G. Athanasopoulos, <em>Forecasting: Principles and Practice</em>, 3rd ed., OTexts, 2021 — simple benchmark methods and time series cross-validation',
    'S. Makridakis, E. Spiliotis &amp; V. Assimakopoulos, “Statistical and Machine Learning forecasting methods: Concerns and ways forward”, <em>PLOS ONE</em> 13(3), 2018',
]
