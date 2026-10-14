export type Role = 'initiator' | 'secretary' | 'council' | 'director' | 'center' | 'reviewer' | 'fund' | 'admin'
export const roles: { id: Role; title: string }[] = [
  { id: 'initiator', title: 'Loyiha tashabbuskori' }, { id: 'secretary', title: 'Kengash kotibi · BTRTR' },
  { id: 'council', title: 'Kengash · demo ovozlar' }, { id: 'director', title: 'Tasdiqlovchi rahbar' },
  { id: 'center', title: 'Axborot texnologiyalari markazi' }, { id: 'reviewer', title: 'BTRTR kelishuvchisi' },
  { id: 'fund', title: 'Jamg‘arma moliyalashtiruvchisi' },
  { id: 'admin', title: 'Boshqaruv administratori · demo' },
]
export const stages = [
  { id: 'draft', title: 'Tashabbus', owner: 'initiator', rule: '346: 2-band · yangi tahrir' },
  { id: 'intake', title: 'Paket tekshiruvi', owner: 'secretary', rule: '79 Nizom: 8–10-bandlar' },
  { id: 'council', title: 'Kengash ko‘rigi', owner: 'council', rule: '79 Nizom: 11–13-bandlar' },
  { id: 'supported', title: 'Ijobiy xulosa', owner: 'director', rule: '79 Nizom: 21–22-bandlar' },
  { id: 'concept', title: 'Texnik talab', owner: 'initiator', rule: '346: 3-band · 5 ish kuni' },
  { id: 'requirements', title: 'Texnik topshiriq', owner: 'center', rule: '346: 4-band · 10 ish kuni' },
  { id: 'assignment', title: 'TT tasdiqlash', owner: 'director', rule: '346: 4, 6-bandlar' },
  { id: 'technical', title: 'Loyiha buyrug‘i', owner: 'director', rule: '346: 5-band · 5 ish kuni' },
  { id: 'ordered', title: 'Shartnoma', owner: 'center', rule: '346: 8-band · 2 ish kuni' },
  { id: 'active', title: 'Ijro va moliyalashtirish', owner: 'center', rule: '346: 9–13-bandlar' },
  { id: 'returned', title: 'Qayta ishlash', owner: 'initiator', rule: '79 Nizom: 14–19-bandlar' },
  { id: 'rejected', title: 'Maqsadga muvofiq emas', owner: 'initiator', rule: '79 Nizom: 20-band' },
] as const
export type Stage = typeof stages[number]['id']
export type Decision = 'support' | 'return' | 'reject'
export const decisionLabels: Record<Decision | 'abstain', string> = { support: 'Qo‘llab-quvvatlash', return: 'Qayta ishlash', reject: 'Maqsadga muvofiq emas', abstain: 'Betaraf' }
export const members = ['J. Abruyev', 'S. Rasulev', 'B. Xidirbayev', 'R. Xo‘jaqulov', 'S. Davronov', 'Q. Komilov', 'J. Umarov', 'M. Mirsodiqov', 'Sh. Xasanov', 'S. Tursunov']
export const criteria = ['Muammo va ehtiyoj', 'Maqsad va vazifalar', 'Ijtimoiy ahamiyat', 'Iqtisodiy samaradorlik', 'Texnologik asos', 'Normativ muvofiqlik', 'Takrorlanmaslik']
export const documentKinds = [
  { id: 'concept', title: 'Konsepsiya' }, { id: 'requirement', title: 'Texnik talab' },
  { id: 'assignment', title: 'Texnik topshiriq' }, { id: 'estimate', title: 'Oyma-oy smeta' },
  { id: 'expertise', title: 'Ekspertiza xulosasi' }, { id: 'order', title: 'Loyiha buyrug‘i' },
  { id: 'contract', title: 'Shartnoma' }, { id: 'other', title: 'Boshqa hujjat' },
] as const
export type DocumentKind = typeof documentKinds[number]['id']
export interface Attachment { id: string; kind: DocumentKind; name: string; date: string; size?: number; file?: File; demo?: boolean }
export interface Audit { actorId?: string; actorName?: string; positionId?: string; id: string; at: string; role: Role; action: string; details: string }
export interface CostRow { category: string; count: number; monthlyRate: number; months: number; hours: number }
export interface Project {
  organizationId?: string; unitId?: string; ownerPositionId?: string; assignees?: Partial<Record<Exclude<Role, 'admin' | 'council'>, string>>;
  id: string; title: string; organization: string; owner: string; purpose: string; results: string; solution: string; resources: string;
  stage: Stage; created: string; changed: string; submitted: string; expectedEnd: string; budget: number;
  council: { present: string[]; votes: Record<string, Decision | 'abstain'>; protocol: string; reason: string; decision?: Decision; date?: string; checks: string[]; revisionDays?: number };
  revision: string; revisionDue: string; requirement: string; assignment: string; estimate: string; orderRef: string; contractRef: string;
  expertiseRequired: boolean; documents: Attachment[]; costs: CostRow[]; audit: Audit[];
}
export type ActState = 'draft' | 'submitted' | 'objection' | 'agreed' | 'approved' | 'sent' | 'paid'
export const actLabels: Record<ActState, string> = { draft: 'Qoralama', submitted: 'Kelishishda', objection: 'E’tiroz bildirilgan', agreed: 'Kelishilgan', approved: 'Tasdiqlangan', sent: 'Jamg‘armada', paid: 'Moliyalashtirilgan · demo' }
export interface Act {
  id: string; projectId: string; month: string; amount: number; progress: number; services: string; state: ActState;
  created: string; submitted: string; agreed: Partial<Record<'initiator' | 'reviewer', string>>; approved: string; sent: string; paid: string;
  invoice: string; objection: string; correction: string; reportName: string; audit: Audit[];
}
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const parse = (value: string) => new Date(`${value}T12:00:00Z`)
const iso = (date: Date) => date.toISOString().slice(0, 10)
export function addDays(date: string, count: number) { const d = parse(date); d.setUTCDate(d.getUTCDate() + count); return iso(d) }
export function addWorkdays(date: string, count: number, holidays: string[] = []) {
  const d = parse(date)
  let remaining = count
  while (remaining > 0) { d.setUTCDate(d.getUTCDate() + 1); if (![0, 6].includes(d.getUTCDay()) && !holidays.includes(iso(d))) remaining-- }
  return iso(d)
}
export function nextMonthDay(month: string, day: number) { const [year, m] = month.split('-').map(Number); return iso(new Date(Date.UTC(year!, m!, day, 12))) }
export function dueDate(project: Project, holidays: string[] = []) {
  switch (project.stage) {
    case 'intake': return addDays(project.submitted, 5)
    case 'concept': return addWorkdays(project.changed, 5, holidays)
    case 'requirements': return addWorkdays(project.changed, 10, holidays)
    case 'technical': return addWorkdays(project.changed, 5, holidays)
    case 'ordered': return addWorkdays(project.changed, 2, holidays)
    case 'returned': return project.revisionDue
    default: return ''
  }
}
export function actDue(act: Act, holidays: string[] = []) {
  if (act.state === 'draft') return nextMonthDay(act.month, 5)
  if (act.state === 'submitted') return addWorkdays(act.submitted, 3, holidays)
  if (act.state === 'approved') return nextMonthDay(act.month, 10)
  if (act.state === 'sent') return addWorkdays(act.sent, 2, holidays)
  return ''
}
export const stageTitle = (id: Stage) => stages.find(x => x.id === id)!.title
export const money = (value: number) => new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(value) + ' so‘m'
export function costTotal(rows: CostRow[]) {
  if (rows.some(r => [r.count, r.monthlyRate, r.months, r.hours].some(v => !Number.isFinite(v) || v < 0) || !Number.isInteger(r.count))) throw new Error('Smeta qiymatlari musbat, mutaxassislar soni butun bo‘lishi kerak.')
  const salary = rows.reduce((sum, r) => sum + r.count * r.monthlyRate * r.months, 0)
  if (!Number.isSafeInteger(Math.round(salary * 1.05))) throw new Error('Hisoblangan summa ruxsat etilgan raqam oralig‘idan oshgan.')
  return { salary, overhead: Math.round(salary * .05), total: Math.round(salary * 1.05) }
}
export function packageErrors(p: Project) {
  return ([['title', 'Loyiha nomi'], ['organization', 'Tashabbuskor tashkilot'], ['owner', 'Mas’ul'], ['purpose', 'Maqsad va vazifalar'], ['results', 'Kutilayotgan natijalar'], ['solution', 'Texnik yechim'], ['resources', 'Resurslar'], ['expectedEnd', 'Amalga oshirish muddati']] as const)
    .filter(([key]) => !p[key]?.trim()).map(([, label]) => `${label} kiritilmagan.`)
    .concat(Number.isFinite(p.budget) && p.budget > 0 ? [] : ['Moliyaviy hisob-kitob summasi kiritilmagan.'])
}
function requireRule(ok: unknown, error: string): asserts ok { if (!ok) throw new Error(error) }
export function councilErrors(p: Project, decision: Decision) {
  const present = [...new Set(p.council.present)].filter(x => members.includes(x))
  const errors: string[] = []
  if (present.length < Math.ceil(members.length * 2 / 3)) errors.push('Kvorum yo‘q: 10 a’zodan kamida 7 nafari qatnashishi kerak.')
  if (present.some(x => !p.council.votes[x])) errors.push('Har bir qatnashgan a’zoning ovozini qayd eting.')
  if (present.filter(x => p.council.votes[x] === decision).length <= present.length / 2) errors.push('Tanlangan xulosa qatnashganlarning oddiy ko‘pchilik ovozini olmagan.')
  if (!p.council.protocol.trim()) errors.push('Bayonnoma raqami talab etiladi.')
  if (decision !== 'support' && !p.council.reason.trim()) errors.push('E’tiroz yoki rad etish asosini yozing.')
  if (decision === 'return' && (!Number.isInteger(p.council.revisionDays ?? 30) || (p.council.revisionDays ?? 30) < 1 || (p.council.revisionDays ?? 30) > 30)) errors.push('Kengash qayta ishlash muddatini 1–30 ish kuni oralig‘ida belgilashi kerak.')
  if (decision === 'support' && criteria.some(x => !p.council.checks.includes(x))) errors.push('Barcha 7 mezon bo‘yicha baholashni qayd eting.')
  return errors
}
export function log(target: { audit: Audit[] }, role: Role, action: string, details = '') { target.audit.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), role, action, details }) }
export function advance(p: Project, role: Role, date = today(), holidays: string[] = []) {
  requireRule(stages.find(x => x.id === p.stage)?.owner === role, 'Bu bosqichda boshqa rol mas’ul.')
  const has = (kind: DocumentKind) => p.documents.some(x => x.kind === kind)
  const old = p.stage
  let next: Stage
  switch (old) {
    case 'draft': requireRule(!packageErrors(p).length, packageErrors(p).join(' ')); next = 'intake'; p.submitted = date; break
    case 'intake': requireRule(!packageErrors(p).length, 'Paket to‘liq emas. Kamchiliklarni ko‘rsating va qaytaring.'); next = 'council'; break
    case 'returned':
      requireRule(date <= p.revisionDue, 'Qayta topshirish muddati o‘tgan. Yangi tashabbus yarating.');
      requireRule(p.revision.trim(), 'Har bir e’tiroz bo‘yicha tuzatish va tushuntirishni yozing.');
      requireRule(!packageErrors(p).length, 'Loyiha paketini to‘ldiring.');
      next = 'intake'; p.submitted = date; p.council = { present: [], votes: {}, protocol: '', reason: '', checks: [], revisionDays: 30 }; break
    case 'supported': requireRule(p.council.decision === 'support', 'Kengashning ijobiy xulosasi talab etiladi.'); next = 'concept'; break
    case 'concept': requireRule(p.requirement.trim() && has('requirement'), 'Texnik talab mazmuni va hujjatini kiriting.'); next = 'requirements'; break
    case 'requirements': requireRule(p.assignment.trim() && p.estimate.trim() && has('assignment') && has('estimate'), 'Texnik topshiriq va oyma-oy smeta mazmuni hamda hujjatlari talab etiladi.'); next = 'assignment'; break
    case 'assignment': requireRule(p.council.decision === 'support', 'Kengashning ijobiy xulosasi yo‘q.'); requireRule(!p.expertiseRequired || has('expertise'), 'Ekspertiza zarur deb belgilangan. Xulosani biriktiring.'); next = 'technical'; break
    case 'technical': requireRule(p.orderRef.trim() && has('order'), 'Loyiha buyrug‘i raqami va hujjatini kiriting.'); next = 'ordered'; break
    case 'ordered': requireRule(p.council.decision === 'support', 'Ijobiy xulosasiz shartnoma tuzilmaydi.'); requireRule(p.contractRef.trim() && has('contract'), 'Shartnoma raqami va hujjatini kiriting.'); next = 'active'; break
    default: throw new Error('Bu holatda keyingi bosqich mavjud emas.')
  }
  // Business-day calculations use an explicitly configurable demo calendar.
  void holidays
  p.stage = next; p.changed = date; log(p, role, `${stageTitle(old)} → ${stageTitle(next)}`)
}
export function decide(p: Project, role: Role, decision: Decision, date = today(), holidays: string[] = []) {
  requireRule(role === 'council' && p.stage === 'council', 'Xulosani faqat Kengash ko‘rigi bosqichida qayd etish mumkin.')
  const errors = councilErrors(p, decision); requireRule(!errors.length, errors.join(' '))
  p.council.decision = decision; p.council.date = date
  p.stage = decision === 'support' ? 'supported' : decision === 'return' ? 'returned' : 'rejected'
  p.changed = date; if (decision === 'return') p.revisionDue = addWorkdays(date, p.council.revisionDays ?? 30, holidays)
  log(p, role, `Kengash: ${stageTitle(p.stage)}`, `${p.council.protocol}. ${p.council.reason} Ovozlar: ${p.council.present.map(m => `${m}: ${decisionLabels[p.council.votes[m]!]}`).join('; ')}`)
}
export function returnPackage(p: Project, role: Role, reason: string, date = today(), holidays: string[] = []) {
  requireRule(role === 'secretary' && p.stage === 'intake', 'Paket tekshiruvida Kengash kotibi qaytaradi.')
  requireRule(reason.trim(), 'Kamchiliklarni aniq ko‘rsating.')
  // An incomplete package is returned to draft; the council's 30-workday rule does not apply.
  p.stage = 'draft'; p.changed = date; p.council.decision = undefined
  log(p, role, 'Paket kamchiliklar sababli qaytarildi', `${reason}. Paket qaytarish nazorat sanasi: ${addWorkdays(p.submitted, 5, holidays)}`)
}
export function actErrors(p: Project, acts: Act[], draft: Pick<Act, 'month' | 'amount' | 'progress' | 'services' | 'reportName'>) {
  const errors = []
  if (p.stage !== 'active' || p.council.decision !== 'support') errors.push('Faol, ijobiy xulosali va shartnomali loyiha talab etiladi.')
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(draft.month)) errors.push('Hisobot oyini tanlang.')
  if (draft.month > today().slice(0, 7)) errors.push('Kelgusi oy uchun bajarilgan ishlarni topshirib bo‘lmaydi.')
  const existing = acts.filter(a => a.projectId === p.id)
  if (existing.some(a => a.month === draft.month)) errors.push('Ushbu loyiha va oy uchun dalolatnoma mavjud.')
  if (!Number.isFinite(draft.amount) || draft.amount <= 0 || draft.amount + existing.reduce((s, a) => s + a.amount, 0) > p.budget) errors.push('Summa musbat bo‘lishi va dalolatnomalar jami shartnoma qiymatidan oshmasligi kerak.')
  if (!Number.isFinite(draft.progress) || draft.progress < 0 || draft.progress > 100) errors.push('Bajarilish foizi 0–100 oralig‘ida bo‘lishi kerak.')
  if (existing.some(a => (a.month < draft.month && a.progress > draft.progress) || (a.month > draft.month && a.progress < draft.progress))) errors.push('Loyiha davomida bajarilish foizi hisobot oylari bo‘yicha kamaymasligi kerak.')
  if (!draft.services.trim() || !draft.reportName.trim()) errors.push('Bajarilgan xizmatlar va hisobot hujjati talab etiladi.')
  return errors
}
export function actAction(a: Act, role: Role, action: 'submit' | 'agree' | 'object' | 'approve' | 'send' | 'pay', note = '', date = today()) {
  switch (action) {
    case 'submit': requireRule(role === 'center' && ['draft', 'objection'].includes(a.state), 'Dalolatnomani Markaz topshiradi.'); requireRule(a.state !== 'objection' || a.correction.trim(), 'E’tiroz bo‘yicha tuzatish izohini kiriting.'); a.state = 'submitted'; a.submitted = date; a.agreed = {}; break
    case 'agree': requireRule(['initiator', 'reviewer'].includes(role) && a.state === 'submitted', 'Kelishish uchun tashabbuskor yoki BTRTR roli talab etiladi.'); requireRule(!a.agreed[role as 'initiator' | 'reviewer'], 'Bu tomon allaqachon kelishgan.'); a.agreed[role as 'initiator' | 'reviewer'] = date; if (a.agreed.initiator && a.agreed.reviewer) a.state = 'agreed'; break
    case 'object': requireRule(['initiator', 'reviewer'].includes(role) && a.state === 'submitted', 'E’tiroz faqat kelishish bosqichida bildiriladi.'); requireRule(note.trim(), 'E’tiroz sababini yozing.'); a.objection = note; a.correction = ''; a.agreed = {}; a.state = 'objection'; break
    case 'approve': requireRule(role === 'director' && a.state === 'agreed' && a.agreed.initiator && a.agreed.reviewer, 'Ikkala tomon kelishuvi va tasdiqlovchi rahbar roli talab etiladi.'); a.state = 'approved'; a.approved = date; break
    case 'send': requireRule(role === 'center' && a.state === 'approved', 'Faqat tasdiqlangan dalolatnoma Jamg‘armaga yuboriladi.'); requireRule(a.invoice.trim(), 'Hisob-faktura raqami talab etiladi.'); a.state = 'sent'; a.sent = date; break
    case 'pay': requireRule(role === 'fund' && a.state === 'sent', 'Jamg‘armaga yuborilgan hujjatni faqat Jamg‘arma moliyalashtiradi.'); a.state = 'paid'; a.paid = date; break
  }
  const titles = { submit: 'Kelishishga yuborildi', agree: 'Tomon kelishuvi qayd etildi', object: 'E’tiroz bildirildi', approve: 'Tasdiqlandi', send: 'Jamg‘armaga yuborildi', pay: 'Demo moliyalashtirish qayd etildi' }
  log(a, role, titles[action], note || actLabels[a.state])
}
