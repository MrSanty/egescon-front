'use client'

import { usePathname } from "next/navigation"
import { useSidebar } from "@/hooks"
import Image from "next/image"
import Link from 'next/link'
import {
  FileTextIcon,
  ChartIcon,
  UserIcon,
  BuildingIcon,
  ShieldCheckIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  BriefcaseIcon
} from "@/components/icons"
import { cn } from "@/lib"
import Logo from "@/public/images/logo.png"
import { Permission } from "@/types/permissions"
import { useLoginStore } from "@/stores"

const menuGroups = {
  'Configuración': [
    { name: 'Usuarios', icon: <UserIcon className="size-5" />, href: '/dashboard/users', permission: Permission.USER_READ },
    { name: 'Empresas', icon: <BuildingIcon className="size-5" />, href: '/dashboard/companies', permission: Permission.COMPANY_READ },
    { name: 'Roles', icon: <ShieldCheckIcon className="size-5" />, href: '/dashboard/roles', permission: Permission.ROLE_READ },
    { name: 'Contratistas', icon: <BriefcaseIcon className="size-5" />, href: '/dashboard/contractors', permission: Permission.USER_READ },
    { name: 'Parámetros', icon: <SettingsIcon className="size-5" />, href: '/dashboard/settings', permission: Permission.PARAMETERS_UPDATE },
  ],
  'Ejecución': [
    { name: 'Contratos', icon: <FileTextIcon className="size-5" />, href: '/dashboard/contracts', permission: Permission.CONTRACT_READ },
    { name: 'Informes', icon: <ChartIcon className="size-5" />, href: '/dashboard/reports', permission: Permission.REPORTS_READ },
  ]
}

export const Sidebar = () => {
  const { permissions } = useLoginStore()
  const pathname = usePathname()
  const {
    isSidebarOpen,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer
  } = useSidebar()

  const renderLinks = (items: typeof menuGroups[ keyof typeof menuGroups ]) => {
    return items.map((link) => {
      // Si el usuario no tiene permisos, no renderizamos el link
      if (!permissions?.includes(link.permission)) {
        return null;
      }

      const isActive = pathname.startsWith(link.href)

      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={isDrawerOpen ? closeDrawer : undefined}
          title={link.name}
          className={cn(
            "flex items-center p-2 rounded-lg transition-colors duration-200 group",
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100",
            !isSidebarOpen && !isDrawerOpen
              ? "justify-center"
              : ""
          )}
        >
          <div className={cn(isActive ? "text-white" : "text-gray-500 group-hover:text-gray-800")}>
            {link.icon}
          </div>
          <span
            className={cn(
              "ml-3 font-medium whitespace-nowrap",
              !isSidebarOpen && !isDrawerOpen
                ? "hidden"
                : ""
            )}
          >
            {link.name}
          </span>
        </Link>
      )
    })
  }

  return (
    <>
      {/* Fondo oscuro para el Drawer en móvil */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Contenedor Principal del Sidebar */}
      <nav
        className={cn(
          "flex flex-col h-full bg-white border-r border-gray-200",
          "transition-all duration-300 ease-in-out sidebar",
          isDrawerOpen
            ? "fixed top-0 left-0 z-50 w-64" // Estilo para Drawer Móvil
            : `hidden  ${isSidebarOpen ? "lg:flex w-64" : ""}` // Estilo para Sidebar Desktop
        )}
      >
        {/* Encabezado del Sidebar */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 flex-shrink-0">
          <div className={cn("transition-opacity duration-300", isSidebarOpen || isDrawerOpen ? "opacity-100" : "opacity-0")}>
            <Image src={Logo} alt="Logo" width={100} height={32} />
          </div>

        </div>

        {/* Cuerpo del Sidebar con los links */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden p-3">
          {Object.entries(menuGroups).map(([ groupName, items ]) => (
            <div key={groupName} className="mb-4">
              <h3 className={cn("px-2 mb-2 text-xs font-semibold text-gray-500 uppercase", !isSidebarOpen && !isDrawerOpen ? "text-center" : "")}>
                {isSidebarOpen || isDrawerOpen ? groupName : groupName.slice(0, 3)}
              </h3>
              <div className="flex flex-col gap-1">
                {renderLinks(items)}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}