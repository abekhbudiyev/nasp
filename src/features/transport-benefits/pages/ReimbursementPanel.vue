<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from 'reka-ui'
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from 'reka-ui'
import { Search, Plus, Ellipsis, Eye, X, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ListChecks, Clock3, CircleAlert, CircleCheck } from 'lucide-vue-next'
import StatusTabs from '@/shared/components/StatusTabs.vue'
import FilterPopover from '@/shared/components/FilterPopover.vue'
import FilterSelect from '@/shared/components/FilterSelect.vue'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { userLabel } from '../ui-labels'
import { requestStatuses, paymentStatuses, documentTypes, latestTickets, eventMonth, validateLines, normalizeRequestStatus, type ReimbursementRequest, type ReimbursementTicket, type RegisteredFile, type RequestDocument } from '../reimbursement'
import RequestFileField from './RequestFileField.vue'
import { createReimbursementCases } from '../reimbursement-cases'
import { carrierOptions, transportModeOptions } from '../reference-data'

const props = defineProps<{ tickets: ReimbursementTicket[] }>()
// Each page instance starts with fresh fixtures; no browser storage or database writes.
const initialCases = createReimbursementCases()
const requests = ref<ReimbursementRequest[]>(initialCases.requests)
const message = ref('')
const createOpen = ref(false)
const menuItemClass = 'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none data-[highlighted]:bg-muted'
const detailsOpen = ref(false)
const approvalMode = ref(false)
const cancelOpen = ref(false)
const cancelReason = ref('')
const draftDemoTickets = ref<ReimbursementTicket[]>([])
const organizations = computed(() => {
  const entries = carrierOptions.map(c => ({ code: c.code, label: c.label, transportMode: c.transportMode }))
  for (const t of props.tickets) if (!entries.some(c => c.label === t.carrier && c.transportMode === t.transportMode)) entries.push({ code: '', label: t.carrier, transportMode: t.transportMode })
  return entries
})
const carriers = computed(() => organizations.value.filter(c => c.transportMode === transportMode.value))
const carrier = ref('')
const period = ref('')
const transportMode = ref('')
const ticketsFilled = ref(false)
watch(transportMode, () => { carrier.value = '' }, { flush: 'sync' })
const sourceId = ref('BUY-2026-10-001')
const account = ref('20208000000000000001')
const documents = ref<RequestDocument[]>([])
const lineDocuments = ref<Record<string, RequestDocument[]>>({})
const expandedTicket = ref('')
const costType = documentTypes[2]
const lineTypes = documentTypes.filter(t => t.scope === 'LINE')
const files = ref<RegisteredFile[]>(initialCases.files)
const uploading = ref(false)
const carrierFiles = computed(() => files.value.filter(f => f.carrier === carrier.value))
const chosen = ref<string[]>([])
const electronic = ref(true)
const method = ref(false)
const selectedId = ref(requests.value[0]?.id || '')
const query = ref('')
const statusFilter = ref('')
const paymentFilter = ref('')
const organizationFilter = ref('')
const filterOpen = ref(false)
const currentPage = ref(1)
const rowsPerPage = ref(10)
const filterCount = computed(() => Number(Boolean(paymentFilter.value)) + Number(Boolean(organizationFilter.value)))
const organizationOptions = computed(() => [...new Set(requests.value.map(r => r.carrier))])
const filtered = computed(() => requests.value.filter(r =>
  (!statusFilter.value || r.status === statusFilter.value) &&
  (!paymentFilter.value || label(r.payment) === paymentFilter.value) &&
  (!organizationFilter.value || r.carrier === organizationFilter.value) &&
  [r.id, r.sourceId, r.carrier, r.paymentId || ''].some(value => value.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / rowsPerPage.value)))
const paginatedRequests = computed(() => filtered.value.slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value))
const rangeStart = computed(() => filtered.value.length ? (currentPage.value - 1) * rowsPerPage.value + 1 : 0)
const rangeEnd = computed(() => Math.min(currentPage.value * rowsPerPage.value, filtered.value.length))
watch([query, statusFilter, paymentFilter, organizationFilter, rowsPerPage], () => { currentPage.value = 1 })
watch(totalPages, pages => { currentPage.value = Math.min(currentPage.value, pages) })
const statusDots: Record<string, string> = { RECEIVED: 'bg-blue-500', APPROVED: 'bg-emerald-500', CANCELLED: 'bg-red-500' }
const statusTabs = computed(() => [
  { label: 'Barchasi', value: 'all', count: requests.value.length, dotClass: 'bg-muted-foreground' },
  ...requestStatuses.map(s => ({ label: s.name, value: s.code, count: requests.value.filter(r => r.status === s.code).length, dotClass: statusDots[s.code] })),
])
const summaryCards = computed(() => [
  { label: 'Jami buyurtmanomalar', count: requests.value.length, icon: ListChecks, tone: 'text-primary bg-primary/10', status: '', payment: '' },
  { label: 'Tasdiqlash kutilmoqda', count: requests.value.filter(r => r.status === 'RECEIVED').length, icon: Clock3, tone: 'text-blue-600 bg-blue-500/10', status: 'RECEIVED', payment: '' },
  { label: 'Tasdiqlandi', count: requests.value.filter(r => r.status === 'APPROVED').length, icon: CircleCheck, tone: 'text-emerald-600 bg-emerald-500/10', status: 'APPROVED', payment: '' },
  { label: 'Bekor qilindi', count: requests.value.filter(r => r.status === 'CANCELLED').length, icon: CircleAlert, tone: 'text-red-600 bg-red-500/10', status: 'CANCELLED', payment: '' },
])
function clearFilters() { query.value = ''; statusFilter.value = ''; paymentFilter.value = ''; organizationFilter.value = ''; currentPage.value = 1 }
function selectSummary(card: typeof summaryCards.value[number]) { clearFilters(); statusFilter.value = card.status; paymentFilter.value = card.payment }
function statusClass(code: string) {
  if (code === 'CANCELLED') return 'border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300'
  return ({ RECEIVED: 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300', APPROVED: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', NOT_SENT: 'border-border bg-muted text-muted-foreground', PROCESSING: 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300', PAID: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', FAILED: 'border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300' } as Record<string, string>)[code] || 'border-border text-muted-foreground'
}
const selected = computed(() => requests.value.find(r => r.id === selectedId.value))
watch(selectedId, () => { method.value = false })
const draftTickets = computed(() => draftDemoTickets.value.length ? draftDemoTickets.value : props.tickets)
const available = computed(() => ticketsFilled.value ? latestTickets(draftTickets.value).filter(t => t.carrier === carrier.value && t.transportMode === transportMode.value && draftTickets.value.some(e => e.ticketId === t.ticketId && eventMonth(e.occurredAt) === period.value)) : [])
watch([carrier, period, transportMode], () => { ticketsFilled.value = false; chosen.value = []; documents.value = []; lineDocuments.value = {}; expandedTicket.value = ''; message.value = '' }, { flush: 'sync' })
watch(carrier, () => { documents.value = []; lineDocuments.value = {}; expandedTicket.value = '' })
const total = computed(() => available.value.filter(t => chosen.value.includes(t.ticketId)).reduce((s, t) => s + t.compensationRequested, 0))
const money = (n: number) => `${new Intl.NumberFormat('uz-UZ').format(n)} so‘m`
const now = () => new Date().toISOString()
const label = (code: string) => [...requestStatuses, ...paymentStatuses].find(s => s.code === (['NEEDS_CORRECTION', 'VALIDATED'].includes(code) ? normalizeRequestStatus(code) : code))?.name || code
const date = (value: string) => new Date(value).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
function log(r: ReimbursementRequest, text: string) { r.history.push({ at: now(), text }) }
function notify(r: ReimbursementRequest) { r.notifications.push({ at: now(), status: `${r.status} / ${r.payment}` }) }
function loadCases() {
  const fixtures = createReimbursementCases()
  const added = fixtures.requests.filter(r => !requests.value.some(existing => existing.id === r.id))
  files.value.push(...fixtures.files.filter(f => !files.value.some(existing => existing.id === f.id)))
  requests.value.push(...added)
  clearFilters()
  selectedId.value = fixtures.requests[0]!.id
  message.value = added.length ? `${added.length} ta sinov holati qo‘shildi.` : 'Sinov holatlari allaqachon mavjud.'
}
function checkLines(r: ReimbursementRequest) {
  return validateLines(r, r.demoTickets || props.tickets, requests.value.filter(other => Boolean(other.demoCase) === Boolean(r.demoCase)))
}
function startNew() {
  message.value = ''
  ticketsFilled.value = false
  transportMode.value = ''
  period.value = ''
  chosen.value = []; lineDocuments.value = {}; expandedTicket.value = ''
  if (draftDemoTickets.value.length) {
    draftDemoTickets.value = []
    carrier.value = ''
    documents.value = []; lineDocuments.value = {}; chosen.value = []; expandedTicket.value = ''
    sourceId.value = `BUY-${period.value}-${String(requests.value.length + 1).padStart(3, '0')}`
  }
}
function fillTickets() {
  if (!carriers.value.some(c => c.label === carrier.value) || !transportMode.value || !/^\d{4}-(0[1-9]|1[0-2])$/.test(period.value)) {
    message.value = 'Transport tashkiloti, transport turi va oyni tanlang.'
    return
  }
  ticketsFilled.value = true
  message.value = ''
}
function registerFile(name: string, size: number, sample: boolean, typeCode: string) {
  const record: RegisteredFile = { id: `FILE-${crypto.randomUUID()}`, name, size, carrier: carrier.value, uploadedAt: now(), sample, typeCode }
  files.value.unshift(record); return record.id
}
function sampleDocuments() {
  if (!ticketsFilled.value || !available.value.length) return
  if (!chosen.value.length && available.value[0]) chosen.value = [available.value[0].ticketId]
  const refs = documentTypes.map(t => ({ type: { id: t.id, code: t.code }, file_id: registerFile(`namuna-${t.code.toLowerCase()}.pdf`, 0, true, t.code) }))
  documents.value = [refs[2]!]
  chosen.value.forEach((id, i) => { lineDocuments.value[id] = [{ ...refs[0]!, page: i + 1 }, ...(electronic.value ? [{ ...refs[1]! }] : [])] })
  message.value = 'Namunaviy hujjatlar buyurtmanomaga biriktirildi.'
}
async function upload(type: typeof documentTypes[number], uploadedFiles: File[], ticketId?: string) {
  uploading.value = true
  try {
    for (const file of uploadedFiles) {
      if (!file.size || !type.extensions.some(ext => file.name.toLowerCase().endsWith('.' + ext))) { message.value = 'Fayl bo‘sh yoki kengaytmasi mos emas.'; continue }
      const doc: RequestDocument = { type: { id: type.id, code: type.code }, file_id: registerFile(file.name, file.size, false, type.code) }
      if (ticketId) lineDocuments.value[ticketId] = [...(lineDocuments.value[ticketId] || []), doc]
      else documents.value.push(doc)
      message.value = `${type.name}: fayl biriktirildi.`
    }
  } finally { uploading.value = false }
}
function documentsValid(r: ReimbursementRequest): boolean {
  const valid = (d: RequestDocument) => files.value.some(f => f.id === d.file_id && f.carrier === r.carrier && (!f.typeCode || f.typeCode === d.type.code) && (d.page === undefined || (Number.isSafeInteger(d.page) && d.page > 0 && f.name.toLowerCase().endsWith('.pdf'))))
  return r.documents.some(d => d.type.code === 'COST_CALCULATION') && r.documents.every(valid) && r.lines.every(l => {
    const docs = l.documents || []
    return docs.some(d => d.type.code === 'TICKET_COPY') && (!r.electronicTickets || docs.some(d => d.type.code === 'ROUTE_SHEET')) && docs.every(valid)
  })
}
function submit() {
  message.value = ''
  if (uploading.value) { message.value = 'Fayl yuklanishi tugashini kuting.'; return }
  if (!ticketsFilled.value) { message.value = 'Transport turi va oyni tanlab, «To‘ldirish» tugmasini bosing.'; return }
  if (!carriers.value.some(c => c.label === carrier.value)) { message.value = 'Tanlangan transport turiga mos tashkilotni tanlang.'; return }
  if (!carrier.value || !/^\d{4}-(0[1-9]|1[0-2])$/.test(period.value) || !sourceId.value.trim() || !/^\d{20}$/.test(account.value)) { message.value = 'Tashuvchi, davr, buyurtmanoma raqami va 20 xonali hisobvaraqni kiriting.'; return }
  if (!chosen.value.length) { message.value = 'Chiptalarni tanlang.'; return }
  const existing = requests.value.find(r => r.carrier === carrier.value && r.sourceId === sourceId.value.trim())
  if (existing) { selectedId.value = existing.id; message.value = 'Bu raqamli buyurtmanoma avval qabul qilingan.'; return }
  const id = `REQ-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  const request: ReimbursementRequest = { id, sourceId: sourceId.value.trim(), carrier: carrier.value, period: period.value, account: account.value,
    carrierCode: carriers.value.find(c => c.label === carrier.value)?.code || undefined, transportMode: transportMode.value,
    ...(draftDemoTickets.value.length ? { demoCase: 'Tuzatilgan sinov buyurtmanomasi', demoTickets: JSON.parse(JSON.stringify(draftDemoTickets.value)) } : {}),
    documents: structuredClone(JSON.parse(JSON.stringify(documents.value))), electronicTickets: electronic.value, lines: available.value.filter(t => chosen.value.includes(t.ticketId)).map(t => ({ ticketId: t.ticketId, requested: t.compensationRequested, documents: JSON.parse(JSON.stringify(lineDocuments.value[t.ticketId] || [])) })),
    status: 'RECEIVED', payment: 'NOT_SENT', receivedAt: now(), approvedAmount: 0, history: [{ at: now(), text: 'Buyurtmanoma qabul qilindi' }], notifications: [] }
  if (!documentsValid(request)) { message.value = 'Umumiy hisob-kitob va har bir tanlangan chipta hujjatlarini tekshiring. PDF sahifasi musbat butun son bo‘lishi kerak.'; return }
  requests.value.unshift(request)
  selectedId.value = id; message.value = `Buyurtmanoma qabul qilindi: ${id}`
  createOpen.value = false
  documents.value = []; lineDocuments.value = {}; chosen.value = []; expandedTicket.value = ''
  sourceId.value = `BUY-${period.value}-${String(requests.value.length + 1).padStart(3, '0')}`
  if (draftDemoTickets.value.length) carrier.value = ''
  draftDemoTickets.value = []
}
function check() {
  const r = selected.value; if (!r || !canApprove(r)) return false
  r.lines = checkLines(r)
  const valid = documentsValid(r) && r.lines.length > 0 && !r.lines.some(l => l.error)
  const result = !documentsValid(r) ? 'Hujjatlar yetishmaydi yoki mos emas.' : r.lines.some(l => l.error) ? 'Chipta ma’lumotlari mos emas.' : !r.lines.length ? 'Chiptalar kiritilmagan.' : 'Chiptalar va hujjatlar mos.'
  r.validation = { valid, checkedAt: now(), message: result }
  if (!valid) message.value = `${result} Buyurtmanomani tasdiqlab bo‘lmaydi.`
  return valid
}
function approve() {
  const r = selected.value; if (!r || !canApprove(r) || !method.value || !check()) return
  r.approvedAmount = r.lines.reduce((s, l) => s + l.requested, 0)
  r.status = 'APPROVED'
  log(r, 'Tekshiruvchi summani va bank hisob raqamini tasdiqladi (sinov)')
  notify(r)
  r.paymentId = `SUB-${crypto.randomUUID().toUpperCase()}`
  r.payment = 'PROCESSING'
  log(r, 'Tasdiqlangan buyurtmanoma avtomatik to‘lovga yuborildi (sinov)')
  notify(r)
  detailsOpen.value = false
  message.value = 'Buyurtmanoma tasdiqlandi va avtomatik to‘lovga yuborildi (sinov).'
}
function canApprove(r: ReimbursementRequest) {
  return r.status === 'RECEIVED' && r.payment === 'NOT_SENT'
}
function requestModeLabel(r: ReimbursementRequest) {
  const events = r.demoTickets || props.tickets
  const modes = r.transportMode ? [r.transportMode] : [...new Set(events.filter(t => r.lines.some(l => l.ticketId === t.ticketId)).map(t => t.transportMode))]
  if (!modes.length) {
    const organization = organizations.value.find(c => c.label === r.carrier)
    if (organization?.transportMode) modes.push(organization.transportMode)
  }
  return modes.map(code => transportModeOptions.find(m => m.code === code)?.label || code).join(', ') || 'Ko‘rsatilmagan'
}
function canCancel(r: ReimbursementRequest) {
  return r.status !== 'CANCELLED' && r.payment === 'NOT_SENT'
}
function viewRequest(r: ReimbursementRequest) {
  selectedId.value = r.id
  method.value = false
  message.value = ''
  detailsOpen.value = true
  approvalMode.value = false
}
async function beginApproval(r: ReimbursementRequest) {
  if (!canApprove(r)) return
  viewRequest(r)
  approvalMode.value = true
  await nextTick()
  check()
}
function beginCancellation(r: ReimbursementRequest) {
  if (!canCancel(r)) return
  selectedId.value = r.id
  cancelReason.value = ''
  message.value = ''
  cancelOpen.value = true
}
function cancelRequest() {
  const r = selected.value
  if (!r || !canCancel(r)) return
  r.status = 'CANCELLED'
  r.approvedAmount = 0
  log(r, 'Buyurtmanoma bekor qilindi' + (cancelReason.value.trim() ? ': ' + cancelReason.value.trim() : ''))
  notify(r)
  cancelOpen.value = false
  message.value = 'Buyurtmanoma bekor qilindi.'
}
</script>

<template>
  <div class="min-w-0 space-y-3">
    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <button v-for="card in summaryCards" :key="card.label" type="button" class="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" @click="selectSummary(card)">
        <span :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', card.tone]"><component :is="card.icon" class="h-5 w-5" /></span>
        <span><span class="block text-sm text-muted-foreground">{{ card.label }}</span><span class="mt-1 block text-2xl font-semibold text-foreground">{{ card.count }}</span></span>
      </button>
    </div>
    <DialogRoot v-model:open="createOpen">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div class="relative w-full lg:max-w-sm"><Search class="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input v-model="query" class="pl-9" placeholder="Qidirish" aria-label="Buyurtmanomalarni qidirish" /></div>
        <div class="flex flex-wrap items-center gap-2">
          <FilterPopover v-model:open="filterOpen" :active-count="filterCount">
            <FilterSelect v-model="organizationFilter" label="Transport tashkiloti" :options="organizationOptions" />
            <FilterSelect v-model="paymentFilter" label="To‘lov holati" :options="paymentStatuses.map(s => s.name)" />
            <template #footer><div class="flex justify-end gap-2 border-t border-border pt-3"><Button variant="outline" size="sm" :disabled="!filterCount" @click="organizationFilter = ''; paymentFilter = ''">Tozalash</Button><Button size="sm" @click="filterOpen = false">Qo‘llash</Button></div></template>
          </FilterPopover>
          <Button variant="outline" size="sm" class="h-7" @click="loadCases">Sinov holatlari</Button>
          <DialogTrigger as-child><Button size="sm" class="h-7 gap-1.5" @click="startNew"><Plus class="h-4 w-4" />Yaratish</Button></DialogTrigger>
        </div>
      </div>
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
        <DialogContent class="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border bg-background shadow-xl">
          <div class="flex items-center justify-between gap-3 border-b px-5 py-4">
            <DialogTitle class="font-semibold">Yangi buyurtmanoma</DialogTitle>
            <DialogClose as-child><Button variant="ghost" size="sm" aria-label="Dialogni yopish">✕</Button></DialogClose>
          </div>
          <DialogDescription class="sr-only">Hisobot oyini kiriting, chiptalarni tanlang va hujjatlarni yuklang.</DialogDescription>
          <div class="min-h-0 overflow-y-auto p-5 space-y-4">
            <p class="text-xs text-muted-foreground">Sinov nusxasi: haqiqiy to‘lov amalga oshirilmaydi. Kiritilgan ma’lumotlar sahifa yangilanganda yo‘qoladi.</p>
            <form class="space-y-4" @submit.prevent="submit">
              <fieldset :disabled="uploading" class="space-y-4 min-w-0">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label class="text-sm space-y-1 block">Transport turi<select v-model="transportMode" aria-label="Transport turi" class="w-full rounded-md border bg-background p-2"><option value="" disabled>Tanlang</option><option v-for="mode in transportModeOptions" :key="mode.code" :value="mode.code">{{ mode.label }}</option></select></label>
        <label class="text-sm space-y-1 block">Transport tashkiloti<select v-model="carrier" aria-label="Transport tashkiloti" :disabled="!transportMode" class="w-full rounded-md border bg-background p-2 disabled:opacity-50"><option value="" disabled>Tanlang</option><option v-for="c in carriers" :key="c.code + c.label" :value="c.label">{{ c.label }}</option></select></label>
        <label class="text-sm space-y-1 block">Hisobot oyi<Input v-model="period" type="month" /></label>
        <label class="text-sm space-y-1 block">Buyurtmanoma raqami<Input v-model="sourceId" /></label>
        <label class="text-sm space-y-1 block">Bank hisob raqami<Input v-model="account" maxlength="20" inputmode="numeric" /></label>
      </div>
      <div class="flex flex-wrap items-center gap-3"><Button :disabled="!carrier || !transportMode || !period || uploading" @click="fillTickets">To‘ldirish</Button><label class="text-sm"><input v-model="electronic" type="checkbox" /> Elektron yo‘lkira hujjatlari</label><template v-if="ticketsFilled && available.length"><Button variant="outline" size="sm" @click="sampleDocuments">Namunaviy hujjatlarni tanlash</Button><Button variant="outline" size="sm" @click="chosen = available.map(t => t.ticketId)">Barcha chiptalarni tanlash</Button></template></div>
      <div class="max-w-lg"><RequestFileField v-model="documents" :files="carrierFiles" :type="costType" label="Buyurtmanoma hisob-kitobi" required :disabled="uploading" @upload="upload(costType, $event)" /></div>
      <div v-if="ticketsFilled" class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-muted text-left"><tr><th class="p-2">Tanlash</th><th>Chipta / yo‘nalish</th><th>Holat</th><th>Amaldagi narx</th><th>Imtiyozli narx</th><th>Qoplash summasi</th><th>Hujjatlar</th></tr></thead><tbody><template v-for="t in available" :key="t.ticketId"><tr class="border-b"><td class="p-2"><input v-model="chosen" type="checkbox" :value="t.ticketId" :aria-label="t.ticketId + 'ni tanlash'" /></td><td class="p-2">{{ t.ticketId }}<p class="text-xs text-muted-foreground">{{ t.route }}</p></td><td>{{ userLabel(t.ticketState) }}</td><td>{{ money(t.amount) }}</td><td>{{ money(t.preferentialAmount) }}</td><td>{{ money(t.compensationRequested) }}</td><td class="p-2"><Button size="sm" variant="outline" :disabled="!chosen.includes(t.ticketId)" :aria-label="t.ticketId + ' hujjatlari'" @click="expandedTicket = expandedTicket === t.ticketId ? '' : t.ticketId">Hujjatlar ({{ lineDocuments[t.ticketId]?.length || 0 }})</Button></td></tr><tr v-if="expandedTicket === t.ticketId && chosen.includes(t.ticketId)"><td colspan="7" class="bg-muted/20 p-3"><div class="grid gap-3 md:grid-cols-2"><RequestFileField v-for="type in lineTypes" :key="type.code" :model-value="lineDocuments[t.ticketId] || []" :files="carrierFiles" :type="type" :label="t.ticketId + ' ' + type.name" :required="type.code === 'TICKET_COPY' || electronic" :disabled="uploading" @update:model-value="lineDocuments[t.ticketId] = $event" @upload="upload(type, $event, t.ticketId)" /></div></td></tr></template><tr v-if="!available.length"><td colspan="7" class="p-4 text-muted-foreground">Tanlangan transport turi va oy bo‘yicha chipta topilmadi.</td></tr></tbody></table></div>
              </fieldset>
      <div class="flex flex-wrap justify-between items-center gap-3 border-t pt-4"><p class="font-medium">Jami: {{ money(total) }}</p><div class="flex gap-2"><DialogClose as-child><Button type="button" variant="outline">Bekor qilish</Button></DialogClose><Button type="submit" :disabled="uploading || !ticketsFilled || !chosen.length">Buyurtmanomani yuborish</Button></div></div>
      <p v-if="message" role="status" class="text-sm text-primary">{{ message }}</p>
            </form>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
    <p v-if="message && !createOpen && !detailsOpen && !cancelOpen" role="status" class="text-sm text-primary">{{ message }}</p>
    <StatusTabs :tabs="statusTabs" :selected-values="statusFilter ? [statusFilter] : []" item-key-prefix="transport-request-status" @select="statusFilter = $event === 'all' ? '' : $event" />
    <section class="min-w-0 overflow-hidden rounded-lg border border-border bg-card">
      <div class="relative max-h-[60vh] min-h-[22rem] overflow-auto overscroll-contain">
        <table class="w-full min-w-[64rem] border-separate border-spacing-0 text-sm text-left">
          <thead class="sticky top-0 z-10 bg-card text-left text-muted-foreground"><tr><th v-for="heading in ['Buyurtmanoma', 'Oy', 'Transport turi', 'Transport tashkiloti', 'So‘ralgan summa', 'Tasdiqlangan summa', 'Holat', 'To‘lov', 'Amallar']" :key="heading" class="h-10 whitespace-nowrap border-b border-border px-2 text-left align-middle text-sm font-medium text-foreground">{{ heading }}</th></tr></thead>
          <tbody>
            <tr v-for="r in paginatedRequests" :key="r.id" class="transition-colors duration-200 ease-out hover:bg-muted/30">
              <td class="border-b border-border p-2 align-middle font-medium"><button type="button" class="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" :aria-label="r.sourceId + ' tafsilotlari'" @click="viewRequest(r)">{{ r.sourceId }}</button><time :datetime="r.receivedAt" class="mt-1 block whitespace-nowrap text-xs font-normal text-muted-foreground" title="Kelib tushgan sana va vaqt (Toshkent)">{{ date(r.receivedAt) }}</time></td>
              <td class="border-b border-border p-2 align-middle whitespace-nowrap">{{ r.period }}</td><td class="border-b border-border p-2 align-middle whitespace-nowrap">{{ requestModeLabel(r) }}</td><td class="max-w-80 border-b border-border p-2 align-middle">{{ r.carrier }}</td>
              <td class="border-b border-border p-2 align-middle whitespace-nowrap">{{ money(r.lines.reduce((sum, line) => sum + line.requested, 0)) }}</td>
              <td class="border-b border-border p-2 align-middle whitespace-nowrap">{{ money(r.approvedAmount) }}</td>
              <td class="border-b border-border p-2 align-middle"><span :class="['inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium', statusClass(r.status)]">{{ label(r.status) }}</span></td>
              <td class="border-b border-border p-2 align-middle"><span :class="['inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium', statusClass(r.payment)]">{{ label(r.payment) }}</span></td>
              <td class="w-24 border-b border-border p-2 align-middle">
                <DropdownMenuRoot>
                  <DropdownMenuTrigger as-child><Button variant="outline" size="sm" class="h-7 w-7 rounded-md p-0" :aria-label="r.sourceId + ' amallari'"><Ellipsis class="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent side="bottom" align="end" :side-offset="6" :collision-padding="12" class="z-50 min-w-40 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none">
                      <DropdownMenuItem :class="menuItemClass" @select="viewRequest(r)"><Eye class="h-4 w-4 shrink-0" />Ko‘rish</DropdownMenuItem>
                      <DropdownMenuItem :disabled="!canApprove(r)" :class="[menuItemClass, 'data-[disabled]:pointer-events-none data-[disabled]:opacity-40']" @select="beginApproval(r)"><CircleCheck class="h-4 w-4 shrink-0" />Tasdiqlash</DropdownMenuItem>
                      <DropdownMenuItem :disabled="!canCancel(r)" :class="[menuItemClass, 'text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-40']" @select="beginCancellation(r)"><X class="h-4 w-4 shrink-0" />Bekor qilish</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenuRoot>
              </td>
            </tr>
            <tr v-if="!paginatedRequests.length"><td colspan="9" class="px-6 py-16 text-center text-muted-foreground">Ma’lumot topilmadi</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap items-center gap-3"><label class="inline-flex items-center gap-2"><span>Qatorlar soni</span><select v-model.number="rowsPerPage" aria-label="Qatorlar soni" class="h-8 rounded-md border border-border bg-background px-2 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"><option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option></select></label><span>Sahifada: <strong class="font-semibold text-foreground">{{ rangeStart }}-{{ rangeEnd }} / {{ filtered.length }}</strong></span></div>
      <div class="flex items-center gap-2"><Button variant="ghost" size="sm" class="gap-2" @click="clearFilters"><RotateCcw class="h-4 w-4" />Tiklash</Button><nav aria-label="Buyurtmanomalar sahifalari" class="flex h-8 items-center rounded-lg border border-border bg-background px-1">
        <Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="currentPage === 1" aria-label="Birinchi sahifa" @click="currentPage = 1"><ChevronsLeft class="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="currentPage === 1" aria-label="Oldingi sahifa" @click="currentPage--"><ChevronLeft class="h-4 w-4" /></Button>
        <span aria-live="polite" class="min-w-14 px-2 text-center font-semibold text-foreground">{{ currentPage }}/{{ totalPages }}</span>
        <Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="currentPage === totalPages" aria-label="Keyingi sahifa" @click="currentPage++"><ChevronRight class="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="currentPage === totalPages" aria-label="Oxirgi sahifa" @click="currentPage = totalPages"><ChevronsRight class="h-4 w-4" /></Button>
      </nav></div>
    </div>
    <DialogRoot v-model:open="cancelOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
        <DialogContent class="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-5 shadow-xl">
          <DialogTitle class="font-semibold">Buyurtmanomani bekor qilish</DialogTitle>
          <DialogDescription class="mt-2 text-sm text-muted-foreground">{{ selected?.sourceId }} bekor qilinsinmi? Ma’lumotlar va jarayon tarixi saqlanadi.</DialogDescription>
          <form class="mt-4 space-y-4" @submit.prevent="cancelRequest">
            <label class="block text-sm space-y-2"><span>Sabab (ixtiyoriy)</span><Input v-model="cancelReason" maxlength="500" /></label>
            <div class="flex justify-end gap-2"><DialogClose as-child><Button variant="outline">Ortga</Button></DialogClose><Button type="submit" variant="destructive">Bekor qilish</Button></div>
          </form>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
    <DialogRoot v-model:open="detailsOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
        <DialogContent class="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border bg-background shadow-xl">
          <div class="flex items-center justify-between gap-3 border-b px-5 py-4">
            <DialogTitle class="font-semibold">Buyurtmanoma tafsilotlari</DialogTitle>
            <DialogClose as-child><Button variant="ghost" size="sm" aria-label="Tafsilotlarni yopish">✕</Button></DialogClose>
          </div>
          <DialogDescription class="sr-only">Buyurtmanoma hujjatlari, chiptalari va jarayon tarixi.</DialogDescription>
    <section v-if="selected" class="min-h-0 overflow-y-auto p-5 space-y-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <div><p class="text-xs text-muted-foreground">Buyurtmanoma raqami</p><p class="mt-1 font-semibold">{{ selected.sourceId }}</p><p class="mt-1 text-xs text-muted-foreground">ID: {{ selected.id }}</p></div>
        <div><p class="text-xs text-muted-foreground">Kelib tushgan vaqt</p><p class="mt-1 text-sm font-medium">{{ date(selected.receivedAt) }}</p></div>
        <div><p class="text-xs text-muted-foreground">Transport tashkiloti</p><p class="mt-1 text-sm font-medium">{{ selected.carrier }}</p></div>
        <div><p class="text-xs text-muted-foreground">Transport turi</p><p class="mt-1 text-sm font-medium">{{ requestModeLabel(selected) }}</p></div>
        <div><p class="text-xs text-muted-foreground">Hisobot oyi</p><p class="mt-1 text-sm font-medium">{{ selected.period }}</p></div>
        <div><p class="text-xs text-muted-foreground">Bank hisob raqami</p><p class="mt-1 text-sm font-medium">{{ selected.account }}</p></div>
        <div><p class="text-xs text-muted-foreground">So‘ralgan summa</p><p class="mt-1 text-sm font-medium">{{ money(selected.lines.reduce((sum, line) => sum + line.requested, 0)) }}</p></div>
        <div><p class="text-xs text-muted-foreground">Tasdiqlangan summa</p><p class="mt-1 text-sm font-medium">{{ money(selected.approvedAmount) }}</p></div>
        <div><p class="text-xs text-muted-foreground">Buyurtmanoma holati</p><span :class="['mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', statusClass(selected.status)]">{{ label(selected.status) }}</span></div>
        <div><p class="text-xs text-muted-foreground">To‘lov holati</p><span :class="['mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', statusClass(selected.payment)]">{{ label(selected.payment) }}</span></div>
      </div>
      <div><h3 class="text-sm font-semibold">Buyurtmanoma hujjatlari</h3><p v-for="doc in selected.documents" :key="doc.file_id" class="mt-2 text-sm">{{ documentTypes.find(type => type.code === doc.type.code)?.name }}: {{ files.find(file => file.id === doc.file_id)?.name || 'Fayl topilmadi' }}</p><p v-if="!selected.documents.length" class="mt-2 text-sm text-muted-foreground">Hujjat biriktirilmagan.</p></div>
      <h3 class="text-sm font-semibold">Chiptalar ({{ selected.lines.length }})</h3>
      <div v-for="l in selected.lines" :key="l.ticketId" class="rounded border p-3 text-sm"><div class="flex justify-between gap-3"><span>{{ l.ticketId }} · {{ money(l.requested) }}</span><span :class="l.error ? 'text-destructive' : 'text-primary'">{{ l.error || (selected.validation?.valid || selected.status === 'APPROVED' ? 'Mos' : 'Tekshirilmagan') }}</span></div><p v-for="doc in l.documents" :key="doc.type.code + doc.file_id" class="mt-2 text-xs text-muted-foreground">{{ documentTypes.find(t => t.code === doc.type.code)?.name }}: {{ files.find(f => f.id === doc.file_id)?.name || doc.file_id }}<span v-if="doc.page"> · {{ doc.page }}-sahifa</span></p><p v-if="!l.documents?.length" class="mt-2 text-xs text-amber-700">Qatorga hujjat biriktirilmagan.</p></div>
      <div v-if="approvalMode && canApprove(selected)" class="space-y-3">
        <p v-if="selected.validation" :class="['text-sm', selected.validation.valid ? 'text-primary' : 'text-destructive']">{{ selected.validation.message }}</p>
        <label class="block text-sm"><input v-model="method" type="checkbox" :disabled="!selected.validation?.valid" /> Chiptalar va hujjatlarni tekshirdim, bank hisob raqami shu tashkilotga tegishli</label>
        <Button :disabled="!method || !selected.validation?.valid" @click="approve">Tasdiqlash</Button>
      </div>
      <p v-if="selected.paymentId" class="text-sm">To‘lov raqami: <span class="font-mono">{{ selected.paymentId }}</span> · {{ label(selected.payment) }}<span v-if="selected.paidAt"> · {{ date(selected.paidAt) }} · {{ selected.paymentDocument }}</span></p>
      <div class="grid gap-4 md:grid-cols-2"><div><h3 class="text-sm font-semibold">Jarayon tarixi</h3><p v-for="(h,i) in selected.history" :key="i" class="mt-2 text-xs text-muted-foreground">{{ date(h.at) }} · {{ h.text }}</p></div><div><h3 class="text-sm font-semibold">Tashkilotga yuborilgan xabarlar (sinov)</h3><p v-for="(n,i) in selected.notifications" :key="i" class="mt-2 text-xs text-muted-foreground">{{ date(n.at) }} · {{ n.status.split(' / ').map(label).join(' / ') }}</p><p v-if="!selected.notifications.length" class="mt-2 text-xs text-muted-foreground">Hali xabarnoma yo‘q.</p></div></div>
    </section>

          <p v-if="message" role="status" class="px-5 pb-4 text-sm text-primary">{{ message }}</p>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>
