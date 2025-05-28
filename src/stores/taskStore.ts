import { ref } from 'vue'
import { defineStore } from 'pinia'
import { taskApi } from '@/api/taskApi.ts'
import type { Task } from '@/types/task'

export const useTaskStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])

    // Sync
    const createTask = (task: Omit<Task, 'id'>): Task => {
      const newTask = { ...task, id: Date.now() }
      tasks.value.push(newTask)
      return newTask
    }

    const updateTask = (updatedTask: Task): void => {
      const index = tasks.value.findIndex((task) => task.id === updatedTask.id)

      if (index !== -1) {
        tasks.value[index] = { ...updatedTask }
      }
    }

    const removeTask = (taskId: number): void => {
      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    }

    // Async (API)
    const fetchTaskByIdAsync = async (taskId: number) => {
      return await taskApi.fetchTaskById(taskId)
    }

    const fetchTasksByProjectIdAsync = async (projectId: number) => {
      return await taskApi.fetchTaskByProjectId(projectId)
    }

    const createTaskAsync = async (task: Omit<Task, 'id'>) => {
      await taskApi.createTask(task)
    }

    const updateTaskAsync = async (task: Task) => {
      await taskApi.updateTask(task)
    }

    const removeTaskAsync = async (id: number) => {
      await taskApi.removeTask(id)
    }

    return {
      tasks,
      createTask,
      updateTask,
      removeTask,
      fetchTaskByIdAsync,
      fetchTasksByProjectIdAsync,
      createTaskAsync,
      updateTaskAsync,
      removeTaskAsync,
    }
  },
  {
    persist: {
      key: 'task-store',
      storage: localStorage,
    },
  },
)
