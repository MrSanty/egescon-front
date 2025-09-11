'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateRolePayload, RoleSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRole } from '@/services';
import { ApiError } from '@/lib';
import { useLoginStore } from '@/stores';
import toast from 'react-hot-toast'; // Asegúrate de importar toast

interface UseCreateRoleProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useCreateRole = ({ onSuccess, onError }: UseCreateRoleProps) => {
  const queryClient = useQueryClient();
  const { companyId } = useLoginStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateRolePayload>({
    resolver: zodResolver(RoleSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      reset();
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const onSubmit = (data: CreateRolePayload) => {
    if (!companyId) {
      toast.error('Error: No se pudo identificar la compañía. Por favor, inicie sesión de nuevo.');
      return;
    }
    mutate({ ...data, companyId });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    isSubmitting: isSubmitting || isPending,
  };
};
