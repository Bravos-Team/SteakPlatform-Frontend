import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';


const homeRoutes = {
  path: "/",
  name: "Home",
  component: () => import("@/views/home/HomePage.vue"),
  meta: {
    title: "Home",
  },
  children: [
    {
      path: ""
      ,name: "HomePage",
      component: () => import ("@/views/home/HomePage.vue")
      ,meta: {
        title: 'HomePage',
      }
    }
  ]
}





const routes: RouteRecordRaw[] = [homeRoutes,authRoutes, storeRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
