import type { PermissionKey } from '@/core/types/permissions'

export const MODULE_PERMISSION_BY_KEY: Partial<Record<string, PermissionKey>> = {
  'social-benefits': 'social-benefits.view',
  ptpk: 'ptpk.view',
  'palliative-care': 'palliative-care.view',
  iptk: 'iptk.view',
  muruvvat: 'muruvvat.view',
  snav: 'snav.view',
  ei: 'ei.view',
  'transport-benefits': 'transport-benefits.view',
}
