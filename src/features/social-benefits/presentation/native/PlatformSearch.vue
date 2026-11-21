<script setup lang="ts">
import { benefitText } from '@/shared/i18n'
import { computed, ref } from 'vue'
import { platformViews, viewFilters } from '../../config'
import { data, latin, type Registry } from './data'
const emit=defineEmits<{page:[string, string?];registry:[Registry];family:[string, string?];region:[number];finance:[string]}>()
const query=ref('')
const normal=(value:string)=>latin(value).toLowerCase().replace(/[’‘ʻʼ']/g,'')
const entries=[
  ...platformViews.map(view=>({category:'Sahifa',name:view.title,detail:'',select:()=>emit('page',view.key)})),
  ...platformViews.flatMap(view => (viewFilters[view.key] ?? []).filter(option => option.path).map(option => ({
    category: 'Kesim', name: option.title, detail: view.title, select: () => emit('page', view.key, option.key),
  }))),
  ...data.regions.map((name,i)=>({category:'Hudud',name:latin(name),detail:'',select:()=>emit('region',i)})),
  ...data.finance.map(row=>({category:'Moliyaviy chora',name:latin(row.n),detail:row.id,select:()=>emit('finance',row.id)})),
  ...data.registry.map(row=>({category:'Reyestr',name:latin(row.n),detail:latin(row.o+' '+row.b),select:()=>emit('registry',row)})),
  ...data.families.flatMap(f=>f.members.map(m=>({category:'Oila pasporti',name:latin(m.name),detail:m.id+' · '+f.id,select:()=>emit('family',f.id,m.id)}))),
].map(entry=>({...entry,index:normal(entry.name+' '+entry.detail)}))
const results=computed(()=>{const term=normal(query.value.trim());return term.length<2?[]:entries.filter(entry=>entry.index.includes(term))})
const limit=ref(12)
</script>
<template>
  <div class="module-search"><label>{{ benefitText("Modul bo‘yicha qidirish") }}<input v-model="query" type="search" :placeholder="benefitText('Sahifa, chora, hudud, ism yoki kod')" @input="limit=12"></label>
    <template v-if="query.trim().length>=2"><small>{{ benefitText(results.length) }}{{ benefitText(" natija") }}</small>
      <button v-for="item in results.slice(0,limit)" :key="item.category+item.detail+item.name" type="button" @click="item.select();query=''"><small>{{ benefitText(item.category) }}</small>{{ benefitText(item.name) }}<small>{{ benefitText(item.detail) }}</small></button>
      <button v-if="results.length>limit" @click="limit+=12">{{ benefitText("Yana ko‘rsatish") }}</button>
    </template>
  </div>
</template>
<style scoped>.module-search{display:grid;gap:.4rem;margin-bottom:1rem}.module-search button{display:grid;gap:.15rem;text-align:left;padding:.65rem;border-radius:.65rem;background:var(--muted);font-size:.85rem}.module-search small{color:var(--muted-foreground)}</style>
