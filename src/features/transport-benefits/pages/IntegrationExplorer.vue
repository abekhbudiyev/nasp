<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowRight, Check, ChevronRight, Copy, FileText, FolderOpen, Landmark, ListChecks, Radio, UsersRound } from 'lucide-vue-next'
import { correctionStatusSample, reimbursementReasons } from '../finance-api-contracts'
import { documentTypes, paymentStatuses, requestStatuses } from '../reimbursement'

interface Api { id: string; method: string; endpoint: string; title: string; description: string; consumers: string; variants: string[]; sample: string; response?: string }
const props = defineProps<{ apis: Api[] }>()
const groups = [
  { id: 'registry', title: 'Imtiyoz va chiptalar', icon: UsersRound, ids: ['contingent', 'eligibility', 'ticket'], caption: 'Kundalik ma’lumot almashish', when: 'Huquq haqidagi ma’lumot o‘zgarganda yoki chipta rasmiylashtirilayotganda.', result: 'Imtiyoz oluvchilar va chiptalar reyestri yuritiladi. Oylik buyurtmanoma shu ma’lumotlar bilan tekshiriladi.' },
  { id: 'documents', title: 'Fayllarni tayyorlash', icon: FolderOpen, ids: ['file-config', 'file-create'], caption: 'Buyurtmanoma yuborishdan oldin', when: 'Tashuvchi buyurtmanoma uchun hujjatlarni tayyorlaganda. Avval fayl sozlamalari olinadi, keyin har bir fayl alohida yuklanadi.', result: 'Har bir yuklangan hujjat uchun file_id olinadi. Bu raqam keyingi bosqichda buyurtmanomaga biriktiriladi.' },
  { id: 'requests', title: 'Buyurtmanomani yuborish', icon: FileText, ids: ['reimbursement-create', 'reimbursement-correct'], caption: 'Oy tugagach, keyingi oyning 10-sanasigacha', when: 'Tashuvchi o‘tgan oy uchun chipta qatorlari, bank rekvizitlari va fayl raqamlarini yuborganda. Tuzatish API faqat xato qaytarilganda ishlatiladi.', result: 'Buyurtmanoma raqami olinadi. Tizim chiptalar va hujjatlarni tekshiradi; mas’ul xodim to‘lov summasini tasdiqlaydi.' },
  { id: 'payment', title: 'To‘lovni bajarish', icon: Landmark, ids: ['subsidy-submit', 'payment-event'], caption: 'Buyurtmanoma tasdiqlangandan keyin', when: 'Bizning tizim tasdiqlangan buyurtmanomani subsidiya moduliga yuboradi. Subsidiya moduli to‘lov jarayoni va yakuniy natijani qaytaradi.', result: 'To‘lov raqami, holati, summa va to‘lov hujjati buyurtmanomaga bog‘lanadi. Bu bosqichni tashuvchi chaqirmaydi.' },
  { id: 'results', title: 'Natijani kuzatish', icon: Radio, ids: ['carrier-notification', 'reimbursement-status'], caption: 'Yuborilgandan keyin, holat o‘zgarganda', when: 'Bizning tizim holat o‘zgarganda tashuvchiga xabar beradi. Tashuvchi esa buyurtmanoma raqami bilan istalgan payt joriy holatni so‘rashi mumkin.', result: 'Buyurtmanoma va to‘lov holati ko‘rinadi. GET so‘rovi callback xabarini kutmasdan ishlatilishi mumkin.' },
  { id: 'references', title: 'Ma’lumotnomalar', icon: ListChecks, ids: ['reference-data'], caption: 'Forma va ma’lumotlarni tayyorlashda', when: 'Tizimlar hujjat turlari, holatlar va boshqa kodlarning id hamda code qiymatlarini olish uchun foydalanadi.', result: 'Integratsiyada barcha tomonlar bir xil ma’lumotnoma qiymatlaridan foydalanadi.' },
]
const financeFlow = groups.slice(1, 5)
const groupId = ref('documents')
const apiId = ref('file-config')
const sampleTab = ref<'request' | 'response'>('request')
const copied = ref(false)
const copyError = ref('')
const group = computed(() => groups.find(g => g.id === groupId.value)!)
const groupApis = computed(() => group.value.ids.flatMap(id => props.apis.filter(a => a.id === id)))
const selected = computed(() => groupApis.value.find(a => a.id === apiId.value) || groupApis.value[0]!)
const sample = computed(() => sampleTab.value === 'response' ? selected.value.response : selected.value.sample)
const catalogs = [{ name: 'Hujjat turlari', entries: documentTypes }, { name: 'Buyurtmanoma holatlari', entries: requestStatuses }, { name: 'To‘lov holatlari', entries: paymentStatuses }, { name: 'Tekshirish sabablari', entries: reimbursementReasons }]
const usage: Record<string, { when: string; next: string }> = {
  contingent: { when: 'Manba tashkilot imtiyoz huquqini berganda, tuzatganda yoki bekor qilganda.', next: 'Shaxsning imtiyoz huquqi reyestrda yangilanadi.' },
  eligibility: { when: 'Chipta berishdan oldin — shaxs imtiyozdan foydalana olishini tekshirish uchun.', next: 'Mos natijada safar uchun vaqtinchalik band qilish raqami olinadi.' },
  ticket: { when: 'Chipta chiqarilganda yoki uning holati o‘zgarganda.', next: 'Chipta ma’lumotlari reyestrga kiritiladi.' },
  'file-config': { when: 'Hujjat yuklash maydonlarini ko‘rsatishdan oldin.', next: 'Hujjat nomlari va kengaytmalari bo‘yicha fayllar tanlanadi.' },
  'file-create': { when: 'Fileconfigdan hujjat talablari olingach, har bir fayl uchun.', next: 'Response ichidagi file_id buyurtmanomaga kiritiladi.' },
  'reimbursement-create': { when: 'Oy yakunlangach, chiptalar va hujjat raqamlari tayyor bo‘lganda.', next: 'request_id saqlanadi. Tekshiruv natijasi GET yoki xabar orqali olinadi.' },
  'reimbursement-correct': { when: 'Buyurtmanoma holati NEEDS_CORRECTION bo‘lganda.', next: 'Yangi versiya qayta tekshiriladi. To‘lovga yuborilgan versiya o‘zgartirilmaydi.' },
  'subsidy-submit': { when: 'Buyurtmanoma APPROVED bo‘lib, summa va bank rekvizitlari tasdiqlanganda.', next: 'Subsidiya modulidan payment_id va PROCESSING holati olinadi.' },
  'payment-event': { when: 'Subsidiya modulida to‘lov holati o‘zgarganda.', next: 'To‘lov natijasi saqlanadi va tashuvchiga xabar yuboriladi.' },
  'carrier-notification': { when: 'Buyurtmanoma yoki to‘lov holati o‘zgarganda.', next: 'Tashuvchi xabar olinganini tasdiqlaydi. Yetib bormasa qayta yuboriladi.' },
  'reimbursement-status': { when: 'Buyurtmanoma yuborilgandan keyin istalgan payt.', next: 'Joriy holat, summalar yoki tuzatish kerak bo‘lgan qatorlar olinadi.' },
  'reference-data': { when: 'Formalarni tayyorlash yoki kodlarni yangilash kerak bo‘lganda.', next: 'Olingan qiymatlar tegishli API so‘rovlarida ishlatiladi.' },
}
function chooseGroup(id: string) { groupId.value = id; apiId.value = group.value.ids[0]! }
watch(apiId, () => { sampleTab.value = 'request'; copied.value = false; copyError.value = '' })
async function copy() { try { await navigator.clipboard.writeText(`Request\n${selected.value.sample}${selected.value.response ? `\n\nResponse\n${selected.value.response}` : ''}`); copied.value = true } catch { copyError.value = 'Nusxalash bajarilmadi. Matnni belgilab nusxalang.' } }
</script>

<template>
  <div class="space-y-5">
    <section class="rounded-2xl border bg-card p-5 sm:p-6">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary">Integratsiya qo‘llanmasi</p>
      <h2 class="mt-2 text-xl font-semibold">Qaysi API qachon ishlatiladi?</h2>
      <p class="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Quyidagi bosqichdan boshlang. Har bir API uchun chaqiruvchi tomon, foydalanish vaqti va keyingi qadam ko‘rsatilgan.</p>
      <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <button v-for="(step,i) in financeFlow" :key="step.id" type="button" :aria-pressed="groupId === step.id" @click="chooseGroup(step.id)" :class="['relative rounded-xl border p-4 text-left transition-colors', groupId === step.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/40']">
          <div class="flex items-center justify-between"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{{ i + 1 }}</span><component :is="step.icon" class="h-4 w-4 text-muted-foreground" /></div>
          <p class="mt-3 text-sm font-semibold">{{ step.title }}</p><p class="mt-1 text-xs leading-5 text-muted-foreground">{{ step.caption }}</p>
        </button>
      </div>
      <p class="mt-4 text-xs leading-5 text-muted-foreground">Fayllar alohida yuklanadi; buyurtmanomada faqat file_id beriladi. Tekshirish va summani tasdiqlash — tizimning ichki jarayoni. Summalar tiyinda ko‘rsatilgan.</p>
    </section>
    <div class="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
      <nav aria-label="API bo‘limlari" class="rounded-xl border bg-card p-2 lg:sticky lg:top-0"><button v-for="g in groups" :key="g.id" type="button" :aria-pressed="groupId === g.id" @click="chooseGroup(g.id)" :class="['flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors', groupId === g.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted']"><component :is="g.icon" class="h-4 w-4 shrink-0" /><span class="flex-1">{{ g.title }}</span><span class="text-xs text-muted-foreground">{{ g.ids.length }}</span></button></nav>
      <div class="min-w-0 space-y-4">
        <section class="rounded-xl border bg-card p-5"><h2 class="text-lg font-semibold">{{ group.title }}</h2><p class="mt-1 text-xs font-medium text-primary">{{ group.caption }}</p><div class="mt-4 grid gap-4 md:grid-cols-2"><div><p class="text-xs font-semibold text-muted-foreground">QACHON?</p><p class="mt-1 text-sm leading-6">{{ group.when }}</p></div><div><p class="text-xs font-semibold text-muted-foreground">NATIJA</p><p class="mt-1 text-sm leading-6">{{ group.result }}</p></div></div></section>
        <div class="grid gap-3 sm:grid-cols-2"><button v-for="api in groupApis" :key="api.id" type="button" :aria-pressed="selected.id === api.id" @click="apiId = api.id" :class="['min-w-0 rounded-xl border bg-card p-4 text-left transition-colors', selected.id === api.id ? 'border-primary ring-1 ring-primary/20' : 'hover:bg-muted/30']"><div class="flex items-center justify-between gap-2"><span :class="['rounded px-2 py-1 text-xs font-semibold', api.method === 'GET' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'bg-primary/10 text-primary']">{{ api.method }}</span><ChevronRight class="h-4 w-4 text-muted-foreground" /></div><p class="mt-3 text-sm font-semibold">{{ api.title.replace(/^\d+\. /, '') }}</p><p class="mt-2 break-all font-mono text-[11px] leading-5 text-muted-foreground">{{ api.endpoint }}</p></button></div>
        <section class="min-w-0 overflow-hidden rounded-xl border bg-card">
          <div class="space-y-4 p-5"><div class="flex flex-wrap items-start justify-between gap-3"><div class="min-w-0"><h3 class="font-semibold">{{ selected.title.replace(/^\d+\. /, '') }}</h3><p class="mt-2 break-all font-mono text-xs leading-5 text-primary">{{ selected.method }} {{ selected.endpoint }}</p></div><button class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs hover:bg-muted" @click="copy"><Check v-if="copied" class="h-3.5 w-3.5" /><Copy v-else class="h-3.5 w-3.5" />{{ copied ? 'Nusxalandi' : 'Request va Response nusxalash' }}</button></div>
            <p class="text-sm leading-6 text-muted-foreground">{{ selected.description }}</p>
            <div class="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm"><ArrowRight class="h-4 w-4 shrink-0 text-primary" /><span>{{ selected.consumers }}</span></div>
            <div class="grid gap-4 sm:grid-cols-2"><div><p class="text-xs font-semibold text-muted-foreground">QACHON CHAQIRILADI?</p><p class="mt-1 text-sm leading-6">{{ usage[selected.id]?.when }}</p></div><div><p class="text-xs font-semibold text-muted-foreground">KEYINGI QADAM</p><p class="mt-1 text-sm leading-6">{{ usage[selected.id]?.next }}</p></div></div>
            <p v-if="copyError" role="status" class="text-xs text-destructive">{{ copyError }}</p>
          </div>
          <div class="flex items-center gap-1 border-t bg-muted/30 px-4 pt-2" role="tablist" aria-label="API namunalari"><button role="tab" :aria-selected="sampleTab === 'request'" @click="sampleTab = 'request'" :class="['border-b-2 px-4 py-3 text-sm', sampleTab === 'request' ? 'border-primary font-semibold text-primary' : 'border-transparent text-muted-foreground']">Request · yuboriladigan ma’lumot</button><button v-if="selected.response" role="tab" :aria-selected="sampleTab === 'response'" @click="sampleTab = 'response'" :class="['border-b-2 px-4 py-3 text-sm', sampleTab === 'response' ? 'border-primary font-semibold text-primary' : 'border-transparent text-muted-foreground']">Response · qaytadigan javob</button></div>
          <pre class="max-h-[34rem] overflow-auto bg-[#101b18] p-5 font-mono text-xs leading-6 text-[#d3e7de]" role="tabpanel">{{ sample }}</pre>
          <details v-if="selected.id === 'reimbursement-status'" class="border-t p-4 text-xs"><summary class="cursor-pointer font-medium">Tuzatish kerak bo‘lgandagi javob</summary><pre class="mt-3 overflow-auto rounded-lg bg-muted p-3 font-mono text-xs leading-5">{{ correctionStatusSample }}</pre></details>
        </section>
      </div>
    </div>
    <details class="rounded-xl border bg-card p-5"><summary class="cursor-pointer text-sm font-semibold">Ma’lumotnomalar — hujjat turlari, holatlar va xato sabablari</summary><div class="mt-5 grid gap-5 md:grid-cols-2"><div v-for="catalog in catalogs" :key="catalog.name" class="overflow-auto"><h3 class="mb-2 text-sm font-semibold">{{ catalog.name }}</h3><table class="w-full text-left text-xs"><thead class="bg-muted"><tr><th class="p-2">ID</th><th class="p-2">Code</th><th class="p-2">Ma’nosi</th></tr></thead><tbody><tr v-for="entry in catalog.entries" :key="entry.code" class="border-b"><td class="p-2">{{ entry.id }}</td><td class="p-2 font-mono">{{ entry.code }}</td><td class="p-2">{{ entry.name }}</td></tr></tbody></table></div></div></details>
  </div>
</template>
