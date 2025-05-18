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
  ],
}

export default publisherRoutes
