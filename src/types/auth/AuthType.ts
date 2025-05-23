import { z } from 'zod'
import { isEmail, isUsername } from '@/services/common/CurrencyUtils'

export const RegisterRequestSchema = z
  .object({
    username: z.coerce
      .string({
        required_error: 'Username cannot be empty',
      })
      .regex(/^[a-zA-Z0-9]{6,32}$/, {
        message: 'Username cannot contain special characters and between 6 and 32 characters',
      })
      .min(6, { message: 'Username must be at least 6 characters long' })
      .max(32, { message: 'Username must be at most 32 characters long' })
      .default(''),

    email: z
      .string({
        required_error: 'Email cannot be empty',
      })
      .email({ message: 'Please enter a valid email address' }),

    password: z.coerce
      .string({
        required_error: 'Password cannot be empty',
      })
      .regex(/^(?=\S{6,32})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/, {
        message:
          'Password must be 6-32 characters long, include at least one uppercase letter,' +
          ' one lowercase letter, one number, and one special character (@$!%*?&). No spaces allowed.',
      })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(32, { message: 'Password must be at most 32 characters long' }),

    verifyPassword: z.string().nonempty({ message: 'Verify password cannot be empty' }),

    agreeNotification: z.boolean(),

    agreeTermsOfServices: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms of service',
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.password !== '' &&
      data.verifyPassword !== '' &&
      data.password !== data.verifyPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['verifyPassword'],
        message: 'Password and verify password do not match',
      })
    } else {
      return ''
    }
  })

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

const RegisterResponseSchema = z.object({
  message: z.coerce.string({ message: 'Cannot receive response message from server' }),
})

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
    .min(1, { message: 'Thiếu username/email' })
    .refine((val) => val.length === 0 || isUsername(val), {
      message: 'Username phải  3-12 ký tự chữ/số',
    }),
})

export const loginByEmailSchema = baseLoginShema.extend({
  email: z
    .string()
    .trim()
    .min(1, 'Thiếu username/email')
    .refine((val) => isEmail(val), { message: 'Username phải là email' }),
})

export type LoginRequest =
  | z.infer<typeof loginByUserNameSchema>
  | z.infer<typeof loginByEmailSchema>

export default LoginRequest

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
