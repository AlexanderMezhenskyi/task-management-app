import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/authApi'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const isAuthenticated = ref<boolean>(false)

    // Sync
    const login = (newToken: string) => {
      token.value = newToken
      isAuthenticated.value = true
    }

    const logout = () => {
      token.value = null
      isAuthenticated.value = false
    }

    // Async (API)
    const loginAsync = async (email: string, password: string) => {
      return await authApi.login(email, password)
    }

    const logoutAsync = async () => {
      await authApi.logout()
    }

    return { token, isAuthenticated, login, logout, loginAsync, logoutAsync }
  },
  {
    persist: {
      key: 'auth-store',
      storage: localStorage,
    },
  },
)
