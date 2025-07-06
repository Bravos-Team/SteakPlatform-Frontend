import { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/layouts/store/auth/AuthLayout.vue'),
  children: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/store/auth/registration/RegistrationPage.vue'),
      meta: {
        title: 'Đăng ký tài khoản',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/store/auth/login/LoginPage.vue'),
      meta: {
        title: 'Đăng nhập',
      },
    },
    {
      path: '/verify-email',
      name: 'VerifyEmail',
      component: () => import('@/views/store/auth/registration/EmailAuthenticationRequirement.vue'),
      meta: {
        title: 'Xác thực email',
      },
    },
    {
      path: '/register-success',
      name: 'RegisterSuccess',
      component: () => import('@/views/store/auth/registration/SuccessResponsePage.vue'),
    },
    {
      path: '/register-failed',
      name: 'RegisterError',
      component: () => import('@/views/store/auth/registration/ErrorResponsePage.vue'),
    },
  ],
}

export default authRoutes
