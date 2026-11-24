<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Activity, CircleAlert, CircleCheck, Radio } from 'lucide-vue-next'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import MonitoringStatus from './MonitoringStatus.vue'
import type { SystemService } from '../types'

const props = defineProps<{ services: SystemService[] }>()
const dateTime = new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent', hour: '2-digit', minute: '2-digit', second: '2-digit' })
const healthy = computed(() => props.services.filter(service => service.status === 'healthy').length)
const impacted = computed(() => props.services.filter(service => service.status === 'degraded' || service.status === 'failed').length)
const unknown = computed(() => props.services.filter(service => service.status === 'unknown').length)
</script>

<template>
  <dl class="grid grid-cols-3 gap-2 sm:gap-3">
    <div class="rounded-xl border bg-card p-3 sm:p-4">
      <dt class="flex flex-wrap items-center gap-1.5 text-xs font-medium sm:text-sm"><CircleCheck class="size-4 shrink-0 text-emerald-600" aria-hidden="true" /> Ishlayapti</dt><dd class="mt-2 text-2xl font-semibold tabular-nums">{{ healthy }}</dd>
    </div>
    <div class="rounded-xl border bg-card p-3 sm:p-4">
      <dt class="flex flex-wrap items-center gap-1.5 text-xs font-medium sm:text-sm"><CircleAlert class="size-4 shrink-0 text-amber-600" aria-hidden="true" /> Muammoli</dt><dd class="mt-2 text-2xl font-semibold tabular-nums">{{ impacted }}</dd>
    </div>
    <div class="rounded-xl border bg-card p-3 sm:p-4">
      <dt class="flex flex-wrap items-center gap-1.5 text-xs font-medium sm:text-sm"><Radio class="size-4 shrink-0 text-sky-600" aria-hidden="true" /> Ma’lumot yo‘q</dt><dd class="mt-2 text-2xl font-semibold tabular-nums">{{ unknown }}</dd>
    </div>
  </dl>
  <SectionBlock title="Tizim servislari va bog‘liqliklari">
    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="service in services" :key="service.id" class="flex min-w-0 flex-col gap-3 rounded-xl border p-3.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-semibold">{{ service.name }}</h3>
          <MonitoringStatus :status="service.status" />
        </div>
        <p class="text-sm text-muted-foreground">{{ service.detail }}</p>
        <dl class="mt-auto space-y-1 border-t pt-2 text-xs">
          <div class="flex flex-wrap justify-between gap-x-2"><dt class="text-muted-foreground">Tekshiruv</dt><dd>{{ service.check }}</dd></div>
          <div class="flex flex-wrap justify-between gap-x-2"><dt class="text-muted-foreground">Bog‘liqlik</dt><dd>{{ service.dependency }}</dd></div>
          <div class="flex flex-wrap justify-between gap-x-2"><dt class="text-muted-foreground">Oxirgi o‘lchov (UZT)</dt><dd><time v-if="service.checkedAt" :datetime="service.checkedAt">{{ dateTime.format(new Date(service.checkedAt)) }}</time><span v-else>—</span></dd></div>
          <div v-if="service.responseMs !== null" class="flex flex-wrap justify-between gap-x-2"><dt class="text-muted-foreground">Javob vaqti</dt><dd>{{ service.responseMs }} ms</dd></div>
        </dl>
        <RouterLink v-if="service.id === 'oracle'" :to="{ name: 'monitoring-oracle' }" class="w-fit text-xs font-semibold text-primary hover:underline">Oracle tafsilotlari</RouterLink>
      </article>
    </div>
    <RouterLink :to="{ name: 'monitoring-checks' }" class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Activity class="size-4" aria-hidden="true" /> API va integratsiyalar holati</RouterLink>
  </SectionBlock>
</template>
