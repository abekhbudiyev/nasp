---
document_id: IHMA-PG-346-79-REQ
version: 1.0
prepared_on: 2026-10-19
language: uz-Latn
purpose: existing-backend-and-frontend-gap-analysis
normative_baseline: supplied-346-and-79-orders-only
implementation_status: not-a-production-system-audit
---

# Loyihalarni ko‘rib chiqish, kelishish, qabul qilish va moliyalashtirish tizimi: talablar va mavjud tizimni solishtirish spetsifikatsiyasi

## 1. Hujjatning vazifasi va qo‘llanish chegarasi

Ushbu hujjat 2024-yil 17-dekabrdagi 346-son buyruq hamda 2026-yil 24-fevraldagi 79-son buyruqning foydalanuvchi taqdim etgan nusxalari asosida tuzilgan. U boshqa talablar bilan ishlab chiqilgan, **backend va frontend allaqachon mavjud bo‘lgan tizimni** tekshirish va moslashtirish uchun mo‘ljallangan. Yangi tizimni noldan yaratish, mavjud texnologiyalarni almashtirish yoki tayyor ma’lumotlarni o‘chirish topshirig‘i emas.

Agent ushbu hujjatni amaldagi kod, API, DB sxemasi, vakolatlar, hujjatlar, integratsiyalar va testlar bilan solishtirib, har bir talab uchun dalillangan `KEEP / MODIFY / ADD / RETIRE / INVESTIGATE` qarorini ishlab chiqishi kerak. Bitta frontend ekranining mavjudligi backend talabi bajarilganini isbotlamaydi. Bitta API mavjudligi ham foydalanuvchi butun jarayonni yakunlay olishini isbotlamaydi.

Bu spetsifikatsiya taqdim etilgan ikki hujjat doirasidagi talablarni qamrab oladi. Keyingi buyruqlar, tashqi qonunchilikning joriy tahriri, tashkilotning boshqa ichki hujjatlari, aniq ishlab chiqarish muhiti va boshqa repozitoriydagi backend bu ishda to‘liq audit qilinmagan. Ularning yo‘qligi taxmin qilinmasin. Mazkur hujjat imzolangan buyruq yoki tasdiqlangan texnik topshiriqning o‘rnini bosmaydi.

**Atamalarni ajratish:** bu fayl butun boshqaruv tizimining talablar spetsifikatsiyasi. Quyidagi jarayondagi **texnik talab** va **texnik topshiriq (TT)** esa har bir alohida loyiha uchun tuziladigan ikkita boshqa hujjatdir. Ularni bitta obyekt yoki bitta tasdiq bosqichiga qo‘shib yubormaslik kerak.

## 2. Manbalar va dalil belgilari

### 2.1. Asosiy nusxalar

Sahifa raqami quyida **PDF boshidan sanalgan fizik sahifa**; fayldagi ichki sahifa raqami emas.

| Manba ID | Hujjat / bo‘lim | PDF sahifalari | Izoh |
|---|---|---|---|
| S346-B | 346-son buyruqning asosiy qismi, 1–5-bandlar | 1–2 | 17.12.2024 |
| S346-L | Buyruqqa 1-ilova, 2024-yil loyihalari va tashabbuskorlari | 3 | Tarixiy loyiha ro‘yxati |
| S346-T | Buyruqqa 2-ilova: loyihalarni ishlab chiqish, kelishish, qiymatini aniqlash va tasdiqlash tartibi, 1–13-bandlar | 4–6 | 2-band va ayrim bo‘linma nomlari 79-son buyruq bilan o‘zgargan |
| S346-F1 | Tartibga 1-ilova: IT yechim uchun texnik talab shakli | 7 | Buyruqqa 1-ilova bilan adashtirilmasin |
| S346-F2 | Tartibga 2-ilova: hisoblash uchun mehnat haqi miqdorlari | Nusxada yo‘q | Tartibning 7-bandida havola bor, jadval taqdim etilgan 8 sahifada mavjud emas |
| S346-F3 | Tartibga 3-ilova: bajarilgan ishlar yuzasidan dalolatnoma shakli | 8 | Jadval va imzo bloklari |
| S79-B | 79-son buyruqning asosiy qismi, 1–4-bandlar | 3 | 24.02.2026; PDFning 1-sahifasidagi 25.02.2026 rezolyutsiya sanasi bilan almashtirilmasin |
| S79-C | 79-son buyruqqa 1-ilova: Kengash tarkibi va izoh | 4 | 10 lavozim / vakil, lavozim vorisligi haqidagi bevosita izoh |
| S79-N | 79-son buyruqqa 2-ilova: Kengash to‘g‘risidagi nizom, 1–24-bandlar | 5–8 | Kengash, paket, muddat, xulosa va cheklovlar |
| S79-A | 79-son buyruqqa 3-ilova: 346-son buyruq Tartibiga o‘zgartirishlar, 1–2-bandlar | 9 | Tartibning 2-bandi yangi tahriri; bo‘linma nomi almashtirilishi |
| U | Shu suhbatdagi foydalanuvchi talablari | — | Boshqaruv ma’lumotnomalari, lavozimga bog‘lash, vorislik, takrorlanmaydigan sarlavha, mavjud BE/FEga moslashish |

346-son PDF: `346-son buyruq (4).pdf`, 8 sahifa.

SHA-256: `e35fd42412b07a16224782faf0c75d5c834d7869012044f29de2356102b90515`.

79-son PDF: `79-son buyruq 24.02.2026 (4).pdf`, 9 sahifa. 1-sahifa rezolyutsiya, 2-sahifa mazmunli matnsiz, buyruq 3-sahifadan boshlanadi.

SHA-256: `c305a2064e010f4c37548798fd35c74eac61fe8e886bcefa326f105efea24add`.

Asl fayllar tayyorlash vaqtida `/Users/aswillback/Downloads/` ichida edi. Boshqa muhitda shu yo‘l bo‘lishi talab etilmaydi; fayl nomi, sahifa va hash bilan tekshirilsin. Quyidagi qaydlar barcha 17 sahifaning ko‘rinadigan mazmunini ko‘rish asosida tuzildi; skanlarda mashina matni deyarli yo‘q. Ayrim ilova sarlavhalarining sana/raqam kataklari buzilgan; asosiy buyruqdagi sana/raqam olinadi.

### 2.2. Talablarning kuchi

| Belgi | Ma’nosi | Agent uchun qoida |
|---|---|---|
| N | Buyruq yoki uning shaklidan bevosita keladigan talab | Manba bandi yoki shakl bloki bilan tekshirilsin |
| T | N talabini ishonchli avtomatlashtirish uchun texnik talab | Buyruqda aynan API, DB jadvali yoki elektron forma ko‘rsatilgan deb talqin qilinmasin |
| U | Foydalanuvchining qo‘shimcha mahsulot talabi | Alohida saqlansin; buyruq bandi sifatida taqdim etilmasin |
| Q | Hujjatda aniqlanmagan yoki nusxasi yetishmayotgan masala | Qaror egasi va kerakli dalil ko‘rsatilsin; agent o‘zi normativ qoida yaratmasin |

Talablar ustuvorligi: shu doiradagi o‘zgartirilgan norma → o‘zgarmagan norma → foydalanuvchining qo‘shimcha mahsulot talabi → tasdiqlangan texnik yechim. Muqaddam tasdiqlangan boshqa talabning huquqiy manbasi bo‘lsa, uni avtomatik bekor qilish o‘rniga ziddiyat qayd etilsin. Quyidagi texnik tavsiflar aniq framework, dasturlash tili, DB yoki endpoint nomini majburiy qilmaydi.

### 2.3. Yig‘ma tahrirni qo‘llash

1. S346-T 2-bandning dastlabki direktor oldiga kiritish yo‘li S79-A 1-banddagi yangi tahrir bilan almashtiriladi: yo‘nalish bo‘yicha mas’ul direktor o‘rinbosari yoki maslahatchisi bilan kelishish → Kengash → ijobiy xulosa → Agentlik direktoriga kiritish.
2. S79-A 2-banddagi bo‘linma nomi: **Budjetlashtirish tizimini muvofiqlashtirish va raqamli texnologiyalarni rivojlantirish bo‘limi**, quyida **BTRTR**. Tartibning 3, 4-band birinchi xatboshisi va 9–10-bandlari uchun yangi nom ishlatiladi. S79-A shuningdek 8-bandning to‘rtinchi xatboshisiga havola qiladi; taqdim etilgan S346-T 8-bandida shu nomli to‘rtinchi xatboshi aniqlanmadi. Bu Q-02 sifatida saqlanadi, xayoliy xatboshi tuzilmaydi.
3. S346-F1 va S346-F3 shakllarida eski bo‘linma nomi qolgan. Jarayondagi amaldagi bo‘lim bilan bog‘lash kerak; shaklning rasmiy yangi tahriri/tasdiqlangan moslashtirilishi Q-03 orqali aniqlashtiriladi. Eski imzolangan fayllardagi matn ommaviy almashtirilmaydi.
4. S79-N 22-band ijobiy xulosasiz TTni tasdiqlash, shartnoma tuzish va xarid tartib-taomillarini boshlashga yo‘l qo‘ymaydi. Bu tekshiruv faqat bir ekrandagi tugma bilan cheklanmaydi.
5. Kengash nizomi raqamlashtirish loyihalarini kengroq qamraydi; 346-son buyruqdagi moliyalashtirish yo‘li Markaz amalga oshiradigan loyihalar uchun. Boshqa ijrochili loyiha avtomatik Markaz–Jamg‘arma shartnomasi yo‘liga o‘tkazilmaydi.

## 3. Mavjud tizimni tekshiradigan AI agentga ish tartibi

### 3.1. Boshlang‘ich inventarizatsiya

O‘zgartirishdan oldin quyidagilarni topish va dalil manzilini qayd etish kerak:

- Backend va frontend repozitoriylari, branch/commit, muhit va modul chegarasi; API kontrakti/OpenAPI, xizmatlar, navbatlar va schedulerlar.
- DB sxemasi, migratsiyalar, loyiha/hujjat/to‘lovlar modeli, amaldagi statuslar va ularning kodlari.
- Autentifikatsiya, rol va lavozim manbasi, tashkilot/bo‘linma reyestri, vaqtinchalik o‘rinbosarlik va server ruxsat tekshiruvlari.
- TT, konsepsiya, smeta, buyruq, shartnoma, ekspertiza, hisobot, dalolatnoma va hisob-faktura shakllari, saqlash tizimi va imzolash yo‘li.
- EDO integratsiyasi, tashqi hujjat IDlari, elektron imzo yoki qog‘oz hujjatni qayd qilish jarayoni; real moliyalashtirish tasdig‘i qayerdan olinishi.
- Oldingi TT/biznes talablar, ularni tasdiqlagan hujjatlar va boshqa modullarga umumiy qismlar.
- Haqiqiy ma’lumotlarning agregat hajmi, statuslar kesimidagi sonlar, faol jarayonlar va migratsiya cheklovlari. Tahlil hisobotiga shaxsiy ma’lumot, token yoki maxfiy kalit ko‘chirilmasin.

Kirish berilmagan komponent `NOT_VERIFIED` deb belgilanadi. `Backend ko‘rinmadi` bilan `backend yo‘q` bir xil xulosa emas. Shu chatda tekshirilgan lokal `src/features/project-governance/` Pinia xotirasidagi demo komponent; uning mavjudligi foydalanuvchi aytgan real BE/FEning arxitekturasi yoki tayyorlik darajasi haqidagi dalil emas. Ushbu hujjat u real tizimdan nimalar yetishmayotganini oldindan hukm qilmaydi.

### 3.2. Har bir talab bo‘yicha baholash

Ikki alohida ustun ishlatilsin:

- **Moslik:** `FULL`, `PARTIAL`, `ABSENT`, `CONFLICT`, `NOT_VERIFIED`, `NOT_APPLICABLE`.
- **Amal:** `KEEP`, `MODIFY`, `ADD`, `RETIRE`, `INVESTIGATE`.

`FULL` → odatda `KEEP`; `ABSENT` → `ADD`; `PARTIAL/CONFLICT` → odatda `MODIFY`; tekshirilmagan/yopiq masala → `INVESTIGATE`. `NOT_APPLICABLE` faqat qo‘llanish sohasi va asosi bilan. `RETIRE` butun talabga emas, ziddiyatli eski qoida/ekran/transitionga nisbatan qo‘llanadi. Bajarilgan testlar va tekshirilgan kod bo‘lmasa `FULL` yozilmasin.

**Gap-matritsa shabloni:**

| Talab ID | Manba | BE dalili | FE dalili | DB/integratsiya dalili | Moslik | Amal | O‘zgaradigan komponent | Ma’lumot ta’siri | Tekshiruv | Ochiq savol |
|---|---|---|---|---|---|---|---|---|---|---|
| N-027 | S79-N:22 | `<file:line / endpoint / commit>` | `<route / component>` | `<constraint / event>` | NOT_VERIFIED | INVESTIGATE | Aniqlanadi | Aniqlanadi | Ijobiy xulosasiz 3 ta amal rad etilishi | — |

Har bir dalilga tekshirish sanasi va muhit kiritsin. Endpointning nomi boshqacha bo‘lishi nomuvofiqlik emas; muhim narsa semantika, ma’lumot, vakolat va natija. Dalilsiz taxmin alohida yozilsin.

### 3.3. Risk, ustuvorlik va bog‘liqlik

Baholashda ustuvorlik ham yoziladi. Quyidagi darajalar texnik rejalashtirish tasnifi, buyruqdagi yangi muddat emas:

- `P0`: vakolatsiz tasdiq/to‘lov, ijobiy xulosani chetlab o‘tish, pul yoki imzo tarixining buzilishi kabi aniqlangan jiddiy ziddiyat. Ishlayotgan tizimdagi ta’siri va vaqtinchalik cheklov vakolatli egaga ko‘rsatiladi.
- `P1`: asosiy normativ jarayon, hujjat yoki muddatni to‘liq bajarishga to‘sqinlik qiladigan yetishmovchilik.
- `P2`: normativ mazmunni buzmagan holda foydalanish qulayligi va nazoratni yaxshilash.

Har ish uchun old shart, ta’sirlangan modul/iste’molchi, ma’lumot migratsiyasi, test va qaror egasi yoziladi. Aniqlanmagan risk avtomatik `P0` qilinmaydi. Faqat tashqi tizim yoki yetishmagan hujjatga bog‘liq qism `blocked_by: Q-xx` bilan ajratiladi; qolgan ishlar bajarilishi mumkin.

Agent natijasidagi bitta yozuv namunasi (shu sintaksisni ishlatish majburiy emas):

```yaml
requirement_id: N-027
source: S79-N:22
compliance: NOT_VERIFIED
action: INVESTIGATE
priority: null
backend_evidence: []
frontend_evidence: []
data_and_integration_evidence: []
current_behavior: Tekshirilmagan
expected_behavior: Ijobiy xulosasiz TT tasdig‘i, shartnoma va xarid boshlash mumkin emas
proposed_change: Dalillar topilgach aniqlanadi
shared_consumers: []
migration_impact: Tekshirilmagan
acceptance_tests: [AT-12]
blocked_by: []
assumptions: []
```

### 3.4. Natijaviy paket

Agent quyidagilarni beradi:

1. As-is tizim xaritasi va mavjud statuslar lug‘ati.
2. Ushbu hujjatdagi barcha N/T/U IDlarni qamragan gap-matritsa.
3. Saqlanadigan qismlar ro‘yxati va sabablar.
4. O‘zgartirish/qo‘shish/foydalanishdan chiqarish rejasi; BE, FE, DB, hujjat va integratsiya kesimida.
5. Ochiq qarorlar reyestri, bloklaydiganlari va bloklamaydiganlari.
6. Eski-yangi status/rol/maydon xaritasi va ma’lumot migratsiyasi rejasi.
7. Qabul sinovlari va regressiya to‘plami; talab → test bog‘lanishi.
8. Joriy etish va ortga qaytish rejasi, qolgan xavflar.

Faqat tahlil topshirilgan bo‘lsa, agent kod/DB/production holatini o‘zgartirmaydi. Implementatsiya alohida topshirilganda, avval qayta foydalanish mumkin bo‘lgan komponentlar tanlanadi. Olib tashlash qarori hech qachon o‘zi bilan ma’lumotni jismonan o‘chirishga ruxsat bermaydi.

## 4. Ishtirokchilar va vakolatlar modeli

| Ishtirokchi | Asosiy vazifa | Asos |
|---|---|---|
| Tashabbuskor bo‘linma / tizim tashkiloti / hududiy boshqarma | Tashabbus paketi, taqdimot, qayta ishlash; tegishli loyihada texnik talab va dalolatnoma kelishuvi | S79-N:8–10,15–19; S346-T:2–3,5,9–10 |
| Yo‘nalish bo‘yicha mas’ul direktor o‘rinbosari yoki maslahatchisi | Konsepsiyani Kengashdan oldin kelishish | S79-A:1 |
| BTRTR | Paketni ko‘rish, qaytarish, Kengash majlisi/bayonnomasi, texnik hujjat va dalolatnoma kelishuvi | S79-N:8–10; S346-T:3–4,9–10 yangi nom bilan |
| Kengash | Baholash va uch turdagi xulosadan birini qabul qilish | S79-N:4–7,11–22 |
| Agentlik direktori | Ijobiy xulosadan keyingi konsepsiyani ko‘rish/rozilik; loyiha va qiymatni tasdiqlovchi buyruq | S79-A:1; S346-T:3,5 |
| Moliya-iqtisod masalalari bo‘yicha direktor o‘rinbosari | Kelishilgan TT va ishlab chiqish muddatlarini tasdiqlash | S346-T:4 |
| Loyiha yo‘nalishi bo‘yicha mas’ul direktor o‘rinbosari | Kelishilgan dalolatnomani an’anaviy yoki elektron tasdiqlash | S346-T:10 |
| Markaz | TT/smeta; ishlar ijrosi; hisobot/dalolatnoma; Jamg‘armaga taqdim; malakali mutaxassis va mablag‘lardan foydalanish | S346-B:3; S346-T:4,8–9,11,13 |
| Markaz direktori, bosh hisobchisi, loyiha mas’uli | Oylik hujjat paketini imzolash | S346-T:9; S346-F3 |
| Jamg‘arma ijro etuvchi direksiyasi | Smetani kelishish, loyiha buyrug‘ini kelishish, shartnoma, shartli ekspertiza, moliyalashtirish | S346-T:4–5,8,12 |
| Jamg‘arma buxgalteriya hisobi bo‘limi boshlig‘i | Dalolatnoma shaklidagi qabul qiluvchi imzo bloki | S346-F3; jarayondagi aniq navbati Q-03 |
| Zarur tashqi ekspert tashkilotlari | Shartga ko‘ra TT yoki shartnoma ekspertizasi | S346-T:6,8 |
| Tizim administratori / auditor | Texnik boshqaruv / kuzatuv; biznes tasdig‘ini avtomatik bermaydi | T-001, T-009; U-001 |

Bir `director` yoki `fund` roli barcha yuqoridagi turli tasdiqlarni ajratmasdan bajarishga ruxsat bermasin. Bir shaxsda bir necha vakolat bo‘lishi mumkin, lekin har amal qaysi vakolat va tayinlov asosida bajarilgani alohida qayd etiladi. Vazifalarni majburiy turli shaxslarga bo‘lish bo‘yicha buyruqda ko‘rsatilmagan cheklov agent tomonidan o‘ylab topilmasin.

## 5. Bevosita biznes talablar reyestri

Quyidagi barcha `N-*` talablar majburiy normativ bazaning raqamlashtirilgan ifodasidir. Shartli talab faqat uning sharti yuzaga kelganda ishga tushadi. `Tekshiruv` ustuni minimal qabul mezonini beradi; server va interfeysdagi bajarilishi 10–12-bo‘limlar bilan birga tekshiriladi.

### 5.1. Qamrov, javobgarlik va boshlang‘ich jarayon

| ID | Manba | Talab va minimal tekshiruv |
|---|---|---|
| N-001 | S346-B:1; S346-T:1; S79-N:1,3 | Loyiha turi, ijrochi va moliyalashtirish yo‘li ajratiladi. Raqamlashtirish loyihasi Kengashdan o‘tadi; 346 yo‘li tegishli Markaz loyihasiga qo‘llanadi. Boshqa ijrochi tanlansa asossiz Markaz shartnomasi yaratilmaydi. |
| N-002 | S346-B:1(b),2; S346-T:5,8 | Markaz loyihalari vakolatli tasdiq va to‘g‘ridan-to‘g‘ri shartnoma asosida moliyalashtirilishi qayd qilinadi. Tashabbusning yaratilishi moliyalashtirishga ruxsat hisoblanmaydi. |
| N-003 | S346-B:1(d),3; S346-T:13 | Ajratilgan loyiha mablag‘i, mutaxassislar, ish yuklamasi va bajarilgan ishlar kuzatiladi; mablag‘dan maqsadli/samarali foydalanish uchun Markaz javobgarligi aks etadi. Tizim mutaxassis malakasini o‘zi tasdiqlamaydi. |
| N-004 | S346-B:4–5; S79-B:3–4 | Buyruqni bir kun muddatda tegishli tuzilmalarga yetkazish va ijro nazoratining tarixiy qaydi mavjud bo‘lishi mumkin. Bu 2024/2026 buyruqlariga tegishli tashkiliy topshiriq; har yangi loyiha uchun yangi «1 kun» SLA yaratilmaydi. Tizim bilan qamrab olinmasa tashqi EDO qaydi ko‘rsatiladi. |
| N-005 | S346-L | 2024-yil ro‘yxati tarixiy asos sifatida saqlanadi. Uning 7 satri barcha kelgusi loyihalar uchun yopiq klassifikator yoki yagona ruxsat etilgan loyiha ro‘yxatiga aylantirilmaydi. |
| N-006 | S79-N:8; S79-A:1 | Tashabbuskorlar: Agentlik tarkibiy bo‘linmasi, tizim tashkiloti, Kengash yo‘li uchun hududiy boshqarma. Tashkilot, bo‘linma va mas’ul vakolat identifikatsiya qilinadi; qabul qiluvchi BTRTR bo‘ladi. |
| N-007 | S79-A:1, S346-T:2 yangi tahrir | Konsepsiyada mazmun, amalga oshirish tartibi, vazifa/funksiyalar va muddatlar bo‘ladi; Kengashdan oldin loyiha yo‘nalishi bo‘yicha direktor o‘rinbosari yoki maslahatchisining kelishuvi qayd qilinadi. Kelishuv dalilisiz bu shart bajarilgan deb ko‘rsatilmaydi. |
| N-008 | S79-N:9 | Kengash paketi maqsad/vazifa/konsepsiya, xarajatlarning moliyaviy hisob-kitobi, kutilgan natija, texnik yechim, muddat va resurslarni qamraydi. Maydon yoki havola qilingan hujjat bilan to‘liqligi tekshiriladi; faqat fayl nomining borligi mazmun tekshiruvi o‘rnini bosmaydi. |
| N-009 | S79-N:9,17 | Paket 9-bandga, qayta taqdimda 17-bandga mos bo‘lmasa, BTRTR kelib tushgan kundan boshlab 5 ish kuni ichida tashabbuskorga qaytaradi. Yetishmovchiliklar va qaytarish sanasi ko‘rinadi; buni Kengashning mazmunan qayta ishlash xulosasi bilan adashtirmaslik kerak. |
| N-010 | S79-N:9–10 | Majlisni tashkil qilish va bayonnomani yuritish BTRTR vazifasi. Loyiha kelib tushgan kundan boshlab 5 **kun** ichida majlis tashkil etiladi. «Kun» matnda «ish kuni» emas; vaqt hisobi 8-bo‘lim va Q-04 bilan bog‘lanadi. |
| N-011 | S79-N:10 | Majlis onlayn yoki oflayn bo‘lishi mumkin; tashabbuskor taqdimot qiladi. Format, sana, taqdimot yoki uning qaydi saqlanadi; aynan bir videokonferensiya provayderi majburiy qilinmaydi. |
| N-012 | S79-N:4–5 | Kengash texnik/tashkiliy/moliyaviy jihatlarni, strategik moslik va funksional takrorlanishni ko‘rib chiqadi, zarur qo‘shimcha axborotni so‘rashi mumkin. So‘rov, javob va tahlil dalillari loyiha bilan bog‘lanadi. |

### 5.2. Kengash tarkibi, qarori va qayta taqdim

| ID | Manba | Talab va minimal tekshiruv |
|---|---|---|
| N-013 | S79-C; S79-N:6 | Tasdiqlangan Kengash tarkibi versiyalanadi. Boshlang‘ich nusxada 10 a’zo; veb-saytdagi rahbariyat ro‘yxati bu tarkibni o‘zi bilan almashtirmaydi. Yangi tarkib faqat vakolatli hujjat asosida kuchga kiradi. |
| N-014 | S79-C izoh | A’zo boshqa ishga o‘tsa shu lavozimga yangi tayinlangan yoki vazifasi yuklatilgan shaxs tarkibga kiradi. Majlisda qatnashgan/ovoz bergan haqiqiy shaxs va o‘sha davrdagi tayinlov saqlanadi. Voris eski ovozning muallifi qilib qayta yozilmaydi. |
| N-015 | S79-N:7 | Majlis a’zolarning kamida uchdan ikki qismi qatnashganda vakolatli: `present >= ceil(activeCompositionSize × 2/3)`. Boshlang‘ich 10 a’zodan 7 zarur. 6 qatnashsa rasmiy xulosa chiqarilmaydi; takror ishtirokchi ikki marta sanalmaydi. |
| N-016 | S79-N:11–12 | Xulosa majlisda qatnashganlarning oddiy ko‘pchiligi bilan: `outcomeVotes > present/2`. 7 ishtirokchida 4; 8 da 5. Teng ovoz yoki hech bir xulosaga ko‘pchilik bo‘lmasa xulosa qabul qilingan hisoblanmaydi. Raisga qo‘shimcha hal qiluvchi ovoz o‘ylab topilmaydi. |
| N-017 | S79-N:11 | Uch natija: qo‘llab-quvvatlash; takomillashtirish uchun qaytarish; maqsadga muvofiq emas deb topish. Har biri mustaqil natija; «qaytarish» yakuniy salbiy xulosa bilan bir statusga birlashtirilmaydi. |
| N-018 | S79-N:12 | Xulosa majlis bayonnomasi bilan rasmiylashtiriladi. Sana, rekvizit, loyiha versiyasi, qatnashuv/tarkib va xulosa dalili bog‘lanadi. Faqat foydalanuvchining «ijobiy» checkboxi bayonnoma o‘rnini bosmaydi. |
| N-019 | S79-N:13 | Baholash 7 asosiy mezonni qamraydi: muammo/ehtiyoj; maqsad/vazifa; ijtimoiy ahamiyat; iqtisodiy samaradorlik; texnologik asos; normativ-huquqiy muvofiqlik; takrorlanishning oldini olish. Dalillar/izohlar qayd etiladi. Buyruqda ball, vazn yoki avtomatik o‘tish bali belgilanmagan. |
| N-020 | S79-N:14–15 | Takomillashtirish sabablari maqsad/natijalarni aniqlash, texnik yechim/muqobilni ko‘rish, moliyaviy asoslash yoki Kengash e’tiroz/tavsiyalari bo‘lishi mumkin. Har e’tiroz/tavsiya alohida identifikatsiya qilinib tashabbuskorga yetkaziladi. |
| N-021 | S79-N:16 | Qayta taqdim muddati Kengash tomonidan belgilanadi, 30 ish kunidan kech bo‘lmaydi. Belgilangan sana/asos va hisobi saqlanadi. Agent o‘zicha hamma loyihaga avtomatik 30 kun yoki matnda bo‘lmagan minimum belgilamaydi. |
| N-022 | S79-N:17 | Qayta taqdimga ma’lumotnoma ilova qilinadi; har e’tiroz/tavsiya bo‘yicha bartaraf etilgan qism, kiritilgan o‘zgarishlar, bartaraf etilmagan holatga asoslangan tushuntirish ko‘rsatiladi. Umumiy «tuzatildi» matni barcha satrni qoplagan deb olinmaydi. |
| N-023 | S79-N:18 | Belgilangan muddatda qayta taqdim etilmagan loyiha Kengash tomonidan ko‘rib chiqilmasdan qoldiriladi; yangi tashabbus sifatida umumiy tartibda qayta kiritilishi mumkin. Eski ish o‘chirilmaydi va «maqsadga muvofiq emas»ga avtomatik tenglashtirilmaydi. Kengash qaydi va yangi tashabbus havolasi ajratiladi. |
| N-024 | S79-N:19 | O‘z vaqtida qayta taqdim etilgan loyiha Nizomdagi umumiy tartibda qayta ko‘riladi. Oldingi ijobiy belgi, kvorum yoki ovozlar yangi taqdimga avtomatik ko‘chirilmaydi. |
| N-025 | S79-N:20 | Maqsadga muvofiq emaslik asosi: siyosat/strategiya/dastur/ustuvorlikka mos emaslik; dolzarblikning yetarli asoslanmagani; maqsad/vazifa/natija noaniqligi yoki nomuvofiqligi; texnik/tashkiliy/moliyaviy imkon yo‘qligi; boshqa AT funksiyalarini takrorlash. Sabab xulosada aks etadi. |
| N-026 | S79-A:1; S79-N:21 | Kengash ijobiy xulosasi asosida tashabbuskor loyihani Agentlik direktoriga kiritadi. Kengash xulosasi direktor roziligi yoki loyiha buyrug‘iga teng emas. |
| N-027 | S79-N:22 | Ijobiy Kengash xulosasisiz TTni tasdiqlash, shartnoma tuzish yoki xarid tartib-taomilini boshlash bloklanadi. Har bir muqobil endpoint/import/integratsiyada ham qoida ishlaydi. Qo‘shimcha xarid jarayonining o‘zi bu buyruq bilan batafsil belgilanmagan. |
| N-028 | S79-N:23–24; S79-B:4 | Nizom tasdiqlangan kundan kuchga kirishi va javobgarlik asosi saqlanadi; tarixiy loyihalar uchun retroaktiv qo‘llanish yoki avtomatik bekor qilish o‘ylab topilmaydi. Amaldagi ishlarni o‘tkazish Q-07 bo‘yicha belgilanadi. |

### 5.3. Texnik talab, TT, smeta, buyruq va shartnoma

| ID | Manba | Talab va minimal tekshiruv |
|---|---|---|
| N-029 | S346-T:3, S79-A:2 | Direktor konsepsiyaga rozilik bergach tashabbuskor BTRTR bilan birga 5 ish kuni ichida S346-F1 shaklidagi texnik talabni ishlab chiqib Markazga taqdim etadi. Rozilik sanasi va Markazga taqdim/qabul sanalari alohida. |
| N-030 | S346-F1 | Texnik talab loyihaning umumiy sharhi: maqsad/kutilgan natija, zarurlik asosi, funksionallik/tarkib/ma’lumot almashinuvining qisqa tavsifini qamraydi. |
| N-031 | S346-F1 | Funksional talablar: asosiy funksiyalar; OS/brauzer mosligi; foydalanish qulayligi. Shakldagi avtorizatsiya, CRUD va hisobot misollari har loyiha uchun majburiy bir xil funksiyalar deb ko‘chirilmaydi. |
| N-032 | S346-F1 | Foydalanuvchi hujjatlari, qadamli yo‘riqnoma/FAQ; zarur bo‘lsa boshqa tizimlar bilan almashinuv; kafolatli xizmat davri, yangilanish/tuzatish rejasi, yordam darajalari, kontakt va javob reglamenti ko‘rsatiladi. Talab etilmaydigan shartli band asos bilan belgilanadi. |
| N-033 | S346-F1 | Shakldagi tashabbuskor, tegishli raqamli bo‘lim vakili F.I.Sh., kelishuv/imzo va sana rekvizitlari saqlanadi; amaldagi bo‘linma nomi Q-03 bilan muvofiqlashtiriladi. |
| N-034 | S346-T:4 | Markaz taqdim etilgan texnik talab bo‘yicha 10 ish kuni ichida TTni tayyorlaydi. TT amalga oshirish yo‘nalishi, texnik tavsif, sifat ko‘rsatkichlari, texnik-iqtisodiy talab, zarur taomillar/tartib va boshqa maxsus talablarni qamraydi. |
| N-035 | S346-T:4 | TT va ishlab chiqish muddatlari tashabbuskor va BTRTR bilan `edo.ijro.uz` orqali kelishiladi; moliya-iqtisod masalalari bo‘yicha direktor o‘rinbosariga tasdiqqa yuboriladi. Kelishish va tasdiqlash turli hodisalar. Matndagi 10 ish kuni ushbu tayyorlash/yuborish majburiyatiga bog‘lanadi; tasdiqlovchining alohida SLA si taxmin qilinmaydi. |
| N-036 | S346-T:4 davomiy qism | TTga ish jarayonlari, kishi/soat va boshqa xarajatlarni inobatga olgan dastlabki xarajatlar smetasi **oyma-oy taqsimot bilan** ilova qilinadi; ushbu ilova Jamg‘arma ijro etuvchi direksiyasi bilan kelishiladi. Smetaning kelishuvi TT kelishuviga tenglashtirilmaydi. |
| N-037 | S346-T:6 | Qonunchilikda belgilangan hollarda TT Raqamli texnologiyalar vazirligi va «Kiberxavfsizlik markazi» DUKda belgilangan tartibda ekspertizadan o‘tkaziladi. Zarurlik asosi, har bir tegishli ekspertiza va natijasi qayd etiladi; bir umumiy noma’lum fayl barcha xulosalarni yopmasin. |
| N-038 | S346-T:6 ikkinchi xatboshi | TT ekspertizasini loyihani tasdiqlash bilan bir vaqtda bajarish mumkin. Barcha loyihada ekspertiza tugamaguncha loyiha buyrug‘ini qat’iy bloklash bu matndan kelib chiqmaydi; zarur yakuniy cheklov boshqa qo‘llanadigan norma/asos bilan belgilanadi. |
| N-039 | S346-T:7 | Har mutaxassis toifasi (senyor, midl, junior va boshqalar) va ish turi (backend, frontend va boshqalar) bo‘yicha kishi/soat hamda mutaxassislar soni hisoblanadi; TT va amalga oshirish muddati bilan bog‘lanadi. Barcha loyiha bir xil shtat tarkibida bo‘lishi shart emas. |
| N-040 | S346-T:7; S346-F2 | Ish haqi jamg‘armasi hisobida Tartibga 2-ilovadagi bir oylik hisoblash miqdorlari qo‘llanadi. Tarif qiymati, manba, amal davri va qo‘llangan versiya qayd etiladi; mavjud bo‘lmagan tarif o‘rniga demo qiymat rasmiylashtirilmaydi. Oy ulushi/kishi-soatni summaga o‘tkazish metodikasi Q-01/Q-05. |
| N-041 | S346-T:7 | Boshqa loyiha xarajatlari uchun ish haqi jamg‘armasiga nisbatan 5% ustama qo‘shiladi. Bazasi aynan ish haqi jamg‘armasi; avtomatik QQS yoki o‘ylab topilgan qo‘shimcha ustama qo‘shilmaydi. |
| N-042 | S346-T:7 yakuniy xatboshi | Boshqaruv xodimlarini saqlash xarajatlari ushbu hisobdagi dastur ishlab chiqish loyiha qiymatiga kiritilmaydi; dastur ishlab chiqish bilan bog‘liq bo‘lmagan boshqa loyihalarda ko‘zda tutiladi. Buni 5% ustamaga yashirin qo‘shish mumkin emas. |
| N-043 | S346-T:5 | TT tasdiqlangach tashabbuskor 5 ish kuni ichida loyiha va qiymatini tasdiqlashni nazarda tutadigan direktor buyrug‘i loyihasini ishlab chiqadi; tegishli markaziy bo‘linmalar, Markaz va Jamg‘arma bilan kelishib direktorga imzolash uchun kiritadi. Muddat barcha imzolar tayyor bo‘lishi haqida o‘zboshimcha talqinga kengaytirilmaydi. |
| N-044 | S346-T:8 birinchi xatboshi | Loyiha buyrug‘i imzolangach Markaz va Jamg‘arma ijro etuvchi direksiyasi o‘rtasida 2 ish kuni ichida amalga oshirish shartnomasi tuziladi. Tomonlar, raqam/sana, loyiha/buyruq va ilovalar bog‘lanadi. |
| N-045 | S346-T:8 | Qonunchilikda belgilangan hollarda Jamg‘arma shartnoma loyihasini Iqtisodiyot va moliya vazirligi huzuridagi «Loyihalar va import kontraktlarini kompleks ekspertiza qilish markazi» DUK ekspertizasidan o‘tkazadi. Bu TT ekspertizasidan alohida jarayon. |
| N-046 | S346-T:8 yakuniy xatboshi | Shartnoma ekspertizasi xulosasidagi qiymat Agentlik hisoblagan qiymatdan past bo‘lsa loyiha qiymati xulosadagi qiymatga moslashtiriladi. Yuqori xulosa loyiha qiymatini avtomatik oshirmaydi. Eski hisob va o‘zgarish dalili saqlanadi. |

### 5.4. Oylik ijro, qabul, dalolatnoma va moliyalashtirish

| ID | Manba | Talab va minimal tekshiruv |
|---|---|---|
| N-047 | S346-B:3; S346-T:9,13 | Ishlar/xizmatlar ijrosi loyiha, TT, reja va ajratilgan mablag‘ bilan bog‘lanadi; vaqt va sifat bo‘yicha bajarilganini tasdiqlovchi materiallar saqlanadi. Oddiy «bajarildi» statusi hujjatlar o‘rnini bosmaydi. |
| N-048 | S346-T:9 | Har oy hisobot oyidan keyingi oyning 5-sanasidan kechiktirmay bajarilgan ishlar hisoboti va S346-F3 bo‘yicha dalolatnoma tashabbuskor va BTRTRga taqdim etiladi. Ikkala qabul qiluvchi, jo‘natish va kelib tushish vaqti qayd qilinadi. |
| N-049 | S346-T:9; S346-F3 | Taqdim etilayotgan oylik paketda Markaz direktori, bosh hisobchisi, loyiha bo‘yicha mas’ulning imzolari/dalillari bo‘ladi. Bitta `center` tugmasi uch imzoga dalil hisoblanmaydi; qog‘oz bo‘lsa tasdiqlangan hujjat nusxasi va tekshirish qaydi saqlanadi. |
| N-050 | S346-T:10 | Dalolatnomani tashabbuskor va BTRTR 3 ish kuni ichida ko‘rib chiqib kelishadi. Ikki mustaqil natija va ularning sanalari saqlanadi. Bitta tomon kelishuvi ikkala tomon nomidan amal qilmaydi. |
| N-051 | S346-T:10 | Kelishilgan dalolatnomani loyiha yo‘nalishi bo‘yicha mas’ul direktor o‘rinbosari an’anaviy yoki elektron shaklda tasdiqlaydi. Alohida tasdiqlovchi dalili zarur; ushbu bandda unga alohida sonli muddat belgilanmagan. |
| N-052 | S346-F3 | Dalolatnoma bosh qismida tasdiqlovchi lavozim/F.I.Sh.; loyiha nomi; asos bo‘lgan buyruq yili/sanasi/raqami; shartnoma yili/sanasi/raqami va ilovasi; hisobot yili/oyi ko‘rsatiladi. |
| N-053 | S346-F3 jadval | Har xizmat satrida: tartib raqami, xizmat nomi, rejalashtirilgan xizmatlar soni va summasi, jami loyiha davomida bajarilgan foiz, hisobot oyida bajarilgan foiz, loyiha davomida jami to‘langan mablag‘, hisobot oyida to‘lanishi lozim mablag‘, izoh bo‘ladi. Umumiy bitta summa/foiz bilan satrlar yo‘qotilmaydi. |
| N-054 | S346-F3 jadval | Shakldagi jami satri ta’minlanadi. Summalar va miqdorlar to‘g‘ri agregatsiya qilinadi; foizlarning jami usuli buyruqda ochilmagan, Q-06 bo‘yicha belgilanadi. Foizlarni asossiz oddiy qo‘shish yoki to‘lovni avtomatik foiz×qiymat deb olish mumkin emas. |
| N-055 | S346-F3 imzo bloklari | Topshiruvchi: Markaz rahbari, bosh hisobchi, loyiha mas’uli. Qabul qiluvchi: tashabbuskor bo‘linma biriktirgan mas’ul, raqamli bo‘lim boshlig‘i, Jamg‘arma buxgalteriya hisobi bo‘limi boshlig‘i. Tasdiqlovchi: Agentlik direktori o‘rinbosari. Barcha bloklar model/shaklda saqlanadi; Jamg‘arma imzosining aniq navbati va yangilangan nom Q-03. |
| N-056 | S346-T:11 | Markaz Agentlik tasdiqlagan dalolatnoma va unga muvofiq hisob-fakturani keyingi oyning 10-sanasiga qadar Jamg‘arma ijro etuvchi direksiyasiga taqdim etadi. Tasdiqlanmagan dalolatnoma yoki hisob-fakturasiz paket «to‘liq taqdim etildi» hisoblanmaydi. |
| N-057 | S346-T:12 | Jamg‘arma taqdim etilgan dalolatnoma va hisob-fakturaga muvofiq bajarilgan tegishli qism qiymatini 2 ish kuni ichida Jamg‘arma mablag‘idan moliyalashtiradi. Qabul sanasi, moliyalashtirish sanasi/summasi va tasdiqlovchi dalil bog‘lanadi. |
| N-058 | S346-T:9–12; S346-F3 | «Hisobot oyida to‘lanishi lozim», «jami haqiqatan to‘langan», «kelishilgan» va «moliyalashtirilgan» alohida tushunchalar. Tasdiqlash yoki Jamg‘armaga yuborish faktining o‘zi to‘lov faktiga aylantirilmaydi. |

### 5.5. Mezonlar mazmunini yo‘qotmaslik

N-019 bo‘yicha baholashda kamida quyidagi savollar yoritiladi:

| Mezon | Baholash mazmuni |
|---|---|
| Muammo va ehtiyoj | Ijtimoiy himoya sohasidagi aniq muammo/ehtiyoj va dolzarblik asosi |
| Maqsad va vazifalar | Maqsadning aniqligi, vazifalarning muammoni hal etishga yo‘nalganligi |
| Ijtimoiy ahamiyat | Hayot sifati, ijtimoiy xizmat sifati va foydalanish imkoniga ta’sir |
| Iqtisodiy samaradorlik | Xarajat va natija muvozanati, budjet/resurslardan oqilona foydalanish |
| Texnologik asos | Zamonaviy AKT va texnik amalga oshirish imkoniyati |
| Normativ muvofiqlik | Tegishli qonunchilik/hujjatlarga moslik dalili; agentning huquqiy tasdiq checkboxi emas |
| Takrorlanish oldini olish | Mavjud axborot tizimlari va raqamli platformalar bilan funksional taqqoslash |

## 6. Foydalanuvchining qo‘shimcha mahsulot talablari

| ID | Manba | Talab / qabul mezoni |
|---|---|---|
| U-001 | Foydalanuvchi: boshqaruv qismi | Tashkilot, tarkibiy bo‘linma, lavozim, xodim/tayinlov, loyiha mas’ul vakolati va holatini boshqarish mumkin. Mavjud umumiy reyestr bo‘lsa qayta foydalaniladi. |
| U-002 | Foydalanuvchi: rol/lavozimga bog‘lash | Loyiha yoki hujjat navbati shaxsga emas aniq tashkilot/bo‘linmadagi barqaror lavozim va jarayon vazifasiga bog‘lanadi. Boshqa tashkilotdagi bir xil lavozim nomi ruxsat bermaydi. Faqat umumiy «kelishuvchi» roli yetmaydi. |
| U-003 | Foydalanuvchi: davomiylik | Xodim almashtirilganda shu lavozimga vakolatli tayinlangan shaxs ochiq vazifani ko‘rib davom ettiradi; loyiha yoki hujjatni qayta yaratish talab qilinmaydi. Oldingi imzo/kelishuv muallifi tarixda saqlanadi. |
| U-004 | Foydalanuvchi: rasmiy tuzilma | Rasmiy manbalardan tashkilot/bo‘linma/lavozim ma’lumotlari shakllantiriladi; manba URL, tekshirish sanasi va hosil qilingan mantiqiy guruh belgisi saqlanadi. Import avtomatik tizimga kirish yoki biznes vakolati bermaydi. |
| U-005 | Foydalanuvchi: takror sarlavha bo‘lmasin | Joriy sahifa nomi umumiy headerda bir marta ko‘rsatiladi. Kontent boshida aynan o‘sha nom takrorlanmaydi; loyiha nomi va bo‘lim sarlavhalari qolishi mumkin. |
| U-006 | Joriy topshiriq | Real backend/frontend qayta foydalanish nuqtai nazaridan tekshiriladi; to‘liq qayta yozish dastlabki taxmin bo‘lmaydi. Mavjud boshqa talabning manbasi va foydalanuvchilari o‘rganiladi. |
| U-007 | Joriy topshiriq | Har talab uchun saqlash/o‘zgartirish/qo‘shish/foydalanishdan chiqarish qarori dalil va qabul mezoni bilan chiqariladi. `NOT_VERIFIED` natijalar bajarildi deb belgilanmaydi. |
| U-008 | Avvalgi kelishish muammosi konteksti | Foydalanuvchi kimning navbatida hujjat turganini, qachon kelib tushganini, muddatini va javobsizligini ko‘ra oladi. «Iltimos» yozish yoki shaxsga qayta topshirish rasmiy jarayon sharti emas. Yangi eskalatsiya/jazo yoki avtomatik kelishuv normasi o‘ylab topilmaydi. |

Rasmiy tuzilma manbalari:

- https://ihma.uz/en/agency/management
- https://ihma.uz/en/agency/central-office
- https://ihma.uz/en/agency/organizations-under-agency

Oldingi lokal nusxa 14.10.2026 sanasida 6 rahbariyat, 34 markaziy apparat va 13 tizim tashkilotidagi 28 rahbar yozuvini olgan. Bu **tarixiy snapshot**, 19.10.2026 uchun jonli qayta tekshirilgan tarkib emas va sonlar doimiy cheklov emas. Production importda yangi manba holati, ishonchli ID moslashtirish va administrator tekshiruvi zarur. Vebdagi ism yoki telefon autentifikatsiya identifikatori bo‘lmaydi.

## 7. Jarayonlar modeli va o‘tish cheklovlari

Statuslarning quyidagi nomlari **semantik namunalar**. Mavjud tizimda boshqa kodlar bo‘lsa, ma’nosi to‘liq mos keladigan kodlar saqlanadi. Bitta `status` maydoni parallel kelishuvlar, ekspertiza va moliyaviy holatni to‘liq ifodalay olmasa, bog‘langan subjarayonlar ishlatiladi.

### 7.1. Kengash va konsepsiya

| Holat / hodisa | Keyingi holat | Shart / dalil |
|---|---|---|
| Tashabbus qoralamasi | Yo‘nalish kelishuvi / taqdimga tayyor | N-007 konsepsiya va vakolatli kelishuv |
| BTRTRga taqdim | Paket ko‘rigi / majlisni tashkil etish | N-008; kelib tushish hodisasi; ikki muddat alohida |
| Paket talablarga mos emas | Paket qaytarilgan | N-009, kamchiliklar ro‘yxati; Kengash salbiy xulosasi emas |
| To‘liq paket | Kengash ko‘rigi | N-010–012; majlis sanasi/format/taqdimot |
| Kengash ko‘rigi | Qo‘llab-quvvatlangan | N-013–019, kvorum, ko‘pchilik, bayonnoma |
| Kengash ko‘rigi | Takomillashtirishga qaytarilgan | N-020–022, e’tiroz va belgilangan muddat |
| Kengash ko‘rigi | Maqsadga muvofiq emas | N-025, asosli xulosa |
| Qayta ishlash | Qayta taqdim / yangi ko‘rik | N-022,024, yangi paket versiyasi |
| Qayta taqdim kechikkan | Ko‘rib chiqilmasdan qoldirilgan | N-023 bo‘yicha Kengashning tegishli qaydi |
| Ko‘rib chiqilmasdan qoldirilgan | Yangi tashabbus qoralamasi | Yangi ID, eski ishga havola; eski ish o‘zgarmaydi |
| Ijobiy xulosa | Direktorga ko‘rib chiqishga kiritilgan | N-026; Kengash xulosasi dalili |
| Direktor roziligi | Texnik talab tayyorlash | N-029; rozilik sanasi/dalili |

«Ko‘rib chiqilmasdan qoldirilgan» va «maqsadga muvofiq emas» alohida. Ko‘pchilik chiqmagan majlis natijasi `decision_pending` kabi texnik holat bo‘lishi mumkin; agent bu holatni o‘zi qo‘llab-quvvatlashga aylantirmaydi.

### 7.2. Texnik tayyorlash va shartnoma

| Hodisa | Shartlar | Natija |
|---|---|---|
| Texnik talab Markazga taqdim etildi | N-029–033; sana va ikki tomon kelishuvi | TT tayyorlash majburiyati boshlanadi |
| TT kelishish/tasdiqqa yuborish | N-034–036; TT versiyasi, EDO kelishuvlari, smeta kelishuvi | Vakolatli o‘rinbosar tasdig‘i kutiladi |
| TTni tasdiqlash | N-027; N-035; ekspertiza shartlari Q-08 | Imzolangan/tasdiqlangan TT versiyasi |
| Loyiha buyrug‘ini direktorga kiritish | N-043; TT tasdig‘i, tegishli kelishuvlar | Buyruq loyihasi kiritilgan |
| Loyiha buyrug‘i imzolandi | Direktorning imzosi yoki tekshirilgan tashqi hujjat | Shartnoma muddati boshlanadi |
| Shartnoma tuzish | N-027,044–046; tomonlar, qiymat, zarur ekspertiza | Shartnoma va tegishli hujjatlar |
| Xarid tartib-taomilini boshlash | Har qanday tegishli xarid yo‘lida N-027 | Xulosa tekshiruvi; xaridning qolgan qoidalari boshqa manbadan |

Ekspertizalarni parallel subjarayon sifatida yuritish imkoni bo‘lsin. Tasdiqlangan TT, loyiha buyrug‘i, shartnoma va qiymat bir-biriga mos bog‘lanadi; o‘zgarish bo‘lsa qaysi versiya asos ekanligi yo‘qolmaydi. O‘zgarishlarning barchasida qaytadan Kengashga yuborish sharti bu buyruqlarda batafsil belgilanmagan: Q-09.

### 7.3. Oylik paket

`Qoralama → Markaz imzolari yig‘ilgan → Tashabbuskor va BTRTR ko‘rigida → Kelishilgan → Mas’ul o‘rinbosar tasdiqlagan → Hisob-faktura bilan Jamg‘armaga taqdim → Moliyalashtirish tasdiqlangan`.

Bu ketma-ketlikka S346-F3dagi Jamg‘arma buxgalteriya imzosi Q-03 bo‘yicha joylashtiriladi; uning bloki yo‘qotilmaydi. Kelishuvchi har biri alohida navbat va javobga ega. Qog‘oz hujjat aylanishi bo‘lsa tekshirilgan tashqi dalil bilan shu hodisalar qayd etilishi mumkin.

Tuzatishga qaytarish/e’tiroz texnik subjarayoni hujjat versiyasi, e’tiroz satri, javob va qayta taqdimni bog‘laydi. Buyruqda dalolatnoma e’tirozi uchun batafsil qayta ko‘rish/kelishmovchilik reglamenti yo‘q. Shuning uchun **sukutni kelishish**, **3 kundan keyin avtomatik tasdiq**, **asossiz avtomatik to‘lov** kiritilmaydi. Tuzatishdan keyingi qayta kelishuv ta’siri T-005 va Q-10 bo‘yicha belgilanadi.

## 8. Muddatlar va kalendar

| Muddat ID | Talab | Boshlanish dalili | Muddat | Yakun dalili |
|---|---|---|---|---|
| D-01 | N-009 | Paketning BTRTRga kelib tushishi | 5 ish kuni | Nomuvofiq paket qaytarilishi |
| D-02 | N-010 | Loyihaning kelib tushishi | 5 kun, ish kuni deyilmagan | Majlis tashkil etilganligi |
| D-03 | N-021 | Kengash xulosasida belgilangan boshlanish/sana | Kengash belgilaydi, 30 ish kunidan kech emas | Qayta taqdim qaydi |
| D-04 | N-029 | Konsepsiyaga direktor roziligi | 5 ish kuni | Texnik talab Markazga taqdim |
| D-05 | N-034–035 | Texnik talabning Markazga taqdim/qabul dalili | 10 ish kuni | TT/muddatlar kelishilib tasdiqqa yuborilishi |
| D-06 | N-043 | TT tasdiqlanganligi | 5 ish kuni | Loyiha buyrug‘i tayyorlanib kelishilgan holda imzoga kiritilishi |
| D-07 | N-044 | Loyiha buyrug‘i imzolanishi | 2 ish kuni | Shartnoma tuzilishi |
| D-08 | N-048 | Hisobot oyi | Keyingi oyning 5-sanasidan kech emas | Hisobot/dalolatnoma ikki tomonga taqdim |
| D-09 | N-050 | Dalolatnomaning tegishli kelishuvchiga kelib tushishi | 3 ish kuni | Tashabbuskor va BTRTR ko‘rigi/kelishuvi |
| D-10 | N-056 | Hisobot oyi | Keyingi oyning 10-sanasiga qadar | Tasdiqlangan dalolatnoma + hisob-faktura Jamg‘armaga taqdim |
| D-11 | N-057 | Jamg‘armaga dalolatnoma/hisob-faktura taqdim/qabul dalili | 2 ish kuni | Moliyalashtirish dalili |
| D-12 | N-004 | Tegishli buyruq chiqarilishi | Bir kun | Buyruq tegishli tashkilotlarga yetkazilishi |

Texnik talablari:

- **T-010:** muddatlar umumiy `updatedAt`dan hisoblanmaydi. Har bir trigger (`receivedAt`, `directorConsentAt`, `assignmentApprovedAt`, `orderSignedAt`, `fundReceivedAt`) alohida hodisa. Izoh yozish yoki xodim almashtirish soatni yangidan boshlamaydi.
- **T-011:** ish kuni kalendari bayram, ko‘chirilgan dam olish va ko‘chirilgan ish kunlarini qo‘llaydi. Oddiy shanba/yakshanba filtri haqiqiy kalendar deb ko‘rsatilmaydi. Kalendar versiyasi va hisoblangan `dueAt` saqlanadi.
- **T-012:** tizim vaqtni yagona formatda saqlaydi; foydalanuvchi ish sanasini Asia/Tashkent bo‘yicha ko‘radi. Sana-only maydonlar va vaqtli hodisalar aralashtirilmaydi. Yil/oy o‘tishi va kabisa yili test qilinadi.
- **T-013:** muddat tugashi `OVERDUE` nazorat belgisi; biznes xulosasi yoki kelishuvi emas. D-09 uchun ikki kelishuvchini navbat bilan 3+3=6 ish kuniga aylantiradigan majburiy ketma-ketlik kiritilmaydi.
- **T-014:** 5 va 10 kalendar sanalari avtomatik «keyingi ish kuni»ga surilmaydi. Hisoblashning birinchi kuni, kun yakuni, dam olishga to‘g‘ri kelish va turli vaqtda yetib kelish siyosati Q-04 orqali tasdiqlanadi.
- **T-015:** D-01 va D-02 o‘zaro birlashtirilmaydi; paket qaytarilishi, to‘liqlashtirilishi yoki qo‘shimcha ma’lumot so‘rash avtomatik muddat to‘xtashi degani emas. Pauza/yangi start faqat aniqlashtirilgan reglament bilan.

Direktor konsepsiyasini ko‘rishi, TTni tasdiqlovchi o‘rinbosarning qarori, dalolatnomani tasdiqlash, e’tirozni bartaraf qilish yoki eskalatsiya uchun bu nusxalarda alohida sonli muddat belgilanmagan. UI bularni «normativ muddat belgilanmagan» sifatida ajratadi; ixtiyoriy ichki maqsadli sana bo‘lsa uning manbasi ko‘rsatiladi.

## 9. Ma’lumotlar modeli va hujjat rekvizitlari

Bu mantiqiy model; aynan shuncha jadval yaratish talabi emas. Mavjud mos entitylar va klassifikatorlar qayta ishlatiladi. Har obyektning barqaror IDsi va zarur bog‘lanishlari bo‘lsin.

### 9.1. Asosiy obyektlar

| Obyekt | Zarur mazmun / bog‘lanish |
|---|---|
| RegulatoryVersion | Manba fayl, hash, buyruq raqam/sana, bandlar, amal davri, o‘zgarish bog‘lanishi; loyiha qaysi qoidalar bilan yuritilishi |
| Organization / Unit | Turi, nomi, kodi, yuqori tashkilot/bo‘linma, faol davri, rasmiy/hosila/demo manba |
| Position | Tashkilot/bo‘linmaga tegishli barqaror lavozim yoki shtat birligi IDsi; bir xil nomlar ID o‘rnini bosmaydi |
| Person / User / Appointment | Shaxs va login alohida; lavozimga tayinlov boshlanish/tugash davri, asos hujjati, vaqtincha vazifa, vakolat doirasi |
| WorkflowAssignment | Loyiha/hujjat, vazifa turi, mas’ul lavozim, amal davri, o‘zgartirish sababi va asos |
| Project / ProposalVersion | Nomi, turi, tashkilot/bo‘linma, mazmun, tartib, maqsad/vazifa/funksiya, natija, yechim, muddat/resurs, hisob-kitob, ijrochi, qoida versiyasi, tarixiy/yangi ish havolasi |
| Approval / Agreement | Tasdiq turi, hujjat/paket versiyasi, vakolatli lavozim/tayinlov, haqiqiy shaxs, natija/sana, imzo yoki tashqi dalil |
| CouncilComposition / Seat | Tasdiqlovchi buyruq, tarkib versiyasi/davri; 10 boshlang‘ich o‘rin va lavozim vorisligi |
| Meeting / AgendaItem | Sana/format, tarkib snapshoti, qatnashuv, loyiha/paket versiyasi, taqdimot, protokol |
| Vote / Conclusion | O‘rin/tayinlov/shaxs, ovoz yoki tekshirilgan ovoz qaydi, qatnashganlar soni, natija, asos, bayonnoma, qayta taqdim muddati |
| Assessment / Finding / Response | 7 mezon bo‘yicha tahlil; har e’tiroz/tavsiya; bartaraf etish satri, o‘zgarish va tushuntirish |
| TechnicalRequirement | S346-F1 bandlari, versiya, tashabbuskor/BTRTR rekviziti, Markazga taqdim hodisasi |
| TechnicalAssignment | Texnik/sifat/iqtisodiy talablar, muddatlar, EDO kelishuvlari, tasdiq, smeta va ekspertiza bog‘lanishlari |
| Estimate / CostLine / MonthlyAllocation | Mutaxassis toifasi, ish turi, son, kishi-soat, oylik miqdor manbasi, oy/ulush, ish haqi jamg‘armasi, 5%, umumiy qiymat va oyma-oy taqsimot |
| ExpertiseCase | Turi (TT/vazirlik, TT/kiberxavfsizlik, shartnoma/kompleks), zarurlik asosi, tashkilot, topshirish/natija, xulosa fayli, qiymat va shartlar |
| ProjectOrder / Contract | Raqam/sana, tomonlar, asoslar, summa/valyuta, tegishli TT/smeta/ijobiy xulosa versiyalari, imzolar va ilovalar |
| WorkReport / Act / ActLine | Hisobot oyi, ish dalillari, S346-F3 rekvizit/satrlari, Markaz imzolari, ikki kelishuv, tasdiq, Jamg‘arma imzo qaydi |
| Invoice / FundingSubmission / FundingTransaction | Dalolatnoma versiyasi, hisob-faktura rekvizitlari/summasi, Jamg‘armaga taqdim/qabul, haqiqiy moliyalashtirish va tashqi tasdiq |
| Document / DocumentVersion / SignatureEvidence | Turi, raqam/sana, fayl havola/hash, versiya, muallif, imzo tekshiruvi yoki qog‘oz nusxa qaydi, bog‘langan entity |
| WorkflowEvent / Deadline / AuditEvent | Biznes hodisasi, kim/qachon/qaysi vakolat bilan, versiya, avvalgi/yangi holat, asos/sabab, muddat kalendari |

### 9.2. Shakllarni to‘liq qamrash

Texnik talab formasi N-030–033ni alohida maydon yoki tuzilmali hujjat bo‘limlari orqali qamraydi. Funksiya, integratsiya va supportni faqat bitta erkin `description` maydoniga qo‘shish auditni qiyinlashtirsa, tuzilmalashtiriladi; mavjud yaxshi hujjat editori bo‘lsa saqlanadi.

Dalolatnoma jadvali uchun kamida:

```text
Act:
  projectId, reportingYear, reportingMonth, documentVersionId
  orderId/orderReference, contractId/contractReference, contractAppendixReference
  submittedToInitiatorAt, submittedToBtrtrAt
  centerDirectorSignature, centerChiefAccountantSignature, centerProjectResponsibleSignature
  initiatorAgreement, btrtrAgreement, responsibleDeputyApproval
  fundAccountingSignatureEvidence
  invoiceReference, fundSubmissionReference

ActLine:
  serviceId/reference, serviceName, lineNumber
  plannedServiceQuantity, plannedServiceAmount
  cumulativeCompletedPercent, currentMonthCompletedPercent
  cumulativeActuallyPaidAmount, currentMonthPayableAmount, note
```

`cumulativeActuallyPaidAmount` hujjat tuzilayotgan davrdagi tekshirilgan to‘lov holatining snapshotidir; keyin to‘lov kelgani eski imzolangan hujjatni o‘zgartirmaydi. Mavjud tizimda ekvivalent maydonlar bo‘lsa qayta nomlash shart emas. Jami foizlarning ma’nosi va hisoblash usuli Q-06dan keyin aniqlanadi.

Pul hisoblari uchun **T-016:** DB va backendda aniq decimal yoki eng kichik pul birliklari; miqdor/foiz uchun aniq scale, kelishilgan yaxlitlash; API bilan UI bir xil natija. Hisoblangan summa serverda qayta tekshiriladi. So‘m bo‘yicha kasr/rounding va soliqlarni hisobga olish Q-05ga bog‘liq. Qo‘shib yaxlitlash bilan har satrni yaxlitlash farqi test qilinadi.

**T-017:** oyma-oy smeta jami tasdiqlangan umumiy qiymatga mos bo‘ladi; tafovut bo‘lsa izoh/tuzatilgan versiya talab qilinadi. Ekspertiza kamaytirgan limit va amaldagi shartnoma qiymati alohida saqlanadi. Qaysi hujjat qachon qayta tasdiqlanishi Q-09 bilan belgilanadi.

**T-018:** buyruqda foiz/to‘lovning barcha formulalari yo‘q. Tizim ma’noli qiymat chegaralari, to‘lovlarning takror hisoblanmasligi va loyiha/shartnoma limiti nazoratini beradi; asoslangan tuzatish/qaytarish/qo‘shimcha kelishuv ssenariylari Q-06/Q-09siz taxminan yo‘q qilinmaydi. «Jami foiz hech qachon kamaymasin» yoki «loyiha-oyga faqat bitta DB satr» normativ talab sifatida qattiq yozilmasin; versiya va korrektirovka farqi hisobga olinsin.

## 10. Backend, API va yaxlitlik bo‘yicha texnik talablar

Quyidagilar N talablarini ishonchli bajarish uchun hosila texnik talablar. Mavjud ekvivalent yechimlar qabul qilinadi.

| ID | Talab | Qabul mezoni |
|---|---|---|
| T-001 | Server ruxsatni foydalanuvchi + faol tayinlov/lavozim + jarayon vazifasi + tashkilot/loyiha/hujjat doirasida tekshiradi. | UI yashirgan amalni to‘g‘ridan-to‘g‘ri API bilan chaqirish ham ruxsatsiz bajarilmaydi; boshqa tashkilot IDsi bilan ham. |
| T-002 | Holat o‘tishlari va N-027 shartlari serverda tranzaksion tekshiriladi. | Ijobiy xulosa yoki kerakli hujjat/tasdiq bo‘lmasa alternativ endpoint ham o‘tkazmaydi. Qoidani yagona ishonchli servis/policyda ushlash afzal. |
| T-003 | Parallel amallarda versiya/konkurentlik himoyasi ishlaydi. | Eskirgan hujjat versiyasiga kelishish va ikki marta bir xil to‘lovni yozish aniqlanadi; foydalanuvchi yangilangan holatni ko‘radi. |
| T-004 | Takror so‘rov, timeout va integratsiya qayta yuborilishiga idempotent ishlov. | Bir request/event qayta kelsa yangi qaror, imzo, to‘lov yoki bir xil moliyaviy majburiyat paydo bo‘lmaydi. |
| T-005 | Tasdiq/kelishuv aynan hujjat/paket versiyasiga bog‘lanadi. | Mazmun o‘zgarsa oldingi tasdiq yangi versiyaga avtomatik kuch bermaydi. Ta’sirlangan kelishuvlar aniq ko‘rsatiladi; oldingi dalil saqlanadi; qayta tasdiq siyosati Q-09/Q-10. |
| T-006 | Fayllar doimiy saqlanadi va entity/versiyaga bog‘lanadi. | Sahifa yangilanganda yo‘qolmaydi; qayta ochish/yuklab olish va ruxsat nazorati ishlaydi. Fayl turi/hajmi tekshiruvi va mavjud xavfsizlik siyosati qo‘llanadi. |
| T-007 | Imzo/tashqi tasdiq dalili tekshiriladi va muallifi saqlanadi. | Matnli F.I.Sh. yoki `approved=true` yuridik tasdiq bilan aralashtirilmaydi. Qog‘oz va elektron yo‘l uchun kelishilgan dalil turlari bor. |
| T-008 | EDO bilan bog‘lanish (kamida tashqi hujjatni ishonchli identifikatsiya/qayd qilish) N-035ni qamraydi. | Tashqi ID, versiya, holat, yuborish/qabul, xato va qayta urinish qaydi. Integratsiya yo‘qligi yashirilmaydi; tashqi EDOda bajarilganini tekshirish mumkin. |
| T-009 | O‘zgartirishlar tarixi biznes holati bilan birga saqlanadi. | Kim, qachon, shaxs/tayinlov/lavozim, obyekt/versiya, amal, avvalgi-yangi natija, sabab va tashqi dalil ko‘rinadi. Oddiy CRUD bilan eski imzo/ovoz muallifini o‘zgartirib bo‘lmaydi. |
| T-019 | Moliyalashtirish dalili va holati ishonchli manbaga bog‘lanadi. | Integratsiya bo‘lsa tashqi tasdiq; qo‘lda qayd bo‘lsa vakolatli foydalanuvchi, hujjat, sana va summa. «Yuborildi» hodisasi bilan `paid` qo‘yilmaydi; qisman bir nechta operatsiya modeli ehtiyoji Q-11. |
| T-020 | Hujjat/loyiha bo‘yicha o‘qish va yuklab olish ham doira bilan cheklanadi. | Begona loyihaning fayli/eksporti URL yoki ID almashtirish orqali ko‘rinmaydi. Auditor ko‘rishi alohida vakolat; administrator avtomatik biznes imzolovchi emas. |
| T-021 | Qidiruv, filtr, sahifalash va yig‘ma ko‘rsatkichlar server manbasi bilan mos. | Filtrdagi jami va eksport bir xil mezon/scope bo‘yicha; lokal demo sonlar production statistikasi bo‘lmaydi. |
| T-022 | DB/FK va o‘chirish siyosati tarixni himoya qiladi. | Tayinlov tugashi ochiq vazifani yo‘q qilmaydi. Bog‘langan shaxs/lavozim/tashkilotni o‘chirish tarixni buzmaydi; deaktivatsiya/amal davri qo‘llanadi. |
| T-023 | Integratsiya xatolari ko‘rinadi va biznes yakunidan ajratiladi. | EDO yoki moliya xatosida «tasdiqlangan/to‘langan» degan yolg‘on natija yo‘q; retriable xato, navbat va oxirgi tasdiq qaydi bor. |
| T-024 | Backup/restore va migratsiyadan keyingi yaxlitlik tekshiriladi. | Kelishilgan sinov muhitida hujjatlar, tayinlov, qaror va moliyaviy jami qayta tiklanishi tekshiriladi. RPO/RTO sonlari Q-12 bilan belgilanadi. |
| T-025 | Prod muhitda demo mexanizmlar vakolat bermaydi. | Rol/person selector, xotiradagi soxta to‘lov, demo login yoki frontenddan yuborilgan `role` server tasdig‘ini almashtira olmaydi. Demo alohida muhit/feature flag bilan chegaralanadi. |

T-010–T-018 8–9-bo‘limlarda aniqlangan; ular ham gap-matritsaga kiritiladi.

### 10.1. API qobiliyatlari xaritasi

Aniq URL/metod nomlari buyruq talabi emas. Agent mavjud kontraktda quyidagi qobiliyatlar borligini tekshiradi:

- Ma’lumotnomalarni olish/boshqarish, tayinlov/vaqtincha vazifa va loyiha rolini biriktirish.
- Loyiha yaratish/tahrirlash, versiyalash, yo‘nalish kelishuvi, taqdim/qaytarish/qayta taqdim.
- Majlis, tarkib/qatnashuv, mezonlar, e’tirozlar, ovoz/xulosa/bayonnomani qayd qilish.
- Direktor roziligi; texnik talab, TT/smeta kelishish/tasdiq, ekspertiza va qiymatni moslashtirish.
- Loyiha buyrug‘i va shartnoma; xarid boshlanishida Kengash cheklovi.
- Oylik hisobot/dalolatnoma satrlari va imzolari, ikki kelishuv, tasdiqlash, hisob-faktura bilan yuborish.
- Moliyalashtirish dalili/operatsiyalari, qayta kelgan hodisa himoyasi.
- Hujjat versiyasi/yuklash/yuklab olish/eksport, audit, muddat/navbat, nazorat qidiruvi.

Har state-changing so‘rov: server foydalanuvchisi, obyekt versiyasi, vakolat, biznes shartlari va zarur dalilni tekshiradi; natijada yangi holat/versiya/hodisa qaytadi. Validatsiya xatosi, ruxsat yo‘qligi, eskirgan versiya va integratsiya xatosi farqlanadi. Mavjud loyiha xatolik standartiga rioya qilinadi; faqat shu hujjat uchun yangi parallel API standarti yaratilmaydi.

## 11. Frontend va foydalanuvchi jarayonlari

Quyidagi ekranlar qobiliyatlar xaritasi; aynan shuncha route/menyu yaratish majburiy emas. Mavjud sahifalar shu funksiyalarni qoplasa saqlanadi.

| UI qobiliyati | Ko‘rinishi kerak bo‘lgan axborot/amallar | Bog‘liq talablar |
|---|---|---|
| Loyiha reyestri/karta | Tashkilot, bo‘linma, mas’ul lavozim/jarayon, ijrochi/turi, hujjatlar, xulosa, TT/buyruq/shartnoma, tarix, navbat va muddat | N-001–012,026–046; U-002 |
| Konsepsiya va taqdim paketi | To‘liqlik, yo‘nalish kelishuvi, kamchiliklar, taqdim/qabul, versiya va moliyaviy asos | N-007–009 |
| Kengash ish joyi | Majlis/format, tarkib va haqiqiy vakillar, kvorum, 7 mezon, taqdimot, ovoz natijasi, bayonnoma, uch xulosa | N-010–019 |
| Qayta ishlash | Har e’tiroz va javob, o‘zgarish/tushuntirish, belgilangan muddat, yangi versiya, kechikish va yangi tashabbus bog‘lanishi | N-020–025 |
| Texnik tayyorlash | Texnik talab va TT alohida, EDO holati, oylik smeta/tarif manbasi, zarur ekspertizalar, tasdiqlar | N-029–042 |
| Buyruq/shartnoma | Kelishuvchilar, direktor imzosi, tomonlar, qiymat va ekspertiza kamaytirishi | N-043–046 |
| Oylik qabul | Hisobot, dalolatnoma satrlari, barcha imzo bloklari, ikki kelishuv natijasi, tasdiq, e’tiroz va yangi versiya | N-047–055 |
| Moliyalashtirish | Tasdiqlangan dalolatnoma + hisob-faktura, Jamg‘arma qabul sanasi, to‘lanishi lozim va haqiqiy moliyalashtirish farqi | N-056–058 |
| Nazorat va navbat | Kimning qaysi lavozimida, qachondan, normativ muddat/asos, kechikkan/kelishilgan/to‘langan | U-008; T-010–015 |
| Boshqaruv | Tashkilot → bo‘linma → lavozim → tayinlov; hujjat/loyiha vakolati; manba va amal davri | U-001–004; N-013–014 |

Frontend talablari:

- **T-026:** mumkin bo‘lmagan amalni sabab bilan tushuntirish; server qaytargan cheklov foydalanuvchiga tushunarli. UI o‘zi status o‘zgartirib server natijasini taxmin qilmaydi.
- **T-027:** kelishish, tasdiqlash, xulosa va moliyalashtirish terminlari izchil; qoralama/jo‘natilgan/imzolangan/tasdiqlangan/to‘langan bir xil badge emas. Pending holatni «rad etildi» deb ko‘rsatmaslik.
- **T-028:** jadvalda satrli xizmatlar, pul va foizlar, hujjat versiyalari, imzo/kelishuv kimga tegishli ekani tekshirishga qulay. Uzun nom va tor ekran ma’lumot yoki amalni yo‘qotmaydi; mavjud design system qo‘llanadi.
- **T-029:** loading, bo‘sh natija, xato, qayta urinish va eskirgan versiya holatlari ishlaydi; majburiy validatsiya matn bilan ko‘rinadi. Klaviatura va label/accessibilityning mavjud standartlari buzilmaydi.
- **T-030:** yuklab olingan dalolatnoma S346-F3ning rekvizit, jadval va imzo bloklarini yo‘qotmaydi; texnik talab S346-F1ni qoplaydi. Eksport «imzolangan hujjat» deb ko‘rsatilishi uchun tegishli imzo dalili bor. Yakuniy fayl vizual tekshiriladi.
- **T-031:** vazifaga tegishli bildirishnomada loyiha/hujjat, rol/lavozim, amal va muddat bo‘ladi; xodim vorisligida vazifa ko‘rinishi davom etadi. Kanal va chastota Q-13 bilan; bildirishnoma yuborilgani rasmiy kelishuv yoki to‘lov sharti emas.

Alohida UI uslubi, rang, frontend frameworkni almashtirish yoki menuni majburiy qayta tashkil qilish bu buyruqlardan kelib chiqmaydi. U-005 sarlavha talabi saqlanadi.

## 12. Qabul sinovlari va salbiy ssenariylar

Har test kerakli qatlamda bajariladi: biznes qoidasi uchun unit/domain; ruxsat va o‘tish uchun API/integratsiya; to‘liq foydalanuvchi yo‘li uchun E2E; fayl uchun shakl/ko‘rinish tekshiruvi. Mavjud tizimdagi mos test qayta foydalaniladi. Quyidagi holatlar minimal to‘plam; ular butun gap-matritsa o‘rnini bosmaydi.

| Test ID | Ssenariy va kutilgan natija | Talablar |
|---|---|---|
| AT-01 | Yo‘nalish kelishuvisiz konsepsiya bosqichi to‘liq deb ko‘rsatilmaydi; dalil qo‘shilgach taqdim mumkin. | N-007 |
| AT-02 | Bir paket elementi yetishmasa kamchilik ko‘rinadi; BTRTR qaytarishida sana/sabab saqlanadi; Kengash rad xulosasi yaratilmaydi. | N-008–009 |
| AT-03 | Bir qabul sanasidan D-01 5 ish kuni va D-02 5 kun alohida hisoblanadi; biri ikkinchisini almashtirmaydi. | N-009–010; T-015 |
| AT-04 | 10 a’zodan 6 qatnashsa xulosa yo‘q; 7 qatnashsa kvorum bor; dublikat ishtirokchi sanalmaydi. | N-013–015 |
| AT-05 | 7 qatnashchida 3 ovoz yetmaydi, 4 yetadi; 8 da 4 yetmaydi, 5 yetadi. | N-016 |
| AT-06 | Uch xulosadan hech biri ko‘pchilik olmasa yakuniy xulosa kiritilmaydi; raisga avtomatik ustunlik yo‘q. | N-016–017 |
| AT-07 | Bayonnoma bo‘lmasa «rasmiy ijobiy xulosa» bajarilgan hisoblanmaydi; mavjud bo‘lsa aynan paket versiyasiga bog‘lanadi. | N-018; T-005 |
| AT-08 | Baholash 7 mezonning mazmunini ko‘rsatadi; o‘ylab topilgan ball avtomatik tasdiq bermaydi. | N-019 |
| AT-09 | Qayta ishlash xulosasida har e’tiroz va Kengash belgilagan muddat; 30 ish kunidan kech muddat rad etiladi. | N-020–021 |
| AT-10 | Qayta taqdimda ma’lumotnoma satrlari va bartaraf etilmagan masala izohi saqlanadi; yangi ko‘rikka avvalgi ovozlar ko‘chmaydi. | N-022,024 |
| AT-11 | Kech qayta taqdim ko‘rib chiqilmasdan qoldirilish yo‘liga tushadi; yangi tashabbus alohida ID bilan yaratiladi, eskisi saqlanadi. | N-023 |
| AT-12 | Ijobiy xulosasiz TT tasdiqlash, shartnoma va xarid boshlash UI hamda barcha tegishli APIlardan o‘tmaydi. | N-027; T-002 |
| AT-13 | Kengash ijobiy xulosasi direktor roziligi sifatida sanalmaydi; 5 ish kunlik texnik talab sanog‘i haqiqiy rozilikdan boshlanadi. | N-026,029; T-010 |
| AT-14 | Texnik talab shakli umumiy sharh, funksional, hujjat/support va imzo rekvizitlarini qamraydi; TTdan alohida. | N-030–033 |
| AT-15 | TT/muddatlar ikki tomon bilan EDOda kelishilgan; smeta Jamg‘arma kelishuvi va moliyaviy o‘rinbosar tasdig‘i alohida tekshiriladi. | N-034–036 |
| AT-16 | TT ekspertizalari va shartnoma ekspertizasi ajraladi; parallel bajarilishi mumkin bo‘lgan ekspertiza sun’iy umumiy blok yaratmaydi. | N-037–038,045 |
| AT-17 | Test uchun ish haqi jamg‘armasi 100 000 000 bo‘lsa 5% = 5 000 000; jami 105 000 000. Bu tarif misoli emas. Boshqaruv xodimi xarajati yashirin qo‘shilmaydi. | N-040–042; T-016 |
| AT-18 | Oyma-oy smeta umumiy hisobga mos; manbasiz demo stavka «rasmiy» deb tasdiqlanmaydi. | N-036,039–040; T-017 |
| AT-19 | Agentlik qiymati 105 mln, ekspertiza 95 mln bo‘lsa moslashtirish kerak; 115 mln bo‘lsa avtomatik ko‘tarilmaydi; avvalgi qiymat yo‘qolmaydi. | N-046 |
| AT-20 | Buyruqni tayyorlab imzoga kiritish va buyruqning imzolanishi turli sana; 2 kunlik shartnoma sanog‘i imzodan boshlanadi. | N-043–044; T-010 |
| AT-21 | Dekabr hisoboti uchun keyingi yil yanvar 5/10 sanalari to‘g‘ri; dam olishga surish faqat tasdiqlangan siyosat bilan. | N-048,056; T-012,014 |
| AT-22 | Markazning 3 imzosi tekshiriladi; faqat menejer tugmasi bilan paket uch kishi imzolagan ko‘rinmaydi. | N-049 |
| AT-23 | Tashabbuskor kelishib BTRTR javob bermasa hujjat hali to‘liq kelishilmagan; javobsizlik va muddat aniq ko‘rinadi; avtomatik to‘lov yo‘q. | N-050–051; U-008 |
| AT-24 | Kelishuvdan keyingi o‘rinbosar tasdig‘i alohida; faqat ikki kelishuv bilan Jamg‘armaga tasdiqlangan paket deb yuborilmaydi. | N-051,056 |
| AT-25 | Eksportda buyruq/shartnoma/ilova/oy, barcha satrlar, jami va 7 imzo/tasdiq bloki yo‘qolmaydi. | N-052–055; T-030 |
| AT-26 | Dalolatnoma bor, hisob-faktura yo‘q bo‘lsa moliyalashtirish paketi to‘liq emas; mavjud bo‘lsa aynan tegishli versiyaga bog‘lanadi. | N-056 |
| AT-27 | Jamg‘armaga yuborish pul tushdi degani emas; haqiqiy moliyalashtirish dalili summasi/sanasi kiritilgach alohida holat. | N-057–058; T-019 |
| AT-28 | Bir xil request/tashqi moliya hodisasi ikki marta kelsa summa ikki marta hisoblanmaydi. | T-003–004 |
| AT-29 | Lavozimdagi xodim A almashib B tayinlanganda B ochiq ishni davom ettiradi; Aning eski kelishuvi/ovozi muallifi o‘zgarmaydi. | N-014; U-002–003; T-009 |
| AT-30 | Boshqa tashkilotdagi ayni nomli lavozim yoki rol hujjatni kelisha olmaydi; ruxsat serverda rad etiladi. | U-002; T-001,020 |
| AT-31 | Muddat o‘tgani rad yoki avtomatik rozilik yaratmaydi; izoh/oddiy edit/yangi xodim dueDate ni yangilamaydi. | T-010,013 |
| AT-32 | Imzolangan v1dan v2 mazmuni yaratilsa v1 fayli/kelishuvlari saqlanadi; v2 tasdiqlangan deb qolmaydi. | T-005–007 |
| AT-33 | Oldingi yilgi loyiha migratsiyasi rekvizit, eski status, imzo, fayl va pul jamilarini saqlaydi; manbada yo‘q xulosa/imzo yaratilmaydi. | N-028; T-024; 14-bo‘lim |
| AT-34 | Import qilingan xodim avtomatik user/admin/kelishuvchi bo‘lmaydi; hosila rahbariyat guruhi rasmiy bo‘linma sifatida ko‘rinmaydi. | U-004; T-025 |
| AT-35 | Headerda sahifa nomi bir marta; loading/xato/uzun satr va tor ekranda amallar ishlaydi. | U-005; T-026–029 |
| AT-36 | API validatsiyasi yo‘q bo‘lib faqat frontendda cheklov qolsa test muvaffaqiyatsiz; barcha production vakolatlari serverdan olinadi. | T-001–002,025 |

## 13. Ziddiyatli yoki eskirgan qismlarni aniqlash mezonlari

Quyidagilar **tekshirish uchun nomzodlar**. Ular real tizimda bor degan da’vo emas. Topilsa ko‘rsatilgan talab bilan solishtirilib baholanadi.

| Topilishi mumkin bo‘lgan eski yechim | Tavsiya etiladigan baholash | Asos |
|---|---|---|
| Konsepsiyadan bevosita direktorga, Kengashsiz yangi loyiha yo‘li | MODIFY / eski bypassni RETIRE | N-007,026–027; tarixiy ish Q-07 |
| TT/contract/procurement uchun ijobiy xulosa tekshiruvi faqat FEda | MODIFY | N-027; T-002 |
| Kelishish shaxs IDsi bilan qattiq bog‘langan, voris davom ettira olmaydi | MODIFY | U-002–003; Kengash uchun N-014 |
| Bitta generic direktor roli har xil tasdiqni cheksiz bajaradi | MODIFY | 4-bo‘lim; T-001 |
| Ismlar bo‘yicha qattiq yozilgan Kengash, tayinlov tarixi yo‘q | MODIFY | N-013–014 |
| Saytdagi har bir shaxsga avtomatik kelishuvchi/admin vakolati | RETIRE shu avtomatizmni | U-004; T-001,025 |
| `3 kun sukut = kelishildi` yoki «tasdiq = to‘landi» | RETIRE shu qoidani, mavjud tarixni saqlash | N-050–058; T-013,019 |
| 5 kunlik majlis muddatini 5 ish kuni deb hisoblash | MODIFY | N-010; D-02 |
| Dalolatnomada bitta summa va umumiy progress; satr/imzolar yo‘q | MODIFY / ADD yetishgan qismlar | N-052–055 |
| TT tasdiqlovchi va akt tasdiqlovchi bir xil majburiy shaxs deb olingan | MODIFY | N-035,051; vakolatlar turli |
| Ekspertiza chiqmasdan hech qachon loyihani tasdiqlab bo‘lmaydi | INVESTIGATE / MODIFY asossiz universal blok | N-038; boshqa tegishli norma Q-08 |
| Ekspertiza past qiymat bersa ham eski yuqori limit qoladi | MODIFY | N-046 |
| Demo stavkalar, qattiq yozilgan 10/7 soni barcha kelajak tarkiblarda | MODIFY | N-013,015,040; Q-01 |
| Har qanday yangilashdan muddat qayta sanaladi | MODIFY | T-010 |
| «Loyiha-oyga bitta yozuv» tuzatilgan versiyani ham taqiqlaydi | INVESTIGATE / MODIFY | T-018; Q-06, Q-10 |
| Mavjud umumiy tashkilot/permission/hujjat servisiga parallel yangi nusxa | KEEP mavjud mos komponent / MODIFY integratsiya | U-006; 3 va 9-bo‘limlar |
| Production rol almashtirish selector yoki frontend soxta to‘lov tugmasi | RETIRE prod yo‘lidan; demo izolyatsiyasi | T-025 |

Foydalanishdan chiqarish tartibi: eski amaldan foydalanishni to‘xtatish → yangi yo‘lni ishga tushirish → eski ma’lumotni o‘qish va tarixni saqlash → barcha iste’molchilar ko‘chirilganini tekshirish → zarur bo‘lsa alohida tasdiqlangan tozalash. Umumiy endpoint/jadval boshqa modullarga xizmat qilsa, modul doirasidagi policy yoki versiya bilan cheklash afzal.

## 14. Migratsiya va mavjud jarayonlarni saqlash

**M-01.** Eski-yangi statuslar xaritasi haqiqiy sxemadan tuziladi. `approved` nimani tasdiqlashi (konsepsiya, TT, akt yoki to‘lov) aniqlanmasdan barchasi bitta yangi statusga o‘tkazilmaydi.

**M-02.** Ma’lumotlar pre-count, statuslar kesimi, pul jamisi, hujjatlar va FK yaxlitligi bo‘yicha boshlang‘ich dalil olinadi. Qayta ishlatiladigan migratsiya idempotent; muhitning mavjud transaction/release amaliyotiga mos bo‘ladi.

**M-03.** Eski `personId`dan mas’ul lavozimga moslashtirish aniq tayinlov dalili bilan. Bir ismning bir nechta lavozimi yoki noma’lum tarix bo‘lsa `mapping_pending`; soxta tayinlov/imzo/qaror yaratilmaydi. Tarixdagi shaxs dalili saqlanadi.

**M-04.** Eski tashkilot/bo‘linma nomi o‘zgarishi IDni va eski imzolangan hujjat matnini o‘zgartirmaydi. Amaldagi nom va tarixiy snapshot alohida.

**M-05.** Oldin boshlangan ishlar uchun qoida versiyasi/istisno asosi bilan kelishilgan cutover siyosati qo‘llanadi (Q-07). Avvalgi haqiqiy to‘lovlar yangi normativ yo‘l yo‘qligi sabab o‘chirib tashlanmaydi; tekshiruv masalasi alohida.

**M-06.** Backfill faqat ishonchli manbadan. Yangi majburiy maydon uchun eski yozuvga «ha», bugungi sana, random ism yoki o‘ylab topilgan bayonnoma kiritilmaydi. Yetishmagan dalil ko‘rinadigan holatda qoladi; faol jarayonlar uchun vakolatli bartaraf etish yo‘li belgilanadi.

**M-07.** DB/API o‘zgarishlari bosqichma-bosqich moslikni saqlab joriy qilinadi; eski FE versiyasi va boshqa API iste’molchilari o‘rganiladi. Pilot tashkilot/loyiha va faollashtirish chegarasi belgilanadi.

**M-08.** Joriy etilgandan keyin pre/post-count, shartnoma/akt/to‘lov pul jamisi, ochiq navbatlar va hujjat hash/bog‘lanishlari tekshiriladi. Backup va rollback sinovi natijasi bo‘ladi; ortga qaytishda haqiqiy moliyaviy hodisa yo‘qolmasligi shart.

**M-09.** UATda kamida tashabbuskor, BTRTR/Kengash, Markaz, vakolatli tasdiqlovchi va Jamg‘arma vakili to‘liq ssenariyni tasdiqlaydi. «Build o‘tdi» yoki demo testi ishlab chiqarish jarayoni qabul qilinganini anglatmaydi.

## 15. Ochiq masalalar va agent taxmin qilmasligi kerak bo‘lgan qoidalar

| ID | Masala | Kerakli dalil / qaror egasi | Nimaga ta’sir qiladi / vaqtinchalik yondashuv |
|---|---|---|---|
| Q-01 | Tartibga 2-ilova tarif jadvali taqdim etilgan PDFda yo‘q. | To‘liq tasdiqlangan ilova; Markaz/Jamg‘arma vakolatli iqtisodchilari | Rasmiy smeta hisobining bloklovchi kirishi. Demo stavka rasmiy deb olinmaydi; qolgan workflow tahlili davom etadi. |
| Q-02 | S79-A 2-bandning «8-band to‘rtinchi xatboshi» havolasi berilgan 346 nusxasi bilan mos kelmadi. | Buyruqning tasdiqlangan yig‘ma/to‘liq tahriri; hujjat egasi | Tegishli qoida aniqlanmaguncha yangi xatboshi yoki vakolat yaratilmaydi. |
| Q-03 | F3da Jamg‘arma buxgalteriya boshlig‘i imzosi bor, T10 faqat ikki kelishuvchi va o‘rinbosar tasdig‘ini bayon qiladi; shakllarda eski bo‘lim nomi. | Tasdiqlangan amaliy marshrut/shakl; BTRTR, Jamg‘arma, hujjat egasi | Imzo blokini saqlash; uning majburiy navbati va qaysi bosqichni bloklashi aniqlashtiriladi. |
| Q-04 | Sanash boshlanishi, kunning tugashi, dam olishga to‘g‘ri kelgan 5/10 sana, qabul farqi, qaytarish/pauza. | Qo‘llanadigan muddat qoidalari va ishlab chiqarish kalendari; vakolatli hujjat egasi | Sozlanadigan hisoblash; «kun/ish kuni» farqi o‘zgarmaydi; avtomatik yengillik yoki uzaytirish yo‘q. |
| Q-05 | Oylik miqdordan loyiha davomiyligi/kishi-soat/oy ulushiga o‘tish; yaxlitlash, soliqlar va valyuta aniqligi. | To‘liq tarif ilovasi va tasdiqlangan metodika; Markaz/Jamg‘arma | Agent `count × rate × months`ni yagona normativ formula deb belgilamaydi; 5% bazasi aniq saqlanadi. |
| Q-06 | Dalolatnoma foizlarining jami, bajarilishdan oylik summaga o‘tish, korrektirovka va takror davr hujjati. | Tasdiqlangan buxgalteriya hisoblash usuli va shartnoma shartlari | Satrlardagi ma’lumot to‘liq saqlanadi; asossiz foiz summasi/qat’iy bir-oy-bitta-satr cheklovi yo‘q. |
| Q-07 | 79 kuchga kirishidan oldingi/yarim yo‘ldagi ishlar, grandfather/cutover. | Amaldagi buyruq talqini va o‘tish qarori; vakolatli rahbar/hujjat egasi | Tarixni buzmasdan qoida versiyasi bilan migratsiya; soxta retroaktiv xulosa yo‘q. |
| Q-08 | Qaysi loyihaga qaysi ekspertiza zarur va majburiy xulosa olishning aniq bosqichi. | Tegishli tashqi qonunchilik va loyiha xususiyatlari; vakolatli ekspertiza mas’uli | Shartli branch. Barchasini «kerak emas» yoki «hammasiga shart» deb belgilamaslik. |
| Q-09 | TT/qiymat/hajm/muddat o‘zgarsa qayta Kengash, qayta buyruq/shartnoma, qo‘shimcha kelishuv zarurati. | Tasdiqlangan change-control, tegishli hujjatlar | Hujjat versiyalari va tarix saqlanadi; qayta tasdiq ta’siri qaror bilan belgilanadi. |
| Q-10 | Dalolatnomaga e’tiroz, qayta taqdim, muddatni qayta sanash, nizoni hal qilish va oldingi kelishuvlarning ta’siri. | Tashabbuskor/BTRTR/Markaz/Jamg‘arma kelishgan reglament | Sukut rozilik emas; ko‘rinadigan e’tiroz/javob/versiya, taxminiy SLA yo‘q. |
| Q-11 | Qisman moliyalashtirish, qaytarilgan to‘lov, bank/treasury manbasi, hisob-faktura raqamlari va integratsiya formati. | Jamg‘arma moliya tizimi kontrakti/amaliyoti | To‘lanishi lozim va haqiqiy to‘lov ajraladi; bir nechta tranzaksiyani yo‘qotmaydigan model tanlanadi. |
| Q-12 | Yuklama, ishlash tezligi, mavjudlik, backup/RPO/RTO, saqlash/arxiv muddati, audit saqlash muddati. | Amaldagi TT, IT/axborot xavfsizligi/arxiv siyosati | Buyruqda sonlar yo‘q. 99.9%, 2 soniya yoki 5 yil kabi sonlar agent tomonidan o‘ylab topilmaydi. |
| Q-13 | Reminder/eskalatsiya kimga, qachon, qaysi kanal, rahbar zanjiri va boshqalar. | Ichki nazorat reglamenti va foydalanuvchi qarori | Kechikish ko‘rinadi; avtomatik jazo, muddatni uzaytirish yoki kelishuv yaratish yo‘q. |
| Q-14 | Shaxsni tasdiqlash, elektron imzo provayderi, EDO API va qog‘oz hujjatni tekshirish tartibi. | Mavjud SSO/HR/EDO/ERI arxitekturasi va tegishli reglament | Mavjud integratsiya qayta ishlatiladi; aynan bitta provayder sotib olish/tanlash bu hujjat talabi emas. |
| Q-15 | Betaraf/ovoz bermagan a’zo qaydi, masofaviy ovozni tasdiqlash, bayonnoma imzolovchilari va bir shaxs bir nechta o‘rinda bo‘lishi. | Kengashning tasdiqlangan ish amaliyoti; BTRTR | Kvorum va oddiy ko‘pchilik saqlanadi; bir shaxsning ovozini takror sanashga asossiz yo‘l qo‘yilmaydi. |
| Q-16 | Rahbar/vaqtincha vazifa/tayinlovning amaldagi to‘liq reyestri, shtat birligi cheklovi. | HR/tashkiliy buyruqlar va rasmiy reyestr egasi | Veb-snapshot vakolat bermaydi; lavozimlar soni yoki ayni paytdagi odam soni qattiq yozilmaydi. |

Aniqlanmagan parametr tegishli moliyaviy yoki yuridik yakuniy amalni xavfsiz bajarishga to‘sqinlik qilsa shu amalning bloklovchisi deb belgilanadi. Bu butun tahlil yoki aloqasiz funksiyalarni to‘xtatish sababi emas. Savolga javob berilganda yangi qaror manbasi, sana, egasi va ta’sirlangan talab/testlar qayd etiladi.

## 16. Normativ qamrov nazorat xaritasi

Agent biror bandni tashlab ketmaganini ushbu xarita bilan tekshiradi.

| Manba qismi | Mazmun | Qamrov |
|---|---|---|
| S346-B:1 | Markaz va moliyalashtirish/ish haqi tashkiliy asosi | N-001–003; Q-01, Q-05 |
| S346-B:2 | Loyiha ro‘yxati va Tartib tasdiqlanishi | N-002,005; 2-bo‘lim |
| S346-B:3 | Mutaxassis, ish yuklamasi, maqsadli mablag‘, sifat/muddat | N-003,047 |
| S346-B:4–5 | Bir kunda yetkazish va nazorat | N-004 |
| S346-L | 2024-yil 7 satrli ro‘yxat | N-005; 17.2-bo‘lim |
| S346-T:1 | Tartib qamrovi | N-001 |
| S346-T:2 yangi tahrir | Konsepsiya, yo‘nalish kelishuvi, Kengash, direktor | N-006–007,026; S79-A:1 |
| S346-T:3 | Texnik talab, 5 ish kuni | N-029–033; D-04 |
| S346-T:4 | TT, EDO, tasdiqlovchi, smeta, oylik taqsimot | N-034–036; D-05 |
| S346-T:5 | Buyruq loyihasi, kelishuv, direktorga kiritish | N-043; D-06 |
| S346-T:6 | Shartli TT ekspertizasi, parallel tasdiq | N-037–038 |
| S346-T:7 | Mehnat, tarif, ish haqi jamg‘armasi, 5%, boshqaruv xarajati | N-039–042; Q-01, Q-05 |
| S346-T:8 | Shartnoma, shartli ekspertiza, past qiymatga moslash | N-044–046; D-07 |
| S346-T:9 | Har oy 5-sana, hisobot/dalolatnoma, uch imzo | N-048–049; D-08 |
| S346-T:10 | Ikki kelishuvchi 3 ish kuni, mas’ul o‘rinbosar tasdig‘i | N-050–051; D-09 |
| S346-T:11 | Tasdiqlangan dalolatnoma + hisob-faktura, 10-sana | N-056; D-10 |
| S346-T:12 | 2 ish kunida moliyalashtirish | N-057–058; D-11 |
| S346-T:13 | Markazning mablag‘dan samarali/o‘z muddatida foydalanish mas’uliyati | N-003,047 |
| S346-F1 | Texnik talab shaklining barcha bo‘lim va imzo rekvizitlari | N-030–033 |
| S346-F2 | Yetishmagan tarif ilovasi | N-040; Q-01 |
| S346-F3 | Dalolatnoma bosh qismi, barcha ustun/jami/imzo bloklari | N-052–055; Q-03, Q-06 |
| S79-B:1–2 | Kengash/tarkib/Nizom va o‘zgartirish tasdiqlanishi | 2-bo‘lim; N-013,028 |
| S79-B:3–4 | Yetkazish va nazorat | N-004 |
| S79-C va izoh | 10 o‘rin va lavozimga tayinlangan voris | N-013–014; 17.1-bo‘lim |
| S79-N:1–3 | Qamrov, huquqiy asos, maslahat/muvofiqlashtiruvchi organ | N-001,012; 1–2-bo‘lim |
| S79-N:4–5 | Vazifa/funksiyalar, tahlil, qo‘shimcha axborot, xulosa | N-012,019 |
| S79-N:6–7 | Tarkib va kvorum | N-013,015 |
| S79-N:8–10 | Tashabbuskor, paket, qaytarish, majlis, taqdimot | N-006,008–011 |
| S79-N:11–12 | Uch xulosa, oddiy ko‘pchilik, bayonnoma | N-016–018 |
| S79-N:13 | 7 mezon | N-019; 5.5-bo‘lim |
| S79-N:14–17 | Qayta ishlash sababi, muddati, ma’lumotnomasi | N-020–022 |
| S79-N:18–19 | Muddatida qaytmagan va qayta ko‘riladigan loyihalar | N-023–024 |
| S79-N:20 | Maqsadga muvofiq emaslik asoslari | N-025 |
| S79-N:21–22 | Majburiy xulosa va uchta taqiq | N-026–027 |
| S79-N:23–24 | Kuchga kirish va javobgarlik | N-028; Q-07 |
| S79-A:1–2 | Yangi 2-band va bo‘linma nomi | 2.3-bo‘lim; N-007,026,029,035,048,050; Q-02, Q-03 |

## 17. Tarixiy klassifikatorlar va boshlang‘ich ma’lumotlar

### 17.1. S79-Cdagi boshlang‘ich Kengash tarkibi

Quyidagi qisqartirilgan F.I.Sh.lar taqdim etilgan ilovadagi ko‘rinishda. Ular login yoki barqaror identity emas. Lavozim o‘rni barqaror, vakil/tayinlov davr bilan almashadi.

| № | Ilovadagi vakil | Lavozim / Kengash vazifasi |
|---|---|---|
| 1 | J. Abruyev | Direktor o‘rinbosari; Kengash raisi |
| 2 | S. Rasulev | Direktor maslahatchisi; Kengash raisi o‘rinbosari |
| 3 | B. Xidirbayev | Ijtimoiy himoya siyosatini ishlab chiqish va strategik rivojlantirish boshqarmasi boshlig‘i |
| 4 | R. Xo‘jaqulov | Korrupsiyaga qarshi kurashish va komplayens nazorati boshqarmasi boshlig‘i |
| 5 | S. Davronov | Moliya tahlili va rejalashtirish boshqarmasi boshlig‘i |
| 6 | Q. Komilov | Hududlarda ijtimoiy xizmatlarni rivojlantirish boshqarmasi boshlig‘i |
| 7 | J. Umarov | BTRTR bo‘limi boshlig‘i |
| 8 | M. Mirsodiqov | BTRTR bo‘limi boshlig‘i o‘rinbosari |
| 9 | Sh. Xasanov | Ijtimoiy himoya davlat jamg‘armasi direktor o‘rinbosari |
| 10 | S. Tursunov | Axborot texnologiyalari markazi direktori |

BTRTRning qisqartmasi ushbu hujjatda uzun nomni takrorlamaslik uchun kiritilgan. Agent uni majburiy rasmiy kod deb qabul qilmasin. Ovoz berishning haqiqiy shaxs dalili joriy tayinlov bilan olinadi, F.I.Sh. matni bilan qidirib avtomatik bog‘lanmaydi.

### 17.2. S346-Ldagi 2024-yil ro‘yxati

Quyidagi mazmun manbadagi uzun satrlarning ishchi mazmuniy bayoni; raqamlashtirishda asl hujjat havolasi saqlanadi. Bir satrdagi bir nechta mahsulot alohida tarixiy xizmatlar sifatida ochilishi mumkin, lekin ularni agent o‘zi yangi tasdiqlangan loyiha deb yaratmaydi.

| № | Loyiha mazmuni | Manbadagi tashabbuskorlar |
|---|---|---|
| 1 | Hududiy bo‘linmalarning mavjud dasturiy tizim, server, kompyuter va orgtexnikasiga texnik xizmat | Raqamli texnologiyalarni joriy etish bo‘limi |
| 2 | Call-markaz faoliyatini takomillashtirish va qo‘llab-quvvatlash | Hududlarda ijtimoiy xizmatlarni rivojlantirish bo‘limi |
| 3 | «Ijtimoiy himoya yagona reyestri»ni takomillashtirish/ta’minlash; bolalarni vasiylik/homiylik/oila tarbiyasiga berish tizimi; nogironlarni ro‘yxatga olish; ihma.uz; tizimlar uchun xususiy texnik topshiriqlar (CHTZ) | Ijtimoiy to‘lovlar boshqarmasi; og‘ir hayotiy vaziyatga tushib qolgan bolalar uchun ijtimoiy xizmatlarni rivojlantirish boshqarmasi; nogironligi bo‘lgan shaxslarning funksionalligini baholash boshqarmasi; Raqamli texnologiyalarni joriy etish bo‘limi |
| 4 | Og‘ir ijtimoiy ahvoldagi xotin-qizlarga ijtimoiy-huquqiy/psixologik yordam va manzilli qo‘llash bo‘yicha «1146» ishonch telefoni xizmati | Ayollarni reabilitatsiya qilish va moslashtirish markazi; Hududlarda ijtimoiy xizmatlarni rivojlantirish bo‘limi; katta yoshdagilar uchun ijtimoiy xizmatlarni rivojlantirish va monitoring qilish yo‘nalishi |
| 5 | «Yagona milliy ijtimoiy himoya» serverlariga dasturiy xizmat (DevOps, DbOps) | Raqamli texnologiyalarni joriy etish bo‘limi |
| 6 | «Yagona milliy ijtimoiy himoya» negizida «Inson uchun» modulini ishlab chiqish | Nodavlat notijorat tashkilotlari va volontyorlar bilan ishlash bo‘limi |
| 7 | Ijtimoiy qo‘llab-quvvatlash markazi, Muruvvat internat uylari, Sanatoriya, Inson modullarini kuzatish va qo‘shimcha biznes jarayonlar | Katta yoshdagilar uchun ijtimoiy xizmatlarni rivojlantirish va monitoring qilish boshqarmasi; nogironligi bo‘lgan shaxslar uchun tibbiy-ijtimoiy xizmatlarni rivojlantirish boshqarmasi |

Bu jadvaldan ushbu boshqaruv modulining o‘zi «vasiylik», «nogironlarni ro‘yxatga olish» yoki «Call-markaz»ning to‘liq ichki funksiyalarini ishlab chiqishi shart degan xulosa chiqarilmaydi. Bu yerda ularning loyiha/hujjat/ijro/moliyalashtirish boshqaruvi qamrab olinadi.

## 18. Bajarildi deb hisoblash mezonlari

Tahlil bosqichi quyidagilar bo‘lganda tugallangan hisoblanadi:

- N-001–N-058, U-001–U-008, T-001–T-031 va M-01–M-09 bo‘yicha dalil/moslik/amal natijasi bor; tekshirilmagan qismlar ochiq ko‘rsatilgan.
- Har bir normativ band 16-bo‘lim bo‘yicha qamrab olingan; istisno va shartli branchlar asoslangan.
- BE, FE, DB, integratsiya, hujjat shakli va mavjud ma’lumot ta’siri alohida ko‘rsatilgan.
- Q-01–Q-16 bo‘yicha qaror egasi va keyingi qadam bor; taxminlar «tasdiqlangan norma» sifatida yozilmagan.
- Saqlanadigan qismlar, o‘zgaradigan va foydalanishdan chiqariladigan eski qoidalar aniq; umumiy komponentlar va tarixiy dalillar himoyalangan.

Implementatsiya topshirilgan bo‘lsa, qo‘shimcha ravishda: tegishli server/UI/integratsiya testlari, AT-01–AT-36ning qo‘llanadiganlari, migratsiya pre/post tekshiruvi va UAT dalillari mavjud. Ochiq bloklovchi masalalar bo‘lsa «to‘liq buyruqqa mos» yoki «ishga tayyor» degan xulosa berilmaydi; qaysi qismi bajarilgani va qolgan cheklov aniq yoziladi.

## 19. Boshqa AI agentga beriladigan tayyor topshiriq

```text
Ushbu IHMA-PG-346-79-REQ spetsifikatsiyasini talablar bazasi sifatida o‘qi.
Bizda real backend va frontend mavjud; ular boshqa talablar bilan yaratilgan.
Tizimni noldan yaratishdan yoki to‘liq qayta yozishdan boshlama.

1. Repo/muhit/manbalarni inventarizatsiya qil; ko‘rinmayotgan backend yoki
   integratsiyani yo‘q deb taxmin qilma. Amaldagi qo‘shimcha buyruq/TTlarni top.
2. 346 va 79 buyruqlarning asl nusxalarini, yig‘ma tahrir qoidasini va barcha
   N/T/U/M talablarni kod/API/DB/UI/integratsiya/hujjatlar bilan solishtir.
3. Har talab uchun dalil (commit, file:line, endpoint/schema, test) ko‘rsatib,
   FULL/PARTIAL/ABSENT/CONFLICT/NOT_VERIFIED/NOT_APPLICABLE bahosini ber.
4. KEEP/MODIFY/ADD/RETIRE/INVESTIGATE amalini va sababini yoz.
   RETIRE ma’lumotni jismonan o‘chirishga ruxsat degani emas.
5. Foydalanuvchi, lavozim va jarayon vakolatlarini ajrat; ish lavozimda qolib,
   vakolatli voris davom ettirsin, eski shaxsning imzo/ovozi o‘zgarmasin.
6. Normativ talab, texnik hosila va ochiq savolni aralashtirma.
   Q reyestridagi masalalarga o‘zingdan norma yoki sonli SLA kiritma.
7. Saqlanadigan qismlar, BE/FE/DB/integratsiya o‘zgarishlari, eski-yangi
   mapping, migratsiya/rollback va qabul testlarini alohida rejalashtir.
8. Natija: as-is xarita, to‘liq gap-matritsa, prioritetlangan ishlar rejasi,
   ochiq savollar, migratsiya va test rejasi. Haqiqiy tizimga kirish yetishmasa
   tekshirilmagan doirani aniq yoz; bajarilgan deb ko‘rsatma.

Hozirgi topshiriq faqat tahlil bo‘lsa kod/production/DBni o‘zgartirma.
Implementatsiya alohida topshirilganda, dalillangan reja asosida mavjud
arxitektura va umumiy servislardan qayta foydalanib bajar.
```
