import type {VoucherRecord} from './voucher-analysis'
export interface VoucherLocation {address:string;region:string;district:string;lat:number|null;lon:number|null}
export interface VoucherProfile {birth:string;registryDate:string;guardian:{name:string;pinfl:string;phone:string;relation:string};home:VoucherLocation;sample:true}
const centers:Record<string,[number,number,string]>={
 'Toshkent shahri':[41.3111,69.2797,'Yunusobod tumani'],
 'Namangan viloyati':[40.9983,71.6726,'Namangan shahri'],
 'Andijon':[40.7821,72.3442,'Andijon shahri'],
 'Namangan':[40.9983,71.6726,'Namangan shahri'],
 'Buxoro':[39.7747,64.4286,'Buxoro shahri'],
 'Qashqadaryo':[38.8610,65.7847,'Qarshi shahri'],
 'Andijon viloyati':[40.7821,72.3442,'Andijon shahri'],
}
// Explicitly fictional locations and contacts; never infer real addresses from PINFL.
export function demoVoucherProfile(input:{pinfl:string;familyId?:string|null;birth:string;parent:string;region:string;address?:string}):VoucherProfile{
 const family=input.familyId??input.pinfl,seed=[...family].reduce((n,c)=>(n*31+c.charCodeAt(0))%100000000,0),center=centers[input.region];
 const shared=input.familyId==='DEMO-FAMILY-001';
 return {sample:true,birth:input.birth,registryDate:'2025-09-15',guardian:{name:shared?'TURSUNOV ALISHER BOTIR O‘G‘LI':(/Qonuniy vakil|QONUNIY VAKIL/.test(input.parent)?['ALIYEV ANVAR BAHODIR O‘G‘LI','KARIMOV AZIZ AKRAM O‘G‘LI','RAHIMOVA NIGORA SOBIR QIZI'][seed%3]!:input.parent).toLocaleUpperCase('uz-UZ'),pinfl:'000000'+String(seed).padStart(8,'0'),phone:'+998 00 000 '+String(seed%100).padStart(2,'0')+' '+String(seed%97).padStart(2,'0'),relation:'Qonuniy vakil'},home:{region:input.region,district:center?.[2]??'Namunaviy tuman',address:shared?'Namunaviy MFY, Namunaviy ko‘chasi, 12-uy':input.address??'Namunaviy MFY, Namunaviy ko‘chasi, 12-uy',lat:center?center[0]+.008:null,lon:center?center[1]+.006:null}};
}
export function organizationLocation(inn:string,region:string,district:string):VoucherLocation|null{
 const c=centers[region];if(!c||!inn)return null;
 const offset=Number(inn.slice(-2));
 return {region,district,address:'Namunaviy ta’lim ko‘chasi, '+(offset||1)+'-uy',lat:c[0]+.015+(offset%7)*.004,lon:c[1]+.012+(offset%5)*.006};
}
export function straightLineKm(a:VoucherLocation|undefined,b:VoucherLocation|null|undefined):number|null{
 if(!a||!b||a.lat===null||a.lon===null||b.lat===null||b.lon===null||![a.lat,a.lon,b.lat,b.lon].every(Number.isFinite)||Math.abs(a.lat)>90||Math.abs(b.lat)>90||Math.abs(a.lon)>180||Math.abs(b.lon)>180)return null;
 const rad=(v:number)=>v*Math.PI/180,dlat=rad(b.lat-a.lat),dlon=rad(b.lon-a.lon),h=Math.sin(dlat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dlon/2)**2;
 return Math.round(6371*2*Math.asin(Math.sqrt(Math.min(1,h)))*10)/10;
}
export function voucherProfileExport(r:VoucherRecord){const p=r.profile,last=r.placements[r.placements.length-1],org=last?organizationLocation(last.inn,last.region,last.district):null;return {'Tugilgan sana':p?.birth??'','Reestrga kiritilgan sana':p?.registryDate??'','Qonuniy vakil':p?.guardian.name??'','Vakil JSHSHIR':p?.guardian.pinfl??'','Vakil telefon':p?.guardian.phone??'','Yashash manzili':p?[p.home.region,p.home.district,p.home.address].join(', '):'','Yashash koordinatalari':p?.home.lat!==null&&p?.home.lon!==null&&p?p.home.lat+', '+p.home.lon:'','Tashkilot manzili':org?[org.region,org.district,org.address].join(', '):'','Tashkilot koordinatalari':org?org.lat+', '+org.lon:'','Togri chiziq masofa km':straightLineKm(p?.home,org),'Masofa turi':'To‘g‘ri chiziq, namunaviy koordinatalar; yo‘l masofasi emas'};}
