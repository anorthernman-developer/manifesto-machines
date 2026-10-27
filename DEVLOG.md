# Devlog

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
