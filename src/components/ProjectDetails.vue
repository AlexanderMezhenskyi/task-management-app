<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore.ts'
import { useTaskStore } from '@/stores/taskStore.ts'
import AppLoader from '@/components/AppLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import CircleArrowLeftIcon from '@/components/icons/CircleArrowLeftIcon.vue'
import EmptyState from '@/components/EmptyState.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import TaskModal from '@/components/TaskModal.vue'
import TaskTable from '@/components/TaskTable.vue'
import { useDueDateStatus } from '@/composables/useDueDateStatus'
import { formatDate } from '@/utils/helpers'
import { notifyError, notifySuccess } from '@/utils/toast'
import type { Project } from '@/types/project'
import type { SortField } from '@/types/sort'
import type { SortOption } from '@/types/sort'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()

const { fetchProjectByIdAsync } = useProjectStore()
const { fetchTasksByProjectIdAsync, createTaskAsync, updateTaskAsync, removeTaskAsync } =
  useTaskStore()

const tasks = ref<Task[]>([])
const project = ref<Project | null>(null)
const isLoading = ref(false)
const isTaskModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const filters = ref({ priority: '', status: '' })
const priorityOrder = ['High', 'Medium', 'Low']
const statusOrder = ['Completed', 'In Progress', 'Pending']
const sort = ref<SortOption>({ field: '', direction: 'asc' })

onMounted(async () => await fetchProject())

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

const dueDateClass = computed(() => useDueDateStatus(project.value?.dueDate ?? ''))

const projectId = Number(route.params.id)

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
    notifySuccess('Task created successfully.')
  } catch (err) {
    notifyError('Failed to create task.')
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
    notifySuccess('Task updated successfully.')
  } catch (err) {
    notifyError('Failed to update task.')
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
    notifySuccess('Task deleted successfully.')
  } catch (err) {
    notifyError('Failed to remove task.')
  } finally {
    isLoading.value = false
  }
}

const fetchTasks = async () => {
  isLoading.value = true

  try {
    tasks.value = await fetchTasksByProjectIdAsync(projectId)
  } catch (err) {
    notifyError('Failed to fetch tasks.')
  } finally {
    isLoading.value = false
  }
}

const fetchProject = async () => {
  try {
    project.value = await fetchProjectByIdAsync(projectId)
    await fetchTasks()
  } catch (err) {
    notifyError('Failed to fetch project.')
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
    <div class="project-header flex justify-between align-start">
      <div class="project-title-wrap flex align-start">
        <BaseButton
          class="back-button"
          no-padding
          variant="ghost"
          size="sm"
          :text-color="'var(--color-text)'"
          @click="router.back()"
        >
          <CircleArrowLeftIcon />
        </BaseButton>

        <h1 v-if="project" class="project-title">
          Project: {{ project.title }}
          <span class="project-dueDate">
            (Due:
            <span :class="dueDateClass">{{ formatDate(project.dueDate) }}</span>)
          </span>
        </h1>
      </div>

      <BaseButton class="create-task-button" @click-button="openCreateModal"
        >Create task</BaseButton
      >
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
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
}

.project-title-wrap {
  @media (max-width: 640px) {
    width: 100%;
    margin-bottom: 16px;
  }
}

.back-button {
  margin-top: 2px;
}

.create-task-button {
  @media (max-width: 640px) {
    margin: 0 auto;
  }
}

.project-title {
  font-weight: 500;
  color: var(--color-text);
  margin: 0 8px;
}

.project-dueDate {
  font-weight: 400;
  color: var(--color-text-light);
}

.task-filters {
  margin-bottom: 16px;
}
</style>
