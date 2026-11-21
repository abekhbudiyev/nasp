import type { LocationQuery, LocationQueryRaw } from 'vue-router'

const scopeKeys = ['year', 'period', 'region', 'agency'] as const
export function socialBenefitsScope(query: LocationQuery): LocationQueryRaw {
  return Object.fromEntries(scopeKeys.map(key => [key, query[key]]).filter(([, value]) => typeof value === 'string' && value !== ''))
}
