import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import * as Vue from 'vue'

function load(file, dependencies = {}) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const exports = {}
  new Function('exports', 'require', outputText)(exports, key => dependencies[key])
  return exports
}

const data = JSON.parse(readFileSync(new URL('platform-data.json', import.meta.url), 'utf8'))
const { usePrototypeRequests, requestTotals } = load('prototype-requests.ts', {
  vue: Vue, './data': { data }, './live-engine': load('live-engine.ts'),
})
const { events, perform, createServiceRequest, reset } = usePrototypeRequests()

test('request 37 settles once and remains linked to the same member', () => {
  reset()
  const original = events.value.find(item => item.id === 37)
  assert.equal(original.status, 'waiting')
  assert.equal(perform(37, 'deliver'), true)
  assert.equal(perform(37, 'deliver'), false)
  const totals = requestTotals(events.value)
  assert.deepEqual([totals.received, totals.delivered, totals.waiting], [40, 29, 3])
  const settled = events.value.find(item => item.id === 37)
  assert.equal(settled.familyId, original.familyId)
  assert.equal(settled.memberId, original.memberId)
  assert.equal(settled.history.at(-1).label, 'Ijro tasdiqlandi')
})

test('a linked duplicate requires review and a reason without increasing paid amounts', () => {
  reset()
  const candidate = events.value.find(item => item.id === 27)
  const settled = events.value.find(item => item.id === candidate.relatedRequestId)
  assert.equal(settled.status, 'delivered')
  assert.equal(candidate.memberId, settled.memberId)
  assert.equal(perform(27, 'deliver'), false)
  assert.equal(perform(27, 'check'), true)
  assert.equal(perform(27, 'reject'), false)
  assert.equal(perform(27, 'reject', 'Avval ijro etilgan'), true)
  assert.equal(requestTotals(events.value).deliveredAmount, 15575000)
  assert.equal(requestTotals(events.value).duplicate, 5)
})

test('correcting a returned record and submitting a service retain stable IDs', () => {
  reset()
  assert.equal(perform(25, 'retry', 'Chora kodi aniqlashtirildi'), true)
  assert.equal(perform(25, 'check'), true)
  assert.equal(perform(25, 'approve'), true)
  assert.equal(perform(25, 'deliver'), true)
  assert.equal(events.value.length, 40)

  const { familyId, memberId } = events.value[0]
  const id = createServiceRequest(familyId, memberId, 'Huquqiy maslahat', 'Murojaat matni')
  assert.equal(id, 41)
  assert.equal(createServiceRequest(familyId, memberId, 'Huquqiy maslahat', 'Takroriy murojaat'), undefined)
  assert.equal(events.value.find(item => item.id === id).memberId, memberId)
})
