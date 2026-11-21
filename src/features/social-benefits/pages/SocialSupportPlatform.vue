<script setup lang="ts">
import { benefitText, useI18n } from '@/shared/i18n'
import {computed,ref,watch,nextTick} from 'vue'
import {BookOpen,ShieldCheck,ArrowUpRight,ArrowRight,Download,ListFilter,ChevronRight,X,Info,Landmark,Wallet,AlertTriangle,CheckCircle2,FileText} from 'lucide-vue-next'
import {data,latin,num,money,sum,months,organization,aggregateFinance,auditTitles,saveCSV,type Registry,type FinanceRow,type AuditCase} from '../presentation/native/data'
import {platformViews, viewFilters} from '../config'
import { socialBenefitsScope } from '../filter-scope'
import PlatformAbout from '../presentation/native/PlatformAbout.vue'
import BenefitChannel from '../presentation/native/BenefitChannel.vue'
import LiveOperations from '../presentation/native/LiveOperations.vue'
import InsightsExplorer from '../presentation/native/InsightsExplorer.vue'
import MetricValue from '../presentation/native/MetricValue.vue'
import OverviewCoverage from '../presentation/native/OverviewCoverage.vue'
import { fundingCoverage } from '../presentation/native/report-output'
import PlatformSearch from '../presentation/native/PlatformSearch.vue'
import SvodCard from '../presentation/native/SvodCard.vue'
import SvodPanel from '../presentation/native/SvodPanel.vue'
import { byRegistry, searchKey, type Measure } from '../presentation/native/svod'
import ReportPanel from '../presentation/native/ReportPanel.vue'
import RequestReport from '../presentation/native/RequestReport.vue'
import { formatRequestId, requestAgencyKeys, requestStatusLabels, usePrototypeRequests } from '../presentation/native/prototype-requests'
import {useRoute,useRouter} from 'vue-router'
import RegistryPanel from '../presentation/native/RegistryPanel.vue'
import PassportDirectory from '../presentation/native/PassportDirectory.vue'
import FamilyPanel from '../presentation/native/FamilyPanel.vue'
import AuditPanel from '../presentation/native/AuditPanel.vue'
import FinancialPanel from '../presentation/native/FinancialPanel.vue'
const {locale} = useI18n()
const props=defineProps<{view:string}>()
const router = useRouter()
const route = useRoute()
const { events: requests, reset: resetRequests } = usePrototypeRequests()
const defaultFamily = data.families.find(f => f.members.length >= 3 && f.members.every(m => m.source)) ?? data.families[0]!
const cabinetSections = [{key:'home',title:'Asosiy'},{key:'payments',title:'To‘lovlar'},{key:'family',title:'Oila'},{key:'services',title:'Xizmatlar'},{key:'requests',title:'Arizalar'}]
const cabinetSection = computed(() => cabinetSections.find(item => item.key === route.query.section)?.key ?? 'home')
const currentView = computed(() => platformViews.find(item => item.key === props.view) ?? platformViews[0])
const role = computed(() => props.view === 'cabinet' ? 'citizen' : ['audit','family'].includes(currentView.value.tab) ? 'staff' : 'leader')
const tab = computed(() => {
 if (role.value === 'citizen') return ['requests','services'].includes(cabinetSection.value) ? 'services' : 'family'
 if (currentView.value.tab === 'finance') return 'finance'
 return selection.value?.key === 'requests' ? 'requests-report' : selection.value?.key ?? currentView.value.tab
})
function writeFilter(key: string, value: string) {
 const query = { ...route.query }
 if (value) query[key] = value
 else delete query[key]
 void router.replace({ path: route.path, query, hash: route.hash })
}
const year = computed({
 get: () => [2024,2025,2026].includes(Number(route.query.year)) ? Number(route.query.year) : 2025,
 set: value => writeFilter('year', value === 2025 ? '' : String(value)),
})
const period = computed({
 get: () => typeof route.query.period === 'string' && /^(all|q[0-3]|upto(?:[0-9]|1[01])|(?:[0-9]|1[01])|months:(?:[0-9]|1[01])(?:,(?:[0-9]|1[01]))*)$/.test(route.query.period) ? route.query.period : 'all',
 set: value => writeFilter('period', value === 'all' ? '' : value),
})
const region = computed({
 get: () => typeof route.query.region === 'string' && /^(?:[0-9]|1[0-3])$/.test(route.query.region) ? route.query.region : '',
 set: value => writeFilter('region', value),
})
const agency = computed({
 get: () => typeof route.query.agency === 'string' ? route.query.agency : '',
 set: value => writeFilter('agency', value),
})
const auditInitial = computed(() => data.audit[Number(route.query.signal)] ? Number(route.query.signal) : 0)
const requestId = computed(() => requests.value.find(item => item.id === Number(route.query.request))?.id)
function showCabinetSection(key:string) {
 void router.push({ path: route.path, query: { ...route.query, section: key === 'home' ? undefined : key } })
}
const monthSelection = computed<number[]>({
 get: () => selectedMonths.value,
 set: values => { period.value = values.length ? 'months:' + [...values].sort((a,b)=>a-b).join(',') : 'all' },
})
const selectedMonths = computed<number[]>(()=>period.value.startsWith('months:') ? period.value.slice(7).split(',').map(Number) : period.value==='all'?months.map((_,i)=>i):period.value.startsWith('upto')?months.map((_,i)=>i).filter(i=>i<=+period.value.slice(4)):period.value.startsWith('q')?months.map((_,i)=>i).filter(i=>Math.floor(i/3)===+period.value.slice(1)): [+period.value])
const finance=computed(()=>data.finance.filter(l=>!agency.value||l.o===agency.value).map(l=>aggregateFinance(l,year.value,region.value,selectedMonths.value)).filter(r=>r.total||r.count))
const agencyOptions = Object.fromEntries([
 ...Object.entries(data.organizations),
 ...data.agencies.filter(item => !Object.values(data.organizations).includes(item.n))
  .map(item => ['m:' + item.n, item.n] as const),
])
const scopedLines = computed(() => data.finance.filter(line => !agency.value || line.o === agency.value))
const funding = computed(() => fundingCoverage(scopedLines.value,year.value,region.value,selectedMonths.value))
const regionCoverage = computed(() => data.regions.map((name,index) => ({
 name,index,...fundingCoverage(scopedLines.value,year.value,String(index),selectedMonths.value),
})))
const agencyCoverage = computed(() => Object.entries(agencyOptions).map(([key,name]) => ({
 key,name,...fundingCoverage(data.finance.filter(line => line.o === key),year.value,region.value,selectedMonths.value),
})).sort((a,b) => (b.amount ?? -1) - (a.amount ?? -1)))
const filterChips = computed(() => [
 ...(year.value !== 2025 && ['overview','finance','reports'].includes(tab.value) && analysisCut.value !== 'people' ? [String(year.value)] : []),
 ...(period.value !== 'all' && ['overview','finance','reports'].includes(tab.value) ? [selectedMonths.value.map(index => months[index]).join(', ')] : []),
 ...(region.value !== '' && ['overview','finance','reports','flow','requests-report'].includes(tab.value) ? [scope.value] : []),
 ...(agency.value && ['overview','finance','reports','flow','requests-report'].includes(tab.value) && analysisCut.value !== 'people' ? [organization(agency.value)] : []),
 ...(selection.value && selection.value !== options.value[0] ? [selection.value.title] : []),
])
const distributionBy=ref<'types'|'directions'|'cohorts'>('types')
const breakdownRows=computed(()=>{
 const field={types:'t',directions:'d',cohorts:'c'} as const
 return Object.entries(data.labels[distributionBy.value]).map(([id,label])=>{
   const subset=finance.value.filter(row=>row.line[field[distributionBy.value]]===id)
   return {id,label,amount:sum(subset.map(row=>row.total)),count:subset.length}
 }).filter(row=>row.count).sort((a,b)=>b.amount-a.amount)
})
const total=computed(()=>sum(finance.value.map(x=>x.total)))
const monthly=computed(()=>months.map((_,i)=>sum(finance.value.map(x=>x.values[i]?.s??0))))
const maxMonthly=computed(()=>Math.max(...monthly.value,1))
const shares=computed(()=>Object.entries(data.organizations).map(([key,name])=>({key,name,amount:sum(finance.value.filter(r=>r.line.o===key).map(r=>r.total))})).filter(x=>x.amount).sort((a,b)=>b.amount-a.amount))
const colors=['#087b65','#578c9a','#82b29e','#b09a71','#64798c']
const ring=computed(()=>{let at=0;return 'conic-gradient('+shares.value.map((s,i)=>{const start=at;at+=s.amount/Math.max(total.value,1)*100;return colors[i%colors.length]+' '+start+'% '+at+'%'}).join(',')+')'})
const duplicateReview = computed(() => requests.value.find(item => item.id === 27))
const scope=computed(()=>region.value===''?'Respublika':latin(data.regions[+region.value]))
const dataLabel=computed(()=>tab.value==='finance'&&analysisCut.value==='people'?'2025-yil nafaqa bazasi':year.value===2025&&period.value==='all'?'2025-yil manba ko‘rsatkichlari':year.value!==2025?'Namunaviy yil ko‘rsatkichlari':'Oylik taqsimot — namunaviy')
const rankBy = ref<'total'|'count'>('total')
const topMeasures=computed(()=>finance.value.filter(row => rankBy.value==='total' || row.line.cnt!==null).sort((a,b)=>b[rankBy.value]-a[rankBy.value]).slice(0,10))
const quarters = computed(() => Array.from({length:4}, (_,quarter) => {
 const indices=[0,1,2].map(i=>quarter*3+i)
 const amount=(y:number)=>sum(data.finance.filter(l=>!agency.value||l.o===agency.value).map(l=>aggregateFinance(l,y,region.value,indices).total))
 const current=amount(year.value), previous=amount(year.value-1)
 return {current,delta:previous?(current-previous)/previous*100:null}
}))
function searchFinance(id:string) {
 const line=data.finance.find(item=>item.id===id)
 if(line) open({kind:'finance',item:aggregateFinance(line,year.value,region.value,selectedMonths.value)})
}
const root=ref<HTMLElement|null>(null),dialog=ref<HTMLElement|null>(null)
type Drawer={kind:'svod';item:Measure}|{kind:'registry';item:Registry}|{kind:'finance';item:FinanceRow}|{kind:'audit';item:AuditCase;category:number}|{kind:'receipt';title:string;lines:string[]}|{kind:'methodology'}
const drawer=ref<Drawer|null>(null),reviewOwner=ref(''),reviewNote=ref(''),reviewDue=ref(''),reviewRefresh=ref(0),reviewState=ref('Tekshirilmoqda'),reviewMessage=ref('')
let previousFocus:HTMLElement|null=null
function open(value:Drawer){previousFocus=document.activeElement as HTMLElement;drawer.value=value;reviewMessage.value='';reviewNote.value='';reviewOwner.value='';reviewDue.value='';reviewState.value='Tekshirilmoqda';if(value.kind==='audit'){try{const stored=JSON.parse(localStorage.getItem('nasp-social-review-'+value.category+'-'+value.item.id)??'null');if(stored){reviewOwner.value=stored.owner;reviewNote.value=stored.note;reviewState.value=stored.state;reviewDue.value=stored.due??''}}catch{}}nextTick(()=>dialog.value?.focus())}
function close(){drawer.value=null;previousFocus?.focus()}
function trap(event:KeyboardEvent){if(event.key==='Escape'){close();return}if(event.key!=='Tab'||!dialog.value)return;const nodes=[...dialog.value.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href]')].filter(el=>!el.hasAttribute('disabled'));const first=nodes[0],last=nodes[nodes.length-1];if(event.shiftKey&&(document.activeElement===first||document.activeElement===dialog.value)){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}
function saveReview(){if(drawer.value?.kind!=='audit')return;if(!reviewOwner.value.trim()||!reviewNote.value.trim()){reviewMessage.value='Mas’ul va tekshiruv qaydini kiriting.';return}try{localStorage.setItem('nasp-social-review-'+drawer.value.category+'-'+drawer.value.item.id,JSON.stringify({owner:reviewOwner.value,note:reviewNote.value,state:reviewState.value,due:reviewDue.value}));reviewRefresh.value++;reviewMessage.value='Namunaviy ko‘rib chiqish qaydi shu brauzerda saqlandi.'}catch{reviewMessage.value='Qaydni saqlab bo‘lmadi.'}}
const options = computed(() => viewFilters[props.view] ?? [])
const selection = computed(() => options.value.find(option => option.key === route.query.view) ?? options.value[0])
const analysisCut = computed(() => props.view === 'finance' ? selection.value?.key ?? 'measures' : 'measures')
function selectView(key: string) {
 const query = {...route.query}
 if (key === options.value[0]?.key) delete query.view
 else query.view = key
 void router.push({path: route.path, query, hash: route.hash})
}
const filterDialog = ref<HTMLDialogElement | null>(null)
const filterVersion = ref(0)
const filtersVisible = ref(false)
function showFilters() {
 filtersVisible.value = true
 nextTick(() => filterDialog.value?.querySelector('button')?.focus())
}
function cycleFilterFocus(event: KeyboardEvent) {
 const controls = [...(filterDialog.value?.querySelectorAll<HTMLElement>('button,input,select,summary') ?? [])].filter(el => el.getClientRects().length && !el.hasAttribute('disabled'))
 const first = controls[0], last = controls[controls.length - 1]
 if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
 if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
function hideFilters() {
 filtersVisible.value = false
 root.value?.querySelector<HTMLButtonElement>('.np-header-actions button')?.focus()
}
function openSearchPage(page: string, mode?: string) {
 hideFilters()
 void router.push({name: 'social-benefits-' + page, query: {...socialBenefitsScope(route.query), view: mode}})
}
function go(value: string, cut = 'measures') {
 if (role.value === 'citizen' && ['family','services'].includes(value)) { showCabinetSection(value); return }
 if (value === 'services' && staffFamily.value) { selectView('services'); return }
 const destination = platformViews.find(view => view.tab === (value === 'services' ? 'family' : value))
 if (!destination) return
 void router.push({name: 'social-benefits-' + destination.key, query: {
  ...socialBenefitsScope(route.query),
  view: value === 'services' ? 'services' : value === 'finance' && cut !== 'measures' ? cut : undefined,
 }})
}
function resetFilters() {
 const { year, period, region, agency, view, status, ...query } = route.query
 void router.replace({ path:route.path, query, hash:route.hash })
 filterVersion.value++
}
const routeFamily = computed(() => data.families.find(family => family.id === route.query.family))
const staffFamily = computed(() => props.view === 'platform-family' ? routeFamily.value : undefined)
const staffMember = computed(() => staffFamily.value?.members.find(member => member.id === route.query.member))
const cabinetFamily = computed(() => routeFamily.value ?? defaultFamily)
const cabinetMember = computed(() => cabinetFamily.value.members.find(member => member.id === route.query.member))
const hasPassport = computed(() => !!staffFamily.value && (!route.query.member || !!staffMember.value))
function openFamily(id: string, member?: string, request?: number) {
 filtersVisible.value = false
 const query = props.view === 'platform-family' ? { ...route.query } : socialBenefitsScope(route.query)
 const linked = requests.value.find(item => item.id === Number(query.request) && item.familyId === id && (!member || item.memberId === member))
 void router.push({name:'social-benefits-platform-family', query:{...query, family:id, member:member || undefined, request:request ?? linked?.id}})
}
function openDirectoryFamily(family: string, member?: string, quarter?: number) {
 void router.push({ name:'social-benefits-platform-family', query:{
  ...route.query, family, member:member || undefined, familyQuarter:quarter || undefined,
 } })
}
function backToDirectory() {
 const query = {...route.query}
 delete query.family
 delete query.member
 delete query.request
 void router.push({name:'social-benefits-platform-family', query})
}
function openRegion(index: number) {
 hideFilters()
 void router.push({ name: 'social-benefits-finance', query: { ...socialBenefitsScope(route.query), view: 'regions', region: String(index) } })
}
function openAudit(index:number) {
 void router.push({ name: 'social-benefits-platform-control', query: { ...socialBenefitsScope(route.query), signal: index } })
}
function openExecution(status?: string, id?: number) {
 const event = id === undefined ? undefined : requests.value.find(item => item.id === id)
 const query = socialBenefitsScope(route.query)
 if (event && ((region.value && region.value !== String(event.region)) || (agency.value && requestAgencyKeys[event.agency] !== agency.value))) {
  delete query.region
  delete query.agency
 }
 void router.push({ name:'social-benefits-platform-execution', query: { ...query, status, request:id } })
}
function openRequest(id: number) { openExecution(undefined, id) }
function changeRequestScope(scope: { region:string; agency:string; status:string }) {
 const query = { ...route.query, region:scope.region || undefined, agency:scope.agency || undefined,
  status:scope.status === 'all' ? undefined : scope.status }
 void router.replace({path:route.path, query})
}
function openCabinet(familyId: string, memberId?: string, id?: number) {
 const request = requests.value.find(item => item.id === (id ?? requestId.value))
 const section = request?.status === 'delivered' && request.amount > 0 ? 'payments' : request ? 'requests' : undefined
 void router.push({ name:'social-benefits-cabinet', query: {
  ...socialBenefitsScope(route.query), family:familyId, member:memberId, request:request?.id, section,
 } })
}
function chooseMember(member?: string) {
 if (role.value === 'citizen') {
  void router.replace({path:route.path, query:{...route.query, member:member || undefined}})
 } else if (staffFamily.value) openFamily(staffFamily.value.id, member)
}
function openRequestReport(id: number) {
 void router.push({ name:'social-benefits-reports', query: { ...socialBenefitsScope(route.query), view:'requests', request:id } })
}
function resetPrototype() {
 if (!window.confirm(benefitText('Boshlang‘ich holat tiklansinmi? Shu brauzerdagi namunaviy ariza va tekshiruv qaydlari tozalanadi.'))) return
 resetRequests()
 try {
  for (const key of Object.keys(localStorage)) {
   if (key.startsWith('nasp-social-review-')) localStorage.removeItem(key)
  }
 } catch { /* The request state can still be reset for this session. */ }
 filterVersion.value++
}
const registryFinance = computed(() => {
 if (drawer.value?.kind !== 'registry') return
 const name = searchKey(drawer.value.item.n)
 const matches = data.finance.filter(row => searchKey(row.n) === name)
 return matches.length === 1 ? matches[0] : undefined
})
function exportDashboard(){saveCSV('Yagona_platforma_hisoboti.csv',[['Davr',String(year.value),period.value],['Hudud',scope.value],['Manba',dataLabel.value],['Chora','Idora','Summa mlrd'],...finance.value.map(x=>[latin(x.line.n),organization(x.line.o),x.total])])}
function printReceipt(){window.print()}
const receiptText=computed(()=>drawer.value?.kind==='receipt'?drawer.value.lines:[])
const detailsFinanceRegions=computed(()=>drawer.value?.kind==='finance'?data.regions.map((name,i)=>({name,i,value:aggregateFinance((drawer.value as {kind:'finance';item:FinanceRow}).item.line,year.value,String(i),selectedMonths.value).total})):[])
watch(() => props.view, () => {
 filtersVisible.value = false
 if (drawer.value) close()
 nextTick(() => root.value?.scrollTo(0, 0))
})
watch(staffFamily, () => nextTick(() => root.value?.scrollTo(0, 0)))
watch(cabinetSection, () => nextTick(() => root.value?.querySelector('.cabinet-device .np-view')?.scrollTo(0, 0)))

</script>

<template><div ref="root" class="native-platform" :lang="locale==='uz-Cyrl'?'uz-Cyrl':'uz-Latn'" :class="{'citizen-mode':role==='citizen','benefits-overview':tab==='overview'}">
<header class="np-header"><h1>{{ benefitText(currentView.title) }}</h1>
<div id="benefits-page-actions" class="np-header-actions"><button v-if="tab!=='about'" class="np-button primary" aria-haspopup="dialog" :aria-expanded="filtersVisible" @click="showFilters"><ListFilter :size="16"/>{{ benefitText("Filtr") }}<span v-if="filterChips.length" class="filter-count">{{ filterChips.length }}</span></button><button class="icon-button" :aria-label="benefitText('Ma’lumotlar manbasi')" @click="open({kind:'methodology'})"><Info :size="16"/></button></div></header>
<div v-if="filterChips.length" class="scope-chips" :aria-label="benefitText('Tanlangan kesim')">
  <span v-for="(chip,index) in filterChips" :key="index" class="np-tag blue">{{ benefitText(chip) }}</span>
</div>

<div v-show="filtersVisible" class="filter-backdrop" @click="hideFilters"></div><dialog ref="filterDialog" :open="filtersVisible" aria-modal="true" :aria-label="benefitText('Filtr')" class="filter-sheet" @keydown.esc="hideFilters" @keydown.tab="cycleFilterFocus"><header><h2>{{ benefitText("Filtr") }}</h2><button class="icon-button" :aria-label="benefitText('Yopish')" @click="hideFilters"><X :size="18"/></button></header><label v-if="options.length" class="view-filter">{{ benefitText(props.view==='reports'?'Hisobot turi':props.view==='finance'?'Tahlil kesimi':'Ma’lumot turi') }}<select :value="selection?.key" @change="selectView(($event.target as HTMLSelectElement).value)"><option v-for="option in options" :key="option.key" :value="option.key">{{ benefitText(option.title) }}</option></select></label><PlatformSearch v-if="role!=='citizen'" @page="openSearchPage" @registry="hideFilters();open({kind:'registry',item:$event})" @family="openFamily" @region="openRegion" @finance="hideFilters();searchFinance($event)"/><div v-if="['overview','finance','reports'].includes(tab)" class="np-global-filters"><div v-if="!(tab==='finance'&&analysisCut==='people')" class="period-label"><span>{{ benefitText("Hisobot davri") }}</span><select v-model.number="year" :aria-label="benefitText('Hisobot yili')"><option :value="2024">{{ benefitText("2024 · namunaviy") }}</option><option :value="2025">2025</option><option :value="2026">{{ benefitText("2026 · namunaviy") }}</option></select></div><div class="np-segment"><button v-for="[key,title] in [['all','Yil'],['q0','I chorak'],['q1','II chorak'],['q2','III chorak'],['q3','IV chorak']]" :key="key" :class="{active:period===key}" @click="period=key!">{{ benefitText(title) }}</button></div><details><summary>{{ benefitText("Oylarni tanlash") }}</summary><div class="month-options"><label v-for="(name,i) in months" :key="name"><input v-model="monthSelection" type="checkbox" :value="i"/>{{ benefitText(name) }}</label></div></details><select v-if="!(tab==='finance'&&analysisCut==='people')" v-model="agency" :aria-label="benefitText('Hisobot idorasi')"><option value="">{{ benefitText("Barcha idoralar") }}</option><option v-for="(name,key) in agencyOptions" :key="key" :value="key">{{ benefitText(name) }}</option></select><select v-model="region" :aria-label="benefitText('Hisobot hududi')"><option value="">{{ benefitText("Respublika") }}</option><option v-for="(name,i) in data.regions" :key="i" :value="String(i)">{{ benefitText(name) }}</option></select><span class="np-data-label" :class="year===2025&&period==='all'?'verified':'sample'"><i></i>{{ benefitText(dataLabel) }}</span></div><div v-if="tab==='requests-report'" class="np-global-filters">
  <label>{{ benefitText('Hisobot hududi') }}<select v-model="region"><option value="">{{ benefitText('Respublika') }}</option><option v-for="(name,i) in data.regions" :key="i" :value="String(i)">{{ benefitText(name) }}</option></select></label>
  <label>{{ benefitText('Hisobot idorasi') }}<select v-model="agency"><option value="">{{ benefitText('Barcha idoralar') }}</option><option v-for="key in requestAgencyKeys" :key="key" :value="key">{{ benefitText(organization(key)) }}</option></select></label>
</div><div id="support-filter-fields"></div><footer><button class="np-button" @click="resetFilters">{{ benefitText("Tozalash") }}</button><button class="np-button primary" @click="hideFilters">{{ benefitText("Natijani ko‘rish") }}</button></footer></dialog><div :class="role==='citizen'?'cabinet-device':'module-content'"><div v-if="role==='citizen'" class="device-speaker" aria-hidden="true"></div><nav v-if="role==='citizen'" class="np-tabs" :aria-label="benefitText('Kabinet bo‘limlari')"><button v-for="item in cabinetSections" :key="item.key" :class="{active:cabinetSection===item.key}" :aria-current="cabinetSection===item.key?'page':undefined" @click="showCabinetSection(item.key)">{{ benefitText(item.title) }}</button></nav><main :key="(props.view==='platform-family'?props.view:tab)+filterVersion" class="np-view"><PassportDirectory v-if="props.view==='platform-family'" :active="!hasPassport" @open="openDirectoryFamily"/><div v-if="props.view==='platform-family' && hasPassport" class="heading-actions"><button class="np-button" @click="backToDirectory">{{ benefitText('Pasportlar ro‘yxatiga qaytish') }}</button><button v-if="requestId" class="np-button" @click="openRequest(requestId)">{{ formatRequestId(requestId) }}<ArrowUpRight :size="14"/></button></div><template v-if="tab==='overview'"><section class="executive-metrics coverage-metrics" :aria-label="benefitText('Ijtimoiy qo‘llab-quvvatlash ko‘rsatkichlari')">
  <button class="executive-metric" @click="go('finance')">
    <div><span class="metric-icon blue"><Wallet :size="19"/></span><ArrowUpRight :size="15"/></div>
    <p>{{ benefitText('Moliyalashtirilgan mablag‘') }}</p>
    <strong v-if="funding.amount !== null">{{ benefitText(money(funding.amount)) }}<small>{{ benefitText('so‘m') }}</small></strong>
    <strong v-else>—</strong>
    <footer><span class="np-tag blue">{{ benefitText(scope) }}</span><span>{{ benefitText(dataLabel) }}</span></footer>
  </button>
  <button class="executive-metric" @click="go('finance')">
    <div><span class="metric-icon teal"><CheckCircle2 :size="19"/></span><ArrowUpRight :size="15"/></div>
    <p>{{ benefitText('Moliyaviy hisobdagi choralar') }}</p>
    <strong>{{ funding.measures === null ? '—' : num(funding.measures) }}</strong>
    <footer><span class="np-tag green">{{ benefitText(scope) }}</span><span>{{ benefitText('Chora yozuvlari') }}</span></footer>
  </button>
  <button class="executive-metric" @click="go('registry')">
    <div><span class="metric-icon purple"><BookOpen :size="19"/></span><ArrowUpRight :size="15"/></div>
    <p>{{ benefitText('Davlat qo‘llab-quvvatlash choralari') }}</p>
    <strong><MetricValue :value="data.registryTotal"/><small>{{ benefitText('chora') }}</small></strong>
    <footer><span class="np-tag purple">{{ benefitText(data.agencies.length) }} {{ benefitText('idora') }}</span><span>{{ benefitText('Respublika yig‘masi') }}</span></footer>
  </button>
</section>
<OverviewCoverage :regions="regionCoverage" :organizations="agencyCoverage" :region="region"
  :agency="agency" :year="year" :amount="funding.amount" @region="region=$event" @agency="agency=$event"/>
<BenefitChannel :region="region" :agency="agency" @open="openExecution"/>
<div class="executive-grid"><section class="np-card monthly-card"><div class="np-card-heading"><div><h3>{{ benefitText("Davlat ko‘magining oylik dinamikasi") }}</h3><p>{{ benefitText(year) }}{{ benefitText("-yil · ") }}{{ benefitText(scope) }}{{ benefitText(" · mlrd so‘m") }}</p></div><div class="mini-total"><b>{{ benefitText(money(total*1e9)) }}</b><small>{{ benefitText("Tanlangan davr") }}</small></div></div><div class="np-month-chart"><button v-for="(value,i) in monthly" :key="i" :class="{selected:period===String(i),dim:!selectedMonths.includes(i)}" :title="benefitText(months[i]+': '+money(value*1e9)+' so‘m')" @click="period=period===String(i)?'all':String(i)"><b>{{ num(value,0) }}</b><i :style="{height:Math.max(2,value/maxMonthly*100)+'%',animationDelay:i*55+'ms'}"/><span>{{ benefitText(months[i]) }}</span></button></div><div class="chart-foot"><span><i></i>{{ benefitText("Ko‘rsatilgan ko‘mak") }}</span><small>{{ benefitText("Oylik taqsimot namunaviy") }}</small></div></section><section class="np-card agency-card"><div class="np-card-heading"><div><h3>{{ benefitText("Idoralar ulushi") }}</h3><p>{{ benefitText("Tanlangan summa taqsimoti") }}</p></div><Landmark :size="17"/></div><div class="agency-donut"><div class="donut" :style="{background:shares.length?ring:'#edf1f7'}"><div><strong>{{ benefitText(shares.length) }}</strong><span>{{ benefitText("idora") }}</span></div></div><div class="donut-legend"><button v-for="(item,i) in shares" :key="item.key" @click="agency=agency===item.key?'':item.key"><i :style="{background:colors[i%colors.length]}"/><span>{{ benefitText(organization(item.key).replace('Ijtimoiy himoya milliy agentligi','IHMA')) }}</span><b>{{ num(item.amount/Math.max(total,1)*100,1) }}%</b></button><p v-if="!shares.length">{{ benefitText("Tanlov bo‘yicha ma’lumot yo‘q.") }}</p></div></div><button class="card-link" @click="go('finance')">{{ benefitText("Choralar bo‘yicha ochish ") }}<ArrowRight :size="14"/></button></section></div><section class="np-card"><h3>{{ benefitText("Choraklar bo‘yicha ko‘mak") }}</h3><small>{{ benefitText(year) }} · {{ benefitText(scope) }}{{ benefitText(" · oylik taqsimot namunaviy") }}</small><div class="quarter-comparison"><button v-for="(q,i) in quarters" :key="i" :aria-pressed="period==='q'+i" @click="period='q'+i"><span>{{ benefitText(['I','II','III','IV'][i]) }}{{ benefitText(" chorak") }}</span><b>{{ benefitText(money(q.current*1e9)) }}{{ benefitText(" so‘m") }}</b><small v-if="q.delta!==null">{{ benefitText(q.delta>0?'+':'') }}{{ num(q.delta,1) }}{{ benefitText("% · o‘tgan yilga nisbatan") }}</small></button></div></section><section class="np-card"><div class="np-card-heading"><h3>{{ benefitText("Davlat ko‘magi tarkibi") }}</h3><div class="np-segment"><button v-for="item in ([['types','Tur'],['directions','Yo‘nalish'],['cohorts','Aholi toifasi']] as const)" :key="item[0]" :aria-pressed="distributionBy===item[0]" :class="{active:distributionBy===item[0]}" @click="distributionBy=item[0]">{{ benefitText(item[1]) }}</button></div></div><div class="np-table-wrap"><table class="np-table"><thead><tr><th>{{ benefitText("Guruh") }}</th><th>{{ benefitText("Choralar") }}</th><th>{{ benefitText("Summa, mlrd so‘m") }}</th><th>{{ benefitText("Ulushi") }}</th></tr></thead><tbody><tr v-for="row in breakdownRows" :key="row.id"><td>{{ benefitText(row.label) }}</td><td>{{ benefitText(row.count) }}</td><td>{{ num(row.amount,2) }}</td><td>{{ total ? num(row.amount/total*100,1) : "—" }}%</td></tr><tr v-if="!breakdownRows.length"><td colspan="4">{{ benefitText("Tanlov bo‘yicha summa ma’lumoti yo‘q.") }}</td></tr></tbody></table></div></section><InsightsExplorer :year="year" :agency="agency" :period="period" :selected-months="selectedMonths" @period="period=$event" @region="region=$event"/><section class="np-card"><div class="np-card-heading"><div><h3>{{ benefitText("E’tibor talab qiladigan holatlar") }}</h3><p>{{ benefitText("Nafaqa bazasidagi nazorat signallari") }}</p></div><ShieldCheck :size="18"/></div><button v-for="(item,i) in data.audit.slice(0,4)" :key="item.k" class="signal-link" @click="openAudit(i)"><span class="signal-dot" :class="i<2?'red':'amber'"><AlertTriangle :size="16"/></span><span><b>{{ benefitText(auditTitles[i]) }}</b><small>{{ benefitText(i<2?'Ortiqcha to‘lov signali':'Asosini tekshirish kerak') }}</small></span><strong>{{ num(item.n) }}</strong><ChevronRight :size="15"/></button><div class="positive-note"><CheckCircle2 :size="17"/><p>{{ benefitText("Bir oylik to‘lovning ikki oluvchiga bo‘linishi alohida kuzatiladi. Bu avtomatik ortiqcha to‘lov hisoblanmaydi.") }}</p></div><button class="card-link" @click="go('audit')">{{ benefitText("Barcha 6 signal turini ko‘rish ") }}<ArrowRight :size="14"/></button></section><section class="np-card"><div class="np-card-heading"><div><h3>{{ benefitText("Eng yuqori 10 ta chora") }}</h3><p>{{ benefitText("Tanlangan davr va hudud bo‘yicha") }}</p></div><button class="np-button" @click="exportDashboard"><Download :size="14"/>{{ benefitText("Hisobot") }}</button></div><Teleport defer to="#support-filter-fields"><label>{{ benefitText("Choralar reytingi") }}<select v-model="rankBy"><option value="total">{{ benefitText("Summa bo‘yicha") }}</option><option value="count">{{ benefitText("Oluvchilar soni bo‘yicha") }}</option></select></label></Teleport><div class="top-measures"><button v-for="(row,i) in topMeasures" :key="row.line.id" @click="open({kind:'finance',item:row})"><span>{{ String(i+1).padStart(2,'0') }}</span><div><b>{{ benefitText(row.line.n) }}</b><small>{{ benefitText(organization(row.line.o)) }}</small></div><i><em :style="{width:row[rankBy]/(topMeasures[0]?.[rankBy]||1)*100+'%'}"/></i><strong>{{ benefitText(rankBy==='total'?money(row.total*1e9):num(row.count)+' nafar') }}</strong><ArrowUpRight :size="15"/></button></div></section></template><RegistryPanel v-else-if="tab==='registry'" @open="open({kind:'registry',item:$event})"/><FinancialPanel v-else-if="tab==='finance'" :cut="analysisCut" :year="analysisCut==='people'?2025:year" :region="region" :agency="analysisCut==='people'?'':agency"  :selected-months="selectedMonths" @region="region=$event" @open="open({kind:'finance',item:$event})" @family="openFamily" @district="go('finance','people')"/><FamilyPanel v-else-if="(tab==='family'||tab==='services') && (role==='citizen'||hasPassport)"
  :key="tab+(staffFamily?.id??cabinetFamily.id)" :family-id="staffFamily?.id??cabinetFamily.id"
  :member-id="role==='citizen'?cabinetMember?.id:staffMember?.id" :section="role==='citizen'?cabinetSection:undefined"
  :request-id="requestId" :initial-quarter="Number(route.query.familyQuarter)||0" :role="role" :services="tab==='services'" @member="chooseMember" @services="go('services')" @requests="showCabinetSection('requests')"
  @cabinet="openCabinet" @execution="openRequest" @receipt="open({kind:'receipt',...$event})"/>
<template v-else-if="tab==='audit'">
  <section v-if="duplicateReview" class="np-card prototype-review">
    <div>
      <h3>{{ benefitText('Takroriy so‘rovni tekshirish') }}</h3>
      <p>{{ formatRequestId(duplicateReview.id) }} · {{ benefitText(requestStatusLabels[duplicateReview.status]) }}</p>
    </div>
    <button class="np-button" @click="openRequest(duplicateReview.id)">{{ benefitText('So‘rovni ochish') }}<ArrowUpRight :size="14"/></button>
  </section>
  <AuditPanel :key="auditInitial" :initial="auditInitial" :review-refresh="reviewRefresh" @open="open({kind:'audit',...$event})"/>
</template>
<LiveOperations v-else-if="tab==='flow'" :initial-status="typeof route.query.status==='string'?route.query.status:undefined"
  :request-id="requestId" :initial-region="region" :initial-agency="agency" @scope="changeRequestScope" @passport="openFamily" @cabinet="openCabinet" @report="openRequestReport"/>
<SvodPanel v-else-if="tab==='svod'||tab==='proposals'" :proposals="tab==='proposals'" @open="open({kind:'svod',item:$event})"/>
<ReportPanel v-else-if="tab==='reports'" :year="year" :agency="agency" :region="region" :selected-months="selectedMonths"/>
<RequestReport v-else-if="tab==='requests-report'" :region="region" :agency="agency" :request-id="requestId" @request="openRequest" @clear="writeFilter('request','')"/>
<template v-else-if="tab==='about'">
  <PlatformAbout @execution="openExecution()" @passport="go('family')"/>
  <section class="np-card prototype-review">
    <div><h3>{{ benefitText('Namunaviy yozuvlar') }}</h3><p>{{ benefitText('So‘rovlar, arizalar va tekshiruv qaydlarining boshlang‘ich holati') }}</p></div>
    <button class="np-button" @click="resetPrototype">{{ benefitText('Boshlang‘ich holatni tiklash') }}</button>
  </section>
</template></main><div v-if="role==='citizen'" class="device-home" aria-hidden="true"></div></div>
<div v-if="drawer" class="np-overlay" @click.self="close"><section ref="dialog" class="np-dialog main-dialog" :class="{'receipt-dialog':drawer.kind==='receipt'}" role="dialog" aria-modal="true" aria-labelledby="detail-heading" tabindex="-1" @keydown="trap"><header><div><span class="np-eyebrow">{{ benefitText(drawer.kind==='audit'?'NAZORAT DALILI':drawer.kind==='registry'?'CHORA KARTOCHKASI':drawer.kind==='receipt'?'NAMUNAVIY HUJJAT':'BATAFSIL MA’LUMOT') }}</span><h2 id="detail-heading">{{ benefitText(drawer.kind==='svod'?benefitText(drawer.item.name):drawer.kind==='registry'?benefitText(drawer.item.n):drawer.kind==='finance'?benefitText(drawer.item.line.n):drawer.kind==='audit'?'Holat #'+drawer.item.id:drawer.kind==='receipt'?drawer.title:'Ma’lumotlar qamrovi va hisoblash') }}</h2></div><button class="icon-button" :aria-label="benefitText('Tafsilotni yopish')" @click="close"><X :size="21"/></button></header><SvodCard v-if="drawer.kind==='svod'" :item="drawer.item"/><template v-else-if="drawer.kind==='registry'"><div class="detail-tags"><span class="np-tag blue">{{ benefitText(data.types[drawer.item.ti]) }}</span><span class="np-tag purple">{{ benefitText(data.fields[drawer.item.fi]) }}</span></div><dl class="detail-list"><dt>{{ benefitText("Mas’ul idora") }}</dt><dd>{{ benefitText(drawer.item.o) }}</dd><dt>{{ benefitText("Aholi toifasi") }}</dt><dd>{{ benefitText(drawer.item.cn) }}</dd><dt>{{ benefitText("Huquqiy asos") }}</dt><dd>{{ benefitText(benefitText(drawer.item.b)||'Manba yozuvida alohida ko‘rsatilmagan') }}</dd></dl><SvodCard v-if="byRegistry.has(drawer.item.id)" :item="byRegistry.get(drawer.item.id)!"/><button v-if="registryFinance" class="np-button" @click="searchFinance(registryFinance.id)">{{ benefitText('Moliyaviy ko‘rsatkichlar') }}<ArrowUpRight :size="14"/></button><h3>{{ benefitText("Shu toifa va yo‘nalishdagi choralar") }}</h3><button v-for="r in data.registry.filter(x=>x.ci===(drawer as any).item.ci&&x.fi===(drawer as any).item.fi&&x.id!==(drawer as any).item.id).slice(0,8)" :key="r.id" class="related-measure" @click="open({kind:'registry',item:r})"><span>{{ benefitText(r.n) }}</span><ChevronRight :size="15"/></button></template><template v-else-if="drawer.kind==='finance'"><p class="detail-subtitle">{{ benefitText(organization(drawer.item.line.o)) }} · {{ benefitText(year) }} · {{ benefitText(scope) }}</p><div class="detail-stats"><div><span>{{ benefitText("Ko‘rsatilgan ko‘mak") }}</span><strong>{{ benefitText(money(drawer.item.total*1e9)) }}</strong><small>{{ benefitText("so‘m") }}</small></div><div><span>{{ benefitText(drawer.item.line.k==='m'?'O‘rtacha oylik oluvchi':'Oluvchilar') }}</span><strong>{{ benefitText(drawer.item.line.cnt===null?'—':num(drawer.item.count)) }}</strong></div></div><h3>{{ benefitText("Oylar bo‘yicha") }}</h3><div class="detail-months"><div v-for="(value,i) in drawer.item.values" :key="i"><span>{{ benefitText(months[i]) }}</span><b>{{ benefitText(money(value.s*1e9)) }}</b><small>{{ num(value.c) }}{{ benefitText(" oluvchi") }}</small></div></div><h3>{{ benefitText("Hududlar bo‘yicha") }}</h3><p v-if="!detailsFinanceRegions.some(x=>x.value)" class="np-note">{{ benefitText("Bu chora uchun hudud kesimi manbada berilmagan.") }}</p><button v-for="r in detailsFinanceRegions.filter(x=>x.value)" :key="r.i" class="related-measure" @click="region=String(r.i);close();go('finance')"><span>{{ benefitText(r.name) }}</span><b>{{ benefitText(money(r.value*1e9)) }}</b><ArrowRight :size="13"/></button><template v-if="drawer.item.line.id==='w1'"><h3>{{ benefitText("Yo‘nalishlar bo‘yicha oluvchilar") }}</h3><div v-for="[name,count] in data.womenSubsidies" :key="name" class="related-measure"><span>{{ benefitText(name) }}</span><b>{{ num(count) }}</b></div></template><h3>{{ benefitText("Shu chorani olgan namunaviy oilalar") }}</h3><button v-for="f in data.families.filter(f=>f.members.some(m=>m.rows.some(r=>r.id===(drawer as any).item.line.id))).slice(0,20)" :key="f.id" class="related-measure" @click="close();openFamily(f.id)"><span>{{ benefitText(f.members[0]?.name) }}</span><ArrowUpRight :size="14"/></button><p class="np-note">{{ benefitText(dataLabel) }}{{ benefitText(". Oila F.I.Sh.lari shartli.") }}</p></template><template v-else-if="drawer.kind==='audit'"><span class="np-tag" :class="drawer.category<3?'red':drawer.category===3?'amber':'blue'">{{ benefitText(auditTitles[drawer.category]) }}</span><p class="detail-subtitle">{{ benefitText(data.regions[data.regionMap[drawer.item.ri]!]) }}{{ benefitText(drawer.item.age?' · '+drawer.item.age+' yosh':'') }}</p><p class="np-note">{{ benefitText(data.audit[drawer.category]?.why) }}</p><div v-if="drawer.item.m" class="np-table-wrap"><table class="np-table audit-evidence"><thead><tr><th>{{ benefitText("Nafaqa") }}</th><th v-for="m in months" :key="m">{{ benefitText(m) }}</th></tr></thead><tbody><tr v-for="[t,values] in drawer.item.m" :key="t"><td>{{ benefitText(data.benefitTypes[t]) }}</td><td v-for="(value,i) in values" :key="i" :class="value>=Math.min(...values.filter(v=>v>0))*1.8?'evidence-alert':''">{{ benefitText(value?num(value/1000):'—') }}</td></tr></tbody></table></div><p v-if="drawer.item.m" class="np-note">{{ benefitText("Ming so‘mda. Rang bilan odatiy to‘lovdan sezilarli yuqori bo‘lgan oy ajratilgan.") }}</p><div v-else class="detail-stats"><div><span>{{ benefitText("Vakil orqali oluvchilar") }}</span><strong>{{ benefitText(drawer.item.n) }}</strong></div><div><span>{{ benefitText("Yillik summa") }}</span><strong>{{ benefitText(money(drawer.item.s??0)) }}</strong></div></div><form class="review-form" @submit.prevent="saveReview"><h3>{{ benefitText("Mas’ul ko‘rib chiqishi") }}</h3><label>{{ benefitText("Mas’ul") }}<input v-model="reviewOwner" :placeholder="benefitText('Mas’ul xodim yoki bo‘lim')"/></label><label>{{ benefitText('Ko‘rib chiqish muddati') }}<input v-model="reviewDue" type="date"/></label><label>{{ benefitText("Ko‘rib chiqish holati") }}<select v-model="reviewState"><option value="Tekshirilmoqda">{{ benefitText("Tekshirilmoqda") }}</option><option value="Qo‘shimcha dalil kerak">{{ benefitText("Qo‘shimcha dalil kerak") }}</option><option value="Tekshiruv qaydi tayyor">{{ benefitText("Tekshiruv qaydi tayyor") }}</option></select></label><label>{{ benefitText("Dalil va izoh") }}<textarea v-model="reviewNote" rows="3" :placeholder="benefitText('Tekshirilgan holat va asosni yozing')"/></label><button class="np-button primary" type="submit">{{ benefitText("Qaydni saqlash") }}</button><p v-if="reviewMessage" class="np-note" role="status">{{ benefitText(reviewMessage) }}</p><small>{{ benefitText("Bu qayd to‘lov yoki fuqaroga ko‘makni o‘zgartirmaydi.") }}</small></form></template><template v-else-if="drawer.kind==='receipt'"><div class="receipt-paper"><span>{{ benefitText("YAGONA IJTIMOIY PLATFORMA") }}</span><h3>{{ benefitText(drawer.title) }}</h3><p v-for="(line,i) in receiptText" :key="i">{{ benefitText(line) }}</p></div><button class="np-button primary no-print" @click="printReceipt"><FileText :size="14"/>{{ benefitText("Chop etish / PDF") }}</button></template><template v-else><div class="method-grid"><article><span class="np-tag green">{{ benefitText("Manba ko‘rsatkichi") }}</span><h3>{{ benefitText("2025-yil") }}</h3><p>{{ benefitText("Idoralar kesimidagi yillik summa va son, IHMAning 14 hududi bo‘yicha vedomost ijrosi, 37 idora va 577 chora yig‘masi.") }}</p></article><article><span class="np-tag green">{{ benefitText("Nafaqa bazasi") }}</span><h3>{{ benefitText("Fuqaro va nazorat") }}</h3><p>{{ benefitText("701 468 nafaqa oluvchi, 12 oy, 208 tuman, shaxsi yashirilgan pasportlar va nazorat dalillari.") }}</p></article><article><span class="np-tag amber">{{ benefitText("Namunaviy") }}</span><h3>{{ benefitText("Model va jarayonlar") }}</h3><p>{{ benefitText("2024 va 2026-yillar, oylik taqsimotning ayrim qismlari, idoralararo signallar, tavsiyalar va arizalar.") }}</p></article></div><h3>{{ benefitText("Qamrov va talqin") }}</h3><ul class="method-list"><li>{{ benefitText("Reyestrda 613 ta idora-chora yozuvi bor. 577 — manbadagi yig‘ma chora soni.") }}</li><li>{{ benefitText("Moliyaviy jadvalda 44 ta chora mavjud. Reyestrdagi barcha choralar uchun summa berilmagan.") }}</li><li>{{ benefitText("273 ta oila pasporti manbadagi namuna doirasida. To‘liq respublika shaxslar ro‘yxati emas.") }}</li><li>{{ benefitText("Turli choralar, hududlar yoki oylardagi oluvchilar sonini qo‘shib, noyob shaxslar sonini chiqarish mumkin emas.") }}</li><li>{{ benefitText("Manbadagi raqamlar saqlangan. Birlamchi davlat bazasi mustaqil tekshirilmagan.") }}</li><li>{{ benefitText("Namoyish rollari haqiqiy vakolatlar yoki OneID autentifikatsiyasi o‘rnini bosmaydi.") }}</li></ul><details><summary>{{ benefitText("Manbadagi to‘liq metodologiya matni") }}</summary><p class="source-methodology">{{ benefitText(benefitText(data.methodology.replace(/<[^>]+>/g,' ').replace(/\s+/g,' '))) }}</p></details></template></section></div></div></template>
<style src="../presentation/native/platform.css"></style>
