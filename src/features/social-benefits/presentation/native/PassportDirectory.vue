<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, Banknote, ScanSearch, ShieldAlert, Users } from 'lucide-vue-next'
import { data, latin, money, num, sum } from './data'
import { benefitText } from '@/shared/i18n'
import { usePrototypeRequests } from './prototype-requests'

defineProps<{ active: boolean }>()
const emit = defineEmits<{ open: [family: string, member?: string, quarter?: number] }>()
const { events } = usePrototypeRequests()
const query = ref('')
const region = ref('')
const category = ref('')
const quarter = ref(0)
const minimum = ref<number | ''>('')
const maximum = ref<number | ''>('')
const status = ref('')
const order = ref('registry')
const page = ref(1)
const pageSize = 12
const categories = [...new Set(data.families.flatMap(family => family.tags))].filter(tag => !/^\d/.test(tag))
const quarters = ['2025-yil', 'I chorak', 'II chorak', 'III chorak', 'IV chorak']
const normalize = (value: string) => latin(value.normalize('NFC'))
  .toLocaleLowerCase().replace(/[‘’ʻʼ'\x60]/g, '').replace(/\s+/g, ' ').trim()

const indexedFamilies = data.families.map(family => ({
  family,
  search: normalize([family.id, family.address, data.regions[family.region]].join(' ')),
  members: family.members.map(member => ({ member, search: normalize(member.name + ' ' + member.id) })),
  warnings: family.signals.filter(([level]) => level === 'warn' || level === 'alert').length,
  recommendations: sum(family.members.map(member => member.suggestions.filter(service => !service.got).length)),
}))
const openByFamily = computed(() => {
  const counts = new Map<string, number>()
  for (const event of events.value) {
    if (event.status !== 'delivered' && event.status !== 'duplicate') {
      counts.set(event.familyId, (counts.get(event.familyId) ?? 0) + 1)
    }
  }
  return counts
})
const periodMonths = computed(() => Array.from({ length: 12 }, (_, month) => month)
  .filter(month => !quarter.value || Math.floor(month / 3) === quarter.value - 1))
const entries = computed(() => {
  const terms = normalize(query.value).split(' ').filter(Boolean)
  const rows = indexedFamilies.flatMap(({ family, search, members, warnings, recommendations }) => {
    const openRequests = openByFamily.value.get(family.id) ?? 0
    if (region.value && family.region !== Number(region.value)) return []
    if (category.value && !family.tags.includes(category.value)) return []
    if (status.value === 'warnings' && !warnings) return []
    if (status.value === 'recommendations' && !recommendations) return []
    if (status.value === 'pending' && !openRequests) return []
    const matches = members.filter(item => terms.every(term => search.includes(term) || item.search.includes(term)))
    if (!matches.length) return []

    const measures = new Set<string>()
    let amount = 0
    let recipients = 0
    for (const member of family.members) {
      let receivesPayment = false
      for (const payment of member.rows) {
        const amounts = periodMonths.value.map(month => payment.arr[month] ?? 0)
        amount += sum(amounts)
        if (amounts.some(value => value > 0)) {
          measures.add(payment.id)
          receivesPayment = true
        }
      }
      if (receivesPayment) recipients++
    }
    if (minimum.value !== '' && amount < minimum.value) return []
    if (maximum.value !== '' && amount > maximum.value) return []
    return [{
      family, amount, recipients, measures: measures.size, warnings, recommendations, openRequests,
      members: matches.map(item => item.member),
    }]
  })
  if (order.value === 'amount') rows.sort((a, b) => b.amount - a.amount)
  if (order.value === 'pending') rows.sort((a, b) => b.openRequests - a.openRequests)
  if (order.value === 'warnings') rows.sort((a, b) => b.warnings - a.warnings)
  return rows
})
const total = computed(() => sum(entries.value.map(row => row.amount)))
const flagged = computed(() => entries.value.filter(row => row.warnings).length)
const pending = computed(() => sum(entries.value.map(row => row.openRequests)))
const pageCount = computed(() => Math.ceil(entries.value.length / pageSize))
const visible = computed(() => entries.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const invertedRange = computed(() => minimum.value !== '' && maximum.value !== '' && minimum.value > maximum.value)
watch([query, region, category, quarter, minimum, maximum, status, order], () => { page.value = 1 })
watch(pageCount, count => { page.value = Math.min(page.value, Math.max(1, count)) })
</script>

<template>
  <section v-if="active" class="np-card passport-directory">
    <Teleport defer to="#support-filter-fields">
      <label>
        {{ benefitText('Pasport qidiruvi') }}
        <input v-model="query" type="search" :placeholder="benefitText('F.I.Sh., oila kodi yoki mahalla')">
      </label>
      <label>
        {{ benefitText('Hudud') }}
        <select v-model="region">
          <option value="">{{ benefitText('Barcha hududlar') }}</option>
          <option v-for="(name, i) in data.regions" :key="i" :value="String(i)">{{ benefitText(name) }}</option>
        </select>
      </label>
      <label>
        {{ benefitText('Oila toifasi') }}
        <select v-model="category">
          <option value="">{{ benefitText('Barcha toifalar') }}</option>
          <option v-for="tag in categories" :key="tag" :value="tag">{{ benefitText(tag) }}</option>
        </select>
      </label>
      <label>
        {{ benefitText('To‘lov davri') }}
        <select v-model.number="quarter">
          <option v-for="(label, index) in quarters" :key="index" :value="index">{{ benefitText(label) }}</option>
        </select>
      </label>
      <label>{{ benefitText('Eng kam to‘lov, so‘m') }}<input v-model.number="minimum" type="number" min="0"></label>
      <label>{{ benefitText('Eng ko‘p to‘lov, so‘m') }}<input v-model.number="maximum" type="number" min="0"></label>
      <label>
        {{ benefitText('Oila holati') }}
        <select v-model="status">
          <option value="">{{ benefitText('Barcha oilalar') }}</option>
          <option value="pending">{{ benefitText('Ochiq so‘rov bor') }}</option>
          <option value="warnings">{{ benefitText('Manba ogohlantirishi bor') }}</option>
          <option value="recommendations">{{ benefitText('Tavsiya etilgan xizmat bor') }}</option>
        </select>
      </label>
      <label>
        {{ benefitText('Saralash') }}
        <select v-model="order">
          <option value="registry">{{ benefitText('Reyestr tartibida') }}</option>
          <option value="amount">{{ benefitText('To‘lov summasi bo‘yicha') }}</option>
          <option value="pending">{{ benefitText('Ochiq so‘rovlar soni bo‘yicha') }}</option>
          <option value="warnings">{{ benefitText('Manba ogohlantirishlari soni bo‘yicha') }}</option>
        </select>
      </label>
    </Teleport>

    <div class="np-card-heading">
      <h3>{{ benefitText('Pasportlar reyestri') }}</h3>
      <span class="np-tag blue">{{ benefitText(quarter ? '2025 · ' + quarters[quarter] : quarters[0]) }}</span>
    </div>
    <div class="passport-summary" aria-live="polite">
      <div><Users :size="18" aria-hidden="true" /><small>{{ benefitText('Tanlangan oilalar') }}</small><strong>{{ num(entries.length) }}</strong></div>
      <div><Banknote :size="18" aria-hidden="true" /><small>{{ benefitText('Manbadagi to‘lovlar') }}</small><strong>{{ benefitText(money(total) + ' so‘m') }}</strong></div>
      <div><ShieldAlert :size="18" aria-hidden="true" /><small>{{ benefitText('Manba ogohlantirishi bor oilalar') }}</small><strong>{{ num(flagged) }}</strong></div>
      <div><ScanSearch :size="18" aria-hidden="true" /><small>{{ benefitText('Ochiq namunaviy so‘rovlar') }}</small><strong>{{ num(pending) }}</strong></div>
    </div>
    <p v-if="!entries.length" class="np-empty" role="status">
      {{ benefitText(invertedRange ? 'Eng kam summa eng ko‘p summadan oshmasligi kerak.' : 'Tanlangan kesimda oila topilmadi.') }}
    </p>
    <div v-else class="np-table-wrap passport-table">
      <table class="np-table">
        <thead>
          <tr><th scope="col">{{ benefitText('Oila va manzil') }}</th><th scope="col">{{ benefitText('Oila a’zolari') }}</th><th scope="col">{{ benefitText('To‘lov va choralar') }}</th><th scope="col">{{ benefitText('Mutaxassis uchun') }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in visible" :key="row.family.id">
            <td :data-label="benefitText('Oila va manzil')">
              <button class="text-button passport-open" @click="emit('open', row.family.id, undefined, quarter)">
                {{ benefitText('Oila pasporti') }} <span>{{ row.family.id }}</span><ArrowUpRight :size="14" aria-hidden="true" />
              </button>
              <small>{{ benefitText(data.regions[row.family.region]) }}</small>
              <small v-if="row.family.address && row.family.address !== data.regions[row.family.region]">{{ benefitText(row.family.address) }}</small>
            </td>
            <td :data-label="benefitText('Oila a’zolari')">
              <div class="passport-names">
                <button v-for="member in row.members.slice(0, 2)" :key="member.id" class="text-button" @click="emit('open', row.family.id, member.id, quarter)">{{ benefitText(member.name) }}</button>
                <details v-if="row.members.length > 2">
                  <summary>{{ num(row.members.length - 2) }} {{ benefitText('nafar a’zoni ko‘rish') }}</summary>
                  <div class="passport-names">
                    <button v-for="member in row.members.slice(2)" :key="member.id" class="text-button" @click="emit('open', row.family.id, member.id, quarter)">{{ benefitText(member.name) }}</button>
                  </div>
                </details>
              </div>
            </td>
            <td :data-label="benefitText('To‘lov va choralar')" class="payment">
              <strong>{{ num(row.amount) }} {{ benefitText('so‘m') }}</strong>
              <small>{{ num(row.recipients) }} {{ benefitText('nafar oluvchi') }} · {{ num(row.measures) }} {{ benefitText('chora') }}</small>
            </td>
            <td :data-label="benefitText('Mutaxassis uchun')">
              <div class="passport-status">
                <span v-if="row.openRequests" class="np-tag purple">{{ num(row.openRequests) }} {{ benefitText('ochiq so‘rov') }}</span>
                <span v-if="row.warnings" class="np-tag amber">{{ num(row.warnings) }} {{ benefitText('manba ogohlantirishi') }}</span>
                <span v-if="row.recommendations" class="np-tag blue">{{ num(row.recommendations) }} {{ benefitText('xizmat tavsiyasi') }}</span>
                <span v-if="!row.openRequests && !row.warnings && !row.recommendations" class="passport-empty-status">—</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-if="pageCount > 1" class="np-pagination" :aria-label="benefitText('Pasport sahifalari')">
      <button :disabled="page === 1" @click="page--">{{ benefitText('Oldingi') }}</button>
      <span>{{ page }} / {{ pageCount }}</span>
      <button :disabled="page === pageCount" @click="page++">{{ benefitText('Keyingi') }}</button>
    </nav>
  </section>
</template>

<style scoped>
.passport-directory { container-type: inline-size }
.passport-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 155px), 1fr)); gap: 12px; margin-bottom: 18px }
.passport-summary div { display: grid; grid-template-columns: auto minmax(0, 1fr); align-content: start; align-items: center; gap: 5px 9px; min-width: 0; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: var(--muted) }
.passport-summary svg { color: var(--primary) }
.passport-summary small { color: var(--muted-foreground); line-height: 1.3 }
.passport-summary strong { grid-column: 2; font-size: 1.2rem; font-variant-numeric: tabular-nums; overflow-wrap: anywhere }
.passport-status { display: grid; gap: 4px; justify-items: start }
.passport-status .np-tag { white-space: normal; line-height: 1.35 }
.passport-empty-status { color: var(--muted-foreground) }
.payment strong { font-variant-numeric: tabular-nums }
.passport-names { display: grid; justify-items: start; gap: 6px }
.passport-names button { text-align: start; line-height: 1.4; overflow-wrap: anywhere }
.passport-names summary { cursor: pointer; color: var(--primary); font-size: 12px }
.passport-names details[open] summary { margin-bottom: 7px }
.passport-open { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 5px; text-align: start; line-height: 1.4 }
.passport-open span { font-variant-numeric: tabular-nums }
@container (max-width: 680px) {
  .passport-table { border: 0; overflow: visible }
  .passport-table .np-table { display: block; min-width: 0 }
  .passport-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%) }
  .passport-table tbody { display: grid; gap: 12px }
  .passport-table tr { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 175px), 1fr)); gap: 10px; padding: 12px; border: 1px solid var(--border); border-radius: 12px }
  .passport-table td { display: block; min-width: 0; padding: 0; border: 0; overflow-wrap: anywhere }
  .passport-table td::before { content: attr(data-label); display: block; margin-bottom: 3px; color: var(--muted-foreground); font-size: 11px }
}
</style>
