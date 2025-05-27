import axios from 'axios'
import router from '@/router'
import { showToast } from '@/utils/toast'

const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    if (status === 401) {
      showToast('Unauthorized. Redirecting to Home.', 'error')
      localStorage.removeItem('token')
      await router.push('/')
    }

    if (status >= 500) {
      showToast(`${message}` || 'Server error occurred. Try again later.', 'error')
    }

    return Promise.reject(error)
  },
)

export default api
