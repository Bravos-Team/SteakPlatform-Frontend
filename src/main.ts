import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouteLocationNormalized } from 'vue-router'
import './assets/config/tailwind.css'

const pinia = createPinia()
pinia.use(persist)

const app = createApp(App)

app.use(router).use(pinia)

router.afterEach((to: RouteLocationNormalized) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
})

app.mount('#app')
