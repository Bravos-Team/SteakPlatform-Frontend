import axios from 'axios'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import router from '@/router/index'
import { removeCookie, removeCookies } from '@/utils/cookies/cookie-utils'
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
    const path = router.currentRoute.value.fullPath
    if (error.response?.status === 401) {
      if (path != '/login' && path != '/publisher/login' && path !== '/store/home') {
        if (path.startsWith('/publisher') || path.startsWith('/game')) {
          if (router.currentRoute.value.name === 'PublisherAuthLogin') {
            return
          } else {
            removeCookies(['userAccessRights', 'publisherAccessRights'])
            toastErrorNotificationPopup(
              'You need login to access authenication required page!',
              'Publisher Authentication',
            )
            await router.push({ name: 'PublisherAuthLogin' })
          }
        } else {
          toastErrorNotificationPopup(
            'You need login to access authenication required page!',
            'Steak Game Store Authentication',
          )
          await router.push({ name: 'Login' })
        }
      }
    }
    return Promise.reject(error)
  },
)

export default SteakApi
