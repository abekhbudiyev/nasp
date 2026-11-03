import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname,resolve,extname } from 'node:path'
import {test} from 'node:test'
import ts from 'typescript'
const root=dirname(fileURLToPath(import.meta.url)),native=createRequire(import.meta.url)
function setup(storage){const values=storage??new Map();globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};const cache=new Map();function load(p){if(cache.has(p))return cache.get(p).exports;const m={exports:{}};cache.set(p,m);const source=ts.transpileModule(readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const req=id=>id.startsWith('.')?(extname(id)==='.json'?JSON.parse(readFileSync(resolve(dirname(p),id),'utf8')):load(resolve(dirname(p),id+'.ts'))):native(id);new Function('exports','module','require',source)(m.exports,m,req);return m.exports}return {e:load(resolve(root,'education.ts')),load,values}}
test('calendar month duration is not a fixed 365-day substitution',()=>{const{e}=setup();assert.equal(e.annualEnd('2026-11-15'),'2027-11-14');assert.equal(e.annualEnd('2023-03-01'),'2024-02-29');assert.equal(e.workDue('2026-11-06',3),'2026-11-11')})
test('two-voucher limit includes formed and paused; plan approval is required and idempotent',()=>{const{e}=setup();assert.throws(()=>e.createRequest('CH1',1,'2026-11-03','demo'),/ikki/);e.createRequest('CH3',2,'2026-11-03','demo');const r=e.educationState.requests[0];assert.throws(()=>e.approvePlan(r.id,'2026-11-03'),/tasdiqqa/);e.submitPlan(r.id,'2026-11-03');e.approvePlan(r.id,'2026-11-04');const vs=e.educationState.vouchers.filter(v=>v.childId==='CH3');assert.equal(vs.length,2);assert.ok(vs.every(v=>v.start===null));e.approvePlan(r.id,'2026-11-04');assert.equal(e.educationState.vouchers.filter(v=>v.childId==='CH3').length,2)})
test('new issuance rechecks registry; existing vouchers survive registry exit',()=>{const{e}=setup();e.updateRegistry('CH2',false);assert.throws(()=>e.createRequest('CH2',1,'2026-11-03','demo'),/reyestr/);e.bindClub('EDU-2026-0003','C1','2026-11-03');assert.equal(e.educationState.vouchers[2].state,'active')})
test('pause excludes exit day through resume eve and preserves the second voucher',()=>{const{e}=setup();const first=e.educationState.vouchers[0],second=e.educationState.vouchers[1],secondEnd=e.expiry(second);const before=e.remaining(first,'2026-11-14');e.pauseVoucher(first.id,'2026-11-15');assert.equal(e.remaining(e.educationState.vouchers[0],'2026-11-20'),before);assert.equal(e.expiry(e.educationState.vouchers[0]),null);e.bindClub(first.id,'C1','2026-11-25');assert.equal(e.expiry(e.educationState.vouchers[0]),'2027-10-10');assert.equal(e.expiry(second),secondEnd)})
test('invalid new direction retains prior binding; valid switch preserves number and entitlement',()=>{const{e}=setup();const v=e.educationState.vouchers[0],days=v.grantDays;assert.throws(()=>e.bindClub(v.id,'C4','2026-11-03'),/yosh/);assert.equal(e.educationState.vouchers[0].clubId,'C1');e.bindClub(v.id,'C3','2026-11-03');assert.equal(e.educationState.vouchers[0].id,v.id);assert.equal(e.educationState.vouchers[0].grantDays,days);assert.equal(e.educationState.monthly[0].clubId,'C1')})
test('early cancellation replacement only receives remaining duration and cannot restart a full year',()=>{const{e}=setup();const id=e.educationState.vouchers[0].id;e.cancelVoucher(id,'2026-11-03');const old=e.educationState.vouchers.find(v=>v.id===id),remaining=e.remaining(old,old.terminal);assert.throws(()=>e.createRequest('CH1',1,'2026-11-03','demo'),/o‘rnini/);e.createRequest('CH1',1,'2026-11-03','demo',id,'replacement');const r=e.educationState.requests[0];e.submitPlan(r.id,'2026-11-03');e.approvePlan(r.id,'2026-11-04');const replacement=e.educationState.vouchers.find(v=>v.previous===id);assert.equal(replacement.grantDays,remaining);assert.ok(replacement.grantDays<365);e.bindClub(replacement.id,'C1','2026-11-05');assert.equal(e.educationState.vouchers.find(v=>v.id===replacement.id).grantDays,remaining)})
test('school event ends every unfinished voucher and prevents later ordinary binding',()=>{const{e}=setup();e.schoolEvent('CH1','private','2026-11-03');assert.ok(e.educationState.vouchers.filter(v=>v.childId==='CH1').every(v=>v.state==='ended'));assert.throws(()=>e.bindClub('EDU-2026-0001','C1','2026-11-04'),/noto‘g‘ri/)})
const source={id:'M',voucherId:'V1',month:'2026-10',planned:12,periodPlanned:12,held:12,attended:12,distance:17,clubType:'private',bhm:400000,courseBudget:640000,parentShare:160000,received:'2026-11-03'}
test('travel selection uses farther private club and never falls back when its attendance fails',()=>{const{e}=setup();const near={...source,voucherId:'NEAR',distance:12},far={...source,voucherId:'FAR',attended:8};const bad=e.transportResult([near,far],'Toshkent shahri');assert.equal(bad.voucherId,'FAR');assert.equal(bad.amount,0);assert.equal(e.transportResult([{...source,clubType:'public'},near],'Toshkent shahri').voucherId,'NEAR')})
test('travel thresholds are strict, partial month proportional, 90–99% flagged and source absence unknown',()=>{const{e}=setup();assert.equal(e.transportResult([{...source,distance:10}],'Toshkent shahri').amount,0);assert.equal(e.transportResult([{...source,distance:5}],'Samarqand').amount,0);assert.equal(e.transportResult([{...source,periodPlanned:6,attended:6}],'Toshkent shahri').amount,100000);assert.equal(e.transportResult([{...source,periodPlanned:6,attended:6}],'Samarqand').amount,150000);assert.equal(e.transportResult([{...source,attended:11}],'Toshkent shahri').state,'review');assert.equal(e.transportResult([],'Toshkent shahri').amount,null)})
test('finance absence stays null, duplicate IDs ignored and correction/refund preserve ledger',()=>{const{e}=setup();const v=e.educationState.vouchers[0].id;assert.equal(e.paidFor(v,'2026-10','course'),null);const p={id:'F1',voucherId:v,month:'2026-10',type:'course',amount:100,date:'2026-11-03'};e.financeEvent(p);e.financeEvent(p);assert.equal(e.paidFor(v,'2026-10','course'),100);e.financeEvent({...p,id:'F2',amount:90,supersedes:'F1'});assert.equal(e.paidFor(v,'2026-10','course'),90);e.financeEvent({...p,id:'REFUND',amount:-10});assert.equal(e.paidFor(v,'2026-10','course'),80)})
test('education resets on reload; catalog registration preserves old IDs and is idempotent',()=>{const{e,values,load}=setup();e.pauseVoucher('EDU-2026-0001','2026-11-03');assert.equal(setup(values).e.educationState.vouchers[0].state,'active');const integration=load(resolve(root,'education-integration.ts')),store=load(resolve(root,'prototype-store.ts'));const previous=store.catalog.find(b=>b.id===2).name,id=integration.registerEducation();assert.equal(integration.registerEducation(),id);assert.equal(store.catalog.length,151);assert.equal(store.catalog.find(b=>b.id===2).name,previous);assert.equal(store.catalog.find(b=>b.code==='EDU-VOUCHER').specNumber,2);assert.equal(store.catalog.find(b=>b.id===2).specNumber,3)})


test('education risks link to the affected child/month and respect selected rows',()=>{const{e,load}=setup();const integration=load(resolve(root,'education-integration.ts')),store=load(resolve(root,'prototype-store.ts')),domain=load(resolve(root,'domain.ts')),analytics=load(resolve(root,'analytics.ts'));const id=integration.registerEducation();e.simulateAttendance('CH1','ninety','2026-10');integration.registerEducation();const rows=domain.observations.filter(r=>r.benefitId===id);const risks=analytics.analyzeBenefits(store.catalog,rows);assert.ok(risks.some(r=>r.id==='education-attendance:CH1:2026-10'&&r.educationChildId==='CH1'&&r.educationMonth==='2026-10'));assert.ok(risks.some(r=>r.id==='education-finance:CH1:2026-10'));assert.ok(!analytics.analyzeBenefits(store.catalog,[]).some(r=>r.educationChildId));})

test('monitoring separates request and voucher stages and counts affected children once',()=>{
 const {e,load}=setup();const {educationMonitoring}=load(resolve(root,'education-monitoring.ts'))
 const m=educationMonitoring('2026-11-03','2026-10')
 assert.equal(m.stages.requests.length,0);assert.equal(m.stages.formed.length,1);assert.equal(m.stages.active.length,2)
 assert.equal(m.vouchers,3);assert.equal(m.children,2);assert.equal(m.issues.filter(i=>i.kind==='finance').length,3);assert.equal(m.affected,2)
 e.pauseVoucher('EDU-2026-0001','2026-11-03')
 const next=educationMonitoring('2026-11-03','2026-10');assert.equal(next.stages.active.length,1);assert.equal(next.stages.paused.length,1)
})
test('monitoring only flags pending deadlines after the due date and resolves them on transition',()=>{
 const {e,load}=setup();const {educationMonitoring}=load(resolve(root,'education-monitoring.ts'))
 e.createRequest('CH3',1,'2026-10-01','demo');const r=e.educationState.requests[0]
 assert.equal(educationMonitoring(r.workerDue,'2026-10').issues.filter(i=>i.kind==='deadline').length,0)
 const late=educationMonitoring('2026-11-03','2026-10').issues.find(i=>i.kind==='deadline');assert.equal(late.recordId,r.id);assert.equal(late.tab,'requests')
 e.submitPlan(r.id,'2026-11-03');assert.equal(educationMonitoring('2026-11-05','2026-10').issues.filter(i=>i.kind==='deadline').length,0)
 assert.equal(educationMonitoring('2026-11-06','2026-10').issues.filter(i=>i.kind==='deadline').length,1)
 e.approvePlan(r.id,'2026-11-06');const after=educationMonitoring('2026-11-06','2026-10');assert.equal(after.stages.requests.length,1);assert.equal(after.stages.council.length,0);assert.equal(after.stages.formed.length,2);assert.ok(!after.issues.some(i=>i.kind==='deadline'))
})
test('monitoring applies region/month independently and the unbound threshold is inclusive',()=>{
 const {e,load}=setup();const {educationMonitoring}=load(resolve(root,'education-monitoring.ts'));const region=e.educationState.children[0].region
 assert.equal(educationMonitoring('2026-10-15','2026-10','',14).issues.filter(i=>i.kind==='unbound').length,1)
 assert.equal(educationMonitoring('2026-10-15','2026-10','',15).issues.filter(i=>i.kind==='unbound').length,0)
 const local=educationMonitoring('2026-11-03','2026-09',region);assert.equal(local.vouchers,2);assert.ok(!local.issues.some(i=>i.kind==='finance'));assert.ok(local.issues.every(i=>i.region===region))
 assert.equal(educationMonitoring('invalid','2026-10').valid,false);assert.equal(educationMonitoring('2026-11-03','2026-13').valid,false)
})
test('monitoring distinguishes attendance, unknown finance, matched payments and correction differences',()=>{
 const {e,load}=setup();const {educationMonitoring}=load(resolve(root,'education-monitoring.ts'));const id='EDU-2026-0001'
 e.simulateAttendance('CH1','ninety');let m=educationMonitoring('2026-11-03','2026-10');assert.ok(m.issues.filter(i=>i.kind==='attendance').every(i=>i.tone==='warning'))
 e.simulateAttendance('CH1','missed');m=educationMonitoring('2026-11-03','2026-10');assert.ok(m.issues.some(i=>i.kind==='attendance'&&i.tone==='danger'))
 e.simulateAttendance('CH1','full');e.financeEvent({id:'MON-F1',voucherId:id,month:'2026-10',type:'course',amount:640000,date:'2026-11-03'})
 m=educationMonitoring('2026-11-03','2026-10');assert.ok(!m.issues.some(i=>i.reference===id&&i.id.startsWith('finance-course:')))
 e.financeEvent({id:'MON-F2',supersedes:'MON-F1',voucherId:id,month:'2026-10',type:'course',amount:630000,date:'2026-11-03'})
 const diff=educationMonitoring('2026-11-03','2026-10').issues.find(i=>i.id.startsWith('difference-course:'));assert.equal(diff.month,'2026-10');assert.equal(diff.childId,'CH1');assert.equal(diff.tab,'finance')
})

test('sample cases preserve session edits but reset after reload',()=>{
 const {e,values}=setup();const baseline=JSON.stringify(e.educationState.vouchers);assert.equal(e.ensureEducationCases(),9)
 assert.equal(e.educationState.children.length,13);assert.equal(e.educationState.requests.length,9)
 assert.equal(JSON.stringify(e.educationState.vouchers.slice(0,3)),baseline)
 e.pauseVoucher('EDU-CASE-success-1','2026-11-03');const count=e.educationState.vouchers.length
 assert.equal(e.ensureEducationCases(),0);assert.equal(e.educationState.vouchers.length,count)
 assert.equal(e.educationState.vouchers.find(v=>v.id==='EDU-CASE-success-1').state,'paused')
 const fresh=setup(values).e;assert.equal(fresh.ensureEducationCases(),9);assert.equal(fresh.educationState.vouchers.find(v=>v.id==='EDU-CASE-success-1').state,'active')
 assert.equal(new Set(fresh.educationState.children.map(c=>c.personId)).size,13)
})
test('sample cases demonstrate valid plan stages, two-voucher limit and independent paused duration',()=>{
 const {e}=setup();e.ensureEducationCases()
 assert.equal(e.educationState.requests.find(r=>r.id==='REQ-CASE-new').state,'new')
 assert.equal(e.educationState.requests.find(r=>r.id==='REQ-CASE-approval').councilDue,'2026-11-02')
 assert.equal(e.educationState.vouchers.find(v=>v.id==='EDU-CASE-unbound-1').start,null)
 for(const c of e.educationState.children)assert.ok(e.educationState.vouchers.filter(v=>v.childId===c.id&&['formed','active','paused'].includes(v.state)).length<=2)
 const paused=e.educationState.vouchers.find(v=>v.id==='EDU-CASE-paused-1');assert.equal(e.remaining(paused,'2026-11-03'),e.remaining(paused,'2026-10-15'));assert.equal(e.expiry(paused),null)
})
test('sample finance and attendance outcomes match their descriptions without fabricated zero payments',()=>{
 const {e,load}=setup();e.ensureEducationCases();const {educationMonitoring}=load(resolve(root,'education-monitoring.ts'))
 function records(id){return e.educationState.monthly.filter(m=>m.voucherId.startsWith('EDU-CASE-'+id+'-'))}
 const child=e.educationState.children.find(c=>c.id==='CASE-success'),full=records('success'),travel=e.transportResult(full,child.region)
 assert.equal(full.length,2);assert.equal(e.paidFor(travel.voucherId,'2026-10','travel'),travel.amount)
 for(const m of full)assert.equal(e.paidFor(m.voucherId,m.month,'course'),m.courseBudget)
 assert.equal(e.transportResult(records('attendance'),child.region).amount,0)
 assert.equal(e.transportResult(records('review'),child.region).state,'review')
 assert.equal(e.paidFor('EDU-CASE-missing-1','2026-10','course'),null)
 const diff=records('difference')[0];assert.equal(diff.courseBudget-e.paidFor(diff.voucherId,diff.month,'course'),10000)
 const issues=educationMonitoring('2026-11-03','2026-10').issues;assert.ok(!issues.some(i=>i.childId==='CASE-success'));assert.ok(issues.some(i=>i.childId==='CASE-approval'&&i.kind==='deadline'))
 const count=e.educationState.payments.length;const existing=e.educationState.payments.find(p=>p.id==='FIN-EDU-CASE-success-1-2026-10-course');e.financeEvent({...existing});assert.equal(e.educationState.payments.length,count)
})
test('education discards old local snapshots and works without browser persistence',()=>{
 const values=new Map([['sb-education-v1',JSON.stringify({requests:[{id:'OLD'}]})],['unrelated-key','keep']]);const {e}=setup(values)
 assert.equal(values.has('sb-education-v1'),false);assert.equal(values.get('unrelated-key'),'keep')
 globalThis.localStorage.setItem=()=>{throw Error('must not write')};assert.equal(e.ensureEducationCases(),9)
 e.pauseVoucher('EDU-CASE-success-1','2026-11-03');assert.equal(e.educationState.vouchers.find(v=>v.id==='EDU-CASE-success-1').state,'paused')
 const fresh=setup(values).e;fresh.ensureEducationCases();assert.equal(fresh.educationState.vouchers.find(v=>v.id==='EDU-CASE-success-1').state,'active')
 assert.ok(!fresh.educationState.sourceLog.some(row=>row.includes('FIN-EDU-CASE-success-1')))
})

test('ministry exchange creates waiting vouchers from approved plans and activation starts an annual term',()=>{
 const {e}=setup(),p={id:'PLAN-EXT',childId:'CH3',approved:'2026-10-01',received:'2026-10-02'}
 const before=JSON.stringify(e.educationState);assert.throws(()=>e.receiveApprovedEducationPlan({...p,received:'2026-09-30'}));assert.equal(JSON.stringify(e.educationState),before)
 e.receiveApprovedEducationPlan(p);e.receiveApprovedEducationPlan(p);const vs=e.educationState.vouchers.filter(v=>v.requestId===p.id);assert.equal(vs.length,2)
 for(const v of vs){assert.equal(e.educationVoucherStatus(v),'Kutilmoqda');assert.equal(v.notified,p.received);assert.equal(v.start,null)}
 const act={id:'MIN-ACT',voucherId:vs[0].id,clubId:'C1',subjectId:'programming',date:'2026-10-05'};e.receiveEducationActivation(act);e.receiveEducationActivation(act)
 const v=e.educationState.vouchers.find(v=>v.id===act.voucherId);assert.equal(v.start,act.date);assert.equal(e.expiry(v),'2027-10-04');assert.equal(e.educationVoucherStatus(v),'Faollashtirilgan')
 assert.throws(()=>e.receiveEducationActivation({...act,id:'DIFFERENT',date:'2026-10-06'}))
 const waiting=e.educationState.vouchers.find(v=>v.id===vs[1].id);assert.equal(waiting.start,null);assert.equal(e.expiry(waiting),null);assert.equal(waiting.subjectSlot,2)
 e.receiveEducationActivation({id:'MIN-ACT-SECOND',voucherId:waiting.id,clubId:'C2',subjectId:'english',date:'2026-11-01'})
 const first=e.educationState.vouchers.find(v=>v.id===act.voucherId),second=e.educationState.vouchers.find(v=>v.id===waiting.id)
 assert.equal(first.start,'2026-10-05');assert.equal(e.expiry(first),'2027-10-04');assert.equal(second.start,'2026-11-01');assert.equal(e.expiry(second),'2027-10-31')
 assert.equal(e.paidFor(second.id,'2026-10','course'),null)
})

test('ministry monthly payments preserve missing and zero, reject invalid periods and replace corrections once',()=>{
 const {e}=setup();e.ensureEducationExchangeCases();const id='EDU-2026-0001',p={id:'MIN-CORR',voucherId:id,month:'2026-10',type:'course',amount:630000,date:'2026-11-04'}
 e.receiveEducationMonthlyPayment(p);e.receiveEducationMonthlyPayment(p);assert.equal(e.paidFor(id,p.month,'course'),630000)
 assert.throws(()=>e.receiveEducationMonthlyPayment({...p,id:'NEG',amount:-1}));assert.throws(()=>e.receiveEducationMonthlyPayment({...p,id:'BEFORE',month:'2026-09'}))
 assert.throws(()=>e.receiveEducationMonthlyPayment({...p,id:'WAITING',voucherId:'EDU-2026-0003'}))
 e.receiveEducationMonthlyPayment({...p,id:'ZERO',month:'2026-11',amount:0,date:'2026-12-03'});assert.equal(e.paidFor(id,'2026-11','course'),0);assert.equal(e.paidFor(id,'2026-12','course'),null)
})

test('exchange demo covers every status and multiple vouchers per child, preserving session state only',()=>{
 const {e,values}=setup();e.ensureEducationExchangeCases();assert.equal(e.educationState.vouchers.length,12);assert.equal(e.educationState.requests.length,0)
 const counts=e.educationState.vouchers.map(v=>e.educationVoucherStatus(v));assert.equal(counts.filter(s=>s==='Kutilmoqda').length,5);assert.equal(counts.filter(s=>s==='Faollashtirilgan').length,3);assert.equal(counts.filter(s=>s==='Muddati yakunlangan').length,4)
 const ended=e.educationState.vouchers.filter(v=>e.educationVoucherStatus(v)==='Muddati yakunlangan');assert.equal(e.educationVoucherUsage(ended[0]).percent,100);assert.equal(e.educationVoucherUsage(ended.find(v=>v.childId==='EDU-SOURCE-END-PARTIAL')).percent,67);assert.ok(e.educationState.vouchers.every(v=>v.notified===v.created));for(const child of e.educationState.children){const pair=e.educationState.vouchers.filter(v=>v.childId===child.id);assert.equal(pair.length,2);assert.deepEqual(pair.map(v=>v.subjectSlot),[1,2]);assert.equal(pair[0].requestId,pair[1].requestId)}
 const before=JSON.stringify(e.educationState);e.ensureEducationExchangeCases();assert.equal(JSON.stringify(e.educationState),before)
 const fresh=setup(values).e;fresh.ensureEducationExchangeCases();assert.equal(fresh.paidFor('EDU-2026-0001','2026-10','course'),640000)
})

test('a second voucher cannot activate for the same subject even at another organization',()=>{
 const {e}=setup();e.receiveApprovedEducationPlan({id:'PLAN-SUBJECT',childId:'CH3',approved:'2026-10-01',received:'2026-10-01'});const pair=e.educationState.vouchers.filter(v=>v.requestId==='PLAN-SUBJECT');
 e.receiveEducationActivation({id:'SUBJECT-1',voucherId:pair[0].id,clubId:'C2',subjectId:'english',date:'2026-10-05'});
 const second={id:'SUBJECT-2',voucherId:pair[1].id,clubId:'C3',subjectId:'english',date:'2026-10-15'},before=JSON.stringify(e.educationState);
 assert.throws(()=>e.receiveEducationActivation(second),/fan bo‘yicha vaucher allaqachon/);assert.equal(JSON.stringify(e.educationState),before);
 assert.throws(()=>e.receiveEducationActivation({...second,subjectId:'unknown'}));assert.throws(()=>e.receiveEducationActivation({...second,subjectId:'programming'}));assert.equal(JSON.stringify(e.educationState),before);
 e.receiveEducationActivation({...second,clubId:'C2',subjectId:'russian'});const first=e.educationState.vouchers.find(v=>v.id===pair[0].id),last=e.educationState.vouchers.find(v=>v.id===pair[1].id);
 assert.equal(first.subjectId,'english');assert.equal(last.subjectId,'russian');assert.equal(first.start,'2026-10-05');assert.equal(last.start,'2026-10-15');assert.equal(e.expiry(last),'2027-10-14');
 assert.throws(()=>e.receiveEducationActivation({id:'SUBJECT-1',voucherId:first.id,clubId:'C2',subjectId:'russian',date:'2026-10-05'}),/mos emas/)
})

test('organization and subject transfers preserve voucher term, payments and enforce overlapping subject exclusion',()=>{
 const {e}=setup();e.ensureEducationExchangeCases();let v=e.educationState.vouchers.find(v=>v.id==='EDU-2026-0001');const start=v.start,end=e.expiry(v),paid=e.paidFor(v.id,'2026-10','course');
 assert.throws(()=>e.receiveEducationTransfer({eventId:'OVERLAP',voucherId:v.id,clubId:'C2',subjectId:'english',entered:'2026-10-25'}),/fan band/);
 const p={eventId:'MOVE-1',voucherId:v.id,clubId:'C2',subjectId:'english',entered:'2026-11-02'};e.receiveEducationTransfer(p);e.receiveEducationTransfer(p);
 v=e.educationState.vouchers.find(v=>v.id===p.voucherId);assert.equal(v.start,start);assert.equal(e.expiry(v),end);assert.equal(e.paidFor(v.id,'2026-10','course'),paid);assert.equal(e.educationPlacements(v).length,2);assert.equal(v.subjectId,'english');
 const before=JSON.stringify(e.educationState);assert.throws(()=>e.receiveEducationTransfer({...p,eventId:'BLOCK',subjectId:'mathematics',clubId:'C3',entered:'2026-11-03'}),/fan band/);assert.equal(JSON.stringify(e.educationState),before);
 assert.throws(()=>e.receiveEducationTransfer({...p,eventId:'OLD',entered:'2026-10-10'}));assert.throws(()=>e.receiveEducationTransfer({...p,eventId:'LATE',subjectId:'russian',entered:'2027-10-01'}));assert.throws(()=>e.receiveEducationTransfer({...p,subjectId:'russian'}));

});

test('organization-only and subject-only changes keep the original annual term',()=>{
 const {e}=setup();e.ensureEducationExchangeCases();const id='EDU-2026-0005',get=()=>e.educationState.vouchers.find(v=>v.id===id),start=get().start,end=e.expiry(get());
 e.receiveEducationTransfer({eventId:'FAN-ONLY',voucherId:id,clubId:'C1',subjectId:'mathematics',entered:'2026-10-25'});
 e.receiveEducationTransfer({eventId:'ORG-ONLY',voucherId:id,clubId:'C3',subjectId:'mathematics',entered:'2026-11-01'});
 assert.equal(get().start,start);assert.equal(e.expiry(get()),end);assert.equal(e.educationPlacements(get()).length,3);assert.equal(get().subjectId,'mathematics');assert.equal(get().clubId,'C3');
 e.receiveEducationActivation({id:'MIN-ACT-MIXED',voucherId:id,clubId:'C1',subjectId:'programming',date:start});assert.equal(get().clubId,'C3');
});
