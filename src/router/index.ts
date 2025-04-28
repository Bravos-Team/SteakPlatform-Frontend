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

const storeRoutes = {
  path: '/store',
  name: 'store',
  component: () => import('@/layouts/store/StoreLayout.vue'),
  meta: {
    title: 'Store',
  },
  children: [
    {
      path: "home",
      component: () => import('@/views/store/StoreHomePage.vue'),
      meta: {
        title: 'Trang chủ',
      },
    }
  ]
}
const authRoutes = {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/layouts/auth/AuthLayout.vue'),
  children: [
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/views/auth/RegistrationPage.vue'),
      meta: {
        title: 'Đăng ký tài khoản',
      },
    },
    {
      path: 'login',
      name: 'Login',
      component: () => import('@/views/auth/LoginPage.vue'),
      meta: {
        title: 'Đăng nhập',
      },
    },
    {
      path: 'verify-email',
      name: 'VeridyEmail',
      component: () => import('@/views/auth/EmailAuthenticationRequirement.vue'),
      meta: {
        title: 'Xác thực email',
      },
    },
  ],
}

const routes: RouteRecordRaw[] = [homeRoutes,authRoutes, storeRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
