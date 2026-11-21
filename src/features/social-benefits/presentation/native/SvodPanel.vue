<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed,ref,watch } from 'vue'
import { data } from './data'
import { svod,figure,categories,searchKey,type Measure } from './svod'
import ReportActions from './ReportActions.vue'
import type { ReportOutput } from './report-output'
const props=defineProps<{proposals:boolean}>()
const emit=defineEmits<{open:[Measure]}>()
const query=ref(''),category=ref(''),cohort=ref(''),kind=ref(''),availability=ref(''),page=ref(1)
const digital=ref(''), period=ref('all')
const periods=[
  { id:'2025', label:'2025-yil', columns:['2025 · soni','2025 · mln so‘m'], indices:[0,1] },
  { id:'2026q1', label:'2026-yil I chorak', columns:['2026 I chorak · soni','2026 I chorak · mln so‘m'], indices:[2,3] },
]
const visiblePeriods=computed(()=>periods.filter(item=>period.value==='all'||period.value===item.id))
const visibleColumns=computed(()=>visiblePeriods.value.flatMap(item=>item.columns))
const visibleIndices=computed(()=>visiblePeriods.value.flatMap(item=>item.indices))
function digitalStatus(value:string) {
 if(!value) return 'missing'
 if(['ҳа','ха'].includes(value.toLowerCase())) return 'yes'
 if(value.toLowerCase()==='йўқ') return 'no'
 return 'other'
}
const pageSize=20
const matches=(...texts:string[])=>texts.some(text=>searchKey(text).includes(searchKey(query.value)))
const measures=computed(()=>svod.rows.filter(r=>(!digital.value || digitalStatus(r.digital)===digital.value) && (!kind.value || r.kind.toLowerCase()===kind.value) &&
  (!cohort.value || r.cohort===Number(cohort.value)) && matches(r.name,r.agency,r.system,r.basis) &&
  (!availability.value || (availability.value==='review'? !r.registryIds.length :
  r.figures.slice(+availability.value,+availability.value+2).some(n=>n!==null)))))
const reviewRows=computed(()=>svod.proposals.filter(p=>(!category.value||p.sheet===category.value)&&matches(p.name,p.note,p.agency,p.basis)))
const count=computed(()=>props.proposals?reviewRows.value.length:measures.value.length)
const start=computed(()=>(page.value-1)*pageSize)
watch([query,category,cohort,kind,availability,digital,period,()=>props.proposals],()=>page.value=1)
const kinds=[...new Set(svod.rows.map(r=>r.kind.toLowerCase()))].sort()
const master=new Map(svod.rows.map(r=>[r.row,r]))
const digitalLabels:Record<string,string>={yes:'Ha',no:'Yo‘q',missing:'Ma’lumot berilmagan',other:'Boshqa qayd'}
const availabilityLabels:Record<string,string>={
  '0':'2025-yilda ko‘rsatkichi bor',
  '2':'2026-yil I chorakda ko‘rsatkichi bor',
  review:'Reyestr bilan solishtirish kerak',
}
const title=computed(()=>props.proposals?'Taklif va qaydlar':'Imtiyozlar hisoboti')
const output=computed<ReportOutput>(()=> {
  const metadata:ReportOutput['metadata']=[
    ['Manba',props.proposals?'SVOD · taklif varaqlari':svod.sheet],
    ['Qidirish',query.value||'Barchasi'],['Tanlangan qatorlar',count.value],
  ]
  if (props.proposals) {
    metadata.push(['Taklif turi',categories[category.value]||'Barchasi'])
    return {
      title:title.value, metadata,
      columns:['Varaq','Qator','Taklif yoki chora','Izoh','Huquqiy asos','Idora','Asosiy qator'],
      rows:reviewRows.value.map(p=>[p.sheet,p.row,p.name,p.note,p.basis,p.agency,p.masterRow]),
    }
  }
  metadata.push(
    ['Davr',visiblePeriods.value.map(item=>item.label).join(' · ')],
    ['Aholi toifasi',data.cohorts[Number(cohort.value)]&&cohort.value!==''?data.cohorts[Number(cohort.value)]!:'Barchasi'],
    ['Raqamlashtirish',digitalLabels[digital.value]||'Barchasi'],['Manbadagi tur',kind.value||'Barchasi'],
    ['Yozuvlar',availabilityLabels[availability.value]||'Barchasi'],
    ['Bo‘sh katak','Manbada ma’lumot berilmagan'],
  )
  return {
    title:title.value, metadata,
    columns:['Manba qatori','Chora','Idora','Toifa','Manbadagi tur','Me’yor',...visibleColumns.value],
    rows:measures.value.map(r=>[r.row,r.name,r.agency,data.cohorts[r.cohort]??'',r.kind,r.rate,
      ...visibleIndices.value.map(index=>r.figures[index]??null)]),
  }
})
</script>
<template>
  <Teleport defer to="#support-filter-fields">
    <label>{{ benefitText("Qidirish") }}<input v-model="query" type="search" :placeholder="benefitText('Nomi, idora yoki hujjat')"></label>
    <label v-if="props.proposals">{{ benefitText("Taklif yoki qayd turi") }}<select v-model="category"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(title,key) in categories" :key="key" :value="key">{{ benefitText(title) }}</option></select></label>
    <template v-else>
      <label>{{ benefitText('Ko‘rsatiladigan davr') }}<select v-model="period"><option value="all">{{ benefitText('Har ikki davr') }}</option><option v-for="item in periods" :key="item.id" :value="item.id">{{ benefitText(item.label) }}</option></select></label>
      <label>{{ benefitText("Aholi toifasi") }}<select v-model="cohort"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(name,i) in data.cohorts" :value="String(i)" :key="i">{{ benefitText(name) }}</option></select></label>
      <label>{{ benefitText("Raqamlashtirish") }}<select v-model="digital"><option value="">{{ benefitText("Barchasi") }}</option><option value="yes">{{ benefitText("Ha") }}</option><option value="no">{{ benefitText("Yo‘q") }}</option><option value="missing">{{ benefitText("Ma’lumot berilmagan") }}</option><option value="other">{{ benefitText("Boshqa qayd") }}</option></select></label>
      <label>{{ benefitText("Manbadagi tur") }}<select v-model="kind"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="k in kinds" :key="k" :value="k">{{ benefitText(k) }}</option></select></label>
      <label>{{ benefitText("Yozuvlar") }}<select v-model="availability"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="[key,label] in Object.entries(availabilityLabels)" :key="key" :value="key">{{ benefitText(label) }}</option></select></label>
    </template>
  </Teleport>
  <div v-if="!props.proposals" class="svod-facts">
    <div><b>{{ benefitText(measures.length) }}</b><small>{{ benefitText("Tanlangan choralar") }}</small></div>
    <div v-for="item in visiblePeriods" :key="item.id"><b>{{ benefitText(measures.filter(r=>item.indices.every(index=>r.figures[index]!=null)).length) }}</b><small>{{ benefitText(item.label) }}{{ benefitText(" · soni va summasi berilgan") }}</small></div>
    <div><b>{{ benefitText(measures.filter(r=>r.rate).length) }}</b><small>{{ benefitText("Me’yori ko‘rsatilgan") }}</small></div>
  </div>
  <section class="np-card"><header class="np-card-heading"><div><h3>{{ benefitText(count) }} {{ benefitText(props.proposals?'taklif va qayd':'chora') }}</h3><small>{{ benefitText(props.proposals?'Excel · taklif varaqlari':svod.sheet+' · '+visiblePeriods.map(item=>item.label).join(' / ')) }}</small></div><ReportActions :filename="props.proposals?'Imtiyozlar_takliflari.xlsx':'Imtiyozlar_davriy_hisoboti.xlsx'" :report="output" csv print /></header>
   <div class="np-table-wrap"><table v-if="props.proposals" class="np-table"><thead><tr><th>{{ benefitText("Taklif yoki chora") }}</th><th>{{ benefitText("Yo‘nalish") }}</th><th>{{ benefitText("Manba") }}</th></tr></thead><tbody>
     <tr v-for="p in reviewRows.slice(start,start+pageSize)" :key="p.sheet+p.row"><td><details><summary>{{ benefitText(p.name) }}</summary><p v-if="p.note">{{ benefitText(p.note) }}</p><small>{{ benefitText(p.basis) }} · {{ benefitText(p.agency) }}</small><button v-if="p.masterRow" class="text-button" @click="emit('open',master.get(p.masterRow)!)">{{ benefitText("Chora kartochkasi") }}</button></details></td><td>{{ benefitText(categories[p.sheet]) }}</td><td>{{ benefitText(p.sheet) }} · {{ benefitText(p.row) }}</td></tr>
   </tbody></table><table v-else class="np-table"><thead><tr><th>{{ benefitText("Chora") }}</th><th v-for="column in visibleColumns" :key="column">{{ benefitText(column) }}</th></tr></thead><tbody>
     <tr v-for="r in measures.slice(start,start+pageSize)" :key="r.row"><td><button class="text-button" @click="emit('open',r)">{{ benefitText(r.name) }}</button><small>{{ benefitText(r.agency) }} · {{ benefitText(r.row) }}{{ benefitText("-qator") }}</small></td><td v-for="index in visibleIndices" :key="index">{{ figure(r.figures[index]??null) }}</td></tr>
   </tbody></table></div><p v-if="!count" class="np-empty">{{ benefitText("Tanlov bo‘yicha yozuv yo‘q.") }}</p><small v-if="!props.proposals">{{ benefitText("— Ma’lumot berilmagan") }}</small>
   <div v-if="count>pageSize" class="np-pagination"><button :disabled="page===1" @click="page--">{{ benefitText("Oldingi") }}</button>{{ benefitText(page) }} / {{ Math.ceil(count/pageSize) }}<button :disabled="start+pageSize>=count" @click="page++">{{ benefitText("Keyingi") }}</button></div>
  </section>
</template>

<style scoped>.svod-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px;margin-bottom:16px}.svod-facts>div{display:grid;gap:4px;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:14px}.svod-facts b{font-size:24px;color:var(--primary)}.svod-facts small{color:var(--muted-foreground)}</style>
