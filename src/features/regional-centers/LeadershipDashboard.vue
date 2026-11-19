<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { ArrowDownRight, ArrowUpRight, CircleCheck, Landmark, TriangleAlert } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { quotaRows } from './attendance'
import type { DailyVisit } from './attendance'
import { relativeDate, serviceName } from './model'
import type { CenterState, Placement } from './model'

const props = defineProps<{
  state: CenterState
  placements: Placement[]
  visibleDays: DailyVisit[]
  periodDays: DailyVisit[]
  today: string
  from: string
  to: string
  metrics: { title: string; value: string; hint: string; icon: Component; path: string; tone: string; period?: boolean }[]
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
const alerts = computed(() => rows.value.flatMap(row => row.alerts.map(title => ({
  placement: row.placement, title, center: row.center,
}))))
const series = computed(() => {
  const end = props.to && props.to < props.today ? props.to : props.today
  const count = new Map<string, Record<DailyVisit['funding'], number>>()
  for (const row of props.periodDays) {
    const current = count.get(row.date) ?? { voucher: 0, paid: 0, unknown: 0 }
    current[row.funding]++
    count.set(row.date, current)
  }
  return Array.from({ length: 14 }, (_, index) => relativeDate(end, index - 13))
    .filter(day => !props.from || day >= props.from)
    .map(day => ({ day, ...(count.get(day) ?? { voucher: 0, paid: 0, unknown: 0 }) }))
})
const peak = computed(() => Math.max(1, ...series.value.map(item => item.voucher + item.paid + item.unknown)))
const seriesTotal = computed(() => series.value.reduce((sum, item) => sum + item.voucher + item.paid + item.unknown, 0))
const periodTypes = computed(() => ({
  paid: props.periodDays.filter(item => item.funding === 'paid').length,
  voucher: props.periodDays.filter(item => item.funding === 'voucher').length,
  unknown: props.periodDays.filter(item => item.funding === 'unknown').length,
}))
const labelDate = (value: string) => value.slice(5).split('-').reverse().join('.')
</script>

<template>
  <div class="leadership-board">
    <div class="leader-metrics">
      <RouterLink v-for="(metric, index) in metrics" :key="metric.title" :to="location(metric.path, metric.period ? { from, to } : {})" class="leader-metric" :data-tone="metric.tone" :style="{ '--index': index }">
        <span class="metric-icon"><component :is="metric.icon" :size="20" /></span>
        <ArrowUpRight class="metric-arrow" :size="17" aria-hidden="true" />
        <span class="leader-metric-title">{{ metric.title }}</span>
        <strong>{{ metric.value }}</strong>
        <small>{{ metric.hint }}</small>
      </RouterLink>
    </div>

    <div class="leader-panels">
      <section class="leader-panel trend-panel">
        <header><div><h2>Kunlik tashriflar dinamikasi</h2><p v-if="series.length">{{ labelDate(series[0]!.day) }} – {{ labelDate(series[series.length - 1]!.day) }} · {{ seriesTotal }} ta tashrif</p></div><RouterLink :to="location('/visits', { from, to })" class="icon-link" aria-label="Tashriflar reyestrini ochish"><ArrowUpRight :size="18" /></RouterLink></header>
        <div class="leader-legend"><span><i></i>Vaucherli</span><span><i class="paid"></i>Pullik</span><span v-if="periodTypes.unknown"><i class="unknown"></i>Turi aniqlanmagan</span></div>
        <p v-if="!seriesTotal" class="leader-empty">Bu davrda tashriflar qayd etilmagan.</p>
        <div v-else class="visit-chart" role="list" aria-label="Kunlar bo‘yicha vaucherli va pullik tashriflar">
          <div v-for="(item, index) in series" :key="item.day" class="chart-column" role="listitem"
            :aria-label="`${labelDate(item.day)}: ${item.voucher} vaucherli, ${item.paid} pullik, ${item.unknown} aniqlanmagan`"
            :title="`${labelDate(item.day)} · ${item.voucher} vaucherli / ${item.paid} pullik${item.unknown ? ' / ' + item.unknown + ' aniqlanmagan' : ''}`">
            <div class="bar-area">
              <div class="bar-stack" :style="{ height: `${(item.voucher + item.paid + item.unknown) / peak * 100}%`, '--index': index }">
                <span v-if="item.unknown" class="unknown" :style="{ flex: item.unknown }"></span>
                <span v-if="item.paid" class="paid" :style="{ flex: item.paid }"></span>
                <span v-if="item.voucher" class="voucher" :style="{ flex: item.voucher }"></span>
              </div>
            </div>
            <small>{{ labelDate(item.day) }}</small>
          </div>
        </div>
        <footer>Tanlangan davrda <strong>{{ number.format(periodTypes.voucher) }} vaucherli</strong> va <strong>{{ number.format(periodTypes.paid) }} pullik</strong> tashrif<template v-if="periodTypes.unknown"> · {{ periodTypes.unknown }} ta turi aniqlanmagan</template></footer>
      </section>

      <section class="leader-panel capacity-panel">
        <header><div><h2>Bugungi kvota va tashrif</h2><p>Tasdiqlangan pasportlar bo‘yicha</p></div><Landmark :size="19" aria-hidden="true" /></header>
        <div class="quota-gauges">
          <div v-for="item in split" :key="item.key">
            <div class="quota-caption"><span>{{ item.title }}</span><strong>{{ total.passports ? `${item.actual} / ${item.limit}` : '—' }}</strong></div>
            <div class="quota-track" :data-funding="item.key"><span :style="{ width: item.limit ? `${Math.min(100, item.actual / item.limit * 100)}%` : '0%' }"></span></div>
          </div>
        </div>
        <p v-if="total.unapproved" class="leader-footnote">{{ total.unapproved }} ta tashrif tasdiqlangan pasporti yo‘q joylarda.</p>
        <RouterLink :to="location('/capacity')" class="leader-link">Kunlik hisobot <ArrowUpRight :size="16" /></RouterLink>
      </section>
    </div>

    <section class="leader-panel signal-panel">
      <header>
        <div><h2>Bugun e’tibor talab qiladi</h2><p>Kunlik kvota va tashriflar asosida</p></div>
        <span class="signal-count"><TriangleAlert :size="16" /> {{ alerts.length }} ta signal</span>
      </header>
      <p v-if="!alerts.length" class="signal-empty"><CircleCheck :size="18" /> Tanlangan markazlarda bugungi signal yo‘q.</p>
      <RouterLink v-for="alert in alerts" :key="alert.placement.id + alert.title"
        :to="location('/capacity', { center: alert.center?.id ?? '', service: alert.placement.serviceId })" class="signal-row">
        <span class="signal-icon"><TriangleAlert :size="17" /></span>
        <span><strong>{{ alert.title }}</strong><small>{{ alert.center?.address }} · {{ serviceName(alert.placement.serviceId) }}</small></span>
        <ArrowDownRight :size="17" />
      </RouterLink>
    </section>
  </div>
</template>

<style scoped src="./leadership.css"></style>
