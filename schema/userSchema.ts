import { z } from 'zod';
import { DocType } from '@/types';

export const UserSchema = z.object({
  name: z.string().trim().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingresa un correo electrónico válido.' }),
  docType: z.enum(DocType, {
    error: () => ({ message: 'Debes seleccionar un tipo de documento.' }),
  }),
  docNum: z.string().trim().min(5, { message: 'El número de documento parece demasiado corto.' }),
  roleId: z.string({ message: 'Debes seleccionar un rol.' }),

  companyId: z.string({ message: 'Debes seleccionar una compañía.' }).optional(),
});

export const UpdateUserSchema = UserSchema.partial();

export type CreateUserPayload = z.infer<typeof UserSchema>;

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
