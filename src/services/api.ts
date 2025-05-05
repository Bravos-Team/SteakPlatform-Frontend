import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api



