import axios from 'axios'

// import { useRouter } from "vue-router"

export const SteakApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// const router = useRouter()

SteakApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('ERROR: ', error.response)
    if (error.response?.status === 401) {
      const path = window.location.pathname
      if (path.startsWith('/publisher')) {
        window.location.href = '/publisher/login'
      } else {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)

export default SteakApi
