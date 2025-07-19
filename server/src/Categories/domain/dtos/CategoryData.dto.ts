import {z} from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  slug: z.string()
    .min(3, { message: 'El slug debe tener al menos 3 caracteres' }),
  description: z.string().nullable().optional(),
});

export type CategoryDataDTO = z.infer<typeof categorySchema>;

export class CategoryDataDto {
    private constructor(
        public name:string,
        public slug:string,
        public description: string | null | undefined
    ){}

    static create(data: unknown): CategoryDataDto{
        const parsedData = categorySchema.parse(data);
        const {name, slug, description} = parsedData;
        return new CategoryDataDto(
            name,
            slug,
            description
        );
    }
}