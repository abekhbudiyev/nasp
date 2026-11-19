import { createDemoData } from './demo'
import type { CenterState } from './model'

export const regionalCenterStorageKey = 'nasp.regional-centers.demo.v1'
const collections = ['centers', 'rooms', 'placements', 'providers', 'referrals', 'visits', 'findings', 'finance'] as const

export function loadState(): CenterState {
  const stored = localStorage.getItem(regionalCenterStorageKey)
  if (!stored) return createDemoData()
  const parsed = JSON.parse(stored) as CenterState | null
  if (!parsed || !collections.every(collection => Array.isArray(parsed[collection]))) {
    throw new Error('Saqlangan demo ma’lumotlarini o‘qib bo‘lmadi.')
  }
  const state = { ...parsed, staff: Array.isArray(parsed.staff) ? parsed.staff : [], passports: Array.isArray(parsed.passports) ? parsed.passports : [] }
  if (!Array.isArray(parsed.passports)) addExamplesToExistingDemo(state)
  return state
}

function addExamplesToExistingDemo(state: CenterState) {
  // Earlier demo data can contain user-edited records. Add the sample sites with new IDs.
  const examples = createDemoData()
  const centerIds = new Set(['buxoro', 'samarqand'].filter(id => !state.centers.some(item => item.id === id)))
  const rooms = examples.rooms.filter(item => centerIds.has(item.centerId))
  const placements = examples.placements.filter(item => rooms.some(room => room.id === item.roomId))
  const placementIds = new Set(placements.map(item => item.id))
  const referrals = examples.referrals.filter(item => placementIds.has(item.placementId))
  const referralIds = new Set(referrals.map(item => item.id))
  const visits = examples.visits.filter(item => referralIds.has(item.referralId))
  const visitIds = new Set(visits.map(item => item.id))
  state.centers.push(...examples.centers.filter(item => centerIds.has(item.id)))
  state.rooms.push(...rooms)
  state.placements.push(...placements)
  state.passports.push(...examples.passports.filter(item => placementIds.has(item.placementId)))
  state.referrals.push(...referrals)
  state.visits.push(...visits)
  state.finance.push(...examples.finance.filter(item => visitIds.has(item.visitId)))
  state.findings.push(...examples.findings.filter(item => placementIds.has(item.placementId)))
}

export async function changeState(change: (state: CenterState) => void) {
  const persist = () => {
    const state = loadState()
    change(state)
    localStorage.setItem(regionalCenterStorageKey, JSON.stringify(state))
    return state
  }
  return navigator.locks ? navigator.locks.request(regionalCenterStorageKey, persist) : persist()
}
