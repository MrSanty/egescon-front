'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCompanyPayload, UpdateCompanySchema } from '@/schema';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getCompanyById, updateCompany } from '@/services';
import { ApiError } from '@/lib';
import { useEffect } from 'react';

interface UseUpdateCompanyProps {
  id: string;
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateCompany = ({ id, onSuccess, onError }: UseUpdateCompanyProps) => {
  const queryClient = useQueryClient();

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompanyById(id),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateCompanyPayload>({
    resolver: zodResolver(UpdateCompanySchema),
  });

  useEffect(() => {
    if (company?.data) {
      reset(company.data);
    }
  }, [company, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateCompanyPayload) => updateCompany(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', id] });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const onSubmit = (data: UpdateCompanyPayload) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    company: company?.data,
    isLoading: isSubmitting || isPending,
    isLoadingCompany,
  };
};
