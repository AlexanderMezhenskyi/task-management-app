import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
import type { Project } from '@/types/project'

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
  return {
    ...actual,
    useRoute: () => ({ name: 'projects' }),
  }
})

vi.mock('@/utils/toast', () => ({
  notifySuccess: vi.fn(),
  notifyError: vi.fn(),
}))

describe('ProjectList.vue', () => {
  let wrapper: VueWrapper
  let projectStore: ReturnType<typeof useProjectStore>
  let taskStore: ReturnType<typeof useTaskStore>

  const mockProjects: Project[] = [
    { id: 1, title: 'Project A', dueDate: '2025-06-01' },
    { id: 2, title: 'Project B', dueDate: '2025-07-01' },
  ]

  beforeEach(async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false })

    projectStore = useProjectStore(pinia)
    taskStore = useTaskStore(pinia)

    taskStore.tasks = ref([
      { id: 1, projectId: 1 },
      { id: 2, projectId: 1 },
    ])

    projectStore.fetchProjectsAllAsync = vi.fn().mockResolvedValue(mockProjects)
    projectStore.createProjectAsync = vi.fn().mockResolvedValue({})
    projectStore.updateProjectAsync = vi.fn().mockResolvedValue({})
    projectStore.removeProjectAsync = vi.fn().mockResolvedValue({})
    taskStore.removeTaskAsync = vi.fn().mockResolvedValue({})

    wrapper = mount(await import('@/components/ProjectList.vue').then((m) => m.default), {
      global: {
        plugins: [pinia],
        stubs: ['AppLoader', 'BaseButton', 'EmptyState', 'ProjectModal', 'ProjectTable'],
      },
    })

    await flushPromises()
  })

  it('fetches projects on mount', () => {
    expect(projectStore.fetchProjectsAllAsync).toHaveBeenCalled()
    expect(wrapper.vm.projects).toHaveLength(2)
  })

  it('opens and closes project modal', async () => {
    wrapper.vm.openCreateModal()
    expect(wrapper.vm.isProjectModalOpen).toBe(true)

    wrapper.vm.closeProjectModal()
    expect(wrapper.vm.isProjectModalOpen).toBe(false)
  })

  it('creates a project', async () => {
    await wrapper.vm.createProject({ title: 'New', dueDate: '2025-08-01' })
    expect(projectStore.createProjectAsync).toHaveBeenCalled()
    expect(wrapper.vm.isProjectModalOpen).toBe(false)
  })

  it('updates a project', async () => {
    await wrapper.vm.updateProject(mockProjects[0])
    expect(projectStore.updateProjectAsync).toHaveBeenCalledWith(mockProjects[0])
    expect(wrapper.vm.isProjectModalOpen).toBe(false)
  })

  it('removes a project and its tasks', async () => {
    await wrapper.vm.removeProject(1)
    expect(projectStore.removeProjectAsync).toHaveBeenCalledWith(1)
    expect(taskStore.removeTaskAsync).toHaveBeenCalledTimes(2)
  })

  it('handles fetch error', async () => {
    projectStore.fetchProjectsAllAsync.mockRejectedValueOnce(new Error('fail'))
    await wrapper.vm.fetchProjects()
    expect(wrapper.vm.projects).toEqual([])
  })
})
