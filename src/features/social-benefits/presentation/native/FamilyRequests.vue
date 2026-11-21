<script setup lang="ts">
import { ArrowUpRight, CheckCircle2, Clock3 } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { num, organization, type Member } from './data'
import { formatRequestId, requestAgencyKeys, requestStatusLabels, type PrototypeRequest } from './prototype-requests'

defineProps<{ entries: PrototypeRequest[]; members: Member[]; compact?: boolean; staff?: boolean; highlight?: number }>()
const emit = defineEmits<{ open: [id: number] }>()
const dateTime = new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Tashkent' })
const tones = { processing: 'blue', approved: 'green', waiting: 'amber', delivered: 'green', duplicate: 'red', returned: 'amber' } as const
const nextStep = {
  processing: 'Mutaxassis ma’lumotlarni tekshiradi',
  approved: 'Mas’ul idora ijroni boshlaydi',
  waiting: 'Idoraning ijro tasdig‘i kutilmoqda',
  delivered: 'Ijro natijasi qayd etildi',
  duplicate: 'Tekshiruv natijasi qayd etildi',
  returned: 'Idoradan tuzatilgan ma’lumot kutilmoqda',
} as const
</script>

<template>
  <div v-if="entries.length" class="family-requests">
    <article v-for="item in entries" :key="item.id" class="family-request" :class="{ highlighted: item.id === highlight }">
      <div class="request-top">
        <small>{{ formatRequestId(item.id) }}</small>
        <span class="np-tag" :class="tones[item.status]">{{ benefitText(requestStatusLabels[item.status]) }}</span>
      </div>
      <strong>{{ benefitText(item.measure) }}</strong>
      <p>{{ benefitText(members.find(member => member.id === item.memberId)?.name) }} · {{ benefitText(organization(requestAgencyKeys[item.agency] ?? 'agency')) }}</p>
      <p v-if="item.status === 'delivered' && item.amount > 0" class="request-amount">
        <CheckCircle2 :size="16" aria-hidden="true" />
        {{ benefitText('To‘landi') }} <b>{{ num(item.amount) }} {{ benefitText('so‘m') }}</b>
      </p>
      <p v-if="!compact && item.status !== 'delivered'" class="request-next">{{ benefitText(nextStep[item.status]) }}</p>
      <details v-if="!compact">
        <summary>{{ benefitText('So‘rov tarixi') }}</summary>
        <ol>
          <li v-for="(step, index) in item.history" :key="index">
            <Clock3 :size="14" aria-hidden="true" />
            <div>
              <b>{{ benefitText(step.label) }}</b>
              <time :datetime="step.at">{{ benefitText(dateTime.format(new Date(step.at))) }}</time>
              <p v-if="step.note">{{ benefitText(step.note) }}</p>
            </div>
          </li>
        </ol>
      </details>
      <button v-if="staff" class="text-button" @click="emit('open', item.id)">
        {{ benefitText('Ijrodagi so‘rovni ochish') }} <ArrowUpRight :size="14" aria-hidden="true" />
      </button>
    </article>
  </div>
</template>

<style scoped>
.family-requests { display: grid; gap: 10px; min-width: 0 }
.family-request { min-width: 0; display: grid; gap: 6px; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: var(--card); overflow-wrap: anywhere }
.family-request.highlighted { border-color: color-mix(in srgb, var(--primary) 60%, var(--border)); background: color-mix(in srgb, var(--primary) 6%, var(--card)) }
.request-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 5px }
.request-top small { color: var(--muted-foreground); font-variant-numeric: tabular-nums }
.request-top .np-tag { white-space: normal; line-height: 1.3 }
.family-request > strong { font-size: 13px; line-height: 1.45 }
.family-request p { margin: 0; line-height: 1.5 }
.family-request .request-amount { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; color: var(--primary); font-size: 12px }
.family-request :is(summary, .text-button) { color: var(--primary); font-size: 12px; justify-self: start; text-align: start }
.family-request summary { cursor: pointer }
.family-request .text-button { display: inline-flex; align-items: center; gap: 5px }
.family-request details { padding-top: 5px; border-top: 1px solid var(--border) }
.family-request ol { display: grid; gap: 10px; margin: 9px 0; padding: 0; list-style: none }
.family-request li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 7px; font-size: 12px }
.family-request li svg { margin-top: 2px; color: var(--primary) }
.family-request time { display: block; color: var(--muted-foreground); font-size: 11px }
.family-request .request-next { color: var(--foreground) }
</style>
