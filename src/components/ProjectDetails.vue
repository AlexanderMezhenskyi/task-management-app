<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import BaseButton from '@/components/BaseButton.vue'
import CircleArrowLeftIcon from '@/components/icons/CircleArrowLeftIcon.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskTable from '@/components/TaskTable.vue'
import { formatDate } from '@/utils/helpers.ts'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()

const taskStore = useTaskStore()
const { addTask } = taskStore

const isTaskModalOpen = ref(false)
const editingTask = ref<Task | null>(null)

const projectId = Number(route.params.id)
const project = {
  id: projectId,
  name: 'Website Redesign',
  dueDate: '2025-06-10',
}

const openTaskModal = () => {
  editingTask.value = null
  isTaskModalOpen.value = true
}

const closeTaskModal = () => {
  isTaskModalOpen.value = false
}

const saveTask = (task: Task | Omit<Task, 'id'>) => {
  addNewTask(task)
  closeTaskModal()
}

const addNewTask = (task: Task | Omit<Task, 'id'>) => {
  addTask({
    projectId: projectId,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
  })
}
</script>

<template>
  <section class="container">
    <div class="project-header flex justify-between align-center">
      <div class="flex align-center">
        <BaseButton
          no-padding
          variant="ghost"
          size="sm"
          :text-color="'var(--color-text)'"
          @click="router.back()"
        >
          <CircleArrowLeftIcon />
        </BaseButton>

        <h1 class="project-title">
          Project: {{ project.name }}
          <span class="project-dueDate">(Due: {{ formatDate(project.dueDate) }})</span>
        </h1>
      </div>

      <BaseButton @click-button="openTaskModal">Create task</BaseButton>
    </div>

    <div class="task-filters">
      <TaskFilters />
    </div>

    <TaskTable />
  </section>
</template>

<style scoped>
.project-header {
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.project-title {
  font-weight: 500;
  color: var(--color-text);
  margin-left: 8px;
}

.project-dueDate {
  font-weight: 400;
  color: var(--color-text-light);
}

.task-filters {
  margin-bottom: 16px;
}
</style>
