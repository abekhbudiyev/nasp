import { capabilityFor } from './capabilities'
import { reactive } from 'vue'
import originalCatalog from './catalog.json'
import { people, observations, contingents, regions, statusLabels, evaluate, personFor, type Person, type Observation } from './domain'
export type Entity = 'benefit'|'rule'|'category'|'person'|'usage'|'voucher'|'source'
export interface BenefitMeta { type:string; legal:string; organization:string; source:string; start:string; end:string; categories:string[]; description:string }
export interface Rule { benefitId:number; version:string; minAge:number; maxAge:number; gender:string; registry:string; categories:string[]; start:string; end:string; state:string }
export interface Category { name:string; code:string; description:string; benefitIds:number[] }
export interface Voucher { id:string; child:string; parent:string; region:string; state:string; start:string; end:string; kindergarten:string; consent:boolean; plan:string; history:string[] }
export interface Source { name:string; organization:string; systemCode:string; status:string; time:string; coverage:number; frequency:string; description:string }
export const catalog=reactive(originalCatalog.map(b=>({...b})))
export const metadata=reactive<Record<number,BenefitMeta>>({})
export const rules=reactive<Rule[]>([])
export const categoryDefinitions=reactive<Category[]>(contingents.map((name,i)=>({name,code:`K${String(i+1).padStart(2,'0')}`,description:'Namunaviy kontingent',benefitIds:[...new Set(observations.filter(r=>personFor(r.personId).categories.includes(name)).map(r=>r.benefitId))]})))
export const voucherStates=['Shakllangan','Faol','Vaqtincha nofaol','Yakunlangan']
export const vouchers=reactive<Voucher[]>(Array.from({length:16},(_,i)=>({id:`V-2026-${String(i+1).padStart(4,'0')}`,child:`Namuna bola ${i+1}`,parent:people[i]!.name,region:regions[i%14]!,state:voucherStates[i%4]!,start:'2026-10-01',end:'2027-09-30',kindergarten:`${i+1}-namunaviy MTT`,consent:true,plan:`IR-2026-${i+1}`,history:['01.10.2026 · Shakllandi (demo)']})))
export const sources=reactive<Source[]>(['Ijtimoiy reyestr','Tibbiy-ijtimoiy ekspertiza','Bandlik xizmatlari','Ta’lim xizmatlari','Transport imtiyozlari','Ijtimoiy xizmatlar'].map((name,i)=>({name,organization:'Namunaviy mas’ul tashkilot',systemCode:`SRC-${i+1}`,status:i===2?'Kechikmoqda':i===5?'Qisman ma’lumot':'Yangilangan',time:'2026-10-29T08:00',coverage:i===2?87.6:99.2,frequency:'Kunlik',description:'Prototipdagi namunaviy ma’lumot manbasi'})))
const storageKey='nasp-social-benefits-prototype-v2'
export const storageNotice=reactive({text:''})
export type Values=Record<string,string|string[]|boolean>
const text=(v:Values,k:string)=>String(v[k]??'').trim()
const list=(v:Values,k:string)=>Array.isArray(v[k])?v[k] as string[]:[]
const validDate=(s:string)=>{const d=new Date(s+'T00:00:00Z');return /^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===s}
function snapshot(){return JSON.parse(JSON.stringify({version:2,catalog,metadata,rules,categories:categoryDefinitions,people,observations,vouchers,sources}))}
type Snapshot=ReturnType<typeof snapshot>
function apply(s:Snapshot){catalog.splice(0,catalog.length,...s.catalog);people.splice(0,people.length,...s.people);observations.splice(0,observations.length,...s.observations);categoryDefinitions.splice(0,categoryDefinitions.length,...s.categories);contingents.splice(0,contingents.length,...s.categories.map((c:Category)=>c.name));rules.splice(0,rules.length,...s.rules);vouchers.splice(0,vouchers.length,...s.vouchers);sources.splice(0,sources.length,...s.sources);for(const key of Object.keys(metadata))delete metadata[Number(key)];Object.assign(metadata,s.metadata)}
function consistent(s:Snapshot){
 if(!s||s.version!==2||!['catalog','people','observations','categories','rules','vouchers','sources'].every(k=>Array.isArray(s[k]))||!s.metadata)return false
 const benefits=new Set(s.catalog.map((b:{id:number})=>b.id)),persons=new Set(s.people.map((p:Person)=>p.id))
 return s.catalog.length>=150&&s.catalog.every((b:{id:number;name:string;details:string})=>Number.isInteger(b.id)&&b.id>0&&typeof b.name==='string'&&typeof b.details==='string')&&benefits.size===s.catalog.length&&s.people.every((p:Person)=>typeof p.name==='string'&&/^\d{14}$/.test(p.pinfl)&&Array.isArray(p.categories)&&regions.includes(p.region))&&new Set(s.people.map((p:Person)=>p.pinfl)).size===s.people.length&&persons.size===s.people.length&&s.observations.every((r:Observation)=>persons.has(r.personId)&&benefits.has(r.benefitId)&&r.status in statusLabels&&validDate(r.date)&&(r.amount===null||Number.isFinite(r.amount)))&&s.categories.every((c:Category)=>typeof c.name==='string'&&Array.isArray(c.benefitIds)&&c.benefitIds.every(id=>benefits.has(id)))&&s.sources.every((r:Source)=>typeof r.name==='string'&&Number.isFinite(r.coverage)&&r.coverage>=0&&r.coverage<=100)&&s.vouchers.every((v:Voucher)=>voucherStates.includes(v.state)&&typeof v.child==='string'&&Array.isArray(v.history))&&s.rules.every((r:Rule)=>benefits.has(r.benefitId)&&Number.isFinite(r.minAge)&&Number.isFinite(r.maxAge)&&Array.isArray(r.categories))
}
try {
 if(!localStorage.getItem(storageKey)) {
  const legacy:unknown=JSON.parse(localStorage.getItem('sb-vouchers-v1')??'null')
  if(Array.isArray(legacy))for(const row of legacy){const existing=vouchers.find(v=>v.id===row?.id);if(existing&&voucherStates.includes(row.state)&&Array.isArray(row.history)&&row.history.every((h:unknown)=>typeof h==='string')){existing.state=row.state;existing.history=[...row.history]}}
  const drafts:unknown=JSON.parse(localStorage.getItem('nasp-social-benefits-categories-v1')??'null')
  if(Array.isArray(drafts))for(const row of drafts){if(row&&typeof row.name==='string'&&Array.isArray(row.benefitIds)&&row.benefitIds.every((id:unknown)=>typeof id==='number'&&catalog.some(b=>b.id===id))&&!categoryDefinitions.some(c=>c.name===row.name)){categoryDefinitions.push({name:row.name,code:`DRAFT-${categoryDefinitions.length+1}`,description:'Avval yaratilgan lokal kontingent',benefitIds:row.benefitIds});contingents.push(row.name)}}
 }
} catch { /* Invalid legacy drafts do not replace the current dataset. */ }
try{const raw=localStorage.getItem(storageKey);if(raw){const data=JSON.parse(raw);if(consistent(data))apply(data);else storageNotice.text='Saqlangan prototip ma’lumoti mos kelmadi; boshlang‘ich namuna ochildi.'}}catch{storageNotice.text='Brauzerda saqlangan ma’lumotni o‘qib bo‘lmadi.'}
function commit(s:Snapshot){if(!consistent(s))throw Error('Ma’lumotlar o‘rtasidagi bog‘lanish noto‘g‘ri.');try{localStorage.setItem(storageKey,JSON.stringify(s))}catch{throw Error('Brauzer xotirasiga saqlab bo‘lmadi. Ma’lumot o‘zgartirilmadi.')}apply(s)}
export function saveEntity(entity:Entity,v:Values,editId='') {
 const s=snapshot(), id=text(v,'id'), name=text(v,'name')
 const required=(keys:string[])=>{if(keys.some(k=>!text(v,k)))throw Error('Majburiy maydonlarni to‘ldiring.')}
 const dates=()=>{required(['start','end']);if(!validDate(text(v,'start'))||!validDate(text(v,'end'))||text(v,'start')>text(v,'end'))throw Error('Amal sanalarini tekshiring.')}
 const upsert=(rows:any[],key:string,value:unknown,row:unknown)=>{const i=rows.findIndex(r=>String(r[key])===String(editId||value));if(i>=0)rows[i]=row;else rows.push(row)}
 if(entity==='benefit'){
  required(['id','name','type','legal','organization']);dates();const n=Number(id);if(!Number.isInteger(n)||n<1)throw Error('Imtiyoz raqami musbat butun son bo‘lishi kerak.');if(s.catalog.some((b:{id:number})=>b.id===n&&String(b.id)!==editId))throw Error('Bu raqamdagi imtiyoz mavjud.')
  const details=`Тури: ${text(v,'type')}.\nHuquqiy asos: ${text(v,'legal')}\nTavsif va shartlar: ${text(v,'description')}`
  upsert(s.catalog,'id',n,{id:n,name,details});s.metadata[n]={type:text(v,'type'),legal:text(v,'legal'),organization:text(v,'organization'),source:text(v,'source'),start:text(v,'start'),end:text(v,'end'),categories:list(v,'categories'),description:text(v,'description')};s.catalog.sort((a:{id:number},b:{id:number})=>a.id-b.id);s.categories.forEach((c:Category)=>{c.benefitIds=c.benefitIds.filter(id=>id!==n);if(list(v,'categories').includes(c.name))c.benefitIds.push(n)})
 }
 if(entity==='category'){
  required(['name','code','description']);if(s.categories.some((c:Category)=>(c.name===name||c.code===text(v,'code'))&&c.name!==editId))throw Error('Kontingent nomi yoki kodi takrorlangan.');const benefitIds=list(v,'benefits').map(Number);if(!benefitIds.length)throw Error('Kamida bitta imtiyozni tanlang.');upsert(s.categories,'name',name,{name,code:text(v,'code'),description:text(v,'description'),benefitIds});if(editId&&editId!==name){s.people.forEach((p:Person)=>p.categories=p.categories.map(c=>c===editId?name:c));s.rules.forEach((r:Rule)=>r.categories=r.categories.map(c=>c===editId?name:c));Object.values(s.metadata).forEach((m:any)=>m.categories=m.categories.map((c:string)=>c===editId?name:c))}
 }
 if(entity==='person'){
  required(['name','pinfl','familyId','region','district','mahalla','age','gender']);const pinfl=text(v,'pinfl'),age=Number(text(v,'age'));if(!/^\d{14}$/.test(pinfl))throw Error('JShShIR 14 raqamdan iborat bo‘lishi kerak.');if(s.people.some((p:Person)=>p.pinfl===pinfl&&p.id!==editId))throw Error('Bu JShShIR bilan shaxs mavjud.');if(!Number.isInteger(age)||age<0||age>120)throw Error('Yosh 0–120 oralig‘ida bo‘lishi kerak.');if(!list(v,'categories').length)throw Error('Kamida bitta kontingentni tanlang.');upsert(s.people,'id',editId||`P-${Date.now()}`,{id:editId||`P-${Date.now()}`,name,pinfl,familyId:text(v,'familyId'),region:text(v,'region'),district:text(v,'district'),mahalla:text(v,'mahalla'),age,gender:text(v,'gender'),registry:text(v,'registry')==='true',categories:list(v,'categories')})
 }
 if(entity==='usage'){
  required(['personId','benefitId','date','status','source']);const status=text(v,'status'),used=status==='used'||status==='mismatch',event=text(v,'sourceEventId'),amount=text(v,'amount');if(!validDate(text(v,'date')))throw Error('Sana noto‘g‘ri.');if(used&&!event)throw Error('Foydalanish uchun manba hodisasi identifikatori kerak.');if(used&&s.observations.some((r:Observation)=>r.source===text(v,'source')&&r.sourceEventId===event&&r.id!==editId))throw Error('Bu manba hodisasi avval kiritilgan.');if(amount!==''&&(!Number.isFinite(Number(amount))||Number(amount)<0))throw Error('Summa manfiy bo‘lmagan son bo‘lishi kerak.');upsert(s.observations,'id',editId||`O-${Date.now()}`,{id:editId||`O-${Date.now()}`,personId:text(v,'personId'),benefitId:Number(text(v,'benefitId')),date:text(v,'date'),status,source:text(v,'source'),sourceEventId:used?event:null,amount:used&&amount!==''?Number(amount):null})
 }
 if(entity==='rule'){
  required(['benefitId','version','minAge','maxAge']);dates();const minAge=Number(text(v,'minAge')),maxAge=Number(text(v,'maxAge'));if(!Number.isInteger(minAge)||!Number.isInteger(maxAge)||minAge<0||maxAge>120||minAge>maxAge)throw Error('Yosh chegaralarini tekshiring.');const benefitId=Number(text(v,'benefitId'));if(s.rules.some((r:Rule)=>r.benefitId===benefitId&&r.version===text(v,'version')&&`${r.benefitId}:${r.version}`!==editId))throw Error('Bu qoida versiyasi mavjud.');if(text(v,'state')==='Faol'&&s.rules.some((r:Rule)=>r.benefitId===benefitId&&r.state==='Faol'&&`${r.benefitId}:${r.version}`!==editId&&r.start<=text(v,'end')&&r.end>=text(v,'start')))throw Error('Ushbu davr uchun faol qoida mavjud. Davrlarni ajrating.');const row={benefitId,version:text(v,'version'),minAge,maxAge,gender:text(v,'gender'),registry:text(v,'registry'),categories:list(v,'categories'),start:text(v,'start'),end:text(v,'end'),state:text(v,'state')};const index=s.rules.findIndex((r:Rule)=>`${r.benefitId}:${r.version}`===editId);if(index>=0)s.rules[index]=row;else s.rules.push(row)
 }
 if(entity==='voucher'){
  required(['id','child','parent','region','start','end','kindergarten','plan']);dates();if(v.consent!==true)throw Error('Qonuniy vakil roziligini belgilang.');if(s.vouchers.some((r:Voucher)=>r.id===id&&r.id!==editId))throw Error('Bu vaucher raqami mavjud.');const previous=s.vouchers.find((r:Voucher)=>r.id===editId);upsert(s.vouchers,'id',id,{id,child:text(v,'child'),parent:text(v,'parent'),region:text(v,'region'),start:text(v,'start'),end:text(v,'end'),state:text(v,'state'),kindergarten:text(v,'kindergarten'),plan:text(v,'plan'),consent:true,history:[...(previous?.history??[]),`29.10.2026 · ${editId?'Tahrirlandi':'Shakllandi'} (demo)`]})
 }
 if(entity==='source'){
  required(['name','organization','systemCode','time','frequency']);if(s.sources.some((r:Source)=>(r.name===name||r.systemCode===text(v,'systemCode'))&&r.name!==editId))throw Error('Manba nomi yoki kodi takrorlangan.');const coverage=Number(text(v,'coverage'));if(!Number.isFinite(coverage)||coverage<0||coverage>100)throw Error('To‘liqlik 0–100 oralig‘ida bo‘lishi kerak.');upsert(s.sources,'name',name,{name,organization:text(v,'organization'),systemCode:text(v,'systemCode'),time:text(v,'time'),frequency:text(v,'frequency'),status:text(v,'status'),coverage,description:text(v,'description')});if(editId&&editId!==name){s.observations.forEach((r:Observation)=>{if(r.source===editId)r.source=name});Object.values(s.metadata).forEach((m:any)=>{if(m.source===editId)m.source=name})}
 }
 commit(s)
}
export function persistCurrent(){commit(snapshot())}
export function checkEligibility(p:Person|undefined,benefitId:number,asOf:string){const result=evaluate(p,benefitId,asOf);const rule=rules.find(r=>r.benefitId===benefitId&&r.state==='Faol'&&r.start<=asOf&&r.end>=asOf);if(!rule||!p||capabilityFor(benefitId).eligibility!=='auto')return result;const checks=[{name:`Yosh ${rule.minAge}–${rule.maxAge}`,pass:p.age>=rule.minAge&&p.age<=rule.maxAge},{name:'Jins talabi',pass:!rule.gender||p.gender===rule.gender},{name:'Reyestr talabi',pass:!rule.registry||String(p.registry)===rule.registry},{name:'Kontingentga mansublik',pass:!rule.categories.length||p.categories.some(c=>rule.categories.includes(c))}];const outcome=checks.every(c=>c.pass)?'eligible':'ineligible';return {...result,outcome,criteria:checks.map(c=>({name:c.name,result:c.pass?'Mos':'Mos emas'})),reason:`Kiritilgan demo qoida ${rule.version} bo‘yicha ${outcome==='eligible'?'mos':'mos emas'}. ${checks.filter(c=>!c.pass).map(c=>c.name).join('; ')}`}}
export function transitionVoucher(id:string){const s=snapshot(),v=s.vouchers.find((r:Voucher)=>r.id===id);const next:Record<string,string>={'Shakllangan':'Faol','Faol':'Vaqtincha nofaol','Vaqtincha nofaol':'Faol'};if(!v||!next[v.state])return;v.state=next[v.state];v.history.push(`29.10.2026 · ${v.state} (demo)`);commit(s)}
export function refreshSource(index:number){const s=snapshot(),r=s.sources[index];if(!r)return;r.status='Yangilangan';r.time='2026-10-29T09:00';r.coverage=100;commit(s)}
