<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import AuthorizationModal from '@/components/AuthorizationModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import ProjectList from '@/components/ProjectList.vue'

const router = useRouter()

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const showLogin = ref(false)
const openLogin = () => (showLogin.value = true)
const closeLogin = () => (showLogin.value = false)

const goToProjects = () => {
  router.push({ name: 'projects' })
}
</script>

<template>
  <section class="home-view container" :class="{ centered: projects.length === 0 }">
    <div class="welcome-wrap">
      <h1>Welcome to Task Management App</h1>
      <p>Manage your projects, tasks and deadlines — all in one place.</p>
      <div>
        <BaseButton v-if="!isAuthenticated" @click-button="openLogin">Sign in</BaseButton>
        <BaseButton v-else @click-button="goToProjects">Go to projects</BaseButton>
      </div>
    </div>

    <div v-if="projects.length > 0" class="recent-projects">
      <h2>Recent projects</h2>
      <ProjectList />
    </div>

    <AuthorizationModal v-if="showLogin" @close="closeLogin" />
  </section>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 32px 0;

  &.centered {
    justify-content: center;
    align-items: center;
  }
}

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
