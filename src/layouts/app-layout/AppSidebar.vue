<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import logoMark from '@/assets/logo-mark.svg'
import { appModules } from '@/features/apps/registry/apps'
import { iptkMenu } from '@/features/iptk/config'
import { muruvvatMenu } from '@/features/muruvvat/config'
import { snavMenu } from '@/features/snav/config'
import { eiMenu } from '@/features/ei/config'
import { transportBenefitsMenu } from '@/features/transport-benefits/config'
import { ptpkMenu } from '@/features/ptpk/config'
import { socialBenefitsMenu, socialBenefitsMenuGroups } from '@/features/social-benefits/config'
import { governanceMenu } from '@/features/project-governance/config'
import { palliativeMenu, palliativeMenuGroups } from '@/features/palliative-care/config'
import { useAuthStore } from '@/stores/auth'
import type { MuruvvatMenuItem } from '@/features/muruvvat/types'
import { useI18n } from '@/shared/i18n'
import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  collapsed: boolean
}>()

defineEmits<{
  toggleCollapse: []
  navigate: []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { locale, t } = useI18n()
const modules = computed(() => appModules.filter((module) => (
  module.enabled && authStore.hasPermission(module.permission)
)))
const activeModuleKey = computed(() => route.meta.moduleKey ?? null)
const openSections = ref<Record<string, boolean>>({})
const brandHomeRoute = computed(() => {
  if (typeof activeModuleKey.value === 'string') {
    const activeModule = modules.value.find((module) => module.id === activeModuleKey.value)

    if (activeModule) {
      return activeModule.route
    }
  }

  return '/apps'
})

const currentModuleLabel = computed(() => {
  if (route.path === '/apps') {
    return t('Modullar')
  }

  if (typeof route.meta.moduleTitle === 'string') {
    return t(route.meta.moduleTitle)
  }

  return t(String(route.meta.title ?? 'Modul'))
})

const moduleNavigation = computed<MuruvvatMenuItem[]>(() => {
  if (activeModuleKey.value === 'social-benefits') return socialBenefitsMenu
  if (activeModuleKey.value === 'project-governance') return governanceMenu
  if (activeModuleKey.value === 'palliative-care') {
    return palliativeMenu
  }

  if (activeModuleKey.value === 'ptpk') {
    return ptpkMenu
  }

  if (activeModuleKey.value === 'iptk') {
    return iptkMenu
  }

  if (activeModuleKey.value === 'muruvvat') {
    return muruvvatMenu
  }

  if (activeModuleKey.value === 'snav') {
    return snavMenu
  }

  if (activeModuleKey.value === 'ei') {
    return eiMenu
  }

  if (activeModuleKey.value === 'transport-benefits') {
    return transportBenefitsMenu
  }

  return []
})

const groupedNavigation = computed(() => activeModuleKey.value === 'social-benefits'
  ? socialBenefitsMenuGroups
  : activeModuleKey.value === 'palliative-care' ? palliativeMenuGroups : [])

const sidebarRouteI18nKeys: Record<string, string> = {
  '/apps/ptpk': 'nav.dashboard',
  '/apps/ptpk/cases': 'Case’lar',
  '/apps/ptpk/triage': 'Triage va baholash',
  '/apps/ptpk/referrals': 'Xizmat yo‘naltirishlari',
  '/apps/ptpk/reviews': 'Review va apellyatsiya',
  '/apps/ptpk/monitoring': 'Monitoring',
  '/apps/ptpk/process': 'Jarayon modeli',
  '/apps/ptpk/references': 'Ma’lumotnomalar',
  '/apps/iptk': 'nav.dashboard',
  '/apps/iptk/info/info-1': 'nav.serviceTypes',
  '/apps/iptk/info/info-2': 'nav.diagnoses',
  '/apps/iptk/info/info-3': 'nav.contraindications',
  '/apps/iptk/info/info-4': 'nav.documents',
  '/apps/iptk/info/info-5': 'nav.questionnaireTemplate',
  '/apps/iptk/info/info-6': 'nav.categoryGroups',
  '/apps/iptk/applications/list': 'nav.applications',
  '/apps/iptk/applications/assessment': 'nav.assessment',
  '/apps/iptk/applications/protocol': 'nav.protocol',
  '/apps/iptk/applications/commissions': 'nav.commissions',
  '/apps/iptk/reports/applications': 'nav.applicationsReport',
  '/apps/muruvvat': 'nav.dashboard',
  '/apps/muruvvat/info/info-1': 'nav.info1',
  '/apps/muruvvat/info/info-2': 'nav.info2',
  '/apps/muruvvat/info/info-3': 'nav.info3',
  '/apps/muruvvat/applications/list': 'nav.applicationsList',
  '/apps/muruvvat/applications/statements': 'nav.statements',
  '/apps/muruvvat/applications/decisions': 'nav.decisions',
  '/apps/muruvvat/homes/queues': 'nav.queues',
  '/apps/muruvvat/homes/registered': 'nav.registered',
  '/apps/muruvvat/homes/removed': 'nav.removed',
  '/apps/muruvvat/reports/applications': 'nav.applicationsReport',
  '/apps/muruvvat/reports/homes': 'nav.homesReport',
  '/apps/snav': 'nav.dashboard',
  '/apps/snav/info/organization-types': 'nav.organizationTypes',
  '/apps/snav/info/organizations': 'nav.organizations',
  '/apps/snav/info/reception-schedules': 'nav.receptionSchedules',
  '/apps/ei': 'nav.main',
  '/apps/ei/providers/applications': 'nav.applications',
  '/apps/ei/providers/conclusions': 'nav.conclusions',
  '/apps/ei/providers/registry': 'nav.registry',
  '/apps/ei/providers/rating': 'Tadbirkorlar reytingi',
  '/apps/ei/children/applications': 'nav.applications',
  '/apps/ei/children/vouchers': 'nav.vouchers',
  '/apps/ei/children/orders': 'nav.orders',
  '/apps/ei/service/active': 'nav.activeServices',
  '/apps/ei/service/plans': 'nav.earlyInterventionPlans',
  '/apps/ei/service/attendance': 'nav.attendance',
  '/apps/ei/service/terminated': 'nav.terminatedServices',
  '/apps/ei/finance/subsidy-requests': 'nav.subsidyRequests',
  '/apps/ei/finance/payments': 'page.ei.financePayments',
  '/apps/ei/reports/providers-applications': 'page.ei.providersApplicationsReport',
  '/apps/transport-benefits': 'nav.dashboard',
}

const sidebarGroupI18nKeys: Record<string, string> = {
  applications: 'nav.applications',
  dashboard: 'nav.dashboard',
  homes: 'nav.homes',
  info: 'nav.info',
  management: 'nav.management',
  reports: 'nav.reports',
  children: 'nav.childrenRequests',
  finance: 'nav.finance',
  providers: 'nav.providers',
  service: 'nav.service',
  serviceDelivery: 'nav.serviceDelivery',
}

function sidebarTitle(item: MuruvvatMenuItem) {
  if (locale.value !== 'i18n') {
    return t(item.title)
  }

  return (item.route ? sidebarRouteI18nKeys[item.route] : undefined)
    ?? sidebarGroupI18nKeys[item.id]
    ?? item.title
}

function isActive(path: string) {
  if (route.path === path) {
    return true
  }

  if (['/apps/ptpk/cases', '/apps/palliative-care/cases'].includes(path) && route.path.startsWith(`${path}/`)) {
    return true
  }

  const segmentCount = path.split('/').filter(Boolean).length

  return segmentCount > 3 && route.path.startsWith(`${path}/`)
}

function isItemActive(item: MuruvvatMenuItem): boolean {
  if (item.route && isActive(item.route)) {
    return true
  }

  return item.children?.some((child) => isItemActive(child)) ?? false
}

function syncOpenSections() {
  const nextState: Record<string, boolean> = {}

  for (const item of moduleNavigation.value) {
    if (item.children?.length) {
      nextState[item.id] = isItemActive(item)
    }
  }

  openSections.value = nextState
}

function toggleSection(sectionId: string) {
  openSections.value = {
    ...Object.fromEntries(Object.keys(openSections.value).map((key) => [key, false])),
    [sectionId]: !openSections.value[sectionId],
  }
}

function handleSectionClick(item: MuruvvatMenuItem) {
  if (!props.collapsed) {
    toggleSection(item.id)
    return
  }

  const activeChild = item.children?.find((child) => child.route && isActive(child.route))
  const destination = activeChild?.route ?? item.children?.find((child) => child.route)?.route

  if (destination) {
    router.push(destination)
  }
}

watch(() => route.path, syncOpenSections, { immediate: true })
</script>

<template>
  <div class="flex h-full flex-col">
    <RouterLink
      :to="brandHomeRoute"
      @click="activeModuleKey === 'palliative-care' && $emit('navigate')"
      :aria-label="activeModuleKey === 'palliative-care' ? t('Bolalar palliativ yordami — bosh sahifa') : undefined"
      :class="cn(
        'flex h-16 items-center',
        collapsed ? 'justify-center px-2' : 'gap-2 px-4',
      )"
    >
      <div class="flex h-8 w-8 items-center justify-center p-0.5">
        <img
          :src="logoMark"
          alt="IHMA logo"
          class="h-full w-full object-contain"
        />
      </div>
      <div
        v-if="!collapsed"
        class="min-w-0 flex-1"
      >
        <p class="truncate text-sm font-semibold text-sidebar-foreground">
          IHMA
        </p>
        <p class="truncate text-xs text-muted-foreground">
          {{ currentModuleLabel }}
        </p>
      </div>
    </RouterLink>

    <div class="flex-1 overflow-y-auto p-2">
      <nav
        v-if="groupedNavigation.length"
        :aria-label="activeModuleKey === 'social-benefits' ? 'Ijtimoiy imtiyozlar bo‘limlari' : t('Bolalar palliativ yordami bo‘limlari')"
      >
        <div
          v-for="(group, index) in groupedNavigation"
          :key="group.id"
          role="group"
          :aria-label="t(group.title ?? 'Bosh sahifa')"
          :class="!collapsed && index > 0 ? (activeModuleKey === 'social-benefits' ? 'mt-4' : 'mt-5') : undefined"
        >
          <hr v-if="collapsed && index > 0" class="mx-4 my-3 border-sidebar-border" />
          <p v-if="group.title && !collapsed" :class="cn('px-2 pb-2 text-[11px] font-semibold text-muted-foreground', activeModuleKey === 'social-benefits' && 'flex items-center gap-2 text-[10px] tracking-[0.06em]', activeModuleKey === 'social-benefits' && group.items.some(isItemActive) && 'text-primary')">
            <span v-if="activeModuleKey === 'social-benefits'" :class="cn('h-1 w-1 rounded-full bg-sidebar-border', group.items.some(isItemActive) && 'bg-primary')" aria-hidden="true" />
            {{ t(group.title) }}
          </p>
          <div class="space-y-1">
            <RouterLink
              v-for="item in group.items"
              :key="item.id"
              :to="item.route ?? '/apps'"
              @click="$emit('navigate')"
              :aria-label="sidebarTitle(item)"
              :aria-current="isItemActive(item) ? 'page' : undefined"
              :title="collapsed ? sidebarTitle(item) : undefined"
              :class="cn(
                'flex h-8 items-center gap-2 rounded-md text-sm outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50',
                activeModuleKey === 'social-benefits' && 'h-8 text-[13px]',
                collapsed ? 'mx-auto w-8 justify-center p-0' : 'w-full px-2',
                isItemActive(item)
                  ? 'bg-sidebar-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--primary)] [&>svg]:text-primary'
                  : 'text-sidebar-foreground hover:bg-accent hover:text-foreground',
              )"
            >
              <component :is="item.icon" class="h-4 w-4 shrink-0" aria-hidden="true" />
              <span v-if="!collapsed" class="truncate">{{ sidebarTitle(item) }}</span>
            </RouterLink>
          </div>
        </div>
      </nav>
      <div
        v-else-if="moduleNavigation.length"
        class="space-y-1"
      >
        <p
          v-if="!collapsed"
          class="px-2 pb-2 text-xs font-medium text-muted-foreground"
        >
          {{ currentModuleLabel }}
        </p>

        <template
          v-for="item in moduleNavigation"
          :key="item.id"
        >
          <RouterLink
            v-if="item.route"
            :to="item.route"
            :class="cn(
              'flex h-8 items-center gap-2 rounded-md text-sm transition-colors duration-200 ease-out',
              collapsed ? 'mx-auto w-8 justify-center p-0' : 'w-full px-2',
              isItemActive(item)
                ? 'bg-sidebar-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--primary)] [&>svg]:text-primary'
                : 'text-sidebar-foreground hover:bg-accent hover:text-foreground',
            )"
            :title="collapsed ? sidebarTitle(item) : undefined"
          >
            <component
              :is="item.icon"
              class="h-4 w-4"
            />
            <span
              v-if="!collapsed"
              class="truncate"
            >
              {{ sidebarTitle(item) }}
            </span>
          </RouterLink>

          <div v-else>
            <button
              type="button"
              :class="cn(
                'flex h-8 items-center gap-2 rounded-md text-sm outline-none transition-colors duration-150 ease-out hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/35',
                collapsed ? 'mx-auto w-8 justify-center p-0' : 'w-full px-2',
                isItemActive(item) ? 'bg-sidebar-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--primary)] [&>svg]:text-primary' : 'text-sidebar-foreground',
              )"
              :title="collapsed ? sidebarTitle(item) : undefined"
              @click="handleSectionClick(item)"
            >
              <component
                :is="item.icon"
                class="h-4 w-4"
              />
              <span
                v-if="!collapsed"
                class="truncate font-medium"
              >
                {{ sidebarTitle(item) }}
              </span>
              <ChevronDown
                v-if="!collapsed"
                :class="cn(
                  'ml-auto h-4 w-4 transition-transform duration-200 ease-out',
                  openSections[item.id] ? 'rotate-180' : '',
                )"
              />
            </button>

            <Transition
              enter-active-class="transition-[grid-template-rows,opacity,transform] duration-200 ease-out"
              enter-from-class="grid-rows-[0fr] -translate-y-1 opacity-0"
              enter-to-class="grid-rows-[1fr] translate-y-0 opacity-100"
              leave-active-class="transition-[grid-template-rows,opacity,transform] duration-200 ease-out"
              leave-from-class="grid-rows-[1fr] translate-y-0 opacity-100"
              leave-to-class="grid-rows-[0fr] -translate-y-1 opacity-0"
            >
              <div
                v-if="!collapsed && item.children?.length && openSections[item.id]"
                class="ml-4 grid border-l border-sidebar-border pl-2"
              >
                <div class="min-h-0 space-y-1 overflow-hidden">
                  <RouterLink
                    v-for="child in item.children"
                    :key="child.id"
                    :to="child.route ?? '/apps'"
                    :class="cn(
                      'flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors duration-200 ease-out',
                      isItemActive(child)
                        ? 'bg-sidebar-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--primary)]'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )"
                  >
                    <span class="truncate">{{ sidebarTitle(child) }}</span>
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </template>
      </div>

      <div
        v-else
        class="space-y-1"
      >
        <p
          v-if="!collapsed"
          class="px-2 pb-2 text-xs font-medium text-muted-foreground"
        >
          {{ t('Modullar') }}
        </p>

        <RouterLink
          v-for="module in modules"
          :key="module.id"
          :to="module.route"
          :class="cn(
            'flex h-8 items-center gap-2 rounded-md text-sm transition-colors duration-200 ease-out',
            collapsed ? 'mx-auto w-8 justify-center p-0' : 'w-full px-2',
            isActive(module.route)
              ? 'bg-sidebar-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--primary)] [&>svg]:text-primary'
              : 'text-sidebar-foreground hover:bg-accent hover:text-foreground',
          )"
          :title="collapsed ? t(module.title) : undefined"
        >
          <component
            :is="module.icon"
            class="h-4 w-4"
          />
          <span
            v-if="!collapsed"
            class="truncate"
          >
            {{ t(module.title) }}
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
