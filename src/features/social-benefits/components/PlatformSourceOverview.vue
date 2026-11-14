<script setup lang="ts">
import { computed, ref } from 'vue'

const sections = ['Choralar reyestri', 'Ko‘rsatilgan choralar', 'Fuqaro pasporti', 'Nazorat holatlari', 'Ma’lumot manbasi'] as const
const selected = ref<typeof sections[number]>('Choralar reyestri')
const registryGroups = [
  { title: 'Chora turlari', values: [['Ijtimoiy kafolat', 131], ['Moliyaviy ko‘mak', 183], ['Imtiyoz', 263]] },
  { title: 'Yo‘nalishlar', values: [['Bandlik', 104], ['Ta’lim', 99], ['Tibbiy xizmat', 55], ['Ijtimoiy xizmat', 126], ['Yashash sharoiti', 38], ['Boshqa', 155]] },
  { title: 'Eng ko‘p chora taqdim etuvchi idoralar', values: [['IHMA', 144], ['Bandlik vazirligi', 67], ['Ta’lim va ilm-fan', 60], ['Sog‘liqni saqlash vazirligi', 52], ['Adliya vazirligi', 35]] },
] as const
const paymentGroups = [
  { title: 'Har 100 so‘mlik ko‘mak taqsimoti', values: [['Pensiya jamg‘armasi', 83], ['IHMA', 16], ['Ayollar daftari jamg‘armasi', '<1'], ['Yoshlar daftari jamg‘armasi', '<1'], ['Bandlik jamg‘armasi', '<1']] },
  { title: 'Eng katta uchta chora · trln so‘m', values: [['Yoshga doir pensiya', 64.0], ['Nogironlik pensiyasi', 8.7], ['Boquvchisini yo‘qotganlik pensiyasi', 4.1]] },
  { title: 'IHMA bo‘yicha hududlar · mlrd so‘m, yaxlitlangan', values: [['QQR',904], ['Andijon',1200], ['Buxoro',578], ['Jizzax',699], ['Qashqadaryo',1600], ['Navoiy',425], ['Namangan',1300], ['Samarqand',1700], ['Sirdaryo',394], ['Surxondaryo',1400], ['Toshkent v.',964], ['Farg‘ona',1400], ['Xorazm',836], ['Toshkent sh.',762]] },
] as const
const audit = [
  { title: 'Bir oyda bitta nafaqa ikki baravar to‘langan', count: 436, amount: '504,0 mln so‘m', status: 'Ortiqcha to‘lov', tone: 'red' },
  { title: 'Bir oyda ikki tumanda ikki baravar to‘langan', count: 28, amount: '45,0 mln so‘m', status: 'Ortiqcha to‘lov', tone: 'red' },
  { title: 'Bir vaqtda ikki xil toifadagi nafaqa', count: 26, amount: '66,0 mln so‘m', status: 'Tekshirish kerak', tone: 'amber' },
  { title: 'Bir vakil 5 yoki undan ko‘p shaxsning nafaqasini olgan', count: 3, amount: '183,0 mln so‘m', status: 'Ogohlantirish', tone: 'amber' },
  { title: 'Bir oylik to‘lov ikki oluvchiga bo‘lingan', count: 1450, amount: '16,6 mlrd so‘m', status: 'Ma’lumot uchun', tone: 'blue' },
  { title: 'Bir oyda ikki baravar yoki undan ko‘p to‘langan', count: 38264, amount: '93,2 mlrd so‘m', status: 'Ma’lumot uchun', tone: 'blue' },
] as const
const familyMembers = [['Oila boshlig‘i', 20926500], ['1-farzand', 20982000], ['2-farzand', 20982000]] as const
const familyMonths = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'].map((name, index) => ({ name, amount: index < 2 ? 5005000 : index < 6 ? 5026000 : 5462750, quarter: Math.floor(index / 3) + 1 }))
const quarter = ref(0)
const familyPeriod = computed(() => familyMonths.filter(month => !quarter.value || month.quarter === quarter.value))
const regions = [['QQR',20], ['Andijon',54], ['Buxoro',11], ['Jizzax',14], ['Qashqadaryo',66], ['Navoiy',17], ['Namangan',33], ['Samarqand',50], ['Sirdaryo',11], ['Surxondaryo',43], ['Toshkent v.',20], ['Farg‘ona',51], ['Xorazm',33], ['Toshkent sh.',13]] as const
const activeAudit = ref<number>(0)
const selectedAudit = computed(() => audit[activeAudit.value] ?? audit[0])
const groups = computed(() => selected.value === 'Choralar reyestri' ? registryGroups : paymentGroups)
const num = new Intl.NumberFormat('uz-UZ')
const source = 'https://claude.ai/artifact/FsB5c9NuHmxbW5QweP5bpv'

function barWidth(value: number | string, values: readonly (readonly [string, number | string])[]) {
  const max = Math.max(...values.map(([, count]) => typeof count === 'number' ? count : 1))
  return (typeof value === 'number' ? value : .5) / max * 100 + '%'
}
</script>

<template>
  <section class="source-panel" aria-labelledby="source-overview">
    <header>
      <div><p>Asosiy manba · 2025-yil kesimi</p><h2 id="source-overview">Davlat ijtimoiy ko‘magi</h2></div>
      <a :href="source" target="_blank" rel="noopener noreferrer">Claude prototipi ↗</a>
    </header>
    <div class="source-kpis">
      <article><strong>577</strong><span>Chora</span></article>
      <article><strong>37</strong><span>Idora</span></article>
      <article><strong>92,1 trln</strong><span>Hisobga olingan ko‘mak · so‘m</span></article>
      <article><strong>701 468</strong><span>Nafaqa oluvchilar</span></article>
    </div>
    <div class="source-tabs" aria-label="Asosiy manba kesimlari">
      <button v-for="tab in sections" :key="tab" type="button" :aria-pressed="selected === tab" @click="selected = tab">{{ tab }}</button>
    </div>
    <div v-if="selected === 'Choralar reyestri' || selected === 'Ko‘rsatilgan choralar'" :key="selected" class="source-grid">
      <section v-for="group in groups" :key="group.title">
        <h3>{{ group.title }}</h3>
        <div v-for="[label, value] in group.values" :key="label" class="source-row">
          <span>{{ label }}</span><strong>{{ value }}</strong>
          <div aria-hidden="true" class="source-bar"><i :style="{ width: barWidth(value, group.values) }" /></div>
        </div>
      </section>
    </div>
    <div v-else-if="selected === 'Fuqaro pasporti'" class="source-grid">
      <section><h3>Prototipdagi oila · 2025</h3>
        <p>3 nafar oila a’zosi. Pasportdagi summalar shaxssizlantirib ko‘rsatildi.</p>
        <div v-for="[label, amount] in familyMembers" :key="label" class="source-row"><span>{{ label }}</span><strong>{{ num.format(amount) }} so‘m</strong></div>
        <RouterLink :to="{ name: 'social-benefits-platform-family' }">Fuqaro ko‘rinishini ochish →</RouterLink>
      </section>
      <section><h3>To‘lovlar tarixi</h3>
        <label>Davr <select v-model.number="quarter"><option :value="0">Yil</option><option v-for="q in 4" :key="q" :value="q">{{ q }}-chorak</option></select></label>
        <p><strong>{{ num.format(familyPeriod.reduce((sum, month) => sum + month.amount, 0)) }} so‘m</strong></p>
        <div v-for="month in familyPeriod" :key="month.name" class="source-row"><span>{{ month.name }}</span><strong>{{ num.format(month.amount) }}</strong></div>
      </section>
    </div>
    <div v-else-if="selected === 'Nazorat holatlari'" class="source-grid audit-grid">
      <div>
        <p><strong>549,0 mln so‘m</strong> · prototipda ortiqcha to‘lov deb ko‘rsatilgan ikki holat turi.</p>
        <button v-for="(item, index) in audit" :key="item.title" type="button" class="audit-button" :data-tone="item.tone" :aria-pressed="activeAudit === index" @click="activeAudit = index">
          <strong>{{ num.format(item.count) }}</strong><span>{{ item.title }}<small>{{ item.status }}</small></span>
        </button>
      </div>
      <section aria-live="polite">
        <h3>{{ selectedAudit.title }}</h3><p>{{ selectedAudit.status }} · {{ selectedAudit.amount }}</p>
        <div v-if="activeAudit === 0" class="audit-region"><div v-for="[name,count] in regions" :key="name"><span>{{ name }}</span><strong>{{ count }}</strong></div></div>
        <p class="audit-note">Tahlil signali vakolatli xodim tomonidan tekshiriladi.</p>
      </section>
    </div>
    <div v-else class="source-grid">
      <section><h3>Prototipda jadvalga bog‘langan</h3><p>2025-yil idoralar kesimidagi summa va son, Agentlikning 14 hududi bo‘yicha vedomost ijrosi, 37 idora va 577 chora.</p></section>
      <section><h3>Nafaqa bazasiga bog‘langan</h3><p>2025-yil oluvchilar kesimi, fuqaro pasportlari va takror yoki ortiqcha to‘lov signallari.</p></section>
      <section><h3>Namunaviy kesimlar</h3><p>Prototipdagi oylik taqsimot, 2024 va 2026 ko‘rsatkichlari, ayrim idoralararo tahlil, tavsiyalar va arizalar.</p></section>
    </div>
  </section>
</template>

<style scoped>
.source-panel { display:grid; gap: .9rem; padding:1rem; border:1px solid var(--border); border-radius:.85rem; background:var(--card); }
header { display:flex; justify-content:space-between; gap:.5rem; flex-wrap:wrap; align-items:center; }
header h2 {font-weight:750;font-size:clamp(1.3rem,2vw,1.85rem);}
header p, header a, small, .audit-note {font-size:.8rem;color:var(--muted-foreground);}
.source-kpis, .source-grid {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.6rem;}
.source-grid {grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));}
.source-kpis article,.source-grid section {padding:.75rem;border:1px solid var(--border);border-radius:.55rem;background:var(--muted);}
.source-kpis strong,.source-kpis span {display:block;}
.source-kpis strong {font-size:clamp(1.3rem,3vw,2.35rem);line-height:1.15;color:var(--primary);}
.source-kpis span,.source-grid p {font-size:.84rem;}
.source-panel select { border: 1px solid var(--border); border-radius: .35rem; padding: .2rem .4rem; background: var(--card); }
.source-tabs {display:flex;gap:.4rem;flex-wrap:wrap;}
.source-tabs button {padding:.45rem .65rem;border:1px solid var(--border);border-radius:.4rem;font-size:.84rem;}
.source-tabs [aria-pressed='true'] {background:var(--primary);color:var(--primary-foreground);}
.source-grid h3 {font-weight:700;margin-bottom:.5rem;}
.source-row {display:grid;grid-template-columns:1fr auto;gap:.25rem .5rem;margin:.45rem 0;font-size:.82rem;}
.source-bar {grid-column:1/-1;height:4px;background:var(--border);border-radius:9px;overflow:hidden;}
.source-bar i {display:block;height:100%;background:#168875;transform-origin:left;animation:source-grow .55s ease-out both;}
.audit-grid {grid-template-columns:repeat(2,minmax(0,1fr));}
.audit-button {display:grid;grid-template-columns:4rem 1fr;gap:.5rem;text-align:left;align-items:center;margin:.35rem 0;width:100%;border:1px solid var(--border);border-radius:.4rem;padding:.45rem .55rem;font-size:.81rem;}
.audit-button strong {color:var(--audit-color);}
.audit-button[aria-pressed='true'] {border-color:var(--audit-color);background:color-mix(in oklch,var(--audit-color) 10%,var(--card));}
.audit-button small {display:block;}
[data-tone='red'] {--audit-color:#d44458;}
[data-tone='amber'] {--audit-color:#a3680e;}
[data-tone='blue'] {--audit-color:#3475bb;}
.audit-region {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.3rem .7rem;margin:.65rem 0;}
.audit-region div {display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);}
.audit-note {margin-top:.6rem;}
@keyframes source-grow {from{transform:scaleX(0)} to{transform:scaleX(1)}}
@media(max-width:650px){.source-kpis{grid-template-columns:repeat(2,minmax(0,1fr));}.audit-grid{grid-template-columns:minmax(0,1fr);}}
@media(prefers-reduced-motion:reduce){.source-bar i{animation:none;}}
</style>
