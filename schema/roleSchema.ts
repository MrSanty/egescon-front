import { z } from 'zod';

export const RoleSchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre del rol es obligatorio.' }),
  description: z.string().trim().optional(),
  permissionIds: z.array(z.string()).optional(),
  companyId: z.string().optional(),
});

export const UpdateRoleSchema = RoleSchema.partial();

export type CreateRolePayload = z.infer<typeof RoleSchema>;

export type UpdateRolePayload = z.infer<typeof UpdateRoleSchema>;
