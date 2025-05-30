import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { createTestingPinia } from '@pinia/testing'
import AuthorizationModal from '@/components/AuthorizationModal.vue'

const push = vi.fn()

vi.mock('vue-router', async () => {
  const actual = await import('vue-router')
  return {
    ...actual,
    useRouter: () => ({ push }),
    useRoute: () => ({ query: {} }),
  }
})

vi.mock('@/utils/toast', () => ({
  notifySuccess: vi.fn(),
  notifyError: vi.fn(),
}))

describe('AuthorizationModal.vue', () => {
  let wrapper: VueWrapper
  let loginAsyncMock: ReturnType<typeof vi.fn>
  let loginMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    loginAsyncMock = vi.fn().mockResolvedValue('mock-token')
    loginMock = vi.fn()

    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
    })

    const store = useAuthStore(pinia)
    store.loginAsync = loginAsyncMock
    store.login = loginMock

    wrapper = mount(AuthorizationModal, {
      global: {
        plugins: [pinia],
      },
    })
  })

  it('renders modal with inputs and button', () => {
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('disables submit button when form is invalid', async () => {
    await wrapper.find('input[type="email"]').setValue('')
    await wrapper.find('input[type="password"]').setValue('')
    await nextTick()

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('calls login and emits close on successful login', async () => {
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(loginAsyncMock).toHaveBeenCalledWith('john@example.com', 'password123')
    expect(loginMock).toHaveBeenCalledWith('mock-token')

    const { notifySuccess } = await import('@/utils/toast')
    expect(notifySuccess).toHaveBeenCalledWith('Signed in successfully')
    expect(push).toHaveBeenCalledWith('/')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('shows error notification on failed login', async () => {
    loginAsyncMock.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    })

    await wrapper.find('input[type="email"]').setValue('wrong@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    const { notifyError } = await import('@/utils/toast')
    expect(notifyError).toHaveBeenCalledWith('Invalid credentials')
  })

  it('emits close when clicking outside modal', async () => {
    await wrapper.find('.auth-modal').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
