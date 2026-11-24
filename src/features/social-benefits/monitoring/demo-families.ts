import { legacyLatin } from '@/shared/uzbek-script'
import { neighborhoods, withinScope, type AreaScope, type NeighborhoodScope } from './geography'
import { allDates, inPeriod, type ReportingPeriod } from './reporting-period'

export const zones = [
  { id: 'risk', label: 'Xavf zonasida' },
  { id: 'border', label: 'Xavf chegarasida' },
  { id: 'stable', label: 'Barqaror' },
] as const

export type RiskZone = typeof zones[number]['id']
export type ZoneFilter = RiskZone | 'all'
export type Counts = Record<RiskZone, number>
type Neighborhood = typeof neighborhoods[number]

export const snapshotDate = '2026-11-24'
const numberFormat = new Intl.NumberFormat('ru-RU')
export const number = (value: number) => numberFormat.format(value)
export const total = (value: Counts) => value.risk + value.border + value.stable

function hash(value: string): number {
  let result = 2166136261
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619)
  return result >>> 0
}

function countsForMahalla(mahalla: Neighborhood): Counts {
  const volume = hash(mahalla.mahalla + mahalla.district)
  const distribution = hash(mahalla.district + mahalla.region)
  const size = 8 + volume % 19
  const riskShare = 7 + 3 * (distribution % 6) + volume % 6
  const borderShare = 17 + distribution % 12 + volume % 5
  const risk = Math.max(1, Math.round(size * riskShare / 100))
  const border = Math.max(1, Math.round(size * borderShare / 100))
  return { risk, border, stable: size - risk - border }
}

const areaKey = (scope: AreaScope) => [scope.region, scope.district, scope.mahalla].filter(Boolean).join('/')
const cohorts = neighborhoods.map(place => ({ ...place, counts: countsForMahalla(place) }))
type Cohort = typeof cohorts[number]
const cohortByPlace = new Map(cohorts.map(item => [areaKey(item), item]))
const mahallaOccurrences = new Map<string, number>()
const summary = new Map<string, Counts>()
for (const cohort of cohorts) {
  mahallaOccurrences.set(cohort.mahalla, (mahallaOccurrences.get(cohort.mahalla) ?? 0) + 1)
  const keys = ['', cohort.region, cohort.region + '/' + cohort.district, areaKey(cohort)]
  for (const key of keys) {
    const current = summary.get(key) ?? { risk: 0, border: 0, stable: 0 }
    for (const { id } of zones) current[id] += cohort.counts[id]
    summary.set(key, current)
  }
}

export const countFor = (counts: Counts, zone: ZoneFilter) => zone === 'all' ? total(counts) : counts[zone]
export const zoneLabel = (zone: RiskZone) => zones.find(item => item.id === zone)?.label ?? ''

interface Signal {
  label: string
  source: string
  action: string
  agency: string
  detail: string
}

const scenarios = {
  risk: [
    { label: 'Elektr ta’minoti uzilgan', source: 'Kommunal xizmat signali', action: 'Shoshilinch holatni baholash', agency: 'Inson ijtimoiy xizmatlar markazi', detail: 'Uy xo‘jaligiga elektr ta’minoti uzilgani haqida signal kelgan. Xodim oilaning zudlik bilan yordamga ehtiyojini tekshiradi.' },
    { label: 'Daromad manbai yo‘qolgan', source: 'Bandlik holati', action: 'Bandlik xizmatiga yo‘naltirish', agency: 'Tuman bandlik bo‘limi', detail: 'Oila vakilining daromad manbai to‘xtagani qayd etilgan. Daromad va vaqtinchalik yordamga ehtiyojni aniqlashtirish kerak.' },
    { label: '12 oydan ortiq kommunal qarz', source: 'Kommunal xizmat signali', action: 'Kommunal yordamni ko‘rib chiqish', agency: 'Inson ijtimoiy xizmatlar markazi', detail: 'To‘lovlar 12 oydan beri qoplanmagan. Oila bilan bog‘lanib, qarzdorlik sababi va yordamga ehtiyojni aniqlash kerak.' },
  ],
  border: [
    { label: 'Kommunal to‘lovlar kechikkan', source: 'Kommunal xizmat signali', action: 'Oilani baholash', agency: 'Inson ijtimoiy xizmatlar markazi', detail: 'To‘lovlarda kechikish qayd etilgan. Takroriy kechikishlarning sababini suhbat davomida aniqlashtirish kerak.' },
    { label: 'Parvarishga ehtiyoj bildirilgan', source: 'Ijtimoiy xodim qaydi', action: 'Parvarish ehtiyojini baholash', agency: 'Inson ijtimoiy xizmatlar markazi', detail: 'Oila a’zosi parvarish bo‘yicha maslahat so‘ragan. Xodim bilan suhbatdan so‘ng mos xizmat tanlanadi.' },
    { label: 'Bandlik bo‘yicha murojaat', source: 'Oila murojaati', action: 'Bandlik xizmatiga yo‘naltirish', agency: 'Tuman bandlik bo‘limi', detail: 'Oila vakili ish qidirishda ko‘mak so‘ragan. Vakansiyalar va kasbga o‘qitish bo‘yicha maslahat berish mumkin.' },
    { label: 'Pensiya yoki nafaqa bo‘yicha murojaat', source: 'Oila murojaati', action: 'Pensiya yoki nafaqa huquqini tekshirish', agency: 'Pensiya jamg‘armasi hududiy bo‘limi', detail: 'Oila a’zosi pensiya yoki nafaqa olish tartibini aniqlashtirish uchun murojaat qilgan.' },
  ],
  stable: [
    { label: 'Faol xavf signali yo‘q', source: 'Rejali kuzatuv', action: 'Rejali kuzatuv', agency: 'Inson ijtimoiy xizmatlar markazi', detail: 'Namuna davrida ochiq xavf signali qayd etilmagan. Yangi murojaat yoki signal paydo bo‘lsa, holat qayta ko‘rib chiqiladi.' },
  ],
} satisfies Record<RiskZone, [Signal, ...Signal[]]>

const personalCare: Signal = {
  label: 'Kundalik parvarishga ehtiyoj bor',
  source: 'Ijtimoiy xodim qaydi',
  action: 'Parvarish ehtiyojini baholash',
  agency: 'Inson ijtimoiy xizmatlar markazi',
  detail: 'Oila a’zosiga kundalik harakatlanish va parvarishda ko‘mak kerakligi qayd etilgan. Mas’ul xodim xizmat turini aniqlash uchun ehtiyojni baholaydi.',
}

export const agencies = [
  'Inson ijtimoiy xizmatlar markazi',
  'Ijtimoiy himoya milliy agentligi',
  'Mahalla fuqarolar yig‘ini',
  'Tuman bandlik bo‘limi',
  'Pensiya jamg‘armasi hududiy bo‘limi',
  'Tuman sog‘liqni saqlash bo‘limi',
  'Kommunal xizmat ko‘rsatuvchi tashkilot',
  'Markaziy bank (hamkor)',
] as const

export const measures = [
  'Oilani baholash',
  'Shoshilinch holatni baholash',
  'Kommunal yordamni ko‘rib chiqish',
  'Bandlik xizmatiga yo‘naltirish',
  'Parvarish ehtiyojini baholash',
  'Pensiya yoki nafaqa huquqini tekshirish',
  'Rejali kuzatuv',
] as const

const women = ['Mavluda', 'Nilufar', 'Dilnoza', 'Zarnigor', 'Mohira', 'Sevara']
const men = ['Aziz', 'Otabek', 'Jasur', 'Sardor', 'Anvar', 'Jamshid']
const initials = ['M.', 'S.', 'A.', 'R.', 'T.', 'N.']
const dayMs = 86_400_000

function demoDate(seed: number) {
  return demoDays[seed % demoDays.length]!
}
const demoDays = Array.from({ length: 140 }, (_, i) => new Date(Date.parse(snapshotDate) - i * dayMs).toISOString().slice(0, 10))

const assessments = cohorts.map(cohort => {
  const key = areaKey(cohort)
  return { cohort, key, rows: Array.from({ length: total(cohort.counts) }, (_, i) => {
    const seed = hash(key + '/' + (i + 1))
    const zone = rowZone(cohort.counts, i + 1)
    const options = scenarios[zone]
    return { date: demoDate(seed), zone, signal: (options[seed % options.length] ?? options[0]).label }
  }) }
})

let lastPeriod = ''
let lastSummary = new Map<string, Counts>()
export function countsAt(scope: AreaScope, period = allDates): Counts {
  if (period.kind === 'all') return summary.get(areaKey(scope)) ?? { risk: 0, border: 0, stable: 0 }
  const signature = period.from + '/' + period.to
  if (signature !== lastPeriod) {
    const grouped = new Map<string, Counts>()
    for (const { cohort, key, rows } of assessments) {
      const counts = { risk: 0, border: 0, stable: 0 }
      for (const row of rows) if (inPeriod(row.date, period)) counts[row.zone]++
      for (const level of ['', cohort.region, cohort.region + '/' + cohort.district, key]) {
        const entry = grouped.get(level) ?? { risk: 0, border: 0, stable: 0 }
        for (const { id } of zones) entry[id] += counts[id]
        grouped.set(level, entry)
      }
    }
    lastPeriod = signature
    lastSummary = grouped
  }
  return lastSummary.get(areaKey(scope)) ?? { risk: 0, border: 0, stable: 0 }
}

export function leadingSignal(scope: AreaScope, zone: RiskZone, period: ReportingPeriod) {
  if (zone === 'stable') return undefined
  const counts = new Map<string, number>()
  for (const { cohort, rows } of assessments) {
    if (!withinScope(scope, cohort)) continue
    for (const row of rows) {
      if (row.zone === zone && inPeriod(row.date, period)) counts.set(row.signal, (counts.get(row.signal) ?? 0) + 1)
    }
  }
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0]
}

export interface DemoMember {
  id: string
  name: string
  role: string
  age: number
  zone: RiskZone
  signal: Signal
}

function rowZone(counts: Counts, position: number): RiskZone {
  if (position <= counts.risk) return 'risk'
  return position <= counts.risk + counts.border ? 'border' : 'stable'
}

export function familyReference(place: NeighborhoodScope, index: number) {
  const location = (mahallaOccurrences.get(place.mahalla) ?? 0) > 1 ? place.district + '-' + place.mahalla : place.mahalla
  return 'O-' + location + '-' + String(index).padStart(2, '0')
}

function familyAt(cohort: Cohort, index: number) {
  const zone = rowZone(cohort.counts, index)
  const seed = hash(areaKey(cohort) + '/' + index)
  const options = scenarios[zone]
  const signal = options[seed % options.length] ?? options[0]
  const members: DemoMember[] = Array.from({ length: 2 + seed % 4 }, (_, i) => {
    const names = (seed + i) % 2 ? women : men
    const isIndividualSignal = i === 0 && signal.source !== 'Kommunal xizmat signali'
    const needsCareReview = i === 1 && zone !== 'stable' && seed % 3 === 0
    return {
      id: String(i + 1),
      name: names[(seed >>> i) % names.length] + ' ' + initials[(seed + index) % initials.length],
      role: i === 0 ? 'Oila vakili' : i === 1 ? 'Turmush o‘rtog‘i' : 'Farzand',
      age: i < 2 ? 31 + (seed >>> i) % 27 : 5 + ((seed >>> i) + i * 3) % 14,
      zone: isIndividualSignal ? zone : needsCareReview ? 'border' : 'stable',
      signal: isIndividualSignal ? signal : needsCareReview ? personalCare : scenarios.stable[0],
    }
  })
  return {
    scope: { region: cohort.region, district: cohort.district, mahalla: cohort.mahalla } as NeighborhoodScope,
    ref: familyReference(cohort, index), index, zone, members,
    signal,
    recordedOn: demoDate(seed),
    regionName: cohort.regionName,
    districtName: cohort.districtName,
    mahallaName: cohort.name,
  }
}

export type DemoFamily = ReturnType<typeof familyAt>

export function resolveFamily(scope: AreaScope, index?: string): DemoFamily | undefined {
  if (!scope.mahalla || !index || !/^\d{1,2}$/.test(index)) return undefined
  const cohort = cohortByPlace.get(areaKey(scope))
  const position = Number(index)
  if (!cohort || position < 1 || position > total(cohort.counts)) return undefined
  return familyAt(cohort, position)
}

export function normalize(value: string): string {
  return legacyLatin(value.normalize('NFC')).toLocaleLowerCase('uz').replace(/[’‘ʻʼ'`\s-]/g, '')
}

function initialPosition(counts: Counts, zone: ZoneFilter) {
  if (zone === 'stable') return counts.risk + counts.border + 1
  if (zone === 'border') return counts.risk + 1
  return 1
}

export function familyPage(scope: AreaScope, zone: ZoneFilter, query: string, offset: number, limit: number, period = allDates) {
  const term = normalize(query)
  const rows: DemoFamily[] = []
  let count = 0
  for (const { cohort, rows: records } of assessments) {
    if (!withinScope(scope, cohort)) continue
    const first = initialPosition(cohort.counts, zone)
    const size = countFor(cohort.counts, zone)
    const placeMatch = !term || normalize(cohort.name + cohort.districtName + cohort.regionName).includes(term)
    if (placeMatch && period.kind === 'all') {
      const start = Math.max(first, first + offset - count)
      const end = Math.min(first + size, first + offset + limit - count)
      for (let index = start; index < end; index++) rows.push(familyAt(cohort, index))
      count += size
      continue
    }
    if (!placeMatch) {
      const referencePrefix = normalize(familyReference(cohort, 1).slice(0, -2))
      if (!referencePrefix.includes(term) && !term.startsWith(referencePrefix)) continue
    }
    for (let index = first; index < first + size; index++) {
      if (!inPeriod(records[index - 1]!.date, period)) continue
      if (!placeMatch && !normalize(familyReference(cohort, index)).includes(term)) continue
      if (count >= offset && rows.length < limit) rows.push(familyAt(cohort, index))
      count++
    }
  }
  return { rows, count }
}

const supportCatalog = [
  { type: 'Moliyaviy ko‘maklar', title: 'Bir martalik moddiy yordam', agency: agencies[0], allocated: 600_000 },
  { type: 'Ijtimoiy xizmatlar', title: 'Bandlik bo‘yicha maslahat', agency: agencies[3], allocated: null },
  { type: 'Imtiyozlar', title: 'Transport xarajatlarini qoplash', agency: agencies[1], allocated: 300_000 },
] as const
export const supportTypes = supportCatalog.map(item => item.type)
export function* supportRecords(scope: AreaScope, period = allDates, family?: number, member?: string, zone: ZoneFilter = 'all') {
  for (const { cohort, key, rows } of assessments) {
    if (!withinScope(scope, cohort)) continue
    for (let i = 0; i < rows.length; i++) {
      const assessment = rows[i]!
      if ((family !== undefined && i + 1 !== family) || (zone !== 'all' && assessment.zone !== zone)) continue
      const seed = hash(key + '/' + (i + 1))
      if (seed % 4 !== 0) continue
      const date = new Date(Date.parse(assessment.date) - 10 * dayMs).toISOString().slice(0, 10)
      if (!inPeriod(date, period)) continue
      const item = supportCatalog[(seed >>> 4) % supportCatalog.length]!
      const person = String(1 + (seed >>> 6) % 2)
      if (member && person !== member) continue
      const paid = item.allocated
      yield { ...item, paid, date, person, reference: familyReference(cohort, i + 1), population: person === '1' ? 'Oila vakili' : 'Turmush o‘rtog‘i' }
    }
  }
}
