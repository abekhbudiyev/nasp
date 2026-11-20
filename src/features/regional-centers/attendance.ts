import { centerFor, isOperational, referralLabels, today } from './model'
import type { CapacityPassport, CenterState, Placement, Referral, ServiceId, Visit } from './model'

export const fundingLabels = { voucher: 'Vaucherli', paid: 'Pullik', unknown: 'Turi aniqlanmagan' } as const
export const verificationLabels = { 'face-id': 'Face ID (demo)', act: 'Elektron dalolatnoma (demo)' } as const
export type Funding = Exclude<keyof typeof fundingLabels, 'unknown'>
export type RegionalActor = { name: string; curator: boolean }

export interface DailyVisit {
  id: string
  beneficiary: string
  serviceId: ServiceId
  date: string
  placementId: string
  funding: Funding | 'unknown'
  confirmations: Visit[]
}

export function dailyVisits(state: CenterState, visits: readonly Visit[] = state.visits) {
  const referrals = new Map(state.referrals.map(item => [item.id, item]))
  const placements = new Map(state.placements.map(item => [item.id, item]))
  const days = new Map<string, DailyVisit>()
  for (const visit of visits) {
    const referral = referrals.get(visit.referralId)
    const placement = placements.get(referral?.placementId ?? '')
    if (!referral || !placement) continue
    const funding = referral.funding === 'paid' ? 'paid'
      : visit.voucherRef || (visit.verification && referral.voucherRef) ? 'voucher' : 'unknown'
    const id = [referral.beneficiary, placement.serviceId, visit.date].join(':')
    const existing = days.get(id)
    if (existing) {
      existing.confirmations.push(visit)
      if (existing.funding === 'unknown') existing.funding = funding
    } else {
      days.set(id, {
        id, beneficiary: referral.beneficiary, serviceId: placement.serviceId, date: visit.date,
        placementId: placement.id, funding, confirmations: [visit],
      })
    }
  }
  return [...days.values()]
}

export function canUseAct(service: ServiceId) {
  return service === 'adult-day' || service === 'adult-rehab'
}

export function approvedPassport(state: CenterState, placementId: string, date: string) {
  return state.passports.reduce<CapacityPassport | undefined>((current, item) => {
    if (item.placementId !== placementId || !item.approvedAt || item.effectiveFrom > date) return current
    if (!current || item.effectiveFrom > current.effectiveFrom
      || (item.effectiveFrom === current.effectiveFrom && item.approvedAt >= (current.approvedAt ?? ''))) return item
    return current
  }, undefined)
}

export function isPendingPassport(item: CapacityPassport) {
  return !item.approvedAt && !item.rejectedAt
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}

export function draftPassport(state: CenterState, actor: RegionalActor, values: {
  placementId: string; voucher: number; paid: number; effectiveFrom: string
}) {
  const placement = state.placements.find(item => item.id === values.placementId)
  if (!placement) throw new Error('Xizmat joyini tanlang.')
  const quantities = [values.voucher, values.paid]
  if (quantities.some(value => !Number.isInteger(value) || value < 0 || value > 10_000)
    || values.voucher + values.paid === 0) throw new Error('Kvotalarni to‘g‘ri kiriting. Jami kamida bitta o‘rin bo‘lishi kerak.')
  if (values.voucher + values.paid > placement.capacity) throw new Error('Jami kvota xizmat joyining quvvatidan oshishi mumkin emas.')
  if (!validDate(values.effectiveFrom) || values.effectiveFrom < today()) throw new Error('Amal qilish sanasi bugundan oldin bo‘lishi mumkin emas.')
  if (state.passports.some(item => item.placementId === values.placementId && isPendingPassport(item))) {
    throw new Error('Bu xizmat joyi uchun tasdiqlash kutilayotgan pasport bor.')
  }
  state.passports.push({ id: crypto.randomUUID(), ...values, createdBy: actor.name })
}

export function decidePassport(state: CenterState, actor: RegionalActor, id: string, approve: boolean) {
  if (!actor.curator) throw new Error('Pasport bo‘yicha qarorni faqat kurator qayd etadi.')
  const item = state.passports.find(item => item.id === id && isPendingPassport(item))
  if (!item) throw new Error('Tasdiqlanadigan pasport topilmadi.')
  if (!approve) {
    item.rejectedAt = new Date().toISOString()
    item.rejectedBy = actor.name
    return
  }
  if (item.effectiveFrom < today()) throw new Error('Pasport sanasi o‘tgan. Yangi loyiha kiriting.')
  const placement = state.placements.find(row => row.id === item.placementId)
  if (!placement || item.voucher + item.paid > placement.capacity) {
    throw new Error('Jami kvota joriy quvvatga mos kelmaydi. Pasportni rad etib, yangisini yuboring.')
  }
  item.approvedAt = new Date().toISOString()
  item.approvedBy = actor.name
}

export interface Confirmation {
  referralId: string
  placementId: string
  beneficiary: string
  residence: string
  funding: Funding
  date: string
  minutes: number
  evidence: string
  verification: NonNullable<Visit['verification']>
  confirmedBy: NonNullable<Visit['confirmedBy']>
  reason: string
  voucherRef: string
}

export function recordConfirmation(state: CenterState, actor: RegionalActor, entry: Confirmation) {
  const now = today()
  if (!validDate(entry.date) || entry.date > now) throw new Error('Tashrif sanasi bugundan keyin bo‘lishi mumkin emas.')
  if (entry.date < now && (!actor.curator || !entry.reason.trim())) {
    throw new Error('O‘tgan sana uchun faqat kurator sabab ko‘rsatgan holda qayd kiritadi.')
  }
  const referral = state.referrals.find(item => item.id === entry.referralId)
  if (entry.referralId && !referral) throw new Error('Xizmat oluvchi yozuvi topilmadi.')
  const placement = state.placements.find(item => item.id === (referral?.placementId ?? entry.placementId))
  if (!placement || !isOperational(state, placement, entry.date)) throw new Error('Shu sanada faol xizmat joyini tanlang.')
  if (!Number.isInteger(entry.minutes) || entry.minutes < 1 || entry.minutes > 1440) throw new Error('Davomiylik 1 dan 1440 daqiqagacha bo‘lishi kerak.')
  if (entry.verification !== 'face-id' && !(entry.verification === 'act' && canUseAct(placement.serviceId))) {
    throw new Error('Bu xizmat uchun mos tasdiq turini tanlang.')
  }
  const beneficiary = (referral?.beneficiary ?? entry.beneficiary).trim().toUpperCase()
  if (!/^[A-Z0-9-]{3,24}$/.test(beneficiary) || /^\d{14}$/.test(beneficiary)) throw new Error('Haqiqiy JSHSHIR o‘rniga NAM-109 kabi demo kod kiriting.')
  const evidence = entry.evidence.trim()
  if (!evidence) throw new Error('Tasdiq identifikatorini kiriting.')
  if (state.visits.some(item => item.evidence.toUpperCase() === evidence.toUpperCase())) throw new Error('Bu tasdiq avval qayd etilgan.')
  const previous = dailyVisits(state).find(item =>
    item.beneficiary === beneficiary && item.serviceId === placement.serviceId && item.date === entry.date)
  if (previous && (previous.placementId !== placement.id
    || (previous.funding !== 'unknown' && previous.funding !== entry.funding))) {
    throw new Error('Bu xizmat bo‘yicha shu sanadagi tashrif boshqa joy yoki to‘lov turida qayd etilgan.')
  }
  if (previous && previous.confirmations.reduce((sum, item) => sum + item.minutes, entry.minutes) > 1440) {
    throw new Error('Kunlik jami davomiylik 1440 daqiqadan oshmasligi kerak.')
  }
  let visitReferral = referral ?? state.referrals.find(item =>
    item.beneficiary === beneficiary && item.placementId === placement.id && item.funding === 'paid' && item.status === 'active')
  const voucherRef = (visitReferral?.voucherRef || entry.voucherRef).trim()
  if (entry.funding === 'voucher' && (!visitReferral || visitReferral.funding !== 'preferential' || !voucherRef)) {
    throw new Error('Vaucherli tashrif uchun «Inson»dagi faol yo‘llanma va vaucher raqami kerak.')
  }
  if (visitReferral) {
    if (visitReferral.status !== 'active') throw new Error('Tashrif faqat faol xizmatga qayd etiladi.')
    if ((entry.funding === 'paid') !== (visitReferral.funding === 'paid')) throw new Error('To‘lov turi murojaatga mos kelmadi.')
    const start = visitReferral.history.find(item => item.label === referralLabels.active)?.date ?? visitReferral.created
    if (entry.date < start) throw new Error('Tashrif sanasi xizmat boshlangan kundan oldin.')
    if (entry.funding === 'voucher') visitReferral.voucherRef = voucherRef
  } else {
    if (!entry.residence.trim()) throw new Error('Bevosita murojaat uchun yashash hududini kiriting.')
    const id = crypto.randomUUID()
    visitReferral = {
      id, placementId: placement.id, beneficiary, residence: entry.residence.trim(), issuer: '',
      channel: 'Hududiy markaz', funding: 'paid', reserveSeat: false, reference: `HX-${id.slice(0, 8).toUpperCase()}`,
      created: entry.date, status: 'active', history: [{ date: entry.date, label: 'Bevosita pullik murojaat' }, { date: entry.date, label: referralLabels.active }],
    } satisfies Referral
    state.referrals.push(visitReferral)
  }
  state.visits.push({
    id: crypto.randomUUID(), referralId: visitReferral.id, date: entry.date, minutes: entry.minutes, evidence,
    verification: entry.verification, confirmedBy: entry.confirmedBy, recordedBy: actor.name,
    recordedAt: new Date().toISOString(), reason: entry.reason.trim() || undefined,
    voucherRef: entry.funding === 'voucher' ? voucherRef : undefined,
  })
}

export function quotaRows(state: CenterState, placements: Placement[], days: DailyVisit[], date: string) {
  const counts = new Map<string, Record<DailyVisit['funding'], number>>()
  for (const visit of days) {
    if (visit.date !== date) continue
    const count = counts.get(visit.placementId) ?? { voucher: 0, paid: 0, unknown: 0 }
    count[visit.funding]++
    counts.set(visit.placementId, count)
  }
  return placements.flatMap(placement => {
    const actual = counts.get(placement.id) ?? { voucher: 0, paid: 0, unknown: 0 }
    if (!isOperational(state, placement, date) && actual.voucher + actual.paid + actual.unknown === 0) return []
    const passport = approvedPassport(state, placement.id, date)
    const alerts: string[] = []
    if (!passport) alerts.push('Quvvat pasporti tasdiqlanmagan')
    else {
      if (actual.voucher > passport.voucher || actual.paid > passport.paid) alerts.push('Kunlik kvotadan oshgan')
      if (passport.paid > 0 && passport.voucher > 0 && actual.voucher >= passport.voucher && actual.paid === 0 && actual.unknown === 0) {
        alerts.push('Vaucherli o‘rinlar to‘liq, pullik tashrif 0')
      }
    }
    if (actual.unknown) alerts.push(`${actual.unknown} ta tashrifning to‘lov turi aniqlanmagan`)
    return [{ placement, center: centerFor(state, placement.id), passport, actual, alerts }]
  })
}
