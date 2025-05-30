import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskFilters from '@/components/TaskFilters.vue'
import { TaskPriorities, TaskStatuses } from '@/types/task'

describe('TaskFilters.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(TaskFilters, {
      global: {
        stubs: {
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click')"><slot /></button>`,
          },
        },
      },
    })
  })

  it('renders priority and status select inputs with options', () => {
    const priorityOptions = wrapper.findAll('#priority option')
    const statusOptions = wrapper.findAll('#status option')

    expect(priorityOptions).toHaveLength(TaskPriorities.length + 1)
    expect(statusOptions).toHaveLength(TaskStatuses.length + 1)
  })

  it('emits update-filters when priority is changed', async () => {
    const select = wrapper.find('#priority')
    await select.setValue(TaskPriorities[0])

    expect(wrapper.emitted('update-filters')).toBeTruthy()
    expect(wrapper.emitted('update-filters')!.at(-1)).toEqual([
      { priority: TaskPriorities[0], status: '' },
    ])
  })

  it('emits update-filters when status is changed', async () => {
    const select = wrapper.find('#status')
    await select.setValue(TaskStatuses[1])

    expect(wrapper.emitted('update-filters')).toBeTruthy()
    expect(wrapper.emitted('update-filters')!.at(-1)).toEqual([
      { priority: '', status: TaskStatuses[1] },
    ])
  })

  it('resets filters when reset button is clicked', async () => {
    await wrapper.find('#priority').setValue(TaskPriorities[0])
    await wrapper.find('#status').setValue(TaskStatuses[0])
    await wrapper.findComponent({ name: 'BaseButton' }).trigger('click')

    expect(wrapper.find('#priority').element.value).toBe('')
    expect(wrapper.find('#status').element.value).toBe('')
    expect(wrapper.emitted('update-filters')!.at(-1)).toEqual([{ priority: '', status: '' }])
  })
})
