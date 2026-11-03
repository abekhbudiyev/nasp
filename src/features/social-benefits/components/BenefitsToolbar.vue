<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import FilterPopover from '@/shared/components/FilterPopover.vue'
import { Input } from '@/shared/ui/shadcn/input'
import { Button } from '@/shared/ui/shadcn/button'
withDefaults(defineProps<{modelValue:string;placeholder?:string;activeCount?:number;label?:string}>(),{placeholder:'Qidirish',activeCount:0,label:'Qidirish'})
const emit=defineEmits<{'update:modelValue':[value:string];clear:[];apply:[]}>()
const open=ref(false)
</script>
<template>
<div class="benefits-toolbar"><div class="relative w-full lg:max-w-sm"><Search class="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input :model-value="modelValue" @update:model-value="emit('update:modelValue',String($event))" :placeholder="placeholder" :aria-label="label" class="pl-9" /></div><div class="flex flex-wrap items-center gap-2"><slot name="before" /><FilterPopover v-if="$slots.filters" v-model:open="open" :active-count="activeCount"><div class="benefits-filter-fields"><slot name="filters" /></div><template #footer><div class="mt-3 flex justify-end gap-2 border-t border-border pt-3"><Button variant="outline" size="sm" @click="emit('clear')">Tozalash</Button><Button size="sm" @click="emit('apply');open=false">Qo‘llash</Button></div></template></FilterPopover><slot name="actions" /></div></div>
</template>
