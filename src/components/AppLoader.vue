<script setup lang="ts"></script>

<template>
  <div class="loader-container flex justify-center align-center">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
