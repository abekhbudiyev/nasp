import { benefitText } from '@/shared/i18n'
import { data, financeMonths, latin, months, organization, type Finance } from './data'

type Cell = string | number | null
export interface ReportOutput {
  title: string
  metadata: [string, Cell][]
  columns: string[]
  rows: Cell[][]
}

export function scopeRegion(region: string) {
  return region === '' ? 'Respublika' : latin(data.regions[Number(region)])
}

export function scopeAgency(agency: string) {
  return agency ? organization(agency) : 'Barcha idoralar'
}

export function financeSource(year: number, selectedMonths: number[]) {
  if (year === 2025) return selectedMonths.length === 12
    ? '2025-yil manba ko‘rsatkichlari'
    : '2025-yil · Oylik taqsimot namunaviy'
  return year === 2026 ? '2026-yil · Namunaviy hisob-kitob, yanvar–oktabr' : 'Namunaviy hisob-kitob'
}

// The source stores placeholder zeroes for unreported months and unsupported regions.
export function reportedMonth(line: Finance, year: number, region: string, month: number) {
  if ((region !== '' && !line.reg) || (year === 2026 && month > 9)) return undefined
  return financeMonths(line, year, region)[month]
}

export function fundingCoverage(lines: readonly Finance[], year: number, region: string, selectedMonths: number[]) {
  let amount = 0
  let measures = 0
  let covered = false
  for (const line of lines) {
    let hasSupport = false
    for (const month of selectedMonths) {
      const reported = reportedMonth(line, year, region, month)
      if (!reported) continue
      covered = true
      amount += reported.s
      if (reported.s > 0 || reported.c > 0) hasSupport = true
    }
    if (hasSupport) measures++
  }
  return {
    amount: covered ? Math.round(amount * 1e9) : null,
    measures: covered ? measures : null,
  }
}

export function scopeMonths(selectedMonths: number[]) {
  return selectedMonths.length === 12
    ? 'Yil yakuni'
    : selectedMonths.map(month => months[month]).join(', ')
}

export function findText(value: string, query: string) {
  const normalize = (text: string) => latin(text).toLowerCase().replace(/[’‘ʻʼ']/g, '').replace(/\s+/g, ' ').trim()
  return normalize(value).includes(normalize(query))
}

export async function saveXlsx(filename: string, { metadata, columns, rows }: ReportOutput) {
  // Keep numeric cells numeric and leave unreported values blank.
  const { utils, writeFile } = await import('xlsx')
  const localized = (row: Cell[]) => row.map(value => typeof value === 'string' ? benefitText(value) : value)
  const report = utils.aoa_to_sheet([localized(columns), ...rows.map(localized)])
  report['!cols'] = columns.map((column, index) => ({
    wch: Math.min(48, Math.max(16, column.length + 3, ...rows.map(row => typeof row[index] === 'string' ? row[index].length + 3 : 0))),
  }))
  if (report['!ref']) report['!autofilter'] = { ref: report['!ref'] }
  const scope = utils.aoa_to_sheet(metadata.map(localized))
  scope['!cols'] = [{ wch: 24 }, { wch: 62 }]
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, report, benefitText('Hisobot'))
  utils.book_append_sheet(workbook, scope, benefitText('Filtr va manba'))
  writeFile(workbook, filename, { compression: true })
}

export function printReport({ title, columns, rows, metadata }: ReportOutput) {
  const preview = window.open('', '_blank')
  if (!preview) throw Error('Print preview blocked')
  preview.opener = null
  const doc = preview.document
  doc.title = benefitText(title)
  function element(tag: string, text?: string) {
    const node = doc.createElement(tag)
    if (text !== undefined) node.textContent = text
    return node
  }
  const style = element('style', `
    body { font: 14px/1.45 system-ui, sans-serif; margin: 24px; color: #14302a; }
    h1 { font-size: 22px; } dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; }
    dt { font-weight: 600; } dd { margin: 0; }
    table { border-collapse: collapse; width: 100%; table-layout: auto; }
    td, th { border: 1px solid #c7d5cf; padding: 6px 8px; text-align: left; overflow-wrap: anywhere; }
    th { background: #e7f1ed; }
    .number { text-align: right; font-variant-numeric: tabular-nums; }
    @page { size: landscape; margin: 12mm; }
    @media print { body { margin: 0; font-size: 9pt; } button { display: none; } tr { break-inside: avoid; } }
  `)
  doc.head.append(style)
  const printButton = element('button', benefitText('Chop etish'))
  printButton.addEventListener('click', () => preview.print())
  const details = element('dl')
  for (const [label, value] of metadata) {
    details.append(element('dt', benefitText(label)), element('dd', benefitText(value ?? '—')))
  }
  const header = element('tr')
  for (const label of columns) header.append(element('th', benefitText(label)))
  const thead = element('thead')
  thead.append(header)
  const tbody = element('tbody')
  for (const row of rows) {
    const tr = element('tr')
    for (const value of row) {
      const td = element('td', typeof value === 'number' ? new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 3 }).format(value) : benefitText(value ?? '—'))
      if (typeof value === 'number') td.className = 'number'
      tr.append(td)
    }
    tbody.append(tr)
  }
  const table = element('table')
  table.append(thead, tbody)
  doc.body.append(printButton, element('h1', doc.title), details, table)
  preview.focus()
  preview.setTimeout(() => preview.print(), 100)
}

export function fundingCoverageRange(lines: readonly Finance[], region: string, from: string, to: string) {
  const last = new Date(to + 'T00:00:00Z')
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to) && from <= to && Number.isFinite(last.getTime())
  const completeMonths = valid && from.endsWith('-01') && last.getUTCDate() === new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth() + 1, 0)).getUTCDate()
  if (!completeMonths) return { amount: null, measures: null }
  let amount = 0, measures = 0, covered = false
  for (const line of lines) {
    let supported = false
    for (const year of [2024, 2025, 2026]) for (let month = 0; month < 12; month++) {
      const key = year + '-' + String(month + 1).padStart(2, '0')
      if (key < from.slice(0, 7) || key > to.slice(0, 7)) continue
      const value = reportedMonth(line, year, region, month)
      if (!value) continue
      covered = true; amount += value.s
      if (value.s > 0 || value.c > 0) supported = true
    }
    if (supported) measures++
  }
  return { amount: covered ? Math.round(amount * 1e9) : null, measures: covered ? measures : null }
}
