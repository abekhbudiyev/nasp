import type { RouteRecordRaw } from 'vue-router'
import { eiProductionRoutes } from '@/features/ei/routes'
import { socialBenefitsPages } from '@/features/social-benefits/config'
import { governancePages } from '@/features/project-governance/config'

const AppLayout = () => import('@/layouts/app-layout/AppLayout.vue')
const LoginPage = () => import('@/features/auth/pages/LoginPage.vue')
const AppsPage = () => import('@/features/apps/pages/AppsPage.vue')
const DashboardPage = () => import('@/features/dashboard/pages/DashboardPage.vue')
const CitizensPage = () => import('@/features/citizens/pages/CitizensPage.vue')
const ApplicationsPage = () => import('@/features/applications/pages/ApplicationsPage.vue')
const BenefitsPage = () => import('@/features/benefits/pages/BenefitsPage.vue')
const PaymentsPage = () => import('@/features/payments/pages/PaymentsPage.vue')
const DocumentsPage = () => import('@/features/documents/pages/DocumentsPage.vue')
const MonitoringPage = () => import('@/features/monitoring/pages/MonitoringPage.vue')
const ReportsPage = () => import('@/features/reports/pages/ReportsPage.vue')
const SettingsPage = () => import('@/features/settings/pages/SettingsPage.vue')
const UsersPage = () => import('@/features/users/pages/UsersPage.vue')
const IPTKPage = () => import('@/features/iptk/pages/IPTKPage.vue')
const IPTKApplicationsListPage = () => import('@/features/iptk/pages/IPTKApplicationsListPage.vue')
const MuruvvatPage = () => import('@/features/muruvvat/pages/MuruvvatPage.vue')
const SnavPage = () => import('@/features/snav/pages/SnavPage.vue')
const EIPage = () => import('@/features/ei/pages/EIPage.vue')
const EntrepreneurRatingPage = () => import('@/features/ei/pages/EntrepreneurRatingPage.vue')
const ErrorPage = () => import('@/features/errors/pages/ErrorPage.vue')
const TransportBenefitsPage = () => import('@/features/transport-benefits/pages/TransportBenefitsPage.vue')
const PTPKPage = () => import('@/features/ptpk/pages/PTPKPage.vue')
const PalliativeCarePage = () => import('@/features/palliative-care/pages/PalliativeCarePage.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: 'Kirish',
      guestOnly: true,
      breadcrumb: ['Kirish'],
    },
  },
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: 'apps/social-benefits/flow', redirect: '/apps/social-benefits/risks' },
      { path: 'apps/social-benefits/integrations', redirect: '/apps/social-benefits/coverage' },
      ...socialBenefitsPages.map(page => ({
        path: 'apps/social-benefits' + page.path, name: 'social-benefits-' + page.key,
        component: () => import('@/features/social-benefits/pages/SocialBenefitsPage.vue'), props: { pageKey: page.key },
        meta: { requiresAuth: true, permission: 'social-benefits.view' as const, moduleKey: 'social-benefits', moduleTitle: 'Ijtimoiy imtiyozlar moduli', title: page.title, breadcrumb: ['Ilovalar', 'Ijtimoiy imtiyozlar moduli', page.title] },
      })),
      ...governancePages.map((page) => ({
        path: `apps/project-governance${page.path}`,
        name: `project-governance-${page.key}`,
        component: () => import('@/features/project-governance/pages/ProjectGovernancePage.vue'),
        props: { pageKey: page.key },
        meta: { requiresAuth: true, permission: 'project-governance.view' as const, moduleKey: 'project-governance', moduleTitle: 'Loyihalarni boshqarish', title: page.title, breadcrumb: ['Ilovalar', 'Loyihalarni boshqarish', page.title] },
      })),
      {
        path: 'apps/project-governance/projects/:projectId', name: 'project-governance-detail',
        component: () => import('@/features/project-governance/pages/ProjectGovernancePage.vue'),
        props: (route) => ({ pageKey: 'detail', projectId: String(route.params.projectId) }),
        meta: { requiresAuth: true, permission: 'project-governance.view', moduleKey: 'project-governance', moduleTitle: 'Loyihalarni boshqarish', title: 'Loyiha kartasi', breadcrumb: ['Ilovalar', 'Loyihalarni boshqarish', 'Loyiha kartasi'] },
      },
      {
        path: '',
        redirect: '/apps',
      },
      {
        path: 'apps',
        name: 'apps',
        component: AppsPage,
        meta: {
          title: 'Ilovalar',
          requiresAuth: true,
          breadcrumb: ['Ilovalar'],
        },
      },
      {
        path: 'apps/iptk',
        name: 'iptk-dashboard',
        component: IPTKPage,
        props: {
          pageKey: 'dashboard',
        },
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Dashboard'],
        },
      },
      {
        path: 'apps/iptk/info/info-1',
        name: 'iptk-info-1',
        component: IPTKPage,
        props: {
          pageKey: 'info-1',
        },
        meta: {
          title: 'Xizmat turlari',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", 'Xizmat turlari'],
        },
      },
      {
        path: 'apps/iptk/info/info-2',
        name: 'iptk-info-2',
        component: IPTKPage,
        props: {
          pageKey: 'info-2',
        },
        meta: {
          title: 'Mos tashxislar',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", 'Mos tashxislar'],
        },
      },
      {
        path: 'apps/iptk/info/info-3',
        name: 'iptk-info-3',
        component: IPTKPage,
        props: {
          pageKey: 'info-3',
        },
        meta: {
          title: "Qarshi ko'rsatmalar",
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", "Qarshi ko'rsatmalar"],
        },
      },
      {
        path: 'apps/iptk/info/info-4',
        name: 'iptk-info-4',
        component: IPTKPage,
        props: {
          pageKey: 'info-4',
        },
        meta: {
          title: 'Hujjatlar',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", 'Hujjatlar'],
        },
      },
      {
        path: 'apps/iptk/info/info-5',
        name: 'iptk-info-5',
        component: IPTKPage,
        props: {
          pageKey: 'info-5',
        },
        meta: {
          title: "So'rovnoma shabloni",
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", "So'rovnoma shabloni"],
        },
      },
      {
        path: 'apps/iptk/info/info-6',
        name: 'iptk-info-6',
        component: IPTKPage,
        props: {
          pageKey: 'info-6',
        },
        meta: {
          title: "Toifa guruhlari",
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', "Ma'lumotnomalar", "Toifa guruhlari"],
        },
      },
      {
        path: 'apps/iptk/applications/list',
        name: 'iptk-applications-list',
        component: IPTKApplicationsListPage,
        meta: {
          title: 'Arizalar',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Arizalar', 'Arizalar'],
        },
      },
      {
        path: 'apps/iptk/applications/commissions',
        name: 'iptk-commissions-composition',
        component: IPTKPage,
        props: {
          pageKey: 'commissions-composition',
        },
        meta: {
          title: 'Komissiyalar tarkibi',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Boshqaruv', 'Komissiyalar tarkibi'],
        },
      },
      {
        path: 'apps/iptk/applications/assessment',
        name: 'iptk-applications-assessment',
        component: IPTKPage,
        props: {
          pageKey: 'applications-assessment',
        },
        meta: {
          title: 'Baholash',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Arizalar', 'Baholash'],
        },
      },
      {
        path: 'apps/iptk/applications/protocol',
        name: 'iptk-applications-protocol',
        component: IPTKPage,
        props: {
          pageKey: 'applications-protocol',
        },
        meta: {
          title: 'Bayonnoma',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Arizalar', 'Bayonnoma'],
        },
      },
      {
        path: 'apps/iptk/applications/questionnaire',
        name: 'iptk-applications-questionnaire',
        component: IPTKPage,
        props: {
          pageKey: 'applications-questionnaire',
        },
        meta: {
          title: "So'rovnoma",
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Arizalar', "So'rovnoma"],
        },
      },
      {
        path: 'apps/iptk/applications/conclusions',
        name: 'iptk-applications-conclusions',
        component: IPTKPage,
        props: {
          pageKey: 'applications-conclusions',
        },
        meta: {
          title: 'Xulosalar',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Arizalar', 'Xulosalar'],
        },
      },
      {
        path: 'apps/iptk/reports/applications',
        name: 'iptk-applications-report',
        component: IPTKPage,
        props: {
          pageKey: 'applications-report',
        },
        meta: {
          title: 'Arizalar bo‘yicha hisobot',
          requiresAuth: true,
          moduleKey: 'iptk',
          moduleTitle: 'IPTK',
          breadcrumb: ['Ilovalar', 'IPTK', 'Hisobotlar', 'Arizalar bo‘yicha hisobot'],
        },
      },
      {
        path: 'apps/muruvvat',
        name: 'muruvvat-dashboard',
        component: MuruvvatPage,
        props: {
          pageKey: 'dashboard',
        },
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Dashboard'],
        },
      },
      {
        path: 'apps/muruvvat/info/info-1',
        name: 'muruvvat-info-1',
        component: MuruvvatPage,
        props: {
          pageKey: 'info-1',
        },
        meta: {
          title: "Ma'lumot 1",
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', "Ma'lumotnomalar", "Ma'lumot 1"],
        },
      },
      {
        path: 'apps/muruvvat/info/info-2',
        name: 'muruvvat-info-2',
        component: MuruvvatPage,
        props: {
          pageKey: 'info-2',
        },
        meta: {
          title: "Ma'lumot 2",
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', "Ma'lumotnomalar", "Ma'lumot 2"],
        },
      },
      {
        path: 'apps/muruvvat/info/info-3',
        name: 'muruvvat-info-3',
        component: MuruvvatPage,
        props: {
          pageKey: 'info-3',
        },
        meta: {
          title: "Ma'lumot 3",
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', "Ma'lumotnomalar", "Ma'lumot 3"],
        },
      },
      {
        path: 'apps/muruvvat/applications/list',
        name: 'muruvvat-applications-list',
        component: MuruvvatPage,
        props: {
          pageKey: 'applications-list',
        },
        meta: {
          title: 'Arizalar ro‘yxati',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Arizalar', 'Arizalar ro‘yxati'],
        },
      },
      {
        path: 'apps/muruvvat/applications/statements',
        name: 'muruvvat-statements',
        component: MuruvvatPage,
        props: {
          pageKey: 'statements',
        },
        meta: {
          title: 'Dalolatnomalar',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Arizalar', 'Dalolatnomalar'],
        },
      },
      {
        path: 'apps/muruvvat/applications/decisions',
        name: 'muruvvat-decisions',
        component: MuruvvatPage,
        props: {
          pageKey: 'decisions',
        },
        meta: {
          title: 'Qarorlar',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Arizalar', 'Qarorlar'],
        },
      },
      {
        path: 'apps/muruvvat/homes/queues',
        name: 'muruvvat-queues',
        component: MuruvvatPage,
        props: {
          pageKey: 'queues',
        },
        meta: {
          title: 'Navbatlar',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Internat uylari', 'Navbatlar'],
        },
      },
      {
        path: 'apps/muruvvat/homes/registered',
        name: 'muruvvat-registered',
        component: MuruvvatPage,
        props: {
          pageKey: 'registered',
        },
        meta: {
          title: 'Ro‘yxatga olinganlar',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Internat uylari', 'Ro‘yxatga olinganlar'],
        },
      },
      {
        path: 'apps/muruvvat/homes/removed',
        name: 'muruvvat-removed',
        component: MuruvvatPage,
        props: {
          pageKey: 'removed',
        },
        meta: {
          title: 'Ro‘yxatdan chiqqanlar',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Internat uylari', 'Ro‘yxatdan chiqqanlar'],
        },
      },
      {
        path: 'apps/muruvvat/reports/applications',
        name: 'muruvvat-applications-report',
        component: MuruvvatPage,
        props: {
          pageKey: 'applications-report',
        },
        meta: {
          title: 'Arizalar bo‘yicha hisobot',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Hisobotlar', 'Arizalar bo‘yicha hisobot'],
        },
      },
      {
        path: 'apps/muruvvat/reports/homes',
        name: 'muruvvat-homes-report',
        component: MuruvvatPage,
        props: {
          pageKey: 'homes-report',
        },
        meta: {
          title: 'Internat uylari bo‘yicha hisobot',
          requiresAuth: true,
          moduleKey: 'muruvvat',
          moduleTitle: 'Muruvvat',
          breadcrumb: ['Ilovalar', 'Muruvvat', 'Hisobotlar', 'Internat uylari bo‘yicha hisobot'],
        },
      },
      {
        path: 'apps/snav',
        name: 'snav-dashboard',
        component: SnavPage,
        props: {
          pageKey: 'dashboard',
        },
        meta: {
          title: 'Ijtimoiy navigator',
          requiresAuth: true,
          moduleKey: 'snav',
          moduleTitle: 'Ijtimoiy navigator',
          breadcrumb: ['Ilovalar', 'Ijtimoiy navigator', 'Dashboard'],
        },
      },
      {
        path: 'apps/snav/info/organization-types',
        name: 'snav-organization-types',
        component: SnavPage,
        props: {
          pageKey: 'organization-types',
        },
        meta: {
          title: 'Tashkilot turlari',
          requiresAuth: true,
          moduleKey: 'snav',
          moduleTitle: 'Ijtimoiy navigator',
          breadcrumb: ['Ilovalar', 'Ijtimoiy navigator', "Ma'lumotnomalar", 'Tashkilot turlari'],
        },
      },
      {
        path: 'apps/snav/info/organizations',
        name: 'snav-organizations',
        component: SnavPage,
        props: {
          pageKey: 'organizations',
        },
        meta: {
          title: 'Tashkilotlar',
          requiresAuth: true,
          moduleKey: 'snav',
          moduleTitle: 'Ijtimoiy navigator',
          breadcrumb: ['Ilovalar', 'Ijtimoiy navigator', "Ma'lumotnomalar", 'Tashkilotlar'],
        },
      },
      {
        path: 'apps/snav/info/reception-schedules',
        name: 'snav-reception-schedules',
        component: SnavPage,
        props: {
          pageKey: 'reception-schedules',
        },
        meta: {
          title: 'Qabul jadvallari',
          requiresAuth: true,
          moduleKey: 'snav',
          moduleTitle: 'Ijtimoiy navigator',
          breadcrumb: ['Ilovalar', 'Ijtimoiy navigator', "Ma'lumotnomalar", 'Qabul jadvallari'],
        },
      },
      {
        path: 'apps/ei',
        sensitive: true,
        name: 'ei',
        component: EIPage,
        props: {
          pageKey: 'dashboard',
        },
        meta: {
          title: 'Asosiy',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Asosiy'],
        },
      },
      {
        path: 'apps/ei/providers/applications/create',
        sensitive: true,
        name: 'ei-providers-applications-create',
        component: EIPage,
        props: {
          pageKey: 'providers-applications-create',
        },
        meta: {
          title: 'Yangi ariza',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Arizalar', 'Yangi ariza'],
        },
      },
      {
        path: 'apps/ei/providers/applications/:id',
        sensitive: true,
        name: 'ei-providers-application-view',
        component: EIPage,
        props: {
          pageKey: 'providers-application-view',
        },
        meta: {
          title: "Xizmat ko'rsatuvchi arizasini ko'rish",
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Arizalar', "Ko'rish"],
        },
      },
      {
        path: 'apps/ei/providers/applications',
        sensitive: true,
        name: 'ei-providers-applications',
        component: EIPage,
        props: {
          pageKey: 'providers-applications',
        },
        meta: {
          title: 'Arizalar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Arizalar'],
        },
      },
      {
        path: 'apps/ei/providers/conclusions',
        sensitive: true,
        name: 'ei-providers-conclusions',
        component: EIPage,
        props: {
          pageKey: 'providers-conclusions',
        },
        meta: {
          title: 'Xulosalar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Xulosalar'],
        },
      },
      {
        path: 'apps/ei/providers/registry',
        sensitive: true,
        name: 'ei-providers-registry',
        component: EIPage,
        props: {
          pageKey: 'providers-registry',
        },
        meta: {
          title: 'Reyestr',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Reyestr'],
        },
      },
      {
        path: 'apps/ei/providers/rating',
        sensitive: true,
        name: 'ei-providers-rating',
        component: EntrepreneurRatingPage,
        meta: {
          title: 'Tadbirkorlar reytingi',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatuvchilar", 'Tadbirkorlar reytingi'],
        },
      },
      {
        path: 'apps/ei/children/applications/:id',
        sensitive: true,
        name: 'ei-children-application-view',
        component: EIPage,
        props: {
          pageKey: 'children-application-view',
        },
        meta: {
          title: 'Bola arizasini ko‘rish',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Bolalar murojaatlari', 'Arizalar', 'Ko‘rish'],
        },
      },
      {
        path: 'apps/ei/children/applications',
        sensitive: true,
        name: 'ei-children-applications',
        component: EIPage,
        props: {
          pageKey: 'children-questionnaires',
        },
        meta: {
          title: 'Arizalar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Bolalar murojaatlari', 'Arizalar'],
        },
      },
      {
        path: 'apps/ei/children/vouchers',
        sensitive: true,
        name: 'ei-children-vouchers',
        component: EIPage,
        props: {
          pageKey: 'children-vouchers',
        },
        meta: {
          title: 'Vaucherlar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Bolalar murojaatlari', 'Vaucherlar'],
        },
      },
      {
        path: 'apps/ei/children/orders',
        sensitive: true,
        name: 'ei-children-orders',
        component: EIPage,
        props: {
          pageKey: 'children-orders',
        },
        meta: {
          title: 'Buyurtmalar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Bolalar murojaatlari', 'Buyurtmalar'],
        },
      },
      {
        path: 'apps/ei/service/active',
        sensitive: true,
        name: 'ei-service-active',
        component: EIPage,
        props: {
          pageKey: 'service-active',
        },
        meta: {
          title: 'Xizmat olayotganlar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatish", 'Xizmat olayotganlar'],
        },
      },
      {
        path: 'apps/ei/service/plans',
        sensitive: true,
        name: 'ei-service-plans',
        component: EIPage,
        props: {
          pageKey: 'service-plans',
        },
        meta: {
          title: 'Erta aralashuv rejalari',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatish", 'Erta aralashuv rejalari'],
        },
      },
      {
        path: 'apps/ei/service/attendance/:date',
        sensitive: true,
        name: 'ei-service-attendance-day',
        component: EIPage,
        props: {
          pageKey: 'service-attendance-day',
        },
        meta: {
          title: 'Davomat',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatish", 'Davomat'],
        },
      },
      {
        path: 'apps/ei/service/attendance',
        sensitive: true,
        name: 'ei-service-attendance',
        component: EIPage,
        props: {
          pageKey: 'service-attendance',
        },
        meta: {
          title: 'Davomat',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatish", 'Davomat'],
        },
      },
      {
        path: 'apps/ei/service/terminated',
        sensitive: true,
        name: 'ei-service-terminated',
        component: EIPage,
        props: {
          pageKey: 'service-terminated',
        },
        meta: {
          title: 'Xizmati tugatilganlar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', "Xizmat ko'rsatish", 'Xizmati tugatilganlar'],
        },
      },
      {
        path: 'apps/ei/finance/subsidy-requests',
        sensitive: true,
        name: 'ei-finance-subsidy-requests',
        component: EIPage,
        props: {
          pageKey: 'finance-subsidy-requests',
        },
        meta: {
          title: 'Buyurtmanomalar',
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Moliyalashtirish', 'Buyurtmanomalar'],
        },
      },
      {
        path: 'apps/ei/finance/payments',
        sensitive: true,
        name: 'ei-finance-payments',
        component: EIPage,
        props: {
          pageKey: 'finance-payments',
        },
        meta: {
          title: "To'lovlar hisobi",
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Moliyalashtirish', "To'lovlar hisobi"],
        },
      },
      {
        path: 'apps/ei/reports/providers-applications',
        sensitive: true,
        name: 'ei-reports-providers-applications',
        component: EIPage,
        props: {
          pageKey: 'providers-applications-report',
        },
        meta: {
          title: "Xizmat ko'rsatuvchilar arizalari",
          requiresAuth: true,
          moduleKey: 'ei',
          moduleTitle: 'Erta aralashuv moduli',
          breadcrumb: ['Ilovalar', 'Erta aralashuv moduli', 'Hisobotlar', "Xizmat ko'rsatuvchilar arizalari"],
        },
      },
      ...eiProductionRoutes,
      {
        path: 'apps/ei/entrepreneurs/applications',
        redirect: '/apps/ei/providers/applications',
      },
      {
        path: 'apps/ei/entrepreneurs/conclusions',
        redirect: '/apps/ei/providers/conclusions',
      },
      {
        path: 'apps/ei/entrepreneurs/registry',
        redirect: '/apps/ei/providers/registry',
      },
      {
        path: 'apps/ei/children/questionnaires',
        redirect: '/apps/ei/children/applications',
      },
      {
        path: 'apps/ei/service/request',
        redirect: '/apps/ei/children/applications',
      },
      {
        path: 'apps/ei/service/registered',
        redirect: '/apps/ei/service/active',
      },
      {
        path: 'apps/ei/service/removed',
        redirect: '/apps/ei/service/terminated',
      },
      {
        path: 'apps/EI',
        redirect: '/apps/ei',
      },
      {
        path: 'apps/EI/providers/applications',
        redirect: '/apps/ei/providers/applications',
      },
      {
        path: 'apps/EI/providers/applications/create',
        redirect: '/apps/ei/providers/applications/create',
      },
      {
        path: 'apps/EI/providers/conclusions',
        redirect: '/apps/ei/providers/conclusions',
      },
      {
        path: 'apps/EI/providers/registry',
        redirect: '/apps/ei/providers/registry',
      },
      {
        path: 'apps/EI/children/questionnaires',
        redirect: '/apps/ei/children/applications',
      },
      {
        path: 'apps/EI/children/vouchers',
        redirect: '/apps/ei/children/vouchers',
      },
      {
        path: 'apps/EI/children/orders',
        redirect: '/apps/ei/children/orders',
      },
      {
        path: 'apps/EI/service/active',
        redirect: '/apps/ei/service/active',
      },
      {
        path: 'apps/EI/service/plans',
        redirect: '/apps/ei/service/plans',
      },
      {
        path: 'apps/EI/service/attendance',
        redirect: '/apps/ei/service/attendance',
      },
      {
        path: 'apps/EI/service/terminated',
        redirect: '/apps/ei/service/terminated',
      },
      {
        path: 'apps/EI/finance/subsidy-requests',
        redirect: '/apps/ei/finance/subsidy-requests',
      },
      {
        path: 'apps/EI/finance/payments',
        redirect: '/apps/ei/finance/payments',
      },
      {
        path: 'apps/EI/reports/providers-applications',
        redirect: '/apps/ei/reports/providers-applications',
      },
      {
        path: 'apps/EI/entrepreneurs/applications',
        redirect: '/apps/ei/providers/applications',
      },
      {
        path: 'apps/EI/entrepreneurs/conclusions',
        redirect: '/apps/ei/providers/conclusions',
      },
      {
        path: 'apps/EI/entrepreneurs/registry',
        redirect: '/apps/ei/providers/registry',
      },
      {
        path: 'apps/EI/children/applications',
        redirect: '/apps/ei/children/applications',
      },
      {
        path: 'apps/EI/service/request',
        redirect: '/apps/ei/children/applications',
      },
      {
        path: 'apps/EI/service/registered',
        redirect: '/apps/ei/service/active',
      },
      {
        path: 'apps/EI/service/removed',
        redirect: '/apps/ei/service/terminated',
      },
      {
        path: 'apps/palliative-care',
        name: 'palliative-care-dashboard',
        component: PalliativeCarePage,
        props: { pageKey: 'dashboard' },
        meta: {
          title: 'Bosh sahifa',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Bosh sahifa'],
        },
      },
      {
        path: 'apps/palliative-care/cases',
        name: 'palliative-care-cases',
        component: PalliativeCarePage,
        props: { pageKey: 'cases' },
        meta: {
          title: 'Bolalar va yo‘llanmalar',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Bolalar va yo‘llanmalar'],
        },
      },
      {
        path: 'apps/palliative-care/cases/:caseId',
        name: 'palliative-care-case-detail',
        component: PalliativeCarePage,
        props: (route) => ({ pageKey: 'case-detail', caseId: String(route.params.caseId) }),
        meta: {
          title: 'Bola va oila kartasi',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Bolalar va yo‘llanmalar', 'Bola va oila kartasi'],
        },
      },
      {
        path: 'apps/palliative-care/consilium',
        name: 'palliative-care-consilium',
        component: PalliativeCarePage,
        props: { pageKey: 'consilium' },
        meta: {
          title: 'Konsilium',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Konsilium'],
        },
      },
      {
        path: 'apps/palliative-care/inpatient',
        name: 'palliative-care-inpatient',
        component: PalliativeCarePage,
        props: { pageKey: 'inpatient' },
        meta: {
          title: 'Statsionar',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Statsionar'],
        },
      },
      {
        path: 'apps/palliative-care/mobile',
        name: 'palliative-care-mobile',
        component: PalliativeCarePage,
        props: { pageKey: 'mobile' },
        meta: {
          title: 'Mobil yordam',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Mobil yordam'],
        },
      },
      {
        path: 'apps/palliative-care/equipment',
        name: 'palliative-care-equipment',
        component: PalliativeCarePage,
        props: { pageKey: 'equipment' },
        meta: {
          title: 'Jihoz berish',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Jihoz berish'],
        },
      },
      {
        path: 'apps/palliative-care/references',
        name: 'palliative-care-references',
        component: PalliativeCarePage,
        props: { pageKey: 'references' },
        meta: {
          title: 'Kataloglar',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Kataloglar'],
        },
      },
      {
        path: 'apps/palliative-care/reports',
        name: 'palliative-care-reports',
        component: PalliativeCarePage,
        props: { pageKey: 'reports' },
        meta: {
          title: 'Davriy hisobot',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Davriy hisobot'],
        },
      },
      {
        path: 'apps/palliative-care/process',
        name: 'palliative-care-process',
        component: PalliativeCarePage,
        props: { pageKey: 'process' },
        meta: {
          title: 'Biznes jarayon',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Biznes jarayon'],
        },
      },
      {
        path: 'apps/palliative-care/guides',
        name: 'palliative-care-guides',
        component: PalliativeCarePage,
        props: { pageKey: 'guides' },
        meta: {
          title: 'Qo‘llanmalar',
          requiresAuth: true,
          moduleKey: 'palliative-care',
          moduleTitle: 'Bolalar palliativ yordami',
          breadcrumb: ['Ilovalar', 'Bolalar palliativ yordami', 'Qo‘llanmalar'],
        },
      },
      {
        path: 'apps/ptpk',
        name: 'ptpk-dashboard',
        component: PTPKPage,
        props: { pageKey: 'dashboard' },
        meta: {
          title: 'Bolalar ehtiyojlari',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Dashboard'],
        },
      },
      {
        path: 'apps/ptpk/cases',
        name: 'ptpk-cases',
        component: PTPKPage,
        props: { pageKey: 'cases' },
        meta: {
          title: 'Case’lar',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Case’lar'],
        },
      },
      {
        path: 'apps/ptpk/cases/:caseId',
        name: 'ptpk-case-detail',
        component: PTPKPage,
        props: (route) => ({ pageKey: 'case-detail', caseId: String(route.params.caseId) }),
        meta: {
          title: 'Case ish maydoni',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Case’lar', 'Case ish maydoni'],
        },
      },
      {
        path: 'apps/ptpk/triage',
        name: 'ptpk-triage',
        component: PTPKPage,
        props: { pageKey: 'triage' },
        meta: {
          title: 'Triage va baholash',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Triage va baholash'],
        },
      },
      {
        path: 'apps/ptpk/referrals',
        name: 'ptpk-referrals',
        component: PTPKPage,
        props: { pageKey: 'referrals' },
        meta: {
          title: 'Xizmat yo‘naltirishlari',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Xizmat yo‘naltirishlari'],
        },
      },
      {
        path: 'apps/ptpk/reviews',
        name: 'ptpk-reviews',
        component: PTPKPage,
        props: { pageKey: 'reviews' },
        meta: {
          title: 'Review va apellyatsiya',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Review va apellyatsiya'],
        },
      },
      {
        path: 'apps/ptpk/monitoring',
        name: 'ptpk-monitoring',
        component: PTPKPage,
        props: { pageKey: 'monitoring' },
        meta: {
          title: 'Monitoring',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Monitoring'],
        },
      },
      {
        path: 'apps/ptpk/process',
        name: 'ptpk-process',
        component: PTPKPage,
        props: { pageKey: 'process' },
        meta: {
          title: 'Jarayon modeli',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Jarayon modeli'],
        },
      },
      {
        path: 'apps/ptpk/references',
        name: 'ptpk-references',
        component: PTPKPage,
        props: { pageKey: 'references' },
        meta: {
          title: 'Ma’lumotnomalar',
          requiresAuth: true,
          moduleKey: 'ptpk',
          moduleTitle: 'Bolalar ehtiyojlari',
          breadcrumb: ['Ilovalar', 'Bolalar ehtiyojlari', 'Ma’lumotnomalar'],
        },
      },
      {
        path: 'apps/transport-benefits',
        name: 'transport-benefits-dashboard',
        redirect: '/apps/transport-benefits/contingents',
        meta: {
          title: 'Transport imtiyozlari',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Umumiy ko‘rsatkichlar'],
        },
      },
      {
        path: 'apps/transport-benefits/contingents',
        name: 'transport-benefits-contingents',
        component: TransportBenefitsPage,
        props: { pageKey: 'contingents' },
        meta: {
          title: 'Imtiyoz oluvchilar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Imtiyoz oluvchilar'],
        },
      },
      {
        path: 'apps/transport-benefits/mvp-plan',
        name: 'transport-benefits-mvp-plan',
        component: TransportBenefitsPage,
        props: { pageKey: 'mvp-plan' },
        meta: {
          title: 'Ish rejasi va vazifalar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ish rejasi va vazifalar'],
        },
      },
      {
        path: 'apps/transport-benefits/eligibility',
        name: 'transport-benefits-eligibility',
        component: TransportBenefitsPage,
        props: { pageKey: 'eligibility' },
        meta: {
          title: 'Imtiyozni tekshirish',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Imtiyozni tekshirish'],
        },
      },
      {
        path: 'apps/transport-benefits/ticket-events',
        name: 'transport-benefits-ticket-events',
        component: TransportBenefitsPage,
        props: { pageKey: 'ticket-events' },
        meta: {
          title: 'Chipta amallari',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Chipta amallari'],
        },
      },
      {
        path: 'apps/transport-benefits/settlements',
        name: 'transport-benefits-settlements',
        component: TransportBenefitsPage,
        props: { pageKey: 'settlements' },
        meta: {
          title: 'Buyurtmanomalar va to‘lovlar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Buyurtmanomalar va to‘lovlar'],
        },
      },
      {
        path: 'apps/transport-benefits/references',
        redirect: '/apps/transport-benefits/references/categories',
      },
      {
        path: 'apps/transport-benefits/references/categories',
        name: 'transport-benefits-reference-categories',
        component: TransportBenefitsPage,
        props: { pageKey: 'reference-categories' },
        meta: {
          title: 'Toifalar va huquqiy asoslar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Toifalar va huquqiy asoslar'],
        },
      },
      {
        path: 'apps/transport-benefits/references/policies',
        name: 'transport-benefits-reference-policies',
        component: TransportBenefitsPage,
        props: { pageKey: 'reference-policies' },
        meta: {
          title: 'Imtiyoz qoidalari',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Imtiyoz qoidalari'],
        },
      },
      {
        path: 'apps/transport-benefits/references/transport',
        name: 'transport-benefits-reference-transport',
        component: TransportBenefitsPage,
        props: { pageKey: 'reference-transport' },
        meta: {
          title: 'Transport va tariflar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Transport va tariflar'],
        },
      },
      {
        path: 'apps/transport-benefits/references/organizations',
        name: 'transport-benefits-reference-organizations',
        component: TransportBenefitsPage,
        props: { pageKey: 'reference-organizations' },
        meta: {
          title: 'Tashkilotlar',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Tashkilotlar'],
        },
      },
      {
        path: 'apps/transport-benefits/references/system-codes',
        name: 'transport-benefits-reference-system-codes',
        component: TransportBenefitsPage,
        props: { pageKey: 'reference-system-codes' },
        meta: {
          title: 'Tizim kodlari',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'Ma’lumotnomalar', 'Tizim kodlari'],
        },
      },
      {
        path: 'apps/transport-benefits/integrations',
        name: 'transport-benefits-integrations',
        component: TransportBenefitsPage,
        props: { pageKey: 'integrations' },
        meta: {
          title: 'API va arxitektura',
          requiresAuth: true,
          moduleKey: 'transport-benefits',
          moduleTitle: 'Transport imtiyozlari',
          breadcrumb: ['Ilovalar', 'Transport imtiyozlari', 'API va arxitektura'],
        },
      },
      {
        path: 'apps/dashboard',
        name: 'dashboard',
        component: DashboardPage,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          moduleTitle: 'Dashboard',
          breadcrumb: ['Ilovalar', 'Dashboard'],
        },
      },
      {
        path: 'apps/citizens',
        name: 'citizens',
        component: CitizensPage,
        meta: {
          title: 'Fuqarolar reyestri',
          requiresAuth: true,
          moduleTitle: 'Fuqarolar reyestri',
          breadcrumb: ['Ilovalar', 'Fuqarolar reyestri'],
        },
      },
      {
        path: 'apps/applications',
        name: 'applications',
        component: ApplicationsPage,
        meta: {
          title: 'Arizalar',
          requiresAuth: true,
          moduleTitle: 'Arizalar',
          breadcrumb: ['Ilovalar', 'Arizalar'],
        },
      },
      {
        path: 'apps/benefits',
        name: 'benefits',
        component: BenefitsPage,
        meta: {
          title: 'Nafaqalar',
          requiresAuth: true,
          moduleTitle: 'Nafaqalar',
          breadcrumb: ['Ilovalar', 'Nafaqalar'],
        },
      },
      {
        path: 'apps/payments',
        name: 'payments',
        component: PaymentsPage,
        meta: {
          title: 'To‘lovlar',
          requiresAuth: true,
          moduleTitle: 'To‘lovlar',
          breadcrumb: ['Ilovalar', 'To‘lovlar'],
        },
      },
      {
        path: 'apps/documents',
        name: 'documents',
        component: DocumentsPage,
        meta: {
          title: 'Hujjatlar',
          requiresAuth: true,
          moduleTitle: 'Hujjatlar',
          breadcrumb: ['Ilovalar', 'Hujjatlar'],
        },
      },
      {
        path: 'apps/monitoring',
        name: 'monitoring',
        component: MonitoringPage,
        meta: {
          title: 'Monitoring',
          requiresAuth: true,
          moduleTitle: 'Monitoring',
          breadcrumb: ['Ilovalar', 'Monitoring'],
        },
      },
      {
        path: 'apps/reports',
        name: 'reports',
        component: ReportsPage,
        meta: {
          title: 'Hisobotlar',
          requiresAuth: true,
          moduleTitle: 'Hisobotlar',
          breadcrumb: ['Ilovalar', 'Hisobotlar'],
        },
      },
      {
        path: 'apps/settings',
        name: 'settings',
        component: SettingsPage,
        meta: {
          title: 'Sozlamalar',
          requiresAuth: true,
          moduleTitle: 'Sozlamalar',
          breadcrumb: ['Ilovalar', 'Sozlamalar'],
        },
      },
      {
        path: 'apps/users',
        name: 'users',
        component: UsersPage,
        meta: {
          title: 'Foydalanuvchilar va rollar',
          requiresAuth: true,
          moduleTitle: 'Foydalanuvchilar va rollar',
          breadcrumb: ['Ilovalar', 'Foydalanuvchilar va rollar'],
        },
      },
    ],
  },
  {
    path: '/403',
    name: 'forbidden',
    component: ErrorPage,
    props: {
      status: 403,
    },
    meta: {
      title: 'Ruxsat cheklangan',
      requiresAuth: true,
      breadcrumb: ['403'],
    },
  },
  {
    path: '/404',
    name: 'not-found',
    component: ErrorPage,
    props: {
      status: 404,
    },
    meta: {
      title: 'Sahifa topilmadi',
      requiresAuth: true,
      breadcrumb: ['404'],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
