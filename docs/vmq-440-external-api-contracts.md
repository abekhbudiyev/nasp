# VMQ-440 transport imtiyozlari AT — tashqi APIlar va ma’lumotnomalar

## 1. Hujjat maqsadi va MVP chegarasi

Ushbu hujjat VMQ-440 transport imtiyozlari modulining tashqi axborot tizimlari bilan almashinuv kontraktini belgilaydi. Kontrakt quyidagi yo‘nalishlarni qamrab oladi:

1. olti manba idoradan kontingent va huquq ma’lumotlarini qabul qilish;
2. barcha tashuvchilarga moslik, atomar rezerv va chipta lifecycle xizmatlarini taqdim etish;
3. tashuvchilardan oylik reyestr va tasdiqlovchi hujjatlarni qabul qilish;
4. tasdiqlangan immutable claimni moliya ATiga yuborish va texnik `ACK/NACK` olish;
5. barcha ishtirokchilar uchun yagona, versiyalangan ma’lumotnomalar APIini taqdim etish.

MVP bank o‘tkazmasini bajarmaydi, `PAID/REVERSED` post-payment monitoringini yuritmaydi va 2027-yilgi Ijtimoiy karta real-time payment kanalini ishga tushirmaydi.

Kanonik manbalar:

- [VMQ-440 qarori](https://lex.uz/docs/8400823);
- `VMQ-440_transport_imtiyozlari_AT_spetsifikatsiyasi.md`;
- `docs/vmq-440-mvp-ai-agent-implementation-plan.md`.

> Muhim: normativ hujjatda kanonik yopiq “11 toifa” katalogi belgilanmagan. `C01–C11` faqat texnik profil sifatida ishlatiladi va D-01 qarori yopilmaguncha production policyga ulanmaydi.

## 2. Integratsiya tomonlari

| Tomon | Tizimdagi roli | Asosiy API oilasi |
|---|---|---|
| Pensiya jamg‘armasi | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Bojxona qo‘mitasi | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Mudofaa vazirligi | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Ichki ishlar vazirligi | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Favqulodda vaziyatlar vazirligi | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Davlat xavfsizlik xizmati | Kontingent manbasi | Beneficiary events, snapshot, data quality |
| Temir yo‘l, aviatsiya va shaharlararo avtobus tashuvchilari | Eligibility, rezerv, chipta va reyestr | Carrier APIlari |
| Agentlik yoki tasdiqlangan reviewer | Manual/reconciliation qarori | Protected decision APIlari |
| Transport vazirligi va vakolatli registrlar | Tashuvchi, transport va service-point kataloglari egasi | Reference-data import/governance |
| Iqtisodiyot va moliya vazirligining tasdiqlanadigan ATi | Claim handoffni qabul qiluvchi | Finance adapter kontrakti |

Kontingent, eligibility va chipta almashinuvi Idoralararo integratsiyalashuv platformasi orqali amalga oshiriladi. Settlement va moliya marshruti alohida integratsiya arxitekturasi bilan tasdiqlanadi.

## 3. Umumlashtirish prinsipi

API tashkilot, transport yoki toifa soniga qarab ko‘paytirilmaydi:

- barcha olti manba idora bir xil `POST /v1/beneficiary-events` endpointidan foydalanadi;
- barcha transportlar va tashuvchilar bir xil `POST /v1/entitlements/check-and-reserve` endpointidan foydalanadi;
- barcha keyingi chipta holatlari bitta `POST /v1/tickets/{ticket_id}/events` endpointida `event_type_code` orqali uzatiladi;
- barcha ma’lumotnomalar `catalog_code` bilan universal reference-data API orqali olinadi;
- carrier/source identiteti URL yoki alohida endpointdan emas, mTLS sertifikati va access-token claimidan aniqlanadi.

Quyidagilar ataylab alohida operatsiya bo‘lib qoladi:

- `eligibility/check` huquqni sarflamaydigan preview, `check-and-reserve` esa ledgerga atomar hold yozadi;
- `tickets/issue` rezervni commit qiladi, keyingi ticket eventlari esa mavjud ticket state’ini o‘zgartiradi;
- settlement yaratish, katta reyestr batchini yuklash va ERI bilan submit qilish turli tranzaksion bosqichlardir;
- payment handoff faqat tasdiqlangan immutable `claim_id` versiyasidan boshlanadi.

## 4. Barcha tashqi APIlar uchun umumiy kontrakt

### 4.1. Transport va xavfsizlik

Har bir tashqi client uchun:

- TLS 1.2+ va mTLS;
- OAuth2 Client Credentials access-token;
- tashkilot, client, scope va purpose claimlari;
- yozuvchi operatsiyalarda `Idempotency-Key`;
- barcha so‘rovlarda `X-Correlation-Id` va `X-Request-Timestamp`;
- zarur oqimlarda `X-Payload-Signature` yoki ERI reference;
- JSON UTF-8 va OpenAPI 3.1 kontrakti;
- client/certificate/IP rate-limit va replay protection.

`organization_id`, `source_system_id` va `carrier_id` bodydagi qiymatdan ishonib olinmaydi. Ular sertifikat/token claimidan olinadi; bodyda takrorlansa claim bilan tengligi tekshiriladi.

### 4.2. Ma’lumot formatlari

- sana-vaqt — ISO-8601 va UTC offset bilan;
- DB timestamp — UTC, biznes kalendari — `Asia/Tashkent`;
- pul — `amount_minor` integer va `currency_code`;
- shaxs identifikatori — faqat POST bodyda, URL/query/log/trace/metricda emas;
- fayl — raw base64 emas, himoyalangan object-storage reference, SHA-256 va metadata;
- barcha klassifikatorlar — hardcode matn emas, `*_code` va reference revision.

### 4.3. Standart xato

```json
{
  "error": {
    "code": "RESERVATION_EXPIRED",
    "message": "Rezervning amal muddati tugagan",
    "correlation_id": "01J...",
    "retryable": false,
    "details": []
  }
}
```

`NOT_ELIGIBLE` biznes natija bo‘lib, HTTP transport xatosi emas. HTTP `4xx/5xx` authentication, kontrakt, conflict yoki texnik nosozlikni bildiradi.

| Holat | HTTP | Client harakati |
|---|---:|---|
| Sinxron muvaffaqiyat | `200/201` | Kanonik natijani saqlash |
| Asinxron qabul | `202` | `operation_id` bo‘yicha holatni kuzatish |
| Schema xatosi | `400` | Payloadni tuzatish, avtomatik retry qilmaslik |
| Authentication/authorization | `401/403` | Credential yoki scope’ni tuzatish |
| Idempotency/version/state konflikti | `409` | Avval kanonik holatni query qilish |
| Semantik NACK | `422` | Validation issues asosida ma’lumotni tuzatish |
| Rate limit | `429` | `Retry-After` bo‘yicha kutish |
| Vaqtinchalik nosozlik | `503/504` | Ayni idempotency key bilan backoff retry |

### 4.4. Idempotency va asinxron ACK/NACK

Idempotency scope’i:

```text
client_id + endpoint_family + idempotency_key
```

Bir xil key va bir xil payload avvalgi kanonik javobni qaytaradi. Bir xil key va boshqa payload `409 IDEMPOTENCY_PAYLOAD_MISMATCH` qaytaradi.

Katta batch/event qabul qilinganda umumiy javob:

```json
{
  "operation_id": "01J...",
  "status": "ACCEPTED",
  "duplicate": false,
  "received_at": "2026-10-01T10:00:00+05:00",
  "correlation_id": "01J...",
  "validation_issues": []
}
```

Keyingi holat `GET /v1/operations/{operation_id}` orqali olinadi. Shaxsiy ma’lumot `operation_id` ichida kodlanmaydi.

## 5. Manba idoralar uchun API

### 5.1. Endpointlar

| Metod va endpoint | Vazifa | Asosiy request tarkibi | Natija |
|---|---|---|---|
| `POST /v1/beneficiary-events` | Barcha source va huquq eventlari | `event_id`, `schema_version`, `event_type_code`, `occurred_at`, `source_record`, `person`, `right` | `operation_id`, acceptance, duplicate, validation issues |
| `POST /v1/beneficiary-snapshots/batches` | Boshlang‘ich/nazorat snapshot chunklari | `snapshot_id`, `as_of`, chunk rekvizitlari, checksum, `records[]` | Asinxron ACK/NACK va reconciliation natijasi |
| `POST /v1/historical-usage-imports` | Tarixiy foydalanish importini ochish | yil/as-of, expected count/checksum, source reference | `import_id`, status |
| `POST /v1/historical-usage-imports/{import_id}/lines/batch` | Tarixiy foydalanish qatorlari | shaxs, yil, policy/mode, leg/status, evidence reference | Batch ACK/NACK |
| `POST /v1/historical-usage-imports/{import_id}/finalize` | Importni tekshirish va yopish | final count/checksum, vakolatli sign-off | Reconciliation natijasi |
| `GET /v1/operations/{operation_id}` | Event/batch natijasini olish | Opaque operation ID | status, accepted/rejected counts, issues |
| `POST /v1/data-quality/issues/{issue_id}/resolve` | Source konflikti/tuzatish natijasi | resolution code, corrected record/version, izoh, signature | Yangilangan issue statusi |

Historical usage D-05 tasdiqlanmaguncha biennial huquqni avtomatik ochmaydi.

### 5.2. Yagona kontingent event tarkibi

```json
{
  "event_id": "01J...",
  "schema_version": "1.0",
  "event_type_code": "RIGHT_GRANTED",
  "occurred_at": "2026-09-01T10:00:00+05:00",
  "source_record": {
    "record_id": "987654",
    "record_version": 4,
    "sequence": 15
  },
  "person": {
    "pinfl": "**************",
    "identity_document_type_code": "IDENTITY_DOCUMENT",
    "identity_document_ref": "protected-doc-ref"
  },
  "right": {
    "legal_basis_code": "PART_EQ_10",
    "right_status_code": "ACTIVE",
    "disability_group_code": null,
    "effective_from": "2026-10-01",
    "effective_to": null,
    "basis_document_ref": "protected-basis-ref"
  }
}
```

`event_type_code` kamida `RIGHT_GRANTED`, `RIGHT_CORRECTED`, `RIGHT_REVOKED` va `RIGHT_REINSTATED`ni qo‘llaydi. Snapshotda yo‘q yozuv source policy tasdiqlanmasdan avtomatik bekor qilinmaydi.

## 6. Tashuvchilar uchun real-time API

### 6.1. Endpointlar

| Metod va endpoint | Vazifa | Asosiy request tarkibi | Natija |
|---|---|---|---|
| `POST /v1/eligibility/check` | Sarflamaydigan preview | shaxs, applicant/representative/companion, journey, transport va fare class | decision, offers, reason codes, freshness |
| `POST /v1/entitlements/check-and-reserve` | Moslik va global limitni atomar band qilish | preview maydonlari, `offer_id`, leg, fare quote, manual token | reservation, TTL, server benefit, remaining limit |
| `GET /v1/reservations/{reservation_id}` | Lost-ACK/retry holatini olish | Opaque reservation ID | kanonik reservation statusi |
| `POST /v1/reservations/{reservation_id}/release` | Chipta chiqmasa holdni bo‘shatish | reason code, carrier operation reference | released/idempotent result |
| `POST /v1/tickets/issue` | Chipta yaratish va rezervni commit qilish | reservation, carrier ticket/PNR, passenger, segment, fare, evidence | kanonik ticket, committed ledger result |
| `GET /v1/tickets/{ticket_id}` | O‘z carrier ticketini olish | Opaque ticket ID | ticket/segment projection |
| `POST /v1/tickets/{ticket_id}/events` | Barcha keyingi lifecycle eventlari | event ID/type/time/version, reason, evidence, reschedule refs | ticket va ledger ta’siri |
| `POST /v1/ticket-events/batches` | Uzilishdan keyingi reconciliation | batch metadata va `events[]` | ACK/NACK, duplicate va conflictlar |
| `POST /v1/travel-evidence` | Transport-spetsifik dalil | ticket/segment, evidence type/ref/hash, occurred time | evidence acceptance |
| `POST /v1/manual-verification-cases` | YAMIHda huquq topilmaganda case | shaxs, journey, requested offer/policy context | case ID/status |
| `POST /v1/manual-verification-cases/{case_id}/documents` | Hujjat metama’lumoti | protected ref, type, hash, issuer, valid dates | document acceptance |
| `GET /v1/manual-verification-cases/{case_id}` | Reviewer qarorini olish | Opaque case ID | status; approved bo‘lsa one-time token |
| `POST /v1/appeals` | Rad bo‘yicha shikoyat reference’i | original decision/case, reason, evidence refs | appeal ID/status |

Bulk eligibility endpoint taqdim etilmaydi. Carrier boshqa carrier ticketi, source recordi yoki to‘liq kontingent ro‘yxatini ko‘ra olmaydi.

### 6.2. Check-and-reserve request

```json
{
  "request_id": "01J...",
  "person": {
    "pinfl": "**************"
  },
  "applicant_role_code": "BENEFICIARY",
  "representative_authorization_ref": null,
  "principal_reservation_ref": null,
  "offer_id": "offer-opaque-id",
  "journey": {
    "transport_mode_code": "RAIL",
    "origin_node_code": "TAS_RAIL",
    "destination_node_code": "SKD_RAIL",
    "departure_at": "2026-10-20T08:00:00+05:00",
    "service_ref": "carrier-service-ref",
    "fare_class_code": "PLATSKART",
    "leg_type_code": "OUTBOUND"
  },
  "fare_quote": {
    "currency_code": "UZS",
    "components": [
      { "component_code": "BASE_TRANSPORT_FARE", "amount_minor": 15000000 }
    ]
  },
  "manual_authorization_token": null
}
```

### 6.3. Check-and-reserve response

```json
{
  "decision": "ELIGIBLE",
  "reservation": {
    "reservation_id": "01J...",
    "status": "HELD",
    "expires_at": "2026-10-20T07:15:00+05:00"
  },
  "benefit": {
    "currency_code": "UZS",
    "eligible_amount_minor": 15000000,
    "passenger_amount_minor": 0
  },
  "entitlement": {
    "bundle_ref": "opaque-bundle-ref",
    "leg_ref": "opaque-leg-ref",
    "remaining_limit": 0
  },
  "policy": {
    "revision_id": "01J...",
    "payload_hash": "sha256:..."
  },
  "source_as_of": "2026-10-20T06:59:00+05:00",
  "decision_expires_at": "2026-10-20T07:15:00+05:00",
  "stale_data": false,
  "reason_codes": []
}
```

Carrier benefit foizi, `authorization_source`, exception approval, entitlement balance yoki policy natijasini bodyda mustaqil belgilamaydi.

### 6.4. Ticket issue tarkibi

`POST /v1/tickets/issue` quyidagilarni oladi:

- `reservation_id`;
- `carrier_ticket_id`, `pnr` yoki order reference;
- `issued_at` va carrier `entity_version`;
- passenger va companion/principal linklari;
- segment/coupon, route, service va fare class;
- `fare_breakdown[]` — component code, amount minor, currency;
- himoyalangan ticket/evidence reference va hashlar.

Benefit, discount, authorization source va eligible amount reservation snapshotidan olinadi.

### 6.5. Yagona ticket-event tarkibi

```json
{
  "event_id": "01J...",
  "event_type_code": "RETURNED",
  "occurred_at": "2026-10-18T14:10:00+05:00",
  "entity_version": 3,
  "reason_code": "TECHNICAL_NONUSE",
  "evidence_refs": [
    {
      "type_code": "RETURN_EVIDENCE",
      "storage_ref": "protected-ref",
      "sha256": "..."
    }
  ],
  "replacement_ticket_ref": null
}
```

Qo‘llab-quvvatlanadigan eventlar: `TRAVELLED`, `RETURNED`, `CARRIER_CANCELLED`, `NO_SHOW`, `VOIDED`, `RESCHEDULED`. `PASSENGER_REQUEST` limitni avtomatik tiklamaydi; nonuse restore dalil, muddat va reviewer qaroriga bog‘liq.

## 7. Vakolatli reviewer APIlari

| Metod va endpoint | Vazifa | Cheklov |
|---|---|---|
| `POST /v1/manual-verification-cases/{case_id}/decision` | Manual case qarori va ijobiy holatda one-time token | Permission + organization + maker-checker/ERI |
| `POST /v1/reconciliation-cases/{case_id}/decision` | Tafovut bo‘yicha qaror | Carrier o‘zi exception tasdiqlay olmaydi |
| `GET /v1/audit-evidence/{decision_id}` | Qaror dalil paketini olish | Purpose-bound, minimal PII, auditli |

Manual token raw ko‘rinishda log, audit yoki DBda saqlanmaydi; faqat KMS/HMAC hash saqlanadi. Token person, carrier, journey, policy, expiry va consumed holatiga bog‘lanadi.

## 8. Oylik reyestr va claim APIlari

| Metod va endpoint | Vazifa | Asosiy request tarkibi | Natija |
|---|---|---|---|
| `POST /v1/settlements` | Carrier+oy draftini yaratish | period, carrier submission ref, expected totals | `settlement_id`, cutoff, stage |
| `POST /v1/settlements/{settlement_id}/lines/batch` | Reyestr qatorlarini yuklash | ticket/segment, reservation, fare va claimed amount, basis/evidence refs | line validation ACK/NACK |
| `POST /v1/settlements/{settlement_id}/attachments` | Normativ hujjat referenslari | type, storage ref, hash, signature metadata | attachment acceptance |
| `POST /v1/settlements/{settlement_id}/submit` | Reyestrni ERI bilan rasmiy topshirish | payload hash, signature ref, submitted-at | immutable claim ID/version/status |
| `GET /v1/settlements/{settlement_id}` | Tekshiruv holatini olish | Opaque settlement ID | stage, counts, amounts, validation issues, claim ref |
| `POST /v1/claims/{claim_id}/payment-submit` | Accepted claim versiyasini finance handoffga qo‘yish | command metadata; biznes payload server claimidan olinadi | handoff ID va delivery status |

Settlement line tarkibi:

- `line_id` va carrier source reference;
- `ticket_id`, `ticket_segment_id`, `reservation_id`;
- `authorization_source_code` — tekshirish uchun, server kanonik qiymati ustun;
- `settlement_basis_code` va uning revisioni;
- actual fare, preferential fare, passenger paid va claimed compensation;
- currency va fare componentlar;
- ticket copy, route sheet va boshqa evidence reference/hashlari.

Reyestr keyingi oyning 10-sanasigacha topshiriladi. Claim eligibility so‘rovlari sonidan emas, kanonik ticket/segment, committed reservation, tasdiqlangan `settlement_basis` va normativ dalillardan hisoblanadi.

`settlement_id` tekshiruv konteyneri, `claim_id` esa ERI bilan imzolangan immutable versiyadir. Correction yangi `claim_id/version` yaratadi; oldingi versiya `SUPERSEDED` bo‘ladi.

## 9. Moliya ATi bilan handoff kontrakti

### 9.1. Ichki command

`POST /v1/claims/{claim_id}/payment-submit` faqat `ACCEPTED` yoki D-03 ruxsat bergan `PARTIALLY_ACCEPTED` claimga qo‘llanadi. Foydalanuvchi request body orqali summa yoki bank rekvizitini almashtira olmaydi.

### 9.2. Finance adapter yuboradigan biznes payload

```json
{
  "handoff_id": "01J...",
  "claim": {
    "claim_id": "01J...",
    "version": 2,
    "payload_hash": "sha256:...",
    "period": "2026-10",
    "accepted_amount_minor": 125000000,
    "currency_code": "UZS"
  },
  "payee": {
    "carrier_code": "UZRAIL",
    "payee_revision_id": "01J...",
    "bank_account_revision_id": "01J..."
  },
  "budget_source_code": "STATE_BUDGET",
  "signature_ref": "protected-signature-ref",
  "submitted_at": "2026-11-10T16:00:00+05:00"
}
```

### 9.3. Texnik ACK/NACK minimumi

- `handoff_id` va tashqi `request_reference`;
- `technical_status`: `ACKNOWLEDGED` yoki `REJECTED`;
- `technical_code` va xavfsiz message;
- `retryable` belgisi;
- `received_at`;
- qabul qilingan payload hash;
- tashqi imzo/signature verification metadata.

Moliya ATining aniq endpoint nomi, callback/polling mexanizmi, status mappingi va sertifikatlari alohida integratsiya kontraktida muzlatiladi. Qaror ularning HTTP nomini belgilamaydi. MVP uchun bank `PAID/REVERSED` statuslari emas, faqat handoffning texnik ACK/NACK holati saqlanadi.

## 10. Universal ma’lumotnomalar APIi

### 10.1. Endpointlar

| Metod va endpoint | Vazifa | Kim foydalanadi |
|---|---|---|
| `GET /v1/reference-data/catalogs` | Ruxsat etilgan kataloglar ro‘yxati va metadata | Barcha integratsiya clientlari |
| `GET /v1/reference-data/{catalog_code}` | Bitta katalogning effective snapshot/deltasini olish | Barcha integratsiya clientlari |
| `POST /v1/reference-data/query` | Bir so‘rovda bir nechta katalogning bir xil `as_of` snapshotini olish | Tavsiya etilgan tashqi bootstrap/sync API |
| `POST /v1/reference-data/change-requests` | Draft/import o‘zgarishini yuborish | Vakolatli katalog owner/steward |
| `POST /v1/reference-data/change-requests/{id}/approve` | Maker-checker approval | Reference approver |
| `POST /v1/reference-data/change-requests/{id}/publish` | Imzolangan revisionni e’lon qilish | Vakolatli publisher |

Har katalog uchun yangi table yoki endpoint yaratilmaydi. Barcha kataloglar universal `catalog → entry → revision → relation → translation` modelida saqlanadi.

### 10.2. GET filterlari

- `as_of` — biznes sanasidagi effective snapshot;
- `changed_since` — delta sync;
- `status` — vakolatga ko‘ra status filteri;
- `lang` — lokalizatsiya;
- `include_relations` — bog‘lanishlarni qaytarish;
- `page_size` va opaque `cursor` — katta kataloglar uchun.

Operational clientga default holatda faqat `ACTIVE + APPROVED + effective` revisionlar qaytariladi. `DRAFT`, `OPEN_DECISION` va yopilmagan D-gatelar faqat governance scope’ida ko‘rinadi.

### 10.3. Reference response tarkibi

```json
{
  "catalog": {
    "code": "transport_modes",
    "family_code": "TRANSPORT",
    "owner_organization_code": "TRANSPORT_MINISTRY",
    "schema_version": "1.0",
    "snapshot_as_of": "2026-10-20",
    "revision": 7,
    "etag": "sha256:..."
  },
  "entries": [
    {
      "code": "RAIL",
      "name": "Temir yo‘l",
      "description": "Yo‘lovchi temir yo‘l transporti",
      "status": "ACTIVE",
      "approval_status": "APPROVED",
      "valid_from": "2026-10-01",
      "valid_to": null,
      "revision_id": "01J...",
      "legal_document_ref": "VMQ-440",
      "attributes": {},
      "relations": []
    }
  ],
  "next_cursor": null
}
```

Stable `code` qayta ishlatilmaydi. Mazmun o‘zgarsa yangi revision yaratiladi; oldin tasdiqlangan transaction aynan ishlatilgan `revision_id` va payload hashni snapshot qiladi.

### 10.4. APIlar kesimida zarur kataloglar

| Guruh | Katalog kodlari | Asosiy owner |
|---|---|---|
| Normativ va huquq | `legal_documents`, `benefit_profiles`, `disability_equivalence_bases`, `participant_equivalence_bases`, `legal_basis_codes`, `right_statuses` | Agentlik + vakolatli manba idoralar |
| Policy va gate | `benefit_policy_parameters`, `decision_gates`, `benefit_policy_matrix`, `source_ownership_rules`, `entitlement_cycle_rules`, `geography_scopes`, `fare_class_rules`, `return_policy_rules`, `manual_verification_rules`, `regulatory_deadlines` | Agentlik va tasdiqlangan policy ownerlar |
| Transport | `transport_modes`, `fare_classes`, `countries`, `currencies`, `transport_nodes`, `routes`, `tariff_component_codes`, `carriers`, `authorized_service_points` | Transport vazirligi va vakolatli registrlar |
| Identity va source | `source_organizations`, `identity_document_types`, `residency_statuses`, `authoritative_attribute_sources`, `contingent_event_types` | Agentlik + authoritative registrlar |
| Eligibility va rezerv | `applicant_roles`, `leg_types`, `eligibility_results`, `reservation_states`, `entitlement_leg_states`, `authorization_sources`, `api_reason_codes` | Agentlik |
| Ticket va manual | `ticket_event_types`, `return_reasons`, `return_review_statuses`, `ticket_states`, `evidence_types`, `manual_document_types`, `manual_verification_statuses`, `attachment_types` | Agentlik + Transport vazirligi + reviewer owner |
| Settlement va claim | `settlement_basis`, `settlement_stages`, `claim_statuses`, `claim_validation_codes`, `settlement_exception_codes`, `finance_handoff_statuses`, `payment_channels`, `business_calendar` | Agentlik + moliya/transport vakillari |
| Integratsiya va ruxsat | `integration_role_scopes`, `api_reason_codes` | Agentlik IAM/integration owner |

`payment_statuses` katalogi kelajak kontrakti sifatida qoladi va MVP runtime’da executable emas.

### 10.5. Hardcode’ni kamaytirish uchun qo‘shimcha kataloglar

OpenAPI freeze oldidan universal modelga quyidagi kataloglarni qo‘shish tavsiya etiladi:

- `operation_statuses`, `validation_issue_codes`, `data_quality_issue_types`;
- `historical_usage_statuses`, `historical_import_statuses`, `basis_document_types`;
- `service_types`, `benefit_types`, `discount_types`;
- `representative_authority_types`, `reconciliation_case_types`, `reconciliation_case_statuses`;
- `signature_types`, `retention_classes`, `audit_purpose_codes`;
- `settlement_payees`, `bank_account_versions`, `budget_sources`;
- `finance_systems`, `finance_ack_codes`, `claim_rejection_codes`, `supported_schema_versions`.

Ular uchun ham alohida table yoki endpoint yaratilmaydi.

### 10.6. Kataloglarni tashqariga chiqarish cheklovlari

- `decision_gates` faqat governance va audit scope’ida ko‘rinadi;
- `source_ownership_rules` har bir partnerga faqat uning vakolat qismi bo‘yicha qaytariladi;
- `authoritative_attribute_sources`ning security va ichki routing metama’lumotlari tashuvchiga berilmaydi;
- `integration_role_scopes` clientga faqat o‘zining granted scope’lari ko‘rinishida qaytariladi;
- `benefit_policy_parameters` va `benefit_policy_matrix`dan tashqariga faqat tasdiqlangan executable projection chiqariladi, ichki priority/dedup tafsilotlari emas;
- `manual_verification_rules`dan ruxsat etilgan hujjat va SLA berilishi mumkin, reviewer/security ichki qismi berilmaydi;
- `DRAFT` va `OPEN_DECISION` yozuvlari operatsion clientga qaytarilmaydi.

## 11. Endpoint → ma’lumotnoma bog‘lanishi

| Endpoint family | Majburiy reference snapshotlari |
|---|---|
| Beneficiary events | source organization, event type, legal basis, right status, identity/residency, source ownership |
| Eligibility/check-and-reserve | applicant role, transport, node/route, fare class, leg, benefit policy, geography, cycle/limit, reason code |
| Ticket issue/events | carrier/service-point, ticket event/state, return reason, fare components, evidence/attachment type |
| Manual verification | document type, verification rule/status, reviewer scope, reason code |
| Settlement | settlement basis/stage, claim validation/exception, evidence, deadline/calendar, currency |
| Finance handoff | claim status, finance handoff status, payment channel, finance system/ACK mapping |

Har biznes javobida kamida policy/reference `revision_id` yoki ularning aggregate payload hashi qaytariladi. Bu keyinchalik “qaysi qoida bilan qaror qilingan?” savoliga aniq javob beradi.

## 12. Maxfiylik va tashqariga chiqmaydigan ma’lumotlar

Tashuvchiga quyidagilar berilmaydi:

- nogironlik tashxisi yoki ortiqcha tibbiy tafsilot;
- source idoraning ichki recordi va basis hujjatining raw nusxasi;
- boshqa carrier rezerv/ticketlari;
- to‘liq kontingent yoki bulk person enumeration;
- ledgerning ichki yozuvlari va boshqa payment channel ma’lumotlari;
- manual tokenning serverdagi hash/secret ma’lumoti.

Carrierga faqat xizmat ko‘rsatish uchun zarur decision, offer, reason code, benefit summasi, reservation TTL, remaining limit, freshness va policy/reference revision qaytariladi.

## 13. Ishga tushirishdan oldingi contract-gatelar

| Gate | APIga ta’siri |
|---|---|
| `D-01` | Rasmiy profil/subtoifa, legal basis ownership, identity/residency authoritative source |
| `D-02` | OUTBOUND/RETURN, mixed-mode, biennial, companion va cross-year qoidalari |
| `D-03` | Settlement basis, return/no-show, tarif/rounding, ERI, cutoff, 10 ish kuni va finance handoff kontrakti |
| `D-04` | Manual hujjatlar, reviewer vakolati, SLA va one-time token production oqimi |
| `D-05` | Historical usage import va ikki tomonlama sign-off |
| `D-06` | Qo‘shimcha temir yo‘l toifalari scope/owner/API/fallbacki |
| `D-07` | Oylik kanal va 2027 Social Card anti-double-payment chegarasi; MVPda disabled |

Tasdiqlanmagan katalog yoki `OPEN_DECISION` policy productionda executable qilinmaydi. D-gatega bog‘liq capability fail-closed ishlaydi.

## 14. OpenAPI deliverable tarkibi

Tashqi tashkilotlarga beriladigan yakuniy integratsiya paketi quyidagilardan iborat bo‘ladi:

- bitta versioned OpenAPI 3.1 fayl;
- reusable schema komponentlari: `PersonIdentifier`, `Journey`, `Money`, `EvidenceReference`, `OperationAck`, `BusinessDecision`, `ApiError`, `ReferenceSnapshot`;
- client scope va tashkilotlar matritsasi;
- katalog bootstrap/delta sync yo‘riqnomasi;
- idempotency, retry, timeout va lost-ACK qoidalari;
- test sandbox, test sertifikat va anonymized test dataset;
- webhook/signature verification yo‘riqnomasi, agar finance marshruti callbackni tanlasa;
- endpointlar va D-gatelar bo‘yicha conformance test to‘plami.
