import { z } from 'zod'
import { isEmail, isUsername } from '@/utils/type/typeChecking'

export const BaseAdminLoginShema = z.object({
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,32}$/, {
      message:
        'Password must be 8-32 characters long, include at least one uppercase letter,  one number, and one special character (@$!%*?&).',
    })
    .nonempty('Password cannot be empty'),
  deviceId: z.string().nonempty('DeviceId cannot be empty'),
  deviceInfo: z.string().nonempty('DeviceInfo cannot be empty'),
})
export const LoginByUserNameSchema = BaseAdminLoginShema.extend({
  username: z
    .string()
    .min(1, { message: 'Username or email cannot be empty' })
    .refine((val) => val.length === 0 || isUsername(val), {
      message: 'Username must be 3-12 characters long',
    }),
})
export const LoginByEmailSchema = BaseAdminLoginShema.extend({
  email: z
    .string()
    .trim()
    .min(1, 'Username or email cannot be empty')
    .refine((val) => isEmail(val), { message: 'Please enter a valid email address' }),
})

export type AdminLoginRequest =
  | z.infer<typeof LoginByUserNameSchema>
  | z.infer<typeof LoginByEmailSchema>
