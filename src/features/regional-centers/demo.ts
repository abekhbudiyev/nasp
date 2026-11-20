import { referralLabels, relativeDate, today } from './model'
import type { CenterState, PersonProfile, Referral, ReferralStatus, ServiceId } from './model'

export function createDemoData(): CenterState {
  const date = today()
  const previous = relativeDate(date, -6)
  const future = relativeDate(date, 25)
  const referrals: Referral[] = [
    ['r1', 'p1', 'NAM-101', 'Andijon shahri', 'Andijon shahar «Inson»', 'active'],
    ['r2', 'p2', 'NAM-102', 'Shahrixon tumani', 'Shahrixon tuman «Inson»', 'active'],
    ['r3', 'p2', 'NAM-103', 'Andijon shahri', 'Andijon shahar «Inson»', 'referred'],
    ['r4', 'p2', 'NAM-104', 'Asaka tumani', 'Asaka tuman «Inson»', 'queued'],
    ['r5', 'p3', 'NAM-105', 'Yunusobod tumani', 'Yunusobod tuman «Inson»', 'active'],
    ['r6', 'p4', 'NAM-106', 'Shayxontohur tumani', 'Shayxontohur tuman «Inson»', 'new'],
    ['r7', 'p1', 'NAM-107', 'Andijon shahri', 'Andijon shahar «Inson»', 'closed'],
    ['r8', 'p5', 'NAM-108', 'Shayxontohur tumani', 'Shayxontohur tuman «Inson»', 'new'],
  ].map(([id, placementId, beneficiary, residence, issuer, value], index) => {
    const status = value as ReferralStatus
    const created = relativeDate(date, -15 + index)
    const plan = status === 'active' || status === 'closed'
      ? { goal: 'Kundalik faoliyat ko‘nikmalarini mustahkamlash', specialist: 'Demo mutaxassis', reviewDate: status === 'closed' ? previous : future, outcome: status === 'closed' ? 'Rejadagi maqsadga erishildi' : undefined }
      : undefined
    const history = [{ date: created, label: 'Murojaat qayd etildi' }]
    if (status !== 'new') history.push({ date: relativeDate(created, 1), label: referralLabels[status] })
    return { id: id!, placementId: placementId!, beneficiary: beneficiary!, residence: residence!, issuer: issuer!, voucherRef: `NAM-VAU-${index + 1}`,
      channel: 'Inson markazi', funding: 'preferential', reference: `DEMO-Y-${index + 1}`, created, status, plan, history }
  })
  const data: CenterState = {
    centers: [
      { id: 'andijon', name: 'Andijon shahar hududiy markazi', region: 'Andijon viloyati', address: 'Andijon shahri', director: 'Demo mas’ul', status: 'active', code: 'DEMO-AND-01', district: 'Andijon shahri', hours: 'Du–Sh · 08:00–18:00', document: 'DEMO-01-son qaror' },
      { id: 'shayxontohur', name: 'Shayxontohur hududiy markazi', region: 'Toshkent shahri', address: 'Shayxontohur tumani', director: 'Demo mas’ul', status: 'active', code: 'DEMO-TSH-01', district: 'Shayxontohur tumani', hours: 'Du–Ju · 09:00–17:00', document: 'DEMO-02-son qaror' },
    ],
    staff: [
      { id: 'st1', centerId: 'andijon', name: 'Demo mutaxassis A', position: 'Dasturlarni muvofiqlashtiruvchi', qualification: 'DEMO-MA-01', validUntil: future, active: true },
      { id: 'st2', centerId: 'shayxontohur', name: 'Demo mutaxassis B', position: 'Reabilitatsiya mutaxassisi', qualification: 'DEMO-MA-02', validUntil: future, active: true },
    ],
    rooms: [
      { id: 'x1', centerId: 'andijon', name: 'Rivojlantirish xonasi', accessible: true, equipment: 'Sensor to‘plam, yumshoq gilam va moslashtiriladigan stol', code: '101', floor: '1', area: 32.5, notes: 'Individual mashg‘ulot uchun ajratilgan zona mavjud.' },
      { id: 'x2', centerId: 'andijon', name: 'Kunduzgi parvarish guruhi', accessible: true, equipment: 'Dam olish zonasi va parvarish jihozlari', code: '102', floor: '1', area: 39 },
      { id: 'x3', centerId: 'shayxontohur', name: 'Reabilitatsiya xonasi', accessible: true, equipment: 'Davolovchi jismoniy tarbiya jihozlari', code: '103', floor: '1', area: 48 },
      { id: 'x4', centerId: 'shayxontohur', name: 'Kunduzgi qatnov xonasi', accessible: true, equipment: 'Harakatlanishga yordam vositalari', code: '104', floor: '1', area: 44 },
      { id: 'x5', centerId: 'shayxontohur', name: 'Oilaviy maslahat xonasi', accessible: true, equipment: 'Suhbat zonasi', code: '203', floor: '2', area: 21.5 },
      { id: 'x6', centerId: 'andijon', name: 'Zaxira mashg‘ulot xonasi', accessible: true, equipment: 'Moslashtiriladigan mebel', code: '103', floor: '1', area: 28 },
    ],
    placements: [
      { id: 'p1', roomId: 'x1', serviceId: 'early', capacity: 8, schedule: 'Du–Sh · 08:00–18:00', operator: 'partner', providerId: 'n1', staffId: 'st1', sourceRef: 'DEMO-CHH-101' },
      { id: 'p2', roomId: 'x2', serviceId: 'daycare', capacity: 2, schedule: 'Du–Ju · 08:00–17:00', operator: 'partner', providerId: 'n2', staffId: 'st1', sourceRef: 'DEMO-CDC-102' },
      { id: 'p3', roomId: 'x3', serviceId: 'adult-rehab', capacity: 10, schedule: 'Du–Ju · 09:00–17:00', operator: 'center', staffId: 'st2', sourceRef: 'DEMO-OH-103' },
      { id: 'p4', roomId: 'x4', serviceId: 'adult-day', capacity: 8, schedule: 'Du–Ju · 09:00–17:00', operator: 'center' },
      { id: 'p5', roomId: 'x5', serviceId: 'family', capacity: 4, schedule: 'Du–Ju · 10:00–16:00', operator: 'center' },
      { id: 'p6', roomId: 'x6', serviceId: 'child-rehab', capacity: 6, schedule: 'Du–Ju · 09:00–17:00', operator: 'partner' },
    ],
    providers: [
      { id: 'n1', placementId: 'p1', name: 'Rivojlanish markazi · demo', qualificationRef: 'EA-DEMO-101', submitted: relativeDate(date, -65), status: 'registered', decision: 'DEMO-Q-1', lease: { number: 'DEMO-IJ-01', from: relativeDate(date, -60), to: relativeDate(date, 305), started: relativeDate(date, -52) } },
      { id: 'n2', placementId: 'p2', name: 'G‘amxo‘rlik xizmati · demo', qualificationRef: 'DXSH-DEMO-52', submitted: relativeDate(date, -95), status: 'registered', decision: 'DEMO-Q-2', lease: { number: 'DEMO-IJ-02', from: relativeDate(date, -90), to: relativeDate(date, 275), started: relativeDate(date, -82) } },
      { id: 'n3', placementId: 'p6', name: 'Bolalar reabilitatsiyasi · demo', qualificationRef: 'AB-DEMO-03', submitted: previous, status: 'new' },
    ],
    referrals,
    passports: [],
    visits: [
      { id: 'v1', referralId: 'r1', date: previous, minutes: 120, evidence: 'EA-DEMO-T-01', verification: 'face-id' },
      { id: 'v2', referralId: 'r2', date: previous, minutes: 480, evidence: 'KP-DEMO-T-02', verification: 'face-id' },
      { id: 'v3', referralId: 'r5', date: relativeDate(date, -2), minutes: 120, evidence: 'OH-DEMO-T-03', verification: 'face-id' },
    ],
    findings: [
      { id: 's1', placementId: 'p2', date: previous, kind: 'inspection', note: 'Jihoz inventarini yangilash', due: relativeDate(date, -1), status: 'open' },
      { id: 's2', placementId: 'p1', date: previous, kind: 'feedback', note: 'Mashg‘ulot jadvali qulay', due: '', status: 'closed', score: 5 },
      { id: 's3', placementId: 'p3', date: previous, kind: 'feedback', note: 'Xizmatdan qoniqish bahosi', due: '', status: 'closed', score: 4 },
    ],
    finance: [
      { id: 'f1', visitId: 'v1', kind: 'subsidy', amount: 110_000, reference: 'DEMO-S-01', status: 'confirmed' },
      { id: 'f2', visitId: 'v2', kind: 'subsidy', amount: 80_000, reference: 'DEMO-S-02', status: 'paid' },
      { id: 'f3', visitId: 'v3', kind: 'subsidy', amount: 105_000, reference: 'DEMO-S-03', status: 'calculated' },
    ],
  }
  addMonitoringExamples(data, date)
  data.people = demoPersonProfiles(data.referrals, date)
  return data
}

const demoNames = [
  'Aziza Soliyeva', 'Shahzod Tursunov', 'Madina Po‘latova', 'Sardor Umarov',
  'Gulbahor Salimova', 'Bahrom Sattorov', 'Yusuf Hamidov', 'Munisa Ergasheva',
]
const demoFirstNames = ['Ziyoda', 'Diyor', 'Shohrux', 'Nargiza', 'Otabek', 'Nodira', 'Nilufar', 'Javohir', 'Sevinch']
const demoSurnames = ['Rahimov', 'Sobirov', 'Jalolov', 'Murodov', 'Karimov']
const demoAges = [2, 9, 11, 13, 52, 66, 2, 40]

export function demoPersonProfiles(referrals: Referral[], date = today()): PersonProfile[] {
  const profiles = new Map<string, PersonProfile>()
  for (const item of referrals) {
    const sample = /^r[1-8]$/.test(item.id) && item.beneficiary === `NAM-${100 + Number(item.id.slice(1))}`
    const monitoringSample = /^(?:p[1-5]|(?:buxoro|samarqand)-[01])-mock-[0-4]$/.test(item.id)
      && /^NAM-2[0-9]{2}$/.test(item.beneficiary)
    if ((!sample && !monitoringSample) || profiles.has(item.beneficiary)) continue

    const number = Number(item.beneficiary.slice(4))
    const index = number - 101
    const age = sample ? demoAges[index]! : item.placementId === 'p1' ? 1 + number % 2
      : item.placementId === 'samarqand-0' ? 5 + number % 9 : 30 + number % 35
    const fullName = sample ? demoNames[index]! : `${demoFirstNames[number % demoFirstNames.length]} ${demoSurnames[number % demoSurnames.length]}`
    const year = (Number(item.created.slice(0, 4)) || Number(date.slice(0, 4))) - age
    profiles.set(item.beneficiary, {
      id: item.beneficiary, fullName, birthDate: `${year}-01-${String(1 + number % 20).padStart(2, '0')}`,
      residence: sample ? item.residence : undefined,
      identifierMasked: `••••••••••${String(number).padStart(4, '0')}`,
      phoneMasked: age >= 18 ? `+998 •• ••• •• ${String(number % 100).padStart(2, '0')}` : undefined,
      representative: age < 18 ? { fullName: 'Demo vakil', relationship: 'Ota-ona', phoneMasked: '+998 •• ••• •• 01' } : undefined,
    })
  }
  return [...profiles.values()]
}

function addMonitoringExamples(data: CenterState, date: string) {
  const since = relativeDate(date, -31)
  const sites = [
    { id: 'buxoro', region: 'Buxoro viloyati', address: 'Buxoro shahri', programs: ['adult-rehab', 'family'] },
    { id: 'samarqand', region: 'Samarqand viloyati', address: 'Samarqand shahri', programs: ['child-rehab', 'psychosocial'] },
  ] as const
  for (const site of sites) {
    data.centers.push({
      id: site.id, region: site.region, address: site.address, name: `${site.address} hududiy markazi`, director: 'Demo mas’ul', status: 'active',
    })
    site.programs.forEach((serviceId: ServiceId, index) => {
      const id = `${site.id}-${index}`
      data.rooms.push({ id, centerId: site.id, name: `${index + 1}-xizmat xonasi`, accessible: true, equipment: 'Mashg‘ulot jihozlari' })
      data.placements.push({ id, roomId: id, serviceId, capacity: 9 + index * 3, schedule: 'Du–Ju · 09:00–17:00', operator: 'center' })
    })
  }
  const live = data.placements.filter(item => item.id !== 'p6')
  live.forEach((placement, index) => {
    const voucher = placement.id === 'p2' ? 1 : 4 + index % 4
    const paid = placement.id === 'p2' ? 1 : 2 + index % 3
    if (placement.id !== 'samarqand-1') {
      data.passports.push({
        id: `demo-passport-${index}`, placementId: placement.id, voucher, paid, effectiveFrom: since,
        createdBy: 'Demo operator', approvedBy: 'Demo kurator', approvedAt: `${since}T09:00:00Z`,
      })
    }
    if (placement.id === 'p2') {
      data.visits.push({ id: 'demo-daycare-today', referralId: 'r2', date, minutes: 360, evidence: 'NAM-CDC-TODAY', verification: 'face-id', confirmedBy: 'representative' })
      return
    }
    const audience = placement.id === 'p5' ? 3 : 5
    for (let person = 0; person < audience; person++) {
      const id = `${placement.id}-mock-${person}`
      const beneficiary = `NAM-${200 + index * 10 + person}`
      const paidVisit = person >= Math.ceil(audience / 2)
      data.referrals.push({
        id, placementId: placement.id, beneficiary, residence: 'Demo hudud', issuer: paidVisit ? '' : 'Demo «Inson» markazi',
        channel: paidVisit ? 'Hududiy markaz' : 'Inson markazi', funding: paidVisit ? 'paid' : 'preferential', reserveSeat: !paidVisit,
        reference: `NAM-Y-${index}-${person}`, voucherRef: paidVisit ? undefined : `NAM-V-${index}-${person}`,
        created: since, status: 'active',
        plan: { goal: 'Kundalik faoliyat ko‘nikmalarini rivojlantirish', specialist: 'Demo mutaxassis', reviewDate: relativeDate(date, 12 + person) },
        history: [{ date: since, label: referralLabels.active }],
      })
      for (let offset = 0; offset < 30; offset++) {
        const frequency = offset < 14 ? 2 + offset % 3 : 1 + (offset + index) % 3
        if ((offset + person * 2 + index * 3) % 9 >= frequency) continue
        const day = relativeDate(date, -offset)
        const visitId = `visit-${id}-${offset}`
        data.visits.push({
          id: visitId, referralId: id, date: day, minutes: 60 + (index % 4) * 30, evidence: `NAM-T-${index}-${person}-${offset}`,
          verification: 'face-id', confirmedBy: person % 3 === 0 ? 'representative' : 'beneficiary',
          recordedBy: 'Demo operator', recordedAt: `${day}T05:30:00Z`,
        })
        if (offset % 3 === 0) data.finance.push({
          id: `finance-${visitId}`, visitId, kind: paidVisit ? 'income' : 'subsidy', amount: 70_000 + index * 8_000,
          reference: `NAM-M-${index}-${person}-${offset}`, status: offset > 4 ? 'paid' : offset === 0 ? 'calculated' : 'confirmed',
        })
      }
    }
    if (index > 2) data.findings.push({
      id: `demo-feedback-${index}`, placementId: placement.id, date: relativeDate(date, -(index % 4)),
      kind: 'feedback', status: 'closed', note: 'Demo qoniqish so‘rovi', score: index % 2 ? 5 : 4, due: '',
    })
  })
  const repeatConfirmation = data.visits.find(item => item.referralId === 'p1-mock-0' && item.date === date)
  if (repeatConfirmation) {
    data.visits.push({
      ...repeatConfirmation, id: 'demo-second-confirmation', evidence: 'NAM-T-EA-SECOND',
      minutes: 30, recordedAt: `${date}T06:30:00Z`,
    })
  }
}
