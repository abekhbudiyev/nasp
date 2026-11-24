import { Activity, Database, LayoutDashboard, Radio, Server, TriangleAlert } from 'lucide-vue-next'

export const monitoringPath = '/apps/monitoring'
export const monitoringTitle = 'Monitoring'

export const monitoringPages = [
  { id: 'overview', title: 'Umumiy holat', route: monitoringPath, icon: LayoutDashboard },
  { id: 'servers', title: 'Serverlar', route: `${monitoringPath}/servers`, icon: Server },
  { id: 'checks', title: 'API va biznes tekshiruvlari', route: `${monitoringPath}/checks`, icon: Activity },
  { id: 'oracle', title: 'Oracle', route: `${monitoringPath}/oracle`, icon: Database },
  { id: 'incidents', title: 'Hodisalar', route: `${monitoringPath}/incidents`, icon: TriangleAlert },
  { id: 'sources', title: 'Ma’lumot manbalari', route: `${monitoringPath}/sources`, icon: Radio },
] as const

export type MonitoringView = typeof monitoringPages[number]['id']

export const monitoringMenuGroups = [{ id: 'monitoring', title: null, items: monitoringPages }]
