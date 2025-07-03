import { type RouteRecordRaw } from 'vue-router'

const homeRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: () => import('@/layouts/store/home/HomeLayout.vue'),
  redirect: { name: 'HomePage' },
  meta: {
    title: 'Home',
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/views/store/home/HomePage.vue'),
      meta: {
        title: 'HomePage',
      },
    },
  ],
}

export default homeRoutes
