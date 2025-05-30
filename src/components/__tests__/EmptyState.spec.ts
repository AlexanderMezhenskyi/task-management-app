import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import EmptyState from '@/components/EmptyState.vue'

describe('EmptyState.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(EmptyState, {
      props: {
        title: 'No Projects',
        message: 'You have no projects yet.',
      },
      slots: {
        action: '<button>New Project</button>',
      },
    })
  })

  it('renders the title and message', () => {
    expect(wrapper.find('.empty-title').text()).toBe('No Projects')
    expect(wrapper.find('.empty-message').text()).toBe('You have no projects yet.')
  })

  it('renders the InboxIcon component', () => {
    const icon = wrapper.findComponent({ name: 'InboxIcon' })
    expect(icon.exists()).toBe(true)
  })

  it('renders the action slot content', () => {
    const slot = wrapper.find('button')
    expect(slot.exists()).toBe(true)
    expect(slot.text()).toBe('New Project')
  })
})
