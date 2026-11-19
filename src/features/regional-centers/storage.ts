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
  return { ...parsed, staff: Array.isArray(parsed.staff) ? parsed.staff : [] }
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
