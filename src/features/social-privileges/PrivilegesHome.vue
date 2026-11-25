<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { privilegeSections, privilegesTitle } from './config'
</script>

<template>
  <section class="min-h-0 overflow-y-auto p-4 sm:p-7">
    <h1 class="mb-5 text-2xl font-semibold tracking-tight">{{ privilegesTitle }}</h1>
    <div class="grid gap-3 md:grid-cols-3">
      <RouterLink
        v-for="section in privilegeSections"
        :key="section.id"
        :to="section.route"
        class="group flex flex-col gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-ring"
      >
        <div class="flex items-center justify-between text-primary">
          <component :is="section.icon" :size="22" /><ArrowRight :size="17" />
        </div>
        <div>
          <h2 class="font-semibold">{{ section.title }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ section.description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
