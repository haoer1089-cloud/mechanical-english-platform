(function(root){
 const colors=['yellow','green','blue'];
 function valid(a,blocks){return a&&typeof a.id==='string'&&colors.includes(a.color)&&Array.isArray(a.segments)&&a.segments.length>0&&a.segments.every(s=>{const b=blocks.find(b=>b.id===s.block);return b&&Number.isInteger(s.start)&&Number.isInteger(s.end)&&s.start>=0&&s.end>s.start&&s.end<=b.text.length})}
 function subtract(segment,cuts){let parts=[{...segment}];for(const cut of cuts){if(cut.block!==segment.block)continue;parts=parts.flatMap(p=>{if(cut.end<=p.start||cut.start>=p.end)return[p];const result=[];if(p.start<cut.start)result.push({...p,end:cut.start});if(p.end>cut.end)result.push({...p,start:cut.end});return result})}return parts}
 function apply(existing,segments,color,id){const next=existing.map(a=>({...a,segments:a.segments.flatMap(s=>subtract(s,segments))})).filter(a=>a.segments.length);if(colors.includes(color))next.push({id,color,segments:segments.map(s=>({...s}))});return next}
 function parts(block,highlights){const spans=highlights.flatMap(a=>a.segments.filter(s=>s.block===block.id).map(s=>({...s,id:a.id,color:a.color}))).sort((a,b)=>a.start-b.start);let last=0;const result=[];for(const s of spans){if(s.start<last)continue;if(s.start>last)result.push({text:block.text.slice(last,s.start)});result.push({...s,text:block.text.slice(s.start,s.end)});last=s.end}if(last<block.text.length)result.push({text:block.text.slice(last)});return result}
 const api={valid,apply,parts,subtract};root.HighlightCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
