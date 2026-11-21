<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, CircleCheck, ClipboardList, Wallet } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { data, money, num, organization } from './data'
import {
  formatRequestId, requestAgencyKeys, requestStatusLabels, requestTotals,
  usePrototypeRequests, type PrototypeRequest, type RequestStatus,
} from './prototype-requests'
import { scopeAgency, scopeRegion, type ReportOutput } from './report-output'
import ReportActions from './ReportActions.vue'

const props = withDefaults(defineProps<{ region?: string; agency?: string; requestId?: number }>(), { region: '', agency: '' })
const emit = defineEmits<{ request: [number]; clear: [] }>()
const { events } = usePrototypeRequests()
const status = ref<RequestStatus | ''>('')
const kind = ref<PrototypeRequest['kind'] | ''>('')
const kinds = { payment: 'To‘lov', benefit: 'Imtiyoz', service: 'Xizmat' }
const columns = ['So‘rov kodi', 'Chora', 'Idora', 'Hudud', 'Oila va fuqaro', 'Holat', 'Summa, so‘m', 'So‘nggi amal']
const dateFormat = new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent', dateStyle: 'short', timeStyle: 'short' })

function lastEvent(request: PrototypeRequest) {
  const entry = request.history[request.history.length - 1]
  if (!entry) return '—'
  const date = new Date(entry.at)
  return Number.isNaN(date.getTime()) ? entry.label : `${entry.label} · ${dateFormat.format(date)}`
}

const rows = computed(() => events.value.filter(request => (
  (!props.requestId || props.requestId === request.id) &&
  (props.region === '' || request.region === Number(props.region)) &&
  (!props.agency || requestAgencyKeys[request.agency] === props.agency) &&
  (!status.value || request.status === status.value) &&
  (!kind.value || request.kind === kind.value)
)).map(request => {
  const family = data.families.find(family => family.id === request.familyId)
  const member = family?.members.find(member => member.id === request.memberId)
  return {
    request,
    code: formatRequestId(request.id),
    agency: organization(requestAgencyKeys[request.agency] ?? ''),
    region: data.regions[request.region] ?? '',
    member: [request.familyId, member?.name ?? request.memberId].filter(Boolean).join(' · '),
    amount: request.kind === 'payment' ? request.amount : null,
    status: requestStatusLabels[request.status],
    latest: lastEvent(request),
  }
}).reverse())
const totals = computed(() => requestTotals(rows.value.map(row => row.request)))
const scope = computed(() => [scopeRegion(props.region), scopeAgency(props.agency), 'Namunaviy ijro yozuvlari'].join(' · '))
const output = computed<ReportOutput>(() => ({
  title: 'Ijro hisoboti',
  metadata: [
    ['Manba', 'Namunaviy ijro yozuvlari'], ['Hudud', scopeRegion(props.region)], ['Idora', scopeAgency(props.agency)],
    ['So‘rov', props.requestId ? formatRequestId(props.requestId) : 'Barchasi'],
    ['Holat', status.value ? requestStatusLabels[status.value] : 'Barchasi'],
    ['Chora turi', kind.value ? kinds[kind.value] : 'Barchasi'],
    ['Qabul qilingan so‘rovlar', totals.value.received], ['Ijrosi yakunlanganlar', totals.value.delivered],
    ['Ijro summasi, so‘m', totals.value.deliveredAmount],
  ],
  columns,
  rows: rows.value.map(row => [row.code, row.request.measure, row.agency, row.region, row.member, row.status, row.amount, row.latest]),
}))
</script>

<template>
  <Teleport defer to="#support-filter-fields">
    <label>{{ benefitText('So‘rov holati') }}
      <select v-model="status">
        <option value="">{{ benefitText('Barcha holatlar') }}</option>
        <option v-for="(label, key) in requestStatusLabels" :key="key" :value="key">{{ benefitText(label) }}</option>
      </select>
    </label>
    <label>{{ benefitText('Chora turi') }}
      <select v-model="kind">
        <option value="">{{ benefitText('Barcha turlar') }}</option>
        <option v-for="(label, key) in kinds" :key="key" :value="key">{{ benefitText(label) }}</option>
      </select>
    </label>
  </Teleport>
  <section class="np-card">
    <header class="np-card-heading">
      <div><h3>{{ benefitText('So‘rovlar bo‘yicha ijro') }}</h3><p>{{ benefitText(scope) }}</p></div>
      <ReportActions filename="So‘rovlar_ijro_hisoboti.xlsx" :report="output" print />
    </header>
    <div class="request-metrics">
      <article><ClipboardList :size="18" /><span>{{ benefitText('Tanlangan so‘rovlar') }}</span><strong>{{ num(totals.received) }}</strong></article>
      <article><CircleCheck :size="18" /><span>{{ benefitText('Ijrosi yakunlangan') }}</span><strong>{{ num(totals.delivered) }}</strong></article>
      <article><Wallet :size="18" /><span>{{ benefitText('Ijro summasi') }}</span><strong>{{ benefitText(money(totals.deliveredAmount) + ' so‘m') }}</strong></article>
    </div>
    <div v-if="requestId" class="np-toolbar">
      <p>{{ benefitText('So‘rov') }} <b>{{ formatRequestId(requestId) }}</b></p>
      <button class="np-button" @click="emit('clear')">{{ benefitText('Barcha so‘rovlarni ko‘rish') }}</button>
    </div>
    <div class="np-table-wrap">
      <table class="np-table">
        <thead><tr><th v-for="column in columns" :key="column" scope="col">{{ benefitText(column) }}</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.request.id">
            <td><button class="text-button request-anchor" @click="emit('request',row.request.id)">{{ row.code }} <ArrowUpRight :size="13" /></button></td>
            <td>{{ benefitText(row.request.measure) }}</td>
            <td>{{ benefitText(row.agency) }}</td>
            <td>{{ benefitText(row.region) }}</td>
            <td>{{ benefitText(row.member) }}</td>
            <td><span class="np-tag" :class="row.request.status === 'delivered' ? 'green' : row.request.status === 'duplicate' ? 'red' : row.request.status === 'returned' || row.request.status === 'waiting' ? 'amber' : 'blue'">{{ benefitText(row.status) }}</span></td>
            <td>{{ row.amount === null ? '—' : num(row.amount) }}</td>
            <td>{{ benefitText(row.latest) }}</td>
          </tr>
          <tr v-if="!rows.length"><td :colspan="columns.length" class="np-empty">{{ benefitText('Tanlangan kesim bo‘yicha so‘rov yo‘q.') }}</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.request-metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-bottom:16px }
.request-metrics article { display:grid; grid-template-columns:18px minmax(0,1fr); column-gap:9px; row-gap:6px; align-items:center; padding:14px; border-radius:13px; background:var(--muted) }
.request-metrics svg,.request-metrics strong { color:var(--primary) }
.request-metrics span { font-size:12px; color:var(--muted-foreground) }
.request-metrics strong { grid-column:2; font-size:clamp(16px,2vw,25px); font-variant-numeric:tabular-nums }
.request-anchor { display:inline-flex; align-items:center; gap:4px; white-space:nowrap }
@media (max-width:580px) { .request-metrics { grid-template-columns:1fr } }
</style>
