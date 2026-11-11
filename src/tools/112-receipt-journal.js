/*META
{"title": "Receipt Journal", "deep": true, "category": "found-sound production", "date": "2026-11-11", "kicker": "FOUND-SOUND PRODUCTION · A DIARY OF PHONE AUDIO, CHOPPED, BUILT AND DROPPED", "bpm": 132, "idea": "Some found-audio dance producers treat the phone as a diary: a voice memo, a clip from a bus, a chord hummed into the mic. Receipt Journal prints each day's entries like a till receipt. Your memo is cut into eight emotional chops that follow a four-chord progression over garage or house drums, with your field recording as the bed, and every cycle walks MEMO, BUILD, GAP and DROP.", "controls": "8 slots (voice memo, phone clip, field recording, chord memo, kick, clap, hat, riser); chop count, chop pattern density and emotion (pitch lift and stutter); four-chord progression in any key and scale; MEMO, BUILD and DROP lengths in bars and a silent GAP; groove (2-step, 4x4 house, broken), swing, bed level; a thermal-receipt VJ view.", "how": "Press PLAY: the cycle starts with the memo over the field bed, builds and drops. Press B to jump to the build, G to toggle the gap, R to reprint (new chop pattern), 1 to 4 to audition a chop. Open the deck (D) to load your own memo into slot 1 and trim it with the S and E handles. Press F for the full-screen receipt view.", "fonts": "family=VT323&family=Space+Mono:wght@400;700", "try": ["Load a voice note of yourself talking into slot 1 and trim S and E around the one sentence that matters. Raise emotion and let the chops sing it back over the drop.", "Put a rain or bus recording in slot 3, set MEMO to 8 bars and BUILD to 4, and leave the gap on: the silence before the drop is the point.", "Hum four chords into slot 4 (one take is enough), pick the key you hummed in, and let the chord memo play the progression under the chops."], "manifesto": {"name": "Found-sound production: the phone as a diary, chopped into emotional vocal hooks over house and garage, building to a euphoric drop", "short": "Receipt Journal", "author": "Inspired by contemporary found-audio dance producers' voice-memo and journal-sampling methods (no quotes, no copied patterns or audio)", "year": "2010s to 2020s, from older sampling and club traditions", "where": "UK and international club music made on laptops and phones", "ideas": ["In our words: the phone is a notebook. Anything recorded on an ordinary day can become the centre of a track.", "In our words: a vocal chop is a few syllables cut from speech and replayed in rhythm, often pitched up so it sounds like longing.", "In our words: the field recording stays underneath as a bed, so the listener can hear where and when the memo was made.", "In our words: tension comes from withholding. A build lifts the filter and tightens the drums, a short silence holds your breath, and the drop releases everything at once.", "In our words: the result works like a diary entry you can dance to: small, personal sounds made large."], "quotes": [], "system": "A sixteen-step scheduler runs a cycle of MEMO, BUILD and DROP sections measured in bars. Slot 1 is cut into N equal chops; a chop pattern (regenerated with R) places chops on the grid, and each chop is pitched to a tone of the current chord. Emotion raises chop pitch, adds stutters and opens the filter. During BUILD the riser plays, snares roll and a master low-pass opens; the optional GAP silences the last beat; the DROP brings full drums, sub-weight chord memo stabs and the densest chop pattern. Every event is printed as a line on the receipt.", "dubious": "This is a general description of a widely used way of working. No producer's track, pattern or audio is copied."}, "design": {"name": "Thermal till receipt: narrow monospaced print, dotted rules, line items, totals, barcodes and fading thermal ink (shop receipts, 1990s to now)", "short": "Thermal till receipt", "who": "Anonymous point-of-sale printing", "era": "1990s to now", "hallmarks": ["A narrow paper column with monospaced dot-matrix or thermal type.", "Line items with right-aligned figures, dashed rules, totals and a barcode at the foot.", "Faded grey-black ink on curling off-white paper, with tear-off zigzag edges."], "works": ["Look up thermal receipt printers and their sample print-outs", "Search for receipt-poetry and receipt-art projects", "Look up the design of supermarket till receipts in design-history collections"]}}
*/
/*CSS
:root{--bg:#d9d6cf;--fg:#222;--acc:#222;--bar-bg:#222;--bar-fg:#f7f5ef;--bar-font:'Space Mono',monospace;--learn-font:'Space Mono',monospace;--learn-bg:#f7f5ef;--deck-bg:#f7f5ef;--head-font:'VT323',monospace}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#view{position:relative;overflow:hidden;background:#d9d6cf}#cv{position:absolute;inset:0;width:100%;height:100%}
#side{overflow:auto;padding:8px 14px 14px;border-left:1px dashed #222;font:400 11px 'Space Mono';background:#f7f5ef;color:#222}
#side h3{font:400 20px 'VT323';letter-spacing:.08em;margin:10px 0 2px;border-bottom:1px dashed #222}
#side .mmx-ctl{grid-template-columns:100px 1fr 40px;font:400 11px 'Space Mono'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 11px 'Space Mono';border:1px solid #222;background:transparent;color:#222;padding:5px 7px;cursor:pointer}#side .bt button:hover{background:#222;color:#f7f5ef}
#mm-learn-dlg h2{font:400 44px/1 'VT323'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Receipt Journal: a thermal till receipt printing every chop, build and drop as line items"></canvas></div>
<div id="side"><div class="bt"><button id="b-b">B · BUILD NOW</button><button id="b-g">G · GAP</button><button id="b-r">R · REPRINT</button></div><p style="margin:2px 0;opacity:.75">1 to 4 audition chops. Load your memo into slot 1.</p>
<h3>CHOPS</h3><div id="c0"></div><h3>CHORDS</h3><div id="c1"></div><h3>SECTIONS</h3><div id="c2"></div><h3>GROOVE</h3><div id="c3"></div><h3>MIX</h3><div id="c4"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const PROG={'i-VI-III-VII':[0,5,2,6],'i-iv-VI-V':[0,3,5,4],'I-V-vi-IV':[0,4,5,3],'vi-IV-I-V':[5,3,0,4],'i-VII-VI-VII':[0,6,5,6]};
const GR={'2step':{k:[0,10],c:[4,12],h:[2,6,10,14]},house:{k:[0,4,8,12],c:[4,12],h:[2,6,10,14]},broken:{k:[0,7,10],c:[4,12],h:[2,5,9,13,15]}};
const st=MMX.bind({chops:8,dens:0.55,emo:0.5,prog:'i-VI-III-VII',key:9,scale:'minor',memoBars:4,buildBars:2,dropBars:8,gap:true,groove:'2step',swing:0.1,bed:0.45,chordG:0.5,drums:0.9,rev:0.3,lv:0.95});
let N={},cv,pat=[],lines=[],bar=0,sec='MEMO',secBar=0,forceBuild=false,itemNo=0,total=0,level=0,lastStep=0,barOff=0;
function reprint(){pat=Array.from({length:16},(_,k)=>R()<0.25+st.dens*0.6||k===0?((R()*st.chops)|0):-1);print('REPRINT · NEW CHOP PATTERN','');}
function print(a,b){itemNo++;lines.push({no:itemNo,a,b,t:performance.now()});if(lines.length>80)lines.shift();}
function chordTones(b){const deg=PROG[st.prog][b%4];return[0,2,4].map(o=>MM.deg(deg+o,st.scale,48+st.key)-48);}
function section(){const L=[st.memoBars,st.buildBars,st.dropBars],tot=L[0]+L[1]+L[2];let c=bar%tot;if(c<L[0])return['MEMO',c,L[0]];c-=L[0];if(c<L[1])return['BUILD',c,L[1]];return['DROP',c-L[1],L[2]];}
function chop(ci,t,o={}){const n=st.chops;MMX.fire(0,t,Object.assign({pos:ci/n,dur:Math.max(0.06,0.9*(1/n)*(MMX.region(0).len||1)),gain:st.lv*0.85,rev:st.rev,dest:N.mix,fadeOut:0.02},o));}
function step(i,t,sd){const s=i%16;lastStep=s;if(s===0){bar=Math.floor(i/16)+barOff;if(forceBuild){const L=st.memoBars+st.buildBars+st.dropBars,tg=Math.floor(bar/L)*L+st.memoBars+(bar%L>=st.memoBars?L:0);barOff+=tg-bar;bar=tg;forceBuild=false;}const p=section();if(p[0]!==sec&&p[1]===0)print('--- '+p[0]+' ---',p[2]+' BAR'+(p[2]>1?'S':''));sec=p[0];secBar=p[1];}
  const [S0,b,L]=[sec,secBar,section()[2]],G=GR[st.groove],ch=chordTones(bar),sw=(s%2)?sd*st.swing*2:0,tt=t+sw,prog=(b+s/16)/Math.max(1,L);
  const inGap=S0==='BUILD'&&st.gap&&b===L-1&&s>=12;if(inGap){N.lp.frequency.setTargetAtTime(400,t,0.02);return;}
  // master filter shape
  const cut=S0==='MEMO'?900+st.emo*1500:S0==='BUILD'?600+prog*prog*14000:18000;N.lp.frequency.setTargetAtTime(cut,t,S0==='DROP'&&b===0&&s===0?0.005:0.08);
  // field bed
  if(s===0&&b%2===0)MMX.fire(2,t,{dur:sd*32,maxDur:12,gain:st.bed*st.lv*(S0==='DROP'?0.6:1),fadeIn:0.3,fadeOut:0.6,rev:0.2,dest:N.bed});
  // drums
  const dr=st.drums*st.lv,full=S0==='DROP',memo=S0==='MEMO';
  if(!memo||b>=st.memoBars-1){if(G.k.includes(s)&&(full||S0==='BUILD'&&s===0||memo&&s===0))MMX.fire(4,tt,{gain:dr,maxDur:0.5,dest:N.dr});
    if(G.c.includes(s)&&!memo)MMX.fire(5,tt,{gain:dr*0.75,maxDur:0.3,rev:0.12,dest:N.dr});
    if(S0==='BUILD'){const roll=prog>0.5?1:prog>0.25?2:4;if(s%roll===0)MMX.fire(5,tt,{gain:dr*(0.25+prog*0.5),maxDur:0.15,dest:N.dr});}
    if(G.h.includes(s)||full&&s%2===0)MMX.fire(6,tt,{gain:dr*(s%4===2?0.55:0.3),maxDur:0.12,dest:N.dr,pan:0.2});}
  // riser
  if(S0==='BUILD'&&b===0&&s===0){const d=sd*16*L;MMX.fire(7,t,{dur:d,maxDur:d,loop:true,gain:st.lv*0.5,fadeIn:d*0.8,fadeOut:0.05,semis:0,dest:N.mix});print('RISER',(d).toFixed(1)+'s');}
  // chord memo
  if(s===0&&(S0!=='BUILD')){ch.forEach((sm,k)=>MMX.fire(3,t,{semis:sm,dur:sd*(full?3:14),maxDur:4,gain:st.chordG*st.lv*(k?0.45:0.6),rev:st.rev,dest:N.mix,pan:(k-1)*0.4}));print('CHORD '+NM[(st.key+ch[0]+120)%12],'x1');}
  if(full&&(s===6||s===11))ch.slice(0,2).forEach(sm=>MMX.fire(3,tt,{semis:sm,dur:sd*1.5,gain:st.chordG*st.lv*0.35,dest:N.mix}));
  // chops
  const ci=pat[s];const want=memo?(s%4===0):S0==='BUILD'?(prog>0.6||s%2===0):true;
  if(ci>=0&&want&&R()<0.5+st.dens*0.5){const lift=Math.round(st.emo*(full?12:5)),sm=ch[ci%3]+(R()<st.emo*0.4?12:0)+lift*(full?1:0)-((ch[0]>6)?12:0);
    chop(ci,tt,{semis:memo?ch[ci%3]-(ch[0]>6?12:0):sm,pan:(ci/st.chops-0.5)*0.8});total+=1;print('CHOP '+String(ci+1).padStart(2,'0'),(sm>=0?'+':'')+sm+'st');
    if(full&&R()<st.emo*0.5)chop(ci,tt+sd/2,{semis:sm,gain:st.lv*0.45});}
  if(memo&&s===8&&b===0){MMX.fire(1,t,{maxDur:3,gain:st.lv*0.7,rev:st.rev*1.5,dest:N.mix,pan:-0.3});print('PHONE CLIP','1');}
  if(full&&b===0&&s===0){print('*** DROP ***','');}}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,vj=MMX.vjOn,lv=MMX.level();level+=(lv.rms-level)*0.25;
  const BG=vj?'#111':'#d9d6cf',PAP=vj?'#f7f5ef':'#f7f5ef',INK='#222';g.fillStyle=BG;g.fillRect(0,0,W,H);
  const pw=vj?Math.min(W*0.5,560):Math.min(W*0.62,420),px=(W-pw)/2,fs=vj?22:15,lh=fs*1.05;
  g.save();g.translate(px,0);g.fillStyle=PAP;g.beginPath();g.moveTo(0,0);g.lineTo(pw,0);let y=H-14;g.lineTo(pw,y);for(let x=pw;x>0;x-=10){g.lineTo(x-5,y+8);g.lineTo(x-10,y);}g.closePath();g.fill();
  g.fillStyle=INK;g.font=`400 ${fs*2}px 'VT323'`;g.textAlign='center';g.fillText('RECEIPT JOURNAL',pw/2,fs*2.2);g.font=`400 ${fs}px 'VT323'`;
  const d=new Date();g.fillText(d.toLocaleDateString('en-GB')+'  '+d.toLocaleTimeString('en-GB').slice(0,5)+'  TILL 112',pw/2,fs*3.3);
  g.fillText(`${NM[st.key]} ${st.scale.toUpperCase()} · ${st.prog} · ${Math.round(MM.bpm)} BPM`,pw/2,fs*4.4);
  const dash=y0=>{g.fillText('-'.repeat(Math.floor(pw/(fs*0.45))),pw/2,y0);};dash(fs*5.4);
  // section bar
  g.textAlign='left';const secs=[['MEMO',st.memoBars],['BUILD',st.buildBars],['DROP',st.dropBars]],tot=st.memoBars+st.buildBars+st.dropBars;let sx=12;
  secs.forEach(([n,b])=>{const w=(pw-24)*b/tot;g.globalAlpha=n===sec?1:0.25;g.fillRect(sx,fs*6,w-3,fs*0.7);g.globalAlpha=1;g.fillText(n,sx,fs*7.6);sx+=w;});
  // pattern row
  for(let k=0;k<16;k++){const x=12+k*(pw-24)/16;g.globalAlpha=k===lastStep?1:0.5;g.fillText(pat[k]>=0?String(pat[k]+1):'.',x,fs*8.8);}g.globalAlpha=1;dash(fs*9.7);
  // items (newest at bottom, fading upward like thermal ink)
  const foot=H-fs*7,top=fs*10.8,rows=Math.floor((foot-top)/lh),show=lines.slice(-rows);
  show.forEach((L,k)=>{const yy=top+k*lh,age=(show.length-k)/rows;g.globalAlpha=clamp(1.1-age*0.75,0.15,1);g.textAlign='left';g.fillText(String(L.no).padStart(4,'0')+'  '+L.a,12,yy);g.textAlign='right';g.fillText(L.b,pw-12,yy);});g.globalAlpha=1;
  g.textAlign='center';dash(foot+fs*0.4);g.textAlign='left';g.fillText('CHOPS PRINTED',12,foot+fs*1.5);g.textAlign='right';g.fillText(String(total),pw-12,foot+fs*1.5);g.textAlign='left';g.fillText('SECTION',12,foot+fs*2.6);g.textAlign='right';g.fillText(sec+' '+(secBar+1),pw-12,foot+fs*2.6);
  // barcode, thickens with level
  let bx=24;const by=foot+fs*3.3,bh=fs*2.2;for(let k=0;k<60&&bx<pw-24;k++){const w=1+((k*7+itemNo)%4)*(1+level*3);if(k%2===0)g.fillRect(bx,by,w,bh);bx+=w+1;}
  g.restore();if(sec==='DROP'&&vj){g.fillStyle=`rgba(247,245,239,${clamp(level*1.5,0,0.25)})`;g.fillRect(0,0,W,H);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={memo:()=>mk(2.4,t=>{const syl=Math.floor(t*3.3),f=[220,247,262,294,247,220,196,220][syl%8],env=Math.sin(Math.PI*((t*3.3)%1))**0.6;let v=0;for(let h=1;h<7;h++)v+=Math.sin(TAU*f*h*t)*(h===2||h===3?0.6:0.3)/h;return v*env*(0.9+0.1*Math.sin(TAU*5*t));}),
  clip:()=>mk(1.5,t=>(Math.random()*2-1)*0.3*Math.exp(-t*2)+Math.sin(TAU*660*t)*Math.exp(-t*5)*0.5),
  field:()=>{let lp=0;return mk(6,t=>{lp+=0.02*((Math.random()*2-1)-lp);return lp*3+(Math.random()<0.0008?Math.random()-0.5:0)+0.08*Math.sin(TAU*110*t)*Math.sin(TAU*0.2*t);});},
  chord:()=>mk(3,t=>[1,2,3,4].reduce((s,h)=>s+Math.sin(TAU*130.8*h*t+Math.sin(TAU*2*t)*0.3)/h,0)*Math.min(1,t*20)*Math.exp(-t*0.5)),
  kick:()=>mk(0.5,t=>Math.sin(TAU*(45*t+90*(1-Math.exp(-t*30))/30))*Math.exp(-t*7)),
  clap:()=>mk(0.3,t=>(Math.random()*2-1)*(Math.exp(-t*30)+0.5*Math.exp(-((t-0.012)**2)*4e5)+0.4*Math.exp(-((t-0.024)**2)*4e5))),
  hat:()=>mk(0.12,t=>(Math.random()*2-1)*Math.exp(-t*45)),
  riser:()=>mk(4,t=>((Math.random()*2-1)*0.5+Math.sin(TAU*(200*t+150*t*t))*0.5)*Math.min(1,t/3.5))};
const cfg={bpm:132,div:4,swing:0,step,draw,start:()=>{bar=0;barOff=0;sec='';print('TRANSACTION START','');},stop:()=>print('TRANSACTION END',String(total)),
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:3,dest:N.mix});print('NEW SOUNDS',String(list.length));},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='b'){forceBuild=true;MM.toast('Build next bar');}else if(k==='g'){st.gap=!st.gap;MMX.refresh&&MMX.refresh();MM.toast('Gap '+(st.gap?'on':'off'));}else if(k==='r')reprint();else if('1234'.includes(k)){MM.ensure();chop(+k-1,MM.now+0.01,{});}},
  setup(){MM.ensure();const c=MM.ctx;N.mix=c.createGain();N.dr=c.createGain();N.bed=c.createGain();N.lp=c.createBiquadFilter();N.lp.type='lowpass';N.lp.frequency.value=2000;N.lp.Q.value=0.9;
    N.mix.connect(N.lp);N.bed.connect(N.lp);N.dr.connect(N.lp);N.lp.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Voice memo (chopped)','memo'],['Phone clip','clip'],['Field recording (bed)','field'],['Chord memo','chord'],['Kick','kick'],['Clap','clap'],['Hat','hat'],['Riser','riser']].map(([label,kind],i)=>({label,kind,rv:i===0?0.15:0.05,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.mix});},onTrim:()=>{},onPreset:()=>reprint(),
      factory:fac(),extra:{get:()=>({pat}),set:x=>{if(x&&Array.isArray(x.pat))pat=x.pat.slice(0,16);}},
      keys:[['B','jump to the build'],['G','gap on or off'],['R','reprint: new chop pattern'],['1-4','audition chops 1 to 4']],midiHelp:'Notes 36 to 43 trigger chops 1 to 8. CC 1 emotion, CC 2 chop density.',midi:(n,v,on)=>{if(on&&n>=36&&n<44){chop(n-36,MM.now+0.005,{gain:v/127});}}});
    MMX.vj('#view');const C=[0,1,2,3,4].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'chops',{label:'Chops',min:4,max:16,step:1});MMX.ctl(C[0],'dens',{label:'Density',min:0,max:1,cc:2});MMX.ctl(C[0],'emo',{label:'Emotion',min:0,max:1,cc:1});
    MMX.ctl(C[1],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[1],'scale',{type:'select',label:'Scale',options:[['minor','Minor'],['major','Major'],['dorian','Dorian'],['phrygian','Phrygian']]});MMX.ctl(C[1],'prog',{type:'select',label:'Progression',options:Object.keys(PROG).map(k=>[k,k])});MMX.ctl(C[1],'chordG',{label:'Chord memo',min:0,max:1.2});
    MMX.ctl(C[2],'memoBars',{label:'MEMO bars',min:1,max:16,step:1});MMX.ctl(C[2],'buildBars',{label:'BUILD bars',min:1,max:8,step:1});MMX.ctl(C[2],'dropBars',{label:'DROP bars',min:2,max:32,step:1});MMX.ctl(C[2],'gap',{type:'check',label:'Silent gap'});
    MMX.ctl(C[3],'groove',{type:'select',label:'Groove',options:[['2step','2-step garage'],['house','4x4 house'],['broken','Broken beat']]});MMX.ctl(C[3],'swing',{label:'Swing',min:0,max:0.3});MMX.ctl(C[3],'drums',{label:'Drums',min:0,max:1.3});
    MMX.ctl(C[4],'bed',{label:'Field bed',min:0,max:1.2});MMX.ctl(C[4],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[4],'lv',{label:'Level',min:0,max:1.5});
    MM.$('#b-b').onclick=()=>{forceBuild=true;};MM.$('#b-g').onclick=()=>{st.gap=!st.gap;MMX.refresh&&MMX.refresh();};MM.$('#b-r').onclick=reprint;reprint();}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Diary garage (default)':{},'Quick drop':P({memoBars:2,buildBars:1,dropBars:4,emo:0.8}),'House confession':P({groove:'house',prog:'vi-IV-I-V',scale:'major',key:0,emo:0.65}),'Long memo, no drums':P({memoBars:16,drums:0,bed:0.9,dens:0.3}),'Broken diary':P({groove:'broken',swing:0.2,chops:12,dens:0.8})};}
MM.init(cfg);
