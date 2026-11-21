import { benefitText } from '@/shared/i18n'
import { legacyLatin } from '@/shared/uzbek-script'
import source from './platform-data.json?raw'
export interface Registry { id:string; n:string; oi:number; o:string; fi:number; ti:number; ci:number; cn:string; b:string }
export interface MonthValue { s:number; c:number; p:number }
export interface Finance { id:string; n:string; o:string; t:string; d:string; c:string; k:string; cnt:number|null; s:number; plan?:number; reg:boolean; periods:{year:number;regions:{region:string;months:MonthValue[]}[]}[] }
export interface Payment { id:string; n:string; o:string; t:string; d:string; arr:number[] }
export interface Suggestion {id:string; got:boolean; why:string[]}
export interface Member {id:string;name:string;sex:string;age:number|null;relation:string;source:boolean;allowances:[number,number[]][];rows:Payment[];suggestions:Suggestion[]}
export interface Family {id:string;region:number;address:string;tags:string[];signals:[string,string][];members:Member[]}
export interface AuditCase {id:number;ri:number;d:number;sx:number;age?:number;m?:[number,number[]][];nd?:number;n?:number;s?:number}
export interface Audit {k:string;n:number;src:string;lv:string;lt:string;why:string;reg:[number,number][];typ:[number,number,number][];mon:number[];s:number;over?:number;smp:AuditCase[]}
interface PlatformData {recipientDistribution:{nt:number[][];mo:number[][];b:number[][];other:number[]};about:{steps:[string,string][];evidence:[string,string,string][];decisions:string[]};labels:{types:Record<string,string>;directions:Record<string,string>;cohorts:Record<string,string>};womenSubsidies:[string,number][];cubePeople:[number,number,number,number,number[]][];registry:Registry[];agencies:{n:string;c:number;d:number[];t:number[]}[];registryTotal:number;typeTotals:number[];fieldTotals:number[];cohortTotals:{n:string;v:number[]}[];types:string[];fields:string[];cohorts:string[];regions:string[];organizations:Record<string,string>;finance:Finance[];families:Family[];audit:(Audit & {title?:string})[];familyAudit:{multi:number;n:number};regionMap:number[];benefitTypes:string[];districts:[number,string][];cube:[number,number,number,number,number,number[],number[]][];demographics:{rows:number;persons:number;comm:number;card:[string,number][];pairs:[number[],number][];fam:number[];monthTotal:number[]};services:Record<string,[string,string,string]>;methodology:string}
export const data=JSON.parse(source) as PlatformData
export const latin=legacyLatin
export const num=(n:number,decimals=0)=>new Intl.NumberFormat('uz-UZ',{maximumFractionDigits:decimals}).format(n||0)
export function money(n:number){return Math.abs(n)>=1e12?num(n/1e12,1)+' trln':Math.abs(n)>=1e9?num(n/1e9,1)+' mlrd':Math.abs(n)>=1e6?num(n/1e6,1)+' mln':num(n)}
export const months=['Yan','Fev','Mar','Apr','May','Iyun','Iyul','Avg','Sen','Okt','Noy','Dek']
export const colors=['#3267e3','#12a88c','#9863dc','#e5a143','#e3697c','#46a5c8']
export const organization=(key:string)=>latin(data.organizations[key]??key.replace(/^m:/,''))
export const sum=(values:number[])=>values.reduce((a,b)=>a+b,0)
export function financeMonths(line:Finance,year:number,region:string){return line.periods.find(p=>p.year===year)?.regions.find(r=>r.region===region)?.months??[]}
export const auditTitles=['Bir oyda ikki baravar to‘lov','Bir oyda ikki tumandan to‘lov','Bir vaqtda ikki toifadagi nafaqa','Bir vakil orqali 5+ oluvchi','Bir oylik to‘lovning bo‘linishi','Bir necha oylik to‘lov bir vaqtda']
export const geoKeys=['karakalpakstan','andijon','buxoro','jizzax','qashqadaryo','navoiy','namangan','samarqand','sirdaryo','surxondaryo','toshkent-v','fargona','xorazm','toshkent-sh']
export function saveCSV(filename:string,rows:(string|number)[][]){const csv='\uFEFF'+rows.map(row=>row.map(v=>'"'+(typeof v==='string'?benefitText(v):String(v)).replace(/"/g,'""')+'"').join(';')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}

export function aggregateFinance(line:Finance,year:number,region:string,selectedMonths:number[]){const values=financeMonths(line,year,region);const selected=selectedMonths.map(i=>values[i]??{s:0,c:0,p:0});const active=selected.filter(v=>v.s||v.c).length;return {line,values,total:sum(selected.map(v=>v.s)),plan:sum(selected.map(v=>v.p)),count:sum(selected.map(v=>v.c))/(line.k==='m'?Math.max(1,active):1)}}
export type FinanceRow=ReturnType<typeof aggregateFinance>
