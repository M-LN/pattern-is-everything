# Pattern Portal Notebooks

Notebook companions for the Real-Data Cases workflow.

## Available notebooks

- `lab.html` — browser-runnable multi-cell Python lab powered by Pyodide, with markdown/code cells, per-cell output, run-all, saved runs, JSON run export/import, and `.ipynb` notebook export.
- `../lite/lab?path=pattern-portal-real-data-lab.ipynb` — full JupyterLite Lab integration that opens the real notebook in a Jupyter interface directly on the static site.
- `pattern-portal-real-data-lab.ipynb` — one compact lab covering housing regression, fraud classification, time-series forecasting, and market backtesting templates.

## How to use

1. Use JupyterLite when you want the closest browser experience to JupyterLab.
2. Use `lab.html` only when you want the lightweight custom fallback.
3. Open the `.ipynb` notebook in VS Code or local Jupyter for fuller local workflows.
3. Run the install cell if your local environment is missing dependencies.
4. Start with the housing regression section, which uses a built-in scikit-learn dataset.
5. For external datasets, download them from the linked case pages and update the file paths in the notebook.

Market examples are educational and heuristic. Validate with point-in-time data, costs, slippage, and walk-forward testing before trusting any strategy result.
