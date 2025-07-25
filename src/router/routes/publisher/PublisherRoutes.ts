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
          i18n: 'dashboard',
        },
      },
      {
        path: 'game-management',
        name: 'PublisherGameManagement',
        component: () => import('@/views/publisher/home/game/PublisherGameManagement.vue'),
        meta: {
          baseName: 'Game Manage',
          i18n: 'game_management',
        },
        redirect: { name: 'PublisherGameManagementOverview' },
        children: [
          {
            path: '',
            name: 'PublisherGameManagementOverview',
            component: () => import('@/views/publisher/home/game/features/GameOverviewManage.vue'),
            meta: {
              baseName: 'Game Overview',
              i18n: 'game_management_overview',
            },
          },
          {
            path: 'game-edited/:id',
            name: 'PublisherEditGame',
            component: () => import('@/views/publisher/home/game/gameDetails/EditGameDetails.vue'),
            meta: {
              baseName: 'Edit Game',
              i18n: 'game_details',
            },
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
      i18n: 'publisher',
      middleware: [publisher],
      group: 'publisher',
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
