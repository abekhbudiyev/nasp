<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringCaseDetails from './MonitoringCaseDetails.vue'
import MonitoringStatus from './MonitoringStatus.vue'
import MonitoringValueHelp from './MonitoringValueHelp.vue'
import { recoveredIncidents } from '../admin-demo-data'
import { incidentCases } from '../incident-cases'
import type { MonitoringSnapshot } from '../types'
import { valueHelp } from '../value-help'

const props = defineProps<{ incidents: MonitoringSnapshot['incidents']; asOf: string }>()
const route = useRoute()
const state = ref<'all' | 'active' | 'recovered'>('all')
const severity = ref<'all' | 'critical' | 'warning'>('all')
const query = ref('')
const dateTime = new Intl.DateTimeFormat('uz-UZ', {
  timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
})

const incidentRows = computed(() => [
  ...props.incidents.map(incident => ({ ...incident, recoveredAt: null })),
  ...recoveredIncidents,
].sort((first, second) => Date.parse(second.startedAt) - Date.parse(first.startedAt))
  .map(incident => ({ ...incident, example: incidentCases[incident.id] })))

const filtered = computed(() => {
  const search = query.value.trim().toLocaleLowerCase('uz-UZ')
  return incidentRows.value.filter(incident => (
    (state.value === 'all' || (state.value === 'active') === !incident.recoveredAt) &&
    (severity.value === 'all' || severity.value === incident.severity) &&
    `${incident.title} ${incident.target} ${incident.detail}`.toLocaleLowerCase('uz-UZ').includes(search)
  ))
})

function duration(start: string, end: string) {
  const minutes = Math.max(0, Math.floor((Date.parse(end) - Date.parse(start)) / 60_000))
  const hours = Math.floor(minutes / 60)
  return hours ? `${hours} soat ${minutes % 60} daqiqa` : `${minutes} daqiqa`
}
</script>

<template>
  <SectionBlock title="Hodisalar jurnali" description="24 soatlik demo namuna. Dalillar va tekshiruv ketma-ketligini ko‘rish uchun hodisa tafsilotlarini oching.">
    <div class="flex flex-wrap items-end gap-3">
      <label class="grid gap-1 text-sm font-medium">
        Holat
        <select v-model="state" class="h-9 rounded-md border bg-background px-2.5 text-sm">
          <option value="all">Barchasi</option><option value="active">Faol</option><option value="recovered">Tiklangan</option>
        </select>
      </label>
      <label class="grid gap-1 text-sm font-medium">
        Jiddiylik
        <select v-model="severity" class="h-9 rounded-md border bg-background px-2.5 text-sm">
          <option value="all">Barchasi</option><option value="critical">Kritik</option><option value="warning">Ogohlantirish</option>
        </select>
      </label>
      <label class="grid min-w-0 flex-1 basis-56 gap-1 text-sm font-medium">
        Qidirish
        <input v-model="query" type="search" placeholder="Servis yoki hodisa nomi" class="h-9 min-w-0 rounded-md border bg-background px-2.5 text-sm" />
      </label>
    </div>
    <p class="text-xs text-muted-foreground" aria-live="polite">{{ filtered.length }} ta hodisa</p>
    <ul v-if="filtered.length" class="divide-y rounded-lg border">
      <li v-for="incident in filtered" :key="incident.id" class="grid gap-3 px-4 py-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <div><MonitoringStatus :status="incident.severity" /><MonitoringValueHelp :help="valueHelp.incidentSeverity" /></div>
            <span class="text-xs font-medium text-muted-foreground">{{ incident.recoveredAt ? 'Tiklangan' : 'Faol' }}</span>
          </div>
          <h3 class="text-sm font-semibold">{{ incident.title }}</h3>
          <p class="text-xs text-muted-foreground">{{ incident.target }} · {{ incident.detail }}</p>
        </div>
        <dl class="grid grid-cols-[auto_1fr] content-start gap-x-3 gap-y-1 text-xs tabular-nums">
          <dt class="text-muted-foreground">Boshlangan</dt><dd><time :datetime="incident.startedAt">{{ dateTime.format(new Date(incident.startedAt)) }}</time><MonitoringValueHelp :help="valueHelp.incidentStarted" /></dd>
          <dt class="text-muted-foreground">Tiklangan</dt><dd><time v-if="incident.recoveredAt" :datetime="incident.recoveredAt">{{ dateTime.format(new Date(incident.recoveredAt)) }}</time><span v-else>—</span><MonitoringValueHelp :help="valueHelp.incidentRecovery" /></dd>
          <dt class="text-muted-foreground">Davomiyligi</dt><dd>{{ duration(incident.startedAt, incident.recoveredAt ?? asOf) }}<MonitoringValueHelp :help="valueHelp.incidentDuration" /></dd>
        </dl>
        <MonitoringCaseDetails v-if="incident.example" :incident-case="incident.example" :expanded="route.query.hodisa === incident.id" class="lg:col-span-2" />
      </li>
    </ul>
    <p v-else class="rounded-lg border p-4 text-sm text-muted-foreground">Tanlangan filtrlarga mos hodisa yo‘q.</p>
  </SectionBlock>
</template>
