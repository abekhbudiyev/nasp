<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Activity, ArrowUpRight, Database, FlaskConical, HeartPulse, Server, TriangleAlert } from 'lucide-vue-next'
import PageContainer from '@/shared/components/PageContainer.vue'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringAdminTable from '../components/MonitoringAdminTable.vue'
import MonitoringApiHealth from '../components/MonitoringApiHealth.vue'
import MonitoringHostTrend from '../components/MonitoringHostTrend.vue'
import MonitoringIncidentList from '../components/MonitoringIncidentList.vue'
import MonitoringModuleCoverage from '../components/MonitoringModuleCoverage.vue'
import MonitoringStatus from '../components/MonitoringStatus.vue'
import MonitoringSystemHealth from '../components/MonitoringSystemHealth.vue'
import MonitoringUsage from '../components/MonitoringUsage.vue'
import { backendCheckTable, oracleTables, serverTables, sourceTables } from '../admin-demo-data'
import { demoSnapshot, demoTopSql } from '../demo-data'
import type { MonitoringView } from '../config'
import { demoServices } from '../system-demo-data'
import type { SqlPeriod, UsageMetric } from '../types'

defineProps<{ view: MonitoringView; title: string }>()

const { collectedAt, servers, checks, oracle, incidents } = demoSnapshot
const period = ref<SqlPeriod>('1h')
const sql = computed(() => demoTopSql[period.value])
const longestSql = computed(() => Math.max(1, ...sql.value.rows.map(row => row.elapsedSeconds)))
const healthyChecks = checks.filter(check => check.status === 'healthy').length
const healthyServices = demoServices.filter(service => service.status === 'healthy').length
const criticalCount = incidents.filter(incident => incident.severity === 'critical').length
const dateTime = new Intl.DateTimeFormat('uz-UZ', {
  timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
})
const number = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })
const tableClass = 'w-full text-left text-sm [&_th]:bg-muted/50 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:whitespace-nowrap [&_th]:px-3 [&_th]:py-2.5 [&_td]:px-3 [&_td]:py-3 [&_td]:align-top [&_tbody_tr+tr]:border-t'

function formatUsage(metric: UsageMetric | null) {
  return metric ? `${number.format(metric.used)} / ${number.format(metric.capacity)} GiB` : undefined
}
</script>

<template>
  <PageContainer :key="view" class="xl:overflow-y-auto!">
    <header class="monitoring-header relative isolate shrink-0 overflow-hidden rounded-2xl border border-emerald-700/40 px-4 py-5 text-white shadow-sm sm:px-6 sm:py-6">
      <div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div class="min-w-0">
          <div v-if="view === 'overview'" class="mb-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-100">
            <Activity class="size-4 text-emerald-300" aria-hidden="true" /> NASP Monitoring
          </div>
          <h1 class="text-2xl font-semibold tracking-tight sm:text-4xl">{{ title }}</h1>
          <p v-if="view === 'overview'" class="mt-2 text-sm text-emerald-50/85">NASP modullari, serverlar va Oracle holati</p>
        </div>
        <div class="rounded-xl border border-white/20 bg-slate-950/30 px-3.5 py-2.5 text-sm text-emerald-50">
          <span class="inline-flex items-center gap-1.5 font-semibold text-amber-200"><FlaskConical class="size-4" aria-hidden="true" /> Demo rejimi</span>
          <div class="mt-1 text-xs text-emerald-50/85">Namuna <time :datetime="collectedAt">{{ dateTime.format(new Date(collectedAt)) }}</time> (UZT)</div>
        </div>
      </div>
    </header>

    <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-sky-200/75 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 dark:border-sky-900/80 dark:bg-sky-950/40 dark:text-sky-100">
      <p>NASP backend va Zabbix ulanishi kutilmoqda.</p>
      <RouterLink v-if="view !== 'sources'" :to="{ name: 'monitoring-sources' }" class="inline-flex items-center gap-1 font-semibold hover:underline">Ma’lumot manbalari <ArrowUpRight class="size-3.5" aria-hidden="true" /></RouterLink>
    </div>

    <dl v-if="view === 'overview'" class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      <div class="monitoring-kpi border-t-teal-500">
        <dt><RouterLink :to="{ name: 'monitoring-system' }" class="monitoring-kpi-link"><HeartPulse class="monitoring-kpi-icon bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" aria-hidden="true" /> Tizim servislari</RouterLink></dt>
        <dd class="monitoring-kpi-number">{{ healthyServices }} <span class="text-base font-medium text-muted-foreground">/ {{ demoServices.length }}</span></dd>
      </div>
      <div class="monitoring-kpi border-t-sky-500">
        <dt><RouterLink :to="{ name: 'monitoring-servers' }" class="monitoring-kpi-link"><Server class="monitoring-kpi-icon bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300" aria-hidden="true" /> Serverlar</RouterLink></dt>
        <dd class="monitoring-kpi-number">{{ servers.length }}</dd>
      </div>
      <div class="monitoring-kpi border-t-emerald-500">
        <dt><RouterLink :to="{ name: 'monitoring-checks' }" class="monitoring-kpi-link"><Activity class="monitoring-kpi-icon bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" aria-hidden="true" /> Muvaffaqiyatli tekshiruvlar</RouterLink></dt>
        <dd class="monitoring-kpi-number">{{ healthyChecks }} <span class="text-base font-medium text-muted-foreground">/ {{ checks.length }}</span></dd>
      </div>
      <div class="monitoring-kpi border-t-violet-500">
        <dt><RouterLink :to="{ name: 'monitoring-oracle' }" class="monitoring-kpi-link"><Database class="monitoring-kpi-icon bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300" aria-hidden="true" /> Bloklangan sessiyalar</RouterLink></dt>
        <dd class="monitoring-kpi-number">{{ oracle?.blockedSessions ?? '—' }}</dd>
      </div>
      <div class="monitoring-kpi border-t-rose-500">
        <dt><RouterLink :to="{ name: 'monitoring-incidents' }" class="monitoring-kpi-link"><TriangleAlert class="monitoring-kpi-icon bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" aria-hidden="true" /> Faol hodisalar</RouterLink></dt>
        <dd class="monitoring-kpi-number flex flex-wrap items-baseline gap-x-2">
          {{ incidents.length }} <span v-if="criticalCount" class="text-xs font-semibold text-destructive">{{ criticalCount }} ta kritik</span>
        </dd>
      </div>
    </dl>

    <div v-if="view === 'overview' || view === 'servers'" class="grid items-start gap-4" :class="{ 'xl:grid-cols-2': view === 'overview' }">
      <SectionBlock title="Server resurslari" class="min-w-0">
        <div v-for="server in servers" :key="server.id" class="space-y-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-semibold">{{ server.name }}</h3>
            <MonitoringStatus :status="server.status" />
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <MonitoringUsage label="CPU" :value="server.cpuPercent" />
            <MonitoringUsage label="RAM" tone="blue" :value="server.ram?.usedPercent ?? null" :detail="formatUsage(server.ram)" />
            <MonitoringUsage :label="`Disk (${server.filesystem})`" tone="violet" :value="server.disk?.usedPercent ?? null" :detail="formatUsage(server.disk)" />
          </div>
          <dl class="grid gap-3 border-t pt-3 text-sm sm:grid-cols-2">
            <div>
              <dt class="font-medium">Disk I/O</dt>
              <dd class="mt-1 text-xs tabular-nums text-muted-foreground">
                {{ server.diskIo ? `O‘qish ${number.format(server.diskIo.readMiBps)} · Yozish ${number.format(server.diskIo.writeMiBps)} MiB/s` : '—' }}
              </dd>
            </div>
            <div>
              <dt class="font-medium">Tarmoq</dt>
              <dd class="mt-1 text-xs tabular-nums text-muted-foreground">
                {{ server.network ? `Kirish ${number.format(server.network.receiveMbps)} · Chiqish ${number.format(server.network.sendMbps)} Mbit/s` : '—' }}
              </dd>
            </div>
          </dl>
        </div>
      </SectionBlock>

      <SectionBlock v-if="view === 'overview'" title="Faol nosozliklar va ogohlantirishlar" class="min-w-0">
        <ul v-if="incidents.length" class="divide-y">
          <li v-for="incident in incidents" :key="incident.id" class="space-y-1 py-3 first:pt-0 last:pb-0">
            <div class="flex flex-wrap items-baseline justify-between gap-1.5">
              <MonitoringStatus :status="incident.severity" />
              <time class="text-xs tabular-nums text-muted-foreground" :datetime="incident.startedAt">{{ dateTime.format(new Date(incident.startedAt)) }}</time>
            </div>
            <h3 class="text-sm font-semibold">
              <RouterLink :to="{ name: 'monitoring-incidents', query: { hodisa: incident.id } }" class="text-primary hover:underline">{{ incident.title }}</RouterLink>
            </h3>
            <p class="text-xs text-muted-foreground">{{ incident.target }} · {{ incident.detail }}</p>
          </li>
        </ul>
        <p v-else class="text-sm text-muted-foreground">Faol hodisalar yo‘q.</p>
      </SectionBlock>
    </div>

    <MonitoringModuleCoverage v-if="view === 'overview'" :checks="checks" :incidents="incidents" />

    <template v-if="view === 'system'">
      <MonitoringSystemHealth :services="demoServices" />
      <MonitoringAdminTable :table="backendCheckTable" />
    </template>

    <template v-if="view === 'servers'">
      <MonitoringHostTrend />
      <MonitoringAdminTable v-for="table in serverTables" :key="table.title" :table="table" />
    </template>

    <MonitoringApiHealth v-if="view === 'checks'" :checks="checks" :as-of="collectedAt" />

    <div v-if="view === 'oracle'" class="grid items-start gap-4 2xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <SectionBlock title="Instansiya holati" class="min-w-0">
        <div v-if="oracle" class="space-y-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-semibold">{{ oracle.name }}</h3>
            <MonitoringStatus :status="oracle.status" />
          </div>
          <dl class="grid grid-cols-2 gap-3">
            <div class="rounded-lg bg-muted/50 p-3"><dt class="text-xs text-muted-foreground">Faol sessiyalar</dt><dd class="mt-1 text-xl font-semibold tabular-nums">{{ oracle.activeSessions ?? '—' }}</dd></div>
            <div class="rounded-lg bg-muted/50 p-3"><dt class="text-xs text-muted-foreground">Bloklangan sessiyalar</dt><dd class="mt-1 text-xl font-semibold tabular-nums">{{ oracle.blockedSessions ?? '—' }}</dd></div>
          </dl>
          <div class="space-y-3">
            <h3 class="text-sm font-semibold">Tablespace bandligi</h3>
            <MonitoringUsage v-for="item in oracle.tablespaces" :key="item.name" :label="item.name" :value="item.space?.usedPercent ?? null" :detail="formatUsage(item.space)" />
          </div>
        </div>
        <p v-else class="text-sm text-muted-foreground">Oracle ko‘rsatkichlari mavjud emas.</p>
      </SectionBlock>

      <SectionBlock title="Eng og‘ir SQL so‘rovlari" class="min-w-0">
        <div class="flex flex-wrap items-end justify-between gap-2">
          <label class="flex items-center gap-2 text-sm font-medium">
            Davr
            <select v-model="period" class="h-9 rounded-md border bg-background px-2.5 text-sm focus-visible:outline-2 focus-visible:outline-ring">
              <option value="1h">1 soat</option>
              <option value="24h">24 soat</option>
              <option value="7d">7 kun</option>
            </select>
          </label>
          <p class="text-xs tabular-nums text-muted-foreground" aria-live="polite">
            <time :datetime="sql.from">{{ dateTime.format(new Date(sql.from)) }}</time> –
            <time :datetime="sql.to">{{ dateTime.format(new Date(sql.to)) }}</time> (UZT)
          </p>
        </div>
        <div class="overflow-x-auto rounded-lg border" role="region" aria-label="Eng og‘ir SQL so‘rovlari jadvali" tabindex="0">
          <table :class="tableClass">
            <thead>
              <tr>
                <th scope="col">SQL ID</th>
                <th scope="col" class="text-right">Ijrolar</th>
                <th scope="col" class="text-right" aria-sort="descending">Jami vaqt (s) ↓</th>
                <th scope="col" class="text-right">CPU vaqti (s)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in sql.rows" :key="row.sqlId">
                <td><span class="font-mono text-xs font-medium">{{ row.sqlId }}</span><span v-if="row.label" class="mt-1 block min-w-36 text-xs text-muted-foreground">{{ row.label }}</span></td>
                <td class="text-right tabular-nums">{{ number.format(row.executions) }}</td>
                <td class="min-w-24 text-right font-medium tabular-nums">
                  {{ number.format(row.elapsedSeconds) }}
                  <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-violet-500/10" aria-hidden="true">
                    <div class="h-full rounded-full bg-violet-500" :style="{ width: `${row.elapsedSeconds / longestSql * 100}%` }" />
                  </div>
                </td>
                <td class="text-right tabular-nums">{{ number.format(row.cpuSeconds) }}</td>
              </tr>
              <tr v-if="!sql.rows.length"><td colspan="4" class="text-muted-foreground">Ushbu davr uchun ma’lumot yo‘q.</td></tr>
            </tbody>
          </table>
        </div>
      </SectionBlock>
    </div>

    <template v-if="view === 'oracle'">
      <MonitoringAdminTable v-for="table in oracleTables" :key="table.title" :table="table" />
    </template>

    <MonitoringIncidentList v-if="view === 'incidents'" :incidents="incidents" :as-of="collectedAt" />

    <template v-if="view === 'sources'">
      <MonitoringAdminTable v-for="table in sourceTables" :key="table.title" :table="table" />
    </template>
  </PageContainer>
</template>

<style scoped>
@reference '../../../styles/globals.css';

.monitoring-header {
  background: radial-gradient(ellipse at 80% 0%, #176a64 0%, transparent 55%), linear-gradient(120deg, #102422, #123734 62%, #10302e);
}

.monitoring-header::after {
  position: absolute;
  inset: 0 0 0 42%;
  content: '';
  background-image: linear-gradient(rgb(167 243 208 / 9%) 1px, transparent 1px), linear-gradient(90deg, rgb(167 243 208 / 9%) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(90deg, transparent, black);
  pointer-events: none;
}

.monitoring-kpi {
  @apply min-w-0 rounded-xl border border-t-[3px] bg-card p-3 shadow-sm sm:p-4;
}

.monitoring-kpi-link {
  @apply flex items-center gap-2 text-left text-sm font-medium hover:underline;
}

.monitoring-kpi-icon {
  @apply size-7 shrink-0 rounded-md p-1.5;
}

.monitoring-kpi-number {
  @apply mt-2 text-3xl font-semibold tabular-nums tracking-tight;
}
</style>
