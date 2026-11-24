export interface ReportingPeriod {
  kind: 'all' | 'year' | 'quarter' | 'month' | 'range'
  from: string
  to: string
}

export const allDates: ReportingPeriod = { kind: 'all', from: '', to: '' }

function validDate(value?: string): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function periodFromQuery(kind?: string, from?: string, to?: string): ReportingPeriod {
  if (kind !== 'year' && kind !== 'quarter' && kind !== 'month' && kind !== 'range') return allDates
  return validDate(from) && validDate(to) && from <= to ? { kind, from, to } : allDates
}

export function inPeriod(date: string, period: ReportingPeriod) {
  return period.kind === 'all' || (date >= period.from && date <= period.to)
}

export function calendarPeriod(kind: 'year' | 'quarter' | 'month', year: number, part: number): ReportingPeriod {
  const first = kind === 'year' ? 1 : kind === 'quarter' ? (part - 1) * 3 + 1 : part
  const last = kind === 'year' ? 12 : kind === 'quarter' ? first + 2 : first
  const month = (value: number) => String(value).padStart(2, '0')
  const endDay = new Date(Date.UTC(year, last, 0)).getUTCDate()
  return { kind, from: `${year}-${month(first)}-01`, to: `${year}-${month(last)}-${endDay}` }
}
