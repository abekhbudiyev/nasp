<script setup lang="ts">
import type { CheckStatus } from '../types'

defineProps<{ status: CheckStatus | 'critical' | 'warning' }>()

const labels = {
  healthy: { text: 'Ishlayapti', tone: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  degraded: { text: 'Qisman nosoz', tone: 'bg-amber-500/10 text-amber-800 dark:text-amber-300' },
  failed: { text: 'Nosoz', tone: 'bg-destructive/10 text-destructive' },
  unknown: { text: 'Ma’lumot yo‘q', tone: 'bg-sky-500/10 text-sky-800 dark:text-sky-300' },
  critical: { text: 'Kritik', tone: 'bg-destructive/10 text-destructive' },
  warning: { text: 'Ogohlantirish', tone: 'bg-amber-500/10 text-amber-800 dark:text-amber-300' },
}
</script>

<template>
  <span class="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold" :class="labels[status].tone">
    <span class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    {{ labels[status].text }}
  </span>
</template>
