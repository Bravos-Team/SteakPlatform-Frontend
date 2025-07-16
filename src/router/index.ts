import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import authRoutes from '@/router/routes/store/AuthRoutes'
import homeRoutes from '@/router/routes/store/HomeRoutes'
import storeRoutes from '@/router/routes/store/StoreRoutes'
import publisherRoutes from '@/router/routes/publisher/PublisherRoutes'
import adminRoutes from '@/router/routes/admin/AdminRoutes'
import supportCenterRoutes from '@/router/routes/help/SupportCenterRoutes'
import testRoute from '@/router/routes/test/TestRoute'

const routes: RouteRecordRaw[] = [
  testRoute,
  homeRoutes,
  authRoutes,
  storeRoutes,
  ...adminRoutes,
  ...publisherRoutes,
  ...supportCenterRoutes,
]

routes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/NotFoundPage.vue'),
})

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { el: to.hash, behavior: 'smooth' }
    else return { top: 0 }
  },
})

router.beforeEach((to: any, from, next) => {
  console.log('Global beforeEach:', to, from)
  console.log('Global beforeEach: next', next)
  return next()
})

export default router
