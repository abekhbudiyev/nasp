import { userLabel } from './ui-labels'

export const requestStatuses = [
  { id: 1, code: 'RECEIVED', name: 'Qabul qilindi' },
  { id: 2, code: 'NEEDS_CORRECTION', name: 'Tuzatish kerak' },
  { id: 3, code: 'VALIDATED', name: 'Tekshirildi' },
  { id: 4, code: 'APPROVED', name: 'Tasdiqlandi' },
] as const
export const paymentStatuses = [
  { id: 1, code: 'NOT_SENT', name: 'Yuborilmagan' },
  { id: 2, code: 'PROCESSING', name: 'To‘lov jarayonida' },
  { id: 3, code: 'PAID', name: 'To‘langan' },
  { id: 4, code: 'FAILED', name: 'To‘lov bajarilmadi' },
] as const
export type RequestStatus = typeof requestStatuses[number]['code']
export type PaymentStatus = typeof paymentStatuses[number]['code']
export interface ReimbursementTicket {
  id: string; ticketId: string; carrier: string; occurredAt: string; transportMode: string
  ticketState: string; amount: number; preferentialAmount: number; compensationRequested: number
  evidenceRef: string; paymentChannel: string; route: string; previousTicketId?: string
}
export interface ClaimLine { ticketId: string; requested: number; error?: string }
export const documentTypes = [
  { id: 1, code: 'TICKET_COPY', name: 'Chipta nusxalari' },
  { id: 2, code: 'ROUTE_SHEET', name: 'Yo‘nalish qaydnomasi (elektron chiptalar uchun)' },
  { id: 3, code: 'COST_CALCULATION', name: 'So‘ralayotgan summa hisob-kitobi' },
] as const
export interface RequestDocument { type: { id: number; code: string }; file_id: string }
export interface RegisteredFile {
  id: string; name: string; carrier: string; size: number; uploadedAt: string; sample: boolean
}
export interface ReimbursementRequest {
  id: string; sourceId: string; carrier: string; period: string; account: string
  documents: RequestDocument[]; lines: ClaimLine[]; status: RequestStatus; payment: PaymentStatus
  receivedAt: string; approvedAmount: number; paymentId?: string; paymentDocument?: string
  paidAt?: string; history: { at: string; text: string }[]; notifications: { at: string; status: string }[]
}
export function eventMonth(value: string): string {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  return match ? `${match[3]}-${match[2]}` : value.slice(0, 7)
}
export function latestTickets(events: ReimbursementTicket[]): ReimbursementTicket[] {
  const result = new Map<string, ReimbursementTicket>()
  const timestamp = (value: string) => {
    const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/)
    return match ? `${match[3]}-${match[2]}-${match[1]}T${match[4]}:${match[5]}` : value
  }
  for (const event of events) {
    const previous = result.get(event.ticketId)
    if (!previous || timestamp(event.occurredAt) > timestamp(previous.occurredAt)) result.set(event.ticketId, event)
  }
  return [...result.values()]
}
export function validateLines(request: ReimbursementRequest, events: ReimbursementTicket[], others: ReimbursementRequest[]): ClaimLine[] {
  const tickets = latestTickets(events)
  return request.lines.map(line => {
    const ticket = tickets.find(t => t.ticketId === line.ticketId)
    let error = ''
    if (!ticket) error = 'Chipta reyestrda topilmadi'
    else if (ticket.carrier !== request.carrier) error = 'Chipta boshqa tashuvchiga tegishli'
    else if (!events.some(e => e.ticketId === ticket.ticketId && eventMonth(e.occurredAt) === request.period)) error = 'Chipta davrga mos emas'
    else if (request.lines.filter(l => l.ticketId === line.ticketId).length > 1) error = 'Buyurtmanomada takroriy chipta'
    else if (ticket.paymentChannel !== 'MONTHLY_CLAIM') error = 'Boshqa to‘lov kanalidagi chipta'
    else if (!['ISSUED', 'TRAVELLED'].includes(ticket.ticketState)) error = `Chiptani alohida tekshirish kerak: ${userLabel(ticket.ticketState)}`
    else if (tickets.some(t => t.previousTicketId === ticket.ticketId)) error = 'Chipta almashtirilgan'
    else if (!ticket.evidenceRef) error = 'Chipta dalili yetishmaydi'
    else if (!Number.isSafeInteger(line.requested) || line.requested <= 0 || line.requested !== ticket.compensationRequested) error = 'Qoplash summasi reyestrga mos emas'
    else if (others.some(r => r.id !== request.id && r.status === 'APPROVED' && r.lines.some(l => l.ticketId === line.ticketId))) error = 'Chipta avvalgi tasdiqlangan buyurtmanomada mavjud'
    return { ...line, error: error || undefined }
  })
}
