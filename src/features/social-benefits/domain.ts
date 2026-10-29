import { evidenceObservation, capabilityFor } from './capabilities'
import { reactive, computed } from 'vue'
export type Decision = 'used' | 'unused' | 'mismatch' | 'unknown'
export const statusLabels: Record<Decision, string> = { used: 'Huquqi bor va foydalangan', unused: 'Huquqi bor, foydalanmagan', mismatch: 'Shartlarga mos kelmay foydalangan', unknown: 'Huquqi aniqlanmagan' }
export const regions = ['Toshkent shahri', 'Toshkent viloyati', 'Samarqand', 'Farg‘ona', 'Andijon', 'Namangan', 'Buxoro', 'Qashqadaryo', 'Surxondaryo', 'Xorazm', 'Navoiy', 'Jizzax', 'Sirdaryo', 'Qoraqalpog‘iston Respublikasi']
export const contingents = reactive(['Ijtimoiy reyestrdagi oilalar', 'Nogironligi bo‘lgan shaxslar', 'Nogironligi bo‘lgan bolalar', 'Yolg‘iz keksalar', 'Urush va mehnat faxriylari', 'Ota-ona qaramog‘isiz bolalar', 'Ishsiz fuqarolar', 'Ehtiyojmand xotin-qizlar', 'Boquvchisini yo‘qotgan oilalar', 'Yoshlar va talabalar'])
export interface Person { id: string; name: string; pinfl: string; familyId: string; region: string; district: string; mahalla: string; gender: string; age: number; registry: boolean; categories: string[] }
export interface Observation { id: string; personId: string; benefitId: number; date: string; status: Decision; amount: number | null; source: string; sourceEventId: string | null }
const firstNames = ['Aziza', 'Jasur', 'Madina', 'Bekzod', 'Dilnoza', 'Sardor', 'Malika', 'Shahzod', 'Nodira', 'Alisher', 'Zarina', 'Oybek']
const lastNames = ['Karimov', 'Rahimov', 'Abdullayev', 'Tursunov', 'Ismoilov', 'Yusupov', 'Ergashev', 'Qodirov', 'Saidov', 'Nazarov', 'Usmonov', 'Aliyev', 'Rasulov']
export const people: Person[] = reactive(Array.from({ length: 420 }, (_, i) => ({ id: `P${i+1}`, name: `${lastNames[Math.floor(i/12)%13]}${i%2===0?'a':''} ${firstNames[i%12]} (namuna)`, pinfl: `000000${String(i+1).padStart(8,'0')}`, familyId: `F${Math.floor(i/2)+1}`, region: regions[Math.floor(i/2)%14]!, district: `${Math.floor(i/28)%6+1}-namunaviy tuman`, mahalla: `${Math.floor(i/14)%8+1}-namunaviy MFY`, gender: i%2===0?'Ayol':'Erkak', age: 4+i%75, registry: i%3!==0, categories: [contingents[i%10]!, ...(i%4===0?[contingents[(i+3)%10]!]:[])] })))
const sources = ['Ijtimoiy reyestr', 'Tibbiy-ijtimoiy ekspertiza', 'Bandlik xizmatlari', 'Ta’lim xizmatlari', 'Transport imtiyozlari', 'Ijtimoiy xizmatlar']
export const observations: Observation[] = reactive(people.flatMap((p,i) => Array.from({length: 12}, (_,j) => {
 const n=i*12+j, bucket=(i*7+j*3+Math.floor(i/14))%24
 const status: Decision = bucket<11+j%3?'used':bucket<19?'unused':bucket<21?'mismatch':'unknown'
 return { id:`O${n+1}`,personId:p.id,benefitId:(i*13+j*17)%150+1,date:`2026-${String(8+j%3).padStart(2,'0')}-${String(1+(i+j)%28).padStart(2,'0')}`,status,amount:status==='used'||status==='mismatch'?(n%5===0?null:(n%16+1)*125000):null,source:sources[(i+j)%sources.length]!,sourceEventId:status==='used'||status==='mismatch'?`EV${n+1}`:null }
})))
export interface Filters { from: string; to: string; region: string; category: string; benefitId: number; status: string; search: string; gender: string; registry: string }
const personMap = computed(()=>new Map(people.map(p=>[p.id,p])))
export const personFor = (id: string) => personMap.value.get(id)!
export function filterObservations(rows: Observation[], f: Filters) {
 if(f.from>f.to) return []
 return rows.map(evidenceObservation).filter(r=>{const p=personFor(r.personId);return r.date>=f.from&&r.date<=f.to&&(!f.region||p.region===f.region)&&(!f.category||p.categories.includes(f.category))&&(!f.benefitId||r.benefitId===f.benefitId)&&(!f.status||r.status===f.status)&&(!f.gender||p.gender===f.gender)&&(!f.registry||String(p.registry)===f.registry)&&(!f.search||`${p.name} ${p.pinfl}`.toLocaleLowerCase().includes(f.search.toLocaleLowerCase()))})
}
export function summarize(rows: Observation[]) {
 const events = new Map(rows.filter(r=>r.sourceEventId).map(r=>[`${r.source}:${r.sourceEventId}`,r]))
 const used=[...events.values()]
 return { people:new Set(rows.map(r=>r.personId)).size, families:new Set(rows.map(r=>personFor(r.personId).familyId)).size, events:used.length, amount:used.reduce((s,r)=>s+(r.amount??0),0), missingAmounts:used.filter(r=>r.amount===null).length, used:rows.filter(r=>r.status==='used').length, unused:rows.filter(r=>r.status==='unused').length, mismatch:rows.filter(r=>r.status==='mismatch').length, unknown:rows.filter(r=>r.status==='unknown').length, benefits:new Set(rows.map(r=>r.benefitId)).size }
}
export function evaluate(p: Person | undefined, benefitId: number, asOf: string) {
 const history = p ? observations.filter(r=>r.personId===p.id&&r.benefitId===benefitId&&r.date<=asOf).sort((a,b)=>b.date.localeCompare(a.date)) : []
 const capability=capabilityFor(benefitId)
 if(capability.eligibility!=='auto')return {outcome:'unknown' as const,history:history.map(evidenceObservation),criteria:[{name:'Moslikni avtomatik tekshirish',result:capability.eligibility==='none'?'Manba mavjud emas':'Qo‘lda ko‘rib chiqish kerak'}],reason:'Muvofiqlik aniqlanmagan: '+capability.reason}
 const latest=history[0]
 const outcome: 'eligible'|'ineligible'|'unknown' = !latest||latest.status==='unknown'?'unknown':latest.status==='mismatch'?'ineligible':'eligible'
 return { outcome, history, criteria:[{name:'Shaxs namunaviy bazada mavjud',result:p?'Mos':'Ma’lumot yo‘q'},{name:'Tanlangan sana uchun imtiyozga oid fakt',result:latest?'Mavjud':'Ma’lumot yo‘q'},{name:'Imtiyozning demo mezonlari',result:outcome==='eligible'?'Mos':outcome==='ineligible'?'Mos emas':'Aniqlanmagan'},{name:'Ma’lumot qamrovi',result:latest&&latest.status!=='unknown'?'Yetarli':'Yetarli emas'}], reason:outcome==='eligible'?'Namunaviy faktlarga ko‘ra imtiyoz shartlariga mos.':outcome==='ineligible'?'Demo ssenariy: foydalanish sanasida kontingentga mansublik muddati tugagan.':'Tanlangan imtiyoz va sana bo‘yicha yetarli namunaviy ma’lumot yo‘q.' }
}



/** Each cell uses only its own contingent/benefit records; totals deduplicate again. */
export function buildBenefitMatrix(rows: Observation[], categoryNames: string[], benefitIds: number[]) {
 const categories=new Set(categoryNames),benefits=new Set(benefitIds)
 const groups=new Map<string,Observation[]>(),rowGroups=new Map<string,Observation[]>(),columnGroups=new Map<number,Observation[]>()
 const included:Observation[]=[]
 for(const r of rows){if(!benefits.has(r.benefitId))continue;const memberships=personFor(r.personId).categories.filter(c=>categories.has(c));if(!memberships.length)continue;included.push(r);const col=columnGroups.get(r.benefitId)??[];col.push(r);columnGroups.set(r.benefitId,col)
  for(const c of memberships){const key=JSON.stringify([c,r.benefitId]),cell=groups.get(key)??[];cell.push(r);groups.set(key,cell);const group=rowGroups.get(c)??[];group.push(r);rowGroups.set(c,group)}
 }
 return {cells:new Map([...groups].map(([key,values])=>[key,summarize(values)])),rowTotals:new Map([...rowGroups].map(([key,values])=>[key,summarize(values)])),columnTotals:new Map([...columnGroups].map(([key,values])=>[key,summarize(values)])),total:summarize(included)}
}
