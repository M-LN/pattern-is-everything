# Generate per-section Open Graph images (1200x630) into assets/og/.
# Run from the repo root:  python scripts/build-og.py
# Uses Windows system fonts: Georgia (serif, matches site fallback) + Consolas (mono).
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (20, 18, 16)
TEXT = (232, 226, 216)
MUTED = (154, 142, 128)
ACCENT = (200, 75, 47)
GREEN = (42, 125, 95)
BLUE = (111, 168, 255)
PURPLE = (139, 79, 168)

GEORGIA = 'C:/Windows/Fonts/georgia.ttf'
GEORGIA_I = 'C:/Windows/Fonts/georgiai.ttf'
CONSOLAS = 'C:/Windows/Fonts/consola.ttf'


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


SECTIONS = [
    ('ml',      'Machine ', 'Learning',  '149 topics · 5 collections · interactive visual references', motif_ml),
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
    kicker_f = ImageFont.truetype(CONSOLAS, 26)
    title_f = ImageFont.truetype(GEORGIA, 96)
    title_fi = ImageFont.truetype(GEORGIA_I, 96)
    sub_f = ImageFont.truetype(CONSOLAS, 30)
    url_f = ImageFont.truetype(CONSOLAS, 26)

    x, y = 80, 96
    d.text((x, y), 'PATTERN IS EVERYTHING', font=kicker_f, fill=ACCENT)
    y += 64
    d.text((x, y), t1, font=title_f, fill=TEXT)
    w1 = d.textlength(t1, font=title_f)
    d.text((x + w1, y), t2, font=title_fi, fill=ACCENT)
    y += 140
    d.text((x, y), sub, font=sub_f, fill=MUTED)
    d.text((80, H - 80), 'patterniseverything.com', font=url_f, fill=MUTED)

    out = f'assets/og/og-{slug}.png'
    img.save(out, optimize=True)
    print(out)


if __name__ == '__main__':
    import os
    os.makedirs('assets/og', exist_ok=True)
    for spec in SECTIONS:
        build(*spec)
