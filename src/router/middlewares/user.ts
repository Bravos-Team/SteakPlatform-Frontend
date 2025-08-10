import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { MiddlewareContext } from '@/types/router/middleware'
import { renewUserRefreshToken } from '@/apis/user/authUser'

const user = async ({ next, checkAccess }: MiddlewareContext) => {
  if (!checkAccess.user) {
    try {
      const response = await renewUserRefreshToken()
      console.log('User refresh token response:', response)
      if (response.status === 200) {
        return next()
      }
    } catch (err: any) {
      return next({
        name: 'Login',
      })
    }
  }
  return next()
}

export default user
