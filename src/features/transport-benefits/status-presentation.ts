export type TransportTone = 'neutral' | 'warning' | 'success' | 'danger'
const palettes = {
  neutral: { card: 'border-primary/25 bg-primary/5', text: 'text-primary', badge: 'border-primary/20 bg-primary/10 text-primary', stripe: 'bg-primary' },
  warning: { card: 'border-orange-200 bg-orange-50/70 dark:border-orange-900 dark:bg-orange-950/25', text: 'text-orange-700 dark:text-orange-300', badge: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300', stripe: 'bg-orange-500' },
  success: { card: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/25', text: 'text-emerald-700 dark:text-emerald-300', badge: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300', stripe: 'bg-emerald-500' },
  danger: { card: 'border-red-200 bg-red-50/70 dark:border-red-900 dark:bg-red-950/25', text: 'text-red-700 dark:text-red-300', badge: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300', stripe: 'bg-red-500' },
}
export const transportPalette = (tone: TransportTone) => palettes[tone]
export function transportStatusTone(status: string): TransportTone {
  if (['Nofaol', 'CANCELLED', 'FAILED', 'RETURNED', 'CARRIER_CANCELLED', 'VOID', 'ERROR', 'NO_SHOW', 'RETURN_DEADLINE_EXPIRED', 'HISTORICAL', 'REJECTED'].includes(status)) return 'danger'
  if (['Faol', 'Foydalangan', 'PAID', 'TRAVELLED', 'ACTIVE'].includes(status)) return 'success'
  return status && !['Barchasi', 'NOT_SENT'].includes(status) ? 'warning' : 'neutral'
}
