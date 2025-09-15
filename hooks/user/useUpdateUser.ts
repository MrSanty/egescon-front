'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserPayload, UpdateUserSchema } from '@/schema';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getUserById, updateUser } from '@/services';
import { ApiError } from '@/lib';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface UseUpdateUserProps {
  id: string;
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateUser = ({ id, onSuccess, onError }: UseUpdateUserProps) => {
  const queryClient = useQueryClient();

  const { data: userResponse, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
    setValue,
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserSchema),
  });

  // Efecto mejorado para popular el formulario
  useEffect(() => {
    const userData = userResponse?.data;
    if (userData) {
      const formValues = {
        name: userData.name,
        email: userData.email,
        docType: userData.docType,
        docNum: userData.docNum,
        companyId: userData.companyId,
        roleId: userData.roleId,
      };
      reset(formValues);
    }
  }, [userResponse, reset]);

  const mutation = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      toast.success('Usuario actualizado correctamente.');
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast.error(error.body.message || 'Error al actualizar el usuario.');
      onError?.(error);
    },
  });

  const onSubmit = (data: UpdateUserPayload) => {
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
    isLoadingUser,
  };
};
