/*META
{"title": "Spatial Cut", "deep": true, "category": "art manifesto", "date": "2026-11-07", "kicker": "ART MANIFESTO · PIERCE AND OPEN SPACE SO SOUND OCCUPIES THE CUT", "bpm": 100, "idea": "The Technical Manifesto of Spatialism argued for piercing and opening the picture plane so art occupies the cut. Here you slash spectral and textural cuts through a sounding field: each gesture opens a notch (bandpass, gate or slice) on layered slots. Sound leaks through the holes; the gesture of the cut is the composition. Paraphrased only — nothing quoted.", "controls": "7 slots (field layers 1 to 4, pitched layer, grain, scrape); canvas you slash with pointer drag; cut depth, heal rate, number of cuts, density of leak; key and scale for pitched layers; a Letraset dry-transfer VJ view with letters and slash marks.", "how": "Press PLAY: a sounding field hums. Drag across the canvas to slash a cut; sound leaks through. Press X to clear cuts, H to heal faster for a moment, N for a new letter sheet. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen Letraset view.", "fonts": "family=Oswald:wght@500;600;700&family=Roboto+Mono:wght@400;500", "try": ["Slash three deep cuts across the field, set heal rate low, and raise leak density: a piece made only of openings.", "Load four field recordings into the layers. Slash short shallow cuts on the left and one deep cut on the right.", "Raise the pitched layer, snap to a key, and slash cuts that open only the mid band: melody through holes."], "manifesto": {"name": "Technical Manifesto of Spatialism: pierce and open space so art (and here sound) occupies the cut", "short": "Spatial Cut", "author": "Inspired by the Technical Manifesto of Spatialism (1947 to 1951) and the idea of cutting into the picture plane", "year": "1947 to 1951", "where": "Post-war European art and spatial research", "ideas": ["In our words: art can pierce the surface instead of only painting on it.", "In our words: a cut opens a space that the work then occupies.", "In our words: the gesture of cutting can be the composition itself.", "In our words: sound can leak through spectral notches the way light leaks through a cut canvas.", "In our words: healing and depth decide how long an opening lasts and how wide it is."], "quotes": [], "system": "A continuous field mixes four layered slots through a shared bus. Each slash stores a line segment with age, depth and a centre frequency derived from vertical position. Cuts drive bandpass notches and short gates on the field and trigger grain/scrape leaks along the cut. Heal rate ages cuts toward zero; when age expires the cut is removed. Cut depth scales Q and gain of the leak. Key/scale pitch a dedicated pitched layer when leak density is high.", "dubious": "The Technical Manifesto of Spatialism is a specific published text; this tool paraphrases the public idea of cutting into the plane only and does not reproduce any manifesto wording."}, "design": {"name": "Letraset dry-transfer sheet: rub-down letter sheets with grid guidelines, type specimens and transfer residue (1960s to 1980s graphic design)", "short": "Letraset dry-transfer", "who": "Dry-transfer lettering sheet designers", "era": "1960s to 1980s", "hallmarks": ["Gridded sheets of rub-down letterforms in a single typeface.", "Registration marks, sheet codes and transfer residue smudges.", "Pale blue guidelines and bold black specimen letters on translucent stock."], "works": ["Look up historic Letraset sheets in graphic-design museum collections", "Look up dry-transfer lettering catalogues and specimen pages", "Search for rub-down type sheets and transfer residue on layout boards"]}}
*/
/*CSS
:root{--bg:#e8e4dc;--fg:#1a1a1a;--acc:#2a5a9e;--bar-bg:#1a1a1a;--bar-fg:#e8e4dc;--bar-font:'Roboto Mono',monospace;--learn-font:'Roboto Mono',monospace;--learn-bg:#f4f1ea;--deck-bg:#f4f1ea;--head-font:'Oswald',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#e8e4dc}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #1a1a1a;font:400 11px 'Roboto Mono';background:#f4f1ea;color:#1a1a1a}
#side h3{font:600 14px 'Oswald';letter-spacing:.06em;color:#2a5a9e;margin:12px 0 2px;border-bottom:1px solid #1a1a1a}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Roboto Mono'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:600 11px 'Oswald';border:1.5px solid #1a1a1a;background:transparent;color:#1a1a1a;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#2a5a9e;color:#e8e4dc;border-color:#2a5a9e}
#mm-learn-dlg h2{font:600 34px/1.05 'Oswald'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Spatial Cut: a Letraset sheet you slash so sound leaks through the cuts"></canvas></div>
<div id="side"><div class="bt"><button id="b-x">X · CLEAR CUTS</button><button id="b-h">H · HEAL BURST</button><button id="b-n">N · NEW SHEET</button></div><p style="margin:2px 0;opacity:.8">Drag to slash. Sound leaks through each cut.</p>
<h3>Cut</h3><div id="c0"></div><h3>Field</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const LETTERS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const st=MMX.bind({depth:0.7,heal:0.25,leak:0.7,maxCuts:12,key:7,scale:'minor',rev:0.35,field:0.7,pitchG:0.55,grain:0.5,lv:0.95});
let N={},cv,cuts=[],drag=null,letters=[],level=0,healBurst=0,sheet=1,fieldNodes=[];
function newSheet(){letters=Array.from({length:48},(_,i)=>({ch:LETTERS[(R()*LETTERS.length)|0],x:0.08+R()*0.84,y:0.15+R()*0.7,rot:(R()-0.5)*0.4,used:R()<0.15}));sheet++;MM.toast('Sheet '+sheet);}
newSheet();
function addCut(x0,y0,x1,y1){const W=cv.w,H=cv.h,mx=(x0+x1)/2/W,my=(y0+y1)/2/H,len=Math.hypot(x1-x0,y1-y0);
  if(len<8)return;const freq=200+my*my*8000;cuts.push({x0:x0/W,y0:y0/H,x1:x1/W,y1:y1/H,age:1,depth:st.depth,freq,len:len/W,at:performance.now()});
  if(cuts.length>st.maxCuts)cuts.shift();
  // immediate leak burst
  const slot=(R()*4)|0;MMX.fire(slot,MM.now+0.01,{pos:mx*0.8,dur:0.15+st.depth*0.4,gain:st.lv*st.leak*0.8,cut:freq,rev:st.rev,dest:N.leak,pan:(mx-0.5)*1.4});
  if(st.pitchG>0.1){const midi=MM.deg(Math.round(my*7),st.scale,48+st.key);MMX.fire(4,MM.now+0.02,{semis:midi-48,gain:st.pitchG*st.lv*st.depth,dur:0.5+st.depth,maxDur:2,rev:st.rev,dest:N.leak,cut:freq});}
  MMX.fire(5,MM.now+0.015,{pos:R()*0.9,dur:0.08+R()*0.1,gain:st.grain*st.lv*0.6,dest:N.leak,pan:R()*2-1});
  MMX.fire(6,MM.now+0.02,{gain:st.depth*0.4*st.lv,dur:0.12,maxDur:0.25,dest:N.leak});}
function step(i,t,sd){const s=i%16;cuts=cuts.filter(c=>{c.age-=(0.004+st.heal*0.02+healBurst*0.05)*(0.5+0.5/Math.max(0.2,c.depth));return c.age>0.02;});
  if(healBurst>0)healBurst*=0.92;
  // continuous field layers
  if(s%2===0){for(let k=0;k<4;k++){if(R()>Math.max(0.55,st.field*0.85))continue;MMX.fire(k,t,{loop:false,dur:sd*6,gain:st.field*st.lv*0.35,fadeIn:0.04,fadeOut:0.25,rev:st.rev*0.6,dest:N.field,pan:(k/3)*1.2-0.6,cut:500+k*900});}}
  // leaks along living cuts
  cuts.forEach(c=>{if(R()>st.leak*c.age*0.5)return;const slot=(R()*4)|0,pos=(c.x0+c.x1)/2;
    MMX.fire(slot,t+R()*sd,{pos:clamp(pos+R()*0.1,0,0.95),dur:0.1+c.depth*0.35*c.age,gain:st.lv*st.leak*c.age*0.55,cut:c.freq*(0.8+R()*0.4),rev:st.rev,dest:N.leak,pan:(pos-0.5)*1.5});
    if(R()<st.pitchG*c.age*0.3){const midi=MM.deg(Math.round(c.y0*7)+((R()*3)|0),st.scale,48+st.key);MMX.fire(4,t,{semis:midi-48,gain:st.pitchG*c.age*st.lv*0.4,dur:sd*2,maxDur:1,rev:st.rev,dest:N.leak,cut:c.freq});}});
  // filter field by average cut depth
  const avg=cuts.length?cuts.reduce((s,c)=>s+c.depth*c.age,0)/cuts.length:0;N.hp.frequency.setTargetAtTime(80+avg*avg*6000,t,0.08);N.bp.frequency.setTargetAtTime(cuts.length?cuts[cuts.length-1].freq:1200,t,0.1);}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,pad=16,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.2;
  const SHEET=vj?'#1a1a1a':'#e8e4dc',INK=vj?'#e8e4dc':'#1a1a1a',BLUE=vj?'#6a9ad4':'#2a5a9e',GUIDE=vj?'#3a3a3a':'#b8d4f0';
  g.fillStyle=SHEET;g.fillRect(0,0,W,H);
  // guidelines
  g.strokeStyle=GUIDE;g.lineWidth=1;g.globalAlpha=0.5;for(let y=60;y<H-20;y+=28){g.beginPath();g.moveTo(pad,y);g.lineTo(W-pad,y);g.stroke();}g.globalAlpha=1;
  // registration marks
  [[pad,pad],[W-pad,pad],[pad,H-pad],[W-pad,H-pad]].forEach(([x,y])=>{g.strokeStyle=INK;g.lineWidth=1.5;g.beginPath();g.moveTo(x-8,y);g.lineTo(x+8,y);g.moveTo(x,y-8);g.lineTo(x,y+8);g.stroke();});
  g.fillStyle=INK;g.font=`600 ${Math.min(36,W*0.042)}px 'Oswald'`;g.fillText('SPATIAL CUT',pad+8,40);
  g.font="500 11px 'Roboto Mono'";g.fillStyle=BLUE;g.fillText(`LETRASET · SHEET ${String(sheet).padStart(3,'0')} · CUTS ${cuts.length}/${st.maxCuts} · ${NM[st.key]} ${st.scale.toUpperCase()} · LEAK ${st.leak.toFixed(2)}`,pad+8,56);
  // letters
  letters.forEach(L=>{const x=L.x*W,y=L.y*H;g.save();g.translate(x,y);g.rotate(L.rot);g.fillStyle=INK;g.globalAlpha=L.used?0.25:0.7+level*0.25;g.font=`600 ${Math.min(42,W*0.035)}px 'Oswald'`;g.fillText(L.ch,0,0);g.restore();g.globalAlpha=1;});
  // residue smudges
  g.fillStyle=INK;g.globalAlpha=0.06;for(let i=0;i<20;i++){g.beginPath();g.arc((i*97+40)%W,(i*53+80)%H,2+R()*3,0,TAU);g.fill();}g.globalAlpha=1;
  // cuts
  cuts.forEach(c=>{const x0=c.x0*W,y0=c.y0*H,x1=c.x1*W,y1=c.y1*H;g.strokeStyle=BLUE;g.globalAlpha=0.4+c.age*0.6;g.lineWidth=1+c.depth*6*c.age;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
    // tear edge
    g.strokeStyle=INK;g.lineWidth=1;g.globalAlpha=c.age*0.8;g.beginPath();g.moveTo(x0,y0-2);g.lineTo(x1,y1-2);g.stroke();g.beginPath();g.moveTo(x0,y0+2);g.lineTo(x1,y1+2);g.stroke();g.globalAlpha=1;});
  if(drag){g.strokeStyle=BLUE;g.lineWidth=2+st.depth*4;g.globalAlpha=0.8;g.beginPath();g.moveTo(drag.x0,drag.y0);g.lineTo(drag.x1,drag.y1);g.stroke();g.globalAlpha=1;}}
function hit(x,y,ph){if(ph==='down'){drag={x0:x,y0:y,x1:x,y1:y};}
  else if(ph==='move'&&drag){drag.x1=x;drag.y1=y;}
  else if((ph==='up'||ph==='leave')&&drag){addCut(drag.x0,drag.y0,drag.x1,drag.y1);// transfer residue: mark nearest letters used
    letters.forEach(L=>{const mx=((drag.x0+drag.x1)/2)/cv.w,my=((drag.y0+drag.y1)/2)/cv.h;if(Math.hypot(L.x-mx,L.y-my)<0.08)L.used=true;});drag=null;}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={};[0,1,2,3].forEach(i=>{FBS['f'+i]=()=>{let lp=0;const f=80+i*40;return mk(3,t=>{lp+=0.04*((Math.random()*2-1)-lp);return(lp+0.3*Math.sin(TAU*f*t))*Math.sin(Math.PI*t/3)**1.1;});};});
FBS.pit=()=>mk(1.5,t=>[1,1.25,1.5].reduce((s,h)=>s+Math.sin(TAU*196*h*t)*Math.exp(-t*(0.8+h*0.3)),0)*Math.min(1,t*50));
FBS.grain=()=>mk(0.4,t=>(Math.random()*2-1)*Math.exp(-t*12)*Math.min(1,t*200));
FBS.scrape=()=>mk(0.3,t=>(Math.sin(TAU*(200+t*3000)*t)+(Math.random()*2-1)*0.5)*Math.exp(-t*8)*Math.min(1,t*150));
const cfg={bpm:100,div:4,swing:0.03,step,draw,start:()=>{healBurst=0;if(!cuts.length){cuts.push({x0:0.2,y0:0.4,x1:0.8,y1:0.55,age:1,depth:0.7,freq:1400,len:0.6,at:performance.now()});}},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:2,dest:N.field});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='x'){cuts=[];MM.toast('Cuts cleared');}else if(k==='h'){healBurst=1;MM.toast('Heal burst');}else if(k==='n')newSheet();},
  setup(){MM.ensure();const c=MM.ctx;N.field=c.createGain();N.leak=c.createGain();N.hp=c.createBiquadFilter();N.hp.type='highpass';N.hp.frequency.value=80;N.bp=c.createBiquadFilter();N.bp.type='bandpass';N.bp.frequency.value=1200;N.bp.Q.value=2;
    N.field.connect(N.hp);N.hp.connect(N.bp);N.bp.connect(MM.out);N.leak.connect(MM.out);
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Field layer 1','f0'],['Field layer 2','f1'],['Field layer 3','f2'],['Field layer 4','f3'],['Pitched layer','pit'],['Grain','grain'],['Scrape','scrape']].map(([label,kind],i)=>({label,kind,rv:0.2,gain:i>=5?0.8:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:i<4?N.field:N.leak});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),extra:{get:()=>({cuts:cuts.map(c=>({x0:c.x0,y0:c.y0,x1:c.x1,y1:c.y1,age:c.age,depth:c.depth,freq:c.freq})),sheet}),set:x=>{if(x&&x.cuts)cuts=x.cuts.map(c=>Object.assign({len:0.1,at:performance.now()},c));if(x&&x.sheet)sheet=x.sheet;}},
      keys:[['X','clear all cuts'],['H','heal burst'],['N','new letter sheet'],['drag','slash a cut']],midiHelp:'Notes 36 to 47 set the key. CC 1 leak density, CC 2 cut depth.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'depth',{label:'Cut depth',min:0.1,max:1,cc:2});MMX.ctl(C[0],'heal',{label:'Heal rate',min:0,max:1});MMX.ctl(C[0],'leak',{label:'Leak density',min:0,max:1,cc:1});MMX.ctl(C[0],'maxCuts',{label:'Max cuts',min:3,max:24,step:1});
    MMX.ctl(C[1],'field',{label:'Field level',min:0,max:1.2});MMX.ctl(C[1],'grain',{label:'Grain',min:0,max:1});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['minor','Minor'],['major','Major'],['dorian','Dorian'],['penta','Pentatonic'],['minpent','Minor pent'],['whole','Whole-tone']]});MMX.ctl(C[2],'pitchG',{label:'Pitched layer',min:0,max:1.2});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-x').onclick=()=>{cuts=[];};MM.$('#b-h').onclick=()=>{healBurst=1;};MM.$('#b-n').onclick=newSheet;}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Slash field (default)':{},'Deep permanent cuts':P({depth:1,heal:0.05,leak:0.9,maxCuts:18}),'Fast heal sparks':P({depth:0.5,heal:0.9,leak:0.8}),'Pitched openings':P({pitchG:1,field:0.4,leak:0.75,scale:'penta'}),'Quiet scrape':P({field:0.35,grain:0.9,leak:0.45,rev:0.6})};}
MM.init(cfg);
