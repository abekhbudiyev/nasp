export type CheckStatus = 'healthy' | 'degraded' | 'failed' | 'unknown'
export type SqlPeriod = '1h' | '24h' | '7d'
export type ApiDirection = 'internal' | 'inbound' | 'outbound'
export type ApiObservation = 'synthetic' | 'traffic' | 'sync'
export type ApiDataFlow = 'pull' | 'receive' | 'send'

export interface ApiCheck {
  id: string
  moduleId: string
  name: string
  direction: ApiDirection
  peer: string
  operation?: string
  dataFlow?: ApiDataFlow
  observation: ApiObservation
  kind: 'api' | 'business'
  status: CheckStatus
  responseMs: number | null
  httpStatus: number | null
  checkedAt: string | null
  reason: string | null
  freshness?: { lastSuccessAt: string | null; maxAgeMinutes: number }
}

export interface SystemService {
  id: string
  name: string
  check: string
  status: CheckStatus
  checkedAt: string | null
  responseMs: number | null
  detail: string
  dependency: string
}

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
  checks: ApiCheck[]
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
