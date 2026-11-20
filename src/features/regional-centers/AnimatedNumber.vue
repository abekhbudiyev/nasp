<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  value: number | null
  suffix?: string
  decimals?: number
  delay?: number
}>(), { suffix: '', decimals: 0, delay: 0 })

const previous = ref(props.value)
const revision = ref(0)
const formatter = computed(() => new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: props.decimals }))
const label = computed(() => props.value === null ? '—' : formatter.value.format(props.value) + props.suffix)
let preference: MediaQueryList | undefined

function glyphs(value: number | null) {
  if (value === null) return []
  const parts = formatter.value.formatToParts(value)
  let place = parts.reduce((sum, part) => sum + (part.type === 'integer' ? part.value.length : 0), 0)
  return parts.flatMap((part, index) => [...part.value].map((character, digit) => ({
    character,
    key: part.type === 'integer' ? `integer-${--place}` : part.type === 'fraction' ? `fraction-${digit}` : `separator-${index}-${digit}`,
    numeric: part.type === 'integer' || part.type === 'fraction',
  })))
}

const currentGlyphs = computed(() => glyphs(props.value))
const priorGlyphs = computed(() => new Map(glyphs(previous.value).map(item => [item.key, item.character])))
const direction = computed(() => props.value !== null && previous.value !== null && props.value < previous.value ? 1 : -1)

function changed(key: string, character: string) {
  return previous.value !== null && previous.value !== props.value && priorGlyphs.value.get(key) !== character
}

watch(() => props.value, (value, oldValue) => {
  previous.value = preference?.matches ? value : oldValue
  revision.value++
})

function updatePreference() {
  if (preference?.matches) previous.value = props.value
}

onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', updatePreference)
})
onUnmounted(() => preference?.removeEventListener('change', updatePreference))
</script>

<template>
  <span class="animated-number">
    <span class="animated-number-value" aria-hidden="true" :style="{ '--digit-direction': direction, '--digit-delay': delay + 'ms' }">
      <template v-if="value === null">—</template>
      <template v-else><template v-for="glyph in currentGlyphs" :key="glyph.key"><span v-if="glyph.numeric && changed(glyph.key, glyph.character)" :key="revision" class="digit-window" :data-previous="priorGlyphs.get(glyph.key)"><span>{{ glyph.character }}</span></span><template v-else>{{ glyph.character }}</template></template>{{ suffix }}</template>
    </span>
    <span class="sr-only">{{ label }}</span>
  </span>
</template>

<style scoped>
/* Keep the screen-reader label inside the module's scroll container. */
.animated-number { position: relative; display: inline; font-variant-numeric: tabular-nums; }
.animated-number-value { white-space: pre-wrap; }
.digit-window { position: relative; display: inline-block; overflow: hidden; vertical-align: bottom; line-height: inherit; }
.digit-window::before { content: attr(data-previous); position: absolute; inset: 0; animation: digit-out .36s cubic-bezier(.22,.74,.25,1) var(--digit-delay) both; }
.digit-window > span { display: inline-block; animation: digit-in .36s cubic-bezier(.22,.74,.25,1) var(--digit-delay) both; }
@keyframes digit-out { to { transform: translateY(calc(100% * var(--digit-direction))); opacity: 0; } }
@keyframes digit-in { from { transform: translateY(calc(-100% * var(--digit-direction))); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .digit-window::before { display: none; }
  .digit-window > span { animation: none; }
}
</style>
