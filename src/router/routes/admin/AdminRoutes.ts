import { type RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('@/layouts/admin/main/AdminLayout.vue'),
    redirect: { name: 'AdminDashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/home/Dashboard.vue'),
        meta: {
          baseName: 'Dashboard',
        },
      },
    ],
    meta: {
      baseName: 'Admin',
      // middleware: [admin],
    },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/login/Login.vue'),
  },
]

export default adminRoutes
