<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, ClipboardCheck, Eye, FileText, History, School } from 'lucide-vue-next'
import ExchangeContract from './ExchangeContract.vue'
import { exchangeContracts, type ExchangeStep } from './exchange-contracts'

const route = useRoute()
const tabs = [
  { id: 'application', label: 'Ariza kanallari', icon: ClipboardCheck },
  { id: 'citizen', label: 'Fuqaro kabineti', icon: Eye },
  { id: 'institution', label: 'Ta’lim tizimi', icon: School },
  { id: 'contracts', label: 'Amallar va API tarkibi', icon: FileText },
  { id: 'exchange', label: 'Almashinuv jurnali', icon: History },
] as const
type Tab = typeof tabs[number]['id']
type Kind = 'kindergarten' | 'education'
type Voucher = { id: number; document: string; code: string; provider?: string }
type Placement = { provider: string; start: string; end?: string }
type Receipt = { id: string; provider: string; expires: number }
type Payment = { provider: string; month: string; service: number; travel?: number }
const providers: Record<Kind, string[]> = {
  kindergarten: ['15-son davlat bog‘chasi', '27-son davlat bog‘chasi', 'Kamalak nodavlat bog‘chasi'],
  education: ['1-son bolalar markazi', '23-son maktab to‘garagi', 'Ziyo ta’lim markazi'],
}
const channels = ['IMP · Individual reja', 'YaIDXP (my.gov.uz)', 'DXM', 'Baraka']
const view = ref<Tab>('application')
const kind = ref<Kind>(route.query.kind === 'education' ? 'education' : 'kindergarten')
const channel = ref(channels[0]!)
const application = ref<'new' | 'review' | 'rejected' | 'approved'>('new')
const intakeNumber = ref(0)
const intakeId = computed(() => 'MR-' + intakeNumber.value)
const beneficiaryId = 'NAMUNA-01'
const voucher = ref<Voucher>()
const issuedCodes = new Set<string>()
const institution = ref('')
const enteredId = ref('')
const enteredCode = ref('')
const permission = ref<Receipt>()
const placements = ref<Placement[]>([])
const payments = ref<Payment[]>([])
type ExchangeData = Record<string, string | number>
const logs = ref<{ step: ExchangeStep; title: string; request: ExchangeData; response?: ExchangeData }[]>([])
const message = ref('')
const error = ref('')
const issuedDate = ref('')
const invoiceProvider = ref('')
function today() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('/')
  return parts.reverse().join('-')
}
const month = ref(today().slice(0, 7))
const service = ref('')
const travel = ref('')
const institutionOptions = computed(() => providers[kind.value])
const servedInstitutions = computed(() => [...new Set(placements.value.map(placement => placement.provider))])
const voucherTitle = computed(() => kind.value === 'kindergarten' ? 'Bog‘cha vaucheri' : 'To‘garak vaucheri')
const displayDate = (date: string) => date.split('-').reverse().join('.')
const money = (value: number) => new Intl.NumberFormat('uz-UZ').format(value) + ' so‘m'

function resetFeedback() {
  message.value = ''
  error.value = ''
}
function go(next: Tab) {
  resetFeedback()
  if (next !== 'institution') enteredCode.value = ''
  view.value = next
}
function log(step: ExchangeStep, request: ExchangeData, response?: ExchangeData, title = exchangeContracts[step].title) {
  logs.value.unshift({ step, title, request, response })
}
function institutionId(name: string) {
  return (kind.value === 'kindergarten' ? 'BG-' : 'TG-') + (institutionOptions.value.indexOf(name) + 1)
}
function issueCode() {
  let code = ''
  do {
    code = String(crypto.getRandomValues(new Uint32Array(1))[0]! % 1_000_000).padStart(6, '0')
  } while (issuedCodes.has(code))
  issuedCodes.add(code)
  return code
}
function receiveApplication() {
  if (application.value !== 'new' && application.value !== 'rejected') return
  resetFeedback()
  application.value = 'review'
  intakeNumber.value++
  log('intake', {
    SOURCE: channel.value, SOURCE_REFERENCE: 'MANBA-' + intakeNumber.value,
    BENEFICIARY_ID: beneficiaryId, VOUCHER_TYPE: kind.value,
  }, { INTAKE_ID: intakeId.value, STATUS: 'TEKSHIRUVDA' })
}
function review(approved: boolean) {
  if (application.value !== 'review') return
  resetFeedback()
  application.value = approved ? 'approved' : 'rejected'
  if (!approved) {
    log('review', { INTAKE_ID: intakeId.value }, { STATUS: 'RAD_ETILDI' })
    return
  }
  issuedDate.value = today()
  voucher.value = { id: 1022, document: (kind.value === 'kindergarten' ? 'BG' : 'TG') + '-0001022', code: issueCode() }
  const applicationId = 'AR-' + intakeNumber.value
  log('review', { INTAKE_ID: intakeId.value }, { STATUS: 'TASDIQLANDI', APPLICATION_ID: applicationId })
  log('issue', { APPLICATION_ID: applicationId, BENEFICIARY_ID: beneficiaryId, VOUCHER_TYPE: kind.value }, { VOUCHER_ID: voucher.value.id, DATE: issuedDate.value })
  log('publish', { VOUCHER_ID: voucher.value.id, VOUCHER_TYPE: kind.value, DATE: issuedDate.value }, { STATUS: 'QABUL_QILINDI' })
  log('notify', { VOUCHER_ID: voucher.value.id, STATUS: 'SHAKLLANDI' })
}
function verify() {
  resetFeedback()
  permission.value = undefined
  const current = voucher.value
  const matchedId = current && String(current.id) === enteredId.value.trim() ? current.id : undefined
  const code = enteredCode.value.trim()
  enteredCode.value = ''
  if (!current || matchedId === undefined) error.value = 'Vaucher topilmadi.'
  else if (!institutionOptions.value.includes(institution.value)) error.value = 'Muassasani tanlang.'
  else if (code !== current.code) error.value = 'Kod noto‘g‘ri yoki avval ishlatilgan.'
  else if (current.provider === institution.value) error.value = 'Vaucher ushbu muassasada allaqachon faol.'
  if (!error.value) {
    permission.value = { id: crypto.randomUUID(), provider: institution.value, expires: Date.now() + 5 * 60_000 }
    message.value = 'Faollashtirishga ruxsat berildi.'
  }
  log('verify', {
    VOUCHER_ID: matchedId ?? '[topilmadi]', INSTITUTION_ID: institutionId(institution.value),
    ACTIVATION_CODE: '[maxfiy]',
  }, permission.value
    ? { RESULT: 'MUMKIN', AUTHORIZATION_ID: permission.value.id, EXPIRES_AT: new Date(permission.value.expires).toISOString() }
    : { RESULT: 'MUMKIN_EMAS', REASON: error.value })
}
function confirmActivation() {
  resetFeedback()
  const receipt = permission.value
  const current = voucher.value
  permission.value = undefined
  if (!current || !receipt || receipt.provider !== institution.value || receipt.expires < Date.now()) {
    error.value = 'Ruxsat muddati tugagan yoki amal qilmaydi. Kodni qayta tekshiring.'
    return
  }
  const date = today()
  const newCode = issueCode()
  const prior = placements.value[placements.value.length - 1]
  if (prior) prior.end = date
  placements.value.push({ provider: receipt.provider, start: date })
  voucher.value = { ...current, provider: receipt.provider, code: newCode }
  invoiceProvider.value = receipt.provider
  message.value = prior ? 'Vaucher yangi muassasada faollashtirildi.' : 'Vaucher faollashtirildi.'
  log('confirm', {
    VOUCHER_ID: current.id, AUTHORIZATION_ID: receipt.id, INSTITUTION_ID: institutionId(receipt.provider), ACTIVATED_ON: date,
  }, {
    STATUS: 'FAOL', VOUCHER_ID: current.id, ...(prior ? { PREVIOUS_INSTITUTION_ID: institutionId(prior.provider) } : {}),
  }, prior ? 'Ko‘chirish tasdiqlandi' : 'Faollashtirish tasdiqlandi')
}
function recordPayment() {
  resetFeedback()
  const serviceAmount = Number(service.value)
  const travelAmount = Number(travel.value)
  const hasTravel = kind.value === 'education'
  const served = placements.value.some(row => row.provider === invoiceProvider.value &&
    row.start.slice(0, 7) <= month.value && (!row.end || row.end.slice(0, 7) >= month.value))
  if (!voucher.value || !served || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month.value) || month.value > today().slice(0, 7)) {
    error.value = 'Muassasa va hisob-kitob oyi vaucher tarixiga mos kelishi kerak.'
    return
  }
  if (service.value === '' || !Number.isSafeInteger(serviceAmount) || serviceAmount < 0 ||
      (hasTravel && (travel.value === '' || !Number.isSafeInteger(travelAmount) || travelAmount < 0))) {
    error.value = 'To‘langan summalarni butun so‘mda kiriting.'
    return
  }
  if (payments.value.some(row => row.provider === invoiceProvider.value && row.month === month.value)) {
    error.value = 'Bu muassasa va oy bo‘yicha to‘lov yozuvi allaqachon qabul qilingan.'
    return
  }
  payments.value.unshift({ provider: invoiceProvider.value, month: month.value, service: serviceAmount, ...(hasTravel ? { travel: travelAmount } : {}) })
  log('payment', {
    PAYMENT_ID: 'PAY-' + payments.value.length, VOUCHER_ID: voucher.value.id, INSTITUTION_ID: institutionId(invoiceProvider.value),
    MONTH: month.value, PAID_AMOUNT: serviceAmount, ...(hasTravel ? { TRAVEL_PAID_AMOUNT: travelAmount } : {}),
  }, { STATUS: 'QABUL_QILINDI' })
  message.value = 'Oylik to‘lov yozuvi qabul qilindi.'
}
</script>

<template>
  <section class="exchange-page">
    <header class="exchange-heading">
      <div><h2>Vaucher almashinuvi</h2><p>Ariza, fuqaro vaucheri va muassasada faollashtirish</p></div>
      <span class="exchange-badge">Sinov rejimi</span>
    </header>
    <nav class="exchange-tabs" aria-label="Vaucher jarayoni">
      <button v-for="tab in tabs" :key="tab.id" type="button" :aria-pressed="view === tab.id" @click="go(tab.id)">
        <component :is="tab.icon" :size="16" aria-hidden="true" />{{ tab.label }}
      </button>
    </nav>

    <article v-if="view === 'application'" class="exchange-card">
      <div class="section-heading"><h3>Inson · arizani ko‘rib chiqish</h3><span class="exchange-badge">{{ { new: 'Yangi', review: 'Tekshiruvda', rejected: 'Rad etildi', approved: 'Tasdiqlangan' }[application] }}</span></div>
      <ExchangeContract :key="application" :step="application === 'approved' ? 'issue' : application === 'review' ? 'review' : 'intake'" />
      <form v-if="application === 'new' || application === 'rejected'" class="exchange-form" @submit.prevent="receiveApplication">
        <label>Murojaat manbasi<select v-model="channel"><option v-for="item in channels" :key="item">{{ item }}</option></select></label>
        <label>Vaucher turi<select v-model="kind"><option value="kindergarten">Bog‘cha</option><option value="education">To‘garak</option></select></label>
        <div class="exchange-actions"><button class="exchange-primary" type="submit">Murojaatni qabul qilish</button></div>
      </form>
      <template v-else>
        <p>{{ channel }} · {{ voucherTitle }}</p>
        <div v-if="application === 'review'" class="exchange-actions">
          <button type="button" @click="review(false)">Rad etish</button>
          <button type="button" class="exchange-primary" @click="review(true)">Tasdiqlash va vaucher shakllantirish</button>
        </div>
        <div v-else class="exchange-actions"><button type="button" class="exchange-primary" @click="go('citizen')">Fuqaro vaucherini ochish <ArrowRight :size="16" /></button></div>
      </template>
    </article>

    <template v-else-if="view === 'citizen'">
      <article v-if="voucher" class="exchange-card citizen-voucher">
        <div class="section-heading"><h3>{{ voucherTitle }}</h3><span class="exchange-badge">{{ voucher.provider ? 'Faol' : 'Faollashtirish kutilmoqda' }}</span></div>
        <ExchangeContract step="citizen" />
        <dl class="exchange-meta">
          <div><dt>Vaucher ID</dt><dd>{{ voucher.id }}</dd></div><div><dt>Seriya va raqam</dt><dd>{{ voucher.document }}</dd></div>
          <div><dt>Berilgan sana</dt><dd>{{ displayDate(issuedDate) }}</dd></div><div><dt>Joriy muassasa</dt><dd>{{ voucher.provider ?? 'Tanlanmagan' }}</dd></div>
        </dl>
        <div class="exchange-code"><span>{{ voucher.provider ? 'Boshqa muassasaga ko‘chirish kodi' : 'Bir martalik faollashtirish kodi' }}</span><strong>{{ voucher.code }}</strong></div>
        <p>Vaucher IDsi va kodni o‘zingiz tanlagan muassasaga taqdim eting.</p>
        <div class="exchange-actions"><button type="button" @click="go('institution')">Ta’lim tizimiga o‘tish <ArrowRight :size="16" /></button></div>
      </article>
      <article v-else class="exchange-card"><p>Tasdiqlangan ariza asosida vaucher shu yerda ko‘rinadi.</p><div class="exchange-actions"><button type="button" @click="go('application')">Arizaga o‘tish</button></div></article>
    </template>

    <div v-else-if="view === 'institution'" class="exchange-grid">
      <article class="exchange-card">
        <div class="section-heading"><h3>Vaucherni faollashtirish</h3></div>
        <ExchangeContract step="verify" />
        <form class="exchange-form" @submit.prevent="verify">
          <label class="exchange-wide">Muassasa<select v-model="institution" required @change="permission = undefined; resetFeedback()"><option disabled value="">Muassasani tanlang</option><option v-for="name in institutionOptions" :key="name">{{ name }}</option></select></label>
          <label>Vaucher ID<input v-model.trim="enteredId" required inputmode="numeric" autocomplete="off" @input="permission = undefined" /></label>
          <label>Fuqaro taqdim etgan kod<input v-model.trim="enteredCode" class="exchange-code-input" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="off" @input="permission = undefined" /></label>
          <div class="exchange-actions"><button type="submit" class="exchange-primary">Kodni tekshirish</button></div>
        </form>
        <div v-if="permission" class="exchange-permission">
          <ExchangeContract step="confirm" />
          <p><strong>{{ permission.provider }}</strong> · ruxsat 5 daqiqa amal qiladi</p>
          <div class="exchange-actions"><button type="button" @click="permission = undefined; resetFeedback()">Bekor qilish</button><button class="exchange-primary" type="button" @click="confirmActivation">Faollashtirishni tasdiqlash</button></div>
        </div>
      </article>
      <article class="exchange-card">
        <div class="section-heading"><h3>Oylik to‘langan qoplama</h3></div>
        <ExchangeContract step="payment" />
        <form v-if="placements.length" class="exchange-form" @submit.prevent="recordPayment">
          <label class="exchange-wide">Muassasa<select v-model="invoiceProvider" required><option v-for="name in servedInstitutions" :key="name">{{ name }}</option></select></label>
          <label>Hisob-kitob oyi<input v-model="month" type="month" :max="today().slice(0, 7)" required /></label>
          <label>{{ kind === 'education' ? 'Mashg‘ulot uchun to‘langan, so‘m' : 'To‘langan summa, so‘m' }}<input v-model="service" type="number" min="0" step="1" required /></label>
          <label v-if="kind === 'education'">Yo‘lkira uchun to‘langan, so‘m<input v-model="travel" type="number" min="0" step="1" required /></label>
          <div class="exchange-actions"><button type="submit" class="exchange-primary">Oylik yozuvni yuborish</button></div>
        </form>
        <p v-else>Vaucher faollashgach, muassasa oylik to‘lov yozuvini yubora oladi.</p>
      </article>
      <p v-if="error" class="exchange-feedback exchange-error" role="alert">{{ error }}</p>
      <p v-else-if="message" class="exchange-feedback" role="status">{{ message }}</p>
    </div>

    <div v-else-if="view === 'contracts'" class="exchange-stack">
      <p class="exchange-note">Prototipdagi maydonlar namunalari. Kodni tekshirish va tasdiqlash ikkita alohida amal.</p>
      <div class="exchange-grid">
        <article v-for="(contract, step) in exchangeContracts" :key="step" class="exchange-card">
          <h3>{{ contract.title }}</h3>
          <ExchangeContract :step="step" />
        </article>
      </div>
    </div>
    <div v-else class="exchange-grid">
      <article class="exchange-card">
        <div class="section-heading"><h3>Tizimlar o‘rtasidagi xabarlar</h3><span class="exchange-badge">{{ logs.length }}</span></div>
        <p v-if="!logs.length">Xabarlar jarayon davomida shu yerda paydo bo‘ladi.</p>
        <details v-for="(item, i) in logs" :key="logs.length - i" class="exchange-event">
          <summary>{{ item.title }}<small>{{ exchangeContracts[item.step].direction }}</small></summary>
          <p>{{ exchangeContracts[item.step].actor }}</p>
          <div class="exchange-grid exchange-payloads">
            <div><h4>{{ item.step === 'review' ? 'Tekshiruv uchun' : 'Yuborilgan ma’lumot' }}</h4><pre>{{ JSON.stringify(item.request, null, 2) }}</pre></div>
            <div v-if="item.response"><h4>{{ item.step === 'review' ? 'Tekshiruv natijasi' : 'Javob' }}</h4><pre>{{ JSON.stringify(item.response, null, 2) }}</pre></div>
          </div>
        </details>
      </article>
      <div class="exchange-stack">
        <article class="exchange-card">
          <div class="section-heading"><h3>Muassasalar tarixi</h3></div>
          <p>IHMA monitoringi · muassasa, boshlanish va yakun sanalari</p>
          <p v-if="!placements.length">Faollashtirish qaydlari mavjud emas.</p>
          <ul class="exchange-list"><li v-for="(item, i) in placements" :key="i"><strong>{{ item.provider }}</strong><small>{{ displayDate(item.start) }} — {{ item.end ? displayDate(item.end) : 'Faol' }}</small></li></ul>
        </article>
        <article class="exchange-card">
          <div class="section-heading"><h3>Oylik to‘lovlar</h3></div>
          <p v-if="!payments.length">Oylik to‘lov ma’lumoti kelmagan.</p>
          <ul class="exchange-list"><li v-for="item in payments" :key="item.provider + item.month"><strong>{{ item.month }} · {{ item.provider }}</strong><small>{{ money(item.service) }}<template v-if="item.travel !== undefined"> · Yo‘lkira {{ money(item.travel) }}</template></small></li></ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exchange-page { display: grid; gap: 16px; padding: clamp(14px, 3vw, 28px); min-width: 0; background: var(--background); }
.exchange-heading,.section-heading { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
.exchange-heading h2 { font-size: clamp(22px, 3vw, 32px); font-weight: 680; }
.exchange-heading p,.exchange-card p,.exchange-card small,.exchange-meta dt { color: var(--muted-foreground); font-size: 13px; }
.exchange-badge { display: inline-flex; font-size: 12px; padding: 3px 8px; border: 1px solid var(--border); border-radius: 5px; color: var(--primary); background: var(--accent); }
.exchange-tabs,.exchange-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.exchange-tabs { border-bottom: 1px solid var(--border); padding-bottom: 8px; }
.exchange-tabs button,.exchange-actions button { display:inline-flex; align-items:center; gap:7px; padding:7px 11px; border:1px solid var(--border); border-radius:7px; font-size:13px; font-weight:600; cursor:pointer; }
.exchange-tabs button[aria-pressed=true] { border-color: var(--primary); color: var(--primary); background: var(--accent); }
.exchange-actions button.exchange-primary { color: var(--primary-foreground); background: var(--primary); border-color: var(--primary); }
.exchange-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr)); align-items:start; gap:12px; }
.exchange-stack,.exchange-card { display:grid; gap:12px; min-width:0; }
.exchange-card { background:var(--card); border:1px solid var(--border); padding: 16px; border-radius:10px; }
.exchange-card h3 { font-size: 16px; font-weight: 675; }
.exchange-form,.exchange-meta { display:grid; gap:12px; grid-template-columns:repeat(2,minmax(0,1fr)); }
.exchange-form label { display:grid; min-width:0; gap:4px; font-size:13px; }
.exchange-form :is(input,select) { width:100%; min-width:0; border:1px solid var(--border); background:var(--background); padding:7px 8px; border-radius:6px; }
.exchange-code-input { -webkit-text-security: disc; }
.exchange-wide,.exchange-form .exchange-actions,.exchange-feedback { grid-column:1/-1; }
.exchange-meta dd { margin-top:3px; font-weight:650; }
.citizen-voucher { max-width: 640px; }
.exchange-code,.exchange-permission,.exchange-feedback { display:grid; gap:7px; background:var(--accent); border:1px solid var(--border); border-radius:8px; padding:10px 12px; color:var(--foreground); font-size:13px; }
.exchange-code strong { font-size:27px; letter-spacing:.18em; color:var(--primary); font-variant-numeric:tabular-nums; }
.exchange-error { color:var(--destructive); }
.exchange-event,.exchange-list li { border-top:1px solid var(--border); padding-block:8px; }
.exchange-event summary { cursor:pointer; font-size:14px; font-weight:650; }
.exchange-event small,.exchange-list small { display:block; margin-top:3px; font-weight:400; }
.exchange-event pre { margin-top:8px; background:var(--muted); border-radius:6px; padding:9px; white-space:pre-wrap; overflow-wrap:anywhere; font-size:12px; }
.exchange-payloads { margin-top:8px; grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); }
.exchange-payloads h4 { font-size:12px; font-weight:650; }
.exchange-note { color:var(--muted-foreground); font-size:13px; }
@media(min-width:1280px) { .exchange-page { height:100%; overflow-y:auto; align-content:start; } }
@media(max-width:460px) { .exchange-form { grid-template-columns:1fr; } }
</style>
