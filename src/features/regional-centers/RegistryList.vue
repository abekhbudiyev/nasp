<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, X } from 'lucide-vue-next'
import RegistryFilterMenu from './RegistryFilterMenu.vue'
import RegistryScopeFields from './RegistryScopeFields.vue'
import { pageSizes } from './registry'
import type { RegistryControls, RegistryScope, RegistrySort } from './registry'

const props = defineProps<{
  list: RegistryControls
  label: string
  search?: string
  statuses?: Record<string, string>
  dateSort?: boolean
  compact?: boolean
  fill?: boolean
  scopeFilters?: RegistryScope
  filterAlign?: 'start' | 'end'
}>()
const searchId = useId()
const area = ref<HTMLElement>()
const pageInput = ref<number | string>(props.list.result.page)
watch(() => props.list.result.page, page => { pageInput.value = page })
watch(() => [props.list.result.page, props.list.query.search, props.list.query.status, props.list.query.sort, props.list.result.pageSize], () => {
  if (area.value) area.value.scrollTop = 0
}, { flush: 'post' })
const number = new Intl.NumberFormat('uz-UZ')

function jump() {
  const { totalPages, page } = props.list.result
  const requested = Math.trunc(Number(pageInput.value)) || page
  const next = Math.max(1, Math.min(totalPages, requested))
  pageInput.value = next
  props.list.update({ page: next })
}
</script>

<template>
  <div class="registry-list" :class="{ 'registry-compact': compact, 'registry-fill': fill }">
    <div v-if="statuses" class="registry-statuses" role="group" :aria-label="label + ' holat filtrlari'">
      <button type="button" :aria-pressed="!list.query.status" @click="list.update({ status: '' })"><span>Barchasi</span><strong>{{ number.format(list.result.matchingCount) }}</strong></button>
      <button v-for="(title, status) in statuses" :key="status" type="button" :data-status="status" :aria-pressed="list.query.status === status"
        @click="list.update({ status })"><span>{{ title }}</span><strong>{{ number.format(list.result.statusCounts[status] ?? 0) }}</strong></button>
    </div>
    <div class="registry-table">
      <div v-if="search || dateSort || $slots.tools || scopeFilters || $slots.toolbar" class="registry-toolbar">
        <slot name="toolbar" />
        <RegistryFilterMenu v-if="search || dateSort || $slots.tools || scopeFilters" :label="label + ' filtrlari'"
          :align="filterAlign" :active="(scopeFilters?.active ?? 0) + Number(!!list.query.search.trim())">
          <div class="registry-tools">
            <div v-if="search" class="registry-search">
              <label :for="searchId"><Search :size="15" aria-hidden="true" /><span class="sr-only">{{ label }} bo‘yicha qidirish</span></label>
              <input :id="searchId" type="search" :value="list.query.search" :placeholder="search"
                @input="list.update({ search: ($event.target as HTMLInputElement).value })">
              <button v-if="list.query.search" type="button" aria-label="Qidiruvni tozalash" @click="list.update({ search: '' })"><X :size="15" aria-hidden="true" /></button>
            </div>
            <RegistryScopeFields v-if="scopeFilters" :scope="scopeFilters" />
            <slot name="tools" />
            <label v-if="dateSort" class="registry-sort">Tartib
              <select :value="list.query.sort" :aria-label="label + ' tartiblash'" @change="list.update({ sort: ($event.target as HTMLSelectElement).value as RegistrySort })">
                <option value="default">Dastlabki</option>
                <option value="newest">Yangilari avval</option>
                <option value="oldest">Eskilari avval</option>
              </select>
            </label>
          </div>
        </RegistryFilterMenu>
      </div>
      <div ref="area" class="registry-body" tabindex="0" role="region" :aria-label="label + ' ro‘yxati'">
        <slot />
      </div>
      <footer class="registry-footer">
        <span class="registry-count" aria-live="polite">
          <template v-if="list.result.totalCount">
            {{ number.format((list.result.page - 1) * list.result.pageSize + 1) }}–{{ number.format(Math.min(list.result.page * list.result.pageSize, list.result.totalCount)) }} / {{ number.format(list.result.totalCount) }} ta yozuv
          </template>
          <template v-else>0 ta yozuv</template>
        </span>
        <label v-if="list.result.totalCount > pageSizes[0] || list.result.pageSize > pageSizes[0]" class="registry-size">Sahifada
          <select :value="list.result.pageSize" :aria-label="label + ' sahifa hajmi'" @change="list.update({ pageSize: Number(($event.target as HTMLSelectElement).value) })">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </label>
        <nav v-if="list.result.totalPages > 1" class="registry-pages" :aria-label="label + ' sahifalari'">
          <button type="button" aria-label="Birinchi sahifa" :disabled="list.result.page === 1" @click="list.update({ page: 1 })"><ChevronsLeft :size="16" aria-hidden="true" /></button>
          <button type="button" aria-label="Oldingi sahifa" :disabled="list.result.page === 1" @click="list.update({ page: list.result.page - 1 })"><ChevronLeft :size="16" aria-hidden="true" /></button>
          <form class="registry-jump" @submit.prevent="jump">
            <input v-model="pageInput" type="number" min="1" :max="list.result.totalPages" aria-label="Sahifa raqami" @blur="jump">
            <span>/ {{ number.format(list.result.totalPages) }}</span>
          </form>
          <button type="button" aria-label="Keyingi sahifa" :disabled="list.result.page === list.result.totalPages" @click="list.update({ page: list.result.page + 1 })"><ChevronRight :size="16" aria-hidden="true" /></button>
          <button type="button" aria-label="Oxirgi sahifa" :disabled="list.result.page === list.result.totalPages" @click="list.update({ page: list.result.totalPages })"><ChevronsRight :size="16" aria-hidden="true" /></button>
        </nav>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.registry-list { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.registry-fill { flex: 1; min-height: 0; }
.registry-table { display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--border); border-radius: 10px; background: var(--card); }
.registry-fill .registry-table { flex: 1; min-height: 0; }
.registry-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 10px; flex: none; padding: 6px 10px; border-bottom: 1px solid var(--border); }
.registry-toolbar :deep(.registry-filter-menu[data-align="end"]) { margin-inline-start: auto; }
.registry-tools { display: grid; gap: 8px; }
.registry-statuses { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(92px, 100%), 1fr)); align-items: stretch; flex: none; min-width: 0; gap: 6px; }
.registry-search { display: flex; align-items: center; gap: 6px; padding: 0 8px; border: 1px solid var(--border); border-radius: 8px; color: var(--muted-foreground); background: var(--card); }
.registry-search label { position: relative; display: flex; }
.registry-search input { width: 100%; min-width: 0; height: 32px; border: 0; background: transparent; color: var(--foreground); font-size: 12px; }
.registry-search input::-webkit-search-cancel-button { display: none; }
.registry-search button { display: grid; place-items: center; min-width: 24px; height: 24px; border-radius: 6px; cursor: pointer; }
.registry-sort, .registry-size { display: flex; align-items: center; gap: 6px; }
.registry-sort, .registry-size, .registry-count, .registry-jump { font-size: 12px; color: var(--muted-foreground); }
.registry-sort select, .registry-size select, .registry-jump input { padding: 4px 6px; border: 1px solid var(--border); border-radius: 6px; color: var(--foreground); background: var(--card); }
.registry-statuses button { --tone: var(--primary); display: grid; grid-template-rows: auto 1fr; align-items: start; gap: 2px; border: 1px solid color-mix(in srgb, var(--tone) 22%, var(--border)); border-radius: 8px; padding: 6px 8px; text-align: start; color: var(--foreground); font-size: 11px; background: color-mix(in srgb, var(--tone) 5%, var(--card)); cursor: pointer; }
.registry-statuses button[data-status="new"], .registry-statuses button[data-status="calculated"] { --tone: #3686c7; }
.registry-statuses button[data-status="referred"], .registry-statuses button[data-status="confirmed"], .registry-statuses button[data-status="voucher"] { --tone: #805cbb; }
.registry-statuses button[data-status="pending"], .registry-statuses button[data-status="queued"], .registry-statuses button[data-status="planned"] { --tone: #b47c19; }
.registry-statuses button[data-status="overdue"], .registry-statuses button[data-status="rejected"], .registry-statuses button[data-status="paused"], .registry-statuses button[data-status="signal"] { --tone: #d14f70; }
.registry-statuses button[aria-pressed="true"] { border-color: color-mix(in srgb, var(--tone) 64%, var(--border)); background: color-mix(in srgb, var(--tone) 13%, var(--card)); font-weight: 650; }
.registry-statuses button strong { align-self: end; color: color-mix(in srgb, var(--tone) 68%, var(--foreground)); font-size: 18px; line-height: 1.15; font-variant-numeric: tabular-nums; }
.registry-body { min-width: 0; min-height: 0; overflow: auto; }
.registry-fill .registry-body { flex: 1; overscroll-behavior: contain; }
.registry-footer { display: flex; align-items: center; flex: none; flex-wrap: wrap; gap: 6px 8px; padding: 8px 12px; border-top: 1px solid var(--border); }
.registry-pages { display: flex; align-items: center; flex-wrap: wrap; max-width: 100%; gap: 4px; margin-inline-start: auto; }
.registry-pages button { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; }
.registry-pages button:disabled { opacity: .4; cursor: default; }
.registry-pages button:not(:disabled):hover, .registry-statuses button:hover, .registry-search button:hover { background: var(--muted); }
.registry-jump { display: flex; align-items: center; gap: 4px; white-space: nowrap; }
.registry-jump input { width: 5ch; text-align: center; appearance: textfield; }
.registry-jump input::-webkit-inner-spin-button { display: none; }
.registry-list :is(button, input, select):focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
.registry-body :deep(:is(.table-scroll, .desk-table, .desk-list, .admin-center-list)) { max-height: none; overflow: visible; }
.registry-list :deep(thead th) { position: sticky; z-index: 1; top: 0; }
.registry-list :deep([tabindex="0"]:focus-visible) { outline: 2px solid var(--ring); outline-offset: -2px; }
.registry-compact .registry-toolbar, .registry-compact .registry-footer { padding-inline: 0; }
.registry-compact .registry-table { border: none; }
.registry-compact .registry-toolbar { border-bottom: none; padding-block: 0 5px; }
.registry-compact .registry-footer { padding-bottom: 0; }
@media (max-width: 560px) {
  .registry-toolbar, .registry-footer { padding-inline: 8px; }
  .registry-pages { margin-inline-start: 0; }
}
@media (max-height: 640px) {
  .registry-statuses { display: flex; flex-wrap: nowrap; overflow-x: auto; }
  .registry-statuses button { flex: 0 0 88px; padding: 3px 6px; line-height: 1.15; }
  .registry-statuses button strong { font-size: 15px; }
}
</style>
