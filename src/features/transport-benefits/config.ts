import {
  Boxes,
  BookOpenCheck,
  Cable,
  LayoutDashboard,
  ListChecks,
  ShieldCheck,
  TicketCheck,
  UsersRound,
  WalletCards,
} from 'lucide-vue-next'
import type { MuruvvatMenuItem, MuruvvatPageDefinition } from '@/features/muruvvat/types'

export const transportBenefitsPages: MuruvvatPageDefinition[] = [
  {
    key: 'dashboard',
    title: 'Transport imtiyozlari',
    description: 'Imtiyoz oluvchilar, chiptalar, oylik buyurtmanomalar va to‘lovlarni boshqarish.',
    route: '/apps/transport-benefits',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Umumiy ko‘rsatkichlar'],
  },
  {
    key: 'contingents',
    title: 'Imtiyoz oluvchilar',
    description: 'Tashkilotlardan kelgan ma’lumotlar va fuqarolarning imtiyoz huquqlari.',
    route: '/apps/transport-benefits/contingents',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Imtiyoz oluvchilar'],
  },
  {
    key: 'mvp-plan',
    title: 'Ish rejasi va vazifalar',
    description: 'Bajariladigan ishlar, mas’ullar va kutilayotgan natijalar.',
    route: '/apps/transport-benefits/mvp-plan',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ish rejasi va vazifalar'],
  },
  {
    key: 'eligibility',
    title: 'Imtiyozni tekshirish',
    description: 'Fuqaro imtiyozdan foydalana olishini tekshirish va safar uchun vaqtincha band qilish.',
    route: '/apps/transport-benefits/eligibility',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Imtiyozni tekshirish'],
  },
  {
    key: 'ticket-events',
    title: 'Chipta amallari',
    description: 'Chipta berish, qaytarish, bekor qilish va safarda foydalanish ma’lumotlari.',
    route: '/apps/transport-benefits/ticket-events',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Chipta amallari'],
  },
  {
    key: 'settlements',
    title: 'Buyurtmanomalar va to‘lovlar',
    description: 'Oylik buyurtmanomani tekshirish, subsidiya moduliga yuborish va to‘lov holatini kuzatish.',
    route: '/apps/transport-benefits/settlements',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Buyurtmanomalar va to‘lovlar'],
  },
  {
    key: 'reference-categories',
    title: 'Toifalar va huquqiy asoslar',
    description: 'Imtiyoz oluvchilar toifalari va ularning qonuniy asoslari.',
    route: '/apps/transport-benefits/references/categories',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Toifalar va huquqiy asoslar'],
  },
  {
    key: 'reference-policies',
    title: 'Imtiyoz qoidalari',
    description: 'Imtiyozlardan foydalanish shartlari va amal qilish muddati.',
    route: '/apps/transport-benefits/references/policies',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Imtiyoz qoidalari'],
  },
  {
    key: 'reference-transport',
    title: 'Transport va tariflar',
    description: 'Transport turlari, chipta klasslari va tasdiqlovchi hujjatlar katalogi.',
    route: '/apps/transport-benefits/references/transport',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Transport va tariflar'],
  },
  {
    key: 'reference-organizations',
    title: 'Tashkilotlar',
    description: 'Imtiyoz oluvchilar manbalari, integratsiya egalari va operatsion ishtirokchilar registri.',
    route: '/apps/transport-benefits/references/organizations',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Tashkilotlar'],
  },
  {
    key: 'reference-system-codes',
    title: 'Tizim kodlari',
    description: 'Amallar, holatlar, sabablar va foydalanuvchi vazifalari ro‘yxati.',
    route: '/apps/transport-benefits/references/system-codes',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Tizim kodlari'],
  },
  {
    key: 'integrations',
    title: 'API va arxitektura',
    description: 'Umumlashtirilgan API kontraktlari, servis chegaralari va ma’lumot egaligi.',
    route: '/apps/transport-benefits/integrations',
    breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'API va arxitektura'],
  },
]

export const transportBenefitsMenu: MuruvvatMenuItem[] = [
  {
    id: 'dashboard',
    title: 'Umumiy ko‘rsatkichlar',
    route: '/apps/transport-benefits',
    icon: LayoutDashboard,
  },
  {
    id: 'contingents',
    title: 'Imtiyoz oluvchilar',
    route: '/apps/transport-benefits/contingents',
    icon: UsersRound,
  },
  {
    id: 'mvp-plan',
    title: 'Ish rejasi va vazifalar',
    route: '/apps/transport-benefits/mvp-plan',
    icon: ListChecks,
  },
  {
    id: 'eligibility',
    title: 'Imtiyozni tekshirish',
    route: '/apps/transport-benefits/eligibility',
    icon: ShieldCheck,
  },
  {
    id: 'ticket-events',
    title: 'Chipta amallari',
    route: '/apps/transport-benefits/ticket-events',
    icon: TicketCheck,
  },
  {
    id: 'settlements',
    title: 'Buyurtmanomalar va to‘lovlar',
    route: '/apps/transport-benefits/settlements',
    icon: WalletCards,
  },
  {
    id: 'info',
    title: 'Ma’lumotnomalar',
    icon: BookOpenCheck,
    children: [
      { id: 'reference-categories', title: 'Toifalar va huquqiy asoslar', route: '/apps/transport-benefits/references/categories' },
      { id: 'reference-policies', title: 'Imtiyoz qoidalari', route: '/apps/transport-benefits/references/policies' },
      { id: 'reference-transport', title: 'Transport va tariflar', route: '/apps/transport-benefits/references/transport' },
      { id: 'reference-organizations', title: 'Tashkilotlar', route: '/apps/transport-benefits/references/organizations' },
      { id: 'reference-system-codes', title: 'Tizim kodlari', route: '/apps/transport-benefits/references/system-codes' },
    ],
  },
  {
    id: 'integrations',
    title: 'API va arxitektura',
    route: '/apps/transport-benefits/integrations',
    icon: Cable,
  },
]

export const transportBenefitArchitectureIcon = Boxes

export function getTransportBenefitsPage(pageKey: string) {
  return transportBenefitsPages.find((page) => page.key === pageKey)
}
