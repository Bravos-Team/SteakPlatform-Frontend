import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import Particles from 'vue3-particles'
import { RouteLocationNormalized } from 'vue-router'
// import { VueReCaptcha } from 'vue-recaptcha-v3'
import './assets/index.css'
const pinia = createPinia()
pinia.use(persist)

const app = createApp(App).use(Particles)

app.use(router).use(pinia).use(VueQueryPlugin)

router.afterEach((to: RouteLocationNormalized) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
})

app.mount('#app')
