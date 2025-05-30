import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useProjectStore } from '@/stores/projectStore'
import ProjectDetails from '@/components/ProjectDetails.vue'
import { notifySuccess } from '@/utils/toast'

vi.mock('vue-router', async () => {
  const actual = await import('vue-router')
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
    useRoute: () => ({ params: { id: 1 } }),
  }
})

vi.mock('@/utils/toast', () => ({
  notifySuccess: vi.fn(),
  notifyError: vi.fn(),
}))

describe('ProjectDetails.vue', () => {
  let wrapper: VueWrapper
  let fetchProjectByIdAsync: ReturnType<typeof vi.fn>
  let fetchTasksByProjectIdAsync: ReturnType<typeof vi.fn>
  let createTaskAsync: ReturnType<typeof vi.fn>
  let updateTaskAsync: ReturnType<typeof vi.fn>
  let removeTaskAsync: ReturnType<typeof vi.fn>

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false, createSpy: vi.fn })

    const projectStore = useProjectStore(pinia)
    const taskStore = useTaskStore(pinia)

    fetchProjectByIdAsync = vi
      .fn()
      .mockResolvedValue({ id: 1, title: 'Test Project', dueDate: '2023-12-31' })
    fetchTasksByProjectIdAsync = vi.fn().mockResolvedValue([])
    createTaskAsync = vi.fn().mockResolvedValue({ id: 1, title: 'New Task', dueDate: '2023-12-31' })
    updateTaskAsync = vi.fn().mockResolvedValue({ id: 1, title: 'New Task', dueDate: '2023-12-31' })
    removeTaskAsync = vi.fn().mockResolvedValue(null)

    projectStore.fetchProjectByIdAsync = fetchProjectByIdAsync
    taskStore.fetchTasksByProjectIdAsync = fetchTasksByProjectIdAsync
    taskStore.createTaskAsync = createTaskAsync
    taskStore.updateTaskAsync = updateTaskAsync
    taskStore.removeTaskAsync = removeTaskAsync

    wrapper = mount(ProjectDetails, {
      global: {
        plugins: [pinia],
        stubs: {
          AppLoader: true,
          BaseButton: true,
          CircleArrowLeftIcon: true,
          EmptyState: true,
          TaskFilters: true,
          TaskModal: true,
          TaskTable: true,
        },
      },
    })
  })

  it('fetches project and tasks on mount', async () => {
    await nextTick()
    expect(fetchProjectByIdAsync).toHaveBeenCalledWith(1)
    expect(fetchTasksByProjectIdAsync).toHaveBeenCalledWith(1)
  })

  it('creates a new task', async () => {
    await wrapper.vm.createTask({ title: 'New Task', priority: 'High', status: 'Pending' })
    expect(createTaskAsync).toHaveBeenCalled()
    expect(fetchTasksByProjectIdAsync).toHaveBeenCalled()
    expect(notifySuccess).toHaveBeenCalledWith('Task created successfully.')
  })

  it('updates a task', async () => {
    await wrapper.vm.updateTask({
      id: 1,
      title: 'Updated Task',
      priority: 'Medium',
      status: 'In Progress',
    })
    expect(updateTaskAsync).toHaveBeenCalled()
    expect(fetchTasksByProjectIdAsync).toHaveBeenCalled()
    expect(notifySuccess).toHaveBeenCalledWith('Task updated successfully.')
  })

  it('removes a task', async () => {
    await wrapper.vm.removeTask(1)
    expect(removeTaskAsync).toHaveBeenCalledWith(1)
    expect(fetchTasksByProjectIdAsync).toHaveBeenCalled()
    expect(notifySuccess).toHaveBeenCalledWith('Task deleted successfully.')
  })
})
