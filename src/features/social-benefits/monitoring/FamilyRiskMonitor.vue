<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter, type LocationQueryRaw } from 'vue-router'
import {
  AlertCircle, ArrowDownWideNarrow, ArrowRight, CalendarDays, ChevronLeft, ChevronRight,
  ClipboardList, House, MapPin, MapPinned, Plus, Search, ShieldAlert, ShieldCheck, UsersRound,
} from 'lucide-vue-next'
import { benefitText as t } from '@/shared/i18n'
import { regions, resolveArea, scopeName, type AreaScope } from './geography'
import {
  countFor, countsAt, familyPage, leadingSignal, normalize, number, resolveFamily, snapshotDate, total, zones,
  type DemoFamily, type ZoneFilter,
} from './demo-families'
import { formatDate, overdue, stages, todayInTashkent, useInterventions, type Intervention, type PlanInput, type PlanStage, type PlanTarget } from './interventions'
import { inPeriod, periodFromQuery, type ReportingPeriod } from './reporting-period'
import RiskAtlas from './RiskAtlas.vue'
import RiskStatus from './RiskStatus.vue'
import FamilyDossier from './FamilyDossier.vue'
import InterventionDialog from './InterventionDialog.vue'
import ReportingPeriodPicker from './ReportingPeriodPicker.vue'
import SupportHistory from './SupportHistory.vue'

const tabs = [
  { id: 'map', label: 'Hududiy xarita', icon: MapPinned },
  { id: 'families', label: 'Oilalar reyestri', icon: UsersRound },
  { id: 'plans', label: 'Choralar rejasi', icon: ClipboardList },
] as const
type Mode = typeof tabs[number]['id']
const mapMetrics = [
  { id: 'share', label: 'Ulush' },
  { id: 'count', label: 'Soni' },
] as const
type Metric = typeof mapMetrics[number]['id']
const kpis = [
  { id: 'all', label: 'Jami oilalar', icon: House },
  { ...zones[0], icon: ShieldAlert },
  { ...zones[1], icon: AlertCircle },
  { ...zones[2], icon: ShieldCheck },
] as const
const mapLabels = {
  risk: 'Xavf zonasidagi oilalar',
  border: 'Xavf chegarasidagi oilalar',
  stable: 'Barqaror oilalar',
}

const route = useRoute()
const router = useRouter()
const query = (key: string) => typeof route.query[key] === 'string' ? route.query[key] as string : undefined
const area = computed(() => resolveArea({ region: query('area'), district: query('district'), mahalla: query('mahalla') }))
const scope = computed(() => area.value.scope)
const period = computed(() => periodFromQuery(query('periodKind'), query('from'), query('to')))
const family = computed(() => resolveFamily(scope.value, query('family')))
const member = computed(() => family.value?.members.find(item => item.id === query('person')))
const mode = computed<Mode>(() => query('mode') === 'plans' ? 'plans' : query('mode') === 'families' || family.value ? 'families' : 'map')
const zone = computed<ZoneFilter>(() => zones.find(item => item.id === query('zone'))?.id ?? 'all')
const counts = computed(() => countsAt(scope.value, period.value))
const quantity = computed(() => total(counts.value))
const visibleQuantity = computed(() => countFor(counts.value, zone.value))
const areaName = computed(() => scopeName(scope.value))
const levelName = computed(() => area.value.mahalla ? 'Mahalla' : area.value.district ? 'Tuman / shahar' : area.value.region ? 'Hudud' : 'Respublika')
const focusZone = computed(() => zone.value === 'all' ? 'risk' : zone.value)
const metric = ref<Metric>('share')
const mapLabel = computed(() => mapLabels[focusZone.value] + (metric.value === 'share' ? ' ulushi' : ' soni'))
const atlasHover = ref<string>()
const placeSearch = ref('')
const showAllPlaces = ref(false)
const familySearch = ref('')
const page = ref(0)
const pageSize = 12
const filterStage = computed({
  get: () => ['planned', 'active', 'done', 'overdue'].find(id => id === query('planStatus')) ?? 'all',
  set: (status: string) => change({ planStatus: status === 'all' ? undefined : status }),
})
const planTarget = ref<PlanTarget>()
const recommendation = ref<{ measure: string; agency: string }>()
const selectedPlanId = ref<string>()
const feedback = ref('')
const workspace = ref<HTMLElement>()
const pageHead = ref<HTMLElement>()
const { items, storageWarning, create, advance, atScope, assessments, assess } = useInterventions()
const caseKey = computed(() => family.value ? family.value.ref + '/' + (member.value?.id ?? 'household') : '')
const assessment = computed(() => assessments.value[caseKey.value])
const review = computed(() => query('review') === 'yes')

const percentage = (value: number) => number(Math.round(value * 10) / 10) + '%'
const part = (count: number, sum: number) => sum ? count / sum * 100 : 0
function change(next: LocationQueryRaw) {
  void router.push({ query: { ...route.query, ...next } })
}
function selectPeriod(next: ReportingPeriod) {
  change({ periodKind: next.kind === 'all' ? undefined : next.kind, from: next.from || undefined, to: next.to || undefined })
}
function scopeQuery(target: AreaScope): LocationQueryRaw {
  return { area: target.region, district: target.district, mahalla: target.mahalla }
}
function tabQuery(next: Mode): LocationQueryRaw {
  return {
    ...route.query, ...scopeQuery(scope.value),
    mode: next === 'map' ? undefined : next,
    family: undefined, person: undefined, review: undefined,
    planStatus: next === 'plans' ? query('planStatus') : undefined,
  }
}
function setZone(next: ZoneFilter) {
  if (next === zone.value && !family.value) return
  change({ zone: next === 'all' ? undefined : next, family: undefined, person: undefined, mode: mode.value === 'map' ? undefined : mode.value })
}
function goArea(target: AreaScope) {
  change({ ...scopeQuery(target), family: undefined, person: undefined, review: undefined, mode: mode.value === 'map' ? undefined : mode.value })
}
function openFamily(row: DemoFamily) {
  change({ ...scopeQuery(row.scope), mode: 'families', family: String(row.index), person: undefined, review: undefined, planStatus: undefined })
}

const crumbs = computed(() => {
  const { region, district, mahalla } = area.value
  const levels: { name: string; scope: AreaScope }[] = [{ name: 'Respublika', scope: {} }]
  if (region) levels.push({ name: region.name, scope: { region: region.id } })
  if (district) levels.push({ name: district.name, scope: { region: region?.id, district: district.id } })
  if (mahalla) levels.push({ name: mahalla.name, scope: scope.value })
  return levels
})
const placeLevel = computed(() => area.value.mahalla ? 'Mahalladagi oilalar' : area.value.district ? 'Mahallalar' : area.value.region ? 'Tuman va shaharlar' : 'Hududlar')
const searchPlaceLabel = computed(() => area.value.district ? 'Mahalla nomini qidirish' : area.value.region ? 'Tuman yoki shaharni qidirish' : 'Hududni qidirish')
const territoryRows = computed(() => {
  const { region, district } = area.value
  const entries = district?.mahallas ?? region?.districts ?? regions
  return entries.map(entry => {
    const target = district ? { ...scope.value, mahalla: entry.id }
      : region ? { region: region.id, district: entry.id } : { region: entry.id }
    const population = countsAt(target, period.value)
    const count = population[focusZone.value]
    const share = part(count, total(population))
    return { ...entry, target, count, share, assessed: total(population), value: metric.value === 'count' ? count : share }
  }).sort((left, right) => right.value - left.value || left.name.localeCompare(right.name, 'uz'))
})
const mapValues = computed(() => Object.fromEntries(territoryRows.value.filter(row => row.assessed).map(row => [row.id, row.value])))
const maximum = computed(() => Math.max(1, territoryRows.value[0]?.value ?? 0))
const visiblePlaces = computed(() => {
  const term = normalize(placeSearch.value)
  return territoryRows.value.filter(row => !term || normalize(row.name).includes(term))
})
const displayedPlaces = computed(() => !scope.value.region && !showAllPlaces.value && !placeSearch.value ? visiblePlaces.value.slice(0, 3) : visiblePlaces.value)
const priorities = computed(() => new Map(!scope.value.region && mode.value === 'map'
  ? territoryRows.value.slice(0, 3).map(row => [row.id, leadingSignal(row.target, focusZone.value, period.value)]) : []))
function pickPlace(id: string) {
  if (id === scope.value.mahalla) {
    change({ mode: 'families' })
    return
  }
  const found = territoryRows.value.find(row => row.id === id)
  if (found) goArea(found.target)
}

const isFamilyList = computed(() => mode.value === 'families' && !family.value)
const familyResult = computed(() => isFamilyList.value
  ? familyPage(scope.value, zone.value, familySearch.value, page.value * pageSize, pageSize, period.value)
  : { rows: [], count: 0 })
const hasNextPage = computed(() => (page.value + 1) * pageSize < familyResult.value.count)
const localFamilies = computed(() => area.value.mahalla && mode.value === 'map'
  ? familyPage(scope.value, zone.value, placeSearch.value, 0, 26, period.value).rows
  : [])

const scopedPlans = computed(() => atScope(scope.value).filter(plan =>
  (period.value.kind === 'all' || inPeriod(todayInTashkent(new Date(plan.opened)), period.value))
    && (zone.value === 'all' || plan.target.zone === 'all' || zone.value === plan.target.zone)))
const openPlanCount = computed(() => scopedPlans.value.filter(plan => plan.stage !== 'done').length)
const overdueCount = computed(() => scopedPlans.value.filter(overdue).length)
const listedPlans = computed(() => scopedPlans.value.filter(plan => filterStage.value === 'overdue' ? overdue(plan) : filterStage.value === 'all' || plan.stage === filterStage.value))
const familyPlans = computed(() => atScope(scope.value).filter(plan => plan.target.family === family.value?.index
  && (!member.value || plan.target.person === member.value.id)))
const selectedPlan = computed(() => items.value.find(plan => plan.id === selectedPlanId.value))
const planStageLabel = (id: PlanStage) => stages.find(stage => stage.id === id)?.label ?? ''
const ongoingByFamily = computed(() => {
  const map = new Map<string, Intervention>()
  for (const plan of items.value) {
    if (plan.stage === 'done' || !plan.target.family) continue
    const key = [plan.target.scope.region, plan.target.scope.district, plan.target.scope.mahalla, plan.target.family].join('/')
    const current = map.get(key)
    if (!current || (current.stage === 'planned' && plan.stage === 'active')) map.set(key, plan)
  }
  return map
})
function ongoingPlan(row: DemoFamily) {
  return ongoingByFamily.value.get([row.scope.region, row.scope.district, row.scope.mahalla, row.index].join('/'))
}
function saveAssessment(need: string) {
  if (!caseKey.value) return
  assess(caseKey.value, need)
  void router.replace({ query: { ...route.query, review: undefined } })
}
function reassessPlan(plan: Intervention) {
  closePlan()
  change({ ...scopeQuery(plan.target.scope), mode: 'families', family: String(plan.target.family), person: plan.target.person, review: 'yes', planStatus: undefined })
}

watch([() => scope.value.region, () => scope.value.district, () => scope.value.mahalla], () => {
  placeSearch.value = ''
  showAllPlaces.value = false
  familySearch.value = ''
  atlasHover.value = undefined
})
watch([scope, zone, familySearch, period], () => { page.value = 0 })
watch([mode, () => family.value?.ref, () => member.value?.id], async () => {
  await nextTick()
  workspace.value?.focus({ preventScroll: true })
  pageHead.value?.scrollIntoView({ block: 'nearest' })
})
watch(() => route.fullPath, () => {
  planTarget.value = undefined
  selectedPlanId.value = undefined
})

function startPlan() {
  if (!family.value && visibleQuantity.value === 0) return
  feedback.value = ''
  selectedPlanId.value = undefined
  const activeFamily = family.value
  const activeMember = member.value
  planTarget.value = {
    scope: scope.value,
    zone: activeMember?.zone ?? activeFamily?.zone ?? zone.value,
    families: activeFamily ? 1 : visibleQuantity.value,
    family: activeFamily?.index,
    person: activeMember?.id,
    title: activeMember && activeFamily ? activeMember.name + ' · ' + activeFamily.ref : activeFamily?.ref ?? areaName.value,
  }
  const signal = activeMember?.signal ?? activeFamily?.signal
  recommendation.value = signal ? { measure: signal.action, agency: signal.agency } : undefined
}
function closePlan() {
  planTarget.value = undefined
  selectedPlanId.value = undefined
}
function savePlan(input: PlanInput) {
  if (!planTarget.value) return
  const plan = create(planTarget.value, input)
  planTarget.value = undefined
  selectedPlanId.value = plan.id
  feedback.value = storageWarning.value ? '' : 'Chora rejalashtirildi.'
}
function updatePlan(outcome?: string) {
  if (!selectedPlan.value) return
  const started = selectedPlan.value.stage === 'planned'
  advance(selectedPlan.value.id, outcome)
  feedback.value = storageWarning.value ? '' : started ? 'Chora ijroga olindi.' : 'Ijro natijasi saqlandi.'
}
</script>

<template>
  <div class="risk-monitor">
    <div class="rm-page">
      <header ref="pageHead" class="rm-page-head">
        <div>
          <p class="rm-overline"><span aria-hidden="true" />{{ t('Ijtimoiy himoya monitoringi') }}</p>
          <h1>{{ t('Oilalar farovonligi') }}</h1>
        </div>
        <div class="rm-head-actions">
          <span class="rm-date" :title="t('Ma’lumot sanasi')"><CalendarDays :size="15" />{{ formatDate(snapshotDate) }}</span>
          <span class="rm-demo">{{ t('Namuna') }}</span>
          <ReportingPeriodPicker :period="period" @apply="selectPeriod" />
          <button type="button" class="rm-button rm-primary" :disabled="!family && !visibleQuantity" @click="startPlan"><Plus :size="17" />{{ t('Chora belgilash') }}</button>
        </div>
      </header>

      <nav class="rm-scope" :aria-label="t('Hudud bo‘yicha tanlov')">
        <MapPin :size="16" class="rm-scope-marker" />
        <ol>
          <li v-for="(crumb, i) in crumbs" :key="crumb.name + i">
            <ChevronRight v-if="i" :size="13" />
            <button v-if="i < crumbs.length - 1 || family" type="button" @click="goArea(crumb.scope)">{{ t(crumb.name) }}</button>
            <strong v-else aria-current="location">{{ t(crumb.name) }}</strong>
          </li>
          <li v-if="family">
            <ChevronRight :size="13" />
            <button v-if="member" type="button" @click="change({ person: undefined })">{{ family.ref }}</button>
            <strong v-else aria-current="location">{{ family.ref }}</strong>
          </li>
          <li v-if="member"><ChevronRight :size="13" /><strong aria-current="location">{{ t(member.name) }}</strong></li>
        </ol>
        <span v-if="area.region" class="rm-scope-level">{{ t(member ? 'Shaxs' : family ? 'Oila' : levelName) }}</span>
      </nav>

      <section v-if="!family" class="rm-kpis" :aria-label="t('Oilalarning holati bo‘yicha ko‘rsatkichlar')">
        <button v-for="item in kpis" :key="item.id" type="button" class="rm-kpi" :data-zone="item.id" :aria-pressed="zone === item.id" @click="setZone(item.id)">
          <span class="rm-kpi-title"><component :is="item.icon" :size="17" />{{ t(item.label) }}</span>
          <span class="rm-kpi-bottom">
            <strong>{{ number(countFor(counts, item.id)) }}</strong>
            <span v-if="item.id === 'all'" class="rm-kpi-unit">{{ t('ta oila') }}</span>
            <span v-else class="rm-kpi-part">{{ percentage(part(counts[item.id], quantity)) }}</span>
          </span>
        </button>
      </section>

      <nav class="rm-tabs" :aria-label="t('Monitoring bo‘limlari')">
        <RouterLink v-for="tab in tabs" :key="tab.id" :to="{ path: route.path, query: tabQuery(tab.id) }" :aria-current="mode === tab.id ? 'page' : undefined">
          <component :is="tab.icon" :size="17" />{{ t(tab.label) }}
          <span v-if="tab.id === 'plans' && openPlanCount" class="rm-tab-count">{{ number(openPlanCount) }}</span>
        </RouterLink>
        <span v-if="feedback" class="rm-feedback" role="status">{{ t(feedback) }}</span>
      </nav>

      <div ref="workspace" class="rm-workspace" role="region" tabindex="-1" :aria-label="t(tabs.find(tab => tab.id === mode)?.label ?? '')">
        <p v-if="storageWarning" class="rm-storage-warning" role="status"><AlertCircle :size="17" />{{ t('Rejani brauzerga saqlashning imkoni bo‘lmadi.') }}</p>
        <section v-if="mode === 'map'" class="rm-map-layout" :data-zone="focusZone">
          <article class="rm-panel rm-map-panel">
            <header class="rm-panel-head">
              <div><h2>{{ t(areaName) }}</h2><p>{{ t(mapLabel) }}</p></div>
              <div class="rm-segment" role="group" :aria-label="t('Xarita ko‘rsatkichi')">
                <button v-for="item in mapMetrics" :key="item.id" type="button" :aria-pressed="item.id === metric" @click="metric = item.id">{{ t(item.label) }}</button>
              </div>
            </header>
            <RiskAtlas :scope="scope" :values="mapValues" :zone="focusZone" :metric="metric" :label="mapLabel" :active="atlasHover" @pick="pickPlace" @hover="atlasHover = $event" />
            <footer class="rm-map-foot">
              <span><i aria-hidden="true" />{{ t('Chegaralar') }} · IHMA DWH</span>
              <span>{{ t(metric === 'share' ? 'Ulush baholangan oilalarga nisbatan' : 'Tanlangan holatdagi oilalar soni') }}</span>
            </footer>
          </article>

          <article class="rm-panel rm-places">
            <header class="rm-panel-head">
              <div><h2>{{ t(!scope.region && !showAllPlaces ? 'Ustuvor hududlar' : placeLevel) }}</h2><p v-if="area.mahalla">{{ number(visibleQuantity) }} {{ t('ta oila') }}</p><p v-else>{{ t(metric === 'count' ? 'Oila soni bo‘yicha' : 'Ulush bo‘yicha') }}</p></div>
              <House v-if="area.mahalla" :size="20" class="rm-panel-icon" />
              <ArrowDownWideNarrow v-else :size="20" class="rm-panel-icon" />
            </header>
            <div v-if="scope.region || showAllPlaces" class="rm-place-search">
              <label class="rm-search"><Search :size="16" /><input v-model="placeSearch" type="search" :aria-label="t(area.mahalla ? 'Oila raqamini qidiring' : searchPlaceLabel)" :placeholder="t(area.mahalla ? 'Oila raqamini qidiring' : searchPlaceLabel)" /></label>
            </div>
            <ul v-if="area.mahalla && localFamilies.length" :key="scope.mahalla" class="rm-place-list rm-local-list">
              <li v-for="row in localFamilies" :key="row.ref">
                <button type="button" class="rm-local-row" @click="openFamily(row)"><span><b>{{ row.ref }}</b><small>{{ t(row.members[0]?.name) }} · {{ row.members.length }} {{ t('nafar') }}</small></span><RiskStatus :zone="row.zone" /><ChevronRight :size="15" /></button>
              </li>
            </ul>
            <ol v-else-if="!area.mahalla && visiblePlaces.length" :key="scope.region + '/' + scope.district" class="rm-place-list">
              <li v-for="(row, index) in displayedPlaces" :key="row.id">
                <button type="button" class="rm-place-row" :class="{ 'is-hot': atlasHover === row.id }"
                  @mouseenter="atlasHover = row.id" @mouseleave="atlasHover = undefined"
                  @focus="atlasHover = row.id" @blur="atlasHover = undefined" @click="goArea(row.target)">
                  <span class="rm-rank">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="rm-place-content"><b>{{ t(row.name) }}</b><small v-if="priorities.get(row.id)">{{ t(priorities.get(row.id)) }}</small><i><em :style="{ width: (row.value / maximum * 100) + '%' }" /></i></span>
                  <span class="rm-place-values"><b>{{ row.assessed ? (metric === 'count' ? number(row.count) : percentage(row.share)) : '—' }}</b><small v-if="row.assessed">{{ metric === 'count' ? percentage(row.share) : number(row.count) + ' ' + t('ta') }}</small></span>
                  <ChevronRight :size="15" class="rm-place-chevron" />
                </button>
              </li>
            </ol>
            <p v-else class="rm-places-empty">{{ t('Qidiruv bo‘yicha natija topilmadi.') }}</p>
            <footer v-if="area.mahalla" class="rm-places-footer"><RouterLink :to="{ path: route.path, query: tabQuery('families') }">{{ t('Oilalar reyestrini ochish') }} <ArrowRight :size="15" /></RouterLink></footer>
            <footer v-else-if="!scope.region" class="rm-places-footer"><button type="button" class="rm-text-button" :aria-expanded="showAllPlaces" @click="showAllPlaces = !showAllPlaces; placeSearch = ''">{{ t(showAllPlaces ? 'Ustuvor hududlar' : 'Barcha hududlar') }}</button></footer>
            <RouterLink v-if="!area.mahalla" class="rm-overdue-link" :to="{ path: route.path, query: { ...tabQuery('plans'), planStatus: 'overdue' } }">
              <AlertCircle :size="16" /><span>{{ t('Muddati o‘tgan choralar') }}</span><strong>{{ number(overdueCount) }}</strong><ChevronRight :size="15" />
            </RouterLink>
          </article>
        </section>

        <FamilyDossier v-else-if="mode === 'families' && family" :key="caseKey" :family="family" :member="member" :plans="familyPlans" :period="period" :assessment="assessment" :review="review"
          @member="change({ person: $event, review: undefined })" @household="change({ person: undefined, review: undefined })" @create="startPlan" @plan="selectedPlanId = $event"
          @review="change({ review: $event ? 'yes' : undefined })" @assess="saveAssessment" />

        <section v-else-if="mode === 'families'" class="rm-panel rm-data-panel">
          <header class="rm-panel-head">
            <div><h2>{{ t('Oilalar reyestri') }}</h2><p>{{ t(areaName) }} · {{ number(familyResult.count) }} {{ t('ta oila') }}</p></div>
            <label class="rm-search rm-table-search"><Search :size="17" /><input v-model="familySearch" type="search" :aria-label="t('Oila raqami yoki hudud nomi')" :placeholder="t('Oila raqami yoki hudud nomi')" /></label>
          </header>
          <div v-if="familyResult.rows.length" class="rm-table-scroll">
            <table class="rm-table">
              <thead><tr><th scope="col">{{ t('Oila') }}</th><th scope="col">{{ t('Hudud') }}</th><th scope="col">{{ t('Holat') }}</th><th scope="col">{{ t('Oxirgi signal') }}</th><th scope="col">{{ t('Chora') }}</th><th scope="col"><span class="sr-only">{{ t('Oila kartasi') }}</span></th></tr></thead>
              <tbody>
                <tr v-for="row in familyResult.rows" :key="row.scope.region + '/' + row.scope.district + '/' + row.ref">
                  <td><button class="rm-text-button" type="button" @click="openFamily(row)">{{ row.ref }}</button><small>{{ t(row.members[0]?.name) }} · {{ row.members.length }} {{ t('nafar') }}</small></td>
                  <td><strong>{{ t(row.mahallaName) }}</strong><small>{{ t(row.districtName) }}<template v-if="!scope.region"> · {{ t(row.regionName) }}</template></small></td>
                  <td><RiskStatus :zone="row.zone" /></td>
                  <td><span>{{ t(row.signal.label) }}</span><small>{{ formatDate(row.recordedOn) }}</small></td>
                  <td><button v-if="ongoingPlan(row)" type="button" class="rm-text-button" @click="selectedPlanId = ongoingPlan(row)?.id">{{ t(ongoingPlan(row)?.measure) }}</button><span v-else>—</span></td>
                  <td class="rm-action-cell"><button type="button" class="rm-icon-button" :aria-label="row.ref + ' · ' + t('Oila kartasi')" :title="t('Oila kartasini ochish')" @click="openFamily(row)"><ArrowRight :size="17" /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="rm-empty"><Search :size="24" /><p>{{ t('Qidiruv bo‘yicha oila topilmadi.') }}</p><button v-if="familySearch" type="button" class="rm-button rm-quiet" @click="familySearch = ''">{{ t('Qidiruvni tozalash') }}</button></div>
          <footer v-if="familyResult.count" class="rm-pagination">
            <span>{{ number(page * pageSize + 1) }}–{{ number(Math.min((page + 1) * pageSize, familyResult.count)) }} / {{ number(familyResult.count) }}</span>
            <div>
              <button class="rm-icon-button" type="button" :aria-label="t('Oldingi sahifa')" :title="t('Oldingi sahifa')" :disabled="page === 0" @click="page--"><ChevronLeft :size="18" /></button>
              <button class="rm-icon-button" type="button" :aria-label="t('Keyingi sahifa')" :title="t('Keyingi sahifa')" :disabled="!hasNextPage" @click="page++"><ChevronRight :size="18" /></button>
            </div>
          </footer>
        </section>

        <section v-else class="rm-panel rm-data-panel">
          <header class="rm-panel-head">
            <div><h2>{{ t('Choralar rejasi') }}</h2><p>{{ t(areaName) }} · {{ number(listedPlans.length) }} {{ t('ta chora') }}</p></div>
            <label class="rm-status-filter"><span>{{ t('Ijro holati') }}</span><select v-model="filterStage"><option value="all">{{ t('Barchasi') }}</option><option v-for="stage in stages" :key="stage.id" :value="stage.id">{{ t(stage.label) }}</option><option value="overdue">{{ t('Muddati o‘tgan') }}</option></select></label>
          </header>
          <div v-if="listedPlans.length" class="rm-table-scroll">
            <table class="rm-table">
              <thead><tr><th scope="col">{{ t('Chora') }}</th><th scope="col">{{ t('Qamrov') }}</th><th scope="col">{{ t('Mas’ul tashkilot') }}</th><th scope="col">{{ t('Muddat') }}</th><th scope="col">{{ t('Ijro holati') }}</th><th scope="col"><span class="sr-only">{{ t('Chora tafsilotlari') }}</span></th></tr></thead>
              <tbody>
                <tr v-for="item in listedPlans" :key="item.id">
                  <td><button type="button" class="rm-text-button" @click="selectedPlanId = item.id">{{ t(item.measure) }}</button></td>
                  <td><strong>{{ t(item.target.title) }}</strong><small>{{ t(item.target.family ? scopeName(item.target.scope) : number(item.target.families) + ' ta oila') }}</small></td>
                  <td><span>{{ t(item.agency) }}</span><small v-if="item.assignee">{{ item.assignee }}</small></td>
                  <td><span>{{ formatDate(item.due) }}</span><small v-if="overdue(item)" class="rm-overdue">{{ t('Muddati o‘tgan') }}</small></td>
                  <td><span class="rm-stage" :data-stage="item.stage">{{ t(planStageLabel(item.stage)) }}</span></td>
                  <td class="rm-action-cell"><button type="button" class="rm-icon-button" :aria-label="t(item.measure + ' · Chora tafsilotlari')" :title="t('Chora tafsilotlari')" @click="selectedPlanId = item.id"><ArrowRight :size="17" /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="rm-empty">
            <ClipboardList :size="27" />
            <p>{{ t(filterStage === 'all' ? 'Bu tanlov bo‘yicha hali chora belgilanmagan.' : 'Bu holatdagi choralar topilmadi.') }}</p>
            <button v-if="filterStage !== 'all'" class="rm-button rm-quiet" type="button" @click="filterStage = 'all'">{{ t('Barcha choralarni ko‘rish') }}</button>
            <button v-else class="rm-button rm-quiet" type="button" :disabled="!visibleQuantity" @click="startPlan"><Plus :size="16" />{{ t('Chora belgilash') }}</button>
          </div>
        </section>
        <SupportHistory v-if="!family && mode !== 'plans'" :key="[scope.region, scope.district, scope.mahalla, zone, period.from, period.to].join('/')" :scope="scope" :period="period" :zone="zone" />
      </div>

      <InterventionDialog v-if="planTarget || selectedPlan" :key="selectedPlan?.id ?? 'new'" :target="planTarget" :plan="selectedPlan" :recommended="recommendation"
        :storage-warning="storageWarning" @close="closePlan" @create="savePlan" @advance="updatePlan" @reassess="reassessPlan" />
    </div>
  </div>
</template>

<style src="./monitoring.css"></style>
