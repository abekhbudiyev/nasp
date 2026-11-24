<script setup lang="ts">
import { benefitText as t } from '@/shared/i18n'
import { zoneLabel, type RiskZone } from './demo-families'

defineProps<{ zone: RiskZone }>()
</script>

<template>
  <span class="rm-status" :data-zone="zone"><i aria-hidden="true" />{{ t(zoneLabel(zone)) }}</span>
</template>
