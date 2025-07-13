import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import authRoutes from '@/router/routes/store/AuthRoutes'
import homeRoutes from '@/router/routes/store/HomeRoutes'
import storeRoutes from '@/router/routes/store/StoreRoutes'
import publisherRoutes from '@/router/routes/publisher/PublisherRoutes'
import supportCenterRoutes from '@/router/routes/help/SupportCenterRoutes'

const routes: RouteRecordRaw[] = [
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

// const resolveMiddleware = (to: any) => {
//   const matched = to.matched.slice().reverse()
//   for (const record of matched) {
//     if (record.meta && record.meta.middleware) {
//       return record.meta.middleware
//     }
//   }
//   return null
// }

router.beforeEach((to: any, from, next) => {
  // if (!to.meta.middleware) {
  //   return next()
  // }

  // if (to.name === 'PublisherHome' && to.meta.middleware) {
  //   return next({
  //     name: 'PublisherAuthLogin',
  //   })
  // }

  return next()
  // const middleware: any[] = to.meta.middleware

  // const context = {
  //   to,
  //   from,
  //   next,
  // }

  // return middleware[0]({
  //   ...context,
  //   next: middlewarePipeline(context, middleware, 1),
  // })
})

export default router
