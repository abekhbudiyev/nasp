<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { STORAGE_KEYS } from '@/core/constants/storage'
import AppShell from './AppShell.vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const LAPTOP_SIDEBAR_COLLAPSE_WIDTH = 1200
const DESKTOP_SIDEBAR_BREAKPOINT = 1024

const route = useRoute()
const viewportWidth = ref(typeof window === 'undefined' ? DESKTOP_SIDEBAR_BREAKPOINT : window.innerWidth)
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const showSidebar = computed(() => route.path !== '/apps')
const fitViewport = computed(() => route.meta.moduleKey === 'regional-centers')
const enableSidebarCollapse = computed(() => viewportWidth.value >= DESKTOP_SIDEBAR_BREAKPOINT)
const effectiveSidebarCollapsed = computed(() => enableSidebarCollapse.value && sidebarCollapsed.value)

const storedSidebarCollapsed = localStorage.getItem(STORAGE_KEYS.sidebarCollapsed)
const hasStoredSidebarPreference = storedSidebarCollapsed === 'true' || storedSidebarCollapsed === 'false'

if (storedSidebarCollapsed === 'true') {
  sidebarCollapsed.value = true
}

function syncViewportWidth() {
  viewportWidth.value = window.innerWidth
}

onMounted(() => {
  syncViewportWidth()

  if (!hasStoredSidebarPreference) {
    sidebarCollapsed.value = window.innerWidth < LAPTOP_SIDEBAR_COLLAPSE_WIDTH
  }

  window.addEventListener('resize', syncViewportWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewportWidth)
})

function toggleSidebar() {
  if (!showSidebar.value) {
    return
  }

  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function toggleSidebarCollapse() {
  if (!showSidebar.value) {
    return
  }

  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, String(sidebarCollapsed.value))
}

watch(showSidebar, (visible) => {
  if (!visible) {
    closeSidebar()
  }
})
</script>

<template>
  <AppShell
    :sidebar-open="sidebarOpen"
    :show-sidebar="showSidebar"
    :sidebar-collapsed="effectiveSidebarCollapsed"
    :fit-viewport="fitViewport"
    @close-sidebar="closeSidebar"
  >
    <template
      v-if="showSidebar"
      #sidebar
    >
      <AppSidebar
        :collapsed="effectiveSidebarCollapsed"
        @toggle-collapse="toggleSidebarCollapse"
        @navigate="closeSidebar"
      />
    </template>

    <template #header>
      <AppHeader
        :show-sidebar="showSidebar"
        :sidebar-collapsed="effectiveSidebarCollapsed"
        @toggle-sidebar="toggleSidebar"
        @toggle-sidebar-collapse="toggleSidebarCollapse"
      />
    </template>

    <RouterView />
  </AppShell>
</template>
