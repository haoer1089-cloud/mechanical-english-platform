const $=s=>document.querySelector(s);
const storageKey='mechanical-english-highlights-v3';
let stored={},storageProblem='',activeUnit=0,activeReading=1,pendingSelection=null,zoom=100;
let undoStack=[],toolPosition=null,drag=null;
const reader=$('#reader'),article=$('#lessonText'),tool=$('#highlightTools');
const allReadings=(lessons||[]).flatMap(u=>(u.readings||[]).map(r=>({unit:u.unit,reading:r.id,title:r.title})));
function unitLesson(id){return lessons.find(l=>l.unit===id)||null}
function unitBlocks(){return lessons.find(l=>l.unit===activeUnit)?.blocks||[]}
function reading(){return lessons.find(l=>l.unit===activeUnit)?.readings?.find(r=>r.id===activeReading)}
function blocks(){return reading()?.blocks||[]}
function highlights(){const raw=stored[activeUnit];return Array.isArray(raw)?raw.filter(a=>HighlightCore.valid(a,unitBlocks())):[]}
function visibleHighlights(){return highlights().map(a=>({...a,segments:a.segments.filter(s=>blocks().some(b=>b.id===s.block))})).filter(a=>a.segments.length)}
function status(message){$('#readerStatus').textContent=message;$('#readerStatus').classList.toggle('save-warning',!!storageProblem)}
try{
 const raw=localStorage.getItem(storageKey);
 if(raw){const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw Error('invalid');stored=parsed}
 else{
  // Preserve the old storage untouched; migrate only highlight ranges, not notes.
  const legacy=JSON.parse(localStorage.getItem('mechanical-english-annotations-v1')||'{}');
  for(const u of lessons){if(!Array.isArray(legacy[u.unit]))continue;stored[u.unit]=legacy[u.unit].filter(a=>HighlightCore.valid(a,u.blocks)).map(a=>({id:a.id,color:a.color,segments:a.segments.map(s=>({...s}))}))}
 }
 const z=Number(localStorage.getItem('mechanical-english-zoom'));if(z>=80&&z<=180)zoom=z;
}catch(e){storageProblem='无法读取本机记录，本次高亮暂不写入存储。'}
function save(list){stored[activeUnit]=list;if(storageProblem){status(storageProblem);return}try{localStorage.setItem(storageKey,JSON.stringify(stored));status('高亮已保存到当前浏览器。')}catch(e){storageProblem='浏览器无法保存，本次更改仅临时保留。';status(storageProblem)}}
function setPressed(color){document.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===color)))}
function clearSelection(){pendingSelection=null;window.getSelection()?.removeAllRanges();setPressed(null)}

function applyZoom(){article.style.setProperty('--reading-size',`${22*zoom/100}px`);$('#zoomValue').textContent=zoom+'%';$('#zoomOut').disabled=zoom<=80;$('#zoomIn').disabled=zoom>=180}
function setZoom(value){zoom=Math.min(180,Math.max(80,value));applyZoom();try{localStorage.setItem('mechanical-english-zoom',String(zoom))}catch(e){status('已调整字号，本次字号设置无法保存。')}}
$('#zoomOut').onclick=()=>setZoom(zoom-10);$('#zoomIn').onclick=()=>setZoom(zoom+10);$('#zoomReset').onclick=()=>setZoom(100);
function linkFor(r){return '#unit-'+r.unit+'/lesson-'+r.reading}
function routeReader(){
 const match=location.hash.match(/^#unit-(\d+)(?:\/lesson-(\d+))?$/);const n=match?Number(match[1]):0;
  activeUnit=units.some(u=>u.id===n)?n:0;activeReading=match?Number(match[2]||1):1;
  if(activeView!=='reading')setView('reading');
  const lesson=unitLesson(activeUnit);const readings=lesson?.readings||[];
 if(activeUnit&&readings.length&&!readings.some(r=>r.id===activeReading))activeReading=readings[0].id;
 if(activeUnit&&!readings.length)activeReading=0;
 const catalog=location.hash==='#units'||(location.hash&&!['#home',''].includes(location.hash)&&!activeUnit);
 $('#home').hidden=!!activeUnit||!!catalog;$('#catalog').hidden=!catalog;reader.hidden=!activeUnit;tool.hidden=!activeUnit;
 document.body.classList.toggle('is-reading',!!activeUnit);
 $('#navHome').setAttribute('aria-current',!activeUnit&&!catalog?'page':'false');$('#navUnits').setAttribute('aria-current',activeUnit||catalog?'page':'false');
 clearSelection();undoStack=[];$('#undoHighlight').disabled=true;
 if(activeUnit){
  const u=units.find(u=>u.id===activeUnit),current=reading();
  $('#readerUnit').textContent='UNIT '+String(u.id).padStart(2,'0')+' / '+u.title;
  $('#readerCn').textContent=u.cn;$('#readerTitle').textContent=current?current.title:'本单元暂无课文';$('#readingCounter').textContent=readings.length?('课文 '+(readings.findIndex(r=>r.id===activeReading)+1)+' / '+readings.length):'';
  const tabs=$('#readingTabs');tabs.replaceChildren();tabs.hidden=readings.length<=1;
  for(const r of readings){const a=document.createElement('a');a.href=linkFor({unit:activeUnit,reading:r.id});a.textContent='Lesson '+r.id+' · '+r.title;if(r.id===activeReading)a.setAttribute('aria-current','page');tabs.append(a)}
  if(readings.length){
   renderText();applyZoom();const i=allReadings.findIndex(r=>r.unit===activeUnit&&r.reading===activeReading);
   for(const [sel,r,prefix] of [['#previousReading',allReadings[i-1],'← 上一篇'],['#nextReading',allReadings[i+1],'下一篇 →']]){const a=$(sel);a.hidden=!r;if(r){a.href=linkFor(r);a.textContent=prefix+' · '+r.title}else{a.removeAttribute('href');a.textContent=''}}
   status(storageProblem||'选中文字，再选择颜色；点击高亮可清除。');
  }else{
   renderText();
   $('#previousReading').hidden=true;$('#nextReading').hidden=true;
   status('本单元暂无课文，已为你显示空状态。');
  }
  $('#readerTitle').focus({preventScroll:true});document.title=current?current.title+' · Unit '+u.id+' · 机械基础概论':'Unit '+u.id+' · 机械基础概论';requestAnimationFrame(placeTools);
  }else{document.title='机械基础概论 · 机械英语教学平台';if(catalog)$('.catalog-heading h1').focus({preventScroll:true})}
  updateViewSwitch();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',routeReader);
function captureSelection(){
 if(!activeUnit||drag)return;
 const selection=window.getSelection();if(!selection||selection.isCollapsed||!selection.rangeCount)return;
 const range=selection.getRangeAt(0);
 if(!article.contains(range.startContainer)||!article.contains(range.endContainer)){pendingSelection=null;setPressed(null);return}
 const segments=[];
 for(const el of article.children){if(!range.intersectsNode(el))continue;let start=0,end=el.textContent.length;
  if(el.contains(range.startContainer)){const before=document.createRange();before.selectNodeContents(el);before.setEnd(range.startContainer,range.startOffset);start=before.toString().length}
  if(el.contains(range.endContainer)){const before=document.createRange();before.selectNodeContents(el);before.setEnd(range.endContainer,range.endOffset);end=before.toString().length}
  if(end>start)segments.push({block:el.dataset.block,start,end})
 }
 pendingSelection=segments.length?{unit:activeUnit,reading:activeReading,segments}:null;setPressed(null);if(pendingSelection)status(storageProblem||'已选中文字，可高亮、更换颜色或清除。');
}
document.addEventListener('selectionchange',captureSelection);article.addEventListener('pointerup',captureSelection);article.addEventListener('keyup',captureSelection);
article.addEventListener('pointerdown',()=>{pendingSelection=null;setPressed(null)});
// Hold the paragraph offsets while touch or mouse interaction moves to the floating window.
document.querySelectorAll('#toolBody button').forEach(b=>b.addEventListener('pointerdown',e=>{captureSelection();if(e.pointerType==='mouse')e.preventDefault()}));
function changeHighlight(color){
 if(!pendingSelection||pendingSelection.unit!==activeUnit||pendingSelection.reading!==activeReading){status(storageProblem||'请先选中文字，或点击一处已有高亮。');return}
 const before=highlights();const id=globalThis.crypto?.randomUUID?.()||'hl-'+Date.now()+'-'+Math.random().toString(36).slice(2);
 const next=HighlightCore.apply(before,pendingSelection.segments,color,id);
 if(JSON.stringify(before)===JSON.stringify(next)){status('选中文字尚未高亮。');return}
 undoStack.push(before);if(undoStack.length>30)undoStack.shift();save(next);clearSelection();renderText();$('#undoHighlight').disabled=false;
}
document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>changeHighlight(b.dataset.color));$('#eraseHighlight').onclick=()=>changeHighlight(null);
$('#undoHighlight').onclick=()=>{if(!undoStack.length)return;save(undoStack.pop());clearSelection();renderText();$('#undoHighlight').disabled=!undoStack.length};
function selectMark(mark){const a=visibleHighlights().find(a=>a.id===mark.dataset.highlight);if(!a)return;pendingSelection={unit:activeUnit,reading:activeReading,segments:a.segments.map(s=>({...s}))};setPressed(a.color);status(storageProblem||'已选中高亮，可更换颜色或点击清除。')}
article.addEventListener('click',e=>{const mark=e.target.closest('mark');if(mark&&window.getSelection()?.isCollapsed)selectMark(mark)});
article.addEventListener('keydown',e=>{const mark=e.target.closest('mark');if(mark&&(e.key==='Enter'||e.key===' ')){e.preventDefault();selectMark(mark);$('#eraseHighlight').focus()}});
function placeTools(){
 if(tool.hidden)return;const v=window.visualViewport;const left=v?.offsetLeft||0,top=v?.offsetTop||0,w=v?.width||innerWidth,h=v?.height||innerHeight;const r=tool.getBoundingClientRect();
 const initial=toolPosition||{x:teacherMode?left+20:left+w-r.width-20,y:top+h-r.height-24};
 toolPosition={x:Math.max(left+8,Math.min(initial.x,left+w-r.width-8)),y:Math.max(top+8,Math.min(initial.y,top+h-r.height-8))};
 tool.style.left=toolPosition.x+'px';tool.style.top=toolPosition.y+'px';tool.style.right='auto';tool.style.bottom='auto';
}
const handle=$('#dragHandle');
handle.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();const r=tool.getBoundingClientRect();drag={id:e.pointerId,dx:e.clientX-r.left,dy:e.clientY-r.top};handle.setPointerCapture(e.pointerId);tool.classList.add('dragging')});
handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;toolPosition={x:e.clientX-drag.dx,y:e.clientY-drag.dy};placeTools()});
function stopDrag(){drag=null;tool.classList.remove('dragging')}
handle.addEventListener('pointerup',stopDrag);handle.addEventListener('pointercancel',stopDrag);handle.addEventListener('lostpointercapture',stopDrag);
handle.addEventListener('keydown',e=>{const delta={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];if(e.key==='Home'){e.preventDefault();toolPosition=null;placeTools()}else if(delta){e.preventDefault();placeTools();toolPosition.x+=delta[0];toolPosition.y+=delta[1];placeTools()}});
$('#collapseTools').onclick=()=>{const body=$('#toolBody');body.hidden=!body.hidden;$('#collapseTools').textContent=body.hidden?'+':'−';$('#collapseTools').setAttribute('aria-expanded',String(!body.hidden));$('#collapseTools').setAttribute('aria-label',body.hidden?'展开阅读工具':'收起阅读工具');placeTools()};
window.addEventListener('resize',placeTools);window.visualViewport?.addEventListener('resize',placeTools);window.visualViewport?.addEventListener('scroll',placeTools);

// Terminology graph view for Unit 1 Lesson 1. Switching views only hides the
// reading surface; teacher mode, question-panel collapse state and question
// width are kept untouched so returning restores them exactly.
let activeView='reading';
const viewSwitch=$('#viewSwitch'),viewReadingBtn=$('#viewReading'),viewTermsBtn=$('#viewTerms');
const termView=$('#termView'),termDiagram=$('#termDiagram'),termDetail=$('#termDetail'),keyTermHint=$('#keyTermHint');
function termAvailable(){return !!(activeUnit&&reading()&&typeof TermView!=='undefined'&&TermView.hasData(activeUnit,activeReading))}
function setView(view){
  if(view===activeView)return;
  activeView=view;const terms=view==='terms';
  viewReadingBtn.setAttribute('aria-pressed',String(!terms));
  viewTermsBtn.setAttribute('aria-pressed',String(terms));
  reader.classList.toggle('term-mode',terms);
  termView.hidden=!terms;
  tool.hidden=terms;
  keyTermHint.hidden=terms||!termAvailable();
  if(terms){
    TermView.mount(termDiagram,termDetail,activeUnit,activeReading,{onGotoBlock:gotoBlock});
  }else{
    TermView.destroy();
    requestAnimationFrame(placeTools);
  }
}
function updateViewSwitch(){
  const avail=termAvailable();
  viewSwitch.hidden=!avail;
  if(activeView==='reading')keyTermHint.hidden=!avail;
  if(!avail&&activeView==='terms')setView('reading');
}
function openTerm(id){
  if(!id)return;
  setView('terms');
  if(typeof TermView!=='undefined')TermView.select(id);
}
function gotoBlock(blockId){
  if(!blockId)return;
  setView('reading');
  requestAnimationFrame(()=>{
    const target=document.getElementById(blockId);
    if(!target)return;
    const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});
    target.classList.add('term-flash');
    setTimeout(()=>target.classList.remove('term-flash'),2600);
  });
}
viewReadingBtn.onclick=()=>setView('reading');
viewTermsBtn.onclick=()=>setView('terms');

routeReader();

// Core-term marking: emphasise the first occurrence of each key term in the
// lesson text without touching lessons.js. Offsets stay relative to the raw
// block text, so existing highlights remain accurate.
function termNodes(){
  if(typeof TermView==='undefined')return[];
  const g=globalThis.termGraph||{};
  const data=g[activeUnit+'/'+activeReading];
  return (data&&data.nodes)||[];
}
function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function termMatches(){
  const map=new Map();
  const nodes=termNodes();
  if(!nodes.length)return map;
  const bs=blocks().filter(b=>b.kind==='p');
  const variants=[];
  nodes.forEach(n=>{(n.variants||[]).forEach(v=>variants.push({v:String(v).toLowerCase(),len:String(v).length,id:n.id}))});
  variants.sort((a,b)=>b.len-a.len);
  const occupied=[];
  const seen=new Set();
  for(const {v,id} of variants){
    if(seen.has(id))continue;
    for(const b of bs){
      const re=new RegExp('\\b'+escapeRegExp(v)+'\\b','gi');
      let m,found=-1;
      while((m=re.exec(b.text))){
        const s=m.index,e=s+m[0].length;
        if(occupied.some(o=>o.block===b.id&&s<o.end&&e>o.start))continue;
        found=s;break;
      }
      if(found>=0){
        if(!map.has(b.id))map.set(b.id,[]);
        map.get(b.id).push({start:found,end:found+m[0].length,termId:id});
        occupied.push({block:b.id,start:found,end:found+m[0].length});
        seen.add(id);
        break;
      }
    }
  }
  return map;
}
function renderBlockContent(el,b,termSpans){
  const hlSpans=visibleHighlights().flatMap(a=>a.segments.filter(s=>s.block===b.id).map(s=>({start:s.start,end:s.end,id:a.id,color:a.color}))).sort((a,b)=>a.start-b.start);
  const points=new Set([0,b.text.length]);
  hlSpans.forEach(s=>{points.add(s.start);points.add(s.end)});
  termSpans.forEach(s=>{points.add(s.start);points.add(s.end)});
  const sorted=[...points].sort((a,b)=>a-b);
  for(let i=0;i<sorted.length-1;i++){
    const s=sorted[i],e=sorted[i+1];
    if(s>=e)continue;
    const seg=b.text.slice(s,e);
    const hl=hlSpans.find(h=>h.start<=s&&h.end>=e);
    const term=termSpans.find(t=>t.start<=s&&t.end>=e);
    if(hl){
      const mark=document.createElement('mark');mark.className='hl-'+hl.color;mark.dataset.highlight=hl.id;mark.textContent=seg;mark.tabIndex=0;mark.setAttribute('role','button');mark.setAttribute('aria-label','选择此处高亮，可更换颜色或清除');mark.title='点击后，可更换颜色或清除';el.append(mark)
    }else if(term){
      const btn=document.createElement('button');btn.type='button';btn.className='key-term';btn.dataset.term=term.termId;btn.textContent=seg;btn.setAttribute('aria-label','核心术语：'+seg+'，点击查看术语谱系');btn.title='点击查看术语谱系';btn.addEventListener('click',()=>openTerm(term.termId));el.append(btn)
    }else{
      el.append(document.createTextNode(seg))
    }
  }
}

function renderText(){
  article.replaceChildren();
  const bs=blocks();
  if(activeUnit&&!bs.length){const empty=document.createElement('p');empty.className='reading-empty';empty.textContent='本单元暂时没有课文内容，请联系教师补充。';article.append(empty);return}
  const termMap=termMatches();
  let paragraphNumber=1;
  for(const b of bs){
    const el=document.createElement(b.kind);
    if(b===bs[0]&&b.kind==='h2')el.className='source-lesson-title';
    el.dataset.block=b.id;el.id=b.id;
    if(b.kind==='p'){el.dataset.para='Para.'+paragraphNumber;paragraphNumber+=1}
    renderBlockContent(el,b,termMap.get(b.id)||[]);
    article.append(el)
  }
}

// Teacher mode surface for U1L1: data-para labels are only revealed by CSS
// in .teacher-mode, so student mode keeps the same reading view unchanged.
let teacherMode=false, questionWidth=420, splitDrag=null;
function renderQuestions(){
  const list=$('#questionList');list.replaceChildren();
  const key=activeUnit+'/'+activeReading;const items=classroomQuestions[key]||[];
  if(!items.length){const empty=document.createElement('p');empty.className='question-empty';empty.textContent='目前只为 Unit 1 · Lesson 1 配置课堂问题。';list.append(empty);return}
  items.forEach((q,index)=>{
    const card=document.createElement('section');card.className='question-card'+(q.type.startsWith('Practice')?' fill-question':'');
    const meta=document.createElement('div');meta.className='question-meta';meta.innerHTML=`<span>${q.para||'最后练习'}</span><small>${q.type}</small>`;
    const prompt=document.createElement('p');prompt.className='question-prompt';prompt.textContent=(index+1)+'. '+q.prompt;
    const answer=document.createElement('div');answer.className='question-answer';answer.hidden=true;answer.textContent=q.answer;
    const button=document.createElement('button');button.className='answer-button';button.type='button';button.textContent='Answer';button.setAttribute('aria-expanded','false');button.onclick=()=>{answer.hidden=!answer.hidden;button.textContent=answer.hidden?'Answer':'Hide answer';button.setAttribute('aria-expanded',String(!answer.hidden))};
    card.append(meta,prompt,button,answer);list.append(card)
  })
}
function syncClassroom(){
  const isReading=!!activeUnit;reader.classList.toggle('teacher-mode',teacherMode&&isReading);$('#modeToggle').setAttribute('aria-pressed',String(teacherMode));$('#modeToggle').textContent=teacherMode?'学生模式':'教师模式';
  $('#questionPanel').setAttribute('aria-hidden',String(!teacherMode));if(isReading)renderText();renderQuestions();
  if(teacherMode&&isReading){reader.style.setProperty('--question-width',questionWidth+'px');requestAnimationFrame(placeTools)}
}
$('#modeToggle').onclick=()=>{teacherMode=!teacherMode;if(teacherMode)toolPosition=null;syncClassroom()};
$('#toggleQuestions').onclick=()=>{reader.classList.toggle('questions-collapsed');const collapsed=reader.classList.contains('questions-collapsed');$('#toggleQuestions').textContent=collapsed?'显示问题':'隐藏问题';$('#toggleQuestions').setAttribute('aria-expanded',String(!collapsed));requestAnimationFrame(placeTools)};
function beginSplit(e){if(!teacherMode||reader.classList.contains('questions-collapsed'))return;e.preventDefault();splitDrag={id:e.pointerId};$('#workspaceDivider').setPointerCapture(e.pointerId)}
function moveSplit(e){if(!splitDrag)return;const rect=$('#teacherWorkspace').getBoundingClientRect();questionWidth=Math.max(300,Math.min(620,rect.right-e.clientX));reader.style.setProperty('--question-width',questionWidth+'px')}
function endSplit(){splitDrag=null}
$('#workspaceDivider').addEventListener('pointerdown',beginSplit);$('#workspaceDivider').addEventListener('pointermove',moveSplit);$('#workspaceDivider').addEventListener('pointerup',endSplit);$('#workspaceDivider').addEventListener('pointercancel',endSplit);
$('#workspaceDivider').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){questionWidth=Math.min(620,questionWidth+24);reader.style.setProperty('--question-width',questionWidth+'px')}if(e.key==='ArrowRight'){questionWidth=Math.max(300,questionWidth-24);reader.style.setProperty('--question-width',questionWidth+'px')}});
window.addEventListener('hashchange',syncClassroom);syncClassroom();
