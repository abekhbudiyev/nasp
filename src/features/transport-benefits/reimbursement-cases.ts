import { documentTypes, type ReimbursementRequest, type ReimbursementTicket, type RegisteredFile } from './reimbursement'
import { carrierOptions } from './reference-data'

export function caseOrganization(id: string) {
  const number = Number(id.match(/CASE-(\d+)/)?.[1] || 1)
  const organizations = carrierOptions.filter(c => c.transportMode)
  const organization = organizations[(number - 1) % organizations.length]
  if (!organization?.transportMode) throw new Error('Sinov holatlari uchun transport turi ko‘rsatilgan tashkilot topilmadi.')
  return { carrier: organization.label, carrierCode: organization.code, transportMode: organization.transportMode }
}

export function normalizeCaseOrganization(request: ReimbursementRequest): ReimbursementRequest {
  if (!request.demoCase || request.carrier !== 'Sinov transport tashkiloti') return request
  const organization = caseOrganization(request.id)
  return { ...request, ...organization, demoTickets: request.demoTickets?.map(ticket => ({ ...ticket, carrier: organization.carrier, transportMode: organization.transportMode })) }
}

/** Isolated prototype fixtures: these tickets never enter the carrier's real ticket register. */
export function createReimbursementCases() {
  const files: RegisteredFile[] = []
  const cases = [
    ['Tasdiqlash kutilmoqda', 'RECEIVED', 'NOT_SENT'],
    ['Qaytarilgan chipta — tasdiqlash mumkin emas', 'RECEIVED', 'NOT_SENT'],
    ['Bekor qilingan buyurtmanoma', 'CANCELLED', 'NOT_SENT'],
    ['Hujjatlar tayyor — tasdiqlash kutilmoqda', 'RECEIVED', 'NOT_SENT'],
    ['To‘lov javobi kutilmoqda', 'APPROVED', 'PROCESSING'],
    ['To‘lov yakunlangan', 'APPROVED', 'PAID'],
    ['To‘lov bajarilmagan', 'APPROVED', 'FAILED'],
  ] as const
  const requests = cases.map(([name, status, payment], index): ReimbursementRequest => {
    // Keep existing saved cases intact; cancellation is a new fixture, not a rewrite of CASE-3.
    const number = index === 2 ? 8 : index + 1
    const id = `CASE-${number}`
    const at = new Date().toISOString()
    const organization = caseOrganization(id)
    const { carrier, transportMode } = organization
    const amount = (index + 1) * 100000
    const ticket: ReimbursementTicket = {
      id: `${id}-EVENT`, ticketId: `${id}-TICKET`, carrier, occurredAt: '2026-10-05T10:00:00+05:00',
      transportMode, ticketState: index === 1 ? 'RETURNED' : 'ISSUED',
      amount, preferentialAmount: 0, compensationRequested: amount, evidenceRef: `${id}-EVIDENCE`,
      paymentChannel: 'MONTHLY_CLAIM', route: 'Toshkent — Samarqand',
    }
    const docs = documentTypes.map(type => {
      const fileId = `${id}-FILE-${type.id}`
      files.push({ id: fileId, name: `${id}-${type.code.toLowerCase()}.pdf`, carrier, size: 0, uploadedAt: at, sample: true, typeCode: type.code })
      return { type: { id: type.id, code: type.code }, file_id: fileId }
    })
    const history = [{ at, text: 'Sinov buyurtmanomasi qabul qilindi' }]
    if (status === 'APPROVED') history.push({ at, text: 'Chiptalar tekshirildi' })
    if (status === 'CANCELLED') history.push({ at, text: 'Buyurtmanoma bekor qilindi: tashuvchi noto‘g‘ri buyurtmanoma yuborgan (sinov)' })
    if (status === 'APPROVED') history.push({ at, text: 'Summa va bank hisob raqami tasdiqlandi (sinov)' })
    if (payment !== 'NOT_SENT') history.push({ at, text: 'To‘lov tizimiga yuborildi (sinov)' })
    if (payment === 'PAID' || payment === 'FAILED') history.push({ at, text: payment === 'PAID' ? 'To‘lov yakunlandi (sinov)' : 'Bank to‘lovni bajarmadi. Hisob raqamini tekshirish va qayta yuborish kerak (sinov)' })
    return {
      id, sourceId: `SINOV-BUY-${number}`, ...organization, period: '2026-10', account: '20208000000000000001',
      documents: docs.filter(d => d.type.code === 'COST_CALCULATION'),
      lines: [{ ticketId: ticket.ticketId, requested: amount, documents: docs.filter(d => d.type.code !== 'COST_CALCULATION'),
        ...(index === 1 ? { error: 'Chipta qaytarilgan, qoplashga yaroqli emas' } : {}) }],
      status, payment, approvedAmount: status === 'APPROVED' ? amount : 0, receivedAt: at, electronicTickets: true,
      ...(payment !== 'NOT_SENT' ? { paymentId: `${id}-PAYMENT` } : {}),
      ...(payment === 'PAID' ? { paidAt: at, paymentDocument: `${id}-PAYMENT-DOC` } : {}),
      history, notifications: status === 'RECEIVED' ? [] : [{ at, status: `${status} / ${payment}` }],
      demoCase: name, demoTickets: [ticket],
    }
  })
  return { requests, files }
}
