import SteakApi from '@/apis/index'
import { RegisterRequest, VERIFY_USER_OAUTH } from '@/types/auth/AuthType'
import LoginRequest from '@/types/auth/AuthType'
import { setCookie } from '@/utils/cookies/cookie-utils'
import { useUserProfilesStores } from '@/stores/user/useUserProfiles'
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
  }).then((rp) => {
    useUserProfilesStores().setAccessRight(rp.data.displayName)
    useUserProfilesStores().setProfile({ ...rp.data })
    return rp
  })
}

export const userLogout = async () =>
  await SteakApi.post('/user/auth/logout').then((rp) => {
    useUserProfilesStores().removeAccessRight()
    return rp
  })

export const getUserStateOauthToken = async (deviceId: string, signal?: AbortSignal) =>
  await SteakApi.get('/user/auth/oauth2-state', {
    params: { deviceId },
    signal,
  })

export const verifyOauthUser = async (payload: VERIFY_USER_OAUTH) =>
  await SteakApi.post('/user/auth/oauth2-login', payload)
