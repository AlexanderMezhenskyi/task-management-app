import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { notifyError } from '@/utils/toast'

const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    if (status === 401) {
      const auth = useAuthStore()
      auth.logout()
      await router.push('/')
    }

    if (status >= 500) {
      notifyError(`${message}` || 'Server error occurred. Try again later.')
    }

    return Promise.reject(error)
  },
)

export default api
