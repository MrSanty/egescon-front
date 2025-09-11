'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany } from '@/services';
import { ApiError } from '@/lib';
import { useDisclosure } from '@heroui/react';

interface UseDeleteCompanyProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteCompany = ({ onSuccess, onError }: UseDeleteCompanyProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return {
    handleDelete,
    isLoading: isPending,
    isSuccess: isSuccess,
    isOpen,
    onOpen,
    onOpenChange,
  };
};
