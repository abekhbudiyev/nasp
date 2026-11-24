<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { data, latin, num, money, months, organization } from './data'
import { fundingCoverage, fundingCoverageRange, reportedMonth } from './report-output'
import type { CoveragePeriod } from './CoveragePeriodPicker.vue'
import RegionMap from './RegionMap.vue'
type Coverage = { name: string; amount: number | null; measures: number | null }
const props = defineProps<{
  selection: CoveragePeriod; selectedMonths: number[]; agency: string; region: string
  amount: number | null; measureCount: number | null
  regions: (Coverage & { index: number })[]; organizations: (Coverage & { key: string })[]
}>()
const emit = defineEmits<{ agency: [string]; region: [string]; measure: [string]; details: [] }>()
const lines = computed(() => data.finance.filter(line => !props.agency || line.o === props.agency))
function coverage(subset: typeof data.finance) {
  const { from, to, year } = props.selection
  return from && to ? fundingCoverageRange(subset, props.region, from, to) : fundingCoverage(subset,year,props.region,props.selectedMonths)
}
const agencies = computed(() => props.organizations.filter(item => (!props.agency || item.key === props.agency) && item.amount !== null && item.amount > 0).sort((a,b) => b.amount!-a.amount!))
const agencyTotal = computed(() => agencies.value.reduce((total,item) => total + item.amount!,0))
const shareSegments = computed(() => agencies.value.map((item,index) => ({ ...item, share: agencyTotal.value ? item.amount! / agencyTotal.value * 100 : 0, tone: index % 5 })))
const countedAgencies = computed(() => data.agencies.map((item,index) => ({ name: latin(item.n), index, count: data.registry.filter(row => row.oi === index).length, linked: props.organizations.find(row => latin(row.name) === latin(item.n))?.key })).filter(item => !props.agency || item.linked === props.agency).sort((a,b) => b.count-a.count).slice(0,10))
const measures = computed(() => lines.value.map(line => ({ id:line.id, name:latin(line.n), agency:organization(line.o), ...coverage([line]) })).filter(item => item.amount !== null && item.amount > 0).sort((a,b) => b.amount!-a.amount!).slice(0,5))
const fundedRegions = computed(() => [...props.regions].filter(item => item.amount !== null).sort((a,b) => b.amount!-a.amount!))
const mapValues = computed(() => props.regions.map(item => item.amount))
const monthly = computed(() => {
  const { from,to,year } = props.selection
  if (from && to) {
    const last = new Date(to+'T00:00:00Z')
    if (!from.endsWith('-01') || last.getUTCDate() !== new Date(Date.UTC(last.getUTCFullYear(),last.getUTCMonth()+1,0)).getUTCDate()) return []
  }
  return (from && to ? [2024,2025,2026] : [year]).flatMap(y => months.flatMap((name,month) => {
    const key = y+'-'+String(month+1).padStart(2,'0')
    if (from && to ? key < from.slice(0,7) || key > to.slice(0,7) : !props.selectedMonths.includes(month)) return []
    const values = lines.value.map(line => reportedMonth(line,y,props.region,month)).filter(value => value !== undefined)
    return [{ key, name: from && to ? name+' '+y : name, amount: values.length ? Math.round(values.reduce((total,value)=>total+value.s,0)*1e9) : null }]
  }))
})
const knownMonths = computed(() => monthly.value.filter(item => item.amount !== null))
const average = computed(() => props.amount === null || !knownMonths.value.length ? null : props.amount / knownMonths.value.length)
const maxMonthly = computed(() => Math.max(1,...monthly.value.map(item => item.amount ?? 0)))
const trend = computed(() => {
  const values = knownMonths.value
  if (values.length < 2 || !values[0]!.amount) return null
  return (values[values.length-1]!.amount! / values[0]!.amount! - 1)*100
})
const monthPoints = computed(() => monthly.value.map((item,index) => ({ ...item, x:monthly.value.length===1?360:24+index/Math.max(1,monthly.value.length-1)*672, y:148-(item.amount ?? 0)/maxMonthly.value*112 })))
// Missing months split the line, so the chart never bridges an unreported interval.
const chartPaths = computed(() => {
  let current: string[] = []; const paths: string[] = []
  for (const point of monthPoints.value) {
    if (point.amount === null) { if(current.length) paths.push(current.join(' ')); current=[]; continue }
    current.push((current.length?'L':'M')+point.x+','+point.y)
  }
  if(current.length) paths.push(current.join(' '))
  return paths
})
function amountText(value: number | null) { return value === null ? '—' : money(value) }
</script>
<template>
  <div class="infographic-overview">
    <section class="np-card infographic-hero">
      <div><p class="eyebrow">{{ benefitText('Tanlangan davrda ko‘rsatilgan davlat ko‘magi') }}</p><h2>{{ amountText(props.amount) }} <small>{{ benefitText('so‘m') }}</small></h2><p class="hero-explanation">{{ benefitText('Oyiga o‘rtacha') }} <b>{{ amountText(average) }} {{ benefitText('so‘m') }}</b><template v-if="agencies[0]">. {{ benefitText('Moliyalashtirishning') }} <b>{{ num(agencies[0].amount! / Math.max(agencyTotal,1)*100,1) }}%</b> — {{ benefitText(agencies[0].name) }}</template>.</p></div>
      <dl><div><dt>{{ benefitText('Summa ma’lumoti mavjud choralar') }}</dt><dd>{{ measureCount === null ? '—' : num(measureCount) }}</dd></div><div><dt>{{ benefitText('Birinchi va oxirgi tanlangan oy farqi') }}</dt><dd>{{ trend === null ? '—' : (trend > 0 ? '+' : '') + num(trend,1) + '%' }}</dd></div><div><dt>{{ benefitText('Ma’lumoti mavjud hududlar') }}</dt><dd>{{ fundedRegions.length }} / {{ regions.length }}</dd></div></dl>
    </section>
    <section class="np-card hundred-card"><header><h3>{{ benefitText('Har 100 so‘m qaysi idoraga to‘g‘ri keladi?') }}</h3><span>{{ benefitText('Idorani bosib filtrlang') }}</span></header><div v-if="shareSegments.length" class="hundred-bar"><button v-for="item in shareSegments" :key="item.key" :class="'tone-'+item.tone" :style="{flexGrow:item.share}" :title="benefitText(item.name)+': '+num(item.share,1)+'%'" :aria-label="benefitText(item.name)+': '+num(item.share,1)+'%'" @click="emit('agency',item.key)"><template v-if="item.share >= 8"><strong>{{ num(item.share,1) }} {{ benefitText('so‘m') }}</strong><span>{{ benefitText(item.name) }}</span></template></button></div><p v-else class="empty">{{ benefitText('Tanlangan davr va hudud bo‘yicha summa ma’lumoti yo‘q.') }}</p><div v-if="shareSegments.length" class="hundred-legend"><button v-for="item in shareSegments" :key="item.key" @click="emit('agency',item.key)"><i :class="'tone-'+item.tone" /><span>{{ benefitText(item.name) }}</span><b>{{ num(item.share,1) }}%</b></button></div></section>
    <div class="infographic-rankings">
      <section class="np-card ranking-card"><header><h3>{{ benefitText('Top-10: choralar soni bo‘yicha') }}</h3><span>{{ benefitText('Reyestrdagi idora-chora yozuvlari') }}</span></header><ol><li v-for="(item,index) in countedAgencies" :key="item.index"><button :disabled="!item.linked" @click="item.linked && emit('agency',item.linked)"><em>{{ index+1 }}</em><span>{{ benefitText(item.name) }}</span><b>{{ num(item.count) }} {{ benefitText('ta') }}</b><i :style="{width:item.count/Math.max(1,countedAgencies[0]?.count ?? 0)*100+'%'}" /></button></li></ol><p class="source-note">{{ benefitText('Bu reyting davriy to‘lovlar yoki noyob oluvchilar sonini emas, reyestr yozuvlarini ko‘rsatadi.') }}</p></section>
      <section class="np-card ranking-card"><header><h3>{{ benefitText('Top-10: moliyalashtirish bo‘yicha') }}</h3><span>{{ benefitText('Tanlangan davr va hudud') }}</span></header><ol><li v-for="(item,index) in agencies.slice(0,10)" :key="item.key"><button @click="emit('agency',item.key)"><em>{{ index+1 }}</em><span>{{ benefitText(item.name) }}<small>{{ item.measures === null ? '—' : num(item.measures) }} {{ benefitText('ta chora') }} · {{ num(item.amount! / Math.max(agencyTotal,1)*100,1) }}%</small></span><b>{{ amountText(item.amount) }}</b><i :style="{width:item.amount!/Math.max(1,agencies[0]?.amount ?? 0)*100+'%'}" /></button></li></ol><p class="source-note">{{ benefitText('Faqat moliyalashtirish ma’lumoti mavjud idoralar ko‘rsatiladi. Summalar so‘mda.') }}</p><p v-if="!agencies.length" class="empty">{{ benefitText('Ma’lumot mavjud emas.') }}</p></section>
    </div>
    <div class="infographic-rankings">
      <section class="np-card ranking-card"><header><h3>{{ benefitText('Eng katta 5 ta chora') }}</h3><span>{{ benefitText('Tafsilotini ochish uchun bosing') }}</span></header><ol><li v-for="(item,index) in measures" :key="item.id"><button @click="emit('measure',item.id)"><em>{{ index+1 }}</em><span>{{ benefitText(item.name) }}<small>{{ benefitText(item.agency) }}</small></span><b>{{ amountText(item.amount) }}</b></button></li></ol><p v-if="!measures.length" class="empty">{{ benefitText('Tanlangan davr bo‘yicha ma’lumot yo‘q.') }}</p></section>
      <section class="np-card infographic-monthly"><header><h3>{{ benefitText('Oyma-oy moliyalashtirish') }}</h3><span>{{ benefitText('So‘mda') }}</span></header><svg viewBox="0 0 720 184" role="img" :aria-label="benefitText('Oylik moliyalashtirish grafigi')"><path d="M24 148H696" class="baseline"/><path v-for="path in chartPaths" :key="path" :d="path" class="trend-line"/><g v-for="point in monthPoints" :key="point.key"><circle v-if="point.amount !== null" :cx="point.x" :cy="point.y" r="4"><title>{{ benefitText(point.name) }}: {{ amountText(point.amount) }} {{ benefitText('so‘m') }}</title></circle><text :x="point.x" y="176" text-anchor="middle">{{ benefitText(point.name) }}</text></g></svg><p class="source-note">{{ benefitText('Oylik taqsimotning ayrim qismlari manbada namunaviy. Uzilgan chiziq — ma’lumot mavjud emas.') }}</p></section>
    </div>
    <section class="np-card infographic-territories"><header><h3>{{ benefitText('Hududlar bo‘yicha') }}</h3><button class="detail-link" @click="emit('details')">{{ benefitText('Batafsil hududiy tahlil') }} <ArrowUpRight :size="15" /></button></header><div class="territory-layout"><RegionMap :values="mapValues" :selected="region" @select="emit('region',$event)"/><div class="ranking-card"><h4>{{ benefitText('Eng ko‘p moliyalashtirilgan hududlar') }}</h4><ol><li v-for="(item,index) in fundedRegions.slice(0,5)" :key="item.index"><button @click="emit('region',String(item.index))"><em>{{ index+1 }}</em><span>{{ benefitText(item.name) }}</span><b>{{ amountText(item.amount) }}</b></button></li></ol><p class="source-note">{{ benefitText('Hududiy qamrov faqat manbada berilgan choralarni o‘z ichiga oladi.') }}</p><button class="detail-link" @click="emit('details')">{{ benefitText('Barcha hududlar va oilalar kesimi') }} <ArrowRight :size="15" /></button></div></div></section>
  </div>
</template>
<style scoped>
.infographic-overview{display:grid;gap:18px;min-width:0}.np-card{padding:24px;background:var(--card);border:1px solid var(--border);border-radius:20px;box-shadow:none}header{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:18px}h3{font-size:16px;line-height:1.4}header>span,.source-note{font-size:12px;color:var(--muted-foreground);line-height:1.6}.infographic-hero{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(250px,1fr);gap:32px;border-left:6px solid var(--primary);padding:30px}.eyebrow{font-size:13px;color:var(--muted-foreground)}.infographic-hero h2{font-size:clamp(36px,4.7vw,64px);line-height:1.15;letter-spacing:-2px;color:var(--primary);margin:10px 0}.infographic-hero h2 small{font-size:17px;letter-spacing:0;font-weight:500;color:var(--muted-foreground)}.hero-explanation{font-size:14px;line-height:1.7;max-width:650px}.infographic-hero dl{border-left:1px solid var(--border);padding-left:24px;display:grid;align-content:center}.infographic-hero dl>div{display:flex;flex-direction:row-reverse;justify-content:space-between;align-items:center;gap:18px;padding:13px 0;border-bottom:1px solid var(--border)}dt{font-size:12px;max-width:190px;color:var(--muted-foreground)}dd{font-size:25px;font-weight:700;white-space:nowrap}.hundred-bar{display:flex;gap:3px;min-height:76px}.hundred-bar button{flex-basis:0;min-width:95px;text-align:start;padding:13px;border-radius:8px;color:white;overflow:hidden}.hundred-bar strong{display:block;font-size:20px}.hundred-bar span{display:block;font-size:12px;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tone-0{background:#007d63}.tone-1{background:#4fae98}.tone-2{background:#427b88}.tone-3{background:#8a795c}.tone-4{background:#61778c}.infographic-rankings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.ranking-card{min-width:0}.ranking-card ol{list-style:none;margin:0;padding:0}.ranking-card li+li{border-top:1px solid var(--border)}.ranking-card li button{position:relative;display:flex;align-items:center;gap:12px;width:100%;text-align:start;padding:14px 0;font-size:13px}.ranking-card em{font-style:normal;min-width:18px;font-size:12px;color:var(--primary);font-weight:650}.ranking-card li span{flex:1;min-width:0;line-height:1.45}.ranking-card small{display:block;color:var(--muted-foreground);font-size:12px;margin-top:4px}.ranking-card b{font-variant-numeric:tabular-nums;white-space:nowrap;font-size:13px}.ranking-card li i{position:absolute;bottom:0;left:0;height:3px;border-radius:3px;background:var(--primary);opacity:.7}.ranking-card button:disabled{opacity:1;cursor:default}.source-note{margin-top:14px}.empty{padding:16px 0;font-size:13px;color:var(--muted-foreground)}.infographic-monthly svg{width:100%;margin-top:24px;min-height:160px;overflow:visible}.baseline{stroke:var(--border);fill:none}.trend-line{fill:none;stroke:var(--primary);stroke-width:3;stroke-linejoin:round}.infographic-monthly circle{fill:var(--primary)}.infographic-monthly text{font-size:12px;fill:var(--foreground)}.territory-layout{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,1fr);gap:28px;align-items:center}.territory-layout :deep(svg){height:340px}.detail-link{display:inline-flex;align-items:center;gap:6px;color:var(--primary);font-size:13px}.detail-link:focus-visible,button:focus-visible{outline:2px solid var(--primary);outline-offset:3px}.ranking-card h4{font-size:14px;margin-bottom:10px}@media(max-width:1000px){.infographic-hero,.territory-layout{grid-template-columns:1fr}.infographic-hero dl{border-left:0;border-top:1px solid var(--border);padding-left:0;grid-template-columns:repeat(3,1fr);gap:16px}.infographic-hero dl>div{flex-direction:column-reverse;align-items:start;border:0;gap:6px}}@media(max-width:750px){.infographic-rankings{grid-template-columns:1fr}.np-card{padding:18px}.hundred-bar{flex-wrap:wrap}.hundred-bar button{flex-basis:120px}.infographic-hero dl{grid-template-columns:1fr}.infographic-hero dl>div{flex-direction:row-reverse;align-items:center}.infographic-hero h2{font-size:40px}.territory-layout :deep(svg){height:260px}header{flex-wrap:wrap}.ranking-card li button{gap:8px}}
</style>

<style scoped>
.infographic-overview .infographic-hero { border-inline-start: 6px solid var(--primary); }
.infographic-overview .infographic-hero h2 { color: var(--primary); }
.infographic-overview .infographic-hero .hero-explanation { font-size:14px;line-height:1.7; }
.infographic-overview .np-card h3 { font-size:16px; }
.hundred-bar button { min-width:0; padding:0; border-radius:5px; }
.hundred-bar button strong { margin:12px 12px 0;white-space:nowrap; }.hundred-bar button span{margin:4px 12px 12px;}
.hundred-legend { display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:14px; }.hundred-legend button { display:flex;align-items:center;gap:6px;font-size:12px;text-align:start; }.hundred-legend i{width:8px;height:8px;border-radius:50%;flex:none;}.hundred-legend b{font-variant-numeric:tabular-nums;}
@media(max-width:750px){.hundred-bar {flex-wrap:nowrap;}.hundred-bar button{flex-basis:0;}.hundred-bar button strong{font-size:14px;margin:10px 6px 0}.hundred-bar button span{margin:4px 6px 10px;font-size:11px}}
</style>
