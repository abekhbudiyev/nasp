<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import * as XLSX from 'xlsx'
import { educationState } from '../education'
import { educationMonitoring, educationStages, type EducationStage, type EducationTarget, type EducationMonitorRow, type EducationIssue } from '../education-monitoring'
function isIssue(row:EducationMonitorRow):row is EducationIssue{return 'kind' in row}
const props=defineProps<{date:string}>()
const emit=defineEmits<{open:[target:EducationTarget]}>()
const region=ref(''),month=ref('2026-10'),unboundDays=ref(14),stage=ref<EducationStage|null>(null),kind=ref(''),query=ref(''),page=ref(1),expanded=ref(true)
const regions=computed(()=>[...new Set(educationState.children.map(c=>c.region))])
const result=computed(()=>educationMonitoring(props.date,month.value,region.value,unboundDays.value))
const kinds=[{id:'deadline',name:'Kechikish'},{id:'unbound',name:'Bog‘lanmagan'},{id:'attendance',name:'Davomat'},{id:'finance',name:'Moliya javobi yo‘q'},{id:'difference',name:'Hisob / to‘lov farqi'}]
const filtered=computed(()=>{const rows=stage.value?result.value.stages[stage.value]:result.value.issues.filter(i=>!kind.value||i.kind===kind.value);const q=query.value.trim().toLocaleLowerCase();return rows.filter(r=>!q||[r.child,r.reference,r.detail].join(' ').toLocaleLowerCase().includes(q))})
const pages=computed(()=>Math.max(1,Math.ceil(filtered.value.length/5))),rows=computed(()=>filtered.value.slice((page.value-1)*5,page.value*5))
watch([region,month,unboundDays,stage,kind,query,()=>props.date],()=>page.value=1)
watch(pages,n=>{if(page.value>n)page.value=n})
function choose(id:EducationStage){stage.value=stage.value===id?null:id;kind.value='';expanded.value=true}
function exportRows(){const book=XLSX.utils.book_new();XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(filtered.value.map(r=>({Bola:r.child,Hudud:r.region,Yozuv:r.reference,Holat:isIssue(r)?r.title:educationStages.find(s=>s.id===stage.value)?.label,Dalil:r.detail,Amal:isIssue(r)?r.next:'Yozuvni ochish'}))),'Nazorat');XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet([{Sana:props.date,Oy:month.value,Hudud:region.value||'Barcha hududlar','Boglanmaganlik chegarasi':unboundDays.value,Izoh:'NAMUNA. Jarayon joriy holat bo‘yicha; oy davomat va moliya signallariga qo‘llanadi. Nazorat chegarasi me’yoriy muddat emas.'}]),'Filtrlar');XLSX.writeFile(book,'Talim_jarayoni_va_muammolar.xlsx')}
</script>
<template>
<section class="em-panel" aria-label="Ta’lim jarayoni va muammolar">
 <header class="em-header"><div><h2>Jarayon va nazorat</h2><p>Barcha bolalar · joriy holat · nazorat sanasi {{ date }}</p></div><div class="em-summary"><span>{{ result.children }} bola</span><span>{{ result.vouchers }} vaucher</span><button @click="expanded=!expanded" :aria-expanded="expanded">{{ expanded?'Yig‘ish':'Batafsil' }}</button></div></header>
 <div class="em-stages"><button v-for="s in educationStages" :key="s.id" :class="['em-stage',s.tone,{selected:stage===s.id}]" :aria-pressed="stage===s.id" @click="choose(s.id)"><span>{{ s.label }}</span><b>{{ result.stages[s.id].length }}</b><small>{{ s.unit }}</small></button></div>
 <template v-if="expanded">
 <div class="em-filters"><label>Hudud<select v-model="region" aria-label="Jarayon hududi"><option value="">Barcha hududlar</option><option v-for="r in regions" :key="r">{{ r }}</option></select></label><label>Davomat / moliya oyi<input v-model="month" type="month" aria-label="Nazorat hisob oyi" /></label><label>Bog‘lanmaganlik, kun<input v-model.number="unboundDays" type="number" min="1" max="3650" aria-label="Bog‘lanmaganlik chegarasi" /></label><label>Qidiruv<input v-model="query" placeholder="Bola yoki yozuv raqami" aria-label="Nazorat yozuvlarini qidirish" /></label></div>
 <p v-if="!result.valid" class="em-error" role="alert">Sana, hisob oyi va nazorat chegarasini to‘g‘ri kiriting.</p>
 <div class="em-list-header"><button :class="['em-issues-button',{active:!stage}]" @click="stage=null;kind=''">Muammoli holatlar <b>{{ result.issues.length }}</b><span> · {{ result.affected }} bola</span></button><span v-if="stage" class="em-stage-label">{{ educationStages.find(s=>s.id===stage)?.label }}</span><button class="em-export" @click="exportRows">Excel</button></div>
 <div v-if="!stage" class="em-kinds"><button v-for="k in kinds" :key="k.id" :aria-pressed="kind===k.id" :class="{active:kind===k.id}" @click="kind=kind===k.id?'':k.id">{{ k.name }} <b>{{ result.issues.filter(i=>i.kind===k.id).length }}</b></button></div>
 <div class="em-table"><table><thead><tr><th>Bola / yozuv</th><th>{{ stage?'Holat':'Muammo va dalil' }}</th><th>Keyingi amal</th><th></th></tr></thead><tbody><tr v-for="r in rows" :key="r.id"><td><b>{{ r.child }}</b><small>{{ r.region }} · {{ r.reference }}</small></td><td><span v-if="isIssue(r)" :class="['em-badge',r.tone]">{{ r.title }}</span><p>{{ r.detail }}</p></td><td>{{ isIssue(r)?r.next:'Tegishli yozuvni ko‘rib chiqish' }}</td><td><button :aria-label="r.reference+' yozuvini ochish'" @click="emit('open',r)">Ochish →</button></td></tr><tr v-if="!rows.length"><td colspan="4" class="em-empty">{{ stage?'Ushbu bosqichda yozuv yo‘q.':'Tanlangan qamrovda nazorat signali topilmadi.' }}</td></tr></tbody></table></div>
 <footer class="em-footer"><small>{{ filtered.length }} yozuv · {{ page }} / {{ pages }}</small><button :disabled="page<=1" @click="page--">Oldingi</button><button :disabled="page>=pages" @click="page++">Keyingi</button></footer>
 <details class="em-method"><summary>Nazorat mezonlari</summary><p>Jarayon kartalari joriy holatlarni bildiradi; murojaat va vaucher sonlari alohida sanaladi. Murojaat tasdiqlangach ham jami murojaatlar ichida qoladi. Hudud barcha kartalar va ro‘yxatga, oy esa faqat davomat va moliyaga qo‘llanadi.</p><p>Xodim uchun 3, yettilik uchun 2 ish kuni murojaatda saqlangan muddatdan tekshiriladi. Bog‘lanmaganlikning {{ unboundDays }} kunlik chegarasi — sozlanadigan demo nazorat mezoni, me’yoriy muddat emas. Past davomat &lt;90%; 90–99% holati aniqlashtirishga chiqariladi. Moliya javobi yo‘qligi nol to‘lov yoki qarzdorlikni bildirmaydi. Bir bolada bir nechta signal bo‘lishi mumkin.</p></details>
 </template>
</section>
</template>
<style scoped src="./education-monitoring.css"></style>
