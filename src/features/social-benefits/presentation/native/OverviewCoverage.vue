<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, latin, money, num, months, organization } from './data'
import { reportedMonth } from './report-output'
import RegionMap from './RegionMap.vue'
import CoverageBreakdowns from './CoverageBreakdowns.vue'
import CoveragePeriodPicker, { type CoveragePeriod } from './CoveragePeriodPicker.vue'

type CoverageValues = { name: string; amount: number | null; measures: number | null }
type Territory = CoverageValues & { index: number; services: number | null; people: number | null; support: (CoverageValues & { key: string })[] }
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
  measureCount: number | null
}>()
const emit = defineEmits<{ region: [string]; agency: [string]; period: [CoveragePeriod] }>()

const district = ref('')
const territoryOrder = ref('amount')
const rankedRegions = computed(() => [...props.regions].sort((a,b) => territoryOrder.value === 'name' ? a.name.localeCompare(b.name) : (b.amount ?? -1) - (a.amount ?? -1)))
const largestAmount = computed(() => Math.max(1,...props.regions.map(item=>item.amount ?? 0)))
watch(() => props.region, () => { district.value = '' })
const districts = computed(() => data.districts.map(([region, name], index) => ({ region, name: latin(name), key: String(index) })).filter(item => String(item.region) === props.region))
const districtName = computed(() => districts.value.find(item => item.key === district.value)?.name)
const territory = computed(() => props.regions.find(item => String(item.index) === props.region))
const values = computed(() => props.regions.map(item => item.amount))
const details = computed(() => props.regions.map(item => {
  if (item.amount === null && item.measures === null) return 'Ma’lumot mavjud emas'
  return [measureLabel(item.measures), exactAmount(item.amount)].join(' · ')
}))

function territoryBlocks(item: Territory) {
 const financial = item.support.filter(support => data.finance.find(line => line.id === support.key)?.d !== 'svc')
 const services = item.support.filter(support => data.finance.find(line => line.id === support.key)?.d === 'svc')
 return [
   { key: 'funding', title: 'Moliyalashtirilgan mablag‘', value: amountLabel(item.amount), rows: financial },
   { key: 'services', title: 'Ko‘rsatilgan xizmat turlari', value: item.services === null ? '—' : num(item.services) + ' ta', rows: services },
 ]
}
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
          <div class="coverage-summary">
          <div class="coverage-total"><span>{{ benefitText('Ko‘rsatilgan qo‘llab-quvvatlash choralari') }}</span><strong>{{ district || measureCount === null ? '—' : num(measureCount) }}<small v-if="!district && measureCount !== null"> {{ benefitText('ta') }}</small></strong></div>
          <div class="coverage-total">
            <span>{{ benefitText('Ma’lumoti mavjud hududlar') }}</span>
            <strong>{{ regions.filter(item=>item.amount !== null).length }} / {{ regions.length }}</strong>
          </div>
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
        <div class="coverage-map-layout"><div><RegionMap :focus-selected="true" :values="values" :details="details" :selected="region" @select="emit('region', $event)" /></div><aside class="map-ranking"><h3>{{ benefitText('Moliyalashtirish bo‘yicha yetakchi hududlar') }}</h3><button v-for="(item,index) in [...regions].filter(item=>item.amount !== null).sort((a,b)=>(b.amount ?? 0)-(a.amount ?? 0)).slice(0,5)" :key="item.index" @click="emit('region',String(item.index))"><span>{{ index+1 }}. {{ benefitText(item.name) }}</span><b>{{ benefitText(amountLabel(item.amount)) }}</b></button></aside></div>
      <p class="territory-source">{{ benefitText('Aholi soni — 2025-yil nafaqa oluvchilari bazasi bo‘yicha. Choralar soni va mablag‘ — tanlangan moliyaviy manba bo‘yicha; qamrovlar farq qilishi mumkin.') }}</p>
      <div class="territory-toolbar"><h3>{{ benefitText('Hududlar bo‘yicha taqsimot') }}</h3><label>{{ benefitText('Saralash') }}<select v-model="territoryOrder"><option value="amount">{{ benefitText('Summa bo‘yicha') }}</option><option value="name">{{ benefitText('Nomi bo‘yicha') }}</option></select></label></div><ul class="territory-list">
        <li v-for="item in rankedRegions" :key="item.index">
          <button type="button" :class="{ selected: String(item.index) === region }"
            :aria-pressed="String(item.index) === region"
            @click="emit('region', String(item.index))">
            <span class="territory-name">{{ benefitText(item.name) }}</span>
            <span class="territory-amount" :title="benefitText(exactAmount(item.amount))"><small>{{ benefitText('Moliyalashtirilgan mablag‘') }}</small>{{ benefitText(amountLabel(item.amount)) }}</span>
            <small>{{ benefitText(measureLabel(item.measures)) }}</small><span class="territory-services">{{ benefitText('Ko‘rsatilgan xizmat turlari') }}: <b>{{ item.services === null ? '—' : num(item.services) + benefitText(' ta') }}</b></span>
            <span class="territory-people">{{ benefitText('Nafaqa oluvchilar') }}: <b>{{ item.people === null ? '—' : num(item.people) }}</b>{{ item.people === null ? '' : benefitText(' nafar') }}<small v-if="item.people !== null && selection.period !== 'all'">{{ benefitText(' (o‘rtacha oylik)') }}</small></span>
          </button>
          <div class="territory-bar" aria-hidden="true"><i :style="{width:(item.amount ?? 0)/largestAmount*100+'%'}" /></div>
          <div class="territory-drilldowns">
            <details v-for="block in territoryBlocks(item)" :key="block.key" class="territory-support territory-drilldown">
              <summary><span>{{ benefitText(block.title) }}</span><strong>{{ benefitText(block.value) }}</strong></summary>
              <ul v-if="block.rows.length"><li v-for="support in block.rows" :key="support.key"><details class="support-detail"><summary><span>{{ benefitText(support.name) }}</span><b>{{ benefitText(amountLabel(support.amount)) }}</b></summary><div v-for="detail in [supportRows(support.key, item.index)]" :key="support.name" class="support-data"><p>{{ benefitText(detail.agency) }}</p><div class="support-table"><table><thead><tr><th>{{ benefitText('Oy') }}</th><th>{{ benefitText('Oluvchilar soni') }}</th><th>{{ benefitText('Mablag‘') }}</th></tr></thead><tbody><tr v-for="row in detail.rows" :key="row.key"><td>{{ benefitText(row.month) }}</td><td>{{ row.people === null ? '—' : num(row.people) }}</td><td>{{ benefitText(amountLabel(row.amount)) }}</td></tr><tr v-if="!detail.rows.length"><td colspan="3">{{ benefitText('Tanlangan davr bo‘yicha ma’lumot mavjud emas.') }}</td></tr></tbody></table></div></div></details></li></ul>
              <p v-else class="territory-missing">{{ benefitText(block.key === 'services' ? 'Tanlangan davr va hudud bo‘yicha ko‘rsatilgan xizmatlar ma’lumoti manbada mavjud emas.' : 'Tanlangan davr va hudud bo‘yicha moliyalashtirish tafsiloti manbada mavjud emas.') }}</p>
            </details>
          </div>
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
.coverage-map :deep(.region-canvas svg) { height: clamp(300px, 46vh, 500px); max-height: none; }
@media (max-width: 600px) { .coverage-map :deep(.region-canvas svg) { height: clamp(240px, 36vh, 340px); } }
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

<style scoped>
.coverage-summary { display: flex; flex-wrap: wrap; gap: 10px; }
.coverage-summary .coverage-total strong small { font-size: 13px; font-weight: 550; }
</style>

<style scoped>
.territory-amount { order: initial; margin-left: 0; width: 100%; display: grid; gap: 3px; }
.territory-amount small { font-size: 10px; font-weight: 500; }
.territory-services { width: 100%; font-size: 12px; }
</style>

<style scoped>
.territory-drilldowns { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; margin-top: 8px; }
.territory-drilldown { padding: 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--card); min-width: 0; }
.territory-drilldown > summary { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px; font-weight: 650; }
.territory-drilldown[open] { grid-column: 1 / -1; }
@media(max-width:600px) { .territory-drilldowns { grid-template-columns: minmax(0,1fr); } }
</style>

<style scoped>
.coverage-map-layout { display: grid; grid-template-columns: minmax(0,2fr) minmax(230px,1fr); gap: 24px; align-items: center; }
.map-ranking h3 { font-size: 14px; margin-bottom: 12px; }
.map-ranking button { display: grid; gap: 5px; width: 100%; text-align: start; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.map-ranking b { color: var(--primary); }
.territory-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; }
.territory-toolbar h3 { font-size: 15px; }.territory-toolbar label { display: flex; align-items: center; gap: 8px; font-size: 13px; }.territory-toolbar select { background: var(--card); color: var(--foreground); border: 1px solid var(--border); border-radius: 8px; padding: 7px; }
.territory-list { grid-template-columns: minmax(0,1fr); gap: 12px; }
.territory-list > li { border: 1px solid var(--border); border-radius: 12px; padding: 12px; overflow: hidden; }
.territory-list > li > button { border: 0; display: grid; grid-template-columns: minmax(180px,2fr) minmax(140px,1fr) minmax(100px,1fr); align-items: center; font-size: 13px; padding: 10px; }
.territory-list .territory-name,.territory-list .territory-amount,.territory-list .territory-people,.territory-list .territory-services { width: auto; font-size: 13px; }
.territory-list small,.territory-source,.territory-missing { font-size: 12px; color: var(--foreground); line-height: 1.5; }
.territory-bar { height: 5px; background: var(--muted); margin: 10px 0; border-radius: 5px; overflow: hidden; }.territory-bar i { display:block; height:100%; background:var(--primary); }
@media(max-width:850px) { .coverage-map-layout { grid-template-columns: minmax(0,1fr); }.territory-list > li > button { grid-template-columns: repeat(2,minmax(0,1fr)); } }
</style>
