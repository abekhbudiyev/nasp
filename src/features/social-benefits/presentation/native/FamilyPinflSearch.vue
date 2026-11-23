<script setup lang="ts">
import { ref } from 'vue'
import { benefitText } from '@/shared/i18n'
import { data } from './data'
const emit = defineEmits<{ open: [family: string, member?: string] }>()
const pinfl = ref(''), message = ref('')
function search() {
  message.value = ''
  if (!/^\d{14}$/.test(pinfl.value)) {
    message.value = 'PINFL 14 ta raqamdan iborat bo‘lishi kerak.'
    return
  }
  const records = data.families.flatMap(family => family.members.map(member => ({ family, member })))
  const linked = records.filter(({ member }) => /^\d{14}$/.test(member.pinfl ?? ''))
  if (!linked.length) {
    message.value = 'PINFL bo‘yicha qidirish manbasi hali ulanmagan. Mavjud oila pasportlarida PINFL ko‘rsatilmagan.'
    return
  }
  const match = linked.find(({ member }) => member.pinfl === pinfl.value)
  if (!match) {
    message.value = 'Kiritilgan PINFL bo‘yicha mavjud manbada oila topilmadi.'
    return
  }
  pinfl.value = ''
  emit('open', match.family.id, match.member.id)
}
</script>
<template>
  <form class="family-pinfl" @submit.prevent="search">
    <label>{{ benefitText('Oila ko‘maklarini PINFL orqali qidirish') }}
      <input v-model="pinfl" type="text" inputmode="numeric" maxlength="14" autocomplete="off" :placeholder="benefitText('14 xonali PINFL')" :aria-invalid="message ? true : undefined" @input="message = ''">
    </label>
    <button type="submit" class="np-button primary">{{ benefitText('Oila ko‘maklarini ko‘rish') }}</button>
    <p v-if="message" role="status">{{ benefitText(message) }}</p>
  </form>
</template>
<style scoped>
.family-pinfl { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; margin-bottom: 18px; }
label { display: grid; gap: 6px; flex: 1 1 260px; max-width: 440px; font-size: 13px; }
input { width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 9px; background: var(--card); color: var(--foreground); }
p { flex-basis: 100%; margin: 0; font-size: 12px; color: var(--muted-foreground); }
</style>
