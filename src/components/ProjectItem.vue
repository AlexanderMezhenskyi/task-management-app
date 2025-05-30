<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '@/components/BaseButton.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'
import { useDueDateStatus } from '@/composables/useDueDateStatus'
import { formatDate } from '@/utils/helpers'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  (e: 'edit-project'): void
  (e: 'remove-project'): void
}>()

const route = useRoute()
const isProjectsRoute = route.name === 'projects'

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)

const dueDateClass = computed(() => useDueDateStatus(props.project.dueDate))
</script>

<template>
  <div class="project-card flex column">
    <div class="project-row align-center">
      <div>
        <RouterLink
          v-if="isAuthenticated"
          :to="{ name: 'projectDetails', params: { id: project.id } }"
          class="project-link"
        >
          {{ project.title }}
        </RouterLink>
        <div v-else>{{ project.title }}</div>
      </div>
      <div class="mobile-view-wrap flex justify-between align-center">
        <div :class="{ [dueDateClass]: isAuthenticated }">
          {{ formatDate(project.dueDate) }}
        </div>
        <div class="project-actions flex justify-end">
          <BaseButton
            v-if="isProjectsRoute"
            size="sm"
            variant="ghost"
            no-padding
            class="edit-button"
            :text-color="'var(--color-text)'"
            @click-button="emit('edit-project')"
          >
            <EditIcon />
          </BaseButton>
          <BaseButton
            v-if="isProjectsRoute"
            size="sm"
            variant="ghost"
            no-padding
            class="remove-button"
            :text-color="'var(--color-text)'"
            @click-button="emit('remove-project')"
          >
            <RemoveIcon />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 16px;
  background: var(--color-surface);
  gap: 8px;
}

.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr 100px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: left;
  }
}

.project-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary-dark);
  }
}

.project-actions {
  gap: 16px;

  @media (max-width: 640px) {
    justify-self: start;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.mobile-view-wrap {
  gap: 16px;

  @media (min-width: 641px) {
    display: contents;
  }
}
</style>
