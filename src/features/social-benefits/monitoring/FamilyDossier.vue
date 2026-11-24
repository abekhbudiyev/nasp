<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, CalendarDays, ClipboardList, House, MapPin, Plus, ShieldCheck, UserRound, UsersRound } from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import type { DemoFamily, DemoMember } from './demo-families'
import { formatDate, stages, type CaseAssessment, type Intervention } from './interventions'
import type { ReportingPeriod } from './reporting-period'
import RiskStatus from './RiskStatus.vue'
import SupportHistory from './SupportHistory.vue'

const props = defineProps<{ family: DemoFamily; member?: DemoMember; plans: Intervention[]; period: ReportingPeriod; assessment?: CaseAssessment; review: boolean }>()
const emit = defineEmits<{ member: [id: string]; plan: [id: string]; create: []; household: []; assess: [need: string]; review: [open: boolean] }>()

const zone = computed(() => props.member?.zone ?? props.family.zone)
const signal = computed(() => props.member?.signal ?? props.family.signal)
const need = ref(props.assessment?.need ?? '')
function submitAssessment() {
  if (need.value.trim()) emit('assess', need.value)
}
</script>

<template>
  <section class="rm-dossier" :aria-label="t(member ? 'Shaxs kartasi' : 'Oila kartasi')">
    <header class="rm-profile">
      <div class="rm-profile-icon"><UserRound v-if="member" :size="25" /><House v-else :size="25" /></div>
      <div class="rm-profile-copy">
        <p class="rm-kicker">{{ t(member ? 'Shaxs kartasi' : 'Oila kartasi') }}</p>
        <h2>{{ member ? t(member.name) : family.ref }}</h2>
        <p v-if="member">{{ t(member.role) }} · {{ member.age }} {{ t('yosh') }} · <button type="button" class="rm-text-button" @click="$emit('household')">{{ family.ref }}</button></p>
        <p v-else><MapPin :size="14" /> {{ t(family.districtName) }} · {{ t(family.mahallaName) }}</p>
      </div>
      <RiskStatus :zone="zone" class="rm-profile-status" />
    </header>

    <div class="rm-dossier-grid">
      <article class="rm-panel rm-evidence">
        <header class="rm-panel-head">
          <div>
            <p class="rm-kicker">{{ t(member ? 'Shaxs darajasida' : 'Oila darajasida') }}</p>
            <h3>{{ t(zone === 'stable' ? 'Kuzatuv holati' : 'Xavf signali') }}</h3>
          </div>
          <ShieldCheck :size="21" class="rm-panel-icon" aria-hidden="true" />
        </header>
        <div class="rm-evidence-body">
          <div class="rm-signal" :data-zone="zone">
            <div class="rm-signal-head"><strong>{{ t(signal.label) }}</strong><span><CalendarDays :size="14" />{{ formatDate(family.recordedOn) }}</span></div>
            <p>{{ t(signal.detail) }}</p>
            <small>{{ t('Manba') }} · {{ t(signal.source) }}</small>
            <small>{{ t('Tekshiruv') }} · {{ t(assessment ? 'Baholangan' : 'Baholash kutilmoqda') }}</small>
          </div>
          <div class="rm-assessment">
            <div>
              <p class="rm-kicker">{{ t('Xodim bahosi') }}</p>
              <p v-if="assessment" class="rm-assessment-note">{{ assessment.need }} <small>{{ formatDate(assessment.date) }}</small></p>
              <p v-else>{{ t('Baholash qaydi kiritilmagan.') }}</p>
            </div>
            <button v-if="!review" type="button" class="rm-button rm-quiet" @click="$emit('review', true)">{{ t(assessment ? 'Qayta baholash' : 'Baholash') }}</button>
          </div>
          <form v-if="review" class="rm-assessment-form" @submit.prevent="submitAssessment">
            <label>{{ t('Tasdiqlangan ehtiyoj') }}<textarea v-model.trim="need" rows="3" required maxlength="800" /></label>
            <div><button type="button" class="rm-button rm-quiet" @click="$emit('review', false)">{{ t('Bekor qilish') }}</button><button type="submit" class="rm-button rm-primary" :disabled="!need">{{ t('Saqlash') }}</button></div>
          </form>
          <div class="rm-recommendation">
            <div>
              <p class="rm-kicker">{{ t('Tavsiya etilgan chora') }}</p>
              <strong>{{ t(signal.action) }}</strong>
              <small>{{ t(signal.agency) }}</small>
            </div>
            <button type="button" class="rm-button rm-quiet" @click="$emit('create')"><Plus :size="16" />{{ t('Chora belgilash') }}</button>
          </div>
        </div>
      </article>

      <article class="rm-panel rm-members">
        <header class="rm-panel-head">
          <div><h3>{{ t('Oila a’zolari') }}</h3><p>{{ family.members.length }} {{ t('nafar') }}</p></div>
          <UsersRound :size="21" class="rm-panel-icon" aria-hidden="true" />
        </header>
        <ul class="rm-member-list">
          <li v-for="person in family.members" :key="person.id">
            <button type="button" :aria-current="person.id === member?.id ? 'true' : undefined" @click="$emit('member', person.id)">
              <span class="rm-member-avatar"><UserRound :size="17" /></span>
              <span class="rm-member-copy"><b>{{ t(person.name) }}</b><small>{{ t(person.role) }} · {{ person.age }} {{ t('yosh') }}</small></span>
              <RiskStatus :zone="person.zone" />
              <ArrowRight :size="15" class="rm-member-arrow" />
            </button>
          </li>
        </ul>
      </article>
    </div>

    <SupportHistory :key="period.from + period.to" :scope="family.scope" :period="period" :family="family.index" :person="member?.id" />

    <article class="rm-panel">
      <header class="rm-panel-head">
        <div><h3>{{ t(member ? 'Shaxs bo‘yicha choralar' : 'Oila bo‘yicha choralar') }}</h3><p>{{ plans.length }} {{ t('ta chora') }}</p></div>
        <ClipboardList :size="21" class="rm-panel-icon" aria-hidden="true" />
      </header>
      <ul v-if="plans.length" class="rm-dossier-plans">
        <li v-for="plan in plans" :key="plan.id">
          <button type="button" @click="$emit('plan', plan.id)">
            <span><strong>{{ t(plan.measure) }}</strong><small>{{ t(plan.agency) }}</small></span>
            <span class="rm-stage" :data-stage="plan.stage">{{ t(stages.find(stage => stage.id === plan.stage)?.label ?? '') }}</span>
            <ArrowRight :size="16" />
          </button>
        </li>
      </ul>
      <p v-else class="rm-dossier-empty">{{ t('Hali chora belgilanmagan.') }}</p>
    </article>
  </section>
</template>
