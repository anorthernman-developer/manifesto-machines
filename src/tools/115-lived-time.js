/*META
{"title": "Lived Time", "deep": true, "category": "nature/philosophy", "date": "2026-11-11", "kicker": "PHILOSOPHY · DURATION: CLOCK TIME AGAINST TIME AS IT IS LIVED", "bpm": 120, "idea": "A philosopher writing in Paris around 1900 argued that clock time, cut into equal units, is not the time we live. Lived time, which he called duration (durée), stretches and contracts with intensity, and each moment carries the whole past inside it. Lived Time puts two hands on one watch dial: a steady clock hand that ticks your sound, and a lived hand that speeds up when you lean in and slows when you let go, playing a melody that grows by remembering every note before it.", "controls": "6 slots (clock tick, lived voice, memory pad, pulse, chime, breath); clock tempo and tick level; lived base rate, stretch (how much attention bends it) and attention, which you can also hold with the mouse; memory length and how strongly the past is held; key and scale; melody seed; reverb and level; an enamel watch-dial VJ view.", "how": "Press PLAY: the clock hand ticks and the lived hand plays. Hold the mouse down on the dial (or press and hold A) to pay attention: lived time speeds up and the melody brightens. Let go and it slows. Press M to forget (clear the memory), T to switch the clock on or off, S to change the melody seed. Open the deck (D) to load your own sounds and trim each with the S and E handles. Press F for the full-screen dial.", "fonts": "family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Jost:wght@400;500", "try": ["Put a clock or metronome recording in slot 1 and a single sung note in slot 2. Hold the dial for ten seconds, then let go and listen to how the same melody feels at a different speed.", "Raise memory to the top and stretch to the middle. Leave it for two minutes: the pad slowly fills with everything the lived voice has played.", "Switch the clock off with T and perform only with attention, holding and releasing, as if breathing with the piece."], "manifesto": {"name": "Duration (durée): lived time as continuous, qualitative and cumulative, against measured clock time", "short": "Duration (durée)", "author": "Inspired by Henri Bergson's account of duration in his essay on time and free will (1889) and later works (public domain)", "year": "1889 to 1907", "where": "Paris", "ideas": ["In our words: clock time treats moments as identical units laid side by side, like points on a line. That is time turned into space.", "In our words: lived time is not made of separate units. It flows, and the same ten seconds can feel short or long depending on what fills them.", "In our words: each new moment carries the past with it, the way a melody's notes only make sense because you still hear the earlier ones.", "In our words: memory is not a filing cabinet. The past keeps growing and pressing into the present.", "In our words: to grasp duration you have to live it, not measure it. Listening is one way to do that."], "quotes": [], "system": "A fixed eighth-note grid drives two phase accumulators. The clock hand advances at the clock tempo and ticks slot 1 on each beat. The lived hand advances at the base rate times a factor set by attention and stretch; attention rises while you hold the dial and falls back slowly when you release. Each time the lived hand crosses a note boundary it plays the next note of its melody on slot 2. The melody grows by one note per cycle up to the memory length, generated from the seed in the chosen scale. Every note also feeds the memory pad (slot 3), where past notes keep sounding softly, weighted by how strongly the past is held. Pulse, chime and breath mark the lived hand's quarters and the slow intake of attention.", "dubious": "Bergson died in 1941 and his texts are in the public domain in the UK, but they are paraphrased here, not quoted. The musical system is our own interpretation, not his."}, "design": {"name": "Enamel watch dial: white grand-feu enamel, Breguet-style numerals, blued-steel hands, minute track and subsidiary dials (horology, 18th to 20th centuries)", "short": "Enamel watch dial", "who": "Watch-dial enamellers and dial painters", "era": "18th to 20th centuries", "hallmarks": ["Glossy white enamel with fine black railway minute track and small painted numerals.", "Blued-steel hands with moon tips and a small seconds sub-dial.", "Restraint: a few fine lines, centred lettering, much empty white."], "works": ["Look up 19th-century enamel pocket-watch dials in horological museum collections", "Search for Breguet-style numerals and moon-tipped hands", "Look up railway pocket-watch dials with a minute track"]}}
*/
/*CSS
:root{--bg:#f6f4ee;--fg:#1d1d24;--acc:#2a4c9a;--bar-bg:#1d1d24;--bar-fg:#f6f4ee;--bar-font:'Jost',sans-serif;--learn-font:'Jost',sans-serif;--learn-bg:#fbfaf6;--deck-bg:#fbfaf6;--head-font:'Cormorant Garamond',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#view{position:relative;overflow:hidden;background:#e7e3d8}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:grab}
#side{overflow:auto;padding:8px 14px 14px;border-left:1px solid #1d1d24;font:400 12px 'Jost';background:#fbfaf6;color:#1d1d24}
#side h3{font:italic 500 18px 'Cormorant Garamond';color:#2a4c9a;margin:12px 0 2px;border-bottom:1px solid #1d1d2433}
#side .mmx-ctl{grid-template-columns:100px 1fr 40px;font:400 12px 'Jost'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:500 11px 'Jost';letter-spacing:.06em;border:1px solid #1d1d24;border-radius:12px;background:transparent;color:#1d1d24;padding:5px 9px;cursor:pointer}#side .bt button:hover{background:#2a4c9a;color:#fbfaf6;border-color:#2a4c9a}
#mm-learn-dlg h2{font:700 38px/1.05 'Cormorant Garamond'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Lived Time: a white enamel watch dial with a steady clock hand and a lived hand that bends with your attention"></canvas></div>
<div id="side"><div class="bt"><button id="b-m">M · FORGET</button><button id="b-t">T · CLOCK</button><button id="b-s">S · NEW SEED</button></div><p style="margin:2px 0;opacity:.75">Hold the dial (or A) to pay attention.</p>
<h3>Clock time</h3><div id="c0"></div><h3>Lived time</h3><div id="c1"></div><h3>Memory</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const st=MMX.bind({clockBpm:60,tick:0.5,clockOn:true,base:2,stretch:0.7,attn:0.3,memLen:16,hold:0.6,key:0,scale:'lydian',seed:7,rev:0.45,lv:0.95});
let N={},cv,clockPh=0,livedPh=0,noteIdx=0,mel=[],memory=[],holding=false,keyHold=false,att=0.3,level=0,cycles=0,lastNote=null,trailA=[];
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647;}
function grow(){const r=rng((st.seed|0)*7919+mel.length*31+1);const prev=mel.length?mel[mel.length-1]:0;let d=prev+[-2,-1,-1,0,1,1,2,3][(r()*8)|0];if(d>9)d-=4;if(d<-2)d+=3;mel.push(d);if(mel.length>st.memLen)mel.shift();}
function forget(){mel=[];memory=[];noteIdx=0;grow();grow();MM.toast('Forgotten');}
function rate(){return st.base*(1+st.stretch*(att-0.4)*2.2);}// lived notes per second
function step(i,t,sd){const tgt=holding||keyHold?1:st.attn;att+=(tgt-att)*(tgt>att?0.08:0.015);
  // clock hand: beats per second = clockBpm/60
  const cp=clockPh+sd*st.clockBpm/60;if(Math.floor(cp)>Math.floor(clockPh)&&st.clockOn){const f=(Math.floor(cp)-clockPh)/(cp-clockPh);MMX.fire(0,t+f*sd,{gain:st.tick*st.lv*(Math.floor(cp)%4===0?1:0.6),maxDur:0.2,dest:N.bus,pan:-0.25});}clockPh=cp;
  // lived hand
  const r=Math.max(0.15,rate()),lp=livedPh+sd*r;if(Math.floor(lp)>Math.floor(livedPh)){const f=(Math.floor(lp)-livedPh)/(lp-livedPh),tt=t+f*sd;if(!mel.length)grow();
    const d=mel[noteIdx%mel.length],midi=MM.deg(d,st.scale,60+st.key);MMX.fire(1,tt,{semis:midi-48-12,gain:st.lv*(0.45+att*0.35),dur:Math.min(2.5,1.6/r),maxDur:2.5,fadeOut:0.2,rev:st.rev,cut:800+att*9000,pan:0.15,dest:N.bus});lastNote=d;
    memory.push({d,w:1});if(memory.length>64)memory.shift();
    if(noteIdx%4===0)MMX.fire(3,tt,{gain:st.lv*0.3*(0.5+att),maxDur:0.4,dest:N.bus});
    noteIdx++;if(noteIdx%mel.length===0){cycles++;grow();MMX.fire(4,tt,{semis:MM.deg(mel[0],st.scale,72+st.key)-48-12,gain:st.lv*0.35,maxDur:3,rev:st.rev*1.4,dest:N.bus});}}livedPh=lp;
  // memory pad: the past keeps sounding
  if(i%8===0&&memory.length&&st.hold>0.02){memory.forEach(m=>m.w*=0.9+st.hold*0.095);memory=memory.filter(m=>m.w>0.05);const pick=memory.slice(-Math.max(1,Math.round(1+st.hold*5)));
    pick.forEach((m,j)=>{const midi=MM.deg(m.d,st.scale,48+st.key);MMX.fire(2,t+j*0.05,{semis:midi-48,gain:st.lv*st.hold*0.25*m.w,dur:sd*10,maxDur:4,fadeIn:0.5,fadeOut:1,rev:st.rev*1.5,pan:Math.sin(j*1.3)*0.6,dest:N.pad});});}
  if(i%16===0&&att>0.6)MMX.fire(5,t,{gain:st.lv*(att-0.5)*0.6,maxDur:2,fadeIn:0.4,rev:0.3,dest:N.bus});}
function hand(g,cx,cy,a,len,w,col){g.save();g.translate(cx,cy);g.rotate(a);g.fillStyle=col;g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(0,len*0.15);g.lineTo(0,-len*0.72);g.stroke();g.beginPath();g.arc(0,-len*0.8,w*3,0,TAU);g.lineWidth=w*0.8;g.stroke();g.beginPath();g.moveTo(-w,-len*0.88);g.lineTo(0,-len);g.lineTo(w,-len*0.88);g.fill();g.restore();}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,vj=MMX.vjOn,lv=MMX.level();level+=(lv.rms-level)*0.15;
  g.fillStyle=vj?'#0f0f14':'#e7e3d8';g.fillRect(0,0,W,H);const cx=W/2,cy=H/2,Rr=Math.min(W,H)*0.43;
  // case and enamel
  g.fillStyle=vj?'#3a3a44':'#b9b2a0';g.beginPath();g.arc(cx,cy,Rr+14,0,TAU);g.fill();const gr=g.createRadialGradient(cx-Rr*0.3,cy-Rr*0.4,Rr*0.1,cx,cy,Rr);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#efebe0');g.fillStyle=gr;g.beginPath();g.arc(cx,cy,Rr,0,TAU);g.fill();
  // railway minute track
  g.strokeStyle='#1d1d24';g.lineWidth=0.8;g.beginPath();g.arc(cx,cy,Rr*0.92,0,TAU);g.stroke();g.beginPath();g.arc(cx,cy,Rr*0.87,0,TAU);g.stroke();
  for(let m=0;m<60;m++){const a=m/60*TAU;g.beginPath();g.moveTo(cx+Math.sin(a)*Rr*0.87,cy-Math.cos(a)*Rr*0.87);g.lineTo(cx+Math.sin(a)*Rr*(m%5?0.92:0.94),cy-Math.cos(a)*Rr*(m%5?0.92:0.94));g.lineWidth=m%5?0.8:1.6;g.stroke();}
  g.fillStyle='#1d1d24';g.textAlign='center';g.textBaseline='middle';g.font=`500 ${Rr*0.12}px 'Cormorant Garamond'`;for(let h=1;h<=12;h++){const a=h/12*TAU;g.fillText(String(h),cx+Math.sin(a)*Rr*0.74,cy-Math.cos(a)*Rr*0.74);}
  g.font=`italic 500 ${Rr*0.07}px 'Cormorant Garamond'`;g.fillText('Lived Time',cx,cy-Rr*0.38);g.font=`400 ${Rr*0.035}px 'Jost'`;g.fillText('DURÉE · '+NM[st.key]+' '+st.scale.toUpperCase(),cx,cy-Rr*0.3);
  // subsidiary dial: memory (each note a dot), at 6 o'clock
  const sx=cx,sy=cy+Rr*0.42,sr=Rr*0.2;g.lineWidth=0.8;g.beginPath();g.arc(sx,sy,sr,0,TAU);g.stroke();const n=Math.max(1,mel.length);
  mel.forEach((d,j)=>{const a=j/n*TAU,rr=sr*(0.35+((d+3)/14)*0.55);g.globalAlpha=j===(noteIdx-1+n)%n?1:0.55;g.beginPath();g.arc(sx+Math.sin(a)*rr,sy-Math.cos(a)*rr,j===(noteIdx-1+n)%n?3:1.8,0,TAU);g.fill();});g.globalAlpha=1;
  g.font=`400 ${Rr*0.03}px 'Jost'`;g.fillText('MEMORY '+mel.length+'/'+st.memLen,sx,sy+sr+Rr*0.05);
  // attention arc
  g.strokeStyle='#2a4c9a';g.lineWidth=3;g.beginPath();g.arc(cx,cy,Rr*0.97,-Math.PI/2,-Math.PI/2+att*TAU);g.stroke();
  // hands: clock (black) and lived (blued steel)
  hand(g,cx,cy,(clockPh%60)/60*TAU,Rr*0.82,1.6,'#1d1d24');hand(g,cx,cy,((livedPh/ Math.max(1,mel.length))%1)*TAU,Rr*0.7,2.4+level*4,'#2a4c9a');
  g.fillStyle='#1d1d24';g.beginPath();g.arc(cx,cy,5,0,TAU);g.fill();
  g.textBaseline='alphabetic';g.textAlign='left';g.fillStyle=vj?'#f6f4ee':'#1d1d24';g.font="400 12px 'Jost'";if(!vj){g.fillText(`CLOCK ${st.clockOn?st.clockBpm+' BPM':'OFF'} · LIVED ${rate().toFixed(2)} NOTES/S · ATTENTION ${att.toFixed(2)} · CYCLES ${cycles}`,16,H-16);}}
function hit(x,y,ph){if(ph==='down')holding=true;else if(ph==='up'||ph==='leave')holding=false;}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={tick:()=>mk(0.08,t=>(Math.sin(TAU*3200*t)*0.5+(Math.random()*2-1)*0.5)*Math.exp(-t*90)),
  voice:()=>mk(2.5,t=>{const f=261.6;return(Math.sin(TAU*f*t)+0.35*Math.sin(TAU*2*f*t+0.3)+0.15*Math.sin(TAU*3*f*t))*Math.min(1,t*25)*Math.exp(-t*1.1)*(1+0.04*Math.sin(TAU*5.5*t));}),
  pad:()=>mk(4,t=>[1,1.003,2.001].reduce((s,h)=>s+Math.sin(TAU*130.8*h*t),0)*Math.sin(Math.PI*t/4)),
  pulse:()=>mk(0.3,t=>Math.sin(TAU*(60*t+40*(1-Math.exp(-t*20))/20))*Math.exp(-t*9)),
  chime:()=>mk(3,t=>[1,2.0,3.01,4.2].reduce((s,h,j)=>s+Math.sin(TAU*523.3*h*t)*Math.exp(-t*(0.8+j))/(j+1),0)*Math.min(1,t*300)),
  breath:()=>{let lp=0;return mk(2,t=>{lp+=0.05*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/2)**2;});}};
const cfg={bpm:120,div:2,swing:0,step,draw,start:()=>{if(!mel.length){grow();grow();grow();}},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(1,MM.now+0.02,{maxDur:2,dest:N.bus});MMX.fire(0,MM.now+0.05,{maxDur:2,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='m')forget();else if(k==='t'){st.clockOn=!st.clockOn;MMX.refresh&&MMX.refresh();MM.toast('Clock '+(st.clockOn?'on':'off'));}else if(k==='s'){st.seed=(st.seed|0)+1;mel=[];grow();grow();MMX.refresh&&MMX.refresh();MM.toast('Seed '+st.seed);}else if(k==='a'){keyHold=true;}},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.pad=c.createGain();N.bus.connect(MM.out);N.pad.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    addEventListener('keyup',e=>{if(e.key.toLowerCase()==='a')keyHold=false;});
    MMX.init({state:st,slots:[['Clock tick','tick'],['Lived voice','voice'],['Memory pad','pad'],['Pulse','pulse'],['Chime','chime'],['Breath','breath']].map(([label,kind],i)=>({label,kind,rv:i===2?0.4:0.1,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),extra:{get:()=>({mel:mel.slice()}),set:x=>{if(x&&Array.isArray(x.mel)&&x.mel.length)mel=x.mel.slice();}},
      keys:[['hold A','pay attention (lived time speeds up)'],['M','forget: clear memory'],['T','clock on or off'],['S','new melody seed'],['hold mouse','pay attention on the dial']],
      midiHelp:'Notes 36 to 47 set the key. Hold any note from 48 up to pay attention. CC 1 attention, CC 2 stretch.',midi:(n,v,on)=>{if(n>=36&&n<48&&on)st.key=n-36;else if(n>=48)keyHold=on;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'clockOn',{type:'check',label:'Clock on'});MMX.ctl(C[0],'clockBpm',{label:'Clock BPM',min:30,max:160,step:1});MMX.ctl(C[0],'tick',{label:'Tick level',min:0,max:1.2});
    MMX.ctl(C[1],'base',{label:'Base rate',min:0.5,max:6,step:0.05});MMX.ctl(C[1],'stretch',{label:'Stretch',min:0,max:1,cc:2});MMX.ctl(C[1],'attn',{label:'Resting attention',min:0,max:1,cc:1});MMX.ctl(C[1],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[1],'scale',{type:'select',label:'Scale',options:[['lydian','Lydian'],['major','Major'],['dorian','Dorian'],['minor','Minor'],['penta','Pentatonic'],['whole','Whole-tone']]});
    MMX.ctl(C[2],'memLen',{label:'Memory length',min:3,max:48,step:1});MMX.ctl(C[2],'hold',{label:'Hold the past',min:0,max:1});MMX.ctl(C[2],'seed',{label:'Melody seed',min:1,max:99,step:1,on:()=>{mel=[];grow();grow();}});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.9});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-m').onclick=forget;MM.$('#b-t').onclick=()=>{st.clockOn=!st.clockOn;MMX.refresh&&MMX.refresh();};MM.$('#b-s').onclick=()=>{st.seed=(st.seed|0)+1;mel=[];grow();grow();MMX.refresh&&MMX.refresh();};}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Two hands (default)':{},'Only lived time':P({clockOn:false,stretch:0.9,hold:0.8}),'Long memory':P({memLen:40,hold:0.95,base:1.4,rev:0.6}),'Anxious clock':P({clockBpm:132,tick:0.9,base:3.5,stretch:0.4,scale:'whole'}),'Slow afternoon':P({base:0.8,clockBpm:40,attn:0.1,scale:'penta'})};}
MM.init(cfg);
