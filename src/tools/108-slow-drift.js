/*META
{"title": "Slow Drift", "deep": true, "category": "generative systems", "date": "2026-11-07", "kicker": "GENERATIVE SYSTEMS · SLOW BIAS AND DRIFT — GARDENING BY LETTING PARAMETERS WANDER", "bpm": 68, "idea": "Generative and ambient studio practice often gardens rather than architects: several loops of unequal length run while filter, gain, pitch and density slowly drift. You pin any dial to freeze it. An attend dial moves between furniture music and close listening. The piece rewards both listening and ignoring.", "controls": "7 loop slots with independent lengths (primes and unequals); global drift rate; pin toggles per parameter (filter, gain, pitch, density); attend dial (furniture to listen); reverb; optional key/scale soft snap; a cyanotype-blueprint VJ view of drifting values.", "how": "Press PLAY: unequal loops drift. Watch the cyanotype dials wander. Press P to pin the hovered parameter, U to unpin all, R to reset drift seeds. Raise ATTEND to open filters into the foreground. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen blueprint.", "fonts": "family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600", "try": ["Set drift rate high and attend near zero: leave the room. Come back, raise attend, and pin the filter you like.", "Load six field recordings into the loop slots with prime lengths. Soft-snap to a key and pin pitch so only filter and density wander.", "Press REC for four minutes. Unpin everything mid-take and let the garden rewrite itself."], "manifesto": {"name": "Generative systems: slow bias and drift — gardening by letting parameters wander until you pin them", "short": "Slow Drift", "author": "Inspired by generative and ambient studio practice since the 1970s (gardening rather than architecting)", "year": "1970s to now", "where": "Studios, quiet rooms and long listens", "ideas": ["In our words: gardening means tending and accepting growth; architecting means fixing the plan in advance.", "In our words: unequal loop lengths postpone the moment everything lines up, which keeps ambient music alive.", "In our words: parameters that slowly drift create change you notice only when you look away and back.", "In our words: pinning a dial freezes one dimension so the others can keep wandering.", "In our words: music that still works when ignored can also reward close attention."], "quotes": [], "system": "Six looping voices fire on independent period lengths (default primes). A soft bed can loop underneath. Drift rate advances hidden bias values for filter, gain, pitch offset and density; pinned parameters ignore the bias. ATTEND raises mid-voice filter cutoffs. Optional soft snap rounds pitch offsets to the chosen key and scale. The canvas draws a cyanotype schematic of the drifting values.", "dubious": "Generative and ambient studio practice has many authors and traditions; this tool uses only our own paraphrase and makes no claim about any one person's method."}, "design": {"name": "Cyanotype blueprint: white line drawings on Prussian-blue paper, title blocks and revision stamps (architectural/engineering prints)", "short": "Cyanotype blueprint", "who": "Architectural and engineering blueprint printers", "era": "Nineteenth century to mid twentieth century", "hallmarks": ["White line drawings on deep Prussian-blue paper.", "Title blocks, revision stamps and scale bars in the margin.", "Fine ruled grids and numbered callouts."], "works": ["Look up historic cyanotype architectural blueprints in museum collections", "Look up engineering print title blocks and revision stamps", "Search for Prussian-blue blueprint paper and white-line drawings"]}}
*/
/*CSS
:root{--bg:#0a3a6e;--fg:#dce9f5;--acc:#f0f6ff;--bar-bg:#062848;--bar-fg:#dce9f5;--bar-font:'Source Sans 3',sans-serif;--learn-font:'Source Sans 3',sans-serif;--learn-bg:#dce9f5;--deck-bg:#0d4a82;--head-font:'Libre Baskerville',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#0a3a6e}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #dce9f5;font:400 11.5px 'Source Sans 3';background:#0d4a82;color:#dce9f5}
#side h3{font:700 13px 'Libre Baskerville';color:#f0f6ff;margin:12px 0 2px;border-bottom:1px solid #3a6a9a}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Source Sans 3'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:600 11px 'Source Sans 3';border:1.5px solid #dce9f5;background:transparent;color:#dce9f5;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#dce9f5;color:#0a3a6e}
#mm-learn-dlg h2{font:700 30px/1.1 'Libre Baskerville'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Slow Drift: a cyanotype blueprint of drifting loop parameters you can pin"></canvas></div>
<div id="side"><div class="bt"><button id="b-p">P · PIN HOVER</button><button id="b-u">U · UNPIN ALL</button><button id="b-r">R · RESEED</button></div><p style="margin:2px 0;opacity:.8">Click a dial on the blueprint to pin or unpin it.</p>
<h3>Garden</h3><div id="c0"></div><h3>Lengths</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const PNAMES=['FILTER','GAIN','PITCH','DENSITY'],LENS=[17,19,23,29,31,37];
const st=MMX.bind({drift:0.4,att:0.35,snap:true,key:2,scale:'penta',rev:0.5,l0:17,l1:19,l2:23,l3:29,l4:31,l5:37,pinF:false,pinG:false,pinP:false,pinD:false,filt:0.45,gain:0.7,pitch:0,dens:0.65,lv:0.9});
let N={},cv,loops=[],bias={f:0.45,g:0.7,p:0,d:0.65},vel={},hover=-1,level=0,t0=0,revStamp=1;
function reseed(){['f','g','p','d'].forEach(k=>vel[k]=(R()-0.5)*0.02);revStamp++;MM.toast('Drift reseeded');}
reseed();
function len(k){return clamp(Math.round(st['l'+k]||LENS[k]),5,97);}
function live(k){if(k==='f')return st.pinF?st.filt:bias.f;if(k==='g')return st.pinG?st.gain:bias.g;if(k==='p')return st.pinP?st.pitch:bias.p;return st.pinD?st.dens:bias.d;}
function period(k){const L=len(Math.min(k,5));return k===6?1.8:clamp(1.2+L*0.08,1.5,5.5);}
function fire(k,t){const a=st.att,f=live('f'),g=live('g'),p=live('p'),d=live('d');
  let semis=Math.round(p)+(k%3-1)*2;if(st.snap){const midi=MM.deg(Math.round(p)+k,st.scale,48+st.key);semis=midi-48+(k%2?0:12);}
  const per=period(k),dur=clamp(per*1.35,1.2,8),cut=400+f*f*14000+a*a*5000;
  loops[k].hit=performance.now()+Math.max(0,(t-MM.now)*1000);loops[k].note=NM[((48+st.key+semis)%12+12)%12];
  const amp=st.lv*Math.max(0.35,g)*(0.5+0.5*a)*(k===6?0.55:0.85)*(k<6?0.55+0.45*d:1);
  MMX.fire(k,t,{semis:k===6?0:semis,gain:amp,dur,maxDur:10,fadeIn:Math.max(0.04,dur*0.2),fadeOut:Math.min(dur*0.4,2.2),pan:(k/6)*1.2-0.6,cut,rev:st.rev,dest:N.bus});}
function tick(now){const rate=st.drift*0.015;
  if(!st.pinF){bias.f=clamp(bias.f+vel.f*rate*60,0.05,0.98);if(bias.f<=0.05||bias.f>=0.98)vel.f*=-1;}
  if(!st.pinG){bias.g=clamp(bias.g+vel.g*rate*60,0.2,1);if(bias.g<=0.2||bias.g>=1)vel.g*=-1;}
  if(!st.pinP){bias.p=clamp(bias.p+vel.p*rate*80,-7,12);if(bias.p<=-7||bias.p>=12)vel.p*=-1;}
  if(!st.pinD){bias.d=clamp(bias.d+vel.d*rate*60,0.15,1);if(bias.d<=0.15||bias.d>=1)vel.d*=-1;}
  if(R()<0.01)['f','g','p','d'].forEach(k=>{if(R()<0.3)vel[k]+=(R()-0.5)*0.01;});
  loops.forEach((l,k)=>{if(!l.next)l.next=now+0.02+k*0.08;if(l.next<now-0.5)l.next=now+0.02;const per=period(k);while(l.next<now+0.15){const when=Math.max(l.next,now);if(k===6||k<Math.ceil(live('d')*7)||R()<0.85)fire(k,when);l.next+=per;}});}
function step(i,t,sd){tick(t);}
function dialLay(){const W=cv.w,H=cv.h,pad=24,dw=Math.min(120,(W-pad*2-40)/4),dh=dw;return{W,H,pad,dw,dh,y:H*0.38,xs:[0,1,2,3].map(i=>pad+20+i*(dw+16))};}
function draw(){cv.fit();const g=cv.g,L=dialLay(),{W,H,pad,dw,dh,y,xs}=L,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.15;
  const BLUE=vj?'#061828':'#0a3a6e',WHITE=vj?'#8ab4d4':'#dce9f5',BRIGHT='#f0f6ff';
  g.fillStyle=BLUE;g.fillRect(0,0,W,H);
  // grid
  g.strokeStyle=WHITE;g.globalAlpha=0.12;g.lineWidth=1;for(let x=pad;x<W-pad;x+=20){g.beginPath();g.moveTo(x,pad);g.lineTo(x,H-pad);g.stroke();}for(let yy=pad;yy<H-pad;yy+=20){g.beginPath();g.moveTo(pad,yy);g.lineTo(W-pad,yy);g.stroke();}g.globalAlpha=1;
  g.strokeStyle=WHITE;g.lineWidth=1.5;g.strokeRect(pad,pad,W-pad*2,H-pad*2);
  g.fillStyle=WHITE;g.font=`700 ${Math.min(28,W*0.032)}px 'Libre Baskerville'`;g.fillText('SLOW DRIFT',pad+12,pad+28);
  g.font="600 11px 'Source Sans 3'";g.fillStyle=BRIGHT;g.fillText(`CYANOTYPE · REV ${String(revStamp).padStart(2,'0')} · ${NM[st.key]} ${st.scale.toUpperCase()} · DRIFT ${st.drift.toFixed(2)} · ATTEND ${st.att.toFixed(2)}`,pad+12,pad+46);
  // title block
  g.strokeStyle=WHITE;g.strokeRect(W-pad-200,H-pad-70,190,58);g.font="600 10px 'Source Sans 3'";g.fillStyle=WHITE;
  g.fillText('JOB 108  ·  GARDEN',W-pad-190,H-pad-50);g.fillText('SCALE 1:'+Math.round(20+st.drift*40),W-pad-190,H-pad-34);g.fillText('PINNED '+[st.pinF,st.pinG,st.pinP,st.pinD].filter(Boolean).length+'/4',W-pad-190,H-pad-18);
  const vals=[live('f'),live('g'),(live('p')+7)/19,live('d')],pins=[st.pinF,st.pinG,st.pinP,st.pinD];
  PNAMES.forEach((name,i)=>{const x=xs[i],v=vals[i],pin=pins[i],hov=hover===i;
    g.strokeStyle=hov||pin?BRIGHT:WHITE;g.lineWidth=hov?3:1.5;g.beginPath();g.arc(x+dw/2,y+dh/2,dw*0.42,0,TAU);g.stroke();
    g.beginPath();g.moveTo(x+dw/2,y+dh/2);g.arc(x+dw/2,y+dh/2,dw*0.42,-Math.PI/2,-Math.PI/2+v*TAU*0.85,false);g.lineTo(x+dw/2,y+dh/2);g.closePath();g.globalAlpha=0.25+level*0.4;g.fillStyle=WHITE;g.fill();g.globalAlpha=1;
    g.fillStyle=WHITE;g.font="700 11px 'Source Sans 3'";g.textAlign='center';g.fillText(name,x+dw/2,y+dh+18);g.font="600 10px 'Source Sans 3'";g.fillText(pin?'PINNED':v.toFixed(2),x+dw/2,y+dh+34);g.textAlign='left';
    if(pin){g.fillStyle=BRIGHT;g.fillRect(x+dw/2-14,y-8,28,10);g.fillStyle=BLUE;g.font="700 8px 'Source Sans 3'";g.textAlign='center';g.fillText('PIN',x+dw/2,y,);g.textAlign='left';}
  });
  // loop length bars
  loops.slice(0,6).forEach((l,i)=>{const x=pad+12+i*((W-pad*2-24)/6),h=8+len(i)*1.2,hit=Math.exp(-(pn-l.hit)/400)*(pn>=l.hit?1:0);
    g.fillStyle=WHITE;g.globalAlpha=0.2+hit*0.7;g.fillRect(x,H*0.72,((W-pad*2-24)/6)-8,h);g.globalAlpha=1;g.font="600 9px 'Source Sans 3'";g.fillStyle=WHITE;g.fillText(len(i)+'s',x,H*0.72-4);});}
function hit(x,y,ph){if(ph!=='down')return;const L=dialLay();PNAMES.forEach((_,i)=>{const cx=L.xs[i]+L.dw/2,cy=L.y+L.dh/2;if(Math.hypot(x-cx,y-cy)<L.dw*0.45){hover=i;const keys=['pinF','pinG','pinP','pinD'];MMX.setParam(keys[i],!st[keys[i]]);if(st[keys[i]]){const map={pinF:['filt',live('f')],pinG:['gain',live('g')],pinP:['pitch',live('p')],pinD:['dens',live('d')]};const m=map[keys[i]];MMX.setParam(m[0],m[1]);}MM.toast(PNAMES[i]+(st[keys[i]]?' pinned':' unpinned'));}});}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const FBS={};[0,1,2,3,4,5].forEach(i=>{const f0=110*Math.pow(2,i/6);FBS['l'+i]=()=>mk(2.5,t=>{let s=0;[1,1.5,2].forEach((h,q)=>s+=Math.sin(TAU*f0*h*t)/(q+1));return s*Math.sin(Math.PI*Math.min(1,t/2.5))**1.3;});});
FBS.bed=()=>{let lp=0;return mk(4,t=>{lp+=0.03*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/4)**1.2;});};
const cfg={bpm:68,div:2,swing:0,step,draw,start:()=>{t0=MM.now;loops.forEach((l,k)=>l.next=MM.now+0.05+k*0.12);},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:2,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='p'&&hover>=0){const keys=['pinF','pinG','pinP','pinD'];MMX.setParam(keys[hover],!st[keys[hover]]);}else if(k==='u'){['pinF','pinG','pinP','pinD'].forEach(p=>MMX.setParam(p,false));MM.toast('All unpinned');}else if(k==='r')reseed();},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());
    loops=Array.from({length:7},(_,i)=>({hit:0,next:0,note:''}));cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Loop 1','l0'],['Loop 2','l1'],['Loop 3','l2'],['Loop 4','l3'],['Loop 5','l4'],['Loop 6','l5'],['Soft bed','bed']].map(([label,kind],i)=>({label,kind,rv:0.35,gain:i===6?0.5:0.85})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:3,dest:N.bus});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),extra:{get:()=>({bias:Object.assign({},bias),vel:Object.assign({},vel)}),set:x=>{if(x&&x.bias)Object.assign(bias,x.bias);if(x&&x.vel)Object.assign(vel,x.vel);}},
      keys:[['P','pin hovered dial'],['U','unpin all'],['R','reseed drift'],['click dial','pin / unpin']],midiHelp:'Notes 36 to 47 set the key. CC 1 attend, CC 2 drift rate.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'drift',{label:'Drift rate',min:0,max:1,cc:2});MMX.ctl(C[0],'att',{label:'Attend (furniture→listen)',min:0,max:1,cc:1});MMX.ctl(C[0],'pinF',{type:'check',label:'Pin filter'});MMX.ctl(C[0],'pinG',{type:'check',label:'Pin gain'});MMX.ctl(C[0],'pinP',{type:'check',label:'Pin pitch'});MMX.ctl(C[0],'pinD',{type:'check',label:'Pin density'});
    [0,1,2,3,4,5].forEach(i=>MMX.ctl(C[1],'l'+i,{label:'Length '+(i+1)+' (s)',min:5,max:61,step:1}));
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['penta','Pentatonic'],['minpent','Minor pent'],['dorian','Dorian'],['major','Major'],['whole','Whole-tone']]});MMX.ctl(C[2],'snap',{type:'check',label:'Soft snap to scale'});
    MMX.ctl(C[2],'filt',{label:'Filter (when pinned)',min:0,max:1});MMX.ctl(C[2],'gain',{label:'Gain (when pinned)',min:0,max:1});MMX.ctl(C[2],'pitch',{label:'Pitch (when pinned)',min:-7,max:12,step:1});MMX.ctl(C[2],'dens',{label:'Density (when pinned)',min:0,max:1});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.9});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-p').onclick=()=>{if(hover>=0){const keys=['pinF','pinG','pinP','pinD'];MMX.setParam(keys[hover],!st[keys[hover]]);}};MM.$('#b-u').onclick=()=>['pinF','pinG','pinP','pinD'].forEach(p=>MMX.setParam(p,false));MM.$('#b-r').onclick=reseed;}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Slow garden (default)':{},'Pinned filter only':P({pinF:true,filt:0.6,drift:0.7,att:0.5}),'Furniture mode':P({att:0.1,drift:0.3,dens:0.5,rev:0.7}),'Fast drift listen':P({drift:1,att:0.85,snap:true}),'Long primes':P({l0:29,l1:31,l2:37,l3:41,l4:43,l5:47,drift:0.25})};}
MM.init(cfg);
