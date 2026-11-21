<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed, ref } from 'vue'
import { Download } from 'lucide-vue-next'
import { data, latin, organization, months, financeMonths, num, saveCSV } from './data'

const props = defineProps<{year:number; region:string; agency:string; selectedMonths:number[]}>()
const group = ref('agency')
const type = ref(''), direction = ref(''), cohort = ref(''), query = ref('')
const order = ref('desc'), minimum = ref<number | ''>(''), maximum = ref<number | ''>('')
const dimensions: Record<string,string> = {agency:'Idora', measure:'Chora', month:'Oy', region:'Hudud', type:'Tur', direction:'Yo‘nalish', cohort:'Aholi toifasi'}
const report = computed(() => {
  const buckets = new Map<string,{label:string;amount:number;plan:number;plannedPaid:number; measures:Set<string>}>()
  const regions = group.value === 'region' && props.region === '' ? data.regions.map((_,i)=>String(i)) : [props.region]
  for (const line of data.finance) {
    if ((props.agency && line.o !== props.agency) || (type.value && line.t !== type.value) ||
        (direction.value && line.d !== direction.value) || (cohort.value && line.c !== cohort.value) ||
        !latin(line.n).toLowerCase().includes(latin(query.value.trim()).toLowerCase())) continue
    for (const region of regions) {
      if (region !== '' && !line.reg) continue
      const values = financeMonths(line, props.year, region)
      for (const month of props.selectedMonths) {
        const value = values[month]
        if (!value || (!value.s && !value.p)) continue
        const names: Record<string,string> = {agency:organization(line.o),measure:latin(line.n),month:months[month]!,region:latin(data.regions[+region]),type:latin(data.labels.types[line.t]),direction:latin(data.labels.directions[line.d]),cohort:latin(data.labels.cohorts[line.c])}
        const label = names[group.value]!
        const key = group.value === 'measure' ? line.id : label
        const row = buckets.get(key) ?? {label,amount:0,plan:0,plannedPaid:0,measures:new Set<string>()}
        row.amount += value.s
        row.plan += value.p
        if (value.p > 0) row.plannedPaid += value.s
        row.measures.add(line.id)
        buckets.set(key,row)
      }
    }
  }
  return [...buckets.values()].filter(row=>(minimum.value==='' || row.amount>=minimum.value) && (maximum.value==='' || row.amount<=maximum.value)).sort((a,b)=>order.value==='name'?a.label.localeCompare(b.label):order.value==='asc'?a.amount-b.amount:b.amount-a.amount)
})
const total = computed(()=>report.value.reduce((sum,row)=>sum+row.amount,0))
const headings = computed(()=>[dimensions[group.value]!, 'Choralar soni','Summa, mlrd so‘m','Vedomost, mlrd so‘m','Ijro, %'])
function download() {
  saveCSV('Ijtimoiy_komak_hisoboti.csv', [
    ['Yil',props.year,'Oylar',props.selectedMonths.map(i=>months[i]).join(', ')],
    ['Hudud',props.region===''?'Respublika':latin(data.regions[+props.region]),'Idora',props.agency?organization(props.agency):'Barcha idoralar'],
    headings.value,...report.value.map(row=>[row.label,row.measures.size,row.amount,row.plan||'—',row.plan?num(row.plannedPaid/row.plan*100,1):'—']),
    ['Jami','',total.value],
  ])
}
</script>
<template>
  <Teleport defer to="#support-filter-fields">
    <label>{{ benefitText("Hisobot kesimi") }}<select v-model="group"><option v-for="(name,id) in dimensions" :key="id" :value="id">{{ benefitText(name) }}</option></select></label>
    <label>{{ benefitText("Chora nomi") }}<input v-model="query" type="search"/></label>
    <label>{{ benefitText("Ko‘mak turi") }}<select v-model="type"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(name,id) in data.labels.types" :key="id" :value="id">{{ benefitText(name) }}</option></select></label>
    <label>{{ benefitText("Yo‘nalish") }}<select v-model="direction"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(name,id) in data.labels.directions" :key="id" :value="id">{{ benefitText(name) }}</option></select></label>
    <label>{{ benefitText("Aholi toifasi") }}<select v-model="cohort"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(name,id) in data.labels.cohorts" :key="id" :value="id">{{ benefitText(name) }}</option></select></label>
    <label>{{ benefitText("Eng kam summa, mlrd so‘m") }}<input v-model.number="minimum" type="number" step="any" min="0"/></label>
    <label>{{ benefitText("Eng katta summa, mlrd so‘m") }}<input v-model.number="maximum" type="number" step="any" min="0"/></label>
    <label>{{ benefitText("Tartiblash") }}<select v-model="order"><option value="desc">{{ benefitText("Summasi katta avval") }}</option><option value="asc">{{ benefitText("Summasi kichik avval") }}</option><option value="name">{{ benefitText("Nomi bo‘yicha") }}</option></select></label>
  </Teleport>
  <section class="np-card"><header class="np-card-heading"><div><h3>{{ benefitText(dimensions[group]) }}{{ benefitText(" bo‘yicha hisobot") }}</h3><p>{{ benefitText(year) }} · {{ benefitText(props.selectedMonths.length) }}{{ benefitText(" oy · ") }}{{ benefitText(report.length) }}{{ benefitText(" qator · ") }}{{ num(total,2) }}{{ benefitText(" mlrd so‘m") }}</p></div><button class="np-button" @click="download"><Download :size="15"/>{{ benefitText("CSV") }}</button></header>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th v-for="name in headings" :key="name">{{ benefitText(name) }}</th></tr></thead><tbody>
      <tr v-for="(row,index) in report" :key="index"><td>{{ benefitText(row.label) }}</td><td>{{ benefitText(row.measures.size) }}</td><td>{{ num(row.amount,2) }}</td><td>{{ benefitText(row.plan?num(row.plan,2):'—') }}</td><td>{{ benefitText(row.plan?num(row.plannedPaid/row.plan*100,1):'—') }}</td></tr>
      <tr v-if="!report.length"><td colspan="5">{{ benefitText("Tanlangan shartlar bo‘yicha ma’lumot yo‘q.") }}</td></tr>
    </tbody></table></div>
  </section>
</template>
