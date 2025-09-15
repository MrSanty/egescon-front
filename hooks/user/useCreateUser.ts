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
    watch,
    setValue,
  } = useForm<CreateUserPayload>({
    resolver: zodResolver(UserSchema),
    // Lógica mejorada: establecemos el companyId por defecto aquí.
    defaultValues: {
      name: '',
      email: '',
      docNum: '',
      // Si no es superAdmin, se asigna su companyId. Si lo es, empieza vacío.
      companyId: isSuperAdmin ? undefined : companyId || undefined,
      roleId: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      reset();
      toast.success('Usuario creado. Se ha enviado un correo con la contraseña.');
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast.error(error.body.message || 'Error al crear el usuario.');
      onError?.(error);
    },
  });

  const onSubmit = (data: CreateUserPayload) => {
    // La data ya viene con el companyId correcto, no se necesita lógica extra.
    if (!data.companyId) {
      toast.error('Es necesario asignar una compañía al usuario.');
      return;
    }
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    watch,
    setValue,
    isSubmitting: isSubmitting || mutation.isPending,
  };
};
