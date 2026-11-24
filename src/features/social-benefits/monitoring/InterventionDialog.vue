<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { AlertCircle, CalendarDays, Check, ClipboardList, MapPin, X } from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import { agencies, measures, number, zoneLabel } from './demo-families'
import { scopeName } from './geography'
import { formatDate, overdue, stages, todayInTashkent, type Intervention, type PlanInput, type PlanTarget } from './interventions'

const props = defineProps<{
  target?: PlanTarget
  plan?: Intervention
  recommended?: { measure: string; agency: string }
  storageWarning: boolean
}>()
const emit = defineEmits<{ close: []; create: [input: PlanInput]; advance: [outcome?: string]; reassess: [plan: Intervention] }>()
const dialog = ref<HTMLDialogElement>()
const form = reactive<PlanInput>({
  measure: props.recommended?.measure ?? '',
  agency: props.recommended?.agency ?? '',
  assignee: '',
  due: '',
  notes: '',
})
const today = todayInTashkent()
const outcome = ref('')
const submitting = ref(false)
const target = computed(() => props.plan?.target ?? props.target)
const steps = computed(() => [props.plan?.opened, props.plan?.started, props.plan?.closed])
const stageLabel = computed(() => stages.find(stage => stage.id === props.plan?.stage)?.label ?? '')
watch(() => props.plan?.stage, () => { submitting.value = false })
onMounted(() => dialog.value?.showModal())

function create() {
  if (submitting.value || !form.measure || !form.agency || !form.due || form.due < today) return
  submitting.value = true
  emit('create', { ...form })
}

function advance() {
  if (!props.plan || submitting.value || (props.plan.stage === 'active' && !outcome.value)) return
  submitting.value = true
  emit('advance', outcome.value)
}
</script>

<template>
  <dialog ref="dialog" class="rm-dialog" aria-labelledby="rm-dialog-title" @close="$emit('close')">
    <div class="rm-dialog-head">
      <div class="rm-dialog-icon"><ClipboardList :size="21" /></div>
      <div><p class="rm-kicker">{{ t(plan ? 'Choralar rejasi' : 'Yangi chora') }}</p><h2 id="rm-dialog-title">{{ t(plan?.measure ?? 'Chora belgilash') }}</h2></div>
      <button type="button" class="rm-icon-button" :aria-label="t('Yopish')" :title="t('Yopish')" @click="dialog?.close()"><X :size="19" /></button>
    </div>
    <div v-if="target" class="rm-dialog-target">
      <MapPin :size="17" />
      <div>
        <strong>{{ t(target.title) }}</strong>
        <span v-if="target.family">{{ t(scopeName(target.scope)) }}</span>
        <span v-else>{{ number(target.families) }} {{ t('ta oila') }} · {{ t(target.zone === 'all' ? 'Barcha holatlar' : zoneLabel(target.zone)) }}</span>
      </div>
    </div>

    <form v-if="!plan" class="rm-dialog-form" @submit.prevent="create">
      <label>{{ t('Chora turi') }}
        <select v-model="form.measure" required autofocus>
          <option disabled value="">{{ t('Chorani tanlang') }}</option>
          <option v-for="measure in measures" :key="measure" :value="measure">{{ t(measure) }}</option>
        </select>
      </label>
      <label>{{ t('Mas’ul tashkilot') }}
        <select v-model="form.agency" required>
          <option disabled value="">{{ t('Tashkilotni tanlang') }}</option>
          <option v-for="agency in agencies" :key="agency" :value="agency">{{ t(agency) }}</option>
        </select>
      </label>
      <div class="rm-dialog-fields">
        <label>{{ t('Mas’ul xodim') }}<input v-model.trim="form.assignee" maxlength="100" :placeholder="t('Ismi yoki lavozimi')" /></label>
        <label>{{ t('Ijro muddati') }}<input v-model="form.due" required type="date" :min="today" /></label>
      </div>
      <label>{{ t('Izoh') }}<textarea v-model.trim="form.notes" rows="3" maxlength="800" :placeholder="t('Bajarilishi kerak bo‘lgan ish')" /></label>
      <footer class="rm-dialog-foot">
        <small>{{ t('Reja shu brauzerda saqlanadi.') }}</small>
        <button type="button" class="rm-button rm-quiet" @click="dialog?.close()">{{ t('Bekor qilish') }}</button>
        <button type="submit" class="rm-button rm-primary" :disabled="submitting">{{ t('Saqlash') }}</button>
      </footer>
    </form>

    <section v-else class="rm-plan-detail">
      <div class="rm-detail-status">
        <span class="rm-stage" :data-stage="plan.stage">{{ t(stageLabel) }}</span>
        <span v-if="overdue(plan)" class="rm-overdue">{{ t('Muddati o‘tgan') }}</span>
        <span class="rm-due"><CalendarDays :size="15" />{{ formatDate(plan.due) }}</span>
      </div>
      <dl class="rm-detail-fields">
        <div><dt>{{ t('Mas’ul tashkilot') }}</dt><dd>{{ t(plan.agency) }}</dd></div>
        <div v-if="plan.assignee"><dt>{{ t('Mas’ul xodim') }}</dt><dd>{{ plan.assignee }}</dd></div>
        <div v-if="plan.notes"><dt>{{ t('Izoh') }}</dt><dd>{{ plan.notes }}</dd></div>
        <div v-if="plan.outcome"><dt>{{ t('Ijro natijasi') }}</dt><dd>{{ plan.outcome }}</dd></div>
      </dl>
      <ol class="rm-timeline" :aria-label="t('Ijro tarixi')">
        <li v-for="(stage, index) in stages" :key="stage.id" :class="{ 'is-complete': steps[index] }">
          <span class="rm-step-marker"><Check v-if="steps[index]" :size="13" /></span>
          <div><b>{{ t(stage.label) }}</b><small v-if="steps[index]">{{ formatDate(steps[index]) }}</small></div>
        </li>
      </ol>
      <p v-if="storageWarning" class="rm-storage-warning" role="status"><AlertCircle :size="16" />{{ t('Brauzerga saqlashning imkoni bo‘lmadi.') }}</p>
      <form v-if="plan.stage !== 'done'" class="rm-progress-form" @submit.prevent="advance">
        <label v-if="plan.stage === 'active'">{{ t('Ijro natijasi') }}<textarea v-model.trim="outcome" required rows="3" maxlength="800" /></label>
        <button class="rm-button rm-primary" type="submit" :disabled="submitting">{{ t(plan.stage === 'planned' ? 'Ijroga olish' : 'Yakunlash') }}</button>
      </form>
      <button v-else-if="plan.target.family" type="button" class="rm-button rm-quiet rm-reassess" @click="emit('reassess', plan)">{{ t('Qayta baholash') }}</button>
    </section>
  </dialog>
</template>
