import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname,resolve,extname } from 'node:path'
import {test} from 'node:test'
import ts from 'typescript'
const root=dirname(fileURLToPath(import.meta.url)),native=createRequire(import.meta.url)
function setup(storage){const values=storage??new Map();globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};const cache=new Map();function load(p){if(cache.has(p))return cache.get(p).exports;const m={exports:{}};cache.set(p,m);const source=ts.transpileModule(readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const req=id=>id.startsWith('.')?(extname(id)==='.json'?JSON.parse(readFileSync(resolve(dirname(p),id),'utf8')):load(resolve(dirname(p),id+'.ts'))):native(id);new Function('exports','module','require',source)(m.exports,m,req);return m.exports}return {a:load(resolve(root,'voucher-analysis.ts')),load,values}}

const record=(id='V1',personId='P1')=>({id,personId,number:'000001',planId:'PLAN',name:'BOLA ISMI',pinfl:personId,age:8,created:'2026-10-01',start:'2026-10-05',end:'2027-10-04',status:'Faollashtirilgan',slot:1,placements:[{organization:'Oldingi',inn:'111111111',region:'Old region',district:'Old district',subject:'English',direction:'Language',entered:'2026-10-05',left:'2026-10-24'},{organization:'Joriy',inn:'222222222',region:'New region',district:'New district',subject:'Math',direction:'Subjects',entered:'2026-10-25',left:null}],months:[{month:'2026-10',amount:100,travel:20},{month:'2026-11',amount:null,travel:null},{month:'2026-12',amount:null,travel:null}],history:[]});
test('usage assessment excludes current and future months and does not classify missing data as zero',()=>{
 const {a}=setup(),r=record(),f=a.emptyVoucherFilters();let v=a.voucherAssessment(r,'2026-11-03');assert.equal(v.expected,1);assert.equal(v.percent,100);assert.equal(v.missing,0);assert.equal(v.total,3);
 r.months[0].amount=null;v=a.voucherAssessment(r,'2026-11-03');assert.equal(v.percent,null);assert.equal(v.missing,1);assert.equal(v.amount,null);assert.equal(a.voucherSignals(r,'2026-11-03').low,false);
 r.months[0].amount=0;assert.equal(a.voucherAssessment(r,'2026-11-03').percent,0);assert.equal(a.voucherSignals(r,'2026-11-03').low,true);
 f.monthFrom='2026-11';assert.equal(a.voucherAssessment(r,'2026-11-03',f).expected,0);assert.equal(a.voucherAssessment(r,'2026-11-03',f).percent,null);
});
test('filters search history but organization and geography use current placement, and validate ranges',()=>{
 const {a}=setup(),r=record(),f=a.emptyVoucherFilters();f.query='Oldingi';assert.equal(a.filterVouchers([r],f,'2026-11-03').length,1);
 f.region='Old region';assert.equal(a.filterVouchers([r],f,'2026-11-03').length,0);f.region='New region';f.subject='Math';f.changed=true;assert.equal(a.filterVouchers([r],f,'2026-11-03').length,1);
 f.from='2026-11-01';f.to='2026-10-01';assert.equal(a.filterVouchers([r],f,'2026-11-03').length,0);
});
test('report counts unique children independently of vouchers and never duplicates transfer amounts',()=>{
 const {a}=setup(),one=record(),two=record('V2');two.placements[1].region='Other region';const rows=[one,two],summary=a.summarizeVouchers(rows,'2026-11-03');assert.equal(summary.vouchers,2);assert.equal(summary.children,1);assert.equal(summary.amount,200);assert.equal(summary.travel,40);
 const grouped=a.voucherReport(rows,'region','2026-11-03');assert.equal(grouped.length,2);assert.equal(grouped.reduce((n,r)=>n+r.amount,0),200);assert.deepEqual(grouped.flatMap(r=>r.ids).sort(),['V1','V2']);
 const monthly=a.voucherReport(rows,'month','2026-11-03');assert.equal(monthly.find(r=>r.name==='2026-10').amount,200);assert.equal(monthly.find(r=>r.name==='2026-11').amount,null);assert.ok(!monthly.some(r=>r.name==='2026-12'));
});
test('waiting and expiry signals honor boundaries and historical placement departure is exclusive of next entry',()=>{
 const {a}=setup(),r=record();r.start=null;r.created='2026-10-04';assert.equal(a.voucherSignals(r,'2026-11-03').waiting,true);r.created='2026-10-05';assert.equal(a.voucherSignals(r,'2026-11-03').waiting,false);r.start='2026-10-05';r.end='2026-12-03';assert.equal(a.voucherSignals(r,'2026-11-03').ending,true);assert.equal(a.voucherSignals(r,'2026-12-04').ending,false);assert.equal(a.placementDeparture('2026-11-01',null),'2026-10-31');
});

test('normalized records preserve independent vouchers, transfer dates and missing source amounts',()=>{
 const {load}=setup(),e=load(resolve(root,'education.ts'));e.ensureEducationExchangeCases();const n=load(resolve(root,'voucher-records.ts')),education=n.educationRecords('2026-11-03'),kg=n.kindergartenRecords('2026-11-03');assert.equal(education.length,12);assert.equal(new Set(education.map(r=>r.personId)).size,6);assert.equal(kg.length,8);
 const r=education.find(r=>r.id==='EDU-2026-0002');assert.equal(r.placements.length,2);assert.equal(r.placements[0].left,'2026-10-31');assert.equal(r.start,'2026-10-15');assert.equal(r.end,'2027-10-14');assert.equal(r.months[0].amount,null);assert.equal(kg.find(r=>r.id==='KG-2026-0003').placements.length,2);
 const f=load(resolve(root,'voucher-analysis.ts')).emptyVoucherFilters();f.monthFrom='2026-10';f.monthTo='2026-10';assert.ok(load(resolve(root,'voucher-analysis.ts')).filterVouchers(education,f,'2026-11-03').every(r=>r.months.some(m=>m.month==='2026-10')));
});
