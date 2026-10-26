# Manifesto Machines

Fifty music-making tools, each built from two things:

1. **A real artist's manifesto**, whose ideas become the rules of the music system. Futurism only accelerates, Dada cuts your loop up in a hat, Dogme 95 forbids effects, Auto-Destructive Art destroys the sample as it plays.
2. **A graphic design style or designer**, whose work drives the whole look: type, grid, colour and layout. Plakatstil, Neville Brody, Wim Crouwel, Saul Bass, Barbara Kruger, Memphis, brutalist web and more.

The idea is to learn about art, manifestos and graphic design while making music. Every tool has a **LEARN** panel covering the manifesto (author, year, key ideas, short accurate quotes, and how the machine reads it) and the design homage (who, when, hallmarks, and works to look up).

**Play them:** https://anorthernman-developer.github.io/manifesto-machines/

## Using them

- Each tool is **one standalone HTML file** (`tools/NN-slug.html`). Download it and open it from your disk in Chrome or Edge; it works offline (Google Fonts load when online, with system fallbacks).
- Press **PLAY** (or Space). Every tool plays built-in synthesised sounds straight away.
- Drop your own samples anywhere on the page, or use **SAMPLES** / **FOLDER** (for example `F:\01 Splice Sounds`; a random dozen is used from a folder). WAV, AIFF/AIFC (uncompressed), MP3, OGG and FLAC all work. AIFF is read by a small built-in decoder when the browser can't.
- **● REC** records the output to a WAV file. **LEARN** (or L) opens the notes.
- A limiter on the master output keeps everything at a safe level.
- Five tools (10, 13, 36, 41, 48) can optionally ask Google Gemini for new material. Paste a Google AI Studio key into the box; it is stored only in your browser's `localStorage` (shared with SR-12 and the other tools as `sr12.geminiKey`) and sent only to Google. **No key is ever stored in this repo.** Without a key they use their built-in version.

## The 50

<!--LIST-->
| # | Tool | Manifesto | Design homage | Idea |
|---|---|---|---|---|
| 01 | [Accelerator](tools/01-accelerator.html) | The Founding and Manifesto of Futurism (Filippo Tommaso Marinetti, 1909) | Plakatstil (German 'poster style') | A drum machine that can only speed up, until it crashes and starts again. |
| 02 | [Intonarumori](tools/02-intonarumori.html) | The Art of Noises (L'arte dei rumori) (Luigi Russolo, 1913) | Neville Brody | Six noise machines, one for each of Russolo's six families of noise, cranked by hand. |
| 03 | [Enharmonic](tools/03-enharmonic.html) | Manifesto of Futurist Musicians (Francesco Balilla Pratella, 1910) | Fortunato Depero | A quarter-tone melody machine in free metre, where every bar chooses its own length. |
| 04 | [Cut-up Hat](tools/04-cut-up-hat.html) | Dada Manifesto 1918 (Tristan Tzara, 1918) | David Carson | Your loop is cut into words, shaken in a hat and played back in the order the pieces come out. |
| 05 | [Automatic](tools/05-automatic.html) | Manifesto of Surrealism (André Breton, 1924) | Tadanori Yokoo | Draw without stopping to think: your hand becomes a melody and an exquisite corpse in three parts. |
| 06 | [Neo-Plastic Grid](tools/06-neo-plastic.html) | De Stijl Manifesto I (Theo van Doesburg, Piet Mondrian, Vilmos Huszár, Antony Kok and others, 1918) | Wim Crouwel | A Mondrian composition you can hear: vertical lines are time, horizontal lines are pitch, colours are instruments. |
| 07 | [Building](tools/07-building.html) | Programme of the Staatliches Bauhaus in Weimar (Walter Gropius, 1919) | Herbert Bayer | Build a song floor by floor from Bauhaus shapes: blue circles, red squares, yellow triangles. |
| 08 | [Kinetic Rhythms](tools/08-kinetic.html) | The Realistic Manifesto (Naum Gabo and Antoine Pevsner, 1920) | Gustav Klutsis | Three rotating rods sweep through points in space; every crossing is a note, so rhythm comes from motion, not mass. |
| 09 | [Zero of Form](tools/09-zero-of-form.html) | From Cubism and Futurism to Suprematism: The New Painterly Realism (Kazimir Malevich, 1915) | El Lissitzky | Pure shapes float on white; each one is a held tone, and where they overlap your sample sparkles. |
| 10 | [Zaum](tools/10-zaum.html) | A Slap in the Face of Public Taste (David Burliuk, Aleksei Kruchenykh, Vladimir Mayakovsky and Velimir Khlebnikov, 1912) | Alexander Rodchenko | Type words that mean nothing in any language and a throat made of your sample sings them. |
| 11 | [Theory of Intervals](tools/11-kino-intervals.html) | WE: Variant of a Manifesto (Dziga Vertov (the Kinoks group), 1922) | Vladimir and Georgii Stenberg | A film strip of sample 'shots', where the loudest music happens in the cuts between them. |
| 12 | [BLAST / BLESS](tools/12-blast.html) | BLAST, Manifesto of the Vorticists (Wyndham Lewis, with Ezra Pound, Gaudier-Brzeska and others, 1914) | Paula Scher | Every instrument is a word on the wall: BLAST it and it hits hard and dirty, BLESS it and it turns soft and holy. |
| 13 | [Event Scores](tools/13-event-scores.html) | Fluxus Manifesto (George Maciunas, 1963) | Experimental Jetset | A deck of Fluxus-style instruction cards; the machine performs whichever card is on top, then flips the next. |
| 14 | [Dérive](tools/14-derive.html) | Report on the Construction of Situations (Guy Debord, 1957) | Jamie Reid | A walker drifts through a psychogeographic city; each district has its own sound, and the city's pull decides the route. |
| 15 | [Painted Lines](tools/15-painted-lines.html) | The Stuckists manifesto (Billy Childish and Charles Thomson, 1999) | Corita Kent | Paint melodies by hand in screen-print layers; the loop prints one colour at a time, then all of them together. |
| 16 | [Vow of Chastity](tools/16-vow-of-chastity.html) | Dogme 95 Manifesto and Vow of Chastity (Lars von Trier and Thomas Vinterberg, 1995) | Brutalist web design | One sample, no effects, no grid: you play it live by hand, and every rule you break goes in a public confession. |
| 17 | [Credo](tools/17-credo.html) | The Future of Music: Credo (John Cage, 1937 (a talk in Seattle; published 1958)) | Ikko Tanaka | Three coins tossed six times build an I Ching hexagram, and the hexagram picks the sound, its length and its loudness from a chart. |
| 18 | [Breath Squares](tools/18-breath-squares.html) | Sonic Meditations (Pauline Oliveros, 1971) | Josef Albers | Four nested squares are four drones that breathe; colours that sit close together make their tones beat against each other. |
| 19 | [BECAUSE](tools/19-because.html) | Riot Grrrl Manifesto (Kathleen Hanna (with Bikini Kill), 1991) | Barbara Kruger | A three-chord punk machine where your BECAUSE lines become the riffs and the shouted rhythm. |
| 20 | [Cyborg](tools/20-cyborg.html) | A Cyborg Manifesto (Donna Haraway, 1985) | April Greiman | Three boundary sliders (human/animal, organism/machine, physical/non-physical) blur one groove between flesh and code. |
<!--/LIST-->

## Craig's feedback

_Nothing yet. Add notes here or open an issue with the `feedback` label._

## How it's built

`src/kit.js` and `src/kit.css` are a small shared engine (audio graph and limiter, fallback sounds, sample loading with the AIFF reader, WAV recorder, LEARN panel, optional Gemini box). `src/tools/NN-slug.js` holds each tool's metadata, CSS, HTML and music system. `python3 build.py` inlines everything into one self-contained file per tool and regenerates `index.html`, `tools.json`, `LEDGER.md` and the list above. `test/run.js` is a headless Chrome test (see `DEVLOG.md`).

New tools are added one a day from #51. [LEDGER.md](LEDGER.md) lists every manifesto and design homage already used, so none repeat.

MIT licence.
