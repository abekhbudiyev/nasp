<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringStatus from './MonitoringStatus.vue'
import { buildModuleCoverage } from '../module-coverage'
import type { MonitoringSnapshot } from '../types'

const props = defineProps<Pick<MonitoringSnapshot, 'checks' | 'incidents'>>()
const search = ref('')
const coverage = computed(() => buildModuleCoverage(props.checks, props.incidents))
const configured = computed(() => coverage.value.filter(row => row.checkCount > 0).length)
const states = [
  { id: 'healthy', label: 'Ishlayapti', color: '#059669' },
  { id: 'degraded', label: 'Qisman nosoz', color: '#d97706' },
  { id: 'failed', label: 'Nosoz', color: '#e11d48' },
  { id: 'unknown', label: 'Ma’lumot yo‘q', color: '#0284c7' },
  { id: 'unconfigured', label: 'Kuzatuv sozlanmagan', color: '#94a3b8' },
] as const
const selectedStatus = ref<typeof states[number]['id'] | null>(null)
const segments = computed(() => states.map(state => ({
  ...state,
  count: coverage.value.filter(row => (row.status ?? 'unconfigured') === state.id).length,
})))
const ringStyle = computed(() => {
  const total = coverage.value.length
  if (!total) return undefined
  let offset = 0
  const stops = segments.value.filter(segment => segment.count > 0).map(segment => {
    const start = offset
    offset += segment.count / total * 100
    return `${segment.color} ${start}% ${offset}%`
  })
  return { background: `conic-gradient(${stops.join(', ')})` }
})
const visible = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('uz-UZ')
  return coverage.value.filter(row => (
    (selectedStatus.value === null || selectedStatus.value === (row.status ?? 'unconfigured')) &&
    row.module.title.toLocaleLowerCase('uz-UZ').includes(term)
  ))
})
const dateTime = new Intl.DateTimeFormat('uz-UZ', {
  timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
})
</script>

<template>
  <SectionBlock title="NASP modullari holati" class="min-w-0">
    <div class="grid items-center gap-4 rounded-xl border bg-muted/30 p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:p-5">
      <div class="relative mx-auto grid size-32 place-items-center rounded-full bg-muted sm:size-36" :style="ringStyle" aria-hidden="true">
        <div class="grid size-[74%] place-content-center rounded-full border bg-card text-center">
          <span class="text-3xl font-semibold leading-none tabular-nums tracking-tight">{{ coverage.length }}</span>
          <span class="mt-1 text-xs font-medium text-muted-foreground">Jami modullar</span>
        </div>
      </div>
      <div class="grid gap-2 sm:grid-cols-2" aria-label="Modullarni holat bo‘yicha filtrlash">
        <button
          v-for="segment in segments"
          :key="segment.id"
          type="button"
          class="flex min-w-0 items-center gap-2 rounded-md border bg-card px-2.5 py-2 text-left text-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring aria-pressed:border-primary aria-pressed:bg-primary/10"
          :aria-pressed="selectedStatus === segment.id"
          @click="selectedStatus = selectedStatus === segment.id ? null : segment.id"
        >
          <span class="size-2.5 shrink-0 rounded-full" :style="{ backgroundColor: segment.color }" aria-hidden="true" />
          <span class="min-w-0 flex-1 font-medium">{{ segment.label }}</span>
          <strong class="tabular-nums">{{ segment.count }}</strong>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-sm text-muted-foreground" aria-live="polite">{{ coverage.length }} ta moduldan {{ configured }} tasida demo tekshiruv bor.<span v-if="visible.length !== coverage.length"> {{ visible.length }} tasi ko‘rsatilmoqda.</span></p>
      <label class="flex items-center gap-2 text-sm font-medium">
        Modulni qidirish
        <input v-model="search" type="search" class="h-9 min-w-0 max-w-40 rounded-md border bg-background px-2.5 text-sm" />
      </label>
    </div>
    <div class="overflow-x-auto rounded-lg border" role="region" aria-label="NASP modullari holati jadvali" tabindex="0">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" class="px-3 py-2.5">Modul</th>
            <th scope="col" class="px-3 py-2.5">Holat</th>
            <th scope="col" class="whitespace-nowrap px-3 py-2.5">Oxirgi o‘lchov (UZT)</th>
            <th scope="col" class="px-3 py-2.5 text-right">Tekshiruvlar</th>
            <th scope="col" class="whitespace-nowrap px-3 py-2.5 text-right">Faol hodisalar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in visible" :key="row.module.id" class="border-t transition-colors hover:bg-muted/45">
            <th scope="row" class="min-w-48 px-3 py-2.5 font-medium">
              <RouterLink :to="{ name: 'monitoring-checks', query: { modul: row.module.id } }" class="text-primary hover:underline">{{ row.module.title }}</RouterLink>
            </th>
            <td class="px-3 py-2.5">
              <MonitoringStatus v-if="row.status" :status="row.status" />
              <span v-else class="whitespace-nowrap text-xs text-muted-foreground">Kuzatuv sozlanmagan</span>
            </td>
            <td class="whitespace-nowrap px-3 py-2.5 tabular-nums">{{ row.lastMeasurement === null ? '—' : dateTime.format(row.lastMeasurement) }}</td>
            <td class="px-3 py-2.5 text-right tabular-nums">{{ row.checkCount }}</td>
            <td class="px-3 py-2.5 text-right tabular-nums">{{ row.checkCount ? row.incidentCount : '—' }}</td>
          </tr>
          <tr v-if="!visible.length"><td colspan="5" class="px-3 py-4 text-muted-foreground">Tanlovga mos modul topilmadi.</td></tr>
        </tbody>
      </table>
    </div>
  </SectionBlock>
</template>
