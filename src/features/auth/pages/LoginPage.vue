<script setup lang="ts">
import PasswordLoginForm from '../components/PasswordLoginForm.vue'
import { useLoginFlow } from '../composables/useLoginFlow'
import logoMark from '@/assets/logo-mark.svg'
import oneIdIcon from '@/assets/oneid-icon.svg'
import eImzoLogo from '@/assets/e-imzo-logo.png'
import { APP_TITLE } from '@/core/constants/app'
import { Button } from '@/shared/ui/shadcn/button'
import { Card, CardContent } from '@/shared/ui/shadcn/card'
import { ref } from 'vue'
import { demoLoginAccounts, type DemoModuleAccount } from '../data/demo-accounts'

const {
  form,
  errors,
  selectedMethod,
  isPasswordVisible,
  isSubmitting,
  clearError,
  submitPassword,
  submitProviderLogin,
  togglePasswordVisibility,
  fillDemoAccount,
} = useLoginFlow()

const demoAccountsOpen = ref(false)
const selectedDemoTitle = ref('')
function chooseDemoAccount(account: DemoModuleAccount) {
  fillDemoAccount(account)
  selectedDemoTitle.value = account.title
  demoAccountsOpen.value = false
}

function handleForgotPassword() {
  errors.form = 'Parolni tiklash uchun tizim administratoriga murojaat qiling.'
}
</script>

<template>
  <div class="min-h-screen bg-muted/45 px-4 py-4 sm:px-6 sm:py-6">
    <div class="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1440px] items-center justify-center sm:min-h-[calc(100vh-3rem)]">
      <Card class="w-full max-w-[460px] rounded-xl bg-card shadow-[0_20px_55px_rgba(15,23,18,0.11)] ring-1 ring-foreground/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <CardContent class="space-y-6 p-6 sm:p-7">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/15">
              <img
                :src="logoMark"
                alt="IHMA"
                class="h-full w-full object-contain"
              >
            </div>
            <div class="space-y-0.5">
              <p class="text-base font-semibold text-foreground">
                {{ APP_TITLE }}
              </p>
              <p class="text-sm text-muted-foreground">
                Tizimga kirish
              </p>
            </div>
          </div>

          <PasswordLoginForm
            v-model:username="form.username"
            v-model:password="form.password"
            v-model:remember="form.remember"
            :errors="errors"
            :is-submitting="isSubmitting"
            :is-password-visible="isPasswordVisible"
            @submit="submitPassword"
            @toggle-password-visibility="togglePasswordVisibility"
            @forgot-password="handleForgotPassword"
            @clear-error="clearError"
          />

          <section class="rounded-lg border border-border bg-muted/30">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :aria-expanded="demoAccountsOpen"
              aria-controls="demo-module-accounts"
              @click="demoAccountsOpen = !demoAccountsOpen"
            >
              <span>Demo hisoblar <span class="ml-1 text-xs font-normal text-muted-foreground">{{ demoLoginAccounts.length }} ta</span></span>
              <span aria-hidden="true">{{ demoAccountsOpen ? '−' : '+' }}</span>
            </button>
            <div v-if="demoAccountsOpen" id="demo-module-accounts" class="border-t border-border">
              <p class="px-4 py-3 text-xs leading-5 text-muted-foreground">Har bir hisob faqat o‘z modulini ochadi. Login va parolni formaga qo‘yib, Kirish tugmasini bosing. Bular frontend demo hisoblaridir.</p>
              <ul class="max-h-80 divide-y divide-border overflow-y-auto border-t border-border">
                <li v-for="account in demoLoginAccounts" :key="account.id" class="space-y-2 px-4 py-3">
                  <p class="text-sm font-medium">{{ account.title }}</p>
                  <div class="flex flex-wrap items-end justify-between gap-2">
                    <dl class="min-w-0 space-y-1 text-xs">
                      <div><dt class="mr-1 inline text-muted-foreground">Login:</dt><dd class="inline break-all font-mono">{{ account.username }}</dd></div>
                      <div><dt class="mr-1 inline text-muted-foreground">Parol:</dt><dd class="inline break-all font-mono">{{ account.password }}</dd></div>
                    </dl>
                    <Button type="button" variant="outline" class="h-8 shrink-0 px-3 text-xs" :disabled="isSubmitting" :aria-label="`${account.title} hisobini formaga qo‘yish`" @click="chooseDemoAccount(account)">To‘ldirish</Button>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <p v-if="selectedDemoTitle" class="!mt-2 text-xs leading-5 text-muted-foreground" role="status">{{ selectedDemoTitle }} hisobi formaga qo‘yildi. Kirish tugmasini bosing.</p>

          <div class="flex items-center gap-3 text-xs text-muted-foreground">
            <div class="h-px flex-1 bg-border" />
            <span>yoki boshqa usul bilan</span>
            <div class="h-px flex-1 bg-border" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              class="h-12 justify-center rounded-md px-3 transition-colors duration-150 ease-out"
              :class="selectedMethod === 'oneid' ? 'border-[#4b2bc8]/35 bg-[#f5f1ff]' : ''"
              :disabled="isSubmitting"
              @click="submitProviderLogin('oneid')"
            >
              <span class="flex h-8 w-16 items-center justify-center rounded-md bg-[#4b2bc8]">
                <img
                  :src="oneIdIcon"
                  alt="OneID"
                  class="h-5 w-5 object-contain brightness-0 invert"
                >
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              class="h-12 justify-center rounded-md px-3 transition-colors duration-150 ease-out"
              :class="selectedMethod === 'eimzo' ? 'border-[#d9c77e]/55 bg-[#fffbec]' : ''"
              :disabled="isSubmitting"
              @click="submitProviderLogin('eimzo')"
            >
              <span class="flex h-8 w-16 items-center justify-center rounded-md bg-[#f6f7ef] ring-1 ring-border/70">
                <img
                  :src="eImzoLogo"
                  alt="E-IMZO"
                  class="h-[1.375rem] w-auto object-contain"
                >
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
