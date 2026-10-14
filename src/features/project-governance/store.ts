import { defineStore } from 'pinia'
import { ref, markRaw, computed, watch } from 'vue'
import { today, members, criteria, roles, log as domainLog, packageErrors, costTotal, advance, decide, returnPackage, actErrors, actAction, type Project, type Role, type Stage, type Decision, type Act, type DocumentKind, type CostRow } from './domain'
import { seedDirectory, validateSelection, validateOrganization, validateUnit, validatePerson, validateDeactivation, validateAssignment, validatePosition, type Position, type Organization, type Unit, type Person, type ProcessRole } from './directory'

export function blankProject(): Project {
  return { id: crypto.randomUUID(), title: '', organizationId: '', unitId: '', ownerPositionId: '', assignees: {}, organization: '', owner: '', purpose: '', results: '', solution: '', resources: '', stage: 'draft', created: today(), changed: today(), submitted: '', expectedEnd: '', budget: 0,
    council: { present: [], votes: {}, protocol: '', reason: '', checks: [], revisionDays: 30 }, revision: '', revisionDue: '', requirement: '', assignment: '', estimate: '', orderRef: '', contractRef: '', expertiseRequired: false, documents: [], costs: [], audit: [] }
}
function demoProject(id: string, title: string, stage: Stage): Project {
  const p = blankProject()
  p.organizationId = 'org-agency'; p.unitId = 'unit-services'; p.ownerPositionId = 'position-initiator'
  p.assignees = { initiator: 'position-initiator', secretary: 'position-secretary', reviewer: 'position-reviewer', director: 'position-director', center: 'position-center', fund: 'position-fund' }
  Object.assign(p, { id, title, stage, organization: 'Hududlarda ijtimoiy xizmatlarni rivojlantirish boshqarmasi', owner: 'M. Karimova · demo', purpose: 'Ijtimoiy xizmatlarga murojaatlarni yagona oynada boshqarish va ishlarni kelishish muddatini qisqartirish.', results: 'Murojaat holati ko‘rinadi; takroriy ma’lumot kiritish kamayadi; ijro muddatlari nazorat qilinadi.', solution: 'NASP moduli, yagona loyiha kartasi, hujjat versiyalari va mavjud tizimlar bilan API integratsiyasi.', resources: '1 midl frontend, 1 midl backend; 3 oy. Mavjud infratuzilma.', expectedEnd: '2026-12-30', created: '2026-09-01', changed: '2026-10-05', submitted: '2026-10-03', budget: 126000000,
    requirement: 'Murojaat, holat va audit. Brauzerlar: Chrome, Edge. Foydalanuvchi qo‘llanmasi va texnik yordam.', assignment: 'Vue frontend, API shartnomasi, audit va kirish nazorati. Test, qabul mezonlari va 3 oylik ish rejasi.', estimate: 'Oktabr — 42 mln; noyabr — 42 mln; dekabr — 42 mln so‘m. Demo hisob-kitob.', orderRef: 'DEMO-LOYIHA-12', contractRef: 'DEMO-SH-18' })
  if (['supported', 'concept', 'requirements', 'assignment', 'technical', 'ordered', 'active'].includes(stage)) p.council = { present: members.slice(0, 7), votes: Object.fromEntries(members.slice(0, 7).map(m => [m, 'support' as const])), protocol: 'DEMO-K-09', reason: '', checks: [...criteria], decision: 'support', date: '2026-09-02' }
  if (stage === 'council') p.council.present = members.slice(0, 7)
  if (stage === 'returned') { p.council.reason = 'Iqtisodiy samaradorlik va mavjud tizimdan farqini aniqlashtirish.'; p.council.decision = 'return'; p.revisionDue = '2026-10-09' }
  if (stage === 'active') {
    p.created = '2026-07-01'; p.submitted = '2026-07-02'; p.changed = '2026-07-20'; p.council.date = '2026-07-03'
    p.expectedEnd = '2026-10-30'; p.estimate = 'Avgust — 42 mln; sentabr — 42 mln; oktabr — 42 mln so‘m. Demo hisob-kitob.'
    p.documents = (['requirement', 'assignment', 'estimate', 'order', 'contract'] as DocumentKind[]).map(kind => ({ id: crypto.randomUUID(), kind, name: `${kind}-demo.txt`, date: '2026-07-20', demo: true }))
  }
  p.costs = [{ category: 'Midl frontend', count: 1, monthlyRate: 20000000, months: 3, hours: 480 }, { category: 'Midl backend', count: 1, monthlyRate: 20000000, months: 3, hours: 480 }]
  domainLog(p, 'initiator', 'Demo loyiha yaratildi', 'Sinov ma’lumotlari; haqiqiy shartnoma yoki qaror emas.')
  return p
}
export const useGovernanceStore = defineStore('project-governance', () => {
  const role = ref<Role>('initiator')
  const holidays = ref<string[]>([])
  const directory = ref(seedDirectory())
  const managementAudit = ref<Project['audit']>([])
  const actingPersonId = ref('person-initiator')
  const eligibleActors = computed(() => directory.value.people.filter(p => p.active && directory.value.positions.some(pos => pos.id === p.positionId && pos.active && pos.roles.includes(role.value as ProcessRole))))
  watch(eligibleActors, actors => { if (!actors.some(p => p.id === actingPersonId.value)) actingPersonId.value = actors[0]?.id || '' }, { flush: 'sync', immediate: true })
  function actorFor(p: Project) {
    if (['admin', 'council'].includes(role.value)) return { actorId: 'demo-operator', actorName: 'Modul operatori · demo', positionId: '' }
    validateAssignment(directory.value, role.value as ProcessRole, p.assignees?.[role.value as ProcessRole] || '')
    const person = eligibleActors.value.find(person => person.id === actingPersonId.value)
    if (!person || person.positionId !== p.assignees?.[role.value as ProcessRole]) throw new Error('Bu vazifa boshqa lavozimga tegishli. Shu lavozimdagi faol demo xodimni tanlang.')
    return { actorId: person.id, actorName: person.name, positionId: person.positionId }
  }
  function stamp(target: { audit: Project['audit'] }, p?: Project) {
    if (target.audit[0]) Object.assign(target.audit[0], p ? actorFor(p) : { actorId: 'demo-operator', actorName: 'Boshqaruv administratori · demo' })
  }
  function log(target: { audit: Project['audit'] }, actorRole: Role, action: string, details = '') {
    domainLog(target, actorRole, action, details)
    const p = 'assignees' in target ? target as Project : 'projectId' in target ? project(String(target.projectId)) : undefined
    stamp(target, p)
  }

  const projects = ref<Project[]>([
    demoProject('LY-2026-001', 'Ijtimoiy xizmatlar uchun yagona loyiha oynasi', 'active'),
    demoProject('LY-2026-002', 'Call-markaz murojaatlarini tahlil qilish', 'council'),
    demoProject('LY-2026-003', 'Hududiy texnik yordam reyestri', 'draft'),
    demoProject('LY-2026-004', 'Xizmat natijalarini monitoring qilish', 'returned'),
    demoProject('LY-2026-005', 'Inson uchun modulini takomillashtirish', 'concept'),
  ])
  const acts = ref<Act[]>([
    { id: 'DL-2026-001', projectId: 'LY-2026-001', month: '2026-09', amount: 21000000, progress: 20, services: 'Loyiha kartasi va audit mexanizmi ishlab chiqildi. Demo hisobot.', state: 'submitted', created: '2026-10-01', submitted: '2026-10-02', agreed: {}, approved: '', sent: '', paid: '', invoice: '', objection: '', correction: '', reportName: 'sentabr-hisobot-demo.txt', audit: [] },
    { id: 'DL-2026-002', projectId: 'LY-2026-001', month: '2026-08', amount: 12600000, progress: 10, services: 'Talablar tahlili va arxitektura loyihasi. Demo hisobot.', state: 'paid', created: '2026-09-01', submitted: '2026-09-02', agreed: { initiator: '2026-09-03', reviewer: '2026-09-03' }, approved: '2026-09-04', sent: '2026-09-04', paid: '2026-09-07', invoice: 'DEMO-HF-08', objection: '', correction: '', reportName: 'avgust-hisobot-demo.txt', audit: [] },
  ])
  const reportFiles = new Map<string, File>()
  const organizationName = (id?: string) => directory.value.organizations.find(o => o.id === id)?.name || '—'
  const unitName = (id?: string) => directory.value.units.find(u => u.id === id)?.name || '—'
  const positionName = (id?: string) => directory.value.positions.find(p => p.id === id)?.name || 'Lavozim biriktirilmagan'
  const personName = (id?: string) => directory.value.people.find(p => p.id === id)?.name || 'Biriktirilmagan'
  const assignedName = (p: Project, role: Role | undefined) => role === 'council' ? 'Kengash' : positionName(p.assignees?.[role as ProcessRole])
  function adminOnly() { if (role.value !== 'admin') throw new Error('Ma’lumotnomalarni faqat boshqaruv administratori o‘zgartiradi.') }
  function labels(p: Project) { p.organization = `${organizationName(p.organizationId)} / ${unitName(p.unitId)}`; p.owner = positionName(p.ownerPositionId) }
  function refreshLabels() { projects.value.forEach(labels) }
  function masterLog(action: string, details: string) { log({ audit: managementAudit.value }, role.value, action, details) }
  function saveOrganization(input: Organization) {
    adminOnly(); const item = { ...input, code: input.code.trim(), name: input.name.trim(), id: input.id || crypto.randomUUID() }
    validateOrganization(directory.value, item)
    if (!item.active) validateDeactivation(directory.value, 'organization', item.id, projects.value)
    const old = directory.value.organizations.find(o => o.id === item.id)
    if (old) Object.assign(old, item); else directory.value.organizations.push(item)
    refreshLabels(); masterLog('Tashkilot saqlandi', `${item.code} · ${item.name}`)
  }
  function saveUnit(input: Unit) {
    adminOnly(); const item = { ...input, code: input.code.trim(), name: input.name.trim(), id: input.id || crypto.randomUUID() }
    validateUnit(directory.value, item, projects.value)
    if (!item.active) validateDeactivation(directory.value, 'unit', item.id, projects.value)
    const old = directory.value.units.find(u => u.id === item.id)
    if (old) Object.assign(old, item); else directory.value.units.push(item)
    refreshLabels(); masterLog('Bo‘linma saqlandi', `${item.code} · ${item.name}`)
  }
  function savePerson(input: Person) {
    adminOnly(); const position = directory.value.positions.find(p => p.id === input.positionId)
    const item = { ...input, name: input.name.trim(), position: position?.name || input.position.trim(), roles: [...(position?.roles || input.roles)], id: input.id || crypto.randomUUID() }
    validatePerson(directory.value, item, projects.value)
    if (!item.active) validateDeactivation(directory.value, 'person', item.id, projects.value)
    const old = directory.value.people.find(p => p.id === item.id)
    if (old) Object.assign(old, item); else directory.value.people.push(item)
    refreshLabels(); masterLog('Xodim saqlandi', `${item.name} · ${item.position}`)
  }
  function savePosition(input: Position) {
    adminOnly(); const item = { ...input, name: input.name.trim(), code: input.code.trim(), roles: [...input.roles], id: input.id || crypto.randomUUID() }
    validatePosition(directory.value, item, projects.value)
    if (!item.active) validateDeactivation(directory.value, 'position', item.id, projects.value)
    const old = directory.value.positions.find(p => p.id === item.id)
    if (old) Object.assign(old, item); else directory.value.positions.push(item)
    for (const person of directory.value.people.filter(p => p.positionId === item.id)) { person.position = item.name; person.roles = [...item.roles] }
    refreshLabels(); masterLog('Lavozim saqlandi', `${item.code} · ${item.name}`)
  }
  function toggleRecord(kind: 'organization' | 'unit' | 'person' | 'position', id: string) {
    adminOnly()
    if (kind === 'organization') { const item = directory.value.organizations.find(o => o.id === id); if (!item) throw new Error('Tashkilot topilmadi.'); saveOrganization({ ...item, active: !item.active }) }
    if (kind === 'unit') { const item = directory.value.units.find(o => o.id === id); if (!item) throw new Error('Bo‘linma topilmadi.'); saveUnit({ ...item, active: !item.active }) }
    if (kind === 'position') { const item = directory.value.positions.find(p => p.id === id); if (!item) throw new Error('Lavozim topilmadi.'); savePosition({ ...item, active: !item.active }) }
    if (kind === 'person') { const item = directory.value.people.find(o => o.id === id); if (!item) throw new Error('Xodim topilmadi.'); savePerson({ ...item, active: !item.active }) }
  }
  function assign(id: string, processRole: ProcessRole, positionId: string, reason: string) {
    adminOnly(); const p = project(id)
    if (p.stage === 'rejected') throw new Error('Yakunlangan loyiha biriktiruvlari o‘zgartirilmaydi.')
    if (!reason.trim()) throw new Error('Biriktirish yoki almashtirish sababini yozing.')
    validateAssignment(directory.value, processRole, positionId)
    if (processRole === 'initiator') validateSelection(directory.value, p.organizationId || '', p.unitId || '', positionId)
    const old = p.assignees?.[processRole]; p.assignees = { ...p.assignees, [processRole]: positionId }
    if (processRole === 'initiator') { p.ownerPositionId = positionId; labels(p) }
    const detail = `${roles.find(r => r.id === processRole)?.title}: ${positionName(old)} → ${positionName(positionId)}. ${reason}`
    log(p, role.value, 'Loyiha mas’uli qayta biriktirildi', detail); masterLog('Loyiha mas’uli biriktirildi', `${id} · ${detail}`)
  }
  function project(id: string) { const p = projects.value.find(p => p.id === id); if (!p) throw new Error('Loyiha topilmadi.'); return p }
  function create(input: Partial<Project>) {
    if (role.value !== 'initiator') throw new Error('Tashabbusni loyiha tashabbuskori yaratadi.')
    const p = { ...blankProject(), ...input, id: `LY-${today().slice(0, 4)}-${String(projects.value.length + 1).padStart(3, '0')}`, stage: 'draft' as Stage }
    if (!p.title.trim()) throw new Error('Loyiha nomini kiriting.')
    validateSelection(directory.value, p.organizationId || '', p.unitId || '', p.ownerPositionId || '')
    p.assignees = { initiator: p.ownerPositionId }
    for (const r of ['secretary', 'reviewer', 'director', 'center', 'fund'] as ProcessRole[]) { const person = directory.value.positions.find(x => x.active && x.roles.includes(r)); if (person) p.assignees[r] = person.id }
    labels(p); actorFor(p)
    log(p, role.value, 'Tashabbus yaratildi'); projects.value.unshift(p); return p
  }
  function save(id: string, input: Partial<Project>) {
    const p = project(id)
    const allowed = role.value === 'initiator' && ['draft', 'returned'].includes(p.stage)
    const originalActor = actorFor(p)
    if (!allowed) throw new Error('Konsepsiya faqat tashabbus va qayta ishlash bosqichida tahrirlanadi.')
    const orgId = input.organizationId ?? p.organizationId ?? '', unitId = input.unitId ?? p.unitId ?? '', ownerPositionId = input.ownerPositionId ?? p.ownerPositionId ?? ''
    validateSelection(directory.value, orgId, unitId, ownerPositionId)
    p.organizationId = orgId; p.unitId = unitId; p.ownerPositionId = ownerPositionId; p.assignees = { ...p.assignees, initiator: ownerPositionId }
    for (const key of ['title', 'organization', 'owner', 'purpose', 'results', 'solution', 'resources', 'expectedEnd', 'revision'] as const) if (typeof input[key] === 'string') p[key] = input[key]!
    if (typeof input.budget === 'number' && Number.isFinite(input.budget) && input.budget >= 0) p.budget = input.budget
    labels(p); domainLog(p, role.value, 'Konsepsiya yangilandi'); Object.assign(p.audit[0]!, originalActor)
  }
  function saveTechnical(id: string, values: Pick<Project, 'requirement' | 'assignment' | 'estimate' | 'orderRef' | 'contractRef' | 'expertiseRequired'>) {
    const p = project(id); actorFor(p)
    const fields: Partial<Record<Stage, { role: Role; keys: (keyof typeof values)[] }>> = { concept: { role: 'initiator', keys: ['requirement'] }, requirements: { role: 'center', keys: ['assignment', 'estimate', 'expertiseRequired'] }, technical: { role: 'director', keys: ['orderRef'] }, ordered: { role: 'center', keys: ['contractRef'] } }
    const current = fields[p.stage]; if (!current || current.role !== role.value) throw new Error('Joriy bosqichning mas’ul roli talab etiladi.')
    for (const key of current.keys) Object.assign(p, { [key]: values[key] })
    log(p, role.value, 'Texnik hujjat rekvizitlari yangilandi')
  }
  function upload(id: string, kind: DocumentKind, file: File) {
    const p = project(id); actorFor(p)
    const expected: Partial<Record<Stage, Role>> = { draft: 'initiator', returned: 'initiator', concept: 'initiator', requirements: 'center', assignment: 'center', technical: 'director', ordered: 'center' }
    if (expected[p.stage] !== role.value) throw new Error('Ushbu bosqichda hujjat biriktirish huquqi yo‘q.')
    if (!file.size || file.size > 20 * 1024 * 1024) throw new Error('Fayl bo‘sh bo‘lmasligi va 20 MBdan oshmasligi kerak.')
    p.documents.push({ id: crypto.randomUUID(), kind, name: file.name, size: file.size, date: today(), file: markRaw(file) })
    log(p, role.value, 'Hujjat biriktirildi', `${kind}: ${file.name}`)
  }
  function next(id: string) {
    const p = project(id); validateSelection(directory.value, p.organizationId || '', p.unitId || '', p.ownerPositionId || '')
    if (role.value !== 'council' && role.value !== 'admin') validateAssignment(directory.value, role.value, p.assignees?.[role.value] || '')
    actorFor(p); advance(p, role.value, today(), holidays.value); stamp(p, p)
  }
  function conclusion(id: string, decision: Decision) { const p = project(id); actorFor(p); decide(p, role.value, decision, today(), holidays.value); stamp(p, p) }
  function sendBack(id: string, note: string) { const p = project(id); actorFor(p); returnPackage(p, role.value, note, today(), holidays.value); stamp(p, p) }
  function createAct(id: string, draft: Pick<Act, 'month' | 'amount' | 'progress' | 'services' | 'reportName'>, report: File) {
    if (role.value !== 'center') throw new Error('Dalolatnomani Markaz yaratadi.')
    actorFor(project(id))
    if (!report.size || report.size > 20 * 1024 * 1024) throw new Error('Hisobot fayli 0–20 MB oralig‘ida bo‘lishi kerak.')
    const errors = actErrors(project(id), acts.value, draft); if (errors.length) throw new Error(errors.join(' '))
    const a: Act = { ...draft, id: `DL-${today().slice(0, 4)}-${String(acts.value.length + 1).padStart(3, '0')}`, projectId: id, state: 'draft', created: today(), submitted: '', agreed: {}, approved: '', sent: '', paid: '', invoice: '', objection: '', correction: '', audit: [] }
    log(a, role.value, 'Dalolatnoma yaratildi'); reportFiles.set(a.id, report); acts.value.unshift(a); return a
  }
  function actStep(id: string, action: Parameters<typeof actAction>[2], note = '') {
    const a = acts.value.find(x => x.id === id); if (!a) throw new Error('Dalolatnoma topilmadi.')
    if (project(a.projectId).stage !== 'active') throw new Error('Loyiha faol emas.')
    const p = project(a.projectId); actorFor(p); actAction(a, role.value, action, note); stamp(a, p)
  }
  function saveCost(id: string, rows: CostRow[]) {
    const p = project(id); if (role.value !== 'center' || p.stage !== 'requirements') throw new Error('Smetani Markaz texnik topshiriq bosqichida hisoblaydi.')
    actorFor(p); const total = costTotal(rows); if (!total.total) throw new Error('Smeta summasi nol bo‘lmasligi kerak.')
    p.costs = structuredClone(rows); p.budget = total.total; log(p, role.value, 'Demo tariflar bilan smeta hisoblandi', `${total.total} so‘m`)
  }
  refreshLabels()
  return { role, actingPersonId, eligibleActors, holidays, projects, acts, directory, managementAudit, organizationName, unitName, personName, positionName, assignedName, saveOrganization, saveUnit, savePerson, savePosition, toggleRecord, assign, reportFiles, project, create, save, saveTechnical, upload, next, conclusion, sendBack, createAct, actStep, saveCost, packageErrors }
})
