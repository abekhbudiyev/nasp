<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ArrowUpRight, UserRound, X } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import type { PersonProfile } from './model'

const props = defineProps<{
  code: string
  person?: PersonProfile
  residenceFromReferral?: string
  today: string
  records: { title: string; count: number; to: RouteLocationRaw }[]
}>()
defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
const unknown = 'Ma’lumot kelmagan'
const age = computed(() => {
  const birth = props.person?.birthDate
  if (!birth || birth > props.today) return undefined
  const years = Number(props.today.slice(0, 4)) - Number(birth.slice(0, 4))
  return Number.isInteger(years) ? years - Number(props.today.slice(5) < birth.slice(5)) : undefined
})
const dateLabel = (value: string) => value.split('-').reverse().join('.')
const count = new Intl.NumberFormat('uz-UZ')

onMounted(() => dialog.value?.showModal())
</script>

<template>
  <dialog ref="dialog" class="person-card" aria-labelledby="hixm-person-title" @close="$emit('close')">
    <header class="person-header">
      <div class="person-avatar"><UserRound :size="23" aria-hidden="true" /></div>
      <div>
        <p>Shaxs kartasi · Demo</p>
        <h2 id="hixm-person-title">{{ person?.fullName || code }}</h2>
        <small v-if="person?.fullName">{{ code }}</small>
      </div>
      <button type="button" class="person-close" aria-label="Shaxs kartasini yopish" @click="dialog?.close()"><X :size="18" aria-hidden="true" /></button>
    </header>
    <div class="person-body">
      <p v-if="!person?.fullName" class="person-muted">F.I.Sh. bo‘yicha ma’lumot kelmagan.</p>
      <dl class="person-facts">
        <div>
          <dt>Tug‘ilgan sana</dt>
          <dd>{{ person?.birthDate ? dateLabel(person.birthDate) : unknown }}<small v-if="age !== undefined">{{ age }} yosh</small></dd>
        </div>
        <div>
          <dt>Yashash hududi</dt>
          <dd>{{ person?.residence || residenceFromReferral || unknown }}<small v-if="!person?.residence && residenceFromReferral">Yo‘llanmadan</small></dd>
        </div>
        <div><dt>JSHSHIR</dt><dd>{{ person?.identifierMasked || unknown }}</dd></div>
        <div><dt>Telefon</dt><dd>{{ person?.phoneMasked || unknown }}</dd></div>
      </dl>
      <section v-if="person?.representative" class="person-representative">
        <h3>Qonuniy vakil</h3>
        <strong>{{ person.representative.fullName }}</strong>
        <p>{{ person.representative.relationship }}<template v-if="person.representative.phoneMasked"> · {{ person.representative.phoneMasked }}</template></p>
      </section>
      <nav v-if="records.length" class="person-records" aria-label="Shaxsga tegishli yozuvlar">
        <RouterLink v-for="record in records" :key="record.title" :to="record.to" @click="dialog?.close()">
          <span>{{ record.title }} <strong>{{ count.format(record.count) }}</strong></span><ArrowUpRight :size="16" aria-hidden="true" />
        </RouterLink>
      </nav>
    </div>
  </dialog>
</template>

<style scoped>
.person-card { position: fixed; inset: 0; margin: auto; max-height: calc(100dvh - 24px); width: min(530px, calc(100% - 24px)); padding: 0; overflow: auto; border: 1px solid var(--border); border-radius: 14px; background: var(--card); color: var(--foreground); box-shadow: 0 16px 50px #07182545; }
.person-card::backdrop { background: #0d182881; }
.person-header { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: start; gap: 11px; padding: 14px 16px; border-bottom: 1px solid var(--border); }
.person-header p, .person-header small, .person-muted { color: var(--muted-foreground); font-size: 12px; }
.person-header h2 { margin: 2px 0; font-size: 19px; font-weight: 720; overflow-wrap: anywhere; }
.person-avatar { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 9px; background: color-mix(in srgb, var(--primary) 12%, var(--card)); color: var(--primary); }
.person-close { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 7px; cursor: pointer; }
.person-body { display: grid; gap: 12px; padding: 14px 16px; }
.person-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 14px; margin: 0; }
.person-facts dt { font-size: 11px; color: var(--muted-foreground); }
.person-facts dd { margin: 3px 0 0; font-size: 13px; font-weight: 620; overflow-wrap: anywhere; }
.person-facts small { display: block; margin-top: 2px; font-size: 11px; color: var(--muted-foreground); font-weight: 400; }
.person-representative { padding: 9px 10px; border-radius: 8px; background: color-mix(in srgb, #467fba 9%, var(--card)); }
.person-representative h3 { font-size: 12px; font-weight: 700; }
.person-representative strong { font-size: 13px; }
.person-representative p { color: var(--muted-foreground); font-size: 12px; }
.person-records { display: grid; gap: 5px; }
.person-records a { display: flex; align-items: center; justify-content: space-between; gap: 5px; padding: 7px 9px; border: 1px solid var(--border); border-radius: 7px; color: var(--primary); font-size: 12px; }
.person-records a strong { margin-inline-start: 4px; color: var(--foreground); }
.person-records a:hover, .person-close:hover { background: var(--muted); }
.person-card :is(a, button):focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
</style>
