import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Toast from 'vue-toastification'
import { toastOptions } from '@/plugins/toastOptions'
import 'vue-toastification/dist/index.css'

import { setupMocks } from '@/api/mock'
import { notifyError } from '@/utils/toast'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')

setupMocks()

app.config.errorHandler = (err) => {
  notifyError(`Unexpected error: ${err}`)
}
