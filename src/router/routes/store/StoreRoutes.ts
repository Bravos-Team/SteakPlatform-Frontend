import user from '@/router/middlewares/user'
import { RouteRecordRaw } from 'vue-router'
const storeRoutes: RouteRecordRaw = {
  path: '/store',
  name: 'store',
  component: () => import('@/layouts/store/main/StoreLayout.vue'),
  redirect: { name: 'store-home' },
  meta: {
    title: 'Store',
    group: 'user',
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
      path: 'discover',
      name: 'DiscoverGamesStore',
      component: () => import('@/views/store/game-store/DiscoverPage.vue'),
      meta: {},
    },
    {
      path: 'leaderboard',
      name: 'LeaderboardGamesStore',
      component: () => import('@/views/store/game-store/LeaderboardPage.vue'),
    },
    {
      path: 'game/details/:id',
      name: 'game-details',
      component: () => import('@/views/store/game-store/game/GameDetailsPage.vue'),
      meta: {
        hideSearchBar: 'true',
      },
    },

    {
      path: '/cart',
      name: 'CartManagementPage',
      component: () => import('@/views/cart/CartManagementPage.vue'),
      meta: {
        hideSearchBar: 'true',
      },
    },
    {
      path: '/wishlist',
      name: 'WishlistManagementPage',
      component: () => import('@/views/cart/WishlistManagementPage.vue'),
      meta: {
        middleware: [user],
        group: 'user',
        hideSearchBar: 'true',
      },
    },
    {
      path: '/me/profiles',
      name: 'UserProfiles',
      component: () => import('@/layouts/user/ProfileManageLayout.vue'),
      redirect: { name: 'UserProfileSettings' },
      children: [
        {
          path: 'settings',
          name: 'UserProfileSettings',
          component: () => import('@/views/store/auth/profile/UserProfileDetails.vue'),
        },
      ],
      meta: {
        middleware: [user],
        group: 'user',
        hideSearchBar: 'true',
      },
    },
    {
      path: '/download',
      name: 'DownloadApplicationPage',
      component: () => import('@/views/download/DownloadRedirectPage.vue'),
      meta: {
        hideSearchBar: 'true',
      },
    },
  ],
}
export default storeRoutes
