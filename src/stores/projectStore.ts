import { ref } from 'vue'
import { defineStore } from 'pinia'
import { projectApi } from '@/api/projectApi.ts'
import type { Project } from '@/types/project'

export const useProjectStore = defineStore(
  'projects',
  () => {
    const projects = ref<Project[]>([])

    // Sync
    const createProject = (project: Omit<Project, 'id'>): Project => {
      const newProject = { ...project, id: Date.now() }
      projects.value.push(newProject)
      return newProject
    }

    const updateProject = (updatedProject: Project): void => {
      const index = projects.value.findIndex((project) => project.id === updatedProject.id)

      if (index !== -1) {
        projects.value[index] = { ...updatedProject }
      }
    }

    const removeProject = (projectId: number): void => {
      projects.value = projects.value.filter((project) => project.id !== projectId)
    }

    // Async (API)
    const fetchProjectsAllAsync = async () => {
      return await projectApi.fetchProjectsAll()
    }

    const fetchProjectByIdAsync = async (projectId: number) => {
      return await projectApi.fetchProjectById(projectId)
    }

    const createProjectAsync = async (project: Omit<Project, 'id'>) => {
      await projectApi.createProject(project)
    }

    const updateProjectAsync = async (project: Project) => {
      await projectApi.updateProject(project)
    }

    const removeProjectAsync = async (id: number) => {
      await projectApi.removeProject(id)
    }

    return {
      projects,
      createProject,
      updateProject,
      removeProject,
      fetchProjectsAllAsync,
      fetchProjectByIdAsync,
      createProjectAsync,
      updateProjectAsync,
      removeProjectAsync,
    }
  },
  {
    persist: {
      key: 'project-store',
      storage: localStorage,
    },
  },
)
