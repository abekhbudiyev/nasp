<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed, ref } from 'vue'
import { data, latin, organization, months, num } from './data'
import ReportActions from './ReportActions.vue'
import FamilyPinflSearch from './FamilyPinflSearch.vue'
import { findText, financeSource, reportedMonth, scopeAgency, scopeMonths, scopeRegion, type ReportOutput } from './report-output'

const props = defineProps<{year:number; region:string; agency:string; selectedMonths:number[]}>()
const emit = defineEmits<{ family: [string]; region: [string] }>()
const group = ref('agency')
const type = ref(''), direction = ref(''), cohort = ref(''), query = ref('')
const order = ref('desc'), minimum = ref<number | ''>(''), maximum = ref<number | ''>('')
const dimensions: Record<string,string> = {agency:'Idora', measure:'Chora', month:'Oy', region:'Hudud', family:'Oila', type:'Tur', direction:'Yo‘nalish', cohort:'Aholi toifasi'}
type ReportRow = { label: string; amount: number; plan: number; plannedPaid: number; measures: Set<string>; familyId?: string; regionId?: string }
function filteredReport(rows: ReportRow[]) {
 return rows.filter(row => (minimum.value === '' || row.amount >= minimum.value) && (maximum.value === '' || row.amount <= maximum.value)).sort((a,b) => order.value === 'name' ? a.label.localeCompare(b.label) : order.value === 'asc' ? a.amount-b.amount : b.amount-a.amount)
}
const report = computed(() => {
  if (group.value === 'family') {
    if (props.year !== 2025) return []
    return filteredReport(data.families.filter(family => props.region === '' || family.region === Number(props.region)).flatMap(family => {
      let amount = 0
      const measures = new Set<string>()
      for (const member of family.members) for (const payment of member.rows) {
        const line = data.finance.find(line => line.id === payment.id)
        if ((props.agency && payment.o !== props.agency) || (type.value && payment.t !== type.value) || (direction.value && payment.d !== direction.value) || (cohort.value && line?.c !== cohort.value) || !findText(payment.n,query.value)) continue
        const paid = props.selectedMonths.reduce((total,month) => total + (payment.arr[month] ?? 0),0)
        if (paid <= 0) continue
        amount += paid / 1e9
        measures.add(payment.id)
      }
      return measures.size ? [{ label: latin(family.members[0]?.name ?? family.id) + ' · ' + latin(family.address), amount, plan: 0, plannedPaid: 0, measures, familyId: family.id }] : []
    }))
  }

  const buckets = new Map<string,ReportRow>()
  const regions = group.value === 'region' && props.region === '' ? data.regions.map((_,i)=>String(i)) : [props.region]
  for (const line of data.finance) {
    if ((props.agency && line.o !== props.agency) || (type.value && line.t !== type.value) ||
        (direction.value && line.d !== direction.value) || (cohort.value && line.c !== cohort.value) ||
        !findText(line.n, query.value)) continue
    for (const region of regions) {
      for (const month of props.selectedMonths) {
        const value = reportedMonth(line, props.year, region, month)
        if (!value) continue
        const names: Record<string,string> = {agency:organization(line.o),measure:latin(line.n),month:months[month]!,region:scopeRegion(region),type:latin(data.labels.types[line.t]),direction:latin(data.labels.directions[line.d]),cohort:latin(data.labels.cohorts[line.c])}
        const label = names[group.value]!
        const key = group.value === 'measure' ? line.id : label
        const row = buckets.get(key) ?? {label,amount:0,plan:0,plannedPaid:0,measures:new Set<string>(),regionId:group.value === 'region' ? region : undefined}
        row.amount += value.s
        row.plan += value.p
        if (value.p > 0) row.plannedPaid += value.s
        row.measures.add(line.id)
        buckets.set(key,row)
      }
    }
  }
  return filteredReport([...buckets.values()])
})
const total = computed(()=>report.value.reduce((sum,row)=>sum+row.amount,0))
const headings = computed(()=>[dimensions[group.value]!, 'Choralar soni','Summa, mlrd so‘m','Vedomost, mlrd so‘m','Ijro, %'])
const title = computed(() => dimensions[group.value] + ' bo‘yicha hisobot')
const source = computed(() => group.value === 'family' ? '2025-yil mavjud oila pasportlari · respublika bo‘yicha to‘liq oilalar reyestri emas' : financeSource(props.year, props.selectedMonths))
const scope = computed(() => [props.year, scopeMonths(props.selectedMonths), scopeRegion(props.region), scopeAgency(props.agency)].join(' · '))
const output = computed<ReportOutput>(() => ({
  title: title.value,
  metadata: [
    ['Yil', props.year], ['Oylar', scopeMonths(props.selectedMonths)], ['Hudud', scopeRegion(props.region)],
    ['Idora', scopeAgency(props.agency)], ['Kesim', dimensions[group.value]!], ['Manba', source.value],
    ['Chora nomi', query.value || 'Barchasi'], ['Tur', type.value ? latin(data.labels.types[type.value]) : 'Barchasi'],
    ['Yo‘nalish', direction.value ? latin(data.labels.directions[direction.value]) : 'Barchasi'],
    ['Aholi toifasi', cohort.value ? latin(data.labels.cohorts[cohort.value]) : 'Barchasi'],
    ['Eng kam summa, mlrd so‘m', minimum.value === '' ? null : minimum.value],
    ['Eng katta summa, mlrd so‘m', maximum.value === '' ? null : maximum.value],
    ['Qatorlar soni', report.value.length], ['Jami summa, mlrd so‘m', report.value.length ? total.value : null],
    ['Qamrov', group.value === 'region' || props.region !== '' ? 'Hududiy ma’lumot manbada berilgan choralar' : 'Moliyaviy chora jadvallari'],
    ['Vedomost ijrosi', 'Reja summasi berilgan davr va choralar bo‘yicha'],
  ],
  columns: headings.value,
  rows: report.value.map(row => [row.label, row.measures.size, row.amount, row.plan || null, row.plan ? row.plannedPaid / row.plan * 100 : null]),
}))
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
  <section class="np-card">
    <FamilyPinflSearch @open="emit('family', $event)" />
    <div class="report-cuts" :aria-label="benefitText('Hisobot kesimi')"><button v-for="cut in [{key:'agency',label:'Vazirlik va idoralar'},{key:'region',label:'Hududlar'},{key:'family',label:'Oilalar'}]" :key="cut.key" type="button" :aria-pressed="group===cut.key" @click="group=cut.key">{{ benefitText(cut.label) }}</button></div>
    <header class="np-card-heading">
      <div>
        <h3>{{ benefitText(title) }}</h3>
        <p>{{ benefitText(scope) }}</p>
        <p>{{ benefitText(source) }}</p>
      </div>
      <ReportActions filename="Ijtimoiy_komak_hisoboti.xlsx" :report="output" csv print />
    </header>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th v-for="name in headings" :key="name">{{ benefitText(name) }}</th></tr></thead><tbody>
      <tr v-for="(row,index) in report" :key="index"><td><button v-if="row.familyId" type="button" class="text-button" @click="emit('family',row.familyId)">{{ benefitText(row.label) }}</button><button v-else-if="row.regionId !== undefined" type="button" class="text-button" @click="emit('region',row.regionId)">{{ benefitText(row.label) }}</button><span v-else>{{ benefitText(row.label) }}</span></td><td>{{ benefitText(row.measures.size) }}</td><td>{{ num(row.amount,2) }}</td><td>{{ benefitText(row.plan?num(row.plan,2):'—') }}</td><td>{{ benefitText(row.plan?num(row.plannedPaid/row.plan*100,1):'—') }}</td></tr>
      <tr v-if="!report.length"><td colspan="5">{{ benefitText("Tanlangan shartlar bo‘yicha ma’lumot yo‘q.") }}</td></tr>
    </tbody><tfoot v-if="report.length"><tr><th scope="row">{{ benefitText('Tanlangan qatorlar jami') }}</th><td>—</td><td><b>{{ num(total, 2) }}</b></td><td>—</td><td>—</td></tr></tfoot></table></div>
    <p class="np-note">{{ benefitText('— Ma’lumot berilmagan. Vedomost ijrosi reja summasi mavjud yozuvlar bo‘yicha hisoblanadi.') }}</p>
  </section>
</template>

<style scoped>
.report-cuts { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.report-cuts button { padding: 8px 12px; border: 1px solid var(--border); border-radius: 9px; font-size: 13px; }
.report-cuts button[aria-pressed="true"] { background: var(--primary); border-color: var(--primary); color: var(--primary-foreground,white); }
</style>
