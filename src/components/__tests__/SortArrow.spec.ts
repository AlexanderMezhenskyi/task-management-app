import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortArrow from '@/components/SortArrow.vue'

describe('SortArrow.vue', () => {
  it('renders ArrowDownIcon when direction is "asc"', () => {
    const wrapper = mount(SortArrow, {
      props: { direction: 'asc' },
      global: {
        stubs: {
          ArrowDownIcon: {
            name: 'ArrowDownIcon',
            template: '<div class="arrow-down">↓</div>',
          },
          ArrowUpIcon: {
            name: 'ArrowUpIcon',
            template: '<div class="arrow-up">↑</div>',
          },
        },
      },
    })

    expect(wrapper.find('.arrow-down').exists()).toBe(true)
    expect(wrapper.find('.arrow-up').exists()).toBe(false)
  })

  it('renders ArrowUpIcon when direction is "desc"', () => {
    const wrapper = mount(SortArrow, {
      props: { direction: 'desc' },
      global: {
        stubs: {
          ArrowDownIcon: {
            name: 'ArrowDownIcon',
            template: '<div class="arrow-down">↓</div>',
          },
          ArrowUpIcon: {
            name: 'ArrowUpIcon',
            template: '<div class="arrow-up">↑</div>',
          },
        },
      },
    })

    expect(wrapper.find('.arrow-up').exists()).toBe(true)
    expect(wrapper.find('.arrow-down').exists()).toBe(false)
  })
})
