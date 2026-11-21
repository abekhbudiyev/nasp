<script setup lang="ts">
import {num} from './data'
withDefaults(defineProps<{value:number;decimals?:number}>(),{decimals:0})
</script>
<template><span class="metric-value">{{ num(value,decimals) }}</span></template>
<style scoped>.metric-value{font-variant-numeric:tabular-nums}</style>
