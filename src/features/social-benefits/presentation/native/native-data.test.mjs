import {test} from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
const read=name=>fs.readFileSync(new URL(name,import.meta.url),'utf8')
const data=JSON.parse(read('platform-data.json'))
const original=[...read('../platform.html').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1])
test('native registry preserves every source entry, agency and legal basis',()=>{
 const source=vm.runInNewContext(original[2]+';SPR',{}, {timeout:1000})
 assert.equal(data.registry.length,613);assert.equal(data.agencies.length,37)
 source.ms.forEach((agency,oi)=>agency.m.forEach((r,i)=>{const record=data.registry.find(x=>x.id===oi+'-'+i);assert.ok(record);assert.equal(record.n,r[0]);assert.equal(record.b,r[4]||'');assert.equal(record.o,agency.n)}))
})
test('modeled monthly finance reconciles to each 2025 source annual total',()=>{
 assert.equal(data.finance.length,44)
 for(const line of data.finance){const annual=line.periods.find(p=>p.year===2025).regions.find(r=>r.region==='').months.reduce((a,m)=>a+m.s,0);assert.ok(Math.abs(annual-line.s)<1e-6,line.id)}
})
test('all source region, demographic, family and audit dimensions remain available',()=>{
 assert.equal(data.regions.length,14);assert.equal(new Set(data.regionMap).size,14);assert.ok(data.regionMap.every(i=>i>=0&&i<14))
 assert.equal(data.districts.length,208);assert.equal(data.families.length,273)
 assert.deepEqual(data.audit.map(x=>x.n),[436,28,26,3,1450,38264])
 assert.equal(data.demographics.persons,701468)
 assert.ok(data.cubePeople.length>0)
 for(const family of data.families)for(const member of family.members)for(const row of member.rows){assert.equal(row.arr.length,12);assert.ok(row.arr.every(Number.isFinite))}
})
test('annual family amount matches the passport reference and source funds are not invented',()=>{
 assert.ok(data.families.some(f=>Math.abs(f.members.reduce((a,m)=>a+m.rows.reduce((b,r)=>b+r.arr.reduce((c,v)=>c+v,0),0),0)-62890500)<.01))
 for(const line of data.finance)if(!line.reg){const regional=line.periods.find(p=>p.year===2025).regions.filter(r=>r.region!=='');assert.ok(regional.every(r=>r.months.every(m=>m.s===0)),line.id)}
})
test('platform renders native Vue panels and never embeds source HTML',()=>{
 const ui=read('../../pages/SocialSupportPlatform.vue')
 assert.ok(!/<iframe|srcdoc|platform\.html\?raw|v-html/.test(ui))
 for(const component of ['RegistryPanel','FamilyPanel','AuditPanel','FinancialPanel','ExecutionFlow'])assert.ok(ui.includes('<'+component))
})
