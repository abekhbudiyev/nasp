import { educationState, paidFor, transportResult, validDate } from './education'

export type EducationStage = 'requests' | 'worker' | 'council' | 'formed' | 'active' | 'paused' | 'finished'
export interface EducationTarget { childId: string; tab: 'requests' | 'vouchers' | 'finance'; recordId: string; month?: string }
export interface EducationMonitorRow extends EducationTarget { id: string; child: string; region: string; reference: string; detail: string }
export interface EducationIssue extends EducationMonitorRow { kind: 'deadline' | 'unbound' | 'attendance' | 'finance' | 'difference'; title: string; tone: 'danger' | 'warning'; next: string }
export const educationStages: {id:EducationStage;label:string;tone:string;unit:string}[] = [
 {id:'requests',label:'Jami murojaatlar',tone:'neutral',unit:'murojaat'},
 {id:'worker',label:'Xodimda',tone:'warning',unit:'murojaat'},
 {id:'council',label:'Reja tasdig‘ida',tone:'warning',unit:'murojaat'},
 {id:'formed',label:'To‘garakka bog‘lanmagan',tone:'warning',unit:'vaucher'},
 {id:'active',label:'Foydalanilmoqda',tone:'good',unit:'vaucher'},
 {id:'paused',label:'Vaqtincha to‘xtatilgan',tone:'warning',unit:'vaucher'},
 {id:'finished',label:'Yakunlangan / bekor',tone:'neutral',unit:'vaucher'},
]
const daysBetween=(a:string,b:string)=>Math.floor((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000)
export function educationMonitoring(date:string,month:string,region='',unboundDays=14){
 const stages={requests:[],worker:[],council:[],formed:[],active:[],paused:[],finished:[]} as Record<EducationStage,EducationMonitorRow[]>
 const issues:EducationIssue[]=[]
 const children=educationState.children.filter(c=>!region||c.region===region), childIds=new Set(children.map(c=>c.id))
 const scopedVouchers=educationState.vouchers.filter(v=>childIds.has(v.childId))
 const valid=validDate(date)&&/^\d{4}-(0[1-9]|1[0-2])$/.test(month)&&Number.isInteger(unboundDays)&&unboundDays>=1
 if(!valid)return {stages,issues,children:0,vouchers:0,affected:0,valid:false}
 const row=(childId:string,reference:string,tab:EducationTarget['tab'],recordId:string,detail:string):EducationMonitorRow=>{const c=children.find(c=>c.id===childId)!;return {id:reference,childId,child:c.name,region:c.region,reference,tab,recordId,detail}}
 for(const r of educationState.requests.filter(r=>childIds.has(r.childId))){
  const item=row(r.childId,r.id,'requests',r.id,`${r.received} · ${r.quantity} ta vaucher`)
  stages.requests.push(item)
  if(r.state==='new'||r.state==='returned')stages.worker.push({...item,detail:r.state==='returned'?'Qayta ishlashga qaytarilgan':`Xodim muddati: ${r.workerDue}`})
  if(r.state==='submitted')stages.council.push({...item,detail:`Tasdiq muddati: ${r.councilDue??'Ma’lumot yo‘q'}`})
  const due=r.state==='new'?r.workerDue:r.state==='submitted'?r.councilDue:null
  if(due&&due<date)issues.push({...item,id:'deadline:'+r.id,kind:'deadline',title:r.state==='new'?'Xodim muddati o‘tgan':'Reja tasdig‘i kechikkan',tone:'danger',detail:`Belgilangan muddat ${due}; ${daysBetween(due,date)} kalendar kun o‘tgan.`,next:r.state==='new'?'Murojaatni ko‘rib chiqish va rejaga kiritish':'Tasdiq yoki qaytarish sababini qayd etish'})
 }
 for(const v of scopedVouchers){
  const item=row(v.childId,v.id,'vouchers',v.id,`Shakllangan: ${v.created}`)
  const stage:EducationStage=v.state==='formed'?'formed':v.state==='active'?'active':v.state==='paused'?'paused':'finished'
  stages[stage].push(item)
  if(v.state==='formed'&&daysBetween(v.created,date)>=unboundDays)issues.push({...item,id:'unbound:'+v.id,kind:'unbound',title:'To‘garakka bog‘lanmagan',tone:'warning',detail:`${daysBetween(v.created,date)} kundan beri bog‘lanmagan; nazorat chegarasi ${unboundDays} kun.`,next:'Vakil bilan bog‘lanish va to‘garak tanlash holatini tekshirish'})
 }
 for(const m of educationState.monthly.filter(m=>m.month===month)){
  const v=scopedVouchers.find(v=>v.id===m.voucherId);if(!v)continue
  const item={...row(v.childId,v.id,'finance',m.id,month),month}
  if(m.periodPlanned>0&&m.attended<m.periodPlanned){const ratio=m.attended/m.periodPlanned*100;issues.push({...item,id:'attendance:'+m.id,kind:'attendance',title:ratio<90?'Past davomat':'Davomat mezoni noaniq',tone:ratio<90?'danger':'warning',detail:`${month} · ${m.attended}/${m.periodPlanned} mashg‘ulot (${ratio.toFixed(1)}%).`,next:ratio<90?'Qatnashmaslik sababini o‘rganish; vaucher avtomatik bekor qilinmaydi':'90% va to‘liq davomat shartlarini aniqlashtirish'})}
  const paid=paidFor(v.id,month,'course')
  if(paid===null)issues.push({...item,id:'finance-course:'+m.id,kind:'finance',title:'To‘garak bo‘yicha moliya javobi yo‘q',tone:'warning',detail:`${month} · hisob: ${m.courseBudget.toLocaleString('uz-UZ')} so‘m; to‘lov noma’lum.`,next:'Moliya manbasidan javob olish; qarzdorlik deb hisoblanmaydi'})
  else if(paid!==m.courseBudget)issues.push({...item,id:'difference-course:'+m.id,kind:'difference',title:'To‘garak hisobi va to‘lovi farqli',tone:'warning',detail:`${month} · hisob ${m.courseBudget.toLocaleString('uz-UZ')}, to‘lov ${paid.toLocaleString('uz-UZ')} so‘m.`,next:'Davr, tuzatishlar va qaytarishlarni solishtirish'})
 }
 for(const child of children){
  const records=educationState.monthly.filter(m=>m.month===month&&scopedVouchers.some(v=>v.id===m.voucherId&&v.childId===child.id))
  const travel=transportResult(records,child.region)
  if(travel.state!=='calculated'||!travel.voucherId)continue
  const m=records.find(m=>m.voucherId===travel.voucherId)!,paid=paidFor(travel.voucherId,month,'travel')
  const item={...row(child.id,travel.voucherId,'finance',m.id,month),month}
  if(paid===null)issues.push({...item,id:'finance-travel:'+child.id+month,kind:'finance',title:'Yo‘lkira bo‘yicha moliya javobi yo‘q',tone:'warning',detail:`${month} · hisob ${travel.amount?.toLocaleString('uz-UZ')} so‘m; to‘lov noma’lum.`,next:'Yo‘lkira uchun moliya javobini olish; nol to‘lov deb olinmaydi'})
  else if(paid!==travel.amount)issues.push({...item,id:'difference-travel:'+child.id+month,kind:'difference',title:'Yo‘lkira hisobi va to‘lovi farqli',tone:'warning',detail:`${month} · hisob ${travel.amount?.toLocaleString('uz-UZ')}, to‘lov ${paid.toLocaleString('uz-UZ')} so‘m.`,next:'Yo‘lkira davri va moliya xabarlarini solishtirish'})
 }
 issues.sort((a,b)=>Number(b.tone==='danger')-Number(a.tone==='danger')||a.child.localeCompare(b.child))
 return {stages,issues,children:new Set([...scopedVouchers.map(v=>v.childId),...stages.requests.map(r=>r.childId)]).size,vouchers:scopedVouchers.length,affected:new Set(issues.map(i=>i.childId)).size,valid:true}
}
