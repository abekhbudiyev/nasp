export interface ReportDimension { key: string; label: string }
export interface ReportMetric { key: string; label: string; numerator?: string; denominator?: string }
export interface GroupableRow { id: string; dimensions: Record<string, { value: string; label: string }>; metrics: Record<string, number | undefined> }
export interface ReportGroup { key: string; value: string; label: string; rows: GroupableRow[]; metrics: Record<string, number | undefined>; children: ReportGroup[] }
export function sumReportMetrics(rows: GroupableRow[], metrics: ReportMetric[]) {
  const sums: Record<string, number | undefined> = {}
  for (const metric of metrics) {
    if (metric.numerator) continue
    sums[metric.key] = rows.reduce<number | undefined>((sum, row) => sum === undefined || row.metrics[metric.key] === undefined ? undefined : sum + row.metrics[metric.key]!, 0)
  }
  for (const metric of metrics) if (metric.numerator && metric.denominator) {
    const numerator = sums[metric.numerator], denominator = sums[metric.denominator]
    sums[metric.key] = numerator === undefined || denominator === undefined ? undefined : denominator ? numerator / denominator * 100 : 0
  }
  return sums
}
export function groupReportRows(rows: GroupableRow[], primary: string, secondary: string, metrics: ReportMetric[]): ReportGroup[] {
  const groups = new Map<string, GroupableRow[]>()
  for (const row of rows) {
    const value = row.dimensions[primary]?.value || ''
    const entries = groups.get(value) || []; entries.push(row); groups.set(value, entries)
  }
  return [...groups].map(([value, entries]) => ({ key: JSON.stringify([primary, value]), value, label: entries[0]?.dimensions[primary]?.label || '—', rows: entries, metrics: sumReportMetrics(entries, metrics), children: secondary && secondary !== primary ? groupReportRows(entries, secondary, '', metrics) : [] }))
}
