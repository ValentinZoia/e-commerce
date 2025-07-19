import {z} from 'zod';

export const loginAdminSchema = z.object({
     username: z.string()
    .min(3, 'Username debe tener al menos 3 caracteres')
    .max(20, 'Username no puede exceder 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username solo puede contener letras, números y guiones bajos')
    .trim()
    .refine((val) => val === val.toLowerCase(), {
      message: "El username debe estar en minúsculas.",
    })
    .refine((val) => !/\s/.test(val), {
      message: "El username no debe contener espacios.",
    }),
    
  
  password: z.string()
    .min(8, 'Password debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password debe contener mayúscula, minúscula y número'),
  
})

export type LoginAdminDTO = z.infer<typeof loginAdminSchema>;

export class LoginAdminDto {
    private constructor(
        public username:string,
        public password:string
    ){}

    static create(data: unknown): LoginAdminDto {
        const parsedData = loginAdminSchema.parse(data);
        return new LoginAdminDto(parsedData.username, parsedData.password);
    }
}