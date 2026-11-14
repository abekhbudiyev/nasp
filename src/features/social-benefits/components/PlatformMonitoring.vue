<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { Activity, AlertCircle, AlertTriangle, ArrowRight, CheckCircle2, Clock3, Database, Map, Table2 } from 'lucide-vue-next'
import geography from '../platform-regions.json'

const periods = ['Avgust', 'Sentabr', 'Oktabr']
const categories = ['Pul to‘lovi', 'Xizmat', 'Imtiyoz']
const statusDefinitions = [
  { key: 'accepted', title: 'Hisobga olindi', icon: CheckCircle2, color: 'green', detail: 'Chora kodi va manba hodisasi tekshirildi. Ijro fuqaro tarixida aks etadi.' },
  { key: 'pending', title: 'Kutilmoqda', icon: Clock3, color: 'blue', detail: 'Idoradan tasdiq kutilmoqda. Yakuniy ijro sifatida hisoblanmagan.' },
  { key: 'duplicate', title: 'Takroriy xabar', icon: AlertTriangle, color: 'amber', detail: 'Bir xil manba hodisasi qayta yuborilgan. Birlamchi ijro yozuviga bog‘landi.' },
  { key: 'returned', title: 'Manbaga qaytarildi', icon: AlertCircle, color: 'red', detail: 'Masalan, chora kodi yoki majburiy maydon yetishmaydi. Idora tuzatib qayta yuboradi.' },
] as const

type Status = typeof statusDefinitions[number]['key']
type Counts = Record<Status, number>
type Metric = Status | 'received'

const records = geography.items.flatMap((region, regionIndex) =>
  periods.flatMap((period, monthIndex) =>
    categories.map((category, categoryIndex) => {
      const received = (430 + (regionIndex * 317) % 1150 + monthIndex * 77) * (3 - categoryIndex)
      const pending = Math.round(received * (3 + (regionIndex + monthIndex) % 6) / 100)
      const duplicate = Math.round(received * (1 + (regionIndex + categoryIndex) % 4) / 100)
      const returned = Math.round(received * (1 + (regionIndex + monthIndex + categoryIndex) % 4) / 100)
      return { region: region.key, period, category, counts: { accepted: received - pending - duplicate - returned, pending, duplicate, returned } }
    }),
  ),
)

const month = ref('Oktabr')
const category = ref('')
const region = ref('')
const mode = ref<'map' | 'table'>('map')
const metric = ref<Metric>('received')
const formatter = new Intl.NumberFormat('uz-UZ')
const number = (value: number) => formatter.format(value)
const total = (counts: Counts) => counts.accepted + counts.pending + counts.duplicate + counts.returned
const metricValue = (counts: Counts, key: Metric) => key === 'received' ? total(counts) : counts[key]
function summarize(rows: typeof records) {
  return rows.reduce((counts, row) => {
    for (const { key } of statusDefinitions) counts[key] += row.counts[key]
    return counts
  }, { accepted: 0, pending: 0, duplicate: 0, returned: 0 })
}

const slice = computed(() => records.filter(row => row.period === month.value && (!category.value || row.category === category.value)))
const regionRows = computed(() => geography.items.map(item => ({ ...item, counts: summarize(slice.value.filter(row => row.region === item.key)) })))
const summary = computed(() => summarize(slice.value.filter(row => !region.value || row.region === region.value)))
const scope = computed(() => regionRows.value.find(row => row.key === region.value)?.uz ?? 'Respublika')
const maxRegionMetric = computed(() => Math.max(1, ...regionRows.value.map(row => metricValue(row.counts, metric.value))))
const metrics = [{ key: 'received', title: 'Kelgan xabarlar', icon: Activity, color: 'indigo' }, ...statusDefinitions] as const
const selectedMetric = computed(() => metrics.find(item => item.key === metric.value)!)
const detail = computed(() => statusDefinitions.find(item => item.key === metric.value))
const months = computed(() => periods.map(period => ({
  period,
  count: metricValue(summarize(records.filter(row => row.period === period && (!region.value || row.region === region.value) && (!category.value || row.category === category.value))), metric.value),
})))
const maxMonth = computed(() => Math.max(1, ...months.value.map(item => item.count)))
const display = ref<Record<Metric, number>>({ received: 0, accepted: 0, pending: 0, duplicate: 0, returned: 0 })
let frame = 0

watch(summary, counts => {
  cancelAnimationFrame(frame)
  const start = performance.now()
  const previous = { ...display.value }
  const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600
  function tick(now: number) {
    const progress = duration ? Math.min(1, (now - start) / duration) : 1
    const eased = 1 - (1 - progress) ** 3
    for (const { key } of metrics) display.value[key] = Math.round(previous[key] + (metricValue(counts, key) - previous[key]) * eased)
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}, { immediate: true })

onUnmounted(() => cancelAnimationFrame(frame))
</script>

<template>
  <section class="monitor" aria-labelledby="monitor-title">
    <header class="monitor-header">
      <div>
        <p class="sample-label">Namunaviy ma’lumotlar · 2026</p>
        <h2 id="monitor-title">Respublika bo‘yicha ijro monitoringi</h2>
      </div>
      <div class="monitor-filters">
        <label>Oy<select v-model="month"><option v-for="period in periods" :key="period">{{ period }}</option></select></label>
        <label>Chora turi<select v-model="category"><option value="">Barcha turlar</option><option v-for="item in categories" :key="item">{{ item }}</option></select></label>
        <label>Hudud<select v-model="region"><option value="">Respublika</option><option v-for="item in regionRows" :key="item.key" :value="item.key">{{ item.uz }}</option></select></label>
      </div>
    </header>

    <div class="monitor-metrics" aria-label="Xabarlar holati">
      <button v-for="item in metrics" :key="item.key" type="button" :data-color="item.color" :aria-pressed="metric === item.key" @click="metric = item.key">
        <component :is="item.icon" :size="18" aria-hidden="true" />
        <strong aria-hidden="true">{{ number(display[item.key]) }}</strong>
        <span class="sr-only">{{ number(metricValue(summary, item.key)) }}</span>
        <span>{{ item.title }}</span>
      </button>
    </div>

    <div class="monitor-grid">
      <section class="monitor-panel" :data-color="selectedMetric.color">
        <div class="monitor-header">
          <div><p class="scope">{{ scope }} · {{ month }}</p><h3>{{ selectedMetric.title }} hududlar kesimida</h3></div>
          <div class="mode" aria-label="Ko‘rinish">
            <button type="button" :aria-pressed="mode === 'map'" @click="mode = 'map'"><Map :size="15" /> Xarita</button>
            <button type="button" :aria-pressed="mode === 'table'" @click="mode = 'table'"><Table2 :size="15" /> Jadval</button>
          </div>
        </div>
        <template v-if="mode === 'map'">
          <svg :viewBox="geography.viewBox.join(' ')" class="region-map" role="group" aria-label="O‘zbekiston hududlarini tanlash">
            <path v-for="item in regionRows" :key="item.key" :d="item.d" role="button" tabindex="0"
              :aria-label="item.uz + ', ' + number(metricValue(item.counts, metric))"
              :aria-pressed="region === item.key"
              :class="{ selected: region === item.key }"
              :style="{ '--density': Math.round(22 + metricValue(item.counts, metric) / maxRegionMetric * 68) + '%' }"
              @click="region = region === item.key ? '' : item.key"
              @keydown.enter="region = region === item.key ? '' : item.key"
              @keydown.space.prevent="region = region === item.key ? '' : item.key">
              <title>{{ item.uz }} · {{ number(metricValue(item.counts, metric)) }}</title>
            </path>
          </svg>
          <p class="map-credit">Chegaralar HTML namunasidan · geoBoundaries (OSM, ODbL va OCHA ROCCA, CC BY 3.0 IGO)</p>
        </template>
        <div v-else class="region-table">
          <table><thead><tr><th>Hudud</th><th>{{ selectedMetric.title }}</th></tr></thead><tbody>
            <tr v-for="item in regionRows" :key="item.key"><td><button type="button" :aria-pressed="region === item.key" @click="region = region === item.key ? '' : item.key">{{ item.uz }}</button></td><td>{{ number(metricValue(item.counts, metric)) }}</td></tr>
          </tbody></table>
        </div>
      </section>
      <section class="monitor-panel process">
        <h3>Xabar YAMIHda qanday tekshiriladi?</h3>
        <div class="process-entry"><Activity :size="19" /><span>Idoralardan kelgan</span><strong>{{ number(total(summary)) }}</strong></div>
        <div class="process-check"><Database :size="17" /> Chora kodi va hodisa ID tekshiriladi</div>
        <button v-for="item in statusDefinitions" :key="item.key" class="process-result" type="button" :data-color="item.color" :aria-pressed="metric === item.key" @click="metric = item.key">
          <component :is="item.icon" :size="17" /><span>{{ item.title }}</span><strong>{{ number(summary[item.key]) }}</strong>
        </button>
        <p v-if="detail" class="process-detail" :data-color="detail.color">{{ detail.detail }}</p>
        <RouterLink :to="{ name: 'social-benefits-platform-execution' }">Bitta xabar misolida ko‘rish <ArrowRight :size="16" /></RouterLink>
      </section>
    </div>

    <section class="monitor-panel trend" :data-color="selectedMetric.color">
      <h3>Oylar bo‘yicha · {{ selectedMetric.title }}</h3>
      <div v-for="item in months" :key="item.period" class="trend-row">
        <button type="button" :aria-pressed="month === item.period" @click="month = item.period">{{ item.period }}</button>
        <div class="trend-track" aria-hidden="true"><i :style="{ width: 100 * item.count / maxMonth + '%' }" /></div>
        <strong>{{ number(item.count) }}</strong>
      </div>
    </section>
  </section>
</template>

<style scoped>
.monitor { display: grid; gap: 1rem; color: var(--foreground); }
.monitor-header { display: flex; align-items: start; justify-content: space-between; flex-wrap: wrap; gap: .8rem; }
.monitor-header h2 { font-size: clamp(1.3rem, 2vw, 1.8rem); font-weight: 750; }
.sample-label, .scope { color: var(--muted-foreground); font-size: .8rem; font-weight: 650; }
.monitor-filters { display: flex; flex-wrap: wrap; gap: .6rem; }
.monitor-filters label { display: grid; gap: .25rem; font-size: .78rem; font-weight: 650; }
.monitor select, .mode button { background: var(--card); border: 1px solid var(--border); border-radius: .4rem; padding: .45rem .6rem; }
.monitor button:focus-visible, .monitor path:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
[data-color='indigo'] { --tone: #625fd8; }
[data-color='green'] { --tone: #168875; }
[data-color='blue'] { --tone: #3c80c8; }
[data-color='amber'] { --tone: #b57515; }
[data-color='red'] { --tone: #ce4359; }
.monitor-metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .65rem; }
.monitor-metrics button, .process-result { text-align: left; border: 1px solid var(--border); border-radius: .65rem; background: var(--card); transition: border-color .2s, background-color .2s; }
.monitor-metrics button { display: grid; gap: .3rem; align-content: start; padding: .85rem; border-top: 3px solid var(--tone); }
.monitor-metrics button svg, .process-result svg { color: var(--tone); }
.monitor-metrics button:hover, .monitor-metrics button[aria-pressed='true'], .process-result[aria-pressed='true'], .process-result:hover { background: color-mix(in oklch, var(--tone) 14%, var(--card)); border-color: var(--tone); }
.monitor-metrics strong { font-size: clamp(1.3rem, 2.35vw, 2.25rem); line-height: 1.15; font-variant-numeric: tabular-nums; }
.monitor-metrics span { font-size: .82rem; font-weight: 650; }
.monitor-grid { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr); gap: 1rem; }
.monitor-panel { min-width: 0; border: 1px solid var(--border); background: var(--card); border-radius: .8rem; padding: 1rem; }
.monitor-panel h3 { font-weight: 720; font-size: 1rem; }
.mode { display: flex; flex-wrap: wrap; gap: .3rem; }
.mode button { display: flex; align-items: center; gap: .3rem; font-size: .77rem; }
.mode [aria-pressed='true'], .trend button[aria-pressed='true'], .region-table button[aria-pressed='true'] { background: var(--accent); font-weight: 700; }
.region-map { width: 100%; max-height: 340px; margin-top: .5rem; }
.region-map path { cursor: pointer; fill: color-mix(in oklch, var(--tone) var(--density), var(--card)); stroke: var(--card); stroke-width: 1.5; transition: fill .45s, stroke .25s; }
.region-map path:hover, .region-map path.selected { fill: var(--tone); stroke: var(--foreground); stroke-width: 3; }
.map-credit { color: var(--muted-foreground); font-size: .69rem; }
.region-table { overflow: auto; max-height: 330px; }
.region-table table { width: 100%; font-size: .82rem; }
.region-table th, .region-table td { text-align: left; padding: .35rem; border-bottom: 1px solid var(--border); }
.region-table th:last-child, .region-table td:last-child { text-align: right; }
.region-table button, .trend button { padding: .25rem .4rem; border-radius: .3rem; }
.process { display: grid; align-content: start; gap: .55rem; }
.process-entry, .process-result { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .55rem; padding: .6rem .7rem; font-size: .84rem; }
.process-entry { background: var(--muted); border-radius: .55rem; margin-top: .3rem; }
.process-check { display: flex; align-items: center; gap: .4rem; padding: .2rem .7rem; font-size: .79rem; color: var(--muted-foreground); }
.process-detail { border-inline-start: 3px solid var(--tone); padding-inline-start: .6rem; font-size: .83rem; }
.process a { display: inline-flex; align-items: center; gap: .35rem; font-size: .85rem; font-weight: 650; margin-top: .4rem; }
.trend { display: grid; gap: .45rem; }
.trend-row { display: grid; grid-template-columns: 5rem 1fr 4.2rem; align-items: center; gap: .5rem; font-size: .8rem; }
.trend-row strong { text-align: right; }
.trend-track { background: var(--muted); height: .5rem; border-radius: 1rem; overflow: hidden; }
.trend-track i { display: block; height: 100%; background: var(--tone); transition: width .55s ease; }
@media (max-width: 900px) { .monitor-grid { grid-template-columns: minmax(0, 1fr); } .monitor-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 500px) { .monitor-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (prefers-reduced-motion: reduce) { .monitor *, .monitor path { transition: none; } }
</style>
