import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/task'

vi.mock('@/composables/useDueDateStatus', () => ({
  useDueDateStatus: vi.fn(() => 'due-soon'),
}))

describe('TaskItem.vue', () => {
  let wrapper: VueWrapper

  const task: Task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    dueDate: '2025-06-01',
    priority: 'High',
    status: 'In Progress',
  }

  beforeEach(() => {
    wrapper = mount(TaskItem, {
      props: { task },
      global: {
        stubs: {
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click-button')"><slot /></button>`,
          },
          EditIcon: true,
          RemoveIcon: true,
          StatusBadge: {
            name: 'StatusBadge',
            props: ['label', 'type'],
            template: `<span class="badge">{{ label }} ({{ type }})</span>`,
          },
        },
      },
    })
  })

  it('renders task title and description', () => {
    expect(wrapper.text()).toContain('Test Task')
    expect(wrapper.text()).toContain('This is a test task')
  })

  it('renders priority and status badges', () => {
    const badges = wrapper.findAll('.badge')
    expect(badges).toHaveLength(2)
    expect(badges[0].text()).toContain('High')
    expect(badges[1].text()).toContain('In Progress')
  })

  it('renders formatted due date', () => {
    expect(wrapper.text()).toContain('1 Jun 2025')
  })

  it('applies due date class from useDueDateStatus', () => {
    const mobileWraps = wrapper.findAll('.mobile-view-wrap')
    const dueDateEl = mobileWraps[1].findAll('div')[0]
    expect(dueDateEl.classes()).toContain('due-soon')
  })

  it('emits edit-task and remove-task events', async () => {
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('edit-task')).toHaveLength(1)
    expect(wrapper.emitted('remove-task')).toHaveLength(1)
  })
})
