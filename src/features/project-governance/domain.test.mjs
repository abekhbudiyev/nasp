import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
const require = createRequire(import.meta.url)
const cache = new Map()
function load(filename) {
  if (cache.has(filename)) return cache.get(filename).exports
  const module = { exports: {} }; cache.set(filename, module)
  const output = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText
  new Function('require', 'module', 'exports', output)(name => name.startsWith('.') ? load(resolve(dirname(filename), `${name}.ts`)) : require(name), module, module.exports)
  return module.exports
}
const folder = dirname(fileURLToPath(import.meta.url))
const d = load(resolve(folder, 'domain.ts'))
const { blankProject, useGovernanceStore } = load(resolve(folder, 'store.ts'))
const { createPinia } = require('pinia')
function project(stage = 'draft') { return { ...blankProject(), title: 'Sinov', organization: 'Markaz', owner: 'Mas’ul', purpose: 'Maqsad', results: 'Natija', solution: 'Yechim', resources: 'Resurs', expectedEnd: '2026-12-31', budget: 1000, stage } }
function council(p, votes = 4) { p.council.present = d.members.slice(0, 7); p.council.votes = Object.fromEntries(p.council.present.map((m, i) => [m, i < votes ? 'support' : 'abstain'])); p.council.protocol = 'K-01'; p.council.checks = [...d.criteria] }
function act() { return { id: 'a1', projectId: 'p1', month: '2026-09', amount: 100, progress: 10, services: 'Ish', state: 'draft', created: '2026-10-01', submitted: '', agreed: {}, approved: '', sent: '', paid: '', invoice: '', objection: '', correction: '', reportName: 'hisobot.txt', audit: [] } }
test('calendar preserves calendar days, skips weekends and configured holidays, rolls year', () => {
  assert.equal(d.addDays('2026-10-09', 5), '2026-10-14')
  assert.equal(d.addWorkdays('2026-10-09', 3), '2026-10-14')
  assert.equal(d.addWorkdays('2026-10-09', 3, ['2026-10-12']), '2026-10-15')
  assert.equal(d.nextMonthDay('2026-12', 5), '2027-01-05')
})
test('quorum is unique actual members, not duplicate or unknown attendance; majority is strict', () => {
  const p = project('council'); council(p, 3)
  assert.match(d.councilErrors(p, 'support').join(' '), /ko‘pchilik/)
  council(p, 4); assert.deepEqual(d.councilErrors(p, 'support'), [])
  p.council.present = Array(7).fill(d.members[0]); assert.match(d.councilErrors(p, 'support').join(' '), /Kvorum/)
  p.council.present = ['unknown', ...d.members.slice(0, 6)]; assert.match(d.councilErrors(p, 'support').join(' '), /Kvorum/)
})
test('council requires votes, protocol and assessment; no mutation on rejected decision', () => {
  const p = project('council'); const old = JSON.stringify(p)
  assert.throws(() => d.decide(p, 'council', 'support'), /Kvorum/)
  assert.equal(JSON.stringify(p), old)
  council(p); delete p.council.votes[d.members[0]]; assert.match(d.councilErrors(p, 'support').join(' '), /ovozini/)
  council(p); p.council.protocol = ''; assert.match(d.councilErrors(p, 'support').join(' '), /Bayonnoma/)
})
test('wrong role and missing positive conclusion cannot approve TT or create contract', () => {
  const p = project('assignment'); assert.throws(() => d.advance(p, 'center'), /boshqa rol/)
  assert.throws(() => d.advance(p, 'director'), /ijobiy/)
  p.stage = 'ordered'; p.contractRef = 'SH-1'; p.documents.push({ id: 'd', kind: 'contract', name: 'x', date: '2026-10-01' })
  assert.throws(() => d.advance(p, 'center'), /Ijobiy/)
})
test('complete approved workflow traverses document gates and technical expertise', () => {
  const p = project(); d.advance(p, 'initiator', '2026-10-01'); d.advance(p, 'secretary', '2026-10-02'); council(p)
  d.decide(p, 'council', 'support', '2026-10-03'); d.advance(p, 'director', '2026-10-04')
  assert.throws(() => d.advance(p, 'initiator'), /Texnik talab/)
  p.requirement = 'Talab'; p.documents.push({ id: 'r', kind: 'requirement', name: 'r', date: '2026-10-01' }); d.advance(p, 'initiator')
  p.assignment = 'TT'; p.estimate = 'Oyma-oy'; p.documents.push(...['assignment', 'estimate'].map(kind => ({ id: kind, kind, name: kind, date: '2026-10-01' }))); d.advance(p, 'center')
  p.expertiseRequired = true; assert.throws(() => d.advance(p, 'director'), /Ekspertiza/)
  p.documents.push({ id: 'e', kind: 'expertise', name: 'e', date: '2026-10-01' }); d.advance(p, 'director')
  p.orderRef = 'B-1'; p.documents.push({ id: 'o', kind: 'order', name: 'o', date: '2026-10-01' }); d.advance(p, 'director')
  p.contractRef = 'SH-1'; p.documents.push({ id: 'c', kind: 'contract', name: 'c', date: '2026-10-01' }); d.advance(p, 'center')
  assert.equal(p.stage, 'active'); assert.ok(p.audit.length >= 9)
})
test('incomplete package return is distinct from council revision, expired revision blocked', () => {
  const p = project('intake'); p.submitted = '2026-10-01'; d.returnPackage(p, 'secretary', 'Smeta yo‘q', '2026-10-02')
  assert.equal(p.stage, 'draft'); assert.equal(p.revisionDue, '')
  p.stage = 'returned'; p.revision = 'Tuzatildi'; p.revisionDue = '2026-10-05'
  assert.throws(() => d.advance(p, 'initiator', '2026-10-06'), /muddati o‘tgan/)
})
test('acts cannot bypass dual agreement, invoice, role and lifecycle; repeated payment blocked', () => {
  const a = act(); d.actAction(a, 'center', 'submit', '', '2026-10-01')
  d.actAction(a, 'initiator', 'agree'); assert.equal(a.state, 'submitted')
  assert.throws(() => d.actAction(a, 'director', 'approve'), /Ikkala/)
  assert.throws(() => d.actAction(a, 'initiator', 'agree'), /allaqachon/)
  d.actAction(a, 'reviewer', 'agree'); d.actAction(a, 'director', 'approve')
  assert.throws(() => d.actAction(a, 'center', 'send'), /Hisob-faktura/)
  a.invoice = 'HF-1'; d.actAction(a, 'center', 'send')
  assert.throws(() => d.actAction(a, 'center', 'pay'), /faqat Jamg‘arma/)
  d.actAction(a, 'fund', 'pay'); assert.equal(a.state, 'paid')
  assert.throws(() => d.actAction(a, 'fund', 'pay'))
})
test('objection clears agreements; correction must be supplied before fresh dual agreement', () => {
  const a = act(); d.actAction(a, 'center', 'submit'); d.actAction(a, 'initiator', 'agree')
  assert.throws(() => d.actAction(a, 'reviewer', 'object', ''), /sababini/)
  d.actAction(a, 'reviewer', 'object', 'Hisobotdagi hajm mos emas'); assert.deepEqual(a.agreed, {})
  assert.throws(() => d.actAction(a, 'center', 'submit'), /tuzatish/)
  a.correction = 'Hajm tuzatildi'; d.actAction(a, 'center', 'submit'); assert.equal(a.state, 'submitted'); assert.deepEqual(a.agreed, {})
})
test('act amount grain protects duplicate month and total contract cap', () => {
  const p = project('active'); p.id = 'p1'; p.council.decision = 'support'
  const a = act(); const input = { month: '2026-09', amount: 950, progress: 30, services: 'Ish', reportName: 'report.txt' }
  const errors = d.actErrors(p, [a], input).join(' ')
  assert.match(errors, /mavjud/); assert.match(errors, /oshmasligi/)
  assert.ok(d.actErrors(p, [], { ...input, amount: Number.NaN }).length)
  assert.ok(d.actErrors(p, [], { ...input, progress: 101 }).length)
})
test('cost model and isolated in-memory store reject unauthorized edits and updates', () => {
  assert.deepEqual(d.costTotal([{ category: 'Midl', count: 2, monthlyRate: 20, months: 3, hours: 480 }]), { salary: 120, overhead: 6, total: 126 })
  assert.throws(() => d.costTotal([{ category: 'Midl', count: 1, monthlyRate: -10, months: 3, hours: 480 }]))
  const store = useGovernanceStore(createPinia()); store.role = 'fund'; assert.throws(() => store.create({ title: 'Sinov' }))
  assert.throws(() => store.save('LY-2026-001', { budget: 999 })); assert.throws(() => store.saveCost('LY-2026-001', []))
  store.role = 'initiator'; const p = store.create({ title: 'Sinov', organizationId: 'org-agency', unitId: 'unit-services', ownerPositionId: 'position-initiator' }); assert.equal(p.stage, 'draft'); assert.throws(() => store.next(p.id), /kiritilmagan/)
})
test('council may choose a shorter revision period but cannot exceed 30 workdays', () => {
  const p = project('council'); council(p); p.council.votes = Object.fromEntries(p.council.present.map(m => [m, 'return'])); p.council.reason = 'Smeta asosini aniqlashtirish'; p.council.revisionDays = 31
  assert.throws(() => d.decide(p, 'council', 'return'), /1–30/)
  p.council.revisionDays = 5; d.decide(p, 'council', 'return', '2026-10-09')
  assert.equal(p.revisionDue, '2026-10-16')
})
test('cumulative progress cannot go backwards across reporting months', () => {
  const p = project('active'); p.id = 'p1'; p.council.decision = 'support'
  const a = act(); a.month = '2026-08'; a.progress = 40
  assert.match(d.actErrors(p, [a], { month: '2026-09', amount: 10, progress: 20, services: 'Ish', reportName: 'report' }).join(' '), /kamaymasligi/)
})
test('directory mutations require administrator; organization codes are unique', () => {
  const store = useGovernanceStore(createPinia())
  const input = { id: '', code: 'NEW', name: 'Yangi tashkilot', type: 'regional', active: true }
  assert.throws(() => store.saveOrganization(input), /administratori/)
  store.role = 'admin'; store.saveOrganization(input)
  assert.throws(() => store.saveOrganization({ ...input, code: 'new' }), /takrorlanmoqda/)
  assert.equal(store.managementAudit.length, 1)
})
test('unit and employee hierarchy is enforced; invalid parent or role cannot be saved', () => {
  const store = useGovernanceStore(createPinia()); store.role = 'admin'
  assert.throws(() => store.saveUnit({ id: '', organizationId: 'missing', code: 'U', name: 'Bo‘linma', active: true }), /faol tashkilot/)
  assert.throws(() => store.savePerson({ id: '', organizationId: 'org-center', unitId: 'unit-services', name: 'Sinov', position: 'Lavozim', roles: ['center'], active: true }), /tegishli/)
  assert.throws(() => store.savePerson({ id: '', organizationId: 'org-center', unitId: 'unit-center', name: 'Sinov', position: 'Lavozim', roles: [], active: true }), /vazifasini/)
})
test('linked organization, unit and position are protected; employee may leave without moving tasks', () => {
  const store = useGovernanceStore(createPinia()); store.role = 'admin'
  assert.throws(() => store.toggleRecord('organization', 'org-agency'), /Faol bo‘linma/)
  assert.throws(() => store.toggleRecord('unit', 'unit-services'), /faol lavozim/)
  assert.throws(() => store.toggleRecord('position', 'position-center'), /Lavozim/)
  store.toggleRecord('person', 'person-center')
  assert.equal(store.directory.people.find(p => p.id === 'person-center').active, false)
  assert.equal(store.project('LY-2026-001').assignees.center, 'position-center')
})
test('project master-data selection rejects cross-unit owner and inactive references', () => {
  const store = useGovernanceStore(createPinia())
  assert.throws(() => store.create({ title: 'Yangi', organizationId: 'org-agency', unitId: 'unit-services', ownerPositionId: 'position-center' }), /shu tashkilot/)
  assert.throws(() => store.create({ title: 'Yangi', organizationId: 'org-center', unitId: 'unit-services', ownerPositionId: 'position-initiator' }), /Bo‘linma/)
  const p = store.create({ title: 'Yangi', organizationId: 'org-agency', unitId: 'unit-services', ownerPositionId: 'position-initiator' })
  assert.equal(p.owner, store.positionName('position-initiator')); assert.equal(p.assignees.initiator, 'position-initiator')
})
test('assignment targets stable position and cannot target an individual or incompatible role', () => {
  const store = useGovernanceStore(createPinia()); store.role = 'admin'
  assert.throws(() => store.assign('LY-2026-001', 'center', 'person-center', 'Sinov'), /lavozim/)
  assert.throws(() => store.assign('LY-2026-001', 'center', 'position-fund', 'Sinov'), /mos kelishi/)
  assert.throws(() => store.assign('LY-2026-001', 'center', 'position-center', ''), /sababini/)
})
test('successor continues the same document without reassignment and historical actor remains unchanged', () => {
  const store = useGovernanceStore(createPinia()); store.role = 'initiator'
  const act = store.acts.find(a => a.id === 'DL-2026-001')
  store.actStep(act.id, 'agree')
  const oldActor = { ...act.audit[0] }
  assert.equal(oldActor.actorId, 'person-initiator')
  store.role = 'admin'
  store.savePerson({ id: '', name: 'Yangi tashabbuskor', positionId: 'position-initiator', organizationId: 'org-agency', unitId: 'unit-services', position: '', roles: [], active: true })
  store.toggleRecord('person', 'person-initiator')
  const successor = store.directory.people.find(p => p.name === 'Yangi tashabbuskor')
  assert.equal(act.state, 'submitted'); assert.ok(act.agreed.initiator)
  store.role = 'reviewer'; store.actStep(act.id, 'object', 'Hisobotni aniqlashtirish')
  store.role = 'center'; act.correction = 'Aniqlashtirildi'; store.actStep(act.id, 'submit')
  store.role = 'initiator'; store.actingPersonId = successor.id; store.actStep(act.id, 'agree')
  assert.equal(act.audit[0].actorId, successor.id)
  assert.equal(act.audit.find(a => a.id === oldActor.id).actorName, oldActor.actorName)
  assert.equal(store.project(act.projectId).assignees.initiator, 'position-initiator')
})
test('another position with the same role cannot act on a project outside its assigned position', () => {
  const store = useGovernanceStore(createPinia()); store.role = 'admin'
  store.savePosition({ id: 'other-center', organizationId: 'org-center', unitId: 'unit-center', code: 'OTHER', name: 'Boshqa menejer', roles: ['center'], active: true })
  store.savePerson({ id: 'other-person', name: 'Boshqa xodim', positionId: 'other-center', organizationId: 'org-center', unitId: 'unit-center', position: '', roles: [], active: true })
  store.role = 'center'; store.actingPersonId = 'other-person'
  assert.throws(() => store.actStep('DL-2026-001', 'submit'), /boshqa lavozim/)
})
