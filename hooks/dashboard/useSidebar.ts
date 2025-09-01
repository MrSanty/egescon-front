'use client'
import { useUiStore } from "@/stores";

export const useSidebar = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer
  } = useUiStore();

  return {
    isSidebarOpen,
    toggleSidebar,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer
  };
};