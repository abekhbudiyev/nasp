import {
  Activity, Building2, ClipboardCheck, ClipboardList, Handshake, LayoutDashboard,
  Fingerprint, LibraryBig, Link2, Wallet,
} from 'lucide-vue-next'

export const moduleTitle = 'Hududiy ijtimoiy xizmatlar markazlari moduli'
export const modulePath = '/apps/regional-centers'
export const regionalCenterPages = [
  { key: 'referrals', group: 'workflow', title: 'Yo‘llanmalar va navbat', path: '/referrals', icon: ClipboardList },
  { key: 'visits', group: 'workflow', title: 'Tashriflar reyestri', path: '/visits', icon: Fingerprint },
  { key: 'delivery', group: 'workflow', title: 'Individual rejalar', path: '/delivery', icon: Activity },
  { key: 'centers', group: 'setup', title: 'Markazlar va xizmatlar', path: '/centers', icon: Building2 },
  { key: 'services', group: 'setup', title: 'Xizmatlar katalogi', path: '/services', icon: LibraryBig },
  { key: 'passports', group: 'setup', title: 'Quvvat pasportlari', path: '/capacity', icon: Building2 },
  { key: 'providers', group: 'setup', title: 'Ko‘rsatuvchilar va ijara', path: '/providers', icon: Handshake },
  { key: 'quality', group: 'control', title: 'Sifat nazorati', path: '/quality', icon: ClipboardCheck },
  { key: 'finance', group: 'control', title: 'Moliyalashtirish', path: '/finance', icon: Wallet },
  { key: 'overview', group: 'support', title: 'Monitoring', path: '', icon: LayoutDashboard },
  { key: 'integrations', group: 'support', title: 'Integratsiyalar', path: '/integrations', icon: Link2 },
] as const

export type RegionalCenterPage = typeof regionalCenterPages[number]['key']
export const regionalAdministrationPages = regionalCenterPages.filter(page => page.group === 'setup')
export const regionalAdministrationPath = modulePath + '/centers'
export const regionalCenterMenuGroups = [
  { id: 'setup', title: '' },
  { id: 'workflow', title: 'Xizmatlar reyestrlari' },
  { id: 'control', title: 'Nazorat va moliya' },
  { id: 'support', title: 'Hisobot va yordam' },
].map(group => ({
  ...group,
  items: group.id === 'setup'
    ? [{ id: 'centers', title: 'Boshqaruv', route: regionalAdministrationPath, icon: Building2 }]
    : regionalCenterPages.filter(page => page.group === group.id).map(page => ({
      id: page.key, title: page.title, route: modulePath + page.path, icon: page.icon,
    })),
}))
