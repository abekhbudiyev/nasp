<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { ArrowRight, ClipboardList, GitBranch, Users } from 'lucide-vue-next'
import { data } from './data'

defineEmits<{execution: []; passport: []}>()
</script>

<template>
  <section class="platform-about">
    <div class="np-card about-summary">
      <h2>{{ benefitText("Davlat ko‘magini hisobga olish va kuzatish") }}</h2>
      <p>{{ benefitText("Platforma idoralar bo‘yicha moliyalashtirish, xizmat va imtiyozlarni tahlil qiladi. Fuqaro o‘ziga va oila a’zolariga ko‘rsatilgan ko‘makni oila pasportida ko‘radi.") }}</p>
      <span class="np-tag amber">{{ benefitText("Namoyish muhiti") }}</span>
    </div>

    <section class="np-card">
      <div class="np-card-heading"><h3>{{ benefitText("Arizadan oila pasportigacha") }}</h3><GitBranch :size="18" /></div>
      <ol class="about-steps">
        <li v-for="([title, description], index) in data.about.steps" :key="title">
          <span>{{ benefitText(index + 1) }}</span>
          <div><h4>{{ benefitText(title) }}</h4><p>{{ benefitText(description) }}</p></div>
        </li>
      </ol>
      <div class="heading-actions">
        <button class="np-button primary" @click="$emit('execution')">{{ benefitText("Ijro oqimini ko‘rish ") }}<ArrowRight :size="15" /></button>
        <button class="np-button" @click="$emit('passport')"><Users :size="15" />{{ benefitText(" Oila pasportini ochish") }}</button>
      </div>
    </section>

    <section class="np-card">
      <div class="np-card-heading"><h3>{{ benefitText("Ma’lumotlarning qamrovi") }}</h3><ClipboardList :size="18" /></div>
      <div v-for="[label, status, kind] in data.about.evidence" :key="label" class="about-evidence">
        <span>{{ benefitText(label) }}</span>
        <span :class="['np-tag', kind === 'real' ? 'green' : kind === 'demo' ? 'amber' : 'purple']">{{ benefitText(status) }}</span>
      </div>
    </section>

    <details class="np-card platform-disclosure">
      <summary>{{ benefitText("Platformani joriy etish uchun qarorlar") }}</summary>
      <ul class="about-decisions"><li v-for="decision in data.about.decisions" :key="decision">{{ benefitText(decision) }}</li></ul>
    </details>
  </section>
</template>

<style scoped>
.platform-about { display: grid; gap: 20px; }
.about-summary { background: linear-gradient(125deg, color-mix(in srgb, var(--primary) 12%, var(--card)), var(--card)); }
.about-summary h2 { font-size: clamp(1.25rem, 2vw, 1.65rem); font-weight: 750; }
.about-summary p { max-width: 82ch; margin-block: 10px 14px; }
.about-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(230px, 100%), 1fr)); gap: 12px; margin-block: 18px; }
.about-steps li { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border-radius: 16px; background: var(--muted); }
.about-steps li > span { display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: var(--primary-foreground); font-size: 12px; }
.about-steps h4 { font-weight: 650; }
.about-evidence { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px 16px; padding-block: 12px; border-bottom: 1px solid var(--border); font-size: 13px; }
.about-evidence:last-child { border: 0; }
.about-decisions { list-style: disc; padding-inline-start: 20px; margin-top: 12px; font-size: 13px; line-height: 1.9; }
</style>
