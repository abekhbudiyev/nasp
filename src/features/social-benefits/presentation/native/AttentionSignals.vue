<script setup lang="ts">
import { ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { data, auditTitles, num } from './data'
const emit = defineEmits<{ audit: [index: number]; all: [] }>()
</script>
<template>
<section class="np-card attention-block" aria-labelledby="attention-heading"><div class="np-card-heading"><div><h3 id="attention-heading">{{ benefitText("E’tibor talab qiladigan holatlar") }}</h3><p>{{ benefitText("Nafaqa bazasidagi nazorat signallari") }}</p></div><ShieldCheck :size="18"/></div><button v-for="(item,i) in data.audit.slice(0,4)" :key="item.k" class="signal-link" @click="emit('audit', i)"><span class="signal-dot" :class="i<2?'red':'amber'"><AlertTriangle :size="16"/></span><span><b>{{ benefitText(auditTitles[i]) }}</b><small>{{ benefitText(i<2?'Ortiqcha to‘lov signali':'Asosini tekshirish kerak') }}</small></span><strong>{{ num(item.n) }}</strong><ChevronRight :size="15"/></button><div class="positive-note"><CheckCircle2 :size="17"/><p>{{ benefitText("Bir oylik to‘lovning ikki oluvchiga bo‘linishi alohida kuzatiladi. Bu avtomatik ortiqcha to‘lov hisoblanmaydi.") }}</p></div><button class="card-link" @click="emit('all')">{{ benefitText("Barcha 6 signal turini ko‘rish ") }}<ArrowRight :size="14"/></button></section>
</template>
<style scoped>
.attention-block { width: 100%; margin-top: 20px; border-top: 3px solid var(--np-amber, #d99a37); }
</style>
