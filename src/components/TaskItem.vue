<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { useDueDateStatus } from '@/composables/useDueDateStatus'
import { formatDate } from '@/utils/helpers'
import type { Task } from '@/types/task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'edit-task'): void
  (e: 'remove-task'): void
}>()

const dueDateClass = computed(() => useDueDateStatus(props.task.dueDate))
</script>

<template>
  <div class="task-card flex column">
    <div class="task-row align-center">
      <div>{{ task.title }}</div>
      <div class="mobile-view-wrap flex justify-between align-center">
        <div><StatusBadge :label="task.priority" type="priority" /></div>
        <div><StatusBadge :label="task.status" type="status" /></div>
      </div>
      <div class="mobile-view-wrap flex justify-between align-center">
        <div :class="dueDateClass">{{ formatDate(task.dueDate) }}</div>
        <div class="task-actions flex justify-end">
          <BaseButton
            size="sm"
            variant="ghost"
            no-padding
            :text-color="'var(--color-text)'"
            @click-button="emit('edit-task')"
          >
            <EditIcon />
          </BaseButton>
          <BaseButton
            size="sm"
            variant="ghost"
            no-padding
            :text-color="'var(--color-text)'"
            @click-button="emit('remove-task')"
          >
            <RemoveIcon />
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-if="task.description" class="task-description">
      <span class="task-description-title">Description:</span>
      {{ task.description }}
    </div>
  </div>
</template>

<style scoped>
.task-card {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 16px;
  background: var(--color-surface);
  gap: 8px;
}

.task-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: left;
  }
}

.task-actions {
  gap: 16px;

  @media (max-width: 640px) {
    justify-self: start;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.task-description {
  font-size: 14px;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid var(--color-border);
}

.task-description-title {
  font-weight: 500;
}

.mobile-view-wrap {
  gap: 16px;

  @media (min-width: 641px) {
    display: contents;
  }
}
</style>
