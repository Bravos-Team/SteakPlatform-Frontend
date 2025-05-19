import { RouteLocationNormalizedTypedList, RouteRecordRaw } from 'vue-router'
import publisher from '@/router/middlewares/publisher'

const publisherRoutes: RouteRecordRaw[] = [
  {
    path: '/publisher/login',
    name: 'PublisherAuthLogin',
    component: () => import('@/views/publisher/auth/login/LoginPage.vue'),
    children: [
      {
        path: '/publisher',
        name: 'PublisherHome',
        component: () => import('@/layouts/publisher/main/PublisherLayout.vue'),
        children: [],
      },
    ],
    meta: {
      middleware: [publisher],
    },
  },
  {
    path: '/publisher/register',
    name: 'PublisherAuthRegister',
    component: () => import('@/views/publisher/auth/registry/RegistrationPage.vue'),
  },
  {
    path: '/publisher/verify-email',
    name: 'PublisherAuthVerifyEmail',
    component: () => import('@/views/publisher/auth/registry/EmailAuthenticationRequirement.vue'),
  },
]

export default publisherRoutes
