<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { TaskPriorities, TaskStatuses } from '@/types/task'
import type { Task, TaskPriority, TaskStatus } from '@/types/task'

const { taskToEdit = null } = defineProps<{
  taskToEdit?: Task | null
}>()

const emit = defineEmits<{
  (e: 'create', task: Omit<Task, 'id'>): void
  (e: 'close'): void
  (e: 'update', task: Task): void
}>()

const route = useRoute()

const title = ref('')
const description = ref('')
const status = ref<TaskStatus>('Pending')
const priority = ref<TaskPriority>('Medium')
const dueDate = ref('')
const projectId = ref<number | null>(null)

projectId.value = Number(route.params.id) || null

watch(
  () => taskToEdit,
  (task) => {
    if (task) {
      title.value = task.title
      description.value = task.description
      status.value = task.status
      priority.value = task.priority
      dueDate.value = task.dueDate
    } else {
      title.value = ''
      description.value = ''
      status.value = 'Pending'
      priority.value = 'Medium'
      dueDate.value = ''
    }
  },
  { immediate: true },
)

const isFormValid = computed(() => {
  return (
    title.value.trim().length > 0 &&
    description.value.trim().length > 0 &&
    dueDate.value.trim().length > 0 &&
    TaskPriorities.includes(priority.value) &&
    TaskStatuses.includes(status.value)
  )
})

const onSubmit = () => {
  if (!isFormValid.value || projectId.value === null) return

  const taskPayload = {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value,
    dueDate: dueDate.value,
    projectId: projectId.value,
  }

  if (taskToEdit && taskToEdit.id) {
    emit('update', { ...taskPayload, id: taskToEdit.id })
  } else {
    emit('create', taskPayload)
  }
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="task-modal flex justify-center align-center" @click.self="close">
    <div class="task-modal-content">
      <div class="task-modal-header flex justify-between align-center">
        <h2>{{ taskToEdit ? 'Edit task' : 'Create task' }}</h2>
        <BaseButton
          class="cursor"
          no-padding
          size="sm"
          variant="ghost"
          :text-color="'var(--color-text)'"
          @click-button="close"
        >
          <CloseIcon />
        </BaseButton>
      </div>

      <form class="form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label class="form-label" for="title">Title</label>
          <input id="title" v-model="title" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label" for="desc">Description</label>
          <textarea id="desc" v-model="description" class="form-textarea" rows="4" required />
        </div>

        <div class="form-group">
          <label class="form-label" for="priority">Priority</label>
          <select id="priority" v-model="priority" class="form-select">
            <option disabled value="">Select priority</option>
            <option v-for="item in TaskPriorities" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="status">Status</label>
          <select id="status" v-model="status" class="form-select">
            <option disabled value="">Select status</option>
            <option v-for="item in TaskStatuses" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="due-date">Due date</label>
          <input id="due-date" v-model="dueDate" class="form-input" type="date" />
        </div>

        <div class="flex justify-end align-center">
          <BaseButton type="submit" :disabled="!isFormValid">
            {{ taskToEdit ? 'Update' : 'Create' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="@/assets/forms.css"></style>

<style scoped>
.task-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.task-modal-content {
  width: 90%;
  max-width: 480px;
  background: var(--color-surface);
  padding: 32px;
  border-radius: 8px;
}

.task-modal-header {
  margin-bottom: 16px;
}
</style>
