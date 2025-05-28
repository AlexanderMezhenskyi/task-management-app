<script setup lang="ts">
import InboxIcon from '@/components/icons/InboxIcon.vue'

defineProps<{
  title: string
  message: string
}>()
</script>

<template>
  <div class="empty-state flex column align-center text-center">
    <InboxIcon class="empty-icon" />
    <h2 class="empty-title">{{ title }}</h2>
    <p class="empty-message">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<style scoped>
.empty-state {
  gap: 12px;
  padding: 40px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  background-color: var(--color-surface);
  color: var(--color-text-light);
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--color-border);
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.empty-message {
  max-width: 300px;
  color: var(--color-text-light);
  margin-bottom: 16px;
}
</style>
