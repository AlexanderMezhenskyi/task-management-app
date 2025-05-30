import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import AppLoader from '@/components/AppLoader.vue'

describe('Loader.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(AppLoader)
  })

  it('renders the loader container', () => {
    expect(wrapper.find('.loader-container').exists()).toBe(true)
  })

  it('renders the spinner element', () => {
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})
