import type { Family } from './data'

export function familyNeeds(family: Family) {
  const needs: { key: string; text: string; service: string; agencies: { key: string; name: string }[] }[] = []
  const ihma = { key: 'ihma', name: 'Ijtimoiy himoya milliy agentligi' }
  if ((family.utilityDebtMonths ?? 0) >= 12) needs.push({ key: 'debt', text: 'Kommunal qarzdorlik: ' + family.utilityDebtMonths + ' oy', service: 'Kommunal qarzdorlik bo‘yicha yordam masalasini ko‘rib chiqish', agencies: [ihma] })
  if (family.hasDisabilityMember === true) needs.push({ key: 'disability', text: 'Oilada nogironligi bo‘lgan a’zo mavjud', service: 'Pensiya yoki nafaqa tayinlash masalasini ko‘rib chiqish', agencies: [ihma, { key: 'pension', name: 'Pensiya jamg‘armasi' }] })
  if (family.hasUnemployedMember === true) needs.push({ key: 'unemployment', text: 'Oilada ishsiz a’zo mavjud', service: 'Bandlikka ko‘maklashish va tegishli yordam masalasini ko‘rib chiqish', agencies: [{ key: 'employment', name: 'Bandlik vazirligi' }, { key: 'central-bank', name: 'Markaziy bank' }] })
  if (family.hasSocialRisk === true) needs.push({ key: 'risk', text: 'Ijtimoiy xavf qayd etilgan' + (family.socialRiskReason ? ': ' + family.socialRiskReason : ''), service: 'Ijtimoiy xavfni baholash va yordam masalasini ko‘rib chiqish', agencies: [] })
  return needs
}
