import { reactive } from 'vue'
import { annualEnd, validDate } from './education'
export interface KindergartenPlan { id:string; child:string; pinfl:string; birth:string; parent:string; address:string; approved:string; caseLabel:string }
export interface KindergartenPlacement {eventId:string;organization:string;inn?:string;region?:string;district?:string;entered:string}
export interface KindergartenVoucher {placements?:KindergartenPlacement[]; id:string; documentNumber?:string; organizationInn?:string; region?:string; district?:string; planId:string; created:string; notified:string; accepted:string|null; organization:string|null; activated:string|null; end:string|null; admissionEventId:string|null; history:string[] }
export interface KindergartenPayment { id:string; voucherId:string; month:string; attendance:number|null; amount:number; received:string }
const plans:KindergartenPlan[]=Array.from({length:6},(_,i)=>({id:`IR-KG-${i+1}`,child:['ALIYEV BEHZOD ANVAR O‘G‘LI','KARIMOVA MADINA AZIZ QIZI','RAHIMOV JASUR AKMAL O‘G‘LI','TURSUNOVA AZIZA ALISHER QIZI','SAIDOV BEKZOD SHAVKAT O‘G‘LI','NAZAROVA MALIKA RUSTAM QIZI'][i]!,pinfl:'00000000000'+String(901+i),birth:'2022-01-01',parent:['ALIYEV ANVAR BAHODIR O‘G‘LI','KARIMOV AZIZ AKRAM O‘G‘LI','RAHIMOV AKMAL SOBIR O‘G‘LI','TURSUNOV ALISHER BOTIR O‘G‘LI','SAIDOV SHAVKAT OLIM O‘G‘LI','NAZAROV RUSTAM KOMIL O‘G‘LI'][i]!,address:'Toshkent shahri, namunaviy MFY',approved:'2026-10-01',caseLabel:['Reja ma’lumoti olindi — vaucher avtomatik yaratildi','Vaucher shakllangan','Qabul xabari kutilmoqda','Oylik to‘lov kelgan','Oylik ma’lumot kelmagan','Nol to‘lov tasdiqlangan'][i]!}))
const vouchers:KindergartenVoucher[]=plans.slice(1).map((p,i)=>{const active=i>=2;return {id:`KG-2026-${String(i+1).padStart(4,'0')}`,documentNumber:String(i+1).padStart(6,'0'),organizationInn:active?'000000'+String(101+i):undefined,region:active?'Toshkent shahri':undefined,district:active?'Namunaviy tuman':undefined,planId:p.id,created:'2026-10-01',notified:'2026-10-01',accepted:active?'2026-10-05':null,organization:active?`${i+1}-namunaviy DMTT`:null,activated:active?'2026-10-05':null,end:active?'2027-10-04':null,admissionEventId:active?'ADM-SEED-'+i:null,history:['2026-10-01 · Tashqi tizimdan reja ma’lumoti olindi; vaucher avtomatik Kutilmoqda holatida yaratildi','2026-10-01 · Ta’lim vazirligiga avtomatik xabar yuborilgan (namuna)',...(active?['2026-10-05 · Ta’lim vazirligidan qabul va tashkilot ma’lumoti olindi; vaucher faollashdi (namuna)']:[])]}})
// Prototype state intentionally resets on a full page refresh.
export const kindergartenState=reactive({plans,vouchers,payments:[{id:'PAY-SEED-1',voucherId:'KG-2026-0003',month:'2026-10',attendance:20,amount:190000,received:'2026-11-03'},{id:'PAY-SEED-0',voucherId:'KG-2026-0005',month:'2026-10',attendance:0,amount:0,received:'2026-11-03'}] as KindergartenPayment[]})
export function receiveKindergartenPlan(plan:KindergartenPlan,received:string){
 if(!plan.id.trim()||!plan.child.trim()||!/^\d{14}$/.test(plan.pinfl)||!validDate(plan.birth)||!validDate(plan.approved)||!validDate(received)||received<plan.approved)throw Error('Tashqi reja ma’lumoti va qabul sanasini tekshiring.');
 const existingPlan=kindergartenState.plans.find(p=>p.id===plan.id);
 if(existingPlan&&existingPlan.pinfl!==plan.pinfl)throw Error('Reja boshqa shaxsga tegishli.');
 const existing=kindergartenState.vouchers.find(v=>v.planId===plan.id);if(existing)return existing.id;
 const documentNumber=String(kindergartenState.vouchers.length+1).padStart(6,'0'),id='KG-'+received.slice(0,4)+'-'+String(Number(documentNumber)).padStart(4,'0');
 if(!existingPlan)kindergartenState.plans.push({...plan});
 kindergartenState.vouchers.push({id,documentNumber,planId:plan.id,created:received,notified:received,accepted:null,organization:null,activated:null,end:null,admissionEventId:null,history:[received+' · Tashqi tizimdan reja ma’lumoti olindi; vaucher avtomatik Kutilmoqda holatida yaratildi',received+' · Ta’lim vazirligiga avtomatik xabar yuborilgan (namuna)']});return id;
}
// Every received external plan already has a voucher when the registry opens.
for(const plan of plans)receiveKindergartenPlan(plan,plan.approved)
export function receiveKindergartenAdmission(id:string,eventId:string,accepted:string,organization:string,activated:string,details?:{inn:string;region:string;district:string}){const v=kindergartenState.vouchers.find(v=>v.id===id);if(!v||!v.notified)throw Error('Avval vaucher berilgani haqida Ta’lim vazirligiga xabar yuborilishi kerak.');if(!eventId.trim()||!organization.trim()||!validDate(accepted)||!validDate(activated)||activated<accepted||activated<v.created||activated<v.notified)throw Error('Qabul sanasi, tashkilot va faollashtirish sanasini tekshiring.');if(details&&(!/^\d{9}$/.test(details.inn)||!details.region.trim()||!details.district.trim()))throw Error('Tashkilot INN, hudud va tumanni tekshiring.');if(v.admissionEventId===eventId)return;if(kindergartenState.vouchers.some(other=>other.id!==id&&other.admissionEventId===eventId))throw Error('Bu qabul xabari boshqa vaucherda ishlatilgan.');if(v.activated)throw Error('Vaucher allaqachon faollashgan; boshlanish va tugash sanasi qayta o‘zgartirilmaydi.');v.accepted=accepted;v.organization=organization.trim();if(details){v.organizationInn=details.inn;v.region=details.region.trim();v.district=details.district.trim();}v.activated=activated;v.end=annualEnd(activated);v.admissionEventId=eventId;v.history.push(`${activated} · Ta’lim vazirligi xabari ${eventId}: qabul ${accepted}, ${v.organization}; vaucher faollashdi`)}
export function kindergartenPlacements(v:KindergartenVoucher):KindergartenPlacement[]{return v.placements?.length?v.placements:v.accepted&&v.organization?[{eventId:v.admissionEventId??'INITIAL-'+v.id,organization:v.organization,inn:v.organizationInn,region:v.region,district:v.district,entered:v.accepted}]:[]}
export function receiveKindergartenTransfer(p:KindergartenPlacement & {voucherId:string}){
 const v=kindergartenState.vouchers.find(v=>v.id===p.voucherId);
 if(!v?.activated||!p.eventId.trim()||!p.organization.trim()||!p.inn||!/^\d{9}$/.test(p.inn)||!p.region?.trim()||!p.district?.trim()||!validDate(p.entered))throw Error('Tashkilot o‘zgarishi xabari noto‘g‘ri.');
 const duplicate=kindergartenState.vouchers.flatMap(kindergartenPlacements).find(x=>x.eventId===p.eventId);
 if(duplicate){if(kindergartenPlacements(v).some(x=>x.eventId===p.eventId&&x.organization===p.organization&&x.inn===p.inn&&x.region===p.region&&x.district===p.district&&x.entered===p.entered))return;throw Error('Takroriy xabar ma’lumoti mos emas.');}
 const rows=kindergartenPlacements(v),last=rows[rows.length-1];
 if(!last||p.entered<=last.entered||p.entered<v.activated||p.entered>v.end!||last.inn===p.inn)throw Error('O‘tish sanasi yoki tashkilotni tekshiring.');
 v.placements=[...rows,{eventId:p.eventId,organization:p.organization,inn:p.inn,region:p.region,district:p.district,entered:p.entered}];v.organization=p.organization;v.organizationInn=p.inn;v.region=p.region;v.district=p.district;v.accepted=p.entered;
 v.history.push(p.entered+' · Ta’lim vazirligi: '+p.organization+' tashkilotiga o‘tdi; vaucher muddati saqlandi ('+p.eventId+')');
}
export function receiveKindergartenPayment(p:KindergartenPayment){const v=kindergartenState.vouchers.find(v=>v.id===p.voucherId);if(!v?.activated||!v.end)throw Error('Vaucher hali faollashmagan.');if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.month)||p.month<v.activated.slice(0,7)||p.month>v.end.slice(0,7)||!validDate(p.received)||p.received<p.month+'-01'||!p.id.trim()||!Number.isFinite(p.amount)||p.amount<0||(p.attendance!==null&&(!Number.isInteger(p.attendance)||p.attendance<0||p.attendance>new Date(Number(p.month.slice(0,4)),Number(p.month.slice(5)),0).getDate())))throw Error('Hisob oyi, davomat, summa yoki xabar sanasi noto‘g‘ri.');if(kindergartenState.payments.some(row=>row.id===p.id))return;const prior=kindergartenState.payments.filter(row=>row.voucherId===p.voucherId&&row.month===p.month);if(prior.some(row=>row.received>p.received))throw Error('Ushbu oy uchun yangiroq manba xabari mavjud.');kindergartenState.payments.push({...p});v.history.push(`${p.received} · Ta’lim vazirligi: ${p.month} uchun ${p.amount.toLocaleString('uz-UZ')} so‘m to‘langan (${p.id})`)}
export function kindergartenMonths(v:KindergartenVoucher){if(!v.activated||!v.end)return [];const rows=[];let month=v.activated.slice(0,7);while(month<=v.end.slice(0,7)){const payments=kindergartenState.payments.filter(p=>p.voucherId===v.id&&p.month===month),latest=payments[payments.length-1];rows.push({month,attendance:latest?.attendance??null,amount:latest?.amount??null,received:latest?.received??null});const d=new Date(month+'-01T00:00:00Z');d.setUTCMonth(d.getUTCMonth()+1);month=d.toISOString().slice(0,7)}return rows}

// Count paid calendar months in the voucher term; missing reports remain unknown.
export function kindergartenUsage(v:KindergartenVoucher|undefined){
 const months=v?kindergartenMonths(v):[],known=months.filter(m=>m.amount!==null),used=months.filter(m=>m.amount!==null&&m.amount>0).length;
 return {amount:known.length?known.reduce((sum,m)=>sum+m.amount!,0):null,used,total:months.length,percent:months.length?Math.round(used/months.length*100):0};
}

// Completed vouchers demonstrate full and partial usage after the annual term.
for(const [index,child,parent,region] of [
 [7,'QODIROV DILSHOD AKBAR O‘G‘LI','QODIROV AKBAR NODIR O‘G‘LI','Samarqand viloyati'],
 [8,'ERGASHEVA NILUFAR BOBUR QIZI','ERGASHEV BOBUR ANVAR O‘G‘LI','Buxoro viloyati'],
] as const){
 const id=receiveKindergartenPlan({id:'IR-KG-'+index,child,parent,address:region+', namunaviy MFY',pinfl:'00000000000'+String(900+index),birth:'2021-02-10',approved:'2025-09-25',caseLabel:index===7?'Muddati yakunlangan — to‘liq foydalanilgan':'Muddati yakunlangan — qisman foydalanilgan'},'2025-09-26');
 receiveKindergartenAdmission(id,'ADM-COMPLETED-'+index,'2025-10-01',index+'-namunaviy DMTT','2025-10-01',{inn:'000000'+String(100+index),region,district:'Namunaviy tuman'});
 const voucher=kindergartenState.vouchers.find(v=>v.id===id)!;
 for(const [monthIndex,row] of kindergartenMonths(voucher).entries()){
  const used=index===7||monthIndex<8,next=new Date(row.month+'-01T00:00:00Z');next.setUTCMonth(next.getUTCMonth()+1);
  receiveKindergartenPayment({id:'PAY-COMPLETED-'+index+'-'+row.month,voucherId:id,month:row.month,attendance:used?20:0,amount:used?190000:0,received:next.toISOString().slice(0,7)+'-03'});
 }
}

receiveKindergartenTransfer({eventId:'KG-TRANSFER-DEMO',voucherId:'KG-2026-0003',organization:'12-namunaviy DMTT',inn:'000000112',region:'Toshkent shahri',district:'Chilonzor tumani',entered:'2026-10-25'});
