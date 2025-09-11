'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllPermissions } from '@/services';

export const usePermissions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['permissions'],
    queryFn: getAllPermissions,
  });

  return {
    permissions: data?.data ?? [],
    isLoading,
    isError,
    error,
  };
};
