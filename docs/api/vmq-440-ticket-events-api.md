# VMQ-440 — Yagona chipta eventlari API

## Endpoint

```http
POST /v1/ticket-events
```

Barcha tashuvchilar chipta chiqarish, qaytarish, bekor qilish va safar natijalarini shu bitta API orqali yuboradi.

## `ISSUED` request

```json
{
  "source_event_id": "TKT-EVT-2026-000001",
  "event_type": { "id": 1, "code": "ISSUED" },
  "occurred_at": "2026-10-20T07:30:00+05:00",
  "ticket": {
    "carrier_ticket_id": "ETKT-123456",
    "pnr": "PNR-778899",
    "entity_version": 1
  },
  "reservation_id": "01JRES00000000000000000001",
  "issue": {
    "segments": [{
      "segment_no": 1,
      "transport_mode": { "id": 1, "code": "RAIL" },
      "origin_node": { "id": 1, "code": "TAS_RAIL" },
      "destination_node": { "id": 2, "code": "SKD_RAIL" },
      "departure_at": "2026-10-20T08:00:00+05:00",
      "service_ref": "TRAIN-001",
      "fare_class": { "id": 2, "code": "PLATSKART" }
    }],
    "fare_breakdown": {
      "currency": { "id": 1, "code": "UZS" },
      "components": [{
        "component": { "id": 1, "code": "BASE_TRANSPORT_FARE" },
        "amount_minor": 15000000
      }],
      "total_amount_minor": 15000000,
      "passenger_paid_minor": 0
    }
  },
  "evidence": [{
    "type": { "id": 1, "code": "TICKET_COPY" },
    "storage_ref": "protected://ticket-copy/abc",
    "sha256": "example-ticket-hash"
  }]
}
```

PINFL qayta yuborilmaydi; shaxs `reservation_id` orqali aniqlanadi.

## `RETURNED` request

```json
{
  "source_event_id": "TKT-EVT-2026-000002",
  "event_type": { "id": 2, "code": "RETURNED" },
  "occurred_at": "2026-10-22T14:10:00+05:00",
  "ticket": {
    "ticket_id": "01JTICKET0000000000000001",
    "carrier_ticket_id": "ETKT-123456",
    "entity_version": 2
  },
  "reason": { "id": 2, "code": "TECHNICAL_NONUSE" },
  "refund": {
    "currency": { "id": 1, "code": "UZS" },
    "refunded_amount_minor": 15000000
  },
  "evidence": [{
    "type": { "id": 4, "code": "RETURN_EVIDENCE" },
    "storage_ref": "protected://return-evidence/xyz",
    "sha256": "example-return-hash"
  }]
}
```

## Request maydonlari

| Maydon | Majburiy | Ma’nosi |
|---|:---:|---|
| `source_event_id` | Ha | Tashuvchi yaratadigan event ID |
| `event_type` | Ha | Event turi |
| `occurred_at` | Ha | Event sodir bo‘lgan vaqt |
| `ticket.carrier_ticket_id` | Ha | Tashuvchidagi chipta ID |
| `ticket.ticket_id` | Shartli | Tizimdagi chipta ID; `ISSUED`dan keyingi eventlarda |
| `ticket.entity_version` | Ha | Chipta versiyasi |
| `reservation_id` | `ISSUED`da | Check API bergan rezerv ID |
| `issue` | `ISSUED`da | Segment va tarif tarkibi |
| `reason` | Shartli | Qaytarish yoki bekor qilish sababi |
| `refund` | `RETURNED`da | Qaytarilgan summa |
| `evidence[]` | Shartli | Tasdiqlovchi hujjatlar havolasi |

## Event bo‘yicha majburiy bloklar

| Event | Majburiy bloklar |
|---|---|
| `ISSUED` | `reservation_id`, `issue.segments`, `issue.fare_breakdown` |
| `RETURNED` | `ticket.ticket_id`, `reason`, `refund` |
| `CARRIER_CANCELLED` | `ticket.ticket_id`, `reason` |
| `VOIDED` | `ticket.ticket_id`, `reason` |
| `RESCHEDULED` | `ticket.ticket_id`, yangi segmentlar |
| `TRAVELLED` | `ticket.ticket_id`, foydalanilgan segmentlar |
| `NO_SHOW` | `ticket.ticket_id`, `reason` |

## `ISSUED` response

```json
{
  "event_id": "01JEVENT000000000000000001",
  "source_event_id": "TKT-EVT-2026-000001",
  "ticket_id": "01JTICKET0000000000000001",
  "ticket_state": { "id": 2, "code": "ISSUED" },
  "reservation_state": { "id": 2, "code": "CONSUMED" },
  "ledger_state": { "id": 3, "code": "CONSUMED" }
}
```

## `RETURNED` response

```json
{
  "event_id": "01JEVENT000000000000000002",
  "source_event_id": "TKT-EVT-2026-000002",
  "ticket_id": "01JTICKET0000000000000001",
  "ticket_state": { "id": 4, "code": "RETURN_PENDING" },
  "ledger_state": { "id": 4, "code": "RESTORE_REVIEW" },
  "return_review": {
    "review_id": "01JREVIEW00000000000000001",
    "status": { "id": 1, "code": "PENDING" }
  }
}
```

## Ma’lumotnomalar

### Chipta eventlari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `ISSUED` | Chipta chiqarildi |
| 2 | `RETURNED` | Chipta qaytarildi |
| 3 | `CARRIER_CANCELLED` | Tashuvchi qatnovni bekor qildi |
| 4 | `VOIDED` | Chipta void qilindi |
| 5 | `RESCHEDULED` | Safar ko‘chirildi |
| 6 | `TRAVELLED` | Safardan foydalanildi |
| 7 | `NO_SHOW` | Yo‘lovchi safarga chiqmagan |

### Chipta holatlari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `DRAFT` | Qoralama |
| 2 | `ISSUED` | Chiqarilgan |
| 3 | `TRAVELLED` | Foydalanilgan |
| 4 | `RETURN_PENDING` | Qaytarish ko‘rib chiqilmoqda |
| 5 | `RETURNED` | Qaytarilgan |
| 6 | `RETURN_DEADLINE_EXPIRED` | Qaytarish muddati o‘tgan |
| 7 | `CARRIER_CANCELLED` | Tashuvchi bekor qilgan |
| 8 | `NO_SHOW` | Foydalanilmagan |
| 9 | `EXCHANGED` | Almashtirilgan |
| 10 | `VOID` | Void qilingan |
| 11 | `ERROR` | Xatoli holat |
| 12 | `RECONCILIATION` | Solishtirish talab etiladi |

### Event sabablari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `PASSENGER_REQUEST` | Yo‘lovchi talabi |
| 2 | `TECHNICAL_NONUSE` | Texnik sababli foydalanilmagan |
| 3 | `NATURAL_NONUSE` | Tabiiy sababli foydalanilmagan |
| 4 | `OTHER_VERIFIED_NONUSE` | Boshqa tasdiqlangan sabab |
| 5 | `CARRIER_CANCELLED` | Tashuvchi bekor qilgan |
| 6 | `TECHNICAL_VOID` | Texnik void |
| 7 | `DUPLICATE_ISSUE_VOID` | Takror chiqarilgan chipta void qilindi |
| 8 | `SCHEDULE_CHANGE` | Jadval o‘zgardi |
| 9 | `NO_SHOW_CONFIRMED` | No-show tasdiqlandi |

### Hujjat turlari

| ID | Code | Ma’nosi |
|---:|---|---|
| 1 | `TICKET_COPY` | Chipta nusxasi |
| 2 | `ROUTE_SHEET` | Qatnov varaqasi |
| 3 | `TARIFF_EVIDENCE` | Tarif hujjati |
| 4 | `RETURN_EVIDENCE` | Qaytarish hujjati |

### Transport va tarif qiymatlari

| Katalog | ID | Code | Ma’nosi |
|---|---:|---|---|
| Transport | 1 | `RAIL` | Temir yo‘l |
| Transport | 2 | `AIR` | Havo transporti |
| Transport | 3 | `BUS` | Shaharlararo avtobus |
| Klass | 1 | `ECONOMY` | Ekonom |
| Klass | 2 | `PLATSKART` | Platskart |
| Klass | 3 | `COUPE` | Kupe |
| Klass | 4 | `STANDARD` | Standart |
| Klass | 5 | `BUSINESS` | Biznes |
| Valyuta | 1 | `UZS` | O‘zbekiston so‘mi |
| Tarif | 1 | `BASE_TRANSPORT_FARE` | Bazaviy tarif |
| Tarif | 2 | `TAX_COMPONENTS` | Soliq komponentlari |
| Tarif | 3 | `SERVICE_FEES` | Xizmat va yig‘imlar |
| Tarif | 4 | `UPGRADE_SURCHARGE` | Klass qo‘shimcha haqi |

Transport tugunlari check API hujjatidagi `transport_nodes` katalogidan olinadi.

### Limit va qaytarish holatlari

| Katalog | ID | Code | Ma’nosi |
|---|---:|---|---|
| Limit | 1 | `AVAILABLE` | Foydalanish mumkin |
| Limit | 2 | `HELD` | Vaqtincha band |
| Limit | 3 | `CONSUMED` | Ishlatilgan |
| Limit | 4 | `RESTORE_REVIEW` | Tiklash ko‘rib chiqilmoqda |
| Limit | 5 | `RESTORED` | Tiklangan |
| Ko‘rib chiqish | 1 | `PENDING` | Jarayonda |
| Ko‘rib chiqish | 2 | `APPROVED` | Tasdiqlandi |
| Ko‘rib chiqish | 3 | `REJECTED` | Rad etildi |
| Ko‘rib chiqish | 4 | `METHODOLOGY_PENDING` | Metodika kutilmoqda |

## Zarur biznes qoidalari

- `ISSUED` faqat faol `reservation_id` bilan qabul qilinadi.
- Chipta, rezerv va limit holatlarini server belgilaydi.
- `RETURNED` limitni avtomatik tiklamaydi; `RESTORE_REVIEW` yaratiladi.
- `PASSENGER_REQUEST` bo‘yicha limit avtomatik tiklanmaydi.
- Har bir `id` va `code` juftligi o‘zaro mos bo‘lishi shart.
