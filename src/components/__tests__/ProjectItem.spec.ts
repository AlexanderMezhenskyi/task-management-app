import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import type { Project } from '@/types/project'
import type ProjectItemType from '@/components/ProjectItem.vue'

vi.doMock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
  return {
    ...actual,
    useRoute: vi.fn(),
  }
})

vi.doMock('@/composables/useDueDateStatus', () => ({
  useDueDateStatus: vi.fn(() => 'due-soon'),
}))

describe('ProjectItem.vue', () => {
  let wrapper: VueWrapper
  let useRoute: ReturnType<typeof vi.fn>

  const project: Project = {
    id: 1,
    title: 'Test Project',
    dueDate: '2025-06-08',
  }

  const mountComponent = async (isAuthenticated = true, routeName = 'projects') => {
    const vueRouter = await import('vue-router')
    useRoute = vueRouter.useRoute as ReturnType<typeof vi.fn>
    useRoute.mockReturnValue({ name: routeName })

    const ProjectItem = (await import('@/components/ProjectItem.vue'))
      .default as typeof ProjectItemType

    return mount(ProjectItem, {
      props: { project },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                isAuthenticated,
              },
            },
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          RouterLink: {
            name: 'RouterLink',
            template: '<a><slot /></a>',
          },
          BaseButton: {
            name: 'BaseButton',
            template: `<button @click="$emit('click-button')"><slot /></button>`,
          },
        },
      },
    })
  }

  beforeEach(async () => {
    wrapper = await mountComponent()
  })

  it('renders project title', () => {
    expect(wrapper.text()).toContain('Test Project')
  })

  it('renders due date', () => {
    expect(wrapper.text()).toContain('8 Jun 2025')
  })

  it('emits edit-project and remove-project events', async () => {
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    expect(buttons.length).toBeGreaterThanOrEqual(2)

    await buttons[0].trigger('click')
    expect(wrapper.emitted('edit-project')).toHaveLength(1)

    await buttons[1].trigger('click')
    expect(wrapper.emitted('remove-project')).toHaveLength(1)
  })

  it('renders RouterLink when authenticated', () => {
    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.exists()).toBe(true)
  })

  it('renders plain title when not authenticated', async () => {
    wrapper = await mountComponent(false)
    expect(wrapper.findComponent({ name: 'RouterLink' }).exists()).toBe(false)
    expect(wrapper.text()).toContain('Test Project')
  })

  it('applies due date class from useDueDateStatus', () => {
    const dueDateEl = wrapper.find('.mobile-view-wrap > div')
    expect(dueDateEl.classes()).toContain('due-soon')
  })

  it('does not render edit/remove buttons if not on projects route', async () => {
    wrapper = await mountComponent(true, 'home')
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' })
    expect(buttons.length).toBe(0)
  })
})
