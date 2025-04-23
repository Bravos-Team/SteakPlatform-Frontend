import { RouteRecordRaw } from "vue-router";
const storeRoutes: RouteRecordRaw = {
  path: '/store',
  name: 'store',
  component: () => import('@/layouts/store/StoreLayout.vue'),
  meta: {
    title: 'Store',
  },
  children: [
    {
      path: "home",
      name: "store-home",
      component: () => import('@/views/store/StoreHomePage.vue'),
      meta: {
        title: 'Trang chủ',
      },
    },
    {
      path: "game/details/:id",
      name: "game-details",
      component: () => import("@/views/store/GameDetailsPage.vue"),
    }
  ]
}
export default storeRoutes;
