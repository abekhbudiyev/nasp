<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import {computed,ref} from 'vue'
import geography from '../../platform-regions.json'
import {data,latin,money,num,geoKeys} from './data'
const props=defineProps<{values:(number|null)[];selected:string;count?:boolean;details?:string[]}>()
const emit=defineEmits<{select:[string]}>()
const hover=ref(-1)
const max=computed(()=>Math.max(1,...props.values.map(value=>value??0)))
const label=computed(()=>hover.value<0?'':latin(data.regions[hover.value]))
function displayValue(index:number){
 if (props.details?.[index]) return props.details[index]
 const value=props.values[index]
 if(value==null) return 'Ma’lumot yo‘q'
 return props.count?num(value)+' holat':money(value)+' so‘m'
}
const value=computed(()=>hover.value<0?'':displayValue(hover.value))
const index=(key:string)=>geoKeys.indexOf(key)
</script>
<template>
 <div class="region-canvas">
  <div class="map-caption">
   <span>{{ benefitText(label) }}</span><strong>{{ benefitText(value) }}</strong>
   <button v-if="selected!==''" @click="emit('select','')">{{ benefitText('Respublikaga qaytish ×') }}</button>
  </div>
  <svg :viewBox="geography.viewBox.join(' ')" role="group" :aria-label="benefitText('O‘zbekiston hududlari')">
   <path v-for="item in geography.items" :key="item.key" :d="item.d" role="button" tabindex="0"
    :aria-label="benefitText(data.regions[index(item.key)] + ' · ' + displayValue(index(item.key)))"
    :aria-pressed="selected===String(index(item.key))"
    :fill="selected===String(index(item.key))?'var(--primary)':values[index(item.key)]==null?'var(--muted)':`color-mix(in srgb, var(--primary) ${20+(values[index(item.key)]??0)/max*72}%, var(--card))`"
    @mouseenter="hover=index(item.key)" @focus="hover=index(item.key)" @click="emit('select',String(index(item.key)))"
    @keydown.enter.prevent="emit('select',String(index(item.key)))" @keydown.space.prevent="emit('select',String(index(item.key)))">
    <title>{{ benefitText(data.regions[index(item.key)] + ' · ' + displayValue(index(item.key))) }}</title>
   </path>
  </svg>
  <div class="map-legend">
   <span>{{ benefitText('Kam') }}</span><i></i><span>{{ benefitText('Ko‘p') }}</span>
   <span v-if="values.some(value=>value===null)" class="missing">{{ benefitText('Ma’lumot yo‘q') }}</span>
   <small>{{ benefitText('geoBoundaries · OSM / OCHA') }}</small>
  </div>
 </div>
</template>
<style scoped>.region-canvas{display:flex;flex-direction:column;min-height:280px}.map-caption{height:42px;display:flex;align-items:center;gap:12px;font-size:12px;color:#61718b}.map-caption strong{color:var(--primary)}.map-caption button{margin-left:auto;color:var(--primary)}.region-canvas svg{width:100%;height:260px;overflow:visible}.region-canvas path{stroke:white;stroke-width:1.8;cursor:pointer;transition:fill .35s,filter .2s;outline:none}.region-canvas path:hover,.region-canvas path:focus-visible{fill:#12a88c;filter:drop-shadow(0 3px 4px #1234)}.map-legend{display:flex;align-items:center;gap:9px;color:var(--muted-foreground);font-size:11px}.map-legend i{width:90px;height:5px;border-radius:5px;background:linear-gradient(90deg,var(--card),var(--primary))}.map-legend small{margin-left:auto}</style>
