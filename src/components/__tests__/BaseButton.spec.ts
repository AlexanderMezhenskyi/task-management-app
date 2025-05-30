import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
        size: 'md',
        type: 'button',
        textColor: 'white',
        bgColor: 'black',
        noPadding: false,
      },
      slots: {
        default: 'Click me',
      },
    })
  })

  it('renders correctly with default slot', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click me')
  })

  it('applies correct classes and styles', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('base-button')
    expect(button.classes()).toContain('variant-primary')
    expect(button.classes()).toContain('size-md')
    expect(button.attributes('style')).toContain('color: white;')
    expect(button.attributes('style')).toContain('background-color: black;')
  })

  it('emits click-button event on click', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click-button')).toBeTruthy()
    expect(wrapper.emitted('click-button')?.length).toBe(1)
  })

  it('respects disabled attribute', async () => {
    await wrapper.setProps({ disabled: true })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('applies no-padding class when noPadding is true', async () => {
    await wrapper.setProps({ noPadding: true })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('no-padding')
  })
})
