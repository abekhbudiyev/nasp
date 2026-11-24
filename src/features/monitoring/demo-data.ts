import type { MonitoringSnapshot, SqlPeriod, TopSqlReport } from './types'

export const demoSnapshot: MonitoringSnapshot = {
  collectedAt: '2026-11-24T10:30:00+05:00',
  servers: [{
    id: 'nasp-backend-pilot', name: 'NASP backend', status: 'healthy',
    cpuPercent: 43, ram: { used: 11.8, capacity: 16, usedPercent: 74 },
    filesystem: '/data', disk: { used: 128, capacity: 200, usedPercent: 64 },
    diskIo: { readMiBps: 14.5, writeMiBps: 7.2 },
    network: { receiveMbps: 22.4, sendMbps: 8.6 },
  }],
  checks: [
    { id: 'eligibility', moduleId: 'transport-benefits', name: 'Moslikni tekshirish', kind: 'api', status: 'healthy', responseMs: 137, httpStatus: 200, checkedAt: '2026-11-24T10:29:41+05:00', reason: null },
    { id: 'ticket-status', moduleId: 'transport-benefits', name: 'Chipta holatini olish', kind: 'api', status: 'degraded', responseMs: 916, httpStatus: 200, checkedAt: '2026-11-24T10:29:42+05:00', reason: '800 ms javob vaqti chegarasidan oshdi.' },
    { id: 'settlement-status', moduleId: 'transport-benefits', name: 'Qoplash reyestri holatini olish', kind: 'api', status: 'failed', responseMs: null, httpStatus: null, checkedAt: '2026-11-24T10:29:46+05:00', reason: '5 soniyada javob kelmadi.' },
    { id: 'transport-business', moduleId: 'transport-benefits', name: 'Kutilgan huquq va taklifni tekshirish', kind: 'business', status: 'healthy', responseMs: 186, httpStatus: 200, checkedAt: '2026-11-24T10:29:52+05:00', reason: null },
    { id: 'ei-attendance', moduleId: 'ei', name: 'Davomat ro‘yxatini o‘qish', kind: 'api', status: 'healthy', responseMs: 194, httpStatus: 200, checkedAt: '2026-11-24T10:29:34+05:00', reason: null },
    { id: 'ei-business', moduleId: 'ei', name: 'Sinov yozuvining ochiq davomatini tekshirish', kind: 'business', status: 'healthy', responseMs: 225, httpStatus: 200, checkedAt: '2026-11-24T10:28:50+05:00', reason: null },
    { id: 'hixm-capacity', moduleId: 'regional-centers', name: 'Markaz xizmatlari quvvatini o‘qish', kind: 'api', status: 'degraded', responseMs: 1230, httpStatus: 200, checkedAt: '2026-11-24T10:29:18+05:00', reason: '1 soniyalik javob vaqti chegarasidan oshdi.' },
    { id: 'iptk-applications', moduleId: 'iptk', name: 'Arizalar ro‘yxatini o‘qish', kind: 'api', status: 'healthy', responseMs: 208, httpStatus: 200, checkedAt: '2026-11-24T10:29:14+05:00', reason: null },
    { id: 'social-benefits-overview', moduleId: 'social-benefits', name: 'Ijtimoiy yordam ro‘yxatini o‘qish', kind: 'api', status: 'unknown', responseMs: null, httpStatus: null, checkedAt: '2026-11-24T10:18:00+05:00', reason: '10:18 dan keyin yangi o‘lchov kelmadi.' },
  ],
  oracle: {
    name: 'NASP Oracle', status: 'degraded', activeSessions: 28, blockedSessions: 2,
    tablespaces: [
      { name: 'NASP_DATA', space: { used: 172, capacity: 200, usedPercent: 86 } },
      { name: 'NASP_IDX', space: { used: 49, capacity: 80, usedPercent: 61 } },
      { name: 'UNDOTBS1', space: { used: 16, capacity: 50, usedPercent: 32 } },
    ],
  },
  incidents: [
    { id: 'settlement-timeout', moduleId: 'transport-benefits', severity: 'critical', target: 'Transport imtiyozlari', title: 'Qoplash reyestri API’si javob bermadi', startedAt: '2026-11-24T10:12:00+05:00', detail: 'Ketma-ket uchta tekshiruvda 5 soniyalik kutish muddati tugadi.' },
    { id: 'hixm-capacity-latency', moduleId: 'regional-centers', severity: 'warning', target: 'Hududiy ijtimoiy xizmatlar markazlari', title: 'Xizmatlar quvvati ro‘yxati sekin ochilmoqda', startedAt: '2026-11-24T10:24:00+05:00', detail: 'Oxirgi namuna HTTP 200 va 1 230 ms. Chegara 1 000 ms.' },
    { id: 'tablespace-usage', severity: 'warning', target: 'NASP Oracle', title: 'NASP_DATA bandligi 85% chegarasidan oshdi', startedAt: '2026-11-24T10:05:00+05:00', detail: 'Ajratilgan 200 GiB joydan 172 GiB band.' },
  ],
}

const queries = {
  claim: { sqlId: '4k2nw7j3m0p6a', label: 'Qoplash reyestrini hisoblash' },
  ticket: { sqlId: '7b1rd8t6h2k9p', label: 'Chipta holatini olish' },
  eligibility: { sqlId: '9v5m0n3q6r7st', label: 'Transport huquqini tekshirish' },
}

export const demoTopSql: Record<SqlPeriod, TopSqlReport> = {
  '1h': {
    from: '2026-11-24T09:30:00+05:00', to: demoSnapshot.collectedAt,
    rows: [
      { ...queries.claim, executions: 74, elapsedSeconds: 126.4, cpuSeconds: 52.1 },
      { ...queries.ticket, executions: 318, elapsedSeconds: 87.9, cpuSeconds: 38.5 },
      { ...queries.eligibility, executions: 492, elapsedSeconds: 63.2, cpuSeconds: 30.4 },
    ],
  },
  '24h': {
    from: '2026-11-23T10:30:00+05:00', to: demoSnapshot.collectedAt,
    rows: [
      { ...queries.ticket, executions: 6240, elapsedSeconds: 1784.8, cpuSeconds: 801.5 },
      { ...queries.claim, executions: 1058, elapsedSeconds: 1549.1, cpuSeconds: 639.2 },
      { ...queries.eligibility, executions: 8910, elapsedSeconds: 1138.3, cpuSeconds: 539.8 },
    ],
  },
  '7d': {
    from: '2026-11-17T10:30:00+05:00', to: demoSnapshot.collectedAt,
    rows: [
      { ...queries.eligibility, executions: 63420, elapsedSeconds: 10586.2, cpuSeconds: 4962.1 },
      { ...queries.ticket, executions: 43210, elapsedSeconds: 9238.2, cpuSeconds: 4250.1 },
      { ...queries.claim, executions: 7418, elapsedSeconds: 8609.6, cpuSeconds: 3659.8 },
    ],
  },
}
