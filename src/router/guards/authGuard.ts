import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { showToast } from '@/utils/toast'

export const authGuard: NavigationGuard = (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    showToast('Please sign in to access this page.', 'info')
    return { name: 'home', query: { redirect: to.fullPath } }
  }

  return true
}
