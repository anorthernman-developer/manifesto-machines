/*META
{"title": "Pocket Stack", "deep": true, "category": "found-sound production", "date": "2026-11-07", "kicker": "FOUND-SOUND PRODUCTION · A POCKETFUL OF SHORT PHONE CLIPS AS INTERLOCKING OSTINATOS", "bpm": 126, "idea": "Found-sound dance production often starts with a pocketful of short phone clips: voice memos, door slams, street noise, a hummed hook. Stack those clips as interlocking ostinato cells, punched like a player-piano roll, over a house or garage groove. Density and lane mutes build toward a lift; each lane loops its own trimmed region.", "controls": "8 slots (clip lanes 1 to 5, kick, hat/clap, optional bed); a scrolling piano-roll grid where each lane is a short ostinato from that slot's trimmed region; tempo, swing, groove (house/garage/broken); density, lane mutes, pitch per lane, build/lift amount; a perforated piano-roll VJ view.", "how": "Press PLAY: the roll scrolls and lanes fire their punched cells over the groove. Click a cell to toggle a hit; press M to mute/unmute the hovered lane, L for a lift build, N for a new random roll. Open the deck (D) to load your own phone clips and trim each with S and E. Press F for the full-screen perforated roll.", "fonts": "family=IBM+Plex+Mono:wght@400;600;700&family=Bebas+Neue", "try": ["Load five short phone clips into the lanes. Punch a sparse pattern on lanes 1 to 3, raise density, then press L for the lift.", "Choose the garage groove, mute lanes 4 and 5, trim each clip tightly with S and E, and record a one-minute pocket stack.", "Set build high and leave density mid: the roll thickens toward the lift while the kick stays four-on-the-floor."], "manifesto": {"name": "Found-sound production: stacking a pocketful of short phone clips as interlocking ostinatos over house and garage drums", "short": "Pocket Stack", "author": "Inspired by contemporary found-audio dance producers' voice-memo and journal-sampling methods", "year": "2010s to 2020s, from older sampling and club traditions", "where": "Phones, pockets and dance floors", "ideas": ["In our words: a pocketful of short phone clips can become the whole melodic bed of a track.", "In our words: interlocking ostinatos mean each lane repeats a short cell that sits beside the others without needing a long melody.", "In our words: punching hits on a piano-roll grid makes the pattern visible and editable like early automated music media.", "In our words: house keeps four on the floor; garage leans on a two-step kick; broken opens the grid.", "In our words: density and lane mutes are arrangement tools that build toward a lift."], "quotes": [], "system": "Five clip lanes each hold a 16-step binary pattern. On each step a lane fires its trimmed sample region if the cell is on and the lane is unmuted, with per-lane pitch and a shared density gate. Kick, hat/clap and an optional looping bed follow a house, garage or broken groove. A build amount opens filter and thickens density toward a lift. The canvas draws a scrolling perforated piano roll.", "dubious": "No claim is made about any one producer's method; this is a general studio sketch of found-audio dance production, written in our own words."}, "design": {"name": "Player piano roll: perforated paper scrolls with hole grids, tempo markings and tracker bars (early automated music media)", "short": "Player piano roll", "who": "Player-piano roll printers and early automated music media makers", "era": "Late nineteenth century to mid twentieth century", "hallmarks": ["Long perforated paper scrolls with rectangular hole grids for note onsets.", "Tempo markings, tracker bars and edge sprocket holes.", "Cream or buff paper with ink-black holes and stamped title blocks."], "works": ["Look up historic player-piano rolls in music museum collections", "Look up perforated paper music rolls and tracker-bar diagrams", "Search for early automated music media and roll-title blocks"]}}
*/
/*CSS
:root{--bg:#e8dcc4;--fg:#1a1814;--acc:#8b4518;--bar-bg:#1a1814;--bar-fg:#e8dcc4;--bar-font:'IBM Plex Mono',monospace;--learn-font:'IBM Plex Mono',monospace;--learn-bg:#f3ebd8;--deck-bg:#f3ebd8;--head-font:'Bebas Neue',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#e8dcc4}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #1a1814;font:400 11px 'IBM Plex Mono';background:#f3ebd8;color:#1a1814}
#side h3{font:400 18px 'Bebas Neue';letter-spacing:.06em;color:#8b4518;margin:12px 0 2px;border-bottom:1px solid #1a1814}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'IBM Plex Mono'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 11px 'IBM Plex Mono';border:1.5px solid #1a1814;background:transparent;color:#1a1814;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#8b4518;color:#e8dcc4;border-color:#8b4518}
#mm-learn-dlg h2{font:400 36px/1.05 'Bebas Neue'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Pocket Stack: a scrolling player-piano roll of interlocking phone-clip ostinatos over a house or garage groove"></canvas></div>
<div id="side"><div class="bt"><button id="b-n">N · NEW ROLL</button><button id="b-l">L · LIFT</button><button id="b-m">M · MUTE LANE</button></div><p style="margin:2px 0;opacity:.8">Click a cell to punch or clear. Hover a lane then M to mute.</p>
<h3>Groove</h3><div id="c0"></div><h3>Stack</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const GR={house:{k:[0,4,8,12],c:[4,12],h:[2,6,10,14]},garage:{k:[0,10],c:[4,12],h:[0,2,4,6,8,10,12,14]},broken:{k:[0,3,8,11],c:[4,12],h:[2,5,7,10,13,15]}};
const st=MMX.bind({bpm:126,groove:'house',swing:0.08,dens:0.7,build:0.35,lift:0,key:5,scale:'minpent',p0:0,p1:0,p2:3,p3:5,p4:7,m0:false,m1:false,m2:false,m3:false,m4:false,drums:0.9,bed:0.4,rev:0.25,lv:0.95});
let N={},cv,lanes=[],hover=-1,curStep=0,scroll=0,liftUntil=0,bedNode=null,level=0,flash=[];
function newRoll(){lanes=Array.from({length:5},(_,i)=>({pat:Array.from({length:16},(_,k)=>k%4===i%4||(k%8===0&&i===0)||R()<0.18?1:0),hit:0}));}
newRoll();
function step(i,t,sd){const s=i%16,G=GR[st.groove];curStep=s;scroll+=(1+st.build*0.5);const dens=clamp(st.dens+st.build*0.35+(MM.now<liftUntil?0.35:0),0,1);
  if(G.k.includes(s))MMX.fire(5,t,{gain:st.drums*st.lv*(MM.now<liftUntil?1.1:0.85),dest:N.bus,maxDur:0.45});
  if(G.c.includes(s))MMX.fire(6,t,{gain:st.drums*0.7*st.lv,dest:N.bus,maxDur:0.3,rev:0.1});
  if(G.h.includes(s))MMX.fire(6,t,{gain:st.drums*(s%2?0.28:0.5)*st.lv,pos:0.45,dur:0.1,dest:N.bus,maxDur:0.12,pan:0.25});
  lanes.forEach((L,li)=>{if(st['m'+li]||!L.pat[s]||R()>dens)return;const semis=st['p'+li]+(MM.deg(st['p'+li],st.scale,48+st.key)-48)*0;const midi=MM.deg(Math.round(st['p'+li]),st.scale,48+st.key);
    MMX.fire(li,t,{semis:midi-48,gain:st.lv*0.7,dur:sd*(1.2+st.build),maxDur:1.2,rev:st.rev,dest:N.bus,pan:(li/4)*1.2-0.6,cut:600+st.build*10000+(MM.now<liftUntil?4000:0)});
    L.hit=performance.now()+Math.max(0,(t-MM.now)*1000);flash.push({li,s,at:L.hit});});
  if(flash.length>48)flash.splice(0,flash.length-48);
  N.hp.frequency.setTargetAtTime(40+st.build*st.build*5000+(MM.now<liftUntil?2000:0),t,0.08);}
function doLift(){liftUntil=MM.now+8;MMX.setParam('build',clamp(st.build+0.25,0,1));MM.toast('LIFT: denser roll, open filter');}
function lay(){const W=cv.w,H=cv.h,pad=18,hdr=56,rows=5,cell=Math.min((W-pad*2-90)/16,28),gy=hdr+10;return{W,H,pad,hdr,rows,cell,gy,gx:pad+80};}
function draw(){cv.fit();const g=cv.g,L=lay(),{W,H,pad,cell,gy,gx}=L,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.2;
  const PAPER=vj?'#1a1814':'#e8dcc4',INK=vj?'#e8dcc4':'#1a1814',ACC='#8b4518',HOLE=vj?'#e8dcc4':'#1a1814';
  g.fillStyle=PAPER;g.fillRect(0,0,W,H);
  // sprocket holes along edges
  for(let y=20;y<H-20;y+=14){g.fillStyle=HOLE;g.beginPath();g.arc(10,y,3,0,TAU);g.fill();g.beginPath();g.arc(W-10,y,3,0,TAU);g.fill();}
  g.strokeStyle=INK;g.lineWidth=1.5;g.strokeRect(16,12,W-32,H-24);
  g.fillStyle=INK;g.font=`400 ${Math.min(42,W*0.05)}px 'Bebas Neue'`;g.fillText('POCKET STACK',pad+8,40);
  g.font="600 11px 'IBM Plex Mono'";g.fillStyle=ACC;g.fillText(`ROLL · ${NM[st.key]} ${st.scale.toUpperCase()} · ${Math.round(MM.bpm)} BPM · ${st.groove.toUpperCase()} · BUILD ${Math.round(st.build*100)}%`,pad+8,56);
  // tracker bar
  const tx=gx+((curStep+scroll*0.02)%16)*cell;g.fillStyle=ACC;g.globalAlpha=0.15;g.fillRect(tx,gy-4,cell,5*(cell+6)+8);g.globalAlpha=1;
  lanes.forEach((lane,ri)=>{const y=gy+ri*(cell+6),muted=st['m'+ri];
    g.fillStyle=muted?ACC:INK;g.font="700 11px 'IBM Plex Mono'";g.fillText('LANE '+(ri+1)+(muted?' · M':''),pad,y+cell*0.7);
    for(let k=0;k<16;k++){const x=gx+k*cell,on=lane.pat[k],fl=flash.find(f=>f.li===ri&&f.s===k&&pn-f.at<200);
      g.fillStyle=on?(fl?ACC:HOLE):(vj?'#2a2620':'#f3ebd8');g.fillRect(x+2,y+2,cell-4,cell-4);
      if(on){g.fillStyle=PAPER;g.beginPath();g.ellipse(x+cell/2,y+cell/2,cell*0.22,cell*0.28,0,0,TAU);g.fill();}
      g.strokeStyle=hover===ri?ACC:INK;g.lineWidth=hover===ri?2:0.8;g.strokeRect(x+1.5,y+1.5,cell-3,cell-3);}
  });
  // tempo mark
  g.fillStyle=INK;g.font="600 10px 'IBM Plex Mono'";g.fillText('TEMPO '+Math.round(MM.bpm)+(MM.now<liftUntil?' · LIFT':'')+' · dens '+st.dens.toFixed(2),pad,H-18);}
function hit(x,y,ph){if(ph!=='down')return;const L=lay(),row=Math.floor((y-L.gy)/(L.cell+6)),col=Math.floor((x-L.gx)/L.cell);
  if(row>=0&&row<5)hover=row;if(row>=0&&row<5&&col>=0&&col<16&&y-L.gy-row*(L.cell+6)<=L.cell){lanes[row].pat[col]^=1;if(lanes[row].pat[col])MMX.fire(row,MM.now+0.01,{dur:0.35,dest:N.bus});}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={c0:()=>mk(1.0,t=>Math.sin(TAU*196*t)*Math.exp(-t*3)*Math.min(1,t*80)),c1:()=>mk(1.2,t=>(Math.sin(TAU*220*t)+0.3*Math.sin(TAU*330*t))*Math.exp(-t*2.5)*Math.min(1,t*60)),
  c2:()=>mk(0.9,t=>Math.sin(TAU*146.8*t*(1+0.02*Math.sin(TAU*5*t)))*Math.exp(-t*2.8)*Math.min(1,t*100)),c3:()=>mk(0.7,t=>(Math.random()*2-1)*Math.exp(-t*12)*Math.min(1,t*200)+Math.sin(TAU*300*t)*Math.exp(-t*6)*0.4),
  c4:()=>mk(1.4,t=>[1,1.5,2].reduce((s,h,q)=>s+Math.sin(TAU*174.6*h*t)/(q+1),0)*Math.sin(Math.PI*Math.min(1,t/1.4))**1.2),
  kick:()=>mk(0.4,t=>Math.sin(TAU*55*t*Math.exp(-t*8))*Math.exp(-t*7)*Math.min(1,t*200)),hat:()=>mk(0.12,t=>(Math.random()*2-1)*Math.exp(-t*40)*Math.min(1,t*500)),
  bed:()=>{let lp=0;return mk(3.5,t=>{lp+=0.04*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/3.5)**1.2;});}};
const cfg={bpm:126,div:4,get swing(){return st.swing;},step,draw,start:()=>{liftUntil=0;MM.ensure();if(!bedNode)bedNode=MMX.fire(7,MM.now+0.05,{loop:true,dur:7200,gain:0.5,dest:N.bedG});},stop:()=>{if(bedNode){bedNode.stop(MM.ctx.currentTime);bedNode=null;}},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:1.5,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='n')newRoll();else if(k==='l')doLift();else if(k==='m'&&hover>=0){MMX.setParam('m'+hover,!st['m'+hover]);MM.toast((st['m'+hover]?'MUTE ':'UNMUTE ')+'lane '+(hover+1));}},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.hp=c.createBiquadFilter();N.hp.type='highpass';N.hp.frequency.value=60;N.bus.connect(N.hp);N.hp.connect(MM.out);N.bedG=c.createGain();N.bedG.gain.value=st.bed;N.bedG.connect(N.bus);
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Clip lane 1','c0'],['Clip lane 2','c1'],['Clip lane 3','c2'],['Clip lane 4','c3'],['Clip lane 5','c4'],['Kick','kick'],['Hat / clap','hat'],['Optional bed','bed']].map(([label,kind],i)=>({label,kind,rv:i===7?0.3:0.12,gain:i===7?0.5:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});if(i===7&&bedNode){bedNode.stop(MM.ctx.currentTime);bedNode=MMX.fire(7,MM.now+0.05,{loop:true,dur:7200,gain:0.5,dest:N.bedG});}},onTrim:()=>{},onPreset:()=>{N.bedG.gain.value=st.bed;MM.bpm=st.bpm;},
      factory:fac(),extra:{get:()=>({lanes:lanes.map(l=>({pat:l.pat.slice()}))}),set:x=>{if(x&&x.lanes&&x.lanes.length===5)lanes=x.lanes.map(l=>({pat:l.pat.slice(),hit:0}));}},
      keys:[['N','new random roll'],['L','lift / build'],['M','mute hovered lane'],['click','punch / clear cell']],midiHelp:'Notes 36 to 47 set the key. CC 1 density, CC 2 build.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'bpm',{label:'Tempo',min:100,max:140,step:1,on:v=>MM.bpm=v});MMX.ctl(C[0],'groove',{type:'select',label:'Groove',options:[['house','House'],['garage','Garage'],['broken','Broken']]});MMX.ctl(C[0],'swing',{label:'Swing',min:0,max:0.35});MMX.ctl(C[0],'drums',{label:'Drums',min:0,max:1.2});
    MMX.ctl(C[1],'dens',{label:'Density',min:0.1,max:1,cc:1});MMX.ctl(C[1],'build',{label:'Build / lift',min:0,max:1,cc:2});MMX.ctl(C[1],'bed',{label:'Bed',min:0,max:1.2,on:v=>{N.bedG&&(N.bedG.gain.value=v);}});
    [0,1,2,3,4].forEach(i=>MMX.ctl(C[1],'m'+i,{type:'check',label:'Mute lane '+(i+1)}));
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['minpent','Minor pent'],['penta','Pentatonic'],['minor','Minor'],['dorian','Dorian'],['major','Major']]});
    [0,1,2,3,4].forEach(i=>MMX.ctl(C[2],'p'+i,{label:'Pitch lane '+(i+1),min:-7,max:14,step:1}));
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-n').onclick=newRoll;MM.$('#b-l').onclick=doLift;MM.$('#b-m').onclick=()=>{if(hover>=0){MMX.setParam('m'+hover,!st['m'+hover]);}};}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Pocket house (default)':{},'Garage pocket':P({groove:'garage',bpm:132,dens:0.65,build:0.5}),'Sparse lift':P({dens:0.35,build:0.8,m3:true,m4:true}),'Broken stack':P({groove:'broken',dens:0.85,swing:0.12}),'Bed and clips':P({drums:0.25,bed:0.85,rev:0.5,bpm:110})};}
MM.init(cfg);
