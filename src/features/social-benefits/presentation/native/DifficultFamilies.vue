<script setup lang="ts">
import { computed, ref } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data, num, money, sum } from './data'
import { findText } from './report-output'
import FamilyPinflSearch from './FamilyPinflSearch.vue'
import RegionMap from './RegionMap.vue'
import FamilyReferrals from './FamilyReferrals.vue'
import { familyNeeds } from './family-referrals'
const emit = defineEmits<{ open: [string] }>()
const region = ref(''), query = ref(''), criterion = ref('')
const reasons = familyNeeds
const eligibleFamilies = computed(() => data.families.filter(family => family.difficultSituation !== true && reasons(family).length > 0 && (!criterion.value || reasons(family).some(reason => reason.key === criterion.value)) && findText(family.members.map(member => member.name).join(' ') + ' ' + family.address,query.value)))
const rows = computed(() => eligibleFamilies.value.filter(family => !region.value || family.region === Number(region.value)))
const mapValues = computed(() => data.regions.map((_,index) => data.families.some(family => family.region === index && (family.utilityDebtMonths !== undefined || family.hasDisabilityMember !== undefined || family.hasSocialRisk !== undefined || family.hasUnemployedMember !== undefined)) ? eligibleFamilies.value.filter(family => family.region === index).length : null))
const mapDetails = computed(() => mapValues.value.map(value => value === null ? 'Hudud bo‘yicha ma’lumot mavjud emas' : num(value) + ' ta ko‘rib chiqiladigan nomzod oila'))
function amount(family: typeof data.families[number]) {
  return sum(family.members.flatMap(member => member.rows.flatMap(row => row.arr)))
}
</script>
<template>
  <section class="np-card difficult-families">
    <header class="np-card-heading"><h2>{{ benefitText('Og‘ir vaziyatda deb topilishi kutilayotgan oilalar') }}</h2><span>{{ num(rows.length) }} {{ benefitText('ta oila') }}</span></header>
    <div class="difficult-family-map"><RegionMap :values="mapValues" :details="mapDetails" :selected="region" :count="true" @select="region=$event" /><p class="np-note">{{ benefitText('Xaritada ko‘rib chiqish uchun nomzod oilalar ko‘rsatiladi. Nomzod kamida bitta mezon asosida aniqlanadi: kommunal qarzdorlik 12 oy va undan ko‘p, oilada nogironligi bor yoki ishsiz a’zo, yoxud qayd etilgan ijtimoiy xavf. Bu tasdiqlangan og‘ir vaziyat maqomi emas. — nomzodlar bo‘yicha ma’lumot ulanmagan.') }}</p></div>
    <FamilyPinflSearch @open="emit('open',$event)" />
    <div class="family-filters"><label>{{ benefitText('Aniqlash mezoni') }}<select v-model="criterion"><option value="">{{ benefitText('Barcha mezonlar') }}</option><option value="debt">{{ benefitText('Kommunal qarzdorlik · 12 oy va ko‘p') }}</option><option value="disability">{{ benefitText('Nogironligi bor a’zoli oilalar') }}</option><option value="unemployment">{{ benefitText('Ishsiz a’zosi bor oilalar') }}</option><option value="risk">{{ benefitText('Ijtimoiy xavfi bor oilalar') }}</option></select></label><label>{{ benefitText('Qidirish') }}<input v-model="query" type="search" :placeholder="benefitText('F.I.Sh. yoki manzil')"></label><label>{{ benefitText('Viloyat') }}<select v-model="region"><option value="">{{ benefitText('Respublika') }}</option><option v-for="(name,index) in data.regions" :key="index" :value="String(index)">{{ benefitText(name) }}</option></select></label></div>
    <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Oila') }}</th><th>{{ benefitText('Hudud / manzil') }}</th><th>{{ benefitText('Oila a’zolari') }}</th><th>{{ benefitText('Nomzod sifatida kiritish asosi') }}</th><th>{{ benefitText('Holati') }}</th><th>{{ benefitText('Ajratilgan ko‘mak · 2025') }}</th></tr></thead><tbody><tr v-for="family in rows" :key="family.id"><td><button class="text-button" @click="emit('open',family.id)">{{ benefitText(family.members[0]?.name ?? family.id) }}</button></td><td>{{ benefitText(data.regions[family.region] + ' · ' + family.address) }}</td><td>{{ num(family.members.length) }}</td><td><ul><li v-for="reason in reasons(family)" :key="reason.key">{{ benefitText(reason.text) }}</li></ul></td><td><details><summary>{{ benefitText('Mas’ul idoralar') }}</summary><FamilyReferrals :family="family" /></details><span class="np-tag amber">{{ benefitText('Ko‘rib chiqish kutilmoqda') }}</span></td><td>{{ benefitText(money(amount(family)) + ' so‘m') }}</td></tr><tr v-if="!rows.length"><td colspan="6">{{ benefitText('Tanlangan hudud bo‘yicha nomzod oilalar topilmadi yoki kommunal qarzdorlik, nogironlik va ijtimoiy xavf ma’lumotlari hali ulanmagan.') }}</td></tr></tbody></table></div>
  </section>
</template>
<style scoped>
.difficult-family-map { margin-bottom: 20px; padding: 12px; border: 1px solid var(--border); border-radius: 12px; }
.difficult-family-map :deep(svg) { height: clamp(240px,38vh,420px); }
.family-filters { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
label { display: grid; gap: 6px; flex: 1 1 220px; font-size: 12px; }
input,select { padding: 9px 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); color: var(--foreground); }
</style>
