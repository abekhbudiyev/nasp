<script setup lang="ts">
import { computed } from 'vue'
import { exchangeContracts, type ExchangeStep } from './exchange-contracts'
const props = defineProps<{ step: ExchangeStep; expanded?: boolean }>()
const contract = computed(() => exchangeContracts[props.step])
</script>

<template>
  <div class="contract">
    <p class="contract-actor"><strong>Bajaruvchi</strong> {{ contract.actor }}</p>
    <p class="contract-route">{{ contract.direction }}</p>
    <details :open="expanded || undefined">
      <summary>Ma’lumotlar tarkibi</summary>
      <div class="contract-fields">
        <div v-if="contract.request.length">
          <h4>{{ step === 'review' ? 'Tekshiruv uchun' : 'Yuboriladi' }}</h4>
          <dl><div v-for="[field, description] in contract.request" :key="field"><dt>{{ field }}</dt><dd>{{ description }}</dd></div></dl>
        </div>
        <div v-if="contract.response.length">
          <h4>{{ step === 'citizen' ? 'Fuqaroga ko‘rinadi' : 'Natija' }}</h4>
          <dl><div v-for="[field, description] in contract.response" :key="field"><dt>{{ field }}</dt><dd>{{ description }}</dd></div></dl>
        </div>
      </div>
    </details>
  </div>
</template>

<style scoped>
.contract { display:grid; gap:4px; padding:9px 11px; background:var(--accent); border-radius:7px; font-size:13px; overflow-wrap:anywhere; }
.contract-actor strong { margin-inline-end:5px; }
.contract-route { color:var(--muted-foreground); }
summary { cursor:pointer; width:fit-content; color:var(--primary); font-weight:600; padding-block:3px; }
.contract-fields { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr)); gap:12px; margin-block:5px; }
h4 { font-size:12px; font-weight:680; margin-bottom:5px; }
dl > div { padding-block:4px; border-top:1px solid var(--border); }
dt { font:600 11px var(--font-mono, monospace); }
dd { color:var(--muted-foreground); font-size:12px; }
</style>
