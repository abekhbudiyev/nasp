<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RegisteredFile, RequestDocument } from '../reimbursement'
const props = defineProps<{ modelValue: RequestDocument[]; files: RegisteredFile[]; type: { id: number; code: string; name: string; extensions: readonly string[] }; label: string; required?: boolean; disabled?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: RequestDocument[]]; upload: [files: File[]] }>()
const existingId = ref('')
const attached = computed(() => props.modelValue.filter(d => d.type.code === props.type.code))
const reusable = computed(() => props.files.filter(f => (!f.typeCode || f.typeCode === props.type.code) && !attached.value.some(d => d.file_id === f.id)))
function upload(event: Event) { const input = event.target as HTMLInputElement; emit('upload', Array.from(input.files || [])); input.value = '' }
function remove(id: string) { emit('update:modelValue', props.modelValue.filter(d => !(d.file_id === id && d.type.code === props.type.code))) }
function useExisting() {
  if (!reusable.value.some(f => f.id === existingId.value)) return
  emit('update:modelValue', [...props.modelValue, { type: { id: props.type.id, code: props.type.code }, file_id: existingId.value }]); existingId.value = ''
}
function setPage(id: string, event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', props.modelValue.map(d => d.file_id === id && d.type.code === props.type.code ? { ...d, page: value ? Number(value) : undefined } : d))
}
</script>
<template>
  <div class="space-y-2 rounded-lg border p-3 text-xs">
    <p class="font-medium">{{ type.name }} <span v-if="required" class="text-destructive">*</span></p>
    <label class="inline-flex cursor-pointer rounded-md border bg-background px-3 py-2"><span>Fayl yuklash</span><input class="sr-only" type="file" multiple :accept="type.extensions.map(e => '.' + e).join(',')" :disabled="disabled" :aria-label="label" @change="upload" /></label>
    <div v-for="doc in attached" :key="doc.file_id" class="rounded bg-muted/40 p-2">
      <div class="flex items-start justify-between gap-2"><span class="break-all text-primary">{{ files.find(f => f.id === doc.file_id)?.name || doc.file_id }}</span><button type="button" :disabled="disabled" :aria-label="label + ' ' + doc.file_id + ' olib tashlash'" class="shrink-0 text-destructive hover:underline" @click="remove(doc.file_id)">Olib tashlash</button></div>
      <label v-if="files.find(f => f.id === doc.file_id)?.name.toLowerCase().endsWith('.pdf')" class="mt-2 flex items-center gap-2 text-muted-foreground">PDF sahifasi<input class="w-20 rounded border bg-background p-1" type="number" min="1" step="1" :value="doc.page" :disabled="disabled" :aria-label="label + ' PDF sahifasi'" placeholder="Ixtiyoriy" @input="setPage(doc.file_id, $event)" /></label>
    </div>
    <details v-if="reusable.length"><summary class="cursor-pointer text-muted-foreground">Yuklangan faylni shu qatorga ham biriktirish</summary><div class="mt-2 flex gap-2"><select v-model="existingId" :aria-label="label + ' mavjud fayl'" :disabled="disabled" class="min-w-0 flex-1 rounded border bg-background p-2"><option value="">Faylni tanlang</option><option v-for="file in reusable" :key="file.id" :value="file.id">{{ file.name }}</option></select><button type="button" class="rounded border px-2" :disabled="disabled || !existingId" @click="useExisting">Biriktirish</button></div></details>
  </div>
</template>
