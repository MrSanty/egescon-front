'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/services';
import { ApiError } from '@/lib';
import toast from 'react-hot-toast';

interface UseDeleteUserProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteUser = ({ onSuccess, onError }: UseDeleteUserProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  return {
    handleDelete: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
