import { watch } from 'vue'
import { catalog, metadata, categoryDefinitions } from './prototype-store'
import { capabilities } from './capabilities'
import { observations, personFor, type Observation } from './domain'
import { educationState, educationRevision, paidFor, educationVoucherStatus } from './education'
export const educationCode='EDU-VOUCHER'
let attached=false
export function registerEducation(){
 let entry=catalog.find(b=>b.code===educationCode)
 if(!entry){let id=2001;while(catalog.some(b=>b.id===id))id++;entry={id,code:educationCode,specNumber:2,name:'Qo‘shimcha ta’lim vaucheri va yo‘lkira xarajatlari',details:'Тури: Электрон ваучер.\n02.11.2026 texnik talabi, 2-imtiyoz. Ijtimoiy reyestrdagi oilalarning davlat maktabida o‘qiydigan farzandlari. Ikki yakunlanmagan vaucher limiti. Tasdiqlangan reja xabari bilan ikki fan uchun 2 ta vaucher avtomatik yaratiladi va vazirlik xabardor qilinadi. Vazirlik faollashtirish sanasi, to‘garak va oylik to‘lovlarni yuboradi. IHMA monitoringni amalga oshiradi. Amal muddati faollashtirilgan sanadan bir yil.'};catalog.push(entry)}
 for(const b of catalog)if(b.id<=150&&!b.specNumber)b.specNumber=b.id===1?1:b.id+1
 const id=entry.id
 if(!metadata[id])metadata[id]={type:'Elektron vaucher',legal:'02.11.2026 texnik talab · 2-imtiyoz · VM-365 ishchi tahririga havola',organization:'Ta’lim va ijtimoiy himoya bo‘yicha mas’ullar',source:'Oliy ta’lim vazirligi · namuna',start:'2026-11-01',end:'2099-12-31',categories:['Ijtimoiy reyestrdagi oilalar'],description:entry.details}
 const category=categoryDefinitions.find(c=>c.name==='Ijtimoiy reyestrdagi oilalar');if(category&&!category.benefitIds.includes(id))category.benefitIds.push(id)
 if(!capabilities[id])capabilities[id]={eligibility:'auto',usage:'auto',eligibilitySource:'Reyestr va maktab holati · namuna',usageSource:'Oliy ta’lim vazirligining faollashtirish va to‘lov xabarlari · namuna',reason:'Qo‘shimcha ta’lim bo‘yicha namunaviy almashinuv.',owner:'Ta’lim manbasi mas’uli',plan:'Real tizimda manbalar bilan integratsiya.'}
 function sync(){const records:Observation[]=[];
 const keys=new Set([...educationState.monthly.map(m=>m.voucherId+'|'+m.month+'|course'),...educationState.payments.map(p=>p.voucherId+'|'+p.month+'|'+p.type)]);
 for(const key of keys){const [voucherId,month,type]=key.split('|') as [string,string,'course'|'travel'],v=educationState.vouchers.find(v=>v.id===voucherId),c=educationState.children.find(c=>c.id===v?.childId);if(!v?.start||!c)continue;const amount=paidFor(voucherId,month,type),monthly=educationState.monthly.find(m=>m.voucherId===voucherId&&m.month===month);if(!(amount!==null&&amount>0)&&!(type==='course'&&monthly?.attended))continue;records.push({id:'EDU-USE-'+key,personId:c.personId,benefitId:id,date:month+'-28',status:'used',amount,source:'Oliy ta’lim vazirligi · namuna',sourceEventId:key})}
 const base=observations.filter(r=>!r.id.startsWith('EDU-'));observations.splice(0,observations.length,...base,...records)
 }
 if(!attached){watch(educationRevision,sync);attached=true}sync();return id
}
export function educationSummary(){const childIds=new Set(educationState.vouchers.map(v=>v.childId)),families=new Set(educationState.children.filter(c=>childIds.has(c.id)).map(c=>personFor(c.personId).familyId));let coursePaid:number|null=null,travelPaid:number|null=null;const keys=new Set(educationState.payments.map(p=>p.voucherId+'|'+p.month+'|'+p.type));for(const key of keys){const [voucherId,month,type]=key.split('|') as [string,string,'course'|'travel'],amount=paidFor(voucherId,month,type);if(amount!==null){if(type==='course')coursePaid=(coursePaid??0)+amount;else travelPaid=(travelPaid??0)+amount}}return {children:childIds.size,families:families.size,vouchers:educationState.vouchers.length,active:educationState.vouchers.filter(v=>educationVoucherStatus(v)==='Faollashtirilgan').length,coursePaid,travelPaid}}
