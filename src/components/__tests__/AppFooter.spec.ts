import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(AppFooter)
  })

  it('renders the current year correctly', () => {
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(String(currentYear))
  })

  it('contains the required footer and container elements', () => {
    expect(wrapper.find('footer.footer').exists()).toBe(true)
    expect(wrapper.find('section.container').exists()).toBe(true)
  })
})
