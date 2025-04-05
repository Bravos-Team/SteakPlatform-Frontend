import axios from 'axios'

const base_api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { base_api }
