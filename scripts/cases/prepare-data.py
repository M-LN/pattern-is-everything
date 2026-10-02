"""Download the case studies' source data and write the files the cases use.

  python scripts/cases/prepare-data.py

Downloads go to .cache/cases/ (not in the repository) and are reused when
present. Written to cases/data/:

  housing.csv        California Housing, 1990 census block groups (StatLib),
                     unchanged apart from column names
  credit.csv         Default of Credit Card Clients (UCI, CC BY 4.0), the
                     sheet as published, ID dropped, target renamed 'default'
  power-daily.csv    Individual Household Electric Power Consumption (UCI,
                     CC BY 4.0), minute readings summed to kWh per day, with
                     the number of minutes actually recorded that day

The market case's data (Kenneth R. French Data Library) stay in the cache:
the case publishes results computed from them, not the data themselves.
Requires numpy, pandas and xlrd (for the .xls sheet).
"""
import io
import os
import tarfile
import urllib.request
import zipfile

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CACHE = os.path.join(ROOT, '.cache', 'cases')
OUT = os.path.join(ROOT, 'cases', 'data')

SOURCES = {
    'cal_housing.tgz': 'https://ndownloader.figshare.com/files/5976036',
    'credit.zip': 'https://archive.ics.uci.edu/static/public/350/default+of+credit+card+clients.zip',
    'power.zip': 'https://archive.ics.uci.edu/static/public/235/individual+household+electric+power+consumption.zip',
    'ff_daily.zip': 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_Factors_daily_CSV.zip',
}


def fetch(name):
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        print('downloading', SOURCES[name])
        req = urllib.request.Request(SOURCES[name], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as r, open(path, 'wb') as f:
            f.write(r.read())
    return path


def housing():
    with tarfile.open(fetch('cal_housing.tgz')) as t:
        raw = t.extractfile('CaliforniaHousing/cal_housing.data').read().decode()
    cols = ['longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms',
            'population', 'households', 'median_income', 'median_house_value']
    df = pd.read_csv(io.StringIO(raw), names=cols)
    for c in cols:
        if (df[c] == df[c].round()).all():
            df[c] = df[c].astype(int)
    return df


def credit():
    with zipfile.ZipFile(fetch('credit.zip')) as z:
        name = next(n for n in z.namelist() if n.endswith('.xls'))
        df = pd.read_excel(io.BytesIO(z.read(name)), header=1)
    return df.drop(columns='ID').rename(columns={'default payment next month': 'default'})


def power_daily():
    with zipfile.ZipFile(fetch('power.zip')) as z:
        name = next(n for n in z.namelist() if n.endswith('.txt'))
        df = pd.read_csv(z.open(name), sep=';', na_values='?', usecols=['Date', 'Time', 'Global_active_power'])
    ts = pd.to_datetime(df.Date + ' ' + df.Time, format='%d/%m/%Y %H:%M:%S')
    kw = pd.Series(df.Global_active_power.values, index=ts)
    day = pd.DataFrame({
        'kwh': (kw / 60).resample('D').sum(),          # a minute at P kW uses P/60 kWh
        'minutes': kw.resample('D').count(),           # minutes with a reading (of 1,440)
    })
    day.index.name = 'date'
    return day.round({'kwh': 3})


def main():
    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    housing().to_csv(os.path.join(OUT, 'housing.csv'), index=False)
    credit().to_csv(os.path.join(OUT, 'credit.csv'), index=False)
    power_daily().to_csv(os.path.join(OUT, 'power-daily.csv'))
    fetch('ff_daily.zip')
    for f in sorted(os.listdir(OUT)):
        print('%-18s %8.0f KB' % (f, os.path.getsize(os.path.join(OUT, f)) / 1024))


if __name__ == '__main__':
    main()
