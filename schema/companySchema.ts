import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre de la compañía es obligatorio.' }),
  nit: z.string().trim().min(1, { message: 'El NIT de la compañía es obligatorio.' }),
});

export const UpdateCompanySchema = CompanySchema.partial();

export type CreateCompanyPayload = z.infer<typeof CompanySchema>;

export type UpdateCompanyPayload = z.infer<typeof UpdateCompanySchema>;
