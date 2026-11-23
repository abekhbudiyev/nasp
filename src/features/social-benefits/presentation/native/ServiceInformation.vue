<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { data } from './data'
defineProps<{ serviceId: string; recipient: string; reasons: string[] }>()
</script>
<template>
  <details class="service-information">
    <summary>{{ benefitText('Xizmat haqida va uni olish tartibi') }}</summary>
    <dl>
      <dt>{{ benefitText('Xizmat nima beradi?') }}</dt><dd>{{ benefitText(data.services[serviceId]?.[2] || 'Xizmat tavsifi kiritilmagan.') }}</dd>
      <dt>{{ benefitText('Kim uchun tavsiya etilgan?') }}</dt><dd>{{ benefitText(recipient) }}<ul v-if="reasons.length"><li v-for="reason in reasons" :key="reason">{{ benefitText(reason) }}</li></ul></dd>
      <dt>{{ benefitText('Qaysi idora ko‘rib chiqadi?') }}</dt><dd>{{ benefitText(data.services[serviceId]?.[1] || 'Mas’ul idora belgilanmagan') }}</dd>
    </dl>
    <h4>{{ benefitText('Qanday murojaat qilish mumkin?') }}</h4>
    <ol>
      <li>{{ benefitText('Xizmat tavsifi va tavsiya sababini o‘qing.') }}</li>
      <li>{{ benefitText('Xizmat kim uchun tavsiya etilganini tekshiring.') }}</li>
      <li>{{ benefitText('Murojaatni boshlash uchun «Ariza berish» tugmasini bosing.') }}</li>
      <li>{{ benefitText('Murojaat holatini «Arizalar» bo‘limida kuzating.') }}</li>
    </ol>
    <p>{{ benefitText('Tavsiya xizmat avtomatik tayinlanganini bildirmaydi. Aniq shartlar, zarur hujjatlar va ko‘rib chiqish muddatini mas’ul idora belgilaydi.') }}</p>
  </details>
</template>
<style scoped>
.service-information { font-size: 12px; line-height: 1.6; border-top: 1px solid var(--border); padding-top: 12px; }
summary { cursor: pointer; font-weight: 650; color: var(--primary); }
dl { margin-top: 12px; } dt,h4 { font-weight: 650; margin-top: 10px; } dd { margin: 3px 0 0; }
ol,ul { padding-inline-start: 18px; margin: 6px 0; } ol { list-style: decimal; } ul { list-style: disc; }
li + li { margin-top: 5px; } p { margin-top: 10px; color: var(--muted-foreground); }
</style>
