<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDownLeft, ArrowUpRight, Network } from 'lucide-vue-next'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringAdminTable from './MonitoringAdminTable.vue'
import MonitoringResponseChart from './MonitoringResponseChart.vue'
import MonitoringStatus from './MonitoringStatus.vue'
import { transportCheckTables } from '../admin-demo-data'
import { moduleNames, monitoredModules } from '../module-coverage'
import type { ApiCheck, ApiDataFlow, ApiDirection, CheckStatus } from '../types'

const props = defineProps<{ checks: ApiCheck[]; asOf: string }>()
const route = useRoute()
const router = useRouter()
const search = ref('')
const statusFilter = ref<CheckStatus | ''>('')
const dataFlowFilter = ref<ApiDataFlow | ''>('')
const directions = {
  internal: { title: 'Ichki API', detail: 'NASP ichidagi chaqiruvlar', icon: Network, tone: 'text-emerald-700 dark:text-emerald-300' },
  inbound: { title: 'Kiruvchi API', detail: 'Tashqi tizim → NASP', icon: ArrowDownLeft, tone: 'text-blue-700 dark:text-blue-300' },
  outbound: { title: 'Chiquvchi API', detail: 'NASP → tashqi tizim', icon: ArrowUpRight, tone: 'text-violet-700 dark:text-violet-300' },
} as const
const observationNames = { synthetic: 'Sintetik tekshiruv', traffic: 'Trafik / log metrikasi', sync: 'Sinxronlash jurnali' }
const dataFlowNames: Record<ApiDataFlow, string> = { pull: 'Tashqaridan olish', receive: 'Kiruvchi ma’lumotni qabul qilish', send: 'Tashqariga yuborish' }
const moduleFilter = computed(() => {
  const id = route.query.modul
  return typeof id === 'string' && moduleNames.has(id) ? id : ''
})
const directionFilter = computed(() => {
  const direction = route.query.yonalish
  return direction === 'internal' || direction === 'inbound' || direction === 'outbound' ? direction : ''
})
const moduleChecks = computed(() => props.checks.filter(check => !moduleFilter.value || check.moduleId === moduleFilter.value))
const visibleChecks = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('uz-UZ')
  return moduleChecks.value.filter(check => (
    (!directionFilter.value || check.direction === directionFilter.value) &&
    (!statusFilter.value || check.status === statusFilter.value) &&
    (!dataFlowFilter.value || check.dataFlow === dataFlowFilter.value) &&
    `${check.name} ${check.peer} ${check.operation ?? ''} ${moduleNames.get(check.moduleId) ?? ''}`.toLocaleLowerCase('uz-UZ').includes(term)
  ))
})
const directionCounts = computed(() => ({
  internal: moduleChecks.value.filter(check => check.direction === 'internal').length,
  inbound: moduleChecks.value.filter(check => check.direction === 'inbound').length,
  outbound: moduleChecks.value.filter(check => check.direction === 'outbound').length,
}))
const dateTime = new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
const number = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })

function updateFilters(moduleId: string, direction: ApiDirection | '') {
  void router.replace({ name: 'monitoring-checks', query: {
    modul: moduleId || undefined,
    yonalish: direction || undefined,
  } })
}

function dataAge(at: string | null) {
  return at ? Math.max(0, Math.floor((Date.parse(props.asOf) - Date.parse(at)) / 60_000)) : null
}
</script>

<template>
  <SectionBlock title="API va integratsiyalar reyestri" class="min-w-0">
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <button type="button" class="rounded-lg border p-2.5 text-left hover:bg-muted aria-pressed:border-primary aria-pressed:bg-primary/10" :aria-pressed="!directionFilter" @click="updateFilters(moduleFilter, '')">
        <span class="block text-xs font-semibold">Barchasi</span><strong class="mt-1 block text-xl tabular-nums">{{ moduleChecks.length }}</strong>
      </button>
      <button v-for="(item, id) in directions" :key="id" type="button" class="rounded-lg border p-2.5 text-left hover:bg-muted aria-pressed:border-primary aria-pressed:bg-primary/10" :aria-pressed="directionFilter === id" @click="updateFilters(moduleFilter, id)">
        <span class="flex items-center gap-1.5 text-xs font-semibold" :class="item.tone"><component :is="item.icon" class="size-3.5 shrink-0" aria-hidden="true" />{{ item.title }}</span>
        <strong class="mt-1 block text-xl tabular-nums">{{ directionCounts[id] }}</strong>
        <span class="block text-[11px] text-muted-foreground">{{ item.detail }}</span>
      </button>
    </div>
    <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <label class="grid min-w-0 gap-1 text-sm font-medium">
        Modul
        <select :value="moduleFilter" class="h-9 min-w-0 rounded-md border bg-background px-2 text-sm" @change="updateFilters(($event.target as HTMLSelectElement).value, directionFilter)">
          <option value="">Barcha modullar</option><option v-for="module in monitoredModules" :key="module.id" :value="module.id">{{ module.title }}</option>
        </select>
      </label>
      <label class="grid min-w-0 gap-1 text-sm font-medium">
        Holat
        <select v-model="statusFilter" class="h-9 min-w-0 rounded-md border bg-background px-2 text-sm">
          <option value="">Barcha holatlar</option><option value="healthy">Ishlayapti</option><option value="degraded">Qisman nosoz</option><option value="failed">Nosoz</option><option value="unknown">Ma’lumot yo‘q</option>
        </select>
      </label>
      <label class="grid min-w-0 gap-1 text-sm font-medium">
        Ma’lumot oqimi
        <select v-model="dataFlowFilter" class="h-9 min-w-0 rounded-md border bg-background px-2 text-sm">
          <option value="">Barcha oqimlar</option><option v-for="(label, id) in dataFlowNames" :key="id" :value="id">{{ label }}</option>
        </select>
      </label>
      <label class="grid min-w-0 gap-1 text-sm font-medium">
        Qidirish
        <input v-model="search" type="search" placeholder="API, modul yoki hamkor" class="h-9 min-w-0 rounded-md border bg-background px-2 text-sm" />
      </label>
    </div>
    <p class="text-xs text-muted-foreground" aria-live="polite">{{ visibleChecks.length }} ta kuzatuv ko‘rsatilmoqda.</p>
    <div v-if="visibleChecks.length" class="overflow-x-auto rounded-lg border" role="region" aria-label="API va biznes tekshiruvlari jadvali" tabindex="0">
      <table class="w-full text-left text-sm [&_th]:bg-muted/50 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:px-3 [&_th]:py-2.5 [&_td]:px-3 [&_td]:py-3 [&_td]:align-top [&_tbody_tr+tr]:border-t">
        <thead><tr><th scope="col">API yoki operatsiya</th><th scope="col">Yo‘nalish va hamkor</th><th scope="col">Holat</th><th scope="col">HTTP / javob vaqti</th><th scope="col">Oxirgi kuzatuv (UZT)</th><th scope="col">Xato va ma’lumot yangiligi</th></tr></thead>
        <tbody>
          <tr v-for="check in visibleChecks" :key="check.id">
            <td class="min-w-48">
              <span class="font-medium">{{ check.name }}</span>
              <span class="mt-1 block text-xs text-muted-foreground">{{ moduleNames.get(check.moduleId) }}</span>
              <code v-if="check.operation" class="mt-1 block break-all text-xs text-muted-foreground">{{ check.operation }}</code>
            </td>
            <td class="min-w-36">
              <span class="text-xs font-semibold" :class="directions[check.direction].tone">{{ directions[check.direction].title }}</span>
              <span class="mt-1 block text-xs">{{ check.peer }}</span>
              <span v-if="check.dataFlow" class="mt-1 block text-xs font-medium">{{ dataFlowNames[check.dataFlow] }}</span>
              <span class="mt-1 block text-xs text-muted-foreground">{{ check.kind === 'business' ? 'Biznes tekshiruvi · faqat o‘qish' : observationNames[check.observation] }}</span>
            </td>
            <td><MonitoringStatus :status="check.status" /></td>
            <td class="whitespace-nowrap tabular-nums"><span>{{ check.httpStatus ?? '—' }}</span><span class="mt-1 block text-xs text-muted-foreground">{{ check.responseMs === null ? '—' : `${number.format(check.responseMs)} ms` }}</span></td>
            <td class="whitespace-nowrap text-xs tabular-nums"><time v-if="check.checkedAt" :datetime="check.checkedAt">{{ dateTime.format(new Date(check.checkedAt)) }}</time><span v-else>—</span></td>
            <td class="min-w-48 text-xs text-muted-foreground">
              <span>{{ check.reason ?? '—' }}</span>
              <p v-if="check.freshness" class="mt-2 tabular-nums">
                <span class="block font-medium text-foreground">Oxirgi muvaffaqiyatli sinxronlash</span>
                <time v-if="check.freshness.lastSuccessAt" :datetime="check.freshness.lastSuccessAt">{{ dateTime.format(new Date(check.freshness.lastSuccessAt)) }}</time><span v-else>Ma’lumot yo‘q</span>
                <span class="block"><template v-if="check.freshness.lastSuccessAt">{{ dataAge(check.freshness.lastSuccessAt) }} daqiqa o‘tgan · </template>Chegara {{ check.freshness.maxAgeMinutes }} daqiqa</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else-if="moduleFilter && !moduleChecks.length" class="rounded-lg border px-4 py-3 text-sm text-muted-foreground">{{ moduleNames.get(moduleFilter) }} uchun kuzatuv sozlanmagan.</p>
    <p v-else class="rounded-lg border px-4 py-3 text-sm text-muted-foreground">Tanlangan filtrlarga mos API kuzatuvi topilmadi.</p>
  </SectionBlock>

  <MonitoringResponseChart v-if="visibleChecks.length" :checks="visibleChecks" />
  <template v-if="moduleFilter === 'transport-benefits' && (!directionFilter || directionFilter === 'inbound') && !statusFilter && !dataFlowFilter && !search.trim()">
    <MonitoringAdminTable v-for="table in transportCheckTables" :key="table.title" :table="table" />
  </template>
</template>
