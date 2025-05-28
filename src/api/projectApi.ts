import api from './axios'
import type { Project } from '@/types/project'

export const projectApi = {
  async fetchProjectsAll(): Promise<Project[]> {
    const res = await api.get('/projects')
    return res.data
  },

  async fetchProjectById(id: number): Promise<Project> {
    const res = await api.get(`/projects/${id}`)
    return res.data
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const res = await api.post('/projects', project)
    return res.data
  },

  async updateProject(project: Project): Promise<Project> {
    const res = await api.put(`/projects/${project.id}`, project)
    return res.data
  },

  async removeProject(id: number): Promise<Project> {
    const res = await api.delete(`/projects/${id}`)
    return res.data
  },
}
