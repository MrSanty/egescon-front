'use client'

import { FC } from "react"

interface RoleHeaderProps {
  onAddRole: () => void;
}

export const RoleHeader: FC<RoleHeaderProps> = ({ onAddRole }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles y Permisos</h2>
        <button
          onClick={onAddRole}
          className="sm:hidden flex items-center justify-center p-2 bg-zinc-900 text-white rounded-md"
        >
          <span className="sr-only">Agregar Rol</span>
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>
      <div className="flex justify-end items-center mb-3">
        <button
          onClick={onAddRole}
          className="hidden sm:flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Agregar Rol
        </button>
      </div>
    </>
  )
}