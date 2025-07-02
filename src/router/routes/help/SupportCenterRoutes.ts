import { type RouteRecordRaw } from 'vue-router'

export const supportCenterRoutes: RouteRecordRaw[] = [
  {
    path: '/support/center',
    name: 'SupportCenter',
    component: () => import('@/layouts/help/SupportCenterLayout.vue'),
    redirect: { name: 'SupportCenterHome' },
    children: [
      {
        path: 'home',
        name: 'SupportCenterHome',
        component: () => import('@/views/help/SupportCenterPage.vue'),
        meta: {
          baseName: 'Home',
        },
      },
      {
        path: 'tickets',
        name: 'TicketsRequest',
        component: () => import('@/views/help/TicketsRequestManagementPage.vue'),
      },
    ],
  },
]

export default supportCenterRoutes
