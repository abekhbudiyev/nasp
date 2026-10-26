export type ReferenceKind = 'NORMATIVE_REFERENCE' | 'TECHNICAL_CONFIGURATION'
export type ReferenceStatus = 'ACTIVE' | 'DRAFT' | 'OPEN_DECISION' | 'HISTORICAL'
export type ReferenceCatalogFamily = 'CATEGORIES' | 'POLICIES' | 'TRANSPORT' | 'ORGANIZATIONS' | 'SYSTEM_CODES'
export type ReferenceApprovalStatus = 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED' | 'SUPERSEDED'
export type ReferenceAttributeValue =
  | string
  | number
  | boolean
  | null
  | ReferenceAttributeValue[]
  | { [key: string]: ReferenceAttributeValue }

export interface ReferenceEntry {
  code: string
  name: string
  description?: string
  kind: ReferenceKind
  legalBasis?: string
  owner?: string
  effectiveFrom?: string
  effectiveTo?: string
  status: ReferenceStatus
  gateId?: string
  gateIds?: string[]
  approvalStatus?: ReferenceApprovalStatus
  sourceRevision?: string
  contentHash?: string
  recordedFrom?: string
  recordedTo?: string
  version: number
  attributes?: Record<string, ReferenceAttributeValue>
}

export interface ReferenceCatalog {
  id: string
  code: string
  title: string
  description: string
  family: ReferenceCatalogFamily
  readOnly: boolean
  warning?: string
  entries: ReferenceEntry[]
}

const technical = (
  code: string,
  name: string,
  description?: string,
  extra: Partial<ReferenceEntry> = {},
): ReferenceEntry => {
  const status = extra.status ?? 'ACTIVE'
  return {
    code,
    name,
    description,
    kind: 'TECHNICAL_CONFIGURATION',
    version: 1,
    recordedFrom: '2026-08-24',
    ...extra,
    status,
    gateIds: extra.gateIds ?? (extra.gateId ? [extra.gateId] : undefined),
    approvalStatus: extra.approvalStatus ?? (status === 'ACTIVE' || status === 'HISTORICAL' ? 'APPROVED' : 'PENDING_APPROVAL'),
  }
}

const normative = (
  code: string,
  name: string,
  description?: string,
  extra: Partial<ReferenceEntry> = {},
): ReferenceEntry => {
  const status = extra.status ?? 'ACTIVE'
  return {
    code,
    name,
    description,
    kind: 'NORMATIVE_REFERENCE',
    version: 1,
    recordedFrom: '2026-08-24',
    ...extra,
    status,
    gateIds: extra.gateIds ?? (extra.gateId ? [extra.gateId] : undefined),
    approvalStatus: extra.approvalStatus ?? (status === 'ACTIVE' || status === 'HISTORICAL' ? 'APPROVED' : 'PENDING_APPROVAL'),
  }
}

export const referenceCatalogs: ReferenceCatalog[] = [
  {
    id: 'legal-documents',
    code: 'legal_documents',
    title: 'Normativ hujjatlar',
    description: 'Qoida va ma’lumotnoma yozuvlari tayanadigan huquqiy manbalar.',
    family: 'CATEGORIES',
    readOnly: true,
    entries: [
      normative('VMQ-440', 'Vazirlar Mahkamasining 440-son qarori', 'Transport imtiyozlari modulining asosiy normativ manbasi.', { legalBasis: '2026-08-13 · 440-son', effectiveFrom: '2026-08-13', owner: 'O‘zbekiston Respublikasi Vazirlar Mahkamasi', sourceRevision: 'lex.uz/docs/8400823@2026-08-13', version: 1, attributes: { source_url: 'https://lex.uz/docs/8400823', policy_go_live: '2026-10-01' } }),
      normative('PF-34', 'Prezident Farmoni PF-34', 'Vatan himoyasi va el-yurt tinchligi yo‘lida halok bo‘lgan shaxslar ota-onasiga doir asos.', { legalBasis: 'PF-34', owner: 'O‘zbekiston Respublikasi Prezidenti', version: 1 }),
    ],
  },
  {
    id: 'benefit-profiles',
    code: 'benefit_profiles',
    title: 'Texnik imtiyoz profillari',
    description: 'Huquqiy asoslarni policy engine uchun normalizatsiya qiluvchi muhokama profillari.',
    family: 'CATEGORIES',
    readOnly: true,
    warning: 'C01–C11 rasmiy yopiq “11 toifa” katalogi emas. Bu texnik profillar faqat D-01 tasdiqlangach production policyga aylantiriladi.',
    entries: [
      technical('C01', 'Urush nogironi · I/II guruh', '1941–1945-yillardagi urush nogironi uchun texnik profil.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 1-ilova', version: 1 }),
      technical('C02', 'Urush nogironiga tenglashtirilgan · I/II guruh', 'Aniq tenglashtirish asosi DIS_EQ_01…04 orqali alohida saqlanadi.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 2-ilova', version: 1 }),
      technical('C03', 'Urush nogironi · III guruh', 'III guruh bo‘yicha alohida texnik profil.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 1-ilova', version: 1 }),
      technical('C04', 'Urush nogironiga tenglashtirilgan · III guruh', 'Aniq tenglashtirish asosi DIS_EQ_01…04 orqali alohida saqlanadi.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 2-ilova', version: 1 }),
      technical('C05', '1941–1945-yillardagi urush qatnashchisi', undefined, { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 1-ilova', version: 1 }),
      technical('C06', 'Sovet Ittifoqi Qahramoni / “Slava” ordeni', '“Slava” ordenining uchala darajasi sohiblari ham qamrab olinadi.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 1-ilova', version: 1 }),
      technical('C07', 'Chernobil nurlanish kasalligi', '4-ilovadagi CHERNOBYL_DISABLED_RAIL scope’i bilan avtomatik birlashtirilmaydi.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440', version: 1 }),
      technical('C08', 'Hamroh · principal safarga bog‘langan rol', 'Mustaqil kontingent/toifa emas; I guruh principalining ayni safariga bog‘lanadi.', { status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], legalBasis: 'VMQ-440', version: 1 }),
      technical('C09', 'Urush qatnashchisiga tenglashtirilgan shaxs', 'Aniq PART_EQ asosi saqlanadi; C10 oilaviy asos bilan aralashtirilmaydi.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('C10', 'Halok bo‘lgan harbiyning ota-onasi / turmush o‘rtog‘i', 'Oilaviy asos uchun texnik profil.', { status: 'OPEN_DECISION', gateId: 'D-01', legalBasis: 'VMQ-440', version: 1 }),
      technical('C11', 'Vatan himoyachilarining ota-onasi', 'Ichki temir yo‘l va havo transportida “ikki marta” qoidasining talqini D-02 bilan yopiladi.', { status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], legalBasis: 'PF-34 · VMQ-440', version: 1 }),
    ],
  },
  {
    id: 'disability-equivalence-bases',
    code: 'disability_equivalence_bases',
    title: 'Nogironlik bo‘yicha tenglashtirish asoslari',
    description: '2-ilovadagi normativ mazmunni yo‘qotmasdan saqlovchi texnik kodlar.',
    family: 'CATEGORIES',
    readOnly: true,
    warning: 'DIS_EQ_01…04 ichki kodlar; huquqiy mazmun VMQ-440 2-ilovasidan olinadi.',
    entries: [
      technical('DIS_EQ_01', 'Harbiy majburiyat, front yoki partizan otryadidagi jarohat', undefined, { legalBasis: 'VMQ-440 · 2-ilova', owner: 'Vakolatli manba idora', version: 1 }),
      technical('DIS_EQ_02', 'IIV yoki DXX xizmat vazifasidagi jarohat', undefined, { legalBasis: 'VMQ-440 · 2-ilova', owner: 'Ichki ishlar vazirligi / Davlat xavfsizlik xizmati', version: 1 }),
      technical('DIS_EQ_03', '1944–1951-yillardagi qiruvchi batalyon yoki otryad xizmati', undefined, { legalBasis: 'VMQ-440 · 2-ilova', owner: 'Vakolatli manba idora', version: 1 }),
      technical('DIS_EQ_04', 'Prezident hujjati bilan tenglashtirilgan shaxs', undefined, { legalBasis: 'VMQ-440 · 2-ilova', owner: 'Vakolatli manba idora', version: 1 }),
    ],
  },
  {
    id: 'participant-equivalence-bases',
    code: 'participant_equivalence_bases',
    title: 'Qatnashchi bo‘yicha tenglashtirish asoslari',
    description: '3-ilovadagi o‘nta normativ asosni alohida saqlovchi texnik kodlar.',
    family: 'CATEGORIES',
    readOnly: true,
    warning: 'PART_EQ_01…10 ichki kodlar; normativ mazmun VMQ-440 3-ilovasidan olinadi.',
    entries: [
      technical('PART_EQ_01', 'Armiya yoki partizan operatsiyalari qatnashchisi', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_02', '1941–1945 armiya, flot, IIV yoki DXX xizmati', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_03', 'Halok bo‘lgan harbiyning ota-onasi yoki beva turmush o‘rtog‘i', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_04', 'Leningrad korxona va muassasa xodimi', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_05', 'Afg‘oniston yoki boshqa davlatlardagi jangovar harakat qatnashchisi', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_06', 'Voyaga yetmagan sobiq mahbus', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_07', 'Antifashistik qarshilik harakati qatnashchisi', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_08', 'Front manfaatidagi maxsus tuzilma xodimi', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_09', 'Prezident hujjati bilan tenglashtirilgan shaxs', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
      technical('PART_EQ_10', 'Xorijdagi vakolatxona xavfsizligida jarohatlangan shaxs', undefined, { legalBasis: 'VMQ-440 · 3-ilova', version: 1 }),
    ],
  },
  {
    id: 'policy-parameters',
    code: 'benefit_policy_parameters',
    title: 'Imtiyoz policy parametrlari',
    description: 'Foiz, sikl, limit va principal/hamroh bog‘lanishini policy enginega uzatuvchi versiyalangan konfiguratsiya.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Yakuniy category × mode × geography × class × limit matritsasi D-01/D-02 tasdig‘iga bog‘liq.',
    entries: [
      technical('DISCOUNT_100', '100 foiz imtiyoz', 'Qoplanadigan bazaga qo‘llanadigan foiz.', { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { percent: '100' }, version: 1 }),
      technical('DISCOUNT_50', '50 foiz imtiyoz', 'Qoplanadigan bazaga qo‘llanadigan foiz.', { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { percent: '50' }, version: 1 }),
      technical('ANNUAL_OUTBOUND_RETURN', 'Yillik borish va qaytish juftligi', 'OUTBOUND va RETURN huquqlari alohida ledger holatida yuritiladi.', { status: 'OPEN_DECISION', gateId: 'D-02', version: 1 }),
      technical('BIENNIAL_OUTBOUND_RETURN', 'Ikki yillik borish va qaytish juftligi', 'Sikl boshlanishi/mixed-mode D-02, tarix manbasi va sign-off D-05 bilan tasdiqlanadi.', { status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-02', 'D-05'], version: 1 }),
      technical('COMPANION_PRINCIPAL_LINK', 'Hamroh principal safarga bog‘langan', 'Mustaqil quota emas; service/date principal rezervi bilan atomar bog‘lanadi.', { status: 'OPEN_DECISION', gateId: 'D-02', version: 1 }),
    ],
  },
  {
    id: 'decision-gates',
    code: 'decision_gates',
    title: 'Ishga tushirish qaror-gate’lari',
    description: 'Normativ yoki metodik aniqlik talab qiladigan production blokatorlari.',
    family: 'POLICIES',
    readOnly: true,
    entries: [
      technical('D-01', 'Profil, subtoifa va source ownership', undefined, { status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + 6 manba idora', attributes: { latest_gate: 'API/policy contract freeze' }, version: 1 }),
      technical('D-02', 'Mixed-mode, benefit yili, cross-year, “ikki marta” va hamroh biennial', undefined, { status: 'OPEN_DECISION', gateId: 'D-02', owner: 'Agentlik + Transport vazirligi + yuridik ekspertiza', attributes: { latest_gate: 'Policy UAT boshlanishidan oldin' }, version: 1 }),
      technical('D-03', 'Settlement basis, return/no-show/deemed-provided, tarif, ERI va 10 ish kuni', undefined, { status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Agentlik + Transport vazirligi + Iqtisodiyot va moliya vakillari', attributes: { latest_gate: '2026-10-01 go-live’dan oldin' }, version: 1 }),
      technical('D-04', 'Manual hujjatlar, tekshiruvchi vakolat va SLA', undefined, { status: 'OPEN_DECISION', gateId: 'D-04', owner: 'Agentlik + Transport vazirligi + tashuvchilar', attributes: { latest_gate: 'Carrier sertifikatsiyasidan oldin' }, version: 1 }),
      technical('D-05', 'Tarix manbasi, import sign-off yoki formal transition', undefined, { status: 'OPEN_DECISION', gateId: 'D-05', owner: 'Agentlik + tegishli eski reyestr egalari', attributes: { latest_gate: 'Ikki yillik policy faollashishidan oldin' }, version: 1 }),
      technical('D-06', '4-ilova 152-banddagi qo‘shimcha rail scope owner/API/fallbacki', undefined, { status: 'OPEN_DECISION', gateId: 'D-06', owner: 'Agentlik + Transport vazirligi + temir yo‘l', attributes: { latest_gate: 'Temir yo‘l integratsiyasi go-live’idan oldin' }, version: 1 }),
      technical('D-07', 'Oylik va Social Card real-time kanal chegarasi', undefined, { status: 'OPEN_DECISION', gateId: 'D-07', owner: 'Agentlik + Transport + Iqtisodiyot va moliya vakillari', attributes: { latest_gate: '2027-01-01 aktivatsiyasidan oldin' }, version: 1 }),
    ],
  },
  {
    id: 'benefit-policy-matrix',
    code: 'benefit_policy_matrix',
    title: 'Imtiyoz policy matritsasi',
    description: 'Texnik profil × transport × geografiya × chegirma × limit kesimidagi versiyalangan qaror qoidalari.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Bu C01–C11 texnik normalizatsiyasi; rasmiy yopiq toifa katalogi emas. Priority, deduplication va source ownership D-01/D-02 bilan tasdiqlanadi.',
    entries: [
      technical('POLICY_C01', 'C01 · urush nogironi I/II', undefined, { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C01', free_modes: 'RAIL', half_modes: 'AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C02', 'C02 · tenglashtirilgan I/II', undefined, { legalBasis: 'VMQ-440 · 2-ilova', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C02', free_modes: 'RAIL', half_modes: 'AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C03', 'C03 · urush nogironi III', undefined, { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C03', free_modes: 'RAIL', half_modes: 'AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C04', 'C04 · tenglashtirilgan III', undefined, { legalBasis: 'VMQ-440 · 2-ilova', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C04', free_modes: 'RAIL', half_modes: 'AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C05', 'C05 · urush qatnashchisi', undefined, { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C05', free_modes: 'RAIL', half_modes: 'AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C06', 'C06 · qahramon / “Slava” ordeni', undefined, { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C06', free_modes: 'RAIL,AIR,BUS', half_modes: '—', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C07', 'C07 · Chernobil nurlanish kasalligi', 'CHERNOBYL_DISABLED_RAIL yordamchi scope’i bilan avtomatik birlashtirilmaydi.', { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C07', free_modes: 'RAIL,AIR,BUS', half_modes: '—', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C08', 'C08 · principalga bog‘langan hamroh', 'Mustaqil quota yoki kontingent yozuvi emas.', { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], attributes: { profile: 'C08', free_modes: '—', half_modes: 'RAIL,AIR,BUS', geography: 'PRINCIPAL_JOURNEY', cycle: 'ANNUAL', limit: 'PRINCIPAL OUTBOUND + RETURN', priority: 'PRINCIPAL_LINK' }, version: 1 }),
      technical('POLICY_C09', 'C09 · qatnashchiga tenglashtirilgan', undefined, { legalBasis: 'VMQ-440 · 3-ilova', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C09', free_modes: '—', half_modes: 'RAIL,AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C10', 'C10 · halok bo‘lgan harbiy oilasi', undefined, { legalBasis: 'VMQ-440', status: 'OPEN_DECISION', gateId: 'D-01', attributes: { profile: 'C10', free_modes: '—', half_modes: 'RAIL,AIR,BUS', geography: 'POLICY_SCOPE', cycle: 'ANNUAL', limit: '1 OUTBOUND + 1 RETURN', priority: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_C11', 'C11 · Vatan himoyachilarining ota-onasi', '“Yiliga ikki marta” birligi D-02 bilan aniqlanadi.', { legalBasis: 'PF-34 · VMQ-440', status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], attributes: { profile: 'C11', free_modes: 'RAIL,AIR', half_modes: '—', geography: 'UZ_DOMESTIC_ONLY', cycle: 'ANNUAL', limit: '2 TIMES · PENDING_D02', priority: 'PENDING_D01' }, version: 1 }),
    ],
  },
  {
    id: 'payment-channels',
    code: 'payment_channels',
    title: 'To‘lov kanallari',
    description: 'Bir safarning ikki marta qoplanishini oldini oluvchi o‘zaro istisno kanallar.',
    family: 'POLICIES',
    readOnly: true,
    entries: [
      technical('MONTHLY_CLAIM', 'Oylik reyestr va claim', 'Tashuvchi reyestri asosidagi qoplash kanali.', { effectiveFrom: '2026-10-01', version: 1 }),
      technical('SOCIAL_CARD_REALTIME', 'Ijtimoiy karta real-time to‘lovi', 'Anti-double-payment va reconciliation D-07 bilan yopilgach faollashadi.', { effectiveFrom: '2027-01-01', status: 'OPEN_DECISION', gateId: 'D-07', version: 1 }),
    ],
  },
  {
    id: 'regulatory-deadlines',
    code: 'regulatory_deadlines',
    title: 'Normativ muddatlar',
    description: 'Biznes sanalari va kalendar konfiguratsiyasiga kiruvchi asosiy muddatlar.',
    family: 'POLICIES',
    readOnly: true,
    entries: [
      normative('POLICY_GO_LIVE', 'VMQ-440 tartibi boshlanishi', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', version: 1 }),
      normative('REGISTRY_DUE_DAY', 'Reyestr keyingi oyning 10-sanasigacha', undefined, { legalBasis: 'VMQ-440', attributes: { day_of_month: '10' }, version: 1 }),
      normative('PAYMENT_SLA_WORKDAYS', 'Hujjatlar kelgach 10 ish kuni', 'SLA reyestr deadline’dan emas, hujjatlar taqdim etilgan vaqtdan hisoblanadi.', { legalBasis: 'VMQ-440', attributes: { workdays: '10' }, version: 1 }),
      normative('SOCIAL_CARD_START', 'Ijtimoiy karta real-time kanali boshlanishi', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2027-01-01', status: 'OPEN_DECISION', gateId: 'D-07', version: 1 }),
    ],
  },
  {
    id: 'transport-modes',
    code: 'transport_modes',
    title: 'Transport turlari',
    description: 'VMQ-440 scope’iga kiruvchi transport rejimlari.',
    family: 'TRANSPORT',
    readOnly: true,
    entries: [
      normative('RAIL', 'Temir yo‘l', 'Yo‘lovchi temir yo‘l transporti.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', owner: 'Transport vazirligi', version: 1 }),
      normative('AIR', 'Havo transporti', 'Yo‘lovchi havo transporti.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', owner: 'Transport vazirligi', version: 1 }),
      normative('BUS', 'Shaharlararo avtobus', 'Shaharlararo avtobus tashuvi; shahar ichki yo‘nalishi emas.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', owner: 'Transport vazirligi', version: 1 }),
    ],
  },
  {
    id: 'fare-classes',
    code: 'fare_classes',
    title: 'Chipta klasslari',
    description: 'Transportga bog‘liq qoplanadigan bazaviy klass va yuqori klass top-up konfiguratsiyasi.',
    family: 'TRANSPORT',
    readOnly: true,
    warning: 'Avtobus klasslari va qoplanadigan tarif komponentlarining yakuniy ro‘yxati D-03 bilan tasdiqlanadi.',
    entries: [
      technical('ECONOMY', 'Ekonom', 'Havo va tegishli tarif siyosatidagi bazaviy klass.', { legalBasis: 'VMQ-440', owner: 'Transport vazirligi', attributes: { transport_modes: 'RAIL,AIR,BUS', base_eligible: 'true' }, version: 1 }),
      technical('PLATSKART', 'Platskart', 'Temir yo‘l klassi.', { legalBasis: 'VMQ-440', owner: 'Transport vazirligi', attributes: { transport_modes: 'RAIL', base_eligible: 'true' }, version: 1 }),
      technical('COUPE', 'Kupe', 'Temir yo‘l klassi.', { legalBasis: 'VMQ-440', owner: 'Transport vazirligi', attributes: { transport_modes: 'RAIL', base_eligible: 'true' }, version: 1 }),
      technical('STANDARD', 'Standart', 'Avtobus uchun demo konfiguratsiya; normativ yopiq klass katalogi emas.', { status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Transport vazirligi', attributes: { transport_modes: 'BUS', base_eligible: 'true' }, version: 1 }),
      technical('BUSINESS', 'Biznes / yuqori klass', 'Bazaviy qoplanadigan summa ustidagi farq yo‘lovchi top-up’i sifatida ajratiladi.', { status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Transport vazirligi', attributes: { transport_modes: 'RAIL,AIR,BUS', base_eligible: 'false' }, version: 1 }),
    ],
  },
  {
    id: 'countries',
    code: 'countries',
    title: 'Mamlakat va geografiya kodlari',
    description: 'Ichki va xalqaro safar scope’ini tekshirish uchun effective-dated mamlakat katalogi.',
    family: 'TRANSPORT',
    readOnly: true,
    warning: 'Bu yopiq Bitim davlatlari ro‘yxati emas. To‘liq tarkib va amal davrlari vakolatli ISO/Bitim ma’lumotnomasidan sinxronlanadi.',
    entries: [
      normative('UZ', 'O‘zbekiston', 'Ichki safar geography kodi.', { legalBasis: 'VMQ-440', owner: 'Vakolatli mamlakat ma’lumotnomasi', version: 1 }),
      technical('KZ', 'Qozog‘iston', 'Xalqaro yo‘nalish uchun demo yozuv; Bitim scope’i va amal davri manbadan tekshiriladi.', { status: 'DRAFT', owner: 'Vakolatli mamlakat ma’lumotnomasi', version: 1 }),
    ],
  },
  {
    id: 'currencies',
    code: 'currencies',
    title: 'Valyutalar',
    description: 'Tarif va settlement summalarini minor unit bilan uzatish uchun kodlar.',
    family: 'TRANSPORT',
    readOnly: true,
    entries: [technical('UZS', 'O‘zbekiston so‘mi', 'API summalari minor unit va currency_exponent bilan uzatiladi.', { attributes: { exponent: '2' }, version: 1 })],
  },
  {
    id: 'transport-nodes',
    code: 'transport_nodes',
    title: 'Bekat, aeroport va avtovokzallar',
    description: 'Journey origin/destination kodlari uchun transportga bog‘langan tugunlar registri.',
    family: 'TRANSPORT',
    readOnly: true,
    warning: 'Quyidagi yozuvlar MVP ssenariy kodlari. Production kodlar Transport vazirligining vakolatli manbasidan sinxronlanadi.',
    entries: [
      technical('TAS_RAIL', 'Toshkent temir yo‘l bekati', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'RAIL' }, version: 1 }),
      technical('SKD_RAIL', 'Samarqand temir yo‘l bekati', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'RAIL' }, version: 1 }),
      technical('BUX_RAIL', 'Buxoro temir yo‘l bekati', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'RAIL' }, version: 1 }),
      technical('TAS_AIR', 'Toshkent aeroporti', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'AIR' }, version: 1 }),
      technical('NCU_AIR', 'Nukus aeroporti', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'AIR' }, version: 1 }),
      technical('TAS_BUS', 'Toshkent avtovokzali', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'BUS' }, version: 1 }),
      technical('JZZ_BUS', 'Jizzax avtovokzali', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { country: 'UZ', transport_mode: 'BUS' }, version: 1 }),
    ],
  },
  {
    id: 'routes',
    code: 'routes',
    title: 'Yo‘nalishlar',
    description: 'Origin/destination tugunlari va transport turini birlashtiruvchi versiyalangan route yozuvlari.',
    family: 'TRANSPORT',
    readOnly: true,
    warning: 'Route yozuvlari MVP demo konfiguratsiyasi; productionda tashuvchi va vakolatli transport registri owner bo‘ladi.',
    entries: [
      technical('RAIL_TAS_SKD', 'Toshkent → Samarqand · temir yo‘l', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { origin: 'TAS_RAIL', destination: 'SKD_RAIL', transport_mode: 'RAIL' }, version: 1 }),
      technical('RAIL_BUX_TAS', 'Buxoro → Toshkent · temir yo‘l', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { origin: 'BUX_RAIL', destination: 'TAS_RAIL', transport_mode: 'RAIL' }, version: 1 }),
      technical('AIR_TAS_NCU', 'Toshkent → Nukus · havo', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { origin: 'TAS_AIR', destination: 'NCU_AIR', transport_mode: 'AIR' }, version: 1 }),
      technical('BUS_TAS_JZZ', 'Toshkent → Jizzax · avtobus', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { origin: 'TAS_BUS', destination: 'JZZ_BUS', transport_mode: 'BUS' }, version: 1 }),
    ],
  },
  {
    id: 'manual-documents',
    code: 'manual_document_types',
    title: 'Tasdiqlovchi hujjatlar',
    description: 'YAMIHda huquq topilmaganda manual fallback uchun hujjat turlari.',
    family: 'TRANSPORT',
    readOnly: true,
    warning: 'Temir yo‘l uchun uchta nomlangan hujjat bor; havo va avtobus kataloglari D-04 bilan ochilishi kerak.',
    entries: [
      normative('RAIL_WAR_DISABLED_CERT', 'Urush oqibatida nogironligi bo‘lgan shaxs guvohnomasi', undefined, { legalBasis: 'VMQ-440 · temir yo‘l fallback', owner: 'Vakolatli organ', gateId: 'D-04', version: 1, attributes: { transport_mode: 'RAIL', operational_use: 'PENDING_D04' } }),
      normative('RAIL_WAR_PARTICIPANT_CERT', 'Urush qatnashchisi guvohnomasi', undefined, { legalBasis: 'VMQ-440 · temir yo‘l fallback', owner: 'Vakolatli organ', gateId: 'D-04', version: 1, attributes: { transport_mode: 'RAIL', operational_use: 'PENDING_D04' } }),
      normative('RAIL_BENEFIT_RIGHT_CERT', 'Imtiyozga huquqi to‘g‘risidagi guvohnoma', undefined, { legalBasis: 'VMQ-440 · temir yo‘l fallback', owner: 'Vakolatli organ', gateId: 'D-04', version: 1, attributes: { transport_mode: 'RAIL', operational_use: 'PENDING_D04' } }),
      technical('AIR_DOCUMENT_SET', 'Havo transporti hujjatlar to‘plami', 'Rasmiy yopiq ro‘yxat va tekshiruvchi vakolat kutilmoqda.', { status: 'OPEN_DECISION', gateId: 'D-04', version: 1, attributes: { transport_mode: 'AIR' } }),
      technical('BUS_DOCUMENT_SET', 'Avtobus hujjatlar to‘plami', 'Rasmiy yopiq ro‘yxat va tekshiruvchi vakolat kutilmoqda.', { status: 'OPEN_DECISION', gateId: 'D-04', version: 1, attributes: { transport_mode: 'BUS' } }),
    ],
  },
  {
    id: 'source-organizations',
    code: 'source_organizations',
    title: 'Kontingent manba tashkilotlari',
    description: 'Idoralararo integratsiyalashuv platformasi orqali huquq eventlarini yuboruvchi rasmiy manbalar.',
    family: 'ORGANIZATIONS',
    readOnly: true,
    entries: [
      normative('PENSION_FUND', 'Pensiya jamg‘armasi', undefined, { legalBasis: 'VMQ-440', owner: 'Pensiya jamg‘armasi', version: 1 }),
      normative('CUSTOMS_COMMITTEE', 'Bojxona qo‘mitasi', undefined, { legalBasis: 'VMQ-440', owner: 'Bojxona qo‘mitasi', version: 1 }),
      normative('DEFENCE_MINISTRY', 'Mudofaa vazirligi', undefined, { legalBasis: 'VMQ-440', owner: 'Mudofaa vazirligi', version: 1 }),
      normative('INTERNAL_AFFAIRS', 'Ichki ishlar vazirligi', undefined, { legalBasis: 'VMQ-440', owner: 'Ichki ishlar vazirligi', version: 1 }),
      normative('EMERGENCIES_MINISTRY', 'Favqulodda vaziyatlar vazirligi', undefined, { legalBasis: 'VMQ-440', owner: 'Favqulodda vaziyatlar vazirligi', version: 1 }),
      normative('STATE_SECURITY_SERVICE', 'Davlat xavfsizlik xizmati', undefined, { legalBasis: 'VMQ-440', owner: 'Davlat xavfsizlik xizmati', version: 1 }),
    ],
  },
  {
    id: 'carriers',
    code: 'carriers',
    title: 'Tashuvchilar',
    description: 'Transport turi, mTLS client va settlement payee bilan bog‘lanadigan operatsion tashuvchi registri.',
    family: 'ORGANIZATIONS',
    readOnly: true,
    warning: 'Quyidagi kodlar MVP demo konfiguratsiyasi. Production ro‘yxat va ownership Transport vazirligining vakolatli registridan olinadi.',
    entries: [
      technical('UZRAIL', 'O‘zbekiston temir yo‘llari', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { transport_mode: 'RAIL' }, version: 1 }),
      technical('FLY_KHIVA_GROUP', '"FLY KHIVA GROUP" LLC', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { transport_mode: 'AIR', inn: '308076287' }, version: 1 }),
      technical('CENTRUM_AIR_SALES', '"CENTRUM AIR SALES" LLC', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { transport_mode: 'AIR', inn: '310289742' }, version: 1 }),
      technical('QANOT_SHARQ_AVIA_SERVICE', '"QANOT SHARQ AVIA SERVICE" LLC', undefined, { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { transport_mode: 'AIR', inn: '310608218' }, version: 1 }),
      technical('INTERCITY_BUS', 'Toshkent avtovokzali', 'MVPdagi shaharlararo avtobus adapteri.', { status: 'DRAFT', owner: 'Transport vazirligi', attributes: { transport_mode: 'BUS' }, version: 1 }),
    ],
  },
  {
    id: 'applicant-roles',
    code: 'applicant_roles',
    title: 'Murojaatchi va yo‘lovchi rollari',
    description: 'Moslik, rezerv va chipta oqimida ishlatiladigan texnik rollar.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('BENEFICIARY', 'Benefitsiar', 'Huquq egasi.', { version: 1 }),
      technical('LEGAL_REPRESENTATIVE', 'Qonuniy vakil', 'Vakolat hujjati va amal davri tekshiriladi.', { version: 1 }),
      technical('COMPANION', 'Hamroh', 'Mustaqil kontingent emas; principal safarga bog‘langan rol.', { gateId: 'D-02', version: 1 }),
    ],
  },
  {
    id: 'leg-types',
    code: 'leg_types',
    title: 'Safar yo‘nalishlari',
    description: 'Limit ledgerdagi mustaqil borish va qaytish huquqlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [technical('OUTBOUND', 'Borish', undefined, { version: 1 }), technical('RETURN', 'Qaytish', undefined, { version: 1 })],
  },
  {
    id: 'contingent-event-types',
    code: 'contingent_event_types',
    title: 'Kontingent event turlari',
    description: 'Barcha manba tashkilotlar yuboradigan yagona event envelope variantlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('RIGHT_GRANTED', 'Huquq berildi', undefined, { version: 1 }),
      technical('RIGHT_CORRECTED', 'Huquq tuzatildi', undefined, { version: 1 }),
      technical('RIGHT_REVOKED', 'Huquq bekor qilindi', undefined, { version: 1 }),
      technical('RIGHT_REINSTATED', 'Huquq tiklandi', undefined, { version: 1 }),
    ],
  },
  {
    id: 'ticket-event-types',
    code: 'ticket_event_types',
    title: 'Chipta event turlari',
    description: 'Barcha transportlar uchun umumiy chipta lifecycle eventlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['ISSUED', 'RETURNED', 'CARRIER_CANCELLED', 'VOIDED', 'RESCHEDULED', 'TRAVELLED', 'NO_SHOW'].map((code) => technical(code, ({ ISSUED: 'Chipta berildi', RETURNED: 'Qaytarildi', CARRIER_CANCELLED: 'Tashuvchi qatnovni bekor qildi', VOIDED: 'Bekor qilindi', RESCHEDULED: 'Boshqa sanaga ko‘chirildi', TRAVELLED: 'Foydalanildi', NO_SHOW: 'Foydalanilmadi' } as Record<string, string>)[code]!, undefined, { version: 1 })),
  },
  {
    id: 'return-reasons',
    code: 'return_reasons',
    title: 'Qaytarish va foydalanmaslik sabablari',
    description: 'Limitni tiklash qarori sabab va dalilga bog‘lanishi uchun texnik kodlar.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Yopiq sabab katalogi va settlement ta’siri D-03 bilan tasdiqlanadi. PASSENGER_REQUEST avtomatik limit restore qilmaydi.',
    entries: [
      technical('PASSENGER_REQUEST', 'Yo‘lovchi talabi', 'Avtomatik limit restore qilinmaydi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
      technical('TECHNICAL_NONUSE', 'Tasdiqlangan texnik nonuse', 'Bir haftalik shart va dalil bajarilganda restore reviewga kiradi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
      technical('NATURAL_NONUSE', 'Tasdiqlangan tabiiy nonuse', 'Bir haftalik shart va dalil bajarilganda restore reviewga kiradi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
      technical('OTHER_VERIFIED_NONUSE', 'Boshqa tasdiqlangan nonuse', 'Bir haftalik shart va dalil talab qilinadi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
      technical('CARRIER_CANCELLED', 'Tashuvchi bekor qilgan', 'Tashuvchi dalili va reconciliation bilan qayta ishlanadi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
    ],
  },
  {
    id: 'eligibility-results',
    code: 'eligibility_results',
    title: 'Moslik natijalari',
    description: 'Check-and-reserve servisining yuqori darajadagi natija kodlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [technical('ELIGIBLE', 'Mos', undefined, { version: 1 }), technical('NOT_ELIGIBLE', 'Mos emas', undefined, { version: 1 }), technical('MANUAL_DOCUMENT_REQUIRED', 'Tasdiqlovchi hujjat kerak', undefined, { gateId: 'D-04', version: 1 })],
  },
  {
    id: 'reservation-states',
    code: 'reservation_states',
    title: 'Rezerv holatlari',
    description: 'Huquq, ledger, rezerv va chipta state’lari alohida yuritiladi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['HELD', 'CONSUMED', 'RESTORE_REVIEW', 'RELEASED', 'RESTORED'].map((code) => technical(code, code, undefined, { version: 1 })),
  },
  {
    id: 'entitlement-leg-states',
    code: 'entitlement_leg_states',
    title: 'Limit ledger holatlari',
    description: 'OUTBOUND/RETURN huquq leglari rezervdan alohida yuritiladigan holatlar.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['AVAILABLE', 'HELD', 'CONSUMED', 'RESTORE_REVIEW', 'RESTORED'].map((code) => technical(code, code, undefined, { version: 1 })),
  },
  {
    id: 'return-review-statuses',
    code: 'return_review_statuses',
    title: 'Qaytarishni ko‘rib chiqish holatlari',
    description: 'Vakolat, tashkilot va ERI claimi bilan boshqariladigan restore review state-machine.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('PENDING', 'Ko‘rib chiqish kutilmoqda', undefined, { version: 1 }),
      technical('APPROVED', 'Tasdiqlandi', undefined, { version: 1 }),
      technical('REJECTED', 'Rad etildi', undefined, { version: 1 }),
      technical('METHODOLOGY_PENDING', 'Metodika kutilmoqda', 'Passenger-request avtomatik restore qilinmaydi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
    ],
  },
  {
    id: 'ticket-states',
    code: 'ticket_states',
    title: 'Chipta holatlari',
    description: 'Chipta aggregate’ining kanonik state-machine holatlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['DRAFT', 'ISSUED', 'TRAVELLED', 'RETURN_PENDING', 'RETURNED', 'RETURN_DEADLINE_EXPIRED', 'CARRIER_CANCELLED', 'NO_SHOW', 'EXCHANGED', 'VOID', 'ERROR', 'RECONCILIATION'].map((code) => technical(code, code, undefined, { version: 1 })),
  },
  {
    id: 'claim-statuses',
    code: 'claim_statuses',
    title: 'Claim holatlari',
    description: 'Payment state-machine’dan ajratilgan claim holatlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['SUBMITTED', 'PARTIALLY_ACCEPTED', 'ACCEPTED', 'REJECTED', 'ADJUSTMENT_REQUIRED', 'CLOSED'].map((code) => technical(code, code, undefined, { version: 1 })),
  },
  {
    id: 'settlement-stages',
    code: 'settlement_stages',
    title: 'Settlement bosqichlari',
    description: 'Claim yaratilishidan oldingi settlement aggregate bosqichlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['DRAFT', 'VALIDATING', 'READY_TO_SUBMIT', 'CLAIM_CREATED'].map((code) => technical(code, code, undefined, { version: 1 })),
  },
  {
    id: 'payment-statuses',
    code: 'payment_statuses',
    title: 'To‘lov holatlari · keyingi bosqich',
    description: 'Post-payment monitoring kontrakti; “to‘lovgacha” MVP runtime/UI’da faollashtirilmaydi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: ['CREATED', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'PAYMENT_ORDER_CREATED', 'PROCESSING', 'PARTIALLY_PAID', 'PAID', 'FAILED', 'RETRYING', 'REVERSED', 'RECONCILED'].map((code) => technical(code, code, 'Future contract; MVP executable reference emas.', { status: 'DRAFT', version: 1 })),
  },
  {
    id: 'authorization-sources',
    code: 'authorization_sources',
    title: 'Avtorizatsiya manbalari',
    description: 'Chipta rasmiylashtirishga asos bo‘lgan onlayn yoki manual qaror manbasi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('ONLINE', 'Onlayn check-and-reserve', undefined, { version: 1 }),
      technical('MANUAL_DOCUMENT', 'Tasdiqlangan manual hujjat', 'Opaque bir martalik authorization rezervga bog‘lanadi.', { gateId: 'D-04', version: 1 }),
      technical('LEGACY_MIGRATION', 'Tarixiy migratsiya', 'Faqat tarix importi; yangi chipta uchun avtorizatsiya emas.', { status: 'HISTORICAL', gateId: 'D-05', version: 1 }),
    ],
  },
  {
    id: 'evidence-types',
    code: 'evidence_types',
    title: 'Dalil va ilova turlari',
    description: 'Chipta, tarif va settlement qatorlarini tekshirishda ishlatiladigan himoyalangan reference turlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Majburiy/yordamchi dalillar va retention qoidalari D-03 bilan yakunlanadi.',
    entries: [
      normative('TICKET_COPY', 'Chipta nusxasi', 'Nizomdagi normativ hujjatlar minimumi; qaysi settlement_basisda yetarliligi D-03 bilan aniqlanadi.', { legalBasis: 'VMQ-440 · Nizom 17-band', sourceRevision: 'lex.uz/docs/8400823#8405929', attributes: { normative_minimum: true, settlement_applicability: 'PENDING_D03' }, version: 1 }),
      normative('ROUTE_SHEET', 'Yo‘nalish qaydnomasi', 'Elektron yo‘lkira hujjati uchun normativ minimum; transport-spetsifik qo‘llanishi D-03 bilan aniqlanadi.', { legalBasis: 'VMQ-440 · Nizom 17-band', sourceRevision: 'lex.uz/docs/8400823#8405929', attributes: { normative_minimum: true, settlement_applicability: 'PENDING_D03' }, version: 1 }),
      technical('TARIFF_EVIDENCE', 'Tarif dalili', undefined, { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 }),
    ],
  },
  {
    id: 'settlement-basis',
    code: 'settlement_basis',
    title: 'Hisob-kitob asoslari',
    description: 'Claimga kiradigan chipta qatorini aniqlovchi transport-spetsifik asoslar.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Yakuniy settlement_basis katalogi qarorda ochilmagan; D-03 yopilmaguncha faqat placeholder ishlatiladi.',
    entries: [technical('PENDING_D03', 'Metodika kutilmoqda', 'Productionda claimable holat sifatida ishlatilmaydi.', { status: 'OPEN_DECISION', gateId: 'D-03', version: 1 })],
  },
  {
    id: 'legal-basis-codes',
    code: 'legal_basis_codes',
    title: 'Kanonik huquqiy asos kodlari',
    description: 'Normativ band va ilovalarni kontingent hamda policy yozuvlariga bog‘lovchi versiyalangan texnik kodlar.',
    family: 'CATEGORIES',
    readOnly: true,
    warning: 'Kodlar normativ hujjatdagi rasmiy klassifikator emas. D-01 tasdig‘isiz production huquqi yaratmaydi.',
    entries: [
      technical('VMQ440_1A_WAR_DISABLED_I_II', '1941–1945-yillardagi urush nogironi · I/II guruh', undefined, { legalBasis: 'VMQ-440 · 1-band “a”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C01'] }, version: 1 }),
      technical('VMQ440_1A_WAR_DISABLED_III', '1941–1945-yillardagi urush nogironi · III guruh', undefined, { legalBasis: 'VMQ-440 · 1-band “a”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C03'] }, version: 1 }),
      technical('VMQ440_1A_WAR_PARTICIPANT', '1941–1945-yillardagi urush qatnashchisi', undefined, { legalBasis: 'VMQ-440 · 1-band “a”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C05'] }, version: 1 }),
      technical('VMQ440_1A_HERO_OR_GLORY', 'Sovet Ittifoqi Qahramoni yoki “Slava” ordeni sohibi', undefined, { legalBasis: 'VMQ-440 · 1-band “a”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C06'] }, version: 1 }),
      technical('VMQ440_1B_FALLEN_FAMILY', 'Halok bo‘lgan harbiyning ota-onasi yoki turmush o‘rtog‘i', 'PART_EQ_03 normativ reference’i bilan ustma-ust qismi alohida saqlanadi.', { legalBasis: 'VMQ-440 · 1-band “b”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C10'], related_legal_basis_codes: ['PART_EQ_03'] }, version: 1 }),
      technical('VMQ440_2A_PF34_PARENT', 'Vatan himoyasi yo‘lida halok bo‘lgan shaxs ota-onasi', undefined, { legalBasis: 'VMQ-440 · 2-band “a”; PF-34', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C11'] }, version: 1 }),
      technical('VMQ440_2B_CHERNOBYL_RADIATION', 'Chernobil AES oqibatidagi nurlanish kasalligi', undefined, { legalBasis: 'VMQ-440 · 2-band “b”', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli manba idoralar', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C07'] }, version: 1 }),
      technical('VMQ440_COMPANION_I_GROUP', 'I guruh benefitsiari safariga bog‘langan hamroh', 'Mustaqil kontingent emas; principal safarga bog‘langan rol/asos.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-01', 'D-02'], owner: 'Agentlik + Transport vazirligi', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { profile_codes: ['C08'], independent_contingent: false }, version: 1 }),
      technical('CHERNOBYL_DISABLED_RAIL', 'Chernobil sababli nogironlik · rail-only yordamchi scope', 'C07 bilan avtomatik tenglashtirilmaydi; 4-ilova 152-band scope’i va owneri tasdiqlanishi kerak.', { legalBasis: 'VMQ-440 · 4-ilova', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-06', gateIds: ['D-01', 'D-06'], owner: 'Agentlik + Transport vazirligi + temir yo‘l', sourceRevision: 'VMQ-440-spec@2026-08-24', version: 1 }),
    ],
  },
  {
    id: 'source-ownership-rules',
    code: 'source_ownership_rules',
    title: 'Manba ownership qoidalari',
    description: 'Toifa × atribut × manba × hujjat × vakolat kesimidagi authoritative ownership matritsasi.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Qaror olti manba idorani ko‘rsatadi, ammo har bir atributning master egasini to‘liq ajratmaydi. D-01 yopilmaguncha matritsa ishlatilmaydi.',
    entries: [
      technical('OWNERSHIP_MATRIX_PENDING_D01', 'Source ownership matritsasi kutilmoqda', 'Har bir profil va atribut uchun bitta authoritative owner, precedence va konflikt siyosati tasdiqlanishi kerak.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + 6 manba idora', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { dimensions: ['profile_code', 'legal_basis_code', 'attribute_code', 'source_org_code', 'document_type_code', 'authority_role'], required_fields: ['master_role', 'priority', 'conflict_policy', 'freshness_limit', 'allowed_event_types'] }, version: 1 }),
    ],
  },
  {
    id: 'entitlement-cycle-rules',
    code: 'entitlement_cycle_rules',
    title: 'Huquq sikli va limit qoidalari',
    description: 'Yillik, ikki yillik, C11 va hamroh limitlarini ledgerga uzatuvchi effective-dated konfiguratsiya.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Sikl chegarasi, mixed-mode, cross-year va “ikki marta” birligi D-02/D-05 bilan tasdiqlanadi.',
    entries: [
      technical('ANNUAL_OUTBOUND_RETURN', 'Bir kalendar yili · borish va qaytish', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', owner: 'Agentlik + Transport vazirligi', attributes: { period_unit: 'CALENDAR_YEAR', outbound_units: 1, return_units: 1, mixed_mode: 'PENDING_D02' }, version: 1 }),
      technical('BIENNIAL_50_TO_100_CONVERSION', 'Ikki yillik 50% → 100% konversiya', 'Oldingi va joriy yil foydalanish tarixi atomar tekshiriladi.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', gateIds: ['D-02', 'D-05'], owner: 'Agentlik + tarix registri egalari', attributes: { period_years: 2, source_discount_percent: 50, target_discount_percent: 100, history_required: true }, version: 1 }),
      technical('C11_TWO_TIMES', 'C11 · yiliga “ikki marta”', '“Marta” leg, bir tomonlama chipta yoki round-trip ekanligi tasdiqlanmagan.', { legalBasis: 'VMQ-440; PF-34', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', owner: 'Agentlik + Transport vazirligi + yuridik ekspertiza', attributes: { period_unit: 'CALENDAR_YEAR', units: 2, unit_definition: 'PENDING_D02' }, version: 1 }),
      technical('COMPANION_PRINCIPAL_BOUND', 'Hamroh principal safariga bog‘langan', 'Mustaqil quota emas; principal journey/service/date/leg bilan bog‘lanadi.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-02', owner: 'Agentlik + Transport vazirligi', attributes: { independent_entitlement: false, maximum_companions: 1, biennial_conversion: 'DISABLED_PENDING_D02' }, version: 1 }),
    ],
  },
  {
    id: 'geography-scopes',
    code: 'geography_scopes',
    title: 'Geografik scope’lar',
    description: 'Policy va yo‘nalishni mamlakat/Bitim doirasi bilan solishtirish kodlari.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Bitim davlatlarining amaldagi ro‘yxati va source ownership tasdiqlanmagan; demo mamlakat yozuvi scope yaratmaydi.',
    entries: [
      normative('UZ_DOMESTIC_ONLY', 'Faqat O‘zbekiston ichidagi safar', 'Origin va destination O‘zbekiston hududida bo‘lishi kerak.', { legalBasis: 'VMQ-440 · 2-band “a”', effectiveFrom: '2026-10-01', owner: 'Agentlik + Transport vazirligi', attributes: { origin_country: 'UZ', destination_country: 'UZ', profile_codes: ['C11'] }, version: 1 }),
      technical('AGREEMENT_COUNTRIES', 'Bitim davlatlari doirasi', 'Effective-dated davlat a’zoligi authoritative katalogdan olinadi.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Vakolatli mamlakat/Bitim ma’lumotnomasi', attributes: { membership_catalog: 'agreement_country_memberships', membership_source: 'PENDING_D01' }, version: 1 }),
      technical('POLICY_SCOPE', 'Profilga bog‘liq geografik scope', 'Yakuniy profil × geography bog‘lanishi policy matritsasida tasdiqlanadi.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + Transport vazirligi', version: 1 }),
    ],
  },
  {
    id: 'fare-class-rules',
    code: 'fare_class_rules',
    title: 'Klass bo‘yicha qoplanadigan baza',
    description: 'Transport va klass kesimida bazaviy qoplanish hamda top-up xulqini ajratadi.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Klass katalogi bilan tarif formulasi alohida. Avtobus klasslari va hisob formulasi D-03 bilan tasdiqlanadi.',
    entries: [
      normative('AIR_ECONOMY_BASE', 'Havo · ekonom bazaviy klass', undefined, { legalBasis: 'VMQ-440 · Nizom 12-band', effectiveFrom: '2026-10-01', attributes: { transport_mode: 'AIR', fare_class_code: 'ECONOMY', allowed: true, base_eligible: true }, version: 1 }),
      normative('RAIL_ECONOMY_BASE', 'Temir yo‘l · ekonom bazaviy klass', undefined, { legalBasis: 'VMQ-440 · Nizom 12-band', effectiveFrom: '2026-10-01', attributes: { transport_mode: 'RAIL', fare_class_code: 'ECONOMY', allowed: true, base_eligible: true }, version: 1 }),
      normative('RAIL_PLATSKART_BASE', 'Temir yo‘l · platskart bazaviy klass', undefined, { legalBasis: 'VMQ-440 · Nizom 12-band', effectiveFrom: '2026-10-01', attributes: { transport_mode: 'RAIL', fare_class_code: 'PLATSKART', allowed: true, base_eligible: true }, version: 1 }),
      normative('RAIL_COUPE_BASE', 'Temir yo‘l · kupe bazaviy klass', undefined, { legalBasis: 'VMQ-440 · Nizom 12-band', effectiveFrom: '2026-10-01', attributes: { transport_mode: 'RAIL', fare_class_code: 'COUPE', allowed: true, base_eligible: true }, version: 1 }),
      normative('HIGHER_CLASS_TOPUP', 'Boshqa klass · tarif farqi fuqaro zimmasida', 'Top-up huquqi normativ; aniq qoplanadigan baza va komponentlar D-03 bilan tasdiqlanadi.', { legalBasis: 'VMQ-440 · Nizom 12-band', effectiveFrom: '2026-10-01', gateId: 'D-03', attributes: { base_eligible: false, passenger_pays_difference: true, calculation_rule: 'PENDING_D03' }, version: 1 }),
      technical('BUS_STANDARD_PENDING_D03', 'Avtobus · standart klass', 'MVP demo klassini production bazasiga aylantirish uchun tarif metodikasi kerak.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Transport vazirligi + tashuvchilar', attributes: { transport_mode: 'BUS', fare_class_code: 'STANDARD', base_eligible: 'PENDING_D03' }, version: 1 }),
    ],
  },
  {
    id: 'tariff-component-codes',
    code: 'tariff_component_codes',
    title: 'Tarif komponentlari',
    description: 'Amaldagi tarifdan qoplanadigan baza va fuqaro top-up’ini hisoblash komponentlari.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Qarorda komponentlar, soliq/yig‘imlar, rounding va kurs sanasi formula darajasida ochilmagan. Barchasi D-03 bilan bloklangan.',
    entries: [
      technical('BASE_TRANSPORT_FARE', 'Bazaviy tashish tarifi', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { inclusion: 'PENDING_D03' }, version: 1 }),
      technical('TAX_COMPONENTS', 'Soliq komponentlari', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { inclusion: 'PENDING_D03' }, version: 1 }),
      technical('SERVICE_FEES', 'Yig‘im va xizmat haqlari', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { inclusion: 'PENDING_D03' }, version: 1 }),
      technical('UPGRADE_SURCHARGE', 'Yuqori klass qo‘shimcha to‘lovi', 'Qoplash bazasidan tashqarida qoladigan fuqaro top-up’i.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { payer: 'PASSENGER', inclusion: false }, version: 1 }),
    ],
  },
  {
    id: 'return-policy-rules',
    code: 'return_policy_rules',
    title: 'Qaytarish va limitni tiklash qoidalari',
    description: 'Sabab, muddat, dalil, review va settlement ta’sirini versiyalangan qoida sifatida saqlaydi.',
    family: 'POLICIES',
    readOnly: true,
    warning: '“Bir hafta”ning kalendar/ish kuni talqini va settlement ta’siri D-03 bilan tasdiqlanadi; hech biri avtomatik production restore qilmaydi.',
    entries: [
      technical('VERIFIED_NONUSE_RESTORE_REVIEW', 'Tasdiqlangan nonuse · restore review', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Agentlik + Transport vazirligi', attributes: { reason_codes: ['TECHNICAL_NONUSE', 'NATURAL_NONUSE', 'OTHER_VERIFIED_NONUSE', 'CARRIER_CANCELLED'], deadline_value: 7, deadline_unit: 'DAY', deadline_basis: 'PENDING_D03', automatic_restore: false, required_evidence_codes: ['RETURN_EVIDENCE'] }, version: 1 }),
      technical('PASSENGER_REQUEST_NO_AUTO_RESTORE', 'Yo‘lovchi talabi · avtomatik restore yo‘q', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { reason_code: 'PASSENGER_REQUEST', automatic_restore: false, review_status: 'METHODOLOGY_PENDING' }, version: 1 }),
      technical('RETURN_DEADLINE_EXPIRED_DEEMED_PROVIDED', 'Muddat o‘tgan · deemed_provided', 'TRAVELLED bilan teng emas va claimabilityni avtomatik belgilamaydi.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { ticket_state: 'RETURN_DEADLINE_EXPIRED', ledger_state: 'CONSUMED', ledger_reason: 'DEEMED_PROVIDED', claimability: 'PENDING_D03' }, version: 1 }),
    ],
  },
  {
    id: 'identity-document-types',
    code: 'identity_document_types',
    title: 'Shaxsni tasdiqlovchi hujjatlar',
    description: 'Chipta rasmiylashtirish va safar vaqtida amal qilishi tekshiriladigan identity hujjat turlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Aniq issuer/source ownership authoritative_attribute_sources orqali D-01 bilan tasdiqlanadi.',
    entries: [
      normative('IDENTITY_DOCUMENT', 'Amaldagi shaxsni tasdiqlovchi hujjat', 'Hujjat chipta rasmiylashtirish va safar sanasida amal qilishi kerak.', { legalBasis: 'VMQ-440 · Nizom 5-band', effectiveFrom: '2026-10-01', owner: 'Vakolatli identity manbasi', gateId: 'D-01', attributes: { valid_at_issue_required: true, valid_at_travel_required: true }, version: 1 }),
      normative('YIDXP_DIGITAL_IDENTITY_DOCUMENT', 'YIDXP mobil ilovasidagi raqamli hujjat', 'Raqamli hujjat shaxsni tasdiqlash oqimida qabul qilinadi.', { legalBasis: 'VMQ-440 · Nizom 5-band', effectiveFrom: '2026-10-01', owner: 'Vakolatli identity manbasi', gateId: 'D-01', attributes: { digital: true }, version: 1 }),
      normative('RESIDENCE_PERMIT', 'O‘zbekistonda yashash guvohnomasi', 'Chet el fuqarosi yoki fuqaroligi bo‘lmagan shaxsning residency scope’i uchun.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', owner: 'Vakolatli residency manbasi', gateId: 'D-01', attributes: { residency_evidence: true }, version: 1 }),
    ],
  },
  {
    id: 'residency-statuses',
    code: 'residency_statuses',
    title: 'Fuqarolik va yashash maqomlari',
    description: 'Eligibilityda shaxs doirasini ortiqcha shaxsiy ma’lumotsiz baholash natijalari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      normative('UZ_CITIZEN', 'O‘zbekiston fuqarosi', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', attributes: { eligible_scope: true }, version: 1 }),
      normative('FOREIGN_RESIDENT_WITH_PERMIT', 'Yashash guvohnomasiga ega chet el fuqarosi', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', attributes: { eligible_scope: true, document_type_code: 'RESIDENCE_PERMIT' }, version: 1 }),
      normative('STATELESS_RESIDENT', 'O‘zbekistonda yashovchi fuqaroligi bo‘lmagan shaxs', undefined, { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', attributes: { eligible_scope: true, document_type_code: 'RESIDENCE_PERMIT' }, version: 1 }),
      normative('NON_RESIDENT', 'Talabga mos residency tasdiqlanmagan', 'Eligibility rad sababi authoritative manba natijasi bilan qaytariladi.', { legalBasis: 'VMQ-440', effectiveFrom: '2026-10-01', attributes: { eligible_scope: false, reason_code: 'RESIDENCY_NOT_ELIGIBLE' }, version: 1 }),
    ],
  },
  {
    id: 'authoritative-attribute-sources',
    code: 'authoritative_attribute_sources',
    title: 'Authoritative atribut manbalari',
    description: 'Identity, residency, hujjat amal muddati va nogironlik atributi uchun source/freshness siyosati.',
    family: 'ORGANIZATIONS',
    readOnly: true,
    warning: 'YAMIHda nogironlik ma’lumoti yuritilishi normativ, lekin qolgan master-source va stale-data siyosati D-01 bilan tasdiqlanadi.',
    entries: [
      technical('PERSON_IDENTITY_SOURCE_PENDING', 'Shaxs identifikatsiyasi authoritative manbasi', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli identity registri', attributes: { attribute_codes: ['person_identity'], source_org_code: 'PENDING_D01', freshness_limit: 'PENDING_D01' }, version: 1 }),
      technical('RESIDENCY_SOURCE_PENDING', 'Fuqarolik/residency authoritative manbasi', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli residency registri', attributes: { attribute_codes: ['citizenship', 'residency_status'], source_org_code: 'PENDING_D01', freshness_limit: 'PENDING_D01' }, version: 1 }),
      technical('DOCUMENT_VALIDITY_SOURCE_PENDING', 'Hujjat amal muddati authoritative manbasi', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'Agentlik + vakolatli hujjat registri', attributes: { attribute_codes: ['document_status', 'valid_from', 'valid_to'], source_org_code: 'PENDING_D01' }, version: 1 }),
      technical('WAR_DISABILITY_YAMIH_STORAGE', 'Urush nogironligi ma’lumoti YAMIHda yuritiladi', 'Storage/verification konturi normativ; dastlabki master-source mappingi D-01 bilan ochiq.', { legalBasis: 'VMQ-440 · Nizom 8-band', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', owner: 'YAMIH + vakolatli manba idoralar', attributes: { attribute_codes: ['disability_group', 'war_disability_equivalence'], storage_system: 'YAMIH', source_org_code: 'PENDING_D01' }, version: 1 }),
    ],
  },
  {
    id: 'manual-verification-statuses',
    code: 'manual_verification_statuses',
    title: 'Manual verification holatlari',
    description: 'Hujjat fallback case’i, qaror va bir martalik authorization lifecycle kodlari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Reviewer vakolati, SLA va maker-checker D-04 bilan tasdiqlanmaguncha ushbu state-machine productionda yopiq.',
    entries: ['OPEN', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED', 'TOKEN_CONSUMED'].map((code) => technical(code, code, undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-04', owner: 'Agentlik + Transport vazirligi + tashuvchilar', version: 1 })),
  },
  {
    id: 'manual-verification-rules',
    code: 'manual_verification_rules',
    title: 'Manual verification qoidalari',
    description: 'Transport, hujjat, reviewer, SLA va token bindingini birlashtiruvchi effective-dated qoidalar.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Hujjatni qabul qilish huquqi operatorga mustaqil vaqtinchalik huquq yaratish vakolatini bermaydi. Barcha qoidalar D-04 bilan bloklangan.',
    entries: [
      technical('RAIL_DOCUMENT_FALLBACK', 'Temir yo‘l uchun hujjat fallbacki', undefined, { legalBasis: 'VMQ-440 · 4-ilova', effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-04', owner: 'Agentlik + Transport vazirligi + temir yo‘l', attributes: { transport_mode: 'RAIL', document_type_codes: ['RAIL_WAR_DISABLED_CERT', 'RAIL_WAR_PARTICIPANT_CERT', 'RAIL_BENEFIT_RIGHT_CERT'], reviewer_org_code: 'PENDING_D04', reviewer_role: 'CASE_REVIEWER', sla: 'PENDING_D04', one_time_token: true }, version: 1 }),
      technical('AIR_DOCUMENT_FALLBACK', 'Havo transporti uchun hujjat fallbacki', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-04', owner: 'Agentlik + Transport vazirligi + aviakompaniyalar', attributes: { transport_mode: 'AIR', document_type_codes: ['PENDING_D04'], reviewer_org_code: 'PENDING_D04', sla: 'PENDING_D04' }, version: 1 }),
      technical('BUS_DOCUMENT_FALLBACK', 'Avtobus uchun hujjat fallbacki', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-04', owner: 'Agentlik + Transport vazirligi + avtobus tashuvchilar', attributes: { transport_mode: 'BUS', document_type_codes: ['PENDING_D04'], reviewer_org_code: 'PENDING_D04', sla: 'PENDING_D04' }, version: 1 }),
    ],
  },
  {
    id: 'authorized-service-points',
    code: 'authorized_service_points',
    title: 'Vakolatli filial, kassa va kanallar',
    description: 'Carrier, filial/kassa, transport turi va ruxsat etilgan operatsiyalarni effective-dated bog‘laydi.',
    family: 'ORGANIZATIONS',
    readOnly: true,
    warning: 'MVPda real service-point registri berilmagan. Production yozuvlari Transport vazirligi/tashuvchi manbasidan onboarding va sertifikatsiya bilan olinadi.',
    entries: [
      technical('SERVICE_POINT_DATA_PENDING', 'Vakolatli service-point ma’lumotlari kutilmoqda', undefined, { effectiveFrom: '2026-10-01', status: 'DRAFT', owner: 'Transport vazirligi + tashuvchilar', attributes: { required_fields: ['carrier_code', 'branch_code', 'cash_desk_code', 'transport_modes', 'allowed_operations', 'organization_status', 'effective_from', 'effective_to'], allowed_operations: ['ELIGIBILITY', 'ISSUE', 'RETURN', 'SETTLEMENT'] }, version: 1 }),
    ],
  },
  {
    id: 'business-calendar',
    code: 'business_calendar',
    title: 'Ish kunlari kalendari',
    description: 'To‘lovning 10 ish kunlik SLA’sini authoritative, versiyalangan sana yozuvlari bilan hisoblaydi.',
    family: 'POLICIES',
    readOnly: true,
    warning: 'Kunlar ro‘yxati va authoritative source hali ulanmagan. Registry due day bilan payment SLA boshlanish eventi aralashtirilmaydi.',
    entries: [
      technical('UZ_2026_BUSINESS_CALENDAR', 'O‘zbekiston · 2026 ish kunlari kalendari', 'Har bir sana alohida is_business_day va source revision bilan sinxronlanishi kerak.', { effectiveFrom: '2026-01-01', effectiveTo: '2026-12-31', status: 'DRAFT', owner: 'Vakolatli davlat kalendari manbasi', sourceRevision: 'PENDING_SOURCE_SYNC', attributes: { timezone: 'Asia/Tashkent', daily_entries_loaded: false, required_fields: ['date', 'is_business_day', 'holiday_code', 'source_revision'] }, version: 1 }),
      normative('PAYMENT_SLA_10_WORKDAYS', 'Hujjatlar taqdim etilgach 10 ish kuni', 'SLA reyestr deadline’dan emas, rasmiy hujjatlar taqdim etilgan vaqtdan boshlanadi.', { legalBasis: 'VMQ-440 · Nizom 18-band', effectiveFrom: '2026-10-01', gateId: 'D-03', attributes: { duration: 10, unit: 'BUSINESS_DAY', start_event: 'DOCUMENTS_FORMALLY_SUBMITTED', calendar_code: 'UZ_2026_BUSINESS_CALENDAR', start_event_definition: 'PENDING_D03' }, version: 1 }),
    ],
  },
  {
    id: 'claim-validation-codes',
    code: 'claim_validation_codes',
    title: 'Claim qatori validatsiya kodlari',
    description: 'Claimga kiruvchi chipta qatoridagi xatoni blocking/severity/remediation bilan klassifikatsiya qiladi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Aniq blocking natija va qisman qabul qilish siyosati D-03 bilan tasdiqlanadi.',
    entries: [
      ['DUPLICATE_LINE', 'Takroriy claim qatori'],
      ['RETURNED_TICKET', 'Qaytarilgan chipta'],
      ['NO_SHOW_OR_DEEMED_PROVIDED', 'No-show yoki deemed-provided'],
      ['FARE_CLASS_NOT_ALLOWED', 'Ruxsat etilmagan chipta klassi'],
      ['BENEFIT_MISMATCH', 'Benefit/policy snapshot mos emas'],
      ['EVIDENCE_MISSING', 'Majburiy dalil yetishmaydi'],
      ['FARE_REFERENCE_MISMATCH', 'Tarif reference bilan mos emas'],
      ['CARRIER_INACTIVE', 'Tashuvchi claim davrida faol emas'],
      ['PAYEE_NOT_EFFECTIVE', 'Payee/bank rekviziti claim davrida faol emas'],
    ].map(([code, name]) => technical(code!, name!, undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Agentlik + Transport vazirligi + Iqtisodiyot va moliya vakillari', attributes: { severity: 'PENDING_D03', blocking: 'PENDING_D03', remediation: 'PENDING_D03' }, version: 1 })),
  },
  {
    id: 'settlement-exception-codes',
    code: 'settlement_exception_codes',
    title: 'Settlement istisno kodlari',
    description: 'Validatsiyadan o‘tmagan yoki reconciliation talab qiluvchi qator/case sabablari.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('SETTLEMENT_DUPLICATE', 'Takroriy ticket/claim qatori', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { blocking: true }, version: 1 }),
      technical('SETTLEMENT_EVIDENCE_MISSING', 'Tasdiqlangan settlement_basis dalili yo‘q', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { blocking: true, api_reason_code: 'SETTLEMENT_EVIDENCE_MISSING' }, version: 1 }),
      technical('SETTLEMENT_WRONG_FARE_CLASS', 'Klass qoplanadigan bazaga mos emas', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { blocking: 'PENDING_D03' }, version: 1 }),
      technical('SETTLEMENT_RETURNED_OR_VOID', 'Qaytarilgan yoki void qilingan chipta', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { blocking: 'PENDING_D03' }, version: 1 }),
      technical('SETTLEMENT_PAYMENT_CHANNEL_DUPLICATE', 'Oylik va real-time kanalda takroriy qoplash', undefined, { effectiveFrom: '2027-01-01', status: 'OPEN_DECISION', gateId: 'D-07', attributes: { blocking: true, api_reason_code: 'PAYMENT_ALREADY_PROCESSED' }, version: 1 }),
    ],
  },
  {
    id: 'finance-handoff-statuses',
    code: 'finance_handoff_statuses',
    title: 'Moliya ATiga uzatish holatlari',
    description: 'Claim state va payment state orasidagi idempotent handoff lifecycle’i.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Tegishli moliya ATi, callback protokoli va external status mapping tasdiqlanmagan; barcha holatlar D-03 bilan bloklangan.',
    entries: ['NOT_READY', 'CREATED', 'QUEUED', 'SUBMITTED', 'ACKNOWLEDGED', 'REJECTED', 'RETRYING']
      .map((code) => technical(code, code, undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', owner: 'Agentlik + Iqtisodiyot va moliya vakillari', attributes: { external_status_mapping: 'PENDING_D03', terminal: ['ACKNOWLEDGED', 'REJECTED'].includes(code) }, version: 1 })),
  },
  {
    id: 'right-statuses',
    code: 'right_statuses',
    title: 'Huquq holatlari',
    description: 'Huquqning faolligi limit va chipta state’laridan alohida yuritiladi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: [
      technical('PENDING_VERIFICATION', 'Tekshiruv kutilmoqda', undefined, { effectiveFrom: '2026-10-01', version: 1 }),
      technical('ACTIVE', 'Faol huquq', 'Limit mavjudligini anglatmaydi.', { effectiveFrom: '2026-10-01', version: 1 }),
      technical('REVOKED', 'Bekor qilingan huquq', undefined, { effectiveFrom: '2026-10-01', version: 1 }),
      technical('EXPIRED', 'Amal muddati tugagan huquq', undefined, { effectiveFrom: '2026-10-01', version: 1 }),
      technical('SUSPENDED', 'Vaqtincha to‘xtatilgan huquq', 'Vakolat, sabab va mavjud chipta oqibati rasmiy tasdiqlanmaguncha ishlatilmaydi.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-01', version: 1 }),
    ],
  },
  {
    id: 'api-reason-codes',
    code: 'api_reason_codes',
    title: 'API biznes sabab kodlari',
    description: 'Eligibility, rezerv, chipta, settlement va payment javoblaridagi kanonik machine-readable sabablar.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    entries: Object.entries({
      PERSON_NOT_FOUND: 'Shaxs aniqlanmadi',
      RIGHT_NOT_FOUND_IN_YAMIH: 'YAMIHda huquq topilmadi; hujjat fallbacki mumkin',
      RIGHT_NOT_ACTIVE: 'Huquq safar sanasida faol emas',
      POLICY_NOT_EFFECTIVE: 'Qoida rasmiylashtirish yoki safar sanasida kuchga kirmagan',
      DATA_STALE: 'Authoritative ma’lumot ruxsat etilgan freshness chegarasidan eski',
      UPSTREAM_UNAVAILABLE: 'Majburiy manba yoki platforma vaqtincha mavjud emas',
      DOCUMENT_EXPIRED: 'Hujjat rasmiylashtirish yoki safar vaqtida amal qilmaydi',
      RESIDENCY_NOT_ELIGIBLE: 'Fuqarolik/yashash maqomi talabga mos emas',
      TRANSPORT_NOT_ALLOWED: 'Profil uchun transport turi ruxsat etilmagan',
      TERRITORY_NOT_ALLOWED: 'Yo‘nalish huquq hududidan tashqarida',
      FARE_CLASS_NOT_ALLOWED: 'Klass qoplanadigan klassga kirmaydi',
      ENTITLEMENT_EXHAUSTED: 'Yillik yoki biennial limit sarflangan',
      BIENNIAL_CONVERSION_NOT_AVAILABLE: 'Ikki yillik bepul konversiya shartlari bajarilmagan',
      COMPANION_NOT_LINKED: 'Hamroh principal benefitsiar yoki safarga bog‘lanmagan',
      REPRESENTATIVE_AUTHORITY_INVALID: 'Qonuniy vakil vakolati topilmadi, tugagan yoki yetarli emas',
      RESERVATION_CONFLICT: 'Huquq boshqa tashuvchi tomonidan band qilingan',
      RESERVATION_EXPIRED: 'Rezerv TTL tugagan',
      DUPLICATE_TICKET: 'Chipta yoki event avval qayd qilingan',
      RETURN_DEADLINE_EXPIRED: 'Belgilangan qaytarish muddati o‘tgan',
      SETTLEMENT_EVIDENCE_MISSING: 'Settlement uchun zarur hujjat yoki dalil yo‘q',
      SETTLEMENT_PERIOD_CLOSED: 'Yopilgan oyga to‘g‘ridan-to‘g‘ri o‘zgartirish mumkin emas',
      PAYMENT_ALREADY_PROCESSED: 'Tranzaksiya oldin qoplangan',
    }).map(([code, name]) => technical(code, name, undefined, { effectiveFrom: '2026-10-01', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { retryable: ['DATA_STALE', 'UPSTREAM_UNAVAILABLE', 'RESERVATION_CONFLICT'].includes(code), http_status: 'CONTRACT_MAPPING_REQUIRED' }, version: 1 })),
  },
  {
    id: 'integration-role-scopes',
    code: 'integration_role_scopes',
    title: 'Integratsiya rol va scope’lari',
    description: 'Tashkilot, rol va maqsad bo‘yicha RBAC+ABAC uchun boshlang‘ich texnik katalog.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Bu rollar tavsiya etilgan bootstrap kodlar; IAM, permission va organization-claim matritsasi tasdiqlanmaguncha DRAFT.',
    entries: [
      ['SOURCE_PUBLISHER', 'O‘z tashkiloti vakolatidagi huquq eventlari', ['CONTINGENT_EVENT_WRITE']],
      ['CARRIER_ELIGIBILITY', 'Individual eligibility/check-and-reserve', ['ELIGIBILITY_CHECK', 'RESERVATION_CREATE']],
      ['CARRIER_ISSUER', 'O‘z tashkiloti chipta eventlari', ['TICKET_EVENT_WRITE']],
      ['CARRIER_FINANCE', 'O‘z tashkiloti oylik reyestri', ['SETTLEMENT_WRITE', 'CLAIM_VIEW']],
      ['AGENCY_REGISTRY_OPERATOR', 'Kontingent konflikti va case ko‘rish', ['REGISTRY_REVIEW']],
      ['AGENCY_FINANCE_CHECKER', 'Claim qatorlarini tekshirish', ['CLAIM_CHECK']],
      ['AGENCY_FINANCE_APPROVER', 'Tasdiqlangan claimni to‘lovga yuborish', ['PAYMENT_SUBMIT']],
      ['CASE_REVIEWER', 'Hujjat fallbacki va tafovut qarori', ['MANUAL_CASE_DECIDE', 'RETURN_REVIEW_DECIDE']],
      ['SOCIAL_INSPECTOR', 'Nizom ijrosi bo‘yicha read-only', ['AUDIT_READ']],
      ['FINANCIAL_INSPECTOR', 'Budjet asoslanganligi bo‘yicha read-only', ['FINANCE_AUDIT_READ']],
    ].map(([code, name, scopes]) => technical(code as string, name as string, undefined, { effectiveFrom: '2026-10-01', status: 'DRAFT', owner: 'Agentlik IAM egasi', sourceRevision: 'VMQ-440-spec@2026-08-24', attributes: { scopes: scopes as string[], organization_claim_required: true, purpose_bound: true }, version: 1 })),
  },
  {
    id: 'attachment-types',
    code: 'attachment_types',
    title: 'Ilova va himoyalangan fayl turlari',
    description: 'Owner object, storage reference, hash, signature va retention talablarini klassifikatsiya qiladi.',
    family: 'SYSTEM_CODES',
    readOnly: true,
    warning: 'Retention muddati va qo‘shimcha transport-spetsifik dalillar D-03/xavfsizlik reglamenti bilan tasdiqlanadi.',
    entries: [
      normative('TICKET_COPY', 'Chipta nusxasi', undefined, { legalBasis: 'VMQ-440 · Nizom 17-band', effectiveFrom: '2026-10-01', attributes: { owner_object: 'claim_line', hash_required: true, retention_class: 'PENDING_SECURITY_POLICY', settlement_applicability: 'PENDING_D03' }, version: 1 }),
      normative('ROUTE_SHEET', 'Yo‘nalish qaydnomasi', undefined, { legalBasis: 'VMQ-440 · Nizom 17-band', effectiveFrom: '2026-10-01', attributes: { owner_object: 'claim_line', hash_required: true, retention_class: 'PENDING_SECURITY_POLICY', settlement_applicability: 'PENDING_D03' }, version: 1 }),
      technical('TARIFF_EVIDENCE', 'Tarif dalili', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { owner_object: 'ticket_or_claim_line', hash_required: true }, version: 1 }),
      technical('RETURN_EVIDENCE', 'Qaytarish/nonuse dalili', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { owner_object: 'ticket_event', hash_required: true }, version: 1 }),
      technical('MANUAL_DOCUMENT_REFERENCE', 'Manual verification hujjati reference’i', 'Hujjatning o‘zi emas, himoyalangan storage reference va hash saqlanadi.', { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-04', attributes: { owner_object: 'manual_verification_case', hash_required: true, sensitive: true }, version: 1 }),
      technical('CLAIM_SIGNATURE', 'Claim ERI/electronic signature dalili', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { owner_object: 'claim_revision', signature_required: true }, version: 1 }),
      technical('PAYMENT_ORDER', 'To‘lov topshirig‘i dalili', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { owner_object: 'payment', hash_required: true }, version: 1 }),
      technical('BANK_CONFIRMATION', 'Bank natijasi/reconciliation dalili', undefined, { effectiveFrom: '2026-10-01', status: 'OPEN_DECISION', gateId: 'D-03', attributes: { owner_object: 'payment_or_reconciliation_case', hash_required: true }, version: 1 }),
    ],
  },
]

export function getReferenceCatalog(code: string) {
  return referenceCatalogs.find((catalog) => catalog.code === code)
}

export function getExecutableReferenceEntries(validAsOf: string, catalogCode?: string, knownAt = new Date().toISOString()): ReferenceEntry[] {
  const effectiveDate = validAsOf.slice(0, 10)
  const knownTimestamp = Date.parse(knownAt)
  const catalogs = catalogCode
    ? referenceCatalogs.filter((catalog) => catalog.code === catalogCode)
    : referenceCatalogs

  return catalogs.flatMap((catalog) => catalog.entries.filter((entry) => {
    if (entry.status !== 'ACTIVE' || entry.approvalStatus !== 'APPROVED') return false
    const gateIds = entry.gateIds ?? (entry.gateId ? [entry.gateId] : [])
    // Browser-side callers cannot close a legal decision gate. Production uses
    // the signed server-side gate registry and returns only executable revisions.
    if (gateIds.length > 0) return false
    if (entry.effectiveFrom && entry.effectiveFrom > effectiveDate) return false
    if (entry.effectiveTo && entry.effectiveTo < effectiveDate) return false
    if (entry.recordedFrom && Date.parse(entry.recordedFrom) > knownTimestamp) return false
    if (entry.recordedTo && Date.parse(entry.recordedTo) <= knownTimestamp) return false
    return true
  }))
}

// These options only feed the browser prototype. Production UI must consume
// getExecutableReferenceEntries(validAsOf, catalogCode, knownAt) from the backend
// API. Legal gates are resolved only by the signed server-side gate registry.
const prototypeOptionEntries = (catalogCode: string) => getReferenceCatalog(catalogCode)?.entries ?? []

function referenceAttributeString(attributes: ReferenceEntry['attributes'], key: string) {
  const value = attributes?.[key]
  return typeof value === 'string' ? value : undefined
}

function referenceAttributeStringList(attributes: ReferenceEntry['attributes'], key: string) {
  const value = attributes?.[key]
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  return typeof value === 'string' ? value.split(',').map((item) => item.trim()).filter(Boolean) : []
}

function referenceAttributeBoolean(attributes: ReferenceEntry['attributes'], key: string) {
  const value = attributes?.[key]
  return value === true || value === 'true'
}

export const sourceOrganizationOptions = prototypeOptionEntries('source_organizations').map(({ code, name }) => ({ code, label: name }))
export const transportModeOptions = prototypeOptionEntries('transport_modes').map(({ code, name }) => ({ code, label: name }))
export const fareClassOptions = prototypeOptionEntries('fare_classes').map(({ code, name, attributes }) => ({
  code,
  label: name,
  transportModes: referenceAttributeStringList(attributes, 'transport_modes'),
  baseEligible: referenceAttributeBoolean(attributes, 'base_eligible'),
}))
export const countryOptions = prototypeOptionEntries('countries').map(({ code, name, status }) => ({ code, label: name, status }))
export const carrierOptions = prototypeOptionEntries('carriers').map(({ code, name, attributes }) => ({ code, label: name, transportMode: referenceAttributeString(attributes, 'transport_mode'), inn: referenceAttributeString(attributes, 'inn') }))
export const applicantRoleOptions = prototypeOptionEntries('applicant_roles').map(({ code, name }) => ({ code, label: name }))
export const legTypeOptions = prototypeOptionEntries('leg_types').map(({ code, name }) => ({ code, label: name }))
export const contingentEventTypeOptions = prototypeOptionEntries('contingent_event_types').map(({ code, name }) => ({ code, label: name }))
export const ticketEventTypeOptions = prototypeOptionEntries('ticket_event_types').map(({ code, name }) => ({ code, label: name }))
export const returnReasonOptions = prototypeOptionEntries('return_reasons').map(({ code, name }) => ({ code, label: name }))
export const disabilityEquivalenceOptions = prototypeOptionEntries('disability_equivalence_bases').map(({ code, name }) => ({ code, label: `${code} · ${name}` }))
export const participantEquivalenceOptions = prototypeOptionEntries('participant_equivalence_bases').map(({ code, name }) => ({ code, label: `${code} · ${name}` }))
export const benefitProfileOptions = prototypeOptionEntries('benefit_profiles')
  .filter(({ code }) => code !== 'C08')
  .map(({ code, name }) => ({ code, label: `${code} · ${name}` }))
