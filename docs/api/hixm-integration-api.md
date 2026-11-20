# HIXM integratsiya API yo‘riqnomasi

**Versiya 0.1 · integratsiya jamoalari bilan kelishish uchun loyiha**

Ushbu yo‘riqnoma Hududiy ijtimoiy xizmatlar markazlari (HIXM) moduliga ma’lumot uzatadigan tizimlar uchun umumiy API shartnomasini belgilaydi. Yo‘llar, kodlar va namunalar taklif etilayotgan formatda berilgan. Amaldagi servislar adapter orqali shu formatga o‘tkazilishi mumkin.

## 1. Kim qaysi yozuvni beradi

| Manba | HIXM uchun uzatiladigan yozuvlar |
|---|---|
| CHH · Erta aralashuv | Xizmatga tayinlov, vaucher, individual reja, ochiq va yopilgan tashriflar, dastur hisob-kitobi |
| CDC · Bolalar kunduzgi parvarishi | Qabul va chiqarish, asos hujjatiga havola, davomat, subsidiya va kompensatsiya buyurtmanomasi |
| Oila hamkori · Faol hayotga qadam | Dastur ichidagi xizmat turi, tayinlov, vaucher, elektron davomat yoki dalolatnoma, hisob-kitob |
| RBT · Kompleks reabilitatsiya | Bolalar va kattalar uchun alohida xizmat kodlari, kurs, reja va tashriflar |
| ELD · Kattalar uchun kunduzgi qatnov | Qabul, xizmat davri, guruh yoki smena va davomat |
| YAMIH/CRM · Qabul va xizmat jarayonlari | Ariza, yo‘llanma, navbat va bron tarixi, xizmat ko‘rsatuvchining rasmiy ma’lumoti, vakolat doirasidagi shaxs kartasi. Psixososial va boshqa xizmatlar jarayon egasi tasdiqlangach ulanadi |
| Moliya tizimi, kassa integratsiyasi | Tegishli moliyaviy hujjat asosida tasdiqlangan to‘lov va o‘tkazma. Kassa ulansa, pullik xizmat cheki va uning bekor qilinishi |
| HIXM boshqaruvi | Markaz, xona, katalogdagi xizmat kodi, xona–xizmat–ko‘rsatuvchi biriktirmasi, ish jadvali va quvvat pasporti. Nashr qilingan versiyalar HIXMda yuritiladi |

Har bir integratsiya bo‘yicha manba egasi `entity_type + program_code + service_code` kesimida kelishiladi. Bitta operatsion holat ikki tizimda bo‘lsa, tasdiqlangan manba va ularni bog‘lovchi hujjat IDsi shartnomaga kiritiladi. Tashqi servislar uchun ro‘yxat faqat HIXMga ajratilgan xizmat joylari va yozuvlar bilan cheklanadi.

## 2. API va autentifikatsiya

Manba tizimi yoki uning adapteri quyidagi `GET` endpointlarni taqdim etadi. HIXM serveri ularni HTTPS orqali chaqiradi. Tavsiya etiladigan autentifikatsiya — servis hisobiga berilgan OAuth 2.0 `client_credentials` tokeni. Har bir token faqat kelishilgan ma’lumot turi va xizmat joylarini o‘qish huquqiga ega bo‘ladi.

| Endpoint | Parametrlar | Vazifa |
|---|---|---|
| `GET /api/v1/hixm/snapshot` | Birinchi so‘rovda `date_from` va `limit`. Keyingi sahifalarda faqat `cursor` | Dastlabki yuklash va kursor eskirganda qayta tiklash. `date_from` — `YYYY-MM-DD` formatidagi hisobot davri boshi |
| `GET /api/v1/hixm/changes` | `cursor` majburiy. `limit` ixtiyoriy | Yangi, o‘zgargan va bekor qilingan yozuvlarni ketma-ket olish |
| `GET /api/v1/hixm/persons/{person_id}` | YAMIHning yagona `person_id` qiymati | Vakolatli shaxs kartasini so‘rov vaqtida to‘ldirish. Bu endpointni YAMIH shaxs servisi yoki uning adapteri taqdim etadi |

`limit` — butun son, standart qiymati `200`, maksimum `500`. `cursor` — manba tomonidan beriladigan o‘zgartirilmas satr. So‘rovda `Authorization: Bearer <access_token>` va `Accept: application/json` yuboriladi. Javoblar UTF-8 JSON formatida.

```http
GET /api/v1/hixm/snapshot?date_from=2026-10-01&limit=200
Authorization: Bearer <access_token>
Accept: application/json
```

### Ro‘yxat javobi

```json
{
  "items": [
    {
      "source_system": "CHH",
      "entity_type": "VISIT",
      "record_id": "VISIT-101",
      "version": 2,
      "operation": "UPSERT",
      "updated_at": "2026-11-20T12:35:00+05:00",
      "data": {
        "program_code": "EARLY_INTERVENTION",
        "service_code": "EARLY_INTERVENTION",
        "external_site_id": "SITE-17",
        "provider_id": "PROVIDER-55",
        "person_id": "PERSON-12",
        "assignment_ref": {"source_system": "CHH", "record_id": "ASSIGN-24"},
        "voucher_ref": {"source_system": "CHH", "record_id": "VOUCHER-7"},
        "funding_type": "VOUCHER",
        "service_date": "2026-11-20",
        "check_in_at": "2026-11-20T11:30:00+05:00",
        "check_out_at": "2026-11-20T12:30:00+05:00",
        "status": "CONFIRMED",
        "verification_method": "BIOMETRIC",
        "verification_ref": "VERIFY-101"
      }
    }
  ],
  "has_more": false,
  "next_cursor": null,
  "changes_cursor": "opaque-chh-checkpoint"
}
```

- `snapshot` tasdiqlangan xizmat joylari bo‘yicha izchil kesim beradi. `date_from`dan keyingi faoliyat bilan birga shu davrda amalda bo‘lgan tayinlov, vaucher, navbat va bog‘lash uchun zarur ma’lumotlar olinadi. Birinchi so‘rovda olingan kesim chegarasi barcha sahifalar uchun saqlanadi.
- `snapshot`da `has_more=true` bo‘lsa, keyingi sahifa `next_cursor` orqali olinadi. Oxirgi sahifada `changes_cursor` qaytadi. HIXM undan `changes` uchun birinchi kursor sifatida foydalanadi. Kesimdan keyingi yozuvlar shu kursordan davom etadi.
- `changes` so‘rovi `GET /api/v1/hixm/changes?cursor=<changes_cursor>&limit=200` shaklida yuboriladi. Javobda `items`, `has_more` va navbatdagi `next_cursor` bo‘ladi. `next_cursor` yozuv kelmaganida ham qaytariladi va keyingi so‘rov uchun yaroqli bo‘ladi. `changes_cursor` faqat `snapshot` yakunida qaytadi.
- `changes` yozuvning har bir saqlangan versiyasini barqaror tartibda qaytaradi. Masalan, bron yaratilishi va bekor qilinishi ikkita versiya sifatida keladi. `snapshot`ning o‘zi avvalgi barcha versiyalar tarixini bermaydi. Dastlabki yuklashdan oldingi bandlik bo‘yicha tahlil kerak bo‘lsa, manba jamoasi avvalgi qaror va bron versiyalarining alohida eksportini beradi. Tarix mavjud bo‘lmasa, signal kuzatuvi kelishilgan boshlanish sanasidan ishlaydi.

## 3. Ma’lumot tarkibi

### Yozuvning umumiy maydonlari

| Maydon | Turi | Qoida |
|---|---|---|
| `source_system`, `entity_type`, `record_id` | `string` | Uchligi manbadagi yozuvni yagona aniqlaydi. Manba kodi servisga berilgan ruxsat bilan mos bo‘lishi shart |
| `version` | `integer` | `1`dan boshlanadi va shu yozuv har o‘zgarganda ortadi |
| `operation` | `string` | `UPSERT` — yozuvning to‘liq joriy holati. `VOID` — texnik bekor qilish, `data`da `void_reason_code` beriladi |
| `updated_at` | `date-time` | ISO 8601, vaqt mintaqasi bilan. Sahifalash manba kursori bo‘yicha amalga oshiriladi |
| `data` | `object` | Yozuv turiga mos maydonlar. O‘zgargan maydonlargina yuboriladigan qisman javob ishlatilmaydi |

`APPLICATION`, `QUEUE`, `RESERVATION`, `ASSIGNMENT`, `VOUCHER`, `PLAN` va `VISIT` uchun umumiy majburiy maydonlar — `program_code`, `service_code`, `person_id`. `RESERVATION`, `ASSIGNMENT` va `VISIT` uchun `external_site_id` hamda `provider_id` majburiy. Ariza, navbat yoki vaucherda joy va ko‘rsatuvchi hali tanlanmagan bo‘lsa, ularning qiymati `null` bo‘lishi mumkin. Bo‘sh satr o‘rnida `null` ishlatiladi. `*_ref` bog‘lanishi `source_system` va `record_id`dan iborat, bog‘lanadigan yozuv turi maydon nomi bilan aniqlanadi.

### Yozuv turiga xos maydonlar

Jadvalda ko‘rsatilgan maydonlar majburiy. Shartli maydonlar tegishli holat yuz berganda qiymat oladi.

| `entity_type` | Maydonlar | Shartli maydonlar |
|---|---|---|
| `PROVIDER` | `provider_id`, `tin`, `name`, `status` | `program_code`, `contract_ref`, `valid_from`, `valid_to` — dasturga a’zo bo‘lsa va manbada yuritilsa |
| `APPLICATION` | `submitted_at`, `channel_code`, `status` | `decision_at`, `decision_reason_code` — qaror chiqqanda. `capacity_snapshot` — joy yetishmasligi sababli navbatga qo‘yilgan yoki joy ajratilmagan holatda |
| `QUEUE` | `application_ref`, `queued_at`, `status` | `position` — manba yuritsa. `offered_at` — joy taklif qilinganda. `closed_at`, `close_reason_code` — navbat yozuvi yopilganda |
| `RESERVATION` | `funding_type`, `starts_at`, `ends_at`, `created_at`, `status` | `expires_at` — vaqtinchalik bron uchun. `cancelled_at`, `cancel_reason_code` — bekor qilinganda. `application_ref` va `voucher_ref` — bog‘liq yozuvlar mavjud bo‘lganda |
| `ASSIGNMENT` | `funding_type`, `start_on`, `status` | `application_ref` — ariza orqali boshlansa. `voucher_ref` — vaucherli tayinlovda. `end_on`, `close_reason_code` — yakunlanganda |
| `VOUCHER` | `valid_from`, `valid_to`, `status` | `application_ref` — arizaga bog‘langanida. `nominal_amount_uzs` — qiymat manbada aniqlanganida. `approved_units` — birlik limiti qo‘llanganda |
| `PLAN` | `assignment_ref`, `start_on`, `status` | `end_on`, `planned_sessions`, `completed_sessions` — manba yuritsa |
| `VISIT` | `assignment_ref`, `funding_type`, `service_date`, `check_in_at`, `status` | `check_out_at` — chiqish qayd etilganda. `verification_method`, `verification_ref` — tashrif tasdiqlanganda. `voucher_ref` — vaucherli tashrifda |
| `FINANCE_LINE` | `program_code`, `service_code`, `external_site_id`, `provider_id`, `funding_type`, `period_from`, `period_to`, `document_id`, `document_line_id`, `calculated_amount_uzs`, `status` | `approved_amount_uzs`, `approved_at` — tasdiqlanganda. `visit_ref` yoki `voucher_ref` — satr aniq tashrif yoki vaucherga bog‘langanida |
| `PAYMENT` | `payment_document_id`, `finance_line_ref`, `amount_uzs`, `status` | `paid_at` — o‘tkazma bajarilganda. `reversal_of_ref` — qaytarma operatsiyasi uchun |
| `RECEIPT` | `receipt_id`, `program_code`, `service_code`, `external_site_id`, `provider_id`, `amount_uzs`, `issued_at`, `status` | `reservation_ref` yoki `visit_ref` — chekni xizmat holatiga bog‘lash manbada mavjud bo‘lsa. `reversal_of_ref` — qaytarma cheki uchun |

Sana maydonlari `YYYY-MM-DD`, vaqt maydonlari ISO 8601 formatida yuboriladi. `service_date` Toshkent vaqti bo‘yicha xizmat sanasi. Barcha `*_amount_uzs` va `amount_uzs` maydonlari so‘mda, `"125000.50"` ko‘rinishidagi ikki kasr xonali o‘nlik satr bilan yuboriladi. Bir moliyaviy satrga bir nechta to‘lov bog‘lanishi mumkin. Qaytarma summasi musbat yuboriladi va `reversal_of_ref` asosida sof to‘lovdan ayriladi.

### Kodlar va tasdiqlash

- `funding_type` uchun boshlang‘ich kodlar — `VOUCHER`, `PAID`, `BUDGET`, `OTHER`. `OTHER` ishlatilganda `funding_basis_code` majburiy. CDC bo‘yicha subsidiya va kompensatsiyani moliyaviy satrda `finance_category_code` ajratadi. `PAID` foydalanuvchi moliyalashtiradigan xizmatni bildiradi.
- Boshlang‘ich statuslar — `APPLICATION`: `SUBMITTED`, `APPROVED`, `QUEUED`, `REJECTED`, `CANCELLED`. `QUEUE`: `WAITING`, `OFFERED`, `CLOSED`. `RESERVATION`: `HELD`, `CONFIRMED`, `EXPIRED`, `CANCELLED`, `FULFILLED`. `VISIT`: `OPEN`, `CONFIRMED`, `CLOSED_UNVERIFIED`, `CANCELLED`. `FINANCE_LINE`: `CALCULATED`, `APPROVED`, `REJECTED`, `CANCELLED`. `PAYMENT`: `PENDING`, `PAID`, `FAILED`, `CANCELLED`. `PROVIDER`, `ASSIGNMENT`, `VOUCHER`, `PLAN` va `RECEIPT` uchun ruxsat etilgan qiymatlar hamda o‘tishlar servis kesimida tasdiqlanadi. Har bir manba o‘z statusining kodini `source_status_code`da ham bera oladi.
- `verification_method` xizmat qoidasi bo‘yicha `BIOMETRIC`, `ELECTRONIC_ACT` yoki kelishilgan boshqa kodni oladi. `verification_ref` tasdiq operatsiyasi yoki hujjat IDsi. Biometrik tasvir va shablonlar payloadga kirmaydi. [Faol hayotga qadam bo‘yicha 376-son VMQ](https://lex.uz/uz/docs/-7581160)

### Joy yetishmagani qayd etilgandagi `capacity_snapshot`

`decision_at` bilan birga yuboriladi. `starts_at` va `ends_at` qaror vaqtida so‘ralgan xizmat oralig‘ini bildiradi. `allocated_places` va `taken_places` shu oraliq uchun manbada o‘sha paytda qayd etilgan qiymatlar. `funding_limits` faqat tasdiqlangan taqsimot tatbiq etilganda yuboriladi. Quvvat versiyasi mavjud bo‘lmasa, `capacity_version_id` `null` va `availability_status` `UNKNOWN` bo‘ladi.

```json
{
  "external_site_id": "SITE-17",
  "starts_at": "2026-11-21T09:00:00+05:00",
  "ends_at": "2026-11-21T12:00:00+05:00",
  "capacity_version_id": "CAP-17-V4",
  "availability_status": "FULL",
  "allocated_places": 12,
  "taken_places": 12,
  "funding_limits": [{"funding_type": "VOUCHER", "allocated_places": 6, "taken_places": 6}]
}
```

Bandlik haqidagi signal uchun HIXM qaror vaqti, bron versiyalari, joy bo‘shagan vaqt va keyingi pullik bron vaqtini solishtiradi. `UNKNOWN` yoki yetarli tarix bo‘lmaganda signalga ma’lumot yetishmasligi qayd etiladi.

### Shaxs kartasi javobi

```json
{
  "person_id": "PERSON-12",
  "full_name": "Namuna Shaxs",
  "birth_date": "2020-02-14",
  "region_code": "REGION-EXAMPLE",
  "district_code": "DISTRICT-EXAMPLE",
  "legal_representative": null
}
```

Vakil bo‘lsa, `legal_representative` ichida `person_id`, `full_name`, `relationship_code`, `valid_until` beriladi. Umumiy oqimda yagona YAMIH `person_id` ishlatiladi. Manbada faqat JSHSHIR mavjud bo‘lsa, servis uni vakolatli shaxslarni moslashtirish servisi orqali `person_id`ga bog‘laydi. JSHSHIR URLga, odatiy jurnal yozuviga va ro‘yxat oqimiga kiritilmaydi.

## 4. Sinxronlash va xatolar

1. Dastlabki yuklashda HIXM barcha sahifalarni vaqtinchalik kesimga qabul qiladi. Yakunda kesimni va `changes_cursor`ni birga faollashtiradi. Qayta tiklashda kelishilgan davr ichidagi kesim o‘sha davr uchun avvalgi nusxani almashtiradi. Avval yuklangan boshqa davrlar saqlanadi.
2. O‘zgarishlar sahifasi to‘liq saqlangandan keyin kursor oldinga siljiydi. Takroriy versiya qayta hisoblanmaydi. Eski versiya joriy holatni almashtirmaydi. Bir xil kalit va versiya turli tarkib bilan kelsa, tafovut tekshiruvga olinadi.
3. `CANCELLED` biznes holati sifatida tarixda saqlanadi. `VOID` texnik bekor qilingan yozuvni faol hisobotdan chiqaradi va audit tarixini saqlaydi. Keyingi versiya bekor qilishni tuzatsa, hisoblar qayta yangilanadi.
4. HIXM `source_system + external_site_id + service_code + provider_id`ni kuchga kirgan sanaga qarab xona–xizmat biriktirmasiga bog‘laydi. Moslik bo‘lmasa, yozuv qabul qilinadi va bog‘lash uchun administratorga ko‘rsatiladi. Bog‘lanmaguncha xona kesimidagi ko‘rsatkichga qo‘shilmaydi.
5. Manba yozuvining kaliti `source_system + entity_type + record_id`. Kunlik tashrif hisobining kaliti `person_id + HIXM xizmat kodi + service_date`. Alohida seanslar manba tafsilotida saqlanadi. Moliya hujjati va uning satri bo‘yicha hisob yuritiladi.
6. Taklif etiladigan davriylik — ariza, navbat, bron, vaucher va davomat uchun har 5 daqiqada, moliyaviy o‘zgarishlar uchun har 60 daqiqada va kunlik solishtirish. Manba jamoalari ruxsat etilgan yuklama, kursorning amal muddati va tarix chuqurligini tasdiqlaydi.

| HTTP | Xato kodi | HIXM harakati |
|---|---|---|
| `400` | `INVALID_REQUEST` | Parametr yoki kursor formatini tekshiradi |
| `401` | `UNAUTHENTICATED` | Tokenni yangilab, o‘sha so‘rovni qaytaradi |
| `403` | `FORBIDDEN` | Ruxsatni tekshirish uchun integratsiya egasiga chiqaradi |
| `404` | `PERSON_NOT_FOUND` | Shaxs kartasida manbadan ma’lumot kelmaganini ko‘rsatadi |
| `410` | `CURSOR_EXPIRED` | Kelishilgan kesim bo‘yicha `snapshot`dan qayta yuklaydi |
| `429` | `RATE_LIMITED` | `Retry-After` bo‘yicha, shu kursor bilan qaytaradi |
| `500`, `503` | `SOURCE_UNAVAILABLE` | Ortib boruvchi kutish bilan, shu kursor orqali qaytaradi |

```json
{
  "code": "CURSOR_EXPIRED",
  "message": "O‘zgarishlar kursorining amal muddati tugagan.",
  "request_id": "REQ-20261120-018"
}
```

## 5. Pilotni qabul qilish mezonlari

1. CHH, CDC, Oila hamkori va YAMIH ariza–navbat oqimlari uchun test manzili, ruxsatlar, xizmat va joy kodlari hamda sinov yozuvlari beriladi.
2. Birinchi yuklash vaqtida manbaga kiritilgan yozuv keyingi `changes` oqimida keladi. Bir sahifa ikki marta yuborilganda reyestrdagi son oshmaydi.
3. Tashrif ochiladi, yopiladi, tuzatiladi va bekor qilinadi. Har safar reyestr va monitoring ko‘rsatkichlari bir xil natijani beradi. Bir kunning alohida seanslari tafsilotda, kunlik tashrif esa hisobda bir marta ko‘rinadi.
4. Vaucherli murojaat bo‘yicha joy ajratilmagan holat, keyingi pullik bron, oraliqda joy bo‘shashi va ma’lumot yetishmasligi alohida tekshiriladi.
5. Bitta moliyaviy satr bo‘yicha ikki qismli to‘lov va qaytarma tekshiriladi. HIXMdagi to‘langan summa tegishli moliyaviy hujjatlar bilan mos keladi.
6. Xona mosligi tasdiqlanmagan yozuv ro‘yxatda tekshiruvga chiqadi. Vakolati cheklangan foydalanuvchi shaxs kartasi orqali ortiqcha ma’lumot ololmaydi.

### Pilot uchun birinchi kelishuvlar

- CHH–MFC uchun oldingi loyiha `GET /api/v1/chh/early-intervention/attendance?inn={inn}` yoki `?pinfl={pinfl}` orqali joriy ochiq davomatga mo‘ljallangan. HIXM uchun barcha tashrif holatlari, barqaror tashrif va xizmat joyi IDlari, tarix hamda tuzatish oqimi kerak. Mavjud endpointning joriy imkoniyatlarini CHH jamoasi tasdiqlaydi.
- Har bir manba egasi xizmat kodlari, status va sabab kodlarini, bog‘lash identifikatorlarini hamda test va ishchi manzillarni tasdiqlaydi. Markaz xona xaritasini va quvvat versiyalarini HIXM jamoasi tasdiqlaydi. Moliya va kassa tizimlari uchun haqiqiy endpointlar alohida kelishiladi.
