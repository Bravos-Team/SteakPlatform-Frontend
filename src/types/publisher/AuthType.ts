import { z } from 'zod'
import { baseLoginShema } from '@/types/auth/AuthType'
import { isEmail, isUsername } from '@/services/common/CurrencyUtils'

export const PublisherRegisterRequestSchema = z
  .object({
    name: z.coerce.string({ required_error: 'Name cannot be empty' }).regex(/^[a-zA-Z\s]{3,32}$/, {
      message: 'Name cannot contain special characters and between 3 and 32 characters',
    }),
    masterUsername: z.coerce
      .string({
        required_error: 'Username cannot be empty',
      })
      .regex(/^[a-zA-Z0-9]{6,32}$/, {
        message: 'Username cannot contain special characters and between 6 and 32 characters',
      })
      .min(6, { message: 'Username must be at least 6 characters long' })
      .max(32, { message: 'Username must be at most 32 characters long' })
      .default(''),
    phone: z.coerce
      .string({
        required_error: 'Phone number cannot be empty',
      })
      .min(9, { message: 'Phone number must be at least 10 digits long' }),
    businessEmail: z
      .string({
        required_error: 'Email cannot be empty',
      })
      .email({ message: 'Please enter a valid email address' }),
    masterEmail: z
      .string({
        required_error: 'Email cannot be empty',
      })
      .email({ message: 'Please enter a valid email address' }),

    masterPassword: z.coerce
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

    verifyMasterPassword: z.string().nonempty({ message: 'Verify password cannot be empty' }),
  })
  .superRefine((data, ctx) => {
    if (
      data.masterPassword !== '' &&
      data.verifyMasterPassword !== '' &&
      data.masterPassword !== data.verifyMasterPassword
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

export type PublisherRegisterRequest = z.infer<typeof PublisherRegisterRequestSchema>

const PublisherRegisterResponseSchema = z.object({
  message: z.coerce.string({ message: 'Username or password is invalid' }),
  error: z.object({
    username: z.coerce.string({ required_error: 'Username cannot be empty' }),
    password: z.coerce.string({ message: 'password cannot contains special characters' }),
  }),
})

export type PublisherRegisterResponse = z.infer<typeof PublisherRegisterResponseSchema>

export const BasePublisherLoginShema = z.object({
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
export const LoginByUserNameSchema = BasePublisherLoginShema.extend({
  username: z
    .string()
    .min(1, { message: 'Username or email cannot be empty' })
    .refine((val) => val.length === 0 || isUsername(val), {
      message: 'Username must be 3-12 characters long',
    }),
})
export const LoginByEmailSchema = BasePublisherLoginShema.extend({
  email: z
    .string()
    .trim()
    .min(1, 'Username or email cannot be empty')
    .refine((val) => isEmail(val), { message: 'Please enter a valid email address' }),
})

export type PublisherLoginRequest =
  | z.infer<typeof LoginByUserNameSchema>
  | z.infer<typeof LoginByEmailSchema>
