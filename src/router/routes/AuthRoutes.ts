import { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/layouts/auth/AuthLayout.vue'),
  children: [
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/views/auth/registration/RegistrationPage.vue'),
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
      name: 'VerifyEmail',
      component: () => import('@/views/auth/registration/EmailAuthenticationRequirement.vue'),
      meta: {
        title: 'Xác thực email',
      },
    },
    {
      path: '/register-success',
      name: 'RegisterSuccess',
      component: () => import('@/views/auth/registration/SuccessResponsePage.vue'),
    },
    {
      path: '/register-failed',
      name: 'RegisterError',
      component: () => import('@/views/auth/registration/ErrorResponsePage.vue'),
    },
  ],
}

export default authRoutes
