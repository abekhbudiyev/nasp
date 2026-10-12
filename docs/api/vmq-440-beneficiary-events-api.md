# VMQ-440 — Kontingent eventlari API

## Endpoint

```http
POST /v1/beneficiary-events
```

Barcha manba tashkilotlar kontingentdagi huquq o‘zgarishlarini shu yagona API orqali yuboradi.

## Request

```json
{
  "source_event_id": "EVT-2026-000001",
  "event_type": {
    "id": 1,
    "code": "RIGHT_GRANTED"
  },
  "occurred_at": "2026-10-01T10:00:00+05:00",
  "person": {
    "pinfl": "12345678901234"
  },
  "category": {
    "id": 9,
    "code": "C09"
  },
  "equivalence_basis": {
    "id": 10,
    "code": "PART_EQ_10"
  },
  "effective_from": "2026-10-01",
  "effective_to": null,
  "source_record": {
    "record_id": "RIGHT-8471",
    "record_version": 2
  }
}
```

## Request maydonlari

| Maydon | Majburiy | Ma’nosi |
|---|:---:|---|
| `source_event_id` | Ha | Manba tashkilot yaratadigan event ID |
| `event_type` | Ha | Huquq bilan sodir bo‘lgan o‘zgarish |
| `occurred_at` | Ha | O‘zgarish sodir bo‘lgan vaqt |
| `person.pinfl` | Ha | Shaxsning 14 xonali JShShIRi |
| `category` | Ha | Shaxsning texnik imtiyoz toifasi |
| `equivalence_basis` | Shartli | Faqat `C02`, `C04`, `C09` uchun |
| `effective_from` | Ha | Huquq amal qilishining boshlanish sanasi |
| `effective_to` | Yo‘q | Huquq tugash sanasi; ochiq bo‘lsa `null` |
| `source_record.record_id` | Ha | Manba bazasidagi huquq yozuvi ID |
| `source_record.record_version` | Ha | Shu yozuvning versiyasi |

## Response

```json
{
  "event_id": "01JYAMIH000000000000000001",
  "operation_id": "01JOP00000000000000000001",
  "source_event_id": "EVT-2026-000001",
  "accepted": true,
  "duplicate": false,
  "validation_issues": []
}
```

| Maydon | Ma’nosi |
|---|---|
| `event_id` | YAMIH yaratgan kanonik event ID |
| `operation_id` | Eventni qayta ishlash operatsiyasi ID |
| `source_event_id` | Manba yuborgan event ID |
| `accepted` | Event qabul qilingan yoki qilinmagan |
| `duplicate` | Event oldin qabul qilinganligini bildiradi |
| `validation_issues` | Aniqlangan xatolar |

## Event turlari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `RIGHT_GRANTED` | Huquq berildi |
| 2 | `RIGHT_CORRECTED` | Huquq ma’lumoti tuzatildi |
| 3 | `RIGHT_REVOKED` | Huquq bekor qilindi |
| 4 | `RIGHT_REINSTATED` | Huquq qayta tiklandi |

Requestda huquq statusi yuborilmaydi:

```text
RIGHT_GRANTED    → ACTIVE
RIGHT_CORRECTED  → avvalgi holat saqlanadi
RIGHT_REVOKED    → REVOKED
RIGHT_REINSTATED → ACTIVE
```

## Toifalar

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `C01` | Urush nogironi — I/II guruh |
| 2 | `C02` | Urush nogironiga tenglashtirilgan — I/II guruh |
| 3 | `C03` | Urush nogironi — III guruh |
| 4 | `C04` | Urush nogironiga tenglashtirilgan — III guruh |
| 5 | `C05` | 1941–1945-yillardagi urush qatnashchisi |
| 6 | `C06` | Sovet Ittifoqi Qahramoni yoki “Slava” ordeni sohibi |
| 7 | `C07` | Chernobil AES nurlanish kasalligiga chalingan shaxs |
| 8 | `C08` | I guruh benefitsiariga hamroh |
| 9 | `C09` | Urush qatnashchisiga tenglashtirilgan shaxs |
| 10 | `C10` | Halok bo‘lgan harbiyning ota-onasi yoki turmush o‘rtog‘i |
| 11 | `C11` | Vatan himoyasi yo‘lida halok bo‘lgan harbiy/xodimning ota-onasi |

`C01–C11` qarorda shu kodlar bilan berilmagan. Ular tizimning texnik klassifikatorlari.

## Nogironlik bo‘yicha tenglashtirish asoslari

Qarorning 2-ilovasiga mos texnik kodlar:

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `DIS_EQ_01` | Harbiy majburiyat, front yoki partizan otryadidagi jarohat |
| 2 | `DIS_EQ_02` | IIV yoki DXX xizmat vazifasidagi jarohat |
| 3 | `DIS_EQ_03` | 1944–1951-yillardagi qiruvchi batalyon yoki otryad xizmati |
| 4 | `DIS_EQ_04` | Prezident hujjati bilan tenglashtirilgan shaxs |

## Qatnashchi bo‘yicha tenglashtirish asoslari

Qarorning 3-ilovasiga mos texnik kodlar:

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `PART_EQ_01` | Armiya yoki partizan operatsiyalari qatnashchisi |
| 2 | `PART_EQ_02` | 1941–1945 armiya, flot, IIV yoki DXX xizmati |
| 3 | `PART_EQ_03` | Halok bo‘lgan harbiyning ota-onasi yoki beva turmush o‘rtog‘i |
| 4 | `PART_EQ_04` | Leningrad korxona va muassasa xodimi |
| 5 | `PART_EQ_05` | Afg‘oniston yoki boshqa davlatlardagi jangovar harakat qatnashchisi |
| 6 | `PART_EQ_06` | Voyaga yetmagan sobiq mahbus |
| 7 | `PART_EQ_07` | Antifashistik qarshilik harakati qatnashchisi |
| 8 | `PART_EQ_08` | Front manfaatidagi maxsus tuzilma xodimi |
| 9 | `PART_EQ_09` | Prezident hujjati bilan tenglashtirilgan shaxs |
| 10 | `PART_EQ_10` | Xorijdagi vakolatxona xavfsizligida jarohatlangan shaxs |

## Toifa va tenglashtirish qoidasi

| Category | `equivalence_basis` |
|---|---|
| `C02`, `C04` | `DIS_EQ_01…04` majburiy |
| `C09` | `PART_EQ_01…10` majburiy |
| Boshqa toifalar | Maydon yuborilmaydi |
| `C08` | Ushbu API orqali yuborilmaydi |

## Identifikatorlar

| Identifikator | Ma’nosi |
|---|---|
| `source_event_id` | Qaysi o‘zgarish eventi yuborilgan |
| `source_record.record_id` | Qaysi source yozuvi o‘zgargan |
| `source_record.record_version` | Yozuvning nechanchi versiyasi |
| `event_id` | YAMIHdagi kanonik event |
| `operation_id` | Qayta ishlash operatsiyasi |

Bir xil `record_id` bo‘yicha turli eventlar bo‘lishi mumkin:

```text
EVT-001 → RIGHT-8471 → version 1 → RIGHT_GRANTED
EVT-002 → RIGHT-8471 → version 2 → RIGHT_CORRECTED
EVT-003 → RIGHT-8471 → version 3 → RIGHT_REVOKED
```

## Asosiy qoidalar

- `person` faqat `pinfl`dan iborat;
- `status` requestda yuborilmaydi;
- barcha klassifikatorlar `{id, code}` ko‘rinishida;
- `id` va `code` bir ma’lumotnoma yozuviga tegishli bo‘lishi kerak;
- `source_event_id` manba tashkilot doirasida takrorlanmaydi;
- eski `record_version` yangi holatni almashtirmaydi;
- `C08` mustaqil kontingent emas.

