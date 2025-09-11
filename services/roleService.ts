import { api } from '@/lib';
import { CreateRolePayload, UpdateRolePayload } from '@/schema';
import { Permission, Role, SuccessResponse } from '@/types';

export const getAllPermissions = async (): Promise<SuccessResponse<Permission[]>> => {
  return await api.get<SuccessResponse<Permission[]>>('/roles/permissions');
};

export const getAllRoles = async (): Promise<SuccessResponse<Role[]>> => {
  return await api.get<SuccessResponse<Role[]>>('/roles');
};

export const getRoleById = async (id: string): Promise<SuccessResponse<Role>> => {
  return await api.get<SuccessResponse<Role>>(`/roles/${id}`);
};

export const createRole = async (data: CreateRolePayload): Promise<SuccessResponse<Role>> => {
  return await api.post<SuccessResponse<Role>>('/roles', data);
};

export const updateRole = async (
  id: string,
  data: UpdateRolePayload
): Promise<SuccessResponse<Role>> => {
  return await api.put<SuccessResponse<Role>>(`/roles/${id}`, data);
};

export const deleteRole = async (id: string): Promise<SuccessResponse<Role>> => {
  return await api.del<SuccessResponse<Role>>(`/roles/${id}`);
};
