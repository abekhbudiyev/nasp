<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Download } from 'lucide-vue-next'
import { Button } from '@/shared/ui/shadcn/button'
import {voucherProfileExport} from '../voucher-profile'
import {voucherIncomeExport} from '../voucher-income'
import * as XLSX from 'xlsx'
import logoMark from '@/assets/logo-mark.svg'
import VoucherDetailExtras from '../components/VoucherDetailExtras.vue'
import {educationRecords} from '../voucher-records'
import EducationRegistry from './EducationRegistry.vue'
import type { EducationTarget } from '../education-monitoring'
import { educationState as state, ensureEducationExchangeCases, clubs, educationPlacements, educationSubjects, directions, expiry, educationVoucherStatus, educationVoucherMonths } from '../education'
import './kindergarten-vouchers.css'
ensureEducationExchangeCases()
const router=useRouter(),recordError=ref('')
const currentRecord=computed(()=>educationRecords(date).find(r=>r.id===selectedId.value))
const route=useRoute(),detailOpen=ref(false),selectedId=ref(state.vouchers[0]!.id),date='2026-11-03'
const voucher=computed(()=>state.vouchers.find(v=>v.id===selectedId.value)!),child=computed(()=>state.children.find(c=>c.id===voucher.value.childId)!),club=computed(()=>clubs.find(c=>c.id===voucher.value.clubId)),status=computed(()=>educationVoucherStatus(voucher.value,date)),months=computed(()=>educationVoucherMonths(voucher.value))
const subject=computed(()=>educationSubjects.find(s=>s.id===voucher.value.subjectId))
const siblings=computed(()=>state.vouchers.filter(v=>v.childId===child.value.id&&v.requestId===voucher.value.requestId))
const stage=computed(()=>!voucher.value.start?1:status.value==='Muddati yakunlangan'?3:2),stages=['Vaucher yaratildi · vazirlik xabardor','Vazirlik xabari · faollashtirish','Oylik to‘lovlar monitoringi']
const totals=computed(()=>{const course=months.value.filter(m=>m.course!==null),travel=months.value.filter(m=>m.travel!==null);return {months:course.length,course:course.length?course.reduce((n,m)=>n+m.course!,0):null,travel:travel.length?travel.reduce((n,m)=>n+m.travel!,0):null}})
function openMonitoring(target:EducationTarget){const record=state.vouchers.find(v=>v.id===target.recordId)??state.vouchers.find(v=>v.id===state.monthly.find(m=>m.id===target.recordId)?.voucherId)??state.vouchers.find(v=>v.childId===target.childId);if(record){selectedId.value=record.id;detailOpen.value=true;router.replace({query:{...route.query,voucher:record.id}})}}
function closeDetail(){detailOpen.value=false;const {voucher:removed,child:removedChild,...query}=route.query;router.replace({query})}
function selectVoucher(id:string){selectedId.value=id;router.replace({query:{...route.query,voucher:id}})}
watch(()=>route.query.voucher,id=>{recordError.value='';if(typeof id!=='string'){detailOpen.value=false;return}if(state.vouchers.some(v=>v.id===id)){selectedId.value=id;detailOpen.value=true}else{detailOpen.value=false;recordError.value='Vaucher topilmadi: '+id}},{immediate:true})
watch(()=>route.query.child,id=>{if(typeof id==='string'&&!route.query.voucher)openMonitoring({childId:id,recordId:'',tab:'vouchers'})},{immediate:true})
const cash=(n:number|null)=>n===null?'Ma’lumot kelmagan':n.toLocaleString('uz-UZ')+' so‘m'
const displayDate=(s:string|null|undefined)=>s?s.split('-').reverse().join('.'):'—'
function download(){const book=XLSX.utils.book_new();XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(months.value.map(m=>({Oy:m.month,'Togarak uchun tolangan':m.course,'Yolkira uchun tolangan':m.travel}))),'Oylik monitoring');XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet([{...(currentRecord.value?voucherProfileExport(currentRecord.value):{}),...(currentRecord.value?voucherIncomeExport(currentRecord.value,date):{}),Vaucher:voucher.value.id,FIO:child.value.name,JShShIR:child.value.pinfl,Reja:voucher.value.requestId,Fan:subject.value?.name??'',Yonalish:directions.find(d=>d.id===subject.value?.direction)?.name??'',Tashkilot:club.value?.name??'',INN:club.value?.inn??'',Hudud:club.value?.region??'',Tuman:club.value?.district??'',Holat:status.value,Faollashgan:voucher.value.start,Tugash:expiry(voucher.value),Manba:'Oliy ta’lim vazirligi'}]),'Vaucher');XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(educationPlacements(voucher.value).map(p=>({Kirish:p.entered,Tashkilot:clubs.find(c=>c.id===p.clubId)?.name,INN:clubs.find(c=>c.id===p.clubId)?.inn,Fan:educationSubjects.find(s=>s.id===p.subjectId)?.name}))), 'Otishlar');XLSX.writeFile(book,'Togarak_vaucher_monitoringi.xlsx')}
</script>
<template>
<p v-if="recordError" role="alert" class="kg-error">{{ recordError }}</p>
<KeepAlive><EducationRegistry v-if="!detailOpen" @open="openMonitoring" /></KeepAlive>
<template v-if="detailOpen">
<div class="kg-toolbar"><Button variant="outline" size="sm" @click="closeDetail">← Ro‘yxatga qaytish</Button><strong class="kg-detail-name">{{ child.name.toLocaleUpperCase('uz-UZ') }}</strong><span class="kg-as-of">Holat sanasi: {{ displayDate(date) }}</span><Button variant="outline" size="sm" @click="download"><Download class="h-4 w-4" /> Excel</Button></div>
<VoucherDetailExtras v-if="currentRecord" :record="currentRecord" :date="date" kind="education" />
<ol class="kg-flow" aria-label="To‘garak vaucheri jarayoni"><li v-for="(s,i) in stages" :key="s" :class="{done:i<stage,current:i===stage}"><b>{{ i<stage?'✓':i+1 }}</b><span>{{ s }}</span></li></ol>
<section class="ed-voucher-pair" aria-label="Ikki fan vaucherlari"><button v-for="v in siblings" :key="v.id" :class="['ed-voucher-choice inline-flex',{selected:v.id===voucher.id}]" @click="selectVoucher(v.id)"><span><b>{{ v.subjectSlot }}-fan · {{ educationSubjects.find(s=>s.id===v.subjectId)?.name??'Fan belgilanmagan' }}</b><small>{{ v.id }} · {{ educationVoucherStatus(v,date) }}</small></span><span><small>Amal muddati</small><b>{{ v.start?displayDate(v.start)+' — '+displayDate(expiry(v)):'Hali boshlanmagan' }}</b></span></button></section>
<div class="kg-layout"><section class="kg-card"><header><img :src="logoMark" alt="IHMA" /><div><small>QO‘SHIMCHA TA’LIM VAUCHERI · NAMUNA</small><b>{{ voucher.id }}</b></div><span :class="['kg-badge',status==='Faollashtirilgan'?'good':'warning']">{{ status }}</span></header>
<h3>Vaucher va to‘garak</h3><dl><div><dt>Fan vaucheri</dt><dd>{{ voucher.subjectSlot }} / 2</dd></div><div><dt>Fan</dt><dd>{{ subject?.name??'Faollashtirishda belgilanadi' }}</dd></div><div><dt>Yo‘nalish</dt><dd>{{ directions.find(d=>d.id===subject?.direction)?.name??'—' }}</dd></div><div><dt>Tasdiqlangan reja</dt><dd>{{ voucher.requestId }}</dd></div><div><dt>Vaucher yaratilgan sana</dt><dd>{{ displayDate(voucher.created) }}</dd></div><div><dt>Vazirlikka xabar</dt><dd>Yuborilgan · {{ displayDate(voucher.notified) }}</dd></div><div><dt>To‘garak</dt><dd>{{ club?.name??'Faollashtirish xabari kutilmoqda' }}</dd></div><div><dt>Tashkilot INN</dt><dd>{{ club?.inn??'—' }}</dd></div><div><dt>To‘garak hududi / tumani</dt><dd>{{ club?club.region+' - '+club.district:'—' }}</dd></div><div><dt>Faollashgan sana</dt><dd>{{ displayDate(voucher.start) }}</dd></div><div><dt>Amal qilish tugashi</dt><dd>{{ displayDate(expiry(voucher)) }}</dd></div></dl><p v-if="!voucher.start" class="kg-wait">Oliy ta’lim vazirligidan faollashtirish xabari kutilmoqda. Amal muddati hali boshlanmagan.</p></section>
<section class="kg-monitor"><header><h3>Oylik to‘lovlar monitoringi</h3><small>Manba: Oliy ta’lim vazirligi</small></header><div class="kg-totals"><div><span>To‘lov ma’lumoti kelgan oylar</span><b>{{ totals.months }}</b></div><div><span>To‘garak uchun to‘langan</span><b>{{ cash(totals.course) }}</b></div><div><span>Yo‘lkira uchun to‘langan</span><b>{{ cash(totals.travel) }}</b></div></div><div class="kg-table"><table><thead><tr><th>Oy</th><th>To‘garak to‘lovi</th><th>Yo‘lkira to‘lovi</th></tr></thead><tbody><tr v-for="m in months" :key="m.month" :class="{missing:m.course===null,zero:m.course===0}"><td>{{ m.month }}</td><td>{{ cash(m.course) }}</td><td>{{ cash(m.travel) }}</td></tr><tr v-if="!months.length"><td colspan="3">Vazirlikning faollashtirish xabaridan so‘ng oylik monitoring ochiladi.</td></tr></tbody></table></div><p class="kg-footnote">To‘langan summalar vazirlik xabarlaridan olinadi. Ma’lumot kelmagan oy nol to‘lov hisoblanmaydi.</p></section></div>
</template>
</template>
