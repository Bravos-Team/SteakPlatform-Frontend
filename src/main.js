import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/config/tailwind.css'
import router from './router'

const pinia = createPinia()
pinia.use(persist)

const app = createApp(App)

app.use(router).use(pinia)

router.afterEach((to) => {
  document.title = to.meta.title
})

app.mount('#app')
