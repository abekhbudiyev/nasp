<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { requestAgencyKeys, requestTotals, usePrototypeRequests, type PrototypeRequest } from './prototype-requests'

const props = defineProps<{
  requests?: PrototypeRequest[]
  region?: string
  agency?: string
  activeStatus?: string
}>()
const emit = defineEmits<{ open: [status?: string] }>()
const { events } = usePrototypeRequests()
const scoped = computed(() => props.requests ?? events.value.filter(event =>
  (!props.region || event.region === Number(props.region)) &&
  (!props.agency || requestAgencyKeys[event.agency] === props.agency),
))
const stages = computed(() => {
  const counts = requestTotals(scoped.value)
  return [
    { count: counts.received, label: 'Qabul qilindi', detail: 'Idoralar yuborgan so‘rovlar', tone: 'intake', status: undefined },
    { count: counts.processing, label: 'Tekshiruvda', detail: counts.checked + ' ta tekshiruv yakunlandi', tone: 'intake', status: 'processing' },
    { count: counts.accepted, label: 'Tasdiqlandi', detail: 'Ijroga yo‘naltirildi', tone: 'success', status: 'accepted' },
    { count: counts.delivered, label: 'Ijro yakunlandi', detail: 'Kabinetda aks etdi', tone: 'success', status: 'delivered' },
    { count: counts.duplicate, label: 'Rad etildi', detail: 'Takroriy so‘rov', tone: 'danger', status: 'duplicate' },
    { count: counts.returned, label: 'Qaytarildi', detail: 'Tuzatish uchun', tone: 'warning', status: 'returned' },
    { count: counts.waiting, label: 'Tasdiq kutilmoqda', detail: 'Idoradan ijro tasdig‘i', tone: 'pending', status: 'waiting' },
  ]
})
const layouts = [
  {
    name: 'wide', view: '0 0 940 244', radius: 26,
    points: [[75, 40], [310, 40], [545, 40], [810, 40], [425, 165], [615, 165], [810, 165]],
    edges: [
      ['intake', 'M101 40H284'], ['success', 'M336 40H519'], ['success', 'M571 40H784'],
      ['danger', 'M389 40V146Q389 165 408 165H425'],
      ['warning', 'M389 116H582Q600 116 600 134V148Q600 165 615 165'],
      ['pending', 'M730 40V145Q730 165 750 165H784'],
    ],
  },
  {
    name: 'narrow', view: '0 0 320 448', radius: 19,
    points: [[24, 28], [24, 91], [56, 154], [88, 215], [56, 340], [56, 405], [88, 274]],
    edges: [
      ['intake', 'M24 47V72'], ['success', 'M24 110V136Q24 154 37 154'],
      ['success', 'M56 173V198Q56 215 69 215'], ['pending', 'M56 193V257Q56 274 69 274'],
      ['danger', 'M24 126V323Q24 340 37 340'], ['warning', 'M24 317V388Q24 405 37 405'],
    ],
  },
]
</script>

<template>
  <section class="request-flow" :aria-label="benefitText('So‘rovlar ijrosi')">
    <header>
      <div>
        <h2>{{ benefitText('So‘rovlar ijrosi') }}</h2>
        <p>{{ benefitText('Namunaviy so‘rovlar') }}</p>
      </div>
      <button v-if="activeStatus === undefined" type="button" @click="emit('open')">
        {{ benefitText('Ijro tafsilotlari') }} <ArrowUpRight :size="15" aria-hidden="true" />
      </button>
    </header>
    <svg v-for="layout in layouts" :key="layout.name" :class="layout.name" :viewBox="layout.view"
      role="group" :aria-label="benefitText('Ijro bosqichlari')">
      <g v-for="([tone, path], i) in layout.edges" :key="path" :class="tone" aria-hidden="true">
        <path :d="path" class="track" />
        <path :d="path" class="packet" pathLength="100" :style="{ animationDelay: i * -.47 + 's' }" />
      </g>
      <g v-for="(stage, i) in stages" :key="stage.label" class="flow-stage" :class="stage.tone"
        :transform="'translate(' + layout.points[i]!.join(' ') + ')'" role="button" tabindex="0"
        :aria-label="benefitText(stage.label + ' · ' + stage.count + ' ta. ' + stage.detail)"
        :aria-pressed="activeStatus === undefined ? undefined : activeStatus === (stage.status ?? 'all')"
        @click="emit('open', stage.status)" @keydown.enter.prevent="emit('open', stage.status)"
        @keydown.space.prevent="emit('open', stage.status)">
        <rect v-if="layout.name === 'wide'" x="-82" y="-30" width="164" height="100" fill="transparent" aria-hidden="true" />
        <rect v-else x="-22" y="-23" width="220" height="47" fill="transparent" aria-hidden="true" />
        <circle :r="layout.radius" />
        <text class="count" text-anchor="middle" dy=".35em" aria-hidden="true">{{ stage.count }}</text>
        <g :transform="layout.name === 'wide' ? 'translate(0 45)' : 'translate(34 -3)'"
          :text-anchor="layout.name === 'wide' ? 'middle' : 'start'" aria-hidden="true">
          <text class="label">{{ benefitText(stage.label) }}</text>
          <text y="18" class="detail">{{ benefitText(stage.detail) }}</text>
        </g>
      </g>
    </svg>
  </section>
</template>

<style scoped>
.request-flow {
  container-type: inline-size;
  min-width: 0;
  padding: clamp(16px, 2vw, 26px);
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--card);
  color: var(--foreground);
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
h2 { font-size: clamp(18px, 1.5vw, 22px); font-weight: 700; letter-spacing: -.025em; }
header p { margin-top: 4px; color: var(--muted-foreground); font-size: 12px; }
header button { display: flex; align-items: center; gap: 5px; color: var(--primary); font-size: 12px; font-weight: 680; }
svg { display: block; width: 100%; margin-top: 16px; }
svg.narrow { display: none; max-width: 420px; }
.intake { --ink: #076ca3; }
.success { --ink: #007b60; }
.danger { --ink: #ad4953; }
.warning { --ink: #8a561b; }
.pending { --ink: #6551aa; }
.track, .packet { fill: none; stroke: var(--ink); stroke-linecap: round; }
.track { opacity: .27; stroke-width: 2.5; }
.packet { stroke-width: 3; stroke-dasharray: 5 95; animation: flow 3.5s linear infinite; }
.flow-stage { cursor: pointer; }
.flow-stage circle {
  fill: color-mix(in srgb, var(--ink) 10%, var(--card));
  stroke: color-mix(in srgb, var(--ink) 52%, var(--card));
  stroke-width: 1.5;
}
.flow-stage:is(:hover, :focus-visible, [aria-pressed="true"]) circle {
  fill: color-mix(in srgb, var(--ink) 20%, var(--card));
  stroke: var(--ink);
  stroke-width: 3;
}
.flow-stage:focus-visible { outline: none; }
text { font-family: inherit; }
.count { font-size: 23px; font-weight: 720; fill: var(--ink); font-variant-numeric: tabular-nums; }
.label { font-size: 14px; font-weight: 650; fill: var(--foreground); }
.detail { font-size: 12px; fill: var(--muted-foreground); }
:global(.dark) .intake { --ink: #8ebdc9; }
:global(.dark) .success { --ink: #79d5b9; }
:global(.dark) .danger { --ink: #f0a5ae; }
:global(.dark) .warning { --ink: #e7bd81; }
:global(.dark) .pending { --ink: #c5b1ff; }
@keyframes flow { to { stroke-dashoffset: -100; } }
@container(max-width: 710px) {
  svg.wide { display: none; }
  svg.narrow { display: block; }
  .count { font-size: 18px; }
}
@media(prefers-reduced-motion: reduce) { .packet { animation: none; display: none; } }
</style>
