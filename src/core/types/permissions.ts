export type PermissionKey =
  | 'apps.view'
  | 'social-benefits.view'
  | 'project-governance.view'
  | 'iptk.view'
  | 'ptpk.view'
  | 'palliative-care.view'
  | 'dashboard.view'
  | 'citizens.view'
  | 'applications.view'
  | 'benefits.view'
  | 'payments.view'
  | 'documents.view'
  | 'monitoring.view'
  | 'reports.view'
  | 'settings.view'
  | 'users.view'
  | 'muruvvat.view'
  | 'snav.view'
  | 'ei.view'
  | 'transport-benefits.view'
  | 'transport-benefits.return-review'

export interface RoleDefinition {
  id: string
  title: string
  permissions: PermissionKey[]
}
