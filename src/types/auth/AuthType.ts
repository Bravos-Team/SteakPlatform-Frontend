import { z } from 'zod'
import { isEmail, isUsername } from '@/utils/type/typeChecking'

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
        'The password must include 8-32 characters, including 1 special character, 1 numeric character, 1 uppercase character, and 1 other character.',
    })
    .nonempty('Password cannot be empty'),
  deviceId: z.string().nonempty('Device ID cannot be empty'),
  deviceInfo: z.string().nonempty('Device Infor cannot be empty'),
})

export const loginByUserNameSchema = baseLoginShema.extend({
  username: z
    .string()
    .min(1, { message: 'Username/Email cannot be empty' })
    .refine((val) => val.length === 0 || isUsername(val), {
      message: 'Username must be alphanumeric and between 3 and 12 characters',
    }),
})

export const loginByEmailSchema = baseLoginShema.extend({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Username/Email cannot be empty' })
    .refine((val) => isEmail(val), { message: 'You need to enter an email' }),
})

export type LoginRequest =
  | z.infer<typeof loginByUserNameSchema>
  | z.infer<typeof loginByEmailSchema>
export type COMMON_DATA = {
  email?: string
  username?: string
  password: string
  deviceId: string
  deviceInfo: string
}
export default LoginRequest

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export type VERIFY_USER_OAUTH = {
  provider: string
  code: string
  state: string
  deviceId: string
  deviceInfo: string
}
