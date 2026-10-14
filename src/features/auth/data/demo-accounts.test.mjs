import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeEach, test } from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const cache = new Map()

// Execute the real TypeScript store/guard/registry with Node's Vue and Pinia runtime.
// Route components are not mounted; the actual route tree and metadata are retained.
function load(relative) {
  const filename = resolve(root, relative)
  if (cache.has(filename)) return cache.get(filename).exports
  const module = { exports: {} }
  cache.set(filename, module)
  const source = readFileSync(filename, 'utf8').replaceAll('import.meta.env', '({})')
  const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText
  const localRequire = specifier => {
    if (specifier.endsWith('.vue')) return {}
    if (specifier.startsWith('@/')) return load(`${specifier.slice(2)}.ts`)
    if (specifier.startsWith('.')) return load(`${resolve(dirname(filename), specifier)}.ts`)
    return require(specifier)
  }
  new Function('require', 'module', 'exports', output)(localRequire, module, module.exports)
  return module.exports
}

function memoryStorage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key), clear: () => values.clear() }
}
globalThis.localStorage = memoryStorage()
globalThis.sessionStorage = memoryStorage()

const { createPinia } = require('pinia')
const { createRouter, createMemoryHistory } = require('vue-router')
const data = load('features/auth/data/demo-accounts.ts')
const { appModules } = load('features/apps/registry/apps.ts')
const { useAuthStore } = load('stores/auth.ts')
const { STORAGE_KEYS } = load('core/constants/storage.ts')
const guard = load('core/guards/auth.guard.ts')
const { routes } = load('core/router/routes.ts')
const routeStubs = records => records.map(record => ({ ...record, component: record.component ? {} : undefined, children: record.children ? routeStubs(record.children) : undefined }))
const makeRouter = () => createRouter({ history: createMemoryHistory(), routes: routeStubs(routes) })
const router = makeRouter()
const key = STORAGE_KEYS.authSession
beforeEach(() => { localStorage.clear(); sessionStorage.clear() })

test('all registered modules have distinct stable credentials and exactly their own permission', () => {
  assert.equal(data.demoModuleAccounts.length, appModules.length)
  assert.deepEqual(new Set(data.demoModuleAccounts.map(account => account.moduleId)), new Set(appModules.map(module => module.id)))
  for (const field of ['username', 'password', 'id']) assert.equal(new Set(data.demoModuleAccounts.map(account => account[field])).size, appModules.length)
  for (const account of data.demoModuleAccounts) {
    const user = data.authenticateDemoModule(account.username, account.password)
    assert.ok(user)
    assert.deepEqual(user.permissions, ['apps.view', account.permission])
    assert.equal(data.canAccessDemoPath(user, '/apps'), true)
    for (const other of data.demoModuleAccounts) {
      assert.equal(data.canAccessDemoPath(user, other.route), account.id === other.id, `${account.username}: ${other.route}`)
      assert.equal(data.canAccessDemoPath(user, `${other.route}/nested/detail/42?tab=history#entry`), account.id === other.id)
    }
  }
})

test('wrong, another module, blank and padded passwords do not authenticate', () => {
  for (const [index, account] of data.demoModuleAccounts.entries()) {
    const other = data.demoModuleAccounts[(index + 1) % data.demoModuleAccounts.length]
    for (const password of ['', 'wrong-password', other.password, ` ${account.password}`, `${account.password} `]) assert.equal(data.authenticateDemoModule(account.username, password), null)
  }
  assert.equal(data.authenticateDemoModule('not-a-user', data.demoModuleAccounts[0].password), null)
})

test('restoration rebuilds each module identity and cannot add persisted permissions, role or profile', () => {
  for (const account of data.demoModuleAccounts) {
    const persisted = { version: 1, accountId: account.id, permissions: ['apps.view', 'users.view', 'settings.view'], role: 'Administrator', username: 'admin', fullName: 'Injected' }
    const expected = data.createDemoUser(account.id)
    assert.deepEqual(data.resolveDemoSession(persisted), expected)
    assert.deepEqual(data.resolveDemoSession({ ...expected, permissions: ['users.view'], role: 'Administrator', fullName: 'Injected' }), expected)
    assert.equal(expected.permissions.length, 2)
  }
  assert.equal(data.resolveDemoSession({ id: 'mock-user', username: 'palliative-care', permissions: ['users.view'] }), null)
  assert.equal(data.resolveDemoSession({ id: data.demoModuleAccounts[0].id, username: 'admin', permissions: ['users.view'] }), null)
})

test('unknown, malformed and future-version sessions are rejected; legacy administrator keeps all module access', () => {
  for (const value of [null, [], 'text', {}, { version: 1, accountId: 'unknown' }, { version: 2, accountId: data.DEMO_ADMIN_ID }, { id: 'mock-user', username: 'unknown' }]) assert.equal(data.resolveDemoSession(value), null)
  const admin = data.resolveDemoSession({ id: 'mock-user', username: 'admin', permissions: [] })
  assert.ok(admin)
  for (const account of data.demoModuleAccounts) assert.equal(data.canAccessDemoPath(admin, account.route), true)
  assert.equal(admin.permissions.length, appModules.length + 1)
})

test('all actual module routes, including nested and generic routes without metadata, enforce module isolation', () => {
  const records = router.getRoutes().filter(record => appModules.some(module => record.path === module.route || record.path.startsWith(`${module.route}/`)))
  assert.ok(records.some(record => record.path.includes('/:id')))
  for (const module of appModules) assert.ok(records.some(record => record.path === module.route), module.id)
  for (const account of data.demoModuleAccounts) {
    const user = data.createDemoUser(account.id)
    for (const record of records) {
      const path = record.path.replace(/:[A-Za-z][A-Za-z0-9_]*/g, 'demo-id')
      const allowed = path === account.route || path.startsWith(`${account.route}/`)
      assert.equal(guard.canAccessDemoRoute(user, router.resolve(path)), allowed, `${account.username}: ${path}`)
    }
  }
})

test('login redirects reject other modules, external paths, prefix lookalikes and traversal', () => {
  const account = data.demoModuleAccounts.find(account => account.moduleId === 'palliative-care')
  const user = data.createDemoUser(account.id)
  const own = `${account.route}/cases?view=scenarios#examples`
  assert.equal(guard.resolveAuthorizedRedirect(router, user, own), own)
  for (const candidate of [undefined, ['/apps/users'], '/apps/users', '/apps/settings', 'https://example.com', '//example.com/apps', '/\\example.com', '/login?redirect=/apps/users', `${account.route}-extra`, `${account.route}/%2e%2e/users`, `${account.route}/not-an-existing-page`, `${account.route}/%2e%2e%2fusers`, '/apps/%75sers', '/apps/%ZZ', '/apps/users%00']) {
    assert.equal(guard.resolveAuthorizedRedirect(router, user, candidate), '/apps', String(candidate))
  }
})

test('a child route cannot replace a stricter parent permission', () => {
  const account = data.demoModuleAccounts[0]
  const user = data.createDemoUser(account.id)
  const isolated = createRouter({ history: createMemoryHistory(), routes: [{ path: `${account.route}/restricted`, component: {}, meta: { requiresAuth: true, permission: 'users.view' }, children: [{ path: 'child', component: {}, meta: { permission: account.permission } }] }] })
  assert.equal(guard.canAccessDemoRoute(user, isolated.resolve(`${account.route}/restricted/child`)), false)
})

test('store login switches accounts without permission carryover and persists identity only', async () => {
  const store = useAuthStore(createPinia())
  const [first, second] = data.demoModuleAccounts
  await store.login({ username: first.username, password: first.password, remember: true })
  assert.deepEqual(JSON.parse(localStorage.getItem(key)), { version: 1, accountId: first.id })
  assert.equal(sessionStorage.getItem(key), null)
  await store.login({ username: second.username, password: second.password, remember: false })
  assert.deepEqual(store.currentUser.permissions, ['apps.view', second.permission])
  assert.equal(store.hasPermission(first.permission), false)
  assert.equal(localStorage.getItem(key), null)
  assert.deepEqual(JSON.parse(sessionStorage.getItem(key)), { version: 1, accountId: second.id })
  await assert.rejects(store.login({ username: first.username, password: second.password }), /Login yoki parol/)
  assert.equal(store.currentUser.id, second.id)
  store.logout()
  assert.equal(store.currentUser, null)
  assert.equal(localStorage.getItem(key), null)
  assert.equal(sessionStorage.getItem(key), null)
})

test('actual store restoration drops injected permissions and clears corrupt or unknown sessions', () => {
  const store = useAuthStore(createPinia())
  const account = data.demoModuleAccounts[0]
  localStorage.setItem(key, JSON.stringify({ version: 1, accountId: account.id, permissions: ['users.view'], role: 'Administrator' }))
  store.restoreSession()
  assert.deepEqual(store.currentUser.permissions, ['apps.view', account.permission])
  assert.equal(store.hasPermission('users.view'), false)
  for (const text of ['{invalid json', JSON.stringify({ id: 'mock-user', username: 'unknown', permissions: ['users.view'] }), JSON.stringify({ version: 1, accountId: 'unknown' })]) {
    localStorage.setItem(key, text)
    store.restoreSession()
    assert.equal(store.isAuthenticated, false)
    assert.equal(localStorage.getItem(key), null)
  }
})

test('live guard redirects an unauthenticated deep link, allows the own module and blocks other modules', async () => {
  const instance = makeRouter()
  const pinia = createPinia()
  const store = useAuthStore(pinia)
  guard.setupAuthGuard(instance, pinia)
  await instance.push('/apps/palliative-care/cases')
  assert.equal(instance.currentRoute.value.name, 'login')
  assert.equal(instance.currentRoute.value.query.redirect, '/apps/palliative-care/cases')
  const account = data.demoModuleAccounts.find(account => account.moduleId === 'palliative-care')
  await store.login({ username: account.username, password: account.password })
  await instance.push('/apps/palliative-care/cases')
  assert.equal(instance.currentRoute.value.path, '/apps/palliative-care/cases')
  await instance.push('/apps/ei/providers/applications')
  assert.equal(instance.currentRoute.value.name, 'forbidden')
  await instance.push('/apps/users')
  assert.equal(instance.currentRoute.value.name, 'forbidden')
  await instance.push('/login?redirect=/apps/settings')
  assert.equal(instance.currentRoute.value.path, '/apps')
  await instance.push('/login?redirect=/apps/palliative-care/guides')
  assert.equal(instance.currentRoute.value.path, '/apps/palliative-care/guides')
  for (const redirect of ['/apps/palliative-care/not-an-existing-page', '/apps/palliative-care/%2e%2e%2fusers']) {
    await instance.push({ path: '/login', query: { redirect } })
    assert.equal(instance.currentRoute.value.path, '/apps')
  }
})
