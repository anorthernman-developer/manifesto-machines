/*META
{"title": "Process Cards", "deep": true, "category": "generative systems", "date": "2026-11-06", "kicker": "GENERATIVE SYSTEMS · A DECK OF PROCESS CARDS THAT REWIRE THE STUDIO", "bpm": 72, "idea": "Generative and ambient studios often treat the room itself as the instrument: unequal loop lengths, quiet sends, occasional reverse, a filter that opens when you pay attention. A deck of process cards (prompts written in our own words) reconfigures which voices loop, how long each loop is, and where the sound goes. Gardening, not architecting: the piece still works if you ignore it, and the ATTEND dial decides how much detail rises into the foreground.", "controls": "7 slots (loops 1 to 4, accent, bed, soft tick); 12 process cards that apply real parameter changes; ATTEND dial from furniture/background to foreground detail; independent loop lengths (including primes); reverse, send and filter amounts; key, scale, reverb and level; an airline-timetable VJ view.", "how": "Press PLAY: four loops of different lengths drift against a bed and a soft tick. Press C (or DRAW CARD) to advance the deck; each card rewires lengths, mutes, reverses or sends. Raise ATTEND to open mid-voice filters and hear the accent. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen timetable view.", "fonts": "family=Libre+Franklin:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600", "try": ["Set ATTEND near zero and leave the room: the piece should still feel like furniture. Come back, raise ATTEND, and draw three cards.", "Load four field recordings into the loop slots with prime lengths (17, 19, 23, 29). Draw \"Reverse only the third voice\" and listen for the phase flip.", "Press REC for three minutes with auto-card every minute. Keep the take as a studio that rewired itself."], "manifesto": {"name": "Generative systems: process cards that rewire the studio", "short": "Process Cards", "author": "Inspired by open studio-process prompt decks and unequal tape-loop practice", "year": "1970s onwards; process prompts in common studio use", "where": "Studios, classrooms and quiet rooms", "ideas": ["In our words: treat the studio as a compositional tool: changing a send or a loop length is a compositional act.", "In our words: unequal and prime loop lengths postpone the moment everything lines up, which keeps ambient music alive.", "In our words: a short prompt card can rewire the room more usefully than a long score.", "In our words: music that still works when ignored (furniture) can also reward close attention when you turn toward it.", "In our words: gardening means tending and accepting growth; architecting means fixing the plan in advance."], "quotes": [], "system": "Four looping voices fire on independent period lengths (seconds). A bed loops underneath and a soft tick marks a slow pulse. ATTEND raises mid-voice filter cutoffs and accent gain. Each process card applies a named action: lengthen or shorten a loop, reverse a voice, raise a send, mute a middle voice, thin the middle, and so on. An optional auto-card timer draws the next card for you.", "dubious": "Process-prompt decks and unequal-loop practice have many authors and traditions; this tool uses only our own paraphrased prompts and makes no claim about any one person's method."}, "design": {"name": "Airline timetable: dense tabular type, thin rules, destination codes in restrained blue, black and red on cream", "short": "Airline timetable", "who": "Airline and railway timetable designers", "era": "Mid twentieth century to the 1980s", "hallmarks": ["Dense columns of departure times with thin horizontal rules on cream stock.", "Three-letter destination codes in a restrained blue/black/red palette.", "Small pictograms of planes or clocks and a bold route header."], "works": ["Look up historic airline timetable booklets in transport museum collections", "Look up mid-century railway and airway schedule typography", "Search for destination-code tables and route maps from the jet age"]}}
*/
/*CSS
:root{--bg:#f4efe3;--fg:#1a2433;--acc:#b42318;--bar-bg:#1a2433;--bar-fg:#f4efe3;--bar-font:'Libre Franklin',sans-serif;--learn-font:'Libre Franklin',sans-serif;--learn-bg:#faf7f0;--deck-bg:#faf7f0;--head-font:'IBM Plex Sans',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#f4efe3}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #1a2433;font:400 11.5px 'Libre Franklin';background:#faf7f0;color:#1a2433}
#side h3{font:700 13px 'IBM Plex Sans';letter-spacing:.06em;color:#1e4d8c;margin:12px 0 2px;border-bottom:1px solid #1a2433}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Libre Franklin'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 11px 'Libre Franklin';border:1.5px solid #1a2433;background:transparent;color:#1a2433;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#1e4d8c;color:#f4efe3;border-color:#1e4d8c}
#mm-learn-dlg h2{font:700 32px/1.05 'IBM Plex Sans'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Process Cards: an airline timetable board of looping routes and the current process card"></canvas></div>
<div id="side"><div class="bt"><button id="b-c">C · DRAW CARD</button><button id="b-h">H · HUSH 20s</button><button id="b-a">A · ATTEND UP</button></div><p style="margin:2px 0;opacity:.8">Cards rewire lengths, reverse, sends and mutes. Click a route to mute.</p>
<h3>Attention</h3><div id="c0"></div><h3>Routes (loop lengths)</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const CODES=['LHR','JFK','CDG','NRT','SYD','AMS','FRA','HEL'],NAMES=['LOOP 1','LOOP 2','LOOP 3','LOOP 4','ACCENT','BED','TICK'];
const CARDS=[
  ['Lengthen the quiet loop','lenQuiet'],['Send the brightest sound farthest','sendBright'],['Reverse only the third voice','rev3'],
  ['Thin the middle','thinMid'],['Shorten the longest route','shortLong'],['Mute a middle voice for a while','muteMid'],
  ['Open the filter on the bed','openBed'],['Swap two loop lengths','swap'],['Raise the soft tick','tickUp'],
  ['Drop attention: furniture mode','ignore'],['Listen: raise attend','listen'],['Accept the accident: one bright accent','accent']];
const st=MMX.bind({att:0.35,cardEvery:0,key:2,scale:'penta',rev:0.45,send:0.3,filt:0.4,speed:1,l0:17,l1:19,l2:23,l3:29,m0:false,m1:false,m2:false,m3:false,m4:false,rv0:false,rv1:false,rv2:false,rv3:false,gate:0.7,wander:0.35,lv:0.9});
const L=[{deg:0,oct:-1,base:0.75},{deg:4,oct:0,base:0.6},{deg:2,oct:0,base:0.55},{deg:7,oct:0,base:0.5},{deg:5,oct:1,base:0.45},{deg:0,oct:-1,base:0.55},{deg:0,oct:0,base:0.35}].map(l=>Object.assign(l,{next:0,hit:0,note:''}));
let N={},cv,card=['Press C for a process card.',''],cardAt=0,pauseUntil=0,lastAuto=0,level=0,t0=0;
const len=k=>clamp(Math.round(st['l'+k]||17),5,97);
function fire(k,t,force){const l=L[k],a=st.att;if(k<4&&st['m'+k])return;if(k===4&&st.m4)return;if(force==null&&k<5&&R()<st.wander)l.deg=clamp(l.deg+pick([-2,-1,1,2,3]),-3,10);
  const midi=MM.deg(force??l.deg,st.scale,48+st.key),semis=midi-48+12*l.oct,per=len(Math.min(k,3))/st.speed,dur=k===6?0.05:clamp(per*st.gate,0.3,20);
  l.hit=performance.now()+Math.max(0,(t-MM.now)*1000);l.note=NM[midi%12];
  const cut=k===5?300+st.filt*4000:k>=4?2000+a*a*12000:400+a*a*9000;
  const rev=st.rev*(k===5?1.2:1)+((k<4&&k===pick([0,1,2,3]))?st.send*0.2:0);
  MMX.fire(k,t,{semis:k===6?0:semis,gain:st.lv*l.base*(k===4?0.4+a*0.8:k===6?0.25+a*0.2:0.5+0.5*a)*(k===5?0.7:1),dur,maxDur:22,fadeIn:k===6?0.001:Math.max(0.01,dur*0.15),fadeOut:Math.min(dur*0.45,2.5),pan:[-0.5,-0.2,0.2,0.5,0.35,0,0.1][k],cut,rev,dest:N.bus});
  if(k<4&&st['rv'+k]){/* reverse handled via slot flag mirrored below */}}
function tick(now){if(st.cardEvery>0&&now-lastAuto>st.cardEvery*60){lastAuto=now;drawCard();}if(now<pauseUntil)return;
  L.forEach((l,k)=>{if(!l.next)l.next=now+0.2+k*0.5;if(l.next<now-1)l.next=now+0.15+R();const per=(k<4?len(k):k===5?len(0)*1.7:k===6?2.5:11)/st.speed;while(l.next<now+0.12){if(l.next>=now-0.05)fire(k,l.next);l.next+=per;}});}
function drawCard(){const c=pick(CARDS);card=[c[0],c[1]];cardAt=performance.now();const set=(k,v)=>MMX.setParam(k,v);const live=[0,1,2,3].filter(k=>!st['m'+k]);
  switch(c[1]){case'lenQuiet':{const k=live.reduce((m,q)=>L[q].base<L[m].base?q:m,live[0]||0);set('l'+k,len(k)+2);break;}
    case'sendBright':set('send',clamp(st.send+0.2,0,1));set('rev',clamp(st.rev+0.1,0,0.8));break;
    case'rev3':set('rv2',!st.rv2);if(MMX.S.slots[2]){MMX.S.slots[2].rev=st.rv2;MMX.refresh&&MMX.refresh();}break;
    case'thinMid':if(live.length>2)set('m'+live[1],true);break;
    case'shortLong':{const k=[0,1,2,3].reduce((m,q)=>len(q)>len(m)?q:m,0);set('l'+k,Math.max(5,len(k)-3));break;}
    case'muteMid':if(live.length)set('m'+pick(live.filter(k=>k===1||k===2).length?live.filter(k=>k===1||k===2):live),true);break;
    case'openBed':set('filt',clamp(st.filt+0.25,0,1));break;
    case'swap':{const a=pick(live),b=pick(live),x=st['l'+a];set('l'+a,st['l'+b]);set('l'+b,x);break;}
    case'tickUp':L[6].base=Math.min(1.2,L[6].base+0.25);break;
    case'ignore':set('att',clamp(st.att-0.3,0,1));break;
    case'listen':set('att',clamp(st.att+0.3,0,1));break;
    case'accent':fire(4,MM.now+0.05,L[4].deg+pick([0,2,4,7]));break;}}
function lay(){const W=cv.w,H=cv.h,pad=16,top=70,rowH=Math.min(42,(H-top-110)/7);return{W,H,pad,top,rowH};}
function draw(){cv.fit();const g=cv.g,G=lay(),{W,H,pad,top,rowH}=G,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level(),a=st.att;level+=(lv.rms-level)*0.15;
  const CREAM=vj?'#0e1a2b':'#f4efe3',INK=vj?'#f4efe3':'#1a2433',BLUE='#1e4d8c',RED='#b42318';g.fillStyle=CREAM;g.fillRect(0,0,W,H);
  g.fillStyle=INK;g.font=`700 ${Math.min(36,W*0.036)}px 'IBM Plex Sans'`;g.fillText('PROCESS CARDS',pad,36);g.font="600 11px 'Libre Franklin'";g.fillStyle=BLUE;g.fillText(`ROUTES · ${NM[st.key]} ${st.scale.toUpperCase()} · ATTEND ${(a*100)|0}% · SPEED x${st.speed}`,pad,54);
  // plane pictogram
  g.fillStyle=BLUE;g.beginPath();g.moveTo(W-70,28);g.lineTo(W-40,34);g.lineTo(W-70,40);g.lineTo(W-64,34);g.fill();
  g.strokeStyle=INK;g.lineWidth=1;g.beginPath();g.moveTo(pad,top-8);g.lineTo(W-pad,top-8);g.stroke();
  g.font="700 10px 'Libre Franklin'";g.fillStyle=INK;['#','CODE','ROUTE','LEN','ETA','NOTE'].forEach((h,i)=>g.fillText(h,[pad,pad+28,pad+90,pad+260,pad+320,pad+400][i]||pad+i*70,top-12));
  L.forEach((l,k)=>{const y=top+k*rowH,mu=k<4?st['m'+k]:k===4?st.m4:false,per=(k<4?len(k):k===5?len(0)*1.7:2.5)/st.speed,ph=l.next?clamp(1-(l.next-MM.now)/per,0,1):0,hit=Math.exp(-(pn-l.hit)/600)*(pn>=l.hit?1:0);
    if(k%2===0){g.fillStyle=vj?'#132238':'#ebe4d4';g.fillRect(pad,y,W-pad*2,rowH);}
    g.fillStyle=mu?RED:INK;g.font="600 12px 'Libre Franklin'";g.fillText(String(k+1).padStart(2,'0'),pad,y+rowH*0.65);
    g.fillStyle=BLUE;g.font="700 12px 'IBM Plex Sans'";g.fillText(CODES[k],pad+28,y+rowH*0.65);
    g.fillStyle=INK;g.font="600 12px 'Libre Franklin'";g.fillText(NAMES[k]+(k<4&&st['rv'+k]?'  REV':''),pad+90,y+rowH*0.65);
    g.fillText(k<4?len(k)+'s':k===5?'BED':k===6?'TICK':'—',pad+260,y+rowH*0.65);
    g.strokeStyle=BLUE;g.lineWidth=3;g.beginPath();g.arc(pad+340,y+rowH*0.5,8,-Math.PI/2,-Math.PI/2+ph*TAU);g.stroke();
    g.fillStyle=hit>0.05?RED:INK;g.globalAlpha=0.3+hit*0.7;g.beginPath();g.arc(pad+340,y+rowH*0.5,3+hit*4,0,TAU);g.fill();g.globalAlpha=1;
    g.fillStyle=INK;g.font="600 11px 'Libre Franklin'";g.fillText(l.note||'—',pad+400,y+rowH*0.65);
    g.strokeStyle=INK;g.globalAlpha=0.25;g.beginPath();g.moveTo(pad,y+rowH);g.lineTo(W-pad,y+rowH);g.stroke();g.globalAlpha=1;});
  const by=H-88;g.fillStyle=vj?'#1a3050':'#fffdf6';g.fillRect(pad,by,W*0.62-pad,72);g.strokeStyle=RED;g.lineWidth=2;g.strokeRect(pad,by,W*0.62-pad,72);
  g.fillStyle=RED;g.font="700 10px 'Libre Franklin'";g.fillText('PROCESS CARD',pad+10,by+16);g.fillStyle=INK;g.font=`600 ${Math.min(18,W*0.018)}px 'IBM Plex Sans'`;
  const words=card[0].split(' ');let line='',yy=by+38,mw=W*0.62-pad-24;words.forEach(w=>{const t=line+w+' ';if(g.measureText(t).width>mw&&line){g.fillText(line,pad+10,yy);yy+=20;line=w+' ';}else line=t;});g.fillText(line,pad+10,yy);
  const ax=W*0.66,aw=W*0.32-pad;g.fillStyle=INK;g.font="700 10px 'Libre Franklin'";g.fillText('FURNITURE',ax,by+14);g.textAlign='right';g.fillText('DETAIL',ax+aw,by+14);g.textAlign='left';
  g.strokeStyle=INK;g.strokeRect(ax,by+22,aw,14);g.fillStyle=BLUE;g.fillRect(ax+2,by+24,(aw-4)*a,10);g.fillStyle=RED;g.fillRect(ax+aw*a-2,by+18,3,22);
  g.fillStyle=INK;g.font="600 11px 'Libre Franklin'";g.fillText('ATTEND  '+((a*100)|0)+'%',ax,by+58);}
function hit(x,y,ph){if(ph!=='down')return;const G=lay();if(y>G.H-90){drawCard();return;}const row=Math.floor((y-G.top)/G.rowH);if(row>=0&&row<4)MMX.setParam('m'+row,!st['m'+row]);else if(row===4)MMX.setParam('m4',!st.m4);}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};const F0=130.81;
const FBS={loop:()=>mk(8,t=>{let s=0;[1,1.5,2,3].forEach((h,q)=>s+=Math.sin(TAU*F0*h*t)/(q+1));return s*Math.sin(Math.PI*Math.min(1,t/8))**1.3;}),
  accent:()=>mk(2.2,t=>(Math.sin(TAU*F0*2*t)+0.4*Math.sin(TAU*F0*3.01*t))*Math.exp(-t*2.2)*Math.min(1,t*200)),
  bed:()=>{let lp=0;return mk(10,t=>{lp+=0.04*((Math.random()*2-1)-lp);return lp*(0.7+0.3*Math.sin(TAU*0.15*t))*Math.sin(Math.PI*Math.min(1,t/10))**0.7;});},
  tick:()=>mk(0.08,t=>(Math.sin(TAU*1800*t)+ (Math.random()*2-1)*0.3)*Math.exp(-t*60)*Math.min(1,t*2000))};
const cfg={bpm:72,div:1,tick,draw,start:()=>{t0=MM.now;L.forEach(l=>l.next=0);lastAuto=MM.now;pauseUntil=0;},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:2,dest:N.bus});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='c')drawCard();else if(k==='h')pauseUntil=MM.now+20;else if(k==='a')MMX.setParam('att',clamp(st.att+0.1,0,1));else if(k>='1'&&k<='4')MMX.setParam('m'+(+k-1),!st['m'+(+k-1)]);else if(e.key==='ArrowUp'){MMX.setParam('att',clamp(st.att+0.1,0,1));e.preventDefault();}else if(e.key==='ArrowDown'){MMX.setParam('att',clamp(st.att-0.1,0,1));e.preventDefault();}},
  setup(){MM.ensure();const c=MM.ctx;N.bus=c.createGain();N.bus.connect(MM.out);Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Loop 1','loop'],['Loop 2','loop'],['Loop 3','loop'],['Loop 4','loop'],['Accent','accent'],['Bed','bed'],['Soft tick','tick']].map(([label,kind])=>({label,kind,rv:0.3,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2.5,dest:N.bus});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),keys:[['C','draw a process card'],['H','hush: nothing new for 20 seconds'],['A','raise attend'],['1 to 4','mute or unmute a loop'],['Up / Down','attend up or down']],midiHelp:'Notes 36 to 47 set the key. CC 1 attend, CC 2 wander.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'att',{label:'Attend',min:0,max:1,cc:1,hint:'0 = furniture / background, 1 = foreground detail'});MMX.ctl(C[0],'cardEvery',{type:'select',label:'Auto card',options:[[0,'off'],[0.5,'every 30 s'],[1,'every minute'],[2,'every 2 minutes']]});MMX.ctl(C[0],'speed',{type:'select',label:'Speed',options:[[1,'real time'],[2,'x2'],[4,'x4']]});MMX.ctl(C[0],'send',{label:'Send amount',min:0,max:1});MMX.ctl(C[0],'filt',{label:'Bed filter open',min:0,max:1});
    for(let k=0;k<4;k++)MMX.ctl(C[1],'l'+k,{label:`Loop ${k+1} length (s)`,min:5,max:97,step:1});
    for(let k=0;k<4;k++)MMX.ctl(C[1],'m'+k,{type:'check',label:`Mute loop ${k+1}`});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['penta','Pentatonic'],['major','Major'],['minor','Minor'],['dorian','Dorian'],['whole','Whole-tone'],['lydian','Lydian']]});MMX.ctl(C[2],'wander',{label:'Wander',min:0,max:1,cc:2});MMX.ctl(C[2],'gate',{label:'Note length',min:0.15,max:1});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-c').onclick=drawCard;MM.$('#b-h').onclick=()=>pauseUntil=MM.now+20;MM.$('#b-a').onclick=()=>MMX.setParam('att',clamp(st.att+0.1,0,1));}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Timetable (default)':{},'Furniture mode':P({att:0.1,cardEvery:2,wander:0.15}),'Listening desk':P({att:0.9,cardEvery:0.5,send:0.5}),'Prime routes':P({l0:17,l1:19,l2:23,l3:29,speed:1}),'Hurry x4':P({speed:4,l0:7,l1:11,l2:13,l3:17,gate:0.5})};}
MM.init(cfg);
