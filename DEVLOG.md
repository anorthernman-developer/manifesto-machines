# Devlog

## 30 October 2026 · 67 to 71, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues (#1 to #5), so no replies were needed. The direction still comes from Craig's 27 October chat: joy, getting back into music, five a day, deeper and built for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 67 | USB Folder | Fred again.. | USB (2024) and USB002 (2025) as "an infinitely rolling mixtape or folder", and rebuilding Jamie T's live vocal line by line for "Lights Burn Dimmer" (Tape Notes, episode 176) | Karel Martens |
| 68 | No Starting Point | Eno | "The Studio as Compositional Tool" (lecture 1979, Down Beat 1983): in-studio composition, the mixer as instrument | Russell Mills |
| 69 | Tonality Diamond | music theory | Harry Partch, Genesis of a Music (1949): the Tonality Diamond, Otonality and Utonality, the 43-tone scale (paraphrased, no quotes) | Lester Beall |
| 70 | Dawn Syntax | nature/philosophy | Birdsong syntax: Hartshorne's monotony threshold (1956), Okanoya's finite-state finch songs, Suzuki et al.'s ABC–D calls (2016), the dawn chorus | Charley Harper |
| 71 | Merz Collage | art manifesto | Kurt Schwitters, "Die Merzmalerei" (Der Sturm, 1919): the equal evaluation of materials; the Merzbau | Piet Zwart |

**What's new in each**

- **67 USB Folder:** a live vocal is cut into LINES (at the gaps or equally) and an ORDER you build, switch (S), reverse and rotate. ISOLATE narrows it to the voice band. Three stacked loops with their own bar lengths play as tempo-locked sixteenth slices (keeping key) or varispeed. House, two-step, breakbeat or half-time drums, sidechain pump, a sub following a progression, and sections INTRO, LINES, BUILD (the last line tightens, riser, a beat of silence), DROP (pitched hook chops) and OUTRO. Five rooms with their own reverb and crowd. The USB folder stores tunes (settings plus line order) in localStorage and presets; ROLL plays the folder as a set; MAKE TEN fills it. Gemini turns a described room into tempo, groove, room, key and a tune name. Eight slots. Overprinted CMY and index-card look.
- **68 No Starting Point:** a 12-track loop tape that starts empty. PUT ON writes a generated part (drone, piano, bass, bell, pulse, texture) in your key; TAKE OFF mutes older parts first; TAKE A MIXTURE OFF mutes about half. Twelve channel strips (fader, pan, echo, tilt EQ, half/double/backwards tape speed, mute, solo, erase) into a bus compressor where SQUASH makes one fader duck the rest. A brush paints notes out of the tape or back in. A gardener adds and removes parts, fader drift mixes, and MIDI can overdub onto a track. Six slots. Stained, layered Russell Mills surfaces.
- **69 Tonality Diamond:** the 5-, 7-, 9- or 11-limit diamond with 1/1 at G 392 Hz. Click cells for ratios and edge circles for Otonality and Utonality hexads. A pivot walk moves between them through a shared note: kithara strums, chromelodeon holds, marimba marks the pivot, bowls ring and the boo plays a meter of 4, 5, 7 or 11. The adapted viola glides between neighbouring notes of the 43-tone scale. A 43-key strip shows cents and the difference from 12-ET, a 12-ET switch snaps everything to the piano for comparison, and MIDI is mapped at 43 keys an octave. Six slots, all retuned exactly by playback rate.
- **70 Dawn Syntax:** five bird slots are cut into syllables, each bird with an editable grammar table (syllable to next syllable or END). There is versatility, a monotony pause that grows with repetition, and a dawn clock that wakes the birds in turn. ABC–D on the tit makes the other birds pause, come close and sing; D–ABC barely moves them. Free or pulsed rhythm and pitch snapping to a scale turn it into a phrase sequencer. Five synthesised birds and a dawn ambience. Flat Charley Harper birds and stepped skies.
- **71 Merz Collage:** six materials (ticket, newspaper, wood, wire, voice with Ursonate-style syllables, piano). Tear fragments and glue them onto a looping page: x is time, y is pitch, size is level and angle is tone and pan. EQUAL EVALUATION RMS-matches every fragment; MERZBAU grows a fragment a pass while older layers fade; K is the Commerz → Merz cut; R reverses. Gemini turns a list of found things into a collage. Red and black Piet Zwart diagonals and halftones.

**Tests:** `node test/run.js 67,68,69,70,71` passed 5/5: audio, LEARN, WAV and AIFF loaded and played, WAV recording, the Gemini mocks for 67 and 71, and no console errors. `node test/deep.js 67,68,69,70,71` passed 5/5: deck, slots, reverse, presets, export and import, key sheet, MIDI and the 10-second soak. Fixes during testing:
- 70's first parameter moved with the dawn clock, so presets could not be checked; it was reordered.
- 70's built-in birds had an envelope bug that merged syllables.
- 68's vertical faders did not render.
- 68, 70 and 71 now audition a slot as soon as you load a sound into it, so a new sample is heard straight away.

## 29 October 2026 · 62 to 66, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues (#1 to #4), so no replies were needed. The direction still comes from Craig's 27 October chat: joy, getting back into music, five a day, deeper and built for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 62 | Spoken Mantra | Fred again.. | The found-speech method of "Marea (we've lost dancing)" (2021, with The Blessed Madonna): one spoken phrase becomes the hook, the chords and the arrangement (paraphrased, no quotes) | Susan Kare |
| 63 | Discreet System | Eno | Discreet Music (1975): two melodies of different lengths through a graphic EQ and echo into a two-machine tape-delay loop | Isotype (Otto and Marie Neurath, Gerd Arntz) |
| 64 | Row Matrix | music theory | Schoenberg's method of composing with twelve tones (1923; lecture 1941) | Ladislav Sutnar |
| 65 | Tide Predictor | nature/philosophy | Tidal harmonic constituents and Kelvin's tide-predicting machine (1872 to 1873) | Edward Tufte |
| 66 | Plastic Unit | art manifesto | Vasarely, the Yellow Manifesto (1955, Galerie Denise René, "Le Mouvement") | Franco Grignani |

**What's new in each**

- **62 Spoken Mantra:** the speech slot is cut into words, either at the gaps or into equal slices, and each word's pitch is found by autocorrelation. The piano can "follow the speech" (it picks chords containing the word's note) or use set progressions. An arrangement runs INTRO, MANTRA, BUILD, DROP and BREAK, with sidechain pump, a riser and a beat of silence before the drop. Click words to build the mantra. Gemini can turn a described moment into key, mode, groove and section lengths. Six slots. A 1-bit Mac desktop look.
- **63 Discreet System:** lines A, B and an optional C, each with its own length, drawn on grids. They run through an 8-band graphic EQ you draw (with optional drift), an echo, and two 20-second tape delays with saturation, tape tone and wow. Also: a "harp record" mode (very quiet, one speaker), Pachelbel canon players with tempo spread, and an Isotype chart counting the notes still on the tape at each pass.
- **64 Row Matrix:** the full 12 × 12 P/I/R/RI matrix. Click a label to give a voice that form. Four voices, each with rhythm, chord segmentation (dyads to hexachords), register spread, rest chance and an end-of-row rule. Also: Klangfarben mode, an aggregate counter with a bell, an interval chart (all-interval rows highlighted), a combinatoriality finder (C pairs voice 2), random and all-interval row generators, and the Op. 25, Berg Violin Concerto, Webern Op. 21 and Lyric Suite rows.
- **65 Tide Predictor:** eight constituents (M2, S2, N2, K2, K1, O1, M4, M6) with amplitude, phase and on/off, and five illustrative coast types (not real port data). Each constituent is a drone at its true speed ratio (M2 against S2 beats like spring and neap) or tuned to the scale. The water level plays a tide-gauge melody, and bells ring at high and low water. A shore loop opens with the water. Tufte sparklines and small multiples show Kelvin's pulleys turning, and a 30-day spring/neap strip runs along the bottom.
- **66 Plastic Unit:** a 16 × 8 grid of plastic units, where inner form is articulation and pattern or colour is the slot. The Vega bulge is a moving lens that brightens and lengthens what it passes over. You can permute, retrograde, mirror, shift and multiply, play the negative (the outline of the empty space) and run a programme that transforms the grid every N bars. It uses Grignani black-and-white line patterns, with a Vasarely colour view as an option.

**Tests:** `node test/run.js 62,63,64,65,66` passed 5/5: audio, LEARN, WAV and AIFF loaded and played, WAV recording, the Gemini mock for 62, and no console errors. `node test/deep.js 62,63,64,65,66` passed 5/5: deck, slots, reverse, presets, export and import, key sheet, MIDI and the 10-second soak. Extra headless checks covered several things:
- 62's arrangement runs INTRO to BREAK, and its pitch tracking recovers the synthetic voice's notes.
- 64's combinatoriality finder pairs Op. 25 P-4 with I-11, and the all-interval generator was verified.
- 65 finds high and low water at 12 tidal hours a second.
- 66's multiply and negative modes run without errors.

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
