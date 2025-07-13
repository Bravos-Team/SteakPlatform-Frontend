import axios from 'axios'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import router from '@/router/index'
export const SteakApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
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
    if (error.response?.status === 401 && path != '/login' && path != '/publisher/login') {
      // console.log('path: ', path)
      if (path.startsWith('/publisher') || path.startsWith('/game')) {
        if (router.currentRoute.value.name === 'PublisherAuthLogin') {
          return
        } else {
          await router.push({ name: 'PublisherAuthLogin' })
          return toastErrorNotificationPopup(
            'You need login to access authenication required page!',
            'Publisher Authentication',
          )
        }
      } else if (path.startsWith('/admin')) {
        if (router.currentRoute.value.name === 'AdminLogin') {
          return
        } else {
          await router.push({ name: 'AdminLogin' })
          return toastErrorNotificationPopup(
            'Need admin account to login!',
            'Steak Admin Authentication',
          )
        }
      } else {
        await router.push({ name: 'Login' })
        return toastErrorNotificationPopup(
          'You need login to access authenication required page!',
          'Steak Game Store Authentication',
        )
      }
    }
    return Promise.reject(error)
  },
)

export default SteakApi
