<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed, ref, watch } from 'vue'
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { data, money, num, sum, months, organization, aggregateFinance, type FinanceRow } from './data'
import RecipientAnalysis from './RecipientAnalysis.vue'
import RegionMap from './RegionMap.vue'
import ReportActions from './ReportActions.vue'
import FinanceComparison from './FinanceComparison.vue'
import { findText, financeSource, reportedMonth, scopeAgency, scopeMonths, scopeRegion, type ReportOutput } from './report-output'

const props = defineProps<{ cut: string; year: number; region: string; agency: string; selectedMonths: number[] }>()
const emit = defineEmits<{ region: [string]; open: [FinanceRow]; family: [string, string?]; district: [] }>()
const query = ref(''), type = ref(''), direction = ref(''), cohort = ref('')
const district = ref(''), sex = ref(''), age = ref(''), benefit = ref('')
const metric = ref<'amount' | 'count'>('amount')
const ageGroups = ['18 yoshgacha', '18–29 yosh', '30–59 yosh', '60 yosh va undan katta']
const lines = computed(() => data.finance.filter(line =>
  (!props.agency || line.o === props.agency) && findText(line.n, query.value) &&
  (!type.value || line.t === type.value) && (!direction.value || line.d === direction.value) &&
  (!cohort.value || line.c === cohort.value),
))
const rows = computed(() => lines.value
  .filter(line => props.selectedMonths.some(month => reportedMonth(line, props.year, props.region, month)))
  .map(line => aggregateFinance(line, props.year, props.region, props.selectedMonths))
  .sort((a, b) => metric.value === 'amount'
    ? b.total - a.total
    : Number(a.line.cnt === null) - Number(b.line.cnt === null) || b.count - a.count),
)
const regional = computed(() => data.regions.map((name, index) => {
  const values = lines.value.flatMap(line =>
    props.selectedMonths.map(month => reportedMonth(line, props.year, String(index), month)).filter(value => value !== undefined),
  )
  return { name, index, total: values.length ? sum(values.map(value => value.s)) : null }
}).sort((a, b) => (b.total ?? -Infinity) - (a.total ?? -Infinity)))
const mapValues = computed(() => data.regions.map((_, index) => {
  const amount = regional.value.find(row => row.index === index)?.total
  return amount == null ? null : amount * 1e9
}))
const regionalMax = computed(() => Math.max(1, ...regional.value.map(row => row.total ?? 0)))
const source = computed(() => financeSource(props.year, props.selectedMonths))
const scope = computed(() => [props.year, scopeMonths(props.selectedMonths), scopeRegion(props.region), scopeAgency(props.agency)].join(' · '))
const monthlyUnit = computed(() => metric.value === 'amount' ? 'mlrd so‘m' : 'nafar')
function monthValue(row: FinanceRow, month: number) {
  const value = reportedMonth(row.line, props.year, props.region, month)
  if (!value) return null
  return metric.value === 'amount' ? value.s : row.line.cnt === null ? null : value.c
}

const peopleRows = computed(() => data.cube.filter(([districtId, benefitId, gender, ageGroup]) =>
  (props.region === '' || data.regionMap[data.districts[districtId]![0]] === +props.region) &&
  (district.value === '' || districtId === +district.value) &&
  (benefit.value === '' || benefitId === +benefit.value) &&
  (sex.value === '' || gender === +sex.value) &&
  (age.value === '' || ageGroup === +age.value),
))
const distributions = computed(() => {
  const byDistrict = new Map<number, number>()
  const byBenefit = new Map<number, number>()
  for (const [districtId, benefitId, , , , , months] of peopleRows.value) {
    const amount = sum(props.selectedMonths.map(month => months[month] ?? 0))
    byDistrict.set(districtId, (byDistrict.get(districtId) ?? 0) + amount)
    byBenefit.set(benefitId, (byBenefit.get(benefitId) ?? 0) + amount)
  }
  return { byDistrict, byBenefit }
})
const benefitsByAmount = computed(() => [...distributions.value.byBenefit]
  .map(([id, amount]) => ({ label: data.benefitTypes[id], id, amount }))
  .sort((a, b) => b.amount - a.amount),
)
const districts = computed(() => data.districts.map(([region, name], id) => ({ id, region, name }))
  .filter(row => props.region === '' || data.regionMap[row.region] === +props.region),
)
const districtRows = computed(() => districts.value
  .filter(row => distributions.value.byDistrict.has(row.id))
  .map(row => ({ ...row, amount: distributions.value.byDistrict.get(row.id)! }))
  .sort((a, b) => b.amount - a.amount),
)
const filteredPeople = computed(() => data.cubePeople.filter(([districtId, gender, ageGroup]) =>
  (props.region === '' || data.regionMap[data.districts[districtId]![0]] === +props.region) &&
  (district.value === '' || districtId === +district.value) &&
  (sex.value === '' || gender === +sex.value) &&
  (age.value === '' || ageGroup === +age.value),
))
const peopleCount = computed(() => {
  const annual = props.selectedMonths.length === 12
  const count = (total: number, months: number[]) => annual ? total
    : sum(props.selectedMonths.map(month => months[month] ?? 0)) / Math.max(1, props.selectedMonths.length)
  return benefit.value === ''
    ? sum(filteredPeople.value.map(row => count(row[3], row[4])))
    : sum(peopleRows.value.map(row => count(row[4], row[5])))
})
const peopleSum = computed(() => sum(districtRows.value.map(row => row.amount)))
watch(() => props.region, () => { district.value = '' })

const districtReport = computed<ReportOutput>(() => ({
  title: 'Tumanlar bo‘yicha to‘lovlar',
  metadata: [
    ['Manba', 'Nafaqa bazasi · 2025-yil'], ['Oylar', scopeMonths(props.selectedMonths)], ['Hudud', scopeRegion(props.region)],
    ['Tuman', district.value ? data.districts[+district.value]?.[1] ?? '' : 'Barcha tumanlar'],
    ['Nafaqa', benefit.value ? data.benefitTypes[+benefit.value] ?? '' : 'Barcha nafaqa turlari'],
    ['Jins', sex.value === '0' ? 'Erkak' : sex.value === '1' ? 'Ayol' : 'Barchasi'],
    ['Yosh guruhi', age.value ? ageGroups[+age.value] ?? '' : 'Barchasi'],
    ['To‘lov, mln so‘m', districtRows.value.length ? peopleSum.value : null],
  ],
  columns: ['Tuman', 'Summa, mln so‘m'],
  rows: districtRows.value.map(row => [row.name, row.amount]),
}))
const financeMetadata = computed<ReportOutput['metadata']>(() => [
  ['Yil', props.year], ['Davr', scopeMonths(props.selectedMonths)], ['Idora', scopeAgency(props.agency)],
  ['Manba', source.value], ['Qidirish', query.value || 'Barchasi'],
  ['Ko‘mak turi', data.labels.types[type.value] || 'Barchasi'],
  ['Yo‘nalish', data.labels.directions[direction.value] || 'Barchasi'],
  ['Aholi toifasi', data.labels.cohorts[cohort.value] || 'Barchasi'],
])
const regionalReport = computed<ReportOutput>(() => ({
  title: 'Hududlar bo‘yicha ko‘mak',
  metadata: [...financeMetadata.value, ['Qamrov', 'Hududiy ma’lumot taqdim etilgan choralar']],
  columns: ['Hudud', 'Summa, mlrd so‘m'],
  rows: regional.value.map(row => [row.name, row.total]),
}))
const measuresReport = computed<ReportOutput>(() => ({
  title: 'Ko‘rsatilgan ijtimoiy ko‘mak',
  metadata: [
    ...financeMetadata.value, ['Hudud', scopeRegion(props.region)],
    ['Tanlangan choralar', rows.value.length],
    ['Tanlangan summa, mlrd so‘m', rows.value.length ? sum(rows.value.map(row => row.total)) : null],
    ['Bo‘sh katak', 'Ma’lumot berilmagan'],
  ],
  columns: [
    'Chora', 'Idora', 'Tur', 'Yo‘nalish', 'Summa, mlrd so‘m', 'Oluvchilar', 'Hisob turi', 'Vedomost ijrosi, %',
    ...props.selectedMonths.map(month => months[month] + ' · ' + monthlyUnit.value),
  ],
  rows: rows.value.map(row => [
    row.line.n, organization(row.line.o), data.labels.types[row.line.t] ?? '', data.labels.directions[row.line.d] ?? '',
    row.total, row.line.cnt === null ? null : row.count, row.line.k === 'm' ? 'O‘rtacha oylik oluvchi' : 'Oluvchilar',
    row.plan > 0 ? row.total / row.plan * 100 : null, ...props.selectedMonths.map(month => monthValue(row, month)),
  ]),
}))
</script>

<template>
  <div class="np-section-stack">
    <template v-if="cut !== 'people'">
      <Teleport defer to="#support-filter-fields">
        <label>{{ benefitText('Chora nomi') }}<input v-model="query" type="search"></label>
        <label>{{ benefitText('Ko‘mak turi') }}
          <select v-model="type"><option value="">{{ benefitText('Barchasi') }}</option><option v-for="(name, key) in data.labels.types" :key="key" :value="key">{{ benefitText(name) }}</option></select>
        </label>
        <label>{{ benefitText('Ko‘mak yo‘nalishi') }}
          <select v-model="direction"><option value="">{{ benefitText('Barchasi') }}</option><option v-for="(name, key) in data.labels.directions" :key="key" :value="key">{{ benefitText(name) }}</option></select>
        </label>
        <label>{{ benefitText('Aholi toifasi') }}
          <select v-model="cohort"><option value="">{{ benefitText('Barchasi') }}</option><option v-for="(name, key) in data.labels.cohorts" :key="key" :value="key">{{ benefitText(name) }}</option></select>
        </label>
        <label>{{ benefitText('Oylik ko‘rsatkich') }}
          <select v-model="metric"><option value="amount">{{ benefitText('Summa') }}</option><option value="count">{{ benefitText('Oluvchilar') }}</option></select>
        </label>
      </Teleport>
      <section v-if="cut === 'regions'" class="np-card">
        <header class="np-card-heading">
          <div><h3>{{ benefitText('Hududlar bo‘yicha ko‘mak') }}</h3><p>{{ benefitText(year + ' · ' + scopeMonths(selectedMonths) + ' · ' + scopeAgency(agency)) }}</p></div>
          <ReportActions filename="Hududlar_hisoboti.xlsx" :report="regionalReport" csv />
        </header>
        <div class="finance-region-grid">
          <RegionMap :values="mapValues" :selected="region" @select="emit('region', $event)" />
          <div class="region-ranking">
            <button v-for="row in regional" :key="row.index" :aria-pressed="region === String(row.index)" @click="emit('region', String(row.index))">
              <span>{{ benefitText(row.name) }}</span>
              <b>{{ benefitText(row.total === null ? 'Ma’lumot yo‘q' : money(row.total * 1e9) + ' so‘m') }}</b>
              <i v-if="row.total !== null" :style="{ width: row.total / regionalMax * 100 + '%' }" />
            </button>
          </div>
        </div>
        <div v-if="region !== ''" class="np-toolbar selected-scope">
          <p>{{ benefitText(scopeRegion(region)) }}</p>
          <button class="np-button" @click="emit('district')">{{ benefitText('Tumanlar kesimi · 2025-yil nafaqa bazasi') }} <ArrowRight :size="14" /></button>
        </div>
      </section>
      <FinanceComparison :lines="lines" :year="year" :region="region" :selected-months="selectedMonths" />
      <section class="np-card">
        <header class="np-card-heading">
          <div>
            <h3>{{ benefitText('Ko‘rsatilgan ijtimoiy ko‘mak') }}</h3>
            <p>{{ benefitText(scope) }}</p>
            <p>{{ benefitText(rows.length ? rows.length + ' ta chora · ' + money(sum(rows.map(row => row.total)) * 1e9) + ' so‘m · ' + source : source) }}</p>
          </div>
          <ReportActions filename="Korsatilgan_choralar.xlsx" :report="measuresReport" csv />
        </header>
        <div class="np-table-wrap">
          <table class="np-table">
            <thead><tr>
              <th>{{ benefitText('Chora') }}</th><th>{{ benefitText('Idora') }}</th>
              <th>{{ benefitText('Ko‘rsatilgan ko‘mak') }}</th><th>{{ benefitText('Oluvchilar') }}</th>
              <th>{{ benefitText('Vedomost ijrosi') }}</th>
              <th v-for="month in selectedMonths" :key="month">{{ benefitText(months[month]) }}<small>{{ benefitText(monthlyUnit) }}</small></th>
              <th></th>
            </tr></thead>
            <tbody>
              <tr v-for="row in rows" :key="row.line.id">
                <td><button class="text-button" @click="emit('open', row)">{{ benefitText(row.line.n) }}</button>
                  <small>{{ benefitText(data.labels.types[row.line.t]) }} · {{ benefitText(data.labels.directions[row.line.d]) }}</small></td>
                <td>{{ benefitText(organization(row.line.o)) }}</td>
                <td><b>{{ benefitText(money(row.total * 1e9)) }}</b><small>{{ benefitText('so‘m') }}</small></td>
                <td>{{ row.line.cnt === null ? '—' : num(row.count) }}<small>{{ benefitText(row.line.k === 'm' ? 'O‘rtacha oylik oluvchi' : 'Oluvchilar') }}</small></td>
                <td><span v-if="row.plan > 0" class="np-tag" :class="row.total / row.plan < .9 ? 'amber' : 'green'">{{ num(row.total / row.plan * 100, 1) }}%</span><span v-else>—</span></td>
                <td v-for="month in selectedMonths" :key="month">{{ monthValue(row, month) === null ? '—' : num(monthValue(row, month)!, metric === 'amount' ? 3 : 0) }}</td>
                <td><button class="icon-button" :aria-label="benefitText(row.line.n + ' tafsiloti')" @click="emit('open', row)"><ArrowUpRight :size="16" /></button></td>
              </tr>
              <tr v-if="!rows.length"><td :colspan="6 + selectedMonths.length" class="np-empty">{{ benefitText('Tanlangan kesim bo‘yicha ma’lumot yo‘q.') }}</td></tr>
            </tbody>
          </table>
        </div>
        <p class="np-note">{{ benefitText('— Ma’lumot berilmagan. Hududiy ko‘rsatkichlar manbada berilgan choralarni qamraydi. Oluvchilar har bir chora bo‘yicha alohida sanaladi.') }}</p>
      </section>
    </template>
    <template v-else>
      <Teleport defer to="#support-filter-fields">
        <label>{{ benefitText('Fuqaro tumani') }}
          <select v-model="district"><option value="">{{ benefitText('Barcha tumanlar') }}</option><option v-for="row in districts" :key="row.id" :value="String(row.id)">{{ benefitText(row.name) }}</option></select>
        </label>
        <label>{{ benefitText('Nafaqa turi') }}
          <select v-model="benefit"><option value="">{{ benefitText('Barcha nafaqa turlari') }}</option><option v-for="(name, id) in data.benefitTypes" :key="id" :value="String(id)">{{ benefitText(name) }}</option></select>
        </label>
        <label>{{ benefitText('Jins') }}
          <select v-model="sex"><option value="">{{ benefitText('Barchasi') }}</option><option value="0">{{ benefitText('Erkak') }}</option><option value="1">{{ benefitText('Ayol') }}</option></select>
        </label>
        <label>{{ benefitText('Yosh guruhi') }}
          <select v-model="age"><option value="">{{ benefitText('Barchasi') }}</option><option v-for="(name, id) in ageGroups" :key="id" :value="String(id)">{{ benefitText(name) }}</option></select>
        </label>
      </Teleport>
      <section class="np-card">
        <header class="np-card-heading">
          <div><h3>{{ benefitText('Nafaqa oluvchilar va to‘lovlar') }}</h3><p>{{ benefitText('2025-yil · ' + scopeRegion(region) + ' · ' + scopeMonths(selectedMonths)) }}</p></div>
          <ReportActions filename="Tumanlar_hisoboti.xlsx" :report="districtReport" csv />
        </header>
        <div class="people-metrics">
          <div><span>{{ benefitText(selectedMonths.length === 12 ? 'Kesimdagi yillik hisoblar' : 'O‘rtacha oylik oluvchilar') }}</span><strong>{{ num(peopleCount) }}</strong><small>{{ benefitText('Hududlararo takrorlar bo‘lishi mumkin') }}</small></div>
          <div><span>{{ benefitText('Tanlangan oylarda to‘lov') }}</span><strong>{{ benefitText(districtRows.length ? money(peopleSum * 1e6) : '—') }}</strong><small>{{ benefitText('so‘m') }}</small></div>
          <div><span>{{ benefitText('Tumanlar') }}</span><strong>{{ num(districtRows.length) }}</strong><small>{{ benefitText('Tanlovdagi yozuvlar') }}</small></div>
        </div>
        <div class="finance-region-grid">
          <div>
            <h3>{{ benefitText('Tumanlar bo‘yicha to‘lov') }}</h3>
            <div class="district-scroll">
              <button v-for="row in districtRows" :key="row.id" class="district-row" :aria-pressed="district === String(row.id)" @click="district = district === String(row.id) ? '' : String(row.id)">
                <span>{{ benefitText(row.name) }}</span><b>{{ benefitText(money(row.amount * 1e6) + ' so‘m') }}</b>
              </button>
              <p v-if="!districtRows.length">{{ benefitText('Tanlangan kesim bo‘yicha ma’lumot yo‘q.') }}</p>
            </div>
          </div>
          <div>
            <h3>{{ benefitText('Nafaqa turlari bo‘yicha to‘lov') }}</h3>
            <div class="district-scroll">
              <button v-for="row in benefitsByAmount" :key="row.id" class="district-row" :aria-pressed="benefit === String(row.id)" @click="benefit = benefit === String(row.id) ? '' : String(row.id)">
                <span>{{ benefitText(row.label) }}</span><b>{{ benefitText(money(row.amount * 1e6) + ' so‘m') }}</b>
              </button>
              <p v-if="!benefitsByAmount.length">{{ benefitText('Tanlangan kesim bo‘yicha ma’lumot yo‘q.') }}</p>
            </div>
          </div>
        </div>
      </section>
      <RecipientAnalysis :region="region" :district="district" :benefit="benefit" :sex="sex" :age="age" :selected-months="selectedMonths" @family="(family, member) => emit('family', family, member)" />
    </template>
  </div>
</template>

<style scoped>
.finance-region-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; margin:18px 0 }
.region-ranking { display:grid; align-content:start; gap:4px }
.region-ranking button { display:flex; justify-content:space-between; position:relative; gap:12px; font-size:12px; text-align:left; padding:8px 10px; color:var(--muted-foreground); border-radius:7px }
.region-ranking button b { color:var(--primary); white-space:nowrap }
.region-ranking button i { position:absolute; bottom:0; left:0; height:2px; background:color-mix(in srgb,var(--primary) 45%,transparent); transition:width .3s }
.region-ranking button[aria-pressed=true], .district-row[aria-pressed=true] { background:color-mix(in srgb,var(--primary) 9%,var(--card)) }
.selected-scope { margin-bottom:0 }
.np-table td:first-child { min-width:clamp(175px,22vw,270px) }
.people-metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin:18px 0 }
.people-metrics > div { display:grid; gap:8px; background:var(--muted); padding:18px; border-radius:14px }
.people-metrics span,.people-metrics small { font-size:12px; color:var(--muted-foreground) }
.people-metrics strong { font-size:clamp(17px,2vw,28px); color:var(--primary) }
.district-scroll { max-height:430px; overflow:auto; margin-top:12px }
.district-row { display:flex; justify-content:space-between; align-items:center; gap:10px; text-align:left; width:100%; font-size:12px; padding:10px 6px; border-bottom:1px solid var(--border); color:var(--muted-foreground) }
.district-row b { color:var(--primary); white-space:nowrap }
@media (max-width:850px) { .finance-region-grid,.people-metrics { grid-template-columns:1fr } }
@media (prefers-reduced-motion:reduce) { .region-ranking button i { transition:none } }
</style>
