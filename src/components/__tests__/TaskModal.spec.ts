import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskModal from '@/components/TaskModal.vue'
import type { Task } from '@/types/task'

const mockRoute = {
  params: { id: '42' },
}

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
}))

describe('TaskModal.vue', () => {
  let wrapper: VueWrapper
  let taskToEdit: Task | null = null

  const mountComponent = () => {
    wrapper = mount(TaskModal, {
      props: { taskToEdit },
      global: {
        stubs: {
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click-button')" @click="$emit('click')"><slot /></button>`,
          },
          CloseIcon: true,
        },
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    taskToEdit = null
    mountComponent()
  })

  it('renders create form by default', () => {
    expect(wrapper.text()).toContain('Create task')
    expect(wrapper.find('input#title').element.value).toBe('')
  })

  it('renders edit form when taskToEdit is provided', async () => {
    taskToEdit = {
      id: 1,
      title: 'Edit Me',
      description: 'Edit description',
      dueDate: '2025-06-10',
      priority: 'High',
      status: 'In Progress',
      projectId: 42,
    }
    mountComponent()

    expect(wrapper.text()).toContain('Edit task')
    expect(wrapper.find('input#title').element.value).toBe('Edit Me')
    expect(wrapper.find('textarea#desc').element.value).toBe('Edit description')
  })

  it('emits close when clicking outside modal or close button', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()

    await wrapper.findComponent({ name: 'BaseButton' }).trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('disables submit button when form is invalid', () => {
    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('emits create event with correct payload', async () => {
    await wrapper.find('#title').setValue('New Task')
    await wrapper.find('#desc').setValue('Some description')
    await wrapper.find('#priority').setValue('High')
    await wrapper.find('#status').setValue('Pending')
    await wrapper.find('#due-date').setValue('2025-06-15')

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeUndefined()

    await button.trigger('submit')

    const emitted = wrapper.emitted('create')?.[0][0]
    expect(emitted).toMatchObject({
      title: 'New Task',
      description: 'Some description',
      priority: 'High',
      status: 'Pending',
      dueDate: '2025-06-15',
      projectId: 42,
    })
  })

  it('emits update event with correct payload when editing', async () => {
    taskToEdit = {
      id: 5,
      title: 'Old Title',
      description: 'Old Desc',
      dueDate: '2025-06-01',
      priority: 'Low',
      status: 'Pending',
      projectId: 42,
    }
    mountComponent()

    await wrapper.find('#title').setValue('Updated Title')
    await wrapper.find('#desc').setValue('Updated Desc')
    await wrapper.find('#priority').setValue('High')
    await wrapper.find('#status').setValue('In Progress')
    await wrapper.find('#due-date').setValue('2025-06-20')

    await wrapper.find('button[type="submit"]').trigger('submit')

    const emitted = wrapper.emitted('update')?.[0][0]
    expect(emitted).toMatchObject({
      id: 5,
      title: 'Updated Title',
      description: 'Updated Desc',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2025-06-20',
      projectId: 42,
    })
  })
})
