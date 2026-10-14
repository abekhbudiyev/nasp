import type { Project, Role } from './domain'
export type ProcessRole = Exclude<Role, 'admin' | 'council'>
export interface Organization { id: string; code: string; name: string; type: 'agency' | 'center' | 'fund' | 'regional' | 'other'; active: boolean }
export interface Unit { id: string; organizationId: string; code: string; name: string; active: boolean }
export interface Position { id: string; organizationId: string; unitId: string; code: string; name: string; roles: ProcessRole[]; active: boolean }
export interface Person { positionId?: string; id: string; organizationId: string; unitId: string; name: string; position: string; roles: ProcessRole[]; active: boolean }
export interface Directory { organizations: Organization[]; units: Unit[]; positions: Position[]; people: Person[] }
export const organizationTypes = [{ id: 'agency', title: 'Agentlik' }, { id: 'center', title: 'Markaz' }, { id: 'fund', title: 'Jamg‘arma' }, { id: 'regional', title: 'Hududiy tashkilot' }, { id: 'other', title: 'Boshqa tashkilot' }] as const
export function seedDirectory(): Directory {
  const d: Directory = {
    positions: [],
    organizations: [
      { id: 'org-agency', code: 'IHMA', name: 'Ijtimoiy himoya milliy agentligi', type: 'agency', active: true },
      { id: 'org-center', code: 'ATM', name: 'Axborot texnologiyalari markazi', type: 'center', active: true },
      { id: 'org-fund', code: 'JAM', name: 'Ijtimoiy himoya davlat jamg‘armasi', type: 'fund', active: true },
    ],
    units: [
      { id: 'unit-services', organizationId: 'org-agency', code: 'IXR', name: 'Hududlarda ijtimoiy xizmatlarni rivojlantirish boshqarmasi', active: true },
      { id: 'unit-digital', organizationId: 'org-agency', code: 'BTRTR', name: 'Budjetlashtirish tizimini muvofiqlashtirish va raqamli texnologiyalarni rivojlantirish bo‘limi', active: true },
      { id: 'unit-leadership', organizationId: 'org-agency', code: 'RAH', name: 'Rahbariyat', active: true },
      { id: 'unit-center', organizationId: 'org-center', code: 'LOY', name: 'Loyihalarni amalga oshirish guruhi · demo', active: true },
      { id: 'unit-fund', organizationId: 'org-fund', code: 'MOL', name: 'Moliyalashtirish guruhi · demo', active: true },
    ],
    people: [
      { id: 'person-initiator', organizationId: 'org-agency', unitId: 'unit-services', name: 'M. Karimova · demo', position: 'Loyiha mas’uli', roles: ['initiator'], active: true },
      { id: 'person-secretary', organizationId: 'org-agency', unitId: 'unit-digital', name: 'Kengash kotibi · demo', position: 'Bo‘lim mutaxassisi', roles: ['secretary'], active: true },
      { id: 'person-reviewer', organizationId: 'org-agency', unitId: 'unit-digital', name: 'BTRTR kelishuvchisi · demo', position: 'Kelishuv uchun mas’ul', roles: ['reviewer'], active: true },
      { id: 'person-director', organizationId: 'org-agency', unitId: 'unit-leadership', name: 'Tasdiqlovchi rahbar · demo', position: 'Vakolatli rahbar', roles: ['director'], active: true },
      { id: 'person-center', organizationId: 'org-center', unitId: 'unit-center', name: 'Markaz loyiha mas’uli · demo', position: 'Loyiha menejeri', roles: ['center'], active: true },
      { id: 'person-fund', organizationId: 'org-fund', unitId: 'unit-fund', name: 'Jamg‘arma mas’uli · demo', position: 'Moliyalashtirish bo‘yicha mas’ul', roles: ['fund'], active: true },
    ],
  }
  d.positions = d.people.map(p => ({ id: p.id.replace('person-', 'position-'), organizationId: p.organizationId, unitId: p.unitId, code: p.roles[0]!.toUpperCase(), name: p.position, roles: [...p.roles], active: true }))
  d.people.forEach(p => { p.positionId = p.id.replace('person-', 'position-') })
  return d
}
function requireDirectory(ok: unknown, error: string): asserts ok { if (!ok) throw new Error(error) }
const openProjects = (projects: Project[]) => projects.filter(p => p.stage !== 'rejected')
export function validateSelection(d: Directory, organizationId: string, unitId: string, ownerId: string) {
  requireDirectory(d.organizations.some(o => o.id === organizationId && o.active), 'Faol tashkilotni tanlang.')
  requireDirectory(d.units.some(u => u.id === unitId && u.organizationId === organizationId && u.active), 'Bo‘linma tanlangan tashkilotga tegishli va faol bo‘lishi kerak.')
  requireDirectory(d.positions.some(p => p.id === ownerId && p.organizationId === organizationId && p.unitId === unitId && p.active && p.roles.includes('initiator')), 'Mas’ul shu tashkilot va bo‘linmaning faol tashabbuskor lavozimi bo‘lishi kerak.')
}
export function validateOrganization(d: Directory, input: Organization) {
  requireDirectory(input.name.trim() && input.code.trim(), 'Tashkilot nomi va kodi talab etiladi.')
  requireDirectory(organizationTypes.some(t => t.id === input.type), 'Tashkilot turini tanlang.')
  requireDirectory(!d.organizations.some(o => o.id !== input.id && o.code.toLowerCase() === input.code.trim().toLowerCase()), 'Tashkilot kodi takrorlanmoqda.')
}
export function validateUnit(d: Directory, input: Unit, projects: Project[]) {
  requireDirectory(input.name.trim() && input.code.trim(), 'Bo‘linma nomi va kodi talab etiladi.')
  requireDirectory(d.organizations.some(o => o.id === input.organizationId && o.active), 'Bo‘linma uchun faol tashkilotni tanlang.')
  requireDirectory(!d.units.some(u => u.id !== input.id && u.organizationId === input.organizationId && u.code.toLowerCase() === input.code.trim().toLowerCase()), 'Ushbu tashkilotda bo‘linma kodi takrorlanmoqda.')
  const old = d.units.find(u => u.id === input.id)
  if (old && old.organizationId !== input.organizationId) requireDirectory(!d.positions.some(p => p.unitId === old.id) && !d.people.some(p => p.unitId === old.id) && !projects.some(p => p.unitId === old.id), 'Biriktirilgan xodim yoki loyiha mavjud bo‘linmaning tashkilotini almashtirib bo‘lmaydi.')
}
export function validatePerson(d: Directory, input: Person, projects: Project[]) {
  requireDirectory(input.name.trim() && input.position.trim(), 'Xodim ismi va lavozimi talab etiladi.')
  requireDirectory(d.organizations.some(o => o.id === input.organizationId && o.active), 'Xodim uchun faol tashkilotni tanlang.')
  requireDirectory(d.units.some(u => u.id === input.unitId && u.organizationId === input.organizationId && u.active), 'Xodim bo‘linmasi tashkilotga tegishli va faol bo‘lishi kerak.')
  const processRoles = ['initiator', 'secretary', 'director', 'center', 'reviewer', 'fund']
  requireDirectory(input.roles.length && input.roles.every(r => processRoles.includes(r)), 'Xodimning jarayondagi vazifasini tanlang.')
  const position = d.positions.find(p => p.id === input.positionId && p.active)
  requireDirectory(position && position.organizationId === input.organizationId && position.unitId === input.unitId, 'Xodimning faol lavozimini tanlang; lavozim shu bo‘linmaga tegishli bo‘lishi kerak.')
  void projects
}
export function validateDeactivation(d: Directory, kind: 'organization' | 'unit' | 'person' | 'position', id: string, projects: Project[]) {
  const live = openProjects(projects)
  if (kind === 'organization') requireDirectory(!d.units.some(u => u.organizationId === id && u.active) && !d.people.some(p => p.organizationId === id && p.active) && !live.some(p => p.organizationId === id), 'Faol bo‘linma, xodim yoki loyiha mavjud. Avval bog‘liq yozuvlarni tartibga keltiring.')
  if (kind === 'unit') requireDirectory(!d.positions.some(p => p.unitId === id && p.active) && !d.people.some(p => p.unitId === id && p.active) && !live.some(p => p.unitId === id), 'Bo‘linmada faol lavozim, xodim yoki loyiha mavjud.')
  if (kind === 'position') requireDirectory(!d.people.some(p => p.positionId === id && p.active) && !live.some(p => p.ownerPositionId === id || Object.values(p.assignees || {}).includes(id)), 'Lavozim faol loyihaga biriktirilgan. Avval mas’ul lavozimni almashtiring.')
}
export function validateAssignment(d: Directory, role: ProcessRole, id: string) {
  const p = d.positions.find(p => p.id === id)
  requireDirectory(p?.active && p.roles.includes(role), 'Tanlangan lavozim faol bo‘lishi va shu vazifaga mos kelishi kerak.')
  requireDirectory(d.organizations.some(o => o.id === p.organizationId && o.active) && d.units.some(u => u.id === p.unitId && u.organizationId === p.organizationId && u.active), 'Lavozimning tashkiloti va bo‘linmasi faol bo‘lishi kerak.')
}

export function validatePosition(d: Directory, input: Position, projects: Project[]) {
  requireDirectory(input.name.trim() && input.code.trim(), 'Lavozim nomi va kodi talab etiladi.')
  requireDirectory(d.units.some(u => u.id === input.unitId && u.organizationId === input.organizationId && u.active), 'Lavozimning tashkiloti va bo‘linmasi mos bo‘lishi kerak.')
  requireDirectory(input.roles.length && input.roles.every(r => ['initiator', 'secretary', 'director', 'center', 'reviewer', 'fund'].includes(r)), 'Lavozimning jarayondagi vazifasini tanlang.')
  requireDirectory(!d.positions.some(p => p.id !== input.id && p.unitId === input.unitId && p.code.toLowerCase() === input.code.trim().toLowerCase()), 'Bo‘linmada lavozim kodi takrorlanmoqda.')
  const old = d.positions.find(p => p.id === input.id)
  if (old && (old.organizationId !== input.organizationId || old.unitId !== input.unitId)) requireDirectory(!d.people.some(p => p.positionId === old.id) && !projects.some(p => Object.values(p.assignees || {}).includes(old.id)), 'Bog‘langan lavozimning bo‘linmasini o‘zgartirib bo‘lmaydi.')
  for (const p of openProjects(projects)) for (const [role, id] of Object.entries(p.assignees || {})) if (id === input.id) requireDirectory(input.roles.includes(role as ProcessRole), 'Lavozim faol loyihada ushbu vazifaga bog‘langan.')
}
