import { valueHelp, type ValueHelp } from './value-help'

type Explanation = readonly [meaning: string, how: string]
const rows: Record<string, Explanation> = {
  Host: ['Kuzatilayotgan server nomi va tarkibi.', 'Host nomi Zabbix reyestridan, yadrolar soni va RAM hajmi agent inventaridan olinadi.'],
  Uptime: ['Oxirgi qayta ishga tushgandan beri o‘tgan vaqt.', 'Host uchun Zabbix agent system.uptime qiymati olinadi. Oracle uchun V$INSTANCE.STARTUP_TIME qiymati namuna vaqtidan ayriladi.'],
  'CPU load (1 / 5 / 15 daqiqa)': ['Oxirgi 1, 5 va 15 daqiqadagi ish yuklamasi.', 'Agent Linux load average qiymatlarini shu uch davr bo‘yicha oladi.'],
  'CPU I/O wait': ['Protsessor disk kabi qurilma javobini kutgan vaqt ulushi.', 'Agent system.cpu.util itemining iowait turidan foizni oladi.'],
  Swap: ['Diskda vaqtincha ishlatiladigan xotira. 0,6 / 4 GiB — band va jami joy.', 'Agent tizimning swap hajmi va bo‘sh qismini o‘lchaydi. Band joy — jami hajmdan bo‘sh joy ayrilgani.'],
  Jarayonlar: ['Ishga tushgan dastur jarayonlari. Oracle jadvalida joriy son va ruxsat etilgan limit beriladi.', 'Hostda Zabbix agent jami va ishlayotgan jarayonlarni sanaydi. Oracle’da V$RESOURCE_LIMIT dagi processes qiymati olinadi.'],
  'NASP backend readiness': ['Backend yangi so‘rov qabul qilishga tayyorligini bildiradi.', 'Backend readiness manziliga sinov so‘rovi yuborilib, HTTP javob kodi va qancha vaqt ketgani olinadi.'],
  'Oracle ulanish puli': ['Backend uchun ajratilgan Oracle ulanishlarining nechtasi band.', 'Backendning ulanish puli metrikalaridan faol, bo‘sh va kutilayotgan ulanishlar hamda maksimal limit olinadi.'],
  'HTTPS sertifikati': ['Xavfsiz ulanish sertifikatining muddati tugaguncha qolgan vaqt.', 'TLS ulanishida sertifikatning tugash sanasi o‘qiladi va undan o‘lchov sanasi ayriladi.'],
  Instansiya: ['Oracle bazasining ish holati, roli va ochilish rejimi.', 'DBA yig‘uvchisi V$INSTANCE va V$DATABASE ko‘rinishlaridan instansiya holati, rol va ochilish rejimini oladi.'],
  Sessiyalar: ['Hozirgi Oracle sessiyalari soni va eng ko‘p ruxsat etilgan son.', 'V$RESOURCE_LIMIT da sessions uchun joriy qiymat va limit olinadi.'],
  'FRA bandligi': ['Tiklash fayllari uchun ajratilgan joyning ishlatilgan qismi.', 'V$RECOVERY_FILE_DEST dagi SPACE_USED va SPACE_LIMIT qiymatlari olinadi.'],
  'TEMP bandligi': ['Hisoblash paytida ishlatiladigan vaqtinchalik joy.', 'DBA Oracle TEMP o‘lchovidan band va jami joyni oladi.'],
  'Oxirgi RMAN backup': ['Oracle zaxira nusxasining oxirgi natijasi.', 'V$RMAN_BACKUP_JOB_DETAILS dagi oxirgi backup ishining holati va tugash vaqti olinadi. Zaxiradan tiklash alohida sinov qilinadi.'],
}

const columns: Record<string, Explanation> = {
  Mount: ['Disk bo‘limi tizimda qaysi papka orqali ochilishi.', 'Zabbix fayl tizimlarini aniqlash o‘lchovidan bo‘limning mount yo‘li olinadi.'],
  Qurilma: ['Linux disk qurilmasining nomi.', 'Agent aniqlagan disk qurilmalari ro‘yxatidan olinadi.'],
  Interfeys: ['Serverning tarmoqqa ulanish nuqtasi nomi.', 'Agent aniqlagan Linux tarmoq interfeyslari ro‘yxatidan olinadi.'],
  'Band / jami': ['Fayllar egallagan joy va disk bo‘limining jami hajmi.', 'Agent vfs.fs.size itemidan shu fayl tizimi uchun used va total qiymatlarini oladi.'],
  'Bo‘sh joy': ['Fayl yozish uchun bo‘sh turgan joy.', 'Agent vfs.fs.size itemining free qiymatini oladi.'],
  'Inode bandligi': ['Fayl va papkalar uchun ajratilgan yozuvlarning band ulushi.', 'Agent vfs.fs.inode itemining pused qiymatini oladi.'],
  'O‘qish / yozish': [valueHelp.diskIo.meaning, valueHelp.diskIo.how],
  'O‘qish / yozish IOPS': ['Disk bir soniyada necha marta o‘qish yoki yozish bajargan.', 'Disk operatsiyalari hisoblagichlarining ikki o‘lchov orasidagi farqi o‘tgan soniyalarga bo‘linadi.'],
  'O‘qish / yozish kechikishi': ['Bitta disk operatsiyasiga o‘rtacha qancha vaqt ketgan.', 'Linux disk statistikasi bo‘yicha sarflangan millisoniyalar farqi tugallangan operatsiyalar farqiga bo‘linadi.'],
  Bandlik: ['Qurilma ish bajargan vaqt ulushi.', 'Disk band bo‘lgan vaqt hisoblagichining o‘sishi o‘lchov oralig‘iga bo‘linadi.'],
  'Kirish / chiqish': [valueHelp.network.meaning, valueHelp.network.how],
  'Xato RX / TX': ['Qabul qilish va uzatishdagi paket xatolari, soniyasiga.', 'Agent RX va TX xato hisoblagichlarining ikki o‘lchov orasidagi o‘sishini soniyaga bo‘ladi.'],
  'Tashlangan RX / TX': ['Qabul qilish yoki uzatishda tashlab yuborilgan paketlar, soniyasiga.', 'Agent interfeysning tashlangan paketlar hisoblagichlari farqini o‘lchaydi va soniyaga bo‘ladi.'],
  'Oxirgi tekshiruv (UZT)': ['Bu servis oxirgi marta qachon tekshirilgan.', 'Servis tekshiruvining eng yangi natija vaqti Toshkent vaqtiga o‘giriladi.'],
  'Oxirgi o‘lchov (UZT)': ['Hisob yoki tekshiruv oxirgi marta bajarilgan vaqt.', 'Tegishli yig‘uvchining oxirgi natija vaqti olinadi.'],
  Jami: ['24 soatda bajarilgan sinov so‘rovlari soni.', 'Zabbix web-monitoring tarixidan mos tekshiruv natijalari sanaladi.'],
  Muvaffaqiyat: ['Sinovlar orasida muvaffaqiyatli o‘tganlar ulushi.', 'Muvaffaqiyatli tekshiruvlar soni jami bajarilgan tekshiruvlarga bo‘linadi va 100 ga ko‘paytiriladi.'],
  p50: ['Javoblarning yarmi shu muddat ichida kelgan.', 'O‘lchangan javob vaqtlari tartiblanadi va o‘rtadagi qiymat olinadi. Javobsiz tekshiruvlar kirmaydi.'],
  p95: ['Javoblarning taxminan 95 foizi shu muddat ichida kelgan.', 'O‘lchangan javob vaqtlari tartiblanib 95-foizlik chegara hisoblanadi. Javobsiz tekshiruvlar kirmaydi.'],
  Timeout: ['Belgilangan muddatgacha javob kelmagan holatlar soni.', 'Sinov jurnalida vaqti tugagan natijalar sanaladi.'],
  'HTTP 5xx': ['Server tomondagi xatoni bildiruvchi javoblar soni.', 'Tegishli tarixda 500–599 kodi qaytgan so‘rovlar sanaladi.'],
  'Biznes xatosi': ['Javob kelgan, lekin ichidagi natija kutilganidan farq qilgan holatlar.', 'Sinov kutgan qaror yoki qiymat bilan javobni solishtiradi va tafovutlar sanaladi.'],
  'So‘rov': ['Shu operatsiyaga kelgan haqiqiy so‘rovlar soni.', 'Backend yoki gateway jurnalidan tanlangan davrda marshrutga kelgan so‘rovlar sanaladi.'],
  'So‘nggi trafik (UZT)': ['Shu operatsiya bo‘yicha eng yangi so‘rov vaqti.', 'Backend yoki gateway trafik jurnalidagi oxirgi yozuv vaqtidan olinadi.'],
  'Kutayotgan SID / SERIAL#': ['Kutayotgan Oracle sessiyasining ikki identifikatori.', 'V$SESSION dan SID va SERIAL# olinadi.'],
  'Bloklovchi SID': ['Bevosita to‘sib turgan sessiya raqami.', 'V$SESSION.BLOCKING_SESSION olinadi, agar bloklovchi aniqlangan bo‘lsa.'],
  'Yakuniy bloklovchi SID': ['Kutish zanjirining oxiridagi sessiya raqami.', 'V$SESSION.FINAL_BLOCKING_SESSION olinadi, agar yakuniy bloklovchi aniqlangan bo‘lsa.'],
  'Kutish hodisasi': ['Sessiya nimani kutayotgani.', 'Kutayotgan sessiya uchun V$SESSION.EVENT olinadi.'],
  Kutish: ['Joriy kutish qancha davom etgan.', 'Kutish davomiyligi Oracle sessiya o‘lchovidan olinadi va soniyaga o‘giriladi.'],
  'SQL ID': [valueHelp.sqlId.meaning, 'Joriy sessiya uchun V$SESSION.SQL_ID olinadi.'],
  Qamrov: ['Manba qaysi ko‘rsatkichlarni beradi.', 'Manba va unga biriktirilgan o‘lchovlar backend konfiguratsiyasidan olinadi.'],
  'Davriylik namunasida': ['O‘lchov qancha vaqt oralig‘ida kutiladi.', 'Tegishli Zabbix itemi yoki backend vazifasining o‘lchov jadvalidan olinadi.'],
  'Oxirgi demo o‘lchov (UZT)': ['Namunadagi o‘lchov vaqti.', 'Jonli rejimda yig‘uvchi saqlagan oxirgi muvaffaqiyatli o‘lchov vaqti olinadi.'],
  Ulanish: ['Jonli manba monitoringga ulanganmi.', 'Backend sozlamasi va manba bilan oxirgi muvaffaqiyatli bog‘lanish tekshiriladi.'],
  Manba: ['Ushbu ma’lumot olinishi mumkin bo‘lgan tizim.', 'Jonli rejim uchun tegishli manba egasi va yig‘ish mexanizmi integratsiya konfiguratsiyasida belgilanadi.'],
}

export function adminValueHelp(title: string, rowName: string, column: string): ValueHelp {
  let detail = columns[column]
  if (['Qiymat', 'Izoh', 'Natija', 'Tafsilot'].includes(column)) detail = rows[rowName] ?? detail
  if (column === 'Holat') {
    detail = title === 'Tarmoq interfeyslari'
      ? ['Interfeys faolmi va ulanish tezligi qancha.', 'Linux interfeysining holati va tezligi Zabbix agent orqali olinadi.']
      : ['Servis tekshiruvdan o‘tganmi.', 'Hostdagi servis yoki uning tekshiruv manzili bo‘yicha oxirgi natija olinadi.']
  }
  const [meaning, how] = detail ?? [column, 'Jonli manba bu ko‘rsatkich uchun hali belgilanmagan.']
  return { label: ['Qiymat', 'Izoh', 'Natija', 'Tafsilot'].includes(column) ? rowName : column, meaning, how }
}
