import SteakApi from '@/apis/index'
import { RegisterRequest } from '@/types/auth/AuthType'
import LoginRequest from '@/types/auth/AuthType'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'

export const register = async (registerRequest: RegisterRequest): Promise<void> => {
  return await SteakApi.post('/user/auth/register', registerRequest)
}

export async function loginApiUserName(loginData: LoginRequest) {
  return await SteakApi.post('/user/auth/username-login', loginData)
}

export async function loginApiEmail(loginData: LoginRequest) {
  return await SteakApi.post('/user/auth/email-login', loginData)
}

export const renewUserRefreshToken = async () => {
  return await SteakApi.post('/user/auth/refresh', {
    deviceId: await generateDeviceId(),
    deviceInfo: await generateDeviceInfo(),
  })
}
