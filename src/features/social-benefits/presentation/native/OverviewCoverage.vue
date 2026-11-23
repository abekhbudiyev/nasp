<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, latin, money, num, months, organization } from './data'
import { reportedMonth } from './report-output'
import RegionMap from './RegionMap.vue'
import CoverageBreakdowns from './CoverageBreakdowns.vue'
import CoveragePeriodPicker, { type CoveragePeriod } from './CoveragePeriodPicker.vue'

type CoverageValues = { name: string; amount: number | null; measures: number | null }
type Territory = CoverageValues & { index: number; people: number | null; support: (CoverageValues & { key: string })[] }
type Organization = CoverageValues & { key: string }

const props = defineProps<{
  regions: Territory[]
  organizations: Organization[]
  cohorts: Organization[]
  measures: (Organization & { kind: string })[]
  region: string
  agency: string
  selection: CoveragePeriod
  dailyUnavailable: boolean
  year: number
  amount: number | null
}>()
const emit = defineEmits<{ region: [string]; agency: [string]; period: [CoveragePeriod] }>()

const district = ref('')
watch(() => props.region, () => { district.value = '' })
const districts = computed(() => data.districts.map(([region, name], index) => ({ region, name: latin(name), key: String(index) })).filter(item => String(item.region) === props.region))
const districtName = computed(() => districts.value.find(item => item.key === district.value)?.name)
const territory = computed(() => props.regions.find(item => String(item.index) === props.region))
const values = computed(() => props.regions.map(item => item.amount))
const details = computed(() => props.regions.map(item => {
  if (item.amount === null && item.measures === null) return 'Ma’lumot mavjud emas'
  return [measureLabel(item.measures), exactAmount(item.amount)].join(' · ')
}))

function supportRows(key: string, region: number) {
 const line = data.finance.find(line => line.id === key && (!props.agency || line.o === props.agency))
 if (!line) return { agency: '', rows: [] }
 const period = props.selection.period
 const indices = period === 'all' ? months.map((_,i) => i) : /^q[0-3]$/.test(period) ? [0,1,2].map(i => Number(period.slice(1))*3+i) : /^\d+$/.test(period) ? [Number(period)] : period.startsWith('months:') ? period.slice(7).split(',').map(Number) : period.startsWith('upto') ? months.map((_,i) => i).filter(i => i <= Number(period.slice(4))) : []
 const years = props.selection.from && props.selection.to ? [2024,2025,2026] : [props.year]
 const rows = years.flatMap(year => months.flatMap((month,index) => {
   const key = year + '-' + String(index+1).padStart(2,'0')
   if (props.selection.from && props.selection.to) {
     if (props.dailyUnavailable || key < props.selection.from.slice(0,7) || key > props.selection.to.slice(0,7)) return []
   } else if (!indices.includes(index)) return []
   const value = reportedMonth(line, year, String(region), index)
   return value ? [{ key, month: month + ' ' + year, people: line.cnt === null ? null : value.c, amount: Math.round(value.s*1e9) }] : []
 }))
 return { agency: organization(line.o), rows }
}
function amountLabel(value: number | null) {
  return value === null ? '—' : money(value) + ' so‘m'
}
function exactAmount(value: number | null) {
  return value === null ? 'Ma’lumot mavjud emas' : num(value) + ' so‘m'
}
function measureLabel(value: number | null) {
  return value === null ? '—' : num(value) + ' ta chora'
}
</script>

<template>
  <section class="coverage-dashboard" aria-labelledby="coverage-heading">
    <div class="coverage-grid">
      <section class="np-card coverage-map">
        <header class="coverage-heading">
          <div>
            <h2 id="coverage-heading">{{ benefitText('Respublika bo‘yicha qo‘llab-quvvatlash chorasi jarayoni') }}</h2>
            <CoveragePeriodPicker :value="selection" @change="emit('period', $event)" />
            <p v-if="dailyUnavailable" role="status">{{ benefitText('Tanlangan oraliq uchun kunlik ma’lumot mavjud emas.') }}</p>
          </div>
          <div class="coverage-total">
            <span>{{ benefitText('Moliyalashtirilgan mablag‘') }}</span>
            <strong :title="benefitText(exactAmount(district ? null : amount))">{{ benefitText(amountLabel(district ? null : amount)) }}</strong>
            <small v-if="territory && !district">{{ benefitText(measureLabel(territory.measures)) }}</small>
          </div>
        </header>
        <nav class="territory-navigation" :aria-label="benefitText('Hudud kesimi')">
          <button type="button" @click="district = ''; emit('region', '')">{{ benefitText('Respublika') }}</button>
          <template v-if="territory"><span>›</span><button type="button" @click="district = ''">{{ benefitText(territory.name) }}</button></template>
          <template v-if="districtName"><span>›</span><strong>{{ benefitText(districtName) }}</strong></template>
        </nav>
        <label v-if="region" class="district-filter">{{ benefitText('Tuman / shahar') }}
          <select v-model="district"><option value="">{{ benefitText('Barcha tumanlar') }}</option><option v-for="item in districts" :key="item.key" :value="item.key">{{ benefitText(item.name) }}</option></select>
        </label>
        <label v-if="district" class="district-filter">{{ benefitText('Mahalla') }}<select disabled><option>{{ benefitText('Mahallalar ro‘yxati mavjud emas') }}</option></select></label>
        <p v-if="district" role="status">{{ benefitText('Bu tuman bo‘yicha mahallalar ro‘yxati, xarita chegaralari va moliyaviy ma’lumotlar manbaga ulanmagan. Xaritada tanlangan viloyat chegarasi ko‘rsatilgan.') }}</p>
        <RegionMap :focus-selected="true" :values="values" :details="details" :selected="region" @select="emit('region', $event)" />
      <p class="territory-source">{{ benefitText('Aholi soni — 2025-yil nafaqa oluvchilari bazasi bo‘yicha. Choralar soni va mablag‘ — tanlangan moliyaviy manba bo‘yicha; qamrovlar farq qilishi mumkin.') }}</p>
      <ul class="territory-list">
        <li v-for="item in regions" :key="item.index">
          <button type="button" :class="{ selected: String(item.index) === region }"
            :aria-pressed="String(item.index) === region"
            @click="emit('region', String(item.index))">
            <span class="territory-name">{{ benefitText(item.name) }}</span>
            <span class="territory-amount" :title="benefitText(exactAmount(item.amount))">{{ benefitText(amountLabel(item.amount)) }}</span>
            <small>{{ benefitText(measureLabel(item.measures)) }}</small>
            <span class="territory-people">{{ benefitText('Nafaqa oluvchilar') }}: <b>{{ item.people === null ? '—' : num(item.people) }}</b>{{ item.people === null ? '' : benefitText(' nafar') }}<small v-if="item.people !== null && selection.period !== 'all'">{{ benefitText(' (o‘rtacha oylik)') }}</small></span>
          </button>
          <details v-if="item.support.length" class="territory-support"><summary>{{ benefitText('Choralar va mablag‘lar') }}</summary><ul><li v-for="support in item.support" :key="support.key"><details class="support-detail"><summary><span>{{ benefitText(support.name) }}</span><b>{{ benefitText(amountLabel(support.amount)) }}</b></summary><div v-for="detail in [supportRows(support.key, item.index)]" :key="support.name" class="support-data"><p>{{ benefitText(detail.agency) }}</p><div class="support-table"><table><thead><tr><th>{{ benefitText('Oy') }}</th><th>{{ benefitText('Oluvchilar soni') }}</th><th>{{ benefitText('Mablag‘') }}</th></tr></thead><tbody><tr v-for="row in detail.rows" :key="row.key"><td>{{ benefitText(row.month) }}</td><td>{{ row.people === null ? '—' : num(row.people) }}</td><td>{{ benefitText(amountLabel(row.amount)) }}</td></tr><tr v-if="!detail.rows.length"><td colspan="3">{{ benefitText('Tanlangan davr bo‘yicha ma’lumot mavjud emas.') }}</td></tr></tbody></table></div></div></details></li></ul></details>
          <p v-else class="territory-missing">{{ benefitText('Tanlangan manbada hududiy ma’lumot yo‘q') }}</p>
        </li>
      </ul>
      </section>


    </div>
    <slot name="after-map" />
    <CoverageBreakdowns :unavailable="!!district" :scope="districtName ?? territory?.name ?? 'Respublika'" :cohorts="cohorts" :organizations="organizations" :measures="measures" :agency="agency" @agency="emit('agency', $event)" />


  </section>
</template>

<style scoped>
.coverage-dashboard { display: grid; gap: 18px; min-width: 0; }
.coverage-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
.coverage-grid > section, .coverage-regions { padding: clamp(16px, 1.7vw, 26px); }
.coverage-map :deep(.region-canvas) { min-height: 0; }
.coverage-map :deep(.map-caption) { min-height: 24px; height: auto; flex-wrap: wrap; }
.coverage-map :deep(.region-canvas svg) { max-height: clamp(184px, 32vh, 330px); }
.coverage-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-bottom: 12px;
}
.coverage-heading h2 { font-size: clamp(16px, 1.4vw, 21px); line-height: 1.24; }
.coverage-heading p { display: flex; align-items: center; gap: 5px; margin: 5px 0 0; }
.coverage-total {
  display: grid;
  gap: 2px;
  padding: 8px 12px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--primary) 10%, var(--card));
  color: var(--primary);
}
.coverage-total span { font-size: 11px; font-weight: 650; }
.coverage-total strong { font-size: clamp(17px, 1.65vw, 24px); font-variant-numeric: tabular-nums; }
.ministry-icon { color: var(--primary); flex: none; }
.coverage-table-wrap { max-height: 15rem; margin-top: 14px; border: 1px solid var(--border); border-radius: 12px; overflow: auto; }
.coverage-table-wrap table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.coverage-table-wrap thead { position: sticky; top: 0; background: color-mix(in srgb, var(--primary) 8%, var(--card)); }
.coverage-table-wrap :is(th, td) { padding: 9px 8px; text-align: start; font-size: 12px; }
.coverage-table-wrap :is(th, td):not(:first-child) { text-align: end; }
.coverage-table-wrap tbody tr + tr { border-top: 1px solid var(--border); }
.coverage-table-wrap tbody th { width: 46%; font-weight: 650; }
.coverage-table-wrap tbody button { display: flex; align-items: center; gap: 4px; text-align: start; color: var(--primary); }
.coverage-table-wrap svg { flex: none; }
.coverage-table-wrap .selected { background: color-mix(in srgb, var(--primary) 10%, var(--card)); }
.coverage-note { margin-top: 11px; }
.territory-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 12px;
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
}
.territory-list button {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 8px;
  text-align: start;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.territory-list button:hover {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, var(--card));
}
.territory-name { font-weight: 650; width: 100%; }
.territory-amount { order: 3; margin-left: auto; font-weight: 650; color: var(--primary); }
.territory-list small { color: var(--muted-foreground); }
@media (max-width: 1080px) {
  .coverage-grid { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 720px) {
  .territory-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 460px) {
  .territory-list { grid-template-columns: minmax(0, 1fr); }
}
.territory-navigation { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 12px 0; font-size: 13px; }
.territory-navigation button { color: var(--primary); }
.district-filter { display: grid; gap: 6px; max-width: 320px; font-size: 12px; margin-bottom: 12px; }
.district-filter select { padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); color: var(--foreground); }
.territory-people { width: 100%; font-size: 12px; }
.territory-support { padding: 6px 10px 10px; font-size: 12px; }
.territory-support summary { cursor: pointer; color: var(--primary); }
.territory-support ul { list-style: none; padding: 0; margin: 8px 0 0; }
.territory-support li { display: flex; justify-content: space-between; gap: 12px; padding: 6px 0; border-top: 1px solid var(--border); }
.territory-support b { white-space: nowrap; }
.territory-missing, .territory-source { font-size: 11px; color: var(--muted-foreground); padding: 4px 10px; }

.support-detail { width: 100%; min-width: 0; }
.support-detail > summary { display: flex; justify-content: space-between; gap: 12px; cursor: pointer; }
.support-detail > summary span::before { content: '▸ '; }
.support-detail[open] > summary span::before { content: '▾ '; }
.support-data { margin-top: 10px; color: var(--foreground); }
.support-table { overflow-x: auto; }
.support-table table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.support-table th, .support-table td { padding: 7px 4px; border-bottom: 1px solid var(--border); text-align: end; white-space: nowrap; }
.support-table th:first-child, .support-table td:first-child { text-align: start; }
</style>

<style scoped>
.coverage-map :deep(path[aria-pressed="true"]) { fill: #16a34a; }
.coverage-map :deep(path[aria-pressed="true"]:hover), .coverage-map :deep(path[aria-pressed="true"]:focus-visible) { fill: #15803d; }
.territory-list button.selected { background: #15803d; border-color: #15803d; color: #fff; }
.territory-list button.selected .territory-amount, .territory-list button.selected small { color: #fff; }
</style>
