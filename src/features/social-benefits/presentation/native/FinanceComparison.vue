<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeftRight } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { data, months, num, sum, type Finance } from './data'
import { financeSource, reportedMonth, scopeMonths, scopeRegion } from './report-output'

const props = defineProps<{ lines: Finance[]; year: number; region: string; selectedMonths: number[] }>()
const mode = ref<'none' | 'regions' | 'periods'>('none')
const compareRegion = ref('1')
const compareYear = ref(2024)
const comparePeriod = ref('match')
const comparisonMonths = computed(() => {
  if (comparePeriod.value === 'match') return props.selectedMonths
  if (comparePeriod.value === 'all') return months.map((_, index) => index)
  const start = Number(comparePeriod.value) * 3
  return [start, start + 1, start + 2]
})

function summarize(year: number, region: string, selectedMonths: number[]) {
  const rows = props.lines.map(line => selectedMonths.map(month => reportedMonth(line, year, region, month)).filter(value => value !== undefined))
  const regions = rows.filter(row => row.length > 0)
  const values = regions.flat()
  return {
    label: `${scopeRegion(region)} · ${year} · ${scopeMonths(selectedMonths)}`,
    amount: values.length ? sum(values.map(value => value.s)) : null,
    plan: values.some(value => value.p > 0) ? sum(values.map(value => value.p)) : null,
    coverage: regions.length,
    source: financeSource(year, selectedMonths),
  }
}

const primary = computed(() => summarize(props.year, props.region, props.selectedMonths))
const secondary = computed(() => mode.value === 'periods'
  ? summarize(compareYear.value, props.region, comparisonMonths.value)
  : summarize(props.year, compareRegion.value, props.selectedMonths))
const difference = computed(() => primary.value.amount === null || secondary.value.amount === null
  ? null : secondary.value.amount - primary.value.amount)
const largest = computed(() => Math.max(primary.value.amount ?? 0, secondary.value.amount ?? 0, 1))
</script>

<template>
  <Teleport defer to="#support-filter-fields">
    <label>{{ benefitText('Taqqoslash') }}
      <select v-model="mode">
        <option value="none">{{ benefitText('Taqqoslashsiz') }}</option>
        <option value="regions">{{ benefitText('Hududlar bo‘yicha') }}</option>
        <option value="periods">{{ benefitText('Davrlar bo‘yicha') }}</option>
      </select>
    </label>
    <label v-if="mode === 'regions'">{{ benefitText('Taqqoslanadigan hudud') }}
      <select v-model="compareRegion">
        <option value="">{{ benefitText('Respublika') }}</option>
        <option v-for="(name, index) in data.regions" :key="index" :value="String(index)">{{ benefitText(name) }}</option>
      </select>
    </label>
    <template v-if="mode === 'periods'">
      <label>{{ benefitText('Taqqoslanadigan yil') }}
        <select v-model.number="compareYear">
          <option :value="2024">{{ benefitText('2024 · namunaviy') }}</option>
          <option :value="2025">2025</option>
          <option :value="2026">{{ benefitText('2026 · namunaviy') }}</option>
        </select>
      </label>
      <label>{{ benefitText('Taqqoslanadigan davr') }}
        <select v-model="comparePeriod">
          <option value="match">{{ benefitText('Xuddi shu oylar') }}</option>
          <option value="all">{{ benefitText('Yil') }}</option>
          <option v-for="(label, index) in ['I chorak', 'II chorak', 'III chorak', 'IV chorak']" :key="index" :value="String(index)">{{ benefitText(label) }}</option>
        </select>
      </label>
    </template>
  </Teleport>
  <section v-if="mode !== 'none'" class="np-card">
    <header class="np-card-heading">
      <div><h3>{{ benefitText('Tanlovlarni taqqoslash') }}</h3><p>{{ benefitText('Ko‘rsatilgan ko‘mak, mlrd so‘m') }}</p></div>
      <ArrowLeftRight :size="18" />
    </header>
    <div class="comparison">
      <article v-for="(item, index) in [primary, secondary]" :key="index">
        <h4>{{ benefitText(item.label) }}</h4>
        <strong>{{ item.amount === null ? benefitText('Ma’lumot yo‘q') : num(item.amount, 2) }}</strong>
        <div v-if="item.amount !== null" class="bar" aria-hidden="true"><i :style="{ width: item.amount / largest * 100 + '%' }" /></div>
        <p>{{ benefitText(item.coverage + ' ta moliyaviy chora · ' + item.source) }}</p>
        <p v-if="item.plan !== null">{{ benefitText('Vedomost') }} {{ num(item.plan, 2) }}</p>
      </article>
    </div>
    <p v-if="difference !== null" class="np-note" aria-live="polite">
      {{ benefitText('Ikkinchi tanlov farqi') }} <b>{{ difference > 0 ? '+' : '' }}{{ num(difference, 2) }}</b> {{ benefitText('mlrd so‘m') }}
    </p>
  </section>
</template>

<style scoped>
.comparison { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px }
.comparison article { display:grid; align-content:start; gap:8px; padding:16px; border:1px solid var(--border); border-radius:14px }
.comparison strong { font-size:clamp(17px,2vw,26px); color:var(--primary) }
.bar { height:7px; background:var(--muted); border-radius:99px; overflow:hidden }
.bar i { display:block; background:var(--primary); border-radius:inherit; height:100%; transition:width .25s }
.comparison article:nth-child(2) .bar i { background:#468aa4 }
@media (max-width:640px) { .comparison { grid-template-columns:1fr } }
@media (prefers-reduced-motion:reduce) { .bar i { transition:none } }
</style>
