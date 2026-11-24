<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, HeartHandshake } from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import { number, supportRecords, supportTypes, type ZoneFilter } from './demo-families'
import { formatDate } from './interventions'
import type { AreaScope } from './geography'
import type { ReportingPeriod } from './reporting-period'

const props = defineProps<{ scope: AreaScope; period: ReportingPeriod; family?: number; person?: string; zone?: ZoneFilter }>()
const open = ref(false)
const dimension = ref<'type' | 'agency' | 'population'>('type')
const category = ref('')
const selected = ref('')
const records = computed(() => open.value ? [...supportRecords(props.scope, props.period, props.family, props.person, props.zone)] : [])
const filtered = computed(() => records.value.filter(record => !category.value || record.type === category.value))
const groups = computed(() => {
  const values = new Map<string, { count: number; allocated: number | null; paid: number | null }>()
  for (const record of filtered.value) {
    const key = record[dimension.value]
    const value = values.get(key) ?? { count: 0, allocated: null, paid: null }
    value.count++
    if (record.allocated !== null) value.allocated = (value.allocated ?? 0) + record.allocated
    if (record.paid !== null) value.paid = (value.paid ?? 0) + record.paid
    values.set(key, value)
  }
  return [...values].sort((a, b) => b[1].count - a[1].count)
})
const details = computed(() => filtered.value.filter(record => props.family || record[dimension.value] === selected.value))
const page = ref(0)
const money = (value: number | null) => value === null ? '—' : number(value) + ' ' + t('so‘m')
</script>

<template>
  <details class="rm-panel rm-support" @toggle="open = ($event.currentTarget as HTMLDetailsElement).open">
    <summary class="rm-panel-head">
      <HeartHandshake :size="20" class="rm-panel-icon" />
      <h3>{{ t('Ko‘rsatilgan yordam') }}</h3>
      <ChevronDown :size="17" />
    </summary>
    <div v-if="open" class="rm-support-content">
      <div v-if="!family" class="rm-support-filters">
        <label class="rm-status-filter">{{ t('Kesim') }} <select v-model="dimension" @change="selected = ''; page = 0"><option value="type">{{ t('Chora turi') }}</option><option value="agency">{{ t('Idora') }}</option><option value="population">{{ t('Aholi toifasi') }}</option></select></label>
        <label class="rm-status-filter">{{ t('Chora turi') }} <select v-model="category" @change="selected = ''; page = 0"><option value="">{{ t('Barchasi') }}</option><option v-for="type in supportTypes" :key="type" :value="type">{{ t(type) }}</option></select></label>
      </div>
      <div v-if="!family && groups.length" class="rm-table-scroll">
        <table class="rm-table">
          <thead><tr><th>{{ t('Guruh') }}</th><th>{{ t('Choralar soni') }}</th><th>{{ t('Ajratilgan') }}</th><th>{{ t('To‘langan') }}</th></tr></thead>
          <tbody><tr v-for="[key, value] in groups" :key="key">
            <td><button type="button" class="rm-text-button" :aria-expanded="selected === key" @click="selected = selected === key ? '' : key; page = 0">{{ t(key) }}</button></td>
            <td>{{ number(value.count) }}</td><td>{{ money(value.allocated) }}</td><td>{{ money(value.paid) }}</td>
          </tr></tbody>
        </table>
      </div>
      <div v-if="details.length" class="rm-table-scroll">
        <table class="rm-table">
          <thead><tr><th>{{ t('Chora') }}</th><th>{{ t('Oluvchi') }}</th><th>{{ t('Sana') }}</th><th>{{ t('Ajratilgan') }}</th><th>{{ t('To‘langan') }}</th></tr></thead>
          <tbody><tr v-for="entry in details.slice(page * 10, page * 10 + 10)" :key="entry.reference">
            <td><strong>{{ t(entry.title) }}</strong><small>{{ t(entry.agency) }} · {{ t(entry.type) }}</small></td>
            <td>{{ family ? t(entry.population) : entry.reference }}</td><td>{{ formatDate(entry.date) }}</td><td>{{ money(entry.allocated) }}</td><td>{{ money(entry.paid) }}</td>
          </tr></tbody>
        </table>
        <footer v-if="details.length > 10" class="rm-pagination">
          <span>{{ number(page * 10 + 1) }}–{{ number(Math.min((page + 1) * 10, details.length)) }} / {{ number(details.length) }}</span>
          <div><button type="button" class="rm-button rm-quiet" :disabled="page === 0" @click="page--">{{ t('Oldingi') }}</button><button type="button" class="rm-button rm-quiet" :disabled="(page + 1) * 10 >= details.length" @click="page++">{{ t('Keyingi') }}</button></div>
        </footer>
      </div>
      <p v-if="!records.length || (!family && !groups.length)" class="rm-dossier-empty">{{ t('Tanlangan davr uchun yordam qaydlari mavjud emas.') }}</p>
    </div>
  </details>
</template>
