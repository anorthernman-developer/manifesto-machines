/*META
{"title": "N Plus One", "deep": true, "category": "art manifesto", "date": "2026-11-13", "kicker": "ART MANIFESTO · DIMENSIONISM (1936): EACH ART STEPS INTO ONE MORE DIMENSION, AND THE LISTENER ENDS UP IN THE MIDDLE", "bpm": 84, "idea": "A short manifesto signed in Paris in 1936 claimed that every art was moving into one more dimension: writing leaves the line for the page, painting leaves the canvas for space, sculpture starts to move, and a future cosmic art would put the person at the centre of the work. N Plus One gives you four voices (word, painting, sculpture, cosmos) and lets each climb the same ladder: LINE (one melody, centred), PLANE (chords spread left to right), SPACE (placed around your head), MOTION (orbiting you) and VAPOUR (scattered into a cloud of grains with you inside it). Wear headphones.", "controls": "6 slots (word, painting, sculpture, cosmos, pulse, ground); a dimension for each of the four voices (line, plane, space, motion, vapour); N+1 raises every voice one step; ASCENT raises one voice every few bars and wraps round; orbit speed, size of the space, vapour grain count and spread; density, key, scale and progression; levels for each voice and reverb; a stereograph-card VJ view whose two pictures make a real stereo pair.", "how": "Press PLAY (headphones help): the word is a line, the painting a plane, the sculpture sits in space and the cosmos orbits you. Press N to give every voice one more dimension, or 1 to 4 to raise one voice at a time (Shift with 1 to 4 lowers it). A turns ASCENT on and off, Z resets to where the manifesto starts. Open the deck (D) to load your own sounds and trim each with the S and E handles. Press F for the full-screen stereograph: relax your eyes and let the two pictures merge.", "fonts": "family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Cormorant+SC:wght@500;700", "try": ["Record yourself saying one word and load it into slot 1, trimmed tight with S and E. Raise the word from LINE through PLANE and SPACE to VAPOUR (press 1 four times): the same word goes from a melody to a chord to a voice behind you to a cloud you are standing in.", "Load a long pad or a held chord of your own into slot 2 and set the painting to MOTION with a slow orbit: your chord circles your head like a mobile.", "Put a metallic hit (a pan lid, a bike bell, a glass) into slot 3, turn ASCENT on with 2 bars, and leave it: every voice climbs the ladder in turn, so the piece keeps opening out and starting again."], "manifesto": {"name": "The Dimensionist Manifesto (1936): every art absorbs one more dimension (N + 1), ending in a cosmic art with the person at its centre", "short": "Dimensionism", "author": "Inspired by the Dimensionist Manifesto, written by a Hungarian poet in Paris in 1936 and signed by a large international group of artists", "year": "1936", "where": "Paris", "ideas": ["In our words: the manifesto says the arts are all moving at once, each one taking on the next dimension up. It sums this up as N + 1.", "In our words: literature leaves the line and enters the plane (poems laid out across the page as pictures and diagrams).", "In our words: painting leaves the flat surface and enters space (constructions, objects and works made of several materials).", "In our words: sculpture leaves closed, still forms behind, first opening up to inner space and then to movement (open, mobile and kinetic sculpture).", "In our words: after these comes a cosmic art, a kind of vaporised sculpture or 'matter-music', in which the person no longer looks at the work from outside but stands at its centre and takes it in with all five senses.", "Nothing is quoted here: the text is in copyright, so all of the above is our own paraphrase."], "quotes": [], "system": "Each of the four voices has its own part (the word sings a wandering line, the painting holds chords, the sculpture strikes a pattern, the cosmos sounds long tones) and a dimension from 1 to 5. At LINE a note is one sound, centred. At PLANE it becomes a three-note chord spread across the stereo field. At SPACE it is sent through a 3D (HRTF) panner to a fixed place around your head. At MOTION that place orbits you at the ORBIT speed. At VAPOUR each note is broken into a cloud of short grains taken from all over the slot's trimmed region and scattered to points all around you. N+1 raises every voice by one; ASCENT raises one voice every few bars and sends a voice that passes VAPOUR back to LINE, so the climb keeps beginning again. The pulse and the ground stay flat, as a floor to stand on.", "dubious": "The manifesto lists many signatories and endorsers, and its history has been retold in later exhibitions and books; dates and details here are kept to what is widely agreed. 3D panning over headphones varies from person to person."}, "design": {"name": "Stereograph card: twin photographs side by side on a stiff card mount, with arched or rounded windows, a series title and number, and printed captions on the margins (stereoscope view cards, 1850s to 1930s)", "short": "Stereograph card", "who": "Commercial stereoview publishers and their photographers", "era": "1850s to 1930s", "hallmarks": ["Two near-identical photographs side by side, taken a short distance apart, so a viewer merges them into one picture with depth; here the two pictures really are drawn from two eye positions.", "A buff or grey card mount with rounded corners and arched windows, and the series name and number printed up the sides.", "Sepia tones, a soft vignette and a short descriptive caption under the pictures."], "works": ["Look up 19th-century stereograph cards in museum and library photographic collections", "Search for stereoscope viewers and how parallel free-viewing of stereo pairs works", "Look up stereoview card mounts with arched windows and printed series titles"]}}
*/
/*CSS
:root{--bg:#4a4640;--fg:#2e2418;--acc:#7a5a32;--bar-bg:#2e2418;--bar-fg:#eadcc0;--bar-font:'Cormorant SC',serif;--learn-font:'Old Standard TT',serif;--learn-bg:#efe4cc;--deck-bg:#efe4cc;--head-font:'Old Standard TT',serif}
#mm-stage{display:grid;grid-template-columns:minmax(0,1fr) 290px}
#view{position:relative;overflow:hidden;background:#4a4640}#cv{position:absolute;inset:0;width:100%;height:100%}
#side{overflow:auto;padding:8px 14px 14px;border-left:2px solid #2e2418;font:400 13px 'Old Standard TT';background:#efe4cc;color:#2e2418}
#side h3{font:700 15px 'Cormorant SC';letter-spacing:.1em;margin:12px 0 2px;border-bottom:1px solid #7a5a32;color:#5a3f20}
#side .mmx-ctl{grid-template-columns:100px 1fr 40px;font:400 13px 'Old Standard TT'}#side .mmx-ctl select{grid-column:2/4;min-width:0}
#side .bt{display:flex;gap:4px;flex-wrap:wrap;margin:6px 0}#side .bt button{font:700 13px 'Cormorant SC';border:1.5px solid #2e2418;background:#e2d2ae;color:#2e2418;padding:4px 8px;cursor:pointer;border-radius:10px}#side .bt button:hover{background:#5a3f20;color:#efe4cc}
#dims{display:grid;grid-template-columns:auto 1fr;gap:2px 8px;font:400 13px 'Old Standard TT';margin:6px 0}#dims b{font:700 13px 'Cormorant SC'}
#mm-learn-dlg h2{font:700 30px/1.08 'Old Standard TT'}
*/
/*HTML
<div id="view"><canvas id="cv" aria-label="N Plus One: a stereograph card whose twin pictures show four voices rising from line to plane to space to vapour"></canvas></div>
<div id="side"><div class="bt"><button id="b-n">N · N+1</button><button id="b-a">A · ASCENT</button><button id="b-z">Z · BACK TO THE START</button></div>
<div id="dims"></div><h3>Dimensions</h3><div id="c0"></div><h3>Space</h3><div id="c1"></div><h3>Harmony</h3><div id="c2"></div><h3>Mix</h3><div id="c3"></div></div>
*/
const TAU=Math.PI*2,R=Math.random,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),NM=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const DIM=['','LINE','PLANE','SPACE','MOTION','VAPOUR'],VO=['Word','Painting','Sculpture','Cosmos'],START=[1,2,3,4];
const PROGS={'i-iv-VI-V':[0,3,5,4],'I-IV-vi-V':[0,3,5,4],'i-VII-VI-VII':[0,6,5,6],'I-iii-IV-I':[0,2,3,0]};
const st=MMX.bind({d0:1,d1:2,d2:3,d3:4,ascent:false,ascBars:4,orbit:0.25,size:2.5,grains:14,spread:0.8,dens:0.6,key:2,scale:'dorian',prog:'i-iv-VI-V',word:0.8,paint:0.55,sculpt:0.7,cosmos:0.5,pulse:0.3,ground:0.5,rev:0.35,lv:0.95});
let N={},cv,ang=[0,Math.PI/2,Math.PI,Math.PI*1.5],flash=[0,0,0,0],grains=[],bar=0,ascI=0,level=0,wDeg=0,t0=0;
const dimOf=k=>clamp(st['d'+k]|0,1,5);
function semis(d,o=0){return MM.deg(d,st.scale,st.key)+12*o-(st.key>6?12:0);}
function pos(k){const d=dimOf(k),r=st.size;let a=ang[k];if(d<3)return[[-1.3,1.2,-0.5,0.7][k],[0.9,0.25,-0.35,1.15][k],-r];return[Math.sin(a)*r,(k%2?0.4:-0.2),-Math.cos(a)*r];}
function place(p,[x,y,z],t){if(p.positionX){p.positionX.setTargetAtTime(x,t,0.05);p.positionY.setTargetAtTime(y,t,0.05);p.positionZ.setTargetAtTime(z,t,0.05);}else p.setPosition(x,y,z);}
/* render one note of voice k at its current dimension */
function voice(k,t,o){const d=dimOf(k),g=o.gain*st.lv;flash[k]=1;
  if(d===1){MMX.fire(k,t,Object.assign({},o,{gain:g,pan:0,dest:N.flat}));return;}
  if(d===2){[0,2,4].forEach((x,j)=>MMX.fire(k,t+j*0.01,Object.assign({},o,{semis:(o.semis||0)+MM.deg(x,st.scale,0),gain:g*(j?0.55:0.75),pan:(j-1)*0.8,dest:N.flat})));return;}
  if(d===3||d===4){MMX.fire(k,t,Object.assign({},o,{gain:g*1.2,pan:0,dest:N.pan[k]}));return;}
  // VAPOUR: a cloud of grains from all over the region, scattered around the listener
  const n=Math.max(3,st.grains|0),span=0.6+st.spread*2.4;for(let j=0;j<n;j++){const tt=t+R()*span,ring=(R()*N.ring.length)|0;MMX.fire(k,tt,{semis:(o.semis||0)+(R()<0.3?12:0),pos:R(),dur:0.06+R()*0.2,gain:g*0.55,fadeIn:0.02,fadeOut:0.05,pan:0,dest:N.ring[ring]});grains.push({k,a:ring/N.ring.length*TAU+R()*0.5,r:st.size*(0.4+R()*0.9),y:(R()-0.5)*1.6,t:tt,life:0.6+R()*0.6});}
  if(grains.length>400)grains.splice(0,grains.length-400);}
function raise(k,dir=1){let v=dimOf(k)+dir;if(v>5)v=1;if(v<1)v=1;MMX.setParam('d'+k,v);showDims();}
function nPlusOne(){for(let k=0;k<4;k++)raise(k,1);MM.toast('N + 1: every voice one dimension up');}
function reset(){for(let k=0;k<4;k++)MMX.setParam('d'+k,START[k]);showDims();MM.toast('Back to where the manifesto starts');}
function showDims(){const el=MM.$('#dims');if(!el)return;el.innerHTML=VO.map((v,k)=>`<b>${k+1} · ${v}</b><span>${DIM[dimOf(k)]}</span>`).join('');}
function step(i,t,sd){const s=i%16,dn=st.dens;if(s===0){bar=Math.floor(i/16);if(st.ascent&&bar>0&&bar%Math.max(1,st.ascBars|0)===0){raise(ascI%4,1);ascI++;}}
  const P=PROGS[st.prog]||PROGS['i-iv-VI-V'],root=P[bar%4];
  if(s===0)MMX.fire(5,t,{semis:semis(root,-1),gain:st.ground*st.lv,maxDur:sd*15,fadeOut:0.3,dest:N.flat});
  if(s%4===0)MMX.fire(4,t,{gain:st.pulse*st.lv*(s===0?1:0.6),maxDur:0.2,dest:N.flat});
  // word: a wandering line on eighths
  if(s%2===0&&R()<0.25+dn*0.6){wDeg=clamp(wDeg+[-2,-1,-1,1,1,2][(R()*6)|0],-3,9);voice(0,t,{semis:semis(root+wDeg),gain:st.word,maxDur:sd*3,rev:st.rev});}
  // painting: held colour each bar (and half bar when dense)
  if(s===0||(s===8&&dn>0.6))voice(1,t,{semis:semis(root),gain:st.paint,dur:sd*(s?7:14),maxDur:8,fadeIn:0.15,fadeOut:0.6,rev:st.rev});
  // sculpture: a struck pattern
  if([0,3,6,10,12].includes(s)&&R()<0.4+dn*0.6)voice(2,t,{semis:semis(root+[0,4,2,7,4][[0,3,6,10,12].indexOf(s)],-1),gain:st.sculpt,maxDur:1.2,rev:st.rev*0.6});
  // cosmos: long tones every two bars
  if(s===0&&bar%2===0)voice(3,t,{semis:semis(root+4,0),gain:st.cosmos,dur:sd*30,maxDur:10,fadeIn:1,fadeOut:2,rev:st.rev*1.5});}
function tick(now){const dt=Math.min(0.1,now-(t0||now));t0=now;for(let k=0;k<4;k++){if(dimOf(k)===4)ang[k]+=dt*st.orbit*TAU*(k%2?-1:1)*(1+k*0.15);if(N.pan)place(N.pan[k],pos(k),MM.ctx.currentTime);}}
/* stereo pair projection */
function proj([x,y,z],eye,W,H,rot){const c=Math.cos(rot),s=Math.sin(rot),X=x*c-z*s,Z=x*s+z*c,cx=X-eye,cy=y-1.6,cz=Z-6.2;const yy=cy*Math.cos(0.32)-cz*Math.sin(0.32),zz=cy*Math.sin(0.32)+cz*Math.cos(0.32);const f=H*1.15/Math.max(0.5,-zz);return[W/2+cx*f,H/2-yy*f,f];}
function scene(g,W,H,eye,now,ink,paper){const rot=now*0.05;g.fillStyle=paper;g.fillRect(0,0,W,H);
  // floor grid: the space the listener stands in
  g.strokeStyle=ink;g.globalAlpha=0.18;g.lineWidth=1;for(let k=-4;k<=4;k++){let a=proj([k,-1,-4],eye,W,H,rot),b=proj([k,-1,4],eye,W,H,rot);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();a=proj([-4,-1,k],eye,W,H,rot);b=proj([4,-1,k],eye,W,H,rot);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();}g.globalAlpha=1;
  // the listener at the centre
  const L=proj([0,0,0],eye,W,H,rot);g.fillStyle=ink;g.beginPath();g.arc(L[0],L[1],L[2]*0.12,0,TAU);g.fill();g.beginPath();g.arc(L[0],L[1]+L[2]*0.35,L[2]*0.18,Math.PI,0);g.fill();
  // the picture plane for LINE and PLANE voices
  const pp=[[-2.2,1.4,-st.size-0.2],[2.2,1.4,-st.size-0.2],[2.2,-0.9,-st.size-0.2],[-2.2,-0.9,-st.size-0.2]].map(p=>proj(p,eye,W,H,0));g.strokeStyle=ink;g.globalAlpha=0.3;g.beginPath();pp.forEach((p,k)=>k?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.stroke();g.globalAlpha=1;
  for(let k=0;k<4;k++){const d=dimOf(k),p=pos(k),F=flash[k];const Q=proj(p,eye,W,H,d<3?0:rot),sz=Q[2]*(0.25+F*0.15+level*0.3);g.strokeStyle=ink;g.fillStyle=ink;g.lineWidth=1.5+F*2;
    if(d===1){g.beginPath();g.moveTo(Q[0]-sz*1.6,Q[1]);for(let j=0;j<=20;j++)g.lineTo(Q[0]-sz*1.6+j/20*sz*3.2,Q[1]+Math.sin(j*0.9+now*3)*sz*0.15*F);g.stroke();}
    else if(d===2){g.globalAlpha=0.35+F*0.4;g.fillRect(Q[0]-sz,Q[1]-sz*0.7,sz*2,sz*1.4);g.globalAlpha=1;g.strokeRect(Q[0]-sz,Q[1]-sz*0.7,sz*2,sz*1.4);}
    else if(d===3||d===4){const e=0.3+F*0.12,cube=[];for(let a=-1;a<=1;a+=2)for(let b=-1;b<=1;b+=2)for(let c=-1;c<=1;c+=2)cube.push(proj([p[0]+a*e,p[1]+b*e,p[2]+c*e],eye,W,H,rot));
      [[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]].forEach(([a,b])=>{g.beginPath();g.moveTo(cube[a][0],cube[a][1]);g.lineTo(cube[b][0],cube[b][1]);g.stroke();});
      if(d===4){g.globalAlpha=0.4;g.beginPath();for(let j=0;j<=40;j++){const aa=ang[k]-j*0.04*(k%2?-1:1),pp2=proj([Math.sin(aa)*st.size,p[1],-Math.cos(aa)*st.size],eye,W,H,rot);j?g.lineTo(pp2[0],pp2[1]):g.moveTo(pp2[0],pp2[1]);}g.stroke();g.globalAlpha=1;}}
    else{g.globalAlpha=0.25+F*0.3;g.beginPath();g.arc(L[0],L[1],L[2]*st.size*0.9,0,TAU);g.stroke();g.globalAlpha=1;}
    g.font=`700 ${Math.max(9,Q[2]*0.14)}px 'Cormorant SC'`;g.textAlign='center';g.fillText(VO[k].toUpperCase()+' · '+DIM[d],Q[0],Q[1]-sz*1.2-6);}
  const MN=MM.now;grains.forEach(G=>{const age=MN-G.t;if(age<0||age>G.life)return;const a=G.a+age*0.4,Q=proj([Math.sin(a)*G.r,G.y+age*0.5,-Math.cos(a)*G.r],eye,W,H,rot);g.globalAlpha=1-age/G.life;g.beginPath();g.arc(Q[0],Q[1],Math.max(1,Q[2]*0.04),0,TAU);g.fill();});g.globalAlpha=1;
  const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.max(W,H)*0.7);vg.addColorStop(0,'rgba(60,40,20,0)');vg.addColorStop(1,'rgba(60,40,20,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H);}
let off=null;
function draw(ts){cv.fit();const g=cv.g,W=cv.w,H=cv.h,vj=MMX.vjOn,lv=MMX.level();level+=(lv.rms-level)*0.2;for(let k=0;k<4;k++)flash[k]*=0.93;
  g.fillStyle=vj?'#0c0a08':'#4a4640';g.fillRect(0,0,W,H);
  const cw=Math.min(W-30,(H-30)*2.05),ch=cw/2.05,cx=(W-cw)/2,cy=(H-ch)/2;g.fillStyle='#e2d2ae';g.beginPath();g.roundRect(cx,cy,cw,ch,ch*0.06);g.fill();g.strokeStyle='#b39a6c';g.lineWidth=2;g.stroke();
  const ww=cw*0.42,wh=ch*0.72,wy=cy+ch*0.1,gap=cw*0.04,wx=[cx+cw/2-gap/2-ww,cx+cw/2+gap/2];
  if(!off||off.width!==Math.round(ww)||off.height!==Math.round(wh)){off=document.createElement('canvas');off.width=Math.max(1,Math.round(ww));off.height=Math.max(1,Math.round(wh));}
  const og=off.getContext('2d'),now=(ts||0);
  [-0.16,0.16].forEach((eye,j)=>{scene(og,off.width,off.height,eye,now,'#3b2a1a','#d7c39b');g.save();g.beginPath();const x=wx[j],r=ww*0.5;g.moveTo(x,wy+wh);g.lineTo(x,wy+r*0.45);g.quadraticCurveTo(x,wy,x+r*0.45,wy);g.lineTo(x+ww-r*0.45,wy);g.quadraticCurveTo(x+ww,wy,x+ww,wy+r*0.45);g.lineTo(x+ww,wy+wh);g.closePath();g.clip();g.drawImage(off,x,wy,ww,wh);g.restore();
    g.strokeStyle='#8a7048';g.lineWidth=1.5;g.beginPath();g.moveTo(x,wy+wh);g.lineTo(x,wy+r*0.45);g.quadraticCurveTo(x,wy,x+r*0.45,wy);g.lineTo(x+ww-r*0.45,wy);g.quadraticCurveTo(x+ww,wy,x+ww,wy+r*0.45);g.lineTo(x+ww,wy+wh);g.closePath();g.stroke();});
  g.fillStyle='#4e3a22';g.textAlign='center';g.font=`italic 400 ${Math.max(11,ch*0.04)}px 'Old Standard TT'`;g.fillText(`No. 121. The arts ascending: ${VO.map((v,k)=>v.toLowerCase()+' in '+DIM[dimOf(k)].toLowerCase()).join(', ')}.`,cx+cw/2,cy+ch*0.9);
  g.font=`700 ${Math.max(10,ch*0.035)}px 'Cormorant SC'`;g.save();g.translate(cx+ch*0.05,cy+ch/2);g.rotate(-Math.PI/2);g.fillText('THE DIMENSIONIST VIEW SERIES',0,0);g.restore();g.save();g.translate(cx+cw-ch*0.05,cy+ch/2);g.rotate(Math.PI/2);g.fillText(`N + 1 · ${NM[st.key]} ${st.scale.toUpperCase()} · ${Math.round(MM.bpm)} BPM`,0,0);g.restore();
  if(vj){g.fillStyle='#e2d2ae';g.font=`italic 400 13px 'Old Standard TT'`;g.fillText('Relax your eyes and let the two pictures drift together into one.',W/2,H-10);}}
const mk=(len,fn)=>{const c=MM.ctx,sr=c.sampleRate,b=c.createBuffer(1,(sr*len)|0,sr),d=b.getChannelData(0);let pk=0;for(let i=0;i<d.length;i++){d[i]=fn(i/sr);pk=Math.max(pk,Math.abs(d[i]));}for(let i=0;i<d.length;i++)d[i]*=0.8/(pk||1);return b;};
const C4=261.63,C3=130.81;
const FBS={word:()=>mk(0.9,t=>{const f=C4,form=[700,1200],e=Math.sin(Math.PI*Math.min(1,t/0.9))**0.8;let v=0;for(let h=1;h<12;h++){const fh=f*h,amp=Math.exp(-((fh-form[0])**2)/2e5)+0.6*Math.exp(-((fh-form[1])**2)/3e5)+0.15;v+=Math.sin(TAU*fh*t+0.2*Math.sin(TAU*5*t))*amp/h;}return v*e;}),
  paint:()=>mk(5,t=>[1,2,3,4,5].reduce((s,h,j)=>s+Math.sin(TAU*C3*h*t*(1+0.002*Math.sin(TAU*0.25*t+j)))/(h*1.3),0)*Math.min(1,t/0.4)*Math.min(1,(5-t)/1.5)),
  sculpt:()=>mk(1.6,t=>[1,2.32,4.25,6.63].reduce((s,h,j)=>s+Math.sin(TAU*C3*h*t)*Math.exp(-t*(1.5+j*2.5))/(j+1),0)*Math.min(1,t*700)),
  cosmos:()=>{let lp=0;return mk(6,t=>{lp+=0.05*((R()*2-1)-lp);return (Math.sin(TAU*C4*t+Math.sin(TAU*0.5*t)*2)*0.5+Math.sin(TAU*C4*1.5*t)*0.3+lp*1.5)*Math.min(1,t/1.5)*Math.min(1,(6-t)/2);});},
  pulse:()=>mk(0.15,t=>Math.sin(TAU*(60*t+60*(1-Math.exp(-t*40))/40))*Math.exp(-t*25)),
  ground:()=>mk(3,t=>(Math.sin(TAU*65.41*t)+0.3*Math.sin(TAU*130.81*t))*Math.min(1,t*80)*Math.exp(-t*0.8))};
const cfg={bpm:84,div:4,swing:0,step,tick,draw,start:()=>{ascI=0;},stop:()=>{},
  onSamples:list=>{MMX.assign(list);voice(0,MM.now+0.02,{gain:st.word,maxDur:2});},
  key:e=>{if(MMX.key(e))return;const k=e.key.toLowerCase();if(k==='n'||k==='+'){nPlusOne();return;}if(k==='a'){MMX.setParam('ascent',!st.ascent);MM.toast('Ascent '+(st.ascent?'on':'off'));return;}if(k==='z'){reset();return;}
    const map={'1':0,'2':1,'3':2,'4':3,'!':0,'"':1,'@':1,'£':2,'#':2,'$':3};if(e.code&&/^Digit[1-4]$/.test(e.code)){const v=+e.code.slice(5)-1;raise(v,e.shiftKey?-1:1);MM.toast(VO[v]+': '+DIM[dimOf(v)]);}else if(k in map){raise(map[k],1);}},
  setup(){MM.ensure();const c=MM.ctx;N.flat=c.createGain();N.flat.connect(MM.out);N.space=c.createGain();N.space.gain.value=1.2;N.space.connect(MM.out);
    const mkP=()=>{const p=c.createPanner();p.panningModel='HRTF';p.distanceModel='inverse';p.refDistance=1;p.rolloffFactor=0.6;p.connect(N.space);return p;};
    N.pan=[0,1,2,3].map(mkP);N.ring=Array.from({length:8},(_,j)=>{const p=mkP();const a=j/8*TAU,r=2;place(p,[Math.sin(a)*r,(j%2?0.6:-0.4),-Math.cos(a)*r],0);return p;});
    if(c.listener.forwardX){c.listener.forwardX.value=0;c.listener.forwardY.value=0;c.listener.forwardZ.value=-1;c.listener.upY.value=1;}
    Object.entries(FBS).forEach(([k,f])=>MM.fb[k]=f());cv=MM.canvas('#cv');
    MMX.init({state:st,slots:[['Word (a syllable or word)','word'],['Painting (a held colour)','paint'],['Sculpture (a struck object)','sculpt'],['Cosmos (a long texture)','cosmos'],['Pulse','pulse'],['Ground (low root)','ground']].map(([label,kind],i)=>({label,kind,rv:[0.2,0.35,0.2,0.4,0.02,0.05][i],gain:0.9})),
      onSlot:i=>{if(!MM.playing)MMX.fire(i,MM.now+0.02,{maxDur:2,dest:N.flat});},onTrim:()=>{},onPreset:()=>showDims(),factory:fac(),extra:null,
      keys:[['N or +','N + 1: every voice one dimension up'],['1-4','raise word, painting, sculpture or cosmos'],['Shift + 1-4','lower that voice'],['A','ascent on or off'],['Z','back to where the manifesto starts']],
      midiHelp:'Notes 36 to 39 raise voices 1 to 4; note 48 is N + 1; other notes play the word at that pitch in its current dimension. CC 1 orbit speed, CC 2 vapour spread.',
      midi:(n,v,on)=>{if(!on)return;if(n>=36&&n<40)raise(n-36,1);else if(n===48)nPlusOne();else voice(0,MM.now+0.005,{semis:n-60,gain:st.word*v,maxDur:1.5});}});
    MMX.vj('#view');const C=[0,1,2,3].map(k=>MM.$('#c'+k)),opts=[1,2,3,4,5].map(d=>[d,DIM[d]]);
    VO.forEach((v,k)=>MMX.ctl(C[0],'d'+k,{type:'select',label:v,options:opts,on:showDims}));MMX.ctl(C[0],'ascent',{type:'check',label:'Ascent'});MMX.ctl(C[0],'ascBars',{label:'Bars a step',min:1,max:16,step:1});
    MMX.ctl(C[1],'orbit',{label:'Orbit speed',min:0,max:1,cc:1});MMX.ctl(C[1],'size',{label:'Size of space',min:1,max:5});MMX.ctl(C[1],'grains',{label:'Vapour grains',min:3,max:40,step:1});MMX.ctl(C[1],'spread',{label:'Vapour spread',min:0,max:1,cc:2});
    MMX.ctl(C[2],'key',{type:'select',label:'Key',options:NM.map((n,j)=>[j,n])});MMX.ctl(C[2],'scale',{type:'select',label:'Scale',options:[['dorian','Dorian'],['minor','Minor'],['major','Major'],['lydian','Lydian'],['penta','Pentatonic']]});MMX.ctl(C[2],'prog',{type:'select',label:'Progression',options:Object.keys(PROGS).map(k=>[k,k])});MMX.ctl(C[2],'dens',{label:'Density',min:0,max:1});
    MMX.ctl(C[3],'word',{label:'Word',min:0,max:1.5});MMX.ctl(C[3],'paint',{label:'Painting',min:0,max:1.5});MMX.ctl(C[3],'sculpt',{label:'Sculpture',min:0,max:1.5});MMX.ctl(C[3],'cosmos',{label:'Cosmos',min:0,max:1.5});MMX.ctl(C[3],'pulse',{label:'Pulse',min:0,max:1.5});MMX.ctl(C[3],'ground',{label:'Ground',min:0,max:1.5});MMX.ctl(C[3],'rev',{label:'Reverb',min:0,max:1});MMX.ctl(C[3],'lv',{label:'Level',min:0,max:1.5});
    showDims();MM.$('#b-n').onclick=nPlusOne;MM.$('#b-a').onclick=()=>{MMX.setParam('ascent',!st.ascent);MM.toast('Ascent '+(st.ascent?'on':'off'));};MM.$('#b-z').onclick=reset;}};
function fac(){const b0=JSON.parse(JSON.stringify(st)),P=o=>({full:{params:Object.assign({},b0,o),extra:null}});
  return{'Where the manifesto starts (default)':{},'After N + 1':P({d0:2,d1:3,d2:4,d3:5}),'Everything flat':P({d0:1,d1:2,d2:2,d3:2}),'All vapour':P({d0:5,d1:5,d2:5,d3:5,grains:20,dens:0.4}),'The endless ascent':P({ascent:true,ascBars:2}),'Slow mobile':P({d0:4,d1:4,d2:4,d3:4,orbit:0.08,size:3.5})};}
MM.init(cfg);
