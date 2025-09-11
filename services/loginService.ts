import { api } from '@/lib';
import { LoginResponseData, SuccessResponse } from '@/types';

export const login = async (
  email: string,
  password: string
): Promise<SuccessResponse<LoginResponseData>> => {
  const response = await api.post<SuccessResponse<LoginResponseData>>('/auth/login', {
    email,
    password,
  });
  return response;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response;
};
