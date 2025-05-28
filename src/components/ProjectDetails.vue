<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore.ts'
import AppLoader from '@/components/AppLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import CircleArrowLeftIcon from '@/components/icons/CircleArrowLeftIcon.vue'
import EmptyState from '@/components/EmptyState.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskModal from '@/components/TaskModal.vue'
import TaskTable from '@/components/TaskTable.vue'
import { formatDate } from '@/utils/helpers.ts'
import type { SortField } from '@/types/sort'
import type { SortOption } from '@/types/sort'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()

const { fetchTasksByProjectIdAsync, createTaskAsync, updateTaskAsync, removeTaskAsync } =
  useTaskStore()

const tasks = ref<Task[]>([])
const isLoading = ref(false)
const isTaskModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const filters = ref({ priority: '', status: '' })
const priorityOrder = ['High', 'Medium', 'Low']
const statusOrder = ['Completed', 'In Progress', 'Pending']
const sort = ref<SortOption>({ field: '', direction: 'asc' })
const error = ref('')

onMounted(() => {
  fetchTasks()
})

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const matchesPriority = !filters.value.priority || task.priority === filters.value.priority
    const matchesStatus = !filters.value.status || task.status === filters.value.status
    return matchesPriority && matchesStatus
  })
})

const sortedTasks = computed(() => {
  const tasks = [...filteredTasks.value]

  if (sort.value.field === 'priority') {
    tasks.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.priority)
      const bIndex = priorityOrder.indexOf(b.priority)
      return sort.value.direction === 'asc' ? aIndex - bIndex : bIndex - aIndex
    })
  } else if (sort.value.field === 'status') {
    tasks.sort((a, b) => {
      const aIndex = statusOrder.indexOf(a.status)
      const bIndex = statusOrder.indexOf(b.status)
      return sort.value.direction === 'asc' ? aIndex - bIndex : bIndex - aIndex
    })
  }

  return tasks
})

const projectId = Number(route.params.id)
const project = {
  id: projectId,
  title: 'Website Redesign',
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
    await fetchTasks()
  } catch (err) {
    error.value = err.message || 'Failed to create task.'
  } finally {
    isLoading.value = false
    closeTaskModal()
  }
}

const updateTask = async (task: Task): Promise<void> => {
  isLoading.value = true

  try {
    await updateTaskAsync(task)
    await fetchTasks()
  } catch (err) {
    error.value = err.message || 'Failed to update task.'
  } finally {
    isLoading.value = false
    closeTaskModal()
  }
}

const removeTask = async (taskId: number): Promise<void> => {
  isLoading.value = true

  try {
    await removeTaskAsync(taskId)
    await fetchTasks()
  } catch (err) {
    error.value = err.message || 'Failed to remove task.'
  } finally {
    isLoading.value = false
  }
}

const fetchTasks = async () => {
  isLoading.value = true

  try {
    tasks.value = await fetchTasksByProjectIdAsync(projectId)
  } catch (err) {
    error.value = err.message || 'Failed to fetch tasks.'
  } finally {
    isLoading.value = false
  }
}

const updateFilters = (payload: typeof filters.value) => {
  filters.value = payload
}

const toggleSort = (field: SortField) => {
  if (sort.value.field === field) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.field = field
    sort.value.direction = 'asc'
  }
}
</script>

<template>
  <section class="container">
    <AppLoader v-if="isLoading" />
    <ErrorBanner v-if="error" :message="error" />
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
          Project: {{ project.title }}
          <span class="project-dueDate">(Due: {{ formatDate(project.dueDate) }})</span>
        </h1>
      </div>

      <BaseButton @click-button="openCreateModal">Create task</BaseButton>
    </div>

    <div class="task-filters">
      <TaskFilters @update-filters="updateFilters" />
    </div>

    <TaskTable
      v-if="sortedTasks.length > 0"
      :sort="sort"
      :tasks="sortedTasks"
      @edit-task="openEditModal"
      @remove-task="removeTask"
      @toggle-sort="toggleSort"
    />
    <EmptyState
      v-else
      title="No tasks yet"
      message="Start by creating your first task for this project."
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
