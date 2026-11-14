<script setup lang="ts">
import {ref,watch,onUnmounted} from 'vue'
import {num} from './data'
const props=withDefaults(defineProps<{value:number;decimals?:number}>(),{decimals:0})
const displayed=ref(0);let frame=0
watch(()=>props.value,value=>{cancelAnimationFrame(frame);const from=displayed.value,start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:1000;function tick(now:number){const p=duration?Math.min(1,(now-start)/duration):1;displayed.value=from+(value-from)*(1-(1-p)**3);if(p<1)frame=requestAnimationFrame(tick)}frame=requestAnimationFrame(tick)},{immediate:true})
onUnmounted(()=>cancelAnimationFrame(frame))
</script>
<template><span class="metric-value">{{ num(displayed,decimals) }}</span></template>
<style scoped>.metric-value{font-variant-numeric:tabular-nums}</style>
