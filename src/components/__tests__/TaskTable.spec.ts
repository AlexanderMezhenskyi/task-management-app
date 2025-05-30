import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskTable from '@/components/TaskTable.vue'
import type { Task } from '@/types/task'
import type { SortOption } from '@/types/sort'

describe('TaskTable.vue', () => {
  let wrapper: VueWrapper
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task A',
      description: 'Description A',
      dueDate: '2025-06-01',
      priority: 'High',
      status: 'Pending',
      projectId: 1,
    },
    {
      id: 2,
      title: 'Task B',
      description: 'Description B',
      dueDate: '2025-06-02',
      priority: 'Low',
      status: 'In Progress',
      projectId: 1,
    },
  ]

  const sort: SortOption = {
    field: 'priority',
    direction: 'asc',
  }

  beforeEach(() => {
    wrapper = mount(TaskTable, {
      props: { tasks, sort },
      global: {
        stubs: {
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click')"><slot /></button>`,
          },
          SortArrow: {
            name: 'SortArrow',
            props: ['direction'],
            template: `<span class="sort-arrow">{{ direction }}</span>`,
          },
          TaskItem: {
            name: 'TaskItem',
            props: ['task'],
            template: `<div class="task-item">{{ task.title }}</div>`,
          },
        },
      },
    })
  })

  it('renders table headers', () => {
    const header = wrapper.find('.task-header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toContain('Title')
    expect(header.text()).toContain('Priority')
    expect(header.text()).toContain('Status')
    expect(header.text()).toContain('Due date')
    expect(header.text()).toContain('Actions')
  })

  it('renders all tasks', () => {
    const taskItems = wrapper.findAll('.task-item')
    expect(taskItems).toHaveLength(tasks.length)
    expect(taskItems[0].text()).toContain('Task A')
    expect(taskItems[1].text()).toContain('Task B')
  })

  it('emits toggle-sort when clicking on sortable headers', async () => {
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    const events = wrapper.emitted('toggle-sort') || []
    const fields = events.map((e) => e[0])
    expect(fields).toContain('priority')
    expect(fields).toContain('status')
  })

  it('emits edit-task and remove-task from TaskItem', async () => {
    wrapper = mount(TaskTable, {
      props: { tasks, sort },
      global: {
        stubs: {
          BaseButton: true,
          SortArrow: true,
          TaskItem: {
            name: 'TaskItem',
            props: ['task'],
            template: `<div>
              <button @click="$emit('edit-task')">Edit</button>
              <button @click="$emit('remove-task')">Remove</button>
            </div>`,
          },
        },
      },
    })

    const taskItems = wrapper.findAllComponents({ name: 'TaskItem' })
    await taskItems[0].find('button').trigger('click')
    await taskItems[0].findAll('button')[1].trigger('click')

    expect(wrapper.emitted('edit-task')?.[0]).toEqual([tasks[0]])
    expect(wrapper.emitted('remove-task')?.[0]).toEqual([tasks[0].id])
  })
})
