import { type RouteLocationNormalizedTypedList, type RouteRecordRaw } from 'vue-router'

import publisher from '@/router/middlewares/publisher'

const publisherRoutes: RouteRecordRaw[] = [
  {
    path: '/publisher',
    name: 'PublisherHome',
    component: () => import('@/layouts/publisher/main/PublisherLayout.vue'),
    redirect: { name: 'PublisherDashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'PublisherDashboard',
        component: () => import('@/views/publisher/home/dashboard/PublisherDashboard.vue'),
      },
      {
        path: '/game-management',
        name: 'PublisherGameManagement',
        component: () => import('@/views/publisher/home/game/PublisherGameManagement.vue'),
      },
    ],
    meta: {
      middleware: [publisher],
    },
  },
  {
    path: '/publisher/login',
    name: 'PublisherAuthLogin',
    component: () => import('@/views/publisher/auth/login/LoginPage.vue'),
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
  {
    path: '/publisher/register-success',
    name: 'PublisherAuthRegisterSuccess',
    component: () => import('@/views/publisher/auth/registry/SuccessResponsePage.vue'),
  },
  {
    path: '/publisher/register-failed',
    name: 'PublisherAuthRegisterFailed',
    component: () => import('@/views/publisher/auth/registry/ErrorResponsePage.vue'),
  },
]

export default publisherRoutes
