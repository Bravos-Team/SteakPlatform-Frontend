import SteakApi from '@/apis/index'
import { usePublisherProfilesStores } from '@/stores/publisher/usePublisherProfileStores'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'
import { setCookie } from '@/utils/cookies/cookie-utils'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'

export const register = (data: PublisherRegisterRequest) => {
  return SteakApi.post('/dev/auth/register', data)
}

export const loginUserName = (data: PublisherLoginRequest) => {
  return SteakApi.post('/dev/auth/username-login', data)
}

export const loginEmail = (data: PublisherLoginRequest) => {
  return SteakApi.post('/dev/auth/email-login', data)
}

export const stupidLogout = () => {
  return SteakApi.get('/dev/auth/logout')
}
export const logout = () => {
  return SteakApi.post('/dev/auth/logout')
}

export const renewPublisherRefreshToken = async () => {
  return await SteakApi.post('/dev/auth/refresh', {
    deviceId: await generateDeviceId(),
    deviceInfo: await generateDeviceInfo(),
  }).then((rp) => {
    usePublisherProfilesStores().setProfile({ ...rp.data })
    usePublisherProfilesStores().setAccessRight(rp.data.username)
    return rp
  })
}

export const renewUserRefreshToken = async () => {
  return await SteakApi.post('/user/auth/refresh', {
    deviceId: await generateDeviceId(),
    deviceInfo: await generateDeviceInfo(),
  })
}
