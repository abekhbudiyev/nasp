<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { MapPin, MapPinned } from 'lucide-vue-next'
import geography from '../social-benefits/platform-regions.json'
import AnimatedNumber from './AnimatedNumber.vue'
import { provinceNames, referralLabels } from './model'
import type { PortfolioRow } from './portfolio'

const props = defineProps<{ rows: PortfolioRow[]; selected: string; hasComparison: boolean }>()
const emit = defineEmits<{ select: [region: string] }>()
const metrics = [
  { key: 'visits', title: 'Tashriflar', scope: 'Tanlangan davr', color: '#159c81' },
  { key: 'visitors', title: 'Xizmat oluvchilar', scope: 'Tanlangan davr', color: '#3489cc' },
  { key: 'activePlaces', title: 'Faol xizmat joylari', scope: 'Joriy holat', color: '#9166d3' },
  { key: 'signalCount', title: 'Kvota signallari', scope: 'Bugungi holat', color: '#d38a24' },
] as const
const normalize = (value: string) => value.toLocaleLowerCase('uz').replace(/[‘’ʻʼ`']/g, '')
const metricIndex = ref(0)
const metric = computed(() => metrics[metricIndex.value] ?? metrics[0])
const canvas = ref<HTMLCanvasElement>()
const hovered = ref('')
const rankedRows = computed(() => [...props.rows].sort((a, b) => b[metric.value.key] - a[metric.value.key] || a.title.localeCompare(b.title, 'uz')))
const max = computed(() => Math.max(1, ...props.rows.map(row => row[metric.value.key])))
const lookup = computed(() => new Map(props.rows.map(row => [normalize(row.id), row])))
const selectedRegion = computed(() => lookup.value.get(normalize(props.selected)))
const details = computed(() => lookup.value.get(normalize(hovered.value || props.selected)))
const [minX = 0, minY = 0, mapWidth = 1000, mapHeight = 655] = geography.viewBox
let paths: { title: string; path: Path2D }[] = []
let resize: ResizeObserver | undefined
let theme: MutationObserver | undefined
let motion: MediaQueryList | undefined
let animation = 0
let reveal = 1
let xOffset = 0
let yOffset = 0
let scale = 1

function renderMap() {
  const element = canvas.value
  const ctx = element?.getContext('2d')
  if (!element || !ctx) return
  const { width, height } = element.getBoundingClientRect()
  if (!width || !height) return
  const ratio = Math.min(2, window.devicePixelRatio || 1)
  const pixelWidth = Math.round(width * ratio)
  const pixelHeight = Math.round(height * ratio)
  if (element.width !== pixelWidth) element.width = pixelWidth
  if (element.height !== pixelHeight) element.height = pixelHeight
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.clearRect(0, 0, width, height)
  scale = Math.min((width - 18) / mapWidth, (height - 12) / mapHeight)
  if (scale <= 0) return
  xOffset = (width - mapWidth * scale) / 2 - minX * scale
  yOffset = (height - mapHeight * scale) / 2 - minY * scale
  ctx.translate(xOffset, yOffset)
  ctx.scale(scale, scale)
  ctx.lineJoin = 'round'
  const style = getComputedStyle(element)
  const base = style.getPropertyValue('--muted').trim() || '#dce4ed'
  const border = style.getPropertyValue('--card').trim() || '#fff'
  const accent = metric.value.color
  for (const { title, path } of paths) {
    const row = lookup.value.get(normalize(title))
    ctx.fillStyle = base
    ctx.fill(path)
    if (row) {
      const amount = row[metric.value.key] / max.value
      ctx.globalAlpha = .12 + .81 * amount * reveal
      ctx.fillStyle = accent
      ctx.fill(path)
      ctx.globalAlpha = 1
    }
    ctx.strokeStyle = border
    ctx.lineWidth = 1.3 / scale
    ctx.stroke(path)
  }
  for (const title of [props.selected, hovered.value]) {
    const active = paths.find(item => normalize(item.title) === normalize(title))
    if (!active) continue
    ctx.strokeStyle = accent
    ctx.lineWidth = 2.4 / scale
    ctx.stroke(active.path)
  }
  ctx.resetTransform()
}

function animateMap() {
  cancelAnimationFrame(animation)
  reveal = motion?.matches ? 1 : 0
  renderMap()
  if (reveal === 1) return
  const start = performance.now()
  const advance = (now: number) => {
    const elapsed = Math.min(1, (now - start) / 490)
    reveal = 1 - (1 - elapsed) ** 3
    renderMap()
    if (elapsed < 1) animation = requestAnimationFrame(advance)
  }
  animation = requestAnimationFrame(advance)
}

function regionAt(event: MouseEvent) {
  const rect = canvas.value?.getBoundingClientRect()
  const ctx = canvas.value?.getContext('2d')
  if (!rect || !ctx || scale <= 0) return ''
  const x = (event.clientX - rect.left - xOffset) / scale
  const y = (event.clientY - rect.top - yOffset) / scale
  for (let index = paths.length - 1; index >= 0; index--) {
    const region = paths[index]!
    if (ctx.isPointInPath(region.path, x, y)) return region.title
  }
  return ''
}

function pick(event: MouseEvent) {
  const row = lookup.value.get(normalize(regionAt(event)))
  if (row) emit('select', row.id)
}

watch([() => props.rows, metric], animateMap, { flush: 'post' })
watch([() => props.selected, hovered], renderMap, { flush: 'post' })
onMounted(() => {
  if (!canvas.value) return
  paths = geography.items.map(item => ({
    title: provinceNames[item.key as keyof typeof provinceNames], path: new Path2D(item.d),
  }))
  resize = new ResizeObserver(renderMap)
  resize.observe(canvas.value)
  theme = new MutationObserver(renderMap)
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  motion = matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', animateMap)
  animateMap()
})
onUnmounted(() => {
  resize?.disconnect()
  theme?.disconnect()
  motion?.removeEventListener('change', animateMap)
  cancelAnimationFrame(animation)
})
</script>

<template>
  <section class="map-panel" :style="{ '--map-accent': metric.color }" aria-labelledby="regional-map-title">
    <header class="map-heading">
      <div>
        <h2 id="regional-map-title"><MapPinned :size="20" /> Hududlar xaritasi</h2>
        <p>{{ metric.scope }} · Xaritadan yoki ro‘yxatdan hududni tanlang</p>
      </div>
      <button v-if="selected" class="map-reset" type="button" @click="emit('select', '')">Barcha hududlar</button>
    </header>
    <div class="map-metrics" role="group" aria-label="Xarita ko‘rsatkichi">
      <button v-for="(item, index) in metrics" :key="item.key" type="button" :aria-pressed="metricIndex === index" @click="metricIndex = index">{{ item.title }}</button>
    </div>
    <div class="map-layout">
      <div class="map-viewport">
        <div class="map-caption">
          <MapPin :size="15" aria-hidden="true" />
          <span>{{ details?.title || hovered || selected || 'O‘zbekiston' }}</span>
          <strong v-if="details"><AnimatedNumber :value="details[metric.key]" /></strong>
          <small v-else-if="hovered || selected">Ma’lumot yo‘q</small>
        </div>
        <canvas ref="canvas" aria-hidden="true" :class="{ 'can-select': hovered && details }"
          @pointermove="hovered = regionAt($event)" @pointerleave="hovered = ''" @click="pick"></canvas>
        <div class="map-legend"><span>Kam</span><i></i><span>Ko‘p</span><span class="map-missing"><b></b>Ma’lumot yo‘q</span></div>
      </div>
      <div class="map-ranking">
        <h3>{{ metric.title }} <span>{{ rankedRows.length }} hudud</span></h3>
        <p v-if="!rankedRows.length">Tanlangan xizmat bo‘yicha ma’lumot yo‘q.</p>
        <div class="map-list">
          <button v-for="row in rankedRows" :key="row.id" type="button" :aria-pressed="row.id === selected"
            @click="emit('select', row.id)" @focus="hovered = row.title" @blur="hovered = ''"
            @pointerenter="hovered = row.title" @pointerleave="hovered = ''">
            <span>{{ row.title }}</span><strong><AnimatedNumber :value="row[metric.key]" /></strong>
          </button>
        </div>
      </div>
    </div>
    <details v-if="selectedRegion" :key="selectedRegion.id" class="map-region-detail">
      <summary>{{ selectedRegion.title }} tafsilotlari</summary>
      <div class="map-region-stats">
        <div>
          <h3>Tanlangan davrdagi tashriflar</h3>
          <dl>
            <div><dt>Vaucherli</dt><dd><AnimatedNumber :value="selectedRegion.voucher" /></dd></div>
            <div><dt>Pullik</dt><dd><AnimatedNumber :value="selectedRegion.paid" /></dd></div>
            <div v-if="selectedRegion.unknown"><dt>Turi aniqlanmagan</dt><dd><AnimatedNumber :value="selectedRegion.unknown" /></dd></div>
            <div v-if="hasComparison"><dt>Oldingi teng davrda</dt><dd><AnimatedNumber :value="selectedRegion.previousVisits" /></dd></div>
          </dl>
        </div>
        <div>
          <h3>Murojaatlarning joriy holati</h3>
          <dl>
            <div v-for="(label, key) in referralLabels" :key="key"><dt>{{ label }}</dt><dd><AnimatedNumber :value="selectedRegion.stages[key]" /></dd></div>
          </dl>
        </div>
      </div>
    </details>
  </section>
</template>

<style scoped>
.map-panel { min-width: 0; padding: 17px; border: 1px solid var(--border); border-radius: 15px; background: var(--card); }
.map-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.map-heading h2 { display: flex; align-items: center; gap: 8px; font-size: 19px; font-weight: 730; }
.map-heading h2 svg { color: var(--map-accent); }
.map-heading p, .map-ranking p { color: var(--muted-foreground); font-size: 12px; margin: 4px 0 0; }
.map-metrics { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 10px; }
.map-metrics button, .map-reset { font-size: 12px; font-weight: 640; padding: 6px 10px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; }
.map-metrics button[aria-pressed="true"], .map-reset:hover { background: color-mix(in srgb, var(--map-accent) 14%, var(--card)); border-color: color-mix(in srgb, var(--map-accent) 50%, var(--border)); }
.map-layout { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(200px, 1fr); gap: 13px; }
.map-viewport { min-width: 0; padding: 11px; border: 1px solid var(--border); border-radius: 11px; background: radial-gradient(ellipse at 48% 44%, color-mix(in srgb, var(--map-accent) 9%, var(--card)), var(--card) 82%); }
.map-viewport canvas { width: 100%; height: clamp(225px, 29vw, 335px); display: block; }
.map-viewport canvas.can-select { cursor: pointer; }
.map-caption { min-height: 27px; display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 650; }
.map-caption svg { color: var(--map-accent); flex: none; }
.map-caption strong, .map-list strong { color: color-mix(in srgb, var(--map-accent) 70%, var(--foreground)); }
.map-caption small { font-size: 11px; color: var(--muted-foreground); }
.map-legend { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; font-size: 11px; color: var(--muted-foreground); }
.map-legend i { display: block; width: 78px; height: 6px; border-radius: 10px; background: linear-gradient(90deg, color-mix(in srgb, var(--map-accent) 12%, var(--muted)), var(--map-accent)); }
.map-missing { display: flex; align-items: center; gap: 5px; margin-inline-start: auto; }
.map-missing b { width: 9px; height: 9px; border-radius: 3px; background: var(--muted); border: 1px solid var(--border); }
.map-ranking { min-width: 0; padding: 11px; border: 1px solid var(--border); border-radius: 11px; }
.map-ranking h3 { display: flex; align-items: baseline; flex-wrap: wrap; justify-content: space-between; gap: 4px; font-size: 14px; font-weight: 730; }
.map-ranking h3 span { color: var(--muted-foreground); font-size: 11px; font-weight: 500; }
.map-list { display: grid; gap: 6px; margin-top: 9px; max-height: 315px; overflow: auto; }
.map-list button { display: flex; align-items: center; justify-content: space-between; text-align: start; gap: 8px; padding: 8px 10px; border-radius: 7px; border: 1px solid transparent; background: color-mix(in srgb, var(--map-accent) 7%, var(--card)); font-size: 13px; cursor: pointer; }
.map-list button:hover, .map-list button[aria-pressed="true"] { border-color: var(--map-accent); background: color-mix(in srgb, var(--map-accent) 14%, var(--card)); }
.map-panel button:focus-visible { outline: 2px solid var(--ring); outline-offset: -2px; }
.map-region-detail { margin-top: 10px; padding: 9px 10px; border: 1px solid var(--border); border-radius: 8px; }
.map-region-detail summary { font-size: 13px; font-weight: 650; cursor: pointer; }
.map-region-stats { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 8px; }
.map-region-stats h3 { font-size: 12px; font-weight: 700; }
.map-region-stats dl { display: flex; gap: 6px 12px; flex-wrap: wrap; margin-top: 5px; }
.map-region-stats dt { font-size: 11px; color: var(--muted-foreground); }
.map-region-stats dd { margin: 2px 0 0; font-size: 13px; font-weight: 650; }
@media (max-width: 880px) { .map-layout { grid-template-columns: 1fr; } }
@media (max-width: 525px) { .map-panel { padding: 12px; } .map-reset { max-width: 110px; } }
</style>
