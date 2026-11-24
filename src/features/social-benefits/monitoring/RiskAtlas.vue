<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { Crosshair, Minus, Plus, MapPin, AlertCircle, LoaderCircle } from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import { featuresAt, loadRegionGeometry, republicFeatures, uniteBounds, type AreaScope, type MapFeature, type RegionGeometry } from './geography'
import { number, type RiskZone } from './demo-families'

const props = defineProps<{
  scope: AreaScope
  values: Record<string, number>
  zone: RiskZone
  metric: 'share' | 'count'
  label: string
  active?: string
}>()
const emit = defineEmits<{ pick: [id: string]; hover: [id?: string] }>()
const geometry = ref<RegionGeometry>()
const pending = ref(false)
const failed = ref(false)
const retry = ref(0)
watch([() => props.scope.region, retry], async ([region], _, onCleanup) => {
  let canceled = false
  onCleanup(() => { canceled = true })
  geometry.value = undefined
  failed.value = false
  pending.value = !!region
  if (!region) return
  try {
    const loaded = await loadRegionGeometry(region)
    if (!canceled) geometry.value = loaded
  } catch {
    if (!canceled) failed.value = true
  } finally {
    if (!canceled) pending.value = false
  }
}, { immediate: true })

const features = computed(() => featuresAt(props.scope, geometry.value))
const activeFeature = computed(() => features.value.find(row => row.id === props.active))
const picked = computed(() => features.value.find(row => row.id === props.scope.mahalla))
const outline = computed(() => props.scope.mahalla ? undefined : props.scope.district
  ? featuresAt({ region: props.scope.region }, geometry.value).find(row => row.id === props.scope.district)?.path
  : republicFeatures.find(row => row.id === props.scope.region)?.path)
const mapRegions = new Set(['UZ-QR','UZ-NW','UZ-BU','UZ-QA','UZ-SA','UZ-FA','UZ-SU'])
const palettes: Record<RiskZone, string[]> = {
  risk: ['#f7e7da','#f0ceba','#e2aa8e','#cf8665','#b76849'],
  border: ['#f6edcb','#eedca4','#e0c376','#cca24f','#b28332'],
  stable: ['#e4efe6','#cbe4d2','#a6ceb5','#75b394','#40866b'],
}
const palette = computed(() => palettes[props.zone])
const limits = computed(() => {
  const values = features.value.map(row => props.values[row.id]).filter((value): value is number => value !== undefined)
  return values.length ? { min: Math.min(...values), max: Math.max(...values) } : { min: 0, max: 0 }
})

function formatValue(value?: number) {
  if (value === undefined) return t('Ma’lumot mavjud emas')
  return props.metric === 'share' ? number(Math.round(value * 10) / 10) + '%' : number(value)
}
function shade(id: string) {
  const { min, max } = limits.value
  const value = props.values[id]
  if (value === undefined) return 'var(--rm-line)'
  const band = min === max ? 2 : Math.min(4, Math.floor((value - min) / (max - min) * 5))
  return palette.value[band]
}
const legend = computed(() => {
  const { min, max } = limits.value
  const midpoint = (min + max) / 2
  return [...new Set([min, props.metric === 'count' ? Math.round(midpoint) : midpoint, max].map(formatValue))]
})

const svg = ref<SVGSVGElement>()
const zoom = ref(1), offsetX = ref(0), offsetY = ref(0)
const dragging = ref(false)
let gesture: { id: number; x: number; y: number; left: number; top: number } | undefined
let ignoreClick = false
const regionId = computed(() => props.scope.region)
const districtId = computed(() => props.scope.district)
const mahallaId = computed(() => props.scope.mahalla)
function reset() {
  zoom.value = 1
  offsetX.value = 0
  offsetY.value = 0
}
watch([regionId, districtId, mahallaId], reset)

const frame = computed(() => {
  if (!features.value.length) return { x: 0, y: 0, width: 100, height: 65 }
  const bounds = picked.value?.bounds ?? uniteBounds(features.value)
  const width = Math.max(0.05, bounds[2] - bounds[0]), height = Math.max(0.05, bounds[3] - bounds[1])
  const margin = picked.value ? 0.34 : 0.075
  return { x: bounds[0]-width*margin, y: bounds[1]-height*margin, width: width*(1+2*margin), height: height*(1+2*margin) }
})
const box = computed(() => {
  const { x, y, width, height } = frame.value
  return { x: x+width/2-width/zoom.value/2+offsetX.value, y: y+height/2-height/zoom.value/2+offsetY.value, width: width/zoom.value, height: height/zoom.value }
})
const camera = ref(box.value)
let animation = 0
watch([box, pending], ([target, loading]) => {
  cancelAnimationFrame(animation)
  if (loading || !features.value.length) return
  if (dragging.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    camera.value = target
    return
  }
  const start = camera.value
  const began = performance.now()
  function step(now: number) {
    const fraction = Math.min(1, (now - began) / 420)
    const progress = 1 - (1 - fraction) ** 3
    camera.value = {
      x: start.x + (target.x - start.x) * progress,
      y: start.y + (target.y - start.y) * progress,
      width: start.width + (target.width - start.width) * progress,
      height: start.height + (target.height - start.height) * progress,
    }
    if (fraction < 1) animation = requestAnimationFrame(step)
  }
  animation = requestAnimationFrame(step)
})
onBeforeUnmount(() => cancelAnimationFrame(animation))
const viewBox = computed(() => [camera.value.x, camera.value.y, camera.value.width, camera.value.height].join(' '))
const labelSize = computed(() => Math.max(camera.value.width / 48, camera.value.height / 31))
const visibleLabels = computed(() => {
  if (picked.value) return [picked.value]
  if (!props.scope.region) return features.value.filter(row => mapRegions.has(row.id))
  return features.value.filter(row => row.bounds[2]-row.bounds[0] > box.value.width * 0.105 && row.bounds[3]-row.bounds[1] > box.value.height * 0.09)
    .sort((a,b) => (b.bounds[2]-b.bounds[0]) - (a.bounds[2]-a.bounds[0])).slice(0, 8)
})

const shortLabel = (feature: MapFeature) => feature.name.replace(/ (tumani|shahri|MFY|QFY|OFY)$/i, '')
const ariaText = (feature: MapFeature) => t(feature.name) + ' · ' + formatValue(props.values[feature.id])

function changeZoom(value: number) {
  zoom.value = Math.min(6, Math.max(0.75, zoom.value * value))
}
function beginPan(event: PointerEvent) {
  if (event.button !== 0 || event.pointerType === 'touch') return
  ignoreClick = false
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, left: offsetX.value, top: offsetY.value }
}
function movePan(event: PointerEvent) {
  if (!gesture || gesture.id !== event.pointerId || !svg.value) return
  const x = event.clientX - gesture.x, y = event.clientY - gesture.y
  if (!dragging.value && Math.hypot(x,y) < 5) return
  if (!dragging.value) svg.value.setPointerCapture(event.pointerId)
  dragging.value = true
  ignoreClick = true
  const scale = Math.max(box.value.width / svg.value.clientWidth, box.value.height / svg.value.clientHeight)
  offsetX.value = Math.min(frame.value.width, Math.max(-frame.value.width, gesture.left - x * scale))
  offsetY.value = Math.min(frame.value.height, Math.max(-frame.value.height, gesture.top - y * scale))
}
function stopPan() {
  gesture = undefined
  dragging.value = false
}
function pick(id: string) {
  if (!ignoreClick) emit('pick', id)
}
</script>

<template>
  <div class="atlas" :class="{ dragging, nationwide: !scope.region }">
    <div v-if="pending" class="atlas-empty" role="status"><LoaderCircle :size="24" class="atlas-spinner" />{{ t('Xarita yuklanmoqda…') }}</div>
    <div v-else-if="failed || !features.length" class="atlas-empty">
      <AlertCircle :size="22" />
      <span>{{ t('Bu darajadagi xarita yuklanmadi.') }}</span>
      <button type="button" @click="retry++">{{ t('Qayta urinish') }}</button>
    </div>
    <template v-else>
      <svg ref="svg" class="atlas-svg" :viewBox="viewBox" role="group" :aria-label="t('Hududlar xaritasi')"
        @pointerdown="beginPan" @pointermove="movePan" @pointerup="stopPan" @pointercancel="stopPan" @pointerleave="!dragging && stopPan()">
        <g fill-rule="evenodd">
          <path v-for="feature in features" :key="feature.id" :d="feature.path" :fill="shade(feature.id)"
            :class="{ hot: feature.id === active, muted: !!scope.mahalla && scope.mahalla !== feature.id, selected: scope.mahalla === feature.id }"
            vector-effect="non-scaling-stroke" role="button" tabindex="0" :aria-label="ariaText(feature)"
            @mouseenter="emit('hover',feature.id)" @mouseleave="emit('hover',undefined)"
            @focus="emit('hover',feature.id)" @blur="emit('hover',undefined)"
            @click="pick(feature.id)" @keydown.enter.prevent="emit('pick',feature.id)" @keydown.space.prevent="emit('pick',feature.id)" />
        </g>
        <path v-if="outline" class="atlas-outline" :d="outline" vector-effect="non-scaling-stroke" aria-hidden="true" />
        <g class="atlas-labels" aria-hidden="true">
          <text v-for="feature in visibleLabels" :key="feature.id" :x="feature.center[0]" :y="feature.center[1]"
            :font-size="labelSize" :stroke-width="labelSize*.24" text-anchor="middle" dominant-baseline="central">{{ t(shortLabel(feature)) }}</text>
        </g>
      </svg>
      <div class="map-controls" role="group" :aria-label="t('Xarita masshtabi')">
        <button type="button" :title="t('Kattalashtirish')" :aria-label="t('Kattalashtirish')" :disabled="zoom>=6" @click="changeZoom(1.4)"><Plus :size="17" /></button>
        <button type="button" :title="t('Kichraytirish')" :aria-label="t('Kichraytirish')" :disabled="zoom<=.75" @click="changeZoom(1/1.4)"><Minus :size="17" /></button>
        <button type="button" :title="t('Markazga qaytish')" :aria-label="t('Markazga qaytish')" @click="reset"><Crosshair :size="16" /></button>
      </div>
      <div v-if="activeFeature" class="map-readout"><MapPin :size="15" /><span>{{ t(activeFeature.name) }}</span><b>{{ formatValue(values[activeFeature.id]) }}</b></div>
      <div class="map-scale" :aria-label="t(label)"><b>{{ t(label) }}</b><template v-if="Object.keys(values).length"><div class="scale-ramp"><i v-for="color in (legend.length === 1 ? [palette[2]] : palette)" :key="color" :style="{background:color}" /></div><div class="scale-values"><span v-for="stop in legend" :key="stop">{{ stop }}</span></div></template><span v-else>{{ t('Ma’lumot mavjud emas') }}</span></div>
    </template>
  </div>
</template>

<style scoped>
.atlas { position:relative; overflow:hidden; min-width:0; height:clamp(310px,39vw,460px); isolation:isolate; background-color:var(--rm-map); background-image:linear-gradient(var(--rm-grid) 1px,transparent 1px),linear-gradient(90deg,var(--rm-grid) 1px,transparent 1px); background-size:30px 30px; }
.atlas-svg { width:100%; height:100%; padding:17px 38px 54px 17px; display:block; }
.nationwide .atlas-svg { padding:9px 37px 27px 12px; }
.atlas-svg path { cursor:pointer; stroke:var(--rm-map-line); stroke-width:1.05; transition:opacity .2s,fill .2s; }
.atlas-svg path.hot,.atlas-svg path:focus-visible { stroke:var(--zone); stroke-width:2; outline:none; }
.atlas-svg path.selected { stroke:var(--rm-primary-fill); stroke-width:2.5; }
.atlas-svg path.atlas-outline { fill:none; stroke:var(--rm-primary-fill); stroke-width:2; opacity:.75; pointer-events:none; }
.atlas-svg path.muted { opacity:.38; }
.atlas-svg path:hover { opacity:1; }
.dragging .atlas-svg,.dragging .atlas-svg path { cursor:grabbing; }
.atlas-labels { pointer-events:none; user-select:none; }
.atlas-labels text { fill:#302e29; stroke:#fff5ebcc; paint-order:stroke; font-weight:650; stroke-linejoin:round; }
.map-controls { position:absolute; top:12px; right:12px; display:grid; overflow:hidden; border:1px solid var(--rm-line); border-radius:9px; background:var(--rm-surface); box-shadow:0 2px 6px #132a2310; }
.map-controls button { display:grid; place-items:center; height:34px; width:34px; color:var(--rm-ink); }
.map-controls button + button { border-top:1px solid var(--rm-line); }
.map-controls button:not(:disabled):hover { background:var(--rm-soft); }
.map-controls button:disabled { opacity:.4; }
.map-controls button:focus-visible { outline-offset:-3px; }
.map-readout { position:absolute; left:14px; top:14px; display:flex; align-items:center; gap:7px; max-width:calc(100% - 68px); border:1px solid var(--rm-line); border-radius:7px; padding:6px 9px; color:var(--rm-ink); background:var(--rm-surface); font-size:12px; }
.map-readout b { color:var(--rm-primary); white-space:nowrap; }
.map-scale { position:absolute; bottom:13px; left:14px; max-width:calc(100% - 28px); width:174px; display:grid; gap:4px; padding:7px 10px; border-radius:7px; border:1px solid var(--rm-line); background:var(--rm-surface); font-size:10px; color:var(--rm-muted); }
.map-scale b { font-weight:650; color:var(--rm-ink); }
.scale-ramp { display:flex; height:6px; border-radius:3px; overflow:hidden; }
.scale-ramp i { flex:1; }
.scale-values { display:flex; justify-content:space-between; font-variant-numeric:tabular-nums; }
.atlas-empty { display:grid; place-content:center; justify-items:center; gap:10px; height:100%; padding:20px; color:var(--rm-muted); text-align:center; font-size:13px; }
.atlas-empty button { color:var(--rm-primary); font-weight:650; }
.atlas-spinner { animation:atlas-spin 1s linear infinite; }
@keyframes atlas-spin { to { transform:rotate(360deg); } }
@media (max-width:620px) { .atlas { height:315px; } .atlas-svg,.nationwide .atlas-svg { padding-inline:10px; } }
@media (prefers-reduced-motion:reduce) { .atlas-svg path { transition:none; } .atlas-spinner { animation:none; } }
</style>
