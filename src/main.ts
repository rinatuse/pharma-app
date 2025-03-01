import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import { convexClient } from './lib/convex'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

// Предоставляем клиент Convex всему приложению
app.provide('convexClient', convexClient)

app.mount('#app')