<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { Button } from '@/shared/ui/shadcn/button'
import { Input } from '@/shared/ui/shadcn/input'
import { userLabel } from '../ui-labels'
import { requestStatuses, paymentStatuses, documentTypes, latestTickets, eventMonth, validateLines, type ReimbursementRequest, type ReimbursementTicket, type PaymentStatus, type RegisteredFile } from '../reimbursement'

const props = defineProps<{ tickets: ReimbursementTicket[] }>()
const key = 'transport-reimbursements-demo-v1'
function restore(): ReimbursementRequest[] {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(data) ? data.filter(r => r.id && Array.isArray(r.lines) && Array.isArray(r.history) && Array.isArray(r.notifications)).map(r => ({ ...r, documents: (r.documents || []).map((d: string | object, i: number) => typeof d === 'string' ? { type: { id: documentTypes[i]?.id || 3, code: documentTypes[i]?.code || 'COST_CALCULATION' }, file_id: d } : d) })) : []
  } catch { return [] }
}
const requests = ref<ReimbursementRequest[]>(restore())
watch(requests, value => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { message.value = 'Brauzer xotirasiga saqlab bo‘lmadi.' } }, { deep: true })
const message = ref('')
const carriers = computed(() => [...new Set(props.tickets.map(t => t.carrier))])
const carrier = ref(carriers.value[0] || '')
const period = ref('2026-10')
const sourceId = ref('BUY-2026-10-001')
const account = ref('20208000000000000001')
const documents = ref(['', '', ''])
const filesKey = 'transport-reimbursement-files-demo-v1'
function restoreFiles(): RegisteredFile[] { try { const data = JSON.parse(localStorage.getItem(filesKey) || '[]'); return Array.isArray(data) ? data.filter(f => f.id && f.name && f.carrier) : [] } catch { return [] } }
const files = ref<RegisteredFile[]>(restoreFiles())
const uploading = ref(false)
watch(files, value => { try { localStorage.setItem(filesKey, JSON.stringify(value)) } catch { message.value = 'Fayllar ro‘yxatini saqlab bo‘lmadi.' } }, { deep: true })
const carrierFiles = computed(() => files.value.filter(f => f.carrier === carrier.value))
const requestPayload = computed(() => JSON.stringify({ source_request_id: sourceId.value, period: period.value, bank_account: account.value, documents: documents.value.flatMap((file_id, i) => file_id ? [{ type: { id: documentTypes[i]!.id, code: documentTypes[i]!.code }, file_id }] : []), lines: available.value.filter(t => chosen.value.includes(t.ticketId)).map(t => ({ ticket_id: t.ticketId, requested_amount: t.compensationRequested })) }, null, 2))
const chosen = ref<string[]>([])
const electronic = ref(true)
const method = ref(false)
const selectedId = ref(requests.value[0]?.id || '')
const query = ref('')
const queryResult = ref('')
const foundRequest = ref<ReimbursementRequest | null>(null)
const statusFilter = ref('')
const filtered = computed(() => requests.value.filter(r => !statusFilter.value || r.status === statusFilter.value || r.payment === statusFilter.value))
const selected = computed(() => requests.value.find(r => r.id === selectedId.value))
watch(selectedId, () => { method.value = false })
const available = computed(() => latestTickets(props.tickets).filter(t => t.carrier === carrier.value && props.tickets.some(e => e.ticketId === t.ticketId && eventMonth(e.occurredAt) === period.value)))
watch([carrier, period], () => { chosen.value = [] })
watch(carrier, () => { documents.value = ['', '', ''] })
const total = computed(() => available.value.filter(t => chosen.value.includes(t.ticketId)).reduce((s, t) => s + t.compensationRequested, 0))
const money = (n: number) => `${new Intl.NumberFormat('uz-UZ').format(n)} so‘m`
const now = () => new Date().toISOString()
const label = (code: string) => [...requestStatuses, ...paymentStatuses].find(s => s.code === code)?.name || code
const date = (value: string) => new Date(value).toLocaleString('uz-UZ')
function log(r: ReimbursementRequest, text: string) { r.history.push({ at: now(), text }) }
function notify(r: ReimbursementRequest) { r.notifications.push({ at: now(), status: `${r.status} / ${r.payment}` }) }
function registerFile(name: string, size: number, sample: boolean) {
  const record: RegisteredFile = { id: `FILE-${crypto.randomUUID()}`, name, size, carrier: carrier.value, uploadedAt: now(), sample }
  files.value.unshift(record); return record.id
}
function sampleDocuments() {
  documents.value = ['namuna-chip ta-nusxalari.pdf'.replace(' ', ''), 'namuna-yonalish-qaydnomasi.pdf', 'namuna-hisob-kitob.xlsx'].map(name => registerFile(name, 0, true))
  message.value = 'Namunaviy fayllar alohida yaratildi va raqamlari buyurtmanomaga biriktirildi.'
}
async function upload(event: Event) {
  const input = event.target as HTMLInputElement
  const selectedFiles = Array.from(input.files || [])
  uploading.value = true
  try {
    for (const file of selectedFiles) {
      if (!file.size) { message.value = 'Bo‘sh fayl yuklanmaydi.'; continue }
      registerFile(file.name, file.size, false)
    }
    if (selectedFiles.some(f => f.size > 0)) message.value = 'Fayllar ro‘yxatga olindi. Endi kerakli fayllarni buyurtmanomaga biriktiring.'
  } finally { uploading.value = false; input.value = '' }
}
function documentsValid(r: ReimbursementRequest): boolean {
  return r.documents.every(d => files.value.some(f => f.id === d.file_id && f.carrier === r.carrier))
}
function submit() {
  message.value = ''
  if (!carrier.value || !/^\d{4}-(0[1-9]|1[0-2])$/.test(period.value) || !sourceId.value.trim() || !/^\d{20}$/.test(account.value)) { message.value = 'Tashuvchi, davr, buyurtmanoma raqami va 20 xonali hisobvaraqni kiriting.'; return }
  if (!chosen.value.length || !documents.value[0] || !documents.value[2] || (electronic.value && !documents.value[1])) { message.value = 'Chiptalarni tanlang va majburiy ilovalarni kiriting.'; return }
  if (documents.value.some(id => id && !carrierFiles.value.some(f => f.id === id))) { message.value = 'Biriktirilgan fayl topilmadi yoki boshqa tashkilotga tegishli.'; return }
  const existing = requests.value.find(r => r.carrier === carrier.value && r.sourceId === sourceId.value.trim())
  if (existing) { selectedId.value = existing.id; message.value = 'Bu raqamli buyurtmanoma avval qabul qilingan.'; return }
  const id = `REQ-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  requests.value.unshift({ id, sourceId: sourceId.value.trim(), carrier: carrier.value, period: period.value, account: account.value,
    documents: documents.value.flatMap((file_id, i) => file_id ? [{ type: { id: documentTypes[i]!.id, code: documentTypes[i]!.code }, file_id }] : []), lines: available.value.filter(t => chosen.value.includes(t.ticketId)).map(t => ({ ticketId: t.ticketId, requested: t.compensationRequested })),
    status: 'RECEIVED', payment: 'NOT_SENT', receivedAt: now(), approvedAmount: 0, history: [{ at: now(), text: 'Buyurtmanoma qabul qilindi' }], notifications: [] })
  selectedId.value = id; message.value = `Buyurtmanoma qabul qilindi: ${id}`
}
function check() {
  const r = selected.value; if (!r || r.status === 'APPROVED') return
  if (!documentsValid(r)) { r.status = 'NEEDS_CORRECTION'; message.value = 'Fayllar alohida yuklanmagan yoki shu tashkilotga tegishli emas. Buyurtmanomani tuzating.'; log(r, 'Fayl raqamlarini tekshirishda xatolik'); notify(r); return }
  r.lines = validateLines(r, props.tickets, requests.value)
  r.status = r.lines.some(l => l.error) ? 'NEEDS_CORRECTION' : 'VALIDATED'
  log(r, label(r.status)); notify(r)
}
function approve() {
  const r = selected.value; if (!r || r.status !== 'VALIDATED' || !method.value) return
  if (!documentsValid(r)) { message.value = 'Biriktirilgan fayllarni qayta tekshiring.'; return }
  r.lines = validateLines(r, props.tickets, requests.value)
  if (r.lines.some(l => l.error)) { r.status = 'NEEDS_CORRECTION'; log(r, 'Qayta tekshiruvda nomuvofiqlik topildi'); notify(r); return }
  r.approvedAmount = r.lines.reduce((s, l) => s + l.requested, 0); r.status = 'APPROVED'; log(r, 'Tekshiruvchi summani va bank hisob raqamini tasdiqladi (sinov)'); notify(r)
}
function send() {
  const r = selected.value; if (!r || r.status !== 'APPROVED' || r.payment !== 'NOT_SENT') return
  if (!documentsValid(r)) { message.value = 'Fayllar topilmadi. To‘lovga yuborilmadi.'; return }
  const currentLines = validateLines(r, props.tickets, requests.value)
  if (currentLines.some(l => l.error)) { message.value = 'Tasdiqlangandan keyin chipta ma’lumotlari o‘zgargan. To‘lov yuborilmadi.'; log(r, 'Yuborishdan oldingi tekshiruv to‘lovni to‘xtatdi'); return }
  r.paymentId = `SUB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`; r.payment = 'PROCESSING'; log(r, 'Buyurtmanoma to‘lov tizimiga yuborildi (sinov)'); notify(r)
}
function receive(status: PaymentStatus) {
  const r = selected.value; if (!r || r.payment !== 'PROCESSING') return
  r.payment = status
  if (status === 'PAID') { r.paidAt = now(); r.paymentDocument = `DEMO-PAY-${r.paymentId}` }
  log(r, `Subsidiya moduli javobi: ${label(status)}`); notify(r)
}
function retry() { const r = selected.value; if (!r || r.payment !== 'FAILED') return; r.payment = 'PROCESSING'; log(r, 'Avvalgi to‘lov IDsi bilan demo qayta so‘rov'); notify(r) }
async function correct() {
  const r = selected.value; if (!r || r.status !== 'NEEDS_CORRECTION') return
  carrier.value = r.carrier; period.value = r.period; account.value = r.account; sourceId.value = `${r.sourceId}-TUZATISH`
  await nextTick()
  documents.value = documentTypes.map(type => r.documents.find(d => d.type.code === type.code)?.file_id || '')
  chosen.value = []; message.value = 'Yangi buyurtmanoma uchun yaroqli chiptalarni qayta tanlang. Oldingi natija tarixda saqlanadi.'
}
function lookup() {
  const r = requests.value.find(r => r.id === query.value.trim() || r.paymentId === query.value.trim())
  foundRequest.value = r || null
  queryResult.value = r ? JSON.stringify({ request_id: r.id, source_request_id: r.sourceId, request_status: requestStatuses.find(s => s.code === r.status), payment_status: paymentStatuses.find(s => s.code === r.payment), requested_amount: r.lines.reduce((s,l) => s+l.requested,0), approved_amount: r.approvedAmount, paid_amount: r.payment === 'PAID' ? r.approvedAmount : 0, payment_id: r.paymentId || null, paid_at: r.paidAt || null, payment_document: r.paymentDocument || null }, null, 2) : 'Buyurtmanoma topilmadi.'
}
</script>

<template>
  <div class="space-y-5">
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><strong>Sinov uchun · Chipta xarajatlarini qoplash</strong><p class="mt-1 text-muted-foreground">Buyurtmanomani yuboring, chiptalarni tekshiring va tasdiqlangan summani to‘lovga yuboring. Bu sinov nusxasi: haqiqiy pul o‘tkazilmaydi, fayllar alohida ro‘yxatga olinadi va buyurtmanomaga ularning raqami biriktiriladi. Mahalliy nusxada faylning o‘zi saqlanmaydi.</p><p class="mt-2 text-xs">Chiptalar ro‘yxati keyingi oyning 10-sanasigacha taqdim etiladi. Hujjatlar taqdim etilgach to‘lov muddati — 10 ish kuni. <a class="underline" href="https://lex.uz/docs/8400823#8405929" target="_blank" rel="noreferrer">Nizom 17–18-bandlar</a></p></div>
    <div class="grid gap-3 sm:grid-cols-3"><div class="rounded-xl border bg-card p-4"><p class="text-sm text-muted-foreground">Buyurtmanomalar</p><p class="text-2xl font-semibold">{{ requests.length }}</p></div><div class="rounded-xl border bg-card p-4"><p class="text-sm text-muted-foreground">Tasdiqlangan summa</p><p class="text-xl font-semibold">{{ money(requests.reduce((s,r) => s+r.approvedAmount,0)) }}</p></div><div class="rounded-xl border bg-card p-4"><p class="text-sm text-muted-foreground">To‘langan summa</p><p class="text-xl font-semibold text-primary">{{ money(requests.filter(r => r.payment === 'PAID').reduce((s,r) => s+r.approvedAmount,0)) }}</p></div></div>
    <section class="rounded-xl border bg-card p-5 space-y-3">
      <h2 class="font-semibold">1. Fayllarni alohida yuklash</h2>
      <p class="text-sm text-muted-foreground">Avval transport tashkilotini tanlang, so‘ng hujjatlarni yuklang. Har bir faylga alohida raqam beriladi. Buyurtmanomaga shu raqam biriktiriladi.</p>
      <p class="text-xs">Tanlangan tashkilot: <strong>{{ carrier }}</strong></p>
      <label class="inline-flex cursor-pointer rounded-md border px-3 py-2 text-sm"><span>{{ uploading ? 'Yuklanmoqda…' : 'Fayllarni tanlash' }}</span><input type="file" multiple accept=".pdf,.xlsx,.xls,.png,.jpg,.zip" :disabled="uploading" @change="upload" class="sr-only" /></label>
      <div v-if="carrierFiles.length" class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="bg-muted"><tr><th class="p-2">Fayl nomi</th><th>Fayl raqami</th><th>Hajmi</th></tr></thead><tbody><tr v-for="f in carrierFiles" :key="f.id" class="border-b"><td class="p-2">{{ f.name }}<span v-if="f.sample" class="ml-2 text-xs text-muted-foreground">Namuna</span></td><td class="font-mono text-xs">{{ f.id }}</td><td>{{ f.sample ? 'Namuna' : Math.ceil(f.size / 1024) + ' KB' }}</td></tr></tbody></table></div>
      <p v-else class="text-xs text-muted-foreground">Bu tashkilot uchun fayl yuklanmagan.</p>
    </section>
    <section class="rounded-xl border bg-card p-5 space-y-4">
      <h2 class="font-semibold">2. Yangi oylik buyurtmanoma</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label class="text-sm space-y-1 block">Transport tashkiloti<select v-model="carrier" class="w-full rounded-md border bg-background p-2"><option v-for="c in carriers" :key="c">{{ c }}</option></select></label>
        <label class="text-sm space-y-1 block">Hisobot oyi<Input v-model="period" type="month" /></label>
        <label class="text-sm space-y-1 block">Buyurtmanoma raqami<Input v-model="sourceId" /></label>
        <label class="text-sm space-y-1 block">Bank hisob raqami<Input v-model="account" maxlength="20" inputmode="numeric" /></label>
      </div>
      <div class="flex flex-wrap items-center gap-3"><label class="text-sm"><input v-model="electronic" type="checkbox" /> Elektron yo‘lkira hujjatlari</label><Button variant="outline" size="sm" @click="sampleDocuments">Namunaviy hujjatlarni tanlash</Button><Button variant="outline" size="sm" @click="chosen = available.map(t => t.ticketId)">Barcha chiptalarni tanlash</Button></div>
      <div class="grid gap-3 md:grid-cols-3"><label v-for="(type,i) in documentTypes" :key="type.code" class="block rounded-lg border p-3 text-xs"><p class="mb-2 font-medium">{{ type.name }}</p><select v-model="documents[i]" class="w-full rounded border bg-background p-2" :aria-label="type.name"><option value="">Yuklangan faylni tanlang</option><option v-for="f in carrierFiles" :key="f.id" :value="f.id">{{ f.name }}</option></select><p v-if="documents[i]" class="mt-2 font-mono text-primary break-all">{{ documents[i] }}</p></label></div>
      <details class="text-xs text-muted-foreground"><summary class="cursor-pointer">Dasturchilar uchun buyurtmanoma namunasi</summary><p class="mt-2">POST /v1/files orqali olingan file_id lar POST /v1/reimbursement-requests tarkibida beriladi.</p><pre class="mt-2 overflow-auto rounded bg-muted p-3">{{ requestPayload }}</pre></details>
      <div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-muted text-left"><tr><th class="p-2">Tanlash</th><th>Chipta / yo‘nalish</th><th>Holat</th><th>Amaldagi narx</th><th>Imtiyozli narx</th><th>Qoplash summasi</th></tr></thead><tbody><tr v-for="t in available" :key="t.ticketId" class="border-b"><td class="p-2"><input v-model="chosen" type="checkbox" :value="t.ticketId" :aria-label="`${t.ticketId}ni tanlash`" /></td><td class="p-2">{{ t.ticketId }}<p class="text-xs text-muted-foreground">{{ t.route }}</p></td><td>{{ userLabel(t.ticketState) }}</td><td>{{ money(t.amount) }}</td><td>{{ money(t.preferentialAmount) }}</td><td>{{ money(t.compensationRequested) }}</td></tr><tr v-if="!available.length"><td colspan="6" class="p-4 text-muted-foreground">Bu tashuvchi va davr bo‘yicha chipta yo‘q. Sinov chiptalari: oktabr 2026.</td></tr></tbody></table></div>
      <div class="flex justify-between items-center gap-3"><p class="font-medium">Jami: {{ money(total) }}</p><Button @click="submit">Buyurtmanomani yuborish</Button></div>
      <p v-if="message" role="status" class="text-sm text-primary">{{ message }}</p>
    </section>
    <section class="rounded-xl border bg-card p-5 space-y-4"><div class="flex flex-wrap justify-between gap-3"><h2 class="font-semibold">Buyurtmanomalar ro‘yxati</h2><select v-model="statusFilter" class="rounded border bg-background p-2 text-sm"><option value="">Barcha holatlar</option><option v-for="s in [...requestStatuses,...paymentStatuses]" :key="s.code" :value="s.code">{{ s.name }}</option></select></div><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="bg-muted"><tr><th class="p-2">Buyurtmanoma raqami / oy</th><th>Transport tashkiloti</th><th>So‘ralgan / tasdiqlangan summa</th><th>Buyurtmanoma holati</th><th>To‘lov holati</th><th></th></tr></thead><tbody><tr v-for="r in filtered" :key="r.id" class="border-b"><td class="p-2 font-mono text-xs">{{ r.id }}<p>{{ r.period }}</p></td><td>{{ r.carrier }}</td><td>{{ money(r.lines.reduce((s,l)=>s+l.requested,0)) }}<p class="text-primary">{{ money(r.approvedAmount) }}</p></td><td>{{ label(r.status) }}</td><td>{{ label(r.payment) }}</td><td><Button variant="outline" size="sm" @click="selectedId = r.id">Ko‘rish</Button></td></tr><tr v-if="!filtered.length"><td colspan="6" class="p-4 text-muted-foreground">Buyurtmanoma yo‘q. Yuqoridagi formadan yuboring.</td></tr></tbody></table></div></section>
    <section v-if="selected" class="rounded-xl border bg-card p-5 space-y-4">
      <div><h2 class="font-semibold">{{ selected.id }} · {{ label(selected.status) }}</h2><p class="text-sm text-muted-foreground">{{ selected.sourceId }} · {{ selected.carrier }} · {{ selected.period }}</p><p class="mt-1 text-xs">Bank hisob raqami: {{ selected.account }} · Qabul qilindi: {{ date(selected.receivedAt) }}</p><p class="mt-1 text-xs">Biriktirilgan fayllar: {{ selected.documents.map(d => (files.find(f => f.id === d.file_id)?.name || 'Avvalgi fayl — qayta yuklash kerak') + ' (' + d.file_id + ')').join(', ') }}</p></div>
      <div v-for="l in selected.lines" :key="l.ticketId" class="flex justify-between gap-3 rounded border p-3 text-sm"><span>{{ l.ticketId }} · {{ money(l.requested) }}</span><span :class="l.error ? 'text-destructive' : 'text-primary'">{{ l.error || (selected.status === 'RECEIVED' ? 'Tekshirilmagan' : 'Mos') }}</span></div>
      <div class="flex flex-wrap gap-2"><Button v-if="selected.status === 'RECEIVED' || selected.status === 'NEEDS_CORRECTION'" @click="check">Chiptalarni tekshirish</Button><Button v-if="selected.status === 'NEEDS_CORRECTION'" variant="outline" @click="correct">Buyurtmanomani tuzatish</Button></div>
      <div v-if="selected.status === 'VALIDATED'" class="space-y-3"><label class="block text-sm"><input v-model="method" type="checkbox" /> Chiptalar va hujjatlarni tekshirdim, bank hisob raqami shu tashkilotga tegishli</label><Button :disabled="!method" @click="approve">Summani tasdiqlash</Button><p class="text-xs text-muted-foreground">Hisoblash sinov uchun ko‘rsatilgan. Haqiqiy to‘lovdan oldin narxlarni hisoblash va chipta qaytarish qoidalari tasdiqlanishi kerak.</p></div>
      <Button v-if="selected.status === 'APPROVED' && selected.payment === 'NOT_SENT'" @click="send">To‘lovga yuborish (sinov)</Button>
      <div v-if="selected.payment === 'PROCESSING'" class="flex flex-wrap gap-2"><Button @click="receive('PAID')">To‘langan holatini ko‘rish (sinov)</Button><Button variant="outline" @click="receive('FAILED')">To‘lov bajarilmagan holatini ko‘rish (sinov)</Button></div><Button v-if="selected.payment === 'FAILED'" variant="outline" @click="retry">Qayta yuborish (sinov)</Button>
      <p v-if="selected.paymentId" class="text-sm">To‘lov raqami: <span class="font-mono">{{ selected.paymentId }}</span> · {{ label(selected.payment) }}<span v-if="selected.paidAt"> · {{ date(selected.paidAt) }} · {{ selected.paymentDocument }}</span></p>
      <div class="grid gap-4 md:grid-cols-2"><div><h3 class="text-sm font-semibold">Jarayon tarixi</h3><p v-for="(h,i) in selected.history" :key="i" class="mt-2 text-xs text-muted-foreground">{{ date(h.at) }} · {{ h.text }}</p></div><div><h3 class="text-sm font-semibold">Tashkilotga yuborilgan xabarlar (sinov)</h3><p v-for="(n,i) in selected.notifications" :key="i" class="mt-2 text-xs text-muted-foreground">{{ date(n.at) }} · {{ n.status.split(' / ').map(label).join(' / ') }}</p><p v-if="!selected.notifications.length" class="mt-2 text-xs text-muted-foreground">Hali xabarnoma yo‘q.</p></div></div>
    </section>
    <section class="rounded-xl border bg-card p-5 space-y-3"><h2 class="font-semibold">Buyurtmanoma yoki to‘lov raqami bo‘yicha qidirish</h2><div class="flex gap-2"><Input v-model="query" placeholder="Buyurtmanoma yoki to‘lov raqamini kiriting" @keyup.enter="lookup" /><Button @click="lookup">Tekshirish</Button></div><div v-if="foundRequest" class="grid gap-3 rounded-lg border p-4 text-sm sm:grid-cols-2" role="status"><p>Buyurtmanoma: <strong>{{ foundRequest.id }}</strong></p><p>Holati: <strong>{{ label(foundRequest.status) }}</strong></p><p>To‘lov: <strong>{{ label(foundRequest.payment) }}</strong></p><p>Tasdiqlangan summa: <strong>{{ money(foundRequest.approvedAmount) }}</strong></p><p>To‘langan summa: <strong>{{ money(foundRequest.payment === 'PAID' ? foundRequest.approvedAmount : 0) }}</strong></p><p>To‘lov sanasi: <strong>{{ foundRequest.paidAt ? date(foundRequest.paidAt) : 'Hali to‘lanmagan' }}</strong></p></div><p v-else-if="queryResult" role="status" class="text-sm text-muted-foreground">Buyurtmanoma topilmadi.</p><details v-if="foundRequest" class="text-xs text-muted-foreground"><summary class="cursor-pointer">Dasturchilar uchun javob namunasi</summary><pre class="mt-2 overflow-auto rounded-lg bg-muted p-4">{{ queryResult }}</pre></details></section>
  </div>
</template>
