<script setup lang="ts">
import ProjectItem from '@/components/ProjectItem.vue'
import type { Project } from '@/types/project'

defineProps<{
  projects: Project[]
}>()

const emit = defineEmits<{
  (e: 'edit-project', project: Project): void
  (e: 'remove-project', id: number): void
}>()
</script>

<template>
  <div class="project-table flex column">
    <div class="project-header align-center">
      <div>Project title</div>
      <div>Due date</div>
      <div></div>
    </div>

    <ProjectItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @edit-project="emit('edit-project', project)"
      @remove-project="emit('remove-project', project.id)"
    />
  </div>
</template>

<style scoped>
.project-table {
  gap: 16px;
}

.project-header {
  display: grid;
  grid-template-columns: 1fr 1fr 100px;
  padding: 16px;
  border-radius: 6px;
  background-color: var(--color-hover);

  @media (max-width: 640px) {
    display: none;
  }
}
</style>
