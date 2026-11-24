<script setup lang="ts">
import { computed, ref } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, auditTitles, money, months, num, organization, sum, type Family } from './data'
import { fundingCoverage } from './report-output'
import RegionMap from './RegionMap.vue'
import PlatformRanking from './PlatformRanking.vue'
import FamilyPinflSearch from './FamilyPinflSearch.vue'

const props = defineProps<{ page: 'dashboard' | 'registry' | 'family' | 'audit'; family?: Family }>()
const emit = defineEmits<{ navigate: [page: string]; region: [index: string, mode: string, signal?: number]; family: [id: string, member?: string]; measure: [id: string]; signal: [index: number]; registry: [dimension: string, index: number] }>()
const mapMode = ref('amount')
const auditIndex = ref(0)
const familyId = ref('')
const selectedFamily = computed(() => data.families.find(item => item.id === familyId.value) ?? props.family)
const allMonths = months.map((_, index) => index)
const baseline = fundingCoverage(data.finance, 2025, '', allMonths)
const overpayment = sum(data.audit.slice(0,2).map(row => row.over ?? 0)) * 1e9
const riskCases = sum(data.audit.slice(0,4).map(row => row.n))
const amountText = (amount: number | null) => amount === null ? '—' : money(amount) + ' so‘m'
const metrics = [
  { title: 'Ko‘rsatilgan ko‘mak', value: amountText(baseline.amount), caption: num(baseline.measures ?? 0) + ' ta chora', page: 'overview' },
  { title: 'Qo‘llab-quvvatlash choralari', value: num(data.registryTotal), caption: num(data.agencies.length) + ' ta idora', page: 'registry' },
  { title: 'Nafaqa oluvchilar', value: num(data.demographics.persons), caption: '2025-yil nafaqa bazasi', page: 'people' },
  { title: 'Tekshirilgan to‘lov yozuvlari', value: num(data.demographics.rows), caption: num(riskCases) + ' ta signal', page: 'audit' },
  { title: 'Ortiqcha to‘lov signallari summasi', value: amountText(overpayment), caption: 'Ikki turdagi signal', page: 'audit' },
]
const regionRows = computed(() => data.regions.map((label,index) => {
  const sourceIndex = data.regionMap.indexOf(index)
  let value: number | null
  if (props.page === 'audit') value = data.audit[auditIndex.value]?.reg[sourceIndex]?.[0] ?? null
  else if (mapMode.value === 'people') value = sum(data.cubePeople.filter(([district]) => data.districts[district]?.[0] === sourceIndex).map(row => row[3]))
  else if (mapMode.value === 'risks') value = sum(data.audit.slice(0,4).map(row => row.reg[sourceIndex]?.[0] ?? 0))
  else value = fundingCoverage(data.finance, 2025, String(index), allMonths).amount
  return { key: String(index), label, value }
}))
const countMap = computed(() => props.page === 'audit' || mapMode.value !== 'amount')
const rankedRegions = computed(() => [...regionRows.value].sort((a,b) => (b.value ?? -1) - (a.value ?? -1)))
const registryGroups = [
  { key: 'type', title: 'Choralar qanday turga bo‘linadi', rows: data.types.map((label,index) => ({ key: String(index), label, value: data.typeTotals[index] ?? 0 })) },
  { key: 'field', title: 'Yo‘nalishlar', rows: data.fields.map((label,index) => ({ key: String(index), label, value: data.fieldTotals[index] ?? 0 })).sort((a,b) => b.value-a.value) },
  { key: 'agency', title: 'Eng ko‘p chora ko‘rsatadigan idoralar', rows: data.agencies.map((row,index) => ({ key: String(index), label:row.n,value:row.c })).sort((a,b)=>b.value-a.value).slice(0,10) },
  { key: 'cohort', title: 'Kimga qaratilgan', rows: data.cohortTotals.map((row,index) => ({ key:String(index),label:row.n,value:row.v[0] ?? 0 })).sort((a,b)=>b.value-a.value) },
]
const fundedAgencies = Object.entries(data.organizations).map(([key,label]) => ({ key,label,value:fundingCoverage(data.finance.filter(row=>row.o===key),2025,'',allMonths).amount })).filter(row=>(row.value ?? 0)>0).sort((a,b)=>b.value!-a.value!)
const fundedMeasures = data.finance.map(row=>({key:row.id,label:row.n,value:fundingCoverage([row],2025,'',allMonths).amount})).sort((a,b)=>(b.value ?? 0)-(a.value ?? 0)).slice(0,5)
const monthlyFunding = months.map((label,index)=>({key:String(index),label,value:fundingCoverage(data.finance,2025,'',[index]).amount}))
const planned = data.finance.filter(row=>row.o==='agency').flatMap(row=>row.periods.find(p=>p.year===2025)?.regions.find(r=>r.region==='')?.months ?? []).filter(row=>row.p>0)
const plan = sum(planned.map(row=>row.p))
const paid = sum(planned.map(row=>row.s))
const payments = computed(()=>selectedFamily.value?.members.flatMap(member=>member.rows) ?? [])
const memberRows = computed(()=>selectedFamily.value?.members.map(member=>({key:member.id,label:member.name,value:sum(member.rows.flatMap(row=>row.arr))})) ?? [])
const familyAgencies = computed(()=>[...new Set(payments.value.map(row=>row.o))].map(key=>({key,label:organization(key),value:sum(payments.value.filter(row=>row.o===key).flatMap(row=>row.arr))})).sort((a,b)=>b.value-a.value))
const familyMonths = computed(()=>months.map((label,index)=>({key:String(index),label,value:sum(payments.value.map(row=>row.arr[index] ?? 0))})))
const familyAmount = computed(()=>sum(memberRows.value.map(row=>row.value)))
const familyChoices = computed(()=>[...new Map([props.family,...data.families.filter(f=>f.members.every(m=>m.source)).slice(0,4),...data.families.filter(f=>f.members.some(m=>!m.source)).slice(0,3)].filter(f=>f!==undefined).map(f=>[f.id,f])).values()])
</script>

<template>
  <div class="reference-panels">
    <template v-if="page === 'dashboard'">
      <p class="dashboard-source">{{ benefitText('2025-yil manba ko‘rsatkichlari') }}</p>
      <div class="dashboard-metrics">
        <button v-for="metric in metrics" :key="metric.title" class="np-card dashboard-metric" type="button" @click="emit('navigate',metric.page)">
          <span>{{ benefitText(metric.title) }}</span><strong>{{ benefitText(metric.value) }}</strong><small>{{ benefitText(metric.caption) }}</small>
        </button>
      </div>
    </template>
    <template v-if="page === 'dashboard' || page === 'audit'">
      <template v-if="page === 'audit'">
        <section class="np-card reference-hero">
          <p>{{ benefitText('2025-yil nafaqa bazasidagi ortiqcha to‘lov signallari') }}</p>
          <strong>{{ benefitText(amountText(overpayment)) }}</strong>
          <p>{{ num(riskCases) }} {{ benefitText('ta tekshirish signali qayd etilgan.') }}</p>
        </section>
        <PlatformRanking :title="'Platforma qanday tekshiradi'" :rows="[{ key:'rows',label:'To‘lov yozuvlari',value:data.demographics.rows },{ key:'people',label:'Nafaqa oluvchilar',value:data.demographics.persons },{ key:'risks',label:'Tekshirish signallari',value:riskCases }]" />
        <section class="np-card reference-selectors">
          <h3>{{ benefitText('Aniqlangan holatlar') }}</h3>
          <button v-for="(item,index) in data.audit" :key="item.k" type="button" :aria-pressed="auditIndex===index" @click="auditIndex=index">{{ benefitText(auditTitles[index]) }} · {{ num(item.n) }}</button>
          <button type="button" class="np-button" @click="emit('signal',auditIndex)">{{ benefitText('Holatlar tafsiloti') }}</button>
        </section>
      </template>
      <section class="np-card reference-map">
        <header><h3>{{ benefitText(page==='audit' ? auditTitles[auditIndex] : 'O‘zbekiston bo‘yicha') }}</h3>
          <div v-if="page==='dashboard'" class="reference-selectors" :aria-label="benefitText('Xarita ko‘rsatkichi')">
            <button v-for="item in [{key:'amount',name:'Ko‘mak summasi'},{key:'people',name:'Nafaqa oluvchilar'},{key:'risks',name:'Nazorat holatlari'}]" :key="item.key" type="button" :aria-pressed="mapMode===item.key" @click="mapMode=item.key">{{ benefitText(item.name) }}</button>
          </div>
        </header>
        <div class="reference-columns">
          <RegionMap :values="regionRows.map(row=>row.value)" :selected="''" :count="countMap" @select="emit('region',$event,page==='audit'?'audit':mapMode,auditIndex)" />
          <PlatformRanking :title="page==='audit'?'Eng ko‘p holat qayd etilgan hududlar':'Hududlar reytingi'" :rows="rankedRegions.slice(0,5)" :money-values="!countMap" interactive @select="emit('region',$event,page==='audit'?'audit':mapMode)" />
        </div>
        <p>{{ benefitText(page==='dashboard' && mapMode==='amount' ? 'Hududiy moliyalashtirish manbada hududlar kesimida qayd etilgan choralarni qamraydi.' : '2025-yil nafaqa bazasi') }}</p>
      </section>
    </template>
    <template v-if="page === 'dashboard'">
      <div class="reference-columns">
        <PlatformRanking title="Idoralar ulushi" :rows="fundedAgencies" money-values share />
        <PlatformRanking title="Tur bo‘yicha" :rows="registryGroups[0]!.rows" />
        <PlatformRanking title="Eng katta 5 ta chora" :rows="fundedMeasures" money-values interactive @select="emit('measure',$event)" />
        <PlatformRanking title="Oyma-oy" :rows="monthlyFunding" money-values />
        <section class="np-card reference-hero"><h3>{{ benefitText('Vedomost ijrosi (IHMA)') }}</h3><strong>{{ plan ? num(paid/plan*100,1)+'%' : '—' }}</strong><p>{{ benefitText(amountText(paid*1e9)) }} / {{ benefitText(amountText(plan*1e9)) }}</p></section>
        <PlatformRanking title="Nafaqa oluvchilar kimlar" :rows="data.benefitTypes.map((label,index)=>({key:String(index),label,value:sum(data.cube.filter(row=>row[1]===index).map(row=>row[4]))}))" />
      </div>
    </template>
    <template v-if="page === 'registry'">
      <section class="np-card reference-hero"><p>{{ benefitText('Davlat ijtimoiy qo‘llab-quvvatlash choralari') }}</p><strong>{{ num(data.registryTotal) }} {{ benefitText('ta chora') }}</strong><p>{{ num(data.agencies.length) }} {{ benefitText('ta vazirlik va idora') }}</p></section>
      <div class="reference-columns">
        <PlatformRanking v-for="group in registryGroups" :key="group.key" :title="group.title" :rows="group.rows" :share="group.key==='type'" interactive @select="emit('registry',group.key,Number($event))" />
      </div>
      <section class="np-card reference-examples"><h3>{{ benefitText('Choralardan misollar') }}</h3><ul><li v-for="row in data.registry.slice(0,4)" :key="row.id"><strong>{{ benefitText(row.n) }}</strong><span>{{ benefitText(row.o) }}</span></li></ul></section>
    </template>
    <template v-if="page === 'family' && selectedFamily">
      <section class="np-card"><FamilyPinflSearch @open="(id,member)=>emit('family',id,member)" /></section>
      <div class="np-card reference-selectors">
        <button v-for="item in familyChoices" :key="item.id" type="button" :aria-pressed="selectedFamily.id===item.id" @click="familyId=item.id">{{ benefitText(item.members[0]?.name ?? item.id) }}</button>
      </div>
      <section class="np-card reference-hero"><p>{{ benefitText(selectedFamily.members[0]?.name) }} · {{ benefitText(data.regions[selectedFamily.region]) }}</p><strong>{{ benefitText(amountText(familyAmount)) }}</strong><p>{{ num(selectedFamily.members.length) }} {{ benefitText('nafar oila a’zosi') }} · {{ num(familyAgencies.length) }} {{ benefitText('ta idora') }} · {{ num(new Set(payments.map(row=>row.id)).size) }} {{ benefitText('ta chora') }} · 2025</p><button class="np-button" type="button" @click="emit('family',selectedFamily.id)">{{ benefitText('Oila pasportini ochish') }}</button></section>
      <div class="reference-columns"><PlatformRanking title="Ko‘mak oila a’zolari o‘rtasida" :rows="memberRows" money-values /><PlatformRanking title="Qaysi idoradan" :rows="familyAgencies" money-values /></div>
      <PlatformRanking title="Oyma-oy" :rows="familyMonths" money-values />
    </template>
  </div>
</template>

<style scoped>
.reference-panels { display: grid; gap: 18px; min-width: 0; }
.reference-columns { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; }
.dashboard-metrics { display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 12px; }
.dashboard-metric { display: grid; gap: 8px; text-align: start; }
.dashboard-metric strong { font-size: 22px; color: var(--primary); }
.dashboard-source,.dashboard-metric :is(span,small),.reference-map p,.reference-hero p,.reference-examples span { color: var(--muted-foreground); font-size: 13px; }
.reference-hero { border-inline-start: 5px solid var(--primary); display: grid; gap: 12px; }
.reference-hero > strong { color: var(--primary); font-size: clamp(30px,5vw,58px); line-height: 1.1; }
.reference-hero button { justify-self: start; }
.reference-map header,.reference-selectors { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.reference-selectors button { padding: 7px 12px; border-radius: 9px; border: 1px solid var(--border); font-size: 13px; }
.reference-selectors button[aria-pressed="true"] { background: var(--accent); color: var(--primary); border-color: var(--primary); }
.reference-examples ul { display: grid; padding: 0; list-style: none; margin-top: 10px; }
.reference-examples li { display: grid; gap: 4px; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
@media (max-width: 850px) { .reference-columns { grid-template-columns: minmax(0,1fr); } }
</style>
