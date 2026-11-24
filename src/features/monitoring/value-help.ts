import type { ApiCheck, SystemService } from './types'

export interface ValueHelp { label: string; meaning: string; how: string }

const zabbix = 'Zabbix agent serverda o‘lchaydi.'
const sql = 'DBA V$SQLSTATS hisoblagichlarini davriy saqlaydi.'

export const valueHelp = {
  sample: { label: 'Namuna vaqti', meaning: 'Sahifadagi ko‘rsatkichlar qaysi paytdagi holatni tasvirlaydi.', how: 'Jonli rejimda NASP backend monitoring manbalaridan birlashtirgan natijaning vaqtini qaytaradi. UZT — Toshkent vaqti.' },
  services: { label: 'Ishlayotgan servislar', meaning: 'X / Y — muvaffaqiyatli tekshiruvlar / ro‘yxatdagi barcha servislar.', how: 'Backend har bir servis tekshiruvining joriy natijasini yig‘adi. Ishlayotgan deb belgilanganlari alohida sanaladi.' },
  hosts: { label: 'Serverlar soni', meaning: 'Monitoringdagi serverlar soni.', how: 'NASP backendga biriktirilgan Zabbix hostlar ro‘yxatidan ruxsat etilgan serverlar sanaladi.' },
  checks: { label: 'Muvaffaqiyatli API tekshiruvlari', meaning: 'X / Y — muvaffaqiyatli natijalar / ro‘yxatdagi barcha API tekshiruvlari.', how: 'Joriy kuzatuv natijalaridan ishlayapti deb belgilanganlari sanaladi.' },
  activeIncidents: { label: 'Faol hodisalar soni', meaning: 'Hali tiklangani qayd etilmagan hodisalar. Kritik hodisalar alohida sanaladi.', how: 'Zabbix faol muammolar ro‘yxati va backend integratsiya hodisalari birlashtiriladi, tiklanmaganlari sanaladi.' },
  cpu: { label: 'CPU bandligi', meaning: 'Protsessor vaqtining ishlatilgan ulushi.', how: `${zabbix} CPU ishlatilishi foizi system.cpu.util asosidagi mos sozlamadan olinadi.` },
  ram: { label: 'RAM bandligi', meaning: 'Dasturlar ishlatayotgan tezkor xotira ulushi. GiB — xotira hajmi birligi.', how: `${zabbix} vm.memory.size orqali mavjud va jami xotira olinadi. (Jami − mavjud) / jami × 100.` },
  disk: { label: 'Disk bandligi', meaning: 'Tanlangan disk bo‘limida fayllar qancha joy egallaganini ko‘rsatadi.', how: `${zabbix} vfs.fs.size orqali shu bo‘limning band joyi va bandlik foizi olinadi.` },
  diskIo: { label: 'Disk I/O', meaning: 'Disk bir soniyada qancha ma’lumot o‘qiydi yoki yozadi.', how: 'Agent qurilmaning ketma-ket bayt hisoblagichlarini o‘lchaydi. Farq vaqt oralig‘iga bo‘linadi va MiB/s ga o‘giriladi.' },
  network: { label: 'Tarmoq tezligi', meaning: 'Serverga bir soniyada qancha ma’lumot kirgani va undan chiqqani.', how: 'Agent net.if.in va net.if.out hisoblagichlarining vaqt bo‘yicha o‘zgarishini o‘lchaydi. Bayt/s qiymati Mbit/s ga aylantiriladi.' },
  hostStatus: { label: 'Server holati', meaning: 'Server kuzatuvi bo‘yicha joriy baho.', how: 'Agentdan o‘lchovlar kelishi hamda muhim resurs signallari va chegaralari tekshiriladi.' },
  oracleStatus: { label: 'Oracle holati', meaning: 'Bazaga ulanish va resurslar bo‘yicha joriy baho.', how: 'DBA tasdiqlagan yig‘uvchi bazaga ulanishni, band joyni hamda faol va bloklangan sessiyalarni tekshiradi.' },
  activeSessions: { label: 'Faol sessiyalar', meaning: 'Oracle’da joriy ishni bajarayotgan yoki javob kutayotgan ulanishlar.', how: 'Oracle’dagi V$SESSION ko‘rinishida tanlangan instansiyaning ACTIVE holatidagi sessiyalari sanaladi.' },
  blockedSessions: { label: 'Bloklangan sessiyalar', meaning: 'Boshqa ulanish band qilib turgan resursni kutayotgan sessiyalar.', how: 'Oracle V$SESSION ko‘rinishida haqiqiy bloklovchi sessiyasi bor (BLOCKING_SESSION_STATUS = VALID) satrlar sanaladi.' },
  tablespace: { label: 'Tablespace bandligi', meaning: 'Oracle ma’lumotlari uchun ajratilgan joyning ishlatilgan qismi.', how: 'DBA kelishgan Oracle joy o‘lchovidan band bloklar va sig‘im olinadi. DBA_TABLESPACE_USAGE_METRICS ishlatilsa, USED_PERCENT olinadi va sig‘im ta’rifi shu manbaga mos belgilanadi.' },
  sqlId: { label: 'SQL ID', meaning: 'Oracle’dagi so‘rovning qisqa identifikatori.', how: 'V$SQLSTATS ko‘rinishidagi SQL_ID ustunidan olinadi.' },
  sqlExecutions: { label: 'SQL ijrolari', meaning: 'Tanlangan davrda so‘rov necha marta bajarilgan.', how: `${sql} EXECUTIONS hisoblagichining davr ichidagi o‘sishi jamlanadi.` },
  sqlElapsed: { label: 'SQL jami vaqti', meaning: 'Tanlangan davrdagi so‘rov ijrolarining jamlangan vaqti.', how: `${sql} ELAPSED_TIME o‘sishi jamlanadi va mikrosoniyadan soniyaga o‘giriladi.` },
  sqlCpu: { label: 'SQL CPU vaqti', meaning: 'So‘rovlar hisoblanishida protsessor sarflagan jami vaqt.', how: `${sql} CPU_TIME o‘sishi jamlanadi va mikrosoniyadan soniyaga o‘giriladi.` },
  sqlPeriod: { label: 'SQL hisoblash davri', meaning: 'Qaysi vaqt chegarasidagi o‘lchovlar hisobga olingan.', how: 'Davrning bosh va oxirgi vaqtlari backend o‘lchov vaqtiga nisbatan belgilanadi. Hisobotga shu davrga mos o‘sishlar kiradi.' },
  incidentSeverity: { label: 'Hodisa jiddiyligi', meaning: 'Kritik — yuqori ustuvorlik. Ogohlantirish — e’tibor talab qiladigan holat.', how: 'Zabbix trigger yoki NASP integratsiyasi qoidasi uchun belgilangan jiddiylik olinadi.' },
  incidentStarted: { label: 'Hodisa boshlanishi', meaning: 'Muammo birinchi marta qayd etilgan vaqt.', how: 'Zabbix yoki NASP hodisa jurnalidan hodisa ochilgan vaqt olinadi va Toshkent vaqtiga o‘giriladi.' },
  incidentRecovery: { label: 'Tiklanish vaqti', meaning: 'Muammo tugagani qayd etilgan vaqt. Chiziq (—) bo‘lsa tiklanish qayd etilmagan.', how: 'Boshlang‘ich hodisaga bog‘langan tiklanish yozuvi vaqti olinadi.' },
  incidentDuration: { label: 'Davomiylik', meaning: 'Hodisa qancha vaqt davom etgani.', how: 'Tiklanish vaqtidan boshlanish vaqti ayriladi. Faol hodisada tiklanish o‘rniga namuna vaqti ishlatiladi.' },
  moduleStatus: { label: 'Modul holati', meaning: 'Modulga biriktirilgan tekshiruvlar bo‘yicha umumiy baho. «Sozlanmagan» — biriktirilgan tekshiruv yo‘q.', how: 'Backend shu moduldagi tekshiruvlarning eng jiddiy joriy natijasini oladi.' },
  moduleLast: { label: 'Modulning oxirgi o‘lchovi', meaning: 'Moduldagi eng yangi tekshiruv vaqti.', how: 'Modulga biriktirilgan tekshiruvlarning oxirgi natija vaqtlari ichidan eng yangisi olinadi.' },
  moduleChecks: { label: 'Modul tekshiruvlari soni', meaning: 'Modulga biriktirilgan kuzatuvlar soni.', how: 'Backend API va biznes tekshiruvlari reyestrini modul identifikatori bo‘yicha filtrlaydi va yozuvlarni sanaydi.' },
  moduleIncidents: { label: 'Modulning faol hodisalari', meaning: 'Muayyan modulda tiklanishi qayd etilmagan hodisalar soni.', how: 'Hodisa jurnalidan shu modulga tegishli faol yozuvlar sanaladi. Chiziq (—) bo‘lsa modul kuzatuvi sozlanmagan.' },
  moduleCoverage: { label: 'Modullar qamrovi', meaning: 'Modullar reyestridagi jami son va ulardan tekshiruvi borlari.', how: 'NASP modul reyestridagi yoqilgan modullar sanaladi. Kamida bitta tekshiruvi bor modullar alohida sanaladi.' },
  directionCount: { label: 'API reyestridagi yozuvlar soni', meaning: 'Tanlangan modul yoki yo‘nalishdagi kuzatuvlar soni.', how: 'API reyestri modul va yo‘nalish bo‘yicha filtrlanadi. Qolgan yozuvlar sanaladi.' },
} satisfies Record<string, ValueHelp>

const serviceMethods: Record<string, string> = {
  frontend: 'Sinov so‘rovi NASP kirish sahifasini va kerakli statik faylni HTTPS orqali ochadi.',
  backend: 'NASP backendning readiness manzili tekshiriladi va HTTP natijasi olinadi.',
  auth: 'Ajratilgan sinov hisobi bilan autentifikatsiya tekshiriladi va sessiya natijasi qayd etiladi.',
  oracle: valueHelp.oracleStatus.how,
  worker: 'Rejalashtirilgan vazifa jurnalida oxirgi muvaffaqiyatli ish va navbat holati tekshiriladi.',
  zabbix: 'Zabbix agentdan oxirgi o‘lchov kelgan vaqt kutilgan davriylik bilan solishtiriladi.',
}

export function serviceValueHelp(service: SystemService, field: 'status' | 'dependency' | 'time' | 'response' | 'check'): ValueHelp {
  const method = serviceMethods[service.id] ?? 'Servisga biriktirilgan monitoring tekshiruvi bajariladi.'
  return {
    status: { label: 'Servis holati', meaning: 'Servisga biriktirilgan joriy tekshiruv natijasi.', how: method },
    dependency: { label: 'Servis bog‘liqligi', meaning: 'Servis ishlashi yoki kuzatilishi uchun kerak bo‘lgan boshqa qism.', how: 'Servis va uning bog‘liqligi NASP monitoring konfiguratsiyasida ko‘rsatiladi.' },
    time: { label: 'Servisning oxirgi o‘lchovi', meaning: 'Joriy holat qachon tekshirilgan. — bo‘lsa o‘lchov yo‘q.', how: `${method} Oxirgi natija vaqti Toshkent vaqti bilan ko‘rsatiladi.` },
    response: { label: 'Servis javob vaqti', meaning: 'Sinov javobiga qancha vaqt ketgan. 1 000 ms — bir soniya.', how: `${method} So‘rovdan javobgacha o‘tgan vaqt olinadi.` },
    check: { label: 'Servis tekshiruvi', meaning: 'Servis uchun qaysi sinov bajarilishi.', how: method },
  }[field]
}

const observations = {
  synthetic: 'Zabbix sinov so‘rovi natijasidan',
  traffic: 'NASP backend yoki gateway trafik jurnalidan',
  sync: 'NASP integratsiyasining sinxronlash jurnalidan',
}

export function apiValueHelp(check: ApiCheck, field: 'status' | 'http' | 'response' | 'observed' | 'freshness' | 'reason'): ValueHelp {
  const source = observations[check.observation]
  return {
    status: { label: 'API holati', meaning: 'Tekshiruv ishlaganini, sekinlashganini, xato berganini yoki o‘lchov yo‘qligini bildiradi.', how: `${source} olingan natija kelishilgan vaqt, javob kodi va zarur bo‘lsa biznes sharti bilan solishtiriladi.` },
    http: { label: 'HTTP kodi', meaning: 'Serverning javob kodi. 200 — so‘rov muvaffaqiyatli. 202 — qabul qilindi, yakuniy natija keyin kelishi mumkin. — javob kodi olinmagan.', how: `${source} so‘rovga qaytgan HTTP kodi olinadi.` },
    response: { label: 'API javob vaqti', meaning: 'So‘rov qancha vaqt olgan. 1 000 ms — bir soniya.', how: `${source} so‘rov boshlanishidan javob kelguncha o‘tgan vaqt millisoniyada olinadi. Javobsiz so‘rovda qiymat bo‘sh qolishi mumkin.` },
    observed: { label: 'Oxirgi kuzatuv', meaning: 'Eng so‘nggi so‘rov yoki tekshiruv qayd etilgan payt.', how: `${source} eng yangi kuzatuv vaqti olinadi. Vaqt Toshkent vaqti bilan ko‘rsatiladi.` },
    freshness: { label: 'Ma’lumot yangiligi', meaning: 'Oxirgi muvaffaqiyatli almashinuvdan qancha vaqt o‘tganini va ruxsat etilgan chegarani ko‘rsatadi.', how: 'Namuna vaqtidan sinxronlash jurnalidagi oxirgi muvaffaqiyatli yakun vaqti ayriladi. Chegara integratsiya sozlamasidan olinadi.' },
    reason: { label: 'Xato yoki ogohlantirish sababi', meaning: 'Nima kuzatilganini tushuntiradi. — bo‘lsa sabab qayd etilmagan.', how: `${source} qisqa xato, vaqt chegarasidan oshish yoki sinov natijasidagi tafovut olinadi.` },
  }[field]
}
