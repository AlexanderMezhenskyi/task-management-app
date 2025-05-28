<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import SortArrow from '@/components/SortArrow.vue'
import TaskItem from '@/components/TaskItem.vue'
import type { SortField } from '@/types/sort'
import type { SortOption } from '@/types/sort'
import type { Task } from '@/types/task'

defineProps<{
  tasks: Task[]
  sort: SortOption
}>()

const emit = defineEmits<{
  (e: 'edit-task', task: Task): void
  (e: 'remove-task', id: number): void
  (e: 'toggle-sort', field: SortField): void
}>()
</script>

<template>
  <div class="task-table flex column">
    <div class="task-header align-center">
      <div>Title</div>
      <div class="task-sortable-column flex align-center">
        <BaseButton
          no-padding
          variant="ghost"
          size="sm"
          :text-color="'var(--color-text)'"
          @click="emit('toggle-sort', 'priority')"
        >
          <span class="task-sortable-column-title flex align-center">
            Priority
            <span class="task-sort-icon cursor" :class="{ active: sort.field === 'priority' }">
              <SortArrow :direction="sort.direction" />
            </span>
          </span>
        </BaseButton>
      </div>
      <div class="task-sortable-column flex align-center">
        <BaseButton
          no-padding
          variant="ghost"
          size="sm"
          :text-color="'var(--color-text)'"
          @click="emit('toggle-sort', 'status')"
        >
          <span class="task-sortable-column-title flex align-center">
            Status
            <span class="task-sort-icon cursor" :class="{ active: sort.field === 'status' }">
              <SortArrow :direction="sort.direction" />
            </span>
          </span>
        </BaseButton>
      </div>
      <div>Due date</div>
      <div>Actions</div>
    </div>

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit-task="emit('edit-task', task)"
      @remove-task="emit('remove-task', task.id)"
    />
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
  border-radius: 6px;
  background-color: var(--color-hover);
}

.task-sortable-column-title {
  &:hover .task-sort-icon {
    opacity: 1;
  }
}

.task-sort-icon {
  margin-left: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;

  &.active {
    opacity: 1;
  }

  svg {
    width: 18px;
    height: 18px;
  }
}
</style>
