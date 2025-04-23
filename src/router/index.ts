import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import authRoutes from "@/router/routes/AuthRoutes";
import homeRoutes from "@/router/routes/HomeRoutes";
import storeRoutes from "@/router/routes/StoreRoutes";




const routes: RouteRecordRaw[] = [homeRoutes,authRoutes, storeRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
