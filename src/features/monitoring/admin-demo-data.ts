export interface AdminTable {
  title: string
  description?: string
  columns: readonly string[]
  rows: readonly (readonly string[])[]
}

export const serverTables = [
  {
    title: 'Host va operatsion tizim',
    columns: ['Ko‘rsatkich', 'Qiymat', 'Izoh'],
    rows: [
      ['Host', 'nasp-backend-pilot', 'Linux · 8 vCPU · 16 GiB RAM'],
      ['Uptime', '18 kun 6 soat', 'Oxirgi qayta yuklanish 2026-11-06 04:30 UZT'],
      ['CPU load (1 / 5 / 15 daqiqa)', '2.14 / 2.48 / 2.09', '8 ta mantiqiy yadro'],
      ['CPU I/O wait', '4.8%', 'Disk yoki boshqa blok qurilma javobini kutish'],
      ['Swap', '0.6 / 4 GiB', '15% band'],
      ['Jarayonlar', '162 / 3', 'Jami / ishlayotgan'],
    ],
  },
  {
    title: 'Fayl tizimlari',
    columns: ['Mount', 'Band / jami', 'Bo‘sh joy', 'Inode bandligi'],
    rows: [['/', '28 / 60 GiB', '32 GiB', '18%'], ['/data', '128 / 200 GiB', '72 GiB', '37%'], ['/var/log', '11 / 20 GiB', '9 GiB', '25%']],
  },
  {
    title: 'Disk qurilmalari',
    columns: ['Qurilma', 'O‘qish / yozish', 'O‘qish / yozish IOPS', 'O‘qish / yozish kechikishi', 'Bandlik'],
    rows: [['vda', '2.4 / 1.8 MiB/s', '62 / 44', '1.1 / 2.3 ms', '11%'], ['vdb', '12.1 / 5.4 MiB/s', '328 / 141', '2.3 / 5.4 ms', '39%']],
  },
  {
    title: 'Tarmoq interfeyslari',
    columns: ['Interfeys', 'Holat', 'Kirish / chiqish', 'Xato RX / TX', 'Tashlangan RX / TX'],
    rows: [['eth0', 'Faol · 1 Gbit/s', '22.4 / 8.6 Mbit/s', '0 / 0 paket/s', '0.2 / 0 paket/s']],
  },
  {
    title: 'Hostdagi servislar',
    description: 'Servislar ro‘yxati va kuzatuv usuli host konfiguratsiyasi bilan kelishiladi.',
    columns: ['Servis', 'Holat', 'Oxirgi tekshiruv (UZT)'],
    rows: [['NASP backend', 'Ishlayapti', '10:29:50'], ['HTTPS proksi', 'Ishlayapti', '10:29:48'], ['Zabbix agent', 'Ishlayapti', '10:30:00']],
  },
] satisfies AdminTable[]

export const backendCheckTable = {
    title: 'Backend servisining holati',
    description: 'Ulanish, ishlashga tayyorlik va tashqi TLS sertifikatining alohida tekshiruvlari.',
    columns: ['Tekshiruv', 'Natija', 'Oxirgi o‘lchov (UZT)', 'Tafsilot'],
    rows: [['NASP backend readiness', 'HTTP 200 · 42 ms', '10:29:50', 'Ilova so‘rov qabul qilishga tayyor'], ['Oracle ulanish puli', '18 / 40 faol', '10:29:50', '22 ta bo‘sh ulanish · navbat 0'], ['HTTPS sertifikati', '42 kun qoldi', '10:25:00', 'Sertifikat muddati 2027-01-05 gacha']],
} satisfies AdminTable

export const transportCheckTables = [
  {
    title: 'Transport sintetik tekshiruvlari · so‘nggi 24 soat',
    description: 'Muvaffaqiyat faqat bajarilgan tekshiruvlar bo‘yicha hisoblanadi. Timeout javob vaqti percentillariga kirmaydi.',
    columns: ['Tekshiruv', 'Jami', 'Muvaffaqiyat', 'p50', 'p95', 'Timeout', 'HTTP 5xx', 'Biznes xatosi'],
    rows: [
      ['Moslikni tekshirish', '1 440', '100%', '124 ms', '242 ms', '0', '0', '0'],
      ['Chipta holatini olish', '1 440', '99.72%', '185 ms', '690 ms', '2', '2', '0'],
      ['Qoplash reyestri holati', '1 440', '98.75%', '191 ms', '741 ms', '17', '1', '0'],
      ['Biznes preview', '288', '99.65%', '160 ms', '306 ms', '0', '0', '1'],
    ],
  },
  {
    title: 'Transport yozuvchi API’lari · so‘nggi 24 soat',
    description: 'Mavjud trafikdan olingan metrikalar. Tekshiruv uchun rezerv, chipta yoki reyestr yaratilmaydi.',
    columns: ['Operatsiya', 'So‘rov', 'p95', 'HTTP 5xx', 'So‘nggi trafik (UZT)'],
    rows: [['Rezervlash', '9 284', '510 ms', '12', '10:29:58'], ['Chipta chiqarish', '6 240', '728 ms', '8', '10:29:56'], ['Qoplash reyestrini topshirish', '0', '—', '0', '—']],
  },
] satisfies AdminTable[]

export const oracleTables = [
  {
    title: 'Instansiya va resurs limitlari',
    columns: ['Ko‘rsatkich', 'Qiymat', 'Tafsilot'],
    rows: [['Instansiya', 'NASP Oracle · OPEN', '19c · PRIMARY · READ WRITE'], ['Uptime', '12 kun 8 soat', 'Oxirgi ishga tushish 2026-11-12 02:30 UZT'], ['Sessiyalar', '164 / 400', 'Joriy sessiyalar / limit'], ['Jarayonlar', '142 / 300', 'Joriy jarayonlar / limit'], ['FRA bandligi', '68 / 120 GiB', '56.7% band'], ['TEMP bandligi', '7 / 32 GiB', '21.9% band'], ['Oxirgi RMAN backup', 'Muvaffaqiyatli', '2026-11-24 02:18 UZT · to‘liq backup namunasi']],
  },
  {
    title: 'Bloklanish zanjiri',
    description: 'Oxirgi o‘lchovdagi bloklangan sessiyalar va ularni bloklayotgan sessiyalar.',
    columns: ['Kutayotgan SID / SERIAL#', 'Bloklovchi SID', 'Yakuniy bloklovchi SID', 'Kutish hodisasi', 'Kutish', 'SQL ID'],
    rows: [['211 / 12431', '406', '406', 'enq: TX - row lock contention', '47 s', '4k2nw7j3m0p6a'], ['508 / 9811', '211', '406', 'enq: TX - row lock contention', '18 s', '7b1rd8t6h2k9p']],
  },
] satisfies AdminTable[]

export const sourceTables = [
  {
    title: 'Yig‘uvchilar va ma’lumot yangiligi',
    description: 'Jadval namuna yig‘ish rejasini ko‘rsatadi. Amaldagi Zabbix va Oracle ulanishlari hali sozlanmagan.',
    columns: ['Manba', 'Qamrov', 'Davriylik namunasida', 'Oxirgi demo o‘lchov (UZT)', 'Ulanish'],
    rows: [
      ['Zabbix agent', 'NASP backend · server, disk va tarmoq', '60 s', '10:30:00', 'Sozlanmagan'],
      ['Zabbix web monitoring', 'NASP modullari · API va biznes tekshiruvlari', '60 s / biznes 5 daqiqa', '10:29:52', 'Sozlanmagan'],
      ['Oracle monitoring hisobi', 'Instansiya, tablespace, sessiya va backup', '60 s / backup 15 daqiqa', '10:29:50', 'Sozlanmagan'],
      ['DBA SQL yig‘uvchisi', 'Periodik V$SQLSTATS o‘lchovlari', '5 daqiqa', '10:30:00', 'Sozlanmagan'],
      ['NASP backend metrikalari', 'Haqiqiy API trafik va ulanish puli', '60 s', '10:30:00', 'Sozlanmagan'],
      ['Zabbix hodisalari', 'Faol muammolar va yopilgan hodisalar', '60 s', '10:30:00', 'Sozlanmagan'],
    ],
  },
  {
    title: 'Qo‘shimcha ma’lumot uchun kerak bo‘ladigan manbalar',
    columns: ['Ma’lumot', 'Manba'],
    rows: [['So‘rovning servislar bo‘ylab izi', 'OpenTelemetry instrumentatsiyasi va Tempo'], ['Amaliy xato loglari', 'Markazlashgan log manbasi va maxfiy ma’lumotlarni yashirish'], ['Reliz va konfiguratsiya o‘zgarishlari', 'CI/CD va o‘zgarish auditi'], ['Navbatlar va fon vazifalari', 'Broker yoki NASP scheduler metrikalari'], ['Backup tiklanishini tasdiqlash', 'Infratuzilma jamoasining restore sinovi natijasi'], ['Ogohlantirish yetkazilganini tasdiqlash', 'Zabbix Action va yetkazish jurnali']],
  },
] satisfies AdminTable[]

export const hostTrend = {
  series: [
    { id: 'cpu', label: 'CPU' },
    { id: 'ram', label: 'RAM' },
    { id: 'disk', label: 'Disk /data' },
  ],
  samples: [
    { at: '2026-11-23T13:30:00+05:00', cpu: 45, ram: 70, disk: 60 },
    { at: '2026-11-23T16:30:00+05:00', cpu: 55, ram: 73, disk: 60 },
    { at: '2026-11-23T19:30:00+05:00', cpu: 40, ram: 72, disk: 61 },
    { at: '2026-11-23T22:30:00+05:00', cpu: 31, ram: 70, disk: 61 },
    { at: '2026-11-24T01:30:00+05:00', cpu: 20, ram: 67, disk: 62 },
    { at: '2026-11-24T04:30:00+05:00', cpu: 22, ram: 69, disk: 62 },
    { at: '2026-11-24T07:30:00+05:00', cpu: 37, ram: 71, disk: 63 },
    { at: '2026-11-24T10:30:00+05:00', cpu: 43, ram: 74, disk: 64 },
  ],
} as const

export const recoveredIncidents = [
  { id: 'business-mismatch', severity: 'warning', target: 'Transport imtiyozlari', title: 'HTTP 200 bilan kutilgan taklif kelmadi', startedAt: '2026-11-24T09:40:00+05:00', recoveredAt: '2026-11-24T09:45:00+05:00', detail: 'Sintetik biznes tekshiruvi kutilgan taklif kodini topmadi.' },
  { id: 'ticket-latency', severity: 'warning', target: 'Transport imtiyozlari', title: 'Chipta holatini olishda javob vaqti oshdi', startedAt: '2026-11-24T08:16:00+05:00', recoveredAt: '2026-11-24T08:39:00+05:00', detail: 'Javob vaqti ketma-ket uchta tekshiruvdan keyin me’yorga qaytdi.' },
  { id: 'agent-unavailable', severity: 'critical', target: 'NASP backend', title: 'Zabbix agent o‘lchov yubormadi', startedAt: '2026-11-23T18:04:00+05:00', recoveredAt: '2026-11-23T18:11:00+05:00', detail: 'Agentdan o‘lchovlar yana qabul qilina boshladi.' },
] as const
