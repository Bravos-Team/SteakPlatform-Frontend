import axios from 'axios'

export function parseApiError(err: any) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      return {
        message: err.response.data.detail || 'Có lỗi xảy ra',
      }
    }
    return {  message: 'Lỗi kết nối server' }
  }
  return {  message: 'Lỗi không xác định' }
}
