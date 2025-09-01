import type { Menu } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LoginState {
  companyId: string | null;
  name: string | null;
  email: string | null;
  permissions: string[] | null;
  menu: Menu[] | null;
  setCompanyId: (id: string | null) => void;
  setName: (name: string | null) => void;
  setEmail: (email: string | null) => void;
  setPermissions: (permissions: string[] | null) => void;
  setMenu: (menu: Menu[] | null) => void;
}

export const useLoginStore = create(
  persist<LoginState>(
    set => ({
      companyId: null,
      name: null,
      email: null,
      permissions: null,
      menu: null,

      setCompanyId: id => set({ companyId: id }),
      setName: name => set({ name }),
      setEmail: email => set({ email }),
      setPermissions: permissions => set({ permissions }),
      setMenu: menu => set({ menu }),
    }),
    {
      name: 'login',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
