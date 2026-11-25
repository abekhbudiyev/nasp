<script setup lang="ts">
import { computed, watch } from 'vue'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw } from 'lucide-vue-next'
import { Button } from '@/shared/ui/shadcn/button'
const props=withDefaults(defineProps<{page:number;size:number;total:number;label?:string;sizeLabel?:string;options?:number[]}>(),{label:'yozuv',sizeLabel:'Qatorlar soni',options:()=>[10,20,50,100]})
const emit=defineEmits<{'update:page':[value:number];'update:size':[value:number];reset:[]}>()
const pages=computed(()=>Math.max(1,Math.ceil(props.total/props.size)))
const start=computed(()=>props.total?(props.page-1)*props.size+1:0),end=computed(()=>Math.min(props.page*props.size,props.total))
watch(pages,n=>{if(props.page>n)emit('update:page',n)})
function resize(e:Event){emit('update:size',Number((e.target as HTMLSelectElement).value));emit('update:page',1)}
</script>
<template>
<footer class="benefits-pagination"><div class="flex flex-wrap items-center gap-3"><label class="inline-flex items-center gap-2"><span>{{ sizeLabel }}</span><select :value="size" @change="resize" :aria-label="sizeLabel"><option v-for="n in options" :key="n" :value="n">{{ n }}</option></select></label><span>Sahifada: <strong>{{ start }}–{{ end }} / {{ total }}</strong></span></div><div class="flex items-center gap-2"><Button variant="ghost" size="sm" class="gap-1.5" @click="emit('reset')"><RotateCcw class="h-4 w-4" /> Tiklash</Button><nav class="benefits-page-buttons" aria-label="Jadval sahifalari"><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page<=1" aria-label="Birinchi sahifa" @click="emit('update:page',1)"><ChevronsLeft class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page<=1" aria-label="Oldingi sahifa" @click="emit('update:page',page-1)"><ChevronLeft class="h-4 w-4" /></Button><span>{{ page }}/{{ pages }}</span><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page>=pages" aria-label="Keyingi sahifa" @click="emit('update:page',page+1)"><ChevronRight class="h-4 w-4" /></Button><Button variant="ghost" size="sm" class="h-7 w-7 p-0" :disabled="page>=pages" aria-label="Oxirgi sahifa" @click="emit('update:page',pages)"><ChevronsRight class="h-4 w-4" /></Button></nav></div></footer>
</template>
