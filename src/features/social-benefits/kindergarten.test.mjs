import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname,resolve,extname } from 'node:path'
import {test} from 'node:test'
import ts from 'typescript'
const root=dirname(fileURLToPath(import.meta.url)),native=createRequire(import.meta.url)
function setup(storage){const values=storage??new Map();globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};const cache=new Map();function load(p){if(cache.has(p))return cache.get(p).exports;const m={exports:{}};cache.set(p,m);const source=ts.transpileModule(readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const req=id=>id.startsWith('.')?(extname(id)==='.json'?JSON.parse(readFileSync(resolve(dirname(p),id),'utf8')):load(resolve(dirname(p),id+'.ts'))):native(id);new Function('exports','module','require',source)(m.exports,m,req);return m.exports}return {k:load(resolve(root,'kindergarten.ts')),load,values}}
test('external plan receipt automatically creates one waiting voucher and initial registry contains no plans without vouchers',()=>{
 const {k}=setup();assert.equal(k.kindergartenState.vouchers.length,8)
 for(const p of k.kindergartenState.plans)assert.equal(k.kindergartenState.vouchers.filter(v=>v.planId===p.id).length,1)
 const incoming={...k.kindergartenState.plans[0],id:'IR-KG-INCOMING'}
 const before=JSON.stringify(k.kindergartenState)
 assert.throws(()=>k.receiveKindergartenPlan(incoming,'2026-09-30'));assert.equal(JSON.stringify(k.kindergartenState),before)
 const id=k.receiveKindergartenPlan(incoming,'2026-11-03'),v=k.kindergartenState.vouchers.find(v=>v.id===id)
 assert.ok(v.documentNumber);assert.equal(v.created,'2026-11-03');assert.equal(v.notified,v.created);assert.equal(v.activated,null);assert.equal(v.end,null);assert.equal(v.organization,null)
 assert.equal(k.receiveKindergartenPlan(incoming,'2026-11-04'),id)
 assert.equal(k.kindergartenState.vouchers.filter(v=>v.planId===incoming.id).length,1)
 assert.equal(k.kindergartenState.plans.filter(p=>p.id===incoming.id).length,1)
})

test('all vouchers are already notified on creation and can receive admission without an operator action',()=>{
 const {k}=setup();for(const v of k.kindergartenState.vouchers)assert.equal(v.notified,v.created)
 const incoming={...k.kindergartenState.plans[0],id:'IR-KG-INCOMING'},id=k.receiveKindergartenPlan(incoming,'2026-11-03'),v=k.kindergartenState.vouchers.find(v=>v.id===id),history=v.history.length;
 assert.equal(v.notified,'2026-11-03');assert.ok(v.history.some(line=>line.includes('avtomatik xabar')))
 assert.equal(k.receiveKindergartenPlan(incoming,'2026-11-04'),id);assert.equal(v.history.length,history)
 assert.throws(()=>k.receiveKindergartenAdmission(id,'EARLY','2026-11-01','MTT','2026-11-02'))
 k.receiveKindergartenAdmission(id,'A1','2026-11-01','MTT','2026-11-03');assert.equal(v.activated,'2026-11-03')
})

test('one calendar year starts at activation, separately from admission and technical retries',()=>{
 const {k}=setup();const id='KG-2026-0002'
 k.receiveKindergartenAdmission(id,'ADM-TEST','2026-10-05','7-DMTT','2026-10-10')
 const v=k.kindergartenState.vouchers.find(v=>v.id===id)
 assert.equal(v.accepted,'2026-10-05');assert.equal(v.activated,'2026-10-10');assert.equal(v.end,'2027-10-09')
 k.receiveKindergartenAdmission(id,'ADM-TEST','2026-10-05','7-DMTT','2026-10-12');assert.equal(v.activated,'2026-10-10')
 assert.throws(()=>k.receiveKindergartenAdmission(id,'ADM-OTHER','2026-10-05','7-DMTT','2026-10-12'))
})
test('invalid admission leaves the voucher unchanged and no term is inferred from issue date',()=>{
 const {k}=setup();const id='KG-2026-0002',before=JSON.stringify(k.kindergartenState.vouchers)
 assert.throws(()=>k.receiveKindergartenAdmission(id,'BAD','2026-11-04','MTT','2026-11-03'))
 assert.throws(()=>k.receiveKindergartenAdmission(id,'BAD','2026-11-01','','2026-11-03'))
 assert.equal(JSON.stringify(k.kindergartenState.vouchers),before)
})
test('monitoring distinguishes missing reports and confirmed zero and includes each covered calendar month',()=>{
 const {k}=setup();const paid=k.kindergartenState.vouchers.find(v=>v.id==='KG-2026-0003'),unknown=k.kindergartenState.vouchers.find(v=>v.id==='KG-2026-0004'),zero=k.kindergartenState.vouchers.find(v=>v.id==='KG-2026-0005')
 assert.equal(k.kindergartenMonths(paid).length,13)
 assert.equal(k.kindergartenMonths(paid)[0].amount,190000)
 assert.equal(k.kindergartenMonths(unknown)[0].amount,null)
 assert.equal(k.kindergartenMonths(zero)[0].amount,0)
 assert.deepEqual(k.kindergartenMonths(k.kindergartenState.vouchers[0]),[])
})
test('monthly source messages deduplicate; corrected month replaces displayed value without summing copies',()=>{
 const {k}=setup();const p={id:'PAY-TEST',voucherId:'KG-2026-0003',month:'2026-10',attendance:18,amount:171000,received:'2026-11-04'}
 k.receiveKindergartenPayment(p);k.receiveKindergartenPayment(p)
 assert.equal(k.kindergartenState.payments.filter(m=>m.id===p.id).length,1)
 assert.equal(k.kindergartenMonths(k.kindergartenState.vouchers.find(v=>v.id===p.voucherId))[0].amount,171000)
 assert.throws(()=>k.receiveKindergartenPayment({...p,id:'LATE',received:'2026-11-03'}))
 assert.throws(()=>k.receiveKindergartenPayment({...p,id:'BAD',amount:-1}))
 assert.throws(()=>k.receiveKindergartenPayment({...p,id:'BAD',attendance:32}))
 assert.throws(()=>k.receiveKindergartenPayment({...p,id:'BAD',month:'2026-09'}))
 assert.throws(()=>k.receiveKindergartenPayment({...p,id:'BAD',voucherId:'KG-2026-0002'}))
})
test('kindergarten workflow resets after a fresh page session',()=>{
 const {k,values}=setup();k.receiveKindergartenPlan({...k.kindergartenState.plans[0],id:'IR-KG-INCOMING'},'2026-11-03');assert.equal(k.kindergartenState.vouchers.length,9)
 assert.equal(values.size,0);const fresh=setup(values).k;assert.equal(fresh.kindergartenState.vouchers.length,8)
 assert.ok(!fresh.kindergartenState.vouchers.some(v=>v.planId==='IR-KG-INCOMING'))
})

test('registry usage sums latest monthly payments and distinguishes unknown, zero and used months',()=>{
 const {k}=setup(),find=id=>k.kindergartenState.vouchers.find(v=>v.id===id)
 assert.deepEqual(k.kindergartenUsage(undefined),{amount:null,used:0,total:0,percent:0})
 assert.deepEqual(k.kindergartenUsage(find('KG-2026-0004')),{amount:null,used:0,total:13,percent:0})
 assert.deepEqual(k.kindergartenUsage(find('KG-2026-0005')),{amount:0,used:0,total:13,percent:0})
 const v=find('KG-2026-0003');assert.deepEqual(k.kindergartenUsage(v),{amount:190000,used:1,total:13,percent:8})
 k.receiveKindergartenPayment({id:'REVISED',voucherId:v.id,month:'2026-10',attendance:18,amount:171000,received:'2026-11-04'})
 assert.equal(k.kindergartenUsage(v).amount,171000);assert.equal(k.kindergartenUsage(v).used,1)
})

test('admission stores organization location and INN, rejecting invalid metadata without activation',()=>{
 const {k}=setup(),id='KG-2026-0002',v=k.kindergartenState.vouchers.find(v=>v.id===id)
 assert.throws(()=>k.receiveKindergartenAdmission(id,'BAD-META','2026-10-05','7-DMTT','2026-10-10',{inn:'12',region:'Toshkent',district:'Tuman'}))
 assert.equal(v.activated,null)
 k.receiveKindergartenAdmission(id,'GOOD-META','2026-10-05','7-DMTT','2026-10-10',{inn:'000000107',region:'Toshkent',district:'Tuman'})
 assert.equal(v.organizationInn,'000000107');assert.equal(v.region,'Toshkent');assert.equal(v.district,'Tuman')
})

test('demo registry covers waiting, active and expired vouchers with full and partial usage',()=>{
 const {k}=setup(),rows=k.kindergartenState.vouchers,date='2026-11-03';
 assert.equal(rows.filter(v=>!v.activated).length,3)
 assert.equal(rows.filter(v=>v.activated&&v.end>=date).length,3)
 const ended=rows.filter(v=>v.activated&&v.end<date);assert.equal(ended.length,2)
 assert.equal(k.kindergartenUsage(ended[0]).percent,100);assert.equal(k.kindergartenUsage(ended[0]).total,12)
 assert.equal(k.kindergartenUsage(ended[1]).used,8);assert.equal(k.kindergartenUsage(ended[1]).percent,67)
 for(const v of ended){assert.equal(k.kindergartenMonths(v).length,12);assert.ok(k.kindergartenMonths(v).every(m=>m.amount!==null));assert.equal(v.end,'2026-09-30')}
})

test('kindergarten organization transfers retain original activation, expiry and payment ledger',()=>{
 const {k}=setup();const v=k.kindergartenState.vouchers.find(v=>v.id==='KG-2026-0003'),start=v.activated,end=v.end,payments=JSON.stringify(k.kindergartenState.payments);
 const p={eventId:'KG-MOVE-2',voucherId:v.id,organization:'15-DMTT',inn:'000000115',region:'Toshkent shahri',district:'Yunusobod tumani',entered:'2026-11-02'};k.receiveKindergartenTransfer(p);k.receiveKindergartenTransfer(p);
 assert.equal(v.activated,start);assert.equal(v.end,end);assert.equal(v.organization,'15-DMTT');assert.equal(k.kindergartenPlacements(v).length,3);assert.equal(JSON.stringify(k.kindergartenState.payments),payments);
 const before=JSON.stringify(k.kindergartenState);assert.throws(()=>k.receiveKindergartenTransfer({...p,eventId:'BACK',entered:'2026-10-20'}));assert.throws(()=>k.receiveKindergartenTransfer({...p,eventId:'LATE',entered:'2027-10-05'}));assert.throws(()=>k.receiveKindergartenTransfer({...p,organization:'Changed'}));assert.throws(()=>k.receiveKindergartenTransfer({...p,eventId:'WAIT',voucherId:'KG-2026-0001'}));assert.equal(JSON.stringify(k.kindergartenState),before);
});
