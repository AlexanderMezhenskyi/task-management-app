<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import type { Project } from '@/types/project'

const { projectToEdit = null } = defineProps<{
  projectToEdit?: Project | null
}>()

const emit = defineEmits<{
  (e: 'create', project: Omit<Project, 'id'>): void
  (e: 'close'): void
  (e: 'update', project: Project): void
}>()

const title = ref('')
const dueDate = ref('')

watch(
  () => projectToEdit,
  (project) => {
    if (project) {
      title.value = project.title
      dueDate.value = project.dueDate
    } else {
      title.value = ''
      dueDate.value = ''
    }
  },
  { immediate: true },
)

const isFormValid = computed(() => {
  return title.value.trim().length > 0 && dueDate.value.trim().length > 0
})

const onSubmit = () => {
  if (!isFormValid.value) return

  const projectPayload = {
    title: title.value.trim(),
    dueDate: dueDate.value,
  }

  if (projectToEdit && projectToEdit.id) {
    emit('update', { ...projectPayload, id: projectToEdit.id })
  } else {
    emit('create', projectPayload)
  }
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="project-modal flex justify-center align-center" @click.self="close">
    <div class="project-modal-content">
      <div class="project-modal-header flex justify-between align-center">
        <h2>{{ projectToEdit ? 'Edit project' : 'Create project' }}</h2>
        <BaseButton
          class="close-project-modal-button cursor"
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
          <label class="form-label" for="due-date">Due date</label>
          <input id="due-date" v-model="dueDate" class="form-input" type="date" />
        </div>

        <div class="flex justify-end align-center">
          <BaseButton type="submit" :disabled="!isFormValid">
            {{ projectToEdit ? 'Update' : 'Create' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="@/assets/forms.css"></style>

<style scoped>
.project-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.project-modal-content {
  width: 90%;
  max-width: 480px;
  background: var(--color-surface);
  padding: 32px;
  border-radius: 8px;
}

.project-modal-header {
  margin-bottom: 16px;
}
</style>
