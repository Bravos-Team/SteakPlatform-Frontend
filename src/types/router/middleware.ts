import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export type MiddlewareContext = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
  checkAccess: {
    user: string | null
    publisher: string | null
  }
}
