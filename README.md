# Manifesto Machines

Fifty-six music-making tools (and counting), each built from two things:

1. **A real source idea**: an artist's manifesto, a theory of composition, Fred again..'s or Brian Eno's working methods, or an idea from nature or philosophy, whose ideas become the rules of the music system. Futurism only accelerates, Dada cuts your loop up in a hat, Dogme 95 forbids effects, Auto-Destructive Art destroys the sample as it plays.
2. **A graphic design style or designer**, whose work drives the whole look: type, grid, colour and layout. Plakatstil, Neville Brody, Wim Crouwel, Saul Bass, Barbara Kruger, Memphis, brutalist web and more.

The idea is to learn about art, manifestos and graphic design while making music. Every tool has a **LEARN** panel covering the manifesto (author, year, key ideas, short accurate quotes, and how the machine reads it) and the design homage (who, when, hallmarks, and works to look up).

**Play them:** https://anorthernman-developer.github.io/manifesto-machines/ (a searchable catalogue: filter by category, source, design homage, deep instruments or Gemini; press `/` to search)

## Using them

- Each tool is **one standalone HTML file** (`tools/NN-slug.html`). Download it and open it from your disk in Chrome or Edge; it works offline (Google Fonts load when online, with system fallbacks).
- Press **PLAY** (or Space). Every tool plays built-in synthesised sounds straight away.
- Drop your own samples anywhere on the page, or use **SAMPLES** / **FOLDER** (for example `F:\01 Splice Sounds`; a random dozen is used from a folder). WAV, AIFF/AIFC (uncompressed), MP3, OGG and FLAC all work. AIFF is read by a small built-in decoder when the browser can't.
- **● REC** records the output to a WAV file. **LEARN** (or L) opens the notes.
- A limiter on the master output keeps everything at a safe level.
- Seven tools (10, 13, 36, 41, 48, 52, 56) can optionally ask Google Gemini for new material. Paste a Google AI Studio key into the box; it is stored only in your browser's `localStorage` (shared with SR-12 and the other tools as `sr12.geminiKey`) and sent only to Google. **No key is ever stored in this repo.** Without a key they use their built-in version.

### The deep instruments (52 onwards)

From 27 October there are five new tools a day: one Fred again.., one Brian Eno, one theory of composition, one from nature or philosophy, and one art manifesto. They are built on a second engine, the **deck** (`src/deck.js`), so they can be customised for your own sounds:

- **SOUNDS** (D opens the deck): 4 to 6 named sample slots. Each slot loads a WAV, AIFF, MP3 or a whole folder (with "next file" to step through it) and has pitch, gain, start, end, reverse, filter, pan, and reverb and delay sends. A waveform shows the region.
- **PRESETS**: save your settings and your sounds' slot settings to the browser (localStorage), or export and import them as JSON. Each tool has a few factory presets.
- **MIDI**: Web MIDI input. Notes do something musical in each tool, and MIDI learn maps any knob or fader to any slider.
- **KEYS** (or `?`): the keyboard shortcuts sheet.
- LEARN has a "Try this" list of three ideas for using your own sounds.

They still play within a few seconds of pressing PLAY.

## The machines

<!--LIST-->
| # | Tool | Category | Source idea | Design homage | Idea |
|---|---|---|---|---|---|
| 01 | [Accelerator](tools/01-accelerator.html) | art manifesto | The Founding and Manifesto of Futurism (Filippo Tommaso Marinetti, 1909) | Plakatstil (German 'poster style') | A drum machine that can only speed up, until it crashes and starts again. |
| 02 | [Intonarumori](tools/02-intonarumori.html) | art manifesto | The Art of Noises (L'arte dei rumori) (Luigi Russolo, 1913) | Neville Brody | Six noise machines, one for each of Russolo's six families of noise, cranked by hand. |
| 03 | [Enharmonic](tools/03-enharmonic.html) | music theory | Manifesto of Futurist Musicians (Francesco Balilla Pratella, 1910) | Fortunato Depero | A quarter-tone melody machine in free metre, where every bar chooses its own length. |
| 04 | [Cut-up Hat](tools/04-cut-up-hat.html) | art manifesto | Dada Manifesto 1918 (Tristan Tzara, 1918) | David Carson | Your loop is cut into words, shaken in a hat and played back in the order the pieces come out. |
| 05 | [Automatic](tools/05-automatic.html) | art manifesto | Manifesto of Surrealism (André Breton, 1924) | Tadanori Yokoo | Draw without stopping to think: your hand becomes a melody and an exquisite corpse in three parts. |
| 06 | [Neo-Plastic Grid](tools/06-neo-plastic.html) | art manifesto | De Stijl Manifesto I (Theo van Doesburg, Piet Mondrian, Vilmos Huszár, Antony Kok and others, 1918) | Wim Crouwel | A Mondrian composition you can hear: vertical lines are time, horizontal lines are pitch, colours are instruments. |
| 07 | [Building](tools/07-building.html) | art manifesto | Programme of the Staatliches Bauhaus in Weimar (Walter Gropius, 1919) | Herbert Bayer | Build a song floor by floor from Bauhaus shapes: blue circles, red squares, yellow triangles. |
| 08 | [Kinetic Rhythms](tools/08-kinetic.html) | art manifesto | The Realistic Manifesto (Naum Gabo and Antoine Pevsner, 1920) | Gustav Klutsis | Three rotating rods sweep through points in space; every crossing is a note, so rhythm comes from motion, not mass. |
| 09 | [Zero of Form](tools/09-zero-of-form.html) | art manifesto | From Cubism and Futurism to Suprematism: The New Painterly Realism (Kazimir Malevich, 1915) | El Lissitzky | Pure shapes float on white; each one is a held tone, and where they overlap your sample sparkles. |
| 10 | [Zaum](tools/10-zaum.html) | art manifesto | A Slap in the Face of Public Taste (David Burliuk, Aleksei Kruchenykh, Vladimir Mayakovsky and Velimir Khlebnikov, 1912) | Alexander Rodchenko | Type words that mean nothing in any language and a throat made of your sample sings them. |
| 11 | [Theory of Intervals](tools/11-kino-intervals.html) | art manifesto | WE: Variant of a Manifesto (Dziga Vertov (the Kinoks group), 1922) | Vladimir and Georgii Stenberg | A film strip of sample 'shots', where the loudest music happens in the cuts between them. |
| 12 | [BLAST / BLESS](tools/12-blast.html) | art manifesto | BLAST, Manifesto of the Vorticists (Wyndham Lewis, with Ezra Pound, Gaudier-Brzeska and others, 1914) | Paula Scher | Every instrument is a word on the wall: BLAST it and it hits hard and dirty, BLESS it and it turns soft and holy. |
| 13 | [Event Scores](tools/13-event-scores.html) | art manifesto | Fluxus Manifesto (George Maciunas, 1963) | Experimental Jetset | A deck of Fluxus-style instruction cards; the machine performs whichever card is on top, then flips the next. |
| 14 | [Dérive](tools/14-derive.html) | art manifesto | Report on the Construction of Situations (Guy Debord, 1957) | Jamie Reid | A walker drifts through a psychogeographic city; each district has its own sound, and the city's pull decides the route. |
| 15 | [Painted Lines](tools/15-painted-lines.html) | art manifesto | The Stuckists manifesto (Billy Childish and Charles Thomson, 1999) | Corita Kent | Paint melodies by hand in screen-print layers; the loop prints one colour at a time, then all of them together. |
| 16 | [Vow of Chastity](tools/16-vow-of-chastity.html) | art manifesto | Dogme 95 Manifesto and Vow of Chastity (Lars von Trier and Thomas Vinterberg, 1995) | Brutalist web design | One sample, no effects, no grid: you play it live by hand, and every rule you break goes in a public confession. |
| 17 | [Credo](tools/17-credo.html) | music theory | The Future of Music: Credo (John Cage, 1937 (a talk in Seattle; published 1958)) | Ikko Tanaka | Three coins tossed six times build an I Ching hexagram, and the hexagram picks the sound, its length and its loudness from a chart. |
| 18 | [Breath Squares](tools/18-breath-squares.html) | music theory | Sonic Meditations (Pauline Oliveros, 1971) | Josef Albers | Four nested squares are four drones that breathe; colours that sit close together make their tones beat against each other. |
| 19 | [BECAUSE](tools/19-because.html) | art manifesto | Riot Grrrl Manifesto (Kathleen Hanna (with Bikini Kill), 1991) | Barbara Kruger | A three-chord punk machine where your BECAUSE lines become the riffs and the shouted rhythm. |
| 20 | [Cyborg](tools/20-cyborg.html) | nature/philosophy | A Cyborg Manifesto (Donna Haraway, 1985) | April Greiman | Three boundary sliders (human/animal, organism/machine, physical/non-physical) blur one groove between flesh and code. |
| 21 | [Virus Matrix](tools/21-virus-matrix.html) | art manifesto | A Cyberfeminist Manifesto for the 21st Century (VNS Matrix (Josephine Starrs, Julianne Pierce, Francesca da Rimini, Virginia Barratt), 1991) | Y2K web aesthetic | A step grid that is also a living culture: a virus spreads through the pattern each cycle, corrupting the notes it touches. |
| 22 | [Change Nature](tools/22-change-nature.html) | nature/philosophy | Xenofeminism: A Politics for Alienation (Laboria Cuboniks (Helen Hester, Diann Bauer, Amy Ireland, Katrin Kolo, Lucca Fraser, Patricia Reed), 2015) | M/M (Paris) | The harmonic 'laws' of music are editable: choose the octave, the number of notes in it and how the overtones stretch. |
| 23 | [Auto-Destructive Loop](tools/23-auto-destructive.html) | art manifesto | Auto-Destructive Art (manifestos 1 to 3) (Gustav Metzger, 1959 to 1961) | Stefan Sagmeister | A loop that destroys itself as it plays; its slow death is the piece, shown as a wall of bananas turning from green to brown. |
| 24 | [Art Concret](tools/24-art-concret.html) | art manifesto | The Basis of Concrete Painting (Art Concret) (Theo van Doesburg, Otto G. Carlsund, Jean Hélion, Léon Tutundjian and Marcel Wantz, 1930) | Josef Müller-Brockmann | Every voice is a written formula, step × a + b mod n, so the whole piece is constructed in the mind before a sound is made. |
| 25 | [Spatial Cuts](tools/25-spatial-cuts.html) | art manifesto | Manifiesto Blanco (White Manifesto) (Lucio Fontana, with students at the Academia Altamira, 1946) | Giovanni Pintori for Olivetti | A painted drone is the canvas; slash it, and each cut opens a window through which your sample comes from the space behind. |
| 26 | [Matter Alive](tools/26-matter-alive.html) | art manifesto | Gutai Art Manifesto (Jirō Yoshihara, 1956) | Yusaku Kamekura | Your sample is the ground: throw balls of mud, paint and paper onto its waveform, and every impact plays the sound at that spot. |
| 27 | [Bicho](tools/27-bicho.html) | art manifesto | Neo-Concrete Manifesto (Ferreira Gullar, with Amilcar de Castro, Lygia Clark, Lygia Pape, Franz Weissmann, Reynaldo Jardim and Theon Spanúdis, 1959) | Alexandre Wollner | A hinged metal creature: bend its plates and the angles between them become the intervals of its chord. |
| 28 | [Anthropophagy](tools/28-anthropophagy.html) | art manifesto | Manifesto Antropófago (Cannibal Manifesto) (Oswald de Andrade, 1928) | Rogério Duarte | Feed the mouth sounds from anywhere; it chews them into pieces and digests them into a new Brazilian rhythm. |
| 29 | [Ultra Metaphor](tools/29-ultra-metaphor.html) | art manifesto | Ultraísmo (Jorge Luis Borges, 1921) | Jan Tschichold | Fuse two sound images into one metaphor: the rhythm of one drives the body of the other, with every ornament stripped away. |
| 30 | [Strident Radio](tools/30-estridentista-radio.html) | art manifesto | Actual No. 1 (Comprimido estridentista) (Manuel Maples Arce, 1921) | Lance Wyman | Tune a wireless dial across a 1920s city: every station is a different broadcast of your sample, with static and howl in between. |
| 31 | [Zenith](tools/31-zenith.html) | art manifesto | Manifesto of Zenitism (Ljubomir Micić, 1921) | Karel Teige | An endless climb to the zenith: Shepard tones and a sample that rises forever but never arrives. |
| 32 | [Make It Bloom](tools/32-creationism.html) | art manifesto | Non serviam and Creacionismo (Vicente Huidobro, 1914 to 1916) | Alvin Lustig | Don't sing the rose, make it bloom: build a new sound from nothing, partial by partial, then let it flower through your sample. |
| 33 | [Slow Cooker](tools/33-slow-food.html) | nature/philosophy | Slow Food Manifesto (Folco Portinari, for the movement founded by Carlo Petrini, 1989) | Kenya Hara | Time-stretch your sample until it slows to near stillness, simmering it in grains that you season and leave to ripen. |
| 34 | [Repurpose Platform](tools/34-accelerate.html) | art manifesto | #Accelerate: Manifesto for an Accelerationist Politics (Alex Williams and Nick Srnicek, 2013) | The Designers Republic | Steer a vector between four futures and repurpose the machine itself: every corner is a whole groove, and you can always expand the map. |
| 35 | [Airport Loops](tools/35-ambient-loops.html) | Eno | Ambient Music (liner notes to Ambient 1: Music for Airports) (Brian Eno, 1978) | Peter Saville | Seven loops of different, unrelated lengths drift in and out of phase, so the music never repeats in the same way. |
| 36 | [Idea Machine](tools/36-idea-machine.html) | art manifesto | Paragraphs on Conceptual Art (Sol LeWitt, 1967) | Otl Aicher | Write wall-drawing instructions and the machine executes them blindly: each line drawn across the grid becomes a melody. |
| 37 | [No](tools/37-no-manifesto.html) | art manifesto | No Manifesto (Yvonne Rainer, 1965) | Massimo Vignelli | A full, flashy groove that you take apart with thirteen NOs, until only an ordinary walking pulse is left. |
| 38 | [Maintenance](tools/38-maintenance.html) | art manifesto | Manifesto for Maintenance Art 1969! Proposal for an exhibition 'CARE' (Mierle Laderman Ukeles, 1969) | Jock Kinneir and Margaret Calvert | The music gets dirty and falls apart on its own; your job is to look after it, and the care itself becomes the rhythm. |
| 39 | [Mould](tools/39-mould.html) | art manifesto | Mould Manifesto against Rationalism in Architecture (Verschimmelungsmanifest) (Friedensreich Hundertwasser, 1958) | Alphonse Mucha | A rigid, straight step grid is slowly overgrown by mould, and wherever the mould spreads, the notes bend, drift and grow organic. |
| 40 | [Ornament & Crime](tools/40-ornament-crime.html) | art manifesto | Ornament and Crime (Ornament und Verbrechen) (Adolf Loos, 1910 (lecture), published 1913) | Koloman Moser | Decorate a plain melody with trills, turns and grace notes, but every ornament costs labour, and the bill and the fashion clock are always running. |
| 41 | [The Store](tools/41-the-store.html) | art manifesto | I am for an art... (Claes Oldenburg, 1961) | Memphis Group | A corner shop of found sounds: every product on the shelves is a sound object, and whatever you put in your basket becomes the song. |
| 42 | [Scratch Orchestra](tools/42-scratch-orchestra.html) | music theory | A Scratch Orchestra: draft constitution (Cornelius Cardew, 1969) | Ken Garland | A crowd of amateur players, each with their own scratch music, performing a sequence of rites chosen from the orchestra's constitution. |
| 43 | [Für Statik](tools/43-meta-mechanics.html) | art manifesto | Für Statik (For Statics) (Jean Tinguely, 1959) | Armin Hofmann | A rickety machine of meshing gears: each gear's teeth strike notes, so the gear ratios become polyrhythms, and the machine wobbles because nothing stays still. |
| 44 | [Décollage](tools/44-decollage.html) | art manifesto | Nouveau Réalisme manifestos (Pierre Restany, 1960) | Polish School of Posters | Three posters pasted on top of each other, each one a different groove; tear strips away to reveal the layers underneath. |
| 45 | [Poor Means](tools/45-poor-means.html) | art manifesto | Arte Povera: Notes for a Guerrilla War (Germano Celant, 1967) | Bruno Munari | Four poor materials (wire, stone, water and rag) and only the energy of your hands: pluck, strike, drip and rub. |
| 46 | [Databend](tools/46-databend.html) | art manifesto | Glitch Studies Manifesto (Rosa Menkman, 2010) | Wolfgang Weingart | Bend the raw data of your sample: shift its bytes, flip its bits, swap and repeat its blocks, and listen to the medium break open. |
| 47 | [Sound Masses](tools/47-liberation-of-sound.html) | music theory | The Liberation of Sound (Edgard Varèse, 1936 to 1962 (lectures), published 1966) | Erik Nitsche | Three sirens and colliding sound masses: drag the sirens' pitch planes through space, and where they meet, the masses penetrate or repel. |
| 48 | [Constellation](tools/48-constellation.html) | art manifesto | From Line to Constellation (vom vers zur konstellation) (Eugen Gomringer, 1954) | Bradbury Thompson | Place a few words on the page like stars: their positions make the rhythm and space, and their letters make the melody. |
| 49 | [Letter Drum](tools/49-lettrist-drum.html) | art manifesto | Lettrism: Manifesto of Lettrist Poetry (Isidore Isou, 1942 (written), 1947 (published)) | Emigre | A drum machine made of letters: type a line and every character is a percussive phoneme, including Isou's new letters for breaths, clicks, whistles and kisses. |
| 50 | [Ecstatic Truth](tools/50-ecstatic-truth.html) | art manifesto | Minnesota Declaration: Truth and Fact in Documentary Cinema (Werner Herzog, 1999) | Saul Bass | One slider from the accountant's truth to ecstatic truth: the same recording, played plainly as fact or stylised, slowed and staged into something deeper. |
| 51 | [Both-And](tools/51-both-and.html) | art manifesto | Complexity and Contradiction in Architecture (Nonstraightforward Architecture: A Gentle Manifesto) (Robert Venturi, 1966) | Supergraphics (Barbara Stauffacher Solomon) | A machine that refuses to choose: every musical decision is a pair of opposites, and in the middle you get both at once. Major and minor, four and three, clean and dirty, straight and swung. |
| 52 | [Actual Life Journal](tools/52-actual-life-journal.html) | Fred | What would Fred again.. do? The Actual Life method (Fred again.. (Fred Gibson, b. 1993, London), 2021 to 2022) | Tibor Kalman and M&Co | A diary you can dance to: a voice memo is chopped into emotional vocal hooks, laid over a field recording and house or two-step garage drums, and taken through intro, build, drop and break. |
| 53 | [Seed Garden](tools/53-seed-garden.html) | Eno | What would Brian Eno do? Generative music, tape loops and gardening (Brian Eno (b. 1948), with Peter Schmidt for Oblique Strategies, 1975 to 2011) | Karl Gerstner, Designing Programmes | Plant sounds as tape loops of different lengths and let them drift in and out of phase, so the music is never the same twice. Garden it with seeds, pruning, weather, a deck of Oblique Strategies and a tape machine that prints the garden back into itself. |
| 54 | [Gradual Process](tools/54-gradual-process.html) | music theory | Music as a Gradual Process (Steve Reich (b. 1936), 1968) | Anton Stankowski | Set a process going and listen to it run: copies of one pattern drift out of phase (Piano Phase, It's Gonna Rain), fill in note by note (Drumming) or stretch out (Four Organs), and new patterns appear from the gaps. |
| 55 | [Murmuration](tools/55-murmuration.html) | nature/philosophy | Emergence: the murmuration (Craig Reynolds (1987); Ballerini, Cabibbo, Parisi and colleagues, STARFLAG (2008), 1987 / 2008) | Muriel Cooper | No bird leads a murmuration. Each one follows three local rules and watches about seven neighbours, and the shape of the whole flock comes out of that. Here each bird is also a sound: its height sets the pitch, its heading picks the point in your sample, and its speed sets the level. |
| 56 | [The Colour Keyboard](tools/56-colour-keyboard.html) | art manifesto | Concerning the Spiritual in Art (Wassily Kandinsky (1866 to 1944), 1911) | Paul Rand | Kandinsky said colour is a keyboard and the soul is the piano. Paint a composition from points, lines, triangles, squares and circles, and a playhead plays it: the colour picks the instrument (yellow is a trumpet, blue a cello), the shape sets how each note is played, and white and black are two kinds of silence. |
<!--/LIST-->

## Craig's feedback

- **27 October 2026:** "Loving these things you have created. It is bringing joy and getting me back into music." Wants them **more complex and more customisable for my own sounds**, and five a day: Fred again.., Brian Eno, a theory of composition, nature or philosophy, and an art manifesto, each with a design homage not used before. → From #52 every tool is a deep instrument with sample slots, presets, MIDI and a "Try this" list (see above), and the catalogue is now searchable.

Add notes here or open an issue with the `feedback` label.

## How it's built

`src/kit.js` and `src/kit.css` are a small shared engine (audio graph and limiter, fallback sounds, sample loading with the AIFF reader, WAV recorder, LEARN panel, optional Gemini box). `src/tools/NN-slug.js` holds each tool's metadata, CSS, HTML and music system. `python3 build.py` inlines everything into one self-contained file per tool and regenerates `index.html`, `tools.json`, `LEDGER.md` and the list above. `test/run.js` is a headless Chrome test (see `DEVLOG.md`).

`src/deck.js` and `src/deck.css` are the deck for the deep instruments (#52 on). `test/deep.js` tests the deck: slots, AIFF and WAV, reverse, presets, JSON export and import, MIDI, and a 10-second soak. New tools are added five a day from #52 (one a day for #51). [LEDGER.md](LEDGER.md) lists every manifesto and design homage already used, so none repeat.

MIT licence.
