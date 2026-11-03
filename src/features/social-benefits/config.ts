import { transportBenefitsMenu, transportBenefitsPages } from '@/features/transport-benefits/config'
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
 { key: 'kindergarten-vouchers', title: 'Bog‘cha vaucherlari', path: '/vouchers/kindergarten', voucherType: 'kindergarten' as const },
 { key: 'education-vouchers', title: 'Qo‘shimcha ta’lim va yo‘lkira', path: '/vouchers/education', voucherType: 'education' as const },
 { key: 'reports', title: 'Hisobot konstruktori', path: '/reports' },
]
const icons = [LayoutDashboard, ShieldAlert, Database, Table2, BookOpen, Users, Users, ShieldCheck, Activity, Ticket, Ticket, FileBarChart]
export const socialTransportPages = transportBenefitsPages.map(page=>({ ...page, route:page.key==='dashboard'?'/apps/social-benefits/transport/overview':page.route.replace('/apps/transport-benefits','/apps/social-benefits/transport') }))
const transportItems=transportBenefitsMenu.filter(item=>!!item.route)
export const socialTransportMenu: MuruvvatMenuItem[] = transportItems.map(item=>({...item,id:'transport-'+item.id,route:item.route?.replace('/apps/transport-benefits','/apps/social-benefits/transport'),icon:item.icon??BookOpen}))
export const socialBenefitsMenu: MuruvvatMenuItem[] = socialBenefitsPages.map((p,i)=>({ id:p.key,title:p.title,route:'/apps/social-benefits'+p.path,icon:icons[i] }))






const socialMenuItem = (id: string, title?: string): MuruvvatMenuItem => {
 const item = socialBenefitsMenu.find(item => item.id === id)
 if (!item) throw new Error(`Sidebar sahifasi topilmadi: ${id}`)
 return { ...item, title: title ?? item.title }
}
export const socialBenefitsMenuGroups = [
 { id: 'analytics', title: 'Tahliliy boshqaruv', items: [socialMenuItem('overview'), socialMenuItem('risks', 'Risklar va takliflar'), socialMenuItem('matrix', 'Imtiyozlar matritsasi')] },
 { id: 'main', title: 'Asosiy sahifalar', items: [socialMenuItem('people'), socialMenuItem('usage', 'Foydalanish holatlari')] },
 { id: 'vouchers', title: 'Vaucherlar', items: [socialMenuItem('kindergarten-vouchers'), socialMenuItem('education-vouchers')] },
 { id: 'transport', title: 'Transport', items: socialTransportMenu },
 { id: 'tools', title: 'Yordamchi sahifalar', items: [socialMenuItem('eligibility', 'Muvofiqlik tekshiruvi')] },
 { id: 'reports', title: 'Hisobotlar', items: [socialMenuItem('reports')] },
 { id: 'settings', title: 'Sozlamalar', items: [socialMenuItem('catalog'), socialMenuItem('contingents'), socialMenuItem('coverage', 'Manbalar va tekshiruvlar')] },
]
