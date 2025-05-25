<script setup lang="ts">
import { computed } from 'vue'

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  textColor?: string
  bgColor?: string
  noPadding?: boolean
}

const {
  type = 'button',
  variant = 'primary',
  size = 'md',
  textColor = '',
  bgColor = '',
  noPadding = false,
} = defineProps<BaseButtonProps>()

defineEmits<{
  (e: 'clickButton'): void
}>()

const baseClass = computed(() => {
  return ['base-button', `variant-${variant}`, `size-${size}`, { 'no-padding': noPadding }]
})

const inlineStyle = computed(() => ({
  color: textColor || '',
  backgroundColor: bgColor || '',
}))
</script>

<template>
  <button :type="type" :class="baseClass" :style="inlineStyle" @click="$emit('clickButton')">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.size-sm {
  padding: 6px 12px;
  font-size: 14px;
}

.size-md {
  padding: 8px 20px;
  font-size: 16px;
}

.size-lg {
  padding: 12px 24px;
  font-size: 18px;
}

.variant-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverted);

  &:hover {
    background-color: var(--color-primary-dark);
  }
}

.variant-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);

  &:hover {
    background-color: var(--color-secondary-dark);
  }
}

.variant-danger {
  background-color: var(--color-error);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-error-dark);
  }
}

.variant-ghost {
  background-color: transparent;
  color: var(--color-primary);
}
.no-padding {
  padding: 0;
}
</style>
