<script setup lang="ts">
defineProps<{
  sidebarOpen: boolean
  showSidebar: boolean
  sidebarCollapsed: boolean
  fitViewport?: boolean
}>()

defineEmits<{
  closeSidebar: []
}>()
</script>

<template>
  <div class="ui-density bg-background text-foreground"
    :class="fitViewport ? 'h-dvh overflow-clip' : 'min-h-screen overflow-x-hidden xl:h-screen xl:overflow-hidden'">
    <div
      v-if="showSidebar && sidebarOpen"
      class="fixed inset-0 z-[80] bg-black/35 dark:bg-black/55 lg:hidden"
      @click="$emit('closeSidebar')"
    />

    <aside
      v-if="showSidebar"
      :class="[
        'fixed inset-y-0 left-0 z-[90] w-[min(16rem,calc(100vw-1rem))] overflow-hidden border-r border-border bg-sidebar text-sidebar-foreground shadow-[0_18px_45px_rgba(15,20,17,0.16)] transition-[width,transform] duration-300 ease-out dark:shadow-[0_18px_55px_rgba(0,0,0,0.4)] lg:z-30 lg:translate-x-0 lg:shadow-none',
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <slot name="sidebar" />
    </aside>

    <div
      :class="[
        'flex flex-col',
        fitViewport ? 'h-full overflow-clip' : 'min-h-screen overflow-visible xl:h-screen xl:overflow-hidden',
        showSidebar ? (sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64') : '',
      ]"
    >
      <header class="sticky top-0 z-20 shrink-0">
        <div class="border-b border-border bg-background/95 backdrop-blur">
          <slot name="header" />
        </div>
      </header>

      <main class="min-h-0 flex-1" :class="fitViewport ? 'overflow-clip' : 'overflow-visible xl:overflow-hidden'">
        <slot />
      </main>
    </div>
  </div>
</template>
