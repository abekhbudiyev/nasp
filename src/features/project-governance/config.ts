import { LayoutDashboard, FolderKanban, UsersRound, FileCheck2, Wallet, CalendarClock, BookOpen, Settings2 } from 'lucide-vue-next'
import type { MuruvvatMenuItem } from '@/features/muruvvat/types'
export const governancePages = [
  { key: 'overview', title: 'Boshqaruv paneli', path: '' }, { key: 'projects', title: 'Loyihalar', path: '/projects' },
  { key: 'council', title: 'Kengash', path: '/council' }, { key: 'acts', title: 'Dalolatnomalar', path: '/acts' },
  { key: 'finance', title: 'Moliyalashtirish', path: '/finance' }, { key: 'monitoring', title: 'Muddatlar nazorati', path: '/monitoring' },
  { key: 'rules', title: 'Jarayon va qoidalar', path: '/rules' },
  { key: 'management', title: 'Boshqaruv va ma’lumotnomalar', path: '/management' },
]
const icons = [LayoutDashboard, FolderKanban, UsersRound, FileCheck2, Wallet, CalendarClock, BookOpen, Settings2]
export const governanceMenu: MuruvvatMenuItem[] = governancePages.map((p, i) => ({ id: p.key, title: p.title, route: `/apps/project-governance${p.path}`, icon: icons[i] }))
