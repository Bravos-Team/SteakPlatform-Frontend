import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setCookie = (key: string, value: string, options?: any) => {
  cookies.set(encodeURIComponent(btoa(key)), encodeURIComponent(btoa(value)), {
    path: '/',
    ...options,
  })
}

export const getCookie = (key: string) => {
  const raw = cookies.get(encodeURIComponent(btoa(key)))
  return raw ? atob(decodeURIComponent(raw)) : null
}

export const removeCookie = (key: string) => {
  cookies.remove(encodeURIComponent(btoa(key)), { path: '/' })
}
