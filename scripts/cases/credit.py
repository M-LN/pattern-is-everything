"""Case: credit card default — the accuracy that hides the misses."""
from svg import bars

ID = 'credit-default'
SHORT = 'Credit card default'
TITLE = 'Credit card default: <em>82% accurate, most defaults missed</em>'
KICKER = 'Classification · 30,000 clients · Taiwan, 2005'
DESCRIPTION = ('A default model on 30,000 real credit card clients is 82% accurate and still misses most defaults. '
               'Undocumented codes, a 4-point gain over guessing, and a threshold set by cost instead of 0.5.')
QUESTION = ('Which credit card clients will miss next month’s payment? A model that is right four times in five '
            'sounds useful — this case asks what it actually catches, and what the data dictionary did not say.')
FILES = ['credit.csv']
NOTEBOOK = 'case-credit-default.ipynb'
DATA = {
    'name': 'Default of Credit Card Clients',
    'what': 'One row per client of a Taiwanese bank, April–September 2005: credit limit, sex, education, marital '
            'status, age, six months of repayment status, bill amounts and payments — and whether the client '
            'defaulted the following month.',
    'source': '<a href="https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients">UCI Machine '
              'Learning Repository</a>, donated by I-Cheng Yeh',
    'license': '<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>; here as CSV, with the ID '
               'column dropped and the target renamed <code>default</code>',
    'file': 'credit.csv',
}

LEVEL, BADGE, EVIDENCE = 'Intermediate', 'Classification', ('proven', 'Statistical')
LAB = ('Classification Boundary Lab', '/sandbox/ml/#classification-boundary')
FINDING = ('{boost_acc} accurate, {acc_gain} points better than never predicting a default. At a threshold of 0.5 '
           'it catches {boost_recall} of defaults; at the cost-based threshold, {recall_16}.')

STEPS = [
    {
        'title': 'The number to beat',
        'before': 'Before any model: how often do clients default, and how accurate is a model that never '
                  'predicts a default?',
        'code': """import numpy as np
import pandas as pd

df = pd.read_csv('credit.csv')
default_rate = df['default'].mean()
print(len(df), 'clients | default rate:', round(default_rate, 4))
print('accuracy of always predicting "no default":', round(1 - default_rate, 4))""",
        'after': 'About one client in {one_in} defaults. Predicting “no default” for everyone is right '
                 '<strong>{always_no_pct}</strong> of the time and catches nobody. Any accuracy figure for this '
                 'data has to be read against that.',
    },
    {
        'title': 'The data dictionary and the data disagree',
        'before': 'The documentation says repayment status is −1 for “paid duly” and 1–9 for months of delay, '
                  'education is 1–4 and marital status 1–3. Count what is actually there.',
        'code': """pay = ['PAY_0', 'PAY_2', 'PAY_3', 'PAY_4', 'PAY_5', 'PAY_6']
print('PAY_0 values:', df.PAY_0.value_counts().sort_index().to_dict())
undocumented_pay = df[pay].isin([-2, 0]).any(axis=1).mean()
odd_education = (~df.EDUCATION.isin([1, 2, 3, 4])).sum()
odd_marriage = (~df.MARRIAGE.isin([1, 2, 3])).sum()
print('clients with a -2 or 0 status in some month:', round(undocumented_pay, 3))
print('education codes outside 1-4:', odd_education, '| marriage outside 1-3:', odd_marriage)
print('a status of 1 in PAY_0 vs PAY_2:', (df.PAY_0 == 1).sum(), (df.PAY_2 == 1).sum())""",
        'after': 'The most common repayment status, <strong>0</strong>, is not in the documentation, nor is −2; '
                 '{undoc_pct} of clients have one of them in some month. (Discussions of the data commonly read 0 '
                 'as “revolving credit” and −2 as “no consumption”, but the source does not say.) Status 1 — one month late — '
                 'appears {pay0_ones:,} times in the latest month and only {pay2_ones} times in the month before, '
                 'which suggests the months were not coded the same way. A model will use these columns either way; '
                 'the question is whether you can explain what it learned.',
    },
    {
        'title': 'Two models, and what 0.5 hides',
        'before': 'Hold out 30% of the clients (stratified, so both parts have the same default rate). Fit a '
                  'logistic regression and gradient-boosted trees, and score them at the default threshold of 0.5.',
        'code': """from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, recall_score, precision_score

X, y = df.drop(columns='default'), df['default']
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)

logit = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)
boost = HistGradientBoostingClassifier(random_state=0).fit(X_tr, y_tr)
for name, m in [('logistic', logit), ('boosted trees', boost)]:
    p = m.predict_proba(X_te)[:, 1]
    flag = p >= 0.5
    print(f'{name:14} accuracy {accuracy_score(y_te, flag):.3f}  AUC {roc_auc_score(y_te, p):.3f}  '
          f'recall {recall_score(y_te, flag):.3f}  precision {precision_score(y_te, flag):.3f}')
p = boost.predict_proba(X_te)[:, 1]""",
        'after': 'The boosted model is <strong>{boost_acc}</strong> accurate — {acc_gain} points better than never '
                 'predicting a default — and at a threshold of 0.5 it catches <strong>{boost_recall}</strong> of the '
                 'clients who default. Most defaults go unflagged. The AUC of {boost_auc} says the ranking is '
                 'reasonable; the threshold is what throws the catches away.',
    },
    {
        'title': 'One column against the model',
        'before': 'A rule anyone could write: flag every client who is at least a month late right now.',
        'code': """late = X_te.PAY_0 >= 1
print('rule PAY_0 >= 1: flags', round(late.mean(), 3), 'of clients',
      '| recall', round(recall_score(y_te, late), 3),
      '| precision', round(precision_score(y_te, late), 3))
print('AUC of PAY_0 alone, as a score:', round(roc_auc_score(y_te, X_te.PAY_0), 3))""",
        'after': 'The one-line rule catches <strong>{rule_recall}</strong> of the defaults — more than the model at '
                 '0.5 — with precision {rule_prec}. Last month’s repayment status carries most of the signal; '
                 'the other 22 columns lift the AUC from {pay0_auc} (that column alone) to {boost_auc}. A '
                 'baseline like this belongs in every model report, because it tells you what the model adds.',
    },
    {
        'title': 'Choose the threshold from the costs',
        'before': 'Suppose a missed default costs five times as much as flagging a client who would have paid. '
                  'If the probabilities are calibrated, the cost-minimising rule is to flag when the probability '
                  'exceeds 1 / (1 + 5) ≈ 0.17. Check the calibration, then compare thresholds.',
        'code': """bins = pd.qcut(p, 10, labels=False)                # ten groups by predicted probability
calib = pd.DataFrame({'predicted': p, 'actual': y_te.values}).groupby(bins).mean().round(3)
print(calib.T.to_string())

costs = {}
for th in (0.5, 0.3, 0.2, 1 / 6, 0.1):
    flag = p >= th
    missed = (~flag & (y_te == 1)).sum()
    false_alarm = (flag & (y_te == 0)).sum()
    cost = 5 * missed + false_alarm
    costs[round(th, 3)] = cost
    print(f'threshold {th:.3f}: flags {flag.mean():.3f}  recall {recall_score(y_te, flag):.3f}  cost {cost}')""",
        'after': 'Predicted and actual default rates agree within a few points in every decile, so the '
                 'probabilities can be taken at face value. At the cost-based threshold the model flags '
                 '{flag_16} of clients and catches <strong>{recall_16}</strong> of the defaults, and the total '
                 'cost falls by <strong>{cost_cut}</strong> against 0.5. Nothing about the model changed — only '
                 'the decision drawn from it. The cost curve is flat near its minimum: 0.2 does about as well as 1/6, '
                 'while 0.5 and 0.1 are clearly worse.',
        'chart': lambda ns: bars(
            [('threshold %s' % ('1/6' if abs(k - 1 / 6) < 1e-3 else k), [v]) for k, v in ns['costs'].items()],
            ['cost'], fmt='{:,.0f}', title='Total cost by threshold',
            note='Total cost on the 9,000 test clients: 5 per missed default plus 1 per false alarm.'),
    },
]


def derive(ns):
    from sklearn.metrics import accuracy_score, roc_auc_score, recall_score, precision_score
    p, y_te, X_te = ns['p'], ns['y_te'], ns['X_te']
    late = X_te.PAY_0 >= 1
    acc = accuracy_score(y_te, p >= 0.5)
    flag = p >= 1 / 6
    c = ns['costs']
    return {
        'one_in': '%.1f' % (1 / ns['default_rate']),
        'always_no_pct': '%.1f%%' % (100 * (1 - ns['default_rate'])),
        'undoc_pct': '%.0f%%' % (100 * ns['undocumented_pay']),
        'pay0_ones': int((ns['df'].PAY_0 == 1).sum()), 'pay2_ones': int((ns['df'].PAY_2 == 1).sum()),
        'boost_acc': '%.1f%%' % (100 * acc),
        'acc_gain': '%.1f' % (100 * (acc - (1 - ns['default_rate']))),
        'boost_recall': '%.0f%%' % (100 * recall_score(y_te, p >= 0.5)),
        'boost_auc': '%.2f' % roc_auc_score(y_te, p),
        'rule_recall': '%.0f%%' % (100 * recall_score(y_te, late)),
        'rule_prec': '%.2f' % precision_score(y_te, late),
        'pay0_auc': '%.2f' % roc_auc_score(y_te, X_te.PAY_0),
        'flag_16': '%.0f%%' % (100 * flag.mean()),
        'recall_16': '%.0f%%' % (100 * recall_score(y_te, flag)),
        'cost_cut': '%.0f%%' % (100 * (1 - c[round(1 / 6, 3)] / c[0.5])),
    }


TAKEAWAYS = [
    'Report accuracy next to the accuracy of the majority class. On imbalanced data, recall and precision at '
    'the threshold you will use say more than accuracy or AUC.',
    '0.5 is a convention, not a decision. With calibrated probabilities, the threshold that minimises cost is '
    'cost of a false alarm ÷ (cost of a false alarm + cost of a miss).',
    'Compare the model with the simplest rule a domain expert would write. If one column does most of the work, '
    'say so — and check what that column really encodes.',
    'Read the data, not only the documentation: count the values that occur and look for codes no one explained.',
]
PATTERNS = [
    ('stats/class-imbalance', 'why the majority class sets the bar'),
    ('stats/confusion-matrix', 'recall, precision and the threshold'),
    ('stats/roc-auc', 'ranking quality, independent of the threshold'),
    ('essays/essay-threshold', 'a threshold is a decision about costs'),
    ('stats/missing-data', 'codes that stand in for “unknown”'),
]
SOURCES = [
    'I-C. Yeh &amp; C-H. Lien, “The comparisons of data mining techniques for the predictive accuracy of probability '
    'of default of credit card clients”, <em>Expert Systems with Applications</em> 36(2), 2009 — the data set',
    'C. Elkan, “The Foundations of Cost-Sensitive Learning”, <em>Proceedings of IJCAI</em>, 2001 — the cost-based threshold',
    'A. Niculescu-Mizil &amp; R. Caruana, “Predicting Good Probabilities with Supervised Learning”, <em>ICML</em>, 2005 — calibration',
]
