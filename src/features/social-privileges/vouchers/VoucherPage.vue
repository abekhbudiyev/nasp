<script setup lang="ts">
import EducationVouchers from './pages/EducationVouchers.vue'
import KindergartenVouchers from './pages/KindergartenVouchers.vue'
import { voucherExchangePath, voucherExchangeTitle } from '../config'
import './pages/benefits-ui.css'

defineProps<{ kind: 'kindergarten' | 'education' }>()
</script>

<template>
  <section class="sb-page sb-ui flex min-w-0 flex-col p-4 sm:p-6 xl:h-full xl:overflow-y-auto">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <span class="rounded border border-border px-2 py-1 text-xs text-muted-foreground">Namunaviy ma’lumotlar</span>
      <RouterLink class="rounded-md border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-accent" :to="{ path: voucherExchangePath, query: { kind } }">{{ voucherExchangeTitle }}</RouterLink>
    </div>
    <KindergartenVouchers v-if="kind === 'kindergarten'" />
    <EducationVouchers v-else />
  </section>
</template>
