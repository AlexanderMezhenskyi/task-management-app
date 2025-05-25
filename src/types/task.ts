export const TaskPriorities = ['High', 'Medium', 'Low'] as const
export const TaskStatuses = ['Pending', 'In Progress', 'Completed'] as const

export type TaskPriority = (typeof TaskPriorities)[number]
export type TaskStatus = (typeof TaskStatuses)[number]

export interface Task {
  id: number
  projectId: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
}
