export type EventStatus = 'processing' | 'delivered' | 'duplicate' | 'returned' | 'waiting'
export type Scenario = 'normal' | 'duplicates' | 'invalid' | 'delay'
export interface LiveEvent {id:number;region:number;agency:number;amount:number;kind:'payment'|'service'|'benefit';outcome:'delivered'|'duplicate'|'returned'|'waiting';stage:number;status:EventStatus;created:number;updated:number;resolved:boolean}
export interface LiveState {tick:number;nextId:number;events:LiveEvent[]}
export const statuses: {key:EventStatus;label:string;color:string}[]=[{key:'processing',label:'Jarayonda',color:'blue'},{key:'delivered',label:'Ijro yakunlandi',color:'green'},{key:'duplicate',label:'Takroriy so‘rov rad etildi',color:'amber'},{key:'returned',label:'Idoraga qaytarildi',color:'red'},{key:'waiting',label:'Ijro tasdig‘i kutilmoqda',color:'purple'}]
export function freshState():LiveState{return {tick:0,nextId:1,events:[]}}
export function advance(current:LiveState,scenario:Scenario,inject=true):LiveState{
 const tick=current.tick+1
 const events=current.events.map(old=>{
  if(old.status!=='processing')return old
  const item={...old,stage:Math.min(4,old.stage+1),updated:tick}
  if(item.outcome==='returned'&&item.stage===1)item.status='returned'
  else if(item.outcome==='duplicate'&&item.stage===2)item.status='duplicate'
  else if(item.outcome==='waiting'&&item.stage===3&&!item.resolved)item.status='waiting'
  else if(item.stage===4)item.status='delivered'
  return item
 })
 const id=current.nextId
 if(inject){
  const outcomes:LiveEvent['outcome'][]=scenario==='duplicates'?['delivered','duplicate','duplicate','delivered']:scenario==='invalid'?['delivered','returned','returned','delivered']:scenario==='delay'?['waiting','delivered','waiting','delivered']:['delivered','delivered','duplicate','delivered','returned','delivered','waiting','delivered','delivered','delivered']
  const kind=id%5===0?'service':id%7===0?'benefit':'payment'
  events.push({id,region:(id*5+3)%14,agency:(id*3)%5,amount:kind==='payment'?[380000,820000,1012000,669000,540000][id%5]!:0,kind,outcome:outcomes[(id-1)%outcomes.length]!,stage:0,status:'processing',created:tick,updated:tick,resolved:false})
 }
 return {tick,nextId:id+Number(inject),events}
}
export function acknowledge(current:LiveState,id:number):LiveState{return {...current,events:current.events.map(item=>item.id===id&&item.status==='waiting'?{...item,status:'processing',resolved:true,updated:current.tick}:item)}}
export function summarize(events:LiveEvent[]){const counts={processing:0,delivered:0,duplicate:0,returned:0,waiting:0};let deliveredAmount=0,duplicateAmount=0;for(const item of events){counts[item.status]++;if(item.status==='delivered')deliveredAmount+=item.amount;if(item.status==='duplicate')duplicateAmount+=item.amount}return {...counts,received:events.length,deliveredAmount,duplicateAmount,regions:new Set(events.map(x=>x.region)).size}}

// A fixed example batch shared by the overview and the operations register.
export function requestBatch(scenario:Scenario='normal'):LiveState {
 let batch=freshState()
 for(let i=0;i<40;i++) batch=advance(batch,scenario)
 for(let step=0;step<4;step++) batch=advance(batch,scenario,false)
 return batch
}
