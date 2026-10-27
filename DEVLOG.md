# Devlog

## 27 October 2026 · 52 to 56, the first five-a-day

**Feedback:** Craig said these tools are bringing him joy and getting him back into music. He wants them more complex and more customisable for his own sounds, five a day across Fred again.., Brian Eno, a theory of composition, nature or philosophy, and an art manifesto.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 52 | Actual Life Journal | Fred again.. | Fred's diary-sampling method (Actual Life, 2021 to 2022) | Tibor Kalman / M&Co |
| 53 | Seed Garden | Eno | Generative music: tape loops of unequal length, Oblique Strategies, the studio as a tool, gardening | Karl Gerstner, *Designing Programmes* |
| 54 | Gradual Process | music theory | Steve Reich, "Music as a Gradual Process" (1968) | Anton Stankowski |
| 55 | Murmuration | nature/philosophy | Emergence: Reynolds's boids (1987) and the STARFLAG starling study (Ballerini et al., PNAS 2008) | Muriel Cooper |
| 56 | The Colour Keyboard | art manifesto | Kandinsky, *Concerning the Spiritual in Art* (1911) | Paul Rand |

**Changes**

- **Deck engine** (`src/deck.js` and `src/deck.css`, inlined only when META has `"deep": true`, so 01 to 51 rebuild unchanged):
  - named sample slots, each with pitch, gain, start, end, reverse, filter, pan and reverb and delay sends, plus a waveform;
  - folders, with "next file";
  - bound parameters;
  - presets in localStorage (`mm.presets.<no>`), with JSON export and import, and factory presets;
  - Web MIDI, with MIDI learn on any slider;
  - a keys sheet (`?`);
  - an output tap, so tools can resample what they play (53 "prints to tape");
  - a LEARN panel with a "Try this" list.
- **Catalogue:** `catalogue.json` has number, title, category, source, year, design, idea, controls and date for every tool. 01 to 51 were backfilled: music theory for 03, 17, 18, 42 and 47; Eno for 35; nature/philosophy for 20, 22 and 33; everything else is art manifesto. `index.html` is now a searchable, filterable catalogue with category chips, source and design selects, sort, "deep" and "Gemini" toggles, and state kept in the URL hash.
- **Tests:** `test/deep.js` covers the deck: slots, AIFF into one slot and WAV into another, reverse, preset save, change and load, JSON export and import, the keys sheet, simulated MIDI, and a 10-second soak checking level and errors. `test/procs.js` is a quick evaluator used to check each tool's modes (for example all four of 54's processes, and placing shapes and radial reading in 56).
- **Fixes on the way:**
  - 53 started too quietly, and its hiss handle had no `stop()`. Now the first loops sound in under a second, and a sample you load is planted as a new loop straight away.
  - 55 used a scale name the kit doesn't have.

## 27 October 2026 · 51 Both-And

**Manifesto:** Robert Venturi, *Complexity and Contradiction in Architecture* (1966), whose first chapter he called "a gentle manifesto". **Design:** supergraphics, after Barbara Stauffacher Solomon's painted walls at The Sea Ranch.

- No new feedback on the issues yet, so I picked a pairing that contrasts with yesterday's Herzog and Saul Bass: architecture instead of film, flat primary colour instead of cut paper.
- Music system: every control is a pair of opposites (major and minor, four and three, clean and distorted, straight and swung). Equal-power blends mean the centre of each slider plays both layers at full presence. MESSY VITALITY adds wrong notes, fills and stray fragments. MORE IS NOT LESS stacks up to three extra layers.
- Visuals: a room corner drawn as two skewed walls on a canvas, with stripes that carry across the corner and cropped letters (BOTH on one wall, AND on the other) that move with the beat.
- Kit: the back link's tooltip now says "All machines" rather than a fixed count.
- Test: `node test/run.js 51` passed (audio, LEARN, WAV and AIFF samples, WAV recording, no errors).

## 26 October 2026

**Built all 50 Manifesto Machines.** Each tool pairs a documented artist's manifesto (whose ideas set the music rules) with a graphic design style or designer (whose work sets the look). [LEDGER.md](LEDGER.md) has the full list. No manifesto, author or design homage is used twice.

**How it was made**

- `src/kit.js` and `src/kit.css` form a shared engine. The signal chain runs output → compressor/limiter → soft clip → volume. The kit also provides:
  - synthesised fallback sounds (kick, snare, hat, tone, loop, voice, texture);
  - sample loading (drop, file picker or folder), with a built-in AIFF/AIFC decoder;
  - a WAV recorder;
  - the LEARN panel;
  - an optional Gemini box. It reads the key from `localStorage['sr12.geminiKey']`, sends it in the `x-goog-api-key` header only, and falls back through several models.
- `build.py` inlines the kit into each `src/tools/NN-slug.js`. The result is 50 standalone files in `tools/`, which work from `file://` in Chrome and Edge. The script also regenerates `index.html`, `tools.json`, `LEDGER.md` and the README list.
- The tools were built in batches of five (or ten at the start). Each batch was committed and pushed after its tests passed.

**Testing (`test/run.js`, headless Chromium, 1280×760)**

Each tool goes through these checks:

1. It must start with PLAY and produce sound (output RMS > 0) while the AudioContext is running.
2. It must stay audible after its main interaction.
3. The LEARN panel must open with full text.
4. A 1.5 s WAV and a 1.5 s AIFF test sample must load and be heard. The test checks this by looking for a buffer source started with the sample's length.
5. REC must download a WAV file.
6. There must be no page errors.

For tools with Gemini (10, 13, 36, 41, 48), the Google endpoint is mocked and the result must be applied. Screenshots are saved to `screenshots/thumbs/` and were reviewed on contact sheets.

**Fixes found by review**

- 26: the balls were thrown automatically.
- 35: samples now start straight away.
- 37 and 38: HTML labels were showing as raw text.
- 38: the layout overflowed.
- 39: the mould was hard to see.
- 41: the AI stock now merges with the existing stock instead of replacing it.
- 43: the gear layout went off-screen.
- 44: canvas fonts now redraw once the web fonts have loaded.

**Repo**

- MIT licence. GitHub Pages serves the site from `main` /.
- There is one pinned intro issue, and a `feedback` label for Craig's notes.
- Every commit was checked for API keys first. None are stored in the repo.
