import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'

const source = process.argv[2]
if (!source) throw new Error('Pass the DWH HTML file as the first argument.')

const html = readFileSync(source, 'utf8')
const encoded = html.match(/\bBG=`([\w+/=\s]+)`/)?.[1]
const projection = html.match(/\b\w+=`(\{"width":1250,"height":640,"disc":\{"cx":625,[^`]+)\`/)?.[1]
if (!encoded || !projection) throw new Error('The DWH map layers could not be located.')

const areaData = JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8'))
const { regions: outlines, camera, disc } = JSON.parse(projection)
const labels = {
  'UZ-QR': ['Qoraqalpog‘iston Respublikasi', 'Qoraqalpog‘iston'],
  'UZ-AN': ['Andijon viloyati', 'Andijon'],
  'UZ-BU': ['Buxoro viloyati', 'Buxoro'],
  'UZ-JI': ['Jizzax viloyati', 'Jizzax'],
  'UZ-QA': ['Qashqadaryo viloyati', 'Qashqadaryo'],
  'UZ-NW': ['Navoiy viloyati', 'Navoiy'],
  'UZ-NG': ['Namangan viloyati', 'Namangan'],
  'UZ-SA': ['Samarqand viloyati', 'Samarqand'],
  'UZ-SI': ['Sirdaryo viloyati', 'Sirdaryo'],
  'UZ-SU': ['Surxondaryo viloyati', 'Surxondaryo'],
  'UZ-TO': ['Toshkent viloyati', 'Toshkent vil.'],
  'UZ-FA': ['Farg‘ona viloyati', 'Farg‘ona'],
  'UZ-XO': ['Xorazm viloyati', 'Xorazm'],
  'UZ-TK': ['Toshkent shahri', 'Toshkent sh.'],
}
const cleanName = name => name.replaceAll("'", '‘').replace(/ [Tt]uman$/, ' tumani').replace(/ [Ss]hahar$/, ' shahri')
const assetDir = new URL('../../../../public/social-benefits/geography/', import.meta.url)
mkdirSync(assetDir, { recursive: true })

// Keep only administrative names and map geometry from the supplied DWH snapshot.
const territories = Object.entries(labels).map(([id, [name, shortName]]) => {
  const { d: districts, m: mahallas } = areaData[id]
  const outline = outlines.find(row => row.id === id)
  if (!outline) throw new Error('Missing national outline for ' + id)
  const geometry = { districts: {}, mahallas: {} }
  const children = districts.map(([districtId, districtName, count, , , rings]) => {
    const rows = mahallas[districtId] ?? []
    if (rows.length !== count) throw new Error('Incomplete district geography for ' + districtId)
    geometry.districts[districtId] = rings
    const used = new Set()
    const neighborhoods = rows.map(([mahallaName, sourceId, mahallaRings], index) => {
      // The DWH snapshot reuses a few local codes. Keep a separate row per boundary.
      const key = used.has(String(sourceId)) ? sourceId + '-' + (index + 1) : String(sourceId)
      used.add(key)
      geometry.mahallas[districtId + '/' + key] = mahallaRings
      return [key, cleanName(mahallaName)]
    })
    return [districtId, cleanName(districtName), neighborhoods]
  })
  writeFileSync(new URL(id + '.json', assetDir), JSON.stringify(geometry) + '\n')
  return { id, name, shortName, path: outline.d, center: [outline.cx, outline.cy], districts: children }
})
const index = { camera, disc: { cx: disc.cx, cy: disc.cy }, regions: territories }
writeFileSync(new URL('geography.json', import.meta.url), JSON.stringify(index) + '\n')
console.log(territories.length + ' viloyat, ' + territories.reduce((n, r) => n + r.districts.length, 0) + ' tuman/shahar, ' + territories.flatMap(r => r.districts).reduce((n, d) => n + d[2].length, 0) + ' mahalla')
