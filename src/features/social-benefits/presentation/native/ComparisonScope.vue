<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, latin, organization } from './data'
const props = defineProps<{ region: string; agency: string }>()
const emit = defineEmits<{ change: [value: { district: string; agency: string }]; family: [id: string] }>()
const district = ref(''), address = ref(''), family = ref(''), agency = ref(props.agency)
const districts = computed(() => data.districts.map(([region,name],index) => ({ region,name,index })).filter(row => data.regionMap[row.region] === Number(props.region)))
const families = computed(() => data.families.filter(row => row.region === Number(props.region) && (!district.value || latin(row.address).toLowerCase().includes(latin(data.districts[Number(district.value)]?.[1] ?? '').toLowerCase()))))
const addresses = computed(() => [...new Set(families.value.map(row => row.address))])
const visibleFamilies = computed(() => families.value.filter(row => !address.value || row.address === address.value))
const agencies = computed(() => [...new Set(data.finance.map(row => row.o))])
watch(() => props.region, () => { district.value = ''; address.value = ''; family.value = '' })
watch(() => props.agency, value => { agency.value = value })
watch(district, () => { address.value = ''; family.value = '' })
watch(address, () => { family.value = '' })
watch([district,address,agency], () => emit('change', { district: district.value || (address.value ? 'address' : ''), agency: agency.value }), { immediate: true })
</script>
<template>
  <div class="scope-fields">
    <label>{{ benefitText('Tuman / shahar') }}<select v-model="district"><option value="">{{ benefitText('Barcha tumanlar') }}</option><option v-for="row in districts" :key="row.index" :value="String(row.index)">{{ benefitText(row.name) }}</option></select></label>
    <label>{{ benefitText('Mahalla / manzil') }}<select v-model="address"><option value="">{{ benefitText('Barcha manzillar') }}</option><option v-for="name in addresses" :key="name" :value="name">{{ benefitText(name) }}</option></select></label>
    <label>{{ benefitText('Oila') }}<select v-model="family"><option value="">{{ benefitText('Oilani tanlang') }}</option><option v-for="row in visibleFamilies" :key="row.id" :value="row.id">{{ benefitText(row.members[0]?.name ?? row.id) }}</option></select></label>
    <label>{{ benefitText('Vazirlik / idora') }}<select v-model="agency"><option value="">{{ benefitText('Barcha vazirlik va idoralar') }}</option><option v-for="key in agencies" :key="key" :value="key">{{ benefitText(organization(key)) }}</option></select></label>
    <button v-if="family" type="button" @click="emit('family', family)">{{ benefitText('Oila ma’lumotlarini ochish') }} →</button>
    <p v-if="district">{{ benefitText('Tuman bo‘yicha umumiy moliyaviy hisob ulanmagan. Mahalla va oilalar mavjud oila pasportlaridagi manzillar doirasida ko‘rsatiladi.') }}</p>
  </div>
</template>
<style scoped>
.scope-fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; margin: 14px 0; }
label { display: grid; gap: 5px; font-size: 12px; min-width: 0; }
select { width: 100%; min-width: 0; border: 1px solid var(--border); padding: 8px; border-radius: 8px; background: var(--card); color: var(--foreground); }
p { grid-column: 1 / -1; font-size: 11px; color: var(--muted-foreground); }
button { color: var(--primary); text-align: start; font-size: 12px; }
@media(max-width:600px) { .scope-fields { grid-template-columns: minmax(0,1fr); } }
</style>
