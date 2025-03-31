import { createRouter, createWebHistory } from 'vue-router'

const baseRouer = {
  path: '/',
  component: () => import('../views/store/base.vue'),
  children: [],
}

const routes = [baseRouer]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
