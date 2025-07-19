import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import middlewarePipeLine from '@/router/middlewares/middlewarePipeLine'
import authRoutes from '@/router/routes/store/AuthRoutes'
import homeRoutes from '@/router/routes/store/HomeRoutes'
import storeRoutes from '@/router/routes/store/StoreRoutes'
import publisherRoutes from '@/router/routes/publisher/PublisherRoutes'
import supportCenterRoutes from '@/router/routes/help/SupportCenterRoutes'
import testRoute from '@/router/routes/test/TestRoute'
import { getCookie } from '@/utils/cookies/cookie-utils'
import { MiddlewareContext } from '@/types/router/middleware'

const routes: RouteRecordRaw[] = [
  testRoute,
  homeRoutes,
  authRoutes,
  storeRoutes,
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

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (!to.meta?.middleware) {
      return next()
    }

    const checkAccess = {
      publisher: getCookie('publisherAccessRights') ?? null,
      user: getCookie('userAccessRights') ?? null,
    }

    const middleware: any[] = to.meta.middleware
    const context: MiddlewareContext = { to, from, next, checkAccess }
    return middleware[0]({
      ...context,
      next: middlewarePipeLine(context, middleware, 1),
    })
  },
)

export default router
