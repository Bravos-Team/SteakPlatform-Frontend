
export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  username: string
  password: string
  deviceId: string
}
