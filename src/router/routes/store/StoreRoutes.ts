import user from '@/router/middlewares/user'
import { RouteRecordRaw } from 'vue-router'
const storeRoutes: RouteRecordRaw = {
  path: '/store',
  name: 'store',
  component: () => import('@/layouts/store/main/StoreLayout.vue'),
  redirect: { name: 'store-home' },
  meta: {
    title: 'Store',
  },
  children: [
    {
      path: 'home',
      name: 'store-home',
      component: () => import('@/views/store/game-store/StoreHomePage.vue'),
      meta: {
        title: 'Trang chủ',
      },
    },
    {
      path: 'game/details/:id',
      name: 'game-details',
      component: () => import('@/views/store/game-store/game/GameDetailsPage.vue'),
    },

    {
      path: '/cart',
      name: 'CartManagementPage',
      component: () => import('@/views/cart/CartManagementPage.vue'),
    },
    {
      path: '/wishlist',
      name: 'WishlistManagementPage',
      component: () => import('@/views/cart/WishlistManagementPage.vue'),
      meta: {
        middleware: [user],
        group: 'user',
      },
    },
  ],
}
export default storeRoutes
