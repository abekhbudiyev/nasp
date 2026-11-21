<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { ArrowUpRight } from 'lucide-vue-next'
import {requestBatch, summarize} from './live-engine'

const emit = defineEmits<{open:[string]}>()
const batch = summarize(requestBatch().events)
const stages = [
  {count:batch.received, label:'Idoralar', detail:'So‘rov yuborildi', tone:'intake'},
  {count:batch.received, label:'Agentlik', detail:'So‘rov tekshirildi', tone:'intake'},
  {count:batch.delivered+batch.waiting, label:'Tasdiqlandi', detail:'Ijroga yo‘naltirildi', tone:'success'},
  {count:batch.delivered, label:'Ijro yakunlandi', detail:'Natija fuqaro kabinetida', tone:'success'},
  {count:batch.duplicate, label:'Rad etildi', detail:'Takroriy so‘rov', tone:'danger'},
  {count:batch.returned, label:'Idoraga qaytarildi', detail:'Tuzatish uchun', tone:'warning'},
  {count:batch.waiting, label:'Ijro jarayonida', detail:'Idora tasdig‘i kutilmoqda', tone:'pending'},
]
const layouts = [
  {
    name:'wide', view:'0 0 940 244', radius:26,
    points:[[75,40],[310,40],[545,40],[810,40],[425,165],[615,165],[810,165]],
    edges:[
      ['intake','M101 40H284'],['success','M336 40H519'],['success','M571 40H784'],
      ['danger','M389 40V146Q389 165 408 165H425'],
      ['warning','M389 116H582Q600 116 600 134V148Q600 165 615 165'],
      ['pending','M730 40V145Q730 165 750 165H784'],
    ],
  },
  {
    name:'narrow', view:'0 0 320 448', radius:19,
    points:[[24,28],[24,91],[56,154],[88,215],[56,340],[56,405],[88,274]],
    edges:[
      ['intake','M24 47V72'],['success','M24 110V136Q24 154 37 154'],
      ['success','M56 173V198Q56 215 69 215'],['pending','M56 193V257Q56 274 69 274'],
      ['danger','M24 126V323Q24 340 37 340'],['warning','M24 317V388Q24 405 37 405'],
    ],
  },
]
</script>

<template>
  <section class="request-flow">
    <header><div><h2>{{ benefitText("So‘rovlar ijrosi") }}</h2><p>{{ benefitText("Idoralardan fuqaro kabinetigacha · namunaviy ma’lumot") }}</p></div>
      <button @click="emit('open','flow')">{{ benefitText("Ijro tafsilotlari ") }}<ArrowUpRight :size="15"/></button>
    </header>
    <svg v-for="layout in layouts" :key="layout.name" :class="layout.name" :viewBox="layout.view" role="img"
      :aria-label="benefitText(stages.map(s=>s.label+' — '+s.count+' ta. '+s.detail).join('. '))">
      <g v-for="([tone,path],i) in layout.edges" :key="path" :class="tone">
        <path :d="path" class="track"/><path :d="path" class="packet" pathLength="100" :style="{animationDelay:(i*-.47)+'s'}"/>
      </g>
      <g v-for="(stage,i) in stages" :key="stage.label" :class="stage.tone"
        :transform="'translate('+layout.points[i]!.join(' ')+')'">
        <circle :r="layout.radius"/><text class="count" text-anchor="middle" dy=".35em">{{ benefitText(stage.count) }}</text>
        <g :transform="layout.name==='wide'?'translate(0 45)':'translate(34 -3)'" :text-anchor="layout.name==='wide'?'middle':'start'">
          <text class="label">{{ benefitText(stage.label) }}</text><text y="18" class="detail">{{ benefitText(stage.detail) }}</text>
        </g>
      </g>
    </svg>
  </section>
</template>

<style scoped>
.request-flow{container-type:inline-size;min-width:0;border:1px solid var(--border);border-radius:18px;background:var(--card);color:var(--foreground);padding:clamp(16px,2vw,26px)}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
h2{font-size:clamp(18px,1.5vw,22px);font-weight:700;letter-spacing:-.025em}header p{font-size:12px;color:var(--muted-foreground);margin-top:4px}header button{display:flex;align-items:center;gap:5px;color:var(--primary);font-size:13px;font-weight:600;min-height:36px}
svg.wide,svg.narrow{display:block;width:100%;margin-top:16px}svg.narrow{display:none;max-width:400px}
.intake{--ink:#386777}.success{--ink:#007b60}.danger{--ink:#ad4953}.warning{--ink:#976523}.pending{--ink:#547189}
.track,.packet{fill:none;stroke:var(--ink);stroke-linecap:round}.track{opacity:.26;stroke-width:2.5}.packet{stroke-width:3;stroke-dasharray:5 95;animation:flow 3.5s linear infinite}
circle{fill:color-mix(in srgb,var(--ink) 8%,var(--card));stroke:color-mix(in srgb,var(--ink) 38%,var(--card));stroke-width:1.5}
text{font-family:inherit}.count{font-size:23px;font-weight:720;fill:var(--ink);font-variant-numeric:tabular-nums}.label{font-size:14px;font-weight:650;fill:var(--foreground)}.detail{font-size:12px;fill:var(--muted-foreground)}
:global(.dark) .intake{--ink:#8ebdc9}:global(.dark) .success{--ink:#79d5b9}:global(.dark) .danger{--ink:#f0a5ae}:global(.dark) .warning{--ink:#e7bd81}:global(.dark) .pending{--ink:#aac5dd}
@keyframes flow{to{stroke-dashoffset:-100}}
@container(max-width:710px){svg.wide{display:none}svg.narrow{display:block}.count{font-size:18px}.label{font-size:14px}}
@media(prefers-reduced-motion:reduce){.packet{animation:none;display:none}}
</style>
