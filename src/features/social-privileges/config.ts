import { ArrowLeftRight, BusFront, GraduationCap, LayoutDashboard, School } from 'lucide-vue-next'
import { transportBenefitsMenu } from '@/features/transport-benefits/config'

export const privilegesPath = '/apps/social-privileges'
export const privilegesTitle = 'Ijtimoiy imtiyozlar'
export const voucherExchangePath = privilegesPath + '/vouchers/exchange'
export const voucherExchangeTitle = 'Vaucher almashinuvi'

export const privilegeSections = [
  { id: 'transport', title: 'Transport imtiyozlari', route: privilegesPath + '/transport/contingents', icon: BusFront, description: 'Imtiyoz oluvchilar, chiptalar, buyurtmanomalar va to‘lovlar.' },
  { id: 'kindergarten', title: 'Bog‘cha vaucherlari', route: privilegesPath + '/vouchers/kindergarten', icon: School, description: 'Vaucherlar reyestri, bog‘chaga qabul, davomat va to‘lovlar.' },
  { id: 'education', title: 'To‘garak vaucherlari', route: privilegesPath + '/vouchers/education', icon: GraduationCap, description: 'Qo‘shimcha ta’limga qabul, vaucher muddati va yo‘lkira.' },
] as const

export const privilegeMenuGroups = [
  { id: 'privileges', title: privilegesTitle, items: [{ id: 'privileges-home', title: 'Bosh sahifa', route: privilegesPath, icon: LayoutDashboard }] },
  { id: 'transport', title: 'Transport imtiyozlari', items: transportBenefitsMenu.filter(item => item.route) },
  { id: 'references', title: 'Transport ma’lumotnomalari', items: transportBenefitsMenu.find(item => item.id === 'info')?.children ?? [] },
  { id: 'vouchers', title: 'Vaucherlar', items: [...privilegeSections.slice(1), { id: 'voucher-exchange', title: voucherExchangeTitle, route: voucherExchangePath, icon: ArrowLeftRight }] },
]
