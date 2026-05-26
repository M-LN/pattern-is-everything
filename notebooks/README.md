# Pattern Portal Notebooks

Notebook companions for the Real-Data Cases workflow.

## Available notebooks

- `lab.html` — browser-runnable Python lab powered by Pyodide, with small editable experiments for regression, drift, forecasting, and indicator backtesting. Runs can be saved, exported to JSON, imported again, and reloaded.
- `pattern-portal-real-data-lab.ipynb` — one compact lab covering housing regression, fraud classification, time-series forecasting, and market backtesting templates.

## How to use

1. Use `lab.html` when you want code to run directly on the website.
2. Open the `.ipynb` notebook in VS Code or Jupyter for fuller local workflows.
3. Run the install cell if your local environment is missing dependencies.
4. Start with the housing regression section, which uses a built-in scikit-learn dataset.
5. For external datasets, download them from the linked case pages and update the file paths in the notebook.

Market examples are educational and heuristic. Validate with point-in-time data, costs, slippage, and walk-forward testing before trusting any strategy result.
