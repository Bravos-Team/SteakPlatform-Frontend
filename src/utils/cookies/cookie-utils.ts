import Cookies from 'universal-cookie'

const cookies = new Cookies()

const encode = (val: string) => btoa(encodeURIComponent(val))
const decode = (val: string) => decodeURIComponent(atob(val))

export const setCookie = (key: string, value: string | object, options?: any) => {
  const safeValue = typeof value === 'object' ? JSON.stringify(value) : value
  cookies.set(encode(key), encode(safeValue), {
    path: '/',
    ...options,
  })
}

export const getCookie = (key: string) => {
  const raw = cookies.get(encode(key))
  if (!raw) return null
  const decoded = decode(raw)
  try {
    return JSON.parse(decoded)
  } catch {
    return decoded
  }
}

export const removeCookie = (key: string) => {
  cookies.set(encode(key), '', {
    expires: new Date(0),
  })
  cookies.remove(encode(key), { path: '/' })
}

export const removeCookies = (keys: string[]) => {
  keys.forEach((key) => {
    removeCookie(key)
  })
}

export const invalidateCookie = (key: string, data: any, options?: any) => {
  if (!data) return
  setCookie(key, '', options)
}
