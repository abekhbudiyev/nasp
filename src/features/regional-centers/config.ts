import {
  Activity, Building2, ClipboardCheck, ClipboardList, Handshake, LayoutDashboard,
  LibraryBig, Link2, Wallet,
} from 'lucide-vue-next'

export const moduleTitle = 'Hududiy ijtimoiy xizmatlar markazlari moduli'
export const modulePath = '/apps/regional-centers'
export const regionalCenterPages = [
  { key: 'referrals', group: 'workflow', title: 'Yo‘llanmalar va navbat', path: '/referrals', icon: ClipboardList },
  { key: 'delivery', group: 'workflow', title: 'Rejalar va davomat', path: '/delivery', icon: Activity },
  { key: 'centers', group: 'setup', title: 'Markazlar va xonalar', path: '/centers', icon: Building2 },
  { key: 'services', group: 'setup', title: 'Xizmatlar va quvvat', path: '/services', icon: LibraryBig },
  { key: 'providers', group: 'setup', title: 'Ko‘rsatuvchilar va ijara', path: '/providers', icon: Handshake },
  { key: 'quality', group: 'control', title: 'Sifat nazorati', path: '/quality', icon: ClipboardCheck },
  { key: 'finance', group: 'control', title: 'Moliyalashtirish', path: '/finance', icon: Wallet },
  { key: 'overview', group: 'support', title: 'Monitoring', path: '', icon: LayoutDashboard },
  { key: 'integrations', group: 'support', title: 'Integratsiyalar', path: '/integrations', icon: Link2 },
] as const

export type RegionalCenterPage = typeof regionalCenterPages[number]['key']
export const regionalCenterMenuGroups = [
  { id: 'workflow', title: 'Kundalik ish' },
  { id: 'setup', title: 'Markaz va xizmatlarni sozlash' },
  { id: 'control', title: 'Nazorat va moliya' },
  { id: 'support', title: 'Hisobot va yordam' },
].map(group => ({
  ...group,
  items: regionalCenterPages.filter(page => page.group === group.id).map(page => ({
    id: page.key, title: page.title, route: modulePath + page.path, icon: page.icon,
  })),
}))
