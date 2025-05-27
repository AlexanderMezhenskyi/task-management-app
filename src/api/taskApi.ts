import api from './axios'
import type { Task } from '@/types/task'

export const taskApi = {
  async fetchTaskById(id: number): Promise<Task> {
    const res = await api.get(`/tasks/${id}`)
    return res.data
  },

  async fetchTaskByProjectId(projectId: number): Promise<Task[]> {
    const res = await api.get(`/projects/${projectId}/tasks`)
    return res.data
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const res = await api.post('/tasks', task)
    return res.data
  },

  async updateTask(task: Task): Promise<Task> {
    const res = await api.put(`/tasks/${task.id}`, task)
    return res.data
  },

  async removeTask(id: number): Promise<Task> {
    const res =  await api.delete(`/tasks/${id}`)
    return res.data
  },
}
