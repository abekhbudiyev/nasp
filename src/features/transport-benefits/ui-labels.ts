const labels: Record<string, string> = {
  RIGHT_GRANTED: 'Imtiyoz berildi', RIGHT_CORRECTED: 'Ma’lumot tuzatildi', RIGHT_REVOKED: 'Imtiyoz bekor qilindi', RIGHT_REINSTATED: 'Imtiyoz tiklandi',
  VOIDED: 'Chipta bekor qilindi', RESCHEDULED: 'Safar boshqa sanaga ko‘chirildi',
  DRAFT: 'Qoralama', ISSUED: 'Chipta berilgan', TRAVELLED: 'Safarda foydalanilgan',
  RETURN_PENDING: 'Qaytarish tekshirilmoqda', RETURNED: 'Qaytarilgan',
  RETURN_DEADLINE_EXPIRED: 'Qaytarish muddati o‘tgan', CARRIER_CANCELLED: 'Qatnov bekor qilingan',
  NO_SHOW: 'Yo‘lovchi safarga chiqmagan', EXCHANGED: 'Almashtirilgan', VOID: 'Bekor qilingan',
  ERROR: 'Xatolik', RECONCILIATION: 'Ma’lumotlarni solishtirish kerak',
  HELD: 'Vaqtincha band qilingan', CONSUMED: 'Foydalanilgan', RESTORE_REVIEW: 'Qayta tiklash tekshirilmoqda',
  RELEASED: 'Bandlik bekor qilingan', RESTORED: 'Qayta tiklangan', AVAILABLE: 'Foydalanish mumkin',
  OUTBOUND: 'Borish', RETURN: 'Qaytish', BENEFICIARY: 'Imtiyoz oluvchi', COMPANION: 'Hamroh', LEGAL_REPRESENTATIVE: 'Qonuniy vakil',
  MONTHLY_CLAIM: 'Oylik hisob-kitob', SOCIAL_CARD_REALTIME: 'Ijtimoiy karta orqali to‘lov',
  ELIGIBLE: 'Imtiyozdan foydalanishi mumkin', NOT_ELIGIBLE: 'Imtiyozdan foydalana olmaydi',
  MANUAL_DOCUMENT_REQUIRED: 'Hujjatni tekshirish kerak', PENDING: 'Tekshirilmoqda', APPROVED: 'Tasdiqlangan',
  REJECTED: 'Rad etilgan', METHODOLOGY_PENDING: 'Qoidalar tasdiqlanishi kutilmoqda',
}
export function userLabel(code: string): string { return labels[code] || code }
