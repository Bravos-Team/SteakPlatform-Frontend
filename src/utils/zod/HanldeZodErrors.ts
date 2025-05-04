import { z } from 'zod'

export const extractErrors = <T>(zodError: z.ZodError<T>): Record<keyof T, string> => {
  const errors = {} as Record<keyof T, string>
  zodError.errors.forEach((e) => {
    const key = e.path[0] as keyof T
    errors[key] = e.message
  })
  return errors
}
