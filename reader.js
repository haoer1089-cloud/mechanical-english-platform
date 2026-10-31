const $=s=>document.querySelector(s);
const storageKey='mechanical-english-highlights-v3';
let stored={},storageProblem='',activeUnit=0,activeReading=1,pendingSelection=null,zoom=100;
let undoStack=[],toolPosition=null,drag=null;
let teacherMode=false,expandedGroup=null,lastFocus=null;const answerState={},groupIndex={};
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
  syncClassroom();
  updateViewSwitch();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',routeReader);
function textBlockEls(){return [...article.children].filter(el=>el.dataset.block&&blocks().some(b=>b.id===el.dataset.block))}
function isInTextBlock(node){const el=node&&node.nodeType===3?node.parentElement:(node&&node.nodeType===1?node:null);return !!(el&&el.closest('#lessonText [data-block]'))}
function captureSelection(){
 if(!activeUnit||drag)return;
 const selection=window.getSelection();if(!selection||selection.isCollapsed||!selection.rangeCount)return;
 const range=selection.getRangeAt(0);
 if(!article.contains(range.startContainer)||!article.contains(range.endContainer)){pendingSelection=null;setPressed(null);return}
 const startInBlock=isInTextBlock(range.startContainer),endInBlock=isInTextBlock(range.endContainer);
 let touchesCard=false;
 for(const el of article.querySelectorAll('.para-questions')){if(range.intersectsNode(el)){touchesCard=true;break}}
 if(!startInBlock||!endInBlock||touchesCard){pendingSelection=null;setPressed(null);if(startInBlock||endInBlock)status(storageProblem||'请重新选择：只能高亮课文正文，不能包含问题卡或段落标号。');return}
 const segments=[];
 for(const el of textBlockEls()){if(!range.intersectsNode(el))continue;let start=0,end=el.textContent.length;
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
 // 保留当前展开的问题组状态
 const preservedGroup=expandedGroup;
 const preservedIndex={...groupIndex};
 const preservedAnswerState={...answerState};
 undoStack.push(before);if(undoStack.length>30)undoStack.shift();save(next);clearSelection();renderText();$('#undoHighlight').disabled=false;
 // 恢复问题组状态
 if(preservedGroup){
   expandedGroup=null;
   Object.assign(groupIndex,preservedIndex);
   Object.assign(answerState,preservedAnswerState);
   expandQuestions(preservedGroup);
 }
}
document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>changeHighlight(b.dataset.color));$('#eraseHighlight').onclick=()=>changeHighlight(null);
$('#undoHighlight').onclick=()=>{if(!undoStack.length)return;save(undoStack.pop());clearSelection();renderText();$('#undoHighlight').disabled=!undoStack.length};
function selectMark(mark){const a=visibleHighlights().find(a=>a.id===mark.dataset.highlight);if(!a)return;pendingSelection={unit:activeUnit,reading:activeReading,segments:a.segments.map(s=>({...s}))};setPressed(a.color);status(storageProblem||'已选中高亮，可更换颜色或点击清除。')}
article.addEventListener('click',e=>{const mark=e.target.closest('mark');if(!mark||!window.getSelection()?.isCollapsed)return;if(mark.dataset.term){openTerm(mark.dataset.term);return}selectMark(mark)});
article.addEventListener('keydown',e=>{const mark=e.target.closest('mark');if(!mark||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();if(mark.dataset.term){openTerm(mark.dataset.term);return}selectMark(mark);$('#eraseHighlight').focus()});
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

// Terminology graph view. Switching views only hides the reading surface;
// teacher mode, expanded question group, current question index and answer
// state are kept untouched so returning restores the classroom exactly.
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
function termMatches(){
  const map=new Map();
  const nodes=termNodes();
  if(!nodes.length)return map;
  const bs=blocks().filter(b=>b.kind==='p');
  const wordRe=/[A-Za-z0-9]/;
  const terms=nodes.filter(n=>n.kind!=='group'&&Array.isArray(n.variants)&&n.variants.length);
  const candidatesByTerm=[];
  for(const n of terms){
    const hyph=!!n.allowInsideHyphenatedPhrase;
    const seenVar=new Set();
    const cand=[];
    for(const raw of n.variants){
      const v=String(raw).toLowerCase();
      if(!v||seenVar.has(v))continue;
      seenVar.add(v);
      bs.forEach((b,bi)=>{
        const lower=b.text.toLowerCase();
        let idx=0;
        while((idx=lower.indexOf(v,idx))!==-1){
          const s=idx,e=idx+v.length;
          const before=s>0?lower[s-1]:'';
          const after=e<lower.length?lower[e]:'';
          if(wordRe.test(before)||wordRe.test(after)){idx=e;continue;}
          if(!hyph&&(before==='-'||after==='-')){idx=e;continue;}
          cand.push({bi,s,e,len:v.length});
          idx=e;
        }
      });
    }
    cand.sort((a,b)=>a.bi-b.bi||a.s-b.s||b.len-a.len);
    candidatesByTerm.push({id:n.id,cand});
  }
  const entries=candidatesByTerm.filter(t=>t.cand.length).map(t=>({id:t.id,cand:t.cand,first:t.cand[0]})).sort((a,b)=>a.first.bi-b.first.bi||a.first.s-b.first.s||b.first.len-a.first.len);
  const occupied=[],seen=new Set();
  for(const entry of entries){
    if(seen.has(entry.id))continue;
    for(const c of entry.cand){
      const b=bs[c.bi];
      if(occupied.some(o=>o.block===b.id&&c.s<o.end&&c.e>o.start))continue;
      if(!map.has(b.id))map.set(b.id,[]);
      map.get(b.id).push({start:c.s,end:c.e,termId:entry.id});
      occupied.push({block:b.id,start:c.s,end:c.e});
      seen.add(entry.id);
      break;
    }
  }
  for(const spans of map.values())spans.sort((a,b)=>a.start-b.start);
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
    if(hl&&term){
      const mark=document.createElement('mark');mark.className='hl-'+hl.color+' key-term';mark.dataset.highlight=hl.id;mark.dataset.term=term.termId;mark.textContent=seg;mark.tabIndex=0;mark.setAttribute('role','button');mark.setAttribute('aria-label','核心术语：'+seg+'（已高亮），点击查看术语谱系');mark.title='点击查看术语谱系';el.append(mark)
    }else if(hl){
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
  const termMap=termMatches();
  const isTeacher=teacherMode;
  const {byBlock}=questionGroups();
  let paragraphNumber=1;
  for(const b of bs){
    if(b.kind==='p'&&isTeacher){
      const head=document.createElement('div');
      head.className='para-head';
      const label=document.createElement('span');
      label.className='para-label';
      label.textContent='Para.'+paragraphNumber;
      head.append(label);
      const qs=byBlock.get(b.id);
      if(qs&&qs.length){
        const btn=document.createElement('button');
        btn.type='button';btn.className='para-ask';
        btn.dataset.ask=b.id;
        btn.textContent='提问 · '+qs.length;
        btn.setAttribute('aria-expanded','false');
        btn.addEventListener('click',()=>toggleParaQuestions(b.id,btn));
        head.append(btn);
      }
      article.append(head);
    }
    const el=document.createElement(b.kind);
    if(b===bs[0]&&b.kind==='h2')el.className='source-lesson-title';
    el.dataset.block=b.id;el.id=b.id;
    renderBlockContent(el,b,termMap.get(b.id)||[]);
    article.append(el);
    if(b.kind==='p')paragraphNumber+=1;
  }
  renderPracticeArea();
  expandedGroup=null;
}

// ------------------------------------------------------------------
// Teacher mode: per-paragraph questions ("随段提问").
// Questions are associated by questions.js blockId (never by Para text).
// ------------------------------------------------------------------

function reduceMotion(){return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}
function lessonQuestions(){return classroomQuestions[activeUnit+'/'+activeReading]||[]}
function questionGroups(){
  const byBlock=new Map(),practice=[];
  for(const q of lessonQuestions()){
    if(q.blockId){const a=byBlock.get(q.blockId)||[];a.push(q);byBlock.set(q.blockId,a)}
    else practice.push(q);
  }
  return {byBlock,practice};
}
function allQuestionGroups(){const g=questionGroups();const out=[...g.byBlock.entries()].map(([key,items])=>({key,kind:'para',items}));if(g.practice.length)out.push({key:'practice',kind:'practice',items:g.practice});return out}
function paraLabel(blockId){let n=0;for(const b of blocks()){if(b.kind==='p'){n+=1;if(b.id===blockId)return 'Para.'+n}}return ''}
function blockTextOf(blockId){const all=[...(unitBlocks()||[]),...(blocks()||[])];const b=all.find(x=>x.id===blockId);return b?b.text:null}
function currentGroupIndex(key){return groupIndex[key]||0}
function setGroupIndex(key,i){groupIndex[key]=i}
function groupOf(key){return allQuestionGroups().find(g=>g.key===key)||null}

function buildQuestionCard(g){
  const card=document.createElement('section');
  card.className='question-card para-questions';
  card.dataset.group=g.key;
  const head=document.createElement('header');head.className='qc-head';
  const para=document.createElement('span');para.className='qc-para';
  const type=document.createElement('span');type.className='qc-type';
  const count=document.createElement('span');count.className='qc-count';
  head.append(para,type,count);
  const prompt=document.createElement('p');prompt.className='qc-prompt';
  const answer=document.createElement('div');answer.className='qc-answer';answer.hidden=true;
  const actions=document.createElement('footer');actions.className='qc-actions';
  const prev=document.createElement('button');prev.className='qc-prev';prev.type='button';prev.textContent='上一题';
  const next=document.createElement('button');next.className='qc-next';next.type='button';next.textContent='下一题';
  const answerBtn=document.createElement('button');answerBtn.className='qc-answer-toggle';answerBtn.type='button';answerBtn.textContent='Answer';
  const enlarge=document.createElement('button');enlarge.className='qc-enlarge';enlarge.type='button';enlarge.textContent='放大展示';
  const collapse=document.createElement('button');collapse.className='qc-collapse';collapse.type='button';collapse.textContent='收起问题';
  actions.append(prev,next,answerBtn,enlarge,collapse);
  card.append(head,prompt,answer,actions);
  prev.addEventListener('click',()=>{setGroupIndex(g.key,Math.max(0,currentGroupIndex(g.key)-1));syncQuestionCard(card,g,g.key);syncOverlayIfOpen()});
  next.addEventListener('click',()=>{setGroupIndex(g.key,Math.min(g.items.length-1,currentGroupIndex(g.key)+1));syncQuestionCard(card,g,g.key);syncOverlayIfOpen()});
  answerBtn.addEventListener('click',()=>toggleAnswerForQuestion(g,card));
  enlarge.addEventListener('click',()=>openOverlay(g.key,enlarge));
  collapse.addEventListener('click',()=>collapseQuestions());
  return card;
}

function syncQuestionCard(card,g,gkey){
  const idx=currentGroupIndex(gkey);
  const q=g.items[idx],total=g.items.length;
  card.querySelector('.qc-para').textContent=(g.kind==='practice'?'课后巩固':paraLabel(gkey)||'');
  card.querySelector('.qc-type').textContent=q.type||'';
  card.querySelector('.qc-count').textContent=(idx+1)+' / '+total;
  card.querySelector('.qc-prompt').textContent=q.prompt;
  const ans=card.querySelector('.qc-answer');ans.textContent=q.answer||'';ans.hidden=!answerState[q.id];
  const at=card.querySelector('.qc-answer-toggle');at.textContent=answerState[q.id]?'Hide answer':'Answer';at.setAttribute('aria-expanded',String(!!answerState[q.id]));
  const prev=card.querySelector('.qc-prev'),next=card.querySelector('.qc-next');
  prev.hidden=total<=1;next.hidden=total<=1;
  prev.disabled=idx===0;next.disabled=idx===total-1;
  card.dataset.question=q.id;
}

function toggleAnswerForQuestion(g,card){
  const q=g.items[currentGroupIndex(g.key)];
  answerState[q.id]=!answerState[q.id];
  syncQuestionCard(card,g,g.key);
  syncOverlayIfOpen();
}

function expandQuestions(groupKey){
  collapseQuestions();
  const g=groupOf(groupKey);
  if(!g)return;
  expandedGroup=groupKey;
  const card=buildQuestionCard(g);
  if(groupKey==='practice'){
    const body=$('#practiceBody');
    if(body){body.replaceChildren(card);body.hidden=false}
    $('#practiceToggle')?.setAttribute('aria-expanded','true');
  }else{
    const blockEl=document.getElementById(groupKey);
    if(blockEl)blockEl.after(card);
    const btn=article.querySelector('.para-ask[data-ask="'+groupKey+'"]');
    if(btn)btn.setAttribute('aria-expanded','true');
  }
  syncQuestionCard(card,g,groupKey);
}

function collapseQuestions(){
  if(!expandedGroup)return;
  const gkey=expandedGroup;
  if(gkey==='practice'){
    const body=$('#practiceBody');
    if(body){body.replaceChildren();body.hidden=true}
    $('#practiceToggle')?.setAttribute('aria-expanded','false');
  }else{
    const card=article.querySelector('.para-questions[data-group="'+gkey+'"]');
    if(card)card.remove();
    const btn=article.querySelector('.para-ask[data-ask="'+gkey+'"]');
    if(btn)btn.setAttribute('aria-expanded','false');
  }
  expandedGroup=null;
}

function toggleParaQuestions(blockId,btn){
  if(expandedGroup===blockId){collapseQuestions();return}
  const beforeTop=btn.getBoundingClientRect().top;
  expandQuestions(blockId);
  const afterTop=btn.getBoundingClientRect().top;
  window.scrollBy(0,afterTop-beforeTop);
}

function renderPracticeArea(){
  const area=$('#practiceArea');
  const {practice}=questionGroups();
  if(!teacherMode||!practice.length){area.hidden=true;area.replaceChildren();return}
  area.hidden=false;
  area.replaceChildren();
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='practice-toggle';toggle.id='practiceToggle';
  toggle.textContent='课后巩固 · '+practice.length+' 题';
  toggle.setAttribute('aria-expanded','false');
  toggle.addEventListener('click',()=>{
    if(expandedGroup==='practice'){collapseQuestions();return}
    const beforeTop=toggle.getBoundingClientRect().top;
    expandQuestions('practice');
    const afterTop=toggle.getBoundingClientRect().top;
    window.scrollBy(0,afterTop-beforeTop);
  });
  const body=document.createElement('div');
  body.id='practiceBody';body.hidden=true;
  area.append(toggle,body);
}

// ------------------------------- question overview (drawer) -----------------
function renderOverview(){
  const ov=$('#questionOverview');
  ov.replaceChildren();
  const head=document.createElement('div');head.className='ov-head';
  const h=document.createElement('h2');h.textContent='问题总览';
  const close=document.createElement('button');close.type='button';close.className='ov-close';close.textContent='关闭';close.setAttribute('aria-label','关闭问题总览');
  close.addEventListener('click',closeOverview);
  head.append(h,close);
  ov.append(head);
  const gs=allQuestionGroups();
  if(!gs.length){const empty=document.createElement('p');empty.className='ov-empty';empty.textContent='本课暂无问题。';ov.append(empty);return}
  const list=document.createElement('div');list.className='ov-list';
  for(const g of gs){
    const section=document.createElement('section');section.className='ov-group';
    const gh=document.createElement('h3');gh.className='ov-group-title';gh.textContent=(g.kind==='practice'?'课后巩固 · 填空题':paraLabel(g.key)||'');
    section.append(gh);
    g.items.forEach((q,qi)=>{
      const item=document.createElement('button');item.type='button';item.className='ov-item';
      const t=document.createElement('span');t.className='ov-item-type';t.textContent=q.type||'';
      const p=document.createElement('span');p.className='ov-item-prompt';p.textContent=q.prompt;
      item.append(t,p);
      item.addEventListener('click',()=>jumpToQuestion(g.key,qi));
      section.append(item);
    });
    list.append(section);
  }
  ov.append(list);
}
function openOverview(){renderOverview();$('#questionOverview').hidden=false;$('#overviewToggle').setAttribute('aria-expanded','true')}
function closeOverview(){$('#questionOverview').hidden=true;$('#overviewToggle').setAttribute('aria-expanded','false')}

function jumpToQuestion(groupKey,index){
  closeOverview();
  expandQuestions(groupKey);
  setGroupIndex(groupKey,index);
  const card=(groupKey==='practice')?$('#practiceBody .question-card'):article.querySelector('.para-questions[data-group="'+groupKey+'"]');
  const g=groupOf(groupKey);
  if(card&&g)syncQuestionCard(card,g,groupKey);
  const target=(groupKey==='practice')?$('#practiceArea'):document.getElementById(groupKey);
  if(target)target.scrollIntoView({block:groupKey==='practice'?'start':'center',behavior:reduceMotion()?'auto':'smooth'});
}

// ------------------------------- enlarge overlay ----------------------------
function renderOverlayContent(groupKey){
  const ov=$('#questionOverlay');
  ov.replaceChildren();
  const g=groupOf(groupKey);
  if(!g)return;
  const idx=currentGroupIndex(groupKey);
  const q=g.items[idx],total=g.items.length;
  ov.dataset.group=groupKey;
  const head=document.createElement('header');head.className='qo-head';
  const meta=document.createElement('div');meta.className='qo-meta';
  const para=document.createElement('span');para.className='qo-para';para.textContent=(g.kind==='practice'?'课后巩固':paraLabel(groupKey)||'');
  const type=document.createElement('span');type.className='qo-type';type.textContent=q.type||'';
  meta.append(para,type);
  const close=document.createElement('button');close.type='button';close.className='qo-close';close.textContent='关闭';close.setAttribute('aria-label','关闭放大展示');
  close.addEventListener('click',closeOverlay);
  head.append(meta,close);
  const prompt=document.createElement('p');prompt.className='qo-prompt';prompt.textContent=q.prompt;
  ov.append(head,prompt);
  if(g.kind==='para'){
    const blockText=blockTextOf(groupKey);
    if(blockText!=null){
      const details=document.createElement('details');details.className='qo-source';
      // 窄屏（<768px）默认折叠
      details.open=window.innerWidth>=768;
      const sum=document.createElement('summary');sum.textContent='相关原文段落 · '+paraLabel(groupKey);
      const txt=document.createElement('div');txt.className='qo-source-text';txt.textContent=blockText;
      details.append(sum,txt);
      ov.append(details);
    }
  }
  const answer=document.createElement('div');answer.className='qo-answer';answer.textContent=q.answer||'';answer.hidden=!answerState[q.id];
  const answerBtn=document.createElement('button');answerBtn.type='button';answerBtn.className='qo-answer-toggle';answerBtn.textContent=answerState[q.id]?'Hide answer':'Answer';answerBtn.setAttribute('aria-expanded',String(!!answerState[q.id]));
  answerBtn.addEventListener('click',()=>{answerState[q.id]=!answerState[q.id];syncOverlayAndCard(groupKey)});
  const nav=document.createElement('footer');nav.className='qo-nav';
  const prev=document.createElement('button');prev.type='button';prev.className='qo-prev';prev.textContent='上一题';
  const cnt=document.createElement('span');cnt.className='qo-count';cnt.textContent=(idx+1)+' / '+total;
  const next=document.createElement('button');next.type='button';next.className='qo-next';next.textContent='下一题';
  prev.disabled=idx===0;next.disabled=idx===total-1;
  if(total<=1){prev.hidden=true;next.hidden=true}
  prev.addEventListener('click',()=>{setGroupIndex(groupKey,Math.max(0,idx-1));syncOverlayAndCard(groupKey)});
  next.addEventListener('click',()=>{setGroupIndex(groupKey,Math.min(total-1,idx+1));syncOverlayAndCard(groupKey)});
  nav.append(prev,cnt,next);
  ov.append(answerBtn,answer,nav);
}
function syncOverlayAndCard(groupKey){
  renderOverlayContent(groupKey);
  const g=groupOf(groupKey);
  const card=(groupKey==='practice')?$('#practiceBody .question-card'):article.querySelector('.para-questions[data-group="'+groupKey+'"]');
  if(card&&g)syncQuestionCard(card,g,groupKey);
  const close=$('#questionOverlay .qo-close');if(close)close.focus();
}
function syncOverlayIfOpen(){
  const ov=$('#questionOverlay');
  if(!ov.hidden&&ov.dataset.group)renderOverlayContent(ov.dataset.group);
}
function overlayKeydown(e){
  // 焦点陷阱：限制 Tab 在 overlay 内
  if(e.key==='Tab'){
    const ov=$('#questionOverlay');
    if(ov.hidden)return;
    const focusable=ov.querySelectorAll('button:not([disabled]), summary, [tabindex="0"]');
    if(!focusable.length)return;
    const first=focusable[0];
    const last=focusable[focusable.length-1];
    if(e.shiftKey){
      if(document.activeElement===first){
        e.preventDefault();
        last.focus();
      }
    }else{
      if(document.activeElement===last){
        e.preventDefault();
        first.focus();
      }
    }
  }
  if(e.key==='Escape'){e.preventDefault();closeOverlay()}
}
function openOverlay(groupKey,trigger){
  renderOverlayContent(groupKey);
  const ov=$('#questionOverlay');
  ov.hidden=false;
  lastFocus=trigger||document.activeElement;
  document.body.classList.add('overlay-open');
  document.addEventListener('keydown',overlayKeydown,true);
  const close=ov.querySelector('.qo-close');if(close)close.focus();
}
function closeOverlay(){
  const ov=$('#questionOverlay');
  if(ov.hidden)return;
  ov.hidden=true;
  document.body.classList.remove('overlay-open');
  document.removeEventListener('keydown',overlayKeydown,true);
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
  lastFocus=null;
}

// ------------------------------- teacher mode sync --------------------------
function syncClassroom(){
  const isReading=!!activeUnit;
  reader.classList.toggle('teacher-mode',teacherMode&&isReading);
  $('#modeToggle').setAttribute('aria-pressed',String(teacherMode));
  $('#modeToggle').textContent=teacherMode?'学生模式':'教师模式';
  $('#teacherBar').hidden=!(teacherMode&&isReading&&lessonQuestions().length>0);
  closeOverview();
  if(!$('#questionOverlay').hidden)closeOverlay();
}
$('#modeToggle').onclick=()=>{teacherMode=!teacherMode;if(teacherMode)toolPosition=null;renderText();syncClassroom();if(teacherMode&&activeUnit)requestAnimationFrame(placeTools)};
$('#overviewToggle').onclick=()=>{if($('#questionOverview').hidden)openOverview();else closeOverview()};
$('#hideAllAnswers').onclick=()=>{
  for(const k in answerState)answerState[k]=false;
  if(expandedGroup){const g=groupOf(expandedGroup);const card=(expandedGroup==='practice')?$('#practiceBody .question-card'):article.querySelector('.para-questions[data-group="'+expandedGroup+'"]');if(card&&g)syncQuestionCard(card,g,expandedGroup)}
  syncOverlayIfOpen();
};
