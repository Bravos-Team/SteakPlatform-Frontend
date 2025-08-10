import { MiddlewareContext } from '@/types/router/middleware'
import { renewPublisherRefreshToken } from '@/apis/publisher/auth/authPublisher'

const publisher = async ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.publisher) {
    try {
      const response = await renewPublisherRefreshToken()
      if (response.status === 200) {
        // return next({
        //   name: 'PublisherAuthLogin',
        // })
        next()
      }
    } catch (err: any) {
      return next({
        name: 'PublisherAuthLogin',
      })
    }
  }
  return next()
}

export default publisher
