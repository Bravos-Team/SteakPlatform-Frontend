import axios from 'axios'

export function parseApiError(err: any) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data.detail || 'Có lỗi xảy ra',
      }
    }
    return { status: 503, message: 'Lỗi kết nối server', }
  }
  return { status: 500, message: 'Lỗi không xác định' }
}
