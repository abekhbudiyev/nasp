<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CalendarDays } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
export interface CoveragePeriod { year: number; period: string; from?: string; to?: string }
const props = defineProps<{ value: CoveragePeriod }>()
const emit = defineEmits<{ change: [CoveragePeriod] }>()
const open = ref(false)
const mode = ref('year'), year = ref(props.value.year), quarter = ref(0), month = ref(0), from = ref(''), to = ref('')
watch(() => props.value, value => {
 year.value = value.year
 from.value = value.from || value.year + '-01-01'; to.value = value.to || value.year + '-12-31'
 mode.value = value.from && value.to ? 'range' : /^q[0-3]$/.test(value.period) ? 'quarter' : /^\d+$/.test(value.period) ? 'month' : 'year'
 quarter.value = value.period.startsWith('q') ? Number(value.period.slice(1)) : 0
 month.value = /^\d+$/.test(value.period) ? Number(value.period) : 0
}, { immediate: true })
const valid = computed(() => mode.value !== 'range' || Boolean(from.value && to.value && from.value <= to.value))
const label = computed(() => {
 const value = props.value
 if (value.from && value.to) return value.from.split('-').reverse().join('.') + ' – ' + value.to.split('-').reverse().join('.')
 if (/^q[0-3]$/.test(value.period)) return value.year + ' yilning ' + (Number(value.period.slice(1)) + 1) + ' choragi'
 if (/^\d+$/.test(value.period)) return value.year + ' yil ' + months[Number(value.period)]
 if (value.period !== 'all') return value.year + ' yil · tanlangan oylar'
 return value.year + ' yil'
})
function apply() {
 if (!valid.value) return
 emit('change', mode.value === 'range' ? { year: Number(from.value.slice(0, 4)), period: 'all', from: from.value, to: to.value } : { year: year.value, period: mode.value === 'quarter' ? 'q' + quarter.value : mode.value === 'month' ? String(month.value) : 'all' })
 open.value = false
}
</script>
<template>
 <div class="coverage-period">
  <button type="button" class="period-trigger" :aria-expanded="open" @click="open = !open"><CalendarDays :size="14" />{{ benefitText(label) }}</button>
  <form v-if="open" class="period-options" @submit.prevent="apply" @keydown.esc="open = false">
   <label>{{ benefitText('Davr') }}<select v-model="mode"><option value="year">{{ benefitText('Yil') }}</option><option value="quarter">{{ benefitText('Chorak') }}</option><option value="month">{{ benefitText('Oy') }}</option><option value="range">{{ benefitText('Sana oralig‘i') }}</option></select></label>
   <label v-if="mode !== 'range'">{{ benefitText('Yil') }}<select v-model.number="year"><option v-for="item in [2024,2025,2026]" :key="item" :value="item">{{ item }}</option></select></label>
   <label v-if="mode === 'quarter'">{{ benefitText('Chorak') }}<select v-model.number="quarter"><option v-for="item in [0,1,2,3]" :key="item" :value="item">{{ item + 1 }} {{ benefitText('chorak') }}</option></select></label>
   <label v-if="mode === 'month'">{{ benefitText('Oy') }}<select v-model.number="month"><option v-for="(name,index) in months" :key="name" :value="index">{{ benefitText(name) }}</option></select></label>
   <template v-if="mode === 'range'"><label>{{ benefitText('Boshlanish sanasi') }}<input v-model="from" type="date" :max="to || undefined" required /></label><label>{{ benefitText('Tugash sanasi') }}<input v-model="to" type="date" :min="from || undefined" required /></label></template>
   <p v-if="!valid" role="alert">{{ benefitText('Boshlanish sanasi tugash sanasidan keyin bo‘lishi mumkin emas.') }}</p>
   <div class="period-actions"><button type="button" @click="open = false">{{ benefitText('Bekor qilish') }}</button><button type="submit" :disabled="!valid">{{ benefitText('Qo‘llash') }}</button></div>
  </form>
 </div>
</template>
<style scoped>
.coverage-period { position: relative; margin-top: 6px; }
.period-trigger { display:flex; align-items:center; gap:6px; color:var(--muted-foreground); font-size:12px; cursor:pointer; border-radius:6px; padding:3px 0; }
.period-trigger:hover { color:var(--primary); }
.period-options { position:absolute; top:100%; left:0; z-index:40; display:grid; grid-template-columns:1fr 1fr; gap:12px; width:min(360px,calc(100vw - 64px)); padding:14px; border:1px solid var(--border); border-radius:12px; background:var(--card); box-shadow:0 12px 30px #0002; }
label { display:grid; gap:5px; font-size:12px; }
select,input { width:100%; min-width:0; height:34px; padding:0 8px; border:1px solid var(--border); border-radius:7px; background:var(--background); color:var(--foreground); }
p,.period-actions { grid-column:1 / -1; }
p { color:var(--destructive); font-size:12px; }
.period-actions { display:flex; justify-content:flex-end; gap:8px; }
.period-actions button { padding:7px 11px; border:1px solid var(--border); border-radius:7px; font-size:12px; }
.period-actions button[type=submit] { background:var(--primary); color:var(--primary-foreground); }
button:disabled { opacity:.5; cursor:not-allowed; }
</style>
