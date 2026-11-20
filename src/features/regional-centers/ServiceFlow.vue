<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowDown, ArrowRight, ArrowUpRight, ClipboardList, Database, Layers3, RotateCcw, Wallet } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import AnimatedNumber from './AnimatedNumber.vue'

type FlowStage = { title: string; detail: string; value: number | null; path: string; filters?: Record<string, string>; suffix?: string; decimals?: number }
const props = defineProps<{
  flows: { id: string; title: string; stages: FlowStage[] }[]
  scope: string
  location: (path: string, filters?: Record<string, string>) => RouteLocationRaw
}>()

const selected = ref('visits')
const revision = ref(0)
const flow = computed(() => props.flows.find(item => item.id === selected.value) ?? props.flows[0])
const icons = { visits: ClipboardList, capacity: Layers3, finance: Wallet }
watch(() => [props.scope, flow.value?.id, ...flow.value?.stages.map(stage => stage.value) ?? []], () => revision.value++)
</script>

<template>
  <section v-if="flow" class="service-flow" aria-labelledby="regional-flow-title">
    <header class="flow-heading">
      <div>
        <h2 id="regional-flow-title"><Database :size="19" aria-hidden="true" /> Ko‘rsatkich qanday hisoblanadi?</h2>
        <p>Manba yozuvidan rahbariyat panelidagi natijagacha</p>
      </div>
      <div class="flow-actions">
        <div class="flow-switch" role="group" aria-label="Ko‘rsatkich oqimi">
          <button v-for="item in flows" :key="item.id" type="button" :aria-pressed="selected === item.id" @click="selected = item.id">
            <component :is="icons[item.id as keyof typeof icons]" :size="15" aria-hidden="true" /> {{ item.title }}
          </button>
        </div>
        <button type="button" class="flow-replay" aria-label="Ma’lumot oqimini qayta ko‘rsatish" title="Qayta ko‘rsatish" @click="revision++"><RotateCcw :size="16" /></button>
      </div>
    </header>
    <ol :key="flow.id" class="flow-stages">
      <li v-for="(stage, index) in flow.stages" :key="stage.title" class="flow-node" :data-stage="index">
        <div v-if="index > 0" class="flow-connector" aria-hidden="true">
          <span :key="revision" class="flow-packet" :style="{ '--packet-delay': (index - 1) * 240 + 'ms' }"></span>
          <ArrowRight class="flow-arrow-right" :size="15" /><ArrowDown class="flow-arrow-down" :size="15" />
        </div>
        <RouterLink class="flow-card" :to="location(stage.path, stage.filters)">
          <span class="flow-stage-label">{{ ['Manba', 'Hisoblash', 'Natija'][index] }}<ArrowUpRight :size="15" aria-hidden="true" /></span>
          <strong class="flow-value"><AnimatedNumber :value="stage.value" :suffix="stage.suffix" :decimals="stage.decimals" :delay="index * 240" /></strong>
          <span class="flow-title">{{ stage.title }}</span>
          <small>{{ stage.detail }}</small>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.service-flow { --flow-ink: #25779c; min-width: 0; padding: 15px 17px; border: 1px solid color-mix(in srgb, var(--flow-ink) 26%, var(--border)); border-radius: 16px; background: linear-gradient(117deg, color-mix(in srgb, #258bc4 11%, var(--card)), color-mix(in srgb, #6653cd 9%, var(--card))); }
.flow-heading, .flow-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; justify-content: space-between; }
.flow-heading h2 { display: flex; align-items: center; gap: 7px; margin: 0; font-size: 17px; font-weight: 720; }
.flow-heading h2 svg { color: color-mix(in srgb, var(--flow-ink) 75%, var(--foreground)); }
.flow-heading p { margin: 3px 0 0; font-size: 12px; color: var(--muted-foreground); }
.flow-switch { display: flex; flex-wrap: wrap; gap: 3px; padding: 4px; border-radius: 9px; border: 1px solid var(--border); background: var(--card); }
.flow-switch button { display: inline-flex; gap: 5px; align-items: center; padding: 5px 8px; border-radius: 6px; font-size: 12px; font-weight: 650; cursor: pointer; }
.flow-switch button[aria-pressed="true"] { background: #285baf; color: #fff; }
.flow-replay { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); cursor: pointer; }
.flow-replay:hover { color: var(--primary); }
.flow-stages { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px; padding: 0; margin: 13px 0 0; list-style: none; }
.flow-node { position: relative; min-width: 0; --node-tone: #347bc1; }
.flow-node[data-stage="1"] { --node-tone: #8758cf; }
.flow-node[data-stage="2"] { --node-tone: #14947c; }
.flow-card { display: flex; flex-direction: column; min-width: 0; height: 100%; gap: 3px; padding: 10px 12px 11px; border-radius: 10px; border: 1px solid color-mix(in srgb, var(--node-tone) 35%, var(--border)); border-top: 3px solid var(--node-tone); background: var(--card); }
.flow-card:hover { background: color-mix(in srgb, var(--node-tone) 8%, var(--card)); }
.flow-stage-label { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: color-mix(in srgb, var(--node-tone) 56%, var(--foreground)); font-size: 12px; font-weight: 680; }
.flow-value { font-size: clamp(21px, 2.15vw, 31px); line-height: 1.15; letter-spacing: -.025em; overflow-wrap: anywhere; }
.flow-title { font-size: 13px; font-weight: 690; }
.flow-card small { display: block; color: var(--muted-foreground); font-size: 11px; line-height: 1.4; }
.flow-connector { position: absolute; top: calc(50% - 10px); right: 100%; width: 48px; height: 20px; display: grid; place-items: center end; color: color-mix(in srgb, var(--node-tone) 75%, var(--foreground)); pointer-events: none; }
.flow-connector::before { content: ''; position: absolute; left: 3px; right: 11px; top: 9px; border-top: 2px dotted color-mix(in srgb, var(--node-tone) 54%, var(--border)); }
.flow-arrow-down { display: none; }
.flow-packet { z-index: 1; position: absolute; inset-inline-start: 1px; top: 7px; width: 11px; height: 6px; border-radius: 99px; background: var(--node-tone); box-shadow: 0 0 7px var(--node-tone); opacity: 0; animation: transmit .38s var(--packet-delay) both ease-out; }
.service-flow :is(button, a):focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
@keyframes transmit { 12%, 80% { opacity: 1; } to { transform: translateX(36px); opacity: 0; } }
@keyframes transmit-down { 12%, 80% { opacity: 1; } to { transform: translateY(23px); opacity: 0; } }
@media (max-width: 720px) {
  .flow-stages { grid-template-columns: 1fr; gap: 27px; }
  .flow-connector { top: -27px; right: auto; left: calc(50% - 10px); width: 20px; height: 27px; place-items: end center; }
  .flow-connector::before { left: 9px; right: auto; top: 2px; bottom: 10px; border-top: 0; border-left: 2px dotted color-mix(in srgb, var(--node-tone) 54%, var(--border)); }
  .flow-arrow-right { display: none; }
  .flow-arrow-down { display: initial; }
  .flow-packet { inset-inline-start: 7px; top: 0; width: 6px; height: 9px; animation-name: transmit-down; }
}
@media (prefers-reduced-motion: reduce) { .flow-packet, .flow-replay { display: none; } }
</style>
