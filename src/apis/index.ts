import axios from 'axios'
import { onMounted } from 'vue'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import router from '@/router/index'
import { data } from '../components/publisher/common/sidebar/SidebarItems'

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
  (error) => {
    console.log('ERROR: ', error.response)
    const path = router.currentRoute.value.fullPath
    console.log('PATH:', path)
    if (error.response?.status === 401) {
      if (path.startsWith('/publisher') || path.startsWith('/game')) {
        router.push({ name: 'PublisherAuthLogin' })
        if (router.currentRoute.value.name === 'PublisherAuthLogin') {
          return
        } else {
          return toastErrorNotificationPopup(
            'You need login to access authenication required page!',
            'Publisher Authentication',
          )
        }
      } else {
        router.push({ name: 'Login' })
        return toastErrorNotificationPopup(
          'You need login to access authenication required page!',
          'Steak Game Store Authentication',
        )
      }
    } else {
      let errResponse = error.response.data.detail
      return toastErrorNotificationPopup(`${errResponse}`, 'Error')
    }
    return Promise.reject(error)
  },
)

export default SteakApi
