<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import {vDialogFocus} from './dialog-focus'
import {computed,ref,watch} from 'vue'
import {Users,ArrowUpRight,Download,FileText,CheckCircle2,Send,ArrowRight,Clock3,X} from 'lucide-vue-next'
import {data,latin,money,num,months,organization,sum,saveCSV} from './data'
import MetricValue from './MetricValue.vue'
import FamilyRequests from './FamilyRequests.vue'
import FamilyReferrals from './FamilyReferrals.vue'
import ServiceInformation from './ServiceInformation.vue'
import {formatRequestId,usePrototypeRequests,type PrototypeRequest} from './prototype-requests'
const props=defineProps<{familyId:string;memberId?:string;role:string;services?:boolean;section?:string;initialQuarter?:number;requestId?:number}>()
const emit=defineEmits<{
 payments:[]
 member:[string]
 receipt:[{title:string;lines:string[]}]
 services:[]
 requests:[]
 execution:[number]
 cabinet:[string,string?]
}>()
function familyAddressDetails(value: typeof data.families[number]) {
 const address = latin(value.address)
 const parts = address.split(',').map(part => part.trim())
 return { mahalla: value.mahalla || parts.find(part => /mahalla|MFY/i.test(part)) || '', house: value.house || parts.find(part => /\d+.*(?:uy|xonadon)/i.test(part)) || '' }
}
const { events, createServiceRequest } = usePrototypeRequests()
const cabinetMember = ref(props.memberId ?? '')
watch(() => [props.familyId, props.memberId], () => { cabinetMember.value = props.memberId ?? '' })
const person = computed({
 get: () => props.role === 'citizen' ? cabinetMember.value : props.memberId ?? '',
 set: (id: string) => {
   if (props.role === 'citizen') cabinetMember.value = id
   emit('member',id)
 },
})
const quarters = [0, 1, 2, 3, 4]
const initialQuarter = computed(() => quarters.find(value => value === props.initialQuarter) ?? 0)
const quarter=ref(initialQuarter.value),agency=ref(''),kind=ref(''),direction=ref('')
watch(initialQuarter, value => { quarter.value = value })
const sourcePeriod = computed(() => quarter.value ? '2025-yil ' + quarter.value + '-chorak' : '2025-yil')
const family=computed(()=>data.families.find(x=>x.id===props.familyId)??data.families[0]!)
const selectedMonths=computed(()=>Array.from({length:12},(_,i)=>i).filter(i=>!quarter.value||Math.floor(i/3)===quarter.value-1))
const rows=computed(()=>family.value.members.filter(m=>!person.value||person.value===m.id).flatMap(m=>m.rows.map(r=>({...r,member:m}))).filter(r=>(!agency.value||r.o===agency.value)&&(!kind.value||r.t===kind.value)&&(!direction.value||r.d===direction.value)))
const memberSupport = computed(() => family.value.members.filter(member => !person.value || member.id === person.value).map(member => {
 const payments = rows.value.filter(row => row.member.id === member.id).map(row => ({ ...row, amount: sum(selectedMonths.value.map(month => row.arr[month] ?? 0)) })).filter(row => row.amount > 0)
 return { member, payments, total: sum(payments.map(row => row.amount)) }
}))
const breakdown = ref('agency')
const groupedPayments = computed(() => {
 const groups = new Map<string,{amount:number;payments:number;measures:Set<string>}>()
 for (const row of rows.value) {
   const amounts=selectedMonths.value.map(i=>row.arr[i]??0).filter(value=>value>0)
   if(!amounts.length) continue
   const label=breakdown.value==='agency'?organization(row.o):breakdown.value==='type'?latin(data.labels.types[row.t]):breakdown.value==='direction'?latin(data.labels.directions[row.d]):latin(row.member.name)
   const group=groups.get(label)??{amount:0,payments:0,measures:new Set<string>()}
   group.amount+=sum(amounts);group.payments+=amounts.length;group.measures.add(row.id)
   groups.set(label,group)
 }
 return [...groups.entries()].sort((a,b)=>b[1].amount-a[1].amount)
})
const allRows=computed(()=>family.value.members.flatMap(m=>m.rows))
const values=computed(()=>months.map((_,i)=>sum(rows.value.map(r=>r.arr[i]??0))))
const total=computed(()=>sum(selectedMonths.value.map(i=>values.value[i]??0)))
const maximum=computed(()=>Math.max(1,...values.value))
const agencies=computed(()=>[...new Set(allRows.value.map(r=>r.o))])
const directions=computed(()=>[...new Set(allRows.value.map(r=>r.d))])
const directionLabels:Record<string,string>={ben:'Ijtimoiy nafaqalar',pen:'Pensiya to‘lovlari',low:'Kam ta’minlangan oilalar',comp:'Kompensatsiya',once:'Bir martalik to‘lov',ins:'Ijtimoiy sug‘urta',fund:'Jamg‘arma ko‘magi',svc:'Xizmatlar'}
const membersInScope = computed(() => family.value.members.filter(member => !person.value || member.id === person.value))
const latestRequestTime = (event: PrototypeRequest) => Date.parse(event.history[event.history.length - 1]?.at ?? '')
const requestsForFamily = computed(() => events.value.filter(event => event.familyId === family.value.id))
const linkedRequests = computed(() => requestsForFamily.value.filter(event => !person.value || event.memberId === person.value)
  .sort((left, right) =>
    Number(right.id === props.requestId) - Number(left.id === props.requestId) ||
    latestRequestTime(right) - latestRequestTime(left) || right.id - left.id,
  ))
const paymentRequests = computed(() => linkedRequests.value.filter(event => event.status === 'delivered' && event.amount > 0))
const linkedApplication = computed(() => new Set(requestsForFamily.value.filter(event => event.kind === 'service' &&
  event.history[0]?.label === 'Ariza qabul qilindi' && event.status !== 'duplicate'
).map(event => event.memberId + ':' + event.measure)))
const suggestions = computed(() => membersInScope.value.flatMap(member =>
  member.suggestions.map(item => ({ ...item, member }))
).sort((left, right) => Number(left.got) - Number(right.got)))
const available = computed(() => suggestions.value.filter(item => !item.got))
const overlaps = computed(() => membersInScope.value.flatMap(member => {
  const groups = new Map<string, typeof member.rows>()
  for (const row of member.rows) {
    const key = row.t + ':' + row.d
    groups.set(key, [...(groups.get(key) ?? []), row])
  }
  return [...groups.entries()].flatMap(([key, group]) => {
    const periods = selectedMonths.value.flatMap(month => {
      const records = group.filter(row => (row.arr[month] ?? 0) > 0)
      return records.length > 1 ? [{ month, records }] : []
    })
    return periods.length ? [{ key: family.value.id + ':' + member.id + ':' + key, member, periods }] : []
  })
}))
const noted = ref<string[]>([])
try {
  const stored: unknown = JSON.parse(localStorage.getItem('nasp-benefit-overlap-reviews') ?? '[]')
  if (Array.isArray(stored)) noted.value = stored.filter(key => typeof key === 'string')
} catch { /* Demo review history is optional. */ }
function review(key: string) {
  const next = noted.value.includes(key) ? noted.value.filter(item => item !== key) : [...noted.value, key]
  try {
    localStorage.setItem('nasp-benefit-overlap-reviews', JSON.stringify(next))
    noted.value = next
  } catch { message.value = 'Qaydni brauzerda saqlab bo‘lmadi.' }
}
function hasApplication(service: string, member: string) {
  return linkedApplication.value.has(member + ':' + data.services[service]?.[0]) ||
    applications.value.some(item => item.familyId === family.value.id && item.service === service && item.memberId === member)
}
const applying=ref(''),applicant=ref(''),reason=ref(''),accepted=ref(false),error=ref(''),message=ref('')
type Application={id:string;service:string;familyId:string;memberId:string;reason:string;created:string;status:string}
const applications=ref<Application[]>([])
try{const value=JSON.parse(localStorage.getItem('nasp-social-demo-applications-v2')??'[]');if(Array.isArray(value))applications.value=value}catch{ /* Optional demo history. */ }
const familyApplications=computed(()=>applications.value.filter(a=>a.familyId===family.value.id && (!person.value || a.memberId===person.value)))
function receipt(){emit('receipt',{title:person.value ? 'Fuqaro bo‘yicha ko‘rsatilgan ko‘mak' : 'Oila bo‘yicha ko‘rsatilgan ko‘mak',lines:[...(person.value?[latin(membersInScope.value[0]?.name)]:[]),`2025-yil ${quarter.value?quarter.value+'-chorak':'yakuni'}`,`Oila: ${family.value.id} · ${latin(data.regions[family.value.region])}`,`Jami: ${num(total.value)} so‘m`,...rows.value.map(r=>`${latin(r.member.name)} · ${latin(r.n)} · ${num(sum(selectedMonths.value.map(i=>r.arr[i]??0)))} so‘m`),'Prototip ma’lumotnomasi. Rasmiy hujjat emas.']})}
function exportRows(){saveCSV('Fuqaro_oila_tolovlari.csv',[['Shaxs','Chora','Idora',...selectedMonths.value.map(i=>months[i]!)],...rows.value.map(r=>[latin(r.member.name),latin(r.n),organization(r.o),...selectedMonths.value.map(i=>r.arr[i]??0)])])}
function apply(id:string, memberId = person.value){applying.value=id;applicant.value=memberId||family.value.members[0]!.id;reason.value='';accepted.value=false;error.value=''}
function submit() {
  const service = data.services[applying.value]
  if (!service || !applicant.value || !accepted.value || !reason.value.trim()) {
    error.value = 'Oila a’zosini, murojaat mazmunini va tasdiqni kiriting.'
    return
  }
  if (hasApplication(applying.value, applicant.value)) {
    error.value = 'Bu a’zo uchun shu xizmatga ariza qabul qilingan.'
    return
  }
  const id = createServiceRequest(family.value.id, applicant.value, service[0], reason.value)
  if (id === undefined) {
    error.value = 'Arizani qabul qilib bo‘lmadi.'
    return
  }
  applying.value = ''
  if (person.value && applicant.value !== person.value) person.value = applicant.value
  message.value = 'Ariza qabul qilindi. Raqami ' + formatRequestId(id)
}
</script>
<template>
<div class="family-view np-section-stack" :class="{ 'citizen-family': role === 'citizen' }">
<Teleport v-if="!services" defer to="#support-filter-fields"><label>{{ benefitText("Oila a’zosi") }}<select v-model="person"><option value="">{{ benefitText("Butun oila") }}</option><option v-for="member in family.members" :key="member.id" :value="member.id">{{ benefitText(member.name) }}</option></select></label></Teleport>
<div v-if="!services && (!section || section!=='home')" class="section-heading"><div><p>{{ benefitText("To‘lov ma’lumotlari · 2025") }}</p></div><div class="heading-actions"><button class="np-button" @click="receipt"><FileText :size="14"/>{{ benefitText("Ma’lumotnoma") }}</button><button class="np-button" @click="exportRows"><Download :size="14"/>{{ benefitText("Eksport") }}</button>
<button v-if="role==='staff'" class="np-button" @click="emit('cabinet', family.id, person || undefined)">
  <ArrowUpRight :size="14" aria-hidden="true"/>{{ benefitText('Fuqaro kabineti') }}
</button></div></div>
<div v-if="!section || ['home','family'].includes(section)" class="family-heading"><div class="family-avatar"><Users :size="25"/></div><div><h3><template v-if="person || role === 'citizen'">{{ benefitText(person ? membersInScope[0]?.name : family.members[0]?.name) }}</template><template v-else>{{ benefitText('Oila') }} · {{ family.id }}</template></h3><p>{{ [...new Set([data.regions[family.region],family.address].filter(Boolean).map(benefitText))].join(' · ') }}</p><dl class="family-address-details"><div><dt>{{ benefitText('Mahalla') }}</dt><dd>{{ benefitText(familyAddressDetails(family).mahalla || 'Ma’lumot kiritilmagan') }}</dd></div><div><dt>{{ benefitText('Uy / xonadon') }}</dt><dd>{{ benefitText(familyAddressDetails(family).house || 'Ma’lumot kiritilmagan') }}</dd></div></dl><span v-for="tag in family.tags" :key="tag" class="np-tag blue">{{ benefitText(tag) }}</span></div><span class="np-tag" :class="family.members.some(m=>m.source)?'green':'amber'">{{ benefitText(family.members.some(m=>m.source)?'2025 · F.I.Sh. shartli':'Namunaviy oila') }}</span></div>
<section v-if="!services && (!section || section==='family')" class="np-card family-composition" aria-labelledby="family-composition-heading">
  <FamilyReferrals :family="family" />
  <h3 id="family-composition-heading">{{ benefitText('Oila a’zolari tarkibi') }}</h3>
  <div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText('Oila a’zosi') }}</th><th>{{ benefitText('Qarindoshlik darajasi') }}</th><th>{{ benefitText('Ijtimoiy holati') }}</th></tr></thead><tbody>
    <tr v-for="member in family.members" :key="member.id"><td><button type="button" class="text-button" @click="person=member.id">{{ benefitText(member.name) }}</button><small v-if="member.age !== null">{{ num(member.age) }} {{ benefitText('yosh') }}</small></td><td>{{ benefitText(member.relation || 'Ma’lumot kiritilmagan') }}</td><td>{{ benefitText(member.socialStatus || 'Ijtimoiy holati ko‘rsatilmagan') }}<small v-if="member.rows.length">{{ benefitText('Tayinlangan ko‘maklar:') }}</small><small v-for="name in [...new Set(member.rows.map(row=>row.n))]" :key="name">{{ benefitText(name) }}</small></td></tr>
  </tbody></table></div>
</section>

<section v-if="!services && linkedRequests.length && (!section || section === 'home' || section === 'payments')" class="np-card linked-requests">
  <div class="np-card-heading">
    <h3>{{ benefitText(section === 'payments' ? 'Tizimdagi ijro natijalari' : 'Tizimdagi so‘rovlar') }}</h3>
    <button v-if="section === 'home'" class="text-button" @click="emit('requests')">
      {{ benefitText('Barchasi') }} <ArrowUpRight :size="14" aria-hidden="true"/>
    </button>
    <span v-else class="np-tag blue">{{ benefitText('Namunaviy yozuvlar') }}</span>
  </div>
  <FamilyRequests v-if="section !== 'payments' || paymentRequests.length"
    :entries="section === 'home' ? linkedRequests.slice(0, 2) : section === 'payments' ? paymentRequests : linkedRequests"
    :members="membersInScope" :compact="section === 'home'" :staff="role === 'staff'" :highlight="requestId" @open="emit('execution', $event)" />
  <p v-else class="np-empty">{{ benefitText('Tasdiqlangan to‘lov yozuvi yo‘q.') }}</p>
</section>
<section v-if="overlaps.length && role === 'staff' && !services" class="overlap-list">
  <h3>{{ benefitText("Bir turdagi ko‘mak ") }}<span>{{ benefitText(overlaps.length) }}</span></h3>
  <details v-for="alert in overlaps" :key="alert.key">
    <summary>{{ benefitText(alert.member.name) }} · {{ benefitText(alert.periods.length) }}{{ benefitText(" oy ") }}<b>{{ benefitText(noted.includes(alert.key) ? 'Ko‘rib chiqildi' : 'Tekshirish kerak') }}</b></summary>
    <p>{{ benefitText("Bir shaxsga bir oyda turi va yo‘nalishi mos bir nechta chora qayd etilgan. ") }}</p>
    <div v-for="period in alert.periods" :key="period.month"><strong>{{ benefitText(months[period.month]) }}</strong><ul>
      <li v-for="row in period.records" :key="row.id">{{ benefitText(row.n) }} · {{ benefitText(organization(row.o)) }} · {{ num(row.arr[period.month] ?? 0) }}{{ benefitText(" so‘m") }}</li>
    </ul></div>
    <button v-if="role==='staff'" class="np-button" @click="review(alert.key)">{{ benefitText(noted.includes(alert.key) ? 'Qayta ochish' : 'Ko‘rib chiqildi deb belgilash') }}</button>
  </details>
</section>
<button v-if="!services && available.length && (!section || section==='home')" class="suggest-launch" @click="emit('services')"><span><b>{{ benefitText("Tavsiya etiladigan xizmatlar · ") }}{{ benefitText(available.length) }}{{ benefitText(" tavsiya") }}</b><small>{{ benefitText(role==='citizen' ? 'Xizmat mazmuni va murojaat qilish tartibi' : data.services[available[0]!.id]?.[0]) }}</small></span><ArrowRight :size="18"/></button>
<template v-if="!services"><div v-if="!section || ['home','family'].includes(section)" class="family-overview"><div class="family-total"><small>{{ benefitText("Manbadagi ko‘mak") }} · {{ benefitText(sourcePeriod) }}</small><strong><MetricValue :value="total"/><span>{{ benefitText("so‘m") }}</span></strong><div><span>{{ benefitText(new Set(rows.filter(row => selectedMonths.some(month => (row.arr[month] ?? 0) > 0)).map(row=>row.id)).size) }}{{ benefitText(" chora") }}</span><span>{{ benefitText(family.members.length) }}{{ benefitText(" oila a’zosi") }}</span><span>{{ benefitText(new Set(rows.map(r=>r.o)).size) }}{{ benefitText(" idora") }}</span></div><button v-if="role==='citizen'" type="button" class="family-support-enter" @click="person='';emit('payments')">{{ benefitText('Kirish') }}<ArrowRight :size="16" /></button></div><div v-if="!section || section==='family'" class="np-card family-members"><button :class="{selected:!person}" @click="person=''">{{ benefitText("Butun oila ") }}<b>{{ benefitText(family.members.length) }}</b></button><button v-for="member in family.members" :key="member.id" :class="{selected:person===member.id}" @click="person=member.id"><span>{{ benefitText(member.name) }}<small>{{ benefitText(benefitText(member.relation)||'Oila a’zosi') }} · {{ benefitText(member.age??'—') }}{{ benefitText(" yosh") }}</small></span><b>{{ benefitText(money(sum(member.rows.flatMap(r=>selectedMonths.map(i=>r.arr[i]??0))))) }}</b></button></div></div><section class="np-card" v-if="role!=='citizen'"><h3>{{ benefitText("Oila ko‘magi tarkibi") }}</h3><Teleport defer to="#support-filter-fields"><label>{{ benefitText("Oila ko‘magi kesimi") }}<select v-model="breakdown"><option value="agency">{{ benefitText("Idora") }}</option><option value="type">{{ benefitText("Tur") }}</option><option value="direction">{{ benefitText("Yo‘nalish") }}</option><option value="member">{{ benefitText("Oila a’zosi") }}</option></select></label></Teleport><div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Guruh") }}</th><th>{{ benefitText("Chora") }}</th><th>{{ benefitText("To‘lov") }}</th><th>{{ benefitText("Summa, so‘m") }}</th></tr></thead><tbody><tr v-for="[name,group] in groupedPayments" :key="name"><td>{{ benefitText(name) }}</td><td>{{ benefitText(group.measures.size) }}</td><td>{{ benefitText(group.payments) }}</td><td>{{ num(group.amount) }}</td></tr></tbody></table></div></section><div v-if="!section || section==='payments' || section==='home'" class="np-card"><div class="np-toolbar"><h3>{{ benefitText("To‘lovlar tarixi") }}</h3><Teleport defer to="#support-filter-fields"><div class="np-segment"><button v-for="q in quarters" :key="q" :class="{active:quarter===q}" @click="quarter=q">{{ benefitText(q?q+'-chorak':'Yil') }}</button></div></Teleport><Teleport defer to="#support-filter-fields"><select v-model="agency" :aria-label="benefitText('Oila to‘lov idorasi')"><option value="">{{ benefitText("Barcha idoralar") }}</option><option v-for="key in agencies" :key="key" :value="key">{{ benefitText(organization(key)) }}</option></select></Teleport><Teleport defer to="#support-filter-fields"><select v-model="kind" :aria-label="benefitText('Oila chora turi')"><option value="">{{ benefitText("Barcha turlar") }}</option><option value="kaf">{{ benefitText("Ijtimoiy kafolat") }}</option><option value="mol">{{ benefitText("Moliyaviy ko‘mak") }}</option><option value="imt">{{ benefitText("Imtiyoz") }}</option></select></Teleport><Teleport defer to="#support-filter-fields"><select v-model="direction" :aria-label="benefitText('Oila yo‘nalishi')"><option value="">{{ benefitText("Barcha yo‘nalishlar") }}</option><option v-for="d in directions" :key="d" :value="d">{{ benefitText(directionLabels[d]??d) }}</option></select></Teleport></div><div v-if="role==='citizen'" class="cabinet-months">
  <button v-for="(value,i) in values" :key="i" :aria-pressed="quarter===Math.floor(i/3)+1" :class="{dim:!selectedMonths.includes(i)}" @click="quarter=Math.floor(i/3)+1">
    <span>{{ benefitText(months[i]) }}</span><b>{{ benefitText(money(value)) }}</b>
    <i aria-hidden="true"><em :style="{width:value/maximum*100+'%'}"/></i>
  </button>
</div><div v-else class="np-month-chart family-chart"><button v-for="(value,i) in values" :key="i" :class="{dim:!selectedMonths.includes(i)}" :title="benefitText(months[i]+': '+num(value)+' so‘m')" @click="quarter=Math.floor(i/3)+1"><b>{{ benefitText(money(value)) }}</b><i :style="{height:Math.max(3,value/maximum*100)+'%',animationDelay:i*40+'ms'}"/><span>{{ benefitText(months[i]) }}</span></button></div><div v-if="role==='citizen' && section==='payments'" class="member-support-list">
  <article v-for="group in memberSupport" :key="group.member.id" class="member-support-card">
    <header><div><h4>{{ benefitText(group.member.name) }}</h4><small>{{ benefitText(group.member.relation) }}<template v-if="group.member.age !== null"> · {{ num(group.member.age) }} {{ benefitText('yosh') }}</template></small></div><strong>{{ num(group.total) }} {{ benefitText('so‘m') }}</strong></header>
    <button v-for="payment in group.payments" :key="payment.id" type="button" @click="emit('receipt',{title:latin(payment.n),lines:[latin(group.member.name),organization(payment.o),sourcePeriod,...selectedMonths.map(month=>months[month]+': '+num(payment.arr[month]??0)+' so‘m')]})"><span><b>{{ benefitText(payment.n) }}</b><small>{{ benefitText(organization(payment.o)) }}</small></span><strong>{{ num(payment.amount) }} {{ benefitText('so‘m') }}</strong></button>
    <p v-if="!group.payments.length">{{ benefitText('Tanlangan davr va filtrlar bo‘yicha ko‘mak qayd etilmagan.') }}</p>
  </article>
</div><div v-if="role==='citizen' && section!=='payments'" class="mobile-ledger">
  <button v-for="row in rows" :key="row.member.id+row.id" @click="emit('receipt',{title:latin(row.n),lines:[latin(row.member.name),organization(row.o),...selectedMonths.map(i=>months[i]+': '+num(row.arr[i]??0)+' so‘m')]})">
    <span><b>{{ benefitText(row.n) }}</b><small>{{ benefitText(row.member.name) }} · {{ benefitText(organization(row.o)) }}</small></span><strong>{{ benefitText(money(sum(selectedMonths.map(i=>row.arr[i]??0)))) }}</strong>
  </button><p v-if="!rows.length">{{ benefitText("Tanlov bo‘yicha to‘lov yo‘q.") }}</p>
</div><div v-if="role!=='citizen'" class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Chora / oluvchi") }}</th><th>{{ benefitText("Idora") }}</th><th v-for="i in selectedMonths" :key="i">{{ benefitText(months[i]) }}</th><th>{{ benefitText("Jami") }}</th><th></th></tr></thead><tbody><tr v-for="row in rows" :key="row.member.id+row.id"><td><button class="text-button" @click="emit('receipt',{title:latin(row.n),lines:[latin(row.member.name),organization(row.o),...selectedMonths.map(i=>months[i]+': '+num(row.arr[i]??0)+' so‘m')]})">{{ benefitText(row.n) }}</button><small>{{ benefitText(row.member.name) }}</small></td><td>{{ benefitText(organization(row.o)) }}</td><td v-for="i in selectedMonths" :key="i">{{ benefitText(row.arr[i]?money(row.arr[i]!):'—') }}</td><td><b>{{ benefitText(money(sum(selectedMonths.map(i=>row.arr[i]??0)))) }}</b></td><td><button class="icon-button" :aria-label="benefitText('To‘lov kvitansiyasi')" @click="emit('receipt',{title:latin(row.n),lines:[latin(row.member.name),organization(row.o),'2025-yil',...selectedMonths.map(i=>months[i]+': '+num(row.arr[i]??0)+' so‘m'),'Namunaviy kvitansiya.']})"><FileText :size="15"/></button></td></tr><tr v-if="!rows.length"><td :colspan="selectedMonths.length+4" class="np-empty">{{ benefitText("Bu kesimda to‘lov yozuvi mavjud emas.") }}</td></tr></tbody></table></div></div><div v-if="family.signals.length && role==='staff'" class="family-signals"><div v-for="[level,text] in family.signals" :key="text" class="np-notice" :class="level==='warn'?'amber':'blue'">{{ benefitText(text) }}</div></div></template><template v-else><div v-if="section !== 'requests'" class="service-summary">
  <div><h3>{{ benefitText('Tavsiya etiladigan xizmatlar') }}</h3><p>{{ benefitText(person ? membersInScope[0]?.name : 'Butun oila') }}</p></div>
  <strong>{{ benefitText(available.length) }} {{ benefitText('tavsiya') }}</strong>
</div><Teleport defer to="#support-filter-fields"><label class="service-picker">{{ benefitText("Kim uchun") }}<select v-model="person"><option value="">{{ benefitText("Butun oila") }}</option><option v-for="member in family.members" :key="member.id" :value="member.id">{{ benefitText(member.name) }}</option></select></label></Teleport><p v-if="section !== 'requests' && !suggestions.length" class="np-empty">{{ benefitText('Bu tanlovda xizmat tavsiyasi yo‘q.') }}</p>
<div v-if="section !== 'requests' && suggestions.length" class="service-grid"><article v-for="item in suggestions" :key="item.member.id+item.id" class="np-card service-card"><span class="service-icon"><CheckCircle2 v-if="item.got" :size="22"/><ArrowUpRight v-else :size="22"/></span><span class="np-tag" :class="item.got?'green':'blue'">{{ benefitText(item.got?'Foydalanilmoqda':'Tavsiya etiladi') }}</span><h3>{{ benefitText(data.services[item.id]?.[0]) }}</h3><b>{{ benefitText(item.member.name) }}</b><small>{{ benefitText(data.services[item.id]?.[1]) }}</small><p>{{ benefitText(data.services[item.id]?.[2]) }}</p><ServiceInformation :service-id="item.id" :recipient="item.member.name" :reasons="item.why" /><button v-if="!item.got" class="np-button primary" :disabled="hasApplication(item.id,item.member.id)" @click="apply(item.id,item.member.id)"><Send :size="14"/>{{ benefitText(hasApplication(item.id,item.member.id) ? 'Ariza qabul qilingan' : 'Ariza berish') }}</button></article></div><section v-if="!section || section === 'requests'" class="np-card linked-requests">
  <div class="np-card-heading">
    <h3>{{ benefitText('Arizalar va so‘rovlar') }}</h3>
    <span class="np-tag blue">{{ benefitText(linkedRequests.length + familyApplications.length) }}</span>
  </div>
  <p v-if="!familyApplications.length && !linkedRequests.length" class="np-empty">{{ benefitText('Bu tanlovda ariza yoki so‘rov yo‘q.') }}</p>
  <FamilyRequests :entries="linkedRequests" :members="membersInScope" :staff="role === 'staff'" :highlight="requestId" @open="emit('execution', $event)" />
  <div v-for="item in familyApplications" :key="item.id" class="application-row">
    <Clock3 :size="18" aria-hidden="true"/>
    <div><strong>{{ benefitText(data.services[item.service]?.[0]) }}</strong><small>{{ item.id }} · {{ benefitText(item.created) }}</small><p>{{ benefitText(item.reason) }}</p></div>
    <span class="np-tag green">{{ benefitText(item.status) }}</span>
  </div>
</section>
<details v-if="section!=='requests'" class="np-card"><summary>{{ benefitText("Barcha xizmatlar katalogi · ") }}{{ benefitText(Object.keys(data.services).length) }}</summary><div v-for="(service,id) in data.services" :key="id" class="service-line"><div><b>{{ benefitText(service[0]) }}</b><p>{{ benefitText(service[2]) }}</p><small>{{ benefitText(service[1]) }}</small></div><button class="np-button" @click="apply(String(id))">{{ benefitText("Ariza") }}</button></div></details></template><div v-if="message" class="np-notice green service-success" role="status">
  {{ benefitText(message) }}
  <button v-if="role === 'citizen' && section !== 'requests'" class="text-button" @click="emit('requests')">{{ benefitText('Arizani ko‘rish') }}</button>
</div><div v-if="applying" class="np-overlay" @click.self="applying=''" @keydown.esc="applying=''"><form class="np-dialog" v-dialog-focus role="dialog" aria-modal="true" aria-labelledby="service-application-title" @submit.prevent="submit"><header><div><h2 id="service-application-title">{{ benefitText(data.services[applying]?.[0]) }}</h2><p>{{ benefitText(data.services[applying]?.[1]) }}</p></div><button type="button" class="icon-button" :aria-label="benefitText('Arizani yopish')" @click="applying=''"><X :size="20"/></button></header><label>{{ benefitText("Oila a’zosi") }}<select v-model="applicant"><option v-for="m in family.members" :key="m.id" :value="m.id">{{ benefitText(m.name) }}</option></select></label><label>{{ benefitText("Murojaat mazmuni") }}<textarea v-model="reason" rows="4" :placeholder="benefitText('Xizmat bo‘yicha murojaatni kiriting')"/></label><label class="np-check"><input v-model="accepted" type="checkbox"/>{{ benefitText("Ariza ma’lumotlarini tasdiqlayman") }}</label><p v-if="error" class="np-notice red" role="alert">{{ benefitText(error) }}</p><button class="np-button primary" type="submit"><Send :size="15"/>{{ benefitText("Ariza yuborish") }}</button><small>{{ benefitText("Namunaviy ariza shu brauzerdagi so‘rovlar ro‘yxatiga tushadi.") }}</small></form></div></div></template>
<style scoped>.family-lookup{display:flex;align-items:center;gap:15px;margin-bottom:18px}.family-lookup .np-search{flex:1}.family-lookup select{max-width:50%}.family-lookup>span{font-size:11px;color:var(--muted-foreground);white-space:nowrap}.family-heading{display:flex;gap:15px;align-items:center;margin:20px 0}.family-avatar{height:58px;width:58px;border-radius:16px;display:grid;place-items:center;background:#eaf1ff;color:#396bd6}.family-heading h3{font-weight:750;font-size:17px}.family-heading p{color:var(--muted-foreground);font-size:12px;margin:3px 0 6px}.family-heading>.np-tag{margin-left:auto}.family-overview{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}.family-total{border-radius:14px;background:linear-gradient(115deg,#f0f5ff,#e9f5f7);border:1px solid #dbe5f4;padding:28px;display:flex;flex-direction:column;justify-content:center;color:#204475}.family-total>small{font-size:12px;color:var(--muted-foreground)}.family-total>strong{font-size:36px;margin:15px 0;letter-spacing:-.05em}.family-total>strong>span{font-size:14px;margin-left:9px;letter-spacing:0}.family-total>div{display:flex;gap:20px;font-size:11px;color:var(--muted-foreground)}.family-members{display:grid;gap:4px;max-height:250px;overflow:auto}.family-members button{display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:left;font-size:12px;padding:10px;border-radius:7px}.family-members button.selected{background:#edf3ff;color:var(--primary)}.family-members small{display:block;font-size:11px;color:var(--muted-foreground)}.family-members b{font-size:11px}.family-chart{height:190px;margin:22px 0 30px}.family-chart button b{font-size:11px}.family-chart .dim{opacity:.25}.family-signals{display:grid;gap:10px;margin-top:20px}.family-next{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:20px;padding:22px;background:var(--card);border:1px solid var(--border);border-radius:12px}.family-next h3{font-size:14px;font-weight:700}.family-next p{font-size:11px;color:var(--muted-foreground);margin-top:4px}.service-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:20px 0}.service-card{display:flex;align-items:flex-start;flex-direction:column;gap:12px}.service-icon{height:42px;width:42px;border-radius:12px;background:#edf4fe;color:#3a70d9;display:grid;place-items:center}.service-card h3{line-height:1.5}.service-card small,.service-card li{font-size:11px;color:var(--muted-foreground)}.service-card p{font-size:12px;color:var(--muted-foreground);line-height:1.7}.service-card .np-button{margin-top:auto}.service-line,.application-row{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--border);align-items:center}.service-line p,.application-row p{font-size:11px;color:var(--muted-foreground)}.service-line small,.application-row small{font-size:11px;color:var(--muted-foreground);display:block}.service-line b,.application-row strong{font-size:12px}.service-line .np-button,.application-row>.np-tag{margin-left:auto}.np-dialog label{display:grid;gap:8px;font-size:12px;margin:18px 0}.np-dialog .np-check{display:flex}.np-dialog>small{display:block;font-size:11px;color:var(--muted-foreground);margin-top:14px}.family-view>details{margin-top:20px}@media(max-width:850px){.family-overview{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr 1fr}.family-lookup{flex-wrap:wrap}.family-heading{flex-wrap:wrap}}@media(max-width:550px){.service-grid{grid-template-columns:1fr}}</style>

<style scoped>
.overlap-list{padding:16px;border-radius:16px;background:color-mix(in srgb,#db981d 12%,var(--card));border:1px solid color-mix(in srgb,#db981d 40%,var(--border))}
.overlap-list h3,.suggest-launch b{font-weight:700}.overlap-list details{padding-block:8px}.overlap-list summary{cursor:pointer;color:var(--foreground);font-size:13px}.overlap-list summary b{margin-left:6px}.overlap-list p,.overlap-list li{font-size:12px;line-height:1.7}.overlap-list ul{margin-bottom:8px}
.suggest-launch,.mobile-ledger button{display:flex;width:100%;align-items:center;justify-content:space-between;gap:10px;text-align:left;padding:14px;border-radius:14px}
.suggest-launch{background:color-mix(in srgb,var(--primary) 12%,var(--card));color:var(--primary);border:1px solid color-mix(in srgb,var(--primary) 35%,var(--border))}
.suggest-launch small,.mobile-ledger small{display:block;font-size:12px;color:var(--muted-foreground);margin-top:4px}
.service-picker{display:flex;gap:10px;align-items:center;font-size:13px}.mobile-ledger button{margin-top:8px;background:var(--muted);font-size:13px}.mobile-ledger strong{white-space:nowrap;color:var(--primary)}
.linked-requests .np-card-heading { margin-bottom: 12px }
.linked-requests .np-card-heading .text-button { display: inline-flex; align-items: center; gap: 4px; text-align: start }
.service-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 13px 15px;
  border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border));
  border-radius: 13px;
  background: color-mix(in srgb, var(--primary) 7%, var(--card));
}
.service-summary p { color: var(--muted-foreground); font-size: 12px; line-height: 1.4 }
.service-summary strong { color: var(--primary); font-size: 12px }
.service-reasons { color: var(--muted-foreground); font-size: 12px; line-height: 1.5 }
.service-reasons summary { cursor: pointer; color: var(--primary); font-weight: 600 }
.service-reasons ul { margin-top: 6px; padding-inline-start: 17px; list-style: disc }
.service-success { display: grid; gap: 6px }
.service-success .text-button { justify-self: start; text-align: start }
.citizen-family .np-dialog h2 { font-size: clamp(15px, 5cqi, 20px); overflow-wrap: anywhere; line-height: 1.3 }
.citizen-family .np-dialog header > div { min-width: 0 }
.citizen-family :is(.service-card, .family-heading, .family-total, .linked-requests, .application-row) { min-width: 0; overflow-wrap: anywhere }
.citizen-family .np-card-heading { gap: 8px }
.citizen-family .service-line { align-items: flex-start; flex-wrap: wrap; gap: 7px }
.citizen-family .service-line .np-button { margin-inline-start: 0 }
.citizen-family .family-members button { min-width: 0; padding: 8px }
</style>

<style scoped>
.family-address-details { display: grid; gap: 4px; margin: 8px 0; font-size: 12px; }
.family-address-details div { display: flex; flex-wrap: wrap; gap: 4px 8px; }
.family-address-details dt { color: var(--muted-foreground); }
.family-address-details dd { margin: 0; font-weight: 550; }
</style>

<style scoped>
.family-composition { margin: 14px 0; }
.family-composition h3 { font-size: 15px; margin-bottom: 12px; }
.family-composition td { vertical-align: top; }
.family-composition td small { display: block; margin-top: 5px; color: var(--muted-foreground); font-size: 11px; }
</style>

<style scoped>
.family-support-enter { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border); color: var(--primary); font-size: 13px; font-weight: 650; }
</style>

<style scoped>
.member-support-list { display: grid; gap: 14px; margin-top: 16px; }
.member-support-card { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.member-support-card header { display: grid; gap: 8px; padding: 14px; background: color-mix(in srgb,var(--primary) 7%,var(--card)); }
.member-support-card h4 { font-size: 14px; font-weight: 700; }
.member-support-card small { display: block; color: var(--muted-foreground); margin-top: 4px; font-size: 11px; }
.member-support-card strong { color: var(--primary); font-size: 13px; }
.member-support-card button { display: grid; gap: 7px; width: 100%; text-align: start; padding: 12px 14px; border-top: 1px solid var(--border); font-size: 12px; }
.member-support-card p { padding: 12px 14px; color: var(--muted-foreground); font-size: 12px; }
</style>

<style scoped>
.recommended-services-info { margin: 16px 0; }
.recommended-services-info h3 { font-size: 15px; }
.recommended-services-info p { font-size: 12px; line-height: 1.6; color: var(--muted-foreground); margin: 8px 0 12px; }
.recommended-services-info button { display: flex; align-items: center; gap: 8px; }
</style>
