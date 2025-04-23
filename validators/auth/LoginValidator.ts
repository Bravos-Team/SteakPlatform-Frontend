import {z} from 'zod'

export const loginRequestSchema =z.object({

  username : z.string().refine(
    (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]{3,12}$/.test(val),
    {
      message: 'Username phải là email hoặc 3-12 ký tự chữ/số',
    }
  ),
  password : z.string().min(6,'password phải trên 6 ký tự'),
  deviceId : z.string().nonempty('Thiếu deviceId'),
})
export const validateLoginRequest=(data :unknown) =>{
  return loginRequestSchema.safeParse(data)
}
