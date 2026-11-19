<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Activity, Building2, ClipboardCheck, Clock3, Download,
  Fingerprint, Info, Layers3, Plus, UsersRound, Wallet,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { modulePath, regionalCenterPages } from './config'
import type { RegionalCenterPage } from './config'
import { applyEditor, hasCompetition } from './actions'
import type { Editor } from './actions'
import AttendanceDesk from './AttendanceDesk.vue'
import LeadershipDashboard from './LeadershipDashboard.vue'
import { dailyVisits, quotaRows } from './attendance'
import { createDemoData } from './demo'
import {
  centerFor, financeKinds, financeLabels, findingKinds, isOperational, leaseStartDeadline, outcomeLabels,
  providerLabels, queueFor, referralLabels, relativeDate, reviewReferral, seatsUsed, serviceName,
  services, startReferral, today, workingDayDeadline,
} from './model'
import type {
  CenterState, FinanceRecord, Placement, ReferralStatus,
} from './model'
import { changeState, loadState, regionalCenterStorageKey } from './storage'

const props = defineProps<{ pageKey: RegionalCenterPage }>()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const page = computed(() => regionalCenterPages.find(item => item.key === props.pageKey)!)
const state = shallowRef<CenterState>(createDemoData())
const notice = ref('')
const error = ref('')
const readError = ref(false)
const saving = ref(false)
const search = ref('')
const statusFilter = ref<ReferralStatus | ''>('')
const overviewFiltersOpen = ref(false)
const date = today()
const from = ref(relativeDate(date, -13))
const to = ref(date)
const actor = computed(() => ({
  name: auth.currentUser?.role ?? 'Demo foydalanuvchi',
  curator: auth.hasPermission('regional-centers.curate'),
}))

function selectPeriod(days: number) {
  from.value = relativeDate(date, 1 - days)
  to.value = date
}

function refreshState() {
  try {
    state.value = loadState()
    if (readError.value) error.value = ''
    readError.value = false
  } catch {
    readError.value = true
    error.value = 'Brauzer xotirasidagi yozuvlarni o‘qib bo‘lmadi.'
  }
}

function onStorageChange(event: StorageEvent) {
  if (event.key === regionalCenterStorageKey || event.key === null) refreshState()
}

refreshState()
onMounted(() => window.addEventListener('storage', onStorageChange))
onUnmounted(() => window.removeEventListener('storage', onStorageChange))

const centerFilter = computed(() => typeof route.query.center === 'string' ? route.query.center : '')
const serviceFilter = computed(() => typeof route.query.service === 'string' ? route.query.service : '')
const regionFilter = computed(() => typeof route.query.region === 'string' ? route.query.region : '')
const regions = computed(() => [...new Set(state.value.centers.map(item => item.region))].sort())
const regionCenters = computed(() => state.value.centers.filter(item => !regionFilter.value || item.region === regionFilter.value))

function filterBy(key: 'center' | 'service' | 'region', value: string) {
  const query = { ...route.query, [key]: value || undefined }
  if (key === 'region') delete query.center
  void router.replace({ query })
}

function location(path: string, filters: Record<string, string> = {}) {
  const { from, to, referral, ...scope } = route.query
  return { path: modulePath + path, query: { ...scope, ...filters } }
}

const centers = computed(() => regionCenters.value.filter(c => !centerFilter.value || c.id === centerFilter.value))
const centerIds = computed(() => new Set(centers.value.map(item => item.id)))
const rooms = computed(() => state.value.rooms.filter(room => centerIds.value.has(room.centerId)))
const placements = computed(() => state.value.placements.filter(item =>
  rooms.value.some(room => room.id === item.roomId) && (!serviceFilter.value || item.serviceId === serviceFilter.value)))
const placementIds = computed(() => new Set(placements.value.map(item => item.id)))
const activePlacements = computed(() => placements.value.filter(item => isOperational(state.value, item, date)))
const providers = computed(() => state.value.providers.filter(item => placementIds.value.has(item.placementId)))
const referrals = computed(() => state.value.referrals.filter(item => placementIds.value.has(item.placementId)))
const visibleReferrals = computed(() => referrals.value.filter(item => {
  const query = search.value.trim().toLocaleLowerCase()
  return (!statusFilter.value || item.status === statusFilter.value)
    && (!query || [item.beneficiary, item.residence, item.issuer, item.reference, item.channel].some(value => value.toLocaleLowerCase().includes(query)))
}))
const referralIds = computed(() => new Set(referrals.value.map(item => item.id)))
const visits = computed(() => state.value.visits.filter(item => referralIds.value.has(item.referralId)))
const findings = computed(() => state.value.findings.filter(item => placementIds.value.has(item.placementId)))
const visitIds = computed(() => new Set(visits.value.map(item => item.id)))
const finance = computed(() => state.value.finance.filter(item => visitIds.value.has(item.visitId)))
const formattedNumber = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })
const number = (value: number) => formattedNumber.format(value)
const money = (value: number) => `${number(value)} so‘m`
const displayDate = (value: string) => value ? value.split('-').reverse().join('.') : '—'
const withinPeriod = (value: string) => (!from.value || value >= from.value) && (!to.value || value <= to.value)
const visibleDays = computed(() => dailyVisits(state.value).filter(item => placementIds.value.has(item.placementId)))
const periodDays = computed(() => visibleDays.value.filter(item => withinPeriod(item.date)))
const currentDays = computed(() => visibleDays.value.filter(item => item.date === date))
const todayFunding = computed(() => currentDays.value.reduce((sum, item) => {
  sum[item.funding]++
  return sum
}, { voucher: 0, paid: 0, unknown: 0 }))
const quotaReport = computed(() => quotaRows(state.value, placements.value, visibleDays.value, date))
const periodVisits = computed(() => visits.value.filter(item => withinPeriod(item.date)))
const periodFindings = computed(() => findings.value.filter(item => withinPeriod(item.date)))
const periodFinance = computed(() => {
  const periodVisitIds = new Set(periodVisits.value.map(item => item.id))
  return finance.value.filter(item => periodVisitIds.has(item.visitId))
})
const visited = computed(() => new Set(periodDays.value.map(item => item.beneficiary)))
const openFindings = computed(() => findings.value.filter(item => item.status === 'open'))
const scores = computed(() => periodFindings.value.flatMap(item => item.score === undefined ? [] : [item.score]))
const satisfaction = computed(() => scores.value.length ? `${number(scores.value.reduce((sum, score) => sum + score, 0) / scores.value.length)} / 5` : '—')
const capacity = computed(() => activePlacements.value.reduce((sum, item) => sum + item.capacity, 0))
const seats = computed(() => activePlacements.value.reduce((sum, item) => sum + seatsUsed(state.value, item.id), 0))
const overviewRows = computed(() => placements.value.map(item => {
  const used = seatsUsed(state.value, item.id)
  const active = isOperational(state.value, item, date)
  const count = periodDays.value.filter(visit => visit.placementId === item.id).length
  const queued = referrals.value.filter(referral => referral.placementId === item.id && referral.status === 'queued').length
  return { item, used, active, count, queued }
}))
const summary = computed(() => [
  { title: 'Faol markazlar', value: number(centers.value.filter(item => item.status === 'active'
    && (!serviceFilter.value || activePlacements.value.some(place => centerFor(state.value, place.id)?.id === item.id))).length),
    icon: Building2, path: '/centers', tone: 'blue', hint: `${activePlacements.value.length} ta faol xizmat joyi` },
  { title: 'Bugungi tashriflar', value: number(currentDays.value.length), icon: Fingerprint, path: '/visits', tone: 'purple',
    hint: `${todayFunding.value.voucher} vaucherli · ${todayFunding.value.paid} pullik${todayFunding.value.unknown ? ' · ' + todayFunding.value.unknown + ' aniqlanmagan' : ''}` },
  { title: 'Xizmat oluvchilar', value: number(visited.value.size), icon: UsersRound, path: '/visits', tone: 'mint',
    hint: `Davrda ${periodDays.value.length} ta tashrif`, period: true },
  { title: 'Navbatdagi yo‘llanmalar', value: number(referrals.value.filter(item => item.status === 'queued').length), icon: Clock3, path: '/referrals', tone: 'amber',
    hint: `${referrals.value.filter(item => item.status === 'new').length} ta yangi murojaat` },
  { title: 'Yo‘llanma uchun bo‘sh o‘rin', value: number(Math.max(0, capacity.value - seats.value)), icon: Layers3, path: '/services', tone: 'blue',
    hint: `${seats.value} band / ${capacity.value} o‘rin` },
  { title: 'Ochiq kamchiliklar', value: number(openFindings.value.length), icon: ClipboardCheck, path: '/quality', tone: 'rose',
    hint: `${openFindings.value.filter(item => item.due < date).length} ta muddati o‘tgan` },
  { title: 'Qoniqish bahosi', value: satisfaction.value, icon: Activity, path: '/quality', tone: 'mint', hint: `Davrda ${scores.value.length} ta baho` },
  { title: 'To‘langan summa', value: money(totals('paid', periodFinance.value)), icon: Wallet, path: '/finance', tone: 'purple',
    hint: `Davr tashriflariga bog‘liq ${periodFinance.value.filter(item => item.status === 'paid').length} ta qayd` },
])
const outcomes = computed(() => referrals.value.filter(item => item.status === 'closed'
  && withinPeriod(item.history[item.history.length - 1]?.date ?? item.created)).length)
const waitingDays = computed(() => {
  const durations = referrals.value.flatMap(referral => {
    const firstVisit = periodVisits.value.filter(visit => visit.referralId === referral.id).sort((a, b) => a.date.localeCompare(b.date))[0]
    const everFirst = visits.value.filter(visit => visit.referralId === referral.id).sort((a, b) => a.date.localeCompare(b.date))[0]
    return firstVisit && firstVisit.id === everFirst?.id ? [(Date.parse(firstVisit.date) - Date.parse(referral.created)) / 86_400_000] : []
  })
  return durations.length ? `${number(durations.reduce((sum, days) => sum + days, 0) / durations.length)} kun` : '—'
})

function roomById(id: string) {
  return state.value.rooms.find(item => item.id === id)
}

function referralById(id: string) {
  return state.value.referrals.find(item => item.id === id)
}

function placementLabel(id: string) {
  const item = state.value.placements.find(placement => placement.id === id)
  return item ? `${serviceName(item.serviceId)} · ${roomById(item.roomId)?.name ?? '—'}` : '—'
}

function providerName(item: Placement) {
  if (item.operator === 'center') return 'Hududiy markaz'
  return state.value.providers.find(provider => provider.id === item.providerId)?.name ?? 'Ko‘rsatuvchi tanlanmoqda'
}

function totals(kind: FinanceRecord['status'], records = finance.value) {
  return records.filter(item => item.status === kind).reduce((sum, item) => sum + item.amount, 0)
}

async function exportOverview() {
  try {
    const { utils, writeFile } = await import('xlsx')
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, utils.aoa_to_sheet([
      ['Hududiy markazlar monitoringi · demo', date],
      ['Davr boshi', from.value || 'Barcha davrlar', 'Davr oxiri', to.value || 'Barcha davrlar'],
      ...summary.value.map(item => [item.title, item.value, item.hint]),
      ['Birinchi xizmatgacha', waitingDays.value],
      ['Yakunlangan rejalar', outcomes.value],
      ...Object.entries(financeLabels).map(([kind, label]) => [label, totals(kind as FinanceRecord['status'], periodFinance.value), 'so‘m']),
      [],
      ['Markaz', 'Xizmat', 'Xona', 'Quvvat', 'Band', 'Navbat', 'Yagona tashriflar', 'Xizmat holati'],
      ...overviewRows.value.map(({ item, used, queued, count, active }) => [
        centerFor(state.value, item.id)?.name, serviceName(item.serviceId), roomById(item.roomId)?.name,
        item.capacity, used, queued, count, active ? 'Faol' : 'Faol emas',
      ]),
    ]), 'Monitoring')
    utils.book_append_sheet(workbook, utils.aoa_to_sheet([
      ['Kunlik kvota va haqiqiy tashrif', date],
      ['Markaz', 'Xizmat', 'Ko‘rsatuvchi', 'Vaucherli kvota', 'Vaucherli tashrif', 'Pullik kvota', 'Pullik tashrif', 'Signal'],
      ...quotaReport.value.map(row => [row.center?.name, serviceName(row.placement.serviceId), providerName(row.placement),
        row.passport?.voucher, row.actual.voucher, row.passport?.paid, row.actual.paid, row.alerts.join(' · ')]),
    ]), 'Kunlik kvota')
    writeFile(workbook, 'hududiy-markazlar-monitoringi-demo.xlsx')
  } catch {
    error.value = 'Hisobot faylini yaratib bo‘lmadi.'
  }
}

const editorTitles: Record<Editor, string> = {
  center: 'Markaz pasporti', room: 'Xona kartasi', staff: 'Xodim kartasi', placement: 'Xizmat joyi',
  provider: 'Talabgor so‘rovnomasi', decision: 'Talabgor bo‘yicha qaror', lease: 'Ijara shartnomasi',
  referral: 'Yangi murojaat', plan: 'Individual reja', reject: 'Rad etish', close: 'Xizmat natijasi',
  finding: 'Sifat nazorati qaydi', resolve: 'Bajarilgan chora', finance: 'Moliyaviy qayd',
}
type Field = {
  key: string
  label: string
  type?: 'date' | 'number' | 'textarea' | 'select'
  options?: { id: string; title: string }[]
  optional?: boolean
  min?: number
  max?: number
}
const editor = ref<Editor>()
const target = ref('')
const fields = ref<Field[]>([])
const values = ref<Record<string, string>>({})
const formError = ref('')
const dialog = ref<HTMLDialogElement>()
const funding = computed(() => values.value.funding)
const selected = ref<string>()
const selectedReferral = computed(() => referralById(selected.value ?? ''))
const shownFields = computed(() => fields.value.filter(field => {
  if (editor.value === 'finding') {
    if (field.key === 'score') return values.value.kind === 'feedback'
    if (field.key === 'due') return values.value.kind !== 'feedback'
  }
  if (editor.value === 'referral' && field.key === 'issuer') return funding.value === 'preferential'
  return true
}))
const options = (items: Record<string, string>) => Object.entries(items).map(([id, title]) => ({ id, title }))
const choices = (key: string, label: string, items: { id: string; title: string }[]): Field =>
  ({ key, label, type: 'select', options: items })
const input = (key: string, label: string, type?: Field['type'], optional?: boolean): Field =>
  ({ key, label, type, optional })
const placementChoices = (items: Placement[]) => items.map(item => ({
  id: item.id, title: `${centerFor(state.value, item.id)?.name} · ${placementLabel(item.id)}`,
}))

const action = computed(() => {
  switch (props.pageKey) {
    case 'centers': return { editor: 'center' as const, label: 'Markaz qo‘shish' }
    case 'services': return { editor: 'placement' as const, label: 'Xizmat joyi qo‘shish' }
    case 'providers': return { editor: 'provider' as const, label: 'Talabgor qo‘shish' }
    case 'referrals': return { editor: 'referral' as const, label: 'Murojaat qo‘shish' }
    case 'quality': return { editor: 'finding' as const, label: 'Qayd qo‘shish' }
    case 'finance': return { editor: 'finance' as const, label: 'Moliyaviy qayd qo‘shish' }
    default: return undefined
  }
})

async function openEditor(kind: Editor, id = '') {
  if (saving.value || readError.value) return
  target.value = id
  formError.value = ''
  editor.value = kind
  const data = state.value
  let defaults: Record<string, string> = {}
  switch (kind) {
    case 'center': {
      const item = data.centers.find(row => row.id === id)
      fields.value = [
        input('name', 'Markaz nomi'), input('region', 'Viloyat / shahar'), input('address', 'Manzil'),
        input('director', 'Mas’ul lavozim yoki demo nomi'), choices('status', 'Holat', options({ active: 'Faol', planned: 'Rejada' })),
      ]
      defaults = item ? { ...item } : { status: 'planned' }
      break
    }
    case 'room': {
      const item = roomById(id)
      fields.value = [
        choices('centerId', 'Markaz', centers.value.map(center => ({ id: center.id, title: center.name }))),
        input('name', 'Xona nomi'), input('equipment', 'Jihozlar', 'textarea', true),
        choices('accessible', 'To‘siqsiz kirish', options({ yes: 'Mavjud', no: 'Moslashtirish kerak' })),
      ]
      defaults = item ? { ...item, accessible: item.accessible ? 'yes' : 'no' } : { centerId: id || centerFilter.value, accessible: 'yes' }
      break
    }
    case 'staff': {
      const item = data.staff.find(row => row.id === id)
      fields.value = [
        choices('centerId', 'Markaz', centers.value.map(center => ({ id: center.id, title: center.name }))),
        input('name', 'Xodimning demo nomi'), input('position', 'Lavozimi'),
        input('qualification', 'Malaka hujjati', undefined, true), input('validUntil', 'Malaka hujjati muddati', 'date', true),
        choices('active', 'Holat', options({ yes: 'Faol', no: 'Faol emas' })),
      ]
      defaults = item ? { ...item, active: item.active ? 'yes' : 'no' } : { centerId: id, active: 'yes' }
      break
    }
    case 'placement': {
      const item = data.placements.find(row => row.id === id)
      fields.value = [
        choices('roomId', 'Xona', rooms.value.map(room => ({
          id: room.id, title: `${data.centers.find(c => c.id === room.centerId)?.name} · ${room.name}`,
        }))),
        choices('serviceId', 'Xizmat', [...services]),
        { ...input('capacity', 'O‘rinlar soni', 'number'), min: 1, max: 10000 },
        input('schedule', 'Ish jadvali'),
        choices('operator', 'Xizmatni kim ko‘rsatadi?', options({ center: 'Hududiy markaz', partner: 'Nodavlat ko‘rsatuvchi' })),
      ]
      defaults = item ? { ...item, capacity: String(item.capacity) } : { serviceId: serviceFilter.value, operator: 'center' }
      break
    }
    case 'provider':
      fields.value = [
        choices('placementId', 'Xizmat va xona', placementChoices(placements.value.filter(p => p.operator === 'partner' && !p.providerId))),
        input('name', 'Talabgor tashkilot nomi'), input('qualificationRef', 'Xizmat huquqi yoki malaka hujjati raqami'),
      ]
      break
    case 'decision':
      fields.value = [
        choices('status', 'Qaror', options({ registered: 'Reyestrga kiritish', rejected: 'Rad etish' })),
        input('decision', 'Qaror raqami va asosi', 'textarea'),
      ]
      if (hasCompetition(data, data.providers.find(row => row.id === id))) {
        fields.value.push(input('director', 'Guruh a’zosi · Markaz direktori'), input('member1', 'Guruh a’zosi · 2'), input('member2', 'Guruh a’zosi · 3'))
      }
      break
    case 'lease': {
      const item = data.providers.find(row => row.id === id)
      fields.value = [input('number', 'Shartnoma raqami'), input('from', 'Kuchga kirish sanasi', 'date'),
        input('to', 'Tugash sanasi', 'date'), input('started', 'Faoliyat boshlangan sana', 'date', true)]
      defaults = item?.lease ? { ...item.lease } : { from: date }
      break
    }
    case 'referral':
      fields.value = [
        choices('placementId', 'Xizmat va xona', placementChoices(activePlacements.value)),
        input('beneficiary', 'Xizmat oluvchining demo kodi'), input('reference', 'Ariza / yo‘llanma raqami'),
        input('residence', 'Yashash hududi'),
        choices('funding', 'Xizmat sharti', options({ preferential: 'Imtiyozli', paid: 'To‘liq pullik' })),
        input('issuer', 'Yo‘llanma bergan «Inson» markazi'),
        choices('channel', 'Murojaat kanali', options(Object.fromEntries(
          ['Inson markazi', 'Hududiy markaz', 'DXM', 'YAMIH', 'YIDXP', 'Ijtimoiy karta', 'Mahalla ijtimoiy xodimi'].map(channel => [channel, channel]),
        ))),
      ]
      defaults = { funding: 'preferential', channel: 'Inson markazi' }
      break
    case 'plan': {
      const plan = referralById(id)?.plan
      fields.value = [input('assessment', 'Dastlabki yoki joriy baholash', 'textarea'),
        input('goal', 'Maqsad va rejalashtirilgan ishlar', 'textarea'), input('specialist', 'Mas’ul mutaxassis'), input('reviewDate', 'Qayta baholash sanasi', 'date')]
      defaults = plan ? { assessment: plan.assessment ?? '', goal: plan.goal, specialist: plan.specialist, reviewDate: plan.reviewDate } : {}
      break
    }
    case 'reject':
      fields.value = [input('reason', 'Rad etish sababi', 'textarea')]
      break
    case 'close':
      fields.value = [
        input('outcome', 'Natijani baholash va izoh', 'textarea'),
        choices('disposition', 'Qaror', options(outcomeLabels)),
      ]
      break
    case 'finding':
      fields.value = [
        choices('placementId', 'Xizmat va xona', placementChoices(placements.value)),
        choices('kind', 'Qayd turi', options(findingKinds)),
        input('note', 'Tavsif yoki izoh', 'textarea'),
        input('due', 'Bartaraf etish muddati', 'date'),
        { ...input('score', 'Qoniqish bahosi (1–5)', 'number'), min: 1, max: 5 },
      ]
      defaults = { kind: 'inspection' }
      break
    case 'resolve':
      fields.value = [input('resolution', 'Bajarilgan chora yoki dalil raqami', 'textarea')]
      break
    case 'finance':
      fields.value = [
        choices('visitId', 'Tasdiqlovchi davomat qaydi', visits.value.map(item => ({
          id: item.id, title: `${item.evidence} · ${displayDate(item.date)} · ${referralById(item.referralId)?.beneficiary}`,
        }))),
        choices('kind', 'To‘lov turi', options(financeKinds)),
        { ...input('amount', 'Summa (so‘m)', 'number'), min: 1 },
        input('reference', 'Hisob hujjati raqami'),
      ]
      break
  }
  values.value = defaults
  await nextTick()
  dialog.value?.showModal()
}

async function update(change: (data: CenterState) => void) {
  if (readError.value) throw new Error('Saqlangan demo ma’lumotlariga hozir yozib bo‘lmaydi.')
  state.value = await changeState(change)
  notice.value = 'O‘zgarish saqlandi.'
  error.value = ''
}

async function run(change: (data: CenterState) => void) {
  if (saving.value) return
  saving.value = true
  try {
    await update(change)
  } catch (cause) {
    notice.value = ''
    error.value = cause instanceof Error ? cause.message : 'O‘zgarishni saqlab bo‘lmadi.'
  } finally {
    saving.value = false
  }
}

async function saveEditor() {
  if (saving.value || !editor.value) return
  saving.value = true
  const activeEditor = editor.value
  try {
    const draft = Object.fromEntries(shownFields.value.map(field => [field.key, String(values.value[field.key] ?? '').trim()]))
    const get = (key: string) => draft[key] ?? ''
    const id = target.value || crypto.randomUUID()
    for (const field of shownFields.value) {
      if (!field.optional && !get(field.key)) throw new Error(`${field.label} maydonini to‘ldiring.`)
    }
    await update(data => applyEditor(data, activeEditor, id, draft))
    dialog.value?.close()
  } catch (cause) {
    formError.value = cause instanceof Error ? cause.message : 'O‘zgarishni saqlab bo‘lmadi.'
  } finally {
    saving.value = false
  }
}

function advanceReferral(id: string, action: 'review' | 'start') {
  run(data => {
    const item = data.referrals.find(row => row.id === id)
    if (!item) throw new Error('Yo‘llanma topilmadi.')
    if (action === 'review') reviewReferral(data, item)
    else startReferral(data, item)
  })
}

function advanceFinance(id: string, expectedStatus: FinanceRecord['status']) {
  run(data => {
    const item = data.finance.find(row => row.id === id)
    if (!item || item.status !== expectedStatus || item.status === 'paid') throw new Error('Qayd holati o‘zgargan.')
    item.status = item.status === 'calculated' ? 'confirmed' : 'paid'
  })
}

watch(() => props.pageKey, () => {
  notice.value = ''
  if (!readError.value) error.value = ''
  selected.value = undefined
  statusFilter.value = ''
  search.value = ''
})

const integrations = [
  { name: 'Markaziy CRM · ins.ihma.uz', data: 'Yagona tashriflar reyestri, yo‘llanmalar, vaucherga havola, quvvat va psixosotsial reabilitatsiya' },
  { name: 'Kompleks reabilitatsiya · rbt.ihma.uz', data: 'Bolalar va kattalar reabilitatsiyasi, xizmat joyi va tashrif tasdig‘i' },
  { name: 'Erta aralashuv · chh.ihma.uz', data: 'Ko‘rsatuvchi va xizmat manzili, vaucher, buyurtma, reja, davomat, subsidiya', route: '/apps/ei' },
  { name: 'Kunduzgi parvarish · cdc.ihma.uz', data: 'PTPK xulosasi, guruhlar va bandlik, DXSh bitimi, davomat, subsidiya va transport kompensatsiyasi' },
  { name: '18+ kunduzgi qarab turish · eld.ihma.uz', data: 'Kattalar uchun kunduzgi qatnov, xizmat joyi va tashrif tasdig‘i' },
  { name: 'Oila hamkori', data: 'Tibbiy-ijtimoiy reabilitatsiya va kunduzgi qarab turish, vaucher, Bartel va Lauton baholari, tabel va to‘lov' },
  { name: 'Bolalarni himoya qilish', data: 'Yo‘naltirilgan xizmat, himoya yoki integratsiya rejasi, bajarish muddati va natija' },
  { name: 'Inson markazlari va Ijtimoiy reyestr', data: 'Eksterritorial yo‘llanma, reyestrda mavjudlik va xizmatdan foydalanish asosi' },
  { name: 'DXM, YIDXP va Ijtimoiy karta', data: 'Elektron ariza, bosqichlar holati va xabarnomalar' },
  { name: 'G‘azna va buxgalteriya', data: 'To‘lov hujjati, manbasi va to‘langan summa' },
  { name: 'Xavfni tahlil qilish', data: 'Sifat va xavf ko‘rsatkichlari, tekshiruv dalillari' },
]
</script>

<template>
  <div class="regional-page overflow-y-auto">
    <header v-if="pageKey === 'overview'" class="leadership-hero">
      <div>
        <p class="hero-date"><Activity :size="16" /> Rahbariyat monitoringi <span>·</span> {{ displayDate(date) }} <span>·</span> Demo ma’lumotlar</p>
        <h1>Hududiy ijtimoiy xizmatlar markazlari</h1>
        <p>Markazlarda kimga xizmat ko‘rsatilayotgani, navbat va o‘rinlar bandligini bitta oynada kuzating.</p>
        <div class="hero-actions">
          <RouterLink class="button hero-primary" :to="location('/capacity')"><Layers3 :size="17" /> Kvota va tashriflar</RouterLink>
          <button class="button hero-secondary" type="button" @click="exportOverview"><Download :size="17" /> Excel hisobot</button>
        </div>
      </div>
      <div class="hero-emblem" aria-hidden="true"><Building2 :size="86" :stroke-width="1.3" /></div>
    </header>
    <header v-else class="page-heading work-heading" :data-section="page.group">
      <div>
        <h1>{{ page.title }}</h1>
        <p v-if="pageKey === 'integrations'">Manba tizimlari va almashinadigan ma’lumotlar</p>
        <p v-if="pageKey === 'visits'">Joriy rol · {{ actor.name }}</p>
      </div>
      <button v-if="action" class="button primary" type="button" :disabled="readError" @click="openEditor(action.editor)">
        <Plus :size="18" /> {{ action.label }}
      </button>
    </header>

    <div v-if="pageKey !== 'overview'" class="demo-note"><Info :size="16" /> Demo muhiti. Faqat namuna ma’lumotlaridan foydalaning. O‘zgarishlar shu brauzerda saqlanadi.</div>
    <p v-if="notice" class="message" role="status">{{ notice }}</p>
    <p v-if="error" class="message error" role="alert">{{ error }}</p>

    <button v-if="pageKey === 'overview'" class="button mobile-filter-toggle" type="button" :aria-expanded="overviewFiltersOpen" aria-controls="regional-overview-filters"
      @click="overviewFiltersOpen = !overviewFiltersOpen">Hisobot filtrlari · {{ displayDate(from) }} – {{ displayDate(to) }}</button>
    <div v-if="pageKey !== 'integrations'" :id="pageKey === 'overview' ? 'regional-overview-filters' : undefined"
      class="filters" :class="{ 'overview-filter': pageKey === 'overview', 'filters-open': overviewFiltersOpen }">
      <label>Hudud
        <select aria-label="Hudud" :value="regionFilter" @change="filterBy('region', ($event.target as HTMLSelectElement).value)">
          <option value="">Barcha hududlar</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
      </label>
      <label>Markaz
        <select aria-label="Markaz" :value="centerFilter" @change="filterBy('center', ($event.target as HTMLSelectElement).value)">
          <option value="">Barcha markazlar</option>
          <option v-for="center in regionCenters" :key="center.id" :value="center.id">{{ center.name }}</option>
        </select>
      </label>
      <label v-if="pageKey !== 'centers'">Xizmat
        <select aria-label="Xizmat" :value="serviceFilter" @change="filterBy('service', ($event.target as HTMLSelectElement).value)">
          <option value="">Barcha xizmatlar</option>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.title }}</option>
        </select>
      </label>
      <template v-if="pageKey === 'overview'">
        <label>Davr boshi <input v-model="from" type="date" :max="to || undefined"></label>
        <label>Davr oxiri <input v-model="to" type="date" :min="from || undefined"></label>
        <div class="period-buttons" role="group" aria-label="Hisobot davri">
          <button v-for="days in [7, 14, 30]" :key="days" type="button" :aria-pressed="to === date && from === relativeDate(date, 1 - days)" @click="selectPeriod(days)">{{ days }} kun</button>
        </div>
      </template>
      <template v-if="pageKey === 'referrals'">
        <label>Holat
          <select v-model="statusFilter" aria-label="Holat">
            <option value="">Barcha holatlar</option>
            <option v-for="(label, key) in referralLabels" :key="key" :value="key">{{ label }}</option>
          </select>
        </label>
        <label>Qidiruv <input v-model="search" type="search" placeholder="Kod yoki yo‘llanma raqami"></label>
      </template>
    </div>

    <template v-if="pageKey === 'overview'">
      <LeadershipDashboard :state="state" :placements="placements" :visible-days="visibleDays" :period-days="periodDays"
        :today="date" :from="from" :to="to" :metrics="summary" :location="location" />
      <section class="panel">
        <div class="section-heading">
          <div><h2>Xizmatlar kesimida holat</h2><p>Bandlik va navbat joriy holatni, tashriflar tanlangan davrni aks ettiradi.</p></div>
          <dl class="mini-stats">
            <div><dt>Birinchi xizmatgacha</dt><dd>{{ waitingDays }}</dd></div>
            <div><dt>Yakunlangan rejalar</dt><dd>{{ outcomes }}</dd></div>
          </dl>
        </div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Markaz va xizmat</th><th>Bandlik</th><th>Navbat</th><th>Tashriflar</th><th>Holat</th></tr></thead>
            <tbody>
              <tr v-for="{ item, used, active, queued, count } in overviewRows" :key="item.id">
                <td>
                  <RouterLink class="text-link" :to="location('/services', { center: centerFor(state, item.id)?.id ?? '', service: item.serviceId })">{{ serviceName(item.serviceId) }}</RouterLink>
                  <small>{{ centerFor(state, item.id)?.name }} · {{ roomById(item.roomId)?.name }}</small>
                </td>
                <td><div class="occupancy"><progress :value="used" :max="item.capacity" :aria-label="serviceName(item.serviceId) + ' bandligi'" /><span>{{ used }} / {{ item.capacity }}</span></div></td>
                <td>{{ queued }}</td><td>{{ count }}</td>
                <td><span class="badge" :data-tone="active ? 'positive' : 'neutral'">{{ active ? 'Faol' : 'Faol emas' }}</span></td>
              </tr>
              <tr v-if="!overviewRows.length"><td colspan="5" class="empty">Filtr bo‘yicha xizmat joylari topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div><h2>Xizmatlar moliyasi</h2><p>Tanlangan davrdagi davomatga bog‘langan summalar</p></div>
          <RouterLink class="text-link" :to="location('/finance')">Moliyaviy reyestr <span aria-hidden="true">↗</span></RouterLink>
        </div>
        <dl class="finance-summary">
          <div v-for="(label, key) in financeLabels" :key="key"><dt>{{ label }}</dt><dd>{{ money(totals(key, periodFinance)) }}</dd></div>
        </dl>
      </section>
    </template>

    <AttendanceDesk v-else-if="pageKey === 'visits' || pageKey === 'passports'" :mode="pageKey" :state="state" :placements="placements"
      :actor="actor" :busy="saving" :read-only="readError" :referral-id="String(route.query.referral ?? '')"
      :range-start="String(route.query.from ?? '')" :range-end="String(route.query.to ?? '')" @change="run" />

    <template v-else-if="pageKey === 'centers'">
      <section v-for="center in centers" :key="center.id" class="panel">
        <div class="section-heading">
          <div>
            <h2>{{ center.name }}</h2>
            <p>{{ center.region }} · {{ center.address }} · {{ center.director }}</p>
          </div>
          <div class="actions">
            <span class="badge" :data-tone="center.status === 'active' ? 'positive' : 'neutral'">{{ center.status === 'active' ? 'Faol' : 'Rejada' }}</span>
            <button class="button compact" @click="openEditor('center', center.id)">Tahrirlash</button>
            <button class="button compact" @click="openEditor('room', center.id)"><Plus :size="16" /> Xona qo‘shish</button>
            <button class="button compact" @click="openEditor('staff', center.id)"><Plus :size="16" /> Xodim qo‘shish</button>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Xona</th><th>To‘siqsiz kirish</th><th>Jihozlar</th><th>Amal</th></tr></thead>
            <tbody>
              <tr v-for="room in rooms.filter(item => item.centerId === center.id)" :key="room.id">
                <td>{{ room.name }}</td><td>{{ room.accessible ? 'Mavjud' : 'Moslashtirish kerak' }}</td><td>{{ room.equipment || '—' }}</td>
                <td><button class="text-link" @click="openEditor('room', room.id)">Xonani tahrirlash</button></td>
              </tr>
              <tr v-if="!rooms.some(item => item.centerId === center.id)"><td colspan="4" class="empty">Xona qo‘shilmagan.</td></tr>
            </tbody>
          </table>
        </div>
        <details class="plan-history staff-registry">
          <summary>Xodimlar va malaka · {{ state.staff.filter(item => item.centerId === center.id && item.active).length }} ta faol</summary>
          <div class="table-scroll">
            <table>
              <thead><tr><th>Xodim va lavozim</th><th>Malaka hujjati</th><th>Holat</th><th>Amal</th></tr></thead>
              <tbody>
                <tr v-for="item in state.staff.filter(row => row.centerId === center.id)" :key="item.id">
                  <td><strong>{{ item.name }}</strong><small>{{ item.position }}</small></td>
                  <td>
                    {{ item.qualification || '—' }}
                    <small v-if="item.validUntil">{{ displayDate(item.validUntil) }} gacha</small>
                    <small v-if="item.validUntil && item.validUntil < date">Muddati o‘tgan</small>
                  </td>
                  <td>{{ item.active ? 'Faol' : 'Faol emas' }}</td>
                  <td><button class="text-link" @click="openEditor('staff', item.id)">Xodimni tahrirlash</button></td>
                </tr>
                <tr v-if="!state.staff.some(row => row.centerId === center.id)"><td colspan="4" class="empty">Xodimlar qo‘shilmagan.</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </section>
      <p v-if="!centers.length" class="panel empty">Filtr bo‘yicha markaz topilmadi.</p>
    </template>

    <template v-else-if="pageKey === 'services'">
      <section class="panel">
        <div class="section-heading"><h2>Xizmat joylari</h2></div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Xizmat va xona</th><th>Ko‘rsatuvchi</th><th>Ish jadvali</th><th>Band / jami</th><th>Holat</th><th>Amal</th></tr></thead>
            <tbody>
              <tr v-for="{ item, used, active } in overviewRows" :key="item.id">
                <td><strong>{{ serviceName(item.serviceId) }}</strong><small>{{ centerFor(state, item.id)?.name }} · {{ roomById(item.roomId)?.name }}</small></td>
                <td>{{ providerName(item) }}</td><td>{{ item.schedule }}</td><td>{{ used }} / {{ item.capacity }}</td>
                <td><span class="badge" :data-tone="active ? 'positive' : 'neutral'">{{ active ? 'Faol' : 'Faol emas' }}</span></td>
                <td><button class="text-link" @click="openEditor('placement', item.id)">Tahrirlash</button></td>
              </tr>
              <tr v-if="!overviewRows.length"><td colspan="6" class="empty">Xizmat joylari topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading"><h2>Xizmatlar katalogi</h2></div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Xizmat</th><th>Maqsadli guruh</th><th>Ma’lumot manbasi</th><th>Huquqiy asos</th></tr></thead>
            <tbody><tr v-for="service in services.filter(item => !serviceFilter || item.id === serviceFilter)" :key="service.id">
              <td><strong>{{ service.title }}</strong></td><td>{{ service.group }}</td><td>{{ service.source }}</td>
              <td><a class="text-link" :href="service.url" target="_blank" rel="noopener">{{ service.law }} ↗</a></td>
            </tr></tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else-if="pageKey === 'providers'" class="panel">
      <div class="section-heading"><div><h2>Talabgorlar reyestri</h2><p>Demo muddatida shanba va yakshanba hisobga olinmaydi.</p></div></div>
      <div class="table-scroll">
        <table>
          <thead><tr><th>Talabgor</th><th>Xizmat va markaz</th><th>So‘rovnoma</th><th>Qaror va holat</th><th>Ijara</th><th>Amal</th></tr></thead>
          <tbody>
            <tr v-for="item in providers" :key="item.id">
              <td><strong>{{ item.name }}</strong><small>{{ item.qualificationRef }}</small></td>
              <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
              <td>{{ displayDate(item.submitted) }}
                <small v-if="item.status === 'new' && hasCompetition(state, item)">Guruh qarori · {{ displayDate(workingDayDeadline(item.submitted, 10)) }} gacha</small>
              </td>
              <td><span class="badge" :data-tone="item.status === 'registered' ? 'positive' : item.status === 'rejected' ? 'warning' : 'neutral'">{{ providerLabels[item.status] }}</span>
                <small v-if="item.decision">{{ item.decision }}</small>
              </td>
              <td>
                <template v-if="item.lease">
                  {{ item.lease.number }}
                  <small>{{ displayDate(item.lease.from) }} – {{ displayDate(item.lease.to) }}</small>
                  <small v-if="item.lease.started">Ishga tushgan · {{ displayDate(item.lease.started) }}</small>
                  <small v-else>Faoliyatni boshlash muddati · {{ displayDate(leaseStartDeadline(item.lease.from)) }}</small>
                  <span v-if="(item.lease.started || date) > leaseStartDeadline(item.lease.from)" class="badge" data-tone="warning">Boshlash muddati o‘tgan</span>
                </template>
                <template v-else>—</template>
              </td>
              <td>
                <button v-if="item.status === 'new'" class="text-link" @click="openEditor('decision', item.id)">{{ hasCompetition(state, item) ? 'Guruh qarorini kiritish' : 'Qarorni kiritish' }}</button>
                <button v-if="item.status === 'registered'" class="text-link" @click="openEditor('lease', item.id)">{{ item.lease ? 'Ijarani tahrirlash' : 'Ijara kiritish' }}</button>
              </td>
            </tr>
            <tr v-if="!providers.length"><td colspan="6" class="empty">Talabgorlar topilmadi.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <template v-else-if="pageKey === 'referrals' || pageKey === 'delivery'">
      <section v-if="pageKey === 'referrals'" class="panel">
        <div class="section-heading"><h2>Murojaatlar reyestri</h2><span class="muted">{{ visibleReferrals.length }} ta murojaat</span></div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Kod va yo‘llanma</th><th>Xizmat joyi</th><th>Yashash hududi va yo‘llagan markaz</th><th>Sana va kanal</th><th>Holat</th><th>Amallar</th></tr></thead>
            <tbody>
              <tr v-for="item in visibleReferrals" :key="item.id">
                <td><button class="text-link" @click="selected = item.id">{{ item.beneficiary }}</button><small>{{ item.reference }} · {{ item.funding === 'paid' ? 'Pullik' : 'Imtiyozli' }}</small></td>
                <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
                <td>{{ item.residence }}<small>{{ item.issuer || 'Bevosita murojaat' }}</small></td>
                <td>{{ displayDate(item.created) }}<small>{{ item.channel }}</small></td>
                <td><span class="badge" :data-tone="item.status === 'queued' ? 'warning' : item.status === 'active' ? 'positive' : 'neutral'">{{ referralLabels[item.status] }}</span>
                  <small v-if="item.status === 'queued'">Navbatda {{ queueFor(state, item.placementId).findIndex(row => row.id === item.id) + 1 }}-o‘rin</small>
                </td>
                <td><div class="actions">
                  <button v-if="item.status === 'new'" class="text-link" @click="advanceReferral(item.id, 'review')">Yo‘naltirish</button>
                  <button v-if="['new', 'queued', 'referred'].includes(item.status)" class="text-link" @click="openEditor('reject', item.id)">Rad etish</button>
                  <button v-if="['referred', 'active'].includes(item.status)" class="text-link" @click="openEditor('plan', item.id)">{{ item.plan ? 'Rejani tahrirlash' : 'Reja tuzish' }}</button>
                  <button v-if="item.status === 'referred' && item.plan" class="text-link" @click="advanceReferral(item.id, 'start')">Xizmatni boshlash</button>
                </div></td>
              </tr>
              <tr v-if="!visibleReferrals.length"><td colspan="6" class="empty">Murojaatlar topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <template v-else>
        <section class="panel">
          <div class="section-heading"><h2>Individual rejalar</h2></div>
          <div class="table-scroll">
            <table>
              <thead><tr><th>Xizmat oluvchi</th><th>Maqsad va mutaxassis</th><th>Qayta baholash</th><th>Holat</th><th>Amallar</th></tr></thead>
              <tbody>
                <tr v-for="item in referrals.filter(row => ['referred', 'active', 'closed'].includes(row.status))" :key="item.id">
                  <td><button class="text-link" @click="selected = item.id">{{ item.beneficiary }}</button><small>{{ placementLabel(item.placementId) }}</small></td>
                  <td>
                    {{ item.plan?.goal ?? 'Reja tuzilmagan' }}
                    <small v-if="item.plan">{{ item.plan.specialist }}</small>
                    <small v-if="item.plan?.outcome">{{ item.plan.outcome }}</small>
                  </td>
                  <td>{{ displayDate(item.plan?.reviewDate ?? '') }}<small v-if="item.status === 'active' && item.plan && item.plan.reviewDate <= date">Baholash muddati kelgan</small></td>
                  <td><span class="badge" :data-tone="item.status === 'active' ? 'positive' : 'neutral'">{{ referralLabels[item.status] }}</span></td>
                  <td><div class="actions">
                    <button v-if="item.status !== 'closed'" class="text-link" @click="openEditor('plan', item.id)">{{ item.plan ? 'Rejani yangilash' : 'Reja tuzish' }}</button>
                    <button v-if="item.status === 'referred' && item.plan" class="text-link" @click="advanceReferral(item.id, 'start')">Xizmatni boshlash</button>
                    <RouterLink v-if="item.status === 'active'" class="text-link" :to="location('/visits', { referral: item.id })">Tashrifni qayd etish</RouterLink>
                    <button v-if="item.status === 'active'" class="text-link" @click="openEditor('close', item.id)">Natijani baholash</button>
                  </div></td>
                </tr>
                <tr v-if="!referrals.some(row => ['referred', 'active', 'closed'].includes(row.status))"><td colspan="5" class="empty">Individual rejalar topilmadi.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section class="panel">
          <div class="section-heading"><h2>Davomat jurnali</h2></div>
          <div class="table-scroll">
            <table>
              <thead><tr><th>Xizmat oluvchi</th><th>Xizmat joyi</th><th>Sana</th><th>Davomiylik</th><th>Tasdiqlovchi qayd</th></tr></thead>
              <tbody>
                <tr v-for="item in visits" :key="item.id"><td>{{ referralById(item.referralId)?.beneficiary }}</td><td>{{ placementLabel(referralById(item.referralId)?.placementId ?? '') }}</td><td>{{ displayDate(item.date) }}</td><td>{{ item.minutes }} daqiqa</td><td>{{ item.evidence }}</td></tr>
                <tr v-if="!visits.length"><td colspan="5" class="empty">Davomat qaydlari topilmadi.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>
      <section v-if="selectedReferral" class="panel">
        <div class="section-heading">
          <div><h2>{{ selectedReferral.beneficiary }} · Murojaat tarixi</h2><p>{{ selectedReferral.reference }} · {{ placementLabel(selectedReferral.placementId) }}</p></div>
          <button class="button compact" @click="selected = undefined">Yopish</button>
        </div>
        <ol class="history">
          <li v-for="(event, index) in selectedReferral.history" :key="index"><time :datetime="event.date">{{ displayDate(event.date) }}</time>{{ event.label }}</li>
        </ol>
        <details v-if="selectedReferral.plan" class="plan-history">
          <summary>Reja va baholashlar</summary>
          <dl v-for="(plan, index) in [...(selectedReferral.previousPlans ?? []), selectedReferral.plan]" :key="index">
            <dt>Qayta baholash sanasi</dt><dd>{{ displayDate(plan.reviewDate) }}</dd>
            <template v-if="plan.assessment"><dt>Baholash</dt><dd>{{ plan.assessment }}</dd></template>
            <dt>Maqsad</dt><dd>{{ plan.goal }}</dd>
            <template v-if="plan.outcome"><dt>Natija</dt><dd>{{ plan.outcome }}</dd></template>
          </dl>
        </details>
      </section>
    </template>

    <section v-else-if="pageKey === 'quality'" class="panel">
      <div class="section-heading">
        <div><h2>Tekshiruvlar, shikoyatlar va qoniqish</h2><p>{{ openFindings.length }} ta ochiq qayd · o‘rtacha qoniqish {{ satisfaction }}</p></div>
        <a class="text-link" href="https://lex.uz/docs/8409767" target="_blank" rel="noopener">Inspeksiya mezonlari ↗</a>
      </div>
      <div class="table-scroll">
        <table>
          <thead><tr><th>Qayd turi</th><th>Xizmat joyi</th><th>Tavsif</th><th>Muddat yoki baho</th><th>Holat</th><th>Amal</th></tr></thead>
          <tbody>
            <tr v-for="item in findings" :key="item.id">
              <td><strong>{{ findingKinds[item.kind] }}</strong><small>{{ displayDate(item.date) }}</small></td>
              <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
              <td>{{ item.note }}<small v-if="item.resolution">{{ item.resolution }}</small></td>
              <td>{{ item.score ? item.score + ' / 5' : displayDate(item.due) }}</td>
              <td><span class="badge" :data-tone="item.status === 'open' ? 'warning' : 'positive'">{{ item.status === 'open' ? (item.due < date ? 'Muddati o‘tgan' : 'Ochiq') : 'Yopilgan' }}</span></td>
              <td><button v-if="item.status === 'open'" class="text-link" @click="openEditor('resolve', item.id)">Chorani qayd etish</button></td>
            </tr>
            <tr v-if="!findings.length"><td colspan="6" class="empty">Sifat nazorati qaydlari topilmadi.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <template v-else-if="pageKey === 'finance'">
      <div class="metrics finance-metrics">
        <div v-for="(label, key) in financeLabels" :key="key" class="metric"><div class="metric-title">{{ label }}</div><div class="metric-value">{{ money(totals(key)) }}</div></div>
      </div>
      <section class="panel">
        <div class="section-heading"><div><h2>Moliyaviy qaydlar</h2><p>Reyestrdagi amallar demo hisob holatini yangilaydi.</p></div></div>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Hujjat</th><th>Davomat asosi</th><th>Turi</th><th>Summa</th><th>Holat</th><th>Amal</th></tr></thead>
            <tbody>
              <tr v-for="item in finance" :key="item.id">
                <td>{{ item.reference }}</td><td>{{ visits.find(row => row.id === item.visitId)?.evidence }}</td><td>{{ financeKinds[item.kind] }}</td>
                <td>{{ money(item.amount) }}</td><td><span class="badge" :data-tone="item.status === 'paid' ? 'positive' : 'neutral'">{{ financeLabels[item.status] }}</span></td>
                <td><button v-if="item.status !== 'paid'" class="text-link" @click="advanceFinance(item.id, item.status)">{{ item.status === 'calculated' ? 'Tasdiqlash' : 'To‘langanini qayd etish' }}</button></td>
              </tr>
              <tr v-if="!finance.length"><td colspan="6" class="empty">Moliyaviy qaydlar topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <section v-else class="panel">
      <div class="table-scroll">
        <table>
          <thead><tr><th>Manba</th><th>Almashiladigan ma’lumot</th><th>Holat</th></tr></thead>
          <tbody>
            <tr v-for="item in integrations" :key="item.name">
              <td><strong>{{ item.name }}</strong><small v-if="item.route && auth.hasPermission('ei.view')"><RouterLink class="text-link" :to="item.route">NASP moduliga o‘tish ↗</RouterLink></small></td>
              <td>{{ item.data }}</td><td><span class="badge">Ulanmagan</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <dialog ref="dialog" class="editor" aria-labelledby="regional-editor-title" @cancel="saving && $event.preventDefault()">
      <form class="editor-form" @submit.prevent="saveEditor">
        <header><h2 id="regional-editor-title">{{ editor ? editorTitles[editor] : '' }}</h2></header>
        <p v-if="editor === 'decision' && state.providers.some(item => item.id === target && hasCompetition(state, item))" class="muted">Bir nechta talabgor mavjud. O‘rganish guruhi qarori raqamini kiriting.</p>
        <div class="editor-fields">
          <label v-for="field in shownFields" :key="field.key">
            {{ field.label }}
            <select v-if="field.type === 'select'" v-model="values[field.key]" :aria-label="field.label" :required="!field.optional">
              <option value="">{{ field.options?.length ? 'Tanlang' : 'Tanlash uchun yozuv mavjud emas' }}</option>
              <option v-for="option in field.options" :key="option.id" :value="option.id">{{ option.title }}</option>
            </select>
            <textarea v-else-if="field.type === 'textarea'" v-model="values[field.key]" rows="3" maxlength="600" :required="!field.optional" />
            <input v-else v-model="values[field.key]" :type="field.type ?? 'text'" :required="!field.optional" :min="field.min" :max="field.max" :step="field.type === 'number' ? 1 : undefined" maxlength="150">
          </label>
        </div>
        <p v-if="formError" class="message error" role="alert">{{ formError }}</p>
        <footer class="actions editor-actions">
          <button type="button" class="button" :disabled="saving" @click="dialog?.close()">Bekor qilish</button>
          <button type="submit" class="button primary" :disabled="saving">{{ saving ? 'Saqlanmoqda…' : 'Saqlash' }}</button>
        </footer>
      </form>
    </dialog>
  </div>
</template>

<style scoped src="./style.css"></style>
