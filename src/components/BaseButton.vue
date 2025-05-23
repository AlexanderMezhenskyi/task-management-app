<script setup lang="ts">
interface BaseButtonProps {
  type?: 'button' | 'edit' | 'delete'
}

const { type = 'button' } = defineProps<BaseButtonProps>()

defineEmits<{
  (e: 'clickButton'): void
}>()
</script>

<template>
  <button
    :type="type"
    class="base-button inline-flex justify-center align-center"
    @click="$emit('clickButton')"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color-text-inverted);
  background-color: var(--color-primary);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }
}
</style>
