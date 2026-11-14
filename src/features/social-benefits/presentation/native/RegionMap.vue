<script setup lang="ts">
import {computed,ref} from 'vue'
import geography from '../../platform-regions.json'
import {data,latin,money,num,geoKeys} from './data'
const props=defineProps<{values:number[];selected:string;count?:boolean}>()
const emit=defineEmits<{select:[string]}>()
const hover=ref(-1)
const max=computed(()=>Math.max(1,...props.values))
const label=computed(()=>hover.value<0?'Hududni tanlang':latin(data.regions[hover.value]))
const value=computed(()=>hover.value<0?'':props.count?num(props.values[hover.value]??0)+' holat':money(props.values[hover.value]??0)+' so‘m')
const index=(key:string)=>geoKeys.indexOf(key)
</script>
<template><div class="region-canvas"><div class="map-caption"><span>{{ label }}</span><strong>{{ value }}</strong><button v-if="selected!==''" @click="emit('select','')">Respublikaga qaytish ×</button></div><svg :viewBox="geography.viewBox.join(' ')" role="group" aria-label="O‘zbekiston hududlari"><path v-for="item in geography.items" :key="item.key" :d="item.d" role="button" tabindex="0" :aria-label="latin(data.regions[index(item.key)])+' '+(count?num(values[index(item.key)]??0):money(values[index(item.key)]??0))" :aria-pressed="selected===String(index(item.key))" :fill="selected===String(index(item.key))?'#234bc1':`color-mix(in srgb, #4879ea ${20+(values[index(item.key)]??0)/max*72}%, #eef3ff)`" @mouseenter="hover=index(item.key)" @focus="hover=index(item.key)" @click="emit('select',String(index(item.key)))" @keydown.enter.prevent="emit('select',String(index(item.key)))" @keydown.space.prevent="emit('select',String(index(item.key)))"><title>{{ latin(data.regions[index(item.key)]) }}</title></path></svg><div class="map-legend"><span>Kam</span><i></i><span>Ko‘p</span><small>geoBoundaries · OSM / OCHA</small></div></div></template>
<style scoped>.region-canvas{display:flex;flex-direction:column;min-height:280px}.map-caption{height:42px;display:flex;align-items:center;gap:12px;font-size:12px;color:#61718b}.map-caption strong{color:#294c96}.map-caption button{margin-left:auto;color:#3c68d4}.region-canvas svg{width:100%;height:260px;overflow:visible}.region-canvas path{stroke:white;stroke-width:1.8;cursor:pointer;transition:fill .35s,filter .2s;outline:none}.region-canvas path:hover,.region-canvas path:focus-visible{fill:#12a88c;filter:drop-shadow(0 3px 4px #1234)}.map-legend{display:flex;align-items:center;gap:9px;color:#8190a6;font-size:10px}.map-legend i{width:90px;height:5px;border-radius:5px;background:linear-gradient(90deg,#dce6ff,#3462c8)}.map-legend small{margin-left:auto}</style>
