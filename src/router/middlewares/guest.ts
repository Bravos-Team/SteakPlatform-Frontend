import { MiddlewareContext } from '@/types/router/middleware'

const guest = async ({ from, next, checkAccess }: MiddlewareContext) => {
  if (from.meta?.group === 'user') {
    if (checkAccess.user) {
      return next({
        name: 'store-home',
      })
    }
  } else if (from.meta.group === 'publisher') {
    if (checkAccess.publisher) {
      return next({
        name: 'PublisherDashboard',
      })
    }
  }
  return next()
}

export default guest
