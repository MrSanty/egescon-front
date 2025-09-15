import { api } from '@/lib';
import { CreateUserPayload, UpdateUserPayload } from '@/schema';
import { User, SuccessResponse } from '@/types';

export const getAllUsers = async (): Promise<SuccessResponse<User[]>> => {
  return await api.get<SuccessResponse<User[]>>('/users');
};

export const getUserById = async (id: string): Promise<SuccessResponse<User>> => {
  return await api.get<SuccessResponse<User>>(`/users/${id}`);
};

export const createUser = async (data: CreateUserPayload): Promise<SuccessResponse<User>> => {
  return await api.post<SuccessResponse<User>>('/users', data);
};

export const updateUser = async (
  id: string,
  data: UpdateUserPayload
): Promise<SuccessResponse<User>> => {
  return await api.put<SuccessResponse<User>>(`/users/${id}`, data);
};

export const deleteUser = async (id: string): Promise<SuccessResponse<User>> => {
  return await api.del<SuccessResponse<User>>(`/users/${id}`);
};
