<script setup lang="ts">
import { computed } from 'vue'
import { benefitText } from '@/shared/i18n'
import { money, num } from './data'

const props = defineProps<{ title: string; rows: { key: string; label: string; value: number | null }[]; moneyValues?: boolean; interactive?: boolean; share?: boolean }>()
const emit = defineEmits<{ select: [key: string] }>()
const maximum = computed(() => Math.max(1,...props.rows.map(row=>row.value ?? 0)))
const total = computed(() => props.rows.reduce((sum,row)=>sum+(row.value ?? 0),0))
</script>

<template>
  <section class="np-card platform-ranking">
    <h3>{{ benefitText(title) }}</h3>
    <ul>
      <li v-for="row in rows" :key="row.key">
        <component :is="interactive ? 'button' : 'div'" :type="interactive ? 'button' : undefined" class="rank-row" @click="interactive && emit('select',row.key)">
          <span>{{ benefitText(row.label) }}</span>
          <b>{{ row.value === null ? '—' : benefitText(moneyValues ? money(row.value)+' so‘m' : num(row.value)) }}<small v-if="share && row.value !== null && total > 0"> · {{ num(row.value/total*100,1) }}%</small></b>
          <i aria-hidden="true"><span :style="{width:(row.value ?? 0)/maximum*100+'%'}" /></i>
        </component>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.platform-ranking { min-width: 0; }
.platform-ranking h3 { margin-bottom: 12px; }
ul { padding: 0; margin: 0; list-style: none; }
.rank-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 5px 12px; width: 100%; text-align: start; padding: 7px 0; font-size: 13px; }
.rank-row b { white-space: nowrap; font-variant-numeric: tabular-nums; }
.rank-row i { grid-column: 1 / -1; height: 5px; border-radius: 5px; overflow: hidden; background: var(--muted); }
.rank-row i span { display: block; height: 100%; background: var(--primary); border-radius: inherit; }
</style>
