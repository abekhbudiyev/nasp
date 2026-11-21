// One-time data conversion. Source HTML is an archive, never rendered by NASP.
import fs from 'node:fs'
import vm from 'node:vm'
const source = fs.readFileSync(new URL('../platform.html', import.meta.url), 'utf8')
const scripts = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])
const node = { style:{}, classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},querySelectorAll(){return []},innerHTML:'' }
const context=vm.createContext({console,document:{getElementById(){return node},querySelector(){return node},addEventListener(){},body:node},window:{addEventListener(){}},location:{hash:''},setTimeout(){},clearTimeout(){}})
for (const script of scripts) vm.runInContext(script,context,{timeout:5000})
const converted=vm.runInContext(`(()=>{
 S.y=2025;S.months=ALL();S.o=S.t=S.d=S.c=S.r='';
 const families=[...new Set(Object.values(PEOPLE).map(p=>p.h))].map(h=>({id:h.id,region:h.reg,address:h.addr,tags:h.tags||[],signals:h.sig||[],members:h.mem.map(p=>({id:p.id,name:p.f,sex:p.g,age:age(p),relation:p.rel,source:!!p.real,allowances:p.rm??[],rows:personRows(p).map(({who,...row})=>row),suggestions:suggest(p)}))}));
 const finance=L.map(l=>{
   const periods=[2024,2025,2026].map(year=>{
     const regions=['',...DATA.regions.map((_,i)=>String(i))].map(region=>({region,months:Array.from({length:12},(_,m)=>lineMonth(l,year,m,region))}));
     return {year,regions};
   });
   return {...l,periods};
 });
 return {recipientDistribution:RD.dist,labels:{types:TYPE,directions:DIR,cohorts:CONT},womenSubsidies:DATA.women_subs,cubePeople:RD.CB,registry:REG,agencies:SPR.ms.map(({m,...rest})=>rest),registryTotal:SPR.tot_c,typeTotals:SPR.tot_t,fieldTotals:SPR.tot_d,cohortTotals:DATA.contingent,types:TYN,fields:SOHA,cohorts:CONTN,regions:DATA.regions,organizations:ORG,finance,families,audit:SIGS.map(x=>({...x,...MON[x.k],title:x.n,n:MON[x.k].n})),familyAudit:MON.fam,regionMap:RMAP,benefitTypes:RD.TL,districts:RD.DL,cube:RD.CA,demographics:RD.ext,services:SVC_INFO,methodology:pageAbout(),raw:{DATA,SPR,MONDATA,REAL}};
})()`,context,{timeout:10000})
// The source's About page defines these lists locally inside its renderer.
const about = source.match(/function pageAbout\(\)\{const steps=(\[[^\n]+\]);\s*const real=(\[[^\n]+\]);/)
if (!about) throw new Error('The source platform scope could not be extracted')
const decisions = source.match(/Ишга тушириш учун керак бўладиган асосий қарорлар[^\n]*?<ul class="note">(.*?)<\/ul>/)
if (!decisions) throw new Error('The source launch decisions could not be extracted')
converted.about = {
  steps: vm.runInContext(about[1], context, {timeout:1000}),
  evidence: vm.runInContext(about[2], context, {timeout:1000}),
  decisions: [...decisions[1].matchAll(/<li>(.*?)<\/li>/g)].map(match => match[1]),
}
delete converted.raw
fs.writeFileSync(new URL('./platform-data.json',import.meta.url),JSON.stringify(converted))
console.log(JSON.stringify({registry:converted.registry.length,agencies:converted.agencies.length,finance:converted.finance.length,families:converted.families.length,audit:converted.audit.length,districts:converted.districts.length,demographicKeys:Object.keys(converted.demographics)}))
