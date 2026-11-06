/*META
{"title": "Cheap Art", "deep": true, "category": "art manifesto", "date": "2026-11-06", "kicker": "ART MANIFESTO · ART THAT IS CHEAP, AVAILABLE AND FOR EVERYONE", "bpm": 100, "idea": "The Cheap Art Manifesto argues that art should be cheap, free when possible, available, living with people, not locked away. This instrument is a giveaway table of small musical gifts: tiny loops and phrases anyone can TAKE into their playing set for free. A scarcity/abundance dial, a GIVE flood of overlapping free phrases, KEEP to save a takeaway preset, and ethos controls for cheap (lo-fi), available (more gifts spawn) and everyone (equal slot gains).", "controls": "8 slots (gift voices 1 to 6, crowd murmur, stamp/percussion); a table of 8 to 12 musical gifts you can TAKE; scarcity vs abundance; GIVE floods the mix; KEEP saves a takeaway preset; cheap / available / everyone ethos dials; key, scale, reverb; a matchbox-label VJ view.", "how": "Press PLAY: gifts appear on the matchbox table. Click TAKE on a gift (or press its number) to add it to your playing set. Press G to GIVE (flood), K to KEEP a takeaway preset, N for a new batch of gifts. Raise AVAILABLE so more gifts spawn; raise CHEAP for bitcrush; raise EVERYONE so all slots share gain. Open the deck (D) to load your own sounds and trim each with S and E. Press F for the full-screen label view.", "fonts": "family=Archivo+Black&family=Work+Sans:wght@400;600;700", "try": ["Set abundance high and press GIVE: overlapping free phrases. TAKE three you like and KEEP the preset.", "Load six short recordings into the gift slots. Set CHEAP high and AVAILABLE medium: a lo-fi table of free loops.", "Set EVERYONE to maximum so no gift is louder than another, then record a one-minute giveaway."], "manifesto": {"name": "Cheap Art Manifesto: art that is cheap, available and for everyone", "short": "Cheap Art", "author": "Inspired by the Cheap Art Manifesto associated with Bread and Puppet Theater, 1984", "year": "1984", "where": "Community theatre and print culture, United States", "ideas": ["In our words: art should be cheap, and free when it can be.", "In our words: art should be available where people already are, not only behind museum doors.", "In our words: art should live with people as part of daily life.", "In our words: giving work away can be the point, not a side effect.", "In our words: a small stamped gift can matter as much as a large expensive one."], "quotes": [], "system": "A pool of gift objects each holds a slot index, a short pattern length, a pitch degree and a taken flag. TAKE adds a gift to the active set so the step sequencer plays it. GIVE schedules many overlapping one-shots from untaken and taken gifts. AVAILABLE raises spawn rate of new gifts. CHEAP engages a bitcrusher send. EVERYONE flattens per-slot gains toward equal. KEEP writes the current taken set into a named preset.", "dubious": "The Cheap Art Manifesto is associated with a specific theatre company; this tool paraphrases the public ethos only and does not reproduce the manifesto text."}, "design": {"name": "Matchbox label: tiny bold illustrative labels, limited flat colours, decorative border rules and stamped product-name typography", "short": "Matchbox label", "who": "Matchbox and small-goods label printers", "era": "Late nineteenth century to mid twentieth century", "hallmarks": ["Tiny bold illustrative labels in ochre, crimson, black and cream.", "Decorative border rules and corner ornaments.", "Product-name typography that looks stamped or wood-blocked."], "works": ["Look up historic matchbox labels in print and ephemera museum collections", "Look up vernacular product labels and stamped packaging type", "Search for ochre and crimson matchbox label archives"]}}
*/
/*CSS
:root{--bg:#f2e6c9;--fg:#1a1208;--acc:#b42318;--bar-bg:#1a1208;--bar-fg:#f2e6c9;--bar-font:'Work Sans',sans-serif;--learn-font:'Work Sans',sans-serif;--learn-bg:#faf3e0;--deck-bg:#faf3e0;--head-font:'Archivo Black',sans-serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 320px}
#view{position:relative;overflow:hidden;background:#f2e6c9}#cv{position:absolute;inset:0;width:100%;height:100%;cursor:pointer}
#side{overflow:auto;padding:8px 14px 14px;border-left:3px solid #1a1208;font:400 11.5px 'Work Sans';background:#faf3e0;color:#1a1208}
#side h3{font:400 14px 'Archivo Black';color:#b42318;margin:12px 0 2px;border-bottom:1px solid #1a1208}
#side .mmx-ctl{grid-template-columns:104px 1fr 40px;font:400 11px 'Work Sans'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:400 11px 'Archivo Black';border:2px solid #1a1208;background:#f2e6c9;color:#1a1208;padding:5px 8px;cursor:pointer}#side .bt button:hover{background:#b42318;color:#f2e6c9;border-color:#b42318}
#mm-learn-dlg h2{font:400 32px/1.05 'Archivo Black'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="Cheap Art: a matchbox-label giveaway table of small musical gifts you can take for free"></canvas></div>
<div id="side"><div class="bt"><button id="b-g">G · GIVE</button><button id="b-k">K · KEEP</button><button id="b-n">N · NEW GIFTS</button></div><p style="margin:2px 0;opacity:.8">Click a gift to TAKE it into your set. Free for everyone.</p>
<h3>Ethos</h3><div id="c0"></div><h3>Table</h3><div id="c1"></div><h3>Pitch</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],pick=a=>a[(R()*a.length)|0];
const GNAMES=['SPARK','LOOP','HUM','TAP','CHIME','SCRAP','WHISPER','STAMP','PULSE','DRIFT','FLARE','NOD'];
const st=MMX.bind({cheap:0.35,avail:0.55,everyone:0.7,dens:0.7,key:5,scale:'penta',swing:0.06,rev:0.3,crowd:0.4,stamp:0.5,lv:0.95});
let N={},cv,gifts=[],taken=new Set(),curStep=0,floodUntil=0,level=0,keepCount=0,flash=[];
function mkGift(i){return{id:i,name:pick(GNAMES)+'-'+(10+((R()*89)|0)),slot:(R()*6)|0,deg:(R()*7)|0,len:2+((R()*4)|0),pat:Array.from({length:8},()=>R()<0.45?1:0),born:performance.now()};}
function refill(){const n=8+Math.round(st.avail*4);gifts=[];for(let i=0;i<n;i++)gifts.push(mkGift(i));}
refill();
function gainFor(slot){const base=0.7,eq=st.everyone;return st.lv*((1-eq)*base+eq*0.85);}
function fireGift(g,t,sd,step){if(!g.pat[step%g.pat.length])return;const semis=MM.deg(g.deg,st.scale,48+st.key)-48;MMX.fire(g.slot,t,{semis,gain:gainFor(g.slot)*0.7,dur:sd*g.len*0.9,maxDur:1.5,rev:st.rev,dest:N.dry,pan:(g.slot/5)*1.2-0.6});flash.push({g,at:performance.now()+Math.max(0,(t-MM.now)*1000)});}
function step(i,t,sd){const s=i%16;curStep=s;const step8=s%8;
  if(st.stamp>0&&(s===0||s===8))MMX.fire(7,t,{gain:st.stamp*st.lv*0.6,dur:0.08,maxDur:0.15,dest:N.dry});
  if(st.crowd>0&&s%4===0)MMX.fire(6,t,{gain:st.crowd*st.lv*0.35,dur:sd*3,maxDur:1.2,rev:st.rev*1.2,dest:N.dry,cut:1200});
  // taken gifts play on the grid
  gifts.forEach(g=>{if(taken.has(g.id))fireGift(g,t,sd,step8);});
  // flood / give
  if(MM.now<floodUntil&&R()<0.55+st.avail*0.4){const g=pick(gifts);MMX.fire(g.slot,t+R()*sd,{semis:MM.deg(g.deg+pick([0,2,4]),st.scale,48+st.key)-48,gain:gainFor(g.slot)*0.55,dur:0.25+R()*0.5,maxDur:1,rev:st.rev,dest:N.dry,pan:R()*2-1});flash.push({g,at:performance.now()});}
  // spawn
  if(s===0&&R()<st.avail*0.35&&gifts.length<14)gifts.push(mkGift(gifts.length+((R()*100)|0)));
  N.cr.gain.setTargetAtTime(st.cheap*0.85,t,0.08);N.dryG.gain.setTargetAtTime(1-st.cheap*0.35,t,0.08);
  if(flash.length>40)flash.splice(0,flash.length-40);}
function give(){floodUntil=MM.now+6;MM.toast('GIVE: free phrases for everyone');}
function keep(){keepCount++;const name='takeaway-'+keepCount;try{MMX.save(name);MM.toast('KEEP: saved preset "'+name+'"');}catch(e){MM.toast('KEEP: takeaway noted ('+taken.size+' gifts)');}}
function take(g){if(taken.has(g.id))taken.delete(g.id);else taken.add(g.id);MM.toast((taken.has(g.id)?'TOOK ':'PUT BACK ')+g.name);}
function lay(){const W=cv.w,H=cv.h,pad=16,cols=4,rows=Math.ceil(gifts.length/cols),cw=Math.min(140,(W-pad*2-12*(cols-1))/cols),ch=Math.min(88,(H-140)/Math.max(2,rows)-10);return{W,H,pad,cols,cw,ch,top:78};}
function draw(){cv.fit();const g=cv.g,L=lay(),{W,H,pad,cols,cw,ch,top}=L,vj=MMX.vjOn,pn=performance.now(),lv=MMX.level();level+=(lv.rms-level)*0.15;
  const CREAM=vj?'#1a1208':'#f2e6c9',INK=vj?'#f2e6c9':'#1a1208',RED='#b42318',OCH='#c48a2a';g.fillStyle=CREAM;g.fillRect(0,0,W,H);
  // outer decorative border
  g.strokeStyle=INK;g.lineWidth=4;g.strokeRect(8,8,W-16,H-16);g.lineWidth=1.5;g.strokeRect(14,14,W-28,H-28);
  for(let k=0;k<12;k++){const a=k/12*TAU;g.fillStyle=RED;g.beginPath();g.arc(22+Math.cos(a)*6,22+Math.sin(a)*6,2,0,TAU);g.fill();g.beginPath();g.arc(W-22+Math.cos(a)*6,22+Math.sin(a)*6,2,0,TAU);g.fill();}
  g.fillStyle=INK;g.font=`400 ${Math.min(40,W*0.045)}px 'Archivo Black'`;g.fillText('CHEAP ART',pad+8,48);g.font="700 11px 'Work Sans'";g.fillStyle=RED;g.fillText(`FREE WHEN POSSIBLE · ${NM[st.key]} ${st.scale.toUpperCase()} · TAKEN ${taken.size} · GIFTS ${gifts.length}`,pad+8,66);
  gifts.forEach((gf,i)=>{const col=i%cols,row=(i/cols)|0,x=pad+col*(cw+12),y=top+row*(ch+10),on=taken.has(gf.id),fl=flash.find(f=>f.g.id===gf.id&&pn-f.at<300);
    g.fillStyle=on?OCH:(vj?'#2a1e10':'#fff8e8');g.fillRect(x,y,cw,ch);g.strokeStyle=fl?RED:INK;g.lineWidth=fl?3:2;g.strokeRect(x,y,cw,ch);
    g.fillStyle=RED;g.fillRect(x,y,cw,16);g.fillStyle='#fff8e8';g.font="700 10px 'Work Sans'";g.fillText('GIFT',x+6,y+12);g.textAlign='right';g.fillText(on?'YOURS':'FREE',x+cw-6,y+12);g.textAlign='left';
    g.fillStyle=INK;g.font=`400 ${Math.min(16,cw*0.14)}px 'Archivo Black'`;g.fillText(gf.name,x+8,y+38);
    g.font="600 10px 'Work Sans'";g.fillText('voice '+(gf.slot+1)+' · '+gf.len+' steps',x+8,y+54);
    // mini pattern
    gf.pat.forEach((v,k)=>{g.fillStyle=v?RED:INK;g.globalAlpha=v?0.9:0.15;g.fillRect(x+8+k*((cw-16)/8),y+ch-18,(cw-16)/8-2,10);g.globalAlpha=1;});
  });
  // ethos meters
  const by=H-48;[['CHEAP',st.cheap,OCH],['AVAILABLE',st.avail,RED],['EVERYONE',st.everyone,INK]].forEach((row,i)=>{const x=pad+i*((W-pad*2)/3);
    g.fillStyle=INK;g.font="700 10px 'Work Sans'";g.fillText(row[0],x,by);g.strokeStyle=INK;g.strokeRect(x,by+6,120,8);g.fillStyle=row[2];g.fillRect(x,by+6,120*row[1],8);});}
function hit(x,y,ph){if(ph!=='down')return;const L=lay(),col=Math.floor((x-L.pad)/(L.cw+12)),row=Math.floor((y-L.top)/(L.ch+10)),i=row*L.cols+col;
  if(i>=0&&i<gifts.length&&y>=L.top){const gf=gifts[i];if(x>=L.pad+col*(L.cw+12)&&x<=L.pad+col*(L.cw+12)+L.cw)take(gf);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};const F0=174.61;
const FBS={g0:()=>mk(1.2,t=>Math.sin(TAU*F0*t)*Math.exp(-t*2.5)*Math.min(1,t*100)),g1:()=>mk(2.0,t=>{let s=0;[1,1.5,2].forEach((h,q)=>s+=Math.sin(TAU*F0*h*t)/(q+1));return s*Math.sin(Math.PI*Math.min(1,t/2))**1.2;}),
  g2:()=>mk(1.5,t=>(Math.sin(TAU*F0*0.75*t)+0.3*Math.sin(TAU*F0*2*t))*Math.exp(-t*1.5)*Math.min(1,t*40)),g3:()=>mk(0.5,t=>(Math.random()*2-1)*Math.exp(-t*20)*Math.min(1,t*200)+Math.sin(TAU*F0*2*t)*Math.exp(-t*8)*0.4),
  g4:()=>mk(1.8,t=>(Math.sin(TAU*F0*2*t)+0.5*Math.sin(TAU*F0*3.01*t))*Math.exp(-t*2)*Math.min(1,t*150)),g5:()=>mk(1.0,t=>Math.sin(TAU*F0*1.25*t*(1+0.03*Math.sin(TAU*4*t)))*Math.exp(-t*3)*Math.min(1,t*80)),
  crowd:()=>{let lp=0;return mk(3,t=>{lp+=0.05*((Math.random()*2-1)-lp);return lp*(0.6+0.4*Math.sin(TAU*2*t))*Math.sin(Math.PI*t/3);});},
  stamp:()=>mk(0.15,t=>(Math.sin(TAU*80*t*Math.exp(-t*20))+ (Math.random()*2-1)*0.5)*Math.exp(-t*25)*Math.min(1,t*300))};
const cfg={bpm:100,div:4,get swing(){return st.swing;},step,draw,start:()=>{floodUntil=0;if(!taken.size)gifts.slice(0,3).forEach(g=>taken.add(g.id));},stop:()=>{},
  onSamples:list=>{MMX.assign(list);MMX.fire(0,MM.now+0.02,{maxDur:1.5,dest:N.dry});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='g')give();else if(k==='k')keep();else if(k==='n'){refill();taken.clear();}
    else if(k>='1'&&k<='9'){const i=+k-1;if(gifts[i])take(gifts[i]);}},
  setup(){MM.ensure();const c=MM.ctx;N.dry=c.createGain();N.dryG=c.createGain();N.cr=c.createGain();N.cr.gain.value=0;const cr=MM.crusher(5);
    N.dry.connect(N.dryG);N.dryG.connect(MM.out);N.dry.connect(cr);cr.connect(N.cr);N.cr.connect(MM.out);
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Gift voice 1','g0'],['Gift voice 2','g1'],['Gift voice 3','g2'],['Gift voice 4','g3'],['Gift voice 5','g4'],['Gift voice 6','g5'],['Crowd murmur','crowd'],['Stamp / percussion','stamp']].map(([label,kind])=>({label,kind,rv:0.2,gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.dry});},onTrim:()=>{},onPreset:()=>{},
      factory:fac(),extra:{get:()=>({gifts:gifts.map(g=>({id:g.id,name:g.name,slot:g.slot,deg:g.deg,len:g.len,pat:g.pat.slice()})),taken:[...taken]}),set:x=>{if(x&&x.gifts){gifts=x.gifts;taken=new Set(x.taken||[]);}}},
      keys:[['G','GIVE: flood free phrases'],['K','KEEP: save takeaway preset'],['N','new batch of gifts'],['1 to 9','take or return that gift'],['click','take / return a gift']],midiHelp:'Notes 36 to 47 set the key. CC 1 available, CC 2 cheap.',midi:(n,v,on)=>{if(on&&n>=36&&n<=47)st.key=n-36;}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k));
    MMX.ctl(C[0],'cheap',{label:'Cheap (lo-fi)',min:0,max:1,cc:2});MMX.ctl(C[0],'avail',{label:'Available (spawn)',min:0,max:1,cc:1});MMX.ctl(C[0],'everyone',{label:'Everyone (equal gain)',min:0,max:1});
    MMX.ctl(C[1],'dens',{label:'Table density',min:0.2,max:1});MMX.ctl(C[1],'crowd',{label:'Crowd murmur',min:0,max:1});MMX.ctl(C[1],'stamp',{label:'Stamp',min:0,max:1});MMX.ctl(C[1],'swing',{label:'Swing',min:0,max:0.35});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['penta','Pentatonic'],['major','Major'],['minor','Minor'],['dorian','Dorian'],['blues','Blues'],['whole','Whole-tone']]});
    MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:0.8});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    MM.drag(MM.$('#cv'),hit);MM.$('#b-g').onclick=give;MM.$('#b-k').onclick=keep;MM.$('#b-n').onclick=()=>{refill();taken.clear();};}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Giveaway table (default)':{},'Lo-fi free':P({cheap:0.9,avail:0.7,everyone:1}),'Scarce stamps':P({avail:0.15,cheap:0.2,stamp:0.9,crowd:0.2}),'Abundance flood':P({avail:1,dens:1,everyone:0.8}),'Quiet equal gifts':P({everyone:1,crowd:0.15,stamp:0.2,rev:0.55,cheap:0.1})};}
MM.init(cfg);
