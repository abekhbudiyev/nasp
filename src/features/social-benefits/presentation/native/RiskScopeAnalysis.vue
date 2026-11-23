<script setup lang="ts">
import { computed, ref } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, auditTitles, num, money, organization } from './data'
const props = defineProps<{ selected: number }>()
const emit = defineEmits<{ category: [number]; region: [string]; family: [string] }>()
const scope = ref('republic'), region = ref('')
const tabs = [{ key: 'republic', title: 'Respublika' }, { key: 'regions', title: 'Hududlar' }, { key: 'agencies', title: 'Vazirlik va idoralar' }, { key: 'families', title: 'Oilalar' }]
const regions = computed(() => data.regions.map((name,index) => {
  const original = data.regionMap.indexOf(index)
  const values = data.audit[props.selected]?.reg[original]
  return { name,index,count: values?.[0] ?? null,amount: values?.[1] ?? null }
}))
const agencies = computed(() => [...new Set(data.finance.map(line => line.o))].map(key => {
  const lines = data.finance.filter(line => line.o === key && line.plan && line.id !== 'a17')
  const plan = lines.reduce((total,line) => total + line.plan!,0)
  const paid = lines.reduce((total,line) => total + line.s,0)
  return { key, name: organization(key), count: lines.length ? lines.filter(line => line.s / line.plan! < .9).length : null, rate: plan ? paid / plan * 100 : null }
}))
const families = computed(() => data.families.filter(family => (!region.value || family.region === Number(region.value)) && family.signals.some(([level]) => level === 'warn' || level === 'alert')))
</script>
<template>
  <section class="np-card risk-scopes">
    <header class="np-card-heading"><div><h2>{{ benefitText('Xatarlar tahlili') }}</h2><p>{{ benefitText('2025-yil · manbada mavjud nazorat ma’lumotlari') }}</p></div></header>
    <div class="risk-tabs"><button v-for="tab in tabs" :key="tab.key" type="button" :aria-pressed="scope === tab.key" @click="scope = tab.key">{{ benefitText(tab.title) }}</button></div>
    <div v-if="scope === 'republic'" class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Xatar / signal') }}</th><th>{{ benefitText('Holatlar soni') }}</th><th>{{ benefitText('Signalga tegishli to‘lovlar') }}</th></tr></thead><tbody><tr v-for="(item,index) in data.audit" :key="item.k"><td><button class="text-button" @click="emit('category',index)">{{ benefitText(auditTitles[index]) }}</button></td><td>{{ num(item.n) }}</td><td>{{ benefitText(money(item.s * 1e9) + ' so‘m') }}</td></tr></tbody></table><p class="np-note">{{ benefitText('Signal tasdiqlangan qoidabuzarlik emas. To‘lov summasi zarar summasini bildirmaydi. Turli signallardagi shaxslar takrorlanishi mumkin.') }}</p></div>
    <template v-else-if="scope === 'regions'">
      <label>{{ benefitText('Xatar turi') }}<select :value="selected" @change="emit('category', Number(($event.target as HTMLSelectElement).value))"><option v-for="(name,index) in auditTitles" :key="index" :value="index">{{ benefitText(name) }}</option></select></label>
      <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Hudud') }}</th><th>{{ benefitText('Holatlar soni') }}</th><th>{{ benefitText('Signalga tegishli to‘lovlar') }}</th></tr></thead><tbody><tr v-for="row in regions" :key="row.index"><td><button class="text-button" @click="emit('region',String(row.index))">{{ benefitText(row.name) }}</button></td><td>{{ row.count === null ? '—' : num(row.count) }}</td><td>{{ row.amount === null ? '—' : benefitText(money(row.amount * 1e9) + ' so‘m') }}</td></tr></tbody></table></div>
    </template>
    <template v-else-if="scope === 'agencies'">
      <p class="np-note">{{ benefitText('Moliyaviy ijro bo‘yicha xavf ko‘rsatkichi: reja ijrosi 90% dan past choralar. Nazorat signallarining idoralar bo‘yicha taqsimoti manbada mavjud emas.') }}</p>
      <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Vazirlik / idora') }}</th><th>{{ benefitText('Ijrosi 90% dan past choralar') }}</th><th>{{ benefitText('Umumiy reja ijrosi, %') }}</th></tr></thead><tbody><tr v-for="row in agencies" :key="row.key"><td>{{ benefitText(row.name) }}</td><td>{{ row.count === null ? '—' : num(row.count) }}</td><td>{{ row.rate === null ? '—' : num(row.rate,1) }}</td></tr></tbody></table></div>
    </template>
    <template v-else>
      <label>{{ benefitText('Viloyat') }}<select v-model="region"><option value="">{{ benefitText('Respublika') }}</option><option v-for="(name,index) in data.regions" :key="index" :value="String(index)">{{ benefitText(name) }}</option></select></label>
      <p class="np-note">{{ benefitText('Mavjud oila pasportlaridagi ogohlantirishlar. To‘liq respublika oilalari reyestri emas; ogohlantirish tasdiqlangan qoidabuzarlik hisoblanmaydi.') }}</p>
      <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Oila') }}</th><th>{{ benefitText('Hudud / manzil') }}</th><th>{{ benefitText('E’tibor talab qiladigan holatlar') }}</th></tr></thead><tbody><tr v-for="family in families" :key="family.id"><td><button class="text-button" @click="emit('family',family.id)">{{ benefitText(family.members[0]?.name ?? family.id) }}</button></td><td>{{ benefitText(data.regions[family.region] + ' · ' + family.address) }}</td><td><ul><li v-for="(signal,index) in family.signals.filter(([level]) => level === 'warn' || level === 'alert')" :key="index">{{ benefitText(signal[1]) }}</li></ul></td></tr><tr v-if="!families.length"><td colspan="3">{{ benefitText('Mavjud oila pasportlarida ushbu hudud bo‘yicha ogohlantirish topilmadi.') }}</td></tr></tbody></table></div>
    </template>
  </section>
</template>
<style scoped>
.risk-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.risk-tabs button { padding: 9px 14px; border: 1px solid var(--border); border-radius: 9px; font-size: 13px; }
.risk-tabs button[aria-pressed="true"] { background: var(--primary); color: var(--primary-foreground,white); border-color: var(--primary); }
label { display: grid; gap: 6px; max-width: 420px; margin-bottom: 14px; font-size: 12px; }
select { padding: 9px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); color: var(--foreground); }
li + li { margin-top: 5px; }
</style>
