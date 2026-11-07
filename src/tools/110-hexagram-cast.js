/*META
{"title": "Hexagram Cast", "deep": true, "category": "nature/philosophy", "date": "2026-11-07", "kicker": "NATURE / PHILOSOPHY · SIX LINES CAST BECOME A HEXAGRAM THAT RESHAPES THE PIECE", "bpm": 88, "idea": "The I Ching (Book of Changes) casts six lines — solid or broken, some changing — to form a hexagram. Here those lines rewrite density, scale degree, loop length and mute pattern. Changing lines flip parameters over time. An oracle that composes with you: cast, listen, cast again.", "controls": "7 slots (voices 1 to 6, ground bed); CAST button (and key C); hexagram display with changing lines; cast chaos vs stickiness; tempo, reverb, levels; mapping documented in LEARN; a weather-map isobar VJ view that morphs with the cast.", "how": "Press PLAY then C (or CAST) to throw six coins. Read the hexagram number and changing lines; dens, degree, lengths and mutes update. Raise CHAOS for wilder remaps, STICKINESS to hold longer between casts. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen isobar chart.", "fonts": "family=Cormorant+Garamond:wght@500;600;700&family=Source+Sans+3:wght@400;600", "try": ["Cast once, leave stickiness high, and listen for a minute before casting again.", "Set chaos high and cast every eight bars: the isobars and the music keep rewriting.", "Mute three voices via a cast that yields many broken lines, then load field recordings into the open voices."], "manifesto": {"name": "The I Ching (Book of Changes): six lines cast become a hexagram that reshapes the piece", "short": "Hexagram Cast", "author": "Inspired by the I Ching (Book of Changes), the classical Chinese oracle of solid and broken lines", "year": "Zhou dynasty origins; continuous tradition", "where": "Classical Chinese thought and later creative uses of chance operations", "ideas": ["In our words: six lines, solid or broken, form a hexagram that can be read as a situation.", "In our words: changing lines mark places where the situation is turning into another.", "In our words: casting is a chance operation that the musician can accept as compositional material.", "In our words: mapping lines to density, degree, length and mute makes the oracle audible.", "In our words: chaos and stickiness decide how often and how far the piece rewrites itself."], "quotes": [], "system": "MAPPING: each line is 6/7/8/9 from three coins (tails=2, heads=3). Solid (7,9) vs broken (6,8); changing if 6 or 9. Hexagram number (1 to 64) from the six binary lines sets a scale-degree offset (n % 7) and a density base (0.3 + (n%10)*0.06). Each broken line mutes one of the six voices. Each changing line schedules a flip of that voice's mute or a length bump after 8 bars. Loop lengths become 5+(n+lineIx*3)%17. Chaos multiplies random jitter on remap; stickiness raises bars between auto-suggest casts. Ground bed always available.", "dubious": "The I Ching is a vast classical text; this tool uses only the public combinatorial structure of six lines and a hexagram number, with our own musical mapping, and does not reproduce oracle text."}, "design": {"name": "Weather-map isobars: synoptic charts with pressure contours, fronts and station plots in navy and red on cream", "short": "Weather-map isobars", "who": "Meteorological chart designers and synoptic cartographers", "era": "Twentieth century to the present", "hallmarks": ["Cream chart paper with navy pressure contours (isobars).", "Cold and warm fronts in navy and red, station plots with wind barbs.", "Latitude-longitude graticule and a bold chart title block."], "works": ["Look up historic synoptic weather charts in meteorological archives", "Look up isobar maps and front symbols in forecasting manuals", "Search for navy-and-red weather-map design on cream stock"]}}
*/
/*CSS
:root{--bg:#f3ead6;--fg:#1a2a4a;--acc:#b42318;--bar-bg:#1a2a4a;--bar-fg:#f3ead6;--bar-font:'Source Sans 3',sans-serif;--learn-font:'Source Sans 3',sans-serif;--learn-bg:#faf4e8;--deck-bg:#faf4e8;--head-font:'Cormorant Garamond',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#f3ead6}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #1a2a4a;font:400 11.5px 'Source Sans 3';background:#faf4e8;color:#1a2a4a}
#side h3{font:700 16px 'Cormorant Garamond';color:#b42318;margin:12px 0 2px;border-bottom:1px solid #1a2a4a}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Source Sans 3'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 12px 'Cormorant Garamond';border:1.5px solid #1a2a4a;background:transparent;color:#1a2a4a;padding:5px 10px;cursor:pointer}#side .bt button:hover{background:#b42318;color:#f3ead6;border-color:#b42318}
#mm-learn-dlg h2{font:700 34px/1.05 'Cormorant Garamond'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Hexagram Cast: a weather-map isobar chart that morphs when you cast a hexagram"></canvas></div>
<div id="side"><div class="bt"><button id="b-c">C · CAST</button><button id="b-k">K · KEEP CAST</button></div><p style="margin:2px 0;opacity:.8">Cast six coins. Changing lines rewrite mutes and lengths.</p>
<h3>Oracle</h3><div id="c0"></div><h3>Voice</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const st=MMX.bind({chaos:0.35,stick:0.6,bpm:88,key:3,scale:'penta',dens:0.65,deg:0,rev:0.4,bed:0.4,lv:0.9,m0:false,m1:false,m2:false,m3:false,m4:false,m5:false,l0:8,l1:11,l2:13,l3:7,l4:10,l5:14});
let N={},cv,lines=[],hex=1,changing=[],pending=[],barCount=0,castAt=0,level=0,isobars=[],kept=null,voices=[];
function coin(){return 2+((R()>0.5)?1:0)+((R()>0.5)?1:0)+((R()>0.5)?1:0);} // 6..9
function cast(){lines=Array.from({length:6},()=>coin());changing=lines.map((v,i)=>(v===6||v===9)?i:-1).filter(i=>i>=0);
  // binary bottom to top: solid=1
  let n=0;lines.forEach((v,i)=>{if(v===7||v===9)n|=(1<<i);});hex=(n%64)+1;
  const dens=clamp(0.3+(hex%10)*0.06+st.chaos*(R()-0.5)*0.3,0.15,1);
  const deg=hex%7;MMX.setParam('dens',dens);MMX.setParam('deg',deg);
  lines.forEach((v,i)=>{const broken=v===6||v===8;MMX.setParam('m'+i,broken&&R()<0.55+st.chaos*0.3);MMX.setParam('l'+i,5+(hex+i*3)%17);});
  pending=changing.map(i=>({bar:barCount+8,i,kind:R()<0.5?'mute':'len'}));
  castAt=performance.now();rebuildIsobars();MM.toast('Hexagram '+hex+(changing.length?' · changing '+changing.map(i=>i+1).join(','):''));}
function rebuildIsobars(){const base=20+hex*0.4;isobars=Array.from({length:7},(_,k)=>({p:base+k*4+st.chaos*R()*3,phase:R()*TAU,amp:8+R()*18+changing.length*3}));}
function keep(){kept={hex,lines:lines.slice(),changing:changing.slice()};MM.toast('Kept hexagram '+hex);}
function fireVoice(i,t,sd){if(st['m'+i])return;const per=clamp(st['l'+i],4,32),step=Math.floor((MM.now*10)%per);if(step%Math.max(1,Math.round(4-st.dens*3))!==0&&R()>st.dens)return;
  const midi=MM.deg(st.deg+i,st.scale,48+st.key),semis=midi-48;
  voices[i].hit=performance.now()+Math.max(0,(t-MM.now)*1000);
  MMX.fire(i,t,{semis,gain:st.lv*(0.5+0.4*st.dens),dur:sd*(1+st.dens),maxDur:1.5,rev:st.rev,dest:N.bus,pan:(i/5)*1.2-0.6,cut:700+st.dens*9000});}
function step(i,t,sd){const s=i%16;if(s===0&&i>0){barCount++;pending=pending.filter(p=>{if(p.bar<=barCount){if(p.kind==='mute')MMX.setParam('m'+p.i,!st['m'+p.i]);else MMX.setParam('l'+p.i,clamp(st['l'+p.i]+(R()<0.5?-2:3),4,28));return false;}return true;});
    if(st.stick<0.3&&R()<0.08+st.chaos*0.1)cast();}
  for(let v=0;v<6;v++){if(s%(Math.max(1,6-Math.round(st.dens*4)))===v%4)fireVoice(v,t,sd);}
  N.bedG.gain.setTargetAtTime(st.bed,t,0.1);}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,pad=20,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.2;
  const CREAM=vj?'#0e1a2e':'#f3ead6',NAVY=vj?'#c8d6ea':'#1a2a4a',RED='#b42318';
  g.fillStyle=CREAM;g.fillRect(0,0,W,H);
  // graticule
  g.strokeStyle=NAVY;g.globalAlpha=0.15;g.lineWidth=1;for(let x=pad;x<W-pad;x+=30){g.beginPath();g.moveTo(x,pad);g.lineTo(x,H-pad);g.stroke();}for(let y=pad;y<H-pad;y+=30){g.beginPath();g.moveTo(pad,y);g.lineTo(W-pad,y);g.stroke();}g.globalAlpha=1;
  // isobars
  const cx=W*0.55,cy=H*0.52,age=Math.min(1,(pn-castAt)/800);
  isobars.forEach((iso,k)=>{g.strokeStyle=k%2?RED:NAVY;g.globalAlpha=0.35+level*0.4;g.lineWidth=1.5;g.beginPath();
    for(let a=0;a<=64;a++){const th=a/64*TAU,r=(iso.p*2.2+Math.sin(th*3+iso.phase+pn*0.0003)*iso.amp*age)*(0.7+level*0.3);const x=cx+Math.cos(th)*r,y=cy+Math.sin(th)*r*0.72;a?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();g.stroke();g.globalAlpha=1;});
  // fronts
  g.strokeStyle=RED;g.lineWidth=2;g.beginPath();g.moveTo(pad+40,H*0.3);g.quadraticCurveTo(W*0.4,H*0.45+level*30,W-pad-40,H*0.35);g.stroke();
  g.strokeStyle=NAVY;g.beginPath();g.moveTo(pad+60,H*0.7);g.quadraticCurveTo(W*0.5,H*0.6-level*20,W-pad-30,H*0.75);g.stroke();
  g.fillStyle=NAVY;g.font=`700 ${Math.min(36,W*0.042)}px 'Cormorant Garamond'`;g.fillText('HEXAGRAM CAST',pad,40);
  g.font="600 11px 'Source Sans 3'";g.fillStyle=RED;g.fillText(`SYNOPTIC · HEX ${hex||'—'} · ${NM[st.key]} ${st.scale.toUpperCase()} · CHAOS ${st.chaos.toFixed(2)} · STICK ${st.stick.toFixed(2)}`,pad,58);
  // hexagram lines (bottom to top)
  const hx=pad+10,hy=H*0.22,lw=90;
  (lines.length?lines:[7,7,7,7,7,7]).forEach((v,i)=>{const y=hy+(5-i)*22,solid=v===7||v===9,ch=v===6||v===9;
    g.strokeStyle=ch?RED:NAVY;g.lineWidth=ch?4:3;
    if(solid){g.beginPath();g.moveTo(hx,y);g.lineTo(hx+lw,y);g.stroke();}
    else{g.beginPath();g.moveTo(hx,y);g.lineTo(hx+lw*0.4,y);g.stroke();g.beginPath();g.moveTo(hx+lw*0.6,y);g.lineTo(hx+lw,y);g.stroke();}
    g.fillStyle=NAVY;g.font="600 10px 'Source Sans 3'";g.fillText(String(v)+(ch?'*':''),hx+lw+8,y+4);});
  // station plots for voices
  voices.forEach((v,i)=>{const x=pad+130+i*((W-pad*2-140)/6),y=H-56,hit=Math.exp(-(pn-v.hit)/350)*(pn>=v.hit?1:0);
    g.strokeStyle=st['m'+i]?RED:NAVY;g.lineWidth=2;g.beginPath();g.arc(x,y,10+hit*6,0,TAU);g.stroke();
    g.fillStyle=NAVY;g.font="600 10px 'Source Sans 3'";g.textAlign='center';g.fillText('V'+(i+1)+(st['m'+i]?'×':''),x,y+28);g.textAlign='left';});
  if(kept){g.fillStyle=RED;g.font="700 11px 'Source Sans 3'";g.fillText('KEPT HEX '+kept.hex,W-pad-100,H-18);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={};[0,1,2,3,4,5].forEach(i=>{const f0=146.8*Math.pow(2,i/7);FBS['v'+i]=()=>mk(1.3,t=>{let s=0;[1,1.5,2].forEach((h,q)=>s+=Math.sin(TAU*f0*h*t)/(q+1));return s*Math.exp(-t*2)*Math.min(1,t*80);});});
FBS.bed=()=>{let lp=0;return mk(4,t=>{lp+=0.035*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/4)**1.2;});};
const cfg={bpm:88,div:4,swing:0.04,step,draw,start:()=>{if(!lines.length)cast();MM.ensure();MMX.fire(6,MM.now+0.05,{loop:true,dur:7200,gain:0.45,dest:N.bedG});},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:1.5,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='c')cast();else if(k==='k')keep();},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);N.bedG=c.createGain();N.bedG.gain.value=st.bed;N.bedG.connect(N.bus);
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());voices=Array.from({length:6},()=>({hit:0}));cv=MM.canvas('#cv');rebuildIsobars();
    MMX.init({state:st,slots:[['Voice 1','v0'],['Voice 2','v1'],['Voice 3','v2'],['Voice 4','v3'],['Voice 5','v4'],['Voice 6','v5'],['Ground bed','bed']].map(([label,kind],i)=>({label,kind,rv:i===6?0.35:0.18,gain:i===6?0.5:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});},onTrim:()=>{},onPreset:()=>{MM.bpm=st.bpm;N.bedG.gain.value=st.bed;},
      factory:fac(),extra:{get:()=>({lines:lines.slice(),hex,changing:changing.slice(),kept}),set:x=>{if(!x)return;if(x.lines)lines=x.lines;if(x.hex!=null)hex=x.hex;if(x.changing)changing=x.changing;if(x.kept)kept=x.kept;rebuildIsobars();}},
      keys:[['C','cast hexagram'],['K','keep current cast']],midiHelp:'Notes 36 to 47 set the key. Note 48 casts. CC 1 chaos, CC 2 stickiness.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;if(on&&n===48)cast();}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'chaos',{label:'Cast chaos',min:0,max:1,cc:1});MMX.ctl(C[0],'stick',{label:'Stickiness',min:0,max:1,cc:2});MMX.ctl(C[0],'bpm',{label:'Tempo',min:60,max:130,step:1,on:v=>MM.bpm=v});MMX.ctl(C[0],'dens',{label:'Density',min:0.1,max:1});MMX.ctl(C[0],'deg',{label:'Scale degree',min:0,max:12,step:1});
    [0,1,2,3,4,5].forEach(i=>{MMX.ctl(C[1],'m'+i,{type:'check',label:'Mute voice '+(i+1)});MMX.ctl(C[1],'l'+i,{label:'Length '+(i+1),min:4,max:28,step:1});});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['penta','Pentatonic'],['minpent','Minor pent'],['dorian','Dorian'],['major','Major'],['hira','Hirajoshi'],['whole','Whole-tone']]});
    MMX.ctl(C[3],'bed',{label:'Ground bed',min:0,max:1.2,on:v=>{N.bedG&&(N.bedG.gain.value=v);}});MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.$('#b-c').onclick=cast;MM.$('#b-k').onclick=keep;}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Oracle default':{},'Sticky calm':P({chaos:0.1,stick:0.95,dens:0.45,rev:0.55}),'Chaotic fronts':P({chaos:1,stick:0.15,dens:0.85}),'Sparse broken':P({dens:0.3,chaos:0.4,bed:0.7}),'Dense solid':P({dens:0.95,chaos:0.2,bpm:100})};}
MM.init(cfg);
