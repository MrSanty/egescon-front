'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', debouncedSearchTerm],
    queryFn: () => getAllUsers(),
  });

  return {
    users: data?.data ?? [],
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
  };
};
