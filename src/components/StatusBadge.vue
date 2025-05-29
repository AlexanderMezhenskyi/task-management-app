<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  type: 'priority' | 'status'
}>()

const normalizedClass = computed(() => {
  return props.label.toLowerCase().replace(/\s+/g, '-')
})
</script>

<template>
  <span :class="['badge', type, normalizedClass]">
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  text-transform: capitalize;
  white-space: nowrap;
  background-color: var(--badge-bg);
  color: var(--badge-text);
}

.priority.low {
  --badge-bg: var(--priority-low-bg);
  --badge-text: var(--priority-low-text);
}

.priority.medium {
  --badge-bg: var(--priority-medium-bg);
  --badge-text: var(--priority-medium-text);
}

.priority.high {
  --badge-bg: var(--priority-high-bg);
  --badge-text: var(--priority-high-text);
}

.status.pending {
  --badge-bg: var(--status-pending-bg);
  --badge-text: var(--status-pending-text);
}

.status.in-progress {
  --badge-bg: var(--status-in-progress-bg);
  --badge-text: var(--status-in-progress-text);
}

.status.completed {
  --badge-bg: var(--status-completed-bg);
  --badge-text: var(--status-completed-text);
}
</style>
