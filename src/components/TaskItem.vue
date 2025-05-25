<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import { formatDate } from '@/utils/helpers'
import type { Task } from '@/types/task'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="task-card flex column">
    <div class="task-row align-center">
      <div>{{ task.id }} - {{ task.title }}</div>
      <div>{{ task.priority }}</div>
      <div>{{ task.status }}</div>
      <div>{{ formatDate(task.dueDate) }}</div>
      <div class="task-actions flex justify-right">
        <BaseButton
          size="sm"
          variant="ghost"
          no-padding
          :text-color="'var(--color-text)'"
          @click-button="() => {}"
        >
          <EditIcon />
        </BaseButton>
        <BaseButton
          size="sm"
          variant="ghost"
          no-padding
          :text-color="'var(--color-text)'"
          @click-button="() => {}"
        >
          <RemoveIcon />
        </BaseButton>
      </div>
    </div>

    <div v-if="task.description" class="task-description">
      <span class="task-description-title">Description:</span> {{ task.description }}
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
}

.task-actions {
  gap: 8px;

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
</style>
