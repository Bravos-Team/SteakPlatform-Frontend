import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/layouts/auth/AuthLayout.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import BaseLayout from '@/views/store/base.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'Đăng Nhập' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
