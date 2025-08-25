import { MiddlewareContext } from '@/types/router/middleware'

const guest = async ({ to, from, next, checkAccess }: MiddlewareContext) => {
  console.log('FROM: ', from)
  if (to.meta.deniedAccessExceptGoogle) {
    console.log('CHECK DENIED')
    if (checkAccess.user) {
    }
  }
  if (to.meta?.group === 'user' && checkAccess.user) {
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
