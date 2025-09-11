'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/services';

export const useRoles = () => {
  // Por ahora, solo obtenemos todos los roles.
  // Se puede añadir un filtro por nombre similar a `useCompanies` si es necesario.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });

  return {
    roles: data?.data ?? [],
    isLoading,
    isError,
    error,
  };
};
