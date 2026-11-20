<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDownRight, ArrowUpRight, BarChart3, Building2, ClipboardList, Layers3 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import AnimatedNumber from './AnimatedNumber.vue'
import { referralLabels } from './model'
import type { ReferralStatus } from './model'
import type { PortfolioRow } from './portfolio'

const props = defineProps<{
  services: PortfolioRow[]
  from: string
  to: string
  hasComparison: boolean
  location: (path: string, filters?: Record<string, string>) => RouteLocationRaw
}>()

const selectedId = ref('')
const selected = computed(() => props.services.find(item => item.id === selectedId.value) ?? props.services[0])
const maxVisits = computed(() => Math.max(1, ...props.services.map(item => item.visits)))
const palette = ['#2563eb', '#0f9b85', '#8b5cf6', '#d98613', '#db517b', '#298ba8']
const stages: { key: ReferralStatus; tone: string }[] = [
  { key: 'new', tone: 'blue' }, { key: 'queued', tone: 'amber' }, { key: 'referred', tone: 'purple' },
  { key: 'active', tone: 'green' }, { key: 'closed', tone: 'slate' }, { key: 'rejected', tone: 'rose' },
]
const scope = computed(() => ({ service: selected.value?.id ?? '' }))
const number = new Intl.NumberFormat('uz-UZ')
const dateLabel = (date: string) => date ? date.split('-').reverse().join('.') : '—'
</script>

<template>
  <section class="portfolio" aria-labelledby="portfolio-title">
    <header class="portfolio-heading">
      <span class="portfolio-icon"><BarChart3 :size="20" aria-hidden="true" /></span>
      <div>
        <h2 id="portfolio-title">Xizmatlar tahlili</h2>
        <p>{{ dateLabel(from) }} – {{ dateLabel(to) }} · Tashriflar soni bo‘yicha</p>
      </div>
    </header>

    <div v-if="selected" class="portfolio-grid">
      <div class="portfolio-rows" role="group" aria-label="Xizmat tanlash">
        <button v-for="(item, index) in services" :key="item.id" type="button" class="portfolio-row"
          :aria-pressed="item.id === selected.id" aria-controls="portfolio-detail"
          :style="{ '--row-tone': palette[index % palette.length] }" @click="selectedId = item.id">
          <span class="portfolio-row-top"><strong>{{ item.title }}</strong><span><AnimatedNumber :value="item.visits" /> ta</span></span>
          <span class="portfolio-track" aria-hidden="true"><span :style="{ width: `${item.visits / maxVisits * 100}%` }"></span></span>
        </button>
      </div>
      <div id="portfolio-detail" class="portfolio-detail">
        <h3>{{ selected.title }}</h3>
        <p><Building2 :size="15" /> {{ selected.centers }} ta markaz · {{ selected.activePlaces }} ta faol xizmat joyi</p>
        <div class="portfolio-numbers">
          <div><span>Xizmat oluvchilar</span><strong><AnimatedNumber :value="selected.visitors" /></strong></div>
          <div><span>Vaucherli</span><strong><AnimatedNumber :value="selected.voucher" /></strong></div>
          <div><span>Pullik</span><strong><AnimatedNumber :value="selected.paid" /></strong></div>
        </div>
        <p v-if="selected.unknown">{{ selected.unknown }} ta tashrifda to‘lov turi aniqlanmagan.</p>
        <p v-if="hasComparison" class="portfolio-comparison" :data-direction="selected.visits >= selected.previousVisits ? 'up' : 'down'">
          <ArrowUpRight v-if="selected.visits > selected.previousVisits" :size="16" />
          <ArrowDownRight v-else-if="selected.visits < selected.previousVisits" :size="16" />
          Oldingi teng davrda {{ number.format(selected.previousVisits) }} ta tashrif
          <strong v-if="selected.visits !== selected.previousVisits">{{ selected.visits > selected.previousVisits ? '+' : '' }}{{ selected.visits - selected.previousVisits }} ta</strong>
        </p>
        <div class="portfolio-stages">
          <h4>Murojaatlarning joriy holati</h4>
          <dl><div v-for="stage in stages" :key="stage.key" :data-tone="stage.tone"><dt>{{ referralLabels[stage.key] }}</dt><dd><AnimatedNumber :value="selected.stages[stage.key]" /></dd></div></dl>
        </div>
        <footer>
          <RouterLink :to="location('/visits', { ...scope, from, to })"><ClipboardList :size="16" /> Tashriflar</RouterLink>
          <RouterLink :to="location('/capacity', { ...scope, view: 'usage' })"><Layers3 :size="16" /> Kvota va signallar<span v-if="selected.signalCount">{{ selected.signalCount }}</span></RouterLink>
          <RouterLink :to="location('/centers', scope)"><ArrowUpRight :size="16" /> Xizmat joylari</RouterLink>
        </footer>
      </div>
    </div>
    <p v-else class="portfolio-empty">Tanlangan filtrlar bo‘yicha xizmat joylari topilmadi.</p>
  </section>
</template>

<style scoped src="./portfolio.css"></style>
