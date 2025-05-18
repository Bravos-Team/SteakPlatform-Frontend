import { RouteRecordRaw } from 'vue-router'
import publisher from '@/router/middlewares/publisher'
const publisherRoutes: RouteRecordRaw = {
  path: '/publisher',
  name: 'Publisher',
  component: () => import('@/layouts/publisher/main/PublisherLayout.vue'),
  meta: {
    middleware: [publisher],
  },
  children: [],
}

export default publisherRoutes
