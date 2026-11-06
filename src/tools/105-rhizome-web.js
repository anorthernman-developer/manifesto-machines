/*META
{"title": "Rhizome Web", "deep": true, "category": "nature/philosophy", "date": "2026-11-06", "kicker": "NATURE / PHILOSOPHY · A NON-HIERARCHICAL NETWORK WITH MANY ENTRY POINTS", "bpm": 96, "idea": "A rhizome is a figure for a non-hierarchical network: any node can connect to any other, there is no single root, and you can enter the web at many points. Here six sample nodes sit on a signal-flag hoist. You (or auto-grow) draw rope edges between them. When a node fires it may trigger neighbours after a hyphae delay; density, branching chance and decay shape how far the pulse travels. Click any flag to enter.", "controls": "7 slots (nodes 1 to 6, soil bed); click nodes to fire (entry points); drag between nodes to draw or erase edges; auto-grow edges; hyphae delay, density, branching chance and decay; key and scale; reverb and levels; a signal-flag VJ view.", "how": "Press PLAY: pulses travel along the ropes. Click a flag to enter the web at that node. Drag from one flag to another to add or remove a rope. Press G to auto-grow a few edges, X to clear edges, E to fire a random entry. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen hoist view.", "fonts": "family=Oswald:wght@500;600;700&family=Source+Sans+3:wght@400;600", "try": ["Clear the edges, then draw a ring connecting all six nodes. Set branching high and decay low: pulses will keep circling.", "Load six different one-shots into the node slots. Click node 3 as your only entry for a minute, then click node 6: two different maps of the same web.", "Raise hyphae delay and record the slow relays as a take."], "manifesto": {"name": "The rhizome: a non-hierarchical network of connections", "short": "Rhizome Web", "author": "Inspired by the philosophical figure of the rhizome as a model of decentralised connection", "year": "Late twentieth-century theory; older botanical sense", "where": "Philosophy, ecology and network thinking", "ideas": ["In our words: a rhizome has no single root; any point can connect to any other.", "In our words: multiple entry points mean the piece can start from whichever node you click.", "In our words: connection is local and can branch, die back and regrow.", "In our words: delay along a link (hyphae delay) turns space into rhythm.", "In our words: hierarchy is optional; the web does not need a centre."], "quotes": [], "system": "Six nodes hold positions on the canvas. Edges are undirected links with a delay. When a node fires its sample (pitched in the shared key/scale), each neighbour is scheduled with probability equal to the branching chance, attenuated by decay per hop, after hyphae delay milliseconds scaled by edge length. Auto-grow adds random edges. A soil bed can loop quietly underneath.", "dubious": "The rhizome is a broad philosophical figure with a specific published history; this tool uses the everyday network reading only and does not reproduce any protected text."}, "design": {"name": "Signal-flag hoist: maritime International Code of Signals style with bold coloured rectangular flags, rope and navy ground", "short": "Signal-flag hoist", "who": "Maritime signal-flag designers and naval signalling manuals", "era": "Nineteenth century to the present", "hallmarks": ["Bold rectangular flags with simple geometric emblems in flat primary colours.", "Rope and hoist graphics on a navy ground.", "Clear numbered positions along a yardarm or mast."], "works": ["Look up the International Code of Signals flag charts in maritime museums", "Look up historic naval signal-flag plates and hoist diagrams", "Search for maritime flag alphabet posters and training charts"]}}
*/
/*CSS
:root{--bg:#0b1c33;--fg:#e8eef6;--acc:#e2b73a;--bar-bg:#071326;--bar-fg:#e8eef6;--bar-font:'Source Sans 3',sans-serif;--learn-font:'Source Sans 3',sans-serif;--learn-bg:#e8eef6;--deck-bg:#102744;--head-font:'Oswald',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#0b1c33}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #e2b73a;font:400 11.5px 'Source Sans 3';background:#102744;color:#e8eef6}
#side h3{font:600 14px 'Oswald';letter-spacing:.08em;color:#e2b73a;margin:12px 0 2px;border-bottom:1px solid #2a4a70}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Source Sans 3'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:600 11px 'Oswald';border:1.5px solid #e2b73a;background:transparent;color:#e2b73a;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#e2b73a;color:#0b1c33}
#mm-learn-dlg h2{font:600 34px/1.05 'Oswald'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Rhizome Web: signal-flag nodes linked by ropes with pulses travelling along edges"></canvas></div>
<div id="side"><div class="bt"><button id="b-g">G · GROW EDGES</button><button id="b-x">X · CLEAR EDGES</button><button id="b-e">E · RANDOM ENTRY</button></div><p style="margin:2px 0;opacity:.8">Click a flag to enter. Drag between flags to add or erase a rope.</p>
<h3>Network</h3><div id="c0"></div><h3>Pulse</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const FCOLS=[['#e8eef6','#c42828'],['#e8eef6','#1e4d8c'],['#e2b73a','#0b1c33'],['#c42828','#e8eef6'],['#1e4d8c','#e2b73a'],['#2a8f5a','#e8eef6']];
const st=MMX.bind({delay:0.35,branch:0.7,decay:0.55,dens:0.6,auto:0.15,key:2,scale:'dorian',rev:0.35,bed:0.35,lv:0.9,every:4});
let N={},cv,nodes=[],edges=[],pulses=[],pending=[],bedNode=null,dragFrom=-1,level=0,lastEntry=-1;
function layoutNodes(){const P=[[0.18,0.35],[0.38,0.22],[0.62,0.25],[0.82,0.38],[0.55,0.62],[0.30,0.68]];nodes=P.map((p,i)=>({i,x:p[0],y:p[1],hit:0,ring:0}));}
function edgeIx(a,b){const A=Math.min(a,b),B=Math.max(a,b);return edges.findIndex(e=>e.a===A&&e.b===B);}
function toggleEdge(a,b){if(a===b)return;const ix=edgeIx(a,b);if(ix>=0)edges.splice(ix,1);else edges.push({a:Math.min(a,b),b:Math.max(a,b),use:0});}
function grow(){for(let k=0;k<3;k++){const a=(R()*6)|0,b=(R()*6)|0;if(a!==b&&edgeIx(a,b)<0)edges.push({a:Math.min(a,b),b:Math.max(a,b),use:0});}if(!edges.length)for(let i=0;i<6;i++)edges.push({a:i,b:(i+1)%6,use:0});}
function neighbors(i){const out=[];edges.forEach(e=>{if(e.a===i)out.push(e.b);else if(e.b===i)out.push(e.a);});return out;}
function fireNode(i,t,hop,amp){if(amp<0.08||hop>6)return;const n=nodes[i],midi=MM.deg((i*2)%7,st.scale,48+st.key),semis=midi-48+(hop%2?0:12);
  n.hit=performance.now()+Math.max(0,(t-MM.now)*1000);n.ring=n.hit;
  MMX.fire(i,t,{semis,gain:st.lv*amp*(0.55+0.45*st.dens),dur:0.6+amp*0.8,maxDur:2.5,rev:st.rev,pan:(n.x-0.5)*1.4,dest:N.bus,cut:900+amp*8000});
  lastEntry=i;neighbors(i).forEach(j=>{if(R()>st.branch)return;const e=edges[edgeIx(i,j)];if(!e)return;e.use=Math.min(20,e.use+1);
    const dist=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y),del=st.delay*(0.4+dist*1.6);pending.push({i:j,t:t+del,hop:hop+1,amp:amp*st.decay});
    pulses.push({a:i,b:j,t0:t,dur:del,amp});});}
function step(i,t,sd){const t1=t+sd;if(i%Math.max(1,Math.round(st.every))===0&&st.auto>0&&R()<st.auto)fireNode((R()*6)|0,t,0,0.9);
  pending=pending.filter(p=>{if(p.t<t1){fireNode(p.i,Math.max(t,p.t),p.hop,p.amp);return false;}return true;});
  pulses=pulses.filter(p=>MM.now<p.t0+p.dur+0.3);}
function posOf(n,W,H,pad){return{x:pad+n.x*(W-pad*2),y:pad+60+n.y*(H-pad*2-100)};}
function nearest(x,y){const W=cv.w,H=cv.h,pad=24;let best=-1,bd=40;nodes.forEach((n,i)=>{const p=posOf(n,W,H,pad),d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=i;}});return best;}
function draw(){cv.fit();const g=cv.g,W=cv.w,H=cv.h,pad=24,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.2;
  g.fillStyle=vj?'#050e1c':'#0b1c33';g.fillRect(0,0,W,H);
  // mast and yardarm
  g.strokeStyle='#8a9bb0';g.lineWidth=4;g.beginPath();g.moveTo(pad+10,40);g.lineTo(pad+10,H-40);g.stroke();g.lineWidth=3;g.beginPath();g.moveTo(pad,70);g.lineTo(W-pad,70);g.stroke();
  g.fillStyle='#e8eef6';g.font=`600 ${Math.min(34,W*0.04)}px 'Oswald'`;g.fillText('RHIZOME WEB',pad+28,48);g.font="600 11px 'Source Sans 3'";g.fillStyle='#e2b73a';g.fillText(`NO ROOT · MANY ENTRIES · ${NM[st.key]} ${st.scale.toUpperCase()} · EDGES ${edges.length}`,pad+28,64);
  // ropes
  edges.forEach(e=>{const A=posOf(nodes[e.a],W,H,pad),B=posOf(nodes[e.b],W,H,pad);g.strokeStyle='#c4d0e0';g.globalAlpha=0.35+Math.min(0.5,e.use*0.04);g.lineWidth=2;g.beginPath();g.moveTo(A.x,A.y);g.lineTo(B.x,B.y);g.stroke();g.globalAlpha=1;});
  // travelling pulses
  pulses.forEach(p=>{const age=(MM.now-p.t0)/p.dur;if(age<0||age>1)return;const A=posOf(nodes[p.a],W,H,pad),B=posOf(nodes[p.b],W,H,pad),x=A.x+(B.x-A.x)*age,y=A.y+(B.y-A.y)*age;
    g.fillStyle='#e2b73a';g.globalAlpha=0.4+p.amp*0.6;g.beginPath();g.arc(x,y,4+p.amp*5,0,TAU);g.fill();g.globalAlpha=1;});
  // flags
  nodes.forEach((n,i)=>{const p=posOf(n,W,H,pad),fw=42,fh=28,cols=FCOLS[i],hit=Math.exp(-(pn-n.hit)/500)*(pn>=n.hit?1:0);
    g.strokeStyle='#c4d0e0';g.lineWidth=2;g.beginPath();g.moveTo(p.x,70);g.lineTo(p.x,p.y);g.stroke();
    g.fillStyle=cols[0];g.fillRect(p.x-fw/2,p.y-fh/2,fw,fh);g.fillStyle=cols[1];
    if(i%3===0){g.beginPath();g.moveTo(p.x,p.y-fh/2+4);g.lineTo(p.x+fw/2-4,p.y);g.lineTo(p.x,p.y+fh/2-4);g.lineTo(p.x-fw/2+4,p.y);g.fill();}
    else if(i%3===1){g.fillRect(p.x-fw/2,p.y-4,fw,8);g.fillRect(p.x-4,p.y-fh/2,8,fh);}
    else{g.beginPath();g.arc(p.x,p.y,8,0,TAU);g.fill();}
    g.strokeStyle='#e2b73a';g.lineWidth=hit>0.05?3:1;g.strokeRect(p.x-fw/2,p.y-fh/2,fw,fh);
    if(hit>0.05){g.strokeStyle='#e2b73a';g.globalAlpha=hit;g.beginPath();g.arc(p.x,p.y,20+hit*20,0,TAU);g.stroke();g.globalAlpha=1;}
    g.fillStyle='#e8eef6';g.font="700 12px 'Oswald'";g.textAlign='center';g.fillText(String(i+1),p.x,p.y+fh/2+16);g.textAlign='left';});
  if(dragFrom>=0){const p=posOf(nodes[dragFrom],W,H,pad);g.strokeStyle='#e2b73a';g.setLineDash([6,4]);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x,p.y);g.stroke();g.setLineDash([]);}
  g.fillStyle='#8a9bb0';g.font="600 11px 'Source Sans 3'";g.fillText(lastEntry>=0?'LAST ENTRY  FLAG '+(lastEntry+1):'CLICK ANY FLAG TO ENTER',pad,H-18);}
let dragPt=null;
function hit(x,y,ph){const i=nearest(x,y);if(ph==='down'){if(i>=0){dragFrom=i;dragPt={x,y};fireNode(i,MM.now+0.02,0,1);}return;}
  if(ph==='move'&&dragFrom>=0)dragPt={x,y};
  if(ph==='up'&&dragFrom>=0){const j=nearest(x,y);if(j>=0&&j!==dragFrom)toggleEdge(dragFrom,j);dragFrom=-1;dragPt=null;}}
// patch draw to show drag line
const _draw=draw;window.__rzDraw=function(){_draw();if(dragFrom>=0&&dragPt&&cv){const g=cv.g,p=posOf(nodes[dragFrom],cv.w,cv.h,24);g.strokeStyle='#e2b73a';g.setLineDash([6,4]);g.lineWidth=2;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(dragPt.x,dragPt.y);g.stroke();g.setLineDash([]);}};
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};const F0=146.83;
const FBS={n0:()=>mk(1.4,t=>Math.sin(TAU*F0*t)*Math.exp(-t*2)*Math.min(1,t*100)),n1:()=>mk(1.2,t=>(Math.sin(TAU*F0*1.25*t)+0.4*Math.sin(TAU*F0*2.5*t))*Math.exp(-t*2.4)*Math.min(1,t*120)),
  n2:()=>mk(1.0,t=>Math.sin(TAU*F0*1.5*t)*Math.exp(-t*3)*Math.min(1,t*150)),n3:()=>mk(1.6,t=>(Math.sin(TAU*F0*0.75*t)+0.3*Math.sin(TAU*F0*2*t))*Math.exp(-t*1.8)*Math.min(1,t*80)),
  n4:()=>mk(0.9,t=>(Math.sin(TAU*F0*2*t)+0.5*Math.sin(TAU*F0*3*t))*Math.exp(-t*4)*Math.min(1,t*200)),n5:()=>mk(1.3,t=>Math.sin(TAU*F0*1.12*t*(1+0.01*Math.sin(TAU*5*t)))*Math.exp(-t*2.2)*Math.min(1,t*100)),
  soil:()=>{let lp=0;return mk(5,t=>{lp+=0.04*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/5)**1.1;});}};
const cfg={bpm:96,div:4,step,draw:()=>{draw();if(dragFrom>=0&&dragPt&&cv){const g=cv.g,p=posOf(nodes[dragFrom],cv.w,cv.h,24);g.strokeStyle='#e2b73a';g.setLineDash([6,4]);g.lineWidth=2;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(dragPt.x,dragPt.y);g.stroke();g.setLineDash([]);}},
  start:()=>{pending=[];pulses=[];MM.ensure();if(!bedNode)bedNode=MMX.fire(6,MM.now+0.05,{loop:true,dur:7200,gain:0.45,dest:N.bedG});},
  stop:()=>{if(bedNode){bedNode.stop(MM.ctx.currentTime);bedNode=null;}},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:1.5,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='g')grow();else if(k==='x')edges=[];else if(k==='e')fireNode((R()*6)|0,MM.now+0.02,0,1);else if(k>='1'&&k<='6')fireNode(+k-1,MM.now+0.02,0,1);},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);N.bedG=c.createGain();N.bedG.gain.value=st.bed;N.bedG.connect(N.bus);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());layoutNodes();grow();cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Node 1','n0'],['Node 2','n1'],['Node 3','n2'],['Node 4','n3'],['Node 5','n4'],['Node 6','n5'],['Soil bed','soil']].map(([label,kind],i)=>({label,kind,rv:0.2,gain:i===6?0.5:0.9})),
      onSlot:i=>{if(!MM.playing){if(i<6)fireNode(i,MM.now+0.02,0,1);else MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});}if(i===6&&bedNode){bedNode.stop(MM.ctx.currentTime);bedNode=MMX.fire(6,MM.now+0.05,{loop:true,dur:7200,gain:0.45,dest:N.bedG});}},
      onTrim:()=>{},onPreset:()=>{N.bedG.gain.value=st.bed;},factory:fac(),
      extra:{get:()=>({edges:edges.map(e=>({a:e.a,b:e.b})),nodes:nodes.map(n=>({x:n.x,y:n.y}))}),set:x=>{if(x&&x.edges)edges=x.edges.map(e=>({a:e.a,b:e.b,use:0}));}},
      keys:[['G','auto-grow edges'],['X','clear edges'],['E','random entry'],['1 to 6','fire that node'],['drag','add or erase a rope']],midiHelp:'Notes 36 to 47 set the key. CC 1 branching, CC 2 delay.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'auto',{label:'Auto entries',min:0,max:1,hint:'Chance each cycle to fire a random entry'});MMX.ctl(C[0],'every',{label:'Auto every N steps',min:1,max:16,step:1});MMX.ctl(C[0],'bed',{label:'Soil bed',min:0,max:1.2,on:v=>{N.bedG&&(N.bedG.gain.value=v);}});
    MMX.ctl(C[1],'delay',{label:'Hyphae delay',min:0.05,max:1.5,cc:2});MMX.ctl(C[1],'branch',{label:'Branching chance',min:0,max:1,cc:1});MMX.ctl(C[1],'decay',{label:'Decay per hop',min:0.15,max:0.95});MMX.ctl(C[1],'dens',{label:'Density / amplitude',min:0.2,max:1});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['dorian','Dorian'],['minor','Minor'],['major','Major'],['penta','Pentatonic'],['minpent','Minor pentatonic'],['whole','Whole-tone']]});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-g').onclick=grow;MM.$('#b-x').onclick=()=>edges=[];MM.$('#b-e').onclick=()=>fireNode((R()*6)|0,MM.now+0.02,0,1);}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=(o,ex)=>({full:{params:Object.assign({},b0,o),extra:ex||null}});
  return{'Open web (default)':{},'Slow hyphae':P({delay:1.0,branch:0.85,decay:0.7,auto:0.05}),'Dense thicket':P({branch:0.95,decay:0.85,auto:0.4,every:2}),'Sparse relays':P({branch:0.4,decay:0.4,delay:0.6,auto:0.1}),'No auto, hand only':P({auto:0})};}
MM.init(cfg);
