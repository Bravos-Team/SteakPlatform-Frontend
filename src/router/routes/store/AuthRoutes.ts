import guest from '@/router/middlewares/guest'
import { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/layouts/store/auth/AuthLayout.vue'),
  meta: {
    middleware: [guest],
    group: 'user',
    deniedAccessExceptOauth: true,
  },
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
      meta: {
        title: 'Đăng nhập thành công',
      },
    },
    {
      path: '/register-failed',
      name: 'RegisterError',
      component: () => import('@/views/store/auth/registration/ErrorResponsePage.vue'),
      meta: {
        title: 'Đăng nhập thất bại',
      },
    },
    {
      path: '/oauth2/google',
      name: 'GoogleOauth',
      meta: {
        title: 'Đăng nhập Google',
      },
      component: () => import('@/views/store/auth/login/GoogleOauthPage.vue'),
    },
    {
      path: '/oauth2/github',
      name: 'GithubOauth',
      meta: {
        title: 'Đăng nhập Github',
      },
      component: () => import('@/views/store/auth/login/GithubOauthPage.vue'),
    },
  ],
}

export default authRoutes
