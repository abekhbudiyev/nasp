import { LayoutDashboard, BookOpen, Users, ShieldCheck, Activity, Ticket, FileBarChart, Table2, ShieldAlert, Database } from 'lucide-vue-next'
import type { MuruvvatMenuItem } from '@/features/muruvvat/types'
export const socialBenefitsPages = [
 { key: 'overview', title: 'Umumiy monitoring', path: '' },
 { key: 'risks', title: 'Risklar va maqbullashtirish', path: '/risks' },
 { key: 'coverage', title: 'Tekshirish imkoniyatlari', path: '/coverage' },
 { key: 'matrix', title: 'Kontingent va imtiyozlar matritsasi', path: '/matrix' },
 { key: 'catalog', title: 'Imtiyozlar katalogi', path: '/catalog' },
 { key: 'contingents', title: 'Kontingentlar', path: '/contingents' },
 { key: 'people', title: 'Shaxslar reyestri', path: '/people' },
 { key: 'eligibility', title: 'Muvofiqlikni tekshirish', path: '/eligibility' },
 { key: 'usage', title: 'Foydalanish monitoringi', path: '/usage' },
 { key: 'vouchers', title: 'Elektron bog‘cha vaucheri', path: '/vouchers' },
 { key: 'reports', title: 'Hisobot konstruktori', path: '/reports' },
]
const icons = [LayoutDashboard, ShieldAlert, Database, Table2, BookOpen, Users, Users, ShieldCheck, Activity, Ticket, FileBarChart]
export const socialBenefitsMenu: MuruvvatMenuItem[] = socialBenefitsPages.map((p,i)=>({ id:p.key,title:p.title,route:'/apps/social-benefits'+p.path,icon:icons[i] }))






const socialMenuItem = (id: string, title?: string): MuruvvatMenuItem => {
 const item = socialBenefitsMenu.find(item => item.id === id)
 if (!item) throw new Error(`Sidebar sahifasi topilmadi: ${id}`)
 return { ...item, title: title ?? item.title }
}
export const socialBenefitsMenuGroups = [
 { id: 'analytics', title: 'Tahliliy boshqaruv', items: [socialMenuItem('overview'), socialMenuItem('risks', 'Risklar va takliflar'), socialMenuItem('matrix', 'Imtiyozlar matritsasi')] },
 { id: 'main', title: 'Asosiy sahifalar', items: [socialMenuItem('people'), socialMenuItem('usage', 'Foydalanish holatlari'), socialMenuItem('vouchers', 'Bog‘cha vaucherlari')] },
 { id: 'tools', title: 'Yordamchi sahifalar', items: [socialMenuItem('eligibility', 'Muvofiqlik tekshiruvi')] },
 { id: 'reports', title: 'Hisobotlar', items: [socialMenuItem('reports')] },
 { id: 'settings', title: 'Sozlamalar', items: [socialMenuItem('catalog'), socialMenuItem('contingents'), socialMenuItem('coverage', 'Manbalar va tekshiruvlar')] },
]
