/*META
{"title": "Moment Form", "deep": true, "category": "music theory", "date": "2026-11-06", "kicker": "MUSIC THEORY · SELF-CONTAINED MUSICAL MOMENTS IN A MOBILE ORDER", "bpm": 88, "idea": "Moment form is a way of building a piece from self-contained \"moments\" that do not need to develop toward a goal. Each moment has its own character; the order can be fixed, shuffled or chosen freely. Here you keep a desk of index cards — drone, pulse, scatter, call, hush, cascade, cluster, hang — drag to reorder them, and play advances through the current order for N bars each.", "controls": "8 slots (drone, pulse, scatter grains, call phrase, hush pad, cascade pluck, click, found texture); 6 to 8 moment cards you reorder by drag; each moment lasts N bars (editable); play modes ORDER / RANDOM / SHUFFLE; shared key and scale; density, reverb and levels; an index-card catalogue VJ view.", "how": "Press PLAY: moments advance in the current card order. Drag a card left or right to reorder. Press S to shuffle, R for random next, O to restore written order. Click a card to jump to that moment. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen desk view.", "fonts": "family=Special+Elite&family=Source+Serif+4:wght@400;600;700", "try": ["Set every moment to 2 bars and SHUFFLE. Load a single field recording into the found-texture slot and a soft pad into hush: a mobile form from one place.", "Drag CALL next to HUSH and CASCADE next to PULSE. Play in ORDER and notice how characters sit beside each other without needing a climax.", "Raise density on SCATTER and CLUSTER only, keep HUSH sparse, and record a three-minute take."], "manifesto": {"name": "Moment form: self-contained musical moments in a mobile order", "short": "Moment Form", "author": "Inspired by mid-20th-century moment-form composition theory", "year": "Mid twentieth century", "where": "Concert music and later open-form practices", "ideas": ["In our words: a moment is a stretch of music that is complete in itself and does not need to prepare or resolve another stretch.", "In our words: the order of moments can be mobile: written, shuffled or chosen in performance.", "In our words: characters (drone, pulse, scatter and so on) give each moment a clear identity without forcing a story arc.", "In our words: shared key and scale hold the piece together while the surface stays open.", "In our words: listening can start at any card; there is no single required beginning."], "quotes": [], "system": "A list of moment cards stores character, bar length and density. PLAY advances through the list (or picks at random, or reshuffles at the end). Each character maps to different slot behaviour: drone sustains, pulse fires a grid, scatter sprays short grains, call plays a short phrase, hush holds a quiet pad, cascade runs descending plucks, cluster stacks close pitches, hang leaves a long decay. Key and scale are shared.", "dubious": "Moment form has a specific history in mid-century composition; this tool is a small playful classroom reading of the idea, not a claim about any one composer's practice."}, "design": {"name": "Index-card catalogue: pale cards with ruled headers, catalogue numbers, clipped corners and typewriter labels on a desk", "short": "Index-card catalogue", "who": "Library and office stationery designers", "era": "Twentieth century", "hallmarks": ["Pale cards with a ruled header band and a catalogue number in the corner.", "Typewriter labels, soft grey shadows and clipped corners on a cork or desk surface.", "A stack or fan of cards that can be reordered by hand."], "works": ["Look up library index-card catalogues in museum collections", "Look up mid-century office index cards and card-file furniture", "Search for typewriter label typography on catalogue cards"]}}
*/
/*CSS
:root{--bg:#c4a574;--fg:#2a2418;--acc:#8b1e1e;--bar-bg:#2a2418;--bar-fg:#f4ecd8;--bar-font:'Source Serif 4',serif;--learn-font:'Special Elite',serif;--learn-bg:#f4ecd8;--deck-bg:#ebe1c8;--head-font:'Special Elite',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#c4a574}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:grab}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #2a2418;font:400 12px 'Source Serif 4';background:#ebe1c8;color:#2a2418}
#side h3{font:400 16px 'Special Elite';color:#8b1e1e;margin:12px 0 2px;border-bottom:1px solid #2a2418}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Source Serif 4'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:400 12px 'Special Elite';border:1.5px solid #2a2418;background:#f4ecd8;color:#2a2418;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#8b1e1e;color:#f4ecd8;border-color:#8b1e1e}
#mm-learn-dlg h2{font:400 34px/1.05 'Special Elite'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Moment Form: a desk of index cards for musical moments you can reorder by drag"></canvas></div>
<div id="side"><div class="bt"><button id="b-s">S · SHUFFLE</button><button id="b-o">O · ORDER</button><button id="b-r">R · RANDOM NEXT</button></div><p style="margin:2px 0;opacity:.8">Drag cards to reorder. Click a card to jump to that moment.</p>
<h3>Form</h3><div id="c0"></div><h3>Moment</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const CHARS=['drone','pulse','scatter','call','hush','cascade','cluster','hang'],LABELS=['DRONE','PULSE','SCATTER','CALL','HUSH','CASCADE','CLUSTER','HANG'];
const st=MMX.bind({mode:'order',bars:2,dens:0.7,key:0,scale:'dorian',swing:0.05,rev:0.4,lv:0.9,slotGain:0.85});
let N={},cv,moments=[],cur=0,barIn=0,curStep=0,drag=null,level=0,written=null;
function makeMoments(){moments=CHARS.map((c,i)=>({id:i,char:c,bars:st.bars,dens:0.45+R()*0.5,deg:i%7}));written=moments.map(m=>m.id);}
makeMoments();
function playChar(ch,t,sd,s,m){const dens=m.dens*st.dens,g=st.lv*st.slotGain,root=48+st.key,deg=()=>MM.deg(m.deg+pick([0,1,2,3,4,5]),st.scale,root)-48;
  if(ch==='drone'&&s===0)MMX.fire(0,t,{semis:MM.deg(m.deg,st.scale,root)-48,gain:g*0.55,dur:sd*16*m.bars*0.9,maxDur:12,fadeIn:0.3,fadeOut:1.2,rev:st.rev,dest:N.bus,cut:1200});
  if(ch==='pulse'&&s%4===0)MMX.fire(1,t,{semis:deg(),gain:g*0.7,dur:sd*1.2,maxDur:0.5,dest:N.bus,pan:(s%8<4?-0.3:0.3)});
  if(ch==='scatter'&&R()<dens)MMX.fire(2,t+R()*sd*0.8,{pos:R()*0.85,dur:0.06+R()*0.1,semis:(R()-0.5)*12,gain:g*0.45,dest:N.bus,pan:R()*2-1,cut:4000});
  if(ch==='call'&&s===0){for(let k=0;k<4;k++)MMX.fire(3,t+k*sd,{semis:MM.deg(m.deg+k,st.scale,root)-48,gain:g*0.65,dur:sd*1.5,maxDur:0.8,rev:st.rev*0.8,dest:N.bus,pan:-0.2+k*0.1});}
  if(ch==='hush'&&s===0)MMX.fire(4,t,{semis:MM.deg(m.deg,st.scale,root-12)-36,gain:g*0.35,dur:sd*16*m.bars,maxDur:14,fadeIn:0.8,fadeOut:2,rev:st.rev*1.2,dest:N.bus,cut:800});
  if(ch==='cascade'&&s%2===0)MMX.fire(5,t,{semis:MM.deg(m.deg+6-Math.floor(s/2),st.scale,root)-48,gain:g*0.55,dur:sd*1.8,maxDur:0.7,dest:N.bus,pan:0.3});
  if(ch==='cluster'&&s%8===0){[0,1,2,3].forEach((k,q)=>MMX.fire(5,t+q*0.02,{semis:MM.deg(m.deg,st.scale,root)-48+k,gain:g*0.3,dur:sd*4,maxDur:2,rev:st.rev,dest:N.bus,pan:(q-1.5)*0.25}));}
  if(ch==='hang'&&s===0)MMX.fire(7,t,{semis:deg(),gain:g*0.5,dur:sd*12,maxDur:6,fadeOut:3,rev:st.rev*1.3,dest:N.bus});
  if((ch==='pulse'||ch==='scatter')&&s%4===0)MMX.fire(6,t,{gain:g*0.25,dur:0.04,maxDur:0.08,dest:N.bus});
}
function nextMoment(force){if(force!=null){cur=force;barIn=0;return;}if(st.mode==='random'){cur=(R()*moments.length)|0;barIn=0;return;}
  cur=(cur+1)%moments.length;barIn=0;if(cur===0&&st.mode==='shuffle'){for(let i=moments.length-1;i>0;i--){const j=(R()*(i+1))|0;[moments[i],moments[j]]=[moments[j],moments[i]];}}}
function step(i,t,sd){const s=i%16;curStep=s;if(s===0&&i>0){barIn++;const m=moments[cur];if(barIn>=(m.bars||st.bars))nextMoment();}
  const m=moments[cur];if(m)playChar(m.char,t,sd,s,m);}
function cardLay(){const W=cv.w,H=cv.h,pad=20,n=moments.length,cw=Math.min(118,(W-pad*2-8*(n-1))/n),ch=Math.min(160,H*0.42);return{W,H,pad,cw,ch,y:H*0.28,n};}
function draw(){cv.fit();const g=cv.g,L=cardLay(),{W,H,pad,cw,ch,y}=L,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.15;
  const DESK=vj?'#3a2e1c':'#c4a574',CARD=vj?'#2a2418':'#f4ecd8',INK=vj?'#f4ecd8':'#2a2418',RED='#8b1e1e';g.fillStyle=DESK;g.fillRect(0,0,W,H);
  // cork dots
  g.fillStyle=vj?'#2a2010':'#b08a55';for(let i=0;i<80;i++){const x=(i*97+40)%W,yy=(i*53+20)%H;g.globalAlpha=0.15;g.beginPath();g.arc(x,yy,1.2,0,TAU);g.fill();}g.globalAlpha=1;
  g.fillStyle=INK;g.font=`400 ${Math.min(36,W*0.04)}px 'Special Elite'`;g.fillText('MOMENT FORM',pad,42);g.font="600 12px 'Source Serif 4'";g.fillStyle=RED;g.fillText(`CATALOGUE · ${NM[st.key]} ${st.scale.toUpperCase()} · ${st.mode.toUpperCase()} · MOMENT ${cur+1}/${moments.length}`,pad,62);
  moments.forEach((m,i)=>{const x=pad+i*(cw+8),active=i===cur,hit=active?0.15+level*0.5:0;
    g.fillStyle='#000';g.globalAlpha=0.18;g.fillRect(x+4,y+6,cw,ch);g.globalAlpha=1;
    g.fillStyle=CARD;g.fillRect(x,y,cw,ch);g.fillStyle=RED;g.fillRect(x,y,cw,22);
    g.fillStyle='#f4ecd8';g.font="400 11px 'Special Elite'";g.fillText(String(100+m.id).padStart(3,'0'),x+8,y+15);
    g.strokeStyle=active?RED:INK;g.lineWidth=active?3:1;g.strokeRect(x,y,cw,ch);
    // clipped corner
    g.fillStyle=DESK;g.beginPath();g.moveTo(x+cw-14,y);g.lineTo(x+cw,y);g.lineTo(x+cw,y+14);g.fill();g.strokeStyle=INK;g.beginPath();g.moveTo(x+cw-14,y);g.lineTo(x+cw,y+14);g.stroke();
    g.fillStyle=INK;g.font=`400 ${Math.min(16,cw*0.16)}px 'Special Elite'`;g.fillText(LABELS[CHARS.indexOf(m.char)],x+8,y+48);
    g.font="600 11px 'Source Serif 4'";g.fillText(m.bars+' bars',x+8,y+70);g.fillText('dens '+((m.dens*100)|0)+'%',x+8,y+88);
    if(active){g.fillStyle=RED;g.globalAlpha=0.5+hit;g.fillRect(x+8,y+ch-18,cw-16,8);g.globalAlpha=1;g.fillStyle=INK;g.font="600 10px 'Source Serif 4'";g.fillText('NOW · bar '+(barIn+1),x+8,y+ch-24);}
  });
  g.fillStyle=INK;g.font="600 13px 'Source Serif 4'";g.fillText('Drag to reorder · click to jump · each card is a self-contained moment',pad,y+ch+36);
  // playhead steps
  const bw=(W-pad*2)/16;for(let k=0;k<16;k++){g.fillStyle=k===curStep&&MM.playing?RED:INK;g.globalAlpha=k===curStep?0.9:0.2;g.fillRect(pad+k*bw+1,H-36,bw-2,12);g.globalAlpha=1;}}
function hit(x,y,ph){const L=cardLay();if(ph==='down'){const i=Math.floor((x-L.pad)/(L.cw+8));if(i>=0&&i<moments.length&&y>=L.y&&y<=L.y+L.ch){drag={i,x};return;}}
  if(ph==='move'&&drag){const j=clamp(Math.floor((x-L.pad)/(L.cw+8)),0,moments.length-1);if(j!==drag.i){const m=moments.splice(drag.i,1)[0];moments.splice(j,0,m);if(cur===drag.i)cur=j;else if(drag.i<cur&&j>=cur)cur--;else if(drag.i>cur&&j<=cur)cur++;drag.i=j;}}
  if(ph==='up'&&drag){const i=drag.i;const moved=Math.abs(x-drag.x)>6;drag=null;if(!moved)nextMoment(i);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};const F0=146.83;
const FBS={drone:()=>mk(6,t=>{let s=0;[1,2,3].forEach((h,q)=>s+=Math.sin(TAU*F0*h*t)/(q+1));return s*Math.min(1,t*2)*Math.min(1,(6-t)*0.5);}),
  pulse:()=>mk(0.4,t=>(Math.sin(TAU*F0*t)+0.3*Math.sin(TAU*F0*2*t))*Math.exp(-t*8)*Math.min(1,t*200)),
  grain:()=>mk(0.15,t=>(Math.random()*2-1)*Math.exp(-t*40)*Math.min(1,t*300)),
  call:()=>mk(1.2,t=>Math.sin(TAU*F0*2*(1+0.02*Math.sin(TAU*6*t))*t)*Math.min(1,t*30)*Math.min(1,(1.2-t)*3)),
  hush:()=>{let lp=0;return mk(5,t=>{lp+=0.03*((Math.random()*2-1)-lp);return(lp+0.4*Math.sin(TAU*F0*0.5*t))*Math.sin(Math.PI*Math.min(1,t/5))**1.2;});},
  pluck:()=>mk(1.5,t=>(Math.sin(TAU*F0*t)+0.5*Math.sin(TAU*F0*2.01*t)*Math.exp(-t*4))*Math.exp(-t*2.5)*Math.min(1,t*400)),
  click:()=>mk(0.05,t=>(Math.random()*2-1)*Math.exp(-t*80)),
  tex:()=>{let lp=0;return mk(3,t=>{lp+=0.06*((Math.random()*2-1)-lp);return lp*Math.sin(Math.PI*t/3);});}};
const cfg={bpm:88,div:4,get swing(){return st.swing;},step,draw,start:()=>{barIn=0;},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:2,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='s'){for(let i=moments.length-1;i>0;i--){const j=(R()*(i+1))|0;[moments[i],moments[j]]=[moments[j],moments[i]];}cur=0;barIn=0;MMX.setParam('mode','shuffle');}
    else if(k==='o'){moments.sort((a,b)=>written.indexOf(a.id)-written.indexOf(b.id));cur=0;barIn=0;MMX.setParam('mode','order');}
    else if(k==='r'){MMX.setParam('mode','random');nextMoment();}},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Drone','drone'],['Pulse','pulse'],['Scatter grains','grain'],['Call phrase','call'],['Hush pad','hush'],['Cascade pluck','pluck'],['Click','click'],['Found texture','tex']].map(([label,kind])=>({label,kind,rv:0.25,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.bus});},onTrim:()=>{},onPreset:()=>{moments.forEach(m=>m.bars=st.bars);},
      factory:fac(),extra:{get:()=>({moments:moments.map(m=>({id:m.id,char:m.char,bars:m.bars,dens:m.dens,deg:m.deg})),cur}),set:x=>{if(x&&x.moments&&x.moments.length){moments=x.moments;written=moments.map(m=>m.id);cur=x.cur|0;}}},
      keys:[['S','shuffle the cards'],['O','restore written order'],['R','random next moment'],['drag / click','reorder / jump']],midiHelp:'Notes 36 to 47 set the key. CC 1 density.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'mode',{type:'select',label:'Play mode',options:[['order','Order (as laid)'],['shuffle','Shuffle at end'],['random','Random each moment']]});MMX.ctl(C[0],'bars',{label:'Default bars per moment',min:1,max:8,step:1,on:v=>moments.forEach(m=>m.bars=v)});
    MMX.ctl(C[1],'dens',{label:'Density',min:0.1,max:1,cc:1});MMX.ctl(C[1],'swing',{label:'Swing',min:0,max:0.35});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['dorian','Dorian'],['minor','Minor'],['major','Major'],['penta','Pentatonic'],['whole','Whole-tone'],['lydian','Lydian']]});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'slotGain',{label:'Slot gain',min:0,max:1.5});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-s').onclick=()=>{for(let i=moments.length-1;i>0;i--){const j=(R()*(i+1))|0;[moments[i],moments[j]]=[moments[j],moments[i]];}cur=0;barIn=0;MMX.setParam('mode','shuffle');};
    MM.$('#b-o').onclick=()=>{moments.sort((a,b)=>written.indexOf(a.id)-written.indexOf(b.id));cur=0;barIn=0;MMX.setParam('mode','order');};
    MM.$('#b-r').onclick=()=>{MMX.setParam('mode','random');nextMoment();};}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Catalogue (default)':{},'Short moments':P({bars:1,dens:0.85}),'Long hangs':P({bars:4,dens:0.4,rev:0.65}),'Random walk':P({mode:'random',bars:2}),'Shuffle desk':P({mode:'shuffle',bars:2,dens:0.75})};}
MM.init(cfg);
