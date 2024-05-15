import { transformer, z } from 'zod';

export const UserCreateSchema = z.object({
    cpf: z.string(),
    password: z.string(),
    name: z.string(),
    birthDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format. Date must be in YYYY-MM-DD format.'
    }).transform((value) => new Date(value)),
    status: z.enum(['Ativo', 'Inativo']),
    address: z.object({
        street: z.string(),
        number: z.number(),
        complement: z.string().nullable(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string().regex(/^\d{5}-\d{3}$/)
    })
});

export const UserUpdateSchema = z.object({
    cpf: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    birthDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format. Date must be in YYYY-MM-DD format.'
    }).transform((value) => new Date(value)).optional(),
    status: z.enum(['Ativo', 'Inativo']).optional(),
    address: z.object({
        street: z.string().optional(),
        number: z.number().optional(),
        complement: z.string().nullable().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().regex(/^\d{5}-\d{3}$/).optional()
    }).optional()
})