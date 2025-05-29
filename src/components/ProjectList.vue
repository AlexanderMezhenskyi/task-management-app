<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import AppLoader from '@/components/AppLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import ProjectTable from '@/components/ProjectTable.vue'
import { notifyError, notifySuccess } from '@/utils/toast'
import type { Project } from '@/types/project'

const route = useRoute()
const isProjectsRoute = route.name === 'projects'

const { fetchProjectsAllAsync, createProjectAsync, updateProjectAsync, removeProjectAsync } =
  useProjectStore()

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)

const projects = ref<Project[]>([])
const isLoading = ref(false)
const isProjectModalOpen = ref(false)
const editingProject = ref<Project | null>(null)

onMounted(() => {
  fetchProjects()
})

const openCreateModal = () => {
  editingProject.value = null
  isProjectModalOpen.value = true
}

const openEditModal = (project: Project) => {
  editingProject.value = project
  isProjectModalOpen.value = true
}

const closeProjectModal = () => {
  isProjectModalOpen.value = false
}

const createProject = async (project: Omit<Project, 'id'>) => {
  isLoading.value = true

  try {
    await createProjectAsync(project)
    await fetchProjects()
    notifySuccess('Project created successfully.')
  } catch (err) {
    notifyError('Failed to create project.')
  } finally {
    isLoading.value = false
    closeProjectModal()
  }
}

const updateProject = async (project: Project): Promise<void> => {
  isLoading.value = true

  try {
    await updateProjectAsync(project)
    await fetchProjects()
    notifySuccess('Project updated successfully.')
  } catch (err) {
    notifyError('Failed to update project.')
  } finally {
    isLoading.value = false
    closeProjectModal()
  }
}

const removeProject = async (projectId: number): Promise<void> => {
  const taskStore = useTaskStore()
  const { removeTaskAsync } = taskStore
  const tasksToRemove = taskStore.tasks.filter((task) => task.projectId === projectId)
  let promises = []

  isLoading.value = true

  try {
    await removeProjectAsync(projectId)

    promises = tasksToRemove.map((task) => removeTaskAsync(task.id))
    await Promise.all(promises)

    await fetchProjects()
    notifySuccess('Project deleted successfully.')
  } catch (err) {
    notifyError('Failed to remove project.')
  } finally {
    isLoading.value = false
  }
}

const fetchProjects = async () => {
  isLoading.value = true

  try {
    projects.value = await fetchProjectsAllAsync()
  } catch (err) {
    notifyError('Failed to fetch projects.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="container">
    <AppLoader v-if="isLoading" />

    <div v-if="isProjectsRoute" class="project-page-header flex justify-between align-center">
      <h1>Projects</h1>
      <BaseButton v-if="isAuthenticated && projects.length > 0" @click-button="openCreateModal">
        Create project
      </BaseButton>
    </div>

    <ProjectTable
      v-if="projects.length > 0"
      :projects="projects"
      @edit-project="openEditModal"
      @remove-project="removeProject"
    />
    <template v-else>
      <EmptyState
        v-if="isProjectsRoute"
        title="No projects yet"
        message="Start by creating your first project."
      >
        <template #action>
          <BaseButton v-if="isAuthenticated" @click-button="openCreateModal">
            Create project
          </BaseButton>
        </template>
      </EmptyState>
    </template>

    <ProjectModal
      v-if="isProjectModalOpen"
      :project-to-edit="editingProject"
      @close="closeProjectModal"
      @create="createProject"
      @update="updateProject"
    />
  </section>
</template>

<style scoped>
.project-page-header {
  margin-bottom: 24px;
}
</style>
