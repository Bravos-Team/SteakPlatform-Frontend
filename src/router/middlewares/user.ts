import { MiddlewareContext } from '@/types/router/middleware'

const user = ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.user) {
    return next({
      name: 'Login',
    })
  }
  return next()
}

export default user
