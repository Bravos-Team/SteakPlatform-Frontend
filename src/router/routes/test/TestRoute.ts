import { RouteRecordRaw } from 'vue-router'

const testRoute: RouteRecordRaw = {
  path: '/test',
  name: 'Test',
  component: () => import('@/test/test.vue'),
}

export default testRoute
