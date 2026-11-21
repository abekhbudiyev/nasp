<script setup lang="ts">
import { ref } from 'vue'
import { Download, Printer } from 'lucide-vue-next'
import { benefitText } from '@/shared/i18n'
import { printReport, saveXlsx, type ReportOutput } from './report-output'
import { saveCSV } from './data'

const props = defineProps<{ filename: string; report: ReportOutput; print?: boolean; csv?: boolean }>()
const exporting = ref(false)
const error = ref('')

async function exportWorkbook() {
  error.value = ''
  exporting.value = true
  try {
    await saveXlsx(props.filename, props.report)
  } catch {
    error.value = 'Excel faylini saqlab bo‘lmadi.'
  } finally {
    exporting.value = false
  }
}

function openPrintPreview() {
  error.value = ''
  try {
    printReport(props.report)
  } catch {
    error.value = 'Bosma ko‘rinishni ochib bo‘lmadi.'
  }
}

function exportCsv() {
  const { metadata, columns, rows } = props.report
  saveCSV(props.filename.replace(/\.xlsx$/, '.csv'), [...metadata, columns, ...rows].map(row => row.map(value => value ?? '')))
}
</script>

<template>
  <div class="report-actions">
    <button class="np-button" :disabled="exporting" :aria-label="benefitText('Excel faylini yuklash')" @click="exportWorkbook">
      <Download :size="15" /> XLSX
    </button>
    <button v-if="csv" class="np-button" @click="exportCsv">CSV</button>
    <button v-if="print" class="np-button" @click="openPrintPreview">
      <Printer :size="15" /> {{ benefitText('Chop etish') }}
    </button>
    <small v-if="error" class="error" role="alert">{{ benefitText(error) }}</small>
  </div>
</template>

<style scoped>
.report-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px }
.error { width: 100%; color: var(--destructive) }
</style>
