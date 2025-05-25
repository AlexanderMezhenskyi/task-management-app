<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import type { Project} from '@/types/project'

const router = useRouter()

const projects: Project[] = [
  { id: 1, name: 'Website redesign', dueDate: '2025-06-10' },
  { id: 2, name: 'Mobile app launch', dueDate: '2025-07-01' },
  { id: 3, name: 'Marketing campaign', dueDate: '2025-05-30' },
]

const goToProjectDetails = (id: number) => {
  router.push({ name: 'projectDetails', params: { id } })
}
</script>

<template>
  <section class="project-list container flex column">
    <div class="project-header align-center">
      <div>Project name</div>
      <div>Due date</div>
      <div></div>
    </div>

    <div v-for="project in projects" :key="project.id" class="project-row align-center">
      <div class="project-name">{{ project.name }}</div>
      <div class="project-date">{{ project.dueDate }}</div>
      <div class="project-actions">
        <BaseButton @click-button="goToProjectDetails(project.id)">View</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-list {
  gap: 16px;
}

.project-row,
.project-header {
  display: grid;
  grid-template-columns: 1fr 150px 100px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.project-header {
  font-weight: bold;
  background-color: var(--color-hover);
  border: none;

  @media (max-width: 640px) {
    display: none;
  }
}
</style>
