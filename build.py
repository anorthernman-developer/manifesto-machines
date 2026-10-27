# Builds src/tools/NN-slug.js into standalone tools/NN-slug.html (kit CSS + JS and the tool's own CSS, HTML and JS inlined),
# then writes tools.json, catalogue.json, index.html (searchable catalogue, from src/index.template.html), LEDGER.md and the tool list inside README.md.
# Tools whose META has "deep": true also get the MMX deck (src/deck.js + deck.css): sample slots, presets, MIDI, keys.
import glob, os, json, re, html
css_kit = open('src/kit.css').read(); kit = open('src/kit.js').read()
css_deck = open('src/deck.css').read(); deck = open('src/deck.js').read()
metas = []
def block(name, src):
    m = re.search(r'/\*' + name + r'\n(.*?)\n\*/', src, re.S); return m.group(1) if m else ''
for f in sorted(glob.glob('src/tools/*.js')):
    src = open(f).read()
    meta = json.loads(block('META', src)); slug = os.path.basename(f)[:-3]
    meta['no'] = slug[:2]; meta['slug'] = slug[3:]; meta['file'] = f'tools/{slug}.html'; metas.append(meta)
    js = re.sub(r'/\*(META|CSS|HTML)\n.*?\n\*/\n?', '', src, flags=re.S)
    fonts = meta.get('fonts')
    link = f'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?{fonts}&display=swap">' if fonts else ''
    page = f"""<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<title>{meta['no']} {html.escape(meta['title'])} · {html.escape(meta['manifesto']['short'])} × {html.escape(meta['design']['short'])} · Manifesto Machines</title>
<meta name="description" content="{html.escape(meta['idea'])}">
{link}
<style>
{css_kit}
{(css_deck + chr(10)) if meta.get('deep') else ''}/* ---- tool styles: homage to {meta['design']['name']} ---- */
{block('CSS', src)}
</style></head>
<body><noscript>This music machine needs JavaScript and Web Audio (Chrome or Edge).</noscript>
<main id="mm-stage">
{block('HTML', src)}
</main>
<script>window.MM_META = {json.dumps(meta, ensure_ascii=False)};</script>
<script>
{kit}
</script>{('<script>' + chr(10) + deck + chr(10) + '</script>') if meta.get('deep') else ''}
<script>
{js}
</script>
</body></html>
"""
    open(f'tools/{slug}.html', 'w').write(page)
json.dump(metas, open('tools.json', 'w'), indent=1, ensure_ascii=False)
# ---------- catalogue.json: one entry per tool, the source of truth for the gallery ----------
BACKFILL_CAT = {'03': 'music theory', '17': 'music theory', '18': 'music theory', '42': 'music theory', '47': 'music theory', '35': 'Eno', '20': 'nature/philosophy', '22': 'nature/philosophy', '33': 'nature/philosophy'}
def first_sentences(s, n=2):
    parts = re.split(r'(?<=[.!?])\s+', s.strip()); out = ' '.join(parts[:n]); return out
def date_for(no):
    n = int(no); return '2026-10-26' if n <= 35 else '2026-10-27'
cat = []
for m in metas:
    M, D = m['manifesto'], m['design']
    cat.append({'number': m['no'], 'title': m['title'], 'category': m.get('category') or BACKFILL_CAT.get(m['no'], 'art manifesto'),
                'source': M['name'], 'source_short': M['short'], 'author': M['author'], 'year': M['year'], 'design_homage': D['name'], 'design_short': D['short'],
                'idea': m['idea'], 'controls': m.get('controls') or first_sentences(m['how'].replace('Press PLAY. ', ''), 2),
                'deep': bool(m.get('deep')), 'gemini': bool(m.get('gemini')), 'date': m.get('date') or date_for(m['no']), 'file': m['file'], 'thumb': f"screenshots/thumbs/{m['no']}-{m['slug']}.png"})
json.dump(cat, open('catalogue.json', 'w'), indent=1, ensure_ascii=False)
# ---------- index.html: searchable, filterable catalogue built from catalogue.json (data inlined so it also works from disk) ----------
open('index.html', 'w').write(open('src/index.template.html').read().replace('/*CATALOGUE*/[]', json.dumps(cat, ensure_ascii=False)).replace('{{N}}', str(len(cat))))
rows = '\n'.join(f"| {c['number']} | {c['category']} | {c['source']} | {c['year']} | {c['author']} | {c['design_homage']} | {c['date']} | [{c['file']}]({c['file']}) |" for c in cat)
open('LEDGER.md', 'w').write(f"""# Ledger

Every source idea and design homage used so far. Since 27 Oct 2026 the daily routine adds five tools a day (one each: Fred again.., Brian Eno, music theory, nature/philosophy, art manifesto) and must not reuse a source idea or a design style/designer already in this table. The same data, with one-line ideas and control summaries, is in [catalogue.json](catalogue.json).

| # | Category | Source idea | Year | Author(s) | Design style / designer | Date | File |
|---|---|---|---|---|---|---|---|
{rows}
""")
lst = '\n'.join(f"| {c['number']} | [{c['title']}]({c['file']}) | {c['category']} | {c['source']} ({c['author']}, {c['year']}) | {c['design_homage']} | {c['idea']} |" for c in cat)
rd = open('README.md').read() if os.path.exists('README.md') else '<!--LIST-->\n<!--/LIST-->'
rd = re.sub(r'<!--LIST-->.*?<!--/LIST-->', '<!--LIST-->\n| # | Tool | Category | Source idea | Design homage | Idea |\n|---|---|---|---|---|---|\n' + lst + '\n<!--/LIST-->', rd, flags=re.S)
open('README.md', 'w').write(rd)
print('built', len(metas))
