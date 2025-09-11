'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateRolePayload, UpdateRoleSchema } from '@/schema';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getRoleById, updateRole } from '@/services';
import { ApiError } from '@/lib';
import { useEffect } from 'react';

interface UseUpdateRoleProps {
  id: string;
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateRole = ({ id, onSuccess, onError }: UseUpdateRoleProps) => {
  const queryClient = useQueryClient();

  const { data: role, isLoading: isLoadingRole } = useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<UpdateRolePayload>({
    resolver: zodResolver(UpdateRoleSchema),
  });

  useEffect(() => {
    if (role?.data) {
      // Mapeamos los permisos para solo incluir los IDs en el formulario
      const permissionIds = role.data.permissions?.map(p => p.id) || [];
      reset({
        name: role.data.name,
        description: role.data.description || '',
        permissionIds: permissionIds,
      });
    }
  }, [role, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateRolePayload) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', id] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const onSubmit = (data: UpdateRolePayload) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    role: role?.data,
    isLoading: isSubmitting || isPending,
    isLoadingRole,
  };
};
