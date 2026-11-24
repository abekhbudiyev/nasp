<script setup lang="ts">
defineProps<{ label: string; value: number | null; detail?: string; tone?: 'blue' | 'violet' }>()
</script>

<template>
  <div class="space-y-1.5">
    <div class="flex items-baseline justify-between gap-2 text-sm">
      <span class="font-medium">{{ label }}</span>
      <span class="font-semibold tabular-nums">{{ value === null ? '—' : `${value}%` }}</span>
    </div>
    <div
      v-if="value !== null"
      role="meter"
      :aria-label="label"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      class="h-2 overflow-hidden rounded-full bg-muted"
    >
      <div class="h-full rounded-full" :class="value >= 85 ? 'bg-amber-500' : tone === 'blue' ? 'bg-sky-500' : tone === 'violet' ? 'bg-violet-500' : 'bg-primary'" :style="{ width: `${value}%` }" />
    </div>
    <p v-if="detail" class="text-xs text-muted-foreground">{{ detail }}</p>
  </div>
</template>
