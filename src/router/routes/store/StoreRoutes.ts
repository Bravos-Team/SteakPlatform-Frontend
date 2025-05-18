import { RouteRecordRaw } from 'vue-router'
const storeRoutes: RouteRecordRaw = {
  path: '/store',
  name: 'store',
  component: () => import('@/layouts/store/main/StoreLayout.vue'),
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
      path: '/payment',
      name: 'GameStorePayment',
      component: () => import('@/views/store/payment/TempPayment.vue'),
      meta: {
        middleware: ['example'],
      },
    },
  ],
}
export default storeRoutes
