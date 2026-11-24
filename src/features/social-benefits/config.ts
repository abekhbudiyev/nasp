import { Landmark, LayoutDashboard, ChartColumn, BookOpen, UserRound, ShieldCheck, FileSpreadsheet, Activity, Settings, Smartphone, MapPinned } from 'lucide-vue-next'
import type { MuruvvatMenuItem } from '@/features/muruvvat/types'

export const platformTitle = 'Davlat ijtimoiy qo‘llab-quvvatlash choralarining yagona platformasi'
export const platformPath = '/apps/social-benefits'

export const platformViews = [
  { key: 'dashboard', path: '', tab: 'dashboard', title: 'Boshqaruv paneli' },
  { key: 'family-monitor', path: '/family-wellbeing', tab: 'family-monitor', title: 'Oilalar farovonligi' },
  { key: 'platform', path: '/overview', tab: 'overview', title: 'Umumiy tahlil' },
  { key: 'registry', path: '/registry', tab: 'registry', title: 'Idoralar va choralar' },
  { key: 'finance', path: '/finance', tab: 'finance', title: 'Qo‘llab-quvvatlash choralari tahlili' },
  { key: 'platform-family', path: '/family', tab: 'family', title: 'Fuqaro va oila pasporti' },
  { key: 'platform-control', path: '/control', tab: 'audit', title: 'Xatarlar tahlili' },
  { key: 'platform-execution', path: '/execution', tab: 'flow', title: 'Jarayon kuzatuvi' },
  { key: 'reports', path: '/reports', tab: 'reports', title: 'Hisobotlar' },
  { key: 'cabinet', path: '/cabinet', tab: 'family', title: 'Fuqaro kabineti' },
  { key: 'about', path: '/about', tab: 'about', title: 'Platforma haqida' },
] as const

export const viewFilters: Record<string, { key: string; title: string; path?: string }[]> = {
  finance: [
    { key: 'measures', title: 'Choralar' },
    { key: 'regions', title: 'Hududlar', path: '/regions' },
    { key: 'people', title: 'Fuqarolar', path: '/citizens' },
  ],
  reports: [
    { key: 'reports', title: 'Yig‘ma hisobot' },
    { key: 'svod', title: 'Imtiyozlar hisoboti', path: '/benefit-figures' },
    { key: 'proposals', title: 'Taklif va qaydlar', path: '/benefit-proposals' },
    { key: 'requests', title: 'Ijro hisoboti' },
  ],
  'platform-family': [
    { key: 'family', title: 'Oila pasporti' },
    { key: 'services', title: 'Huquqlar va xizmatlar', path: '/services' },
  ],
}

const groups = [
  { id: 'dashboard', title: 'Monitoring', pages: [['dashboard', LayoutDashboard], ['family-monitor', MapPinned]] },
  { id: 'registry', title: 'Reyestr', pages: [['registry', BookOpen]] },
  { id: 'analytics', title: 'Tahlil va hisobot', pages: [['platform', LayoutDashboard], ['finance', ChartColumn], ['reports', FileSpreadsheet]] },
  { id: 'service', title: 'Fuqaro xizmatlari', pages: [['platform-family', UserRound], ['cabinet', Smartphone]] },
  { id: 'management', title: 'Nazorat va ijro', pages: [['platform-control', ShieldCheck], ['platform-execution', Activity]] },
  { id: 'about', title: 'Platforma', pages: [['about', Settings]] },
] as const

export const socialBenefitsMenuGroups = groups.map(group => ({
  id: group.id,
  title: group.title,
  items: group.pages.map(([id, icon]): MuruvvatMenuItem => {
    const view = platformViews.find(item => item.key === id)!
    return { id, title: view.title, route: platformPath + view.path, icon: icon ?? Landmark }
  }),
}))
export const socialBenefitsMenu = socialBenefitsMenuGroups.flatMap(group => group.items)
