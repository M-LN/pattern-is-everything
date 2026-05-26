# Pattern Portal Notebooks

Notebook companions for the Real-Data Cases workflow.

## Available notebooks

- `../lite/lab/?path=pattern-portal-real-data-lab-browser.ipynb` — full JupyterLite Lab integration that opens a fresh browser-safe notebook path directly on the static site.
- `case-credit-fraud.ipynb` — focused fraud-classification notebook with threshold analysis, PR-AUC, confusion-matrix review, and precision/recall plotting.
- `case-housing-regression.ipynb` — focused housing-regression notebook with baseline comparison, cross-validation, error table, and permutation importance.
- `case-energy-forecast.ipynb` — focused energy-demand notebook with lag features, time-ordered split, naive baselines, and forecast plotting.
- `case-market-backtest.ipynb` — focused market-backtest notebook with shifted signals, costs, equity curves, drawdown, turnover, and Sharpe-style metrics.
- `pattern-portal-real-data-lab-browser.ipynb` — combined overview notebook covering all four cases. This filename intentionally differs from the older lab path so browsers do not reuse a stale IndexedDB copy with `yfinance` still in the install cell.
- `pattern-portal-real-data-lab.ipynb` — the same compact lab for VS Code or local Jupyter workflows.

## How to use

1. Use JupyterLite when you want the closest browser experience to JupyterLab.
2. Open a case card from Real-Data Cases to launch the matching dedicated notebook.
3. Use the combined notebook only when you want all four cases in one place.
4. Open the `.ipynb` notebook in VS Code or local Jupyter for fuller local workflows.
5. Run the install cell if your environment is missing dependencies.

## JupyterLite limits

JupyterLite runs Python through Pyodide in the browser. Packages with native networking or compiled system dependencies may not install. The notebook avoids `yfinance` and scikit-learn's remote dataset fetchers for that reason. Use local Jupyter when you need live market downloads or larger external datasets.

If you still see an install cell that includes `yfinance`, your browser is showing an old JupyterLite-stored notebook. Open the `pattern-portal-real-data-lab-browser.ipynb` path above, or clear the site's browser storage and reload JupyterLite.

Market examples are educational and heuristic. Validate with point-in-time data, costs, slippage, and walk-forward testing before trusting any strategy result.
