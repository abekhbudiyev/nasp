<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionBlock from '@/shared/components/SectionBlock.vue'
import { hostTrend } from '../admin-demo-data'

const canvas = ref<HTMLCanvasElement | null>(null)
const activeIndex = ref(hostTrend.samples.length - 1)
const shortTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', hour: '2-digit', minute: '2-digit' })
const shortDate = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric' })
const samples = hostTrend.samples.map((sample) => {
  const moment = new Date(sample.at)
  return { ...sample, time: shortTime.format(moment), date: shortDate.format(moment).replace(/\//g, '.') }
})
const activeSample = computed(() => samples[activeIndex.value])
const metrics = hostTrend.series.map(metric => {
  const values = samples.map(sample => sample[metric.id])
  return {
    ...metric,
    colorVariable: `--trend-${metric.id}`,
    min: Math.min(...values),
    average: Math.round(values.reduce<number>((sum, value) => sum + value, 0) / values.length),
    max: Math.max(...values),
  }
})
const scale = [100, 75, 50, 25, 0]

function trendTangents(values: number[]) {
  return values.map((value, index) => {
    const previous = values[index - 1]
    const next = values[index + 1]
    if (previous === undefined) return next === undefined ? 0 : next - value
    if (next === undefined) return value - previous

    const riseIn = value - previous
    const riseOut = next - value
    // Preserve each interval's direction and keep the curve within its measured endpoints.
    return riseIn * riseOut > 0 ? 2 * riseIn * riseOut / (riseIn + riseOut) : 0
  })
}

function drawTrend() {
  const element = canvas.value
  const context = element?.getContext('2d')
  if (!element || !context) return

  const { width, height } = element.getBoundingClientRect()
  if (!width || !height) return
  const ratio = window.devicePixelRatio || 1
  element.width = Math.round(width * ratio)
  element.height = Math.round(height * ratio)
  context.scale(ratio, ratio)

  context.lineWidth = 2.75
  context.lineCap = 'round'
  const step = width / samples.length
  const colors = window.getComputedStyle(element)

  for (const metric of metrics) {
    const positions = samples.map(sample => height * (1 - sample[metric.id] / 100))
    const tangents = trendTangents(positions)
    context.beginPath()
    positions.forEach((y, index) => {
      const x = (index + 0.5) * step
      const previousY = positions[index - 1]
      if (previousY === undefined) {
        context.moveTo(x, y)
        return
      }

      context.bezierCurveTo(
        x - step * 2 / 3, previousY + (tangents[index - 1] ?? 0) / 3,
        x - step / 3, y - (tangents[index] ?? 0) / 3,
        x, y,
      )
    })
    context.strokeStyle = colors.getPropertyValue(metric.colorVariable).trim()
    context.stroke()
  }
}

const sizeObserver = new ResizeObserver(drawTrend)
const themeObserver = new MutationObserver(drawTrend)
onMounted(() => {
  if (canvas.value) sizeObserver.observe(canvas.value)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => {
  sizeObserver.disconnect()
  themeObserver.disconnect()
})
</script>

<template>
  <SectionBlock title="Server yuklamasi tarixi" description="23–24 noyabr · 3 soat oralig‘idagi demo o‘lchovlar (UZT).">
    <figure aria-label="CPU, RAM va disk bandligi foizda" class="trend-panel rounded-3xl bg-muted/35 p-3 sm:p-5">
      <figcaption v-if="activeSample" class="mb-5 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(12rem,1fr)] lg:items-stretch" aria-live="polite">
        <dl class="grid grid-cols-3 gap-1.5 sm:gap-3">
          <div v-for="metric in metrics" :key="metric.id" class="min-w-0 rounded-2xl bg-current/8 px-2 py-2.5 sm:px-4 sm:py-3" :style="{ color: `var(${metric.colorVariable})` }">
            <dt class="flex items-center gap-x-1 text-[11px] font-semibold sm:gap-x-2 sm:text-xs">
              <span class="h-0.5 w-3 shrink-0 rounded-full bg-current sm:w-6" aria-hidden="true" />
              <span>{{ metric.label }}</span>
            </dt>
            <dd class="mt-1.5 text-xl font-semibold leading-none tracking-tight text-foreground tabular-nums sm:text-3xl">{{ activeSample[metric.id] }}<span class="ml-0.5 text-xs text-muted-foreground sm:text-base">%</span></dd>
          </div>
        </dl>
        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl bg-muted px-3 py-2 text-xs lg:flex-col lg:items-start lg:justify-center lg:gap-1.5 lg:px-4">
          <span class="text-muted-foreground">Tanlangan o‘lchov</span>
          <time :datetime="activeSample.at" class="font-semibold text-foreground tabular-nums sm:text-sm">{{ activeSample.date }} · {{ activeSample.time }} UZT</time>
        </div>
      </figcaption>
      <div class="relative ml-9 h-44 sm:h-64">
        <div v-for="tick in scale" :key="tick" class="pointer-events-none absolute inset-x-0 border-t border-border" :style="{ bottom: `${tick}%` }" aria-hidden="true">
          <span class="absolute top-0 right-full mr-2 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground">{{ tick }}%</span>
        </div>
        <div class="pointer-events-none absolute inset-y-0 bg-linear-to-r from-transparent via-primary/8 to-transparent" :style="{ left: `${activeIndex * 100 / samples.length}%`, width: `${100 / samples.length}%` }" aria-hidden="true" />
        <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        <ol class="relative grid h-full grid-cols-8">
          <li v-for="(point, index) in samples" :key="point.at" class="relative min-w-0">
            <button
              type="button"
              class="group relative block size-full cursor-crosshair focus-visible:outline-none"
              :aria-label="`${point.date} ${point.time} UZT, ${metrics.map(metric => `${metric.label} ${point[metric.id]}%`).join(', ')}`"
              :aria-pressed="index === activeIndex"
              @pointerenter="activeIndex = index"
              @focus="activeIndex = index"
              @click="activeIndex = index"
            >
              <span v-if="index === activeIndex" class="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-transparent via-muted-foreground/55 to-transparent" aria-hidden="true" />
              <span v-for="metric in metrics" :key="metric.id" class="absolute left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-current group-focus-visible:ring-2 group-focus-visible:ring-current group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background" :class="index === activeIndex ? 'size-3 bg-current ring-4 ring-current/20' : 'size-2 bg-card'" :style="{ bottom: `${point[metric.id]}%`, color: `var(${metric.colorVariable})` }" aria-hidden="true" />
            </button>
          </li>
        </ol>
      </div>
      <div class="mt-2 ml-9 grid grid-cols-8 text-center text-[9px] tabular-nums text-muted-foreground sm:text-xs" aria-hidden="true">
        <span v-for="(point, index) in samples" :key="point.at" class="rounded-full py-1" :class="{ 'bg-primary/10 font-semibold text-primary': index === activeIndex }">{{ point.time }}</span>
      </div>
    </figure>
    <details class="rounded-lg border bg-card px-3 py-2 text-sm">
      <summary class="cursor-pointer font-medium text-primary">Davr statistikasi</summary>
      <table class="mt-2 w-full text-left text-xs tabular-nums sm:text-sm">
        <thead class="text-muted-foreground">
          <tr><th scope="col">Ko‘rsatkich</th><th scope="col">Eng past</th><th scope="col">O‘rtacha</th><th scope="col">Eng yuqori</th></tr>
        </thead>
        <tbody>
          <tr v-for="metric in metrics" :key="metric.id" class="border-t">
            <th scope="row" class="py-1.5 font-medium">{{ metric.label }}</th><td>{{ metric.min }}%</td><td>{{ metric.average }}%</td><td>{{ metric.max }}%</td>
          </tr>
        </tbody>
      </table>
    </details>
  </SectionBlock>
</template>

<style>
.trend-panel {
  --trend-cpu: #0f766e;
  --trend-ram: #2563eb;
  --trend-disk: #7c3aed;
}

.dark .trend-panel {
  --trend-cpu: #5eead4;
  --trend-ram: #93c5fd;
  --trend-disk: #d8b4fe;
}
</style>
