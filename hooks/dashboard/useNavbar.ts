'use client';

import { logout } from '@/services';
import { useLoginStore, useUiStore } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';

export const useNavbar = () => {
  const { isSidebarOpen, toggleSidebar } = useUiStore();
  const queryClient = useQueryClient();
  const { name } = useLoginStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      queryClient.clear();
      router.push('/dashboard');
    }
  };

  return {
    name,
    isSidebarOpen,
    toggleSidebar,
    handleLogout,
    pathname,
  };
};
