export type CheckStatus = 'healthy' | 'degraded' | 'failed' | 'unknown'
export type SqlPeriod = '1h' | '24h' | '7d'

export interface UsageMetric {
  used: number
  capacity: number
  usedPercent: number
}

export interface MonitoringSnapshot {
  collectedAt: string
  servers: {
    id: string
    name: string
    status: CheckStatus
    cpuPercent: number | null
    ram: UsageMetric | null
    disk: UsageMetric | null
    filesystem: string
    diskIo: { readMiBps: number; writeMiBps: number } | null
    network: { receiveMbps: number; sendMbps: number } | null
  }[]
  checks: {
    id: string
    moduleId: string
    name: string
    kind: 'api' | 'business'
    status: CheckStatus
    responseMs: number | null
    httpStatus: number | null
    checkedAt: string | null
    reason: string | null
  }[]
  oracle: {
    name: string
    status: CheckStatus
    activeSessions: number | null
    blockedSessions: number | null
    tablespaces: { name: string; space: UsageMetric | null }[]
  } | null
  incidents: {
    id: string
    moduleId?: string
    severity: 'critical' | 'warning'
    target: string
    title: string
    startedAt: string
    detail: string
  }[]
}

export interface TopSqlReport {
  from: string
  to: string
  rows: { sqlId: string; label: string | null; executions: number; elapsedSeconds: number; cpuSeconds: number }[]
}
