<script setup lang="ts">
import { CircleHelp } from 'lucide-vue-next'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import type { ValueHelp } from '../value-help'

defineProps<{ help: ValueHelp; inverse?: boolean }>()
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <button type="button" :aria-label="`${help.label} — qanday olinadi?`" class="ml-1 inline-grid size-6 shrink-0 place-items-center rounded-full align-middle focus-visible:outline-2 focus-visible:outline-ring" :class="inverse ? 'text-emerald-100 hover:bg-white/15' : 'text-muted-foreground hover:bg-muted hover:text-primary'">
        <CircleHelp class="size-3.5" aria-hidden="true" />
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent sticky="always" :side-offset="6" :collision-padding="12" class="z-[100] max-h-[min(24rem,80vh)] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border bg-popover p-3 text-left text-sm text-popover-foreground shadow-lg">
        <p class="font-semibold">{{ help.label }}</p>
        <p class="mt-1 text-muted-foreground">{{ help.meaning }}</p>
        <p class="mt-2 font-medium">Qanday olinadi?</p>
        <p class="mt-0.5 break-words text-muted-foreground">{{ help.how }}</p>
        <p class="mt-2 border-t pt-2 text-xs text-muted-foreground">Hozirgi qiymat demo ma’lumotidan.</p>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
