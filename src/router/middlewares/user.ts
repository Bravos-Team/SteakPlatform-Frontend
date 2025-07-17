import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { MiddlewareContext } from '@/types/router/middleware'

const user = ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.user) {
    toastErrorNotificationPopup('You need to be logged in to access this page.', 'Access Denied')
    return next({
      name: 'Login',
    })
  }
  return next()
}

export default user
