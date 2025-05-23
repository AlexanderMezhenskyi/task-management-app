<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav flex align-center justify-between">
        <RouterLink to="/" class="title-link flex align-center"> Task Management </RouterLink>

        <ul class="nav-links flex">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/projects">Projects</RouterLink></li>
        </ul>
      </nav>
    </div>
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
</style>
