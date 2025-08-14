import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import middlewarePipeLine from '@/router/middlewares/middlewarePipeLine'
import authRoutes from '@/router/routes/store/AuthRoutes'
// import userRoutes from '@/router/routes/user/UserRoute'
import supportCenterRoutes from '@/router/routes/help/SupportCenterRoutes'
import paymentRoute from '@/router/routes/payment/PaymentRoute'
import publisherRoutes from '@/router/routes/publisher/PublisherRoutes'
import homeRoutes from '@/router/routes/store/HomeRoutes'
import storeRoutes from '@/router/routes/store/StoreRoutes'
import testRoute from '@/router/routes/test/TestRoute'
import { MiddlewareContext } from '@/types/router/middleware'
import { getCookie } from '@/utils/cookies/cookie-utils'
import { TermsOfServiceRoute } from '@/router/routes/policy/termsOfService'
import { PrivacyPolicyRoute } from '@/router/routes/policy/privacyPolicy'

const routes: RouteRecordRaw[] = [
  testRoute,
  homeRoutes,
  authRoutes,
  storeRoutes,
  TermsOfServiceRoute,
  PrivacyPolicyRoute,
  // userRoutes,
  ...paymentRoute,
  ...publisherRoutes,
  ...supportCenterRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (from.meta?.back === false) return next(false)

    if (!to.meta?.middleware || from.meta.back) {
      return next()
    }

    const checkAccess = {
      publisher: getCookie('publisherAccessRights') ?? null,
      user: getCookie('userAccessRights') ?? null,
    }

    const middleware: any[] = to.meta.middleware as any[]
    const context: MiddlewareContext = { to, from, next, checkAccess }
    return middleware[0]({
      ...context,
      next: middlewarePipeLine(context, middleware, 1),
    })
  },
)

export default router
