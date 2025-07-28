import axios from 'axios'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { renewPublisherRefreshToken } from '@/apis/publisher/auth/authPublisher'
import { renewUserRefreshToken } from '@/apis/user/authUser'
import router from '@/router/index'
import { removeCookie, removeCookies } from '@/utils/cookies/cookie-utils'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: any) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
}

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

const removeCookiesQueue = (group: string) => {
  switch (group) {
    case 'publisher':
      removeCookie('publisherAccessRights')
      break
    case 'user':
      removeCookie('userAccessRights')
      break
    default:
      removeCookies(['userAccessRights', 'publisherAccessRights'])
  }
}

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
    const originalRequest = error.config
    const group = (route.meta?.group ?? 'default') as keyof typeof messages
    const { msg, title, redirect } = messages[group] || messages.default
    console.log('API Error:', error)
    if (
      status === 401 &&
      route?.meta?.middleware &&
      !originalRequest._retry &&
      !error.response.config.url.includes('/refresh')
    ) {
      originalRequest._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return SteakApi.request(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        switch (group) {
          case 'publisher':
            const response = await renewPublisherRefreshToken()
            break
          case 'user':
            await renewUserRefreshToken()
            break
        }

        processQueue(null, 'success')
        isRefreshing = false
        return await SteakApi.request(originalRequest)
      } catch (refreshError) {
        console.log('Refresh token error:', refreshError)
        processQueue(refreshError, null)
        isRefreshing = false
        removeCookiesQueue(group)
        toastErrorNotificationPopup(msg, title)
        await router.push(redirect)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default SteakApi
