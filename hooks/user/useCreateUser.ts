'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserPayload, UserSchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@/services';
import { ApiError } from '@/lib';
import { useLoginStore } from '@/stores';
import toast from 'react-hot-toast';

interface UseCreateUserProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useCreateUser = ({ onSuccess, onError }: UseCreateUserProps) => {
  const queryClient = useQueryClient();
  const { companyId, isSuperAdmin } = useLoginStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateUserPayload>({
    resolver: zodResolver(UserSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
      toast.success('Usuario creado exitosamente. Se ha enviado un correo con la contraseña.');
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast.error(error.body.message || 'Error al crear el usuario.');
      onError?.(error);
    },
  });

  const onSubmit = (data: CreateUserPayload) => {
    const rawCompanyId = isSuperAdmin ? data.companyId : companyId;
    const finalData = {
      ...data,
      companyId: typeof rawCompanyId === 'string' ? rawCompanyId : undefined,
    };
    
    if (!finalData.companyId) {
        toast.error('Es necesario seleccionar una compañía.');
        return;
    }

    mutation.mutate(finalData);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    isSubmitting: isSubmitting || mutation.isPending,
  };
};