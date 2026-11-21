<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import BenefitChannel from './BenefitChannel.vue'
import { data, latin, money, num, organization } from './data'
import { vDialogFocus } from './dialog-focus'
import {
  formatRequestId,
  requestAgencyKeys,
  requestStatusLabels,
  requestTotals,
  usePrototypeRequests,
  type RequestAction,
  type PrototypeRequest,
} from './prototype-requests'

const props = defineProps<{
  initialStatus?: string
  initialRegion?: string
  initialAgency?: string
  requestId?: number
}>()
const emit = defineEmits<{
  passport: [familyId: string, memberId: string, requestId: number]
  cabinet: [familyId: string, memberId: string, requestId: number]
  report: [id: number]
  scope: [selection: { region: string; agency: string; status: string }]
}>()
const { canPerform, events, perform } = usePrototypeRequests()

const actionLabels = {
  check: 'Tekshiruvni yakunlash',
  approve: 'Tasdiqlash',
  deliver: 'Ijroni tasdiqlash',
  return: 'Idoraga qaytarish',
  retry: 'Tuzatib qayta yuborish',
  reject: 'Takroriy deb rad etish',
}
type Action = keyof typeof actionLabels
const availableActions: RequestAction[] = ['check', 'approve', 'deliver', 'reject', 'return', 'retry']
const kindLabels = { payment: 'To‘lov', service: 'Xizmat', benefit: 'Imtiyoz' }
const statusTones: Record<PrototypeRequest['status'], string> = {
  processing: 'blue',
  approved: 'green',
  delivered: 'green',
  duplicate: 'red',
  returned: 'amber',
  waiting: 'purple',
}
const accepted = new Set(['approved', 'waiting', 'delivered'])
const filter = ref('all')
const region = ref('')
const agency = ref('')
const kind = ref('')
const query = ref('')
const sort = ref('id')
const pageSize = 10
const page = ref(1)
const selectedId = ref<number>()
const pendingAction = ref<'return' | 'retry' | 'reject'>()
const note = ref('')
const result = ref('')
const heading = ref<HTMLElement>()
const noteInput = ref<HTMLTextAreaElement>()
const resultLine = ref<HTMLElement>()

const statusLabel = (status: string) => status === 'accepted' ? 'Barcha tasdiqlanganlar'
  : requestStatusLabels[status as PrototypeRequest['status']] ?? 'Barcha holatlar'

const scoped = computed(() => events.value.filter(request =>
  (!region.value || request.region === Number(region.value)) &&
  (!agency.value || requestAgencyKeys[request.agency] === agency.value) &&
  (!kind.value || request.kind === kind.value),
))
const normalize = (value: string) => latin(value.normalize('NFC')).toLowerCase().replace(/[‘’ʻʼ'`]/g, '').trim()
const filtered = computed(() => {
  const term = normalize(query.value)
  return scoped.value.filter(request =>
    (filter.value === 'all' || request.status === filter.value || (filter.value === 'accepted' && accepted.has(request.status))) &&
    (!term || String(request.id) === term ||
      normalize(formatRequestId(request.id) + ' ' + request.measure).includes(term)),
  ).sort((a, b) => sort.value === 'amount' ? b.amount - a.amount || b.id - a.id : b.id - a.id)
})
const deliveredAmount = computed(() => requestTotals(filtered.value).deliveredAmount)
const maxPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const selected = computed(() => events.value.find(request => request.id === selectedId.value))
const related = computed(() => events.value.find(request => request.id === selected.value?.relatedRequestId))
const actions = computed<Action[]>(() => {
  const request = selected.value
  return request ? availableActions.filter(action => canPerform(request, action)) : []
})
const dateTime = new Intl.DateTimeFormat('uz-UZ', {
  dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Tashkent',
})
const formatTime = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : dateTime.format(date)
}

watch(() => props.initialStatus, value => {
  filter.value = value && (value === 'accepted' || Object.keys(requestStatusLabels).includes(value)) ? value : 'all'
}, { immediate: true })
watch(() => props.initialRegion, value => { region.value = value || '' }, { immediate: true })
watch(() => props.initialAgency, value => { agency.value = value || '' }, { immediate: true })
watch(() => props.requestId, value => {
  if (value !== undefined) openRequest(value)
}, { immediate: true })
watch([region, agency, kind, filter, query, sort], () => { page.value = 1 })
watch(maxPage, value => { page.value = Math.min(page.value, value) })

function selectStatus(status?: string) {
  filter.value = status || 'all'
  page.value = 1
  publishScope()
  nextTick(() => heading.value?.focus())
}

function publishScope() {
  nextTick(() => emit('scope', { region: region.value, agency: agency.value, status: filter.value }))
}

function openRequest(id: number) {
  selectedId.value = id
  pendingAction.value = undefined
  result.value = ''
}

function closeRequest() {
  selectedId.value = undefined
  pendingAction.value = undefined
  result.value = ''
}

function chooseAction(action: Action) {
  if (action === 'return' || action === 'retry' || action === 'reject') {
    pendingAction.value = action
    note.value = ''
    nextTick(() => noteInput.value?.focus())
    return
  }
  applyAction(action)
}

function applyAction(action: Action) {
  if (selectedId.value === undefined) return
  const successful = perform(selectedId.value, action, note.value.trim() || undefined)
  result.value = successful ? 'So‘rov holati yangilandi.' : 'Bu amal joriy holatda bajarilmadi.'
  pendingAction.value = undefined
  note.value = ''
  nextTick(() => resultLine.value?.focus({ preventScroll: true }))
}

</script>

<template>
  <section class="operations">
    <Teleport defer to="#support-filter-fields">
      <label>
        {{ benefitText('So‘rov qidiruvi') }}
        <input v-model="query" :placeholder="benefitText('So‘rov kodi yoki chora nomi')" type="search">
      </label>
      <label>
        {{ benefitText('Hudud') }}
        <select v-model="region" @change="publishScope">
          <option value="">{{ benefitText('Respublika') }}</option>
          <option v-for="(name, index) in data.regions" :key="index" :value="String(index)">
            {{ benefitText(name) }}
          </option>
        </select>
      </label>
      <label>
        {{ benefitText('Idora') }}
        <select v-model="agency" @change="publishScope">
          <option value="">{{ benefitText('Barcha idoralar') }}</option>
          <option v-for="key in requestAgencyKeys" :key="key" :value="key">
            {{ benefitText(organization(key)) }}
          </option>
        </select>
      </label>
      <label>
        {{ benefitText('Chora turi') }}
        <select v-model="kind">
          <option value="">{{ benefitText('Barcha turlar') }}</option>
          <option v-for="(label, key) in kindLabels" :key="key" :value="key">{{ benefitText(label) }}</option>
        </select>
      </label>
      <label>
        {{ benefitText('So‘rov holati') }}
        <select v-model="filter" @change="publishScope">
          <option value="all">{{ benefitText('Barcha holatlar') }}</option>
          <option value="accepted">{{ benefitText(statusLabel('accepted')) }}</option>
          <option v-for="(label, key) in requestStatusLabels" :key="key" :value="key">
            {{ benefitText(label) }}
          </option>
        </select>
      </label>
      <label>
        {{ benefitText('Saralash') }}
        <select v-model="sort">
          <option value="id">{{ benefitText('So‘rov kodi bo‘yicha') }}</option>
          <option value="amount">{{ benefitText('Eng katta summa avval') }}</option>
        </select>
      </label>
    </Teleport>

    <BenefitChannel :requests="scoped" :active-status="filter" @open="selectStatus" />

    <section class="np-card requests">
      <div class="request-heading">
        <div>
          <h2 ref="heading" tabindex="-1">{{ benefitText('So‘rovlar ro‘yxati') }}</h2>
          <p>
            {{ benefitText(statusLabel(filter)) }} ·
            {{ num(filtered.length) }} {{ benefitText('ta so‘rov') }}
          </p>
        </div>
        <div class="paid-total">
          <span>{{ benefitText('Ro‘yxatdagi ijro summasi') }}</span>
          <strong>{{ benefitText(money(deliveredAmount)) }} {{ benefitText('so‘m') }}</strong>
        </div>
      </div>
      <div class="np-table-wrap">
        <table class="np-table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col">{{ benefitText('So‘rov') }}</th>
              <th scope="col">{{ benefitText('Idora va hudud') }}</th>
              <th scope="col">{{ benefitText('Chora') }}</th>
              <th scope="col">{{ benefitText('Summa, so‘m') }}</th>
              <th scope="col">{{ benefitText('Holat') }}</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr v-for="request in visible" :key="request.id" role="row">
              <td role="cell">
                <button class="request-link" type="button" @click="openRequest(request.id)">
                  {{ formatRequestId(request.id) }} <ArrowUpRight :size="13" aria-hidden="true" />
                </button>
              </td>
              <td role="cell">
                {{ benefitText(organization(requestAgencyKeys[request.agency] ?? '')) }}
                <small>{{ benefitText(data.regions[request.region]) }}</small>
              </td>
              <td role="cell">{{ benefitText(request.measure) }}</td>
              <td role="cell" class="request-amount">
                {{ request.amount ? num(request.amount) : '—' }}
                <span v-if="request.amount" class="mobile-unit">{{ benefitText('so‘m') }}</span>
              </td>
              <td role="cell"><span class="np-tag" :class="statusTones[request.status]">{{ benefitText(statusLabel(request.status)) }}</span></td>
            </tr>
            <tr v-if="!visible.length"><td colspan="5">{{ benefitText('Tanlangan kesimda so‘rov topilmadi.') }}</td></tr>
          </tbody>
        </table>
      </div>
      <footer v-if="maxPage > 1" class="request-footer">
        <nav class="np-pagination" :aria-label="benefitText('So‘rovlar sahifalari')">
          <button class="np-button" type="button" :disabled="page === 1"
            :aria-label="benefitText('Oldingi sahifa')" @click="page--"><ChevronLeft :size="16" aria-hidden="true" /></button>
          <span>{{ page }} / {{ maxPage }}</span>
          <button class="np-button" type="button" :disabled="page === maxPage"
            :aria-label="benefitText('Keyingi sahifa')" @click="page++"><ChevronRight :size="16" aria-hidden="true" /></button>
        </nav>
      </footer>
    </section>

    <div v-if="selected" class="np-overlay" @click.self="closeRequest">
      <section v-dialog-focus class="np-dialog request-drawer" role="dialog" aria-modal="true"
        aria-labelledby="request-drawer-title" @keydown.esc.stop="closeRequest">
        <header>
          <div>
            <h2 id="request-drawer-title">{{ formatRequestId(selected.id) }}</h2>
            <span class="np-tag" :class="statusTones[selected.status]">{{ benefitText(statusLabel(selected.status)) }}</span>
          </div>
          <button class="np-button" type="button" :aria-label="benefitText('Yopish')" @click="closeRequest"><X :size="18" /></button>
        </header>
        <dl class="request-details">
          <dt>{{ benefitText('Idora') }}</dt>
          <dd>{{ benefitText(organization(requestAgencyKeys[selected.agency] ?? '')) }}</dd>
          <dt>{{ benefitText('Hudud') }}</dt>
          <dd>{{ benefitText(data.regions[selected.region]) }}</dd>
          <dt>{{ benefitText('Chora') }}</dt>
          <dd>{{ benefitText(selected.measure) }}</dd>
          <dt>{{ benefitText('Turi') }}</dt>
          <dd>{{ benefitText(kindLabels[selected.kind]) }}</dd>
          <dt v-if="selected.amount">{{ benefitText('Summa') }}</dt>
          <dd v-if="selected.amount">{{ num(selected.amount) }} {{ benefitText('so‘m') }}</dd>
        </dl>

        <section v-if="related" class="request-evidence">
          <h3>{{ benefitText('Bog‘langan so‘rov') }}</h3>
          <p>{{ benefitText('Ayni fuqaro va chora bo‘yicha avvalgi yozuv') }}</p>
          <p>
            <strong>{{ formatRequestId(related.id) }}</strong> ·
            {{ benefitText(related.measure) }} · {{ benefitText(statusLabel(related.status)) }}
            <template v-if="related.amount"> · {{ num(related.amount) }} {{ benefitText('so‘m') }}</template>
          </p>
        </section>

        <form v-if="pendingAction" class="request-form" @submit.prevent="applyAction(pendingAction)">
          <label>
            {{ benefitText(pendingAction === 'retry' ? 'Tuzatilgan ma’lumot' : 'Qaror sababi') }}
            <textarea ref="noteInput" v-model="note" required rows="3" maxlength="300" />
          </label>
          <div class="request-actions">
            <button class="np-button primary" type="submit" :disabled="!note.trim()">
              {{ benefitText(actionLabels[pendingAction]) }}
            </button>
            <button class="np-button" type="button" @click="pendingAction = undefined">{{ benefitText('Bekor qilish') }}</button>
          </div>
        </form>
        <div v-else-if="actions.length" class="request-actions">
          <button v-for="(action, index) in actions" :key="action" type="button"
            class="np-button" :class="{ primary: index === 0 }" @click="chooseAction(action)">
            {{ benefitText(actionLabels[action]) }}
          </button>
        </div>
        <p v-if="result" ref="resultLine" tabindex="-1" role="status" class="request-result">{{ benefitText(result) }}</p>
        <div v-if="selected.familyId && selected.memberId" class="request-actions">
          <button class="np-button" type="button" @click="emit('passport', selected.familyId, selected.memberId, selected.id)">
            {{ benefitText('Fuqaro pasporti') }} <ArrowUpRight :size="14" aria-hidden="true" />
          </button>
          <button v-if="selected.status === 'delivered'" class="np-button" type="button"
            @click="emit('cabinet', selected.familyId, selected.memberId, selected.id)">
            {{ benefitText('Fuqaro kabineti') }} <ArrowUpRight :size="14" aria-hidden="true" />
          </button>
          <button class="np-button" type="button" @click="emit('report', selected.id)">
            {{ benefitText('Hisobotdagi yozuv') }} <ArrowUpRight :size="14" aria-hidden="true" />
          </button>
        </div>

        <section class="request-history">
          <h3>{{ benefitText('So‘rov tarixi') }}</h3>
          <ol>
            <li v-for="(entry, index) in selected.history" :key="index">
              <div><strong>{{ benefitText(entry.label) }}</strong> <time :datetime="entry.at">{{ formatTime(entry.at) }}</time></div>
              <p v-if="entry.note">{{ benefitText(entry.note) }}</p>
            </li>
          </ol>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped>
.operations { display: grid; gap: 20px; min-width: 0; }
.requests { container-type: inline-size; min-width: 0; }
.request-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.request-heading h2, .request-drawer h2 { font-size: 19px; font-weight: 720; }
.request-heading h2:focus { outline: none; }
.request-heading p, .paid-total span { color: var(--muted-foreground); font-size: 12px; }
.paid-total { display: grid; gap: 4px; }
.paid-total strong { font-size: 18px; font-weight: 710; color: var(--np-green); }
.request-link { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; font-weight: 700; color: var(--primary); }
.request-link:hover { text-decoration: underline; }
.request-amount { white-space: nowrap; font-variant-numeric: tabular-nums; }
.mobile-unit { display: none; }
.request-footer { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-top: 14px; }
.request-drawer > header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.request-drawer h2 { margin-bottom: 8px; }
.request-details {
  display: grid;
  grid-template-columns: minmax(90px, .36fr) 1fr;
  gap: 12px;
  margin: 18px 0;
  font-size: 13px;
}
.request-details dt { color: var(--muted-foreground); }
.request-details dd { margin: 0; font-weight: 620; }
.request-evidence { padding: 14px; border: 1px solid var(--border); border-inline-start: 3px solid var(--np-amber); border-radius: 10px; }
.request-evidence h3, .request-history h3 { margin-bottom: 8px; font-size: 15px; font-weight: 700; }
.request-evidence p { margin: 4px 0; font-size: 13px; }
.request-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.request-result { margin-top: 12px; font-size: 13px; }
.request-form { margin-top: 14px; }
.request-form label { display: grid; gap: 8px; font-size: 13px; font-weight: 650; }
.request-form textarea { width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); color: var(--foreground); }
.request-history { margin-top: 22px; }
.request-history ol { padding-inline-start: 18px; list-style: disc; }
.request-history li { margin-bottom: 10px; padding-inline-start: 6px; font-size: 13px; }
.request-history li > div { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; }
.request-history time, .request-history p { color: var(--muted-foreground); }
.request-history p { margin-top: 5px; }
@media (max-width: 540px) {
  .requests { padding: 14px; }
  .request-details { grid-template-columns: minmax(62px, .31fr) 1fr; gap: 8px; }
}
@container (max-width: 590px) {
  .np-table, .np-table tbody { display: block; min-width: 0; }
  .np-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
  .np-table tbody tr {
    display: grid;
    grid-template-columns: minmax(80px, 1fr) auto;
    align-items: baseline;
    gap: 4px 8px;
    padding: 12px;
    border-bottom: 1px solid var(--border);
  }
  .np-table tbody tr:last-child { border-bottom: 0; }
  .np-table tbody td { min-width: 0; padding: 0; border: 0; }
  .np-table tbody td:nth-child(2) { grid-area: 2 / 1 / auto / -1; }
  .np-table tbody td:nth-child(3) { grid-area: 3 / 1 / auto / -1; }
  .np-table tbody td:nth-child(4) { grid-area: 1 / 2; text-align: end; }
  .np-table tbody td:nth-child(5), .np-table tbody td[colspan] { grid-column: 1 / -1; }
  .np-table tbody td:nth-child(5) { margin-top: 4px; }
  .mobile-unit { display: inline; }
}
</style>
