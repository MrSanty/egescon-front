'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllCompanies } from '@/services';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['companies', debouncedSearchTerm],
    queryFn: () => {
      const isNit = /^[0-9.-]+$/.test(debouncedSearchTerm);
      const params = debouncedSearchTerm
        ? { [isNit ? 'nit' : 'name']: debouncedSearchTerm }
        : {};
      return getAllCompanies(params);
    },
  });

  return {
    companies: data?.data ?? [],
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
  };
};