<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
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
      <form class="flex column" @submit.prevent="$emit('close')">
        <input type="email" placeholder="john.doe@example.com" required />
        <input type="password" placeholder="password" required />
        <BaseButton type="submit">Login</BaseButton>
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
