import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'El correo electrónico es obligatorio.' })
    .email({ message: 'Por favor, ingresa un correo electrónico válido.' }),

  password: z
    .string()
    .min(1, { message: 'La contraseña es obligatoria.' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});

export type LoginPayload = z.infer<typeof LoginSchema>;
