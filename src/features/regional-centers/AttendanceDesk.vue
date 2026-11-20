<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import RegistryList from './RegistryList.vue'
import PersonLink from './PersonLink.vue'
import { useRegistryList } from './registry'
import type { RegistryScope } from './registry'
import {
  approvedPassport, dailyVisits, decidePassport, draftPassport, fundingLabels, isPendingPassport,
  quotaRows, verificationLabels,
} from './attendance'
import type { DailyVisit, RegionalActor } from './attendance'
import { centerFor, serviceName, today } from './model'
import type { CenterState, PersonProfile, Placement } from './model'

const props = defineProps<{
  mode: 'visits' | 'passports' | 'usage'
  state: CenterState
  placements: Placement[]
  actor: RegionalActor
  busy: boolean
  readOnly: boolean
  referralId?: string
  visitId?: string
  recipientId?: string
  people: ReadonlyMap<string, PersonProfile>
  scopeFilters: RegistryScope
  mutationError?: string
  rangeStart?: string
  rangeEnd?: string
}>()
const emit = defineEmits<{ change: [mutation: (draft: CenterState) => void]; openPerson: [code: string] }>()

const current = today()

const logDate = ref(current)
const expanded = ref<string>()
const showPassport = ref(false)
const passportSubmitted = ref(false)
const passportDialog = ref<HTMLDialogElement>()
const passport = reactive({ placementId: '', voucher: 0, paid: 0, effectiveFrom: current })
const fmtDate = (value: string) => value.split('-').reverse().join('.')
const placementIds = computed(() => new Set(props.placements.map(item => item.id)))
const placementById = computed(() => new Map(props.placements.map(item => [item.id, item])))
const roomById = computed(() => new Map(props.state.rooms.map(item => [item.id, item])))
const centerById = computed(() => new Map(props.state.centers.map(item => [item.id, item])))
const providerById = computed(() => new Map(props.state.providers.map(item => [item.id, item])))
const targetVisit = computed(() => props.visitId ? props.state.visits.find(visit => visit.id === props.visitId) : undefined)
const scopedReferral = computed(() => props.referralId || targetVisit.value?.referralId)
const dayRows = computed(() => {
  let records = props.state.visits
  if (scopedReferral.value || props.recipientId) {
    const relevant = new Set(props.state.referrals.filter(item => placementIds.value.has(item.placementId)
      && (!scopedReferral.value || item.id === scopedReferral.value)
      && (!props.recipientId || item.beneficiary === props.recipientId)).map(item => item.id))
    records = records.filter(visit => relevant.has(visit.referralId))
  }
  return dailyVisits(props.state, records).filter(item => placementIds.value.has(item.placementId))
})
const filteredLog = computed(() => dayRows.value.filter(item => props.visitId
  ? item.confirmations.some(visit => visit.id === props.visitId)
  : (logDate.value ? item.date === logDate.value
  : (!props.rangeStart || item.date >= props.rangeStart) && (!props.rangeEnd || item.date <= props.rangeEnd)))
  .sort((first, second) => second.date.localeCompare(first.date) || second.confirmations.length - first.confirmations.length))
const quotas = computed(() => quotaRows(props.state, props.placements, dayRows.value, logDate.value || current))
const passportHistory = computed(() => props.state.passports.filter(item => placementIds.value.has(item.placementId))
  .slice().reverse().sort((a, b) => Number(isPendingPassport(b)) - Number(isPendingPassport(a))))
const listScope = () => JSON.stringify([...placementIds.value])
const visitList = useRegistryList(() => filteredLog.value, item => ({
  status: item.funding, date: item.date,
  search: [props.people.get(item.beneficiary)?.fullName, item.beneficiary, placementName(item.placementId), ...item.confirmations.flatMap(visit => [visit.evidence, visit.voucherRef])].join(' '),
}), () => JSON.stringify([listScope(), logDate.value]), { sort: 'newest' })
const usageList = useRegistryList(() => quotas.value, item => ({
  status: item.alerts.length ? 'signal' : 'ok',
  search: [item.center?.name, placementName(item.placement.id), providerName(item.placement), ...item.alerts].join(' '),
}), () => JSON.stringify([listScope(), logDate.value]))
const passportList = useRegistryList(() => passportHistory.value, item => ({
  status: item.approvedAt ? 'approved' : item.rejectedAt ? 'rejected' : 'pending', date: item.effectiveFrom,
  search: [item.id, placementName(item.placementId), centerName(item.placementId), item.approvedBy, item.rejectedBy, item.createdBy].join(' '),
}), listScope)
const passportStatuses = { pending: 'Tasdiq kutilmoqda', approved: 'Tasdiqlangan', rejected: 'Rad etilgan' }

watch(() => [props.mode, props.referralId, props.visitId, props.recipientId, props.rangeStart, props.rangeEnd], () => {
  showPassport.value = false
  expanded.value = undefined
  visitList.reset()
  usageList.reset()
  passportList.reset()
  logDate.value = props.referralId || props.recipientId || props.rangeStart || props.rangeEnd ? '' : current
}, { immediate: true })

const targetDay = computed(() => props.visitId ? filteredLog.value[0]?.id : undefined)
watch([() => props.visitId, targetDay], ([, id]) => { if (id) expanded.value = id }, { immediate: true, flush: 'post' })

watch(() => props.state, (state) => {
  if (showPassport.value && state.passports.some(item => item.placementId === passport.placementId && isPendingPassport(item))) showPassport.value = false
})
watch(showPassport, visible => {
  if (visible && !passportDialog.value?.open) passportDialog.value?.showModal()
  if (!visible && passportDialog.value?.open) passportDialog.value.close()
}, { flush: 'post' })

function placementName(id: string) {
  const item = placementById.value.get(id)
  if (!item) return '—'
  const room = roomById.value.get(item.roomId)
  return `${serviceName(item.serviceId)} · ${room?.name ?? '—'}`
}

function centerName(placementId: string) {
  const room = roomById.value.get(placementById.value.get(placementId)?.roomId ?? '')
  return centerById.value.get(room?.centerId ?? '')?.name
}

function providerName(item: Placement) {
  return item.operator === 'center' ? 'Hududiy markaz'
    : providerById.value.get(item.providerId ?? '')?.name ?? 'Ko‘rsatuvchi tanlanmoqda'
}

function savePassport() {
  passportSubmitted.value = true
  const values = { ...passport, voucher: Number(passport.voucher), paid: Number(passport.paid) }
  emit('change', draft => draftPassport(draft, props.actor, values))
}

function startPassport(id = '') {
  const row = approvedPassport(props.state, id, current)
  Object.assign(passport, { placementId: id, voucher: row?.voucher ?? 0, paid: row?.paid ?? 0, effectiveFrom: current })
  passportSubmitted.value = false
  showPassport.value = true
}

function verifiedLabel(row: DailyVisit) {
  const types = new Set(row.confirmations.map(item => item.verification))
  return [...types].map(type => type ? verificationLabels[type] : 'Avvalgi qayd').join(' / ')
}
</script>

<template>
    <section v-if="props.mode === 'visits'" class="desk-panel registry-panel">
      <RegistryList :list="visitList" label="Tashriflar" fill :scope-filters="visitId ? undefined : scopeFilters" :search="visitId ? undefined : 'F.I.Sh., kod yoki tasdiq raqami'"
        :statuses="visitId ? undefined : fundingLabels" :date-sort="!visitId">
        <template v-if="(logDate && !visitId) || rangeStart || rangeEnd || $slots.toolbar" #toolbar>
          <slot name="toolbar" />
          <span v-if="logDate && !visitId" class="muted">{{ fmtDate(logDate) }}</span>
          <span v-else-if="rangeStart || rangeEnd" class="muted">{{ rangeStart ? fmtDate(rangeStart) : '—' }} – {{ rangeEnd ? fmtDate(rangeEnd) : '—' }}</span>
        </template>
        <template v-if="!visitId" #tools>
          <div class="desk-filter inline">
            <label>Reyestr sanasi <input v-model="logDate" type="date" :max="current"></label>
            <button v-if="logDate" type="button" class="button compact" @click="logDate = ''">Sanani tozalash</button>
          </div>
        </template>
        <div class="desk-list">
          <article v-for="item in visitList.result.items" :key="item.id" class="log-row">
            <div class="log-row-head">
              <div class="log-person">
                <PersonLink :code="item.beneficiary" :name="people.get(item.beneficiary)?.fullName" @open="emit('openPerson', $event)" />
                <small>{{ serviceName(item.serviceId) }} · {{ fmtDate(item.date) }} · {{ centerFor(state, item.placementId)?.address }} · {{ verifiedLabel(item) }}</small>
              </div>
              <button class="log-expand" type="button" :aria-expanded="expanded === item.id" @click="expanded = expanded === item.id ? undefined : item.id">
                <span class="funding-chip" :data-funding="item.funding">{{ fundingLabels[item.funding] }}</span>
                <span class="log-confirmations">{{ item.confirmations.length }} ta tasdiq <ChevronDown :size="14" aria-hidden="true" /></span>
              </button>
            </div>
            <ul v-if="expanded === item.id" class="confirmation-list">
                <li v-for="event in item.confirmations" :key="event.id" :class="{ 'target-confirmation': event.id === visitId }" :aria-current="event.id === visitId ? 'true' : undefined">
                  <strong>{{ event.evidence }} · {{ event.minutes }} daqiqa</strong>
                  <small>{{ event.confirmedBy === 'representative' ? 'Qonuniy vakil' : event.confirmedBy === 'beneficiary' ? 'Xizmat oluvchi' : 'Tasdiqlovchi ko‘rsatilmagan' }} · {{ event.recordedBy || 'Demo manba' }}<template v-if="event.voucherRef"> · {{ event.voucherRef }}</template></small>
                  <small v-if="event.recordedAt">{{ new Date(event.recordedAt).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }) }}</small>
                  <small v-if="event.reason">Kurator izohi: {{ event.reason }}</small>
                </li>
            </ul>
          </article>
          <p v-if="!visitList.result.totalCount" key="no-visits" class="empty-desk">Sana va filtr bo‘yicha tashrif topilmadi.</p>
        </div>
      </RegistryList>
    </section>

    <section v-else-if="mode === 'usage'" class="desk-panel registry-panel">
      <RegistryList :list="usageList" label="Kunlik quvvat" fill :scope-filters="scopeFilters" search="Markaz, xizmat yoki signal" :statuses="{ signal: 'Signal bor', ok: 'Signal yo‘q' }">
        <template #toolbar>
          <slot name="toolbar" />
          <span class="muted">{{ fmtDate(logDate || current) }}</span>
        </template>
        <template #tools>
          <div class="desk-filter inline"><label>Hisobot sanasi <input v-model="logDate" type="date" :max="current"></label></div>
        </template>
        <div class="desk-table">
          <table>
            <thead><tr><th>Markaz va xizmat ko‘rsatuvchi</th><th>Vaucherli tashrif / kvota</th><th>Pullik tashrif / kvota</th><th>Kunlik signal</th></tr></thead>
            <tbody>
              <tr v-for="row in usageList.result.items" :key="row.placement.id">
                <td><strong>{{ placementName(row.placement.id) }}</strong><small>{{ row.center?.name }} · {{ providerName(row.placement) }}</small></td>
                <td><span class="funding-chip" data-funding="voucher">{{ row.actual.voucher }} / {{ row.passport?.voucher ?? '—' }}</span></td>
                <td><span class="funding-chip" data-funding="paid">{{ row.actual.paid }} / {{ row.passport?.paid ?? '—' }}</span></td>
                <td><small v-for="alert in row.alerts" :key="alert" class="quota-alert">{{ alert }}</small><small v-if="!row.alerts.length">—</small></td>
              </tr>
              <tr v-if="!usageList.result.totalCount"><td colspan="4" class="empty-desk">Filtr bo‘yicha xizmat joylari yo‘q.</td></tr>
            </tbody>
          </table>
        </div>
      </RegistryList>
    </section>
    <section v-else class="desk-panel registry-panel">
        <dialog ref="passportDialog" class="editor" aria-labelledby="hixm-passport-title" @close="showPassport = false" @cancel="busy && $event.preventDefault()">
          <div class="section-heading"><h2 id="hixm-passport-title">Quvvat pasportini kiritish</h2></div>
          <form class="desk-form" @submit.prevent="savePassport">
            <label class="wide">Xizmat joyi
              <select v-model="passport.placementId" aria-label="Xizmat joyi" required><option value="">Xizmat joyini tanlang</option>
                <option v-for="item in placements" :key="item.id" :value="item.id">{{ centerFor(state, item.id)?.address }} · {{ placementName(item.id) }}</option>
              </select>
            </label>
            <label>Vaucherli kvota <input v-model.number="passport.voucher" type="number" min="0" max="10000" required></label>
            <label>Pullik kvota <input v-model.number="passport.paid" type="number" min="0" max="10000" required></label>
            <label>Amal boshlanishi <input v-model="passport.effectiveFrom" type="date" :min="current" required></label>
            <p v-if="passportSubmitted && mutationError" class="message error wide" role="alert">{{ mutationError }}</p>
            <div class="desk-submit wide">
              <button type="button" class="button" @click="showPassport = false">Yopish</button>
              <button type="submit" class="button primary" :disabled="busy || readOnly">Tasdiqlashga yuborish</button>
            </div>
          </form>
        </dialog>
      <RegistryList :list="passportList" label="Quvvat pasportlari" fill :scope-filters="scopeFilters" search="Markaz, xizmat yoki mas’ul" :statuses="passportStatuses" date-sort>
        <template #toolbar>
          <slot name="toolbar" />
          <button v-if="!readOnly && placements.length" type="button" class="button primary compact" @click="startPassport(placements.length === 1 ? placements[0]?.id : '')">Pasport kiritish</button>
        </template>
        <div class="desk-table"><table>
          <thead><tr><th>Xizmat joyi</th><th>Kvota</th><th>Amal boshlanishi</th><th>Holat va mas’ul</th><th>Amal</th></tr></thead>
          <tbody>
            <tr v-for="item in passportList.result.items" :key="item.id">
              <td>{{ placementName(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.address }}</small></td>
              <td>{{ item.voucher }} vaucherli · {{ item.paid }} pullik</td>
              <td>{{ fmtDate(item.effectiveFrom) }}</td>
              <td><strong>{{ item.approvedAt ? 'Tasdiqlangan' : item.rejectedAt ? 'Rad etilgan' : 'Tasdiq kutilmoqda' }}</strong><small>{{ item.approvedBy || item.rejectedBy || item.createdBy }}</small></td>
              <td>
                <div v-if="!readOnly && isPendingPassport(item) && actor.curator" class="desk-filter inline">
                  <button type="button" class="text-link" :disabled="busy || readOnly" @click="emit('change', draft => decidePassport(draft, actor, item.id, true))">Tasdiqlash</button>
                  <button type="button" class="text-link" :disabled="busy || readOnly" @click="emit('change', draft => decidePassport(draft, actor, item.id, false))">Rad etish</button>
                </div>
              </td>
            </tr>
            <tr v-if="!passportList.result.totalCount"><td colspan="5" class="empty-desk">Pasportlar topilmadi.</td></tr>
          </tbody>
        </table></div>
      </RegistryList>
    </section>
</template>

<style scoped src="./style.css"></style>
<style scoped src="./attendance.css"></style>
