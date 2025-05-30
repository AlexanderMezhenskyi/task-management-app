import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProjectModal from '@/components/ProjectModal.vue'
import type { Project } from '@/types/project'

describe('ProjectModal.vue', () => {
  const projectToEdit: Project = {
    id: 1,
    title: 'Test Project',
    dueDate: '2025-06-01',
  }

  let wrapper: VueWrapper

  const mountComponent = (props = {}) => {
    wrapper = mount(ProjectModal, {
      props: {
        ...props,
      },
      global: {
        stubs: {
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click-button')" @submit="$emit('submit')"><slot /></button>`,
          },
          CloseIcon: true,
        },
      },
    })
  }

  it('renders "Create project" title when no projectToEdit', () => {
    mountComponent()
    expect(wrapper.text()).toContain('Create project')
  })

  it('renders "Edit project" title when projectToEdit is provided', () => {
    mountComponent({ projectToEdit })
    expect(wrapper.text()).toContain('Edit project')
  })

  it('fills form fields when editing a project', () => {
    mountComponent({ projectToEdit })
    const titleInput = wrapper.find('input#title')
    const dateInput = wrapper.find('input#due-date')

    expect(titleInput.element.value).toBe(projectToEdit.title)
    expect(dateInput.element.value).toBe(projectToEdit.dueDate)
  })

  it('emits "create" event with correct payload', async () => {
    mountComponent()
    await wrapper.find('input#title').setValue('New Project')
    await wrapper.find('input#due-date').setValue('2025-07-01')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('create')).toBeTruthy()
    expect(wrapper.emitted('create')[0][0]).toEqual({
      title: 'New Project',
      dueDate: '2025-07-01',
    })
  })

  it('emits "update" event with correct payload', async () => {
    mountComponent({ projectToEdit })
    await wrapper.find('input#title').setValue('Updated Project')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')[0][0]).toEqual({
      id: 1,
      title: 'Updated Project',
      dueDate: '2025-06-01',
    })
  })

  it('does not emit if form is invalid', async () => {
    mountComponent()
    await wrapper.find('input#title').setValue('')
    await wrapper.find('input#due-date').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('create')).toBeFalsy()
    expect(wrapper.emitted('update')).toBeFalsy()
  })

  it('emits "close" when clicking outside modal or close button', async () => {
    mountComponent()
    await wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
