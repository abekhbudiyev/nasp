import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import ts from 'typescript'
const code=ts.transpileModule(readFileSync(new URL('./uzbek-script.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText
const {uzbekScript,legacyLatin}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'))
test('renders Uzbek in both scripts and preserves service URLs, record codes and reporting quarters',()=>{
 const sample='O‘zbekiston · qo‘llab-quvvatlash choralari · G‘alla · shaxs · ma’lumot'
 assert.equal(uzbekScript(sample,false),'Özbekiston · qöllab-quvvatlaş çoralari · Ğalla · şaxs · maʼlumot')
 assert.equal(uzbekScript(sample,true),'Ўзбекистон · қўллаб-қувватлаш чоралари · Ғалла · шахс · маълумот')
 assert.equal(uzbekScript('IV chorak · my.gov.uz · SR-00001 · CSV',true),'IV чорак · my.gov.uz · SR-00001 · CSV')
 assert.equal(legacyLatin('Ёрдам'),legacyLatin('Yordam'))
 assert.equal(legacyLatin('Çora'),legacyLatin('Чора'))
})
