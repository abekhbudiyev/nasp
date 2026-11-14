export const platformViews = [
  { key: 'platform', path: '', title: 'Ijro monitoringi' },
  { key: 'platform-family', path: '/family', title: 'Fuqaro va oila' },
  { key: 'platform-execution', path: '/execution', title: 'Idoralar ijrosi' },
  { key: 'platform-control', path: '/control', title: 'Nazorat' },
] as const

export const demoMeasures = [
  { code: 'DEMO-01', title: 'Moddiy yordam', agency: 'Ijtimoiy himoya milliy agentligi', recipient: 'Oila vakili', date: '05.10.2026', result: 'To‘lov amalga oshirilgan', amount: 660000, eventId: 'PAY-501', type: 'Pul to‘lovi', evidence: 'To‘lov reyestridan tasdiq kelgan.' },
  { code: 'DEMO-02', title: 'Bog‘cha vaucheri', agency: 'Maktabgacha ta’lim tashkiloti', recipient: 'Farzand', date: '19.10.2026', result: 'Xizmat ko‘rsatilgan', amount: null, eventId: 'EDU-172', type: 'Xizmat', evidence: 'Muassasa oktabr oyidagi xizmatni tasdiqlagan.' },
  { code: 'DEMO-03', title: 'Bepul transport qatnovi', agency: 'Transport operatori', recipient: 'Oila vakili', date: '21.10.2026', result: '1 ta qatnov amalga oshirilgan', amount: null, eventId: 'TR-214', type: 'Imtiyoz', evidence: 'Tashuvchi chiptadan foydalanilganini tasdiqlagan.' },
] as const

export const demoMessages = [
  ...demoMeasures.map(measure => ({ measure, received: 'Birinchi xabar' })),
  { measure: demoMeasures[0], received: 'Qayta yuborilgan xabar' },
]

export function countExecution(messages = demoMessages) {
  return new Set(messages.map(({ measure }) => `${measure.agency}:${measure.eventId}`)).size
}

export const inventoryGroups = [
  { name: 'Nogironligi bo‘lgan shaxslar', count: 200 },
  { name: 'Ijtimoiy reyestrdagi oilalar', count: 158 },
  { name: 'Yetim bolalar', count: 83 },
  { name: 'Urush va Chernobil bilan bog‘liq toifalar', count: 57 },
  { name: 'Pensiya va nafaqa oluvchilar', count: 24 },
  { name: 'Tazyiq va zo‘ravonlikka uchraganlar', count: 23 },
  { name: 'Odam savdosidan jabrlanganlar', count: 16 },
  { name: 'Jazoni ijro etish muassasasidan ozod etilganlar', count: 16 },
]
