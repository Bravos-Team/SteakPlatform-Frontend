import { z } from 'zod'
export const isUsername = (value: string) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value)
}
export const isEmail = (value: string) => {
  return z.string().email().safeParse(value).success
}
