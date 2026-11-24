<script setup lang="ts">
import SectionBlock from '@/shared/components/SectionBlock.vue'
import type { AdminTable } from '../admin-demo-data'

defineProps<{ table: AdminTable }>()
</script>

<template>
  <SectionBlock :title="table.title" :description="table.description" class="min-w-0">
    <div class="overflow-x-auto rounded-lg border" role="region" :aria-label="table.title" tabindex="0">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted/50 text-xs font-semibold text-muted-foreground">
          <tr>
            <th v-for="column in table.columns" :key="column" scope="col" class="whitespace-nowrap px-3 py-2.5">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table.rows" :key="row[0]" class="border-t">
            <th scope="row" class="min-w-36 px-3 py-3 align-top font-medium">{{ row[0] }}</th>
            <td v-for="(value, index) in row.slice(1)" :key="index" class="min-w-24 px-3 py-3 align-top tabular-nums text-muted-foreground">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </SectionBlock>
</template>
