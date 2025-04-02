import { createPinia } from 'pinia'
import { createApp } from 'vue'

import persist from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'

const pinia = createPinia();
pinia.use(persist);

const app = createApp(App)


app.use(router).use(pinia)

router.afterEach((to) =>{
  document.title = to.meta.title
})

app.mount('#app')
