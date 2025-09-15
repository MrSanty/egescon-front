'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginPayload } from '@/schema';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/stores';
import { login } from '@/services';
import { useState } from 'react';
import { ApiError } from '@/lib';

interface UseLoginProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
  const {
    setName,
    setEmail,
    setPermissions,
    setCompanyId,
    setMenu,
    setNit,
    setId,
    setIsSuperAdmin,
  } = useLoginStore();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginPayload> = async ({ email, password }) => {
    try {
      const response = await login(email, password);

      const userData = response.data;

      setId(userData.id);
      setName(userData.name);
      setEmail(userData.email);
      setCompanyId(userData.companyId);
      setNit(userData.nit);
      setIsSuperAdmin(userData.isSuperAdmin || false);
      setPermissions(userData.permissions);
      setMenu(userData.menus);

      if (onSuccess) {
        onSuccess();

        router.push('/dashboard');
      }
    } catch (error) {
      if (onError) onError(error as Error);

      if (error instanceof ApiError) {
        if (error.body.fields) {
          console.error('Errores de campo:', error.body.fields);
        }
      }
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`El inicio de sesión con ${provider} está en desarrollo.`);
  };

  return {
    errors,
    handleSocialLogin,
    handleSubmit,
    isSubmitting,
    isVisible,
    register,
    onSubmit,
    toggleVisibility,
  };
};
