# NASP Monitoring piloti

Monitoring NASP ichida o‘z menyusiga ega modul. `/apps/monitoring` umumiy holat sahifasidan Tizim holati (`/system`), Serverlar (`/servers`), API va biznes tekshiruvlari (`/checks`), Oracle (`/oracle`), Hodisalar (`/incidents`) va Ma’lumot manbalari (`/sources`) bo‘limlari ochiladi. Barcha bo‘limlar `monitoring.view` ruxsatidan foydalanadi. Lokal Vue prototipidagi o‘lchovlar demo fayllaridan olinadi. Bu repodagi sessiya demo hisoblarga asoslangan, umumiy API mijozi esa skelet holatida.

Umumiy holat sahifasida NASP reyestridagi barcha yoqilgan modullar ko‘rinadi. Tekshiruvlar va modulga tegishli hodisalar reyestrdagi barqaror `moduleId` bilan bog‘lanadi. Modul satri uning API tekshiruvlariga o‘tadi. Tekshiruv berilmagan modulda «Kuzatuv sozlanmagan», oldingi o‘lchov bor-u yangi o‘lchov kelmagan modulda «Ma’lumot yo‘q» ko‘rsatiladi. Transport birinchi real ulanish uchun tanlangan pilot. Lokal demo Transport, HIXM, Erta aralashuv, IPTK va Yagona ijtimoiy platforma holatlarini namoyish etadi.

## Backend shartnomasi taklifi

Ma’lumot oqimi **Vue → NASP backend → Zabbix API**. Backend ikkala marshrutda NASP sessiyasini va amaldagi rol orqali `monitoring.view` ruxsatini tekshiradi. Sessiyasiz so‘rovga `401`, ruxsatsiz so‘rovga `403` qaytariladi.

| Marshrut | Natija |
| --- | --- |
| `GET /api/monitoring/overview` | `MonitoringSnapshot` shaklida serverlar, API va biznes tekshiruvlari, Oracle va faol hodisalar |
| `GET /api/monitoring/oracle/top-sql?period=1h` | `TopSqlReport` shaklida interval boshi va oxiri hamda `elapsedSeconds` bo‘yicha kamayish tartibidagi Top SQL. `period` qiymatlari `1h`, `24h`, `7d`. |

Javob shakllari `src/features/monitoring/types.ts` faylida. Vaqt ISO 8601 formatida qaytariladi va sahifada UZT bo‘yicha ko‘rsatiladi. Muddatidan o‘tgan yoki olinmagan tekshiruv `unknown`, mavjud bo‘lmagan sonli qiymat esa `null` bo‘ladi. Manba ishlamasa backend xato holatini aniq qaytaradi. Bo‘sh `incidents` faqat manba muvaffaqiyatli tekshirilganida faol hodisa yo‘qligini bildiradi. Backendga o‘tilganda sahifada yuklanish, ruxsat xatosi va manba mavjud emasligi alohida ko‘rsatiladi.

Zabbix service account faqat pilot host guruhini o‘qiydi. Rolga ishlatiladigan `host.get`, `item.get`, `problem.get` kabi metodlar beriladi. Amal qilish muddati belgilangan token NASP backendning maxfiy ma’lumotlar omborida saqlanadi. Host va item identifikatorlari backend konfiguratsiyasida boshqariladi. [Zabbix API tokenlari](https://www.zabbix.com/documentation/current/en/manual/web_interface/frontend_sections/users/api_tokens) · [Zabbix rollari](https://www.zabbix.com/documentation/current/en/manual/web_interface/frontend_sections/users/user_roles)

## Pilot doirasi

| Nishon | Kuzatuv |
| --- | --- |
| Bitta NASP backend server | CPU, RAM, tanlangan filesystem bandligi, disk o‘qish va yozish tezligi, tarmoq kirish va chiqish tezligi |
| Bitta Oracle instansiyasi | Tablespace bandligi, faol va bloklangan sessiyalar, davr bo‘yicha Top SQL |
| Transport imtiyozlari | Moslikni tekshirish, chipta holati va qoplash reyestri holati. Pilotda marshrutlar amaldagi backend shartnomasi bilan solishtiriladi. |

Transport uchun biznes tekshiruvi kelishilgan sintetik sinov yozuviga moslik preview so‘rovini yuboradi va HTTP holatiga qo‘shimcha ravishda kutilgan qaror va taklif kodini solishtiradi. Repodagi VMQ-440 shartnomasida bu `POST /v1/eligibility/check` sifatida berilgan. Pilotda limit va rezerv sarflanmasligi hamda yozuvchi biznes operatsiyalari chaqirilmasligi tasdiqlanadi. Chipta va qoplash holati uchun pilotga ajratilgan sinov identifikatorlari ishlatiladi. Xato tavsifida mijoz ma’lumotlari, token, so‘rov yoki javob tanasi uzatilmaydi. [Transport API shartnomasi](vmq-440-external-api-contracts.md)

Rezervlash, chipta chiqarish va qoplash reyestrini topshirish kabi yozuvchi API’lar uchun javob vaqti va xatolar mavjud trafik metrikalaridan kuzatiladi. Tanlangan intervalda trafik kuzatilmagan bo‘lsa, holat `unknown` bo‘ladi.

## Administrator ko‘rsatkichlarining manbalari

API reyestrida yo‘nalish NASP nuqtai nazaridan belgilanadi. Ichki API chaqiruvlari NASP ichida bo‘ladi, kiruvchi chaqiruvlarni tashqi hamkor boshlaydi, chiquvchi chaqiruvni NASP boshlaydi. Chiquvchi yo‘nalishga ham ma’lumot olish, ham callback yuborish kiradi. Katalog uchun operatsiya nomi, modul, hamkor, kuzatuv usuli va kelishilgan marshrut kerak. HTTP muvaffaqiyati, biznes natijasi, oxirgi muvaffaqiyatli sinxronlash hamda yangilik chegarasi alohida qayd etiladi. Mahsulotga ulashdan oldin ichki marshrutlar, tashqi hamkorlar va sinxronlash kontraktlari amaldagi backend yoki gateway reyestri bilan tekshiriladi. [HIXM integratsiya shartnomasi loyihasi](api/hixm-integration-api.md)

| Ko‘rinish | Real ma’lumot qayerdan keladi |
| --- | --- |
| Host yuklamasi tarixi, uptime, CPU load va I/O wait, swap, inode, disk IOPS va kechikish, interfeys xatolari | Zabbix agent itemlari. Mount va interfeyslar host bo‘yicha aniqlanadi. Hostdagi servis holati alohida konfiguratsiyalanadi. |
| Sintetik tekshiruv, HTTP kodi, javob vaqti va muvaffaqiyat | Zabbix web scenario. NASP backend tarixiy javoblardan p50/p95 hisoblaydi, timeout va javobsiz intervalni alohida belgilaydi. |
| Yozuvchi API trafigi, 5xx, ulanish puli, xizmatning ichki tayyorligi | NASP backend, gateway yoki proksi instrumentatsiyasi. Yozuvchi endpointlarni test tariqasida chaqirishga ehtiyoj yo‘q. |
| Oracle sessiya limiti, bloklanish zanjiri, TEMP/FRA va RMAN backup | DBA kelishgan read-only yig‘uvchi. Bloklanish uchun amaldagi `V$SESSION` o‘lchovi va `BLOCKING_SESSION_STATUS`; backup holati uchun DBA tasdiqlagan RMAN manbasi. |
| Faol va tiklangan hodisalar | Zabbix `problem.get` va pilot host guruhi bilan chegaralangan `event.get`. Tiklanish hodisasi original hodisaga bog‘lanadi. |
| O‘lchov yangiligi | Backend har bir manbaning oxirgi muvaffaqiyatli o‘lchovi, kutilgan davriyligi va ulanish holatini saqlaydi. |

Yuklama tarixi, API trafik statistikasi va hodisa jurnali uchun backend interval chegaralari va ruxsatlarni qo‘llaydi. Yetishmayotgan o‘lchovlar grafiklarda bo‘sh qoladi. Backup muvaffaqiyati va tiklash sinovi natijasi alohida ko‘rsatkichlar. Loglar, traces, relizlar, fon vazifalari va xabarnoma yetkazilishi uchun alohida manbalar **Ma’lumot manbalari** sahifasida ko‘rsatilgan.

[Zabbix Linux shabloni](https://www.zabbix.com/integrations/linux) · [Zabbix web monitoring](https://www.zabbix.com/documentation/current/en/manual/web_monitoring) · [Zabbix event.get](https://www.zabbix.com/documentation/current/en/manual/api/reference/event/get) · [Oracle V$SESSION](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/V-SESSION.html)

Hodisalar jurnalida API timeouti, HIXM ro‘yxati sekinlashuvi, tashqi ma’lumotning kechikishi, tablespace sig‘imi, HTTP 200 ichidagi biznes xatosi, sekinlikdan tiklanish va yig‘uvchi uzilishi uchun ta’sir, dalillar, vaqt chizig‘i va keyingi tekshiruv ko‘rsatiladi. Kechikish bilan bir vaqtda o‘lchangan DB bloklanishini so‘rov bilan bog‘lash uchun mos identifikator yoki trace kerak.

## Oracle va Top SQL

- Oracle va Zabbixning pilotdagi versiyalari, Oracle nashri va amaldagi litsenziya aniqlangach, DBA tanlangan Zabbix shablonidagi item va SQL so‘rovlarini tekshiradi. Rasmiy Oracle integratsiyasi `V$ACTIVE_SESSION_HISTORY` ishlatadigan variantni hujjatlashtiradi. Oracle AWR va ASH uchun Diagnostics Pack, Real-Time SQL Monitoring uchun Tuning Pack talablarini belgilaydi. Shu funksiyalardan foydalanadigan itemlar litsenziya tasdiqlanguncha pilotdan chiqariladi. [Zabbix Oracle integratsiyasi](https://www.zabbix.com/integrations/oracle) · [Oracle 19c litsenziyalash qo‘llanmasi](https://docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html)
- DBA `V$SQLSTATS`dagi `EXECUTIONS`, `ELAPSED_TIME`, `CPU_TIME` kumulyativ hisoblagichlarini davriy o‘lchaydi. Backend tasdiqlangan interval uchun ketma-ket o‘lchovlar farqini jamlaydi, mikrosoniyalarni soniyaga o‘giradi va `ELAPSED_TIME` o‘sishi bo‘yicha tartiblaydi. Qayta ishga tushish, cursor almashishi, hisoblagich kamayishi va yetishmagan o‘lchovlar hisobga olinadi. AWR bilan bog‘liq `DELTA_*` ustunlari ishlatilmaydi. UI’ga SQL ID, agregat ko‘rsatkichlar va tasdiqlangan qisqa yorliq beriladi. [Oracle V$SQLSTATS ma’lumotnomasi](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/V-SQLSTATS.html)

Real pilotni ulash uchun NASP backend reposi va autentifikatsiya mexanizmi, Zabbix URL va versiyasi, read-only service account, host/item/trigger mosligi, Transport sinov yozuvlari hamda DBA tasdiqlagan Oracle shabloni va o‘lchov jarayoni kerak. Chuqur API trace zarur bo‘lsa, OpenTelemetry va Tempo keyingi bosqichda ko‘rib chiqiladi.
