# Devlog

## 28 October 2026 · 57 to 61, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues. The direction still comes from Craig's 27 October chat: the tools bring him joy and are getting him back into music, and he wants five a day, deeper and more customisable for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 57 | Live Live | Fred again.. | His Boiler Room London set (2022) played from a Maschine+ and three CDJs, and the Zane Lowe interview about playing electronic music "live live" | Barney Bubbles |
| 58 | Endless Music Box | Eno | Bloom (2008, with Peter Chilvers), generative music (Koan, 1996) and 77 Million Paintings (2006) | Vaughan Oliver / v23 (4AD) |
| 59 | Closed Groove | music theory | Pierre Schaeffer: musique concrète, the closed groove, the cut bell, reduced listening and the sound object (1948 to 1966) | A. M. Cassandre |
| 60 | Golden Angle | nature/philosophy | Phyllotaxis: Vogel's sunflower model (1979), Douady and Couder (1992) and D'Arcy Thompson (1917) | Max Huber |
| 61 | Rayonist Rays | art manifesto | Larionov and Goncharova, "Rayonists and Futurists: A Manifesto" (1913) | Milton Glaser |

**What's new in each**

- **57 Live Live:** 4 banks × 16 pads (vox chops at onsets or one chop re-pitched in a scale, named drum pads, chords, FX and performance pads). Also a quantised overdub pattern recorder with a clickable roll, a per-pad inspector, note repeat, four grooves with sidechain pump, a tempo-locked CDJ deck with tape stop, and hold-to-build with a beat of silence before the drop. A FROM SCRATCH autopilot adds layers in order. MIDI notes 36 to 51 play the pads.
- **58 Endless Music Box:** tap to plant notes that return every cycle, quieter each time, and slowly drift. It has 12 moods (key, scale and colours), two out-of-step cycles, freeze, chord taps, evolve-when-idle, a drone and a "painting" texture layer that swells as the colour fields recombine.
- **59 Closed Groove:** every source is cut into 4 to 8 sound objects at onsets or equally, and each object gets a simplified Schaeffer label (N/X, impulse ', iterative "). Four turntables have hit or closed-groove modes, speed, attack cut (the cut bell), per-turntable reverse, tone, level and a 16-step pattern. There's also an acousmatic mode, an automatic étude and spatial "relief". The railway and bell fallbacks are synthesised.
- **60 Golden Angle:** Vogel's θ = n × angle, r = √n, with each birth a note. Pitch comes from the spiral family (n mod 8, 13, 21 or 34) or from radius, and timbre from the Fibonacci word. Rotating arms (1, 2, 3 or 5) play a listening band. A Fibonacci-word pulse runs underneath, angle presets include golden, Lucas and rational angles, and a live readout shows the visible spiral counts.
- **61 Rayonist Rays:** objects send rotating fans of rays that reflect once off the edges. Ray intersections are the notes: height sets the pitch, and the crossing angle sets loudness and length. A scan line reads them. You can edit objects, switch on "objects play no role", and add a Futurist motor. Optional Gemini turns a described scene into objects (mock added to `test/config.js`).

**Housekeeping**

- Older Gemini tools (10, 13, 36, 41, 48) now carry `"gemini": true` in META, so the catalogue's Gemini filter finds all eight.
- 57's factory default preset now stores the demo patterns, which are made after the deck takes its snapshot. Loading it no longer silences the pads.
- 59's periodicity check was normalised properly, so bells and voices read as tonic (N) and railway noise as complex (X).

**Tests:** `node test/run.js 57,58,59,60,61` passed 5/5 (audio, LEARN, WAV and AIFF loaded and played, WAV recording, Gemini mock for 61, no errors). `node test/deep.js 57,58,59,60,61` passed 5/5 (deck, slots, reverse, presets, export and import, key sheet, MIDI, 10-second soak). An extra headless check also pressed every shortcut and loaded every factory preset in all five, with no errors.

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
