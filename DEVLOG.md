# Devlog

## 2 November 2026 · 82 to 86, five deep instruments, draggable trim handles and VJ mode

**Feedback:** no new comments on the GitHub feedback issues (#1 to #8), so no replies were needed. The direction comes from Craig's 1 November note on 77: keep and improve the START/END trim controls in every tool, and add VJ / big-screen visual modes.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 82 | Pavement Garage | found-sound production | The found-sound producer method (paraphrased, nothing quoted): one field recording becomes the drum kit, the chords (tuned resonators) and, with a phone voice memo, the hook, over two-step or four-to-the-floor drums | Risograph zine printing |
| 83 | Return Time | generative systems | Generative tape loops of unequal length, self-written prompt cards and the studio as an instrument (late-1970s ambient practice, paraphrased) | Ulm / Braun functionalism |
| 84 | Circle Walk | music theory | The circle of fifths (Diletskii 1679, Heinichen 1728) and the Pythagorean comma | Googie / atomic age |
| 85 | Mycelial Network | nature/philosophy | Mycorrhizal and fungal networks: growth, branching, fusion (anastomosis), signalling between trees, fruiting | Arts and Crafts private press |
| 86 | Regulating Lines | art manifesto | Purism, Après le cubisme (Paris, 1918), paraphrased only: standard objects, regulating lines, marriage of contours, the colour scales | Paperback cover grid |

**Deck upgrade (every deep instrument, 52 onwards):** each slot's waveform is now 600 × 104 with draggable **S** and **E** handles, a shaded region, a playhead while it plays, drag-inside to move the region and double-click to reset (the START/END sliders stay too). New `MMX.vj(el)`, `MMX.vjToggle()` and `MMX.level()` (RMS, low, high, peak, beat) give any tool a full-screen VJ mode: F or the VJ button, Escape to leave. 82 to 86 use it; older tools can opt in later.

**What's new in each**

- **82 Pavement Garage:** one street recording is sliced by transient into a kit (kick, snare and hat candidates chosen by spectrum), its hiss runs through a bank of tuned resonators that play the chords, and a voice memo is chopped into a hook. Two-step, four-to-the-floor or broken grooves, a four-page journal (one recording and one line each) that builds to a drop and lets the street back in, sidechain pump and a Risograph VJ scene.
- **83 Return Time:** six loops of unequal length (four note loops and two of your own trimmed sounds, whose length is the trimmed region divided by the speed). The exact return time is the LCM of all six lengths, shown in days or centuries. Each channel has speed, wear, wow and echo; you write prompt cards with action tags (slower, thin, plant, prune, reverse, silence, echo, wow, listen, ignore, realign and more), one is drawn every few minutes, a gardener fades worn loops and plants new ones, and an attention fader moves between foreground and background. An optional Gemini panel writes new cards.
- **84 Circle Walk:** pitches are positions on the line of fifths, so equal and pure fifths are both exact; in pure tuning the comma piles up visibly and RESET COMMA brings it back. Four walks (diatonic falling fifths, ii-V-I chains, the twelve-dominant tour, pivot modulation), modulation flatwards, sharpwards or to a neighbour, smallest-move voice-leading, a guide-tone lead, harmonic-minor V and bossa, brush or four grooves.
- **85 Mycelial Network:** hyphae grow, branch and fuse (anastomosis merges lineages), pulses travel by shortest path at a set speed so path length becomes rhythm, branch points throw grains, relays pass pulses on, a well-fed web fruits into mushrooms that ring a chord and drop spores that start new growth, and drought makes it die back.
- **86 Regulating Lines:** six standard objects (bottle, glass, pipe, guitar, jug, plate) on a still-life canvas: x is onset, width is duration, height is pitch. Halves, thirds, golden section or root-two regulating lines with snapping, marriage of contours (objects that share an edge sound together), consonant constants, the major, dynamic and transitional colour scales as timbres, and a machine pulse.

**Tests:** `node test/run.js 82,83,84,85,86` passed 5/5 (audio, LEARN, WAV and AIFF loaded and played, WAV recording, the Gemini mock for 83, no console errors). `node test/deep.js 82,83,84,85,86,77,81` passed 7/7 (deck, slots, reverse, presets, export and import, key sheet, MIDI, 10-second soak). New `node test/handles.js` drags the S and E handles with the mouse and checks start and end change (77, 81 and 82 to 86 pass) and that F enters VJ mode (82 to 86).

**Bugs fixed while building**

- 82: a fake tempo control broke presets; the chop cache key was built from an object.
- 83: the kit grabs R and L, which would have stolen realign and listen; shortcuts moved to A, C, B and others.
- 84: the Atomic Age typeface makes F look like 7, so the key names use Righteous; minor keys were misspelled (now sharp or flat spelling by side of the circle).
- 85: the network saturated without ever fruiting; growth caps and food rates retuned (first fruiting in about 20 seconds).
- 86: the regulating-line diagonals were drawn to the wrong point.

## 1 November 2026 · rights, privacy and key-safety pass

**Why:** Craig asked to protect his Gemini keys, check compliance, remove personal references to artists and anything that may affect copyright, before the tools move to digitalplay.work.

**What:** secrets scan of every repo's history, the gists and the live sites (clean: no key found); key box says the key stays in the browser, with FORGET KEY; `.githooks/pre-commit`, a gitleaks GitHub Action and push protection; titles, kickers, categories, design labels and Gemini prompts are now technique-first, with short "inspired by" credits; in-copyright quotes replaced by our own paraphrase and public-domain quotes marked; personal anecdotes removed; CREDITS.md, PRIVACY.md and RIGHTS-LOG.md added.

**Standing rules (apply to every future tool):**

1. **No imitation of named people.** Gemini prompts, titles and UI never ask for work "in the style of", "like" or "after" a named living or recently deceased person. Prompts describe the technique instead.
2. **Technique first.** Tools, themes, presets and kickers are named by the technique or style (for example "Grunge layout", "Generative systems"), not by a person.
3. **Short, neutral credits only.** A person, studio or movement may appear once as a short factual "Inspired by …" credit. No biography, personal details or anecdotes, and nothing that suggests endorsement.
4. **No copyrighted quotes.** Only quote texts that are in the public domain in the UK (author died in 1955 or earlier), marked "public domain; our translation". Everything else is our own paraphrase, marked "In our words".
5. **Keys stay in the browser.** A Gemini key is pasted by the visitor, kept only in `localStorage`, sent only to Google, and never committed. Run the secret scan before every commit.
6. **Keep the START/END trim controls** on every sample slot.

## 1 November 2026 · 77 to 81, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues (#1 to #7), so no replies were needed. The direction still comes from Craig's 27 October chat: joy, getting back into music, five a day, deeper and built for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 77 | Emotional Frameworks | found-sound production | Fred again..'s method as described in interviews (The FADER, 2022; paraphrased, no quotes): many versions of one vocal line, each in a different emotional framework; starting from a random sketch you have no control over; keeping fragments to bring back later | Tomato |
| 78 | Lantern Marsh | generative systems | Brian Eno, sleeve notes to Ambient 4: On Land (1982), paraphrased: found non-instruments, composting old recordings, sounds out of earshot, no sharp line between foreground and background | Hipgnosis |
| 79 | In C, Your Way | music theory | Terry Riley, In C (1964) and its performing directions: stay on a pattern, stay within 2 or 3 patterns of each other, merge into unison, the pulse. The 53 cells are the tool's own, not Riley's | Reid Miles (Blue Note) |
| 80 | Zeno's Race | nature/philosophy | Zeno of Elea's paradoxes of motion (Dichotomy, Achilles, Arrow, Stadium) and Aristotle's answer, Physics VI.9 | Shigeo Fukuda |
| 81 | Make Way for Magic | art manifesto | Refus global (Montreal, 9 August 1948), Borduas and the Automatistes: automatism, "Place à la magie !", refusal and full responsibility | Robert Massin |

**What's new in each**

- **77 Emotional Frameworks:** one vocal line goes through seven complete frameworks (lifted house, two-step, numb, panic in the club, gospel, the rave, a meditative Secret Life space). Each framework has its own tempo, four-chord loop, drums, keys style, filter, sidechain pump and space. Every version runs intro, groove, build (a doubling roll, a riser and one empty beat), drop and break. In the drop the vocal is chopped at its detected syllables and pitched onto the chord tones. VERSIONS mode moves to a new framework after every version and keeps a log. The second voice answers through a night-out chain with room tone. A "no control" sketch is drawn at random from a folder (or generated) and looped slowed down. REMEMBER and RECALL bring back a two-bar fragment of the mix, and there is reverb on the master. Gemini (optional) turns a described day into a framework. Tomato-style night bokeh, streams of log type and a huge overprinted word.
- **78 Lantern Marsh:** a map you walk across. Eight sources each keep their own irregular period, and every source has its own channel: distance sets level, air darkening (lowpass), pan and a long distance reverb, and beyond the earshot ring a source goes silent but keeps living. FLATTEN removes the foreground/background split. Tape speed and wow distort time, sources wander and the listener walks. COMPOST grabs the last eight seconds into slot 9 and plays them back as slow, dark grains. There are eight place presets named after On Land tracks. Built-in non-instruments: chain, sticks, stones, rooks, frogs, insects, drone and a far bell. Hipgnosis-style marsh photograph with white deadpan objects, reflections and a lone figure.
- **79 In C, Your Way:** up to twelve players follow the In C performing rules: random stays between a min and max, a spread limit relative to the slowest player, drop-outs, rhythmic shifts, augmentation, octave choices and individual dynamics. A high-C eighth-note pulse holds it together, with UNISON, a real ENDING (everyone to 53, swell, drop out one by one, pulse last) and restart. The 53 cells are generated from a seed along In C's broad harmonic path, with an editor (semitones:eighths) to write your own. Reid Miles-style cropped giant type, one blue and an orange flash.
- **80 Zeno's Race:** the four paradoxes play at once, with a ZENO / ARISTOTLE switch. Dichotomy: a half-way riser that never lands, or an accelerating roll that adds up to exactly the race length and lands on the goal hit. Achilles: a melody canon in which the fast copy overtakes, or (Zeno) every stage gets a whole bar so the canon tightens and freezes. Arrow: granular stills of a moment held N times, or continuous flight. Stadium: three drum rows (still, right, left) heard from the still row or from the moving row. Fukuda-style four flat panels in black, white and one red.
- **81 Make Way for Magic:** paint and the painting plays: x is time, y is pitch, the speed of your hand is level and brightness. Four layers (magic, objective mysteries, love, necessity) each have their own slot, and four brushes (dab, line, splash, syllables) turn strokes into different events. The automatic hand paints by itself with a rate and a wildness, and strokes fade unless kept. REFUS wipes everything, RESPONSABILITÉ keeps every stroke, and there is undo and hear-as-you-paint. Gemini (optional) paints strokes for a sentence. Massin-style letters set along each stroke, sized by speed, a typeface per voice.

**Tests:** `node test/run.js 77,78,79,80,81` passed 5/5: audio, LEARN, WAV and AIFF loaded and played, WAV recording, the Gemini mocks for 77 and 81, and no console errors. `node test/deep.js 77,78,79,80,81` passed 5/5: deck, slots, reverse, presets, export and import, key sheet, MIDI and the 10-second soak. An extra interaction pass pressed every shortcut, dragged on each canvas, changed every select and maxed every slider, with no errors. Fixes during testing:
- 77: choosing a framework from the select called itself in a loop; the sketch generator ran before the deck existed; a newly loaded vocal now sounds straight away while playing; the waveform peaks are cached; the type streams now show the real log rather than one repeated line.
- 78: far labels ran off the frame; factory places now set the caption.
- 79: a dead level slider was removed, the sliders were invisible on the blue panel, and the seed showed decimals.
- 80: Achilles in Zeno's view did not shrink the gap (both runners now follow the real geometry, one stage per bar), and soloing re-syncs the race.

## 31 October 2026 · 72 to 76, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues (#1 to #6), so no replies were needed. The direction still comes from Craig's 27 October chat: joy, getting back into music, five a day, deeper and built for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 72 | Tube Brakes | found-sound production | The voice-note method (paraphrased): recording on a phone, which brings the room into the sound, and building tracks from pitched, auto-tuned found vocals (Fred again.., interviews, 2021) | Mark Farrow |
| 73 | Long Now Bells | generative systems | Brian Eno, January 07003: Bell Studies for The Clock of the Long Now (2003): change ringing and a ten-bell row for each day | 8vo |
| 74 | Gradus | music theory | Johann Joseph Fux, Gradus ad Parnassum (1725): the five species of counterpoint (one quote, from Alfred Mann's translation; the other rules are paraphrased) | Emil Ruder |
| 75 | Same River | nature/philosophy | Heraclitus: the river fragments (B12), the way up and down (B60), the bow and lyre (B51), the ever-living fire (B30) | Alexey Brodovitch |
| 76 | Pop Art Is | art manifesto | Richard Hamilton's letter to Peter and Alison Smithson (16 January 1957), defining Pop Art in eleven words | Herb Lubalin |

**What's new in each**

- **72 Tube Brakes:** YIN-style pitch tracking of a voice note in slot 1, then granular auto-tune to the nearest note, chord tones, a riff or MIDI, with correction amount, retune speed, range and harmony voices. Time stretch, a hook every N bars, a room-tone slot through a phone chain (high and low pass, a heavily squashed compressor) with a dry/wet blend, sidechain pump, house or two-step drums, chord progressions, and an automatic intro, build, drop and break. The pitch track is drawn as a Farrow blister pack. Six slots.
- **73 Long Now Bells:** methods from place notation (rounds, Plain Hunt, Plain Bob on odd or even numbers of bells, or your own notation, with Grandsire Doubles as a preset). LONG NOW mode gives a different ten-bell permutation for every day since 1 January 02003. This is the tool's own mapping (a Lehmer code of the day number), **not** Danny Hillis's algorithm. Additive bells (church, harmonic or enharmonic partials with a stretch control) are mixed with your sample, with a hum drone, air, clock tick and handstroke gap. The display shows the blue-line diagram and a ring of bells in 8vo layers.
- **74 Gradus:** Fux's D dorian cantus firmus or a generated one. Species 1 to 4 counterpoint is composed above or below in six modes by a randomised search, with a raised leading note in cadences (not in phrygian). A rule checker lists every violation, and you can click to edit notes (shift-click edits the cantus). The loop can repeat, compose again, change mode, swap voices or make a new cantus. Ruder grid and Univers-style type.
- **75 Same River:** a riverbed pattern that stays the same while CURRENT moves where each hit reads from in your samples on every pass. Cratylus mode moves it on every hit, and erosion slowly changes the bed. The way up and down inverts or mirrors the melody; the bow and lyre is two detuned loops of one sample, with the tension swinging out and back; fire is a density envelope that kindles and goes out, with crackle. Brodovitch whitespace and motion-blur water.
- **76 Pop Art Is:** eleven giant typographic word faders (Popular, Transient, Expendable, Low cost, Mass produced, Young, Witty, Sexy, Gimmicky, Glamorous, Big business) drive a pop-song factory. It makes songs with titles, a chart and a units-sold counter, plus a sonic-logo jingle and a SINCERITY? knob. The master chain runs through a crusher, a cheap or bright filter and drive. Gemini (optional, with your own key) turns a product description into a jingle and fader settings. Lubalin's tight, expressive type in black with red flashes.

**Tests:** `node test/run.js 72,73,74,75,76` passed 5/5: audio, LEARN, WAV and AIFF loaded and played, WAV recording, the Gemini mock for 76, and no console errors. `node test/deep.js 72,73,74,75,76` passed 5/5: deck, slots, reverse, presets, export and import, key sheet, MIDI and the 10-second soak. Fixes during testing:
- 72's pitch line jumped between voices; it is now drawn per stream.
- 73 had an intermittent non-finite envelope value, now guarded, and its row list overlapped the header.
- 74 now checks fourth species for consecutive fifths and octaves on the upbeats, and transposes the cantus correctly when the mode changes.
- 75's "steps per bar" did not change the step rate.
- 76's word faders all flashed red (a `classList.toggle` with an undefined force), long words overflowed, and song length was miscalculated.

## 30 October 2026 · 67 to 71, five deep instruments

**Feedback:** no new comments on the GitHub feedback issues (#1 to #5), so no replies were needed. The direction still comes from Craig's 27 October chat: joy, getting back into music, five a day, deeper and built for his own sounds.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 67 | USB Folder | found-sound production | USB (2024) and USB002 (2025) as an ever-growing mixtape folder, and rebuilding a live vocal line by line (Fred again.., Tape Notes, episode 176; paraphrased) | Karel Martens |
| 68 | No Starting Point | generative systems | "The Studio as Compositional Tool" (lecture 1979, Down Beat 1983): in-studio composition, the mixer as instrument | Russell Mills |
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
| 62 | Spoken Mantra | found-sound production | The found-speech method of "Marea (we've lost dancing)" (2021, with The Blessed Madonna): one spoken phrase becomes the hook, the chords and the arrangement (paraphrased, no quotes) | Susan Kare |
| 63 | Discreet System | generative systems | Discreet Music (1975): two melodies of different lengths through a graphic EQ and echo into a two-machine tape-delay loop | Isotype (Otto and Marie Neurath, Gerd Arntz) |
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
| 57 | Live Live | found-sound production | A live set played from one pad sampler and three CDJs (Fred again.., Boiler Room London, 2022; paraphrased) | Barney Bubbles |
| 58 | Endless Music Box | generative systems | Bloom (2008, with Peter Chilvers), generative music (Koan, 1996) and 77 Million Paintings (2006) | Vaughan Oliver / v23 (4AD) |
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

**Feedback:** Craig said these tools are bringing him joy and getting him back into music. He wants them more complex and more customisable for his own sounds, five a day across found-sound production, generative systems, a theory of composition, nature or philosophy, and an art manifesto.

| # | Tool | Category | Source idea | Design homage |
|---|---|---|---|---|
| 52 | Actual Life Journal | found-sound production | The voice-memo diary method (Fred again.., Actual Life, 2021 to 2022) | Tibor Kalman / M&Co |
| 53 | Seed Garden | generative systems | Generative music: tape loops of unequal length, Oblique Strategies, the studio as a tool, gardening | Karl Gerstner, *Designing Programmes* |
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
- **Catalogue:** `catalogue.json` has number, title, category, source, year, design, idea, controls and date for every tool. 01 to 51 were backfilled: music theory for 03, 17, 18, 42 and 47; generative systems for 35; nature/philosophy for 20, 22 and 33; everything else is art manifesto. `index.html` is now a searchable, filterable catalogue with category chips, source and design selects, sort, "deep" and "Gemini" toggles, and state kept in the URL hash.
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
