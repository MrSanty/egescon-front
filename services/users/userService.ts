import { api } from '@/lib';
import { SuccessResponse } from '@/types';

export const getUsers = async (): Promise<SuccessResponse<any[]>> => {
  const response = await api.get<SuccessResponse<any[]>>('/users');
  return response;
};
