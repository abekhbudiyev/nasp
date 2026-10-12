# Transport imtiyozlari modulini rivojlantirish uchun AI agentga tavsiyaviy topshiriq

Sana: 2026-yil 12-oktabr.

## 1. Vazifa va mavjud tizim

Backend va frontend real holatda mavjud, MVP chiqarilgan. Imtiyoz oluvchilar, huquqlar va chiptalarni yuritish mavjud funksiyalar sifatida qabul qilinsin. Ushbu topshiriq yangi tizimni noldan yaratish emas, mavjud tizimdagi moliyaviy jarayonni yakunlash va qolgan talablarni moslashtirish uchun tavsiyaviy yo‘riqnomadir.

Agent avvalo o‘zi ishlayotgan real repository, API kontraktlari, DB modellari va ekranlarni tekshirishi tavsiya etiladi. Mahalliy NASP prototipi biznes oqimini ko‘rsatadi; u real backendning barcha imkoniyatlari va holati bo‘yicha dalil sifatida olinmaydi. Ushbu topshiriq real backend repositorysini to‘liq audit qilingan deb hisoblamaydi.

Tavsiya etiladigan natija: mavjud ishlaydigan funksiyalarni saqlagan holda fayllar, oylik buyurtmanomalar, tekshirish, tasdiqlash, subsidiya almashinuvi, to‘lov statuslari va hisobotlarni yagona jarayonga bog‘lash.

## 2. Agentning boshlang‘ich tekshiruvi

Implementatsiyadan oldin quyidagi qisqa jadvalni tayyorlash tavsiya etiladi:

| Yo‘nalish | Mavjud kod/API | Holat | Qolgan ish | O‘zgarish ta’siri |
|---|---|---|---|---|
| Fayl xizmati va fileconfig | Aniqlanadi | Tayyor / qisman / yo‘q | Aniqlanadi | Aniqlanadi |
| Buyurtmanoma va versiya | Aniqlanadi | Tayyor / qisman / yo‘q | Aniqlanadi | Aniqlanadi |
| Tekshirish va tasdiqlash | Aniqlanadi | Tayyor / qisman / yo‘q | Aniqlanadi | Aniqlanadi |
| Subsidiya va statuslar | Aniqlanadi | Tayyor / qisman / yo‘q | Aniqlanadi | Aniqlanadi |
| Frontend va hisobotlar | Aniqlanadi | Tayyor / qisman / yo‘q | Aniqlanadi | Aniqlanadi |

Tayyor qismni qayta yaratmaslik, qisman qismni kengaytirish, yo‘q qism uchun mavjud arxitekturaga mos yechim qo‘shish tavsiya etiladi. Texnologiya, ORM, queue, fayl ombori yoki auth tizimini almashtirish bu topshiriqdan kelib chiqadigan talab emas.

Endpoint nomlari quyida tavsiya sifatida berilgan. Mavjud API shu biznes vazifani bajarsa, uni saqlash va mapping/adapterni hujjatlashtirish ma’qul. Bir vazifaga ikkita parallel API yaratish kerak emas. Amaldagi mijozlarga ta’sir qiladigan kontrakt o‘zgarishi moslik yoki versiyalash orqali joriy qilinadi.

## 3. Umumiy biznes jarayon

1. Tashuvchi fayl sozlamalarini oladi.
2. Kerakli fayllarni alohida yuklab, file_id oladi.
3. O‘tgan oy uchun buyurtmanoma, chipta qatorlari, bank rekvizitlari va hujjat IDlarini yuboradi.
4. Tizim mavjud huquq va chipta reyestrlari bilan tekshiradi.
5. Xatolar bo‘lsa qator sabablari qaytariladi; tashuvchi ayni buyurtmanomaning yangi versiyasini yuboradi.
6. Mas’ul tasdiqlagan summa, buyurtmanoma versiyasi va bank rekvizitlari subsidiya moduliga yuboriladi.
7. Subsidiya natijasi saqlanadi; tashuvchiga xabar yuboriladi.
8. Tashuvchi request_id orqali joriy holatni so‘rashi mumkin.

Buyurtmanoma qabul qilinganligi, tasdiqlanganligi va pul o‘tkazilganligi alohida holatlardir. Qoplash summasi tekshirilgan chipta qatorlariga tayanadi.

## 4. Backend uchun batafsil tavsiyalar

### BE-01. Fileconfig va fayl xizmatini moslashtirish

Mavjud fayl xizmatidan foydalanish tavsiya etiladi. Fileconfigda jarayon maqsadi, hujjat turining id/code qiymati, nomi, kengaytmalari va majburiylik shartlari boshqarilsin. Masalan, elektron chiptalar uchun yo‘nalish qaydnomasi shartli majburiy bo‘ladi. Fayl hajmi va soni cheklovlari mavjud xizmatdan olinsin; yangi qiymatlar taxmin bilan kiritilmasin.

Fayl alohida yuklanib, IDsi qaytarilsin. Buyurtmanoma bilan bog‘lashda fayl mavjudligi, turi, tayyor holati va tashkilotga tegishliligi tekshirilsin. Binary/base64 buyurtmanoma bodyga qo‘shilmasin. Faylni ko‘rish/yuklab olish amaldagi xizmat bilan ta’minlansin.

**Yakun mezoni:** mos fayl IDsi biriktiriladi; yo‘q, yuklanishi tugamagan yoki boshqa tashkilot fayli rad etiladi. Majburiylik tekshiruvi faqat frontendga qoldirilmaydi.

### BE-02. Buyurtmanoma va tuzatish modelini to‘ldirish

Mavjud settlement/claim/buyurtmanoma modelini tekshirib, ayni obyektni kengaytirish tavsiya etiladi. Tashuvchi, hisobot oyi, manba buyurtmanoma raqami, ichki request_id, versiya, chipta qatorlari, hujjat IDlari, bank rekvizitlari, summalar va topshirilgan vaqt bog‘langan holda saqlansin.

Ayni tashkilot va source_request_id bo‘yicha ayni mazmun qayta kelsa oldingi natija qaytarilsin. Boshqa mazmun oddiy takror sifatida qabul qilinmasin. Tuzatish oldingi versiyaga bog‘langan yangi versiya yaratsin; tarix o‘chirilmasin. Bir oy uchun mutlaq bitta buyurtmanoma cheklovi reglamentdan tasdiqlanmasdan kiritilmasin.

To‘lovga yuborilgan versiya va rekvizitlar o‘zgarmas bo‘lsin. Keyingi moliyaviy tuzatish alohida kelishilgan mexanizm bilan bajarilsin. Ro‘yxat/detailda pagination, davr, tashuvchi va holat filtrlari mavjud API uslubiga mos berilsin.

**Yakun mezoni:** tuzatish yangi mustaqil to‘lov talabiga aylanmaydi; eskirgan base_version bo‘yicha yozish konflikti tushunarli qaytariladi.

### BE-03. Tekshirish va moliyaviy qaror

Mavjud tekshirish engine’i mavjud bo‘lsa undan foydalanish tavsiya etiladi. Har bir qator uchun chipta/tashuvchi/davr mosligi, imtiyoz asosi, summalar, hujjatlar, chipta holati, almashtirish va qaytarish zanjiri tekshirilsin.

Bir xil chipta yoki hisobga olinadigan segmentni turli buyurtmanoma/kanal orqali takror qoplash bloklansin. Mavjud segment hisobini yo‘qotib, faqat ticket_id bo‘yicha soddalashtirish kiritilmasin. Parallel tasdiqlash/yuborish holatida ham takroriy qoplashning oldi olinsin.

So‘ralgan, hisoblangan, tasdiqlangan va to‘langan summa alohida saqlansin. Foiz, tarif komponenti, yuqori klass qo‘shimchasi va qoplash asosi amaldagi tasdiqlangan qoidalardan olinsin. Boarding/TRAVELLED barcha transportlar uchun avtomatik majburiy talabga aylantirilmasin.

Qator xatosi line_id, ticket_id, reason id/code, izoh va kerak bo‘lsa kutilgan summa bilan qaytsin. Mas’ulning qarori, sababi, vaqti va mavjud vakolati saqlansin. Yakuniy REJECTED holati bilan NEEDS_CORRECTION farqlansin. Tasdiqlash uchun faqat UI checkbox yetarli bo‘lmasin; server biznes tekshiruvlari va mavjud permissionlar ishlasin.

**Yakun mezoni:** tekshirilmagan yoki yaroqsiz buyurtmanoma to‘lovga o‘tmaydi; xatolar qator darajasida ko‘rinadi; tasdiqlangan summaning asosi tiklanadi.

### BE-04. Subsidiya adapteri va status almashinuvi

Subsidiya modulining haqiqiy kontraktini tekshirish, mavjud integratsiya adapterini kengaytirish tavsiya etiladi. Buyurtmanoma IDsi/versiyasi, tasdiqlangan summa, hisobvaraq va tashqi to‘lov raqami aniq bog‘lansin.

Yuborishda amaldagi ishonchli yetkazish/retry mexanizmidan foydalanilsin. Timeout yoki javob yo‘qolishi FAILED deb yakunlanmasin: avval tashqi holat tekshirilsin, ayni operatsiya identifikatori bilan tiklash bajarilsin. Pul harakati uchun yangi identifikator yaratib ko‘r-ko‘rona qayta yuborish tavsiya etilmaydi.

Callbacklar takror va tartibsiz kelishi mumkin. PAIDdan keyin eski PROCESSING xabari kelganda holat ortga qaytmasin. Summa, valyuta, to‘lov IDsi va versiya solishtirilsin. Qisman to‘lov, qaytarilgan to‘lov yoki boshqa terminal status bo‘lsa subsidiya kontraktiga mos mapping qo‘shilsin; mavjud ma’lumot yo‘qotilmasin.

Tashuvchiga yuborilgan xabar identifikatori va yetkazish natijasi saqlansin; callback GET holat API o‘rnini bosmaydi. Moliyaviy muddatni mavjud ish kunlari kalendari orqali kuzatish tavsiya etiladi. Kamchilik/tuzatish muddatni qanday o‘zgartirishi tasdiqlanmagan bo‘lsa agent o‘zi muddatni qayta boshlash qoidasini yaratmasin.

**Yakun mezoni:** tasdiqlangan talab haqiqiy tashqi payment_id bilan bog‘lanadi; to‘lov natijasi GET va xabarnomada bir xil; takror yuborish ikkinchi to‘lov yaratmaydi.

### BE-05. Reyestrlar, ma’lumotnomalar va hisobot

Mavjud shaxs/huquq/chipta/hisobot modullarini boyitish tavsiya etiladi. Shaxs kartochkasiga safar, hamroh, qaytarish va haqiqiy to‘lov ma’lumotlari bog‘lansin. PINFLdan boshqa shaxsiy ma’lumotlarni tashuvchining buyurtmanomasida qayta talab qilish o‘rniga mavjud registrdan olish ma’qul.

Toifalar soni, geografiya va statuslar tasdiqlangan ma’lumotnomadan olinsin. Shaxs holati va huquq holati alohida bo‘lsin; “chet elda”, “vafot etgan” kabi sabablar ta’siri amaldagi qoidaga tayanishi kerak. Hamroh mustaqil imtiyoz toifasi sifatida takrorlanmasin.

Shaxslar soni, chiptalar soni, buyurtmanomalar soni va qatorlar soni uchun aniq hisoblash qoidalari belgilang. Hudud deganda yashash, safar yoki tashkilot hududi nazarda tutilganini aniqlang. Moliya hisobotida so‘ralgan/tasdiqlangan/to‘langan summa ajratilsin. Excel eksporti va hisobot tarixida davr, filtrlar, yaratilgan vaqt va natija file_idsi qayd etilsin.

**Yakun mezoni:** kartochka, detail ro‘yxat va eksport bir xil filtr/ma’lumot manbasiga tayanadi; ID jami son bilan tenglashtirilmaydi.

## 5. Frontend uchun batafsil tavsiyalar

### FE-01. Fileconfig va hujjatlarni biriktirish

Mavjud upload komponenti va API clientdan foydalanish tavsiya etiladi. Fayl nomlari, kengaytmalari va majburiylik GET fileconfig javobidan ko‘rsatilsin. Avval fayl xizmati muvaffaqiyatli ID qaytarsin, keyin buyurtmanoma uchun reference shakllansin.

Yuklanish, xato, qayta urinish, faylni almashtirish va mavjud faylni ko‘rish holatlari ishlasin. Yuklash tugamasdan yuborish bloklansin. Faylni formadan chiqarish darhol xizmatdagi umumiy faylni o‘chirishga tenglashtirilmasin.

**Yakun mezoni:** requestda faqat hujjat turi va file_id bor; forma hamda server majburiylik qoidalari mos.

### FE-02. Yagona buyurtmanoma reyestri va detail

Mavjud moliyalashtirish/reyestr sahifasini kengaytirish tavsiya etiladi. Holat va tashuvchi bo‘yicha ko‘rinishlar umumiy ro‘yxatning filtr/tablari bo‘lsin. Jami son, pagination va ro‘yxat bir xil filtrlar bilan ishlasin.

Davr, tashuvchi nomi/STIRi, buyurtmanoma raqami, sana, mas’ul, so‘ralgan/tasdiqlangan summa va statusni ko‘rsating. Detailda fuqarolar/chiptalar, tarif, imtiyoz, fayllar, bank rekvizitlari va versiyalar tarixi bo‘lsin. Mavjud API maydonlari yetmasa backendga aniq maydon talabi yozilsin; ko‘rinish uchun sun’iy qiymat yaratilmasin.

**Yakun mezoni:** tashuvchi yoki status uchun takroriy ekranlar yo‘q; foydalanuvchi ro‘yxatdan tegishli qatorlarga o‘ta oladi.

### FE-03. Tekshirish, tuzatish va qaror oynasi

Backend qaytargan qator xatolari va sabablar sodda tilda chiqarilsin. Tuzatish ayni request_idning yangi versiyasiga bog‘lansin. Yuborilgandan keyingi noaniq javobda avtomatik yangi buyurtmanoma yaratish o‘rniga holat so‘ralsin.

Tasdiqlash, tuzatishga qaytarish va yakuniy rad etish amallari mavjud permissionlarga bog‘lansin. Qaror sababi, summa, hisobvaraq, mas’ul va vaqt detailda ko‘rsatilsin. Tasdiqlangan/to‘lovga yuborilgan versiya frontenddan tahrir qilinmasin.

**Yakun mezoni:** qaysi qator nima sababdan rad/tuzatish talab qilayotgani tushunarli; takror bosish ikkinchi buyurtmanoma yoki to‘lov yaratmaydi.

### FE-04. To‘lov statuslari va tashuvchiga natija

Mavjud moliyaviy ekran/status komponentlarini qayta foydalanish tavsiya etiladi. Payment holati backenddan olinsin; UI o‘zi PAID hosil qilmasin. payment_id, summa, sana, hujjat va xato sababi chiqarilsin.

Statusni yangilash/polling mavjud client uslubiga mos bo‘lsin; fon/tab yopilganda keraksiz so‘rovlar to‘xtasin. Retry mumkinligi backenddan aniqlansin. “Qabul qilindi”, “Tasdiqlandi” va “To‘landi” aniq farqlansin. Tashuvchiga yuborilgan xabarlar tarixi va raqam orqali qidirish qo‘llab-quvvatlansin.

**Yakun mezoni:** GET natijasi va ekran bir xil; real ish rejimida demo to‘lov tasdiqlash tugmalari ishlamaydi.

### FE-05. Qolgan reyestrlar, hisobotlar va UX

Mavjud shaxs kartochkasi, qaytarilgan chiptalar tablari va statistika ko‘rinishlari orqali talablarni to‘ldirish tavsiya etiladi. Safar/to‘lov tarixi faqat mavjud ma’lumotlar davrini ko‘rsatsin. Foto mavjud ishonchli manbadan olinishi mumkin; moliyaviy jarayonning majburiy old sharti qilinmasin.

Hisobotlar davr, hudud, manba, toifa, transport, tashuvchi va mamlakat filtrlari bilan APIga ulansin. Excel eksporti va tarix alohida mavjud report xizmatiga mos ishlasin. Statistik kartochka ayni filtrlangan ro‘yxatni ochsin. Bajarilgan nomlar, sanalar, sonlar, ranglar va filtrlar umumiy komponentlar orqali saqlansin.

Integrations sahifasidagi API namunalari amaldagi backend/OpenAPI bilan moslashtirilsin. Prototip uchun yozilgan endpoint yoki response real backendga avtomatik haqiqat sifatida ko‘chirilmasin.

**Yakun mezoni:** demo qiymatlar real hisobotga aralashmaydi; yangi va mavjud ekranlar bir xil sodda atamalardan foydalanadi.

## 6. Tavsiya etiladigan APIlar va almashinuv modellari

Bu bo‘lim biznes kelishuv namunasidir. Amaldagi API nomi yoki status IDlari farq qilsa, mavjud qiymatlar saqlanadi va mapping yoziladi. Quyidagi raqamlar mavjud bazadagi IDlarni qayta raqamlash topshirig‘i emas.

| Tomon | API | Qachon ishlatiladi |
|---|---|---|
| Tashuvchi → tizim | GET /v1/file-configs?purpose_code=TRANSPORT_REIMBURSEMENT | Fayllarni tanlashdan oldin |
| Tashuvchi → fayl xizmati | POST /v1/files | Har bir fayl uchun alohida |
| Tashuvchi → tizim | POST /v1/reimbursement-requests | Oylik buyurtmanoma yuborilganda |
| Tashuvchi → tizim | POST /v1/reimbursement-requests/{request_id}/corrections | Tuzatish talab qilinganda |
| Tizim → subsidiya | Mavjud subsidiya to‘lov APIsi | Buyurtmanoma tasdiqlangach |
| Subsidiya → tizim | POST /v1/payment-events yoki mavjud callback | To‘lov statusi o‘zgarganda |
| Tizim → tashuvchi | Kelishilgan callback manzili | Buyurtmanoma/to‘lov holati o‘zgarganda |
| Tashuvchi → tizim | GET /v1/reimbursement-requests/{request_id} | Joriy holatni olish uchun |

### 6.1. Fileconfig javobi

```json
{
  "purpose": { "id": 1, "code": "TRANSPORT_REIMBURSEMENT" },
  "files": [
    { "id": 1, "code": "TICKET_COPY", "name": "Chipta nusxalari", "extensions": ["pdf", "zip"], "required": true },
    { "id": 2, "code": "ROUTE_SHEET", "name": "Yo‘nalish qaydnomasi", "extensions": ["pdf", "xlsx", "xls"], "required": true, "required_when": { "electronic_tickets": true } },
    { "id": 3, "code": "COST_CALCULATION", "name": "So‘ralayotgan summa hisob-kitobi", "extensions": ["pdf", "xlsx", "xls"], "required": true }
  ]
}
```

Kengaytmalar namuna. Haqiqiy ruxsatlar mavjud fileconfigdan olinadi. required_when shartli majburiylikni bildiradi; ROUTE_SHEET elektron chiptalar bor bo‘lganda talab qilinadi.

### 6.2. Fayl yuklash

Request multipart/form-data: `type_id=1`, `type_code=TICKET_COPY`, `file=<binary>`. Haqiqiy xizmatdagi ekvivalent format saqlanishi mumkin.

```json
{
  "file_id": "FILE-001",
  "type": { "id": 1, "code": "TICKET_COPY" },
  "file_name": "chipta-nusxalari.pdf",
  "size_bytes": 245760
}
```

### 6.3. Buyurtmanoma request va response

```json
{
  "source_request_id": "BUY-2026-10-001",
  "period": "2026-10",
  "bank_account": { "account_number": "20208000000000000001", "bank_code": "00444" },
  "currency": { "id": 1, "code": "UZS" },
  "lines": [{ "line_id": "1", "ticket_id": "UTY-78394510", "requested_amount_minor": 24800000 }],
  "documents": [
    { "type": { "id": 1, "code": "TICKET_COPY" }, "file_id": "FILE-001" },
    { "type": { "id": 2, "code": "ROUTE_SHEET" }, "file_id": "FILE-002" },
    { "type": { "id": 3, "code": "COST_CALCULATION" }, "file_id": "FILE-003" }
  ]
}
```

```json
{
  "request_id": "REQ-001",
  "source_request_id": "BUY-2026-10-001",
  "version": 1,
  "request_status": { "id": 1, "code": "RECEIVED" },
  "payment_status": { "id": 1, "code": "NOT_SENT" },
  "requested_amount_minor": 24800000,
  "received_at": "2026-11-05T10:00:00+05:00"
}
```

Tashuvchi amaldagi integratsiya kontekstidan aniqlanadi. PINFL/foto/pasport qayta yuborilmaydi; ticket_id orqali mavjud chipta va shaxsga bog‘lanadi. Segment darajasida ishlaydigan tizimda qatorga amaldagi segment identifikatori qo‘shiladi.

### 6.4. Tuzatish request va response

```json
{
  "base_version": 1,
  "lines": [{ "line_id": "1", "ticket_id": "UTY-78394510", "requested_amount_minor": 24000000 }],
  "documents": [{ "type": { "id": 3, "code": "COST_CALCULATION" }, "file_id": "FILE-004" }]
}
```

```json
{
  "request_id": "REQ-001",
  "version": 2,
  "request_status": { "id": 1, "code": "RECEIVED" },
  "requested_amount_minor": 24000000
}
```

Tavsiya etilgan semantika: lines — versiyaning to‘liq yangi qatorlari; documents — berilgan hujjat turi bo‘yicha almashtirish, qolganlari saqlanadi. Bir turga bir nechta fayl qo‘llanadigan mavjud tizimda almashtirish qoidasi aniq hujjatlashtirilsin. Qabul vaqti/versiya topshirilgan vaqti alohida saqlansin.

### 6.5. Tuzatish talab qilinayotgan holat javobi

```json
{
  "request_id": "REQ-001",
  "version": 1,
  "request_status": { "id": 2, "code": "NEEDS_CORRECTION" },
  "payment_status": { "id": 1, "code": "NOT_SENT" },
  "line_results": [{
    "line_id": "1",
    "ticket_id": "UTY-78394510",
    "valid": false,
    "errors": [{ "reason": { "id": 2, "code": "AMOUNT_MISMATCH" }, "message": "So‘ralgan summa hisob-kitobga mos emas.", "expected_amount_minor": 24000000 }]
  }]
}
```

### 6.6. Subsidiya almashinuvi namunasi

Quyidagi model haqiqiy subsidiya kontraktiga adapter orqali moslashtirilishi tavsiya etiladi; endpoint nomi taxmin qilinmaydi.

```json
{
  "external_request_id": "REQ-001-V2",
  "request_id": "REQ-001",
  "request_version": 2,
  "recipient": { "organization_id": "ORG-UTY", "bank_account": "20208000000000000001", "bank_code": "00444" },
  "currency": { "id": 1, "code": "UZS" },
  "amount_minor": 24000000,
  "purpose": "2026-yil oktabr oyidagi imtiyozli chipta xarajatlarini qoplash"
}
```

```json
{
  "external_request_id": "REQ-001-V2",
  "payment_id": "PAY-001",
  "payment_status": { "id": 2, "code": "PROCESSING" },
  "accepted_amount_minor": 24000000
}
```

### 6.7. To‘lov callback request va response

```json
{
  "source_event_id": "SUB-EVENT-001",
  "external_request_id": "REQ-001-V2",
  "payment_id": "PAY-001",
  "payment_status": { "id": 3, "code": "PAID" },
  "paid_amount_minor": 24000000,
  "paid_at": "2026-11-09T14:30:00+05:00",
  "payment_document_number": "TO-2026-00981"
}
```

```json
{ "event_id": "PAY-EVENT-001", "source_event_id": "SUB-EVENT-001", "received": true }
```

### 6.8. GET holat response

```json
{
  "request_id": "REQ-001",
  "source_request_id": "BUY-2026-10-001",
  "version": 2,
  "period": "2026-10",
  "request_status": { "id": 4, "code": "APPROVED" },
  "payment_status": { "id": 3, "code": "PAID" },
  "currency": { "id": 1, "code": "UZS" },
  "requested_amount_minor": 24000000,
  "approved_amount_minor": 24000000,
  "paid_amount_minor": 24000000,
  "payment_id": "PAY-001",
  "paid_at": "2026-11-09T14:30:00+05:00",
  "payment_document_number": "TO-2026-00981"
}
```

GET requestda body yo‘q. Natija hali bo‘lmasa payment_id/paid_at/payment_document_number null bo‘lishi mumkin; paid_amount_minor nol, status esa haqiqiy bosqichni bildiradi.

### 6.9. Tashuvchiga xabar request va response

```json
{
  "notification_id": "NTF-001",
  "request_id": "REQ-001",
  "source_request_id": "BUY-2026-10-001",
  "version": 2,
  "request_status": { "id": 4, "code": "APPROVED" },
  "payment_status": { "id": 3, "code": "PAID" },
  "payment_id": "PAY-001",
  "paid_amount_minor": 24000000,
  "paid_at": "2026-11-09T14:30:00+05:00"
}
```

```json
{ "notification_id": "NTF-001", "received": true }
```

## 7. Ma’lumotnomalar va holat qoidalari

### Holatlar namunasining mappingi

| Katalog | ID | Code | Ma’nosi |
|---|---:|---|---|
| Buyurtmanoma | 1 | RECEIVED | Qabul qilindi |
| Buyurtmanoma | 2 | NEEDS_CORRECTION | Tuzatish kerak |
| Buyurtmanoma | 3 | VALIDATED | Tekshirildi |
| Buyurtmanoma | 4 | APPROVED | Tasdiqlandi |
| Buyurtmanoma | 5 | REJECTED | Yakuniy rad etildi — amaldagi reglament/katalogga moslashtiriladi |
| To‘lov | 1 | NOT_SENT | Yuborilmagan |
| To‘lov | 2 | PROCESSING | Jarayonda |
| To‘lov | 3 | PAID | To‘langan |
| To‘lov | 4 | FAILED | Bajarilmagan |

Odatdagi o‘tish: RECEIVED → VALIDATED → APPROVED. Xatoda RECEIVED → NEEDS_CORRECTION, tuzatishdan keyin yangi versiya RECEIVED bo‘ladi. Yakuniy rad etish reglament bo‘yicha REJECTEDga o‘tadi. APPROVEDdan keyin to‘lov NOT_SENT → PROCESSING → PAID/FAILED oqimida yuritiladi. To‘lov holati buyurtmanoma holatini almashtirmaydi.

### Tekshirish sabablari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | TICKET_NOT_FOUND | Chipta topilmadi |
| 2 | AMOUNT_MISMATCH | Summa mos emas |
| 3 | TICKET_NOT_CLAIMABLE | Chipta qoplashga mos emas |
| 4 | ALREADY_CLAIMED | Chipta boshqa tasdiqlangan talabda mavjud |
| 5 | DOCUMENT_MISSING | Majburiy hujjat yo‘q |
| 6 | FILE_NOT_FOUND | Fayl topilmadi |
| 7 | FILE_OWNER_MISMATCH | Fayl boshqa tashkilotga tegishli |
| 8 | BANK_ACCOUNT_MISMATCH | Hisobvaraq mos emas |
| 9 | PERIOD_MISMATCH | Chipta davrga mos emas |
| 10 | OTHER_PAYMENT_CHANNEL | Boshqa kanal orqali qoplanadi |

Kataloglar amaldagi reference-data orqali boshqariladi. id/code mosligi tekshiriladi; mavjud IDlar o‘chirilmaydi yoki boshqa ma’noga qayta ishlatilmaydi.

### Pul va identifikatorlar

- Namunadagi UZS exponenti 2; 24000000 minor birlik = 240 000 so‘m. Backend Money modelidan foydalanish, frontendda faqat ko‘rsatish/kiritish konvertatsiyasi tavsiya etiladi. Summalar float bilan hisoblanmaydi.
- request_id — ichki buyurtmanoma; source_request_id — tashuvchi raqami; version — o‘zgarmas topshirilgan versiya.
- file_id — alohida fayl xizmati identifikatori; payment_id — subsidiya tizimidagi to‘lov; source_event_id — tashqi status xabari raqami.
- Takroriylik tashkilot va tegishli operatsiya doirasida tekshiriladi; bir tashkilotning manba raqami boshqasiga tegishli raqam bilan to‘qnashmasin.

## 8. Normativ va tasdiqlanadigan biznes chegaralari

[VMQ-440 Nizomining 17–18-bandlari](https://lex.uz/docs/8400823#8405929): tashuvchi oylik reyestrni keyingi oyning 10-sanasigacha zarur ilovalar va amaldagi/imtiyozli qiymatlar bilan taqdim etadi. Mablag‘ hujjatlar taqdim etilgach 10 ish kuni ichida tashuvchining bank hisobvarag‘iga o‘tkaziladi.

Fayl APIlari, REST nomlari va callback/status modellari loyiha yechimidir. Agent tarif yig‘imlari, qisman qabul/to‘lov, kech topshirish, kamchilikli hujjatning muddatga ta’siri va to‘lovdan keyingi qaytarish bo‘yicha yangi qoida o‘zi yaratmasligi tavsiya etiladi. Mavjud tasdiqlangan reglament qo‘llanadi; bo‘lmasa tafovut aniq qayd qilinadi va ushbu qarorga bog‘liq bo‘lmagan ishlar davom ettiriladi.

Ijtimoiy karta orqali qoplangan chipta oylik buyurtmanomada ikkinchi marta qoplanmasligi kerak. Bitim geografiyasi “barcha MDH davlatlari” kabi soddalashtirilgan hardcode ro‘yxatga almashtirilmasin.

## 9. Integratsiya va yakuniy qabul sinovlari

Mavjud test vositalari va CI jarayonlaridan foydalanish tavsiya etiladi. Quyidagi biznes ssenariylari tekshirilsin:

1. Fileconfig → haqiqiy fayl yuklash → file_id bilan buyurtmanoma → tasdiqlash → subsidiya → PAID → tashuvchiga xabar va GET.
2. Yo‘q/boshqa tashkilot fayli va majburiy hujjat yetishmasligi.
3. Qaytarilgan/almashtirilgan chipta, noto‘g‘ri summa, davr yoki tashuvchi.
4. Takroriy buyurtmanoma, parallel tasdiqlash va ikki kanal orqali qoplashga urinish.
5. NEEDS_CORRECTION → ayni request_idning yangi versiyasi; eski versiyaning saqlanishi.
6. Subsidiya timeouti, takroriy callback va tartibsiz statuslar; ikkinchi to‘lov yaratilmasligi.
7. PAID summasi mos kelmasligi va mavjud bo‘lsa qisman/qaytarilgan to‘lovni solishtirish.
8. Callback yetkazilmasligi, keyingi qayta yuborish va GET bilan mos natija.
9. Hisobot/ro‘yxat/Excel summalari va unique shaxs/chipta sonlarining mosligi.
10. Mavjud kontingent, moslik va chipta funksiyalari regressiyasi.

## 10. AI agent ishni topshirishda

Agentning yakuniy javobida quyidagilarni ko‘rsatish tavsiya etiladi:

- qaysi mavjud qismlar qayta ishlatilgani va qaysi tafovutlar tuzatilgani;
- backend va frontend bo‘yicha o‘zgargan fayllar/APIlar;
- yangi yoki o‘zgargan migration va eski ma’lumotlarning mosligi;
- kontrakt mappingi, ma’lumotnomalar va hisoblash qoidalari;
- tekshirilgan ssenariylar va natija;
- tashqi kontrakt/qaror sabab yakunlanmagan aniq ishlar.

Demo, sandbox, implementatsiya qilingan va real integratsiyada tekshirilgan natijalar aniq farqlansin. Mavjud ma’lumotlarni o‘chirish yoki ishlab turgan kontraktni kelishilmagan holda buzish ushbu topshiriqning tavsiyasi emas.

## 11. Manbalar va oldingi talablarni qamrab olish

- [Yakuniy umumiy tasklar](transport-yakuniy-umumiy-tasklar.md): T-01…T-06.
- [40 band bo‘yicha solishtirish va tahlil](transport-moliyaviy-bosqich-tasklar-va-tahlil.md): takroriy, chiqarilgan va qo‘shilgan talablar mappingi.
- [VMQ-440 kanonik spetsifikatsiyasi](../VMQ-440_transport_imtiyozlari_AT_spetsifikatsiyasi.md): normativ mazmun va biznes cheklovlari.
- Mahalliy `finance-api-contracts.ts`, `IntegrationExplorer.vue` va `ReimbursementPanel.vue`: jarayon/maket namunalari; real backend kontraktining o‘rnini bosmaydi.

Avvalgi hujjatlardagi “to‘lovgacha” yoki “texnik ACK/NACKda tugaydi” qamrovi dastlabki MVP bosqichiga tegishli. Ushbu topshiriq yangi moliyaviy rivojlantirish bosqichini tavsiflaydi. Bajarilgan menyu, rang, son/sana formati va ustunlarni qayta yaratish o‘rniga ular qabul/regressiya mezonlariga kiritiladi.
