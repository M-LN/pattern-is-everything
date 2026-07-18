# Generate per-section Open Graph images (1200x630) into assets/og/.
# Run from the repo root:  python scripts/build-og.py
# Fonts: prefers the site's own self-hosted faces (Playfair Display + IBM Plex
# Mono, auto-converted from assets/fonts/*.woff2 via fonttools), then Windows
# Georgia/Consolas, then DejaVu — so output matches the site brand anywhere.
import math
import os
import random
import tempfile
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (20, 18, 16)
TEXT = (232, 226, 216)
MUTED = (154, 142, 128)
ACCENT = (200, 75, 47)
GREEN = (42, 125, 95)
BLUE = (111, 168, 255)
PURPLE = (139, 79, 168)

def _woff2_to_ttf(woff2_path):
    try:
        from fontTools.ttLib.woff2 import decompress
    except ImportError:
        return None
    if not os.path.exists(woff2_path):
        return None
    out = os.path.join(tempfile.gettempdir(), 'og-' + os.path.basename(woff2_path) + '.ttf')
    if not os.path.exists(out):
        decompress(woff2_path, out)
    return out


def _resolve(*candidates):
    for c in candidates:
        p = c() if callable(c) else c
        if p and os.path.exists(p):
            return p
    raise SystemExit('No usable font found among: ' + repr(candidates))


SERIF = _resolve(lambda: _woff2_to_ttf('assets/fonts/playfair-display-var.woff2'),
                 'C:/Windows/Fonts/georgia.ttf',
                 '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf')
SERIF_I = _resolve(lambda: _woff2_to_ttf('assets/fonts/playfair-display-400-italic.woff2'),
                   'C:/Windows/Fonts/georgiai.ttf',
                   '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf')
MONO = _resolve(lambda: _woff2_to_ttf('assets/fonts/ibm-plex-mono-400.woff2'),
                'C:/Windows/Fonts/consola.ttf',
                '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf')


def fade(color, alpha):
    return tuple(int(b + (c - b) * alpha) for c, b in zip(color, BG))


def bell(d, cx, sigma, base, amp, color, width=3):
    pts = []
    for px in range(0, W + 1, 6):
        x = px / W
        y = base - amp * math.exp(-((x - cx) ** 2) / (2 * sigma * sigma))
        pts.append((px, y))
    d.line(pts, fill=color, width=width)


def motif_ml(d):
    bell(d, .30, .10, H * .96, H * .55, fade(ACCENT, .55), 4)
    bell(d, .55, .16, H * .96, H * .42, fade(GREEN, .45), 3)
    bell(d, .74, .22, H * .96, H * .30, fade(BLUE, .40), 3)


def motif_markets(d):
    rnd = random.Random(7)
    n = 26
    bw = W / (n + 4)
    for i in range(n):
        t = i / (n - 1)
        arc = math.sin(t * math.pi) * .5 + math.sin(t * math.pi * 3) * .2
        mid = H * .92 - arc * H * .38
        o = mid + (rnd.random() - .5) * H * .07
        c = mid + (rnd.random() - .5) * H * .07
        hi = min(o, c) - rnd.random() * H * .05
        lo = max(o, c) + rnd.random() * H * .05
        x = bw * 2 + i * bw
        col = fade(GREEN, .6) if c < o else fade(ACCENT, .6)
        d.line([(x, hi), (x, lo)], fill=col, width=2)
        d.rectangle([x - bw * .28, min(o, c), x + bw * .28, max(o, c) + 2], fill=col)


def motif_essays(d):
    bell(d, .5, .13, H * .98, H * .52, fade(PURPLE, .55), 4)
    rnd = random.Random(21)
    y = H * .70
    pts = []
    for px in range(0, W + 1, 10):
        y += (rnd.random() - .5) * H * .05
        y = max(H * .45, min(H * .95, y))
        pts.append((px, y))
    d.line(pts, fill=fade(ACCENT, .5), width=3)


def motif_cases(d):
    rnd = random.Random(11)
    x0, y0, x1, y1 = W * .08, H * .95, W * .95, H * .48
    for _ in range(40):
        t = rnd.random()
        px = x0 + (x1 - x0) * t
        py = y0 + (y1 - y0) * t + (rnd.random() - .5) * H * .18
        r = 5
        d.ellipse([px - r, py - r, px + r, py + r], fill=fade(BLUE, .55))
    d.line([(x0, y0), (x1, y1)], fill=fade(ACCENT, .65), width=4)


def motif_sandbox(d):
    for gx in range(0, W + 1, 60):
        d.line([(gx, H * .45), (gx, H)], fill=fade(MUTED, .16), width=1)
    for gy in range(int(H * .45), H + 1, 60):
        d.line([(0, gy), (W, gy)], fill=fade(MUTED, .16), width=1)
    pts = [(px, H * .75 + math.sin(px / W * math.pi * 3) * H * .14) for px in range(0, W + 1, 6)]
    d.line(pts, fill=fade(ACCENT, .6), width=4)
    pts = [(px, H * .78 + math.sin(px / W * math.pi * 3 + 1.8) * H * .10) for px in range(0, W + 1, 6)]
    d.line(pts, fill=fade(GREEN, .5), width=3)


def motif_start(d):
    steps = 5
    for i in range(steps):
        x = W * (.12 + i * .18)
        y = H * (.88 - i * .08)
        r = 13
        col = fade(ACCENT, .7) if i < 2 else fade(MUTED, .5)
        d.ellipse([x - r, y - r, x + r, y + r], outline=col, width=3)
        if i:
            px = W * (.12 + (i - 1) * .18)
            py = H * (.88 - (i - 1) * .08)
            d.line([(px + r + 6, py - (py - y) * (r + 6) / max(1, math.hypot(x - px, y - py))),
                    (x - r - 6, y + (py - y) * (r + 6) / max(1, math.hypot(x - px, y - py)))],
                   fill=fade(MUTED, .4), width=2)


def motif_stats(d):
    # Retention-triangle heatmap fading right + a rising trend line — the
    # analytics dashboard, matching the homepage universe-card preview.
    GOLD = (200, 169, 110)
    rows, cols = 4, 8
    gx, gy = W * .04, H * .55
    gw, gh = W * .50, H * .30
    cw, ch = gw / cols, gh / rows
    for r in range(rows):
        for m in range(cols - r):
            v = .78 ** m
            col = fade(GOLD, .10 + v * .5)
            d.rectangle([gx + m * cw + 2, gy + r * ch + 2,
                         gx + (m + 1) * cw - 2, gy + (r + 1) * ch - 2], fill=col)
    rnd = random.Random(17)
    x0, x1 = W * .64, W * .96
    y0, y1 = H * .88, H * .52
    pts = []
    for i in range(11):
        t = i / 10
        pts.append((x0 + (x1 - x0) * t,
                    y0 + (y1 - y0) * t + (rnd.random() - .5) * H * .06))
    d.line(pts, fill=fade(GREEN, .65), width=4)
    d.line([(x0 - 10, H * .50), (x0 - 10, H * .92), (W * .97, H * .92)],
           fill=fade(MUTED, .35), width=2)


SECTIONS = [
    ('ml',      'Machine ', 'Learning',  '118 topics · 4 collections · interactive visual references', motif_ml),
    ('stats',   'Statistics & ', 'Data Analytics', '39 topics · statistics, analytics, evaluation, Python', motif_stats),
    ('markets', 'Market ',  'Patterns',  '100 topics · charts, indicators, psychology, risk',          motif_markets),
    ('essays',  'Pattern ', 'Essays',    '12 short visual essays on patterns in the world',            motif_essays),
    ('cases',   'Real-Data ', 'Cases',   '4 practical cases · datasets, pipelines, metrics',           motif_cases),
    ('sandbox', 'The ',     'Sandbox',   '5 hands-on labs · ML, markets, stats, chaos, deep learning', motif_sandbox),
    ('start',   'Start ',   'Here',      'A guided path from intuition to working experiments',        motif_start),
]


def build(slug, t1, t2, sub, motif):
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)
    motif(d)
    kicker_f = ImageFont.truetype(MONO, 26)
    sub_f = ImageFont.truetype(MONO, 30)
    url_f = ImageFont.truetype(MONO, 26)

    # Shrink the title until the full line fits inside the safe width
    size = 96
    while size > 48:
        title_f = ImageFont.truetype(SERIF, size)
        title_fi = ImageFont.truetype(SERIF_I, size)
        if d.textlength(t1, font=title_f) + d.textlength(t2, font=title_fi) <= W - 160:
            break
        size -= 4

    x, y = 80, 96
    d.text((x, y), 'PATTERN IS EVERYTHING', font=kicker_f, fill=ACCENT)
    y += 64
    d.text((x, y), t1, font=title_f, fill=TEXT)
    w1 = d.textlength(t1, font=title_f)
    d.text((x + w1, y), t2, font=title_fi, fill=ACCENT)
    y += 44 + size
    d.text((x, y), sub, font=sub_f, fill=MUTED)
    d.text((80, H - 80), 'patterniseverything.com', font=url_f, fill=MUTED)

    out = f'assets/og/og-{slug}.png'
    img.save(out, optimize=True)
    print(out)


def build_home():
    # Root social preview (assets/social-preview.png) — centered hero layout.
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)

    # Ambient curves behind the title
    bell(d, .30, .16, H * .78, H * .42, fade(ACCENT, .30), 3)
    bell(d, .62, .22, H * .84, H * .36, fade(GREEN, .25), 3)
    rnd = random.Random(9)
    y = H * .55
    pts = []
    for px in range(0, W + 1, 12):
        y += (rnd.random() - .5) * H * .05
        y = max(H * .35, min(H * .8, y))
        pts.append((px, y))
    d.line(pts, fill=fade(MUTED, .30), width=3)

    # Logo ring + wordmark
    cx, cy, r = 122, 112, 26
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT, width=5)
    d.ellipse([cx - 9, cy - 9, cx + 9, cy + 9], fill=ACCENT)
    brand_f = ImageFont.truetype(SERIF, 44)
    d.text((176, cy - 30), 'Pattern is Everything', font=brand_f, fill=TEXT)

    # Centered hero title
    t1_f = ImageFont.truetype(SERIF, 128)
    t2_f = ImageFont.truetype(SERIF_I, 128)
    t1, t2 = 'Pattern is', 'Everything'
    w1 = d.textlength(t1, font=t1_f)
    w2 = d.textlength(t2, font=t2_f)
    d.text(((W - w1) / 2, 190), t1, font=t1_f, fill=TEXT)
    d.text(((W - w2) / 2, 320), t2, font=t2_f, fill=ACCENT)

    sub = '257 interactive references · ML, statistics & markets'
    size = 32
    while size > 20:
        sub_f = ImageFont.truetype(MONO, size)
        if d.textlength(sub, font=sub_f) <= W - 140:
            break
        size -= 2
    ws = d.textlength(sub, font=sub_f)
    d.text(((W - ws) / 2, 486), sub, font=sub_f, fill=MUTED)

    img.save('assets/social-preview.png', optimize=True)
    print('assets/social-preview.png')


if __name__ == '__main__':
    import os
    os.makedirs('assets/og', exist_ok=True)
    for spec in SECTIONS:
        build(*spec)
    build_home()
