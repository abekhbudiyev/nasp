<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { ArrowUpRight, CalendarDays, Landmark } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import AnimatedNumber from './AnimatedNumber.vue'
import MonitoringFocus from './MonitoringFocus.vue'
import VisitTrendChart from './VisitTrendChart.vue'
import { quotaRows } from './attendance'
import type { DailyVisit } from './attendance'
import { centerFor, relativeDate, serviceName } from './model'
import type { CenterState, Placement } from './model'

const props = defineProps<{
  state: CenterState
  placements: Placement[]
  visibleDays: DailyVisit[]
  periodDays: DailyVisit[]
  today: string
  from: string
  to: string
  metrics: { title: string; value: number | null; suffix?: string; decimals?: number; hint: string; icon: Component; path: string; tone: string; period?: boolean }[]
  location: (path: string, filters?: Record<string, string>) => RouteLocationRaw
}>()

const number = new Intl.NumberFormat('uz-UZ')
const rows = computed(() => quotaRows(props.state, props.placements, props.visibleDays, props.today))
const total = computed(() => rows.value.reduce((sum, row) => {
  if (row.passport) {
    sum.passports++
    sum.voucher += row.passport.voucher
    sum.paid += row.passport.paid
    sum.actualVoucher += row.actual.voucher
    sum.actualPaid += row.actual.paid
  } else {
    sum.unapproved += row.actual.voucher + row.actual.paid + row.actual.unknown
  }
  return sum
}, { passports: 0, voucher: 0, paid: 0, actualVoucher: 0, actualPaid: 0, unapproved: 0 }))
const split = computed(() => [
  { key: 'voucher', title: 'Vaucherli o‘rinlar', actual: total.value.actualVoucher, limit: total.value.voucher },
  { key: 'paid', title: 'Pullik o‘rinlar', actual: total.value.actualPaid, limit: total.value.paid },
])
const alerts = computed(() => {
  const placementIndex = new Map(props.placements.map(placement => [placement.id, placement]))
  const overdue = props.state.findings.flatMap(finding => {
    const placement = placementIndex.get(finding.placementId)
    if (!placement || finding.status !== 'open' || !finding.due || finding.due >= props.today) return []
    const center = centerFor(props.state, placement.id)
    return [{
      id: finding.id,
      title: 'Sifat nazorati muddati o‘tgan',
      detail: [center?.name, serviceName(placement.serviceId), `Muddat ${finding.due.split('-').reverse().join('.')}`].filter(Boolean).join(' · '),
      to: props.location('/quality', { center: center?.id ?? '', service: placement.serviceId }),
    }]
  })
  return [...overdue, ...rows.value.flatMap(({ alerts, placement, center }) => alerts.map(title => ({
    id: placement.id + title, title,
    detail: [center?.name, serviceName(placement.serviceId)].filter(Boolean).join(' · '),
    to: props.location('/capacity', { center: center?.id ?? '', service: placement.serviceId, placement: placement.id, view: 'usage' }),
  })))]
})
const trend = computed(() => {
  const end = props.to && props.to < props.today ? props.to : props.today
  const start = props.from || relativeDate(end, -13)
  const span = (Date.parse(end) - Date.parse(start)) / 86_400_000 + 1
  if (!Number.isSafeInteger(span) || span < 1) return { step: 1, groups: [] }
  const step = Math.ceil(span / 14)
  const groups = Array.from({ length: Math.ceil(span / step) }, (_, index) => ({
    day: relativeDate(start, index * step),
    last: relativeDate(start, Math.min(span, (index + 1) * step) - 1),
    voucher: 0, paid: 0, unknown: 0,
  }))
  const startTime = Date.parse(start)
  for (const row of props.periodDays) {
    if (row.date < start || row.date > end) continue
    const offset = (Date.parse(row.date) - startTime) / 86_400_000
    const bucket = groups[Math.floor(offset / step)]
    if (bucket) bucket[row.funding]++
  }
  return { step, groups }
})
const series = computed(() => trend.value.groups)
const selectedBucket = ref('')
const selectedPoint = computed(() => series.value.find(item => item.day === selectedBucket.value) ?? series.value[series.value.length - 1])
const seriesTotal = computed(() => series.value.reduce((sum, item) => sum + item.voucher + item.paid + item.unknown, 0))
const periodTypes = computed(() => ({
  paid: props.periodDays.filter(item => item.funding === 'paid').length,
  voucher: props.periodDays.filter(item => item.funding === 'voucher').length,
  unknown: props.periodDays.filter(item => item.funding === 'unknown').length,
}))
const labelDate = (value: string) => value.slice(5).split('-').reverse().join('.')
const labelRange = (start: string, end: string) => start === end ? labelDate(start) : `${labelDate(start)} – ${labelDate(end)}`
</script>

<template>
  <div class="leadership-board">
    <MonitoringFocus :alerts="alerts" />
    <div class="leader-metrics">
      <RouterLink v-for="metric in metrics" :key="metric.title" :to="location(metric.path, metric.period ? { from, to } : {})" class="leader-metric" :data-tone="metric.tone">
        <span class="metric-icon"><component :is="metric.icon" :size="20" /></span>
        <ArrowUpRight class="metric-arrow" :size="17" aria-hidden="true" />
        <span class="leader-metric-title">{{ metric.title }}</span>
        <strong><AnimatedNumber :value="metric.value" :suffix="metric.suffix" :decimals="metric.decimals" /></strong>
        <small>{{ metric.hint }}</small>
      </RouterLink>
    </div>

    <slot name="data-flow" />

    <div class="leader-panels">
      <section class="leader-panel trend-panel">
        <header><div><h2>Tashriflar dinamikasi</h2><p v-if="series.length">{{ labelRange(series[0]!.day, series[series.length - 1]!.last) }} · {{ seriesTotal }} ta tashrif<template v-if="trend.step > 1"> · {{ trend.step }} kunlik kesim</template></p></div><RouterLink :to="location('/visits', { from, to })" class="icon-link" aria-label="Tashriflar reyestrini ochish"><ArrowUpRight :size="18" /></RouterLink></header>
        <div class="leader-legend"><span><i></i>Vaucherli</span><span><i class="paid"></i>Pullik</span><span v-if="periodTypes.unknown"><i class="unknown"></i>Turi aniqlanmagan</span></div>
        <p v-if="!seriesTotal" class="leader-empty">Bu davrda tashriflar qayd etilmagan.</p>
        <VisitTrendChart v-else :points="series" :selected="selectedPoint?.day" @select="selectedBucket = $event" />
        <div v-if="selectedPoint && seriesTotal" id="regional-trend-detail" class="trend-detail">
          <div class="trend-detail-date">
            <CalendarDays :size="15" aria-hidden="true" />
            <strong>{{ labelRange(selectedPoint.day, selectedPoint.last) }}</strong>
          </div>
          <span class="trend-funding" data-tone="voucher"><AnimatedNumber :value="selectedPoint.voucher" /> vaucherli</span>
          <span class="trend-funding" data-tone="paid"><AnimatedNumber :value="selectedPoint.paid" /> pullik</span>
          <span v-if="selectedPoint.unknown" class="trend-funding">{{ selectedPoint.unknown }} ta aniqlanmagan</span>
          <RouterLink :to="location('/visits', { from: selectedPoint.day, to: selectedPoint.last })" class="trend-details-link" aria-label="Tanlangan kun tashriflarini ochish">
            Tashriflar <ArrowUpRight :size="14" aria-hidden="true" />
          </RouterLink>
        </div>
        <footer>Tanlangan davrda <strong><AnimatedNumber :value="periodTypes.voucher" /> vaucherli</strong> va <strong><AnimatedNumber :value="periodTypes.paid" /> pullik</strong> tashrif<template v-if="periodTypes.unknown"> · {{ number.format(periodTypes.unknown) }} ta turi aniqlanmagan</template></footer>
      </section>

      <section class="leader-panel capacity-panel">
        <header><div><h2>Bugungi kvota va tashrif</h2><p>Tasdiqlangan pasportlar bo‘yicha</p></div><Landmark :size="19" aria-hidden="true" /></header>
        <div class="quota-gauges">
          <div v-for="item in split" :key="item.key">
            <div class="quota-caption"><span>{{ item.title }}</span><strong><AnimatedNumber v-if="total.passports" :value="item.actual" />{{ total.passports ? ' / ' + item.limit : '—' }}</strong></div>
            <div class="quota-track" :data-funding="item.key"><span :style="{ width: item.limit ? `${Math.min(100, item.actual / item.limit * 100)}%` : '0%' }"></span></div>
          </div>
        </div>
        <p v-if="total.unapproved" class="leader-footnote">{{ total.unapproved }} ta tashrif tasdiqlangan pasporti yo‘q joylarda.</p>
        <RouterLink :to="location('/capacity', { view: 'usage' })" class="leader-link">Kunlik hisobot <ArrowUpRight :size="16" /></RouterLink>
      </section>
    </div>

  </div>
</template>

<style scoped src="./leadership.css"></style>
