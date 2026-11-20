<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Activity, Building2, ClipboardCheck, Clock3, Download,
  Fingerprint, Layers3, Plus, UsersRound, Wallet,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { modulePath, regionalAdministrationPages, regionalCenterPages } from './config'
import type { RegionalCenterPage } from './config'
import { applyEditor, hasCompetition } from './actions'
import type { Editor } from './actions'
import AttendanceDesk from './AttendanceDesk.vue'
import RegistryList from './RegistryList.vue'
import RegistryFilterMenu from './RegistryFilterMenu.vue'
import RegistryScopeFields from './RegistryScopeFields.vue'
import { useRegistryList } from './registry'
import type { RegistryScope, ScopeKey } from './registry'
import PersonCard from './PersonCard.vue'
import PersonLink from './PersonLink.vue'
import CenterAdministration from './CenterAdministration.vue'
import AnimatedNumber from './AnimatedNumber.vue'
import ServiceFlow from './ServiceFlow.vue'
import LeadershipDashboard from './LeadershipDashboard.vue'
import MonitoringRegionMap from './MonitoringRegionMap.vue'
import PortfolioAnalysis from './PortfolioAnalysis.vue'
import { portfolioRows, previousPeriod } from './portfolio'
import { dailyVisits, quotaRows } from './attendance'
import { createDemoData } from './demo'
import {
  centerFor, financeKinds, financeLabels, findingKinds, isOperational, leaseStartDeadline, outcomeLabels,
  provinceNames, providerLabels, queueFor, referralLabels, relativeDate, reservesSeat, serviceName,
  services, setupStatusLabels, today, workingDayDeadline,
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
const selectedPerson = ref('')
const historyDialog = ref<HTMLDialogElement>()
const date = today()
const from = ref(relativeDate(date, -13))
const to = ref(date)
const actor = computed(() => ({
  name: auth.currentUser?.role ?? 'Demo foydalanuvchi',
  curator: auth.hasPermission('regional-centers.curate'),
}))
const canManage = computed(() => actor.value.curator && !readError.value)
const importedPage = computed(() => ['referrals', 'visits', 'delivery', 'quality', 'finance'].includes(props.pageKey))

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
const placementFilter = computed(() => typeof route.query.placement === 'string' ? route.query.placement : '')
const quotaUsage = computed(() => props.pageKey === 'passports' && route.query.view === 'usage')
const registryScope = () => JSON.stringify([regionFilter.value, centerFilter.value, serviceFilter.value, placementFilter.value])
const regions = computed(() => [...new Set(state.value.centers.map(item => item.region))].sort())
const regionCenters = computed(() => state.value.centers.filter(item => !regionFilter.value || item.region === regionFilter.value))

function filterBy(key: ScopeKey, value: string) {
  const query = { ...route.query, [key]: value || undefined }
  if (key === 'region') delete query.center
  delete query.placement
  void router.replace({ query })
}

function location(path: string, filters: Record<string, string> = {}) {
  const { from, to, referral, visit, placement, view, recipient, ...scope } = route.query
  return { path: modulePath + path, query: { ...scope, ...filters } }
}

const centers = computed(() => regionCenters.value.filter(c => !centerFilter.value || c.id === centerFilter.value))
const centerIds = computed(() => new Set(centers.value.map(item => item.id)))
const rooms = computed(() => state.value.rooms.filter(room => centerIds.value.has(room.centerId)))
const roomIds = computed(() => new Set(rooms.value.map(item => item.id)))
const roomsById = computed(() => new Map(state.value.rooms.map(item => [item.id, item])))
const placementsById = computed(() => new Map(state.value.placements.map(item => [item.id, item])))
const centersById = computed(() => new Map(state.value.centers.map(item => [item.id, item])))
const placements = computed(() => state.value.placements.filter(item =>
  roomIds.value.has(item.roomId) && (!serviceFilter.value || item.serviceId === serviceFilter.value)
  && (!placementFilter.value || item.id === placementFilter.value)))
const placementIds = computed(() => new Set(placements.value.map(item => item.id)))
const activePlacements = computed(() => placements.value.filter(item => isOperational(state.value, item, date)))
const providers = computed(() => state.value.providers.filter(item => placementIds.value.has(item.placementId)))
const referrals = computed(() => state.value.referrals.filter(item => placementIds.value.has(item.placementId)))
const people = computed(() => new Map((state.value.people ?? []).map(item => [item.id, item])))
const recipientFilter = computed(() => typeof route.query.recipient === 'string' ? route.query.recipient : '')
const scopeFilters = computed<RegistryScope>(() => {
  const fields: RegistryScope['fields'] = []
  const links: NonNullable<RegistryScope['links']> = []
  if (props.pageKey !== 'services') {
    fields.push({ key: 'region', label: 'Hudud', all: 'Barcha hududlar', value: regionFilter.value, options: regions.value.map(title => ({ id: title, title })) })
    if (props.pageKey !== 'centers') fields.push({
      key: 'center', label: 'Markaz', all: 'Barcha markazlar', value: centerFilter.value,
      options: regionCenters.value.map(item => ({ id: item.id, title: item.name })),
    })
  }
  fields.push({ key: 'service', label: 'Xizmat', all: 'Barcha xizmatlar', value: serviceFilter.value, options: [...services] })
  if (props.pageKey === 'centers' && centerFilter.value) links.push({
    label: 'Barcha markazlar', text: 'Barcha markazlar', to: { query: { ...route.query, center: undefined, placement: undefined } },
  })
  if (placementFilter.value) links.push({
    label: 'Barcha xizmat joylari', text: 'Barcha xizmat joylari', to: { query: { ...route.query, placement: undefined } },
  })
  if (recipientFilter.value && ['referrals', 'delivery', 'visits'].includes(props.pageKey)) links.push({
    label: 'Shaxs filtrini olib tashlash', text: `${people.value.get(recipientFilter.value)?.fullName || recipientFilter.value} ×`,
    to: { query: { ...route.query, recipient: undefined } },
  })
  return { fields, links, active: fields.filter(field => field.value).length + links.length, change: filterBy }
})
const recipientReferrals = computed(() => recipientFilter.value
  ? referrals.value.filter(item => item.beneficiary === recipientFilter.value) : referrals.value)
const referralFilter = computed(() => typeof route.query.referral === 'string' ? route.query.referral : '')
const visitFilter = computed(() => typeof route.query.visit === 'string' ? route.query.visit : '')
const plannedReferrals = computed(() => recipientReferrals.value.filter(item =>
  planStatus(item.status) && (!referralFilter.value || item.id === referralFilter.value)))
const referralsById = computed(() => new Map(referrals.value.map(item => [item.id, item])))
const visits = computed(() => state.value.visits.filter(item => referralsById.value.has(item.referralId)))
const visitsById = computed(() => new Map(visits.value.map(item => [item.id, item])))
const personReferrals = computed(() => selectedPerson.value
  ? referrals.value.filter(item => item.beneficiary === selectedPerson.value) : [])
const personResidence = computed(() => personReferrals.value.reduce<{ date: string; address: string } | undefined>((current, item) =>
  item.residence && (!current || item.created > current.date) ? { date: item.created, address: item.residence } : current, undefined)?.address)
const personRecords = computed(() => {
  if (!selectedPerson.value) return []
  const ids = new Set(personReferrals.value.map(item => item.id))
  const records = dailyVisits(state.value, visits.value.filter(item => ids.has(item.referralId)))
  const filters = { recipient: selectedPerson.value, placement: placementFilter.value }
  return [
    { title: 'Yo‘llanmalar', count: ids.size, to: location('/referrals', filters) },
    { title: 'Individual rejalar', count: personReferrals.value.filter(item => planStatus(item.status)).length, to: location('/delivery', filters) },
    { title: 'Tashriflar', count: records.length, to: location('/visits', filters) },
  ].filter(item => item.count)
})
const findings = computed(() => state.value.findings.filter(item => placementIds.value.has(item.placementId)))
const visitIds = computed(() => new Set(visits.value.map(item => item.id)))
const finance = computed(() => state.value.finance.filter(item => visitIds.value.has(item.visitId)))
const financeInView = computed(() => {
  const { from, to } = route.query
  if (props.pageKey !== 'finance' || (!from && !to)) return finance.value
  const filteredIds = new Set(visits.value.filter(item =>
    (typeof from !== 'string' || !from || item.date >= from) && (typeof to !== 'string' || !to || item.date <= to)).map(item => item.id))
  return finance.value.filter(item => filteredIds.has(item.visitId))
})
const planStatuses = { planned: 'Reja mavjud', pending: 'Reja kutilmoqda', overdue: 'Baholash muddati kelgan', closed: 'Yakunlangan' }
const qualityStatuses = { open: 'Ochiq', overdue: 'Muddati o‘tgan', closed: 'Yopilgan', feedback: 'Qoniqish bahosi' }
const catalogue = computed(() => services.filter(item => !serviceFilter.value || item.id === serviceFilter.value))
const referralList = useRegistryList(() => recipientReferrals.value, item => ({
  status: item.status, date: item.created,
  search: [people.value.get(item.beneficiary)?.fullName, item.beneficiary, item.residence, item.issuer, item.reference, item.channel, item.voucherRef].join(' '),
}), registryScope, { sort: 'newest' })
const planList = useRegistryList(() => plannedReferrals.value, item => ({
  status: item.status === 'closed' ? 'closed' : !item.plan ? 'pending' : item.status === 'active' && item.plan.reviewDate <= date ? 'overdue' : 'planned',
  date: item.created, search: [people.value.get(item.beneficiary)?.fullName, item.beneficiary, item.reference, item.plan?.goal, item.plan?.specialist].join(' '),
}), () => registryScope() + referralFilter.value, { sort: 'newest' })
const providerList = useRegistryList(() => providers.value, item => ({
  status: item.status, date: item.submitted, search: [item.name, item.qualificationRef, item.decision, item.lease?.number].join(' '),
}), registryScope, { sort: 'newest' })
const qualityList = useRegistryList(() => findings.value, item => ({
  status: item.kind === 'feedback' ? 'feedback' : item.status === 'open' && item.due && item.due < date ? 'overdue' : item.status,
  date: item.date, search: [findingKinds[item.kind], item.note, item.resolution, placementLabel(item.placementId)].join(' '),
}), registryScope, { sort: 'newest' })
const financeList = useRegistryList(() => financeInView.value, item => {
  const code = beneficiaryForVisit(item.visitId)
  return {
    status: item.status, date: visitsById.value.get(item.visitId)?.date,
    search: [item.reference, financeKinds[item.kind], code, people.value.get(code)?.fullName].join(' '),
  }
}, () => JSON.stringify([registryScope(), route.query.from, route.query.to]), { sort: 'newest' })
const catalogueList = useRegistryList(() => catalogue.value, item => ({
  search: [item.title, item.group, item.source, item.law, 'program' in item ? item.program : ''].join(' '),
}), registryScope)
watch(referralFilter, () => planList.reset())
watch(recipientFilter, () => {
  referralList.reset()
  planList.reset()
  selected.value = undefined
})
const formattedNumber = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })
const number = (value: number) => formattedNumber.format(value)
const money = (value: number) => `${number(value)} so‘m`
const displayDate = (value: string) => value ? value.split('-').reverse().join('.') : '—'
const withinPeriod = (value: string) => (!from.value || value >= from.value) && (!to.value || value <= to.value)
const allDailyVisits = computed(() => dailyVisits(state.value))
const visibleDays = computed(() => allDailyVisits.value.filter(item => placementIds.value.has(item.placementId)))
const periodDays = computed(() => visibleDays.value.filter(item => withinPeriod(item.date)))
const currentDays = computed(() => visibleDays.value.filter(item => item.date === date))
const todayFunding = computed(() => currentDays.value.reduce((sum, item) => {
  sum[item.funding]++
  return sum
}, { voucher: 0, paid: 0, unknown: 0 }))
const quotaReport = computed(() => quotaRows(state.value, placements.value, visibleDays.value, date))
const portfolioRange = computed(() => ({ from: from.value, to: to.value, today: date }))
const byRegion = computed(() => portfolioRows(state.value, placements.value, visibleDays.value, quotaReport.value, portfolioRange.value, 'region'))
const byService = computed(() => portfolioRows(state.value, placements.value, visibleDays.value, quotaReport.value, portfolioRange.value, 'service'))
const mapRows = computed(() => {
  const mapPlacements = state.value.placements.filter(item => !serviceFilter.value || item.serviceId === serviceFilter.value)
  const quotas = quotaRows(state.value, mapPlacements, allDailyVisits.value, date)
  return portfolioRows(state.value, mapPlacements, allDailyVisits.value, quotas, portfolioRange.value, 'region')
})
const priorPeriod = computed(() => previousPeriod(from.value, to.value))
const periodVisits = computed(() => visits.value.filter(item => withinPeriod(item.date)))
const periodFindings = computed(() => findings.value.filter(item => withinPeriod(item.date)))
const periodFinance = computed(() => {
  const periodVisitIds = new Set(periodVisits.value.map(item => item.id))
  return finance.value.filter(item => periodVisitIds.has(item.visitId))
})
const visited = computed(() => new Set(periodDays.value.map(item => item.beneficiary)))
const openFindings = computed(() => findings.value.filter(item => item.status === 'open'))
const scores = computed(() => periodFindings.value.flatMap(item => item.score === undefined ? [] : [item.score]))
const averageScore = computed(() => scores.value.length ? scores.value.reduce((sum, score) => sum + score, 0) / scores.value.length : null)
const dataFlows = computed(() => {
  const filters = { from: from.value, to: to.value }
  const approved = quotaReport.value.filter(row => row.passport)
  const quota = approved.reduce((sum, row) => sum + (row.passport?.voucher ?? 0) + (row.passport?.paid ?? 0), 0)
  const actual = approved.reduce((sum, row) => sum + row.actual.voucher + row.actual.paid, 0)
  return [
    { id: 'visits', title: 'Tashriflar', stages: [
      { title: 'Tashrif tasdiqlari', value: periodDays.value.reduce((sum, row) => sum + row.confirmations.length, 0), detail: 'Reyestrdagi Face ID, dalolatnoma va avvalgi qaydlar.', path: '/visits', filters },
      { title: 'Yagona tashriflar', value: periodDays.value.length, detail: 'Bir fuqaro, bir xizmat va bir sana bitta tashrif bo‘lib hisoblanadi.', path: '/visits', filters },
      { title: 'Xizmat oluvchilar', value: visited.value.size, detail: 'Takror tashriflardan qat’i nazar, har bir fuqaro bir marta sanaladi.', path: '/visits', filters },
    ] },
    { id: 'capacity', title: 'Quvvat', stages: [
      { title: 'Amaldagi quvvat pasportlari', value: approved.length, detail: 'Bugun amal qilayotgan tasdiqlangan pasportlar.', path: '/capacity' },
      { title: 'Kunlik jami kvota', value: quota, detail: 'Vaucherli va pullik o‘rinlar yig‘indisi.', path: '/capacity', filters: { view: 'usage' } },
      { title: 'Kvotadan foydalanish', value: quota ? actual / quota * 100 : null, suffix: '%', decimals: 1, detail: `Bugungi ${actual} ta vaucherli yoki pullik tashrif ÷ ${quota} ta o‘rin.`, path: '/capacity', filters: { view: 'usage' } },
    ] },
    { id: 'finance', title: 'Moliya', stages: [
      { title: 'Moliyaviy qaydga asos bo‘lgan davomatlar', value: new Set(periodFinance.value.map(item => item.visitId)).size, detail: 'Hisob hujjatlari bog‘langan davomat qaydlari.', path: '/finance', filters },
      { title: 'Hisob hujjatlari', value: periodFinance.value.length, detail: 'Tanlangan davomatlarga bog‘langan barcha moliyaviy qaydlar.', path: '/finance', filters },
      { title: 'To‘langan summa', value: totals('paid', periodFinance.value), suffix: ' so‘m', detail: '«To‘langan» holatidagi moliyaviy qaydlar yig‘indisi.', path: '/finance', filters },
    ] },
  ]
})
const capacity = computed(() => activePlacements.value.reduce((sum, item) => sum + item.capacity, 0))
const overviewRows = computed(() => {
  const activity = new Map(placements.value.map(item => [item.id, { used: 0, count: 0, queued: 0 }]))
  for (const referral of referrals.value) {
    const row = activity.get(referral.placementId)
    if (!row) continue
    if (referral.status === 'queued') row.queued++
    if (reservesSeat(referral)) row.used++
  }
  for (const visit of periodDays.value) {
    const row = activity.get(visit.placementId)
    if (row) row.count++
  }
  const activeIds = new Set(activePlacements.value.map(item => item.id))
  return placements.value.map(item => ({ item, active: activeIds.has(item.id), ...activity.get(item.id)! }))
})
const seats = computed(() => overviewRows.value.reduce((sum, row) => sum + (row.active ? row.used : 0), 0))
const overviewList = useRegistryList(() => overviewRows.value, row => {
  const room = roomById(row.item.roomId)
  return {
    status: row.active ? 'active' : 'inactive',
    search: [serviceName(row.item.serviceId), room?.name, centersById.value.get(room?.centerId ?? '')?.name].join(' '),
  }
}, () => JSON.stringify([registryScope(), from.value, to.value]))
const summary = computed(() => [
  { title: 'Faol markazlar', value: centers.value.filter(item => item.status === 'active'
    && (!serviceFilter.value || activePlacements.value.some(place => centerFor(state.value, place.id)?.id === item.id))).length,
    icon: Building2, path: '/centers', tone: 'blue', hint: `${activePlacements.value.length} ta faol xizmat joyi` },
  { title: 'Bugungi tashriflar', value: currentDays.value.length, icon: Fingerprint, path: '/visits', tone: 'purple',
    hint: `${todayFunding.value.voucher} vaucherli · ${todayFunding.value.paid} pullik${todayFunding.value.unknown ? ' · ' + todayFunding.value.unknown + ' aniqlanmagan' : ''}` },
  { title: 'Xizmat oluvchilar', value: visited.value.size, icon: UsersRound, path: '/visits', tone: 'mint',
    hint: `Davrda ${periodDays.value.length} ta tashrif`, period: true },
  { title: 'Navbatdagi yo‘llanmalar', value: referrals.value.filter(item => item.status === 'queued').length, icon: Clock3, path: '/referrals', tone: 'amber',
    hint: `${referrals.value.filter(item => item.status === 'new').length} ta yangi murojaat` },
  { title: 'Yo‘llanma uchun bo‘sh o‘rin', value: Math.max(0, capacity.value - seats.value), icon: Layers3, path: '/centers', tone: 'blue',
    hint: `${seats.value} band / ${capacity.value} o‘rin` },
  { title: 'Ochiq kamchiliklar', value: openFindings.value.length, icon: ClipboardCheck, path: '/quality', tone: 'rose',
    hint: `${openFindings.value.filter(item => item.due < date).length} ta muddati o‘tgan` },
  { title: 'Qoniqish bahosi', value: averageScore.value, suffix: ' / 5', decimals: 1, icon: Activity, path: '/quality', tone: 'mint', hint: `Davrda ${scores.value.length} ta baho` },
  { title: 'To‘langan summa', value: totals('paid', periodFinance.value), suffix: ' so‘m', icon: Wallet, path: '/finance', tone: 'purple',
    hint: `Davr tashriflariga bog‘liq ${periodFinance.value.filter(item => item.status === 'paid').length} ta qayd` },
])
const outcomes = computed(() => referrals.value.filter(item => item.status === 'closed'
  && withinPeriod(item.history[item.history.length - 1]?.date ?? item.created)).length)
const waitingDays = computed(() => {
  const first = new Map<string, string>()
  for (const visit of visits.value) {
    const existing = first.get(visit.referralId)
    if (!existing || visit.date < existing) first.set(visit.referralId, visit.date)
  }
  const durations = referrals.value.flatMap(referral => {
    const firstDate = first.get(referral.id)
    return firstDate && withinPeriod(firstDate) ? [(Date.parse(firstDate) - Date.parse(referral.created)) / 86_400_000] : []
  })
  return durations.length ? `${number(durations.reduce((sum, days) => sum + days, 0) / durations.length)} kun` : '—'
})

const statusTones: Record<ReferralStatus, string> = {
  new: 'info', queued: 'warning', referred: 'purple', active: 'positive', closed: 'neutral', rejected: 'danger',
}
function planStatus(status: ReferralStatus) {
  return status === 'referred' || status === 'active' || status === 'closed'
}

function openPerson(code: string) {
  if (referrals.value.some(item => item.beneficiary === code)) selectedPerson.value = code
}

async function openHistory(id: string) {
  selected.value = id
  await nextTick()
  historyDialog.value?.showModal()
}
function roomById(id: string) {
  return roomsById.value.get(id)
}

function referralById(id: string) {
  return referralsById.value.get(id)
}

function beneficiaryForVisit(id: string) {
  return referralById(visitsById.value.get(id)?.referralId ?? '')?.beneficiary ?? ''
}

function placementLabel(id: string) {
  const item = placementsById.value.get(id)
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
      ...summary.value.map(item => [item.title, item.value === null ? '—' : number(item.value) + (item.suffix ?? ''), item.hint]),
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
    for (const [sheet, rows] of [['Hududlar', byRegion.value], ['Xizmatlar', byService.value]] as const) {
      utils.book_append_sheet(workbook, utils.aoa_to_sheet([
        ['Davr boshi', from.value, 'Davr oxiri', to.value],
        ['Nomi', 'Markazlar', 'Faol xizmat joylari', 'Xizmat oluvchilar', 'Tashriflar', 'Oldingi teng davr', 'Vaucherli', 'Pullik', 'Turi aniqlanmagan', 'Navbatda (joriy)', 'Bugungi signallar'],
        ...rows.map(row => [row.title, row.centers, row.activePlaces, row.visitors, row.visits,
          priorPeriod.value ? row.previousVisits : undefined, row.voucher, row.paid, row.unknown, row.stages.queued, row.signalCount]),
      ]), sheet)
    }
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
  step?: number
}
const editor = ref<Editor>()
const target = ref('')
const fields = ref<Field[]>([])
const values = ref<Record<string, string>>({})
const editingVersion = ref('')
const formError = ref('')
const dialog = ref<HTMLDialogElement>()
const selected = ref<string>()
const selectedReferral = computed(() => referralById(selected.value ?? ''))
const formRoom = computed(() => roomById(values.value.roomId ?? ''))
const formService = computed(() => services.find(service => service.id === values.value.serviceId))
const shownFields = computed(() => fields.value.map(field => field.key === 'staffId' ? {
  ...field, options: state.value.staff.filter(item => item.centerId === formRoom.value?.centerId && item.active)
    .map(item => ({ id: item.id, title: `${item.name} · ${item.position}` })),
} : field))
watch(() => formRoom.value?.centerId, (next, previous) => {
  if (next !== previous && !state.value.staff.some(item => item.id === values.value.staffId && item.centerId === next)) {
    values.value.staffId = ''
  }
})
const options = (items: Record<string, string>) => Object.entries(items).map(([id, title]) => ({ id, title }))
const regionOptions = computed(() => [...new Set([...Object.values(provinceNames), ...regions.value])]
  .sort((a, b) => a.localeCompare(b, 'uz')).map(title => ({ id: title, title })))
const choices = (key: string, label: string, items: { id: string; title: string }[]): Field =>
  ({ key, label, type: 'select', options: items })
const input = (key: string, label: string, type?: Field['type'], optional?: boolean): Field =>
  ({ key, label, type, optional })
const placementChoices = (items: Placement[]) => items.map(item => ({
  id: item.id, title: `${centerFor(state.value, item.id)?.name} · ${placementLabel(item.id)}`,
}))

async function openEditor(kind: Editor, id = '', roomId = '') {
  if (saving.value || !canManage.value || importedPage.value) return
  target.value = id
  formError.value = ''
  editor.value = kind
  const data = state.value
  editingVersion.value = JSON.stringify(managedRecords(data, kind)?.find(item => item.id === id) ?? null)
  let defaults: Record<string, string> = {}
  switch (kind) {
    case 'center': {
      const item = data.centers.find(row => row.id === id)
      fields.value = [
        input('name', 'Markaz nomi'), input('code', 'Markaz kodi', undefined, true),
        choices('region', 'Viloyat / shahar', regionOptions.value), input('district', 'Tuman / shahar', undefined, true),
        input('address', 'Manzil'), input('director', 'Mas’ul lavozim yoki demo nomi'),
        input('phone', 'Telefon', undefined, true), input('hours', 'Ish vaqti', undefined, true),
        input('document', 'Tashkil etish hujjati', 'textarea', true), choices('status', 'Holat', options(setupStatusLabels)),
      ]
      defaults = item ? { ...item } : { status: 'planned', region: regionFilter.value }
      break
    }
    case 'room': {
      const item = roomById(id)
      if (!item) target.value = ''
      fields.value = [
        choices('centerId', 'Markaz', centers.value.map(center => ({ id: center.id, title: center.name }))),
        input('name', 'Xona nomi'), input('code', 'Xona raqami / kodi', undefined, true),
        input('floor', 'Qavat', undefined, true), { ...input('area', 'Maydon (m²)', 'number', true), min: .01, step: .01 },
        input('equipment', 'Jihozlar', 'textarea', true), input('notes', 'Xona bo‘yicha izoh', 'textarea', true),
        choices('accessible', 'To‘siqsiz kirish', options({ yes: 'Mavjud', no: 'Moslashtirish kerak' })),
        choices('status', 'Holat', options(setupStatusLabels)),
      ]
      defaults = item ? { ...item, area: item.area?.toString() ?? '', status: item.status ?? 'active', accessible: item.accessible ? 'yes' : 'no' }
        : { centerId: id || centerFilter.value, accessible: '', status: 'active' }
      break
    }
    case 'staff': {
      const item = data.staff.find(row => row.id === id)
      if (!item) target.value = ''
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
        choices('serviceId', 'Xizmat', services.map(service => ({
          id: service.id, title: 'program' in service ? `${service.title} · ${service.program}` : service.title,
        }))),
        { ...input('capacity', 'O‘rinlar soni', 'number'), min: 1, max: 10000 },
        input('schedule', 'Ish jadvali'),
        choices('operator', 'Xizmatni kim ko‘rsatadi?', options({ center: 'Hududiy markaz', partner: 'Nodavlat ko‘rsatuvchi' })),
        choices('status', 'Holat', options(setupStatusLabels)),
        { ...choices('staffId', 'Mas’ul xodim', []), optional: true },
        input('sourceRef', 'Manba tizimidagi xizmat joyi IDsi', undefined, true),
      ]
      defaults = item ? { ...item, status: item.status ?? 'active', capacity: String(item.capacity) }
        : { roomId, serviceId: serviceFilter.value, operator: '', status: 'planned' }
      break
    }
    case 'provider': {
      const available = placements.value.filter(p => p.operator === 'partner' && !p.providerId)
      fields.value = [
        choices('placementId', 'Xizmat va xona', placementChoices(available)),
        input('name', 'Talabgor tashkilot nomi'), input('qualificationRef', 'Xizmat huquqi yoki malaka hujjati raqami'),
      ]
      if (available.length === 1) defaults = { placementId: available[0]!.id }
      break
    }
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
    default: return
  }
  values.value = defaults
  await nextTick()
  dialog.value?.showModal()
}

async function update(change: (data: CenterState) => void) {
  if (readError.value) throw new Error('Saqlangan demo ma’lumotlariga hozir yozib bo‘lmaydi.')
  if (!canManage.value || importedPage.value) throw new Error('Ushbu sahifada yozuvlarni o‘zgartirish huquqi yo‘q.')
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

function managedRecords(data: CenterState, kind: Editor) {
  return kind === 'center' ? data.centers : kind === 'room' ? data.rooms
    : kind === 'staff' ? data.staff : kind === 'placement' ? data.placements : undefined
}

function auditedSetup(data: CenterState, kind: Editor, id: string, draft: Record<string, string>, form: Field[], version: string) {
  const collection = managedRecords(data, kind)
  if (!collection) {
    applyEditor(data, kind, id, draft)
    return
  }
  const old = collection.find(item => item.id === id)
  if (JSON.stringify(old ?? null) !== version) {
    throw new Error('Yozuv tahrirlash vaqtida yangilangan. Kartani qayta oching.')
  }
  const previous = { ...old } as Record<string, unknown>
  applyEditor(data, kind, id, draft)
  const current = collection.find(item => item.id === id)
  if (!current) return
  const next = { ...current } as Record<string, unknown>
  const format = (field: Field, value: unknown) => {
    const text = typeof value === 'boolean' ? (value ? 'yes' : 'no') : String(value ?? '')
    return field.options?.find(item => item.id === text)?.title ?? text
  }
  const changes = form.flatMap(field => {
    const from = format(field, previous[field.key] ?? (old && field.key === 'status' ? 'active' : ''))
    const to = format(field, next[field.key])
    return from === to ? [] : [{ label: field.label, from, to }]
  })
  if (!changes.length) return
  const centerId = 'roomId' in current ? centerFor(data, current.id)?.id
    : 'centerId' in current ? current.centerId : current.id
  if (!centerId) return
  ;(data.setupHistory ??= []).push({
    id: crypto.randomUUID(), at: new Date().toISOString(),
    actor: auth.currentUser?.fullName ?? actor.value.name, centerId,
    entity: editorTitles[kind], label: 'serviceId' in current ? serviceName(current.serviceId) : current.name, changes,
  })
}

async function saveEditor() {
  if (saving.value || !editor.value) return
  saving.value = true
  const activeEditor = editor.value
  try {
    const form = shownFields.value
    const version = editingVersion.value
    const draft = Object.fromEntries(form.map(field => [field.key, String(values.value[field.key] ?? '').trim()]))
    const get = (key: string) => draft[key] ?? ''
    const id = target.value || crypto.randomUUID()
    for (const field of form) {
      if (!field.optional && !get(field.key)) throw new Error(`${field.label} maydonini to‘ldiring.`)
    }
    await update(data => auditedSetup(data, activeEditor, id, draft, form, version))
    dialog.value?.close()
  } catch (cause) {
    formError.value = cause instanceof Error ? cause.message : 'O‘zgarishni saqlab bo‘lmadi.'
  } finally {
    saving.value = false
  }
}

watch(() => props.pageKey, () => {
  notice.value = ''
  if (!readError.value) error.value = ''
  selected.value = undefined
  selectedPerson.value = ''
  referralList.reset()
  planList.reset()
  providerList.reset()
  qualityList.reset()
  financeList.reset()
  catalogueList.reset()
  overviewList.reset()
  integrationList.reset()
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
const integrationList = useRegistryList(() => integrations, item => ({ search: `${item.name} ${item.data}` }))
</script>

<template>
  <div class="regional-page" :class="{ 'registry-page': pageKey !== 'overview' }">
    <nav v-if="page.group === 'setup'" class="setup-navigation" aria-label="Boshqaruv bo‘limlari">
      <RouterLink v-for="item in regionalAdministrationPages" :key="item.key" :to="location(item.path)" :aria-current="pageKey === item.key ? 'page' : undefined">
        <component :is="item.icon" :size="16" aria-hidden="true" />{{ item.title }}
      </RouterLink>
    </nav>

    <p v-if="notice" class="message" role="status">{{ notice }}</p>
    <p v-if="error" class="message error" role="alert">{{ error }}</p>

    <div v-if="pageKey === 'overview'" class="overview-toolbar">
      <RegistryFilterMenu label="Monitoring filtrlari" align="start" :active="scopeFilters.active">
        <div class="overview-filter-fields">
          <RegistryScopeFields :scope="scopeFilters" />
          <label>Davr boshi <input v-model="from" type="date" :max="to || undefined"></label>
          <label>Davr oxiri <input v-model="to" type="date" :min="from || undefined"></label>
          <div class="period-buttons" role="group" aria-label="Hisobot davri">
            <button v-for="days in [7, 14, 30]" :key="days" type="button" :aria-pressed="to === date && from === relativeDate(date, 1 - days)" @click="selectPeriod(days)">{{ days }} kun</button>
          </div>
        </div>
      </RegistryFilterMenu>
      <span class="muted">{{ displayDate(from) }} – {{ displayDate(to) }}</span>
      <button type="button" class="button compact" @click="exportOverview"><Download :size="16" aria-hidden="true" /> Excel hisobot</button>
    </div>

    <template v-if="pageKey === 'overview'">
      <LeadershipDashboard :state="state" :placements="placements" :visible-days="visibleDays" :period-days="periodDays"
        :today="date" :from="from" :to="to" :metrics="summary" :location="location">
        <template #data-flow>
          <ServiceFlow :flows="dataFlows" :scope="JSON.stringify([regionFilter, centerFilter, serviceFilter, from, to])" :location="location" />
        </template>
      </LeadershipDashboard>
      <MonitoringRegionMap :rows="mapRows" :selected="regionFilter" :has-comparison="!!priorPeriod" @select="filterBy('region', $event)" />
      <PortfolioAnalysis :services="byService" :from="from" :to="to"
        :has-comparison="!!priorPeriod" :location="location" />
      <section class="overview-service-panel">
        <div class="section-heading">
          <div><h2>Xizmatlar kesimida holat</h2><p>Bandlik va navbat joriy holatni, tashriflar tanlangan davrni aks ettiradi.</p></div>
          <dl class="mini-stats">
            <div><dt>Birinchi xizmatgacha</dt><dd>{{ waitingDays }}</dd></div>
            <div><dt>Yakunlangan rejalar</dt><dd>{{ outcomes }}</dd></div>
          </dl>
        </div>
        <RegistryList :list="overviewList" label="Xizmat joylari" search="Markaz, xona yoki xizmat" :statuses="{ active: 'Faol', inactive: 'Faol emas' }">
          <div class="table-scroll" tabindex="0" role="region" aria-label="Xizmat joylari jadvali">
            <table>
              <thead><tr><th>Markaz va xizmat</th><th>Bandlik</th><th>Navbat</th><th>Tashriflar</th><th>Holat</th></tr></thead>
              <tbody>
                <tr v-for="{ item, used, active, queued, count } in overviewList.result.items" :key="item.id">
                  <td>
                    <RouterLink class="text-link" :to="location('/centers', { center: centerFor(state, item.id)?.id ?? '', service: item.serviceId, placement: item.id })">{{ serviceName(item.serviceId) }}</RouterLink>
                    <small>{{ centerFor(state, item.id)?.name }} · {{ roomById(item.roomId)?.name }}</small>
                  </td>
                  <td><div class="occupancy"><progress :value="used" :max="item.capacity" :aria-label="serviceName(item.serviceId) + ' bandligi'" /><span>{{ used }} / {{ item.capacity }}</span></div></td>
                  <td>{{ queued }}</td><td>{{ count }}</td>
                  <td><span class="badge" :data-tone="active ? 'positive' : 'neutral'">{{ active ? 'Faol' : 'Faol emas' }}</span></td>
                </tr>
                <tr v-if="!overviewList.result.totalCount"><td colspan="5" class="empty">Filtr bo‘yicha xizmat joylari topilmadi.</td></tr>
              </tbody>
            </table>
          </div>
        </RegistryList>
      </section>
    </template>

    <template v-else-if="pageKey === 'visits' || pageKey === 'passports'">
      <AttendanceDesk :mode="quotaUsage ? 'usage' : pageKey" :state="state" :placements="placements"
        :actor="actor" :busy="saving" :read-only="!canManage" :referral-id="referralFilter" :visit-id="visitFilter" :recipient-id="recipientFilter"
        :people="people" :scope-filters="scopeFilters" :mutation-error="error" :range-start="String(route.query.from ?? '')" :range-end="String(route.query.to ?? '')"
        @change="run" @open-person="openPerson">
        <template v-if="pageKey === 'passports' || referralFilter || visitFilter" #toolbar>
          <RouterLink v-if="quotaUsage" class="text-link" :to="location('/capacity', { placement: placementFilter })">Pasportlar reyestriga o‘tish</RouterLink>
          <RouterLink v-else-if="pageKey === 'passports'" class="text-link" :to="location('/capacity', { view: 'usage', placement: placementFilter })">Kunlik foydalanishni ko‘rish</RouterLink>
          <RouterLink v-else class="text-link" :to="location('/visits')">Tashriflar reyestriga qaytish</RouterLink>
        </template>
      </AttendanceDesk>
    </template>

    <CenterAdministration v-else-if="pageKey === 'centers'" :centers="centers" :state="state" :today="date"
      :editable="canManage" :scope-filters="scopeFilters" :service-id="serviceFilter" :placement-id="placementFilter" :location="location"
      @edit="openEditor" @add-service="openEditor('placement', '', $event)" />

    <template v-else-if="pageKey === 'services'">
      <section class="registry-panel">
        <RegistryList :list="catalogueList" fill :scope-filters="scopeFilters" label="Xizmat turlari" search="Xizmat, dastur yoki hujjat">
          <div class="table-scroll">
            <table>
              <thead><tr><th>Xizmat</th><th>Maqsadli guruh</th><th>Ma’lumot manbasi</th><th>Huquqiy asos</th><th>Xizmat joylari</th></tr></thead>
              <tbody><tr v-for="service in catalogueList.result.items" :key="service.id">
                <td><strong>{{ service.title }}</strong><small v-if="'program' in service">{{ service.program }}</small></td><td>{{ service.group }}</td><td>{{ service.source }}</td>
                <td><a class="text-link" :href="service.url" target="_blank" rel="noopener">{{ service.law }} ↗</a></td>
                <td><RouterLink class="text-link" :to="location('/centers', { region: '', center: '', service: service.id })">Biriktirmalarni ko‘rish</RouterLink></td>
              </tr><tr v-if="!catalogueList.result.totalCount"><td colspan="5" class="empty">Xizmatlar topilmadi.</td></tr></tbody>
            </table>
          </div>
        </RegistryList>
      </section>
    </template>

    <section v-else-if="pageKey === 'providers'" class="registry-panel">
      <RegistryList :list="providerList" fill :scope-filters="scopeFilters" label="Talabgorlar" search="Ko‘rsatuvchi, hujjat yoki ijara" :statuses="providerLabels" date-sort>
        <template v-if="canManage" #toolbar>
          <button type="button" class="button primary compact" @click="openEditor('provider')"><Plus :size="16" aria-hidden="true" /> Talabgor qo‘shish</button>
        </template>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Talabgor</th><th>Xizmat va markaz</th><th>So‘rovnoma</th><th>Qaror va holat</th><th>Ijara</th><th>Amal</th></tr></thead>
            <tbody>
              <tr v-for="item in providerList.result.items" :key="item.id">
                <td><strong>{{ item.name }}</strong><small>{{ item.qualificationRef }}</small></td>
                <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
                <td>{{ displayDate(item.submitted) }}
                  <small v-if="item.status === 'new' && hasCompetition(state, item)">Guruh qarori · {{ displayDate(workingDayDeadline(item.submitted, 10)) }} gacha</small>
                </td>
                <td><span class="badge" :data-tone="item.status === 'registered' ? 'positive' : item.status === 'rejected' ? 'danger' : 'info'">{{ providerLabels[item.status] }}</span>
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
                  <button v-if="canManage && item.status === 'new'" class="text-link" @click="openEditor('decision', item.id)">{{ hasCompetition(state, item) ? 'Guruh qarorini kiritish' : 'Qarorni kiritish' }}</button>
                  <button v-if="canManage && item.status === 'registered'" class="text-link" @click="openEditor('lease', item.id)">{{ item.lease ? 'Ijarani tahrirlash' : 'Ijara kiritish' }}</button>
                </td>
              </tr>
              <tr v-if="!providerList.result.totalCount"><td colspan="6" class="empty">Talabgorlar topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </RegistryList>
    </section>

    <template v-else-if="pageKey === 'referrals' || pageKey === 'delivery'">
      <section v-if="pageKey === 'referrals'" class="registry-panel">
        <RegistryList :list="referralList" fill :scope-filters="scopeFilters" label="Yo‘llanmalar" search="F.I.Sh., kod yoki yo‘llanma raqami" :statuses="referralLabels" date-sort>
          <div class="table-scroll">
            <table>
              <thead><tr><th>Xizmat oluvchi</th><th>Xizmat joyi</th><th>Yo‘llanmadagi hudud va markaz</th><th>Sana va kanal</th><th>Holat</th></tr></thead>
              <tbody>
                <tr v-for="item in referralList.result.items" :key="item.id">
                  <td>
                    <PersonLink :code="item.beneficiary" :name="people.get(item.beneficiary)?.fullName" @open="openPerson" />
                    <small>{{ item.reference }} · {{ item.funding === 'paid' ? 'Pullik' : 'Imtiyozli' }}</small>
                    <div class="record-links">
                      <button type="button" class="text-link" @click="openHistory(item.id)">Murojaat tarixi</button>
                      <RouterLink v-if="planStatus(item.status)" class="text-link" :to="location('/delivery', { referral: item.id })">Individual reja</RouterLink>
                    </div>
                  </td>
                  <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
                  <td>{{ item.residence }}<small>{{ item.issuer || 'Bevosita murojaat' }}</small></td>
                  <td>{{ displayDate(item.created) }}<small>{{ item.channel }}</small></td>
                  <td><span class="badge" :data-tone="statusTones[item.status]">{{ referralLabels[item.status] }}</span>
                    <small v-if="item.status === 'queued'">Navbatda {{ queueFor(state, item.placementId).findIndex(row => row.id === item.id) + 1 }}-o‘rin</small>
                  </td>
                </tr>
                <tr v-if="!referralList.result.totalCount" key="no-referrals"><td colspan="5" class="empty">Murojaatlar topilmadi.</td></tr>
              </tbody>
            </table>
          </div>
        </RegistryList>
      </section>
      <template v-else>
        <section class="registry-panel">
          <RegistryList :list="planList" fill :scope-filters="scopeFilters" label="Individual rejalar" search="F.I.Sh., kod yoki mutaxassis" :statuses="planStatuses" date-sort>
            <template v-if="referralFilter" #toolbar>
              <RouterLink class="text-link" :to="location('/delivery')">Barcha rejalar</RouterLink>
            </template>
            <div class="table-scroll">
              <table>
                <thead><tr><th>Xizmat oluvchi</th><th>Reja va baholashlar</th><th>Qayta baholash</th><th>Tashriflar</th></tr></thead>
                <tbody>
                  <tr v-for="item in planList.result.items" :key="item.id">
                    <td><PersonLink :code="item.beneficiary" :name="people.get(item.beneficiary)?.fullName" @open="openPerson" /><small>{{ placementLabel(item.placementId) }}</small></td>
                    <td>
                      <details v-if="item.plan" class="plan-history" :open="referralFilter === item.id || undefined">
                        <summary>Rejani ko‘rish</summary>
                        <dl v-for="(plan, index) in [item.plan, ...(item.previousPlans ?? []).slice().reverse()]" :key="index">
                          <dt>Versiya</dt><dd>{{ index === 0 ? 'Joriy reja' : 'Avvalgi reja' }}</dd>
                          <dt v-if="index > 0">Qayta baholash</dt><dd v-if="index > 0">{{ displayDate(plan.reviewDate) }}</dd>
                          <template v-if="plan.assessment"><dt>Baholash</dt><dd>{{ plan.assessment }}</dd></template>
                          <dt>Maqsad</dt><dd>{{ plan.goal }}</dd>
                          <dt>Mutaxassis</dt><dd>{{ plan.specialist }}</dd>
                          <template v-if="plan.outcome"><dt>Natija</dt><dd>{{ plan.outcome }}</dd></template>
                          <template v-if="plan.disposition"><dt>Qaror</dt><dd>{{ outcomeLabels[plan.disposition] }}</dd></template>
                        </dl>
                      </details>
                      <span v-else>Reja tuzilmagan</span>
                    </td>
                    <td>{{ displayDate(item.plan?.reviewDate ?? '') }}<small v-if="item.status === 'active' && item.plan && item.plan.reviewDate <= date">Baholash muddati kelgan</small></td>
                    <td><RouterLink class="text-link" :to="location('/visits', { referral: item.id })">Tashriflarni ko‘rish</RouterLink></td>
                  </tr>
                  <tr v-if="!planList.result.totalCount"><td colspan="4" class="empty">Individual rejalar topilmadi.</td></tr>
                </tbody>
              </table>
            </div>
          </RegistryList>
        </section>
      </template>
      <dialog v-if="pageKey === 'referrals' && selectedReferral" ref="historyDialog" class="editor" aria-labelledby="hixm-history-title" @close="selected = undefined">
        <div class="section-heading">
          <div><h2 id="hixm-history-title">Murojaat tarixi</h2><p>{{ selectedReferral.reference }} · {{ placementLabel(selectedReferral.placementId) }}</p></div>
          <button type="button" class="button compact" @click="historyDialog?.close()">Yopish</button>
        </div>
        <ol class="history">
          <li v-for="(event, index) in selectedReferral.history" :key="index"><time :datetime="event.date">{{ displayDate(event.date) }}</time>{{ event.label }}</li>
        </ol>
      </dialog>
    </template>

    <section v-else-if="pageKey === 'quality'" class="registry-panel">
      <RegistryList :list="qualityList" fill :scope-filters="scopeFilters" label="Sifat nazorati" search="Qayd turi, tavsif yoki xizmat" :statuses="qualityStatuses" date-sort>
        <template #toolbar>
          <a class="text-link" href="https://lex.uz/docs/8409767" target="_blank" rel="noopener">Inspeksiya mezonlari ↗</a>
        </template>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Qayd turi</th><th>Xizmat joyi</th><th>Tavsif</th><th>Muddat yoki baho</th><th>Holat</th></tr></thead>
            <tbody>
              <tr v-for="item in qualityList.result.items" :key="item.id">
                <td><strong>{{ findingKinds[item.kind] }}</strong><small>{{ displayDate(item.date) }}</small></td>
                <td>{{ placementLabel(item.placementId) }}<small>{{ centerFor(state, item.placementId)?.name }}</small></td>
                <td>{{ item.note }}<small v-if="item.resolution">{{ item.resolution }}</small></td>
                <td>{{ item.score ? item.score + ' / 5' : displayDate(item.due) }}</td>
                <td><span class="badge" :data-tone="item.status === 'open' ? (item.due < date ? 'danger' : 'warning') : 'positive'">{{ item.status === 'open' ? (item.due < date ? 'Muddati o‘tgan' : 'Ochiq') : 'Yopilgan' }}</span></td>
              </tr>
              <tr v-if="!qualityList.result.totalCount"><td colspan="5" class="empty">Sifat nazorati qaydlari topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </RegistryList>
    </section>

    <template v-else-if="pageKey === 'finance'">
      <div class="metrics finance-metrics">
        <div v-for="(label, key) in financeLabels" :key="key" class="metric" :data-tone="key === 'paid' ? 'positive' : key === 'confirmed' ? 'purple' : 'info'"><div class="metric-title">{{ label }}</div><div class="metric-value"><AnimatedNumber :value="totals(key, financeInView)" suffix=" so‘m" /></div></div>
      </div>
      <section class="registry-panel">
        <RegistryList :list="financeList" fill :scope-filters="scopeFilters" label="Moliyaviy qaydlar" search="Hujjat raqami, F.I.Sh. yoki to‘lov turi" :statuses="financeLabels" date-sort>
          <template v-if="route.query.from || route.query.to" #toolbar>
            <span class="muted">{{ displayDate(String(route.query.from ?? '')) }} – {{ displayDate(String(route.query.to ?? '')) }}</span>
          </template>
          <div class="table-scroll">
            <table>
              <thead><tr><th>Hujjat</th><th>Xizmat oluvchi</th><th>Davomat asosi</th><th>Turi</th><th>Summa</th><th>Holat</th></tr></thead>
              <tbody>
                <tr v-for="item in financeList.result.items" :key="item.id">
                  <td>{{ item.reference }}</td>
                  <td><PersonLink v-if="beneficiaryForVisit(item.visitId)" :code="beneficiaryForVisit(item.visitId)"
                    :name="people.get(beneficiaryForVisit(item.visitId))?.fullName" @open="openPerson" /><span v-else>—</span></td>
                  <td><RouterLink v-if="visitsById.has(item.visitId)" class="text-link" :to="location('/visits', { visit: item.visitId })">Tasdiqni ochish</RouterLink><span v-else>—</span></td>
                  <td>{{ financeKinds[item.kind] }}</td>
                  <td>{{ money(item.amount) }}</td><td><span class="badge" :data-tone="item.status === 'paid' ? 'positive' : item.status === 'confirmed' ? 'purple' : 'info'">{{ financeLabels[item.status] }}</span></td>
                </tr>
                <tr v-if="!financeList.result.totalCount"><td colspan="6" class="empty">Moliyaviy qaydlar topilmadi.</td></tr>
              </tbody>
            </table>
          </div>
        </RegistryList>
      </section>
    </template>

    <template v-else>
    <section class="panel">
      <div class="section-heading">
        <div><h2>Xizmat joylari mosligi</h2><p>{{ state.placements.length }} ta xizmat joyidan {{ state.placements.filter(item => item.sourceRef).length }} tasida tashqi ID kiritilgan.</p></div>
        <RouterLink class="button compact" :to="location('/centers', { region: '', center: '', service: '' })">Markazlar va xizmatlar</RouterLink>
      </div>
    </section>
    <section class="registry-panel">
      <RegistryList :list="integrationList" fill label="Manba tizimlari" search="Tizim yoki ma’lumot nomi">
        <div class="table-scroll">
          <table>
            <thead><tr><th>Manba</th><th>Almashiladigan ma’lumot</th><th>Holat</th></tr></thead>
            <tbody>
              <tr v-for="item in integrationList.result.items" :key="item.name">
                <td><strong>{{ item.name }}</strong><small v-if="item.route && auth.hasPermission('ei.view')"><RouterLink class="text-link" :to="item.route">NASP moduliga o‘tish ↗</RouterLink></small></td>
                <td>{{ item.data }}</td><td><span class="badge">Ulanmagan</span></td>
              </tr>
              <tr v-if="!integrationList.result.totalCount"><td colspan="3" class="empty">Manba topilmadi.</td></tr>
            </tbody>
          </table>
        </div>
      </RegistryList>
    </section>
    </template>

    <PersonCard v-if="selectedPerson" :code="selectedPerson"
      :person="personReferrals.length ? people.get(selectedPerson) : undefined"
      :residence-from-referral="personResidence" :today="date" :records="personRecords" @close="selectedPerson = ''" />

    <dialog ref="dialog" class="editor" aria-labelledby="regional-editor-title" @cancel="saving && $event.preventDefault()">
      <form class="editor-form" @submit.prevent="saveEditor">
        <header><h2 id="regional-editor-title">{{ editor ? editorTitles[editor] : '' }}</h2></header>
        <p class="muted">Demo yozuvi brauzerda saqlanadi.</p>
        <p v-if="editor === 'decision' && state.providers.some(item => item.id === target && hasCompetition(state, item))" class="muted">Bir nechta talabgor mavjud. O‘rganish guruhi qarori raqamini kiriting.</p>
        <div class="editor-fields">
          <label v-for="field in shownFields" :key="field.key">
            {{ field.label }}
            <select v-if="field.type === 'select'" v-model="values[field.key]" :aria-label="field.label" :required="!field.optional">
              <option value="">{{ field.optional ? 'Belgilanmagan' : (field.options?.length ? 'Tanlang' : 'Tanlash uchun yozuv mavjud emas') }}</option>
              <option v-for="option in field.options" :key="option.id" :value="option.id">{{ option.title }}</option>
            </select>
            <textarea v-else-if="field.type === 'textarea'" v-model="values[field.key]" rows="3" maxlength="600" :required="!field.optional" />
            <input v-else v-model="values[field.key]" :type="field.type ?? 'text'" :required="!field.optional" :min="field.min" :max="field.max" :step="field.type === 'number' ? (field.step ?? 1) : undefined" maxlength="150"
              :aria-label="field.key === 'sourceRef' ? field.label : undefined" :aria-describedby="field.key === 'sourceRef' && formService ? 'hixm-source-ref-help' : undefined">
            <small v-if="field.key === 'sourceRef' && formService" id="hixm-source-ref-help">Ma’lumot manbasi · {{ formService.source }}. Manbadagi aynan shu xizmat joyi identifikatorini kiriting.</small>
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
