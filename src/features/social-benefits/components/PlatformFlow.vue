<script setup lang="ts">
import { onUnmounted, ref, watch, type Component } from 'vue'
import { ArrowRight, CheckCircle2, Play, RotateCcw } from 'lucide-vue-next'

const props = defineProps<{ steps: { title: string; detail: string; icon: Component }[]; scenario: string }>()
const current = ref(-1)
const running = ref(false)
const complete = ref(false)
const demoStageDuration = 1450
let timer: ReturnType<typeof setTimeout> | undefined

function reset() {
  clearTimeout(timer)
  running.value = false
  complete.value = false
  current.value = -1
}

function advance() {
  if (current.value === props.steps.length - 1) {
    running.value = false
    complete.value = true
    return
  }
  current.value++
  timer = setTimeout(advance, demoStageDuration)
}

function play() {
  reset()
  running.value = true
  advance()
}

watch(() => props.scenario, reset)
onUnmounted(reset)
</script>

<template>
  <div class="flow-demo">
    <ol class="flow-lane">
      <li v-for="(step, index) in steps" :key="step.title">
        <div class="flow-node" :class="{ active: running && current === index, passed: complete || current > index }" :aria-current="running && current === index ? 'step' : undefined">
          <component :is="complete || current > index ? CheckCircle2 : step.icon" :size="23" aria-hidden="true" />
          <strong>{{ step.title }}</strong>
          <span>{{ step.detail }}</span>
        </div>
        <span v-if="index < steps.length - 1" class="flow-edge" :class="{ sending: running && current === index, sent: current > index }" aria-hidden="true">
          <ArrowRight :size="18" /><i v-if="running && current === index" />
        </span>
      </li>
    </ol>
    <div class="flow-controls">
      <button type="button" @click="play">
        <component :is="running || complete ? RotateCcw : Play" :size="17" aria-hidden="true" />
        {{ running || complete ? 'Oqimni qayta boshlash' : 'Oqimni ijro etish' }}
      </button>
      <p role="status">
        <template v-if="complete">Xabar hisobga olindi va fuqaro kabinetida ko‘rindi.</template>
        <template v-else-if="running">{{ current + 1 }} / {{ steps.length }} · {{ steps[current]?.title }}</template>
        <template v-else>Namunaviy ijro xabarining harakatini ko‘ring.</template>
      </p>
    </div>
  </div>
</template>

<style scoped>
.flow-lane { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.2rem; margin-top: 1rem; }
.flow-lane li { display: flex; position: relative; min-width: 0; }
.flow-node { display: grid; flex: 1; align-content: start; gap: .42rem; padding: .85rem; border-radius: .6rem; border: 2px solid var(--border); background: var(--muted); transition: background-color .25s, border-color .25s, box-shadow .25s; }
.flow-node strong { font-size: .93rem; }
.flow-node span { color: var(--muted-foreground); font-size: .8rem; overflow-wrap: anywhere; }
.flow-node.active { border-color: #179884; box-shadow: 0 0 0 4px #17988445; background: color-mix(in oklch, #179884 14%, var(--card)); }
.flow-node.passed { border-color: #179884; }
.flow-node svg, .flow-edge.sent, .flow-edge.sending { color: #168875; }
.flow-edge { position: absolute; left: 100%; top: calc(50% - 9px); width: 2.2rem; display: grid; place-items: center; color: var(--muted-foreground); }
.flow-edge i { position: absolute; left: 0; top: 5px; width: .62rem; height: .62rem; border-radius: 50%; background: #12a891; box-shadow: 0 0 10px #179884; animation: transfer 1.15s ease-in-out infinite; }
.flow-controls { display: flex; flex-wrap: wrap; align-items: center; gap: .65rem 1rem; margin-top: 1rem; }
.flow-controls button { display: inline-flex; align-items: center; gap: .5rem; border-radius: .5rem; background: #116954; color: #fff; font-size: .875rem; font-weight: 650; padding: .65rem .9rem; }
.flow-controls button:hover { background: #0c5341; }
.flow-controls button:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }
.flow-controls p { font-size: .875rem; font-weight: 600; color: var(--foreground); }
@keyframes transfer { from { transform: translateX(0); } to { transform: translateX(1.55rem); } }
@keyframes transfer-down { from { transform: translateY(0); } to { transform: translateY(1.15rem); } }
@media (max-width: 760px) {
  .flow-lane { grid-template-columns: minmax(0, 1fr); gap: 1.8rem; }
  .flow-edge { top: 100%; left: calc(50% - 9px); width: 18px; height: 1.8rem; }
  .flow-edge svg { transform: rotate(90deg); }
  .flow-edge i { top: 0; left: 4px; animation-name: transfer-down; }
}
@media (prefers-reduced-motion: reduce) {
  .flow-node { transition: none; }
  .flow-edge i { animation: none; }
}
</style>
