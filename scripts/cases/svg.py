"""Small SVG charts for the case pages: horizontal bars and lines.

The charts are drawn from the numbers a case computes, at build time, so a
page needs no charting library. Colours come from CSS classes (.cs1 ... .cs4,
defined in the case page CSS) that use the site's colour tokens, so the
charts follow the light and dark themes. Text is drawn in currentColor.
"""
from html import escape

W = 680


def _fmt(v, fmt):
    return fmt.format(v) if isinstance(fmt, str) else fmt(v)


def bars(rows, series, fmt='{:.2f}', title='', note='', zero=True):
    """Grouped horizontal bars.

    rows   [(label, [value per series]), ...]
    series [name, ...]  (legend; one colour each)
    """
    n = len(series)
    bh, gap, label_w, pad = 16, 14, 190, 70
    vals = [v for _, vs in rows for v in vs if v is not None]
    lo = min(0, min(vals)) if zero else min(vals)
    hi = max(vals)
    span = (hi - lo) or 1
    plot_w = W - label_w - pad
    x = lambda v: label_w + (v - lo) / span * plot_w
    top = 34 if n > 1 else 12
    h = top + len(rows) * (n * bh + gap) + 6
    out = ['<svg class="case-chart" viewBox="0 0 %d %d" role="img" aria-label="%s">' % (W, h, escape(title))]
    if n > 1:
        lx = label_w
        for i, s in enumerate(series):
            out.append('<rect class="cs%d" x="%d" y="8" width="12" height="12" rx="2"/>' % (i + 1, lx))
            out.append('<text x="%d" y="18" class="cl">%s</text>' % (lx + 18, escape(s)))
            lx += 26 + 8 * len(s)
    y = top
    for label, vs in rows:
        out.append('<text x="%d" y="%d" class="cl" text-anchor="end">%s</text>'
                   % (label_w - 10, y + n * bh / 2 + 4, escape(label)))
        for i, v in enumerate(vs):
            if v is None:
                continue
            x0, x1 = sorted((x(max(lo, 0)), x(v)))
            out.append('<rect class="cs%d" x="%.1f" y="%d" width="%.1f" height="%d" rx="2"/>'
                       % (i + 1, x0, y + i * bh + 1, max(x1 - x0, 1), bh - 3))
            out.append('<text x="%.1f" y="%d" class="cv">%s</text>' % (x1 + 5, y + i * bh + bh - 4, escape(_fmt(v, fmt))))
        y += n * bh + gap
    if lo < 0:
        out.append('<line x1="%.1f" x2="%.1f" y1="%d" y2="%d" class="cz"/>' % (x(0), x(0), top - 4, h - 4))
    out.append('</svg>')
    return '<figure class="case-fig">' + ''.join(out) + (
        '<figcaption>%s</figcaption>' % note if note else '') + '</figure>'


def lines(xs, series, title='', note='', log=False, xfmt='{:.0f}', yfmt='{:.0f}', xticks=None, yticks=None):
    """Line chart. xs: numbers (e.g. fractional years); series: {name: [y...]}."""
    import math
    names = list(series)
    tf = (lambda v: math.log10(v)) if log else (lambda v: v)
    ys = [tf(v) for s in names for v in series[s] if v is not None]
    lo, hi = min(ys), max(ys)
    widest = max((len(_fmt(t, yfmt)) for t in (yticks or [])), default=4)
    left, right, top, bottom, h = 16 + 7 * widest, 16, 34, 28, 300   # room for the y labels
    pw, ph = W - left - right, h - top - bottom
    X = lambda v: left + (v - xs[0]) / ((xs[-1] - xs[0]) or 1) * pw
    Y = lambda v: top + (1 - (tf(v) - lo) / ((hi - lo) or 1)) * ph
    out = ['<svg class="case-chart" viewBox="0 0 %d %d" role="img" aria-label="%s">' % (W, h, escape(title))]
    for t in (yticks or []):
        out.append('<line x1="%d" x2="%d" y1="%.1f" y2="%.1f" class="cg"/>' % (left, W - right, Y(t), Y(t)))
        out.append('<text x="%d" y="%.1f" class="cv" text-anchor="end">%s</text>' % (left - 6, Y(t) + 4, escape(_fmt(t, yfmt))))
    for t in (xticks or []):
        out.append('<text x="%.1f" y="%d" class="cv" text-anchor="middle">%s</text>' % (X(t), h - 8, escape(_fmt(t, xfmt))))
    lx = left
    for i, s in enumerate(names):
        pts = ' '.join('%.1f,%.1f' % (X(a), Y(b)) for a, b in zip(xs, series[s]) if b is not None)
        out.append('<polyline class="cp%d" points="%s"/>' % (i + 1, pts))
        out.append('<rect class="cs%d" x="%d" y="8" width="12" height="12" rx="2"/>' % (i + 1, lx))
        out.append('<text x="%d" y="18" class="cl">%s</text>' % (lx + 18, escape(s)))
        lx += 26 + 8 * len(s)
    out.append('</svg>')
    return '<figure class="case-fig">' + ''.join(out) + (
        '<figcaption>%s</figcaption>' % note if note else '') + '</figure>'
