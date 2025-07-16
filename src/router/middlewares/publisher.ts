import { MiddlewareContext } from '@/types/router/middleware'

const publisher = ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.publisher) {
    return next({
      name: 'PublisherAuthLogin',
    })
  }

  return next()
}

export default publisher
