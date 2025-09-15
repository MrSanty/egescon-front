'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/services';

export const useRoles = (companyId?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['roles', companyId],
    queryFn: () => getAllRoles(companyId),
  });

  return {
    roles: data?.data ?? [],
    isLoading,
    isError,
    error,
  };
};
