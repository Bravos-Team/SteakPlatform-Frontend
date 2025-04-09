import { createRouter, createWebHistory } from 'vue-router'

const storeRoutes = {
  path: '',
  name: 'Home',
  component: () => import('@/layouts/store/StoreLayout.vue'),
  meta: {
    title: 'Trang chủ',
  },
  children: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegistrationPage.vue'),
      meta: {
        title: 'Đăng ký tài khoản',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginPage.vue'),
      meta: {
        title: 'Đăng nhập',
      },
    },
  ],
}

const routes = [storeRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
