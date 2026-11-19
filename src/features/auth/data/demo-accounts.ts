import type { CurrentUser } from '@/core/types/auth'
import type { PermissionKey } from '@/core/types/permissions'
import { appModules } from '@/features/apps/registry/apps'

export interface DemoModuleAccount {
  id: string
  moduleId: string
  title: string
  route: string
  username: string
  password: string
  permission: PermissionKey
  role?: string
  extraPermissions?: readonly PermissionKey[]
}

// Public frontend examples, intentionally shown on the demo login page.
const credentials: Record<string, { username: string; password: string }> = {
  'social-benefits': { username: 'social-benefits', password: 'ImtiyozDemo!26' },
  'project-governance': { username: 'project-governance', password: 'LoyihaDemo!26' },
  'palliative-care': { username: 'palliative-care', password: 'PalliativDemo!26' },
  ptpk: { username: 'ptpk', password: 'PtpkDemo!26' },
  'transport-benefits': { username: 'transport-benefits', password: 'TransportDemo!26' },
  iptk: { username: 'iptk', password: 'IptkDemo!26' },
  muruvvat: { username: 'muruvvat', password: 'MuruvvatDemo!26' },
  snav: { username: 'snav', password: 'NavigatorDemo!26' },
  ei: { username: 'ei', password: 'ErtaDemo!26' },
  'regional-centers': { username: 'regional-centers', password: 'HududiyDemo!26' },
  dashboard: { username: 'dashboard', password: 'DashboardDemo!26' },
  citizens: { username: 'citizens', password: 'FuqarolarDemo!26' },
  applications: { username: 'applications', password: 'ArizalarDemo!26' },
  benefits: { username: 'benefits', password: 'NafaqalarDemo!26' },
  payments: { username: 'payments', password: 'TolovlarDemo!26' },
  documents: { username: 'documents', password: 'HujjatlarDemo!26' },
  monitoring: { username: 'monitoring', password: 'MonitoringDemo!26' },
  reports: { username: 'reports', password: 'HisobotlarDemo!26' },
  settings: { username: 'settings', password: 'SozlamalarDemo!26' },
  users: { username: 'users', password: 'FoydalanuvchiDemo!26' },
}

export const demoModuleAccounts: readonly DemoModuleAccount[] = Object.freeze(appModules.map(module => {
  const login = credentials[module.id]
  if (!login || !module.permission) throw new Error(`Demo hisob sozlamasi topilmadi: ${module.id}`)
  return Object.freeze({ id: `demo-module-${module.id}`, moduleId: module.id, title: module.title, route: module.route, permission: module.permission, ...login })
}))

export const demoLoginAccounts: readonly DemoModuleAccount[] = Object.freeze([
  ...demoModuleAccounts,
  Object.freeze({
    id: 'demo-regional-centers-curator', moduleId: 'regional-centers', title: 'HIXM kuratori',
    route: '/apps/regional-centers', username: 'regional-curator', password: 'KuratorDemo!26',
    permission: 'regional-centers.view' as const, role: 'HIXM kuratori', extraPermissions: ['regional-centers.curate'] as const,
  }),
])

export const DEMO_ADMIN_ID = 'demo-admin'

export function getDemoAccountForUser(user: CurrentUser | null | undefined) {
  return user ? demoLoginAccounts.find(account => account.id === user.id && account.username === user.username) : undefined
}

export function createDemoUser(accountId: string): CurrentUser | null {
  if (accountId === DEMO_ADMIN_ID) {
    const permissions = new Set<PermissionKey>(['apps.view'])
    for (const account of demoLoginAccounts) {
      permissions.add(account.permission)
      account.extraPermissions?.forEach(permission => permissions.add(permission))
    }
    return { id: DEMO_ADMIN_ID, username: 'admin', fullName: 'Administrator', role: 'Administrator', permissions: [...permissions] }
  }
  const account = demoLoginAccounts.find(item => item.id === accountId)
  if (!account) return null
  const role = account.role ?? (account.moduleId === 'regional-centers' ? 'HIXM operatori' : 'Modul operatori')
  return { id: account.id, username: account.username, fullName: `${account.title} · demo`, role, permissions: ['apps.view', account.permission, ...(account.extraPermissions ?? [])] }
}

export function authenticateDemoModule(username: string, password: string): CurrentUser | null {
  const account = demoLoginAccounts.find(item => item.username === username.trim() && item.password === password)
  return account ? createDemoUser(account.id) : null
}

export interface DemoSession { version: 1; accountId: string }

export function createDemoSession(user: CurrentUser): DemoSession {
  return { version: 1, accountId: user.id }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Restore identity only. Persisted role, profile and permissions are never trusted. */
export function resolveDemoSession(value: unknown): CurrentUser | null {
  if (!isObject(value)) return null
  if (value.version === 1 && typeof value.accountId === 'string') return createDemoUser(value.accountId)
  if ('version' in value) return null
  // Preserve the existing administrator session when upgrading the demo.
  if (value.id === 'mock-user' && value.username === 'admin') return createDemoUser(DEMO_ADMIN_ID)
  if (typeof value.id !== 'string' || typeof value.username !== 'string') return null
  const canonical = createDemoUser(value.id)
  return canonical?.username === value.username ? canonical : null
}

export function normalizeDemoPath(target: string): string | null {
  if (!target.startsWith('/') || target.startsWith('//') || /[\\\u0000-\u0020]/.test(target)) return null
  try {
    const url = new URL(target, 'https://nasp-demo.invalid')
    if (url.origin !== 'https://nasp-demo.invalid') return null
    const path = decodeURIComponent(url.pathname)
    if (/[\\\u0000-\u0020]/.test(path)) return null
    return path.replace(/\/+$/, '') || '/'
  }
  catch { return null }
}

/** A module prefix must end at a path segment; query/hash never grant access. */
export function canAccessDemoPath(user: CurrentUser | null | undefined, target: string): boolean {
  if (!user) return false
  const canonical = resolveDemoSession(user)
  const path = normalizeDemoPath(target)
  if (!canonical || !path) return false
  if (['/', '/apps', '/403', '/404'].includes(path)) return canonical.permissions.includes('apps.view')
  const module = appModules.find(item => path === item.route || path.startsWith(`${item.route}/`))
  return Boolean(module?.enabled && module.permission && canonical.permissions.includes(module.permission))
}
