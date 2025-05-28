<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import AuthorizationModal from '@/components/AuthorizationModal.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const auth = useAuthStore()
const { logout } = auth
const { isAuthenticated } = storeToRefs(auth)

const showLogin = ref(false)
const openLogin = () => (showLogin.value = true)
const closeLogin = () => (showLogin.value = false)

const authClick = () => {
  if (isAuthenticated) {
    logout()
    router.push({ name: 'home' })
  } else {
    openLogin()
  }
}
</script>

<template>
  <header class="header">
    <section class="container">
      <div class="flex justify-between align-center">
        <RouterLink to="/" class="title-link flex align-center"> Task Management </RouterLink>
        <div class="flex align-center">
          <nav class="nav flex align-center justify-end">
            <ul class="nav-links flex align-center">
              <li><RouterLink to="/">Home</RouterLink></li>
              <li v-if="isAuthenticated"><RouterLink to="/projects">Projects</RouterLink></li>
            </ul>
          </nav>
          <BaseButton
            class="sign-in-button"
            size="sm"
            :bg-color="'var(--color-primary-dark)'"
            @click-button="authClick"
          >
            {{ isAuthenticated ? 'Sign out' : 'Sign in' }}
          </BaseButton>
        </div>
      </div>

      <AuthorizationModal v-if="showLogin" @close="closeLogin" />
    </section>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-primary);
  padding: 8px 0;
  box-shadow: var(--shadow-default-bottom);
}

.title-link {
  color: var(--color-text-inverted);
  font-weight: 500;
  font-size: 28px;
}

.nav-links {
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: var(--color-text-inverted);
  font-weight: 500;

  &.router-link-active {
    color: var(--color-text-inverted);
    border-bottom: 2px solid var(--color-text-inverted);
  }
}

.sign-in-button {
  margin-left: 24px;
}
</style>
