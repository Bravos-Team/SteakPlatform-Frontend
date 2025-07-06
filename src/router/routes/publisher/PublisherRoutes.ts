import { type RouteRecordRaw } from 'vue-router'

import publisher from '@/router/middlewares/publisher'

export const publisherRoutes: RouteRecordRaw[] = [
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
        meta: {
          baseName: 'Dashboard',
        },
      },
      {
        path: 'game-management',
        name: 'PublisherGameManagement',
        component: () => import('@/views/publisher/home/game/PublisherGameManagement.vue'),
        meta: {
          baseName: 'Game Manage',
        },
        redirect: { name: 'PublisherGameManagementOverview' },
        children: [
          {
            path: '',
            name: 'PublisherGameManagementOverview',
            component: () => import('@/views/publisher/home/game/features/GameOverviewManage.vue'),
            meta: {
              baseName: 'Game Overview',
            },
          },
          {
            path: 'game-edited/:id',
            name: 'PublisherEditGame',
            component: () => import('@/views/publisher/home/game/gameDetails/EditGameDetails.vue'),
          },
          {
            path: 'pending',
            name: 'PublisherGameManagementPending',
            component: () => import('@/views/publisher/home/game/features/GamePendingManage.vue'),
            meta: {
              baseName: 'Game Pending',
            },
          },
        ],
      },
    ],
    meta: {
      baseName: 'Publisher',
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
