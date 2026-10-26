# Builds src/tools/NN-slug.js into standalone tools/NN-slug.html (kit CSS + JS and the tool's own CSS, HTML and JS inlined),
# then writes tools.json, index.html (gallery), LEDGER.md and the tool list inside README.md.
import glob, os, json, re, html
css_kit = open('src/kit.css').read(); kit = open('src/kit.js').read()
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
/* ---- tool styles: homage to {meta['design']['name']} ---- */
{block('CSS', src)}
</style></head>
<body><noscript>This music machine needs JavaScript and Web Audio (Chrome or Edge).</noscript>
<main id="mm-stage">
{block('HTML', src)}
</main>
<script>window.MM_META = {json.dumps(meta, ensure_ascii=False)};</script>
<script>
{kit}
</script>
<script>
{js}
</script>
</body></html>
"""
    open(f'tools/{slug}.html', 'w').write(page)
json.dump(metas, open('tools.json', 'w'), indent=1, ensure_ascii=False)
e = html.escape
cards = '\n'.join(f'''<a class="card" href="{m['file']}"><img loading="lazy" src="screenshots/thumbs/{m['no']}-{m['slug']}.png" alt=""><div class="n">{m['no']}</div><h2>{e(m['title'])}</h2>
<div class="row"><b>Manifesto</b> {e(m['manifesto']['name'])} <i>({e(m['manifesto']['author'])}, {e(m['manifesto']['year'])})</i></div>
<div class="row"><b>Design</b> {e(m['design']['name'])}</div><p>{e(m['idea'])}</p></a>''' for m in metas)
open('index.html', 'w').write(f'''<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<title>Manifesto Machines · {len(metas)} music tools from art manifestos and graphic design</title>
<style>body{{margin:0;background:#f4f2ee;color:#1a1a1a;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}}header{{padding:40px 32px 16px;max-width:1300px;margin:auto}}h1{{font-size:40px;margin:0 0 8px;letter-spacing:-.02em}}header p{{max-width:760px;margin:6px 0;color:#444}}
main{{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:18px;padding:16px 32px 60px;max-width:1300px;margin:auto}}
.card{{background:#fff;border:1px solid #ddd;color:inherit;text-decoration:none;display:block;padding:0 0 14px;position:relative;transition:transform .15s}}.card:hover{{transform:translateY(-3px);border-color:#999}}
.card img{{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#eee;border-bottom:1px solid #ddd}}.card .n{{position:absolute;top:8px;left:8px;background:#1a1a1a;color:#fff;font:700 12px monospace;padding:3px 6px}}
.card h2{{font-size:19px;margin:10px 14px 6px}}.card .row{{margin:2px 14px;font-size:13px;color:#333}}.card .row b{{display:inline-block;width:74px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888}}.card p{{margin:8px 14px 0;font-size:13.5px;color:#555}}
footer{{text-align:center;color:#888;font-size:13px;padding:0 0 40px}}a{{color:inherit}}</style></head><body>
<header><h1>Manifesto Machines</h1><p>{len(metas)} music-making tools. Each one turns a real artist's manifesto into the rules of a music system, and is designed as a homage to a graphic designer or design style. Open one, press <b>PLAY</b> (it plays built-in sounds straight away), drop in your own samples (WAV, AIFF, MP3), record to WAV, and press <b>LEARN</b> to read about the manifesto and the design.</p>
<p>Every tool is one standalone HTML file that works offline from your disk in Chrome or Edge. <a href="https://github.com/anorthernman-developer/manifesto-machines">Source on GitHub</a> · <a href="LEDGER.md">Ledger</a></p></header>
<main>{cards}</main><footer>MIT licence · built for Craig Stanley · gallery styled neutrally so each machine's design can speak for itself</footer></body></html>''')
rows = '\n'.join(f"| {m['no']} | {m['manifesto']['name']} | {m['manifesto']['year']} | {m['manifesto']['author']} | {m['design']['name']} | [{m['file']}]({m['file']}) |" for m in metas)
open('LEDGER.md', 'w').write(f'''# Ledger

Every manifesto and design homage used so far. The daily routine adds one new tool a day from #51 and must not reuse a manifesto or a design style/designer already in this table.

| # | Manifesto | Year | Author(s) | Design style / designer | File |
|---|---|---|---|---|---|
{rows}
''')
lst = '\n'.join(f"| {m['no']} | [{m['title']}]({m['file']}) | {m['manifesto']['name']} ({m['manifesto']['author']}, {m['manifesto']['year']}) | {m['design']['name']} | {m['idea']} |" for m in metas)
rd = open('README.md').read() if os.path.exists('README.md') else '<!--LIST-->\n<!--/LIST-->'
rd = re.sub(r'<!--LIST-->.*?<!--/LIST-->', '<!--LIST-->\n| # | Tool | Manifesto | Design homage | Idea |\n|---|---|---|---|---|\n' + lst + '\n<!--/LIST-->', rd, flags=re.S)
open('README.md', 'w').write(rd)
print('built', len(metas))
