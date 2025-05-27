<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/task'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'edit-task', task: Task): void
  (e: 'remove-task', id: number): void
}>()
</script>

<template>
  <div class="task-table flex column">
    <div class="task-header align-center">
      <div>Title</div>
      <div>Priority</div>
      <div>Status</div>
      <div>Due Date</div>
      <div>Actions</div>
    </div>

    <div v-for="task in tasks" :key="task.id">
      <TaskItem
        :task="task"
        @edit-task="emit('edit-task', task)"
        @remove-task="emit('remove-task', task.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.task-table {
  gap: 8px;
}

.task-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-hover);
}
</style>
