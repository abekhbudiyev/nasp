import { computed, reactive, watch } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type ScopeKey = 'region' | 'center' | 'service'

export interface RegistryScope {
  active: number
  fields: { key: ScopeKey; label: string; all: string; value: string; options: { id: string; title: string }[] }[]
  change: (key: ScopeKey, value: string) => void
  links?: { label: string; text: string; to: RouteLocationRaw }[]
}

export const pageSizes = [10, 25, 50, 100] as const
export type RegistrySort = 'default' | 'newest' | 'oldest'

export interface GetListQuery {
  page: number
  pageSize: number
  search: string
  status: string
  sort: RegistrySort
}

export interface GetListResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  matchingCount: number
  statusCounts: Record<string, number>
}

interface RegistryRecord {
  search?: string
  status?: string
  date?: string
}

export interface RegistryControls {
  query: GetListQuery
  result: GetListResult<unknown>
  update: (patch: Partial<GetListQuery>) => void
}

function normalize(text: string) {
  return text.trim().toLocaleLowerCase('uz').replace(/[‘’ʻʼ`']/g, '')
}

function filterList<T>(records: readonly T[], filters: Pick<GetListQuery, 'search' | 'status' | 'sort'>, describe: (item: T) => RegistryRecord) {
  const search = normalize(filters.search).split(/\s+/).filter(Boolean)
  const { status, sort } = filters
  const matching: { item: T; date?: string }[] = []
  const counts: Record<string, number> = Object.create(null)
  let matchingCount = 0
  for (const item of records) {
    const entry = describe(item)
    const text = search.length ? normalize(entry.search ?? '') : ''
    if (search.some(term => !text.includes(term))) continue
    matchingCount++
    if (entry.status) counts[entry.status] = (counts[entry.status] ?? 0) + 1
    if (!status || entry.status === status) matching.push({ item, date: entry.date })
  }
  if (sort !== 'default') {
    matching.sort((a, b) => {
      if (!a.date || !b.date) return Number(!!b.date) - Number(!!a.date)
      return (a.date < b.date ? -1 : a.date > b.date ? 1 : 0) * (sort === 'oldest' ? 1 : -1)
    })
  }
  return { matching, matchingCount, statusCounts: counts }
}

function getList<T>(
  { matching, matchingCount, statusCounts }: ReturnType<typeof filterList<T>>,
  query: Pick<GetListQuery, 'page' | 'pageSize'>,
): GetListResult<T> {
  const pageSize = pageSizes.find(size => size === query.pageSize) ?? pageSizes[0]
  const totalPages = Math.max(1, Math.ceil(matching.length / pageSize))
  const page = Math.min(totalPages, Math.max(1, Math.trunc(query.page) || 1))
  const start = (page - 1) * pageSize
  return {
    items: matching.slice(start, start + pageSize).map(entry => entry.item),
    page, pageSize, totalCount: matching.length, totalPages, matchingCount, statusCounts,
  }
}

export function useRegistryList<T>(
  records: () => readonly T[],
  describe: (item: T) => RegistryRecord = () => ({}),
  scope?: () => string,
  options: { pageSize?: number; sort?: RegistrySort } = {},
) {
  const initial: GetListQuery = { page: 1, pageSize: options.pageSize ?? 10, search: '', status: '', sort: options.sort ?? 'default' }
  const query = reactive({ ...initial })
  const filtered = computed(() => filterList(records(), query, describe))
  const result = computed(() => getList(filtered.value, query))

  function update(patch: Partial<GetListQuery>) {
    const { search, status, pageSize, sort } = query
    const next = { ...query, ...patch }
    if (next.search !== search || next.status !== status || next.pageSize !== pageSize || next.sort !== sort) next.page = 1
    Object.assign(query, next)
  }

  function reset() {
    Object.assign(query, initial)
  }

  if (scope) watch(scope, () => update({ page: 1 }), { flush: 'sync' })
  watch(() => result.value.totalPages, pages => {
    if (query.page > pages) update({ page: pages })
  })
  return reactive({ query, result, update, reset })
}
