import { type RouteRecordRaw } from "vue-router";


const homeRoutes: RouteRecordRaw = {
  path: "/",
  name: "Home",
  component: () => import("@/layouts/home/HomeLayout.vue"),
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

export default homeRoutes
