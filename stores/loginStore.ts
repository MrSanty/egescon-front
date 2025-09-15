import type { Menu } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LoginState {
  id: string | null;
  companyId: string | null;
  name: string | null;
  email: string | null;
  nit: string | null;
  isSuperAdmin: boolean;
  permissions: string[] | null;
  menu: Menu[] | null;
  setId: (id: string | null) => void;
  setCompanyId: (id: string | null) => void;
  setName: (name: string | null) => void;
  setEmail: (email: string | null) => void;
  setNit: (nit: string | null) => void;
  setIsSuperAdmin: (isSuperAdmin: boolean | undefined) => void;
  setPermissions: (permissions: string[] | null) => void;
  setMenu: (menu: Menu[] | null) => void;
}

export const useLoginStore = create(
  persist<LoginState>(
    set => ({
      id: null,
      companyId: null,
      name: null,
      email: null,
      nit: null,
      isSuperAdmin: false,
      permissions: null,
      menu: null,
      setId: id => set({ id }),
      setCompanyId: id => set({ companyId: id }),
      setName: name => set({ name }),
      setEmail: email => set({ email }),
      setNit: nit => set({ nit }),
      setIsSuperAdmin: isSuperAdmin => set({ isSuperAdmin }),
      setPermissions: permissions => set({ permissions }),
      setMenu: menu => set({ menu }),
    }),
    {
      name: 'login',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
