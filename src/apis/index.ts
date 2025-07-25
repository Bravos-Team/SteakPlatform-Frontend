import axios from 'axios'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { renewPublisherRefreshToken } from '@/apis/publisher/auth/authPublisher'
import { renewUserRefreshToken } from '@/apis/user/authUser'
import router from '@/router/index'
import { removeCookie } from '@/utils/cookies/cookie-utils'

export const SteakApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL + '/api/v1',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

SteakApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const route = router.currentRoute.value
    const status = error.response?.status

    if (status === 401 && route?.meta?.middleware) {
      const messages = {
        publisher: {
          msg: 'You need login to access authenication required page!',
          title: 'Publisher Authentication',
          redirect: { name: 'PublisherAuthLogin' },
        },
        user: {
          msg: 'You need login to access authenication required page!',
          title: 'Steak Game Store Authentication',
          redirect: { name: 'Login' },
        },
        default: {
          msg: 'Something went wrong, please try again later!',
          title: 'Steak Game Store Error',
          redirect: { name: 'NotFound' },
        },
      }
      const group = (route.meta?.group ?? 'default') as keyof typeof messages

      const { msg, title, redirect } = messages[group] || messages.default

      switch (group) {
        case 'publisher':
          removeCookie('publisherAccessRights')
          break
        case 'user':
          removeCookie('userAccessRights')
          break
        default:
          removeCookie('userAccessRights')
          removeCookie('publisherAccessRights')
          break
      }

      try {
        switch (group) {
          case 'publisher':
            console.log('Renewing publisher refresh token...')
            await renewPublisherRefreshToken()
            break
          case 'user':
            console.log('Renewing user refresh token...')
            await renewUserRefreshToken()
            break
        }
        return await SteakApi.request(error.config)
      } catch (newError) {
        console.error('Error renewing token:', error)
        toastErrorNotificationPopup(msg, title)
        await router.push(redirect)
        return Promise.reject(newError)
      }
    }

    return Promise.reject(error)
  },
)

export default SteakApi
