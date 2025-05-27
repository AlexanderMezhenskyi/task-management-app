<script setup lang="ts">
import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
import type { SortDirection } from '@/types/sort.ts'

defineProps<{
  direction: SortDirection
}>()
</script>

<template>
  <ArrowDownIcon v-if="direction === 'asc'" />
  <ArrowUpIcon v-else />
</template>

<style scoped></style>
