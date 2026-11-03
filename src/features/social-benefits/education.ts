import { reactive, ref } from 'vue'
import { people } from './domain'
export const directions=[{id:'extended',name:'Uzaytirilgan kun',min:7,max:11,cap:1},{id:'subjects',name:'Umumta’lim fanlari',min:12,max:18,cap:2},{id:'language',name:'Xorijiy til',min:15,max:18,cap:2},{id:'it',name:'IT va kasb-hunar',min:15,max:18,cap:4}]
export const clubs=[{id:'C1',name:'Kelajak IT markazi',inn:'000000201',region:'Toshkent shahri',district:'Yunusobod tumani',direction:'it',type:'private',distance:17},{id:'C2',name:'Til va ta’lim markazi',inn:'000000202',region:'Toshkent shahri',district:'Mirzo Ulug‘bek tumani',direction:'language',type:'private',distance:12},{id:'C3',name:'Davlat maktabi fan to‘garagi',inn:'000000203',region:'Namangan viloyati',district:'Namangan shahri',direction:'subjects',type:'public',distance:3},{id:'C4',name:'Uzaytirilgan kun guruhi',inn:'000000204',region:'Andijon viloyati',district:'Andijon shahri',direction:'extended',type:'public',distance:2}]
export const educationSubjects=[
 {id:'programming',name:'Dasturlash',direction:'it',clubIds:['C1']},
 {id:'english',name:'Ingliz tili',direction:'language',clubIds:['C2','C3']},
 {id:'russian',name:'Rus tili',direction:'language',clubIds:['C2']},
 {id:'mathematics',name:'Matematika',direction:'subjects',clubIds:['C1','C3']},
 {id:'extended',name:'Uzaytirilgan kun',direction:'extended',clubIds:['C4']},
]
export interface Child {id:string;personId:string;name:string;pinfl:string;birth:string;parent:string;region:string;registry:boolean;school:string}
export interface EducationPlacement {eventId:string;clubId:string;subjectId:string;entered:string}
export interface Voucher {placements?:EducationPlacement[];subjectId?:string;subjectSlot?:1|2;notified?:string;activationEventId?:string;id:string;childId:string;requestId:string;state:'formed'|'active'|'paused'|'cancelled'|'expired'|'ended';created:string;start:string|null;grantDays:number;clubId:string|null;pauses:{start:string;end:string|null}[];terminal:string|null;previous:string|null;replacedBy:string|null;history:string[]}
export interface Request {id:string;childId:string;quantity:number;received:string;workerDue:string;councilDue:string|null;channel:string;state:'new'|'submitted'|'approved'|'returned';reason:string;previous:string|null;purpose:'new'|'replacement'|'renewal';submittedAt?:string}
export interface Monthly {clubId?:string;id:string;voucherId:string;month:string;planned:number;periodPlanned:number;held:number;attended:number;distance:number;clubType:string;bhm:number;courseBudget:number;parentShare:number;received:string}
export interface Payment {id:string;voucherId:string;month:string;type:'course'|'travel';amount:number;date:string;supersedes?:string}
export const stateLabels={formed:'Shakllangan',active:'Foydalanilmoqda',paused:'Vaqtincha to‘xtatilgan',cancelled:'Bekor qilingan',expired:'Muddati tugagan',ended:'Foydalanish yakunlangan'}
const day=86400000
export function validDate(s:string){const d=new Date(s+'T00:00:00Z');return /^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(+d)&&d.toISOString().slice(0,10)===s}
const stamp=(s:string)=>+new Date(s+'T00:00:00Z')
export function addDays(s:string,n:number){return new Date(stamp(s)+n*day).toISOString().slice(0,10)}
export function annualEnd(s:string){if(!validDate(s))throw Error('Sana noto‘g‘ri.');const d=new Date(stamp(s)),year=d.getUTCFullYear()+1,month=d.getUTCMonth(),date=Math.min(d.getUTCDate(),new Date(Date.UTC(year,month+1,0)).getUTCDate());return addDays(new Date(Date.UTC(year,month,date)).toISOString().slice(0,10),-1)}
export function workDue(s:string,n:number){let value=s;while(n){value=addDays(value,1);const d=new Date(stamp(value)).getUTCDay();if(d!==0&&d!==6)n--}return value}
export function ageOn(birth:string,date:string){const b=new Date(stamp(birth)),d=new Date(stamp(date));return d.getUTCFullYear()-b.getUTCFullYear()-Number(d.getUTCMonth()<b.getUTCMonth()||d.getUTCMonth()===b.getUTCMonth()&&d.getUTCDate()<b.getUTCDate())}
const profileIds=['P13','P15','P9','P11']
const children:Child[]=profileIds.map((id,i)=>{const p=people.find(p=>p.id===id)!;return {id:`CH${i+1}`,personId:p.id,name:p.name,pinfl:p.pinfl,birth:`${2026-p.age}-03-12`,parent:`Qonuniy vakil ${i+1} (namuna)`,region:i===0?'Toshkent shahri':p.region,registry:p.registry,school:'public'}})
children[0]!.registry=true
function formed(id:string,childId:string):Voucher{return {id,childId,requestId:'REQ-SEED',state:'formed',created:'2026-10-01',start:null,grantDays:0,clubId:null,pauses:[],terminal:null,previous:null,replacedBy:null,history:['2026-10-01 · Reja tasdiqlandi; vaucher yaratildi (namuna)']}}
const v1=formed('EDU-2026-0001','CH1'),v2=formed('EDU-2026-0002','CH1');for(const[v,c]of [[v1,'C1'],[v2,'C2']] as const){v.state='active';v.start='2026-10-01';v.clubId=c;v.grantDays=(stamp(annualEnd(v.start))-stamp(v.start))/day+1;v.history.push('2026-10-01 · Shartnoma kuchga kirdi (Kelajak namuna)')}
export const educationState=reactive({children,requests:[] as Request[],vouchers:[v1,v2,formed('EDU-2026-0003','CH2')],monthly:[v1,v2].map((v,i):Monthly=>({id:`KEL-${v.id}-2026-10`,voucherId:v.id,clubId:v.clubId!,month:'2026-10',planned:12,periodPlanned:12,held:12,attended:12,distance:i?12:17,clubType:'private',bhm:400000,courseBudget:640000,parentShare:160000,received:'2026-11-03'})),payments:[] as Payment[],sourceLog:['2026-11-03 · Kelajak: davomat va hisoblar olindi (namuna)']})
export const educationRevision=ref(0)
// Discard snapshots from earlier prototype versions; all new changes live in memory.
try{localStorage.removeItem('sb-education-v1')}catch{}
function validate(s:typeof educationState){return s&&['children','requests','vouchers','monthly','payments','sourceLog'].every(k=>Array.isArray(s[k as keyof typeof s]))&&s.children.every(c=>typeof c.name==='string'&&/^\d{14}$/.test(c.pinfl)&&validDate(c.birth))&&new Set(s.vouchers.map(v=>v.id)).size===s.vouchers.length&&s.vouchers.every(v=>s.children.some(c=>c.id===v.childId)&&v.state in stateLabels&&Array.isArray(v.pauses)&&Array.isArray(v.history)&&validDate(v.created)&&(!v.start||validDate(v.start)))&&s.monthly.every(m=>s.vouchers.some(v=>v.id===m.voucherId)&&m.attended>=0&&m.attended<=m.periodPlanned)&&s.payments.every(p=>s.vouchers.some(v=>v.id===p.voucherId)&&Number.isFinite(p.amount))}
function transaction(fn:(s:typeof educationState)=>void){const copy=JSON.parse(JSON.stringify(educationState)) as typeof educationState;fn(copy);if(!validate(copy))throw Error('Ma’lumotlar bog‘lanishini tekshiring.');Object.assign(educationState,copy);educationRevision.value++}
export function remaining(v:Voucher,date:string){if(!v.start)return v.grantDays||null;const until=v.terminal&&v.terminal<date?v.terminal:date;const elapsed=Math.max(0,(stamp(addDays(until,1))-stamp(v.start))/day);const paused=v.pauses.reduce((n,p)=>n+Math.max(0,(Math.min(stamp(p.end??addDays(until,1)),stamp(addDays(until,1)))-Math.max(stamp(p.start),stamp(v.start!)))/day),0);return Math.max(0,v.grantDays-Math.max(0,elapsed-paused))}
export function expiry(v:Voucher){if(!v.start||v.pauses.some(p=>!p.end))return null;const pauseDays=v.pauses.reduce((n,p)=>n+(stamp(p.end!)-stamp(p.start))/day,0);return addDays(v.start,v.grantDays-1+pauseDays)}
const unfinished=(v:Voucher)=>['formed','active','paused'].includes(v.state)
export function createRequest(childId:string,quantity:number,received:string,channel:string,previous='',purpose:Request['purpose']='new') {transaction(s=>{const c=s.children.find(c=>c.id===childId);if(!c||!c.registry||c.school!=='public')throw Error('Yangi vaucher uchun reyestr va davlat maktabi talabi bajarilishi kerak.');if(!validDate(received)||![1,2].includes(quantity))throw Error('Sana va vaucher sonini tekshiring.');if(s.requests.some(r=>r.childId===childId&&['new','submitted'].includes(r.state)))throw Error('Ushbu bola uchun tugallanmagan murojaat mavjud.');if(s.vouchers.filter(v=>v.childId===childId&&unfinished(v)).length+quantity>2)throw Error('Bir bolaga ikki yakunlanmagan vaucher limiti mavjud.');if(purpose!=='new'){const old=s.vouchers.find(v=>v.id===previous&&v.childId===childId);if(!old||old.replacedBy||quantity!==1||purpose==='replacement'&&old.state!=='cancelled'||purpose==='renewal'&&old.state!=='expired')throw Error('Avvalgi vaucher va qayta berish turini tekshiring.')}else if(s.vouchers.some(v=>v.childId===childId&&v.state==='cancelled'&&!v.replacedBy&&(remaining(v,v.terminal!)??1)>0))throw Error('Bekor qilingan vaucher uchun qolgan muddat bilan o‘rnini bosish murojaatini tanlang.');s.requests.unshift({id:`REQ-${Date.now()}-${s.requests.length+1}`,childId,quantity,received,workerDue:workDue(received,3),councilDue:null,channel,state:'new',reason:'',previous:previous||null,purpose})})}
export function submitPlan(id:string,date:string){transaction(s=>{const r=s.requests.find(r=>r.id===id);if(!r||!['new','returned'].includes(r.state)||!validDate(date)||date<r.received)throw Error('Rejaga yuborish sanasi yoki murojaat holati noto‘g‘ri.');r.state='submitted';r.submittedAt=date;r.councilDue=workDue(date,2)})}
export function approvePlan(id:string,date:string,returnReason=''){transaction(s=>{const r=s.requests.find(r=>r.id===id);if(!r)throw Error('Murojaat topilmadi.');if(r.state==='approved')return;if(r.state!=='submitted'||!validDate(date)||date<(r.submittedAt??r.received))throw Error('Avval reja tasdiqqa yuborilishi kerak.');if(returnReason){r.state='returned';r.reason=returnReason;return}const c=s.children.find(c=>c.id===r.childId)!;if(!c.registry||c.school!=='public'||s.vouchers.filter(v=>v.childId===c.id&&unfinished(v)).length+r.quantity>2)throw Error('Vaucher yaratishdagi qayta tekshiruvdan o‘tmadi.');const old=r.previous?s.vouchers.find(v=>v.id===r.previous):undefined;if(old?.replacedBy)throw Error('Avvalgi vaucher o‘rni allaqachon to‘ldirilgan.');for(let i=0;i<r.quantity;i++){const v=formed(`EDU-${Date.now()}-${s.vouchers.length+1}`,c.id);v.created=date;v.requestId=r.id;v.previous=old?.id??null;if(r.purpose==='replacement'&&old){v.grantDays=remaining(old,old.terminal!)??old.grantDays;if(v.grantDays<=0&&old.start)throw Error('Qolgan muddat mavjud emas.')}s.vouchers.push(v);if(old)old.replacedBy=v.id}r.state='approved';s.sourceLog.unshift(`${date} · Reja tasdiqlandi; ${r.quantity} vaucher yaratildi (namuna)`)})}
export function bindClub(id:string,clubId:string,date:string){transaction(s=>{const v=s.vouchers.find(v=>v.id===id),club=clubs.find(c=>c.id===clubId);if(!v||!club||!unfinished(v)||!validDate(date)||date<v.created)throw Error('Vaucher, to‘garak yoki sana noto‘g‘ri.');const c=s.children.find(c=>c.id===v.childId)!,d=directions.find(d=>d.id===club.direction)!;const age=ageOn(c.birth,date);if(c.school!=='public'||age<d.min||age>d.max)throw Error(`Yo‘nalish uchun yosh ${d.min}–${d.max}; davlat maktabi talabi tekshiriladi.`);if(s.vouchers.some(other=>other.id!==v.id&&other.childId===v.childId&&other.clubId===clubId&&unfinished(other)))throw Error('Bu to‘garakka boshqa vaucher bog‘langan.');if(v.start&&date<v.start)throw Error('Shartnoma sanasi boshlanishdan oldin.');if(v.start&&(remaining(v,addDays(date,-1))??1)===0)throw Error('Vaucherning foydalanish muddati tugagan.');const pause=v.pauses.find(p=>!p.end);if(pause){if(date<pause.start)throw Error('Davom etish sanasi chiqishdan oldin.');pause.end=date}if(!v.start){v.start=date;if(!v.grantDays)v.grantDays=(stamp(annualEnd(date))-stamp(date))/day+1}v.clubId=clubId;v.state='active';v.history.push(`${date} · ${club.name}: shartnoma kuchga kirdi (Kelajak namuna)`);s.sourceLog.unshift(`${date} · Shartnoma xabari: ${v.id}`)})}
export function pauseVoucher(id:string,date:string){transaction(s=>{const v=s.vouchers.find(v=>v.id===id);if(!v||v.state!=='active'||!validDate(date)||date<v.start!||(remaining(v,addDays(date,-1))??1)===0)throw Error('Faqat faol vaucher rasmiy chiqish bilan to‘xtatiladi.');v.pauses.push({start:date,end:null});v.state='paused';v.history.push(`${date} · Rasmiy chiqish; muddat to‘xtadi (Kelajak namuna)`)})}
export function cancelVoucher(id:string,date:string){transaction(s=>{const v=s.vouchers.find(v=>v.id===id);if(!v||!unfinished(v)||!validDate(date)||date<(v.start??v.created))throw Error('Bekor qilish sanasi yoki holati noto‘g‘ri.');v.state='cancelled';v.terminal=addDays(date,-1);v.history.push(`${date} · Vakil tanlagan vaucher bekor qilindi (namuna)`)})}
export function schoolEvent(childId:string,school:string,date:string){transaction(s=>{if(!validDate(date))throw Error('Sana noto‘g‘ri.');const c=s.children.find(c=>c.id===childId)!;c.school=school;if(school!=='public')for(const v of s.vouchers.filter(v=>v.childId===childId&&unfinished(v))){v.state='ended';v.terminal=addDays(date,-1);v.history.push(`${date} · Ta’lim manbasi: ${school}; foydalanish yakunlandi`)}})}
export function updateRegistry(childId:string,registry:boolean){transaction(s=>{s.children.find(c=>c.id===childId)!.registry=registry})}
export function refreshExpiry(date:string){transaction(s=>{for(const v of s.vouchers)if(v.state==='active'&&(remaining(v,date)??1)===0){v.state='expired';v.terminal=expiry(v);v.history.push(`${v.terminal} · Ajratilgan muddat tugadi`)}})}
export function transportResult(records:Monthly[],region:string){if(!records.length)return {state:'unknown',amount:null,reason:'Davomat va masofa manba ma’lumoti olinmagan.',voucherId:null};const candidates=records.filter(r=>r.clubType==='private').sort((a,b)=>b.distance-a.distance),chosen=candidates[0];if(!chosen)return {state:'notEligible',amount:0,reason:'Nodavlat to‘garak mavjud emas.',voucherId:null};const capital=region==='Toshkent shahri',threshold=capital?10:5;if(chosen.distance<=threshold)return {state:'notEligible',amount:0,reason:`Masofa ${threshold} km dan ortiq emas.`,voucherId:chosen.voucherId};if(!chosen.planned||!chosen.periodPlanned)return {state:'unknown',amount:null,reason:'Mashg‘ulot jadvali yetarli emas.',voucherId:chosen.voucherId};const ratio=chosen.attended/chosen.periodPlanned;if(ratio<.9)return {state:'notEligible',amount:0,reason:'Davomat 90% dan past; yaqinroq to‘garakka almashtirib hisoblanmaydi.',voucherId:chosen.voucherId};if(ratio<1)return {state:'review',amount:null,reason:'90–99% davomat: hujjatdagi 90% va to‘liq davomat talablari aniqlashtirilishi kerak.',voucherId:chosen.voucherId};return {state:'calculated',amount:Math.round(chosen.bhm*(capital?.5:.75)*chosen.periodPlanned/chosen.planned),reason:`${capital?'50%':'75%'} BHM × ${chosen.periodPlanned}/${chosen.planned}; masofa ${chosen.distance} km.`,voucherId:chosen.voucherId}}
export function paidFor(voucherId:string,month:string,type:Payment['type']){const events=educationState.payments.filter(p=>p.voucherId===voucherId&&p.month===month&&p.type===type),replaced=new Set(events.map(p=>p.supersedes).filter(Boolean));const active=events.filter(p=>!replaced.has(p.id));return active.length?active.reduce((n,p)=>n+p.amount,0):null}
export function financeEvent(p:Payment){transaction(s=>{if(s.payments.some(x=>x.id===p.id))return;if(!s.vouchers.some(v=>v.id===p.voucherId)||!validDate(p.date)||!Number.isFinite(p.amount))throw Error('To‘lov xabari noto‘g‘ri.');s.payments.push(p);s.sourceLog.unshift(`${p.date} · Moliya: ${p.id} (namuna)`)})}
export function simulateAttendance(childId:string,scenario:string,month='2026-10'){transaction(s=>{if(!/^\d{4}-\d{2}$/.test(month))throw Error('Oy noto‘g‘ri.');const vs=s.vouchers.filter(v=>v.childId===childId&&v.start&&v.start.slice(0,7)<=month);for(const v of vs){if(!s.monthly.some(m=>m.voucherId===v.id&&m.month===month)){const club=clubs.find(c=>c.id===v.clubId)!;s.monthly.push({id:'KEL-'+v.id+'-'+month,voucherId:v.id,clubId:club.id,month,planned:12,periodPlanned:12,held:12,attended:12,distance:club.distance,clubType:club.type,bhm:400000,courseBudget:0,parentShare:0,received:'2026-11-03'})}}const records=s.monthly.filter(m=>m.month===month&&vs.some(v=>v.id===m.voucherId)),farthest=Math.max(...records.filter(m=>m.clubType==='private').map(m=>m.distance));for(const m of records){const previous=m.attended+'/'+m.periodPlanned;m.periodPlanned=scenario==='partial'?6:12;m.held=m.periodPlanned;m.attended=scenario==='ninety'?11:scenario==='missed'&&m.distance===farthest?8:m.periodPlanned;const club=clubs.find(c=>c.id===(m.clubId??vs.find(v=>v.id===m.voucherId)?.clubId))!,direction=directions.find(d=>d.id===club.direction)!;const fee=Math.min(800000,direction.cap*m.bhm)*m.attended/m.planned;m.courseBudget=Math.round(fee*.8);m.parentShare=Math.round(fee*.2);m.received='2026-11-03';s.sourceLog.unshift(m.id+': davomat '+previous+' → '+m.attended+'/'+m.periodPlanned+' (namuna)')}s.sourceLog.unshift('2026-11-03 · Kelajak: '+scenario+' davomat xabari (namuna)')})}

export const educationCases = [
 {id:'new',label:'01 · Yangi murojaat',tab:'requests',hint:'Xodim rejaga kiritadi, so‘ng yettilikka yuboradi. Vaucher hali yaratilmagan.'},
 {id:'approval',label:'02 · Tasdiq kechikkan',tab:'requests',hint:'Reja yettilikda. 2 ish kunlik muddat o‘tgan; tasdiqdan so‘ng vaucher yaratiladi.'},
 {id:'unbound',label:'03 · To‘garak tanlanmagan',tab:'vouchers',hint:'Vaucher shakllangan, lekin 12 oylik muddat hali boshlanmagan.'},
 {id:'success',label:'04 · Ikki vaucher, to‘liq foydalanish',tab:'finance',hint:'Bitta bolada ikkita vaucher. Davomat to‘liq, to‘garak va yo‘lkira to‘lovlari hisobga mos.'},
 {id:'attendance',label:'05 · Uzoq to‘garakda past davomat',tab:'finance',hint:'17 km to‘garakda 8/12, yaqinrog‘ida 12/12. Yo‘lkira yaqin to‘garakka o‘tkazib hisoblanmaydi.'},
 {id:'paused',label:'06 · Vaqtincha to‘xtatilgan',tab:'vouchers',hint:'16-oktabrdan rasmiy chiqish. Qolgan muddat kamaymaydi; davom ettirishda saqlanadi.'},
 {id:'difference',label:'07 · Hisob va to‘lov farqi',tab:'finance',hint:'To‘garak hisobi 640 000 so‘m, to‘lov 630 000 so‘m. 10 000 so‘mlik farq tekshiriladi.'},
 {id:'missing',label:'08 · Moliya javobi kelmagan',tab:'finance',hint:'Davomat va hisob bor, amaldagi to‘lov noma’lum. Bu nol to‘lov yoki qarzdorlik emas.'},
 {id:'review',label:'09 · 90–99% davomat',tab:'finance',hint:'11/12 qatnashgan. Hujjatdagi ikki xil davomat talabi sabab yo‘lkira summasi aniqlashtirishda.'},
] as const

/** Append fixtures once. Existing cases are preserved until the page is refreshed. */
export function ensureEducationCases(){
 const missing=educationCases.filter(c=>!educationState.children.some(child=>child.id==='CASE-'+c.id))
 if(!missing.length)return 0
 transaction(s=>{

 const profiles=people.filter(p=>p.registry&&p.age>=15&&p.age<=18&&!s.children.some(c=>c.personId===p.id))
  if(profiles.length<missing.length)throw Error('Tayyor holatlar uchun yetarli namunaviy bola topilmadi.')
  for(const [index,item] of missing.entries()){
   const p=profiles[index]!,childId='CASE-'+item.id,requestId='REQ-CASE-'+item.id
   s.children.push({id:childId,personId:p.id,name:p.name,pinfl:p.pinfl,birth:`${2026-p.age}-03-12`,parent:'Qonuniy vakil (namuna)',region:p.region,registry:true,school:'public'})
   const received=item.id==='new'?'2026-11-02':item.id==='approval'?'2026-10-27':'2026-09-28'
   const submitted=item.id==='new'?undefined:item.id==='approval'?'2026-10-29':'2026-09-29'
   const r:Request={id:requestId,childId,quantity:['success','attendance'].includes(item.id)?2:1,received,workerDue:workDue(received,3),councilDue:submitted?workDue(submitted,2):null,submittedAt:submitted,channel:'Ijtimoiy xodim',state:item.id==='new'?'new':item.id==='approval'?'submitted':'approved',reason:'',previous:null,purpose:'new'}
   s.requests.push(r)
   if(r.state!=='approved')continue
   for(let slot=1;slot<=r.quantity;slot++){
    const v=formed('EDU-CASE-'+item.id+'-'+slot,childId);v.requestId=requestId;v.history=['2026-10-01 · Individual reja tasdiqlandi; vaucher yaratildi (namuna)']
    s.vouchers.push(v)
    if(item.id==='unbound')continue
    v.start='2026-10-01';v.clubId=slot===1?'C1':'C2';v.state='active';v.grantDays=(stamp(annualEnd(v.start))-stamp(v.start))/day+1
    v.history.push('2026-10-01 · Shartnoma kuchga kirdi (Kelajak namuna)')
    if(item.id==='paused'){v.state='paused';v.pauses=[{start:'2026-10-16',end:null}];v.history.push('2026-10-16 · Rasmiy chiqish; foydalanish muddati to‘xtadi (namuna)')}
    const periodPlanned=item.id==='paused'?6:12,attended=item.id==='attendance'&&slot===1?8:item.id==='review'?11:periodPlanned
    const fee=800000*attended/12
    const m:Monthly={id:'KEL-'+v.id+'-2026-10',voucherId:v.id,clubId:v.clubId,month:'2026-10',planned:12,periodPlanned,held:periodPlanned,attended,distance:slot===1?17:12,clubType:'private',bhm:400000,courseBudget:Math.round(fee*.8),parentShare:Math.round(fee*.2),received:'2026-11-03'}
    s.monthly.push(m)
    if(item.id!=='missing')s.payments.push({id:'FIN-'+v.id+'-2026-10-course',voucherId:v.id,month:m.month,type:'course',amount:m.courseBudget-(item.id==='difference'?10000:0),date:'2026-11-03'})
   }
   const monthly=s.monthly.filter(m=>s.vouchers.some(v=>v.id===m.voucherId&&v.childId===childId)),travel=transportResult(monthly,p.region)
   if(item.id!=='missing'&&travel.state==='calculated'&&travel.voucherId)s.payments.push({id:'FIN-'+travel.voucherId+'-2026-10-travel',voucherId:travel.voucherId,month:'2026-10',type:'travel',amount:travel.amount!,date:'2026-11-03'})
  }
  if(missing.length)s.sourceLog.unshift(`2026-11-03 · ${missing.length} ta tayyor holat qo‘shildi (namuna)`)
 })
 return missing.length
}

export const educationStatusLabels=['Kutilmoqda','Faollashtirilgan','Muddati yakunlangan'] as const
export function educationVoucherStatus(v:Voucher,date='2026-11-03'){return !v.start?'Kutilmoqda':(expiry(v)??'9999-12-31')<date?'Muddati yakunlangan':'Faollashtirilgan'}
export function receiveApprovedEducationPlan(p:{id:string;childId:string;approved:string;received:string}){transaction(s=>{
 if(!p.id.trim()||!s.children.some(c=>c.id===p.childId)||!validDate(p.approved)||!validDate(p.received)||p.received<p.approved)throw Error('Tasdiqlangan reja ma’lumotini tekshiring.');
 const prior=s.vouchers.filter(v=>v.requestId===p.id);if(prior.length){if(prior.some(v=>v.childId!==p.childId)||prior.length!==2)throw Error('Reja xabari avvalgi ma’lumotga mos emas.');return}
 if(s.vouchers.filter(v=>v.childId===p.childId&&unfinished(v)).length+2>2)throw Error('Bir bolaga ikki vaucher limiti mavjud.');
 for(let i=0;i<2;i++){const v=formed('EDU-'+p.received.slice(0,4)+'-'+String(s.vouchers.length+1).padStart(4,'0'),p.childId);v.subjectSlot=(i+1) as 1|2;v.requestId=p.id;v.created=p.received;v.notified=p.received;v.history=[p.received+' · Tashqi tizimdan tasdiqlangan reja olindi; vaucher Kutilmoqda holatida yaratildi',p.received+' · Oliy ta’lim vazirligiga avtomatik xabar yuborilgan'];s.vouchers.push(v)}
 s.sourceLog.unshift(p.received+' · Tasdiqlangan reja xabari: '+p.id)
})}
export function educationPlacements(v:Voucher):EducationPlacement[]{return v.placements?.length?v.placements:v.start&&v.clubId&&v.subjectId?[{eventId:v.activationEventId??'INITIAL-'+v.id,clubId:v.clubId,subjectId:v.subjectId,entered:v.start}]:[]}
function educationSubjectConflict(s:typeof educationState,v:Voucher,subjectId:string,date:string){return s.vouchers.some(other=>other.id!==v.id&&other.childId===v.childId&&other.requestId===v.requestId&&educationPlacements(other).some((p,i,rows)=>p.subjectId===subjectId&&p.entered<=(expiry(v)??annualEnd(date))&&(rows[i+1]?.entered??'9999-12-31')>date&&(expiry(other)??'0000')>=date))}
export function receiveEducationTransfer(p:EducationPlacement & {voucherId:string}){transaction(s=>{
 const v=s.vouchers.find(v=>v.id===p.voucherId),subject=educationSubjects.find(x=>x.id===p.subjectId);
 if(!v?.start||!subject||!subject.clubIds.includes(p.clubId)||!p.eventId.trim()||!validDate(p.entered))throw Error('Tashkilot yoki fan o‘zgarishi xabari noto‘g‘ri.');
 const duplicate=s.vouchers.flatMap(educationPlacements).find(x=>x.eventId===p.eventId);
 if(duplicate){if(educationPlacements(v).some(x=>x.eventId===p.eventId&&x.clubId===p.clubId&&x.subjectId===p.subjectId&&x.entered===p.entered))return;throw Error('Takroriy xabar ma’lumoti mos emas.');}
 const rows=educationPlacements(v),last=rows[rows.length-1];
 if(!last||p.entered<=last.entered||p.entered>(expiry(v)??'')||(last.clubId===p.clubId&&last.subjectId===p.subjectId))throw Error('O‘tish sanasi yoki tashkilot va fanni tekshiring.');
 if(educationSubjectConflict(s,v,p.subjectId,p.entered))throw Error('Ikkinchi vaucherda ushbu fan band.');
 v.placements=[...rows,{eventId:p.eventId,clubId:p.clubId,subjectId:p.subjectId,entered:p.entered}];v.clubId=p.clubId;v.subjectId=p.subjectId;
 v.history.push(p.entered+' · Vazirlik: tashkilot / fan o‘zgardi — '+subject.name+'; vaucher muddati saqlandi ('+p.eventId+')');
})}
export function receiveEducationActivation(p:{id:string;voucherId:string;clubId:string;subjectId:string;date:string}){transaction(s=>{
 const v=s.vouchers.find(v=>v.id===p.voucherId),club=clubs.find(c=>c.id===p.clubId),subject=educationSubjects.find(s=>s.id===p.subjectId);if(!v||!club||!subject||!subject.clubIds.includes(p.clubId)||!p.id.trim()||!validDate(p.date)||p.date<v.created||!v.notified||p.date<v.notified)throw Error('Vazirlikning faollashtirish xabari noto‘g‘ri.');
 if(v.activationEventId===p.id){if((educationPlacements(v)[0]?.subjectId??v.subjectId)!==p.subjectId||(educationPlacements(v)[0]?.clubId??v.clubId)!==p.clubId||v.start!==p.date)throw Error('Takroriy faollashtirish xabari ma’lumoti mos emas.');return}if(educationSubjectConflict(s,v,p.subjectId,p.date))throw Error('Bu bola uchun ushbu fan bo‘yicha vaucher allaqachon faollashtirilgan. Ikkinchi vaucher boshqa fan uchun faollashtirilishi kerak.');if(v.start||s.vouchers.some(v=>v.activationEventId===p.id))throw Error('Faollashtirish xabari avval ishlatilgan.');
 v.start=p.date;v.clubId=p.clubId;v.subjectId=p.subjectId;v.placements=[{eventId:p.id,clubId:p.clubId,subjectId:p.subjectId,entered:p.date}];v.state='active';v.activationEventId=p.id;v.grantDays=(stamp(annualEnd(p.date))-stamp(p.date))/day+1;v.history.push(p.date+' · Oliy ta’lim vazirligi: vaucher faollashtirildi, '+subject.name+' — '+club.name+' ('+p.id+')');s.sourceLog.unshift(p.date+' · Oliy ta’lim vazirligi: '+p.id)
})}
export function receiveEducationMonthlyPayment(p:Payment){transaction(s=>{
 const v=s.vouchers.find(v=>v.id===p.voucherId);if(!v?.start||!p.id.trim()||!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.month)||p.month<v.start.slice(0,7)||p.month>(expiry(v)??'').slice(0,7)||!validDate(p.date)||p.date<p.month+'-01'||!['course','travel'].includes(p.type)||!Number.isFinite(p.amount)||p.amount<0)throw Error('Vazirlikning oylik to‘lov xabari noto‘g‘ri.');
 if(s.payments.some(row=>row.id===p.id))return;const previous=s.payments.filter(row=>row.voucherId===p.voucherId&&row.month===p.month&&row.type===p.type).pop();if(previous&&previous.date>p.date)throw Error('Yangiroq oylik xabar mavjud.');
 s.payments.push({...p,...(previous?{supersedes:previous.id}:{})});v.history.push(p.date+' · Oliy ta’lim vazirligi: '+p.month+' uchun '+p.amount.toLocaleString('uz-UZ')+' so‘m ('+p.type+')');s.sourceLog.unshift(p.date+' · Oliy ta’lim vazirligi: '+p.id)
})}
export function educationVoucherMonths(v:Voucher){const end=expiry(v);if(!v.start||!end)return [];const rows=[];let month=v.start.slice(0,7);while(month<=end.slice(0,7)){rows.push({month,course:paidFor(v.id,month,'course'),travel:paidFor(v.id,month,'travel')});const d=new Date(month+'-01T00:00:00Z');d.setUTCMonth(d.getUTCMonth()+1);month=d.toISOString().slice(0,7)}return rows}
export function educationVoucherUsage(v:Voucher){const rows=educationVoucherMonths(v),known=rows.filter(m=>m.course!==null),used=known.filter(m=>m.course!>0).length;return {amount:known.length?known.reduce((sum,m)=>sum+m.course!,0):null,used,total:rows.length,percent:rows.length?Math.round(used/rows.length*100):0}}
export function ensureEducationExchangeCases(){
 if(educationState.children.some(c=>c.id==='EDU-SOURCE-END-FULL'))return;
 transaction(s=>{const names=['RAHIMOVA AZIZA AKMAL QIZI','RAHIMOVA MADINA AKMAL QIZI','KARIMOVA NODIRA AZIZ QIZI','KARIMOVA ZARINA AZIZ QIZI'];s.children.forEach((c,i)=>{c.name=names[i]??c.name.toLocaleUpperCase('uz-UZ');c.parent='QONUNIY VAKIL · NAMUNA'});
 const paired=formed('EDU-2026-0004','CH2');s.vouchers.push(paired);
 for(const childId of ['CH1','CH2'])for(const [index,v] of s.vouchers.filter(v=>v.childId===childId).entries()){v.subjectSlot=(index+1) as 1|2;if(v.start)v.subjectId=v.clubId==='C1'?'programming':'english';v.requestId='PLAN-SOURCE-'+childId;v.notified=v.created;if(v.id==='EDU-2026-0002'){v.start='2026-10-15';v.grantDays=(stamp(annualEnd(v.start))-stamp(v.start))/day+1}v.history=[v.created+' · Tashqi tizimdan tasdiqlangan reja olindi; ikki fan uchun 2 ta vaucher yaratildi',v.created+' · Oliy ta’lim vazirligiga avtomatik xabar yuborilgan',...(v.start?[v.start+' · Oliy ta’lim vazirligi: '+v.subjectSlot+'-fan vaucheri alohida faollashtirilgan']:[])]}
 });
 for(const childId of ['CH3','CH4'])receiveApprovedEducationPlan({id:'PLAN-SOURCE-'+childId,childId,approved:'2026-10-01',received:'2026-10-01'});
 const mixed=educationState.vouchers.find(v=>v.childId==='CH3'&&v.subjectSlot===1)!;receiveEducationActivation({id:'MIN-ACT-MIXED',voucherId:mixed.id,clubId:'C1',subjectId:'programming',date:'2026-10-20'});
 receiveEducationMonthlyPayment({id:'MIN-PAID-INITIAL',voucherId:'EDU-2026-0001',month:'2026-10',type:'course',amount:640000,date:'2026-11-03'});
 receiveEducationMonthlyPayment({id:'MIN-TRAVEL-INITIAL',voucherId:'EDU-2026-0001',month:'2026-10',type:'travel',amount:200000,date:'2026-11-03'});
 receiveEducationTransfer({eventId:'MIN-TRANSFER-DEMO',voucherId:'EDU-2026-0002',clubId:'C3',subjectId:'mathematics',entered:'2026-11-01'});
 const profiles=people.filter(p=>p.registry&&p.age>=15&&p.age<=18&&!educationState.children.some(c=>c.personId===p.id));
 for(const [i,key] of ['FULL','PARTIAL'].entries()){
  const person=profiles[i]!,childId='EDU-SOURCE-END-'+key;
  transaction(s=>{s.children.push({id:childId,personId:person.id,name:i?'ERGASHEVA NILUFAR BOBUR QIZI':'QODIROV DILSHOD AKBAR O‘G‘LI',pinfl:person.pinfl,birth:'2010-02-10',parent:'QONUNIY VAKIL · NAMUNA',region:person.region,registry:true,school:'public'})});
  const planId='PLAN-SOURCE-END-'+key;receiveApprovedEducationPlan({id:planId,childId,approved:'2025-09-25',received:'2025-09-26'});
  const ids=educationState.vouchers.filter(v=>v.requestId===planId).map(v=>v.id);
  for(const [slot,id] of ids.entries()){
   receiveEducationActivation({id:'MIN-ACT-'+key+'-'+slot,voucherId:id,clubId:slot?'C2':'C1',subjectId:slot?'english':'programming',date:slot?'2025-11-01':'2025-10-01'});
   for(const [index,m] of educationVoucherMonths(educationState.vouchers.find(v=>v.id===id)!).entries()){const d=new Date(m.month+'-01T00:00:00Z');d.setUTCMonth(d.getUTCMonth()+1);receiveEducationMonthlyPayment({id:'MIN-PAY-'+key+'-'+slot+'-'+m.month,voucherId:id,month:m.month,type:'course',amount:!i||index<8?640000:0,date:d.toISOString().slice(0,7)+'-03'})}
  }
 }
}
