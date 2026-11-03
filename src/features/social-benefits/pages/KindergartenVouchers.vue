<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import VoucherWorkspace from '../components/VoucherWorkspace.vue'
import VoucherDetailExtras from '../components/VoucherDetailExtras.vue'
import {kindergartenRecords} from '../voucher-records'
import * as XLSX from 'xlsx'
import logoMark from '@/assets/logo-mark.svg'
import { kindergartenState as state, kindergartenMonths, kindergartenPlacements, type KindergartenVoucher } from '../kindergarten'
const route=useRoute(),router=useRouter(),recordError=ref('')
const records=computed(()=>kindergartenRecords(date.value))
const currentRecord=computed(()=>records.value.find(r=>r.id===voucher.value.id))
const planId=ref(state.plans[0]!.id),date=ref('2026-11-03')
const plan=computed(()=>state.plans.find(p=>p.id===planId.value)!),voucher=computed(()=>state.vouchers.find(v=>v.planId===planId.value)!),months=computed(()=>voucher.value?kindergartenMonths(voucher.value):[])
const totals=computed(()=>{const known=months.value.filter(m=>m.amount!==null);return {months:known.length,days:months.value.some(m=>m.attendance!==null)?months.value.reduce((n,m)=>n+(m.attendance??0),0):null,amount:known.length?known.reduce((n,m)=>n+m.amount!,0):null}})
const stage=computed(()=>!voucher.value.activated?1:voucher.value.end!<date.value?3:2)
const stages=['Vaucher yaratildi · vazirlik xabardor','Qabul va faollashtirish','Oylik monitoring']
function statusFor(v:KindergartenVoucher|undefined){return !v?.activated?'Kutilmoqda':v.end!<date.value?'Muddati yakunlangan':'Faollashtirilgan'}
const status=computed(()=>statusFor(voucher.value))
const detailOpen=ref(false)
const fullName=(value:string)=>value.trim().replace(/\s+/g,' ').toLocaleUpperCase('uz-UZ')
const displayDate=(value:string|null|undefined)=>value?value.split('-').reverse().join('.'):'—'
function openVoucher(id:string){const v=state.vouchers.find(v=>v.id===id);if(!v)return;planId.value=v.planId;detailOpen.value=true;router.replace({query:{...route.query,voucher:id}})}
function closeDetail(){detailOpen.value=false;const {voucher:removed,...query}=route.query;router.replace({query})}
watch(()=>route.query.voucher,id=>{recordError.value='';if(typeof id!=='string'){detailOpen.value=false;return}const v=state.vouchers.find(v=>v.id===id);if(v){planId.value=v.planId;detailOpen.value=true}else{detailOpen.value=false;recordError.value='Vaucher topilmadi: '+id}},{immediate:true})
const cash=(n:number|null)=>n===null?'Ma’lumot kelmagan':n.toLocaleString('uz-UZ')+' so‘m'
const monthName=(s:string)=>!/^\d{4}-(0[1-9]|1[0-2])$/.test(s)?'Oy tanlanmagan':s.slice(0,4)+'-yil '+['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'][Number(s.slice(5))-1]
function exportData(){const book=XLSX.utils.book_new();const rows=[{Oy:'JAMI',Davomat:totals.value.days,'Tolangan summa':totals.value.amount},...months.value.map(m=>({Oy:m.month,Davomat:m.attendance,'Tolangan summa':m.amount,'Xabar sanasi':m.received}))];XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(rows),'Oylik monitoring');XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet([{Bola:fullName(plan.value.child),JShShIR:plan.value.pinfl,Vaucher:voucher.value?.id??'',Reja:plan.value.id,Qabul:voucher.value?.accepted??'',Faollashgan:voucher.value?.activated??'',Tugash:voucher.value?.end??'',Manba:'Ta’lim vazirligi · namuna'}]),'Vaucher');XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(kindergartenPlacements(voucher.value).map(p=>({Kirish:p.entered,Tashkilot:p.organization,INN:p.inn,Hudud:p.region,Tuman:p.district}))), 'Otishlar');XLSX.writeFile(book,'Bogcha_vaucher_monitoringi.xlsx')}
</script>
<template>
<p v-if="recordError" role="alert" class="kg-error">{{ recordError }}</p>
<KeepAlive><VoucherWorkspace v-if="!detailOpen" :records="records" kind="kindergarten" :date="date" @open="openVoucher" /></KeepAlive>
<template v-if="detailOpen">
<div class="kg-toolbar"><button @click="closeDetail">← Ro‘yxatga qaytish</button><strong class="kg-detail-name">{{ fullName(plan.child) }}</strong><span class="kg-as-of">Holat sanasi: {{ displayDate(date) }}</span><button @click="exportData">Excel</button></div>
<VoucherDetailExtras v-if="currentRecord" :record="currentRecord" :date="date" kind="kindergarten" />
<ol class="kg-flow" aria-label="IHMA bog‘cha vaucheri jarayoni"><li v-for="(s,i) in stages" :key="s" :class="{done:i<stage,current:i===stage}"><b>{{ i<stage?'✓':i+1 }}</b><span>{{ s }}</span></li></ol>

<div class="kg-layout"><section class="kg-card"><header><img :src="logoMark" alt="IHMA" /><div><small>MAKTABGACHA TA’LIM VAUCHERI · NAMUNA</small><b>{{ voucher.id }}</b></div><span :class="['kg-badge',voucher?.activated&&voucher.end!>=date?'good':'warning']">{{ status }}</span></header>
<h3>Bola va qonuniy vakil</h3><dl><div><dt>Bola</dt><dd>{{ fullName(plan.child) }}</dd></div><div><dt>Tug‘ilgan sana</dt><dd>{{ plan.birth }}</dd></div><div><dt>JShShIR</dt><dd>{{ plan.pinfl }}</dd></div><div><dt>Manzil</dt><dd>{{ plan.address }}</dd></div><div><dt>Qonuniy vakil</dt><dd>{{ fullName(plan.parent) }}</dd></div></dl>
<h3>Vaucher va bog‘cha</h3><dl><div><dt>Berilgan sana</dt><dd>{{ voucher?.created??'—' }}</dd></div><div><dt>Ta’lim vazirligiga xabar</dt><dd>Yuborilgan · {{ displayDate(voucher.notified) }}</dd></div><div><dt>MTTga qabul sanasi</dt><dd>{{ voucher?.accepted??'Ma’lumot kelmagan' }}</dd></div><div><dt>MTT</dt><dd>{{ voucher?.organization??'Ma’lumot kelmagan' }}</dd></div><div><dt>Tashkilot INN</dt><dd>{{ voucher?.organizationInn??'—' }}</dd></div><div><dt>Hudud / tuman (shahar)</dt><dd>{{ voucher?.region??'—' }} / {{ voucher?.district??'—' }}</dd></div><div><dt>Faollashgan sana</dt><dd>{{ voucher?.activated??'Hali faollashmagan' }}</dd></div><div><dt>Amal qilish tugashi</dt><dd>{{ voucher?.end??'Hali belgilanmagan' }}</dd></div></dl>
<p v-if="!voucher.activated" class="kg-wait">Ta’lim vazirligidan qabul sanasi va tashkilot ma’lumoti kutilmoqda. Amal muddati hali boshlanmagan.</p>

</section>
<section class="kg-monitor"><header><h3>Davomat va to‘langan mablag‘</h3><small>Manba: Ta’lim vazirligi</small></header><div class="kg-totals"><div><span>Ma’lumoti kelgan oylar</span><b>{{ totals.months }}</b></div><div><span>Jami qatnashgan kun</span><b>{{ totals.days??'—' }}</b></div><div><span>Jami to‘langan</span><b>{{ cash(totals.amount) }}</b></div></div>
<div class="kg-table"><table><thead><tr><th>Oy</th><th>Qatnashgan kun</th><th>To‘langan summa</th><th>Xabar sanasi</th></tr></thead><tbody><tr v-for="m in months" :key="m.month" :class="{missing:m.amount===null,late:m.amount===null&&m.month<date.slice(0,7),zero:m.amount===0}"><td>{{ monthName(m.month) }}</td><td>{{ m.attendance===null?'—':m.attendance+' kun' }}</td><td>{{ m.amount===null?'Ma’lumot kelmagan':cash(m.amount) }}</td><td>{{ m.received??'—' }}</td></tr><tr v-if="!months.length"><td colspan="4">Vaucher faollashgach oylik monitoring ochiladi.</td></tr></tbody></table></div><p class="kg-footnote">Summa Ta’lim vazirligi yuborgan to‘lov faktidir. Ma’lumot kelmagan oy nol to‘lov hisoblanmaydi.</p>
</section></div>

</template>
</template>
<style scoped src="./kindergarten-vouchers.css"></style>
