import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import vm from 'node:vm'
const read = name => readFileSync(new URL(name, import.meta.url), 'utf8')
const html = read('platform.html')
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])
const manifest = JSON.parse(read('source-manifest.json'))
test('all six original data and application blocks preserved byte for byte', () => {
  assert.equal(scripts.length, 6)
  scripts.forEach((script, i) => assert.equal(createHash('sha256').update(script).digest('hex'), manifest.blocks[i].sha256))
})
test('complete registry and source aggregate are preserved separately', () => {
  const registry = vm.runInNewContext(scripts[2] + ';SPR', {}, {timeout:1000})
  assert.equal(registry.ms.length, 37)
  assert.equal(registry.ms.reduce((sum, agency) => sum + agency.m.length, 0), 613)
  assert.equal(registry.tot_c, 577)
})
test('source remains standalone without Claude runtime or external scripts', () => {
  assert.ok(!html.includes('__FRAME_PREAMBLE'))
  assert.ok(!/<script[^>]+src=/.test(html))
  scripts.forEach(script => new vm.Script(script))
})
