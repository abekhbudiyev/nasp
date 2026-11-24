<script setup lang="ts">
import { computed, ref } from 'vue'
import { CalendarDays, ChevronDown, X } from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import { snapshotDate } from './demo-families'
import { formatDate } from './interventions'
import { allDates, calendarPeriod, periodFromQuery, type ReportingPeriod } from './reporting-period'

const props = defineProps<{ period: ReportingPeriod }>()
const emit = defineEmits<{ apply: [period: ReportingPeriod] }>()
const dialog = ref<HTMLDialogElement>()
const trigger = ref<HTMLButtonElement>()
const kind = ref<ReportingPeriod['kind']>('all')
const year = ref(Number(snapshotDate.slice(0, 4)))
const part = ref(1)
const from = ref('')
const to = ref('')
const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
const draft = computed(() => kind.value === 'all' ? allDates : kind.value === 'range'
  ? periodFromQuery('range', from.value, to.value) : calendarPeriod(kind.value, year.value, part.value))

function open() {
  const current = props.period
  kind.value = current.kind
  year.value = Number((current.from || snapshotDate).slice(0, 4))
  const month = Number((current.from || snapshotDate).slice(5, 7))
  part.value = current.kind === 'quarter' ? Math.ceil(month / 3) : month
  from.value = current.from
  to.value = current.to
  dialog.value?.showModal()
}
function apply() {
  if (kind.value === 'range' && draft.value.kind !== 'range') return
  emit('apply', draft.value)
  dialog.value?.close()
}
function resetPart() {
  const month = Number(snapshotDate.slice(5, 7))
  part.value = kind.value === 'quarter' ? Math.ceil(month / 3) : month
}
</script>

<template>
  <button ref="trigger" type="button" class="rm-button rm-quiet" aria-haspopup="dialog" :aria-label="t('Davr')" @click="open">
    <CalendarDays :size="16" />{{ period.kind === 'all' ? t('Davr') : formatDate(period.from) + ' – ' + formatDate(period.to) }}<ChevronDown :size="14" />
  </button>
  <dialog ref="dialog" class="rm-dialog rm-period-dialog" aria-labelledby="rm-period-title" @close="trigger?.focus()">
    <header class="rm-dialog-head">
      <span class="rm-dialog-icon"><CalendarDays :size="20" /></span>
      <div><h2 id="rm-period-title">{{ t('Hisobot davri') }}</h2></div>
      <button type="button" class="rm-icon-button" :aria-label="t('Yopish')" @click="dialog?.close()"><X :size="19" /></button>
    </header>
    <form class="rm-dialog-form" @submit.prevent="apply">
      <label>{{ t('Davr turi') }}
        <select v-model="kind" @change="resetPart">
          <option value="all">{{ t('Barcha sanalar') }}</option>
          <option value="year">{{ t('Yil') }}</option>
          <option value="quarter">{{ t('Chorak') }}</option>
          <option value="month">{{ t('Oy') }}</option>
          <option value="range">{{ t('Sanalar oralig‘i') }}</option>
        </select>
      </label>
      <div v-if="kind === 'range'" class="rm-dialog-fields">
        <label>{{ t('Boshlanish sanasi') }}<input v-model="from" type="date" :max="to || undefined" required /></label>
        <label>{{ t('Tugash sanasi') }}<input v-model="to" type="date" :min="from || undefined" required /></label>
      </div>
      <div v-else-if="kind !== 'all'" class="rm-dialog-fields">
        <label>{{ t('Yil') }}<input v-model.number="year" type="number" min="2000" max="2099" required /></label>
        <label v-if="kind === 'quarter'">{{ t('Chorak') }}<select v-model.number="part"><option v-for="n in 4" :key="n" :value="n">{{ n }}</option></select></label>
        <label v-if="kind === 'month'">{{ t('Oy') }}<select v-model.number="part"><option v-for="(month, i) in months" :key="month" :value="i + 1">{{ t(month) }}</option></select></label>
      </div>
      <footer class="rm-dialog-foot">
        <button class="rm-button rm-quiet" type="button" @click="dialog?.close()">{{ t('Bekor qilish') }}</button>
        <button class="rm-button rm-primary" type="submit">{{ t('Qo‘llash') }}</button>
      </footer>
    </form>
  </dialog>
</template>
