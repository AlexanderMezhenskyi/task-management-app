import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '@/components/StatusBadge.vue'

describe('StatusBadge.vue', () => {
  it('renders the label text', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        label: 'High',
        type: 'priority',
      },
    })

    expect(wrapper.text()).toBe('High')
  })

  it('applies normalized class from label', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        label: 'In Progress',
        type: 'status',
      },
    })

    expect(wrapper.classes()).toContain('in-progress')
  })

  it('applies type class', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        label: 'Completed',
        type: 'status',
      },
    })

    expect(wrapper.classes()).toContain('status')
  })

  it('applies both type and normalized label class', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        label: 'Medium',
        type: 'priority',
      },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['badge', 'priority', 'medium']))
  })
})
