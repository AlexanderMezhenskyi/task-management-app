<script setup lang="ts">
import { ref } from 'vue'
import AlertIcon from '@/components/icons/AlertIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

defineProps<{
  message: string
}>()

const visible = ref(true)
const close = () => (visible.value = false)
</script>

<template>
  <div v-if="visible" class="error-banner flex align-center">
    <AlertIcon />
    {{ message }}
    <BaseButton
      class="close-btn cursor"
      no-padding
      size="sm"
      variant="ghost"
      :text-color="'var(--color-white)'"
      @click-button="close"
    >
      <CloseIcon />
    </BaseButton>
  </div>
</template>

<style scoped>
.error-banner {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-white);
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  background-color: var(--color-error);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  gap: 8px;
  z-index: 9999;
}

.close-btn {
  margin-left: 8px;
}
</style>
