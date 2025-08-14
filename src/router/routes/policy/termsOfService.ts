// router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const TermsOfServiceRoute: RouteRecordRaw = {
  path: '/terms-of-service',
  name: 'TermsOfService',
  beforeEnter() {
    window.location.href = '/terms-of-service.html'
  },
  meta: {
    title: 'Terms of Service',
    description: 'Terms of Service for our application',
    requiresAuth: false
  },
}
