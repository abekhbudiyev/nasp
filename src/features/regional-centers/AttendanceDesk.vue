<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Fingerprint, History, ScanFace, ShieldCheck } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import {
  canUseAct, dailyVisits, decidePassport, draftPassport, fundingLabels, isPendingPassport,
  quotaRows, recordConfirmation, verificationLabels,
} from './attendance'
import type { Confirmation, DailyVisit, Funding, RegionalActor } from './attendance'
import { centerFor, isOperational, serviceName, today } from './model'
import type { CenterState, Placement } from './model'
import { modulePath } from './config'

const props = defineProps<{
  mode: 'visits' | 'passports'
  state: CenterState
  placements: Placement[]
  actor: RegionalActor
  busy: boolean
  readOnly: boolean
  referralId?: string
  rangeStart?: string
  rangeEnd?: string
}>()
const emit = defineEmits<{ change: [mutation: (draft: CenterState) => void] }>()

const current = today()
const mode = ref<'existing' | 'direct'>('existing')
const who = ref('')
const logDate = ref(current)
const expanded = ref<string>()
const showPassport = ref(false)
const form = reactive<Confirmation>({
  referralId: '', placementId: '', beneficiary: '', residence: '', funding: 'voucher',
  date: current, minutes: 60, evidence: '', verification: 'face-id', confirmedBy: 'beneficiary',
  reason: '', voucherRef: '',
})
const passport = reactive({ placementId: '', voucher: 0, paid: 0, effectiveFrom: current })
const fmtDate = (value: string) => value.split('-').reverse().join('.')
const placementIds = computed(() => new Set(props.placements.map(item => item.id)))
const dayRows = computed(() => dailyVisits(props.state).filter(item => placementIds.value.has(item.placementId)))
const filteredLog = computed(() => dayRows.value.filter(item => (logDate.value ? item.date === logDate.value
  : (!props.rangeStart || item.date >= props.rangeStart) && (!props.rangeEnd || item.date <= props.rangeEnd))
  && (!who.value.trim() || item.beneficiary.includes(who.value.trim().toUpperCase())))
  .sort((first, second) => second.date.localeCompare(first.date) || second.confirmations.length - first.confirmations.length))
const quotas = computed(() => quotaRows(props.state, props.placements, dayRows.value, logDate.value || current))
const passportHistory = computed(() => props.state.passports.filter(item => placementIds.value.has(item.placementId))
  .slice().reverse().sort((a, b) => Number(isPendingPassport(b)) - Number(isPendingPassport(a))))
const ready = computed(() => props.placements.filter(item => isOperational(props.state, item, form.date)))
const matches = computed(() => props.state.referrals.filter(item => item.status === 'active'
  && ready.value.some(placement => placement.id === item.placementId)
  && item.beneficiary.includes(form.beneficiary.trim().toUpperCase())))
const selected = computed(() => matches.value.find(item => item.id === form.referralId))
const service = computed(() => props.state.placements.find(item => item.id === (selected.value?.placementId ?? form.placementId)))
const effectiveFunding = computed<Funding>(() => mode.value === 'direct' || selected.value?.funding === 'paid' ? 'paid' : 'voucher')

watch(() => props.referralId, (id) => {
  const item = props.state.referrals.find(entry => entry.id === id)
  if (!item) return
  mode.value = 'existing'
  form.beneficiary = item.beneficiary
  form.referralId = item.id
}, { immediate: true })

watch(() => [props.rangeStart, props.rangeEnd], ([from, to]) => {
  logDate.value = from || to ? '' : current
}, { immediate: true })

watch(() => [mode.value, form.referralId, form.placementId], () => {
  form.verification = 'face-id'
  form.voucherRef = selected.value?.voucherRef ?? ''
}, { immediate: true })

watch(() => props.state, (state) => {
  if (form.evidence && state.visits.some(item => item.evidence === form.evidence)) {
    form.evidence = ''
    form.reason = ''
  }
  if (showPassport.value && state.passports.some(item => item.placementId === passport.placementId && isPendingPassport(item))) showPassport.value = false
})

function placementName(id: string) {
  const item = props.state.placements.find(place => place.id === id)
  if (!item) return '—'
  const room = props.state.rooms.find(row => row.id === item.roomId)
  return `${serviceName(item.serviceId)} · ${room?.name ?? '—'}`
}

function providerName(item: Placement) {
  return item.operator === 'center' ? 'Hududiy markaz'
    : props.state.providers.find(provider => provider.id === item.providerId)?.name ?? 'Ko‘rsatuvchi tanlanmoqda'
}

function saveVisit() {
  if (mode.value === 'existing' && !selected.value) {
    emit('change', () => { throw new Error('Demo kodiga mos faol xizmatni tanlang.') })
    return
  }
  const entry = {
    ...form, funding: effectiveFunding.value,
    referralId: mode.value === 'direct' ? '' : form.referralId,
    minutes: Number(form.minutes),
  }
  emit('change', (draft) => recordConfirmation(draft, props.actor, entry))
  logDate.value = form.date
}

function savePassport() {
  const values = { ...passport, voucher: Number(passport.voucher), paid: Number(passport.paid) }
  emit('change', draft => draftPassport(draft, props.actor, values))
}

function startPassport(id = '') {
  const row = quotas.value.find(item => item.placement.id === id)?.passport
  Object.assign(passport, { placementId: id, voucher: row?.voucher ?? 0, paid: row?.paid ?? 0, effectiveFrom: current })
  showPassport.value = true
}

function verifiedLabel(row: DailyVisit) {
  const types = new Set(row.confirmations.map(item => item.verification))
  return [...types].map(type => type ? verificationLabels[type] : 'Avvalgi qayd').join(' / ')
}
</script>

<template>
    <div v-if="props.mode === 'visits'" class="desk-grid">
      <section class="desk-panel register">
        <header><span class="desk-icon"><Fingerprint :size="22" /></span><div><h2>Yangi tashrif tasdig‘i</h2><p>Faol xizmatni toping yoki bevosita pullik tashrifni qayd eting.</p></div></header>
        <div class="desk-switch" role="group" aria-label="Qayd manbasi">
          <button type="button" :aria-pressed="mode === 'existing'" @click="mode = 'existing'">Faol xizmat</button>
          <button type="button" :aria-pressed="mode === 'direct'" @click="mode = 'direct'">Bevosita pullik</button>
        </div>
        <form class="desk-form" @submit.prevent="saveVisit">
          <label class="wide">Xizmat oluvchining demo kodi
            <input v-model.trim="form.beneficiary" placeholder="Masalan, NAM-101" maxlength="24" required>
          </label>
          <label v-if="mode === 'existing'" class="wide">Faol xizmat
            <select v-model="form.referralId" aria-label="Faol xizmat" required>
              <option value="">Xizmatni tanlang</option>
              <option v-for="item in matches" :key="item.id" :value="item.id">{{ item.beneficiary }} · {{ placementName(item.placementId) }}</option>
            </select>
          </label>
          <template v-else>
            <label class="wide">Xizmat joyi
              <select v-model="form.placementId" aria-label="Xizmat joyi" required>
                <option value="">Xizmat joyini tanlang</option>
                <option v-for="item in ready" :key="item.id" :value="item.id">{{ centerFor(state, item.id)?.address }} · {{ placementName(item.id) }}</option>
              </select>
            </label>
            <label class="wide">Yashash hududi <input v-model.trim="form.residence" maxlength="150" required></label>
          </template>
          <label v-if="selected && effectiveFunding === 'voucher'" class="wide">«Inson»dagi vaucher raqami
            <input v-model.trim="form.voucherRef" :readonly="!!selected.voucherRef" maxlength="80" required>
          </label>
          <label>Tashrif sanasi <input v-model="form.date" type="date" :max="current" :min="actor.curator ? undefined : current" required></label>
          <label>Davomiyligi (daqiqa) <input v-model.number="form.minutes" type="number" min="1" max="1440" required></label>
          <label class="wide">Tasdiq turi
            <select v-model="form.verification" aria-label="Tasdiq turi">
              <option value="face-id">Face ID (demo tasdiq)</option>
              <option v-if="service && canUseAct(service.serviceId)" value="act">Elektron dalolatnoma (demo tasdiq)</option>
            </select>
          </label>
          <label class="wide">Tasdiqlovchi
            <select v-model="form.confirmedBy" aria-label="Tasdiqlovchi">
              <option value="beneficiary">Xizmat oluvchi</option><option value="representative">Qonuniy vakil</option>
            </select>
          </label>
          <label class="wide">Tasdiq identifikatori <input v-model.trim="form.evidence" placeholder="NAM-TASDIQ-105" maxlength="80" required></label>
          <label v-if="form.date < current" class="wide">O‘tgan sana uchun sabab <textarea v-model.trim="form.reason" required rows="2" maxlength="500" /></label>
          <div class="desk-submit wide">
            <span v-if="mode === 'direct' || selected" class="funding-chip" :data-funding="effectiveFunding">{{ fundingLabels[effectiveFunding] }}</span>
            <button class="button primary" type="submit" :disabled="busy || readOnly"><ScanFace :size="17" /> Tashrifni saqlash</button>
          </div>
        </form>
      </section>

      <section class="desk-panel">
        <header><span class="desk-icon violet"><History :size="22" /></span><div><h2>Yagona tashriflar reyestri</h2><p>Bir xizmat oluvchi, bir xizmat va bir sana uchun bitta tashrif.</p>
          <p v-if="!logDate && (rangeStart || rangeEnd)">Hisobot davri · {{ rangeStart ? fmtDate(rangeStart) : '—' }} – {{ rangeEnd ? fmtDate(rangeEnd) : '—' }}</p></div></header>
        <div class="desk-filter">
          <label>Reyestr sanasi <input v-model="logDate" type="date" :max="current"></label>
          <label>Demo kod bo‘yicha qidirish <input v-model="who" type="search" placeholder="NAM-…"></label>
        </div>
        <div class="desk-list">
          <article v-for="item in filteredLog" :key="item.id" class="log-row">
            <button class="log-expand" type="button" :aria-expanded="expanded === item.id" @click="expanded = expanded === item.id ? undefined : item.id">
              <span><strong>{{ item.beneficiary }} · {{ serviceName(item.serviceId) }}</strong><small>{{ fmtDate(item.date) }} · {{ centerFor(state, item.placementId)?.address }} · {{ verifiedLabel(item) }}</small></span>
              <span><span class="funding-chip" :data-funding="item.funding">{{ fundingLabels[item.funding] }}</span><small>{{ item.confirmations.length }} ta tasdiq</small></span>
            </button>
            <ul v-if="expanded === item.id" class="confirmation-list">
              <li v-for="event in item.confirmations" :key="event.id">
                <strong>{{ event.evidence }} · {{ event.minutes }} daqiqa</strong>
                <small>{{ event.confirmedBy === 'representative' ? 'Qonuniy vakil' : event.confirmedBy === 'beneficiary' ? 'Xizmat oluvchi' : 'Tasdiqlovchi ko‘rsatilmagan' }} · {{ event.recordedBy || 'Demo manba' }}<template v-if="event.voucherRef"> · {{ event.voucherRef }}</template></small>
                <small v-if="event.recordedAt">{{ new Date(event.recordedAt).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }) }}</small>
                <small v-if="event.reason">Kurator izohi: {{ event.reason }}</small>
              </li>
            </ul>
          </article>
          <p v-if="!filteredLog.length" class="empty-desk">Sana va filtr bo‘yicha tashrif topilmadi.</p>
        </div>
      </section>
    </div>

    <template v-else>
      <section class="desk-panel">
        <header><span class="desk-icon"><ShieldCheck :size="22" /></span><div><h2>Kunlik quvvat va haqiqiy tashriflar</h2><p>Har bir xizmat joyida vaucherli va pullik kvota alohida yuritiladi.</p></div></header>
        <div class="desk-filter">
          <label>Hisobot sanasi <input v-model="logDate" type="date" :max="current"></label>
          <button type="button" class="button primary" :disabled="readOnly" @click="startPassport()">Pasport kiritish</button>
        </div>
        <div v-if="showPassport" class="passport-entry">
          <form class="desk-form" @submit.prevent="savePassport">
            <label class="wide">Xizmat joyi
              <select v-model="passport.placementId" aria-label="Xizmat joyi" required><option value="">Xizmat joyini tanlang</option>
                <option v-for="item in placements" :key="item.id" :value="item.id">{{ centerFor(state, item.id)?.address }} · {{ placementName(item.id) }}</option>
              </select>
            </label>
            <label>Vaucherli kvota <input v-model.number="passport.voucher" type="number" min="0" max="10000" required></label>
            <label>Pullik kvota <input v-model.number="passport.paid" type="number" min="0" max="10000" required></label>
            <label>Amal boshlanishi <input v-model="passport.effectiveFrom" type="date" :min="current" required></label>
            <div class="desk-submit wide">
              <button type="button" class="button" @click="showPassport = false">Yopish</button>
              <button type="submit" class="button primary" :disabled="busy || readOnly">Tasdiqlashga yuborish</button>
            </div>
          </form>
        </div>
        <div class="desk-table">
          <table>
            <thead><tr><th>Markaz va xizmat ko‘rsatuvchi</th><th>Vaucherli tashrif / kvota</th><th>Pullik tashrif / kvota</th><th>Kunlik signal</th><th>Amal</th></tr></thead>
            <tbody>
              <tr v-for="row in quotas" :key="row.placement.id">
                <td><strong>{{ placementName(row.placement.id) }}</strong><small>{{ row.center?.name }} · {{ providerName(row.placement) }}</small></td>
                <td><span class="funding-chip" data-funding="voucher">{{ row.actual.voucher }} / {{ row.passport?.voucher ?? '—' }}</span></td>
                <td><span class="funding-chip" data-funding="paid">{{ row.actual.paid }} / {{ row.passport?.paid ?? '—' }}</span></td>
                <td><small v-for="alert in row.alerts" :key="alert" class="quota-alert">{{ alert }}</small><small v-if="!row.alerts.length">—</small></td>
                <td><button type="button" class="text-link" :disabled="readOnly" @click="startPassport(row.placement.id)">Pasport kiritish</button></td>
              </tr>
              <tr v-if="!quotas.length"><td colspan="5" class="empty-desk">Filtr bo‘yicha faol xizmat joylari yo‘q.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="desk-panel">
        <header><span class="desk-icon violet"><History :size="22" /></span><div><h2>Pasportlar va kurator qarorlari</h2><p>Tasdiqlangan pasportlar sanasi bo‘yicha qo‘llanadi.</p></div></header>
        <div class="desk-table"><table>
          <thead><tr><th>Xizmat joyi</th><th>Kvota</th><th>Amal boshlanishi</th><th>Holat va mas’ul</th><th>Amal</th></tr></thead>
          <tbody>
            <tr v-for="item in passportHistory" :key="item.id">
              <td>{{ placementName(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.address }}</small></td>
              <td>{{ item.voucher }} vaucherli · {{ item.paid }} pullik</td>
              <td>{{ fmtDate(item.effectiveFrom) }}</td>
              <td><strong>{{ item.approvedAt ? 'Tasdiqlangan' : item.rejectedAt ? 'Rad etilgan' : 'Tasdiq kutilmoqda' }}</strong><small>{{ item.approvedBy || item.rejectedBy || item.createdBy }}</small></td>
              <td>
                <div v-if="isPendingPassport(item) && actor.curator" class="desk-filter inline">
                  <button type="button" class="text-link" :disabled="busy || readOnly" @click="emit('change', draft => decidePassport(draft, actor, item.id, true))">Tasdiqlash</button>
                  <button type="button" class="text-link" :disabled="busy || readOnly" @click="emit('change', draft => decidePassport(draft, actor, item.id, false))">Rad etish</button>
                </div>
              </td>
            </tr>
            <tr v-if="!passportHistory.length"><td colspan="5" class="empty-desk">Pasportlar topilmadi.</td></tr>
          </tbody>
        </table></div>
      </section>
      <RouterLink class="text-link" :to="modulePath + '/visits'">Tashriflar reyestrini ochish</RouterLink>
    </template>
</template>

<style scoped src="./style.css"></style>
<style scoped src="./attendance.css"></style>
