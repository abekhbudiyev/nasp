<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RegistryScope } from './registry'

defineProps<{ scope: RegistryScope }>()
</script>

<template>
  <div v-if="scope.fields.length || scope.links?.length" class="registry-scope">
    <label v-for="field in scope.fields" :key="field.key">{{ field.label }}
      <select :aria-label="field.label" :value="field.value" @change="scope.change(field.key, ($event.target as HTMLSelectElement).value)">
        <option value="">{{ field.all }}</option>
        <option v-for="option in field.options" :key="option.id" :value="option.id">{{ option.title }}</option>
      </select>
    </label>
    <RouterLink v-for="link in scope.links" :key="link.label" :to="link.to" :aria-label="link.label">{{ link.text }}</RouterLink>
  </div>
</template>

<style scoped>
.registry-scope { display: grid; gap: 7px; min-width: 0; }
.registry-scope label { display: grid; gap: 3px; color: var(--muted-foreground); font-size: 12px; }
.registry-scope select { width: 100%; min-width: 0; padding: 5px 7px; border: 1px solid var(--border); border-radius: 7px; color: var(--foreground); background: var(--card); }
.registry-scope a { justify-self: start; font-size: 12px; color: var(--primary); text-decoration: underline; text-underline-offset: 2px; }
</style>
