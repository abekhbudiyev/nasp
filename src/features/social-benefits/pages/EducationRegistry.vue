<script setup lang="ts">
import {computed} from 'vue'
import VoucherWorkspace from '../components/VoucherWorkspace.vue'
import {educationRecords} from '../voucher-records'
import type {EducationTarget} from '../education-monitoring'
const emit=defineEmits<{open:[target:EducationTarget]}>()
const date='2026-11-03',records=computed(()=>educationRecords(date))
function open(id:string){const r=records.value.find(r=>r.id===id)!;emit('open',{childId:r.personId,recordId:id,tab:'vouchers'})}
</script>
<template><VoucherWorkspace :records="records" kind="education" :date="date" @open="open" /></template>
