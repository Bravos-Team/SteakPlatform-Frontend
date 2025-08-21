import { MiddlewareContext } from '@/types/router/middleware'

const guest = async ({ to, from, next, checkAccess }: MiddlewareContext) => {
  if (to.meta?.group === 'user' || (checkAccess.user && to.name === 'Login')) {
    if (checkAccess.user) {
      return next({
        name: 'store-home',
      })
    }
  } else if (
    to.meta.group === 'publisher' ||
    (checkAccess.publisher && to.name === 'PublisherAuthLogin')
  ) {
    if (checkAccess.publisher) {
      return next({
        name: 'PublisherDashboard',
      })
    }
  }
  console.log('not user or publisher group!')
  return next()
}

export default guest
