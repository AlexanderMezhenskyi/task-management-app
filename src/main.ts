import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupMocks } from '@/api/mock'
import { showToast } from '@/utils/toast'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')

setupMocks()

app.config.errorHandler = (err) => {
  showToast(`Unexpected error: ${err}`, 'error')
}
