import { api } from '@/lib';
import { CreateCompanyPayload, UpdateCompanyPayload } from '@/schema';
import { SuccessResponse, Company } from '@/types';

interface GetCompaniesParams {
  name?: string;
  nit?: string;
}

export const getAllCompanies = async (
  params?: GetCompaniesParams
): Promise<SuccessResponse<Company[]>> => {
  const queryParams: Record<string, string> = {};

  if (params?.name) {
    queryParams.name = params.name;
  }
  if (params?.nit) {
    queryParams.nit = params.nit;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const endpoint = `/companies${queryString ? `?${queryString}` : ''}`;

  return await api.get<SuccessResponse<Company[]>>(endpoint);
};

export const getCompanyById = async (id: string): Promise<SuccessResponse<Company>> => {
  return await api.get<SuccessResponse<Company>>(`/companies/${id}`);
};

export const createCompany = async (
  data: CreateCompanyPayload
): Promise<SuccessResponse<Company>> => {
  return await api.post<SuccessResponse<Company>>('/companies', data);
};

export const updateCompany = async (
  id: string,
  data: UpdateCompanyPayload
): Promise<SuccessResponse<Company>> => {
  return await api.put<SuccessResponse<Company>>(`/companies/${id}`, data);
};

export const deleteCompany = async (id: string): Promise<SuccessResponse<Company>> => {
  return await api.del<SuccessResponse<Company>>(`/companies/${id}`);
};
