<script setup lang="ts">
import { computed, ref } from 'vue'
import { LogOut, UserRound } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'

const authStore = useAuthStore()
const router = useRouter()
const isOpen = ref(false)

const userLabel = computed(() => authStore.currentUser?.fullName ?? 'Operator')
const userRole = computed(() => authStore.currentUser?.role?.toLowerCase() === userLabel.value.toLowerCase() ? 'Tizim administratori' : authStore.currentUser?.role ?? 'Foydalanuvchi')

async function handleLogout() {
  authStore.logout()
  await router.replace('/login')
}
</script>

<template>
  <DropdownMenuRoot v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        aria-label="Foydalanuvchi menyusi"
        title="Foydalanuvchi menyusi"
        :class="cn(
          'h-9 justify-between gap-2 px-1.5 focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 sm:px-2',
          isOpen ? 'bg-accent text-foreground' : '',
        )"
      >
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <UserRound class="h-4 w-4" />
          </div>
          <div class="hidden text-left sm:block">
            <div class="text-sm font-medium leading-4">
              {{ userLabel }}
            </div>
            <div class="text-xs leading-4 text-muted-foreground">
              {{ userRole }}
            </div>
          </div>
        </div>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="8"
        class="z-50 min-w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none"
      >
        <DropdownMenuLabel class="px-2 py-1.5">
          <span class="block text-sm font-medium text-foreground">{{ userLabel }}</span>
          <span class="mt-0.5 block text-xs font-normal text-muted-foreground">{{ userRole }}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator class="my-1 h-px bg-border" />
        <DropdownMenuItem
          class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted"
          @select.prevent="handleLogout"
        >
          <LogOut class="h-4 w-4" />
          <span>Chiqish</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
