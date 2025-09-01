import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  isDrawerOpen: boolean;
  toggleSidebar: () => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

export const useUiStore = create<UiState>(set => ({
  isSidebarOpen: true,
  isDrawerOpen: false,
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDrawer: () => set(state => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
