<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed,ref,watch } from 'vue'
import { data,latin,saveCSV } from './data'
import { svod,figure,categories,searchKey,type Measure } from './svod'
const props=defineProps<{proposals:boolean}>()
const emit=defineEmits<{open:[Measure]}>()
const query=ref(''),category=ref(''),cohort=ref(''),kind=ref(''),availability=ref(''),page=ref(1)
const digital=ref('')
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
watch([query,category,cohort,kind,availability,digital],()=>page.value=1)
const kinds=[...new Set(svod.rows.map(r=>r.kind.toLowerCase()))].sort()
const master=new Map(svod.rows.map(r=>[r.row,r]))
function download(){
 if(props.proposals) saveCSV('Imtiyozlar_takliflari.csv',[['Varaq','Qator','Taklif yoki chora','Izoh','Huquqiy asos','Idora','Asosiy qator'],...reviewRows.value.map(p=>[p.sheet,p.row,latin(p.name),latin(p.note),latin(p.basis),latin(p.agency),p.masterRow??''])])
 else saveCSV('Imtiyozlar_davriy_hisoboti.csv',[['Manba qatori','Chora','Idora','Toifa','Manbadagi tur','Me’yor','2025 soni','2025 mln so‘m','2026 I chorak soni','2026 I chorak mln so‘m'],...measures.value.map(r=>[r.row,latin(r.name),latin(r.agency),latin(data.cohorts[r.cohort]),latin(r.kind),latin(r.rate),...r.figures.map(n=>n??'')])])
}
</script>
<template>
  <Teleport defer to="#support-filter-fields">
    <label>{{ benefitText("Qidirish") }}<input v-model="query" type="search" :placeholder="benefitText('Nomi, idora yoki hujjat')"></label>
    <label v-if="props.proposals">{{ benefitText("Taklif yoki qayd turi") }}<select v-model="category"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(title,key) in categories" :key="key" :value="key">{{ benefitText(title) }}</option></select></label>
    <template v-else><label>{{ benefitText("Aholi toifasi") }}<select v-model="cohort"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="(name,i) in data.cohorts" :value="String(i)" :key="i">{{ benefitText(name) }}</option></select></label>
      <label>{{ benefitText("Raqamlashtirish") }}<select v-model="digital"><option value="">{{ benefitText("Barchasi") }}</option><option value="yes">{{ benefitText("Ha") }}</option><option value="no">{{ benefitText("Yo‘q") }}</option><option value="missing">{{ benefitText("Ma’lumot berilmagan") }}</option><option value="other">{{ benefitText("Boshqa qayd") }}</option></select></label>
      <label>{{ benefitText("Manbadagi tur") }}<select v-model="kind"><option value="">{{ benefitText("Barchasi") }}</option><option v-for="k in kinds" :key="k" :value="k">{{ benefitText(k) }}</option></select></label>
      <label>{{ benefitText("Yozuvlar") }}<select v-model="availability"><option value="">{{ benefitText("Barchasi") }}</option><option value="0">{{ benefitText("2025-yilda ko‘rsatkichi bor") }}</option><option value="2">{{ benefitText("2026-yil I chorakda ko‘rsatkichi bor") }}</option><option value="review">{{ benefitText("Reyestr bilan solishtirish kerak") }}</option></select></label>
    </template>
  </Teleport>
  <div v-if="!props.proposals" class="svod-facts">
    <div><b>{{ benefitText(measures.length) }}</b><small>{{ benefitText("Tanlangan choralar") }}</small></div>
    <div v-for="(name,i) in ['2025-yil','2026-yil I chorak']" :key="name"><b>{{ benefitText(measures.filter(r=>r.figures[i*2]!=null && r.figures[i*2+1]!=null).length) }}</b><small>{{ benefitText(name) }}{{ benefitText(" · soni va summasi berilgan") }}</small></div>
    <div><b>{{ benefitText(measures.filter(r=>r.rate).length) }}</b><small>{{ benefitText("Me’yori ko‘rsatilgan") }}</small></div>
  </div>
  <section class="np-card"><header class="np-card-heading"><div><h3>{{ benefitText(count) }} {{ benefitText(props.proposals?'taklif va qayd':'chora') }}</h3><small>{{ benefitText(props.proposals?'СВОД':'СВОД · '+svod.sheet) }}</small></div><button class="np-button" @click="download">{{ benefitText("CSV") }}</button></header>
   <div class="np-table-wrap"><table v-if="props.proposals" class="np-table"><thead><tr><th>{{ benefitText("Taklif yoki chora") }}</th><th>{{ benefitText("Yo‘nalish") }}</th><th>{{ benefitText("Manba") }}</th></tr></thead><tbody>
     <tr v-for="p in reviewRows.slice(start,start+pageSize)" :key="p.sheet+p.row"><td><details><summary>{{ benefitText(p.name) }}</summary><p v-if="p.note">{{ benefitText(p.note) }}</p><small>{{ benefitText(p.basis) }} · {{ benefitText(p.agency) }}</small><button v-if="p.masterRow" class="text-button" @click="emit('open',master.get(p.masterRow)!)">{{ benefitText("Chora kartochkasi") }}</button></details></td><td>{{ benefitText(categories[p.sheet]) }}</td><td>{{ benefitText(p.sheet) }} · {{ benefitText(p.row) }}</td></tr>
   </tbody></table><table v-else class="np-table"><thead><tr><th>{{ benefitText("Chora") }}</th><th>{{ benefitText("2025 · soni") }}</th><th>{{ benefitText("2025 · mln so‘m") }}</th><th>{{ benefitText("2026 I chorak · soni") }}</th><th>{{ benefitText("2026 I chorak · mln so‘m") }}</th></tr></thead><tbody>
     <tr v-for="r in measures.slice(start,start+pageSize)" :key="r.row"><td><button class="text-button" @click="emit('open',r)">{{ benefitText(r.name) }}</button><small>{{ benefitText(r.agency) }} · {{ benefitText(r.row) }}{{ benefitText("-qator") }}</small></td><td v-for="(v,i) in r.figures" :key="i">{{ figure(v) }}</td></tr>
   </tbody></table></div><p v-if="!count" class="np-empty">{{ benefitText("Tanlov bo‘yicha yozuv yo‘q.") }}</p><small v-if="!props.proposals">{{ benefitText("— Ma’lumot berilmagan") }}</small>
   <div v-if="count>pageSize" class="np-pagination"><button :disabled="page===1" @click="page--">{{ benefitText("Oldingi") }}</button>{{ benefitText(page) }} / {{ Math.ceil(count/pageSize) }}<button :disabled="start+pageSize>=count" @click="page++">{{ benefitText("Keyingi") }}</button></div>
  </section>
</template>

<style scoped>.svod-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px;margin-bottom:16px}.svod-facts>div{display:grid;gap:4px;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:14px}.svod-facts b{font-size:24px;color:var(--primary)}.svod-facts small{color:var(--muted-foreground)}</style>
