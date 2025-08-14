// router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const PrivacyPolicyRoute: RouteRecordRaw = {
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  beforeEnter() {
    window.location.href = '/privacy-policy.html'
  },
  meta: {
    title: 'Privacy Policy',
    description: 'Privacy Policy for our application',
    requiresAuth: false
  },
}
