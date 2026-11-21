import source from './svod-data.json?raw'
import { latin, num } from './data'

export interface Measure {
  row:number; cohort:number; name:string; kind:string; subtype:string; rate:string; note:string
  basis:string; agency:string; digital:string; system:string
  figures:[number|null,number|null,number|null,number|null]; registryIds:string[]
}
export interface Proposal {
  sheet:string; row:number; name:string; note:string; basis:string; agency:string; masterRow:number|null
}
export const svod=JSON.parse(source) as {sheet:string;rows:Measure[];proposals:Proposal[]}
export const byRegistry=new Map(svod.rows.flatMap(row=>row.registryIds.map(id=>[id,row] as const)))
export const figure=(value:number|null)=>value===null?'—':num(value,3)
export const categories:Record<string,string>={
  'Агентликка ўтказиш':'Agentlikka o‘tkazish','Такомиллаштириш':'Takomillashtirish','Ваучер':'Vaucher',
  'Ижтимоий карта':'Ijtimoiy karta','Проактив ва композит':'Proaktiv va kompozit',
  'Рақамлашмаган':'Raqamlashtirilmagan choralar','Самардорлиги паст':'Samaradorlikni qayta ko‘rish','Қўшимча таклифлар':'Qo‘shimcha takliflar',
}
export const searchKey=(s:string)=>latin(s).toLowerCase().replace(/[’‘ʻʼ']/g,'').replace(/\s+/g,' ').trim()
