# Pattern Portal Notebooks

Notebook companions for the Real-Data Cases workflow.

## Available notebooks

- `lab.html` — browser-runnable multi-cell Python lab powered by Pyodide, with markdown/code cells, per-cell output, run-all, saved runs, JSON run export/import, and `.ipynb` notebook export.
- `../lite/lab/?path=pattern-portal-real-data-lab.ipynb` — full JupyterLite Lab integration that opens the real notebook in a Jupyter interface directly on the static site.
- `pattern-portal-real-data-lab.ipynb` — one compact JupyterLite-compatible lab covering housing regression, fraud classification, time-series forecasting, and market backtesting with the site's local CSV samples.

## How to use

1. Use JupyterLite when you want the closest browser experience to JupyterLab.
2. Use `lab.html` only when you want the lightweight custom fallback.
3. Open the `.ipynb` notebook in VS Code or local Jupyter for fuller local workflows.
4. Run the install cell if your environment is missing dependencies.
5. Start with the housing regression section, which uses the local `cases/datasets/housing_sample.csv` file.

## JupyterLite limits

JupyterLite runs Python through Pyodide in the browser. Packages with native networking or compiled system dependencies may not install. The notebook avoids `yfinance` and scikit-learn's remote dataset fetchers for that reason. Use local Jupyter when you need live market downloads or larger external datasets.

Market examples are educational and heuristic. Validate with point-in-time data, costs, slippage, and walk-forward testing before trusting any strategy result.
