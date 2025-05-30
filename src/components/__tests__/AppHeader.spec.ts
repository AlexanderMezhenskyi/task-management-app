import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { createTestingPinia } from '@pinia/testing'
import AppHeader from '@/components/AppHeader.vue'

const push = vi.fn()

vi.mock('vue-router', async () => {
  const actual = await import('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({ push })),
    RouterLink: { template: '<a><slot /></slot></a>' },
  }
})

vi.mock('@/utils/toast.ts', () => ({
  notifySuccess: vi.fn(),
}))

describe('AppHeader.vue', () => {
  let wrapper: VueWrapper
  let auth: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    vi.clearAllMocks()

    wrapper = mount(AppHeader, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
        stubs: ['RouterLink'],
      },
    })

    auth = useAuthStore()
  })

  it('renders "Sign in" when user is not authenticated', () => {
    expect(wrapper.text()).toContain('Sign in')
  })

  it('renders "Sign out" when user is authenticated', async () => {
    auth.isAuthenticated = true
    await nextTick()
    expect(wrapper.text()).toContain('Sign out')
  })

  it('shows modal when sign in button is clicked and user is not authenticated', async () => {
    expect(wrapper.findComponent({ name: 'AuthorizationModal' }).exists()).toBe(false)
    await wrapper.find('.sign-in-button').trigger('click')
    await nextTick()
    expect(wrapper.findComponent({ name: 'AuthorizationModal' }).exists()).toBe(true)
  })

  it('logs out and redirects when authenticated user clicks sign out', async () => {
    auth.isAuthenticated = true
    await nextTick()

    await wrapper.find('.sign-in-button').trigger('click')
    await nextTick()

    expect(auth.logout).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith({ name: 'home' })

    const { notifySuccess } = await import('@/utils/toast')
    expect(notifySuccess).toHaveBeenCalledWith('Signed out successfully')
  })
})
