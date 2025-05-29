import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { notifyInfo } from '@/utils/toast'

export const authGuard: NavigationGuard = (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    notifyInfo('Please sign in to access this page.')
    return { name: 'home', query: { redirect: to.fullPath } }
  }

  return true
}
