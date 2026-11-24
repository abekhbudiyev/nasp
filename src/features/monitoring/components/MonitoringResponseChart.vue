<script setup lang="ts">
import { computed } from 'vue'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringValueHelp from './MonitoringValueHelp.vue'
import { moduleNames } from '../module-coverage'
import type { CheckStatus, MonitoringSnapshot } from '../types'
import { apiValueHelp } from '../value-help'

const props = defineProps<Pick<MonitoringSnapshot, 'checks'>>()
const measured = computed(() => props.checks.flatMap(check => (
  check.responseMs === null ? [] : [{ ...check, responseMs: check.responseMs }]
)).sort((first, second) => second.responseMs - first.responseMs))
const scaleMax = computed(() => Math.max(250, Math.ceil((measured.value[0]?.responseMs ?? 0) / 250) * 250))
const tones: Record<CheckStatus, string> = {
  healthy: 'bg-emerald-600 dark:bg-emerald-500',
  degraded: 'bg-amber-600 dark:bg-amber-500',
  failed: 'bg-rose-600 dark:bg-rose-500',
  unknown: 'bg-sky-600 dark:bg-sky-500',
}
const format = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })
</script>

<template>
  <SectionBlock title="API javob vaqtlari" description="Oxirgi o‘lchangan javoblar, millisoniyalarda. Joriy modul filtri grafikda ham qo‘llanadi.">
    <div v-if="measured.length" class="rounded-xl border bg-muted/25 p-3 sm:p-4">
      <ol class="space-y-3" aria-label="API va biznes tekshiruvlarining javob vaqtlari">
        <li v-for="check in measured" :key="check.id" class="grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-5">
          <div>
            <h3 class="text-sm font-medium">{{ check.name }}</h3>
            <p class="text-xs text-muted-foreground">{{ moduleNames.get(check.moduleId) }}</p>
          </div>
          <div class="grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-2">
            <div class="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
              <div class="h-full rounded-full" :class="tones[check.status]" :style="{ width: `${check.responseMs / scaleMax * 100}%` }" />
            </div>
            <span class="whitespace-nowrap text-right text-sm font-semibold tabular-nums">{{ format.format(check.responseMs) }} ms<MonitoringValueHelp :help="apiValueHelp(check, 'response')" /></span>
          </div>
        </li>
      </ol>
      <div class="mt-2 grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-5" aria-hidden="true">
        <div class="hidden sm:block" />
        <div class="mr-[7.5rem] flex justify-between border-t pt-1.5 text-xs tabular-nums text-muted-foreground">
          <span>0</span><span>{{ format.format(scaleMax / 2) }}</span><span>{{ format.format(scaleMax) }} ms</span>
        </div>
      </div>
    </div>
    <p v-else class="rounded-lg border p-3 text-sm text-muted-foreground">Javob vaqti bo‘yicha o‘lchov mavjud emas.</p>
    <p v-if="checks.length > measured.length" class="text-xs text-muted-foreground">{{ checks.length - measured.length }} ta tekshiruvda javob vaqti o‘lchanmagan. Sababi tekshiruvlar jadvalida ko‘rsatilgan.</p>
  </SectionBlock>
</template>
