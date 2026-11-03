export interface VoucherMonth {month:string;amount:number|null;travel:number|null;attendance?:number|null;received?:string|null}
export interface VoucherPlacement {organization:string;inn:string;region:string;district:string;subject:string;direction:string;entered:string;left:string|null}
export interface VoucherRecord {id:string;number:string;planId:string;personId:string;name:string;pinfl:string;age:number;created:string;start:string|null;end:string|null;status:string;slot?:number;placements:VoucherPlacement[];months:VoucherMonth[];history:string[]}
export interface VoucherFilters {query:string;status:string;region:string;district:string;organization:string;subject:string;direction:string;slot:string;dateField:'created'|'start'|'end';from:string;to:string;monthFrom:string;monthTo:string;usage:string;payment:string;changed:boolean;signal:string;waitingDays:number}
export function emptyVoucherFilters():VoucherFilters{return {query:'',status:'',region:'',district:'',organization:'',subject:'',direction:'',slot:'',dateField:'created',from:'',to:'',monthFrom:'',monthTo:'',usage:'',payment:'',changed:false,signal:'',waitingDays:30}}
export function scopedMonths(r:VoucherRecord,f:VoucherFilters){return r.months.filter(m=>(!f.monthFrom||m.month>=f.monthFrom)&&(!f.monthTo||m.month<=f.monthTo))}
export function voucherAssessment(r:VoucherRecord,date:string,f=emptyVoucherFilters()){
 const months=scopedMonths(r,f),closed=months.filter(m=>m.month<date.slice(0,7)),known=closed.filter(m=>m.amount!==null),paid=closed.filter(m=>m.amount!==null&&m.amount>0),allKnown=months.filter(m=>m.amount!==null),travel=months.filter(m=>m.travel!==null);
 const missing=closed.length-known.length;
 return {expected:closed.length,reported:known.length,paid:paid.length,missing,percent:!closed.length||missing?null:Math.round(paid.length/closed.length*100),amount:allKnown.length?allKnown.reduce((n,m)=>n+m.amount!,0):null,travel:travel.length?travel.reduce((n,m)=>n+m.travel!,0):null,used:months.filter(m=>m.amount!==null&&m.amount>0).length,total:months.length};
}
export function voucherSignals(r:VoucherRecord,date:string,f=emptyVoucherFilters()){
 const a=voucherAssessment(r,date,f),days=(s:string)=>Math.floor((Date.parse(s+'T00:00:00Z')-Date.parse(date+'T00:00:00Z'))/86400000);
 return {waiting:!r.start&&-days(r.created)>=f.waitingDays,ending:!!r.start&&!!r.end&&days(r.end)>=0&&days(r.end)<=30,missing:a.missing>0,low:a.percent!==null&&a.percent<30};
}
export function filterVouchers(rows:VoucherRecord[],f:VoucherFilters,date:string,includeStatus=true){
 if(f.from&&f.to&&f.from>f.to||f.monthFrom&&f.monthTo&&f.monthFrom>f.monthTo)return [];
 return rows.filter(r=>{const p=r.placements.slice(-1)[0],a=voucherAssessment(r,date,f),signal=voucherSignals(r,date,f),q=f.query.trim().toLocaleLowerCase();return (!(f.monthFrom||f.monthTo)||scopedMonths(r,f).length>0)&&(!q||[r.id,r.number,r.planId,r.name,r.pinfl,...r.placements.flatMap(p=>[p.organization,p.inn,p.region,p.district,p.subject,p.direction])].join(' ').toLocaleLowerCase().includes(q))&&(!includeStatus||!f.status||r.status===f.status)&&(!f.region||p?.region===f.region)&&(!f.district||p?.district===f.district)&&(!f.organization||p?.inn===f.organization)&&(!f.subject||p?.subject===f.subject)&&(!f.direction||p?.direction===f.direction)&&(!f.slot||String(r.slot)===f.slot)&&(!f.from||!!r[f.dateField]&&r[f.dateField]!>=f.from)&&(!f.to||!!r[f.dateField]&&r[f.dateField]!<=f.to)&&(!f.changed||r.placements.length>1)&&(!f.payment||(f.payment==='missing'?a.missing>0:f.payment==='known'?a.amount!==null:a.amount===0))&&(!f.usage||(f.usage==='unknown'?a.percent===null:f.usage==='low'?a.percent!==null&&a.percent<30:f.usage==='medium'?a.percent!==null&&a.percent>=30&&a.percent<70:a.percent!==null&&a.percent>=70))&&(!f.signal||signal[f.signal as keyof typeof signal])});
}
export function summarizeVouchers(rows:VoucherRecord[],date:string,f=emptyVoucherFilters()){
 const values=rows.map(r=>voucherAssessment(r,date,f)),known=values.filter(a=>a.amount!==null),travel=values.filter(a=>a.travel!==null);
 return {travel:travel.length?travel.reduce((n,a)=>n+a.travel!,0):null,vouchers:rows.length,children:new Set(rows.map(r=>r.personId)).size,amount:known.length?known.reduce((n,a)=>n+a.amount!,0):null,missing:values.filter(a=>a.missing>0).length,used:values.filter(a=>a.used>0).length};
}
export type VoucherGrouping='region'|'district'|'organization'|'status'|'subject'|'month';
export function voucherReport(rows:VoucherRecord[],group:VoucherGrouping,date:string,f=emptyVoucherFilters()){
 const groups=new Map<string,VoucherRecord[]>();
 for(const r of rows){const p=r.placements.slice(-1)[0],keys=group==='month'?[...new Set(scopedMonths(r,f).filter(m=>m.month<=date.slice(0,7)).map(m=>m.month))]:[group==='region'?p?.region??'Tashkilot belgilanmagan':group==='district'?p?.district??'Tashkilot belgilanmagan':group==='organization'?p?p.organization+' ('+p.inn+')':'Tashkilot belgilanmagan':group==='subject'?p?.subject||'Fan belgilanmagan':r.status];if(group==='month'&&!keys.length)keys.push('Faollashmagan');for(const key of keys){const subset=group==='month'&&/^\d{4}-\d{2}$/.test(key)?{...r,months:r.months.filter(m=>m.month===key)}:r;groups.set(key,[...(groups.get(key)??[]),subset])}}
 return [...groups].sort(([a],[b])=>a.localeCompare(b)).map(([name,items])=>({name,ids:items.map(r=>r.id),...summarizeVouchers(items,date,f)}));
}
export function placementDeparture(next:string|undefined,end:string|null){const date=next??(end?new Date(Date.parse(end+'T00:00:00Z')+86400000).toISOString().slice(0,10):null);return date?new Date(Date.parse(date+'T00:00:00Z')-86400000).toISOString().slice(0,10):null}
