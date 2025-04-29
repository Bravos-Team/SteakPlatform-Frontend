import { ZodSchema } from 'zod'
export function validationForm<T>(schema : ZodSchema<T>,data : unknown){
  const result = schema.safeParse(data);
  if (!result.success){
    const errors :Record<string, string>  ={}
    result.error.errors.forEach(err =>{
      const flied = err.path[0] as string
      errors[flied] = err.message
    });
    return {valid : false ,  errors}
  }
  return {valid : true , data : result.data}

}
