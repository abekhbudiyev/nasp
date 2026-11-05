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

test('income savings use the latest confirmed closed month per person and the frozen issuance income',()=>{
 const {load}=setup(),i=load(resolve(root,'voucher-income.ts')),r=record();r.income={atIssue:500,latest:900,householdMembers:4,issueDate:r.created,checkedAt:'2026-11-01',source:'sample'};
 r.months=[{month:'2026-09',amount:200,travel:40},{month:'2026-10',amount:100,travel:20},{month:'2026-11',amount:800,travel:100}];let s=i.voucherSavings(r,'2026-11-03');assert.equal(s.month,'2026-10');assert.equal(s.total,100);assert.equal(s.perPerson,25);assert.equal(s.percent,5);
 r.income.latest=1000;assert.equal(i.voucherSavings(r,'2026-11-03').percent,5);r.months[1].amount=0;assert.equal(i.voucherSavings(r,'2026-11-03').perPerson,0);assert.equal(i.voucherSavings(r,'2026-11-03').percent,0);
});
test('unknown payment or family size remains unknown and zero issuance income has no percentage',()=>{
 const {load}=setup(),i=load(resolve(root,'voucher-income.ts')),r=record();r.income={atIssue:0,latest:null,householdMembers:4,issueDate:r.created,checkedAt:null,source:'sample'};assert.equal(i.voucherSavings(r,'2026-11-03').percent,null);r.income.householdMembers=null;assert.equal(i.voucherSavings(r,'2026-11-03').perPerson,null);r.income.householdMembers=4;r.months[0].amount=null;assert.equal(i.voucherSavings(r,'2026-11-03').total,null);r.start=null;r.months=[];assert.equal(i.voucherSavings(r,'2026-11-03').total,0);
});
test('paired vouchers share income snapshots but retain separate service savings and report actual payment months',()=>{
 const {load}=setup(),e=load(resolve(root,'education.ts'));e.ensureEducationExchangeCases();const n=load(resolve(root,'voucher-records.ts')),i=load(resolve(root,'voucher-income.ts')),rows=n.educationRecords('2026-11-03'),pair=rows.filter(r=>r.planId==='PLAN-SOURCE-CH1');assert.deepEqual(pair[0].income,pair[1].income);assert.ok(i.voucherSavings(pair[0],'2026-11-03').perPerson>0);assert.equal(i.voucherSavings(pair[1],'2026-11-03').perPerson,null);
 const kg=n.kindergartenRecords('2026-11-03').find(r=>r.id==='KG-2026-0003'),s=i.voucherSavings(kg,'2026-11-03');assert.equal(s.perPerson,47500);assert.equal(s.percent,7.3);assert.equal(kg.income.issueDate,'2026-10-01');assert.equal(kg.placements.length,2);assert.equal(i.voucherIncomeExport(kg,'2026-11-03')['Iqtisod oyi'],'2026-10');
});

test('income change compares against issuance income, preserves signs, and rejects missing or zero baselines',()=>{
 const {load}=setup(),i=load(resolve(root,'voucher-income.ts')),income={atIssue:650000,latest:820000,householdMembers:4,issueDate:'2026-10-01',checkedAt:'2026-11-01',source:'sample'};
 assert.equal(i.voucherIncomeChange(income),26.2);assert.equal(i.voucherIncomeChange({...income,atIssue:720000,latest:680000}),-5.6);assert.equal(i.voucherIncomeChange({...income,latest:650000}),0);assert.equal(i.voucherIncomeChange({...income,latest:0}),-100);
 for(const invalid of [undefined,{...income,atIssue:0},{...income,latest:null},{...income,atIssue:null}])assert.equal(i.voucherIncomeChange(invalid),null);
 const r=record();r.income=income;assert.equal(i.voucherIncomeExport(r,'2026-11-03')['Daromad ozgarishi %'],26.2);
});

test('family savings combine kindergarten and education for two children without double-counting vouchers or family members',()=>{
 const {load}=setup(),n=load(resolve(root,'voucher-records.ts')),all=n.allVoucherRecords('2026-11-03'),kg=all.find(r=>r.id==='KG-2026-0003'),ed=all.find(r=>r.id==='EDU-2026-0001'),f=kg.familySavings;
 assert.equal(kg.income.familyId,ed.income.familyId);assert.deepEqual(f,ed.familySavings);assert.equal(f.month,'2026-10');assert.equal(f.children,2);assert.equal(f.vouchers,3);assert.equal(f.knownTotal,830000);assert.equal(f.members,4);assert.equal(f.perPerson,207500);assert.equal(f.percent,31.9);assert.equal(f.missing,1);assert.equal(f.items.length,3);
 assert.equal(load(resolve(root,'voucher-income.ts')).voucherSavings(kg,'2026-11-03').perPerson,47500);
 assert.ok(!f.items.some(r=>r.voucherId==='EDU-2026-0003'));
});
test('family totals use one shared month and deduplicate repeated voucher rows across views and transfers',()=>{
 const {load}=setup(),i=load(resolve(root,'voucher-income.ts')),one=record('KG1','CHILD1'),two=record('ED1','CHILD2');one.service='kindergarten';two.service='education';for(const r of [one,two])r.income={atIssue:500,latest:800,householdMembers:4,familyId:'F1',issueDate:r.created,checkedAt:'2026-11-01',source:'sample'};
 one.months=[{month:'2026-10',amount:100,travel:null}];two.months=[{month:'2026-09',amount:1000,travel:200},{month:'2026-10',amount:300,travel:100},{month:'2026-11',amount:900,travel:100}];let f=i.familyVoucherSavings([one,two,one,two],'2026-11-03').get('F1');assert.equal(f.knownTotal,400);assert.equal(f.perPerson,100);assert.equal(f.percent,20);assert.equal(f.children,2);assert.equal(f.vouchers,2);assert.equal(f.missing,0);
 two.months[1].amount=null;f=i.familyVoucherSavings([one,two],'2026-11-03').get('F1');assert.equal(f.knownTotal,100);assert.equal(f.missing,1);assert.equal(f.month,'2026-10');assert.equal(f.percent,5);
});
test('family totals keep unknown payment data and inconsistent household sizes explicit',()=>{
 const {load}=setup(),i=load(resolve(root,'voucher-income.ts')),one=record('KG1','CHILD1'),two=record('ED1','CHILD2');for(const r of [one,two]){r.income={atIssue:500,latest:800,householdMembers:4,familyId:'F1',issueDate:r.created,source:'sample'};r.months=[{month:'2026-10',amount:null,travel:null}]}
 let f=i.familyVoucherSavings([one,two],'2026-11-03').get('F1');assert.equal(f.knownTotal,null);assert.equal(f.perPerson,null);assert.equal(f.percent,null);assert.equal(f.missing,2);
 one.months[0].amount=100;one.months[0].received='2026-11-10';assert.equal(i.familyVoucherSavings([one,two],'2026-11-03').get('F1').knownTotal,null);
 one.months[0].received='2026-11-03';two.income.householdMembers=5;f=i.familyVoucherSavings([one,two],'2026-11-03').get('F1');assert.equal(f.knownTotal,100);assert.equal(f.members,null);assert.equal(f.perPerson,null);
});

test('analytical metrics keep missing months distinct from confirmed zero and deduplicate voucher and person counts',()=>{
 const {load}=setup(),v=load(resolve(root,'voucher-insights.ts')),one=record(),two=record('V2');two.months[0].amount=null;const m=v.voucherMetrics([one,two,one],'2026-11-03');assert.equal(m.vouchers,2);assert.equal(m.children,1);assert.equal(m.expected,2);assert.equal(m.reported,1);assert.equal(m.missingMonths,1);assert.equal(m.coverage,50);assert.equal(m.usage,100);assert.equal(m.amount,100);
 one.months[0].amount=0;const zero=v.voucherMetrics([one],'2026-11-03');assert.equal(zero.usage,0);assert.equal(zero.zeroMonths,1);assert.equal(zero.coverage,100);
});
test('two-level reports retain parent totals and distinct counts without adding child rows again',()=>{
 const {load}=setup(),v=load(resolve(root,'voucher-insights.ts')),one=record(),two=record('V2','P2');two.status='Muddati yakunlangan';const groups=v.detailedVoucherReport([one,two],'region','status','2026-11-03'),parents=groups.filter(g=>g.level===0),children=groups.filter(g=>g.level===1);assert.equal(parents.length,1);assert.equal(children.length,2);assert.equal(parents[0].metrics.amount,200);assert.equal(children.reduce((n,g)=>n+g.metrics.amount,0),200);assert.equal(parents[0].metrics.vouchers,2);assert.ok(children.every(g=>g.parent==='New region'));
});
test('monthly analysis excludes future months and distinguishes current-month reports from closed-month coverage',()=>{
 const {load}=setup(),v=load(resolve(root,'voucher-insights.ts')),r=record();r.months[0].amount=0;const x=v.voucherInsights([r],'2026-11-03');assert.equal(x.trend.length,2);assert.equal(x.trend.find(t=>t.month==='2026-10').amount,0);assert.equal(x.trend.find(t=>t.month==='2026-11').amount,null);assert.equal(x.trend.find(t=>t.month==='2026-11').coverage,null);assert.equal(x.risks.find(t=>t.name==='Nol to‘lov qayd etilgan').ids.length,1);
});
test('service analytics identify paired vouchers and count shared family economics only once across siblings',()=>{
 const {load}=setup(),n=load(resolve(root,'voucher-records.ts')),v=load(resolve(root,'voucher-insights.ts')),a=load(resolve(root,'voucher-analysis.ts')),all=n.allVoucherRecords('2026-11-03'),education=all.filter(r=>r.service==='education'),x=v.voucherInsights(education,'2026-11-03',a.emptyVoucherFilters(),all);assert.equal(x.pairGroups[0].children,1);assert.equal(x.pairGroups[1].children,1);assert.equal(x.pairGroups[2].children,2);assert.equal(x.pairGroups[3].children,2);assert.equal(x.family.items.filter(f=>f.familyId==='DEMO-FAMILY-001').length,1);assert.equal(x.family.items.find(f=>f.familyId==='DEMO-FAMILY-001').knownTotal,830000);
 const f=a.emptyVoucherFilters();f.monthTo='2025-11';f.monthFrom='2025-11';const old=v.voucherInsights(education.filter(r=>r.months.some(m=>m.month==='2025-11')),'2026-11-03',f,all);assert.equal(old.family.month,'2025-11');assert.ok(old.family.items.length>0);assert.ok(old.family.items.every(g=>g.month==='2025-11'));
});

test('detail profiles share family identity and locations while distance stays geometric',()=>{
 const {load}=setup(),n=load(resolve(root,'voucher-records.ts')),p=load(resolve(root,'voucher-profile.ts')),rows=n.allVoucherRecords('2026-11-03');
 const ed=rows.find(r=>r.id==='EDU-2026-0002'),kg=rows.find(r=>r.id==='KG-2026-0003');
 assert.deepEqual(ed.profile.guardian,kg.profile.guardian);assert.deepEqual(ed.profile.home,kg.profile.home);
 assert.equal(ed.profile.guardian.pinfl.length,14);assert.ok(ed.profile.registryDate<ed.created);
 const old=p.organizationLocation(ed.placements[0].inn,ed.placements[0].region,ed.placements[0].district),current=p.organizationLocation(ed.placements[1].inn,ed.placements[1].region,ed.placements[1].district);
 assert.notDeepEqual(old,current);assert.equal(p.straightLineKm(old,old),0);assert.equal(p.straightLineKm(undefined,current),null);assert.equal(p.organizationLocation('','Unknown',''),null);assert.ok(p.straightLineKm(ed.profile.home,current)>100);
 assert.equal(p.straightLineKm(old,current),p.straightLineKm(current,old));assert.equal(p.straightLineKm({...old,lat:91},current),null);
 const waiting=rows.find(r=>r.status==='Kutilmoqda');assert.equal(p.voucherProfileExport(waiting)['Togri chiziq masofa km'],null);assert.equal(p.voucherProfileExport(ed)['Vakil JSHSHIR'],ed.profile.guardian.pinfl);
});
