<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer text-center">
    <div class="container">
      <div>&copy; {{ year }}</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  color: var(--color-text-inverted);
  background: var(--color-primary);
  padding: 8px 0;
  box-shadow: var(--shadow-default-top);
}
</style>
