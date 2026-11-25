import type {VoucherRecord} from './voucher-analysis'
export interface FamilySavings {familyId:string;month:string|null;children:number;vouchers:number;missing:number;knownTotal:number|null;perPerson:number|null;percent:number|null;members:number|null;baselineDate:string|null;items:{voucherId:string;name:string;service:'education'|'kindergarten'|undefined;amount:number|null}[]}
export interface VoucherIncome {familyId?:string|null;atIssue:number|null;issueDate:string;latest:number|null;checkedAt:string|null;householdMembers:number|null;source:string}
// Fictional, read-only snapshots for the frontend prototype. Issuance values stay fixed on transfers.
const profiles:Record<string,[number,number|null,number]>={
 '00000000000013':[650000,820000,4],'00000000000015':[650000,820000,4],
 '00000000000009':[480000,null,5],'00000000000011':[480000,610000,5],
 '00000000000012':[570000,760000,3],'00000000000014':[720000,680000,4],
 '00000000000901':[610000,780000,4],'00000000000902':[520000,670000,5],
 '00000000000903':[740000,810000,3],'00000000000904':[650000,820000,4],
 '00000000000905':[480000,null,5],'00000000000906':[700000,680000,4],
 '00000000000907':[570000,760000,3],'00000000000908':[720000,880000,4],
}
export function voucherIncomeSnapshot(pinfl:string,created:string):VoucherIncome{
 const p=profiles[pinfl];return {familyId:p?(pinfl==='00000000000013'||pinfl==='00000000000904'?'DEMO-FAMILY-001':'DEMO-FAMILY-'+pinfl):null,atIssue:p?.[0]??null,issueDate:created,latest:p?.[1]??null,checkedAt:p&&p[1]!==null?'2026-11-01':null,householdMembers:p?.[2]??null,source:'Ijtimoiy reyestr · namuna'};
}
export function voucherSavings(r:VoucherRecord,date:string){
 const i=r.income,rows=r.months.filter(m=>m.month<date.slice(0,7)&&m.amount!==null&&(!m.received||m.received<=date)).sort((a,b)=>b.month.localeCompare(a.month)),m=rows[0];
 // Main service coverage only. Travel has separate eligibility and may have no source message.
 const total=m?.amount??(!r.start?0:null),members=i?.householdMembers,perPerson=total!==null&&members&&Number.isInteger(members)&&members>0?total/members:null;
 const percent=perPerson!==null&&i?.atIssue!==null&&i?.atIssue!==undefined&&i.atIssue>0?Math.round(perPerson/i.atIssue*1000)/10:null;
 return {month:m?.month??null,total,perPerson,percent,members:members??null};
}

export function voucherIncomeChange(income:VoucherIncome|undefined){
 const before=income?.atIssue,after=income?.latest;
 if(before===null||before===undefined||after===null||after===undefined||!Number.isFinite(before)||!Number.isFinite(after)||before<=0||after<0)return null;
 const value=Math.round((after-before)/before*1000)/10;return value===0?0:value;
}
export function voucherIncomeExport(r:VoucherRecord,date:string){const saved=voucherSavings(r,date),family=r.familySavings;return {'Berilganidagi jon boshiga oylik daromad':r.income?.atIssue??null,'Oxirgi jon boshiga oylik daromad':r.income?.latest??null,'Daromad tekshirilgan sana':r.income?.checkedAt??null,'Daromad ozgarishi %':voucherIncomeChange(r.income),'Oila azolari':r.income?.householdMembers??null,'Iqtisod oyi':saved.month,'Vaucher qoplagan oylik summa':saved.total,'Jon boshiga oylik iqtisod':saved.perPerson,'Iqtisod foizi (berilganidagi daromadga)':saved.percent,'Oila ID':r.income?.familyId??null,'Oila iqtisod oyi':family?.month??null,'Oilaning ma’lum iqtisodi':family?.knownTotal??null,'Oila jon boshiga ma’lum iqtisod':family?.perPerson??null,'Oila iqtisod foizi (kamida)':family?.percent??null,'Oila to‘lov ma’lumoti yetishmagan vaucherlar':family?.missing??null}}

export function familyVoucherSavings(records:VoucherRecord[],date:string):Map<string,FamilySavings>{
 const groups=new Map<string,VoucherRecord[]>(),result=new Map<string,FamilySavings>();
 for(const r of records){const id=r.income?.familyId;if(id&&r.created<=date){const group=groups.get(id)??[];if(!group.some(x=>x.id===r.id&&x.service===r.service))group.push(r);groups.set(id,group)}}
 for(const [familyId,group] of groups){
  // One common reporting month: never add different months or duplicate a voucher across views/transfers.
  const closed=group.flatMap(r=>r.months.map(m=>m.month)).filter(m=>m<date.slice(0,7)).sort(),month=closed[closed.length-1]??null;
  const relevant=month?group.filter(r=>r.months.some(m=>m.month===month)):[],payments=relevant.map(r=>r.months.find(m=>m.month===month)!),known=payments.filter(m=>m.amount!==null&&(!m.received||m.received<=date)),missing=payments.length-known.length;
  const amounts=known.map(m=>m.amount!),knownTotal=amounts.length?amounts.reduce((n,v)=>n+v,0):!group.some(r=>r.start)?0:null;
  const familySizes=[...new Set(group.map(r=>r.income?.householdMembers).filter((n):n is number=>n!==null&&n!==undefined))],members=familySizes.length===1&&familySizes[0]!>0?familySizes[0]!:null;
  const first=[...group].sort((a,b)=>a.created.localeCompare(b.created))[0]!,baseline=first.income?.atIssue,perPerson=knownTotal!==null&&members?knownTotal/members:null,percent=perPerson!==null&&baseline!==null&&baseline!==undefined&&baseline>0?Math.round(perPerson/baseline*1000)/10:null;
  result.set(familyId,{familyId,month,children:new Set(relevant.map(r=>r.personId)).size,vouchers:relevant.length,missing,knownTotal,perPerson,percent,members,baselineDate:first.created,items:relevant.map(r=>{const m=r.months.find(m=>m.month===month)!;return {voucherId:r.id,name:r.name,service:r.service,amount:!m.received||m.received<=date?m.amount:null}})});
 }
 return result;
}
