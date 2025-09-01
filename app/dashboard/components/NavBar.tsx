'use client'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown"
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "@/components/icons"
import { useNavbar } from "@/hooks"
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react"

export const NavBar = () => {
  const {
    name,
    isSidebarOpen,
    toggleSidebar,
    handleLogout,
    pathname
  } = useNavbar();

  return (
    <header className="header flex items-center justify-between px-2 py-2 lg:pl-3 lg:pr-5">
      <div className="flex items-center gap-2 lg:ml-2">
        <button
          className="text-zinc-700 hover:text-zinc-900 hover:bg-transparent rounded-md lg:hidden"
          onClick={toggleSidebar}
        >
          <MenuIcon className="size-6" />
        </button>

        <button
          className="text-zinc-700 hover:text-zinc-900 hover:bg-transparent rounded-md hidden lg:flex"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <ChevronLeftIcon className="size-6" /> : <ChevronRightIcon className="size-6" />}
        </button>

        <Breadcrumbs className="text-zinc-700 ml-5" separator=">">
          {
            pathname.split('/').filter(Boolean).map((segment, index, array) => (
              <BreadcrumbItem key={segment} href={`/${array.slice(0, index + 1).join('/')}`}>
                {segment}
              </BreadcrumbItem>
            ))}
        </Breadcrumbs>
      </div>
      <div className="flex items-center">
        <Dropdown
          radius="sm"
          className="min-w-0 w-fit"
        >
          <DropdownTrigger>
            <button
              className="flex items-center justify-center rounded-full py-[0.25rem] px-[0.7rem] border-2 border-zinc-800 uppercase"
            >
              {name?.[ 0 ] || "U"}
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {/* <DropdownItem
              key="change-password"
              className="text-zinc-800 hover:text-zinc-900 focus:text-zinc-900"
              onClick={onOpen}
            >
              Cambiar contraseña
            </DropdownItem> */}
            <DropdownItem
              key="logout"
              className="text-red-500 hover:text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <ChangePasswordModal 
          id={id} 
          isOpen={isOpen}
          onOpenChange={onOpenChange} 
        /> */}
      </div>
    </header>
  )
}