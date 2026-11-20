<script setup lang="ts">
defineProps<{ code: string; name?: string }>()
defineEmits<{ open: [code: string] }>()
</script>

<template>
  <button type="button" class="person-link" aria-haspopup="dialog" @click="$emit('open', code)">
    <strong>{{ name || code }}</strong>
    <span v-if="name">{{ code }}</span>
  </button>
</template>

<style scoped>
.person-link { display: inline-grid; gap: 2px; min-width: 0; text-align: start; color: var(--primary); cursor: pointer; }
.person-link strong { font-size: 13px; font-weight: 680; overflow-wrap: anywhere; }
.person-link span { color: var(--muted-foreground); font-size: 11px; font-variant-numeric: tabular-nums; }
.person-link:hover strong { text-decoration: underline; text-underline-offset: 2px; }
.person-link:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; border-radius: 3px; }
</style>
