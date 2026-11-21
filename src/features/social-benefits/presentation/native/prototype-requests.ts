import { shallowRef } from 'vue'
import { data } from './data'
import { requestBatch, type LiveEvent } from './live-engine'

export type RequestStatus = LiveEvent['status'] | 'approved'
export type RequestAction = 'check' | 'approve' | 'deliver' | 'return' | 'retry' | 'reject'

export interface PrototypeRequest extends Omit<LiveEvent, 'status'> {
  status: RequestStatus
  familyId: string
  memberId: string
  measure: string
  history: { label: string; note?: string; at: string }[]
  relatedRequestId?: number
}

export const requestAgencyKeys = ['agency', 'pension', 'yoshlar', 'ayollar', 'bandlik'] as const
export const requestStatusLabels: Record<RequestStatus, string> = {
  processing: 'Tekshirilmoqda',
  approved: 'Tasdiqlandi',
  waiting: 'Ijro tasdig‘i kutilmoqda',
  delivered: 'Ijro yakunlandi',
  duplicate: 'Takroriy so‘rov rad etildi',
  returned: 'Idoraga qaytarildi',
}

const storageKey = 'nasp-social-prototype-requests-v1'
const fixtureDate = '2025-12-22T09:00:00+05:00'
export const formatRequestId = (id: number) => 'SR-' + String(id).padStart(5, '0')

function seedRequests(): PrototypeRequest[] {
  const batch = requestBatch().events
  return batch.map(event => {
    const duplicate = event.status === 'duplicate' || event.id === 27
    const related = duplicate ? batch.find(row => row.status === 'delivered' && row.kind === event.kind && row.agency === event.agency) : undefined
    const region = related?.region ?? event.region
    const family = data.families.find(item => item.region === region)!
    const measure = { payment: 'Ijtimoiy nafaqa to‘lovi', service: 'Ijtimoiy xizmat', benefit: 'Ijtimoiy imtiyoz' }[event.kind]
    const review = event.status === 'returned' ? 'Chora kodi aniqlashtirilishi kerak.' : undefined
    const history = [
      { label: 'So‘rov qabul qilindi', at: fixtureDate },
      ...(event.stage >= 2 ? [{ label: 'Tekshiruv yakunlandi', at: fixtureDate }] : []),
      ...(event.stage >= 3 ? [{ label: 'Tasdiqlandi', at: fixtureDate }] : []),
      { label: requestStatusLabels[event.status], note: review, at: fixtureDate },
    ]
    return {
      ...event, region, amount: related?.amount ?? event.amount, familyId: family.id,
      memberId: family.members[0]!.id, measure, history, relatedRequestId: related?.id,
    }
  })
}

function restoreRequests() {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (Array.isArray(stored) && stored.length >= 40 && stored.every(row =>
      typeof row?.id === 'number' && Object.prototype.hasOwnProperty.call(requestStatusLabels, row.status) && Array.isArray(row.history),
    )) return stored as PrototypeRequest[]
  } catch { /* The sample still works without browser storage. */ }
  return seedRequests()
}

const events = shallowRef(restoreRequests())

function store(next: PrototypeRequest[]) {
  events.value = next
  try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* The current session stays usable. */ }
}

function canPerform(request: PrototypeRequest, action: RequestAction) {
  const { status, stage, relatedRequestId } = request
  switch (action) {
    case 'check': return (status === 'processing' && stage < 2) || (status === 'waiting' && !!relatedRequestId)
    case 'approve': return status === 'processing' && stage === 2 && !relatedRequestId
    case 'deliver': return (status === 'approved' || status === 'waiting') && !relatedRequestId
    case 'return': return status === 'processing'
    case 'retry': return status === 'returned'
    case 'reject': return status === 'processing' && stage === 2 && !!relatedRequestId
  }
}

function perform(id: number, action: RequestAction, note?: string) {
  const request = events.value.find(item => item.id === id)
  if (!request || !canPerform(request, action)) return false
  const reason = note?.trim()
  if (['return', 'retry', 'reject'].includes(action) && !reason) return false

  const change: Record<RequestAction, { status: RequestStatus; stage: number; label: string }> = {
    check: { status: 'processing', stage: 2, label: 'Tekshiruv yakunlandi' },
    approve: { status: 'approved', stage: 3, label: 'Tasdiqlandi' },
    deliver: { status: 'delivered', stage: 4, label: 'Ijro tasdiqlandi' },
    return: { status: 'returned', stage: 1, label: 'Tuzatish uchun qaytarildi' },
    retry: { status: 'processing', stage: 0, label: 'Tuzatilib qayta yuborildi' },
    reject: { status: 'duplicate', stage: 2, label: 'Takroriy so‘rov rad etildi' },
  }
  const { status, stage, label } = change[action]
  const at = new Date().toISOString()
  store(events.value.map(item => item.id === id ? {
    ...item, status, stage, resolved: status === 'delivered',
    history: [...item.history, { label, note: reason, at }],
  } : item))
  return true
}

function createServiceRequest(familyId: string, memberId: string, measure: string, note: string) {
  const family = data.families.find(item => item.id === familyId && item.members.some(member => member.id === memberId))
  if (!family || !measure.trim() || !note.trim()) return
  const active = events.value.some(item => item.kind === 'service' && item.familyId === familyId &&
    item.memberId === memberId && item.measure === measure && ['processing', 'waiting', 'approved'].includes(item.status))
  if (active) return
  const id = Math.max(...events.value.map(item => item.id)) + 1
  store([...events.value, {
    id, familyId, memberId, measure, kind: 'service', amount: 0, region: family.region, agency: 0,
    status: 'processing', stage: 0, outcome: 'delivered', created: 0, updated: 0, resolved: false,
    history: [{ label: 'Ariza qabul qilindi', note: note.trim(), at: new Date().toISOString() }],
  }])
  return id
}

function reset() {
  store(seedRequests())
  try {
    for (const key of ['nasp-benefit-overlap-reviews', 'nasp-social-demo-applications-v2']) localStorage.removeItem(key)
  } catch { /* A storage restriction does not affect the current reset. */ }
}

export function requestTotals(items: readonly PrototypeRequest[]) {
  const counts: Record<RequestStatus, number> = { processing: 0, approved: 0, waiting: 0, duplicate: 0, returned: 0, delivered: 0 }
  let deliveredAmount = 0
  let duplicateAmount = 0
  let checked = 0
  for (const item of items) {
    counts[item.status]++
    if (item.stage >= 2) checked++
    if (item.status === 'delivered') deliveredAmount += item.amount
    if (item.status === 'duplicate') duplicateAmount += item.amount
  }
  return {
    ...counts, received: items.length, accepted: counts.approved + counts.waiting + counts.delivered,
    checked, deliveredAmount, duplicateAmount, regions: new Set(items.map(item => item.region)).size,
  }
}

export function usePrototypeRequests() {
  return { events, perform, canPerform, createServiceRequest, reset }
}
