<script setup lang="ts">
import { ref } from 'vue'
import { Check, Languages } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { useI18n } from '@/shared/i18n'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'

const { languages, currentLanguage, locale, setLocale } = useI18n()
const isOpen = ref(false)
</script>

<template>
  <DropdownMenuRoot v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        :class="cn(
          'h-8 gap-1.5 px-2 text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 sm:px-2.5',
          isOpen ? 'bg-accent text-foreground' : '',
        )"
        aria-label="Til tanlash"
        title="Til tanlash"
      >
        <Languages class="h-4 w-4" />
        <span class="hidden min-w-7 text-xs font-semibold uppercase sm:inline">
          {{ currentLanguage?.shortLabel ?? 'UZ' }}
        </span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="8"
        class="z-50 min-w-36 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none"
      >
        <DropdownMenuItem
          v-for="language in languages"
          :key="language.code"
          :class="[
            'flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-200 ease-out hover:bg-muted',
            locale === language.code ? 'bg-primary/10 text-foreground' : '',
          ]"
          @select="setLocale(language.code)"
        >
          <span>{{ language.label }}</span>
          <Check
            v-if="locale === language.code"
            class="h-4 w-4 text-primary"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
