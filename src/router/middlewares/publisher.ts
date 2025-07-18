import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { MiddlewareContext } from '@/types/router/middleware'

const publisher = ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.publisher) {
    toastErrorNotificationPopup(
      'You need to be a publisher to access this page.',
      'Publisher Access Required',
    )
    return next({
      name: 'PublisherAuthLogin',
    })
  }

  return next()
}

export default publisher
