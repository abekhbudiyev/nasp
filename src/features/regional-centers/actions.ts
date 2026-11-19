import {
  centerFor, closeReferral, fillVacancies, isOperational, rejectReferral, seatsUsed, services, today,
} from './model'
import type {
  CarePlan, Center, CenterState, FinanceRecord, Finding, Placement, ProviderApplication, Referral, Room, ServiceId, StaffMember,
} from './model'

export type Editor = 'center' | 'room' | 'staff' | 'placement' | 'provider' | 'decision' | 'lease'
  | 'referral' | 'plan' | 'reject' | 'close' | 'finding' | 'resolve' | 'finance'

export function applyEditor(data: CenterState, activeEditor: Editor, id: string, values: Record<string, string>) {
  const get = (key: string) => values[key] ?? ''
  const date = today()
  switch (activeEditor) {
    case 'center': {
      const existing = data.centers.find(item => item.id === id)
      const status = get('status') as Center['status']
      if (status === 'planned' && data.placements.some(item =>
        centerFor(data, item.id)?.id === id && seatsUsed(data, item.id) > 0)) {
        throw new Error('Band o‘rinlari bor markazni reja holatiga o‘tkazib bo‘lmaydi.')
      }
      const record: Center = { id, name: get('name'), region: get('region'), address: get('address'), director: get('director'), status }
      if (existing) Object.assign(existing, record)
      else data.centers.push(record)
      data.placements.filter(item => centerFor(data, item.id)?.id === id)
        .forEach(item => fillVacancies(data, item.id))
      break
    }
    case 'room': {
      const existing = data.rooms.find(item => item.id === id)
      const centerId = get('centerId')
      if (!data.centers.some(center => center.id === centerId)) throw new Error('Markaz topilmadi.')
      if (existing && existing.centerId !== centerId && data.placements.some(item => item.roomId === id)) {
        throw new Error('Xizmat biriktirilgan xonani boshqa markazga ko‘chirib bo‘lmaydi.')
      }
      if (data.rooms.some(item => item.id !== id && item.centerId === centerId && item.name.toLowerCase() === get('name').toLowerCase())) {
        throw new Error('Bu markazda shu nomli xona mavjud.')
      }
      const record: Room = { id: existing?.id ?? crypto.randomUUID(), centerId, name: get('name'), accessible: get('accessible') === 'yes', equipment: get('equipment') }
      if (existing) Object.assign(existing, record)
      else data.rooms.push(record)
      break
    }
    case 'staff': {
      const existing = data.staff.find(item => item.id === id)
      const centerId = get('centerId')
      if (!data.centers.some(center => center.id === centerId)) throw new Error('Markaz topilmadi.')
      const record: StaffMember = {
        id: existing?.id ?? crypto.randomUUID(), centerId, name: get('name'), position: get('position'),
        qualification: get('qualification'), validUntil: get('validUntil'), active: get('active') === 'yes',
      }
      if (existing) Object.assign(existing, record)
      else data.staff.push(record)
      break
    }
    case 'placement': {
      const existing = data.placements.find(item => item.id === id)
      const record: Placement = {
        id, roomId: get('roomId'), serviceId: get('serviceId') as ServiceId, capacity: Number(get('capacity')),
        schedule: get('schedule'), operator: get('operator') as Placement['operator'], providerId: existing?.providerId,
      }
      if (!data.rooms.some(item => item.id === record.roomId) || !services.some(item => item.id === record.serviceId)) {
        throw new Error('Xona va xizmatni tanlang.')
      }
      if (!Number.isInteger(record.capacity) || record.capacity < 1 || record.capacity > 10_000) {
        throw new Error('O‘rinlar soni 1 dan 10 000 gacha butun son bo‘lishi kerak.')
      }
      if (record.operator === 'center' && ['early', 'daycare', 'protection'].includes(record.serviceId)) {
        throw new Error('Bu xizmat uchun huquqi tasdiqlangan nodavlat ko‘rsatuvchi biriktiriladi.')
      }
      if (data.placements.some(item => item.id !== id && item.roomId === record.roomId)) {
        throw new Error('Bu xonaga xizmat joyi biriktirilgan.')
      }
      if (record.capacity < seatsUsed(data, id)) throw new Error('Quvvat band o‘rinlardan kam bo‘lishi mumkin emas.')
      const hasHistory = data.referrals.some(item => item.placementId === id) || data.providers.some(item => item.placementId === id)
        || data.findings.some(item => item.placementId === id)
      if (existing && hasHistory && (record.roomId !== existing.roomId || record.serviceId !== existing.serviceId || record.operator !== existing.operator)) {
        throw new Error('Bog‘langan yozuvlar bor. Boshqa xona, xizmat yoki ijrochi uchun yangi xizmat joyi oching.')
      }
      if (existing) Object.assign(existing, record)
      else data.placements.push(record)
      fillVacancies(data, id)
      break
    }
    case 'provider': {
      const placementId = get('placementId')
      const placement = data.placements.find(item => item.id === placementId)
      if (!placement || placement.operator !== 'partner' || placement.providerId) throw new Error('Tanlov uchun bo‘sh xizmat joyini tanlang.')
      if (data.providers.some(item => item.placementId === placementId && item.status === 'new' && item.qualificationRef === get('qualificationRef'))) {
        throw new Error('Shu hujjat bilan so‘rovnoma allaqachon yuborilgan.')
      }
      data.providers.push({ id, placementId, name: get('name'), qualificationRef: get('qualificationRef'), submitted: date, status: 'new' })
      break
    }
    case 'decision': {
      const item = data.providers.find(row => row.id === id)
      const placement = data.placements.find(row => row.id === item?.placementId)
      if (!item || !placement || item.status !== 'new') throw new Error('Talabgor qayta ko‘rib chiqilmaydi.')
      const status = get('status') as ProviderApplication['status']
      if (status === 'registered' && placement.providerId) throw new Error('Bu xona bo‘yicha ko‘rsatuvchi tanlangan.')
      if (hasCompetition(data, item)) {
        const group = [get('director'), get('member1'), get('member2')]
        if (group.some(member => !member) || new Set(group.map(member => member.toLowerCase())).size !== 3) {
          throw new Error('Markaz direktori va yana ikki nafar guruh a’zosini kiriting.')
        }
        item.group = group
      }
      item.status = status
      item.decision = get('decision')
      if (status === 'registered') placement.providerId = id
      break
    }
    case 'lease': {
      const item = data.providers.find(row => row.id === id)
      if (item?.status !== 'registered') throw new Error('Ijara uchun talabgor reyestrga kiritilgan bo‘lishi kerak.')
      if (get('to') < get('from')) throw new Error('Tugash sanasi boshlanish sanasidan oldin bo‘lishi mumkin emas.')
      const started = get('started')
      if (started && (started < get('from') || started > get('to') || started > date)) {
        throw new Error('Faoliyat boshlangan sana ijara davrida bo‘lishi va bugundan o‘tmasligi kerak.')
      }
      if (seatsUsed(data, item.placementId) > 0 && (!started || get('from') > date || get('to') < date)) {
        throw new Error('Band o‘rinlari bor xizmat joyining faol ijara davrini saqlang.')
      }
      item.lease = { number: get('number'), from: get('from'), to: get('to'), started: started || undefined }
      fillVacancies(data, item.placementId)
      break
    }
    case 'referral': {
      const placementId = get('placementId')
      const beneficiary = get('beneficiary').toUpperCase()
      const placement = data.placements.find(item => item.id === placementId)
      if (!placement || !isOperational(data, placement)) throw new Error('Faol xizmat joyini tanlang.')
      if (!/^[A-Z0-9-]{3,24}$/.test(beneficiary) || /^\d{14}$/.test(beneficiary)) throw new Error('NAM-109 kabi demo kod kiriting.')
      const sameService = new Set(data.placements.filter(item => item.serviceId === placement.serviceId
        && centerFor(data, item.id)?.id === centerFor(data, placementId)?.id).map(item => item.id))
      if (data.referrals.some(item => sameService.has(item.placementId) && item.beneficiary === beneficiary
        && !['closed', 'rejected'].includes(item.status))) throw new Error('Bu xizmat oluvchi uchun ochiq murojaat mavjud.')
      data.referrals.push({
        id, placementId, beneficiary, residence: get('residence'), issuer: get('issuer'), channel: get('channel'),
        funding: get('funding') as Referral['funding'], reference: get('reference'), created: date,
        status: 'new', history: [{ date, label: 'Murojaat qayd etildi' }],
      })
      break
    }
    case 'plan': {
      const item = data.referrals.find(row => row.id === id)
      if (!item || !['referred', 'active'].includes(item.status)) throw new Error('Reja faqat yo‘naltirilgan yoki faol xizmatga kiritiladi.')
      const plan: CarePlan = { assessment: get('assessment'), goal: get('goal'), specialist: get('specialist'), reviewDate: get('reviewDate') }
      if (plan.reviewDate < date) throw new Error('Baholash sanasi bugundan oldin bo‘lishi mumkin emas.')
      item.history.push({ date, label: item.plan ? 'Individual reja yangilandi' : 'Individual reja tuzildi' })
      if (item.plan) (item.previousPlans ??= []).push(item.plan)
      item.plan = plan
      break
    }
    case 'reject':
    case 'close': {
      const item = data.referrals.find(row => row.id === id)
      if (!item) throw new Error('Yo‘llanma topilmadi.')
      if (activeEditor === 'reject') rejectReferral(data, item, get('reason'))
      else closeReferral(data, item, get('outcome'), get('disposition') as NonNullable<CarePlan['disposition']>)
      break
    }
    case 'finding': {
      const kind = get('kind') as Finding['kind']
      const feedback = kind === 'feedback'
      const due = get('due')
      const placementId = get('placementId')
      if (!data.placements.some(item => item.id === placementId)) throw new Error('Xizmat joyi topilmadi.')
      if (!feedback && due < date) throw new Error('Bartaraf etish muddatini bugundan oldinga qo‘yish mumkin emas.')
      data.findings.push({
        id, placementId, kind, date, note: get('note'), due,
        status: feedback ? 'closed' : 'open', score: feedback ? Number(get('score')) : undefined,
      })
      break
    }
    case 'resolve': {
      const item = data.findings.find(row => row.id === id)
      if (item?.status !== 'open') throw new Error('Ochiq qayd topilmadi.')
      item.resolution = get('resolution')
      item.status = 'closed'
      break
    }
    case 'finance': {
      const visitId = get('visitId')
      const kind = get('kind') as FinanceRecord['kind']
      const amount = Number(get('amount'))
      const visit = data.visits.find(item => item.id === visitId)
      const referral = data.referrals.find(item => item.id === visit?.referralId)
      if (!referral || ((kind === 'income') !== (referral.funding === 'paid'))) throw new Error('To‘lov turi xizmat shartiga mos emas.')
      if (kind !== 'income' && !visit?.verification) throw new Error('To‘lov asosi uchun tashrifning tasdiq turi kerak.')
      if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Summa musbat butun son bo‘lishi kerak.')
      if (data.finance.some(item => item.visitId === visitId && item.kind === kind)) throw new Error('Bunday moliyaviy qayd mavjud.')
      data.finance.push({ id, visitId, kind, amount, reference: get('reference'), status: 'calculated' })
      break
    }
  }
}

export function hasCompetition(data: CenterState, item: ProviderApplication | undefined) {
  return !!item && data.providers.filter(row => row.placementId === item.placementId).length > 1
}
