import { z } from 'zod';
import { IValidator } from '../../domain/Interfaces/IValidator';
import {  Admin } from '../../domain/entities/Admin';
import { IAdminRepository } from '../../domain/Interfaces/IAdminRepository';
import { ValidationError } from './ValidationError';

export const LoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100)
});

export type AdminCreateDTO = z.infer<typeof LoginSchema>

export class AdminValidator implements IValidator<Admin>{
    
    async validate(data: unknown): Promise<Admin> {
        try {
        //Primera validacion con zod
        const validateAdmin = LoginSchema.parse(data);

        

        return new Admin(
            null,
            validateAdmin.username,
            validateAdmin.password
        )

        } catch (error) {
            if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });

        throw new ValidationError(formattedErrors);
      }
      throw error;
        }

    }
}