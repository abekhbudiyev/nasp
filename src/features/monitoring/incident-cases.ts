import type { ApiDirection } from './types'

export interface IncidentCase {
  impact: string
  evidence: readonly string[]
  assessment: string
  timeline: readonly { at: string; detail: string }[]
  followUp: string
  related: readonly { route: string; label: string; moduleId?: string; direction?: ApiDirection }[]
}

export const incidentCases: Partial<Record<string, IncidentCase>> = {
  'settlement-timeout': {
    impact: 'Qoplash reyestri holatini olishda uzilish kuzatilgan. Moslik tekshiruvi ishlagan. Reyestr topshirish bo‘yicha ushbu davrda trafik qayd etilmagan.',
    evidence: ['Oxirgi tekshiruvda 5 soniyada HTTP javobi kelmadi.', 'Backend readiness HTTP 200 qaytardi (42 ms).', 'Oracle o‘lchovida 2 ta bloklangan sessiya bor. Ulardan birida qoplash reyestri SQL ID’si ko‘rinadi.'],
    assessment: 'Timeout tasdiqlangan. Oracle bloklanishi shu oqimga aloqador bo‘lishi mumkin. Aniq sababni tasdiqlash uchun backend so‘rovi va Oracle sessiyasini bog‘lash kerak.',
    timeline: [
      { at: '2026-11-24T10:12:00+05:00', detail: 'Ketma-ket muvaffaqiyatsiz tekshiruvlardan keyin kritik hodisa ochildi.' },
      { at: '2026-11-24T10:29:46+05:00', detail: 'Qoplash holati tekshiruvi yana timeout bilan yakunlandi.' },
      { at: '2026-11-24T10:30:00+05:00', detail: 'Oracle o‘lchovida 406-SID yakuniy bloklovchi sifatida ko‘rindi.' },
    ],
    followUp: 'Avval Oracle bloklanish zanjiri va qoplash so‘rovi vaqtini solishtirish. Keyin javob vaqti me’yorga qaytganini ketma-ket tekshiruvlar bilan tasdiqlash.',
    related: [{ route: 'monitoring-checks', label: 'Qoplash API tekshiruvlari', moduleId: 'transport-benefits' }, { route: 'monitoring-oracle', label: 'Oracle bloklanishlari va Top SQL' }],
  },
  'hixm-capacity-latency': {
    impact: 'Markaz xizmatlari quvvati ro‘yxatini ochish sekinlashgan.',
    evidence: ['Oxirgi sintetik so‘rov HTTP 200 qaytardi va 1 230 ms davom etdi.', 'Demo tekshiruvning javob vaqti chegarasi 1 000 ms.'],
    assessment: 'Kechikish bitta ro‘yxat tekshiruvida kuzatilgan. Uning sababi va boshqa HIXM sahifalariga ta’siri hali aniqlanmagan.',
    timeline: [
      { at: '2026-11-24T10:24:00+05:00', detail: 'Javob vaqti belgilangan chegaradan oshdi.' },
      { at: '2026-11-24T10:29:18+05:00', detail: 'Navbatdagi tekshiruvda kechikish davom etdi.' },
    ],
    followUp: 'Ushbu ro‘yxat so‘rovini boshqa HIXM tekshiruvlari va shu vaqt oralig‘idagi backend metrikalari bilan solishtirish.',
    related: [{ route: 'monitoring-checks', label: 'HIXM API tekshiruvlari', moduleId: 'regional-centers' }],
  },
  'hixm-sync-delay': {
    impact: 'CHH’dan olinadigan HIXM xizmat yozuvlarining yangiligi 15 daqiqalik chegaradan oshgan.',
    evidence: ['Oxirgi muvaffaqiyatli sinxronlash 09:46 da yakunlangan.', '10:29 dagi tashqi so‘rov HTTP 200 qaytargan.'],
    assessment: 'HTTP javobi tashqi servisga ulanish borligini ko‘rsatadi. Sinxronlashning yakunlanmaslik sababi hali aniqlanmagan.',
    timeline: [
      { at: '2026-11-24T09:46:00+05:00', detail: 'Oxirgi muvaffaqiyatli sinxronlash qayd etildi.' },
      { at: '2026-11-24T10:02:00+05:00', detail: 'Yangilik chegarasidan oshilgani aniqlandi.' },
      { at: '2026-11-24T10:29:03+05:00', detail: 'Tashqi API javob berdi. Sinxronlash holati yangilanmadi.' },
    ],
    followUp: 'Sinxronlash jurnalidagi oxirgi muvaffaqiyatli bosqich va joriy ish holatini tekshirish.',
    related: [{ route: 'monitoring-checks', label: 'HIXM chiquvchi API’lari', moduleId: 'regional-centers', direction: 'outbound' }],
  },
  'tablespace-usage': {
    impact: 'NASP_DATA kengayishi uchun ajratilgan bo‘sh joy kamaygan. Demo o‘lchovida yozuv xatosi qayd etilmagan.',
    evidence: ['Bandlik 86% bo‘lib, 85% chegaradan oshgan.', 'Ajratilgan 200 GiB joyning 28 GiB qismi bo‘sh.'],
    assessment: 'Bu sig‘im ogohlantirishi. Qancha vaqt zaxira yetishini hisoblash uchun tarixiy o‘sish sur’ati va DBA tasdiqlagan kengayish limiti kerak.',
    timeline: [
      { at: '2026-11-24T10:05:00+05:00', detail: 'Tablespace bandligi ogohlantirish chegarasidan oshdi.' },
      { at: '2026-11-24T10:30:00+05:00', detail: 'Oxirgi namunada 172 GiB bandlik qayd etildi.' },
    ],
    followUp: 'DBA bilan NASP_DATA o‘sish sur’ati va datafile kengayish limitini tekshirish.',
    related: [{ route: 'monitoring-oracle', label: 'Oracle tablespace bandligi' }],
  },
  'business-mismatch': {
    impact: 'Bir sintetik Transport yozuvi bo‘yicha kutilgan tarif taklifi topilmagan. Ta’sir sinov yozuvida kuzatilgan.',
    evidence: ['API HTTP 200 qaytardi, ammo test kutgan taklif kodi javobda yo‘q edi.', 'Tekshiruv faqat moslik preview so‘rovini ishlatdi.'],
    assessment: 'HTTP darajasida API javob berdi. Biznes sharti bajarilmaganini faqat kutilgan javob bilan solishtirish aniqladi.',
    timeline: [
      { at: '2026-11-24T09:40:00+05:00', detail: 'Sinov yozuvi bo‘yicha kutilgan va qaytgan javob farq qildi.' },
      { at: '2026-11-24T09:45:00+05:00', detail: 'Navbatdagi tekshiruvda kutilgan taklif qaytdi.' },
    ],
    followUp: 'Takrorlansa, sinov yozuvining amal qilish muddati va amaldagi tarif qoidasini tekshirish.',
    related: [{ route: 'monitoring-checks', label: 'Transport biznes tekshiruvi', moduleId: 'transport-benefits' }],
  },
  'ticket-latency': {
    impact: 'Chipta holatini olishda javob sekinlashgan. Hodisa davomida javob kodi 200 bo‘lgan.',
    evidence: ['08:16 da javob 800 ms chegaradan oshdi.', 'Keyingi uchta tekshiruv 800 ms dan past bo‘ldi.', '10:29 da kuzatilgan 916 ms qiymati tiklanishdan keyingi alohida namunadir.'],
    assessment: '08:16 da boshlangan hodisa tiklangan. Eng so‘nggi o‘lchovda sekinlashish yana kuzatilgan.',
    timeline: [
      { at: '2026-11-24T08:16:00+05:00', detail: 'Chipta holati bo‘yicha kechikish hodisasi ochildi.' },
      { at: '2026-11-24T08:39:00+05:00', detail: 'Ketma-ket uchta muvaffaqiyatli tekshiruvdan keyin hodisa yopildi.' },
    ],
    followUp: 'Takroriy kechikishni tekshirish uchun so‘nggi o‘lchov va 24 soatlik p95 qiymatini solishtirish.',
    related: [{ route: 'monitoring-checks', label: 'Javob vaqti va p95', moduleId: 'transport-benefits' }],
  },
  'agent-unavailable': {
    impact: '7 daqiqa davomida server resurslari bo‘yicha yangi o‘lchov kelmagan.',
    evidence: ['Zabbix agent ma’lumot oqimi 18:04 da uzilgan.', 'Mustaqil NASP readiness tekshiruvi shu intervalda HTTP 200 qaytargan.'],
    assessment: 'Kuzatuvda uzilish tasdiqlangan. Mustaqil tekshiruvda servisga ulanish saqlangan.',
    timeline: [
      { at: '2026-11-23T18:04:00+05:00', detail: 'Agent yangi o‘lchov yubormay qoldi.' },
      { at: '2026-11-23T18:11:00+05:00', detail: 'Agentdan o‘lchovlar yana qabul qilina boshladi.' },
    ],
    followUp: 'Takrorlansa, agent servisi va Zabbix bilan tarmoq ulanishini tekshirish. Grafikdagi bo‘sh davrni yetishmagan ma’lumot sifatida belgilash.',
    related: [{ route: 'monitoring-sources', label: 'Yig‘uvchilar va ma’lumot yangiligi' }, { route: 'monitoring-servers', label: 'Server resurslari' }],
  },
}
