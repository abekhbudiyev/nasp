<script setup lang="ts">
import { computed, ref } from 'vue'
import { benefitText } from '@/shared/i18n'
import { money, num } from './data'
type Row = { key: string; name: string; amount: number | null; measures: number | null }
const props = defineProps<{ cohorts: Row[]; organizations: Row[]; measures: (Row & { kind: string })[]; agency: string; unavailable: boolean; scope: string }>()
const emit = defineEmits<{ agency: [string] }>()
const kind = ref('financial')
const blocks = computed(() => [
  { key: 'cohorts', title: 'Aholi toifasi kesimida', rows: props.cohorts },
  { key: 'ministries', title: 'Vazirlik kesimida', rows: props.organizations },
  { key: 'measures', title: 'Qo‘llab-quvvatlash chorasi kesimida', rows: props.measures.filter(row => row.kind === kind.value) },
])
</script>
<template>
  <div class="breakdowns">
    <section v-for="block in blocks" :key="block.key" class="np-card breakdown">
      <h2>{{ benefitText(block.title) }}</h2><p class="scope">{{ benefitText(scope) }}</p>
      <label v-if="block.key === 'measures'">{{ benefitText('Chora turi') }}
        <select v-model="kind">
          <option value="financial">{{ benefitText('Moliyaviy ko‘maklar') }}</option>
          <option value="services">{{ benefitText('Imtiyoz') }}</option>
          <option value="guarantees">{{ benefitText('Ijtimoiy kafolatlar') }}</option>
        </select>
      </label>
      <div class="table-wrap" tabindex="0" :aria-label="benefitText(block.title)">
        <table><thead><tr><th scope="col">{{ benefitText(block.key === 'cohorts' ? 'Aholi toifasi' : block.key === 'ministries' ? 'Vazirlik yoki idora' : 'Chora nomi') }}</th><th scope="col">{{ benefitText('Choralar soni') }}</th><th scope="col">{{ benefitText('Moliyalashtirilgan mablag‘') }}</th></tr></thead>
          <tbody><tr v-for="row in block.rows" :key="row.key" :class="{ selected: block.key === 'ministries' && row.key === agency }">
            <th scope="row"><button v-if="block.key === 'ministries'" :aria-pressed="row.key === agency" @click="emit('agency', row.key === agency ? '' : row.key)">{{ benefitText(row.name) }}</button><span v-else>{{ benefitText(row.name) }}</span></th>
            <td>{{ unavailable || row.measures === null ? '—' : num(row.measures) }}</td>
            <td :title="unavailable || row.amount === null ? undefined : benefitText(num(row.amount) + ' so‘m')">{{ row.amount === null ? '—' : benefitText(money(row.amount) + ' so‘m') }}</td>
          </tr><tr v-if="!block.rows.length"><td colspan="3">{{ benefitText('Tanlangan tur bo‘yicha ma’lumot mavjud emas.') }}</td></tr></tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<style scoped>
.breakdowns { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
.breakdown { padding: 20px; min-width: 0; }
.scope { color: var(--muted-foreground); font-size: 12px; margin: -6px 0 12px; }
h2 { font-size: 17px; margin-bottom: 14px; }
label { display: grid; gap: 6px; font-size: 12px; margin-bottom: 12px; }
select { padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); color: var(--foreground); }
.table-wrap { max-height: 380px; overflow: auto; border: 1px solid var(--border); border-radius: 10px; }
table { border-collapse: collapse; width: 100%; font-size: 12px; font-variant-numeric: tabular-nums; }
th, td { padding: 10px 8px; text-align: start; }
thead { position: sticky; top: 0; background: var(--card); }
tbody tr + tr { border-top: 1px solid var(--border); }
tbody th { font-weight: 500; min-width: 135px; }
td { text-align: end; }
button { text-align: start; color: var(--primary); }
.selected { background: color-mix(in srgb,var(--primary) 12%,var(--card)); }
@media(max-width:1100px) { .breakdowns { grid-template-columns: minmax(0,1fr); } }
</style>
