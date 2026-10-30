<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from 'reka-ui'
import FilterPopover from '@/shared/components/FilterPopover.vue'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Database,
  Download,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  FileCheck2,
  Landmark,
  Layers3,
  ListChecks,
  Network,
  RefreshCw,
  Search,
  Send,
  ServerCog,
  ShieldCheck,
  TicketCheck,
  UploadCloud,
  UsersRound,
  WalletCards,
  X,
  XCircle,
  Zap,
} from 'lucide-vue-next'
import {
  applicantRoleOptions,
  beneficiaryCategoryOptions,
  carrierOptions,
  contingentEventTypeOptions,
  countryOptions,
  disabilityEquivalenceOptions,
  fareClassOptions,
  getReferenceCatalog,
  legTypeOptions,
  participantEquivalenceOptions,
  referenceCatalogs,
  returnReasonOptions,
  sourceOrganizationOptions,
  ticketEventTypeOptions,
  transportModeOptions,
  type ReferenceCatalogFamily,
  type ReferenceEntry,
} from '@/features/transport-benefits/reference-data'
import { useAuthStore } from '@/stores/auth'
import PageContainer from '@/shared/components/PageContainer.vue'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import ReimbursementPanel from './ReimbursementPanel.vue'
import { userLabel } from '../ui-labels'
import { financeApiDefinitions } from '../finance-api-contracts'
import IntegrationExplorer from './IntegrationExplorer.vue'
import TransportStatusCard from '../components/TransportStatusCard.vue'
import GroupedReport from '../components/GroupedReport.vue'
import type { GroupableRow } from '../grouped-report'
import { transportPalette, transportStatusTone } from '../status-presentation'

type ContingentEventType = 'RIGHT_GRANTED' | 'RIGHT_CORRECTED' | 'RIGHT_REVOKED' | 'RIGHT_REINSTATED'
type ContingentEventStatus = 'Faol' | 'Nofaol' | 'Foydalangan'
type TicketEventType = 'ISSUED' | 'RETURNED' | 'CARRIER_CANCELLED' | 'VOIDED' | 'RESCHEDULED' | 'TRAVELLED' | 'NO_SHOW'
type TicketEventStatus = 'Qabul qilindi' | 'Qayta ishlanmoqda' | 'Rad etildi'
type TransportMode = 'RAIL' | 'AIR' | 'BUS'
type FeedbackTone = 'success' | 'error' | 'info'
type ReservationStatus = 'HELD' | 'CONSUMED' | 'RESTORE_REVIEW' | 'RELEASED' | 'RESTORED'
type EntitlementLegState = 'AVAILABLE' | 'HELD' | 'CONSUMED' | 'RESTORE_REVIEW' | 'RESTORED'
type ReturnReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'METHODOLOGY_PENDING'

interface ContingentEvent {
  personKey?: string
  documentNumber?: string
  documentId?: string
  documentDate?: string
  birthDate?: string
  categoryCode?: string
  revocationReason?: string
  revokedAt?: string
  id: string
  receivedAt: string
  source: string
  sourceCode: string
  pinfl: string
  person: string
  category: string
  legalBasis: string
  eventType: ContingentEventType
  version: number
  effectiveFrom: string
  status: ContingentEventStatus
}

interface EligibilityDecision {
  id: string
  createdAt: string
  pinfl: string
  person: string
  transportMode: TransportMode
  requestedLeg?: 'OUTBOUND' | 'RETURN'
  bundleId?: string
  route: string
  result: 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'MANUAL_DOCUMENT_REQUIRED'
  benefit: string
  legalBasis?: string
  ruleSummary?: string
  remainingLimit?: string
  principal?: string
  principalReservationId?: string
  reservationId?: string
  reservationExpiresAt?: string
}

interface TicketEvent {
  carrierInn?: string
  beneficiaryCategoryCode?: string
  beneficiarySource?: string
  documentNumber?: string
  documentId?: string
  documentDate?: string
  passengerName?: string
  passengerBirthDate?: string
  ticketIssuedAt?: string
  id: string
  occurredAt: string
  ticketId: string
  reservationId: string
  carrier: string
  transportMode: TransportMode
  eventType: TicketEventType
  ticketState: 'DRAFT' | 'ISSUED' | 'TRAVELLED' | 'RETURN_PENDING' | 'RETURNED' | 'RETURN_DEADLINE_EXPIRED' | 'CARRIER_CANCELLED' | 'NO_SHOW' | 'EXCHANGED' | 'VOID' | 'ERROR' | 'RECONCILIATION'
  passenger: string
  passengerRole: 'BENEFICIARY' | 'COMPANION'
  benefitSnapshot: string
  authorizationSource: 'ONLINE' | 'MANUAL_DOCUMENT'
  legType: 'OUTBOUND' | 'RETURN'
  principalLink?: string
  route: string
  departureAt: string
  serviceNumber: string
  ticketClass: string
  amount: number
  preferentialAmount: number
  upgradeSurcharge: number
  passengerPaidAmount: number
  compensationRequested: number
  evidenceRef: string
  paymentChannel: 'MONTHLY_CLAIM' | 'SOCIAL_CARD_REALTIME'
  ledgerEffect: string
  settlementAction: string
  reason?: string
  serviceCancelledAt?: string
  returnedAt?: string
  returnDeadline?: string
  returnReviewStatus?: ReturnReviewStatus
  returnReviewRef?: string
  rescheduleChainId?: string
  rescheduleAuthorizationRef?: string
  previousTicketId?: string
  status: TicketEventStatus
}


interface ManualVerificationCase {
  id: string
  createdAt: string
  subjectPinfl: string
  pinfl: string
  transportMode: TransportMode
  origin: string
  destination: string
  departureDate: string
  serviceNumber: string
  legType?: 'OUTBOUND' | 'RETURN'
  carrierCode?: string
  carrierName?: string
  offerId?: string
  policySnapshot?: string
  allowedFareClasses?: string[]
  discountPercent?: number
  maxEligibleBase?: number
  documentType: string
  documentReference: string
  documentIssuer: string
  issuedAt: string
  validTo: string
  reviewer: string
  authorizationRef?: string
  authorizationExpiresAt?: string
  authorizationConsumedAt?: string
  reservationId?: string
  status: 'Ko‘rib chiqilmoqda' | 'Tasdiqlandi' | 'Rad etildi'
}

interface ReservationAuthorization {
  authorizationSource: 'ONLINE' | 'MANUAL_DOCUMENT'
  personPinfl: string
  transportMode: TransportMode
  carrierCode: string
  carrierName: string
  origin: string
  destination: string
  departureDate: string
  serviceNumber: string
  entitlementKey: string
  legType: 'OUTBOUND' | 'RETURN'
  offerId: string
  policySnapshot: string
  allowedFareClasses: string[]
  discountPercent: number
  maxEligibleBase: number
  expiresAt?: string
  status: ReservationStatus
  companionLink?: string
}

interface EntitlementBundle {
  bundleId: string
  benefitYear: number
  lockedTransportMode?: TransportMode
  legs: Record<'OUTBOUND' | 'RETURN', EntitlementLegState>
  activeReservations: Partial<Record<'OUTBOUND' | 'RETURN', string>>
}

interface CompanionTripSlot {
  principalReservationId: string
  companionPinfl?: string
  companionReservationId?: string
  status: 'AVAILABLE' | 'HELD' | 'CONSUMED' | 'RESTORE_REVIEW' | 'RESTORED' | 'INVALIDATED'
}

interface ApiDefinition {
  id: string
  method: string
  endpoint: string
  title: string
  description: string
  consumers: string
  variants: string[]
  sample: string
  response?: string
}

const props = withDefaults(defineProps<{
  pageKey?: string
}>(), {
  pageKey: 'dashboard',
})

const authStore = useAuthStore()
const returnReviewAuthority = computed(() => {
  const actor = authStore.currentUser
  if (!actor || !authStore.hasPermission('transport-benefits.return-review') || !actor.organizationId || !actor.signatureRef) return null
  return {
    actorId: actor.id,
    organizationId: actor.organizationId,
    role: actor.role,
    signatureRef: actor.signatureRef,
  }
})
const canDecideReturnReview = computed(() => Boolean(returnReviewAuthority.value))

const isDashboard = computed(() => props.pageKey === 'dashboard')
const isContingents = computed(() => props.pageKey === 'contingents')
const isMvpPlan = computed(() => props.pageKey === 'mvp-plan')
const isEligibility = computed(() => props.pageKey === 'eligibility')
const isTicketEvents = computed(() => props.pageKey === 'ticket-events')
const isSettlements = computed(() => props.pageKey === 'settlements')
const isReferences = computed(() => props.pageKey.startsWith('reference-'))
const ticketFormOpen = ref(false)
const ticketDetailsOpen = ref(false)
const selectedTicketEventId = ref('')
const selectedTicketRecord = computed(() => ticketEvents.value.find(event => event.id === selectedTicketEventId.value))
const contingentFilterOpen = ref(false)
const contingentDetailsOpen = ref(false)
const selectedContingentId = ref('')
const selectedContingent = computed(() => contingentEvents.value.find(event => event.id === selectedContingentId.value))
function contingentAge(birthDate?: string) {
  if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return '—'
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  const [year, month, day] = birthDate.split('-').map(Number)
  const [currentYear, currentMonth, currentDay] = today.split('-').map(Number)
  if (!year || !month || !day || !currentYear || !currentMonth || !currentDay) return '—'
  const age = currentYear - year - Number(currentMonth < month || (currentMonth === month && currentDay < day))
  return age >= 0 && age <= 130 ? String(age) : '—'
}
const contingentCategoryCode = (event: ContingentEvent) => event.categoryCode || beneficiaryCategoryOptions.find(option => option.label === event.category)?.code || '—'
const contingentCategoryName = (event: ContingentEvent) => beneficiaryCategoryOptions.find(option => option.code === event.categoryCode)?.label || event.category.replace(/\s+—\s+[A-Z][A-Z0-9_]*$/, '')
const isWorkspacePage = computed(() => isSettlements.value || isContingents.value || isTicketEvents.value || isReferences.value)
const isIntegrations = computed(() => props.pageKey === 'integrations')
const fieldClass = 'h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/25'
const feedback = ref<{ tone: FeedbackTone, message: string } | null>(null)
let feedbackTimer: number | undefined

function showFeedback(tone: FeedbackTone, message: string) {
  feedback.value = { tone, message }
  window.clearTimeout(feedbackTimer)
  feedbackTimer = window.setTimeout(() => {
    feedback.value = null
  }, 2800)
}

function transactionTimestamp() {
  return new Date().toISOString()
}

function parseAuditTimestamp(value: string) {
  const direct = Date.parse(value)
  if (!Number.isNaN(direct)) return direct
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/)
  if (!match) return Number.NaN
  const [, day, month, year, hour, minute] = match
  return Date.parse(`${year}-${month}-${day}T${hour}:${minute}:00+05:00`)
}

function parseDateTimeLocal(value: string) {
  return value ? Date.parse(`${value}:00+05:00`) : Number.NaN
}

// Synthetic demo cases: one beneficiary per supplied category.
const contingentDemoPeople = [
  {
    "person": "AZIZOV JAMSHID RUSTAMOVICH",
    "birthDate": "1925-01-15"
  },
  {
    "person": "KARIMOVA MALIKA TURSUNOVNA",
    "birthDate": "1926-05-12"
  },
  {
    "person": "ERGASHEV OLIM SOBIROVICH",
    "birthDate": "1957-03-22"
  },
  {
    "person": "SODIQOV BAHODIR ANVAROVICH",
    "birthDate": "1963-08-09"
  },
  {
    "person": "RASULOV NODIR KOMILOVICH",
    "birthDate": "1928-11-17"
  },
  {
    "person": "USMONOV TOHIR AKMALOVICH",
    "birthDate": "1965-02-28"
  },
  {
    "person": "ABDULLAYEV SHAVKAT IKROMOVICH",
    "birthDate": "1927-07-04"
  },
  {
    "person": "QODIROVA DILBAR MURODOVNA",
    "birthDate": "1929-06-18"
  },
  {
    "person": "RAHIMOV ANVAR ABDULLAYEVICH",
    "birthDate": "1948-12-25"
  },
  {
    "person": "ISMOILOVA NARGIZA OLIMOVNA",
    "birthDate": "1953-04-11"
  },
  {
    "person": "TURSUNOV BEKZOD SHAVKATOVICH",
    "birthDate": "1960-09-30"
  },
  {
    "person": "YUSUPOVA SAODAT KARIMOVNA",
    "birthDate": "1955-10-30"
  },
  {
    "person": "MIRZAYEV AKMAL BAHODIROVICH",
    "birthDate": "1958-11-02"
  }
]
const contingentEvents = ref<ContingentEvent[]>(beneficiaryCategoryOptions.map((category, index) => {
  const person = contingentDemoPeople[index]!
  const source = sourceOrganizationOptions[index % sourceOrganizationOptions.length]!
  const status: ContingentEventStatus = (['Faol', 'Nofaol', 'Foydalangan'] as const)[index % 3]!
  return {
    id: String(index + 1).padStart(3, '0'),
    documentNumber: '2026-2610' + String(index + 1).padStart(2, '0'),
    documentId: String(index + 1).padStart(3, '0'),
    documentDate: '2026-10-30', receivedAt: '30.10.2026 10:00',
    source: source.label, sourceCode: source.code,
    pinfl: String(index % 2 ? 4 : 3) + person.birthDate.slice(8, 10) + person.birthDate.slice(5, 7) + '•••••••' + String(index + 1).padStart(2, '0'),
    personKey: 'demo-person-' + String(index + 1),
    person: person.person, birthDate: person.birthDate,
    category: category.label, categoryCode: category.code, legalBasis: '',
    eventType: status === 'Nofaol' ? 'RIGHT_REVOKED' : 'RIGHT_GRANTED',
    version: 1, effectiveFrom: '01.10.2026', status,
    ...(status === 'Nofaol' ? { revocationReason: 'Manba tashkilot ma’lumotiga asosan imtiyoz huquqi bekor qilingan', revokedAt: '30.10.2026' } : {}),
  }
}))

const contingentSearch = ref('')
const contingentSourceFilter = ref('Barchasi')
const contingentStatusFilter = ref('Barchasi')
const contingentCategoryFilter = ref('')
const contingentRevocationReason = ref('')
const contingentRevokedFrom = ref('')
const contingentRevokedTo = ref('')
const contingentPage = ref(1)
const contingentPageSize = ref(10)
const contingentDownloading = ref(false)
const contingentRevocationReasons = computed(() => [...new Set(contingentEvents.value.map(event => event.revocationReason).filter((reason): reason is string => Boolean(reason)))])
function contingentRevokedDate(event: ContingentEvent) {
  const value = event.revokedAt || ''
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  const [day, month, year] = value.split('.')
  return year && month && day ? year + '-' + month + '-' + day : ''
}
const contingentDateFrom = ref('')
const contingentDateTo = ref('')
const contingentReportOpen = ref(false)
const contingentDateRangeInvalid = computed(() => Boolean((contingentDateFrom.value && contingentDateTo.value && contingentDateFrom.value > contingentDateTo.value) || (contingentRevokedFrom.value && contingentRevokedTo.value && contingentRevokedFrom.value > contingentRevokedTo.value)))
const contingentFilterCount = computed(() => Number(contingentSourceFilter.value !== 'Barchasi') + Number(contingentStatusFilter.value !== 'Barchasi') + [contingentCategoryFilter.value, contingentDateFrom.value, contingentDateTo.value, contingentRevocationReason.value, contingentRevokedFrom.value, contingentRevokedTo.value].filter(Boolean).length)
function clearContingentFilters() {
  contingentSourceFilter.value = 'Barchasi'; contingentStatusFilter.value = 'Barchasi'; contingentCategoryFilter.value = ''; contingentDateFrom.value = ''; contingentDateTo.value = ''; contingentRevocationReason.value = ''; contingentRevokedFrom.value = ''; contingentRevokedTo.value = ''
}
function contingentDocumentDate(event: ContingentEvent) {
  if (event.documentDate) return event.documentDate
  const [day, month, year] = event.receivedAt.split(' ')[0]!.split('.')
  return year && month && day ? year + '-' + month + '-' + day : ''
}
function uniqueContingentPeople(events: ContingentEvent[]) {
  const people = new Map<string, ContingentEvent>()
  for (const event of events) {
    // Do not deduplicate masked identifiers without a stable person key.
    const key = /^\d{14}$/.test(event.pinfl) ? event.pinfl : event.personKey || 'record:' + event.id
    const previous = people.get(key)
    const stamp = (item: ContingentEvent) => contingentDocumentDate(item) + ' ' + (item.receivedAt.split(' ')[1] || '')
    if (!previous || stamp(event) > stamp(previous) || (stamp(event) === stamp(previous) && event.version > previous.version)) people.set(key, event)
  }
  return [...people.values()]
}
const isContingentDialogOpen = ref(false)
const contingentDraft = ref({
  source: 'Mudofaa vazirligi',
  pinfl: '',
  person: '',
  eventType: 'RIGHT_GRANTED' as ContingentEventType,
  category: beneficiaryCategoryOptions.find((item) => item.code === '05')!.label,
  legalBasis: 'VMQ440_1A_WAR_PARTICIPANT',
  effectiveFrom: '2026-10-01',
})

const sourceOptions = sourceOrganizationOptions.map((item) => item.label)

const categoryOptions = beneficiaryCategoryOptions
const defaultLegalBasisByProfile: Record<string, string> = {
  C01: 'VMQ440_1A_WAR_DISABLED_I_II',
  C02: 'DIS_EQ_01',
  C03: 'VMQ440_1A_WAR_DISABLED_III',
  C04: 'DIS_EQ_01',
  C05: 'VMQ440_1A_WAR_PARTICIPANT',
  C06: 'VMQ440_1A_HERO_OR_GLORY',
  C07: 'VMQ440_2B_CHERNOBYL_RADIATION',
  C09: 'PART_EQ_01',
  C10: 'VMQ440_1B_FALLEN_FAMILY',
  C11: 'VMQ440_2A_PF34_PARENT',
}

const equivalenceBasisOptions = [...disabilityEquivalenceOptions, ...participantEquivalenceOptions]

const selectedCategoryNeedsEquivalenceBasis = computed(() => contingentDraft.value.category.includes('tenglashtirilgan'))
const filteredEquivalenceBasisOptions = computed(() => {
  if (['02', '021', '04'].includes(categoryOptions.find(item => item.label === contingentDraft.value.category)?.code || '')) {
    return equivalenceBasisOptions.filter((item) => item.code.startsWith('DIS_EQ_'))
  }
  if (categoryOptions.find(item => item.label === contingentDraft.value.category)?.code === '06') {
    return equivalenceBasisOptions.filter((item) => item.code.startsWith('PART_EQ_'))
  }
  return []
})

const scopedContingentEvents = computed(() => {
  const query = contingentSearch.value.trim().toLocaleLowerCase()
  return uniqueContingentPeople(contingentEvents.value).filter(event => {
    const date = contingentDocumentDate(event)
    const revoked = contingentRevokedDate(event)
    return (!query || [event.id, event.documentNumber || '', event.pinfl, event.person, event.category, contingentCategoryCode(event)].some(value => value.toLocaleLowerCase().includes(query))) &&
      (contingentSourceFilter.value === 'Barchasi' || event.source === contingentSourceFilter.value) &&
      (!contingentCategoryFilter.value || contingentCategoryCode(event) === contingentCategoryFilter.value) &&
      (!contingentDateFrom.value || Boolean(date && date >= contingentDateFrom.value)) &&
      (!contingentDateTo.value || Boolean(date && date <= contingentDateTo.value)) &&
      (!contingentRevocationReason.value || event.revocationReason === contingentRevocationReason.value) &&
      (!contingentRevokedFrom.value || Boolean(revoked && revoked >= contingentRevokedFrom.value)) &&
      (!contingentRevokedTo.value || Boolean(revoked && revoked <= contingentRevokedTo.value))
  })
})
const filteredContingentEvents = computed(() => scopedContingentEvents.value.filter(event => contingentStatusFilter.value === 'Barchasi' || event.status === contingentStatusFilter.value))
const contingentCards = computed(() => [
  { label: 'Jami shaxslar', status: 'Barchasi', count: scopedContingentEvents.value.length, tone: 'text-primary', icon: UsersRound },
  ...(['Faol', 'Nofaol', 'Foydalangan'] as const).map(status => ({ label: status, status, count: scopedContingentEvents.value.filter(event => event.status === status).length, tone: status === 'Faol' ? 'text-primary' : status === 'Nofaol' ? 'text-muted-foreground' : 'text-blue-600', icon: status === 'Faol' ? CheckCircle2 : status === 'Nofaol' ? XCircle : TicketCheck })),
])
const contingentRowCount = computed(() => filteredContingentEvents.value.length)
const contingentPageCount = computed(() => Math.max(1, Math.ceil(contingentRowCount.value / contingentPageSize.value)))
const contingentPageEvents = computed(() => filteredContingentEvents.value.slice((contingentPage.value - 1) * contingentPageSize.value, contingentPage.value * contingentPageSize.value))
const contingentRangeStart = computed(() => contingentRowCount.value ? (contingentPage.value - 1) * contingentPageSize.value + 1 : 0)
const contingentRangeEnd = computed(() => Math.min(contingentPage.value * contingentPageSize.value, contingentRowCount.value))
watch([contingentSourceFilter, contingentStatusFilter, contingentCategoryFilter, contingentDateFrom, contingentDateTo, contingentRevocationReason, contingentRevokedFrom, contingentRevokedTo, contingentSearch, contingentPageSize, contingentReportOpen], () => { contingentPage.value = 1 })
watch(contingentPageCount, count => { contingentPage.value = Math.min(contingentPage.value, count) })
async function downloadContingentReport() {
  if (contingentReportOpen.value) { await contingentGroupedReport.value?.download(); return }
  contingentDownloading.value = true
  try {
    const XLSX = await import('xlsx')
    let rows: (string | number)[][]
    rows = [['Hujjat raqami', 'ID', 'Hujjat sanasi', 'F.I.O.', 'JShShIR', 'Yosh', 'Toifa kodi', 'Toifa', 'Manba', 'Holati', 'Bekor qilish sababi', 'Bekor qilish sanasi'], ...filteredContingentEvents.value.map(event => [event.documentNumber || '', event.documentId || event.id, contingentDocumentDate(event), event.person.toLocaleUpperCase('uz-UZ'), event.pinfl, contingentAge(event.birthDate), contingentCategoryCode(event), contingentCategoryName(event), event.source, event.status, event.revocationReason || '', contingentRevokedDate(event)])]
    const sheet = XLSX.utils.aoa_to_sheet(rows)
    sheet['!cols'] = rows[0]!.map((_, index) => ({ wch: Math.min(60, Math.max(14, ...rows.map(row => String(row[index] ?? '').length))) }))
    const book = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(book, sheet, contingentReportOpen.value ? 'Hisobot' : 'Imtiyoz oluvchilar')
    XLSX.writeFile(book, contingentReportOpen.value ? 'imtiyoz-oluvchilar-svod.xlsx' : 'imtiyoz-oluvchilar.xlsx')
  } catch {
    showFeedback('error', 'Hisobotni yuklab bo‘lmadi. Qayta urinib ko‘ring.')
  } finally { contingentDownloading.value = false }
}
const contingentGroupedReport = ref<InstanceType<typeof GroupedReport> | null>(null)
const beneficiaryDimensions = [{ key: 'category', label: 'Toifa' }, { key: 'source', label: 'Manba' }, { key: 'status', label: 'Holat' }]
const beneficiaryMetrics = [{ key: 'count', label: 'Jami' }, { key: 'active', label: 'Faol' }, { key: 'inactive', label: 'Nofaol' }, { key: 'used', label: 'Foydalangan' }, { key: 'share', label: 'Foydalanish ulushi (%)', numerator: 'used', denominator: 'count' }]
const contingentGroupedRows = computed<GroupableRow[]>(() => filteredContingentEvents.value.map(event => ({ id: event.id, dimensions: { category: { value: contingentCategoryCode(event), label: contingentCategoryName(event) + ' (' + contingentCategoryCode(event) + ')' }, source: { value: event.source, label: event.source }, status: { value: event.status, label: event.status } }, metrics: { count: 1, active: Number(event.status === 'Faol'), inactive: Number(event.status === 'Nofaol'), used: Number(event.status === 'Foydalangan') } })))
function drillBeneficiary(path: { dimension: string; value: string }[]) {
  for (const part of path) { if (part.dimension === 'category') contingentCategoryFilter.value = part.value; if (part.dimension === 'source') contingentSourceFilter.value = part.value; if (part.dimension === 'status') contingentStatusFilter.value = part.value }
  contingentReportOpen.value = false
}
const contingentShare = (used: number, total: number) => new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 }).format(total ? used / total * 100 : 0)

function maskPinfl(value: string) {
  const normalized = value.replace(/\D/g, '').slice(0, 14)
  if (normalized.length < 4) return normalized
  return `${normalized.slice(0, 5)}•••••••${normalized.slice(-2)}`
}

function sourceCode(source: string) {
  return sourceOrganizationOptions.find((item) => item.label === source)?.code ?? 'SOURCE_SYSTEM'
}

function formatInputDate(value: string) {
  if (!value) return '—'
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year}`
}

function submitContingentEvent() {
  if (contingentDraft.value.pinfl.replace(/\D/g, '').length !== 14 || !contingentDraft.value.person.trim()) {
    showFeedback('error', 'JShShIR 14 raqamdan iborat bo‘lishi va F.I.Sh. kiritilishi kerak.')
    return
  }

  const sequence = 1100 + contingentEvents.value.length
  contingentEvents.value.unshift({
    id: `EVT-300926-${sequence}`,
    receivedAt: transactionTimestamp(),
    source: contingentDraft.value.source,
    sourceCode: sourceCode(contingentDraft.value.source),
    pinfl: maskPinfl(contingentDraft.value.pinfl),
    person: contingentDraft.value.person.trim().toLocaleUpperCase('uz-UZ'),
    category: contingentDraft.value.category,
    categoryCode: categoryOptions.find(option => option.label === contingentDraft.value.category)?.code,
    legalBasis: contingentDraft.value.legalBasis,
    eventType: contingentDraft.value.eventType,
    version: 1,
    effectiveFrom: formatInputDate(contingentDraft.value.effectiveFrom),
    status: 'Faol',
  })
  isContingentDialogOpen.value = false
  contingentDraft.value.pinfl = ''
  contingentDraft.value.person = ''
  showFeedback('success', 'Event yagona kontingent API orqali qabul qilindi.')
}

function syncContingentLegalBasis() {
  const selectedCategory = categoryOptions.find((item) => item.label === contingentDraft.value.category)
  if (selectedCategory) contingentDraft.value.legalBasis = defaultLegalBasisByProfile[selectedCategory.code] ?? ''
}

const eligibilityForm = ref({
  pinfl: '30101012345642',
  applicantRole: 'BENEFICIARY' as 'BENEFICIARY' | 'LEGAL_REPRESENTATIVE' | 'COMPANION',
  principalPinfl: '',
  principalReservationId: '',
  representativePinfl: '',
  authorityDocumentRef: '',
  authorityValidFrom: '2026-01-01',
  authorityValidTo: '2026-12-31',
  identityDocumentRef: 'ID-DOC-DEMO-01',
  identityValidFrom: '2025-01-01',
  identityValidTo: '2030-12-31',
  transportMode: 'RAIL' as TransportMode,
  origin: 'Toshkent',
  destination: 'Samarqand',
  originCountry: 'UZ',
  destinationCountry: 'UZ',
  departureDate: '2026-10-20',
  serviceNumber: '760F',
  requestedLeg: 'OUTBOUND' as 'OUTBOUND' | 'RETURN',
  ticketClass: 'ECONOMY',
  intent: 'CHECK_AND_RESERVE' as 'CHECK_ONLY' | 'CHECK_AND_RESERVE',
})
const eligibilityLoading = ref(false)
const eligibilityResult = ref<EligibilityDecision | null>(null)
const demoEligibilityProfiles: Record<string, {
  person: string
  legalBasis: string
  ruleSummary: string
  benefits: Partial<Record<TransportMode, string>>
  remainingLimit: string
  companionEligible?: boolean
  disabilityGroup?: 'I' | 'II' | 'III'
  domesticOnly?: boolean
}> = {
  '30101012345642': {
    person: 'Azizov Jasur Ravshanovich',
    legalBasis: 'VMQ-440, 1-band “a” va “b” kichik bandlari',
    ruleSummary: 'I guruh urush nogironi: temir yo‘l bepul, havo va shaharlararo avtobus 50%',
    benefits: { RAIL: '100%', AIR: '50%', BUS: '50%' },
    remainingLimit: '1 ta borish-qaytish huquqi',
    companionEligible: true,
    disabilityGroup: 'I',
  },
  '31205012345618': {
    person: 'Karimova Malika Tohirovna',
    legalBasis: 'VMQ-440, 2-band “b” kichik bandi',
    ruleSummary: 'Chernobil AES oqibatida nurlanish kasalligiga chalingan va uni boshidan kechirgan shaxs',
    benefits: { RAIL: '100%', AIR: '100%', BUS: '100%' },
    remainingLimit: '1 ta borish-qaytish huquqi',
  },
  '30508012345671': {
    person: 'Sodiqov Baxtiyor Anvarovich',
    legalBasis: 'VMQ-440, 2-band “a” kichik bandi; PF-34',
    ruleSummary: 'PF-34 ota-onasi: faqat O‘zbekiston ichida temir yo‘l yoki havo; “ikki marta” talqini D-02 yopilguncha konfiguratsion',
    benefits: { RAIL: '100%', AIR: '100%' },
    remainingLimit: 'D-02: yillik “ikki marta” birligi tasdiqlanishi kutilmoqda',
    domesticOnly: true,
  },
}

function serverCarrier(mode: TransportMode) {
  const carrier = carrierOptions.find((item) => item.transportMode === mode)
  if (!carrier) throw new Error(`Tashuvchi ma’lumotnomasi topilmadi: ${mode}`)
  return { code: carrier.code, name: carrier.label }
}

function serverAllowedFareClasses(mode: TransportMode) {
  return fareClassOptions
    .filter((item) => item.baseEligible && item.transportModes.includes(mode))
    .map((item) => item.code)
}

function demoEligibleBase(mode: TransportMode) {
  return ({ RAIL: 248000, AIR: 884000, BUS: 96000 } as Record<TransportMode, number>)[mode]
}

function makeReservationAuthorization(input: {
  source?: 'ONLINE' | 'MANUAL_DOCUMENT'
  pinfl: string
  mode: TransportMode
  origin: string
  destination: string
  date: string
  serviceNumber?: string
  status: ReservationAuthorization['status']
  leg?: 'OUTBOUND' | 'RETURN'
  discount?: number
  companionLink?: string
  maxEligibleBase?: number
  entitlementKey?: string
  carrierCode?: string
  carrierName?: string
  offerId?: string
  policySnapshot?: string
  allowedFareClasses?: string[]
  expiresAt?: string
}): ReservationAuthorization {
  const carrier = serverCarrier(input.mode)
  const discount = input.discount ?? 100
  return {
    authorizationSource: input.source ?? 'ONLINE',
    personPinfl: input.pinfl,
    transportMode: input.mode,
    carrierCode: input.carrierCode ?? carrier.code,
    carrierName: input.carrierName ?? carrier.name,
    origin: input.origin,
    destination: input.destination,
    departureDate: input.date,
    serviceNumber: input.serviceNumber ?? ({ RAIL: '760F', AIR: 'HY-011', BUS: 'BUS-106' } as Record<TransportMode, string>)[input.mode],
    entitlementKey: input.entitlementKey ?? `${input.pinfl}:${input.date.slice(0, 4)}`,
    legType: input.leg ?? 'OUTBOUND',
    offerId: input.offerId ?? `offer_${input.mode.toLowerCase()}_${discount}`,
    policySnapshot: input.policySnapshot ?? `VMQ440-2026-10-01-v1 · ${input.mode} · ${discount}%`,
    allowedFareClasses: input.allowedFareClasses ?? serverAllowedFareClasses(input.mode),
    discountPercent: discount,
    maxEligibleBase: input.maxEligibleBase ?? demoEligibleBase(input.mode),
    expiresAt: input.expiresAt ?? (input.status === 'HELD' ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : undefined),
    status: input.status,
    companionLink: input.companionLink,
  }
}

const reservationAuthorizations = ref<Record<string, ReservationAuthorization>>({
  'RSV-PRINCIPAL-001': makeReservationAuthorization({ pinfl: '30101012345642', mode: 'RAIL', origin: 'Toshkent', destination: 'Samarqand', date: '2026-10-20', serviceNumber: '760F', status: 'CONSUMED' }),
  'RSV-HELD-DEMO-001': makeReservationAuthorization({ pinfl: '30202012345670', mode: 'RAIL', origin: 'Toshkent', destination: 'Samarqand', date: '2026-10-20', status: 'HELD' }),
  'RSV-91BD62': makeReservationAuthorization({ pinfl: '31205012345618', mode: 'AIR', origin: 'Toshkent', destination: 'Nukus', date: '2026-10-15', status: 'CONSUMED' }),
  'RSV-7C21A9': makeReservationAuthorization({ source: 'MANUAL_DOCUMENT', pinfl: '29811012345609', mode: 'BUS', origin: 'Toshkent', destination: 'Jizzax', date: '2026-10-16', status: 'RESTORE_REVIEW', discount: 50 }),
  'RSV-11FC04': makeReservationAuthorization({ pinfl: '32205012345616', mode: 'RAIL', origin: 'Buxoro', destination: 'Toshkent', date: '2026-10-19', serviceNumber: '010F', status: 'CONSUMED', leg: 'RETURN' }),
})

const entitlementBundles = ref<Record<string, EntitlementBundle>>({})
const companionTripSlots = ref<Record<string, CompanionTripSlot>>({})

function entitlementKey(pinfl: string, benefitYear = 2026) {
  return `${pinfl}:${benefitYear}`
}

function emptyEntitlementBundle(pinfl: string, benefitYear: number): EntitlementBundle {
  return {
    bundleId: `ENT-${pinfl.slice(-6)}-${benefitYear}`,
    benefitYear,
    legs: { OUTBOUND: 'AVAILABLE', RETURN: 'AVAILABLE' },
    activeReservations: {},
  }
}

function readEntitlementBundle(pinfl: string, benefitYear = 2026) {
  return entitlementBundles.value[entitlementKey(pinfl, benefitYear)] ?? emptyEntitlementBundle(pinfl, benefitYear)
}

function getOrCreateEntitlementBundle(pinfl: string, benefitYear = 2026) {
  const key = entitlementKey(pinfl, benefitYear)
  if (!entitlementBundles.value[key]) {
    entitlementBundles.value[key] = emptyEntitlementBundle(pinfl, benefitYear)
  }
  return entitlementBundles.value[key]!
}

function getOrCreateCompanionTripSlot(principalReservationId: string) {
  if (!companionTripSlots.value[principalReservationId]) {
    companionTripSlots.value[principalReservationId] = {
      principalReservationId,
      status: 'AVAILABLE',
    }
  }
  return companionTripSlots.value[principalReservationId]!
}

function hydrateEntitlementLedger() {
  const statePriority: Record<EntitlementLegState, number> = {
    AVAILABLE: 0,
    RESTORED: 1,
    HELD: 2,
    RESTORE_REVIEW: 3,
    CONSUMED: 4,
  }

  for (const [reservationId, authorization] of Object.entries(reservationAuthorizations.value)) {
    if (authorization.companionLink) {
      companionTripSlots.value[authorization.companionLink] = {
        principalReservationId: authorization.companionLink,
        companionPinfl: authorization.personPinfl,
        companionReservationId: reservationId,
        status: authorization.status === 'RELEASED' ? 'AVAILABLE' : authorization.status,
      }
      continue
    }

    const bundle = getOrCreateEntitlementBundle(authorization.personPinfl, Number(authorization.departureDate.slice(0, 4)) || 2026)
    const nextState: EntitlementLegState = authorization.status === 'RELEASED' ? 'AVAILABLE' : authorization.status
    if (statePriority[nextState] >= statePriority[bundle.legs[authorization.legType]]) {
      bundle.legs[authorization.legType] = nextState
    }
    if (authorization.status === 'HELD') {
      bundle.activeReservations[authorization.legType] = reservationId
    }
    if (['HELD', 'CONSUMED', 'RESTORE_REVIEW'].includes(authorization.status)) {
      bundle.lockedTransportMode = authorization.transportMode
    }
  }
}

hydrateEntitlementLedger()

function releaseReservationHold(reservationId: string, authorization: ReservationAuthorization) {
  authorization.status = 'RELEASED'
  if (authorization.companionLink) {
    const slot = companionTripSlots.value[authorization.companionLink]
    if (slot?.companionReservationId === reservationId) {
      slot.status = 'AVAILABLE'
      slot.companionPinfl = undefined
      slot.companionReservationId = undefined
    }
    return
  }
  const bundle = entitlementBundles.value[authorization.entitlementKey]
  if (bundle?.activeReservations[authorization.legType] === reservationId) {
    bundle.legs[authorization.legType] = 'AVAILABLE'
    delete bundle.activeReservations[authorization.legType]
    const hasBlockingSiblingState = Object.values(bundle.legs).some((state) => ['HELD', 'CONSUMED', 'RESTORE_REVIEW'].includes(state))
    if (!Object.keys(bundle.activeReservations).length && !hasBlockingSiblingState) bundle.lockedTransportMode = undefined
  }
  invalidateCompanionSlot(reservationId)
}

function releaseExpiredReservations(now = Date.now()) {
  for (const [reservationId, authorization] of Object.entries(reservationAuthorizations.value)) {
    if (authorization.status !== 'HELD' || !authorization.expiresAt || Date.parse(authorization.expiresAt) > now) continue
    releaseReservationHold(reservationId, authorization)
  }
}

let reservationExpiryTimer: number | undefined
onMounted(() => {
  releaseExpiredReservations()
  reservationExpiryTimer = window.setInterval(() => releaseExpiredReservations(), 30_000)
})
onBeforeUnmount(() => window.clearInterval(reservationExpiryTimer))

function authoritativeResidencyStatus(pinfl: string) {
  return pinfl.startsWith('999') ? 'NOT_ELIGIBLE' : 'VERIFIED_RESIDENT'
}
const recentDecisions = ref<EligibilityDecision[]>([
  {
    id: 'DEC-8F42A1',
    createdAt: '15.10.2026 10:44',
    pinfl: '30101•••••••42',
    person: 'Azizov J. R.',
    transportMode: 'RAIL',
    route: 'Toshkent → Samarqand',
    result: 'ELIGIBLE',
    benefit: '100%',
    legalBasis: 'VMQ-440, 1-band “a” kichik bandi',
    remainingLimit: '1 ta qaytish segmenti',
    reservationId: 'RSV-PRINCIPAL-001',
  },
  {
    id: 'DEC-21BD95',
    createdAt: '15.10.2026 10:17',
    pinfl: '31205•••••••18',
    person: 'Karimova M. T.',
    transportMode: 'AIR',
    route: 'Toshkent → Nukus',
    result: 'ELIGIBLE',
    benefit: '100%',
    legalBasis: 'VMQ-440, 2-band “b” kichik bandi',
    remainingLimit: 'OUTBOUND=CONSUMED · RETURN=AVAILABLE',
    reservationId: 'RSV-91BD62',
  },
  {
    id: 'DEC-91E004',
    createdAt: '15.10.2026 09:51',
    pinfl: '30508•••••••00',
    person: 'Noma’lum shaxs',
    transportMode: 'BUS',
    route: 'Buxoro → Qarshi',
    result: 'MANUAL_DOCUMENT_REQUIRED',
    benefit: '0%',
    ruleSummary: 'YAMIHda huquq topilmadi; Nizomga muvofiq tasdiqlovchi hujjat qabul qilinadi',
  },
])

const manualCases = ref<ManualVerificationCase[]>([
  {
    id: 'MVC-2026-0040',
    createdAt: '15.10.2026 09:14',
    subjectPinfl: '29711012345608',
    pinfl: '29711•••••••08',
    transportMode: 'RAIL',
    origin: 'Toshkent',
    destination: 'Samarqand',
    departureDate: '2026-10-20',
    serviceNumber: '760F',
    legType: 'OUTBOUND',
    carrierCode: 'UZRAIL',
    carrierName: 'O‘zbekiston temir yo‘llari',
    offerId: 'offer_manual_rail_50_reviewer_0040',
    policySnapshot: 'VMQ440-2026-10-01-v1 · RAIL · 50% · reviewer-approved',
    allowedFareClasses: ['ECONOMY', 'PLATSKART', 'COUPE'],
    discountPercent: 50,
    maxEligibleBase: 248000,
    documentType: 'Imtiyozga huquqi to‘g‘risidagi guvohnoma',
    documentReference: 'DOC-REF-71B2',
    documentIssuer: 'Vakolatli davlat organi',
    issuedAt: '01.09.2026',
    validTo: '31.12.2026',
    reviewer: 'Vakolatli reviewer · ERI-REF-0040',
    authorizationRef: 'mauth_sha256:9f3a…c18d',
    authorizationExpiresAt: '2026-10-18T12:00:00+05:00',
    status: 'Tasdiqlandi',
  },
  {
    id: 'MVC-2026-0041',
    createdAt: '15.10.2026 09:38',
    subjectPinfl: '29711012345608',
    pinfl: '29711•••••••08',
    transportMode: 'RAIL',
    origin: 'Toshkent',
    destination: 'Samarqand',
    departureDate: '2026-10-20',
    serviceNumber: '760F',
    documentType: 'Imtiyozga huquqi to‘g‘risidagi guvohnoma',
    documentReference: 'DOC-REF-8A19',
    documentIssuer: 'Vakolatli davlat organi',
    issuedAt: '01.09.2026',
    validTo: '31.12.2026',
    reviewer: 'YAMIH vakolatli tekshiruv navbati',
    status: 'Ko‘rib chiqilmoqda',
  },
])
const isManualCaseDialogOpen = ref(false)
const manualCaseDraft = ref({
  documentType: 'Urush qatnashchisi guvohnomasi',
  documentReference: '',
  documentIssuer: '',
  issuedAt: '',
  validTo: '2026-12-31',
})

function runEligibilityCheck() {
  releaseExpiredReservations()
  if (eligibilityForm.value.pinfl.replace(/\D/g, '').length !== 14) {
    showFeedback('error', 'Moslikni tekshirish uchun 14 xonali JShShIR kiriting.')
    return
  }
  if (!eligibilityForm.value.origin.trim() || !eligibilityForm.value.destination.trim()) {
    showFeedback('error', 'Jo‘nash va yetib borish manzilini kiriting.')
    return
  }
  if (!eligibilityForm.value.serviceNumber.trim()) {
    showFeedback('error', 'Safarni aniq bog‘lash uchun qatnov raqamini kiriting.')
    return
  }
  if (eligibilityForm.value.applicantRole === 'COMPANION' && eligibilityForm.value.principalPinfl.replace(/\D/g, '').length !== 14) {
    showFeedback('error', 'Hamroh uchun asosiy benefitsiarning 14 xonali JShShIRini kiriting.')
    return
  }
  if (eligibilityForm.value.applicantRole === 'COMPANION' && !eligibilityForm.value.principalReservationId.trim()) {
    showFeedback('error', 'Hamroh aynan asosiy benefitsiarning tasdiqlangan rezerv/safariga bog‘lanishi kerak.')
    return
  }
  if (eligibilityForm.value.applicantRole === 'COMPANION') {
    const principalReservation = reservationAuthorizations.value[eligibilityForm.value.principalReservationId.trim()]
    const principalMatchesJourney = principalReservation
      && principalReservation.personPinfl === eligibilityForm.value.principalPinfl
      && principalReservation.transportMode === eligibilityForm.value.transportMode
      && principalReservation.origin === eligibilityForm.value.origin
      && principalReservation.destination === eligibilityForm.value.destination
      && principalReservation.departureDate === eligibilityForm.value.departureDate
      && principalReservation.serviceNumber === eligibilityForm.value.serviceNumber.trim()
      && principalReservation.legType === eligibilityForm.value.requestedLeg
      && ['HELD', 'CONSUMED'].includes(principalReservation.status)
    if (!principalMatchesJourney) {
      showFeedback('error', 'Principal rezerv server registrida ushbu I guruh benefitsiari, transport, yo‘nalish, qatnov, sana va segmentga mos kelmadi.')
      return
    }
  }
  if (eligibilityForm.value.applicantRole === 'LEGAL_REPRESENTATIVE') {
    if (eligibilityForm.value.representativePinfl.replace(/\D/g, '').length !== 14 || !eligibilityForm.value.authorityDocumentRef.trim()) {
      showFeedback('error', 'Qonuniy vakilning JShShIRi va vakolat hujjati reference’i majburiy.')
      return
    }
    if (!eligibilityForm.value.authorityValidFrom || eligibilityForm.value.authorityValidFrom > eligibilityForm.value.departureDate || eligibilityForm.value.authorityValidTo < eligibilityForm.value.departureDate) {
      showFeedback('error', 'Vakil vakolatining valid_from/valid_to oralig‘i chipta rasmiylashtirish va safar sanasini qamrashi kerak.')
      return
    }
  }
  if (!eligibilityForm.value.identityDocumentRef.trim() || !eligibilityForm.value.identityValidFrom || eligibilityForm.value.identityValidFrom > eligibilityForm.value.departureDate || eligibilityForm.value.identityValidTo < eligibilityForm.value.departureDate) {
    showFeedback('error', 'Shaxs hujjatining valid_from/valid_to oralig‘i chipta rasmiylashtirish va safar sanasini qamrashi kerak.')
    return
  }
  if (eligibilityForm.value.departureDate < '2026-10-01') {
    showFeedback('error', 'VMQ-440 transport imtiyozlari tartibi 2026-yil 1-oktabrdan qo‘llanadi.')
    return
  }

  const classRequiresTopUp = eligibilityForm.value.transportMode === 'AIR'
    ? eligibilityForm.value.ticketClass !== 'ECONOMY'
    : eligibilityForm.value.transportMode === 'RAIL'
      ? !['ECONOMY', 'PLATSKART', 'COUPE'].includes(eligibilityForm.value.ticketClass)
      : !['ECONOMY', 'STANDARD'].includes(eligibilityForm.value.ticketClass)

  const request = { ...eligibilityForm.value }

  eligibilityLoading.value = true
  eligibilityResult.value = null
  window.setTimeout(() => {
    const isCompanion = request.applicantRole === 'COMPANION'
    const principalReservationId = request.principalReservationId.trim()
    const principalAuthorization = isCompanion ? reservationAuthorizations.value[principalReservationId] : undefined
    const principalStillMatches = !isCompanion || Boolean(principalAuthorization
      && principalAuthorization.personPinfl === request.principalPinfl
      && principalAuthorization.transportMode === request.transportMode
      && principalAuthorization.origin === request.origin
      && principalAuthorization.destination === request.destination
      && principalAuthorization.departureDate === request.departureDate
      && principalAuthorization.serviceNumber === request.serviceNumber.trim()
      && principalAuthorization.legType === request.requestedLeg
      && ['HELD', 'CONSUMED'].includes(principalAuthorization.status))
    const lookupPinfl = isCompanion ? request.principalPinfl : request.pinfl
    const profile = demoEligibilityProfiles[lookupPinfl]
    const residenceEligible = authoritativeResidencyStatus(request.pinfl) === 'VERIFIED_RESIDENT'
    const companionAllowed = !isCompanion || Boolean(profile?.companionEligible)
    const domesticJourney = request.originCountry === 'UZ' && request.destinationCountry === 'UZ'
    const geographyAllowed = !profile?.domesticOnly || domesticJourney
    const benefit = isCompanion
      ? (companionAllowed ? '50%' : undefined)
      : profile?.benefits[request.transportMode]
    const entitlementOwnerPinfl = isCompanion ? request.principalPinfl : request.pinfl
    const benefitYear = Number(request.departureDate.slice(0, 4)) || 2026
    const bundle = profile ? readEntitlementBundle(entitlementOwnerPinfl, benefitYear) : undefined
    const companionSlot: CompanionTripSlot | undefined = isCompanion
      ? (companionTripSlots.value[principalReservationId] ?? { principalReservationId, status: 'AVAILABLE' })
      : undefined
    const legState = isCompanion ? companionSlot?.status : bundle?.legs[request.requestedLeg]
    const legAvailable = !bundle || legState === 'AVAILABLE' || legState === 'RESTORED'
    const transportLockAllowed = !bundle?.lockedTransportMode || bundle.lockedTransportMode === request.transportMode
    const d02ReservationBlocked = lookupPinfl === '30508012345671' && request.intent === 'CHECK_AND_RESERVE'
    const requiresManualDocument = !profile && residenceEligible
    const isEligible = Boolean(profile && benefit && residenceEligible && companionAllowed && geographyAllowed && legAvailable && transportLockAllowed && principalStillMatches && !d02ReservationBlocked)
    const decisionResult: EligibilityDecision['result'] = isEligible
      ? 'ELIGIBLE'
      : requiresManualDocument
        ? 'MANUAL_DOCUMENT_REQUIRED'
        : 'NOT_ELIGIBLE'
    const idSuffix = String(Date.now()).slice(-6).toUpperCase()
    const reservationId = isEligible && request.intent === 'CHECK_AND_RESERVE'
      ? `RSV-${idSuffix}`
      : undefined
    const decision: EligibilityDecision = {
      id: `DEC-${idSuffix}`,
      createdAt: transactionTimestamp(),
      pinfl: maskPinfl(request.pinfl),
      person: isEligible
        ? (isCompanion ? 'Hamroh — asosiy benefitsiar safariga bog‘landi' : profile!.person)
        : requiresManualDocument
          ? 'YAMIHda ma’lumot topilmadi'
          : 'Huquq tasdiqlanmadi',
      transportMode: request.transportMode,
      requestedLeg: request.requestedLeg,
      bundleId: bundle?.bundleId,
      route: `${request.origin} → ${request.destination}`,
      result: decisionResult,
      benefit: isEligible ? benefit! : '0%',
      legalBasis: isCompanion
        ? 'VMQ-440, 1-band “b” kichik bandi — I guruh benefitsiari hamrohi'
        : profile?.legalBasis,
      ruleSummary: requiresManualDocument
        ? 'YAMIHda huquq topilmadi. Nizom 9-band bo‘yicha tasdiqlovchi hujjat qabul qilinib, vakolatli manual verification case ochiladi.'
        : !residenceEligible
        ? 'Huquq faqat O‘zbekiston fuqarosi, yashash guvohnomasiga ega chet el fuqarosi yoki fuqaroligi bo‘lmagan rezidentga tatbiq etiladi.'
        : !geographyAllowed
          ? 'PF-34 profili bo‘yicha imtiyoz faqat O‘zbekiston hududidagi temir yo‘l yoki havo safariga tatbiq etiladi.'
        : !companionAllowed
          ? 'Hamroh huquqi faqat I guruh urush nogironi yoki unga tenglashtirilgan shaxsga bog‘lanadi.'
          : !benefit
            ? 'Tanlangan transport turi ushbu normativ profil uchun ruxsat etilmagan.'
            : !principalStillMatches
              ? 'Principal rezerv atomar commit vaqtida ayni benefitsiar, transport, yo‘nalish, qatnov, sana va segmentga mos kelmadi.'
            : d02ReservationBlocked
              ? 'PF-34 “ikki marta” birligi va leg/round-trip talqini D-02 orqali yopilmagan; CHECK_AND_RESERVE production gate bilan bloklangan.'
              : !transportLockAllowed
                ? `Global entitlement bundle ${bundle?.lockedTransportMode} transportiga lock qilingan; mixed-mode D-02 yopilmaguncha ruxsat yo‘q.`
                : !legAvailable
                  ? (isCompanion
                      ? `Principal safar ${principalReservationId} companion sloti ${legState}; shu safarga ikkinchi hamroh rezervi bloklandi.`
                      : `${request.requestedLeg} leg global ledgerda ${legState}; parallel yoki takroriy rezerv bloklandi.`)
                  : `${profile?.ruleSummary ?? ''}${benefit === '50%' ? ' Ikki yillik 100% konversiya D-02 va D-05 yopilguncha faollashtirilmagan.' : ''}${classRequiresTopUp ? ' Tanlangan yuqori klass rad etilmaydi: qoplanadigan bazaviy klass qismi ajratilib, tarif farqi fuqaro zimmasida qoladi.' : ''}${request.applicantRole === 'LEGAL_REPRESENTATIVE' ? ' Qonuniy vakil vakolati benefitsiar va safarga bog‘lab tekshirildi.' : ''}${isCompanion ? ' Hamroh mustaqil yillik bundle yaratmasdan principal reservationning ayni journey/service/date companion slotiga bog‘landi.' : ''}`,
      remainingLimit: bundle
        ? `${isCompanion ? `PRINCIPAL_TRIP=${principalReservationId} · COMPANION_SLOT=${companionSlot?.status}` : `OUTBOUND=${bundle.legs.OUTBOUND} · RETURN=${bundle.legs.RETURN}`}${request.intent === 'CHECK_ONLY' ? ' · CHECK_ONLY, ledger o‘zgarmadi' : ''}`
        : undefined,
      principal: isCompanion ? maskPinfl(request.principalPinfl) : undefined,
      principalReservationId: isCompanion ? principalReservationId : undefined,
      reservationId,
    }
    if (reservationId) {
      const discountPercent = Number(benefit?.replace('%', '')) || 0
      const newAuthorization = makeReservationAuthorization({
        pinfl: request.pinfl,
        mode: request.transportMode,
        origin: request.origin,
        destination: request.destination,
        date: request.departureDate,
        serviceNumber: request.serviceNumber.trim(),
        status: 'HELD',
        leg: request.requestedLeg,
        discount: discountPercent,
        companionLink: isCompanion ? principalReservationId : undefined,
        entitlementKey: isCompanion ? principalAuthorization?.entitlementKey : undefined,
      })
      reservationAuthorizations.value[reservationId] = newAuthorization
      decision.reservationExpiresAt = newAuthorization.expiresAt
      if (isCompanion) {
        const mutableCompanionSlot = getOrCreateCompanionTripSlot(principalReservationId)
        mutableCompanionSlot.status = 'HELD'
        mutableCompanionSlot.companionPinfl = request.pinfl
        mutableCompanionSlot.companionReservationId = reservationId
        decision.remainingLimit = `PRINCIPAL_TRIP=${principalReservationId} · COMPANION_SLOT=${mutableCompanionSlot.status}`
      }
      else if (bundle) {
        const mutableBundle = getOrCreateEntitlementBundle(request.pinfl, benefitYear)
        mutableBundle.legs[request.requestedLeg] = 'HELD'
        mutableBundle.activeReservations[request.requestedLeg] = reservationId
        mutableBundle.lockedTransportMode = request.transportMode
        decision.remainingLimit = `OUTBOUND=${mutableBundle.legs.OUTBOUND} · RETURN=${mutableBundle.legs.RETURN}`
      }
    }
    eligibilityResult.value = decision
    recentDecisions.value.unshift(decision)
    eligibilityLoading.value = false
    showFeedback(isEligible ? 'success' : 'info', isEligible
      ? (decision.reservationId ? 'Sandbox simulyatsiyasi: demo ledgerda rezerv yaratildi; bu production huquqi emas.' : 'Sandbox simulyatsiyasi: ELIGIBLE, demo ledger o‘zgarmadi.')
      : requiresManualDocument
        ? 'Sandbox simulyatsiyasi: authoritative huquq topilmadi, manual case kontrakti ko‘rsatildi.'
        : 'Sandbox simulyatsiyasi: ushbu safar uchun imtiyoz tasdiqlanmadi.')
  }, 650)
}

function submitManualCase() {
  if (!manualCaseDraft.value.documentReference.trim() || !manualCaseDraft.value.documentIssuer.trim() || !manualCaseDraft.value.issuedAt || !manualCaseDraft.value.validTo) {
    showFeedback('error', 'Hujjat reference’i, bergan organ, berilgan sana va amal muddatini kiriting.')
    return
  }
  if (manualCaseDraft.value.validTo < eligibilityForm.value.departureDate) {
    showFeedback('error', 'Tasdiqlovchi hujjat chipta rasmiylashtirish va safar sanasida amal qilishi kerak.')
    return
  }
  if (manualCaseDraft.value.issuedAt > eligibilityForm.value.departureDate || manualCaseDraft.value.issuedAt > manualCaseDraft.value.validTo) {
    showFeedback('error', 'Hujjatning berilgan sanasi safar sanasi va valid_to dan keyin bo‘lishi mumkin emas.')
    return
  }
  manualCases.value.unshift({
    id: `MVC-2026-${String(manualCases.value.length + 42).padStart(4, '0')}`,
    createdAt: transactionTimestamp(),
    subjectPinfl: eligibilityForm.value.applicantRole === 'COMPANION' ? eligibilityForm.value.principalPinfl : eligibilityForm.value.pinfl,
    pinfl: maskPinfl(eligibilityForm.value.applicantRole === 'COMPANION' ? eligibilityForm.value.principalPinfl : eligibilityForm.value.pinfl),
    transportMode: eligibilityForm.value.transportMode,
    origin: eligibilityForm.value.origin,
    destination: eligibilityForm.value.destination,
    departureDate: eligibilityForm.value.departureDate,
    serviceNumber: eligibilityForm.value.serviceNumber.trim(),
    documentType: manualCaseDraft.value.documentType,
    documentReference: manualCaseDraft.value.documentReference.trim(),
    documentIssuer: manualCaseDraft.value.documentIssuer.trim(),
    issuedAt: formatInputDate(manualCaseDraft.value.issuedAt),
    validTo: formatInputDate(manualCaseDraft.value.validTo),
    reviewer: 'YAMIH vakolatli tekshiruv navbati',
    status: 'Ko‘rib chiqilmoqda',
  })
  isManualCaseDialogOpen.value = false
  manualCaseDraft.value.documentReference = ''
  manualCaseDraft.value.documentIssuer = ''
  manualCaseDraft.value.issuedAt = ''
  showFeedback('success', 'Hujjat vakolatli tekshiruvchiga yuborildi; tashuvchi o‘zi huquq yaratmaydi.')
}

function consumeManualAuthorization(item: ManualVerificationCase) {
  releaseExpiredReservations()
  if (item.status !== 'Tasdiqlandi' || !item.authorizationRef || item.authorizationConsumedAt) {
    showFeedback('error', 'Faqat tasdiqlangan va sarflanmagan manual authorization atomar rezervga aylantiriladi.')
    return
  }
  if (!item.authorizationExpiresAt || Date.parse(item.authorizationExpiresAt) <= Date.now()) {
    showFeedback('error', 'Manual authorization tokenining amal muddati tugagan yoki expiry snapshoti yo‘q.')
    return
  }
  if (!item.legType || !item.carrierCode || !item.carrierName || !item.offerId || !item.policySnapshot || !item.allowedFareClasses?.length || item.discountPercent === undefined || item.maxEligibleBase === undefined) {
    showFeedback('error', 'Reviewer tasdiqlagan offer/policy/carrier/klass/discount/eligible-base bindingi to‘liq emas; token sarflanmadi.')
    return
  }
  if (serverCarrier(item.transportMode).code !== item.carrierCode) {
    showFeedback('error', 'Reviewer snapshotidagi carrier transport rejimining server registriga mos kelmadi.')
    return
  }
  const bundle = getOrCreateEntitlementBundle(item.subjectPinfl, Number(item.departureDate.slice(0, 4)) || 2026)
  if (bundle.lockedTransportMode && bundle.lockedTransportMode !== item.transportMode) {
    showFeedback('error', `Manual token sarflanmadi: bundle ${bundle.lockedTransportMode} transportiga lock qilingan.`)
    return
  }
  if (!['AVAILABLE', 'RESTORED'].includes(bundle.legs[item.legType])) {
    showFeedback('error', `Manual token sarflanmadi: ${item.legType} global ledgerda ${bundle.legs[item.legType]}.`)
    return
  }
  const reservationId = `RSV-MAN-${item.id.slice(-4)}`
  reservationAuthorizations.value[reservationId] = makeReservationAuthorization({
    source: 'MANUAL_DOCUMENT',
    pinfl: item.subjectPinfl,
    mode: item.transportMode,
    origin: item.origin,
    destination: item.destination,
    date: item.departureDate,
    serviceNumber: item.serviceNumber,
    status: 'HELD',
    leg: item.legType,
    carrierCode: item.carrierCode,
    carrierName: item.carrierName,
    offerId: item.offerId,
    policySnapshot: item.policySnapshot,
    allowedFareClasses: [...item.allowedFareClasses],
    discount: item.discountPercent,
    maxEligibleBase: item.maxEligibleBase,
  })
  bundle.legs[item.legType] = 'HELD'
  bundle.activeReservations[item.legType] = reservationId
  bundle.lockedTransportMode = item.transportMode
  item.authorizationConsumedAt = `${transactionTimestamp()} · atomar`
  item.reservationId = reservationId
  showFeedback('success', 'Opaque token hashi bir marta sarflandi; MANUAL_DOCUMENT server snapshoti bilan rezerv yaratildi.')
}

const ticketEvents = ref<TicketEvent[]>([
  {
    beneficiaryCategoryCode: '01', beneficiarySource: sourceOrganizationOptions[0]?.label,
    documentNumber: '2026-261001', documentId: '001', documentDate: '2026-10-15',
    passengerName: 'AZIZOV JAMSHID RUSTAMOVICH', passengerBirthDate: '1925-01-15',
    id: 'TEV-9431',
    occurredAt: '15.10.2026 10:49',
    ticketId: 'UTY-78394510',
    reservationId: 'RSV-PRINCIPAL-001',
    carrier: 'O‘zbekiston temir yo‘llari',
    transportMode: 'RAIL',
    eventType: 'ISSUED',
    ticketState: 'ISSUED',
    passenger: '30101•••••••42',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C01 draft profile · VMQ-440 1-band “a”',
    authorizationSource: 'ONLINE',
    legType: 'OUTBOUND',
    route: 'Toshkent → Samarqand',
    departureAt: '20.10.2026 08:00',
    serviceNumber: '760F',
    ticketClass: 'Kupe',
    amount: 248000,
    preferentialAmount: 0,
    upgradeSurcharge: 0,
    passengerPaidAmount: 0,
    compensationRequested: 248000,
    evidenceRef: 'TICKET-COPY-9431 · ROUTE-SHEET-9431',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=CONSUMED(reason=TICKET_ISSUED) · TICKET=ISSUED',
    settlementAction: 'CLAIM_CANDIDATE_PENDING_D03',
    status: 'Qabul qilindi',
  },
  {
    beneficiaryCategoryCode: '09', beneficiarySource: sourceOrganizationOptions[1]?.label,
    documentNumber: '2026-261002', documentId: '002', documentDate: '2026-10-15',
    passengerName: 'KARIMOVA MALIKA TURSUNOVNA', passengerBirthDate: '1926-05-12',
    id: 'TEV-9418',
    occurredAt: '15.10.2026 10:22',
    ticketId: 'HY-12587409',
    reservationId: 'RSV-91BD62',
    carrier: 'Uzbekistan Airways',
    transportMode: 'AIR',
    eventType: 'TRAVELLED',
    ticketState: 'TRAVELLED',
    passenger: '31205•••••••18',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C07 draft profile · VMQ-440 2-band “b”',
    authorizationSource: 'ONLINE',
    legType: 'OUTBOUND',
    route: 'Toshkent → Nukus',
    departureAt: '15.10.2026 07:35',
    serviceNumber: 'HY-011',
    ticketClass: 'Ekonom',
    amount: 884000,
    preferentialAmount: 0,
    upgradeSurcharge: 0,
    passengerPaidAmount: 0,
    compensationRequested: 884000,
    evidenceRef: 'TICKET-COPY-9418 · ROUTE-SHEET-9418',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=UNCHANGED(CONSUMED) · TICKET=TRAVELLED',
    settlementAction: 'SETTLEMENT_BASIS_PENDING_D03',
    status: 'Qabul qilindi',
  },
  {
    beneficiaryCategoryCode: '09', beneficiarySource: sourceOrganizationOptions[1]?.label,
    documentNumber: '2026-261003', documentId: '003', documentDate: '2026-10-14',
    passengerName: 'KARIMOVA MALIKA TURSUNOVNA', passengerBirthDate: '1926-05-12',
    id: 'TEV-9417',
    occurredAt: '14.10.2026 18:04',
    ticketId: 'HY-12587409',
    reservationId: 'RSV-91BD62',
    carrier: 'Uzbekistan Airways',
    transportMode: 'AIR',
    eventType: 'ISSUED',
    ticketState: 'ISSUED',
    passenger: '31205•••••••18',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C07 draft profile · VMQ-440 2-band “b”',
    authorizationSource: 'ONLINE',
    legType: 'OUTBOUND',
    route: 'Toshkent → Nukus',
    departureAt: '15.10.2026 07:35',
    serviceNumber: 'HY-011',
    ticketClass: 'Ekonom',
    amount: 884000,
    preferentialAmount: 0,
    upgradeSurcharge: 0,
    passengerPaidAmount: 0,
    compensationRequested: 884000,
    evidenceRef: 'TICKET-COPY-9417 · ROUTE-SHEET-9417',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=CONSUMED(reason=TICKET_ISSUED) · TICKET=ISSUED',
    settlementAction: 'CLAIM_CANDIDATE_PENDING_D03',
    status: 'Qabul qilindi',
  },
  {
    beneficiaryCategoryCode: '01', beneficiarySource: sourceOrganizationOptions[2]?.label,
    documentNumber: '2026-261004', documentId: '004', documentDate: '2026-10-15',
    passengerName: 'ERGASHEV OLIM SOBIROVICH', passengerBirthDate: '1957-03-22',
    id: 'TEV-9397',
    occurredAt: '15.10.2026 09:58',
    ticketId: 'BUS-661284',
    reservationId: 'RSV-7C21A9',
    carrier: 'Toshkent avtovokzali',
    transportMode: 'BUS',
    eventType: 'RETURNED',
    ticketState: 'RETURNED',
    passenger: '29811•••••••09',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C01 draft profile · VMQ-440 1-band “a”',
    authorizationSource: 'MANUAL_DOCUMENT',
    legType: 'OUTBOUND',
    route: 'Toshkent → Jizzax',
    departureAt: '16.10.2026 09:00',
    serviceNumber: 'BUS-106',
    ticketClass: 'Standart',
    amount: 96000,
    preferentialAmount: 48000,
    upgradeSurcharge: 0,
    passengerPaidAmount: 48000,
    compensationRequested: 48000,
    evidenceRef: 'TICKET-COPY-9397 · RETURN-ACT-031',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=RESTORE_REVIEW(from CONSUMED) · TICKET=RETURNED',
    settlementAction: 'EXCLUDE_PENDING_RETURN_REVIEW',
    reason: 'TECHNICAL_NONUSE — qatnov texnik sabab bilan to‘xtatilgan',
    serviceCancelledAt: '15.10.2026',
    returnedAt: '16.10.2026 10:05',
    returnDeadline: '22.10.2026',
    returnReviewStatus: 'PENDING',
    status: 'Qayta ishlanmoqda',
  },
  {
    beneficiaryCategoryCode: '01', beneficiarySource: sourceOrganizationOptions[2]?.label,
    documentNumber: '2026-261005', documentId: '005', documentDate: '2026-10-14',
    passengerName: 'ERGASHEV OLIM SOBIROVICH', passengerBirthDate: '1957-03-22',
    id: 'TEV-9396',
    occurredAt: '14.10.2026 16:40',
    ticketId: 'BUS-661284',
    reservationId: 'RSV-7C21A9',
    carrier: 'Toshkent avtovokzali',
    transportMode: 'BUS',
    eventType: 'ISSUED',
    ticketState: 'ISSUED',
    passenger: '29811•••••••09',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C01 draft profile · VMQ-440 1-band “a”',
    authorizationSource: 'MANUAL_DOCUMENT',
    legType: 'OUTBOUND',
    route: 'Toshkent → Jizzax',
    departureAt: '16.10.2026 09:00',
    serviceNumber: 'BUS-106',
    ticketClass: 'Standart',
    amount: 96000,
    preferentialAmount: 48000,
    upgradeSurcharge: 0,
    passengerPaidAmount: 48000,
    compensationRequested: 48000,
    evidenceRef: 'TICKET-COPY-9396 · ROUTE-SHEET-9396',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=CONSUMED(reason=TICKET_ISSUED) · TICKET=ISSUED',
    settlementAction: 'CLAIM_CANDIDATE_PENDING_D03',
    status: 'Qabul qilindi',
  },
  {
    beneficiaryCategoryCode: '09', beneficiarySource: sourceOrganizationOptions[3]?.label,
    documentNumber: '2026-261006', documentId: '006', documentDate: '2026-10-14',
    passengerName: 'SODIQOV BAHODIR ANVAROVICH', passengerBirthDate: '1963-08-09',
    id: 'TEV-9351',
    occurredAt: '14.10.2026 17:36',
    ticketId: 'UTY-78394418',
    reservationId: 'RSV-11FC04',
    carrier: 'O‘zbekiston temir yo‘llari',
    transportMode: 'RAIL',
    eventType: 'RESCHEDULED',
    ticketState: 'ISSUED',
    passenger: '32205•••••••16',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C07 draft profile · VMQ-440 2-band “b”',
    authorizationSource: 'ONLINE',
    legType: 'RETURN',
    route: 'Buxoro → Toshkent',
    departureAt: '19.10.2026 21:15',
    serviceNumber: '010F',
    ticketClass: 'Platskart',
    amount: 312000,
    preferentialAmount: 0,
    upgradeSurcharge: 0,
    passengerPaidAmount: 0,
    compensationRequested: 312000,
    evidenceRef: 'OLD-TICKET-78391122 · NEW-TICKET-78394418',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=UNCHANGED(CONSUMED) · OLD=EXCHANGED · NEW=ISSUED',
    settlementAction: 'RESCHEDULE_CHAIN_DEDUPLICATION',
    reason: 'Yo‘lovchi murojaati bo‘yicha boshqa sanaga ko‘chirildi; eski va yangi chipta zanjirlangan',
    rescheduleChainId: 'RSC-2026-11FC04',
    rescheduleAuthorizationRef: 'RAUTH-SEED-11FC04',
    previousTicketId: 'UTY-78391122',
    status: 'Qabul qilindi',
  },
  {
    beneficiaryCategoryCode: '09', beneficiarySource: sourceOrganizationOptions[3]?.label,
    documentNumber: '2026-261007', documentId: '007', documentDate: '2026-10-13',
    passengerName: 'SODIQOV BAHODIR ANVAROVICH', passengerBirthDate: '1963-08-09',
    id: 'TEV-9340',
    occurredAt: '13.10.2026 12:10',
    ticketId: 'UTY-78391122',
    reservationId: 'RSV-11FC04',
    carrier: 'O‘zbekiston temir yo‘llari',
    transportMode: 'RAIL',
    eventType: 'ISSUED',
    ticketState: 'ISSUED',
    passenger: '32205•••••••16',
    passengerRole: 'BENEFICIARY',
    benefitSnapshot: 'C07 draft profile · VMQ-440 2-band “b”',
    authorizationSource: 'ONLINE',
    legType: 'RETURN',
    route: 'Buxoro → Toshkent',
    departureAt: '18.10.2026 21:15',
    serviceNumber: '008F',
    ticketClass: 'Platskart',
    amount: 312000,
    preferentialAmount: 0,
    upgradeSurcharge: 0,
    passengerPaidAmount: 0,
    compensationRequested: 312000,
    evidenceRef: 'OLD-TICKET-78391122 · ROUTE-SHEET-9340',
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: 'RIGHT=CONSUMED(reason=TICKET_ISSUED) · TICKET=ISSUED',
    settlementAction: 'SUPERSEDED_BY_RESCHEDULE_CHAIN',
    status: 'Qabul qilindi',
  },
])
const ticketSearch = ref('')
const ticketFilterOpen = ref(false)
const ticketModeFilter = ref('')
const ticketCarrierFilter = ref('')
const ticketStateFilter = ref('')
const ticketDateFrom = ref('')
const ticketDateTo = ref('')
const ticketDepartureFrom = ref('')
const ticketDepartureTo = ref('')
const ticketPage = ref(1)
const ticketPageSize = ref(10)
const ticketDownloading = ref(false)
const ticketReportOpen = ref(false)
const ticketDateInvalid = computed(() => Boolean((ticketDateFrom.value && ticketDateTo.value && ticketDateFrom.value > ticketDateTo.value) || (ticketDepartureFrom.value && ticketDepartureTo.value && ticketDepartureFrom.value > ticketDepartureTo.value)))
const ticketFilterCount = computed(() => [ticketCategoryFilter.value, ticketModeFilter.value, ticketCarrierFilter.value, ticketStateFilter.value, ticketDateFrom.value, ticketDateTo.value, ticketDepartureFrom.value, ticketDepartureTo.value].filter(Boolean).length)
const ticketCarrierOptions = computed(() => [...new Set(ticketEvents.value.filter(event => !ticketModeFilter.value || event.transportMode === ticketModeFilter.value).map(event => event.carrier))])
watch(ticketModeFilter, () => { if (!ticketCarrierOptions.value.includes(ticketCarrierFilter.value)) ticketCarrierFilter.value = '' })
function clearTicketFilters() { ticketCategoryFilter.value = '';  ticketModeFilter.value = ''; ticketCarrierFilter.value = ''; ticketStateFilter.value = ''; ticketDateFrom.value = ''; ticketDateTo.value = ''; ticketDepartureFrom.value = ''; ticketDepartureTo.value = '' }
function ticketIsoDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  const [day, month, year] = value.split(' ')[0]!.split('.')
  return year && month && day ? year + '-' + month + '-' + day : ''
}
function ticketIssuedDate(event: TicketEvent) {
  if (event.ticketIssuedAt) return formatInputDate(ticketIsoDate(event.ticketIssuedAt))
  const issued = ticketEvents.value.filter(row => row.ticketId === event.ticketId && row.eventType === 'ISSUED').sort((a, b) => ticketIsoDate(a.occurredAt).localeCompare(ticketIsoDate(b.occurredAt)))[0]
  return issued ? formatInputDate(ticketIsoDate(issued.occurredAt)) : '—'
}
const ticketCarrierInn = (event: TicketEvent) => event.carrierInn || carrierOptions.find(carrier => carrier.label === event.carrier)?.inn || '—'
const ticketModeLabel = (event: TicketEvent) => transportModeOptions.find(mode => mode.code === event.transportMode)?.label || event.transportMode
const ticketCategoryLabel = (event: TicketEvent) => beneficiaryCategoryOptions.find(category => category.code === event.beneficiaryCategoryCode)?.label || '—'
const ticketRequestedShare = (event: TicketEvent) => contingentShare(event.compensationRequested, event.amount)
function latestTicketRows(events: TicketEvent[]) {
  const tickets = new Map<string, TicketEvent>()
  for (const event of events) {
    const old = tickets.get(event.ticketId)
    const stamp = (row: TicketEvent) => ticketIsoDate(row.occurredAt) + ' ' + (row.occurredAt.split(' ')[1] || '')
    if (!old || stamp(event) > stamp(old)) tickets.set(event.ticketId, event)
  }
  return [...tickets.values()]
}
const ticketDraft = ref({
  ticketId: '',
  reservationId: '',
  transportMode: 'RAIL' as TransportMode,
  eventType: 'ISSUED' as TicketEventType,
  passengerPinfl: '30202012345670',
  passengerRole: 'BENEFICIARY' as 'BENEFICIARY' | 'COMPANION',
  legType: 'OUTBOUND' as 'OUTBOUND' | 'RETURN',
  origin: 'Toshkent',
  destination: 'Samarqand',
  departureAt: '2026-10-20T08:00',
  serviceNumber: '760F',
  ticketClass: 'ECONOMY',
  amount: '248000',
  evidenceRef: 'TICKET-COPY-REF · ROUTE-SHEET-REF',
  reason: 'PASSENGER_REQUEST',
  serviceCancelledAt: '2026-10-15',
  returnedAt: '2026-10-16T10:05',
  rescheduleChainId: '',
  rescheduleAuthorizationRef: '',
  previousTicketId: '',
})

const rescheduleAuthorizationRegistry: Record<string, {
  reservationId: string
  transportMode: TransportMode
  origin: string
  destination: string
  departureDate: string
  serviceNumber: string
  legType: 'OUTBOUND' | 'RETURN'
  expiresAt: string
  signatureRef: string
}> = {
  'RAUTH-DEMO-11FC04': {
    reservationId: 'RSV-11FC04',
    transportMode: 'RAIL',
    origin: 'Buxoro',
    destination: 'Toshkent',
    departureDate: '2026-10-21',
    serviceNumber: '012F',
    legType: 'RETURN',
    expiresAt: '2026-12-31T23:59:59+05:00',
    signatureRef: 'ERI-RESCHEDULE-AUTH-11FC04',
  },
}

const returnWindowPolicy = { days: 7, version: 'D03-DRAFT-7-CALENDAR-DAYS' }

function calculateReturnDeadline(nonuseDate: string) {
  if (!nonuseDate) return ''
  const [year, month, day] = nonuseDate.split('-').map(Number)
  if (!year || !month || !day) return ''
  const date = new Date(Date.UTC(year, month - 1, day))
  date.setUTCDate(date.getUTCDate() + returnWindowPolicy.days)
  return date.toISOString().slice(0, 10)
}

const computedReturnDeadline = computed(() => calculateReturnDeadline(ticketDraft.value.serviceCancelledAt))

const ticketStateOptions = computed(() => [...new Set(latestTicketRows(ticketEvents.value).map(event => event.ticketState))])
const scopedTicketEvents = computed(() => {
  const query = ticketSearch.value.trim().toLocaleLowerCase()
  return latestTicketRows(ticketEvents.value).filter(event => {
    const date = ticketIsoDate(event.occurredAt), departure = ticketIsoDate(event.departureAt)
    return (!query || [event.id, event.ticketId, event.reservationId, event.documentNumber || '', event.documentId || '', event.passengerName || '', event.passenger, event.beneficiaryCategoryCode || '', ticketCategoryLabel(event), event.beneficiarySource || '', event.carrier, event.route, userLabel(event.ticketState)].some(value => value.toLocaleLowerCase().includes(query))) &&
      (!ticketCategoryFilter.value || event.beneficiaryCategoryCode === ticketCategoryFilter.value) && (!ticketModeFilter.value || event.transportMode === ticketModeFilter.value) && (!ticketCarrierFilter.value || event.carrier === ticketCarrierFilter.value) &&
      (!ticketDateFrom.value || Boolean(date && date >= ticketDateFrom.value)) && (!ticketDateTo.value || Boolean(date && date <= ticketDateTo.value)) &&
      (!ticketDepartureFrom.value || Boolean(departure && departure >= ticketDepartureFrom.value)) && (!ticketDepartureTo.value || Boolean(departure && departure <= ticketDepartureTo.value))
  })
})
const filteredTicketEvents = computed(() => scopedTicketEvents.value.filter(event => !ticketStateFilter.value || event.ticketState === ticketStateFilter.value))
function ticketPalette(state: string) {
  return { ...transportPalette(transportStatusTone(state)), icon: state === 'TRAVELLED' ? CheckCircle2 : transportStatusTone(state) === 'danger' ? XCircle : state ? Clock3 : TicketCheck }
}
const ticketCards = computed(() => [
  { state: '', label: 'Jami chiptalar', ...ticketTotals(scopedTicketEvents.value) },
  ...[...new Set(scopedTicketEvents.value.map(event => event.ticketState))].sort().map(state => ({ state, label: userLabel(state), ...ticketTotals(scopedTicketEvents.value.filter(event => event.ticketState === state)) })),
])
function ticketTotals(events: TicketEvent[]) {
  return events.reduce((sum, event) => ({ count: sum.count + 1, amount: sum.amount + event.amount, citizen: sum.citizen + event.passengerPaidAmount, requested: sum.requested + event.compensationRequested }), { count: 0, amount: 0, citizen: 0, requested: 0 })
}
const ticketGroupedReport = ref<InstanceType<typeof GroupedReport> | null>(null)
const ticketDimensions = [{ key: 'mode', label: 'Tashkilot turi' }, { key: 'carrier', label: 'Tashkilot' }, { key: 'category', label: 'Toifa' }, { key: 'status', label: 'Holat' }]
const ticketMetrics = [{ key: 'count', label: 'Chiptalar soni' }, { key: 'amount', label: 'Jami narx (so‘m)' }, { key: 'citizen', label: 'Yo‘lovchi to‘lovi (so‘m)' }, { key: 'requested', label: 'So‘ralgan qoplama (so‘m)' }]
const ticketCategoryFilter = ref('')
const ticketGroupedRows = computed<GroupableRow[]>(() => filteredTicketEvents.value.map(event => ({ id: event.ticketId, dimensions: { mode: { value: event.transportMode, label: ticketModeLabel(event) }, carrier: { value: event.carrier, label: event.carrier }, category: { value: event.beneficiaryCategoryCode || '', label: ticketCategoryLabel(event) + ' (' + (event.beneficiaryCategoryCode || '—') + ')' }, status: { value: event.ticketState, label: userLabel(event.ticketState) } }, metrics: { count: 1, amount: event.amount, citizen: event.passengerPaidAmount, requested: event.compensationRequested } })))
function drillTicket(path: { dimension: string; value: string }[]) {
  for (const part of path) { if (part.dimension === 'mode') ticketModeFilter.value = part.value; if (part.dimension === 'carrier') ticketCarrierFilter.value = part.value; if (part.dimension === 'status') ticketStateFilter.value = part.value; if (part.dimension === 'category') ticketCategoryFilter.value = part.value }
  ticketReportOpen.value = false
}
const ticketRowCount = computed(() => filteredTicketEvents.value.length)
const ticketPageCount = computed(() => Math.max(1, Math.ceil(ticketRowCount.value / ticketPageSize.value)))
const ticketPageEvents = computed(() => filteredTicketEvents.value.slice((ticketPage.value - 1) * ticketPageSize.value, ticketPage.value * ticketPageSize.value))
const ticketRangeStart = computed(() => ticketRowCount.value ? (ticketPage.value - 1) * ticketPageSize.value + 1 : 0)
const ticketRangeEnd = computed(() => Math.min(ticketPage.value * ticketPageSize.value, ticketRowCount.value))
watch([ticketSearch, ticketCategoryFilter, ticketModeFilter, ticketCarrierFilter, ticketStateFilter, ticketDateFrom, ticketDateTo, ticketDepartureFrom, ticketDepartureTo, ticketPageSize, ticketReportOpen], () => { ticketPage.value = 1 })
watch(ticketPageCount, count => { ticketPage.value = Math.min(ticketPage.value, count) })
async function downloadTickets() {
  if (ticketReportOpen.value) { await ticketGroupedReport.value?.download(); return }
  ticketDownloading.value = true
  try {
    const XLSX = await import('xlsx')
    let rows: (string | number)[][]
    rows = [['Hujjat raqami', 'ID', 'Hujjat sanasi', 'F.I.O.', 'JShShIR', 'Yosh', 'Toifa', 'Toifa kodi', 'Manba', 'Tashkilot', 'INN', 'Tashkilot turi', 'Chipta raqami', 'Chipta sanasi', 'Yo‘nalish', 'Jo‘nash vaqti', 'Reys', 'Tarif', 'Borish/kelish', 'So‘ralgan', 'Umumiy', 'Qoplash (%)', 'Yo‘lovchi to‘lagan', 'Holat'], ...filteredTicketEvents.value.map(event => [event.documentNumber || '', event.documentId || event.id, event.documentDate || '', event.passengerName?.toLocaleUpperCase('uz-UZ') || '', event.passenger, contingentAge(event.passengerBirthDate), ticketCategoryLabel(event), event.beneficiaryCategoryCode || '', event.beneficiarySource || '', event.carrier, ticketCarrierInn(event), ticketModeLabel(event), event.ticketId, ticketIssuedDate(event), event.route, event.departureAt, event.serviceNumber, event.ticketClass, userLabel(event.legType), event.compensationRequested, event.amount, event.amount ? Math.round(event.compensationRequested / event.amount * 1000) / 10 : 0, event.passengerPaidAmount, userLabel(event.ticketState)])]
    const book = XLSX.utils.book_new(), sheet = XLSX.utils.aoa_to_sheet(rows)
    sheet['!cols'] = rows[0]!.map(() => ({ wch: 24 }))
    XLSX.utils.book_append_sheet(book, sheet, ticketReportOpen.value ? 'Hisobot' : 'Chiptalar')
    XLSX.writeFile(book, ticketReportOpen.value ? 'chiptalar-svod.xlsx' : 'chiptalar.xlsx')
  } catch { showFeedback('error', 'Hisobotni yuklab bo‘lmadi. Qayta urinib ko‘ring.') }
  finally { ticketDownloading.value = false }
}

function ticketLedgerEffect(eventType: TicketEventType, qualifyingReturn: boolean, deadlineExpired: boolean) {
  if (eventType === 'ISSUED') return 'RIGHT=CONSUMED(reason=TICKET_ISSUED) · TICKET=ISSUED'
  if (eventType === 'TRAVELLED') return 'RIGHT=UNCHANGED(CONSUMED) · TICKET=TRAVELLED'
  if (eventType === 'RETURNED' && deadlineExpired) return 'RIGHT=UNCHANGED(CONSUMED reason=DEEMED_PROVIDED) · TICKET=RETURN_DEADLINE_EXPIRED'
  if (eventType === 'RETURNED') return qualifyingReturn ? 'RIGHT=RESTORE_REVIEW(from CONSUMED) · TICKET=RETURNED' : 'RIGHT=NO_AUTO_RESTORE(CONSUMED) · TICKET=RETURNED'
  if (eventType === 'CARRIER_CANCELLED') return 'RIGHT=CONSUMED_PENDING_D03_REVIEW · TICKET=CARRIER_CANCELLED'
  if (eventType === 'RESCHEDULED') return 'RIGHT=UNCHANGED(CONSUMED) · OLD=EXCHANGED · NEW=ISSUED'
  if (eventType === 'VOIDED') return 'RIGHT=PENDING_D03 · TICKET=VOIDED'
  return 'RIGHT=PENDING_D03 · TICKET=NO_SHOW'
}

function ticketSettlementAction(eventType: TicketEventType, deadlineExpired: boolean, qualifyingReturn: boolean) {
  if (eventType === 'ISSUED') return 'CLAIM_CANDIDATE_PENDING_D03'
  if (eventType === 'TRAVELLED') return 'SETTLEMENT_BASIS_PENDING_D03'
  if (eventType === 'RETURNED' && deadlineExpired) return 'EXCLUDE_OR_DEEMED_PROVIDED_PENDING_D03'
  if (eventType === 'RETURNED') return qualifyingReturn ? 'EXCLUDE_PENDING_RETURN_REVIEW' : 'PENDING_D03_VOLUNTARY_RETURN_DECISION'
  if (eventType === 'CARRIER_CANCELLED') return 'EXCLUDE_OR_RECONCILE_PENDING_D03'
  if (eventType === 'RESCHEDULED') return 'RESCHEDULE_CHAIN_DEDUPLICATION'
  if (eventType === 'VOIDED') return 'EXCLUDE_OR_RECONCILE_PENDING_D03'
  return 'NO_SHOW_OR_DEEMED_PROVIDED_PENDING_D03'
}

function ticketStateForEvent(eventType: TicketEventType, deadlineExpired: boolean): TicketEvent['ticketState'] {
  if (eventType === 'ISSUED') return 'ISSUED'
  if (eventType === 'TRAVELLED') return 'TRAVELLED'
  if (eventType === 'RETURNED') return deadlineExpired ? 'RETURN_DEADLINE_EXPIRED' : 'RETURNED'
  if (eventType === 'CARRIER_CANCELLED') return 'CARRIER_CANCELLED'
  if (eventType === 'RESCHEDULED') return 'ISSUED'
  if (eventType === 'VOIDED') return 'VOID'
  return 'NO_SHOW'
}

function currentTicketProjection(ticketId: string) {
  const exchangedBy = ticketEvents.value.find((event) => event.eventType === 'RESCHEDULED' && event.previousTicketId === ticketId)
  if (exchangedBy) return { event: exchangedBy, state: 'EXCHANGED' as TicketEvent['ticketState'] }
  const event = ticketEvents.value.find((item) => item.ticketId === ticketId)
  return event ? { event, state: event.ticketState } : undefined
}

function principalTripAllowsCompanion(companionAuthorization: ReservationAuthorization) {
  if (!companionAuthorization.companionLink) return true
  const principal = reservationAuthorizations.value[companionAuthorization.companionLink]
  if (!principal
    || !['HELD', 'CONSUMED'].includes(principal.status)
    || principal.transportMode !== companionAuthorization.transportMode
    || principal.origin !== companionAuthorization.origin
    || principal.destination !== companionAuthorization.destination
    || principal.departureDate !== companionAuthorization.departureDate
    || principal.serviceNumber !== companionAuthorization.serviceNumber
    || principal.legType !== companionAuthorization.legType) return false

  const latestPrincipalTicket = ticketEvents.value.find((event) => event.reservationId === companionAuthorization.companionLink)
  return Boolean(latestPrincipalTicket && ['ISSUED', 'TRAVELLED'].includes(latestPrincipalTicket.ticketState))
}

function appendCompanionReconciliation(principalReservationId: string, companionReservationId: string) {
  const latestCompanionTicket = ticketEvents.value.find((event) => event.reservationId === companionReservationId)
  if (!latestCompanionTicket || latestCompanionTicket.settlementAction.includes('PRINCIPAL_INVALIDATED')) return
  const alreadyTravelled = latestCompanionTicket.ticketState === 'TRAVELLED'
  ticketEvents.value.unshift({
    ...latestCompanionTicket,
    id: `TEV-SYS-${String(Date.now()).slice(-8)}`,
    occurredAt: transactionTimestamp(),
    eventType: 'VOIDED',
    ticketState: 'VOID',
    compensationRequested: 0,
    ledgerEffect: `DERIVED_COMPANION=INVALIDATED(principal=${principalReservationId}) · TICKET=VOID`,
    settlementAction: alreadyTravelled
      ? 'REVERSE_OR_RECOVER_COMPENSATION_PRINCIPAL_INVALIDATED'
      : 'EXCLUDE_COMPENSATION_PRINCIPAL_INVALIDATED',
    reason: `Principal safar ${principalReservationId} endi faol emas; companion authorization server tomonidan invalidatsiya qilindi.`,
    returnReviewStatus: undefined,
    returnReviewRef: undefined,
    status: 'Qayta ishlanmoqda',
  })
}

function invalidateCompanionSlot(principalReservationId: string, reusableAfterRebind = false) {
  const slot = companionTripSlots.value[principalReservationId]
  if (!slot) return
  if (slot.companionReservationId) {
    const companionAuthorization = reservationAuthorizations.value[slot.companionReservationId]
    if (companionAuthorization && ['CONSUMED', 'RESTORE_REVIEW'].includes(companionAuthorization.status)) {
      appendCompanionReconciliation(principalReservationId, slot.companionReservationId)
    }
    if (companionAuthorization && ['HELD', 'CONSUMED', 'RESTORE_REVIEW'].includes(companionAuthorization.status)) {
      companionAuthorization.status = 'RELEASED'
    }
  }
  slot.status = reusableAfterRebind ? 'AVAILABLE' : 'INVALIDATED'
  slot.companionPinfl = undefined
  slot.companionReservationId = undefined
}

function submitTicketEvent() {
  releaseExpiredReservations()
  if (!ticketDraft.value.ticketId.trim() || !ticketDraft.value.reservationId.trim() || ticketDraft.value.passengerPinfl.replace(/\D/g, '').length !== 14) {
    showFeedback('error', 'Chipta, rezerv va 14 xonali yo‘lovchi JShShIRini kiriting.')
    return
  }
  if (!ticketDraft.value.evidenceRef.trim() || !ticketDraft.value.serviceNumber.trim()) {
    showFeedback('error', 'Qatnov raqami, chipta nusxasi va yo‘nalish qaydnomasi reference’larini kiriting.')
    return
  }
  const reservationAuthorization = reservationAuthorizations.value[ticketDraft.value.reservationId.trim()]
  if (!reservationAuthorization) {
    showFeedback('error', 'Rezerv YAMIH server registrida topilmadi; authorization_source tashuvchi tomonidan berilmaydi.')
    return
  }
  const rescheduleAuthorization = ticketDraft.value.eventType === 'RESCHEDULED'
    ? rescheduleAuthorizationRegistry[ticketDraft.value.rescheduleAuthorizationRef.trim()]
    : undefined
  if (ticketDraft.value.eventType === 'RESCHEDULED' && (!rescheduleAuthorization
    || rescheduleAuthorization.reservationId !== ticketDraft.value.reservationId.trim()
    || Date.parse(rescheduleAuthorization.expiresAt) <= Date.now())) {
    showFeedback('error', 'Ko‘chirish uchun shu rezervga bog‘langan, amal qilayotgan server-signed reschedule authorization talab qilinadi.')
    return
  }
  const journeyMatchesAuthorization = rescheduleAuthorization
    ? rescheduleAuthorization.transportMode === ticketDraft.value.transportMode
      && rescheduleAuthorization.origin === ticketDraft.value.origin
      && rescheduleAuthorization.destination === ticketDraft.value.destination
      && rescheduleAuthorization.departureDate === ticketDraft.value.departureAt.slice(0, 10)
      && rescheduleAuthorization.serviceNumber === ticketDraft.value.serviceNumber.trim()
      && rescheduleAuthorization.legType === ticketDraft.value.legType
    : reservationAuthorization.transportMode === ticketDraft.value.transportMode
      && reservationAuthorization.origin === ticketDraft.value.origin
      && reservationAuthorization.destination === ticketDraft.value.destination
      && reservationAuthorization.departureDate === ticketDraft.value.departureAt.slice(0, 10)
      && reservationAuthorization.serviceNumber === ticketDraft.value.serviceNumber.trim()
      && reservationAuthorization.legType === ticketDraft.value.legType
  const reservationMatchesTicket = reservationAuthorization.personPinfl === ticketDraft.value.passengerPinfl
    && journeyMatchesAuthorization
  if (!reservationMatchesTicket) {
    showFeedback('error', 'Rezerv benefitsiar, transport, yo‘nalish, qatnov, safar sanasi yoki segment bilan mos kelmadi.')
    return
  }
  if (ticketDraft.value.passengerRole === 'COMPANION' && !reservationAuthorization.companionLink) {
    showFeedback('error', 'COMPANION chiptasi uchun server rezervida tasdiqlangan companion_link bo‘lishi shart.')
    return
  }
  if (ticketDraft.value.passengerRole === 'BENEFICIARY' && reservationAuthorization.companionLink) {
    showFeedback('error', 'Ushbu rezerv companion_link bilan bog‘langan; yo‘lovchi roli COMPANION bo‘lishi kerak.')
    return
  }
  if (reservationAuthorization.companionLink && !principalTripAllowsCompanion(reservationAuthorization)) {
    reservationAuthorization.status = 'RELEASED'
    const slot = companionTripSlots.value[reservationAuthorization.companionLink]
    if (slot) slot.status = 'INVALIDATED'
    showFeedback('error', 'Companion rezerv bloklandi: principal safar qaytarilgan, bekor qilingan, ko‘chirilgan yoki journey/service snapshoti endi mos emas.')
    return
  }
  if (ticketDraft.value.eventType === 'ISSUED' && reservationAuthorization.status === 'HELD' && (!reservationAuthorization.expiresAt || Date.parse(reservationAuthorization.expiresAt) <= Date.now())) {
    releaseReservationHold(ticketDraft.value.reservationId.trim(), reservationAuthorization)
    showFeedback('error', 'ISSUED atomar commitida rezerv TTL tugagan; hold release qilindi va huquq qayta tekshirilishi kerak.')
    return
  }
  if (ticketDraft.value.eventType === 'ISSUED' && reservationAuthorization.status !== 'HELD') {
    showFeedback('error', 'ISSUED faqat HELD rezervni commit qiladi; sarflangan rezerv qayta debit qilinmaydi.')
    return
  }
  const currentTicket = currentTicketProjection(ticketDraft.value.ticketId.trim())
  if (ticketDraft.value.eventType === 'ISSUED' && currentTicket) {
    showFeedback('error', `Chipta ID allaqachon ${currentTicket.state} holatida; ISSUED idempotency/event_id orqali qayta olinadi.`)
    return
  }
  if (!['ISSUED', 'RESCHEDULED'].includes(ticketDraft.value.eventType)) {
    if (!currentTicket || currentTicket.state !== 'ISSUED' || currentTicket.event.reservationId !== ticketDraft.value.reservationId.trim()) {
      showFeedback('error', 'Lifecycle eventi faqat shu rezervga bog‘langan mavjud ISSUED chipta uchun qabul qilinadi.')
      return
    }
  }
  if (ticketDraft.value.eventType === 'RETURNED' && !ticketDraft.value.reason.trim()) {
    showFeedback('error', 'Qaytarish eventi uchun sabab majburiy.')
    return
  }
  if (ticketDraft.value.eventType === 'RETURNED' && !ticketDraft.value.returnedAt) {
    showFeedback('error', 'Qaytarish eventi uchun qaytarilgan vaqt majburiy.')
    return
  }
  if (ticketDraft.value.eventType === 'RETURNED' && currentTicket
    && parseDateTimeLocal(ticketDraft.value.returnedAt) < parseAuditTimestamp(currentTicket.event.occurredAt)) {
    showFeedback('error', 'Qaytarilgan vaqt kanonik ISSUED/RESCHEDULED event vaqtidan oldin bo‘lishi mumkin emas.')
    return
  }
  const qualifyingReturn = ticketDraft.value.eventType === 'RETURNED'
    && ['TECHNICAL_NONUSE', 'NATURAL_NONUSE', 'OTHER_VERIFIED_NONUSE', 'CARRIER_CANCELLED'].includes(ticketDraft.value.reason)
  if (qualifyingReturn && (!ticketDraft.value.serviceCancelledAt || !ticketDraft.value.returnedAt || !computedReturnDeadline.value)) {
    showFeedback('error', 'Limitni tiklashga nomzod qaytarish uchun nonuse sanasi va qaytarilgan vaqt majburiy; deadline’ni server policy hisoblaydi.')
    return
  }
  if (qualifyingReturn && ticketDraft.value.returnedAt.slice(0, 10) < ticketDraft.value.serviceCancelledAt) {
    showFeedback('error', 'Qaytarilgan vaqt tasdiqlangan nonuse/qatnov to‘xtagan sanadan oldin bo‘lishi mumkin emas.')
    return
  }
  const deadlineExpired = Boolean(qualifyingReturn && ticketDraft.value.returnedAt.slice(0, 10) > computedReturnDeadline.value)
  if (ticketDraft.value.eventType === 'RESCHEDULED' && (!ticketDraft.value.rescheduleChainId.trim() || !ticketDraft.value.previousTicketId.trim() || !ticketDraft.value.rescheduleAuthorizationRef.trim())) {
    showFeedback('error', 'Ko‘chirish eventi uchun reschedule_chain_id, server authorization reference va eski chipta IDsi majburiy.')
    return
  }
  if (ticketDraft.value.eventType === 'RESCHEDULED') {
    const previousTicket = currentTicketProjection(ticketDraft.value.previousTicketId.trim())
    if (currentTicket || !previousTicket || previousTicket.state !== 'ISSUED' || previousTicket.event.reservationId !== ticketDraft.value.reservationId.trim()) {
      showFeedback('error', 'Reschedule yangi ticket_id va shu rezervdagi mavjud ISSUED old_ticket_id zanjirini talab qiladi.')
      return
    }
  }
  const requestedActualAmount = Number(ticketDraft.value.amount) || 0
  if (requestedActualAmount <= 0) {
    showFeedback('error', 'Amaldagi tarif musbat bo‘lishi kerak va server tarif registri bilan solishtiriladi.')
    return
  }
  const lifecycleSource = !['ISSUED', 'RESCHEDULED'].includes(ticketDraft.value.eventType) ? currentTicket?.event : undefined
  const actualAmount = lifecycleSource?.amount ?? requestedActualAmount
  const canonicalTicketClass = lifecycleSource?.ticketClass ?? ticketDraft.value.ticketClass
  const eligibleBase = Math.min(actualAmount, reservationAuthorization.maxEligibleBase)
  const calculatedUpgrade = Math.max(actualAmount - eligibleBase, 0)
  const calculatedCompensation = Math.round(eligibleBase * reservationAuthorization.discountPercent / 100)
  const calculatedPreferential = eligibleBase - calculatedCompensation
  const preferentialAmount = lifecycleSource?.preferentialAmount ?? calculatedPreferential
  const upgradeSurcharge = lifecycleSource?.upgradeSurcharge ?? calculatedUpgrade
  const passengerPaidAmount = lifecycleSource?.passengerPaidAmount ?? Math.max(actualAmount - calculatedCompensation, 0)
  const compensationRequested = lifecycleSource?.compensationRequested ?? calculatedCompensation
  ticketEvents.value.unshift({
    id: `TEV-${9500 + ticketEvents.value.length}`,
    occurredAt: transactionTimestamp(),
    ticketId: ticketDraft.value.ticketId.trim(),
    reservationId: ticketDraft.value.reservationId.trim(),
    carrier: reservationAuthorization.carrierName,
    transportMode: ticketDraft.value.transportMode,
    eventType: ticketDraft.value.eventType,
    ticketState: ticketStateForEvent(ticketDraft.value.eventType, deadlineExpired),
    passenger: maskPinfl(ticketDraft.value.passengerPinfl),
    passengerRole: ticketDraft.value.passengerRole,
    benefitSnapshot: `${reservationAuthorization.policySnapshot} · ${reservationAuthorization.offerId}`,
    authorizationSource: reservationAuthorization.authorizationSource,
    legType: reservationAuthorization.legType,
    principalLink: reservationAuthorization.companionLink,
    route: `${ticketDraft.value.origin} → ${ticketDraft.value.destination}`,
    departureAt: lifecycleSource?.departureAt ?? ticketDraft.value.departureAt.replace('T', ' '),
    serviceNumber: lifecycleSource?.serviceNumber ?? ticketDraft.value.serviceNumber.trim(),
    ticketClass: canonicalTicketClass,
    amount: actualAmount,
    preferentialAmount,
    upgradeSurcharge,
    passengerPaidAmount,
    compensationRequested,
    evidenceRef: ticketDraft.value.evidenceRef.trim(),
    paymentChannel: 'MONTHLY_CLAIM',
    ledgerEffect: ticketLedgerEffect(ticketDraft.value.eventType, qualifyingReturn, deadlineExpired),
    settlementAction: ticketSettlementAction(ticketDraft.value.eventType, deadlineExpired, qualifyingReturn),
    reason: ticketDraft.value.eventType === 'CARRIER_CANCELLED'
      ? 'CARRIER_CANCELLED · settlement/restore decision PENDING_D03'
      : deadlineExpired
        ? `${ticketDraft.value.reason.trim()} · DEADLINE_EXPIRED · deemed_provided=true`
        : ticketDraft.value.reason.trim() || undefined,
    serviceCancelledAt: qualifyingReturn ? formatInputDate(ticketDraft.value.serviceCancelledAt) : undefined,
    returnedAt: ticketDraft.value.eventType === 'RETURNED' ? ticketDraft.value.returnedAt.replace('T', ' ') : undefined,
    returnDeadline: qualifyingReturn ? `${formatInputDate(computedReturnDeadline.value)} · ${returnWindowPolicy.version} · server-derived` : undefined,
    returnReviewStatus: qualifyingReturn && !deadlineExpired
      ? 'PENDING'
      : ticketDraft.value.eventType === 'RETURNED' && !qualifyingReturn
        ? 'METHODOLOGY_PENDING'
        : undefined,
    rescheduleChainId: ticketDraft.value.eventType === 'RESCHEDULED' ? ticketDraft.value.rescheduleChainId.trim() : undefined,
    rescheduleAuthorizationRef: ticketDraft.value.eventType === 'RESCHEDULED' ? ticketDraft.value.rescheduleAuthorizationRef.trim() : undefined,
    previousTicketId: ticketDraft.value.eventType === 'RESCHEDULED' ? ticketDraft.value.previousTicketId.trim() : undefined,
    status: 'Qayta ishlanmoqda',
  })
  const bundle = entitlementBundles.value[reservationAuthorization.entitlementKey]
  const companionSlot = reservationAuthorization.companionLink
    ? companionTripSlots.value[reservationAuthorization.companionLink]
    : undefined
  if (ticketDraft.value.eventType === 'ISSUED') {
    reservationAuthorization.status = 'CONSUMED'
    if (companionSlot?.companionReservationId === ticketDraft.value.reservationId.trim()) {
      companionSlot.status = 'CONSUMED'
    }
    else if (bundle) {
      bundle.legs[reservationAuthorization.legType] = 'CONSUMED'
      delete bundle.activeReservations[reservationAuthorization.legType]
    }
  }
  if (qualifyingReturn && !deadlineExpired) {
    reservationAuthorization.status = 'RESTORE_REVIEW'
    if (companionSlot?.companionReservationId === ticketDraft.value.reservationId.trim()) {
      companionSlot.status = 'RESTORE_REVIEW'
    }
    else if (bundle) {
      bundle.legs[reservationAuthorization.legType] = 'RESTORE_REVIEW'
    }
  }
  if (!reservationAuthorization.companionLink && ['RETURNED', 'CARRIER_CANCELLED', 'VOIDED', 'NO_SHOW'].includes(ticketDraft.value.eventType)) {
    invalidateCompanionSlot(ticketDraft.value.reservationId.trim())
  }
  if (!reservationAuthorization.companionLink && ticketDraft.value.eventType === 'RESCHEDULED') {
    if (rescheduleAuthorization) {
      reservationAuthorization.transportMode = rescheduleAuthorization.transportMode
      reservationAuthorization.origin = rescheduleAuthorization.origin
      reservationAuthorization.destination = rescheduleAuthorization.destination
      reservationAuthorization.departureDate = rescheduleAuthorization.departureDate
      reservationAuthorization.serviceNumber = rescheduleAuthorization.serviceNumber
      reservationAuthorization.legType = rescheduleAuthorization.legType
      reservationAuthorization.expiresAt = undefined
    }
    invalidateCompanionSlot(ticketDraft.value.reservationId.trim(), true)
  }
  ticketDraft.value.ticketId = ''
  ticketDraft.value.reservationId = ''
  showFeedback(deadlineExpired ? 'info' : 'success', deadlineExpired
    ? 'Kech qaytarish yo‘qotilmadi: RETURN_DEADLINE_EXPIRED/deemed_provided sifatida qayd etildi; limit tiklanmadi.'
    : qualifyingReturn
      ? 'Qaytarish qayd etildi; limit faqat vakolatli return review APPROVED bo‘lgach atomar tiklanadi.'
      : ticketDraft.value.eventType === 'RETURNED'
        ? 'Yo‘lovchi talabi qayd etildi; huquq CONSUMED qoladi, keyingi qaror D-03 metodikasi yopilgach beriladi.'
      : 'Chipta eventi yagona lifecycle API va state-machine orqali qabul qilindi.')
}

function decideReturnReview(event: TicketEvent, decision: 'APPROVED' | 'REJECTED') {
  const authority = returnReviewAuthority.value
  if (!authority) {
    showFeedback('error', 'Return review uchun server sessiyasida alohida permission, organization claim va ERI signature reference bo‘lishi shart.')
    return
  }
  if (event.returnReviewStatus !== 'PENDING') {
    showFeedback('error', 'Faqat PENDING return review bo‘yicha vakolatli qaror qabul qilinadi.')
    return
  }
  const authorization = reservationAuthorizations.value[event.reservationId]
  if (!authorization || authorization.status !== 'RESTORE_REVIEW') {
    showFeedback('error', 'Return review reservation ledgeridagi RESTORE_REVIEW holati bilan mos kelmadi.')
    return
  }

  const bundle = entitlementBundles.value[authorization.entitlementKey]
  const companionSlot = authorization.companionLink
    ? companionTripSlots.value[authorization.companionLink]
    : undefined
  const approved = decision === 'APPROVED'
  authorization.status = approved ? 'RESTORED' : 'CONSUMED'

  if (companionSlot?.companionReservationId === event.reservationId) {
    companionSlot.status = approved ? 'RESTORED' : 'CONSUMED'
    if (approved) {
      companionSlot.companionPinfl = undefined
      companionSlot.companionReservationId = undefined
    }
  }
  else if (bundle) {
    bundle.legs[authorization.legType] = approved ? 'RESTORED' : 'CONSUMED'
    delete bundle.activeReservations[authorization.legType]
  }

  event.returnReviewStatus = decision
  event.returnReviewRef = `RTR-${event.id}-${decision} · actor=${authority.actorId} · org=${authority.organizationId} · role=${authority.role} · ${authority.signatureRef}`
  event.ledgerEffect = approved
    ? 'RIGHT=RESTORED(reason=VERIFIED_NONUSE_REVIEW_APPROVED) · TICKET=RETURNED'
    : 'RIGHT=UNCHANGED(CONSUMED reason=RETURN_REVIEW_REJECTED) · TICKET=RETURNED'
  event.settlementAction = approved ? 'EXCLUDE_CONFIRMED_AFTER_RETURN_REVIEW' : 'SETTLEMENT_DECISION_PENDING_D03'
  event.status = 'Qabul qilindi'
  showFeedback(approved ? 'success' : 'info', approved
    ? 'Vakolatli review tasdiqlandi: limit endi atomar RESTORED qilindi va audit reference yozildi.'
    : 'Return review rad etildi: huquq CONSUMED bo‘lib qoldi; claimability D-03 metodikasigacha aniqlanmaydi.')
}


const apiDefinitions: ApiDefinition[] = [
  {
    id: 'contingent',
    method: 'POST',
    endpoint: '/v1/beneficiary-events',
    title: 'Imtiyoz oluvchilar eventlari',
    description: 'Barcha manba idoralar, toifalar va huquq o‘zgarishlari uchun bitta kontrakt.',
    consumers: '6 ta manba tashkilot',
    variants: ['RIGHT_GRANTED', 'RIGHT_CORRECTED', 'RIGHT_REVOKED', 'RIGHT_REINSTATED', '/v1/beneficiary-snapshots/batches'],
    sample: `{
  "event_id": "01JX...",
  "event_type": "RIGHT_GRANTED",
  "source_record": { "id": "DEF-88421", "version": 4 },
  "person": { "pinfl": "**************" },
  "right": {
    "technical_profile_code": "C09",
    "legal_basis_code": "PART_EQ_10",
    "effective_from": "2026-10-01"
  }
}`,
  },
  {
    id: 'eligibility',
    method: 'POST',
    endpoint: '/v1/entitlements/check-and-reserve',
    title: 'Imtiyozni tekshirish qarori',
    description: 'Rail, air va bus uchun bir xil request; farq transport_mode va policy orqali boshqariladi.',
    consumers: 'Barcha tashuvchilar va kassalar',
    variants: ['/v1/eligibility/check', '/v1/entitlements/check-and-reserve', 'MANUAL_AUTHORIZATION'],
    sample: `{
  "intent": "CHECK_AND_RESERVE",
  "applicant": { "role": "BENEFICIARY" },
  "beneficiary": {
    "pinfl": "**************",
    "identity_document_ref": "protected-reference"
  },
  "journey": {
    "transport_mode": "RAIL",
    "origin_country": "UZ",
    "origin_code": "TAS",
    "destination_country": "UZ",
    "destination_code": "SKD",
    "service_number": "760F",
    "departure_at": "2026-10-15T08:00:00+05:00",
    "requested_legs": ["OUTBOUND"],
    "fare_class": "COUPE"
  },
  "selected_offer_id": "offer_annual_standard_rail_free",
  "manual_authorization_token": null
}`,
  },
  {
    id: 'ticket',
    method: 'POST',
    endpoint: '/v1/tickets/issue',
    title: 'Chipta issue va lifecycle family',
    description: 'Barcha transportlar uchun umumiy schema; rezervni commit qiluvchi issue va keyingi eventlar invariantiga ko‘ra ajratilgan.',
    consumers: 'Temir yo‘l, aviakompaniya va avtovokzallar',
    variants: ['/v1/tickets/{ticket_id}/events', '/v1/ticket-events/batches', '/v1/travel-evidence'],
    sample: `{
  "event_id": "TEV-9431",
  "event_type": "ISSUED",
  "ticket_id": "UTY-78394510",
  "reservation_id": "RSV-PRINCIPAL-001",
  "passenger": { "pinfl": "**************" },
  "transport_mode": "RAIL",
  "journey": {
    "leg_type": "OUTBOUND",
    "service_number": "760F",
    "departure_at": "2026-10-20T08:00:00+05:00",
    "fare_class": "COUPE"
  },
  "fare": {
    "actual_fare_minor": 24800000,
    "currency": "UZS",
    "currency_exponent": 2,
    "tariff_evidence_ref": "TARIFF-REF-9431"
  },
  "evidence_refs": ["TICKET-COPY-9431", "ROUTE-SHEET-9431"]
}`,
  },
  ...financeApiDefinitions,
  {
    id: 'reference-data',
    method: 'GET',
    endpoint: '/v1/reference-data/{catalog_code}',
    title: 'Ma’lumotnomalar',
    description: 'Barcha kataloglar uchun bitta versiyalangan kontrakt; katalog turi path, amal sanasi va filtrlar query orqali beriladi.',
    consumers: 'Barcha ichki modullar, tashuvchilar va integratsiya adapterlari',
    variants: ['as_of', 'status', 'version', 'changed_since'],
    sample: `GET /v1/reference-data/transport_modes?as_of=2026-10-01&status=ACTIVE

{
  "catalog_code": "transport_modes",
  "version": 3,
  "as_of": "2026-10-01",
  "entries": [
    {
      "code": "RAIL",
      "name": "Temir yo‘l",
      "kind": "NORMATIVE_REFERENCE",
      "effective_from": "2026-10-01",
      "status": "ACTIVE"
    }
  ]
}`,
  },
]

const architectureModules = [
  {
    icon: BookOpenCheck,
    title: 'Reference Data',
    description: 'Normativ mazmun va texnik konfiguratsiyalar uchun bitta versiyalangan registr; D-gate va amal davri bilan boshqariladi.',
    owns: 'reference_catalog · reference_entry · reference_entry_revision',
  },
  {
    icon: UploadCloud,
    title: 'Integration & Registry',
    description: 'Idoralararo integratsiyalashuv platformasi orqali kontingent/tashuvchi almashinuvi, idempotency, quarantine va huquq tarixi.',
    owns: 'person · source_record · right_assignment',
  },
  {
    icon: ShieldCheck,
    title: 'Benefit Engine',
    description: 'Policy, moslik, global limit va atomar rezerv.',
    owns: 'benefit_policy · ledger_entry · reservation',
  },
  {
    icon: FileCheck2,
    title: 'Manual Verification',
    description: 'YAMIHda topilmagan huquq uchun hujjat case’i va bir martalik opaque authorization.',
    owns: 'manual_case · document_ref · authorization_hash',
  },
  {
    icon: TicketCheck,
    title: 'Ticket Lifecycle',
    description: 'Barcha transportlar uchun chipta va segment eventlari.',
    owns: 'ticket · ticket_segment · ticket_event',
  },
  {
    icon: WalletCards,
    title: 'Settlement',
    description: 'Oylik reyestr, immutable claim va tashqi moliya ATiga idempotent handoff. Bank transferi tashqi tizimda.',
    owns: 'settlement · claim · finance_handoff',
  },
  {
    icon: Activity,
    title: 'Audit & Reporting',
    description: 'Append-only audit, SLA, nazorat va shikoyat dalil paketlari.',
    owns: 'audit_event · report_snapshot · evidence_export',
  },
]

const decisionGates = [
  { id: 'D-01', label: '11 profil, subtoifa va source ownership' },
  { id: 'D-02', label: 'Mixed-mode, benefit yili, C11 “ikki marta”, hamroh biennial' },
  { id: 'D-03', label: 'settlement_basis, return/no-show, tarif, ERI va 10 ish kuni' },
  { id: 'D-04', label: 'Manual hujjatlar katalogi, tekshiruvchi vakolat va SLA' },
  { id: 'D-05', label: 'Tarix manbasi/import sign-off yoki formal transition' },
  { id: 'D-06', label: '4-ilova 152-banddagi qo‘shimcha rail toifalari' },
  { id: 'D-07', label: 'Oylik va Social Card real-time kanal chegarasi' },
]

const mvpInScope = [
  'Imtiyoz oluvchilar va ularning huquqlari haqidagi ma’lumotlarni yuritish',
  'Imtiyozni tekshirish va safar uchun vaqtincha band qilish',
  'Chipta berish, qaytarish va almashtirish ma’lumotlarini yuritish',
  'Tashuvchilarning oylik buyurtmanomalari va hujjatlarini qabul qilish',
  'Chiptalarni tekshirish va qoplanadigan summani tasdiqlash',
  'Buyurtmanomani subsidiya tizimiga yuborish va to‘lov javobini olish',
  'To‘lov holatini tashkilotga yetkazish va raqam orqali qidirish',
]

const mvpOutOfScope = [
  'Ijtimoiy karta orqali real vaqt to‘lovlarini 2027-yil 1-yanvardan yo‘lga qo‘yish',
  'Bank bilan bajarilgan to‘lovlarni solishtirish imkoniyatlarini kengaytirish',
  'Tashuvchining joy tanlash va oddiy chipta sotish xizmatlari',
]

const mvpRoleStreams = [
  {
    code: 'LEGAL_PRODUCT_OWNER',
    role: 'Huquqiy va mahsulot egasi',
    responsibility: 'Normativ talqin, scope, D-gate ownerlari va policy release’ini tasdiqlaydi.',
    deliverable: 'D-01…D-06 imzolangan qarorlari · REQ traceability · acceptance sign-off',
  },
  {
    code: 'REFERENCE_STEWARD + APPROVER',
    role: 'Ma’lumotnoma stewardi va tasdiqlovchi',
    responsibility: 'Katalog/policy revisionlarini maker-checker tartibida tayyorlaydi va ERI bilan publish qiladi.',
    deliverable: 'Effective-dated revision · ownership/relation · approval/audit',
  },
  {
    code: 'SOURCE_PUBLISHER + REGISTRY_OPERATOR',
    role: 'Manba idora va registr operatori',
    responsibility: 'Snapshot/delta yuboradi; ACK/NACK, quarantine, conflict va data-quality holatlarini boshqaradi.',
    deliverable: 'Authoritative huquq tarixi · high-water mark · reconciliation',
  },
  {
    code: 'CARRIER_ELIGIBILITY + ISSUER',
    role: 'Tashuvchi kassasi va issuer',
    responsibility: 'Minimal PII bilan moslik/rezerv so‘raydi; o‘z chiptasi issue va lifecycle eventlarini yuboradi.',
    deliverable: 'Reservation commit · ticket/segment · evidence va lost-ACK recovery',
  },
  {
    code: 'CASE_REVIEWER',
    role: 'Manual va qaytarish revieweri',
    responsibility: 'Hujjat case’i, bir martalik authorization va qualifying nonuse bo‘yicha vakolatli qaror beradi.',
    deliverable: 'ERI/auditli decision · token hash · restore yoki fail-closed natija',
  },
  {
    code: 'CARRIER_FINANCE',
    role: 'Tashuvchi moliyachisi',
    responsibility: 'O‘z reyestri, qatorlari va normativ ilovalarini tayyorlab ERI bilan yuboradi.',
    deliverable: 'Settlement batch · evidence completeness · correction/resubmit',
  },
  {
    code: 'AGENCY_FINANCE_CHECKER + APPROVER',
    role: 'Agentlik moliya tekshiruvchisi va tasdiqlovchi',
    responsibility: 'Line validation/reconciliationni maker-checker usulida yakunlab immutable claim yaratadi.',
    deliverable: 'Accepted claim version · payload hash · moliya handoff authorization',
  },
  {
    code: 'INTEGRATION_OPS + SRE + SECURITY',
    role: 'Integratsiya, ekspluatatsiya va xavfsizlik',
    responsibility: 'Client/certifikat, queue, outbox/inbox, SLA, monitoring, DR va PII nazoratini yuritadi.',
    deliverable: 'mTLS/OIDC · SLO dashboard · runbook · backup/restore evidence',
  },
  {
    code: 'AUDITOR + INSPECTOR',
    role: 'Auditor va nazorat organi',
    responsibility: 'Read-only dalil paketlari, normativ snapshot va WORM audit izini tekshiradi.',
    deliverable: 'Evidence export · appeal/reconciliation trace · access audit',
  },
]

const mvpPhases = [
  { id: 'P0', period: '2–3 kun', title: 'Contract va gate freeze', owner: 'Legal/Product + Architect', exit: 'OpenAPI/event schema, D-owner, threat model va scope sign-off' },
  { id: 'P1', period: '1-hafta', title: 'Platforma va master-data', owner: 'Backend + DevOps + Security', exit: 'DB migration, IAM, audit/outbox va approved-effective reference API' },
  { id: 'P2', period: '1–2-hafta', title: 'Imtiyoz oluvchilar registri', owner: 'Backend + Data + Source teams', exit: 'Snapshot/delta, bitemporal rights, quarantine va source certification' },
  { id: 'P3', period: '2–3-hafta', title: 'Eligibility va global ledger', owner: 'Backend + Policy + Carrier teams', exit: 'Atomic reserve, TTL/release, companion/manual va concurrency testlari' },
  { id: 'P4', period: '3–4-hafta', title: 'Chipta va review', owner: 'Backend + Frontend + QA', exit: 'Issue/lifecycle, evidence, return/reschedule va reconciliation E2E' },
  { id: 'P5', period: '4–5-hafta', title: 'Buyurtmanomalar va to‘lovlar', owner: 'Moliya va integratsiya mas’ullari', exit: 'Tekshiruv, tasdiqlash, to‘lovga yuborish va natijani olish' },
  { id: 'P6', period: '5–6-hafta', title: 'Hardening va pilot', owner: 'QA + SRE + Security + Business', exit: 'Load/security/DR, carrier certification va go-live sign-off' },
]

const mvpAcceptanceGates = [
  'Har bir write command: Idempotency-Key + organization scope + append-only audit + outbox',
  'Huquq, ledger, rezerv, ticket, claim va handoff alohida typed aggregate/state-machine',
  '100 parallel rezerv so‘rovida bir entitlement leg faqat bir marta HELD/CONSUMED',
  'D-gate ochiq policy productionda PUBLISHED bo‘lmaydi; UI demo natijasi production fakt emas',
  'Claim faqat tasdiqlangan settlement_basis va tekshirilgan ticket line’dan tuziladi',
  'Handoff claim_id + version + payload_hash + accepted_amountga aynan bog‘lanadi',
  'Role/org isolation, PII log scan, contract/integration/E2E va restore drill o‘tadi',
]

const reportingScopes = [
  'Faol/nofaol kontingent va huquqiy asos',
  'Yil kesimida foydalanilgan/foydalanilmagan limit',
  'Transport turi va tashuvchi kesimi',
  'ISSUED, TRAVELLED, RETURNED va RESCHEDULED chipta holatlari',
  'Amaldagi, imtiyozli, hisoblangan, qabul qilingan summa va handoff holati',
  'Bir haftalik qaytarish hamda hujjatlar kelgach 10 ish kunlik normativ SLA',
  'Manual case, missing evidence, dublikat va rezerv konfliktlari',
]

const auditEvidenceFields = [
  'actor_id · organization_id · role',
  'correlation_id · idempotency_key',
  'pseudonymous person reference',
  'before_hash · after_hash · payload_hash',
  'policy/rule version · reason code',
  'manual reviewer/approver chain',
  'ticket · claim · finance_handoff · reconciliation ID',
]

const referenceFamilyByPageKey: Record<string, ReferenceCatalogFamily> = {
  'reference-categories': 'CATEGORIES',
  'reference-policies': 'POLICIES',
  'reference-transport': 'TRANSPORT',
  'reference-organizations': 'ORGANIZATIONS',
  'reference-system-codes': 'SYSTEM_CODES',
}

const referenceFamily = computed<ReferenceCatalogFamily>(() => referenceFamilyByPageKey[props.pageKey] ?? 'CATEGORIES')
const familyReferenceCatalogs = computed(() => referenceCatalogs.filter((catalog) => catalog.family === referenceFamily.value))
const selectedReferenceCatalogId = ref('')
const referenceCatalogSearch = ref('')
const referenceEntrySearch = ref('')
const referenceKindFilter = ref<'ALL' | ReferenceEntry['kind']>('ALL')
const referenceStatusFilter = ref<'ALL' | ReferenceEntry['status']>('ALL')

const filteredFamilyReferenceCatalogs = computed(() => {
  const query = referenceCatalogSearch.value.trim().toLocaleLowerCase()
  if (!query) return familyReferenceCatalogs.value
  return familyReferenceCatalogs.value.filter((catalog) => [catalog.title, catalog.code, catalog.description]
    .some((value) => value.toLocaleLowerCase().includes(query)))
})

const selectedReferenceCatalog = computed(() => filteredFamilyReferenceCatalogs.value
  .find((catalog) => catalog.id === selectedReferenceCatalogId.value) ?? filteredFamilyReferenceCatalogs.value[0])

const filteredReferenceEntries = computed(() => {
  const query = referenceEntrySearch.value.trim().toLocaleLowerCase()
  return (selectedReferenceCatalog.value?.entries ?? []).filter((entry) => {
    const matchesQuery = !query || [
      entry.code,
      entry.name,
      entry.description ?? '',
      entry.legalBasis ?? '',
      entry.owner ?? '',
      ...Object.entries(entry.attributes ?? {}).flatMap(([key, value]) => [key, value]),
    ].some((value) => String(value).toLocaleLowerCase().includes(query))
    const matchesKind = referenceKindFilter.value === 'ALL' || entry.kind === referenceKindFilter.value
    const matchesStatus = referenceStatusFilter.value === 'ALL' || entry.status === referenceStatusFilter.value
    return matchesQuery && matchesKind && matchesStatus
  })
})

const manualDocumentOptions = (getReferenceCatalog('manual_document_types')?.entries ?? [])
  .filter((entry) => entry.attributes?.transport_mode === 'RAIL' && entry.status === 'ACTIVE')
const ticketPassengerRoleOptions = applicantRoleOptions.filter((option) => option.code !== 'LEGAL_REPRESENTATIVE')

function referenceStatusClass(status: ReferenceEntry['status']) { return transportPalette(transportStatusTone(status)).badge }

function referenceStatusLabel(status: ReferenceEntry['status']) {
  return ({
    ACTIVE: 'Faol',
    DRAFT: 'Draft',
    OPEN_DECISION: 'Qaror kutilmoqda',
    HISTORICAL: 'Tarixiy',
  } as const)[status]
}

function referenceKindLabel(kind: ReferenceEntry['kind']) {
  return kind === 'NORMATIVE_REFERENCE' ? 'Normativ mazmun' : 'Texnik konfiguratsiya'
}

function formatReferenceAttribute(value: unknown) {
  if (Array.isArray(value)) return value.join(', ')
  if (value && typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function selectReferenceCatalog(id: string) {
  selectedReferenceCatalogId.value = id
  referenceEntrySearch.value = ''
  referenceKindFilter.value = 'ALL'
  referenceStatusFilter.value = 'ALL'
}

const pipelineSteps = computed(() => [
  { title: 'Imtiyoz oluvchilar', value: '24 812', caption: '', icon: UsersRound, route: '/apps/transport-benefits/contingents', tone: 'primary' },
  { title: 'Moslik', value: '1 426', caption: '', icon: ShieldCheck, route: '/apps/transport-benefits/eligibility', tone: 'primary' },
  { title: 'Rezerv', value: '319', caption: '', icon: Zap, route: '/apps/transport-benefits/eligibility', tone: 'warning' },
  { title: 'Chiptalar', value: '1 107', caption: '', icon: TicketCheck, route: '/apps/transport-benefits/ticket-events', tone: 'primary' },
  { title: 'Buyurtmanomalar va to‘lovlar', value: 'Ko‘rish', caption: 'Oylik hisob-kitob va to‘lov natijalari', icon: CircleDollarSign, route: '/apps/transport-benefits/settlements', tone: 'warning' },
])

const dashboardMetrics = computed(() => [
  { label: 'Faol kontingent · demo', value: '24 812', delta: '6 rasmiy manba', icon: UsersRound, bars: [42, 56, 48, 64, 62, 74, 81] },
  { label: 'API so‘rovlari · demo', value: '3 284', delta: 'go-live ssenariysi', icon: Activity, bars: [38, 45, 62, 54, 72, 68, 88] },
  { label: 'Faol rezervlar · demo', value: '319', delta: 'atomar global ledger', icon: Clock3, bars: [71, 62, 78, 57, 69, 51, 45] },
  { label: 'To‘lovga yuborilgan', value: '0', delta: 'Buyurtmanomalar bo‘limida yuritiladi', icon: Banknote, bars: [8, 8, 8, 8, 8, 8, 8] },
])

function transportLabel(mode: TransportMode) {
  return ({ RAIL: 'Temir yo‘l', AIR: 'Havo', BUS: 'Avtobus' } as Record<TransportMode, string>)[mode]
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('uz-UZ').format(value)
}

function contingentStatusClass(status: ContingentEventStatus) { return transportPalette(transportStatusTone(status)).badge }


function eligibilityResultClass(result: EligibilityDecision['result']) {
  if (result === 'ELIGIBLE') return 'border-primary/25 bg-primary/[0.055]'
  if (result === 'MANUAL_DOCUMENT_REQUIRED') return 'border-amber-500/30 bg-amber-500/[0.07]'
  return 'border-destructive/25 bg-destructive/[0.045]'
}

function eligibilityBadgeClass(result: EligibilityDecision['result']) {
  if (result === 'ELIGIBLE') return 'border-primary/20 bg-primary/10 text-primary'
  if (result === 'MANUAL_DOCUMENT_REQUIRED') return 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300'
  return 'border-destructive/20 bg-destructive/10 text-destructive'
}

function eventTypeLabel(value: ContingentEventType | TicketEventType) {
  return ({
    RIGHT_GRANTED: 'Huquq berildi',
    RIGHT_CORRECTED: 'Huquq tuzatildi',
    RIGHT_REVOKED: 'Huquq bekor qilindi',
    RIGHT_REINSTATED: 'Huquq tiklandi',
    ISSUED: 'Chipta berildi',
    RETURNED: 'Qaytarildi',
    CARRIER_CANCELLED: 'Tashuvchi bekor qildi',
    VOIDED: 'Bekor qilindi',
    RESCHEDULED: 'Boshqa sanaga ko‘chirildi',
    TRAVELLED: 'Foydalanildi',
    NO_SHOW: 'Foydalanilmadi',
  } as Record<string, string>)[value] ?? value
}
</script>

<template>
  <PageContainer :style="isWorkspacePage ? { height: 'calc(100dvh - 3.5rem)', minHeight: '0', overflow: 'hidden' } : undefined">
    <div :class="['flex min-h-0 flex-1 flex-col gap-3 pr-0.5', isWorkspacePage ? 'transport-workspace overflow-hidden' : 'overflow-y-auto']">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div
          v-if="feedback"
          :class="[
            'fixed right-4 top-16 z-[120] flex max-w-sm items-center gap-2 rounded-lg border bg-popover px-3 py-2.5 text-sm shadow-xl',
            feedback.tone === 'success' ? 'border-primary/25 text-foreground' : feedback.tone === 'error' ? 'border-destructive/30 text-destructive' : 'border-blue-500/30 text-foreground',
          ]"
        >
          <CheckCircle2 v-if="feedback.tone === 'success'" class="h-4 w-4 shrink-0 text-primary" />
          <XCircle v-else-if="feedback.tone === 'error'" class="h-4 w-4 shrink-0" />
          <AlertTriangle v-else class="h-4 w-4 shrink-0 text-blue-600" />
          <span>{{ feedback.message }}</span>
        </div>
      </Transition>

      <template v-if="isDashboard">
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="metric in dashboardMetrics"
            :key="metric.label"
            class="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-medium text-muted-foreground">{{ metric.label }}</p>
                <p class="mt-1.5 text-2xl font-semibold text-foreground">{{ metric.value }}</p>
              </div>
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                <component :is="metric.icon" class="h-4.5 w-4.5" />
              </div>
            </div>
            <div class="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
              <span class="text-xs text-muted-foreground">{{ metric.delta }}</span>
              <div class="flex h-7 items-end gap-1" aria-hidden="true">
                <span
                  v-for="(bar, index) in metric.bars"
                  :key="index"
                  class="w-1.5 rounded-sm bg-primary/35 last:bg-primary"
                  :style="{ height: `${bar}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid min-h-[23rem] gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.75fr)]">
          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
              <div>
                <h2 class="text-sm font-semibold text-foreground">Kundalik ish jarayoni</h2>
                <p class="mt-0.5 text-xs text-muted-foreground">Imtiyoz oluvchilar va chiptalardan buyurtmanoma hamda to‘lov natijasigacha</p>
              </div>
              <RouterLink
                to="/apps/transport-benefits/integrations"
                class="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Arxitekturani ko‘rish
                <ArrowRight class="h-3.5 w-3.5" />
              </RouterLink>
            </div>
            <div class="grid gap-2 p-4 lg:grid-cols-5">
              <template v-for="(step, index) in pipelineSteps" :key="step.title">
                <RouterLink
                  :to="step.route"
                  class="group relative rounded-lg border border-border bg-background p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div
                      :class="[
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        step.tone === 'warning' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : step.tone === 'success' ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary',
                      ]"
                    >
                      <component :is="step.icon" class="h-4 w-4" />
                    </div>
                    <ChevronRight class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p class="mt-3 text-xs font-medium text-muted-foreground">{{ step.title }}</p>
                  <p class="mt-0.5 text-lg font-semibold text-foreground">{{ step.value }}</p>
                  <p class="text-xs text-muted-foreground">{{ step.caption }}</p>
                  <span
                    v-if="index < pipelineSteps.length - 1"
                    class="absolute -right-2 top-1/2 z-10 hidden h-px w-2 bg-border lg:block"
                  />
                </RouterLink>
              </template>
            </div>

            <div class="mx-4 mb-4 rounded-lg border border-primary/15 bg-primary/[0.045] p-3.5">
              <div class="flex items-start gap-3">
                <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers3 class="h-4 w-4" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-foreground">Umumlashtirish prinsipi</p>
                  <p class="mt-1 text-xs leading-5 text-muted-foreground">
                    Bir xil biznes operatsiyalar tashkilot, toifa yoki transport bo‘yicha ko‘paytirilmaydi: umumiy contract family, klassifikator va policy ishlaydi. Biroq huquq, ledger, rezerv, chipta, claim va handoff alohida typed aggregate hamda invariantlarga ega.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="border-b border-border px-4 py-3.5">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-sm font-semibold text-foreground">Moliyaviy jarayon bosqichlari</h2>
                  <p class="mt-0.5 text-xs text-muted-foreground">Ishlab chiqarish monitoringi emas</p>
                </div>
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
                  Jarayon ko‘rinishi
                </span>
              </div>
            </div>
            <div class="divide-y divide-border px-4">
              <div class="flex items-center justify-between gap-3 py-3.5">
                <div class="flex items-center gap-2.5">
                  <UploadCloud class="h-4 w-4 text-primary" />
                  <div>
                    <p class="text-sm font-medium">Imtiyoz oluvchilar API</p>
                    <p class="text-xs text-muted-foreground">6 rasmiy manba · common contract</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-amber-700 dark:text-amber-300">D-01</span>
              </div>
              <div class="flex items-center justify-between gap-3 py-3.5">
                <div class="flex items-center gap-2.5">
                  <ShieldCheck class="h-4 w-4 text-primary" />
                  <div>
                    <p class="text-sm font-medium">Eligibility API</p>
                    <p class="text-xs text-muted-foreground">Imtiyozni tekshirish va vaqtincha band qilish</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-primary">Amaldagi jarayon</span>
              </div>
              <div class="flex items-center justify-between gap-3 py-3.5">
                <div class="flex items-center gap-2.5">
                  <TicketCheck class="h-4 w-4 text-primary" />
                  <div>
                    <p class="text-sm font-medium">Ticket events</p>
                    <p class="text-xs text-muted-foreground">rail · air · intercity bus</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-primary">Amaldagi jarayon</span>
              </div>
              <div class="flex items-center justify-between gap-3 py-3.5">
                <div class="flex items-center gap-2.5">
                  <Landmark class="h-4 w-4 text-amber-600" />
                  <div>
                    <p class="text-sm font-medium">Moliya adapteri</p>
                    <p class="text-xs text-muted-foreground">Buyurtmanoma va to‘lov holatini kuzatish</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-amber-700 dark:text-amber-300">Moliyaviy jarayon</span>
              </div>
            </div>
          </section>
        </div>

        <section class="grid gap-3 md:grid-cols-3">
          <div class="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p class="font-mono text-xs font-semibold text-primary">01.10.2026</p>
            <p class="mt-1 text-sm font-semibold">VMQ-440 yadro ishga tushishi</p>
            <p class="mt-1 text-xs leading-5 text-muted-foreground">YAMIH, 6 manba integratsiyasi, atomic reserve va chipta lifecycle. Social Card production kanali MVPdan tashqarida.</p>
          </div>
          <div class="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p class="font-mono text-xs font-semibold text-primary">10.11.2026</p>
            <p class="mt-1 text-sm font-semibold">Birinchi oylik reyestr</p>
            <p class="mt-1 text-xs leading-5 text-muted-foreground">Oktabr uchun qoplashga yaroqli chipta qatorlari va normativ hujjatlar topshirish chegarasi.</p>
          </div>
          <div class="rounded-xl border border-amber-500/25 bg-amber-500/[0.045] p-4 shadow-sm">
            <p class="font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">01.01.2027</p>
            <p class="mt-1 text-sm font-semibold">Social Card real-time</p>
            <p class="mt-1 text-xs leading-5 text-muted-foreground">Xarid va real-time to‘lov faqat shu sanadan; D-07 va anti-double-payment yopilmaguncha o‘chiq.</p>
          </div>
        </section>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
            <div>
              <h2 class="text-sm font-semibold text-foreground">So‘nggi kontingent eventlari</h2>
              <p class="mt-0.5 text-xs text-muted-foreground">Barcha manbalar uchun bitta kanonik contract family · demo dataset</p>
            </div>
            <RouterLink to="/apps/transport-benefits/contingents" class="text-xs font-medium text-primary hover:underline">Barchasini ko‘rish</RouterLink>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] text-left text-sm">
              <thead class="bg-muted/45 text-xs text-muted-foreground">
                <tr>
                  <th class="px-4 py-2.5 font-medium">Amal</th>
                  <th class="px-4 py-2.5 font-medium">Manba</th>
                  <th class="px-4 py-2.5 font-medium">Shaxs</th>
                  <th class="px-4 py-2.5 font-medium">Amal</th>
                  <th class="px-4 py-2.5 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="event in contingentEvents.slice(0, 4)" :key="event.id" class="hover:bg-muted/30">
                  <td class="px-4 py-3 font-mono text-xs text-foreground">{{ event.id }}</td>
                  <td class="px-4 py-3">{{ event.source }}</td>
                  <td class="px-4 py-3">
                    <p class="font-medium text-foreground">{{ event.person.toLocaleUpperCase('uz-UZ') }}</p>
                    <p class="text-xs text-muted-foreground">{{ event.pinfl }}</p>
                  </td>
                  <td class="px-4 py-3 text-xs">{{ eventTypeLabel(event.eventType) }}</td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex rounded-md border px-2 py-1 text-xs font-medium', contingentStatusClass(event.status)]">{{ event.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </template>

      <template v-else-if="isMvpPlan">
        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.6fr)]">
          <section class="rounded-xl border border-primary/20 bg-primary/[0.045] p-5 shadow-sm">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ListChecks class="h-5 w-5" /></div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Amaldagi ish jarayoni</p>
                <h2 class="mt-1 text-lg font-semibold">Buyurtmanomadan to‘lov natijasigacha</h2>
                <p class="mt-2 max-w-4xl text-xs leading-5 text-muted-foreground">Transport tashkiloti oylik buyurtmanomani yuboradi. Tizim uni chipta ma’lumotlari bilan tekshiradi, qoplanadigan summani tasdiqlashga taqdim etadi va subsidiya tizimiga yuboradi. Olingan to‘lov holati tashkilotga yetkaziladi.</p>
              </div>
            </div>
            <div class="mt-4 grid gap-2 sm:grid-cols-2">
              <div v-for="item in mvpInScope" :key="item" class="flex items-start gap-2 rounded-lg border border-primary/15 bg-background/80 p-3 text-xs leading-5">
                <CheckCircle2 class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{{ item }}</span>
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-amber-500/25 bg-amber-500/[0.045] p-5 shadow-sm">
            <div class="flex items-center gap-2"><AlertTriangle class="h-4 w-4 text-amber-700 dark:text-amber-300" /><h2 class="text-sm font-semibold">Keyingi rivojlantirish ishlari</h2></div>
            <div class="mt-3 space-y-2">
              <div v-for="item in mvpOutOfScope" :key="item" class="rounded-lg border border-amber-500/20 bg-background/70 p-3 text-xs leading-5 text-muted-foreground">{{ item }}</div>
            </div>
            <div class="mt-4 rounded-lg border border-border bg-background/70 p-3 text-xs leading-5">
              <strong class="text-foreground">Muhim:</strong>
              <span class="text-muted-foreground"> Moliyaviy jarayon to‘lov tizimining qabul javobi bilan yakunlanmaydi: to‘lov natijasi olinadi, buyurtmanomaga bog‘lanadi va tashkilotga yetkaziladi.</span>
            </div>
          </section>
        </div>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
            <div><h2 class="text-sm font-semibold">Rollar kesimidagi ish oqimlari</h2><p class="mt-1 text-xs text-muted-foreground">UI permissionlari token claimidan, barcha command vakolatlari esa backenddagi RBAC + organization/purpose ABAC’dan tekshiriladi.</p></div>
            <span class="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1.5 font-mono text-[11px] text-primary">maker-checker · least privilege · no cross-org PII</span>
          </div>
          <div class="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
            <article v-for="stream in mvpRoleStreams" :key="stream.code" class="rounded-lg border border-border bg-background p-4">
              <p class="font-mono text-[10px] font-semibold text-primary">{{ stream.code }}</p>
              <h3 class="mt-1 text-sm font-semibold">{{ stream.role }}</h3>
              <p class="mt-2 text-xs leading-5 text-muted-foreground">{{ stream.responsibility }}</p>
              <div class="mt-3 border-t border-border pt-3"><p class="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Natija</p><p class="mt-1 text-xs leading-5">{{ stream.deliverable }}</p></div>
            </article>
          </div>
        </section>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 class="text-sm font-semibold">AI agent bajaradigan ketma-ket roadmap</h2><p class="mt-1 text-xs text-muted-foreground">Har phase avvalgisining contract va migration natijasiga bog‘liq; ochiq D-gate uydirma qoida bilan aylanib o‘tilmaydi.</p></div>
            <RouterLink to="/apps/transport-benefits/integrations" class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">Servis arxitekturasi <ArrowRight class="h-3.5 w-3.5" /></RouterLink>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] text-left text-sm">
              <thead class="bg-muted/45 text-xs text-muted-foreground"><tr><th class="px-4 py-2.5 font-medium">Phase</th><th class="px-4 py-2.5 font-medium">Davomiylik</th><th class="px-4 py-2.5 font-medium">Ish paketi</th><th class="px-4 py-2.5 font-medium">Mas’ul oqim</th><th class="px-4 py-2.5 font-medium">Exit criteria</th></tr></thead>
              <tbody class="divide-y divide-border">
                <tr v-for="phase in mvpPhases" :key="phase.id" class="hover:bg-muted/30">
                  <td class="px-4 py-3"><span class="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs font-semibold text-primary">{{ phase.id }}</span></td>
                  <td class="px-4 py-3 text-xs">{{ phase.period }}</td>
                  <td class="px-4 py-3 font-medium">{{ phase.title }}</td>
                  <td class="px-4 py-3 text-xs text-muted-foreground">{{ phase.owner }}</td>
                  <td class="px-4 py-3 text-xs leading-5">{{ phase.exit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <section class="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div class="flex items-center gap-2"><ShieldCheck class="h-4 w-4 text-primary" /><h2 class="text-sm font-semibold">Hisoblash va tekshirish qoidalari</h2></div>
            <div class="mt-3 grid gap-2 sm:grid-cols-2">
              <div v-for="gate in mvpAcceptanceGates" :key="gate" class="flex items-start gap-2 rounded-lg border border-border bg-muted/25 p-3 text-xs leading-5">
                <BadgeCheck class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /><span>{{ gate }}</span>
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div class="flex items-center gap-2"><Database class="h-4 w-4 text-primary" /><h2 class="text-sm font-semibold">AI agent uchun kanonik topshiriq</h2></div>
            <p class="mt-3 text-xs leading-5 text-muted-foreground">To‘liq backend schema, OpenAPI, state-machine, role/permission, test matrix, DevOps va Definition of Done repo ichidagi hujjatda beriladi.</p>
            <div class="mt-3 rounded-lg border border-border bg-muted/35 p-3 font-mono text-[11px] leading-5">docs/vmq-440-mvp-ai-agent-implementation-plan.md</div>
            <div class="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.045] p-3 text-xs leading-5 text-muted-foreground"><strong class="text-foreground">Stop condition:</strong> D-01…D-06dan biriga bog‘liq normativ qiymat tasdiqlanmagan bo‘lsa agent production policy yaratmaydi; capability fail-closed qoladi.</div>
          </section>
        </div>
      </template>

      <template v-else-if="isContingents">
        <div class="grid shrink-0 grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label="Shaxslar holati bo‘yicha filtrlash">
          <TransportStatusCard v-for="card in contingentCards" :key="card.status" :label="card.label" :count="card.count" :icon="card.icon" :tone="transportStatusTone(card.status)" :selected="contingentStatusFilter === card.status" :share="card.status === 'Barchasi' ? '' : contingentShare(card.count, scopedContingentEvents.length) + '%'" caption="nafar shaxs" @select="contingentStatusFilter = card.status" />
        </div>
        <section class="transport-table flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div class="flex shrink-0 flex-wrap items-center gap-2 border-b border-border p-3">
            <div class="relative mr-auto w-full sm:max-w-sm">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="contingentSearch" class="pl-9" placeholder="Hujjat, F.I.O., JShShIR yoki toifa bo‘yicha qidirish" aria-label="Imtiyoz oluvchilarni qidirish" />
            </div>
            <FilterPopover v-model:open="contingentFilterOpen" :active-count="contingentFilterCount">
              <label class="block space-y-1 text-xs font-medium">Imtiyozli toifa<select v-model="contingentCategoryFilter" :class="fieldClass"><option value="">Barchasi</option><option v-for="category in beneficiaryCategoryOptions" :key="category.code" :value="category.code">{{ category.code }} — {{ category.label }}</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Manba<select v-model="contingentSourceFilter" :class="fieldClass"><option>Barchasi</option><option v-for="source in sourceOptions" :key="source">{{ source }}</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Holati<select v-model="contingentStatusFilter" :class="fieldClass"><option>Barchasi</option><option>Faol</option><option>Nofaol</option><option>Foydalangan</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Bekor qilish sababi<select v-model="contingentRevocationReason" :class="fieldClass"><option value="">Barchasi</option><option v-for="reason in contingentRevocationReasons" :key="reason">{{ reason }}</option></select></label>
              <fieldset class="space-y-2"><legend class="text-xs font-medium">Hujjat sanasi</legend><div class="grid grid-cols-2 gap-2"><label class="space-y-1 text-xs">Boshlanish<Input v-model="contingentDateFrom" type="date" :max="contingentDateTo || undefined" aria-label="Hujjat sanasi boshlanishi" /></label><label class="space-y-1 text-xs">Tugash<Input v-model="contingentDateTo" type="date" :min="contingentDateFrom || undefined" aria-label="Hujjat sanasi tugashi" /></label></div></fieldset>
              <fieldset class="space-y-2"><legend class="text-xs font-medium">Bekor qilish sanasi</legend><div class="grid grid-cols-2 gap-2"><label class="space-y-1 text-xs">Boshlanish<Input v-model="contingentRevokedFrom" type="date" :max="contingentRevokedTo || undefined" aria-label="Bekor qilish sanasi boshlanishi" /></label><label class="space-y-1 text-xs">Tugash<Input v-model="contingentRevokedTo" type="date" :min="contingentRevokedFrom || undefined" aria-label="Bekor qilish sanasi tugashi" /></label></div></fieldset>
              <p v-if="contingentDateRangeInvalid" role="alert" class="text-xs text-destructive">Boshlanish sanasi tugash sanasidan keyin bo‘lishi mumkin emas.</p>
              <template #footer><div class="flex justify-end gap-2"><Button variant="outline" size="sm" @click="clearContingentFilters">Tozalash</Button><Button size="sm" :disabled="contingentDateRangeInvalid" @click="contingentFilterOpen = false">Qo‘llash</Button></div></template>
            </FilterPopover>
            <Button variant="outline" size="sm" class="gap-1.5" :disabled="contingentDownloading || !filteredContingentEvents.length || contingentDateRangeInvalid" @click="downloadContingentReport"><Download class="h-3.5 w-3.5" />{{ contingentDownloading ? 'Yuklanmoqda…' : 'Yuklab olish' }}</Button>
          </div>
          <div class="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2" role="group" aria-label="Hisobot ko‘rinishi"><Button size="sm" :variant="contingentReportOpen ? 'outline' : 'default'" :aria-pressed="!contingentReportOpen" @click="contingentReportOpen = false">Ro‘yxat</Button><Button size="sm" :variant="contingentReportOpen ? 'default' : 'outline'" :aria-pressed="contingentReportOpen" @click="contingentReportOpen = true">Hisobot</Button></div>
          <div :class="['min-h-0 flex-1', contingentReportOpen ? 'overflow-hidden' : 'overflow-auto overscroll-contain']">
            <table v-if="!contingentReportOpen" class="w-full min-w-[72rem] border-separate border-spacing-0 text-left text-sm">
              <thead class="sticky top-0 z-10 bg-muted/70 backdrop-blur"><tr><th v-for="heading in ['Hujjat', 'Shaxs', 'Toifa', 'Holat', 'Bekor qilish hujjati', 'Amallar']" :key="heading" class="border-b border-border px-3 py-2.5 text-left font-medium">{{ heading }}</th></tr></thead>
              <tbody>
                <tr v-for="event in contingentPageEvents" :key="event.id" class="hover:bg-muted/30">
                  <td class="whitespace-nowrap px-3 py-2.5"><p><strong>{{ event.documentNumber || '—' }}</strong> <span class="text-xs text-muted-foreground">({{ event.documentId || event.id }})</span></p><p class="mt-1 text-xs text-muted-foreground">{{ event.documentDate ? formatInputDate(event.documentDate) : event.receivedAt.split(' ')[0] }}</p></td>
                  <td class="px-3 py-2.5"><strong>{{ event.person }}</strong><p class="mt-1 whitespace-nowrap text-xs text-muted-foreground">{{ event.pinfl }} ({{ contingentAge(event.birthDate) }} yosh)</p></td>
                  <td class="min-w-64 max-w-96 px-3 py-2.5"><p><strong>{{ contingentCategoryName(event) }}</strong> <span class="text-xs text-muted-foreground">({{ contingentCategoryCode(event) }})</span></p><p class="mt-1 text-xs text-muted-foreground">{{ event.source }}</p></td>
                  <td class="px-3 py-2.5"><span :class="['inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium', contingentStatusClass(event.status)]">{{ event.status }}</span></td>
                  <td class="max-w-64 px-3 py-2.5"><p>{{ event.revocationReason || '—' }}</p><p v-if="event.revokedAt" class="mt-1 text-xs text-muted-foreground">{{ event.revokedAt }}</p></td>
                  <td class="px-3 py-2.5"><Button variant="outline" size="sm" @click="selectedContingentId = event.id; contingentDetailsOpen = true">Ko‘rish</Button></td>
                </tr>
                <tr v-if="!filteredContingentEvents.length"><td colspan="6" class="px-3 py-12 text-center text-muted-foreground">Ma’lumot topilmadi.</td></tr>
              </tbody>
            </table>
            <GroupedReport v-show="contingentReportOpen" ref="contingentGroupedReport" :rows="contingentGroupedRows" :dimensions="beneficiaryDimensions" :metrics="beneficiaryMetrics" initial-primary="category" initial-secondary="source" filename="imtiyoz-oluvchilar-hisobot.xlsx" @drill="drillBeneficiary" />
          </div>
          <div v-if="!contingentReportOpen" class="flex shrink-0 flex-col gap-3 border-t border-border px-3 py-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-wrap items-center gap-3"><label class="inline-flex items-center gap-2">Qatorlar soni<select v-model.number="contingentPageSize" aria-label="Qatorlar soni" class="h-8 rounded-md border border-border bg-background px-2 text-sm"><option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option></select></label><span>Sahifada: <strong class="text-foreground">{{ contingentRangeStart }}–{{ contingentRangeEnd }} / {{ contingentRowCount }}</strong></span></div>
            <div class="flex items-center gap-2"><Button variant="ghost" size="sm" @click="clearContingentFilters(); contingentPage = 1">Tiklash</Button><nav aria-label="Imtiyoz oluvchilar sahifalari" class="flex h-8 items-center rounded-lg border border-border bg-background px-1"><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="contingentPage === 1" aria-label="Birinchi sahifa" @click="contingentPage = 1"><ChevronsLeft class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="contingentPage === 1" aria-label="Oldingi sahifa" @click="contingentPage--"><ChevronLeft class="h-4 w-4" /></Button><span aria-live="polite" class="min-w-14 px-2 text-center font-semibold text-foreground">{{ contingentPage }}/{{ contingentPageCount }}</span><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="contingentPage === contingentPageCount" aria-label="Keyingi sahifa" @click="contingentPage++"><ChevronRight class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="contingentPage === contingentPageCount" aria-label="Oxirgi sahifa" @click="contingentPage = contingentPageCount"><ChevronsRight class="h-4 w-4" /></Button></nav></div>
          </div>
        </section>
      </template>

      <template v-else-if="isEligibility">
        <div class="rounded-xl border border-primary/15 bg-primary/[0.045] px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Code2 class="h-4.5 w-4.5" /></div>
            <div>
              <p class="text-sm font-medium">POST <span class="font-mono text-primary">/v1/entitlements/check-and-reserve</span></p>
              <p class="mt-0.5 text-xs text-muted-foreground">Barcha toifa va transportlar uchun bitta atomic command; read-only tekshiruv <span class="font-mono">/v1/eligibility/check</span></p>
            </div>
          </div>
        </div>

        <div class="grid gap-4 xl:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)]">
          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="border-b border-border px-4 py-3.5">
              <h2 class="text-sm font-semibold">Yangi moslik so‘rovi</h2>
              <p class="mt-0.5 text-xs text-muted-foreground">So‘rov shaxs, safar va niyatni bir payload’da yuboradi.</p>
            </div>
            <form class="space-y-4 p-4" @submit.prevent="runEligibilityCheck">
              <div class="grid gap-3 sm:grid-cols-2">
                <label class="block space-y-1.5">
                  <span class="text-xs font-medium text-foreground">Murojaatchi roli</span>
                  <select v-model="eligibilityForm.applicantRole" :class="fieldClass">
                    <option v-for="option in applicantRoleOptions" :key="option.code" :value="option.code">{{ option.label }}</option>
                  </select>
                </label>
                <div class="space-y-1.5"><span class="text-xs font-medium text-foreground">Rezidentlik snapshoti</span><div class="rounded-md border border-border bg-muted/35 px-3 py-2 text-xs leading-5"><strong>Server-derived</strong> · identity/residency registri yoki tasdiqlangan hujjat; requestdagi erkin flagga ishonilmaydi.</div></div>
              </div>
              <label class="block space-y-1.5">
                <span class="text-xs font-medium text-foreground">{{ eligibilityForm.applicantRole === 'COMPANION' ? 'Hamroh JShShIRi' : 'Imtiyoz oluvchining JShShIRi' }}</span>
                <Input v-model="eligibilityForm.pinfl" placeholder="14 xonali JShShIR" maxlength="14" />
              </label>
              <div v-if="eligibilityForm.applicantRole === 'LEGAL_REPRESENTATIVE'" class="grid gap-3 rounded-lg border border-border bg-muted/25 p-3 sm:grid-cols-2">
                <label class="space-y-1.5"><span class="text-xs font-medium">Vakil JShShIRi</span><Input v-model="eligibilityForm.representativePinfl" maxlength="14" placeholder="14 xonali JShShIR" /></label>
                <label class="space-y-1.5"><span class="text-xs font-medium">Vakolat hujjati reference’i</span><Input v-model="eligibilityForm.authorityDocumentRef" placeholder="AUTH-REF-..." /></label>
                <label class="space-y-1.5"><span class="text-xs font-medium">Vakolat valid_from</span><Input v-model="eligibilityForm.authorityValidFrom" type="date" :clearable="false" /></label>
                <label class="space-y-1.5"><span class="text-xs font-medium">Vakolat valid_to</span><Input v-model="eligibilityForm.authorityValidTo" type="date" :clearable="false" /></label>
                <p class="text-xs leading-5 text-muted-foreground sm:col-span-2">Vakolatning to‘liq intervali chipta rasmiylashtirish va safar sanasida tekshiriladi.</p>
              </div>
              <div v-if="eligibilityForm.applicantRole === 'COMPANION'" class="rounded-lg border border-amber-500/20 bg-amber-500/[0.055] p-3">
                <div class="grid gap-3 sm:grid-cols-2"><label class="block space-y-1.5"><span class="text-xs font-medium">Asosiy imtiyoz oluvchi JShShIRi</span><Input v-model="eligibilityForm.principalPinfl" maxlength="14" placeholder="I guruhdagi imtiyoz oluvchi" /></label><label class="block space-y-1.5"><span class="text-xs font-medium">Asosiy yo‘lovchining band qilish raqami</span><Input v-model="eligibilityForm.principalReservationId" placeholder="RSV-PRINCIPAL-..." /></label></div>
                <p class="mt-2 text-xs leading-5 text-muted-foreground">Hamroh mustaqil kontingent emas; principalning ayni service/date journey’siga companion_link bilan bog‘lanadi va faqat I guruh uchun tekshiriladi.</p>
              </div>
              <div class="grid gap-3 sm:grid-cols-3">
                <label class="space-y-1.5"><span class="text-xs font-medium">Shaxs hujjati reference’i</span><Input v-model="eligibilityForm.identityDocumentRef" /></label>
                <label class="space-y-1.5"><span class="text-xs font-medium">Hujjat valid_from</span><Input v-model="eligibilityForm.identityValidFrom" type="date" :clearable="false" /></label>
                <label class="space-y-1.5"><span class="text-xs font-medium">Hujjat valid_to</span><Input v-model="eligibilityForm.identityValidTo" type="date" :clearable="false" /></label>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <label class="block space-y-1.5">
                  <span class="text-xs font-medium text-foreground">Transport</span>
                  <select v-model="eligibilityForm.transportMode" :class="fieldClass">
                    <option v-for="option in transportModeOptions" :key="option.code" :value="option.code">{{ option.label }}</option>
                  </select>
                </label>
                <label class="block space-y-1.5">
                  <span class="text-xs font-medium text-foreground">Chipta klassi</span>
                  <select v-model="eligibilityForm.ticketClass" :class="fieldClass">
                    <option v-for="option in fareClassOptions" :key="option.code" :value="option.code">{{ option.label }}</option>
                  </select>
                </label>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <label class="block space-y-1.5">
                  <span class="text-xs font-medium text-foreground">Jo‘nash joyi</span>
                  <Input v-model="eligibilityForm.origin" />
                </label>
                <label class="block space-y-1.5">
                  <span class="text-xs font-medium text-foreground">Yetib borish joyi</span>
                  <Input v-model="eligibilityForm.destination" />
                </label>
              </div>
              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <label class="block space-y-1.5"><span class="text-xs font-medium">Jo‘nash mamlakat kodi</span><select v-model="eligibilityForm.originCountry" :class="fieldClass"><option v-for="option in countryOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}{{ option.status === 'DRAFT' ? ' · demo' : '' }}</option></select></label>
                <label class="block space-y-1.5"><span class="text-xs font-medium">Yetib borish mamlakat kodi</span><select v-model="eligibilityForm.destinationCountry" :class="fieldClass"><option v-for="option in countryOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}{{ option.status === 'DRAFT' ? ' · demo' : '' }}</option></select></label>
                <label class="block space-y-1.5"><span class="text-xs font-medium text-foreground">Safar sanasi</span><Input v-model="eligibilityForm.departureDate" type="date" :clearable="false" /></label>
                <label class="block space-y-1.5"><span class="text-xs font-medium text-foreground">Qatnov raqami</span><Input v-model="eligibilityForm.serviceNumber" placeholder="760F" /></label>
                <label class="block space-y-1.5"><span class="text-xs font-medium">Entitlement leg</span><select v-model="eligibilityForm.requestedLeg" :class="fieldClass"><option v-for="option in legTypeOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}</option></select></label>
              </div>
              <p class="rounded-lg border border-border bg-muted/35 p-3 text-xs leading-5 text-muted-foreground">PF-34 domestic scope requestdagi “domestic=true” flagdan emas, serverdagi station/airport directory orqali origin/destination country kodlaridan tekshiriladi.</p>
              <fieldset class="space-y-2">
                <legend class="text-xs font-medium text-foreground">Operatsiya niyati</legend>
                <div class="grid gap-2 sm:grid-cols-2">
                  <label
                    :class="[
                      'cursor-pointer rounded-lg border p-3 transition-colors',
                      eligibilityForm.intent === 'CHECK_ONLY' ? 'border-primary/35 bg-primary/[0.06]' : 'border-border hover:bg-muted/40',
                    ]"
                  >
                    <input v-model="eligibilityForm.intent" type="radio" value="CHECK_ONLY" class="sr-only" />
                    <span class="block text-sm font-medium">Faqat tekshirish</span>
                    <span class="mt-0.5 block text-xs text-muted-foreground">Limit sarflanmaydi</span>
                  </label>
                  <label
                    :class="[
                      'cursor-pointer rounded-lg border p-3 transition-colors',
                      eligibilityForm.intent === 'CHECK_AND_RESERVE' ? 'border-primary/35 bg-primary/[0.06]' : 'border-border hover:bg-muted/40',
                    ]"
                  >
                    <input v-model="eligibilityForm.intent" type="radio" value="CHECK_AND_RESERVE" class="sr-only" />
                    <span class="block text-sm font-medium">Tekshirish va rezerv</span>
                    <span class="mt-0.5 block text-xs text-muted-foreground">Safar uchun imtiyoz vaqtincha band qilinadi</span>
                  </label>
                </div>
              </fieldset>
              <Button type="submit" class="w-full" :disabled="eligibilityLoading">
                <RefreshCw v-if="eligibilityLoading" class="h-4 w-4 animate-spin" />
                <ShieldCheck v-else class="h-4 w-4" />
                {{ eligibilityLoading ? 'Simulyatsiya...' : 'Sandboxda tekshirish' }}
              </Button>
            </form>
          </section>

          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="border-b border-border px-4 py-3.5">
              <h2 class="text-sm font-semibold">Target qaror kontrakti · sandbox</h2>
              <p class="mt-0.5 text-xs text-muted-foreground">Hozir browser demo policy ishlaydi; productionda server faqat PUBLISHED policy, authoritative snapshot va atomar DB ledger bilan hisoblaydi.</p>
            </div>
            <div v-if="eligibilityLoading" class="flex min-h-[25rem] flex-col items-center justify-center gap-3 p-8 text-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <RefreshCw class="h-5 w-5 animate-spin" />
              </div>
              <div>
                <p class="text-sm font-medium">Huquq va global limit tekshirilmoqda</p>
                <p class="mt-1 text-xs text-muted-foreground">Registry → Policy → Ledger</p>
              </div>
            </div>
            <div v-else-if="eligibilityResult" class="p-4">
              <div
                :class="[
                  'rounded-xl border p-4',
                  eligibilityResultClass(eligibilityResult.result),
                ]"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3">
                    <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', eligibilityResult.result === 'ELIGIBLE' ? 'bg-primary/12 text-primary' : eligibilityResult.result === 'MANUAL_DOCUMENT_REQUIRED' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'bg-destructive/10 text-destructive']">
                      <BadgeCheck v-if="eligibilityResult.result === 'ELIGIBLE'" class="h-5 w-5" />
                      <AlertTriangle v-else-if="eligibilityResult.result === 'MANUAL_DOCUMENT_REQUIRED'" class="h-5 w-5" />
                      <XCircle v-else class="h-5 w-5" />
                    </div>
                    <div>
                      <p class="text-xs font-medium text-muted-foreground">{{ eligibilityResult.id }}</p>
                      <h3 class="mt-1 text-lg font-semibold">{{ eligibilityResult.result === 'ELIGIBLE' ? 'Imtiyozdan foydalanishi mumkin' : eligibilityResult.result === 'MANUAL_DOCUMENT_REQUIRED' ? 'Tasdiqlovchi hujjat kerak' : 'Imtiyoz huquqi tasdiqlanmadi' }}</h3>
                      <p class="mt-1 text-sm text-muted-foreground">{{ eligibilityResult.person }} · {{ eligibilityResult.pinfl }}</p>
                    </div>
                  </div>
                  <span :class="['rounded-md border px-2 py-1 font-mono text-xs font-semibold', eligibilityBadgeClass(eligibilityResult.result)]">
                    {{ userLabel(eligibilityResult.result) }}
                  </span>
                </div>
                <div class="mt-4 grid gap-3 border-t border-current/10 pt-4 sm:grid-cols-2">
                  <div>
                    <p class="text-xs text-muted-foreground">Safar</p>
                    <p class="mt-1 text-sm font-medium">{{ eligibilityResult.route }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Transport</p>
                    <p class="mt-1 text-sm font-medium">{{ transportLabel(eligibilityResult.transportMode) }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Imtiyoz miqdori</p>
                    <p class="mt-1 text-xl font-semibold text-primary">{{ eligibilityResult.benefit }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground">Qolgan limit</p>
                    <p class="mt-1 text-sm font-medium">{{ eligibilityResult.remainingLimit ?? '—' }}</p>
                  </div>
                </div>
                <div v-if="eligibilityResult.legalBasis || eligibilityResult.ruleSummary || eligibilityResult.principal" class="mt-4 space-y-2 rounded-lg border border-border bg-background/70 p-3 text-xs leading-5">
                  <p v-if="eligibilityResult.legalBasis"><span class="text-muted-foreground">Huquqiy asos:</span> <strong>{{ eligibilityResult.legalBasis }}</strong></p>
                  <p v-if="eligibilityResult.principal"><span class="text-muted-foreground">Asosiy imtiyoz oluvchi:</span> <span class="font-mono">{{ eligibilityResult.principal }}</span></p>
                  <p v-if="eligibilityResult.principalReservationId"><span class="text-muted-foreground">Asosiy yo‘lovchining safari:</span> <span class="font-mono">{{ eligibilityResult.principalReservationId }}</span></p>
                  <p v-if="eligibilityResult.bundleId"><span class="text-muted-foreground">Safar raqami / borish yoki qaytish:</span> <span class="font-mono">{{ eligibilityResult.bundleId }} · {{ userLabel(eligibilityResult.requestedLeg ?? '') }}</span></p>
                  <p v-if="eligibilityResult.ruleSummary"><span class="text-muted-foreground">Qoida:</span> {{ eligibilityResult.ruleSummary }}</p>
                </div>
                <Button v-if="eligibilityResult.result === 'MANUAL_DOCUMENT_REQUIRED'" class="mt-4 w-full" type="button" @click="isManualCaseDialogOpen = true">
                  <FileCheck2 class="h-4 w-4" />
                  Hujjatni vakolatli tekshiruvga yuborish
                </Button>
                <div v-if="eligibilityResult.reservationId" class="mt-4 flex items-center justify-between gap-3 rounded-lg border border-primary/20 bg-background/70 p-3">
                  <div>
                    <p class="text-xs text-muted-foreground">Band qilish raqami</p>
                    <p class="mt-0.5 font-mono text-sm font-semibold text-primary">{{ eligibilityResult.reservationId }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-medium text-foreground">Amal qilish muddati: 15 daqiqa</p>
                    <p class="mt-0.5 break-all text-xs text-muted-foreground">{{ eligibilityResult.reservationExpiresAt ?? 'Rezerv yaratilmagan' }}</p>
                  </div>
                </div>
                <div v-if="eligibilityResult.result === 'ELIGIBLE'" class="mt-4 grid gap-2 sm:grid-cols-3">
                  <div class="rounded-lg border border-border bg-background/70 p-3">
                    <p class="text-[11px] text-muted-foreground">Qoida tahriri</p>
                    <p class="mt-1 font-mono text-xs font-medium">POL-2026.10-v3</p>
                  </div>
                  <div class="rounded-lg border border-border bg-background/70 p-3">
                    <p class="text-[11px] text-muted-foreground">Source as of</p>
                    <p class="mt-1 font-mono text-xs font-medium">30.09.2026 · 10:48</p>
                  </div>
                  <div class="rounded-lg border border-border bg-background/70 p-3">
                    <p class="text-[11px] text-muted-foreground">To‘lov kanali</p>
                    <p class="mt-1 font-mono text-xs font-medium">MONTHLY_CLAIM</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex min-h-[25rem] flex-col items-center justify-center gap-3 p-8 text-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground"><ShieldCheck class="h-5 w-5" /></div>
              <div>
                <p class="text-sm font-medium">Hali so‘rov yuborilmadi</p>
                <p class="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">Demo PINFLlar: 30101012345642 — I guruh, 31205012345618 — Chernobil, 30508012345671 — PF-34. Noma’lum PINFL manual hujjat oqimini ochadi.</p>
              </div>
            </div>
          </section>
        </div>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="border-b border-border px-4 py-3.5">
            <h2 class="text-sm font-semibold">So‘nggi qarorlar</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[820px] text-left text-sm">
              <thead class="bg-muted/45 text-xs text-muted-foreground">
                <tr><th class="px-4 py-2.5 font-medium">Qaror</th><th class="px-4 py-2.5 font-medium">Shaxs</th><th class="px-4 py-2.5 font-medium">Safar</th><th class="px-4 py-2.5 font-medium">Transport</th><th class="px-4 py-2.5 font-medium">Natija</th><th class="px-4 py-2.5 font-medium">Vaqtincha band qilish</th></tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="decision in recentDecisions.slice(0, 5)" :key="decision.id" class="hover:bg-muted/30">
                  <td class="px-4 py-3"><p class="font-mono text-xs">{{ decision.id }}</p><p class="mt-0.5 text-xs text-muted-foreground">{{ decision.createdAt }}</p></td>
                  <td class="px-4 py-3"><p class="font-medium">{{ decision.person }}</p><p class="mt-0.5 font-mono text-xs text-muted-foreground">{{ decision.pinfl }}</p></td>
                  <td class="px-4 py-3">{{ decision.route }}</td>
                  <td class="px-4 py-3">{{ transportLabel(decision.transportMode) }}</td>
                  <td class="px-4 py-3"><span :class="['rounded-md border px-2 py-1 font-mono text-xs font-medium', eligibilityBadgeClass(decision.result)]">{{ decision.result }}</span></td>
                  <td class="px-4 py-3 font-mono text-xs text-primary">{{ decision.reservationId ?? '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
            <div><h2 class="text-sm font-semibold">Manual verification case’lari</h2><p class="mt-0.5 text-xs text-muted-foreground">Tashuvchi huquq yaratmaydi; vakolatli qaror bir martalik opaque authorization beradi.</p></div>
            <span class="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 font-mono text-xs text-amber-700 dark:text-amber-300">D-04 OPEN</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1280px] text-left text-sm">
              <thead class="bg-muted/45 text-xs text-muted-foreground"><tr><th class="px-4 py-2.5 font-medium">Case / vaqt</th><th class="px-4 py-2.5 font-medium">Shaxs</th><th class="px-4 py-2.5 font-medium">Hujjat</th><th class="px-4 py-2.5 font-medium">Bergan organ / sana</th><th class="px-4 py-2.5 font-medium">Tekshiruvchi</th><th class="px-4 py-2.5 font-medium">Opaque authorization lifecycle</th><th class="px-4 py-2.5 font-medium">Holat / amal</th></tr></thead>
              <tbody class="divide-y divide-border">
                <tr v-for="item in manualCases" :key="item.id">
                  <td class="px-4 py-3"><p class="font-mono text-xs">{{ item.id }}</p><p class="mt-0.5 text-xs text-muted-foreground">{{ item.createdAt }}</p></td>
                  <td class="px-4 py-3"><p class="font-mono text-xs">{{ item.pinfl }}</p><p class="mt-0.5 text-xs text-muted-foreground">{{ transportLabel(item.transportMode) }}</p></td>
                  <td class="px-4 py-3"><p class="text-xs font-medium">{{ item.documentType }}</p><p class="mt-0.5 font-mono text-[11px] text-primary">{{ item.documentReference }}</p></td>
                  <td class="px-4 py-3"><p class="text-xs">{{ item.documentIssuer }}</p><p class="mt-0.5 text-xs text-muted-foreground">Berilgan: {{ item.issuedAt }} · amal: {{ item.validTo }}</p></td>
                  <td class="px-4 py-3 text-xs">{{ item.reviewer }}</td>
                  <td class="px-4 py-3"><p class="font-mono text-[11px]">{{ item.authorizationRef ?? 'Qaror kutilmoqda' }}</p><p v-if="item.offerId" class="mt-1 font-mono text-[11px] text-primary">{{ item.carrierCode }} · {{ item.offerId }} · {{ item.discountPercent }}%</p><p v-if="item.policySnapshot" class="mt-1 text-[11px] text-muted-foreground">{{ item.policySnapshot }} · {{ item.legType }} · {{ item.serviceNumber }} · cap={{ formatMoney(item.maxEligibleBase ?? 0) }}</p><p v-if="item.authorizationExpiresAt" class="mt-1 text-xs text-muted-foreground">Expiry: {{ item.authorizationExpiresAt }}</p><p v-if="item.authorizationConsumedAt" class="mt-1 text-xs text-primary">Consumed: {{ item.authorizationConsumedAt }}</p><p v-if="item.reservationId" class="mt-1 font-mono text-[11px] text-primary">{{ item.reservationId }} · source=MANUAL_DOCUMENT</p></td>
                  <td class="px-4 py-3"><span :class="['rounded-md border px-2 py-1 text-xs', item.status === 'Tasdiqlandi' ? 'border-primary/20 bg-primary/10 text-primary' : 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300']">{{ item.status }}</span><Button v-if="item.status === 'Tasdiqlandi' && !item.authorizationConsumedAt" size="sm" class="mt-2" @click="consumeManualAuthorization(item)">Tokenni atomar rezervga sarflash</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>

      <template v-else-if="isTicketEvents">
        <div class="grid shrink-0 grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label="Chipta holati bo‘yicha filtrlash">
          <TransportStatusCard v-for="card in ticketCards" :key="card.state" :label="card.label" :count="card.count" :icon="ticketPalette(card.state).icon" :tone="transportStatusTone(card.state)" :selected="ticketStateFilter === card.state" :share="card.state ? contingentShare(card.count, scopedTicketEvents.length) + '%' : ''" caption="ta chipta" @select="ticketStateFilter = card.state">
            <span class="flex items-baseline justify-between gap-2"><span class="text-muted-foreground">Jami narx</span><span class="font-semibold">{{ formatMoney(card.amount) }} <span class="font-normal">so‘m</span></span></span>
            <span class="mt-1 flex items-baseline justify-between gap-2"><span class="text-muted-foreground">So‘ralgan qoplama</span><span class="font-semibold">{{ formatMoney(card.requested) }} <span class="font-normal">so‘m</span></span></span>
          </TransportStatusCard>
        </div>
        <DialogRoot v-model:open="ticketFormOpen">
          <DialogPortal>
            <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
            <DialogContent class="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
              <div class="flex shrink-0 items-center justify-between border-b border-border px-4 py-3"><DialogTitle class="text-sm font-semibold">Chipta amali</DialogTitle><DialogClose as-child><Button variant="ghost" size="sm" aria-label="Formani yopish"><X class="h-4 w-4" /></Button></DialogClose></div>
              <DialogDescription class="sr-only">Chipta bo‘yicha amal ma’lumotlarini kiriting.</DialogDescription>
              <div class="min-h-0 overflow-y-auto">
          <form class="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4" @submit.prevent="submitTicketEvent">
            <label class="space-y-1.5"><span class="text-xs font-medium">Chipta ID</span><Input v-model="ticketDraft.ticketId" placeholder="UTY-78394510" /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Band qilish raqami</span><Input v-model="ticketDraft.reservationId" placeholder="RSV-PRINCIPAL-001" /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Yo‘lovchi JShShIRi</span><Input v-model="ticketDraft.passengerPinfl" maxlength="14" /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Yo‘lovchi roli</span><select v-model="ticketDraft.passengerRole" :class="fieldClass"><option v-for="option in ticketPassengerRoleOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Amal turi</span><select v-model="ticketDraft.eventType" :class="fieldClass"><option v-for="option in ticketEventTypeOptions" :key="option.code" :value="option.code">{{ userLabel(option.code) }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Safar segmenti</span><select v-model="ticketDraft.legType" :class="fieldClass"><option v-for="option in legTypeOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Transport</span><select v-model="ticketDraft.transportMode" :class="fieldClass"><option v-for="option in transportModeOptions" :key="option.code" :value="option.code">{{ option.label }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Qatnov raqami</span><Input v-model="ticketDraft.serviceNumber" /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Jo‘nash vaqti</span><Input v-model="ticketDraft.departureAt" type="datetime-local" :clearable="false" /></label>
            <div class="grid grid-cols-2 gap-2"><label class="space-y-1.5"><span class="text-xs font-medium">Qayerdan</span><Input v-model="ticketDraft.origin" /></label><label class="space-y-1.5"><span class="text-xs font-medium">Qayerga</span><Input v-model="ticketDraft.destination" /></label></div>
            <label class="space-y-1.5"><span class="text-xs font-medium">Chipta klassi</span><select v-model="ticketDraft.ticketClass" :class="fieldClass"><option v-for="option in fareClassOptions" :key="option.code" :value="option.code">{{ option.label }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Amaldagi narx, UZS · tarif dalili</span><Input v-model="ticketDraft.amount" type="number" /></label>
            <label class="space-y-1.5 xl:col-span-2"><span class="text-xs font-medium">Chipta nusxasi / yo‘nalish qaydnomasi reference’i</span><Input v-model="ticketDraft.evidenceRef" /></label>
            <label v-if="ticketDraft.eventType === 'RETURNED'" class="space-y-1.5 xl:col-span-2"><span class="text-xs font-medium">Qaytarish sababi</span><select v-model="ticketDraft.reason" :class="fieldClass"><option v-for="option in returnReasonOptions" :key="option.code" :value="option.code">{{ option.code }} · {{ option.label }}{{ option.code === 'PASSENGER_REQUEST' ? ' · avtomatik restore yo‘q' : '' }}</option></select></label>
            <label v-if="ticketDraft.eventType === 'RETURNED' && ticketDraft.reason !== 'PASSENGER_REQUEST'" class="space-y-1.5"><span class="text-xs font-medium">Tasdiqlangan nonuse sanasi</span><Input v-model="ticketDraft.serviceCancelledAt" type="date" :clearable="false" /></label>
            <label v-if="ticketDraft.eventType === 'RETURNED'" class="space-y-1.5"><span class="text-xs font-medium">Qaytarilgan vaqt</span><Input v-model="ticketDraft.returnedAt" type="datetime-local" :clearable="false" /></label>
            <div v-if="ticketDraft.eventType === 'RETURNED' && ticketDraft.reason !== 'PASSENGER_REQUEST'" class="flex items-end"><div class="w-full rounded-lg border border-primary/15 bg-primary/[0.045] px-3 py-2 text-xs leading-5"><span class="text-muted-foreground">Server deadline:</span> <strong class="font-mono">{{ computedReturnDeadline || 'nonuse sanasini kiriting' }}</strong><br><span class="text-muted-foreground">{{ returnWindowPolicy.version }} · tashuvchi tahrirlay olmaydi</span></div></div>
            <label v-if="ticketDraft.eventType === 'RESCHEDULED'" class="space-y-1.5"><span class="text-xs font-medium">Reschedule chain ID</span><Input v-model="ticketDraft.rescheduleChainId" placeholder="RSC-..." /></label>
            <label v-if="ticketDraft.eventType === 'RESCHEDULED'" class="space-y-1.5"><span class="text-xs font-medium">Server reschedule authorization</span><Input v-model="ticketDraft.rescheduleAuthorizationRef" placeholder="RAUTH-DEMO-11FC04" /></label>
            <label v-if="ticketDraft.eventType === 'RESCHEDULED'" class="space-y-1.5"><span class="text-xs font-medium">Eski chipta ID</span><Input v-model="ticketDraft.previousTicketId" placeholder="OLD-TICKET-..." /></label>
            <div class="flex items-end"><Button type="submit" class="w-full"><Send class="h-4 w-4" />Ma’lumotni yuborish</Button></div>
          </form>
              </div>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>

        <section class="transport-table flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div class="flex shrink-0 flex-wrap items-center gap-2 border-b border-border p-3">
            <div class="relative mr-auto w-full sm:max-w-sm"><Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input v-model="ticketSearch" placeholder="Chipta, yo‘lovchi, tashkilot yoki yo‘nalish" aria-label="Chiptalarni qidirish" class="pl-9" /></div>
            <FilterPopover v-model:open="ticketFilterOpen" :active-count="ticketFilterCount">
              <label class="block space-y-1 text-xs font-medium">Transport turi<select v-model="ticketModeFilter" :class="fieldClass"><option value="">Barchasi</option><option v-for="mode in transportModeOptions" :key="mode.code" :value="mode.code">{{ mode.label }}</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Toifa<select v-model="ticketCategoryFilter" :class="fieldClass"><option value="">Barchasi</option><option v-for="category in beneficiaryCategoryOptions" :key="category.code" :value="category.code">{{ category.label }} ({{ category.code }})</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Tashkilot<select v-model="ticketCarrierFilter" :class="fieldClass"><option value="">Barchasi</option><option v-for="carrier in ticketCarrierOptions" :key="carrier">{{ carrier }}</option></select></label>
              <label class="block space-y-1 text-xs font-medium">Holati<select v-model="ticketStateFilter" :class="fieldClass"><option value="">Barchasi</option><option v-for="state in ticketStateOptions" :key="state" :value="state">{{ userLabel(state) }}</option></select></label>
              <fieldset class="space-y-2"><legend class="text-xs font-medium">Chipta sanasi</legend><div class="grid grid-cols-2 gap-2"><label class="space-y-1 text-xs">Boshlanish<Input v-model="ticketDateFrom" type="date" :max="ticketDateTo || undefined" aria-label="Chipta sanasi boshlanishi" /></label><label class="space-y-1 text-xs">Tugash<Input v-model="ticketDateTo" type="date" :min="ticketDateFrom || undefined" aria-label="Chipta sanasi tugashi" /></label></div></fieldset>
              <fieldset class="space-y-2"><legend class="text-xs font-medium">Jo‘nash sanasi</legend><div class="grid grid-cols-2 gap-2"><label class="space-y-1 text-xs">Boshlanish<Input v-model="ticketDepartureFrom" type="date" :max="ticketDepartureTo || undefined" aria-label="Jo‘nash sanasi boshlanishi" /></label><label class="space-y-1 text-xs">Tugash<Input v-model="ticketDepartureTo" type="date" :min="ticketDepartureFrom || undefined" aria-label="Jo‘nash sanasi tugashi" /></label></div></fieldset>
              <p v-if="ticketDateInvalid" role="alert" class="text-xs text-destructive">Boshlanish sanasi tugash sanasidan keyin bo‘lishi mumkin emas.</p>
              <template #footer><div class="flex justify-end gap-2"><Button variant="outline" size="sm" @click="clearTicketFilters">Tozalash</Button><Button size="sm" :disabled="ticketDateInvalid" @click="ticketFilterOpen = false">Qo‘llash</Button></div></template>
            </FilterPopover>
            <Button variant="outline" size="sm" class="gap-1.5" :disabled="ticketDownloading || !filteredTicketEvents.length || ticketDateInvalid" @click="downloadTickets"><Download class="h-3.5 w-3.5" />{{ ticketDownloading ? 'Yuklanmoqda…' : 'Yuklab olish' }}</Button>
          </div>
          <div class="flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-3 py-2" role="group" aria-label="Chiptalar hisoboti ko‘rinishi"><Button size="sm" :variant="ticketReportOpen ? 'outline' : 'default'" :aria-pressed="!ticketReportOpen" @click="ticketReportOpen = false">Ro‘yxat</Button><Button size="sm" :variant="ticketReportOpen ? 'default' : 'outline'" :aria-pressed="ticketReportOpen" @click="ticketReportOpen = true">Hisobot</Button></div>
          <div :class="['min-h-0 flex-1', ticketReportOpen ? 'overflow-hidden' : 'overflow-auto overscroll-contain']">
            <table v-if="!ticketReportOpen" class="w-full min-w-[96rem] border-separate border-spacing-0 text-left text-sm">
              <thead class="sticky top-0 z-10 bg-muted/70 backdrop-blur"><tr><th v-for="heading in ['Hujjat', 'Shaxs', 'Toifa', 'Tashkilot', 'Chipta', 'Safar', 'Mablag‘ (so‘m)', 'Holat', 'Amallar']" :key="heading" class="border-b border-border px-3 py-2.5 font-medium">{{ heading }}</th></tr></thead>
              <tbody class="divide-y divide-border">
                <tr v-for="event in ticketPageEvents" :key="event.id" class="hover:bg-muted/30">
                  <td class="whitespace-nowrap px-3 py-2.5"><p><strong>{{ event.documentNumber || '—' }}</strong> <span class="text-xs text-muted-foreground">({{ event.documentId || event.id }})</span></p><p class="mt-1 text-xs text-muted-foreground">{{ event.documentDate ? formatInputDate(event.documentDate) : '—' }}</p></td>
                  <td class="px-3 py-2.5"><strong>{{ event.passengerName?.toLocaleUpperCase('uz-UZ') || '—' }}</strong><p class="mt-1 whitespace-nowrap text-xs text-muted-foreground">{{ event.passenger }} ({{ contingentAge(event.passengerBirthDate) }} yosh)</p></td>
                  <td class="min-w-64 max-w-96 px-3 py-2.5"><p><strong>{{ ticketCategoryLabel(event) }}</strong> <span class="text-xs text-muted-foreground">({{ event.beneficiaryCategoryCode || '—' }})</span></p><p class="mt-1 text-xs text-muted-foreground">{{ event.beneficiarySource || '—' }}</p></td>
                  <td class="min-w-56 max-w-80 px-3 py-2.5"><p><strong>{{ event.carrier }}</strong> <span class="text-xs text-muted-foreground">({{ ticketCarrierInn(event) }})</span></p><p class="mt-1 text-xs text-muted-foreground">{{ ticketModeLabel(event) }}</p></td>
                  <td class="whitespace-nowrap px-3 py-2.5"><strong>{{ event.ticketId }}</strong><p class="mt-1 text-xs text-muted-foreground">{{ ticketIssuedDate(event) }}</p></td>
                  <td class="px-3 py-2.5"><p>{{ event.route }}</p><p class="mt-1 text-xs text-muted-foreground">{{ event.departureAt }} · {{ event.serviceNumber }}</p><p class="mt-1 text-xs text-muted-foreground">{{ event.ticketClass }} · {{ userLabel(event.legType) }}</p></td>
                  <td class="whitespace-nowrap px-3 py-2.5 tabular-nums"><p><strong class="text-primary">{{ formatMoney(event.compensationRequested) }}</strong> / {{ formatMoney(event.amount) }} <span class="text-xs text-muted-foreground">({{ ticketRequestedShare(event) }}%)</span></p><p class="mt-1 text-xs text-muted-foreground">Yo‘lovchi: {{ formatMoney(event.passengerPaidAmount) }}</p></td>
                  <td class="px-3 py-2.5"><span :class="['inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium', ticketPalette(event.ticketState).badge]">{{ userLabel(event.ticketState) }}</span></td>
                  <td class="px-3 py-2.5"><Button variant="outline" size="sm" @click="selectedTicketEventId = event.id; ticketDetailsOpen = true">Ko‘rish</Button></td>
                </tr>
                <tr v-if="!filteredTicketEvents.length"><td colspan="9" class="px-3 py-12 text-center text-muted-foreground">Ma’lumot topilmadi.</td></tr>
              </tbody>
            </table>
            <GroupedReport v-show="ticketReportOpen" ref="ticketGroupedReport" :rows="ticketGroupedRows" :dimensions="ticketDimensions" :metrics="ticketMetrics" initial-primary="mode" initial-secondary="carrier" filename="chiptalar-hisobot.xlsx" @drill="drillTicket" />
          </div>
          <div v-if="!ticketReportOpen" class="flex shrink-0 flex-col gap-3 border-t border-border px-3 py-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><div class="flex flex-wrap items-center gap-3"><label class="inline-flex items-center gap-2">Qatorlar soni<select v-model.number="ticketPageSize" aria-label="Qatorlar soni" class="h-8 rounded-md border border-border bg-background px-2"><option v-for="size in [10,20,50,100]" :key="size" :value="size">{{ size }}</option></select></label><span>Sahifada: <strong class="text-foreground">{{ ticketRangeStart }}–{{ ticketRangeEnd }} / {{ ticketRowCount }}</strong></span></div><div class="flex items-center gap-2"><Button variant="ghost" size="sm" @click="clearTicketFilters(); ticketSearch = ''; ticketPage = 1">Tiklash</Button><nav aria-label="Chiptalar sahifalari" class="flex h-8 items-center rounded-lg border border-border bg-background px-1"><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="ticketPage === 1" aria-label="Birinchi sahifa" @click="ticketPage = 1"><ChevronsLeft class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="ticketPage === 1" aria-label="Oldingi sahifa" @click="ticketPage--"><ChevronLeft class="h-4 w-4" /></Button><span aria-live="polite" class="min-w-14 px-2 text-center font-semibold text-foreground">{{ ticketPage }}/{{ ticketPageCount }}</span><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="ticketPage === ticketPageCount" aria-label="Keyingi sahifa" @click="ticketPage++"><ChevronRight class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="ticketPage === ticketPageCount" aria-label="Oxirgi sahifa" @click="ticketPage = ticketPageCount"><ChevronsRight class="h-4 w-4" /></Button></nav></div></div>
        </section>
      </template>

      <template v-else-if="isSettlements">
        <ReimbursementPanel :tickets="ticketEvents" />
      </template>

      <template v-else-if="isReferences">
        <div class="transport-reference-grid grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 xl:grid-cols-[15rem_minmax(0,1fr)] xl:grid-rows-1">
          <section class="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
            <div class="border-b border-border p-4">
              <div class="flex items-center gap-2"><BookOpenCheck class="h-4 w-4 text-primary" /><h2 class="text-sm font-semibold">Kataloglar registri</h2></div>

              <div class="relative mt-3">
                <Search class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input v-model="referenceCatalogSearch" class="pl-8" placeholder="Katalogni qidirish..." />
              </div>
            </div>
            <div class="flex max-h-28 gap-1.5 overflow-auto p-2 xl:max-h-none xl:flex-1 xl:flex-col">
              <button
                v-for="catalog in filteredFamilyReferenceCatalogs"
                :key="catalog.id"
                type="button"
                :class="[
                  'min-w-44 rounded-lg border p-2.5 text-left transition-colors xl:w-full',
                  selectedReferenceCatalog?.id === catalog.id ? 'border-primary/30 bg-primary/[0.06] shadow-sm' : 'border-transparent hover:border-border hover:bg-muted/40',
                ]"
                @click="selectReferenceCatalog(catalog.id)"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0"><p class="truncate text-xs font-semibold text-foreground">{{ catalog.title }}</p></div>
                  <span class="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{{ catalog.entries.length }}</span>
                </div>
              </button>
              <div v-if="!filteredFamilyReferenceCatalogs.length" class="px-3 py-10 text-center text-xs text-muted-foreground">Mos katalog topilmadi.</div>
            </div>
          </section>

          <section v-if="selectedReferenceCatalog" class="transport-table flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
            <div class="border-b border-border p-4">
              <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h2 class="text-base font-semibold">{{ selectedReferenceCatalog.title }}</h2>
                  </div>
                </div>
                <div class="shrink-0 text-right"><p class="font-mono text-xs font-semibold">{{ selectedReferenceCatalog.entries.length }} yozuv</p></div>
              </div>
              <div v-if="selectedReferenceCatalog.warning" class="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/25 bg-amber-500/[0.055] p-3 text-xs leading-5 text-muted-foreground">
                <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                <span>{{ selectedReferenceCatalog.warning }}</span>
              </div>
            </div>

            <div class="grid gap-2 border-b border-border p-3 md:grid-cols-[minmax(12rem,1fr)_auto_auto]">
              <div class="relative">
                <Search class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input v-model="referenceEntrySearch" class="pl-8" placeholder="Kod, nom yoki huquqiy asos bo‘yicha qidirish..." />
              </div>
              <select v-model="referenceKindFilter" :class="fieldClass" class="md:w-48">
                <option value="ALL">Barcha turlar</option>
                <option value="NORMATIVE_REFERENCE">Normativ mazmun</option>
                <option value="TECHNICAL_CONFIGURATION">Texnik konfiguratsiya</option>
              </select>
              <select v-model="referenceStatusFilter" :class="fieldClass" class="md:w-44">
                <option value="ALL">Barcha holatlar</option>
                <option value="ACTIVE">Faol</option>
                <option value="OPEN_DECISION">Qaror kutilmoqda</option>
                <option value="DRAFT">Draft</option>
                <option value="HISTORICAL">Tarixiy</option>
              </select>
            </div>

            <div class="min-h-0 flex-1 overflow-auto overscroll-contain">
              <table class="w-full min-w-[1060px] text-left text-sm">
                <thead class="sticky top-0 z-10 bg-muted/70 text-sm text-foreground backdrop-blur">
                  <tr><th class="border-b border-border px-3 py-2.5 font-medium">Kod</th><th class="border-b border-border px-3 py-2.5 font-medium">Nomi</th><th class="border-b border-border px-3 py-2.5 font-medium">Tasnif</th><th class="border-b border-border px-3 py-2.5 font-medium">Huquqiy asos</th><th class="border-b border-border px-3 py-2.5 font-medium">Amal davri</th><th class="border-b border-border px-3 py-2.5 font-medium">Holat</th></tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr v-for="entry in filteredReferenceEntries" :key="`${selectedReferenceCatalog.code}:${entry.code}`" class="align-top hover:bg-muted/30">
                    <td class="px-3 py-2.5"><p class="font-mono text-xs font-semibold text-foreground">{{ entry.code }}</p></td>
                    <td class="max-w-[24rem] px-3 py-2.5"><p class="font-medium text-foreground">{{ entry.name }}</p><p v-if="entry.description" class="mt-1 text-xs leading-5 text-muted-foreground">{{ entry.description }}</p><details v-if="entry.attributes" class="mt-1"><summary class="cursor-pointer text-xs text-muted-foreground">Qo‘shimcha ma’lumot</summary><div class="mt-2 flex flex-wrap gap-1"><span v-for="(value, key) in entry.attributes" :key="key" class="rounded border border-border bg-muted/35 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{{ key }}={{ formatReferenceAttribute(value) }}</span></div></details></td>
                    <td class="px-3 py-2.5"><span :class="['inline-flex rounded-md border px-2 py-1 text-[10px] font-medium', entry.kind === 'NORMATIVE_REFERENCE' ? 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300']">{{ referenceKindLabel(entry.kind) }}</span></td>
                    <td class="max-w-[17rem] px-3 py-2.5"><p class="text-xs font-medium">{{ entry.legalBasis ?? '—' }}</p><p class="mt-1 text-xs leading-5 text-muted-foreground">{{ entry.owner ?? '—' }}</p></td>
                    <td class="px-3 py-2.5 font-mono text-[11px]"><p>{{ entry.effectiveFrom ?? '—' }}</p><p class="mt-1 text-muted-foreground">→ {{ entry.effectiveTo ?? 'ochiq' }}</p></td>
                    <td class="px-3 py-2.5"><span :class="['inline-flex rounded-md border px-2 py-1 text-xs font-medium', referenceStatusClass(entry.status)]">{{ referenceStatusLabel(entry.status) }}</span></td>
                  </tr>
                  <tr v-if="!filteredReferenceEntries.length"><td colspan="6" class="px-4 py-14 text-center text-sm text-muted-foreground">Tanlangan filtrlarga mos yozuv topilmadi.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="shrink-0 border-t border-border px-3 py-2 text-xs text-muted-foreground">Jami: <strong class="text-foreground">{{ filteredReferenceEntries.length }}</strong> ta yozuv</div>
          </section>
          <section v-else class="flex min-h-0 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center shadow-sm">
            <div><Search class="mx-auto h-8 w-8 text-muted-foreground/60" /><h2 class="mt-3 text-sm font-semibold">Katalog topilmadi</h2><p class="mt-1 text-xs text-muted-foreground">Qidiruvni tozalang yoki boshqa ma’lumotnoma oilasini tanlang.</p></div>
          </section>
        </div>

      </template>

      <template v-else-if="isIntegrations">
        <IntegrationExplorer :apis="apiDefinitions" />
        <details class="rounded-xl border border-border bg-card p-4">
          <summary class="cursor-pointer text-sm font-semibold">Arxitektura va qo‘shimcha texnik ma’lumotlar</summary>
          <div class="mt-4 space-y-4">

        <section class="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] shadow-sm">
          <div class="flex flex-col gap-2 border-b border-amber-500/20 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 class="text-sm font-semibold">VMQ-440 ishga tushirish qaror-gate’lari</h2><p class="mt-0.5 text-xs text-muted-foreground">Qarorda ochilmagan talqinlar “rasmiy qoida” sifatida kodga qattiq yozilmaydi.</p></div>
            <span class="rounded-md border border-amber-500/25 bg-amber-500/10 px-2 py-1 font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">7 OPEN</span>
          </div>
          <div class="grid gap-2 p-4 md:grid-cols-2 xl:grid-cols-4">
            <div v-for="gate in decisionGates" :key="gate.id" class="rounded-lg border border-border bg-background/80 p-3">
              <div class="flex items-center justify-between gap-2"><span class="font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">{{ gate.id }}</span><span class="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-700 dark:text-amber-300">OPEN</span></div>
              <p class="mt-2 text-xs leading-5 text-muted-foreground">{{ gate.label }}</p>
            </div>
          </div>
          <p class="border-t border-amber-500/20 px-4 py-3 text-xs leading-5 text-muted-foreground">D-02, D-03, D-05 va D-06 yopilmasdan tegishli policy yoki moliyaviy oqim productionda faollashtirilmaydi.</p>
        </section>

        <section class="rounded-xl border border-border bg-card shadow-sm">
          <div class="border-b border-border px-4 py-3.5"><h2 class="text-sm font-semibold">MVP ichki modullari</h2><p class="mt-0.5 text-xs text-muted-foreground">Birinchi bosqichda bitta deployable backend ichidagi aniq bounded contextlar.</p></div>
          <div class="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
            <div v-for="(module, index) in architectureModules" :key="module.title" class="relative rounded-lg border border-border bg-background p-4">
              <div class="flex items-center justify-between"><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><component :is="module.icon" class="h-4.5 w-4.5" /></div><span class="font-mono text-[10px] text-muted-foreground">0{{ index + 1 }}</span></div>
              <h3 class="mt-3 text-sm font-semibold">{{ module.title }}</h3>
              <p class="mt-1 text-xs leading-5 text-muted-foreground">{{ module.description }}</p>
              <p class="mt-3 border-t border-border pt-3 font-mono text-[10px] leading-4 text-primary">{{ module.owns }}</p>
              <span v-if="index < architectureModules.length - 1" class="absolute -right-2 top-1/2 z-10 hidden h-px w-2 bg-border xl:block" />
            </div>
          </div>
          <div class="grid gap-3 border-t border-border p-4 lg:grid-cols-3">
            <div class="flex items-start gap-3 rounded-lg bg-muted/35 p-3"><ServerCog class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p class="text-xs font-semibold">Modulli monolit</p><p class="mt-1 text-xs leading-5 text-muted-foreground">MVPda 20 ta mikroservis emas: bitta backend, bitta worker va mantiqiy modul chegaralari.</p></div></div>
            <div class="flex items-start gap-3 rounded-lg bg-muted/35 p-3"><Database class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p class="text-xs font-semibold">Bitta DB klasteri</p><p class="mt-1 text-xs leading-5 text-muted-foreground">Tashkilot/toifa uchun table yo‘q; domen entity va klassifikatorlar bo‘yicha jadvallar.</p></div></div>
            <div class="flex items-start gap-3 rounded-lg bg-muted/35 p-3"><Network class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p class="text-xs font-semibold">Common envelope</p><p class="mt-1 text-xs leading-5 text-muted-foreground">event_id, source, type, version, occurred_at, idempotency va payload_hash hamma eventda bir xil.</p></div></div>
          </div>
        </section>

        <div class="grid gap-4 xl:grid-cols-2">
          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="border-b border-border px-4 py-3.5"><h2 class="text-sm font-semibold">Social Card transition</h2><p class="mt-0.5 text-xs text-muted-foreground">Integratsiya muddati va biznes aktivatsiyasi alohida.</p></div>
            <div class="space-y-3 p-4">
              <div class="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/[0.045] p-3"><BadgeCheck class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p class="text-xs font-semibold">01.10.2026 · carrier/kassa integratsiyasi</p><p class="mt-1 text-xs leading-5 text-muted-foreground">Sertifikatsiya yadro bilan parallel. 2026 operatsiyalari MONTHLY_CLAIM orqali yuradi.</p></div></div>
              <div class="flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/[0.05] p-3"><Clock3 class="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" /><div><p class="text-xs font-semibold">01.01.2027 · real-time payment</p><p class="mt-1 text-xs leading-5 text-muted-foreground">Hozir o‘chiq. D-07, payment_channel va anti-double-payment nazorati yopilgach faollashadi.</p></div></div>
              <div class="flex items-start gap-3 rounded-lg border border-border bg-muted/35 p-3"><RefreshCw class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div><p class="text-xs font-semibold">D-07 · reconciliation va recovery</p><p class="mt-1 text-xs leading-5 text-muted-foreground">Retry, refund, reversal va real-time ↔ oylik reyestr solishtiruvi alohida holatlar bilan yuritiladi; bitta safar ikki kanalda qoplanmaydi.</p></div></div>
            </div>
          </section>
          <section class="rounded-xl border border-border bg-card shadow-sm">
            <div class="border-b border-border px-4 py-3.5"><h2 class="text-sm font-semibold">Hisobot va append-only audit</h2><p class="mt-0.5 text-xs text-muted-foreground">Agentlik, inspeksiya va shikoyat ko‘rib chiqish uchun dalil.</p></div>
            <div class="grid gap-2 p-4 sm:grid-cols-2"><div v-for="scope in reportingScopes" :key="scope" class="flex items-start gap-2 rounded-lg bg-muted/35 p-2.5 text-xs leading-5"><CheckCircle2 class="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /><span>{{ scope }}</span></div></div>
            <div class="border-t border-border p-4"><p class="text-xs font-semibold">WORM dalil maydonlari</p><div class="mt-2 flex flex-wrap gap-1.5"><span v-for="field in auditEvidenceFields" :key="field" class="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground">{{ field }}</span></div><p class="mt-3 text-xs leading-5 text-muted-foreground">Audit yozuvi append-only; nazoratchi va shikoyat jarayoni uchun read-only evidence export yaratiladi.</p></div>
          </section>
        </div>

        <section class="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Zap class="h-5 w-5" /></div>
              <div><h2 class="text-sm font-semibold">Yangi integratsiya qo‘shish mezoni</h2><p class="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">Yangi tashkilot — client/ownership konfiguratsiyasi. Yangi toifa — master-data va policy. Yangi transport — transport_mode va fare policy. Kod, endpoint yoki alohida jadval faqat yangi biznes invarianti paydo bo‘lsa qo‘shiladi.</p></div>
            </div>
            <div class="flex shrink-0 items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.05] px-3 py-2 text-xs font-medium text-primary"><CheckCircle2 class="h-4 w-4" />Configuration over duplication</div>
          </div>
        </section>
          </div>
        </details>
      </template>
    </div>

      <DialogRoot v-model:open="ticketDetailsOpen">
        <DialogPortal><DialogOverlay class="fixed inset-0 z-50 bg-black/50" /><DialogContent class="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <div class="flex items-center justify-between border-b px-4 py-3"><DialogTitle class="font-semibold">Chipta tafsilotlari</DialogTitle><DialogClose as-child><Button variant="ghost" size="sm" aria-label="Tafsilotlarni yopish"><X class="h-4 w-4" /></Button></DialogClose></div>
          <DialogDescription class="sr-only">Chipta, safar va qaytarish ma’lumotlari.</DialogDescription>
          <div v-if="selectedTicketRecord" class="min-h-0 overflow-auto p-4">
            <dl class="grid gap-4 sm:grid-cols-2">
              <div><dt class="text-xs text-muted-foreground">Hujjat raqami (ID)</dt><dd class="mt-1"><strong>{{ selectedTicketRecord.documentNumber || '—' }}</strong> ({{ selectedTicketRecord.documentId || selectedTicketRecord.id }})</dd></div>
              <div><dt class="text-xs text-muted-foreground">Hujjat sanasi</dt><dd class="mt-1">{{ selectedTicketRecord.documentDate ? formatInputDate(selectedTicketRecord.documentDate) : '—' }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Chipta sanasi</dt><dd class="mt-1">{{ ticketIssuedDate(selectedTicketRecord) }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Chipta raqami</dt><dd class="mt-1 font-semibold">{{ selectedTicketRecord.ticketId }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Holat</dt><dd class="mt-1">{{ userLabel(selectedTicketRecord.ticketState) }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Yo‘lovchi</dt><dd class="mt-1"><strong>{{ selectedTicketRecord.passengerName?.toLocaleUpperCase('uz-UZ') || '—' }}</strong><p class="mt-1 text-xs text-muted-foreground">{{ selectedTicketRecord.passenger }} ({{ contingentAge(selectedTicketRecord.passengerBirthDate) }} yosh)</p></dd></div>
              <div class="sm:col-span-2"><dt class="text-xs text-muted-foreground">Toifa</dt><dd class="mt-1"><strong>{{ ticketCategoryLabel(selectedTicketRecord) }}</strong> ({{ selectedTicketRecord.beneficiaryCategoryCode || '—' }})<p class="mt-1 text-xs text-muted-foreground">{{ selectedTicketRecord.beneficiarySource || '—' }}</p></dd></div>
              <div><dt class="text-xs text-muted-foreground">Tashkilot</dt><dd class="mt-1"><strong>{{ selectedTicketRecord.carrier }}</strong> ({{ ticketCarrierInn(selectedTicketRecord) }})<p class="mt-1 text-xs text-muted-foreground">{{ ticketModeLabel(selectedTicketRecord) }}</p></dd></div>
              <div><dt class="text-xs text-muted-foreground">Yo‘nalish</dt><dd class="mt-1">{{ selectedTicketRecord.route }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Jo‘nash vaqti</dt><dd class="mt-1">{{ selectedTicketRecord.departureAt }}</dd></div>
              <div><dt class="text-xs text-muted-foreground">Chipta narxi</dt><dd class="mt-1">{{ formatMoney(selectedTicketRecord.amount) }} so‘m</dd></div>
              <div><dt class="text-xs text-muted-foreground">Yo‘lovchi to‘lovi</dt><dd class="mt-1">{{ formatMoney(selectedTicketRecord.passengerPaidAmount) }} so‘m</dd></div>
              <div><dt class="text-xs text-muted-foreground">So‘ralgan qoplama</dt><dd class="mt-1">{{ formatMoney(selectedTicketRecord.compensationRequested) }} so‘m</dd></div>
              <div><dt class="text-xs text-muted-foreground">Hujjat</dt><dd class="mt-1 break-words">{{ selectedTicketRecord.evidenceRef }}</dd></div>
              <div v-if="selectedTicketRecord.reason"><dt class="text-xs text-muted-foreground">Qaytarish sababi</dt><dd class="mt-1">{{ selectedTicketRecord.reason }}</dd></div>
              <div v-if="selectedTicketRecord.returnedAt"><dt class="text-xs text-muted-foreground">Qaytarilgan vaqt</dt><dd class="mt-1">{{ selectedTicketRecord.returnedAt }}</dd></div>
              <div v-if="selectedTicketRecord.returnDeadline"><dt class="text-xs text-muted-foreground">Ko‘rib chiqish muddati</dt><dd class="mt-1">{{ selectedTicketRecord.returnDeadline }}</dd></div>
              <div v-if="selectedTicketRecord.previousTicketId"><dt class="text-xs text-muted-foreground">Avvalgi chipta</dt><dd class="mt-1">{{ selectedTicketRecord.previousTicketId }}</dd></div>
            </dl>
            <div v-if="selectedTicketRecord.returnReviewStatus === 'PENDING'" class="mt-4 border-t pt-4"><p class="mb-2 text-sm">Qaytarish bo‘yicha qaror kutilmoqda.</p><div class="flex gap-2"><Button size="sm" :disabled="!canDecideReturnReview" @click="decideReturnReview(selectedTicketRecord, 'APPROVED')">Tasdiqlash</Button><Button size="sm" variant="outline" :disabled="!canDecideReturnReview" @click="decideReturnReview(selectedTicketRecord, 'REJECTED')">Rad etish</Button></div><p v-if="!canDecideReturnReview" class="mt-2 text-xs text-muted-foreground">Ushbu amal uchun vakolat yetarli emas.</p></div>
          </div>
        </DialogContent></DialogPortal>
      </DialogRoot>

    <DialogRoot v-model:open="contingentDetailsOpen">
      <DialogPortal><DialogOverlay class="fixed inset-0 z-50 bg-black/50" /><DialogContent class="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
        <div class="flex items-center justify-between border-b px-4 py-3"><DialogTitle class="font-semibold">Imtiyoz oluvchi tafsilotlari</DialogTitle><DialogClose as-child><Button variant="ghost" size="sm" aria-label="Tafsilotlarni yopish"><X class="h-4 w-4" /></Button></DialogClose></div>
        <DialogDescription class="sr-only">Hujjat, shaxs, toifa va bekor qilish ma’lumotlari.</DialogDescription>
        <dl v-if="selectedContingent" class="grid min-h-0 gap-4 overflow-auto p-4 sm:grid-cols-2">
          <div><dt class="text-xs text-muted-foreground">Hujjat raqami (ID)</dt><dd class="mt-1">{{ selectedContingent.documentNumber || '—' }} ({{ selectedContingent.documentId || selectedContingent.id }})</dd></div>
          <div><dt class="text-xs text-muted-foreground">Sana</dt><dd class="mt-1">{{ selectedContingent.documentDate ? formatInputDate(selectedContingent.documentDate) : selectedContingent.receivedAt.split(' ')[0] }}</dd></div>
          <div><dt class="text-xs text-muted-foreground">F.I.O.</dt><dd class="mt-1 font-semibold">{{ selectedContingent.person.toLocaleUpperCase('uz-UZ') }}</dd></div>
          <div><dt class="text-xs text-muted-foreground">JShShIR (yosh)</dt><dd class="mt-1">{{ selectedContingent.pinfl }} ({{ contingentAge(selectedContingent.birthDate) }} yosh)</dd></div>
          <div class="sm:col-span-2"><dt class="text-xs text-muted-foreground">Toifa</dt><dd class="mt-1">{{ contingentCategoryName(selectedContingent) }} ({{ contingentCategoryCode(selectedContingent) }})</dd></div>
          <div><dt class="text-xs text-muted-foreground">Manba</dt><dd class="mt-1">{{ selectedContingent.source }}</dd></div>
          <div><dt class="text-xs text-muted-foreground">Holat</dt><dd class="mt-1">{{ selectedContingent.status }}</dd></div>
          <div><dt class="text-xs text-muted-foreground">Bekor qilish sababi</dt><dd class="mt-1">{{ selectedContingent.revocationReason || '—' }}</dd></div>
          <div><dt class="text-xs text-muted-foreground">Bekor qilish sanasi</dt><dd class="mt-1">{{ selectedContingent.revokedAt || '—' }}</dd></div>
        </dl>
      </DialogContent></DialogPortal>
    </DialogRoot>

    <div v-if="isContingentDialogOpen" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 p-4" @click.self="isContingentDialogOpen = false">
      <div class="w-full max-w-xl rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl">
        <div class="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div><h2 class="text-base font-semibold">Imtiyoz oluvchilar eventini yuborish</h2></div>
          <Button variant="ghost" size="icon" aria-label="Yopish" @click="isContingentDialogOpen = false"><X class="h-4 w-4" /></Button>
        </div>
        <form class="space-y-4 p-5" @submit.prevent="submitContingentEvent">
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="space-y-1.5"><span class="text-xs font-medium">Manba tashkilot</span><select v-model="contingentDraft.source" :class="fieldClass"><option v-for="source in sourceOptions" :key="source">{{ source }}</option></select></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Amal turi</span><select v-model="contingentDraft.eventType" :class="fieldClass"><option v-for="option in contingentEventTypeOptions" :key="option.code" :value="option.code">{{ userLabel(option.code) }}</option></select></label>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="space-y-1.5"><span class="text-xs font-medium">JShShIR</span><Input v-model="contingentDraft.pinfl" maxlength="14" placeholder="14 xonali raqam" /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">F.I.Sh.</span><Input v-model="contingentDraft.person" placeholder="Familiya I. O." /></label>
          </div>
          <label class="block space-y-1.5">
            <span class="text-xs font-medium">Texnik profil · D-01</span>
            <select v-model="contingentDraft.category" :class="fieldClass" @change="syncContingentLegalBasis">
              <option v-for="category in categoryOptions" :key="category.code" :value="category.label">{{ category.label }} ({{ category.code }})</option>
            </select>
          </label>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="space-y-1.5">
              <span class="text-xs font-medium">Huquqiy asos kodi</span>
              <select v-if="selectedCategoryNeedsEquivalenceBasis" v-model="contingentDraft.legalBasis" :class="fieldClass">
                <option v-for="basis in filteredEquivalenceBasisOptions" :key="basis.code" :value="basis.code">{{ basis.label }}</option>
              </select>
              <Input v-else v-model="contingentDraft.legalBasis" />
            </label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Amal boshlanishi</span><Input v-model="contingentDraft.effectiveFrom" type="date" :clearable="false" /></label>
          </div>
          <div class="rounded-lg border border-amber-500/20 bg-amber-500/[0.055] p-3 text-xs leading-5 text-muted-foreground"><strong class="text-foreground">D-01:</strong> qaror toifa × atribut × manba ownershipini to‘liq ajratmagan. C01–C11 yopiq rasmiy katalog emas; DIS_EQ_01…04 va PART_EQ_01…10 reference’lari yo‘qotilmaydi. Hamroh kontingent emas, safarga bog‘langan rol.</div>
          <div class="rounded-lg border border-border bg-muted/35 p-3 text-xs leading-5 text-muted-foreground"><strong class="text-foreground">Sana modeli:</strong> manba idoradagi huquqning effective_from sanasi 01.10.2026 dan oldin bo‘lishi mumkin. VMQ-440 bo‘yicha chipta/rezerv policy go-live’i alohida 01.10.2026 gate bilan boshqariladi.</div>
          <div class="rounded-lg border border-border bg-muted/35 p-3 text-xs leading-5 text-muted-foreground"><strong class="text-foreground">Xavfsizlik:</strong> tashkilot identiteti bodydan emas, mTLS/token claimidan olinadi va tanlangan manba kodi bilan solishtiriladi.</div>
          <div class="flex justify-end gap-2 border-t border-border pt-4"><Button variant="outline" @click="isContingentDialogOpen = false">Bekor qilish</Button><Button type="submit"><Send class="h-4 w-4" />APIga yuborish</Button></div>
        </form>
      </div>
    </div>

    <div v-if="isManualCaseDialogOpen" class="fixed inset-0 z-[115] flex items-center justify-center bg-black/45 p-4" @click.self="isManualCaseDialogOpen = false">
      <div class="w-full max-w-lg rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl">
        <div class="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div><h2 class="text-base font-semibold">Tasdiqlovchi hujjat case’i</h2><p class="mt-1 text-xs text-muted-foreground">YAMIHda huquq topilmaganda Nizom bo‘yicha manual fallback</p></div>
          <Button variant="ghost" size="icon" aria-label="Yopish" @click="isManualCaseDialogOpen = false"><X class="h-4 w-4" /></Button>
        </div>
        <form class="space-y-4 p-5" @submit.prevent="submitManualCase">
          <label class="block space-y-1.5"><span class="text-xs font-medium">Temir yo‘l uchun normativ hujjat turi</span><select v-model="manualCaseDraft.documentType" :class="fieldClass"><option v-for="option in manualDocumentOptions" :key="option.code" :value="option.name">{{ option.name }}</option></select></label>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="space-y-1.5"><span class="text-xs font-medium">Himoyalangan reference</span><Input v-model="manualCaseDraft.documentReference" placeholder="DOC-REF-..." /></label>
            <label class="space-y-1.5"><span class="text-xs font-medium">Hujjatni bergan organ</span><Input v-model="manualCaseDraft.documentIssuer" placeholder="Vakolatli davlat organi" /></label>
          </div>
          <div class="grid gap-3 sm:grid-cols-2"><label class="block space-y-1.5"><span class="text-xs font-medium">Berilgan sana</span><Input v-model="manualCaseDraft.issuedAt" type="date" :clearable="false" /></label><label class="block space-y-1.5"><span class="text-xs font-medium">Amal muddati</span><Input v-model="manualCaseDraft.validTo" type="date" :clearable="false" /></label></div>
          <div class="rounded-lg border border-amber-500/20 bg-amber-500/[0.055] p-3 text-xs leading-5 text-muted-foreground">
            Nomlangan guvohnomalar temir yo‘l fallbackidan olingan draft misollar; havo va avtobus uchun rasmiy katalog, tekshiruvchi vakolati va SLA — D-04. Operator huquq yaratmaydi. Ijobiy qarorda server benefitsiar, policy, tashuvchi, yo‘nalish va expiryga bog‘langan bir martalik opaque authorization yaratadi; raw token loglarda ko‘rsatilmaydi.
          </div>
          <div class="flex justify-end gap-2 border-t border-border pt-4"><Button variant="outline" type="button" @click="isManualCaseDialogOpen = false">Bekor qilish</Button><Button type="submit"><Send class="h-4 w-4" />Tekshiruvga yuborish</Button></div>
        </form>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.transport-workspace > :not(.transport-table):not(.transport-reference-grid) {
  flex-shrink: 0;
}
.transport-table > :not(.overflow-auto) {
  flex-shrink: 0;
}
.transport-workspace :deep(th) {
  white-space: nowrap;
}
.transport-workspace :deep(tbody td) {
  vertical-align: middle;
  border-bottom: 1px solid var(--border);
}
</style>
