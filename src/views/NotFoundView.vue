<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goHomeView = () => router.push({ name: 'home' })
</script>

<template>
  <section class="not-found container flex column align-center">
    <h1>404 – Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <BaseButton @click-button="goHomeView">Back to Home</BaseButton>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;

  h1 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 32px;
  }
}
</style>
