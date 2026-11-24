import { ref } from 'vue'
import { withinScope, type AreaScope } from './geography'
import type { ZoneFilter } from './demo-families'

export const stages = [
  { id: 'planned', label: 'Rejalashtirilgan' },
  { id: 'active', label: 'Ijroda' },
  { id: 'done', label: 'Yakunlangan' },
] as const
export type PlanStage = typeof stages[number]['id']

export interface PlanTarget {
  scope: AreaScope
  zone: ZoneFilter
  families: number
  family?: number
  person?: string
  title: string
}

export interface PlanInput {
  measure: string
  agency: string
  assignee: string
  due: string
  notes: string
}

export interface Intervention extends PlanInput {
  id: string
  target: PlanTarget
  stage: PlanStage
  opened: string
  started?: string
  closed?: string
  outcome?: string
}

const storageKey = 'nasp-family-monitor-interventions-v1'
const assessmentKey = 'nasp-family-monitor-assessments-v1'
export interface CaseAssessment {
  need: string
  date: string
}
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Tashkent' })

export function formatDate(date: string) {
  const parsed = new Date(date.length === 10 ? date + 'T12:00:00+05:00' : date)
  return Number.isFinite(parsed.getTime()) ? dateFormat.format(parsed).split('/').join('.') : '—'
}

export function todayInTashkent(date = new Date()) {
  const parts = dateFormat.formatToParts(date)
  const get = (part: Intl.DateTimeFormatPartTypes) => parts.find(item => item.type === part)?.value
  return [get('year'), get('month'), get('day')].join('-')
}

export function overdue(plan: Intervention) {
  return plan.stage !== 'done' && plan.due < todayInTashkent()
}

function restore(): Intervention[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter(item => item && typeof item.id === 'string' && item.target?.scope
      && stages.some(stage => stage.id === item.stage) && typeof item.due === 'string')
  } catch {
    return []
  }
}

export function useInterventions() {
  const items = ref<Intervention[]>(restore())
  const assessments = ref<Record<string, CaseAssessment>>({})
  try {
    const saved = JSON.parse(window.localStorage.getItem(assessmentKey) ?? '{}')
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) assessments.value = saved
  } catch { /* The prototype still works if browser storage is unavailable. */ }
  const storageWarning = ref(false)

  function assess(key: string, need: string) {
    if (!need.trim()) return
    assessments.value = { ...assessments.value, [key]: { need: need.trim(), date: todayInTashkent() } }
    try {
      window.localStorage.setItem(assessmentKey, JSON.stringify(assessments.value))
      storageWarning.value = false
    } catch {
      storageWarning.value = true
    }
  }

  function persist(next: Intervention[]) {
    items.value = next
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next))
      storageWarning.value = false
    } catch {
      storageWarning.value = true
    }
  }

  function create(target: PlanTarget, input: PlanInput) {
    const id = crypto.randomUUID()
    const plan: Intervention = { id, target: { ...target, scope: { ...target.scope } }, ...input, stage: 'planned', opened: new Date().toISOString() }
    persist([plan, ...items.value])
    return plan
  }

  function advance(id: string, outcome = '') {
    const current = items.value.find(plan => plan.id === id)
    if (!current || current.stage === 'done' || (current.stage === 'active' && !outcome.trim())) return
    const now = new Date().toISOString()
    const next: Intervention = current.stage === 'planned'
      ? { ...current, stage: 'active', started: now }
      : { ...current, stage: 'done', closed: now, outcome: outcome.trim() }
    persist(items.value.map(plan => plan.id === id ? next : plan))
  }

  function atScope(scope: AreaScope) {
    return items.value.filter(plan => withinScope(scope, plan.target.scope))
  }

  return { items, storageWarning, create, advance, atScope, assessments, assess }
}
