<script setup lang="ts">
import { computed } from 'vue'
import { benefitText } from '@/shared/i18n'
import type { Family } from './data'
import { familyNeeds } from './family-referrals'
const props = defineProps<{ family: Family }>()
const needs = computed(() => familyNeeds(props.family))
function notification(reason: string, agency: string) {
  return props.family.referralNotifications?.find(item => item.reason === reason && item.agency === agency)
}
function sent(reason: string, agency: string) {
  const item = notification(reason,agency)
  return item?.status === 'sent' && !!item.sentAt
}
</script>
<template>
  <section class="family-referrals">
    <h3>{{ benefitText('Mas’ul idoralar va xabarnomalar') }}</h3>
    <div v-if="needs.length" class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Aniqlangan ehtiyoj') }}</th><th>{{ benefitText('Ko‘rsatilishi kerak bo‘lgan xizmat') }}</th><th>{{ benefitText('Mas’ul idora') }}</th><th>{{ benefitText('Xabarnoma holati') }}</th></tr></thead><tbody><template v-for="need in needs" :key="need.key"><tr v-for="agency in need.agencies" :key="need.key + agency.key"><td>{{ benefitText(need.text) }}</td><td>{{ benefitText(need.service) }}</td><td>{{ benefitText(agency.name) }}</td><td><span class="np-tag" :class="sent(need.key,agency.key) ? 'green' : 'amber'">{{ benefitText(sent(need.key,agency.key) ? 'Xabar yuborildi' : notification(need.key,agency.key)?.status === 'failed' ? 'Yuborishda xatolik' : 'Yuborish kutilmoqda') }}</span><small v-if="sent(need.key,agency.key)">{{ notification(need.key,agency.key)?.sentAt }}</small></td></tr><tr v-if="!need.agencies.length"><td>{{ benefitText(need.text) }}</td><td>{{ benefitText(need.service) }}</td><td colspan="2">{{ benefitText('Mas’ul idora belgilanmagan') }}</td></tr></template></tbody></table></div>
    <p v-else>{{ benefitText('Mas’ul idorani belgilash uchun oila ehtiyojlari bo‘yicha ma’lumot kiritilmagan.') }}</p>
  </section>
</template>
<style scoped>
.family-referrals { margin: 14px 0; } h3 { font-size: 15px; margin-bottom: 12px; }
td { vertical-align: top; } small { display: block; margin-top: 5px; font-size: 11px; }
p { color: var(--muted-foreground); font-size: 12px; }
</style>
