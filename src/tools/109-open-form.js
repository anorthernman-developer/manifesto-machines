/*META
{"title": "Open Form", "deep": true, "category": "music theory", "date": "2026-11-07", "kicker": "MUSIC THEORY · NUMBERED MODULES CUED IN ANY ORDER DURING PERFORMANCE", "bpm": 92, "idea": "Open-form and mobile-score pieces give the performer a set of numbered musical modules to cue in any order. Here the modules sit in a crossword-style grid: each numbered cell maps to a behaviour with your samples (density, register, gesture). Cue by click, random next or sequence; hold a module or fire it as a one-shot. The form is assembled in performance.", "controls": "8 slots (module voices 1 to 6, pulse, bed); 10 numbered crossword modules; cue modes click / random / sequence; hold vs one-shot; BPM, key, scale, density, reverb; a giant crossword VJ view that fills as modules fire.", "how": "Press PLAY: modules wait to be cued. Click a numbered cell (or press its digit) to cue it. Press R for random next, S for sequence advance, H to toggle hold. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen crossword.", "fonts": "family=Libre+Franklin:wght@400;600;700&family=Playfair+Display:wght@600;700", "try": ["Cue modules 1, 4 and 7 in that order with HOLD on. Load six one-shots into the voices and let the crossword assemble a form.", "Set cue mode to RANDOM and density high: a mobile score that keeps surprising you.", "Hold module 3 (low register drone) while one-shotting 8 and 9 (scatter and call): a slow bed with bright events."], "manifesto": {"name": "Open-form pattern pieces: numbered modules cued in any order during performance", "short": "Open Form", "author": "Inspired by mid-20th-century open-form and mobile-score composition (modules the performer cues live)", "year": "1950s to 1970s", "where": "Concert music and later open-form practices", "ideas": ["In our words: a module is a self-contained musical behaviour the performer can start at any time.", "In our words: the order of modules is not fixed in advance; the form is assembled in performance.", "In our words: numbering modules like crossword clues makes the score readable at a glance.", "In our words: hold sustains a module; one-shot fires it once and moves on.", "In our words: shared key and scale hold the piece together while the surface stays open."], "quotes": [], "system": "Ten modules each map to a character (drone, pulse, scatter, call, hush, cascade, cluster, hang, tick, swell). Clicking a cell (or random/sequence cue) sets the active module. In hold mode the character keeps playing each step; in one-shot it plays for a short burst then clears. Shared key, scale, density and reverb apply. The canvas draws a crossword grid that fills black squares as modules fire.", "dubious": "Open form and mobile scores have a specific mid-century history; this tool is a small playful classroom reading of the idea, not a claim about any one composer's practice."}, "design": {"name": "Crossword grid: black-and-white numbered squares, across/down clues and newspaper typography", "short": "Crossword grid", "who": "Newspaper puzzle and crossword designers", "era": "Twentieth century to the present", "hallmarks": ["Black-and-white numbered squares in a symmetric grid.", "Across and down clue lists in compact newspaper type.", "Bold puzzle title and thin ruled borders on newsprint."], "works": ["Look up historic newspaper crossword pages in library archives", "Look up mid-century puzzle-book typography and grid design", "Search for classic crossword grid symmetry and numbering schemes"]}}
*/
/*CSS
:root{--bg:#f2efe6;--fg:#1a1a1a;--acc:#1a1a1a;--bar-bg:#1a1a1a;--bar-fg:#f2efe6;--bar-font:'Libre Franklin',sans-serif;--learn-font:'Libre Franklin',sans-serif;--learn-bg:#faf8f2;--deck-bg:#faf8f2;--head-font:'Playfair Display',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#f2efe6}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #1a1a1a;font:400 11.5px 'Libre Franklin';background:#faf8f2;color:#1a1a1a}
#side h3{font:700 14px 'Playfair Display';color:#1a1a1a;margin:12px 0 2px;border-bottom:1px solid #1a1a1a}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Libre Franklin'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 11px 'Libre Franklin';border:1.5px solid #1a1a1a;background:transparent;color:#1a1a1a;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#1a1a1a;color:#f2efe6}
#mm-learn-dlg h2{font:700 32px/1.05 'Playfair Display'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Open Form: a crossword grid of numbered musical modules you cue in any order"></canvas></div>
<div id="side"><div class="bt"><button id="b-r">R · RANDOM</button><button id="b-s">S · SEQUENCE</button><button id="b-h">H · HOLD TOGGLE</button></div><p style="margin:2px 0;opacity:.8">Click a numbered cell to cue that module. Digits 1 to 0 also work.</p>
<h3>Form</h3><div id="c0"></div><h3>Module</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const CHARS=['drone','pulse','scatter','call','hush','cascade','cluster','hang','tick','swell'];
const CLUES=['Sustained low bed','Steady grid hits','Short random grains','Four-note phrase','Quiet long pad','Descending plucks','Close stacked pitches','Long decaying hang','Soft metronome tick','Rising filtered swell'];
const st=MMX.bind({mode:'click',hold:true,dens:0.7,bpm:92,key:0,scale:'dorian',swing:0.05,rev:0.4,lv:0.9});
let N={},cv,mods=[],active=-1,seq=0,burstUntil=0,curStep=0,level=0,fired=new Set();
function makeMods(){// 5x5 crossword-like with 10 numbered white cells and black blockers
  const nums=[1,2,0,3,4, 0,5,6,0,7, 8,0,0,9,0, 0,10,0,0,0, 0,0,0,0,0];
  mods=nums.map((n,i)=>({n,char:n?CHARS[n-1]:null,clue:n?CLUES[n-1]:'',row:(i/5)|0,col:i%5,hit:0,filled:false}));}
makeMods();
function cue(n){const m=mods.find(x=>x.n===n);if(!m)return;active=n;m.filled=true;fired.add(n);burstUntil=st.hold?1e12:MM.now+4;MM.toast('Module '+n+': '+m.clue);if(!MM.playing)MMX.fire(Math.min(n-1,5),MM.now+0.02,{dur:0.5,dest:N.bus});}
function nextSeq(){seq=(seq%10)+1;cue(seq);}
function nextRand(){cue(1+((R()*10)|0));}
function playChar(ch,t,sd,s,n){const g=st.lv*st.dens,root=48+st.key,deg=()=>MM.deg((n%7)+pick([0,1,2,3]),st.scale,root)-48,slot=Math.min(n-1,5);
  if(ch==='drone'&&s===0)MMX.fire(slot,t,{semis:MM.deg(n%5,st.scale,root)-48,gain:g*0.5,dur:sd*14,maxDur:10,fadeIn:0.3,fadeOut:1,rev:st.rev,dest:N.bus,cut:1000});
  if(ch==='pulse'&&s%4===0)MMX.fire(6,t,{semis:deg(),gain:g*0.65,dur:sd*1.1,maxDur:0.45,dest:N.bus,pan:(s%8<4?-0.3:0.3)});
  if(ch==='scatter'&&R()<st.dens)MMX.fire(slot,t+R()*sd*0.7,{pos:R()*0.85,dur:0.06+R()*0.1,semis:(R()-0.5)*10,gain:g*0.4,dest:N.bus,pan:R()*2-1,cut:5000});
  if(ch==='call'&&s===0){for(let k=0;k<4;k++)MMX.fire(slot,t+k*sd,{semis:MM.deg((n%5)+k,st.scale,root)-48,gain:g*0.6,dur:sd*1.4,maxDur:0.7,rev:st.rev*0.7,dest:N.bus});}
  if(ch==='hush'&&s===0)MMX.fire(7,t,{semis:MM.deg(n%5,st.scale,root-12)-36,gain:g*0.3,dur:sd*16,maxDur:12,fadeIn:0.8,fadeOut:2,rev:st.rev*1.2,dest:N.bus,cut:700});
  if(ch==='cascade'&&s%2===0)MMX.fire(slot,t,{semis:MM.deg((n%5)+6-Math.floor(s/2),st.scale,root)-48,gain:g*0.5,dur:sd*1.6,maxDur:0.6,dest:N.bus});
  if(ch==='cluster'&&s%8===0){[0,1,2,3].forEach((k,q)=>MMX.fire(slot,t+q*0.02,{semis:MM.deg(n%5,st.scale,root)-48+k,gain:g*0.28,dur:sd*3.5,maxDur:1.8,rev:st.rev,dest:N.bus,pan:(q-1.5)*0.25}));}
  if(ch==='hang'&&s===0)MMX.fire(slot,t,{semis:deg(),gain:g*0.45,dur:sd*10,maxDur:5,fadeOut:2.5,rev:st.rev*1.3,dest:N.bus});
  if(ch==='tick'&&s%4===0)MMX.fire(6,t,{gain:g*0.3,dur:0.04,maxDur:0.08,dest:N.bus});
  if(ch==='swell'&&s===0)MMX.fire(7,t,{semis:MM.deg(n%7,st.scale,root)-48,gain:g*0.4,dur:sd*12,maxDur:8,fadeIn:1.5,fadeOut:2,rev:st.rev,dest:N.bus,cut:400+st.dens*8000});}
function step(i,t,sd){const s=i%16;curStep=s;if(active<0)return;if(!st.hold&&MM.now>burstUntil){active=-1;return;}
  const m=mods.find(x=>x.n===active);if(m){m.hit=performance.now();playChar(m.char,t,sd,s,m.n);}}
function lay(){const W=cv.w,H=cv.h,pad=20,n=5,cell=Math.min((Math.min(W,H*0.7)-pad*2)/n,56);return{W,H,pad,n,cell,gx:(W-n*cell)/2,gy:70};}
function draw(){cv.fit();const g=cv.g,L=lay(),{W,H,pad,n,cell,gx,gy}=L,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.15;
  const PAPER=vj?'#1a1a1a':'#f2efe6',INK=vj?'#f2efe6':'#1a1a1a',BLK=vj?'#f2efe6':'#1a1a1a',WHT=vj?'#1a1a1a':'#ffffff';
  g.fillStyle=PAPER;g.fillRect(0,0,W,H);
  g.fillStyle=INK;g.font=`700 ${Math.min(34,W*0.04)}px 'Playfair Display'`;g.fillText('OPEN FORM',pad,36);
  g.font="600 11px 'Libre Franklin'";g.fillStyle=INK;g.fillText(`CROSSWORD · ${NM[st.key]} ${st.scale.toUpperCase()} · ${st.mode.toUpperCase()} · ${st.hold?'HOLD':'ONE-SHOT'} · ACTIVE ${active>0?active:'—'}`,pad,54);
  mods.forEach((m,i)=>{const x=gx+m.col*cell,y=gy+m.row*cell;
    if(!m.n){g.fillStyle=BLK;g.fillRect(x,y,cell,cell);}
    else{const on=m.n===active,fl=on&&pn-m.hit<200;g.fillStyle=m.filled?(fl?INK:WHT):WHT;g.fillRect(x,y,cell,cell);g.strokeStyle=INK;g.lineWidth=on?3:1;g.strokeRect(x+0.5,y+0.5,cell-1,cell-1);
      g.fillStyle=on&&fl?WHT:INK;g.font=`700 ${cell*0.28}px 'Libre Franklin'`;g.fillText(String(m.n),x+4,y+cell*0.32);
      if(on){g.font=`600 ${cell*0.16}px 'Libre Franklin'`;g.fillText(m.char.slice(0,4).toUpperCase(),x+4,y+cell*0.7);}
    }
  });
  // clues
  g.fillStyle=INK;g.font="700 12px 'Playfair Display'";g.fillText('ACROSS / DOWN',pad,gy+5*cell+28);
  g.font="400 11px 'Libre Franklin'";CLUES.forEach((c,i)=>{const col=i<5?0:1,row=i%5;g.globalAlpha=fired.has(i+1)?1:0.55;g.fillText((i+1)+'. '+c,pad+col*(W/2-pad),gy+5*cell+48+row*16);g.globalAlpha=1;});}
function hit(x,y,ph){if(ph!=='down')return;const L=lay(),col=Math.floor((x-L.gx)/L.cell),row=Math.floor((y-L.gy)/L.cell);
  if(row>=0&&row<5&&col>=0&&col<5){const m=mods[row*5+col];if(m&&m.n)cue(m.n);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={};[0,1,2,3,4,5].forEach(i=>{const f0=130.81*Math.pow(2,i/8);FBS['v'+i]=()=>mk(1.4,t=>{let s=0;[1,1.25,1.5].forEach((h,q)=>s+=Math.sin(TAU*f0*h*t)*Math.exp(-t*(1+q*0.5)));return s*Math.min(1,t*60);});});
FBS.pulse=()=>mk(0.25,t=>Math.sin(TAU*90*t*Math.exp(-t*6))*Math.exp(-t*8)*Math.min(1,t*200));
FBS.bed=()=>{let lp=0;return mk(3.5,t=>{lp+=0.04*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/3.5)**1.2;});};
const cfg={bpm:92,div:4,get swing(){return st.swing;},step,draw,start:()=>{if(active<0){st.hold=true;cue(1);}burstUntil=1e12;},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:1.5,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='r')nextRand();else if(k==='s')nextSeq();else if(k==='h'){MMX.setParam('hold',!st.hold);MM.toast(st.hold?'HOLD':'ONE-SHOT');}
    else if(k>='1'&&k<='9')cue(+k);else if(k==='0')cue(10);},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Module voice 1','v0'],['Module voice 2','v1'],['Module voice 3','v2'],['Module voice 4','v3'],['Module voice 5','v4'],['Module voice 6','v5'],['Pulse / tick','pulse'],['Bed / hush','bed']].map(([label,kind],i)=>({label,kind,rv:i>=6?0.3:0.15,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});},onTrim:()=>{},onPreset:()=>{MM.bpm=st.bpm;},
      factory:fac(),extra:{get:()=>({active,fired:[...fired],filled:mods.map(m=>m.filled)}),set:x=>{if(!x)return;if(x.active!=null)active=x.active;if(x.fired)fired=new Set(x.fired);if(x.filled)mods.forEach((m,i)=>m.filled=!!x.filled[i]);}},
      keys:[['R','random next module'],['S','sequence next'],['H','toggle hold / one-shot'],['1 to 0','cue module 1 to 10'],['click','cue cell']],midiHelp:'Notes 36 to 47 set the key. Notes 60 to 69 cue modules 1 to 10. CC 1 density.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;if(on&&n>=60&&n<=69)cue(n-59);}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'mode',{type:'select',label:'Cue mode',options:[['click','Click'],['random','Random'],['sequence','Sequence']]});MMX.ctl(C[0],'hold',{type:'check',label:'Hold (else one-shot)'});MMX.ctl(C[0],'bpm',{label:'Tempo',min:60,max:140,step:1,on:v=>MM.bpm=v});MMX.ctl(C[0],'swing',{label:'Swing',min:0,max:0.35});
    MMX.ctl(C[1],'dens',{label:'Density',min:0.1,max:1,cc:1});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['dorian','Dorian'],['major','Major'],['minor','Minor'],['penta','Pentatonic'],['minpent','Minor pent'],['whole','Whole-tone']]});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-r').onclick=nextRand;MM.$('#b-s').onclick=nextSeq;MM.$('#b-h').onclick=()=>MMX.setParam('hold',!st.hold);}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Open crossword (default)':{},'Random mobile':P({mode:'random',hold:false,dens:0.85}),'Held sequence':P({mode:'sequence',hold:true,dens:0.55,bpm:80}),'Bright scatter':P({dens:1,rev:0.55,scale:'penta'}),'Slow hush form':P({bpm:64,dens:0.4,rev:0.7,hold:true})};}
MM.init(cfg);
