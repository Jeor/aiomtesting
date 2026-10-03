export const runs = [
 ['lumiere','Lumiere · original','#80cbc4'],
 ['lumiere-0702a05','Lumiere · 0702a05','#edb776'],
 ['imdb','IMDb','#d9d887'],['tvdb','TVDB','#a8cf9c'],
 ['simkl','SIMKL','#c0acf0'],['tmdb','TMDB','#8eb8ef'],['mdblist','MDBList','#eea3b2']
];
export const categories = {exact:'Exact title',typo:'Typo',year:'With year',format:'Punctuation',partial:'Partial title',abbreviation:'Abbreviation',alias:'Alias',franchise:'Franchise',negative:'No-match control'};
export const median = a => {const s=[...a].sort((a,b)=>a-b);return s.length ? (s[Math.floor((s.length-1)/2)]+s[Math.ceil((s.length-1)/2)])/2 : null};
export const hit = (r,cutoff) => r.valid_response && r.target_rank != null && r.target_rank <= cutoff;
export function outcome(r,cutoff) {
 if(!r.valid_response)return {label:'Invalid response',tone:'bad'};
 if(r.reviewed_title_case) return hit(r,cutoff)?{label:`Found #${r.target_rank}`,tone:'good'} : r.unresolved_top5 ? {label:'Unresolved ID*',tone:'warn'} : {label:r.target_rank?`Outside #${r.target_rank}`:'Not found',tone:'bad'};
 const v=r.supplemental_review;
 if(!v)return {label:'Unscored',tone:'muted'};
 if(v.kind==='negative')return {label:r.count===0?'No false matches':`${r.count} unexpected`,tone:r.count===0?'good':'bad'};
 const found=new Set(r.results.filter(x=>x.rank<=cutoff&&v.expected_ids.includes(x.id)).map(x=>x.id));
 return {label:v.kind==='franchise'?`${found.size}/${v.expected_ids.length} films / shows`:found.size?'Alias found':'Alias not found',tone:found.size===v.expected_ids.length?'good':found.size?'warn':'bad'};
}
export function select(rows,s,ignoreCategory=false){return rows.filter(r=>s.providers.has(r.provider)&&(s.media==='both'||r.media_type===s.media)&&(ignoreCategory||s.category==='all'||r.category===s.category))}
export function timingRows(rows,s){
 if(s.timing==='nonempty')return rows.filter(r=>r.count>0);
 if(s.timing==='matched')return rows.filter(r=>r.reviewed_title_case&&hit(r,s.cutoff));
 if(s.timing==='common') {const ids=new Set(rows.filter(r=>r.reviewed_title_case&&[...s.providers].every(p=>rows.some(x=>x.provider===p&&x.case_id===r.case_id&&hit(x,s.cutoff)))).map(r=>r.case_id));return rows.filter(r=>ids.has(r.case_id));}
 return rows;
}
export function combine(old,fresh){return [...old.observations,...fresh.observations.map(r=>({...r,provider:'lumiere-0702a05'}))].map((r,index)=>({...r,index}));}
export function latencyBins(rows){
 if(!rows.length)return [];
 const max=Math.max(...rows.map(r=>r.ms));
 const width=Math.max(250,Math.ceil((max+0.001)/12/250)*250);
 return Array.from({length:Math.floor(max/width)+1},(_,i)=>({from:i*width,to:(i+1)*width,rows:rows.filter(r=>r.ms>=i*width&&r.ms<(i+1)*width)}));
}
export function heatGlyph(hits,total){if(!total)return '—';const rate=hits/total;return rate===0?'·':rate<=.25?'░':rate<=.5?'▒':rate<1?'▓':'█';}
