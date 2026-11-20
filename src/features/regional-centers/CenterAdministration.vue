<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { Building2, DoorOpen, History, Layers3, Plus, SquarePen, UsersRound } from 'lucide-vue-next'
import RegistryList from './RegistryList.vue'
import { useRegistryList } from './registry'
import type { RegistryScope } from './registry'
import { isOperational, services, setupStatusLabels } from './model'
import type { Center, CenterState, Placement } from './model'
import type { Editor } from './actions'

const props = defineProps<{
  centers: Center[]; state: CenterState; editable: boolean; today: string
  serviceId: string; placementId: string
  scopeFilters: RegistryScope
  location: (path: string, filters?: Record<string, string>) => RouteLocationRaw
}>()
const emit = defineEmits<{ edit: [kind: Editor, id: string]; addService: [roomId: string] }>()
const selected = ref('')
const mobileDetail = ref(!!props.placementId || props.centers.length === 1)
const tab = ref('rooms')
const tabs = [
  { id: 'rooms', title: 'Xonalar va xizmatlar', icon: DoorOpen },
  { id: 'staff', title: 'Xodimlar', icon: UsersRound },
  { id: 'history', title: 'O‘zgarishlar tarixi', icon: History },
]
const scoped = computed(() => !!(props.serviceId || props.placementId))
const roomServices = computed(() => {
  const byRoom = new Map<string, Placement[]>()
  for (const item of props.state.placements) {
    if ((props.serviceId && item.serviceId !== props.serviceId) || (props.placementId && item.id !== props.placementId)) continue
    const list = byRoom.get(item.roomId) ?? []
    list.push(item)
    byRoom.set(item.roomId, list)
  }
  return byRoom
})
const matchingCenters = computed(() => {
  if (!scoped.value) return props.centers
  const ids = new Set(props.state.rooms.filter(room => roomServices.value.has(room.id)).map(room => room.centerId))
  return props.centers.filter(center => ids.has(center.id))
})
const centerList = useRegistryList(() => matchingCenters.value, item => ({
  status: item.status, search: [item.name, item.code, item.district, item.region, item.address].join(' '),
}), () => JSON.stringify([props.serviceId, props.placementId, ...props.centers.map(item => item.id)]))
const center = computed(() => centerList.result.items.find(item => item.id === selected.value) ?? centerList.result.items[0])
watch(() => props.placementId, id => { if (id) mobileDetail.value = true })
watch(center, value => { if (!value) mobileDetail.value = false })

function selectCenter(id: string) {
  selected.value = id
  mobileDetail.value = true
}
const staff = computed(() => props.state.staff.filter(item => item.centerId === center.value?.id))
const rooms = computed(() => props.state.rooms.filter(room => room.centerId === center.value?.id && (!scoped.value || roomServices.value.has(room.id))))
const history = computed(() => (props.state.setupHistory ?? []).filter(item => item.centerId === center.value?.id).slice().reverse())
const branches = computed(() => rooms.value.flatMap(room => roomServices.value.get(room.id) ?? []))
const activeCount = computed(() => branches.value.filter(item => isOperational(props.state, item, props.today)).length)
const serviceById = new Map<string, typeof services[number]>(services.map(item => [item.id, item]))
const timestamp = new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Tashkent' })
const areaNumber = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 2 })
const selectedCenterScope = () => center.value?.id ?? ''
const roomList = useRegistryList(() => rooms.value, item => ({
  status: item.status ?? 'active', search: [item.name, item.code, item.floor, item.equipment].join(' '),
}), () => JSON.stringify([selectedCenterScope(), props.serviceId, props.placementId]))
const staffList = useRegistryList(() => staff.value, item => ({
  status: item.active ? 'active' : 'inactive', search: [item.name, item.position, item.qualification].join(' '),
}), selectedCenterScope)
const historyList = useRegistryList(() => history.value, item => ({
  date: item.at, search: [item.actor, item.entity, item.label, ...item.changes.map(change => change.label)].join(' '),
}), selectedCenterScope, { sort: 'newest' })
watch([() => center.value?.id, () => props.placementId, () => props.serviceId], () => { tab.value = 'rooms' })
watch(selectedCenterScope, () => {
  roomList.reset()
  staffList.reset()
  historyList.reset()
})

function serviceDocuments(path: string, item: Placement, centerId: string) {
  return props.location(path, { center: centerId, service: item.serviceId, placement: item.id })
}

function providerLabel(item: Placement) {
  if (item.operator === 'center') return 'Hududiy markaz'
  return props.state.providers.find(provider => provider.id === item.providerId)?.name ?? 'Ko‘rsatuvchi tanlanmagan'
}
</script>

<template>
  <div class="admin-layout" :class="{ 'admin-show-detail': mobileDetail && center }">
    <aside class="admin-list" aria-label="Markazlar reyestri">
      <h2>Markazlar reyestri</h2>
      <button v-if="editable" type="button" class="admin-button primary add-center" @click="emit('edit', 'center', '')"><Plus :size="16" aria-hidden="true" /> Markaz qo‘shish</button>
      <RegistryList :list="centerList" label="Markazlar" search="Nom, kod yoki manzil" :statuses="setupStatusLabels" :scope-filters="scopeFilters" fill compact filter-align="start">
        <div class="admin-center-list">
          <button v-for="item in centerList.result.items" :key="item.id" type="button" :aria-pressed="center?.id === item.id" @click="selectCenter(item.id)">
            <Building2 :size="18" aria-hidden="true" />
            <span><strong>{{ item.name }}</strong><small>{{ item.code || item.district || item.region }} · {{ setupStatusLabels[item.status] }}</small></span>
          </button>
        </div>
        <p v-if="!centerList.result.totalCount" class="admin-empty">Qidiruvga mos markaz topilmadi.</p>
      </RegistryList>
    </aside>

    <section v-if="center" class="admin-detail" aria-labelledby="admin-center-title">
      <button type="button" class="admin-button back-to-centers" @click="mobileDetail = false">Markazlar ro‘yxatiga qaytish</button>
      <header class="admin-cover">
        <div>
          <div class="admin-cover-title">
            <h2 id="admin-center-title">{{ center.name }}</h2>
            <span class="admin-status" :data-status="center.status">{{ setupStatusLabels[center.status] }}</span>
          </div>
          <p>{{ [...new Set([center.region, center.district, center.address].filter(Boolean))].join(' · ') }}</p>
        </div>
        <button v-if="editable" type="button" class="admin-button admin-edit-passport" aria-label="Pasportni tahrirlash" @click="emit('edit', 'center', center.id)">
          <SquarePen :size="15" aria-hidden="true" /><span>Pasportni tahrirlash</span>
        </button>
      </header>
      <details class="admin-passport">
        <summary>Markaz pasporti</summary>
        <dl class="admin-facts">
          <div><dt>Markaz kodi</dt><dd>{{ center.code || '—' }}</dd></div>
          <div><dt>Mas’ul</dt><dd>{{ center.director }}</dd></div>
          <div><dt>Telefon</dt><dd>{{ center.phone || '—' }}</dd></div>
          <div><dt>Ish vaqti</dt><dd>{{ center.hours || '—' }}</dd></div>
          <div><dt>Tashkil etish hujjati</dt><dd>{{ center.document || '—' }}</dd></div>
          <div><dt>Xona / faol xizmat joylari</dt><dd>{{ rooms.length }} / {{ activeCount }}</dd></div>
        </dl>
      </details>
      <div class="admin-tabs" role="group" aria-label="Markaz kartasi bo‘limlari">
        <button v-for="item in tabs" :key="item.id" type="button" :aria-pressed="tab === item.id" @click="tab = item.id">
          <component :is="item.icon" :size="16" aria-hidden="true" /> {{ item.title }}
        </button>
      </div>

      <div v-if="tab === 'rooms'" class="admin-body">
        <div class="admin-block-head"><h3>Xonalar reyestri</h3><button v-if="editable" class="admin-button primary" type="button" @click="emit('edit', 'room', center.id)"><Plus :size="16" /> Xona qo‘shish</button></div>
        <RegistryList :list="roomList" label="Xonalar" search="Xona nomi, raqami yoki jihozlar" :statuses="setupStatusLabels" fill compact filter-align="start">
          <div class="admin-list-items">
            <p v-if="!roomList.result.totalCount" class="admin-empty">Filtrga mos xona topilmadi.</p>
            <details v-for="(room, index) in roomList.result.items" :key="room.id" class="admin-room" :open="scoped || index === 0 || undefined">
              <summary><span>{{ room.name }}<small v-if="room.code"> · {{ room.code }}</small></span><small>{{ roomServices.get(room.id)?.length ?? 0 }} ta xizmat · {{ setupStatusLabels[room.status ?? 'active'] }}</small></summary>
              <div class="admin-room-body">
                <dl class="admin-facts compact">
                  <div><dt>Qavat / maydon</dt><dd>{{ room.floor || '—' }} / {{ room.area ? areaNumber.format(room.area) + ' m²' : '—' }}</dd></div>
                  <div><dt>To‘siqsiz kirish</dt><dd>{{ room.accessible ? 'Mavjud' : 'Moslashtirish kerak' }}</dd></div>
                  <div><dt>Jihozlar</dt><dd>{{ room.equipment || '—' }}</dd></div>
                  <div v-if="room.notes"><dt>Izoh</dt><dd>{{ room.notes }}</dd></div>
                </dl>
                <div v-if="editable" class="admin-actions">
                  <button type="button" class="admin-button" @click="emit('edit', 'room', room.id)"><SquarePen :size="14" /> Xonani tahrirlash</button>
                  <button type="button" class="admin-button primary" @click="emit('addService', room.id)"><Plus :size="15" /> Xizmat biriktirish</button>
                </div>
                <div v-for="item in roomServices.get(room.id)" :key="item.id" class="admin-binding">
                  <Layers3 :size="18" aria-hidden="true" />
                  <div>
                    <strong>{{ serviceById.get(item.serviceId)?.title }}</strong>
                    <small>{{ item.schedule }} · {{ item.capacity }} o‘rin</small>
                    <small>Ko‘rsatuvchi · {{ providerLabel(item) }}</small>
                    <small>Mas’ul · {{ staff.find(row => row.id === item.staffId)?.name || 'Belgilanmagan' }}</small>
                    <small>{{ serviceById.get(item.serviceId)?.source }} · {{ item.sourceRef || 'Tashqi ID kiritilmagan' }}</small>
                    <div class="admin-document-links">
                      <RouterLink :to="serviceDocuments('/capacity', item, center.id)">Quvvat pasportlari</RouterLink>
                      <RouterLink v-if="item.operator === 'partner'" :to="serviceDocuments('/providers', item, center.id)">Ko‘rsatuvchi va ijara</RouterLink>
                    </div>
                  </div>
                  <div class="admin-binding-actions">
                    <span class="admin-status" :data-status="isOperational(state, item, today) ? 'active' : 'planned'">{{ isOperational(state, item, today) ? 'Faol' : (item.status && item.status !== 'active' ? setupStatusLabels[item.status] : 'Faol emas') }}</span>
                    <button v-if="editable" class="admin-button" type="button" @click="emit('edit', 'placement', item.id)">Xizmatni tahrirlash</button>
                  </div>
                </div>
                <p v-if="!roomServices.get(room.id)?.length" class="admin-empty">Xizmat biriktirilmagan.</p>
              </div>
            </details>
          </div>
        </RegistryList>
      </div>

      <div v-else-if="tab === 'staff'" class="admin-body">
        <div class="admin-block-head"><h3>Xodimlar va malaka</h3><button v-if="editable" class="admin-button primary" type="button" @click="emit('edit', 'staff', center.id)"><Plus :size="16" /> Xodim qo‘shish</button></div>
        <RegistryList :list="staffList" label="Xodimlar" search="Ism, lavozim yoki hujjat" :statuses="{ active: 'Faol', inactive: 'Faol emas' }" fill compact filter-align="start">
          <div class="admin-list-items">
            <div v-for="item in staffList.result.items" :key="item.id" class="admin-binding">
              <UsersRound :size="18" aria-hidden="true" />
              <div><strong>{{ item.name }}</strong><small>{{ item.position }} · {{ item.qualification || 'Malaka hujjati kiritilmagan' }}</small><small v-if="item.validUntil">Amal qilish muddati · {{ item.validUntil }}{{ item.validUntil < today ? ' · Muddati o‘tgan' : '' }}</small></div>
              <div class="admin-binding-actions"><span class="admin-status" :data-status="item.active ? 'active' : 'paused'">{{ item.active ? 'Faol' : 'Faol emas' }}</span><button v-if="editable" class="admin-button" type="button" @click="emit('edit', 'staff', item.id)">Xodimni tahrirlash</button></div>
            </div>
            <p v-if="!staffList.result.totalCount" class="admin-empty">Filtrga mos xodim topilmadi.</p>
          </div>
        </RegistryList>
      </div>

      <div v-else class="admin-body">
        <div class="admin-block-head"><h3>O‘zgarishlar tarixi</h3></div>
        <RegistryList :list="historyList" label="O‘zgarishlar" search="Nomi, mas’ul yoki maydon" date-sort fill compact filter-align="start">
          <div class="admin-list-items">
            <details v-for="item in historyList.result.items" :key="item.id" class="admin-room">
              <summary><span>{{ item.entity }} · {{ item.label }}</span><small>{{ timestamp.format(new Date(item.at)) }} · {{ item.actor }}</small></summary>
              <dl class="admin-history"><div v-for="change in item.changes" :key="change.label"><dt>{{ change.label }}</dt><dd><span>{{ change.from || '—' }}</span><span aria-hidden="true">→</span><strong>{{ change.to || '—' }}</strong></dd></div></dl>
            </details>
            <p v-if="!historyList.result.totalCount" class="admin-empty">Filtrga mos o‘zgarish topilmadi.</p>
          </div>
        </RegistryList>
      </div>
    </section>
  </div>
</template>

<style scoped src="./administration.css"></style>
