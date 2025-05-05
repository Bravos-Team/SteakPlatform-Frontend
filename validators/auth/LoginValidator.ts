import { z } from 'zod'

export const isUsername = (value: string) => {
  return /^[a-zA-Z0-9_]{3,12}$/.test(value)
}
export const isEmail = (value: string) => {
  return z.string().email().safeParse(value).success
}

export const baseLoginShema = z.object({
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,32}$/, {
      message:
        'Mật khẩu phải bao gồm 8-32 ký tự, bao góp 1 ký tự hóa, 1 ký tự số, 1 ký tự in hóa, 1 ký tự khác',
    })
    .nonempty('Thiếu password'),
  deviceId: z.string().nonempty('Thiếu deviceId'),
  deviceInfo: z.string().nonempty('Thiếu deviceInfo'),
})

export const loginByUserNameSchema = baseLoginShema.extend({
  username: z
    .string()
    .min(1, {message :'Thiếu username/email'})
    .refine((val) => val.length ===0 || isUsername(val), {
      message: 'Username phải  3-12 ký tự chữ/số',
    }),
})

export const loginByEmailSchema = baseLoginShema.extend({
  email: z
    .string()
    .trim()
    .min(1, 'Thiếu username/email')
    .refine((val) => isEmail(val), { message: 'Username phải là email' })
})

type LoginRequest = z.infer<typeof loginByUserNameSchema> | z.infer<typeof loginByEmailSchema>

export default LoginRequest
