<script setup lang="ts">
import {computed} from 'vue'
import {voucherSavings,voucherIncomeChange} from '../voucher-income'
import type {VoucherRecord} from '../voucher-analysis'
const props=defineProps<{record:VoucherRecord;date:string}>()
const family=computed(()=>props.record.familySavings)
const change=computed(()=>voucherIncomeChange(props.record.income))
const saved=computed(()=>voucherSavings(props.record,props.date))
const cash=(n:number|null|undefined)=>n===null||n===undefined?'Ma’lumot yo‘q':Math.round(n).toLocaleString('uz-UZ')+' so‘m'
const d=(s:string|null|undefined)=>s?s.split('-').reverse().join('.'):'Tekshirilmagan'
const explanation=computed(()=>`Jon boshiga oylik iqtisod = vaucher qoplagan oxirgi ma’lum oylik to‘lov / oila a’zolari soni. Foiz = jon boshiga iqtisod / vaucher berilganidagi jon boshiga oylik daromad × 100. Vaucher qoplagan: ${cash(saved.value.total)}; oila: ${saved.value.members??'—'} kishi. Oila jami — ikkala xizmatning bir oydagi ma’lum to‘lovlari yig‘indisi / oila a’zolari soni; foiz oiladagi eng avvalgi vaucher berilganidagi daromadga nisbatan. Yo‘lkira alohida.`)
</script>
<template>
<div class="voucher-income" :title="explanation">
<div><small>Berilganida · {{ record.income?.issueDate?d(record.income.issueDate):d(record.created) }}</small><b>{{ cash(record.income?.atIssue) }}</b></div>
<div><small>Oxirgi tekshiruv · {{ d(record.income?.checkedAt) }}</small><b>{{ cash(record.income?.latest) }} <span v-if="change!==null" :class="['income-change',change>0?'increase':change<0?'decrease':'unchanged']" :title="'Vaucher berilgan paytdagi daromadga nisbatan '+(change>0?'o‘sish':change<0?'kamayish':'o‘zgarish yo‘q')">({{ change>0?'+':'' }}{{ change }}%)</span></b></div>
<div :class="{'income-saving':saved.perPerson!==null&&saved.perPerson>0}"><small>Shu vaucher iqtisodi (jon boshiga) <template v-if="saved.month">· {{ saved.month }}</template></small><b>{{ cash(saved.perPerson) }}<span v-if="saved.percent!==null"> ({{ saved.percent }}%)</span></b></div>
<div v-if="family" class="income-family"><small>Oila jami · {{ family.month??'Hali foydalanilmagan' }}</small><b>{{ cash(family.perPerson) }}<span v-if="family.percent!==null"> ({{ family.missing?'kamida ':'' }}{{ family.percent }}%)</span></b><small>{{ family.children }} farzand · {{ family.vouchers }} vaucher<template v-if="family.missing"> · {{ family.missing }} ta to‘lov ma’lumoti yo‘q</template></small></div>
</div>
</template>
