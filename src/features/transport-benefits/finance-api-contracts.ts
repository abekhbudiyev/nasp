import { documentTypes } from './reimbursement'

const json = (value: unknown) => JSON.stringify(value, null, 2)
const ref = (id: number, code: string) => ({ id, code })
const documents = documentTypes.map((type, i) => ({ type: ref(type.id, type.code), file_id: `FILE-00${i + 1}` }))
const lines = [{ line_id: '1', ticket_id: 'UTY-78394510', requested_amount_minor: 24800000 }, { line_id: '2', ticket_id: 'UTY-78394418', requested_amount_minor: 31200000 }]
export const financeApiDefinitions = [
  {
    id: 'file-config', method: 'GET', endpoint: '/v1/file-configs?purpose_code=TRANSPORT_REIMBURSEMENT',
    title: '1. Kerakli fayllar ro‘yxatini olish', consumers: 'Transport tashkiloti → bizning tizim',
    description: 'Hujjat nomlari, ruxsat etilgan kengaytmalar va majburiylik shartlari qaytadi. Frontend yuklash maydonlarini shu javobdan shakllantiradi. Kengaytmalar namuna, yakuniy ro‘yxat ma’lumotnomada boshqariladi.',
    variants: ['GET · fayl sozlamalari'], sample: 'Query: purpose_code=TRANSPORT_REIMBURSEMENT\nRequest body talab qilinmaydi.',
    response: json({ purpose: ref(1, 'TRANSPORT_REIMBURSEMENT'), files: documentTypes.map((type, i) => ({ id: type.id, code: type.code, name: type.name, extensions: i === 0 ? ['pdf', 'zip'] : ['pdf', 'xlsx', 'xls'], required: true, ...(i === 1 ? { required_when: { electronic_tickets: true } } : {}) })) }),
  },
  {
    id: 'file-create', method: 'POST', endpoint: '/v1/files', title: '2. Faylni alohida yuklash', consumers: 'Transport tashkiloti → fayl xizmati',
    description: 'Fayl buyurtmanomadan alohida yuklanadi. Hujjat turi fileconfig javobidan olinadi. Buyurtmanomada faqat olingan file_id ishlatiladi.', variants: ['multipart/form-data'],
    sample: 'type_id: 1\ntype_code: TICKET_COPY\nfile: chipta-nusxalari.pdf (binary)',
    response: json({ file_id: 'FILE-001', type: ref(1, 'TICKET_COPY'), file_name: 'chipta-nusxalari.pdf', size_bytes: 245760 }),
  },
  {
    id: 'reimbursement-create', method: 'POST', endpoint: '/v1/reimbursement-requests', title: '3. Oylik buyurtmanomani yuborish', consumers: 'Transport tashkiloti → bizning tizim',
    description: 'Davr, bank rekvizitlari, chipta qatorlari va fayl raqamlari yuboriladi. Summalar tiyinda: 24800000 = 248 000 so‘m. Qabul javobi to‘lov tasdiqlanganini anglatmaydi.', variants: ['Yagona API · barcha transportlar'],
    sample: json({ source_request_id: 'BUY-2026-10-001', period: '2026-10', bank_account: { account_number: '20208000000000000001', bank_code: '00444' }, currency: ref(1, 'UZS'), lines, documents }),
    response: json({ request_id: 'REQ-001', source_request_id: 'BUY-2026-10-001', version: 1, request_status: ref(1, 'RECEIVED'), payment_status: ref(1, 'NOT_SENT'), requested_amount_minor: 56000000, received_at: '2026-11-05T10:00:00+05:00' }),
  },
  {
    id: 'reimbursement-correct', method: 'POST', endpoint: '/v1/reimbursement-requests/{request_id}/corrections', title: '4. Buyurtmanomani tuzatish', consumers: 'Transport tashkiloti → bizning tizim',
    description: 'Tekshiruvda xato topilsa yangi versiya yuboriladi. lines joriy ro‘yxatni almashtiradi, documents esa ko‘rsatilgan hujjat turini yangilaydi. Oldingi versiya saqlanadi. Tasdiqlangan va to‘lovga yuborilgan versiya o‘zgartirilmaydi.', variants: ['REQ-001 · base_version=1'],
    sample: json({ base_version: 1, lines: [lines[0], { ...lines[1], requested_amount_minor: 30000000 }], documents: [{ type: ref(3, 'COST_CALCULATION'), file_id: 'FILE-004' }] }),
    response: json({ request_id: 'REQ-001', version: 2, request_status: ref(1, 'RECEIVED'), requested_amount_minor: 54800000 }),
  },
  {
    id: 'subsidy-submit', method: 'POST', endpoint: 'Subsidiya moduli · to‘lov yaratish API', title: '5. Tasdiqlangan summani to‘lovga yuborish', consumers: 'Bizning tizim → subsidiya moduli',
    description: 'Ichki almashinuv. Endpoint va tashqi statuslar subsidiya modulining haqiqiy kontraktiga moslashtiriladi. To‘lov aynan tasdiqlangan versiya, summa va hisobvaraq bilan bog‘lanadi.', variants: ['Ichki integratsiya · taklif etilgan model'],
    sample: json({ external_request_id: 'REQ-001-V2', request_id: 'REQ-001', request_version: 2, recipient: { organization_id: 'ORG-UTY', bank_account: '20208000000000000001', bank_code: '00444' }, currency: ref(1, 'UZS'), amount_minor: 54800000, purpose: '2026-yil oktabr oyidagi imtiyozli chipta xarajatlarini qoplash' }),
    response: json({ external_request_id: 'REQ-001-V2', payment_id: 'PAY-001', payment_status: ref(2, 'PROCESSING'), accepted_amount_minor: 54800000 }),
  },
  {
    id: 'payment-event', method: 'POST', endpoint: '/v1/payment-events', title: '6. To‘lov natijasini qabul qilish', consumers: 'Subsidiya moduli → bizning tizim',
    description: 'To‘lov raqami, versiya va summa solishtiriladi. PAID faqat to‘lov tasdig‘idan keyin beriladi. Takroriy xabar qayta to‘lov yaratmaydi.', variants: ['PROCESSING', 'PAID', 'FAILED'],
    sample: json({ source_event_id: 'SUB-EVENT-001', external_request_id: 'REQ-001-V2', payment_id: 'PAY-001', payment_status: ref(3, 'PAID'), paid_amount_minor: 54800000, paid_at: '2026-11-09T14:30:00+05:00', payment_document_number: 'TO-2026-00981' }),
    response: json({ event_id: 'PAY-EVENT-001', source_event_id: 'SUB-EVENT-001', received: true }),
  },
  {
    id: 'carrier-notification', method: 'POST', endpoint: 'Tashuvchining kelishilgan xabar qabul qilish manzili', title: '7. Tashkilotga natijani yuborish', consumers: 'Bizning tizim → transport tashkiloti',
    description: 'Buyurtmanoma yoki to‘lov holati o‘zgarganda xabar yuboriladi. Manzil integratsiya sozlamalarida belgilanadi; buyurtmanomada yuborilmaydi. Yetib bormagan xabar qayta yuboriladi.', variants: ['Callback · status o‘zgarishi'],
    sample: json({ notification_id: 'NTF-001', request_id: 'REQ-001', source_request_id: 'BUY-2026-10-001', version: 2, request_status: ref(4, 'APPROVED'), payment_status: ref(3, 'PAID'), payment_id: 'PAY-001', paid_amount_minor: 54800000, paid_at: '2026-11-09T14:30:00+05:00' }),
    response: json({ notification_id: 'NTF-001', received: true }),
  },
  {
    id: 'reimbursement-status', method: 'GET', endpoint: '/v1/reimbursement-requests/{request_id}', title: '8. Raqam bo‘yicha holatni olish', consumers: 'Transport tashkiloti → bizning tizim',
    description: 'Tashuvchi xabarnomani kutmasdan joriy holatni so‘rashi mumkin. Tuzatish kerak bo‘lsa line_results ichida qator va xato sababi qaytariladi.', variants: ['REQ-001'], sample: 'Path: request_id=REQ-001\nRequest body talab qilinmaydi.',
    response: json({ request_id: 'REQ-001', source_request_id: 'BUY-2026-10-001', version: 2, period: '2026-10', request_status: ref(4, 'APPROVED'), payment_status: ref(3, 'PAID'), currency: ref(1, 'UZS'), requested_amount_minor: 54800000, approved_amount_minor: 54800000, paid_amount_minor: 54800000, payment_id: 'PAY-001', paid_at: '2026-11-09T14:30:00+05:00', payment_document_number: 'TO-2026-00981' }),
  },
]

export const correctionStatusSample = json({ request_id: 'REQ-001', version: 1, request_status: ref(2, 'NEEDS_CORRECTION'), payment_status: ref(1, 'NOT_SENT'), line_results: [{ line_id: '2', ticket_id: 'UTY-78394418', valid: false, errors: [{ reason: ref(2, 'AMOUNT_MISMATCH'), message: 'So‘ralgan summa chipta hisob-kitobiga mos emas.', expected_amount_minor: 30000000 }] }] })
export const reimbursementReasons = [
  { id: 1, code: 'TICKET_NOT_FOUND', name: 'Chipta topilmadi' },
  { id: 2, code: 'AMOUNT_MISMATCH', name: 'Summa mos emas' },
  { id: 3, code: 'TICKET_NOT_CLAIMABLE', name: 'Chipta qoplashga mos emas' },
  { id: 4, code: 'ALREADY_CLAIMED', name: 'Chipta avvalgi buyurtmanomaga kiritilgan' },
  { id: 5, code: 'DOCUMENT_MISSING', name: 'Majburiy hujjat yo‘q' },
  { id: 6, code: 'FILE_NOT_FOUND', name: 'Fayl topilmadi' },
  { id: 7, code: 'FILE_OWNER_MISMATCH', name: 'Fayl boshqa tashkilotga tegishli' },
  { id: 8, code: 'BANK_ACCOUNT_MISMATCH', name: 'Bank hisobvarag‘i mos emas' },
  { id: 9, code: 'PERIOD_MISMATCH', name: 'Chipta davrga mos emas' },
  { id: 10, code: 'OTHER_PAYMENT_CHANNEL', name: 'Boshqa to‘lov kanali' },
]
