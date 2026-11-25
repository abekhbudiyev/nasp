type Field = readonly [name: string, description: string]
interface ExchangeContract {
  title: string
  actor: string
  direction: string
  request: readonly Field[]
  response: readonly Field[]
}

export const exchangeContracts = {
  intake: {
    title: 'Murojaatni qabul qilish',
    actor: 'IMPdagi individual reja tasdig‘i yoki YaIDXP, DXM va Baraka orqali yuborilgan murojaat',
    direction: 'Murojaat manbasi → Inson',
    request: [['SOURCE', 'Murojaat kanali'], ['SOURCE_REFERENCE', 'Manbadagi murojaat yoki individual reja raqami'], ['BENEFICIARY_ID', 'Imtiyoz oluvchining identifikatori'], ['VOUCHER_TYPE', 'Bog‘cha yoki to‘garak']],
    response: [['INTAKE_ID', 'Insondagi murojaat raqami'], ['STATUS', 'Tekshiruvda']],
  },
  review: {
    title: 'Murojaatni tekshirish',
    actor: 'Insonda murojaatni ko‘rib chiquvchi mas’ul',
    direction: 'Inson ichida',
    request: [['INTAKE_ID', 'Ko‘rib chiqilayotgan murojaat']],
    response: [['STATUS', 'Tasdiqlangan yoki rad etilgan'], ['APPLICATION_ID', 'Ijobiy tekshiruvdan keyin shakllangan ariza raqami']],
  },
  issue: {
    title: 'Vaucher shakllantirish',
    actor: 'Inson tasdiqlangan arizani yuboradi, Imtiyozlar moduli vaucherni avtomatik yaratadi',
    direction: 'Inson → IHMA Imtiyozlar moduli',
    request: [['APPLICATION_ID', 'Tasdiqlangan ariza raqami'], ['BENEFICIARY_ID', 'Imtiyoz oluvchi identifikatori'], ['VOUCHER_TYPE', 'Vaucher turi']],
    response: [['VOUCHER_ID', 'Tizimlararo identifikator'], ['DATE', 'Vaucher berilgan sana']],
  },
  publish: {
    title: 'Vaucher yozuvini Ta’limga yetkazish',
    actor: 'IHMA Imtiyozlar moduli',
    direction: 'IHMA → Ta’lim tizimining API si',
    request: [['VOUCHER_ID', 'Tizimlararo identifikator'], ['VOUCHER_TYPE', 'Vaucher turi'], ['DATE', 'Berilgan sana']],
    response: [['STATUS', 'Yozuv qabul qilinganligi haqidagi tasdiq']],
  },
  notify: {
    title: 'Fuqaroni xabardor qilish',
    actor: 'IHMA, fuqaro uchun tanlangan kanallar orqali',
    direction: 'IHMA → MyGov va Baraka (tashqi) · MyIHMA va Telegram bot (ichki)',
    request: [['VOUCHER_ID', 'Vaucherga bog‘langan identifikator'], ['STATUS', 'Vaucher shakllanganligi haqidagi xabar']],
    response: [],
  },
  citizen: {
    title: 'Vaucherni ko‘rish va kodni berish',
    actor: 'Fuqaro tanlagan muassasasiga vaucher IDsi va amaldagi kodni taqdim etadi',
    direction: 'Fuqaro kabineti yoki qog‘oz vaucher → fuqaro → muassasa',
    request: [],
    response: [['VOUCHER_ID', 'Tizimlararo identifikator'], ['DOC_NUMBER', 'Vaucher seriyasi va raqami'], ['DATE', 'Berilgan sana'], ['ACTIVATION_CODE', 'Amaldagi bir martalik kod'], ['INSTITUTION', 'Faol muassasa, mavjud bo‘lsa']],
  },
  verify: {
    title: 'Faollashtirish kodini tekshirish',
    actor: 'Muassasa xodimi fuqaro bergan kodni kiritadi, IHMA uni tekshiradi',
    direction: 'Ta’lim tizimi → IHMA API si',
    request: [['VOUCHER_ID', 'Fuqaro taqdim etgan identifikator'], ['INSTITUTION_ID', 'So‘rov yuborgan muassasa identifikatori'], ['ACTIVATION_CODE', 'Fuqaro bergan kod · jurnalda niqoblanadi']],
    response: [['RESULT', 'MUMKIN yoki MUMKIN_EMAS'], ['AUTHORIZATION_ID', 'Ijobiy javobdagi bir martalik ruxsat'], ['EXPIRES_AT', 'Ruxsatning tugash vaqti'], ['REASON', 'Rad etilganida sabab']],
  },
  confirm: {
    title: 'Faollashtirish yoki ko‘chirishni tasdiqlash',
    actor: 'Muassasa xodimi tasdiqlaydi, IHMA biriktiruvni va kodni yangilaydi',
    direction: 'Ta’lim tizimi → IHMA API si',
    request: [['VOUCHER_ID', 'Vaucher identifikatori'], ['INSTITUTION_ID', 'Tanlangan muassasa identifikatori'], ['AUTHORIZATION_ID', 'IHMA bergan ruxsat'], ['ACTIVATED_ON', 'Faollashtirish sanasi']],
    response: [['STATUS', 'FAOL'], ['VOUCHER_ID', 'Biriktirilgan vaucher'], ['PREVIOUS_INSTITUTION_ID', 'Ko‘chirishda yopilgan biriktiruv']],
  },
  payment: {
    title: 'Oylik qoplama yozuvini yuborish',
    actor: 'Ta’lim tizimi amalda to‘langan summalarni yuboradi, IHMA qabul qiladi',
    direction: 'Ta’lim tizimi → IHMA API si',
    request: [['PAYMENT_ID', 'Oylik yozuv identifikatori'], ['VOUCHER_ID', 'Vaucher identifikatori'], ['INSTITUTION_ID', 'Xizmat ko‘rsatgan muassasa'], ['MONTH', 'Hisob-kitob oyi · YYYY-MM'], ['PAID_AMOUNT', 'Amalda to‘langan summa, so‘m'], ['TRAVEL_PAID_AMOUNT', 'To‘garak uchun amalda to‘langan yo‘lkira, so‘m']],
    response: [['STATUS', 'Yozuv qabul qilinganligi haqidagi tasdiq']],
  },
} satisfies Record<string, ExchangeContract>

export type ExchangeStep = keyof typeof exchangeContracts
