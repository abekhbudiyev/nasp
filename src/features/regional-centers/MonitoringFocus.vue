<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleCheck, TriangleAlert } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import AnimatedNumber from './AnimatedNumber.vue'

const props = defineProps<{ alerts: { id: string; title: string; detail: string; to: RouteLocationRaw }[] }>()
const selection = ref('')
const current = computed(() => Math.max(0, props.alerts.findIndex(alert => alert.id === selection.value)))
const alert = computed(() => props.alerts[current.value])

function step(amount: number) {
  const size = props.alerts.length
  if (size > 1) selection.value = props.alerts[(current.value + amount + size) % size]?.id ?? ''
}
</script>

<template>
  <section class="monitoring-focus" :data-alert="!!alert" aria-labelledby="monitoring-focus-title">
    <div class="focus-status">
      <span class="focus-icon"><TriangleAlert v-if="alert" :size="25" aria-hidden="true" /><CircleCheck v-else :size="25" aria-hidden="true" /></span>
      <div>
        <h2 id="monitoring-focus-title" aria-label="Bugungi monitoring signallari">{{ alert ? 'Bugun e’tibor talab qiladi' : 'Bugungi signallar' }}</h2>
        <p v-if="alert"><strong><AnimatedNumber :value="alerts.length" /></strong> ta kvota yoki sifat nazorati signali</p>
        <p v-else>Tanlangan kesimda kvota yoki muddati o‘tgan sifat signali yo‘q.</p>
      </div>
    </div>
    <div v-if="alert" class="focus-detail">
      <RouterLink :key="alert.id" :to="alert.to" class="focus-alert">
        <span><strong>{{ alert.title }}</strong><small>{{ alert.detail }}</small></span><ArrowUpRight :size="17" aria-hidden="true" />
      </RouterLink>
      <div v-if="alerts.length > 1" class="focus-controls" role="group" aria-label="Signallarni ko‘rish">
        <button type="button" aria-label="Oldingi signal" @click="step(-1)"><ArrowLeft :size="14" /></button>
        <div class="focus-position" aria-live="polite"><AnimatedNumber :value="current + 1" /> / {{ alerts.length }}</div>
        <button type="button" aria-label="Keyingi signal" @click="step(1)"><ArrowRight :size="14" /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.monitoring-focus { --tone: #138e70; padding: 15px 17px; display: grid; grid-template-columns: minmax(245px, .8fr) minmax(0, 1.2fr); gap: 14px; align-items: center; border: 1px solid color-mix(in srgb, var(--tone) 34%, var(--border)); border-radius: 13px; background: linear-gradient(105deg, color-mix(in srgb, var(--tone) 15%, var(--card)), var(--card) 88%); }
.monitoring-focus[data-alert="true"] { --tone: #bf6a13; }
.focus-status { display: flex; align-items: center; gap: 12px; }
.focus-icon { display: grid; place-items: center; flex: 0 0 48px; height: 48px; border-radius: 12px; background: color-mix(in srgb, var(--tone) 21%, var(--card)); color: color-mix(in srgb, var(--tone) 72%, var(--foreground)); }
.focus-status h2 { margin: 0; font-size: clamp(16px, 1.55vw, 22px); font-weight: 720; }
.focus-status p { margin: 3px 0 0; color: var(--muted-foreground); font-size: 12px; }
.focus-detail { min-width: 0; }
.focus-alert { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 11px; border: 1px solid var(--border); border-radius: 9px; background: var(--card); font-size: 13px; animation: show-alert .26s ease-out; }
.focus-alert:hover { border-color: var(--tone); }
.focus-alert svg { flex-shrink: 0; color: color-mix(in srgb, var(--tone) 75%, var(--foreground)); }
.focus-alert small { display: block; margin-top: 2px; color: var(--muted-foreground); font-size: 11px; }
.focus-controls { display: flex; align-items: center; gap: 6px; margin-top: 7px; }
.focus-controls button { display: grid; place-items: center; width: 28px; height: 25px; border-radius: 6px; border: 1px solid var(--border); background: var(--card); cursor: pointer; }
.focus-controls button:hover { color: var(--tone); }
.focus-position { padding: 0 5px; color: var(--muted-foreground); font-size: 12px; }
.monitoring-focus :is(a, button):focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
@keyframes show-alert { from { opacity: .18; transform: translateY(5px); } }
@media (max-width: 800px) { .monitoring-focus { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .focus-alert { animation: none; } }
</style>
