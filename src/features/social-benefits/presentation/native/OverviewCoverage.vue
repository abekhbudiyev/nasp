<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Building2, MapPin } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { money, num } from './data'
import RegionMap from './RegionMap.vue'

type CoverageValues = { name: string; amount: number | null; measures: number | null }
type Territory = CoverageValues & { index: number }
type Organization = CoverageValues & { key: string }

const props = defineProps<{
  regions: Territory[]
  organizations: Organization[]
  region: string
  agency: string
  year: number
  amount: number | null
}>()
const emit = defineEmits<{ region: [string]; agency: [string] }>()

const territory = computed(() => props.regions.find(item => String(item.index) === props.region))
const selectedAgency = computed(() => props.organizations.find(item => item.key === props.agency))
const values = computed(() => props.regions.map(item => item.amount))
const details = computed(() => props.regions.map(item => {
  if (item.amount === null && item.measures === null) return 'Ma’lumot mavjud emas'
  return [measureLabel(item.measures), exactAmount(item.amount)].join(' · ')
}))

function amountLabel(value: number | null) {
  return value === null ? '—' : money(value) + ' so‘m'
}
function exactAmount(value: number | null) {
  return value === null ? 'Ma’lumot mavjud emas' : num(value) + ' so‘m'
}
function measureLabel(value: number | null) {
  return value === null ? '—' : num(value) + ' ta chora'
}
</script>

<template>
  <section class="coverage-dashboard" aria-labelledby="coverage-heading">
    <div class="coverage-grid">
      <section class="np-card coverage-map">
        <header class="coverage-heading">
          <div>
            <h2 id="coverage-heading">{{ benefitText('O‘zbekiston bo‘yicha davlat ko‘magi') }}</h2>
            <p>{{ year }} · {{ benefitText(territory?.name ?? 'Respublika') }} · {{ benefitText(selectedAgency?.name ?? 'Barcha vazirlik va idoralar') }}</p>
          </div>
          <div class="coverage-total">
            <span>{{ benefitText('Moliyalashtirilgan mablag‘') }}</span>
            <strong :title="benefitText(exactAmount(amount))">{{ benefitText(amountLabel(amount)) }}</strong>
            <small v-if="territory">{{ benefitText(measureLabel(territory.measures)) }}</small>
          </div>
        </header>
        <RegionMap :values="values" :details="details" :selected="region" @select="emit('region', $event)" />
      </section>

      <section class="np-card coverage-ministries" aria-labelledby="ministry-heading">
        <header class="coverage-heading">
          <div>
            <h2 id="ministry-heading">{{ benefitText('Vazirlik va idoralar kesimi') }}</h2>
            <p><MapPin :size="14" aria-hidden="true" />{{ benefitText(territory?.name ?? 'Respublika') }}</p>
          </div>
          <Building2 :size="20" class="ministry-icon" aria-hidden="true" />
        </header>
        <div class="coverage-table-wrap" tabindex="0" :aria-label="benefitText('Vazirlik va idoralar jadvali')">
          <table>
            <thead>
              <tr>
                <th scope="col">{{ benefitText('Vazirlik yoki idora') }}</th>
                <th scope="col">{{ benefitText('Choralar soni') }}</th>
                <th scope="col">{{ benefitText('Moliyalashtirilgan summa') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in organizations" :key="item.key" :class="{ selected: item.key === agency }">
                <th scope="row">
                  <button type="button" :aria-pressed="item.key === agency"
                    @click="emit('agency', item.key === agency ? '' : item.key)">
                    <span>{{ benefitText(item.name) }}</span>
                    <ArrowUpRight :size="13" aria-hidden="true" />
                  </button>
                </th>
                <td>{{ item.measures === null ? '—' : num(item.measures) }}</td>
                <td :title="benefitText(exactAmount(item.amount))">{{ benefitText(amountLabel(item.amount)) }}</td>
              </tr>
              <tr v-if="!organizations.length">
                <td colspan="3">{{ benefitText('Bu kesim bo‘yicha ma’lumot mavjud emas.') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="coverage-note">{{ benefitText('Hududiy moliyaviy ma’lumotlar IHMA choralarini qamraydi. Son moliyaviy manbadagi chora yozuvlarini, summa to‘langan mablag‘ni bildiradi. — ma’lumot mavjud emas.') }}</p>
      </section>
    </div>

    <section class="np-card coverage-regions" aria-labelledby="region-heading">
      <header class="coverage-heading">
        <div>
          <h2 id="region-heading">{{ benefitText('Hududlar bo‘yicha choralar va mablag‘') }}</h2>
          <p>{{ year }} · {{ benefitText(selectedAgency?.name ?? 'Barcha vazirlik va idoralar') }}</p>
        </div>
        <button v-if="region" type="button" class="np-button" @click="emit('region', '')">
          {{ benefitText('Respublika kesimiga qaytish') }}
        </button>
      </header>
      <ul class="territory-list">
        <li v-for="item in regions" :key="item.index">
          <button type="button" :class="{ selected: String(item.index) === region }"
            :aria-pressed="String(item.index) === region"
            @click="emit('region', String(item.index))">
            <span class="territory-name">{{ benefitText(item.name) }}</span>
            <span :title="benefitText(exactAmount(item.amount))">{{ benefitText(amountLabel(item.amount)) }}</span>
            <small>{{ benefitText(measureLabel(item.measures)) }}</small>
          </button>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.coverage-dashboard { display: grid; gap: 18px; min-width: 0; }
.coverage-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.34fr) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
.coverage-grid > section, .coverage-regions { padding: clamp(16px, 1.7vw, 26px); }
.coverage-map :deep(.region-canvas) { min-height: 0; }
.coverage-map :deep(.map-caption) { min-height: 24px; height: auto; flex-wrap: wrap; }
.coverage-map :deep(.region-canvas svg) { max-height: clamp(184px, 32vh, 330px); }
.coverage-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-bottom: 12px;
}
.coverage-heading h2 { font-size: clamp(16px, 1.4vw, 21px); line-height: 1.24; }
.coverage-heading p { display: flex; align-items: center; gap: 5px; margin: 5px 0 0; }
.coverage-total {
  display: grid;
  gap: 2px;
  padding: 8px 12px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--primary) 10%, var(--card));
  color: var(--primary);
}
.coverage-total span { font-size: 11px; font-weight: 650; }
.coverage-total strong { font-size: clamp(17px, 1.65vw, 24px); font-variant-numeric: tabular-nums; }
.ministry-icon { color: var(--primary); flex: none; }
.coverage-table-wrap { max-height: 15rem; margin-top: 14px; border: 1px solid var(--border); border-radius: 12px; overflow: auto; }
.coverage-table-wrap table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.coverage-table-wrap thead { position: sticky; top: 0; background: color-mix(in srgb, var(--primary) 8%, var(--card)); }
.coverage-table-wrap :is(th, td) { padding: 9px 8px; text-align: start; font-size: 12px; }
.coverage-table-wrap :is(th, td):not(:first-child) { text-align: end; }
.coverage-table-wrap tbody tr + tr { border-top: 1px solid var(--border); }
.coverage-table-wrap tbody th { width: 46%; font-weight: 650; }
.coverage-table-wrap tbody button { display: flex; align-items: center; gap: 4px; text-align: start; color: var(--primary); }
.coverage-table-wrap svg { flex: none; }
.coverage-table-wrap .selected { background: color-mix(in srgb, var(--primary) 10%, var(--card)); }
.coverage-note { margin-top: 11px; }
.territory-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.territory-list button {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 8px;
  text-align: start;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.territory-list button:hover, .territory-list button.selected {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, var(--card));
}
.territory-name { font-weight: 650; }
.territory-list small { width: 100%; color: var(--muted-foreground); }
@media (max-width: 1080px) {
  .coverage-grid { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 720px) {
  .territory-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 460px) {
  .territory-list { grid-template-columns: minmax(0, 1fr); }
}
</style>
