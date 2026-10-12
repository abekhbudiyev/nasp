# VMQ-440 — Moslikni tekshirish va rezerv qilish API

## Endpoint

```http
POST /v1/entitlements/check-and-reserve
```

Barcha tashuvchilar uchun yagona API. Moslik tasdiqlansa, limit shu so‘rovning o‘zida vaqtincha rezerv qilinadi.

## Request

```json
{
  "client_request_id": "CHK-2026-000001",
  "person": { "pinfl": "12345678901234" },
  "applicant_role": { "id": 1, "code": "BENEFICIARY" },
  "representative_authorization_ref": null,
  "principal_reservation_id": null,
  "journey": {
    "transport_mode": { "id": 1, "code": "RAIL" },
    "origin_node": { "id": 1, "code": "TAS_RAIL" },
    "destination_node": { "id": 2, "code": "SKD_RAIL" },
    "departure_at": "2026-10-20T08:00:00+05:00",
    "service_ref": "TRAIN-001",
    "fare_class": { "id": 2, "code": "PLATSKART" },
    "leg_type": { "id": 1, "code": "OUTBOUND" }
  },
  "fare_quote": {
    "currency": { "id": 1, "code": "UZS" },
    "components": [{
      "component": { "id": 1, "code": "BASE_TRANSPORT_FARE" },
      "amount_minor": 15000000
    }]
  },
  "manual_authorization_token": null
}
```

## Request maydonlari

| Maydon | Majburiy | Ma’nosi |
|---|:---:|---|
| `client_request_id` | Ha | Tashuvchining so‘rov identifikatori |
| `person.pinfl` | Ha | Shaxsning 14 xonali JShShIRi |
| `applicant_role` | Ha | Benefitsiar, vakil yoki hamroh |
| `representative_authorization_ref` | Shartli | Qonuniy vakil vakolati havolasi |
| `principal_reservation_id` | Shartli | Hamroh uchun asosiy benefitsiar rezervi |
| `journey.*` | Ha | Transport, yo‘nalish, vaqt, qatnov, klass va safar tomoni |
| `fare_quote.*` | Ha | Valyuta va tarif komponentlari |
| `manual_authorization_token` | Shartli | Manual holat uchun bir martalik token |

`amount_minor` eng kichik valyuta birligida: UZS exponenti `2`, ya’ni `15000000` = `150 000.00 UZS`.

## Mos response

```json
{
  "client_request_id": "CHK-2026-000001",
  "decision": { "id": 1, "code": "ELIGIBLE" },
  "reservation": {
    "reservation_id": "01JRES00000000000000000001",
    "state": { "id": 1, "code": "HELD" },
    "expires_at": "2026-10-20T07:15:00+05:00"
  },
  "benefit": {
    "currency": { "id": 1, "code": "UZS" },
    "eligible_amount_minor": 15000000,
    "passenger_payable_minor": 0
  },
  "entitlement": {
    "right_id": "01JRIGHT000000000000000001",
    "ledger_id": "01JLEDGER00000000000000001",
    "leg_type": { "id": 1, "code": "OUTBOUND" },
    "remaining_units_after_hold": 0
  },
  "reason_codes": [],
  "source_as_of": "2026-10-20T07:00:00+05:00",
  "decision_expires_at": "2026-10-20T07:15:00+05:00",
  "stale_data": false
}
```

## Mos emas response

```json
{
  "client_request_id": "CHK-2026-000002",
  "decision": { "id": 2, "code": "NOT_ELIGIBLE" },
  "reservation": null,
  "reason_codes": [{ "id": 3, "code": "RIGHT_NOT_ACTIVE" }]
}
```

## Ma’lumotnomalar

### Murojaatchi rollari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `BENEFICIARY` | Huquq egasi |
| 2 | `LEGAL_REPRESENTATIVE` | Qonuniy vakil |
| 3 | `COMPANION` | Hamroh |

### Transport turlari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `RAIL` | Temir yo‘l |
| 2 | `AIR` | Havo transporti |
| 3 | `BUS` | Shaharlararo avtobus |

### Safar tomoni

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `OUTBOUND` | Borish |
| 2 | `RETURN` | Qaytish |

### Chipta klasslari

| ID | Code | Transport |
|---:|---|---|
| 1 | `ECONOMY` | RAIL/AIR/BUS |
| 2 | `PLATSKART` | RAIL |
| 3 | `COUPE` | RAIL |
| 4 | `STANDARD` | BUS |
| 5 | `BUSINESS` | RAIL/AIR/BUS |

### Transport tugunlari — MVP namunasi

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `TAS_RAIL` | Toshkent temir yo‘l bekati |
| 2 | `SKD_RAIL` | Samarqand temir yo‘l bekati |
| 3 | `BUX_RAIL` | Buxoro temir yo‘l bekati |
| 4 | `TAS_AIR` | Toshkent aeroporti |
| 5 | `NCU_AIR` | Nukus aeroporti |
| 6 | `TAS_BUS` | Toshkent avtovokzali |
| 7 | `JZZ_BUS` | Jizzax avtovokzali |

### Valyuta va tarif komponentlari

| Katalog | ID | Code | Ma’nosi |
|---|---:|---|---|
| Valyuta | 1 | `UZS` | O‘zbekiston so‘mi, exponent 2 |
| Tarif | 1 | `BASE_TRANSPORT_FARE` | Bazaviy tarif |
| Tarif | 2 | `TAX_COMPONENTS` | Soliq komponentlari |
| Tarif | 3 | `SERVICE_FEES` | Xizmat va yig‘imlar |
| Tarif | 4 | `UPGRADE_SURCHARGE` | Klass qo‘shimcha haqi |

### Qaror natijalari va rezerv holatlari

| Katalog | ID | Code | Ma’nosi |
|---|---:|---|---|
| Natija | 1 | `ELIGIBLE` | Imtiyozga mos |
| Natija | 2 | `NOT_ELIGIBLE` | Imtiyozga mos emas |
| Natija | 3 | `MANUAL_DOCUMENT_REQUIRED` | Manual tekshiruv kerak |
| Rezerv | 1 | `HELD` | Vaqtincha band |
| Rezerv | 2 | `CONSUMED` | Chipta uchun ishlatilgan |
| Rezerv | 3 | `RESTORE_REVIEW` | Tiklash ko‘rib chiqilmoqda |
| Rezerv | 4 | `RELEASED` | Bo‘shatilgan |
| Rezerv | 5 | `RESTORED` | Tiklangan |

### Rad etish sabablari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `PERSON_NOT_FOUND` | Shaxs topilmadi |
| 2 | `RIGHT_NOT_FOUND_IN_YAMIH` | Huquq topilmadi |
| 3 | `RIGHT_NOT_ACTIVE` | Huquq faol emas |
| 4 | `POLICY_NOT_EFFECTIVE` | Qoida kuchga kirmagan |
| 5 | `DATA_STALE` | Ma’lumot eskirgan |
| 6 | `UPSTREAM_UNAVAILABLE` | Manba tizim mavjud emas |
| 7 | `DOCUMENT_EXPIRED` | Hujjat muddati tugagan |
| 8 | `RESIDENCY_NOT_ELIGIBLE` | Hududiy shart bajarilmagan |
| 9 | `TRANSPORT_NOT_ALLOWED` | Transport ruxsat etilmagan |
| 10 | `TERRITORY_NOT_ALLOWED` | Yo‘nalish ruxsat etilmagan |
| 11 | `FARE_CLASS_NOT_ALLOWED` | Klass ruxsat etilmagan |
| 12 | `ENTITLEMENT_EXHAUSTED` | Limit tugagan |
| 13 | `BIENNIAL_CONVERSION_NOT_AVAILABLE` | Ikki yillik konversiya yo‘q |
| 14 | `COMPANION_NOT_LINKED` | Hamroh bog‘lanmagan |
| 15 | `REPRESENTATIVE_AUTHORITY_INVALID` | Vakil vakolati yaroqsiz |
| 16 | `RESERVATION_CONFLICT` | Faol rezerv mavjud |

## Zarur biznes qoidalari

- Toifa, imtiyoz miqdori va qolgan limitni server kontingentdan aniqlaydi.
- Mos natija `HELD` rezervini yaratadi.
- Hamroh uchun `principal_reservation_id`, vakil uchun `representative_authorization_ref` kerak.
- Har bir `id` va `code` juftligi o‘zaro mos bo‘lishi shart.
