<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { data, latin, money, num, sum } from './data'
import { benefitText } from '@/shared/i18n'

defineProps<{ active: boolean }>()
const emit = defineEmits<{ open: [family: string, member?: string] }>()
const query = ref('')
const region = ref('')
const status = ref('')
const order = ref('registry')
const page = ref(1)
const pageSize = 15
const normalize = (value: string) => latin(value).toLocaleLowerCase().trim()
const records = data.families.map(family => {
  const payments = family.members.flatMap(member => member.rows)
  const amount = sum(payments.map(payment => sum(payment.arr)))
  const measures = new Set(payments.map(payment => payment.id)).size
  const recipients = family.members.filter(member => member.rows.some(payment => payment.arr.some(value => value > 0))).length
  const warnings = family.signals.filter(([level]) => level === 'warn' || level === 'alert').length
  const recommendations = sum(family.members.map(member => member.suggestions.filter(service => !service.got).length))
  return { family, amount, measures, recipients, warnings, recommendations }
})

const entries = computed(() => {
  const term = normalize(query.value)
  const rows = records.flatMap(record => {
    const { family, warnings, recommendations } = record
    if (status.value === 'warnings' && !warnings || status.value === 'recommendations' && !recommendations) return []
    if (region.value && String(family.region) !== region.value) return []
    const matchesFamily = normalize([family.id, family.address, data.regions[family.region]].join(' ')).includes(term)
    const members = family.members.filter(member => matchesFamily || normalize(member.name + ' ' + member.id).includes(term))
    return members.length ? [{ ...record, members }] : []
  })
  if (order.value === 'amount') rows.sort((a,b) => b.amount - a.amount)
  if (order.value === 'warnings') rows.sort((a,b) => b.warnings - a.warnings)
  return rows
})
const total = computed(() => sum(entries.value.map(row => row.amount)))
const flagged = computed(() => entries.value.filter(row => row.warnings).length)
const pageCount = computed(() => Math.ceil(entries.value.length / pageSize))
const visible = computed(() => entries.value.slice((page.value - 1) * pageSize, page.value * pageSize))
watch([query, region, status, order], () => { page.value = 1 })
</script>

<template>
  <section v-if="active" class="np-card">
    <Teleport defer to="#support-filter-fields">
      <label>{{ benefitText('Pasport qidiruvi') }}<input v-model="query" type="search" :placeholder="benefitText('Ism, oila kodi yoki manzil')"></label>
      <label>{{ benefitText('Hudud') }}<select v-model="region"><option value="">{{ benefitText('Barcha hududlar') }}</option><option v-for="(name,i) in data.regions" :key="i" :value="String(i)">{{ benefitText(name) }}</option></select></label>
      <label>{{ benefitText('Oila holati') }}<select v-model="status"><option value="">{{ benefitText('Barcha oilalar') }}</option><option value="warnings">{{ benefitText('Ogohlantirish bor') }}</option><option value="recommendations">{{ benefitText('Tavsiya etilgan xizmat bor') }}</option></select></label>
      <label>{{ benefitText('Saralash') }}<select v-model="order"><option value="registry">{{ benefitText('Reyestr tartibida') }}</option><option value="amount">{{ benefitText('To‘lov summasi kamayish tartibida') }}</option><option value="warnings">{{ benefitText('Ogohlantirishlar soni bo‘yicha') }}</option></select></label>
    </Teleport>
    <div class="np-card-heading"><h3>{{ benefitText('Pasportlar reyestri') }}</h3><span class="np-tag blue">{{ num(entries.length) }} {{ benefitText('oila') }}</span></div>
    <div class="passport-summary">
      <div><small>{{ benefitText('Tanlangan oilalarga to‘langan · 2025') }}</small><strong>{{ benefitText(money(total) + ' so‘m') }}</strong></div>
      <div><small>{{ benefitText('Ogohlantirish bor oilalar') }}</small><strong>{{ num(flagged) }}</strong></div>
    </div>
    <div class="np-table-wrap"><table class="np-table">
      <thead><tr><th>{{ benefitText('Oila va manzil') }}</th><th>{{ benefitText('Oila a’zolari') }}</th><th>{{ benefitText('To‘langan summa · 2025, so‘m') }}</th><th>{{ benefitText('Choralar') }}</th><th>{{ benefitText('Mutaxassis uchun') }}</th></tr></thead>
      <tbody><tr v-for="{family, members, amount, recipients, measures, warnings, recommendations} in visible" :key="family.id">
        <td><button class="text-button" @click="emit('open', family.id)">{{ family.id }}</button><small>{{ benefitText(data.regions[family.region]) }}</small><small v-if="family.address && family.address !== data.regions[family.region]">{{ benefitText(family.address) }}</small></td>
        <td><div class="passport-names"><button v-for="member in members" :key="member.id" class="text-button" @click="emit('open', family.id, member.id)">{{ benefitText(member.name) }}</button></div></td>
        <td class="payment"><strong>{{ num(amount) }}</strong><small>{{ num(recipients) }} {{ benefitText('nafar oluvchi') }}</small></td>
        <td>{{ num(measures) }}</td>
        <td><div class="passport-status">
          <span v-if="warnings" class="np-tag amber">{{ num(warnings) }} {{ benefitText('ogohlantirish') }}</span>
          <span v-if="recommendations" class="np-tag blue">{{ num(recommendations) }} {{ benefitText('xizmat tavsiyasi') }}</span>
          <span v-if="!warnings && !recommendations">—</span>
        </div></td>
      </tr><tr v-if="!entries.length"><td colspan="5" class="np-empty">{{ benefitText('Pasport topilmadi') }}</td></tr></tbody>
    </table></div>
    <div v-if="pageCount > 1" class="np-pagination"><button :disabled="page===1" @click="page--">{{ benefitText('Oldingi') }}</button>{{ page }} / {{ pageCount }}<button :disabled="page===pageCount" @click="page++">{{ benefitText('Keyingi') }}</button></div>
  </section>
</template>

<style scoped>
.passport-summary { display: flex; flex-wrap: wrap; gap: 12px 40px; margin-bottom: 18px }
.passport-summary div, .passport-status { display: grid; gap: 4px; justify-items: start }
.passport-summary small { color: var(--muted-foreground) }
.passport-summary strong { font-size: 1.25rem; font-variant-numeric: tabular-nums }
.payment strong { white-space: nowrap; font-variant-numeric: tabular-nums }
.passport-names { display: grid; justify-items: start; gap: 6px }
</style>
