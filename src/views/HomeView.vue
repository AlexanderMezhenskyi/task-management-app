<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ProjectList from '@/components/ProjectList.vue'
import AuthorizationModal from '@/components/AuthorizationModal.vue'

const showLogin = ref(false)
const openLogin = () => (showLogin.value = true)
const closeLogin = () => (showLogin.value = false)
</script>

<template>
  <section class="home-view container">
    <div class="welcome-wrap">
      <h1>Welcome to Task Management App</h1>
      <p>Manage your projects, tasks and deadlines — all in one place.</p>
      <BaseButton @click-button="openLogin">Sign in</BaseButton>
    </div>

    <div class="recent-projects">
      <h2>Recent projects</h2>
      <ProjectList />
    </div>

    <AuthorizationModal v-if="showLogin" @close="closeLogin" />
  </section>
</template>

<style scoped>
.welcome-wrap {
  text-align: center;
  padding: 32px 0;
  margin-bottom: 32px;

  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 32px;
    color: var(--color-text-light);
  }
}

.recent-projects {
  margin-bottom: 32px;
  h2 {
    padding: 0 16px 16px;
  }
}
</style>
