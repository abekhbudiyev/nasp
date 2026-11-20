export const services = [
  { id: 'early', title: 'Erta aralashuv', group: '3 yoshgacha bo‘lgan bolalar', source: 'Erta aralashuv', law: 'VMQ 271 va 539', url: 'https://lex.uz/uz/docs/-8218769#-8227496' },
  { id: 'daycare', title: 'Bolalar uchun kunduzgi parvarish', group: '3–18 yoshdagi nogironligi bo‘lgan bolalar', source: 'Kunduzgi parvarish', law: 'PQ-41 va VMQ 126', url: 'https://lex.uz/uz/docs/-7410361' },
  { id: 'adult-rehab', title: 'Tibbiy-ijtimoiy reabilitatsiya', program: 'Faol hayotga qadam', group: 'O‘zgalar parvarishiga muhtoj voyaga yetganlar', source: 'Oila hamkori', law: 'PQ-171 va VMQ 376', url: 'https://lex.uz/uz/docs/-7581160' },
  { id: 'adult-day', title: 'Kattalar uchun kunduzgi qarab turish', program: 'Faol hayotga qadam', group: 'O‘zgalar parvarishiga muhtoj voyaga yetganlar', source: 'Oila hamkori', law: 'PQ-171 va VMQ 376', url: 'https://lex.uz/uz/docs/-7581160' },
  { id: 'protection', title: 'Bolalar uchun ijtimoiy moslashuv', group: 'Zo‘ravonlikdan jabrlangan yoki xavf ostidagi bolalar', source: 'Bolalarni himoya qilish', law: 'VMQ 48 va 555', url: 'https://lex.uz/uz/docs/-8045207' },
  { id: 'child-rehab', title: 'Bolalar abilitatsiyasi va reabilitatsiyasi', group: 'Ijtimoiy reyestrdagi oilalarning nogironligi bo‘lgan bolalari', source: 'Hududiy markaz / Ijtimoiy reyestr', law: 'VMQ 555', url: 'https://lex.uz/uz/docs/-8540128#-8542693' },
  { id: 'education', title: 'Ta’lim va kasbga o‘rgatish', group: 'Ta’lim xizmatiga ehtiyoji bo‘lgan shaxslar', source: 'Hududiy markaz / Ijtimoiy reyestr', law: 'VMQ 555', url: 'https://lex.uz/uz/docs/-8540128#-8542703' },
  { id: 'family', title: 'Oilani va parvarishlovchilarni qo‘llab-quvvatlash', group: 'Oila a’zolari va parvarishlovchilar', source: 'Hududiy markaz', law: 'VMQ 555', url: 'https://lex.uz/uz/docs/-8540128#-8542619' },
  { id: 'counsel', title: 'Psixologik, pedagogik va huquqiy maslahat', group: 'Maslahatga ehtiyoji bo‘lgan shaxslar', source: 'Hududiy markaz', law: 'VMQ 555', url: 'https://lex.uz/uz/docs/-8540128#-8542645' },
  { id: 'psychosocial', title: 'Psixosotsial reabilitatsiya', group: 'Psixosotsial yordamga ehtiyoji bo‘lgan shaxslar', source: 'ins.ihma.uz', law: 'VMQ 555', url: 'https://lex.uz/uz/docs/-8540128#-8542645' },
] as const

export type ServiceId = typeof services[number]['id']
export type ReferralStatus = 'new' | 'queued' | 'referred' | 'active' | 'closed' | 'rejected'
export type ProviderStatus = 'new' | 'registered' | 'rejected'
export type FinanceStatus = 'calculated' | 'confirmed' | 'paid'
export type FindingStatus = 'open' | 'closed'
export type CarePlan = {
  assessment?: string
  goal: string
  specialist: string
  reviewDate: string
  outcome?: string
  disposition?: 'closed' | 'continued' | 'changed' | 'redirected'
}
export type History = { date: string; label: string }
export type SetupStatus = 'active' | 'planned' | 'paused'
export const setupStatusLabels: Record<SetupStatus, string> = {
  active: 'Faol', planned: 'Rejada', paused: 'Vaqtincha yopilgan',
}
export const provinceNames = {
  andijon: 'Andijon viloyati', namangan: 'Namangan viloyati', fargona: 'Farg‘ona viloyati',
  karakalpakstan: 'Qoraqalpog‘iston Respublikasi', xorazm: 'Xorazm viloyati', navoiy: 'Navoiy viloyati',
  surxondaryo: 'Surxondaryo viloyati', samarqand: 'Samarqand viloyati', 'toshkent-v': 'Toshkent viloyati',
  sirdaryo: 'Sirdaryo viloyati', jizzax: 'Jizzax viloyati', buxoro: 'Buxoro viloyati',
  qashqadaryo: 'Qashqadaryo viloyati', 'toshkent-sh': 'Toshkent shahri',
} as const

export interface Center {
  id: string
  name: string
  region: string
  address: string
  director: string
  status: SetupStatus
  code?: string
  district?: string
  phone?: string
  hours?: string
  document?: string
}

export interface Room {
  id: string
  centerId: string
  name: string
  accessible: boolean
  equipment: string
  status?: SetupStatus
  code?: string
  floor?: string
  area?: number
  notes?: string
}

export interface StaffMember {
  id: string
  centerId: string
  name: string
  position: string
  qualification: string
  validUntil: string
  active: boolean
}

export interface Placement {
  id: string
  roomId: string
  serviceId: ServiceId
  capacity: number
  schedule: string
  operator: 'center' | 'partner'
  providerId?: string
  status?: SetupStatus
  staffId?: string
  sourceRef?: string
}

export interface ProviderApplication {
  id: string
  placementId: string
  name: string
  qualificationRef: string
  submitted: string
  status: ProviderStatus
  decision?: string
  group?: string[]
  lease?: { number: string; from: string; to: string; started?: string }
}

export interface Referral {
  id: string
  placementId: string
  beneficiary: string
  residence: string
  issuer: string
  channel: string
  funding: 'preferential' | 'paid'
  reference: string
  voucherRef?: string
  reserveSeat?: boolean
  created: string
  status: ReferralStatus
  plan?: CarePlan
  previousPlans?: CarePlan[]
  history: History[]
}

export interface PersonProfile {
  id: string
  fullName: string
  birthDate?: string
  residence?: string
  identifierMasked?: string
  phoneMasked?: string
  representative?: { fullName: string; relationship: string; phoneMasked?: string }
}

export interface Visit {
  id: string
  referralId: string
  date: string
  minutes: number
  evidence: string
  verification?: 'face-id' | 'act'
  confirmedBy?: 'beneficiary' | 'representative'
  recordedBy?: string
  recordedAt?: string
  reason?: string
  voucherRef?: string
}

export interface CapacityPassport {
  id: string
  placementId: string
  voucher: number
  paid: number
  effectiveFrom: string
  createdBy: string
  approvedBy?: string
  approvedAt?: string
  rejectedBy?: string
  rejectedAt?: string
}

export interface Finding {
  id: string
  placementId: string
  date: string
  kind: 'inspection' | 'complaint' | 'feedback'
  note: string
  due: string
  status: FindingStatus
  score?: number
  resolution?: string
}

export interface FinanceRecord {
  id: string
  visitId: string
  kind: 'subsidy' | 'compensation' | 'income'
  amount: number
  reference: string
  status: FinanceStatus
}

export interface CenterState {
  centers: Center[]
  rooms: Room[]
  staff: StaffMember[]
  placements: Placement[]
  providers: ProviderApplication[]
  referrals: Referral[]
  visits: Visit[]
  passports: CapacityPassport[]
  findings: Finding[]
  finance: FinanceRecord[]
  people?: PersonProfile[]
  setupHistory?: SetupHistory[]
}

export interface SetupHistory {
  id: string
  at: string
  actor: string
  centerId: string
  entity: string
  label: string
  changes: { label: string; from: string; to: string }[]
}

export const referralLabels: Record<ReferralStatus, string> = {
  new: 'Yangi', queued: 'Navbatda', referred: 'Yo‘naltirilgan',
  active: 'Xizmatda', closed: 'Yakunlangan', rejected: 'Rad etilgan',
}
export const providerLabels: Record<ProviderStatus, string> = {
  new: 'Ko‘rib chiqilmoqda', registered: 'Reyestrga kiritilgan', rejected: 'Rad etilgan',
}
export const financeLabels: Record<FinanceStatus, string> = {
  calculated: 'Hisoblangan', confirmed: 'Tasdiqlangan', paid: 'To‘langan',
}
export const financeKinds: Record<FinanceRecord['kind'], string> = {
  subsidy: 'Subsidiya', compensation: 'Kompensatsiya', income: 'Pullik xizmat tushumi',
}
export const findingKinds: Record<Finding['kind'], string> = {
  inspection: 'Tekshiruv', complaint: 'Shikoyat', feedback: 'Qoniqish bahosi',
}

export function today() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-')
}

export function relativeDate(date: string, days: number) {
  const result = new Date(`${date}T00:00:00Z`)
  result.setUTCDate(result.getUTCDate() + days)
  return result.toISOString().slice(0, 10)
}

export function workingDayDeadline(date: string, days: number) {
  const result = new Date(`${date}T00:00:00Z`)
  while (days > 0) {
    result.setUTCDate(result.getUTCDate() + 1)
    if (result.getUTCDay() !== 0 && result.getUTCDay() !== 6) days--
  }
  return result.toISOString().slice(0, 10)
}

export function leaseStartDeadline(date: string) {
  const result = new Date(`${date}T00:00:00Z`)
  const day = result.getUTCDate()
  result.setUTCDate(1)
  result.setUTCMonth(result.getUTCMonth() + 3, 0)
  result.setUTCDate(Math.min(day, result.getUTCDate()))
  return result.toISOString().slice(0, 10)
}

export function serviceName(serviceId: ServiceId) {
  return services.find(service => service.id === serviceId)?.title ?? '—'
}

export function centerFor(state: CenterState, placementId: string) {
  const placement = state.placements.find(item => item.id === placementId)
  const room = state.rooms.find(item => item.id === placement?.roomId)
  return state.centers.find(item => item.id === room?.centerId)
}

export function reservesSeat(referral: Referral) {
  return referral.reserveSeat !== false && (referral.status === 'referred' || referral.status === 'active')
}

export function seatsUsed(state: CenterState, placementId: string) {
  return state.referrals.filter(item => item.placementId === placementId && reservesSeat(item)).length
}

export function isOperational(state: CenterState, placement: Placement, date = today()) {
  if ((placement.status ?? 'active') !== 'active') return false
  if ((state.rooms.find(item => item.id === placement.roomId)?.status ?? 'active') !== 'active') return false
  if (centerFor(state, placement.id)?.status !== 'active') return false
  if (placement.operator === 'center') return true
  const provider = state.providers.find(item => item.id === placement.providerId)
  return provider?.status === 'registered' && !!provider.lease
    && !!provider.lease.started && provider.lease.started <= date
    && provider.lease.from <= date && date <= provider.lease.to
}

function servicePlacements(state: CenterState, placementId: string) {
  const serviceId = state.placements.find(item => item.id === placementId)?.serviceId
  const centerId = centerFor(state, placementId)?.id
  if (!serviceId || !centerId) return []
  const roomIds = new Set(state.rooms.filter(room => room.centerId === centerId).map(room => room.id))
  return state.placements.filter(item => item.serviceId === serviceId && roomIds.has(item.roomId))
}

export function queueFor(state: CenterState, placementId: string) {
  const placementIds = new Set(servicePlacements(state, placementId).map(item => item.id))
  return state.referrals.filter(item => placementIds.has(item.placementId) && item.status === 'queued')
    .sort((first, second) => first.created.localeCompare(second.created))
}

function transition(referral: Referral, status: ReferralStatus, note?: string) {
  referral.status = status
  referral.history.push({ date: today(), label: note ? `${referralLabels[status]} · ${note}` : referralLabels[status] })
}

export function fillVacancies(state: CenterState, placementId: string) {
  const locations = servicePlacements(state, placementId).filter(item => isOperational(state, item))
  for (const referral of queueFor(state, placementId)) {
    const eligible = locations.filter(item => seatsUsed(state, item.id) < item.capacity)
    const assigned = eligible.find(item => item.id === referral.placementId) ?? eligible[0]
    if (!assigned) break
    referral.placementId = assigned.id
    transition(referral, 'referred', 'Bo‘sh o‘rin ajratildi')
  }
}

export function reviewReferral(state: CenterState, referral: Referral) {
  if (referral.status !== 'new') throw new Error('Faqat yangi murojaat ko‘rib chiqiladi.')
  const placement = state.placements.find(item => item.id === referral.placementId)
  if (!placement || !isOperational(state, placement)) throw new Error('Xizmat joyi hali faol emas.')
  transition(referral, 'queued')
  fillVacancies(state, placement.id)
}

export function rejectReferral(state: CenterState, referral: Referral, reason: string) {
  if (!['new', 'queued', 'referred'].includes(referral.status)) throw new Error('Bu holatda rad etib bo‘lmaydi.')
  transition(referral, 'rejected', reason)
  fillVacancies(state, referral.placementId)
}

export function startReferral(state: CenterState, referral: Referral) {
  const placement = state.placements.find(item => item.id === referral.placementId)
  if (referral.status !== 'referred' || !referral.plan) throw new Error('Xizmatni boshlash uchun yo‘llanma va reja kerak.')
  if (!placement || !isOperational(state, placement)) throw new Error('Xizmat joyi hozir faol emas.')
  transition(referral, 'active')
}

export function closeReferral(state: CenterState, referral: Referral, outcome: string, disposition: NonNullable<CarePlan['disposition']>) {
  if (referral.status !== 'active' || !referral.plan) throw new Error('Yakunlash uchun faol xizmat rejasi kerak.')
  referral.plan.outcome = outcome
  referral.plan.disposition = disposition
  if (disposition === 'continued' || disposition === 'changed') {
    referral.history.push({ date: today(), label: outcomeLabels[disposition] })
    return
  }
  transition(referral, 'closed', outcomeLabels[disposition])
  fillVacancies(state, referral.placementId)
}

export const outcomeLabels: Record<NonNullable<CarePlan['disposition']>, string> = {
  closed: 'Xizmat tugatildi',
  continued: 'Davom ettirish tavsiya etildi',
  changed: 'Xizmat shaklini o‘zgartirish tavsiya etildi',
  redirected: 'Boshqa xizmatga yo‘naltirish tavsiya etildi',
}
