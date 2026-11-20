import type { DailyVisit, quotaRows } from './attendance'
import { centerFor, isOperational, relativeDate, serviceName } from './model'
import type { CenterState, Placement, ReferralStatus } from './model'

type QuotaRow = ReturnType<typeof quotaRows>[number]
export type PortfolioDimension = 'region' | 'service'

export interface PortfolioRow {
  id: string
  title: string
  centers: number
  activePlaces: number
  visitors: number
  visits: number
  previousVisits: number
  voucher: number
  paid: number
  unknown: number
  signalCount: number
  stages: Record<ReferralStatus, number>
}

const dayMs = 86_400_000

export function previousPeriod(from: string, to: string) {
  const days = (Date.parse(to) - Date.parse(from)) / dayMs + 1
  if (!from || !to || !Number.isSafeInteger(days) || days < 1) return undefined
  return { from: relativeDate(from, -days), to: relativeDate(from, -1) }
}

export function portfolioRows(
  state: CenterState,
  placements: readonly Placement[],
  visits: readonly DailyVisit[],
  quotas: readonly QuotaRow[],
  range: { from: string; to: string; today: string },
  dimension: PortfolioDimension,
): PortfolioRow[] {
  const prior = previousPeriod(range.from, range.to)
  const locations = new Map<string, { row: PortfolioRow; centers: Set<string>; visitors: Set<string> }>()
  const byPlacement = new Map<string, string>()
  for (const placement of placements) {
    const center = centerFor(state, placement.id)
    if (!center) continue
    const id = dimension === 'region' ? center.region : placement.serviceId
    const title = dimension === 'region' ? center.region : serviceName(placement.serviceId)
    let entry = locations.get(id)
    if (!entry) {
      entry = {
        row: {
          id, title, centers: 0, activePlaces: 0, visitors: 0, visits: 0, previousVisits: 0,
          voucher: 0, paid: 0, unknown: 0, signalCount: 0,
          stages: { new: 0, queued: 0, referred: 0, active: 0, closed: 0, rejected: 0 },
        },
        centers: new Set(),
        visitors: new Set(),
      }
      locations.set(id, entry)
    }
    entry.centers.add(center.id)
    if (isOperational(state, placement, range.today)) entry.row.activePlaces++
    byPlacement.set(placement.id, id)
  }
  for (const visit of visits) {
    const entry = locations.get(byPlacement.get(visit.placementId) ?? '')
    if (!entry) continue
    if ((!range.from || visit.date >= range.from) && (!range.to || visit.date <= range.to)) {
      entry.row.visits++
      entry.row[visit.funding]++
      entry.visitors.add(visit.beneficiary)
    }
    if (prior && visit.date >= prior.from && visit.date <= prior.to) entry.row.previousVisits++
  }
  for (const referral of state.referrals) {
    const entry = locations.get(byPlacement.get(referral.placementId) ?? '')
    if (entry) entry.row.stages[referral.status]++
  }
  for (const quota of quotas) {
    const entry = locations.get(byPlacement.get(quota.placement.id) ?? '')
    if (entry) entry.row.signalCount += quota.alerts.length
  }
  return [...locations.values()].map(({ row, centers, visitors }) => ({ ...row, centers: centers.size, visitors: visitors.size }))
    .sort((first, second) => second.visits - first.visits || first.title.localeCompare(second.title, 'uz'))
}
