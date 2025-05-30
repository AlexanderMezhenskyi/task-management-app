import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProjectTable from '@/components/ProjectTable.vue'
import type { Project } from '@/types/project'

describe('ProjectTable.vue', () => {
  let wrapper: VueWrapper
  const projects: Project[] = [
    { id: 1, title: 'Project A', dueDate: '2025-06-01' },
    { id: 2, title: 'Project B', dueDate: '2025-07-01' },
  ]

  beforeEach(() => {
    wrapper = mount(ProjectTable, {
      props: { projects },
      global: {
        stubs: {
          ProjectItem: {
            name: 'ProjectItem',
            props: ['project'],
            template: `
              <div class="project-item">
                <span>{{ project.title }}</span>
                <button class="edit" @click="$emit('edit-project')">Edit</button>
                <button class="remove" @click="$emit('remove-project')">Remove</button>
              </div>
            `,
          },
        },
      },
    })
  })

  it('renders all ProjectItem components', () => {
    const items = wrapper.findAll('.project-item')
    expect(items).toHaveLength(projects.length)
    expect(items[0].text()).toContain('Project A')
    expect(items[1].text()).toContain('Project B')
  })

  it('emits "edit-project" with correct project', async () => {
    const editButtons = wrapper.findAll('.edit')
    await editButtons[0].trigger('click')

    expect(wrapper.emitted('edit-project')).toBeTruthy()
    expect(wrapper.emitted('edit-project')![0]).toEqual([projects[0]])
  })

  it('emits "remove-project" with correct project id', async () => {
    const removeButtons = wrapper.findAll('.remove')
    await removeButtons[1].trigger('click')

    expect(wrapper.emitted('remove-project')).toBeTruthy()
    expect(wrapper.emitted('remove-project')![0]).toEqual([projects[1].id])
  })
})
