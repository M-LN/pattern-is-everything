"""Case: California housing — where the score comes from."""
from svg import bars

ID = 'housing-regression'
SHORT = 'California housing'
TITLE = 'California housing: <em>where the score comes from</em>'
KICKER = 'Regression · 20,640 districts · 1990 census'
DESCRIPTION = ('A house-price model on the California Housing data scores R² 0.84 with random cross-validation '
               'and 0.68 on regions it has not seen. What the test measures, and the price cap hidden in the target.')
QUESTION = ('How well can a model predict the median house value of a California district from census data — '
            'and how much of the score belongs to the model, and how much to the way it is tested?')
FILES = ['housing.csv']
NOTEBOOK = 'case-housing-regression.ipynb'
DATA = {
    'name': 'California Housing',
    'what': 'One row per census block group (a district of typically 600–3,000 people) from the 1990 US census: '
            'location, median age of the houses, rooms, bedrooms, population, households, median income, '
            'and the median house value.',
    'source': '<a href="https://scikit-learn.org/stable/datasets/real_world.html#california-housing-dataset">scikit-learn’s <code>fetch_california_housing</code></a>; '
              'originally StatLib, via Luís Torgo',
    'license': 'Public data from the US census, distributed by StatLib for research and teaching',
    'cite': 'R. K. Pace &amp; R. Barry, “Sparse Spatial Autoregressions”, <em>Statistics &amp; Probability Letters</em> 33(3), 1997',
    'file': 'housing.csv',
}

LEVEL, BADGE, EVIDENCE = 'Beginner', 'Regression', ('proven', 'Statistical')
LAB = ('Linear Regression Lab', '/sandbox/ml/#linear-regression')
FINDING = ('Gradient boosting scores R² {boost[0]:.2f} with random cross-validation and {boost[1]:.2f} on regions it has '
           'not seen; a model that only knows the location drops from {knn[0]:.2f} to {knn[1]:.2f}.')

STEPS = [
    {
        'title': 'Look before modelling',
        'before': 'Load the data and check the ranges. Three columns stop dead at a limit, the sign of values '
                  'cut off (top-coded) when the data were published.',
        'code': """import numpy as np
import pandas as pd

df = pd.read_csv('housing.csv')
df['value'] = df.median_house_value / 100_000            # in $100,000s
rooms = df.total_rooms / df.households

n_rows = len(df)
at_value_cap = (df.median_house_value >= 500_001).sum()   # top-coded at $500,001
at_age_cap = (df.housing_median_age == 52).sum()          # top-coded at 52 years
at_income_cap = (df.median_income >= 15).sum()            # top-coded at 15 ($150,000)
print(n_rows, 'districts')
print('at the value cap:', at_value_cap, f'({at_value_cap / n_rows:.1%})')
print('at the age cap:', at_age_cap, '| at the income cap:', at_income_cap)
print('rooms per household: median', round(rooms.median(), 1), '| max', round(rooms.max(), 1))""",
        'after': '<strong>{at_value_cap}</strong> districts ({at_value_cap_pct}) sit exactly at $500,001. Their true '
                 'median value is somewhere above it, and no model trained on this column can learn by how much. '
                 'The age and income columns are capped too, and a few districts average over 100 rooms per '
                 'household — resort towns, where most houses are holiday homes with few permanent households.',
    },
    {
        'title': 'A baseline, then a test that matches the question',
        'before': 'Predicting the average value for every district misses by about ${baseline_mae_k}k on average. '
                  'Two quick models: a linear regression on income and housing features, and k-nearest neighbours '
                  'that sees nothing but the location — it predicts the average value of the ten nearest districts. '
                  'Each is scored twice: with random 5-fold cross-validation, and with folds made of whole '
                  'regions (1°×1° squares of latitude and longitude, {n_blocks} of them), so the test districts '
                  'lie in areas the model has not seen.',
        'code': """from sklearn.model_selection import KFold, PredefinedSplit, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor

X = pd.DataFrame({
    'income': df.median_income, 'age': df.housing_median_age, 'rooms': rooms,
    'bedroom_share': df.total_bedrooms / df.total_rooms,
    'people_per_household': df.population / df.households,
    'lat': df.latitude, 'lon': df.longitude})
jitter = np.random.default_rng(0).normal(0, 1e-6, (len(X), 2))
X[['lat', 'lon']] += jitter      # districts that share coordinates: makes "nearest" unique
y = df.value
baseline_mae = (y - y.mean()).abs().mean()

block = np.floor(df.latitude).astype(int) * 1000 + np.floor(df.longitude).astype(int)
sizes = block.value_counts().sort_index().sort_values(ascending=False, kind='stable')
n_blocks = len(sizes)
load, fold = np.zeros(5), {}
for b, n in sizes.items():       # largest region first, each to the emptiest fold
    k = int(load.argmin()); fold[b] = k; load[k] += n
random_cv = KFold(5, shuffle=True, random_state=0)
region_cv = PredefinedSplit(block.map(fold))

def r2(model, cols):
    a = cross_val_score(model, X[cols], y, cv=random_cv, scoring='r2').mean()
    b = cross_val_score(model, X[cols], y, cv=region_cv, scoring='r2').mean()
    return round(a, 3), round(b, 3)

features = ['income', 'age', 'rooms', 'bedroom_share', 'people_per_household']
linear = r2(LinearRegression(), features)
knn = r2(KNeighborsRegressor(10), ['lat', 'lon'])
print('baseline MAE:', round(baseline_mae, 3))
print('R² (random folds, new regions)')
print('  linear, no location:', linear)
print('  10 nearest districts:', knn)""",
        'after': 'The linear model scores about the same either way (R² {linear[0]:.2f} and {linear[1]:.2f}). The '
                 'location-only model looks better than it — <strong>R² {knn[0]:.2f}</strong> with random folds — and '
                 'collapses to <strong>{knn[1]:.2f}</strong> on new regions. With random folds, the nearest neighbours of '
                 'a test district are its own neighbours in the training data; the model is not predicting, it is '
                 'looking up the street. Nearby districts have similar prices (spatial autocorrelation), so random '
                 'folds leak information whenever location is a feature.',
    },
    {
        'title': 'A stronger model, the same gap',
        'before': 'Gradient-boosted trees on all the features, location included — the kind of model that wins '
                  'tabular benchmarks. It is fitted ten times, once per fold of each test.',
        'code': """from sklearn.ensemble import HistGradientBoostingRegressor

boost = r2(HistGradientBoostingRegressor(random_state=0), list(X.columns))
print('gradient boosting, all features:', boost)""",
        'after': 'R² <strong>{boost[0]:.2f}</strong> with random folds, <strong>{boost[1]:.2f}</strong> on new regions. '
                 'Both numbers are correct; they answer different questions. If the model will value houses in '
                 'districts like the ones it was trained on — filling gaps on a map it already covers — the random '
                 'score is the right one. If it will be used somewhere new, only the regional score says what to '
                 'expect, and it is {boost_drop} lower.',
        'chart': lambda ns: bars(
            [('Linear, no location', [ns['linear'][0], ns['linear'][1]]),
             ('10 nearest districts', [ns['knn'][0], ns['knn'][1]]),
             ('Gradient boosting, all', [ns['boost'][0], ns['boost'][1]])],
            ['random folds', 'new regions'], fmt='{:.2f}', title='R² by model and test',
            note='R², 5-fold cross-validation. “New regions”: folds of whole 1°×1° squares, so no test district has '
                 'training data from its own area.'),
    },
    {
        'title': 'What the cap does to the errors',
        'before': 'Hold out a random fifth of the districts, fit the boosted model on the rest, and look at the '
                  'districts whose value is capped.',
        'code': """from sklearn.model_selection import train_test_split

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
model = HistGradientBoostingRegressor(random_state=0).fit(X_tr, y_tr)
pred = pd.Series(model.predict(X_te), index=y_te.index)
err = (pred - y_te).abs()

capped = y_te >= 5.00001
worst = err >= err.quantile(0.95)                         # the 5% largest errors
print('test MAE:', round(err.mean(), 3), '| capped districts in test:', capped.sum())
print('mean prediction for capped districts:', round(pred[capped].mean(), 2))
print('share of capped districts among the worst 5%:',
      round((capped & worst).sum() / worst.sum(), 3))
print('highest prediction:', round(pred.max(), 2))""",
        'after': 'The capped districts are {capped_share} of the test set but <strong>{worst_capped_pct}</strong> of '
                 'the worst 5% of errors. For them the model predicts ${capped_pred_k}k on average, against a '
                 'recorded $500,001 that is itself an underestimate. A metric averaged over all districts hides '
                 'this: the error is concentrated at the expensive end, where a valuation mistake costs the most.',
    },
]


def derive(ns):
    """Values the text uses that the code does not print directly."""
    y_te, capped, err = ns['y_te'], ns['capped'], ns['err']
    worst = err >= err.quantile(0.95)
    return {
        'at_value_cap_pct': '%.1f%%' % (100 * ns['at_value_cap'] / ns['n_rows']),
        'baseline_mae_k': '%.0f' % (ns['baseline_mae'] * 100),
        'capped_share': '%.0f%%' % (100 * capped.mean()),
        'worst_capped_pct': '%.0f%%' % (100 * (capped & worst).sum() / worst.sum()),
        'boost_drop': '%.0f%%' % (100 * (1 - ns['boost'][1] / ns['boost'][0])),
        'capped_pred_k': '%.0f' % (ns['pred'][capped].mean() * 100),
    }


TAKEAWAYS = [
    'Choose the cross-validation split to match how the model will be used. Random folds measure '
    'interpolation; grouped folds (by region, customer, time) measure generalisation to new groups.',
    'A feature that identifies neighbours — location, user ID, a timestamp — turns random folds into a '
    'lookup. The bigger the gap between random and grouped scores, the more the model leans on it.',
    'Check every column’s maximum before modelling. A top-coded target puts a ceiling on what the model '
    'can learn and concentrates the error where values are highest.',
]
PATTERNS = [
    ('stats/cross-validation', 'how folds are formed decides what the score means'),
    ('timeseries/cross-validation-ts', 'the same leak, in time instead of space'),
    ('stats/regression-metrics', 'R² and MAE, and what an average hides'),
    ('stats/outlier-detection', 'capped and extreme values'),
    ('ml-math/bias-variance', 'why a flexible model can memorise neighbours'),
]
SOURCES = [
    'R. K. Pace &amp; R. Barry, “Sparse Spatial Autoregressions”, <em>Statistics &amp; Probability Letters</em> 33(3), 1997 — the data set',
    'D. R. Roberts et al., “Cross-validation strategies for data with temporal, spatial, hierarchical, or phylogenetic structure”, <em>Ecography</em> 40(8), 2017',
    'scikit-learn documentation, “Cross-validation: evaluating estimator performance” (group-wise splits)',
]
