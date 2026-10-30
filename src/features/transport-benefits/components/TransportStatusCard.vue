<script setup lang="ts">
import { computed, type Component } from 'vue'
import { transportPalette, type TransportTone } from '../status-presentation'
const props = withDefaults(defineProps<{ label: string; count: number; selected: boolean; tone?: TransportTone; icon?: Component; share?: string; caption?: string }>(), { tone: 'neutral', share: '', caption: '' })
defineEmits<{ select: [] }>()
const palette = computed(() => transportPalette(props.tone))
</script>
<template>
  <button type="button" :aria-pressed="selected" :class="['relative min-w-0 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-[box-shadow,filter] hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', palette.card, palette.text, selected ? 'ring-2 ring-current ring-offset-1 ring-offset-background shadow-sm' : '']" @click="$emit('select')">
    <span :class="['absolute inset-y-0 left-0 w-1', palette.stripe]" aria-hidden="true" />
    <span class="flex items-center justify-between gap-2"><span class="flex items-center gap-1.5 text-xs font-medium"><component :is="icon" v-if="icon" class="h-4 w-4 shrink-0" />{{ label }}</span><strong class="text-xl tabular-nums">{{ count }}</strong></span>
    <span v-if="share || caption" class="mt-0.5 block text-xs opacity-80">{{ share || caption }}</span>
    <span v-if="$slots.default" class="mt-2 block border-t border-current/10 pt-2 text-xs tabular-nums"><slot /></span>
  </button>
</template>
