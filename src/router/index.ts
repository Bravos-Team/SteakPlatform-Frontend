import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import authRoutes from '@/router/routes/store/AuthRoutes'
import homeRoutes from '@/router/routes/store/HomeRoutes'
import storeRoutes from '@/router/routes/store/StoreRoutes'
import publisherRoutes from '@/router/routes/publisher/PublisherRoutes'

const routes: RouteRecordRaw[] = [homeRoutes, authRoutes, storeRoutes, publisherRoutes]

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

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    console.log('this page is not requires authentication')
    return next()
  }

  console.log('start authentication...')
  console.log('middleware type: ' + to.meta.middleware)
  // const middleware: any[] = to.meta.middleware
  // const context = {
  //   to, from, next,
  // }
})

export default router
