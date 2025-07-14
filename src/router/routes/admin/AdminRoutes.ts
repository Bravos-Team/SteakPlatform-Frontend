import { type RouteRecordRaw } from 'vue-router'
// import { admin } from '@/middleware/admin'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/main/AdminLayout.vue'),
    redirect: { name: 'AdminHome' },
    children: [
      // Dashboard
      {
        path: '',
        name: 'AdminHome',
        redirect: { name: 'AdminDashboard' },
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/home/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'LayoutDashboard',
        },
      },

      // User Management
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/home/user/UserList.vue'),
        meta: {
          title: 'Users Management',
          icon: 'Users',
        },
      },

      // Game Management
      {
        path: 'games',
        name: 'AdminGames',
        component: () => import('@/views/admin/home/game/GameList.vue'),
        meta: {
          title: 'Games Management',
          icon: 'Gamepad2',
        },
      },

      // {
      //   path: 'users/:id',
      //   name: 'AdminUserDetail',
      //   component: () => import('@/views/admin/users/UserDetail.vue'),
      //   meta: {
      //     title: 'User Detail',
      //     parent: 'AdminUsers',
      //   },
      // },
      // {
      //   path: 'users/create',
      //   name: 'AdminUserCreate',
      //   component: () => import('@/views/admin/users/UserForm.vue'),
      //   meta: {
      //     title: 'Create User',
      //     parent: 'AdminUsers',
      //   },
      // },
      // {
      //   path: 'users/:id/edit',
      //   name: 'AdminUserEdit',
      //   component: () => import('@/views/admin/users/UserForm.vue'),
      //   meta: {
      //     title: 'Edit User',
      //     parent: 'AdminUsers',
      //   },
      // },

      // // Publishers Management
      // {
      //   path: 'publishers',
      //   name: 'AdminPublishers',
      //   component: () => import('@/views/admin/publishers/PublishersList.vue'),
      //   meta: {
      //     title: 'Publishers Management',
      //     icon: 'BookOpen',
      //   },
      // },
      // {
      //   path: 'publishers/:id',
      //   name: 'AdminPublisherDetail',
      //   component: () => import('@/views/admin/publishers/PublisherDetail.vue'),
      //   meta: {
      //     title: 'Publisher Detail',
      //     parent: 'AdminPublishers',
      //   },
      // },
      // {
      //   path: 'publishers/create',
      //   name: 'AdminPublisherCreate',
      //   component: () => import('@/views/admin/publishers/PublisherForm.vue'),
      //   meta: {
      //     title: 'Create Publisher',
      //     parent: 'AdminPublishers',
      //   },
      // },
      // {
      //   path: 'publishers/:id/edit',
      //   name: 'AdminPublisherEdit',
      //   component: () => import('@/views/admin/publishers/PublisherForm.vue'),
      //   meta: {
      //     title: 'Edit Publisher',
      //     parent: 'AdminPublishers',
      //   },
      // },

      // // Products Management
      // {
      //   path: 'products',
      //   name: 'AdminProducts',
      //   component: () => import('@/views/admin/products/ProductsList.vue'),
      //   meta: {
      //     title: 'Products',
      //     icon: 'ShoppingCart',
      //   },
      // },
      // {
      //   path: 'products/:id',
      //   name: 'AdminProductDetail',
      //   component: () => import('@/views/admin/products/ProductDetail.vue'),
      //   meta: {
      //     title: 'Product Detail',
      //     parent: 'AdminProducts',
      //   },
      // },
      // {
      //   path: 'products/create',
      //   name: 'AdminProductCreate',
      //   component: () => import('@/views/admin/products/ProductForm.vue'),
      //   meta: {
      //     title: 'Create Product',
      //     parent: 'AdminProducts',
      //   },
      // },
      // {
      //   path: 'products/:id/edit',
      //   name: 'AdminProductEdit',
      //   component: () => import('@/views/admin/products/ProductForm.vue'),
      //   meta: {
      //     title: 'Edit Product',
      //     parent: 'AdminProducts',
      //   },
      // },

      // // Reports & Analytics
      // {
      //   path: 'reports',
      //   name: 'AdminReports',
      //   component: () => import('@/views/admin/reports/ReportsDashboard.vue'),
      //   meta: {
      //     title: 'Reports & Analytics',
      //     icon: 'BarChart3',
      //   },
      // },
      // {
      //   path: 'reports/sales',
      //   name: 'AdminSalesReports',
      //   component: () => import('@/views/admin/reports/SalesReports.vue'),
      //   meta: {
      //     title: 'Sales Reports',
      //     parent: 'AdminReports',
      //   },
      // },
      // {
      //   path: 'reports/users',
      //   name: 'AdminUserReports',
      //   component: () => import('@/views/admin/reports/UserReports.vue'),
      //   meta: {
      //     title: 'User Reports',
      //     parent: 'AdminReports',
      //   },
      // },

      // // Notifications
      // {
      //   path: 'notifications',
      //   name: 'AdminNotifications',
      //   component: () => import('@/views/admin/notifications/NotificationsList.vue'),
      //   meta: {
      //     title: 'Notifications',
      //     icon: 'Bell',
      //   },
      // },

      // // Settings
      // {
      //   path: 'settings',
      //   name: 'AdminSettings',
      //   component: () => import('@/views/admin/settings/SettingsGeneral.vue'),
      //   meta: {
      //     title: 'Settings',
      //     icon: 'Settings',
      //   },
      // },
      // {
      //   path: 'settings/profile',
      //   name: 'AdminProfile',
      //   component: () => import('@/views/admin/settings/Profile.vue'),
      //   meta: {
      //     title: 'Your Profile',
      //     parent: 'AdminSettings',
      //   },
      // },
      // {
      //   path: 'settings/security',
      //   name: 'AdminSecurity',
      //   component: () => import('@/views/admin/settings/Security.vue'),
      //   meta: {
      //     title: 'Security Settings',
      //     parent: 'AdminSettings',
      //   },
      // },
      // {
      //   path: 'settings/appearance',
      //   name: 'AdminAppearance',
      //   component: () => import('@/views/admin/settings/Appearance.vue'),
      //   meta: {
      //     title: 'Appearance',
      //     parent: 'AdminSettings',
      //   },
      // },

      // // Error pages
      // {
      //   path: 'error/403',
      //   name: 'AdminForbidden',
      //   component: () => import('@/views/admin/errors/Forbidden.vue'),
      //   meta: {
      //     title: 'Forbidden',
      //   },
      // },
      // {
      //   path: 'error/404',
      //   name: 'AdminNotFound',
      //   component: () => import('@/views/admin/errors/NotFound.vue'),
      //   meta: {
      //     title: 'Not Found',
      //   },
      // },
      // {
      //   path: 'error/500',
      //   name: 'AdminServerError',
      //   component: () => import('@/views/admin/errors/ServerError.vue'),
      //   meta: {
      //     title: 'Server Error',
      //   },
      // },
    ],
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/login/Login.vue'),
  },
]

export default adminRoutes
