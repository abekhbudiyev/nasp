<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowLeftRight, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Download } from 'lucide-vue-next'
import { Button } from '@/shared/ui/shadcn/button'
import { groupReportRows, sumReportMetrics, type GroupableRow, type ReportDimension, type ReportMetric, type ReportGroup } from '../grouped-report'
const props = defineProps<{ rows: GroupableRow[]; dimensions: ReportDimension[]; metrics: ReportMetric[]; initialPrimary: string; initialSecondary?: string; filename: string; showDownload?: boolean }>()
const emit = defineEmits<{ drill: [path: { dimension: string; value: string }[]] }>()
const primary = ref(props.initialPrimary)
const secondary = ref(props.initialSecondary || '')
const expanded = ref<string[]>([])
const page = ref(1), pageSize = ref(10), downloading = ref(false), error = ref('')
const groups = computed(() => groupReportRows(props.rows, primary.value, secondary.value, props.metrics))
const totals = computed(() => sumReportMetrics(props.rows, props.metrics))
const pages = computed(() => Math.max(1, Math.ceil(groups.value.length / pageSize.value)))
const visible = computed(() => groups.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
const start = computed(() => groups.value.length ? (page.value - 1) * pageSize.value + 1 : 0)
const end = computed(() => Math.min(page.value * pageSize.value, groups.value.length))
watch(primary, () => { if (secondary.value === primary.value) secondary.value = '' })
watch([primary, secondary, pageSize, () => props.rows], () => { page.value = 1; expanded.value = [] })
watch(pages, count => { page.value = Math.min(page.value, count) })
function swap() { if (secondary.value) { const previous = primary.value; primary.value = secondary.value; secondary.value = previous } }
function toggle(group: ReportGroup) {
  if (!secondary.value) { emit('drill', [{ dimension: primary.value, value: group.value }]); return }
  expanded.value = expanded.value.includes(group.key) ? expanded.value.filter(key => key !== group.key) : [...expanded.value, group.key]
}
const metricValue = (value: number | undefined, metric: ReportMetric) => value === undefined ? '—' : new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: metric.numerator ? 1 : 2 }).format(value) + (metric.numerator ? '%' : '')
async function download() {
  downloading.value = true; error.value = ''
  try {
    const XLSX = await import('xlsx')
    const rows: (string | number)[][] = [[props.dimensions.find(d => d.key === primary.value)?.label || '', ...(secondary.value ? [props.dimensions.find(d => d.key === secondary.value)?.label || ''] : []), ...props.metrics.map(m => m.label)]]
    for (const group of groups.value) for (const row of secondary.value ? group.children : [group]) rows.push([group.label, ...(secondary.value ? [row.label] : []), ...props.metrics.map(metric => row.metrics[metric.key] ?? '—')])
    rows.push(['Jami', ...(secondary.value ? [''] : []), ...props.metrics.map(metric => totals.value[metric.key] ?? '—')])
    const sheet = XLSX.utils.aoa_to_sheet(rows); sheet['!cols'] = rows[0]!.map((_, index) => ({ wch: index < (secondary.value ? 2 : 1) ? 48 : 22 }))
    const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Hisobot'); XLSX.writeFile(book, props.filename)
  } catch { error.value = 'Hisobotni yuklab bo‘lmadi. Qayta urinib ko‘ring.' }
  finally { downloading.value = false }
}
defineExpose({ download })
</script>
<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="flex shrink-0 flex-wrap items-end gap-2 border-b border-border bg-muted/20 p-3">
      <label class="min-w-40 space-y-1 text-xs font-medium">Guruhlash<select v-model="primary" class="block h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"><option v-for="dimension in dimensions" :key="dimension.key" :value="dimension.key">{{ dimension.label }}</option></select></label>
      <Button variant="outline" size="sm" :disabled="!secondary" aria-label="Guruhlash tartibini almashtirish" title="Tartibni almashtirish" @click="swap"><ArrowLeftRight class="h-4 w-4" /></Button>
      <label class="min-w-40 space-y-1 text-xs font-medium">Ichki guruh<select v-model="secondary" class="block h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"><option value="">Guruhlamaslik</option><option v-for="dimension in dimensions.filter(item => item.key !== primary)" :key="dimension.key" :value="dimension.key">{{ dimension.label }}</option></select></label>
      <Button v-if="showDownload" class="ml-auto gap-1.5" variant="outline" size="sm" :disabled="downloading || !rows.length" @click="download"><Download class="h-4 w-4" />{{ downloading ? 'Yuklanmoqda…' : 'Yuklab olish' }}</Button>
    </div>
    <p v-if="error" role="alert" class="px-3 py-2 text-sm text-destructive">{{ error }}</p>
    <div class="min-h-0 flex-1 overflow-auto overscroll-contain">
      <table class="w-full min-w-[48rem] border-separate border-spacing-0 text-left text-sm">
        <thead class="sticky top-0 z-10 bg-muted/90 backdrop-blur"><tr><th class="border-b border-border px-3 py-2.5 font-medium">{{ dimensions.find(d => d.key === primary)?.label }}<span v-if="secondary"> / {{ dimensions.find(d => d.key === secondary)?.label }}</span></th><th v-for="metric in metrics" :key="metric.key" class="whitespace-nowrap border-b border-border px-3 py-2.5 text-right font-medium">{{ metric.label }}</th></tr></thead>
        <tbody><template v-for="group in visible" :key="group.key"><tr class="bg-muted/20"><td class="max-w-lg border-b border-border px-3 py-2.5"><button type="button" class="flex items-start gap-2 text-left font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" :aria-expanded="secondary ? expanded.includes(group.key) : undefined" @click="toggle(group)"><ChevronRight :class="['mt-0.5 h-4 w-4 shrink-0 transition-transform', expanded.includes(group.key) ? 'rotate-90' : '']" />{{ group.label }}</button></td><td v-for="metric in metrics" :key="metric.key" class="whitespace-nowrap border-b border-border px-3 py-2.5 text-right tabular-nums">{{ metricValue(group.metrics[metric.key], metric) }}</td></tr>
        <template v-if="expanded.includes(group.key)"><tr v-for="child in group.children" :key="child.key" class="hover:bg-muted/30"><td class="max-w-lg border-b border-border py-2.5 pl-9 pr-3"><button type="button" class="text-left text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" @click="emit('drill', [{ dimension: primary, value: group.value }, { dimension: secondary, value: child.value }])">{{ child.label }}</button></td><td v-for="metric in metrics" :key="metric.key" class="whitespace-nowrap border-b border-border px-3 py-2.5 text-right tabular-nums">{{ metricValue(child.metrics[metric.key], metric) }}</td></tr></template></template><tr v-if="!groups.length"><td :colspan="metrics.length + 1" class="p-12 text-center text-muted-foreground">Ma’lumot topilmadi.</td></tr></tbody>
        <tfoot v-if="groups.length" class="sticky bottom-0 bg-muted font-semibold"><tr><td class="border-t border-border px-3 py-2.5">Jami</td><td v-for="metric in metrics" :key="metric.key" class="whitespace-nowrap border-t border-border px-3 py-2.5 text-right tabular-nums">{{ metricValue(totals[metric.key], metric) }}</td></tr></tfoot>
      </table>
    </div>
    <div class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-border px-3 py-2 text-sm text-muted-foreground"><div class="flex flex-wrap items-center gap-3"><label class="flex items-center gap-2">Qatorlar soni<select v-model.number="pageSize" aria-label="Hisobot qatorlari soni" class="h-8 rounded-md border border-border bg-background px-2"><option v-for="size in [10,20,50,100]" :key="size" :value="size">{{ size }}</option></select></label><span>Sahifada: {{ start }}–{{ end }} / {{ groups.length }}</span></div><nav class="flex h-8 items-center rounded-lg border border-border bg-background px-1" aria-label="Hisobot sahifalari"><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page === 1" aria-label="Birinchi sahifa" @click="page = 1"><ChevronsLeft class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page === 1" aria-label="Oldingi sahifa" @click="page--"><ChevronLeft class="h-4 w-4" /></Button><span aria-live="polite" class="min-w-14 px-2 text-center font-semibold text-foreground">{{ page }}/{{ pages }}</span><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page === pages" aria-label="Keyingi sahifa" @click="page++"><ChevronRight class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page === pages" aria-label="Oxirgi sahifa" @click="page = pages"><ChevronsRight class="h-4 w-4" /></Button></nav></div>
  </div>
</template>
