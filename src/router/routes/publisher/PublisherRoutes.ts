import { RouteRecordRaw } from 'vue-router'
import publisher from '@/router/middlewares/publisher'

const publisherRoutes: RouteRecordRaw = {
  path: '/publisher',
  name: 'Publisher',
  component: () => import('@/layouts/publisher/main/PublisherLayout.vue'),
  meta: {
    middleware: [publisher],
  },
  children: [
    {
      path: 'register',
      name: 'PublisherAuthRegister',
      component: () => import('@/views/publisher/auth/registry/RegistrationPage.vue'),
    },
    {
      path: 'login',
      name: 'PublisherAuthLogin',
      component: () => import('@/views/publisher/auth/login/LoginPage.vue'),
    },
  ],
}

export default publisherRoutes
