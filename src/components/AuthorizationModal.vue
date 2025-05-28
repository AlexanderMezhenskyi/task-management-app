<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'
import AppLoader from '@/components/AppLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const router = useRouter()

const { login, loginAsync } = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0
})

const handleLogin = async () => {
  if (!isFormValid.value) return

  isLoading.value = true

  try {
    const token = await loginAsync(email.value, password.value)
    const redirect = route.query.redirect || '/'
    login(token)
    await router.push(redirect as string)
    emit('close')
  } catch (err) {
    error.value = err.response.data.message || 'Sign in failed.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AppLoader v-if="isLoading" />
  <ErrorBanner v-if="error" :message="error" />
  <div class="auth-modal flex justify-center align-center" @click.self="$emit('close')">
    <div class="auth-modal-content">
      <div class="auth-modal-header flex justify-between align-center">
        <h2>Sign in</h2>
        <BaseButton
          class="cursor"
          no-padding
          size="sm"
          variant="ghost"
          :text-color="'var(--color-text)'"
          @click-button="$emit('close')"
        >
          <CloseIcon />
        </BaseButton>
      </div>
      <form class="flex column" @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="john.doe@example.com" required />
        <input v-model="password" type="password" placeholder="password" required />
        <BaseButton type="submit" :disabled="!isFormValid" @click-button="handleLogin"
          >Login</BaseButton
        >
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.auth-modal-content {
  width: 90%;
  max-width: 400px;
  background: var(--color-surface);
  padding: 32px;
  border-radius: 8px;
}

.auth-modal-header {
  margin-bottom: 16px;
}

form {
  gap: 16px;
}

input {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  outline: none;
  background-color: var(--color-surface);
  color: var(--color-text);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
  }

  &::placeholder {
    color: var(--color-text-light);
    opacity: 0.7;
  }
}
</style>
