import { Landmark, LayoutDashboard, ChartColumn, MapPin, Users, BookOpen, UserRound, ShieldCheck, FileSpreadsheet, Activity, Settings, Briefcase, Smartphone } from 'lucide-vue-next'
import type { MuruvvatMenuItem } from '@/features/muruvvat/types'

export const platformTitle = 'Davlat ijtimoiy qo‘llab-quvvatlash choralarining yagona platformasi'
export const platformPath = '/apps/social-benefits'

export const platformViews = [
  { key: 'platform', path: '', tab: 'overview', title: 'Umumiy ko‘rinish' },
  { key: 'registry', path: '/registry', tab: 'registry', title: 'Idoralar va choralar' },
  { key: 'finance', path: '/finance', tab: 'finance', title: 'Choralar tahlili' },
  { key: 'regions', path: '/regions', tab: 'finance', cut: 'regions', title: 'Hududlar' },
  { key: 'citizens', path: '/citizens', tab: 'finance', cut: 'people', title: 'Fuqarolar kesimi' },
  { key: 'platform-family', path: '/family', tab: 'family', title: 'Fuqaro va oila pasporti' },
  { key: 'platform-control', path: '/control', tab: 'audit', title: 'Nazorat markazi' },
  { key: 'services', path: '/services', tab: 'services', title: 'Huquqlar va xizmatlar' },
  { key: 'platform-execution', path: '/execution', tab: 'flow', title: 'Ijro oqimi' },
  { key: 'reports', path: '/reports', tab: 'reports', title: 'Hisobotlar' },
  { key: 'benefit-figures', path: '/benefit-figures', tab: 'svod', title: 'Imtiyozlar hisoboti' },
  { key: 'benefit-proposals', path: '/benefit-proposals', tab: 'proposals', title: 'Taklif va qaydlar' },
  { key: 'cabinet', path: '/cabinet', tab: 'family', title: 'Fuqaro kabineti' },
  { key: 'about', path: '/about', tab: 'about', title: 'Platforma haqida' },
] as const

const groups = [
  { id: 'analytics', title: 'Monitoring va hisobotlar', pages: [['platform', LayoutDashboard], ['finance', ChartColumn], ['regions', MapPin], ['citizens', Users], ['reports', FileSpreadsheet], ['benefit-figures', FileSpreadsheet]] },
  { id: 'service', title: 'Fuqarolarga xizmat', pages: [['platform-family', UserRound], ['services', Briefcase], ['cabinet', Smartphone]] },
  { id: 'management', title: 'Boshqaruv', pages: [['registry', BookOpen], ['benefit-proposals', Briefcase], ['platform-control', ShieldCheck], ['platform-execution', Activity], ['about', Settings]] },
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
