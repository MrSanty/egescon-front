'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRole } from '@/services';
import { ApiError } from '@/lib';

interface UseDeleteRoleProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteRole = ({ onSuccess, onError }: UseDeleteRoleProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  return {
    handleDelete: mutate,
    isLoading: isPending,
  };
};
