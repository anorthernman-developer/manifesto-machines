/*META
{"title": "Orbit Loops", "deep": true, "category": "generative systems", "date": "2026-11-11", "kicker": "GENERATIVE SYSTEMS · LOOPS OF UNEQUAL LENGTH, AND MUSIC YOU CAN LISTEN TO OR IGNORE", "bpm": 60, "idea": "Ambient generative music asks to be equally good heard closely or left in the background. Orbit Loops gives six of your sounds their own orbit, each a loop of a different length in seconds, drawn as a star chart. A sound plays when its star crosses the meridian. One dial moves the whole system between LISTEN (brighter, busier, a foreground voice) and IGNORE (darker, sparse, long tails), and you tend it like a garden: water, prune, and let it grow.", "controls": "7 slots (six orbit voices plus a foreground bell); six loop lengths in seconds, a length spread and a global orbit speed; LISTEN to IGNORE dial; growth (how often an orbit picks a new note), key and scale; water and prune; reverb, delay and level; a planetarium-chart VJ view.", "how": "Press PLAY and leave it. Turn the LISTEN/IGNORE dial to decide how much it asks of you. Press W to water (a burst of growth), P to prune the busiest orbit for a while, N to re-seed the loop lengths. Click an orbit to mute or unmute it. Open the deck (D) to load six of your own sounds and trim each with the S and E handles. Press F for the full-screen star chart.", "fonts": "family=Cormorant+SC:wght@500;700&family=IBM+Plex+Mono:wght@400;500", "try": ["Load six long field recordings and set every orbit between 20 and 40 seconds. Set the dial near IGNORE and work with it running for an hour.", "Load one sung note into all six slots, trim each to a different part with S and E, and let the unequal orbits make chords that never repeat in the same order.", "Turn the dial to LISTEN, raise growth, then press P a few times: pruning is composing too."], "manifesto": {"name": "Generative ambient practice: loops of unequal length, the studio as a garden, and music that rewards listening or ignoring", "short": "Orbit Loops", "author": "Inspired by ambient and generative studio practice from the 1970s onwards (tape loops of unequal length; music designed to sit in the background or reward attention)", "year": "1970s to now", "where": "Studios in Britain, Europe and the United States, then software", "ideas": ["In our words: if loops of different lengths run together, the combinations keep changing, and you hear new music from very few parts.", "In our words: ambient music should work at two levels. It can be heard closely, or it can be part of the room.", "In our words: the composer sets up conditions and then tends them, more like a gardener than an architect.", "In our words: the studio itself can be the instrument, with tape, delay and reverb doing part of the composing.", "In our words: choosing what to remove is as important as choosing what to add."], "quotes": [], "system": "Each orbit has a period in seconds. The scheduler checks every quarter-second for the exact moment each star crosses the meridian and plays that orbit's slot at a scale degree that drifts by growth. The LISTEN/IGNORE dial scales event probability, the master low-pass, the reverb send and whether the foreground bell plays short phrases. Water briefly raises growth and density; prune mutes the most active orbit for two of its own periods. The chart shows the next time two or more orbits will cross the meridian together.", "dubious": "Loop lengths and pitches are generated here. No published piece's loop lengths or notes are reproduced."}, "design": {"name": "Planetarium star chart: navy celestial maps with gold stars, constellation lines, graticules and small engraved capitals (celestial atlases and planetarium guides)", "short": "Planetarium star chart", "who": "Celestial cartographers and planetarium guide designers", "era": "17th century atlases to mid 20th century planetarium charts", "hallmarks": ["Deep navy ground with cream or gold stars sized by magnitude.", "Concentric graticule circles, a meridian line and degree ticks around the rim.", "Small engraved capitals and italic labels; thin constellation lines joining stars."], "works": ["Look up mid-20th-century planetarium star charts and planispheres", "Look up 17th-century celestial atlases in library digital collections", "Search for planisphere designs with rotating star wheels"]}}
*/
/*CSS
:root{--bg:#0e1a33;--fg:#f1e7c9;--acc:#d9b45a;--bar-bg:#08112a;--bar-fg:#f1e7c9;--bar-font:'IBM Plex Mono',monospace;--learn-font:'IBM Plex Mono',monospace;--learn-bg:#f4efe0;--deck-bg:#f4efe0;--head-font:'Cormorant SC',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#view{position:relative;overflow:hidden;background:#0e1a33}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:1px solid #d9b45a;font:400 11px 'IBM Plex Mono';background:#13224a;color:#f1e7c9}
#side h3{font:700 16px 'Cormorant SC';letter-spacing:.12em;color:#d9b45a;margin:12px 0 2px;border-bottom:1px solid #d9b45a55}
#side .mmx-ctl{grid-template-columns:100px 1fr 40px;font:400 11px 'IBM Plex Mono'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:500 11px 'IBM Plex Mono';border:1px solid #d9b45a;background:transparent;color:#f1e7c9;padding:5px 7px;cursor:pointer}#side .bt button:hover{background:#d9b45a;color:#0e1a33}
#mm-learn-dlg h2{font:700 36px/1.05 'Cormorant SC'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Orbit Loops: a star chart where each loop is an orbit and a sound plays as its star crosses the meridian"></canvas></div>
<div id="side"><div class="bt"><button id="b-w">W · WATER</button><button id="b-p">P · PRUNE</button><button id="b-n">N · RE-SEED</button></div><p style="margin:2px 0;opacity:.75">Click an orbit to mute it. Leave it running.</p>
<h3>Attention</h3><div id="c0"></div><h3>Orbits (seconds)</h3><div id="c1"></div><h3>Garden</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const st=MMX.bind({attn:0.45,L0:7.3,L1:9.1,L2:11.6,L3:13.9,L4:16.7,L5:19.4,speed:1,growth:0.35,key:2,scale:'penta',bell:0.5,rev:0.6,dly:0.3,lv:0.95,mute:[false,false,false,false,false,false]});
let N={},cv,ph=[0,0,0,0,0,0],deg=[0,2,4,1,3,5],hits=[0,0,0,0,0,0],glow=[0,0,0,0,0,0],pruned=[0,0,0,0,0,0],water=0,level=0,elapsed=0,lastT=null,trail=[],bellQ=[];
const L=k=>Math.max(2,st['L'+k]);
function reseed(){const base=6+R()*6;for(let k=0;k<6;k++)st['L'+k]=+(base*(1+k*0.19)+R()*3).toFixed(1);MMX.refresh&&MMX.refresh();MM.toast('New orbits');}
function playOrbit(k,t){const a=st.attn,g=st.lv*(0.45+a*0.4)*(k<2?1:0.8);if(R()<st.growth+water*0.5){deg[k]+=R()<0.5?-1:1;deg[k]=clamp(deg[k],-3,9);}
  const midi=MM.deg(deg[k],st.scale,48+st.key);MMX.fire(k,t,{semis:midi-48,dur:Math.min(9,L(k)*0.5),maxDur:9,gain:g,fadeIn:0.02+(1-a)*0.6,fadeOut:1.2,rev:st.rev*(1.1-a*0.5),dly:st.dly*a,pan:Math.sin(k*1.7)*0.7,dest:N.bus});hits[k]++;glow[k]=1;trail.push({k,deg:deg[k],t:performance.now()});if(trail.length>40)trail.shift();
  if(a>0.55&&R()<(a-0.5)*st.bell*1.6){const n=2+((R()*3)|0);for(let j=0;j<n;j++)bellQ.push({t:t+0.35+j*(0.3+R()*0.25),d:deg[k]+[0,2,4,7][(R()*4)|0]});}}
function step(i,t,sd){const dt=sd*st.speed;water*=0.985;N.lp.frequency.setTargetAtTime(500+Math.pow(st.attn,1.6)*9000,t,0.8);
  for(let k=0;k<6;k++){const p0=ph[k],p1=p0+dt/L(k);if(p1>=1){const frac=(1-p0)/(p1-p0);const mute=st.mute[k]||pruned[k]>0;if(pruned[k]>0)pruned[k]--;
      const prob=0.35+st.attn*0.6+water*0.3;if(!mute&&R()<prob)playOrbit(k,t+frac*sd);}ph[k]=p1%1;}
  bellQ=bellQ.filter(b=>{if(b.t<t+sd){MMX.fire(6,Math.max(t,b.t),{semis:MM.deg(b.d,st.scale,60+st.key)-48,maxDur:3,gain:st.lv*st.bell*0.5,rev:st.rev,dly:st.dly,pan:R()*1.2-0.6,dest:N.bus});return false;}return true;});}
function nextAlign(){// next time (s) at least 2 orbits cross the meridian within 0.5 s of each other
  const tt=[];for(let k=0;k<6;k++){if(st.mute[k])continue;const p=(1-ph[k])*L(k)/st.speed;for(let n=0;n<12;n++)tt.push(p+n*L(k)/st.speed);}tt.sort((a,b)=>a-b);for(let j=1;j<tt.length;j++)if(tt[j]-tt[j-1]<0.5)return tt[j-1];return null;}
let centre=[0,0],radii=[];
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,vj=MMX.vjOn,lv=MMX.level();level+=(lv.rms-level)*0.15;const now=performance.now();
  g.fillStyle='#0e1a33';g.fillRect(0,0,W,H);const cx=W/2,cy=H/2+10,Rm=Math.min(W,H)*0.44;centre=[cx,cy];
  // background stars (seeded)
  let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;g.fillStyle='#f1e7c9';for(let j=0;j<160;j++){const x=rnd()*W,y=rnd()*H,m=rnd();g.globalAlpha=0.25+m*0.5;g.beginPath();g.arc(x,y,0.4+m*1.1,0,TAU);g.fill();}g.globalAlpha=1;
  // rim and degree ticks
  g.strokeStyle='#d9b45a';g.lineWidth=1.2;g.beginPath();g.arc(cx,cy,Rm,0,TAU);g.stroke();g.beginPath();g.arc(cx,cy,Rm+10,0,TAU);g.stroke();
  for(let d=0;d<360;d+=5){const a=d/180*Math.PI-Math.PI/2,r2=Rm+(d%30?4:10);g.beginPath();g.moveTo(cx+Math.cos(a)*Rm,cy+Math.sin(a)*Rm);g.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);g.stroke();}
  g.fillStyle='#d9b45a';g.font="500 10px 'IBM Plex Mono'";g.textAlign='center';for(let d=0;d<360;d+=30){const a=d/180*Math.PI-Math.PI/2;g.fillText(String(d/15|0)+'h',cx+Math.cos(a)*(Rm+22),cy+Math.sin(a)*(Rm+22)+3);}
  // meridian
  g.globalAlpha=0.6;g.setLineDash([3,4]);g.beginPath();g.moveTo(cx,cy-Rm-12);g.lineTo(cx,cy);g.stroke();g.setLineDash([]);g.globalAlpha=1;
  // orbits
  radii=[];const stars=[];for(let k=0;k<6;k++){const r=Rm*(0.28+k*0.13);radii.push(r);const m=st.mute[k]||pruned[k]>0;g.strokeStyle=m?'#5a6a8a':'#d9b45a';g.globalAlpha=m?0.35:0.55;g.lineWidth=0.8;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();g.globalAlpha=1;
    const a=ph[k]*TAU-Math.PI/2,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;stars.push([x,y]);glow[k]*=0.96;const sz=6+glow[k]*9+level*6;
    g.fillStyle=m?'#5a6a8a':'#f1e7c9';g.shadowColor='#f1e7c9';g.shadowBlur=glow[k]*20;g.beginPath();for(let p=0;p<10;p++){const aa=p*Math.PI/5-Math.PI/2,rr=p%2?sz*0.42:sz;g.lineTo(x+Math.cos(aa)*rr,y+Math.sin(aa)*rr);}g.closePath();g.fill();g.shadowBlur=0;
    g.fillStyle='#d9b45a';g.font="italic 600 12px 'Cormorant SC'";const la=-Math.PI/2+(k%2?0.5:-0.5)*(0.25+0.6/(k+1));g.textAlign=k%2?'left':'right';g.fillText(['α','β','γ','δ','ε','ζ'][k]+' '+L(k).toFixed(1)+'s',cx+Math.cos(la)*r+(k%2?6:-6),cy+Math.sin(la)*r);}
  // constellation lines between recently sounded stars
  g.strokeStyle='#d9b45a';const rec=[0,1,2,3,4,5].filter(k=>glow[k]>0.3);g.globalAlpha=0.7;g.lineWidth=1;for(let j=1;j<rec.length;j++){g.beginPath();g.moveTo(...stars[rec[j-1]]);g.lineTo(...stars[rec[j]]);g.stroke();}g.globalAlpha=1;
  if(!vj){g.textAlign='left';g.fillStyle='#f1e7c9';g.font="700 28px 'Cormorant SC'";g.fillText('Orbit Loops',18,36);g.font="400 11px 'IBM Plex Mono'";g.fillStyle='#d9b45a';
    const na=nextAlign();g.fillText(`${NM[st.key]} ${st.scale.toUpperCase()} · ${st.attn<0.35?'IGNORE':st.attn>0.65?'LISTEN':'BETWEEN'} ${st.attn.toFixed(2)} · NEXT CONJUNCTION ${na==null?'none soon':na.toFixed(1)+' s'}`,18,54);}
  else{g.textAlign='center';g.fillStyle='#d9b45a';g.globalAlpha=0.6;g.font="700 22px 'Cormorant SC'";g.fillText('ORBIT LOOPS',cx,H-24);g.globalAlpha=1;}}
function hit(x,y,phz){if(phz!=='down')return;const d=Math.hypot(x-centre[0],y-centre[1]);let best=-1,bd=1e9;radii.forEach((r,k)=>{if(Math.abs(r-d)<bd){bd=Math.abs(r-d);best=k;}});if(best>=0&&bd<18){st.mute[best]=!st.mute[best];MM.toast(['α','β','γ','δ','ε','ζ'][best]+(st.mute[best]?' muted':' on'));}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={};[0,1,2,3,4,5].forEach(k=>{FBS['o'+k]=()=>mk(6,t=>{const f=130.8,env=Math.min(1,t*1.5)*Math.exp(-t*0.45);return [1,2,3,4.01,5].reduce((s,h,j)=>s+Math.sin(TAU*f*h*t+Math.sin(TAU*(0.3+k*0.07)*t)*0.6)*([1,0.5,0.25+k*0.04,0.15,0.08][j]),0)*env;});});
FBS.bell=()=>mk(3,t=>[1,2.76,5.4].reduce((s,h,j)=>s+Math.sin(TAU*261.6*h*t)*Math.exp(-t*(1.2+j*1.4))/(j+1),0)*Math.min(1,t*400));
const cfg={bpm:60,div:4,swing:0,step,draw,start:()=>{ph=[0.97,0.8,0.62,0.9,0.55,0.93];},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:3,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='w'){water=1;MM.toast('Watered');}else if(k==='p')prune();else if(k==='n')reseed();},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.lp=c.createBiquadFilter();N.lp.type='lowpass';N.lp.frequency.value=4000;N.lp.Q.value=0.5;N.bus.connect(N.lp);N.lp.connect(MM.out);
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:['α orbit','β orbit','γ orbit','δ orbit','ε orbit','ζ orbit','Foreground bell'].map((label,i)=>({label,kind:i<6?'o'+i:'bell',rv:0.3,gain:0.85})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:3,dest:N.bus});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),extra:{get:()=>({deg:deg.slice()}),set:x=>{if(x&&Array.isArray(x.deg))deg=x.deg.slice(0,6);}},
      keys:[['W','water: a burst of growth'],['P','prune the busiest orbit'],['N','re-seed the loop lengths'],['click','mute or unmute an orbit']],midiHelp:'Notes 36 to 41 sound orbits α to ζ now. CC 1 is the LISTEN/IGNORE dial, CC 2 growth.',midi:(n,v,on)=>{if(on&&n>=36&&n<42)playOrbit(n-36,MM.now+0.01);}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'attn',{label:'Ignore ↔ Listen',min:0,max:1,cc:1});MMX.ctl(C[0],'bell',{label:'Foreground bell',min:0,max:1});
    for(let k=0;k<6;k++)MMX.ctl(C[1],'L'+k,{label:['α','β','γ','δ','ε','ζ'][k]+' length',min:3,max:90,step:0.1});MMX.ctl(C[1],'speed',{label:'Orbit speed',min:0.25,max:4});
    MMX.ctl(C[2],'growth',{label:'Growth',min:0,max:1,cc:2});MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['penta','Pentatonic'],['major','Major'],['lydian','Lydian'],['dorian','Dorian'],['minpent','Minor pent'],['hira','Hirajoshi']]});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:1});MMX.ctl(C[3],'dly',{label:'Delay',min:0,max:1});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-w').onclick=()=>{water=1;};MM.$('#b-p').onclick=prune;MM.$('#b-n').onclick=reseed;}};
function prune(){let b=-1,m=-1;hits.forEach((h,k)=>{if(!st.mute[k]&&pruned[k]===0&&h>m){m=h;b=k;}});if(b>=0){pruned[b]=Math.ceil(2*L(b)/0.25/st.speed);hits[b]=0;MM.toast('Pruned '+['α','β','γ','δ','ε','ζ'][b]);}}
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Two levels (default)':{},'Background only':P({attn:0.1,bell:0,rev:0.85,speed:0.6}),'Close listening':P({attn:0.9,bell:0.8,growth:0.6,dly:0.5}),'Long airport orbits':P({L0:23.5,L1:25.9,L2:29.6,L3:31.4,L4:37.2,L5:41.1,attn:0.3}),'Fast planets':P({speed:3,attn:0.7,scale:'hira',growth:0.5})};}
MM.init(cfg);
