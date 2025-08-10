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
        path: 'draft',
        name: 'PublisherGameManagementDraft',
        component: () => import('@/views/publisher/home/game/features/GameDraftManagement.vue'),
        meta: {
          baseName: 'Game Draft',
          i18n: 'game_management_draft',
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
        path: 'accepted',
        name: 'PublisherGameAcceptedManagement',
        component: () => import('@/views/publisher/home/game/features/GameAcceptedManage.vue'),
        meta: {
          baseName: 'Game Published',
          i18n: 'game_management_accepted',
        },
      },
      {
        path: 'accepted/details/:id',
        name: 'PublisherGameAcceptedDetails',
        component: () => import('@/views/publisher/home/game/gameDetails/GameAcceptedDetails.vue'),
        meta: {
          baseName: 'Game Accepted Details',
          i18n: 'game_accepted_details',
        },
      },
      {
        path: 'accounts',
        name: 'PublisherAccountManagement',
        component: () => import('@/views/publisher/accounts/AccountManagementPage.vue'),
        meta: {
          baseName: 'Account Management',
          i18n: 'account_management',
        },
      },
      {
        path: 'permissions',
        name: 'PublisherPermissionsManagement',
        component: () => import('@/views/publisher/accounts/PermissionManagementPage.vue'),
        meta: {
          baseName: 'Permissions Management',
          i18n: 'permissions_management',
        },
      },
      {
        path: 'custom-roles',
        name: 'PublisherCustomRolesManagement',
        component: () => import('@/views/publisher/accounts/CustomRolesManagement.vue'),
        meta: {
          baseName: 'Custom Roles Management',
          i18n: 'custom_roles_management',
        },
      },
      {
        path: 'custom-roles/:id',
        name: 'PublisherCustomRolesDetails',
        component: () => import('@/views/publisher/accounts/CustomRolesDetailsPage.vue'),
        meta: {
          baseName: 'Custom Roles Details',
          i18n: 'custom_roles_details',
        },
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
    meta: {
      group: 'publisher',
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
