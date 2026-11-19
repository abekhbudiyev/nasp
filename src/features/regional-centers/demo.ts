import { referralLabels, relativeDate, today } from './model'
import type { CenterState, Referral, ReferralStatus } from './model'

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
    return { id: id!, placementId: placementId!, beneficiary: beneficiary!, residence: residence!, issuer: issuer!,
      channel: 'Inson markazi', funding: 'preferential', reference: `DEMO-Y-${index + 1}`, created, status, plan, history }
  })
  return {
    centers: [
      { id: 'andijon', name: 'Andijon shahar hududiy markazi', region: 'Andijon viloyati', address: 'Andijon shahri', director: 'Demo mas’ul', status: 'active' },
      { id: 'shayxontohur', name: 'Shayxontohur hududiy markazi', region: 'Toshkent shahri', address: 'Shayxontohur tumani', director: 'Demo mas’ul', status: 'active' },
    ],
    staff: [
      { id: 'st1', centerId: 'andijon', name: 'Demo mutaxassis A', position: 'Dasturlarni muvofiqlashtiruvchi', qualification: 'DEMO-MA-01', validUntil: future, active: true },
      { id: 'st2', centerId: 'shayxontohur', name: 'Demo mutaxassis B', position: 'Reabilitatsiya mutaxassisi', qualification: 'DEMO-MA-02', validUntil: future, active: true },
    ],
    rooms: [
      { id: 'x1', centerId: 'andijon', name: 'Rivojlantirish xonasi', accessible: true, equipment: 'Mashg‘ulot jihozlari' },
      { id: 'x2', centerId: 'andijon', name: 'Kunduzgi parvarish guruhi', accessible: true, equipment: 'Dam olish zonasi' },
      { id: 'x3', centerId: 'shayxontohur', name: 'Reabilitatsiya xonasi', accessible: true, equipment: 'Davolovchi jismoniy tarbiya jihozlari' },
      { id: 'x4', centerId: 'shayxontohur', name: 'Kunduzgi qatnov xonasi', accessible: true, equipment: 'Harakatlanishga yordam vositalari' },
      { id: 'x5', centerId: 'shayxontohur', name: 'Oilaviy maslahat xonasi', accessible: true, equipment: 'Suhbat zonasi' },
      { id: 'x6', centerId: 'andijon', name: 'Zaxira mashg‘ulot xonasi', accessible: true, equipment: 'Moslashtiriladigan mebel' },
    ],
    placements: [
      { id: 'p1', roomId: 'x1', serviceId: 'early', capacity: 8, schedule: 'Du–Sh · 08:00–18:00', operator: 'partner', providerId: 'n1' },
      { id: 'p2', roomId: 'x2', serviceId: 'daycare', capacity: 2, schedule: 'Du–Ju · 08:00–17:00', operator: 'partner', providerId: 'n2' },
      { id: 'p3', roomId: 'x3', serviceId: 'adult-rehab', capacity: 10, schedule: 'Du–Ju · 09:00–17:00', operator: 'center' },
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
    visits: [
      { id: 'v1', referralId: 'r1', date: previous, minutes: 120, evidence: 'EA-DEMO-T-01' },
      { id: 'v2', referralId: 'r2', date: previous, minutes: 480, evidence: 'KP-DEMO-T-02' },
      { id: 'v3', referralId: 'r5', date: relativeDate(date, -2), minutes: 120, evidence: 'OH-DEMO-T-03' },
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
}
