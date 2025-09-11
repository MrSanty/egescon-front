'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCompanyPayload, CompanySchema } from '@/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany } from '@/services';
import { ApiError } from '@/lib';

interface UseCreateCompanyProps {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useCreateCompany = ({ onSuccess, onError }: UseCreateCompanyProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCompanyPayload>({
    resolver: zodResolver(CompanySchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      reset();
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const onSubmit = (data: CreateCompanyPayload) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isPending,
  };
};