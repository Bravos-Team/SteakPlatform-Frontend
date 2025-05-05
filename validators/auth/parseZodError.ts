import { ZodSchema } from 'zod'

export function validationForm<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.errors.forEach((err) => {
      const filed = err.path[0]
      errors[filed] = err.message
    })
    return { valid: false, errors }
  }
  return { valid: true, data: result.data }
}
