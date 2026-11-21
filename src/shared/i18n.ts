import { uzbekScript } from './uzbek-script'
import { computed, ref } from 'vue'

export type AppLocale = 'uz-Cyrl' | 'uz' | 'en' | 'ru' | 'i18n'

type TranslationMap = Partial<Record<Exclude<AppLocale, 'uz'>, string>>

const storageKey = 'nasp-locale'

export const appLanguages: Array<{ code: AppLocale, label: string, shortLabel: string }> = [
  { code: 'uz', label: "Özbekça (lotin)", shortLabel: 'UZ' },
  { code: 'uz-Cyrl', label: 'Ўзбекча (кирилл)', shortLabel: 'ЎЗ' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU' },
  { code: 'i18n', label: 'i18n', shortLabel: 'i18n' },
]

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') return 'uz'

  const storedLocale = window.localStorage.getItem(storageKey)
  return appLanguages.some((language) => language.code === storedLocale) ? storedLocale as AppLocale : 'uz'
}

const locale = ref<AppLocale>(getInitialLocale())

const translationKeys: Record<string, string> = {
  "A'zolar": 'common.members',
  "A'zolar soni": 'common.membersCount',
  'Amallar': 'common.actions',
  'Analitika uchun jadvaldagi raqamni bosing. Davom ettirish uchun Ctrl + click ishlating.': 'report.analyticsHint',
  'Ariza': 'common.application',
  "Arizalar bo'yicha dashboard": 'page.iptk.dashboard',
  "Arizalar bo'yicha hisobot": 'page.applications.report',
  'Arizalar': 'nav.applications',
  "Arizalar ro'yxati": 'page.applications.list',
  'Asosiy': 'nav.main',
  'Baholash': 'page.assessment',
  'Bayonnoma': 'page.protocol',
  "Baholashdan o'tkazish": 'action.assess',
  'Bekor qilish': 'action.cancel',
  'Boshlanish sanasi': 'filter.startDate',
  'Bosqich': 'common.stage',
  'Bolalar arizalari': 'nav.childrenApplications',
  'Bolalar murojaatlari': 'nav.childrenRequests',
  'Boshqaruv': 'nav.management',
  'Buyurtmalar': 'nav.orders',
  'Buyurtmanomalar': 'nav.subsidyRequests',
  'Dashboard': 'nav.dashboard',
  'Dalolatnomalar': 'page.statements',
  'Davomat': 'nav.attendance',
  'Erta aralashuv rejalari': 'nav.earlyInterventionPlans',
  'Erta aralashuv moduli': 'module.ei',
  'Foydalanuvchilar va rollar': 'module.users',
  'Filter': 'common.filter',
  'Filterlar': 'common.filters',
  'Fuqarolar reyestri': 'module.citizens',
  'Hisobotlar': 'nav.reports',
  'Hujjat': 'common.document',
  'Hujjatlar': 'nav.documents',
  'Hudud': 'common.region',
  'Ilovalar': 'nav.apps',
  'Info': 'nav.info',
  'Info 1': 'nav.info1',
  'Info 2': 'nav.info2',
  'Info 3': 'nav.info3',
  'Internat uylari': 'nav.homes',
  'IPTK': 'module.iptk',
  'Ijtimoiy navigator': 'module.snav',
  'IPTKga yuborish': 'action.sendToIptk',
  'Kirish': 'page.login',
  'Komissiyalar tarkibi': 'page.commissions',
  "Komissiya a'zolari": 'common.commissionMembers',
  "Ko'rish": 'action.view',
  'Kotib': 'common.secretary',
  "Ma'lumot topilmadi": 'common.noData',
  "Ma'lumot 1": 'nav.info1',
  "Ma'lumot 2": 'nav.info2',
  "Ma'lumot 3": 'nav.info3',
  "Ma'lumotnomalar": 'nav.info',
  'Maksimal yosh': 'common.maxAge',
  'Maksimum': 'common.maximum',
  'Manzil': 'common.address',
  'Minimal yosh': 'common.minAge',
  'Minimum': 'common.minimum',
  'Moliyalashtirish': 'nav.finance',
  'Modullar': 'nav.modules',
  'Monitoring': 'module.monitoring',
  'Mos tashxislar': 'page.diagnoses',
  'Muruvvat': 'module.muruvvat',
  'Nafaqalar': 'module.benefits',
  'Navbatlar': 'page.queues',
  'Natija': 'common.result',
  'Nogironlik guruhi': 'common.disabilityGroup',
  'Ochish': 'action.open',
  'Ortga': 'action.back',
  "O'rtacha": 'common.average',
  "O'chirish": 'action.delete',
  "Qarshi ko'rsatmalar": 'page.contraindications',
  'Qatorlar soni': 'common.rowsCount',
  'Qarorlar': 'page.decisions',
  'Qidirish': 'common.search',
  'Qidiruv yoki filter shartlariga mos yozuv topilmadi.': 'common.noSearchFilterResults',
  'Qidiruv shartlariga mos yozuv topilmadi.': 'common.noSearchResults',
  "Qisqa nomi": 'common.shortName',
  'Qabul qilingan arizalar': 'common.acceptedApplications',
  'Qabul jadvallari': 'page.receptionSchedules',
  "Qo'llash": 'action.apply',
  "Ro'yxatga olinganlar": 'page.registered',
  "Ro'yxatdan chiqarilganlar": 'nav.removedFromRegistry',
  "Ro'yxatdan chiqqanlar": 'page.removed',
  "So'rov": 'nav.request',
  "So'rovnomalar": 'nav.questionnaires',
  "So'rovnoma shabloni": 'page.questionnaireTemplate',
  'Sozlamalar': 'module.settings',
  'Sahifada:': 'common.onPage',
  'Saqlash': 'action.save',
  'Sana': 'common.date',
  'Status': 'common.status',
  'Tanlangan:': 'common.selected',
  'Tanlovni tozalash': 'action.clearSelection',
  'Tasdiqlash': 'action.approve',
  'Tahrirlash': 'action.edit',
  'Tashkilotlar': 'page.organizations',
  'Tashkilot turlari': 'page.organizationTypes',
  'Tadbirkorlar arizalari': 'nav.entrepreneurApplications',
  "Subsidiyalar / To'lovlar": 'nav.subsidiesPayments',
  "To'lovlar hisobi": 'page.ei.financePayments',
  "To'lovlar": 'module.payments',
  "Toifa guruhlari": 'page.categoryGroups',
  "To'liq nomi": 'common.fullName',
  'Tozalash': 'action.clear',
  'Tugash sanasi': 'filter.endDate',
  'Tuman (shahar)': 'common.district',
  'Tuman yoki shahar': 'common.district',
  'Tashxis': 'common.diagnosis',
  'Xizmat turlari': 'page.serviceTypes',
  'Xizmat oluvchi': 'common.serviceRecipient',
  'Xizmat turi': 'common.serviceType',
  'Xizmat': 'nav.service',
  'Xizmat olayotganlar': 'nav.activeServices',
  "Xizmat ko'rsatish": 'nav.serviceDelivery',
  "Xizmat ko'rsatuvchilar": 'nav.providers',
  "Xizmat ko'rsatuvchilar arizalari": 'page.ei.providersApplicationsReport',
  'Xulosalar': 'nav.conclusions',
  'Xizmati tugatilganlar': 'nav.terminatedServices',
  'Yaratish': 'action.create',
  'Yangilangan': 'common.updated',
  'Yuborish': 'action.send',
  'Yuklab olish': 'action.download',
  'Yuklanmoqda...': 'common.loading',
  'Jami': 'common.total',
  'Jami arizalar': 'common.totalApplications',
  'Jins': 'common.gender',
  'Rais': 'common.chair',
  "Rais o'rinbosari": 'common.deputyChair',
  'Rahbariyat': 'common.leadership',
  'Rasm': 'common.photo',
  "Rasm yo'q": 'common.noPhoto',
  'Reyestr': 'nav.registry',
  'Viloyat': 'common.region',
  'Vaucherlar': 'nav.vouchers',
  'Yosh': 'common.age',
  'Yopish': 'action.close',
}

const translations: Record<string, TranslationMap> = {
  'action.open': {
    en: 'Open',
    ru: 'Открыть',
    i18n: 'action.open',
  },
  'action.apply': {
    en: 'Apply',
    ru: 'Применить',
    i18n: 'action.apply',
  },
  'action.assess': {
    en: 'Start assessment',
    ru: 'Провести оценку',
    i18n: 'action.assess',
  },
  'action.back': {
    en: 'Back',
    ru: 'Назад',
    i18n: 'action.back',
  },
  'action.approve': {
    en: 'Approve',
    ru: 'Подтвердить',
    i18n: 'action.approve',
  },
  'action.cancel': {
    en: 'Cancel',
    ru: 'Отменить',
    i18n: 'action.cancel',
  },
  'action.clear': {
    en: 'Clear',
    ru: 'Очистить',
    i18n: 'action.clear',
  },
  'action.clearSelection': {
    en: 'Clear selection',
    ru: 'Очистить выбор',
    i18n: 'action.clearSelection',
  },
  'action.close': {
    en: 'Close',
    ru: 'Закрыть',
    i18n: 'action.close',
  },
  'action.create': {
    en: 'Create',
    ru: 'Создать',
    i18n: 'action.create',
  },
  'action.delete': {
    en: 'Delete',
    ru: 'Удалить',
    i18n: 'action.delete',
  },
  'action.download': {
    en: 'Download',
    ru: 'Скачать',
    i18n: 'action.download',
  },
  'action.edit': {
    en: 'Edit',
    ru: 'Редактировать',
    i18n: 'action.edit',
  },
  'action.save': {
    en: 'Save',
    ru: 'Сохранить',
    i18n: 'action.save',
  },
  'action.send': {
    en: 'Send',
    ru: 'Отправить',
    i18n: 'action.send',
  },
  'action.sendToIptk': {
    en: 'Send to IPTK',
    ru: 'Отправить в ИПТК',
    i18n: 'action.sendToIptk',
  },
  'action.view': {
    en: 'View',
    ru: 'Просмотр',
    i18n: 'action.view',
  },
  'common.actions': {
    en: 'Actions',
    ru: 'Действия',
    i18n: 'common.actions',
  },
  'common.acceptedApplications': {
    en: 'Accepted applications',
    ru: 'Принятые заявления',
    i18n: 'common.acceptedApplications',
  },
  'common.application': {
    en: 'Application',
    ru: 'Заявление',
    i18n: 'common.application',
  },
  'common.address': {
    en: 'Address',
    ru: 'Адрес',
    i18n: 'common.address',
  },
  'common.average': {
    en: 'Average',
    ru: 'Среднее',
    i18n: 'common.average',
  },
  'common.chair': {
    en: 'Chair',
    ru: 'Председатель',
    i18n: 'common.chair',
  },
  'common.commissionMembers': {
    en: 'Commission members',
    ru: 'Члены комиссии',
    i18n: 'common.commissionMembers',
  },
  'common.date': {
    en: 'Date',
    ru: 'Дата',
    i18n: 'common.date',
  },
  'common.age': {
    en: 'Age',
    ru: 'Возраст',
    i18n: 'common.age',
  },
  'common.diagnosis': {
    en: 'Diagnosis',
    ru: 'Диагноз',
    i18n: 'common.diagnosis',
  },
  'common.deputyChair': {
    en: 'Deputy chair',
    ru: 'Заместитель председателя',
    i18n: 'common.deputyChair',
  },
  'common.district': {
    en: 'District / city',
    ru: 'Район / город',
    i18n: 'common.district',
  },
  'common.disabilityGroup': {
    en: 'Disability group',
    ru: 'Группа инвалидности',
    i18n: 'common.disabilityGroup',
  },
  'common.document': {
    en: 'Document',
    ru: 'Документ',
    i18n: 'common.document',
  },
  'common.fullName': {
    en: 'Full name',
    ru: 'Полное наименование',
    i18n: 'common.fullName',
  },
  'common.gender': {
    en: 'Gender',
    ru: 'Пол',
    i18n: 'common.gender',
  },
  'common.filter': {
    en: 'Filter',
    ru: 'Фильтр',
    i18n: 'common.filter',
  },
  'common.filters': {
    en: 'Filters',
    ru: 'Фильтры',
    i18n: 'common.filters',
  },
  'common.leadership': {
    en: 'Leadership',
    ru: 'Руководство',
    i18n: 'common.leadership',
  },
  'common.loading': {
    en: 'Loading...',
    ru: 'Загрузка...',
    i18n: 'common.loading',
  },
  'common.maxAge': {
    en: 'Maximum age',
    ru: 'Максимальный возраст',
    i18n: 'common.maxAge',
  },
  'common.maximum': {
    en: 'Maximum',
    ru: 'Максимум',
    i18n: 'common.maximum',
  },
  'common.members': {
    en: 'Members',
    ru: 'Члены',
    i18n: 'common.members',
  },
  'common.membersCount': {
    en: 'Members count',
    ru: 'Количество членов',
    i18n: 'common.membersCount',
  },
  'common.minAge': {
    en: 'Minimum age',
    ru: 'Минимальный возраст',
    i18n: 'common.minAge',
  },
  'common.minimum': {
    en: 'Minimum',
    ru: 'Минимум',
    i18n: 'common.minimum',
  },
  'common.noData': {
    en: 'No data found',
    ru: 'Данные не найдены',
    i18n: 'common.noData',
  },
  'common.noSearchFilterResults': {
    en: 'No records match the search or filter conditions.',
    ru: 'По условиям поиска или фильтра записи не найдены.',
    i18n: 'common.noSearchFilterResults',
  },
  'common.noSearchResults': {
    en: 'No records match the search conditions.',
    ru: 'По условиям поиска записи не найдены.',
    i18n: 'common.noSearchResults',
  },
  'common.noPhoto': {
    en: 'No photo',
    ru: 'Нет фото',
    i18n: 'common.noPhoto',
  },
  'common.onPage': {
    en: 'On page:',
    ru: 'На странице:',
    i18n: 'common.onPage',
  },
  'common.photo': {
    en: 'Photo',
    ru: 'Фото',
    i18n: 'common.photo',
  },
  'common.region': {
    en: 'Region',
    ru: 'Регион',
    i18n: 'common.region',
  },
  'common.result': {
    en: 'Result',
    ru: 'Результат',
    i18n: 'common.result',
  },
  'common.rowsCount': {
    en: 'Rows count',
    ru: 'Количество строк',
    i18n: 'common.rowsCount',
  },
  'common.search': {
    en: 'Search',
    ru: 'Поиск',
    i18n: 'common.search',
  },
  'common.secretary': {
    en: 'Secretary',
    ru: 'Секретарь',
    i18n: 'common.secretary',
  },
  'common.serviceType': {
    en: 'Service type',
    ru: 'Вид услуги',
    i18n: 'common.serviceType',
  },
  'common.serviceRecipient': {
    en: 'Service recipient',
    ru: 'Получатель услуги',
    i18n: 'common.serviceRecipient',
  },
  'common.selected': {
    en: 'Selected:',
    ru: 'Выбрано:',
    i18n: 'common.selected',
  },
  'common.shortName': {
    en: 'Short name',
    ru: 'Краткое наименование',
    i18n: 'common.shortName',
  },
  'common.stage': {
    en: 'Stage',
    ru: 'Этап',
    i18n: 'common.stage',
  },
  'common.status': {
    en: 'Status',
    ru: 'Статус',
    i18n: 'common.status',
  },
  'common.total': {
    en: 'Total',
    ru: 'Итого',
    i18n: 'common.total',
  },
  'common.totalApplications': {
    en: 'Total applications',
    ru: 'Всего заявлений',
    i18n: 'common.totalApplications',
  },
  'common.updated': {
    en: 'Updated',
    ru: 'Обновлено',
    i18n: 'common.updated',
  },
  'filter.endDate': {
    en: 'End date',
    ru: 'Дата окончания',
    i18n: 'filter.endDate',
  },
  'filter.startDate': {
    en: 'Start date',
    ru: 'Дата начала',
    i18n: 'filter.startDate',
  },
  'module.benefits': {
    en: 'Benefits',
    ru: 'Пособия',
    i18n: 'module.benefits',
  },
  'module.citizens': {
    en: 'Citizens registry',
    ru: 'Реестр граждан',
    i18n: 'module.citizens',
  },
  'module.iptk': {
    en: 'IPTK',
    ru: 'ИПТК',
    i18n: 'module.iptk',
  },
  'module.monitoring': {
    en: 'Monitoring',
    ru: 'Мониторинг',
    i18n: 'module.monitoring',
  },
  'module.muruvvat': {
    en: 'Muruvvat',
    ru: 'Муравват',
    i18n: 'module.muruvvat',
  },
  'module.snav': {
    en: 'Social navigator',
    ru: 'Социальный навигатор',
    i18n: 'module.snav',
  },
  'module.ei': {
    en: 'Early Intervention',
    ru: 'Модуль раннего вмешательства',
    i18n: 'module.ei',
  },
  'module.payments': {
    en: 'Payments',
    ru: 'Платежи',
    i18n: 'module.payments',
  },
  'module.settings': {
    en: 'Settings',
    ru: 'Настройки',
    i18n: 'module.settings',
  },
  'module.users': {
    en: 'Users and roles',
    ru: 'Пользователи и роли',
    i18n: 'module.users',
  },
  'nav.applications': {
    en: 'Applications',
    ru: 'Заявления',
    i18n: 'nav.applications',
  },
  'nav.apps': {
    en: 'Apps',
    ru: 'Приложения',
    i18n: 'nav.apps',
  },
  'nav.dashboard': {
    en: 'Dashboard',
    ru: 'Дашборд',
    i18n: 'nav.dashboard',
  },
  'nav.main': {
    en: 'Main',
    ru: 'Основное',
    i18n: 'nav.main',
  },
  'nav.entrepreneurApplications': {
    en: 'Entrepreneur applications',
    ru: 'Заявления предпринимателей',
    i18n: 'nav.entrepreneurApplications',
  },
  'nav.childrenApplications': {
    en: 'Children applications',
    ru: 'Заявления детей',
    i18n: 'nav.childrenApplications',
  },
  'nav.providers': {
    en: 'Service providers',
    ru: 'Поставщики услуг',
    i18n: 'nav.providers',
  },
  'nav.childrenRequests': {
    en: 'Children requests',
    ru: 'Обращения детей',
    i18n: 'nav.childrenRequests',
  },
  'nav.service': {
    en: 'Service',
    ru: 'Услуга',
    i18n: 'nav.service',
  },
  'nav.serviceDelivery': {
    en: 'Service delivery',
    ru: 'Оказание услуги',
    i18n: 'nav.serviceDelivery',
  },
  'nav.finance': {
    en: 'Financing',
    ru: 'Финансирование',
    i18n: 'nav.finance',
  },
  'nav.conclusions': {
    en: 'Conclusions',
    ru: 'Заключения',
    i18n: 'nav.conclusions',
  },
  'nav.registry': {
    en: 'Registry',
    ru: 'Реестр',
    i18n: 'nav.registry',
  },
  'nav.vouchers': {
    en: 'Vouchers',
    ru: 'Ваучеры',
    i18n: 'nav.vouchers',
  },
  'nav.questionnaires': {
    en: 'Questionnaires',
    ru: 'Опросники',
    i18n: 'nav.questionnaires',
  },
  'nav.orders': {
    en: 'Orders',
    ru: 'Заказы',
    i18n: 'nav.orders',
  },
  'nav.activeServices': {
    en: 'Receiving services',
    ru: 'Получающие услугу',
    i18n: 'nav.activeServices',
  },
  'nav.earlyInterventionPlans': {
    en: 'Early intervention plans',
    ru: 'Планы раннего вмешательства',
    i18n: 'nav.earlyInterventionPlans',
  },
  'nav.attendance': {
    en: 'Attendance',
    ru: 'Посещаемость',
    i18n: 'nav.attendance',
  },
  'nav.terminatedServices': {
    en: 'Terminated services',
    ru: 'Прекращенные услуги',
    i18n: 'nav.terminatedServices',
  },
  'nav.subsidyRequests': {
    en: 'Subsidy requests',
    ru: 'Заявки на субсидии',
    i18n: 'nav.subsidyRequests',
  },
  'nav.subsidiesPayments': {
    en: 'Subsidies / Payments',
    ru: 'Субсидии / Платежи',
    i18n: 'nav.subsidiesPayments',
  },
  'nav.request': {
    en: 'Request',
    ru: 'Запрос',
    i18n: 'nav.request',
  },
  'nav.registered': {
    en: 'Registered',
    ru: 'Поставленные на учет',
    i18n: 'nav.registered',
  },
  'nav.removed': {
    en: 'Removed',
    ru: 'Снятые с учета',
    i18n: 'nav.removed',
  },
  'nav.removedFromRegistry': {
    en: 'Removed from registry',
    ru: 'Снятые с учета',
    i18n: 'nav.removedFromRegistry',
  },
  'nav.documents': {
    en: 'Documents',
    ru: 'Документы',
    i18n: 'nav.documents',
  },
  'nav.homes': {
    en: 'Residential homes',
    ru: 'Дома-интернаты',
    i18n: 'nav.homes',
  },
  'nav.info': {
    en: 'References',
    ru: 'Инфо',
    i18n: 'nav.info',
  },
  'nav.organizations': {
    en: 'Organizations',
    ru: 'Организации',
    i18n: 'nav.organizations',
  },
  'nav.organizationTypes': {
    en: 'Organization types',
    ru: 'Типы организаций',
    i18n: 'nav.organizationTypes',
  },
  'nav.receptionSchedules': {
    en: 'Reception schedules',
    ru: 'Reception schedules',
    i18n: 'nav.receptionSchedules',
  },
  'nav.info1': {
    en: 'Reference 1',
    ru: 'Справочник 1',
    i18n: 'nav.info1',
  },
  'nav.info2': {
    en: 'Reference 2',
    ru: 'Справочник 2',
    i18n: 'nav.info2',
  },
  'nav.info3': {
    en: 'Reference 3',
    ru: 'Справочник 3',
    i18n: 'nav.info3',
  },
  'nav.management': {
    en: 'Management',
    ru: 'Управление',
    i18n: 'nav.management',
  },
  'nav.modules': {
    en: 'Modules',
    ru: 'Модули',
    i18n: 'nav.modules',
  },
  'nav.reports': {
    en: 'Reports',
    ru: 'Отчеты',
    i18n: 'nav.reports',
  },
  'nav.protocol': {
    en: 'Protocol',
    ru: 'Протокол',
    i18n: 'nav.protocol',
  },
  'page.applications.list': {
    en: 'Applications list',
    ru: 'Список заявлений',
    i18n: 'page.applications.list',
  },
  'page.applications.report': {
    en: 'Applications report',
    ru: 'Отчет по заявлениям',
    i18n: 'page.applications.report',
  },
  'page.assessment': {
    en: 'Assessment',
    ru: 'Оценка',
    i18n: 'page.assessment',
  },
  'page.protocol': {
    en: 'Protocol',
    ru: 'Протокол',
    i18n: 'page.protocol',
  },
  'page.categoryGroups': {
    en: 'Category groups',
    ru: 'Группы категорий',
    i18n: 'page.categoryGroups',
  },
  'page.commissions': {
    en: 'Commission composition',
    ru: 'Состав комиссий',
    i18n: 'page.commissions',
  },
  'page.contraindications': {
    en: 'Contraindications',
    ru: 'Противопоказания',
    i18n: 'page.contraindications',
  },
  'page.dashboard.metrics': {
    en: 'Key indicators',
    ru: 'Основные показатели',
    i18n: 'page.dashboard.metrics',
  },
  'page.decisions': {
    en: 'Decisions',
    ru: 'Решения',
    i18n: 'page.decisions',
  },
  'page.diagnoses': {
    en: 'Matching diagnoses',
    ru: 'Подходящие диагнозы',
    i18n: 'page.diagnoses',
  },
  'page.homes.report': {
    en: 'Residential homes report',
    ru: 'Отчет по домам-интернатам',
    i18n: 'page.homes.report',
  },
  'page.ei.providersApplications': {
    en: 'Provider applications',
    ru: 'Заявления поставщиков услуг',
    i18n: 'page.ei.providersApplications',
  },
  'page.ei.providersApplicationsReport': {
    en: 'Provider applications report',
    ru: 'Provider applications report',
    i18n: 'page.ei.providersApplicationsReport',
  },
  'page.ei.providersConclusions': {
    en: 'Provider conclusions',
    ru: 'Заключения поставщиков услуг',
    i18n: 'page.ei.providersConclusions',
  },
  'page.ei.providersRegistry': {
    en: 'Provider registry',
    ru: 'Реестр поставщиков услуг',
    i18n: 'page.ei.providersRegistry',
  },
  'page.ei.childrenQuestionnaires': {
    en: 'Children questionnaires',
    ru: 'Опросники детей',
    i18n: 'page.ei.childrenQuestionnaires',
  },
  'page.ei.childrenVouchers': {
    en: 'Children vouchers',
    ru: 'Ваучеры детей',
    i18n: 'page.ei.childrenVouchers',
  },
  'page.ei.childrenOrders': {
    en: 'Children orders',
    ru: 'Заказы детей',
    i18n: 'page.ei.childrenOrders',
  },
  'page.ei.serviceActive': {
    en: 'Receiving services',
    ru: 'Получающие услугу',
    i18n: 'page.ei.serviceActive',
  },
  'page.ei.servicePlans': {
    en: 'Early intervention plans',
    ru: 'Планы раннего вмешательства',
    i18n: 'page.ei.servicePlans',
  },
  'page.ei.serviceAttendance': {
    en: 'Attendance',
    ru: 'Посещаемость',
    i18n: 'page.ei.serviceAttendance',
  },
  'page.ei.serviceTerminated': {
    en: 'Terminated services',
    ru: 'Прекращенные услуги',
    i18n: 'page.ei.serviceTerminated',
  },
  'page.ei.financeSubsidyRequests': {
    en: 'Subsidy requests',
    ru: 'Заявки на субсидии',
    i18n: 'page.ei.financeSubsidyRequests',
  },
  'page.ei.financePayments': {
    en: 'Payment calculation',
    ru: 'Расчет платежей',
    i18n: 'page.ei.financePayments',
  },
  'page.iptk.dashboard': {
    en: 'Applications dashboard',
    ru: 'Дашборд по заявлениям',
    i18n: 'page.iptk.dashboard',
  },
  'page.login': {
    en: 'Login',
    ru: 'Вход',
    i18n: 'page.login',
  },
  'page.organizations': {
    en: 'Organizations',
    ru: 'Организации',
    i18n: 'page.organizations',
  },
  'page.organizationTypes': {
    en: 'Organization types',
    ru: 'Типы организаций',
    i18n: 'page.organizationTypes',
  },
  'page.receptionSchedules': {
    en: 'Reception schedules',
    ru: 'Reception schedules',
    i18n: 'page.receptionSchedules',
  },
  'page.queues': {
    en: 'Queues',
    ru: 'Очереди',
    i18n: 'page.queues',
  },
  'page.questionnaireTemplate': {
    en: 'Questionnaire template',
    ru: 'Шаблон анкеты',
    i18n: 'page.questionnaireTemplate',
  },
  'page.registered': {
    en: 'Registered',
    ru: 'Зарегистрированные',
    i18n: 'page.registered',
  },
  'page.removed': {
    en: 'Removed from registry',
    ru: 'Снятые с учета',
    i18n: 'page.removed',
  },
  'page.serviceTypes': {
    en: 'Service types',
    ru: 'Виды услуг',
    i18n: 'page.serviceTypes',
  },
  'page.statements': {
    en: 'Statements',
    ru: 'Акты',
    i18n: 'page.statements',
  },
  'report.analyticsHint': {
    en: 'Click a table number for analytics. Use Ctrl + click to continue selection.',
    ru: 'Нажмите на число в таблице для аналитики. Для продолжения выбора используйте Ctrl + click.',
    i18n: 'report.analyticsHint',
  },
}

export function translateText(value: string, targetLocale = locale.value) {
  if (targetLocale === 'uz-Cyrl') return uzbekScript(value,true)
  if (targetLocale === 'uz') return value

  const key = translationKeys[value] ?? value
  return translations[key]?.[targetLocale] ?? (targetLocale === 'i18n' ? key : value)
}

export function useI18n() {
  const currentLanguage = computed(() => appLanguages.find((language) => language.code === locale.value) ?? appLanguages[0])

  function setLocale(nextLocale: AppLocale) {
    locale.value = nextLocale

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, nextLocale)
    }
  }

  function t(value: string) {
    return translateText(value, locale.value)
  }

  return {
    locale,
    languages: appLanguages,
    currentLanguage,
    setLocale,
    t,
  }
}

export function benefitText(value:unknown):string {
  const text=String(value??'')
  return uzbekScript(text,locale.value==='uz-Cyrl')
}
