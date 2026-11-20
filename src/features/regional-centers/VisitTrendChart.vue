<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

type Point = { day: string; last: string; voucher: number; paid: number; unknown: number }
type SeriesKey = 'voucher' | 'paid' | 'unknown'
const props = defineProps<{ points: Point[]; selected?: string }>()
const emit = defineEmits<{ select: [day: string] }>()
const canvas = ref<HTMLCanvasElement>()
const hovered = ref<string>()
let resize: ResizeObserver | undefined
let theme: MutationObserver | undefined
let motion: MediaQueryList | undefined
let frame = 0
let reveal = 1

const palette: { key: SeriesKey; color: string }[] = [
  { key: 'voucher', color: '#0d997b' },
  { key: 'paid', color: '#8b5bdc' },
  { key: 'unknown', color: '#8796aa' },
]
const dateLabel = (value: string) => value.slice(5).split('-').reverse().join('.')
const axes = computed(() => {
  const peak = Math.max(4, ...props.points.flatMap(item => [item.voucher, item.paid, item.unknown]))
  const preliminary = peak / 4
  const power = 10 ** Math.floor(Math.log10(preliminary))
  const step = Math.ceil(preliminary / power) * power
  return { step, max: step * 4 }
})

function curve(ctx: CanvasRenderingContext2D, coordinates: { x: number; y: number }[]) {
  const first = coordinates[0]
  if (!first) return
  ctx.moveTo(first.x, first.y)
  coordinates.slice(1).forEach((point, index) => {
    const previous = coordinates[index]!
    const middle = (previous.x + point.x) / 2
    ctx.bezierCurveTo(middle, previous.y, middle, point.y, point.x, point.y)
  })
}

function draw() {
  const element = canvas.value
  if (!element || !props.points.length) return
  const { width, height } = element.getBoundingClientRect()
  if (!width || !height) return
  const scale = Math.min(2, window.devicePixelRatio || 1)
  const pixelWidth = Math.round(width * scale)
  const pixelHeight = Math.round(height * scale)
  if (element.width !== pixelWidth) element.width = pixelWidth
  if (element.height !== pixelHeight) element.height = pixelHeight
  const ctx = element.getContext('2d')
  if (!ctx) return
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = 1
  const dark = getComputedStyle(element).colorScheme.includes('dark')
  const left = 35
  const right = 10
  const top = 12
  const bottom = height - 11
  const plotWidth = Math.max(1, width - left - right)
  const dx = plotWidth / props.points.length
  const x = (index: number) => left + dx * (index + .5)
  const y = (value: number) => bottom - (bottom - top) * value / axes.value.max
  ctx.font = '11px system-ui, sans-serif'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let tick = 0; tick <= 4; tick++) {
    const value = tick * axes.value.step
    ctx.fillStyle = dark ? '#b1bfce' : '#627385'
    ctx.fillText(String(value), left - 7, y(value))
    ctx.strokeStyle = dark ? '#b1bfce36' : '#657e992f'
    ctx.setLineDash(tick ? [4, 5] : [])
    ctx.beginPath()
    ctx.moveTo(left, y(value))
    ctx.lineTo(width - right, y(value))
    ctx.stroke()
  }
  ctx.setLineDash([])
  const position = props.points.findIndex(item => item.day === (hovered.value ?? props.selected))
  if (position >= 0) {
    const focus = x(position)
    ctx.fillStyle = dark ? '#7184e529' : '#647beb16'
    ctx.fillRect(focus - dx / 2, top, dx, bottom - top)
    ctx.strokeStyle = dark ? '#b5c6f3a0' : '#6479b783'
    ctx.beginPath()
    ctx.moveTo(focus, top)
    ctx.lineTo(focus, bottom)
    ctx.stroke()
  }
  ctx.save()
  if (reveal < 1) {
    ctx.beginPath()
    ctx.rect(0, 0, left + plotWidth * reveal, height)
    ctx.clip()
  }
  for (const { key, color } of palette) {
    if (key === 'unknown' && !props.points.some(item => item.unknown)) continue
    const coordinates = props.points.map((item, index) => ({ x: x(index), y: y(item[key]) }))
    if (coordinates.length > 1) {
      const fill = ctx.createLinearGradient(0, top, 0, bottom)
      fill.addColorStop(0, color + '45')
      fill.addColorStop(1, color + '06')
      ctx.fillStyle = fill
      ctx.beginPath()
      curve(ctx, coordinates)
      ctx.lineTo(coordinates[coordinates.length - 1]!.x, bottom)
      ctx.lineTo(coordinates[0]!.x, bottom)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      curve(ctx, coordinates)
      ctx.strokeStyle = color
      ctx.lineWidth = 2.7
      ctx.lineCap = 'round'
      ctx.setLineDash(key === 'unknown' ? [4, 4] : [])
      ctx.stroke()
      ctx.setLineDash([])
    }
    const mark = coordinates[position >= 0 ? position : coordinates.length === 1 ? 0 : -1]
    if (mark) {
      ctx.beginPath()
      ctx.arc(mark.x, mark.y, 4.5, 0, Math.PI * 2)
      ctx.fillStyle = dark ? '#162238' : '#ffffff'
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2.4
      ctx.stroke()
    }
  }
  ctx.restore()
}

function drawSeries() {
  cancelAnimationFrame(frame)
  if (motion?.matches) {
    reveal = 1
    draw()
    return
  }
  const start = performance.now()
  reveal = 0
  draw()
  const advance = (now: number) => {
    const elapsed = Math.min(1, (now - start) / 650)
    reveal = 1 - (1 - elapsed) ** 3
    draw()
    if (elapsed < 1) frame = requestAnimationFrame(advance)
  }
  frame = requestAnimationFrame(advance)
}

watch(() => props.points, drawSeries, { flush: 'post' })
watch(() => [props.selected, hovered.value], draw, { flush: 'post' })
onMounted(() => {
  if (!canvas.value) return
  motion = matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', drawSeries)
  resize = new ResizeObserver(draw)
  resize.observe(canvas.value)
  theme = new MutationObserver(draw)
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  drawSeries()
})
onUnmounted(() => {
  cancelAnimationFrame(frame)
  motion?.removeEventListener('change', drawSeries)
  resize?.disconnect()
  theme?.disconnect()
})
</script>

<template>
  <div class="trend-line-chart">
    <div class="trend-line-frame">
      <canvas ref="canvas" aria-hidden="true"></canvas>
      <div class="trend-targets" :style="{ '--points': points.length }" role="group" aria-label="Grafikdagi kun yoki davrni tanlash">
        <button v-for="point in points" :key="point.day" type="button" class="chart-point"
          :aria-pressed="selected === point.day" aria-controls="regional-trend-detail"
          :aria-label="`${dateLabel(point.day)}${point.last === point.day ? '' : ' – ' + dateLabel(point.last)}: ${point.voucher} vaucherli, ${point.paid} pullik${point.unknown ? ', ' + point.unknown + ' aniqlanmagan' : ''}`"
          @click="emit('select', point.day)" @pointerenter="hovered = point.day" @pointerleave="hovered = undefined">
          <span>{{ dateLabel(point.day) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trend-line-chart { min-width: 0; overflow-x: auto; margin-top: 5px; }
.trend-line-frame { position: relative; min-width: 295px; padding-bottom: 25px; }
canvas { display: block; width: 100%; height: clamp(150px, 17vw, 205px); }
.trend-targets { position: absolute; top: 10px; bottom: 2px; left: 35px; right: 10px; display: grid; grid-template-columns: repeat(var(--points), minmax(0, 1fr)); }
.chart-point { position: relative; min-width: 0; padding: 0; border-radius: 5px; cursor: pointer; }
.chart-point:focus-visible { outline: 2px solid var(--ring); outline-offset: -2px; }
.chart-point span { position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%); white-space: nowrap; color: var(--muted-foreground); font-size: 9px; font-variant-numeric: tabular-nums; }
.chart-point[aria-pressed="true"] span { color: var(--foreground); font-weight: 750; }
@media (max-width: 1450px) { .chart-point:nth-child(even):not(:last-child):not([aria-pressed="true"]) span { visibility: hidden; } }
@media (max-width: 740px) {
  .chart-point:has(+ .chart-point[aria-pressed="true"]) span,
  .chart-point[aria-pressed="true"] + .chart-point span { visibility: hidden; }
}
</style>
