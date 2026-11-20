<script setup lang="ts">
import { onMounted, onUnmounted, ref, useId } from 'vue'
import { ListFilter, X } from 'lucide-vue-next'

defineProps<{ label: string; active?: number; align?: 'start' | 'end' }>()
const id = useId()
const menu = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const open = ref(false)

function close(focus = false) {
  open.value = false
  if (focus) trigger.value?.focus()
}

function outside(event: PointerEvent) {
  if (open.value && menu.value && !event.composedPath().includes(menu.value)) close()
}

onMounted(() => document.addEventListener('pointerdown', outside))
onUnmounted(() => document.removeEventListener('pointerdown', outside))
</script>

<template>
  <div ref="menu" class="registry-filter-menu" :data-align="align || 'end'" @keydown.esc.stop="close(true)">
    <button ref="trigger" type="button" class="registry-filter-button"
      :aria-label="label" :aria-expanded="open" :aria-controls="id" @click="open = !open">
      <ListFilter :size="16" aria-hidden="true" /> Filtrlar <strong v-if="active">{{ active }}</strong>
    </button>
    <section v-if="open" :id="id" class="registry-filter-popup" :aria-label="label">
      <button type="button" class="registry-filter-close" aria-label="Filtr oynasini yopish" @click="close(true)"><X :size="16" aria-hidden="true" /></button>
      <slot />
    </section>
  </div>
</template>

<style scoped>
.registry-filter-menu { position: relative; flex: none; }
.registry-filter-menu:has(.registry-filter-popup) { z-index: 5; }
.registry-filter-button { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 5px 8px; border: 1px solid var(--border); border-radius: 7px; background: var(--card); color: var(--foreground); font-size: 12px; font-weight: 650; cursor: pointer; white-space: nowrap; }
.registry-filter-button[aria-expanded="true"], .registry-filter-button:hover { background: var(--muted); }
.registry-filter-button strong { padding: 1px 4px; border-radius: 4px; background: var(--muted); color: var(--primary); font-size: 11px; }
.registry-filter-popup { position: absolute; inset-inline-end: 0; top: calc(100% + 6px); width: min(395px, calc(100vw - 40px)); max-height: min(58dvh, 390px); overflow: auto; padding: 12px 30px 12px 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--card); color: var(--foreground); box-shadow: 0 9px 24px #14253632; }
[data-align="start"] .registry-filter-popup { inset-inline: 0 auto; }
.registry-filter-close { position: absolute; inset: 6px 6px auto auto; display: grid; place-items: center; width: 23px; height: 23px; border-radius: 5px; cursor: pointer; }
.registry-filter-close:hover { background: var(--muted); }
.registry-filter-menu button:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
</style>
