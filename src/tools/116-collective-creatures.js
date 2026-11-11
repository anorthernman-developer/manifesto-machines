/*META
{"title": "Collective Creatures", "deep": true, "category": "art manifesto", "date": "2026-11-11", "kicker": "ART MANIFESTO · COBRA: SPONTANEOUS, COLLECTIVE, CHILDLIKE MAKING", "bpm": 96, "idea": "CoBrA (1948 to 1951), named after three cities, Copenhagen, Brussels and Amsterdam, rejected polished abstraction for spontaneous, collective work drawn from children's drawings, folk art and myth. Collective Creatures gives three players a page each. Scribble a creature and its line becomes a loop: height is pitch, speed is loudness, length is time. Turn up COLLECTIVE and the creatures start copying fragments of each other, so no single hand owns the piece.", "controls": "7 slots (two voices for each of three players plus a carved knock); per player: loop length in bars, octave, level and mute; collective (how much the creatures borrow from each other), spontaneity (random wobble in time and pitch), quantise; key and scale; child's hand (the machine scribbles for you); a linocut-print VJ view.", "how": "Press PLAY: three creatures already play. Scribble on any of the three panels to draw a new creature: its line is its tune. Press C for a child's hand scribble on a random panel, X to wipe the selected panel, 1 to 3 to select a panel. Raise COLLECTIVE to let them borrow from each other. Open the deck (D) to load your own sounds and trim each with the S and E handles. Press F for the full-screen print.", "fonts": "family=Rubik+Mono+One&family=Rubik:wght@400;600", "try": ["Hand the mouse to someone else for panel 2 and a third person for panel 3. Each draws without looking at the others. Then raise COLLECTIVE.", "Load a child's voice, a pan lid and a whistle (recorded by you) into the A voices and draw quick zigzags: fast lines play loud.", "Set quantise to zero and spontaneity high, draw one slow spiral on each panel, and let the loops of different bar lengths drift."], "manifesto": {"name": "CoBrA: the manifesto of spontaneous, collective, experimental art against polished abstraction (1948)", "short": "CoBrA", "author": "Inspired by the CoBrA group of artists from Copenhagen, Brussels and Amsterdam, 1948 to 1951", "year": "1948 to 1951", "where": "Copenhagen, Brussels and Amsterdam", "ideas": ["In our words: art should be spontaneous, not planned out in advance or made to look finished.", "In our words: children's drawings, folk art and the art of people outside the academies show a freer way of making.", "In our words: work made together by several people is as valid as work made alone; collective painting was part of the practice.", "In our words: bright colour, rough line and invented creatures are a way back to direct feeling after the war.", "In our words: experiment matters more than style."], "quotes": [], "system": "Each panel stores a scribble as points with time, height and speed. The scribble is resampled into up to 32 events spread over that player's loop length in bars. On each sixteenth step, events whose position falls on the step play the player's A voice (or B voice for fast strokes) at a scale degree from the height, with gain from the speed. Spontaneity adds small random shifts to time and pitch on every pass; quantise pulls events to the beat. COLLECTIVE, on each loop pass, copies a short run of events from another player into this one, transposed to its own octave. A carved knock marks each player's loop start.", "dubious": "CoBrA's founding texts are by members some of whom died recently enough to be in copyright, so nothing is quoted. The ideas are summarised in our own words."}, "design": {"name": "Linocut print: hand-carved relief blocks with thick black line, gouge marks, rough edges and one flat colour, printed on off-white paper", "short": "Linocut print", "who": "Relief printmakers and poster-workshop printers", "era": "1900s to now", "hallmarks": ["Thick, uneven black lines with the marks of the carving gouge left in.", "A single flat second colour printed slightly out of register.", "Rough, hand-cut lettering and generous off-white paper margins."], "works": ["Look up early 20th-century linocut prints in museum print collections", "Search for workshop linocut posters and relief-print lettering", "Look up reduction linocut technique (one block, several colours)"]}}
*/
/*CSS
:root{--bg:#efe9dc;--fg:#141210;--acc:#141210;--bar-bg:#141210;--bar-fg:#efe9dc;--bar-font:'Rubik',sans-serif;--learn-font:'Rubik',sans-serif;--learn-bg:#f6f1e6;--deck-bg:#f6f1e6;--head-font:'Rubik Mono One',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 300px}
#view{position:relative;overflow:hidden;background:#efe9dc}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;touch-action:none}
#side{overflow:auto;padding:8px 14px 14px;border-left:4px solid #141210;font:400 12px 'Rubik';background:#f6f1e6;color:#141210}
#side h3{font:400 13px 'Rubik Mono One';margin:12px 0 2px;border-bottom:3px solid #141210}
#side .mmx-ctl{grid-template-columns:100px 1fr 40px;font:400 12px 'Rubik'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:600 11px 'Rubik';border:2.5px solid #141210;background:transparent;color:#141210;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#141210;color:#efe9dc}
#mm-learn-dlg h2{font:400 30px/1.1 'Rubik Mono One'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Collective Creatures: three linocut panels where each scribbled creature is a loop"></canvas></div>
<div id="side"><div class="bt"><button id="b-c">C · CHILD'S HAND</button><button id="b-x">X · WIPE PANEL</button></div><p style="margin:2px 0;opacity:.75">Scribble on a panel: the line is the tune.</p>
<h3>Collective</h3><div id="c0"></div><h3>Players</h3><div id="c1"></div><h3>Tuning</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const CITY=['COPENHAGEN','BRUSSELS','AMSTERDAM'];
const st=MMX.bind({coll:0.3,spont:0.25,quant:0.6,bars0:1,bars1:2,bars2:3,oct0:0,oct1:1,oct2:-1,g0:0.9,g1:0.8,g2:0.85,m0:false,m1:false,m2:false,knock:0.6,key:7,scale:'minpent',rev:0.25,lv:0.95,sel:0});
let N={},cv,P=[[],[],[]],ev=[[],[],[]],drawing=null,panels=[],flashE=[[],[],[]],level=0,passes=[0,0,0],borrowed=[0,0,0];
function toEvents(k){const pts=P[k];if(pts.length<2){ev[k]=[];return;}let tot=0;const L=[0];for(let j=1;j<pts.length;j++){tot+=Math.hypot(pts[j].x-pts[j-1].x,pts[j].y-pts[j-1].y);L.push(tot);}
  const n=clamp(Math.round(tot/0.06),3,32),steps=16*st['bars'+k],out=[];let j=0;
  for(let e=0;e<n;e++){const target=tot*e/n;while(j<L.length-1&&L[j+1]<target)j++;const p=pts[j],q=pts[Math.min(j+1,pts.length-1)],dt=Math.max(1,q.t-p.t),sp=Math.hypot(q.x-p.x,q.y-p.y)/dt*1000;
    out.push({s:(e/n)*steps,d:Math.round((1-p.y)*10)-2,v:clamp(0.35+sp*0.5,0.3,1),fast:sp>0.9,x:p.x,y:p.y});}ev[k]=out;}
function childScribble(k){const pts=[];let x=0.15+R()*0.2,y=0.5,t=0;const n=30+((R()*30)|0),dx=(0.92-x)/n;let vy=0;y=0.3+R()*0.4;for(let j=0;j<n;j++){x+=dx*(0.6+R()*0.8);vy=vy*0.7+(R()-0.5)*0.06;y=clamp(y+vy+Math.sin(j*0.45)*0.02,0.12,0.88);t+=15+R()*70;pts.push({x:clamp(x,0.05,0.95),y,t});}P[k]=pts;toEvents(k);MM.toast(CITY[k]+': child\u2019s hand');}
[0,1,2].forEach(childScribble);
function step(i,t,sd){for(let k=0;k<3;k++){const steps=16*st['bars'+k],s=i%steps;if(s===0){passes[k]++;MMX.fire(6,t,{gain:st.knock*st.lv*(k===0?1:0.7),maxDur:0.3,pan:(k-1)*0.6,dest:N.bus});
      if(st.coll>0&&R()<st.coll&&ev[(k+1)%3].length>3){const src=ev[R()<0.5?(k+1)%3:(k+2)%3],a=(R()*(src.length-3))|0,run=src.slice(a,a+2+((R()*4)|0)),at=R()*steps;run.forEach((e,j)=>{if(ev[k].length<40)ev[k].push(Object.assign({},e,{s:(at+j*(1+R()))%steps,borrowed:1}));});borrowed[k]+=run.length;ev[k].sort((x,y)=>x.s-y.s);}}
    if(st['m'+k])continue;ev[k].forEach(e=>{let pos=e.s;if(st.quant>0){const q=Math.round(pos/2)*2;pos=pos+(q-pos)*st.quant;}if(Math.floor(pos)!==s)return;
      const jitter=(R()-0.5)*st.spont*sd,dd=e.d+(R()<st.spont*0.4?(R()<0.5?-1:1):0),midi=MM.deg(dd,st.scale,48+st.key+12*st['oct'+k]);
      MMX.fire(k*2+(e.fast?1:0),t+(pos-Math.floor(pos))*sd+Math.max(0,jitter),{semis:midi-48,gain:st['g'+k]*st.lv*e.v*0.8,dur:sd*(e.fast?1.2:3),maxDur:1.5,rev:st.rev,pan:(k-1)*0.55+(e.x-0.5)*0.3,dest:N.bus});e.hit=performance.now();});}}
function jag(g,x0,y0,x1,y1,seed){const n=Math.max(2,Math.round(Math.hypot(x1-x0,y1-y0)/6));g.moveTo(x0,y0);for(let j=1;j<=n;j++){const f=j/n,w=Math.sin(seed*13.7+j*5.1)*1.6;g.lineTo(x0+(x1-x0)*f+w,y0+(y1-y0)*f+Math.cos(seed*7.3+j*3.3)*1.6);}}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,vj=MMX.vjOn,lv=MMX.level(),now=performance.now();level+=(lv.rms-level)*0.2;
  const PAPER=vj?'#141210':'#efe9dc',INK=vj?'#efe9dc':'#141210',RED='#CC2018';g.fillStyle=PAPER;g.fillRect(0,0,W,H);
  g.fillStyle=INK;g.font=`400 ${Math.min(30,W*0.032)}px 'Rubik Mono One'`;g.textAlign='left';g.fillText('COLLECTIVE CREATURES',20,42);g.font="600 12px 'Rubik'";g.fillText(`CO · BR · A · ${NM[st.key]} ${st.scale.toUpperCase()} · COLLECTIVE ${Math.round(st.coll*100)}%`,20,60);
  panels=[];const top=76,pw=(W-50)/3,ph=H-top-24;
  for(let k=0;k<3;k++){const x=15+k*(pw+10),y=top;panels.push([x,y,pw,ph]);const sel=(st.sel|0)===k;
    // carved block border
    g.strokeStyle=INK;g.lineWidth=sel?6:4;g.beginPath();jag(g,x,y,x+pw,y,k+1);jag(g,x+pw,y,x+pw,y+ph,k+2);jag(g,x+pw,y+ph,x,y+ph,k+3);jag(g,x,y+ph,x,y,k+4);g.stroke();
    // gouge marks
    g.lineWidth=1.5;g.globalAlpha=0.35;for(let j=0;j<14;j++){const gx=x+10+((j*53+k*31)%Math.max(1,pw-30)),gy=y+10+((j*37+k*17)%Math.max(1,ph-30));g.beginPath();g.moveTo(gx,gy);g.lineTo(gx+8+(j%3)*4,gy+2);g.stroke();}g.globalAlpha=1;
    g.font="400 12px 'Rubik Mono One'";g.fillStyle=INK;g.fillText(CITY[k],x+10,y+ph-12);g.font="600 11px 'Rubik'";g.fillText(`${st['bars'+k]} BAR${st['bars'+k]>1?'S':''} · ${ev[k].length} MARKS${st['m'+k]?' · MUTED':''}`,x+10,y+20);
    // creature line, offset red print slightly out of register
    const pts=P[k];if(pts.length>1){const map=p=>[x+p.x*pw,y+p.y*ph];
      g.strokeStyle=RED;g.lineWidth=10+level*8;g.lineCap='round';g.lineJoin='round';g.globalAlpha=0.9;g.beginPath();pts.forEach((p,j)=>{const[a,b]=map(p);j?g.lineTo(a+4,b+3):g.moveTo(a+4,b+3);});g.stroke();g.globalAlpha=1;
      g.strokeStyle=INK;g.lineWidth=4;g.beginPath();pts.forEach((p,j)=>{const[a,b]=map(p);j?g.lineTo(a+Math.sin(j)*0.8,b):g.moveTo(a,b);});g.stroke();
      // eyes at the head of the creature
      const[hx,hy]=map(pts[pts.length-1]);g.fillStyle=PAPER;g.strokeStyle=INK;g.lineWidth=3;[[-7,-6],[7,-8]].forEach(([dx,dy])=>{g.beginPath();g.arc(hx+dx,hy+dy,6,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(hx+dx+1,hy+dy+1,2.5,0,TAU);g.fill();g.fillStyle=PAPER;});}
    // events
    ev[k].forEach(e=>{const ex=x+e.x*pw,ey=y+e.y*ph,f=e.hit?clamp(1-(now-e.hit)/300,0,1):0;g.fillStyle=INK;g.beginPath();g.arc(ex,ey,3+f*9,0,TAU);g.fill();if(e.borrowed){g.fillStyle=PAPER;g.beginPath();g.arc(ex,ey,1.6+f*4,0,TAU);g.fill();}});}
  if(drawing){const[x,y,pw,ph]=panels[drawing.k];g.strokeStyle=INK;g.lineWidth=4;g.beginPath();drawing.pts.forEach((p,j)=>{j?g.lineTo(x+p.x*pw,y+p.y*ph):g.moveTo(x+p.x*pw,y+p.y*ph);});g.stroke();}}
function panelAt(x,y){return panels.findIndex(([px,py,pw,ph])=>x>=px&&x<=px+pw&&y>=py&&y<=py+ph);}
function hit(x,y,ph){if(ph==='down'){const k=panelAt(x,y);if(k<0)return;st.sel=k;const[px,py,pw,phh]=panels[k];drawing={k,pts:[{x:(x-px)/pw,y:(y-py)/phh,t:performance.now()}]};}
  else if(ph==='move'&&drawing){const[px,py,pw,phh]=panels[drawing.k];drawing.pts.push({x:clamp((x-px)/pw,0,1),y:clamp((y-py)/phh,0,1),t:performance.now()});}
  else if((ph==='up'||ph==='leave')&&drawing){if(drawing.pts.length>3){P[drawing.k]=drawing.pts;toEvents(drawing.k);MM.toast(CITY[drawing.k]+': new creature');}drawing=null;}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={cA:()=>mk(1,t=>(Math.sin(TAU*130.8*t)+0.5*Math.sign(Math.sin(TAU*130.8*t))*0.3)*Math.exp(-t*3)*Math.min(1,t*200)),cB:()=>mk(0.3,t=>Math.sin(TAU*130.8*t*(1+0.02*Math.sin(TAU*30*t)))*Math.exp(-t*12)),
  bA:()=>mk(1,t=>{let v=0;for(let h=1;h<6;h++)v+=Math.sin(TAU*130.8*h*t)/(h*h);return v*Math.exp(-t*2.5)*Math.min(1,t*100);}),bB:()=>mk(0.25,t=>(Math.random()*2-1)*0.4*Math.exp(-t*30)+Math.sin(TAU*261.6*t)*Math.exp(-t*15)),
  aA:()=>mk(1.2,t=>Math.sin(TAU*130.8*t+2*Math.sin(TAU*261.6*t)*Math.exp(-t*4))*Math.exp(-t*2)*Math.min(1,t*300)),aB:()=>mk(0.3,t=>Math.sin(TAU*130.8*2*t)*Math.exp(-t*14)),
  knock:()=>mk(0.25,t=>(Math.sin(TAU*(120*t+100*(1-Math.exp(-t*40))/40))*0.7+(Math.random()*2-1)*0.3*Math.exp(-t*60))*Math.exp(-t*14))};
const cfg={bpm:96,div:4,swing:0,step,draw,start:()=>{},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:2,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if('123'.includes(k)&&k.length===1){st.sel=+k-1;MM.toast(CITY[st.sel]);}else if(k==='c')childScribble((R()*3)|0);else if(k==='x'){P[st.sel|0]=[];ev[st.sel|0]=[];MM.toast('Wiped '+CITY[st.sel|0]);}},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Copenhagen A','cA'],['Copenhagen B (fast)','cB'],['Brussels A','bA'],['Brussels B (fast)','bB'],['Amsterdam A','aA'],['Amsterdam B (fast)','aB'],['Carved knock','knock']].map(([label,kind])=>({label,kind,rv:0.1,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});},onTrim:()=>{},onPreset:()=>{[0,1,2].forEach(toEvents);},
      factory:fac(),extra:{get:()=>({P}),set:x=>{if(x&&Array.isArray(x.P)&&x.P.length===3){P=x.P.map(a=>a.slice());[0,1,2].forEach(toEvents);}}},
      keys:[['drag','scribble a creature (its line is its tune)'],['1-3','select a panel'],['C',"child's hand: random scribble"],['X','wipe the selected panel']],
      midiHelp:'Notes 36 to 38 give panels 1 to 3 a child\u2019s-hand scribble. CC 1 collective, CC 2 spontaneity.',midi:(n,v,on)=>{if(on&&n>=36&&n<39)childScribble(n-36);}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'coll',{label:'Collective',min:0,max:1,cc:1});MMX.ctl(C[0],'spont',{label:'Spontaneity',min:0,max:1,cc:2});MMX.ctl(C[0],'quant',{label:'Quantise',min:0,max:1});
    [0,1,2].forEach(k=>{MMX.ctl(C[1],'bars'+k,{label:CITY[k].slice(0,4)+' bars',min:1,max:8,step:1,on:()=>toEvents(k)});MMX.ctl(C[1],'oct'+k,{label:CITY[k].slice(0,4)+' octave',min:-2,max:2,step:1});MMX.ctl(C[1],'g'+k,{label:CITY[k].slice(0,4)+' level',min:0,max:1.5});MMX.ctl(C[1],'m'+k,{type:'check',label:CITY[k].slice(0,4)+' mute'});});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['minpent','Minor pent'],['penta','Pentatonic'],['dorian','Dorian'],['phrygian','Phrygian'],['blues','Blues'],['whole','Whole-tone']]});
    MMX.ctl(C[3],'knock',{label:'Carved knock',min:0,max:1.2});MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-c').onclick=()=>childScribble((R()*3)|0);MM.$('#b-x').onclick=()=>{P[st.sel|0]=[];ev[st.sel|0]=[];};}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),Pp=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Three hands (default)':{},'All together':Pp({coll:0.85,spont:0.4}),'Each alone':Pp({coll:0,quant:1}),'Wild children':Pp({spont:0.9,quant:0,coll:0.5,scale:'whole'}),'Long creatures':Pp({bars0:2,bars1:3,bars2:5,rev:0.45})};}
MM.init(cfg);
