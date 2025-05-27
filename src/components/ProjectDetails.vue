<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore.ts'
import AppLoader from '@/components/AppLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import CircleArrowLeftIcon from '@/components/icons/CircleArrowLeftIcon.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskModal from '@/components/TaskModal.vue'
import TaskTable from '@/components/TaskTable.vue'
import { formatDate } from '@/utils/helpers.ts'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()

const {
  fetchTasksByProjectIdAsync,
  createTaskAsync,
  updateTaskAsync,
  removeTaskAsync
} = useTaskStore()

const tasks = ref<Task[]>([])
const isLoading = ref(false)
const isTaskModalOpen = ref(false)
const editingTask = ref<Task | null>(null)

onMounted(() => {
  fetchTasks()
})

const projectId = Number(route.params.id)
const project = {
  id: projectId,
  name: 'Website Redesign',
  dueDate: '2025-06-10',
}

const openCreateModal = () => {
  editingTask.value = null
  isTaskModalOpen.value = true
}

const openEditModal = (task: Task) => {
  editingTask.value = task
  isTaskModalOpen.value = true
}

const closeTaskModal = () => {
  isTaskModalOpen.value = false
}

const createTask = async (task: Omit<Task, 'id'>) => {
  isLoading.value = true

  try {
    await createTaskAsync(task)
  } catch (err) {
    console.error('Failed to create task', err)
  } finally {
    isLoading.value = false
  }

  await fetchTasks()
  closeTaskModal()
}

const updateTask = async (task: Task): Promise<void> => {
  isLoading.value = true

  try {
    await updateTaskAsync(task)
  } catch (err) {
    console.error('Failed to update task', err)
  } finally {
    isLoading.value = false
  }

  await fetchTasks()
  closeTaskModal()
}

const removeTask = async (taskId: number): Promise<void> => {
  isLoading.value = true

  try {
    await removeTaskAsync(taskId)
  } catch (err) {
    console.error('Failed to remove task', err)
  } finally {
    isLoading.value = false
  }

  await fetchTasks()
}

const fetchTasks = async () => {
  isLoading.value = true

  try {
    tasks.value = await fetchTasksByProjectIdAsync(projectId)
  } catch (err) {
    console.error('Failed to fetch tasks', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="container">
    <AppLoader v-if="isLoading" />
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

      <BaseButton @click-button="openCreateModal">Create task</BaseButton>
    </div>

    <div class="task-filters">
      <TaskFilters />
    </div>

    <TaskTable
      :tasks="tasks"
      @edit-task="openEditModal"
      @remove-task="removeTask"
    />

    <TaskModal
      v-if="isTaskModalOpen"
      :task-to-edit="editingTask"
      @close="closeTaskModal"
      @create="createTask"
      @update="updateTask"
    />
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
