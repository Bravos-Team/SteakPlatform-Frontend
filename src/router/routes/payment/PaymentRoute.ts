import user from '@/router/middlewares/user'
import { type RouteRecordRaw } from 'vue-router'

export const paymentRoute: RouteRecordRaw[] = [
  {
    path: '/payment',
    name: 'GameStorePayment',
    component: () => import('@/views/payment/CheckoutPage.vue'),
    meta: {
      middleware: [user],
      group: 'user',
      back: false,
    },
  },
  {
    path: '/payment/success',
    name: 'GameStorePaymentSuccess',
    component: () => import('@/views/payment/PaymentSuccess.vue'),
    meta: {
      middleware: [user],
      group: 'user',
    },
  },
  {
    path: '/payment/error',
    name: 'GameStorePaymentError',
    component: () => import('@/views/payment/PaymentFailed.vue'),
    meta: {
      middleware: [user],
      group: 'user',
    },
  },
]

export default paymentRoute
