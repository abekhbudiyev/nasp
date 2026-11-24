import { appModules } from '@/features/apps/registry/apps'
import type { CheckStatus, MonitoringSnapshot } from './types'

export const monitoredModules = appModules.filter(module => module.enabled && module.id !== 'monitoring')
export const moduleNames = new Map(monitoredModules.map(module => [module.id, module.title]))

const statusPriority: CheckStatus[] = ['failed', 'degraded', 'unknown', 'healthy']

export function buildModuleCoverage(checks: MonitoringSnapshot['checks'], incidents: MonitoringSnapshot['incidents']) {
  return monitoredModules.map(module => {
    const moduleChecks = checks.filter(check => check.moduleId === module.id)
    const statuses = new Set(moduleChecks.map(check => check.status))
    const lastMeasurement = moduleChecks.reduce<number | null>((latest, check) => {
      if (!check.checkedAt) return latest
      const timestamp = Date.parse(check.checkedAt)
      return Number.isFinite(timestamp) && (latest === null || timestamp > latest) ? timestamp : latest
    }, null)

    return {
      module,
      lastMeasurement,
      checkCount: moduleChecks.length,
      status: statusPriority.find(status => statuses.has(status)),
      incidentCount: incidents.filter(incident => incident.moduleId === module.id).length,
    }
  })
}
