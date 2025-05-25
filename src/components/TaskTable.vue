<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/task'

const tasks: Task[] = [
  {
    id: 1,
    title: 'Setup UI',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-05-25',
    description: 'Setup UI',
    projectId: 1,
  },
  {
    id: 2,
    title: 'Create API mocks',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2025-05-25',
    description: 'Create API mocks',
    projectId: 2,
  },
  {
    id: 3,
    title: 'Add tests',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2025-05-25',
    description: 'Add tests',
    projectId: 3,
  },
]
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
      <TaskItem :task="task" />
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
