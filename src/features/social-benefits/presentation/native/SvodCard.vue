<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed } from 'vue'
import { svod, figure, categories, type Measure } from './svod'
const props=defineProps<{item:Measure}>()
const fields=computed(()=>[
  ['Manbadagi tur',props.item.kind],['Ko‘mak shakli',props.item.subtype],['Miqdor yoki me’yor',props.item.rate],
  ['Izoh',props.item.note],['Mas’ul idoralar',props.item.agency],['Raqamlashtirish holati',props.item.digital],
  ['Axborot tizimi',props.item.system],['Manbadagi huquqiy asos',props.item.basis],
].filter(([,value])=>value))
const proposals=computed(()=>svod.proposals.filter(p=>p.masterRow===props.item.row))
</script>
<template>
  <section class="svod-card">
    <h3>{{ benefitText("Imtiyoz pasporti") }}</h3>
    <dl class="detail-list"><template v-for="[label,value] in fields" :key="label"><dt>{{ benefitText(label) }}</dt><dd>{{ benefitText(value) }}</dd></template></dl>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Davr") }}</th><th>{{ benefitText("Soni") }}</th><th>{{ benefitText("Summa, mln so‘m") }}</th></tr></thead>
      <tbody><tr v-for="(period,i) in ['2025-yil','2026-yil I chorak']" :key="period"><td>{{ benefitText(period) }}</td><td>{{ figure(item.figures[i*2]??null) }}</td><td>{{ figure(item.figures[i*2+1]??null) }}</td></tr></tbody></table></div>
    <p class="np-note">{{ benefitText("СВОД · ") }}{{ benefitText(svod.sheet) }} · {{ benefitText(item.row) }}{{ benefitText("-qator") }}</p>
    <details v-if="proposals.length"><summary>{{ benefitText("Taklif va qaydlar · ") }}{{ benefitText(proposals.length) }}</summary><p v-for="p in proposals" :key="p.sheet+p.row">{{ benefitText(categories[p.sheet]) }} · {{ benefitText(p.row) }}{{ benefitText("-qator ") }}<span v-if="p.note">— {{ benefitText(p.note) }}</span></p></details>
  </section>
</template>
<style scoped>.svod-card{display:grid;gap:.7rem;min-width:0}.svod-card dd{overflow-wrap:anywhere}.svod-card h3{font-weight:650}</style>
