<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed, ref, watch } from 'vue'
import { data, months, num, sum } from './data'
import ReportActions from './ReportActions.vue'
import { findText, scopeMonths, scopeRegion, type ReportOutput } from './report-output'

const props = defineProps<{ region:string; district:string; benefit:string; sex:string; age:string; selectedMonths:number[] }>()
const emit = defineEmits<{ family:[string, string?] }>()
const query = ref('')
const page = ref(1)
const ageGroups = ['18 yoshgacha', '18–29 yosh', '30–59 yosh', '60 yosh va undan katta']
const profileGroups = [
  { key:'nt', title:'Nafaqa turlari soni', labels:['1 ta', '2 ta', '3 ta va undan ko‘p'] },
  { key:'mo', title:'To‘lov olingan davr', labels:['12 oy', '6–11 oy', '6 oydan kam'] },
  { key:'b', title:'Yillik to‘lov', labels:['3 mln so‘mgacha', '3–6 mln', '6–9 mln', '9–12 mln', '12–15 mln', '15 mln dan ko‘p'] },
] as const
const profiles = computed(() => profileGroups.map(group => {
  const source = data.recipientDistribution[group.key]
  const regions = props.region === '' ? source : source.filter((_,i) => data.regionMap[i] === Number(props.region))
  return { ...group, values:group.labels.map((_,i) => sum(regions.map(row => row[i] ?? 0))) }
}))
const demographics = computed(() => {
  const result = ageGroups.map(() => [0,0])
  const add = (district:number, sex:number, age:number, annual:number, monthly:number[]) => {
    if (props.region && data.regionMap[data.districts[district]![0]] !== +props.region) return
    if ((props.district && district !== +props.district) || (props.sex && sex !== +props.sex) || (props.age && age !== +props.age)) return
    result[age]![sex]! += props.selectedMonths.length === 12 ? annual : sum(props.selectedMonths.map(i => monthly[i] ?? 0)) / Math.max(1,props.selectedMonths.length)
  }
  if (props.benefit === '') {
    for (const [district,sex,age,annual,monthly] of data.cubePeople) add(district,sex,age,annual,monthly)
  } else {
    for (const [district,type,sex,age,annual,monthly] of data.cube) if (type === +props.benefit) add(district,sex,age,annual,monthly)
  }
  return result
})
const recipients = computed(() => {
  if (props.district) return []
  return data.families.filter(f => props.region === '' || f.region === +props.region).flatMap(f => f.members.flatMap(m => {
    if (props.age && (m.age === null || [17,29,59,Infinity].findIndex(limit => m.age! <= limit) !== +props.age)) return []
    if (props.sex && (m.sex === 'а' ? 1 : 0) !== +props.sex) return []
    if (!findText(m.name+' '+m.id+' '+f.id, query.value)) return []
    const payments = m.allowances.filter(([type]) => props.benefit === '' || type === +props.benefit)
    const values = props.selectedMonths.map(i => sum(payments.map(([,arr]) => arr[i] ?? 0)))
    const total = sum(values)
    return total ? [{family:f.id, member:m, values,total}] : []
  })).sort((a,b) => b.total-a.total)
})
const output = computed<ReportOutput>(() => ({
  title: 'Fuqaro bo‘yicha to‘lovlar',
  metadata: [
    ['Manba', 'Shaxsiy yozuvlar namunasi · 2025-yil'], ['Hudud', scopeRegion(props.region)],
    ['Tuman', props.district ? data.districts[+props.district]?.[1] ?? '' : 'Barchasi'],
    ['Oylar', scopeMonths(props.selectedMonths)],
    ['Nafaqa turi', props.benefit ? data.benefitTypes[+props.benefit] ?? '' : 'Barchasi'],
    ['Jins', props.sex === '0' ? 'Erkak' : props.sex === '1' ? 'Ayol' : 'Barchasi'],
    ['Yosh guruhi', props.age ? ageGroups[+props.age] ?? '' : 'Barchasi'],
    ['Qidirish', query.value || 'Barchasi'], ['Yozuvlar', recipients.value.length],
  ],
  columns: ['Fuqaro', 'Fuqaro kodi', 'Oila kodi', 'Jami, so‘m', ...props.selectedMonths.map(month => months[month] + ' · so‘m')],
  rows: recipients.value.map(row => [row.member.name, row.member.id, row.family, row.total, ...row.values]),
}))
watch(recipients, () => page.value=1)
</script>
<template>
  <section class="np-card">
    <h3>{{ benefitText("Yosh va jins kesimida oluvchilar") }}</h3>
    <small>{{ benefitText(selectedMonths.length === 12 ? 'Yillik hisob' : 'Tanlangan oylarda o‘rtacha') }}{{ benefitText(" · nafar") }}</small>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Yosh") }}</th><th>{{ benefitText("Erkak") }}</th><th>{{ benefitText("Ayol") }}</th><th>{{ benefitText("Jami") }}</th></tr></thead>
      <tbody><tr v-for="(row,i) in demographics" :key="i"><td>{{ benefitText(ageGroups[i]) }}</td><td>{{ num(row[0]!) }}</td><td>{{ num(row[1]!) }}</td><td>{{ num(sum(row)) }}</td></tr></tbody></table></div>
  </section>
  <section v-if="!district && !sex && !age && !benefit && selectedMonths.length===12" class="np-card">
    <h3>{{ benefitText("Nafaqa oluvchilar tarkibi") }}</h3><small>2025 · {{ benefitText(region === '' ? 'Respublika' : benefitText(data.regions[+region])) }}{{ benefitText(" · nafar") }}</small>
    <div class="profile-grid"><div v-for="group in profiles" :key="group.key"><h4>{{ benefitText(group.title) }}</h4>
      <div v-for="(label,i) in group.labels" :key="label" class="profile-stat"><span>{{ benefitText(label) }}</span><b>{{ num(group.values[i]!) }}</b><progress :value="group.values[i]" :max="Math.max(1,...group.values)"/></div>
    </div></div>
  </section>
  <Teleport defer to="#support-filter-fields"><label>{{ benefitText("Fuqaro ismi yoki kodi") }}<input v-model="query" type="search"></label></Teleport>
  <section class="np-card">
    <header class="np-card-heading">
      <div><h3>{{ benefitText("Fuqaro bo‘yicha to‘lovlar · ") }}{{ benefitText(recipients.length) }}</h3><small>{{ benefitText("Shaxsiy yozuvlar namunasi · so‘m") }}</small></div>
      <ReportActions v-if="recipients.length" filename="Fuqaro_tolovlari.xlsx" :report="output" csv />
    </header>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Fuqaro") }}</th><th>{{ benefitText("Jami") }}</th><th v-for="i in selectedMonths" :key="i">{{ benefitText(months[i]) }}</th></tr></thead>
      <tbody><tr v-for="row in recipients.slice((page-1)*15,page*15)" :key="row.member.id"><td><button class="text-button" @click="emit('family',row.family,row.member.id)">{{ benefitText(row.member.name) }}</button><small>{{ benefitText(row.member.id) }}</small></td><td>{{ num(row.total) }}</td><td v-for="(value,i) in row.values" :key="i">{{ num(value) }}</td></tr></tbody></table></div>
    <p v-if="!recipients.length">{{ benefitText(district ? 'Manbada shaxsning tuman bilan bog‘lanishi berilmagan.' : 'Tanlov bo‘yicha yozuv topilmadi.') }}</p>
    <div v-if="recipients.length>15" class="np-pagination"><button :disabled="page===1" @click="page--">{{ benefitText("Oldingi") }}</button>{{ benefitText(page) }} / {{ Math.ceil(recipients.length/15) }}<button :disabled="page*15>=recipients.length" @click="page++">{{ benefitText("Keyingi") }}</button></div>
  </section>
</template>
<style scoped>
.profile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1.5rem;margin-top:1rem}.profile-grid h4{font-weight:650;margin-bottom:.6rem}.profile-stat{display:grid;grid-template-columns:1fr auto;gap:.3rem;font-size:.8rem;margin-bottom:.6rem}.profile-stat progress{grid-column:span 2;width:100%;height:5px;accent-color:var(--primary)}
</style>
