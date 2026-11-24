<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { IncidentCase } from '../incident-cases'

defineProps<{ incidentCase: IncidentCase; expanded: boolean }>()

const time = new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent', hour: '2-digit', minute: '2-digit' })
</script>

<template>
  <details :open="expanded" class="group rounded-md border bg-muted/25">
    <summary class="flex cursor-pointer list-none items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
      Hodisa tafsilotlari
      <ChevronDown class="size-4 group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div class="grid gap-4 border-t px-3 py-3 text-sm lg:grid-cols-2">
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold">Ta’sir doirasi</h4>
          <p class="mt-1 text-muted-foreground">{{ incidentCase.impact }}</p>
        </div>
        <div>
          <h4 class="font-semibold">Kuzatilgan dalillar</h4>
          <ul class="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
            <li v-for="item in incidentCase.evidence" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold">Tashxis holati</h4>
          <p class="mt-1 text-muted-foreground">{{ incidentCase.assessment }}</p>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold">Vaqt chizig‘i (UZT)</h4>
          <ol class="mt-2 space-y-2">
            <li v-for="event in incidentCase.timeline" :key="event.at" class="flex items-baseline gap-2">
              <time :datetime="event.at" class="shrink-0 font-medium tabular-nums">{{ time.format(new Date(event.at)) }}</time>
              <span class="text-muted-foreground">{{ event.detail }}</span>
            </li>
          </ol>
        </div>
        <div>
          <h4 class="font-semibold">Keyingi tekshiruv</h4>
          <p class="mt-1 text-muted-foreground">{{ incidentCase.followUp }}</p>
        </div>
        <ul class="flex flex-wrap gap-x-3 gap-y-1">
          <li v-for="link in incidentCase.related" :key="link.route">
            <RouterLink :to="{ name: link.route, query: { modul: link.moduleId, yonalish: link.direction } }" class="font-medium text-primary underline underline-offset-2">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </details>
</template>
