import {z} from 'zod';
import { IValidator } from '../../domain/Interfaces/IValidator';
import { Category } from '../../domain/entities/Category';
import { ValidationError } from './ValidationError';
import { ICategoryRepository } from '../../domain/Interfaces/ICategoryRepository';

const categorySchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  slug: z.string()
    .min(3, { message: 'El slug debe tener al menos 3 caracteres' }),
  description: z.string().nullable().optional(),
});

export type CategoryCreateDTO = z.infer<typeof categorySchema>;

export class CategoryValidator implements IValidator<Category> {
  constructor(private categoryRepository: ICategoryRepository) {}

  async validate(data: unknown): Promise<Category> {
    try {
      const validatedData = categorySchema.parse(data);

      // Verificar que el nombre es único
      const existingCategoryByName = await this.categoryRepository.getByName(validatedData.name)
      if (existingCategoryByName) {
        throw new ValidationError({
          name: ['Ya existe una categoría con este nombre'],
        });
      }

      
      

      return new Category(
        null, // ID será asignado por la BD
        validatedData.name,
        validatedData.slug,
        validatedData.description
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
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
